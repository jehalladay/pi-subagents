/**
 * wb-2j3.10 (RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION-R11, program-triage-2026-10-17), the standing leg: the rf graph explain
 * truncation-honesty census, an until-then pin. Cut #4, the respin of refusal #3, authored in the enumerate-the-resolvable form its
 * CUT #4 FORM binds (standing rule 19(c), the rule 14 shape; the shape frozen at 3da116fd): its unmet U1-U3 are cured below, CUT #4,
 * and the pinned set is named in closed form, ENUMERATION; refusal #2's unmet U1 stays cured (CUT #3), and refusal #1's U1-U4 (CUT #2).
 * Statement (the bead's STATEMENT, read from the tracked export .beads/issues.jsonl at run time and never retyped beyond the
 * fragments the rows quote): it is tiled, in order and exactly, by row G's label, ", ", row W's label, ". ", the PENDING clause,
 * "; ", row U's label and ".", so no row label can drift from the filing and no row can be dropped without leaving its fragment
 * untiled. A section is read only from a head that occurs once: each of the four heads the census reads (STATEMENT, RATIONALE,
 * ACCEPTANCE, SURFACES) must occur exactly once in the description, both as its exact "\n\nHEAD: " string and as a word in any
 * case anywhere in the same text the sections are cut from, before any section is extracted; the description's paragraph heads
 * are held to the roster, and the row's acceptance_criteria and design fields (bd's specification fields beside the description)
 * are held absent. The row's notes, status and other fields are not read: they carry the record, not the filing.
 * READING: the gating artifact is the conjunction the STATEMENT names, the RFCLI release (PMO-05a/PMO-05b shipping the flag with
 * its two fields) conjoined with a Pi W10 slice that invokes graph explain, and "the artifact" in row U's label is that
 * conjunction. Its RFCLI conjunct is MET at the recorded build (row G); its Pi conjunct is unmet (row W); so the artifact does not
 * exist, and row U measures that Pi carries no change toward it.
 * NOT DELIVERED HERE: the PENDING clause ("If and when a Pi surface consumes rf graph explain, it shall carry truncated/path_limit
 * and the graph revision verbatim and shall never present a capped path list as complete") and the filing's ACCEPTANCE, two
 * "On landing:" items (a consumer test driving the new adapter with a truncated:true, path_limit:N fixture; the graph revision
 * carried verbatim, a second value round-tripping). They bind when a Pi surface consumes rf graph explain (row W reds then).
 * The description's ACCEPTANCE section is held to exactly those two on-landing items, so a standing item added to it, a second
 * ACCEPTANCE or STATEMENT section, or an acceptance_criteria or design field on the row reds this census; a note does not.
 *
 * MEASURED (by the cutting seat ws-04, run g10-work-s133, 2026-10-29, on trunk b3d410f merged into the branch: since cut #3's base
 * c843ed5, landings 654-662 changed test and .beads paths only, no src module, no package.json and none of the census's helpers;
 * the roster's "capture" object holds the producer values cut #2's capture script wrote (seat ws-03, run g10-work-s129) from the
 * installed rf, two scratch rf workspaces and a read-only git show and log of the RFCLI object store, never by hand, and runs of
 * the same script at 2026-10-28T22:20:05Z (cut #3) and 2026-10-29T02:02:54Z (this cut) read every value equal, the empty-scratch
 * probe's per-run operation id aside):
 * - The installed rf was 0.1.845 at build b8b3e9f1de56 (rf --json --version at capturedUtc 2026-10-28T17:21:52Z:
 *   provenance.commit_id, mismatch false), the release
 *   the contractSource carrier records (REACTIVE_FIBER_CONTRACT_SOURCE, read through recordedRfRelease of
 *   test/helpers/rf-release-drift.ts); its registry serves graph.explain (served_reachable). The build's history carries the
 *   RFCLI commit e2d707538bb9 ("feat(schemas): [PMO-05b] rf graph explain --max-paths N adds truncated"); the prior build of the
 *   same release, 7e6ed89a09f6 (the build cut #1 captured), does not.
 * - Its graph explain leaf took --max-paths: the --help usage listed it among eleven options; `rf graph explain --max-paths 1
 *   source:x --json` against an empty scratch directory exited 3 with RF_WORKSPACE_INVALID and no unknown option (the flag parsed);
 *   over a scratch workspace (rf init plus one literal [[source]] row) the flagged explain exited 0 with the eight default result
 *   keys followed by truncated (false) and path_limit (1), and the unflagged explain exited 0 with the eight alone.
 * - Its envelope schema (reactive_fiber_cli/schemas/cli/graph.explain.schema.json, 25309 bytes) declared the ok:true result at
 *   /$defs/result with ten members, graph_revision_id, target, source, reachable, paths, edge_paths, reason, diagnostics,
 *   truncated and path_limit, of which the first eight are required (the two fields are emitted only under the flag; ruling R-49
 *   option (a)). At the bead's pin (ReactiveFiberCLI 8a8b83e4d) the same object's required list spans
 *   graph.explain.schema.json:375-383, the lines the filing cites, and holds the first seven: neither field is there, as filed.
 * - PMO-05b, the leaf's --max-paths with truncated and path_limit in its envelope (RFCLI BEADS-2026-10-16.md:61; ruling R-49 at
 *   :297), over PMO-05a's capped search below the CLI, has SHIPPED at the recorded build: the gating artifact's RFCLI conjunct is
 *   MET. It shipped under the unchanged release string 0.1.845 (cut #1 captured build 7e6ed89a, where it had not), a rebuild no
 *   repository anchor records (R-SAME-RELEASE-REBUILD below).
 * - Pi: every entry under src is a regular .ts file or a directory (117 walked modules in src and its five subdirectories at
 *   b3d410f; no regular file of another name, no symlink and no entry of another type: the unwalked-entry list is empty). Three
 *   walked modules import node:child_process, each by one static import declaration; those three are the only child_process
 *   module-name literals in the walked modules and the only spellings of child_process in their text. They hold five call sites,
 *   all pinned: execFileSync of git three times in src/index.ts (workspaceCandidateBasis's git and atRoot, observedPackageHead's
 *   revision), the detached host's spawn of process.execPath (launchDetachedWorkflow) and the provider's spawn of rf
 *   (nativeReactiveFiberRender), its argv renderArgv's (verb context render, tail --no-commit --no-input --json). No reference
 *   to a child-process binding escapes a call, no module-name literal is unbound and no spelling is unread. No walked module's
 *   literal spells the graph explain leaf, no walked module's text spells a PMO-05b name, no walked module imports, loads or
 *   type-references an rf package by a bare specifier in any form U3 reads (none is published), package.json names or specifies
 *   none in any field, and the one registered rf capability is the non-committing render preview: the Pi conjunct is unmet.
 *
 * ROWS (one test per pin, titled by the pin id under its row's label; each pin's witness is the roster's):
 *  G, the gating artifact's RFCLI conjunct, read from the capture: MET. G1 the capture's identity: the carrier's release at the
 *    build its commit names (a full sha, pinned beside the release), whose history carries the PMO-05b commit while the prior
 *    build's does not, and its graph.explain leaf served. A carrier re-pin reds G1 until the capture is re-measured at the new
 *    release (capture.remeasure); a rebuild under the same release does not (R-SAME-RELEASE-REBUILD). G2 the leaf's usage options
 *    include the filing's flag; the empty-scratch probe parses it (exit 3 on the workspace, no unknown option); the bounded probe
 *    adds both filing fields after the required members under the flag and neither without it. G3 the result members at the
 *    build include both fields and its required list neither; at the pin neither is a member or required; the revision member is
 *    in each list; the pin's required list spans exactly the cited lines; the schema file's bytes and sha-256.
 *  W, the Pi slice that invokes graph explain (none). W1 the walk, and every child_process load the walked modules hold. The walk
 *    reads every entry under src by lstat: a directory it descends; a regular file whose name ends .ts, a walked module, which
 *    every reader of this census reads (src text, a src module and a src literal below mean a walked module's); and any other
 *    entry - a regular file of any other name (a .txt, an extensionless file, a .json, a .cjs, an upper-case .TS), a symlink
 *    whatever its name or target, which it never follows, or an entry of another type - which it lists unwalked and never reads.
 *    The unwalked-entry list is pinned (empty), so a file the readers would not read reds W1 for re-measure, as N1-N5 do; its
 *    entry controls (a scratch tree holding every such form, read by the same walk), kind controls (lstat's answers, none of
 *    them for a FIFO, a socket or a device) and reading controls read as pinned. Then the src modules importing node:child_process (this reader and the shared
 *    sourceStructure read the same list, and the list is pinned) and every value reference there to a child-process binding: a
 *    named, default or namespace import, a bound require declaration (a variable whose whole initializer is require of the
 *    module, named by an identifier or an object pattern of plain elements), or a const alias of one (a non-exported const or
 *    destructure of a binding or a namespace, or a const of a namespace member), resolved to a fixpoint. A reference is a call site when it calls
 *    a child-process function directly (or a namespace member of one); every call site is pinned
 *    (module|kind|scope|callee|binary|shell) and exactly one is rf (the provider's spawn). A call's binary is its first argument
 *    or, for a shell call (exec, execSync, or a spawn, spawnSync, execFile or execFileSync whose options literal sets shell to true
 *    or to a non-empty string), its command line's first word after any NAME=value assignments, shell-unquoted; a binary reads as
 *    rf by its basename, lower-cased, without a .exe or .cmd launcher extension; a call whose shell cannot be read (an options
 *    argument that is no literal, a spread, a computed or non-literal shell value) is opaque when its two readings differ; a
 *    non-literal binary is opaque. Every other value reference (a let or var alias, an exported alias, an argument, a member such
 *    as spawn.call or an uncalled namespace member, a property, an assignment, an export or a re-export) is an escape, as is a
 *    direct eval in a module that binds child_process (its source text runs in the module's scope and reaches the binding), and none
 *    exists (fail-closed: a new one reds for re-measure, as a new call site of any binary does). Every child_process module-name
 *    literal (a string or template literal whose value is child_process or node:child_process) is read per occurrence, whether
 *    or not its module also binds child_process: as an import, type, side-effect or re-export declaration's, a bound require
 *    declaration's, or else unbound with its carrier (require: any other require call, an inline require; import: a dynamic
 *    import, awaited, destructured or chained with then; call: the first argument of any other call, a createRequire-made
 *    loader, module.require, process.getBuiltinModule; import-equals; value: anywhere else, a variable specifier or a
 *    concatenation operand). The occurrence list is pinned (the three static imports, read without line numbers) and none is
 *    unbound. Every spelling of child_process in src text outside a module-name literal (a comment, a longer string such as
 *    source text held for evaluation, a template, an identifier, a regular expression), and every string or template piece
 *    whose cooked text spells it through an escape sequence, is unread, and none is. So every
 *    child_process load a walked module's text spells is read and pinned whether or not its module also binds child_process, and
 *    src holds no text the walk leaves unread: a new load is a new occurrence, an unbound one is unbound, a spelling elsewhere is
 *    unread, a new file the walk does not read is unwalked, and a new reference to a resolved binding is a
 *    new site or an escape (a direct eval included). An existing pinned site's arguments are not pinned: a new call of a
 *    same-module wrapper around one (workspaceCandidateBasis's git and atRoot closures) runs whatever argv it passes, so that
 *    argv is W3's and, composed, R-COMPOSED's (Q1). The importer controls read
 *    refusal #2's forms (inline require, await-import destructure, import().then, createRequire, import equals, and the composed
 *    explain through the await-import and createRequire idioms) and the variable, concatenated, template, escaped,
 *    getBuiltinModule, module.require, bound-require, defaulted-pattern and type-position forms and a direct eval inside a
 *    module that also imports child_process. No regular file under src carries one of the seven code extensions the walk does not
 *    read as modules (a .js, .mjs, .cjs, .jsx, .mts, .cts or .tsx file: that list is pinned empty, its file-name controls read as
 *    pinned), and no entry under src is unwalked at all (the unwalked-entry list). A caller of another module's wrapper is not read; the
 *    wrapper module is (a re-export or an exported alias is an escape, a parameter binary an opaque site, a fixed rf binary a
 *    second rf site). A launcher binary (env, git with an alias, a shell line's first word) reads as itself, not as the process
 *    it starts: W3 reads a literal argv naming the leaf, and a composed one passed through an existing site is R-COMPOSED's.
 *    The scanner's controls read as pinned. W2 the rf spawn's argv is renderArgv's: the argument is the const argv
 *    initialised by renderArgv(selector,workspaceRoot), renderArgv's array literals read as pinned and its returned array's words,
 *    with options and expressions elided, are context render. W3 no src string, template or array literal spells the leaf (its
 *    two words in any case, joined directly or by white space, ".", "_", ":", "/" or "-", neither word part of a longer one),
 *    read as spelled, with rf's options elided and, for strings and templates, shell-unquoted (quotes dropped, a backslash escape kept as
 *    its character); the planted spellings are caught and the near misses are not.
 *  U, until the artifact (the conjunction) exists, no Pi change. U1 no src text (comments included) spells a PMO-05b name: the
 *    filing's flag and its path_limit field, each in its snake, kebab and camel spellings, case-sensitive; the planted names are
 *    caught (in code, a line comment and a block comment) and the near misses are not. U2 the native and the injected rf
 *    registrations hold exactly the render preview (effectClass read, contractSource the carrier's non-committing render with its
 *    release masked) and no rf descriptor's id, description or contractSource spells the leaf; a registry holding a planted explain
 *    descriptor reads one finding. U3 no src module imports an rf package (a static import declaration, type-only ones included,
 *    or an export-from declaration at the module's top level, or a dynamic import or require call with a literal first argument:
 *    the four forms the shared sourceStructure reads); no src call takes a string literal naming one as its first argument (read through parentheses and
 *    type assertions), whatever the callee (require, import(), a call of a call such as createRequire(import.meta.url)(...),
 *    module.require, require.resolve, a loader under any name), other than a child-process call site's binary, which W1 reads, no
 *    tagged template's literal names one and no import-equals declaration does (so a literal rf binary passed to a launch W1 does
 *    not resolve reads as such a load); no src type position names one (an import type's argument, such as N11's typeof
 *    import("@reactive-fiber/tsx"), a triple-slash types or path directive, an amd-dependency directive, an ambient module
 *    declaration's name, or an import or export declaration nested in a module block), each read as a type reference and never as
 *    a runtime load (no type plant reads a load); and package.json names or specifies none in any key or string value at any depth (the four dependency maps,
 *    bundledDependencies, overrides, resolutions, pi.extensions, scripts and every other field). A module specifier, or a
 *    manifest key, names an rf package when it is bare (not relative, absolute or node:, so Pi's own relative reactivefiber
 *    module never does and a path to an rf package's files is R-PATH-SPECIFIER's, Q7) and its package name carries
 *    reactive-fiber, reactivefiber or reactive_fiber in any case or has a scope or name segment that is rf or begins rf and a -,
 *    _ or . (rf-sdk); a manifest string value specifies one when it carries one of those words or has a segment (split at /, :,
 *    @ or a backslash) of that shape (rf.tgz, file:vendor/rf); the predicate's planted names and specs, the loader plants (a call
 *    whose first argument names an rf package reads as a load whatever it does), the type plants and the manifest plants are
 *    caught, and Pi's own relative reactivefiber module, the provider's rf binary, the other packages, the quiet type positions
 *    and the quiet manifest fields are not.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 *  pins, every pin's witness, the constants and controls, the filing reading (paragraph heads, repeated heads, each head plant's
 *  refusal, the specification fields present and a planted one's), the residual families and every registered test title - is
 *  held to the out-of-file roster (test/fixtures/rf-graph-explain-truncation-roster.json); outside both, the rows' labels are
 *  held to the bead's STATEMENT in the tracker export (the tiling above), the leaf, flag and fields to the STATEMENT's own
 *  spelling of them, the cited pin and lines to the capture's pin, and the capture's release to the carrier. The last case reads
 *  the vitest task tree (every registered test, in roster order, in run mode, ran before it) and the pins that reached their
 *  witness.
 * NOT CLAIMED (edits of this file and the roster together): a pin removed from ROWS, the literal, IMPL and the roster; a control
 *  or a head plant removed from its list and the roster; a pin's case, or one reading in it, replaced by one that echoes its
 *  roster witness (a reading pinned empty over src, such as W1's entries or U3's types, stays green when its call is replaced by an
 *  empty literal; measured at cut #4, E1 and E2 0 failed); row Q
 *  removed with RESIDUALS from every literal and the roster (Q quotes no STATEMENT fragment).
 * ENUMERATION (CUT #4 FORM (4): the pinned set in closed form; any file or form not named here is outside the claim, and each
 *  known member outside it is a named residual with its pinned quiet row, RESIDUALS):
 *  - Files: the walk (W1) reads every entry under src by lstat, and every reader reads exactly its walked modules, the regular
 *    files under src whose names end .ts; W1 pins the list of every other entry (empty) and of the regular files among them with
 *    a skipped code extension (empty). Beyond src the census reads package.json whole (U3), the tracker export's wb-2j3.10 row
 *    (its description and the two specification fields: the judged set), the native and the injected rf registrations (U2), the
 *    carrier's release (G1, Q2) and the roster, and nothing else.
 *  - W1's forms: bindings (a named, default or namespace import of node:child_process or child_process, a bound require
 *    declaration, and their const aliases, to a fixpoint); call sites (a direct call of a bound spawn, spawnSync, execFile,
 *    execFileSync, exec, execSync or fork, or of a namespace member of one, with its binary and shell readings); escapes (every
 *    other value reference to a binding, and a direct eval in a module that binds child_process); loads (every string or template
 *    literal whose value is child_process or node:child_process, per occurrence, read as an import, type, side-effect or
 *    re-export declaration's, a bound require's, or unbound with its carrier); unread spellings (every other occurrence of the
 *    text child_process in a walked module, and every string or template piece whose cooked text spells it through an escape).
 *  - W2's and W3's: the rf spawn's argv through renderArgv; every string, template and array literal, read as spelled, with
 *    options elided and shell-unquoted, for the leaf's spelling family. U1's: the PMO-05b needles in each walked module's whole
 *    text. U2's: every rf descriptor's id, effect class, description and contractSource.
 *  - U3's, for a bare specifier naming an rf package: sourceStructure's four (a top-level static import, type-only ones
 *    included; a top-level export-from; a dynamic import or a require call with a literal first argument); packageLoads' three
 *    (any call's literal first argument, read through parentheses and type assertions; a tagged template's literal; an
 *    import-equals reference); typeReferences', each a type reference (an import type's argument; a triple-slash types or path
 *    directive; an amd-dependency directive; an ambient module declaration's name; an import or export declaration nested in a
 *    module block); and package.json's every key (as a specifier) and string value (as a spec) at any depth.
 *  - G's: the capture's fields, which the capture script writes from the seven producer reads capture.remeasure names.
 * RESIDUALS (named, each with its pinned quiet row): R-COMPOSED the leaf spelled from runtime parts (a verb held in a variable,
 *  a concatenation, a pushed word, a template substitution, a shell expansion) is invisible to W3, and passed as an argv through an existing pinned
 *  site (a launcher such as git with an alias, a same-module wrapper) it is no new W1 site either (Q1); R-SAME-RELEASE-REBUILD the carrier records a release and no build, so
 *  G1 admits a capture at any build of the carrier's release and a producer rebuilt under it (as b8b3e9f1 was over 7e6ed89a) is
 *  invisible to row G until a seat re-measures the capture (Q2); R-OUTSIDE-SRC the walks read src only (qa/, scripts and an
 *  operator's local provider module loaded from a path outside src are not read; a symlink under src whose target lies outside
 *  it is W1's unwalked entry, never followed), though the scanners flag the same text (Q3);
 *  R-COMMON-WORD the filing's truncated field is an ordinary src word (a relation page flag, text truncation) and is not a U1
 *  needle (Q4); R-UNSEEN-LAUNCHER a process launched where no src text spells child_process (a module specifier composed or
 *  read at run time, also inside evaluated source text that composes it; process.execve; an internal process binding;
 *  node:cluster's fork; a package's own spawn such as execa) is no W1 site, load or unread spelling; W3 still reads a literal
 *  argv such a launch passes and U3 a literal rf binary it passes as a call's first argument, but W3 reads none spelled inside
 *  evaluated source text and U3 no binary path or composed name (Q5); R-UNREAD-SPECIFIER an rf package
 *  specifier that reaches a loader other than as a call's first-argument literal, a tagged template's literal or an import-equals
 *  reference (any other expression: held in a variable, an array spread into the call or passed through Reflect.apply, a
 *  conditional, composed at run time, built into a URL) is no U3 load (Q6); R-PATH-SPECIFIER an rf package's files reached by a
 *  path rather than a bare specifier (a relative path into node_modules, an absolute path, a file: URL, a triple-slash path
 *  directive, an import type of a path) name no rf package to U3's predicate, which reads bare specifiers only so that Pi's own
 *  relative reactivefiber module stays quiet: no U3 reader reads one, in any position (Q7).
 * SCOPE: the census judges Pi's src, its registrations and package.json, the filing's description and specification fields, and
 *  the captured producer state. It re-runs none of the runtime argv pins the rf graph mutation census owns
 *  (test/workbench-rf-graph-mutation-census.test.ts rows A and C), and the honesty homes the bead's rationale names
 *  (graph-view.ts, topology-slice.ts) keep their own suites.
 * CUT #2 (refusal #1's unmet list): U1 row G re-measured and re-shaped to the shipped state at build b8b3e9f1, the build bound in
 *  G1's witness beside the release, the same-release rebuild named with its quiet row (Q2), row U's premise and this header
 *  corrected; U2 const aliases and namespace destructures resolved, shell:true and NAME=value command lines read, every other
 *  reference an escape, every call site pinned and unbound modules read, each with controls; U3 every read head asserted unique,
 *  in the extraction's own view, before any extraction (plants pinned), and the specification fields held absent (F3's scope);
 *  U4 comment-form names and rf.exe, rf.cmd and RF binaries pinned as controls, with backslash, word-boundary and scope controls
 *  beside them.
 * CUT #3 (refusal #2's unmet list; the record CURE's first arm, the class-level guard): U1 every child_process module-name literal
 *  is read per occurrence (scanSpawns' loads), so a load inside a module that also imports child_process is read exactly as in
 *  one that does not and is never masked by the module's static import (refusal #2's mechanism: cut #2 read a module as
 *  unbound only when it held such a literal and bound none); a require binds only as a variable's whole initializer under an
 *  identifier or a plain object pattern; a spelling of child_process anywhere else in src text, or through an escape sequence in
 *  a string or template, is unread; the occurrence,
 *  unbound and unread lists are pinned; the importer controls cover P01 (inline require), P02 (await-import destructure), P03
 *  (import().then), P04 (createRequire), import equals, P05 and P05b (the composed explain through the await-import and
 *  createRequire idioms) and the further forms W1 names, each reading as an unbound load, a second load or an escape inside a
 *  module that also imports child_process. F3 (P27): U3 reads every call's first-argument literal naming an rf package and every import-equals
 *  reference, a createRequire-made loader under any name included, read through parentheses and type assertions and in a tagged
 *  template, and names the remainder (R-UNREAD-SPECIFIER, Q6); a direct eval in a module that binds child_process is a W1 escape. F4 (P28):
 *  U3 reads package.json in full. R-UNSEEN-LAUNCHER's boundary is restated on the spelling, its evaluated probe composes the
 *  specifier inside the evaluated text (spelled there it now reads unread) and node:cluster is named; R-COMPOSED names the
 *  composed argv passed through an existing pinned site.
 * CUT #4 (refusal #3's unmet list under its CUT #4 FORM; additions only: no title, row, pin, control, plant case or residual
 *  family is removed and no pinned reading changes - the roster's prior constants, filing and witnesses read equal, and the
 *  residuals map gains one key): U1 (the walk; record F1, F2): before, the walk kept regular files only (a Dirent's isFile)
 *  and srcModules *.ts only, so a symlink under src (N4, N5) and a regular file of another name (N1 and N3 a .txt, N2 none) was
 *  neither read nor listed, against MEASURED's only-literals sentence, W1's every-load sentence and the skipped-module sentence;
 *  after, W1's walk reads every entry under src by lstat (walkEntries), srcModules is its walked modules (the same 117), W1 adds
 *  the unwalked-entry list (entries, empty), the entry, kind and reading controls, and those sentences are restated to the walked
 *  modules and the empty list: N1-N5 red W1 (N4 also U2, as before), and N1c, N4c and N5c stay red. U2 (U3's type references;
 *  record F3): before, U3 read sourceStructure's four forms and packageLoads' three and no type position (N11 green), against
 *  MEASURED's unscoped no-rf-package sentence; after, U3 adds typeReferences (types, empty; typeCaught, N11's exact text first;
 *  typeQuiet; typeLoads, where packageLoads reads none of the type plants, so a type reference is never a load), and the
 *  sentence is scoped to the forms U3 reads: N11 reds U3 and N12 stays red. U3 (note honesty, LOW; record F5): biome and tsc
 *  include src/**\/*.ts and test/**\/*.ts only, so lint and typing check this file and never the roster, which the census's
 *  JSON.parse alone reads (refusing any field of the wrong shape by name); the delivery note and the commit body say so.
 *  ENUMERATION names the pinned set in closed form, and U3's predicate reading bare specifiers only is the named residual
 *  R-PATH-SPECIFIER with its quiet row (Q7, new: the frozen shape moves from Q:6 to Q:7).
 *
 * Display paths added: none. Test-only: one scratch directory (makeScratch from test/helpers/scratch.ts, removed by W1's case,
 *  installScratchLeakGuard at module scope) holds W1's entry controls; src, package.json, .beads and the roster are only read.
 */
