/**
 * wb-ts6.2 (HXFS-PI-R6, program-triage-2026-10-18), the until-then leg: the HX mutation 'Verified' census.
 * Statement (bead title, as the tracker export holds it, rendered in 7-bit ASCII: its two em dashes as ' - '): "Before any Pi
 * hyperunix capability with a non-read effect class registers (gating artifact: the same Pi HX WRITE surface wb-tz2.8 gates), its
 * reconcile/receipt path shall read an HX mutation 'Verified' postcondition as filesystem-only - never as import/build/semantic
 * success - and shall require an independent build/import recheck before any semantic-success claim; the read adapter's refusal of
 * mutation outcomes stays until then."
 * The owner filing (the bead's notes) grounds the until-then posture: "Today the class is unreachable: wb-6ze.7's landed
 * adapter refuses mutation outcomes and the wb-tz2.8 standing census pins every registered hyperunix descriptor to effectClass
 * read, so no Pi path can represent Verified at all", and closes its armed acceptance with "the wb-tz2.8 effect-class census
 * remains the until-then standing guard". Rows A, B and C quote those three until-then clauses verbatim (the title's last
 * clause, the armed acceptance's last clause and the unreachability sentence's conclusion), held both ways to the export.
 * SOURCE (HyperUnix-CLI 694570cd00c2, read-only git show by the cutting seat; not read by this file):
 * docs/programs/feedback-query-skill-factory-2026-10-16/08-epistemic-and-performance-contracts.md:68 'never use "Verified" as
 * an implicit semantic refactor certificate'; README.md:33 'a filesystem Verified mutation is not semantically safe';
 * 06-workflow-recipes.md:90-91 (W7 steps 5-6: the program does not authorize the apply; "Independently recheck every
 * relevant import/build relationship and distinguish filesystem postcondition `Verified` from semantic build success").
 * The vendored SDK states the same boundary (MutationReceipt.verified, protocol/mutation.d.ts): "True only on coherent runtime
 * evidence of successful re-observation/postcondition verification." (A3 holds that sentence to the shipped declaration.)
 *
 * NOT DELIVERED HERE (the armed acceptance's first two clauses, NOT_DELIVERED below, held verbatim to the export): "a
 * reconcile unit test where a mutation receipt carrying a filesystem Verified postcondition yields a typed filesystem-only
 * reading and no build/semantic-success claim until an independent Forge/import recheck result is cited" and "a falsifier
 * reddens any surfaced string mapping Verified to semantic or build success". Both wait for the gating artifact, a Pi
 * hyperunix capability with a non-read effect class, which does not exist: B2 reads the armed set of the native and the
 * injected-reader registrations empty; a descriptor a host registers through another module is delegated to wb-gwr.1 A3's
 * src-wide descriptor-literal scan (pinned there, not here: SCOPE; refusal #1 F1). When B2 reads a descriptor armed, this
 * census reds by design: re-measure, and the armed acceptance applies.
 *
 * CLAIM BOUNDARY (cut #4, the FAIL-CLOSED CORE of orchestrator ruling R-B112, at refusal #3 on the R-B91-frozen enumerate cut #3):
 * this census claims exactly what its pins read. Rows A, B and C each quote one until-then clause of the bead's own text as the
 * clause they judge, and each holds that clause only as far as its pins read. Every pin below states its reader's domain - the
 * forms, values and positions it reads - and each enumerated form has a control the census runs and pins. Where a reader does
 * not read a form, the census either refuses the form (FAIL-CLOSED: C5 reds on every src entry that is not a directory or a
 * regular module file, so no reader is handed a file it does not read; C2 reds on every src destructure form it does not read)
 * or names it as a residual with a pinned quiet row (row Q, RESIDUALS). A form found outside the readers' domains, outside the
 * refused forms and outside the residuals is a residual addition to this list, never a reading these rows claim. The
 * reader-coverage work beyond this core - module identity through links, entry modules of other extensions, the computed-key and
 * assignment destructure arms, an environment axis for row A - is wb-ts6.3's (filed under wb-ts6, blocked by this bead).
 *
 * MEASURED (cut 1 by seat ws-04, run g10-work-s125, on trunk 061c2ac; respin 1 by seat ws-05, run g10-work-s138, on trunk 04123dc;
 * respin 2 by seat ws-03, run g10-work-s141, on trunk aa95f43; cut #4 by seat ws-02, run g10-work-s146, on trunk cdf5484; every
 * fact here is a pinned witness): the vendored @hyperunix/sdk 0.1.0 declares 13 ExecutionStatusKind members, two of them mutation
 * outcomes (mutation-rejected, mutation-partial), and no Verified kind; its client's PATH lookup spawns hx.exe on win32 and hx
 * elsewhere; its receipt wire form carries a coherent Verified receipt in six fields (state, terminal_event, journal,
 * verification, verified, recovery), and its index exports four wire-form writers (resultToJson, frameToJson, receiptToJson,
 * planToJson). The adapter (src/workbench/hyperunix-observer.ts) refuses both mutation outcomes under either licence in each of
 * row A's 10 shapes and 736 product shapes, and accepts as a find kind none of the Verified spellings A3 reads from the
 * protocol's declaration. Every registered hyperunix descriptor is the hyperunix.find read, and src registers only the native
 * one (twice: src/workbench/native-modules.ts and src/workbench/hosts/local-detached.ts), never the injected-reader
 * registration; the default gate tier (forge.toml's test step, npm run test, vitest run with vitest.config.ts) lists the wb-tz2.8
 * guard and this census among at least TIER_FLOOR files. src holds directories and regular .ts module files only (C5 and C1's
 * walk extensions); its modules name the SDK at five literals (the named import in src/workbench/providers/hyperunix.ts and that
 * module's two contractSource literals, the identity runtime-artifact list in src/index.ts, one import.meta.resolve in
 * src/workbench/hosts/local-detached.ts) and at no other C1 site, bound site or consumer, reference 23 SDK members and bindings,
 * all in that provider module, none of the mutation or argv class, and write no destructure form C2 does not read.
 * nativeEvidence projects HX metadata for hyperunix.find only (domainStatus is the result's kind, verbatim); drawn for every
 * declared kind, the workflow card's and the dialog's verified glyph light on none ("verified", which no declared kind spells,
 * lights both), and src names domainStatus at 25 places. No word of a string literal in a src module is an hx spelling; src
 * launches forge, git and rf by literal command.
 *
 * REPRESENT, as the owner filing grounds it: a Pi path represents Verified when an HX mutation outcome - a receipt, its
 * verification evidence, a recovery classification or a raw hx run - can reach a Pi value. Row C reads the paths its pins name
 * (an SDK load, an SDK member or binding, the evidence projection and its glyphs, a literal hx spelling). A path its pins do not
 * read is a residual: the named ones are RESIDUALS (among them a hand-read receipt, R-HAND-READ-RECEIPT, and Pi's own wording
 * about Verified, the armed falsifier's subject, NOT DELIVERED, R-PI-TEXT), and one found outside them is a residual addition
 * (CLAIM BOUNDARY), never a reading row C claims.
 *
 * The census pins three judged rows and the residuals' quiet rows:
 *  A, the adapter's refusal, judged over SHAPES and two products. Each judged reading is a call of the shipped adapter made in
 *    this census's own process (its environment, its clock, the adapter's module state at that call): a refusal
 *    conditioned on any input a judged reading does not carry is R-AMBIENT-CONDITION's (Q15). SHAPES (respin 1, refusal #1 U4):
 *    the minimal reading, one variation of each field the adapter declares it consumes (HYPERUNIX_CONSUMED_FIELDS, src's own
 *    list: rows present, a non-retaining stream, a coverage certificate, another operation, another runtime identity, the relayed
 *    facets), another host context over the same workspace (MOVED_HOST: principal, target, times, invocation, operation
 *    reference), the receipt fields (respin 2, refusal #2 U3: the SDK's whole receipt wire form, RECEIPT_WIRE; the adapter
 *    consumes none of its fields but diagnostics, an empty list there) and all of them at once. The products (respin 2, refusal
 *    #2 U4): (i) every subset of the seven source and runtime variations (SOURCE_VARIATIONS: the receipt fields, rows, the
 *    non-retaining stream, the certificate, the operation, the runtime, the relayed facets; 128 subsets) under the base and the
 *    moved host context, and (ii) every host context of the HOST_VALUES cross product (two principals; five target kinds:
 *    regular-file, directory, symlink, fifo, socket; the roots src, test and none; two clock pairs; an invocation id or none; an
 *    operation reference or none: 240 hosts) under the minimal source and under all seven source variations at once - 736
 *    product shapes. Read by path, every consumed field but the three envelope identities moves in some shape or in the kind and
 *    licence loops (asserted); the envelope identities (the contract, the representation, the workspace root) hold their one
 *    accepted value in every judged reading (asserted), so no reading that moves one is judged here (refusal #2 F6).
 *    A1 every kind the shipped declaration (dist/result.d.ts, by the TypeScript AST) declares, in order, is the adapter's kind
 *    tuple; each kind under either licence in each shape, read by hyperunixTopology, projects (coverage and tone) or is refused
 *    (category and message): the SDK's mutation outcomes (the "mutation-" kinds) are refused in every shape and every product
 *    shape (the 19136 product readings pinned by their sha256) and are exactly the refused kinds of the minimal reading; the
 *    declaration reader reads its control. A2 hxLiveInvariant (called with the reading alone, no host context) over the shapes
 *    and the 128 source subsets (3328 readings, by sha256): in each, only the mutation outcomes break the read-outcome clause, and
 *    none licenses absence. A3 the mutation protocol's Verified vocabulary, read from the shipped dist/protocol/mutation.d.ts
 *    (the VerificationEvidence outcome union, the receipt-state tokens the RecoveryClassification.journalStatus doc lists, the
 *    MutationReceipt.verified doc), each token as a find kind in every shape and every product shape (4416 readings, by sha256):
 *    declared or not, the adapter's answer and the invariant's; the vocabulary reader reads its control.
 *  B, the standing guard. B1 test/workbench-hyperunix-effect-class-census.test.ts is present, byte-identical to the measured
 *    guard (sha256), names wb-tz2.8 and registers its suite and six cases (titles by AST); the title reader reads its control.
 *    B2 the guard's condition, re-measured under the census's own process environment (R-ENV-REGISTRATION, Q14): the hyperunix
 *    descriptors (the reconcile core's producerOf) of the native and the injected-reader registrations each read
 *    hyperunix.find|read and the armed set (any other effect class) is empty, with the judge's controls (a write and an external
 *    hyperunix descriptor arm it; a read one and another producer's write do not); the provider module's exports and every src
 *    call of its registration exports (with the call reader's control). B3 the guard runs where its tier says (the title-census
 *    floor's tier truth, respin 1, refusal #1 U5): the default gate tier, resolved by the census helper's resolveTier
 *    (forge.toml's test step through its one npm hop to a vitest run), its argv read by vitest's parseCLI (pinned: no positional
 *    filter, no flag beyond the measured ones), its config resolved by vitest's resolveConfig (vitest.config.ts, no
 *    testNamePattern, its setup files pinned) and the files vitest's own glob lists for that config (createVitest): the guard and
 *    this census are listed among at least TIER_FLOOR files, and the guard drops out of the list when the tier's exclude names it
 *    (the control).
 *  C, the paths that could represent Verified, read in src only (R-OUTSIDE-SRC). C5 bounds every C reader's input: the src walk
 *    the readers share (srcModules) is exactly C5's module entries.
 *    C5 (cut #4, FAIL-CLOSED; refusal #3 U1 and U2) every entry below src, listed with the entry type readdir reports (a link is
 *    never followed), is a directory or a regular file whose name ends with a MODULE_EXTENSIONS member, and src itself is a
 *    directory, not a link (lstat). Any other entry - a symbolic link (to a file or to a directory), a regular file of any other
 *    name (a .json data entry, a name with no extension, a .TS in another letter case), a FIFO, a socket or a device - reds C5:
 *    no C reader reads it. The entry reader reads its control (ENTRY_CONTROLS: module files, a directory, a link to a file and a
 *    link to a directory, files of other names, a FIFO, a socket and a device) and, on the installed tree, reads npm's own links
 *    (node_modules/.bin/tsc and vitest) as links and the SDK package's manifest and README as files of another name
 *    (ENTRY_WALK_CONTROLS); lstat reads the link node_modules/.bin/tsc as a link (ROOT_CONTROL, the root check's control).
 *    C1 (respin 2, refusal #2 U2) reads, in every src walk module's program file (every walk module is one, asserted), each
 *    string literal (a string or a no-substitution template) that spells the SDK package name as written, or spells it read as a
 *    path (asPath: percent-escapes decoded, a backslash read as /, . and .. segments and doubled separators collapsed, lower
 *    case), or stands in a specifier position or as a file-like argument (a separator, no white space) of a call or a
 *    construction and is mapped into the installed package by the repo's own resolution (ts.resolveModuleName under
 *    tsconfig.json: a file below the package directory, or a file whose nearest package.json is the SDK's own); and each text part
 *    of a template (its head, middle or tail) that spells the SDK as written or as a path, read through its template's position.
 *    Each site is read for its consuming context, enumerated: import, export, import-equals, import-type, dynamic-import,
 *    import-meta-resolve; by the checker's resolved signature in @types/node's module.d.ts (SIGNATURE_LOADERS), require (a
 *    NodeJS.Require call: require itself, a createRequire or Module.createRequire result - bound, inline or aliased),
 *    module-require (NodeJS.Module's require method: module.require, require.main.require) and require-resolve
 *    (NodeJS.RequireResolve); call and new (any other call or construction taking the literal as an argument: FAIL-CLOSED); and
 *    literal (any other position). Bound sites: every call and construction argument that is no literal but a value the checker
 *    narrows to string literals (a const binding, a literal union, a template of literals) whose value spells the SDK as a path
 *    or, as a loader's specifier or a file-like argument, resolves into it - read as bound-<loader>, or bound-call and bound-new
 *    (FAIL-CLOSED). A site VIOLATES when its context loads (import, export, import-equals, import-type, dynamic-import, require,
 *    module-require) and it is opaque (namespace, default, side-effect, export *, a dynamic, require-made or bound load, subpath,
 *    any spelling but the bare package name, a template) or names one of the 39 exports the SDK's index re-exports from its two
 *    mutation modules (read from dist/index.d.ts), or when its context is call, new, bound-call or bound-new. The src site list
 *    is pinned exactly (a new src literal or value that C1 reads, in any context, reds C1 for re-measure). The site controls
 *    (SITE_CONTROLS, parsed alone: their only checker-free loader is the identifier require), the bound-load control, the loader
 *    controls (LOADER_CONTROLS, compiled with src: every load form and fail-closed consumer violates, both resolvers read as
 *    sites that do not; a literal-union bound site among them), a template's middle and tail part each, one literal-position
 *    control per asPath reading (a backslash, a . and a .. segment, a doubled separator,
 *    upper case, a percent-escape: each read where no resolution is asked), the walk's extension control, the package-name
 *    reader's control (the SDK's own module and a src module) and the surface reader's control read as pinned.
 *    C2 one type-checked program over src (the repo's tsconfig file list and options) plus virtual control modules. C2 reads an
 *    SDK member or binding where its name is written: a property access, an element access whose key type is one string literal,
 *    an object binding element whose key is an identifier or a string literal (shorthand, renamed, nested, defaulted or a
 *    parameter's), and an identifier (an imported binding used as a value or a type, its import specifier included) - each whose
 *    symbol the checker resolves to an SDK declaration file. A reference VIOLATES when it is of the MUTATION class (declared in
 *    dist/mutation.d.ts or dist/protocol/mutation.d.ts, or a member whose declared type is one of their exports: the mutations
 *    getter) or the ARGV class (a callable whose signature takes a caller argv: the raw escape hatch). The src reference list is
 *    pinned exactly (a new reference of a read form reds C2 for re-measure) and the controls (a member, a destructured name -
 *    shorthand, renamed, string-keyed, nested, defaulted, a parameter's - a literal key, a const key, a namespace member, raw, a
 *    value flowed through another module, an imported binding called, one reached by a relative path, a type-only one, an .mts
 *    module) read as pinned. FAIL-CLOSED (cut #4; refusal #3 U3): the
 *    destructure forms C2 does not read are refused wherever src writes them, whatever the value's type - an object binding
 *    element whose key is computed (a quoted literal in brackets, a const, any expression) or numeric, and a destructuring
 *    assignment (an object or array literal on the left of =, or as a for-in or for-of head); src writes none (asserted), and the
 *    exclusion reader refuses each UNREAD_DESTRUCTURE_CONTROLS member and no READ_DESTRUCTURE_CONTROLS member. An SDK member
 *    reached any other way is a residual: R-COMPUTED-KEY (another key type, reflection; Q1) or R-CAST-AWAY (a value whose type
 *    carries no SDK declaration; Q2).
 *    C3 the evidence projection: the nativeEvidence switch labels (by AST), each declared kind's projected domainStatus, a
 *    receipt-shaped output (RECEIPT_SOURCE: the SDK's receipt wire form under a Verified kind) under each SDK mutation verb (the
 *    MutationOperation union and each MutationPlan method answering a MutationReceipt)
 *    projecting nothing, a find reading carrying the receipt fields projecting its kind verbatim (refusal #1 F7), and so does a
 *    find reading carrying each of the 64 subsets of the wire form's six Verified-carrying fields (the key or its JSON value
 *    spells verified: state, terminal_event, journal, verification, verified, recovery) beside its other fields (respin 2,
 *    refusal #2 U3); the receipt is the SDK's own: receiptToJson of the receipt receiptFromJson recomputes from RECEIPT_SEED,
 *    coherent and verified. The verified glyphs judged by drawing them (respin 1, refusal #1 U3): the workflow card
 *    (layoutWorkflowCard) and the dialog (layoutWorkflowDialog) over a done, current, evidenced node for every declared kind
 *    light no tick, and the control "verified" lights both; every src place naming domainStatus (an identifier, a member, a
 *    binding, an element key, a property key) with its consuming context, pinned exactly (a new place naming domainStatus - a
 *    helper call's argument, a membership test, a destructure - reds C3 for re-measure; a read that never names it is
 *    R-STATUS-UNNAMED's); every src comparison of a domainStatus read with a literal (an equality, an includes/has/indexOf
 *    membership on a literal list, a switch case; the read through parentheses, ??, a non-null assertion or a cast) and the
 *    declared kinds it would light (none); the case, verb, glyph and place readers read their controls.
 *    C4 (respin 2, refusal #2 U1) no word of a string literal in a src walk module (a string, a no-substitution template, a
 *    template's head, middle or tail, split at white space and shell punctuation, a backslash included) is an hx spelling: a
 *    word whose last path segment (after its last /) is hx, or, in any letter case, hx followed by one of HX_WIN32_EXTENSIONS
 *    (.exe, .com, .cmd, .bat, .ps1). C4 reads module files only; src holds no other file (C5: a .json launch entry reds C5). The
 *    SDK's own binary names (its client's resolveBinary, read from the shipped dist/client.js: hx.exe on win32, hx elsewhere) are
 *    hx spellings (asserted). The reader does not ask which call carries the literal: the carrier controls (LAUNCH_CONTROLS: a
 *    launcher alias, a promisified launcher, a shell's -c script, an env-assignment prefix, npx, a binding, a no-substitution
 *    template, a template's head, middle and tail) and the
 *    spelling controls (HX_SPELLING_CONTROLS: a win32 path, the SDK's win32 name, its letter cases, a POSIX and a win32 path to
 *    it, .com, the .cmd, .bat and .ps1 shims, a win32 template) are each flagged, the near-miss control (hxd, phx, hx-sdk, the HX
 *    prose name, an hx.fs/ target kind, hx.exe.config, hx.json, hx-binary:) is not, and the launch reader still sees src's
 *    literal launches (forge, git, rf: the floor).
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's witness, the constants, the controls, the residual families and every registered test title - is held to
 * the out-of-file roster (test/fixtures/hx-mutation-verified-roster.json); the labels of rows A, B and C are held both ways to
 * the bead's title and notes in the tracker export (.beads/issues.jsonl), and NOT_DELIVERED to the armed acceptance's first two
 * clauses. The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it) and
 * the pins that reached their witness.
 * NOT CLAIMED (edits of this file and the roster together): below row level, a pin removed from ROWS, the literal, IMPL and
 * the roster (the bead text anchors rows A, B and C, not their pins); a control removed from its list and the roster; a pin's
 * case replaced by one that echoes its roster witness; a product reading the census and the roster move together (the roster
 * pins the products' readings by digest, not one by one). At row level, row Q (respin 1, refusal #1 U6): the residual
 * enumeration is anchored by this file and its roster alone - no outside text names the residual families - so row Q removed
 * from both together (its ROWS line, the literal's entry, IMPL Q1-Q16, RESIDUALS and the roster's row, tests and
 * constants.residuals) is not claimed; rows A, B and C are anchored outside both (the bead's own text, judged-set case).
 * RESIDUALS (named, each with its pinned quiet row): R-COMPUTED-KEY an SDK member reached through an element access whose key
 * type is not one string literal (a composed string, a union of literal keys, a keyof type) or by reflection (Reflect.get,
 * Object.values, a property descriptor, a for-in walk) is not read by C2 (Q1, one probe each); R-CAST-AWAY an SDK value read
 * through a type that carries no SDK declaration - a cast's target type, any (a require-made load's result, respin 2), or the
 * type the checker synthesizes for a rest binding or a spread copy (cut #4) - carries no SDK symbol, so C2 reads no reference on
 * it; C1 reads the require-made load itself (Q2); R-INJECTED-READER registerHyperUnixFind accepts any reader and nativeEvidence
 * copies a hyperunix.find kind unchecked, so a non-SDK reader's kind "verified" would project domainStatus "verified" (the
 * glyphs' trigger) although the adapter refuses it - src never calls that registration (B2) (Q3); R-COMPOSED-SPECIFIER a load or
 * a call argument the checker types as plain string and built from parts none of which spells the SDK as a path - fragments
 * concatenated or joined ("@hyperunix/" + "sdk"), a function's return - or read through a widened value (a container member:
 * the literal itself stays a C1 site), or a require-made loader whose base path is built at run time (its literal specifier
 * resolves from that base, not from the module), is neither a C1 site nor a bound site (Q4; a part that spells the SDK is a C1
 * site, pinned exactly, and a template whose substitutions are literals is narrowed by the checker and read as a bound site, the
 * bound-load control); R-COMPUTED-COMMAND an hx launch whose command is not the text of a string literal in a src module -
 * composed at run time, built from char codes, a regex's source or a template's substitution, read from the environment (the
 * SDK's own HYPERUNIX_HX among them), a resolved binary path, or a file or module outside src (a data file's field, another
 * module's export; cut #4) - is not seen by C4 (Q5); R-OUTSIDE-SRC the census reads src only: a module outside src - a repo
 * module or an installed package other than the SDK that a src module loads, an operator's local provider module
 * (DetachedLaunchRequest.localProvider, loaded at run time from outside src) - is not read (Q6); R-PI-TEXT a src string mapping
 * Verified to build or semantic success is not read by rows A-C - judging it is the undelivered falsifier (Q7);
 * R-UNSAMPLED-VALUE A1-A3 judge the shapes and the two products only: a refusal conditioned on a value outside the sampled sets
 * (Q8 lists them: each consumed field's values across the shapes and each host-context field's in HOST_VALUES), or on a cross
 * term outside the products (a source subset under a third host context, a host context under a partial source subset), is
 * not judged (Q8); R-STATUS-UNNAMED a status read that never names domainStatus (Object.values over a node, a composed key,
 * Reflect.get) in a module the render does not draw is neither a C3 place nor a trigger (Q9); R-HOST-FOLDED-WORD (respin 2) a
 * spelling a host folds to the command - the bare name in another letter case (HX, Hx, hX, as a word or a path's last segment)
 * on a case-insensitive host (win32, macOS by default), or a trailing dot win32 strips (hx., hx.exe.) - is no hx spelling: C4
 * reads the bare name case-sensitively, because src spells HX as the product's prose name in its messages (Q10: the probe's
 * launches are seen, no hx word is); R-RENAMED-BINARY (respin 2) the hx binary or a wrapper of it under another file name - a
 * copy, a link, a wrapper (hyperunix, hx-cli, hx2), or hx with an extension outside HX_WIN32_EXTENSIONS (hx.sh, hx.vbs) - is no
 * hx spelling (Q11); R-SHELL-JOINED-WORD (respin 2) a shell command line that forms the command from other text - quoted or
 * escaped parts (h\x, 'h'x, "h"x, h''x), a parameter expansion's default (${HX_BIN:-hx}), a glob pattern ([h]x) - yields no
 * hx word (Q12); R-UNSAMPLED-RECEIPT (respin 2) C3 samples one receipt, the SDK's wire form of RECEIPT_SEED: a projection
 * conditioned on another value of a receipt field (another journal event sequence, a rejection, a non-empty diagnostics list,
 * an incoherent or a torn receipt), on a nested field's presence within a carrier, or on a field of the SDK's other wire forms
 * (Q13 lists its writers: resultToJson, frameToJson and planToJson beside the sampled receiptToJson) is not judged (Q13);
 * R-ENV-REGISTRATION (respin 2, refusal #2 F1) B2 reads the registrations under the census's own process environment, so a
 * registration conditioned on another environment value is not re-measured by B2 (Q14: a write descriptor registered only
 * under PI_HX_MUTATIONS=1 arms only under the flag) - the guard (B1, sha-pinned) reads its descriptor literal, and wb-gwr.1 A3
 * a host-registered one; R-AMBIENT-CONDITION (cut #4; refusal #3 U4) each judged reading of row A is a call made in this
 * census's own process, so a refusal conditioned on an input no judged reading carries - the process environment (refusal #3's
 * PI_HX_ALLOW_MUTATION_OUTCOMES), the clock, a random draw, state the adapter or a module it imports keeps across calls - is not
 * judged (Q15: stand-ins gated on an environment flag, a call count and a clock answer the census's own inputs as the adapter
 * does, and open under each other input); R-HAND-READ-RECEIPT (cut #4; refusal #3 F6) an HX receipt or one of its fields read
 * into a Pi value, or computed there, by src code that references no SDK member - hand-written (parsed from a file, a process's
 * output or any other text), or SDK code copied below src under a name the program compiles (its literals, declarations and
 * references are then src's own) - with no SDK name, no hx spelling and no domainStatus place, is read by no C pin (Q16: the
 * disk-read probe, refusal #3's L3-C-DISK-RECEIPT shape, and a copied receipt-assembly probe each read as no C1 site, no C2
 * reference, no C3 place or trigger and no C4 word or launch).
 * SCOPE: the clause judges this repo's src and the vendored SDK 0.1.0; the reconcile core's evidence-read table
 * (RECONCILE_EVIDENCE_READS, wb-gwr.1 row B) and the src-wide descriptor-literal scan (wb-gwr.1 A3) are pinned there and not
 * re-read; a refusal conditioned on a provider field outside HYPERUNIX_CONSUMED_FIELDS is a read outside the adapter's declared
 * set, which test/workbench-hyperunix-consumed-fields.test.ts (wb-3ht.1) pins both ways and this census does not re-read; C4
 * overlaps wb-ts6.1's N3 on literal launches only.
 * CUT HISTORY: the cures of refusals #1 and #2 (respins 1 and 2), each red-first against the gate's own plants, are recorded in
 * the bead's delivery notes. Cut #4 (R-B112's fail-closed core) excludes or states each refusal #3 item: U1 (a src .json launch
 * entry) and U2 (a link below src) red C5; U3 (computed-key, const-key and assignment destructures) reds C2's exclusion; U4 (a
 * refusal conditioned on the process environment) is R-AMBIENT-CONDITION's (Q15); refusal #3 F6's disk-read receipt is
 * R-HAND-READ-RECEIPT's (Q16). The members found while restating - rest and spread copies (R-CAST-AWAY), literal-union and keyof
 * keys, Object.values, a property descriptor and a for-in walk (R-COMPUTED-KEY), a command read from a file or module outside
 * src (R-COMPUTED-COMMAND), SDK code copied below src under a compiled name (R-HAND-READ-RECEIPT) - are named with probes, and the
 * envelope identities' one value is asserted in every judged reading.
 *
 * Display paths added: none. Test-only: no scratch is allocated and nothing is written (the virtual modules live in memory);
 * src, the SDK's shipped declarations and client, @types/node's module declarations (through the program), one landed test
 * file, forge.toml, package.json, vitest.config.ts and .beads are only read, and the installed tree's node_modules/.bin and SDK
 * package entries are listed (C5's walk controls).
 */
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readdirSync, readFileSync, realpathSync } from "node:fs";
import { dirname, join, posix, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { receiptFromJson, receiptToJson } from "@hyperunix/sdk";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { createVitest, parseCLI, resolveConfig } from "vitest/node";
import { ASCII_GLYPHS, layoutWorkflowCard, plainWorkflowCardLines } from "../src/ui/workflow-card.js";
import { ASCII_DIALOG_GLYPHS, initialWorkflowDialogState, layoutWorkflowDialog, plainWorkflowDialogLines } from "../src/ui/workflow-dialog.js";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import {
  HYPERUNIX_CONSUMED_FIELDS,
  HYPERUNIX_EXECUTION_KINDS,
  type HyperUnixTopologyContext,
  hxLiveInvariant,
  hyperunixTopology,
} from "../src/workbench/hyperunix-observer.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import * as hyperunixProvider from "../src/workbench/providers/hyperunix.js";
import type { WorkflowNodeEntry } from "../src/workflow/progress.js";
import { producerOf } from "../src/workflow/reconcile.js";
import { DEFAULT_GATE_TIER, resolveTier } from "./helpers/census.js";

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "hx-mutation-verified-roster.json");
const BEAD = "wb-ts6.2";
/** This census, as the default tier lists it (B3 reads it beside the guard). */
const SELF = "test/workbench-hx-mutation-verified-census.test.ts";
/** The vendored SDK's package name and the shipped declarations the census reads (read-only). */
const SDK = "@hyperunix/sdk";
const SDK_DIST = "node_modules/@hyperunix/sdk/dist";
const RESULT_DECLARATION = `${SDK_DIST}/result.d.ts`;
const INDEX_DECLARATION = `${SDK_DIST}/index.d.ts`;
const MUTATION_DECLARATION = `${SDK_DIST}/mutation.d.ts`;
const MUTATION_PROTOCOL_DECLARATION = `${SDK_DIST}/protocol/mutation.d.ts`;
/** The SDK's two mutation modules, as its index re-exports them and as their declaration files sit below dist. */
const MUTATION_MODULES = ["./mutation.ts", "./protocol/mutation.ts"] as const;
const MUTATION_FILES = ["mutation.d.ts", "protocol/mutation.d.ts"] as const;
/** The SDK ExecutionStatusKind members whose name opens with this prefix are its mutation outcomes. */
const MUTATION_PREFIX = "mutation-";
/** The standing guard the bead names (wb-tz2.8's effect-class census) and the bead id its header names. */
const GUARD = "test/workbench-hyperunix-effect-class-census.test.ts";
const GUARD_BEAD = "wb-tz2.8";
/** The producer the reconcile core derives for a hyperunix capability (src/workflow/reconcile.ts producerOf). */
const PRODUCER = "hyperunix";
/** The src walk reaches at least this many modules (116 measured at cut 1, 117 at respin 1); a floor, not an exact set. */
const SRC_FLOOR = 100;
/** The module files the src walk reads (respin 1, refusal #1 U2): every extension tsc or node loads as a module, declarations included. */
const MODULE_EXTENSIONS = [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"] as const;
/** The default gate tier lists at least this many test files (476 measured at respin 1); a floor, not an exact set. */
const TIER_FLOOR = 400;
/** The module whose nativeEvidence switch projects producer metadata (domainStatus included). */
const EVIDENCE_MODULE = "src/workbench/native-evidence.ts";
/** Launchers whose first argument names the command (the child_process family and Pi's own exec). */
const LAUNCH_NAMES = ["exec", "execFile", "execFileSync", "execSync", "fork", "spawn", "spawnSync"] as const;
/** Commands src launches by a literal: C4's floor, so its scan is shown to see launches at all. */
const LAUNCH_FLOOR = ["forge", "git", "rf"] as const;
/** C4's word reader (respin 1, refusal #1 U1): a literal's text splits into words at white space and shell punctuation. */
const WORD_SEPARATORS = /[\s;|&()<>`'"$={},\\]+/;
/** The command C4 judges: the bare name hx (and its win32 forms, HX_WIN32_EXTENSIONS). */
const HX_COMMAND = "hx";
/** The vendored SDK's shipped client: its resolveBinary binds the per-platform binary name its PATH lookup spawns (C4's anchor
 * outside this census, respin 2, refusal #2 U1: hx.exe on win32, hx elsewhere). */
const SDK_CLIENT = `${SDK_DIST}/client.js`;
/** The win32 forms C4 reads beside the bare name, in any letter case (respin 2, refusal #2 U1): the SDK's own win32 name's
 * extension (.exe; C4 holds every SDK binary name to this family) and the other win32 executable and shim extensions .com, .cmd,
 * .bat and .ps1. Any other extension is R-RENAMED-BINARY's. */
const HX_WIN32_EXTENSIONS = [".exe", ".com", ".cmd", ".bat", ".ps1"] as const;
/** The host-bound context and identity every synthetic find reading carries (no file, process or SDK access). */
const WS = "/hx-mutation-verified-census/workspace";
const BINARY = "5f".repeat(32);
const CONTEXT: HyperUnixTopologyContext = {
  scope: { workspace: WS, principal: "local-operator:census" },
  target: { kind: "hx.fs/regular-file", root: "src" },
  capturedAt: "2026-10-28T00:00:00Z",
  observedAt: "2026-10-28T00:00:01Z",
};
/** The census's own receipt seed (respin 2, refusal #2 U3): a coherent Verified apply journal and its recovery classification, as the
 * SDK's receipt wire form carries them. C3 and row A read the SDK's own receiptToJson(receiptFromJson(seed)) (RECEIPT_WIRE), so the
 * field set and every value the SDK recomputes are the SDK's, never this census's choice. */
const RECEIPT_SEED: JsonObject = {
  plan_id: "census-plan",
  execution_id: "census-execution",
  journal: {
    execution_id: "census-execution",
    ended: true,
    events: [
      { seq: 1, body: { kind: "ActionCommitIntent", payload: { action: "census-action" } } },
      { seq: 2, body: { kind: "ActionApplied", payload: { action: "census-action" } } },
      { seq: 3, body: { kind: "VerificationStarted", payload: {} } },
      { seq: 4, body: { kind: "PostconditionChecked", payload: {} } },
      { seq: 5, body: { kind: "MutationVerified", payload: { coverage: "complete", unknown: 0 } } },
    ],
  },
  recovery: { execution_id: "census-execution", journal_status: "Verified", status_after_recovery: "Verified" },
};
/** A JSON value the census requires to be an object (the SDK's receipt wire form). */
function objectOf(value: JsonValue, what: string): JsonObject {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${what} must be an object`);
  return value;
}
/** The SDK's receipt wire form of RECEIPT_SEED: receiptFromJson recomputes the receipt (its verification, state and coherence from
 * the carried evidence) and receiptToJson serializes every field it carries. */
