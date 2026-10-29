/**
 * wb-jwc.7 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R7, program-triage-2026-10-17), the rf stderr receipt-capture census: the
 * until-then leg of a gated requirement, and the standing negative guard on the noncommitted preview it names.
 * Statement: STATEMENT below, the export description's STATEMENT line verbatim (the export title truncates it). Acceptance:
 * ACCEPTANCE below, the description's three ACCEPTANCE items verbatim. A1 holds both to the export.
 * Cut #3, authored in the enumerate-the-resolvable form (orchestrator ruling R-B75 on gate refusal #2): C1 and G2 claim exactly
 * the surfaces the ENUMERATION block below lists, one checkable item per resolvable surface, each bound to a falsifier this
 * census runs (planted modules through the pin's src readers, planted children through its run-time reader); every route those
 * readers do not resolve is a named residual in the RESIDUALS block, each with a pinned quiet row. Where a reader meets what it
 * cannot resolve - a launch program, a module specifier, a load, an argv binding or a builder - it reads <opaque ...> or
 * unresolved, a new member of a pinned list, never a pass. Those two blocks are the claims verbatim: ANCHOR holds each entry to
 * its table row word for word, and FROZEN SHAPE pins the rows.
 *
 * MEASURED (read-only; cut #1 by seat ws-06, run g10-work-s123 at base bb96515; cut #2 by ws-06, run g10-work-s133 at trunk
 * b3d410f; cut #3 by seat ws-04, run g10-work-s136 at trunk e8e13f8; providers/reactivefiber.ts is byte-identical at all three
 * and at 04123dc, sha256/16 d8b764b855600103 over its 203 lines).
 * Pi: src makes five child_process launch calls: three execFileSync("git", ...) in src/index.ts, the detached host's
 * spawn(process.execPath, ...) in src/workbench/hosts/local-detached.ts, and one rf launch, nativeReactiveFiberRender's
 * `const child=spawn("rf",argv,{stdio:["ignore","pipe","pipe"],env:...})` in src/workbench/providers/reactivefiber.ts. src names
 * child_process in exactly three import declarations, one in each of those files, and nowhere else; it never names
 * diagnostics_channel; and it makes one load whose specifier does not resolve, the detached host's
 * createRequire(import.meta.url)(request.localProvider.modulePath) in registryFor. The launch's argv is
 * `const argv=renderArgv(selector,workspaceRoot)`, used once; the checker binds that call to the module-level renderArgv, the
 * file's only declaration of the name, whose one return lists --no-commit as a literal element; nativeReactiveFiberRender
 * (:133-198, 66 lines) is referenced only by nativeReactiveFiberPreview and the native registration's invoke, each calling it
 * with three arguments; both reactivefiber descriptors src writes are effectClass read. wb-x32 (W10 provider/interop, the R5
 * gate) is open, so no committing rf invocation path exists. At run time the launch's stderr gets exactly one listener after
 * Node assigns it, a data listener reading chunk.length only, and the stream, its handle and the ChildProcess read with no
 * listener-count, own-property, prototype or onread difference from the reference child. Its custody block (stop() through the
 * 60 s deadline timer) and its stderr listener are byte-identical to the lines the acceptance names at 9df9a03
 * (providers/reactivefiber.ts:88-98 and :107-110; sha256 c6179224ccc14e25 and 3cb22ed8c20977cf over the 11 and the 4 lines).
 * The runtime journals nativeRefs for a live non-read node only from its settled output (src/workflow/runtime.ts:
 * nativeRefOf(nativeEvidence(...)) on the ok row); a node that throws is journaled ok false with none.
 * rf (measured by run g10-work-s123; cut #2 re-read only `rf --json --version`: 0.1.845, 80 leaves, operation.show,
 * context.show and context.history served_reachable; cut #3 did not re-read rf): driven in a scratch workspace, a committing context render (no
 * --no-commit) wrote one stderr line before its first stdout byte at default verbosity, `render_id=rfr_<26> transaction_id=rft_<26>`:
 * key=value text, not JSON, and no operation_id. Under -v every log line carries the operation id as a `[rfo_<26>]` prefix, from
 * the first line (about 1 s before the commit). The --no-commit preview wrote nothing on stderr. `rf operation show <rfo_>` read
 * {state committed, render_id, transaction_id, commit_seq, ...} and `rf context show <rfr_>` read the committed receipt carrying
 * operation_id. So the rf side of the gate artifact (a resolvable receipt id) is met on this host, in that shape, and the Pi side
 * (a committing rf capability) is not.
 *
 * CASES. One test per pin, titled by the clause it answers, by the scenario its reading drives (C2, C3, R1, R2) and by the
 * residuals that bound it; each pin measures a witness held to WITNESS, and the closing case holds the reached record to ROWS.
 * A pin is UNTIL-THEN (its witness moves when src gains a committing rf invocation through a surface its items name, and its
 * failure names the acceptance as owed) or STANDING (it holds today and must keep holding).
 *  capture (ACCEPTANCE[0]). C1 UNTIL-THEN, read from src and at run time: exactly the C1-* items of ENUMERATION. The src
 *    readers parse (TypeScript AST) every script file under src (.ts, .mts, .cts, .js, .mjs, .cjs; declaration files excluded)
 *    and, as a module of its own, the text of every src string or template that calls require( or getBuiltinModule( (today
 *    only the workflow worker's inlined source, which the host evaluates with new Worker(..., { eval: true })); the argv
 *    binding and its builder resolve through TypeScript's checker over the launching file alone. C1's witness holds (a) the rf
 *    launch sites, (b) the launch inventory, (b2) the child_process module sites and the opaque loads, (c) each rf launch's
 *    argv reading, its builder's lines and the declarations of the builder's name, (d) the launching declaration and its
 *    references, (g) the launching declaration's text, (e) the reactivefiber registrations and (f) both arms' recorded argv.
 *    C2 UNTIL-THEN: the acceptance's own scenario run through Pi's one rf launch, journaled as a committing (write-class) node by a
 *    test host: a stand-in rf writes the receipt line on stderr (the acceptance's JSON form and the two measured rf 0.1.845 forms)
 *    before any stdout byte, then exceeds the deadline; the run fails transport and neither of its two journal rows carries a
 *    nativeRef or any rf id. The same readers find the stdout envelope's reference on a settled run (the live control): today a
 *    journaled rf reference comes only from stdout, after settlement. C3 UNTIL-THEN: the receipt lines' bytes reached the launched
 *    child's stderr pipe before the deadline was advanced (its bytesRead), and when the deadline SIGTERM lands the journal holds
 *    the dispatched row alone, with no rf id: nothing is captured before the kill sequence.
 *  reconcile (ACCEPTANCE[1]). R1 UNTIL-THEN: the resume of that killed journal refuses uncertain-effect naming the producer and
 *    no rf id (none was captured), and RECONCILE_EVIDENCE_READS.reactivefiber offers the preview alone, no operation-id read.
 *    R2 STANDING: across that killed run and its resume (the write-class test host) the stand-in records exactly one spawn and
 *    the host one node call, and the resume replays and reconciles nothing.
 *  preview-guard (ACCEPTANCE[2]). G1 STANDING: the clause's own line ranges (88-98, 107-110) give the custody block's and the
 *    stderr listener's lengths; both are located in today's src by the TypeScript AST inside nativeReactiveFiberRender (the
 *    statements from `const stop` through `const timer`; every `<x>.stderr.<listen>("data", ...)` statement) and equal the
 *    9df9a03 text byte for byte; the custody sits in nativeReactiveFiberRender, which nativeReactiveFiberPreview delegates to;
 *    and for each kill the statement names (deadline/overflow, escalating after the statement's "SIGTERM-SIGKILL(500 ms)") the
 *    preview's custody runs under fake timers against a stand-in that ignores SIGTERM: no SIGTERM before the trigger, SIGTERM at
 *    it, alive 1 ms before the escalation, closed at it, and the typed transport error. G2 STANDING: exactly the G2-* items of
 *    ENUMERATION, read two ways: a static leg over the same src read (the launch binding's uses and its stdio, the
 *    diagnostics_channel module sites, the opaque loads) and a run-time leg over both input arms (the legacy one through the
 *    preview leaf), each read while the stand-in hangs after its receipt lines reached the pipe, against the reference child
 *    G2-TRAP describes; after the abort the error is the typed cancel and no process warning names an rf id. Sinks: the preview
 *    reading under all three receipt forms on stderr (their bytes read) is exactly {contract, source, workspaceRoot} carrying
 *    the stdout ids alone, and neither kill's error names an rf id.
 * T0: the readings are live (the stand-in is the only PATH entry, src holds the surfaces, the worker's embedded source is in the
 * read set, the stimulus is every receipt line). ENUMERATION: one case per item, its falsifier caught by its pin's own reader,
 * so a hollowed reader reds the item that names its route. T2 and T3: the instruments read their controls (the read set,
 * embedded sources, G1's AST locators, the export and journal readers; an untouched planted child reads as the reference does).
 * RESIDUALS: each named residual's quiet row reads quiet. ANCHOR: the ENUMERATION and RESIDUALS blocks below are the tables'
 * rows, word for word (an anchor outside both tables' literals); BINDING: each item's falsifier calls a reader its words'
 * clause tag (C1 (a) ... (g), G2 (static) or (run time)) names, so a falsifier swapped onto another clause's reader reds. A1 the
 * outside anchors: the export's STATEMENT line and
 * ACCEPTANCE list are this file's, each row's pins are exactly its export item's clauses (cut mechanically at ", then ",
 * ", and " and a spaced dash), the SURFACES line is this file's, and G1's ranges, escalation and kills come from the export's
 * own text. FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, WITNESS's keys are exactly the
 * pins, every reading of READINGS is pinned exactly once (a pin swapped onto another pin's reading reds), ENUMERATION pins
 * `${id}:${pin}` and RESIDUALS pins `${id}:${pins}`.
 * ENUMERATION (one checkable item per resolvable surface, each bound to a falsifier this census runs; ANCHOR holds every entry
 * below to its table row word for word, and FROZEN SHAPE pins the rows):
 *  C1-LAUNCH-ROUTES: C1 (a) reads as a launch call: a call by a launcher's own name (spawn, spawnSync, execFile, execFileSync,
 *    exec, execSync or fork); a call through an import specifier or a destructuring element renaming one, or through a const
 *    bound to a launcher's name or to a member naming one; a member call naming a launcher under any receiver, by name or by
 *    literal key; and an execve member call on the identifier process. It is an rf launch when its command words
 *    (C1-COMMAND-WORDS) include rf, read as path:declaration:launcher.
 *  C1-COMMAND-WORDS: C1 (a) reads a launch's command words from its first argument - a string, a template's literal parts (each
 *    substitution read by these same rules, or as a space when it does not resolve), every same-file const of that name in any
 *    scope, either side of ?? / || / ?:, a + join - read as a shell line split at whitespace, quotes and shell operators with
 *    each path reduced to its base name (.exe and .cmd dropped), plus each literal element of an array second argument.
 *  C1-INVENTORY: C1 (b) reads every launch reached by a launcher's own or local name, through a child_process module binding
 *    (C1-MODULE-BINDINGS), or as an execve member call on the identifier process as an inventory member launcher:program, the
 *    program being its first command word or <opaque text> when that does not resolve; a member call under any other receiver is
 *    no member.
 *  C1-MODULE-BINDINGS: C1 (b) reads as a child_process module binding: a namespace import, a default import, an import specifier
 *    naming its default, an import-equals require, and a const bound to, or destructured for the default of, a call whose first
 *    argument resolves to child_process (C1-SPECIFIER-TEXT) - require, import(), getBuiltinModule or any other callee - or to
 *    such a call's default member; a member call on such a call, or on its default member, is read as one too.
 *  C1-SPECIFIER-TEXT: C1 (b) resolves a module specifier as exact text: a string, a no-substitution template, every same-file
 *    const of that name in any scope, a template whose every substitution resolves, a + join, or a ?: / ?? / || / && whose sides
 *    both resolve (either side counts); a specifier that does not resolve binds no module, and C1-OPAQUE-LOADS reads its load
 *    (gate member LC1: a same-file const specifier).
 *  C1-MODULE-SITES: C1 (b2) reads every place src spells or resolves child_process or node:child_process: each import,
 *    export-from and import-equals declaration (type-only ones included), each call, whatever its callee, whose first argument
 *    resolves to one (C1-SPECIFIER-TEXT), each other string or no-substitution template literal whose text is one, and each other
 *    template or + join, at its outermost, whose texts resolve to one, in any role; read as path:declaration:role:specifier.
 *  C1-OPAQUE-LOADS: C1 (b2) reads every load call whose specifier does not resolve (C1-SPECIFIER-TEXT) - import(), require or
 *    getBuiltinModule called by name or as a member, createRequire(...)(...), or a call through a same-file const bound to
 *    createRequire(...) - whatever it would load, read as path:declaration:loader:<opaque text>; G2 holds the same list.
 *  C1-ARGV-BINDING: C1 (c) reads each rf launch's argv argument: an inline array; or an identifier that TypeScript's checker (a
 *    no-lib program over the launching file alone) binds by scope to one const declaration, read through its initializer, with
 *    its use count (every identifier the checker resolves to it); anything else reads unresolved.
 *  C1-ARGV-BUILDER: C1 (c) reads, when that const's initializer calls an identifier, the builder the checker binds it to by scope
 *    - a function declaration, or a const bound to an arrow or function expression - a same-named declaration nested in the
 *    launching declaration included, with that declaration's whole source lines; an imported, ambiguous or otherwise unbound
 *    callee reads unresolved (gate member LC2: a nested builder shadowing the module-level one).
 *  C1-ARGV-RETURNS: C1 (c) reads every return of the resolved builder (an arrow's expression body included; nested functions
 *    excluded) for --no-commit as a literal element: unconditional when every return lists it directly, conditional when it
 *    appears only inside a spread or a conditional, absent, or unresolved when a return is no array literal; for exec and
 *    execSync it reads whether the command's words list it.
 *  C1-BUILDER-DECLARATIONS: C1 (c) reads every declaration in the launching file that binds the builder's name - a function, a
 *    class, a const, let or var, a destructuring element, a parameter, an import, a named function or class expression, an enum
 *    or a namespace - as path:name:kind@declaration.
 *  C1-OPTIONS: C1 (c) reads each rf launch's options argument as its source text, or none.
 *  C1-DECLARATION-REFERENCES: C1 (d) reads, per rf launch, its declaration's parameters and every src reference to that
 *    declaration by its name - an identifier or a literal key - as a call with its arity, a value, an import or an export.
 *  C1-DECLARATION-TEXT: C1 (g) reads, per rf launch, its declaration's line count and sha256/16 over those lines (for a launch at
 *    module level, the whole file), so any edit inside the launching declaration moves it.
 *  C1-REGISTRATIONS: C1 (e) reads every object literal src writes whose id resolves to a reactivefiber.* name, as
 *    path:id:effectClass: the id and the effectClass each read as C1-COMMAND-WORDS reads a first argument's text (a string, a
 *    template's literal text, a same-file const, a + join, either side of ?: / ?? / ||), through a property assignment by name or
 *    literal key, a shorthand property naming a same-file const, or a spread of a same-file const object literal (properties in
 *    source order, a later one overriding) (gate member LC3: a spread with an effectClass override).
 *  C1-RUNTIME-ARGV: C1 (f) reads, at run time, both input arms' argv as the stand-in recorded them, and which arm's recorded argv
 *    lists no --no-commit.
 *  G2-BINDING-USES: G2 (static) reads, per rf launch C1 finds, whether it is bound to a const or a let, and every reference to
 *    that binding by name inside the launching declaration: a member read or call; a stdout or stderr member with its method, and
 *    for a stderr data listener its chunk parameter's uses (plus this or arguments in a non-arrow listener); or a bare use by its
 *    syntax kind; so a destructuring, child.stdio, an element access, a hand-off to a helper, a second listener and another
 *    stream member each read as a new use.
 *  G2-STDIO: G2 (static) reads each rf launch's stdio option text, or <unread> together with the unbound call when the launch is
 *    bound to no declared name.
 *  G2-CHANNEL-SITES: G2 (static) reads every place src spells or resolves diagnostics_channel or node:diagnostics_channel, by the
 *    roles C1-MODULE-SITES reads for child_process (gate members LG1, LG1b, LG1x and LG2: an import of it; LG1g: a
 *    getBuiltinModule call naming it).
 *  G2-OPAQUE-LOADS: G2 (static) reads every opaque load, as C1-OPAQUE-LOADS reads it.
 *  G2-TRAP: G2 (run time) reads, for each input arm, the ChildProcess the "child_process" diagnostics channel publishes for the
 *    launch, with child.stderr trapped by this census's subscriber (an accessor that records the stream Node assigns and turns
 *    back into a data property): preset when the ChildProcess already owned a stderr when published, reassigned when child.stderr
 *    is no longer the stream Node assigned or the trap never saw one; plus how many ChildProcess objects were published before
 *    the reference child and the bytes the stderr pipe had delivered at the reading. Each arm is read against a reference child
 *    this census spawns itself - this process's node writing the same receipt lines on stderr and hanging, stdio
 *    ["ignore","pipe","pipe"], one listener counting chunk.length - trapped and read the same way once its bytes arrived and 250
 *    ms passed.
 *  G2-LISTENER-LOG: G2 (run time) reads every listener added to or removed from the assigned stream after Node assigned it,
 *    through the reading - by on, once, addListener, prependListener, prependOnceListener or the stream's own internals -
 *    recorded by its newListener and removeListener events while this census's two recorders stay attached to it (a once listener
 *    as the function it wraps), as +event or -event with the listener's chunk uses, in order; so a listener that fired and
 *    detached before the reading is still read (gate members LG1, LG1b, LG1x and LG1g: a once data listener attached on the next
 *    tick).
 *  G2-DATA-LISTENERS: G2 (run time) reads, at the reading, each data listener's chunk uses (parsed from the listener's own
 *    running source) and the stream's encoding.
 *  G2-LISTENER-COUNTS: G2 (run time) reads, at the reading, the listener count of every event the stream has listeners for, as a
 *    difference from the reference child's.
 *  G2-OWN-PROPERTIES: G2 (run time) reads every own property of the stream, of its handle and of the ChildProcess - string and
 *    symbol keys - as object.key:kind (accessor, function or value), as a difference from the reference child's, so an own
 *    accessor or function override on any of the three reads (gate member LG2: an own accessor push).
 *  G2-PROTOTYPES: G2 (run time) reads whether the stream's, the handle's and the ChildProcess's prototypes are the reference
 *    child's, and whether the handle's onread, read through its prototype accessor, is the reference handle's.
 *  G2-SINKS: G2 (run time) reads, after the abort, the typed cancel and the rf ids any process warning names during the launch;
 *    and the preview reading's keys and rf ids under all three receipt forms on stderr, and the rf ids each kill's typed error
 *    spells.
 * RESIDUALS (named, each with a pinned quiet row; ANCHOR holds every entry below to its table row word for word; a newly
 * found escape that contradicts no enumerated item is a residual-list addition):
 *  R-OPAQUE-LAUNCHER (C1): a launch function reaching a call other than as C1-LAUNCH-ROUTES reads it - for instance through a
 *    parameter, Reflect.apply, call/apply/bind, a computed key that is no literal, or as a member of a receiver that is no
 *    child_process binding with a program that does not resolve - is no launch to C1 (a)-(d); such a launch moves C1 only through
 *    C1-MODULE-SITES when its module adds a site, so one fed from an existing child_process import moves no C1 field (quiet row:
 *    those calls, added to a module that already holds its child_process imports, add no launch site, inventory member, module
 *    site or opaque load).
 *  R-OPAQUE-LOADER (C1, G2): a module loaded by a loader the readers do not name - for instance a loader received as a parameter
 *    or returned by a library call, require.call, Module._load, process.binding or process._linkedBinding, or process.dlopen -
 *    with a specifier that no literal spells and that does not resolve as C1-SPECIFIER-TEXT reads it adds no module site and no
 *    opaque load to either pin; a launch through it is still read by C1 (a) when its command words include rf, so a committing
 *    render reached that way with a program that does not resolve moves no C1 field, and a diagnostics_channel subscriber reached
 *    that way moves no G2 static field, while G2's run-time leg still reads what it does to the stream (quiet row: such loads of
 *    both modules, their names built from character codes and a join, add nothing to either pin's site, load or launch readings).
 *  R-OPAQUE-REGISTRATION (C1): a descriptor whose id resolves to no text - a parameter, an import, a shorthand property naming no
 *    same-file const, a string built at run time, or a spread of anything but a same-file const object literal (a call result, an
 *    import, a parameter) - or to no reactivefiber.* name is no registration to C1 (e); a committing launch behind it is still
 *    read by (a)-(d) (quiet row: write-class descriptors with a parameter id, a shorthand parameter id, an rf.* id and a spread
 *    call result read no registration).
 *  R-PROTOTYPE-PATCH (C1): a launcher or ChildProcess method patched on a shared prototype that the src readers never see written
 *    - for instance ChildProcess.prototype.spawn reached through an existing child with Object.getPrototypeOf - rewriting an rf
 *    launch's argv or program after its builder returns, under a condition this census does not set (an environment variable), is
 *    read by no C1 item: the static items read the launch, its builder and its module sites unchanged, and C1 (f) reads only the
 *    argv the stand-in records under this census's own environment (quiet row: such a patch added to a module beside an unchanged
 *    launch adds no launch site, inventory member, module site, opaque load, argv reading or registration).
 *  R-EVALUATED-SOURCE (C1): source text assembled at run time and evaluated (new Function, eval, vm, a Worker with eval), or an
 *    embedded string that neither calls require( nor getBuiltinModule(, is no module to the src readers (quiet row: a launch
 *    joined from parts and handed to new Function reads no embedded module, rf launch, inventory member, module site or opaque
 *    load).
 *  R-NON-PROCESS (C1): an rf invocation that is no child process (a socket or HTTP request, an in-process library; Pi vendors no
 *    rf library and rf publishes no TS SDK) is not read (quiet row: a fetch-driven committing render reads no launch, inventory
 *    member, module site or registration).
 *  R-STREAM-INTERNALS (G2): a read wired below the surfaces G2's legs read, through state the reference child shares or the
 *    static leg does not read - a patched shared prototype the stream, its handle or its chunks inherit from (a Readable, Socket,
 *    EventEmitter or handle method, a Buffer or typed-array accessor such as the length the counting listener reads), the
 *    stream's internal state objects (its _readableState or _events), a callback stored through a prototype accessor other than
 *    the handle's onread, a direct read() or unshift, a listener attached before Node assigns child.stderr and removed before the
 *    reading, or the parent's view of the pipe's file descriptor - is invisible to both legs (quiet row: a push hook on the
 *    shared Readable prototype, beside a pure counting listener, captures all three stderr ids while the static reading and the
 *    run-time reading against the reference read clean).
 *  R-RECORDER-DETACH (G2): a listener change made while this census's newListener and removeListener recorders are detached from
 *    the stream - removed through the listener API (the removeListener recorder first, so neither removal emits) and re-attached
 *    afterwards, for instance from inside a once listener's own body - is no entry in G2-LISTENER-LOG, and with the recorders
 *    back and the listener gone the stream reads as the reference does (quiet row: a once data listener attached while the
 *    recorders are detached, re-attaching them as it fires, captures the stderr operation id while the run-time reading equals
 *    the clean reading).
 * SCOPE AND NOT CLAIMED: the src readers read src only (today every src file is .ts; a committing path in a module outside src,
 * such as the detached host's operator-loaded local provider, is not read), and the rf child's environment allowlist is
 * pinned by test/workbench-env-scrub-census.test.ts, not here. No reading claims more than its items name: a surface no item
 * or residual names is unread, and a newly found escape that contradicts no item is a residual-list addition. C2, C3, R1 and
 * R2 drive Pi's noncommitted launch under a test host's write class because Pi has no committing one; they show what the
 * runtime journals today, not how a future committing provider spells its argv or its capture, and R2 drives the write class
 * only. G1 byte-pins the two blocks the clause's ranges name; lines outside them (the finally block's timer clearing, the close
 * handler) are read only through the two kill sequences and C1 (g)'s declaration text.
 * OWED (by the cut that builds the committing render, once wb-x32 resolves to one): the acceptance itself. The measured rf
 * 0.1.845 shape bears on it: the default-verbosity receipt line carries render_id and transaction_id, not operation_id, so a
 * capture either reads the -v `[rfo_...]` prefix or reconciles the rfr_ id through rf context show. Such a cut reds C1 when its
 * launch moves a surface a C1 item names (a new rf launch, inventory member, child_process module site or opaque load, a
 * changed argv, builder, builder declaration, options, launching declaration text, reference or registration), C2 or C3 when
 * it journals a captured reference, and R1 when the resume names an id or the reconcile reads gain an operation-id read; a
 * committing path built only through a named residual route moves none of them.
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch as the only PATH entry, and the reference
 * and planted children run this process's node directly; src and the tracker export are only read.
 */
