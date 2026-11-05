/**
 * wb-pyel.5 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R12, program-triage-2026-10-18): the render-abort falsifier and its until-then
 * trigger.
 * Statement (bead title): "If Pi authors EDC hooks/descriptors, a pure hook or descriptor may describe a logical evidence
 * requirement or prospective resource interest but shall create no tool, model or host effect during render, and proposals
 * from aborted or suspended renders shall never commit. Artifact: a Pi-authored EDC component/hook surface (none exists)."
 * Citation (owner filing): ReactiveFiberTSXSDK docs/programs/evidence-directed-computation-2026-10-18.md:12@e7e6616d3d08, as
 * the cutting seat read it (git show, read-only): "A pure hook/descriptor may *describe* logical evidence requirement or
 * prospective resource interest but cannot create tool/model/host effects during render. Proposals from aborted/suspended
 * renders never commit."
 * Acceptance (owner filing, verbatim): "a render-abort falsifier proving zero committed proposals and zero tool/model/host
 * effects from a render pass, with a committed-after-abort attempt going red."
 *
 * DELIVERED HERE: that falsifier, built and run against the one render pass Pi drives today, the rf `context render
 * --no-commit` preview (src/workbench/providers/reactivefiber.ts), at every entry the module exports: the native registration
 * as production loads it (loadWorkbenchNative().registerNativeProviders, then CapabilityRegistry.invoke), the two exported
 * render functions called directly (nativeReactiveFiberRender, nativeReactiveFiberPreview), and the injected registration
 * (registerReactiveFiberRender) both through the registry and as its bare provider. And the until-then trigger: row T pins
 * that no Pi-authored EDC component/hook surface exists in the homes and forms row T reads (listed below), so the day one
 * lands there this census reds naming the owed duty (drive the new surface's render passes through row A); a surface in a
 * home or a form row T does not read is a named residual (R-UNREAD-HOMES, R-HOOK-VOCABULARY), never claimed. NOT DELIVERED:
 * the falsifier run against a Pi-authored EDC hook surface - none exists (the owner filing: "No EDC render pipeline exists in
 * Pi to carry the duty").
 *
 * THE FALSIFIER (row A). Each pass runs on a bench: a fresh workspace root (two seeded files) inside a bench home (a scratch
 * directory that holds the root alone) and a hermetic PATH holding one directory, whose `rf` is a stand-in (absolute node
 * interpreter) that logs its argv, marks its progress in files beside itself and exits 0 on SIGTERM (the clean exit is the
 * hard case: a complete proposal on stdout and exit code 0). The same directory holds a logging stand-in for every other
 * command Pi's src launches by name (derived from src: each resolved command of both launch readers, A5). Every stand-in
 * records its pid in the bench, and the teardown stops any stand-in of a bench that still runs (its /proc command line must
 * name the bench), so a pass that ignores its abort leaves no process behind (A4 holds that stop to a control). As hygiene no
 * case holds, a stand-in also exits by itself (unmarked) past STAND_IN_BOUND_MS or when its parent is gone. The scenarios:
 *  - ABORTED (the title's "aborted"): before (the signal fired before the pass starts); running (native passes: the stand-in
 *    started and wrote nothing); proposed (the stand-in wrote a complete, valid, uncommitted proposal and waits; for the
 *    injected passes the reader is pending at the abort and resolves that proposal after it).
 *  - SUSPENDED (the title's "suspended"): queued (held for a registry admission slot behind a pass holding the only slot - a
 *    running child or a pending read - then aborted);
 *    deadline (held past the registry deadline while the reader is pending, the proposal arriving after; the deadline is
 *    the registry's own dispatch, the same for both registrations, and is driven through the injected one, where the
 *    proposal's timing is the test's).
 *  - SETTLED: no abort; the stand-in prints the proposal and exits.
 * Every wait on a pass is bounded (WAIT_MS): a pass that never settles reds naming itself. The verdict (falsify) names seven
 * violation classes: committed-after-abort (an aborted or suspended pass returned a proposal), committed-proposal (a settled
 * native pass returned a reading that does not state the uncommitted form - ephemeral exactly true, render_id exactly null,
 * commit_seq absent or exactly null, and a work object whose storage_write_count is exactly 0 - so every other value of each
 * of those fields is a committed form), committing-launch (an rf launch outside the `--workspace <root> context render ...
 * --no-commit --no-input --json` form: a leading flag other than --workspace, another noun or verb, or the three flags not
 * last and in that order), started-after-abort (a pass aborted before it started, or held in the queue, launched or read anyway), extra-launch
 * (more than one launch or read, counted together), foreign-launch (any other stand-in launched) and host-write (the bench home's tree - the workspace root and the directory holding it: names, kinds
 * and bytes - changed). A1-A4 hold every driven pass and scenario to an empty verdict (A4 also holds the teardown's stop of a
 * stand-in left waiting); A5 holds the pass's static reach as the readers it composes read it (below); A6 is the acceptance's
 * "committed-after-abort attempt going red": a control for every class and for every clause of its classifier - one
 * committed form per form each clause names (COMMITTED_FORMS: ephemeral false, absent, null, a string, a number; render_id an
 * id, empty, absent, a number; commit_seq a count, zero, a string; storage_write_count a count, absent, a string, null,
 * negative; work absent; result absent), the launch form's leading workspace, noun, verb and tail (dropped, misplaced,
 * swapped), a read before the start, a launch from the queue, a second read, a suspended pass that returned, a rewritten
 * workspace file, a write beside the root in the bench home - each tripping exactly its class (a render
 * that drops its signal and so returns its proposal after the abort leads), plus one signal-ignoring provider read three
 * ways - bare (red: committed-after-abort), through a registry with the proposal arriving after the abort (refused by the
 * registry's race), and through a registry with the proposal settling inside the abort's own tick (refused only by the
 * registry's post-race guard; without that guard the census reds). A3 drives every committed form through the
 * native-registry and native-direct passes and holds each to a refusal.
 *
 * A5, THE STATIC REACH (cut #6, the post-inversion restatement over the landed readers, restated to its pins at cut #7;
 * ORCHESTRATOR RULING R-B161: the re-cut "is a mechanical restatement over this bead's landed reader coverage", the bead being
 * wb-pyel.9, whose readers landed as test/helpers/edc-static-reach-readers.ts with its carrier wb-pyel.11 at landing 888 and
 * whose census landed at landing 949). A5 composes that helper's readers - the specifier reader, the loader reader, the
 * I/O-global reader, the process reader, the child_process tracer and the launch-call reader, with the resolver they share -
 * through one namespace import, READERS, and claims that composition exactly as far as its composition pins read it: this
 * file's TOP LEVEL, off its own source, each pin held to the helper's source, TSCONFIG or the roster: (1) every specifier the
 * specifier reader reads anywhere in this file (its bodies included) is one of its import declarations', in source order, and
 * those declarations are exactly IMPORTS (specifier and bindings), so this file names no module through a loader call the
 * specifier reader reads and imports no binding but IMPORTS'; (2) of those specifiers exactly one resolves to the helper as
 * TypeScript resolves it from this file with TSCONFIG's compiler options (moduleResolution bundler, so the .js, the
 * extensionless and the .ts spelling of a relative path to the helper each resolve to it), and its import declaration is a
 * namespace import bound to READERS; (3) READERS is a module namespace whose keys are exactly the value names the helper's
 * source exports; (4) this file's top-level declarations - the names declaredBy reads: a variable statement's at any
 * binding-pattern depth, a function's, a class's, an interface's, a type alias's, an enum's, a namespace's and an
 * import-equals declaration's, each kind held to a planted statement (DECLARATION_KINDS) - are exactly OWN_DECLARATIONS, none
 * of them a name the helper exports; (5) every top-level statement that is neither an import declaration nor declares a name
 * is one of TOP_LEVEL_CALLS, the three calls installScratchLeakGuard(), afterEach(<function>) and describe(<title>,
 * <function>), each read by its callee and arguments. So a reader added to this file's top level as a statement of its own - a
 * declaration, renamed or not, an import-equals alias, a second import of the helper in any spelling TypeScript resolves to
 * it, an import of another module, or any other statement (an expression statement holding a copy on a global) - reds A5, and
 * PLANTED_COMPOSITION, a source read as this file holding one statement of each of those forms, is read as each (A5's witness
 * holds its reading). NOT CLAIMED by the composition pins: a reader copied into a function body or an initializer - the body
 * or the initializer of one of this file's own declarations, or a callback one of the three top-level calls passes - and
 * called from there (the pins read the top level and the specifiers the specifier reader reads, never what else a body or an
 * initializer holds).
 * WHAT THE READERS READ - the forms, positions, spellings
 * and settings they read, and how - is claimed by the censuses that read them,
 * test/workbench-edc-static-reach-readers-census.test.ts (it re-measures cut #5's 139 REACH_FORMS probes, its 106
 * REFERENCE_POSITIONS, its planted module and its R-STATIC-FORMS probes over the helper) and
 * test/workbench-edc-static-reach-callee-members-census.test.ts, and is NOT CLAIMED by this census. A5 claims exactly its
 * witness, read that way: the render closure (the src modules reached from the render module through the relative specifiers
 * the specifier reader reads, and every other specifier those modules name) shares no module or package with the foreign set
 * (what native-modules.ts loads through an import() of a string literal - its src modules, the render module excepted, and its
 * packages - and the packages those src modules import, builtins excepted); over the closure the tracer and the launch-call
 * reader each read one launch site, the render module's spawn with command rf, and the closure names one I/O builtin
 * (node:child_process, in the render module), and the I/O-global reader and the process reader read nothing (no I/O global, no
 * global object, no process reference but an env read); over every tracked src module the launch readers' union reads the
 * witness's srcSites, and exactly one of them launches rf, the render module's spawn; the tracer's src sites whose reading is
 * a bracketed form (one starting with <), not a command, and the loader reader's src loader calls whose specifier does not
 * resolve are the witness's lists (any of them could launch rf or load child_process, so each is pinned by module and name);
 * and the planted module (PLANTED_REACH) reads, through the pipeline the closure reads through, the witness's controls - a
 * reading for every reader - so a reading the pipeline drops reds A5. A5 bounds the render closure statically for the forms
 * the readers parse; R-STATIC-FORMS (Q6) names the rest.
 *
 * THE UNTIL-THEN TRIGGER (row T), in these homes and forms: T1 no tracked .tsx/.jsx module (either extension in any letter
 * case) anywhere in git's index; T2 no tracked script module outside test/ (a .ts, .mts, .cts, .tsx, .js, .mjs, .cjs or .jsx
 * extension in any letter case; src, qa, examples, the root configs; src read equal to the src walk both ways) names a hook -
 * an identifier of the use-prefixed form (the charter's useProvider, useQuery, useAbsent, useRequirement, useEffect, useCommit
 * fit it) or a use-prefixed word in any string or template part (a key, an argument, prose) - or the charter's descriptor
 * pureProjectRequirement (as an identifier or in any string), or names @reactive-fiber/tsx (as a specifier, read by the
 * specifier reader A5 composes, or in any string), and neither manifest names that package; T3 neither the descriptors the
 * native and injected registrations register (read at run time) nor any string, template part, identifier or key of a module
 * T2 reads (read statically, so a descriptor registered by a module neither registration wires in reads too) spells either of
 * the title's two interests (evidence requirement, resource interest, joined fold); T4 each reader's own controls. A red row T
 * is the trigger, not a defect.
 *
 * RESPIN HISTORY: the entries for cuts #2-#5 below record each cut as it was delivered. The readers and rosters they name
 * (A5's readers - the tracer, the resolver, inType, unwrap - and REACH_FORMS, REFERENCE_POSITIONS) were this file's own
 * through cut #5 and are the helper's and its landed censuses' since cut #6, so those entries' sentences about them describe
 * no code of this file now; their other cures (row A's controls, row T's reads, the riders and Q7's probes) stand in this
 * file as cut #5 left them. The cut #6 entry records that cut as delivered too: its composition words are restated to what
 * its pins read by cut #7 (A5 above and the cut #7 entry).
 * RESPIN (cut #2; refusal #1 on cut #1 a2572832, seat gate-prep-25, lane g10-gate-s128): U1 A5's readers parse the
 * global-object, process, default-import, renamed-binding and const-command forms of gate plants GX1, GX2, GX3, GX5 and GX5b,
 * and its claims are stated to the forms they parse; U2 one committed-form control per form (G01, G02, G03); U3 row T reads
 * every tracked script module outside test/ and every string in them (GT1, GT5), and its armed claim names the homes it
 * reads. Riders: F4 a computed import() reads <expression>; F5 a control per masked classifier clause (G04, G05, G07, G08,
 * G09); F6 every wait on a pass is bounded; F7 the stand-ins derive from the resolved commands of both launch readers.
 * RESPIN (cut #3; refusal #2 on cut #2 e0c90322, seat gate-prep-10, lane g10-gate-s137): U1 the child_process reader is the
 * fail-closed tracer above - nested destructuring (GA1), assignment-bound loader results (GA3) and member-of-loader-result
 * initializers (GA2) are followed, and every value it does not follow reads a site - with its roster of forms (REACH_FORMS),
 * and the src anchor pins every src site and every unresolved loader call; U2 one committed-form control per form each clause
 * of the uncommitted reading names, the clauses stated exactly (MB2, PR-E2); riders: GA2 (in REACH_FORMS), GC2 (row T reads
 * hook names spelled as text), F15 (the stand-ins bound their own life and the teardown stops any left running).
 * RESPIN (cut #4; refusal #3 on cut #3 a9cd4ceb, seat gate-prep-5, lane g10-gate-s142; rule 19(c) engaged and R-B95 froze
 * the shape, so this cut takes the enumerate-the-resolvable form for the static-reach family): U1 inType() read every
 * ExpressionWithTypeArguments as a type, so the tracer, the I/O-global reader and the process reader skipped a class's
 * extends expression - HER1 (a ChildProcess subclass in a new src module whose inherited spawn launches rf), HER4 (the
 * same through a namespace import), HER2 (extends WebSocket in the render module), HER3 (extends globalThis.EventTarget)
 * and the process heritage PREP named PLAUSIBLE. inType now reads a class's extends expression and an instantiation
 * expression as values, unwrap() and the tracer read an instantiation expression as a type wrapper, and A5's claims are
 * restated to the enumerated readers above (REFERENCE_POSITIONS; REACH_FORMS' heritage, instantiation and scope forms; the
 * heritage lines of the planted control). The class hardened at cut time: commands, specifiers and keys resolve through
 * the binding a name resolves to in its scope (a name-keyed const lookup read a shadowed name's unrelated const, the
 * wb-jwc.7 R-B92 class), and a createRequire result bound by ||=, &&= or ??= is a loader name. Rider F2: GC3 (a tracked
 * examples/ module with an upper-case .JS extension) - script extensions are read in any letter case (T4's planted homes
 * hold it), and R-UNREAD-HOMES names the extensionless path (Q7).
 * RESPIN (cut #5, the FINAL cut; refusal #4 on cut #4 ccddf29d, seat gate-prep-16, lane g10-gate-s149; ORCHESTRATOR RULING
 * R-B123: the rule-19 structural exit binds cut #5 to the FAIL-CLOSED CORE and moves the full-surface reader work to
 * wb-pyel.9): U1 class-level guard (a) failed through two families. LA: the tracer skipped a logical assignment's left
 * operand as a write target, while a kept ||= or ??= target is the assignment's value (gate plants LA4, LA5). NS: the
 * resolver read a name in a namespace body through the per-block scope chain, while TypeScript merges a namespace's
 * declarations (gate plants NS2, NS1). Both now fail closed: a logical assignment's target is read, a held name target
 * followed through the assignment's value; no name resolves in a namespace body, and the launch-call reader reads every
 * launch-named call there. The same class, named at cut time before a gate finds it: an enum declaration merges as a
 * namespace does (a merged enum's computed member read the module's same-named const), an ambient const's initializer is not
 * its run-time value, a namespace holding only types binds no value (a const of its name went unresolved), and a const
 * array literal is mutable (an index into a written, aliased, called or exported array read the initializer's element, the
 * specifier of a loader call included) - each now fails closed or resolves as TypeScript binds it, and each is a
 * REACH_FORMS form (34 new: 6 logical-assignment, 9 merged-scope, 1 types-only namespace, 2 ambient const, 16 const array).
 * A refusal never hides a launch: a launch-named call on a value the tracer does not hold whose command resolves only by
 * trusting what the resolver refuses reads <expression> (the seat's own battery found that an ambient const or a written
 * array, read unresolved, dropped such a call the cut #4 resolver had read as a site).
 *
 * RESPIN (cut #6, the post-inversion restatement; refusal #5 on the FINAL cut #5 485272f7, seat gate-prep-15, lane
 * g10-gate-s156; ORCHESTRATOR RULING R-B161, the dependency inversion: refusal #5's unmet members - U1 the eleven claim-word
 * hollowings H1-H11, U2 the block-function plant BF1 - folded into wb-pyel.9 and this bead parked behind it, its parking
 * note reading "NEVER closed, NEVER respun; no cut #6. Unblocks when wb-pyel.9 lands; the eventual re-cut is a mechanical
 * restatement over the child's landed reader coverage"): wb-pyel.9 landed at landing 949, its census holding U1's eleven
 * witness modules (W-AS..W-UTYPE) with KILLS of the eleven hollowings H1-AS..H11-UTYPE, and U2's plant BF1 with its control
 * BF1c, KILLS of BF1-HOIST reading BF1 red, all over the helper. So this re-cut deletes cut #5's in-file readers and their
 * vocabularies and composes the helper (A5 above); deletes cut #5's REACH_FORMS and REFERENCE_POSITIONS with them (the
 * landed census re-measures both, probe for probe, over the helper); adds A5's composition pins (the one namespace import,
 * READERS' keys against the helper's source, OWN_DECLARATIONS against this file's source and the roster); and keeps every
 * other row, pin, control, constant and roster entry of cut #5, each re-measured over the helper (MEASURED).
 * RESPIN (cut #7; refusal #6 on cut #6 d1a7880e, seat gate-prep-4, lane g10-gate-s215; ORCHESTRATOR RULING R-B577, the
 * post-ladder disposition: a further restatement in the same lineage with claims equal to pins): cut #6's composition words
 * claimed more than its pins read. U1 a reader copied into a top-level expression statement (gate plants GT1 and GT2, each a
 * copy held on globalThis) kept A5 green: the pins now read every top-level statement - one that is neither an import
 * declaration nor declares a name must be one of TOP_LEVEL_CALLS - and what a body or an initializer holds is NOT CLAIMED
 * (cut #6's "and with none of its own" is withdrawn). U2 an import-equals alias of a helper reader (GT5) and a second import
 * of the helper spelled without an extension (GT6) kept A5 green: declaredBy reads an import-equals declaration's name, this
 * file's specifiers are resolved as TypeScript resolves them with TSCONFIG's options, every specifier the specifier reader
 * reads here must be an import declaration's, and the import declarations are IMPORTS. U3 declaredBy's enum, namespace and
 * binding-pattern legs had no negative control (DN-NOENUM, DN-NOMODULE, DN-NOPATTERN): DECLARATION_KINDS holds every kind
 * declaredBy reads to a planted statement, and PLANTED_COMPOSITION holds the composition's reading of one statement per form
 * the gate planted.
 *
 * MEASURED AT CUT #6 (by the respin seat ws-02, run g10-work-s212, 2026-11-04, on the merge of trunk e25c5a7f into cut #5): all 21
 * driven pass/scenario observations read an empty verdict, the 5 settled native renders return the uncommitted form and the
 * 38 committed-form renders (19 forms, two native passes) are refused; each of the 39 controls trips exactly its expected
 * classes and the abandoned stand-in is stopped at teardown; the render closure is 4 src modules and 2 externals with one
 * launch site, no I/O global, no global object and no process member but env; over src the launch readers read 11 sites -
 * one rf site and one child_process site reading <expression> (the detached host's spawn of process.execPath) - and one
 * loader call whose specifier does not resolve (the detached host's createRequire result), and 4 stand-ins beside the rf
 * stand-in (cmd, forge, git, sh); 0 tracked .tsx/.jsx of 1234 tracked paths; 0 hook names (identifiers or strings) over 198
 * read modules (117 in src); 0 interest phrases in 8 descriptors and over the 198 read modules. Every witness but A5's is
 * byte-identical to cut #5's roster entry, and so is every field of A5's but the deleted rosters' two (forms, positions) and
 * the new composition: READERS holds the helper's 35 value exports, OWN_DECLARATIONS 175 names. Of cut #5's deleted
 * rosters, read over the helper by this seat (a read-only probe outside the census): 138 of the 139 REACH_FORMS probes read
 * cut #5's expected reading - block-function-shadow-command reads spawn git, not <expression>, the BF1 cure the landed census
 * pins - and each of the 106 REFERENCE_POSITIONS reads as its kind.
 * MEASURED AT CUT #7 (by the respin seat ws-05, run g10-work-s213, 2026-11-05, on the merge of trunk bfc7fcde into cut #6):
 * every witness but A5's is byte-identical to cut #6's roster entry, and so is every field of A5's but its composition, which
 * holds the pins' reading: the specifier reader reads 17 specifiers in this file, IMPORTS' 17 (one resolving to the helper,
 * moduleResolution Bundler); READERS holds the helper's 35 value exports; this file's 206 top-level statements are its 17
 * import declarations, 186 declarations naming OWN_DECLARATIONS' 186 names (none a helper export) and the 3 TOP_LEVEL_CALLS;
 * declaredBy reads each of the 13 DECLARATION_KINDS statements as its names (10 that declare, 3 that declare none); and
 * PLANTED_COMPOSITION reads as 5 specifiers, 4 of them resolving to the helper (its .js, extensionless, .ts and
 * dynamic-import spellings), 4 import declarations, 3 of them the helper's, 5 declared names (the import-equals alias
 * processReferences, a helper export, among them) and 1 top-level call.
 *
 * The census pins the rows and the residuals' quiet rows:
 *  A, the acceptance: A1 aborted passes, A2 suspended passes (both: no proposal reaches the caller), A3 a settled native
 *    pass returns only the uncommitted form and refuses each committed form, A4 the effect ledger of every driven pass, A5
 *    the static reach, A6 the controls.
 *  T, the title's artifact clause: T1-T4 above.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's witness, the constants and every registered test title - is held to the out-of-file roster
 * (test/fixtures/edc-render-abort-roster.json). Outside anchors in the bead's own row of the tracker export
 * (.beads/issues.jsonl): row A's label is the acceptance sentence (the first "Acceptance:" sentence of the notes, so later
 * notes do not move it) and its three clauses are each served by a row A pin, both ways; row T's label is the title's artifact
 * clause; the scenario kinds are the title's "aborted or suspended" (A1 judges the aborted renders, A2 the suspended), the
 * effect classes A4/A5 judge are its "tool, model or host" (A5 alone judges model), A6 serves the acceptance's third clause,
 * and T3's phrases are its two interests. Outside anchors in src: the contract source states the uncommitted render (A3 judges
 * the settled form); the passes equal the render module's exported functions, both ways; every registered render capability of
 * both registrations is driven; src's only rf launch site is the render module's (both launch readers); the stand-ins are the
 * commands src launches by name; the foreign set is native-modules.ts's dynamic imports. Outside anchors in the helper,
 * TSCONFIG and this file's own source: READERS' keys are the value names the helper's source exports; TypeScript, with
 * TSCONFIG's options, resolves exactly one of this file's specifiers to the helper; and this file's top level, read off its own
 * source, is IMPORTS (every specifier the specifier reader reads in it an import declaration's), OWN_DECLARATIONS (naming none
 * of the helper's exports) and TOP_LEVEL_CALLS. The last case reads the
 * vitest task tree (every registered test, in roster order, in run mode, ran before it) and the pins that reached their
 * witness.
 * NOT CLAIMED (edits of this file and the roster together below row level): a pin removed from ROWS, the literal, IMPL and the
 * roster where no outside anchor names it (A4, T1-T4, Q1-Q7 with their RESIDUALS entry); a constant edited in this file and
 * the roster together (an OWN_DECLARATIONS name added or removed with the declaration it names, an IMPORTS entry with its
 * import declaration, a TOP_LEVEL_CALLS entry with its call, a DECLARATION_KINDS or PLANTED_COMPOSITION statement with its
 * reading, a committed form with its control, or a Q6 probe removed from both included); the readers' coverage - the forms,
 * positions, spellings and settings the helper's readers read - is NOT CLAIMED by this census (the helper's landed censuses
 * claim it); a reader copied into a function body or an initializer - the body or the initializer of one of this file's own
 * declarations, or a callback one of the three top-level calls passes - and called from there is NOT CLAIMED by A5's
 * composition pins (they read this file's top level and the specifiers the specifier reader reads, never what else a body or
 * an initializer holds); T1's listing narrowed while it still holds REQUIRED_TRACKED and its floor, and T2's read set
 * narrowed while it still holds REQUIRED_READ and its floor; a launch killed before the stand-in's first statement runs (the
 * SIGTERM lands during the interpreter's start) leaves no log line, so the launch ledger reads it as none - the outcome and
 * the at-abort mark still record such a pass.
 * RESIDUALS (named, each with its pinned quiet row): R-INJECTED-RELAY the injected registration relays its reader's envelope
 * without the native admission checks - a reader stating commit_seq 1 is returned unchanged by both injected passes, so the
 * committed-proposal class judges native passes only (Q1); R-STATED-EFFECTS the native admission reads ephemeral, render_id,
 * commit_seq and the store write count, never rf's own result.effects or result.plan statements - a settled native pass whose
 * envelope states an effect and would_commit true is returned (Q2); R-HOOK-VOCABULARY a hook spelled outside the use-prefixed
 * form (as an identifier or as a word in a string), named only in pieces composed at run time, only in a comment or a
 * regular-expression literal, or with a look-alike letter NFKC does not fold; a descriptor describing an interest in other
 * words, only in pieces composed at run time, only in a regular-expression literal or a comment, or with a look-alike letter;
 * or the TSX SDK named only in pieces joined at run time - is not read by T2/T3 (Q3); R-STAND-IN the falsifier drives
 * stand-ins, never the installed rf (its TSX Suspense, abort handling and the cache-plane writes the descriptor discloses are
 * rf's and are not measured here; the rf-preview live tier holds the installed rf to the envelope) - during a pass PATH holds
 * the bench directory alone (Q4); R-HOST-ELSEWHERE the host-write reading fingerprints the bench home only - a write elsewhere
 * (the stand-ins' directory, the host's temp or home directories) reads no violation (Q5); A5 bounds the render closure
 * statically for the forms the readers it composes parse, and R-STATIC-FORMS names the rest; R-STATIC-FORMS the forms those
 * readers do not parse (Q6: one probe per form, its reading by every reader A5 composes pinned, the rf launches read included)
 * - a launch-named call on a value the tracer does not hold whose command does not resolve, outside a namespace body and an
 * enum declaration (pi.exec, a connection's spawn); a launch through a value the module does not bind from child_process (a
 * parameter, a function a call returns); a package's own launcher (read by its specifier alone); a global reached without its
 * name (a constructor chain); a write through the allowed process.env read; a launch whose arguments carry rf through a shell
 * or launcher the readers read by its command alone (sh -c, npx); a launch through another builtin's process or thread API
 * (cluster.fork, a worker_threads Worker); a loader reached through a call the loader reader does not parse (Reflect.apply
 * over require, require.call, module.constructor._load) or through a binding it does not read (an alias of require or
 * getBuiltinModule, a renamed createRequire, a createRequire result held in a property) whose specifier does not resolve (a
 * child_process specifier spelled as a literal still reads <untraced> by the string read); code evaluated at run time from a
 * text that names no child_process (Function, eval, vm, a Worker's eval source); and a process-internal binding
 * (process.binding, _linkedBinding, dlopen) - over src the launch readers and the loader reader read no rf launch for any of
 * them, and inside the render closure the I/O-global and process readers flag the ones that need a global or process (the
 * per-probe counts show which); R-UNREAD-HOMES row T's static readers read every tracked script module outside test/ - test/
 * (this census's own plants and the vitest timer API's use-prefixed names live there) and paths without a script extension
 * (JSON, YAML, Markdown, an extensionless executable) are not read (Q7 pins the read-home verdict of one probe path per unread
 * home).
 * SCOPE: the falsifier judges the host boundary Pi owns; rf's own render semantics are rf's, and the closure's one package
 * (typebox/value) is read by its name, never inside.
 *
 * Display paths added: none. Test-only: the stand-ins and workspace roots live in makeScratch scratch; src, the manifests,
 * .beads and git's index are only read.
 */
