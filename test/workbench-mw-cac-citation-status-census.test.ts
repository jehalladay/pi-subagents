/**
 * wb-kku9.2 (MW-CAC-WORKFLOW-COMPOSITION-R2, program-triage-2026-10-22), the MW cac-workflow-composition citation-status census.
 * Statement (bead notes, full form): "Any Pi document or surfaced string citing the MechanicalWorkflows
 * cac-workflow-composition-2026-10-18 program shall carry its recorded status verbatim (design-only; 'the two program documents
 * are the only artifacts'; 'not a claim that source code was modified or native workflows were run') and shall not present
 * CACWorkflowCompositionV0, a bridge checker or a Pi MW adapter as existing (none shipped: 'no bridge checker exists at HEAD',
 * 'no Pi adapter is wired at 19ca8d4'); until a citation exists, zero mentions is the passing state." (MechanicalWorkflows
 * docs/programs/cac-workflow-composition-2026-10-18/README.md:21@5ce2a07f891f.)
 * Acceptance (owner filing, verbatim; the labels of rows A to C quote it): "(a) static census over docs/workbench, receipts and
 * src: every string containing 'cac-workflow-composition' or 'CACWorkflowCompositionV0' also carries 'design-only' or the
 * verbatim README.md:21 sentence in the same paragraph (passes empty today); (b) mutant: an unqualified citation naming
 * CACWorkflowCompositionV0 as a shipped type fails the census; (c) if docs/workbench/07 § MechanicalWorkflows gains the wb-klr7
 * acceptance (c) sentence, it carries the status verbatim and is bound by test/workbench-docs07-provider-rules.census.ts."
 * Row E quotes the statement's second duty: "shall not present CACWorkflowCompositionV0, a bridge checker or a Pi MW adapter as
 * existing".
 *
 * wb-3cql (the R694 follow-up of landing 343; gate cmd_54b35cd737ab, PREP findings F1-F5, its LEG-2 mutants re-measured
 * surviving at trunk 12965aa before this cut): F1 every residual quiet row's witness carries its own probe (path and text) and
 * the probe is re-judged where the witness is compared, so a row swapped for another's (G-CT3-Q4) or a probe the row never
 * judged reds; F2 the README.md:21 carrier is the sentence itself - A6 pins a bare line reference, a path to it and a link to
 * it as unqualified (the lenient carrier G-LENIENT-ONLY reds); F3 (the R658 rendered-view family) a carrier is read on THE
 * CARRIER VIEW below, never on raw markup (A5 and A7 pin a status held only by a comment, a link destination or title, an
 * image alt, a definition, a raw HTML element, struck text, a footnote label, an HTML block or a comment across blank lines
 * as unqualified, and markup a reader sees through - link text, a code span, an escape, emphasis - as qualifying); F4 the
 * anchored-element binding (OUTSIDE ANCHORS) reds a re-tiling that folds a pin into a neighbour (G-MERGE and its siblings);
 * F5 stayed NOT CLAIMED at that cut (no outside anchor named the residual families); wb-ubhh's RESIDUAL ANCHOR below cures it.
 *
 * wb-ubhh (the R694 follow-up of landing 442, gate cmd_2514e41685b1: its F5 leads, its F6 and F7 ride and are cured here, its F4
 * rides and stays NOT CLAIMED below). RESIDUAL ANCHOR (F5): the residual families are anchored OUTSIDE this census's two files,
 * in docs/14's "MW workflow-composition citation-status census residuals" table, the wb-64x.1 form (Quiet row | Residual family
 * | Exemplar | Clear form | Clear form reads). Its own case, registered third, reads that section from marked's tokens of the
 * page: the page's one heading of that text, a top-level level-2 heading under the docs/14 title with no other level-1 heading
 * before it, bounded at the next level-1 or level-2 heading or EOF, exactly an intro paragraph and one table of those columns, no
 * raw HTML, each exemplar and clear form a whole-cell code span (`\n` a line break). Its rows are held to RESIDUALS and to the Q
 * row's pins, in order and both ways, so a family removed from ROWS, the literal, IMPL, RESIDUALS and the roster together
 * (landing 442's G-CT6-Q4, the CT6 coordinated hollow) reds against the row docs/14 keeps. F7: each row binds its family to its
 * quiet row's probe - the probe the pin's own case returns carries the exemplar exactly once and reads quiet, and with the
 * exemplar replaced by the clear form it reads the causes the table gives - so a quiet case swapped together with its roster
 * witness to another family's probe (X22-QUIET-SWAP-COORD) reds; R-SCOPE's probe is Q1's outside list, one path a line, read
 * as the clause (a) scopes whose roots would list each path. The section's units cite nothing (judged in the same case), and
 * its rows as read at this cut are a frozen literal there, so a docs-side edit the judge still accepts reds too. F6: A5's
 * footnote-definition control holds, as unqualified, a status that only a plain footnote definition line carries when that
 * line is the citing unit's one definition line, directly under its citing line, killing FOOTNOTE.definition's never-match
 * member (the gate's M22-FOOTNOTE-DEF-NEVER); wb-9lz6 below pins the line's other forms and its second position.
 *
 * wb-9lz6 (the R694 follow-up of landing 781, gate cmd_453531a97151: its F1 leads and is cured here). A5's footnote-definition
 * controls hold that status, read unqualified, on the citing unit's one definition line directly under its citing line, one
 * control per form. This first cut pinned eight forms: the plain line "[^s]: design-only" (footnote-definition); both lines
 * behind "> " (footnote-definition-quoted, the gate's witness gate-fndef-quote verbatim), behind ">"
 * (footnote-definition-unspaced-quote) or behind "> > " (footnote-definition-nested-quote); the definition line indented by
 * two spaces (footnote-definition-indented, the gate's witness gate-fndef-indent verbatim), by four spaces
 * (footnote-definition-deep-indent) or by one tab (footnote-definition-tab-indent); and the plain line under the label
 * [^note-1] (footnote-definition-long-label). Cut #4 below enumerates every form A5 holds, these eight among them, with each
 * form's falsifiers, and that enumeration is the claim.
 *
 * wb-9lz6 cut #2 (its refusal #1: U1, the record's PF1 on FOOTNOTE.definition's flags, and PF2, cured beside it). Two A5
 * controls hold the status on the second of two definition lines directly under the citing line, the first under the label
 * [^note-1] and the second, holding the status, under [^s]: plain (footnote-definition-second, the gate's witness W-FLAG
 * verbatim) and with each line behind one blockquote marker and a space (footnote-definition-quoted-second, the witness
 * W-FLAG-Q verbatim). Their falsifiers are the gate's G-FLAG-G and G-FLAG-Y, FOOTNOTE.definition with the g or the y flag:
 * .test() then starts at the previous match's lastIndex, so the line tested right after a hidden definition line is shown, and
 * each member reds both controls (A5 and the closing case). FOOTNOTE's flags are pinned beside its sources: A5 holds them as a
 * literal (the reference's "g", the definition's "", no flag) and the roster's constants.carrierView.footnoteFlags carries
 * both, so any flag added to or dropped from either regex reds A5 and the closing case, and the judged-set case too unless the
 * roster is edited with it. The reference's g is pinned by behaviour as well: footnote-label-second (the record's PF2 witness
 * W-REF verbatim) holds, as unqualified, a status carried only by the label of the second of two adjacent footnote references
 * on the citing line, that label spelled "design-only"; its falsifier is the gate's G-REF-NOG (FOOTNOTE.reference without g
 * removes a line's first reference only), and the reference with gy reds it and footnote-label. Every other position of a
 * definition line or a reference, and every FOOTNOTE flag edit that changes no control's reading, is stated NOT CLAIMED below.
 *
 * wb-9lz6 cut #3 (its refusal #2: U1, the record's PF1 on the second reference's label spelling, and PF2, cured beside it). A5
 * holds a footnote reference's label, read unqualified, in two spellings at each of the two positions it claims, each in the
 * citing-line texts cut #4 lists below and in no other: at a line's only reference "design-only" (footnote-label) and
 * "Status:DESIGN-ONLY." (footnote-label-punct, the record's PF2 position, with its definition after a blank line), and at the
 * second of two adjacent references "design-only" (footnote-label-second) and "Status:DESIGN-ONLY."
 * (footnote-label-second-punct, the record's gate-only feasibility control gate-label-second-punct, its text verbatim). The
 * second spelling holds capital letters, a colon and a final period (19 characters), so a one-edit narrowing of
 * FOOTNOTE.reference's label class that leaves it unmatched keeps the label on the view, where its status qualifies the unit:
 * each of the gate's G2-R-LBL-WORDHY ([\w-]+), G2-R-LBL-MAX12 ({1,12}), G2-R-LBL-LOWER ([a-z0-9-]+) and G2-R-LBL-ALNUMHY
 * ([A-Za-z0-9-]+), and the class with the colon, the period or the capital letters excluded or capped at 18 characters, edited
 * with its roster constant, reds both punct controls and their five cut #4 twins (A5 and the closing case). G-REF-NOG reds
 * footnote-label-second-punct beside footnote-label-second and both cut #4 second-position lines, and the reference with gy
 * reds all fourteen label controls. A label in any other spelling, at either position, is stated NOT CLAIMED below.
 *
 * wb-9lz6 cut #4 (its refusal #3: U1, the record's PF1 on the text around a reference, and PF2, which ruling R-B388 read as
 * claimed - "behind two markers" covers ">>" - so the FOOTNOTE.definition claim set is frozen and this cut is authored in the
 * enumerate-the-resolvable form for it: the definition claim is exactly the forms listed here, each pinned by its own control,
 * with wb-6aaw's two definition lines below; every member record PF3 measured surviving is killed here, killed by wb-6aaw below
 * (IND-SPTAB and CTX-COLON-CONTENT) or named NOT CLAIMED below, as cut #5 restates it; every other definition line is NOT
 * CLAIMED below). No residual family is added: an exemplar of each NOT CLAIMED form below read
 * unqualified under the census's own judge (measured at this cut, added as throwaway A5 controls: 32 passed), and the NOT
 * CLAIMED sentences name where a hollowed judge is not caught; how the judge reads any other page in such a form is NOT
 * CLAIMED (cut #5 below).
 *
 * wb-9lz6 cut #5 (its refusal #4: U1 and U2, both in the frozen FOOTNOTE.definition claim set; ruling R-B418 executed the
 * rule-19 structural exit, filed the exit child wb-6aaw and bound this, the bead's final cut, to the FAIL-CLOSED CORE). This
 * cut changes comments only - no control, pin, roster entry, test title or reader code is added, removed or edited - and
 * withdraws the words the earlier cuts gave five surviving FOOTNOTE.definition members to call them harmless. The definition
 * claim at cut #5 was exactly what its pins held: A5's nineteen forms and cut #2's two second-position pairings, one control
 * each, and the falsifiers this header names for them, each red with the attribution named; wb-6aaw below adds five controls
 * and the members they kill, and the claim is now exactly those pins together. No FOOTNOTE.definition member this header does
 * not name is claimed to be caught: the members named NOT CLAIMED below are measured examples. At cut #5 five of them
 * (IND-SPTAB, CTX-COLON-CONTENT, the regex unanchored, its colon dropped and the definition with m) were hollowed judges this
 * census did not catch, their pins given to wb-6aaw by ruling R-B418; wb-6aaw below pins each of the five. Each page refusal #4
 * realized the five on, and its twin W-GP22-NBSP-INDENT, reads unqualified under the census's own judge (measured at cut #5 as
 * throwaway A5 controls, causes ["unqualified"]: 32 passed; at wb-6aaw's cut five of those texts are A5 controls, and the twin,
 * measured again as a throwaway A5 control, reads unqualified: 32 passed). How the census reads a page whose definition line is
 * in a NOT CLAIMED form is NOT CLAIMED by
 * this census, quiet or not: the census hides a definition line's words from the carrier view, so a negation on that line
 * does not reach a status on the next one, and such a page can read quiet - a unit made of a citing line ending "which is",
 * the line "[^x]: not" and the line "design-only." reads qualified, and so do its twins with the reference and the label s
 * and behind "> " (measured at cut #5 as throwaway A5 controls expecting unqualified: 2 failed | 30 passed (32) each,
 * attributed to the probe), while marked shows that line as paragraph text. Cut #5 adds no residual family: RESIDUALS and
 * docs/14's residual table are unchanged.
 *
 * wb-6aaw (the rule-19 structural exit child of wb-9lz6, filed by ruling R-B418 to own the five members' pins: refusal #4's U1
 * and U2). THE FIVE MEMBERS' PINS. The pinned reader set is this file's case A5 (each control's causes, asserted as "<id>: its
 * causes", then A5's witness against the roster's) and its closing case (every pin reached its witness compare, and every
 * compare matched its roster witness): under the census's own expect a member reds A5 at its first failing control and the
 * closing case at the reach, and under expect.soft (the attribution reading) A5 at each failing control and the closing case at
 * the compare. A5 holds five more controls, each read unqualified (its one cause), each the text of refusal #4's gate-only
 * feasibility control (record PF7) verbatim, which is its paired real-tree witness without the final line break, where "..."
 * stands for "Pi reads the cac-workflow-composition-2026-10-18": "... program[^s]." then a line of a carriage return and "[^s]:
 * design-only" (footnote-definition-cr-led; the record's gate-fndef-cr-indent and W-GP22-CR-INDENT); "... program, which is
 * not" then the line "[^s]:" then "really design-only." (footnote-definition-colon-only; gate-fndef-colon-negwin,
 * W-GP22-COLON-NEGWIN); "... program[^x]: not" then "design-only." (footnote-not-definition-mid-line;
 * gate-fndef-unanchored-neg, W-GP22-UNANCH-NEG); "... program, which is" then "[^x] not" then "design-only."
 * (footnote-not-definition-no-colon; gate-fndef-nocolon-neg, W-GP22-NOCOLON-NEG); and "... program, which is" then a line of
 * "x", U+2028 and "[^x]: not" then "design-only." (footnote-not-definition-line-separator; gate-fndef-mflag-neg,
 * W-GP22-MFLAG-NEG). Falsifiers, each a one-edit member of FOOTNOTE.definition edited with its roster constant (and, for the
 * flag, A5's flags literal), red A5 and the closing case (2 failed | 30 passed (32)) with soft attribution exactly as named:
 * IND-SPTAB (the leading \s* as [ \t]*) and its twin (?: |\t)* footnote-definition-cr-led; CTX-COLON-CONTENT (\]: as \]:.) and
 * its twin \]:(?!\s*$) footnote-definition-colon-only; the regex unanchored footnote-not-definition-mid-line and
 * footnote-not-definition-line-separator; its colon dropped footnote-not-definition-no-colon; and the definition with m
 * footnote-not-definition-line-separator. Each of those seven read 0 | 32 before this cut, clean and on each of its paired
 * witnesses appended to docs/workbench/19-worked-examples.md (W-GP22-CR-INDENT for IND-SPTAB and its twin, W-GP22-COLON-NEGWIN
 * for CTX-COLON-CONTENT and its twin, W-GP22-UNANCH-NEG and W-GP22-MFLAG-NEG for the regex unanchored, W-GP22-NOCOLON-NEG for
 * its colon dropped and W-GP22-MFLAG-NEG for the definition with m), where the census reads 5 failed | 27 passed (32) (refusal
 * #4, reproduced at this cut's base); on each of those pages each now reads 2 | 30. Measured beside them at this cut, each red
 * 2 | 30 with soft attribution exactly as named: after the colon (?!$) and \s*\S footnote-definition-colon-only; the start
 * anchor as (?:^|\s), (?<!\S) or (?<![\w.]) footnote-not-definition-line-separator; the colon made optional or as (?::|\s)
 * footnote-not-definition-no-colon. Each new control's causes flipped to [] reds the census, in IMPL alone and with the roster;
 * each removed from IMPL and the roster together is the NOT CLAIMED control removal below. Every other member of these classes
 * is NOT CLAIMED by this census - for example, measured green at this cut, the leading \s* as [ \t\r]*, [^\S\u00a0]* or [
 * \t\r\f\v]* (each still matches a carriage return), after the colon (?!\s+$) or (?! +$), the start anchor as (?:^| ) and the
 * colon as (?::|$) - and so is the census's reading of any text other than these five controls' texts (another line led by a
 * carriage return, another line holding only a label and a colon, another reference and negation on a line that is no
 * definition line). No residual family is added: RESIDUALS and docs/14's residual table are unchanged.
 *
 * THE TEXT AROUND A REFERENCE (U1). A5 holds a reference's label, read unqualified, in both spellings ("design-only" and
 * "Status:DESIGN-ONLY.", written L), one control per spelling, in exactly these citing-line texts and in no other, where "..."
 * stands for "Pi reads the cac-workflow-composition-2026-10-18": at a line's only reference, its definition after a blank
 * line, "... program[^L]." (footnote-label, footnote-label-punct), "... program [^L]." (footnote-label-space-before,
 * footnote-label-punct-space-before), "... program.[^L]" (footnote-label-after-period, footnote-label-punct-after-period),
 * "... program[^L]and nothing more." (footnote-label-word-after, footnote-label-punct-word-after) and "... program[^L] today."
 * (footnote-label-space-after, footnote-label-punct-space-after); at the second of two adjacent references, with no definition
 * line, "... program[^s][^L]." (footnote-label-second, footnote-label-second-punct) and "... program[^s][^L] today."
 * (footnote-label-second-space-after, footnote-label-second-punct-space-after). So directly before a claimed reference stand
 * only the "m" that ends "program", a space, a "." or the first reference's "]", and directly after it only a ".", the line
 * end, the "a" of "and" or a space, each only as these lines write them. The design-only texts of the five new lines are the
 * record's gate-only feasibility controls gate-ctx-space-before, gate-ctx-after-period, gate-ctx-word-after,
 * gate-ctx-space-after and gate-ctx-second-space-after verbatim, and footnote-label-punct-space-before is the paragraph of the
 * record's witness W-CTX6-PUNCT-SPACE-BEFORE. Falsifiers, each a one-edit lookaround in FOOTNOTE.reference edited with its
 * roster constant, red A5 and the closing case with soft attribution exactly as named: the gate's CTX-BEFORE-NOWS (?<!\s) the
 * two space-before lines; CTX-BEFORE-NOPUNCT (?<![.,;:!?]) the two after-period lines; CTX-AFTER-NOWORD (?!\w) the two
 * word-after lines; CTX-AFTER-NOSPACE (?!\s) the four space-after lines; CTX-AFTER-PERIOD (?=\.) the eight new lines without a
 * "." after the reference; CTX-BEFORE-WORD (?<=\w) and CTX-WORDBOUNDARY \b the eight lines without a word character before it;
 * and the seat's (?<!m) the six lines with the "m" before it, (?<! ) the two space-before lines, (?<!\.) the two after-period
 * lines, (?<!\]) the four second-position lines, (?!\.) the six lines with a "." after it, (?!$) the two after-period lines,
 * (?! ) the four space-after lines and (?!a) the two word-after lines. Each new line's causes flipped to [] reds the census,
 * in IMPL alone and with the roster.
 *
 * THE FOOTNOTE DEFINITION LINE (the frozen class, enumerated). A5 holds a definition line's status, read unqualified, on the
 * citing unit's one definition line directly under its citing line
 * "Pi reads the cac-workflow-composition-2026-10-18 program[^s]." (with the reference [^note-1] or [^Note:A-1.] for those two
 * labels), in exactly these nineteen forms and in no other (beside wb-6aaw's carriage-return-led line above,
 * footnote-definition-cr-led), one control each: with no prefix, "[^s]: design-only"
 * (footnote-definition), "[^note-1]: design-only" (footnote-definition-long-label), "[^Note:A-1.]: design-only"
 * (footnote-definition-punct-label), "[^s]:design-only" (footnote-definition-unspaced-colon) and "[^s]: *design-only*"
 * (footnote-definition-emphasis); with both lines behind exactly one of the prefixes "> " (footnote-definition-quoted), ">"
 * (footnote-definition-unspaced-quote), ">" and two spaces (footnote-definition-quote-two-spaces), ">" and one tab
 * (footnote-definition-quote-tab), "> > " (footnote-definition-nested-quote), ">>" (footnote-definition-nested-unspaced),
 * "> >" (footnote-definition-nested-first-spaced), ">> " (footnote-definition-nested-second-spaced), "> > > "
 * (footnote-definition-triple-quote) and two spaces then "> " (footnote-definition-indented-quote), each before
 * "[^s]: design-only"; and with the definition line alone indented by two spaces (footnote-definition-indented), four spaces
 * (footnote-definition-deep-indent), one tab (footnote-definition-tab-indent) or two spaces then a tab
 * (footnote-definition-mixed-indent). footnote-definition-nested-unspaced is the record's gate-only control
 * gate-fndef-nested-unspaced verbatim (the text of its witness W-DEF-NESTED-NOSPACE), footnote-definition-nested-first-spaced
 * is the text of the record's W-DEF-NESTED-INNERSPACE, and each of the eight forms from footnote-definition-triple-quote to
 * footnote-definition-emphasis kills a member record PF3 measured surviving, each first realized fail-open by the seat's
 * paired witness of that form appended to docs/workbench/19-worked-examples.md (the census 5 failed | 27 passed, the member
 * 0 | 32). Falsifiers, each a one-edit member of FOOTNOTE.definition edited with its roster constant, red A5 and the closing
 * case with soft attribution exactly as named: the never-match member all nineteen; the blockquote prefix (?:>\s*)* dropped
 * (the gate's G2-FNDEF-NO-QUOTE) the ten quoted ones, made optional the five with two or three markers, its \s* made \s+ the
 * four with a marker directly before a marker or the label (">", ">>", "> >", ">> ") and its \s* dropped the eight with
 * whitespace after a marker; D-CTX Q-NOTBEFORE-MARKER of refusal #3 ((?!>) after each marker) the two with a marker directly
 * before a marker (">>", ">> "); Q-MAX2 ((?:>\s*){0,2}) the three-marker form; QSP-OPT1 ((?:> ?)*) the two-space and the tab
 * form; ORDER-SWAP (^(?:>\s*)*\s*) the indented quote; the leading \s* dropped (the gate's G2-FNDEF-NO-INDENT) the four
 * indents and the indented quote, narrowed to spaces the tab and the mixed one, to \s? the two-space, four-space, mixed and
 * indented-quote ones and to \s{0,3} the four-space one; INDENT-NOT-MIXED (^(?! +\t)) the mixed one; the label's + dropped, or
 * the label narrowed to \w+, the [^note-1] and [^Note:A-1.] forms, and narrowed to {1,6} or to [a-z0-9-]+ (LBL-MAX6,
 * LBL-LOWERHY) the [^Note:A-1.] one; a space required after the colon ((?= ) or (?!\S): CTX-COLON-SPACE,
 * COLON-THEN-SPACE-OR-EOL) the unspaced-colon one; a word required after it (\s*\w: CTX-COLON-WORD) the emphasis one; a prefix
 * made required (\s+, or (?:>\s*)+) the forms without it. Of cut #2's two second-position controls above, the never-match
 * member and the required indent red both, the blockquote prefix dropped or with its \s* dropped the quoted one, the required
 * blockquote prefix the plain one, and no other member named here reds either. Of wb-6aaw's five controls above, the
 * never-match member reds footnote-definition-cr-led and footnote-definition-colon-only, the leading \s* dropped or narrowed to
 * spaces footnote-definition-cr-led, a space required after the colon by (?= ) (CTX-COLON-SPACE), a word required after it
 * (CTX-COLON-WORD) and the required indent footnote-definition-colon-only, the required blockquote prefix both of those two,
 * and no other member named here reds any of the five. Each new form's causes flipped to [] reds the census, in IMPL alone and
 * with the roster.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-23, at this census's base caad951). Producer (the local MechanicalWorkflows
 * checkout at 5ce2a07f891f, git show / ls-tree; the roster's producer block holds the lines and blobs, the hermetic census
 * never re-reads them): the program directory holds exactly two documents, README.md (blob 8724bfbef663) and
 * 01-composition-contracts.md (blob 5e6c16c0c041); README.md:3's bold status line opens "Design-only as of 2026-10-18
 * (19ca8d4): the two program documents are the only artifacts"; README.md:17 closes "no Pi adapter is wired at 19ca8d4).";
 * README.md:21 is the filing's sentence verbatim; 01-composition-contracts.md:4 closes "no bridge checker exists at HEAD." and
 * :6 reads the type "as a concept only". Pi: git's tracked lists hold 25 docs/workbench pages outside receipts/, 44 receipts
 * and 115 src files (all .md and .ts), which the readers split, with each leg's planted file, into 1660, 1544 and 102328 units;
 * no tracked unit of that union cites the program (git grep -i -P 'cac[\s_-]*workflow[\s_-]*composition' over src, docs, qa,
 * README.md, CHANGELOG.md and AGENTS.md: 0 lines; test/ outside this cut's two files: 0 files), and no docs/workbench or src
 * line spells CACWorkflowCompositionV0 or a bridge checker - so clause (a) passes empty today, as filed. The adapter subject's
 * spelling occurs twice, never in a citing unit: "the Pi adapter itself never retries" (TRACEABILITY.md:260) and "the Pi
 * adapter never retries" (feature-matrix.md:174), both the Furnace-hosted adapter. At the filing pin d75b68d the lists hold 25,
 * 39 and 115 files and no unit cites the program. No docs, src or tracker text is edited by the wb-kku9.2 cut
 * (wb-ubhh's cut adds docs/14's residual section, which cites nothing).
 *
 * THE UNITS. A unit is the smallest text the judges read as one "paragraph". Markdown (every docs/workbench file is .md): a
 * blank-line-delimited block, where a heading, a table row and each line inside a code fence are units of their own and a
 * list item starts a new unit (its lazy continuation lines stay in it); a blockquote line holding only ">" is blank. Source
 * (every src file is .ts), read through the TypeScript AST: each string and regular-expression literal (its cooked value),
 * each template expression (cooked literal parts with the raw substitutions), each comment (leading and same-line trailing
 * ranges), and each identifier as a CODE unit (JSDoc nodes are read as their comment only). Any other extension: each line. readScope lists a scope with git ls-files, reads each file and judges
 * every unit; the plants a pin hands it are judged by the same call, after the tracked files.
 * THE JUDGES. A unit CITES the program when the citation pattern (CITATION: clause (a)'s two quoted literals, each read word
 * by word with any run of whitespace, underscore or hyphen between its words, case-insensitively) matches it outside a
 * requirement-id spelling (REQUIREMENT_ID: the bead family's own id form, MW-CAC-WORKFLOW-COMPOSITION-R<n>, derived from this
 * bead's title). A citing CODE unit is a finding (a Pi symbol naming the program or the type presents it as existing). A
 * citing text unit owes a carrier on its CARRIER VIEW: "design-only" as a whole word (any case), not negated within the two
 * words before it and not followed by "no longer"/"no more"/"anymore", or the README.md:21 sentence itself (any whitespace
 * between its words, the final period optional; a reference to the line, its path or a link to it is no carrier); a unit
 * carrying neither is a finding (unqualified). In every citing text unit the existence judge reads
 * each clause (split at sentence ends and semicolons) holding one of the statement's three subjects (SUBJECTS) and a word of
 * EXISTS not preceded in its clause by a GUARD word (negations, conditionals, modals, "proposed", "planned", "future", "yet")
 * and not followed by "nowhere"/"nothing"/"none"/"not"/"never"/"no": such a clause presents its subject as existing, a finding.
 * The citation and existence judges read the raw text, so a citation or a claim only the raw markup holds still counts (a
 * hidden citation fails closed); only the carrier is read on the view.
 * THE CARRIER VIEW (wb-3cql F3). A markdown unit's carrier view is what its rendered page shows. marked's top-level tokens of
 * the whole document (their raws tile its source) place each line: a raw HTML block (a comment, an element, a block spanning
 * blank lines), a link reference definition and a code fence delimiter show nothing; a code block's lines show verbatim; a
 * list or quote whose raw HTML crosses a blank line is opaque. The unit's remaining lines are rendered on their own through
 * marked (indentation removed, footnote syntax removed, the document's definitions preloaded): HTML, images (their alt text
 * included), definitions, link destinations and titles and struck text (UNSHOWN) show no carrier, and a raw HTML element
 * (ELEMENT; an attribute or a style can hide the text between its tags) makes the view opaque, carrying nothing. A src unit
 * and any other unit are shown as their text (src has no rendered page: a string is read cooked, a comment as written).
 *
 * ROWS. A, clause (a), one pin per quoted part (the pin quotes tile the clause): A1 the docs/workbench walk outside receipts/,
 * A2 the receipts walk, A3 the src walk - each git-tracked list equal to a filesystem walk, a file floor, a content-liveness
 * anchor (every docs page opens with a level-1 heading; every receipt opens "# <its bead>: " (rule 15's shape); the schema
 * literal "workflow-script/v1" is a string unit of src/workbench/identity.ts and of no other src file) and the same call
 * judging a planted file after the tracked ones: the findings are exactly the plant's (an unqualified citation, a qualified
 * existence claim and, in src, a code unit), so a real finding, a hollowed judge or a live result forced empty reds; A4 the
 * citation reader; A5 the design-only carrier, on the carrier view; A6 the README.md:21 carrier (the sentence, never a
 * reference to its line); A7 the unit boundaries (markdown and source) and the document's own placing of a unit's lines; A8
 * the filing pin d75b68d: the same readers over git's objects at the pin read no citing unit, and the same call judges a plant.
 * B, clause (b): B1 the unqualified half of the mutant; B2 its shipped-type half (a qualified shipped claim still flags; a
 * src type declaration flags as code); B3 the mutant committed into a scratch git repository (test/helpers/scratch.ts, leak
 * guard installed) at a path of each clause (a) scope, read through readScope's own git listing: each scope flags it, and the
 * qualified twin is quiet. C, clause (c): C1 the condition (docs/07's one level-2 heading naming MechanicalWorkflows, its
 * section read; wb-klr7's clause (c) text read from the tracker export; the condition is MET since wb-klr7's cut: the live
 * section's one citing unit is wb-klr7's clause (c) sentence, held verbatim by the docs07 census, and a planted sentence cites
 * beside it and nothing else in the section does); C2 the status duty over the live section and its plants; C3 the binding duty: every citing unit of the section
 * is held verbatim in test/workbench-docs07-provider-rules.census.ts (read live; a planted bound twin is quiet). E, the
 * statement's second duty, one pin per subject: E1 CACWorkflowCompositionV0, E2 a bridge checker, E3 a Pi MW adapter - each
 * the existence judge on its controls (the filing's quoted MW facts quiet) and a docs walk judging its planted claim. Q, the
 * residuals' pinned quiet rows: each witness (but R-SCOPE's path list) is its probe's path, text and causes, and the probe is
 * re-judged where the witness is compared (wb-3cql F1).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's witness, the constants and every registered test title - is held to the out-of-file roster
 * (test/fixtures/mw-cac-citation-status-roster.json). OUTSIDE ANCHORS (their own registered case): the bead's own row in the
 * tracker export (.beads/issues.jsonl) - each acceptance clause is exactly one row's label, row E's label is a slice of the
 * statement, and each row's pin quotes tile its clause with nothing but separators between them, so a pin removed from ROWS,
 * the literal, IMPL and the roster together still reds; the scope pins name clause (a)'s scopes; CITATION is derived from
 * clause (a)'s quoted literals and the design-only carrier is its third quote; README.md:21 is the filing's quote; SUBJECTS
 * spell the statement's subjects; EXISTS reads the bead text's existence words (existing, shipped, exists, wired); clause (c)'s
 * holder and docs/07 page are its own references; wb-klr7's row carries the clause (c) sentence; the producer block's MW lines
 * carry the quoted status; and (wb-3cql F4) every ANCHORED ELEMENT the bead text names is carried by the roster witness of
 * each pin of its row whose quote names it - clause (a)'s scope words, quoted literals and carrier word, the filing's
 * README.md:21 sentence and the filing pin its notes name for "today", clause (b)'s "unqualified", CACWorkflowCompositionV0
 * and the census's scopes, clause (c)'s wb-klr7 sentence and holder, row E's three subjects - so a re-tiling that folds a pin
 * into a neighbour in every literal and the roster reds whenever the folded quote names one (G-MERGE: A6 into A5). The last
 * case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it) and REACHED (every pin
 * reached its witness compare, and each compare's own result). RESIDUAL ANCHOR (its own registered case, wb-ubhh above): docs/14's
 * residual table holds every residual family with its quiet row, an exemplar of its probe and a clear form.
 * NOT CLAIMED (edits of this file and the roster together, unless named otherwise): a re-tiling that folds A7 ("in the same
 * paragraph") or C2 ("it carries the status verbatim"), the two quotes naming no anchored element, into a neighbour in every
 * literal and the roster (landing 442's F4: measured 30/30 at wb-3cql's cut; not re-measured by wb-ubhh); a control removed from
 * IMPL and the roster together while every remaining control holds, alone or with a FOOTNOTE member only the removed controls
 * kill; one or more controls' texts rewritten in IMPL to other texts that read the same causes (the roster holds a control's
 * id and causes, never its text), alone or with a FOOTNOTE member only the rewritten controls kill, edited with its roster
 * constant (and, for a flag, A5's flags literal); a plant edited in IMPL and the roster together; a floor
 * lowered in FLOORS and the roster together (git's list equal to the filesystem walk stays the narrowing guard); a seat-added
 * vocabulary
 * member (of EXISTS, GUARD or the negation lists) removed with every control naming it, in IMPL and the roster together (only
 * the bead text's words are anchored outside); a residual probe rewritten in IMPL and the roster to another text that still
 * carries its row's exemplar once, reads quiet and reads the table's causes under its clear form; a residual family or its row
 * edited in this file, the roster and docs/14 together; the outside-anchor case, the residual-anchor case or the closing case
 * removed with its roster title. A footnote definition line in any form other than cut #4's nineteen above and wb-6aaw's two
 * (the texts of footnote-definition-cr-led and footnote-definition-colon-only) is NOT CLAIMED by this census: any other prefix
 * of either line - four or more markers, other whitespace after a marker (three or more spaces,
 * two or more tabs, a space and a tab, or a character other than a space or a tab), a marker prefix on one line only or
 * differing between the two lines, an indent of another width (one, three, five or more spaces, two or more tabs, another mix)
 * or an indent combined with markers other than two spaces then "> " - a label other than s, note-1 and Note:A-1. (for example
 * one holding an underscore or whitespace, or longer than nine characters), and any text after the colon other than
 * " design-only", "design-only" and " *design-only*". Measured green at this cut, each a one-edit member of
 * FOOTNOTE.definition edited with its roster constant that diverges only on such forms: (?:>\s*){0,3} (four markers),
 * (?:>\s{0,2})* (three spaces after a marker), ^\s{0,4} (an indent of five), the label capped at nine characters or without
 * "_", and after the colon a lookahead refusing "(", a tab or two spaces. Five more one-edit members of FOOTNOTE.definition,
 * each edited with its roster constant (and, for the flag, A5's flags literal), read green at cut #5 (0 failed | 32 passed (32)
 * each) and were named NOT CLAIMED there as hollowed judges the census did not catch: IND-SPTAB (the leading \s* as [ \t]*) and
 * CTX-COLON-CONTENT (\]: as \]:.), two of record PF3's survivors, and the regex unanchored (as landing 781's F6 read), its
 * colon dropped and the definition with m. Refusal #4 realized each on a paired page appended to
 * docs/workbench/19-worked-examples.md that the census reds (5 failed | 27 passed (32)) and the member left green (0 | 32):
 * W-GP22-CR-INDENT (a definition line led by a carriage return) under IND-SPTAB; W-GP22-COLON-NEGWIN (a line holding only
 * "[^s]:" between a negation and its status) under CTX-COLON-CONTENT; W-GP22-UNANCH-NEG (a citing line ending in a reference, a
 * colon and a negation) under the regex unanchored; W-GP22-NOCOLON-NEG (a reference and a negation on a line of their own)
 * under its colon dropped; and W-GP22-MFLAG-NEG (a line holding U+2028 before a reference, a colon and a negation) under the
 * definition with m and the regex unanchored. They are claimed now: wb-6aaw's five controls above pin them, and each reds the
 * census (2 failed | 30 passed (32)) with the attribution wb-6aaw names; the other members of their classes that wb-6aaw names
 * green are NOT CLAIMED.
 * LBL-LAZY ([^\]\n]+?), measured with them, is equivalent: its class holds no "]", so its lazy and the greedy label run both
 * end at the label's first "]" (0 | 32 clean and 5 | 27 on each of the five pages, as the census reads, at cut #5 and again at
 * wb-6aaw's cut). A footnote definition line in any position of the citing unit other than wb-9lz6's two (the unit's one
 * definition line, directly under its citing line, in the nineteen forms; and the second of two definition lines under it in
 * the plain and the quoted pairing cut #2 holds) and wb-6aaw's two (each in its control's text: the carriage-return-led line
 * directly under its citing line, and the line "[^s]:" between a citing line and its status line) is NOT CLAIMED by this
 * census: for example the first of two or more definition lines, a later definition line in the other seventeen forms or in
 * another pairing of labels or forms, a third or later definition line, a definition line above the citing line or after a line
 * of the unit that is no definition line, and a definition line that itself cites. A footnote reference in any other position
 * on a line (after its second, or a second
 * reference apart from the first) is NOT CLAIMED. A footnote reference's label at either claimed position (a line's only
 * reference, the second of two adjacent references) in any spelling other than cut #3's two ("design-only" and
 * "Status:DESIGN-ONLY.") is NOT CLAIMED by this census - for example a label holding a digit, an underscore, whitespace or
 * another punctuation mark, or one longer than 19 characters - and a one-edit narrowing of FOOTNOTE.reference's label class
 * that both spellings still match reads every control alike and is NOT CLAIMED either (measured: the class with digits, the
 * underscore, whitespace or "!" excluded, or capped at 19 characters, keeps the census green). A footnote reference at either
 * claimed position in any citing-line text other than cut #4's fourteen above is NOT CLAIMED by this census: any other
 * character or none directly before it (a letter other than the "m" ending "program", a capital, a digit, an underscore, a tab
 * or other whitespace, punctuation other than ".", the line start) or directly after it (a letter other than the "a" of "and",
 * a capital, a digit, a tab or other whitespace, punctuation other than "."), a pairing of a before and an after that no line
 * above writes (for example a space on both sides, or the line end or a word after the second reference), and any other text
 * on the citing line. Measured green at this cut, each a one-edit lookaround in FOOTNOTE.reference edited with its roster
 * constant: before the reference (?<!\t), (?<![,;:!?]), (?<!\(), (?<![A-Z]), (?<!\d), (?<!_), (?<!^), (?<![^\S ]) and
 * (?<![a-l]); after it (?!\t), (?![,;:!?]), (?!\)), (?![A-Z]), (?!\d), (?!\.\S), (?!\[) and (?![b-z]); and a lookbehind
 * refusing a space where a space also follows the reference. A FOOTNOTE flag edited in the regex, A5's flags literal and the
 * roster together that changes no control's reading is NOT CLAIMED (measured): the definition with i, s, u, v or d and the
 * reference with i, m, s, u, v or d beside its g read every control alike (re-measured with wb-6aaw's five controls); the
 * definition with m, one of the five members cut #5 named NOT CLAIMED above (W-GP22-MFLAG-NEG), now reds
 * footnote-not-definition-line-separator (wb-6aaw above).
 * RESIDUALS (named, each with its pinned quiet row): R-SCOPE clause (a)'s union only - qa/, test/, the root pages and docs/
 * outside docs/workbench are not judged (Q1); R-REQUIREMENT-ID a unit whose only matches sit in a requirement-id spelling
 * (MW-CAC-WORKFLOW-COMPOSITION-R2) does not cite (Q2); R-PARAPHRASE-CITE a citation spelling none of the program's words in
 * order ("the MW 2026-10-18 composition deposit") does not cite (Q3); R-NEGATION-DISTANCE a negation more than two words before
 * "design-only" does not cancel it (Q4); R-PARAPHRASE-EXISTS an existence claim through a predicate outside EXISTS is not read
 * (Q5); R-GUARD-WORD any GUARD word before the predicate in its clause silences it, whatever it governs (Q6); R-CROSS-CLAUSE a
 * subject and its predicate in different clauses (a pronoun across a sentence end) are not read (Q7); R-SUBJECT-SPELLING a
 * subject spelled outside SUBJECTS is not read (Q8); R-SPLIT-SOURCE a src citation split across a string concatenation is not
 * read (Q9); R-ESCAPED-SPELLING a markdown-escaped or entity-spelled needle does not cite (Q10); R-DOCUMENT-SCOPE an existence
 * claim in a unit that does not cite is not judged, even in a document that cites elsewhere (Q11); R-DEFINITION-HIDES-NEGATION
 * in a unit the carrier view renders (one neither opaque nor shown verbatim as code), a negation that a footnote definition
 * line (a line FOOTNOTE.definition matches) holds does not cancel a status on another line of the unit, because the view drops
 * that line with every word on it (Q12, wb-d5o5 below). Each family is also a row of docs/14's residual table (RESIDUAL
 * ANCHOR).
 * wb-d5o5 (the R694 follow-up of landing 887, gate cmd_707d77443a50: its F1 leads and is cured here by naming the family with
 * its pinned quiet row; the readers, every control and every other pin are unchanged). THE PINNED READER SET, each a case of
 * this file: Q12 judges its probe at docs/workbench/x.md - the unit of the citing line "Pi reads the
 * cac-workflow-composition-2026-10-18 program, which is", the line "[^x]: not" and the line "design-only." (the gate's
 * QUIET-1) - and asserts its causes [] (observed: quiet, the view having dropped "[^x]: not"), then compares its witness (the
 * probe's path, text and causes) with the roster's and re-judges the probe there (observed: equal); the residual-anchor case
 * reads docs/14's row "Q12 | R-DEFINITION-HIDES-NEGATION" and asserts that the probe carries the exemplar "[^x]: not"
 * exactly once, reads quiet, and with it replaced by the clear form "not" reads unqualified (observed: as stated, the two
 * words before "design-only" then being "is not"); the judged-set case holds Q12 in ROWS, the frozen-shape literal (Q:12),
 * IMPL, RESIDUALS and the roster's rows and constants (observed: equal); the closing case holds Q12 in the roster's tests,
 * registered, run and reached (observed: as stated). Falsifiers, each measured red at this cut on a throwaway copy of the
 * census and the roster (docs/14 edited in place and restored byte-identical): the view keeping a definition line
 * (carrierView's FOOTNOTE.definition filter dropped) or FOOTNOTE.definition never matching (its roster constant with it)
 * reads the probe unqualified and reds Q12, A5, the residual-anchor case and the closing case (4 failed | 29 passed (33)
 * each); the view dropping every line of the unit from its first definition line on reds Q12, the residual-anchor case and
 * the closing case (3 | 30); the probe edited in IMPL alone ("never" for "not"), or stripped of its definition syntax in
 * IMPL and the roster together, reds the same three (3 | 30 each); docs/14's Q12 row removed, its clear form made
 * "[^y]: not", its exemplar and clear form made "[^x]: never" and "never", or the family renamed in RESIDUALS and the
 * roster together reds the residual-anchor case (1 | 32 each); and Q12 removed from ROWS, the frozen-shape literal, IMPL,
 * RESIDUALS, the residual-table literal and the roster together (the CT6 coordinated hollow) reds the residual-anchor case
 * against the row docs/14 keeps (1 failed | 31 passed (32)). Q12's definition line is in a form the NOT CLAIMED paragraph
 * above names (the label x, the text " not"): A5's definition-line claim is unchanged, and cut #5's sentence above (how the
 * census reads a page whose definition line is in a NOT CLAIMED form is NOT CLAIMED, quiet or not) holds for every such page
 * but Q12's probe, whose quiet reading this residual pins. NOT CLAIMED: Q12 pins one page of the family, and how the
 * census reads any other page whose footnote definition line holds a negation is NOT CLAIMED by this census - among them
 * the five sibling pages the gate measured quiet beside QUIET-1, re-authored here from its descriptions (the citing line's
 * reference [^s] with the definition label s; the unit behind "> "; "never" for "not"; the definition line indented by
 * two spaces; and a citing line ending "design-only" over the line "[^x]: no longer."), each measured quiet again at this
 * cut's base de6deb2b as a throwaway A5 control expecting unqualified (2 failed | 30 passed (32) each: A5 and the closing
 * case).
 * SCOPE: the judges read words, not meaning. OVER-READS (disclosed; none today): a citing paragraph whose only status is a
 * paraphrase ("design only", a README.md:21 fragment) flags; a "Pi adapter" in a citing unit reads as the Pi MW adapter; a
 * code symbol that merely names the program (a status constant) flags as code; a status carried only by a heading or a
 * neighbouring paragraph or comment does not qualify a unit; and, from the carrier view (wb-3cql, each conservative): a
 * citation only a comment or a link destination holds still needs a carrier the page shows; a citing unit whose rendering
 * holds a raw HTML element (an inline <br> or <span>, an element inside a list item or quote) or that sits in a list or quote
 * with raw HTML across a blank line carries nothing; the lines of a top-level raw HTML block (even a visible <pre> or
 * <details>) and a comment's closing line after its --> show no carrier, nor does a footnote definition (conservative for a
 * status the definition line holds, not for a negation it holds: cut #5 above, and the residual R-DEFINITION-HIDES-NEGATION
 * with its quiet row Q12 above); a carrier spelled with an
 * entity (design&#45;only) does not qualify. One reading is measured, not
 * assumed: a "[s]: <url>" line directly under a citing line cannot be a definition (a definition cannot interrupt a
 * paragraph), so marked and CommonMark both show it as text and a status in its URL qualifies (A5 definition-cannot-interrupt;
 * the definition above the citing line, or after a blank line, is hidden: A5 definition).
 *
 * Display paths added: none (test-only; src/ is read, never edited). Scratch: B3 composes makeScratch/removeScratch with the
 * leak guard installed; docs, src, .beads and git objects are otherwise only read.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { Lexer, type Links, marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "mw-cac-citation-status-roster.json");
const BEAD = "wb-kku9.2";
const KLR7 = "wb-klr7";
const EXPORT = ".beads/issues.jsonl";
const DOCS07 = "docs/workbench/07-native-integrations.md";
const DOCS07_CENSUS = "test/workbench-docs07-provider-rules.census.ts";
const DOCS07_PARENT = "07 — MechanicalWorkflows and ecosystem native SDK integration";
const IDENTITY = "src/workbench/identity.ts";
const SCHEMA_LITERAL = "workflow-script/v1";
const FILING_PIN = "d75b68d10a1a3a183d6fb7a55088f38f86c018a2";
const PROGRAM_PATH = "docs/programs/cac-workflow-composition-2026-10-18/README.md";

/** Clause (a)'s scopes: docs/workbench outside receipts/, receipts, src (the scope pins name them). */
interface Scope {
  readonly word: string;
  readonly root: string;
  readonly exclude: string;
}
const SCOPES: Readonly<Record<"A1" | "A2" | "A3", Scope>> = {
  A1: { word: "docs/workbench", root: "docs/workbench", exclude: "docs/workbench/receipts/" },
  A2: { word: "receipts", root: "docs/workbench/receipts", exclude: "" },
  A3: { word: "src", root: "src", exclude: "" },
};
const SCOPE_PINS = ["A1", "A2", "A3"] as const;
/** Floors measured at this census's base caad951 (files exactly; units 1660, 1544 and 102328 read with each leg's plant, floored near 90%). */
const FLOORS: Readonly<Record<"A1" | "A2" | "A3", { files: number; units: number }>> = {
  A1: { files: 25, units: 1500 },
  A2: { files: 44, units: 1400 },
  A3: { files: 115, units: 92000 },
};
/** The filing pin's tree is fixed: the readers' exact unit count over its clause (a) union plus the A1 plant (measured). */
const PIN_UNITS = 105176;