import { lstatSync, mkdirSync, readdirSync, readFileSync, type Stats, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { sourceStructure } from "./helpers/census.js";
import { recordedRfRelease } from "./helpers/rf-release-drift.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

type JsonObject = { [key: string]: JsonValue };

/** W1's entry controls make one scratch tree (makeScratch, removed by the case); the guard fails the file on a leak. */
installScratchLeakGuard();

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-graph-explain-truncation-roster.json");
const BEAD = "wb-2j3.10";
const PROVIDER_FILE = "src/workbench/providers/reactivefiber.ts";
const RF_PREFIX = "reactivefiber.";
/** The src walk reaches at least this many modules (117 measured at the cut's base e81d2b0); a floor, not an exact set. */
const SRC_FLOOR = 100;
/** A code module the walks would not read (they read *.ts): src holds none, and W1 pins the list. */
const UNWALKED_MODULE = /\.(?:[cm]?jsx?|[cm]ts|tsx)$/;
/** File-name controls for it: the seven skipped code extensions are caught; a .ts or .d.ts module and a .json file are not. */
const UNWALKED_CONTROLS: readonly string[] = ["probe.js", "probe.mjs", "probe.cjs", "probe.jsx", "probe.mts", "probe.cts", "probe.tsx", "probe.ts", "probe.d.ts", "probe.json"];
/** One entry W1's entry controls make: a regular file, a directory, or a symlink to its target (relative to the link). */
type EntryPlant = { readonly path: string; readonly kind: "file" | "directory" } | { readonly path: string; readonly kind: "symlink"; readonly target: string };
/** W1's entry controls, made in one scratch directory and read by the same walk as src: regular .ts modules at the top and
 * nested (a .d.ts among them: walked), regular files of other names (.txt, none, .body, .json, an upper-case .TS, a dotfile),
 * symlinks to a .ts module, to a .body file (N5's shape), to a directory and to nothing, and an empty directory (descended,
 * holding nothing): every one but the regular .ts files is unwalked, and no symlink is followed. */
const ENTRY_PLANTS: readonly EntryPlant[] = [
  { path: "module.ts", kind: "file" },
  { path: "nested/inner.ts", kind: "file" },
  { path: "nested/deeper/types.d.ts", kind: "file" },
  { path: "nested/.hidden", kind: "file" },
  { path: "empty", kind: "directory" },
  { path: "gate-launch.txt", kind: "file" },
  { path: "gate-launch", kind: "file" },
  { path: "gate-launch.body", kind: "file" },
  { path: "data.json", kind: "file" },
  { path: "upper.TS", kind: "file" },
  { path: "linked.ts", kind: "symlink", target: "module.ts" },
  { path: "gate-launch.cjs", kind: "symlink", target: "gate-launch.body" },
  { path: "linked-dir", kind: "symlink", target: "nested" },
  { path: "dangling.ts", kind: "symlink", target: "missing.ts" },
];
/** entryKind's controls: lstat's three answers as [isDirectory, isFile, isSymbolicLink], and none of them (a FIFO, a socket or
 * a device, which no call here can make) read as other. */
const KIND_CONTROLS: Readonly<Record<string, readonly [boolean, boolean, boolean]>> = {
  directory: [true, false, false],
  file: [false, true, false],
  symlink: [false, false, true],
  other: [false, false, false],
};
/** entryReading's controls: a name and an lstat kind, each read as descend, module or unwalked. */
const READING_CONTROLS: readonly (readonly [string, EntryKind])[] = [
  ["probe.ts", "file"],
  ["probe.d.ts", "file"],
  ["probe.txt", "file"],
  ["probe", "file"],
  ["probe.TS", "file"],
  ["probe.cjs", "file"],
  ["probe.ts", "symlink"],
  ["probe", "symlink"],
  ["probe.ts", "other"],
  ["probe", "other"],
  ["probe.ts", "directory"],
  ["probe", "directory"],
];
/** The reading of a non-literal element, argument or template substitution. */
const EXPR = "<expr>";
/** The leaf, its flag and its two fields as the STATEMENT spells them (held to it in the first case). */
const LEAF = "graph.explain";
const FLAG = "--max-paths";
const FIELDS = ["truncated", "path_limit"] as const;
/** The field that is an ordinary src word and so no U1 needle (R-COMMON-WORD). */
const EXCLUDED_FIELDS: readonly string[] = ["truncated"];
/** The result member that carries the graph revision. */
const REVISION_MEMBER = "graph_revision_id";
/** The pin and the schema lines the STATEMENT cites for the absent fields. */
const CITED_PIN = { rfcli: "8a8b83e4d", lines: [375, 383] } as const;
/** The STATEMENT clause and the two ACCEPTANCE items this standing leg does not deliver. */
const PENDING =
  "If and when a Pi surface consumes rf graph explain, it shall carry truncated/path_limit and the graph revision verbatim and shall never present a capped path list as complete";
const PENDING_ACCEPTANCE: readonly string[] = [
  "On landing: a consumer test drives the new adapter with a truncated:true, path_limit:N fixture and asserts the projection is partial/truncated with a counted remainder; a capped list never projects coverage 'complete'.",
  "On landing: the graph revision is carried verbatim from the envelope (a second revision value round-trips).",
];
/** The STATEMENT's tiling: the fragments in order (a row id, or PENDING for the pending clause) and the separator after each. */
const TILES: readonly string[] = ["G", "W", "PENDING", "U"];
const SEPARATORS: readonly string[] = [", ", ". ", "; ", "."];
/** The description's section heads the census reads; each must occur once, as this string and as a word in any case. */
const HEADS = { statement: "\n\nSTATEMENT: ", rationale: "\n\nRATIONALE: ", acceptance: "\n\nACCEPTANCE: ", surfaces: "\n\nSURFACES: " } as const;
/** Plants appended to the real description, each repeating a read head (as a section, on one newline, in another case, inline). */
const HEAD_PLANTS: Readonly<Record<string, string>> = {
  "acceptance-after-related": '\n\nACCEPTANCE: ["A standing item: the consumer adapter ships with this bead."]',
  "statement-at-end": "\n\nSTATEMENT: A second statement read after the first.",
  "single-newline": '\nACCEPTANCE: ["A standing item."]',
  "lower-case": '\n\nAcceptance: ["A standing item."]',
  "inline-rationale": " RATIONALE: a second rationale inline.",
  "second-surfaces": "\n\nSURFACES: src/index.ts",
};
/** bd's specification fields beside the description (absent on this row), and a planted one that must read as present. */
const FILING_FIELDS: readonly string[] = ["acceptance_criteria", "design"];
const FIELD_PLANT: Readonly<Record<string, string>> = { acceptance_criteria: "A standing item: the consumer adapter ships with this bead." };
/** The child-process functions a call site is read for. */
const CHILD_PROCESS_CALLS: readonly string[] = ["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"];
/** The calls whose first argument is always a shell command line, and the calls whose options can make it one. */
const SHELL_CALLS: readonly string[] = ["exec", "execSync"];
const SHELL_OPTION_CALLS: readonly string[] = ["spawn", "spawnSync", "execFile", "execFileSync"];
/** A shell assignment word (NAME=value), skipped before a command line's command word. */
const ASSIGNMENT_WORD = /^[A-Za-z_][A-Za-z0-9_]*=/;
const CHILD_PROCESS_MODULE = /^(?:node:)?child_process$/;
/** rf's value-taking globals (its parser's RF_VALUE_OPTIONS): spelled apart, each consumes the next token. */
const RF_VALUE_OPTIONS: readonly string[] = ["--workspace", "--actor", "--color"];
/** A package name or spec carrying one of these (lower-cased), or a name or path segment RF_SEGMENT reads as rf's, is an rf package. */
const RF_PACKAGE_WORDS: readonly string[] = ["reactive-fiber", "reactivefiber", "reactive_fiber"];
/** A name or path segment that is rf's: rf itself, or rf and a -, _ or . before more (rf-sdk, rf.tgz; not rfc-parser or rfdc). */
const RF_SEGMENT = /^rf(?:$|[-_.])/;
/** The text W1's unread reading looks for: child_process spelled anywhere in a module's source, comments included. */
const SPELLING = "child_process";

/** W1's scanner controls: module bodies (parsed, never compiled or run). */
const SPAWN_CONTROLS: Readonly<Record<string, string>> = {
  named: `import { spawn } from "node:child_process"; function run(argv: string[]) { return spawn("rf", argv); }`,
  alias: `import { execFile as launch } from "child_process"; launch("/usr/local/bin/rf", ["graph"]);`,
  namespace: `import * as cp from "node:child_process"; cp.spawnSync("rf", []);`,
  "default-opaque": `import cp from "node:child_process"; cp.fork(script);`,
  require: `const { spawn: launch } = require("node:child_process"); launch("rf", argv);`,
  "require-element": `const cp = require("child_process"); cp["execSync"]("rf graph show --json");`,
  "variable-binary": `import { spawn } from "node:child_process"; const BIN = "rf"; spawn(BIN, argv);`,
  git: `import { execFileSync } from "node:child_process"; execFileSync("git", ["status"]);`,
  "regex-exec": `import { spawn } from "node:child_process"; const found = /rf/.exec(text);`,
  "type-only": `import type { ChildProcess } from "node:child_process"; const exec = (line: string) => line; exec("rf");`,
  unimported: `spawn("rf", argv);`,
  exe: `import { execFileSync } from "node:child_process"; execFileSync("rf.exe", ["context", "show"]);`,
  "cmd-path": String.raw`import { execFileSync } from "node:child_process"; execFileSync("C:\\tools\\rf.cmd", ["context", "show"]);`,
  upper: `import { spawn } from "node:child_process"; spawn("RF", ["context", "show"]);`,
  "const-alias": `import { spawn } from "node:child_process"; const launch = spawn; launch("rf", ["context", "show"]);`,
  "namespace-destructure": `import * as cp from "node:child_process"; const { execFileSync: run } = cp; run("rf", ["context", "show"]);`,
  "member-alias": `import * as cp from "node:child_process"; const run = cp.execFileSync; run("rf", ["context", "show"]);`,
  "alias-chain": `import * as cp from "node:child_process"; const space = cp; const { spawn: go } = space; const again = go; again("rf", []);`,
  "let-alias": `import { spawn } from "node:child_process"; let launch = spawn; launch("rf", []);`,
  "exported-alias": `import { spawn } from "node:child_process"; export const launch = spawn;`,
  argument: `import { spawn } from "node:child_process"; run(spawn, "rf");`,
  "call-method": `import { spawn } from "node:child_process"; spawn.call(undefined, "rf", []);`,
  property: `import * as cp from "node:child_process"; const host = { launch: cp.spawn };`,
  "re-export": `export { spawn as launch } from "node:child_process";`,
  "local-export": `import { spawn } from "node:child_process"; export { spawn as launch };`,
  "wrapper-function": `import { spawn } from "node:child_process"; export function launch(binary: string, argv: string[]) { return spawn(binary, argv); }`,
  "wrapped-caller": `import { launch } from "./launch.js"; launch("rf", ["graph", "explain", target]);`,
  "inline-require": `require("node:child_process").execFileSync("rf", ["context", "show"]);`,
  "shell-true": `import { spawn } from "node:child_process"; spawn("rf context show --json", { shell: true });`,
  "shell-path": `import { execFile } from "node:child_process"; execFile("rf context show", [], { shell: "/bin/sh" });`,
  "shell-false": `import { spawn } from "node:child_process"; spawn("rf context show", { shell: false });`,
  "shell-unknown": `import { spawnSync } from "node:child_process"; spawnSync("rf context show", options);`,
  "assignment-prefix": `import { execSync } from "node:child_process"; execSync("RF_LOG_LEVEL=debug rf context show --json");`,
  launcher: `import { execFileSync } from "node:child_process"; execFileSync("env", ["rf", "context", "show"]);`,
  "method-scope": `import { spawn } from "node:child_process"; class Host { launch() { spawn("rf", []); } } const run = function () { spawn("git", []); };`,
  "launcher-alias": `import { execFileSync } from "node:child_process"; const git = (...args: string[]) => execFileSync("git", ["-C", cwd, ...args]); git("-c", "alias.x=!rf graph explain", "x");`,
  "importer-inline-require": `import { spawn } from "node:child_process"; spawn("git", []); require("node:child_process").spawn("rf", ["context", "show", "--json"]);`,
  "importer-await-import": `import { spawn } from "node:child_process"; spawn("git", []); const { spawn: run } = await import("node:child_process"); run("rf", ["context", "show", "--json"]);`,
  "importer-import-then": `import { spawn } from "node:child_process"; spawn("git", []); import("node:child_process").then(cp => cp.execFileSync("rf", ["context", "show", "--json"]));`,
  "importer-create-require": `import { spawn } from "node:child_process"; import { createRequire } from "node:module"; spawn("git", []); createRequire(import.meta.url)("node:child_process").execFileSync("rf", ["context", "show", "--json"]);`,
  "importer-import-equals": `import { spawn } from "node:child_process"; import cp = require("node:child_process"); spawn("git", []); cp.spawn("rf", ["context", "show"]);`,
  "importer-explain-await": `import { execFileSync } from "node:child_process"; execFileSync("git", ["status"]); const { spawn: run } = await import("node:child_process"); const verb = "explain"; run("rf", ["graph", verb, target, "--json"]);`,
  "importer-explain-create-require": `import { spawn } from "node:child_process"; import { createRequire } from "node:module"; spawn("git", []); const verb = "explain"; createRequire(import.meta.url)("node:child_process").execFileSync("rf", ["graph", verb, target, "--json"]);`,
  "importer-require-binding": `import { spawn } from "node:child_process"; const { execFileSync } = require("node:child_process"); spawn("git", []); execFileSync("rf", ["context", "show"]);`,
  "importer-require-default": `import { spawn } from "node:child_process"; const { execFileSync = undefined } = require("node:child_process"); spawn("git", []); execFileSync?.("rf", ["context", "show"]);`,
  "importer-variable-specifier": `import { spawn } from "node:child_process"; const name = "node:child_process"; spawn("git", []); require(name).spawn("rf", []);`,
  "importer-concatenated": `import { spawn } from "node:child_process"; spawn("git", []); require("node:" + "child_process").spawn("rf", []);`,
  "importer-template-specifier": "import { spawn } from \"node:child_process\"; spawn(\"git\", []); require(`node:child_process`).spawn(\"rf\", []);",
  "importer-escaped-specifier": String.raw`import { spawn } from "node:child_process"; spawn("git", []); require("node:child\u005fprocess").spawn("rf", []);`,
  "importer-builtin-module": `import { spawn } from "node:child_process"; spawn("git", []); process.getBuiltinModule("node:child_process").spawn("rf", []);`,
  "importer-module-require": `import { spawn } from "node:child_process"; spawn("git", []); module.require("child_process").spawn("rf", []);`,
  "importer-type-position": `import { spawn } from "node:child_process"; type Launcher = typeof import("node:child_process"); spawn("git", []);`,
  "importer-direct-eval": `import { spawn } from "node:child_process"; spawn("git", []); eval("spawn('rf', ['graph', 'explain'])");`,
  "spelled-comment": "import { spawn } from \"node:child_process\";\n// a second child_process load would sit here\nspawn(\"git\", []);",
  "spelled-source": "import { spawn } from \"node:child_process\"; spawn(\"git\", []); export const WORKER = `const cp = require(\"node:child_process\"); cp.spawn(\"rf\", [\"context\", \"show\"]);`;",
  "spelled-escaped": String.raw`import { spawn } from "node:child_process"; spawn("git", []); export const WORKER = "const cp = require('node:child\u005fprocess'); cp.spawn('rf', ['context', 'show']);";`,
  "spelled-template": `import { spawn } from "node:child_process"; spawn("git", []); export const worker = (argv: string): string => \`const cp = require("node:child_process"); cp.spawn("rf", \${argv});\`;`,
};
/** W3's planted spellings of the leaf (each must be caught) and its near misses (none may be). */
const LEAF_CAUGHT: Readonly<Record<string, string>> = {
  argv: `spawn("rf", ["graph", "explain", target, "--json"]);`,
  spaced: `const line = "rf graph explain source:x --json";`,
  dotted: `const leaf = "graph.explain";`,
  colon: `const id = "rf:graph:explain";`,
  slashed: `const route = "/rf/graph/explain";`,
  "option-between": `const argv = ["--workspace", root, "graph", "--json", "explain", target];`,
  "value-option-between": `const argv = ["graph", "--color", "never", "explain"];`,
  template: `const line = \`rf graph \${flags} explain \${target}\`;`,
  "shell-quoted": `const line = "rf graph 'explain' source:x";`,
  escaped: String.raw`const line = "rf graph expl\\ain source:x";`,
  upper: `const LEAF = "GRAPH_EXPLAIN";`,
  kebab: `const verb = "graph-explain";`,
  camel: `const verb = "graphExplain";`,
};
const LEAF_QUIET: Readonly<Record<string, string>> = {
  show: `const argv = ["graph", "show", "--json"];`,
  "context-explain": `const argv = ["context", "explain", renderId];`,
  word: `const word = "explain";`,
  explainer: `const text = "the graph explainer";`,
  paragraph: `const text = "a paragraph explains it";`,
  subgraph: `const text = "the subgraph explain step";`,
  render: `const argv = ["--workspace", root, "context", "render", "--no-commit", "--no-input", "--json"];`,
  comment: "// rf graph explain is not consumed here\nconst value = 1;",
};
/** U1's planted PMO-05b names (each must be caught) and its near misses (none may be). */
const NAME_CAUGHT: Readonly<Record<string, string>> = {
  field: "const limit = result.path_limit;",
  flag: `const argv = ["graph", "explain", "--max-paths", "5"];`,
  "camel-field": "interface Projection { pathLimit: number }",
  "library-keyword": "const options = { max_paths: 5 };",
  "camel-flag": "const maxPaths = 5;",
  "kebab-field": `const option = "path-limit";`,
  "line-comment": "// the path_limit field is never read here\nconst value = 1;",
  "block-comment": "/* --max-paths stays unconsumed */ const value = 1;",
};
const NAME_QUIET: Readonly<Record<string, string>> = {
  socket: "export const DETACHED_SOCKET_PATH_LIMIT = 103;",
  applied: "const page = { truncated: true, limitApplied: 40 };",
  length: "const maxPathLength = 4096;",
};
/** U2's planted descriptor: an rf capability naming the leaf. */
const PLANTED_DESCRIPTOR: CapabilityDescriptor = {
  id: "reactivefiber.graph.explain",
  version: "1.0.0",
  description: "Explain one rf graph node",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  effectClass: "read",
  permissions: ["reactivefiber:render"],
  supportedModes: ["invoke"],
  contractSource: "rf@0.0.0:reactive-fiber.cli/v1 graph.explain",
};
/** U3's planted specifiers and specs: rf packages (each caught) and others (none caught). */
const PACKAGE_CAUGHT: readonly string[] = ["@reactive-fiber/sdk", "reactivefiber", "@reactivefiber/cli", "reactive_fiber_cli", "@rf/sdk", "rf", "@acme/reactive-fiber-tsx", "rf-sdk", "@acme/rf-tools"];
const PACKAGE_QUIET: readonly string[] = ["@furnace/sdk", "./providers/reactivefiber.js", "../workbench/providers/reactivefiber.js", "node:child_process", "@hyperunix/sdk", "typescript", "rfc-parser", "surf", "rfdc"];
const SPEC_CAUGHT: readonly string[] = ["npm:@reactive-fiber/sdk@1.0.0", "file:../ReactiveFiberCLI", "file:vendor/rf", "file:vendor/rf-sdk-0.1.0.tgz"];
const SPEC_QUIET: readonly string[] = ["^4.1.0", "file:vendor/furnace-sdk", "npm:surf@2.0.0", "npm:rfdc@1.4.1"];
/** U3's loader plants (each must read one load) and quiet loads (none may), module bodies read by packageLoads; a call whose
 * first argument names an rf package reads as a load whatever it does (id-lookup: fail-closed). */
const LOAD_CAUGHT: Readonly<Record<string, string>> = {
  "create-require-call": `import { createRequire as gateCreateRequire } from "node:module"; gateCreateRequire(import.meta.url)("@reactive-fiber/sdk");`,
  "create-require-bound": `import { createRequire } from "node:module"; const load = createRequire(import.meta.url); load("reactivefiber");`,
  "module-require": `module.require("@rf/sdk");`,
  "require-resolve": `require.resolve("@reactive-fiber/sdk");`,
  "meta-resolve": `import.meta.resolve("@reactivefiber/cli");`,
  "import-equals": `import sdk = require("@reactive-fiber/sdk");`,
  "inline-require": `require("rf-sdk").render();`,
  "id-lookup": `registry.get("reactivefiber.render.preview");`,
  parenthesized: `import { createRequire } from "node:module"; createRequire(import.meta.url)(("@reactive-fiber/sdk"));`,
  asserted: `import { createRequire } from "node:module"; createRequire(import.meta.url)("@reactive-fiber/sdk" as string);`,
  tagged: "import { createRequire } from \"node:module\"; const load = createRequire(import.meta.url); load`@reactive-fiber/sdk`;",
  "unresolved-launch": `const cp = await import("node:" + "child" + "_process"); cp.spawn("rf", ["context", "show"]);`,
};
const LOAD_QUIET: Readonly<Record<string, string>> = {
  "rf-binary": `import { spawn } from "node:child_process"; spawn("rf", ["context", "render", "--json"]);`,
  relative: `import { createRequire } from "node:module"; createRequire(import.meta.url)("./providers/reactivefiber.js");`,
  "other-package": `import { createRequire } from "node:module"; createRequire(import.meta.url)("@furnace/sdk");`,
};
/** U3's type-reference plants (each must read one reference, and none a load) and quiet ones (none may), module bodies read by
 * typeReferences: an import type's argument (N11's exact text first), a triple-slash types directive, an amd-dependency
 * directive, an ambient module declaration's name, and an import or export declaration nested in a module block. */
const TYPE_CAUGHT: Readonly<Record<string, string>> = {
  "import-type": `export type GateSdk = typeof import("@reactive-fiber/tsx");`,
  "import-type-member": `type Client = import("@rf/sdk").Client;`,
  "reference-types": `/// <reference types="@reactive-fiber/sdk" />\nexport {};`,
  "amd-dependency": `/// <amd-dependency path="rf-sdk" />\nexport {};`,
  "ambient-module": `declare module "@reactive-fiber/sdk" {\n  export const render: () => void;\n}`,
  "ambient-import": `declare module "pi-host" {\n  import type { Client } from "@reactive-fiber/sdk";\n  export const client: Client;\n}`,
  "ambient-export": `declare module "pi-host" {\n  export * from "@reactive-fiber/tsx";\n}`,
};
const TYPE_QUIET: Readonly<Record<string, string>> = {
  relative: `type Provider = typeof import("./providers/reactivefiber.js");`,
  builtin: `type Launcher = typeof import("node:child_process");`,
  "other-package": `/// <reference types="node" />\ndeclare module "@furnace/sdk" {\n  export const run: () => void;\n}`,
  global: `declare global {\n  interface PiRelease {\n    readonly rf: string;\n  }\n}\nexport {};`,
  namespace: `namespace rf {\n  export const release = "0.0.0";\n}`,
  comment: `/** @type {import("@reactive-fiber/sdk").Client} */\nexport const client = undefined;`,
};
/** U3's manifest plants, each merged over package.json's own fields: an rf package named or specified outside the four dependency
 * maps or by a vendored spec (each must read a hit), and fields that are no rf package (none may). */
const MANIFEST_CAUGHT: Readonly<Record<string, JsonObject>> = {
  overrides: { overrides: { "@reactive-fiber/sdk": "1.0.0" } },
  resolutions: { resolutions: { reactivefiber: "1.0.0" } },
  bundled: { bundledDependencies: ["@forge/sdk", "@rf/sdk"] },
  "pi-extension": { pi: { extensions: ["./src/index.ts", "@reactive-fiber/pi-extension"] } },
  script: { scripts: { explain: "npx @reactive-fiber/cli graph explain" } },
  "vendored-spec": { dependencies: { "@acme/graph": "file:vendor/rf-sdk-0.1.0.tgz" } },
};
const MANIFEST_QUIET: Readonly<Record<string, JsonObject>> = {
  keyword: { keywords: ["pi-package", "surf"] },
  script: { scripts: { "test:rfc": "vitest run test/rfc-parser.test.ts" } },
  "vendored-spec": { dependencies: { "@furnace/sdk": "file:vendor/furnace-sdk-0.1.0.tgz", rfdc: "^1.4.1" } },
};
/** Q1's composed spellings (R-COMPOSED): the leaf assembled at run time, also as an argv passed through an existing pinned site. */
const COMPOSED_PROBES: Readonly<Record<string, string>> = {
  variable: `const verb = "explain"; spawn("rf", ["graph", verb]);`,
  concatenated: `const leaf = "gr" + "aph explain";`,
  pushed: `const words = ["graph"]; words.push("explain");`,
  "through-site": `import { execFileSync } from "node:child_process"; const git = (...args: string[]) => execFileSync("git", ["-C", cwd, ...args]); const verb = "explain"; git("-c", \`alias.x=!rf graph \${verb}\`, "x");`,
};
/** Q3's out-of-src text (R-OUTSIDE-SRC): an operator's local provider module spawning the leaf. */
const LOCAL_PROVIDER = `import { spawn } from "node:child_process";
export function register(registry) {
  registry.register({ descriptor: { id: "local.graph", version: "1.0.0", description: "d", inputSchema: {}, effectClass: "read", permissions: [], supportedModes: ["invoke"] }, invoke: async () => spawn("rf", ["graph", "explain", "source:x", "--json"]) });
}`;
/** Q4's probe (R-COMMON-WORD): a page flag read under the excluded field's name. */
const COMMON_WORD_PROBE = "if (result.truncated) return { partial: true };";
/** Q5's launches where no src text spells child_process (R-UNSEEN-LAUNCHER): W3 reads the leaf in a literal argv one passes, not
 * inside evaluated source text. */
const UNSEEN_LAUNCHES: Readonly<Record<string, string>> = {
  "composed-specifier": `const cp = await import("node:" + "child" + "_process"); cp.spawn("rf", ["graph", "explain", target]);`,
  "composed-path": `const cp = await import("node:" + "child" + "_process"); cp.spawn("/usr/local/bin/rf", ["graph", "explain", target]);`,
  execve: `process.execve("/usr/local/bin/rf", ["rf", "graph", "explain", target], process.env);`,
  binding: `process.binding("spawn_sync").spawn({ file: "rf", args: ["rf", "graph", "explain"] });`,
  evaluated: `eval("require('node:child' + '_process').spawn('rf', ['graph', 'explain'])");`,
  cluster: `import cluster from "node:cluster"; cluster.fork();`,
  package: `import { execa } from "execa"; await execa("rf", ["graph", "explain", target]);`,
};
/** Q6's specifiers no U3 reader reads (R-UNREAD-SPECIFIER): an rf package reaching a loader other than as a call's first-argument
 * literal or an import-equals reference. */
const UNREAD_SPECIFIERS: Readonly<Record<string, string>> = {
  variable: `import { createRequire } from "node:module"; const spec = "@reactive-fiber/sdk"; createRequire(import.meta.url)(spec);`,
  array: `import { createRequire } from "node:module"; Reflect.apply(createRequire(import.meta.url), undefined, ["@reactive-fiber/sdk"]);`,
  composed: `import { createRequire } from "node:module"; createRequire(import.meta.url)("@reactive" + "-fiber/sdk");`,
  url: `await import(new URL("@reactive-fiber/sdk", import.meta.url).href);`,
  spread: `import { createRequire } from "node:module"; createRequire(import.meta.url)(...["@reactive-fiber/sdk"]);`,
  conditional: `import { createRequire } from "node:module"; createRequire(import.meta.url)(flag ? "@reactive-fiber/sdk" : "@furnace/sdk");`,
};
/** Q7's path specifiers (R-PATH-SPECIFIER): an rf package's files reached by a relative, absolute or file: URL path, which U3's
 * package predicate (packageOf reads bare specifiers only, so Pi's own relative reactivefiber module stays quiet) reads as
 * no package, in each U3 reader's position (a loader's first argument, a dynamic import, a path directive, an import type). */
const PATH_SPECIFIERS: Readonly<Record<string, string>> = {
  relative: `import { createRequire } from "node:module"; createRequire(import.meta.url)("../node_modules/@reactive-fiber/sdk/dist/index.js");`,
  absolute: `await import("/opt/reactive-fiber/sdk/index.js");`,
  "file-url": `await import("file:///opt/reactive-fiber/sdk/index.js");`,
  "reference-path": `/// <reference path="../node_modules/@reactive-fiber/sdk/index.d.ts" />\nexport {};`,
  "import-type-path": `type Client = typeof import("../node_modules/@rf/sdk/index.js");`,
};
/** The same paths as the predicate reads them (a static import of one, which sourceStructure reads, is filtered by it). */
const PATH_NAMES: readonly string[] = [
  "../node_modules/@reactive-fiber/sdk/dist/index.js",
  "/opt/reactive-fiber/sdk/index.js",
  "file:///opt/reactive-fiber/sdk/index.js",
  "../node_modules/@reactive-fiber/sdk/index.d.ts",
  "../node_modules/@rf/sdk/index.js",
];
/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-COMPOSED": ["Q1"],
  "R-SAME-RELEASE-REBUILD": ["Q2"],
  "R-OUTSIDE-SRC": ["Q3"],
  "R-COMMON-WORD": ["Q4"],
  "R-UNSEEN-LAUNCHER": ["Q5"],
  "R-UNREAD-SPECIFIER": ["Q6"],
  "R-PATH-SPECIFIER": ["Q7"],
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for G, W and U, to the bead's STATEMENT. */
const ROWS: readonly Row[] = [
  {
    id: "G",
    label:
      "Gating artifact: RFCLI PMO-05a/PMO-05b (program packets rfc-20qgk.8/rfc-20qgk.9, PMO/BEADS-2026-10-16.md:61,:296-297@8a8b83e4d) shipping rf graph explain --max-paths with truncated/path_limit fields (absent from graph.explain.schema.json:375-383@8a8b83e4d)",
    pins: ["G1", "G2", "G3"],
  },
  { id: "W", label: "conjoined with a Pi W10 slice that actually invokes graph explain", pins: ["W1", "W2", "W3"] },
  { id: "U", label: "until the artifact exists, no Pi change", pins: ["U1", "U2", "U3"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
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
/** One captured explain run over the scratch workspace (bounded.flagged or bounded.unflagged). */
interface ExplainRun {
  readonly argv: readonly string[];
  readonly exit: number;
  readonly ok: boolean;
  readonly command: string;
  readonly keys: readonly string[];
  readonly truncated: JsonValue;
  readonly pathLimit: JsonValue;
}
interface Capture {
  readonly release: string;
  readonly commit: string;
  readonly mismatch: boolean;
  readonly leaf: { readonly path: string; readonly served: boolean; readonly availability: string };
  readonly usage: string;
  readonly schema: { readonly bytes: number; readonly sha256: string };
  readonly members: readonly string[];
  readonly required: readonly string[];
  readonly probe: {
    readonly argv: readonly string[];
    readonly exit: number;
    readonly ok: boolean;
    readonly command: string;
    readonly codes: readonly string[];
    readonly unknown: readonly string[];
  };
  readonly bounded: { readonly flagged: ExplainRun; readonly unflagged: ExplainRun };
  readonly pin: { readonly rfcli: string; readonly lines: readonly number[]; readonly members: readonly string[]; readonly required: readonly string[] };
  readonly shipped: { readonly commit: string; readonly subject: string; readonly inBuild: boolean; readonly prior: string; readonly inPrior: boolean };
}
interface Roster {
  readonly capture: Capture;
  readonly filing: JsonValue;
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
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`${field} must be a string`);
  return value;
}
function object(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return value;
}
function integer(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value)) throw new Error(`${field} must be an integer`);
  return value;
}
function truth(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") throw new Error(`${field} must be a boolean`);
  return value;
}

function readExplainRun(raw: unknown, field: string): ExplainRun {
  const run = object(raw, field);
  if (!Object.hasOwn(run, "truncated") || !Object.hasOwn(run, "path_limit")) throw new Error(`${field} must record truncated and path_limit`);
  return {
    argv: strings(run.argv, `${field}.argv`),
    exit: integer(run.exit, `${field}.exit`),
    ok: truth(run.ok, `${field}.ok`),
    command: text(run.command, `${field}.command`),
    keys: strings(run.keys, `${field}.keys`),
    truncated: json(run.truncated),
    pathLimit: json(run.path_limit),
  };
}
/** The capture as the capture script wrote it, every field refused by name when it has the wrong shape. */
function readCapture(raw: unknown): Capture {
  const capture = object(raw, "roster capture");
  const leaf = object(capture.leaf, "capture leaf");
  const schema = object(capture.schema, "capture schema");
  const probe = object(capture.probe, "capture probe");
  const envelope = object(probe.envelope, "capture probe envelope");
  const diagnostics = (Array.isArray(envelope.diagnostics) ? envelope.diagnostics : []).map((row: unknown, at: number) => object(row, `capture probe diagnostics[${at}]`));
  const bounded = object(capture.bounded, "capture bounded");
  const pin = object(capture.pin, "capture pin");
  const lines = Array.isArray(pin.lines) && pin.lines.every(line => Number.isInteger(line)) ? (pin.lines as number[]) : [];
  const shipped = object(capture.shipped, "capture shipped");
  return {
    release: text(capture.release, "capture release"),
    commit: text(capture.commit, "capture commit"),
    mismatch: truth(capture.mismatch, "capture mismatch"),
    leaf: { path: text(leaf.path, "capture leaf.path"), served: truth(leaf.served, "capture leaf.served"), availability: text(leaf.availability, "capture leaf.availability") },
    usage: text(object(capture.usage, "capture usage").line, "capture usage.line"),
    schema: { bytes: integer(schema.bytes, "capture schema.bytes"), sha256: text(schema.sha256, "capture schema.sha256") },
    members: strings(schema.members, "capture schema.members"),
    required: strings(schema.required, "capture schema.required"),
    probe: {
      argv: strings(probe.argv, "capture probe.argv"),
      exit: integer(probe.exit, "capture probe.exit"),
      ok: truth(envelope.ok, "capture probe.envelope.ok"),
      command: text(envelope.command, "capture probe.envelope.command"),
      codes: diagnostics.map((row, at) => text(row.code, `capture probe diagnostics[${at}].code`)),
      unknown: diagnostics
        .filter(row => row.code === "RF_USAGE_UNKNOWN_OPTION")
        .flatMap((row, at) => strings(object(row.metadata, `capture probe unknown-option diagnostic ${at} metadata`).options, "capture probe metadata.options")),
    },
    bounded: { flagged: readExplainRun(bounded.flagged, "capture bounded.flagged"), unflagged: readExplainRun(bounded.unflagged, "capture bounded.unflagged") },
    pin: {
      rfcli: text(pin.rfcli, "capture pin.rfcli"),
      lines,
      members: strings(pin.members, "capture pin.members"),
      required: strings(pin.required, "capture pin.required"),
    },
    shipped: {
      commit: text(shipped.commit, "capture shipped.commit"),
      subject: text(shipped.subject, "capture shipped.subject"),
      inBuild: truth(shipped.inBuild, "capture shipped.inBuild"),
      prior: text(shipped.prior, "capture shipped.prior"),
      inPrior: truth(shipped.inPrior, "capture shipped.inPrior"),
    },
  };
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || raw.bead !== BEAD || !isObject(raw.constants) || !isObject(raw.filing) || !Array.isArray(raw.rows)) {
    throw new Error(`roster must be an object for ${BEAD} with constants, filing and rows`);
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
  return {
    capture: readCapture(raw.capture),
    filing: json(raw.filing),
    constants: json(raw.constants) as JsonObject,
    tests: strings(raw.tests, "roster tests"),
    rows,
  };
}

const ROSTER = readRoster();
const CAPTURE = ROSTER.capture;
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

// ---- the readers ----

function parse(fileName: string, source: string): ts.SourceFile {
  return ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
/** What lstat reads an entry as (a symlink is never followed): a directory, a regular file, a symlink whatever its name or
 * target, or another type (a FIFO, a socket, a device). */
type EntryKind = "directory" | "file" | "symlink" | "other";
function entryKind(stat: Pick<Stats, "isDirectory" | "isFile" | "isSymbolicLink">): EntryKind {
  if (stat.isSymbolicLink()) return "symlink";
  if (stat.isDirectory()) return "directory";
  return stat.isFile() ? "file" : "other";
}
/** How the walk takes one entry: it descends a directory; a regular file whose name ends .ts is a walked module, which every
 * reader reads; every other entry (a regular file of any other name, a symlink whatever its name or target, any other type)
 * is unwalked: listed, never read. */
function entryReading(name: string, kind: EntryKind): "descend" | "module" | "unwalked" {
  if (kind === "directory") return "descend";
  return kind === "file" && name.endsWith(".ts") ? "module" : "unwalked";
}
interface Entry {
  readonly path: string;
  readonly kind: EntryKind;
  readonly walked: boolean;
}
/** Every entry below top, by lstat: each directory descended (never listed, never reached through a symlink), every other
 * entry listed with its kind and whether it is a walked module, by path relative to root with "/" separators, sorted. */
function walkEntries(root: string, top: string): Entry[] {
  const found: Entry[] = [];
  const visit = (directory: string): void => {
    for (const name of readdirSync(directory)) {
      const path = join(directory, name);
      const kind = entryKind(lstatSync(path));
      const reading = entryReading(name, kind);
      if (reading === "descend") visit(path);
      else found.push({ path: relative(root, path).split("\\").join("/"), kind, walked: reading === "module" });
    }
  };
  visit(top);
  return found.sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0));
}
/** A walk's reading: its walked modules, and every unwalked entry as `${path}|${kind}`. */
function entryListing(entries: readonly Entry[]): { readonly modules: string[]; readonly unwalked: string[] } {
  return { modules: entries.filter(entry => entry.walked).map(entry => entry.path), unwalked: entries.filter(entry => !entry.walked).map(entry => `${entry.path}|${entry.kind}`) };
}
/** Every entry under src, by repository-relative path. */
function srcEntries(): Entry[] {
  return walkEntries(REPO, join(REPO, "src"));
}
/** W1's entry controls: ENTRY_PLANTS made in one scratch directory and read by the same walk and listing as src. */
function entryControls(): JsonValue {
  const root = makeScratch("wb-2j3.10-entries-");
  try {
    for (const plant of ENTRY_PLANTS) {
      const path = join(root, plant.path);
      mkdirSync(plant.kind === "directory" ? path : dirname(path), { recursive: true });
      if (plant.kind === "symlink") symlinkSync(plant.target, path);
      else if (plant.kind === "file") writeFileSync(path, "export const planted = 1;\n");
    }
    return json(entryListing(walkEntries(root, root)));
  } finally {
    removeScratch(root);
  }
}
interface Module {
  readonly name: string;
  readonly source: string;
}
/** Every walked module under src (a regular file whose name ends .ts, never a symlink), by repository-relative path. */
function srcModules(): Module[] {
  return srcEntries()
    .filter(entry => entry.walked)
    .map(entry => ({ name: entry.path, source: readFileSync(join(REPO, entry.path), "utf8") }));
}