import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { builtinModules } from "node:module";
import { delimiter, dirname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterEach, describe, expect, it } from "vitest";
import {
  type CapabilityDescriptor,
  CapabilityError,
  type CapabilityLimits,
  type CapabilityProvider,
  CapabilityRegistry,
  type InvocationContext,
  type JsonValue,
} from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type ForgeReadClient, registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { type FurnaceReadClient, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import {
  nativeReactiveFiberPreview,
  nativeReactiveFiberRender,
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import * as READERS from "./helpers/edc-static-reach-readers.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

type JsonObject = { [key: string]: JsonValue };
type Envelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "edc-render-abort-roster.json");
const BEAD = "wb-pyel.5";
/** The render capability and the grant its descriptor requires. */
const PREVIEW = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const RENDER_MODULE = "src/workbench/providers/reactivefiber.ts";
const NATIVE_LOADER = "src/workbench/native-modules.ts";
/** The census's own path, the helper whose readers A5 composes, and the specifier this file names it by. */
const SELF = "test/workbench-edc-render-abort-census.test.ts";
const HELPER = "test/helpers/edc-static-reach-readers.ts";
const HELPER_SPECIFIER = "./helpers/edc-static-reach-readers.js";
/** The project the typing step checks this file with: A5 resolves this file's specifiers with its compiler options. */
const TSCONFIG = "tsconfig.test.json";
/** This file's import declarations, in source order, each as its specifier and its bindings (A5 holds this file's own source
 * to it). */
const IMPORTS: readonly string[] = [
  "node:child_process { execFileSync, spawn }",
  "node:crypto { createHash }",
  "node:fs { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync }",
  "node:module { builtinModules }",
  "node:path { delimiter, dirname, join, posix, relative }",
  "node:url { fileURLToPath }",
  "typescript default as ts",
  "vitest { afterEach, describe, expect, it }",
  "../src/workbench/capability-registry.js { type CapabilityDescriptor, CapabilityError, type CapabilityLimits, type CapabilityProvider, CapabilityRegistry, type InvocationContext, type JsonValue }",
  "../src/workbench/native-modules.js { loadWorkbenchNative }",
  "../src/workbench/providers/forge.js { type ForgeReadClient, registerForgeGateStatus }",
  "../src/workbench/providers/furnace.js { type FurnaceReadClient, registerFurnaceRunInspect }",
  "../src/workbench/providers/hyperunix.js { type HyperUnixReader, registerHyperUnixFind }",
  "../src/workbench/providers/reactivefiber.js { nativeReactiveFiberPreview, nativeReactiveFiberRender, REACTIVE_FIBER_CONTRACT_SOURCE, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerReactiveFiberRender }",
  "./helpers/edc-static-reach-readers.js * as READERS",
  "./helpers/rf-render-fixture.js { fullShapeRf }",
  "./helpers/scratch.js { installScratchLeakGuard, makeScratch, removeScratch }",
];
/** This file's top-level statements that neither import nor declare a name, in source order, as topLevelToken reads them (A5
 * holds this file's own source to it). */
const TOP_LEVEL_CALLS: readonly string[] = [
  "installScratchLeakGuard()",
  "afterEach(<function>)",
  'describe("wb-pyel.5 render-abort falsifier (SDK-EVIDENCE-DIRECTED-COMPUTATION-R12) and its until-then trigger", <function>)',
];
/** The form every rf launch of a render pass takes: `--workspace <root> context render <selector> --no-commit --no-input --json`. */
const RENDER_VERB = ["context", "render"];
const UNCOMMITTED_TAIL = ["--no-commit", "--no-input", "--json"];
/** The registry deadline of the deadline scenario (ms). */
const REGISTRY_DEADLINE_MS = 250;
/** A bound on every wait for a stand-in's progress mark (ms); a pass that never reaches its mark reds by name. */
const WAIT_MS = 45_000;
/** A bound on every stand-in's own life (ms), past WAIT_MS: a stand-in nobody stopped exits by itself (unmarked), and so does
 * one whose parent is gone. */
const STAND_IN_BOUND_MS = WAIT_MS + 15_000;

/** Every entry of the render module that runs a render, as the falsifier drives it. */
const PASSES = ["native-registry", "native-direct", "native-preview", "injected-registry", "injected-direct"] as const;
type PassId = (typeof PASSES)[number];
/** The export each pass enters through (held both ways to the render module's exported functions). */
const ENTRY: Readonly<Record<PassId, string>> = {
  "native-registry": "registerNativeReactiveFiberRender",
  "native-direct": "nativeReactiveFiberRender",
  "native-preview": "nativeReactiveFiberPreview",
  "injected-registry": "registerReactiveFiberRender",
  "injected-direct": "registerReactiveFiberRender",
};
/** The passes that own the envelope's admission (the injected passes relay their reader's; R-INJECTED-RELAY). */
const NATIVE_PASSES: readonly PassId[] = ["native-registry", "native-direct", "native-preview"];
/** The passes that go through a CapabilityRegistry (the only ones an admission slot or a registry deadline can hold). */
const REGISTRY_PASSES: readonly PassId[] = ["native-registry", "injected-registry"];
const SCENARIOS = ["before", "running", "proposed", "queued", "deadline", "settled"] as const;
type ScenarioId = (typeof SCENARIOS)[number];
const KIND: Readonly<Record<ScenarioId, "aborted" | "suspended" | "settled">> = {
  before: "aborted",
  running: "aborted",
  proposed: "aborted",
  queued: "suspended",
  deadline: "suspended",
  settled: "settled",
};
/** Which scenarios drive each pass: running needs a child process (native), queued an admission slot, deadline a registry. */
const DRIVEN: Readonly<Record<PassId, readonly ScenarioId[]>> = {
  "native-registry": ["before", "running", "proposed", "queued", "settled"],
  "native-direct": ["before", "running", "proposed", "settled"],
  "native-preview": ["before", "running", "proposed", "settled"],
  "injected-registry": ["before", "proposed", "queued", "deadline", "settled"],
  "injected-direct": ["before", "proposed", "settled"],
};
const VIOLATIONS = [
  "committed-after-abort",
  "committed-proposal",
  "committing-launch",
  "started-after-abort",
  "extra-launch",
  "foreign-launch",
  "host-write",
] as const;
type Violation = (typeof VIOLATIONS)[number];
/** The acceptance clause each violation class answers. */
const CLAUSE_OF: Readonly<Record<Violation, "commit" | "effect">> = {
  "committed-after-abort": "commit",
  "committed-proposal": "commit",
  "committing-launch": "effect",
  "started-after-abort": "effect",
  "extra-launch": "effect",
  "foreign-launch": "effect",
  "host-write": "effect",
};
/** The committed forms a settled native pass must refuse: each edits the uncommitted proposal into one form a clause of the
 * uncommitted reading names (ephemeral exactly true: false, absent, null, a string, a number; render_id exactly null: an id,
 * empty, absent, a number; commit_seq absent or exactly null: a count, zero, a string; a work object whose
 * storage_write_count is exactly 0: a count, absent, a string, null, negative; work absent; result absent). The first four
 * are cut #2's. */
const COMMITTED_FORMS = [
  "commit_seq",
  "render_id",
  "ephemeral",
  "storage_write_count",
  "ephemeral-absent",
  "ephemeral-null",
  "ephemeral-string",
  "ephemeral-number",
  "render_id-empty",
  "render_id-absent",
  "render_id-number",
  "commit_seq-zero",
  "commit_seq-string",
  "storage_write_count-absent",
  "storage_write_count-string",
  "storage_write_count-null",
  "storage_write_count-negative",
  "work-absent",
  "result-absent",
] as const;
type CommittedForm = (typeof COMMITTED_FORMS)[number];
/** Builtins that read or write the host (files, sockets, processes, threads); others (crypto, util) are pure here. */
const IO_BUILTINS = ["child_process", "cluster", "dgram", "dns", "fs", "fs/promises", "http", "http2", "https", "net", "tls", "worker_threads"];
/** The TSX SDK's package (ReactiveFiberTSXSDK package.json name) and the charter's hook and descriptor forms. */
const TSX_SDK = "@reactive-fiber/tsx";
const HOOK_NAME = /^use[A-Z]/;
/** A use-prefixed word inside a text: the charter's hook names spelled as a key, an argument or prose. */
const HOOK_WORD = /(?:^|[^A-Za-z0-9_$])(use[A-Z][A-Za-z0-9_$]*)/;
const DESCRIPTOR_NAME = "pureProjectRequirement";
const SCRIPT_MODULE = /\.(?:ts|mts|cts|tsx|js|mjs|cjs|jsx)$/i;
const COMPONENT_MODULE = /\.(?:tsx|jsx)$/i;
/** Paths git's index must hold for T1's listing to be the whole index (a floor, never the exact set). */
const REQUIRED_TRACKED = ["package.json", "src/index.ts", RENDER_MODULE, "test/helpers/scratch.ts", "docs/workbench/07-native-integrations.md"];
/** Row T's static readers (T2, T3) read every tracked script module outside this tree (R-UNREAD-HOMES names it). */
const UNREAD_TREE = "test/";
/** Modules the static read set must hold, one per read home (src, qa, examples, the root configs): a floor, never the set. */
const REQUIRED_READ = ["src/index.ts", RENDER_MODULE, "qa/workbench/dependency-census.mjs", "examples/workflows/compose.js", "vitest.config.ts"];
const FLOORS = { tracked: 900, srcModules: 100, readModules: 160, descriptors: 8 };
const TRIGGER =
  "row T read a Pi-authored EDC component/hook surface: wb-pyel.5's acceptance is owed on it - drive its render passes through the render-abort falsifier (row A, PASSES) and re-measure this census";

/** Residual families and the quiet-row pins that hold them. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-INJECTED-RELAY": ["Q1"],
  "R-STATED-EFFECTS": ["Q2"],
  "R-HOOK-VOCABULARY": ["Q3"],
  "R-STAND-IN": ["Q4"],
  "R-HOST-ELSEWHERE": ["Q5"],
  "R-STATIC-FORMS": ["Q6"],
  "R-UNREAD-HOMES": ["Q7"],
};
/** A5's planted module: each static reader must find its own sites in it (and skip what it must not read). */
const PLANTED_REACH = [
  'import { spawn as run, execFileSync } from "node:child_process";',
  'import * as cp from "child_process";',
  'import childProcess from "node:child_process";',
  'import cpEquals = require("child_process");',
  'export { exec as reexported } from "node:child_process";',
  'export * from "./planted-peer.js";',
  'import q = require("planted-required");',
  'const lazy = await import("planted-lazy");',
  'const LAZY_NAME = "planted-const-lazy";',
  "const constLazy = await import(LAZY_NAME);",
  "const computedLazy = await import(pickName());",
  'const required = require("planted-require-call");',
  'const { spawnSync: launchSync } = require("node:child_process");',
  'const loaded = process.getBuiltinModule("node:child_process");',
  'const TOOL = "hx";',
  'const SHELLS = flag ? ["cmd", "/c"] : ["sh", "-c"];',
  'const PICKED = flag ? "git" : "forge";',
  'run("hx", []);',
  'run("rf", []);',
  "execFileSync(command);",
  'cp.fork("worker.js");',
  "cp.exec(PICKED);",
  "childProcess.execFileSync(TOOL);",
  'cpEquals.exec("git");',
  "launchSync(SHELLS[0]);",
  'loaded.spawn("rf");',
  "const alias = run;",
  'ServerConnection.spawn("forge");',
  'pi.exec("git", []);',
  "pi.exec(SHELLS[0], []);",
  "manager.spawn(pi);",
  'const reply = await fetch("https://example.invalid/");',
  'const socket = new WebSocket("wss://example.invalid/");',
  "const viaGlobal = globalThis.fetch;",
  'const viaIndex = self["XMLHttpRequest"];',
  "const holder = global;",
  "const code = eval(source);",
  'const fs = process.getBuiltinModule("node:fs");',
  "const env = process.env;",
  "settings.fetch = 1;",
  "const typed: typeof globalThis.fetch = reply;",
  "class PlantedNamedChild extends run {}",
  "class PlantedNamespaceChild extends cp.ChildProcess {}",
  "class PlantedDefaultChild extends childProcess.ChildProcess {}",
  "class PlantedEqualsChild extends cpEquals.ChildProcess {}",
  "class PlantedLoadedChild extends loaded.ChildProcess {}",
  "const PlantedExpressionChild = class extends cp.ChildProcess {};",
  "class PlantedSocketChild extends WebSocket {}",
  "class PlantedGlobalChild extends globalThis.EventTarget {}",
  "class PlantedProcessChild extends process.constructor {}",
  "const instantiated = run<never>;",
  'instantiated("rf");',
  "class PlantedTypedChild implements cp.ChildProcess {}",
  "interface PlantedShape extends WebSocket, NodeJS.Process {}",
  "class PlantedTypeArgument extends Base<typeof globalThis.fetch> {}",
  "",
].join("\n");
/** Q6's probes, one per form the readers A5 composes do not parse (R-STATIC-FORMS); each is read through every reader. */
const STATIC_RESIDUE: Readonly<Record<string, string>> = {
  "unbound-api-launch": "export function run(api: { exec(command: string): void }, command: string): void { api.exec(command); }\n",
  "unbound-value-launch": 'export function run(pick: () => (command: string) => void): void { const launch = pick(); launch("rf"); }\n',
  "package-launcher": 'import { execa } from "execa";\nexport const run = (): unknown => execa("rf");\n',
  "constructor-chain-global": 'export const reach = (): unknown => "".constructor.constructor("return this")();\n',
  "env-write": 'export function run(): void { process.env.PLANTED = "1"; }\n',
  "argument-carried": 'import { spawn } from "node:child_process";\nexport const run = (): unknown => spawn("sh", ["-c", "rf context render --json"]);\n',
  "other-builtin-launch": 'import cluster from "node:cluster";\nexport const run = (): unknown => cluster.fork();\n',
  "unparsed-loader": "export const load = (name: string): unknown => Reflect.apply(require, undefined, [name]);\n",
  "aliased-loader": "export function load(name: string): unknown {\n  const read = require;\n  return read(name);\n}\n",
  "renamed-loader-factory": 'import { createRequire as make } from "node:module";\nexport const load = (name: string): unknown => make(import.meta.url)(name);\n',
  "held-loader-factory": 'import { createRequire } from "node:module";\nconst loaders = { load: createRequire(import.meta.url) };\nexport const load = (name: string): unknown => loaders.load(name);\n',
  "composed-code": "export const run = (code: string): unknown => new Function(code)();\n",
  "process-binding": 'export const raw = (): unknown => process.binding("spawn_sync");\n',
};
/** Q3's probes: hooks and descriptors spelled outside the forms T2 and T3 read. */
const OTHER_HOOKS =
  'export function evidenceHook() { return describeRequirement(view); }\nconst makeEvidenceDescriptor = () => ({ need: 1 });\nconst composedHook = "use" + "Provider";\nconst pattern = /useQuery/;\n// useCommit\n';
/** A hook and an interest spelled with a look-alike letter NFKC does not fold (U+0435 for the Latin e), composed at run time
 * so this file stays ASCII. */
const LOOKALIKE_E = String.fromCodePoint(0x0435);
const OTHER_LOOKALIKE = `export function us${LOOKALIKE_E}Provider(): void {}\nexport const description = "Describes a logical ${LOOKALIKE_E}vidence requirement";\n`;
const OTHER_PHRASES = "states an evidence need and a resource demand for the next render";
/** A descriptor text composed from pieces at run time, and the TSX SDK named only in pieces joined at run time. */
const OTHER_COMPOSED = 'export const description = "Describes a logical evidence " + "requirement for the next render";\n';
const OTHER_LOADER = 'import { createRequire } from "node:module";\nconst tsx = createRequire(import.meta.url)(["@reactive-fiber", "tsx"].join("/"));\n';
/** A descriptor's interests spelled only in a regular-expression literal and a comment (neither a string, a template part, an
 * identifier nor a key). */
const OTHER_UNREAD_TEXT = "export const description = /Describes a logical evidence requirement/.source;\n// and a prospective resource interest for the next render\n";
/** Q7's probes: one path per home row T's static readers do not read (test/, and non-script files anywhere). */
const UNREAD_HOME_PROBES = ["test/helpers/edc-evidence-hooks.ts", "test/workbench-edc-descriptor.test.ts", "src/workbench/edc/descriptor.json", "examples/edc/hooks.md", "qa/workbench/edc-descriptor.yaml", "bin/edc-evidence-hooks"];
/** T4's planted samples, each of which its reader must find. */
const PLANTED_PATHS = ["src/edc/EvidencePanel.tsx", "examples/Card.JSX", "src/edc/panel.ts", "docs/hooks.md"];
const PLANTED_SOURCE = `import { useQuery } from "${TSX_SDK}";\nexport function useRequirement(view: unknown) { return pureProjectRequirement(view); }\nconst panel = () => useProvider("evidence-view", {});\n`;
const PLANTED_MANIFEST: JsonObject = {
  name: "planted",
  dependencies: { [TSX_SDK]: "1.0.0" },
  devDependencies: { [TSX_SDK]: "1.0.0" },
  peerDependencies: { [TSX_SDK]: "1.0.0" },
  optionalDependencies: { [TSX_SDK]: "1.0.0" },
  bundleDependencies: [TSX_SDK],
  bundledDependencies: [TSX_SDK],
};
const PLANTED_LOCK: JsonObject = { packages: { "": { name: "planted" }, [`node_modules/${TSX_SDK}`]: { version: "1.0.0" } } };
const PLANTED_DESCRIPTION = "Describes a logical evidence requirement for the next render";
/** A planted descriptor key spelling the other interest in camel case (read in the joined fold, keys included). */
const PLANTED_KEY = "prospectiveResourceInterest";
/** One path per read home (src, qa, examples, a root config): the static readers' home predicate must read each. */
const PLANTED_HOMES = ["src/workbench/edc/evidence-hooks.ts", "qa/workbench/edc-hooks.mjs", "examples/edc/evidence-hooks.ts", "examples/edc/evidence-hooks.JS", "vitest.edc.config.ts"];
/** A descriptor registered by a module neither read registration wires in: T3's static reader must read its text. */
const PLANTED_DESCRIPTOR_SOURCE =
  'export function registerEvidence(registry: Registry): void {\n  registry.register({ descriptor: { id: "edc.evidence", description: "Describes a logical evidence requirement for the next render", inputSchema: { properties: { prospectiveResourceInterest: {} } } } });\n}\n';
/** The TSX SDK loaded through a require call: T2's specifier reader must read it. */
const PLANTED_REQUIRE = `const tsx = require("${TSX_SDK}");\n`;
/** Hook names spelled as text (a key, an argument, a word in prose) and the TSX SDK loaded through a createRequire result
 * called directly: T2's hook reader must read each. */
const PLANTED_STRING_HOOKS = 'export const hooks = { "useProvider": (): number => 1 };\nregistry.hook("useQuery", () => 2);\nexport const note = "call usePlanted() first";\n';
const PLANTED_LOADER = `import { createRequire } from "node:module";\nconst tsx = createRequire(import.meta.url)("${TSX_SDK}");\n`;
/** One planted top-level statement per declaration kind declaredBy reads, with the names it declares - a variable statement's
 * at any binding-pattern depth (object and array patterns, nested, with a default, rest elements and a hole), a function's, a
 * class's, an interface's, a type alias's, an enum's, a namespace's and an import-equals declaration's - and three that declare
 * none (an import declaration, a nameless default function, an expression statement): A5 holds declaredBy to each, so a kind's
 * leg dropped reds A5. */
const DECLARATION_KINDS: readonly { readonly kind: string; readonly statement: string; readonly names: readonly string[] }[] = [
  { kind: "variable", statement: "let plantedVariable = 1, plantedSecond: number;", names: ["plantedVariable", "plantedSecond"] },
  { kind: "object pattern", statement: "const { plantedKey, nested: { plantedDeep = 0 }, ...plantedRest } = plantedObject;", names: ["plantedKey", "plantedDeep", "plantedRest"] },
  { kind: "array pattern", statement: "const [plantedFirst, , [plantedInner], ...plantedTail] = plantedArray;", names: ["plantedFirst", "plantedInner", "plantedTail"] },
  { kind: "function", statement: "function plantedFunction(): void {}", names: ["plantedFunction"] },
  { kind: "class", statement: "class PlantedClass {}", names: ["PlantedClass"] },
  { kind: "interface", statement: "interface PlantedInterface {}", names: ["PlantedInterface"] },
  { kind: "type alias", statement: "type PlantedType = string;", names: ["PlantedType"] },
  { kind: "enum", statement: "enum PlantedEnum {\n  Read = 0,\n}", names: ["PlantedEnum"] },
  { kind: "namespace", statement: "namespace PlantedNamespace {\n  export const read = 1;\n}", names: ["PlantedNamespace"] },
  { kind: "import-equals", statement: "import plantedAlias = PlantedNamespace.read;", names: ["plantedAlias"] },
  { kind: "import declaration", statement: 'import { plantedImport } from "./planted.js";', names: [] },
  { kind: "nameless function", statement: "export default function (): void {}", names: [] },
  { kind: "expression statement", statement: 'Reflect.set(globalThis, "PLANTED", (): number => 1);', names: [] },
];
/** A source A5 reads as this file (at SELF's path), one statement per form a second binding or a copy of the helper's readers
 * takes at the top level: a second import of the helper spelled without an extension (the gate's GT6) and one spelled .ts
 * from the parent directory, an import of another module, an import-equals alias of a helper reader (GT5), an expression
 * statement holding a copy on a global (GT1, GT2), an enum, a namespace and a binding pattern (W-DN-ENUM, W-DN-NS,
 * W-DN-PATTERN), and a dynamic import of the helper. A5's witness holds the composition's reading of it. */
const PLANTED_COMPOSITION = [
  'import * as READERS from "./helpers/edc-static-reach-readers.js";',
  'import { ioGlobalReferences as ownIoReader } from "./helpers/edc-static-reach-readers";',
  'import type { LaunchSite } from "../test/helpers/edc-static-reach-readers.ts";',
  'import { makeScratch } from "./helpers/scratch.js";',
  "import processReferences = READERS.processReferences;",
  'Reflect.set(globalThis, "EDC_PROCESS_COPY", (module: string): string[] => [module]);',
  "enum OwnEnum {\n  Read = 0,\n}",
  "namespace OwnReaders {\n  export const read = ownIoReader;\n}",
  "const { process: ownProcessReader } = { process: processReferences };",
  'const loaded = import("./helpers/edc-static-reach-readers");',
].join("\n");

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** Every name this file's top-level statements declare, in source order (A5 holds this file's own source to it). */
const OWN_DECLARATIONS: readonly string[] = [
  "JsonObject", "Envelope", "HERE", "REPO", "ROSTER_PATH", "BEAD", "PREVIEW", "GRANTS", "RENDER_MODULE", "NATIVE_LOADER",
  "SELF", "HELPER", "HELPER_SPECIFIER", "TSCONFIG", "IMPORTS", "TOP_LEVEL_CALLS", "RENDER_VERB", "UNCOMMITTED_TAIL",
  "REGISTRY_DEADLINE_MS", "WAIT_MS",
  "STAND_IN_BOUND_MS", "PASSES", "PassId", "ENTRY", "NATIVE_PASSES", "REGISTRY_PASSES", "SCENARIOS", "ScenarioId", "KIND",
  "DRIVEN", "VIOLATIONS", "Violation", "CLAUSE_OF", "COMMITTED_FORMS", "CommittedForm", "IO_BUILTINS", "TSX_SDK",
  "HOOK_NAME", "HOOK_WORD", "DESCRIPTOR_NAME", "SCRIPT_MODULE", "COMPONENT_MODULE", "REQUIRED_TRACKED", "UNREAD_TREE",
  "REQUIRED_READ", "FLOORS", "TRIGGER", "RESIDUALS", "PLANTED_REACH", "STATIC_RESIDUE", "OTHER_HOOKS", "LOOKALIKE_E",
  "OTHER_LOOKALIKE", "OTHER_PHRASES", "OTHER_COMPOSED", "OTHER_LOADER", "OTHER_UNREAD_TEXT", "UNREAD_HOME_PROBES",
  "PLANTED_PATHS", "PLANTED_SOURCE", "PLANTED_MANIFEST", "PLANTED_LOCK", "PLANTED_DESCRIPTION", "PLANTED_KEY",
  "PLANTED_HOMES", "PLANTED_DESCRIPTOR_SOURCE", "PLANTED_REQUIRE", "PLANTED_STRING_HOOKS", "PLANTED_LOADER", "DECLARATION_KINDS",
  "PLANTED_COMPOSITION", "Row",
  "OWN_DECLARATIONS", "ROWS", "SERVES", "RosterPin", "RosterRow", "Roster", "isObject", "json", "strings", "readRoster",
  "ROSTER", "rosterWitness", "Mode", "Bench", "Launch", "oldPath", "scratches", "reap", "standIn", "rfBody", "bench",
  "launches", "tagOf", "marked", "tree", "until", "bounded", "Reader", "CapturingRegistry", "Pass", "context", "pass",
  "Outcome", "settle", "Observation", "sourceOf", "uncommitted", "uncommittedArgv", "falsify", "outcomeText", "observe",
  "sweep", "sweepOnce", "commitLine", "effectLine", "committedForm", "settledNative", "ArgvShape", "launchRf", "Control",
  "controlObservation", "committedFormControl", "Proposer", "signalIgnoringProvider", "unguarded", "CONTROLS", "git",
  "trackedCache", "trackedPaths", "trackedScriptModules", "walkedScriptModules", "parsed", "parse", "resolveModule",
  "isBuiltin", "closure", "srcSitesCache", "srcLaunchSites", "foreignCache", "foreignCommands", "compilerOptionsCache",
  "compilerOptions", "resolvesToHelper", "declaredBy", "importBindings", "topLevelToken", "Composition", "composition",
  "helperExports", "SourceOf", "ReachReading", "reachReading", "foreignSet", "exportedFunctions", "componentModules",
  "hookMentions", "DEPENDENCY_MAPS", "manifestMentions", "lockMentions", "joinedFold", "textsOf", "phraseMentions",
  "isStaticHome", "staticHomes", "sourcePhraseMentions", "HomeReading", "homeReading", "homesCache", "homesRead", "NEVER",
  "FORGE_CLIENT", "FURNACE_CLIENT", "HX_READER", "RF_INVOKE", "descriptorsOf", "nativeDescriptors", "injectedDescriptors",
  "renderIds", "exportRow", "acceptance", "acceptanceClauses", "titleParts", "REACHED", "IMPL",
];
/** The judged rows; their shape is pinned below and held to the roster and, for A and T, to the bead's export row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "a render-abort falsifier proving zero committed proposals and zero tool/model/host effects from a render pass, with a committed-after-abort attempt going red",
    pins: ["A1", "A2", "A3", "A4", "A5", "A6"],
  },
  { id: "T", label: "a Pi-authored EDC component/hook surface (none exists)", pins: ["T1", "T2", "T3", "T4"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
];
/** The acceptance clause each row A pin serves (held both ways to the acceptance sentence's three clauses). */
const SERVES: Readonly<Record<string, string>> = {
  A1: "zero committed proposals",
  A2: "zero committed proposals",
  A3: "zero committed proposals",
  A4: "zero tool/model/host effects from a render pass",
  A5: "zero tool/model/host effects from a render pass",
  A6: "a committed-after-abort attempt going red",
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

// ---- the bench: a workspace root and a hermetic PATH of logging stand-ins ----

type Mode = "settled" | "running" | "proposed" | "late";
interface Bench {
  readonly bin: string;
  /** The bench home: a scratch directory holding the workspace root alone; host-write fingerprints this whole tree. */
  readonly home: string;
  readonly root: string;
  readonly log: string;
}
interface Launch {
  readonly bin: string;
  readonly argv: readonly string[];
}
const oldPath = process.env.PATH;
const scratches: string[] = [];
/** Stops every stand-in a bench directory's pids file names that still runs - only a process whose /proc command line names
 * that directory, so a reused pid is never touched - and returns how many it stopped: a pass that ignored its abort leaves no
 * process behind. */
function reap(dir: string): number {
  const file = join(dir, "pids");
  if (!existsSync(file)) return 0;
  let stopped = 0;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const pid = Number(line);
    if (!Number.isInteger(pid) || pid <= 0) continue;
    let command: string;
    try {
      command = readFileSync(`/proc/${pid}/cmdline`, "utf8");
    } catch {
      continue;
    }
    if (!command.includes(dir)) continue;
    try {
      process.kill(pid, "SIGKILL");
      stopped += 1;
    } catch {
      // the stand-in exited between the read and the stop
    }
  }
  return stopped;
}
afterEach(() => {
  process.env.PATH = oldPath;
  const removed = scratches.splice(0);
  for (const dir of removed) reap(dir);
  removeScratch(...removed);
});