const RECEIPT_WIRE: JsonObject = objectOf(json(receiptToJson(receiptFromJson(RECEIPT_SEED))), "the SDK's receipt wire form");
/** A receipt-shaped producer output: the SDK's receipt wire form beside the find envelope's representation and a kind that spells
 * Verified. */
const RECEIPT_SOURCE: JsonObject = { representation: "hyperunix.result/1", execution_status: { kind: "verified" }, ...RECEIPT_WIRE };
/** The bead's own text: the sentence markers the clauses are read from (the owner filing in the tracker export). */
const UNREACHABLE = "Today the class is unreachable: ";
const ARMED = "Acceptance shape when armed: ";
/** The armed acceptance's clauses this cut does not deliver (held both ways to the export). */
const NOT_DELIVERED: readonly string[] = [
  "a reconcile unit test where a mutation receipt carrying a filesystem Verified postcondition yields a typed filesystem-only reading and no build/semantic-success claim until an independent Forge/import recheck result is cited",
  "a falsifier reddens any surfaced string mapping Verified to semantic or build success",
];
/** The clause readers' controls: synthetic bead text each reader must read exactly as pinned. */
const CLAUSE_CONTROLS = {
  title: "[X] One clause; two clause; the last clause stays.",
  notes: `Filing.\n\nToday the class is unreachable: a holds and b holds, so nothing reaches it; the rest. Acceptance shape when armed: first; second; third.\nAppended later. ${UNREACHABLE}x, so appended; ${ARMED}late; later.\n`,
} as const;

/** Synthetic declaration and module texts each reader must read exactly as pinned (none is compiled or run). */
const READER_CONTROLS: Readonly<Record<string, string>> = {
  result: `export type ExecutionStatus = (StatusBase & {\n    readonly kind: "complete";\n}) | (StatusBase & {\n    readonly kind: "mutation-verified";\n    readonly extra: "not-a-kind";\n});`,
  index: `export { a, type B } from "./mutation.ts";\nexport { c } from "./query.ts";\nexport { d as e } from "./protocol/mutation.ts";\nexport * from "./mutation.ts";`,
  protocol: `export interface VerificationEvidence {\n    readonly outcome: "verified" | "torn";\n}\nexport interface RecoveryClassification {\n    /** The token as printed (Verified, Torn, ...), or null. */\n    readonly journalStatus: string | null;\n}\nexport interface MutationReceipt {\n    /** Only on re-observation. */\n    readonly verified: boolean;\n}`,
  mutation: `export type MutationOperation = "create" | "touch";\nexport declare class MutationPlan {\n    preview(): Promise<MutationPreview>;\n    apply(options?: ApplyOptions): Promise<MutationReceipt>;\n    replay(): Promise<MutationReceipt>;\n}`,
  titles: "describe(\"suite one\", () => { it(\"case one\", () => {}); test(\"case two\", () => {}); it(`case three`, () => {}); it(TITLE, () => {}); });",
  evidence: `export function nativeEvidence(id: string) { switch (id) { case "a.read": break; case "hyperunix.apply": break; default: } }\nfunction other(id: string) { switch (id) { case "z.read": break; } }`,
  glyph: `const lit = node.domainStatus === "verified" || "complete" == entry.domainStatus || node.state === "done" || node.domainStatus !== "failed" || ["complete-empty", 7].includes(node.domainStatus ?? "") || new Set(["incomplete"]).has(entry.domainStatus) || domainStatus === "cancelled" || node["domainStatus"] === "usage-error" || ["budget-exhausted"].indexOf(node.domainStatus) >= 0 || node.domainStatus! === "view-failed" || (node.domainStatus as string) === "partial";\nswitch (node.domainStatus) { case "provider-failed": break; default: }\nconst other = ["done"].includes(node.state);`,
  places: `interface N { domainStatus?: string }\nconst a = node.domainStatus;\nconst { domainStatus } = node;\nconst b = node["domainStatus"];\nconst c = { domainStatus: a, "domainStatus": b };\nconst d = { domainStatus };\nlabel(domainStatus);\nconst e = node.domainStatusText;`,
  registration: "registerHyperUnixFind(registry, reader, root);\nhyperunix.registerNativeHyperUnixFind(registry, root);\nregisterOther(registry);",
  client: `function resolveBinary(state) {\n    const other = state.x ? "y.exe" : "y";\n    const name = process.platform === "win32" ? "a.exe" : "a";\n    return name;\n}\nfunction elsewhere() {\n    const name = cond ? "b.exe" : "b";\n}`,
};
/** C1's controls: synthetic module bodies its SDK-site reader must read exactly as pinned (none is compiled or run). */
const SITE_CONTROLS: Readonly<Record<string, string>> = {
  "read-named": `import { Bounds, HyperUnix } from "@hyperunix/sdk";`,
  "named-mutation": `import { receiptFromJson } from "@hyperunix/sdk";`,
  "type-mutation": `import type { MutationReceipt } from "@hyperunix/sdk";`,
  "aliased-mutation": `import { Mutations as M } from "@hyperunix/sdk";`,
  namespace: `import * as sdk from "@hyperunix/sdk";`,
  "side-effect": `import "@hyperunix/sdk";`,
  subpath: `import { runHx } from "@hyperunix/sdk/raw";`,
  "export-star": `export * from "@hyperunix/sdk";`,
  "export-named": `export { MutationPlan } from "@hyperunix/sdk";`,
  dynamic: "export const load = () => import('@hyperunix/sdk');",
  require: `const sdk = require("@hyperunix/sdk");`,
  "import-type": `type R = import("@hyperunix/sdk").MutationReceipt;`,
  resolve: `const path = import.meta.resolve("@hyperunix/sdk");`,
  "relative-dist": `import { receiptFromJson } from "../../node_modules/@hyperunix/sdk/dist/protocol/mutation.js";`,
  "relative-index": `import { HyperUnix } from "../../node_modules/@hyperunix/sdk/dist/index.js";`,
  "resolved-only": `import { HyperUnix } from "../../node_modules/@hyperunix/./sdk/dist/index.js";`,
  unrelated: `import { nativeEvidence } from "../workbench/native-evidence.js";`,
  "import-equals": `import sdk = require("@hyperunix/sdk");`,
  "literal-position": `export const NAME = "@hyperunix/sdk";`,
  "upper-case": `import { HyperUnix } from "@HyperUnix/SDK";`,
  "as-path-backslash": `export const NAME = "@hyperunix\\\\sdk";`,
  "as-path-dot": `export const NAME = "@hyperunix/./sdk";`,
  "as-path-dot-dot": `export const NAME = "@hyperunix/x/../sdk";`,
  "as-path-doubled": `export const NAME = "@hyperunix//sdk";`,
  "as-path-upper": `export const NAME = "@HyperUnix/SDK";`,
  "as-path-escaped": `export const NAME = "%40hyperunix/sdk";`,
  "template-middle": `export const load = (a: string, b: string) => import(\`\${a}/node_modules/@hyperunix/sdk/\${b}\`);`,
  "template-tail": `export const load = (a: string) => import(\`\${a}/@hyperunix/sdk\`);`,
};
/** The walk's extension reader's control: names it must read as module files, and names it must not. */
const MODULE_NAME_CONTROL: readonly string[] = ["a.ts", "b.d.ts", "c.mts", "d.cts", "e.tsx", "f.js", "g.mjs", "h.cjs", "i.jsx", "j.json", "k.md", "l.ts.map", "m.d.mts"];
/** The entry types C5's control entries carry (as readdir reports an entry's own type: a link is never followed). */
type EntryType = "file" | "directory" | "symlink" | "directory-link" | "fifo" | "socket" | "device";
/** C5's entry reader control (cut #4): synthetic directory entries, each a name and the type readdir reports, read as pinned. */
const ENTRY_CONTROLS: readonly (readonly [string, EntryType])[] = [
  ["a.ts", "file"],
  ["b", "directory"],
  ["c.mjs", "file"],
  ["d.d.ts", "file"],
  ["hx-mutation-link.mjs", "symlink"],
  ["hx-mutation-link.d.ts", "symlink"],
  ["hxsdk", "directory-link"],
  ["hx-launch.json", "file"],
  ["hx", "file"],
  ["E.TS", "file"],
  ["f.ts", "fifo"],
  ["g.sock", "socket"],
  ["h.ts", "device"],
];
/** C5's walk controls on the installed tree (cut #4): directories the entry walk lists, and the entries of each it must read as pinned
 * (npm's own links below node_modules/.bin; the SDK package's manifest, README, dist directory and a module file). */