import { ChildProcess, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { subscribe, unsubscribe } from "node:diagnostics_channel";
import { chmodSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { Socket } from "node:net";
import { delimiter, dirname, join, relative } from "node:path";
import { PassThrough, Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it, vi } from "vitest";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { nativeReactiveFiberPreview, nativeReactiveFiberRender, type ReactiveFiberRenderSelector } from "../src/workbench/providers/reactivefiber.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { runWorkflow, type WorkflowHost, type WorkflowRunResult } from "../src/workflow/runtime.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-jwc.7";
const EXPORT = ".beads/issues.jsonl";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const RUNTIME = "src/workflow/runtime.ts";
const TITLE_ID = "[RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R7]";
const DASH = "\u2014";
/** The bead's statement: the export description's STATEMENT line after its label, verbatim (A1). */
const STATEMENT = `The committing rf invocation path shall capture and journal the stderr receipt line's operation_id before any deadline/overflow kill, and shall never SIGKILL a committing render without a subsequent operation-id reconcile; the no-commit preview's stderr discard and SIGTERM-SIGKILL(500 ms) custody remain byte-unchanged. Gate artifact: a committing rf capability in Pi (wb-x32, the R5 gate) plus a resolvable receipt id ${DASH} rf operation show (FOC-06-c/rfc-mq7k6.15) or context history/show carrying operation_id (FOC-06-e/rfc-mq7k6.26); the producer's stderr receipt line itself is already on rf main at the pin (STORE-TXN-A27, FOC/BEADS-2026-10-16.md:100@8a8b83e4d).`;
/** The bead's acceptance: the export description's three ACCEPTANCE items, verbatim (A1). */
const ACCEPTANCE: readonly string[] = [
  "A unit test drives the committing invocation with a fake child writing the JSON receipt line on stderr before any stdout byte, then exceeding the deadline: asserts the journal row carries nativeRefs [{provider: reactivefiber, type: operation, id: rfo_...}] parsed from that line, and that capture precedes the kill sequence.",
  `After a deadline kill with a captured id, the follow-up is an operation-id reconcile (or a typed uncertain-effect naming the id) ${DASH} asserted: no silent retry, no second spawn.`,
  `Negative guard: nativeReactiveFiberPreview (providers/reactivefiber.ts:88-98,107-110@9df9a03) is unchanged for the preview leaf ${DASH} stderr still only counted, no receipt parsing added to the read-only path.`,
];
/** The surfaces the export's SURFACES line names (A1). */
const SURFACES = "src/workbench/providers/reactivefiber.ts:88-98,107-110@9df9a03, src/workflow/runtime.ts:1581-1585@9df9a03";

/** An acceptance item's clauses: the item cut at ", then ", ", and " and the spaced dash, mechanically. */
function clausesOf(item: string): string[] {
  return item.split(new RegExp(`, then |, and | ${DASH} `));
}
function clauseOf(item: string | undefined, index: number): string {
  const clause = item === undefined ? undefined : clausesOf(item)[index];
  if (clause === undefined) throw new Error(`acceptance clause ${index} is absent`);
  return clause;
}
/** The line ranges a clause cites for the provider (`providers/reactivefiber.ts:88-98,107-110@...`), as [first, last] pairs. */
function rangesOf(clause: string): Array<readonly [number, number]> {
  const cited = /providers\/reactivefiber\.ts:([0-9,-]+)@/.exec(clause)?.[1] ?? "";
  return cited
    .split(",")
    .map((range) => range.split("-").map(Number))
    .filter((pair): pair is [number, number] => pair.length === 2 && pair.every(Number.isSafeInteger))
    .map(([first, last]) => [first, last] as const);
}
/** The kills the statement names (`before any deadline/overflow kill`). */
function killKindsOf(statement: string): string[] {
  return (/before any ([a-z]+(?:\/[a-z]+)*) kill/.exec(statement)?.[1] ?? "").split("/").filter((kind) => kind !== "");
}
/** The escalation the statement names (`SIGTERM-SIGKILL(500 ms)`), in ms. */
function escalationOf(statement: string): number {
  return Number(/SIGTERM-SIGKILL\(([0-9]+) ms\)/.exec(statement)?.[1] ?? Number.NaN);
}

/** The custody block (stop() through the deadline timer) at 9df9a03, providers/reactivefiber.ts:88-98, verbatim. */
const CUSTODY_AT_PIN: readonly string[] = [
  '  const stop=(reason:"deadline"|"stdout"|"stderr"|null)=>{',
  "    if(reason!==null && stopReason===null) stopReason=reason;",
  "    if(settled||child.exitCode!==null||child.signalCode!==null) return;",
  '    child.kill("SIGTERM");',
  "    escalation??=setTimeout(()=>{",
  '      if(child.exitCode===null&&child.signalCode===null) child.kill("SIGKILL");',
  "    },500);",
  "  };",
  "  const onAbort=()=>stop(null);",
  '  signal?.addEventListener("abort",onAbort,{once:true});',
  '  const timer=setTimeout(()=>stop("deadline"),60_000);',
];
/** The stderr listener at 9df9a03, providers/reactivefiber.ts:107-110, verbatim. */
const STDERR_AT_PIN: readonly string[] = [
  '      child.stderr.on("data",(chunk:Buffer)=>{',
  "        stderrBytes+=chunk.length;",
  '        if(stderrBytes>MAX_BYTES) stop("stderr");',
  "      });",
];
/** The rf launch's argv builder as measured at trunk b3d410f (providers/reactivefiber.ts:111-116), verbatim (C1 (c)). */
const ARGV_BUILDER_TODAY: readonly string[] = [
  "function renderArgv(selector:ReactiveFiberRenderSelector,workspaceRoot:string):string[] {",
  '  const select="view" in selector',
  '    ? ["--view",selector.view,"--task-id",selector.taskId,...(selector.model===undefined?[]:["--model",selector.model])]',
  '    : ["--model",selector.model,"--task",selector.task];',
  '  return ["--workspace",workspaceRoot,"context","render",...select,"--no-commit","--no-input","--json"];',
  "}",
];
/** src's one load whose specifier is not literal text, measured at trunk e8e13f8: the detached host's local-provider load (C1, G2). */
const OPAQUE_LOAD_TODAY = "src/workbench/hosts/local-detached.ts:registryFor:createRequire():<opaque request.localProvider.modulePath>";
/** sha256/16 over nativeReactiveFiberRender's 66 lines (providers/reactivefiber.ts:133-198), measured at trunk e8e13f8 (C1 (g)). */
const LAUNCHING_DECLARATION_SHA = "f3504a00f6a5e28b";
/** The preview's execution deadline (the custody block's timer, measured), in ms. */
const DEADLINE_MS = 60_000;
const ESCALATION_MS = escalationOf(STATEMENT);
/** More stderr than the preview's 256 KiB bound, so the overflow kill fires. */
const OVERFLOW_BYTES = 300_000;
/** The real-time bound on any wait for the stand-in (it runs under real time while the provider's timers are fake). */
const WAIT_MS = 30_000;
/** How long a check for an absent signal waits in real time before reading the stand-in's marker. */
const QUIET_MS = 250;
const realSetTimeout = globalThis.setTimeout;
const realClearTimeout = globalThis.clearTimeout;

/** An obviously fake rf id of the kind given, padded to the 26 characters rf mints. */
function rfId(kind: "rfo" | "rfr" | "rft" | "rfw", word: string): string {
  return `${kind}_${word.padEnd(26, "0")}`;
}
const STDERR_OPERATION = rfId("rfo", "stderrreceipt");
const STDERR_RENDER = rfId("rfr", "stderrreceipt");
const STDERR_TRANSACTION = rfId("rft", "stderrreceipt");
const STDOUT_OPERATION = rfId("rfo", "stdoutenvelope");
const WORKSPACE_ID = rfId("rfw", "scratchworkspace");
/** A committing render's stderr receipt line, in each form: the acceptance's JSON line, then rf 0.1.845's default and -v forms. */
const RECEIPT_LINES: readonly string[] = [
  JSON.stringify({ operation_id: STDERR_OPERATION, render_id: STDERR_RENDER, transaction_id: STDERR_TRANSACTION }),
  `render_id=${STDERR_RENDER} transaction_id=${STDERR_TRANSACTION}`,
  `[${STDERR_OPERATION}] INFO invocation command=context.render`,
];
/** The stderr bytes the stand-in writes before anything else: every receipt line, newline-terminated. */
const RECEIPT_TEXT = RECEIPT_LINES.map((line) => `${line}\n`).join("");
const RECEIPT_BYTES = Buffer.byteLength(RECEIPT_TEXT);
/** Every rf id a text spells, sorted and unique. */
function rfIdsIn(text: string): string[] {
  return [...new Set(text.match(/rf[a-z]_[0-9a-z]{22,32}/g) ?? [])].sort();
}

type Arm = "legacy" | "view";
const SELECTORS: Readonly<Record<Arm, ReactiveFiberRenderSelector>> = {
  legacy: { model: "model", task: "task" },
  view: { view: "view", taskId: "wb-task", model: "model" },
};
/** The arms whose recorded argv carries no --no-commit: a committing invocation. */
function committingArms(argvs: Readonly<Partial<Record<Arm, readonly string[]>>>): string[] {
  return Object.entries(argvs)
    .filter(([, argv]) => argv !== undefined && !argv.includes("--no-commit"))
    .map(([arm]) => arm)
    .sort();
}

/* ------------------------------------------------------------------ *
 * src readers (TypeScript AST)
 * ------------------------------------------------------------------ */

interface SourceText {
  readonly path: string;
  readonly text: string;
}
/** Every script file under a directory (.ts, .mts, .cts, .js, .mjs, .cjs), declaration files excluded. */
function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? sourceFiles(join(dir, entry.name))
      : entry.isFile() && /\.[mc]?[jt]s$/.test(entry.name) && !/\.d\.[mc]?ts$/.test(entry.name)
        ? [join(dir, entry.name)]
        : [],
  );
}
function srcTree(): SourceText[] {
  const files = sourceFiles(join(REPO, "src"))
    .map((file) => ({ path: relative(REPO, file).split("\\").join("/"), text: readFileSync(file, "utf8") }))
    .sort((a, b) => a.path.localeCompare(b.path));
  return [...files, ...files.flatMap(embeddedSources)];
}
function visit(node: ts.Node, visitor: (node: ts.Node) => void): void {
  visitor(node);
  ts.forEachChild(node, (child) => visit(child, visitor));
}
function parsed(file: SourceText): ts.SourceFile {
  return ts.createSourceFile(file.path, file.text, ts.ScriptTarget.Latest, true);
}
/**
 * Source text a src module carries inside a string or template that calls require( or getBuiltinModule( (the workflow worker's
 * inlined CommonJS source, which the host evaluates with new Worker(..., { eval: true })), read as a module of its own: a
 * template's substitutions read as `undefined`.
 */
function embeddedSources(file: SourceText): SourceText[] {
  const source = parsed(file);
  const found: SourceText[] = [];
  visit(source, (node) => {
    const text = ts.isStringLiteralLike(node)
      ? node.text
      : ts.isTemplateExpression(node)
        ? [node.head.text, ...node.templateSpans.map((span) => `undefined${span.literal.text}`)].join("")
        : undefined;
    if (text !== undefined && /\brequire\(|\bgetBuiltinModule\(/.test(text))
      found.push({ path: `${file.path}#embedded@${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`, text });
  });
  return found;
}
/** An expression without its parentheses, `as`, `satisfies`, `!`, type assertions and `await`. */
function unwrapped(node: ts.Expression): ts.Expression {
  let at = node;
  while (
    ts.isParenthesizedExpression(at) ||
    ts.isAsExpression(at) ||
    ts.isSatisfiesExpression(at) ||
    ts.isNonNullExpression(at) ||
    ts.isTypeAssertionExpression(at) ||
    ts.isAwaitExpression(at)
  )
    at = at.expression;
  return at;
}
function literalText(node: ts.Node | undefined): string | undefined {
  return node !== undefined && ts.isStringLiteralLike(node) ? node.text : undefined;
}
/** The process launchers a child of rf would come from (process.execve is read apart, by its receiver). */
const LAUNCHERS: ReadonlySet<string> = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "fork", "exec", "execSync"]);
const SHELL_LAUNCHERS: ReadonlySet<string> = new Set(["exec", "execSync"]);
const LISTENS: ReadonlySet<string> = new Set(["on", "once", "addListener", "prependListener", "prependOnceListener"]);
const CHILD_PROCESS: ReadonlySet<string> = new Set(["child_process", "node:child_process"]);
const DIAGNOSTICS_CHANNEL: ReadonlySet<string> = new Set(["diagnostics_channel", "node:diagnostics_channel"]);

/** One module's bindings the readers resolve through. */
interface Scan {
  readonly file: SourceText;
  readonly source: ts.SourceFile;
  /** Every const binding's initializers, by name: every same-named const of any scope (a shadowing binding can only over-report). */
  readonly consts: ReadonlyMap<string, readonly ts.Expression[]>;
  /** Local names for a launcher: an import or destructuring that renames one, or a const bound to one. */
  readonly aliases: ReadonlyMap<string, string>;
  /** Local names bound to the child_process module: a namespace or default import, an import of its default, an import-equals, or a const bound to a loading call or its default. */
  readonly modules: ReadonlySet<string>;
}
/** Every exact text an expression spells: a string, a no-substitution template, a same-file const (every same-named const), a
 * template whose every substitution resolves, a + join, either side of ?: / ?? / || / &&; undefined when any part does not resolve. */
