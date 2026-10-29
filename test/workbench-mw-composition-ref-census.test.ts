/**
 * wb-klr7 (CAC-WORKFLOW-COMPOSITION-R1, program-triage-2026-10-18), the MechanicalWorkflows composition-reference census: a
 * standing until-then pin of an absent trigger, plus an ARMED contract that binds the first composition consumer to come.
 * Statement (the bead title, read from the tracked bead export at run time): "When MechanicalWorkflows ships
 * CACWorkflowCompositionV0 as a consumable artifact (concept only at 01-composition-contracts.md:6@4b8b974ca72b) and a Pi surface
 * (W11 host, catalog/inspect readers, reader adapter) consumes it, Pi shall carry its step and source-artifact IDs as references
 * to existing producer IDs only, never minting a new Beads task, Forge test/gate or Furnace Attempt id; until then no Pi change
 * is owed." The owner filing's Citation paragraph (its own line of the bead's notes) carries the trigger ("Gating artifact:") and
 * the acceptance ("Acceptance shape:", clauses (a)-(c)); row T's label is the trigger sentence and rows A-C are the three
 * clauses, each verbatim without its separator, read back from that line in the judged-set case.
 *
 * FORM (cut #5: rule 19(c) in the rule 14 shape, answering refusal #3 under orchestrator ruling R-B90): ENUMERATED, NOT GENERAL.
 * Each reading below is claimed for exactly the forms it lists, and each listed form is either a PLANTED input whose whole
 * reading its pin's witness holds (the plant ids in parentheses, both sides: the form read and the form exempted) or a COMPUTED
 * SCAN, which plants every BMP code point (0000-ffff, each lone surrogate included) at one position and holds the code points
 * that read. A form this header does not list is not claimed. A known unread form is a named RESIDUAL with a pinned quiet row;
 * beside every reading, the FAIL CLOSED readers refuse any src file that holds the package scope or names a composition field
 * at all, whatever form holds it; a form found later is a residual-list addition (rule 14), not a claim.
 *
 * MEASURED (read-only; the measuring seats' record, which no case re-reads beyond what rows T-C pin). Producer, first by seat
 * ws-06 of g10-work-s125 on 2026-10-28 and re-read by seat ws-02 of g10-work-s136 on 2026-10-29 (its remote tip re-read again by
 * seat ws-06 of g10-work-s138 on 2026-10-29: git ls-remote origin HEAD still cb45df94cd8e): the local MechanicalWorkflows
 * checkout (git show, never written) at the filing pin 4b8b974ca72b, and depth-1 scratch clones of the remote tip (git ls-remote
 * origin HEAD: f489cee4ce20 on 2026-10-28, cb45df94cd8e committed 2026-10-28T23:14:59Z on 2026-10-29, whose two program documents
 * are blob-identical to f489cee4ce20's): at both pins 01-composition-contracts.md:6 reads the type "as a concept only" (the tip
 * widens the non-minting list to "Forge operations/gates, Furnace attempts, Git revisions or HyperUnix answers (a non-exhaustive
 * list)"), README.md:3 opens "Design-only as of 2026-10-18 (19ca8d4): the two program documents are the only artifacts", and at
 * the tip no file under packages/, contracts/, schemas/ or apps/ spells the type or a workflow-composition schema (the type is
 * spelled only in docs/10-current-state-and-gaps.md:357, a prose mention, and the program document; under packages/ only a test
 * reading the program documents by path names the program). The producer block holds those facts; this hermetic census never
 * re-reads the producer. Pi, by seat ws-04 of g10-work-s141 at trunk aa95f43 (landing 678; no src path or manifest changed since
 * e8e13f8): 117 src files, every one a .ts module; package.json and both locks (package-lock.json, vendor/dependency-lock.json,
 * both lockfileVersion 3) hold no @mechanical/ text at all and no npm: spec; no src file holds the scope's text, spells the
 * program's words, or names a composition field anywhere; no src module builds a bd-/wb-/frn- or cmd_ string from a value (the
 * only frn- and bd- literals, src/workbench/hosts/furnace-hosted.ts's preflight context, are fixed strings); and every form B
 * reads, its field condition lifted, finds one family construction from a value in src, the Forge gate-step id below, which
 * reads no field. The workflow_catalog and workflow_inspect readers the trigger names live in src/index.ts (their registrations)
 * and src/workbench/tool-replies.ts (their reply builders).
 *
 * ROWS (frozen shape ["T:2", "A:3", "B:3", "C:2"]; one test per pin, titled by the pin id under "<row> <label>"). PLANTS: each
 * planted input's whole reading is held in its pin's witness - the @mechanical/ names or specifiers, the tool names, the spelling
 * count, or the constructions as "<line> <family> <forms> <fields>" ([] or 0 for a quiet row) - and so are the FAIL CLOSED hits
 * of every planted module, manifest and lock (T1's witness for its plants and the module kinds, T2's for its spelling and
 * reader plants, each B pin's for its own), so a reader that reads a planted input differently reds the compare. Planted
 * manifests, locks, documents, holders and literals go through the same readers as the real ones; planted modules go through
 * the same call as the real src modules, after them, so a reader that stops early misses them. A SRC MODULE (isModule) is a
 * src file whose name ends with .ts, .tsx, .mts, .cts, .js, .jsx, .mjs or .cjs (a declaration file's .d.ts among them:
 * kind-dts; one planted module per extension, kind-ts to kind-cjs, each read by T1's loads, T2's reader finder and B1; the same
 * text as a .ts.md file, kind-md, is read by none of them:
 * R-MODULE-KIND), parsed by its extension (scriptKind): TSX for .tsx, JSX for .jsx, JavaScript for .js, .mjs and .cjs,
 * TypeScript otherwise (planted: JSX only a JSX-enabled parse reads, kind-tsx-jsx and kind-jsx-jsx; `require < string >
 * (...)`, two comparisons to a JavaScript parse and a load to a TypeScript one, kind-js-comparison, kind-mjs-comparison and
 * kind-cjs-comparison; a <T> assertion only a TypeScript parse reads, forge-provider-angle-mts and forge-provider-angle-cts;
 * the kind is read from the last extension alone, so a .tsx, .jsx or .js further in parses as TypeScript:
 * forge-kind-tsx-infix, forge-kind-jsx-infix, forge-kind-js-infix). UNWRAP is one reader (isWrapper's five
 * WRAPPERS: a parenthesis, as, satisfies, ! and <T>, nested to any depth; planted two deep) at exactly these sites, each planted
 * wrapped: a load call's callee (require-parenthesized) and its specifier (require-wrapped-specifier); a createRequire call
 * (create-require-asserted) and its callee (create-require-parenthesized); T1's assignment target
 * (create-require-wrapped-target); a holder (task-wrapped-holder, task-non-null-holder); a chain operand
 * (task-wrapped-operand); a position's value (task-wrapped-key-value, task-wrapped-ref-id); a provider
 * (forge-provider-as-const, forge-provider-satisfies, forge-provider-angle); a computed key (forge-wrapped-computed-key); a
 * const initializer (forge-provider-constant-as-const); B's assignment target (forge-wrapped-target); the frozen initializer
 * (frozen-as-const); and a + chain's outer node (outerOf, B below). Every wrapper kind is planted: a parenthesis and as in
 * most of those, satisfies in forge-provider-satisfies and task-standalone-satisfies, ! in task-non-null-holder and
 * task-standalone-non-null, <T> in forge-provider-angle and task-standalone-angle.
 *  T, the trigger, not yet met. T1 (the release): no name package.json declares, and no name either lock declares or installs,
 *    is an @mechanical/ name, and no src module loads one. An @MECHANICAL/ NAME (isMwName; the scope is read from docs/07's
 *    MechanicalWorkflows section) starts with the scope (manifest-dependency) or holds node_modules/ followed by the scope
 *    anywhere in it (lock-path, lock-nested), case-sensitive; a path holding the scope elsewhere (lock-workspace-path), a
 *    longer scope (near-scope), an upper-case scope (upper-scope) and an unscoped name (unscoped-name, R-PACKAGE-NAME) are
 *    not. DECLARED NAMES (declaredNames), of a manifest and of every lock entry alike: the entry's own name when it is a string
 *    (manifest-own-name, lock-own-name), and each of six dependency fields - dependencies, devDependencies,
 *    optionalDependencies, peerDependencies, bundleDependencies, bundledDependencies - read as a map, its keys
 *    (manifest-dependency, manifest-dev, manifest-optional, manifest-peer, manifest-bundled-map, manifest-bundled-spelling-map)
 *    and the package each npm: alias spec names (a spec that starts "npm:", then "<name>" or "<name>@<range>", a scoped name's
 *    own @ kept: manifest-npm-alias with a range, lock-alias-spec without), or as a list, its string items
 *    (manifest-dependency-list, manifest-dev-list, manifest-optional-list, manifest-peer-list, manifest-bundled,
 *    manifest-bundled-spelling; a non-string item is skipped, manifest-list-non-string); another spec (manifest-git-spec,
 *    manifest-jsr-spec, and manifest-npm-infix, whose npm: is not its start) and another field (manifest-overrides) are not read
 *    (R-SPEC-FORM); an entry that is not an object declares nothing (lock-null-entry, whose path key still reads, and
 *    lock-not-object). A LOCK (lockNames) adds its own declared names (a v1 lock's top-level dependencies keys among them:
 *    lock-v1-dependencies; a v1 lock's nested maps are not read, lock-v1-nested: R-LOCK-NESTING), every packages key - its
 *    install paths (lock-path, lock-nested) - and every packages entry's declared names (lock-declared, lock-entry-name); both
 *    real locks are held at lockfileVersion 3. LOADS (specifiersOf), read through the TypeScript parser, each with a
 *    string-literal specifier (a call's may be a template without substitution: require-template): an import declaration,
 *    named (import-static), default (import-default), namespace (import-namespace), type-only (import-type) or side-effect
 *    (import-side-effect); an export-from declaration, star (export-from), named (export-named-from), namespace
 *    (export-namespace-from) or type-only (export-type-from); import-equals of an external module reference (import-equals; of
 *    a namespace member it is no load: import-equals-entity); a call of import (dynamic-import) or of the bare name require
 *    (require); an import type node with a string literal (import-type-node; a type reference there is no load,
 *    import-type-reference); a triple-slash types or path reference (reference-types, reference-path); and a call of a require
 *    a CREATE-REQUIRE CALL made - a call whose callee is the bare name createRequire or a property access named createRequire,
 *    whatever binds that name (create-require-member; a local function so named reads too, create-require-local) - through a
 *    name a variable declaration binds to one, const (create-require-bound), let (create-require-let) or var
 *    (create-require-var), or a name an assignment binds to one, by = (create-require-assigned), ??=
 *    (create-require-nullish-assigned), ||= (create-require-or-assigned) or &&= (create-require-and-assigned), or such a call
 *    called directly (create-require-direct); a call with no argument loads nothing (require-no-argument). Not read (R-LOAD-FORM,
 *    each a quiet row): a specifier that is not a literal (dynamic-specifier, require-template-substitution), a require alias
 *    (require-alias) or member (require-member, require-resolve-bare), a callee that is a string spelled require or createRequire
 *    (require-string-callee, create-require-string-callee), a renamed createRequire import (create-require-renamed), another
 *    member (create-require-other-member), a resolution (require-resolve), createRequire reached by an element access
 *    (create-require-element), a createRequire-made require held by destructuring (create-require-destructured), a parameter
 *    default (create-require-parameter) or a property (create-require-property), a name a compound += or an assignment of
 *    anything else binds (create-require-compound, assigned-other), and an import type with a template literal type
 *    (import-type-template); nor a JSDoc import type (kind-js-jsdoc, R-JSDOC-TYPE); an ordinary module's load reads but names no
 *    @mechanical/ package (import-other).
 *    T2 (the consumer): no src file (any src file, module or not) spells the program's words; the files that do are exactly the
 *    bound consumers MW_COMPOSITION_CONSUMERS (empty today both ways: a module that starts consuming must be bound, and a bound
 *    path that spells nothing is stale). SPELLING: the program slug's words in order (read from the Citation), case-insensitive,
 *    anywhere in the text, with any run of code units other than an ASCII letter or digit between each pair, or none - the
 *    separator class [^A-Za-z0-9]*, read wide so the census fails closed on a separator nobody listed (planted: snake-case,
 *    embedded, spaced, program-slug, type-name and dotted spell, letter-separated does not; a COMPUTED SCAN plants every BMP code
 *    point between the words and holds the 62 ASCII letters and digits as the only code points that leave them unspelled) - read
 *    after every REQUIREMENT ID is blanked: each match of \b(?:MW-)?CAC-WORKFLOW-COMPOSITION-R\d+\b (global, case-sensitive)
 *    replaced by a space (blanked, so quiet: requirement-id with its MW- lead, requirement-id-bare without it,
 *    requirement-id-two-digit, requirement-id-twice, requirement-id-hyphen-after, requirement-id-hyphen-before and
 *    requirement-id-lead-embedded, all R-REQUIREMENT-ID; no id, so they spell: requirement-id-no-digits, requirement-id-embedded,
 *    requirement-id-suffixed and requirement-id-lowercase; the blank is a separator, so the words around a blanked id still
 *    spell: requirement-id-between; a COMPUTED SCAN plants every BMP code point just before and just after
 *    an id and holds the ones next to which the text spells: before, the 63 of \w; after, the 52 ASCII letters and the
 *    underscore, since a digit there lengthens the number). The two READERS the trigger names are found by their tool names in
 *    src modules (literalSites: a string literal or a template without substitution equal to the name, reader-literal and
 *    reader-template; a comment, a name longer on either side, a template with a substitution and an identifier so named are
 *    not one: reader-comment, reader-longer, reader-longer-prefix, reader-template-substitution and reader-identifier) and
 *    spell none of it. A consumer that never spells the program (unspelled-consumer, R-UNSPELLED-CONSUMER) is not T2's;
 *    FC-FIELD refuses it.
 *  A, clause (a), ARMED: the contract a consumer must meet, run today on synthetic bindings and on every bound consumer (none).
 *    A consumer is read as one function from a composition (steps and sources, each row carrying its producer reference
 *    {provider, type, id, scope?} or not) to a projection {refs: [{row, ref}], unmapped: {count, rows: [{row, reason}]}}. Two
 *    in-memory fixtures (F1 every row carries a producer id: a Beads task, a Forge operation, a Furnace Attempt and a scoped
 *    Forge gate step; F2 rows lacking one: no reference, a reference with no id, a reference with an empty id, beside one
 *    complete row). A row LACKS a producer id (hasId false) when it has no reference, or its reference's id is not a string (no
 *    id) or is the empty string. Five CHECKS (judgeProjection) judge a projection, each clause named with the MUTANT binding
 *    that pins it (a judge without that clause reads the mutant differently, so the pin's witness - every mutant's checks on
 *    each fixture - reds): foreign, a projected ref under a row with a producer id that is not that row's producer reference,
 *    provider (swap-provider), type (retype), id (rewrite-id) and scope (add-scope on unscoped rows, drop-scope on the scoped
 *    one) compared by sameRef, or a ref that names no fixture row (ghost-row); lost, a row's producer reference not projected
 *    for that row (drop-ref; swap-rows, every ref projected under the next row: A1 reads "projects only ... equal to the
 *    producer ids" as set equality per row, since a consumer projecting nothing would meet "only" vacuously); uncounted, a row
 *    lacking a producer id not listed among the unmapped rows (drop-unmapped, count-only) or listed under a reason other than
 *    unmapped or unavailable (reason-pending, one of F2's three rows, so the check reads any row, never all); miscounted, the
 *    count differs from the listed rows (count-only) or from the rows lacking an id (drop-unmapped; miscount differs from
 *    both); minted, a ref projected for a row lacking a producer id - no reference (mint-task, mint-attempt, mint-gate,
 *    mint-and-count, each over every lacking row), no id (mint-undefined-id, its id spelled String(undefined), the row still
 *    counted) or an empty id (mint-empty-id, its own empty id, the row still counted). A1 pins foreign and lost, A2 uncounted
 *    and miscounted, A3 minted. The honest binding fires none on either fixture, and its own projection is pinned (every
 *    producer reference verbatim, its scope included; a row with no reference counted unmapped, a reference with no or an empty
 *    id unavailable); each of the eighteen mutants fires at least one check, and every check fires. Each check's ACCEPTING side
 *    is pinned by a QUIET binding the judge reads as honest, no check firing on either fixture: swap-reasons (each lacking row
 *    under the other counted reason: either reason counts for any lacking row), reorder-refs and reorder-unmapped (no order is
 *    read), duplicate-ref (a ref projected twice for its row is no foreign ref) and undefined-scope (an unscoped ref carrying
 *    scope undefined: scopes compare by value).
 *  B, clause (b): the static census over src. A CONSTRUCTION (piecesOf) is a template literal with a substitution, or a + chain
 *    holding a string literal or a template without substitution and a value (a template inside a chain is read in place,
 *    task-template-chain and task-template-literal-chain; a chain's operands are read through the wrappers and through the nested
 *    chains they wrap, task-wrapped-operand and task-parenthesized-chain); a chain of values alone is not one (R-VALUE-CHAIN),
 *    and another operator builds no chain ("wb-" === step.stepId: task-other-operator). A template reads on its own wherever it
 *    sits. A + chain reads ONCE, at the chain no + chain holds past its wrappers (outerOf): standalone, under each wrapper kind
 *    and at each site, it reads in the prefix form (task-standalone-parenthesized, task-standalone-as,
 *    task-standalone-satisfies, task-standalone-non-null, task-standalone-angle, task-standalone-receiver
 *    as a member call's receiver and task-standalone-argument as a parenthesized argument, and the seven attempt-standalone
 *    forms), and an operand chain behind each wrapper kind reads only through its outer chain (task-inner-parenthesized,
 *    task-inner-as, task-inner-satisfies, task-inner-non-null and task-inner-angle each read as one construction holding the
 *    outer value's field too). Its values read a COMPOSITION FIELD (fieldsOf), in the filing's words (the title's "step and
 *    source-artifact IDs", clause (b)'s "composition fields"), when its values hold any of these: (1) a NAME - an identifier
 *    (task-template), a #private name read by its name without the # (task-private-field), or a string or
 *    template-without-substitution element key (task-kebab-key, task-template-element-key, task-spaced-element-key; a field
 *    name any other string holds is not read, row.get("stepId"): task-field-string-argument, R-FIELD-STRING) - whose words
 *    (wordsOf: split at camelCase humps, an acronym's included, underscores, hyphens and white space, lower-cased) open with
 *    the field words of "step" or "source-artifact", each singular or plural, then "id" or "ids" (stepId, stepID
 *    task-acronym-field, step_id task-snake-field, stepsIds task-plural-field, source-artifact-id, "step id", stepIdList
 *    task-field-trailing-word, _stepId task-leading-underscore-field, its leading underscore splitting off no word; a word
 *    before the field word reads nothing: rawStepId task-field-leading-word, #rawStepId task-private-leading-word); (2) an ID
 *    MEMBER - a property access, or a string or template-without-substitution element access, named "id" or "ids" (a #private
 *    one by its name: task-private-member) - of a HOLDER whose words are exactly a field word's, each singular or plural
 *    (step.id task-member-id, batch.step.id task-nested-holder, steps[0].id attempt-element-id, sourceArtifact["id"]
 *    attempt-element-member, sourceArtifact[`id`] attempt-template-element-member, sourceArtifacts.ids task-ids-member,
 *    step?.id task-optional-member, this.#step.id task-private-holder), the holder named by an identifier or by a property
 *    access's member name (a #private one by its name) and read through wrappers and element accesses; a longer holder name
 *    reads nothing (stepInfo.id
 *    task-holder-longer-name, this.#stepInfo.id task-private-holder-longer), nor does a two-word holder matching one field
 *    word (sourceCode.id task-holder-half-match); a holder named by a string element key or returned by a call is not read
 *    (task-holder-element-key, task-holder-call: R-HOLDER-FORM), nor is an id member through a key that is not a string
 *    (step[id], step[KEY]: task-member-identifier-key, task-member-const-key, R-MEMBER-KEY); or (3) a name whose first word
 *    begins "composition" (task-composition-word; decomposition and rawComposition read nothing: task-decomposition,
 *    task-later-composition-word). The bare words step and steps are not fields (R-FIELD-SPELLING; measured: forgeGateStepRef
 *    builds Forge's gate-step id from the server's operation id and a step name, src/workbench/forge-operation-observer.ts, the
 *    quiet forge-gate-step-name). A construction is in a FAMILY when (prefix, prefixFamilies) the literal text accumulated since
 *    the previous value (or the start), just before any one of its values, matches prefixPattern: a token opening with a prefix
 *    of clause (b), case-sensitive (task-upper-prefix reads nothing) - "bd-" or "wb-" for a task id (B1), "frn-" for a Furnace
 *    Attempt id (B3) - where no ASCII letter or digit precedes the prefix, running on in ASCII letters, digits, dots, underscores
 *    and hyphens to the end of that text (a COMPUTED SCAN per prefix plants every BMP code point just before the prefix and as
 *    the token's next character, and holds the 62 ASCII letters and digits as the only blocking ones and the 65 of
 *    [A-Za-z0-9._-] as the only running ones; planted: task-digit-preceded, task-upper-preceded and task-embedded-prefix blocked,
 *    task-underscore-preceded, task-hyphen-preceded and task-dot-preceded open, task-token-chars runs, task-token-broken and
 *    task-token-colon break, task-later-value-prefix reads only the text since the previous value, task-split-around-value
 *    joins no text across a value, task-trailing-prefix's text after the last value is before no value, and the split literal
 *    "w" + "b-" accumulates: task-split-literal) - or (position) its whole expression, through wrappers, is the id property
 *    (another property reads nothing: forge-other-property) of an object literal whose provider property (another key holding
 *    a provider's name reads nothing: forge-provider-other-key) reads as a family's native provider (beads, forge, furnace:
 *    task-native-ref,
 *    forge-native-ref, attempt-native-ref; any other provider reads nothing: other-provider-ref), or the value a FAMILY ID KEY
 *    binds (taskId, workId, beadsWorkId, issueId; operationId, gateId, gateStepId; attemptId, furnaceAttemptId -
 *    normalizedKey: lower-cased, underscores and hyphens dropped, a #private name's leading # dropped, a # elsewhere kept
 *    (forge-key-inner-hash reads nothing):
 *    task-id-key, task-work-key, task-beads-work-key, task-issue-key,
 *    task-hyphen-key, forge-id-key, forge-gate-key, attempt-id-key, attempt-furnace-key; a longer key is not one:
 *    task-key-longer).
 *    A provider or a key reads (textsOf, namesOf) as written in a string literal or a template without substitution
 *    (forge-provider-template), or through a name a const declaration of the same module binds to one, in any scope
 *    (forge-provider-constant, forge-provider-template-constant, forge-key-constant; the shorthand { provider } names it,
 *    forge-provider-shorthand; a name several const declarations bind reads as each, forge-shadowed-constant); a key reads as an
 *    identifier, a string or a computed key (forge-computed-key, forge-wrapped-computed-key). An id key binds its value as an
 *    object literal property, an assignment (=, ??=, ||= or &&=: forge-assignment, forge-nullish-assignment, forge-or-assignment,
 *    forge-and-assignment; a comparison binds nothing, forge-key-comparison, nor does a compound +=, R-COMPOUND-KEY) to a name
 *    (forge-name-assignment), a property, a #private property (forge-private-assignment) or an
 *    element whose key so reads (forge-element-assignment, forge-element-key-constant), a variable declaration, const, let or var
 *    (forge-declaration, forge-let-declaration, forge-var-declaration), a parameter default (forge-parameter-default), a
 *    destructuring default, object or array, under its property name when aliased (forge-destructuring-default,
 *    forge-array-destructuring-default, forge-destructuring-alias; a nested pattern's default reads through its own object
 *    literal, forge-nested-destructuring), or a class property, plain, static, accessor or #private
 *    (forge-class-property, forge-static-property, forge-accessor-property, forge-private-field). A Forge operation or gate id
 *    (B2) has no prefix in clause (b), so it is read by position only (forge-gate-ref: a chain holding a literal as a forge id).
 *    The walk reads every src module git lists (git ls-files --cached --others --exclude-standard: tracked or untracked, never
 *    ignored) and requires that listing to equal a filesystem walk of src with no symlink under it (held live: an ignored file
 *    or a symlink under src reds B1), over SRC_FLOOR modules, then the planted modules through the same call (a src path is
 *    one that starts "src/":
 *    examples-src-module, holding src/ further in, is not, R-SCOPE); pinned: the real modules hold no construction of any
 *    family, each planted form reads as recorded, and each B pin's witness lists the planted modules holding a construction of
 *    its family (inFamily), read by the same family filter as the live list (each pin plants one construction of another
 *    family only, held in its controls and outside its list: task-other-family, forge-other-family, attempt-other-family).
 *  C, clause (c): C1 docs/07's MechanicalWorkflows section (its one level-2 heading naming MechanicalWorkflows under the page
 *    title, a level-3 one not counted, read through the shared rendered view, HTML-free) holds the holder's sentence as
 *    exactly one paragraph (a list item is no paragraph), whole and once, carrying the program status word "design-only" as a
 *    whole word (wb-kku9.2 clause (c); case-sensitive, status-capitalized; an ASCII letter, digit, underscore or hyphen on
 *    either side breaks it, punctuation does not: the STATUS_PLANTS, and a COMPUTED SCAN plants every BMP code point on each
 *    side and holds those 64 as the only breaking ones) in one sentence (a full stop followed by white space and an ASCII
 *    capital letter ends a sentence; a question mark, an exclamation mark, a stop before a lower-case word and an unspaced
 *    stop do not: the SENTENCE_PLANTS, and a COMPUTED SCAN plants every BMP code point as the stop, the gap and the next
 *    capital and holds the full stop, the 25 white-space code points of \s and the 26 capitals as the only ones that end a
 *    sentence there); planted documents with the sentence dropped, doubled, moved to another section, extended, listed or led
 *    by other words, or the page retitled, read 0, 2, 0, 1, 0, 1 and 0 paragraphs, none held whole and once (a paragraph holds
 *    the sentence anywhere in it: prefixed), a planted HTML block reads as HTML, and
 *    a second MechanicalWorkflows heading (one naming more, secondHeading, or the bare name, secondHeadingBare), a replaced or
 *    embedded status word and a second sentence each read as such. C2 the holder, test/workbench-docs07-provider-rules.census.ts
 *    (the wb-6hb.11 census leg: a file whose name ends with .census.ts (a .census.ts further in is none: holder-census-infix)
 *    and whose text opens with that leg's header - after a lead line, or under another
 *    leg's title, it does not - and that imports the shared helper's judge from ./helpers/census.js by its imported name: an
 *    aliased import reads; another export renamed judge, a namespace import and a default import do not), carries row W1's
 *    identity FROZEN_W1, read from its source through the TypeScript parser (the elements of the array literal bound to that
 *    name:
 *    a string literal or a template without substitution reads as its text, any other element as non-literal): its quote line is
 *    the live sentence and its pin lines bind exactly this file's pins T1-T2 (today), A1 (producer-references-only), A2
 *    (counted-unmapped) and A3, B1-B3 (never-mints) by file, describe path, verbatim title and the default tier. Planted holders
 *    failing each shape clause, an aliased judge import, and planted frozen literals (literal, non-literal element, another
 *    name, not an array, wrapped, template elements, a declaration without an initializer) read as such. The holder's own
 *    cases judge the default gate's report with that
 *    judge: its AC case holds its TABLE row to FROZEN_W1 and its report judge holds every pin to this file's registered, passing,
 *    asserting cases.
 * FAIL CLOSED (R-B90: outside each enumerated reading the census refuses instead of passing; each held live and on the plants):
 *   FC-SCOPE (T1's witness): no src file's text (any src file, module or not) and no text of package.json or either lock holds
 *     the package scope (holdsScope: a case-sensitive substring test of the derived scope, whatever form holds it - a load, a
 *     string, a comment; npm names are lower-case, and upper-scope holds none), so each T1 residual's quiet row whose text
 *     spells the scope is refused: R-LOAD-FORM's rows but require-template-substitution (its scope is assembled from a
 *     substitution), R-SPEC-FORM's jsr:, overrides and npm:-infix rows, R-LOCK-NESTING's, R-MODULE-KIND's .ts.md file and
 *     R-JSDOC-TYPE's module.
 *   FC-FIELD (B1's witness): the src modules naming a composition field anywhere - not only inside a construction - are exactly
 *     MW_FIELD_MODULES (empty today; a module that starts naming one is refused until its own cut binds it there). fieldNames,
 *     through liveFieldNames for the live modules and the planted ones alike, reads with B's own field tests each identifier
 *     or #private name, each string literal or template without substitution wherever it sits, and each id member, so every
 *     unread construction form over a named field is refused: R-INDIRECT's, R-CALL-FORM's, R-PREFIX-CONSTANT's, R-COMPOUND's,
 *     R-FIELD-STRING's, every B2 residual's and R-UNSPELLED-CONSUMER's quiet rows.
 *   OPEN (no fail-closed reader refuses them; each residual's open rows are held to the roster and to the witness):
 *     R-PACKAGE-NAME, R-SPEC-FORM's github: row, R-LOAD-FORM's assembled specifier, R-REQUIREMENT-ID (a cited id is
 *     deliberately no consumer), R-SCOPE (clause (b)'s scope is src), R-HOLDER-FORM, R-MEMBER-KEY and R-FIELD-SPELLING (a field
 *     spelled outside the field forms names none).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, constants, residuals and every pin's
 * witness are held to the out-of-file roster test/fixtures/mw-composition-ref-roster.json, and the roster's producer block is
 * held whole, every field, to the literal PRODUCER_MW. OUTSIDE ANCHORS (the judged-set case): the owner filing in the tracked
 * export (.beads/issues.jsonl, the bead's Citation line): row T's label is its trigger sentence and rows A-C's labels are its
 * three acceptance clauses, each row's pin quotes tile its label with nothing but separators between them (quoteStarts and
 * unquoted: a quote starts at a word start, ends at a word end or before a comma, semicolon or full stop that white space or the
 * end follows, and sits once, and the words no quote covers form the runs, a label's "(x) " lead - x one lower-case letter -
 * dropped at its start only; each rule planted both ways in MEMBERSHIP_PLANTS and each boundary a COMPUTED SCAN, the readings
 * held to the roster's membership block), and every pin is load-bearing, so a pin or a row removed from ROWS, IMPL, the frozen
 * literal and the roster together still reds; the constants the readers use are derived at run time from the same texts (the
 * type and the field words from the title, the program slug from the citation, the prefixes and the field word "composition"
 * from clause (b), the package scope from docs/07's MechanicalWorkflows section, the holder from wb-kku9.2's clause (c)),
 * never retyped; the producer block's filing fields are anchored to the same texts (the filing pin extends the pin the
 * Citation cites :6 at, which the title carries; both blob maps name exactly the files the Citation cites at that pin; the tip
 * spellings hold the cited program document; both :6 lines open with the filing quote's first sentence, which names the type;
 * the tip's README status is the design-only status the Citation reads; the repository is the one docs/07's
 * MechanicalWorkflows section cites as its current evidence); the
 * holder's row W1 and the live docs/07 sentence sit outside this file. Each pin's witness carries its own planted inputs, so a
 * pin rewritten to another's body reds the compare; the records case reads that every registered pin ran to its compare.
 * RESIDUALS (named; each has a pinned quiet row and a live twin among the planted inputs of the pin named; the judged-set case
 * holds every quiet row at nothing and every twin reading in the held witness, and each quiet row open or refused as its
 * residual's open list says):
 *   R-PACKAGE-NAME (T1) a MechanicalWorkflows release outside the @mechanical/ scope is not read (quiet, open: an unscoped
 *     "mechanical-workflows" dependency; twin: an @mechanical/ dependency).
 *   R-SPEC-FORM (T1) a dependency naming MechanicalWorkflows by a spec other than an npm: alias (git, github, jsr, file, link or
 *     a tarball URL) under a key outside the scope, or an overrides entry, is not read from package.json alone (a lock entry
 *     that declares the scoped name does read: lock-entry-name) (quiet: a github: spec, open; a jsr: spec, an overrides entry and
 *     a spec holding npm: after its start, refused by FC-SCOPE; twin: the npm: alias).
 *   R-LOAD-FORM (T1) the load forms LOADS does not list are not read (quiet, each refused by FC-SCOPE but the assembled one:
 *     import() of a const name, require() of a template with a substitution (open), a require alias, module.require,
 *     require.resolve, string callees spelled require and createRequire, a renamed createRequire import, another member, a
 *     createRequire(...).resolve call, module["createRequire"](...), a createRequire-made require held by destructuring, a
 *     parameter default or a property, a compound += and an assignment of another value, and an import type with a template
 *     literal type; twin: a call of a createRequire-made require).
 *   R-LOCK-NESTING (T1) a v1 lock's nested dependencies and requires maps are not read (both real locks are lockfileVersion 3,
 *     held in the witness) (quiet, refused by FC-SCOPE: a v1 lock with @mechanical/ names nested under an ordinary entry; twin: a
 *     v1 top-level dependency).
 *   R-MODULE-KIND (T1) a src file outside the eight module extensions is not parsed (quiet, refused by FC-SCOPE: the module-kind
 *     plant's text as a .ts.md file; twin: the same text as a .ts module).
 *   R-JSDOC-TYPE (T1) a JSDoc import type is not a load (the parser keeps JSDoc in comments) (quiet, refused by FC-SCOPE: a .js
 *     module's @typedef {import("@mechanical/...")}; twin: an import type node).
 *   R-REQUIREMENT-ID (T2) a src file whose only spelling is a requirement id is not a consumer (quiet, open: MW-CAC-WORKFLOW-
 *     COMPOSITION-R1, this bead's own CAC-WORKFLOW-COMPOSITION-R1, a two-digit id, two ids in one comment, an id with a hyphen
 *     after its digits or before it, and one after XMW-; twin: the type name).
 *   R-UNSPELLED-CONSUMER (T2) a consumer that never spells the program's words or loads an @mechanical/ package (a module mapping
 *     steps and sourceArtifactId fields of some JSON) is not read as one by T2 (quiet, refused by FC-FIELD: that module; twin:
 *     the type name).
 *   R-SCOPE (B1) clause (b)'s scope only: a construction in qa/, test/ or examples/ is not judged (quiet, open: the task plant as
 *     a TypeScript module under qa/ and under examples/src/; twin: the same text under src).
 *   R-INDIRECT (B1) a field copied into a binding of another name before the construction is not traced (quiet, refused by
 *     FC-FIELD: `const k = step.stepId` then `wb-${k}`; twin: the direct template).
 *   R-CALL-FORM (B1) a prefix joined by a call is not read (quiet, refused by FC-FIELD: "wb-".concat(...) and
 *     ["wb", ...].join("-"); twin: the template).
 *   R-PREFIX-CONSTANT (B1) a prefix held by a named constant is not read (quiet, refused by FC-FIELD: `${PREFIX}${...}`; twin:
 *     the split-literal concatenation "w" + "b-" + ..., which reads, since literal pieces accumulate up to the value).
 *   R-COMPOUND (B1) a compound += is not a + chain: the prefix it extends is held in its target (quiet, refused by FC-FIELD:
 *     `let id = "wb-"` then `id += step.stepId`; twin: the + chain "bd-" + ...).
 *   R-HOLDER-FORM (B1) an id member whose holder is named by a string element key or returned by a call is not read (quiet, open:
 *     `wb-${row["step"]?.id}` and `wb-${steps.at(0)?.id}`; twin: step.id).
 *   R-MEMBER-KEY (B1) an id member reached through a computed key that is not a string is not read (quiet, open: `wb-${step[id]}`
 *     with a parameter named id, and `wb-${step[KEY]}` with const KEY = "id"; twin: step.id).
 *   R-FIELD-STRING (B1) a field name held by a string other than an element key is not read (quiet, refused by FC-FIELD:
 *     `wb-${row.get("stepId")}`; twin: the element key row["source-artifact-id"]).
 *   R-VALUE-CHAIN (B2) a + chain of values alone is not a construction (quiet, refused by FC-FIELD: `base + step.stepId` as a
 *     forge native reference's id; twin: a chain holding a literal, composition.compositionId + ":lint").
 *   R-NAME-BINDING (B2) a provider or key held other than by a literal or a same-module const binding is not read (quiet, refused
 *     by FC-FIELD: an imported constant, a let binding, an object member and a destructured const; twin: the same-module const).
 *   R-KEY-ACCESSOR (B2) a family id key's value returned by a getter or a method is not read (quiet, refused by FC-FIELD:
 *     `get operationId()` and `operationId()` returning the template; twin: the property).
 *   R-COMPOUND-KEY (B2) a compound += to a family id key is not read (quiet, refused by FC-FIELD: `target.operationId +=
 *     step.stepId`, and the same with a template on the right; twin: the assignment with =).
 *   R-ID-POSITION (B2) a Forge id built outside the native-reference literal and the id-key bindings is not read (quiet, refused
 *     by FC-FIELD: a template passed to forgeOperationRef; twin: the same template as a forge native reference's id).
 *   R-POSITION-BINDING (B2) a construction bound to another name before it reaches a position is not traced (quiet, refused by
 *     FC-FIELD: `const id =` the template, then a forge native reference's shorthand id, and `const value =` the template, then
 *     `{ operationId: value }`; twin: the template as a forge native reference's id).
 *   R-FIELD-SPELLING (B3) a composition field spelled outside the field forms is not read, the bare step words included, and
 *     FC-FIELD names none (quiet, open: `frn-atm-${node.key}` and `frn-${step}`; twin: `frn-atm-${step.stepId}`).
 * OVER-READS (disclosed and pinned by a plant each; none today: src's one family construction from a value is the Forge
 * gate-step id, which reads no field): any name whose first word begins "composition", any name whose words open with a field
 * word and "id" (stepIdList) and any id member of a holder named for a field word reads as a composition field; a family prefix
 * inside prose ("see wb-${...}", task-prose-prefix) or after a hyphen, underscore or dot ("x_wb-${...}") reads as a construction;
 * a provider or key name bound by several const declarations of one module reads as each of their values (scopes are not
 * resolved); a call of any function named createRequire makes a require (create-require-local); and the wide T2 separator and
 * both FAIL CLOSED readers refuse texts that load nothing and construct nothing (to FC-FIELD a type named Composition is a
 * field name too: import-type-template, import-type-reference) - each fails closed.
 * NOT CLAIMED: the armed contract is this census's reading of an unpublished type (a consumer whose own cut takes another shape
 * re-measures row A with it); whether W11 (wb-04s) or VC-3 (wb-w12) decided a consumer is read only through src and the
 * manifests; Git revisions and HyperUnix answers (the remote tip's widened list) are not clause (b)'s families; that a producer
 * reference resolves in its producer; that the listing excludes ignored files is held only live (no in-memory plant reaches git);
 * code points outside the BMP are not scanned (each is two surrogate code units, and every lone surrogate is scanned); and the
 * producer facts beyond the anchored ones (the remote tip, its commit time, the blob ids, the package spelling, the measuring
 * stamps) are the measuring seats' record, held to the literal only.
 * CURED (refusal #3 on cut #4, each proven red-first; the unmet items and riders it names): U1 a standalone parenthesized or
 * wrapped + chain read zero times (outerOf; the task-standalone and attempt-standalone forms, the task-inner exempt side); U2 the
 * clause sides with no case - GN01 a separator outside the named set (the separator read wide, its COMPUTED SCAN and dotted),
 * GN02 a requirement prefix without digits (requirement-id-no-digits and the boundary scan), GN03 a let or var createRequire
 * declaration (create-require-let, create-require-var); U3 #private field and holder names (memberName; task-private-field,
 * task-private-holder, task-private-member and the two exempt forms); the fifth finding's samples GN04 (task-token-colon and the
 * prefix scans) and GN06 (sentence-exclamation and the sentence scan); the sixth finding's GL3 (R-JSDOC-TYPE, refused by
 * FC-SCOPE).
 *
 * Display paths added: none (test-only; src/ is read, never edited). Scratch: none (every plant is in memory; the only spawn
 * is git ls-files; the bead export, docs, the locks and src are only read).
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import type { NativeRef } from "../src/workbench/observation.js";
import { docsSection } from "./helpers/census.js";

interface Pin {
  readonly id: string;
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}
interface Residual {
  readonly id: string;
  readonly pin: string;
  readonly quiet: readonly string[];
  readonly twin: readonly string[];
  /** The quiet rows no FAIL CLOSED reader refuses (the rest are refused by FC-SCOPE or FC-FIELD in the pin's held witness). */
  readonly open: readonly string[];
}
interface Constants {
  readonly gatingType: string;
  readonly programSlug: string;
  readonly mwScope: string;
  readonly taskPrefixes: readonly string[];
  readonly attemptPrefixes: readonly string[];
  readonly idFields: readonly string[];
  readonly compositionWord: string;
  readonly holder: string;
  readonly holderRow: string;
  readonly holderFrozen: string;
  readonly docsHeading: string;
}
interface Roster {
  readonly bead: string;
  readonly constants: Constants;
  readonly producer: { readonly mw: Readonly<Record<string, JsonValue>> };
  readonly residuals: readonly Residual[];
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: JsonValue })[] }[];
  /** The pin-membership readers' readings of their planted labels and scans (the judged-set case holds them). */
  readonly membership: JsonValue;
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SELF = "test/workbench-mw-composition-ref-census.test.ts";
const ROSTER_FILE = "test/fixtures/mw-composition-ref-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-klr7";
/** The sibling bead whose clause (c) names the docs/07 holder this bead's sentence is bound by. */
const CITATION_BEAD = "wb-kku9.2";
const DOCS07 = "docs/workbench/07-native-integrations.md";
const DOCS07_PARENT = "07 — MechanicalWorkflows and ecosystem native SDK integration";
/** The holder's row and its frozen identity literal (seat-chosen names; the holder's own AC case binds them to its TABLE). */
const HOLDER_ROW = "W1";
const HOLDER_FROZEN = "FROZEN_W1";
const TOP = "wb-klr7 MechanicalWorkflows composition-reference census (CAC-WORKFLOW-COMPOSITION-R1)";
/** Floors under the git listing and the locks: an emptied or misdirected reading reds; the judged set is every entry read. */
const SRC_FLOOR = 100;
const LOCK_FLOOR = 100;
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;