const ENTRY_WALK_CONTROLS: Readonly<Record<string, readonly string[]>> = {
  "node_modules/.bin": ["tsc", "vitest"],
  "node_modules/@hyperunix/sdk": ["package.json", "README.md", "dist", "dist/index.js"],
};
/** The root check's control (cut #4): a link on the installed tree that lstat must read as a link, not as the file it names. */
const ROOT_CONTROL = "node_modules/.bin/tsc";
/** C2's controls: virtual modules compiled with src (never on disk) whose SDK member references its reader must see. */
const MEMBER_CONTROLS: Readonly<Record<string, string>> = {
  member: `import { HyperUnix } from "@hyperunix/sdk";\nexport const read = HyperUnix.open("/r").mutations;\n`,
  destructured: `import { HyperUnix } from "@hyperunix/sdk";\nconst { mutations } = HyperUnix.open("/r");\nexport { mutations };\n`,
  "destructured-renamed": `import { HyperUnix } from "@hyperunix/sdk";\nconst { mutations: found } = HyperUnix.open("/r");\nexport { found };\n`,
  "destructured-string-key": `import { HyperUnix } from "@hyperunix/sdk";\nconst { "mutations": found } = HyperUnix.open("/r");\nexport { found };\n`,
  "destructured-nested": `import { HyperUnix } from "@hyperunix/sdk";\nconst { client: { mutations } } = HyperUnix.open("/r");\nexport { mutations };\n`,
  "destructured-defaulted": `import { HyperUnix } from "@hyperunix/sdk";\nconst { mutations = undefined } = HyperUnix.open("/r");\nexport { mutations };\n`,
  "destructured-parameter": `import type { Workspace } from "@hyperunix/sdk";\nexport const read = ({ mutations }: Workspace) => mutations;\n`,
  "element-literal": `import { HyperUnix } from "@hyperunix/sdk";\nexport const read = HyperUnix.open("/r")["mutations"];\n`,
  "const-key": `import { HyperUnix } from "@hyperunix/sdk";\nconst KEY = "mutations";\nexport const read = HyperUnix.open("/r")[KEY];\n`,
  namespace: `import * as sdk from "@hyperunix/sdk";\nexport const decode = sdk.receiptFromJson;\n`,
  raw: `import { HyperUnix } from "@hyperunix/sdk";\nexport const run = HyperUnix.open("/r").raw(["apply", "plan"]);\n`,
  "flowed-open": `import { HyperUnix } from "@hyperunix/sdk";\nexport const open = () => HyperUnix.open("/r");\n`,
  flowed: `import { open } from "./flowed-open.js";\nexport const read = open().mutations;\n`,
  identifier: `import { receiptFromJson } from "@hyperunix/sdk";\nexport const decode = (value: unknown) => receiptFromJson(value as never);\n`,
  "relative-identifier": `import { receiptFromJson } from "../../node_modules/@hyperunix/sdk/dist/protocol/mutation.js";\nexport const decode = (value: unknown) => receiptFromJson(value as never);\n`,
  "type-identifier": `import type { MutationReceipt } from "@hyperunix/sdk";\nexport type Receipt = MutationReceipt;\n`,
  "mts-module.mts": `import { receiptFromJson } from "@hyperunix/sdk";\nexport const decode = (value: unknown) => receiptFromJson(value as never);\n`,
};
/** C2's exclusion controls (cut #4, refusal #3 U3): destructure forms C2 does not read, each of which its exclusion reader must refuse
 * (parsed alone: the exclusion is syntactic, whatever the value's type). */
const UNREAD_DESTRUCTURE_CONTROLS: Readonly<Record<string, string>> = {
  "computed-literal": `const { ["mutations"]: mutations } = workspace;\n`,
  "computed-const": `const KEY = "mutations";\nconst { [KEY]: mutations } = workspace;\n`,
  "computed-parameter": `export const read = ({ ["mutations"]: mutations }: Workspace) => mutations;\n`,
  "numeric-key": `const { 0: first } = list;\n`,
  "assignment-shorthand": `let mutations: unknown;\n({ mutations } = workspace);\n`,
  "assignment-renamed": `let read: unknown;\n({ mutations: read } = workspace);\n`,
  "assignment-array": `let first: unknown;\n[first] = list;\n`,
  "for-of-head": `let mutations: unknown;\nfor ({ mutations } of workspaces) void mutations;\n`,
  "for-in-head": `let first: unknown;\nfor ([first] in record) void first;\n`,
};
/** C2's exclusion near-miss controls (cut #4): destructure and assignment forms C2 reads, none of which its exclusion reader may refuse. */
const READ_DESTRUCTURE_CONTROLS: Readonly<Record<string, string>> = {
  shorthand: `const { mutations } = workspace;\n`,
  renamed: `const { mutations: read } = workspace;\n`,
  "string-key": `const { "mutations": read } = workspace;\n`,
  nested: `const { client: { limits } } = workspace;\n`,
  defaulted: `const { mutations = fallback } = workspace;\n`,
  parameter: `export const read = ({ mutations }: Workspace) => mutations;\n`,
  rest: `const { client, ...rest } = workspace;\n`,
  "array-binding": `const [first] = list;\n`,
  "plain-assignment": `let read: unknown;\nread = workspace.mutations;\n`,
};
/** R-COMPUTED-KEY's probes (Q1): a member reached through a key whose type is not one string literal, or by reflection (cut #4 adds
 * the literal-union, keyof, Object.values, property-descriptor and for-in members). */
const COMPUTED_KEY_PROBES: Readonly<Record<string, string>> = {
  composed: `import { HyperUnix } from "@hyperunix/sdk";\nexport const read = HyperUnix.open("/r")["mut" + "ations"];\n`,
  reflected: `import { HyperUnix } from "@hyperunix/sdk";\nexport const read = Reflect.get(HyperUnix.open("/r"), "mutations");\n`,
  "union-key": `import { HyperUnix } from "@hyperunix/sdk";\nexport const read = (flag: boolean) => HyperUnix.open("/r")[flag ? "mutations" : "root"];\n`,
  "keyof-key": `import { HyperUnix, type Workspace } from "@hyperunix/sdk";\nexport const read = (key: keyof Workspace) => HyperUnix.open("/r")[key];\n`,
  values: `import { HyperUnix } from "@hyperunix/sdk";\nexport const read = Object.values(HyperUnix.open("/r"));\n`,
  descriptor: `import { HyperUnix } from "@hyperunix/sdk";\nconst workspace = HyperUnix.open("/r");\nexport const read = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(workspace), "mutations")?.get?.call(workspace);\n`,
  "for-in": `import { HyperUnix } from "@hyperunix/sdk";\nconst workspace = HyperUnix.open("/r");\nexport const read: unknown[] = [];\nfor (const key in workspace) read.push(workspace[key as keyof typeof workspace]);\n`,
};
/** R-CAST-AWAY's probe (Q2): an SDK value whose type a cast replaces before the member is read. */
const CAST_PROBE = `import { HyperUnix } from "@hyperunix/sdk";\nexport const read = (HyperUnix.open("/r") as unknown as { mutations: unknown }).mutations;\n`;
/** R-CAST-AWAY's copy probes (Q2, cut #4): an SDK member read on a rest binding's or a spread copy's synthesized type. */
const COPY_PROBES: Readonly<Record<string, string>> = {
  rest: `import { HyperUnix } from "@hyperunix/sdk";\nconst { client, ...rest } = HyperUnix.open("/r");\nvoid client;\nexport const read = rest.mutations;\n`,
  spread: `import { HyperUnix } from "@hyperunix/sdk";\nconst copy = { ...HyperUnix.open("/r") };\nexport const read = copy.mutations;\n`,
};
/** C1's bound-load control (compiled with src as a virtual module): SDK loads whose specifier is a const binding, never a literal in place. */
const BOUND_LOAD_CONTROL = `const SDK_NAME = "@hyperunix/sdk";\nexport const load = () => import(SDK_NAME);\nconst DIST = "../../node_modules/@hyperunix/sdk/dist/protocol/mutation.js";\nexport const loadDist = () => import(DIST);\nexport const loadTemplate = () => import(\`@hyperunix/\${"sdk"}\`);\nconst OTHER = "./other.js";\nexport const loadOther = () => import(OTHER);\n`;
/** R-COMPOSED-SPECIFIER's probe (Q4): the SDK loaded through a specifier built at run time. */
const COMPOSED_SPECIFIER_PROBE = `import { createRequire } from "node:module";\nimport { join } from "node:path";\nconst name = "@hyperunix/" + "sdk";\nexport const load = () => import(name);\nconst part = "sdk";\nexport const loadJoined = () => import(["@hyperunix", part].join("/"));\nconst paths = { mutation: "../../node_modules/@hyperunix/./sdk/dist/protocol/mutation.js" };\nexport const loadWidened = () => createRequire(import.meta.url)(paths.mutation);\nexport const loadFromBase = (base: string) => createRequire(join(base, "node_modules", "@hyperunix", "sdk", "dist", "index.js"))("./protocol/mutation.js");\n`;
/** C1's loader controls (respin 2, refusal #2 U2; compiled with src as virtual modules, so the checker types their callees): one per
 * load form the signature reader enumerates, one per resolver, and one per fail-closed consumer; each must read as pinned. */
const LOADER_CONTROLS: Readonly<Record<string, string>> = {
  "create-require-bound": `import { createRequire } from "node:module";\nconst load = createRequire(import.meta.url);\nexport const mutation = load("../../node_modules/@hyperunix/./sdk/dist/protocol/mutation.js");\n`,
  "create-require-inline": `import { createRequire } from "node:module";\nexport const mutation = createRequire(import.meta.url)("../../node_modules/@hyperunix/sdk/dist/protocol/mutation.js");\n`,
  "module-create-require": `import Module from "node:module";\nexport const sdk = Module.createRequire(import.meta.url)("@hyperunix/sdk");\n`,
  "require-alias": `const load = require;\nexport const sdk = load("@hyperunix/sdk");\n`,
  "module-require": `export const sdk = module.require("@hyperunix/sdk");\n`,
  "main-require": `export const sdk = require.main?.require("@hyperunix/sdk");\n`,
  "bound-create-require": `import { createRequire } from "node:module";\nconst MUTATION = "../../node_modules/@hyperunix/./sdk/dist/protocol/mutation.js";\nexport const mutation = createRequire(import.meta.url)(MUTATION);\n`,
  "win32-spelling": `import { createRequire } from "node:module";\nexport const mutation = createRequire(import.meta.url)("..\\\\..\\\\node_modules\\\\@hyperunix\\\\sdk\\\\dist\\\\protocol\\\\mutation.js");\n`,
  "escaped-spelling": `import { createRequire } from "node:module";\nexport const mutation = createRequire(import.meta.url)("../../node_modules/%40hyperunix/sdk/dist/protocol/mutation.js");\n`,
  "require-resolve": `export const path = require.resolve("@hyperunix/sdk");\n`,
  "loader-resolve": `import { createRequire } from "node:module";\nexport const path = createRequire(import.meta.url).resolve("@hyperunix/sdk");\n`,
  "retyped-loader": `import { createRequire } from "node:module";\nconst load: (id: string) => unknown = createRequire(import.meta.url);\nexport const sdk = load("../../node_modules/@hyperunix/./sdk/dist/index.js");\n`,
  worker: `import { Worker } from "node:worker_threads";\nexport const worker = new Worker("../../node_modules/@hyperunix/./sdk/dist/protocol/mutation.js");\n`,
  fork: `import { fork } from "node:child_process";\nexport const child = fork("../../node_modules/@hyperunix/sdk/dist/index.js");\n`,
  url: `export const url = new URL("../../node_modules/@hyperunix/./sdk/dist/protocol/mutation.js", import.meta.url);\n`,
  "bound-call": `const SDK_NAME = "@hyperunix/sdk";\nexport const loaded = (load: (id: string) => unknown) => load(SDK_NAME);\n`,
  "template-specifier": `export const load = (version: string) => import(\`../../node_modules/@hyperunix/sdk/dist/\${version}.js\`);\n`,
  "bound-new": `const MUTATION = "../../node_modules/@hyperunix/sdk/dist/protocol/mutation.js";\nexport const url = new URL(MUTATION, import.meta.url);\n`,
  "bound-union": `export const load = (flag: boolean) => import(flag ? "@hyperunix/sdk" : "./other.js");\n`,
};
/** The LOADER_CONTROLS that are resolvers: each names the SDK and must not violate (a resolution loads nothing). */
const RESOLVER_CONTROLS: readonly string[] = ["require-resolve", "loader-resolve"];
/** R-CAST-AWAY's second probe (Q2, respin 2, refusal #2 U2): a require-made load's result is typed any, so C2 reads no SDK member on
 * it; C1 reads the load itself (its site violates). */
const REQUIRE_LOAD_PROBE = `import { createRequire } from "node:module";\nconst sdk = createRequire(import.meta.url)("@hyperunix/sdk");\nexport const decode = sdk.receiptFromJson;\n`;
/** C4's carrier controls: the bare name or a POSIX path to it in a literal under each carrier (the reader does not ask which call
 * carries a literal); its reader must flag each one. */
const LAUNCH_CONTROLS: Readonly<Record<string, string>> = {
  literal: `spawn("hx", ["apply", "plan"]);`,
  shell: `exec("hx apply plan");`,
  path: `execFileSync("/usr/local/bin/hx", ["apply"]);`,
  member: `pi.exec("hx", ["mutation", "recover", "id"]);`,
  "alias-import": `import { spawn as launch } from "node:child_process";\nlaunch("hx", ["mutation", "apply", plan]);`,
  promisified: `const execFileAsync = promisify(execFile);\nexecFileAsync("hx", ["mutation", "apply", plan]);`,
  "shell-c": `spawn("sh", ["-c", "hx mutation apply \\"$0\\"", plan]);`,
  "env-prefix": `execSync("HX_NO_COLOR=1 hx mutation apply plan");`,
  npx: `execFileSync("npx", ["hx", "mutation", "apply", "plan"]);`,
  bound: `const HX = "hx";\nspawn(HX, ["apply", "plan"]);`,
  template: `exec(\`\${binDir}/hx mutation apply \${plan}\`);`,
  "no-substitution": `spawn(\`hx\`, ["apply", "plan"]);`,
  "template-head": `exec(\`hx mutation apply \${plan}\`);`,
  "template-tail": `exec(\`cd \${dir} && hx\`);`,
};
/** C4's spelling controls (respin 2, refusal #2 U1): one per enumerated spelling of the command beyond the bare word and the POSIX
 * path (LAUNCH_CONTROLS literal and path); its reader must flag each one. */
const HX_SPELLING_CONTROLS: Readonly<Record<string, string>> = {
  "win32-path": `execFileSync("C:\\\\Tools\\\\hx", ["mutation", "apply", plan]);`,
  "sdk-win32-name": `execFileSync("hx.exe", ["mutation", "apply", plan], { encoding: "utf8" });`,
  "win32-name-case": `execFileSync("HX.EXE", ["mutation", "apply", plan]);`,
  "posix-path-exe": `execFileSync("/opt/hyperunix/bin/hx.exe", ["mutation", "apply", plan]);`,
  "win32-path-exe": `execFileSync("C:\\\\Program Files\\\\HyperUnix\\\\Hx.Exe", ["mutation", "apply", plan]);`,
  com: `spawn("hx.com", ["mutation", "apply", plan]);`,
  "cmd-shim": `spawn("hx.cmd", ["mutation", "apply", plan], { shell: true });`,
  "bat-shim": `exec("hx.bat mutation apply plan");`,
  "ps1-shim": `spawn("powershell", ["-File", "hx.ps1", "mutation", "apply", plan]);`,
  "template-win32": `exec(\`\${binDir}\\\\hx.exe mutation apply \${plan}\`);`,
};
/** C4's near-miss control: words beside hx that its reader must not flag. */
const NEAR_MISS_CONTROL = `spawn("hxd", ["--hx-plan"]);\nexec("phx server && HX_NO_COLOR=1 hx-sdk run");\nconst sdk = "@hyperunix/sdk";\nconst doc = "the HX mutation Verified postcondition";\nconst kind = "hx.fs/directory";\nconst config = "hx.exe.config";\nexecFileSync("phx.exe");\nconst data = "hx.json";\nconst bin = "hx-binary:sha256:";\n`;
/** R-COMPUTED-COMMAND's probe (Q5): an hx launch whose command no literal spells as a word. */
const COMPUTED_COMMAND_PROBE = `const name = "h" + "x";\nspawn(name, ["apply", "plan"]);\nspawn(String.fromCharCode(104, 120), ["apply"]);\nexecFile(process.env.HX_BIN ?? binaryPath, ["apply"]);\nexecFile(process.env.HYPERUNIX_HX ?? binaryPath, ["mutation", "apply"]);\nspawn(/hx/.source, ["apply"]);\nspawn(\`\${"h"}x\`, ["apply"]);\nspawn(JSON.parse(readFileSync("../launch/hx-launch.json", "utf8")).command, ["mutation", "apply"]);\nimport { HX_COMMAND } from "../../tools/hx-command.js";\nspawn(HX_COMMAND, ["mutation", "apply"]);\n`;
/** R-HOST-FOLDED-WORD's probe (Q10): spellings a host folds to the command - another letter case, a trailing dot. */
const HOST_FOLDED_PROBE = `spawn("HX", ["mutation", "apply", plan]);\nexec("Hx mutation apply plan");\nexecFileSync("/usr/local/bin/hX", ["mutation", "apply"]);\nexecFileSync("hx.exe.", ["mutation", "apply"]);\nexecFileSync("hx.", ["mutation", "apply"]);\n`;
/** R-RENAMED-BINARY's probe (Q11): the hx binary under another file name (a copy, a link, a wrapper). */
const RENAMED_BINARY_PROBE = `spawn("hyperunix", ["mutation", "apply", plan]);\nexecFileSync("/opt/tools/hx-cli", ["mutation", "apply", plan]);\nexec("hx2 mutation apply plan");\nspawn("hx.sh", ["mutation", "apply", plan]);\nspawn("wscript", ["hx.vbs", "mutation", "apply", plan]);\n`;
/** R-SHELL-JOINED-WORD's probe (Q12): a shell command line that forms hx from other text (quoting, an escape, a parameter
 * expansion's default, a glob pattern). */