/** A stand-in command in the bench: it logs {bin, argv}, marks `stopped.<tag>` and exits 0 on SIGTERM, appends its pid to the
 * bench's pids file, exits by itself (code 3) past STAND_IN_BOUND_MS or when its parent is gone, then runs `body`. */
function standIn(bench: Bench, name: string, body: string): void {
  const script = join(bench.bin, name);
  writeFileSync(
    script,
    [
      `#!${process.execPath}`,
      '"use strict";',
      'const fs = require("node:fs");',
      `const dir = ${JSON.stringify(bench.bin)};`,
      "const argv = process.argv.slice(2);",
      `fs.appendFileSync(${JSON.stringify(bench.log)}, JSON.stringify({ bin: ${JSON.stringify(name)}, argv }) + "\\n");`,
      'const at = argv.findIndex(arg => arg === "--task" || arg === "--task-id");',
      'const tag = at === -1 ? "untagged" : argv[at + 1];',
      'const mark = name => fs.writeFileSync(dir + "/" + name + "." + tag, "");',
      'process.on("SIGTERM", () => { mark("stopped"); process.exit(0); });',
      'fs.appendFileSync(dir + "/pids", process.pid + "\\n");',
      "const parent = process.ppid;",
      "const born = Date.now();",
      `setInterval(() => { if (process.ppid !== parent || Date.now() - born > ${STAND_IN_BOUND_MS}) process.exit(3); }, 250).unref();`,
      body,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
}
/** The stand-in rf's behaviour after it logged: print and exit, mark and wait, print then mark and wait, or print then wait
 * for a release file (the control that outlives a dropped signal). */
function rfBody(mode: Mode, envelope: JsonValue): string {
  const print = `process.stdout.write(${JSON.stringify(JSON.stringify(envelope))}`;
  switch (mode) {
    case "settled":
      return `${print}, () => process.exit(0));`;
    case "running":
      return 'mark("started"); setInterval(() => {}, 1000);';
    case "proposed":
      return `${print}, () => { mark("proposed"); setInterval(() => {}, 1000); });`;
    case "late":
      return `${print}, () => { mark("proposed"); const wait = setInterval(() => { if (fs.existsSync(dir + "/release." + tag)) { clearInterval(wait); process.exit(0); } }, 20); });`;
  }
}
/** A fresh bench whose rf behaves as `mode` and prints `envelope(root)`; PATH then holds the bench directory alone. */
function bench(mode: Mode, envelope: (root: string) => JsonValue = fullShapeRf): Bench {
  const bin = makeScratch("edc-render-abort-bin-");
  const home = makeScratch("edc-render-abort-home-");
  scratches.push(bin, home);
  const root = join(home, "root");
  mkdirSync(join(root, "notes"), { recursive: true });
  writeFileSync(join(root, "README.md"), "workspace seed\n");
  writeFileSync(join(root, "notes", "seed.txt"), "seed\n");
  const made: Bench = { bin, home, root, log: join(bin, "launches.jsonl") };
  standIn(made, "rf", rfBody(mode, envelope(root)));
  for (const name of foreignCommands()) standIn(made, name, "process.exit(0);");
  process.env.PATH = bin;
  return made;
}
function launches(made: Bench): Launch[] {
  if (!existsSync(made.log)) return [];
  return readFileSync(made.log, "utf8")
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => JSON.parse(line) as Launch);
}
function tagOf(argv: readonly string[]): string {
  const at = argv.findIndex(arg => arg === "--task" || arg === "--task-id");
  return at === -1 ? "untagged" : (argv[at + 1] ?? "untagged");
}
function marked(made: Bench, mark: string, tag: string): boolean {
  return existsSync(join(made.bin, `${mark}.${tag}`));
}
/** A tree (the bench home): every path (kind and bytes) in name order, hashed. */
function tree(root: string): string {
  const hash = createHash("sha256");
  const walk = (dir: string): void => {
    const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(dir, entry.name);
      hash.update(`${relative(root, path)}\u0000${entry.isDirectory() ? "d" : entry.isFile() ? "f" : "o"}\u0000`);
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) hash.update(readFileSync(path));
    }
  };
  walk(root);
  return hash.digest("hex");
}
async function until(check: () => boolean, what: string): Promise<void> {
  const start = Date.now();
  while (!check()) {
    if (Date.now() - start > WAIT_MS) throw new Error(`census: ${what} not reached within ${WAIT_MS} ms`);
    await new Promise(resolve => setTimeout(resolve, 10));
  }
}
/** A pass bounded by WAIT_MS: a pass that never settles reds naming itself, never at vitest's test timeout. */
async function bounded<T>(promise: Promise<T>, what: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const limit = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`census: ${what} did not settle within ${WAIT_MS} ms`)), WAIT_MS);
  });
  try {
    return await Promise.race([promise, limit]);
  } finally {
    clearTimeout(timer);
  }
}