/** The leaf's spelling family: its words in any case, joined directly or by any run of white space, ".", "_", ":", "/" or "-". */
const LEAF_PATTERN = new RegExp(`(?<![A-Za-z0-9])${LEAF.split(".").join("[\\s._:/-]*")}(?![A-Za-z0-9])`, "i");
/** A token run as rf's group parsers read it: every option, the value a value option consumes and every EXPR elided. */
function optionElided(tokens: readonly string[]): string {
  const kept: string[] = [];
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index] ?? "";
    if (RF_VALUE_OPTIONS.includes(token)) index += 1;
    else if (token !== "" && !token.startsWith("-") && token !== EXPR) kept.push(token);
  }
  return kept.join(" ");
}
/** A shell line with its quoting removed: a backslash escape keeps its character, then every ' and " is dropped. */
function shellUnquoted(line: string): string {
  return line.replace(/\\(.)/gs, "$1").replace(/['"]/g, "");
}
function arrayWords(node: ts.ArrayLiteralExpression): string[] {
  return node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : EXPR));
}
/** Every string, template and array literal of one module that spells the leaf, as `${form}:${line}`. */
function leafHits(fileName: string, source: string): string[] {
  const file = parse(fileName, source);
  const hits: string[] = [];
  const judge = (form: string, node: ts.Node, readings: readonly string[]): void => {
    if (readings.some(reading => LEAF_PATTERN.test(reading))) hits.push(`${form}:${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1}`);
  };
  const line = (spelled: string): string[] => {
    const unquoted = shellUnquoted(spelled);
    return [spelled, optionElided(spelled.split(/\s+/)), unquoted, optionElided(unquoted.split(/\s+/))];
  };
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) judge("literal", node, line(node.text));
    else if (ts.isTemplateExpression(node)) judge("template", node, line([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(` ${EXPR} `)));
    else if (ts.isArrayLiteralExpression(node)) {
      const words = arrayWords(node);
      judge("argv", node, [words.join(" "), optionElided(words)]);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return hits;
}

/** none: the first argument is a binary; shell: a command line; unknown: an options argument the reader cannot read. */
type Shell = "none" | "shell" | "unknown";
interface SpawnSite {
  readonly kind: "rf" | "literal" | "opaque";
  readonly scope: string;
  readonly callee: string;
  readonly binary: string;
  readonly shell: Shell;
  readonly call: ts.CallExpression;
}
/** One child_process module-name literal (a string or template literal whose value is child_process or node:child_process). */
interface SpawnLoad {
  readonly scope: string;
  /** Its reading (loadForm): import, type, side-effect or re-export, require (a bound require declaration), else unbound:<carrier>. */
  readonly form: string;
}
interface SpawnScan {
  /** The module binds node:child_process (a non-type import with bindings, a bound require declaration or a non-type re-export). */
  readonly imports: boolean;
  /** Every child_process module-name literal, per occurrence, whether or not the module also binds child_process. */
  readonly loads: readonly SpawnLoad[];
  /** Every spelling of child_process outside a module-name literal, as `${scope}:${holder}` (holderOf). */
  readonly unread: readonly string[];
  readonly sites: readonly SpawnSite[];
  /** Every value reference to a binding that is no call site, as `${scope}:${binding}:${form}`. */
  readonly escapes: readonly string[];
}
/** The name of the function a node stands in (a declaration, a method or a function bound to a const), else <module>. */
function scopeOf(node: ts.Node): string {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if ((ts.isFunctionDeclaration(at) || ts.isMethodDeclaration(at)) && at.name !== undefined) return at.name.getText();
    if ((ts.isArrowFunction(at) || ts.isFunctionExpression(at)) && ts.isVariableDeclaration(at.parent) && ts.isIdentifier(at.parent.name)) return at.parent.name.text;
  }
  return "<module>";
}
function requiresChildProcess(node: ts.Expression | undefined): boolean {
  if (node === undefined || !ts.isCallExpression(node) || !ts.isIdentifier(node.expression) || node.expression.text !== "require") return false;
  const first = node.arguments[0];
  return first !== undefined && ts.isStringLiteralLike(first) && CHILD_PROCESS_MODULE.test(first.text);
}
/** The declaration a require call binds: the call is a variable's whole initializer and its name an identifier or an object
 * pattern of plain elements; else undefined, and the require is unbound. */