function textsOf(node: ts.Expression | undefined, scan: Scan, depth = 0): string[] | undefined {
  if (node === undefined || depth > 8) return undefined;
  const at = unwrapped(node);
  const literal = literalText(at);
  if (literal !== undefined) return [literal];
  const all = (parts: readonly (string[] | undefined)[]): string[] | undefined =>
    parts.some((part) => part === undefined) ? undefined : [...new Set(parts.flatMap((part) => part ?? []))];
  const product = (parts: readonly (string[] | undefined)[]): string[] | undefined => {
    let texts = [""];
    for (const part of parts) {
      if (part === undefined) return undefined;
      texts = texts.flatMap((prefix) => part.map((text) => `${prefix}${text}`));
      if (texts.length > 64) return undefined;
    }
    return [...new Set(texts)];
  };
  if (ts.isIdentifier(at)) {
    const bound = scan.consts.get(at.text) ?? [];
    return bound.length === 0 ? undefined : all(bound.map((initializer) => textsOf(initializer, scan, depth + 1)));
  }
  if (ts.isTemplateExpression(at)) return product([[at.head.text], ...at.templateSpans.flatMap((span) => [textsOf(span.expression, scan, depth + 1), [span.literal.text]])]);
  if (ts.isConditionalExpression(at)) return all([textsOf(at.whenTrue, scan, depth + 1), textsOf(at.whenFalse, scan, depth + 1)]);
  if (ts.isBinaryExpression(at)) {
    const operator = at.operatorToken.kind;
    if (operator === ts.SyntaxKind.PlusToken) return product([textsOf(at.left, scan, depth + 1), textsOf(at.right, scan, depth + 1)]);
    if (operator === ts.SyntaxKind.QuestionQuestionToken || operator === ts.SyntaxKind.BarBarToken || operator === ts.SyntaxKind.AmpersandAmpersandToken)
      return all([textsOf(at.left, scan, depth + 1), textsOf(at.right, scan, depth + 1)]);
  }
  return undefined;
}
/** Whether an expression's texts include one of the specifiers. */
function resolvesTo(node: ts.Expression | undefined, scan: Scan, specifiers: ReadonlySet<string>): boolean {
  return (textsOf(node, scan) ?? []).some((text) => specifiers.has(text));
}
/** An expression that yields child_process: any call whose first argument resolves (textsOf) to its specifier, or such a call's default member. */
function loadsChildProcess(node: ts.Expression, scan: Scan): boolean {
  const at = unwrapped(node);
  if (ts.isCallExpression(at)) return resolvesTo(at.arguments[0], scan, CHILD_PROCESS);
  return (ts.isPropertyAccessExpression(at) || ts.isElementAccessExpression(at)) && memberName(at) === "default" && loadsChildProcess(at.expression, scan);
}
/** A property name's text: an identifier, a string or numeric literal, or a computed literal key. */
function propertyText(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isPrivateIdentifier(name)) return name.text;
  return ts.isComputedPropertyName(name) ? literalText(unwrapped(name.expression)) : undefined;
}
/** The property assignment an object literal makes to a name, as its initializer. */
function propertyOf(object: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  const match = object.properties.find((member) => ts.isPropertyAssignment(member) && propertyText(member.name) === name);
  return match !== undefined && ts.isPropertyAssignment(match) ? match.initializer : undefined;
}
function memberName(node: ts.Expression): string | undefined {
  const at = unwrapped(node);
  if (ts.isIdentifier(at)) return at.text;
  if (ts.isPropertyAccessExpression(at)) return at.name.text;
  if (ts.isElementAccessExpression(at)) return literalText(at.argumentExpression);
  return undefined;
}
function scanOf(file: SourceText): Scan {
  const source = parsed(file);
  const consts = new Map<string, ts.Expression[]>();
  const aliases = new Map<string, string>();
  const modules = new Set<string>();
  visit(source, (node) => {
    if (ts.isVariableDeclarationList(node) && (node.flags & ts.NodeFlags.Const) !== 0)
      for (const declaration of node.declarations)
        if (ts.isIdentifier(declaration.name) && declaration.initializer !== undefined)
          consts.set(declaration.name.text, [...(consts.get(declaration.name.text) ?? []), declaration.initializer]);
  });
  const scan: Scan = { file, source, consts, aliases, modules };
  visit(source, (node) => {
    if ((ts.isImportSpecifier(node) || ts.isBindingElement(node)) && ts.isIdentifier(node.name)) {
      const imported = node.propertyName ?? node.name;
      if ((ts.isIdentifier(imported) || ts.isStringLiteral(imported)) && LAUNCHERS.has(imported.text)) aliases.set(node.name.text, imported.text);
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) {
      const bound = memberName(node.initializer);
      if (bound !== undefined && LAUNCHERS.has(bound) && bound !== node.name.text) aliases.set(node.name.text, bound);
      if (loadsChildProcess(node.initializer, scan)) modules.add(node.name.text);
    }
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name) && node.initializer !== undefined && loadsChildProcess(node.initializer, scan))
      for (const element of node.name.elements) {
        const key = element.propertyName ?? element.name;
        if (ts.isIdentifier(element.name) && (ts.isIdentifier(key) || ts.isStringLiteral(key)) && key.text === "default") modules.add(element.name.text);
      }
    if (ts.isImportDeclaration(node) && CHILD_PROCESS.has(literalText(node.moduleSpecifier) ?? "")) {
      const clause = node.importClause;
      if (clause?.name !== undefined) modules.add(clause.name.text);
      const named = clause?.namedBindings;
      if (named !== undefined && ts.isNamespaceImport(named)) modules.add(named.name.text);
      if (named !== undefined && ts.isNamedImports(named))
        for (const element of named.elements) if ((element.propertyName ?? element.name).text === "default") modules.add(element.name.text);
    }
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && CHILD_PROCESS.has(literalText(node.moduleReference.expression) ?? ""))
      modules.add(node.name.text);
  });
  return scan;
}
/** A command line's words: split on whitespace, quotes and shell operators, each path reduced to its base name (.exe/.cmd dropped). */
function commandWords(command: string | undefined): string[] {
  return (command ?? "")
    .split(/[\s"'`;&|()<>]+/)
    .filter(Boolean)
    .map((word) => (word.split(/[\\/]/).pop() ?? word).replace(/\.(?:exe|cmd)$/i, ""));
}
/** The literal text an expression spells: a string, a template's literal parts, a same-file const, either side of ?? / || / ?: or a + join. */
function commandText(node: ts.Expression | undefined, scan: Scan, depth = 0): string | undefined {
  if (node === undefined || depth > 8) return undefined;
  const at = unwrapped(node);
  const literal = literalText(at);
  if (literal !== undefined) return literal;
  if (ts.isTemplateExpression(at)) return [at.head.text, ...at.templateSpans.map((span) => `${commandText(span.expression, scan, depth + 1) ?? " "}${span.literal.text}`)].join("");
  if (ts.isIdentifier(at)) {
    const texts = (scan.consts.get(at.text) ?? []).map((initializer) => commandText(initializer, scan, depth + 1));
    return texts.every((text) => text === undefined) ? undefined : texts.map((text) => text ?? " ").join(" ");
  }
  const joined = (parts: readonly (string | undefined)[], separator: string): string | undefined =>
    parts.every((part) => part === undefined) ? undefined : parts.map((part) => part ?? " ").join(separator);
  if (ts.isConditionalExpression(at)) return joined([commandText(at.whenTrue, scan, depth + 1), commandText(at.whenFalse, scan, depth + 1)], " ");
  if (ts.isBinaryExpression(at)) {
    const operator = at.operatorToken.kind;
    if (operator === ts.SyntaxKind.QuestionQuestionToken || operator === ts.SyntaxKind.BarBarToken)
      return joined([commandText(at.left, scan, depth + 1), commandText(at.right, scan, depth + 1)], " ");
    if (operator === ts.SyntaxKind.PlusToken) return joined([commandText(at.left, scan, depth + 1), commandText(at.right, scan, depth + 1)], "");
  }
  return undefined;
}
/** The declaration a node sits in: the nearest function or method declaration, else the module-level binding of a function. */
function declarationOf(node: ts.Node): { readonly name: string; readonly body: ts.Node; readonly nameNode: ts.Node | undefined } {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if ((ts.isFunctionDeclaration(at) || ts.isMethodDeclaration(at)) && at.name !== undefined && ts.isIdentifier(at.name))
      return { name: at.name.text, body: at, nameNode: at.name };
    if (
      (ts.isArrowFunction(at) || ts.isFunctionExpression(at)) &&
      ts.isVariableDeclaration(at.parent) &&
      ts.isIdentifier(at.parent.name) &&
      ts.isVariableStatement(at.parent.parent.parent) &&
      ts.isSourceFile(at.parent.parent.parent.parent)
    )
      return { name: at.parent.name.text, body: at, nameNode: at.parent.name };
  }
  return { name: "<module>", body: node.getSourceFile(), nameNode: undefined };
}
interface Launch {
  readonly scan: Scan;
  readonly call: ts.CallExpression;
  readonly launcher: string;
  /** How the launcher was reached: by name or alias, through a child_process binding, process.execve, or a member of another receiver. */
  readonly route: "name" | "module" | "process" | "member";
  readonly declaration: string;
  readonly words: readonly string[];
  readonly site: string;
}
function launchesIn(scan: Scan): Launch[] {
  const launches: Launch[] = [];
  visit(scan.source, (node) => {
    if (!ts.isCallExpression(node)) return;
    const callee = unwrapped(node.expression);
    let launcher: string | undefined;
    let route: Launch["route"] = "member";
    if (ts.isIdentifier(callee)) {
      launcher = scan.aliases.get(callee.text) ?? callee.text;
      route = "name";
    } else if (ts.isPropertyAccessExpression(callee) || ts.isElementAccessExpression(callee)) {
      launcher = memberName(callee);
      const receiver = unwrapped(callee.expression);
      if (launcher === "execve" && ts.isIdentifier(receiver) && receiver.text === "process") route = "process";
      else if ((ts.isIdentifier(receiver) && scan.modules.has(receiver.text)) || loadsChildProcess(receiver, scan)) route = "module";
    }
    if (launcher === undefined || !(LAUNCHERS.has(launcher) || route === "process")) return;
    const argv = node.arguments[1] === undefined ? undefined : unwrapped(node.arguments[1]);
    const elements = argv !== undefined && ts.isArrayLiteralExpression(argv) ? argv.elements.map((element) => (ts.isSpreadElement(element) ? undefined : commandText(element, scan))) : [];
    const words = [commandText(node.arguments[0], scan), ...elements].flatMap(commandWords);
    const declaration = declarationOf(node).name;
    launches.push({ scan, call: node, launcher, route, declaration, words, site: `${scan.file.path}:${declaration}:${launcher}` });
  });
  return launches;
}
function rfLaunchesIn(files: readonly SourceText[]): Launch[] {
  return files.flatMap((file) => launchesIn(scanOf(file)).filter((launch) => launch.words.includes("rf")));
}
/** C1 (a): every rf launch, as `path:declaration:launcher`, one entry per launch. */
function launchSites(files: readonly SourceText[]): string[] {
  return rfLaunchesIn(files).map((launch) => launch.site);
}
/** C1 (b): every launch reached by name, alias, a child_process binding or process.execve, as `launcher:program`, sorted. */
function launchInventory(files: readonly SourceText[]): string[] {
  return files
    .flatMap((file) => launchesIn(scanOf(file)))
    .filter((launch) => launch.route !== "member")
    .map((launch) => {
      const program = commandWords(commandText(launch.call.arguments[0], launch.scan))[0];
      return `${launch.launcher}:${program ?? `<opaque ${launch.call.arguments[0]?.getText(launch.scan.source) ?? "no argument"}>`}`;
    })
    .sort();
}
/** A load call's loader: import(), require or getBuiltinModule (by name or as a member), createRequire(...)(...), or a call through a same-file const bound to createRequire(...). */
function loaderOf(call: ts.CallExpression, scan: Scan): string | undefined {
  if (call.expression.kind === ts.SyntaxKind.ImportKeyword) return "import()";
  const callee = unwrapped(call.expression);
  const name = memberName(callee);
  if (name === "require" || name === "getBuiltinModule") return name;
  const requires = (node: ts.Expression): boolean => {
    const at = unwrapped(node);
    return ts.isCallExpression(at) && memberName(at.expression) === "createRequire";
  };
  if (requires(callee) || (ts.isIdentifier(callee) && (scan.consts.get(callee.text) ?? []).some(requires))) return "createRequire()";
  return undefined;
}
/**
 * Every place a file spells or resolves one of the specifiers: an import, export-from or import-equals declaration, any call whose
 * first argument resolves to one (textsOf), any other string or no-substitution template literal whose text is one, and any other
 * template or + join, at its outermost, whose texts resolve to one; as `path:declaration:role:specifier`, sorted.
 */
function moduleSites(files: readonly SourceText[], specifiers: ReadonlySet<string>): string[] {
  const sites: string[] = [];
  for (const file of files) {
    const scan = scanOf(file);
    const counted = new Set<ts.Node>();
    visit(scan.source, (node) => {
      const declared =
        ts.isImportDeclaration(node) || ts.isExportDeclaration(node)
          ? node.moduleSpecifier
          : ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)
            ? node.moduleReference.expression
            : undefined;
      if (declared !== undefined) {
        counted.add(declared);
        const text = literalText(declared);
        const role = ts.isImportDeclaration(node) ? "import" : ts.isExportDeclaration(node) ? "export" : "import=";
        if (text !== undefined && specifiers.has(text)) sites.push(`${file.path}:<module>:${role}:${text}`);
        return;
      }
      if (ts.isCallExpression(node) && node.arguments[0] !== undefined) {
        const first = node.arguments[0];
        const texts = (textsOf(first, scan) ?? []).filter((text) => specifiers.has(text));
        if (texts.length > 0) {
          counted.add(first);
          const callee = loaderOf(node, scan) ?? node.expression.getText(scan.source);
          for (const text of texts) sites.push(`${file.path}:${declarationOf(node).name}:call ${callee}:${text}`);
        }
      }
      if (ts.isStringLiteralLike(node) && specifiers.has(node.text) && !counted.has(node)) sites.push(`${file.path}:${declarationOf(node).name}:literal:${node.text}`);
      if (ts.isTemplateExpression(node) || (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken)) {
        let outer: ts.Node = node;
        while (ts.isParenthesizedExpression(outer.parent)) outer = outer.parent;
        const parent = outer.parent;
        const nested = ts.isTemplateSpan(parent) || (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.PlusToken);
        if (!nested && !counted.has(outer))
          for (const text of (textsOf(node, scan) ?? []).filter((resolved) => specifiers.has(resolved))) sites.push(`${file.path}:${declarationOf(node).name}:text:${text}`);
      }
    });
  }
  return sites.sort();
}
/** Every load call (loaderOf) whose specifier does not resolve (textsOf), whatever it loads, as `path:declaration:loader:<opaque text>`, sorted. */
function opaqueLoads(files: readonly SourceText[]): string[] {
  const loads: string[] = [];
  for (const file of files) {
    const scan = scanOf(file);
    visit(scan.source, (node) => {
      if (!ts.isCallExpression(node)) return;
      const loader = loaderOf(node, scan);
      if (loader !== undefined && textsOf(node.arguments[0], scan) === undefined)
        loads.push(`${file.path}:${declarationOf(node).name}:${loader}:<opaque ${node.arguments[0]?.getText(scan.source) ?? "no argument"}>`);
    });
  }
  return loads.sort();
}
/** A launching file bound by TypeScript's checker (a no-lib program over that file alone), so its identifiers resolve by scope. */
interface Bound {
  readonly checker: ts.TypeChecker;
  readonly source: ts.SourceFile;
}
const boundFiles = new Map<string, Bound>();
function boundOf(scan: Scan): Bound {
  const key = `${scan.file.path}\n${scan.file.text}`;
  const known = boundFiles.get(key);
  if (known !== undefined) return known;
  const name = "launching-file.ts";
  const source = ts.createSourceFile(name, scan.file.text, ts.ScriptTarget.Latest, true);
  const options: ts.CompilerOptions = { noLib: true, noResolve: true, allowJs: true, types: [], target: ts.ScriptTarget.Latest };
  const host = ts.createCompilerHost(options);
  host.getSourceFile = (file) => (file === name ? source : undefined);
  host.fileExists = (file) => file === name;
  host.readFile = (file) => (file === name ? scan.file.text : undefined);
  const bound: Bound = { checker: ts.createProgram({ rootNames: [name], options, host }).getTypeChecker(), source };
  boundFiles.set(key, bound);
  return bound;
}
/** The bound source's identifier at a position. */
function identifierAt(source: ts.SourceFile, start: number): ts.Identifier | undefined {
  let found: ts.Identifier | undefined;
  visit(source, (node) => {
    if (found === undefined && ts.isIdentifier(node) && node.getStart(source) === start) found = node;
  });
  return found;
}
/** What a bound identifier resolves to by scope: its symbol and declarations; undefined for an import (an alias) or an unbound name. */
function bindingIn(identifier: ts.Identifier, bound: Bound): { readonly symbol: ts.Symbol; readonly declarations: readonly ts.Declaration[] } | undefined {
  const symbol = bound.checker.getSymbolAtLocation(identifier);
  if (symbol === undefined || (symbol.flags & ts.SymbolFlags.Alias) !== 0) return undefined;
  const declarations = symbol.declarations ?? [];
  return declarations.length === 0 ? undefined : { symbol, declarations };
}
/** A launch's argv identifier bound by scope to one const declaration: its initializer and its use count (every identifier resolving to it). */
function argvBindingOf(launch: Launch, argv: ts.Identifier): { readonly initializer: ts.Expression | undefined; readonly uses: number; readonly bound: Bound } | undefined {
  const bound = boundOf(launch.scan);
  const at = identifierAt(bound.source, argv.getStart(launch.scan.source));
  const binding = at === undefined ? undefined : bindingIn(at, bound);
  const declaration = binding?.declarations.length === 1 ? binding.declarations[0] : undefined;
  if (binding === undefined || declaration === undefined || !ts.isVariableDeclaration(declaration) || (declaration.parent.flags & ts.NodeFlags.Const) === 0) return undefined;
  let uses = 0;
  visit(bound.source, (node) => {
    if (ts.isIdentifier(node) && node !== declaration.name && bound.checker.getSymbolAtLocation(node) === binding.symbol) uses += 1;
  });
  return { initializer: declaration.initializer, uses, bound };
}
interface Builder {
  /** The callee's name, when the argv const's initializer calls an identifier. */
  readonly name: string | undefined;
  /** The declaration that callee binds to by scope: a function declaration, or the statement of a const bound to an arrow or function expression. */
  readonly node: ts.Node | undefined;
  /** Its returns (an arrow's expression body included; nested functions excluded). */
  readonly returns: readonly ts.Expression[];
  /** `name@declaration`, `name@unresolved`, or `none` when the initializer calls no identifier. */
  readonly label: string;
}
/** The argv builder an initializer calls, resolved by scope (a same-named nested declaration included); an imported or ambiguous callee is unresolved. */
function builderOf(initializer: ts.Expression | undefined, bound: Bound): Builder {
  const at = initializer === undefined ? undefined : unwrapped(initializer);
  if (at === undefined || !ts.isCallExpression(at) || !ts.isIdentifier(at.expression)) return { name: undefined, node: undefined, returns: [], label: "none" };
  const name = at.expression.text;
  const implementations = (bindingIn(at.expression, bound)?.declarations ?? []).filter((declaration) => !(ts.isFunctionDeclaration(declaration) && declaration.body === undefined));
  const declaration = implementations.length === 1 ? implementations[0] : undefined;
  let body: ts.ConciseBody | undefined;
  let node: ts.Node | undefined;
  if (declaration !== undefined && ts.isFunctionDeclaration(declaration)) {
    body = declaration.body;
    node = declaration;
  } else if (declaration !== undefined && ts.isVariableDeclaration(declaration) && (declaration.parent.flags & ts.NodeFlags.Const) !== 0 && declaration.initializer !== undefined) {
    const value = unwrapped(declaration.initializer);
    if (ts.isArrowFunction(value) || ts.isFunctionExpression(value)) {
      body = value.body;
      node = declaration.parent.parent;
    }
  }
  if (body === undefined || node === undefined) return { name, node: undefined, returns: [], label: `${name}@unresolved` };
  const returns: ts.Expression[] = [];
  if (!ts.isBlock(body)) returns.push(body);
  else {
    const walk = (inner: ts.Node): void => {
      if (ts.isReturnStatement(inner) && inner.expression !== undefined) returns.push(inner.expression);
      if (!ts.isFunctionLike(inner)) ts.forEachChild(inner, walk);
    };
    ts.forEachChild(body, walk);
  }
  return { name, node, returns, label: `${name}@${declarationOf(node).name}` };
}
/** Whether --no-commit is a literal element of every array: unconditional, conditional (spread or nested), absent, or unresolved. */
function noCommitOf(arrays: readonly ts.Expression[] | undefined): string {
  if (arrays === undefined || arrays.length === 0 || arrays.some((array) => !ts.isArrayLiteralExpression(unwrapped(array)))) return "unresolved";
  const direct = (array: ts.Expression): boolean => {
    const at = unwrapped(array);
    return ts.isArrayLiteralExpression(at) && at.elements.some((element) => literalText(element) === "--no-commit");
  };
  if (arrays.every(direct)) return "unconditional";
  return arrays.some((array) => array.getText().includes('"--no-commit"')) ? "conditional" : "absent";
}
/** C1 (c): per rf launch, how its argv is built (bound by scope) and whether it lists --no-commit, plus its options text. */
function argvReadings(files: readonly SourceText[]): string[] {
  return rfLaunchesIn(files).map((launch) => {
    const options = `options=${launch.call.arguments[2]?.getText(launch.scan.source) ?? "none"}`;
    if (SHELL_LAUNCHERS.has(launch.launcher))
      return `${launch.site} command --no-commit=${commandWords(commandText(launch.call.arguments[0], launch.scan)).includes("--no-commit") ? "unconditional" : "absent"} ${options}`;
    const argv = launch.call.arguments[1] === undefined ? undefined : unwrapped(launch.call.arguments[1]);
    if (argv === undefined) return `${launch.site} argv=none ${options}`;
    if (ts.isArrayLiteralExpression(argv)) return `${launch.site} argv=<inline> --no-commit=${noCommitOf([argv])} ${options}`;
    if (!ts.isIdentifier(argv)) return `${launch.site} argv=<${argv.getText(launch.scan.source)}> --no-commit=unresolved ${options}`;
    const binding = argvBindingOf(launch, argv);
    if (binding === undefined) return `${launch.site} argv=<unbound ${argv.text}> --no-commit=unresolved ${options}`;
    const initializer = binding.initializer === undefined ? undefined : unwrapped(binding.initializer);
    const builder = builderOf(initializer, binding.bound);
    const arrays = initializer !== undefined && ts.isArrayLiteralExpression(initializer) ? [initializer] : builder.node !== undefined ? builder.returns : undefined;
    return `${launch.site} argv=${initializer?.getText(binding.bound.source) ?? "<no initializer>"} uses=${binding.uses} builder=${builder.label} returns=${arrays?.length ?? 0} --no-commit=${noCommitOf(arrays)} ${options}`;
  });
}
/** C1 (c): per rf launch, the source lines of its argv builder (the declaration its argv const's call binds to by scope). */
function argvBuilders(files: readonly SourceText[]): string[][] {
  return rfLaunchesIn(files).map((launch) => {
    const argv = launch.call.arguments[1] === undefined ? undefined : unwrapped(launch.call.arguments[1]);
    const binding = argv !== undefined && ts.isIdentifier(argv) ? argvBindingOf(launch, argv) : undefined;
    const builder = binding === undefined ? undefined : builderOf(binding.initializer, binding.bound);
    if (binding === undefined || builder?.node === undefined) return [];
    return linesOf(launch.scan.file, binding.bound.source, builder.node, builder.node);
  });
}
/** The kind of declaration a node is when it binds the name (function, class, const, let, var, binding, parameter, import, expression, namespace). */
function declaredKind(node: ts.Node, name: string): string | undefined {
  const named = (target: ts.Node | undefined): boolean => target !== undefined && ts.isIdentifier(target) && target.text === name;
  if (ts.isFunctionDeclaration(node) && named(node.name)) return "function";
  if (ts.isClassDeclaration(node) && named(node.name)) return "class";
  if (ts.isVariableDeclaration(node) && named(node.name))
    return (node.parent.flags & ts.NodeFlags.Const) !== 0 ? "const" : (node.parent.flags & ts.NodeFlags.Let) !== 0 ? "let" : "var";
  if (ts.isBindingElement(node) && named(node.name)) return "binding";
  if (ts.isParameter(node) && named(node.name)) return "parameter";
  if ((ts.isImportSpecifier(node) || ts.isImportClause(node) || ts.isNamespaceImport(node) || ts.isImportEqualsDeclaration(node)) && named(node.name)) return "import";
  if ((ts.isFunctionExpression(node) || ts.isClassExpression(node)) && named(node.name)) return "expression";
  if ((ts.isEnumDeclaration(node) || ts.isModuleDeclaration(node)) && named(node.name)) return "namespace";
  return undefined;
}
/** C1 (c): per rf launch whose argv const calls an identifier, every declaration in the launching file binding that name, as `path:name:kind@declaration`. */
function builderDeclarations(files: readonly SourceText[]): string[] {
  return rfLaunchesIn(files)
    .flatMap((launch) => {
      const argv = launch.call.arguments[1] === undefined ? undefined : unwrapped(launch.call.arguments[1]);
      const binding = argv !== undefined && ts.isIdentifier(argv) ? argvBindingOf(launch, argv) : undefined;
      const name = binding === undefined ? undefined : builderOf(binding.initializer, binding.bound).name;
      if (name === undefined) return [];
      const found: string[] = [];
      visit(launch.scan.source, (node) => {
        const kind = declaredKind(node, name);
        if (kind !== undefined) found.push(`${launch.scan.file.path}:${name}:${kind}@${declarationOf(node).name}`);
      });
      return found;
    })
    .sort();
}
/** C1 (g): per rf launch, its declaration's line count and sha256/16 over those lines' text (a module-level launch: the whole file). */
function declarationTexts(files: readonly SourceText[]): string[] {
  return rfLaunchesIn(files).map((launch) => {
    const owner = declarationOf(launch.call);
    const node = ts.isArrowFunction(owner.body) || ts.isFunctionExpression(owner.body) ? owner.body.parent.parent.parent : owner.body;
    const lines = linesOf(launch.scan.file, launch.scan.source, node, node);
    return `${launch.scan.file.path}:${owner.name} lines=${lines.length} sha256=${createHash("sha256").update(lines.join("\n")).digest("hex").slice(0, 16)}`;
  });
}
/** C1 (d): per rf launch, its declaration with its parameters, and every src reference to it by name (an identifier or a literal key). */
function launchingDeclarations(files: readonly SourceText[]): Array<{ readonly declaration: string; readonly references: readonly string[] }> {
  return rfLaunchesIn(files).map((launch) => {
    const owner = declarationOf(launch.call);
    const parameters =
      ts.isFunctionDeclaration(owner.body) || ts.isMethodDeclaration(owner.body) || ts.isArrowFunction(owner.body) || ts.isFunctionExpression(owner.body)
        ? owner.body.parameters.map((parameter) => parameter.name.getText(launch.scan.source))
        : [];
    const references: string[] = [];
    for (const file of files) {
      const source = file.path === launch.scan.file.path ? launch.scan.source : parsed(file);
      visit(source, (node) => {
        const keyed = ts.isStringLiteralLike(node) && node.text === owner.name && ts.isElementAccessExpression(node.parent) && node.parent.argumentExpression === node;
        if (!keyed && (!ts.isIdentifier(node) || node.text !== owner.name || node === owner.nameNode)) return;
        const parent = node.parent;
        if (ts.isImportSpecifier(parent) || ts.isImportClause(parent)) references.push(`${file.path}:import`);
        else if (ts.isExportSpecifier(parent)) references.push(`${file.path}:export`);
        else {
          const callee = keyed || (ts.isPropertyAccessExpression(parent) && parent.name === node) ? parent : node;
          const call = callee.parent;
          references.push(
            ts.isCallExpression(call) && call.expression === callee ? `${file.path}:${declarationOf(node).name}:call(${call.arguments.length})` : `${file.path}:${declarationOf(node).name}:value`,
          );
        }
      });
    }
    return { declaration: `${launch.scan.file.path}:${owner.name}(${parameters.join(",")})`, references: references.sort() };
  });
}
/** An object literal's properties as the readers resolve them: assignments, shorthands (the name itself), and each spread same-file
 * const object literal's properties, in source order, a later one overriding; a spread of anything else contributes nothing. */