/** The injected registration's reader: counts its calls; a held reader answers only when released. */
class Reader {
  calls = 0;
  private readonly waiting: (() => void)[] = [];
  constructor(
    private readonly root: string,
    private readonly hold: boolean,
    private readonly envelope: (root: string) => JsonValue = fullShapeRf,
  ) {}
  readonly read = (): Promise<Envelope> => {
    this.calls += 1;
    const value = JSON.parse(JSON.stringify(this.envelope(this.root))) as Envelope;
    if (!this.hold) return Promise.resolve(value);
    return new Promise(resolve => {
      this.waiting.push(() => resolve(value));
    });
  };
  release(): void {
    for (const answer of this.waiting.splice(0)) answer();
  }
}
/** A registry that also keeps each provider as registered, so the injected provider can be driven bare. */
class CapturingRegistry extends CapabilityRegistry {
  readonly captured: CapabilityProvider[] = [];
  override register(provider: CapabilityProvider): void {
    this.captured.push(provider);
    super.register(provider);
  }
}
interface Pass {
  readonly run: (tag: string, signal: AbortSignal) => Promise<JsonValue>;
  readonly registry: CapabilityRegistry | undefined;
}
function context(signal: AbortSignal): InvocationContext {
  return { grants: [...GRANTS], signal };
}
/** One pass of the render module, entered through ENTRY[id], on `made` (and `reader`, for the injected passes). */
async function pass(id: PassId, made: Bench, limits: CapabilityLimits, reader: Reader | undefined): Promise<Pass> {
  switch (id) {
    case "native-registry": {
      const registry = new CapabilityRegistry(limits);
      (await loadWorkbenchNative()).registerNativeProviders(registry, made.root);
      return { registry, run: (tag, signal) => registry.invoke(PREVIEW, { model: "m", task: tag }, context(signal)) };
    }
    case "native-direct":
      return { registry: undefined, run: (tag, signal) => nativeReactiveFiberRender({ model: "m", task: tag }, made.root, signal) };
    case "native-preview":
      return { registry: undefined, run: (tag, signal) => nativeReactiveFiberPreview("m", tag, made.root, signal) };
    case "injected-registry": {
      if (reader === undefined) throw new Error("census: an injected pass needs its reader");
      const registry = new CapabilityRegistry(limits);
      registerReactiveFiberRender(registry, reader.read, made.root);
      return { registry, run: (tag, signal) => registry.invoke(PREVIEW, { model: "m", task: tag }, context(signal)) };
    }
    case "injected-direct": {
      if (reader === undefined) throw new Error("census: an injected pass needs its reader");
      const capture = new CapturingRegistry();
      registerReactiveFiberRender(capture, reader.read, made.root);
      const provider = capture.captured[0];
      if (provider === undefined) throw new Error("census: the injected registration registered nothing");
      return { registry: undefined, run: (tag, signal) => provider.invoke({ model: "m", task: tag }, context(signal)) };
    }
  }
}

// ---- observations and the falsifier ----