const readRepo = (path: string): string => readFileSync(join(REPO, path), "utf8");
const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
const digest16 = (value: unknown): string => createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex").slice(0, 16);
/** Plant sources spell a template substitution as "@{...}", so no ordinary string literal of this file holds the real syntax. */
const DOLLAR_BRACE = ["$", "{"].join("");
const planted = (text: string): string => text.replaceAll("@{", DOLLAR_BRACE);

const ROWS: readonly Row[] = [
  {
    id: "T",
    label:
      "a MechanicalWorkflows release publishing CACWorkflowCompositionV0 as a versioned schema/type plus a Pi consumer decided under W11/VC-3 or the workflow_catalog/workflow_inspect readers",
    pins: [
      { id: "T1", quote: "a MechanicalWorkflows release publishing CACWorkflowCompositionV0 as a versioned schema/type" },
      { id: "T2", quote: "plus a Pi consumer decided under W11/VC-3 or the workflow_catalog/workflow_inspect readers" },
    ],
  },
  {
    id: "A",
    label:
      "(a) hermetic vitest that a fixture composition carrying step/source refs projects only nativeRef identities equal to the producer ids in the fixture, and that a row lacking a producer id yields a counted unmapped/unavailable entry, never a minted id",
    pins: [
      { id: "A1", quote: "hermetic vitest that a fixture composition carrying step/source refs projects only nativeRef identities equal to the producer ids in the fixture" },
      { id: "A2", quote: "and that a row lacking a producer id yields a counted unmapped/unavailable entry" },
      { id: "A3", quote: "never a minted id" },
    ],
  },
  {
    id: "B",
    label: "(b) static census over src that no module constructs a bd/wb- task id, a Forge operation or gate id, or a Furnace frn- Attempt id from composition fields",
    pins: [
      { id: "B1", quote: "static census over src that no module constructs a bd/wb- task id" },
      { id: "B2", quote: "a Forge operation or gate id" },
      { id: "B3", quote: "or a Furnace frn- Attempt id from composition fields" },
    ],
  },
  {
    id: "C",
    label: "(c) docs/workbench/07 § MechanicalWorkflows gains one falsifiable sentence bound by the docs/07 census (wb-6hb.11 shape)",
    pins: [
      { id: "C1", quote: "docs/workbench/07 § MechanicalWorkflows gains one falsifiable sentence" },
      { id: "C2", quote: "bound by the docs/07 census (wb-6hb.11 shape)" },
    ],
  },
];