function boundRequire(call: ts.CallExpression): ts.VariableDeclaration | undefined {
  const declaration = call.parent;
  if (!ts.isVariableDeclaration(declaration) || declaration.initializer !== call) return undefined;
  const name = declaration.name;
  return ts.isIdentifier(name) || (ts.isObjectBindingPattern(name) && name.elements.every(plainElement)) ? declaration : undefined;
}
/** How one child_process module-name literal is read, whether or not its module also binds child_process: import, type,
 * side-effect or re-export (a declaration's module specifier; type also for an import type's argument), require (a bound
 * require declaration), else unbound and its carrier: require (any other require call, such as an inline require), import (a
 * dynamic import, awaited, destructured or chained), call (the first argument of any other call, such as
 * createRequire(...)(...), module.require or process.getBuiltinModule), import-equals, or value (anywhere else: a variable
 * specifier, a concatenation operand, an argument after the first, a property). */
function loadForm(literal: ts.StringLiteralLike): string {
  const parent = literal.parent;
  if (ts.isImportDeclaration(parent)) return parent.importClause === undefined ? "side-effect" : parent.importClause.isTypeOnly ? "type" : "import";
  if (ts.isExportDeclaration(parent)) return parent.isTypeOnly ? "type" : "re-export";
  if (ts.isLiteralTypeNode(parent) && ts.isImportTypeNode(parent.parent)) return "type";
  if (ts.isExternalModuleReference(parent)) return "unbound:import-equals";
  if (ts.isCallExpression(parent) && parent.arguments[0] === literal) {
    if (ts.isIdentifier(parent.expression) && parent.expression.text === "require") return boundRequire(parent) === undefined ? "unbound:require" : "require";
    return parent.expression.kind === ts.SyntaxKind.ImportKeyword ? "unbound:import" : "unbound:call";
  }
  return "unbound:value";
}
/** Where a spelling of child_process outside a module-name literal sits: a string, template or regular-expression literal, an
 * identifier, else a comment (trivia), as `${scope}:${holder}`; a string or template piece whose cooked text spells it while its
 * raw text does not (an escape sequence) reads `${scope}:escaped`. */