const SHELL_JOINED_PROBE = `exec("h\\\\x mutation apply plan");\nexec("'h'x mutation apply plan");\nexec('"h"x mutation apply plan');\nexec("h''x mutation apply plan");\nexec("\${HX_BIN:-hx} mutation apply plan");\nexec("[h]x mutation apply plan");\n`;
/** R-HAND-READ-RECEIPT's probes (Q16, cut #4): an HX receipt's state read into a Pi value by hand from a file below the workspace (refusal
 * #3 F6, the L3-C-DISK-RECEIPT shape), and a receipt assembled by SDK-shaped code copied below src (its declarations are src's own);
 * neither carries an SDK name, an hx spelling or a domainStatus place. */
const HAND_READ_PROBES: Readonly<Record<string, string>> = {
  "disk-read": `import { readFileSync } from "node:fs";\nimport { join } from "node:path";\nexport type HxReceiptState = "Verified" | "Torn" | "Rejected";\nexport function receiptState(root: string, executionId: string): HxReceiptState | undefined {\n  const receipt = JSON.parse(readFileSync(join(root, ".hx", "receipts", \`\${executionId}.json\`), "utf8")) as { state?: unknown };\n  return receipt.state === "Verified" || receipt.state === "Torn" || receipt.state === "Rejected" ? receipt.state : undefined;\n}\n`,
  copied: `export interface MutationReceipt {\n  readonly state: string;\n  readonly verified: boolean;\n}\nexport function assembleReceipt(journal: { events: { body: { kind: string } }[] }, recovery: { journal_status: string }): MutationReceipt {\n  const terminal = journal.events[journal.events.length - 1]?.body.kind;\n  return { state: recovery.journal_status, verified: recovery.journal_status === "Verified" && terminal === "MutationVerified" };\n}\n`,
};
/** R-PI-TEXT's probe (Q7): Pi's own text mapping Verified to build and semantic success. */
const PI_TEXT_PROBE = `export const NOTE = "HX Verified: the build passed and the refactor is semantically safe";\n`;
/** R-STATUS-UNNAMED's probe (Q9): a status read that never names domainStatus. */
const UNNAMED_STATUS_PROBE = `export const lit = (node: Record<string, string>) => Object.values(node).includes("complete") || Reflect.get(node, "domain" + "Status") === "complete-empty" || node["domain" + "Status"] === "incomplete";\n`;
/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-COMPUTED-KEY": ["Q1"],
  "R-CAST-AWAY": ["Q2"],
  "R-INJECTED-READER": ["Q3"],
  "R-COMPOSED-SPECIFIER": ["Q4"],
  "R-COMPUTED-COMMAND": ["Q5"],
  "R-OUTSIDE-SRC": ["Q6"],
  "R-PI-TEXT": ["Q7"],
  "R-UNSAMPLED-VALUE": ["Q8"],
  "R-STATUS-UNNAMED": ["Q9"],
  "R-HOST-FOLDED-WORD": ["Q10"],
  "R-RENAMED-BINARY": ["Q11"],
  "R-SHELL-JOINED-WORD": ["Q12"],
  "R-UNSAMPLED-RECEIPT": ["Q13"],
  "R-ENV-REGISTRATION": ["Q14"],
  "R-AMBIENT-CONDITION": ["Q15"],
  "R-HAND-READ-RECEIPT": ["Q16"],
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A, B and C, to the bead's own text. */
const ROWS: readonly Row[] = [
  { id: "A", label: "the read adapter's refusal of mutation outcomes stays until then", pins: ["A1", "A2", "A3"] },
  { id: "B", label: "the wb-tz2.8 effect-class census remains the until-then standing guard", pins: ["B1", "B2", "B3"] },
  { id: "C", label: "no Pi path can represent Verified at all", pins: ["C1", "C2", "C3", "C4", "C5"] },
  {
    id: "Q",
    label: "the residuals: each named family pinned by its quiet row",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13", "Q14", "Q15", "Q16"],
  },
];

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
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return [...value];
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || raw.bead !== BEAD || !isObject(raw.constants) || !Array.isArray(raw.rows)) {
    throw new Error(`roster must be an object for ${BEAD} with constants and rows`);
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
  return { constants: json(raw.constants) as JsonObject, tests: strings(raw.tests, "roster tests"), rows };
}

const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

// ---- source reading ----

function textOf(path: string): string {
  return readFileSync(join(REPO, path), "utf8");
}
function parse(name: string, text: string, kind: ts.ScriptKind = ts.ScriptKind.TS): ts.SourceFile {
  return ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, kind);
}
/** Whether a file name is a module file the src walk reads (MODULE_EXTENSIONS; its control is pinned in C1). */
function isModuleFile(name: string): boolean {
  return MODULE_EXTENSIONS.some(extension => name.endsWith(extension));
}
/** The script kind a module file parses as, by its extension. */
function scriptKindOf(path: string): ts.ScriptKind {
  if (path.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (path.endsWith(".jsx")) return ts.ScriptKind.JSX;
  return path.endsWith(".js") || path.endsWith(".mjs") || path.endsWith(".cjs") ? ts.ScriptKind.JS : ts.ScriptKind.TS;
}
function modulesBelow(directory: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...modulesBelow(path));
    else if (entry.isFile() && isModuleFile(entry.name)) found.push(path);
  }
  return found;
}
/** A directory entry as readdir reports it (its own type: a link is never followed); C5's controls build synthetic ones. */
interface EntryLike {
  readonly name: string;
  isDirectory(): boolean;
  isFile(): boolean;
  isSymbolicLink(): boolean;
}
/** The two entry kinds every C reader reads; any other kind reds C5 (cut #4, fail closed). */
const READ_KINDS: readonly string[] = ["directory", "module"];
/** How C5 reads one entry: a directory, a regular file whose name is a module file's (MODULE_EXTENSIONS), or a refused kind - a link
 * (to anything), a regular file of any other name, or any other entry (a FIFO, a socket, a device). */
function entryKind(entry: EntryLike): string {
  if (entry.isSymbolicLink()) return "link";
  if (entry.isDirectory()) return "directory";
  if (entry.isFile()) return isModuleFile(entry.name) ? "module" : "file";
  return "other";
}
/** A synthetic entry of one EntryType (C5's control). */
function controlEntry(name: string, type: EntryType): EntryLike {
  return {
    name,
    isDirectory: () => type === "directory" || type === "directory-link",
    isFile: () => type === "file",
    isSymbolicLink: () => type === "symlink" || type === "directory-link",
  };
}
/** Every entry below a repo-relative directory, each read as path|kind (directories descended, links never), sorted. */
function entriesBelow(directory: string): string[] {
  const found: string[] = [];
  const below = (path: string): void => {
    for (const entry of readdirSync(join(REPO, path), { withFileTypes: true })) {
      const kind = entryKind(entry);
      found.push(`${path}/${entry.name}|${kind}`);
      if (kind === "directory") below(`${path}/${entry.name}`);
    }
  };
  below(directory);
  return found.sort();
}
/** An entry reading's kind and path (path|kind). */
function readingKind(reading: string): string {
  return reading.slice(reading.lastIndexOf("|") + 1);
}
function readingPath(reading: string): string {
  return reading.slice(0, reading.lastIndexOf("|"));
}
function repoPath(path: string): string {
  return relative(REPO, path).split(sep).join("/");
}
let modules: string[] | undefined;
/** Every src module file (any MODULE_EXTENSIONS member, at any depth), repo-relative and sorted. */
function srcModules(): string[] {
  modules ??= modulesBelow(join(REPO, "src")).map(repoPath).sort();
  return modules;
}
const parsedSources = new Map<string, ts.SourceFile>();
function srcSource(module: string): ts.SourceFile {
  let source = parsedSources.get(module);
  if (source === undefined) {
    source = parse(module, textOf(module), scriptKindOf(module));
    parsedSources.set(module, source);
  }
  return source;
}
function each(node: ts.Node, visit: (node: ts.Node) => void): void {
  visit(node);
  ts.forEachChild(node, child => each(child, visit));
}
function literalText(node: ts.Node | undefined): string | undefined {
  return node !== undefined && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
}
/** A syntax kind's own name (the enum's First / Last / Count markers share values with real kinds and are skipped). */
const KIND_NAMES = new Map<number, string>();
for (const [name, value] of Object.entries(ts.SyntaxKind)) {
  if (typeof value === "number" && !/^(First|Last|Count)/.test(name) && !KIND_NAMES.has(value)) KIND_NAMES.set(value, name);
}
function kindName(node: ts.Node): string {
  const name = KIND_NAMES.get(node.kind) ?? String(node.kind);
  return ts.isBinaryExpression(node) ? `${name}:${ts.tokenToString(node.operatorToken.kind) ?? KIND_NAMES.get(node.operatorToken.kind) ?? ""}` : name;
}
/** A callee's own name: an identifier, or the name of the member a property access reads. */
function calleeName(callee: ts.Expression): string | undefined {
  if (ts.isIdentifier(callee)) return callee.text;
  return ts.isPropertyAccessExpression(callee) ? callee.name.text : undefined;
}

// ---- the SDK's own declarations (the anchors outside this census) ----

function typeAliasNamed(source: ts.SourceFile, name: string): ts.TypeAliasDeclaration | undefined {
  return source.statements.find((statement): statement is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(statement) && statement.name.text === name);
}
function interfaceNamed(source: ts.SourceFile, name: string): ts.InterfaceDeclaration | undefined {
  return source.statements.find((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement) && statement.name.text === name);
}
function memberNamed(owner: ts.InterfaceDeclaration | ts.TypeLiteralNode, name: string): ts.PropertySignature | undefined {
  return owner.members.find(
    (member): member is ts.PropertySignature => ts.isPropertySignature(member) && ts.isIdentifier(member.name) && member.name.text === name,
  );
}
function unionLiterals(type: ts.TypeNode | undefined): string[] {
  if (type === undefined) return [];
  const members = ts.isUnionTypeNode(type) ? type.types : [type];
  return members.flatMap(member => (ts.isLiteralTypeNode(member) && ts.isStringLiteral(member.literal) ? [member.literal.text] : []));
}
/** A declaration's ExecutionStatusKind members, in declaration order (each ExecutionStatus variant's kind literal). */
function declaredKindsIn(text: string): string[] {
  const alias = typeAliasNamed(parse("result.d.ts", text), "ExecutionStatus");
  const kinds: string[] = [];
  if (alias !== undefined) {
    each(alias.type, node => {
      if (ts.isTypeLiteralNode(node)) kinds.push(...unionLiterals(memberNamed(node, "kind")?.type));
    });
  }
  return kinds;
}
function declaredKinds(): string[] {
  return declaredKindsIn(textOf(RESULT_DECLARATION));
}
/** The names an index re-exports from the two mutation modules, in declaration order. */
function mutationSurfaceIn(text: string): string[] {
  const names: string[] = [];
  for (const statement of parse("index.d.ts", text).statements) {
    const specifier = ts.isExportDeclaration(statement) ? literalText(statement.moduleSpecifier) : undefined;
    if (ts.isExportDeclaration(statement) && specifier !== undefined && (MUTATION_MODULES as readonly string[]).includes(specifier)) {
      if (statement.exportClause !== undefined && ts.isNamedExports(statement.exportClause)) names.push(...statement.exportClause.elements.map(element => element.name.text));
    }
  }
  return names;
}
function mutationSurface(): string[] {
  return mutationSurfaceIn(textOf(INDEX_DECLARATION));
}
/** The doc comment written directly above a node, as the declaration file spells it. */
function docOf(node: ts.Node, source: ts.SourceFile): string {
  const ranges = ts.getLeadingCommentRanges(source.text, node.getFullStart()) ?? [];
  return ranges.map(range => source.text.slice(range.pos, range.end)).join("\n");
}
interface Vocabulary {
  readonly outcomes: string[];
  readonly stateTokens: string[];
  readonly verifiedDoc: string;
}
/** A mutation protocol's Verified spellings: the verification outcome union and the receipt-state tokens its doc names. */
function verificationVocabularyIn(text: string): Vocabulary {
  const source = parse("mutation.d.ts", text);
  const evidence = interfaceNamed(source, "VerificationEvidence");
  const outcomes = evidence === undefined ? [] : unionLiterals(memberNamed(evidence, "outcome")?.type);
  const recovery = interfaceNamed(source, "RecoveryClassification");
  const status = recovery === undefined ? undefined : memberNamed(recovery, "journalStatus");
  const listed = status === undefined ? undefined : /\(([^)]*)\)/.exec(docOf(status, source))?.[1];
  const stateTokens = (listed ?? "")
    .split(",")
    .map(token => token.trim())
    .filter(token => /^[A-Za-z]+$/.test(token));
  const receipt = interfaceNamed(source, "MutationReceipt");
  const verified = receipt === undefined ? undefined : memberNamed(receipt, "verified");
  const verifiedDoc = verified === undefined ? "" : docOf(verified, source).replace(/^\/\*\*\s*|\s*\*\/$/g, "");
  return { outcomes, stateTokens, verifiedDoc };
}
/** A mutation module's verbs: its MutationOperation union, then each MutationPlan method that answers a MutationReceipt. */
function mutationVerbsIn(text: string): string[] {
  const source = parse("mutation.d.ts", text);
  const operations = unionLiterals(typeAliasNamed(source, "MutationOperation")?.type);
  const plan = source.statements.find((statement): statement is ts.ClassDeclaration => ts.isClassDeclaration(statement) && statement.name?.text === "MutationPlan");
  const writers = (plan?.members ?? []).flatMap(member =>
    ts.isMethodDeclaration(member) && ts.isIdentifier(member.name) && member.type !== undefined && member.type.getText(source) === "Promise<MutationReceipt>"
      ? [member.name.text]
      : [],
  );
  return [...operations, ...writers];
}

// ---- row A: the read adapter's refusal ----

/** One reading shape: members set or replaced over the minimal reading's source, its coverage summary and its runtime. */
interface Shape {
  readonly id: string;
  readonly source: JsonObject;
  readonly summary: JsonObject;
  readonly runtime: JsonObject;
  /** The host context hyperunixTopology reads the shape under (CONTEXT unless the shape moves it). */
  readonly host?: HyperUnixTopologyContext;
}
/** One answer row; the adapter reads rows for their count only, never a row body. */
const ROW_BODY: JsonObject = { claim_id: "census-claim" };
const RELAYED: JsonObject = {
  view: "census-view",
  evidence: { providers: ["census-provider"], provider_versions: { "census-provider": "1.0.0" } },
  diagnostics: [{ code: "census-conflict" }],
};
const REGIONS: JsonObject = { incomplete_regions: [{ scope: "src", target: "census-target" }] };
const MOVED_RUNTIME: JsonObject = { version: "0.2.0", binarySha256: "a0".repeat(32) };
/** Another host context over the same workspace: every context field but the workspace identity moves. */
const MOVED_HOST: HyperUnixTopologyContext = {
  scope: { workspace: WS, principal: "local-operator:census-other" },
  target: { kind: "hx.fs/directory", root: "test" },
  capturedAt: "2026-10-28T00:00:02Z",
  observedAt: "2026-10-28T00:00:03Z",
  invocationId: "census-invocation",
  operationRef: { provider: "forge", type: "operation", id: "census-operation", scope: WS },
};
/** The receipt fields a find reading carries in the receipt-fields shape (refusal #1 F7, GC4): the SDK's whole receipt wire form
 * (respin 2, refusal #2 U3). Its one key the adapter consumes, diagnostics, is an empty list, so it moves no consumed field. */
const RECEIPT_FIELDS: JsonObject = RECEIPT_WIRE;
/** The reading shapes A1-A3 judge (respin 1, refusal #1 U4): the minimal reading, one variation per consumed field, another host
 * context, the receipt fields the adapter does not consume, and all of them at once. */
const MINIMAL: Shape = { id: "minimal", source: {}, summary: {}, runtime: {} };
const RECEIPT_FIELDS_SHAPE: Shape = { id: "receipt-fields", source: RECEIPT_FIELDS, summary: {}, runtime: {} };
const SHAPES: readonly Shape[] = [
  MINIMAL,
  { id: "rows", source: { rows: [ROW_BODY] }, summary: {}, runtime: {} },
  { id: "not-retained", source: { rows_retained: false }, summary: {}, runtime: {} },
  { id: "certified", source: { coverage: [{ batch_id: "census-batch" }] }, summary: {}, runtime: {} },
  { id: "operation", source: { operation: "show" }, summary: {}, runtime: {} },
  { id: "runtime", source: {}, summary: {}, runtime: MOVED_RUNTIME },
  { id: "relayed", source: RELAYED, summary: REGIONS, runtime: {} },
  { id: "context", source: {}, summary: {}, runtime: {}, host: MOVED_HOST },
  RECEIPT_FIELDS_SHAPE,
  {
    id: "all",
    source: { ...RECEIPT_FIELDS, rows: [ROW_BODY], rows_retained: false, coverage: [{ batch_id: "census-batch" }], operation: "show", ...RELAYED },
    summary: REGIONS,
    runtime: MOVED_RUNTIME,
    host: MOVED_HOST,
  },
];
/** Row A's source and runtime variations (respin 2, refusal #2 U4): every SHAPES member that moves the source or the runtime and not
 * the host, the receipt fields first (a later variation's member wins a shared key, so the relayed diagnostics survive beside them). */
const SOURCE_VARIATIONS: readonly Shape[] = [
  RECEIPT_FIELDS_SHAPE,
  ...SHAPES.filter(shape => shape !== MINIMAL && shape !== RECEIPT_FIELDS_SHAPE && shape.host === undefined && shape.id !== "all"),
];
/** The host-context values row A samples, per field (respin 2, refusal #2 U4). The host context is an open record - src calls the
 * adapter nowhere and the provider's input kind is any non-empty string - so these are samples, never its domain. */