// ------------------------------------------------------------------------------------------------- the owner filing
interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The tracked export, read once (about 27 MB): every bead row this census reads comes from the same bytes. */
let EXPORT_LINES: string[] | undefined;
function beadRow(bead: string): BeadRow {
  EXPORT_LINES ??= readRepo(BEAD_EXPORT).split("\n");
  for (const line of EXPORT_LINES) {
    if (!line.includes(`"${bead}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (!isRecord(value) || value.id !== bead) continue;
    return { title: typeof value.title === "string" ? value.title : "", notes: typeof value.notes === "string" ? value.notes : "" };
  }
  throw new Error(`the bead export holds no ${bead} row`);
}
/** The filing's Citation paragraph: its own line of the notes (a later note is appended on a line of its own and binds nothing). */
const citationOf = (notes: string): string => notes.split("\n").find(line => line.startsWith("Citation: ")) ?? "";
const gatingOf = (citation: string): string => /Gating artifact: (.+?)\. Acceptance shape: /.exec(citation)?.[1] ?? "";
const clausesOf = (citation: string): string[] => (/Acceptance shape: (\(a\) .+?)\. P2: /.exec(citation)?.[1] ?? "").split(/; (?=\([a-z]\) )/);
const OWN = beadRow(BEAD);
const CITATION = citationOf(OWN.notes);
const CLAUSES = clausesOf(CITATION);
const CLAUSE_B = CLAUSES[1] ?? "";

/** Each constant the readers use, derived from the texts it names (never retyped); the roster holds the expected values. */
function deriveConstants(): Constants {
  const gatingType = /When MechanicalWorkflows ships (\S+) as a consumable artifact/.exec(OWN.title)?.[1] ?? "";
  const programSlug = /docs\/programs\/([a-z]+(?:-[a-z]+)*)-\d{4}-\d{2}-\d{2}\//.exec(CITATION)?.[1] ?? "";
  const prefixes = (pattern: RegExp): string[] =>
    (pattern.exec(CLAUSE_B)?.[1] ?? "")
      .split("/")
      .filter(part => part !== "")
      .map(part => (part.endsWith("-") ? part : `${part}-`));
  const ownWords = (/carry its (.+?) IDs as references/.exec(OWN.title)?.[1] ?? "").split(" and ").filter(word => word !== "");
  const clauseWord = /from (\S+) fields$/.exec(CLAUSE_B)?.[1];
  const mwSection = docsSection(readRepo(DOCS07), mwHeadingOf(readRepo(DOCS07)), 2, [DOCS07_PARENT]);
  const sectionText = mwSection.blocks.map(block => (block.kind === "paragraph" ? block.text : "")).join(" ");
  const mwScope = /(@[a-z]+\/)workflows-development/.exec(sectionText)?.[1] ?? "";
  const kku = beadRow(CITATION_BEAD).notes;
  const holder = /\(c\) if docs\/workbench\/07 § MechanicalWorkflows gains the wb-klr7 acceptance \(c\) sentence, it carries the status verbatim and is bound by (\S+\.ts)\./.exec(kku)?.[1] ?? "";
  return {
    gatingType,
    programSlug,
    mwScope,
    taskPrefixes: prefixes(/constructs a (\S+) task id/),
    attemptPrefixes: prefixes(/a Furnace (\S+) Attempt id/),
    idFields: ownWords,
    compositionWord: clauseWord ?? "",
    holder,
    holderRow: HOLDER_ROW,
    holderFrozen: HOLDER_FROZEN,
    docsHeading: mwHeadingOf(readRepo(DOCS07)),
  };
}
/** docs/07's one level-2 heading naming MechanicalWorkflows ("" when there is not exactly one). */
function mwHeadingOf(markdown: string): string {
  const headings = [...markdown.matchAll(/^## (.*MechanicalWorkflows.*)$/gm)].map(match => match[1] ?? "");
  return headings.length === 1 ? (headings[0] ?? "") : "";
}
const CONSTANTS = deriveConstants();

// ------------------------------------------------------------------------------------------------- pin membership
/** Each place a quote sits in a label at word boundaries: it starts a word and ends one (a trailing comma or semicolon aside). */
function quoteStarts(body: string, quote: string): number[] {
  const starts: number[] = [];
  if (quote.length === 0) return starts;
  for (let at = body.indexOf(quote); at >= 0; at = body.indexOf(quote, at + 1)) {
    const end = at + quote.length;
    if ((at === 0 || /\s/.test(body.charAt(at - 1))) && /^[,;.]?(?:\s|$)/.test(body.slice(end, end + 2))) starts.push(at);
  }
  return starts;
}
/** A label read against its row's pin quotes: the words no quote covers, and every quote not sitting in it exactly once. */
function unquoted(label: string, quotes: readonly string[]): { runs: string[]; misplaced: string[] } {
  const body = label.replace(/^\([a-z]\) /, "");
  const words = [...body.matchAll(/\S+/g)].map(match => ({ start: match.index, end: match.index + match[0].length }));
  const quoted = words.map(() => false);
  const misplaced: string[] = [];
  for (const quote of quotes) {
    const starts = quoteStarts(body, quote);
    const start = starts[0];
    if (starts.length !== 1 || start === undefined) {
      misplaced.push(quote);
      continue;
    }
    for (const [index, word] of words.entries()) if (word.start < start + quote.length && word.end > start) quoted[index] = true;
  }
  const runs: string[] = [];
  let open: number | undefined;
  for (const [index, word] of words.entries()) {
    if (!quoted[index]) open ??= word.start;
    else if (open !== undefined) {
      runs.push(body.slice(open, words[index - 1]?.end));
      open = undefined;
    }
  }
  if (open !== undefined) runs.push(body.slice(open, words.at(-1)?.end));
  return { runs, misplaced };
}

/**
 * Planted labels for the pin-membership readers (quoteStarts, unquoted), each rule both ways: a quote ends at a word end, or
 * before a comma, semicolon or full stop and then white space or the end; it starts at a word start; it sits once; the words no
 * quote covers form the runs; a label's "(x) " lead is dropped only at its start, x one lower-case letter.
 */
const MEMBERSHIP_PLANTS: Readonly<Record<string, { readonly label: string; readonly quotes: readonly string[] }>> = {
  tiled: { label: "(x) alpha beta gamma", quotes: ["alpha beta", "gamma"] },
  "comma-after": { label: "(x) alpha beta, gamma", quotes: ["alpha beta", "gamma"] },
  "semicolon-after": { label: "(x) alpha beta; gamma", quotes: ["alpha beta", "gamma"] },
  "stop-after": { label: "(x) alpha beta. gamma", quotes: ["alpha beta", "gamma"] },
  "colon-after": { label: "(x) alpha beta: gamma", quotes: ["alpha beta", "gamma"] },
  "mid-word-end": { label: "(x) alpha gamma", quotes: ["alph", "gamma"] },
  "mid-word-start": { label: "(x) xalpha gamma", quotes: ["alpha", "gamma"] },
  twice: { label: "(x) alpha gamma alpha", quotes: ["alpha", "gamma"] },
  gap: { label: "(x) alpha and gamma", quotes: ["alpha", "gamma"] },
  "trailing-run": { label: "(x) alpha gamma", quotes: ["alpha"] },
  "leading-run": { label: "(x) alpha gamma", quotes: ["gamma"] },
  "lead-not-first": { label: "alpha (c) gamma", quotes: ["alpha", "gamma"] },
  "no-lead": { label: "alpha gamma", quotes: ["alpha", "gamma"] },
  "one-char-quotes": { label: "(x) a b", quotes: ["a", "b"] },
  "empty-quote": { label: "(x) alpha  beta", quotes: ["", "alpha", "beta"] },
  "quote-trailing-space": { label: "(x) alpha , gamma", quotes: ["alpha ", "gamma"] },
};
/** The membership readers' readings: every planted label, and COMPUTED SCANS of each boundary over every BMP code point. */
function membershipReading(): JsonValue {
  const plants = Object.fromEntries(Object.entries(MEMBERSHIP_PLANTS).map(([id, { label, quotes }]) => [id, unquoted(label, quotes)]));
  const placed = (body: string): boolean => quoteStarts(body, "alpha").length === 1;
  return {
    plants,
    scans: {
      before: BMP.filter(code => placed(`${pointOf(code)}alpha gamma`)).map(hex4),
      after: BMP.filter(code => placed(`alpha${pointOf(code)} gamma`)).map(hex4),
      afterStop: BMP.filter(code => placed(`alpha,${pointOf(code)}gamma`)).map(hex4),
      lead: BMP.filter(code => unquoted(`(${pointOf(code)}) alpha`, ["alpha"]).runs.length === 0).map(hex4),
    },
  };
}

// ------------------------------------------------------------------------------------------------- the src listing
const inSrc = (path: string): boolean => path.startsWith("src/");
/** What git would commit below src: tracked or untracked, never ignored. */
function gitSrc(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(inSrc))].sort(byName);
}
function walkSrc(): { files: string[]; links: string[] } {
  const files: string[] = [];
  const links: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(join(REPO, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isSymbolicLink()) links.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(path);
    }
  };
  visit("src");
  return { files: files.sort(byName), links: links.sort(byName) };
}
interface Module {
  readonly path: string;
  readonly text: string;
}
const srcFiles = (): Module[] => gitSrc().map(path => ({ path, text: readRepo(path) }));
/** A src MODULE: a src file with one of these extensions (a declaration file's .d.ts among them); any other src file is not parsed (R-MODULE-KIND). */
const MODULE_EXTENSIONS = [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"] as const;
const isModule = (path: string): boolean => MODULE_EXTENSIONS.some(extension => path.endsWith(extension));
/** Each module parses by its extension: TSX for .tsx, JSX for .jsx, JavaScript for .js, .mjs and .cjs, TypeScript otherwise. */
const scriptKind = (path: string): ts.ScriptKind => (path.endsWith(".tsx") ? ts.ScriptKind.TSX : path.endsWith(".jsx") ? ts.ScriptKind.JSX : /\.[cm]?js$/.test(path) ? ts.ScriptKind.JS : ts.ScriptKind.TS);
const PARSED = new Map<string, ts.SourceFile>();
/** One parse per module text: every reader of this census walks the same source files. */
const parse = (module: Module): ts.SourceFile => {
  const key = `${module.path}\0${module.text}`;
  const cached = PARSED.get(key);
  if (cached !== undefined) return cached;
  const source = ts.createSourceFile(module.path, module.text, ts.ScriptTarget.Latest, true, scriptKind(module.path));
  PARSED.set(key, source);
  return source;
};

// ------------------------------------------------------------------------------------------------- the producer block
/**
 * The roster's producer block, held whole here (FROZEN SHAPE): the measuring seats' read-only record of MechanicalWorkflows (git
 * show on the local checkout at the filing pin; depth-1 scratch clones of the remote tip), never re-read by this hermetic census.
 * The judged-set case anchors its filing fields outside this file (the Citation line, the title, docs/07); the rest is the record.
 */
const PRODUCER_MW: Readonly<Record<string, JsonValue>> = {
  repository: "https://github.com/jehalladay/MechanicalWorkflows",
  measuredUtc: "2026-10-29T09:15:22Z",
  measuredBy:
    "seat ws-06 of g10-work-s125 (2026-10-28T08:49:16Z: the filing pin, and the tip at f489cee4ce20), re-read by seat ws-02 of g10-work-s136 (the filing pin's blobs and :6, and the tip at cb45df94cd8e, whose program documents are blob-identical to f489cee4ce20's), read-only: git show on the local MechanicalWorkflows checkout and depth-1 scratch clones of the remote tip; this hermetic census never re-reads the producer",
  filingPin: "4b8b974ca72bf2ed36b99e315e45857c6181fbe8",
  filingBlobs: { "01-composition-contracts.md": "f006a4760ecbb8fb0ddcbba4db4066791b58f228", "README.md": "40774a7b36f6d0cfe79d908090a4fc9818bf9a22" },
  filingLine6:
    "Use \\`CACWorkflowCompositionV0\\` as a concept only. It can point to existing workflow step and source artifact IDs, but it must not create new authoritative IDs for Beads tasks, Forge tests or Furnace attempts.",
  remoteTip: "cb45df94cd8e7d246b52861e8b88bc90de4f1975",
  remoteTipCommitted: "2026-10-28T23:14:59Z",
  tipBlobs: { "01-composition-contracts.md": "937850d83fe6814cf93a02c66c923657cc1aea42", "README.md": "8724bfbef6638e8efa371e78a7c026c28ca2dc62" },
  tipLine6:
    "Use \\`CACWorkflowCompositionV0\\` as a concept only. It can point to existing workflow step and source artifact IDs, but it must not create new authoritative IDs for Beads tasks, Forge operations/gates, Furnace attempts, Git revisions or HyperUnix answers (a non-exhaustive list).",
  tipReadme3Status: "**Design-only as of 2026-10-18 (19ca8d4): the two program documents are the only artifacts; P2–P4 plan adapter code and live runs.**",
  tipTypeSpellings: ["docs/10-current-state-and-gaps.md", "docs/programs/cac-workflow-composition-2026-10-18/01-composition-contracts.md"],
  tipPackageSpellings: ["packages/coordination/test/cacwc-doc-pins.test.ts (a test reading the program documents by path; no schema, type or export)"],
};

// ------------------------------------------------------------------------------------------------- T1: the release
/** The dependency fields of a manifest or lock entry; each is read as a map (keys and npm: alias targets) or as a list (items). */
const DEPENDENCY_MAPS = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies", "bundleDependencies", "bundledDependencies"] as const;
/** The package an npm: alias spec names ("npm:@scope/name@range", "npm:name@range", or either without a range); undefined for any other spec. */
function aliasOf(spec: unknown): string | undefined {
  if (typeof spec !== "string" || !spec.startsWith("npm:")) return undefined;
  const target = spec.slice("npm:".length);
  const at = target.indexOf("@", target.startsWith("@") ? 1 : 0);
  return at < 0 ? target : target.slice(0, at);
}
/** A manifest's or lock entry's declared names: its own name, each dependency map's keys and alias targets, each list's items. */
function declaredNames(entry: unknown): string[] {
  if (!isRecord(entry)) return [];
  const names: string[] = typeof entry.name === "string" ? [entry.name] : [];
  for (const map of DEPENDENCY_MAPS) {
    const value = entry[map];
    if (Array.isArray(value)) names.push(...value.filter((item): item is string => typeof item === "string"));
    else if (isRecord(value))
      for (const [key, spec] of Object.entries(value)) {
        names.push(key);
        const alias = aliasOf(spec);
        if (alias !== undefined) names.push(alias);
      }
  }
  return names;
}
/** A lock's own declared names (a v1 lock's top-level dependencies keys among them), its package paths (the v2/v3 packages keys) and every name each entry declares. */
function lockNames(lock: unknown): { names: string[]; packages: number } {
  if (!isRecord(lock)) return { names: [], packages: 0 };
  const names = declaredNames(lock);
  const packages = isRecord(lock.packages) ? Object.entries(lock.packages) : [];
  for (const [path, entry] of packages) names.push(path, ...declaredNames(entry));
  return { names, packages: packages.length };
}
const isMwName = (name: string): boolean => CONSTANTS.mwScope !== "" && (name.startsWith(CONSTANTS.mwScope) || name.includes(`node_modules/${CONSTANTS.mwScope}`));
/** The assignments that bind a name or an id key: =, and the logical ??=, ||= and &&= (a compound += extends its target instead: R-COMPOUND-KEY). */
const ASSIGNMENTS: readonly ts.SyntaxKind[] = [ts.SyntaxKind.EqualsToken, ts.SyntaxKind.QuestionQuestionEqualsToken, ts.SyntaxKind.BarBarEqualsToken, ts.SyntaxKind.AmpersandAmpersandEqualsToken];
/** A call of createRequire, by its bare name or as a member (module.createRequire): the require it returns loads what it is called with. */
function isCreateRequire(node: ts.Expression): boolean {
  const inner = unwrap(node);
  if (!ts.isCallExpression(inner)) return false;
  const callee = unwrap(inner.expression);
  return (ts.isIdentifier(callee) && callee.text === "createRequire") || (ts.isPropertyAccessExpression(callee) && callee.name.text === "createRequire");
}
/**
 * Every module specifier a module loads, each a string literal: import and export-from declarations, import-equals, a require()
 * call, an import() call, an import type node, a call of a require made by createRequire (a name a declaration or an = assignment
 * binds to a createRequire(...) call, or createRequire(...)(...) called directly) and a triple-slash types or path reference.
 */
function specifiersOf(module: Module): string[] {
  const source = parse(module);
  const out: string[] = [...source.typeReferenceDirectives, ...source.referencedFiles].map(reference => reference.fileName);
  const made = new Set<string>();
  const bind = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && isCreateRequire(node.initializer)) made.add(node.name.text);
    else if (ts.isBinaryExpression(node) && ASSIGNMENTS.includes(node.operatorToken.kind) && isCreateRequire(node.right)) {
      const target = unwrap(node.left);
      if (ts.isIdentifier(target)) made.add(target.text);
    }
    ts.forEachChild(node, bind);
  };
  bind(source);
  const loads = (call: ts.CallExpression): boolean => {
    if (call.expression.kind === ts.SyntaxKind.ImportKeyword) return true;
    const callee = unwrap(call.expression);
    return (ts.isIdentifier(callee) && (callee.text === "require" || made.has(callee.text))) || isCreateRequire(callee);
  };
  const visit = (node: ts.Node): void => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) out.push(node.moduleSpecifier.text);
    else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression)) out.push(node.moduleReference.expression.text);
    else if (ts.isCallExpression(node) && loads(node)) {
      const first = node.arguments[0] === undefined ? undefined : unwrap(node.arguments[0]);
      if (first !== undefined && ts.isStringLiteralLike(first)) out.push(first.text);
    } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteral(node.argument.literal)) out.push(node.argument.literal.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return out;
}
/** Every module specifier of every module, as "<path> <specifier>", in module order. */
const importSites = (modules: readonly Module[]): string[] => modules.filter(module => isModule(module.path)).flatMap(module => specifiersOf(module).map(spec => `${module.path} ${spec}`));
const specOf = (site: string): string => site.slice(site.indexOf(" ") + 1);
/** One planted manifest per declared-name form, beside controls that read nothing (R-PACKAGE-NAME, R-SPEC-FORM). */
const MANIFEST_PLANTS: Readonly<Record<string, unknown>> = {
  "manifest-dependency": { name: "planted", dependencies: { "@mechanical/workflows-composition": "^0.1.0" } },
  "manifest-dev": { name: "planted", devDependencies: { "@mechanical/workflows-development": "0.1.0" } },
  "manifest-optional": { name: "planted", optionalDependencies: { "@mechanical/workflows-coordination": "0.1.0" } },
  "manifest-peer": { name: "planted", peerDependencies: { "@mechanical/workflows-composition": ">=0.1.0" } },
  "manifest-bundled": { name: "planted", bundleDependencies: ["@mechanical/workflows-coordination"] },
  "manifest-bundled-spelling": { name: "planted", bundledDependencies: ["@mechanical/workflows-development"] },
  "manifest-dependency-list": { name: "planted", dependencies: ["@mechanical/workflows-composition"] },
  "manifest-dev-list": { name: "planted", devDependencies: ["@mechanical/workflows-development"] },
  "manifest-optional-list": { name: "planted", optionalDependencies: ["@mechanical/workflows-coordination"] },
  "manifest-peer-list": { name: "planted", peerDependencies: ["@mechanical/workflows-composition"] },
  "manifest-bundled-map": { name: "planted", bundleDependencies: { "@mechanical/workflows-coordination": "0.1.0" } },
  "manifest-bundled-spelling-map": { name: "planted", bundledDependencies: { "@mechanical/workflows-development": "0.1.0" } },
  "manifest-own-name": { name: "@mechanical/workflows-composition", version: "0.1.0" },
  "manifest-npm-alias": { name: "planted", dependencies: { "mw-composition": "npm:@mechanical/workflows-composition@0.1.0" } },
  "manifest-git-spec": { name: "planted", dependencies: { "mw-composition": "github:jehalladay/MechanicalWorkflows" } },
  "manifest-jsr-spec": { name: "planted", dependencies: { "mw-composition": "jsr:@mechanical/workflows-composition" } },
  "manifest-overrides": { name: "planted", overrides: { "@mechanical/workflows-composition": "0.1.0" } },
  "unscoped-name": { name: "planted", dependencies: { "mechanical-workflows": "^0.1.0" } },
  "near-scope": { name: "planted", dependencies: { "@mechanicalx/workflows": "1.0.0" } },
  "upper-scope": { name: "planted", dependencies: { "@MECHANICAL/workflows-composition": "0.1.0" } },
  "manifest-npm-infix": { name: "planted", dependencies: { mw: "abcd@mechanical/workflows-composition@npm:1" } },
  "manifest-list-non-string": { name: "planted", bundleDependencies: [7, "@mechanical/workflows-coordination"] },
};
/** One planted lock per lock reading: an install path (top-level and nested), an entry's declared name, key and alias, a v1 top-level map. */
const LOCK_PLANTS: Readonly<Record<string, unknown>> = {
  "lock-path": { name: "planted", lockfileVersion: 3, packages: { "": { name: "planted" }, "node_modules/@mechanical/workflows-composition": { version: "0.1.0" } } },
  "lock-nested": { name: "planted", lockfileVersion: 3, packages: { "": { name: "planted" }, "node_modules/a/node_modules/@mechanical/workflows-coordination": { version: "0.1.0" } } },
  "lock-declared": { name: "planted", lockfileVersion: 3, packages: { "": { name: "planted" }, "node_modules/a": { dependencies: { "@mechanical/workflows-development": "0.1.0" } } } },
  "lock-entry-name": { name: "planted", lockfileVersion: 3, packages: { "": { name: "planted" }, "node_modules/mw-composition": { name: "@mechanical/workflows-composition", version: "0.1.0" } } },
  "lock-alias-spec": { name: "planted", lockfileVersion: 3, packages: { "": { name: "planted", dependencies: { "mw-development": "npm:@mechanical/workflows-development" } } } },
  "lock-v1-dependencies": { name: "planted", lockfileVersion: 1, dependencies: { "@mechanical/workflows-coordination": { version: "0.1.0" } } },
  "lock-own-name": { name: "@mechanical/workflows-composition", lockfileVersion: 3, packages: {} },
  "lock-workspace-path": { name: "planted", lockfileVersion: 3, packages: { "": { name: "planted" }, "packages/@mechanical/workflows-composition": { name: "planted-workspace" } } },
  "lock-null-entry": { name: "planted", lockfileVersion: 3, packages: { "": { name: "planted" }, "node_modules/@mechanical/workflows-composition": null } },
  "lock-not-object": null,
  "lock-v1-nested": {
    name: "planted",
    lockfileVersion: 1,
    dependencies: { a: { version: "1.0.0", requires: { "@mechanical/workflows-coordination": "0.1.0" }, dependencies: { "@mechanical/workflows-composition": { version: "0.1.0" } } } },
  },
};
/** One planted module per load form, beside controls that read nothing (R-LOAD-FORM; import-other loads an ordinary module). */
const IMPORT_PLANTS: Readonly<Record<string, string>> = {
  "import-static": 'import { develop } from "@mechanical/workflows-development";\nexport const run = develop;\n',
  "import-type": 'import type { Composition } from "@mechanical/workflows-composition";\nexport type Read = Composition;\n',
  "import-side-effect": 'import "@mechanical/workflows-composition";\nexport const marker = 1;\n',
  "import-default": 'import mw from "@mechanical/workflows-development";\nexport const run = mw;\n',
  "import-namespace": 'import * as mw from "@mechanical/workflows-coordination";\nexport const run = mw;\n',
  "export-from": 'export * from "@mechanical/workflows-coordination";\n',
  "export-named-from": 'export { develop } from "@mechanical/workflows-development";\n',
  "export-namespace-from": 'export * as mw from "@mechanical/workflows-composition";\n',
  "export-type-from": 'export type { Composition } from "@mechanical/workflows-composition";\n',
  "dynamic-import": 'export const load = async (): Promise<unknown> => import("@mechanical/workflows-composition");\n',
  require: 'declare const require: (id: string) => unknown;\nexport const mw = require("@mechanical/workflows-composition");\n',
  "require-template": "declare const require: (id: string) => unknown;\nexport const mw = require(`@mechanical/workflows-coordination`);\n",
  "import-equals": 'import mw = require("@mechanical/workflows-composition");\nexport const read = mw;\n',
  "import-type-node": 'export type Read = import("@mechanical/workflows-composition").Composition;\n',
  "create-require-bound": 'import { createRequire } from "node:module";\nconst load = createRequire(import.meta.url);\nexport const mw = load("@mechanical/workflows-composition");\n',
  "create-require-direct": 'import { createRequire } from "node:module";\nexport const mw = createRequire(import.meta.url)("@mechanical/workflows-coordination");\n',
  "create-require-assigned":
    'import { createRequire } from "node:module";\nlet load: (id: string) => unknown = () => undefined;\nload = createRequire(import.meta.url);\nexport const mw = load("@mechanical/workflows-composition");\n',
  "create-require-nullish-assigned":
    'import { createRequire } from "node:module";\nlet load: ((id: string) => unknown) | undefined;\nload ??= createRequire(import.meta.url);\nexport const mw = load("@mechanical/workflows-development");\n',
  "create-require-or-assigned":
    'import { createRequire } from "node:module";\nlet load: ((id: string) => unknown) | undefined;\nload ||= createRequire(import.meta.url);\nexport const mw = load("@mechanical/workflows-coordination");\n',
  "create-require-and-assigned":
    'import { createRequire } from "node:module";\nlet load: (id: string) => unknown = () => undefined;\nload &&= createRequire(import.meta.url);\nexport const mw = load("@mechanical/workflows-composition");\n',
  "create-require-member": 'import module from "node:module";\nconst load = module.createRequire(import.meta.url);\nexport const mw = load("@mechanical/workflows-development");\n',
  "reference-types": '/// <reference types="@mechanical/workflows-composition" />\nexport const marker = 1;\n',
  "reference-path": '/// <reference path="../../node_modules/@mechanical/workflows-composition/index.d.ts" />\nexport const marker = 1;\n',
  "require-parenthesized": 'declare const require: (id: string) => unknown;\nexport const mw = (require)("@mechanical/workflows-composition");\n',
  "require-wrapped-specifier": 'declare const require: (id: string) => unknown;\nexport const mw = require(("@mechanical/workflows-development" as string));\n',
  "create-require-wrapped-target":
    'import { createRequire } from "node:module";\nlet load: (id: string) => unknown = () => undefined;\n(load) = createRequire(import.meta.url);\nexport const mw = load("@mechanical/workflows-coordination");\n',
  "create-require-asserted": 'import { createRequire } from "node:module";\nconst load = createRequire(import.meta.url) as (id: string) => unknown;\nexport const mw = load("@mechanical/workflows-composition");\n',
  "create-require-parenthesized": 'import { createRequire } from "node:module";\nconst load = (createRequire)(import.meta.url);\nexport const mw = load("@mechanical/workflows-coordination");\n',
  "create-require-let": 'import { createRequire } from "node:module";\nlet load = createRequire(import.meta.url);\nexport const mw = load("@mechanical/workflows-composition");\n',
  "create-require-var": 'import { createRequire } from "node:module";\nvar load = createRequire(import.meta.url);\nexport const mw = load("@mechanical/workflows-development");\n',
  "create-require-local": 'const createRequire = (_url: string) => (id: string): unknown => id;\nconst load = createRequire("planted");\nexport const mw = load("@mechanical/workflows-coordination");\n',
  "import-other": 'import { readFileSync } from "node:fs";\nexport const read = readFileSync;\n',
  "import-equals-entity": "namespace N {\n  export const x = 1;\n}\nimport y = N.x;\nexport const z = y;\n",
  "dynamic-specifier": 'const NAME = "@mechanical/workflows-composition";\nexport const load = async (): Promise<unknown> => import(NAME);\n',
  "require-template-substitution": planted('declare const require: (id: string) => unknown;\nconst scope = "@mechanical";\nexport const mw = require(`@{scope}/workflows-composition`);\n'),
  "require-alias": 'declare const require: (id: string) => unknown;\nconst load = require;\nexport const mw = load("@mechanical/workflows-composition");\n',
  "require-member": 'declare const module: { require: (id: string) => unknown };\nexport const mw = module.require("@mechanical/workflows-composition");\n',
  "create-require-renamed": 'import { createRequire as makeRequire } from "node:module";\nconst load = makeRequire(import.meta.url);\nexport const mw = load("@mechanical/workflows-composition");\n',
  "require-resolve": 'import { createRequire } from "node:module";\nexport const where = createRequire(import.meta.url).resolve("@mechanical/workflows-composition");\n',
  "require-resolve-bare": 'declare const require: { resolve: (id: string) => string };\nexport const where = require.resolve("@mechanical/workflows-composition");\n',
  "create-require-element": 'import module from "node:module";\nconst load = module["createRequire"](import.meta.url);\nexport const mw = load("@mechanical/workflows-composition");\n',
  "create-require-destructured": 'import { createRequire } from "node:module";\nconst { load } = { load: createRequire(import.meta.url) };\nexport const mw = load("@mechanical/workflows-composition");\n',
  "create-require-parameter": 'import { createRequire } from "node:module";\nexport function read(load = createRequire(import.meta.url)): unknown {\n  return load("@mechanical/workflows-composition");\n}\n',
  "create-require-property": 'import { createRequire } from "node:module";\nconst holder = { load: createRequire(import.meta.url) };\nexport const mw = holder.load("@mechanical/workflows-composition");\n',
  "create-require-string-callee": 'const load = ("createRequire" as unknown as (url: string) => (id: string) => unknown)(import.meta.url);\nexport const mw = load("@mechanical/workflows-composition");\n',
  "create-require-other-member": 'import module from "node:module";\nconst load = module.findLoader(import.meta.url);\nexport const mw = load("@mechanical/workflows-composition");\n',
  "create-require-compound": 'import { createRequire } from "node:module";\ndeclare let load: (id: string) => unknown;\nload += createRequire(import.meta.url);\nexport const mw = load("@mechanical/workflows-composition");\n',
  "assigned-other": 'let load = (id: string): unknown => id;\nload = (id: string): unknown => id;\nexport const mw = load("@mechanical/workflows-composition");\n',
  "require-string-callee": 'export const mw = ("require" as unknown as (id: string) => unknown)("@mechanical/workflows-composition");\n',
  "import-type-template": "export type Read = import(`@mechanical/workflows-composition`).Composition;\n",
  "require-no-argument": "declare const require: (id?: string) => unknown;\nexport const mw = require();\n",
  "import-type-reference": 'type T = "x";\nexport type Read = import(T).Composition;\n',
};
const plantPath = (id: string): string => `src/workbench/planted-${id}.ts`;
/** The text every module-kind plant carries: a load (T1), a tool name (T2's reader finder) and a task construction (B1). */
const KIND_TEXT = planted('export const mw = require("@mechanical/workflows-composition");\nexport const TOOL = "workflow_inspect";\nexport const taskOf = (step) => `wb-@{step.stepId}`;\n');
/** The same three readings inside JSX, which only a TSX or JSX parse reads. */
const JSX_TEXT = planted('export const View = (step) => <Gate id={`wb-@{step.stepId}`} tool="workflow_catalog">{require("@mechanical/workflows-coordination")}</Gate>;\n');
/** A JavaScript parse reads `require < string > (...)` as two comparisons (no load); a TypeScript parse would read a call with a type argument. */
const COMPARISON_TEXT = 'export const x = require < string > ("@mechanical/workflows-composition");\n';
/**
 * One planted module per module extension, the two JSX kinds with JSX, the three JavaScript kinds with a comparison only a
 * TypeScript parse would read as a load, and a src file of another kind (R-MODULE-KIND), read by T1, T2 and B1 alike.
 */
const MODULE_PLANTS: Readonly<Record<string, Module>> = {
  "kind-ts": { path: "src/workbench/planted-kind.ts", text: KIND_TEXT },
  "kind-dts": { path: "src/workbench/planted-kind.d.ts", text: KIND_TEXT },
  "kind-tsx": { path: "src/workbench/planted-kind.tsx", text: KIND_TEXT },
  "kind-mts": { path: "src/workbench/planted-kind.mts", text: KIND_TEXT },
  "kind-cts": { path: "src/workbench/planted-kind.cts", text: KIND_TEXT },
  "kind-js": { path: "src/workbench/planted-kind.js", text: KIND_TEXT },
  "kind-jsx": { path: "src/workbench/planted-kind.jsx", text: KIND_TEXT },
  "kind-mjs": { path: "src/workbench/planted-kind.mjs", text: KIND_TEXT },
  "kind-cjs": { path: "src/workbench/planted-kind.cjs", text: KIND_TEXT },
  "kind-tsx-jsx": { path: "src/workbench/planted-jsx.tsx", text: JSX_TEXT },
  "kind-jsx-jsx": { path: "src/workbench/planted-jsx.jsx", text: JSX_TEXT },
  "kind-md": { path: "src/workbench/planted-kind.ts.md", text: KIND_TEXT },
  "kind-js-comparison": { path: "src/workbench/planted-comparison.js", text: COMPARISON_TEXT },
  "kind-mjs-comparison": { path: "src/workbench/planted-comparison.mjs", text: COMPARISON_TEXT },
  "kind-cjs-comparison": { path: "src/workbench/planted-comparison.cjs", text: COMPARISON_TEXT },
  "kind-js-jsdoc": { path: "src/workbench/planted-jsdoc.js", text: '/** @typedef {import("@mechanical/workflows-composition").Composition} Composition */\nexport const marker = 1;\n' },
};

// ------------------------------------------------------------------------------------------------- T2: the consumer
const escaped = (word: string): string => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** The program's words in order, any run of code units other than an ASCII letter or digit (or none) between them, case-insensitive (fail closed). */
const SPELLING = new RegExp(CONSTANTS.programSlug.split("-").map(escaped).join("[^A-Za-z0-9]*"), "i");
/** A requirement id of the program's family (this bead's and its 2026-10-22 siblings'), blanked before the reading. */
const REQUIREMENT_ID = /\b(?:MW-)?CAC-WORKFLOW-COMPOSITION-R\d+\b/g;
const spells = (text: string): boolean => CONSTANTS.programSlug !== "" && SPELLING.test(text.replace(REQUIREMENT_ID, " "));
/** Every BMP code point (0000-ffff, lone surrogates included), computed, never typed: the COMPUTED SCANS plant each one. */
const BMP: readonly number[] = Array.from({ length: 0x10000 }, (_, code) => code);
const hex4 = (code: number): string => code.toString(16).padStart(4, "0");
const pointOf = (code: number): string => String.fromCodePoint(code);
/** T2's separator scan: each BMP code point planted between each pair of the program's words; the code points that leave it unspelled are held. */
const separatorReading = (): { scanned: number; quiet: string[] } => ({
  scanned: BMP.length,
  quiet: BMP.filter(code => !spells(`// CAC${pointOf(code)}workflow${pointOf(code)}composition rows\n`)).map(hex4),
});
/** T2's requirement-id boundary scan: each BMP code point planted just before and just after an id; the code points next to which it is no id (so the text spells) are held. */
const requirementBoundaryReading = (): { before: string[]; after: string[] } => ({
  before: BMP.filter(code => spells(`// ${pointOf(code)}CAC-WORKFLOW-COMPOSITION-R1 rows\n`)).map(hex4),
  after: BMP.filter(code => spells(`// CAC-WORKFLOW-COMPOSITION-R1${pointOf(code)} rows\n`)).map(hex4),
});
/**
 * The bound composition consumers: every src file that spells the program's words, each with the function the armed contract
 * runs. Empty today. A module that starts consuming binds itself here, so row A runs on it.
 */
const MW_COMPOSITION_CONSUMERS: readonly { readonly module: string; readonly consumer: Consumer }[] = [];
const SPELLING_PLANTS: Readonly<Record<string, string>> = {
  "type-name": "// Reads CACWorkflowCompositionV0 records.\nexport const reader = 1;\n",
  "program-slug": 'export const PROGRAM = "cac-workflow-composition-2026-10-18";\n',
  "snake-case": "export const cac_workflow_composition = 1;\n",
  embedded: "export function parseCacWorkflowComposition(): void {}\n",
  spaced: "// Maps CAC  workflow_-composition rows.\nexport const marker = 1;\n",
  "requirement-id": "// MW-CAC-WORKFLOW-COMPOSITION-R1: a cited requirement, not a reader.\nexport const cited = 1;\n",
  "requirement-id-bare": "// CAC-WORKFLOW-COMPOSITION-R1: this bead's own requirement id, cited without the MW- lead.\nexport const cited = 1;\n",
  "requirement-id-two-digit": "// MW-CAC-WORKFLOW-COMPOSITION-R12: a two-digit requirement number.\nexport const cited = 1;\n",
  "requirement-id-twice": "// MW-CAC-WORKFLOW-COMPOSITION-R1 and CAC-WORKFLOW-COMPOSITION-R2: two cited ids, both blanked.\nexport const cited = 1;\n",
  "requirement-id-embedded": "// XCAC-WORKFLOW-COMPOSITION-R1 is no requirement id: a spelling inside a longer word is read.\nexport const cited = 1;\n",
  "requirement-id-suffixed": "// CAC-WORKFLOW-COMPOSITION-R1x is no requirement id either.\nexport const cited = 1;\n",
  "requirement-id-lowercase": "// mw-cac-workflow-composition-r1 in lower case is no requirement id.\nexport const cited = 1;\n",
  "requirement-id-no-digits": "// CAC-WORKFLOW-COMPOSITION-R: a requirement prefix with no number is no requirement id.\nexport const cited = 1;\n",
  "requirement-id-hyphen-after": "// CAC-WORKFLOW-COMPOSITION-R1-draft: a hyphen after the digits keeps the id whole.\nexport const cited = 1;\n",
  "requirement-id-hyphen-before": "// x-CAC-WORKFLOW-COMPOSITION-R1: a hyphen before the id keeps it whole.\nexport const cited = 1;\n",
  "requirement-id-lead-embedded": "// XMW-CAC-WORKFLOW-COMPOSITION-R1: a letter before MW- leaves the id after the hyphen whole.\nexport const cited = 1;\n",
  "requirement-id-between": "// cac CAC-WORKFLOW-COMPOSITION-R1 workflow composition: the blank leaves a separator, so it spells.\nexport const cited = 1;\n",
  dotted: "// Maps cac.workflow.composition rows.\nexport const marker = 1;\n",
  "letter-separated": "// cacxworkflowxcomposition holds a letter between the words.\nexport const marker = 1;\n",
  "unspelled-consumer": "export const ids = (c: { steps: { sourceArtifactId: string }[] }): string[] => c.steps.map(step => step.sourceArtifactId);\n",
};
/** The readers the trigger names, found by their tool names among the src string literals (a string literal or a template without substitution). */
const TRIGGER_READERS = ["workflow_catalog", "workflow_inspect"] as const;
function literalSites(modules: readonly Module[], literal: string): string[] {
  return modules
    .filter(module => isModule(module.path))
    .filter(module => {
      let found = false;
      const visit = (node: ts.Node): void => {
        if (ts.isStringLiteralLike(node) && node.text === literal) found = true;
        if (!found) ts.forEachChild(node, visit);
      };
      visit(parse(module));
      return found;
    })
    .map(module => module.path);
}
/** Planted modules for the reader finder: a tool name as a string literal and as a plain template reads; a comment or a longer name does not. */
const READER_PLANTS: Readonly<Record<string, string>> = {
  "reader-literal": 'export const TOOL = "workflow_inspect";\n',
  "reader-template": "export const TOOL = `workflow_catalog`;\n",
  "reader-comment": "// workflow_inspect replies are built in the reply builders.\nexport const marker = 1;\n",
  "reader-longer": 'export const TOOL = "workflow_inspect_v2";\n',
  "reader-longer-prefix": 'export const TOOL = "my_workflow_inspect";\n',
  "reader-template-substitution": planted('const NAME = "inspect";\nexport const TOOL = `workflow_@{NAME}`;\n'),
  "reader-identifier": "export const workflow_inspect = 1;\n",
};

// ------------------------------------------------------------------------------------------------- A: the armed contract
/** A producer reference as this census reads the concept: the producer's own native key (docs/workbench/09, provider, type, id). */
interface ProducerRef {
  readonly provider: string;
  readonly type: string;
  readonly id?: string;
  readonly scope?: string;
}
interface Entry {
  readonly key: string;
  readonly producer?: ProducerRef;
}
interface Composition {
  readonly steps: readonly Entry[];
  readonly sources: readonly Entry[];
}
interface Projection {
  readonly refs: readonly { readonly row: string; readonly ref: NativeRef }[];
  readonly unmapped: { readonly count: number; readonly rows: readonly { readonly row: string; readonly reason: string }[] };
}
type Consumer = (composition: Composition) => Projection;
type Check = "foreign" | "lost" | "uncounted" | "miscounted" | "minted";
const PIN_CHECKS: Readonly<Record<string, readonly Check[]>> = { A1: ["foreign", "lost"], A2: ["uncounted", "miscounted"], A3: ["minted"] };
const FIXTURES: Readonly<Record<string, Composition>> = {
  F1: {
    steps: [
      { key: "build", producer: { provider: "beads", type: "work", id: "wb-fx01" } },
      { key: "verify", producer: { provider: "forge", type: "operation", id: "op-fx-0001" } },
      { key: "supervise", producer: { provider: "furnace", type: "attempt", id: "frn-atm-fx-0001-1" } },
    ],
    sources: [{ key: "gate", producer: { provider: "forge", type: "gate-step", id: "op-fx-0001/lint", scope: "fx-workspace" } }],
  },
  F2: {
    steps: [{ key: "plan" }, { key: "build", producer: { provider: "beads", type: "work", id: "wb-fx02" } }],
    sources: [
      { key: "context", producer: { provider: "reactivefiber", type: "render" } },
      { key: "lint", producer: { provider: "forge", type: "gate-step", id: "" } },
    ],
  },
};
const rowsOf = (composition: Composition): { row: string; producer?: ProducerRef }[] => [
  ...composition.steps.map(entry => ({ row: `step:${entry.key}`, producer: entry.producer })),
  ...composition.sources.map(entry => ({ row: `source:${entry.key}`, producer: entry.producer })),
];
const hasId = (producer: ProducerRef | undefined): producer is ProducerRef & { readonly id: string } => producer !== undefined && typeof producer.id === "string" && producer.id !== "";
const sameRef = (ref: NativeRef, producer: ProducerRef): boolean => ref.provider === producer.provider && ref.type === producer.type && ref.id === producer.id && ref.scope === producer.scope;
/** The five checks over one projection of one fixture, in check order. */
function judgeProjection(composition: Composition, projection: Projection): Check[] {
  const rows = rowsOf(composition);
  const lacking = new Set(rows.filter(entry => !hasId(entry.producer)).map(entry => entry.row));
  const fired = new Set<Check>();
  for (const { row, ref } of projection.refs) {
    const own = rows.find(entry => entry.row === row);
    if (lacking.has(row)) fired.add("minted");
    else if (own?.producer === undefined || !sameRef(ref, own.producer)) fired.add("foreign");
  }
  for (const entry of rows) {
    const producer = entry.producer;
    if (hasId(producer) && !projection.refs.some(item => item.row === entry.row && sameRef(item.ref, producer))) fired.add("lost");
  }
  const counted = new Set(projection.unmapped.rows.filter(item => item.reason === "unmapped" || item.reason === "unavailable").map(item => item.row));
  if ([...lacking].some(row => !counted.has(row))) fired.add("uncounted");
  if (projection.unmapped.count !== projection.unmapped.rows.length || projection.unmapped.count !== lacking.size) fired.add("miscounted");
  return (["foreign", "lost", "uncounted", "miscounted", "minted"] as const).filter(check => fired.has(check));
}
/** The honest binding: every producer reference verbatim, every row lacking an id counted with its reason. */
const honest: Consumer = composition => {
  const refs: { row: string; ref: NativeRef }[] = [];
  const rows: { row: string; reason: string }[] = [];
  for (const entry of rowsOf(composition)) {
    const producer = entry.producer;
    if (producer === undefined) rows.push({ row: entry.row, reason: "unmapped" });
    else if (!hasId(producer)) rows.push({ row: entry.row, reason: "unavailable" });
    else refs.push({ row: entry.row, ref: { provider: producer.provider, type: producer.type, id: producer.id, ...(producer.scope === undefined ? {} : { scope: producer.scope }) } });
  }
  return { refs, unmapped: { count: rows.length, rows } };
};
const keyOf = (row: string): string => row.slice(row.indexOf(":") + 1);
/** A binding that mints a reference for every row lacking an id (still counting it when `count` is set). */
const minting =
  (provider: string, type: string, mint: (key: string) => string, count = false): Consumer =>
  composition => {
    const base = honest(composition);
    const minted = base.unmapped.rows.map(item => ({ row: item.row, ref: { provider, type, id: mint(keyOf(item.row)) } }));
    return { refs: [...base.refs, ...minted], unmapped: count ? base.unmapped : { count: 0, rows: [] } };
  };
const mapRefs =
  (change: (ref: NativeRef) => NativeRef): Consumer =>
  composition => {
    const base = honest(composition);
    return { refs: base.refs.map(item => ({ row: item.row, ref: change(item.ref) })), unmapped: base.unmapped };
  };
/** A binding that also projects the own reference of each row whose producer reference `which` selects, its id spelled by `idOf` (the rows stay counted). */
const projectingOwn =
  (which: (producer: ProducerRef) => boolean, idOf: (producer: ProducerRef) => string): Consumer =>
  composition => {
    const base = honest(composition);
    const own = rowsOf(composition).flatMap(entry =>
      entry.producer !== undefined && which(entry.producer) ? [{ row: entry.row, ref: { provider: entry.producer.provider, type: entry.producer.type, id: idOf(entry.producer) } }] : [],
    );
    return { refs: [...base.refs, ...own], unmapped: base.unmapped };
  };
const MUTANTS: Readonly<Record<string, Consumer>> = {
  "mint-task": minting("beads", "work", key => `wb-${key}`),
  "mint-attempt": minting("furnace", "attempt", key => `frn-atm-${key}-1`),
  "mint-gate": minting("forge", "gate-step", key => `op-${key}/gate`),
  "mint-and-count": minting("beads", "work", key => `wb-${key}`, true),
  "rewrite-id": mapRefs(ref => ({ ...ref, id: ref.id.toUpperCase() })),
  "swap-provider": mapRefs(ref => ({ ...ref, provider: "pi-workflow" })),
  "add-scope": mapRefs(ref => ({ ...ref, scope: "composition" })),
  "drop-scope": mapRefs(({ provider, type, id }) => ({ provider, type, id })),
  "drop-ref": composition => {
    const base = honest(composition);
    return { refs: base.refs.slice(1), unmapped: base.unmapped };
  },
  "drop-unmapped": composition => ({ refs: honest(composition).refs, unmapped: { count: 0, rows: [] } }),
  "count-only": composition => {
    const base = honest(composition);
    return { refs: base.refs, unmapped: { count: base.unmapped.count, rows: [] } };
  },
  "miscount": composition => {
    const base = honest(composition);
    return { refs: base.refs, unmapped: { count: base.unmapped.count + 1, rows: base.unmapped.rows } };
  },
  "retype": mapRefs(ref => ({ ...ref, type: `${ref.type}-renamed` })),
  "ghost-row": composition => {
    const base = honest(composition);
    return { refs: [...base.refs, { row: "step:ghost", ref: { provider: "beads", type: "work", id: "wb-ghost" } }], unmapped: base.unmapped };
  },
  "swap-rows": composition => {
    const base = honest(composition);
    return { refs: base.refs.map((item, index) => ({ row: base.refs[(index + 1) % base.refs.length]?.row ?? item.row, ref: item.ref })), unmapped: base.unmapped };
  },
  "reason-pending": composition => {
    const base = honest(composition);
    return { refs: base.refs, unmapped: { count: base.unmapped.count, rows: base.unmapped.rows.map((item, index) => (index === 0 ? { row: item.row, reason: "pending" } : item)) } };
  },
  "mint-undefined-id": projectingOwn(
    producer => producer.id === undefined,
    producer => String(producer.id),
  ),
  "mint-empty-id": projectingOwn(
    producer => producer.id === "",
    () => "",
  ),
};
/**
 * The QUIET bindings: each differs from the honest binding only where a check's clause accepts either form, so the judge reads
 * each as honest (no check fires): a lacking row under the other counted reason, refs or unmapped rows in another order, a ref
 * projected twice for its row, an unscoped ref carrying scope undefined.
 */
const QUIET_BINDINGS: Readonly<Record<string, Consumer>> = {
  "swap-reasons": composition => {
    const base = honest(composition);
    const other = (reason: string): string => (reason === "unmapped" ? "unavailable" : "unmapped");
    return { refs: base.refs, unmapped: { count: base.unmapped.count, rows: base.unmapped.rows.map(item => ({ row: item.row, reason: other(item.reason) })) } };
  },
  "reorder-refs": composition => {
    const base = honest(composition);
    return { refs: [...base.refs].reverse(), unmapped: base.unmapped };
  },
  "reorder-unmapped": composition => {
    const base = honest(composition);
    return { refs: base.refs, unmapped: { count: base.unmapped.count, rows: [...base.unmapped.rows].reverse() } };
  },
  "duplicate-ref": composition => {
    const base = honest(composition);
    return { refs: [...base.refs, ...base.refs.slice(0, 1)], unmapped: base.unmapped };
  },
  "undefined-scope": composition => {
    const base = honest(composition);
    return { refs: base.refs.map(item => ({ row: item.row, ref: item.ref.scope === undefined ? { ...item.ref, scope: undefined } : item.ref })), unmapped: base.unmapped };
  },
};
/** One pin's reading of the armed contract: every binding on every fixture, restricted to the pin's checks. */
function contractReading(pin: string): JsonValue {
  const checks = PIN_CHECKS[pin] ?? [];
  const restricted = (consumer: Consumer): Record<string, string[]> =>
    Object.fromEntries(Object.entries(FIXTURES).map(([id, composition]) => [id, judgeProjection(composition, consumer(composition)).filter(check => checks.includes(check))]));
  for (const [id, composition] of Object.entries(FIXTURES)) expect(judgeProjection(composition, honest(composition)), `the honest binding on ${id}`).toEqual([]);
  for (const [name, consumer] of Object.entries(MUTANTS)) {
    const all = Object.entries(FIXTURES).flatMap(([, composition]) => judgeProjection(composition, consumer(composition)));
    expect(all.length, `mutant ${name} fires at least one check`).toBeGreaterThan(0);
  }
  const mutants = Object.fromEntries(Object.entries(MUTANTS).map(([name, consumer]) => [name, restricted(consumer)]));
  const fires = Object.fromEntries(checks.map(check => [check, Object.values(mutants).some(byFixture => Object.values(byFixture).some(list => list.includes(check)))]));
  for (const check of checks) expect(fires[check], `${pin}: check ${check} fires on some mutant`).toBe(true);
  const bound = Object.fromEntries(MW_COMPOSITION_CONSUMERS.map(({ module, consumer }) => [module, Object.fromEntries(Object.entries(FIXTURES).map(([id, composition]) => [id, judgeProjection(composition, consumer(composition))]))]));
  for (const [module, byFixture] of Object.entries(bound)) for (const [id, list] of Object.entries(byFixture)) expect(list, `bound consumer ${module} on ${id}`).toEqual([]);
  // The honest binding's own projection on each fixture: every producer reference verbatim, each row lacking an id with its reason.
  const projection = Object.fromEntries(Object.entries(FIXTURES).map(([id, composition]) => [id, honest(composition) as unknown as JsonValue]));
  // The quiet bindings: every check, not only the pin's, reads each as honest on each fixture.
  const quiet = Object.fromEntries(
    Object.entries(QUIET_BINDINGS).map(([name, consumer]) => [name, Object.fromEntries(Object.entries(FIXTURES).map(([id, composition]) => [id, judgeProjection(composition, consumer(composition))]))]),
  );
  return { checks: [...checks], fixtures: digest16(FIXTURES), honest: restricted(honest), projection, mutants, fires, bound, quiet };
}

// ------------------------------------------------------------------------------------------------- B: constructions
type Family = "task" | "forge" | "attempt";
const PROVIDER_FAMILY: Readonly<Record<string, Family>> = { beads: "task", forge: "forge", furnace: "attempt" };
/** The family id keys, normalized (a private name's leading # dropped, lower case, underscores and hyphens removed). */
const ID_KEYS: Readonly<Record<Family, readonly string[]>> = {
  task: ["taskid", "workid", "beadsworkid", "issueid"],
  forge: ["operationid", "gateid", "gatestepid"],
  attempt: ["attemptid", "furnaceattemptid"],
};
const normalizedKey = (name: string): string => name.replace(/^#/, "").toLowerCase().replace(/[_-]/g, "");
const familyOfKey = (name: string): Family | undefined => (Object.keys(ID_KEYS) as Family[]).find(family => ID_KEYS[family].includes(normalizedKey(name)));
/** A name's words: camelCase, snake_case and kebab-case split, lower-cased. */
const wordsOf = (name: string): string[] =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[\s_-]+/)
    .filter(word => word !== "")
    .map(word => word.toLowerCase());
const ID_FIELDS = CONSTANTS.idFields.map(word => word.split("-"));
const ID_WORDS: readonly string[] = ["id", "ids"];
/** A field word, singular or plural. */
const sameWord = (word: string | undefined, part: string): boolean => word === part || word === `${part}s`;
/** A step or source-artifact ID name (the field word, then id or ids), or a name whose first word begins with the composition word. */
const isFieldName = (name: string): boolean => {
  const words = wordsOf(name);
  if (CONSTANTS.compositionWord !== "" && (words[0] ?? "").startsWith(CONSTANTS.compositionWord)) return true;
  return ID_FIELDS.some(parts => parts.every((part, index) => sameWord(words[index], part)) && ID_WORDS.includes(words[parts.length] ?? ""));
};
/** A member name as the field and holder readers read it: an identifier's text, a #private name's text without its # (U3, cut #5). */
const memberName = (name: ts.MemberName): string => (ts.isPrivateIdentifier(name) ? name.text.slice(1) : name.text);
/** A value named for a step or a source artifact, singular or plural, exactly (its id member is a step or source-artifact ID). */
const isFieldHolder = (name: string): boolean => {
  const words = wordsOf(name);
  return ID_FIELDS.some(parts => words.length === parts.length && parts.every((part, index) => sameWord(words[index], part)));
};
/** A holder as written and as read: an identifier, or a property access's member name (a #private one by its name), through wrappers and element accesses. */
const holderNameOf = (node: ts.Expression): { readonly written: string; readonly read: string } | undefined => {
  const inner = unwrap(node);
  if (ts.isIdentifier(inner)) return { written: inner.text, read: inner.text };
  if (ts.isPropertyAccessExpression(inner)) return { written: inner.name.text, read: memberName(inner.name) };
  if (ts.isElementAccessExpression(inner)) return holderNameOf(inner.expression);
  return undefined;
};
/** An id member read off a step or source-artifact value (step.id, steps[0].id, sourceArtifact["id"], this.#step.id), as written: "<holder>.<id>". */
function memberField(node: ts.Node): string | undefined {
  let holder: { readonly written: string; readonly read: string } | undefined;
  let member: { readonly written: string; readonly read: string } | undefined;
  if (ts.isPropertyAccessExpression(node)) [holder, member] = [holderNameOf(node.expression), { written: node.name.text, read: memberName(node.name) }];
  else if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression))
    [holder, member] = [holderNameOf(node.expression), { written: node.argumentExpression.text, read: node.argumentExpression.text }];
  return holder !== undefined && member !== undefined && ID_WORDS.includes(member.read) && isFieldHolder(holder.read) ? `${holder.written}.${member.written}` : undefined;
}
const prefixPattern = (prefixes: readonly string[]): RegExp => new RegExp(`(?<![A-Za-z0-9])(?:${prefixes.map(escaped).join("|")})[A-Za-z0-9._-]*$`);
const TASK_PREFIX = prefixPattern(CONSTANTS.taskPrefixes);
const ATTEMPT_PREFIX = prefixPattern(CONSTANTS.attemptPrefixes);
/**
 * B's prefix scans, per prefix: each BMP code point planted just before the prefix (the code points that block it are held) and
 * as the token's next character after it (the code points that run the token on are held).
 */