function holderOf(file: ts.SourceFile, position: number): string {
  let holder = "comment";
  let deepest: ts.Node = file;
  const visit = (node: ts.Node): void => {
    if (position < node.getStart(file) || position >= node.getEnd()) return;
    deepest = node;
    if (ts.isStringLiteralLike(node)) holder = "string";
    else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) holder = "template";
    else if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) holder = "identifier";
    else if (ts.isRegularExpressionLiteral(node)) holder = "regex";
    ts.forEachChild(node, visit);
  };
  visit(file);
  return `${scopeOf(deepest)}:${holder}`;
}
/** The basename of a binary path, without a Windows launcher extension, lower-cased. */
function binaryName(binary: string): string {
  return (binary.split(/[\\/]/).pop() ?? "").toLowerCase().replace(/\.(?:exe|cmd)$/, "");
}
/** A shell line's command word: its first word after any leading NAME=value assignments, shell-unquoted. */
function commandWord(line: string): string {
  return shellUnquoted(line.trim().split(/\s+/).find(word => !ASSIGNMENT_WORD.test(word)) ?? "");
}
/** One options property's reading of shell: none for another key or a false or empty value, shell for true or a path. */
function shellProperty(property: ts.ObjectLiteralElementLike): Shell {
  if (ts.isSpreadAssignment(property)) return "unknown";
  const name = property.name;
  if (ts.isComputedPropertyName(name)) return "unknown";
  const key = ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name) ? name.text : "<key>";
  if (key !== "shell") return "none";
  if (!ts.isPropertyAssignment(property)) return "unknown";
  const value = property.initializer;
  if (value.kind === ts.SyntaxKind.FalseKeyword || (ts.isStringLiteralLike(value) && value.text === "")) return "none";
  if (value.kind === ts.SyntaxKind.TrueKeyword || ts.isStringLiteralLike(value)) return "shell";
  return "unknown";
}
/** Whether a call's first argument is a shell command line: always for exec and execSync, never for fork, and for the others
 * when an options literal sets shell; unknown when a spread or a non-literal argument could be the options. */
