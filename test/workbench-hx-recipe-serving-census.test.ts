/**
 * wb-ts6.1 (HXFS-PI-R5, program-triage-2026-10-18), the until-then leg. Statement (bead title): "When W1-W8 hyper-unix
 * recipes become reachable to a Pi-hosted agent (gate: skill reachable via an install target in a Pi loader root or
 * operator settingSources; wb-kqx.5), the serving Pi doc/example shall state the operator contract (REV/BASE/PATH explicit
 * inputs, never interpolated untrusted strings; quoted paths; separate exit-code capture; verified immutable revision IDs)
 * and point at the installed skill, never embed a copy." Until the gate arms the owner filing (bead notes) owes "a
 * census-style negative records that no Pi document presents the recipes as served"; the falsifier its armed acceptance
 * names ("a falsifier that goes red if a Pi doc embeds a recipe copy or shows an unquoted/interpolated REV/BASE/PATH") is
 * already a property of that negative, and is pinned here as row E.
 *
 * SOURCE (read-only git show at HyperUnix-CLI 694570cd00c2 by the cutting seat): docs/programs/
 * feedback-query-skill-factory-2026-10-16/06-workflow-recipes.md:3 "Operators should treat literal `REV`, `BASE` and
 * `PATH` as explicitly provided inputs, not interpolated untrusted strings; quote paths, capture exits separately and
 * verify immutable revision IDs."; the eight recipe headings (:5 W1 branch-landing-audit, :27 W2, :37 W3, :52 W4, :62 W5,
 * :74 W6, :82 W7, :95 W8 bounded-preflight and named-query-lifecycle) and the fifteen hx command lines and spans they hold
 * (W1 :12-18, W2 :32, W3 :42-45, W4 :56, W6 :78, W8 :99; W5 and W7 hold none), which the roster carries verbatim.
 *
 * MEASURED ON THE HOST (2026-10-26T22:01:19Z; the installed hx 0.1.0, binary sha256 8fddc7cc2e6c65d9...): `hx
 * install-skill --list` under an empty scratch HOME (it stayed empty) prints the 26-file bundle (sha256/raw
 * 6befde060c69...) and ten targets, ~/.skills/hyper-unix (default, selected) and nine agent homes (marker absent) - the
 * roster's hxInstall block, and the same ten the wb-kqx.5 filing names. The installed skill's references/agent-workflows.md
 * teaches W1, W2, W3 and W5 as task sections (:309, :336, :361, :386), so the recipes are served wherever that skill loads.
 *
 * MEASURED AT BASE (f381c52, landing 443; re-read at 52812a1, landing 456, for cut #2, at b7851c4, landing 472, for cut
 * #3, and at 1fba5bb, landing 494, for cut #4): src/skill-loader.ts resolves five roots (<cwd>/.pi/skills,
 * <cwd>/.agents/skills, getAgentDir()/skills = ~/.pi/agent/skills by default, ~/.agents/skills, ~/.pi/skills), README's
 * discovery-roots table and the wb-kqx.5 filing state the same five, and none holds an hx install target; every src
 * site that hands settingSources on is [] or a ?? [] default (src/index.ts twice, src/workbench/claude-host.ts,
 * src/workbench/hosts/local-detached.ts) but the operator's own value passed through src/settings.ts, and
 * docs/workbench/13's representative config names ["project"]; src's 116 modules launch git, forge and rf by literal
 * command, never hx, and no src literal names a recipe; the only HX surface Pi registers is hyperunix.find, effectClass
 * read, over @hyperunix/sdk; the 107-file Pi document population (100 Markdown files, six .js and one .yaml under docs,
 * examples, new-feedback, .agents and .pi, with the five repo-root Markdown files) holds no hx command and no recipe
 * mention in its rendered view but one line, the wb-kqx.5 receipt in the byte-frozen TRACEABILITY.md (:236), which
 * names the hx installer and states the skill not found.
 *
 * RESPIN, CUT #2 (refusal #1 of cut #1 6d6a56c3 at PREP F, bound 2026-10-27 by gate-prep-8 of g10-gate-s112; each unmet
 * item and riding finding is cured where named):
 *  U1, the ground (the rendered-text docs truth class bound on wb-9x5.17): THE RENDERED VIEW below. Rows N and E judge one
 *    view, so the gate's T4, T5, T6, T7, T8, T21, T9 and T16 plants read served, T15 is folded and served, and T13 renders
 *    nothing and reads none under R-HIDDEN-SOURCE (Q9); M4 pins every form.
 *  F2, registration and third-leg liveness: THE RECORD below.
 *  F3, the liveness of N1's two walks: N1 counts the lines it judges against the population's own line count
 *    (examinedAll) and holds the independent Markdown walk to a non-empty superset of the population's Markdown files
 *    (outsideCovers).
 *  F4, G3's example reader: G3 reads inline array literals only; the YAML block list and the binding through a name are the
 *    named residual R-EXAMPLE-SHAPE (Q10), the multi-line JSON array its read control.
 *
 * RESPIN, CUT #3 (refusal #2 of cut #2 52ba3c17 at PREP F, bound 2026-10-27 by gate-prep-20 of g10-gate-s111 with a
 * class-level guard on rows N and E; each unmet item and riding finding is cured where named):
 *  U1, the ground, family by family under the guard. (i) SEPARATORS: a tag of an element the page renders apart from
 *    the text around it paints one space (SEPARATOR_ELEMENTS: br in every spelling, case and self-closing form, the
 *    block-level and table elements met inline or in a block, the replaced elements), and the hold check keeps that
 *    space, so a fused view is told from a separated one (M5: the gate's BR-NAME, BR-NAME-SELF, BR-NAME-UPPER,
 *    BR-SKILL, BR-SLUG, BR-CLASS, BR-PAGE, DIV-INLINE-NAME and V-BR with further spellings and elements, each read
 *    served or named, and the fused views of those pages do not hold); a rendering the tag's name does not decide (the
 *    parser's context, an attribute, styling or a default style's generated content) is the named residual
 *    R-HTML-RENDERING (Q12). (ii) PAGE NAMES: a Markdown page is judged in the view whatever the case or spelling of
 *    its Markdown extension (MARKDOWN_EXTENSIONS), in the population, among the repo-root documents and in the
 *    independent walk alike (M6, and N1's walk control: the gate's X-MARKDOWN-EXT, X-UPPER-MD and P-ROOT-MARKDOWN); a
 *    page of another markup is the named residual R-OTHER-MARKUP (Q13). (iii) The claims below are what the cut
 *    measures.
 *  U2, G1's README read: the discovery-roots table is read in the rendered view, where a commented copy shows nothing,
 *    and its label must be unique there (G1 readmeLabels and readmeControls: the gate's G1-DUP).
 *  F3, walk liveness: the lines judged are counted by their recorded verdicts (examinedOf), a served line planted past
 *    the end of the population's longest page reads served (N1 farFloor: W-SKIPFAR-P), and the independent walk reaches
 *    every document of a scratch checkout outside its out-of-population trees, those beyond its five roots included,
 *    and nothing inside those trees (N1 walkControl: W-OUTSIDE-NARROW-P).
 *  F4, a wholly shell-quoted binary ("hx", 'hx', a quoted path to it, $'hx') is an hx command (M2: M-QUOTED-BIN,
 *    M-SQUOTED-BIN, M-FENCE-QUOTED-BIN); a binary the shell assembles from pieces is the named residual
 *    R-SHELL-SPELLING (Q14).
 *  F5, documents that are not Markdown: the repo-root documents and the independent walk take every document extension
 *    (MARKDOWN_EXTENSIONS and OTHER_DOCUMENT_EXTENSIONS, plain text among them), so a repo-root or new top-level .txt
 *    page is read (P-ROOT-TXT, P-GUIDES-TXT); a file outside the five roots without a document extension stays under
 *    R-OUTSIDE-POPULATION (Q3).
 *  F6, G3's examples are read in each document's view as well as in its raw source (G3-EM, G3-ENT; G3 renderedControl).
 *
 * RESPIN, CUT #4 (refusal #3 of cut #3 94504c9d at PREP F, bound 2026-10-27 by gate-prep-4 of g10-gate-s114; the loop
 * cap engaged under rule 19(c), so this cut takes the enumerate-the-resolvable form on the frozen cut #3 shape: no row,
 * pin, witness, plant, quiet row, control, vocabulary entry or literal is removed, narrowed or re-scoped, and every
 * mode below is cured or a named residual with a pinned quiet row):
 *  U1 (a) HIDDEN CONTENT, cured: the view and the hold check alike paint nothing for the content of a HIDDEN_ELEMENTS
 *    element (hiddenStretches, over the page's tags and over the rendered HTML's own tags), so the gate's
 *    H-SCRIPT-NAME, H-STYLE-SLUG, H-TEMPLATE-CMD, H-TITLE-CLASS, H-DATALIST-PAGE, H-NOEMBED-NUMBER, H-RP-NAME and
 *    H-NOFRAMES-CMD read served or named (M7), and H-SCRIPT-HIDES-CMD, a command inside script content, reads none
 *    (Q9).
 *  U1 (b) SEPARATORS, cured: a tag is read by the element its name builds (TAG_ALIASES: an image tag builds img, the
 *    gate's S-IMAGE-ALIAS), and the ruby annotation elements rt and rtc separate (S-RUBY-RT) (M5).
 *  U1 (c) A MENTION JOINED ACROSS A SOURCE LINE END by a hidden construct, a named residual: R-JOINED-MENTION (Q15: the
 *    gate's J-NAME-COMMENT, J-CLASS-COMMENT, J-SLUG-COMMENT and J-NAME-TAG2, with the recipe page, a recipe number and
 *    hidden content spanning the line end; its control is J-NAME-COMMENT-C, the comment on one line).
 *  U1 (iii) CLAIMS: the view is stated as this census's own procedure, held to marked's HTML reduced by the same rules
 *    (THE RENDERED VIEW below, htmlShown, viewHeld); Q9 names the source the view paints nothing for. The members met
 *    at cut #4 that a page's attributes, styling, scripting or parser context decide are named in R-HTML-RENDERING
 *    (Q12: the hidden attribute, display:none styling, an audio element with and without controls, a dialog without its
 *    open attribute, noscript content, an open datalist's extent and an xmp's raw text).
 *  U2, G1's README read: the hidden stretches are hidden there too, and the discovery-roots table is the first table
 *    after the label that shows text (G1 readmeControls templateCopy: the gate's G1-TEMPLATE-COPY).
 *  F6, walk liveness: a served line planted past the end of every population page reads served there (N1
 *    pageFloorMisses: the gate's W-FORGE-NONE-P), beside the longest page's farFloor.
 *
 * FOLLOW-UP, wb-t1jc (the R694 carry of the wb-ts6.1 landing-574 PASS-WITH-FINDING, gate cmd_1d17b59d455f: F1 leads,
 * F2-F5 ride; each is cured or pinned where named, and no landed row, pin, plant, control or literal is removed):
 *  F1, G1's README read (the U2 family): a copy of the roots table the page hides by an attribute is not read. Beyond
 *    the hidden stretches the read hides the content of an element carrying the hidden attribute, of a dialog without
 *    its open attribute and of a details element without its open attribute, save its first summary child
 *    (attributeStretches; a void element, VOID_ELEMENTS, hides nothing), so the gate's G1-DETAILS-COPY and
 *    G1-HIDDEN-ATTR-COPY read the visible table and red G1 (G1 readmeControls detailsCopy, hiddenAttributeCopy and
 *    dialogCopy; the controls: an open details element's table is read, its attribute named in any case, a label in a
 *    closed details element's summary is counted, a summary nested below the details hides with its body, a hidden
 *    void element hides nothing past its tag, nor does a hidden tag inside a template's inert contents, and a nested
 *    element of the hidden element's name is counted). A copy the page hides by styling, by scripting or as an
 *    element's fallback is still read there, a member of R-HTML-RENDERING (Q12's README copies: a style attribute's
 *    display:none, noscript content and an audio element's content).
 *  F2-F4, pinned plants in R-HTML-RENDERING (Q12): a datalist or an rp whose stretch a later end tag of its name closes
 *    past the paragraph end where the page's parser ends it (the gate's H2-DATALIST-LATER-CLOSE and H2-RP-LATER-CLOSE),
 *    the end-tag text inside a script a template holds (H2-TEMPLATE-SCRIPT-ENDTAG) and a template carrying a
 *    shadowrootmode attribute, which the page renders as its host's shadow root (H3-SHADOWROOT-P12), each read none,
 *    and each with its hiding construct taken out reads served (Q12's paired controls).
 *  F3-F5, claim precision: the hiddenStretches and HIDDEN_ELEMENTS doc comments state the parser fidelity as measured
 *    (a template that holds a raw-text element, a declarative shadow root, a stretch a later end tag closes) and the
 *    direction the read of content a page may not show takes for each row (the stricter one for rows N and E, the
 *    lenient one for G1's README read, which therefore hides the attribute-decided members as well).
 *
 * THE RENDERED VIEW: a Markdown page of the population (a file whose extension, in any case, is one of
 * MARKDOWN_EXTENSIONS) is read in the rendered view, line by line, by the rules below: this census's own reading of the
 * page's Markdown and HTML, held to marked's own HTML by the hold check, never a browser's drawing of the page.
 * marked's lexer (the repo's pin, 18.0.11, the landed docs censuses' own) cuts the page, and each source line keeps
 * only what the rules paint on it: emphasis, strong, strike-through and link delimiters, code-span backticks,
 * block-quote and list markers, the table delimiter row, and every comment, processing instruction, declaration and
 * CDATA section paint nothing; a tag paints one space when the element its name builds (in any case, renamed as the
 * parser renames it: TAG_ALIASES, so an image tag builds img) is one of SEPARATOR_ELEMENTS (the line break br, its end
 * tag included; the block-level and table elements; the ruby annotation elements rt and rtc; the replaced elements that
 * render a box, img and input among them, so a Markdown image and a task checkbox paint one space too), save the end
 * tag of a void element other than br, which the parser ignores, and every other tag paints nothing; the content of a
 * HIDDEN_ELEMENTS element paints nothing from its start tag through its own end tag, or to the page's end when no end
 * tag closes it (a nested start tag of its name counted, save in the RAW_TEXT_ELEMENTS, where no tag is a tag; an
 * iframe keeps the one space its start tag paints), and every other element's content is read as text; a table pipe
 * paints one space, so two cells never fuse; a link's destination and title, an image's alt text, a fence line with its
 * info string and a link reference definition paint nothing; code-block text paints verbatim, and code-span text too,
 * save one space dropped from each end when both ends hold one (CommonMark's rule, which marked applies); a character
 * reference decodes in text and HTML (a numeric one by code point, the 77 WHATWG named references whose value is ASCII,
 * white space or a folded character by NAMED_REFERENCES, any other name as written: no name of the standard's table
 * holds a matcher token, and any other value is one visible non-ASCII glyph). Every judged line, rendered or raw, is
 * then FOLDED: default-ignorable, format and non-white-space control characters dropped, every white-space run one
 * space. A file that is not Markdown keeps the raw read. The view is held to marked's own HTML: for every Markdown page
 * of the population the folded lines are, in order, the stretches of marked's rendered HTML reduced by the same rules
 * and folded (htmlShown: the hidden HTML dropped, every separator tag one space, the hidden stretches over the rendered
 * HTML's own tags dropped, references decoded), with one space or none between two lines and the white space inside a
 * line as that reduced HTML holds it, so a view that fuses two words inside a line that the reduced HTML keeps apart
 * does not hold (N1 viewMismatches; M5's fused controls; M7's hold controls); a page whose tokens the walk cannot map
 * is read raw and named (N1 unmapped), so a mapping failure is always loud: the measured shapes are CR LF line ends,
 * which marked's lexer rewrites, and a block-quoted list followed by a lazy HTML line, whose raw marked rebuilds with
 * an added blank line; the population holds neither.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; the labels of G, N and E are the owner
 * filing's own clauses, verbatim from the tracked bead export):
 *  G, the gate stays unarmed. G1 the loader's roots read from source (the roots array by AST; getAgentDir()'s default
 *    measured under a scratch HOME, both in the witness) equal the roster's five, README's table and the wb-kqx.5
 *    filing's, the roster's ten hx targets equal the filing's ten, and no target lies inside a root (the same predicate
 *    finds the default target inside a planted ~/.skills root); README's table is read in its rendered view, the
 *    "Discovery roots" label shown exactly once there and the first table after it that shows text read cell by cell in
 *    the view (readmeControls: a commented copy ahead of a visible table is not read, a label shown twice is counted
 *    twice, a table inside a template element is not read, the visible table after it is, and the same holds for a
 *    table inside an element the page hides by an attribute, a closed details element (its summary shown), an element
 *    carrying the hidden attribute or a dialog without its open attribute, while one inside an open details element is
 *    read: attributeStretches, wb-t1jc F1); G2 through the real
 *    preloadSkills under a scratch HOME a stand-in hyper-unix skill planted at all ten targets still reads the
 *    not-found placeholder, while the same stand-in planted at each of the five roots in turn is found (the positive
 *    control); G3 the Claude host hands the SDK settingSources [] when none is configured (an injected query records
 *    the options), every src settingSources site is [] or a ?? [] default but the operator passthrough in
 *    src/settings.ts, docs/13's example is ["project"], and no Pi document example names the user source in an inline
 *    array literal, read in the document's view (a fenced example shows verbatim there, emphasis and references render)
 *    and in its raw source alike (the same reader finds it in a planted example, and in a planted prose example spelled
 *    with emphasis and a character reference: renderedControl).
 *  N, the until-then negative. N1 every line of the Pi document population in the rendered view: the walk held to
 *    node's recursive listing and to an independent walk of every document (a file with a Markdown or other document
 *    extension) outside the out-of-population trees (a non-empty superset of the population's documents), the walks
 *    shown live on a scratch checkout (walkControl: the independent walk reaches every document of the checkout outside
 *    its out-of-population trees, those beyond the five roots included and every Markdown spelling and plain text among
 *    them, and nothing inside those trees, in another dot directory or without a document extension; the repo-root
 *    documents are the documents at its root), every line judged (the recorded verdicts counted against the
 *    population's own line count) and judged to the end of the longest page (farFloor: a served line planted past it
 *    reads served) and of every page (pageFloorMisses: a served line planted past the end of each population page reads
 *    served there), every Markdown page mapped and its view held to marked's HTML; no line reads served or named
 *    (lineVerdict) and the TRACEABILITY.md:236 floor reads negated; N2 the repo's own skill and agent roots serve no
 *    hyper-unix skill: preloadSkills from the repo root reads the placeholder for it while beads, the one tracked
 *    project skill, is read, and no tracked .pi agent and no default agent declares it (the same predicate reads a
 *    planted frontmatter declaring it); N3 no src module launches hx by a literal command (the scan sees src's git and
 *    rf launches), no src string or template literal reads as a recipe mention or an hx command, and the hyperunix.*
 *    descriptors Pi registers are the typed hyperunix.find read, none flagged (the same reader flags a planted
 *    descriptor naming an hx command).
 *  E, the falsifier. E1 every roster recipe heading and every hx command line or span, appended to a copy of
 *    docs/workbench/07-native-integrations.md, is that page's only non-admitted line (a heading named, a command
 *    served), and the roster's recipe ids and slugs are the bead title's W1-W8 range and the slug vocabulary; E2 six
 *    command lines with the inputs unquoted, braced, command-substituted, template-interpolated, negated in prose, or
 *    in the literal REV/PATH form read served on the same page.
 *  M, the matchers: M1 lineVerdict and its five mention families on planted lines (each family; served, negated; and
 *    the near misses Pi's own docs hold: its workflow "## Recipes", W-numbered requirements, hyperunix.find, "HX
 *    query"); M2 the hx command form: a bare, path-prefixed or wholly shell-quoted binary ("hx", 'hx', a quoted path,
 *    $'hx') then an option or a verb (the near misses: the binary named in prose, quoted or not, and a quote that joins
 *    a word to it); M3 the launch, literal and settingSources scans on planted modules; M4 the rendered view on blocks
 *    planted on the same page: the gate's T4-T9, T15, T16 and T21 forms show T10's command or the served skill sentence
 *    and read served; hx built from references (numeric, a named white space, a soft hyphen) or around a folded word
 *    joiner, combining grapheme joiner (default-ignorable, not a format character) or BEL reads served; decision
 *    classes spelled with references read named; a heading, a block quote, a list item, a table cell and fenced and
 *    indented code each show an hx command; two table cells never fuse into one mention; and the controls: the raw
 *    lines of a marked-up page do not hold to marked's HTML while its rendered view does, and a page whose tokens
 *    cannot be mapped (CR LF line ends, which marked rewrites) is named unmapped and read raw; M5 the separators on
 *    blocks planted on the same page: br in every spelling, case and self-closing form (its end tag included),
 *    block-level and table elements met inline or in a block, the replaced elements (a raw img or input, a Markdown
 *    image, and an image tag, which builds img), and the ruby annotation elements rt and rtc (an rp's content hidden)
 *    keep the skill name, a slug, a decision class, the recipe page and the hx command apart from the next word, so
 *    each reads served or named and its view holds, while the fused view of the same page does not hold; the controls:
 *    an inline element (span, b) and a void separator's end tag still render nothing, so a word split by one reads
 *    whole; M6 the page names: a page holding the T4 form under every Markdown extension spelling, in lower, upper and
 *    mixed case, is judged in the rendered view and reads served, while the same page named .txt is read raw; M7 the
 *    hidden content on blocks planted on the same page: the content of a HIDDEN_ELEMENTS element paints nothing (each
 *    of the nine elements; a script in upper case, with an attribute and holding tags; nested templates; a script in a
 *    table cell, a style in a list item, a template in a block quote and a title in a heading), so the skill name, a
 *    slug, a decision class, the recipe page, a recipe number and the hx command it splits read served or named and
 *    each view holds; a page's text after a closed hidden block is read, an unclosed script hides the rest of the page,
 *    and the views that read the hidden content as text do not hold.
 *  R, the named residuals, each a pinned quiet row (the escape stays uncaught; the row reds when that changes): Q1
 *    R-PARAPHRASE a recipe retold without its slug, page, number, decision class, skill name or an hx command reads
 *    none; Q2 R-SPLIT-COMMAND an hx command broken across source lines before its first option or verb reads none on
 *    each line, whether the page shows the lines apart (a shell continuation in a code block) or joins them (a soft
 *    line break, inside emphasis or not, or a hidden construct that swallows the line end, h<!--(line end)-->x): the
 *    view judges source lines, never a joined paragraph; Q3 R-OUTSIDE-POPULATION code, tests, fixtures, vendored files
 *    and the other dot directories are not read, nor is a file outside the five roots without a document extension (a
 *    repo-root LICENSE or configuration file), and N1's walk control pins both kinds unread (this census's own roster
 *    carries every recipe heading and command, and reads served); Q4 R-ANY-MARKER a not-served marker anywhere on a
 *    mention line admits it, whatever the marker qualifies; Q5 R-OUTSIDE-VOCABULARY a skill named outside the skill
 *    forms, an hx verb outside the captured inventory and the generic outcome names left out of DECISION_CLASSES read
 *    none; Q6 R-OPERATOR-CONFIG an operator's own workbench.settingSources ["user"] passes the settings parse and
 *    reaches the SDK options verbatim, so a Claude-backend session reaches ~/.claude/skills (an hx target; the wb-kqx.5
 *    filing's positive, not measured here) outside every default and document this census reads; Q7 R-HEADLESS-BODY a
 *    recipe body line copied without its heading and holding no mention or command (W7 step 3) reads none; Q8
 *    R-BOUND-LAUNCH a launch whose command arrives through a binding or an expression is not seen by N3's literal scan;
 *    Q9 R-HIDDEN-SOURCE the source the view paints nothing for is not read, so a recipe copy kept there is not seen: a
 *    comment (T13's comment-only command, and a comment block), a fence's info string, an image's alt text, a link's
 *    title, a tag's attribute, a link reference definition and a HIDDEN_ELEMENTS element's content (a command inside
 *    script content, the gate's H-SCRIPT-HIDES-CMD, and a template block holding one) each read none, while the same
 *    command as an element's text reads served; Q10 R-EXAMPLE-SHAPE a settingSources example written as a YAML block
 *    list or bound through a name (the gate's G3-Y and G3-B) is not read by G3, while the multi-line JSON array (G3-J)
 *    is; Q11 R-CONFUSABLE a token spelled with look-alike or compatibility characters (fullwidth, Cyrillic,
 *    mathematical double-struck, a combining mark inside it) reads none: the fold drops invisibles, never compatibility
 *    or look-alike forms; Q12 R-HTML-RENDERING a tag is read by the element its name builds alone (SEPARATOR_ELEMENTS,
 *    HIDDEN_ELEMENTS or neither; a hidden stretch ends at its own end tag), never by the parser's tree context (its
 *    open elements and insertion modes), the user agent's scripting, the tag's attributes or styling (the page's, or
 *    the content a default style generates): a block-level end tag with no open element of its name and a table cell
 *    outside a table (both ignored by the page's parser, so the page fuses the words around them), a separator element
 *    an attribute hides (an input of type hidden), an inline element styled to render apart (style="display:block"),
 *    the quotation marks a q element's default style generates, the text an attribute shows (an input's value holding
 *    an hx command), content an attribute or styling hides (the hidden attribute, style="display:none"), an audio
 *    element (without controls it renders nothing, with them a box), a dialog without its open attribute (which the
 *    page hides, so the words around it fuse), noscript content (which the page hides when scripting is enabled), a
 *    hidden element left open whose stretch runs to the page's end where the parser ends it sooner (a datalist ended by
 *    its paragraph's end, so the page shows the next paragraph), or one whose stretch a later end tag of its name
 *    closes past that paragraph end (a datalist or an rp, wb-t1jc F2), the tags inside an element the parser reads as
 *    raw text the page shows (an xmp, which shows a tag's text), the end-tag text inside a script a template holds
 *    (script text on the page, so its template runs on, while the stretch ends at it: wb-t1jc F3) and a template
 *    carrying a shadowrootmode attribute (its host's shadow root, which the page renders: wb-t1jc F4) each read none,
 *    while the same skill sentence written plainly reads served and each wb-t1jc member with its hiding construct taken
 *    out reads served (the paired controls); and G1's README read, which hides by an attribute as well
 *    (attributeStretches), reads a copy of the roots table the page hides by styling (a style attribute's
 *    display:none), by scripting (noscript content) or as an element's fallback (an audio element's content) in place
 *    of the visible table after it (the README copies, wb-t1jc F1); Q13 R-OTHER-MARKUP a page whose extension is not a
 *    Markdown one is read raw, so another
 *    markup's syntax (reStructuredText strong, AsciiDoc strong, an HTML page's tags) and Markdown named .txt or with no
 *    extension are read as written and a command marked up in them reads none, while the same page with the plain
 *    command reads served; Q14 R-SHELL-SPELLING a binary the shell assembles from pieces (a quote inside the name,
 *    h"x", 'h'x or h''x, or an escaped letter, h\x) reads none, while the wholly quoted binary reads served; Q15
 *    R-JOINED-MENTION a skill name, slug, decision class, recipe page or recipe number broken across a source line end
 *    that a hidden construct spans (a comment, a tag whose attributes run onto the next line, or a hidden element's
 *    content), which the page shows whole on one line, reads none on each line: the view judges source lines, never a
 *    joined paragraph (Q2's mechanism, which Q2 names for the hx command), while the same comment on one line reads
 *    served.
 * THE RECORD (F2): every pin's case pushes its id to REACHED after its witness compare, and the last case walks
 * vitest's own task tree: every registered test title equals the roster's ordered tests list, none registered twice,
 * the record registered last, every other test in run mode, not inverted and run, and REACHED equals ROWS' pins in row
 * order. A registration loop narrowed at its call site, a skipped pin and a guarded return before a witness compare
 * each red it.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal. OUTSIDE ANCHORS: the out-of-file
 * roster test/fixtures/hx-recipe-serving-roster.json holds every row's id, label and pins, every pin's witness, the
 * residual names, the vocabularies (NAMED_REFERENCES, SEPARATOR_ELEMENTS, VOID_SEPARATORS, VOID_ELEMENTS,
 * HIDDEN_ELEMENTS, RAW_TEXT_ELEMENTS, TAG_ALIASES and the two extension lists among them), the ordered test titles,
 * the hx capture and the recipe extract, so a pin deleted, relabelled, swapped for another passing case or removed
 * from every literal of this file at once still reds against it; the tracked bead export (.beads/issues.jsonl) holds
 * rows G, N and E's labels
 * (the wb-ts6.1 title and notes; read against this file's labels and again against the roster's), the W1-W8 range E1
 * holds the recipes to, and the wb-kqx.5 tables G1 holds the roots and targets to; G1-G3 and N1-N3 read src, README,
 * the docs and the loader at run time, and N1 holds the rendered view to marked's own HTML.
 * SCOPE: the recipe extract and the hx capture are producer and host facts at 694570cd00c2 and hx 0.1.0; Pi vendors no hx
 * source, so a producer change is seen only when the roster is re-captured. The parent Pi session's own skill discovery
 * belongs to @earendil-works/pi-coding-agent and is not read here. The armed half - a serving Pi doc/example bound to the
 * operator-contract wording and pointing at the installed skill (a wb-973.15/wb-973.16-style docs census sentence) - is owed
 * only when the gate arms: an hx target inside a loader root (G1, G2 red), a Pi default or documented inline-array example
 * reaching the user source (G3 red), or a Pi document presenting a recipe (N1 red); none is added here.
 *
 * Display paths added: none. Test-only: the scratch HOME, the stand-in skills, the recording SDK query and N1's scratch
 * checkout live in makeScratch scratch; src, docs, README, the roster and the bead export are only read; the fold is this
 * census's own matching normalization of read-only text, never a display path.
 */