function resolvedProperties(object: ts.ObjectLiteralExpression, scan: Scan, depth = 0): Map<string, ts.Expression> {
  const properties = new Map<string, ts.Expression>();
  for (const member of object.properties) {
    if (ts.isPropertyAssignment(member)) {
      const name = propertyText(member.name);
      if (name !== undefined) properties.set(name, member.initializer);
    } else if (ts.isShorthandPropertyAssignment(member)) properties.set(member.name.text, member.name);
    else if (ts.isSpreadAssignment(member) && depth < 8) {
      const spread = unwrapped(member.expression);
      const sources = ts.isIdentifier(spread) ? (scan.consts.get(spread.text) ?? []).map(unwrapped).filter(ts.isObjectLiteralExpression) : [];
      for (const source of sources) for (const [name, value] of resolvedProperties(source, scan, depth + 1)) properties.set(name, value);
    }
  }
  return properties;
}
/** C1 (e): every object literal src writes whose resolved id (as commandText reads text) is a reactivefiber.* name, as `path:id:effectClass`. */
function rfRegistrations(files: readonly SourceText[]): string[] {
  const found: string[] = [];
  for (const file of files) {
    const scan = scanOf(file);
    visit(scan.source, (node) => {
      if (!ts.isObjectLiteralExpression(node)) return;
      const properties = resolvedProperties(node, scan);
      const id = commandText(properties.get("id"), scan);
      if (id === undefined || !id.startsWith("reactivefiber.")) return;
      const effect = properties.get("effectClass");
      found.push(`${file.path}:${id}:${commandText(effect, scan) ?? `<${effect?.getText(scan.source) ?? "none"}>`}`);
    });
  }
  return found.sort();
}
/** A listener's chunk parameter uses (`chunk => chunk.length`), plus `this` / `arguments` in a non-arrow listener. */
function chunkUsesOf(listener: ts.ArrowFunction | ts.FunctionExpression): string {
  const chunk = listener.parameters[0]?.name;
  if (chunk === undefined || !ts.isIdentifier(chunk)) return "<no named chunk>";
  const uses = new Set<string>();
  if (listener.parameters.length > 1) uses.add(`+${listener.parameters.length - 1} parameters`);
  visit(listener.body, (inner) => {
    if (!ts.isArrowFunction(listener) && (inner.kind === ts.SyntaxKind.ThisKeyword || (ts.isIdentifier(inner) && inner.text === "arguments"))) uses.add(inner.getText());
    if (!ts.isIdentifier(inner) || inner.text !== chunk.text) return;
    const parent = inner.parent;
    if (ts.isPropertyAccessExpression(parent) && parent.name === inner) return;
    uses.add(ts.isPropertyAccessExpression(parent) && parent.expression === inner ? `${chunk.text}.${parent.name.text}` : chunk.text);
  });
  return `${chunk.text} => ${[...uses].sort().join(", ")}`;
}
function listenerUses(listener: ts.Expression | undefined, source: ts.SourceFile): string {
  if (listener === undefined) return "<no listener>";
  const at = unwrapped(listener);
  return ts.isArrowFunction(at) || ts.isFunctionExpression(at) ? chunkUsesOf(at) : `<not inline: ${at.getText(source)}>`;
}
/** One reference to the launch's binding, classified: a member read or call, a stream listener, or a bare use (`child (Kind)`). */
function childUse(reference: ts.Identifier, source: ts.SourceFile): string {
  const name = reference.text;
  const parent = reference.parent;
  if (ts.isElementAccessExpression(parent) && parent.expression === reference) return `${name}[${parent.argumentExpression.getText(source)}]`;
  if (!ts.isPropertyAccessExpression(parent) || parent.expression !== reference) return `${name} (${ts.SyntaxKind[parent.kind]})`;
  const member = parent.name.text;
  const label = `${name}.${member}`;
  const next = parent.parent;
  const callArg = (call: ts.CallExpression): string => {
    const first = call.arguments[0];
    return first === undefined ? "" : (literalText(first) !== undefined ? JSON.stringify(literalText(first)) : "<expr>");
  };
  if (member !== "stdout" && member !== "stderr") return ts.isCallExpression(next) && next.expression === parent ? `${label}(${callArg(next)})` : label;
  if (!ts.isPropertyAccessExpression(next) || next.expression !== parent) return `${label} (${ts.SyntaxKind[next.kind]})`;
  const method = next.name.text;
  const call = next.parent;
  if (!ts.isCallExpression(call) || call.expression !== next || !LISTENS.has(method)) return `${label}.${method}`;
  const event = callArg(call);
  return member === "stderr" && event === '"data"' ? `${label}.${method}("data", ${listenerUses(call.arguments[1], source)})` : `${label}.${method}(${event})`;
}
/** G2 static: per rf launch, its binding, its stdio option and every reference to the binding inside its declaration. Sorted, unique. */
function childUses(files: readonly SourceText[]): string[] {
  const uses = new Set<string>();
  for (const launch of rfLaunchesIn(files)) {
    let holder: ts.Node = launch.call.parent;
    while (ts.isParenthesizedExpression(holder) || ts.isAsExpression(holder) || ts.isNonNullExpression(holder) || ts.isSatisfiesExpression(holder)) holder = holder.parent;
    const options = launch.call.arguments[2] === undefined ? undefined : unwrapped(launch.call.arguments[2]);
    const stdio = options !== undefined && ts.isObjectLiteralExpression(options) ? propertyOf(options, "stdio") : undefined;
    uses.add(`stdio ${stdio?.getText(launch.scan.source) ?? "<unread>"}`);
    if (!ts.isVariableDeclaration(holder) || !ts.isIdentifier(holder.name)) {
      uses.add(`unbound ${launch.launcher}(...) (${ts.SyntaxKind[holder.kind]})`);
      continue;
    }
    const binding = holder.name;
    const kind = (holder.parent.flags & ts.NodeFlags.Const) !== 0 ? "const" : "let";
    uses.add(`${kind} ${binding.text} = ${launch.launcher}(...)`);
    visit(declarationOf(launch.call).body, (node) => {
      if (ts.isIdentifier(node) && node.text === binding.text && node !== binding) uses.add(childUse(node, launch.scan.source));
    });
  }
  return [...uses].sort();
}
/** The declaration holding the custody's SIGKILL escalation (a `const stop` arrow calling kill("SIGKILL")), per provider file. */
function custodyHolders(file: SourceText): string[] {
  const holders: string[] = [];
  visit(parsed(file), (node) => {
    if (!ts.isVariableDeclaration(node) || !ts.isIdentifier(node.name) || node.name.text !== "stop" || node.initializer === undefined) return;
    let escalates = false;
    visit(node.initializer, (inner) => {
      if (ts.isCallExpression(inner) && memberName(inner.expression) === "kill" && literalText(inner.arguments[0]) === "SIGKILL") escalates = true;
    });
    if (escalates) holders.push(declarationOf(node).name);
  });
  return holders;
}
/** The functions a declaration of the file calls, by name. */
function callsOf(file: SourceText, declaration: string): string[] {
  const calls: string[] = [];
  visit(parsed(file), (node) => {
    if (!ts.isFunctionDeclaration(node) || node.name?.text !== declaration || node.body === undefined) return;
    visit(node.body, (inner) => {
      if (ts.isCallExpression(inner)) {
        const name = memberName(inner.expression);
        if (name !== undefined) calls.push(name);
      }
    });
  });
  return calls;
}
/** The full source lines a node spans. */
function linesOf(file: SourceText, source: ts.SourceFile, first: ts.Node, last: ts.Node): string[] {
  const start = source.getLineAndCharacterOfPosition(first.getStart(source)).line;
  const end = source.getLineAndCharacterOfPosition(last.getEnd()).line;
  return file.text.split("\n").slice(start, end + 1);
}
function functionNamed(source: ts.SourceFile, name: string): ts.FunctionDeclaration | undefined {
  let found: ts.FunctionDeclaration | undefined;
  visit(source, (node) => {
    if (found === undefined && ts.isFunctionDeclaration(node) && node.name?.text === name) found = node;
  });
  return found;
}
/** G1: the custody block located by AST in nativeReactiveFiberRender: the statements from `const stop` through `const timer`. */
function custodyBlock(file: SourceText): string[] {
  const source = parsed(file);
  const statements = functionNamed(source, "nativeReactiveFiberRender")?.body?.statements ?? [];
  const declares = (statement: ts.Statement, name: string): boolean =>
    ts.isVariableStatement(statement) && statement.declarationList.declarations.some((declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === name);
  const start = statements.findIndex((statement) => declares(statement, "stop"));
  const end = statements.findIndex((statement) => declares(statement, "timer"));
  const first = statements[start];
  const last = statements[end];
  return first === undefined || last === undefined || end < start ? [] : linesOf(file, source, first, last);
}
/** G1: every `<x>.stderr.<listen>("data", ...)` statement in nativeReactiveFiberRender, located by AST, as its lines. */
function stderrListenerBlocks(file: SourceText): string[][] {
  const source = parsed(file);
  const owner = functionNamed(source, "nativeReactiveFiberRender");
  const blocks: string[][] = [];
  if (owner?.body === undefined) return blocks;
  visit(owner.body, (node) => {
    if (!ts.isExpressionStatement(node) || !ts.isCallExpression(node.expression)) return;
    const callee = node.expression.expression;
    if (
      ts.isPropertyAccessExpression(callee) &&
      LISTENS.has(callee.name.text) &&
      ts.isPropertyAccessExpression(callee.expression) &&
      callee.expression.name.text === "stderr" &&
      literalText(node.expression.arguments[0]) === "data"
    )
      blocks.push(linesOf(file, source, node, node));
  });
  return blocks;
}

/* ------------------------------------------------------------------ *
 * The stand-in rf, the launched children and the scenarios they drive
 * ------------------------------------------------------------------ */

type Mode = "settle" | "hang" | "overflow";
/** A preview envelope the provider admits, for the given workspace root; its rf ids are STDOUT_OPERATION and WORKSPACE_ID. */
function envelopeFor(root: string): Record<string, JsonValue> {
  return {
    schema: "reactive-fiber.cli/v1",
    ok: true,
    command: "context.render",
    operation_id: STDOUT_OPERATION,
    workspace: { id: WORKSPACE_ID, root },
    transaction_id: null,
    result: {
      ephemeral: true,
      render_id: null,
      output: { text: "context" },
      provenance: { graph_revision_id: `sha256:${"a".repeat(64)}` },
      budget: { formula_terms: { context_window: 1000000, output_reserve: 8192, occupied_tokens: 0, overhead: 0, safety_margin: 2048, available_context_tokens: 989760 } },
      diagnostics_summary: { errors: 0, warnings: 0, has_errors: false, has_warnings: false },
      work: { source_capture_count: 0, fiber_signal_count: 0, component_render_count: 0, lens_resolution_count: 0, necessity_eval_count: 0, storage_write_count: 0 },
    },
    diagnostics: [],
  };
}
interface StandIn {
  /** The scratch directory: the only PATH entry, and the workspace root the scenarios pass. */
  readonly dir: string;
  /** Every recorded spawn's argv, in order. */
  spawns(): string[][];
  /** The pid of the latest spawn once it wrote its receipt lines (and, in overflow mode, its overflow). */
  pid(): number | undefined;
  /** Whether the stand-in has received SIGTERM (it ignores it). */
  termed(): boolean;
}
/**
 * A stand-in rf, run by this process's node: it records its argv, ignores SIGTERM (marking it), writes RECEIPT_TEXT on stderr
 * before any stdout byte, then settles with the envelope, hangs, or overflows stderr and hangs.
 */
function standIn(mode: Mode): StandIn {
  const dir = makeScratch("rf-receipt-capture-");
  const log = join(dir, "spawns.jsonl");
  const ready = join(dir, "ready");
  const term = join(dir, "term");
  const body = [
    'const fs = require("node:fs");',
    `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
    `process.on("SIGTERM", () => fs.writeFileSync(${JSON.stringify(term)}, "term"));`,
    `process.stderr.write(${JSON.stringify(RECEIPT_TEXT)});`,
    mode === "overflow" ? `process.stderr.write("x".repeat(${OVERFLOW_BYTES}));` : "",
    `fs.writeFileSync(${JSON.stringify(ready)}, String(process.pid));`,
    mode === "settle" ? `process.stdout.write(${JSON.stringify(JSON.stringify(envelopeFor(dir)))});` : "setInterval(() => {}, 1000);",
  ].join("\n");
  writeFileSync(join(dir, "rf"), `#!${process.execPath}\n${body}\n`);
  chmodSync(join(dir, "rf"), 0o700);
  return {
    dir,
    spawns: () =>
      existsSync(log)
        ? readFileSync(log, "utf8")
            .split("\n")
            .filter((line) => line !== "")
            .map((line): string[] => {
              const argv: unknown = JSON.parse(line);
              return Array.isArray(argv) ? argv.map(String) : [];
            })
        : [],
    pid: () => (existsSync(ready) ? Number(readFileSync(ready, "utf8")) : undefined),
    termed: () => existsSync(term),
  };
}
/** The census's trap on one published ChildProcess: the stream Node assigns to its stderr, and every listener change after that. */
interface Trap {
  /** The ChildProcess already owned a stderr property when the channel published it, or the trap could not be defined. */
  preset: boolean;
  /** The stream Node assigned to child.stderr (undefined until it does, or when the trap was displaced). */
  stream: Readable | null | undefined;
  /** Every listener added to (`+event: uses`) or removed from (`-event: uses`) that stream after the assignment, in order. */
  readonly log: string[];
}
const traps = new WeakMap<ChildProcess, Trap>();
/** A listener as the function a once-wrapper wraps (Node exposes it as the wrapper's .listener; a removal from a multi-listener event
 * hands removeListener the wrapper itself), else the listener; its chunk uses from that function's running source. */
function listenerText(listener: unknown): string {
  const wrapped: unknown = typeof listener === "function" ? Reflect.get(listener, "listener") : undefined;
  const target = typeof wrapped === "function" ? wrapped : listener;
  return typeof target === "function" ? runtimeListenerUses(Function.prototype.toString.call(target)) : "<not a function>";
}
/** Define child.stderr as an accessor whose setter records the stream Node assigns, turns itself back into a plain data property, and
 * starts recording that stream's newListener and removeListener events (a once listener arrives as the function it wraps). */
function trapStderr(child: ChildProcess): void {
  const state: Trap = { preset: Object.getOwnPropertyDescriptor(child, "stderr") !== undefined, stream: undefined, log: [] };
  traps.set(child, state);
  if (state.preset) return;
  let assigned: Readable | null | undefined;
  try {
    Object.defineProperty(child, "stderr", {
      configurable: true,
      enumerable: true,
      get: () => assigned,
      set: (stream: Readable | null) => {
        assigned = stream;
        state.stream = stream;
        Object.defineProperty(child, "stderr", { value: stream, writable: true, enumerable: true, configurable: true });
        stream?.on("removeListener", (event: string | symbol, listener: unknown) => state.log.push(`-${String(event)}: ${listenerText(listener)}`));
        stream?.on("newListener", (event: string | symbol, listener: unknown) => state.log.push(`+${String(event)}: ${listenerText(listener)}`));
      },
    });
  } catch {
    state.preset = true;
  }
}
/** Run a scenario while the "child_process" diagnostics channel records (and traps the stderr of) every ChildProcess this process creates. */
async function withChildren<T>(scenario: (children: readonly ChildProcess[]) => Promise<T>): Promise<T> {
  const children: ChildProcess[] = [];
  const onChild = (message: unknown): void => {
    if (typeof message !== "object" || message === null || !("process" in message) || !(message.process instanceof ChildProcess)) return;
    children.push(message.process);
    trapStderr(message.process);
  };
  subscribe("child_process", onChild);
  try {
    return await scenario(children);
  } finally {
    unsubscribe("child_process", onChild);
  }
}
const oldPath = process.env.PATH;
/** Run a scenario with the stand-in as the only PATH entry; restore PATH and real timers, reap the stand-in, remove scratch. */
async function withStandIn<T>(mode: Mode, scenario: (rf: StandIn, children: readonly ChildProcess[]) => Promise<T>): Promise<T> {
  const rf = standIn(mode);
  process.env.PATH = rf.dir;
  try {
    return await withChildren((children) => scenario(rf, children));
  } finally {
    vi.useRealTimers();
    process.env.PATH = oldPath;
    const pid = rf.pid();
    if (pid !== undefined && alive(pid)) process.kill(pid, "SIGKILL");
    removeScratch(rf.dir);
  }
}
function alive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => realSetTimeout(resolve, ms));
}
/** Wait in real time until the check holds or WAIT_MS passes; whether it held. */
async function until(check: () => boolean): Promise<boolean> {
  const end = performance.now() + WAIT_MS;
  while (!check()) {
    if (performance.now() > end) return false;
    await sleep(10);
  }
  return true;
}
/** The bytes a launched child's stderr pipe has delivered to this process: the stream Node assigned when trapped, else child.stderr (-1 when not a pipe). */
function bytesReadOf(child: ChildProcess | undefined): number {
  const stream = (child === undefined ? undefined : traps.get(child)?.stream) ?? child?.stderr;
  return stream instanceof Socket ? stream.bytesRead : -1;
}
type Outcome<T> = { readonly state: "fulfilled"; readonly value: T } | { readonly state: "rejected"; readonly reason: unknown } | { readonly state: "open" };
/** How a promise settles within WAIT_MS of real time, or that it stayed open. */
async function settleOf<T>(promise: Promise<T>): Promise<Outcome<T>> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const open = new Promise<Outcome<T>>((resolve) => {
    timer = realSetTimeout(() => resolve({ state: "open" }), WAIT_MS);
  });
  try {
    return await Promise.race([
      promise.then(
        (value): Outcome<T> => ({ state: "fulfilled", value }),
        (reason: unknown): Outcome<T> => ({ state: "rejected", reason }),
      ),
      open,
    ]);
  } finally {
    if (timer !== undefined) realClearTimeout(timer);
  }
}
/** A settled provider call as `category: message`, or the state it ended in. */
function outcomeText(outcome: Outcome<unknown>): string {
  if (outcome.state !== "rejected") return outcome.state;
  const reason = outcome.reason;
  const category = typeof reason === "object" && reason !== null && "category" in reason ? String(reason.category) : "untyped";
  return `${category}: ${reason instanceof Error ? reason.message : String(reason)}`;
}
function fakeTimers(): void {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
}

/** A listener's chunk uses read from the listener's own source as it runs (parsed, so formatting and instrumentation do not matter). */
function runtimeListenerUses(text: string): string {
  const source = ts.createSourceFile("listener.ts", `(${text});`, ts.ScriptTarget.Latest, true);
  const statement = source.statements[0];
  const expression = statement !== undefined && ts.isExpressionStatement(statement) ? unwrapped(statement.expression) : undefined;
  return expression !== undefined && (ts.isArrowFunction(expression) || ts.isFunctionExpression(expression)) ? chunkUsesOf(expression) : "<unparsed listener>";
}
type PropertyKind = "accessor" | "function" | "value";
function kindOf(object: object, key: string | symbol): PropertyKind {
  const descriptor = Object.getOwnPropertyDescriptor(object, key);
  if (descriptor?.get !== undefined || descriptor?.set !== undefined) return "accessor";
  return typeof descriptor?.value === "function" ? "function" : "value";
}
/** Every own property of an object (string and symbol keys) as `prefix.key:kind`, sorted. */
function ownShape(prefix: string, object: object | null | undefined): string[] {
  return object === null || object === undefined ? [] : Reflect.ownKeys(object).map((key) => `${prefix}.${String(key)}:${kindOf(object, key)}`).sort();
}
/** A stream's libuv handle (its _handle), when it has one. */
function handleOf(stream: Readable | null | undefined): object | null {
  const handle: unknown = stream === null || stream === undefined ? null : Reflect.get(stream, "_handle");
  return typeof handle === "object" ? handle : null;
}
/** One launched child's stderr as G2's run-time leg reads it at an instant. */
interface Observation {
  readonly preset: boolean;
  readonly reassigned: boolean;
  readonly added: readonly string[];
  readonly bytesRead: number;
  readonly dataListeners: readonly string[];
  readonly encoding: string | null;
  readonly counts: readonly string[];
  readonly own: readonly string[];
  readonly prototypes: readonly unknown[];
  readonly onread: unknown;
}
function observe(child: ChildProcess | undefined): Observation {
  const state = child === undefined ? undefined : traps.get(child);
  const stream = state?.stream ?? child?.stderr ?? null;
  const handle = handleOf(stream);
  return {
    preset: state?.preset ?? true,
    reassigned: state === undefined || state.stream === undefined || child?.stderr !== state.stream,
    added: [...(state?.log ?? [])],
    bytesRead: bytesReadOf(child),
    dataListeners: stream === null ? [] : stream.listeners("data").map((listener) => listenerText(listener)),
    encoding: stream?.readableEncoding ?? null,
    counts: stream === null ? [] : stream.eventNames().map((event) => `${String(event)}:${stream.listenerCount(event)}`).sort(),
    own: [...ownShape("stream", stream), ...ownShape("handle", handle), ...ownShape("child", child)],
    prototypes: [stream === null ? null : Object.getPrototypeOf(stream), handle === null ? null : Object.getPrototypeOf(handle), child === undefined ? null : Object.getPrototypeOf(child)],
    onread: handle === null ? undefined : Reflect.get(handle, "onread"),
  };
}
/** The entries of one list missing from the other, as `+entry` (only in the first) and `-entry` (only in the second), sorted. */
function difference(left: readonly string[], right: readonly string[]): string[] {
  const rest = [...right];
  const extra: string[] = [];
  for (const entry of left) {
    const at = rest.indexOf(entry);
    if (at >= 0) rest.splice(at, 1);
    else extra.push(`+${entry}`);
  }
  return [...extra, ...rest.map((entry) => `-${entry}`)].sort();
}
interface StreamReading {
  /** How many ChildProcess objects the channel published before the reference child. */
  readonly launched: number;
  readonly stderrBytesRead: number;
  /** The ChildProcess owned a stderr when published (the trap could not be placed). */
  readonly preset: boolean;
  /** child.stderr is no longer the stream Node assigned (or the trap never saw one). */
  readonly reassigned: boolean;
  /** Every listener added to or removed from the assigned stream, as `+event: uses` / `-event: uses`, in order. */
  readonly added: readonly string[];
  /** Each data listener's chunk uses at the reading, from its running source. */
  readonly dataListeners: readonly string[];
  readonly encoding: string | null;
  /** Per event, `event:count`, as a difference from the reference child's. */
  readonly listenerCounts: readonly string[];
  /** Every own property of the stream, its handle and the ChildProcess as `object.key:kind`, as a difference from the reference child's. */
  readonly ownProperties: readonly string[];
  /** The objects (stream, handle, child) whose prototype is not the reference child's. */
  readonly prototypes: readonly string[];
  /** Whether the handle's onread (read through its prototype accessor) is the reference handle's. */
  readonly onreadShared: boolean;
}
/** G2 run time: a launched child's reading against a reference child read the same way. */
function compare(launched: number, subject: Observation, reference: Observation): StreamReading {
  return {
    launched,
    stderrBytesRead: subject.bytesRead,
    preset: subject.preset,
    reassigned: subject.reassigned,
    added: subject.added,
    dataListeners: subject.dataListeners,
    encoding: subject.encoding,
    listenerCounts: difference(subject.counts, reference.counts),
    ownProperties: difference(subject.own, reference.own),
    prototypes: ["stream", "handle", "child"].filter((_name, index) => subject.prototypes[index] !== reference.prototypes[index]),
    onreadShared: subject.onread !== undefined && subject.onread === reference.onread,
  };
}
/** The reference child: this process's node writing `text` on stderr and hanging, stdio ["ignore","pipe","pipe"], one listener counting
 * chunk.length, trapped by the channel like any launch and read once its bytes arrived and QUIET_MS passed. */