const prefixScan = (pattern: RegExp, prefixes: readonly string[]): Record<string, { blocking: string[]; running: string[] }> =>
  Object.fromEntries(
    prefixes.map(prefix => [
      prefix,
      { blocking: BMP.filter(code => !pattern.test(`${pointOf(code)}${prefix}`)).map(hex4), running: BMP.filter(code => pattern.test(`${prefix}${pointOf(code)}`)).map(hex4) },
    ]),
  );
/** The five WRAPPERS UNWRAP reads through: a parenthesis and the type wrappers as, satisfies, ! and <T>. */
const isWrapper = (node: ts.Node): node is ts.ParenthesizedExpression | ts.AsExpression | ts.SatisfiesExpression | ts.NonNullExpression | ts.TypeAssertion =>
  ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node);
const unwrap = (node: ts.Expression): ts.Expression => {
  let current = node;
  while (isWrapper(current)) current = current.expression;
  return current;
};
/** The node an expression sits in past every wrapper around it: a + chain whose outer node is a + chain is that chain's operand. */
const outerOf = (node: ts.Node): ts.Node => {
  let current = node.parent;
  while (isWrapper(current)) current = current.parent;
  return current;
};
const isPlus = (node: ts.Node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken;
type Piece = { readonly text: string } | { readonly value: ts.Expression };
/** A string-building expression as its literal and value pieces, in order; undefined when it builds no string from a value. */
function piecesOf(node: ts.Expression): Piece[] | undefined {
  const inner = unwrap(node);
  if (ts.isTemplateExpression(inner)) {
    const out: Piece[] = [{ text: inner.head.text }];
    for (const span of inner.templateSpans) out.push({ value: span.expression }, { text: span.literal.text });
    return out;
  }
  if (!isPlus(inner)) return undefined;
  const flat: ts.Expression[] = [];
  const flatten = (expression: ts.Expression): void => {
    const current = unwrap(expression);
    if (isPlus(current)) {
      flatten(current.left);
      flatten(current.right);
    } else flat.push(current);
  };
  flatten(inner);
  if (!flat.some(part => ts.isStringLiteralLike(part) || ts.isTemplateExpression(part))) return undefined;
  const out: Piece[] = [];
  for (const part of flat) {
    if (ts.isStringLiteralLike(part)) out.push({ text: part.text });
    else if (ts.isTemplateExpression(part)) out.push(...(piecesOf(part) ?? []));
    else out.push({ value: part });
  }
  return out.some(piece => "value" in piece) ? out : undefined;
}
/** Every composition field a construction's values read: identifiers, #private names (by their names), property names and string element keys. */
function fieldsOf(pieces: readonly Piece[]): string[] {
  const names = new Set<string>();
  const visit = (node: ts.Node): void => {
    if ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && isFieldName(memberName(node))) names.add(node.text);
    else if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression) && isFieldName(node.argumentExpression.text)) names.add(node.argumentExpression.text);
    const member = memberField(node);
    if (member !== undefined) names.add(member);
    ts.forEachChild(node, visit);
  };
  for (const piece of pieces) if ("value" in piece) visit(piece.value);
  return [...names].sort(byName);
}
/** The prefix families a construction opens: the literal text accumulated just before each of its values. */
function prefixFamilies(pieces: readonly Piece[]): Family[] {
  const families = new Set<Family>();
  let run = "";
  for (const piece of pieces) {
    if ("text" in piece) run += piece.text;
    else {
      if (TASK_PREFIX.test(run)) families.add("task");
      if (ATTEMPT_PREFIX.test(run)) families.add("attempt");
      run = "";
    }
  }
  return [...families];
}
/** Every string a module's const declarations bind to each name (any scope, so a shadowed name reads as each of its values). */
function constStrings(source: ts.SourceFile): ReadonlyMap<string, ReadonlySet<string>> {
  const out = new Map<string, Set<string>>();
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && ts.isVariableDeclarationList(node.parent) && (node.parent.flags & ts.NodeFlags.Const) !== 0) {
      const init = unwrap(node.initializer);
      if (ts.isStringLiteralLike(init)) out.set(node.name.text, (out.get(node.name.text) ?? new Set<string>()).add(init.text));
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return out;
}
/** The texts a provider or key expression reads as: a string literal's, or those a same-module const declaration binds the name to. */
const textsOf = (node: ts.Expression, strings: ReadonlyMap<string, ReadonlySet<string>>): string[] => {
  const inner = unwrap(node);
  if (ts.isStringLiteralLike(inner)) return [inner.text];
  if (ts.isIdentifier(inner)) return [...(strings.get(inner.text) ?? [])];
  return [];
};
/** A property name as text: an identifier, a string literal, a #private name, or a computed key read through textsOf. */
const namesOf = (name: ts.PropertyName, strings: ReadonlyMap<string, ReadonlySet<string>>): string[] => {
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name)) return [name.text];
  if (ts.isPrivateIdentifier(name)) return [name.text];
  if (ts.isComputedPropertyName(name)) return textsOf(name.expression, strings);
  return [];
};
interface Construction {
  readonly site: string;
  readonly family: Family;
  readonly forms: readonly string[];
  readonly fields: readonly string[];
}
/** Every family construction of one module that reads a composition field, one entry per (expression, family). */
function constructionsOf(module: Module): Construction[] {
  const source = parse(module);
  const strings = constStrings(source);
  const found = new Map<string, { node: ts.Expression; family: Family; forms: Set<string>; fields: string[] }>();
  const note = (node: ts.Expression, family: Family, form: string): void => {
    const pieces = piecesOf(node);
    if (pieces === undefined) return;
    const fields = fieldsOf(pieces);
    if (fields.length === 0) return;
    const key = `${node.getStart(source)}:${family}`;
    const entry = found.get(key) ?? { node, family, forms: new Set<string>(), fields };
    entry.forms.add(form);
    found.set(key, entry);
  };
  /** A value bound to names: noted in each family whose id key a name is. */
  const keyed = (names: readonly string[], value: ts.Expression | undefined): void => {
    if (value === undefined) return;
    for (const name of names) {
      const family = familyOfKey(name);
      if (family !== undefined) note(unwrap(value), family, "id-key");
    }
  };
  const visit = (node: ts.Node): void => {
    // A template reads on its own; a + chain reads once, where no + chain holds it past its wrappers (U1, cut #5).
    if (ts.isTemplateExpression(node) || (isPlus(node) && !isPlus(outerOf(node)))) {
      const pieces = piecesOf(node as ts.Expression);
      if (pieces !== undefined) for (const family of prefixFamilies(pieces)) note(node as ts.Expression, family, "prefix");
    }
    if (ts.isObjectLiteralExpression(node)) {
      const assigned: (readonly [string, ts.Expression])[] = [];
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) for (const name of namesOf(property.name, strings)) assigned.push([name, property.initializer]);
        // A shorthand property is its name bound to the same name's value: { provider } reads the module's const provider.
        else if (ts.isShorthandPropertyAssignment(property)) assigned.push([property.name.text, property.name]);
      }
      const valuesOf = (key: string): ts.Expression[] => assigned.filter(([name]) => name === key).map(([, value]) => value);
      const families = new Set(valuesOf("provider").flatMap(provider => textsOf(provider, strings).flatMap(text => PROVIDER_FAMILY[text] ?? [])));
      for (const family of families) for (const id of valuesOf("id")) note(unwrap(id), family, "native-ref");
      for (const [name, value] of assigned) keyed([name], value);
    }
    if (ts.isBinaryExpression(node) && ASSIGNMENTS.includes(node.operatorToken.kind)) {
      const target = unwrap(node.left);
      if (ts.isIdentifier(target)) keyed([target.text], node.right);
      else if (ts.isPropertyAccessExpression(target)) keyed([target.name.text], node.right);
      else if (ts.isElementAccessExpression(target)) keyed(textsOf(target.argumentExpression, strings), node.right);
    }
    if ((ts.isVariableDeclaration(node) || ts.isParameter(node)) && ts.isIdentifier(node.name)) keyed([node.name.text], node.initializer);
    if (ts.isPropertyDeclaration(node)) keyed(namesOf(node.name, strings), node.initializer);
    if (ts.isBindingElement(node)) keyed(node.propertyName !== undefined ? namesOf(node.propertyName, strings) : ts.isIdentifier(node.name) ? [node.name.text] : [], node.initializer);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return [...found.values()]
    .map(entry => ({
      site: `${module.path}:${source.getLineAndCharacterOfPosition(entry.node.getStart(source)).line + 1}`,
      family: entry.family,
      forms: [...entry.forms].sort(byName),
      fields: entry.fields,
    }))
    .sort((a, b) => byName(`${a.site} ${a.family}`, `${b.site} ${b.family}`));
}
/** Clause (b)'s scope: src modules only; any other path is not judged (R-SCOPE). */
const judgeConstructions = (modules: readonly Module[]): Construction[] => modules.filter(module => inSrc(module.path) && isModule(module.path)).flatMap(constructionsOf);