/** Clause (a)'s quoted literals and carrier word; the anchor case reads them from the bead row. */
const CITED = ["cac-workflow-composition", "CACWorkflowCompositionV0"];
const DESIGN_ONLY = "design-only";
const SEPARATOR_RUN = "[\\s_-]*";
function escaped(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/** A literal's words: split at hyphens, underscores, spaces and lower-to-upper camel boundaries. */
function wordsOf(literal: string): string[] {
  return literal
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[\s_-]+/)
    .filter(word => word.length > 0);
}
function citationSource(literals: readonly string[]): string {
  return literals.map(literal => wordsOf(literal).map(escaped).join(SEPARATOR_RUN)).join("|");
}
const CITATION = new RegExp(citationSource(CITED), "gi");
/** The bead family's own requirement-id spelling (derived from this bead's title in the anchor case). */
const REQUIREMENT_ID = /\bMW-CAC-WORKFLOW-COMPOSITION-R\d+\b/g;
/** The README.md:21 sentence (the filing's quote); the final period is optional when matched. */
const README21 = "As of 2026-10-18 (19ca8d4) these are interface/theorem research requirements, not a claim that source code was modified or native workflows were run.";
const README21_PATTERN = new RegExp(
  README21.replace(/\.$/, "")
    .split(/\s+/)
    .map(escaped)
    .join("\\s+"),
);
const DESIGN_ONLY_PATTERN = new RegExp(`(?<![\\w-])${escaped(DESIGN_ONLY)}(?![\\w-])`, "gi");
const STATUS_NEGATION_BEFORE = /\b(?:not|never|nor|no|isn't|aren't|wasn't|weren't)\b/i;
const STATUS_NEGATION_AFTER = /^\W*(?:no longer|no more|any ?more)\b/i;