type Outcome = { readonly kind: "returned"; readonly value: JsonValue } | { readonly kind: "refused"; readonly category: string; readonly message: string };
async function settle(run: Promise<JsonValue>): Promise<Outcome> {
  try {
    return { kind: "returned", value: await run };
  } catch (error) {
    return {
      kind: "refused",
      category: error instanceof CapabilityError ? error.category : "thrown",
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
interface Observation {
  readonly pass: string;
  readonly scenario: ScenarioId;
  /** Whether the pass owns its envelope's admission (native) or relays a reader's (injected). */
  readonly native: boolean;
  readonly outcome: Outcome;
  /** The rf launches carrying this pass's tag, and every launch of any other stand-in. */
  readonly launches: readonly Launch[];
  readonly foreign: readonly Launch[];
  readonly readerCalls: number;
  readonly hostChanged: boolean;
  /** Whether the pass's rf child received the stop (SIGTERM). */
  readonly stopped: boolean;
  readonly cancelledWhileQueued: number | undefined;
  /** What held when the abort (or the deadline) fired: the stand-in's marks, the reader's state, the slot holder; "-" for none. */
  readonly atAbort: string;
}
function sourceOf(value: JsonValue): JsonObject | undefined {
  return isObject(value) && isObject(value.source) ? (value.source as JsonObject) : undefined;
}
/** The returned reading states the uncommitted form: ephemeral, no render_id, no commit_seq, no store write. */
function uncommitted(value: JsonValue): boolean {
  const result = sourceOf(value)?.result;
  if (!isObject(result)) return false;
  const work = result.work;
  return (
    result.ephemeral === true &&
    result.render_id === null &&
    (!Object.hasOwn(result, "commit_seq") || result.commit_seq === null) &&
    isObject(work) &&
    work.storage_write_count === 0
  );
}
function uncommittedArgv(argv: readonly string[]): boolean {
  return (
    argv[0] === "--workspace" &&
    RENDER_VERB.every((word, index) => argv[2 + index] === word) &&
    UNCOMMITTED_TAIL.every((flag, index) => argv[argv.length - UNCOMMITTED_TAIL.length + index] === flag)
  );
}
/** The verdict: every violation class the observation shows, in VIOLATIONS order. */
function falsify(seen: Observation): Violation[] {
  const stoppedPass = KIND[seen.scenario] !== "settled";
  const unstarted = seen.scenario === "before" || seen.scenario === "queued";
  const found = new Set<Violation>();
  if (stoppedPass && seen.outcome.kind === "returned") found.add("committed-after-abort");
  if (seen.outcome.kind === "returned" && seen.native && !uncommitted(seen.outcome.value)) found.add("committed-proposal");
  if (seen.launches.some(launch => !uncommittedArgv(launch.argv))) found.add("committing-launch");
  if (unstarted && seen.launches.length + seen.readerCalls > 0) found.add("started-after-abort");
  if (seen.launches.length + seen.readerCalls > 1) found.add("extra-launch");
  if (seen.foreign.length > 0) found.add("foreign-launch");
  if (seen.hostChanged) found.add("host-write");
  return VIOLATIONS.filter(violation => found.has(violation));
}
function outcomeText(outcome: Outcome): string {
  return outcome.kind === "returned" ? "returned" : `refused ${outcome.category}: ${outcome.message}`;
}

/** Drives pass `id` through `scenario` on a fresh bench and records what reached the caller and what it caused. */
async function observe(id: PassId, scenario: ScenarioId): Promise<Observation> {
  const native = NATIVE_PASSES.includes(id);
  const mode: Mode = scenario === "running" || scenario === "queued" ? "running" : scenario === "proposed" ? "proposed" : "settled";
  const made = bench(native ? mode : "settled");
  const reader = native ? undefined : new Reader(made.root, scenario !== "settled");
  const limits: CapabilityLimits = scenario === "queued" ? { maxInFlight: 1 } : scenario === "deadline" ? { deadlineMs: REGISTRY_DEADLINE_MS } : {};
  const driven = await pass(id, made, limits, reader);
  const before = tree(made.home);
  const tag = `${id}-${scenario}`;
  const controller = new AbortController();
  let callsBefore = 0;
  let atAbort = "-";
  let outcome: Outcome;
  switch (scenario) {
    case "before":
      controller.abort();
      outcome = await bounded(settle(driven.run(tag, controller.signal)), `${tag}: the pass`);
      break;
    case "settled":
      outcome = await bounded(settle(driven.run(tag, controller.signal)), `${tag}: the pass`);
      break;
    case "running":
    case "proposed": {
      const running = settle(driven.run(tag, controller.signal));
      if (reader !== undefined) await until(() => reader.calls === 1, `${tag}: the reader was called`);
      else await until(() => marked(made, scenario === "running" ? "started" : "proposed", tag), `${tag}: the stand-in's ${scenario} mark`);
      atAbort =
        reader !== undefined
          ? `reader called ${reader.calls}, unanswered`
          : ["started", "proposed"].filter(mark => marked(made, mark, tag)).join("+") || "no mark";
      controller.abort();
      reader?.release();
      outcome = await bounded(running, `${tag}: the pass`);
      if (reader === undefined) await until(() => marked(made, "stopped", tag), `${tag}: the stand-in's stop`);
      break;
    }
    case "queued": {
      const holder = new AbortController();
      const holderTag = `${tag}-holder`;
      const held = settle(driven.run(holderTag, holder.signal));
      if (reader !== undefined) await until(() => reader.calls === 1, `${holderTag}: the reader was called`);
      else await until(() => marked(made, "started", holderTag), `${holderTag}: the stand-in's started mark`);
      callsBefore = reader?.calls ?? 0;
      const queued = settle(driven.run(tag, controller.signal));
      const slots = driven.registry?.admission();
      atAbort = `slot holder in flight ${slots?.inFlight ?? "?"} of ${slots?.maxInFlight ?? "?"}, admitted ${slots?.admitted ?? "?"}`;
      controller.abort();
      outcome = await bounded(queued, `${tag}: the queued pass`);
      holder.abort();
      reader?.release();
      await bounded(held, `${holderTag}: the slot holder`);
      if (reader === undefined) await until(() => marked(made, "stopped", holderTag), `${holderTag}: the stand-in's stop`);
      break;
    }
    case "deadline":
      outcome = await bounded(settle(driven.run(tag, controller.signal)), `${tag}: the pass`);
      atAbort = reader === undefined ? "no reader" : `reader called ${reader.calls}, unanswered`;
      reader?.release();
      break;
  }
  const all = launches(made);
  return {
    pass: id,
    scenario,
    native,
    outcome,
    launches: all.filter(launch => launch.bin === "rf" && tagOf(launch.argv) === tag),
    foreign: all.filter(launch => launch.bin !== "rf"),
    readerCalls: (reader?.calls ?? 0) - callsBefore,
    hostChanged: tree(made.home) !== before,
    stopped: marked(made, "stopped", tag),
    cancelledWhileQueued: driven.registry?.admission().cancelledWhileQueued,
    atAbort,
  };
}
let sweep: Promise<Observation[]> | undefined;
/** Every pass through every scenario DRIVEN names, once per file, in PASSES order. */
function sweepOnce(): Promise<Observation[]> {
  sweep ??= (async () => {
    const seen: Observation[] = [];
    for (const id of PASSES) for (const scenario of DRIVEN[id]) seen.push(await observe(id, scenario));
    return seen;
  })();
  return sweep;
}
function commitLine(seen: Observation): string {
  const verdict = falsify(seen).filter(violation => CLAUSE_OF[violation] === "commit");
  return `${seen.pass}/${seen.scenario}: at abort ${seen.atAbort} | ${outcomeText(seen.outcome)} | [${verdict.join(", ")}]`;
}
function effectLine(seen: Observation): string {
  const verdict = falsify(seen).filter(violation => CLAUSE_OF[violation] === "effect");
  const uncommittedLaunches = seen.launches.every(launch => uncommittedArgv(launch.argv));
  return (
    `${seen.pass}/${seen.scenario}: launches ${seen.launches.length}${uncommittedLaunches ? "" : " (committing)"}, reader ${seen.readerCalls}, ` +
    `foreign ${seen.foreign.length}, host ${seen.hostChanged ? "changed" : "unchanged"}, stopped ${seen.stopped} | [${verdict.join(", ")}]`
  );
}
/** The uncommitted proposal edited into one committed form. */
function committedForm(form: CommittedForm): (root: string) => JsonValue {
  return root => {
    const envelope = fullShapeRf(root) as JsonObject;
    const result = envelope.result as JsonObject;
    const work = result.work as JsonObject;
    switch (form) {
      case "commit_seq":
        result.commit_seq = 1;
        break;
      case "render_id":
        result.render_id = "rnd_committed";
        break;
      case "ephemeral":
        result.ephemeral = false;
        break;
      case "storage_write_count":
        work.storage_write_count = 1;
        break;
      case "ephemeral-absent":
        Reflect.deleteProperty(result, "ephemeral");
        break;
      case "ephemeral-null":
        result.ephemeral = null;
        break;
      case "ephemeral-string":
        result.ephemeral = "true";
        break;
      case "ephemeral-number":
        result.ephemeral = 1;
        break;
      case "render_id-empty":
        result.render_id = "";
        break;
      case "render_id-absent":
        Reflect.deleteProperty(result, "render_id");
        break;
      case "render_id-number":
        result.render_id = 0;
        break;
      case "commit_seq-zero":
        result.commit_seq = 0;
        break;
      case "commit_seq-string":
        result.commit_seq = "1";
        break;
      case "storage_write_count-absent":
        Reflect.deleteProperty(work, "storage_write_count");
        break;
      case "storage_write_count-string":
        work.storage_write_count = "0";
        break;
      case "storage_write_count-null":
        work.storage_write_count = null;
        break;
      case "storage_write_count-negative":
        work.storage_write_count = -1;
        break;
      case "work-absent":
        Reflect.deleteProperty(result, "work");
        break;
      case "result-absent":
        Reflect.deleteProperty(envelope, "result");
        break;
    }
    return envelope;
  };
}
/** One settled native pass on a bench printing `envelope`; the returned reading or the refusal, and the launch argv. */
async function settledNative(id: PassId, envelope: (root: string) => JsonValue, view: boolean): Promise<{ outcome: Outcome; argv: string[][]; root: string }> {
  const made = bench("settled", envelope);
  const tag = `${id}-${view ? "view" : "legacy"}`;
  const signal = new AbortController().signal;
  let run: Promise<JsonValue>;
  if (id === "native-registry") {
    const registry = new CapabilityRegistry();
    (await loadWorkbenchNative()).registerNativeProviders(registry, made.root);
    run = registry.invoke(PREVIEW, view ? { view: "v", taskId: tag } : { model: "m", task: tag }, context(signal));
  } else if (id === "native-direct") {
    run = nativeReactiveFiberRender(view ? { view: "v", taskId: tag } : { model: "m", task: tag }, made.root, signal);
  } else {
    run = nativeReactiveFiberPreview("m", tag, made.root, signal);
  }
  const outcome = await settle(run);
  return { outcome, argv: launches(made).map(launch => launch.argv.map(arg => (arg === made.root ? "<root>" : arg))), root: made.root };
}

// ---- the controls (A6) and the quiet rows' passes ----

/** The argv shapes a hand-built control launches rf with: the uncommitted form, or one edit of it that the form forbids
 * (--no-commit dropped, another verb, another noun, a leading flag other than --workspace, the uncommitted flags present but
 * not last, or last but out of order). */
type ArgvShape = "uncommitted" | "committing" | "other-verb" | "other-noun" | "other-lead" | "misplaced-tail" | "swapped-tail";
function launchRf(made: Bench, tag: string, shape: ArgvShape): JsonValue {
  const select = ["--model", "m", "--task", tag];
  const shapes: Readonly<Record<ArgvShape, readonly string[]>> = {
    uncommitted: ["--workspace", made.root, ...RENDER_VERB, ...select, ...UNCOMMITTED_TAIL],
    committing: ["--workspace", made.root, ...RENDER_VERB, ...select, "--no-input", "--json"],
    "other-verb": ["--workspace", made.root, "context", "commit", ...select, ...UNCOMMITTED_TAIL],
    "other-noun": ["--workspace", made.root, "graph", "render", ...select, ...UNCOMMITTED_TAIL],
    "other-lead": ["--profile", made.root, ...RENDER_VERB, ...select, ...UNCOMMITTED_TAIL],
    "misplaced-tail": ["--workspace", made.root, ...RENDER_VERB, ...UNCOMMITTED_TAIL, ...select],
    "swapped-tail": ["--workspace", made.root, ...RENDER_VERB, ...select, "--no-commit", "--json", "--no-input"],
  };
  const argv = [...shapes[shape]];
  const stdout = execFileSync("rf", argv, { encoding: "utf8", env: { PATH: made.bin } });
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: made.root, source: JSON.parse(stdout) as JsonValue };
}
interface Control {
  readonly expected: readonly Violation[];
  readonly run: () => Promise<Observation>;
}
/** Runs `body` on a fresh bench as a pass of `scenario` and records it like observe does (with `reader`'s calls, if any). */
async function controlObservation(
  name: string,
  scenario: ScenarioId,
  mode: Mode,
  body: (made: Bench, tag: string, controller: AbortController, reader: Reader) => Promise<JsonValue>,
): Promise<Observation> {
  const made = bench(mode);
  const reader = new Reader(made.root, false);
  const before = tree(made.home);
  const tag = `control-${name}`;
  const controller = new AbortController();
  if (scenario === "before") controller.abort();
  const outcome = await bounded(settle(body(made, tag, controller, reader)), `control ${name}`);
  const all = launches(made);
  return {
    pass: `control:${name}`,
    scenario,
    native: true,
    outcome,
    launches: all.filter(launch => launch.bin === "rf" && tagOf(launch.argv) === tag),
    foreign: all.filter(launch => launch.bin !== "rf"),
    readerCalls: reader.calls,
    hostChanged: tree(made.home) !== before,
    stopped: marked(made, "stopped", tag),
    cancelledWhileQueued: undefined,
    atAbort: "-",
  };
}
/** A committed-form control: a settled pass returning the proposal with one field edited into `form`. */
function committedFormControl(form: CommittedForm): Control {
  return {
    expected: ["committed-proposal"],
    run: () =>
      controlObservation(`committed-form-${form}`, "settled", "settled", async made => ({
        contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
        workspaceRoot: made.root,
        source: committedForm(form)(made.root),
      })),
  };
}
/** A proposal a control hands out on demand: the promise the provider returns IS the proposal's, so it settles in the very
 * tick release() runs (no await hop between them). */
class Proposer {
  calls = 0;
  private answer: ((value: JsonValue) => void) | undefined;
  readonly propose = (): Promise<JsonValue> => {
    this.calls += 1;
    return new Promise(resolve => {
      this.answer = resolve;
    });
  };
  release(value: JsonValue): void {
    this.answer?.(value);
  }
}
/** A provider that ignores its signal: it returns the proposer's promise whatever the signal says. */
function signalIgnoringProvider(proposer: Proposer): CapabilityProvider {
  return {
    descriptor: {
      id: "census.render.unguarded",
      version: "1.0.0",
      description: "census control: a render provider that ignores its signal",
      inputSchema: { type: "object" },
      effectClass: "read",
      permissions: [],
      supportedModes: ["invoke"],
    },
    invoke: () => proposer.propose(),
  };
}
/** The unguarded provider aborted while its proposal is pending, bare or through a registry; the proposal is released after
 * the abort, or (sameTick) by a caller-signal listener registered before the registry's, so it settles inside the abort's own
 * tick - the window only the registry's post-race guard covers. */
async function unguarded(throughRegistry: boolean, sameTick: boolean): Promise<Observation> {
  const made = bench("settled");
  const proposer = new Proposer();
  const proposal = json({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: made.root, source: fullShapeRf(made.root) });
  const provider = signalIgnoringProvider(proposer);
  const registry = new CapabilityRegistry();
  registry.register(provider);
  const controller = new AbortController();
  if (sameTick) controller.signal.addEventListener("abort", () => proposer.release(proposal), { once: true });
  const before = tree(made.home);
  const running = settle(
    throughRegistry
      ? registry.invoke("census.render.unguarded", {}, { grants: ["invoke:census.render.unguarded"], signal: controller.signal })
      : provider.invoke({}, context(controller.signal)),
  );
  await until(() => proposer.calls === 1, "the unguarded provider was called");
  controller.abort();
  if (!sameTick) proposer.release(proposal);
  const outcome = await bounded(running, "the unguarded provider's pass");
  return {
    pass: `control:unguarded-${throughRegistry ? "registry" : "bare"}${sameTick ? "-same-tick" : ""}`,
    scenario: "proposed",
    native: true,
    outcome,
    launches: [],
    foreign: launches(made).filter(launch => launch.bin !== "rf"),
    readerCalls: proposer.calls,
    hostChanged: tree(made.home) !== before,
    stopped: false,
    cancelledWhileQueued: undefined,
    atAbort: sameTick ? "proposal released by the abort itself" : "proposal unanswered",
  };
}
/** One control per violation class and per clause of its classifier, each tripping its class alone, and the unguarded
 * provider read both ways. */
const CONTROLS: Readonly<Record<string, Control>> = {
  "dropped-signal": {
    expected: ["committed-after-abort"],
    run: () =>
      controlObservation("dropped-signal", "proposed", "late", async (made, tag, controller) => {
        // The control passes no signal to the render: the abort below cannot reach it, so its proposal lands after the abort.
        const running = nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
        await until(() => marked(made, "proposed", tag), "the dropped-signal control's proposal");
        controller.abort();
        writeFileSync(join(made.bin, `release.${tag}`), "");
        return running;
      }),
  },
  "unguarded-bare": { expected: ["committed-after-abort"], run: () => unguarded(false, false) },
  "unguarded-registry": { expected: [], run: () => unguarded(true, false) },
  "unguarded-registry-same-tick": { expected: [], run: () => unguarded(true, true) },
  "committed-form-commit_seq": committedFormControl("commit_seq"),
  "committed-form-render_id": committedFormControl("render_id"),
  "committed-form-ephemeral": committedFormControl("ephemeral"),
  "committed-form-storage_write_count": committedFormControl("storage_write_count"),
  "committed-form-ephemeral-absent": committedFormControl("ephemeral-absent"),
  "committed-form-ephemeral-null": committedFormControl("ephemeral-null"),
  "committed-form-ephemeral-string": committedFormControl("ephemeral-string"),
  "committed-form-ephemeral-number": committedFormControl("ephemeral-number"),
  "committed-form-render_id-empty": committedFormControl("render_id-empty"),
  "committed-form-render_id-absent": committedFormControl("render_id-absent"),
  "committed-form-render_id-number": committedFormControl("render_id-number"),
  "committed-form-commit_seq-zero": committedFormControl("commit_seq-zero"),
  "committed-form-commit_seq-string": committedFormControl("commit_seq-string"),
  "committed-form-storage_write_count-absent": committedFormControl("storage_write_count-absent"),
  "committed-form-storage_write_count-string": committedFormControl("storage_write_count-string"),
  "committed-form-storage_write_count-null": committedFormControl("storage_write_count-null"),
  "committed-form-storage_write_count-negative": committedFormControl("storage_write_count-negative"),
  "committed-form-work-absent": committedFormControl("work-absent"),
  "committed-form-result-absent": committedFormControl("result-absent"),
  "committing-argv": {
    expected: ["committing-launch"],
    run: () => controlObservation("committing-argv", "settled", "settled", async (made, tag) => launchRf(made, tag, "committing")),
  },
  "committing-verb": {
    expected: ["committing-launch"],
    run: () => controlObservation("committing-verb", "settled", "settled", async (made, tag) => launchRf(made, tag, "other-verb")),
  },
  "misplaced-tail": {
    expected: ["committing-launch"],
    run: () => controlObservation("misplaced-tail", "settled", "settled", async (made, tag) => launchRf(made, tag, "misplaced-tail")),
  },
  "committing-noun": {
    expected: ["committing-launch"],
    run: () => controlObservation("committing-noun", "settled", "settled", async (made, tag) => launchRf(made, tag, "other-noun")),
  },
  "committing-workspace": {
    expected: ["committing-launch"],
    run: () => controlObservation("committing-workspace", "settled", "settled", async (made, tag) => launchRf(made, tag, "other-lead")),
  },
  "swapped-tail": {
    expected: ["committing-launch"],
    run: () => controlObservation("swapped-tail", "settled", "settled", async (made, tag) => launchRf(made, tag, "swapped-tail")),
  },
  "started-after-abort": {
    expected: ["started-after-abort"],
    run: () =>
      controlObservation("started-after-abort", "before", "settled", async (made, tag) => {
        launchRf(made, tag, "uncommitted");
        throw new CapabilityError("transport", "census control: cancelled after it launched");
      }),
  },
  "started-reader": {
    expected: ["started-after-abort"],
    run: () =>
      controlObservation("started-reader", "before", "settled", async (_made, _tag, _controller, reader) => {
        void reader.read();
        throw new CapabilityError("transport", "census control: cancelled after it read");
      }),
  },
  "started-queued": {
    expected: ["started-after-abort"],
    run: () =>
      controlObservation("started-queued", "queued", "settled", async (made, tag) => {
        launchRf(made, tag, "uncommitted");
        throw new CapabilityError("transport", "census control: cancelled in the queue after it launched");
      }),
  },
  "extra-read": {
    expected: ["extra-launch"],
    run: () =>
      controlObservation("extra-read", "settled", "settled", async (made, _tag, _controller, reader) => {
        await reader.read();
        await reader.read();
        return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: made.root, source: fullShapeRf(made.root) };
      }),
  },
  "suspended-returned": {
    expected: ["committed-after-abort"],
    run: () => controlObservation("suspended-returned", "deadline", "settled", async (made, tag) => nativeReactiveFiberRender({ model: "m", task: tag }, made.root)),
  },
  "extra-launch": {
    expected: ["extra-launch"],
    run: () =>
      controlObservation("extra-launch", "settled", "settled", async (made, tag) => {
        await nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
        return nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
      }),
  },
  "foreign-launch": {
    expected: ["foreign-launch"],
    run: () =>
      controlObservation("foreign-launch", "settled", "settled", async (made, tag) => {
        execFileSync(foreignCommands()[0] ?? "git", ["status"], { env: { PATH: made.bin } });
        return nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
      }),
  },
  "host-write": {
    expected: ["host-write"],
    run: () =>
      controlObservation("host-write", "settled", "settled", async (made, tag) => {
        writeFileSync(join(made.root, "proposal.json"), "{}\n");
        return nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
      }),
  },
  "host-rewrite": {
    expected: ["host-write"],
    run: () =>
      controlObservation("host-rewrite", "settled", "settled", async (made, tag) => {
        writeFileSync(join(made.root, "README.md"), "workspace rewritten\n");
        return nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
      }),
  },
  "host-sibling": {
    expected: ["host-write"],
    run: () =>
      controlObservation("host-sibling", "settled", "settled", async (made, tag) => {
        writeFileSync(`${made.root}.trace`, "render\n");
        return nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
      }),
  },
};

// ---- src readings: modules, imports, launch sites ----

function git(...args: string[]): string {
  return execFileSync("git", ["-C", REPO, ...args], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, env: { ...process.env, PATH: oldPath } });
}
let trackedCache: string[] | undefined;
/** git's index: every tracked path. */
function trackedPaths(): string[] {
  trackedCache ??= git("ls-files", "-z")
    .split("\u0000")
    .filter(path => path.length > 0);
  return trackedCache;
}
function trackedScriptModules(): string[] {
  return trackedPaths()
    .filter(path => path.startsWith("src/") && SCRIPT_MODULE.test(path))
    .sort();
}
/** The src walk: every regular script module below src (symlinks not followed). */
function walkedScriptModules(): string[] {
  const found: string[] = [];
  const walk = (dir: string): void => {
    for (const entry of readdirSync(join(REPO, dir), { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile() && SCRIPT_MODULE.test(entry.name)) found.push(path);
    }
  };
  walk("src");
  return found.sort();
}
const parsed = new Map<string, ts.SourceFile>();
/** A module's syntax tree through the helper's parseSource: a repository path is read once and kept, a probe's text is parsed
 * as given. */
function parse(path: string, text?: string): ts.SourceFile {
  if (text !== undefined) return READERS.parseSource(path, text);
  const cached = parsed.get(path);
  if (cached !== undefined) return cached;
  const source = READERS.parseSource(path, readFileSync(join(REPO, path), "utf8"));
  parsed.set(path, source);
  return source;
}
function resolveModule(from: string, specifier: string): string | undefined {
  if (!specifier.startsWith(".")) return undefined;
  return posix.normalize(posix.join(posix.dirname(from), specifier)).replace(/\.js$/, ".ts");
}
function isBuiltin(specifier: string): boolean {
  const bare = specifier.startsWith("node:") ? specifier.slice(5) : specifier;
  return builtinModules.includes(bare);
}
function closure(entry: string): { modules: string[]; externals: string[] } {
  const modules = new Set<string>();
  const externals = new Set<string>();
  const queue = [entry];
  for (let module = queue.shift(); module !== undefined; module = queue.shift()) {
    if (modules.has(module)) continue;
    modules.add(module);
    for (const specifier of READERS.specifiers(parse(module))) {
      const target = resolveModule(module, specifier);
      if (target === undefined) externals.add(specifier);
      else queue.push(target);
    }
  }
  return { modules: [...modules].sort(), externals: [...externals].sort() };
}
let srcSitesCache: READERS.LaunchSite[] | undefined;
/** The launch readers' union over every tracked src module. */
function srcLaunchSites(): READERS.LaunchSite[] {
  srcSitesCache ??= trackedScriptModules().flatMap(module => READERS.launchUnion(module, parse(module)));
  return srcSitesCache;
}
let foreignCache: string[] | undefined;
/** The commands src launches by name besides rf: each resolved command of the launch readers' union (the bench's stand-ins). */
function foreignCommands(): string[] {
  foreignCache ??= [...new Set(srcLaunchSites().flatMap(site => site.command.split("|")))].filter(command => command !== "rf" && /^[a-z][a-z0-9-]*$/.test(command)).sort();
  return foreignCache;
}
let compilerOptionsCache: ts.CompilerOptions | undefined;
/** TSCONFIG's compiler options as TypeScript reads the file (its extends chain included), read once. */
function compilerOptions(): ts.CompilerOptions {
  if (compilerOptionsCache === undefined) {
    const path = join(REPO, TSCONFIG);
    const read = ts.readConfigFile(path, ts.sys.readFile);
    if (read.error !== undefined) throw new Error(`${TSCONFIG} does not read: ${ts.flattenDiagnosticMessageText(read.error.messageText, "\n")}`);
    compilerOptionsCache = ts.parseJsonConfigFileContent(read.config, ts.sys, REPO, undefined, path).options;
  }
  return compilerOptionsCache;
}
/** Whether a specifier of this file names the helper: TypeScript resolves it from this file's path, with TSCONFIG's compiler
 * options, to the helper's file. */
function resolvesToHelper(specifier: string): boolean {
  const real = (path: string): string => ts.sys.realpath?.(path) ?? path;
  const resolved = ts.resolveModuleName(specifier, join(REPO, SELF), compilerOptions(), ts.sys).resolvedModule;
  return resolved !== undefined && real(resolved.resolvedFileName) === real(join(REPO, HELPER));
}
/** The names one top-level statement declares: a variable statement's at any binding-pattern depth, a function's, a class's,
 * an interface's, a type alias's, an enum's, a namespace's (a module declaration's name) and an import-equals declaration's
 * (DECLARATION_KINDS holds each kind to a planted statement); none for any other statement (an import declaration's bindings
 * are IMPORTS'). */
function declaredBy(statement: ts.Statement): string[] {
  const names: string[] = [];
  const bind = (name: ts.BindingName): void => {
    if (ts.isIdentifier(name)) names.push(name.text);
    else for (const element of name.elements) if (!ts.isOmittedExpression(element)) bind(element.name);
  };
  if (ts.isVariableStatement(statement)) for (const declaration of statement.declarationList.declarations) bind(declaration.name);
  else if (
    (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement) || ts.isEnumDeclaration(statement)) &&
    statement.name !== undefined
  ) {
    names.push(statement.name.text);
  } else if (ts.isModuleDeclaration(statement)) names.push(statement.name.text);
  else if (ts.isImportEqualsDeclaration(statement)) names.push(statement.name.text);
  return names;
}
/** An import declaration's bindings as written: <side effect> for none, else default as <name>, * as <name> and { ... }, a
 * type-only clause prefixed type. */