// ------------------------------------------------------------------------------------------------- FAIL CLOSED (cut #5, R-B90)
/** FC-SCOPE: whether a text holds the package scope anywhere (a load, a string, a comment), by a substring test of the derived scope. */
const holdsScope = (text: string): boolean => CONSTANTS.mwScope !== "" && text.includes(CONSTANTS.mwScope);
/** FC-FIELD: every composition field a module names anywhere, not only inside a construction, by B's own field tests, as "<line> <name>". */
function fieldNames(module: Module): string[] {
  const source = parse(module);
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    const line = (): number => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
    if ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && isFieldName(memberName(node))) out.push(`${line()} ${node.text}`);
    else if (ts.isStringLiteralLike(node) && isFieldName(node.text)) out.push(`${line()} ${JSON.stringify(node.text)}`);
    const member = memberField(node);
    if (member !== undefined) out.push(`${line()} ${member}`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return out;
}
/** A module's fail-closed hits, src paths only: "scope" when its text holds the scope (any src file), and "field <line> <name>" per field it names (a src module). */
const closedHits = (module: Module): string[] =>
  inSrc(module.path) ? [...(holdsScope(module.text) ? ["scope"] : []), ...liveFieldNames([module]).map(site => `field ${site.slice(module.path.length + 1)}`)] : [];
/** A planted manifest's or lock's fail-closed hit: "scope" when its JSON text holds the scope. */
const closedJson = (value: unknown): string[] => (holdsScope(JSON.stringify(value)) ? ["scope"] : []);
/**
 * The src modules bound to name a composition field: empty today. A module that starts naming one is refused (FC-FIELD) until
 * its own cut binds it here; B judges its constructions as before.
 */