/** The statement's three subjects, in its order. */
interface Subject {
  readonly id: string;
  readonly spelling: string;
  readonly pattern: RegExp;
}
const SUBJECTS: readonly Subject[] = [
  { id: "v0", spelling: "CACWorkflowCompositionV0", pattern: /CAC[\s_-]*Workflow[\s_-]*Composition[\s_-]*V0/i },
  { id: "bridge-checker", spelling: "a bridge checker", pattern: /\bbridge[\s_-]*checkers?\b/i },
  { id: "pi-mw-adapter", spelling: "a Pi MW adapter", pattern: /\b(?:Pi(?:[\s_-]+(?:MW|MechanicalWorkflows))?|MW|MechanicalWorkflows)[\s_-]+adapters?\b/i },
];
const EXISTS = /\b(?:exist(?:s|ing|ed)?|ship(?:s|ped|ping)?|wired|implement(?:s|ed)|available|land(?:s|ed)|released|published|live|supported|consum(?:es|ed)|runs|enforce[sd])\b/gi;
const GUARD =
  /\b(?:no|not|never|none|nothing|nor|neither|without|cannot|can't|isn't|aren't|wasn't|weren't|doesn't|don't|didn't|won't|hasn't|haven't|when|whenever|once|if|until|unless|before|would|will|may|might|could|should|proposed|planned|future|yet)\b/i;
const GUARD_AFTER = /^\s*(?:nowhere|nothing|none|not|never|no)\b/i;
const CLAUSE_SPLIT = /(?<=[.!?])\s+|;/;
/** The carrier view (wb-3cql F3): marked token types whose text no reader of the rendered page sees as a status. */
const UNSHOWN: readonly string[] = ["html", "image", "def", "del", "space", "hr"];
/** An html token opening or closing an element: an attribute or a style can hide the text between its tags, so its view is opaque. */
const ELEMENT = /^<\/?[A-Za-z]/;
/** Footnote syntax shows no carrier: a reference renders as a number (never its label), a definition apart from its paragraph. */
const FOOTNOTE = { reference: /\[\^[^\]\n]+\]/g, definition: /^\s*(?:>\s*)*\[\^[^\]\n]+\]:/ };