function importBindings(statement: ts.ImportDeclaration, source: ts.SourceFile): string {
  const clause = statement.importClause;
  if (clause === undefined) return "<side effect>";
  const bindings = clause.namedBindings;
  const parts: string[] = [];
  if (clause.name !== undefined) parts.push(`default as ${clause.name.text}`);
  if (bindings !== undefined && ts.isNamespaceImport(bindings)) parts.push(`* as ${bindings.name.text}`);
  else if (bindings !== undefined) parts.push(`{ ${bindings.elements.map(element => element.getText(source)).join(", ")} }`);
  return `${clause.isTypeOnly ? "type " : ""}${parts.join(", ")}`;
}
/** A top-level statement that neither imports nor declares a name, as A5 reads it: a call by its callee and its arguments (a
 * string as written, a function as <function>, a name as itself, any other argument as its kind), any other statement as its
 * kind. */
function topLevelToken(statement: ts.Statement, source: ts.SourceFile): string {
  const expression = ts.isExpressionStatement(statement) ? statement.expression : undefined;
  if (expression === undefined || !ts.isCallExpression(expression)) return `<${ts.SyntaxKind[(expression ?? statement).kind]}>`;
  const argument = (node: ts.Expression): string => {
    if (ts.isStringLiteral(node)) return JSON.stringify(node.text);
    if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) return "<function>";
    if (ts.isIdentifier(node)) return node.text;
    return `<${ts.SyntaxKind[node.kind]}>`;
  };
  return `${expression.expression.getText(source)}(${expression.arguments.map(argument).join(", ")})`;
}
/** A5's composition pins' reading of one source read as this file. */
interface Composition {
  /** Every specifier the specifier reader reads in the source, its bodies included, in source order. */
  readonly named: string[];
  /** The named specifiers that resolve to the helper (resolvesToHelper). */
  readonly specifiers: string[];
  /** The bindings of each import declaration whose specifier resolves to the helper. */
  readonly imports: string[];
  /** Every import declaration, as its specifier and its bindings. */
  readonly importDeclarations: string[];
  /** Every name the top-level statements declare (declaredBy), in source order, and how many statements declare one. */
  readonly declared: string[];
  readonly declaring: number;
  /** Every other top-level statement (neither an import declaration nor declaring a name), as topLevelToken reads it. */
  readonly calls: string[];
}
/** A5's composition reading of one source read as this file (this file's own, or PLANTED_COMPOSITION): its top level, statement
 * by statement, and the specifiers the specifier reader reads in it. Nothing else a body or an initializer holds is read. */
function composition(source: ts.SourceFile): Composition {
  const imports: string[] = [];
  const importDeclarations: string[] = [];
  const declared: string[] = [];
  const calls: string[] = [];
  let declaring = 0;
  for (const statement of source.statements) {
    if (ts.isImportDeclaration(statement)) {
      const specifier = ts.isStringLiteral(statement.moduleSpecifier) ? statement.moduleSpecifier.text : "<expression>";
      importDeclarations.push(`${specifier} ${importBindings(statement, source)}`);
      if (resolvesToHelper(specifier)) imports.push(importBindings(statement, source));
      continue;
    }
    const names = declaredBy(statement);
    if (names.length > 0) {
      declaring += 1;
      declared.push(...names);
    } else calls.push(topLevelToken(statement, source));
  }
  const named = READERS.specifiers(source);
  return { named, specifiers: named.filter(resolvesToHelper), imports, importDeclarations, declared, declaring, calls };
}
/** The names the helper's source exports, read off its source: values (functions, variables, classes, enums) and types. */
function helperExports(): { values: string[]; types: string[] } {
  const values: string[] = [];
  const types: string[] = [];
  for (const statement of parse(HELPER).statements) {
    const exported = ts.canHaveModifiers(statement) && ts.getModifiers(statement)?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) === true;
    if (!exported) continue;
    (ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement) ? types : values).push(...declaredBy(statement));
  }
  return { values, types };
}
type SourceOf = (module: string) => ts.SourceFile;
interface ReachReading {
  readonly launches: READERS.LaunchSite[];
  readonly namedLaunches: READERS.LaunchSite[];
  readonly union: READERS.LaunchSite[];
  readonly specifiers: string[];
  readonly ioBuiltins: string[];
  readonly ioGlobals: string[];
  readonly processReach: string[];
}
/** A5's readings of a module set: one pipeline for the render closure and for its planted control, so a reading the
 * pipeline drops reds the control. */
function reachReading(modules: readonly string[], sourceOf: SourceOf): ReachReading {
  const each = <T>(read: (module: string, source: ts.SourceFile) => T[]): T[] => modules.flatMap(module => read(module, sourceOf(module)));
  return {
    launches: each(READERS.childProcessLaunches),
    namedLaunches: each(READERS.launchSites),
    union: each(READERS.launchUnion),
    specifiers: each((_module, source) => READERS.specifiers(source)),
    ioBuiltins: each((module, source) =>
      READERS.specifiers(source)
        .filter(specifier => isBuiltin(specifier) && IO_BUILTINS.includes(specifier.replace(/^node:/, "")))
        .map(specifier => `${module}:${specifier}`),
    ),
    ioGlobals: each(READERS.ioGlobalReferences),
    processReach: each(READERS.processReferences),
  };
}
/** The tool providers, model host and tool SDK native-modules.ts loads besides the render module, and the packages they import. */
function foreignSet(): { modules: string[]; externals: string[] } {
  const loaded = READERS.specifiers(parse(NATIVE_LOADER)).filter(specifier => {
    const source = parse(NATIVE_LOADER);
    let dynamic = false;
    READERS.visit(source, node => {
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        const first = node.arguments[0];
        if (first !== undefined && ts.isStringLiteralLike(first) && first.text === specifier) dynamic = true;
      }
    });
    return dynamic;
  });
  const modules = loaded.map(specifier => resolveModule(NATIVE_LOADER, specifier)).filter((module): module is string => module !== undefined && module !== RENDER_MODULE);
  const externals = new Set(loaded.filter(specifier => resolveModule(NATIVE_LOADER, specifier) === undefined));
  for (const module of modules) for (const specifier of READERS.specifiers(parse(module))) if (resolveModule(module, specifier) === undefined && !isBuiltin(specifier)) externals.add(specifier);
  return { modules: [...new Set(modules)].sort(), externals: [...externals].sort() };
}
function exportedFunctions(module: string): string[] {
  return parse(module)
    .statements.filter((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement))
    .filter(statement => statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) === true)
    .map(statement => statement.name?.text ?? "<anonymous>")
    .sort();
}

// ---- the until-then readers (row T) ----

function componentModules(paths: readonly string[]): string[] {
  return paths.filter(path => COMPONENT_MODULE.test(path));
}
/** Hook-form and descriptor-name identifiers; every string and template part that spells a use-prefixed word (a hook's name
 * as a key, an argument or prose), the descriptor's name or the TSX SDK; and TSX SDK specifiers - in one source text. */