const MW_FIELD_MODULES: readonly string[] = [];
/** Every src module naming a composition field, as "<path>:<line> <name>", in module order. */
const liveFieldNames = (modules: readonly Module[]): string[] => modules.filter(module => isModule(module.path)).flatMap(module => fieldNames(module).map(name => `${module.path}:${name}`));
const TASK_PLANTS: Readonly<Record<string, Module>> = {
  "task-template": { path: plantPath("task-template"), text: planted("export const taskOf = (step: { stepId: string }): string => `wb-@{step.stepId}`;\n") },
  "task-bd-template": { path: plantPath("task-bd-template"), text: planted("export const taskOf = (step: { stepId: string }): string => `bd-work-@{step.stepId}`;\n") },
  "task-concat": { path: plantPath("task-concat"), text: 'export const taskOf = (composition: { steps: { stepId: string }[] }): string => "bd-" + composition.steps[0]?.stepId;\n' },
  "task-template-chain": { path: plantPath("task-template-chain"), text: planted("export const taskOf = (batch: { id: string }, step: { stepId: string }): string => `wb-@{batch.id}-` + step.stepId;\n") },
  "task-parenthesized-chain": { path: plantPath("task-parenthesized-chain"), text: 'export const taskOf = (step: { stepId: string }): string => "see " + ("wb-" + step.stepId);\n' },
  "task-split-literal": { path: plantPath("task-split-literal"), text: 'export const taskOf = (step: { stepId: string }): string => "w" + "b-" + step.stepId;\n' },
  "task-native-ref": { path: plantPath("task-native-ref"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: "beads", type: "work", id: `@{step.stepId}-task` });\n') },
  "task-id-key": { path: plantPath("task-id-key"), text: planted("export const rowOf = (sourceArtifactId: string) => ({ taskId: `T@{sourceArtifactId}` });\n") },
  "task-work-key": { path: plantPath("task-work-key"), text: planted("export const rowOf = (step: { stepId: string }) => ({ workId: `@{step.stepId}` });\n") },
  "task-beads-work-key": { path: plantPath("task-beads-work-key"), text: planted("export const rowOf = (step: { stepId: string }) => ({ beads_work_id: `@{step.stepId}` });\n") },
  "task-issue-key": { path: plantPath("task-issue-key"), text: planted("export const rowOf = (step: { stepId: string }) => ({ issueId: `I@{step.stepId}` });\n") },
  "task-hyphen-key": { path: plantPath("task-hyphen-key"), text: planted('export const rowOf = (step: { stepId: string }) => ({ "task-id": `@{step.stepId}` });\n') },
  "task-member-id": { path: plantPath("task-member-id"), text: planted("export const taskOf = (step: { id: string }): string => `wb-@{step.id}`;\n") },
  "task-nested-holder": { path: plantPath("task-nested-holder"), text: planted("export const taskOf = (batch: { step: { id: string } }): string => `wb-@{batch.step.id}`;\n") },
  "task-ids-member": { path: plantPath("task-ids-member"), text: planted("export const taskOf = (sourceArtifacts: { ids: string[] }): string => `wb-@{sourceArtifacts.ids[0]}`;\n") },
  "task-snake-field": { path: plantPath("task-snake-field"), text: planted("export const taskOf = (row: { step_id: string }): string => `wb-@{row.step_id}`;\n") },
  "task-kebab-key": { path: plantPath("task-kebab-key"), text: planted('export const taskOf = (row: Record<string, string>): string => `wb-@{row["source-artifact-id"]}`;\n') },
  "task-plural-field": { path: plantPath("task-plural-field"), text: planted('export const taskOf = (batch: { stepsIds: string[] }): string => `bd-@{batch.stepsIds.join("+")}`;\n') },
  "task-composition-word": { path: plantPath("task-composition-word"), text: planted("export const taskOf = (compositions: { key: string }[]): string => `wb-@{compositions[0]?.key}`;\n") },
  "task-prose-prefix": { path: plantPath("task-prose-prefix"), text: planted("export const noteOf = (step: { stepId: string }): string => `see wb-@{step.stepId}`;\n") },
  "task-copy": { path: plantPath("task-copy"), text: 'export const refOf = (step: { ref: { id: string } }) => ({ provider: "beads", type: "work", id: step.ref.id });\n' },
  "task-no-field": { path: plantPath("task-no-field"), text: planted("export const taskOf = (issue: { id: string }): string => `wb-@{issue.id}`;\n") },
  "task-split-around-value": { path: plantPath("task-split-around-value"), text: planted("export const taskOf = (step: { stepId: string }, x: string): string => `w@{x}b-@{step.stepId}`;\n") },
  "task-embedded-prefix": { path: plantPath("task-embedded-prefix"), text: planted("export const nameOf = (step: { stepId: string }): string => `newb-@{step.stepId}`;\n") },
  "task-template-literal-chain": { path: plantPath("task-template-literal-chain"), text: "export const taskOf = (step: { stepId: string }): string => `wb-` + step.stepId;\n" },
  "task-later-value-prefix": { path: plantPath("task-later-value-prefix"), text: planted("export const taskOf = (run: { id: string }, step: { stepId: string }): string => `@{run.id}/wb-@{step.stepId}`;\n") },
  "task-trailing-prefix": { path: plantPath("task-trailing-prefix"), text: planted("export const nameOf = (step: { stepId: string }): string => `@{step.stepId}-wb-`;\n") },
  "task-digit-preceded": { path: plantPath("task-digit-preceded"), text: planted("export const nameOf = (step: { stepId: string }): string => `x1wb-@{step.stepId}`;\n") },
  "task-upper-preceded": { path: plantPath("task-upper-preceded"), text: planted("export const nameOf = (step: { stepId: string }): string => `Xwb-@{step.stepId}`;\n") },
  "task-underscore-preceded": { path: plantPath("task-underscore-preceded"), text: planted("export const nameOf = (step: { stepId: string }): string => `x_wb-@{step.stepId}`;\n") },
  "task-hyphen-preceded": { path: plantPath("task-hyphen-preceded"), text: planted("export const nameOf = (step: { stepId: string }): string => `x-wb-@{step.stepId}`;\n") },
  "task-dot-preceded": { path: plantPath("task-dot-preceded"), text: planted("export const nameOf = (step: { stepId: string }): string => `x.wb-@{step.stepId}`;\n") },
  "task-token-chars": { path: plantPath("task-token-chars"), text: planted("export const taskOf = (step: { stepId: string }): string => `wb-Ab9._-@{step.stepId}`;\n") },
  "task-token-broken": { path: plantPath("task-token-broken"), text: planted("export const nameOf = (step: { stepId: string }): string => `wb-x/@{step.stepId}`;\n") },
  "task-upper-prefix": { path: plantPath("task-upper-prefix"), text: planted("export const nameOf = (step: { stepId: string }): string => `WB-@{step.stepId}`;\n") },
  "task-field-trailing-word": { path: plantPath("task-field-trailing-word"), text: planted("export const taskOf = (row: { stepIdList: string }): string => `wb-@{row.stepIdList}`;\n") },
  "task-field-leading-word": { path: plantPath("task-field-leading-word"), text: planted("export const taskOf = (row: { rawStepId: string }): string => `wb-@{row.rawStepId}`;\n") },
  "task-acronym-field": { path: plantPath("task-acronym-field"), text: planted("export const taskOf = (step: { stepID: string }): string => `wb-@{step.stepID}`;\n") },
  "task-holder-longer-name": { path: plantPath("task-holder-longer-name"), text: planted("export const taskOf = (stepInfo: { id: string }): string => `wb-@{stepInfo.id}`;\n") },
  "task-decomposition": { path: plantPath("task-decomposition"), text: planted("export const taskOf = (row: { decomposition: string }): string => `wb-@{row.decomposition}`;\n") },
  "task-later-composition-word": { path: plantPath("task-later-composition-word"), text: planted("export const taskOf = (row: { rawComposition: string }): string => `wb-@{row.rawComposition}`;\n") },
  "task-spaced-element-key": { path: plantPath("task-spaced-element-key"), text: planted('export const taskOf = (row: Record<string, string>): string => `wb-@{row["step id"]}`;\n') },
  "task-template-element-key": { path: plantPath("task-template-element-key"), text: planted("export const taskOf = (row: Record<string, string>): string => `wb-@{row[`source-artifact-id`]}`;\n") },
  "task-wrapped-holder": { path: plantPath("task-wrapped-holder"), text: planted("export const taskOf = (step: unknown): string => `wb-@{(step as { id: string }).id}`;\n") },
  "task-non-null-holder": { path: plantPath("task-non-null-holder"), text: planted("export const taskOf = (step?: { id: string }): string => `wb-@{step!.id}`;\n") },
  "task-wrapped-operand": { path: plantPath("task-wrapped-operand"), text: 'export const taskOf = (step: { stepId: string }): string => ("wb-" as string) + step.stepId;\n' },
  "task-wrapped-key-value": { path: plantPath("task-wrapped-key-value"), text: planted("export const rowOf = (step: { stepId: string }) => ({ taskId: (`wb-@{step.stepId}`) });\n") },
  "task-wrapped-ref-id": { path: plantPath("task-wrapped-ref-id"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: "beads", type: "work", id: (`wb-@{step.stepId}`) });\n') },
  "task-key-longer": { path: plantPath("task-key-longer"), text: planted("export const rowOf = (step: { stepId: string }) => ({ taskIdList: `@{step.stepId}` });\n") },
  // U1 (cut #5): a standalone + chain under each wrapper kind and at each site reads once, in the prefix form.
  "task-standalone-parenthesized": { path: plantPath("task-standalone-parenthesized"), text: 'export const taskOf = (step: { stepId: string }): string => ("wb-" + step.stepId);\n' },
  "task-standalone-as": { path: plantPath("task-standalone-as"), text: 'export const taskOf = (step: { stepId: string }): string => ("wb-" + step.stepId) as string;\n' },
  "task-standalone-satisfies": { path: plantPath("task-standalone-satisfies"), text: 'export const taskOf = (step: { stepId: string }): string => ("bd-" + step.stepId) satisfies string;\n' },
  "task-standalone-non-null": { path: plantPath("task-standalone-non-null"), text: 'export const taskOf = (step: { stepId: string }): string => ("wb-" + step.stepId)!;\n' },
  "task-standalone-angle": { path: plantPath("task-standalone-angle"), text: 'export const taskOf = (step: { stepId: string }): string => <string>("wb-" + step.stepId);\n' },
  "task-standalone-receiver": { path: plantPath("task-standalone-receiver"), text: 'export const taskOf = (step: { stepId: string }): string => ("bd-" + step.stepId).trim();\n' },
  "task-standalone-argument": { path: plantPath("task-standalone-argument"), text: 'export const taskOf = (step: { stepId: string }): string => String(("wb-" + step.stepId));\n' },
  // ... and a + chain that is an operand of an outer chain past each wrapper kind reads once, through the outer chain.
  "task-inner-parenthesized": { path: plantPath("task-inner-parenthesized"), text: 'export const taskOf = (sourceArtifactId: string, step: { stepId: string }): string => sourceArtifactId + ("wb-" + step.stepId);\n' },
  "task-inner-as": { path: plantPath("task-inner-as"), text: 'export const taskOf = (sourceArtifactId: string, step: { stepId: string }): string => sourceArtifactId + ("wb-" + step.stepId as string);\n' },
  "task-inner-satisfies": { path: plantPath("task-inner-satisfies"), text: 'export const taskOf = (sourceArtifactId: string, step: { stepId: string }): string => sourceArtifactId + ("wb-" + step.stepId satisfies string);\n' },
  "task-inner-non-null": { path: plantPath("task-inner-non-null"), text: 'export const taskOf = (sourceArtifactId: string, step: { stepId: string }): string => sourceArtifactId + ("wb-" + step.stepId)!;\n' },
  "task-inner-angle": { path: plantPath("task-inner-angle"), text: 'export const taskOf = (sourceArtifactId: string, step: { stepId: string }): string => sourceArtifactId + <string>("wb-" + step.stepId);\n' },
  // U3 (cut #5): a #private name reads by its name, as a field, as a holder and as an id member; the exempt forms read nothing.
  "task-private-field": { path: plantPath("task-private-field"), text: planted('export class Planner {\n  #stepId = "";\n  taskOf(): string {\n    return `wb-@{this.#stepId}`;\n  }\n}\n') },
  "task-private-holder": { path: plantPath("task-private-holder"), text: planted('export class Planner {\n  #step = { id: "" };\n  taskOf(): string {\n    return `wb-@{this.#step.id}`;\n  }\n}\n') },
  "task-private-member": { path: plantPath("task-private-member"), text: planted('export class Step {\n  #id = "";\n  taskOf(step: Step): string {\n    return `wb-@{step.#id}`;\n  }\n}\n') },
  "task-private-leading-word": { path: plantPath("task-private-leading-word"), text: planted('export class Planner {\n  #rawStepId = "";\n  taskOf(): string {\n    return `wb-@{this.#rawStepId}`;\n  }\n}\n') },
  "task-private-holder-longer": { path: plantPath("task-private-holder-longer"), text: planted('export class Planner {\n  #stepInfo = { id: "" };\n  taskOf(): string {\n    return `wb-@{this.#stepInfo.id}`;\n  }\n}\n') },
  "task-optional-member": { path: plantPath("task-optional-member"), text: planted("export const taskOf = (step?: { id: string }): string => `wb-@{step?.id}`;\n") },
  "task-leading-underscore-field": { path: plantPath("task-leading-underscore-field"), text: planted("export const taskOf = (row: { _stepId: string }): string => `wb-@{row._stepId}`;\n") },
  // refusal #3's fifth finding: a colon breaks the prefix token (the COMPUTED SCANS hold every breaking code point).
  "task-token-colon": { path: plantPath("task-token-colon"), text: planted("export const nameOf = (step: { stepId: string }): string => `wb-a:@{step.stepId}`;\n") },
  "task-holder-element-key": { path: plantPath("task-holder-element-key"), text: planted('export const taskOf = (row: Record<string, { id: string }>): string => `wb-@{row["step"]?.id}`;\n') },
  "task-holder-call": { path: plantPath("task-holder-call"), text: planted("export const taskOf = (steps: { id: string }[]): string => `wb-@{steps.at(0)?.id}`;\n") },
  "task-field-string-argument": { path: plantPath("task-field-string-argument"), text: planted('export const taskOf = (row: Map<string, string>): string => `wb-@{row.get("stepId")}`;\n') },
  "task-holder-half-match": { path: plantPath("task-holder-half-match"), text: planted("export const taskOf = (sourceCode: { id: string }): string => `wb-@{sourceCode.id}`;\n") },
  "task-member-identifier-key": { path: plantPath("task-member-identifier-key"), text: planted("export const taskOf = (step: Record<string, string>, id: string): string => `wb-@{step[id]}`;\n") },
  "task-member-const-key": { path: plantPath("task-member-const-key"), text: planted('const KEY = "id";\nexport const taskOf = (step: Record<string, string>): string => `wb-@{step[KEY]}`;\n') },
  "task-other-operator": { path: plantPath("task-other-operator"), text: 'export const isTask = (step: { stepId: string }): boolean => "wb-" === step.stepId;\n' },
  // A construction of another family only: held in this pin's controls, and outside its inFamily list.
  "task-other-family": { path: plantPath("task-other-family"), text: planted("export const attemptOf = (step: { stepId: string }): string => `frn-atm-@{step.stepId}`;\n") },
  "qa-module": { path: "qa/workbench/planted-task.ts", text: planted("export const taskOf = (step: { stepId: string }): string => `wb-@{step.stepId}`;\n") },
  "examples-src-module": { path: "examples/src/planted-task.ts", text: planted("export const taskOf = (step: { stepId: string }): string => `wb-@{step.stepId}`;\n") },
  "indirect-binding": { path: plantPath("indirect-binding"), text: planted("export const taskOf = (step: { stepId: string }): string => {\n  const k = step.stepId;\n  return `wb-@{k}`;\n};\n") },
  "concat-call": { path: plantPath("concat-call"), text: 'export const taskOf = (step: { stepId: string }): string => "wb-".concat(step.stepId);\n' },
  "join-call": { path: plantPath("join-call"), text: 'export const taskOf = (step: { stepId: string }): string => ["wb", step.stepId].join("-");\n' },
  "prefix-constant": { path: plantPath("prefix-constant"), text: planted('const PREFIX = "wb-";\nexport const taskOf = (step: { stepId: string }): string => `@{PREFIX}@{step.stepId}`;\n') },
  "task-compound": { path: plantPath("task-compound"), text: 'export function taskOf(step: { stepId: string }): string {\n  let id = "wb-";\n  id += step.stepId;\n  return id;\n}\n' },
};
const FORGE_PLANTS: Readonly<Record<string, Module>> = {
  "forge-native-ref": { path: plantPath("forge-native-ref"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: "forge", type: "operation", id: `op-@{step.stepId}` });\n') },
  "forge-gate-ref": { path: plantPath("forge-gate-ref"), text: 'export const refOf = (composition: { compositionId: string }) => ({ provider: "forge", type: "gate-step", id: composition.compositionId + ":lint" });\n' },
  "forge-provider-constant": { path: plantPath("forge-provider-constant"), text: planted('const FORGE = "forge";\nexport const refOf = (step: { stepId: string }) => ({ provider: FORGE, type: "operation", id: `@{step.stepId}` });\n') },
  "forge-shadowed-constant": {
    path: plantPath("forge-shadowed-constant"),
    text: planted('const PROVIDER = "forge";\nexport function refOf(step: { stepId: string }) {\n  const PROVIDER = "beads";\n  return { provider: PROVIDER, type: "work", id: `@{step.stepId}` };\n}\n'),
  },
  "forge-id-key": { path: plantPath("forge-id-key"), text: planted("export const rowOf = (step: { stepId: string }) => ({ operationId: `@{step.stepId}/run` });\n") },
  "forge-gate-key": { path: plantPath("forge-gate-key"), text: 'export const rowOf = (sourceArtifact: { id: string }) => ({ gate_id: "gate:" + sourceArtifact.id });\n' },
  "forge-computed-key": { path: plantPath("forge-computed-key"), text: planted('export const rowOf = (step: { stepId: string }) => ({ ["operationId"]: `@{step.stepId}/run` });\n') },
  "forge-key-constant": { path: plantPath("forge-key-constant"), text: planted('const KEY = "gateStepId";\nexport const rowOf = (step: { stepId: string }) => ({ [KEY]: `@{step.stepId}/lint` });\n') },
  "forge-wrapped-computed-key": { path: plantPath("forge-wrapped-computed-key"), text: planted('export const rowOf = (step: { stepId: string }) => ({ [("operationId" as string)]: `@{step.stepId}/run` });\n') },
  "forge-assignment": { path: plantPath("forge-assignment"), text: planted("export function setOf(target: { operationId?: string }, step: { stepId: string }): void {\n  target.operationId = `op-@{step.stepId}`;\n}\n") },
  "forge-element-assignment": {
    path: plantPath("forge-element-assignment"),
    text: planted('export function setOf(target: Record<string, string>, step: { stepId: string }): void {\n  target["gateId"] = `@{step.stepId}/gate`;\n}\n'),
  },
  "forge-element-key-constant": {
    path: plantPath("forge-element-key-constant"),
    text: planted('const GATE = "gateId";\nexport function setOf(target: Record<string, string>, step: { stepId: string }): void {\n  target[GATE] = `@{step.stepId}/gate`;\n}\n'),
  },
  "forge-name-assignment": { path: plantPath("forge-name-assignment"), text: planted("export function opOf(step: { stepId: string }): string {\n  let gateId = \"\";\n  gateId = `@{step.stepId}/gate`;\n  return gateId;\n}\n") },
  "forge-declaration": { path: plantPath("forge-declaration"), text: planted("export function opOf(step: { stepId: string }): string {\n  const operationId = `op-@{step.stepId}`;\n  return operationId;\n}\n") },
  "forge-parameter-default": { path: plantPath("forge-parameter-default"), text: planted("export const opOf = (step: { stepId: string }, operationId = `op-@{step.stepId}`): string => operationId;\n") },
  "forge-destructuring-default": {
    path: plantPath("forge-destructuring-default"),
    text: planted("export function opOf(step: { stepId: string }, { gate_step_id = `@{step.stepId}/lint` }: { gate_step_id?: string }): string {\n  return gate_step_id;\n}\n"),
  },
  "forge-destructuring-alias": {
    path: plantPath("forge-destructuring-alias"),
    text: planted("export function opOf(step: { stepId: string }, { operationId: op = `op-@{step.stepId}` }: { operationId?: string }): string {\n  return op;\n}\n"),
  },
  "forge-class-property": {
    path: plantPath("forge-class-property"),
    text: planted("export class Gate {\n  constructor(private readonly step: { stepId: string }) {}\n  readonly gateId = `@{this.step.stepId}/gate`;\n}\n"),
  },
  "forge-gate-step-name": {
    path: plantPath("forge-gate-step-name"),
    text: planted('export const stepRefOf = (operationId: string, step: string) => ({ provider: "forge", type: "gate-step", id: `@{operationId}/@{step}` });\n'),
  },
  "forge-copy": { path: plantPath("forge-copy"), text: 'export const refOf = (step: { ref: { id: string } }) => ({ provider: "forge", type: "operation", id: step.ref.id });\n' },
  "builder-argument": {
    path: plantPath("builder-argument"),
    text: planted('import { forgeOperationRef } from "../forge-operation-observer.js";\nexport const refOf = (step: { stepId: string }) => forgeOperationRef(`op-@{step.stepId}`);\n'),
  },
  "forge-value-chain": { path: plantPath("forge-value-chain"), text: 'export const refOf = (step: { stepId: string }, base: string) => ({ provider: "forge", type: "operation", id: base + step.stepId });\n' },
  "forge-provider-import": {
    path: plantPath("forge-provider-import"),
    text: planted('import { FORGE } from "./planted-forge-provider.js";\nexport const refOf = (step: { stepId: string }) => ({ provider: FORGE, type: "operation", id: `@{step.stepId}` });\n'),
  },
  "forge-provider-let": { path: plantPath("forge-provider-let"), text: planted('let forge = "forge";\nexport const refOf = (step: { stepId: string }) => ({ provider: forge, type: "operation", id: `@{step.stepId}` });\n') },
  "forge-provider-member": {
    path: plantPath("forge-provider-member"),
    text: planted('const PROVIDERS = { forge: "forge" } as const;\nexport const refOf = (step: { stepId: string }) => ({ provider: PROVIDERS.forge, type: "operation", id: `@{step.stepId}` });\n'),
  },
  "forge-key-getter": { path: plantPath("forge-key-getter"), text: planted("export const rowOf = (step: { stepId: string }) => ({\n  get operationId(): string {\n    return `@{step.stepId}/run`;\n  },\n});\n") },
  "forge-compound-key": { path: plantPath("forge-compound-key"), text: "export function setOf(target: { operationId: string }, step: { stepId: string }): void {\n  target.operationId += step.stepId;\n}\n" },
  "forge-provider-template": { path: plantPath("forge-provider-template"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: `forge`, type: "operation", id: `@{step.stepId}` });\n') },
  "forge-provider-template-constant": {
    path: plantPath("forge-provider-template-constant"),
    text: planted('const FORGE = `forge`;\nexport const refOf = (step: { stepId: string }) => ({ provider: FORGE, type: "operation", id: `@{step.stepId}` });\n'),
  },
  "forge-provider-as-const": { path: plantPath("forge-provider-as-const"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: "forge" as const, type: "operation", id: `@{step.stepId}` });\n') },
  "forge-provider-constant-as-const": {
    path: plantPath("forge-provider-constant-as-const"),
    text: planted('const FORGE = "forge" as const;\nexport const refOf = (step: { stepId: string }) => ({ provider: FORGE, type: "operation", id: `@{step.stepId}` });\n'),
  },
  "forge-provider-satisfies": { path: plantPath("forge-provider-satisfies"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: "forge" satisfies string, type: "operation", id: `@{step.stepId}` });\n') },
  "forge-provider-angle": { path: plantPath("forge-provider-angle"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: <string>"forge", type: "operation", id: `@{step.stepId}` });\n') },
  "forge-provider-angle-mts": { path: "src/workbench/planted-forge-provider-angle.mts", text: planted('export const refOf = (step: { stepId: string }) => ({ provider: <string>"forge", type: "operation", id: `@{step.stepId}` });\n') },
  "forge-provider-angle-cts": { path: "src/workbench/planted-forge-provider-angle.cts", text: planted('export const refOf = (step: { stepId: string }) => ({ provider: <string>"forge", type: "operation", id: `@{step.stepId}` });\n') },
  // A file kind is read from its last extension only: a .tsx, .jsx or .js inside the name parses as TypeScript, so its <T> reads.
  "forge-kind-tsx-infix": { path: "src/workbench/planted-angle.tsx.ts", text: planted('export const refOf = (step: { stepId: string }) => ({ provider: <string>"forge", type: "operation", id: `@{step.stepId}` });\n') },
  "forge-kind-jsx-infix": { path: "src/workbench/planted-angle.jsx.ts", text: planted('export const refOf = (step: { stepId: string }) => ({ provider: <string>"forge", type: "operation", id: `@{step.stepId}` });\n') },
  "forge-kind-js-infix": { path: "src/workbench/planted-angle.js.ts", text: planted('export const refOf = (step: { stepId: string }) => ({ provider: <string>"forge", type: "operation", id: `@{step.stepId}` });\n') },
  "forge-key-inner-hash": { path: plantPath("forge-key-inner-hash"), text: planted('export const rowOf = (step: { stepId: string }) => ({ "operation#Id": `@{step.stepId}/run` });\n') },
  "forge-other-family": { path: plantPath("forge-other-family"), text: planted("export const taskOf = (step: { stepId: string }): string => `wb-@{step.stepId}`;\n") },
  "forge-other-property": { path: plantPath("forge-other-property"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: "forge", type: "operation", id: "op-1", label: `@{step.stepId}` });\n') },
  "forge-provider-other-key": { path: plantPath("forge-provider-other-key"), text: planted('export const refOf = (step: { stepId: string }) => ({ kind: "forge", type: "operation", id: `@{step.stepId}` });\n') },
  "forge-key-comparison": { path: plantPath("forge-key-comparison"), text: planted("export const isOp = (target: { operationId: string }, step: { stepId: string }): boolean => target.operationId === `op-@{step.stepId}`;\n") },
  "forge-compound-key-template": { path: plantPath("forge-compound-key-template"), text: planted("export function setOf(target: { operationId: string }, step: { stepId: string }): void {\n  target.operationId += `/@{step.stepId}`;\n}\n") },
  "forge-nested-destructuring": {
    path: plantPath("forge-nested-destructuring"),
    text: planted("export function opOf(step: { stepId: string }, [{ gateId } = { gateId: `@{step.stepId}/gate` }]: { gateId: string }[]): string {\n  return gateId;\n}\n"),
  },
  "forge-provider-shorthand": {
    path: plantPath("forge-provider-shorthand"),
    text: planted('const provider = "forge";\nexport const refOf = (step: { stepId: string }) => ({ provider, type: "operation", id: `@{step.stepId}` });\n'),
  },
  "forge-wrapped-target": {
    path: plantPath("forge-wrapped-target"),
    text: planted("export function setOf(target: { operationId?: string }, step: { stepId: string }): void {\n  (target.operationId as string) = `op-@{step.stepId}`;\n}\n"),
  },
  "forge-nullish-assignment": {
    path: plantPath("forge-nullish-assignment"),
    text: planted("export function setOf(target: { operationId?: string }, step: { stepId: string }): void {\n  target.operationId ??= `op-@{step.stepId}`;\n}\n"),
  },
  "forge-or-assignment": { path: plantPath("forge-or-assignment"), text: planted("export function setOf(target: { gateId: string }, step: { stepId: string }): void {\n  target.gateId ||= `@{step.stepId}/gate`;\n}\n") },
  "forge-and-assignment": { path: plantPath("forge-and-assignment"), text: planted("export function setOf(target: { gateStepId: string }, step: { stepId: string }): void {\n  target.gateStepId &&= `@{step.stepId}/lint`;\n}\n") },
  "forge-private-field": {
    path: plantPath("forge-private-field"),
    text: planted("export class Gate {\n  constructor(private readonly step: { stepId: string }) {}\n  #operationId = `op-@{this.step.stepId}`;\n}\n"),
  },
  "forge-private-assignment": {
    path: plantPath("forge-private-assignment"),
    text: planted('export class Gate {\n  #gateId = "";\n  set(step: { stepId: string }): void {\n    this.#gateId = `@{step.stepId}/gate`;\n  }\n}\n'),
  },
  "forge-let-declaration": { path: plantPath("forge-let-declaration"), text: planted("export function opOf(step: { stepId: string }): string {\n  let operationId = `op-@{step.stepId}`;\n  return operationId;\n}\n") },
  "forge-var-declaration": { path: plantPath("forge-var-declaration"), text: planted("export function opOf(step: { stepId: string }): string {\n  var gateId = `@{step.stepId}/gate`;\n  return gateId;\n}\n") },
  "forge-static-property": { path: plantPath("forge-static-property"), text: planted('export class Gate {\n  static readonly step = { stepId: "s" };\n  static gateId = `@{Gate.step.stepId}/gate`;\n}\n') },
  "forge-accessor-property": {
    path: plantPath("forge-accessor-property"),
    text: planted("export class Gate {\n  constructor(private readonly step: { stepId: string }) {}\n  accessor gateStepId = `@{this.step.stepId}/lint`;\n}\n"),
  },
  "forge-array-destructuring-default": {
    path: plantPath("forge-array-destructuring-default"),
    text: planted("export function opOf(step: { stepId: string }, [operationId = `op-@{step.stepId}`]: string[]): string {\n  return operationId;\n}\n"),
  },
  "other-provider-ref": { path: plantPath("other-provider-ref"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: "hyperunix", type: "answer", id: `@{step.stepId}` });\n') },
  "forge-key-method": { path: plantPath("forge-key-method"), text: planted("export const rowOf = (step: { stepId: string }) => ({\n  operationId(): string {\n    return `@{step.stepId}/run`;\n  },\n});\n") },
  "forge-provider-destructured": {
    path: plantPath("forge-provider-destructured"),
    text: planted('const { forge } = { forge: "forge" } as const;\nexport const refOf = (step: { stepId: string }) => ({ provider: forge, type: "operation", id: `@{step.stepId}` });\n'),
  },
  "forge-id-binding": {
    path: plantPath("forge-id-binding"),
    text: planted('export function refOf(step: { stepId: string }) {\n  const id = `@{step.stepId}`;\n  return { provider: "forge", type: "operation", id };\n}\n'),
  },
  "forge-key-binding": {
    path: plantPath("forge-key-binding"),
    text: planted("export function rowOf(step: { stepId: string }) {\n  const value = `@{step.stepId}/run`;\n  return { operationId: value };\n}\n"),
  },
};
const ATTEMPT_PLANTS: Readonly<Record<string, Module>> = {
  "attempt-template": { path: plantPath("attempt-template"), text: planted("export const attemptOf = (step: { stepId: string }): string => `frn-atm-@{step.stepId}`;\n") },
  "attempt-concat": { path: plantPath("attempt-concat"), text: 'export const attemptOf = (sourceArtifact: { id: string }): string => "frn-" + sourceArtifact.id;\n' },
  "attempt-native-ref": { path: plantPath("attempt-native-ref"), text: planted('export const refOf = (step: { stepId: string }) => ({ provider: "furnace", type: "attempt", id: `@{step.stepId}-1` });\n') },
  "attempt-id-key": { path: plantPath("attempt-id-key"), text: planted("export const rowOf = (composition: { id: string }) => ({ attempt_id: `a-@{composition.id}` });\n") },
  "attempt-furnace-key": { path: plantPath("attempt-furnace-key"), text: planted("export const rowOf = (step: { stepId: string }) => ({ furnaceAttemptId: `@{step.stepId}-1` });\n") },
  "attempt-element-id": { path: plantPath("attempt-element-id"), text: planted("export const attemptOf = (steps: { id: string }[]): string => `frn-atm-@{steps[0]?.id}`;\n") },
  "attempt-element-member": { path: plantPath("attempt-element-member"), text: planted('export const attemptOf = (sourceArtifact: Record<string, string>): string => `frn-@{sourceArtifact["id"]}`;\n') },
  "attempt-template-element-member": {
    path: plantPath("attempt-template-element-member"),
    text: planted("export const attemptOf = (sourceArtifact: Record<string, string>): string => `frn-@{sourceArtifact[`id`]}`;\n"),
  },
  "attempt-no-field": { path: plantPath("attempt-no-field"), text: planted("export const attemptOf = (run: { id: string }): string => `frn-atm-@{run.id}`;\n") },
  "attempt-literal": { path: plantPath("attempt-literal"), text: 'export const ATTEMPT = "frn-atm-preflight";\n' },
  // U1 (cut #5): the standalone + chain forms in the attempt family.
  "attempt-standalone-parenthesized": { path: plantPath("attempt-standalone-parenthesized"), text: 'export const attemptOf = (step: { stepId: string }): string => ("frn-atm-" + step.stepId);\n' },
  "attempt-standalone-as": { path: plantPath("attempt-standalone-as"), text: 'export const attemptOf = (step: { stepId: string }): string => ("frn-atm-" + step.stepId) as string;\n' },
  "attempt-standalone-satisfies": { path: plantPath("attempt-standalone-satisfies"), text: 'export const attemptOf = (step: { stepId: string }): string => ("frn-atm-" + step.stepId) satisfies string;\n' },
  "attempt-standalone-non-null": { path: plantPath("attempt-standalone-non-null"), text: 'export const attemptOf = (step: { stepId: string }): string => ("frn-" + step.stepId)!;\n' },
  "attempt-standalone-angle": { path: plantPath("attempt-standalone-angle"), text: 'export const attemptOf = (step: { stepId: string }): string => <string>("frn-" + step.stepId);\n' },
  "attempt-standalone-receiver": { path: plantPath("attempt-standalone-receiver"), text: 'export const attemptOf = (step: { stepId: string }): string => ("frn-atm-" + step.stepId).trim();\n' },
  "attempt-standalone-argument": { path: plantPath("attempt-standalone-argument"), text: 'export const attemptOf = (step: { stepId: string }): string => String(("frn-" + step.stepId));\n' },
  "other-field-name": { path: plantPath("other-field-name"), text: planted("export const attemptOf = (node: { key: string }): string => `frn-atm-@{node.key}`;\n") },
  "bare-step-name": { path: plantPath("bare-step-name"), text: planted("export const taskOf = (step: string): string => `frn-@{step}`;\n") },
  "attempt-other-family": { path: plantPath("attempt-other-family"), text: planted('export const rowOf = (step: { stepId: string }) => ({ operationId: `@{step.stepId}/run` });\n') },
};
/**
 * One B pin's reading: the live src constructions of its family, and every construction each planted module reads, in every
 * family, as "<line> <family> <forms> <fields>" (a planted quiet row reads [], so a reader that adds or drops a family, a form
 * or a field on any plant reds the compare).
 */