const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-SCOPE": ["Q1"],
  "R-REQUIREMENT-ID": ["Q2"],
  "R-PARAPHRASE-CITE": ["Q3"],
  "R-NEGATION-DISTANCE": ["Q4"],
  "R-PARAPHRASE-EXISTS": ["Q5"],
  "R-GUARD-WORD": ["Q6"],
  "R-CROSS-CLAUSE": ["Q7"],
  "R-SUBJECT-SPELLING": ["Q8"],
  "R-SPLIT-SOURCE": ["Q9"],
  "R-ESCAPED-SPELLING": ["Q10"],
  "R-DOCUMENT-SCOPE": ["Q11"],
  "R-DEFINITION-HIDES-NEGATION": ["Q12"],
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A to C and E, to the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) static census over docs/workbench, receipts and src: every string containing 'cac-workflow-composition' or 'CACWorkflowCompositionV0' also carries 'design-only' or the verbatim README.md:21 sentence in the same paragraph (passes empty today)",
    pins: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
  },
  { id: "B", label: "(b) mutant: an unqualified citation naming CACWorkflowCompositionV0 as a shipped type fails the census", pins: ["B1", "B2", "B3"] },
  {
    id: "C",
    label:
      "(c) if docs/workbench/07 § MechanicalWorkflows gains the wb-klr7 acceptance (c) sentence, it carries the status verbatim and is bound by test/workbench-docs07-provider-rules.census.ts",
    pins: ["C1", "C2", "C3"],
  },
  { id: "E", label: "shall not present CACWorkflowCompositionV0, a bridge checker or a Pi MW adapter as existing", pins: ["E1", "E2", "E3"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12"] },
];
/** Each judged pin's quote: the quotes of a row tile its clause (the anchor case). */
const QUOTES: Readonly<Record<string, string>> = {
  A1: "static census over docs/workbench",
  A2: "receipts",
  A3: "and src",
  A4: "every string containing 'cac-workflow-composition' or 'CACWorkflowCompositionV0'",
  A5: "also carries 'design-only'",
  A6: "or the verbatim README.md:21 sentence",
  A7: "in the same paragraph",
  A8: "passes empty today",
  B1: "mutant: an unqualified citation",
  B2: "naming CACWorkflowCompositionV0 as a shipped type",
  B3: "fails the census",
  C1: "if docs/workbench/07 § MechanicalWorkflows gains the wb-klr7 acceptance (c) sentence",
  C2: "it carries the status verbatim",
  C3: "and is bound by test/workbench-docs07-provider-rules.census.ts",
  E1: "shall not present CACWorkflowCompositionV0",
  E2: "a bridge checker",
  E3: "or a Pi MW adapter as existing",
};

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
  readonly bead: string;
  readonly producer: { [key: string]: JsonValue };
  readonly constants: { [key: string]: JsonValue };
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
function objectOf(value: unknown, field: string): { [key: string]: JsonValue } {
  const parsed = json(value);
  if (!isObject(parsed)) throw new Error(`${field} must be an object`);
  return parsed as { [key: string]: JsonValue };
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || typeof raw.bead !== "string" || !Array.isArray(raw.rows) || !Array.isArray(raw.tests)) {
    throw new Error("roster must be an object with bead, rows and tests");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const tests = raw.tests.map((title: unknown, index: number): string => {
    if (typeof title !== "string") throw new Error(`roster tests[${index}] must be a string`);
    return title;
  });
  return { bead: raw.bead, producer: objectOf(raw.producer, "roster producer"), constants: objectOf(raw.constants, "roster constants"), tests, rows };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

function textOf(path: string): string {
  return readFileSync(join(REPO, path), "utf8");
}

type UnitKind = "block" | "line" | "string" | "comment" | "code";
/** What a reader sees of a unit, as a carrier: an opaque view carries nothing. */
interface CarrierView {
  readonly text: string;
  readonly opaque: boolean;
}
interface Unit {
  readonly line: number;
  readonly kind: UnitKind;
  readonly text: string;
  /** A markdown unit's carrier view (THE CARRIER VIEW), read lazily; a unit without one is shown as its text. */
  readonly view?: () => CarrierView;
}
const BLANK = /^\s*(?:>\s*)*$/;
const LIST_ITEM = /^\s*(?:>\s*)*(?:[-*+]|\d{1,9}[.)])\s+/;
const HEADING = /^\s{0,3}#{1,6}(?:\s|$)/;
const TABLE_ROW = /^\s*\|/;
const FENCE = /^\s{0,3}(?:`{3,}|~{3,})/;

/** A markdown line's place in its document's own rendering: rendered with its unit, shown verbatim as code, hidden, or opaque. */
type LineShow = "rendered" | "code" | "hidden" | "opaque";
const SHOW_RANK: Readonly<Record<LineShow, number>> = { rendered: 0, code: 1, hidden: 2, opaque: 3 };
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
function childrenOf(token: Token): readonly Token[] {
  if (isList(token)) return token.items.flatMap(item => item.tokens);
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
}
function textField(token: Token): string {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
}
/** A list or quote whose raw HTML crosses a blank line: the census's units cannot see where that HTML ends. */
function spansBlankLine(token: Token): boolean {
  return childrenOf(token).some(child => (child.type === "html" && /\n[ \t>]*\n/.test(child.raw)) || spansBlankLine(child));
}
function placeOf(token: Token, line: string): LineShow {
  if (token.type === "html" || token.type === "def") return "hidden";
  if (token.type === "code") return FENCE.test(line) ? "hidden" : "code";
  if ((token.type === "list" || token.type === "blockquote") && spansBlankLine(token)) return "opaque";
  return "rendered";
}
/** Each line's place, read from marked's top-level tokens of the whole document (their raws tile its source), and its link definitions. */
function documentView(text: string): { readonly places: readonly LineShow[]; readonly links: Links } {
  const source = text.split("\n");
  const places: LineShow[] = source.map(() => "rendered");
  const tokens = marked.lexer(text);
  let line = 0;
  for (const token of tokens) {
    const breaks = token.raw.split("\n").length - 1;
    const last = token.raw.endsWith("\n") ? line + breaks - 1 : line + breaks;
    for (let at = line; at <= last && at < source.length; at += 1) {
      const place = placeOf(token, source[at] ?? "");
      if (SHOW_RANK[place] > SHOW_RANK[places[at] ?? "rendered"]) places[at] = place;
    }
    line += breaks;
  }
  return { places, links: tokens.links };
}
/** What a reader sees of marked tokens as a carrier: unshown types and a link's destination and title show nothing. */
function shownText(tokens: readonly Token[], separator: string, view: { opaque: boolean }): string {
  return tokens
    .map(token => {
      if (token.type === "html" && ELEMENT.test(token.raw.trim())) view.opaque = true;
      if (UNSHOWN.includes(token.type)) return "";
      if (token.type === "br") return "\n";
      if (isList(token)) return token.items.map(item => shownText(item.tokens, "\n", view)).join("\n");
      if (isTable(token)) return [...token.header, ...token.rows.flat()].map(cell => shownText(cell.tokens, "", view)).join(" ");
      const children = childrenOf(token);
      return children.length > 0 ? shownText(children, token.type === "blockquote" ? "\n" : "", view) : textField(token);
    })
    .join(separator);
}
/** A unit's carrier view: its hidden lines dropped, code shown verbatim, the rest rendered on its own (indentation removed, footnote syntax removed, the document's definitions preloaded). */
function carrierView(lines: readonly string[], places: readonly LineShow[], links: Links): CarrierView {
  if (places.includes("opaque")) return { text: "", opaque: true };
  const kept = lines.filter((_, index) => places[index] !== "hidden");
  if (places.every(place => place === "code" || place === "hidden")) return { text: kept.join("\n"), opaque: false };
  const markdown = kept
    .filter(line => !FOOTNOTE.definition.test(line))
    .map(line => line.replace(/^[ \t]+/, "").replace(FOOTNOTE.reference, ""))
    .join("\n");
  const lexer = new Lexer();
  Object.assign(lexer.tokens.links, links);
  const view = { opaque: false };
  const text = shownText(lexer.lex(markdown), "\n", view);
  return { text, opaque: view.opaque };
}

/** Markdown units: blank-line blocks; a heading, a table row and each fenced line are units of their own; a list item opens one. */
function markdownUnits(text: string): Unit[] {
  const units: Unit[] = [];
  let document: ReturnType<typeof documentView> | undefined;
  /** The document's own rendering, read once and only when a citing unit asks for its view. */
  const read = (): ReturnType<typeof documentView> => {
    document ??= documentView(text);
    return document;
  };
  const push = (line: number, kind: UnitKind, lines: readonly string[]): void => {
    const view = (): CarrierView => {
      const { places, links } = read();
      return carrierView(
        lines,
        lines.map((_, offset) => places[line - 1 + offset] ?? "rendered"),
        links,
      );
    };
    units.push({ line, kind, text: lines.join("\n"), view });
  };
  let open: { line: number; lines: string[] } | undefined;
  let fenced = false;
  const flush = (): void => {
    if (open !== undefined) push(open.line, "block", open.lines);
    open = undefined;
  };
  for (const [index, line] of text.split("\n").entries()) {
    const at = index + 1;
    if (FENCE.test(line)) {
      flush();
      fenced = !fenced;
      push(at, "line", [line]);
    } else if (fenced) push(at, "line", [line]);
    else if (BLANK.test(line)) flush();
    else if (HEADING.test(line) || TABLE_ROW.test(line)) {
      flush();
      push(at, "line", [line]);
    } else if (LIST_ITEM.test(line) || open === undefined) {
      flush();
      open = { line: at, lines: [line] };
    } else open.lines.push(line);
  }
  flush();
  return units;
}
/** Source units through the TypeScript AST: strings (cooked), templates, comments (leading and same-line trailing ranges), and identifiers as code. */
function sourceUnits(path: string, text: string): Unit[] {
  const kind = /\.(?:m|c)?jsx?$/.test(path) ? ts.ScriptKind.JS : path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, kind);
  const units: Unit[] = [];
  const seen = new Set<number>();
  const lineOf = (position: number): number => file.getLineAndCharacterOfPosition(position).line + 1;
  const comments = (start: number, end: number): void => {
    for (const range of [...(ts.getLeadingCommentRanges(text, start) ?? []), ...(ts.getTrailingCommentRanges(text, end) ?? [])]) {
      if (seen.has(range.pos)) continue;
      seen.add(range.pos);
      units.push({ line: lineOf(range.pos), kind: "comment", text: text.slice(range.pos, range.end) });
    }
  };
  const visit = (node: ts.Node): void => {
    if (node.kind >= ts.SyntaxKind.FirstJSDocNode && node.kind <= ts.SyntaxKind.LastJSDocNode) return;
    comments(node.getFullStart(), node.getEnd());
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isRegularExpressionLiteral(node)) {
      units.push({ line: lineOf(node.getStart(file)), kind: "string", text: node.text });
    } else if (ts.isTemplateExpression(node)) {
      const body = node.head.text + node.templateSpans.map(span => `\${${span.expression.getText(file)}}${span.literal.text}`).join("");
      units.push({ line: lineOf(node.getStart(file)), kind: "string", text: body });
    } else if ((ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) && !ts.isTemplateExpression(node.parent) && !ts.isTemplateSpan(node.parent)) {
      units.push({ line: lineOf(node.getStart(file)), kind: "string", text: node.text });
    } else if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      units.push({ line: lineOf(node.getStart(file)), kind: "code", text: node.text });
    }
    for (const child of node.getChildren(file)) visit(child);
  };
  visit(file);
  return units;
}
function unitsOf(path: string, text: string): Unit[] {
  if (path.endsWith(".md")) return markdownUnits(text);
  if (/\.(?:[cm]?tsx?|[cm]?jsx?)$/.test(path)) return sourceUnits(path, text);
  return text.split("\n").flatMap((line, index) => (line.trim() === "" ? [] : [{ line: index + 1, kind: "line" as const, text: line }]));
}

/** The matches of CITATION that sit outside every requirement-id spelling. */
function citations(text: string): string[] {
  const ids = [...text.matchAll(REQUIREMENT_ID)].map(match => [match.index, match.index + match[0].length] as const);
  return [...text.matchAll(CITATION)].filter(match => !ids.some(([from, to]) => match.index >= from && match.index < to)).map(match => match[0]);
}
function carries(text: string): boolean {
  for (const hit of text.matchAll(DESIGN_ONLY_PATTERN)) {
    const before = text.slice(0, hit.index).split(/\s+/).filter(word => word.length > 0).slice(-2).join(" ");
    if (!STATUS_NEGATION_BEFORE.test(before) && !STATUS_NEGATION_AFTER.test(text.slice(hit.index + hit[0].length))) return true;
  }
  return README21_PATTERN.test(text);
}
/** The subjects a text presents as existing (clause by clause). */
function existenceClaims(text: string): string[] {
  const claimed = new Set<string>();
  for (const clause of text.split(CLAUSE_SPLIT)) {
    for (const subject of SUBJECTS) {
      if (!subject.pattern.test(clause)) continue;
      for (const word of clause.matchAll(EXISTS)) {
        if (GUARD.test(clause.slice(0, word.index)) || GUARD_AFTER.test(clause.slice(word.index + word[0].length))) continue;
        claimed.add(subject.id);
        break;
      }
    }
  }
  return SUBJECTS.map(subject => subject.id).filter(id => claimed.has(id));
}
/** One unit's verdict: whether it cites (raw text), and its causes - its carrier read on its carrier view (wb-3cql F3), its existence claims on the raw text. */
function judgeUnit(unit: Unit): { cites: boolean; causes: string[] } {
  if (citations(unit.text).length === 0) return { cites: false, causes: [] };
  if (unit.kind === "code") return { cites: true, causes: ["code"] };
  const view = unit.view?.() ?? { text: unit.text, opaque: false };
  const carried = !view.opaque && carries(view.text);
  return { cites: true, causes: [...(carried ? [] : ["unqualified"]), ...existenceClaims(unit.text).map(id => `exists:${id}`)] };
}
interface FileText {
  readonly path: string;
  readonly text: string;
}
interface Judgement {
  readonly units: number;
  readonly citing: readonly string[];
  readonly findings: readonly string[];
}
function judgeFiles(files: readonly FileText[]): Judgement {
  let units = 0;
  const citing: string[] = [];
  const findings: string[] = [];
  for (const file of files) {
    for (const unit of unitsOf(file.path, file.text)) {
      units += 1;
      const verdict = judgeUnit(unit);
      if (verdict.cites) citing.push(`${file.path}:${unit.line}`);
      for (const cause of verdict.causes) findings.push(`${file.path}:${unit.line} ${cause}`);
    }
  }
  return { units, citing, findings };
}
/** Causes of one control text read as a whole file at a path. */
function causesOf(path: string, text: string): string[] {
  return judgeFiles([{ path, text }]).findings.map(finding => finding.slice(finding.indexOf(" ") + 1));
}

/** git's tracked list of a scope under a root (the working tree's index, or a tree-ish at REPO). */
function scopeList(root: string, scope: Scope, treeish?: string): string[] {
  const args = treeish === undefined ? ["ls-files", "--", scope.root] : ["ls-tree", "-r", "--name-only", treeish, "--", scope.root];
  return execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
    .split("\n")
    .filter(path => path.length > 0 && (scope.exclude === "" || !path.startsWith(scope.exclude)))
    .sort();
}
/** The same scope read from the filesystem: the walk's outside anchor. */
function scopeWalk(root: string, scope: Scope): string[] {
  return readdirSync(join(root, scope.root), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => relative(root, join(entry.parentPath, entry.name)))
    .filter(path => scope.exclude === "" || !path.startsWith(scope.exclude))
    .sort();
}
/** Every blob of a tree-ish's paths through one git cat-file --batch call. */
function treeTexts(treeish: string, paths: readonly string[]): FileText[] {
  const out = execFileSync("git", ["cat-file", "--batch"], { cwd: REPO, input: `${paths.map(path => `${treeish}:${path}`).join("\n")}\n`, maxBuffer: 256 * 1024 * 1024 });
  const files: FileText[] = [];
  let at = 0;
  for (const path of paths) {
    const end = out.indexOf(10, at);
    const header = out.subarray(at, end).toString("utf8").split(" ");
    if (header[1] !== "blob") throw new Error(`${treeish}:${path} is not a blob (${header.join(" ")})`);
    const size = Number(header[2]);
    files.push({ path, text: out.subarray(end + 1, end + 1 + size).toString("utf8") });
    at = end + 1 + size + 1;
  }
  return files;
}
/** readScope: git's list of a scope under a root, every file read and judged, then the plants judged by the same call. */
function readScope(root: string, scope: Scope, plants: readonly FileText[] = []): Judgement & { files: readonly string[] } {
  const files = scopeList(root, scope);
  return { files, ...judgeFiles([...files.map(path => ({ path, text: readFileSync(join(root, path), "utf8") })), ...plants]) };
}

const PLANT_MD = [
  "# Plant",
  "",
  "The MechanicalWorkflows cac-workflow-composition-2026-10-18 program is design-only.",
  "",
  "Pi reads the cac-workflow-composition-2026-10-18 program.",
  "",
  "CACWorkflowCompositionV0 (design-only) ships in Pi.",
  "",
].join("\n");
const PLANT_TS = [
  "// The MechanicalWorkflows cac-workflow-composition-2026-10-18 program is design-only.",
  'export const NOTE = "Pi reads the cac-workflow-composition-2026-10-18 program.";',
  'export const CLAIM = "CACWorkflowCompositionV0 (design-only) ships in Pi.";',
  "export type CACWorkflowCompositionV0 = { readonly steps: readonly string[] };",
  "",
].join("\n");
const PLANTS: Readonly<Record<"A1" | "A2" | "A3", FileText>> = {
  A1: { path: "docs/workbench/zz-wb-kku9.2-plant.md", text: PLANT_MD },
  A2: { path: "docs/workbench/receipts/zz-wb-kku9.2-plant.md", text: PLANT_MD },
  A3: { path: "src/zz-wb-kku9.2-plant.ts", text: PLANT_TS },
};

interface Control {
  readonly id: string;
  readonly path?: string;
  readonly text: string;
  readonly causes: readonly string[];
}
/** Judges each control at its path (docs by default) and asserts its causes; returns the readings for the witness. */
function controlsHold(controls: readonly Control[]): { id: string; causes: string[] }[] {
  return controls.map(control => {
    const causes = causesOf(control.path ?? "docs/workbench/x.md", control.text);
    expect(causes, `${control.id}: its causes`).toEqual([...control.causes]);
    return { id: control.id, causes };
  });
}
/** A residual's quiet row (wb-3cql F1): its witness carries its own probe beside its causes, so a row swapped for another's reds. */
function quiet(path: string, text: string, why: string): JsonValue {
  const causes = causesOf(path, text);
  expect(causes, why).toEqual([]);
  return json({ path, text, causes });
}
/** A quiet row's probe, read back from its witness (re-judged where the witness is compared). */
function probeOf(witness: JsonValue): { path: string; text: string; causes: unknown } | undefined {
  if (!isObject(witness) || typeof witness.path !== "string" || typeof witness.text !== "string" || !Object.hasOwn(witness, "causes")) return undefined;
  return { path: witness.path, text: witness.text, causes: witness.causes };
}
function scopeLeg(pin: "A1" | "A2" | "A3", liveness: (files: readonly string[]) => JsonValue): JsonValue {
  const scope = SCOPES[pin];
  const listed = scopeList(REPO, scope);
  expect(listed, `${scope.root}: git's tracked list is the filesystem walk, both ways`).toEqual(scopeWalk(REPO, scope));
  expect(listed.length, `floor: ${FLOORS[pin].files} files at this census's base`).toBeGreaterThanOrEqual(FLOORS[pin].files);
  const plant = PLANTS[pin];
  const reading = readScope(REPO, scope, [plant]);
  expect(reading.files, "readScope reads git's tracked list").toEqual(listed);
  expect(reading.units, `floor: ${FLOORS[pin].units} units at this census's base`).toBeGreaterThanOrEqual(FLOORS[pin].units);
  const plantFindings = reading.findings.filter(finding => finding.startsWith(`${plant.path}:`));
  expect(reading.findings, "the only findings are the plant's: no tracked unit is an unqualified citation or an existence claim").toEqual(plantFindings);
  return json({
    scope: scope.root,
    walkIsTracked: true,
    floor: FLOORS[pin].files,
    unitFloor: FLOORS[pin].units,
    liveness: liveness(listed),
    plantCiting: reading.citing.filter(entry => entry.startsWith(`${plant.path}:`)),
    findings: reading.findings,
  });
}

/** docs/07's one level-2 heading naming MechanicalWorkflows, and its section up to the next level-1/2 heading or EOF. */
function mwSection(docs: string): { heading: string; headings: number; body: string } {
  const headings = [...docs.matchAll(/^## (.*MechanicalWorkflows.*)$/gm)];
  const first = headings[0];
  if (first === undefined) return { heading: "", headings: 0, body: "" };
  const after = docs.slice(first.index + first[0].length);
  const next = /^#{1,2} /m.exec(after);
  return { heading: first[1] ?? "", headings: headings.length, body: next === null ? after : after.slice(0, next.index) };
}
function squeezed(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}
/** Clause (c)'s binding duty: each citing unit of the section held verbatim (whitespace-squeezed) in the holder's text. */
function unbound(section: string, holder: string): string[] {
  const held = squeezed(holder);
  return markdownUnits(section)
    .filter(unit => judgeUnit(unit).cites && !held.includes(squeezed(unit.text)))
    .map(unit => squeezed(unit.text));
}

/** The bead's own row in the tracker export. */
function beadNotes(bead: string): string {
  for (const line of rehydrateTrackerExport(textOf(EXPORT), join(REPO, EXPORT)).split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === bead && typeof row.notes === "string") return row.notes;
  }
  return "";
}
function beadTitle(bead: string): string {
  for (const line of rehydrateTrackerExport(textOf(EXPORT), join(REPO, EXPORT)).split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === bead && typeof row.title === "string") return row.title;
  }
  return "";
}
/** The acceptance clauses by letter: the line that opens with "Acceptance: (a) ", cut before its "Not P0/P1" tail. */
function acceptanceClauses(notes: string): Record<string, string> {
  const start = notes.indexOf("Acceptance: (a) ");
  if (start === -1) return {};
  const end = notes.indexOf("\n", start);
  const line = notes.slice(start + "Acceptance: ".length, end === -1 ? undefined : end);
  const tail = line.indexOf(" Not P0/P1:");
  const body = (tail === -1 ? line : line.slice(0, tail)).trim();
  const clauses: Record<string, string> = {};
  for (const match of body.matchAll(/\(([a-z])\) (.*?)(?=; \([a-z]\) |\.$)/gs)) clauses[match[1] ?? ""] = match[2] ?? "";
  return clauses;
}
function statementOf(notes: string): string {
  const first = notes.split("\n")[0] ?? "";
  const prefix = "Full statement (title trimmed to bd's 500-character limit): ";
  return first.startsWith(prefix) ? first.slice(prefix.length) : "";
}
function quoteOf(label: string): string {
  return label.replace(/^\([a-z]\) /, "");
}
function letterOf(label: string): string {
  return /^\(([a-z])\) /.exec(label)?.[1] ?? "";
}
function quotedWords(text: string): string[] {
  return [...text.matchAll(/'([^']+)'/g)].map(match => match[1] ?? "");
}
/** The quotes tile the clause in order, with nothing but separators (whitespace, comma, semicolon, colon, parentheses) between. */
function tiles(clause: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = clause.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:()]*$/.test(clause.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:()]*$/.test(clause.slice(at));
}