const HOST_VALUES = {
  principal: ["local-operator:census", "local-operator:census-other"],
  targetKind: ["hx.fs/regular-file", "hx.fs/directory", "hx.fs/symlink", "hx.fs/fifo", "hx.fs/socket"],
  root: ["src", "test", null],
  times: [
    ["2026-10-28T00:00:00Z", "2026-10-28T00:00:01Z"],
    ["2026-10-28T00:00:02Z", "2026-10-28T00:00:03Z"],
  ],
  invocationId: [null, "census-invocation"],
  operationId: [null, "census-operation"],
} as const;
/** Every subset of a list, in binary-counting order (the empty subset first, the whole list last). */
function subsetsOf<T>(items: readonly T[]): T[][] {
  return Array.from({ length: 2 ** items.length }, (_, mask) => items.filter((_, index) => Math.floor(mask / 2 ** index) % 2 === 1));
}
/** The shape a set of variations makes together (members of a later one win a shared key), under a host context when one is given. */
function combined(variations: readonly Shape[], host?: HyperUnixTopologyContext): Shape {
  const merge = (part: (shape: Shape) => JsonObject): JsonObject => Object.fromEntries(variations.flatMap(shape => Object.entries(part(shape))));
  return {
    id: variations.map(shape => shape.id).join("+") || "minimal",
    source: merge(shape => shape.source),
    summary: merge(shape => shape.summary),
    runtime: merge(shape => shape.runtime),
    ...(host === undefined ? {} : { host }),
  };
}
/** Every host context of the HOST_VALUES cross product over the census workspace, field by field in HOST_VALUES order. */
function hostContexts(): HyperUnixTopologyContext[] {
  return HOST_VALUES.principal.flatMap(principal =>
    HOST_VALUES.targetKind.flatMap(kind =>
      HOST_VALUES.root.flatMap(root =>
        HOST_VALUES.times.flatMap(([capturedAt, observedAt]) =>
          HOST_VALUES.invocationId.flatMap(invocationId =>
            HOST_VALUES.operationId.map(
              (operationId): HyperUnixTopologyContext => ({
                scope: { workspace: WS, principal },
                target: root === null ? { kind } : { kind, root },
                capturedAt,
                observedAt,
                ...(invocationId === null ? {} : { invocationId }),
                ...(operationId === null ? {} : { operationRef: { provider: "forge", type: "operation", id: operationId, scope: WS } }),
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
/** Row A's judged products (respin 2, refusal #2 U4), each judged over every declared kind and both licences: every subset of
 * SOURCE_VARIATIONS under the base and the moved host context, then every host of the HOST_VALUES cross product under the minimal
 * source and under all source variations at once. */
function judgedProducts(): Shape[] {
  const everything = combined(SOURCE_VARIATIONS);
  return [
    ...subsetsOf(SOURCE_VARIATIONS).flatMap(subset => [CONTEXT, MOVED_HOST].map(host => combined(subset, host))),
    ...hostContexts().flatMap(host => [combined([], host), { ...everything, host }]),
  ];
}
/** A reading list's digest (sha256 over its lines): the products' witnesses pin every reading through it. */
function digestOf(lines: readonly string[]): string {
  return createHash("sha256").update(lines.join("\n")).digest("hex");
}
/** The receipt wire fields that carry a Verified spelling (the key or its JSON value spells verified, in any letter case). */
function verifiedCarriers(wire: JsonObject): string[] {
  return Object.keys(wire).filter(key => /verified/i.test(key) || /verified/i.test(JSON.stringify(wire[key])));
}
/** The SDK's wire-form writers: the names its index exports that end in ToJson (read from dist/index.d.ts). */
function wireFormsIn(text: string): string[] {
  const names: string[] = [];
  for (const statement of parse("index.d.ts", text).statements) {
    if (ts.isExportDeclaration(statement) && statement.exportClause !== undefined && ts.isNamedExports(statement.exportClause)) {
      names.push(...statement.exportClause.elements.map(element => element.name.text).filter(name => name.endsWith("ToJson")));
    }
  }
  return names;
}
/** R-ENV-REGISTRATION's probe (Q14): a registration that adds a write-class hyperunix descriptor only under an environment flag. */
const ENV_FLAG = "PI_HX_MUTATIONS";
function envGatedRegistry(env: Readonly<Record<string, string | undefined>>): CapabilityRegistry {
  return env[ENV_FLAG] === "1" ? plantedRegistry({ id: "hyperunix.apply", effectClass: "write" }) : new CapabilityRegistry();
}
/** R-AMBIENT-CONDITION's probe (Q15, cut #4; refusal #3 U4): stand-in adapters whose mutation refusal also reads an input no judged
 * reading carries - an environment flag, a call count kept across calls, a clock reading - each answering through the shipped
 * adapter unless its ambient input opens it. Never the shipped adapter: they show what readings made in this process cannot tell
 * apart. */
const AMBIENT_FLAG = "PI_HX_ALLOW_MUTATION_OUTCOMES";
const AMBIENT_CALLS = 1_000_000;
const AMBIENT_EPOCH = 4_102_444_800_000;
interface Ambient {
  readonly env: Readonly<Record<string, string | undefined>>;
  readonly calls: number;
  readonly now: number;
}
/** The ambient inputs the stand-ins read for the census's own readings: its process environment, a first call and a clock before
 * AMBIENT_EPOCH (the stand-ins' clock is this parameter, never the host clock). */
function censusAmbient(): Ambient {
  return { env: process.env, calls: 1, now: 0 };
}
/** Stand-in answers for one find kind: the shipped adapter's, unless the named ambient input opens the stand-in (then projected). */
function ambientGated(kind: string, ambient: Ambient): Record<string, string> {
  const reading = topologyReading(findReading(kind, false));
  const open = (opened: boolean): string => (opened && reading.startsWith("refused:") ? "projected:stand-in" : reading);
  return {
    env: open(ambient.env[AMBIENT_FLAG] === "1"),
    calls: open(ambient.calls > AMBIENT_CALLS),
    clock: open(ambient.now >= AMBIENT_EPOCH),
  };
}
/** The consumed fields the kind and licence loops move (every shape samples each of them). */
const LOOP_FIELDS = ["source.execution_status.kind", "source.coverage_summary.licenses_absence"] as const;
/** The consumed fields whose use is the envelope's identity: each holds its one accepted value in every judged reading (refusal #2
 * F6: this census judges no reading that moves one). */
const ENVELOPE = "envelope";
function findReading(kind: string, licensed: boolean, shape: Shape = MINIMAL): JsonValue {
  return json({
    contract: "hyperunix.find/v1",
    source: {
      representation: "hyperunix.result/1",
      execution_status: { kind },
      coverage_summary: { licenses_absence: licensed, ...shape.summary },
      rows: [],
      rows_retained: true,
      operation: "find",
      ...shape.source,
    },
    workspaceRoot: WS,
    runtime: { version: "0.1.0", binarySha256: BINARY, ...shape.runtime },
  });
}
/** The values at a consumed field's path (HYPERUNIX_CONSUMED_FIELDS' grammar: dotted keys, "[]" for each list element, ".*" for each map member). */
function valuesAt(value: JsonValue, path: string): JsonValue[] {
  let current: JsonValue[] = [value];
  for (const segment of path.split(".")) {
    const next: JsonValue[] = [];
    for (const item of current) {
      if (item === null || typeof item !== "object" || Array.isArray(item)) continue;
      if (segment === "*") {
        next.push(...Object.values(item));
        continue;
      }
      const list = segment.endsWith("[]");
      const member = item[list ? segment.slice(0, -2) : segment];
      if (member === undefined) continue;
      if (!list) next.push(member);
      else if (Array.isArray(member)) next.push(...member);
    }
    current = next;
  }
  return current;
}
/** The consumed fields one shape moves: those whose values differ from the minimal reading's (both read at kind complete, unlicensed). */
function movedFields(shape: Shape): string[] {
  const base = findReading("complete", false);
  const moved = findReading("complete", false, shape);
  return HYPERUNIX_CONSUMED_FIELDS.map(field => field.path).filter(path => JSON.stringify(valuesAt(base, path)) !== JSON.stringify(valuesAt(moved, path)));
}
/** Every consumed field but the envelope's: the fields A1-A3 must move (in a shape, or in the kind and licence loops). */
function judgedFields(): string[] {
  return HYPERUNIX_CONSUMED_FIELDS.filter(field => field.use !== ENVELOPE).map(field => field.path);
}
/** Readings that differ from the minimal reading's, position by position: a shape's delta. */
function delta(readings: readonly string[], minimal: readonly string[]): string[] {
  return readings.filter((reading, index) => reading !== minimal[index]);
}
/** How the adapter answers one reading under a host context: the snapshot's coverage and tone, or the refusal's category and message. */
function topologyReading(reading: JsonValue, host: HyperUnixTopologyContext = CONTEXT): string {
  try {
    const [snapshot] = hyperunixTopology(reading, host).snapshots;
    return `projected:${snapshot?.coverage ?? "none"}:${snapshot?.node.statusTone ?? "none"}`;
  } catch (error) {
    return error instanceof CapabilityError ? `refused:${error.category}:${error.message}` : `threw:${String(error)}`;
  }
}
function invariantReading(reading: JsonValue): string {
  const verdict = hxLiveInvariant(reading);
  return `${verdict.holds ? "holds" : "breaks"}:${verdict.violations.join("+") || "none"}:${verdict.absenceLicensed ? "absence-licensed" : "absence-not-licensed"}`;
}

// ---- row B: the standing guard ----

/** The suite and case titles a test module registers (describe/it/test calls with a literal title), in source order. */
function registeredTitles(text: string): { suites: string[]; cases: string[] } {
  const suites: string[] = [];
  const cases: string[] = [];
  each(parse("titles.ts", text), node => {
    if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression)) return;
    const title = literalText(node.arguments[0]);
    if (title === undefined) return;
    if (node.expression.text === "describe") suites.push(title);
    if (node.expression.text === "it" || node.expression.text === "test") cases.push(title);
  });
  return { suites, cases };
}
/** Clients and readers that are never invoked: registration only stores the descriptor. */
const NEVER = (): never => {
  throw new Error("census: a registered capability is never invoked");
};
const HX_READER: hyperunixProvider.HyperUnixReader = { find: async () => NEVER(), runtime: async () => NEVER(), async close() {} };
let native: Promise<CapabilityRegistry> | undefined;
/** The registry the native registration fills (loaded once per file). */
function nativeRegistry(): Promise<CapabilityRegistry> {
  native ??= loadWorkbenchNative().then(loaded => {
    const registry = new CapabilityRegistry();
    loaded.registerNativeProviders(registry, REPO);
    return registry;
  });
  return native;
}
function injectedRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  hyperunixProvider.registerHyperUnixFind(registry, HX_READER, REPO);
  return registry;
}
function plantedRegistry(descriptor: Pick<CapabilityDescriptor, "id" | "effectClass">): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registry.register({
    descriptor: {
      ...descriptor,
      version: "1.0.0",
      description: "census control",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      permissions: [`${producerOf(descriptor.id)}:control`],
      supportedModes: ["invoke"],
    },
    invoke: async () => NEVER(),
  });
  return registry;
}
/** The hyperunix descriptors a registry holds (the reconcile core's producer), each as id|effectClass. */
function hyperunixReadings(registry: CapabilityRegistry): string[] {
  return registry
    .catalogSnapshot()
    .map(entry => entry.descriptor)
    .filter(descriptor => producerOf(descriptor.id) === PRODUCER)
    .map(descriptor => `${descriptor.id}|${descriptor.effectClass}`);
}
/** The files vitest's own glob lists for a config (createVitest, globTestSpecifications), repo-relative and sorted; an exclude replaces the config's. */
async function tierFiles(config: string | undefined, exclude?: readonly string[]): Promise<string[]> {
  const options = { root: REPO, watch: false, run: true, ...(config === undefined ? {} : { config }), ...(exclude === undefined ? {} : { exclude: [...exclude] }) };
  const vitest = await createVitest("test", options, { logLevel: "error" });
  try {
    return [...new Set((await vitest.globTestSpecifications()).map(spec => repoPath(spec.moduleId)))].sort();
  } finally {
    await vitest.close();
  }
}
/** The guard's condition: a hyperunix descriptor with any effect class but read arms the gate. */
function armed(readings: readonly string[]): string[] {
  return readings.filter(reading => !reading.endsWith("|read")).map(reading => reading.split("|")[0] ?? "");
}
/** The provider module's registration exports, read from the module itself. */
function registrationExports(): string[] {
  return Object.keys(hyperunixProvider)
    .filter(name => name.startsWith("register"))
    .sort();
}
/** One module's calls of the named registration functions, as module|callee. */
function registrationCallsIn(module: string, source: ts.SourceFile, names: ReadonlySet<string>): string[] {
  const calls: string[] = [];
  each(source, node => {
    if (ts.isCallExpression(node) && names.has(calleeName(node.expression) ?? "")) calls.push(`${module}|${node.expression.getText(source)}`);
  });
  return calls;
}
function registrationCalls(): string[] {
  const names = new Set(registrationExports());
  return srcModules().flatMap(module => registrationCallsIn(module, srcSource(module), names));
}

// ---- row C: the paths that could represent Verified ----

interface SdkSite {
  readonly reading: string;
  readonly violates: boolean;
}
const LOADING_CONTEXTS: ReadonlySet<string> = new Set(["import", "export", "dynamic-import", "require", "module-require", "import-type", "import-equals"]);
/** The consumers C1 does not read through (respin 2, refusal #2 U2): an SDK-naming literal handed to any call or construction that is
 * not an enumerated loader VIOLATES, fail-closed - the census cannot say what an unenumerated callee does with it. */
const UNREAD_CONSUMERS: ReadonlySet<string> = new Set(["call", "new"]);
/** The @types/node declaration file whose interfaces type Node's module loaders (C1's loader anchor outside this census). */
const NODE_MODULE_TYPES = "node_modules/@types/node/module.d.ts";
/** C1's checker-read loaders (respin 2, refusal #2 U2): the NODE_MODULE_TYPES interface (or interface.method) that declares a call's
 * resolved signature, and the context the call reads as. */
const SIGNATURE_LOADERS: Readonly<Record<string, string>> = { Require: "require", "Module.require": "module-require", RequireResolve: "require-resolve" };
let tsconfig: ts.ParsedCommandLine | undefined;
/** The repo's tsconfig.json, parsed once (its file list and options: the program C2 compiles, the resolution C1 asks). */
function parsedTsconfig(): ts.ParsedCommandLine {
  if (tsconfig !== undefined) return tsconfig;
  const configPath = join(REPO, "tsconfig.json");
  const config = ts.readConfigFile(configPath, path => ts.sys.readFile(path));
  tsconfig = ts.parseJsonConfigFileContent(config.config, ts.sys, REPO, { noEmit: true }, configPath);
  return tsconfig;
}
/** The installed SDK package directory, as spelled and as the file system resolves it. */
const SDK_PACKAGE = join(REPO, "node_modules", SDK).split(sep).join("/");
const SDK_PACKAGE_REAL = realpathSync(SDK_PACKAGE).split(sep).join("/");
let resolutionCache: ts.ModuleResolutionCache | undefined;
/** The name the package.json nearest above a file declares (null when that manifest names none, or no manifest is found). */
function packageNameOf(file: string): string | null {
  for (let directory = dirname(file); ; directory = dirname(directory)) {
    const manifest = join(directory, "package.json");
    if (existsSync(manifest)) {
      const parsed: unknown = JSON.parse(readFileSync(manifest, "utf8"));
      return isObject(parsed) && typeof parsed.name === "string" ? parsed.name : null;
    }
    if (dirname(directory) === directory) return null;
  }
}
/** Whether the repo's own module resolution (tsconfig.json's options) maps a specifier, imported from a file, into the installed SDK
 * package: a file below its directory (as spelled or as the file system resolves it), or a file whose nearest package.json is the
 * SDK's own (respin 2: a copy or an npm alias of the package installed under another path). */
function resolvesIntoSdk(specifier: string, from: string): boolean {
  const { options } = parsedTsconfig();
  resolutionCache ??= ts.createModuleResolutionCache(REPO, name => name, options);
  const resolved = ts.resolveModuleName(specifier, from, options, ts.sys, resolutionCache).resolvedModule?.resolvedFileName.split(sep).join("/");
  if (resolved === undefined) return false;
  return [SDK_PACKAGE, SDK_PACKAGE_REAL].some(directory => resolved.startsWith(`${directory}/`)) || packageNameOf(resolved) === SDK;
}
/** A literal's text read as a path (respin 2, refusal #2 U2): percent-escapes decoded, a backslash read as /, . and .. segments and
 * doubled separators collapsed (posix.normalize), in lower case. */
function asPath(text: string): string {
  let decoded = text;
  try {
    decoded = decodeURIComponent(text);
  } catch {
    decoded = text;
  }
  return posix.normalize(decoded.split("\\").join("/")).toLowerCase();
}
/** Whether a text, read as a path, spells the SDK package name. */
function spellsSdk(text: string): boolean {
  return asPath(text).includes(SDK);
}
/** Whether a text could name a file: read as a path it holds a separator, and it carries no white space. */
function pathLike(text: string): boolean {
  return asPath(text).includes("/") && !/\s/.test(text);
}
/** The call or construction that takes a node as one of its arguments, or undefined. */
function argumentOf(node: ts.Node): ts.CallExpression | ts.NewExpression | undefined {
  const parent = node.parent;
  if (!ts.isCallExpression(parent) && !ts.isNewExpression(parent)) return undefined;
  return (parent.arguments ?? []).some(argument => argument === node) ? parent : undefined;
}
/** The NODE_MODULE_TYPES interface (or interface.method) that declares a call's resolved signature, or "" for any other call. */
function signatureOwner(call: ts.CallExpression, checker: ts.TypeChecker): string {
  const declaration = checker.getResolvedSignature(call)?.declaration;
  if (declaration === undefined || !repoPath(declaration.getSourceFile().fileName).endsWith(NODE_MODULE_TYPES)) return "";
  const owner = declaration.parent;
  if (!ts.isInterfaceDeclaration(owner)) return "";
  return ts.isMethodSignature(declaration) && ts.isIdentifier(declaration.name) ? `${owner.name.text}.${declaration.name.text}` : owner.name.text;
}
/** Whether a string literal stands where a module specifier is read: an import or export, import-equals, import type, or the first
 * argument of a loader call (loaderOf). */
function specifierPosition(node: ts.Node, checker?: ts.TypeChecker): boolean {
  const parent = node.parent;
  if ((ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) && parent.moduleSpecifier === node) return true;
  if (ts.isExternalModuleReference(parent)) return true;
  if (ts.isLiteralTypeNode(parent) && ts.isImportTypeNode(parent.parent)) return true;
  return ts.isCallExpression(parent) && parent.arguments[0] === node && loaderOf(parent, checker) !== undefined;
}
/** One module's string literals that name the SDK - a literal spelling the package name, as written or read as a path (asPath:
 * normalized), or a literal in a specifier position or handed to a call or a construction as a file-like argument that the repo's
 * resolution maps into the package - each read for its context and names (from: the file a specifier resolves from; checker: the
 * program's, which reads loaders by signature - a control parsed alone reads the identifier require only). */
function sdkSites(module: string, source: ts.SourceFile, surface: ReadonlySet<string>, from: string, checker?: ts.TypeChecker): SdkSite[] {
  const sites: SdkSite[] = [];
  each(source, node => {
    const part = ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node);
    const specifier = part ? node.text : literalText(node);
    if (specifier === undefined) return;
    // A template's text part (respin 2) is read by its spelling only - a part is no whole specifier - and through its template.
    const holder: ts.Node = part ? (ts.isTemplateHead(node) ? node.parent : node.parent.parent) : node;
    const spelled = specifier.includes(SDK);
    const consumer = argumentOf(holder);
    const asked = !part && (specifierPosition(node, checker) || (consumer !== undefined && pathLike(specifier)));
    const resolvedOnly = !spelled && asked && resolvesIntoSdk(specifier, from);
    const normalized = !spelled && !resolvedOnly && spellsSdk(specifier);
    if (!spelled && !resolvedOnly && !normalized) return;
    const parent = holder.parent;
    let context = `${part ? "template" : "literal"}:${ts.SyntaxKind[parent.kind]}`;
    let names: string[] = [];
    let opaque = false;
    if (ts.isImportDeclaration(parent) && parent.moduleSpecifier === node) {
      context = "import";
      const clause = parent.importClause;
      const bindings = clause?.namedBindings;
      if (clause === undefined || clause.name !== undefined || (bindings !== undefined && ts.isNamespaceImport(bindings))) opaque = true;
      if (bindings !== undefined && ts.isNamedImports(bindings)) {
        names = bindings.elements.map(element => `${clause?.isTypeOnly || element.isTypeOnly ? "type " : ""}${(element.propertyName ?? element.name).text}`);
      }
    } else if (ts.isExportDeclaration(parent) && parent.moduleSpecifier === node) {
      context = "export";
      const clause = parent.exportClause;
      if (clause === undefined || !ts.isNamedExports(clause)) opaque = true;
      else names = clause.elements.map(element => (element.propertyName ?? element.name).text);
    } else if (ts.isExternalModuleReference(parent)) {
      context = "import-equals";
      opaque = true;
    } else if (ts.isLiteralTypeNode(parent) && ts.isImportTypeNode(parent.parent)) {
      context = "import-type";
      let first: ts.EntityName | undefined = parent.parent.qualifier;
      while (first !== undefined && ts.isQualifiedName(first)) first = first.left;
      if (first === undefined) opaque = true;
      else names = [first.text];
    } else if (consumer !== undefined) {
      const loader = ts.isCallExpression(consumer) && consumer.arguments[0] === holder ? loaderOf(consumer, checker) : undefined;
      context = loader ?? (ts.isNewExpression(consumer) ? "new" : "call");
      if (context === "dynamic-import" || context === "require" || context === "module-require") opaque = true;
    }
    if (LOADING_CONTEXTS.has(context) && specifier !== SDK) opaque = true;
    const bare = names.map(name => name.replace(/^type /, ""));
    const violates = UNREAD_CONSUMERS.has(context) || (LOADING_CONTEXTS.has(context) && (opaque || bare.some(name => surface.has(name))));
    const marks = `${resolvedOnly ? "|resolved" : ""}${normalized ? "|normalized" : ""}${opaque ? "|opaque" : ""}`;
    sites.push({ reading: `${module}|${context}|${specifier}|${names.join(",")}${marks}`, violates });
  });
  return sites;
}
/** The loader a call is (respin 2, refusal #2 U2): a dynamic import or import.meta.resolve by its syntax; with the program's checker,
 * by the signature it resolves to in NODE_MODULE_TYPES (SIGNATURE_LOADERS: a NodeJS.Require call - require, a createRequire or
 * Module.createRequire result, bound, inline or aliased - a NodeJS.Module require method, a NodeJS.RequireResolve call); without one
 * (a control parsed alone), the identifier require. Undefined for any other call. */
function loaderOf(call: ts.CallExpression, checker?: ts.TypeChecker): string | undefined {
  const callee = call.expression;
  if (callee.kind === ts.SyntaxKind.ImportKeyword) return "dynamic-import";
  if (ts.isPropertyAccessExpression(callee) && ts.isMetaProperty(callee.expression) && callee.name.text === "resolve") return "import-meta-resolve";
  if (checker === undefined) return ts.isIdentifier(callee) && callee.text === "require" ? "require" : undefined;
  const owner = signatureOwner(call, checker);
  return Object.hasOwn(SIGNATURE_LOADERS, owner) ? SIGNATURE_LOADERS[owner] : undefined;
}
/** One program file's call and construction arguments that are no literal but a value the checker narrows to string literals (a const
 * binding, a literal union, a template of literals): each value spelling the SDK (asPath) or, as a loader's specifier or a file-like
 * argument, resolving into it is a bound site, opaque - a loader's first argument reads as bound-<loader> (a resolver's does not
 * violate), any other argument as bound-call or bound-new (fail-closed: it violates). */
function boundLoads(module: string, file: ts.SourceFile, checker: ts.TypeChecker): SdkSite[] {
  const sites: SdkSite[] = [];
  each(file, node => {
    if (!ts.isCallExpression(node) && !ts.isNewExpression(node)) return;
    (node.arguments ?? []).forEach((argument, index) => {
      if (literalText(argument) !== undefined) return;
      const type = checker.getTypeAtLocation(argument);
      const values = (type.isUnion() ? type.types : [type]).flatMap(member => (member.isStringLiteral() ? [member.value] : []));
      if (values.length === 0) return;
      const loader = ts.isCallExpression(node) && index === 0 ? loaderOf(node, checker) : undefined;
      const context = loader ?? (ts.isNewExpression(node) ? "new" : "call");
      for (const value of values) {
        if (!spellsSdk(value) && !((loader !== undefined || pathLike(value)) && resolvesIntoSdk(value, file.fileName))) continue;
        sites.push({ reading: `${module}|bound-${context}|${value}||opaque`, violates: context !== "import-meta-resolve" && context !== "require-resolve" });
      }
    });
  });
  return sites;
}
function siteWitness(sites: readonly SdkSite[]): JsonValue {
  return json({ sites: sites.map(site => site.reading), violations: sites.filter(site => site.violates).map(site => site.reading) });
}

/** The census's virtual modules (never on disk): compiled beside src so the SDK and each other resolve. */
const VIRTUAL_DIR = join(REPO, "src", "__hx-mutation-verified-census__");
const VIRTUAL_SOURCES: Readonly<Record<string, string>> = {
  ...MEMBER_CONTROLS,
  ...Object.fromEntries(Object.entries(COMPUTED_KEY_PROBES).map(([name, text]) => [`q1-${name}`, text])),
  "q2-cast": CAST_PROBE,
  ...Object.fromEntries(Object.entries(COPY_PROBES).map(([name, text]) => [`q2-${name}`, text])),
  "q2-require-load": REQUIRE_LOAD_PROBE,
  "q4-composed": COMPOSED_SPECIFIER_PROBE,
  "q7-text": PI_TEXT_PROBE,
  ...Object.fromEntries(Object.entries(HAND_READ_PROBES).map(([name, text]) => [`q16-${name}`, text])),
  "c1-bound": BOUND_LOAD_CONTROL,
  ...Object.fromEntries(Object.entries(LOADER_CONTROLS).map(([name, text]) => [`c1-loader-${name}`, text])),
};
function virtualPath(name: string): string {
  return join(VIRTUAL_DIR, name.endsWith(".mts") ? name : `${name}.ts`);
}
/** The repo-relative prefix of the virtual modules, which are never src files. */
const VIRTUAL_PREFIX = `${repoPath(VIRTUAL_DIR)}/`;
/** One virtual module's program file, by name. */
function virtualFile(name: string): ts.SourceFile | undefined {
  return compiled().program.getSourceFile(virtualPath(name));
}
interface MemberProgram {
  readonly program: ts.Program;
  readonly checker: ts.TypeChecker;
  readonly srcFiles: readonly string[];
  readonly outsideSrc: number;
}
let memberProgram: MemberProgram | undefined;
/** One type-checked program over src (the repo's own tsconfig file list and options) plus the virtual modules; its src files are
 * every program file below src (any extension: a module an included one imports is compiled too), the virtual ones apart. */
function compiled(): MemberProgram {
  if (memberProgram !== undefined) return memberProgram;
  const parsedConfig = parsedTsconfig();
  const virtual = new Map(Object.entries(VIRTUAL_SOURCES).map(([name, text]) => [virtualPath(name), text]));
  const host = ts.createCompilerHost(parsedConfig.options, true);
  const getSourceFile = host.getSourceFile.bind(host);
  const fileExists = host.fileExists.bind(host);
  const readFile = host.readFile.bind(host);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreate) => {
    const text = virtual.get(fileName);
    return text !== undefined ? ts.createSourceFile(fileName, text, languageVersion, true, ts.ScriptKind.TS) : getSourceFile(fileName, languageVersion, onError, shouldCreate);
  };
  host.fileExists = fileName => virtual.has(fileName) || fileExists(fileName);
  host.readFile = fileName => virtual.get(fileName) ?? readFile(fileName);
  const directoryExists = host.directoryExists?.bind(host);
  host.directoryExists = directory => directory === VIRTUAL_DIR || (directoryExists === undefined ? ts.sys.directoryExists(directory) : directoryExists(directory));
  const realpath = host.realpath?.bind(host);
  host.realpath = path => (virtual.has(path) || realpath === undefined ? path : realpath(path));
  const program = ts.createProgram({ rootNames: [...parsedConfig.fileNames, ...virtual.keys()], options: parsedConfig.options, host });
  const srcFiles = program
    .getSourceFiles()
    .map(file => repoPath(file.fileName))
    .filter(path => path.startsWith("src/") && !path.startsWith(VIRTUAL_PREFIX))
    .sort();
  const outsideSrc = parsedConfig.fileNames.map(path => repoPath(path)).filter(path => !path.startsWith("src/")).length;
  memberProgram = { program, checker: program.getTypeChecker(), srcFiles, outsideSrc };
  return memberProgram;
}
/** Every identifier the SDK's declaration files spell: a prefilter only, since a member is read by its declared name. */
function sdkNames(): Set<string> {
  const names = new Set<string>();
  const below = (directory: string): void => {
    for (const entry of readdirSync(join(REPO, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory()) below(path);
      else if (entry.name.endsWith(".d.ts")) {
        each(parse(path, textOf(path)), node => {
          if (ts.isIdentifier(node)) names.add(node.text);
        });
      }
    }
  };
  below(SDK_DIST);
  return names;
}
/** The SDK declaration file (below dist) of a symbol, aliases followed, or undefined for anything declared elsewhere. */
function sdkFileOf(symbol: ts.Symbol | undefined, checker: ts.TypeChecker): { file: string; declaration: ts.Declaration } | undefined {
  if (symbol === undefined) return undefined;
  const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  const declaration = target.declarations?.[0];
  if (declaration === undefined) return undefined;
  const fileName = declaration.getSourceFile().fileName.split(sep).join("/");
  const marker = `/${SDK_DIST}/`;
  const at = fileName.indexOf(marker);
  return at === -1 ? undefined : { file: fileName.slice(at + marker.length), declaration };
}
/** The mutation class: declared in one of the SDK's two mutation modules, or a member whose declared type is one of their exports. */
function mutationClass(file: string, declaration: ts.Declaration, surface: ReadonlySet<string>): boolean {
  if ((MUTATION_FILES as readonly string[]).includes(file)) return true;
  const type =
    ts.isGetAccessorDeclaration(declaration) || ts.isPropertyDeclaration(declaration) || ts.isPropertySignature(declaration) ? declaration.type : undefined;
  return type !== undefined && ts.isTypeReferenceNode(type) && ts.isIdentifier(type.typeName) && surface.has(type.typeName.text);
}
/** The argv class: a callable member whose signature takes a caller-supplied argv (the SDK's raw escape hatch). */
function argvClass(symbol: ts.Symbol, at: ts.Node, checker: ts.TypeChecker): boolean {
  const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  return checker
    .getTypeOfSymbolAtLocation(target, at)
    .getCallSignatures()
    .some(signature => signature.getParameters().some(parameter => parameter.name === "argv"));
}
interface MemberReference {
  readonly reading: string;
  readonly violates: boolean;
}
/** An identifier the member and destructure forms already read: a property access's name, an object binding's key or name. */
function readElsewhere(node: ts.Identifier): boolean {
  return (ts.isPropertyAccessExpression(node.parent) && node.parent.name === node) || (ts.isBindingElement(node.parent) && ts.isObjectBindingPattern(node.parent.parent));
}
/** One source file's references to vendored-SDK members and bindings: property accesses, literal-typed element keys, destructured
 * names, and identifiers (an imported binding used as a value or a type, its import or export specifier included). */
function memberReferences(
  file: ts.SourceFile,
  label: string,
  checker: ts.TypeChecker,
  universe: ReadonlySet<string>,
  surface: ReadonlySet<string>,
): MemberReference[] {
  const found: MemberReference[] = [];
  const record = (form: string, name: string, symbol: ts.Symbol | undefined, at: ts.Node): void => {
    const sdk = sdkFileOf(symbol, checker);
    if (symbol === undefined || sdk === undefined) return;
    const classes = [mutationClass(sdk.file, sdk.declaration, surface) ? "mutation" : "", argvClass(symbol, at, checker) ? "argv" : ""].filter(Boolean);
    found.push({ reading: [label, form, name, sdk.file, ...classes].join("|"), violates: classes.length > 0 });
  };
  each(file, node => {
    if (ts.isPropertyAccessExpression(node) && universe.has(node.name.text)) record("member", node.name.text, checker.getSymbolAtLocation(node.name), node);
    else if (ts.isElementAccessExpression(node)) {
      const keyType = checker.getTypeAtLocation(node.argumentExpression);
      const name = keyType.isStringLiteral() ? keyType.value : undefined;
      if (name !== undefined && universe.has(name)) record("element", name, checker.getTypeAtLocation(node.expression).getProperty(name), node);
    } else if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const key = node.propertyName ?? node.name;
      const name = ts.isIdentifier(key) || ts.isStringLiteralLike(key) ? key.text : undefined;
      if (name !== undefined && universe.has(name)) record("destructure", name, checker.getTypeAtLocation(node.parent).getProperty(name), node);
    } else if (ts.isIdentifier(node) && universe.has(node.text) && !readElsewhere(node)) {
      const shorthand = ts.isShorthandPropertyAssignment(node.parent) && node.parent.name === node;
      record("identifier", node.text, shorthand ? checker.getShorthandAssignmentValueSymbol(node.parent) : checker.getSymbolAtLocation(node), node);
    }
  });
  return found;
}
/** The destructure forms C2's member reader does not read (cut #4, refusal #3 U3), each read as module|form|syntax wherever a module
 * writes one, whatever the value's type: an object binding element whose key is no identifier and no string literal (a computed
 * or numeric key), and a destructuring assignment (an object or array literal on the left of =, or as a for-in or for-of head). */
function unreadDestructures(module: string, source: ts.SourceFile): string[] {
  const found: string[] = [];
  each(source, node => {
    if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const key = node.propertyName ?? node.name;
      if (!ts.isIdentifier(key) && !ts.isStringLiteralLike(key)) found.push(`${module}|binding-key|${kindName(key)}`);
    } else if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      (ts.isObjectLiteralExpression(node.left) || ts.isArrayLiteralExpression(node.left))
    ) {
      found.push(`${module}|assignment|${kindName(node.left)}`);
    } else if ((ts.isForOfStatement(node) || ts.isForInStatement(node)) && (ts.isObjectLiteralExpression(node.initializer) || ts.isArrayLiteralExpression(node.initializer))) {
      found.push(`${module}|for-head|${kindName(node.initializer)}`);
    }
  });
  return found;
}
function referenceWitness(references: readonly MemberReference[]): JsonValue {
  return json({ references: references.map(entry => entry.reading), violations: references.filter(entry => entry.violates).map(entry => entry.reading) });
}
let members: { src: MemberReference[]; virtual: Record<string, MemberReference[]> } | undefined;
/** C2's reading over src and the virtual modules (computed once per file). */
function memberReadings(): { src: MemberReference[]; virtual: Record<string, MemberReference[]> } {
  if (members !== undefined) return members;
  const { program, checker } = compiled();
  const universe = sdkNames();
  const surface = new Set(mutationSurface());
  const src: MemberReference[] = [];
  const virtual: Record<string, MemberReference[]> = {};
  const byPath = new Map(Object.keys(VIRTUAL_SOURCES).map(name => [virtualPath(name), name]));
  const byModule = new Map<string, ts.SourceFile>();
  for (const file of program.getSourceFiles()) {
    const name = byPath.get(file.fileName);
    if (name !== undefined) virtual[name] = memberReferences(file, `control:${name}`, checker, universe, surface);
    else byModule.set(repoPath(file.fileName), file);
  }
  // In src-walk order (sorted modules), never the program's import order.
  for (const module of srcModules()) {
    const file = byModule.get(module);
    if (file !== undefined) src.push(...memberReferences(file, module, checker, universe, surface));
  }
  members = { src, virtual };
  return members;
}

/** The literal labels of a module's nativeEvidence switch (the producer metadata projection), in source order. */
function evidenceCasesIn(source: ts.SourceFile): string[] {
  const labels: string[] = [];
  each(source, node => {
    if (ts.isFunctionDeclaration(node) && node.name?.text === "nativeEvidence") {
      each(node, inner => {
        const label = ts.isCaseClause(inner) ? literalText(inner.expression) : undefined;
        if (label !== undefined) labels.push(label);
      });
    }
  });
  return labels;
}
/** The member the glyph readers follow (respin 1, refusal #1 U3). */
const STATUS = "domainStatus";
/** The membership calls a trigger may take on a literal list. */
const MEMBERSHIP: readonly string[] = ["includes", "has", "indexOf"];
/** The statuses C3 draws beside the declared kinds: the glyph's own trigger, which must light it (the render reader's control). */
const RENDER_CONTROLS: readonly string[] = ["verified"];
/** The node C3 draws: a done, current, evidenced hyperunix.find node, so the domainStatus is the verified glyph's one open gate. */
const RENDER_LABEL = "census-node";
const RENDER_TASK = { status: "completed" as const, startTime: 0, endTime: 1_000 };
/** Whether an expression reads domainStatus: a member, an element key or a name (a destructured binding, a parameter), through
 * parentheses, ??, a non-null assertion or a cast. */
function readsStatus(expression: ts.Expression): boolean {
  let inner: ts.Expression = expression;
  for (;;) {
    if (ts.isParenthesizedExpression(inner) || ts.isNonNullExpression(inner) || ts.isAsExpression(inner)) inner = inner.expression;
    else if (ts.isBinaryExpression(inner) && inner.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) inner = inner.left;
    else break;
  }
  if (ts.isPropertyAccessExpression(inner)) return inner.name.text === STATUS;
  if (ts.isElementAccessExpression(inner)) return literalText(inner.argumentExpression) === STATUS;
  return ts.isIdentifier(inner) && inner.text === STATUS;
}
/** The string literals of a literal list: an array literal, or a Set built from one; undefined for anything else. */
function listLiterals(expression: ts.Expression): string[] | undefined {
  let list: ts.Expression = expression;
  if (ts.isNewExpression(list) && ts.isIdentifier(list.expression) && list.expression.text === "Set" && list.arguments?.[0] !== undefined) list = list.arguments[0];
  if (!ts.isArrayLiteralExpression(list)) return undefined;
  return list.elements.flatMap(element => {
    const text = literalText(element);
    return text === undefined ? [] : [text];
  });
}
/** One module's comparisons of a domainStatus read with a string literal, each the literal that would light a verified glyph: an
 * equality (=== or ==, either way round), a membership (includes, has, indexOf) of a literal list, and a switch's case labels. */
function glyphTriggersIn(module: string, source: ts.SourceFile): string[] {
  const triggers: string[] = [];
  const add = (literal: string): void => {
    triggers.push(`${module}|${literal}`);
  };
  each(source, node => {
    if (ts.isBinaryExpression(node)) {
      const operator = node.operatorToken.kind;
      if (operator !== ts.SyntaxKind.EqualsEqualsEqualsToken && operator !== ts.SyntaxKind.EqualsEqualsToken) return;
      const sides = [node.left, node.right];
      const literal = sides.map(side => literalText(side)).find(text => text !== undefined);
      if (literal !== undefined && sides.some(readsStatus)) add(literal);
    } else if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && MEMBERSHIP.includes(node.expression.name.text)) {
      const argument = node.arguments[0];
      const literals = listLiterals(node.expression.expression);
      if (argument !== undefined && literals !== undefined && readsStatus(argument)) literals.forEach(add);
    } else if (ts.isSwitchStatement(node) && readsStatus(node.expression)) {
      for (const clause of node.caseBlock.clauses) {
        const label = ts.isCaseClause(clause) ? literalText(clause.expression) : undefined;
        if (label !== undefined) add(label);
      }
    }
  });
  return triggers;
}
/** One module's places naming domainStatus, each as module|form|context: an identifier (a member's name, an object binding, a
 * property key, a shorthand property, any other name) or a string literal (an element key, a property key, any other literal),
 * with the syntax that consumes it (a binary expression with its operator). */