function hookMentions(module: string, source: ts.SourceFile = parse(module)): string[] {
  const found: string[] = [];
  READERS.visit(source, node => {
    if (ts.isIdentifier(node) && (HOOK_NAME.test(node.text) || node.text === DESCRIPTOR_NAME)) found.push(`${module}:${node.text}`);
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      const word = HOOK_WORD.exec(node.text)?.[1];
      if (word !== undefined) found.push(`${module}:string ${word}`);
      if (node.text.includes(DESCRIPTOR_NAME)) found.push(`${module}:string ${DESCRIPTOR_NAME}`);
      if (node.text.includes(TSX_SDK)) found.push(`${module}:string ${TSX_SDK}`);
    }
  });
  for (const specifier of READERS.specifiers(source)) if (specifier === TSX_SDK || specifier.startsWith(`${TSX_SDK}/`)) found.push(`${module}:import ${specifier}`);
  return found;
}
const DEPENDENCY_MAPS = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies", "bundleDependencies", "bundledDependencies"];
function manifestMentions(manifest: JsonObject): string[] {
  return DEPENDENCY_MAPS.flatMap(map => {
    const entries = manifest[map];
    if (Array.isArray(entries)) return entries.filter(name => name === TSX_SDK).map(() => `${map}:${TSX_SDK}`);
    return isObject(entries) && Object.hasOwn(entries, TSX_SDK) ? [`${map}:${TSX_SDK}`] : [];
  });
}
function lockMentions(lock: JsonObject): string[] {
  const packages = lock.packages;
  if (!isObject(packages)) return ["<no packages map>"];
  return Object.entries(packages).flatMap(([path, entry]) => {
    const named = isObject(entry) && entry.name === TSX_SDK;
    return path === `node_modules/${TSX_SDK}` || path.endsWith(`/node_modules/${TSX_SDK}`) || named ? [path] : [];
  });
}
function joinedFold(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}
/** Every key and string of a value at any depth, each with its path. */
function textsOf(value: unknown, path: string): { path: string; text: string }[] {
  if (typeof value === "string") return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => textsOf(item, `${path}[${index}]`));
  if (isObject(value)) return Object.entries(value).flatMap(([key, child]) => [{ path: `${path}.${key}#key`, text: key }, ...textsOf(child, `${path}.${key}`)]);
  return [];
}
function phraseMentions(value: unknown, location: string, phrases: readonly string[]): string[] {
  return textsOf(value, location).flatMap(entry => phrases.filter(phrase => joinedFold(entry.text).includes(phrase)).map(phrase => `${entry.path}|${phrase}`));
}
/** Row T's static homes: a script module anywhere in git's index outside UNREAD_TREE (R-UNREAD-HOMES names the rest). */
function isStaticHome(path: string): boolean {
  return SCRIPT_MODULE.test(path) && !path.startsWith(UNREAD_TREE);
}
function staticHomes(): string[] {
  return trackedPaths().filter(isStaticHome).sort();
}
/** Every string, template part, identifier and key of one source that spells a phrase (joined fold): a descriptor's text,
 * wherever the module registers it. */
function sourcePhraseMentions(module: string, phrases: readonly string[], source: ts.SourceFile = parse(module)): string[] {
  const found: string[] = [];
  READERS.visit(source, node => {
    let read: { kind: string; text: string } | undefined;
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) read = { kind: "identifier", text: node.text };
    else if (ts.isStringLiteralLike(node)) read = { kind: "string", text: node.text };
    else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) read = { kind: "template", text: node.text };
    if (read === undefined) return;
    for (const phrase of phrases) if (joinedFold(read.text).includes(phrase)) found.push(`${module}:${read.kind}|${phrase}`);
  });
  return found;
}
interface HomeReading {
  readonly read: string[];
  readonly hooks: string[];
  readonly written: string[];
}
/** Row T's static readings of a module set: one pipeline for the read homes (T2, T3) and for T4's planted homes, so a
 * reading the pipeline drops reds T4. */
function homeReading(modules: readonly string[], sourceOf: SourceOf, phrases: readonly string[]): HomeReading {
  const read: string[] = [];
  const hooks: string[] = [];
  const written: string[] = [];
  for (const module of modules) {
    const source = sourceOf(module);
    hooks.push(...hookMentions(module, source));
    written.push(...sourcePhraseMentions(module, phrases, source));
    read.push(module);
  }
  return { read, hooks, written };
}
let homesCache: HomeReading | undefined;
/** homeReading over the read homes, once per file (T2 and T3 read the same title phrases). */
function homesRead(phrases: readonly string[]): HomeReading {
  homesCache ??= homeReading(staticHomes(), module => parse(module), phrases);
  return homesCache;
}
/** Clients and readers that are never invoked: registration only stores the descriptor. */
const NEVER = (): never => {
  throw new Error("census: a registered capability is never invoked");
};
const FORGE_CLIENT: ForgeReadClient = { gate: { status: async () => NEVER() } };
const FURNACE_CLIENT: FurnaceReadClient = { runs: { get: () => ({ inspect: async () => NEVER() }) } };
const HX_READER: HyperUnixReader = { find: async () => NEVER(), runtime: async () => NEVER(), async close() {} };
const RF_INVOKE: Parameters<typeof registerReactiveFiberRender>[1] = async () => NEVER();
function descriptorsOf(registry: CapabilityRegistry): CapabilityDescriptor[] {
  return registry.catalogSnapshot().map(entry => entry.descriptor);
}
async function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  const registry = new CapabilityRegistry();
  (await loadWorkbenchNative()).registerNativeProviders(registry, REPO);
  return descriptorsOf(registry);
}
function injectedDescriptors(): CapabilityDescriptor[] {
  const registry = new CapabilityRegistry();
  registerForgeGateStatus(registry, FORGE_CLIENT, "0.1.0");
  registerHyperUnixFind(registry, HX_READER, REPO);
  registerFurnaceRunInspect(registry, FURNACE_CLIENT, REPO);
  registerReactiveFiberRender(registry, RF_INVOKE, REPO);
  return descriptorsOf(registry);
}
function renderIds(descriptors: readonly CapabilityDescriptor[]): string[] {
  return descriptors.map(descriptor => descriptor.id).filter(id => /(?:^|\.)render(?:\.|$)/.test(id));
}

// ---- the bead's export row ----

function exportRow(): { title: string; notes: string } {
  for (const line of readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  return { title: "", notes: "" };
}
/** The first "Acceptance:" sentence of the notes. */
function acceptance(notes: string): string | undefined {
  return /Acceptance: (.+?)\.(?:\s|$)/.exec(notes)?.[1];
}
/** The acceptance's clauses: what the falsifier proves (two, split at " and "), and the attempt after its comma. */
function acceptanceClauses(sentence: string): string[] {
  const match = /^a render-abort falsifier proving (.+?) and (.+?), with (.+)$/.exec(sentence);
  return match === null ? [] : [match[1] ?? "", match[2] ?? "", match[3] ?? ""];
}
/** The title's artifact clause, its render kinds, its effect classes and its two interests (joined fold of the head words). */
function titleParts(title: string): { artifact: string | undefined; kinds: string[]; effects: string[]; phrases: string[] } {
  const artifact = /Artifact: (.+?)\.?$/.exec(title)?.[1];
  const kinds = /proposals from (.+?) renders shall never commit/.exec(title)?.[1]?.split(" or ") ?? [];
  const effects = /shall create no (.+?) effect during render/.exec(title)?.[1]?.split(/, | or /) ?? [];
  const interests = /may describe a (.+?) or (.+?) but /.exec(title);
  const phrases = interests === null ? [] : [interests[1] ?? "", interests[2] ?? ""].map(phrase => joinedFold(phrase.split(" ").slice(-2).join(" ")));
  return { artifact, kinds, effects, phrases };
}

// ---- the cases ----

const REACHED: string[] = [];

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const seen = (await sweepOnce()).filter(entry => KIND[entry.scenario] === "aborted");
    for (const entry of seen) expect(falsify(entry), `${entry.pass}/${entry.scenario}: the falsifier's verdict`).toEqual([]);
    return json({ clause: SERVES.A1, kind: "aborted", passes: seen.map(commitLine) });
  },
  A2: async () => {
    const seen = (await sweepOnce()).filter(entry => KIND[entry.scenario] === "suspended");
    for (const entry of seen) expect(falsify(entry), `${entry.pass}/${entry.scenario}: the falsifier's verdict`).toEqual([]);
    return json({
      clause: SERVES.A2,
      kind: "suspended",
      passes: seen.map(commitLine),
      cancelledWhileQueued: seen.filter(entry => entry.scenario === "queued").map(entry => `${entry.pass}: ${entry.cancelledWhileQueued}`),
    });
  },
  A3: async () => {
    const settled: string[] = [];
    for (const id of NATIVE_PASSES) {
      for (const view of id === "native-preview" ? [false] : [false, true]) {
        const { outcome, argv } = await settledNative(id, fullShapeRf, view);
        const form = outcome.kind === "returned" && uncommitted(outcome.value) ? "uncommitted" : "NOT uncommitted";
        settled.push(`${id}/${view ? "view" : "legacy"}: ${outcomeText(outcome)} ${form} | ${argv.map(args => args.join(" ")).join(" ; ")}`);
      }
    }
    const committed: string[] = [];
    for (const form of COMMITTED_FORMS) {
      for (const id of ["native-registry", "native-direct"] as const) {
        const { outcome } = await settledNative(id, committedForm(form), false);
        committed.push(`${id}/${form}: ${outcomeText(outcome)}`);
      }
    }
    expect(
      committed.filter(line => !line.includes(": refused ")),
      "a settled native pass refuses each committed form",
    ).toEqual([]);
    return json({ clause: SERVES.A3, kind: "settled", settled, committed });
  },
  A4: async () => {
    const seen = await sweepOnce();
    for (const entry of seen) expect(falsify(entry), `${entry.pass}/${entry.scenario}: the falsifier's verdict`).toEqual([]);
    // Bench hygiene: a waiting stand-in left behind (as a pass that ignores its abort leaves it) is stopped by the teardown's reap.
    const left = bench("running");
    const child = spawn(join(left.bin, "rf"), ["--task", "abandoned"], { stdio: "ignore", env: { PATH: left.bin } });
    await until(() => marked(left, "started", "abandoned"), "the abandoned stand-in's started mark");
    const reaped = reap(left.bin);
    await until(() => child.exitCode !== null || child.signalCode !== null, "the abandoned stand-in's exit");
    return json({
      clause: SERVES.A4,
      judges: ["tool", "host"],
      stand_ins: ["rf", ...foreignCommands()],
      passes: seen.map(effectLine),
      abandoned: { reaped, signal: child.signalCode },
    });
  },
  A5: async () => {
    const reach = closure(RENDER_MODULE);
    const foreign = foreignSet();
    const reading = reachReading(reach.modules, module => parse(module));
    const planted = parse("planted/reach.ts", PLANTED_REACH);
    const controls = reachReading(["planted/reach.ts"], () => planted);
    const overlap = [...reach.modules.filter(module => foreign.modules.includes(module)), ...reach.externals.filter(external => foreign.externals.includes(external))];
    expect(overlap, "the render pass reaches a tool provider, model host or tool SDK native-modules.ts loads").toEqual([]);
    expect(reading.ioGlobals, "the render pass reaches an I/O global or a global object").toEqual([]);
    expect(reading.processReach, "the render pass reaches process beyond its env read").toEqual([]);
    // src's rf launch sites, read by both launch readers over every tracked src module, and the child_process sites whose
    // command does not resolve (any of them could launch rf).
    const srcSites = srcLaunchSites();
    const rfSites = srcSites.filter(site => site.command.split("|").includes("rf"));
    expect(
      rfSites.map(site => site.module),
      "src's only rf launch site is the render module's",
    ).toEqual([RENDER_MODULE]);
    const unresolvedInSrc = trackedScriptModules().flatMap(module => READERS.childProcessLaunches(module, parse(module)).filter(site => site.command.startsWith("<")));
    const unresolvedLoadsInSrc = trackedScriptModules().flatMap(module => READERS.unresolvedLoads(module, parse(module)));
    // The composition pins: this file's top level, read off its own source (nothing a body or an initializer holds is read but
    // the specifiers the specifier reader reads there), held to the helper's source, TSCONFIG and the roster.
    const composed = composition(parse(SELF));
    const exported = helperExports();
    expect(relative(REPO, fileURLToPath(import.meta.url)).split("\\").join("/"), "SELF is this file's own path").toBe(SELF);
    expect(composed.importDeclarations, "this file's import declarations are exactly IMPORTS").toEqual([...IMPORTS]);
    expect(composed.importDeclarations, "this file's import declarations are exactly the roster's imports").toEqual(ROSTER.constants.imports);
    expect(
      composed.named,
      "every specifier the specifier reader reads in this file is one of its import declarations', in source order",
    ).toEqual(composed.importDeclarations.map(entry => entry.slice(0, entry.indexOf(" "))));
    expect(composed.specifiers, "exactly one of this file's specifiers resolves to the helper (TypeScript, with TSCONFIG's options)").toEqual([HELPER_SPECIFIER]);
    expect(composed.imports, "that specifier's one import declaration is a namespace import bound to READERS").toEqual(["* as READERS"]);
    expect(Object.prototype.toString.call(READERS), "READERS is a module namespace, never an object this file builds").toBe("[object Module]");
    expect([...Object.keys(READERS)].sort(), "READERS' keys are exactly the value names the helper's source exports").toEqual([...exported.values].sort());
    expect(
      composed.declared.filter(name => exported.values.includes(name) || exported.types.includes(name)),
      "this file declares no name the helper exports",
    ).toEqual([]);
    expect(composed.declared, "this file's top-level declarations are exactly OWN_DECLARATIONS").toEqual([...OWN_DECLARATIONS]);
    expect(composed.declared, "this file's top-level declarations are exactly the roster's ownDeclarations").toEqual(ROSTER.constants.ownDeclarations);
    expect(composed.calls, "every other top-level statement of this file is one of TOP_LEVEL_CALLS").toEqual([...TOP_LEVEL_CALLS]);
    expect(composed.calls, "every other top-level statement of this file is one of the roster's topLevelCalls").toEqual(ROSTER.constants.topLevelCalls);
    // declaredBy's kinds, each held to its planted statement, and the planted composition (the witness holds its reading).
    const kinds = DECLARATION_KINDS.map(entry => {
      const statements = parse("planted/declarations.ts", entry.statement).statements;
      return { kind: entry.kind, statements: statements.length, names: statements.flatMap(declaredBy) };
    });
    for (const [index, entry] of DECLARATION_KINDS.entries()) {
      expect(kinds[index], `declaredBy reads the planted ${entry.kind}`).toEqual({ kind: entry.kind, statements: 1, names: [...entry.names] });
    }
    const plantedReading = composition(parse(SELF, PLANTED_COMPOSITION));
    expect(
      plantedReading.specifiers,
      "each planted spelling of the helper resolves to it: the namespace import's, the extensionless one (GT6), the .ts one from the parent directory and a dynamic import's",
    ).toHaveLength(4);
    expect(
      plantedReading.declared.filter(name => exported.values.includes(name)),
      "the planted import-equals alias declares the helper's name it aliases (GT5)",
    ).toEqual(["processReferences"]);
    expect(plantedReading.calls, "the planted expression statement holding a copy on a global is read as a top-level call (GT1, GT2)").toHaveLength(1);
    const resolution = compilerOptions().moduleResolution;
    return json({
      clause: SERVES.A5,
      judges: ["tool", "model", "host"],
      modules: reach.modules,
      externals: reach.externals,
      launches: reading.launches,
      namedLaunches: reading.namedLaunches,
      ioBuiltins: reading.ioBuiltins,
      ioGlobals: reading.ioGlobals,
      processReach: reading.processReach,
      foreign,
      overlap,
      rfSitesInSrc: rfSites,
      unresolvedInSrc,
      unresolvedLoadsInSrc,
      srcSites,
      controls,
      composition: {
        helper: HELPER,
        specifiers: composed.specifiers,
        imports: composed.imports,
        readers: Object.keys(READERS).length,
        tsconfig: TSCONFIG,
        moduleResolution: resolution === undefined ? "none" : ts.ModuleResolutionKind[resolution],
        named: composed.named.length,
        topLevel: { importDeclarations: composed.importDeclarations.length, declaring: composed.declaring, declared: composed.declared.length, calls: composed.calls.length },
        kinds: kinds.map(entry => `${entry.kind}: ${entry.names.join(", ") || "none"}`),
        planted: plantedReading,
      },
    });
  },
  A6: async () => {
    expect(
      Object.keys(CONTROLS).filter(name => name.startsWith("committed-form-")),
      "one committed-form control per committed form, in COMMITTED_FORMS order, both ways",
    ).toEqual(COMMITTED_FORMS.map(form => `committed-form-${form}`));
    for (const form of COMMITTED_FORMS) {
      expect(CONTROLS[`committed-form-${form}`]?.expected, `the ${form} control expects committed-proposal alone`).toEqual(["committed-proposal"]);
    }
    const verdicts: Record<string, string[]> = {};
    const outcomes: Record<string, string> = {};
    for (const [name, control] of Object.entries(CONTROLS)) {
      const seen = await control.run();
      verdicts[name] = falsify(seen);
      outcomes[name] = outcomeText(seen.outcome);
      expect(verdicts[name], `control ${name} trips exactly its expected classes`).toEqual([...control.expected]);
    }
    const tripped = new Set(Object.values(verdicts).flat());
    expect(VIOLATIONS.filter(violation => !tripped.has(violation)), "every violation class has a control that trips it").toEqual([]);
    return json({ clause: SERVES.A6, controls: verdicts, outcomes });
  },
  T1: async () => {
    const tracked = trackedPaths();
    const components = componentModules(tracked);
    expect(components, TRIGGER).toEqual([]);
    return json({
      missing: REQUIRED_TRACKED.filter(path => !tracked.includes(path)),
      trackedBelowFloor: tracked.length < FLOORS.tracked,
      components,
    });
  },
  T2: async () => {
    const homes = staticHomes();
    const src = trackedScriptModules();
    const walked = walkedScriptModules();
    const { read, hooks } = homesRead(titleParts(exportRow().title).phrases);
    const manifest = manifestMentions(JSON.parse(readFileSync(join(REPO, "package.json"), "utf8")) as JsonObject);
    const lock = lockMentions(JSON.parse(readFileSync(join(REPO, "package-lock.json"), "utf8")) as JsonObject);
    expect([...hooks, ...manifest, ...lock], TRIGGER).toEqual([]);
    return json({
      readEqualsHomes: JSON.stringify(read) === JSON.stringify(homes),
      srcInRead: src.every(module => read.includes(module)),
      srcWalkEqualsTracked: JSON.stringify(walked) === JSON.stringify(src),
      missing: REQUIRED_READ.filter(path => !read.includes(path)),
      readsUnreadTree: read.some(path => path.startsWith(UNREAD_TREE)),
      readBelowFloor: read.length < FLOORS.readModules,
      srcBelowFloor: src.length < FLOORS.srcModules,
      mentions: hooks,
      manifest,
      lock,
    });
  },
  T3: async () => {
    const { phrases } = titleParts(exportRow().title);
    const native = await nativeDescriptors();
    const injected = injectedDescriptors();
    const mentions = [...native.flatMap(descriptor => phraseMentions(descriptor, `native:${descriptor.id}`, phrases)), ...injected.flatMap(descriptor => phraseMentions(descriptor, `injected:${descriptor.id}`, phrases))];
    // The static read: every string and name of every module T2 reads, so a descriptor registered by a module neither read
    // registration wires in reads too.
    const homes = staticHomes();
    const { read, written } = homesRead(phrases);
    expect([...mentions, ...written], TRIGGER).toEqual([]);
    const leg = (descriptors: readonly CapabilityDescriptor[]): JsonValue =>
      json({ ids: descriptors.map(descriptor => descriptor.id).sort(), render: descriptors.find(descriptor => descriptor.id === PREVIEW)?.description ?? null });
    return json({
      phrases,
      belowFloor: native.length + injected.length < FLOORS.descriptors,
      native: leg(native),
      injected: leg(injected),
      mentions,
      readEqualsHomes: JSON.stringify(read) === JSON.stringify(homes),
      readBelowFloor: read.length < FLOORS.readModules,
      written,
    });
  },
  T4: async () => {
    const { phrases } = titleParts(exportRow().title);
    // The planted homes go through the same pipeline T2 and T3 read the real homes with.
    const texts: Readonly<Record<string, string>> = {
      "planted/panel.ts": PLANTED_SOURCE,
      "planted/hooks.cjs": PLANTED_REQUIRE,
      "planted/evidence.ts": PLANTED_DESCRIPTOR_SOURCE,
      "planted/string-hooks.ts": PLANTED_STRING_HOOKS,
      "planted/loader.ts": PLANTED_LOADER,
    };
    const planted = homeReading(Object.keys(texts), module => parse(module, texts[module]), phrases);
    expect(
      ["planted/panel.ts", "planted/hooks.cjs", "planted/string-hooks.ts", "planted/loader.ts"].filter(module => !planted.hooks.some(mention => mention.startsWith(`${module}:`))),
      "T2's hook reader reads every planted hook sample",
    ).toEqual([]);
    expect(PLANTED_HOMES.filter(home => !isStaticHome(home)), "the static readers' home predicate reads every planted home, its extension in any case").toEqual([]);
    return json({
      components: componentModules(PLANTED_PATHS),
      read: planted.read,
      hooks: planted.hooks,
      written: planted.written,
      manifest: manifestMentions(PLANTED_MANIFEST),
      lock: lockMentions(PLANTED_LOCK),
      descriptor: phraseMentions(
        { id: "planted.render", description: PLANTED_DESCRIPTION, inputSchema: { type: "object", properties: { [PLANTED_KEY]: { type: "string" } } } },
        "planted",
        phrases,
      ),
      homes: PLANTED_HOMES.filter(isStaticHome),
    });
  },
  Q1: async () => {
    const relayed: string[] = [];
    for (const id of ["injected-registry", "injected-direct"] as const) {
      const made = bench("settled");
      const reader = new Reader(made.root, false, committedForm("commit_seq"));
      const driven = await pass(id, made, {}, reader);
      const outcome = await settle(driven.run(`${id}-relay`, new AbortController().signal));
      const result = outcome.kind === "returned" ? sourceOf(outcome.value)?.result : undefined;
      relayed.push(`${id}: ${outcomeText(outcome)} commit_seq ${isObject(result) ? String(result.commit_seq) : "absent"}`);
    }
    return json({ relayed });
  },
  Q2: async () => {
    const stated = (root: string): JsonValue => {
      const envelope = fullShapeRf(root) as JsonObject;
      const result = envelope.result as JsonObject;
      result.effects = [{ kind: "stated-by-rf" }];
      result.plan = { operations: [{ kind: "stated-by-rf" }], would_commit: true };
      return envelope;
    };
    const { outcome } = await settledNative("native-direct", stated, false);
    const result = outcome.kind === "returned" ? sourceOf(outcome.value)?.result : undefined;
    return json({ outcome: outcomeText(outcome), effects: isObject(result) && Array.isArray(result.effects) ? result.effects.length : null, plan: isObject(result) ? result.plan : null });
  },
  Q3: async () => {
    const { phrases } = titleParts(exportRow().title);
    return json({
      hooks: hookMentions("probe/other-hooks.ts", parse("probe/other-hooks.ts", OTHER_HOOKS)),
      descriptor: phraseMentions({ id: "probe.render", description: OTHER_PHRASES }, "probe", phrases),
      composed: sourcePhraseMentions("probe/composed.ts", phrases, parse("probe/composed.ts", OTHER_COMPOSED)),
      loader: hookMentions("probe/loader.ts", parse("probe/loader.ts", OTHER_LOADER)),
      unreadText: sourcePhraseMentions("probe/unread-text.ts", phrases, parse("probe/unread-text.ts", OTHER_UNREAD_TEXT)),
      lookalike: [
        ...hookMentions("probe/lookalike.ts", parse("probe/lookalike.ts", OTHER_LOOKALIKE)),
        ...sourcePhraseMentions("probe/lookalike.ts", phrases, parse("probe/lookalike.ts", OTHER_LOOKALIKE)),
      ],
    });
  },
  Q4: async () => {
    const made = bench("settled");
    const entries = (process.env.PATH ?? "").split(delimiter);
    const outcome = await settle(nativeReactiveFiberRender({ model: "m", task: "stand-in" }, made.root));
    return json({ entries: entries.map(entry => (entry === made.bin ? "<bench>" : "<other>")), outcome: outcomeText(outcome), logged: launches(made).map(launch => launch.bin) });
  },
  Q5: async () => {
    const seen = await controlObservation("elsewhere", "settled", "settled", async (made, tag) => {
      writeFileSync(join(made.bin, "written-elsewhere.json"), "{}\n");
      return nativeReactiveFiberRender({ model: "m", task: tag }, made.root);
    });
    return json({ verdict: falsify(seen) });
  },
  Q6: async () =>
    json(
      Object.entries(STATIC_RESIDUE).map(([form, text]) => {
        const module = `probe/${form}.ts`;
        const source = parse(module, text);
        const counts = {
          specifiers: READERS.specifiers(source).length,
          childProcess: READERS.childProcessLaunches(module, source).length,
          launchSites: READERS.launchSites(module, source).length,
          loads: READERS.unresolvedLoads(module, source).length,
          ioGlobals: READERS.ioGlobalReferences(module, source).length,
          processReach: READERS.processReferences(module, source).length,
          rf: READERS.launchUnion(module, source).filter(site => site.command.split("|").includes("rf")).length,
        };
        return `${form}: ${Object.entries(counts)
          .map(([reader, count]) => `${reader} ${count}`)
          .join(", ")}`;
      }),
    ),
  Q7: async () => json(UNREAD_HOME_PROBES.map(path => `${path}: ${isStaticHome(path) ? "read" : "unread"}`)),
};