/**
 * RESIDUAL ANCHOR (wb-ubhh, landing 442's F5 and F7): docs/14's residual table, the residual families' anchor outside this
 * census's two files (the wb-64x.1 form). Each row names a quiet row, its family, an exemplar its probe carries exactly once, a
 * clear form that undoes the family, and what the probe reads with the exemplar replaced by the clear form.
 */
const RESIDUAL_DOC = "docs/workbench/14-qa-and-benchmarks.md";
const RESIDUAL_DOC_TITLE = `14 ${String.fromCodePoint(0x2014)} Test strategy, conformance suite, benchmark and adversarial controls`;
const RESIDUAL_HEADING = "MW workflow-composition citation-status census residuals";
const RESIDUAL_COLUMNS: readonly string[] = ["Quiet row", "Residual family", "Exemplar", "Clear form", "Clear form reads"];
const RESIDUAL_ANCHOR_TITLE =
  "the residual anchor: docs/14's residual table names exactly the residual families and their quiet rows, each row's exemplar is its quiet row's probe's, and its clear form reads what the table says";
interface AnchorRow {
  readonly pin: string;
  readonly family: string;
  readonly exemplar: string;
  readonly clear: string;
  readonly reads: string;
}
const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
/** A token list's tokens, nested ones (list items, quotes, table cells) included. */
function allTokens(tokens: readonly Token[]): Token[] {
  return tokens.flatMap(token => [token, ...allTokens(childrenOf(token)), ...(isTable(token) ? [...token.header, ...token.rows.flat()].flatMap(cell => allTokens(cell.tokens)) : [])]);
}
/** A whole-cell code span's text as written: an exemplar or a clear form is literal source text (`\n` a line break). */
function codeCell(cell: Tokens.TableCell | undefined): string | undefined {
  const only = cell?.tokens.length === 1 ? cell.tokens[0] : undefined;
  return only?.type === "codespan" ? textField(only) : undefined;
}
/** docs/14's residual section: its shape faults, its rows (cells as written) and its source text. */
function residualAnchor(markdown: string): { readonly shape: readonly string[]; readonly rows: readonly AnchorRow[]; readonly raw: string } {
  const tokens = marked.lexer(markdown);
  const named = allTokens(tokens).filter(token => isHeading(token) && token.text === RESIDUAL_HEADING);
  const heading = named.length === 1 ? named[0] : undefined;
  const start = heading !== undefined && isHeading(heading) && heading.depth === 2 ? tokens.indexOf(heading) : -1;
  if (start < 0) return { shape: [`${RESIDUAL_DOC} holds exactly one top-level level-2 heading '${RESIDUAL_HEADING}'`], rows: [], raw: "" };
  const shape: string[] = [];
  const title = tokens.find(isHeading);
  if (title === undefined || title.depth !== 1 || title.text !== RESIDUAL_DOC_TITLE) shape.push("the page opens with the docs/14 title");
  if (tokens.slice(0, start).some(token => isHeading(token) && token.depth === 1 && token !== title)) shape.push("no other level-1 heading stands before the residual section");
  const after = tokens.slice(start + 1);
  const end = after.findIndex(token => isHeading(token) && token.depth <= 2);
  const section = end < 0 ? after : after.slice(0, end);
  const raw = section.map(token => token.raw).join("");
  if (allTokens(section).some(token => token.type === "html")) shape.push("the residual section holds no raw HTML");
  const blocks = section.filter(token => token.type !== "space");
  const table = blocks[1];
  if (blocks.length !== 2 || blocks[0]?.type !== "paragraph" || table === undefined || !isTable(table)) return { shape: [...shape, "the residual section is exactly its intro paragraph and one table"], rows: [], raw };
  const columns = table.header.map(cell => cell.text.trim());
  if (!isDeepStrictEqual(columns, RESIDUAL_COLUMNS)) shape.push(`the residual table's columns are ${RESIDUAL_COLUMNS.join(" | ")}`);
  const rows: AnchorRow[] = [];
  for (const [index, cells] of table.rows.entries()) {
    const exemplar = codeCell(cells[2]);
    const clear = codeCell(cells[3]);
    if (cells.length !== RESIDUAL_COLUMNS.length || exemplar === undefined || clear === undefined) shape.push(`residual row ${index + 1} is five cells with a code-span exemplar and clear form`);
    else rows.push({ pin: cells[0]?.text.trim() ?? "", family: cells[1]?.text.trim() ?? "", exemplar, clear, reads: cells[4]?.text.trim() ?? "" });
  }
  return { shape, rows, raw };
}
/** The clause (a) scopes whose roots would list a path (git's list under the root, the excluded prefix dropped). */
function scopesListing(path: string): string[] {
  return SCOPE_PINS.filter(pin => path.startsWith(`${SCOPES[pin].root}/`) && (SCOPES[pin].exclude === "" || !path.startsWith(SCOPES[pin].exclude))).map(pin => SCOPES[pin].word);
}
/** A quiet row's probe as the anchor reads it: R-SCOPE's is Q1's outside list (one path a line, read as the scopes that would list
 * each), every other family's is its probe's text, read as its causes at its path. */
function anchorProbe(witness: JsonValue): { readonly text: string; readonly read: (text: string) => string[] } | undefined {
  const probe = probeOf(witness);
  if (probe !== undefined) return { text: probe.text, read: text => causesOf(probe.path, text) };
  if (!isObject(witness) || !Array.isArray(witness.outside)) return undefined;
  const outside = witness.outside.filter((path): path is string => typeof path === "string");
  return { text: outside.join("\n"), read: text => text.split("\n").flatMap(scopesListing) };
}