function shellOf(call: ts.CallExpression, callee: string): Shell {
  if (SHELL_CALLS.includes(callee)) return "shell";
  if (!SHELL_OPTION_CALLS.includes(callee)) return "none";
  const rest = call.arguments.slice(1);
  let shell: Shell = "none";
  for (const [index, argument] of rest.entries()) {
    if (ts.isSpreadElement(argument)) return "unknown";
    if (ts.isObjectLiteralExpression(argument)) {
      for (const property of argument.properties) {
        const read = shellProperty(property);
        if (read === "unknown") return "unknown";
        if (read === "shell") shell = "shell";
      }
    } else if (
      !ts.isArrayLiteralExpression(argument) &&
      !ts.isArrowFunction(argument) &&
      !ts.isFunctionExpression(argument) &&
      !rest.slice(index + 1).some(later => ts.isObjectLiteralExpression(later))
    ) {
      return "unknown";
    }
  }
  return shell;
}
function isConst(declaration: ts.VariableDeclaration): boolean {
  return ts.isVariableDeclarationList(declaration.parent) && (declaration.parent.flags & ts.NodeFlags.Const) !== 0;
}
function isExported(declaration: ts.VariableDeclaration): boolean {
  const statement = declaration.parent.parent;
  return ts.isVariableStatement(statement) && (statement.modifiers ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
}
/** Whether an identifier reads a value: never a declared name, a property or label name, or a type position. */
function isValueReference(id: ts.Identifier): boolean {
  const parent = id.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.expression === id;
  if (ts.isShorthandPropertyAssignment(parent)) return parent.name === id;
  if (ts.isExportSpecifier(parent)) return parent.parent.parent.moduleSpecifier === undefined && (parent.propertyName ?? parent.name) === id;
  if (ts.isQualifiedName(parent) || ts.isTypeReferenceNode(parent) || ts.isTypeQueryNode(parent)) return false;
  const named = parent as { readonly name?: unknown; readonly propertyName?: unknown; readonly label?: unknown };
  return named.name !== id && named.propertyName !== id && named.label !== id;
}
/** The form of a reference that is no call site. */
function escapeForm(id: ts.Identifier): string {
  const parent = id.parent;
  if (ts.isVariableDeclaration(parent)) return !isConst(parent) ? "mutable-alias" : isExported(parent) ? "exported-alias" : "alias";
  if (ts.isCallExpression(parent) || ts.isNewExpression(parent)) return parent.expression === id ? "call" : "argument";
  if (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) return "member";
  if (ts.isPropertyAssignment(parent) || ts.isShorthandPropertyAssignment(parent)) return "property";
  if (ts.isExportSpecifier(parent) || ts.isExportAssignment(parent)) return "export";
  if (ts.isBinaryExpression(parent)) return "assignment";
  return "other";
}
/** A destructuring element the alias reader resolves: a plain local, optionally renamed, with no default and no rest. */
function plainElement(element: ts.BindingElement): boolean {
  const key = element.propertyName;
  return element.dotDotDotToken === undefined && element.initializer === undefined && ts.isIdentifier(element.name) && (key === undefined || ts.isIdentifier(key) || ts.isStringLiteral(key));
}
function elementKey(element: ts.BindingElement): string {
  const key = element.propertyName ?? element.name;
  return ts.isIdentifier(key) || ts.isStringLiteral(key) ? key.text : "<computed>";
}
/** One module's child-process bindings (static imports, bound require declarations and const aliases of them, resolved to a
 * fixpoint; a type-only import binds nothing) and every value reference to them: a call site (its callee, its binary read as rf,
 * another literal or opaque, and its shell reading) or an escape; every child_process module-name literal, per occurrence
 * (loadForm); and every spelling of child_process outside one (holderOf). */
function scanSpawns(fileName: string, source: string): SpawnScan {
  const file = parse(fileName, source);
  const named = new Map<string, string>();
  const spaces = new Set<string>();
  const consumed = new Set<ts.Node>();
  const escapes: string[] = [];
  const loads: SpawnLoad[] = [];
  const literals: ts.StringLiteralLike[] = [];
  let imports = false;
  const bindRequire = (declaration: ts.VariableDeclaration): void => {
    const initializer = declaration.initializer;
    if (!requiresChildProcess(initializer) || initializer === undefined || !ts.isCallExpression(initializer) || boundRequire(initializer) !== declaration) return;
    imports = true;
    if (ts.isIdentifier(declaration.name)) spaces.add(declaration.name.text);
    else if (ts.isObjectBindingPattern(declaration.name)) {
      for (const element of declaration.name.elements) if (ts.isIdentifier(element.name)) named.set(element.name.text, elementKey(element));
    }
  };
  const bind = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node) && CHILD_PROCESS_MODULE.test(node.text)) {
      literals.push(node);
      loads.push({ scope: scopeOf(node), form: loadForm(node) });
    }
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && CHILD_PROCESS_MODULE.test(node.moduleSpecifier.text)) {
      const clause = node.importClause;
      if (clause !== undefined && !clause.isTypeOnly) {
        if (clause.name !== undefined) spaces.add(clause.name.text);
        const bindings = clause.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) spaces.add(bindings.name.text);
        if (bindings !== undefined && ts.isNamedImports(bindings)) {
          for (const element of bindings.elements) if (!element.isTypeOnly) named.set(element.name.text, (element.propertyName ?? element.name).text);
        }
        imports ||= clause.name !== undefined || bindings !== undefined;
      }
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier) && CHILD_PROCESS_MODULE.test(node.moduleSpecifier.text)) {
      if (!node.isTypeOnly) {
        imports = true;
        const clause = node.exportClause;
        const names = clause !== undefined && ts.isNamedExports(clause) ? clause.elements.map(element => (element.propertyName ?? element.name).text) : ["*"];
        escapes.push(`${scopeOf(node)}:${names.join("+")}:re-export`);
      }
    } else if (ts.isVariableDeclaration(node)) bindRequire(node);
    ts.forEachChild(node, bind);
  };
  bind(file);
  const unread: string[] = [];
  for (let at = source.indexOf(SPELLING); at !== -1; at = source.indexOf(SPELLING, at + SPELLING.length)) {
    if (!literals.some(literal => at >= literal.getStart(file) && at < literal.getEnd())) unread.push(holderOf(file, at));
  }
  const moduleNames = new Set<ts.Node>(literals);
  const escapedSpelling = (node: ts.Node): void => {
    const cooked = ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) ? node.text : undefined;
    if (cooked !== undefined && !moduleNames.has(node) && cooked.includes(SPELLING) && !node.getText(file).includes(SPELLING)) unread.push(`${scopeOf(node)}:escaped`);
    ts.forEachChild(node, escapedSpelling);
  };
  escapedSpelling(file);
  const memberOf = (expression: ts.Node): string | undefined => {
    if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression) && spaces.has(expression.expression.text)) return expression.name.text;
    if (ts.isElementAccessExpression(expression) && ts.isIdentifier(expression.expression) && spaces.has(expression.expression.text) && ts.isStringLiteralLike(expression.argumentExpression)) {
      return expression.argumentExpression.text;
    }
    return undefined;
  };
  const aliases = new Set<ts.VariableDeclaration>();
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && isConst(node) && !isExported(node) && node.initializer !== undefined) aliases.add(node);
    ts.forEachChild(node, collect);
  };
  collect(file);
  const resolveAlias = (declaration: ts.VariableDeclaration): boolean => {
    const initializer = declaration.initializer;
    const name = declaration.name;
    if (initializer === undefined) return false;
    if (ts.isIdentifier(initializer) && ts.isIdentifier(name) && named.has(initializer.text)) {
      named.set(name.text, named.get(initializer.text) ?? "");
      consumed.add(initializer);
      return true;
    }
    if (ts.isIdentifier(initializer) && spaces.has(initializer.text)) {
      if (ts.isIdentifier(name)) spaces.add(name.text);
      else if (ts.isObjectBindingPattern(name) && name.elements.every(plainElement)) {
        for (const element of name.elements) if (ts.isIdentifier(element.name)) named.set(element.name.text, elementKey(element));
      } else return false;
      consumed.add(initializer);
      return true;
    }
    const member = memberOf(initializer);
    if (member !== undefined && ts.isIdentifier(name) && (ts.isPropertyAccessExpression(initializer) || ts.isElementAccessExpression(initializer))) {
      named.set(name.text, member);
      consumed.add(initializer.expression);
      return true;
    }
    return false;
  };
  for (let grew = true; grew; ) {
    grew = false;
    for (const declaration of aliases) {
      if (!resolveAlias(declaration)) continue;
      aliases.delete(declaration);
      grew = true;
    }
  }
  const sites: SpawnSite[] = [];
  const site = (call: ts.CallExpression, callee: string): SpawnSite => {
    const scope = scopeOf(call);
    const first = call.arguments[0];
    const shell = shellOf(call, callee);
    if (first === undefined || !ts.isStringLiteralLike(first)) return { kind: "opaque", scope, callee, binary: first === undefined ? "<none>" : first.getText(file), shell, call };
    const command = commandWord(first.text);
    const kindOf = (binary: string): "rf" | "literal" => (binaryName(binary) === "rf" ? "rf" : "literal");
    if (shell === "shell") return { kind: kindOf(command), scope, callee, binary: command, shell, call };
    if (shell === "unknown" && binaryName(first.text) !== binaryName(command)) return { kind: "opaque", scope, callee, binary: first.text, shell, call };
    return { kind: kindOf(first.text), scope, callee, binary: first.text, shell, call };
  };
  const classify = (id: ts.Identifier): void => {
    const parent = id.parent;
    const callee = named.get(id.text);
    if (callee !== undefined && ts.isCallExpression(parent) && parent.expression === id && CHILD_PROCESS_CALLS.includes(callee)) {
      sites.push(site(parent, callee));
      return;
    }
    if (spaces.has(id.text) && (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === id) {
      const member = memberOf(parent);
      const call = parent.parent;
      if (member !== undefined && ts.isCallExpression(call) && call.expression === parent && CHILD_PROCESS_CALLS.includes(member)) {
        sites.push(site(call, member));
        return;
      }
    }
    escapes.push(`${scopeOf(id)}:${id.text}:${escapeForm(id)}`);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && (named.has(node.text) || spaces.has(node.text)) && !consumed.has(node) && isValueReference(node)) classify(node);
    if (imports && ts.isCallExpression(node) && directEval(node)) escapes.push(`${scopeOf(node)}:eval:direct-eval`);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { imports, loads, unread, sites, escapes };
}
/** A call of eval itself (through parentheses too): its source text runs in the module's own scope and so reaches every binding. */
function directEval(call: ts.CallExpression): boolean {
  let callee: ts.Expression = call.expression;
  while (ts.isParenthesizedExpression(callee)) callee = callee.expression;
  return ts.isIdentifier(callee) && callee.text === "eval";
}
/** A control's reading: binding|sites|escapes|loads (every module-name literal, per occurrence)|unread spellings. */
function scanReading(scan: SpawnScan): string {
  const sites = scan.sites.map(site => `${site.kind}:${site.scope}:${site.callee}:${site.binary}:${site.shell}`).join(",");
  const loads = scan.loads.map(load => `${load.scope}:${load.form}`).join(",");
  return `${scan.imports ? "imports" : "no-import"}|${sites}|${scan.escapes.join(",")}|${loads}|${scan.unread.join(",")}`;
}
/** The modules the shared reader (sourceStructure, test/helpers/census.ts) reads as loading node:child_process. */
function sharedImporters(modules: readonly Module[]): string[] {
  return modules
    .filter(module => sourceStructure(REPO, module.name).imports.some(entry => !entry.typeOnly && CHILD_PROCESS_MODULE.test(entry.module)))
    .map(module => module.name);
}

/** The case-sensitive needles of U1: the filing's flag and each non-excluded field, in their snake, kebab and camel spellings. */
function spellings(name: string): string[] {
  const words = name.replace(/^-+/, "").split(/[-_]/);
  const camel = words.map((word, index) => (index === 0 ? word : `${word.charAt(0).toUpperCase()}${word.slice(1)}`)).join("");
  return [...new Set([name, words.join("_"), words.join("-"), camel])];
}
const NEEDLES: readonly string[] = [FLAG, ...FIELDS.filter(field => !EXCLUDED_FIELDS.includes(field))].flatMap(spellings);
function nameHits(source: string): string[] {
  return NEEDLES.filter(needle => source.includes(needle));
}