function statusPlacesIn(module: string, source: ts.SourceFile): string[] {
  const places: string[] = [];
  const keyed = (parent: ts.Node, node: ts.Node): boolean =>
    (ts.isPropertySignature(parent) || ts.isPropertyAssignment(parent) || ts.isPropertyDeclaration(parent) || ts.isMethodDeclaration(parent) || ts.isGetAccessorDeclaration(parent)) && parent.name === node;
  each(source, node => {
    const parent = node.parent;
    let form: string | undefined;
    let consumer: ts.Node = parent;
    if (ts.isIdentifier(node) && node.text === STATUS) {
      if (ts.isPropertyAccessExpression(parent) && parent.name === node) {
        form = "member";
        consumer = parent.parent;
      } else if (ts.isBindingElement(parent)) form = "binding";
      else if (keyed(parent, node)) form = "key";
      else if (ts.isShorthandPropertyAssignment(parent)) form = "shorthand";
      else form = "identifier";
    } else if (literalText(node) === STATUS) {
      if (ts.isElementAccessExpression(parent) && parent.argumentExpression === node) {
        form = "element";
        consumer = parent.parent;
      } else form = keyed(parent, node) ? "key" : "literal";
    }
    if (form !== undefined) places.push(`${module}|${form}|${kindName(consumer)}`);
  });
  return places;
}
/** A node C3 draws, of one domainStatus. */
function renderedNode(domainStatus: string): WorkflowNodeEntry {
  return {
    type: "workflow_node",
    index: 0,
    callId: 1,
    capabilityId: "hyperunix.find",
    label: RENDER_LABEL,
    state: "done",
    freshness: "current",
    evidenceRefs: ["hx-coverage:census-batch"],
    nativeId: "census-execution",
    domainStatus,
  };
}
/** The glyph a drawn line set shows before the node's label, or none. */
function glyphOf(lines: readonly string[]): string {
  const line = lines.find(text => text.includes(` ${RENDER_LABEL} `));
  return line === undefined ? "none" : (new RegExp(`(\\S+) ${RENDER_LABEL} `).exec(line)?.[1] ?? "none");
}
/** The workflow card's and the dialog's glyph for a node of one domainStatus, drawn by the real layouts (ASCII tier). */
function drawnGlyphs(domainStatus: string): { readonly card: string; readonly dialog: string } {
  const progress = [renderedNode(domainStatus)];
  const card = plainWorkflowCardLines(layoutWorkflowCard({ progress, task: RENDER_TASK, now: 1_000, width: 240, ascii: true }));
  const dialog = plainWorkflowDialogLines(
    layoutWorkflowDialog({ progress, task: RENDER_TASK, state: initialWorkflowDialogState(), ascii: true, width: 200, now: 1_000 }),
  );
  return { card: glyphOf(card), dialog: glyphOf(dialog) };
}
/** Whether a drawn pair lights the verified tick (each module's own ASCII tick glyph). */
function lights(drawn: { readonly card: string; readonly dialog: string }): boolean {
  return drawn.card === ASCII_GLYPHS.tick || drawn.dialog === ASCII_DIALOG_GLYPHS.tick;
}