/** The pins that reached their witness compare, in run order, each with the compare's own result. */
const REACHED: { pin: string; same: boolean }[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue>> = {
  A1: () =>
    scopeLeg("A1", files => {
      const misses = files.filter(path => !(unitsOf(path, textOf(path))[0]?.text ?? "").startsWith("# "));
      expect(misses, "every docs/workbench page outside receipts/ opens with a level-1 heading unit").toEqual([]);
      return { firstUnitIsH1: files.length - misses.length >= FLOORS.A1.files };
    }),
  A2: () =>
    scopeLeg("A2", files => {
      const misses = files.filter(path => {
        const bead = (path.split("/").pop() ?? "").replace(/\.md$/, "");
        return !(unitsOf(path, textOf(path))[0]?.text ?? "").startsWith(`# ${bead}: `);
      });
      expect(misses, "every receipt opens with its rule-15 first line '# <bead>: '").toEqual([]);
      return { firstUnitIsReceiptTitle: files.length - misses.length >= FLOORS.A2.files };
    }),
  A3: () =>
    scopeLeg("A3", files => {
      const holders = files.filter(path => textOf(path).includes(SCHEMA_LITERAL) && unitsOf(path, textOf(path)).some(unit => unit.kind === "string" && unit.text === SCHEMA_LITERAL));
      expect(holders, `the schema literal "${SCHEMA_LITERAL}" is a string unit of ${IDENTITY} only`).toEqual([IDENTITY]);
      const kinds = [...new Set(unitsOf(IDENTITY, textOf(IDENTITY)).map(unit => unit.kind))].sort();
      expect(kinds, "identity.ts yields string, comment and code units").toEqual(["code", "comment", "string"]);
      return { schemaLiteralHolders: holders, identityUnitKinds: kinds };
    }),
  A4: () => {
    const controls: Control[] = [
      { id: "directory", text: "Pi reads cac-workflow-composition-2026-10-18 (design-only).", causes: [] },
      { id: "type", text: "CACWorkflowCompositionV0 is design-only.", causes: [] },
      { id: "directory-bare", text: "Pi reads cac-workflow-composition-2026-10-18.", causes: ["unqualified"] },
      { id: "type-bare", text: "CACWorkflowCompositionV0 is a concept.", causes: ["unqualified"] },
      { id: "title-case", text: "The CAC Workflow Composition and Assurance program.", causes: ["unqualified"] },
      { id: "underscore", text: "The cac_workflow_composition program.", causes: ["unqualified"] },
      { id: "upper", text: "The CAC-WORKFLOW-COMPOSITION program.", causes: ["unqualified"] },
      { id: "glued", text: "The cacworkflowcomposition program.", causes: ["unqualified"] },
      { id: "line-wrapped", text: "The cac-workflow-\ncomposition program.", causes: ["unqualified"] },
      { id: "requirement-id", text: "MW-CAC-WORKFLOW-COMPOSITION-R2 binds Pi.", causes: [] },
      { id: "requirement-id-and-type", text: "MW-CAC-WORKFLOW-COMPOSITION-R2 names CACWorkflowCompositionV0.", causes: ["unqualified"] },
      { id: "lowercase-id", text: "The mw-cac-workflow-composition-r2 slug.", causes: ["unqualified"] },
      { id: "other-cac", text: "Forge's CAC evidence assurance names ForgeCACReceiptV0.", causes: [] },
      { id: "plain-mw", text: "MechanicalWorkflows is an ordinary function library.", causes: [] },
    ];
    for (const literal of CITED) expect(citations(literal).length, `the clause's literal ${literal} cites`).toBe(1);
    return json({ literals: CITED, controls: controlsHold(controls) });
  },
  A5: () => {
    const cite = "cac-workflow-composition-2026-10-18";
    const controls: Control[] = [
      { id: "lower", text: `${cite} is design-only.`, causes: [] },
      { id: "capital", text: `Design-only: ${cite}.`, causes: [] },
      { id: "upper", text: `${cite}: DESIGN-ONLY.`, causes: [] },
      { id: "absent", text: `${cite} is a design.`, causes: ["unqualified"] },
      { id: "unhyphenated", text: `${cite} is design only.`, causes: ["unqualified"] },
      { id: "not", text: `${cite} is not design-only.`, causes: ["unqualified"] },
      { id: "not-purely", text: `${cite} is not purely design-only.`, causes: ["unqualified"] },
      { id: "no-longer", text: `${cite} is no longer design-only.`, causes: ["unqualified"] },
      { id: "trailing-no-longer", text: `${cite} was design-only no longer.`, causes: ["unqualified"] },
      { id: "prefixed", text: `${cite} is non-design-only.`, causes: ["unqualified"] },
      { id: "suffixed", text: `${cite} is design-only-ish.`, causes: ["unqualified"] },
      { id: "negation-elsewhere", text: `Pi does not treat the design-only ${cite} program as shipped.`, causes: [] },
      { id: "one-of-two", text: `${cite} is not design-only; it is design-only.`, causes: [] },
      // wb-3cql F3: the carrier is read on the rendered view; a status only the raw markup holds does not qualify.
      { id: "comment", text: `Pi reads the ${cite} program. <!-- design-only -->`, causes: ["unqualified"] },
      { id: "link-destination", text: `Pi reads the [${cite} program](https://example.invalid/design-only).`, causes: ["unqualified"] },
      { id: "link-title", text: `Pi reads the [${cite} program](https://example.invalid "design-only").`, causes: ["unqualified"] },
      { id: "image-alt", text: `![design-only](status.png) Pi reads the ${cite} program.`, causes: ["unqualified"] },
      { id: "definition", text: `[s]: https://example.invalid/design-only\nPi reads the [${cite} program][s].`, causes: ["unqualified"] },
      { id: "element", text: `Pi reads the ${cite} program. <span hidden>design-only</span>`, causes: ["unqualified"] },
      { id: "struck", text: `${cite} is ~~design-only~~.`, causes: ["unqualified"] },
      { id: "footnote-label", text: `Pi reads the ${cite} program[^design-only].\n\n[^design-only]: A note.`, causes: ["unqualified"] },
      // wb-9lz6 cut #3 (refusal #2's PF2, the only-reference position): the label in capitals with a colon and a final period shows no carrier either.
      { id: "footnote-label-punct", text: `Pi reads the ${cite} program[^Status:DESIGN-ONLY.].\n\n[^Status:DESIGN-ONLY.]: A note.`, causes: ["unqualified"] },
      // wb-9lz6 cut #2 (refusal #1's PF2 witness W-REF verbatim): the label of a line's second footnote reference shows no carrier either.
      { id: "footnote-label-second", text: `Pi reads the ${cite} program[^s][^design-only].`, causes: ["unqualified"] },
      // wb-9lz6 cut #3 (refusal #2's U1; the record's gate-only feasibility control gate-label-second-punct, its text verbatim): the same spelling as the second label.
      { id: "footnote-label-second-punct", text: `Pi reads the ${cite} program[^s][^Status:DESIGN-ONLY.].`, causes: ["unqualified"] },
      // wb-9lz6 cut #4 (refusal #3's U1; the record's gate-only feasibility controls gate-ctx-*, their texts verbatim, each beside its
      // twin in the second spelling): the text around a reference on its line, each line text written exactly as below.
      { id: "footnote-label-space-before", text: `Pi reads the ${cite} program [^design-only].\n\n[^design-only]: A note.`, causes: ["unqualified"] },
      { id: "footnote-label-punct-space-before", text: `Pi reads the ${cite} program [^Status:DESIGN-ONLY.].\n\n[^Status:DESIGN-ONLY.]: A note.`, causes: ["unqualified"] },
      { id: "footnote-label-after-period", text: `Pi reads the ${cite} program.[^design-only]\n\n[^design-only]: A note.`, causes: ["unqualified"] },
      { id: "footnote-label-punct-after-period", text: `Pi reads the ${cite} program.[^Status:DESIGN-ONLY.]\n\n[^Status:DESIGN-ONLY.]: A note.`, causes: ["unqualified"] },
      { id: "footnote-label-word-after", text: `Pi reads the ${cite} program[^design-only]and nothing more.\n\n[^design-only]: A note.`, causes: ["unqualified"] },
      { id: "footnote-label-punct-word-after", text: `Pi reads the ${cite} program[^Status:DESIGN-ONLY.]and nothing more.\n\n[^Status:DESIGN-ONLY.]: A note.`, causes: ["unqualified"] },
      { id: "footnote-label-space-after", text: `Pi reads the ${cite} program[^design-only] today.\n\n[^design-only]: A note.`, causes: ["unqualified"] },
      { id: "footnote-label-punct-space-after", text: `Pi reads the ${cite} program[^Status:DESIGN-ONLY.] today.\n\n[^Status:DESIGN-ONLY.]: A note.`, causes: ["unqualified"] },
      { id: "footnote-label-second-space-after", text: `Pi reads the ${cite} program[^s][^design-only] today.`, causes: ["unqualified"] },
      { id: "footnote-label-second-punct-space-after", text: `Pi reads the ${cite} program[^s][^Status:DESIGN-ONLY.] today.`, causes: ["unqualified"] },
      // wb-ubhh F6: a footnote definition line inside the citing unit shows no carrier (FOOTNOTE.definition).
      { id: "footnote-definition", text: `Pi reads the ${cite} program[^s].\n[^s]: design-only`, causes: ["unqualified"] },
      // wb-9lz6 (landing 781's F1): the same definition line behind blockquote markers, indented, or under a longer label.
      { id: "footnote-definition-quoted", text: `> Pi reads the ${cite} program[^s].\n> [^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-unspaced-quote", text: `>Pi reads the ${cite} program[^s].\n>[^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-nested-quote", text: `> > Pi reads the ${cite} program[^s].\n> > [^s]: design-only`, causes: ["unqualified"] },
      // wb-9lz6 cut #4 (refusal #3's PF2, ruled under R-B388: the record's gate-only control gate-fndef-nested-unspaced, its text verbatim,
      // then the two other spacings of two markers): two markers with no space, a space after the first only, a space after the second only.
      { id: "footnote-definition-nested-unspaced", text: `>>Pi reads the ${cite} program[^s].\n>>[^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-nested-first-spaced", text: `> >Pi reads the ${cite} program[^s].\n> >[^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-nested-second-spaced", text: `>> Pi reads the ${cite} program[^s].\n>> [^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-indented", text: `Pi reads the ${cite} program[^s].\n  [^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-deep-indent", text: `Pi reads the ${cite} program[^s].\n    [^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-tab-indent", text: `Pi reads the ${cite} program[^s].\n\t[^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-long-label", text: `Pi reads the ${cite} program[^note-1].\n[^note-1]: design-only`, causes: ["unqualified"] },
      // wb-9lz6 cut #4 (the enumerate-the-resolvable form for the frozen definition class): one form for each surviving member
      // refusal #3's PF3 measured (Q-MAX2, QSP-OPT1, ORDER-SWAP, INDENT-NOT-MIXED, LBL-MAX6, LBL-LOWERHY, CTX-COLON-SPACE,
      // COLON-THEN-SPACE-OR-EOL, CTX-COLON-WORD), each line text written exactly as below.
      { id: "footnote-definition-triple-quote", text: `> > > Pi reads the ${cite} program[^s].\n> > > [^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-quote-two-spaces", text: `>  Pi reads the ${cite} program[^s].\n>  [^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-quote-tab", text: `>\tPi reads the ${cite} program[^s].\n>\t[^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-indented-quote", text: `  > Pi reads the ${cite} program[^s].\n  > [^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-mixed-indent", text: `Pi reads the ${cite} program[^s].\n  \t[^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-punct-label", text: `Pi reads the ${cite} program[^Note:A-1.].\n[^Note:A-1.]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-unspaced-colon", text: `Pi reads the ${cite} program[^s].\n[^s]:design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-emphasis", text: `Pi reads the ${cite} program[^s].\n[^s]: *design-only*`, causes: ["unqualified"] },
      // wb-9lz6 cut #2 (refusal #1's U1, the gate's witnesses W-FLAG and W-FLAG-Q verbatim): the second of two definition lines shows no carrier.
      { id: "footnote-definition-second", text: `Pi reads the ${cite} program[^note-1][^s].\n[^note-1]: a note.\n[^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-quoted-second", text: `> Pi reads the ${cite} program[^note-1][^s].\n> [^note-1]: a note.\n> [^s]: design-only`, causes: ["unqualified"] },
      // wb-6aaw (the rule-19 exit child of wb-9lz6, ruling R-B418): refusal #4's five gate-only feasibility controls, their texts
      // verbatim (the record's gate-fndef-cr-indent, -colon-negwin, -unanchored-neg, -nocolon-neg and -mflag-neg); the header names each one's kills.
      { id: "footnote-definition-cr-led", text: `Pi reads the ${cite} program[^s].\n\r[^s]: design-only`, causes: ["unqualified"] },
      { id: "footnote-definition-colon-only", text: `Pi reads the ${cite} program, which is not\n[^s]:\nreally design-only.`, causes: ["unqualified"] },
      { id: "footnote-not-definition-mid-line", text: `Pi reads the ${cite} program[^x]: not\ndesign-only.`, causes: ["unqualified"] },
      { id: "footnote-not-definition-no-colon", text: `Pi reads the ${cite} program, which is\n[^x] not\ndesign-only.`, causes: ["unqualified"] },
      { id: "footnote-not-definition-line-separator", text: `Pi reads the ${cite} program, which is\nx\u2028[^x]: not\ndesign-only.`, causes: ["unqualified"] },
      { id: "hidden-citation", text: `<!-- ${cite} is design-only. -->`, causes: ["unqualified"] },
      { id: "shown-link-text", text: `${cite} is [design-only](https://example.invalid).`, causes: [] },
      { id: "shown-code-span", text: `${cite} is \`design-only\`.`, causes: [] },
      { id: "shown-escape", text: `${cite} is design\\-only.`, causes: [] },
      { id: "shown-emphasis", text: `${cite} is design-*only*.`, causes: [] },
      { id: "definition-cannot-interrupt", text: `Pi reads the [${cite} program][s].\n[s]: https://example.invalid/design-only`, causes: [] },
    ];
    // wb-9lz6 cut #2: FOOTNOTE's flags, pinned beside its sources (a g or y flag would carry lastIndex from one tested line to the next).
    expect([FOOTNOTE.reference.flags, FOOTNOTE.definition.flags], "FOOTNOTE's flags: the reference's g, the definition's none").toEqual(["g", ""]);
    return json({ word: DESIGN_ONLY, controls: controlsHold(controls) });
  },
  A6: () => {
    const cite = "cac-workflow-composition-2026-10-18";
    const controls: Control[] = [
      { id: "verbatim", text: `${cite}: ${README21}`, causes: [] },
      { id: "no-final-period", text: `${cite}: '${README21.slice(0, -1)}'`, causes: [] },
      { id: "wrapped", text: `${cite}: ${README21.replace("research requirements, not", "research\nrequirements, not")}`, causes: [] },
      { id: "fragment", text: `${cite}: not a claim that source code was modified or native workflows were run.`, causes: ["unqualified"] },
      { id: "altered-date", text: `${cite}: ${README21.replace("2026-10-18", "2026-10-19")}`, causes: ["unqualified"] },
      { id: "altered-word", text: `${cite}: ${README21.replace("were run", "were witnessed")}`, causes: ["unqualified"] },
      { id: "readme3-line", text: `${cite}: the two program documents are the only artifacts.`, causes: ["unqualified"] },
      // wb-3cql F2: the carrier is the sentence itself; a reference to its line is no carrier.
      { id: "line-reference", text: `Pi reads the ${cite} program (its status: README.md:21).`, causes: ["unqualified"] },
      { id: "path-reference", text: `${cite}: see docs/programs/${cite}/README.md:21.`, causes: ["unqualified"] },
      { id: "linked-reference", text: `${cite}: [README.md:21](https://example.invalid/README.md#L21).`, causes: ["unqualified"] },
      // wb-3cql F3: the sentence only the raw markup holds is no carrier.
      { id: "comment", text: `${cite} <!-- ${README21} -->`, causes: ["unqualified"] },
    ];
    return json({ sentence: README21, sentenceWords: README21.split(/\s+/).length, controls: controlsHold(controls) });
  },
  A7: () => {
    const cite = "cac-workflow-composition-2026-10-18";
    const controls: Control[] = [
      { id: "same-block", text: `${cite}\nis design-only.`, causes: [] },
      { id: "blank-line-apart", text: `${cite} program.\n\nThis is design-only.`, causes: ["unqualified"] },
      { id: "list-items", text: `- ${cite} program\n- design-only`, causes: ["unqualified"] },
      { id: "list-continuation", text: `- ${cite} program,\n  design-only as of 2026-10-18`, causes: [] },
      { id: "heading-status", text: `## The design-only program\n${cite} binds Pi.`, causes: ["unqualified"] },
      { id: "table-rows", text: `| ${cite} | x |\n| design-only | y |`, causes: ["unqualified"] },
      { id: "table-row", text: `| ${cite} | design-only |`, causes: [] },
      { id: "fence", text: `\`\`\`\n${cite}\ndesign-only\n\`\`\``, causes: ["unqualified"] },
      { id: "blockquote-blank", text: `> ${cite}\n>\n> design-only`, causes: ["unqualified"] },
      { id: "html-comment", text: `<!-- ${cite} -->`, causes: ["unqualified"] },
      { id: "src-string", path: "src/x.ts", text: `export const A = "${cite} (design-only)";`, causes: [] },
      { id: "src-string-bare", path: "src/x.ts", text: `export const A = "${cite}";`, causes: ["unqualified"] },
      { id: "src-comment-neighbour", path: "src/x.ts", text: `// design-only\nexport const A = "${cite}";`, causes: ["unqualified"] },
      { id: "src-comment", path: "src/x.ts", text: `// ${cite} is design-only.\nexport const A = 1;`, causes: [] },
      { id: "src-template", path: "src/x.ts", text: `export const A = \`${cite} \${1} design-only\`;`, causes: [] },
      { id: "src-identifier", path: "src/x.ts", text: 'export const cacWorkflowCompositionNote = "design-only";', causes: ["code"] },
      { id: "src-escape", path: "src/x.ts", text: 'export const A = "CACWorkflow\\u0043ompositionV0";', causes: ["unqualified"] },
      { id: "src-jsdoc", path: "src/x.ts", text: "/** @see CACWorkflowCompositionV0 design-only */\nexport const A = 1;", causes: [] },
      { id: "src-block-comment", path: "src/x.ts", text: `export const A = 1; /* ${cite} */`, causes: ["unqualified"] },
      // wb-3cql F3: the document's own rendering places each line of a unit (raw HTML across blank lines, code, definitions).
      { id: "comment-across-blocks", text: `<!-- design-only\n\nnote\n\ndesign-only -->\nPi reads the ${cite} program.`, causes: ["unqualified"] },
      { id: "quoted-comment-across-blocks", text: `> <!-- design-only\n>\n> design-only -->\n> Pi reads the ${cite} program.`, causes: ["unqualified"] },
      { id: "html-block", text: `<div hidden>\nPi reads the ${cite} program (design-only).\n</div>`, causes: ["unqualified"] },
      { id: "reference-image", text: `![design-only][img] Pi reads the ${cite} program.\n\n[img]: status.png`, causes: ["unqualified"] },
      { id: "list-paragraph", text: `- An item.\n\n    Pi reads the ${cite} program. <!-- design-only -->`, causes: ["unqualified"] },
      { id: "fence-info-string", text: `\`\`\`${cite} design-only\nx\n\`\`\``, causes: ["unqualified"] },
      { id: "code-block", text: `An example:\n\n    ${cite} <!-- design-only -->`, causes: [] },
    ];
    return json({ controls: controlsHold(controls) });
  },
  A8: () => {
    const lists = SCOPE_PINS.map(pin => scopeList(REPO, SCOPES[pin], FILING_PIN));
    const files = lists.flat();
    expect(
      lists.map(list => list.length),
      "the filing pin's scope lists (docs/workbench outside receipts/, receipts, src)",
    ).toEqual([25, 39, 115]);
    const plant = PLANTS.A1;
    const reading = judgeFiles([...treeTexts(FILING_PIN, files), plant]);
    expect(
      reading.citing.filter(entry => !entry.startsWith(`${plant.path}:`)),
      "no unit of the clause (a) union cites the program at the filing pin",
    ).toEqual([]);
    expect(reading.findings, "the same call judges the plant").toEqual(reading.findings.filter(finding => finding.startsWith(`${plant.path}:`)));
    expect(reading.units, "the readers' exact unit count at the fixed pin tree (content liveness)").toBe(PIN_UNITS);
    return json({ pin: FILING_PIN, files: lists.map(list => list.length), units: reading.units, findings: reading.findings });
  },
  B1: () => {
    const controls: Control[] = [
      { id: "mutant", text: "Pi consumes the shipped CACWorkflowCompositionV0 type.", causes: ["unqualified", "exists:v0"] },
      { id: "mutant-unclaimed", text: "Pi names CACWorkflowCompositionV0.", causes: ["unqualified"] },
      { id: "mutant-directory", text: "Pi reads the cac-workflow-composition-2026-10-18 program.", causes: ["unqualified"] },
      { id: "qualified-unclaimed", text: "CACWorkflowCompositionV0 is design-only.", causes: [] },
      { id: "src-mutant", path: "src/x.ts", text: 'export const A = "Pi consumes the shipped CACWorkflowCompositionV0 type.";', causes: ["unqualified", "exists:v0"] },
    ];
    return json({ controls: controlsHold(controls) });
  },
  B2: () => {
    const controls: Control[] = [
      { id: "qualified-shipped-type", text: "CACWorkflowCompositionV0 (design-only) is a shipped type.", causes: ["exists:v0"] },
      { id: "qualified-exists", text: "Design-only: CACWorkflowCompositionV0 exists in Pi.", causes: ["exists:v0"] },
      { id: "shipped-before", text: "Pi reads the shipped CACWorkflowCompositionV0 (design-only).", causes: ["exists:v0"] },
      { id: "spaced-type", text: "CAC Workflow Composition V0 ships (design-only).", causes: ["exists:v0"] },
      { id: "negated", text: "CACWorkflowCompositionV0 is design-only and not shipped.", causes: [] },
      { id: "unshipped", text: "The unshipped CACWorkflowCompositionV0 (design-only).", causes: [] },
      { id: "conditional", text: "When MechanicalWorkflows ships CACWorkflowCompositionV0 (design-only today), Pi reads its refs.", causes: [] },
      { id: "concept-only", text: "Use CACWorkflowCompositionV0 as a concept only (design-only).", causes: [] },
      { id: "nowhere", text: "CACWorkflowCompositionV0 (design-only) exists nowhere in Pi.", causes: [] },
      { id: "src-type", path: "src/x.ts", text: "export type CACWorkflowCompositionV0 = { readonly steps: readonly string[] };", causes: ["code"] },
      { id: "src-import", path: "src/x.ts", text: 'import { CACWorkflowCompositionV0 } from "./mw.js";', causes: ["code"] },
      { id: "src-shipped-string", path: "src/x.ts", text: 'export const A = "CACWorkflowCompositionV0 (design-only) ships";', causes: ["exists:v0"] },
    ];
    return json({ subject: SUBJECTS[0]?.spelling ?? "", controls: controlsHold(controls) });
  },
  B3: () => {
    const root = makeScratch("wb-kku9.2-mutant-");
    try {
      const write = (path: string, text: string): void => {
        mkdirSync(dirname(join(root, path)), { recursive: true });
        writeFileSync(join(root, path), text);
      };
      const mutant = "Pi consumes the shipped CACWorkflowCompositionV0 type.\n";
      const twin = "Pi consumes nothing from CACWorkflowCompositionV0 (design-only).\n";
      const paths: Readonly<Record<"A1" | "A2" | "A3", string>> = { A1: "docs/workbench/mutant.md", A2: "docs/workbench/receipts/mutant.md", A3: "src/mutant.ts" };
      const files: Readonly<Record<"A1" | "A2" | "A3", (text: string) => string>> = {
        A1: text => `# Mutant\n\n${text}`,
        A2: text => `# mutant: mutant\n\n${text}`,
        A3: text => `export const MUTANT = ${JSON.stringify(text.trim())};\n`,
      };
      execFileSync("git", ["init", "-q"], { cwd: root });
      for (const pin of SCOPE_PINS) write(paths[pin], files[pin](mutant));
      execFileSync("git", ["add", "-A"], { cwd: root });
      const flagged = SCOPE_PINS.map(pin => readScope(root, SCOPES[pin]));
      for (const [index, pin] of SCOPE_PINS.entries()) {
        expect(flagged[index]?.files, `${pin}: readScope lists the committed mutant through git`).toEqual([paths[pin]]);
        expect(flagged[index]?.findings.length, `${pin}: the mutant fails the census`).toBeGreaterThan(0);
      }
      for (const pin of SCOPE_PINS) write(paths[pin], files[pin](twin));
      execFileSync("git", ["add", "-A"], { cwd: root });
      const quiet = SCOPE_PINS.map(pin => readScope(root, SCOPES[pin]));
      for (const [index, pin] of SCOPE_PINS.entries()) expect(quiet[index]?.findings, `${pin}: the qualified, unclaimed twin passes`).toEqual([]);
      return json({ flagged: flagged.map(reading => reading.findings), quiet: quiet.map(reading => reading.findings), citingTwins: quiet.map(reading => reading.citing.length) });
    } finally {
      removeScratch(root);
    }
  },
  C1: () => {
    const notes = beadNotes(KLR7);
    const sentence = /\(c\) (docs\/workbench\/07 § MechanicalWorkflows gains one falsifiable sentence bound by the docs\/07 census \(wb-6hb\.11 shape\))/.exec(notes)?.[1] ?? "";
    expect(sentence.length, `${KLR7}'s clause (c) sentence is read from the tracker export`).toBeGreaterThan(0);
    const docs = textOf(DOCS07);
    const section = mwSection(docs);
    expect(section.headings, "docs/07 has exactly one level-2 heading naming MechanicalWorkflows").toBe(1);
    expect(markdownUnits(section.body).length, "its section is read").toBeGreaterThanOrEqual(3);
    const plant = "Composition metadata of cac-workflow-composition-2026-10-18 (design-only) is never a source of identity.";
    const planted = `${section.body}\n${plant}\n`;
    const citing = markdownUnits(planted).filter(unit => judgeUnit(unit).cites);
    // The condition is met (wb-klr7's cut): the live section cites in exactly one unit, wb-klr7's clause (c) sentence, which the
    // docs07 census holds verbatim; the plant cites beside it, and no other unit of the section does.
    const live = markdownUnits(section.body).filter(unit => judgeUnit(unit).cites).map(unit => squeezed(unit.text));
    expect(live, "the live section cites in exactly one unit, wb-klr7's clause (c) sentence").toHaveLength(1);
    expect(squeezed(textOf(DOCS07_CENSUS)).includes(live[0] ?? "\u0000"), "the docs07 census holds that unit verbatim").toBe(true);
    expect(
      citing.map(unit => squeezed(unit.text)),
      "beside the live sentence, the planted sentence is the section's only citing unit",
    ).toEqual([...live, ...citing.filter(unit => unit.text.includes(plant)).map(unit => squeezed(unit.text))]);
    expect(citing.filter(unit => unit.text.includes(plant)).length, "the plant cites").toBe(1);
    return json({ klr7: sentence, heading: section.heading, headings: section.headings, plantCites: citing.some(unit => unit.text.includes(plant)) });
  },
  C2: () => {
    const section = mwSection(textOf(DOCS07));
    const unqualified = "Pi binds the cac-workflow-composition-2026-10-18 program.";
    const qualified = "Pi binds the cac-workflow-composition-2026-10-18 program (design-only).";
    const reading = judgeFiles([{ path: DOCS07, text: `${section.body}\n\n${unqualified}\n\n${qualified}\n` }]);
    const findings = reading.findings.map(finding => finding.slice(finding.indexOf(" ") + 1));
    expect(findings, "the section's findings are the unqualified plant's alone").toEqual(["unqualified"]);
    return json({ findings, citing: reading.citing.length >= 2 });
  },
  C3: () => {
    const docs = textOf(DOCS07);
    const holder = textOf(DOCS07_CENSUS);
    expect(holder.includes(DOCS07_PARENT), "the holder reads docs/07 under its level-1 heading").toBe(true);
    const section = mwSection(docs);
    expect(unbound(section.body, holder), "every citing unit of the live section is held by the docs07 census").toEqual([]);
    const loose = "Composition metadata of cac-workflow-composition-2026-10-18 (design-only) is never a source of identity.";
    const bound = "CACWorkflowCompositionV0 (design-only) refs point to producer ids only.";
    const planted = `${section.body}\n\n${loose}\n\n${bound}\n`;
    const result = unbound(planted, `${holder}\n"${bound}"\n`);
    expect(result, "the planted unbound sentence alone is unbound; its bound twin is held").toEqual([loose]);
    return json({ holder: DOCS07_CENSUS, parent: DOCS07_PARENT, unbound: result });
  },
  E1: () => {
    const controls: Control[] = [
      { id: "concept-only", text: "cac-workflow-composition-2026-10-18 (design-only): Use CACWorkflowCompositionV0 as a concept only.", causes: [] },
      { id: "available", text: "CACWorkflowCompositionV0 (design-only) is available in Pi.", causes: ["exists:v0"] },
      { id: "not-available", text: "CACWorkflowCompositionV0 (design-only) is not available in Pi.", causes: [] },
      { id: "landed", text: "CACWorkflowCompositionV0 landed in Pi (design-only).", causes: ["exists:v0"] },
    ];
    const reading = readScope(REPO, SCOPES.A1, [{ path: "docs/workbench/zz-e1.md", text: "cac-workflow-composition-2026-10-18 (design-only): CACWorkflowCompositionV0 is implemented in Pi.\n" }]);
    expect(reading.findings, "the docs walk judges the planted claim and nothing else").toEqual(["docs/workbench/zz-e1.md:1 exists:v0"]);
    return json({ subject: SUBJECTS[0]?.spelling ?? "", controls: controlsHold(controls), findings: reading.findings });
  },
  E2: () => {
    const controls: Control[] = [
      { id: "mw-fact", text: "cac-workflow-composition-2026-10-18 (design-only): no bridge checker exists at HEAD.", causes: [] },
      { id: "runs", text: "cac-workflow-composition-2026-10-18 (design-only): the bridge checker runs in Pi.", causes: ["exists:bridge-checker"] },
      { id: "hyphenated-wired", text: "cac-workflow-composition-2026-10-18 (design-only): the bridge-checker is wired.", causes: ["exists:bridge-checker"] },
      { id: "proposed", text: "cac-workflow-composition-2026-10-18 (design-only): a proposed bridge checker exists in no repo.", causes: [] },
      { id: "would", text: "cac-workflow-composition-2026-10-18 (design-only): a bridge checker would run.", causes: [] },
    ];
    const reading = readScope(REPO, SCOPES.A1, [{ path: "docs/workbench/zz-e2.md", text: "cac-workflow-composition-2026-10-18 (design-only): the bridge checker is implemented in Pi.\n" }]);
    expect(reading.findings, "the docs walk judges the planted claim and nothing else").toEqual(["docs/workbench/zz-e2.md:1 exists:bridge-checker"]);
    return json({ subject: SUBJECTS[1]?.spelling ?? "", controls: controlsHold(controls), findings: reading.findings });
  },
  E3: () => {
    const controls: Control[] = [
      { id: "mw-fact", text: "cac-workflow-composition-2026-10-18 (design-only): no Pi adapter is wired at 19ca8d4.", causes: [] },
      { id: "live", text: "cac-workflow-composition-2026-10-18 (design-only): the Pi MW adapter is live.", causes: ["exists:pi-mw-adapter"] },
      { id: "mechanicalworkflows-ships", text: "cac-workflow-composition-2026-10-18 (design-only): a MechanicalWorkflows adapter ships.", causes: ["exists:pi-mw-adapter"] },
      { id: "blocked", text: "cac-workflow-composition-2026-10-18 (design-only): the MW adapter is blocked (wb-04s).", causes: [] },
      { id: "furnace-namesake", text: "cac-workflow-composition-2026-10-18 (design-only): the Pi adapter itself never retries.", causes: [] },
    ];
    const reading = readScope(REPO, SCOPES.A1, [{ path: "docs/workbench/zz-e3.md", text: "cac-workflow-composition-2026-10-18 (design-only): the Pi MW adapter is wired.\n" }]);
    expect(reading.findings, "the docs walk judges the planted claim and nothing else").toEqual(["docs/workbench/zz-e3.md:1 exists:pi-mw-adapter"]);
    return json({ subject: SUBJECTS[2]?.spelling ?? "", controls: controlsHold(controls), findings: reading.findings });
  },
  Q1: () => {
    const outside = ["README.md", "CHANGELOG.md", "AGENTS.md", "docs/rpc.md", "qa/workbench/status-ledger.mjs", "test/workbench-docs07-provider-rules.census.ts"];
    for (const path of outside) expect(textOf(path).length, `${path} exists`).toBeGreaterThan(0);
    const listed = SCOPE_PINS.flatMap(pin => scopeList(REPO, SCOPES[pin]));
    expect(outside.filter(path => listed.includes(path)), "no clause (a) scope lists them").toEqual([]);
    return json({ outside, listed: outside.filter(path => listed.includes(path)) });
  },
  Q2: () => quiet("docs/workbench/receipts/wb-kku9.1.md", "# wb-kku9.1: [MW-CAC-WORKFLOW-COMPOSITION-R1] No Pi surface shall present an observation as source evidence\n", "a unit whose only matches are requirement ids does not cite"),
  Q3: () => quiet("docs/workbench/x.md", "Pi reads the MW 2026-10-18 composition deposit and its CAC assurance program.", "a paraphrased citation does not cite"),
  Q4: () => quiet("docs/workbench/x.md", "cac-workflow-composition-2026-10-18 is not, as of today, design-only.", "a negation three words away does not cancel the carrier"),
  Q5: () => quiet("docs/workbench/x.md", "cac-workflow-composition-2026-10-18 (design-only): Pi hands CACWorkflowCompositionV0 to the bridge checker, which vets each step.", "predicates outside EXISTS are not read"),
  Q6: () => quiet("docs/workbench/x.md", "If anything, CACWorkflowCompositionV0 shipped (design-only).", "a guard word before the predicate silences it"),
  Q7: () => quiet("docs/workbench/x.md", "CACWorkflowCompositionV0 is design-only. It shipped anyway.", "a pronoun across a sentence end is not read"),
  Q8: () => quiet("docs/workbench/x.md", "cac-workflow-composition-2026-10-18 (design-only): the checker for the bridge ships, and Pi's MechanicalWorkflows integration is live.", "subjects spelled outside SUBJECTS are not read"),
  Q9: () => quiet("src/x.ts", 'export const A = "CACWorkflow" + "CompositionV0";', "a citation split across a concatenation does not cite"),
  Q10: () => quiet("docs/workbench/x.md", "The CAC\\-workflow\\-composition program and cac&#45;workflow&#45;composition.", "escaped and entity spellings do not cite"),
  Q11: () => quiet("docs/workbench/x.md", "cac-workflow-composition-2026-10-18 is design-only.\n\nThe Pi MW adapter is wired.", "an existence claim in a unit that does not cite is not judged"),
  // wb-d5o5 (landing 887's F1, the gate's QUIET-1): the view drops the definition line "[^x]: not", so "design-only." qualifies the unit.
  Q12: () => quiet("docs/workbench/x.md", "Pi reads the cac-workflow-composition-2026-10-18 program, which is\n[^x]: not\ndesign-only.", "a negation a footnote definition line holds does not cancel the status on the line after it"),
};

describe("wb-kku9.2 MW cac-workflow-composition citation-status census (MW-CAC-WORKFLOW-COMPOSITION-R2)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:8", "B:3", "C:3", "E:3", "Q:12"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(Object.keys(QUOTES).sort(), "every pin of rows A, B, C and E carries a quote").toEqual(ROWS.filter(row => row.id !== "Q").flatMap(row => row.pins).sort());
    expect(ROSTER.bead).toBe(BEAD);
    expect(
      json({
        cited: CITED,
        designOnly: DESIGN_ONLY,
        citation: CITATION.source,
        requirementId: REQUIREMENT_ID.source,
        readme21: README21,
        statusNegation: [STATUS_NEGATION_BEFORE.source, STATUS_NEGATION_AFTER.source],
        subjects: SUBJECTS.map(subject => ({ id: subject.id, spelling: subject.spelling, pattern: subject.pattern.source })),
        exists: EXISTS.source,
        guard: [GUARD.source, GUARD_AFTER.source],
        clauseSplit: CLAUSE_SPLIT.source,
        carrierView: {
          unshown: UNSHOWN,
          element: ELEMENT.source,
          footnote: [FOOTNOTE.reference.source, FOOTNOTE.definition.source],
          footnoteFlags: [FOOTNOTE.reference.flags, FOOTNOTE.definition.flags],
        },
        units: [BLANK.source, LIST_ITEM.source, HEADING.source, TABLE_ROW.source, FENCE.source],
        scopes: SCOPES,
        floors: FLOORS,
        pinUnits: PIN_UNITS,
        quotes: QUOTES,
        docs07: DOCS07,
        docs07Census: DOCS07_CENSUS,
        docs07Parent: DOCS07_PARENT,
        identity: IDENTITY,
        schemaLiteral: SCHEMA_LITERAL,
        filingPin: FILING_PIN,
        plants: PLANTS,
        residuals: RESIDUALS,
        residualAnchor: { doc: RESIDUAL_DOC, title: RESIDUAL_DOC_TITLE, heading: RESIDUAL_HEADING, columns: RESIDUAL_COLUMNS },
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.flatMap(row => row.pins), `${member} is a judged pin`).toContain(member);
    for (const [family, members] of Object.entries(RESIDUALS)) {
      for (const member of members) if (family !== "R-SCOPE") expect(probeOf(rosterWitness(member)), `${member} (${family}) carries its own probe (wb-3cql F1)`).toBeDefined();
    }
    for (const [pin, impl] of Object.entries(IMPL)) {
      expect(/\bROSTER\b|rosterWitness|readRoster/.test(impl.toString()), `${pin}'s case reads no roster (SELF-READ)`).toBe(false);
    }
    for (const [pin, quote] of Object.entries(QUOTES)) {
      const witness = JSON.stringify(rosterWitness(pin));
      for (const word of quotedWords(quote)) expect(witness, `${pin}'s witness carries its quote's '${word}'`).toContain(word);
    }
  });

  it("the outside anchors: the bead's own row binds the rows, the pin quotes, the scopes, the citation, the carriers, the subjects and the existence words; wb-klr7's row and the producer block carry clause (c) and the status", { timeout: 60_000 }, () => {
    const notes = beadNotes(BEAD);
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    const clauses = acceptanceClauses(notes);
    expect(Object.keys(clauses), "the bead states clauses (a) to (c)").toEqual(["a", "b", "c"]);
    const lettered = ROWS.filter(row => letterOf(row.label) !== "");
    for (const row of lettered) expect(clauses[letterOf(row.label)], `row ${row.id} quotes its acceptance clause exactly`).toBe(quoteOf(row.label));
    for (const [letter, clause] of Object.entries(clauses)) {
      expect(lettered.filter(row => letterOf(row.label) === letter && quoteOf(row.label) === clause).map(row => row.id), `clause (${letter}) is quoted by exactly one row`).toHaveLength(1);
    }
    const statement = statementOf(notes);
    const rowE = ROWS.find(row => row.id === "E");
    expect(statement.includes(rowE?.label ?? "-"), "row E's label is a slice of the statement").toBe(true);
    for (const row of ROWS.filter(entry => entry.id !== "Q")) {
      const clause = letterOf(row.label) === "" ? row.label : (clauses[letterOf(row.label)] ?? "");
      expect(tiles(clause, row.pins.map(pin => QUOTES[pin] ?? "")), `row ${row.id}'s pin quotes tile its clause`).toBe(true);
    }
    const a = clauses.a ?? "";
    expect(/^static census over (.+?): /.exec(a)?.[1]?.split(/, | and /), "clause (a)'s scopes").toEqual(SCOPE_PINS.map(pin => SCOPES[pin].word));
    for (const pin of SCOPE_PINS) expect(QUOTES[pin], `${pin}'s quote names its scope`).toContain(SCOPES[pin].word);
    expect(quotedWords(a), "the cited literals and the carrier word are clause (a)'s quotes").toEqual([...CITED, DESIGN_ONLY]);
    expect(CITATION.source, "CITATION is derived from clause (a)'s literals").toBe(citationSource(quotedWords(a).slice(0, 2)));
    expect(CITATION.flags, "read case-insensitively").toBe("gi");
    expect(/the verbatim (README\.md:21) sentence/.exec(a)?.[1], "clause (a) names README.md:21").toBe("README.md:21");
    expect(new RegExp(`Quote: '(.+?)' ${escaped(PROGRAM_PATH)}:21@5ce2a07f891f`).exec(notes)?.[1], "README21 is the filing's quote").toBe(README21);
    const prefix = /^\[([A-Z-]+)-R\d+\] /.exec(beadTitle(BEAD))?.[1] ?? "";
    expect(REQUIREMENT_ID.source, "REQUIREMENT_ID is the bead family's id form").toBe(`\\b${escaped(prefix)}-R\\d+\\b`);
    const id = /^\[([A-Z-]+-R\d+)\] /.exec(beadTitle(BEAD))?.[1] ?? "-";
    expect(id.match(new RegExp(CITATION.source, "gi"))?.length, "the bead's own id spells CITATION once (the namesake the exemption exists for)").toBe(1);
    expect(citations(id), "and is exempt as a requirement id").toEqual([]);
    const subjects = /^shall not present (.+?), (.+?) or (.+?) as existing$/.exec(rowE?.label ?? "")?.slice(1) ?? [];
    expect(subjects, "SUBJECTS spell the statement's subjects, in order").toEqual(SUBJECTS.map(subject => subject.spelling));
    for (const subject of SUBJECTS) expect(subject.pattern.test(subject.spelling), `${subject.id} reads its own spelling`).toBe(true);
    const facts = /\(none shipped: '([^']+)', '([^']+)'\)/.exec(statement)?.slice(1) ?? [];
    expect(facts, "the statement quotes MW's two absence facts").toEqual(["no bridge checker exists at HEAD", "no Pi adapter is wired at 19ca8d4"]);
    expect([SUBJECTS[1]?.pattern.test(facts[0] ?? ""), SUBJECTS[2]?.pattern.test(facts[1] ?? "")], "each fact names its subject").toEqual([true, true]);
    for (const fact of facts) expect(causesOf("docs/workbench/x.md", `cac-workflow-composition-2026-10-18 (design-only): ${fact}.`), `the quoted fact '${fact}' is quiet`).toEqual([]);
    const words = ["existing", "shipped", "exists", "wired"];
    const homes = [rowE?.label ?? "", clauses.b ?? "", facts[0] ?? "", facts[1] ?? ""];
    expect(
      words.filter((word, index) => !(homes[index] ?? "").split(/\s+/).includes(word)),
      "each existence word is a word of the bead text (row E's label, clause (b), the two quoted facts)",
    ).toEqual([]);
    for (const word of words) expect(word.match(new RegExp(EXISTS.source, "gi")), `EXISTS reads '${word}'`).toEqual([word]);
    const c = clauses.c ?? "";
    expect(/is bound by (\S+)$/.exec(c)?.[1], "the holder is clause (c)'s reference").toBe(DOCS07_CENSUS);
    expect(textOf(DOCS07_CENSUS).length, "the holder exists").toBeGreaterThan(0);
    const page = /^if (docs\/workbench\/07) § MechanicalWorkflows /.exec(c)?.[1] ?? "-";
    const pages = execFileSync("git", ["ls-files", "--", "docs/workbench"], { cwd: REPO, encoding: "utf8" })
      .split("\n")
      .filter(path => path.startsWith(`${page}-`));
    expect(pages, "clause (c)'s page is the one docs/workbench/07- file").toEqual([DOCS07]);
    expect(textOf(DOCS07).split("\n")[0], "docs/07 opens with the holder's parent heading").toBe(`# ${DOCS07_PARENT}`);
    expect(c.includes(`the ${KLR7} acceptance (c) sentence`), "clause (c) names wb-klr7's acceptance (c) sentence").toBe(true);
    expect(beadNotes(KLR7).includes("(c) docs/workbench/07 § MechanicalWorkflows gains one falsifiable sentence bound by the docs/07 census"), "wb-klr7's row carries it").toBe(true);
    // wb-3cql F4: every anchored element the bead text names is carried by the roster witness of each pin of its row whose
    // quote names it, so a re-tiling that folds a pin into a neighbour (landing 343's G-MERGE) reds against the bead row.
    const holder = /is bound by (\S+)$/.exec(c)?.[1] ?? "-";
    const scopeWords = /^static census over (.+?): /.exec(a)?.[1]?.split(/, | and /) ?? [];
    const anchored: { row: string; names: RegExp; carried: string }[] = [
      ...scopeWords.map(word => ({ row: "A", names: new RegExp(`(?<![\\w/-])${escaped(word)}(?![\\w/-])`), carried: word })),
      ...quotedWords(a).map(word => ({ row: "A", names: new RegExp(escaped(`'${word}'`)), carried: word })),
      { row: "A", names: /README\.md:21/, carried: new RegExp(`Quote: '(.+?)' ${escaped(PROGRAM_PATH)}:21@5ce2a07f891f`).exec(notes)?.[1] ?? "-" },
      { row: "A", names: /passes empty today/, carried: /over src\/docs\/test\/qa at ([0-9a-f]{7,40}) = 0 hits/.exec(notes)?.[1] ?? "-" },
      { row: "B", names: /\bunqualified\b/, carried: "unqualified" },
      ...subjects.filter(subject => (clauses.b ?? "").includes(subject)).map(subject => ({ row: "B", names: new RegExp(escaped(subject)), carried: subject })),
      ...scopeWords.map(word => ({ row: "B", names: /fails the census/, carried: word })),
      { row: "C", names: new RegExp(escaped(`${KLR7} acceptance (c) sentence`)), carried: /\(c\) (docs\/workbench\/07 § MechanicalWorkflows gains one falsifiable sentence bound by the docs\/07 census)/.exec(beadNotes(KLR7))?.[1] ?? "-" },
      { row: "C", names: new RegExp(escaped(holder)), carried: holder },
      ...subjects.map(subject => ({ row: "E", names: new RegExp(escaped(subject)), carried: subject })),
    ];
    for (const element of anchored) {
      const naming = (ROWS.find(row => row.id === element.row)?.pins ?? []).filter(pin => element.names.test(QUOTES[pin] ?? ""));
      expect(naming.length, `row ${element.row}: a pin's quote names ${element.names.source}`).toBeGreaterThan(0);
      for (const pin of naming) expect(JSON.stringify(rosterWitness(pin)), `${pin}'s witness carries what its quote names (${element.names.source})`).toContain(JSON.stringify(element.carried).slice(1, -1));
    }
    const mw = ROSTER.producer.mw;
    expect(isObject(mw), "the roster carries the MW producer block").toBe(true);
    if (!isObject(mw)) return;
    expect(mw.path, "the producer path is the filing's").toBe(PROGRAM_PATH);
    expect(/@([0-9a-f]{12})/.exec(statement)?.[1], "the producer sha is the filing's pin").toBe(String(mw.sha).slice(0, 12));
    expect(mw.readme21, "README.md:21 at the pin is the sentence").toBe(README21);
    expect(new RegExp(escaped(DESIGN_ONLY), "i").test(String(mw.readme3)), "README.md:3 at the pin carries design-only").toBe(true);
    expect(String(mw.readme3).includes("the two program documents are the only artifacts"), "and the two-documents status").toBe(true);
    expect(String(mw.readme17).includes(facts[1] ?? "-"), "README.md:17 carries the Pi adapter fact").toBe(true);
    expect(String(mw.contracts4).includes(facts[0] ?? "-"), "01-composition-contracts.md:4 carries the bridge checker fact").toBe(true);
    expect(String(mw.contracts6).includes("CACWorkflowCompositionV0") && String(mw.contracts6).includes("as a concept only"), "01-composition-contracts.md:6 reads the type as a concept only").toBe(true);
  });

  it(RESIDUAL_ANCHOR_TITLE, { timeout: 60_000 }, () => {
    const anchor = residualAnchor(textOf(RESIDUAL_DOC));
    expect(anchor.shape, `${RESIDUAL_DOC}'s residual section`).toEqual([]);
    expect(
      anchor.rows.map(row => `${row.pin} | ${row.family}`),
      "docs/14 names exactly the residual families, each with its quiet row, in RESIDUALS order and both ways",
    ).toEqual(Object.entries(RESIDUALS).flatMap(([family, members]) => members.map(member => `${member} | ${family}`)));
    expect(
      anchor.rows.map(row => row.pin),
      "the table's quiet rows are the Q row's pins",
    ).toEqual([...(ROWS.find(row => row.id === "Q")?.pins ?? [])]);
    expect(
      markdownUnits(anchor.raw)
        .filter(unit => judgeUnit(unit).cites)
        .map(unit => unit.text),
      "the residual section cites nothing: it names the families, never the program",
    ).toEqual([]);
    for (const row of anchor.rows) {
      const impl = IMPL[row.pin];
      const probe = impl === undefined ? undefined : anchorProbe(json(impl()));
      expect(probe, `${row.pin}: its case returns a probe`).toBeDefined();
      if (probe === undefined) continue;
      const exemplar = row.exemplar.replaceAll("\\n", "\n");
      const clear = row.clear.replaceAll("\\n", "\n");
      expect(probe.text.split(exemplar).length - 1, `${row.pin} (${row.family}): its probe carries the exemplar exactly once`).toBe(1);
      expect(probe.read(probe.text), `${row.pin} (${row.family}): its probe reads quiet`).toEqual([]);
      expect(probe.read(probe.text.replace(exemplar, () => clear)), `${row.pin} (${row.family}): its clear form reads what docs/14 says`).toEqual(row.reads.split(", "));
    }
    // Rule 16: the residual table as read at this cut (cells as written), so a docs-side edit the judge still accepts reds too.
    expect(
      anchor.rows.map(row => [row.pin, row.family, row.exemplar, row.clear, row.reads].join(" | ")),
      "the residual table as read at this cut",
    ).toEqual([
      "Q1 | R-SCOPE | README.md | docs/workbench/README.md | docs/workbench",
      "Q2 | R-REQUIREMENT-ID | COMPOSITION-R1 | COMPOSITION | unqualified",
      "Q3 | R-PARAPHRASE-CITE | assurance | workflow composition | unqualified",
      "Q4 | R-NEGATION-DISTANCE | not, as of today, | not | unqualified",
      "Q5 | R-PARAPHRASE-EXISTS | vets | runs | exists:v0, exists:bridge-checker",
      "Q6 | R-GUARD-WORD | If anything, | Indeed, | exists:v0",
      "Q7 | R-CROSS-CLAUSE | . It | , and it | exists:v0",
      "Q8 | R-SUBJECT-SPELLING | checker for the bridge | bridge checker | exists:bridge-checker",
      'Q9 | R-SPLIT-SOURCE | Workflow" + "Composition | WorkflowComposition | unqualified',
      "Q10 | R-ESCAPED-SPELLING | \\-workflow\\- | -workflow- | unqualified",
      "Q11 | R-DOCUMENT-SCOPE | \\n\\n | \\n | exists:pi-mw-adapter",
      "Q12 | R-DEFINITION-HIDES-NEGATION | [^x]: not | not | unqualified",
    ]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : json(impl());
          const expected = rosterWitness(pin);
          REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
          expect(witness).toStrictEqual(expected);
          const probe = probeOf(witness);
          if (probe !== undefined) expect(causesOf(probe.path, probe.text), `${pin}'s causes are its own probe's (wb-3cql F1)`).toEqual(probe.causes);
        });
      }
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", ({ task }) => {
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
  });
});

import { rehydrateTrackerExport } from "../qa/workbench/tracker-export.mjs";