/** The package a bare module specifier loads, or undefined for a relative, absolute or node: specifier. */
function packageOf(specifier: string): string | undefined {
  if (specifier.startsWith(".") || specifier.startsWith("/") || specifier.startsWith("node:")) return undefined;
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}
function rfSegment(segment: string): boolean {
  return RF_SEGMENT.test(segment);
}
function rfPackage(specifier: string): boolean {
  const name = packageOf(specifier)?.toLowerCase();
  if (name === undefined) return false;
  return RF_PACKAGE_WORDS.some(word => name.includes(word)) || name.replace(/^@/, "").split("/").some(rfSegment);
}
function rfSpec(spec: string): boolean {
  const lower = spec.toLowerCase();
  return RF_PACKAGE_WORDS.some(word => lower.includes(word)) || lower.split(/[/:@\\]/).some(rfSegment);
}
/** An expression read through its parentheses, type assertions (as, angle-bracket, satisfies) and non-null assertions. */
function unwrapped(expression: ts.Expression): ts.Expression {
  let at = expression;
  while (ts.isParenthesizedExpression(at) || ts.isAsExpression(at) || ts.isTypeAssertionExpression(at) || ts.isSatisfiesExpression(at) || ts.isNonNullExpression(at)) at = at.expression;
  return at;
}
/** U3's loader reading of one module: every string literal that is the first argument of a call (read through parentheses and type
 * assertions), whatever the callee (require, import(), a call of a call such as createRequire(import.meta.url)(...),
 * module.require, require.resolve, a loader under any name), a tagged template's literal, or an import-equals declaration's module
 * reference, and names an rf package, except a child-process call site's binary (W1 reads it), as `${scope}:${carrier}:${specifier}`
 * (carrier require, import, call, tagged or import-equals). */
function packageLoads(fileName: string, source: string): string[] {
  const file = parse(fileName, source);
  const binaries = new Set(scanSpawns(fileName, source).sites.map(site => site.call.arguments[0]?.getStart()));
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const first = node.arguments[0] === undefined ? undefined : unwrapped(node.arguments[0]);
      if (first !== undefined && ts.isStringLiteralLike(first) && rfPackage(first.text) && !binaries.has(first.getStart(file))) {
        const callee = node.expression;
        const carrier = callee.kind === ts.SyntaxKind.ImportKeyword ? "import" : ts.isIdentifier(callee) && callee.text === "require" ? "require" : "call";
        found.push(`${scopeOf(node)}:${carrier}:${first.text}`);
      }
    }
    if (ts.isTaggedTemplateExpression(node) && ts.isNoSubstitutionTemplateLiteral(node.template) && rfPackage(node.template.text)) {
      found.push(`${scopeOf(node)}:tagged:${node.template.text}`);
    }
    if (ts.isExternalModuleReference(node) && ts.isStringLiteralLike(node.expression) && rfPackage(node.expression.text)) {
      found.push(`${scopeOf(node)}:import-equals:${node.expression.text}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}
/** U3's type-reference reading of one module: every place a type position names an rf package by a bare specifier, read as a
 * type reference and never as a runtime load: an import type's argument (typeof import("x"), import("x").T), a triple-slash
 * types or path directive or an amd-dependency directive, an ambient module declaration's name, and the module specifier of an
 * import or export declaration nested in a module block (a module's top-level ones are sourceStructure's), as
 * `${scope}:${form}:${specifier}`. */
function typeReferences(fileName: string, source: string): string[] {
  const file = parse(fileName, source);
  const directives: (readonly [string, string])[] = [
    ...file.typeReferenceDirectives.map(reference => ["reference-types", reference.fileName] as const),
    ...file.referencedFiles.map(reference => ["reference-path", reference.fileName] as const),
    ...file.amdDependencies.map(dependency => ["amd-dependency", dependency.path] as const),
  ];
  const found = directives.filter(([, specifier]) => rfPackage(specifier)).map(([form, specifier]) => `<module>:${form}:${specifier}`);
  const visit = (node: ts.Node): void => {
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteralLike(node.argument.literal) && rfPackage(node.argument.literal.text)) {
      found.push(`${scopeOf(node)}:import-type:${node.argument.literal.text}`);
    }
    if (ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name) && rfPackage(node.name.text)) found.push(`${scopeOf(node)}:ambient-module:${node.name.text}`);
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && !ts.isSourceFile(node.parent) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
      if (rfPackage(node.moduleSpecifier.text)) found.push(`${scopeOf(node)}:${ts.isImportDeclaration(node) ? "ambient-import" : "ambient-export"}:${node.moduleSpecifier.text}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}
/** Every key naming an rf package and every string value specifying one, at any depth of a manifest, as `${path}` or
 * `${path}=${value}`: the dependency maps, bundledDependencies, overrides, resolutions, pi.extensions, scripts and every other field. */
function manifestHits(value: unknown, path = ""): string[] {
  if (Array.isArray(value)) return value.flatMap((item: unknown, index: number) => manifestHits(item, `${path}[${index}]`));
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [...(rfPackage(key) ? [`${path}.${key}`] : []), ...manifestHits(item, `${path}.${key}`)]);
  return typeof value === "string" && rfSpec(value) ? [`${path}=${value}`] : [];
}

/** Never invoked: registration only stores the descriptor. */
const NEVER = (): never => {
  throw new Error("census: a registered capability is never invoked");
};
const RF_INVOKE: Parameters<typeof registerReactiveFiberRender>[1] = async () => NEVER();
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
function injectedRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, RF_INVOKE, REPO);
  return registry;
}
function plantedRegistry(): CapabilityRegistry {
  const registry = injectedRegistry();
  registry.register({ descriptor: PLANTED_DESCRIPTOR, invoke: async () => NEVER() });
  return registry;
}
function rfDescriptors(registry: CapabilityRegistry): CapabilityDescriptor[] {
  return registry
    .catalogSnapshot()
    .map(entry => entry.descriptor)
    .filter(descriptor => descriptor.id.startsWith(RF_PREFIX));
}
function maskedRelease(source: string | undefined): string {
  return source === undefined ? "<none>" : source.replace(/^rf@[^:]+:/, "rf@<release>:");
}
function rfReadings(registry: CapabilityRegistry): string[] {
  return rfDescriptors(registry).map(descriptor => `${descriptor.id}|${descriptor.effectClass}|${maskedRelease(descriptor.contractSource)}`);
}
function explainFindings(registry: CapabilityRegistry): string[] {
  return rfDescriptors(registry)
    .filter(descriptor => [descriptor.id, descriptor.description, descriptor.contractSource ?? ""].some(field => LEAF_PATTERN.test(field)))
    .map(descriptor => descriptor.id);
}
/** G1's admission of a capture's identity. The carrier records a release and no build, so the commit is not compared: a capture
 * at another build of the same release is admitted (R-SAME-RELEASE-REBUILD, pinned by Q2). */
function carrierAdmits(identity: { readonly release: string; readonly commit: string }): boolean {
  return identity.release === recordedRfRelease();
}

// ---- the bead's own text ----