function familyReading(family: Family, plants: Readonly<Record<string, Module>>): { live: string[]; controls: Record<string, string[]>; inFamily: string[] } {
  // One call judges the real modules, then the planted ones after them.
  const all = judgeConstructions([...srcFiles(), ...Object.values(plants)]);
  const pathOf = (site: string): string => site.slice(0, site.lastIndexOf(":"));
  const plantPaths = new Set(Object.values(plants).map(module => module.path));
  const reading = (entry: Construction): string => `${entry.site.slice(entry.site.lastIndexOf(":") + 1)} ${entry.family} ${entry.forms.join("+")} ${entry.fields.join(",")}`;
  const controls = Object.fromEntries(Object.entries(plants).map(([id, module]) => [id, all.filter(entry => pathOf(entry.site) === module.path).map(reading)]));
  // One family filter serves the live list and the planted one (inFamily), so a filter reading another family reds the planted list.
  const ofFamily = all.filter(entry => entry.family === family);
  const live = ofFamily.filter(entry => !plantPaths.has(pathOf(entry.site))).map(entry => `${pathOf(entry.site)}:${reading(entry)}`);
  const inFamily = Object.entries(plants)
    .filter(([, module]) => ofFamily.some(entry => pathOf(entry.site) === module.path))
    .map(([id]) => id);
  return { live, controls, inFamily };
}

// ------------------------------------------------------------------------------------------------- C: the docs sentence
/** The string elements of one array literal a module binds to a name, read through the TypeScript parser; undefined when it binds none. */
function arrayLiterals(path: string, text: string, name: string): string[] | undefined {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let found: string[] | undefined;
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name && node.initializer !== undefined) {
      const init = unwrap(node.initializer);
      if (ts.isArrayLiteralExpression(init)) found = init.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : `<non-literal ${ts.SyntaxKind[element.kind]}>`));
    }
    if (found === undefined) ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
/** The string elements of one top-level array literal of the holder, by its binding name; undefined when it is absent. */
const holderLiterals = (name: string): string[] | undefined => arrayLiterals(CONSTANTS.holder, readRepo(CONSTANTS.holder), name);
/** The opening of every wb-6hb.11 census leg's header. */
const HOLDER_HEADER = "/**\n * wb-6hb.11 (VC-2/W07): census falsifier";
/** A holder's shape: a census-tier file (a .census.ts path opening with the wb-6hb.11 header) that imports judge from the shared helper (its imported name, aliased or not). */
function holderShape(path: string, text: string): { census: boolean; judge: boolean } {
  const census = path.endsWith(".census.ts") && text.startsWith(HOLDER_HEADER);
  const imports = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS).statements.filter(ts.isImportDeclaration);
  const judge = imports.some(
    statement =>
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.moduleSpecifier.text === "./helpers/census.js" &&
      statement.importClause?.namedBindings !== undefined &&
      ts.isNamedImports(statement.importClause.namedBindings) &&
      statement.importClause.namedBindings.elements.some(element => (element.propertyName ?? element.name).text === "judge"),
  );
  return { census, judge };
}
/** Planted holders for C2's shape reading: one clause failing each, beside one that reads as a holder through an aliased import. */
const HOLDER_PLANTS: Readonly<Record<string, Module>> = {
  "holder-test-suffix": { path: "test/planted-holder.test.ts", text: `${HOLDER_HEADER} (planted)\n */\nimport { judge } from "./helpers/census.js";\nexport const read = judge;\n` },
  "holder-no-header": { path: "test/planted-holder.census.ts", text: '/** A planted census without the wb-6hb.11 header. */\nimport { judge } from "./helpers/census.js";\nexport const read = judge;\n' },
  "holder-no-judge": { path: "test/planted-holder.census.ts", text: `${HOLDER_HEADER} (planted)\n */\nimport { docsSection } from "./helpers/census.js";\nexport const read = docsSection;\n` },
  "holder-judge-elsewhere": { path: "test/planted-holder.census.ts", text: `${HOLDER_HEADER} (planted)\n */\nimport { judge } from "./helpers/report.js";\nexport const read = judge;\n` },
  "holder-judge-alias": { path: "test/planted-holder.census.ts", text: `${HOLDER_HEADER} (planted)\n */\nimport { judge as judgeReport } from "./helpers/census.js";\nexport const read = judgeReport;\n` },
  "holder-header-not-first": { path: "test/planted-holder.census.ts", text: `// a lead line\n${HOLDER_HEADER} (planted)\n */\nimport { judge } from "./helpers/census.js";\nexport const read = judge;\n` },
  "holder-other-header": {
    path: "test/planted-holder.census.ts",
    text: '/**\n * wb-6hb.11 (VC-2/W07): census row of another leg (planted)\n */\nimport { judge } from "./helpers/census.js";\nexport const read = judge;\n',
  },
  "holder-renamed-to-judge": { path: "test/planted-holder.census.ts", text: `${HOLDER_HEADER} (planted)\n */\nimport { docsSection as judge } from "./helpers/census.js";\nexport const read = judge;\n` },
  "holder-namespace-import": { path: "test/planted-holder.census.ts", text: `${HOLDER_HEADER} (planted)\n */\nimport * as census from "./helpers/census.js";\nexport const read = census.judge;\n` },
  "holder-default-import": { path: "test/planted-holder.census.ts", text: `${HOLDER_HEADER} (planted)\n */\nimport judge from "./helpers/census.js";\nexport const read = judge;\n` },
  "holder-census-infix": { path: "test/planted-holder.census.ts.txt", text: `${HOLDER_HEADER} (planted)\n */\nimport { judge } from "./helpers/census.js";\nexport const read = judge;\n` },
};
/** Planted sources for the frozen-literal reader: a literal array, one with a non-literal element, another name, a non-array, and the wrapped and template forms. */
const FROZEN_PLANTS: Readonly<Record<string, string>> = {
  "frozen-literal": 'const FROZEN_W1: readonly string[] = ["quote | a", "today | test"];\n',
  "frozen-non-literal": 'const QUOTE = "quote | a";\nconst FROZEN_W1: readonly string[] = [QUOTE, "today | test"];\n',
  "frozen-other-name": 'const FROZEN_W2: readonly string[] = ["quote | a"];\n',
  "frozen-not-array": 'const FROZEN_W1 = "quote | a";\n',
  "frozen-as-const": 'const FROZEN_W1 = ["quote | a", "today | test"] as const;\n',
  "frozen-template-element": 'const FROZEN_W1: readonly string[] = [`quote | a`, "today | test"];\n',
  "frozen-template-substitution": planted('const PIN = "a";\nconst FROZEN_W1: readonly string[] = [`quote | @{PIN}`];\n'),
  "frozen-no-initializer": "declare const FROZEN_W1: readonly string[];\n",
};
/** Planted texts for the status word's boundaries: a letter, digit, underscore or hyphen on either side breaks the whole word, punctuation does not, and the case is exact. */
const STATUS_PLANTS: Readonly<Record<string, string>> = {
  "status-whole": "the program is design-only today",
  "status-punctuated": "the program is (design-only).",
  "status-letter-before": "the program is xdesign-only today",
  "status-digit-before": "the program is 2design-only today",
  "status-underscore-before": "the program is _design-only today",
  "status-hyphen-before": "the program is non-design-only today",
  "status-letter-after": "the program is design-onlyish today",
  "status-digit-after": "the program is design-only2 today",
  "status-underscore-after": "the program is design-only_ today",
  "status-hyphen-after": "the program is design-only-ish today",
  "status-capitalized": "the program is Design-only today",
};
/** Planted texts for the sentence rule: only a full stop followed by white space and a capital letter ends a sentence. */
const SENTENCE_PLANTS: Readonly<Record<string, string>> = {
  "sentence-two": "One part ends here. A second sentence follows.",
  "sentence-lower-case-after": "It holds, e.g. a lower-case word after a stop.",
  "sentence-unspaced": "It reads v1.Two as one sentence.",
  "sentence-question": "Is it one sentence? Yes, by the full-stop rule.",
  "sentence-exclamation": "It holds! A capital follows.",
};
/** The binding this census expects of the holder's row: each half and the pins of this file it names, in pin order. */
const BINDING: readonly (readonly [string, string])[] = [
  ["today", "T1"],
  ["today", "T2"],
  ["producer-references-only", "A1"],
  ["counted-unmapped", "A2"],
  ["never-mints", "A3"],
  ["never-mints", "B1"],
  ["never-mints", "B2"],
  ["never-mints", "B3"],
];
const suiteOf = (pin: string): string => {
  const row = ROWS.find(candidate => candidate.pins.some(entry => entry.id === pin));
  return row === undefined ? "" : `${TOP} > ${row.id} ${row.label}`;
};
const expectedBinding = (): string[] => BINDING.map(([half, pin]) => [half, "test", SELF, suiteOf(pin), pin].join(" | "));
/** The paragraphs of a document's MechanicalWorkflows section that hold a sentence, read through the shared rendered view. */
function sentenceSites(markdown: string, heading: string, sentence: string): { ok: boolean; why: string; html: boolean; holding: string[] } {
  const section = docsSection(markdown, heading, 2, [DOCS07_PARENT]);
  const holding = section.blocks.flatMap(block => (block.kind === "paragraph" && block.text.includes(sentence) ? [block.text] : []));
  return { ok: section.ok, why: section.why, html: section.hasHtml, holding };
}
const quoteOfHolder = (): string => (holderLiterals(CONSTANTS.holderFrozen) ?? []).find(line => line.startsWith("quote | "))?.slice("quote | ".length) ?? "";
/** A section that holds the sentence as exactly one paragraph, whole and once. */
const heldOnce = (holding: readonly string[], sentence: string): boolean => holding.length === 1 && holding[0] === sentence;
/** The program status word (wb-kku9.2 clause (c)), as a whole hyphenated word. */
const carriesStatus = (text: string): boolean => /(?<![\w-])design-only(?![\w-])/.test(text);
/** The sentences of a text: split after a full stop followed by space and a capital. */
const sentenceCount = (text: string): number => text.split(/(?<=\.)\s+(?=[A-Z])/).length;
/** C1's scans: each BMP code point planted on either side of the status word (the code points that break it are held), and as a sentence's stop, gap and next capital (the code points that end a sentence there are held). */
const statusScan = (): { before: string[]; after: string[] } => ({
  before: BMP.filter(code => !carriesStatus(`${pointOf(code)}design-only`)).map(hex4),
  after: BMP.filter(code => !carriesStatus(`design-only${pointOf(code)}`)).map(hex4),
});
const sentenceScan = (): { stops: string[]; gaps: string[]; capitals: string[] } => ({
  stops: BMP.filter(code => sentenceCount(`It holds${pointOf(code)} A capital follows.`) === 2).map(hex4),
  gaps: BMP.filter(code => sentenceCount(`It holds.${pointOf(code)}A capital follows.`) === 2).map(hex4),
  capitals: BMP.filter(code => sentenceCount(`It holds. ${pointOf(code)}apital follows.`) === 2).map(hex4),
});

// ------------------------------------------------------------------------------------------------- residuals
const RESIDUALS: readonly Residual[] = [
  { id: "R-PACKAGE-NAME", pin: "T1", quiet: ["unscoped-name"], twin: ["manifest-dependency"], open: ["unscoped-name"] },
  { id: "R-SPEC-FORM", pin: "T1", quiet: ["manifest-git-spec", "manifest-jsr-spec", "manifest-overrides", "manifest-npm-infix"], twin: ["manifest-npm-alias"], open: ["manifest-git-spec"] },
  {
    id: "R-LOAD-FORM",
    pin: "T1",
    quiet: [
      "dynamic-specifier",
      "require-template-substitution",
      "require-alias",
      "require-member",
      "create-require-renamed",
      "require-resolve",
      "require-resolve-bare",
      "create-require-element",
      "create-require-destructured",
      "create-require-parameter",
      "create-require-property",
      "create-require-string-callee",
      "create-require-other-member",
      "create-require-compound",
      "assigned-other",
      "require-string-callee",
      "import-type-template",
    ],
    twin: ["create-require-bound"],
    open: ["require-template-substitution"],
  },
  { id: "R-LOCK-NESTING", pin: "T1", quiet: ["lock-v1-nested"], twin: ["lock-v1-dependencies"], open: [] },
  { id: "R-MODULE-KIND", pin: "T1", quiet: ["kind-md"], twin: ["kind-ts"], open: [] },
  { id: "R-JSDOC-TYPE", pin: "T1", quiet: ["kind-js-jsdoc"], twin: ["import-type-node"], open: [] },
  {
    id: "R-REQUIREMENT-ID",
    pin: "T2",
    quiet: ["requirement-id", "requirement-id-bare", "requirement-id-two-digit", "requirement-id-twice", "requirement-id-hyphen-after", "requirement-id-hyphen-before", "requirement-id-lead-embedded"],
    twin: ["type-name"],
    open: ["requirement-id", "requirement-id-bare", "requirement-id-two-digit", "requirement-id-twice", "requirement-id-hyphen-after", "requirement-id-hyphen-before", "requirement-id-lead-embedded"],
  },
  { id: "R-UNSPELLED-CONSUMER", pin: "T2", quiet: ["unspelled-consumer"], twin: ["type-name"], open: [] },
  { id: "R-SCOPE", pin: "B1", quiet: ["qa-module", "examples-src-module"], twin: ["task-template"], open: ["qa-module", "examples-src-module"] },
  { id: "R-INDIRECT", pin: "B1", quiet: ["indirect-binding"], twin: ["task-template"], open: [] },
  { id: "R-CALL-FORM", pin: "B1", quiet: ["concat-call", "join-call"], twin: ["task-template"], open: [] },
  { id: "R-PREFIX-CONSTANT", pin: "B1", quiet: ["prefix-constant"], twin: ["task-split-literal"], open: [] },
  { id: "R-COMPOUND", pin: "B1", quiet: ["task-compound"], twin: ["task-concat"], open: [] },
  { id: "R-HOLDER-FORM", pin: "B1", quiet: ["task-holder-element-key", "task-holder-call"], twin: ["task-member-id"], open: ["task-holder-element-key", "task-holder-call"] },
  { id: "R-FIELD-STRING", pin: "B1", quiet: ["task-field-string-argument"], twin: ["task-kebab-key"], open: [] },
  { id: "R-MEMBER-KEY", pin: "B1", quiet: ["task-member-identifier-key", "task-member-const-key"], twin: ["task-member-id"], open: ["task-member-identifier-key", "task-member-const-key"] },
  { id: "R-VALUE-CHAIN", pin: "B2", quiet: ["forge-value-chain"], twin: ["forge-gate-ref"], open: [] },
  { id: "R-NAME-BINDING", pin: "B2", quiet: ["forge-provider-import", "forge-provider-let", "forge-provider-member", "forge-provider-destructured"], twin: ["forge-provider-constant"], open: [] },
  { id: "R-KEY-ACCESSOR", pin: "B2", quiet: ["forge-key-getter", "forge-key-method"], twin: ["forge-id-key"], open: [] },
  { id: "R-COMPOUND-KEY", pin: "B2", quiet: ["forge-compound-key", "forge-compound-key-template"], twin: ["forge-assignment"], open: [] },
  { id: "R-ID-POSITION", pin: "B2", quiet: ["builder-argument"], twin: ["forge-native-ref"], open: [] },
  { id: "R-POSITION-BINDING", pin: "B2", quiet: ["forge-id-binding", "forge-key-binding"], twin: ["forge-native-ref"], open: [] },
  { id: "R-FIELD-SPELLING", pin: "B3", quiet: ["other-field-name", "bare-step-name"], twin: ["attempt-template"], open: ["other-field-name", "bare-step-name"] },
];
const PLANTED_OF: Readonly<Record<string, readonly string[]>> = {
  T1: [...Object.keys(MANIFEST_PLANTS), ...Object.keys(LOCK_PLANTS), ...Object.keys(IMPORT_PLANTS), ...Object.keys(MODULE_PLANTS)],
  T2: [...Object.keys(SPELLING_PLANTS), ...Object.keys(READER_PLANTS), ...Object.keys(MODULE_PLANTS)],
  B1: [...Object.keys(TASK_PLANTS), ...Object.keys(MODULE_PLANTS)],
  B2: Object.keys(FORGE_PLANTS),
  B3: Object.keys(ATTEMPT_PLANTS),
};
/** How much a planted input reads in a pin's witness (its controls or reader controls): a list's length, or a count. */
function plantReads(witness: JsonValue | undefined, plant: string): number | undefined {
  if (!isRecord(witness)) return undefined;
  for (const map of [witness.controls, witness.readerControls]) {
    const value = isRecord(map) ? map[plant] : undefined;
    if (Array.isArray(value)) return value.length;
    if (typeof value === "number") return value;
  }
  return undefined;
}