interface Launch {
  readonly reading: string;
  /** The first word of the literal command. */
  readonly command: string;
}
/** One module's launches by a literal command, each read as module|launcher|command. */
function launches(module: string, source: ts.SourceFile): Launch[] {
  const found: Launch[] = [];
  each(source, node => {
    if (!ts.isCallExpression(node)) return;
    const name = calleeName(node.expression);
    const command = literalText(node.arguments[0]);
    if (name !== undefined && (LAUNCH_NAMES as readonly string[]).includes(name) && command !== undefined) {
      found.push({ reading: `${module}|${name}|${command}`, command: command.trim().split(/\s+/)[0] ?? "" });
    }
  });
  return found;
}
/** The hx spelling a word carries, or undefined (respin 2, refusal #2 U1): the word's last path segment (after its last /; the
 * separators already split at a backslash) is the bare name hx exactly, or, in any letter case, hx followed by one of HX_WIN32_EXTENSIONS. */
function hxSpelling(word: string): string | undefined {
  const segment = word.slice(word.lastIndexOf("/") + 1);
  if (segment === HX_COMMAND) return segment;
  const lower = segment.toLowerCase();
  return lower.startsWith(`${HX_COMMAND}.`) && (HX_WIN32_EXTENSIONS as readonly string[]).includes(lower.slice(HX_COMMAND.length)) ? lower : undefined;
}
/** One module's string literals with a word that is an hx spelling (a string, a no-substitution template, a template's head, middle
 * or tail, split at WORD_SEPARATORS), each read as module|context|text: the word reader does not ask which call carries it. */
function hxWords(module: string, source: ts.SourceFile): string[] {
  const found: string[] = [];
  each(source, node => {
    if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node) && !ts.isTemplateHead(node) && !ts.isTemplateMiddle(node) && !ts.isTemplateTail(node)) return;
    if (node.text.split(WORD_SEPARATORS).some(word => hxSpelling(word) !== undefined)) found.push(`${module}|${kindName(node.parent)}|${node.text}`);
  });
  return found;
}
/** The binary names a client's resolveBinary binds to name: the string literals of the conditional it initializes name with (the
 * SDK's per-platform PATH lookup), read by the TypeScript AST from the shipped JavaScript; nothing outside that function is read. */
function sdkBinaryNamesIn(text: string): string[] {
  const names: string[] = [];
  each(parse("client.js", text, ts.ScriptKind.JS), node => {
    if (!ts.isFunctionDeclaration(node) || node.name?.text !== "resolveBinary") return;
    each(node, inner => {
      if (!ts.isVariableDeclaration(inner) || !ts.isIdentifier(inner.name) || inner.name.text !== "name" || inner.initializer === undefined) return;
      if (!ts.isConditionalExpression(inner.initializer)) return;
      for (const branch of [inner.initializer.whenTrue, inner.initializer.whenFalse]) {
        const literal = literalText(branch);
        if (literal !== undefined) names.push(literal);
      }
    });
  });
  return names;
}

// ---- the bead's own text ----

function exportRow(): { title: string; notes: string } {
  for (const line of textOf(".beads/issues.jsonl").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  return { title: "", notes: "" };
}
/** The title's until-then clause: its last "; " clause, the closing period removed. */
function titleClause(title: string): string {
  const at = title.lastIndexOf("; ");
  return at === -1 ? "" : title.slice(at + 2).replace(/\.$/, "");
}
/** The owner filing's unreachability conclusion: the ", so " clause of its first "Today the class is unreachable: " sentence. */
function unreachableClause(notes: string): string {
  const start = notes.indexOf(UNREACHABLE);
  const end = start === -1 ? -1 : notes.indexOf("; ", start);
  if (end === -1) return "";
  const sentence = notes.slice(start + UNREACHABLE.length, end);
  const at = sentence.lastIndexOf(", so ");
  return at === -1 ? "" : sentence.slice(at + ", so ".length);
}
/** The owner filing's armed acceptance: its first "Acceptance shape when armed: " sentence, split at "; ". */
function armedClauses(notes: string): string[] {
  const start = notes.indexOf(ARMED);
  if (start === -1) return [];
  const close = notes.indexOf(".\n", start);
  return notes
    .slice(start + ARMED.length, close === -1 ? notes.length : close)
    .replace(/\.$/, "")
    .split("; ");
}

// ---- the cases ----

const REACHED: string[] = [];

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const declared = declaredKinds();
    expect([...HYPERUNIX_EXECUTION_KINDS], "the adapter's kind tuple is the SDK's declared union, in order").toStrictEqual(declared);
    const mutationOutcomes = declared.filter(kind => kind.startsWith(MUTATION_PREFIX));
    const answers = (shape: Shape): string[] =>
      declared.flatMap(kind => [false, true].map(licensed => `${kind}|${licensed}|${topologyReading(findReading(kind, licensed, shape), shape.host)}`));
    const refusedIn = (readings: readonly string[]): string[] =>
      declared.filter(kind => readings.filter(reading => reading.startsWith(`${kind}|`)).every(reading => reading.includes("|refused:")));
    const readings = answers(MINIMAL);
    expect(refusedIn(readings), "the adapter refuses exactly the SDK's mutation outcomes, under either licence").toStrictEqual(mutationOutcomes);
    const shapes = SHAPES.map(shape => {
      const shaped = answers(shape);
      const refused = refusedIn(shaped);
      expect(
        mutationOutcomes.filter(kind => !refused.includes(kind)),
        `every mutation outcome stays refused under either licence in the ${shape.id} reading shape`,
      ).toStrictEqual([]);
      return { id: shape.id, moves: movedFields(shape), refused, delta: delta(shaped, readings) };
    });
    const moved = new Set<string>([...LOOP_FIELDS, ...shapes.flatMap(shape => shape.moves)]);
    expect(
      judgedFields().filter(path => !moved.has(path)),
      "every field the adapter consumes, but the envelope's, moves in a reading shape or in the kind and licence loops",
    ).toStrictEqual([]);
    const products = judgedProducts();
    const envelopePaths = HYPERUNIX_CONSUMED_FIELDS.filter(field => field.use === ENVELOPE).map(field => field.path);
    const envelopeOf = (shape: Shape): string => JSON.stringify(envelopePaths.map(path => valuesAt(findReading("complete", false, shape), path)));
    expect(
      [...SHAPES, ...products].filter(shape => envelopeOf(shape) !== envelopeOf(MINIMAL)).map(shape => shape.id),
      "the envelope identities hold their one accepted value in every judged reading",
    ).toStrictEqual([]);
    const productAnswers = products.map(shape => answers(shape));
    expect(
      products.flatMap((shape, index) => mutationOutcomes.filter(kind => !refusedIn(productAnswers[index] ?? []).includes(kind)).map(kind => `${index}:${shape.id}|${kind}`)),
      "every mutation outcome stays refused under either licence in every reading of the judged products",
    ).toStrictEqual([]);
    const productLines = productAnswers.flatMap((lines, index) => lines.map(line => `${index}|${line}`));
    return json({
      declared,
      mutationOutcomes,
      readings,
      shapes,
      loopFields: LOOP_FIELDS,
      judgedFields: judgedFields(),
      control: declaredKindsIn(READER_CONTROLS.result ?? ""),
      products: { shapes: products.length, readings: productLines.length, sha256: digestOf(productLines) },
    });
  },
  A2: async () => {
    const declared = declaredKinds();
    const mutationOutcomes = declared.filter(kind => kind.startsWith(MUTATION_PREFIX));
    const answers = (shape: Shape): string[] =>
      declared.flatMap(kind => [false, true].map(licensed => `${kind}|${licensed}|${invariantReading(findReading(kind, licensed, shape))}`));
    const readings = answers(MINIMAL);
    const shapes = SHAPES.map(shape => {
      const readOutcomeBreaks = declared.filter(kind => hxLiveInvariant(findReading(kind, false, shape)).violations.includes("read-outcome"));
      expect(readOutcomeBreaks, `only the SDK's mutation outcomes break the read-outcome clause in the ${shape.id} reading shape`).toStrictEqual(mutationOutcomes);
      expect(
        readOutcomeBreaks.filter(kind => hxLiveInvariant(findReading(kind, true, shape)).absenceLicensed),
        `no mutation outcome licenses absence in the ${shape.id} reading shape`,
      ).toStrictEqual([]);
      return { id: shape.id, readOutcomeBreaks, delta: delta(answers(shape), readings) };
    });
    // The invariant reads no host context: the source subsets are its whole judged product.
    const subsets = subsetsOf(SOURCE_VARIATIONS).map(subset => combined(subset));
    expect(
      subsets.flatMap(shape => {
        const breaks = declared.filter(kind => hxLiveInvariant(findReading(kind, false, shape)).violations.includes("read-outcome"));
        const licensing = breaks.filter(kind => hxLiveInvariant(findReading(kind, true, shape)).absenceLicensed);
        return JSON.stringify(breaks) === JSON.stringify(mutationOutcomes) && licensing.length === 0 ? [] : [shape.id];
      }),
      "only the SDK's mutation outcomes break the read-outcome clause, and none licenses absence, in every subset of the source variations",
    ).toStrictEqual([]);
    const subsetLines = subsets.flatMap((shape, index) => answers(shape).map(line => `${index}|${line}`));
    return json({
      readings,
      readOutcomeBreaks: shapes[0]?.readOutcomeBreaks ?? [],
      shapes,
      subsets: { shapes: subsets.length, readings: subsetLines.length, sha256: digestOf(subsetLines) },
    });
  },
  A3: async () => {
    const { outcomes, stateTokens, verifiedDoc } = verificationVocabularyIn(textOf(MUTATION_PROTOCOL_DECLARATION));
    const declared = new Set(declaredKinds());
    const tokens = [...outcomes, ...stateTokens];
    const verifiedSpellings = tokens.filter(token => token.toLowerCase() === "verified");
    expect(verifiedSpellings.length, "the protocol spells Verified").toBeGreaterThan(0);
    const answers = (shape: Shape): string[] =>
      tokens.map(
        token =>
          `${token}|${declared.has(token) ? "declared" : "undeclared"}|${topologyReading(findReading(token, false, shape), shape.host)}|${invariantReading(findReading(token, false, shape))}`,
      );
    const readings = answers(MINIMAL);
    const shapes = SHAPES.map(shape => {
      expect(
        verifiedSpellings.filter(token => declared.has(token) || !topologyReading(findReading(token, false, shape), shape.host).startsWith("refused:")),
        `no Verified spelling is a find kind the adapter accepts in the ${shape.id} reading shape`,
      ).toStrictEqual([]);
      return { id: shape.id, delta: delta(answers(shape), readings) };
    });
    const products = judgedProducts();
    expect(
      products.flatMap((shape, index) =>
        verifiedSpellings
          .filter(token => declared.has(token) || !topologyReading(findReading(token, false, shape), shape.host).startsWith("refused:"))
          .map(token => `${index}:${shape.id}|${token}`),
      ),
      "no Verified spelling is a find kind the adapter accepts in any reading of the judged products",
    ).toStrictEqual([]);
    const productLines = products.flatMap((shape, index) => answers(shape).map(line => `${index}|${line}`));
    return json({
      outcomes,
      stateTokens,
      verifiedDoc,
      readings,
      shapes,
      control: verificationVocabularyIn(READER_CONTROLS.protocol ?? ""),
      products: { shapes: products.length, readings: productLines.length, sha256: digestOf(productLines) },
    });
  },
  B1: async () => {
    const text = textOf(GUARD);
    return json({
      path: GUARD,
      sha256: createHash("sha256").update(text).digest("hex"),
      namesBead: text.includes(GUARD_BEAD),
      ...registeredTitles(text),
      control: registeredTitles(READER_CONTROLS.titles ?? ""),
    });
  },
  B2: async () => {
    const nativeReadings = hyperunixReadings(await nativeRegistry());
    const injectedReadings = hyperunixReadings(injectedRegistry());
    expect(nativeReadings.length + injectedReadings.length, "both registrations hold a hyperunix descriptor").toBeGreaterThanOrEqual(2);
    expect(armed([...nativeReadings, ...injectedReadings]), "no hyperunix descriptor with a non-read effect class registers: the gate is not armed").toStrictEqual([]);
    return json({
      native: nativeReadings,
      injected: injectedReadings,
      armed: armed([...nativeReadings, ...injectedReadings]),
      controls: {
        "hyperunix-write": armed(hyperunixReadings(plantedRegistry({ id: "hyperunix.apply", effectClass: "write" }))),
        "hyperunix-external": armed(hyperunixReadings(plantedRegistry({ id: "hyperunix-mutation.apply", effectClass: "external" }))),
        "hyperunix-read": armed(hyperunixReadings(plantedRegistry({ id: "hyperunix.inspect", effectClass: "read" }))),
        "other-producer-write": armed(hyperunixReadings(plantedRegistry({ id: "forge.gate.run", effectClass: "write" }))),
      },
      providerExports: Object.keys(hyperunixProvider).sort(),
      registrationCalls: registrationCalls(),
      callControl: registrationCallsIn("control", parse("registration", READER_CONTROLS.registration ?? ""), new Set(registrationExports())),
    });
  },
  B3: async () => {
    const resolution = resolveTier(REPO, DEFAULT_GATE_TIER);
    expect(resolution.ok, `the default gate tier resolves to a vitest run (${resolution.why})`).toBe(true);
    const cli = parseCLI(["vitest", ...resolution.argv]);
    const resolved = (await resolveConfig({ ...cli.options, root: REPO }, { logLevel: "error" })).vitestConfig;
    const config = typeof resolved.config === "string" ? resolved.config : undefined;
    const files = await tierFiles(config);
    expect(files, "the default gate tier lists the guard").toContain(GUARD);
    const control = await tierFiles(config, [...resolved.exclude, GUARD]);
    return json({
      tier: resolution.tier,
      chain: resolution.chain,
      argv: resolution.argv,
      filter: cli.filter,
      config: config === undefined ? null : repoPath(config),
      testNamePattern: resolved.testNamePattern === undefined ? null : String(resolved.testNamePattern),
      setupFiles: resolved.setupFiles.map(file => repoPath(file)),
      lists: { guard: files.includes(GUARD), self: files.includes(SELF), floor: files.length >= TIER_FLOOR },
      control: { guard: control.includes(GUARD), self: control.includes(SELF) },
    });
  },
  C1: async () => {
    const surface = new Set(mutationSurface());
    const all = srcModules();
    expect(all.length, "the src walk reached the modules").toBeGreaterThanOrEqual(SRC_FLOOR);
    const { program, checker } = compiled();
    const programFiles = new Map(program.getSourceFiles().map(file => [repoPath(file.fileName), file]));
    expect(all.filter(module => !programFiles.has(module)), "every src walk module is a program file (C1 reads its loaders by the checker)").toStrictEqual([]);
    const files = all.flatMap(module => {
      const file = programFiles.get(module);
      return file === undefined ? [] : [{ module, file }];
    });
    const sites = [
      ...files.flatMap(({ module, file }) => sdkSites(module, file, surface, file.fileName, checker)),
      ...files.flatMap(({ module, file }) => boundLoads(module, file, checker)),
    ];
    const boundFile = virtualFile("c1-bound");
    expect(
      sites.filter(site => site.violates).map(site => site.reading),
      "no src site loads the SDK's mutation surface or an opaque SDK surface, or hands an SDK-naming value to an unenumerated consumer",
    ).toStrictEqual([]);
    const loaders = Object.fromEntries(
      Object.keys(LOADER_CONTROLS).map(name => {
        const file = virtualFile(`c1-loader-${name}`);
        return [name, file === undefined ? [] : [...sdkSites(`control:${name}`, file, surface, file.fileName, checker), ...boundLoads(`control:${name}`, file, checker)]];
      }),
    );
    expect(
      Object.entries(loaders)
        .filter(([name, found]) => {
          const violates = found.some(site => site.violates);
          return RESOLVER_CONTROLS.includes(name) ? violates || found.length === 0 : !violates;
        })
        .map(([name]) => name),
      "every load form's and fail-closed consumer's control violates, and every resolver's control is a site that does not",
    ).toStrictEqual([]);
    return json({
      mutationSurface: [...surface],
      surfaceControl: mutationSurfaceIn(READER_CONTROLS.index ?? ""),
      walk: {
        extensions: [...new Set(all.map(module => MODULE_EXTENSIONS.filter(extension => module.endsWith(extension)).sort((a, b) => b.length - a.length)[0] ?? ""))].sort(),
        control: MODULE_NAME_CONTROL.filter(isModuleFile),
      },
      src: siteWitness(sites),
      controls: Object.fromEntries(
        Object.entries(SITE_CONTROLS).map(([name, text]) => [name, siteWitness(sdkSites(`control:${name}`, parse(name, text), surface, virtualPath(name)))]),
      ),
      boundControl: siteWitness(boundFile === undefined ? [] : boundLoads("control:c1-bound", boundFile, checker)),
      packageControl: { sdk: packageNameOf(join(SDK_PACKAGE, "dist", "index.js")), src: packageNameOf(join(REPO, "src", "index.ts")) },
      loaders: Object.fromEntries(Object.entries(loaders).map(([name, found]) => [name, siteWitness(found)])),
    });
  },
  C2: async () => {
    const { src, virtual } = memberReadings();
    expect(compiled().srcFiles, "the program's src files are the src walk's modules").toStrictEqual(srcModules());
    expect(src.filter(entry => entry.violates).map(entry => entry.reading), "no src reference reaches the SDK's mutation or argv class").toStrictEqual([]);
    const unread = srcModules().flatMap(module => unreadDestructures(module, srcSource(module)));
    expect(unread, "no src destructure takes a form C2 does not read (fail closed): a computed or numeric binding key, a destructuring assignment").toStrictEqual([]);
    const refusedIn = (texts: Readonly<Record<string, string>>): Record<string, string[]> =>
      Object.fromEntries(Object.entries(texts).map(([name, text]) => [name, unreadDestructures(`control:${name}`, parse(name, text))]));
    const unreadControls = refusedIn(UNREAD_DESTRUCTURE_CONTROLS);
    const readControls = refusedIn(READ_DESTRUCTURE_CONTROLS);
    expect(
      Object.entries(unreadControls)
        .filter(([, found]) => found.length === 0)
        .map(([name]) => name),
      "the exclusion reader refuses every unread destructure control",
    ).toStrictEqual([]);
    expect(
      Object.entries(readControls)
        .filter(([, found]) => found.length > 0)
        .map(([name]) => name),
      "the exclusion reader refuses no read destructure control",
    ).toStrictEqual([]);
    return json({
      src: referenceWitness(src),
      controls: Object.fromEntries(Object.keys(MEMBER_CONTROLS).map(name => [name, referenceWitness(virtual[name] ?? [])])),
      unread,
      unreadControls,
      readControls,
    });
  },
  C3: async () => {
    const declared = declaredKinds();
    const triggers = srcModules().flatMap(module => glyphTriggersIn(module, srcSource(module)));
    const lit = new Set(triggers.map(trigger => trigger.split("|")[1] ?? ""));
    const drawn = [...declared, ...RENDER_CONTROLS].map(status => ({ status, ...drawnGlyphs(status) }));
    const lighting = drawn.filter(lights).map(entry => entry.status);
    const cases = evidenceCasesIn(srcSource(EVIDENCE_MODULE));
    const verbs = mutationVerbsIn(textOf(MUTATION_DECLARATION));
    expect(lighting.filter(status => RENDER_CONTROLS.includes(status)), "the drawn control lights the verified glyph").toStrictEqual([...RENDER_CONTROLS]);
    expect(declared.filter(kind => lit.has(kind) || lighting.includes(kind)), "no declared kind lights a verified glyph").toStrictEqual([]);
    const receiptFind = declared.map(kind => `${kind}|${nativeEvidence("hyperunix.find", findReading(kind, false, RECEIPT_FIELDS_SHAPE)).domainStatus ?? "none"}`);
    expect(receiptFind, "a find reading carrying the receipt fields projects its kind as domainStatus, verbatim").toStrictEqual(declared.map(kind => `${kind}|${kind}`));
    expect([RECEIPT_WIRE.verified, RECEIPT_WIRE.state], "the SDK recomputes the census receipt as coherent and verified").toStrictEqual([true, "Verified"]);
    const carriers = verifiedCarriers(RECEIPT_WIRE);
    const others = Object.fromEntries(Object.entries(RECEIPT_WIRE).filter(([key]) => !carriers.includes(key)));
    const receiptSubsets = subsetsOf(carriers);
    expect(
      receiptSubsets.flatMap(subset => {
        const shape: Shape = { id: subset.join("+") || "none", source: { ...others, ...Object.fromEntries(subset.map(key => [key, RECEIPT_WIRE[key] ?? null])) }, summary: {}, runtime: {} };
        return declared.filter(kind => nativeEvidence("hyperunix.find", findReading(kind, false, shape)).domainStatus !== kind).map(kind => `${shape.id}|${kind}`);
      }),
      "a find reading carrying any subset of the SDK receipt's Verified-carrying fields, beside its other fields, projects its kind as domainStatus, verbatim",
    ).toStrictEqual([]);
    expect(
      verbs.filter(verb => Object.keys(nativeEvidence(`hyperunix.${verb}`, json({ contract: `hyperunix.${verb}/v1`, source: RECEIPT_SOURCE }))).length > 0),
      "a receipt-shaped output under a mutation verb projects nothing",
    ).toStrictEqual([]);
    return json({
      cases,
      hyperunixCases: cases.filter(label => producerOf(label) === PRODUCER),
      caseControl: evidenceCasesIn(parse("evidence", READER_CONTROLS.evidence ?? "")),
      findStatus: declared.map(kind => `${kind}|${nativeEvidence("hyperunix.find", findReading(kind, false)).domainStatus ?? "none"}`),
      receiptFind,
      receiptCarriers: carriers,
      receiptSubsets: receiptSubsets.length,
      verbs,
      verbControl: mutationVerbsIn(READER_CONTROLS.mutation ?? ""),
      receipts: verbs.map(verb => {
        const id = `hyperunix.${verb}`;
        return `${id}|${JSON.stringify(nativeEvidence(id, json({ contract: `${id}/v1`, source: RECEIPT_SOURCE })))}`;
      }),
      drawn: drawn.map(entry => `${entry.status}|card:${entry.card}|dialog:${entry.dialog}`),
      glyphTriggers: triggers,
      glyphControl: glyphTriggersIn("control", parse("glyph", READER_CONTROLS.glyph ?? "")),
      statusPlaces: srcModules().flatMap(module => statusPlacesIn(module, srcSource(module))),
      placeControl: statusPlacesIn("control", parse("places", READER_CONTROLS.places ?? "")),
      kindsLightingGlyph: declared.filter(kind => lit.has(kind) || lighting.includes(kind)),
    });
  },
  C4: async () => {
    const all = srcModules();
    const found = all.flatMap(module => launches(module, srcSource(module)));
    const commands = new Set(found.map(launch => launch.command));
    expect(LAUNCH_FLOOR.filter(command => !commands.has(command)), "the scan sees src's literal launches").toStrictEqual([]);
    const sdkNames = sdkBinaryNamesIn(textOf(SDK_CLIENT));
    expect(sdkNames.length, "the SDK's client names the binary its PATH lookup spawns").toBeGreaterThan(0);
    expect(
      sdkNames.filter(name => hxSpelling(name) === undefined),
      "every binary name the SDK's PATH lookup spawns is an hx spelling C4 reads",
    ).toStrictEqual([]);
    const spellings = Object.fromEntries(Object.entries(HX_SPELLING_CONTROLS).map(([name, text]) => [name, hxWords(`control:${name}`, parse(name, text))]));
    expect(
      Object.entries(spellings)
        .filter(([, words]) => words.length === 0)
        .map(([name]) => name),
      "every enumerated spelling's control is flagged",
    ).toStrictEqual([]);
    const words = all.flatMap(module => hxWords(module, srcSource(module)));
    expect(words, "no word of a src string literal is an hx spelling").toStrictEqual([]);
    return json({
      floor: LAUNCH_FLOOR.filter(command => commands.has(command)),
      hx: words,
      sdkBinaryNames: sdkNames,
      clientControl: sdkBinaryNamesIn(READER_CONTROLS.client ?? ""),
      controls: Object.fromEntries(Object.entries(LAUNCH_CONTROLS).map(([name, text]) => [name, hxWords(`control:${name}`, parse(name, text))])),
      spellings,
      nearMiss: hxWords("control:near-miss", parse("near-miss", NEAR_MISS_CONTROL)),
    });
  },
  C5: async () => {
    const root = lstatSync(join(REPO, "src"));
    expect([root.isDirectory(), root.isSymbolicLink()], "src itself is a directory, not a link").toStrictEqual([true, false]);
    const entries = entriesBelow("src");
    const refused = entries.filter(reading => !READ_KINDS.includes(readingKind(reading)));
    expect(refused, "every entry below src is a directory or a regular module file: a link, a file of another name or any other entry reds (fail closed)").toStrictEqual([]);
    expect(
      entries.filter(reading => readingKind(reading) === "module").map(readingPath).sort(),
      "the src walk every C reader shares is exactly C5's module entries",
    ).toStrictEqual(srcModules());
    const rootControl = lstatSync(join(REPO, ROOT_CONTROL));
    return json({
      root: { directory: root.isDirectory(), link: root.isSymbolicLink() },
      rootControl: { directory: rootControl.isDirectory(), link: rootControl.isSymbolicLink() },
      readKinds: READ_KINDS,
      kinds: [...new Set(entries.map(readingKind))].sort(),
      refused,
      control: ENTRY_CONTROLS.map(([name, type]) => `${name}|${type}|${entryKind(controlEntry(name, type))}`),
      walkControls: Object.fromEntries(
        Object.entries(ENTRY_WALK_CONTROLS).map(([directory, names]) => [
          directory,
          entriesBelow(directory).filter(reading => names.includes(readingPath(reading).slice(directory.length + 1))),
        ]),
      ),
    });
  },
  Q1: async () => {
    const { virtual } = memberReadings();
    return json(Object.fromEntries(Object.keys(COMPUTED_KEY_PROBES).map(name => [name, referenceWitness(virtual[`q1-${name}`] ?? [])])));
  },
  Q2: async () => {
    const file = virtualFile("q2-require-load");
    return json({
      cast: referenceWitness(memberReadings().virtual["q2-cast"] ?? []),
      requireLoad: referenceWitness(memberReadings().virtual["q2-require-load"] ?? []),
      requireLoadSite: siteWitness(file === undefined ? [] : sdkSites("probe:require-load", file, new Set(mutationSurface()), file.fileName, compiled().checker)),
      copies: Object.fromEntries(Object.keys(COPY_PROBES).map(name => [name, referenceWitness(memberReadings().virtual[`q2-${name}`] ?? [])])),
    });
  },
  Q3: async () => {
    const reading = findReading("verified", false);
    return json({
      domainStatus: nativeEvidence("hyperunix.find", reading).domainStatus ?? "none",
      topology: topologyReading(reading),
      invariant: invariantReading(reading),
      injectedCalls: registrationCalls().filter(call => /(^|[|.])registerHyperUnixFind$/.test(call)),
    });
  },
  Q4: async () => {
    const probe = virtualFile("q4-composed");
    return json({
      sites: siteWitness(sdkSites("probe:composed-specifier", parse("composed", COMPOSED_SPECIFIER_PROBE), new Set(mutationSurface()), virtualPath("q4-composed"))),
      bound: siteWitness(probe === undefined ? [] : boundLoads("probe:composed-specifier", probe, compiled().checker)),
    });
  },
  Q5: async () => {
    const probe = parse("computed-command", COMPUTED_COMMAND_PROBE);
    return json({ words: hxWords("probe:computed-command", probe), launches: launches("probe:computed-command", probe).map(launch => launch.reading) });
  },
  Q6: async () =>
    json({
      walkOutsideSrc: srcModules().filter(module => !module.startsWith("src/")).length,
      programOutsideSrc: compiled().outsideSrc,
    }),
  Q7: async () => {
    const probe = parse("pi-text", PI_TEXT_PROBE);
    return json({
      sites: siteWitness(sdkSites("probe:pi-text", probe, new Set(mutationSurface()), virtualPath("q7-pi-text"))),
      references: referenceWitness(memberReadings().virtual["q7-text"] ?? []),
      launches: launches("probe:pi-text", probe).map(launch => launch.reading),
      words: hxWords("probe:pi-text", probe),
    });
  },
  Q8: async () =>
    json({
      loops: LOOP_FIELDS,
      sampled: Object.fromEntries(
        judgedFields()
          .filter(path => !(LOOP_FIELDS as readonly string[]).includes(path))
          .map(path => [path, [...new Set(SHAPES.map(shape => JSON.stringify(valuesAt(findReading("complete", false, shape), path))))]]),
      ),
      sourceVariations: SOURCE_VARIATIONS.map(shape => shape.id),
      hostValues: HOST_VALUES,
      products: {
        sourceSubsets: 2 ** SOURCE_VARIATIONS.length,
        subsetHosts: [CONTEXT, MOVED_HOST],
        hostContexts: hostContexts().length,
        hostSources: ["minimal", "all source variations"],
        shapes: judgedProducts().length,
      },
    }),
  Q9: async () => {
    const probe = parse("unnamed-status", UNNAMED_STATUS_PROBE);
    return json({ places: statusPlacesIn("probe:unnamed-status", probe), triggers: glyphTriggersIn("probe:unnamed-status", probe) });
  },
  Q10: async () => {
    const probe = parse("host-folded", HOST_FOLDED_PROBE);
    return json({ words: hxWords("probe:host-folded", probe), launches: launches("probe:host-folded", probe).map(launch => launch.reading) });
  },
  Q11: async () => {
    const probe = parse("renamed-binary", RENAMED_BINARY_PROBE);
    return json({ words: hxWords("probe:renamed-binary", probe), launches: launches("probe:renamed-binary", probe).map(launch => launch.reading) });
  },
  Q12: async () => {
    const probe = parse("shell-joined", SHELL_JOINED_PROBE);
    return json({ words: hxWords("probe:shell-joined", probe), launches: launches("probe:shell-joined", probe).map(launch => launch.reading) });
  },
  Q13: async () => {
    const carriers = verifiedCarriers(RECEIPT_WIRE);
    return json({
      wireForms: wireFormsIn(textOf(INDEX_DECLARATION)),
      sampled: ["receiptToJson"],
      carriers,
      carried: Object.fromEntries(carriers.map(key => [key, RECEIPT_WIRE[key] ?? null])),
    });
  },
  Q14: async () =>
    json({
      flag: ENV_FLAG,
      censusEnv: process.env[ENV_FLAG] ?? null,
      underCensusEnv: armed(hyperunixReadings(envGatedRegistry(process.env))),
      underFlag: armed(hyperunixReadings(envGatedRegistry({ [ENV_FLAG]: "1" }))),
    }),
  Q15: async () => {
    const kinds = declaredKinds().filter(kind => kind.startsWith(MUTATION_PREFIX));
    const census = censusAmbient();
    return json({
      flag: AMBIENT_FLAG,
      censusEnv: process.env[AMBIENT_FLAG] ?? null,
      calls: AMBIENT_CALLS,
      epoch: AMBIENT_EPOCH,
      kinds: kinds.map(kind => ({
        kind,
        adapter: topologyReading(findReading(kind, false)),
        underCensus: ambientGated(kind, census),
        underFlag: ambientGated(kind, { ...census, env: { [AMBIENT_FLAG]: "1" } }),
        afterCalls: ambientGated(kind, { ...census, calls: AMBIENT_CALLS + 1 }),
        atEpoch: ambientGated(kind, { ...census, now: AMBIENT_EPOCH }),
      })),
    });
  },
  Q16: async () => {
    const surface = new Set(mutationSurface());
    const { checker } = compiled();
    return json(
      Object.fromEntries(
        Object.entries(HAND_READ_PROBES).map(([name, text]) => {
          const file = virtualFile(`q16-${name}`);
          const probe = parse(name, text);
          const label = `probe:${name}`;
          return [
            name,
            {
              sites: siteWitness(file === undefined ? [] : sdkSites(label, file, surface, file.fileName, checker)),
              bound: siteWitness(file === undefined ? [] : boundLoads(label, file, checker)),
              references: referenceWitness(memberReadings().virtual[`q16-${name}`] ?? []),
              places: statusPlacesIn(label, probe),
              triggers: glyphTriggersIn(label, probe),
              words: hxWords(label, probe),
              launches: launches(label, probe).map(launch => launch.reading),
            },
          ];
        }),
      ),
    );
  },
};