interface ExportRow {
  readonly description: string;
  readonly fields: Readonly<Record<string, unknown>>;
}
function exportRow(): ExportRow {
  for (const line of readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.description === "string") return { description: row.description, fields: row };
  }
  return { description: "", fields: {} };
}
function headWord(head: string): string {
  return head.trim().replace(/:$/, "");
}
/** The read heads whose exact head string, or whose word in any case anywhere in the text, does not occur exactly once. */
function repeatedHeads(description: string): string[] {
  return Object.values(HEADS)
    .filter(head => description.split(head).length !== 2 || (description.match(new RegExp(`\\b${headWord(head)}\\b`, "gi")) ?? []).length !== 1)
    .map(headWord);
}
/** Each "\n\n"-separated paragraph's head: its leading upper-case word before the paragraph's first ": ", else <none>. */
function paragraphHeads(description: string): string[] {
  return description.split("\n\n").map(paragraph => /^([A-Z][A-Z_-]+)\b[^:\n]*: /.exec(paragraph)?.[1] ?? "<none>");
}
/** The specification fields a row carries with content. */
function presentFields(fields: Readonly<Record<string, unknown>>): string[] {
  return FILING_FIELDS.filter(field => Object.hasOwn(fields, field) && fields[field] !== "" && fields[field] !== null);
}
function filingReading(row: ExportRow): JsonValue {
  return json({
    heads: paragraphHeads(row.description),
    repeated: repeatedHeads(row.description),
    plants: Object.fromEntries(Object.entries(HEAD_PLANTS).map(([name, plant]) => [name, repeatedHeads(`${row.description}${plant}`)])),
    fields: presentFields(row.fields),
    planted: presentFields({ ...row.fields, ...FIELD_PLANT }),
  });
}
/** One section of the description, read only when every read head occurs once in this same text. */
function section(description: string, head: string, tail: string): string {
  const repeated = repeatedHeads(description);
  if (repeated.length > 0) throw new Error(`${BEAD}'s description repeats a read section head (${repeated.join(", ")}); no section is read from it`);
  const start = description.indexOf(head);
  const end = start === -1 ? -1 : description.indexOf(tail, start + head.length);
  return end === -1 ? "" : description.slice(start + head.length, end);
}
/** The ACCEPTANCE list's items (the filing writes it as a list literal whose items may be quoted either way). */
function acceptanceItems(list: string): string[] {
  if (!/^\[["']/.test(list) || !/["']\]$/.test(list)) return [];
  return list.slice(2, -2).split(/["'], ["'](?=On landing: )/);
}
function tiled(rows: readonly Row[]): string {
  return TILES.map((tile, index) => `${tile === "PENDING" ? PENDING : (rows.find(row => row.id === tile)?.label ?? `<no row ${tile}>`)}${SEPARATORS[index] ?? ""}`).join("");
}

// ---- the cases ----

const REACHED: string[] = [];
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  G1: async () => {
    const carrier = recordedRfRelease();
    expect(
      carrierAdmits(CAPTURE),
      `the gating state was captured at rf ${CAPTURE.release} but the carrier records ${carrier}: re-measure it at ${carrier} (capture.remeasure) and re-capture the roster`,
    ).toBe(true);
    expect(CAPTURE.commit, "the capture names its build by a full commit sha").toMatch(/^[0-9a-f]{40}$/);
    return json({
      carrier,
      release: CAPTURE.release,
      build: CAPTURE.commit,
      mismatch: CAPTURE.mismatch,
      leaf: `${CAPTURE.leaf.path}|${CAPTURE.leaf.served}|${CAPTURE.leaf.availability}`,
      shipped: {
        commit: CAPTURE.shipped.commit,
        subject: CAPTURE.shipped.subject,
        names: [`[PMO-05b]`, FLAG].map(word => CAPTURE.shipped.subject.includes(word)),
        inBuild: CAPTURE.shipped.inBuild,
        prior: CAPTURE.shipped.prior,
        inPrior: CAPTURE.shipped.inPrior,
      },
    });
  },
  G2: async () => {
    const options = [...CAPTURE.usage.matchAll(/\[(--?[A-Za-z][\w-]*)/g)].map(match => match[1] ?? "");
    expect(options, `rf ${LEAF.split(".").join(" ")} takes ${FLAG} at the recorded build`).toContain(FLAG);
    const { flagged, unflagged } = CAPTURE.bounded;
    expect(flagged.keys, `under ${FLAG} the result adds both filing fields after the required members`).toEqual([...CAPTURE.required, ...FIELDS]);
    expect(unflagged.keys, "without the flag the result is the required members alone").toEqual([...CAPTURE.required]);
    const emitted = (run: ExplainRun): string[] => FIELDS.filter(field => run.keys.includes(field));
    return json({
      usage: CAPTURE.usage.startsWith(`usage: rf ${LEAF.split(".").join(" ")} `),
      options,
      probe: {
        flag: CAPTURE.probe.argv.includes(FLAG),
        exit: CAPTURE.probe.exit,
        ok: CAPTURE.probe.ok,
        command: CAPTURE.probe.command,
        codes: CAPTURE.probe.codes,
        unknown: CAPTURE.probe.unknown,
      },
      bounded: {
        flagged: { flag: flagged.argv.includes(FLAG), exit: flagged.exit, ok: flagged.ok, command: flagged.command, emitted: emitted(flagged), truncated: flagged.truncated, pathLimit: flagged.pathLimit },
        unflagged: { flag: unflagged.argv.includes(FLAG), exit: unflagged.exit, ok: unflagged.ok, command: unflagged.command, emitted: emitted(unflagged) },
      },
    });
  },
  G3: async () => {
    const members = FIELDS.filter(field => CAPTURE.members.includes(field));
    const required = FIELDS.filter(field => CAPTURE.required.includes(field));
    const atPin = FIELDS.filter(field => CAPTURE.pin.members.includes(field) || CAPTURE.pin.required.includes(field));
    expect(members, "both filing fields are result members at the recorded build").toEqual([...FIELDS]);
    expect(required, "neither is required there: both are emitted only under the flag").toEqual([]);
    expect(atPin, "neither is a member or a required name at the cited pin, as the filing says").toEqual([]);
    const [opening, closing] = CAPTURE.pin.lines;
    return json({
      schema: CAPTURE.schema,
      release: { members: CAPTURE.members, required: CAPTURE.required },
      pin: { rfcli: CAPTURE.pin.rfcli, members: CAPTURE.pin.members, required: CAPTURE.pin.required },
      revision: [CAPTURE.members, CAPTURE.required, CAPTURE.pin.members, CAPTURE.pin.required].map(list => list.includes(REVISION_MEMBER)),
      fields: { members, required, atPin },
      span: opening !== undefined && closing !== undefined && closing - opening - 1 === CAPTURE.pin.required.length,
    });
  },
  W1: async () => {
    const modules = srcModules();
    const scans = modules.map(module => ({ module: module.name, scan: scanSpawns(module.name, module.source) }));
    const importers = scans.filter(entry => entry.scan.imports).map(entry => entry.module);
    const sites = scans.flatMap(entry => entry.scan.sites.map(site => ({ module: entry.module, site })));
    const loads = scans.flatMap(entry => entry.scan.loads.map(load => `${entry.module}|${load.scope}|${load.form}`));
    return json({
      agree: JSON.stringify(importers) === JSON.stringify(sharedImporters(modules)),
      importers,
      sites: sites.map(({ module, site }) => `${module}|${site.kind}|${site.scope}|${site.callee}|${site.binary}|${site.shell}`),
      rf: sites.filter(entry => entry.site.kind === "rf").map(entry => `${entry.module}|${entry.site.scope}|${entry.site.callee}`),
      escapes: scans.flatMap(entry => entry.scan.escapes.map(found => `${entry.module}|${found}`)),
      loads,
      unbound: loads.filter(load => load.split("|")[2]?.startsWith("unbound:") === true),
      unread: scans.flatMap(entry => entry.scan.unread.map(found => `${entry.module}|${found}`)),
      unwalked: srcEntries()
        .filter(entry => entry.kind === "file" && UNWALKED_MODULE.test(entry.path))
        .map(entry => entry.path),
      unwalkedControls: Object.fromEntries(UNWALKED_CONTROLS.map(name => [name, UNWALKED_MODULE.test(name)])),
      entries: entryListing(srcEntries()).unwalked,
      entryControls: entryControls(),
      kindControls: Object.fromEntries(
        Object.entries(KIND_CONTROLS).map(([name, [directory, file, symlink]]) => [name, entryKind({ isDirectory: () => directory, isFile: () => file, isSymbolicLink: () => symlink })]),
      ),
      readingControls: Object.fromEntries(READING_CONTROLS.map(([name, kind]) => [`${name}|${kind}`, entryReading(name, kind)])),
      controls: Object.fromEntries(Object.entries(SPAWN_CONTROLS).map(([name, body]) => [name, scanReading(scanSpawns(`${name}.ts`, body))])),
    });
  },
  W2: async () => {
    const source = readFileSync(join(REPO, PROVIDER_FILE), "utf8");
    const file = parse(PROVIDER_FILE, source);
    const rf = scanSpawns(PROVIDER_FILE, source).sites.filter(site => site.kind === "rf");
    expect(rf, "the provider holds one rf spawn").toHaveLength(1);
    const argument = rf[0]?.call.arguments[1];
    let initializer = "<unread>";
    let arrays: string[] = [];
    let verb = "<unread>";
    const visit = (node: ts.Node): void => {
      if (argument !== undefined && ts.isIdentifier(argument) && ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === argument.text && scopeOf(node) === rf[0]?.scope) {
        initializer = node.initializer === undefined ? "<none>" : node.initializer.getText(file);
      }
      if (ts.isFunctionDeclaration(node) && node.name?.text === "renderArgv") {
        const found: string[] = [];
        const collect = (inner: ts.Node): void => {
          if (ts.isArrayLiteralExpression(inner)) found.push(arrayWords(inner).join(" "));
          if (ts.isReturnStatement(inner) && inner.expression !== undefined && ts.isArrayLiteralExpression(inner.expression)) verb = optionElided(arrayWords(inner.expression));
          ts.forEachChild(inner, collect);
        };
        collect(node);
        arrays = found;
      }
      ts.forEachChild(node, visit);
    };
    visit(file);
    return json({ argument: argument === undefined ? "<none>" : argument.getText(file), initializer, arrays, verb });
  },
  W3: async () => {
    const modules = srcModules();
    const read = (bodies: Readonly<Record<string, string>>): Record<string, number> =>
      Object.fromEntries(Object.entries(bodies).map(([name, body]) => [name, leafHits(`${name}.ts`, body).length]));
    return json({
      floor: modules.length >= SRC_FLOOR,
      hits: modules.flatMap(module => leafHits(module.name, module.source).map(hit => `${module.name}:${hit}`)),
      caught: read(LEAF_CAUGHT),
      quiet: read(LEAF_QUIET),
    });
  },
  U1: async () => {
    const modules = srcModules();
    const read = (bodies: Readonly<Record<string, string>>): Record<string, string[]> =>
      Object.fromEntries(Object.entries(bodies).map(([name, body]) => [name, nameHits(body)]));
    return json({
      needles: NEEDLES,
      floor: modules.length >= SRC_FLOOR,
      hits: modules.flatMap(module => nameHits(module.source).map(needle => `${module.name}|${needle}`)),
      caught: read(NAME_CAUGHT),
      quiet: read(NAME_QUIET),
    });
  },
  U2: async () => {
    const registry = await nativeRegistry();
    const injected = injectedRegistry();
    return json({
      native: rfReadings(registry),
      injected: rfReadings(injected),
      explain: [...explainFindings(registry), ...explainFindings(injected)],
      planted: explainFindings(plantedRegistry()),
    });
  },
  U3: async () => {
    const modules = srcModules();
    const structures = modules.map(module => ({ module: module.name, structure: sourceStructure(REPO, module.name) }));
    const manifest = object(JSON.parse(readFileSync(join(REPO, "package.json"), "utf8")), "package.json");
    const maps = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"].map(key => (isObject(manifest[key]) ? manifest[key] : {}));
    const entries = maps.flatMap(map => Object.entries(map).map(([name, spec]) => [name, String(spec)] as const));
    return json({
      floor: modules.length >= SRC_FLOOR,
      unread: structures.filter(entry => !entry.structure.ok).map(entry => entry.module),
      imports: structures.flatMap(entry => entry.structure.imports.filter(found => rfPackage(found.module)).map(found => `${entry.module}|${found.kind}|${found.module}`)),
      manifest: entries.length > 0 && typeof manifest.name === "string",
      packages: [String(manifest.name), ...entries.map(([name]) => name)].filter(rfPackage),
      specs: entries.filter(([, spec]) => rfSpec(spec)).map(([name, spec]) => `${name}|${spec}`),
      missed: [...PACKAGE_CAUGHT.filter(name => !rfPackage(name)), ...SPEC_CAUGHT.filter(spec => !rfSpec(spec))],
      quiet: [...PACKAGE_QUIET.filter(rfPackage), ...SPEC_QUIET.filter(rfSpec)],
      loads: modules.flatMap(module => packageLoads(module.name, module.source).map(found => `${module.name}|${found}`)),
      loadCaught: Object.fromEntries(Object.entries(LOAD_CAUGHT).map(([name, body]) => [name, packageLoads(`${name}.ts`, body)])),
      loadQuiet: Object.fromEntries(Object.entries(LOAD_QUIET).map(([name, body]) => [name, packageLoads(`${name}.ts`, body)])),
      types: modules.flatMap(module => typeReferences(module.name, module.source).map(found => `${module.name}|${found}`)),
      typeCaught: Object.fromEntries(Object.entries(TYPE_CAUGHT).map(([name, body]) => [name, typeReferences(`${name}.ts`, body)])),
      typeQuiet: Object.fromEntries(Object.entries(TYPE_QUIET).map(([name, body]) => [name, typeReferences(`${name}.ts`, body)])),
      typeLoads: Object.fromEntries(Object.entries(TYPE_CAUGHT).map(([name, body]) => [name, packageLoads(`${name}.ts`, body)])),
      deep: manifestHits(manifest),
      manifestCaught: Object.fromEntries(Object.entries(MANIFEST_CAUGHT).map(([name, plant]) => [name, manifestHits({ ...manifest, ...plant })])),
      manifestQuiet: Object.fromEntries(Object.entries(MANIFEST_QUIET).map(([name, plant]) => [name, manifestHits({ ...manifest, ...plant })])),
    });
  },
  Q1: async () => json(Object.fromEntries(Object.entries(COMPOSED_PROBES).map(([name, body]) => [name, leafHits(`${name}.ts`, body)]))),
  Q2: async () => {
    const admitted = (commit: string): boolean => carrierAdmits({ release: CAPTURE.release, commit });
    return json({
      carrier: maskedRelease(rfDescriptors(injectedRegistry())[0]?.contractSource),
      release: recordedRfRelease(),
      capture: { build: CAPTURE.commit, admitted: admitted(CAPTURE.commit) },
      prior: { build: CAPTURE.shipped.prior, admitted: admitted(CAPTURE.shipped.prior) },
    });
  },
  Q3: async () => {
    const roots = [...new Set(srcModules().map(module => module.name.split("/")[0] ?? ""))];
    return json({ roots, scan: scanReading(scanSpawns("local-provider.ts", LOCAL_PROVIDER)), leafHits: leafHits("local-provider.ts", LOCAL_PROVIDER) });
  },
  Q4: async () => {
    const word = new RegExp(`(?<![A-Za-z0-9_])${EXCLUDED_FIELDS[0] ?? "<none>"}(?![A-Za-z0-9_])`);
    return json({
      excluded: EXCLUDED_FIELDS,
      needle: NEEDLES.some(needle => EXCLUDED_FIELDS.includes(needle)),
      probe: nameHits(COMMON_WORD_PROBE),
      spelled: srcModules().filter(module => word.test(module.source)).length >= 1,
    });
  },
  Q5: async () =>
    json(
      Object.fromEntries(
        Object.entries(UNSEEN_LAUNCHES).map(([name, body]) => [name, { scan: scanReading(scanSpawns(`${name}.ts`, body)), leafHits: leafHits(`${name}.ts`, body), loads: packageLoads(`${name}.ts`, body) }]),
      ),
    ),
  Q6: async () => json(Object.fromEntries(Object.entries(UNREAD_SPECIFIERS).map(([name, body]) => [name, packageLoads(`${name}.ts`, body)]))),
  Q7: async () =>
    json({
      probes: Object.fromEntries(Object.entries(PATH_SPECIFIERS).map(([name, body]) => [name, { loads: packageLoads(`${name}.ts`, body), types: typeReferences(`${name}.ts`, body) }])),
      predicate: Object.fromEntries(PATH_NAMES.map(path => [path, rfPackage(path)])),
    }),
};

describe("wb-2j3.10 rf graph explain truncation census (RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION-R11, standing leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the filing's sections (each read head once), its STATEMENT and ACCEPTANCE, and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["G:3", "W:3", "U:3", "Q:7"]);
    const judged = ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }));
    const rosterRows = ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) }));
    expect(judged).toStrictEqual(rosterRows);
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const constants = json({
      leaf: LEAF,
      flag: FLAG,
      fields: FIELDS,
      excluded: EXCLUDED_FIELDS,
      revision: REVISION_MEMBER,
      citedPin: CITED_PIN,
      pending: PENDING,
      pendingAcceptance: PENDING_ACCEPTANCE,
      tiles: TILES,
      separators: SEPARATORS,
      heads: HEADS,
      headPlants: HEAD_PLANTS,
      filingFields: FILING_FIELDS,
      fieldPlant: FIELD_PLANT,
      srcFloor: SRC_FLOOR,
      calls: CHILD_PROCESS_CALLS,
      shellCalls: SHELL_CALLS,
      shellOptionCalls: SHELL_OPTION_CALLS,
      assignmentWord: ASSIGNMENT_WORD.source,
      unwalkedModule: UNWALKED_MODULE.source,
      unwalkedControls: UNWALKED_CONTROLS,
      entryPlants: ENTRY_PLANTS,
      kindControls: KIND_CONTROLS,
      readingControls: READING_CONTROLS,
      valueOptions: RF_VALUE_OPTIONS,
      packageWords: RF_PACKAGE_WORDS,
      rfSegment: RF_SEGMENT.source,
      spelling: SPELLING,
      spawnControls: SPAWN_CONTROLS,
      leafCaught: LEAF_CAUGHT,
      leafQuiet: LEAF_QUIET,
      nameCaught: NAME_CAUGHT,
      nameQuiet: NAME_QUIET,
      planted: PLANTED_DESCRIPTOR,
      packageCaught: PACKAGE_CAUGHT,
      packageQuiet: PACKAGE_QUIET,
      specCaught: SPEC_CAUGHT,
      specQuiet: SPEC_QUIET,
      loadCaught: LOAD_CAUGHT,
      loadQuiet: LOAD_QUIET,
      typeCaught: TYPE_CAUGHT,
      typeQuiet: TYPE_QUIET,
      manifestCaught: MANIFEST_CAUGHT,
      manifestQuiet: MANIFEST_QUIET,
      composed: COMPOSED_PROBES,
      localProvider: LOCAL_PROVIDER,
      commonWord: COMMON_WORD_PROBE,
      unseen: UNSEEN_LAUNCHES,
      unreadSpecifiers: UNREAD_SPECIFIERS,
      pathSpecifiers: PATH_SPECIFIERS,
      pathNames: PATH_NAMES,
      residuals: RESIDUALS,
    });
    expect(constants).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) {
      for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a quiet-row pin`).toContain(member);
    }
    const row = exportRow();
    const description = row.description;
    expect(description.length, `${BEAD}'s description was read from the tracker export`).toBeGreaterThan(0);
    expect(repeatedHeads(description), "each read section head occurs exactly once in the description, in the text sections are cut from").toEqual([]);
    const filing = filingReading(row);
    expect(filing).toStrictEqual(ROSTER.filing);
    const statement = section(description, HEADS.statement, HEADS.rationale);
    expect(statement, "the rows' labels and the PENDING clause tile the STATEMENT, in order, with its own separators").toBe(tiled(ROWS));
    expect(acceptanceItems(section(description, HEADS.acceptance, HEADS.surfaces)), "the ACCEPTANCE is exactly the two pending on-landing items").toStrictEqual([
      ...PENDING_ACCEPTANCE,
    ]);
    const spelled = /shipping rf (\w+) (\w+) (--[a-z-]+) with (\w+)\/(\w+) fields \(absent from \1\.\2\.schema\.json:(\d+)-(\d+)@([0-9a-f]+)\)/.exec(statement);
    expect(spelled?.slice(1), "the STATEMENT spells the leaf, the flag, the two fields and the cited lines at the pin").toStrictEqual([
      ...LEAF.split("."),
      FLAG,
      ...FIELDS,
      ...CITED_PIN.lines.map(String),
      CITED_PIN.rfcli,
    ]);
    expect({ rfcli: CAPTURE.pin.rfcli, lines: [...CAPTURE.pin.lines] }, "the capture read the pin and the lines the STATEMENT cites").toStrictEqual({
      rfcli: CITED_PIN.rfcli,
      lines: [...CITED_PIN.lines],
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
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
    // every registered test of this file (vitest task tree), exactly and in roster order
    expect(titles).toEqual([...ROSTER.tests]);
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