/** Whether the fail-closed readers refuse a planted input in a pin's witness: "closed" (a hit), "open" (none), "unread" (absent). */
function closedRead(witness: JsonValue | undefined, plant: string): string {
  const closed = isRecord(witness) && isRecord(witness.closed) && isRecord(witness.closed.controls) ? witness.closed.controls[plant] : undefined;
  return Array.isArray(closed) ? (closed.length > 0 ? "closed" : "open") : "unread";
}

// ------------------------------------------------------------------------------------------------- the pins
const REACHED = new Set<string>();
const IMPL: Readonly<Record<string, () => JsonValue>> = {
  T1: () => {
    const manifest: unknown = JSON.parse(readRepo("package.json"));
    const locks = ["package-lock.json", "vendor/dependency-lock.json"].map(path => {
      const lock: unknown = JSON.parse(readRepo(path));
      return { path, version: isRecord(lock) ? lock.lockfileVersion : undefined, reading: lockNames(lock) };
    });
    const src = srcFiles();
    expect(src.filter(module => isModule(module.path)).length, "the src leg reads at least SRC_FLOOR modules").toBeGreaterThanOrEqual(SRC_FLOOR);
    for (const lock of locks) expect(lock.reading.packages, `${lock.path} holds at least LOCK_FLOOR packages`).toBeGreaterThanOrEqual(LOCK_FLOOR);
    // One call reads the real modules, then the planted ones after them: a reader that stops early misses the plants.
    const plants = [...Object.entries(IMPORT_PLANTS).map(([id, text]) => ({ id, path: plantPath(id), text })), ...Object.entries(MODULE_PLANTS).map(([id, module]) => ({ id, ...module }))];
    const sites = importSites([...src, ...plants]);
    const plantOf = (site: string): string | undefined => plants.find(plant => site.startsWith(`${plant.path} `))?.id;
    expect(sites.some(site => plantOf(site) === undefined && (specOf(site) === "typescript" || specOf(site).startsWith("node:"))), "the import reader reads real src imports").toBe(true);
    // Each plant's reading is the @mechanical/ names or specifiers it yields, in reading order ([] for a quiet row).
    const controls: Record<string, string[]> = {};
    for (const [id, plant] of Object.entries(MANIFEST_PLANTS)) controls[id] = declaredNames(plant).filter(isMwName);
    for (const [id, plant] of Object.entries(LOCK_PLANTS)) controls[id] = lockNames(plant).names.filter(isMwName);
    for (const plant of plants) controls[plant.id] = sites.filter(site => plantOf(site) === plant.id && isMwName(specOf(site))).map(specOf);
    // FAIL CLOSED (FC-SCOPE): no src file's text and no manifest's or lock's text holds the scope at all, whatever form holds it.
    const scopeSrc = src.filter(module => holdsScope(module.text)).map(module => module.path);
    const scopeManifests = ["package.json", ...locks.map(lock => lock.path)].filter(path => holdsScope(readRepo(path)));
    expect(scopeSrc, "FC-SCOPE: no src file holds the scope").toEqual([]);
    expect(scopeManifests, "FC-SCOPE: no manifest or lock holds the scope").toEqual([]);
    const closed: Record<string, string[]> = {};
    for (const [id, plant] of Object.entries(MANIFEST_PLANTS)) closed[id] = closedJson(plant);
    for (const [id, plant] of Object.entries(LOCK_PLANTS)) closed[id] = closedJson(plant);
    for (const plant of plants) closed[plant.id] = closedHits(plant);
    return {
      scope: CONSTANTS.mwScope,
      manifest: declaredNames(manifest).filter(isMwName),
      locks: Object.fromEntries(locks.map(lock => [lock.path, lock.reading.names.filter(isMwName)])),
      lockVersions: Object.fromEntries(locks.map(lock => [lock.path, typeof lock.version === "number" ? lock.version : null])),
      imports: sites.filter(site => plantOf(site) === undefined && isMwName(specOf(site))),
      controls,
      closed: { src: scopeSrc, manifests: scopeManifests, controls: closed },
    };
  },
  T2: () => {
    const src = srcFiles();
    const spelling = src.filter(module => spells(module.text)).map(module => module.path);
    expect(spelling, "the src files spelling the program's words are exactly the bound consumers").toEqual(MW_COMPOSITION_CONSUMERS.map(entry => entry.module).sort(byName));
    // One call per tool name reads the real modules, then the planted readers (and the module-kind plants) after them.
    const readerPlants = [...Object.entries(READER_PLANTS).map(([id, text]) => ({ id, path: plantPath(id), text })), ...Object.entries(MODULE_PLANTS).map(([id, module]) => ({ id, ...module }))];
    const isReaderPlant = (path: string): boolean => readerPlants.some(plant => plant.path === path);
    const found = Object.fromEntries(TRIGGER_READERS.map(name => [name, literalSites([...src, ...readerPlants], name)]));
    const readers = Object.fromEntries(Object.entries(found).map(([name, sites]) => [name, sites.filter(path => !isReaderPlant(path))]));
    for (const [name, sites] of Object.entries(readers)) expect(sites.length, `the ${name} reader is found by its tool name`).toBeGreaterThan(0);
    const plants = Object.entries(SPELLING_PLANTS).map(([id, text]) => ({ id, path: plantPath(id), text }));
    const read = [...src, ...plants].filter(module => spells(module.text)).map(module => module.path);
    const controls = Object.fromEntries(plants.map(plant => [plant.id, read.filter(path => path === plant.path).length]));
    const readerControls = Object.fromEntries(readerPlants.map(plant => [plant.id, Object.entries(found).flatMap(([name, sites]) => (sites.includes(plant.path) ? [name] : []))]));
    const closed = Object.fromEntries([...plants, ...Object.entries(READER_PLANTS).map(([id, text]) => ({ id, path: plantPath(id), text }))].map(plant => [plant.id, closedHits(plant)]));
    return {
      slug: CONSTANTS.programSlug,
      spelling,
      bound: MW_COMPOSITION_CONSUMERS.map(entry => entry.module),
      readers: Object.fromEntries(Object.entries(readers).map(([name, sites]) => [name, sites.some(path => spelling.includes(path)) ? "spells" : "quiet"])),
      controls,
      readerControls,
      separators: separatorReading(),
      requirementBoundary: requirementBoundaryReading(),
      closed: { controls: closed },
    };
  },
  A1: () => contractReading("A1"),
  A2: () => contractReading("A2"),
  A3: () => contractReading("A3"),
  B1: () => {
    const listed = gitSrc();
    const walk = walkSrc();
    expect(walk.files, "a filesystem walk of src lists what git lists").toEqual(listed);
    expect(walk.links, "no symlink sits under src").toEqual([]);
    expect(listed.filter(isModule).length, "the walk reads at least SRC_FLOOR modules").toBeGreaterThanOrEqual(SRC_FLOOR);
    // FAIL CLOSED (FC-FIELD): the src modules naming a composition field anywhere are exactly the bound ones (none today).
    const fieldSites = liveFieldNames(srcFiles());
    expect([...new Set(fieldSites.map(site => site.slice(0, site.indexOf(":"))))].sort(byName), "FC-FIELD: the src modules naming a composition field are exactly MW_FIELD_MODULES").toEqual([...MW_FIELD_MODULES].sort(byName));
    const plants = { ...TASK_PLANTS, ...MODULE_PLANTS };
    return {
      prefixes: [...CONSTANTS.taskPrefixes],
      idFields: [...CONSTANTS.idFields],
      compositionWord: CONSTANTS.compositionWord,
      ...familyReading("task", plants),
      scan: prefixScan(TASK_PREFIX, CONSTANTS.taskPrefixes),
      closed: { src: fieldSites, bound: [...MW_FIELD_MODULES], controls: Object.fromEntries(Object.entries(plants).map(([id, module]) => [id, closedHits(module)])) },
    };
  },
  B2: () => ({
    providers: Object.keys(PROVIDER_FAMILY).filter(name => PROVIDER_FAMILY[name] === "forge"),
    keys: [...ID_KEYS.forge],
    ...familyReading("forge", FORGE_PLANTS),
    closed: { controls: Object.fromEntries(Object.entries(FORGE_PLANTS).map(([id, module]) => [id, closedHits(module)])) },
  }),
  B3: () => ({
    prefixes: [...CONSTANTS.attemptPrefixes],
    keys: [...ID_KEYS.attempt],
    ...familyReading("attempt", ATTEMPT_PLANTS),
    scan: prefixScan(ATTEMPT_PREFIX, CONSTANTS.attemptPrefixes),
    closed: { controls: Object.fromEntries(Object.entries(ATTEMPT_PLANTS).map(([id, module]) => [id, closedHits(module)])) },
  }),
  C1: () => {
    const docs = readRepo(DOCS07);
    const sentence = quoteOfHolder();
    expect(sentence.length, "the holder's frozen quote is read").toBeGreaterThan(0);
    const live = sentenceSites(docs, CONSTANTS.docsHeading, sentence);
    expect(live.ok, live.why).toBe(true);
    expect(live.html, "the MechanicalWorkflows section carries no HTML").toBe(false);
    expect(live.holding, "one paragraph of the section is exactly the sentence").toEqual([sentence]);
    expect(heldOnce(live.holding, sentence), "the section holds the sentence whole and once").toBe(true);
    expect(carriesStatus(sentence), "the sentence carries the program status word (wb-kku9.2 clause (c))").toBe(true);
    expect(sentenceCount(sentence), "it is one sentence").toBe(1);
    // Planted documents, each read through the same readers as the live one.
    const sitesOf = (markdown: string): string[] => sentenceSites(markdown, CONSTANTS.docsHeading, sentence).holding;
    const documents: Readonly<Record<string, string>> = {
      dropped: docs.replace(`\n${sentence}\n`, "\n"),
      doubled: docs.replace(`\n${sentence}\n`, `\n${sentence}\n\n${sentence}\n`),
      moved: docs.replace(`\n${sentence}\n`, "\n").replace("\n## Forge provider\n\n", `\n## Forge provider\n\n${sentence}\n\n`),
      extended: docs.replace(`\n${sentence}\n`, `\n${sentence} Hosts may differ.\n`),
      listed: docs.replace(`\n${sentence}\n`, `\n- ${sentence}\n`),
      prefixed: docs.replace(`\n${sentence}\n`, `\nNote: ${sentence}\n`),
      retitled: docs.replace(`# ${DOCS07_PARENT}\n`, "# Another page\n"),
    };
    const holding = Object.fromEntries(Object.entries(documents).map(([id, markdown]) => [id, sitesOf(markdown).length]));
    const held = Object.fromEntries(Object.entries(documents).map(([id, markdown]) => [id, heldOnce(sitesOf(markdown), sentence)]));
    const readings = {
      secondHeading: mwHeadingOf(`${docs}\n## MechanicalWorkflows notes\n\nNotes.\n`),
      secondHeadingBare: mwHeadingOf(`${docs}\n## MechanicalWorkflows\n\nNotes.\n`),
      subHeading: mwHeadingOf(`${docs}\n### MechanicalWorkflows details\n\nDetails.\n`),
      html: sentenceSites(docs.replace(`\n${sentence}\n`, `\n${sentence}\n\n<div>planted</div>\n`), CONSTANTS.docsHeading, sentence).html,
      statusReplaced: carriesStatus(sentence.replace("design-only", "unreleased")),
      statusEmbedded: carriesStatus(sentence.replace("design-only", "non-design-only")),
      twoSentences: sentenceCount(`${sentence} A second sentence follows.`),
    };
    const status = Object.fromEntries(Object.entries(STATUS_PLANTS).map(([id, text]) => [id, carriesStatus(text)]));
    const sentences = Object.fromEntries(Object.entries(SENTENCE_PLANTS).map(([id, text]) => [id, sentenceCount(text)]));
    return { heading: CONSTANTS.docsHeading, sentence, holding: live.holding.length, plants: { ...holding, held, ...readings, status, sentences }, scans: { status: statusScan(), sentence: sentenceScan() } };
  },
  C2: () => {
    const lines = holderLiterals(CONSTANTS.holderFrozen);
    expect(lines, `${CONSTANTS.holder} declares ${CONSTANTS.holderFrozen}`).toBeDefined();
    const shape = holderShape(CONSTANTS.holder, readRepo(CONSTANTS.holder));
    const quote = (lines ?? []).find(line => line.startsWith("quote | "))?.slice("quote | ".length) ?? "";
    const live = sentenceSites(readRepo(DOCS07), CONSTANTS.docsHeading, quote);
    expect(live.holding, "the holder's quote is the live docs/07 sentence").toEqual([quote]);
    const binding = (lines ?? []).filter(line => !line.startsWith("quote | "));
    expect(binding, "the holder binds exactly this file's pins, by file, describe path, verbatim title and tier").toEqual(expectedBinding());
    expect([shape.census, shape.judge], "the holder is the wb-6hb.11 census leg judging the gate's report").toEqual([true, true]);
    // Planted holders and frozen literals, each read through the same readers as the live holder.
    const shapes = Object.fromEntries(Object.entries(HOLDER_PLANTS).map(([id, plant]) => [id, holderShape(plant.path, plant.text)]));
    const frozen = Object.fromEntries(Object.entries(FROZEN_PLANTS).map(([id, text]) => [id, arrayLiterals(plantPath(id), text, CONSTANTS.holderFrozen) ?? null]));
    return { holder: CONSTANTS.holder, row: CONSTANTS.holderRow, frozen: CONSTANTS.holderFrozen, shape, binding, plants: { shapes, frozen } };
  },
};

describe(TOP, () => {
  it("judged set: frozen shape, roster, the owner filing's trigger and acceptance, and the constants derived from it", { timeout: 120_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:2", "A:3", "B:3", "C:2"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id: pinId, quote }) => ({ id: pinId, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.constants).toEqual(CONSTANTS);
    expect(Object.values(CONSTANTS).every(value => (Array.isArray(value) ? value.length > 0 : value !== "")), "every constant is derived from its text").toBe(true);
    // Outside anchor: the filing's trigger sentence and acceptance clauses are exactly the row labels.
    expect(CITATION.length, `${BEAD}'s Citation line is read from the bead export`).toBeGreaterThan(0);
    expect(CLAUSES).toHaveLength(3);
    expect(ROWS.map(row => row.label)).toEqual([gatingOf(CITATION), ...CLAUSES]);
    // Each pin quote sits in its label once at word boundaries, the quotes leave no word of the label unquoted, and every pin
    // is load-bearing: a pin removed from ROWS, IMPL, the frozen literal and the roster together leaves its words unquoted.
    const quotesOf = (row: Row, without?: Pin): string[] => row.pins.filter(pin => pin !== without).map(pin => pin.quote);
    expect(ROWS.flatMap(row => unquoted(row.label, quotesOf(row)).misplaced.map(quote => `${row.id}:${quote}`))).toEqual([]);
    expect(Object.fromEntries(ROWS.map(row => [row.id, unquoted(row.label, quotesOf(row)).runs]))).toEqual({ T: [], A: [], B: [], C: [] });
    expect(ROWS.flatMap(row => row.pins.filter(pin => unquoted(row.label, quotesOf(row, pin)).runs.length === 0).map(pin => pin.id))).toEqual([]);
    // The membership readers read each planted label and each scanned boundary as recorded out of file.
    expect(membershipReading(), "the pin-membership readers read their planted labels as recorded").toEqual(ROSTER.membership);
    // The producer block quotes the filing's citation of :6, and the title's type is the one :6 names.
    const filingQuote = /\('(Use CACWorkflowCompositionV0 as a concept only\. .+?)'\)/.exec(CITATION)?.[1] ?? "";
    expect(filingQuote.length).toBeGreaterThan(0);
    expect(String(ROSTER.producer.mw.filingLine6).replaceAll("\\`", "").replaceAll("`", "").startsWith(filingQuote)).toBe(true);
    expect(filingQuote.includes(CONSTANTS.gatingType)).toBe(true);
    // The producer block: held whole to its literal, and its filing fields anchored outside this file (the Citation line,
    // the title, docs/07's MechanicalWorkflows evidence line).
    expect(ROSTER.producer).toEqual({ mw: PRODUCER_MW });
    const cited = /^Citation: (docs\/programs\/[^\s:]+\.md):6@([0-9a-f]{12}) /.exec(CITATION);
    const citedPath = cited?.[1] ?? "";
    const citedPin = cited?.[2] ?? "";
    expect(citedPin.length, "the Citation line cites :6 at a 12-hex filing pin").toBe(12);
    expect(OWN.title.includes(`:6@${citedPin})`), "the title carries the same filing pin").toBe(true);
    expect(String(PRODUCER_MW.filingPin).startsWith(citedPin), "the filing pin extends the cited pin").toBe(true);
    const citedFiles = [...CITATION.matchAll(new RegExp(`([\\w.-]+\\.md):[\\d,:-]+@${citedPin}`, "g"))].map(match => match[1] ?? "");
    expect(citedFiles, "the files the Citation cites at the pin").toEqual([citedPath.slice(citedPath.lastIndexOf("/") + 1), "README.md"]);
    for (const blobs of [PRODUCER_MW.filingBlobs, PRODUCER_MW.tipBlobs]) expect(isRecord(blobs) ? Object.keys(blobs) : [], "each blob map names the cited files").toEqual(citedFiles);
    expect(PRODUCER_MW.tipTypeSpellings, "the tip spellings hold the cited program document").toContain(citedPath);
    const firstSentence = /^(.+?\.) /.exec(filingQuote)?.[1] ?? "";
    expect(firstSentence.includes(CONSTANTS.gatingType), "the filing quote's first sentence names the type").toBe(true);
    for (const line of [PRODUCER_MW.filingLine6, PRODUCER_MW.tipLine6]) expect(String(line).replaceAll("\\`", "").startsWith(firstSentence), "each :6 line opens with that sentence").toBe(true);
    expect(/\bdesign-only program\b/.test(CITATION) && /^\*\*Design-only\b/.test(String(PRODUCER_MW.tipReadme3Status)), "the tip's README status is the design-only status the Citation reads").toBe(true);
    const evidence = docsSection(readRepo(DOCS07), CONSTANTS.docsHeading, 2, [DOCS07_PARENT]).blocks.map(block => (block.kind === "paragraph" ? block.text : "")).join(" ");
    expect(/Current evidence:\W*(https:\/\/[^\s,]+)/.exec(evidence)?.[1], "the repository is the one docs/07's MechanicalWorkflows section cites").toBe(PRODUCER_MW.repository);
    // The residual table: named in order, held to the roster, each quiet row and twin a planted input of its pin.
    expect(RESIDUALS.map(residual => residual.id)).toEqual([
      "R-PACKAGE-NAME",
      "R-SPEC-FORM",
      "R-LOAD-FORM",
      "R-LOCK-NESTING",
      "R-MODULE-KIND",
      "R-JSDOC-TYPE",
      "R-REQUIREMENT-ID",
      "R-UNSPELLED-CONSUMER",
      "R-SCOPE",
      "R-INDIRECT",
      "R-CALL-FORM",
      "R-PREFIX-CONSTANT",
      "R-COMPOUND",
      "R-HOLDER-FORM",
      "R-FIELD-STRING",
      "R-MEMBER-KEY",
      "R-VALUE-CHAIN",
      "R-NAME-BINDING",
      "R-KEY-ACCESSOR",
      "R-COMPOUND-KEY",
      "R-ID-POSITION",
      "R-POSITION-BINDING",
      "R-FIELD-SPELLING",
    ]);
    expect(ROSTER.residuals).toEqual(RESIDUALS);
    expect(RESIDUALS.flatMap(residual => [...residual.quiet, ...residual.twin].filter(id => !(PLANTED_OF[residual.pin] ?? []).includes(id)).map(id => `${residual.id}:${id}`))).toEqual([]);
    // Each residual's quiet rows read nothing and its twins read, in the held witness of its pin (the residual definition).
    const heldWitness = (pin: string): JsonValue | undefined => ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin)?.witness;
    const quietReads = RESIDUALS.flatMap(residual => residual.quiet.map(id => `${residual.id}:${id}=${plantReads(heldWitness(residual.pin), id)}`));
    expect(quietReads, "every quiet row reads nothing").toEqual(RESIDUALS.flatMap(residual => residual.quiet.map(id => `${residual.id}:${id}=0`)));
    const twinsReading = RESIDUALS.flatMap(residual => residual.twin.filter(id => (plantReads(heldWitness(residual.pin), id) ?? 0) === 0).map(id => `${residual.id}:${id}`));
    expect(twinsReading, "every twin reads").toEqual([]);
    // FAIL CLOSED: each residual's open rows are exactly its quiet rows no fail-closed reader refuses, in the held witness of its pin.
    expect(RESIDUALS.flatMap(residual => residual.open.filter(id => !residual.quiet.includes(id)).map(id => `${residual.id}:${id}`)), "every open row is a quiet row").toEqual([]);
    const closedReading = RESIDUALS.flatMap(residual => residual.quiet.map(id => `${residual.id}:${id}=${closedRead(heldWitness(residual.pin), id)}`));
    expect(closedReading, "the fail-closed readers refuse exactly the quiet rows that are not open").toEqual(
      RESIDUALS.flatMap(residual => residual.quiet.map(id => `${residual.id}:${id}=${residual.open.includes(id) ? "open" : "closed"}`)),
    );
    // The binding the holder must carry names every pin of rows T, A and B once, and no pin of row C.
    expect(BINDING.map(([, pin]) => pin)).toEqual(ROWS.filter(row => row.id !== "C").flatMap(row => row.pins.map(pin => pin.id)));
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 120_000 }, () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          REACHED.add(pin.id);
        });
      }
    });
  }
  it("records: every registered pin ran to the compare with its roster witness", () => {
    expect([...REACHED].sort(byName)).toEqual(ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
  });
});