describe("wb-ts6.2 HX mutation Verified census (HXFS-PI-R6, until-then leg)", () => {
  // The judged set reads the whole tracker export (refusal #1 F2: tens of megabytes), so it carries its own timeout.
  it("the judged set: the frozen shape, the out-of-file roster, the bead's own text and the cases agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:3", "C:5", "Q:16"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(
      json({
        self: SELF,
        sdk: SDK,
        sdkDist: SDK_DIST,
        mutationModules: MUTATION_MODULES,
        mutationFiles: MUTATION_FILES,
        mutationPrefix: MUTATION_PREFIX,
        guard: GUARD,
        guardBead: GUARD_BEAD,
        producer: PRODUCER,
        srcFloor: SRC_FLOOR,
        moduleExtensions: MODULE_EXTENSIONS,
        tierFloor: TIER_FLOOR,
        evidenceModule: EVIDENCE_MODULE,
        launchNames: LAUNCH_NAMES,
        launchFloor: LAUNCH_FLOOR,
        wordSeparators: WORD_SEPARATORS.source,
        hxCommand: HX_COMMAND,
        sdkClient: SDK_CLIENT,
        hxWin32Extensions: HX_WIN32_EXTENSIONS,
        hxSpellingControls: HX_SPELLING_CONTROLS,
        hostFoldedProbe: HOST_FOLDED_PROBE,
        renamedBinaryProbe: RENAMED_BINARY_PROBE,
        shellJoinedProbe: SHELL_JOINED_PROBE,
        loadingContexts: [...LOADING_CONTEXTS],
        unreadConsumers: [...UNREAD_CONSUMERS],
        nodeModuleTypes: NODE_MODULE_TYPES,
        signatureLoaders: SIGNATURE_LOADERS,
        loaderControls: LOADER_CONTROLS,
        resolverControls: RESOLVER_CONTROLS,
        requireLoadProbe: REQUIRE_LOAD_PROBE,
        receiptSeed: RECEIPT_SEED,
        sourceVariations: SOURCE_VARIATIONS.map(shape => shape.id),
        hostValues: HOST_VALUES,
        envFlag: ENV_FLAG,
        ambientFlag: AMBIENT_FLAG,
        ambientCalls: AMBIENT_CALLS,
        ambientEpoch: AMBIENT_EPOCH,
        entryControls: ENTRY_CONTROLS,
        entryWalkControls: ENTRY_WALK_CONTROLS,
        rootControl: ROOT_CONTROL,
        readKinds: READ_KINDS,
        unreadDestructureControls: UNREAD_DESTRUCTURE_CONTROLS,
        readDestructureControls: READ_DESTRUCTURE_CONTROLS,
        copyProbes: COPY_PROBES,
        handReadProbes: HAND_READ_PROBES,
        workspace: WS,
        binary: BINARY,
        context: CONTEXT,
        receiptSource: RECEIPT_SOURCE,
        shapes: SHAPES,
        receiptFields: RECEIPT_FIELDS,
        boundLoadControl: BOUND_LOAD_CONTROL,
        loopFields: LOOP_FIELDS,
        envelope: ENVELOPE,
        notDelivered: NOT_DELIVERED,
        clauseControls: CLAUSE_CONTROLS,
        readerControls: READER_CONTROLS,
        siteControls: SITE_CONTROLS,
        moduleNameControl: MODULE_NAME_CONTROL,
        memberControls: MEMBER_CONTROLS,
        computedKeyProbes: COMPUTED_KEY_PROBES,
        castProbe: CAST_PROBE,
        composedSpecifierProbe: COMPOSED_SPECIFIER_PROBE,
        launchControls: LAUNCH_CONTROLS,
        nearMissControl: NEAR_MISS_CONTROL,
        computedCommandProbe: COMPUTED_COMMAND_PROBE,
        piTextProbe: PI_TEXT_PROBE,
        unnamedStatusProbe: UNNAMED_STATUS_PROBE,
        status: STATUS,
        membership: MEMBERSHIP,
        renderControls: RENDER_CONTROLS,
        renderLabel: RENDER_LABEL,
        renderTask: RENDER_TASK,
        residuals: RESIDUALS,
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) {
      for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a quiet-row pin`).toContain(member);
    }
    expect(
      [titleClause(CLAUSE_CONTROLS.title), unreachableClause(CLAUSE_CONTROLS.notes), armedClauses(CLAUSE_CONTROLS.notes)],
      "the clause readers read their controls (the first sentence of each kind, never an appended one)",
    ).toStrictEqual(["the last clause stays", "nothing reaches it", ["first", "second", "third"]]);
    const { title, notes } = exportRow();
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    const armedText = armedClauses(notes);
    expect(armedText, "the owner filing's armed acceptance states three clauses").toHaveLength(3);
    expect(armedText.slice(0, NOT_DELIVERED.length), "the undelivered clauses are the armed acceptance's first two, verbatim").toStrictEqual([...NOT_DELIVERED]);
    const clauses = [titleClause(title), armedText[armedText.length - 1] ?? "", unreachableClause(notes)];
    expect(clauses.filter(clause => clause.length === 0), "every quoted clause was found in the bead's own text").toStrictEqual([]);
    const judged = ROWS.filter(row => row.id !== "Q");
    for (const row of judged) expect(clauses.filter(clause => clause === row.label), `row ${row.id} quotes exactly one clause`).toHaveLength(1);
    for (const clause of clauses) expect(judged.filter(row => row.label === clause), `"${clause}" is quoted by exactly one row`).toHaveLength(1);
    expect(
      judged.filter(row => NOT_DELIVERED.includes(row.label)),
      "no judged row claims an undelivered clause",
    ).toStrictEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
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
    const read = (entry: (typeof walked)[number]): string =>
      `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