async function referenceObservation(text: string): Promise<Observation> {
  const child = spawn(process.execPath, ["-e", `process.stderr.write(${JSON.stringify(text)}); setInterval(() => {}, 1000);`], { stdio: ["ignore", "pipe", "pipe"] });
  const counted = { bytes: 0 };
  try {
    child.stderr.on("data", (chunk: Buffer) => {
      counted.bytes += chunk.length;
    });
    await until(() => bytesReadOf(child) >= Buffer.byteLength(text) && counted.bytes >= Buffer.byteLength(text));
    await sleep(QUIET_MS);
    return observe(child);
  } finally {
    child.kill("SIGKILL");
    await until(() => child.exitCode !== null || child.signalCode !== null);
  }
}
/** Run a scenario while every process warning is recorded (`name: message`); the rf ids those warnings name. */
async function warningIdsDuring<T>(scenario: () => Promise<T>): Promise<{ readonly value: T; readonly warningIds: readonly string[] }> {
  const warnings: string[] = [];
  const onWarning = (warning: Error): void => {
    warnings.push(`${warning.name}: ${warning.message}`);
  };
  process.on("warning", onWarning);
  try {
    const value = await scenario();
    await sleep(QUIET_MS);
    return { value, warningIds: rfIdsIn(warnings.join("\n")) };
  } finally {
    process.off("warning", onWarning);
  }
}
/** G2 run time: one arm's launch read while the stand-in hangs after its receipt lines reached the pipe, then aborted. */
function listenersOf(arm: Arm): Promise<StreamReading & { readonly outcome: string; readonly warningIds: readonly string[] }> {
  return withStandIn("hang", async (rf, children) => {
    const abort = new AbortController();
    const { value, warningIds } = await warningIdsDuring(async () => {
      const pending = settleOf(arm === "legacy" ? nativeReactiveFiberPreview("model", "task", rf.dir, abort.signal) : nativeReactiveFiberRender(SELECTORS.view, rf.dir, abort.signal));
      await until(() => bytesReadOf(children[0]) >= RECEIPT_BYTES);
      await sleep(QUIET_MS);
      const launched = children.length;
      const subject = observe(children[0]);
      const reading = compare(launched, subject, await referenceObservation(RECEIPT_TEXT));
      abort.abort();
      return { ...reading, outcome: outcomeText(await pending) };
    });
    return { ...value, warningIds };
  });
}
const listenerReadings = new Map<Arm, ReturnType<typeof listenersOf>>();
function listenerReading(arm: Arm): ReturnType<typeof listenersOf> {
  const known = listenerReadings.get(arm);
  if (known !== undefined) return known;
  const fresh = listenersOf(arm);
  listenerReadings.set(arm, fresh);
  return fresh;
}
/** A planted child (node run directly, never through the provider) writing `text` on stderr and hanging, prepared by `prepare`, read as
 * G2's run-time leg reads a launch: against a reference child. `before` runs ahead of the census's channel subscription. */
async function plantedReading(
  text: string,
  prepare: (child: ChildProcess, stderr: Readable) => () => unknown,
  before?: () => () => void,
): Promise<{ readonly stream: StreamReading; readonly seen: unknown }> {
  const undo = before?.();
  try {
    return await withChildren(async (children) => {
      const child = spawn(process.execPath, ["-e", `process.stderr.write(${JSON.stringify(text)}); setInterval(() => {}, 1000);`], { stdio: ["ignore", "pipe", "pipe"] });
      try {
        const seen = child.stderr === null ? () => "no stderr" : prepare(child, child.stderr);
        await until(() => bytesReadOf(child) >= Buffer.byteLength(text));
        await sleep(QUIET_MS);
        const launched = children.length;
        const subject = observe(child);
        return { stream: compare(launched, subject, await referenceObservation(text)), seen: seen() };
      } finally {
        child.kill("SIGKILL");
        await until(() => child.exitCode !== null || child.signalCode !== null);
      }
    });
  } finally {
    undo?.();
  }
}

interface KillReading {
  /** The custody's observable steps, from the trigger to the typed error. */
  readonly sequence: readonly string[];
  /** The rf ids the typed error's text spells. */
  readonly errorIds: readonly string[];
}
/**
 * The preview's custody under one kill, against a hanging stand-in that ignores SIGTERM, with the provider's timers fake: a
 * deadline kill advances to the deadline; an overflow kill is triggered by the stand-in's stderr, at fake time 0.
 */
async function killReading(kind: string): Promise<KillReading> {
  if (kind !== "deadline" && kind !== "overflow") return { sequence: [`no scenario for the ${kind} kill`], errorIds: [] };
  return withStandIn(kind === "deadline" ? "hang" : "overflow", async (rf) => {
    fakeTimers();
    const reading = nativeReactiveFiberPreview("model", "task", rf.dir);
    const sequence: string[] = [];
    let at = 0;
    if (kind === "deadline") {
      if (!(await until(() => rf.pid() !== undefined))) return { sequence: ["the stand-in never started"], errorIds: [] };
      vi.advanceTimersByTime(DEADLINE_MS - 1);
      await sleep(QUIET_MS);
      sequence.push(rf.termed() ? `SIGTERM before ${DEADLINE_MS} ms` : `no SIGTERM at ${DEADLINE_MS - 1} ms`);
      vi.advanceTimersByTime(1);
      at = DEADLINE_MS;
    }
    sequence.push((await until(rf.termed)) ? `SIGTERM at ${at} ms` : `no SIGTERM at ${at} ms`);
    const pid = rf.pid();
    vi.advanceTimersByTime(ESCALATION_MS - 1);
    await sleep(QUIET_MS);
    sequence.push(pid !== undefined && alive(pid) ? `alive at ${at + ESCALATION_MS - 1} ms` : `gone by ${at + ESCALATION_MS - 1} ms`);
    vi.advanceTimersByTime(1);
    const outcome = await settleOf(reading);
    sequence.push(outcome.state === "open" ? `open at ${at + ESCALATION_MS} ms` : `closed at ${at + ESCALATION_MS} ms`);
    const text = outcomeText(outcome);
    sequence.push(text);
    return { sequence, errorIds: rfIdsIn(text) };
  });
}
const kills = new Map<string, Promise<KillReading>>();
function killOf(kind: string): Promise<KillReading> {
  const known = kills.get(kind);
  if (known !== undefined) return known;
  const fresh = killReading(kind);
  kills.set(kind, fresh);
  return fresh;
}

const SCRIPT_HEAD = 'export const meta = { name: "rf-receipt-capture", description: "the committing rf scenario, through the one rf launch" };\n';
const SCRIPT = `${SCRIPT_HEAD}return await node("reactivefiber.render.preview", { model: "model", task: "task" });`;
/** A test host that journals Pi's one rf launch as a committing (write-class) node: Pi registers no committing rf capability. */
function committingHost(root: string, calls: { count: number }): WorkflowHost {
  return {
    async spawnAgent() {
      return { ok: false, error: "this census runs no agents" };
    },
    abortAgent() {},
    async callNode(request) {
      calls.count += 1;
      return nativeReactiveFiberRender(SELECTORS.legacy, root, request.signal);
    },
    describeNodeEffect: () => "write",
  };
}
/** The node rows of a journal, each as `dispatched|settled ok=<ok> effect=<class> refs=<count>`. */
function rowShapes(rows: readonly WorkflowJournalEntry[]): string[] {
  return rows
    .filter((row) => row.kind === "node")
    .map((row) => `${row.dispatched === true ? "dispatched" : "settled"} ok=${String(row.ok)} effect=${row.effectClass ?? "none"} refs=${row.nativeRefs?.length ?? 0}`);
}
/** Every nativeRef a journal's rows carry, as `provider/type/id`. */
function journalRefs(rows: readonly WorkflowJournalEntry[]): string[] {
  return rows.flatMap((row) => (row.nativeRefs ?? []).map((ref) => `${ref.provider}/${ref.type}/${ref.id}`));
}
function copyRows(rows: readonly WorkflowJournalEntry[]): WorkflowJournalEntry[] {
  return rows.map((row) => structuredClone(row));
}
interface KilledRun {
  readonly run: Outcome<WorkflowRunResult>;
  /** The bytes the launched child's stderr pipe had delivered when the deadline was advanced. */
  readonly stderrBytesBeforeKill: number;
  /** The journal when the deadline SIGTERM landed. */
  readonly atSigterm: readonly WorkflowJournalEntry[];
  readonly rows: readonly WorkflowJournalEntry[];
  readonly resume: WorkflowRunResult;
  readonly spawns: number;
  readonly nodeCalls: number;
}
/** The acceptance's scenario through the runtime: receipt lines on stderr, then the deadline; then a resume of that journal. */
function killedRunReading(): Promise<KilledRun> {
  return withStandIn("hang", async (rf, children) => {
    const rows: WorkflowJournalEntry[] = [];
    const calls = { count: 0 };
    const host = committingHost(rf.dir, calls);
    fakeTimers();
    const pending = runWorkflow({ script: SCRIPT, host, journal: { entries: rows, append: (row: WorkflowJournalEntry) => rows.push(row) } });
    const started = await until(() => rf.pid() !== undefined);
    if (started) await until(() => bytesReadOf(children[0]) >= RECEIPT_BYTES);
    const stderrBytesBeforeKill = bytesReadOf(children[0]);
    vi.advanceTimersByTime(DEADLINE_MS);
    const termed = started && (await until(rf.termed));
    const atSigterm = termed ? copyRows(rows) : [];
    vi.advanceTimersByTime(ESCALATION_MS);
    const run = await settleOf(pending);
    vi.useRealTimers();
    const resume = await runWorkflow({ script: SCRIPT, host, journal: { entries: copyRows(rows) } });
    return { run, stderrBytesBeforeKill, atSigterm, rows: copyRows(rows), resume, spawns: rf.spawns().length, nodeCalls: calls.count };
  });
}
let killed: Promise<KilledRun> | undefined;
function killedRun(): Promise<KilledRun> {
  killed ??= killedRunReading();
  return killed;
}
/** The live control: the same scenario settling with the envelope on stdout; the journal it writes. */
function settledRows(): Promise<WorkflowJournalEntry[]> {
  return withStandIn("settle", async (rf) => {
    const rows: WorkflowJournalEntry[] = [];
    const result = await runWorkflow({ script: SCRIPT, host: committingHost(rf.dir, { count: 0 }), journal: { entries: rows, append: (row: WorkflowJournalEntry) => rows.push(row) } });
    return result.status === "completed" ? copyRows(rows) : [];
  });
}
function runText(outcome: Outcome<WorkflowRunResult>): string {
  if (outcome.state !== "fulfilled") return outcome.state;
  const result = outcome.value;
  return `${result.status} ${result.capabilityError?.category ?? "untyped"}: ${result.error ?? ""}`;
}
/** The preview reading for one arm under the receipt lines on stderr, the argv the stand-in recorded, and the stderr bytes read. */
function previewOf(arm: Arm): Promise<{ readonly reading: JsonValue | undefined; readonly argv: readonly string[] | undefined; readonly stderrBytes: number }> {
  return withStandIn("settle", async (rf, children) => {
    const outcome = await settleOf(nativeReactiveFiberRender(SELECTORS[arm], rf.dir));
    return { reading: outcome.state === "fulfilled" ? outcome.value : undefined, argv: rf.spawns()[0], stderrBytes: bytesReadOf(children[0]) };
  });
}
const previews = new Map<Arm, ReturnType<typeof previewOf>>();
function previewReading(arm: Arm): ReturnType<typeof previewOf> {
  const known = previews.get(arm);
  if (known !== undefined) return known;
  const fresh = previewOf(arm);
  previews.set(arm, fresh);
  return fresh;
}

/* ------------------------------------------------------------------ *
 * The judged rows
 * ------------------------------------------------------------------ */

type PinId = "C1" | "C2" | "C3" | "R1" | "R2" | "G1" | "G2";
type ReadingId = "launches" | "killed-journal" | "journal-at-sigterm" | "resume" | "spawns" | "custody" | "stderr-discard";
/** Every reading a pin measures, by id; FROZEN SHAPE holds each to exactly one pin. */
const READINGS: Readonly<Record<ReadingId, () => Promise<unknown>>> = {
  launches: async () => {
    const files = srcTree();
    const argvs: Partial<Record<Arm, readonly string[]>> = {};
    for (const arm of ["legacy", "view"] as const) argvs[arm] = (await previewReading(arm)).argv;
    return {
      launchSites: launchSites(files),
      launchInventory: launchInventory(files),
      moduleSites: moduleSites(files, CHILD_PROCESS),
      opaqueLoads: opaqueLoads(files),
      argv: argvReadings(files),
      argvBuilders: argvBuilders(files),
      builderDeclarations: builderDeclarations(files),
      declarations: launchingDeclarations(files),
      declarationTexts: declarationTexts(files),
      registrations: rfRegistrations(files),
      recordedArms: Object.entries(argvs)
        .filter(([, argv]) => argv !== undefined)
        .map(([arm]) => arm),
      committingArms: committingArms(argvs),
    };
  },
  "killed-journal": async () => {
    const reading = await killedRun();
    return {
      run: runText(reading.run),
      rows: rowShapes(reading.rows),
      journalRefs: journalRefs(reading.rows),
      journalRfIds: rfIdsIn(JSON.stringify(reading.rows)),
      settledRefs: journalRefs(await settledRows()),
    };
  },
  "journal-at-sigterm": async () => {
    const reading = await killedRun();
    return { stderrBytesBeforeKill: reading.stderrBytesBeforeKill, atSigterm: rowShapes(reading.atSigterm), rfIdsAtSigterm: rfIdsIn(JSON.stringify(reading.atSigterm)) };
  },
  resume: async () => {
    const { resume } = await killedRun();
    const message = resume.capabilityError?.message ?? resume.error ?? "";
    return {
      resume: `${resume.status} ${resume.capabilityError?.category ?? "untyped"}`,
      producer: /\(producer "([^"]+)"\)/.exec(message)?.[1] ?? "none",
      namedRfIds: rfIdsIn(message),
      reconcileReads: [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])],
    };
  },
  spawns: async () => {
    const reading = await killedRun();
    return {
      spawns: reading.spawns,
      nodeCalls: reading.nodeCalls,
      resumeReplayed: reading.resume.replayedNodeCount,
      resumeReconciled: reading.resume.reconciledNodeCount,
    };
  },
  custody: async () => {
    const provider = { path: PROVIDER, text: readFileSync(join(REPO, PROVIDER), "utf8") };
    const sequences: Record<string, readonly string[]> = {};
    for (const kind of killKindsOf(STATEMENT)) sequences[kind] = (await killOf(kind)).sequence;
    return {
      ranges: rangesOf(clauseOf(ACCEPTANCE[2], 0)).map(([first, last]) => `${first}-${last}`),
      custody: custodyBlock(provider),
      stderrListeners: stderrListenerBlocks(provider),
      custodyHolders: custodyHolders(provider),
      previewCalls: callsOf(provider, "nativeReactiveFiberPreview"),
      kills: sequences,
    };
  },
  "stderr-discard": async () => {
    const preview = await previewReading("legacy");
    const reading = preview.reading;
    const errorIds: string[] = [];
    for (const kind of killKindsOf(STATEMENT)) errorIds.push(...(await killOf(kind)).errorIds);
    const files = srcTree();
    return {
      childUses: childUses(files),
      channelSites: moduleSites(files, DIAGNOSTICS_CHANNEL),
      opaqueLoads: opaqueLoads(files),
      listeners: { legacy: await listenerReading("legacy"), view: await listenerReading("view") },
      readingStderrBytes: preview.stderrBytes,
      readingKeys: reading !== null && typeof reading === "object" && !Array.isArray(reading) ? Object.keys(reading).sort() : [],
      readingIds: rfIdsIn(JSON.stringify(reading ?? null)),
      errorIds,
    };
  },
};
interface Pin {
  readonly id: PinId;
  /** The acceptance clause the pin answers (A1 holds each row's clauses to its export item). */
  readonly clause: string;
  /** UNTIL-THEN pins move when src gains a committing rf invocation its readers name; STANDING pins hold today and must keep holding. */
  readonly kind: "until-then" | "standing";
  readonly reading: ReadingId;
}
interface Row {
  readonly id: "capture" | "reconcile" | "preview-guard";
  readonly acceptance: 0 | 1 | 2;
  readonly pins: readonly Pin[];
}
const ROWS: readonly Row[] = [
  {
    id: "capture",
    acceptance: 0,
    pins: [
      { id: "C1", clause: clauseOf(ACCEPTANCE[0], 0), kind: "until-then", reading: "launches" },
      { id: "C2", clause: clauseOf(ACCEPTANCE[0], 1), kind: "until-then", reading: "killed-journal" },
      { id: "C3", clause: clauseOf(ACCEPTANCE[0], 2), kind: "until-then", reading: "journal-at-sigterm" },
    ],
  },
  {
    id: "reconcile",
    acceptance: 1,
    pins: [
      { id: "R1", clause: clauseOf(ACCEPTANCE[1], 0), kind: "until-then", reading: "resume" },
      { id: "R2", clause: clauseOf(ACCEPTANCE[1], 1), kind: "standing", reading: "spawns" },
    ],
  },
  {
    id: "preview-guard",
    acceptance: 2,
    pins: [
      { id: "G1", clause: clauseOf(ACCEPTANCE[2], 0), kind: "standing", reading: "custody" },
      { id: "G2", clause: clauseOf(ACCEPTANCE[2], 1), kind: "standing", reading: "stderr-discard" },
    ],
  },
];
const PINS = ROWS.flatMap((row) => row.pins.map((pin) => ({ ...pin, row: row.id, acceptance: row.acceptance })));

/** A G2 run-time stream reading of an untouched child against the reference: one counting listener added on a stderr that delivered the
 * receipt bytes, no difference from the reference child in listener counts, own properties, prototypes or the handle's onread. */
const CLEAN_STREAM: StreamReading = {
  launched: 1,
  stderrBytesRead: RECEIPT_BYTES,
  preset: false,
  reassigned: false,
  added: ["+data: chunk => chunk.length"],
  dataListeners: ["chunk => chunk.length"],
  encoding: null,
  listenerCounts: [],
  ownProperties: [],
  prototypes: [],
  onreadShared: true,
};
/** A G2 run-time reading of one arm today: the clean stream reading, then the typed cancel and no warning naming an rf id. */
const CLEAN_LISTENERS = { ...CLEAN_STREAM, outcome: "transport: RF preview cancelled.", warningIds: [] };
/** Each pin's measured witness today (measured by the cutting seat; the header's MEASURED). */
const WITNESS: Readonly<Record<PinId, unknown>> = {
  C1: {
    launchSites: [`${PROVIDER}:nativeReactiveFiberRender:spawn`],
    launchInventory: ["execFileSync:git", "execFileSync:git", "execFileSync:git", "spawn:<opaque process.execPath>", "spawn:rf"],
    moduleSites: [
      "src/index.ts:<module>:import:node:child_process",
      "src/workbench/hosts/local-detached.ts:<module>:import:node:child_process",
      `${PROVIDER}:<module>:import:node:child_process`,
    ],
    opaqueLoads: [OPAQUE_LOAD_TODAY],
    argv: [
      `${PROVIDER}:nativeReactiveFiberRender:spawn argv=renderArgv(selector,workspaceRoot) uses=1 builder=renderArgv@<module> returns=1 --no-commit=unconditional options={stdio:["ignore","pipe","pipe"],env:scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)}`,
    ],
    argvBuilders: [[...ARGV_BUILDER_TODAY]],
    builderDeclarations: [`${PROVIDER}:renderArgv:function@<module>`],
    declarations: [
      {
        declaration: `${PROVIDER}:nativeReactiveFiberRender(selector,workspaceRoot,signal)`,
        references: [`${PROVIDER}:nativeReactiveFiberPreview:call(3)`, `${PROVIDER}:registerNativeReactiveFiberRender:call(3)`],
      },
    ],
    declarationTexts: [`${PROVIDER}:nativeReactiveFiberRender lines=66 sha256=${LAUNCHING_DECLARATION_SHA}`],
    registrations: [`${PROVIDER}:reactivefiber.render.preview:read`, `${PROVIDER}:reactivefiber.render.preview:read`],
    recordedArms: ["legacy", "view"],
    committingArms: [],
  },
  C2: {
    run: "failed transport: RF preview exceeded the execution deadline.",
    rows: ["dispatched ok=false effect=write refs=0", "settled ok=false effect=write refs=0"],
    journalRefs: [],
    journalRfIds: [],
    settledRefs: [`reactivefiber/operation/${STDOUT_OPERATION}`],
  },
  C3: {
    stderrBytesBeforeKill: RECEIPT_BYTES,
    atSigterm: ["dispatched ok=false effect=write refs=0"],
    rfIdsAtSigterm: [],
  },
  R1: {
    resume: "failed uncertain-effect",
    producer: "reactivefiber",
    namedRfIds: [],
    reconcileReads: ["reactivefiber.render.preview"],
  },
  R2: {
    spawns: 1,
    nodeCalls: 1,
    resumeReplayed: 0,
    resumeReconciled: 0,
  },
  G1: {
    ranges: ["88-98", "107-110"],
    custody: [...CUSTODY_AT_PIN],
    stderrListeners: [[...STDERR_AT_PIN]],
    custodyHolders: ["nativeReactiveFiberRender"],
    previewCalls: ["nativeReactiveFiberRender"],
    kills: {
      deadline: [
        "no SIGTERM at 59999 ms",
        "SIGTERM at 60000 ms",
        "alive at 60499 ms",
        "closed at 60500 ms",
        "transport: RF preview exceeded the execution deadline.",
      ],
      overflow: ["SIGTERM at 0 ms", "alive at 499 ms", "closed at 500 ms", "transport: RF preview exceeded the bounded stderr output size."],
    },
  },
  G2: {
    childUses: [
      "child.exitCode",
      'child.kill("SIGKILL")',
      'child.kill("SIGTERM")',
      'child.once("close")',
      'child.once("error")',
      "child.signalCode",
      'child.stderr.on("data", chunk => chunk.length)',
      'child.stdout.on("data")',
      "const child = spawn(...)",
      'stdio ["ignore","pipe","pipe"]',
    ],
    channelSites: [],
    opaqueLoads: [OPAQUE_LOAD_TODAY],
    listeners: { legacy: CLEAN_LISTENERS, view: CLEAN_LISTENERS },
    readingStderrBytes: RECEIPT_BYTES,
    readingKeys: ["contract", "source", "workspaceRoot"],
    readingIds: [STDOUT_OPERATION, WORKSPACE_ID],
    errorIds: [],
  },
};

/* ------------------------------------------------------------------ *
 * ENUMERATION: one checkable item per resolvable surface, each bound to a falsifier this census runs
 * ------------------------------------------------------------------ */