describe("wb-pyel.5 render-abort falsifier (SDK-EVIDENCE-DIRECTED-COMPUTATION-R12) and its until-then trigger", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's export row, src and the cases agree", { timeout: 120_000 }, async () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:6", "T:4", "Q:7"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(
      json({
        preview: PREVIEW,
        grants: GRANTS,
        renderModule: RENDER_MODULE,
        nativeLoader: NATIVE_LOADER,
        renderVerb: RENDER_VERB,
        uncommittedTail: UNCOMMITTED_TAIL,
        registryDeadlineMs: REGISTRY_DEADLINE_MS,
        waitMs: WAIT_MS,
        standInBoundMs: STAND_IN_BOUND_MS,
        passes: PASSES,
        entry: ENTRY,
        nativePasses: NATIVE_PASSES,
        registryPasses: REGISTRY_PASSES,
        scenarios: SCENARIOS,
        kind: KIND,
        driven: DRIVEN,
        violations: VIOLATIONS,
        clauseOf: CLAUSE_OF,
        committedForms: COMMITTED_FORMS,
        controls: Object.fromEntries(Object.entries(CONTROLS).map(([name, control]) => [name, control.expected])),
        self: SELF,
        helper: HELPER,
        helperSpecifier: HELPER_SPECIFIER,
        ownDeclarations: OWN_DECLARATIONS,
        tsconfig: TSCONFIG,
        imports: IMPORTS,
        topLevelCalls: TOP_LEVEL_CALLS,
        declarationKinds: DECLARATION_KINDS,
        plantedComposition: PLANTED_COMPOSITION,
        launchCalls: READERS.LAUNCH_CALLS,
        childProcess: READERS.CHILD_PROCESS,
        loaderCalls: READERS.LOADER_CALLS,
        loaderFactories: READERS.LOADER_FACTORIES,
        resolveDepth: READERS.RESOLVE_DEPTH,
        pathDepth: READERS.PATH_DEPTH,
        traceRounds: READERS.TRACE_ROUNDS,
        ioGlobals: READERS.IO_GLOBALS,
        globalObjects: READERS.GLOBAL_OBJECTS,
        processReads: READERS.PROCESS_READS,
        ioBuiltins: IO_BUILTINS,
        tsxSdk: TSX_SDK,
        hookName: `/${HOOK_NAME.source}/${HOOK_NAME.flags}`,
        hookWord: `/${HOOK_WORD.source}/${HOOK_WORD.flags}`,
        descriptorName: DESCRIPTOR_NAME,
        scriptModule: `/${SCRIPT_MODULE.source}/${SCRIPT_MODULE.flags}`,
        componentModule: `/${COMPONENT_MODULE.source}/${COMPONENT_MODULE.flags}`,
        requiredTracked: REQUIRED_TRACKED,
        unreadTree: UNREAD_TREE,
        requiredRead: REQUIRED_READ,
        floors: FLOORS,
        trigger: TRIGGER,
        residuals: RESIDUALS,
        serves: SERVES,
        otherHooks: OTHER_HOOKS,
        otherPhrases: OTHER_PHRASES,
        otherComposed: OTHER_COMPOSED,
        otherLoader: OTHER_LOADER,
        otherUnreadText: OTHER_UNREAD_TEXT,
        otherLookalike: OTHER_LOOKALIKE,
        staticResidue: STATIC_RESIDUE,
        unreadHomeProbes: UNREAD_HOME_PROBES,
        plantedPaths: PLANTED_PATHS,
        plantedSource: PLANTED_SOURCE,
        plantedRequire: PLANTED_REQUIRE,
        plantedStringHooks: PLANTED_STRING_HOOKS,
        plantedLoader: PLANTED_LOADER,
        plantedManifest: PLANTED_MANIFEST,
        plantedLock: PLANTED_LOCK,
        plantedDescription: PLANTED_DESCRIPTION,
        plantedKey: PLANTED_KEY,
        plantedHomes: PLANTED_HOMES,
        plantedDescriptorSource: PLANTED_DESCRIPTOR_SOURCE,
        plantedReach: PLANTED_REACH,
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) {
      for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a quiet-row pin`).toContain(member);
    }
    // The bead's export row: row A quotes the acceptance, row T the title's artifact clause.
    const { title, notes } = exportRow();
    expect(title.length, `${BEAD}'s title was read from the tracker export`).toBeGreaterThan(0);
    const sentence = acceptance(notes);
    expect(ROWS.find(row => row.id === "A")?.label, "row A quotes the acceptance sentence").toBe(sentence);
    const clauses = acceptanceClauses(sentence ?? "");
    expect(clauses, "the acceptance names what the falsifier proves and the attempt that goes red").toHaveLength(3);
    const rowA = ROWS.find(row => row.id === "A")?.pins ?? [];
    expect(Object.keys(SERVES).sort(), "SERVES names each row A pin").toEqual([...rowA].sort());
    for (const pin of rowA) {
      const witness = rosterWitness(pin);
      expect(isObject(witness) ? witness.clause : undefined, `${pin}'s roster witness serves the clause SERVES names`).toBe(SERVES[pin]);
    }
    expect([...new Set(Object.values(SERVES))].sort(), "the acceptance's clauses are each served by a row A pin, both ways").toEqual([...clauses].sort());
    const parts = titleParts(title);
    expect(ROWS.find(row => row.id === "T")?.label, "row T quotes the title's artifact clause").toBe(parts.artifact);
    expect(
      [...new Set(SCENARIOS.map(scenario => KIND[scenario]).filter(kind => kind !== "settled"))].sort(),
      "the scenario kinds are the title's render kinds, both ways",
    ).toEqual([...parts.kinds].sort());
    for (const kind of parts.kinds) {
      const pin = rowA.find(id => {
        const witness = rosterWitness(id);
        return isObject(witness) && witness.kind === kind;
      });
      expect(pin, `a row A pin judges the ${kind} renders`).toBeDefined();
    }
    const judged = new Set(
      rowA.flatMap(id => {
        const witness = rosterWitness(id);
        return isObject(witness) && Array.isArray(witness.judges) ? witness.judges.filter((item): item is string => typeof item === "string") : [];
      }),
    );
    expect([...judged].sort(), "the effect classes row A judges are the title's, both ways").toEqual([...parts.effects].sort());
    expect(parts.phrases, "T3 reads the title's two interests").toHaveLength(2);
    // src: the render module's contract source states the uncommitted render, so a row A pin judges the settled form.
    expect(REACTIVE_FIBER_CONTRACT_SOURCE.endsWith(" context.render --no-commit"), "the render module's contract source states the uncommitted render").toBe(true);
    const settledPin = rowA.find(id => {
      const witness = rosterWitness(id);
      return isObject(witness) && witness.kind === "settled";
    });
    expect(settledPin, "a row A pin judges the settled form the contract source states").toBeDefined();
    // src: the passes are the render module's exported functions, every registered render capability is driven.
    expect([...new Set(Object.values(ENTRY))].sort(), "the passes enter through every exported function of the render module, both ways").toEqual(
      exportedFunctions(RENDER_MODULE),
    );
    expect(Object.keys(ENTRY).sort()).toEqual([...PASSES].sort());
    const native = renderIds(await nativeDescriptors());
    const injected = renderIds(injectedDescriptors());
    expect({ native, injected }, "every registered render capability of both registrations is the one the registry passes drive").toStrictEqual({
      native: [PREVIEW],
      injected: [PREVIEW],
    });
    expect(REGISTRY_PASSES.map(id => ENTRY[id]).sort(), "a registry pass drives each registration").toEqual(["registerNativeReactiveFiberRender", "registerReactiveFiberRender"]);
    for (const id of PASSES) {
      expect(DRIVEN[id].includes("queued") || DRIVEN[id].includes("deadline"), `${id} is held by a registry exactly when it is a registry pass`).toBe(REGISTRY_PASSES.includes(id));
      expect(DRIVEN[id].includes("running"), `${id} drives a running child exactly when it is native`).toBe(NATIVE_PASSES.includes(id));
    }
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 300_000 }, async () => {
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