import { createHash } from "node:crypto";
import { type Dirent, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { Options, SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { getAgentDir } from "@earendil-works/pi-coding-agent";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { DEFAULT_AGENTS } from "../src/default-agents.js";
import { loadSettings } from "../src/settings.js";
import { preloadSkills } from "../src/skill-loader.js";
import { type CapabilityDescriptor, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SRC = join(REPO, "src");
const BEAD = "wb-ts6.1";
const GATE_BEAD = "wb-kqx.5";
const ROSTER_PATH = join(HERE, "fixtures", "hx-recipe-serving-roster.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const LOADER = join(SRC, "skill-loader.ts");
const README = join(REPO, "README.md");
const SKILL = "hyper-unix";
/** The variable getAgentDir() reads before its ~/.pi/agent default (README "Skill Preloading", $PI_CODING_AGENT_DIR). */
const AGENT_DIR_ENV = "PI_CODING_AGENT_DIR";
const PLACEHOLDER = `(Skill "${SKILL}" not found in .pi/skills/, .agents/skills/, or global skill locations)`;

/* ---------------------------------------------------------------------------------------------------------------------------
 * The vocabularies; every one is held to the roster.
 * ------------------------------------------------------------------------------------------------------------------------- */

const RECIPE_IDS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
const RECIPE_SLUGS = [
  "branch-landing-audit",
  "changed-paths-between",
  "worktree-lane-census",
  "source-orientation",
  "absence-certificate",
  "change-impact-report",
  "mutation-impact-preflight",
  "bounded-preflight",
  "named-query-lifecycle",
];
const RECIPE_PAGES = ["06-workflow-recipes", "feedback-query-skill-factory"];
const DECISION_CLASSES = [
  "BRANCH_ANCESTOR_OF_TRUNK",
  "SAME_BLOB_AT_PATH",
  "DIFFERENT_BLOB",
  "PATH_MISSING_ONE_SIDE",
  "CHANGED_PATHS_REPORTED",
  "HISTORY_INCOMPLETE",
  "RENAME_OR_CONTENT_COMPARISON_NEEDED",
  "KNOWN_PRESENT",
  "KNOWN_ABSENT_IN_SCOPE",
  "UNTOUCHED_IN_RANGE",
  "UNKNOWN_PATH_EXISTENCE",
  "HISTORY_TRUNCATED",
  "COMPLETE_WITHIN_DECLARED_SCOPE",
  "KNOWN_AFFECTED_SUBSET",
];
const SKILL_NAMES = ["hyper-unix", "install-skill"];
const HX_VERBS = [
  "apply",
  "children",
  "config",
  "create",
  "definitions",
  "dependencies",
  "dependents",
  "descendants",
  "exec",
  "explain",
  "explain-query",
  "exports",
  "find",
  "fs",
  "git",
  "help",
  "hxs",
  "init",
  "install-skill",
  "materialize",
  "members",
  "move",
  "mutation",
  "observer",
  "ocaml",
  "parent",
  "plan",
  "query",
  "references",
  "remove",
  "rename",
  "run",
  "schema",
  "select",
  "show",
  "watch",
];
const SERVED_WORDS = ["available", "installed", "load", "loaded", "loads", "reachable", "run", "runs", "served", "serves", "serving", "ships", "use", "uses"];
const NOT_SERVED_MARKERS = [
  "absent",
  "can't",
  "cannot",
  "disjoint",
  "doesn't",
  "don't",
  "gated",
  "isn't",
  "never",
  "no",
  "none",
  "not",
  "unavailable",
  "unreachable",
  "unserved",
  "until",
  "won't",
];
/** The Pi document population: every regular file below these roots, and the repo-root documents (a document extension). */
const DOC_ROOTS = ["docs", "examples", "new-feedback", ".agents", ".pi"];
/** The top-level trees outside the population (with every top-level dot directory not in DOC_ROOTS): code, tests, vendored and built files. */
const OUT_OF_POPULATION = ["coverage", "dist", "media", "node_modules", "qa", "src", "test", "vendor"];
/** The extensions a Markdown page is named with, read in any case: every such page is judged in the rendered view. */
const MARKDOWN_EXTENSIONS = ["livemd", "markdown", "md", "mdown", "mdtext", "mdtxt", "mdwn", "mdx", "mkd", "mkdn", "mkdown", "qmd", "rmd", "ronn", "workbook"];
/** The other document extensions, read in any case and read raw (R-OTHER-MARKUP): plain text, HTML and the other markups. */
const OTHER_DOCUMENT_EXTENSIONS = ["adoc", "asc", "asciidoc", "creole", "htm", "html", "mediawiki", "org", "pod", "rdoc", "rest", "rst", "scd", "text", "textile", "txt", "wiki"];
/**
 * The elements a page renders apart from the text around them (a dialog the page hides without its open attribute, and an
 * input of type hidden, are R-HTML-RENDERING): the line break, the block-level and table elements (the
 * HTML rendering's block, list-item and table display types; the column elements, which hold no text, left out), the ruby
 * annotation elements rt and rtc (display: ruby-text and ruby-text-container, set apart from their base) and the replaced
 * elements that render a box. Each of their tags renders one space in the view (outside a hidden stretch), so the words
 * either side never fuse; every other tag renders nothing. The element's name alone decides, the name the parser gives
 * it (TAG_ALIASES) (R-HTML-RENDERING).
 */
const SEPARATOR_ELEMENTS = [
  "address",
  "article",
  "aside",
  "blockquote",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "hr",
  "iframe",
  "img",
  "input",
  "legend",
  "li",
  "listing",
  "main",
  "menu",
  "meter",
  "nav",
  "object",
  "ol",
  "p",
  "plaintext",
  "pre",
  "progress",
  "rt",
  "rtc",
  "search",
  "section",
  "select",
  "summary",
  "svg",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "tr",
  "ul",
  "video",
  "xmp",
];
/** The separators that are void elements: the parser ignores their end tags, save br's, which it reads as a line break. */
const VOID_SEPARATORS = ["br", "embed", "hr", "img", "input"];
/**
 * The void elements, as the HTML Standard's serialization lists them (the parser reads each as holding no content and
 * ignores its end tag, save br's): an element of these names that carries the hidden attribute hides nothing past its own
 * tag in G1's README read (attributeStretches, wb-t1jc F1).
 */
const VOID_ELEMENTS = ["area", "base", "basefont", "bgsound", "br", "col", "embed", "frame", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
/**
 * The elements whose content the view hides, by name (U1 (a), cut #4): the content-holding members of the HTML Standard
 * rendering section 15.3.1's display:none list (datalist, noembed, noframes, rp, script, style, template and title; its
 * void members area, base, basefont, link, meta and param hold no content, and the parser ignores a head tag met in a
 * body, so text between head tags is read) and iframe, whose raw-text content is never rendered. A template's contents
 * are inert save a declarative shadow root's: a template carrying a shadowrootmode attribute becomes its host's shadow
 * root, which the page renders, while the view hides it by name (R-HTML-RENDERING, wb-t1jc F4). Every other element's
 * content is read as text, content a page may not show among it (the fallback content of canvas, object, audio and
 * video, noscript content when scripting is enabled, the body of a details element without its open attribute, a
 * dialog without its open attribute, an element carrying the hidden attribute). For rows N and E that is the stricter
 * direction, a mention there read rather than hidden (a mention such content splits is R-HTML-RENDERING); for G1's
 * README read it is the lenient one, a copy of the roots table kept there read in place of the visible table, so that
 * read hides the attribute-decided members as well (attributeStretches, wb-t1jc F1) and reads the rest
 * (R-HTML-RENDERING: Q12's README copies).
 */
const HIDDEN_ELEMENTS = ["datalist", "iframe", "noembed", "noframes", "rp", "script", "style", "template", "title"];
/** Of them, the elements the parser reads as raw text or RCDATA: no tag inside one is a tag, so the first end tag of its own name ends it. */
const RAW_TEXT_ELEMENTS = ["iframe", "noembed", "noframes", "script", "style", "title"];
/** The tag names the in-body parser renames before it builds the element (the HTML Standard: an image start tag builds img; its end tag matches no open element and is ignored), as name=element. */
const TAG_ALIASES = ["image=img"];
/**
 * The named character references the rendered view decodes, as name=code points: every WHATWG named reference whose value
 * is ASCII, white space or a character the fold drops (77 of the standard's 2125 names with the semicolon, read from its
 * table). Any other named reference renders one visible non-ASCII glyph and is read as written; no name of the standard's
 * table holds a matcher token, so a name read as written never makes a hit.
 */
const NAMED_REFERENCE_LIST: readonly string[] = [
  "AMP=0026",
  "ApplyFunction=2061",
  "DiacriticalGrave=0060",
  "GT=003E",
  "Hat=005E",
  "InvisibleComma=2063",
  "InvisibleTimes=2062",
  "LT=003C",
  "MediumSpace=205F",
  "NegativeMediumSpace=200B",
  "NegativeThickSpace=200B",
  "NegativeThinSpace=200B",
  "NegativeVeryThinSpace=200B",
  "NewLine=000A",
  "NoBreak=2060",
  "NonBreakingSpace=00A0",
  "QUOT=0022",
  "Tab=0009",
  "ThickSpace=205F 200A",
  "ThinSpace=2009",
  "UnderBar=005F",
  "VerticalLine=007C",
  "VeryThinSpace=200A",
  "ZeroWidthSpace=200B",
  "af=2061",
  "amp=0026",
  "apos=0027",
  "ast=002A",
  "bsol=005C",
  "colon=003A",
  "comma=002C",
  "commat=0040",
  "dollar=0024",
  "emsp=2003",
  "emsp13=2004",
  "emsp14=2005",
  "ensp=2002",
  "equals=003D",
  "excl=0021",
  "fjlig=0066 006A",
  "grave=0060",
  "gt=003E",
  "hairsp=200A",
  "ic=2063",
  "it=2062",
  "lbrace=007B",
  "lbrack=005B",
  "lcub=007B",
  "lowbar=005F",
  "lpar=0028",
  "lrm=200E",
  "lsqb=005B",
  "lt=003C",
  "midast=002A",
  "nbsp=00A0",
  "num=0023",
  "numsp=2007",
  "percnt=0025",
  "period=002E",
  "plus=002B",
  "puncsp=2008",
  "quest=003F",
  "quot=0022",
  "rbrace=007D",
  "rbrack=005D",
  "rcub=007D",
  "rlm=200F",
  "rpar=0029",
  "rsqb=005D",
  "semi=003B",
  "shy=00AD",
  "sol=002F",
  "thinsp=2009",
  "verbar=007C",
  "vert=007C",
  "zwj=200D",
  "zwnj=200C",
];
const NAMED_REFERENCES: ReadonlyMap<string, string> = new Map(
  NAMED_REFERENCE_LIST.map(entry => {
    const [name = "", points = ""] = entry.split("=");
    return [name, points.split(" ").map(point => String.fromCodePoint(Number.parseInt(point, 16))).join("")] as const;
  }),
);

/* ---------------------------------------------------------------------------------------------------------------------------
 * The rendered view (U1): what the rules paint on each source line of a Markdown page, the one view rows N and E judge a page in.
 * ------------------------------------------------------------------------------------------------------------------------- */

/** Default-ignorable, format and non-white-space control characters: none is a letter, a digit or white space, so the fold drops them. */
const INVISIBLE = /[\p{Default_Ignorable_Code_Point}\p{Cf}]|[^\P{Cc}\t\n\v\f\r]/gu;
/** One judged line as the reader compares it: the invisibles dropped, then every white-space run one space, trimmed. */
const folded = (line: string): string => line.replace(INVISIBLE, "").replace(/\s+/g, " ").trim();

const REFERENCE = /&(?:#([0-9]{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g;
/** A character reference's rendered value: a numeric one by code point (an invalid one U+FFFD), a named one by NAMED_REFERENCES, else as written. */
function referenceValue(whole: string, decimal: string | undefined, hex: string | undefined, name: string | undefined): string {
  if (decimal !== undefined || hex !== undefined) {
    const code = decimal !== undefined ? Number.parseInt(decimal, 10) : Number.parseInt(hex ?? "", 16);
    return code === 0 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(0xfffd) : String.fromCodePoint(code);
  }
  return NAMED_REFERENCES.get(name ?? "") ?? whole;
}
const decodeReferences = (text: string): string =>
  text.replace(REFERENCE, (whole: string, decimal?: string, hex?: string, name?: string) => referenceValue(whole, decimal, hex, name));
/** The parts of raw HTML a page never shows: comments, processing instructions, declarations, CDATA, and every tag with its attributes. */
const HTML_HIDDEN =
  /<!--[\s\S]*?(?:-->|$)|<\?[\s\S]*?(?:\?>|$)|<![A-Za-z][\s\S]*?(?:>|$)|<!\[CDATA\[[\s\S]*?(?:\]\]>|$)|<\/?[A-Za-z][A-Za-z0-9-]*(?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*\s*\/?>/g;
/** A tag's closing slash and element name (a comment, an instruction, a declaration or CDATA has none). */
const TAG_NAME = /^<(\/?)([A-Za-z][A-Za-z0-9-]*)/;
const ALIASES: ReadonlyMap<string, string> = new Map(
  TAG_ALIASES.map(entry => {
    const [name = "", element = ""] = entry.split("=");
    return [name, element] as const;
  }),
);
/** The element a tag name builds: the name lower-cased, then renamed as the parser renames it (TAG_ALIASES). */
const elementOf = (name: string): string => ALIASES.get(name.toLowerCase()) ?? name.toLowerCase();
/**
 * Whether one hidden-HTML match renders apart from the text around it (one space): a tag that builds a SEPARATOR_ELEMENTS
 * element (any case; an aliased name read as its element), save the end tag of a void separator other than br, which the
 * page's parser ignores.
 */
function separates(hidden: string): boolean {
  const tag = TAG_NAME.exec(hidden);
  if (tag === null) return false;
  const name = elementOf(tag[2] ?? "");
  if (!SEPARATOR_ELEMENTS.includes(name)) return false;
  return tag[1] !== "/" || name === "br" || !VOID_SEPARATORS.includes(name);
}

/** A text the walk paints, and the page offset of each of its characters: the page itself, or a container's content. */
interface Frame {
  readonly text: string;
  readonly at: (offset: number) => number;
}
/** What each page offset shows: its own character, a decoded reference's value (at the reference's first offset), a space, or nothing. */
type Shown = string[];
/** One tag met in raw HTML: its first and last offsets, the element it builds, whether it closes one, whether it separates, and the attribute names a start tag carries. */
interface TagMet {
  readonly from: number;
  readonly to: number;
  readonly name: string;
  readonly closing: boolean;
  readonly separator: boolean;
  readonly attributes: readonly string[];
}
/** The tags each painted page met (paintPage registers a page's list; paintHtml appends to it). */
const TAGS_MET = new WeakMap<Shown, TagMet[]>();
/** One attribute of a tag matched by HTML_HIDDEN, after the tag's name: its name and its value, if any. */
const ATTRIBUTE = /\s+([^\s"'>/=]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g;
function tagMet(hidden: string, from: number, to: number): TagMet | undefined {
  const tag = TAG_NAME.exec(hidden);
  if (tag === null) return undefined;
  const closing = tag[1] === "/";
  /** A start tag's attribute names, lower-cased in source order (the parser ignores an end tag's). */
  const attributes = closing ? [] : [...hidden.slice(tag[0].length).matchAll(ATTRIBUTE)].map(match => (match[1] ?? "").toLowerCase());
  return { from, to, name: elementOf(tag[2] ?? ""), closing, separator: separates(hidden), attributes };
}
interface Stretch {
  readonly from: number;
  readonly to: number;
  readonly separator: boolean;
}
/**
 * The stretches a page hides (U1 (a)), over its tags in offset order: from the start tag of a HIDDEN_ELEMENTS element
 * through its own end tag (a nested start tag of the same name counted, save in a raw-text or RCDATA element, where no tag
 * is a tag), or to the page's end when no end tag closes it. That is the parser's extent for the raw-text and RCDATA
 * elements, and for a template that holds none of them: the tags inside a template are read by their names alone, so an
 * end tag's text inside a script (or another raw-text or RCDATA element) a template holds ends the stretch here, while
 * the page reads it as that element's text and its template runs on (wb-t1jc F3). The parser can end an open datalist
 * or rp sooner, at its paragraph's or its parent's end, so the page shows what a stretch hides past that end, whether a
 * later end tag of its name closes the stretch (wb-t1jc F2) or none does. Both are R-HTML-RENDERING (Q12). A stretch
 * keeps one space at its start when its element separates (iframe).
 */
function hiddenStretches(tags: readonly TagMet[], end: number): Stretch[] {
  const stretches: Stretch[] = [];
  let open: { readonly start: TagMet; depth: number } | undefined;
  for (const tag of [...tags].sort((left, right) => left.from - right.from)) {
    if (open === undefined) {
      if (!tag.closing && HIDDEN_ELEMENTS.includes(tag.name)) open = { start: tag, depth: 1 };
    } else if (tag.name === open.start.name && !tag.closing) {
      if (!RAW_TEXT_ELEMENTS.includes(tag.name)) open.depth += 1;
    } else if (tag.name === open.start.name) {
      open.depth -= 1;
      if (open.depth === 0) {
        stretches.push({ from: open.start.from, to: tag.to, separator: open.start.separator });
        open = undefined;
      }
    }
  }
  if (open !== undefined) stretches.push({ from: open.start.from, to: end, separator: open.start.separator });
  return stretches;
}
/** Hides each stretch: every offset in it shows nothing, save one space at the start of a separating element's stretch. */
function hideStretches(shown: Shown, stretches: readonly Stretch[]): void {
  for (const { from, to, separator } of stretches) {
    for (let index = from; index <= to; index += 1) shown[index] = "";
    if (separator) shown[from] = " ";
  }
}
/** Whether a start tag's element is one the page hides by an attribute: it carries the hidden attribute, or it is a dialog or a details element without its open attribute. */
function hidesByAttribute(tag: TagMet): boolean {
  if (tag.closing || VOID_ELEMENTS.includes(tag.name)) return false;
  if (tag.attributes.includes("hidden")) return true;
  return (tag.name === "dialog" || tag.name === "details") && !tag.attributes.includes("open");
}
/** The index of the tag that closes the element whose start tag is tags[at] (a nested start tag of its name counted), or -1 when none does. */
function closerOf(tags: readonly TagMet[], at: number): number {
  const start = tags[at];
  let depth = 1;
  for (let index = at + 1; index < tags.length; index += 1) {
    const tag = tags[index];
    if (start === undefined || tag === undefined || tag.name !== start.name) continue;
    depth += tag.closing ? -1 : 1;
    if (depth === 0) return index;
  }
  return -1;
}
/**
 * The first summary child of the details element whose start tag is tags[at], up to the tag at limit (its end tag, or the
 * list's end): a summary start tag met while every non-void element opened inside the details is closed again, from its
 * start tag through its own end tag, or to just before the details' end when none closes it inside.
 */
function summaryChildOf(tags: readonly TagMet[], at: number, limit: number, end: number): Stretch | undefined {
  let depth = 0;
  for (let index = at + 1; index < limit; index += 1) {
    const tag = tags[index];
    if (tag === undefined || VOID_ELEMENTS.includes(tag.name)) continue;
    if (tag.closing) {
      depth = Math.max(0, depth - 1);
      continue;
    }
    if (depth === 0 && tag.name === "summary") {
      const closer = closerOf(tags, index);
      const to = closer >= 0 && closer < limit ? (tags[closer]?.to ?? end) : (tags[limit]?.from ?? end + 1) - 1;
      return { from: tag.from, to, separator: tag.separator };
    }
    depth += 1;
  }
  return undefined;
}
/**
 * The stretches G1's README read hides beyond the view's (wb-t1jc F1), over the page's tags outside the hidden stretches,
 * in offset order: the content of an element the page hides by an attribute (hidesByAttribute: an element carrying the
 * hidden attribute, a dialog without its open attribute, and a details element without its open attribute, save its
 * first summary child, which the page shows), from its start tag through its own end tag (a nested start tag of its name
 * counted), or to the page's end when no end tag closes it; a void element (VOID_ELEMENTS) holds no content and hides
 * nothing. The extent is the tags' own, as the hidden stretches' is: the parser's tree context (an implied or misnested
 * end tag) is R-HTML-RENDERING, and so is content the page hides by styling, by scripting or as an element's fallback,
 * which this read still reads (Q12's README copies). A stretch keeps one space at its start when its element separates.
 */
function attributeStretches(tags: readonly TagMet[], end: number): Stretch[] {
  const hidden = hiddenStretches(tags, end);
  const outside = [...tags].filter(tag => !hidden.some(stretch => tag.from >= stretch.from && tag.from <= stretch.to)).sort((left, right) => left.from - right.from);
  const stretches: Stretch[] = [];
  outside.forEach((tag, at) => {
    if (!hidesByAttribute(tag)) return;
    const closer = closerOf(outside, at);
    const to = closer < 0 ? end : (outside[closer]?.to ?? end);
    const summary = tag.name === "details" && !tag.attributes.includes("hidden") ? summaryChildOf(outside, at, closer < 0 ? outside.length : closer, end) : undefined;
    const parts = summary === undefined ? [{ from: tag.from, to }] : [
      { from: tag.from, to: summary.from - 1 },
      { from: summary.to + 1, to },
    ];
    for (const part of parts) if (part.from <= part.to) stretches.push({ ...part, separator: tag.separator });
  });
  return stretches;
}
const lineStartsOf = (text: string): number[] => {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) if (text[index] === "\n") starts.push(index + 1);
  return starts;
};
const subFrame = (frame: Frame, offset: number, length: number): Frame => ({ text: frame.text.slice(offset, offset + length), at: inner => frame.at(offset + inner) });
/** A container's content (a list item, a block quote): marked strips each source line's marker or indent, so each content line is a suffix of its source line. */
function suffixFrame(frame: Frame, at: number, raw: string, content: string): Frame {
  const sourceLines = raw.split("\n");
  const sourceStarts = lineStartsOf(raw);
  const lines = content.split("\n");
  const starts = lineStartsOf(content);
  if (lines.length > sourceLines.length) throw new Error("a container's content has more lines than its source");
  const shifts = lines.map((line, index) => {
    const source = sourceLines[index] ?? "";
    if (!source.endsWith(line)) throw new Error(`the container line ${JSON.stringify(line.slice(0, 40))} is not a suffix of its source line`);
    return (sourceStarts[index] ?? 0) + source.length - line.length;
  });
  return {
    text: content,
    at: inner => {
      let index = starts.length - 1;
      while (index > 0 && (starts[index] ?? 0) > inner) index -= 1;
      return frame.at(at + (shifts[index] ?? 0) + inner - (starts[index] ?? 0));
    },
  };
}
/** A table cell's frame: marked hands on the cell's source with the backslash of each escaped pipe dropped. */
function cellFrame(frame: Frame, at: number, source: string, text: string): Frame {
  const offsets: number[] = [];
  let index = 0;
  for (let position = 0; position < text.length; position += 1) {
    if (source[index] === text[position]) {
      offsets.push(index);
      index += 1;
    } else if (source[index] === "\\" && source[index + 1] === "|" && text[position] === "|") {
      offsets.push(index + 1);
      index += 2;
    } else {
      throw new Error(`the table cell ${JSON.stringify(text.slice(0, 40))} does not align with its source`);
    }
  }
  return { text, at: inner => frame.at(at + (offsets[inner] ?? index)) };
}
/** One table row line cut on its unescaped pipes as GFM cuts it: each cell's trimmed source and offset, and the pipes. */
function rowCells(line: string): { readonly cells: ReadonlyArray<{ readonly start: number; readonly text: string }>; readonly pipes: readonly number[] } {
  const pipes: number[] = [];
  for (let index = 0; index < line.length; index += 1) {
    if (line[index] === "\\") index += 1;
    else if (line[index] === "|") pipes.push(index);
  }
  const cuts = [-1, ...pipes, line.length];
  const cells = cuts.slice(0, -1).map((cut, index) => {
    const piece = line.slice(cut + 1, cuts[index + 1]);
    return { start: cut + 1 + piece.length - piece.trimStart().length, text: piece.trim() };
  });
  if (cells[0]?.text === "" && line.trimStart().startsWith("|")) cells.shift();
  if (cells.at(-1)?.text === "" && line.trimEnd().endsWith("|")) cells.pop();
  return { cells, pipes };
}

function paintVerbatim(shown: Shown, frame: Frame, at: number, raw: string): void {
  for (let index = 0; index < raw.length; index += 1) shown[frame.at(at + index)] = raw[index] ?? "";
}
/** Text with its character references decoded: a reference shows its value at its first offset and nothing at the rest. */
function paintText(shown: Shown, frame: Frame, at: number, raw: string): void {
  let last = 0;
  for (const match of raw.matchAll(REFERENCE)) {
    paintVerbatim(shown, frame, at + last, raw.slice(last, match.index));
    shown[frame.at(at + match.index)] = referenceValue(match[0], match[1], match[2], match[3]);
    last = match.index + match[0].length;
  }
  paintVerbatim(shown, frame, at + last, raw.slice(last));
}
/** Raw HTML (a block, or an inline tag or comment): a separator tag shows one space, the other hidden parts nothing, the rest is text; each tag is logged for the hidden stretches. */
function paintHtml(shown: Shown, frame: Frame, at: number, raw: string): void {
  let last = 0;
  for (const match of raw.matchAll(HTML_HIDDEN)) {
    paintText(shown, frame, at + last, raw.slice(last, match.index));
    if (separates(match[0])) shown[frame.at(at + match.index)] = " ";
    const tag = tagMet(match[0], frame.at(at + match.index), frame.at(at + match.index + match[0].length - 1));
    if (tag !== undefined) TAGS_MET.get(shown)?.push(tag);
    last = match.index + match[0].length;
  }
  paintText(shown, frame, at + last, raw.slice(last));
}
const CLOSING_FENCE = /^ {0,3}(?:`{3,}|~{3,})[ \t]*$/;
/** A code block shows its text verbatim; a fence line (the opening one with its info string, and the closing one) shows nothing. */
function paintCode(shown: Shown, frame: Frame, at: number, code: Tokens.Code): void {
  const lines = code.raw.split("\n");
  const starts = lineStartsOf(code.raw);
  let last = lines.length - 1;
  while (last > 0 && (lines[last] ?? "").trim() === "") last -= 1;
  const fenced = code.codeBlockStyle !== "indented";
  lines.forEach((line, index) => {
    if (fenced && (index === 0 || (index === last && CLOSING_FENCE.test(line)))) return;
    paintVerbatim(shown, frame, at + (starts[index] ?? 0), line);
  });
}
/** A table: each cell's inline tokens in the cell's source, each pipe one space (two cells never fuse), the delimiter row nothing. */
function paintTable(shown: Shown, frame: Frame, at: number, table: Tokens.Table): void {
  const lines = table.raw.split("\n");
  const starts = lineStartsOf(table.raw);
  [table.header, ...table.rows].forEach((cells, row) => {
    const line = row === 0 ? 0 : row + 1;
    const lineAt = at + (starts[line] ?? 0);
    const cut = rowCells(lines[line] ?? "");
    for (const pipe of cut.pipes) shown[frame.at(lineAt + pipe)] = " ";
    cells.forEach((cell, column) => {
      if (cell.text === "") return;
      const source = cut.cells[column];
      if (source === undefined) throw new Error(`a table cell of row ${row} has no source`);
      paintTokens(shown, cell.tokens, cellFrame(frame, lineAt + source.start, source.text, cell.text));
    });
  });
}
const textOf = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
};
const childrenOf = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
const isCode = (token: Token): token is Tokens.Code => token.type === "code";
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
/** The frame of a token's own text inside its source (a paragraph's, a heading's, an emphasis's or a link's text). */
function innerFrame(frame: Frame, at: number, raw: string, inner: string, from = 0): Frame {
  const offset = raw.indexOf(inner, from);
  if (offset < 0) throw new Error(`the text ${JSON.stringify(inner.slice(0, 40))} is not inside its source ${JSON.stringify(raw.slice(0, 40))}`);
  return subFrame(frame, at + offset, inner.length);
}
/** Paints tokens whose sources run in order through the frame (only white space between them). */
function paintTokens(shown: Shown, tokens: readonly Token[], frame: Frame): void {
  let cursor = 0;
  for (const token of tokens) {
    const at = frame.text.indexOf(token.raw, cursor);
    if (at < 0 || /\S/.test(frame.text.slice(cursor, at))) throw new Error(`a ${token.type} token is not where its source runs`);
    paintToken(shown, token, frame, at);
    cursor = at + token.raw.length;
  }
}
function paintToken(shown: Shown, token: Token, frame: Frame, at: number): void {
  const raw = token.raw;
  switch (token.type) {
    case "space":
    case "hr":
    case "def":
      return;
    case "checkbox":
    case "image":
      shown[frame.at(at)] = " ";
      return;
    case "html":
      paintHtml(shown, frame, at, raw);
      return;
    case "code":
      if (isCode(token)) paintCode(shown, frame, at, token);
      return;
    case "codespan": {
      const ticks = /^`+/.exec(raw)?.[0].length ?? 0;
      const content = raw.slice(ticks, raw.length - ticks);
      const spaced = content.replace(/\n/g, " ");
      const trim = /[^ ]/.test(spaced) && spaced.startsWith(" ") && spaced.endsWith(" ") ? 1 : 0;
      paintVerbatim(shown, frame, at + ticks + trim, content.slice(trim, content.length - trim));
      return;
    }
    case "escape":
      shown[frame.at(at + 1)] = raw.slice(1);
      return;
    case "br":
      shown[frame.at(at)] = " ";
      return;
    case "text":
      if (childrenOf(token).length > 0) paintTokens(shown, childrenOf(token), innerFrame(frame, at, raw, textOf(token)));
      else paintText(shown, frame, at, raw);
      return;
    case "link":
      if (raw.startsWith("[")) paintTokens(shown, childrenOf(token), innerFrame(frame, at, raw, textOf(token), 1));
      else paintVerbatim(shown, frame, at + (raw.startsWith("<") ? 1 : 0), textOf(token));
      return;
    case "strong":
    case "em":
    case "del":
    case "paragraph":
    case "heading":
      paintTokens(shown, childrenOf(token), innerFrame(frame, at, raw, textOf(token)));
      return;
    case "blockquote":
    case "list_item":
      paintTokens(shown, childrenOf(token), suffixFrame(frame, at, raw, textOf(token)));
      return;
    case "list":
      if (isList(token)) paintTokens(shown, token.items, subFrame(frame, at, raw.length));
      return;
    case "table":
      if (isTable(token)) paintTable(shown, frame, at, token);
      return;
    default:
      throw new Error(`no rendered map for a ${token.type} token`);
  }
}
/** What each offset of a Markdown page shows in the view, the hidden stretches hidden, and the page's top-level tokens; throws where a token cannot be mapped to its source. */
function paintPage(text: string): { readonly shown: Shown; readonly tokens: readonly Token[] } {
  const tokens = marked.lexer(text);
  if (tokens.map(token => token.raw).join("") !== text) throw new Error("the lexed tokens do not rebuild the page");
  const shown: Shown = new Array<string>(text.length).fill("");
  const tags: TagMet[] = [];
  TAGS_MET.set(shown, tags);
  paintTokens(shown, tokens, { text, at: offset => offset });
  hideStretches(shown, hiddenStretches(tags, text.length - 1));
  return { shown, tokens };
}
/** The stretch of a painted page from one offset to another, as shown. */
const shownBetween = (shown: Shown, from: number, to: number): string => shown.slice(from, to).join("");
/** Each source line of a Markdown page in the rendered view, one entry per line; throws where a token cannot be mapped to its source. */
function renderedLines(text: string): string[] {
  const { shown } = paintPage(text);
  const starts = lineStartsOf(text);
  return starts.map((start, index) => shownBetween(shown, start, index + 1 < starts.length ? (starts[index + 1] ?? text.length) - 1 : text.length));
}
/**
 * marked's own rendering of the page reduced by the view's rules (each separator tag one space, the other hidden HTML
 * dropped, the stretches hiddenStretches finds over the rendered HTML's own tags dropped, references decoded): the text
 * the hold check compares the view with.
 */
function htmlShown(text: string): string {
  const html = marked.parse(text, { async: false });
  const shown: Shown = html.split("");
  const tags: TagMet[] = [];
  for (const match of html.matchAll(HTML_HIDDEN)) {
    const to = match.index + match[0].length - 1;
    for (let index = match.index; index <= to; index += 1) shown[index] = "";
    if (separates(match[0])) shown[match.index] = " ";
    const tag = tagMet(match[0], match.index, to);
    if (tag !== undefined) tags.push(tag);
  }
  hideStretches(shown, hiddenStretches(tags, html.length - 1));
  return decodeReferences(shown.join(""));
}
/**
 * A line view of a page holds to marked's rendered HTML reduced by the view's rules (htmlShown): both folded, each
 * non-empty view line is in order the next stretch of that text, and between two lines it holds one space or none (a
 * source line end holds one; a hidden construct that spans it, none: R-SPLIT-COMMAND, R-JOINED-MENTION). Inside a line
 * the white space must be that text's, so a view that fuses two words it keeps apart, or parts two it keeps joined, does
 * not hold.
 */
function viewHeld(lines: readonly string[], text: string): boolean {
  const page = folded(htmlShown(text));
  let at = 0;
  for (const line of lines.map(folded)) {
    if (line === "") continue;
    if (!page.startsWith(line, at)) return false;
    at += line.length;
    if (page[at] === " ") at += 1;
  }
  return at === page.length;
}
/** The rendered view of a page holds to marked's HTML (a page it cannot map does not). */
function viewHolds(text: string): boolean {
  try {
    return viewHeld(renderedLines(text), text);
  } catch {
    return false;
  }
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The line reader rows N and E judge with.
 * ------------------------------------------------------------------------------------------------------------------------- */

const alternation = (words: readonly string[]): string => words.map(word => word.replace(/[.*+?^$()|[\]\\{}]/g, "\\$&")).join("|");
/** Whole words; an underscore joins (KNOWN_ABSENT_IN_SCOPE holds no marker) while a hyphen separates (not-found holds one). */
const wordsPattern = (words: readonly string[]): RegExp => new RegExp(`(?<![A-Za-z0-9'_])(?:${alternation(words)})(?![A-Za-z0-9'_])`, "i");
const SLUG = new RegExp(`(?<![A-Za-z0-9_-])(?:${alternation(RECIPE_SLUGS)})(?![A-Za-z0-9_-])`, "i");
const PAGE = new RegExp(`(?<![A-Za-z0-9_])(?:${alternation(RECIPE_PAGES)})(?![A-Za-z0-9_])`, "i");
const RECIPE_NUMBER = new RegExp(`(?<![A-Za-z0-9_])(?:${alternation(RECIPE_IDS)})(?![A-Za-z0-9_])`);
/** A recipe number counts only beside an HX word: Pi's own W-numbered requirements are not recipes. */
const HX_CONTEXT = /hyper-?unix|(?<![A-Za-z0-9_.-])hx(?![A-Za-z0-9_])|HXFS|recipe|skill/i;
const DECISION_CLASS = new RegExp(`(?<![A-Za-z0-9_])(?:${alternation(DECISION_CLASSES)})(?![A-Za-z0-9_])`);
const SKILL_NAME = new RegExp(`(?<![A-Za-z0-9_])(?:${alternation(SKILL_NAMES)})(?![A-Za-z0-9_])|(?<![A-Za-z0-9_])(?:hyper-?unix|hx)\\s+skill(?![A-Za-z0-9_])`, "i");
/**
 * An hx shell invocation: the lowercase binary name (a path to it allowed), bare or wholly quoted ("hx", 'hx', a quoted
 * path, $'hx'), then an option or a verb of the captured inventory. A quote inside the name is R-SHELL-SPELLING.
 */
const HX_COMMAND = new RegExp(
  `(?:(?<![A-Za-z0-9_.-])hx|(?<![A-Za-z0-9_.-])(["'])(?:[^"'\\s]*/)?hx\\1)\\s+(?:--?[A-Za-z]|(?:${alternation(HX_VERBS)})(?![A-Za-z0-9_-]))`,
);
const SERVED = wordsPattern(SERVED_WORDS);
const NOT_SERVED = wordsPattern(NOT_SERVED_MARKERS);

const FAMILIES: ReadonlyArray<readonly [string, (line: string) => boolean]> = [
  ["slug", line => SLUG.test(line)],
  ["page", line => PAGE.test(line)],
  ["number", line => RECIPE_NUMBER.test(line) && HX_CONTEXT.test(line)],
  ["class", line => DECISION_CLASS.test(line)],
  ["skill", line => SKILL_NAME.test(line)],
];
const mentionFamilies = (line: string): string[] => FAMILIES.filter(([, hit]) => hit(line)).map(([name]) => name);

type LineVerdict = "none" | "named" | "negated" | "served";
/**
 * One line: an hx command form is served whatever else the line says (a shown command is the embedded recipe step the
 * bead's falsifier names); else no recipe mention is none; a mention with a not-served marker is negated; with a served
 * word it is served; else named. Row N admits only none and negated lines.
 */
function lineVerdict(raw: string): LineVerdict {
  const line = folded(raw);
  if (HX_COMMAND.test(line)) return "served";
  if (mentionFamilies(line).length === 0) return "none";
  if (NOT_SERVED.test(line)) return "negated";
  return SERVED.test(line) ? "served" : "named";
}

interface Judged {
  readonly named: string[];
  readonly negated: string[];
  readonly served: string[];
  /** Lines whose verdict was none: with the three lists, one recorded verdict per source line of every file (F3, examinedOf). */
  none: number;
  /** Markdown pages whose tokens the rendered view could not map: read raw instead, and named by row N. */
  readonly unmapped: string[];
}
/** The lines a judgement recorded a verdict for: a walk that stops early, or a line judged but not recorded, is seen (F3). */
const examinedOf = (judged: Judged): number => judged.none + judged.named.length + judged.negated.length + judged.served.length;
/** A file's extension, lower-cased ("" when it has none). */
const extensionOf = (path: string): string => /\.([^./]+)$/.exec(path)?.[1]?.toLowerCase() ?? "";
/** A Markdown page: a Markdown extension in any case or spelling (U1 (ii)); the rest is read raw. */
const isMarkdown = (path: string): boolean => MARKDOWN_EXTENSIONS.includes(extensionOf(path));
/** A document: a Markdown page or a page of another document extension (plain text, HTML and the other markups). */
const isDocument = (path: string): boolean => isMarkdown(path) || OTHER_DOCUMENT_EXTENSIONS.includes(extensionOf(path));
/** The lines one file is judged in: a Markdown page's rendered view (its raw lines where the view cannot map it), any other file's raw lines. */
function viewOf(path: string, text: string): { readonly lines: readonly string[]; readonly mapped: boolean } {
  if (!isMarkdown(path)) return { lines: text.split("\n"), mapped: true };
  try {
    return { lines: renderedLines(text), mapped: true };
  } catch {
    return { lines: text.split("\n"), mapped: false };
  }
}
function judge(files: ReadonlyArray<readonly [string, string]>): Judged {
  const judged: Judged = { named: [], negated: [], served: [], none: 0, unmapped: [] };
  for (const [path, text] of files) {
    const view = viewOf(path, text);
    if (!view.mapped) judged.unmapped.push(path);
    view.lines.forEach((line, index) => {
      const verdict = lineVerdict(line);
      if (verdict === "none") judged.none += 1;
      else judged[verdict].push(`${path}:${index + 1}`);
    });
  }
  return judged;
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The judged rows; their shape is pinned below and held to the roster and the bead export.
 * ------------------------------------------------------------------------------------------------------------------------- */

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  {
    id: "G",
    label: "gate: skill reachable via an install target in a Pi loader root or operator settingSources",
    pins: ["G1", "G2", "G3"],
  },
  {
    id: "N",
    label: "until then a census-style negative records that no Pi document presents the recipes as served",
    pins: ["N1", "N2", "N3"],
  },
  {
    id: "E",
    label: "a falsifier that goes red if a Pi doc embeds a recipe copy or shows an unquoted/interpolated REV/BASE/PATH",
    pins: ["E1", "E2"],
  },
  {
    id: "M",
    label: "the matchers rows G, N and E read catch every spelling family they name and leave the near misses clean",
    pins: ["M1", "M2", "M3", "M4", "M5", "M6", "M7"],
  },
  {
    id: "R",
    label: "the named residuals, each a pinned quiet row that reds when its escape stops being quiet",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13", "Q14", "Q15"],
  },
];
const RESIDUALS: Readonly<Record<string, string>> = {
  Q1: "R-PARAPHRASE",
  Q2: "R-SPLIT-COMMAND",
  Q3: "R-OUTSIDE-POPULATION",
  Q4: "R-ANY-MARKER",
  Q5: "R-OUTSIDE-VOCABULARY",
  Q6: "R-OPERATOR-CONFIG",
  Q7: "R-HEADLESS-BODY",
  Q8: "R-BOUND-LAUNCH",
  Q9: "R-HIDDEN-SOURCE",
  Q10: "R-EXAMPLE-SHAPE",
  Q11: "R-CONFUSABLE",
  Q12: "R-HTML-RENDERING",
  Q13: "R-OTHER-MARKUP",
  Q14: "R-SHELL-SPELLING",
  Q15: "R-JOINED-MENTION",
};

/* ---------------------------------------------------------------------------------------------------------------------------
 * The out-of-file anchors: the roster and the tracked bead export.
 * ------------------------------------------------------------------------------------------------------------------------- */

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function stringsOf(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return value;
}
function asJson(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface RosterRecipe {
  readonly id: string;
  readonly heading: string;
  readonly commands: readonly string[];
}
interface Roster {
  readonly installTargets: readonly string[];
  readonly loaderRoots: readonly string[];
  readonly recipes: readonly RosterRecipe[];
  readonly vocabulary: Readonly<Record<string, readonly string[]>>;
  readonly residuals: Readonly<Record<string, string>>;
  readonly rows: readonly RosterRow[];
  /** Every test this file registers, by title, in registration order (the record case reads the task tree against it). */
  readonly tests: readonly string[];
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function parseRoster(text: string): Roster {
  const raw: unknown = JSON.parse(text);
  if (!isObject(raw) || !isObject(raw.hxInstall) || !Array.isArray(raw.hxInstall.targets) || !Array.isArray(raw.recipes) || !isObject(raw.vocabulary)) {
    throw new Error("the roster must be an object with hxInstall.targets, recipes and vocabulary");
  }
  if (!Array.isArray(raw.rows) || !isObject(raw.residuals)) throw new Error("the roster must carry rows and residuals");
  const installTargets = raw.hxInstall.targets.map((target: unknown, index: number): string => {
    if (!isObject(target) || typeof target.agent !== "string" || typeof target.dir !== "string") throw new Error(`roster hxInstall.targets[${index}] needs an agent and a dir`);
    return target.dir;
  });
  const recipes = raw.recipes.map((recipe: unknown, index: number): RosterRecipe => {
    if (!isObject(recipe) || typeof recipe.id !== "string" || typeof recipe.heading !== "string") throw new Error(`roster recipes[${index}] needs an id and a heading`);
    return { id: recipe.id, heading: recipe.heading, commands: stringsOf(recipe.commands, `roster recipes[${index}].commands`) };
  });
  const vocabulary: Record<string, readonly string[]> = {};
  for (const [name, words] of Object.entries(raw.vocabulary)) vocabulary[name] = stringsOf(words, `roster vocabulary.${name}`);
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: asJson(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const residuals: Record<string, string> = {};
  for (const [pin, name] of Object.entries(raw.residuals)) {
    if (typeof name !== "string") throw new Error(`roster residual ${pin} must name a family`);
    residuals[pin] = name;
  }
  return { installTargets, loaderRoots: stringsOf(raw.loaderRoots, "roster loaderRoots"), recipes, vocabulary, residuals, rows, tests: stringsOf(raw.tests, "roster tests") };
}
let rosterCache: Roster | undefined;
/** Read on first use, so a missing or malformed roster reds every case that needs it rather than the file's collection. */
function roster(): Roster {
  rosterCache ??= parseRoster(readFileSync(ROSTER_PATH, "utf8"));
  return rosterCache;
}
function rosterWitness(pin: string): Json {
  const found = roster().rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** One row of the tracked bead export, by id. */
function exportRow(id: string): { [key: string]: unknown } {
  for (const line of readFileSync(EXPORT_PATH, "utf8").split("\n")) {
    if (!line.includes(`"id":"${id}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id) return row;
  }
  throw new Error(`the tracked bead export holds no ${id} row`);
}
function fieldOf(row: { [key: string]: unknown }, field: string): string {
  const value = row[field];
  if (typeof value !== "string") throw new Error(`the ${String(row.id)} export row carries no ${field}`);
  return value;
}
function matchOf(text: string, pattern: RegExp, what: string): RegExpExecArray {
  const match = pattern.exec(text);
  if (match === null) throw new Error(`no ${what}`);
  return match;
}
/** The wb-ts6.1 owner filing's three clauses rows G, N and E carry: the title's gate, the notes' until-then negative and falsifier. */
function exportClauses(): string[] {
  const row = exportRow(BEAD);
  const gate = matchOf(fieldOf(row, "title"), /\((gate: [^;)]+); wb-kqx\.5\)/, `${BEAD} title gate clause`)[1];
  const notes = fieldOf(row, "notes");
  const negative = matchOf(notes, /; (until then a census-style negative records that no Pi document presents the recipes as served)\./, `${BEAD} until-then clause`)[1];
  const falsifier = matchOf(notes, /, with (a falsifier that goes red if a Pi doc embeds a recipe copy or shows an unquoted\/interpolated REV\/BASE\/PATH); /, `${BEAD} falsifier clause`)[1];
  return [gate ?? "", negative ?? "", falsifier ?? ""];
}
/** The recipe ids the bead title names as a range ("When W1-W8 hyper-unix recipes"), expanded. */
function titleRecipeIds(): string[] {
  const range = matchOf(fieldOf(exportRow(BEAD), "title"), /When W(\d)-W(\d) hyper-unix recipes/, `${BEAD} title recipe range`);
  const from = Number(range[1]);
  const to = Number(range[2]);
  return Array.from({ length: to - from + 1 }, (_, index) => `W${from + index}`);
}
/** The wb-kqx.5 filing's two tables (closed bead, tracked export): Pi's five loader roots and hx's ten install targets. */
function gateFiling(): { piRoots: string[]; hxTargets: string[] } {
  const description = fieldOf(exportRow(GATE_BEAD), "description");
  const ticks = (text: string): string[] => [...text.matchAll(/`([^`]+)`/g)].map(match => match[1] ?? "");
  const piRoots = ticks(matchOf(description, /Pi resolves `skills:` from (.+?);/, `${GATE_BEAD} Pi root table`)[1] ?? "");
  const targets = matchOf(description, /`hx install-skill` targets `([^`]+)` and nine agent homes \(([^)]+)\)/, `${GATE_BEAD} hx target table`);
  return { piRoots, hxTargets: [targets[1] ?? "", ...ticks(targets[2] ?? "").map(home => `${home}/${SKILL}`)] };
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * Walks, AST readers and the hermetic HOME.
 * ------------------------------------------------------------------------------------------------------------------------- */

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
  return files.sort();
}
/** The same set by node's own recursive listing: the control that holds filesBelow to every regular file at every depth. */
function listedBelow(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true, recursive: true })
    .filter(entry => entry.isFile())
    .map(entry => join(entry.parentPath, entry.name))
    .sort();
}
const repoPath = (path: string): string => relative(REPO, path);
/** The documents at a checkout's root (a Markdown or other document extension, any case): the population's repo-root pages. */
const rootDocuments = (root: string = REPO): string[] =>
  readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isFile() && isDocument(entry.name))
    .map(entry => join(root, entry.name))
    .sort();
const docFiles = (): string[] => [...DOC_ROOTS.flatMap(root => filesBelow(join(REPO, root))), ...rootDocuments()].sort();
const docTexts = (): Array<readonly [string, string]> => docFiles().map(file => [repoPath(file), readFileSync(file, "utf8")] as const);
const srcModules = (): string[] => filesBelow(SRC).filter(file => file.endsWith(".ts"));
const outsidePopulation = (path: string): boolean => {
  const top = path.split("/")[0] ?? "";
  return OUT_OF_POPULATION.includes(top) || (top.startsWith(".") && path.includes("/") && !DOC_ROOTS.includes(top));
};
/** Every document of a checkout outside its out-of-population trees (any depth, any case of a document extension): the independent walk N1's population is held to. */
function documentsOutside(root: string, directory: string = root): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const found: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && !(directory === root && outsidePopulation(`${entry.name}/`))) found.push(...documentsOutside(root, path));
    else if (entry.isFile() && isDocument(entry.name)) found.push(path);
  }
  return found.sort();
}
/** The population's longest Markdown page, the page N1's far-line floor is planted past the end of. */
function longestPage(texts: ReadonlyArray<readonly [string, string]>): readonly [string, string] {
  const pages = texts.filter(([path]) => isMarkdown(path));
  const lines = (text: string): number => text.split("\n").length;
  const longest = pages.reduce<readonly [string, string] | undefined>((best, page) => (best === undefined || lines(page[1]) > lines(best[1]) ? page : best), undefined);
  if (longest === undefined) throw new Error("the population holds no Markdown page");
  return longest;
}

function parse(fileName: string, text: string): ts.SourceFile {
  return ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function calleeName(call: ts.CallExpression): string | undefined {
  const callee = call.expression;
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  return undefined;
}
/** The loader's root list (the `roots` array of src/skill-loader.ts), each join() call rendered: cwd <cwd>, getAgentDir() <agentDir>, homedir() ~. */
function loaderRootsOf(text: string): string[] {
  const roots: string[] = [];
  const segment = (node: ts.Expression): string => {
    if (ts.isIdentifier(node) && node.text === "cwd") return "<cwd>";
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "getAgentDir") return "<agentDir>";
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "homedir") return "~";
    if (ts.isStringLiteralLike(node)) return node.text;
    return "<?>";
  };
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "roots" && node.initializer !== undefined && ts.isArrayLiteralExpression(node.initializer)) {
      for (const element of node.initializer.elements) {
        roots.push(ts.isCallExpression(element) && calleeName(element) === "join" ? element.arguments.map(segment).join("/") : "<?>");
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(parse("skill-loader.ts", text));
  return roots;
}
/** The label README's discovery-roots table opens with, in the rendered view. */
const ROOTS_LABEL = "Discovery roots";
/**
 * README "Skill Preloading" discovery-roots table in the rendered view (U2: the uniqueness check and the extraction read the
 * same view, hidden stretches hidden, and the content the page hides by an attribute hidden as well: attributeStretches,
 * wb-t1jc F1): the view lines that open with the label, counted (a commented copy, or one inside a hidden element or an
 * element an attribute hides, shows nothing; a label shown twice is counted twice; a label in a closed details element's
 * summary shows), and the first table after the first of them that shows text (a table inside a template element, a
 * details element without its open attribute, a dialog without it or an element carrying the hidden attribute shows
 * none), one root per row from its Path cell in the view (a row's stated default wins over its variable form).
 */
function readmeRootsOf(text: string): { readonly labels: number; readonly roots: string[] } {
  const { shown, tokens } = paintPage(text);
  hideStretches(shown, attributeStretches(TAGS_MET.get(shown) ?? [], text.length - 1));
  const starts = lineStartsOf(text);
  const lineEnd = (index: number): number => (index + 1 < starts.length ? (starts[index + 1] ?? text.length) - 1 : text.length);
  const labelLines = starts.flatMap((start, index) => (folded(shownBetween(shown, start, lineEnd(index))).startsWith(ROOTS_LABEL) ? [index] : []));
  const first = labelLines[0];
  if (first === undefined) throw new Error(`README shows no ${ROOTS_LABEL} label`);
  let offset = 0;
  let table: { readonly at: number; readonly token: Tokens.Table } | undefined;
  for (const token of tokens) {
    if (table === undefined && offset > (starts[first] ?? 0) && isTable(token) && /\S/.test(shownBetween(shown, offset, offset + token.raw.length))) table = { at: offset, token };
    offset += token.raw.length;
  }
  if (table === undefined) throw new Error(`README shows no table after its ${ROOTS_LABEL} label`);
  const header = text.slice(0, table.at).split("\n").length - 1;
  const roots = table.token.rows.map((_, row) => {
    const line = header + 2 + row;
    const lineAt = starts[line] ?? 0;
    const cell = rowCells(text.slice(lineAt, lineEnd(line))).cells[1];
    const path = cell === undefined ? "" : folded(shownBetween(shown, lineAt + cell.start, lineAt + cell.start + cell.text.length));
    const stated = /\(default (\S+)\)/.exec(path)?.[1] ?? path.split(" ")[0] ?? "";
    return stated === "" ? "<?>" : stated.replace(/\/$/, "");
  });
  return { labels: labelLines.length, roots };
}
const LAUNCH_NAMES = ["exec", "execFile", "execFileSync", "execSync", "fork", "spawn", "spawnSync"];
/** One module's process launches whose command is a string literal, as file:callee:command. */
function launchSites(fileName: string, text: string): string[] {
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const name = calleeName(node);
      const first = node.arguments[0];
      if (name !== undefined && LAUNCH_NAMES.includes(name) && first !== undefined && ts.isStringLiteralLike(first)) sites.push(`${fileName}:${name}:${first.text}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(parse(fileName, text));
  return sites;
}
const launchesHx = (site: string): boolean => /(?:^|\/)hx$/.test(site.split(":").slice(2).join(":"));
/** Every string and template literal line of one module the line reader reads as a recipe mention or an hx command, as file:line. */
function literalHits(fileName: string, text: string): string[] {
  const hits: string[] = [];
  const source = parse(fileName, text);
  const visit = (node: ts.Node): void => {
    const texts = ts.isStringLiteralLike(node) ? [node.text] : ts.isTemplateExpression(node) ? [node.head.text, ...node.templateSpans.map(span => span.literal.text)] : [];
    if (texts.some(literal => literal.split("\n").some(line => lineVerdict(line) !== "none"))) hits.push(`${fileName}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return hits;
}
/** Every settingSources property a module hands on, by its value: [], ?? [] (a default), <name>=<class> (a local binding), or value. */
function settingSourcesSites(fileName: string, text: string): string[] {
  const source = parse(fileName, text);
  const bindings = new Map<string, ts.Expression>();
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) bindings.set(node.name.text, node.initializer);
    ts.forEachChild(node, collect);
  };
  collect(source);
  const classOf = (value: ts.Expression, depth = 0): string => {
    if (ts.isArrayLiteralExpression(value) && value.elements.length === 0) return "[]";
    if (ts.isBinaryExpression(value) && value.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken && ts.isArrayLiteralExpression(value.right) && value.right.elements.length === 0) {
      return "?? []";
    }
    const bound = ts.isIdentifier(value) ? bindings.get(value.text) : undefined;
    if (ts.isIdentifier(value) && bound !== undefined && depth === 0) return `${value.text}=${classOf(bound, 1)}`;
    return "value";
  };
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) && node.name.text === "settingSources") sites.push(`${fileName}:${classOf(node.initializer)}`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}
/** The install targets lying inside any of the loader roots (a target is inside when it is the root or below it). */
const targetsInside = (targets: readonly string[], roots: readonly string[]): string[] =>
  targets.filter(target => roots.some(root => target === root || target.startsWith(`${root}/`)));
interface Example {
  readonly file: string;
  readonly sources: string[];
}
/** The sources of every settingSources array literal one text holds. */
const examplesIn = (text: string): string[][] =>
  [...text.matchAll(/settingSources["'`]?\s*[:=]\s*\[([^\]]*)\]/g)].map(match => [...(match[1] ?? "").matchAll(/[A-Za-z]+/g)].map(word => word[0]));
/**
 * Every settingSources example a document shows as an array literal, with the sources it names (F6): read in the
 * document's view (a Markdown page as it renders, so emphasis and references inside an example render) and in its raw
 * source (so a hidden example is read too), each distinct example of a file once.
 */
const docExamples = (files: ReadonlyArray<readonly [string, string]>): Example[] =>
  files.flatMap(([path, text]) => {
    const seen = new Set<string>();
    return [...examplesIn(viewOf(path, text).lines.join("\n")), ...examplesIn(text)]
      .filter(sources => {
        const key = JSON.stringify(sources);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map(sources => ({ file: path, sources }));
  });
const userExamplesOf = (examples: readonly Example[]): string[] => examples.filter(example => example.sources.includes("user")).map(example => example.file);
const declares = (skills: unknown): boolean => Array.isArray(skills) && skills.includes(SKILL);
/** The descriptors whose JSON the line reader flags (a recipe mention or an hx command anywhere in the descriptor). */
const flaggedOf = (descriptors: ReadonlyArray<{ readonly id: string }>): string[] =>
  descriptors.filter(descriptor => lineVerdict(JSON.stringify(descriptor)) !== "none").map(descriptor => descriptor.id);
/** The skills a Markdown agent definition's frontmatter declares (null when it declares none). */
function frontmatterSkills(text: string): string[] | null {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---", 4);
  const header = end < 0 ? "" : text.slice(4, end);
  const line = header.split("\n").find(entry => entry.startsWith("skills:"));
  return line === undefined ? null : line.slice("skills:".length).split(",").map(name => name.trim()).filter(name => name.length > 0);
}

/** Runs one case with HOME and the Pi agent dir inside fresh scratch, so no host skill, setting or install is read. */
function withHome<T>(work: (home: string, cwd: string) => T): T {
  const home = makeScratch("hx-recipe-home-");
  const cwd = makeScratch("hx-recipe-cwd-");
  const saved = { home: process.env.HOME, agentDir: process.env[AGENT_DIR_ENV] };
  process.env.HOME = home;
  delete process.env[AGENT_DIR_ENV];
  const restore = (): void => {
    if (saved.home === undefined) delete process.env.HOME;
    else process.env.HOME = saved.home;
    if (saved.agentDir === undefined) delete process.env[AGENT_DIR_ENV];
    else process.env[AGENT_DIR_ENV] = saved.agentDir;
    removeScratch(home, cwd);
  };
  try {
    const result = work(home, cwd);
    if (result instanceof Promise) {
      return result.finally(restore) as T;
    }
    restore();
    return result;
  } catch (error) {
    restore();
    throw error;
  }
}
/** Runs one reading over a scratch checkout holding the given files (each holding the same text), then removes it. */
function onScratchCheckout<T>(paths: readonly string[], content: string, work: (root: string) => T): T {
  const root = makeScratch("hx-recipe-walk-");
  try {
    for (const path of paths) {
      mkdirSync(dirname(join(root, path)), { recursive: true });
      writeFileSync(join(root, path), content);
    }
    return work(root);
  } finally {
    removeScratch(root);
  }
}
const STAND_IN = `---\nname: ${SKILL}\ndescription: census stand-in\n---\n# stand-in\n`;
function plantSkill(directory: string): void {
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "SKILL.md"), STAND_IN);
}
const onDisk = (root: string, home: string, cwd: string): string => root.replace("<cwd>", cwd).replace(/^~/, home);

/** A Claude host whose injected SDK query records the options it is handed and answers one init and one result. */
async function claudeOptions(cwd: string, settingSources?: Options["settingSources"]): Promise<Options | undefined> {
  let captured: Options | undefined;
  const host = createClaudeWorkflowHost({
    cwd,
    ...(settingSources === undefined ? {} : { settingSources }),
    query: ({ options }) => {
      captured = options;
      return (async function* () {
        yield { type: "system", subtype: "init", session_id: "census", model: "census-model", tools: [] } as unknown as SDKMessage;
        yield { type: "result", subtype: "success", session_id: "census", result: "done", is_error: false, modelUsage: {} } as unknown as SDKMessage;
      })();
    },
  });
  await host.spawnAgent({ agentId: "census", index: 0, label: "census", prompt: "census", agentType: "general-purpose" });
  return captured;
}

const neverInvoked = (what: string) => (): never => {
  throw new Error(`census ${what}: never invoked`);
};
/** Every hyperunix.* descriptor Pi registers (the native providers and the injected reader), and any descriptor the line reader flags. */
async function hxSurface(): Promise<{ typed: string[]; flagged: string[] }> {
  const native = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  native.registerNativeProviders(registry, REPO);
  const injected = new CapabilityRegistry();
  registerHyperUnixFind(injected, { find: neverInvoked("hyperunix find"), runtime: neverInvoked("hyperunix runtime"), close: async () => {} }, REPO);
  const all: CapabilityDescriptor[] = [...registry.catalogSnapshot(), ...injected.catalogSnapshot()].map(entry => entry.descriptor);
  return {
    typed: all
      .filter(descriptor => descriptor.id.startsWith("hyperunix."))
      .map(descriptor => `${descriptor.id}:${descriptor.effectClass}:${(descriptor.contractSource ?? "").replace(/@\d[^:@]*:/, "@<version>:")}`),
    flagged: flaggedOf(all),
  };
}

/** The page a planted line lands on: the HX provider page, the likeliest home of a serving example. */
const PLANT_PAGE = "docs/workbench/07-native-integrations.md";
/** One line appended to a copy of PLANT_PAGE: its verdict, or every unexpected change the plant made to the page's reading. */
function plantedVerdict(line: string): string {
  const text = readFileSync(join(REPO, PLANT_PAGE), "utf8");
  const body = text.endsWith("\n") ? text : `${text}\n`;
  const at = `${PLANT_PAGE}:${body.split("\n").length}`;
  const before = judge([[PLANT_PAGE, body]]);
  const after = judge([[PLANT_PAGE, `${body}${line}\n`]]);
  const kinds = ["named", "negated", "served"] as const;
  const changed = kinds.flatMap(kind => after[kind].filter(entry => !before[kind].includes(entry)).map(entry => `${kind}@${entry}`));
  if (changed.length === 1 && changed[0] === `${changed[0]?.split("@")[0]}@${at}`) return changed[0]?.split("@")[0] ?? "";
  return `unexpected:${changed.join(",")}|before:${kinds.map(kind => before[kind].length).join("/")}`;
}

/**
 * A block appended to a copy of one page: every judged line it adds, as kind@+n (n the block's own line, so the reading
 * never moves with the page's length); a block the reader leaves quiet adds none.
 */
function plantChangesOn(page: string, text: string, block: string): string[] {
  const body = text.endsWith("\n") ? text : `${text}\n`;
  const offset = body.split("\n").length - 1;
  const before = judge([[page, body]]);
  const after = judge([[page, `${body}${block}\n`]]);
  const kinds = ["named", "negated", "served"] as const;
  return kinds.flatMap(kind => after[kind].filter(entry => !before[kind].includes(entry)).map(entry => `${kind}@+${Number(entry.slice(page.length + 1)) - offset}`));
}
/** A block appended to a copy of PLANT_PAGE (plantChangesOn). */
const plantChanges = (block: string): string[] => plantChangesOn(PLANT_PAGE, readFileSync(join(REPO, PLANT_PAGE), "utf8"), block);
const digestOf = (text: string): string => createHash("sha256").update(text).digest("hex").slice(0, 16);
const sub = (name: string): string => ["$", "{", name, "}"].join("");

/* ---------------------------------------------------------------------------------------------------------------------------
 * The planted cases rows E, M and R read (witnesses carry digests, never the text).
 * ------------------------------------------------------------------------------------------------------------------------- */

/** Row E2: the producer's command lines with REV/BASE/PATH-class inputs unquoted, braced, substituted or interpolated. */
const UNQUOTED_CASES: readonly string[] = [
  "hx --workspace $ROOT git merge-base $TRUNK $BRANCH",
  `hx --workspace "$ROOT" git history --first-parent --since-rev ${sub("BASE")}..${sub("TRUNK")} ${sub("PATH")}`,
  'hx --workspace "$ROOT" git diff "$(git rev-parse HEAD)" "$BRANCH"',
  `const argv = \`hx --workspace ${sub("root")} show git:${sub("rev")}:${sub("path")}\`;`,
  "never run hx --workspace $ROOT git diff $TRUNK $BRANCH with the inputs unquoted",
  "hx show git:REV:PATH",
];
const LINE_CASES: ReadonlyArray<readonly [string, LineVerdict]> = [
  ["## W1 — branch-landing-audit (P0)", "named"],
  ["the absence-certificate recipe is served to every Pi agent", "served"],
  ["Pi never serves the worktree-lane-census recipe", "negated"],
  ["see docs/programs/feedback-query-skill-factory-2026-10-16/06-workflow-recipes.md", "named"],
  ["Outcomes: `KNOWN_PRESENT`, `KNOWN_ABSENT_IN_SCOPE` and `UNTOUCHED_IN_RANGE`", "named"],
  ["skills: hyper-unix", "named"],
  ["the hyper-unix skill is available to every hosted agent", "served"],
  ["load the HyperUnix skill before the review", "served"],
  ["HX recipe W5 is reachable from the reviewer role", "served"],
  ["a hosted agent declaring the skill gets the not-found placeholder after hx-install-skill", "negated"],
  ["## Recipes", "none"],
  ["W5 of the Pi workbench program", "none"],
  ["W10 stamped claim guard", "none"],
  ["`hyperunix.find` uses the typed HX SDK with native coverage", "none"],
  ["contractSource @hyperunix/sdk@0.1.0:HyperUnix.find", "none"],
  ["absence is licensed only by complete coverage", "none"],
  ["source orientation reads members first", "none"],
  ["Read-only HX query", "none"],
];
const COMMAND_CASES: ReadonlyArray<readonly [string, boolean]> = [
  ["`hx --workspace . find --kind hx.fs/regular-file src`", true],
  ["~/.local/bin/hx git diff a b", true],
  ["hx help members", true],
  ["run `hx members FILE` first", true],
  ["| hx query show | the saved definition |", true],
  ["Read-only HX query", false],
  ["the hx binary", false],
  ["the hx live-tier census", false],
  ["test/workbench-hx-live-tier-census.test.ts", false],
  ["new-feedback/2026-10-17-hx-install-skill-writes-ten-targets", false],
  ["the build identity an installed hx prints", false],
  ["hx.fs/regular-file", false],
  ["phx git push", false],
  ['Run "hx" git diff $TRUNK $BRANCH', true],
  ["Run 'hx' git diff $TRUNK $BRANCH", true],
  ['"hx" --workspace . git diff "$TRUNK" "$BRANCH"', true],
  ['"/home/user/.local/bin/hx" git diff a b', true],
  ["$'hx' git diff a b", true],
  ['the "hx" binary', false],
  ["the 'hx' live tier", false],
  ["x'hx' git diff a b", false],
  ["\"hx' git diff a b", false],
];
/** [module text, launches with a literal command, of them hx]. */
const LAUNCH_CASES: ReadonlyArray<readonly [string, number, number]> = [
  ['import { spawn } from "node:child_process";\nspawn("hx", ["git", "diff", "a", "b"]);', 1, 1],
  ['import { execFileSync } from "node:child_process";\nexecFileSync("/home/user/.local/bin/hx", ["show", "x"]);', 1, 1],
  ['import { execFileSync } from "node:child_process";\nexecFileSync("git", ["status"]);', 1, 0],
  ['await pi.exec("hx", ["--version"]);', 1, 1],
];
/** [module text, literal hits]. */
const LITERAL_CASES: ReadonlyArray<readonly [string, number]> = [
  ['const help = "run hx --workspace . git diff a b";', 1],
  ["const note = `the hyper-unix skill is available`;", 1],
  ['const id = "hyperunix.find";', 0],
  ["// the hyper-unix skill is available\nconst id = 1;", 0],
];
/** [module text, settingSources sites]. */
const SITE_CASES: ReadonlyArray<readonly [string, readonly string[]]> = [
  ["const o = { settingSources: config.settingSources ?? [] };", ["case.ts:?? []"]],
  ['const o = { settingSources: ["user"] };', ["case.ts:value"]],
  ["const s = c.settingSources ?? [];\nconst o = { settingSources: s };", ["case.ts:s=?? []"]],
  ["const o = { settingSources: [] };", ["case.ts:[]"]],
];

/** Invisible characters, built from code points (never written raw). */
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
const WORD_JOINER = String.fromCodePoint(0x2060);
/** Default-ignorable but not a format character (a combining grapheme joiner), and a non-white-space control (BEL). */
const GRAPHEME_JOINER = String.fromCodePoint(0x034f);
const BELL = String.fromCodePoint(0x0007);
/** The gate's control T10 and the visible text every T-form below must render to. */
const T10 = "Run hx git diff $TRUNK $BRANCH to compare the branch with trunk.";
const SKILL_SENTENCE = "Agents can load the hyper-unix skill before a review.";
const SLUG_SENTENCE = "The worktree-lane-census recipe is served to every Pi agent.";
/** Row M4: [gate form id, planted line, the single line the page shows]: each renders to T10 or the served sentence. */
const VIEW_TEXT_CASES: ReadonlyArray<readonly [string, string, string]> = [
  ["T10", T10, T10],
  ["T4", "Run **hx** git diff $TRUNK $BRANCH to compare the branch with trunk.", T10],
  ["T5", "Run <code>hx</code> git diff $TRUNK $BRANCH to compare the branch with trunk.", T10],
  ["T6", "Run hx&#32;git diff $TRUNK $BRANCH to compare the branch with trunk.", T10],
  ["T7", "Run h<!-- -->x git diff $TRUNK $BRANCH to compare the branch with trunk.", T10],
  ["T8", "Run `hx` `git diff $TRUNK $BRANCH` to compare the branch with trunk.", T10],
  ["T21", "Run [hx](https://example.invalid/hx) git diff $TRUNK $BRANCH to compare the branch with trunk.", T10],
  ["T9", "Agents can load the *hyper*-unix skill before a review.", SKILL_SENTENCE],
  ["T16", "The **worktree**-lane-census recipe is served to every Pi agent.", SLUG_SENTENCE],
  ["T15", `Run h${ZERO_WIDTH_SPACE}x git diff $TRUNK $BRANCH to compare the branch with trunk.`, T10],
];
/** Row M4: [block planted on PLANT_PAGE, the judged lines it must add]. */
const VIEW_CASES: ReadonlyArray<readonly [string, readonly string[]]> = [
  ...VIEW_TEXT_CASES.map(([, line]) => [line, ["served@+1"]] as const),
  ["Run h&shy;x git diff $TRUNK $BRANCH", ["served@+1"]],
  [`Run h${WORD_JOINER}x git diff $TRUNK $BRANCH`, ["served@+1"]],
  [`Run h${GRAPHEME_JOINER}x git diff $TRUNK $BRANCH`, ["served@+1"]],
  [`Run h${BELL}x git diff $TRUNK $BRANCH`, ["served@+1"]],
  ["Run hx&nbsp;git diff $TRUNK $BRANCH", ["served@+1"]],
  ["Run &#x68;&#120; git diff $TRUNK $BRANCH", ["served@+1"]],
  ["Outcomes: KNOWN&lowbar;PRESENT and UNTOUCHED&#95;IN&#95;RANGE", ["named@+1"]],
  ["## Run **hx** git diff $TRUNK $BRANCH", ["served@+1"]],
  ["> Run `hx` git diff $TRUNK $BRANCH", ["served@+1"]],
  ["- Agents can load the *hyper*-unix skill.", ["served@+1"]],
  ["| step |\n| --- |\n| Run <code>hx</code> git diff $TRUNK $BRANCH |", ["served@+3"]],
  ["```sh\nhx --workspace . git diff a b\n```", ["served@+2"]],
  ["\n    hx --workspace . git diff a b", ["served@+2"]],
  ["| the hyper- | unix skill |\n| --- | --- |", []],
];
/** Row M4's controls: a page whose line ends marked rewrites (CR LF), so its tokens cannot be mapped and it is read raw. */
const UNMAPPED_PAGE = "Intro.\r\nRun hx git diff $TRUNK $BRANCH\r\n";
/** Row Q2: blocks whose hx command is broken across source lines; the control shows it on one. */
const SPLIT_CASES: readonly string[] = [
  '```sh\nhx \\\n  --workspace "$ROOT" git diff "$LEFT" "$RIGHT"\n```',
  "Run hx\ngit diff $TRUNK $BRANCH",
  "Run **hx\ngit diff** $TRUNK $BRANCH",
  "Run h<!--\n-->x git diff $TRUNK $BRANCH",
];
/** Row Q9: blocks whose command the page hides; the control shows it as an element's text. */
const HIDDEN_CASES: readonly string[] = [
  "<!-- hx git diff $TRUNK $BRANCH -->",
  "<!--\nhx git diff $TRUNK $BRANCH\n-->",
  "```hx git diff $TRUNK $BRANCH\necho census\n```",
  "![hx git diff $TRUNK $BRANCH](census.png)",
  '[census](https://example.invalid/hx "hx git diff $TRUNK $BRANCH")',
  '<span title="hx git diff $TRUNK $BRANCH">census</span>',
  '\n[census]: https://example.invalid/hx "hx git diff $TRUNK $BRANCH"',
  "Agents read <script>hx git diff $TRUNK $BRANCH</script> nothing here.",
  "<template>\nRun hx git diff $TRUNK $BRANCH\n</template>",
];
const HIDDEN_CONTROL = "<span>hx git diff $TRUNK $BRANCH</span>";
/** Row Q10: the gate's G3-B (a binding through a name) and G3-Y (a YAML block list); its control G3-J (a multi-line JSON array). */
const EXAMPLE_SHAPES: readonly string[] = [
  '```ts\nconst sources = ["user"];\ncreateClaudeWorkflowHost({ cwd, settingSources: sources });\n```',
  "```yaml\nworkbench:\n  settingSources:\n    - user\n```",
];
const EXAMPLE_CONTROL = '```json\n{ "workbench": { "settingSources": [\n  "user"\n] } }\n```';
/** Row Q11: hx in look-alike and compatibility spellings (fullwidth, Cyrillic ha, double-struck, a combining acute inside). */
const CONFUSABLE_CASES: readonly string[] = [
  `Run ${String.fromCodePoint(0xff48, 0xff58)} git diff $TRUNK $BRANCH`,
  `Run h${String.fromCodePoint(0x0445)} git diff $TRUNK $BRANCH`,
  `Run ${String.fromCodePoint(0x1d559, 0x1d569)} git diff $TRUNK $BRANCH`,
  `Run h${String.fromCodePoint(0x0301)}x git diff $TRUNK $BRANCH`,
];
/** Row M5: [id (the gate's survivor ids where they apply), block planted on PLANT_PAGE, the judged lines it must add]: a separator keeps the words either side apart. */
const SEPARATOR_CASES: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["BR-NAME", "Agents can load hyper-unix<br>before a review.", ["served@+1"]],
  ["BR-NAME-SELF", "Agents can load hyper-unix<br/>before a review.", ["served@+1"]],
  ["BR-NAME-UPPER", "Agents can load hyper-unix<BR>before a review.", ["served@+1"]],
  ["BR-SPACED-SELF", "Agents can load hyper-unix<br />before a review.", ["served@+1"]],
  ["BR-ATTRIBUTE", 'Agents can load hyper-unix<Br clear="all">before a review.', ["served@+1"]],
  ["BR-END", "Agents can load hyper-unix</br>before a review.", ["served@+1"]],
  ["BR-SKILL", "Agents can load the hyper-unix<br>skill before a review.", ["served@+1"]],
  ["BR-SLUG", "The worktree-lane-census<br>recipe is served to every Pi agent.", ["served@+1"]],
  ["BR-CLASS", "Outcome: KNOWN_PRESENT<br>for the queried path.", ["named@+1"]],
  ["BR-PAGE", "See 06-workflow-recipes<br>for the served steps.", ["served@+1"]],
  ["BR-RECIPE-NUMBER", "The HX recipe W3<br>is served to every Pi agent.", ["served@+1"]],
  ["V-BR", "Run hx<br>git diff $TRUNK $BRANCH to compare the branch with trunk.", ["served@+1"]],
  ["DIV-INLINE-NAME", "Agents can load hyper-unix<div>before a review.</div>", ["served@+1"]],
  ["P-INLINE", "Agents can load hyper-unix<p>before a review.</p>", ["served@+1"]],
  ["P-END", "Agents can load hyper-unix</p>before a review.", ["served@+1"]],
  ["HR-INLINE", "Agents can load hyper-unix<hr>before a review.", ["served@+1"]],
  ["LI-INLINE", "Agents can load hyper-unix<li>before a review.</li>", ["served@+1"]],
  ["HEADING-INLINE", "Agents can load hyper-unix<H3>before a review.</H3>", ["served@+1"]],
  ["SECTION-INLINE", "Agents can load hyper-unix<section>before a review.</section>", ["served@+1"]],
  ["CELL-BLOCK", "<table><tr><td>Agents can load hyper-unix</td><td>before a review.</td></tr></table>", ["served@+1"]],
  ["DIV-BLOCK-COMMAND", "<div>Run hx</div><div>git diff $TRUNK $BRANCH</div>", ["served@+1"]],
  ["IMG-INLINE", 'Agents can load hyper-unix<img src="census.png" alt="">before a review.', ["served@+1"]],
  ["INPUT-INLINE", "Agents can load hyper-unix<input>before a review.", ["served@+1"]],
  ["IMAGE-MARKDOWN", "Agents can load hyper-unix![](census.png)before a review.", ["served@+1"]],
  ["S-IMAGE-ALIAS", 'Agents can load hyper-unix<image src="census.png">before a review.', ["served@+1"]],
  ["S-IMAGE-UPPER", "Agents can load hyper-unix<IMAGE>before a review.", ["served@+1"]],
  ["S-RUBY-RT", "Agents can load <ruby>hyper-unix<rt>x</rt></ruby> before a review.", ["served@+1"]],
  ["S-RUBY-RTC", "Agents can load <ruby>hyper-unix<rtc>x</rtc></ruby> before a review.", ["served@+1"]],
  ["S-RUBY-RP", "Agents can load <ruby>hyper-unix<rp>(</rp><rt>x</rt><rp>)</rp></ruby> before a review.", ["served@+1"]],
];
/** Row M5's fusing controls: [block, the judged lines it adds]: an inline element and a void separator's end tag render nothing, so the word they split reads whole. */
const FUSING_CASES: ReadonlyArray<readonly [string, readonly string[]]> = [
  ["Agents can load hyper<span></span>-unix before a review.", ["served@+1"]],
  ["Agents can load hyper<b></b>-unix before a review.", ["served@+1"]],
  ["Agents can load hyper</img>-unix before a review.", ["served@+1"]],
  ["Agents can load hyper</hr>-unix before a review.", ["served@+1"]],
];
/** Row M5's hold controls: [page, its view with the separator painted as nothing]: the fused view of a page that shows the words apart does not hold. */
const FUSED_VIEWS: ReadonlyArray<readonly [string, string]> = [
  ["Agents can load hyper-unix<br>before a review.\n", "Agents can load hyper-unixbefore a review."],
  ["Agents can load hyper-unix<div>before a review.</div>\n", "Agents can load hyper-unixbefore a review."],
  ["<table><tr><td>Agents can load hyper-unix</td><td>before a review.</td></tr></table>\n", "Agents can load hyper-unixbefore a review."],
  ["Agents can load hyper-unix![](census.png)before a review.\n", "Agents can load hyper-unixbefore a review."],
  ['Agents can load hyper-unix<image src="census.png">before a review.\n', "Agents can load hyper-unixbefore a review."],
  ["Agents can load <ruby>hyper-unix<rt>x</rt></ruby> before a review.\n", "Agents can load hyper-unixx before a review."],
];
/**
 * Row M7: [id (the gate's survivor ids where they apply), block planted on PLANT_PAGE, the judged lines it must add]: the
 * content of a HIDDEN_ELEMENTS element, from its start tag through its own end tag (or to the page's end), is not read, so
 * the words either side join; a page's text after the end tag is read.
 */
const HIDDEN_CONTENT_CASES: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["H-SCRIPT-NAME", "Agents can load hyper<script>x</script>-unix before a review.", ["served@+1"]],
  ["H-STYLE-SLUG", "The worktree-lane<style>x</style>-census recipe is served to every Pi agent.", ["served@+1"]],
  ["H-TEMPLATE-CMD", "Run h<template>-</template>x git diff $TRUNK $BRANCH to compare the branch with trunk.", ["served@+1"]],
  ["H-TITLE-CLASS", "Outcome: KNOWN<title>x</title>_PRESENT for the queried path.", ["named@+1"]],
  ["H-DATALIST-PAGE", "See 06-workflow<datalist>x</datalist>-recipes for the served steps.", ["served@+1"]],
  ["H-NOEMBED-NUMBER", "The HX recipe W<noembed>x</noembed>3 is served to every Pi agent.", ["served@+1"]],
  ["H-RP-NAME", "Agents can load hyper<rp>x</rp>-unix before a review.", ["served@+1"]],
  ["H-NOFRAMES-CMD", "Run h<noframes>-</noframes>x git diff $TRUNK $BRANCH", ["served@+1"]],
  ["H-IFRAME-NAME", "Agents can load hyper-unix<iframe>x</iframe>before a review.", ["served@+1"]],
  ["H-SCRIPT-UPPER", "Agents can load hyper<SCRIPT>x</SCRIPT>-unix before a review.", ["served@+1"]],
  ["H-SCRIPT-ATTRIBUTE", 'Agents can load hyper<script type="text/plain">x</script>-unix before a review.', ["served@+1"]],
  ["H-SCRIPT-RAW-TAGS", "Agents can load hyper<script>a<b>c</b></script>-unix before a review.", ["served@+1"]],
  ["H-SCRIPT-NESTED-TEXT", "Agents can load hyper<script>a<script>b</script>-unix before a review.", ["served@+1"]],
  ["H-TEMPLATE-NESTED", "Run h<template>a<template>b</template>c</template>x git diff $TRUNK $BRANCH", ["served@+1"]],
  ["H-CELL-SCRIPT", "| step |\n| --- |\n| Agents can load hyper<script>x</script>-unix before a review. |", ["served@+3"]],
  ["H-ITEM-STYLE", "- The worktree-lane<style>x</style>-census recipe is served to every Pi agent.", ["served@+1"]],
  ["H-QUOTE-TEMPLATE", "> Run h<template>-</template>x git diff $TRUNK $BRANCH", ["served@+1"]],
  ["H-HEADING-TITLE", "## Outcome: KNOWN<title>x</title>_PRESENT", ["named@+1"]],
  ["H-BLOCK-THEN-SHOWN", "<script>\nx\n</script>\n\nRun hx git diff $TRUNK $BRANCH", ["served@+5"]],
  ["H-UNCLOSED-SCRIPT", "Agents read <script>hx git diff $TRUNK $BRANCH", []],
];
/** Row M7's hold controls: [page, its view with the hidden content read as text]: that view of a page that hides the content does not hold. */
const HIDDEN_SHOWN_VIEWS: ReadonlyArray<readonly [string, string]> = [
  ["Agents can load hyper<script>x</script>-unix before a review.\n", "Agents can load hyperx-unix before a review."],
  ["Run h<template>-</template>x git diff $TRUNK $BRANCH\n", "Run h-x git diff $TRUNK $BRANCH"],
];
/** Row M6: the page each Markdown extension spelling is judged on, the T4 form on its third line. */
const NAMED_PAGE = "# Guide\n\nRun **hx** git diff $TRUNK $BRANCH to compare the branch with trunk.\n";
/** Row M6: mixed-case spellings beside each extension's lower and upper case. */
const MIXED_SPELLINGS = ["Md", "Markdown"];
/** Row Q12: blocks whose rendering the element's name does not decide (the parser's context, scripting, an attribute, styling or a default style's generated content): each reads none. */
const RENDERING_CASES: readonly string[] = [
  "Agents can load hyper</div>-unix before a review.",
  "Agents can load hyper<td>-unix before a review.",
  'Agents can load hyper<input type="hidden">-unix before a review.',
  'Agents can load hyper-unix<span style="display:block">before a review.</span>',
  "Agents can load hyper-unix<q>before a review.</q>",
  'Run <input value="hx git diff $TRUNK $BRANCH"> to compare the branch with trunk.',
  "Agents can load hyper<span hidden>x</span>-unix before a review.",
  'Agents can load hyper<span style="display:none">x</span>-unix before a review.',
  "Agents can load hyper-unix<audio controls></audio>before a review.",
  "See <datalist>x\n\nRun hx git diff $TRUNK $BRANCH to compare the branch with trunk.",
  "<xmp>W3 <recipe></xmp>",
  "Agents can load hyper<dialog></dialog>-unix before a review.",
  "Agents can load hyper<noscript>x</noscript>-unix before a review.",
  "Agents can load hyper<audio>x</audio>-unix before a review.",
  "See <datalist>x\n\nAgents can load hyper-unix before a review.\n\ny</datalist> done.",
  "See <rp>x\n\nAgents can load hyper-unix before a review.\n\ny</rp> done.",
  "Agents can load hyper<template>a<script>b</template>c</script>d</template>-unix before a review.",
  '<div><template shadowrootmode="open">Agents can load hyper-unix before a review.</template></div>',
];
const RENDERING_CONTROL = "Agents can load hyper-unix before a review.";
/**
 * Row Q12's paired controls (wb-t1jc F2-F4): the last four members with the construct that hides their sentence taken
 * out (the datalist and the rp, the script inside the template, the template inside the div) each read served.
 */
const RENDERING_PAIRED_CONTROLS: readonly string[] = [
  "See x\n\nAgents can load hyper-unix before a review.\n\ny done.",
  "Agents can load hyper<template>a</template>-unix before a review.",
  "<div>Agents can load hyper-unix before a review.</div>",
];
/** Row Q13: [page, text] read raw by its name: another markup's syntax, and Markdown named .txt or with no extension. */
const OTHER_MARKUP_CASES: ReadonlyArray<readonly [string, string]> = [
  ["docs/guide.rst", "Run **hx** git diff $TRUNK $BRANCH to compare the branch with trunk.\n"],
  ["docs/guide.adoc", "Run *hx* git diff $TRUNK $BRANCH to compare the branch with trunk.\n"],
  ["docs/guide.html", "<p>Run <b>hx</b> git diff $TRUNK $BRANCH</p>\n"],
  ["docs/guide.txt", "Run **hx** git diff $TRUNK $BRANCH to compare the branch with trunk.\n"],
  ["docs/GUIDE", "Run **hx** git diff $TRUNK $BRANCH to compare the branch with trunk.\n"],
];
const OTHER_MARKUP_CONTROL: readonly [string, string] = ["docs/guide.rst", "Run hx git diff $TRUNK $BRANCH to compare the branch with trunk.\n"];
/** Row Q14: hx the shell assembles from pieces (a quote inside the name, an escaped letter); its control quotes the whole binary. */
const SHELL_SPELLING_CASES: readonly string[] = [
  'Run h"x" git diff $TRUNK $BRANCH',
  "Run 'h'x git diff $TRUNK $BRANCH",
  "Run h''x git diff $TRUNK $BRANCH",
  "Run h\\x git diff $TRUNK $BRANCH",
];
const SHELL_SPELLING_CONTROL = 'Run "hx" git diff $TRUNK $BRANCH';
/** Row Q15: blocks whose mention a hidden construct joins across a source line end (a comment, a tag or hidden content spanning it); the control keeps the comment on one line. */
const JOINED_CASES: readonly string[] = [
  "Agents can load hyper<!--\n-->-unix before a review.",
  "Outcome: KNOWN<!--\n-->_PRESENT for the queried path.",
  "The worktree-lane<!--\n-->-census recipe is served to every Pi agent.",
  'Agents can load hyper<span\nclass="x">-unix before a review.',
  "See 06-workflow<!--\n-->-recipes for the served steps.",
  "The HX recipe W<!--\n-->3 is served to every Pi agent.",
  "Agents can load hyper<script>\n</script>-unix before a review.",
];
const JOINED_CONTROL = "Agents can load hyper<!-- -->-unix before a review.";
/** N1's walk control: [path, a document the independent walk must reach] in a scratch checkout of the repo's shape. */
const WALK_TREE: ReadonlyArray<readonly [string, boolean]> = [
  ["docs/guide.md", true],
  [".pi/agents/reviewer.md", true],
  ["guides/recipes.MD", true],
  ["guides/recipes.markdown", true],
  ["guides/notes.txt", true],
  ["NOTES.mdown", true],
  ["LICENSE", false],
  ["config.json", false],
  ["src/notes.md", false],
  ["test/notes.md", false],
  [".github/notes.md", false],
  ["node_modules/pkg/README.md", false],
];
/** G1's README controls: the discovery-roots table built from rows. */
const rootsTable = (rows: readonly string[]): string => `**${ROOTS_LABEL}** (checked in this order, first match wins):\n\n| Scope | Path | Source |\n|---|---|---|\n${rows.join("\n")}\n`;
const ROOTS_ROWS = ["| Project | `<cwd>/.pi/skills/` | Pi-standard |", "| User | `$PI_CODING_AGENT_DIR/skills/` (default `~/.pi/agent/skills/`) | Pi-standard |"];
const SIXTH_ROOT = "| User | `~/.skills/` | hx install default |";
/** G1's template control (U2): the label once, the five-root table inside a template element (inert contents), then a visible table naming the sixth root. */
const TEMPLATE_COPY = `**${ROOTS_LABEL}** (checked in this order, first match wins):\n\n<template>\n\n| Scope | Path | Source |\n|---|---|---|\n${ROOTS_ROWS.join("\n")}\n\n</template>\n\n| Scope | Path | Source |\n|---|---|---|\n${[SIXTH_ROOT, ...ROOTS_ROWS].join("\n")}\n`;
/** G1's README copies (wb-t1jc): the label once, the two-row table between an opening and a closing tag, then a visible table naming the sixth root. */
const wrappedCopy = (open: string, close: string): string =>
  `**${ROOTS_LABEL}** (checked in this order, first match wins):\n\n${open}\n\n| Scope | Path | Source |\n|---|---|---|\n${ROOTS_ROWS.join("\n")}\n\n${close}\n\n| Scope | Path | Source |\n|---|---|---|\n${[SIXTH_ROOT, ...ROOTS_ROWS].join("\n")}\n`;
/** G1's attribute controls (wb-t1jc F1): the copy inside an element the page hides by an attribute is not read; the visible table is. */
const DETAILS_COPY = wrappedCopy("<details><summary>Roots</summary>", "</details>");
const HIDDEN_ATTRIBUTE_COPY = wrappedCopy("<div hidden>", "</div>");
const DIALOG_COPY = wrappedCopy("<dialog>", "</dialog>");
/**
 * Their controls: an open details element's body is read (the attribute's name in any case); a closed one's summary
 * shows, the label in it counted, while its body does not; a summary nested below the details is no summary of it and
 * hides with the body; a void element carrying the hidden attribute hides nothing past its own tag, and nor does a tag
 * carrying it inside a template's inert contents; a nested element of the hidden element's name is counted, so the
 * hidden element ends at its own end tag.
 */
const OPEN_DETAILS_COPY = wrappedCopy("<details OPEN><summary>Roots</summary>", "</details>");
const SUMMARY_LABEL_COPY = `<details><summary>\n\n**${ROOTS_LABEL}** (checked in this order, first match wins):\n\n</summary>\n\n| Scope | Path | Source |\n|---|---|---|\n${ROOTS_ROWS.join("\n")}\n\n</details>\n\n| Scope | Path | Source |\n|---|---|---|\n${[SIXTH_ROOT, ...ROOTS_ROWS].join("\n")}\n`;
const NESTED_SUMMARY_COPY = wrappedCopy("<details><div><summary>", "</summary></div></details>");
const VOID_HIDDEN_COPY = `<img hidden alt="">\n\n${rootsTable(ROOTS_ROWS)}`;
const TEMPLATE_HIDDEN_COPY = `<template><div hidden></template>\n\n${rootsTable(ROOTS_ROWS)}`;
const NESTED_HIDDEN_COPY = wrappedCopy("<div hidden><div>x</div>", "</div>");
/** Row Q12's README copies (wb-t1jc F1): the copy the page hides by styling, by scripting or as an element's fallback, which G1's read still reads in place of the visible table. */
const README_RENDERING_COPIES: readonly string[] = [wrappedCopy('<div style="display:none">', "</div>"), wrappedCopy("<noscript>", "</noscript>"), wrappedCopy("<audio>", "</audio>")];
/** G3's controls: a prose example the view renders (emphasis inside the key, the source spelled with a reference), and one a comment hides. */
const RENDERED_EXAMPLE = 'Set "setting*Sources*": ["&#117;ser"] to load the user skills.';
const HIDDEN_EXAMPLE = '<!-- "settingSources": ["user"] -->';

/** The real Pi doc line row N's floor names: the wb-kqx.5 receipt line in the byte-frozen TRACEABILITY.md, which names the hx installer and says the skill is not found. */
const DOC_FLOOR = ["docs/workbench/TRACEABILITY.md:236"];
/** Launch sites src really has, so N3's scan is shown to see launches at all. */
const LAUNCH_FLOOR = ["src/env.ts:exec:git", "src/index.ts:execFileSync:git", "src/workbench/providers/reactivefiber.ts:spawn:rf"];
/** N3's control: a descriptor whose description shows an hx command, which the flagged reader must name. */
const PLANTED_DESCRIPTOR = { id: "census.planted", description: "runs hx git diff for the hosted agent" };
/** The doc whose settingSources example G3 reads as its floor. */
const EXAMPLE_FLOOR = "docs/workbench/13-contracts-and-config.md";

const IMPL: Readonly<Record<string, () => Json | Promise<Json>>> = {
  G1: () =>
    withHome(home => {
      const agentDir = `~/${relative(home, getAgentDir())}`;
      const source = loaderRootsOf(readFileSync(LOADER, "utf8"));
      const roots = source.map(root => root.replace("<agentDir>", agentDir));
      const readme = readmeRootsOf(readFileSync(README, "utf8"));
      const readmeControls = {
        hiddenCopy: readmeRootsOf(`<!--\n${rootsTable(ROOTS_ROWS)}-->\n\n${rootsTable([SIXTH_ROOT, ...ROOTS_ROWS])}`),
        shownTwice: readmeRootsOf(`${rootsTable(ROOTS_ROWS)}\n${rootsTable(ROOTS_ROWS)}`).labels,
        templateCopy: readmeRootsOf(TEMPLATE_COPY),
        detailsCopy: readmeRootsOf(DETAILS_COPY),
        hiddenAttributeCopy: readmeRootsOf(HIDDEN_ATTRIBUTE_COPY),
        dialogCopy: readmeRootsOf(DIALOG_COPY),
        openDetailsCopy: readmeRootsOf(OPEN_DETAILS_COPY),
        summaryLabelCopy: readmeRootsOf(SUMMARY_LABEL_COPY),
        nestedSummaryCopy: readmeRootsOf(NESTED_SUMMARY_COPY),
        voidHiddenCopy: readmeRootsOf(VOID_HIDDEN_COPY),
        templateHiddenCopy: readmeRootsOf(TEMPLATE_HIDDEN_COPY),
        nestedHiddenCopy: readmeRootsOf(NESTED_HIDDEN_COPY),
      };
      const filing = gateFiling();
      const targets = [...roster().installTargets];
      const inside = targetsInside(targets, roots);
      const insideControl = targetsInside(targets, [...roots, "~/.skills"]);
      expect(roots).toEqual([...roster().loaderRoots]);
      expect(readme.labels, `README shows its ${ROOTS_LABEL} label once`).toBe(1);
      expect(readme.roots).toEqual(roots);
      expect(readmeControls.hiddenCopy, "a commented copy is not read; the visible table is").toEqual({ labels: 1, roots: ["~/.skills", "<cwd>/.pi/skills", "~/.pi/agent/skills"] });
      expect(readmeControls.shownTwice, "a label shown twice is counted twice").toBe(2);
      expect(readmeControls.templateCopy, "a table inside a template element is not read; the visible table is").toEqual({
        labels: 1,
        roots: ["~/.skills", "<cwd>/.pi/skills", "~/.pi/agent/skills"],
      });
      const visibleTable = { labels: 1, roots: ["~/.skills", "<cwd>/.pi/skills", "~/.pi/agent/skills"] };
      const copiedTable = { labels: 1, roots: ["<cwd>/.pi/skills", "~/.pi/agent/skills"] };
      expect(
        [readmeControls.detailsCopy, readmeControls.hiddenAttributeCopy, readmeControls.dialogCopy],
        "a table inside an element the page hides by an attribute (a closed details element, the hidden attribute, a dialog without open) is not read; the visible table is",
      ).toEqual([visibleTable, visibleTable, visibleTable]);
      expect(readmeControls.openDetailsCopy, "a table inside an open details element is read").toEqual(copiedTable);
      expect(readmeControls.summaryLabelCopy, "a closed details element's summary shows, its label counted; its body does not").toEqual(visibleTable);
      expect(readmeControls.nestedSummaryCopy, "a summary nested below the details is no summary of it and hides with the body").toEqual(visibleTable);
      expect(readmeControls.voidHiddenCopy, "a void element carrying the hidden attribute hides nothing past its own tag").toEqual(copiedTable);
      expect(readmeControls.templateHiddenCopy, "a tag carrying the hidden attribute inside a template's inert contents hides nothing on the page").toEqual(copiedTable);
      expect(readmeControls.nestedHiddenCopy, "a nested element of its name is counted, so the hidden element ends at its own end tag").toEqual(visibleTable);
      expect(filing.piRoots).toEqual(roots);
      expect(targets).toEqual(filing.hxTargets);
      expect(inside).toEqual([]);
      expect(insideControl).toEqual(["~/.skills/hyper-unix"]);
      return { source, agentDir, roots, readmeLabels: readme.labels, readmeControls: asJson(readmeControls), targets, inside, insideControl };
    }),
  G2: () =>
    withHome((home, cwd) => {
      const targets = roster().installTargets;
      for (const target of targets) plantSkill(onDisk(target, home, cwd));
      const placeholder = preloadSkills([SKILL], cwd)[0]?.content === PLACEHOLDER;
      const reached: string[] = [];
      for (const root of roster().loaderRoots) {
        const directory = join(onDisk(root, home, cwd), SKILL);
        plantSkill(directory);
        if (preloadSkills([SKILL], cwd)[0]?.content === STAND_IN.trim()) reached.push(root);
        rmSync(directory, { recursive: true, force: true });
      }
      expect(placeholder).toBe(true);
      expect(reached).toEqual([...roster().loaderRoots]);
      return { planted: targets.length, placeholder, reached };
    }),
  G3: async () => {
    const cwd = makeScratch("hx-recipe-claude-");
    let options: Options | undefined;
    try {
      options = await claudeOptions(cwd);
    } finally {
      removeScratch(cwd);
    }
    const defaultSources = asJson(options?.settingSources ?? null);
    const sites = srcModules().flatMap(file => settingSourcesSites(repoPath(file), readFileSync(file, "utf8")));
    const examples = docExamples(docTexts());
    const userExamples = userExamplesOf(examples);
    const userControl = userExamplesOf(docExamples([["control.md", '      "settingSources": ["user", "project"]']]));
    const renderedControl = userExamplesOf(docExamples([["control.md", RENDERED_EXAMPLE]]));
    const hiddenControl = userExamplesOf(docExamples([["control.md", HIDDEN_EXAMPLE]]));
    const floor = examples.filter(example => example.file === EXAMPLE_FLOOR).map(example => example.sources);
    expect(defaultSources).toEqual([]);
    expect(sites.filter(site => !/:(?:\[\]|\?\? \[\]|[A-Za-z]+=\?\? \[\])$/.test(site))).toEqual(["src/settings.ts:value"]);
    expect(floor).toEqual([["project"]]);
    expect(userExamples).toEqual([]);
    expect(userControl).toEqual(["control.md"]);
    expect(renderedControl, "a prose example read in the view (emphasis, a reference)").toEqual(["control.md"]);
    expect(hiddenControl, "a commented example read in the raw source").toEqual(["control.md"]);
    return { defaultSources, sites, floor, userExamples, userControl, renderedControl, hiddenControl };
  },
  N1: () => {
    const files = docFiles();
    const texts = docTexts();
    const walkComplete = DOC_ROOTS.every(root => JSON.stringify(filesBelow(join(REPO, root))) === JSON.stringify(listedBelow(join(REPO, root))));
    const judged = judge(texts);
    const lineCount = texts.reduce((sum, [, text]) => sum + [...text.matchAll(/\n/g)].length + 1, 0);
    const examinedAll = examinedOf(judged) === lineCount;
    const outside = documentsOutside(REPO);
    const outsideCovers = outside.length > 0 && files.filter(isDocument).every(file => outside.includes(file));
    const unread = outside.filter(file => !files.includes(file)).map(repoPath);
    const viewMismatches = texts.filter(([path, text]) => isMarkdown(path) && !viewHolds(text)).map(([path]) => path);
    const floor = DOC_FLOOR.map(at => ({ at, verdict: judged.negated.includes(at) ? "negated" : judged.named.includes(at) || judged.served.includes(at) ? "admitted-wrongly" : "none" }));
    const [farPage, farText] = longestPage(texts);
    const farFloor = plantChangesOn(farPage, farText, T10);
    const farLine = farText.split("\n").length;
    const farBeyondAll = texts.every(([, text]) => text.split("\n").length <= farLine);
    const pageFloors = texts.map(([path, text]) => plantChangesOn(path, text, T10));
    const pageFloorMisses = texts.filter((_, index) => JSON.stringify(pageFloors[index]) !== JSON.stringify(["served@+1"])).map(([path]) => path);
    const pageFloorsAll = pageFloors.length === texts.length && pageFloors.length >= 100;
    const walkControl = onScratchCheckout(
      WALK_TREE.map(([path]) => path),
      `${T10}\n`,
      root => ({ outside: documentsOutside(root).map(file => relative(root, file)), rootDocuments: rootDocuments(root).map(file => relative(root, file)) }),
    );
    expect(walkComplete).toBe(true);
    expect(files.length).toBeGreaterThanOrEqual(100);
    expect(examinedAll, `${examinedOf(judged)} line verdicts recorded of the population's ${lineCount} lines`).toBe(true);
    expect(outsideCovers, "the independent document walk finds every population document").toBe(true);
    expect(unread).toEqual([]);
    expect(judged.unmapped, "Markdown pages the rendered view cannot map").toEqual([]);
    expect(viewMismatches, "Markdown pages whose line view differs from marked's rendered HTML").toEqual([]);
    expect(floor.map(entry => entry.verdict)).toEqual(DOC_FLOOR.map(() => "negated"));
    expect(farFloor, `a served line planted past the end of ${farPage}, the longest page`).toEqual(["served@+1"]);
    expect(farBeyondAll).toBe(true);
    expect(pageFloorsAll, "every population page is floored").toBe(true);
    expect(pageFloorMisses, "a served line planted past the end of each population page reads served there").toEqual([]);
    expect(walkControl.outside, "the independent walk on a scratch checkout").toEqual(WALK_TREE.filter(([, reached]) => reached).map(([path]) => path).sort());
    expect(walkControl.rootDocuments).toEqual(["NOTES.mdown"]);
    expect(judged.named).toEqual([]);
    expect(judged.served).toEqual([]);
    return {
      walkComplete,
      atFloor: files.length >= 100,
      examinedAll,
      outsideCovers,
      unread,
      unmapped: judged.unmapped,
      viewMismatches,
      rootDocuments: rootDocuments().map(repoPath),
      floor,
      farFloor,
      farBeyondAll,
      pageFloorsAll,
      pageFloorMisses,
      walkControl,
      named: judged.named,
      served: judged.served,
    };
  },
  N2: () =>
    withHome(() => {
      const [hyper, beads] = preloadSkills([SKILL, "beads"], REPO);
      const placeholder = hyper?.content === PLACEHOLDER;
      const projectSkillRead = beads?.content.startsWith("---\nname: beads\n") === true;
      const agentFiles = filesBelow(join(REPO, ".pi", "agents"))
        .filter(file => file.endsWith(".md"))
        .map(file => ({ file: repoPath(file), skills: frontmatterSkills(readFileSync(file, "utf8")) }));
      const declaring = [
        ...agentFiles.filter(entry => declares(entry.skills)).map(entry => entry.file),
        ...[...DEFAULT_AGENTS].filter(([, config]) => declares(config.skills)).map(([name]) => name),
      ];
      const declaringControl = declares(frontmatterSkills(`---\ndescription: control\nskills: beads, ${SKILL}\n---\nbody\n`));
      expect(placeholder).toBe(true);
      expect(projectSkillRead).toBe(true);
      expect(agentFiles.length).toBeGreaterThanOrEqual(1);
      expect(DEFAULT_AGENTS.size).toBeGreaterThanOrEqual(1);
      expect(declaring).toEqual([]);
      expect(declaringControl).toBe(true);
      return { placeholder, projectSkillRead, agentFilesRead: agentFiles.length >= 1, defaultsRead: DEFAULT_AGENTS.size >= 1, declaring, declaringControl };
    }),
  N3: async () => {
    const modules = srcModules();
    const launches = modules.flatMap(file => launchSites(repoPath(file), readFileSync(file, "utf8")));
    const hxLaunches = launches.filter(launchesHx);
    const literals = modules.flatMap(file => literalHits(repoPath(file), readFileSync(file, "utf8")));
    const floorSeen = LAUNCH_FLOOR.filter(site => launches.includes(site));
    const surface = await hxSurface();
    const flaggedControl = flaggedOf([PLANTED_DESCRIPTOR]);
    expect(floorSeen).toEqual(LAUNCH_FLOOR);
    expect(hxLaunches).toEqual([]);
    expect(literals).toEqual([]);
    expect(surface.flagged).toEqual([]);
    expect(flaggedControl).toEqual(["census.planted"]);
    return { modules: modules.length >= 100, floorSeen, hxLaunches, literals, typed: surface.typed, flagged: surface.flagged, flaggedControl };
  },
  E1: () => {
    const recipes = roster().recipes;
    const headings = recipes.map(recipe => /^## (W\d) — (.+) \((P\d)\)$/.exec(recipe.heading));
    const slugs = headings.flatMap(match => (match?.[2] ?? "").split(" and "));
    const verdicts = recipes.map(recipe => ({ id: recipe.id, heading: plantedVerdict(recipe.heading), commands: recipe.commands.map(plantedVerdict) }));
    expect(recipes.map(recipe => recipe.id)).toEqual(titleRecipeIds());
    expect(headings.map(match => match?.[1] ?? null)).toEqual(titleRecipeIds());
    expect(slugs).toEqual(RECIPE_SLUGS);
    for (const entry of verdicts) {
      expect(["named", "served"]).toContain(entry.heading);
      for (const verdict of entry.commands) expect(verdict).toBe("served");
    }
    return verdicts;
  },
  E2: () => {
    const verdicts = UNQUOTED_CASES.map(text => [digestOf(text), plantedVerdict(text)]);
    for (const [, verdict] of verdicts) expect(verdict).toBe("served");
    return verdicts;
  },
  M1: () => {
    const lines = LINE_CASES.map(([text, expected]) => ({ digest: digestOf(text), verdict: lineVerdict(text), families: mentionFamilies(text), expected }));
    for (const entry of lines) expect(entry.verdict).toBe(entry.expected);
    return lines.map(({ digest, verdict, families }) => [digest, verdict, families]);
  },
  M2: () => {
    const commands = COMMAND_CASES.map(([text, expected]) => ({ digest: digestOf(text), hit: HX_COMMAND.test(text), expected }));
    for (const entry of commands) expect(entry.hit).toBe(entry.expected);
    return commands.map(({ digest, hit }) => [digest, hit]);
  },
  M3: () => {
    const launches = LAUNCH_CASES.map(([text, all, hx]) => {
      const sites = launchSites("case.ts", text);
      return { digest: digestOf(text), counts: [sites.length, sites.filter(launchesHx).length], expected: [all, hx] };
    });
    const literals = LITERAL_CASES.map(([text, hits]) => ({ digest: digestOf(text), hits: literalHits("case.ts", text).length, expected: hits }));
    const sites = SITE_CASES.map(([text, expected]) => ({ digest: digestOf(text), sites: settingSourcesSites("case.ts", text), expected: [...expected] }));
    for (const entry of launches) expect(entry.counts).toEqual(entry.expected);
    for (const entry of literals) expect(entry.hits).toBe(entry.expected);
    for (const entry of sites) expect(entry.sites).toEqual(entry.expected);
    return {
      launches: launches.map(({ digest, counts }) => [digest, ...counts]),
      literals: literals.map(({ digest, hits }) => [digest, hits]),
      sites: sites.map(({ digest, sites: found }) => [digest, ...found]),
    };
  },
  M4: () => {
    const texts = VIEW_TEXT_CASES.map(([id, line, shown]) => ({ id, shown: folded(renderedLines(`${line}\n`)[0] ?? ""), expected: shown }));
    const blocks = VIEW_CASES.map(([block, expected]) => ({ digest: digestOf(block), changes: plantChanges(block), held: viewHolds(`${block}\n`), expected: [...expected] }));
    for (const entry of texts) expect(entry.shown, `${entry.id} renders to the text the page shows`).toBe(entry.expected);
    for (const entry of blocks) {
      expect(entry.changes, `block ${entry.digest}`).toEqual(entry.expected);
      expect(entry.held, `block ${entry.digest}: the line view is marked's HTML`).toBe(true);
    }
    const page = `${readFileSync(join(REPO, PLANT_PAGE), "utf8")}\n${VIEW_TEXT_CASES[1]?.[1] ?? ""}\n`;
    const crlf = judge([["unmapped.md", UNMAPPED_PAGE]]);
    const controls = { rawViewHeld: viewHeld(page.split("\n"), page), renderedViewHeld: viewHolds(page), unmapped: crlf.unmapped, readRaw: crlf.served };
    expect(controls.rawViewHeld, "the raw lines of a marked-up page are not its rendered view (the hold check tells the views apart)").toBe(false);
    expect(controls.renderedViewHeld).toBe(true);
    expect(controls.unmapped, "a page whose tokens cannot be mapped is named").toEqual(["unmapped.md"]);
    expect(controls.readRaw, "and read raw, so its command is still served").toEqual(["unmapped.md:2"]);
    return { texts: texts.map(({ id, shown }) => [id, digestOf(shown)]), blocks: blocks.map(({ digest, changes }) => [digest, ...changes]), controls };
  },
  M5: () => {
    const separated = SEPARATOR_CASES.map(([id, block, expected]) => ({ id, changes: plantChanges(block), held: viewHolds(`${block}\n`), expected: [...expected] }));
    const fusing = FUSING_CASES.map(([block, expected]) => ({ digest: digestOf(block), changes: plantChanges(block), held: viewHolds(`${block}\n`), expected: [...expected] }));
    const fusedHeld = FUSED_VIEWS.map(([page, fused]) => viewHeld([fused], page));
    for (const entry of [...separated, ...fusing]) {
      const name = "id" in entry ? entry.id : entry.digest;
      expect(entry.changes, `${name}: the words either side read as the page shows them`).toEqual(entry.expected);
      expect(entry.held, `${name}: the line view is marked's HTML`).toBe(true);
    }
    expect(fusedHeld, "the fused view of a page that shows the words apart does not hold").toEqual(FUSED_VIEWS.map(() => false));
    return {
      separated: separated.map(({ id, changes }) => [id, ...changes]),
      fusing: fusing.map(({ digest, changes }) => [digest, ...changes]),
      fusedHeld,
    };
  },
  M6: () => {
    const spellings = [...MARKDOWN_EXTENSIONS.flatMap(extension => [extension, extension.toUpperCase()]), ...MIXED_SPELLINGS];
    const served = spellings.map(extension => judge([[`docs/guide.${extension}`, NAMED_PAGE]]).served);
    const raw = judge([["docs/guide.txt", NAMED_PAGE]]).served;
    expect(served, "every Markdown name is judged in the rendered view").toEqual(spellings.map(extension => [`docs/guide.${extension}:3`]));
    expect(raw, "a .txt page is read raw").toEqual([]);
    return { spellings, served: served.map(entries => entries.length), raw };
  },
  M7: () => {
    const hidden = HIDDEN_CONTENT_CASES.map(([id, block, expected]) => ({ id, changes: plantChanges(block), held: viewHolds(`${block}\n`), expected: [...expected] }));
    const shownHeld = HIDDEN_SHOWN_VIEWS.map(([page, shown]) => viewHeld([shown], page));
    for (const entry of hidden) {
      expect(entry.changes, `${entry.id}: the hidden content is not read`).toEqual(entry.expected);
      expect(entry.held, `${entry.id}: the line view is marked's HTML reduced by the same rules`).toBe(true);
    }
    expect(shownHeld, "a view that reads the hidden content does not hold").toEqual(HIDDEN_SHOWN_VIEWS.map(() => false));
    return { hidden: hidden.map(({ id, changes }) => [id, ...changes]), shownHeld };
  },
  Q1: () => {
    const verdict = lineVerdict("To check whether trunk already carries a branch, ask HyperUnix for the merge base, the ancestry and the changed paths.");
    expect(verdict).toBe("none");
    return verdict;
  },
  Q2: () => {
    const raw = ["hx \\", '  --workspace "$ROOT" git diff "$LEFT" "$RIGHT"'].map(lineVerdict);
    const rendered = SPLIT_CASES.map(plantChanges);
    const control = plantChanges(T10);
    expect(raw).toEqual(["none", "none"]);
    expect(rendered).toEqual(SPLIT_CASES.map(() => []));
    expect(control).toEqual(["served@+1"]);
    return { raw, rendered, control };
  },
  Q3: () => {
    const outside = docFiles().map(repoPath).filter(outsidePopulation);
    const rosterServed = judge([[repoPath(ROSTER_PATH), readFileSync(ROSTER_PATH, "utf8")]]).served.length > 0;
    expect(outside).toEqual([]);
    expect(rosterServed).toBe(true);
    return { outside, rosterServed };
  },
  Q4: () => {
    const verdict = lineVerdict("the branch-landing-audit recipe is reachable here; only the W7 preflight is not");
    expect(verdict).toBe("negated");
    return verdict;
  },
  Q5: () => {
    const verdicts = ["the HyperUnix workflow skill serves every Pi agent", "hx frobnicate --now", "PROVIDER_PARTIAL and BUDGET_EXHAUSTED outcomes"].map(lineVerdict);
    expect(verdicts).toEqual(["none", "none", "none"]);
    return verdicts;
  },
  Q6: () =>
    withHome(async (_home, cwd) => {
      mkdirSync(join(cwd, ".pi"), { recursive: true });
      writeFileSync(join(cwd, ".pi", "subagents.json"), JSON.stringify({ workbench: { workflowAgentBackend: "claude", settingSources: ["user"] } }));
      const loaded = loadSettings(cwd).workbench?.settingSources;
      const options = await claudeOptions(cwd, loaded);
      const reached = asJson(options?.settingSources ?? null);
      expect(loaded).toEqual(["user"]);
      expect(reached).toEqual(["user"]);
      return { loaded: asJson(loaded ?? null), reached };
    }),
  Q7: () => {
    const verdict = lineVerdict("3. Preview the HX move/rename plan without apply. Compare advertised write/effect set against intended namespace change.");
    expect(verdict).toBe("none");
    return verdict;
  },
  Q8: () => {
    const bound = launchSites("case.ts", 'const bin = "hx";\nspawn(bin, ["git", "diff"]);').filter(launchesHx).length;
    const configured = launchSites("case.ts", 'spawn(process.env.HX_BIN ?? "hx", ["git", "diff"]);').filter(launchesHx).length;
    expect([bound, configured]).toEqual([0, 0]);
    return [bound, configured];
  },
  Q9: () => {
    const quiet = HIDDEN_CASES.map(plantChanges);
    const shown = plantChanges(HIDDEN_CONTROL);
    expect(quiet).toEqual(HIDDEN_CASES.map(() => []));
    expect(shown).toEqual(["served@+1"]);
    return { quiet, shown };
  },
  Q10: () => {
    const quiet = EXAMPLE_SHAPES.map(text => userExamplesOf(docExamples([["shape.md", text]])));
    const control = userExamplesOf(docExamples([["control.md", EXAMPLE_CONTROL]]));
    expect(quiet).toEqual([[], []]);
    expect(control).toEqual(["control.md"]);
    return { quiet, control };
  },
  Q11: () => {
    const quiet = CONFUSABLE_CASES.map(lineVerdict);
    const control = lineVerdict("Run hx git diff $TRUNK $BRANCH");
    expect(quiet).toEqual(CONFUSABLE_CASES.map(() => "none"));
    expect(control).toBe("served");
    return { quiet, control };
  },
  Q12: () => {
    const quiet = RENDERING_CASES.map(plantChanges);
    const control = plantChanges(RENDERING_CONTROL);
    const paired = RENDERING_PAIRED_CONTROLS.map(plantChanges);
    const readme = README_RENDERING_COPIES.map(copy => readmeRootsOf(copy).roots);
    expect(quiet).toEqual(RENDERING_CASES.map(() => []));
    expect(control).toEqual(["served@+1"]);
    expect(paired, "each later member with its hiding construct taken out reads served").toEqual([["served@+3"], ["served@+1"], ["served@+1"]]);
    expect(readme, "G1's README read reads the copy the page hides by styling, by scripting or as an element's fallback").toEqual(
      README_RENDERING_COPIES.map(() => ["<cwd>/.pi/skills", "~/.pi/agent/skills"]),
    );
    return { quiet, control, paired, readme };
  },
  Q13: () => {
    const quiet = OTHER_MARKUP_CASES.map(([path, text]) => {
      const judged = judge([[path, text]]);
      return [...judged.named, ...judged.negated, ...judged.served];
    });
    const control = judge([OTHER_MARKUP_CONTROL]).served;
    expect(quiet).toEqual(OTHER_MARKUP_CASES.map(() => []));
    expect(control).toEqual([`${OTHER_MARKUP_CONTROL[0]}:1`]);
    return { quiet, control };
  },
  Q14: () => {
    const quiet = SHELL_SPELLING_CASES.map(lineVerdict);
    const control = lineVerdict(SHELL_SPELLING_CONTROL);
    expect(quiet).toEqual(SHELL_SPELLING_CASES.map(() => "none"));
    expect(control).toBe("served");
    return { quiet, control };
  },
  Q15: () => {
    const quiet = JOINED_CASES.map(plantChanges);
    const control = plantChanges(JOINED_CONTROL);
    expect(quiet).toEqual(JOINED_CASES.map(() => []));
    expect(control).toEqual(["served@+1"]);
    return { quiet, control };
  },
};

/** The pins whose case ran to its end and matched its roster witness, in run order (the record case reads it). */
const REACHED: string[] = [];

describe("wb-ts6.1 hx recipe serving census (HXFS-PI-R5, until-then leg)", () => {
  it("the frozen shape (standing rule 16): every judged row and its pin count", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["G:3", "N:3", "E:2", "M:7", "R:15"]);
  });
  it("the owner filing's gate, until-then and falsifier clauses in the tracked bead export are rows G, N and E's labels", () => {
    expect(ROWS.slice(0, 3).map(row => row.label)).toEqual(exportClauses());
  });
  it("every judged pin has exactly one case", () => {
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
  });
  it("the out-of-file roster holds every row, label, pin, residual and vocabulary of this file", () => {
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      roster().rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(roster().rows.slice(0, 3).map(row => row.label)).toEqual(exportClauses());
    expect({ ...RESIDUALS }).toStrictEqual({ ...roster().residuals });
    expect({
      recipeIds: RECIPE_IDS,
      slugs: RECIPE_SLUGS,
      pages: RECIPE_PAGES,
      decisionClasses: DECISION_CLASSES,
      skillNames: SKILL_NAMES,
      hxVerbs: HX_VERBS,
      servedWords: SERVED_WORDS,
      notServedMarkers: NOT_SERVED_MARKERS,
      docRoots: DOC_ROOTS,
      outOfPopulation: OUT_OF_POPULATION,
      namedReferences: NAMED_REFERENCE_LIST,
      markdownExtensions: MARKDOWN_EXTENSIONS,
      otherDocumentExtensions: OTHER_DOCUMENT_EXTENSIONS,
      separatorElements: SEPARATOR_ELEMENTS,
      voidSeparators: VOID_SEPARATORS,
      voidElements: VOID_ELEMENTS,
      hiddenElements: HIDDEN_ELEMENTS,
      rawTextElements: RAW_TEXT_ELEMENTS,
      tagAliases: TAG_ALIASES,
    }).toStrictEqual(Object.fromEntries(Object.entries(roster().vocabulary).map(([name, words]) => [name, [...words]])));
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
  it("the record: every registered test and every reached pin equal the roster, in order and both ways", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest's task tree), in roster order").toEqual([...roster().tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked
        .filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state)))
        .map(entry => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