/** A planted module for the src readers. */
function plant(path: string, lines: readonly string[]): SourceText {
  return { path, text: lines.join("\n") };
}
function planted(lines: readonly string[]): SourceText[] {
  return [plant("plant.ts", lines)];
}
function sites(lines: readonly string[]): string[] {
  return launchSites(planted(lines));
}
function inventory(lines: readonly string[]): string[] {
  return launchInventory(planted(lines));
}
function argvOf(lines: readonly string[]): string[] {
  return argvReadings(planted(lines));
}
/** A launch whose argv const calls a module-level builder returning `returned`. */
function builder(returned: string): string[] {
  return [`function argvOf(commit = false): string[] { return ${returned}; }`, "export function launch(): void {", "  const argv = argvOf();", '  spawn("rf", argv);', "}"];
}
/** The entries a reading gained: those of `after` beyond `before` (multiplicity kept). */
function addedEntries(after: readonly string[], before: readonly string[]): string[] {
  return difference(after, before)
    .filter((entry) => entry.startsWith("+"))
    .map((entry) => entry.slice(1));
}
/** A counting listener on a planted stream (chunk => chunk.length); the bytes it counted. */
function counting(stderr: Readable): () => number {
  const counted = { bytes: 0 };
  stderr.on("data", (chunk: Buffer | string) => {
    counted.bytes += chunk.length;
  });
  return () => counted.bytes;
}
/** A subscriber registered ahead of the census's that gives the first published ChildProcess an own stderr (the preset case). */
function presetStderr(): () => void {
  let fired = false;
  const early = (message: unknown): void => {
    if (fired || typeof message !== "object" || message === null || !("process" in message) || !(message.process instanceof ChildProcess)) return;
    fired = true;
    Object.defineProperty(message.process, "stderr", { configurable: true, enumerable: true, writable: true, value: null });
  };
  subscribe("child_process", early);
  return () => unsubscribe("child_process", early);
}
/** Gate member LC1's shape (refusal #2): a committing launch through cp = await import(CHILD_PROCESS_MODULE), the program imported. */
const LC1_PLANT: readonly string[] = [
  'import { RF_PROGRAM } from "./zz-bin.js";',
  'const CHILD_PROCESS_MODULE = "node:child_process";',
  "export async function commitRender(root: string): Promise<void> {",
  "  const cp = await import(CHILD_PROCESS_MODULE);",
  '  cp.spawn(RF_PROGRAM, ["--workspace", root, "context", "render", "--json"], { stdio: "ignore" });',
  "}",
];
/** Gate member LC2's shape (refusal #2): a builder nested in the launching declaration shadows the module-level one and drops --no-commit. */
const LC2_PLANT: readonly string[] = [
  'function renderArgv(): string[] { return ["context", "render", "--no-commit"]; }',
  "export function launch(): void {",
  '  function renderArgv(): string[] { return ["context", "render", ...(process.env.PI_RF_COMMIT === "1" ? [] : ["--no-commit"])]; }',
  "  const argv = renderArgv();",
  '  spawn("rf", argv);',
  "}",
];
/** A template command with an interpolation, spelled without a template placeholder in this file's own strings. */
const TEMPLATE_COMMAND = ["  exec(`rf --workspace ", "$", "{root} context render --json`);"].join("");
/** A descriptor whose id is a template with an interpolation, spelled the same way. */
const TEMPLATE_ID = ['register({ id: `reactivefiber.render.', "$", '{kind}`, effectClass: "write" });'].join("");
/** A module specifier that is a template with a resolving substitution, spelled the same way. */
const TEMPLATE_SPECIFIER = ["const cp = require(`", "$", "{NODE}:child_process`);"].join("");
/** A module specifier spelled as a template with a resolving substitution outside any call, spelled the same way. */
const TEMPLATE_TEXT_SPECIFIER = ["export const nested = `", "$", "{NODE}:child_process`;"].join("");

/** The readers each clause tag of C1's and G2's item words names; BINDING holds every item's falsifier to one of its tag's readers. */
const CLAUSE_READERS: Readonly<Record<string, readonly string[]>> = {
  "C1 (a)": ["sites"],
  "C1 (b)": ["inventory"],
  "C1 (b2)": ["moduleSites", "opaqueLoads"],
  "C1 (c)": ["argvOf", "argvBuilders", "builderDeclarations"],
  "C1 (d)": ["launchingDeclarations"],
  "C1 (e)": ["rfRegistrations"],
  "C1 (f)": ["committingArms"],
  "C1 (g)": ["declarationTexts"],
  "G2 (static)": ["childUses", "moduleSites", "opaqueLoads"],
  "G2 (run time)": ["plantedReading", "warningIdsDuring"],
};
interface Item {
  readonly id: string;
  readonly pin: "C1" | "G2";
  /** The claim, verbatim as the header's ENUMERATION block states it (ANCHOR). */
  readonly words: string;
  /** The falsifier: planted modules through the pin's own src readers, or planted children through its run-time reader. */
  readonly falsifier: () => Promise<unknown>;
  /** What the pin's reader reports on the plants: every planted route caught. */
  readonly caught: unknown;
}
const ENUMERATION: readonly Item[] = [
  {
    id: "C1-LAUNCH-ROUTES",
    pin: "C1",
    words: "C1 (a) reads as a launch call: a call by a launcher's own name (spawn, spawnSync, execFile, execFileSync, exec, execSync or fork); a call through an import specifier or a destructuring element renaming one, or through a const bound to a launcher's name or to a member naming one; a member call naming a launcher under any receiver, by name or by literal key; and an execve member call on the identifier process. It is an rf launch when its command words (C1-COMMAND-WORDS) include rf, read as path:declaration:launcher.",
    falsifier: async () => ({
      name: sites(['spawn("rf", ["context", "render"]);']),
      importAlias: sites(['import { spawn as launch } from "node:child_process";', 'launch("rf", []);']),
      destructure: sites(['const { spawn: run } = require("node:child_process");', 'run("rf", []);']),
      constAlias: sites(['import * as cp from "node:child_process";', "const run = cp.execFile;", 'run("rf", []);']),
      member: sites(['helpers.spawn("rf", []);']),
      keyed: sites(['import * as cp from "node:child_process";', 'cp["execFileSync"]("rf", []);']),
      execve: sites(['process.execve("/usr/bin/rf", ["rf"]);']),
    }),
    caught: {
      name: ["plant.ts:<module>:spawn"],
      importAlias: ["plant.ts:<module>:spawn"],
      destructure: ["plant.ts:<module>:spawn"],
      constAlias: ["plant.ts:<module>:execFile"],
      member: ["plant.ts:<module>:spawn"],
      keyed: ["plant.ts:<module>:execFileSync"],
      execve: ["plant.ts:<module>:execve"],
    },
  },
  {
    id: "C1-COMMAND-WORDS",
    pin: "C1",
    words: "C1 (a) reads a launch's command words from its first argument - a string, a template's literal parts (each substitution read by these same rules, or as a space when it does not resolve), every same-file const of that name in any scope, either side of ?? / || / ?:, a + join - read as a shell line split at whitespace, quotes and shell operators with each path reduced to its base name (.exe and .cmd dropped), plus each literal element of an array second argument.",
    falsifier: async () => {
      const count = (lines: readonly string[]): number => sites(lines).length;
      return {
        literal: count(['spawn("rf", []);']),
        constBound: count(['const RF = "rf";', 'execFileSync(RF, ["--json"]);']),
        everySameNamedConst: count(['const RF = "rf";', "export function launch(): void {", '  const RF = "forge";', "  execFileSync(RF, []);", "}"]),
        template: count([TEMPLATE_COMMAND]),
        alternative: count(['const RF_BIN = process.env.PI_RF_BIN ?? "rf";', "spawn(RF_BIN, []);"]),
        join: count(['spawn("r" + "f", []);']),
        shellLine: count(['exec("cd /tmp && /opt/bin/rf.exe --version");']),
        argvElement: count(['spawn("sh", ["-c", "rf --version"]);']),
        otherProgram: count(['execSync("forge run lint --json");']),
        regexExec: count(["/rf/.exec(text);"]),
      };
    },
    caught: { literal: 1, constBound: 1, everySameNamedConst: 1, template: 1, alternative: 1, join: 1, shellLine: 1, argvElement: 1, otherProgram: 0, regexExec: 0 },
  },
  {
    id: "C1-INVENTORY",
    pin: "C1",
    words: "C1 (b) reads every launch reached by a launcher's own or local name, through a child_process module binding (C1-MODULE-BINDINGS), or as an execve member call on the identifier process as an inventory member launcher:program, the program being its first command word or <opaque text> when that does not resolve; a member call under any other receiver is no member.",
    falsifier: async () => ({
      opaqueProgram: inventory(['import { RF_PROGRAM } from "./bin.js";', "spawn(RF_PROGRAM, []);"]),
      envProgram: inventory(['import { spawn } from "node:child_process";', "spawn(process.env.RF_BIN as string, []);"]),
      shellProgram: inventory(['spawn("sh", ["-c", command]);']),
      otherReceiver: inventory(["manager.spawn(pi, ctx);"]),
    }),
    caught: { opaqueProgram: ["spawn:<opaque RF_PROGRAM>"], envProgram: ["spawn:<opaque process.env.RF_BIN as string>"], shellProgram: ["spawn:sh"], otherReceiver: [] },
  },
  {
    id: "C1-MODULE-BINDINGS",
    pin: "C1",
    words: "C1 (b) reads as a child_process module binding: a namespace import, a default import, an import specifier naming its default, an import-equals require, and a const bound to, or destructured for the default of, a call whose first argument resolves to child_process (C1-SPECIFIER-TEXT) - require, import(), getBuiltinModule or any other callee - or to such a call's default member; a member call on such a call, or on its default member, is read as one too.",
    falsifier: async () => ({
      namespace: inventory(['import * as cp from "node:child_process";', "cp.fork(entry);"]),
      defaultImport: inventory(['import cp from "node:child_process";', "cp.spawn(bin, []);"]),
      defaultSpecifier: inventory(['import { default as cp } from "node:child_process";', "cp.execFile(bin, []);"]),
      importEquals: inventory(['import cp = require("node:child_process");', "cp.spawnSync(bin, []);"]),
      loadBinding: inventory(['const cp = await import("node:child_process");', "cp.spawn(bin, []);"]),
      defaultMember: inventory(['const cp = (await import("node:child_process")).default;', "cp.exec(command);"]),
      defaultDestructure: inventory(['const { default: cp } = await import("node:child_process");', "cp.execSync(command);"]),
      onTheCall: inventory(['process.getBuiltinModule("node:child_process").execFile(bin, []);']),
    }),
    caught: {
      namespace: ["fork:<opaque entry>"],
      defaultImport: ["spawn:<opaque bin>"],
      defaultSpecifier: ["execFile:<opaque bin>"],
      importEquals: ["spawnSync:<opaque bin>"],
      loadBinding: ["spawn:<opaque bin>"],
      defaultMember: ["exec:<opaque command>"],
      defaultDestructure: ["execSync:<opaque command>"],
      onTheCall: ["execFile:<opaque bin>"],
    },
  },
  {
    id: "C1-SPECIFIER-TEXT",
    pin: "C1",
    words: "C1 (b) resolves a module specifier as exact text: a string, a no-substitution template, every same-file const of that name in any scope, a template whose every substitution resolves, a + join, or a ?: / ?? / || / && whose sides both resolve (either side counts); a specifier that does not resolve binds no module, and C1-OPAQUE-LOADS reads its load (gate member LC1: a same-file const specifier).",
    falsifier: async () => ({
      constSpecifier: inventory(LC1_PLANT),
      joinSpecifier: inventory(['const cp = require("node:" + "child_process");', "cp.fork(entry);"]),
      templateSpecifier: inventory(['const NODE = "node";', TEMPLATE_SPECIFIER, "cp.fork(entry);"]),
      alternativeSpecifier: inventory(['const cp = require(process.env.PREFIXED ? "node:child_process" : "child_process");', "cp.fork(entry);"]),
      unresolved: inventory(['const cp = require(process.env.CP_MODULE ?? "node:child_process");', "cp.fork(entry);"]),
    }),
    caught: {
      constSpecifier: ["spawn:<opaque RF_PROGRAM>"],
      joinSpecifier: ["fork:<opaque entry>"],
      templateSpecifier: ["fork:<opaque entry>"],
      alternativeSpecifier: ["fork:<opaque entry>"],
      unresolved: [],
    },
  },
  {
    id: "C1-MODULE-SITES",
    pin: "C1",
    words: "C1 (b2) reads every place src spells or resolves child_process or node:child_process: each import, export-from and import-equals declaration (type-only ones included), each call, whatever its callee, whose first argument resolves to one (C1-SPECIFIER-TEXT), each other string or no-substitution template literal whose text is one, and each other template or + join, at its outermost, whose texts resolve to one, in any role; read as path:declaration:role:specifier.",
    falsifier: async () => ({
      declarations: moduleSites(planted(['export { spawn as start } from "node:child_process";', 'import type { ChildProcess } from "node:child_process";', 'import cp = require("child_process");']), CHILD_PROCESS),
      call: moduleSites(planted(['loadModule("node:" + "child" + "_process");']), CHILD_PROCESS),
      literal: moduleSites(planted(['const MODULE = "node:child_process";', "export const table = { module: `child_process` };"]), CHILD_PROCESS),
      text: moduleSites(planted(['export const parts = { name: ("node:" + "child_process") };', 'const NODE = "node";', TEMPLATE_TEXT_SPECIFIER]), CHILD_PROCESS),
    }),
    caught: {
      declarations: ["plant.ts:<module>:export:node:child_process", "plant.ts:<module>:import:node:child_process", "plant.ts:<module>:import=:child_process"],
      call: ["plant.ts:<module>:call loadModule:node:child_process"],
      literal: ["plant.ts:<module>:literal:child_process", "plant.ts:<module>:literal:node:child_process"],
      text: ["plant.ts:<module>:literal:child_process", "plant.ts:<module>:text:node:child_process", "plant.ts:<module>:text:node:child_process"],
    },
  },
  {
    id: "C1-OPAQUE-LOADS",
    pin: "C1",
    words: "C1 (b2) reads every load call whose specifier does not resolve (C1-SPECIFIER-TEXT) - import(), require or getBuiltinModule called by name or as a member, createRequire(...)(...), or a call through a same-file const bound to createRequire(...) - whatever it would load, read as path:declaration:loader:<opaque text>; G2 holds the same list.",
    falsifier: async () =>
      opaqueLoads(
        planted([
          "export async function load(name: string): Promise<unknown> { return import(name); }",
          "const req = createRequire(import.meta.url);",
          "req(modulePath);",
          "module.require(name);",
          "process.getBuiltinModule(name);",
          "createRequire(import.meta.url)(name);",
        ]),
      ),
    caught: [
      "plant.ts:<module>:createRequire():<opaque modulePath>",
      "plant.ts:<module>:createRequire():<opaque name>",
      "plant.ts:<module>:getBuiltinModule:<opaque name>",
      "plant.ts:<module>:require:<opaque name>",
      "plant.ts:load:import():<opaque name>",
    ],
  },
  {
    id: "C1-ARGV-BINDING",
    pin: "C1",
    words: "C1 (c) reads each rf launch's argv argument: an inline array; or an identifier that TypeScript's checker (a no-lib program over the launching file alone) binds by scope to one const declaration, read through its initializer, with its use count (every identifier the checker resolves to it); anything else reads unresolved.",
    falsifier: async () => ({
      inline: argvOf(['spawn("rf", ["context", "render", "--no-commit"]);']),
      mutated: argvOf(["export function launch(): void {", '  const argv = ["context", "render", "--no-commit"];', "  argv.pop();", '  spawn("rf", argv, { stdio: "ignore" });', "}"]),
      shadowed: argvOf(['const argv = ["context", "render", "--no-commit"];', "export function launch(): void {", '  const argv = ["context", "render"];', '  spawn("rf", argv);', "}"]),
      letBound: argvOf(["export function launch(): void {", '  let argv = ["context", "render", "--no-commit"];', '  spawn("rf", argv);', "}"]),
    }),
    caught: {
      inline: ["plant.ts:<module>:spawn argv=<inline> --no-commit=unconditional options=none"],
      mutated: ['plant.ts:launch:spawn argv=["context", "render", "--no-commit"] uses=2 builder=none returns=1 --no-commit=unconditional options={ stdio: "ignore" }'],
      shadowed: ['plant.ts:launch:spawn argv=["context", "render"] uses=1 builder=none returns=1 --no-commit=absent options=none'],
      letBound: ["plant.ts:launch:spawn argv=<unbound argv> --no-commit=unresolved options=none"],
    },
  },
  {
    id: "C1-ARGV-BUILDER",
    pin: "C1",
    words: "C1 (c) reads, when that const's initializer calls an identifier, the builder the checker binds it to by scope - a function declaration, or a const bound to an arrow or function expression - a same-named declaration nested in the launching declaration included, with that declaration's whole source lines; an imported, ambiguous or otherwise unbound callee reads unresolved (gate member LC2: a nested builder shadowing the module-level one).",
    falsifier: async () => ({
      nested: argvOf(LC2_PLANT),
      nestedLines: argvBuilders(planted(LC2_PLANT)),
      arrow: argvOf(['const argvOf = (): string[] => ["context", "render", "--no-commit"];', "export function launch(): void {", "  const argv = argvOf();", '  spawn("rf", argv);', "}"]),
      imported: argvOf(['import { renderArgv } from "./argv.js";', "export function launch(): void {", "  const argv = renderArgv();", '  spawn("rf", argv);', "}"]),
    }),
    caught: {
      nested: ["plant.ts:launch:spawn argv=renderArgv() uses=1 builder=renderArgv@launch returns=1 --no-commit=conditional options=none"],
      nestedLines: [[LC2_PLANT[2]]],
      arrow: ["plant.ts:launch:spawn argv=argvOf() uses=1 builder=argvOf@<module> returns=1 --no-commit=unconditional options=none"],
      imported: ["plant.ts:launch:spawn argv=renderArgv() uses=1 builder=renderArgv@unresolved returns=0 --no-commit=unresolved options=none"],
    },
  },
  {
    id: "C1-ARGV-RETURNS",
    pin: "C1",
    words: "C1 (c) reads every return of the resolved builder (an arrow's expression body included; nested functions excluded) for --no-commit as a literal element: unconditional when every return lists it directly, conditional when it appears only inside a spread or a conditional, absent, or unresolved when a return is no array literal; for exec and execSync it reads whether the command's words list it.",
    falsifier: async () => ({
      unconditional: argvOf(builder('["context", "render", "--no-commit"]')),
      conditional: argvOf(builder('["context", "render", ...(commit ? [] : ["--no-commit"])]')),
      absent: argvOf(builder('["context", "render"]')),
      unresolved: argvOf(builder("finalize()")),
      shellCommand: argvOf([TEMPLATE_COMMAND]),
    }),
    caught: {
      unconditional: ["plant.ts:launch:spawn argv=argvOf() uses=1 builder=argvOf@<module> returns=1 --no-commit=unconditional options=none"],
      conditional: ["plant.ts:launch:spawn argv=argvOf() uses=1 builder=argvOf@<module> returns=1 --no-commit=conditional options=none"],
      absent: ["plant.ts:launch:spawn argv=argvOf() uses=1 builder=argvOf@<module> returns=1 --no-commit=absent options=none"],
      unresolved: ["plant.ts:launch:spawn argv=argvOf() uses=1 builder=argvOf@<module> returns=1 --no-commit=unresolved options=none"],
      shellCommand: ["plant.ts:<module>:exec command --no-commit=absent options=none"],
    },
  },
  {
    id: "C1-BUILDER-DECLARATIONS",
    pin: "C1",
    words: "C1 (c) reads every declaration in the launching file that binds the builder's name - a function, a class, a const, let or var, a destructuring element, a parameter, an import, a named function or class expression, an enum or a namespace - as path:name:kind@declaration.",
    falsifier: async () => ({
      nested: builderDeclarations(planted(LC2_PLANT)),
      parameter: builderDeclarations(
        planted(['function renderArgv(): string[] { return ["--no-commit"]; }', "export function launch(renderArgv: () => string[]): void {", "  const argv = renderArgv();", '  spawn("rf", argv);', "}"]),
      ),
    }),
    caught: {
      nested: ["plant.ts:renderArgv:function@<module>", "plant.ts:renderArgv:function@launch"],
      parameter: ["plant.ts:renderArgv:function@<module>", "plant.ts:renderArgv:parameter@launch"],
    },
  },
  {
    id: "C1-OPTIONS",
    pin: "C1",
    words: "C1 (c) reads each rf launch's options argument as its source text, or none.",
    falsifier: async () => argvOf(['spawn("rf", ["--no-commit"], { stdio: "inherit", shell: true });']),
    caught: ['plant.ts:<module>:spawn argv=<inline> --no-commit=unconditional options={ stdio: "inherit", shell: true }'],
  },
  {
    id: "C1-DECLARATION-REFERENCES",
    pin: "C1",
    words: "C1 (d) reads, per rf launch, its declaration's parameters and every src reference to that declaration by its name - an identifier or a literal key - as a call with its arity, a value, an import or an export.",
    falsifier: async () => ({
      calls: launchingDeclarations([
        plant("control.ts", ["export function render(root: string, commit = false): void {", '  spawn("rf", ["--workspace", root, ...(commit ? [] : ["--no-commit"])]);', "}"]),
        plant("caller.ts", ['import { render } from "./control.js";', 'export function commit(): void { render("/w", true); }', "export const handle = render;"]),
      ]),
      keyed: launchingDeclarations([
        plant("control.ts", ["export function render(root: string): void {", '  spawn("rf", ["--workspace", root, "--no-commit"]);', "}"]),
        plant("keyed.ts", ['import * as provider from "./control.js";', 'export function commit(): void { provider["render"]("/w", true); }']),
      ]),
      exported: launchingDeclarations([plant("control.ts", ["function render(): void {", '  spawn("rf", ["--no-commit"]);', "}", "export { render };"])]),
    }),
    caught: {
      calls: [{ declaration: "control.ts:render(root,commit)", references: ["caller.ts:<module>:value", "caller.ts:commit:call(2)", "caller.ts:import"] }],
      keyed: [{ declaration: "control.ts:render(root)", references: ["keyed.ts:commit:call(2)"] }],
      exported: [{ declaration: "control.ts:render()", references: ["control.ts:export"] }],
    },
  },
  {
    id: "C1-DECLARATION-TEXT",
    pin: "C1",
    words: "C1 (g) reads, per rf launch, its declaration's line count and sha256/16 over those lines (for a launch at module level, the whole file), so any edit inside the launching declaration moves it.",
    falsifier: async () => {
      const launcher = (padding: string): SourceText[] => planted(["export function launch(): void {", `  spawn("rf", ["context", "render", "--no-commit"]);${padding}`, "}"]);
      const before = declarationTexts(launcher(""));
      return { lines: before.map((reading) => /lines=([0-9]+)/.exec(reading)?.[1]), moved: before.join() !== declarationTexts(launcher(" ")).join() };
    },
    caught: { lines: ["3"], moved: true },
  },
  {
    id: "C1-REGISTRATIONS",
    pin: "C1",
    words: "C1 (e) reads every object literal src writes whose id resolves to a reactivefiber.* name, as path:id:effectClass: the id and the effectClass each read as C1-COMMAND-WORDS reads a first argument's text (a string, a template's literal text, a same-file const, a + join, either side of ?: / ?? / ||), through a property assignment by name or literal key, a shorthand property naming a same-file const, or a spread of a same-file const object literal (properties in source order, a later one overriding) (gate member LC3: a spread with an effectClass override).",
    falsifier: async () => {
      const registrations = (lines: readonly string[]): string[] => rfRegistrations(planted(lines));
      return {
        literal: registrations(['registry.register({ descriptor: { id: "reactivefiber.render.commit", effectClass: "write" } });', 'register({ id: "forge.run", effectClass: "write" });']),
        keyed: registrations(['register({ "id": "reactivefiber.render.commit", ["effectClass"]: "write" });']),
        resolved: registrations([
          'const PREVIEW_ID = "reactivefiber.render.preview";',
          'const WRITE = "write";',
          "register({ id: PREVIEW_ID, effectClass: WRITE });",
          'register({ id: "reactivefiber." + "render.commit", effectClass: "wr" + "ite" });',
          TEMPLATE_ID,
        ]),
        shorthand: registrations(['const id = "reactivefiber.render.commit";', 'register({ id, effectClass: "write" });']),
        spreadOverride: registrations(['const nativeDescriptor = { id: "reactivefiber.render.preview", effectClass: "read" } as const;', 'registry.register({ descriptor: { ...nativeDescriptor, effectClass: "write" } });']),
      };
    },
    caught: {
      literal: ["plant.ts:reactivefiber.render.commit:write"],
      keyed: ["plant.ts:reactivefiber.render.commit:write"],
      resolved: ["plant.ts:reactivefiber.render. :write", "plant.ts:reactivefiber.render.commit:write", "plant.ts:reactivefiber.render.preview:write"],
      shorthand: ["plant.ts:reactivefiber.render.commit:write"],
      spreadOverride: ["plant.ts:reactivefiber.render.preview:read", "plant.ts:reactivefiber.render.preview:write"],
    },
  },
  {
    id: "C1-RUNTIME-ARGV",
    pin: "C1",
    words: "C1 (f) reads, at run time, both input arms' argv as the stand-in recorded them, and which arm's recorded argv lists no --no-commit.",
    falsifier: async () => committingArms({ legacy: ["context", "render", "--no-commit"], view: ["context", "render", "--view", "v"] }),
    caught: ["view"],
  },
  {
    id: "G2-BINDING-USES",
    pin: "G2",
    words: "G2 (static) reads, per rf launch C1 finds, whether it is bound to a const or a let, and every reference to that binding by name inside the launching declaration: a member read or call; a stdout or stderr member with its method, and for a stderr data listener its chunk parameter's uses (plus this or arguments in a non-arrow listener); or a bare use by its syntax kind; so a destructuring, child.stdio, an element access, a hand-off to a helper, a second listener and another stream member each read as a new use.",
    falsifier: async () =>
      childUses(
        planted([
          "export function preview(): void {",
          '  const child = spawn("rf", ["context", "render"], { stdio: ["ignore", "pipe", "pipe"] });',
          "  const { stderr: receipts } = child;",
          '  child.stdio[2]?.on("data", (chunk: Buffer) => chunk.toString());',
          '  child["stderr"].on("data", (chunk: Buffer) => chunk.length);',
          "  watch(child);",
          '  child.stderr.on("data", (chunk: Buffer) => { void chunk.length; parse(chunk); });',
          '  child.stderr.on("data", function (chunk: Buffer) { void chunk.length; void arguments[0]; });',
          '  child.stderr.setEncoding("utf8");',
          '  child.stderr.on("readable", () => {});',
          "}",
        ]),
      ),
    caught: [
      "child (CallExpression)",
      "child (VariableDeclaration)",
      'child.stderr.on("data", chunk => arguments, chunk.length)',
      'child.stderr.on("data", chunk => chunk, chunk.length)',
      'child.stderr.on("readable")',
      "child.stderr.setEncoding",
      "child.stdio",
      'child["stderr"]',
      "const child = spawn(...)",
      'stdio ["ignore", "pipe", "pipe"]',
    ],
  },
  {
    id: "G2-STDIO",
    pin: "G2",
    words: "G2 (static) reads each rf launch's stdio option text, or <unread> together with the unbound call when the launch is bound to no declared name.",
    falsifier: async () => ({
      unbound: childUses(planted(['export const render = (): void => { spawn("rf", []).stderr?.on("data", parse); };'])),
      inherit: childUses(planted(["export function preview(): void {", '  const child = spawn("rf", [], { stdio: "inherit" });', "}"])),
    }),
    caught: { unbound: ["stdio <unread>", "unbound spawn(...) (PropertyAccessExpression)"], inherit: ["const child = spawn(...)", 'stdio "inherit"'] },
  },
  {
    id: "G2-CHANNEL-SITES",
    pin: "G2",
    words: "G2 (static) reads every place src spells or resolves diagnostics_channel or node:diagnostics_channel, by the roles C1-MODULE-SITES reads for child_process (gate members LG1, LG1b, LG1x and LG2: an import of it; LG1g: a getBuiltinModule call naming it).",
    falsifier: async () => ({
      importDeclaration: moduleSites(planted(['import { subscribe } from "node:diagnostics_channel";', 'subscribe("child_process", onChild);']), DIAGNOSTICS_CHANNEL),
      builtin: moduleSites(
        planted(["export function preview(): void {", '  const channel = process.getBuiltinModule("node:diagnostics_channel");', '  channel.subscribe("child_process", onChild);', "}"]),
        DIAGNOSTICS_CHANNEL,
      ),
      constSpecifier: moduleSites(planted(['const CHANNELS = "diagnostics_channel";', "const channel = require(CHANNELS);"]), DIAGNOSTICS_CHANNEL),
    }),
    caught: {
      importDeclaration: ["plant.ts:<module>:import:node:diagnostics_channel"],
      builtin: ["plant.ts:preview:call getBuiltinModule:node:diagnostics_channel"],
      constSpecifier: ["plant.ts:<module>:call require:diagnostics_channel", "plant.ts:<module>:literal:diagnostics_channel"],
    },
  },
  {
    id: "G2-OPAQUE-LOADS",
    pin: "G2",
    words: "G2 (static) reads every opaque load, as C1-OPAQUE-LOADS reads it.",
    falsifier: async () => opaqueLoads(planted(['export function preview(name: string): void { process.getBuiltinModule(name).subscribe("child_process", onChild); }'])),
    caught: ["plant.ts:preview:getBuiltinModule:<opaque name>"],
  },
  {
    id: "G2-TRAP",
    pin: "G2",
    words: "G2 (run time) reads, for each input arm, the ChildProcess the \"child_process\" diagnostics channel publishes for the launch, with child.stderr trapped by this census's subscriber (an accessor that records the stream Node assigns and turns back into a data property): preset when the ChildProcess already owned a stderr when published, reassigned when child.stderr is no longer the stream Node assigned or the trap never saw one; plus how many ChildProcess objects were published before the reference child and the bytes the stderr pipe had delivered at the reading. Each arm is read against a reference child this census spawns itself - this process's node writing the same receipt lines on stderr and hanging, stdio [\"ignore\",\"pipe\",\"pipe\"], one listener counting chunk.length - trapped and read the same way once its bytes arrived and 250 ms passed.",
    falsifier: async () => {
      const preset = await plantedReading(RECEIPT_TEXT, (_child, stderr) => counting(stderr), presetStderr);
      const reassigned = await plantedReading(RECEIPT_TEXT, (child, stderr) => {
        const seen = counting(stderr);
        Object.defineProperty(child, "stderr", { configurable: true, enumerable: true, writable: true, value: new PassThrough() });
        return seen;
      });
      return {
        preset: { preset: preset.stream.preset, reassigned: preset.stream.reassigned },
        reassigned: { preset: reassigned.stream.preset, reassigned: reassigned.stream.reassigned },
        launched: reassigned.stream.launched,
        bytes: reassigned.stream.stderrBytesRead,
      };
    },
    caught: { preset: { preset: true, reassigned: true }, reassigned: { preset: false, reassigned: true }, launched: 1, bytes: RECEIPT_BYTES },
  },
  {
    id: "G2-LISTENER-LOG",
    pin: "G2",
    words: "G2 (run time) reads every listener added to or removed from the assigned stream after Node assigned it, through the reading - by on, once, addListener, prependListener, prependOnceListener or the stream's own internals - recorded by its newListener and removeListener events while this census's two recorders stay attached to it (a once listener as the function it wraps), as +event or -event with the listener's chunk uses, in order; so a listener that fired and detached before the reading is still read (gate members LG1, LG1b, LG1x and LG1g: a once data listener attached on the next tick).",
    falsifier: async () => {
      const planted = await plantedReading(RECEIPT_TEXT, (_child, stderr) => {
        const seen = counting(stderr);
        const parsed: { id?: string } = {};
        stderr.once("data", (chunk: Buffer) => {
          parsed.id = /rfo_[0-9a-z]{22,32}/.exec(chunk.toString("utf8"))?.[0];
        });
        stderr.prependListener("end", () => undefined);
        return () => ({ bytes: seen(), parsed: parsed.id });
      });
      return { added: planted.stream.added, dataListeners: planted.stream.dataListeners, seen: planted.seen };
    },
    caught: {
      added: ["+data: chunk => chunk.length", "+data: chunk => chunk.toString", "+end: <no named chunk>", "-data: chunk => chunk.toString"],
      dataListeners: ["chunk => chunk.length"],
      seen: { bytes: RECEIPT_BYTES, parsed: STDERR_OPERATION },
    },
  },
  {
    id: "G2-DATA-LISTENERS",
    pin: "G2",
    words: "G2 (run time) reads, at the reading, each data listener's chunk uses (parsed from the listener's own running source) and the stream's encoding.",
    falsifier: async () => {
      const planted = await plantedReading(`${RECEIPT_TEXT}${RECEIPT_TEXT}`, (_child, stderr) => {
        const text = { value: "" };
        stderr.setEncoding("utf8");
        const seen = counting(stderr);
        stderr.on("data", (chunk: string) => {
          text.value += chunk.toString();
        });
        return () => ({ bytes: seen(), ids: rfIdsIn(text.value) });
      });
      return { dataListeners: planted.stream.dataListeners, encoding: planted.stream.encoding, seen: planted.seen };
    },
    caught: {
      dataListeners: ["chunk => chunk.length", "chunk => chunk.toString"],
      encoding: "utf8",
      seen: { bytes: 2 * RECEIPT_BYTES, ids: [STDERR_OPERATION, STDERR_RENDER, STDERR_TRANSACTION] },
    },
  },
  {
    id: "G2-LISTENER-COUNTS",
    pin: "G2",
    words: "G2 (run time) reads, at the reading, the listener count of every event the stream has listeners for, as a difference from the reference child's.",
    falsifier: async () => {
      const planted = await plantedReading(RECEIPT_TEXT, (_child, stderr) => {
        const seen = counting(stderr);
        stderr.on("readable", () => undefined);
        return seen;
      });
      return planted.stream.listenerCounts;
    },
    caught: ["+readable:1"],
  },
  {
    id: "G2-OWN-PROPERTIES",
    pin: "G2",
    words: "G2 (run time) reads every own property of the stream, of its handle and of the ChildProcess - string and symbol keys - as object.key:kind (accessor, function or value), as a difference from the reference child's, so an own accessor or function override on any of the three reads (gate member LG2: an own accessor push).",
    falsifier: async () => {
      const planted = await plantedReading(RECEIPT_TEXT, (child, stderr) => {
        const seen = counting(stderr);
        const captured = { text: "" };
        const push = stderr.push;
        Object.defineProperty(stderr, "push", {
          configurable: true,
          get: () =>
            function (this: Readable, chunk: unknown, encoding?: BufferEncoding): boolean {
              if (chunk !== null) captured.text += String(chunk);
              return push.call(this, chunk, encoding);
            },
        });
        Object.defineProperty(child, "emit", { configurable: true, writable: true, value: child.emit.bind(child) });
        const handle = handleOf(stderr);
        if (handle !== null) Reflect.set(handle, Symbol.for("rf-receipt-capture"), true);
        return () => ({ bytes: seen(), ids: rfIdsIn(captured.text) });
      });
      return { ownProperties: planted.stream.ownProperties, seen: planted.seen };
    },
    caught: {
      ownProperties: ["+child.emit:function", "+handle.Symbol(rf-receipt-capture):value", "+stream.push:accessor"],
      seen: { bytes: RECEIPT_BYTES, ids: [STDERR_OPERATION, STDERR_RENDER, STDERR_TRANSACTION] },
    },
  },
  {
    id: "G2-PROTOTYPES",
    pin: "G2",
    words: "G2 (run time) reads whether the stream's, the handle's and the ChildProcess's prototypes are the reference child's, and whether the handle's onread, read through its prototype accessor, is the reference handle's.",
    falsifier: async () => {
      const swapped = await plantedReading(RECEIPT_TEXT, (_child, stderr) => {
        const seen = counting(stderr);
        Object.setPrototypeOf(stderr, Object.create(Object.getPrototypeOf(stderr)));
        return seen;
      });
      const wrapped = await plantedReading(RECEIPT_TEXT, (_child, stderr) => {
        const seen = counting(stderr);
        const handle = handleOf(stderr);
        const onread: unknown = handle === null ? undefined : Reflect.get(handle, "onread");
        if (handle !== null && typeof onread === "function") {
          const forward: (...args: unknown[]) => unknown = (...args) => Reflect.apply(onread, handle, args);
          Reflect.set(handle, "onread", forward);
        }
        return seen;
      });
      return { swapped: swapped.stream.prototypes, onreadShared: wrapped.stream.onreadShared, wrappedOwn: wrapped.stream.ownProperties };
    },
    caught: { swapped: ["stream"], onreadShared: false, wrappedOwn: [] },
  },
  {
    id: "G2-SINKS",
    pin: "G2",
    words: "G2 (run time) reads, after the abort, the typed cancel and the rf ids any process warning names during the launch; and the preview reading's keys and rf ids under all three receipt forms on stderr, and the rf ids each kill's typed error spells.",
    falsifier: async () => ({
      warning: await warningIdsDuring(async () => {
        process.emitWarning(STDERR_OPERATION, "Receipt");
        return "emitted";
      }),
      errorText: rfIdsIn(`exceeded the deadline (${STDERR_RENDER})`),
    }),
    caught: { warning: { value: "emitted", warningIds: [STDERR_OPERATION] }, errorText: [STDERR_RENDER] },
  },
];

/* ------------------------------------------------------------------ *
 * Named residuals, each with a pinned quiet row
 * ------------------------------------------------------------------ */

interface Residual {
  readonly id: "R-OPAQUE-LAUNCHER" | "R-OPAQUE-LOADER" | "R-OPAQUE-REGISTRATION" | "R-PROTOTYPE-PATCH" | "R-EVALUATED-SOURCE" | "R-NON-PROCESS" | "R-STREAM-INTERNALS" | "R-RECORDER-DETACH";
  /** The pins whose claims the residual bounds (their titles name it). */
  readonly pins: readonly PinId[];
  /** The residual, verbatim as the header's RESIDUALS block states it (ANCHOR). */
  readonly words: string;
  /** The quiet row: the escape planted and read by the pins' own readers. */
  readonly quiet: () => Promise<unknown>;
  /** What the readers report on the plant: nothing, or the clean reading, so the escape stays uncaught. */
  readonly reads: unknown;
}
const RESIDUALS: readonly Residual[] = [
  {
    id: "R-OPAQUE-LAUNCHER",
    pins: ["C1"],
    words: "a launch function reaching a call other than as C1-LAUNCH-ROUTES reads it - for instance through a parameter, Reflect.apply, call/apply/bind, a computed key that is no literal, or as a member of a receiver that is no child_process binding with a program that does not resolve - is no launch to C1 (a)-(d); such a launch moves C1 only through C1-MODULE-SITES when its module adds a site, so one fed from an existing child_process import moves no C1 field (quiet row: those calls, added to a module that already holds its child_process imports, add no launch site, inventory member, module site or opaque load).",
    quiet: async () => {
      const existing = [
        'import * as cp from "node:child_process";',
        'import { execFileSync } from "node:child_process";',
        'export function status(): string { return String(execFileSync("git", ["status"])); }',
      ];
      const escapes = [
        'export function viaParameter(run: (program: string, argv: string[]) => void): void { run("rf", ["context", "render", "--json"]); }',
        'export function viaReflect(): void { Reflect.apply(cp.spawn, undefined, ["rf", ["context", "render", "--json"]]); }',
        'export function viaBind(): void { cp.spawn.bind(undefined)("rf", ["context", "render", "--json"]); }',
        'export function viaComputed(key: "spawn"): void { cp[key]("rf", ["context", "render", "--json"]); }',
        'export function viaHelper(helpers: { spawn(program: string, argv: string[]): void }, bin: string): void { helpers.spawn(bin, ["context", "render", "--json"]); }',
        "export function viaExisting(): void { viaParameter(execFileSync); }",
      ];
      const before = [plant("existing.ts", existing)];
      const after = [plant("existing.ts", [...existing, ...escapes])];
      return {
        launchSites: addedEntries(launchSites(after), launchSites(before)),
        launchInventory: addedEntries(launchInventory(after), launchInventory(before)),
        moduleSites: addedEntries(moduleSites(after, CHILD_PROCESS), moduleSites(before, CHILD_PROCESS)),
        opaqueLoads: addedEntries(opaqueLoads(after), opaqueLoads(before)),
      };
    },
    reads: { launchSites: [], launchInventory: [], moduleSites: [], opaqueLoads: [] },
  },
  {
    id: "R-OPAQUE-LOADER",
    pins: ["C1", "G2"],
    words: "a module loaded by a loader the readers do not name - for instance a loader received as a parameter or returned by a library call, require.call, Module._load, process.binding or process._linkedBinding, or process.dlopen - with a specifier that no literal spells and that does not resolve as C1-SPECIFIER-TEXT reads it adds no module site and no opaque load to either pin; a launch through it is still read by C1 (a) when its command words include rf, so a committing render reached that way with a program that does not resolve moves no C1 field, and a diagnostics_channel subscriber reached that way moves no G2 static field, while G2's run-time leg still reads what it does to the stream (quiet row: such loads of both modules, their names built from character codes and a join, add nothing to either pin's site, load or launch readings).",
    quiet: async () => {
      const files = [
        plant("opaque-loader.ts", [
          "const childProcess = String.fromCharCode(99, 104, 105, 108, 100, 95, 112, 114, 111, 99, 101, 115, 115);",
          'const channels = ["diagnostics", "channel"].join("_");',
          "export async function viaLoader(load: (specifier: string) => Promise<{ spawn(program: string, argv: string[]): unknown }>, bin: string): Promise<void> {",
          '  (await load(childProcess)).spawn(bin, ["context", "render", "--json"]);',
          "  await load(channels);",
          "}",
          'export function viaBinding(): unknown { return Reflect.get(process, "binding").call(process, "spawn_sync"); }',
        ]),
      ];
      return {
        childProcessSites: moduleSites(files, CHILD_PROCESS),
        channelSites: moduleSites(files, DIAGNOSTICS_CHANNEL),
        opaqueLoads: opaqueLoads(files),
        launchSites: launchSites(files),
        launchInventory: launchInventory(files),
      };
    },
    reads: { childProcessSites: [], channelSites: [], opaqueLoads: [], launchSites: [], launchInventory: [] },
  },
  {
    id: "R-OPAQUE-REGISTRATION",
    pins: ["C1"],
    words: "a descriptor whose id resolves to no text - a parameter, an import, a shorthand property naming no same-file const, a string built at run time, or a spread of anything but a same-file const object literal (a call result, an import, a parameter) - or to no reactivefiber.* name is no registration to C1 (e); a committing launch behind it is still read by (a)-(d) (quiet row: write-class descriptors with a parameter id, a shorthand parameter id, an rf.* id and a spread call result read no registration).",
    quiet: async () => ({
      registrations: rfRegistrations([
        plant("opaque-registration.ts", [
          "export function viaParameter(registry: { register(entry: unknown): void }, id: string, effectClass: string, base: () => object): void {",
          '  registry.register({ descriptor: { id, effectClass: "write" } });',
          "  registry.register({ descriptor: { id: id, effectClass } });",
          '  registry.register({ descriptor: { id: "rf.render.commit", effectClass: "write" } });',
          '  registry.register({ descriptor: { ...base(), effectClass: "write" } });',
          "}",
        ]),
      ]),
    }),
    reads: { registrations: [] },
  },
  {
    id: "R-PROTOTYPE-PATCH",
    pins: ["C1"],
    words: "a launcher or ChildProcess method patched on a shared prototype that the src readers never see written - for instance ChildProcess.prototype.spawn reached through an existing child with Object.getPrototypeOf - rewriting an rf launch's argv or program after its builder returns, under a condition this census does not set (an environment variable), is read by no C1 item: the static items read the launch, its builder and its module sites unchanged, and C1 (f) reads only the argv the stand-in records under this census's own environment (quiet row: such a patch added to a module beside an unchanged launch adds no launch site, inventory member, module site, opaque load, argv reading or registration).",
    quiet: async () => {
      const existing = ['import { spawn } from "node:child_process";', 'export function launchDetached(): object { return spawn(process.execPath, ["-e", ""], { stdio: "ignore" }); }'];
      const escapes = [
        "export function patchSpawn(child: object): void {",
        "  const base = Object.getPrototypeOf(child) as { spawn(this: unknown, options: { args: string[] }): unknown };",
        "  const original = base.spawn;",
        '  base.spawn = function (this: unknown, options: { args: string[] }): unknown { if (process.env.PI_RF_COMMIT === "1") options.args = options.args.filter((arg) => arg !== "--no-commit"); return original.call(this, options); };',
        "}",
      ];
      const before = [plant("prototype-patch.ts", existing)];
      const after = [plant("prototype-patch.ts", [...existing, ...escapes])];
      return {
        launchSites: addedEntries(launchSites(after), launchSites(before)),
        launchInventory: addedEntries(launchInventory(after), launchInventory(before)),
        moduleSites: addedEntries(moduleSites(after, CHILD_PROCESS), moduleSites(before, CHILD_PROCESS)),
        opaqueLoads: addedEntries(opaqueLoads(after), opaqueLoads(before)),
        argv: addedEntries(argvReadings(after), argvReadings(before)),
        registrations: addedEntries(rfRegistrations(after), rfRegistrations(before)),
      };
    },
    reads: { launchSites: [], launchInventory: [], moduleSites: [], opaqueLoads: [], argv: [], registrations: [] },
  },
  {
    id: "R-EVALUATED-SOURCE",
    pins: ["C1"],
    words: "source text assembled at run time and evaluated (new Function, eval, vm, a Worker with eval), or an embedded string that neither calls require( nor getBuiltinModule(, is no module to the src readers (quiet row: a launch joined from parts and handed to new Function reads no embedded module, rf launch, inventory member, module site or opaque load).",
    quiet: async () => {
      const files = [
        plant("evaluated-source.ts", [
          'const PARTS = ["const cp = req", "uire(\\"node:child_", "process\\");", "cp.spawn(\\"rf\\", [\\"context\\", \\"render\\", \\"--json\\"]);"];',
          'export function viaEvaluator(): void { new Function(PARTS.join(""))(); }',
        ]),
      ];
      return {
        embedded: files.flatMap(embeddedSources).map((file) => file.path),
        launchSites: launchSites(files),
        launchInventory: launchInventory(files),
        moduleSites: moduleSites(files, CHILD_PROCESS),
        opaqueLoads: opaqueLoads(files),
      };
    },
    reads: { embedded: [], launchSites: [], launchInventory: [], moduleSites: [], opaqueLoads: [] },
  },
  {
    id: "R-NON-PROCESS",
    pins: ["C1"],
    words: "an rf invocation that is no child process (a socket or HTTP request, an in-process library; Pi vendors no rf library and rf publishes no TS SDK) is not read (quiet row: a fetch-driven committing render reads no launch, inventory member, module site or registration).",
    quiet: async () => {
      const files = [
        plant("non-process.ts", [
          "export async function viaServer(root: string): Promise<Response> {",
          '  return fetch("http://127.0.0.1:7777/rf/context/render", { method: "POST", body: JSON.stringify({ root, commit: true }) });',
          "}",
        ]),
      ];
      return { launchSites: launchSites(files), launchInventory: launchInventory(files), moduleSites: moduleSites(files, CHILD_PROCESS), registrations: rfRegistrations(files) };
    },
    reads: { launchSites: [], launchInventory: [], moduleSites: [], registrations: [] },
  },
  {
    id: "R-STREAM-INTERNALS",
    pins: ["G2"],
    words: "a read wired below the surfaces G2's legs read, through state the reference child shares or the static leg does not read - a patched shared prototype the stream, its handle or its chunks inherit from (a Readable, Socket, EventEmitter or handle method, a Buffer or typed-array accessor such as the length the counting listener reads), the stream's internal state objects (its _readableState or _events), a callback stored through a prototype accessor other than the handle's onread, a direct read() or unshift, a listener attached before Node assigns child.stderr and removed before the reading, or the parent's view of the pipe's file descriptor - is invisible to both legs (quiet row: a push hook on the shared Readable prototype, beside a pure counting listener, captures all three stderr ids while the static reading and the run-time reading against the reference read clean).",
    quiet: async () => {
      const files = [
        plant("stream-internals.ts", [
          'import { spawn } from "node:child_process";',
          'import { Readable } from "node:stream";',
          'let captured = "";',
          "const push = Readable.prototype.push;",
          "Readable.prototype.push = function (chunk: unknown, encoding?: BufferEncoding): boolean { captured += String(chunk); return push.call(this, chunk, encoding); };",
          "export function preview(): void {",
          "  let bytes = 0;",
          '  const child = spawn("rf", ["context", "render", "--no-commit"], { stdio: ["ignore", "pipe", "pipe"] });',
          '  child.stderr.on("data", (chunk: Buffer) => { bytes += chunk.length; });',
          "}",
        ]),
      ];
      const hook = { captured: "" };
      const planted = await plantedReading(RECEIPT_TEXT, (_child, stderr) => counting(stderr), () => {
        const push = Readable.prototype.push;
        Readable.prototype.push = function (this: Readable, chunk: unknown, encoding?: BufferEncoding): boolean {
          if (chunk !== null) hook.captured += String(chunk);
          return push.call(this, chunk, encoding);
        };
        return () => {
          Readable.prototype.push = push;
        };
      });
      return {
        childUses: childUses(files),
        channelSites: moduleSites(files, DIAGNOSTICS_CHANNEL),
        opaqueLoads: opaqueLoads(files),
        stream: planted.stream,
        seen: { bytes: planted.seen, hookCaptured: rfIdsIn(hook.captured) },
      };
    },
    reads: {
      childUses: ['child.stderr.on("data", chunk => chunk.length)', "const child = spawn(...)", 'stdio ["ignore", "pipe", "pipe"]'],
      channelSites: [],
      opaqueLoads: [],
      stream: CLEAN_STREAM,
      seen: { bytes: RECEIPT_BYTES, hookCaptured: [STDERR_OPERATION, STDERR_RENDER, STDERR_TRANSACTION] },
    },
  },
  {
    id: "R-RECORDER-DETACH",
    pins: ["G2"],
    words: "a listener change made while this census's newListener and removeListener recorders are detached from the stream - removed through the listener API (the removeListener recorder first, so neither removal emits) and re-attached afterwards, for instance from inside a once listener's own body - is no entry in G2-LISTENER-LOG, and with the recorders back and the listener gone the stream reads as the reference does (quiet row: a once data listener attached while the recorders are detached, re-attaching them as it fires, captures the stderr operation id while the run-time reading equals the clean reading).",
    quiet: async () => {
      const hook: { id?: string } = {};
      const planted = await plantedReading(RECEIPT_TEXT, (_child, stderr) => {
        const seen = counting(stderr);
        const additions = stderr.listeners("newListener");
        const removals = stderr.listeners("removeListener");
        stderr.removeAllListeners("removeListener");
        stderr.removeAllListeners("newListener");
        stderr.once("data", (chunk: Buffer) => {
          hook.id = /rfo_[0-9a-z]{22,32}/.exec(chunk.toString("utf8"))?.[0];
          for (const listener of removals) Reflect.apply(stderr.on, stderr, ["removeListener", listener]);
          for (const listener of additions) Reflect.apply(stderr.on, stderr, ["newListener", listener]);
        });
        return seen;
      });
      return { stream: planted.stream, seen: { bytes: planted.seen, parsed: hook.id } };
    },
    reads: { stream: CLEAN_STREAM, seen: { bytes: RECEIPT_BYTES, parsed: STDERR_OPERATION } },
  },
];
function residualsOf(pin: PinId): string[] {
  return RESIDUALS.filter((residual) => residual.pins.includes(pin)).map((residual) => residual.id);
}
function scenarioOf(pin: (typeof PINS)[number]): string | undefined {
  return ["killed-journal", "journal-at-sigterm", "resume", "spawns"].includes(pin.reading) ? "scenario: a deadline kill under a write-class test host" : undefined;
}
function titleOf(pin: (typeof PINS)[number]): string {
  const residuals = residualsOf(pin.id);
  const scenario = scenarioOf(pin);
  return `${pin.id} (${pin.row}, ${pin.kind}${scenario === undefined ? "" : `; ${scenario}`}${residuals.length > 0 ? `; residuals ${residuals.join(", ")}` : ""}): ${pin.clause}`;
}
function owed(pin: (typeof PINS)[number]): string {
  return pin.kind === "until-then"
    ? `UNTIL-THEN (${BEAD} ${pin.id}): Pi's rf invocation path moved on the clause "${pin.clause}". If Pi now has a committing rf capability (wb-x32 resolved to a committing render), the acceptance is owed on landing: ${ACCEPTANCE[pin.acceptance]} If it does not, re-measure the witness and say so.`
    : `STANDING (${BEAD} ${pin.id}): the clause "${pin.clause}" no longer holds. The statement keeps it: ${STATEMENT}`;
}

/** The bead's own export row (title and description only: later store writes change neither). */
function exportRow(): { title: string; description: string } {
  const rows = readFileSync(join(REPO, EXPORT), "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line): unknown => JSON.parse(line));
  const mine = rows.flatMap((row) =>
    typeof row === "object" &&
    row !== null &&
    "id" in row &&
    row.id === BEAD &&
    "title" in row &&
    typeof row.title === "string" &&
    "description" in row &&
    typeof row.description === "string"
      ? [{ title: row.title, description: row.description }]
      : [],
  );
  expect(mine, "the export holds exactly one row for the bead").toHaveLength(1);
  const [row] = mine;
  if (row === undefined) throw new Error("the export holds no row for the bead");
  return row;
}
/** The value of a labelled line of the export description (`LABEL: value`). */
function exportLine(description: string, label: string): string | undefined {
  return description
    .split("\n")
    .find((line) => line.startsWith(`${label}: `))
    ?.slice(label.length + 2);
}
/** The items of the export's ACCEPTANCE list (a single-quoted list; no item holds a single quote). */
function exportItems(description: string): string[] {
  const list = exportLine(description, "ACCEPTANCE") ?? "";
  return [...list.matchAll(/'([^']*)'/g)].map((match) => match[1] ?? "");
}

/** This file's own text: ANCHOR reads its header. */
const CENSUS_TEXT = readFileSync(fileURLToPath(import.meta.url), "utf8");
/** A labelled block of this file's header (ENUMERATION or RESIDUALS), parsed into its entries `ID[ (pins)]: words`, wrapped lines joined by single spaces. */
function headerBlock(label: string): Array<{ readonly id: string; readonly words: string }> {
  const lines = CENSUS_TEXT.slice(0, CENSUS_TEXT.indexOf("*/")).split("\n");
  let at = lines.findIndex((line) => line.startsWith(` * ${label} (`));
  if (at < 0) return [];
  while (at < lines.length && !(lines[at] ?? "").endsWith("):")) at += 1;
  const entries: Array<{ id: string; words: string[] }> = [];
  for (const line of lines.slice(at + 1)) {
    const head = /^ \* {2}([A-Z][A-Z0-9-]*(?: \([A-Z0-9, ]+\))?): (.+)$/.exec(line);
    const more = /^ \* {4}(\S.*)$/.exec(line);
    const last = entries[entries.length - 1];
    if (head?.[1] !== undefined && head[2] !== undefined) entries.push({ id: head[1], words: [head[2]] });
    else if (more?.[1] !== undefined && last !== undefined) last.words.push(more[1]);
    else break;
  }
  return entries.map((entry) => ({ id: entry.id, words: entry.words.join(" ") }));
}

const reached: PinId[] = [];

describe("wb-jwc.7 rf stderr receipt-capture census (until Pi has a committing rf capability)", () => {
  it("T0: the readings are live: the stand-in is the only PATH entry and runs on this node, src holds the surfaces and the worker's embedded source, the receipt lines spell the stderr ids", async () => {
    const files = srcTree();
    expect(files.map((file) => file.path)).toEqual(expect.arrayContaining([PROVIDER, RUNTIME]));
    expect(
      files.filter((file) => /^src\/workflow\/worker-source\.ts#embedded@[0-9]+$/.test(file.path)),
      "the workflow worker's inlined source is read as an embedded module",
    ).toHaveLength(1);
    const probe = await withStandIn("settle", async (rf) => ({
      path: process.env.PATH?.split(delimiter) ?? [],
      dir: rf.dir,
      shebang: readFileSync(join(rf.dir, "rf"), "utf8").split("\n")[0],
    }));
    expect(probe.path, "the stand-in directory is the only PATH entry").toStrictEqual([probe.dir]);
    expect(probe.shebang, "the stand-in runs on this process's node").toBe(`#!${process.execPath}`);
    expect(STDERR_OPERATION, "the stderr receipt id has the shape the provider admits for an operation id").toMatch(/^rfo_[0-9a-z]{22,32}$/);
    expect(rfIdsIn(RECEIPT_LINES.join("\n")), "the receipt lines spell the three stderr ids").toStrictEqual([STDERR_OPERATION, STDERR_RENDER, STDERR_TRANSACTION]);
    expect(RECEIPT_BYTES, "the stderr stimulus is every receipt line, newline-terminated").toBe(Buffer.byteLength(`${RECEIPT_LINES.join("\n")}\n`));
  }, 120_000);

  for (const pin of PINS)
    it(titleOf(pin), async () => {
      expect(await READINGS[pin.reading](), owed(pin)).toStrictEqual(WITNESS[pin.id]);
      reached.push(pin.id);
    }, 180_000);


  for (const item of ENUMERATION)
    it(`${item.id} (${item.pin}, an enumerated surface): its falsifier is caught by the pin's own reader`, async () => {
      expect(await item.falsifier(), `${item.id}: ${item.words}`).toStrictEqual(item.caught);
    }, 120_000);

  it("T2: the src instruments read their controls (the read set, embedded sources, G1's AST locators, the export parsers, the journal readers)", () => {
    const tree = makeScratch("rf-receipt-capture-src-");
    try {
      for (const name of ["a.ts", "b.mts", "c.cjs", "d.d.ts", "e.d.mts", "f.json"]) writeFileSync(join(tree, name), "");
      expect(
        sourceFiles(tree)
          .map((file) => relative(tree, file))
          .sort(),
        "every script file is read; declaration files and data are not",
      ).toStrictEqual(["a.ts", "b.mts", "c.cjs"]);
    } finally {
      removeScratch(tree);
    }
    const embedded = plant("worker.ts", ["export const SOURCE = `", 'const cp = require("node:child_process");', 'cp.spawn("rf", ["context", "render"]);', "`;"]);
    expect(embeddedSources(embedded).map((file) => file.path), "a string that calls require reads as an embedded module").toStrictEqual(["worker.ts#embedded@1"]);
    expect(launchSites(embeddedSources(embedded)), "a launch inside embedded source is a launch").toStrictEqual(["worker.ts#embedded@1:<module>:spawn"]);
    expect(moduleSites(embeddedSources(embedded), CHILD_PROCESS), "an embedded module's child_process load is a module site").toStrictEqual(["worker.ts#embedded@1:<module>:call require:node:child_process"]);
    const changed = { path: PROVIDER, text: readFileSync(join(REPO, PROVIDER), "utf8").replace("},500);", "},5000);") };
    expect(custodyBlock(changed), "a changed escalation reads as a changed block").not.toStrictEqual([...CUSTODY_AT_PIN]);
    const decoy = {
      path: PROVIDER,
      text: readFileSync(join(REPO, PROVIDER), "utf8")
        .replace("    if(reason!==null && stopReason===null) stopReason=reason;", "    if(reason!==null&&stopReason===null) stopReason=reason;")
        .replace("export async function nativeReactiveFiberPreview(", `/*\n${CUSTODY_AT_PIN.join("\n")}\n*/\nexport async function nativeReactiveFiberPreview(`),
    };
    expect(custodyBlock(decoy), "a commented decoy of the pinned text is never the located block").not.toStrictEqual([...CUSTODY_AT_PIN]);
    expect(rangesOf("providers/reactivefiber.ts:1-2,5-9@x")).toStrictEqual([
      [1, 2],
      [5, 9],
    ]);
    expect(killKindsOf("capture before any deadline/overflow/abort kill")).toStrictEqual(["deadline", "overflow", "abort"]);
    const capturedRow: WorkflowJournalEntry = {
      kind: "node",
      index: 0,
      key: "k",
      ok: false,
      capabilityId: "reactivefiber.render.preview",
      effectClass: "write",
      nativeRefs: [{ provider: "reactivefiber", type: "operation", id: STDERR_OPERATION }],
    };
    expect(rowShapes([capturedRow])).toStrictEqual(["settled ok=false effect=write refs=1"]);
    expect(journalRefs([capturedRow])).toStrictEqual([`reactivefiber/operation/${STDERR_OPERATION}`]);
    expect(rfIdsIn(JSON.stringify([capturedRow]))).toStrictEqual([STDERR_OPERATION]);
    expect(rfIdsIn(`exceeded the deadline (${STDERR_RENDER})`)).toStrictEqual([STDERR_RENDER]);
  });


  it("T3: the run-time instruments read their controls (an untouched planted child reads as the reference does; chunk uses from a listener's source)", async () => {
    const clean = await plantedReading(RECEIPT_TEXT, (_child, stderr) => counting(stderr));
    expect(clean.stream, "an untouched child read against the reference shows no difference").toStrictEqual(CLEAN_STREAM);
    expect(clean.seen, "the counting listener counted every receipt byte").toBe(RECEIPT_BYTES);
    expect(runtimeListenerUses("function (chunk) { void chunk.length; return this; }")).toBe("chunk => chunk.length, this");
    expect(difference(["a", "b", "b"], ["b", "c"]), "the difference reader keeps multiplicity").toStrictEqual(["+a", "+b", "-c"]);
  }, 120_000);

  it("RESIDUALS: each named residual's quiet row reads quiet (the escape planted, the pins' readers blind to it)", async () => {
    for (const residual of RESIDUALS) expect(await residual.quiet(), residual.id).toStrictEqual(residual.reads);
  }, 120_000);

  it("ANCHOR: the header's ENUMERATION and RESIDUALS blocks are the tables' claims, entry by entry and word for word", () => {
    expect(headerBlock("ENUMERATION"), "the header's ENUMERATION block").toStrictEqual(ENUMERATION.map((item) => ({ id: item.id, words: item.words })));
    expect(headerBlock("RESIDUALS"), "the header's RESIDUALS block").toStrictEqual(RESIDUALS.map((residual) => ({ id: `${residual.id} (${residual.pins.join(", ")})`, words: residual.words })));
    for (const item of ENUMERATION) expect(item.id.startsWith(`${item.pin}-`), `${item.id} is named for its pin`).toBe(true);
  });

  it("BINDING: each enumerated item's falsifier calls a reader its words' clause names (a falsifier swapped onto another clause's reader reds)", () => {
    for (const item of ENUMERATION) {
      const clause = /^(C1 \([a-z0-9]+\)|G2 \((?:static|run time)\))/.exec(item.words)?.[1] ?? "<no clause>";
      const source = Function.prototype.toString.call(item.falsifier);
      const called = (CLAUSE_READERS[clause] ?? []).filter((reader) => new RegExp(`\\b${reader}\\(`).test(source));
      expect(called, `${item.id}: its falsifier calls none of ${clause}'s readers`).not.toStrictEqual([]);
    }
  });

  it("A1: the export's statement, acceptance and surfaces are this file's; each row's pins are its export item's clauses; G1's ranges, escalation and kills come from the export", () => {
    const row = exportRow();
    expect(row.title.startsWith(`${TITLE_ID} `), "the export title carries the requirement id").toBe(true);
    expect(row.title.endsWith("..."), "the export title truncates the statement").toBe(true);
    expect(STATEMENT.startsWith(row.title.slice(TITLE_ID.length + 1, -3)), "the export title is the statement's opening").toBe(true);
    expect(exportLine(row.description, "STATEMENT"), "the description's STATEMENT line is the statement").toBe(STATEMENT);
    const items = exportItems(row.description);
    expect(items, "the description's ACCEPTANCE list is this file's").toStrictEqual([...ACCEPTANCE]);
    expect(
      ROWS.map((judged) => judged.acceptance),
      "ROWS judge each export item once, in order",
    ).toStrictEqual(items.map((_item, index) => index));
    for (const judged of ROWS)
      expect(
        judged.pins.map((pin) => pin.clause),
        `${judged.id}: its pins are its export item's clauses, in order`,
      ).toStrictEqual(clausesOf(items[judged.acceptance] ?? ""));
    expect(exportLine(row.description, "SURFACES"), "the SURFACES line is this file's").toBe(SURFACES);
    for (const surface of SURFACES.split(", ")) expect(existsSync(join(REPO, surface.replace(/:.*$/, ""))), surface).toBe(true);
    const guard = clauseOf(items[2], 0);
    expect(
      rangesOf(guard).map(([first, last]) => last - first + 1),
      "the guard clause's ranges are the custody block's and the stderr listener's lengths",
    ).toStrictEqual([CUSTODY_AT_PIN.length, STDERR_AT_PIN.length]);
    const statement = exportLine(row.description, "STATEMENT") ?? "";
    expect(escalationOf(statement), "the escalation comes from the export's statement").toBe(ESCALATION_MS);
    expect(killKindsOf(statement), "the kills G1 runs are the export statement's").toStrictEqual(["deadline", "overflow"]);
    const witnessed = WITNESS.G1;
    const kills = witnessed !== null && typeof witnessed === "object" && "kills" in witnessed ? witnessed.kills : undefined;
    expect(Object.keys(kills !== null && typeof kills === "object" ? kills : {}), "G1's witnessed kills are the statement's").toStrictEqual(killKindsOf(statement));
  });

  it("FROZEN SHAPE (standing rule 16): ROWS' ids and pin counts, WITNESS keyed by exactly the pins, every reading pinned exactly once, the enumerated surfaces and their pins, the residuals and their pins", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toStrictEqual(["capture:3", "reconcile:2", "preview-guard:2"]);
    expect(Object.keys(WITNESS)).toStrictEqual(PINS.map((pin) => pin.id));
    expect(PINS.map((pin) => pin.reading)).toStrictEqual(Object.keys(READINGS));
    expect(ENUMERATION.map((item) => `${item.id}:${item.pin}`)).toStrictEqual([
      "C1-LAUNCH-ROUTES:C1",
      "C1-COMMAND-WORDS:C1",
      "C1-INVENTORY:C1",
      "C1-MODULE-BINDINGS:C1",
      "C1-SPECIFIER-TEXT:C1",
      "C1-MODULE-SITES:C1",
      "C1-OPAQUE-LOADS:C1",
      "C1-ARGV-BINDING:C1",
      "C1-ARGV-BUILDER:C1",
      "C1-ARGV-RETURNS:C1",
      "C1-BUILDER-DECLARATIONS:C1",
      "C1-OPTIONS:C1",
      "C1-DECLARATION-REFERENCES:C1",
      "C1-DECLARATION-TEXT:C1",
      "C1-REGISTRATIONS:C1",
      "C1-RUNTIME-ARGV:C1",
      "G2-BINDING-USES:G2",
      "G2-STDIO:G2",
      "G2-CHANNEL-SITES:G2",
      "G2-OPAQUE-LOADS:G2",
      "G2-TRAP:G2",
      "G2-LISTENER-LOG:G2",
      "G2-DATA-LISTENERS:G2",
      "G2-LISTENER-COUNTS:G2",
      "G2-OWN-PROPERTIES:G2",
      "G2-PROTOTYPES:G2",
      "G2-SINKS:G2",
    ]);
    expect(RESIDUALS.map((residual) => `${residual.id}:${residual.pins.join("+")}`)).toStrictEqual([
      "R-OPAQUE-LAUNCHER:C1",
      "R-OPAQUE-LOADER:C1+G2",
      "R-OPAQUE-REGISTRATION:C1",
      "R-PROTOTYPE-PATCH:C1",
      "R-EVALUATED-SOURCE:C1",
      "R-NON-PROCESS:C1",
      "R-STREAM-INTERNALS:G2",
      "R-RECORDER-DETACH:G2",
    ]);
  });

  it("closing: every pin's witness compare ran and held, in ROWS order", () => {
    expect(reached, "a pin whose compare did not run or did not hold").toStrictEqual(PINS.map((pin) => pin.id));
  });
});

