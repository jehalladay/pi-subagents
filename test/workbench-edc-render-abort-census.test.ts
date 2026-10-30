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
 * stand-in left waiting); A5 holds the pass's static reach as its readers parse it (below); A6 is the acceptance's
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
 * A5, THE STATIC REACH, ENUMERATED (cut #4: the enumerate-the-resolvable form R-B95 binds for the static-reach family). A5
 * claims exactly what its readers read on the forms and positions its rosters pin - each roster entry is an executable
 * falsifier A5 runs and holds to what it must read - and fails closed outside them: a position no roster lists still reads
 * (the identifier readers skip only the name and type positions named below, the tracer also a write target and a
 * discarded value), a command, specifier or key that does not resolve reads <expression>, <computed> or <load>, and a
 * form the readers do not parse is R-STATIC-FORMS (Q6), never claimed. The readers:
 *  - the specifier reader (the closure, its I/O builtins, T2's TSX SDK read): every static import and export-from,
 *    import-equals, and every loader call; a specifier that does not resolve reads <expression>.
 *  - the loader reader: import(); a call whose callee is spelled require or getBuiltinModule (a name, a property name or a
 *    literal element name); a createRequire result called directly; and a call of a name that a variable declaration with a
 *    plain name, or a binding assignment (=, ||=, &&=, ??=), binds to a createRequire result. REACH_FORMS' create-require and
 *    <load> forms pin it; a loader reached through any other binding is R-STATIC-FORMS.
 *  - the identifier readers - the I/O-global reader (every reference to an I/O global by name: fetch, XMLHttpRequest,
 *    WebSocket, EventSource, BroadcastChannel, console, localStorage, sessionStorage, require, module, eval, Function; and to
 *    a global object: globalThis, global, self, window, with the member read off it, so an I/O global reached through one,
 *    aliased or computed, reads too), the process reader (every reference to process but an env member read:
 *    getBuiltinModule, binding, dlopen, kill, execve, a stdio write, the object aliased) and the tracer's reference rounds -
 *    read a name in every position but a name slot (a declaration's, a property's or key's, an import or export specifier's,
 *    a label's) and a type (a type node: an annotation, a typeof query, a type alias, a type argument, an implements clause,
 *    an interface's extends, a constraint, an as or satisfies type, an import type, a predicate). A class's extends
 *    expression (a declaration's or an expression's) and an instantiation expression are values, their type arguments types
 *    (TypeScript reads every ExpressionWithTypeArguments as a type node; inType carves those two out). REFERENCE_POSITIONS
 *    pins 102 positions (60 value, 4 discarded, 5 written, 2 export, 16 name, 15 type), each probed with WebSocket,
 *    globalThis, process and a held child_process namespace and held to its kind.
 *  - the child_process tracer, fail-closed: it never drops a held value it does not follow. Its entries are every import,
 *    import-equals and re-export whose specifier names child_process and every loader call whose specifier does (any text
 *    containing "child_process"). It follows each value derived from an entry through parentheses, type wrappers (as,
 *    satisfies, <T>, !, an instantiation expression) and await; member reads (by name, by a key that resolves; a computed key
 *    that does not reads <computed>; a default read is the module itself); declarations and assignments (=, ||=, &&=, ??=) to
 *    a name or to a destructuring pattern at any depth, rest elements included; aliases; and the result of ??, ||, && and a
 *    conditional's arms. A call of a launch member reads its command; an export of a held value reads <re-export>; a value a
 *    statement discards reads nothing and a write target's old value is replaced; every other use - a call of the module or
 *    of another member, an argument, a return, a property store, a class field, a class's extends, an object or array
 *    element, a member path deeper than PATH_DEPTH - reads <reference>; and a string that names child_process outside a
 *    specifier slot (types excepted) reads <untraced>. REACH_FORMS (105 forms) holds every form named here to what it must
 *    read (a launch form its rf or <expression> launch, a fail-closed form its <reference>, <re-export> or <untraced> site,
 *    a computed load its <load>).
 *  - the launch-call reader: every call spelled as a launch call (LAUNCH_CALLS, process.execve included; a name, a property
 *    name or a literal element name, through parentheses and type wrappers, an instantiation expression's included) whose
 *    command resolves.
 *  - resolution (every reader): commands, specifiers and member keys resolve through string literals, the const binding a
 *    name resolves to in its scope (the nearest scope enclosing the reference that binds the name decides; a let, var, using,
 *    parameter, function, class, enum, namespace, import-equals, catch or destructured binding there does not resolve, and
 *    neither does a name nothing in the module binds as a value - a global, or an ES import, which binds only at module
 *    scope where valid code binds no other value of its name; a type-only import binds none), literal indexes into const
 *    array literals and both arms of a conditional, and read <expression> otherwise. REACH_FORMS' scope forms pin every
 *    branch: an outer const read in a function, a block's own const, a for-initializer's const inside its loop and a const
 *    beside a same-named type-only import resolve; a let, var, await using, parameter, catch, function (a block's too),
 *    function or class expression name, class, enum, namespace, import-equals, named, default or namespace import, and
 *    object or array destructured shadow, a const of an unrelated inner scope, a bare block's, a for statement's, a case
 *    block's or a namespace's const read outside it, and a destructured const do not.
 * Read that way, the pass reaches no tool provider, model host or tool SDK native-modules.ts loads, no I/O global, no global
 * object, no process member but env, one I/O builtin (node:child_process, in the render module) and one launch site,
 * spawn("rf"). Src outside anchor: over every tracked src module, every site the two launch readers read (the tracer, and
 * every call spelled as a launch call whose command resolves) is pinned by module, callee and command (srcSites), and exactly
 * one of them launches rf: the render module's spawn. The sites whose command does not resolve are among them (any of them
 * could launch rf), and every loader call in src whose specifier does not resolve is pinned by name (any of them could load
 * child_process).
 *
 * THE UNTIL-THEN TRIGGER (row T), in these homes and forms: T1 no tracked .tsx/.jsx module (either extension in any letter
 * case) anywhere in git's index; T2 no tracked script module outside test/ (a .ts, .mts, .cts, .tsx, .js, .mjs, .cjs or .jsx
 * extension in any letter case; src, qa, examples, the root configs; src read equal to the src walk both ways) names
 * a hook - an identifier of the use-prefixed form (the charter's useProvider, useQuery, useAbsent, useRequirement,
 * useEffect, useCommit fit it) or a use-prefixed word in any string or template part (a key, an argument, prose) - or the
 * charter's descriptor pureProjectRequirement (as an identifier or in any string), or names @reactive-fiber/tsx (as a
 * specifier, A5's specifier reader, or in any string), and neither manifest names that package; T3 neither the descriptors
 * the native and injected registrations register (read at run time) nor any string, template part, identifier or key of a
 * module T2 reads (read statically, so a descriptor registered by a module neither registration wires in reads too) spells
 * either of the title's two interests (evidence requirement, resource interest, joined fold); T4 each reader's own controls.
 * A red row T is the trigger, not a defect.
 *
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
 *
 * MEASURED (by the respin seat ws-04, run g10-work-s143, 2026-10-30, on merge eb0943cc: trunk 37adc54 into cut #3): all 21
 * driven pass/scenario observations read an empty verdict, the 5 settled native renders return the uncommitted form and the
 * 38 committed-form renders (19 forms, two native passes) are refused; each of the 39 controls trips exactly its expected
 * classes and the abandoned stand-in is stopped at teardown; the render closure is 4 src modules and 2 externals with one
 * launch site, no I/O global, no global object and no process member but env; over src the launch readers read 11 sites -
 * one rf site and one child_process site whose command does not resolve (the detached host's spawn of process.execPath) -
 * and one loader call whose specifier does not resolve (the detached host's createRequire result), and 4 stand-ins beside the
 * rf stand-in (cmd, forge, git, sh); each of the 105 REACH_FORMS forms reads what it must and each of the 102
 * REFERENCE_POSITIONS positions reads as its kind says; 0 tracked .tsx/.jsx of 1099 tracked paths; 0 hook names (identifiers
 * or strings) over 198 read modules (117 in src); 0 interest phrases in 8 descriptors and over the 198 read modules.
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
 * notes do not move it) and its three clauses are each served by a row A pin, both ways; row T's label is the title's
 * artifact clause; the scenario kinds are the title's "aborted or suspended" (A1 judges the aborted renders, A2 the
 * suspended), the effect classes A4/A5 judge are its "tool, model or host" (A5 alone judges model), A6 serves the acceptance's
 * third clause, and T3's phrases are its two interests. Outside anchors in src: the contract source states the uncommitted
 * render (A3 judges the settled form); the passes equal the render module's exported functions, both ways; every registered
 * render capability of both registrations is driven; src's only rf launch site is the render module's (both launch
 * readers); the stand-ins are the commands src launches by name; the foreign set is native-modules.ts's dynamic imports. The
 * last case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it) and the pins
 * that reached their witness.
 * NOT CLAIMED (edits of this file and the roster together below row level): a pin removed from ROWS, the literal, IMPL and
 * the roster where no outside anchor names it (A4, T1-T4, Q1-Q7 with their RESIDUALS entry); a constant edited in this file
 * and the roster together (a REACH_FORMS form, a REFERENCE_POSITIONS position, a committed form with its control, or a Q6
 * probe removed from both included);
 * T1's listing narrowed while it still holds REQUIRED_TRACKED and its floor, and T2's read set narrowed while it still holds
 * REQUIRED_READ and its floor; a launch killed before the stand-in's first statement runs (the SIGTERM lands during the
 * interpreter's start) leaves no log line, so the launch ledger reads it as none - the outcome and the at-abort mark still
 * record such a pass.
 * RESIDUALS (named, each with its pinned quiet row): R-INJECTED-RELAY the injected registration relays its reader's
 * envelope without the native admission checks - a reader stating commit_seq 1 is returned unchanged by both injected passes,
 * so the committed-proposal class judges native passes only (Q1); R-STATED-EFFECTS the native admission reads ephemeral,
 * render_id, commit_seq and the store write count, never rf's own result.effects or result.plan statements - a settled
 * native pass whose envelope states an effect and would_commit true is returned (Q2); R-HOOK-VOCABULARY a hook spelled
 * outside the use-prefixed form (as an identifier or as a word in a string), named only in pieces composed at run time, only
 * in a comment or a regular-expression literal, or with a look-alike letter NFKC does not fold; a descriptor describing an
 * interest in other words, only in pieces composed at run time, only in a regular-expression literal or a comment, or with a
 * look-alike letter; or the TSX SDK named only in
 * pieces joined at run time - is not read by T2/T3 (Q3); R-STAND-IN the falsifier drives stand-ins, never the installed rf (its TSX Suspense, abort handling and the
 * cache-plane writes the descriptor discloses are rf's and are not measured here; the rf-preview live tier holds the
 * installed rf to the envelope) - during a pass PATH holds the bench directory alone (Q4); R-HOST-ELSEWHERE the host-write
 * reading fingerprints the bench home only - a write elsewhere (the stand-ins' directory, the host's temp or home
 * directories) reads no violation (Q5); A5 bounds the render closure statically for the forms its readers parse, and
 * R-STATIC-FORMS names the rest; R-STATIC-FORMS the forms A5's readers do not parse (Q6: one probe per form, its reading by
 * every A5 reader pinned, the rf launches read included) - a launch-named call on a value the tracer does not hold whose
 * command does not resolve (pi.exec, a connection's spawn); a launch through a value the module does not bind from
 * child_process (a parameter, a function a call returns); a package's own launcher (read by its specifier alone); a global
 * reached without its name (a constructor chain); a write through the allowed process.env read; a launch whose arguments
 * carry rf through a shell or launcher the readers read by its command alone (sh -c, npx); a launch through another
 * builtin's process or thread API (cluster.fork, a worker_threads Worker); a loader reached through a call the loader reader
 * does not parse (Reflect.apply over require, require.call, module.constructor._load) or through a binding it does not read
 * (an alias of require or getBuiltinModule, a renamed createRequire, a createRequire result held in a property) whose
 * specifier does not resolve (a child_process specifier spelled as a literal still reads <untraced> by the string read); code
 * evaluated at run time from a text that names no child_process (Function, eval, vm, a Worker's eval source); and a
 * process-internal binding (process.binding, _linkedBinding, dlopen) - over src the launch readers and the loader reader read
 * no rf launch for any of them, and inside the render closure the I/O-global and process readers flag the ones that need a
 * global or process (the per-probe counts show which); R-UNREAD-HOMES row T's static readers read every tracked script
 * module outside test/ - test/ (this census's own plants and the vitest timer API's use-prefixed names live there) and
 * paths without a script extension (JSON, YAML, Markdown, an extensionless executable) are not read (Q7 pins the read-home
 * verdict of one probe path per unread home).
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
/** The calls that launch a process, by the name the callee is spelled with. */
const LAUNCH_CALLS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork", "execve"];
/** The name every child_process specifier contains (node:child_process, child_process, and any other spelling of it). */
const CHILD_PROCESS = "child_process";
/** Globals a module can reach the network, the host's stdio or storage, or load code through without an import. */
const IO_GLOBALS = ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "BroadcastChannel", "console", "localStorage", "sessionStorage", "require", "module", "eval", "Function"];
/** The global objects: every reference to one is read, so an I/O global reached through one (aliased or computed) reads too. */
const GLOBAL_OBJECTS = ["globalThis", "global", "self", "window"];
/** The process members a render module may read; every other reference to process (a member or the object) is a host reach. */
const PROCESS_READS = ["env"];
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
/** Q6's probes, one per form A5's readers do not parse (R-STATIC-FORMS); each is read through every A5 reader. */
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
/** A5's form roster: every form A5's child_process tracer is proven on, one probe each, with what it must read - a launch
 * form reads a launch site whose command is rf (or <expression>, a launch whose command does not resolve), a fail-closed form
 * the site it names (a value the tracer does not follow further reads <reference>, an export <re-export>, a child_process
 * name spelled outside a specifier slot <untraced>), a computed load one unresolved loader call (<load>). */
const REACH_FORMS: Readonly<Record<string, { readonly probe: string; readonly reads: string }>> = {
  "named-import": { probe: 'import { spawn } from "node:child_process";\nspawn("rf", []);\n', reads: "rf" },
  "renamed-import": { probe: 'import { spawn as go } from "node:child_process";\ngo("rf", []);\n', reads: "rf" },
  "string-named-import": { probe: 'import { "spawn" as go } from "node:child_process";\ngo("rf", []);\n', reads: "rf" },
  "default-named-import": { probe: 'import { default as cp } from "node:child_process";\ncp.spawn(command, []);\n', reads: "<expression>" },
  "namespace-import": { probe: 'import * as cp from "node:child_process";\ncp.spawn(command, []);\n', reads: "<expression>" },
  "default-import": { probe: 'import cp from "child_process";\ncp.spawn(command, []);\n', reads: "<expression>" },
  "import-equals": { probe: 'import cp = require("child_process");\ncp.spawn(command, []);\n', reads: "<expression>" },
  "require-whole": { probe: 'const cp = require("node:child_process");\ncp.spawn(command, []);\n', reads: "<expression>" },
  "require-destructured": { probe: 'const { spawn: go } = require("node:child_process");\ngo("rf", []);\n', reads: "rf" },
  "require-member-call": { probe: 'require("node:child_process").spawn(command, []);\n', reads: "<expression>" },
  "import-whole": { probe: 'const cp = await import("node:child_process");\ncp.spawn(command, []);\n', reads: "<expression>" },
  "import-destructured": { probe: 'const { spawn: go } = await import("node:child_process");\ngo("rf", []);\n', reads: "rf" },
  "import-nested-destructured": { probe: 'const { default: { spawn: go } } = await import("node:child_process");\ngo("rf", []);\n', reads: "rf" },
  "import-member-bound": { probe: 'const go = (await import("node:child_process")).spawn;\ngo("rf", []);\n', reads: "rf" },
  "import-member-call": { probe: '(await import("node:child_process")).spawn(command, []);\n', reads: "<expression>" },
  "import-default-member": { probe: 'const m = await import("node:child_process");\nm.default.spawn(command, []);\n', reads: "<expression>" },
  "assigned-whole": { probe: 'let cp;\ncp = await import("node:child_process");\ncp.spawn(command, []);\n', reads: "<expression>" },
  "assigned-logical": { probe: 'let cp;\ncp ??= require("node:child_process");\ncp.exec(command);\n', reads: "<expression>" },
  "assigned-destructured": { probe: 'let go;\n({ spawn: go } = await import("node:child_process"));\ngo("rf", []);\n', reads: "rf" },
  "builtin-module": { probe: 'const cp = process.getBuiltinModule("node:child_process");\ncp.spawn(command, []);\n', reads: "<expression>" },
  "create-require-call": { probe: 'import { createRequire } from "node:module";\nconst go = createRequire(import.meta.url)("node:child_process").spawn;\ngo("rf", []);\n', reads: "rf" },
  "create-require-bound": { probe: 'import { createRequire } from "node:module";\nconst load = createRequire(import.meta.url);\nconst { spawn: go } = load("child_process");\ngo("rf", []);\n', reads: "rf" },
  "create-require-assigned": { probe: 'import { createRequire } from "node:module";\nlet load;\nload = createRequire(import.meta.url);\nload("child_process").spawn(command, []);\n', reads: "<expression>" },
  "const-specifier": { probe: 'const CP = "node:child_process";\nconst { spawn: go } = await import(CP);\ngo("rf", []);\n', reads: "rf" },
  alias: { probe: 'import { spawn } from "node:child_process";\nconst go = spawn;\ngo("rf", []);\n', reads: "rf" },
  "alias-destructured": { probe: 'const cp = require("node:child_process");\nconst { spawn: go } = cp;\ngo("rf", []);\n', reads: "rf" },
  "hoisted-alias": { probe: 'import * as cp from "node:child_process";\nexport function later(): void {\n  go("rf", []);\n}\nconst go = cp.spawn;\n', reads: "rf" },
  "self-deepening": { probe: 'let cp = require("node:child_process");\ncp = cp.promises;\n', reads: "<reference>" },
  "rest-destructured": { probe: 'const { ...cp } = await import("node:child_process");\ncp.spawn(command, []);\n', reads: "<expression>" },
  "element-access": { probe: 'import * as cp from "node:child_process";\ncp["spawn"](command, []);\n', reads: "<expression>" },
  "optional-call": { probe: 'import * as cp from "node:child_process";\ncp?.spawn?.(command, []);\n', reads: "<expression>" },
  coalesced: { probe: 'import * as cp from "node:child_process";\nconst go = cp.spawn ?? fallback;\ngo("rf", []);\n', reads: "rf" },
  "conditional-binding": { probe: 'import * as cp from "node:child_process";\nconst go = flag ? cp.spawn : cp.spawnSync;\ngo("rf", []);\n', reads: "rf" },
  "const-command": { probe: 'import { spawn as go } from "node:child_process";\nconst TOOL = "rf";\ngo(TOOL, []);\n', reads: "rf" },
  "indexed-command": { probe: 'import { spawn as go } from "node:child_process";\nconst TOOLS = ["rf"];\ngo(TOOLS[0], []);\n', reads: "rf" },
  "conditional-command": { probe: 'import { spawn as go } from "node:child_process";\ngo(flag ? "rf" : "forge", []);\n', reads: "rf" },
  "process-execve": { probe: 'process.execve("rf", ["rf"]);\n', reads: "rf" },
  "argument-escape": { probe: 'import { spawn } from "node:child_process";\nhand(spawn);\n', reads: "<reference>" },
  returned: { probe: 'export function launcher(): unknown {\n  return require("node:child_process");\n}\n', reads: "<reference>" },
  "stored-property": { probe: 'holder.cp = require("node:child_process");\n', reads: "<reference>" },
  "class-field": { probe: 'export class Holder {\n  cp = require("node:child_process");\n}\n', reads: "<reference>" },
  "then-callback": { probe: 'import("node:child_process").then(cp => cp.spawn(command, []));\n', reads: "<reference>" },
  "call-apply": { probe: 'import { spawn } from "node:child_process";\nspawn.call(undefined, "rf", []);\n', reads: "<reference>" },
  "computed-member": { probe: 'import * as cp from "node:child_process";\ncp[pick()](command, []);\n', reads: "<reference>" },
  "re-export": { probe: 'export { spawn } from "node:child_process";\n', reads: "<re-export>" },
  "re-export-all": { probe: 'export * from "node:child_process";\n', reads: "<re-export>" },
  "exported-binding": { probe: 'export const cp = await import("node:child_process");\n', reads: "<re-export>" },
  "exported-import-equals": { probe: 'export import cp = require("child_process");\n', reads: "<re-export>" },
  "local-export": { probe: 'import { spawn } from "node:child_process";\nexport { spawn as launch };\n', reads: "<re-export>" },
  "default-export": { probe: 'import * as cp from "node:child_process";\nexport default cp;\n', reads: "<re-export>" },
  "untraced-string": { probe: "export const code = 'require(\"child_process\").spawn(\"rf\")';\n", reads: "<untraced>" },
  "unparsed-loader-literal": { probe: 'loader._load("child_process");\n', reads: "<untraced>" },
  "composed-specifier": { probe: `const cp = await import(\`node:\${"child_process"}\`);\n`, reads: "<untraced>" },
  "computed-import": { probe: "const cp = await import(pick());\ncp.spawn(command, []);\n", reads: "<load>" },
  "computed-require": { probe: "const cp = require(name);\n", reads: "<load>" },
  "computed-builtin": { probe: "const cp = process.getBuiltinModule(name);\n", reads: "<load>" },
  "computed-create-require": { probe: 'import { createRequire } from "node:module";\nconst cp = createRequire(import.meta.url)(name);\n', reads: "<load>" },
  "create-require-logical": { probe: 'import { createRequire } from "node:module";\nlet load;\nload ??= createRequire(import.meta.url);\nload(name);\n', reads: "<load>" },
  "create-require-logical-traced": { probe: 'import { createRequire } from "node:module";\nlet load;\nload ||= createRequire(import.meta.url);\nload("node:child_process").spawn(command, []);\n', reads: "<expression>" },
  "heritage-named-import": { probe: 'import { ChildProcess } from "node:child_process";\nexport class Launcher extends ChildProcess {}\n', reads: "<reference>" },
  "heritage-namespace-import": { probe: 'import * as cp from "node:child_process";\nexport class Launcher extends cp.ChildProcess {}\n', reads: "<reference>" },
  "heritage-default-import": { probe: 'import cp from "node:child_process";\nexport class Launcher extends cp.ChildProcess {}\n', reads: "<reference>" },
  "heritage-import-equals": { probe: 'import cp = require("node:child_process");\nexport class Launcher extends cp.ChildProcess {}\n', reads: "<reference>" },
  "heritage-require-bound": { probe: 'const cp = require("node:child_process");\nexport class Launcher extends cp.ChildProcess {}\n', reads: "<reference>" },
  "heritage-import-bound": { probe: 'const cp = await import("node:child_process");\nexport class Launcher extends cp.ChildProcess {}\n', reads: "<reference>" },
  "heritage-builtin-bound": { probe: 'const cp = process.getBuiltinModule("node:child_process");\nexport class Launcher extends cp.ChildProcess {}\n', reads: "<reference>" },
  "heritage-loader-direct": { probe: 'export class Launcher extends require("node:child_process").ChildProcess {}\n', reads: "<reference>" },
  "heritage-class-expression": { probe: 'import { ChildProcess } from "node:child_process";\nexport const Launcher = class extends ChildProcess {};\n', reads: "<reference>" },
  "heritage-mixin-argument": { probe: 'import { ChildProcess } from "node:child_process";\nexport class Launcher extends mix(ChildProcess) {}\n', reads: "<reference>" },
  "heritage-alias": { probe: 'import * as cp from "node:child_process";\nconst Base = cp.ChildProcess;\nexport class Launcher extends Base {}\n', reads: "<reference>" },
  "heritage-untraced-string": { probe: 'export class Launcher extends load("child_process") {}\n', reads: "<untraced>" },
  "instantiation-alias": { probe: 'import { spawn } from "node:child_process";\nconst go = spawn<never>;\ngo("rf", []);\n', reads: "rf" },
  "instantiation-call": { probe: 'import * as cp from "node:child_process";\n(cp.spawn<never>)("rf", []);\n', reads: "rf" },
  "scoped-const-command": { probe: 'import { spawn as go } from "node:child_process";\nconst TOOL = "rf";\nexport function launch(): void {\n  go(TOOL, []);\n}\n', reads: "rf" },
  "block-const-command": { probe: 'import { spawn as go } from "node:child_process";\nconst TOOL = "git";\n{\n  const TOOL = "rf";\n  go(TOOL, []);\n}\n', reads: "rf" },
  "let-command": { probe: 'import { spawn as go } from "node:child_process";\nlet TOOL = "rf";\ngo(TOOL, []);\n', reads: "<expression>" },
  "let-shadow-command": { probe: 'import { spawn as go } from "node:child_process";\nconst TOOL = "git";\nexport function launch(): void {\n  let TOOL = "rf";\n  go(TOOL, []);\n}\n', reads: "<expression>" },
  "parameter-shadow-command": { probe: 'import { spawn as go } from "node:child_process";\nconst TOOL = "git";\nexport function launch(TOOL: string): void {\n  go(TOOL, []);\n}\n', reads: "<expression>" },
  "catch-shadow-command": { probe: 'import { spawn as go } from "node:child_process";\nconst TOOL = "git";\ntry {\n  hand();\n} catch (TOOL) {\n  go(TOOL, []);\n}\n', reads: "<expression>" },
  "var-shadow-command": { probe: 'import { spawn as go } from "node:child_process";\nconst TOOL = "git";\nexport function launch(): void {\n  go(TOOL, []);\n  if (flag) {\n    var TOOL = "rf";\n  }\n}\n', reads: "<expression>" },
  "import-shadow-command": { probe: 'import { spawn as go } from "node:child_process";\nimport { TOOL } from "./tools.js";\nexport function decoy(): string {\n  const TOOL = "git";\n  return TOOL;\n}\ngo(TOOL, []);\n', reads: "<expression>" },
  "inner-const-command": { probe: 'import { spawn as go } from "node:child_process";\nexport function decoy(): string {\n  const TOOL = "git";\n  return TOOL;\n}\ngo(TOOL, []);\n', reads: "<expression>" },
  "await-using-command": { probe: "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport async function launch(): Promise<void> {\n  await using TOOL = \"rf\";\n  go(TOOL, []);\n}\n", reads: "<expression>" },
  "function-shadow-command": { probe: "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(): void {\n  function TOOL(): string {\n    return \"rf\";\n  }\n  go(TOOL, []);\n}\n", reads: "<expression>" },
  "block-function-shadow-command": { probe: "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(): void {\n  go(TOOL, []);\n  {\n    function TOOL(): string {\n      return \"rf\";\n    }\n  }\n}\n", reads: "<expression>" },
  "function-name-shadow-command": { probe: "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport const launch = function TOOL(): void {\n  go(TOOL, []);\n};\n", reads: "<expression>" },
  "class-name-shadow-command": { probe: "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport const Launcher = class TOOL {\n  static run(): void {\n    go(TOOL, []);\n  }\n};\n", reads: "<expression>" },
  "class-shadow-command": { probe: "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(): void {\n  class TOOL {}\n  go(TOOL, []);\n}\n", reads: "<expression>" },
  "enum-shadow-command": { probe: "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(): void {\n  enum TOOL {\n    Rf,\n  }\n  go(TOOL, []);\n}\n", reads: "<expression>" },
  "namespace-shadow-command": { probe: "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nnamespace Outer {\n  namespace TOOL {\n    export const value = 1;\n  }\n  go(TOOL, []);\n}\n", reads: "<expression>" },
  "import-equals-shadow-command": { probe: "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nnamespace Outer {\n  import TOOL = Other.Tool;\n  go(TOOL, []);\n}\n", reads: "<expression>" },
  "default-import-shadow-command": { probe: "import { spawn as go } from \"node:child_process\";\nimport TOOL from \"./tools.js\";\nexport function decoy(): string {\n  const TOOL = \"git\";\n  return TOOL;\n}\ngo(TOOL, []);\n", reads: "<expression>" },
  "namespace-import-shadow-command": { probe: "import { spawn as go } from \"node:child_process\";\nimport * as TOOL from \"./tools.js\";\nexport function decoy(): string {\n  const TOOL = \"git\";\n  return TOOL;\n}\ngo(TOOL, []);\n", reads: "<expression>" },
  "object-destructured-shadow-command": { probe: "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(source: { TOOL: string }): void {\n  const { TOOL } = source;\n  go(TOOL, []);\n}\n", reads: "<expression>" },
  "array-destructured-shadow-command": { probe: "import { spawn as go } from \"node:child_process\";\nconst TOOL = \"git\";\nexport function launch(list: string[]): void {\n  const [TOOL] = list;\n  go(TOOL, []);\n}\n", reads: "<expression>" },
  "for-const-scope-command": { probe: "import { spawn as go } from \"node:child_process\";\nfor (const TOOL = \"git\"; flag; ) hand(TOOL);\ngo(TOOL, []);\n", reads: "<expression>" },
  "case-const-scope-command": { probe: "import { spawn as go } from \"node:child_process\";\nswitch (flag) {\n  case 1:\n    const TOOL = \"git\";\n    hand(TOOL);\n}\ngo(TOOL, []);\n", reads: "<expression>" },
  "namespace-const-scope-command": { probe: "import { spawn as go } from \"node:child_process\";\nnamespace Holder {\n  const TOOL = \"git\";\n  hand(TOOL);\n}\ngo(TOOL, []);\n", reads: "<expression>" },
  "instantiation-named-launch": { probe: "(pi.exec<never>)(\"rf\", []);\n", reads: "rf" },
  "block-const-scope-command": { probe: "import { spawn as go } from \"node:child_process\";\n{\n  const TOOL = \"git\";\n  hand(TOOL);\n}\ngo(TOOL, []);\n", reads: "<expression>" },
  "type-import-const-command": { probe: "import { spawn as go } from \"node:child_process\";\nimport type { TOOL } from \"./tools.js\";\nconst TOOL = \"rf\";\ngo(TOOL, []);\n", reads: "rf" },
  "for-const-command": { probe: "import { spawn as go } from \"node:child_process\";\nfor (const TOOL = \"rf\"; flag; ) go(TOOL, []);\n", reads: "rf" },
  "destructured-const-command": { probe: 'import { spawn as go } from "node:child_process";\nconst { TOOL } = { TOOL: "rf" };\ngo(TOOL, []);\n', reads: "<expression>" },
  "inner-const-specifier": { probe: 'export function decoy(): string {\n  const CP = "node:fs";\n  return CP;\n}\nconst m = await import(CP);\nm.spawn(command, []);\n', reads: "<load>" },
  "let-shadow-specifier": { probe: 'export function decoy(): string {\n  const CP = "node:fs";\n  return CP;\n}\nlet CP = ["node:child", "process"].join("_");\nconst m = await import(CP);\nm.spawn(command, []);\n', reads: "<load>" },
};
/** A5's position roster: every position a name can take in a module, one probe each with HELD for the name, and what kind
 * of position it is. The identifier readers are probed with HELD as an I/O global (WebSocket) and as a global object
 * (globalThis) through the I/O-global reader, as process through the process reader, and as a namespace binding of
 * child_process (import * as cp) through the tracer. A value position evaluates the name at run time: every identifier
 * reader reads it, the tracer as at least one site. A discarded value (a statement's, void's, a comma's left operand) and a
 * written one (an assignment's, a destructuring's, a for-of's or an increment's target) are read by the I/O-global and
 * process readers and not by the tracer (it reads nothing for a value a statement discards, and a target's old value is
 * replaced). A local export reads only for the tracer (<re-export>; a module exports its own bindings, never a global). A
 * name (a declaration's, a property's, a key's, an import or export specifier's, a label's) and a type (erased before run
 * time: an annotation, a typeof query, an implements clause, an interface's extends, a heritage or call type argument, a
 * constraint, an as or satisfies type, an import type, a predicate) are read by none. */
const REFERENCE_POSITIONS: Readonly<Record<string, { readonly probe: string; readonly kind: "value" | "discarded" | "written" | "export" | "name" | "type" }>> = {
  argument: { probe: "hand(HELD);\n", kind: "value" },
  callee: { probe: "hand(HELD());\n", kind: "value" },
  "optional-callee": { probe: "hand(HELD?.());\n", kind: "value" },
  "new-callee": { probe: "hand(new HELD());\n", kind: "value" },
  "member-base": { probe: "hand(HELD.member);\n", kind: "value" },
  "optional-member-base": { probe: "hand(HELD?.member);\n", kind: "value" },
  "element-base": { probe: 'hand(HELD["member"]);\n', kind: "value" },
  "element-key": { probe: "hand(other[HELD]);\n", kind: "value" },
  "tagged-template": { probe: "hand(HELD`text`);\n", kind: "value" },
  "template-span": { probe: `hand(\`text \${HELD}\`);\n`, kind: "value" },
  return: { probe: "export function read(): unknown {\n  return HELD;\n}\n", kind: "value" },
  "arrow-body": { probe: "export const read = (): unknown => HELD;\n", kind: "value" },
  "property-value": { probe: "hand({ key: HELD });\n", kind: "value" },
  "shorthand-property": { probe: "hand({ HELD });\n", kind: "value" },
  "computed-key": { probe: "hand({ [HELD]: 1 });\n", kind: "value" },
  "spread-element": { probe: "hand([...HELD]);\n", kind: "value" },
  "spread-property": { probe: "hand({ ...HELD });\n", kind: "value" },
  "array-element": { probe: "hand([HELD]);\n", kind: "value" },
  "default-parameter": { probe: "export function read(value = HELD): unknown {\n  return value;\n}\n", kind: "value" },
  "binding-default": { probe: "const { value = HELD } = hand();\nhand(value);\n", kind: "value" },
  "class-field": { probe: "export class Holder {\n  field = HELD;\n}\n", kind: "value" },
  "static-field": { probe: "export class Holder {\n  static field = HELD;\n}\n", kind: "value" },
  "computed-member": { probe: "export class Holder {\n  [HELD](): void {}\n}\n", kind: "value" },
  decorator: { probe: "@HELD\nexport class Holder {}\n", kind: "value" },
  "class-extends": { probe: "export class Holder extends HELD {}\n", kind: "value" },
  "class-extends-member": { probe: "export class Holder extends HELD.Base {}\n", kind: "value" },
  "class-extends-call": { probe: "export class Holder extends hand(HELD) {}\n", kind: "value" },
  "class-expression-extends": { probe: "export const Holder = class extends HELD {};\n", kind: "value" },
  instantiation: { probe: "hand(HELD<string>);\n", kind: "value" },
  "alias-declaration": { probe: "const alias = HELD;\nhand(alias);\n", kind: "value" },
  "alias-assignment": { probe: "let alias;\nalias = HELD;\nhand(alias);\n", kind: "value" },
  "destructured-alias": { probe: "const { member: alias } = HELD;\nhand(alias);\n", kind: "value" },
  "property-store": { probe: "holder.value = HELD;\n", kind: "value" },
  "typeof-expression": { probe: "hand(typeof HELD);\n", kind: "value" },
  unary: { probe: "hand(!HELD);\n", kind: "value" },
  binary: { probe: "hand(HELD + 1);\n", kind: "value" },
  equality: { probe: "hand(HELD === other);\n", kind: "value" },
  "in-operand": { probe: 'hand("member" in HELD);\n', kind: "value" },
  "instanceof-operand": { probe: "hand(other instanceof HELD);\n", kind: "value" },
  nullish: { probe: "hand(HELD ?? other);\n", kind: "value" },
  logical: { probe: "hand(HELD || other);\n", kind: "value" },
  "conditional-arm": { probe: "hand(flag ? HELD : other);\n", kind: "value" },
  condition: { probe: "if (HELD) hand();\n", kind: "value" },
  parenthesized: { probe: "hand((HELD));\n", kind: "value" },
  "as-expression": { probe: "hand(HELD as unknown);\n", kind: "value" },
  "satisfies-expression": { probe: "hand(HELD satisfies unknown);\n", kind: "value" },
  "non-null": { probe: "hand(HELD!);\n", kind: "value" },
  "type-assertion": { probe: "hand(<unknown>HELD);\n", kind: "value" },
  await: { probe: "hand(await HELD);\n", kind: "value" },
  "comma-right": { probe: "hand((0, HELD));\n", kind: "value" },
  throw: { probe: "throw HELD;\n", kind: "value" },
  "for-of": { probe: "for (const item of HELD) hand(item);\n", kind: "value" },
  "for-in": { probe: "for (const key in HELD) hand(key);\n", kind: "value" },
  switch: { probe: "switch (HELD) {\n  default:\n    hand();\n}\n", kind: "value" },
  case: { probe: "switch (other) {\n  case HELD:\n    hand();\n}\n", kind: "value" },
  yield: { probe: "export function* read(): Generator<unknown> {\n  yield HELD;\n}\n", kind: "value" },
  "export-default": { probe: "export default HELD;\n", kind: "value" },
  "export-assignment": { probe: "export = HELD;\n", kind: "value" },
  "enum-initializer": { probe: "enum Holder {\n  Member = HELD,\n}\nhand(Holder);\n", kind: "value" },
  delete: { probe: "hand(delete HELD.member);\n", kind: "value" },
  statement: { probe: "HELD;\n", kind: "discarded" },
  "member-statement": { probe: "HELD.member;\n", kind: "discarded" },
  void: { probe: "hand(void HELD);\n", kind: "discarded" },
  "comma-left": { probe: "hand((HELD, 0));\n", kind: "discarded" },
  "assignment-target": { probe: "HELD = other;\n", kind: "written" },
  "compound-target": { probe: "HELD += 1;\n", kind: "written" },
  increment: { probe: "HELD++;\n", kind: "written" },
  "destructuring-target": { probe: "[HELD] = list;\n", kind: "written" },
  "for-of-target": { probe: "for (HELD of list) hand();\n", kind: "written" },
  "local-export": { probe: "export { HELD };\n", kind: "export" },
  "local-export-alias": { probe: "export { HELD as alias };\n", kind: "export" },
  "property-name": { probe: "hand(other.HELD);\n", kind: "name" },
  key: { probe: "hand({ HELD: 1 });\n", kind: "name" },
  "method-name": { probe: "export class Holder {\n  HELD(): void {}\n}\n", kind: "name" },
  "field-name": { probe: "export class Holder {\n  HELD = 1;\n}\n", kind: "name" },
  declaration: { probe: "const HELD = 1;\n", kind: "name" },
  "function-name": { probe: "export function HELD(): void {}\n", kind: "name" },
  "class-name": { probe: "export class HELD {}\n", kind: "name" },
  parameter: { probe: "export function read(HELD: unknown): void {}\n", kind: "name" },
  "binding-name": { probe: "const { HELD } = other;\n", kind: "name" },
  "binding-key": { probe: "const { HELD: alias } = other;\n", kind: "name" },
  "import-name": { probe: 'import { HELD } from "other";\n', kind: "name" },
  label: { probe: "HELD: for (;;) break HELD;\n", kind: "name" },
  "enum-member-name": { probe: "enum Holder {\n  HELD = 1,\n}\n", kind: "name" },
  "qualified-right": { probe: "import alias = Outer.HELD;\n", kind: "name" },
  "export-alias-name": { probe: "export { other as HELD };\n", kind: "name" },
  "namespace-export": { probe: 'export * as HELD from "other";\n', kind: "name" },
  annotation: { probe: "let value: HELD;\n", kind: "type" },
  "typeof-query": { probe: "let value: typeof HELD;\n", kind: "type" },
  "type-alias": { probe: "type Shape = HELD;\n", kind: "type" },
  "type-argument": { probe: "hand<HELD>(other);\n", kind: "type" },
  "instantiation-argument": { probe: "hand(other<HELD>);\n", kind: "type" },
  implements: { probe: "export class Holder implements HELD {}\n", kind: "type" },
  "interface-extends": { probe: "interface Shape extends HELD {}\n", kind: "type" },
  "heritage-type-argument": { probe: "export class Holder extends Base<typeof HELD> {}\n", kind: "type" },
  constraint: { probe: "export function read<T extends HELD>(): void {}\n", kind: "type" },
  "as-type": { probe: "hand(other as HELD);\n", kind: "type" },
  "satisfies-type": { probe: "hand(other satisfies HELD);\n", kind: "type" },
  "type-literal-key": { probe: "type Shape = { [HELD]: number };\n", kind: "type" },
  "import-type": { probe: 'let value: import("other").HELD;\n', kind: "type" },
  predicate: { probe: "export function check(value: unknown): value is HELD {\n  return true;\n}\n", kind: "type" },
  "type-only-import": { probe: 'import type { HELD } from "other";\n', kind: "type" },
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

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
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
function scriptKind(path: string): ts.ScriptKind {
  if (/\.tsx$/i.test(path)) return ts.ScriptKind.TSX;
  if (/\.jsx$/i.test(path)) return ts.ScriptKind.JSX;
  if (/\.[cm]?js$/i.test(path)) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}
const parsed = new Map<string, ts.SourceFile>();
function parse(path: string, text?: string): ts.SourceFile {
  if (text !== undefined) return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKind(path));
  const cached = parsed.get(path);
  if (cached !== undefined) return cached;
  const source = ts.createSourceFile(path, readFileSync(join(REPO, path), "utf8"), ts.ScriptTarget.Latest, true, scriptKind(path));
  parsed.set(path, source);
  return source;
}
function visit(node: ts.Node, each: (node: ts.Node) => void): void {
  each(node);
  ts.forEachChild(node, child => visit(child, each));
}
/** An instantiation expression (`spawn<T>`): an ExpressionWithTypeArguments outside a heritage clause - its value is its
 * expression's. */
function isInstantiation(node: ts.Node): node is ts.ExpressionWithTypeArguments {
  return ts.isExpressionWithTypeArguments(node) && !ts.isHeritageClause(node.parent);
}
/** An expression without its parentheses and type wrappers (as, satisfies, <T>, !, an instantiation expression's type
 * arguments). */
function unwrap(expression: ts.Expression): ts.Expression {
  let node = expression;
  while (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node) || isInstantiation(node)) {
    node = node.expression;
  }
  return node;
}
/** A value binding of a name and the scope it binds the name in; only a const binding carries its initializer (the only kind
 * a command or specifier resolves through). Every other binding - let, var, using, a parameter, a function, a class, an
 * enum, a namespace, an import-equals, a catch variable, a destructured element, an ambient const - carries none. An ES
 * import is not recorded: it binds only at module scope, where valid code binds no other value of its name, so a name it
 * binds reads as no binding (unresolved), and a type-only import binds no value at all. */
interface Declared {
  readonly scope: ts.Node;
  readonly initializer: ts.Expression | undefined;
}
/** A block-scoped binding's scope: the nearest block, module, case block, for statement, static block or function. */
function blockScope(node: ts.Node): ts.Node {
  let at = node.parent;
  while (
    !(ts.isBlock(at) || ts.isSourceFile(at) || ts.isModuleBlock(at) || ts.isCaseBlock(at) || ts.isForStatement(at) || ts.isForInStatement(at) || ts.isForOfStatement(at) || ts.isClassStaticBlockDeclaration(at) || ts.isFunctionLike(at))
  ) {
    at = at.parent;
  }
  return at;
}
/** A var's (and a sloppy function declaration's) scope: the nearest function, static block, namespace body or module. */
function functionScope(node: ts.Node): ts.Node {
  let at = node.parent;
  while (!(ts.isSourceFile(at) || ts.isModuleBlock(at) || ts.isFunctionLike(at) || ts.isClassStaticBlockDeclaration(at))) at = at.parent;
  return at;
}
const declaredIn = new WeakMap<ts.SourceFile, ReadonlyMap<string, readonly Declared[]>>();
/** Every value binding of one module, by name (computed once per source). */
function declarations(source: ts.SourceFile): ReadonlyMap<string, readonly Declared[]> {
  const cached = declaredIn.get(source);
  if (cached !== undefined) return cached;
  const found = new Map<string, Declared[]>();
  const declare = (name: ts.Node | undefined, scope: ts.Node, initializer?: ts.Expression): void => {
    if (name === undefined) return;
    if (ts.isIdentifier(name)) {
      found.set(name.text, [...(found.get(name.text) ?? []), { scope, initializer }]);
    } else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
      for (const element of name.elements) if (ts.isBindingElement(element)) declare(element.name, scope);
    }
  };
  visit(source, node => {
    if (ts.isVariableDeclaration(node)) {
      if (ts.isCatchClause(node.parent)) {
        declare(node.name, node.parent);
      } else if (ts.isVariableDeclarationList(node.parent)) {
        const blockScoped = node.parent.flags & ts.NodeFlags.BlockScoped;
        const constant = blockScoped === ts.NodeFlags.Const && ts.isIdentifier(node.name) ? node.initializer : undefined;
        declare(node.name, blockScoped === 0 ? functionScope(node.parent) : blockScope(node.parent), constant);
      }
    } else if (ts.isParameter(node)) {
      declare(node.name, node.parent);
    } else if (ts.isFunctionDeclaration(node)) {
      declare(node.name, blockScope(node));
      declare(node.name, functionScope(node));
    } else if (ts.isFunctionExpression(node) || ts.isClassExpression(node)) {
      declare(node.name, node);
    } else if (ts.isClassDeclaration(node) || ts.isEnumDeclaration(node) || ts.isModuleDeclaration(node) || ts.isImportEqualsDeclaration(node)) {
      declare(node.name, blockScope(node));
    }
  });
  declaredIn.set(source, found);
  return found;
}
/** The const initializers a referenced name resolves to: the nearest scope enclosing the reference that binds the name
 * decides; undefined when a binding there is not a const with an initializer, or when nothing in the module binds the name
 * (a global). */
function resolvedInitializers(source: ts.SourceFile, reference: ts.Identifier): ts.Expression[] | undefined {
  const declared = declarations(source).get(reference.text) ?? [];
  for (let at: ts.Node = reference.parent; ; at = at.parent) {
    const here = declared.filter(entry => entry.scope === at);
    if (here.length > 0) return here.every(entry => entry.initializer !== undefined) ? here.flatMap(entry => (entry.initializer === undefined ? [] : [entry.initializer])) : undefined;
    if (ts.isSourceFile(at)) return undefined;
  }
}
/** The union of candidate lists (sorted), or undefined when there is none or any list is undefined. */
function union(lists: readonly (readonly string[] | undefined)[]): string[] | undefined {
  if (lists.length === 0 || lists.some(list => list === undefined)) return undefined;
  return [...new Set(lists.flatMap(list => list ?? []))].sort();
}
const RESOLVE_DEPTH = 8;
/** The literal values an expression can take, read through string literals, the const binding a name resolves to in its
 * scope (resolvedInitializers), literal indexes into const array literals and both arms of a conditional; undefined when any
 * part does not resolve. */
function resolveTexts(source: ts.SourceFile, expression: ts.Expression, depth = 0): string[] | undefined {
  if (depth > RESOLVE_DEPTH) return undefined;
  const node = unwrap(expression);
  if (ts.isStringLiteralLike(node)) return [node.text];
  if (ts.isConditionalExpression(node)) return union([resolveTexts(source, node.whenTrue, depth + 1), resolveTexts(source, node.whenFalse, depth + 1)]);
  if (ts.isIdentifier(node)) {
    const initializers = resolvedInitializers(source, node);
    return initializers === undefined ? undefined : union(initializers.map(initializer => resolveTexts(source, initializer, depth + 1)));
  }
  if (ts.isElementAccessExpression(node)) {
    const index = unwrap(node.argumentExpression);
    if (!ts.isNumericLiteral(index)) return undefined;
    const arrays = resolveArrays(source, node.expression, depth + 1);
    return arrays === undefined ? undefined : union(arrays.map(items => items[Number(index.text)]));
  }
  return undefined;
}
/** The candidate element lists of an array-valued expression: array literals without spreads, const bindings, both arms of
 * a conditional; undefined otherwise. */
function resolveArrays(source: ts.SourceFile, expression: ts.Expression, depth: number): (string[] | undefined)[][] | undefined {
  if (depth > RESOLVE_DEPTH) return undefined;
  const node = unwrap(expression);
  let arms: ((string[] | undefined)[][] | undefined)[];
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.some(element => ts.isSpreadElement(element)) ? undefined : [node.elements.map(element => resolveTexts(source, element, depth + 1))];
  } else if (ts.isConditionalExpression(node)) {
    arms = [resolveArrays(source, node.whenTrue, depth + 1), resolveArrays(source, node.whenFalse, depth + 1)];
  } else if (ts.isIdentifier(node)) {
    const initializers = resolvedInitializers(source, node);
    if (initializers === undefined) return undefined;
    arms = initializers.map(initializer => resolveArrays(source, initializer, depth + 1));
  } else {
    return undefined;
  }
  return arms.length === 0 || arms.some(arm => arm === undefined) ? undefined : arms.flatMap(arm => arm ?? []);
}
/** The name a call's callee is spelled with: an identifier, a property name or a literal element name; undefined otherwise. */
function calleeName(call: ts.CallExpression): string | undefined {
  const callee = unwrap(call.expression);
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  if (ts.isElementAccessExpression(callee) && ts.isStringLiteralLike(callee.argumentExpression)) return callee.argumentExpression.text;
  return undefined;
}
/** The calls that load a module or a builtin by specifier besides import(): require (module.require too) and getBuiltinModule
 * by the name the callee is spelled with, and a loader factory's result (createRequire) - called directly, or through a name a
 * declaration binds it to. */
const LOADER_CALLS = ["require", "getBuiltinModule"];
const LOADER_FACTORIES = ["createRequire"];
const loaderNamesOf = new WeakMap<ts.SourceFile, ReadonlySet<string>>();
/** The names one module binds a loader factory's result to, by a variable declaration with a plain name or a binding
 * assignment (`const load = createRequire(...)`; `load = ...`, `load ||= ...`, `load &&= ...`, `load ??= ...`). */
function loaderNames(source: ts.SourceFile): ReadonlySet<string> {
  const cached = loaderNamesOf.get(source);
  if (cached !== undefined) return cached;
  const names = new Set<string>();
  const factory = (expression: ts.Expression): boolean => {
    const value = unwrap(expression);
    return ts.isCallExpression(value) && LOADER_FACTORIES.includes(calleeName(value) ?? "");
  };
  visit(source, node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && factory(node.initializer)) names.add(node.name.text);
    const assigned = ts.isBinaryExpression(node) && BINDING_ASSIGNMENTS.includes(node.operatorToken.kind) ? unwrap(node.left) : undefined;
    if (ts.isBinaryExpression(node) && assigned !== undefined && ts.isIdentifier(assigned) && factory(node.right)) names.add(assigned.text);
  });
  loaderNamesOf.set(source, names);
  return names;
}
function isLoaderCall(node: ts.Node, source: ts.SourceFile): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) return false;
  if (node.expression.kind === ts.SyntaxKind.ImportKeyword || LOADER_CALLS.includes(calleeName(node) ?? "")) return true;
  const callee = unwrap(node.expression);
  return (ts.isCallExpression(callee) && LOADER_FACTORIES.includes(calleeName(callee) ?? "")) || (ts.isIdentifier(callee) && loaderNames(source).has(callee.text));
}
/** Every module specifier a source names: static imports and exports, import-equals, and every loader call (import(),
 * require(), getBuiltinModule(), a createRequire result) - its argument read through resolveTexts, <expression> when it does
 * not resolve. */
function specifiers(source: ts.SourceFile): string[] {
  const found: string[] = [];
  visit(source, node => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
      found.push(node.moduleSpecifier.text);
    } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression)) {
      found.push(node.moduleReference.expression.text);
    } else if (isLoaderCall(node, source)) {
      const first = node.arguments[0];
      found.push(...((first === undefined ? undefined : resolveTexts(source, first)) ?? ["<expression>"]));
    }
  });
  return found;
}
/** Whether an identifier sits in a name slot (a declaration's, a property's, an import or export specifier's or a label's
 * name), not a value reference. */
function isNameSlot(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.name === node;
  if (ts.isQualifiedName(parent)) return parent.right === node;
  if (ts.isBindingElement(parent)) return parent.name === node || parent.propertyName === node;
  if (ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent) || ts.isNamespaceExport(parent)) return true;
  if (ts.isLabeledStatement(parent) || ts.isBreakOrContinueStatement(parent)) return true;
  if (
    ts.isImportEqualsDeclaration(parent) ||
    ts.isVariableDeclaration(parent) ||
    ts.isFunctionDeclaration(parent) ||
    ts.isFunctionExpression(parent) ||
    ts.isClassDeclaration(parent) ||
    ts.isClassExpression(parent) ||
    ts.isParameter(parent) ||
    ts.isMethodDeclaration(parent) ||
    ts.isPropertyDeclaration(parent) ||
    ts.isPropertyAssignment(parent) ||
    ts.isPropertySignature(parent) ||
    ts.isMethodSignature(parent) ||
    ts.isGetAccessorDeclaration(parent) ||
    ts.isSetAccessorDeclaration(parent) ||
    ts.isEnumMember(parent) ||
    ts.isEnumDeclaration(parent) ||
    ts.isTypeAliasDeclaration(parent) ||
    ts.isInterfaceDeclaration(parent) ||
    ts.isModuleDeclaration(parent) ||
    ts.isTypeParameterDeclaration(parent)
  ) {
    return parent.name === node;
  }
  return false;
}
/** Whether an ExpressionWithTypeArguments evaluates its expression at run time: a class's extends clause (a declaration's
 * or an expression's) and an instantiation expression do; an implements clause and an interface's extends clause are types
 * (TypeScript reads every ExpressionWithTypeArguments as a type node). */
function evaluatesExpression(node: ts.ExpressionWithTypeArguments): boolean {
  const clause = node.parent;
  if (!ts.isHeritageClause(clause)) return true;
  return clause.token === ts.SyntaxKind.ExtendsKeyword && (ts.isClassDeclaration(clause.parent) || ts.isClassExpression(clause.parent));
}
/** Whether a node sits inside a type (a type reference, a typeof query, a type argument, an implements clause, an
 * interface's extends): it reaches nothing at run time. A class's extends expression and an instantiation expression are
 * values; their type arguments stay types (each is a type node of its own, met first on the way up). */
function inType(node: ts.Node): boolean {
  for (let at: ts.Node | undefined = node.parent; at !== undefined && !ts.isSourceFile(at); at = at.parent) {
    if (ts.isExpressionWithTypeArguments(at) && evaluatesExpression(at)) continue;
    if (ts.isTypeNode(at)) return true;
    if (ts.isStatement(at)) return false;
  }
  return false;
}
/** The member read off an object identifier (".name", "[name]" or "[<computed>]"), or "" when no member is read off it. */
function memberRead(node: ts.Identifier): string {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.expression === node) return `.${parent.name.text}`;
  if (ts.isElementAccessExpression(parent) && parent.expression === node) {
    return ts.isStringLiteralLike(parent.argumentExpression) ? `[${parent.argumentExpression.text}]` : "[<computed>]";
  }
  return "";
}
/** A relative specifier resolved to the src module it names (.js read as its .ts source); undefined for a package. */
function resolveModule(from: string, specifier: string): string | undefined {
  if (!specifier.startsWith(".")) return undefined;
  return posix.normalize(posix.join(posix.dirname(from), specifier)).replace(/\.js$/, ".ts");
}
function isBuiltin(specifier: string): boolean {
  const bare = specifier.startsWith("node:") ? specifier.slice(5) : specifier;
  return builtinModules.includes(bare);
}
/** The module closure of `entry`: every src module it reaches through any import edge, and every package it names. */
function closure(entry: string): { modules: string[]; externals: string[] } {
  const modules = new Set<string>();
  const externals = new Set<string>();
  const queue = [entry];
  for (let module = queue.shift(); module !== undefined; module = queue.shift()) {
    if (modules.has(module)) continue;
    modules.add(module);
    for (const specifier of specifiers(parse(module))) {
      const target = resolveModule(module, specifier);
      if (target === undefined) externals.add(specifier);
      else queue.push(target);
    }
  }
  return { modules: [...modules].sort(), externals: [...externals].sort() };
}
interface LaunchSite {
  readonly module: string;
  readonly callee: string;
  readonly command: string;
}
/** A launch site and the position it was read at (positions dedupe the two readers; no witness carries them). */
interface Located {
  readonly at: number;
  readonly site: LaunchSite;
}
/** Calls whose callee (an identifier, a property or a literal element name) is spelled as a launch call and whose command
 * resolves (resolveTexts; candidates joined by "|"). A call whose command does not resolve is not read here (R-STATIC-FORMS:
 * regex .exec calls share the name); the child_process reader reads those when they go through a binding. */
function launchSitesAt(module: string, source: ts.SourceFile = parse(module)): Located[] {
  const found: Located[] = [];
  visit(source, node => {
    if (!ts.isCallExpression(node)) return;
    const callee = calleeName(node);
    if (callee === undefined || !LAUNCH_CALLS.includes(callee)) return;
    const first = node.arguments[0];
    const commands = first === undefined ? undefined : resolveTexts(source, first);
    if (commands !== undefined) found.push({ at: node.getStart(source), site: { module, callee, command: commands.join("|") } });
  });
  return found;
}
function launchSites(module: string, source?: ts.SourceFile): LaunchSite[] {
  return launchSitesAt(module, source).map(entry => entry.site);
}
/** A child_process value's member path below the module object: [] is the module itself (a namespace, a default import, a
 * loader's result), ["spawn"] its spawn member. */
type MemberPath = readonly string[];
/** A member path longer than this reads <reference>: a value the tracer does not follow further. */
const PATH_DEPTH = 3;
/** The tracer's rounds over a module's references (aliases bind new names); a module still binding after them reads
 * <reference> at its start. */
const TRACE_ROUNDS = 16;
/** A member read off a value at `path` (the default export of a builtin module is the module itself). */
function memberOf(path: MemberPath, member: string): MemberPath {
  return path.length === 0 && member === "default" ? path : [...path, member];
}
function pathLabel(path: MemberPath): string {
  return path.length === 0 ? "<module>" : path.join(".");
}
/** The member an element access names: a key that resolves to one text (resolveTexts), <computed> otherwise. */
function elementKey(source: ts.SourceFile, argument: ts.Expression): string {
  const texts = resolveTexts(source, argument);
  return texts !== undefined && texts.length === 1 && texts[0] !== undefined ? texts[0] : "<computed>";
}
/** The member a written property name or binding key names. */
function propertyKey(source: ts.SourceFile, name: ts.PropertyName): string {
  if (ts.isComputedPropertyName(name)) return elementKey(source, name.expression);
  return ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name) ? name.text : "<computed>";
}
/** The assignments that hand their right side to their target, and the operators whose result may be either operand. */
const BINDING_ASSIGNMENTS: readonly ts.SyntaxKind[] = [ts.SyntaxKind.EqualsToken, ts.SyntaxKind.BarBarEqualsToken, ts.SyntaxKind.AmpersandAmpersandEqualsToken, ts.SyntaxKind.QuestionQuestionEqualsToken];
const EITHER_OPERAND: readonly ts.SyntaxKind[] = [ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.BarBarToken, ts.SyntaxKind.AmpersandAmpersandToken];
/** Whether an expression is written, not read: an assignment's target, an element of a destructuring assignment's target, a
 * for-in/for-of target or an increment's operand. */
function isWriteTarget(node: ts.Node): boolean {
  let at: ts.Node = node;
  let parent: ts.Node | undefined = node.parent;
  while (parent !== undefined) {
    if (ts.isParenthesizedExpression(parent) || ts.isArrayLiteralExpression(parent) || ts.isObjectLiteralExpression(parent) || ts.isSpreadAssignment(parent) || ts.isSpreadElement(parent)) {
      // the element of a literal that may itself be a destructuring target: keep climbing
    } else if (ts.isPropertyAssignment(parent)) {
      if (parent.initializer !== at) return false;
    } else if (ts.isShorthandPropertyAssignment(parent)) {
      if (parent.name !== at) return false;
    } else if (ts.isBinaryExpression(parent)) {
      const kind = parent.operatorToken.kind;
      return parent.left === at && kind >= ts.SyntaxKind.FirstAssignment && kind <= ts.SyntaxKind.LastAssignment;
    } else if (ts.isForInStatement(parent) || ts.isForOfStatement(parent)) {
      return parent.initializer === at;
    } else if (ts.isPrefixUnaryExpression(parent) || ts.isPostfixUnaryExpression(parent)) {
      return parent.operator === ts.SyntaxKind.PlusPlusToken || parent.operator === ts.SyntaxKind.MinusMinusToken;
    } else {
      return false;
    }
    at = parent;
    parent = parent.parent;
  }
  return false;
}
function exportedNode(node: ts.Node): boolean {
  return ts.canHaveModifiers(node) && (ts.getModifiers(node)?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false);
}
/** The child_process tracer over one module (fail-closed: it never drops a value it does not follow). Entries: every import,
 * import-equals and re-export whose specifier names child_process, and every loader call (isLoaderCall) whose specifier does
 * (resolveTexts; any text containing CHILD_PROCESS). Each value derived from an entry is followed through parentheses, type
 * wrappers and await; member reads (by name, by a key that resolves, <computed> otherwise; a default read is the module
 * itself); declarations and assignments (=, ||=, &&=, ??=) to a name or to a destructuring pattern at any depth (rest
 * included); aliases (a held name assigned or declared again); and the result of ??, ||, && and a conditional's arms. A call
 * of a launch member (LAUNCH_CALLS) reads its command (resolveTexts; <expression> otherwise); a value a statement discards
 * reads nothing; an export of a held value reads <re-export>; every other use - a call of the module or of another member, an
 * argument, a return, a property store, a class field, an object or array element, a path deeper than PATH_DEPTH - reads
 * <reference>. A string that names child_process outside a specifier slot (types excepted) reads <untraced>. Name slots,
 * write targets and types are not references. */
function childProcessLaunchesAt(module: string, source: ts.SourceFile = parse(module)): Located[] {
  const found = new Map<string, Located>();
  const add = (node: ts.Node, callee: string, command: string): void => {
    const at = node.getStart(source);
    const key = `${at}:${callee}:${command}`;
    if (!found.has(key)) found.set(key, { at, site: { module, callee, command } });
  };
  const bindings = new Map<string, Map<string, MemberPath>>();
  let grew = false;
  const bind = (name: string, path: MemberPath): void => {
    const paths = bindings.get(name) ?? new Map<string, MemberPath>();
    const key = JSON.stringify(path);
    if (paths.has(key)) return;
    paths.set(key, path);
    bindings.set(name, paths);
    grew = true;
  };
  const bindName = (name: ts.BindingName, path: MemberPath): void => {
    if (ts.isIdentifier(name)) {
      bind(name.text, path);
    } else if (ts.isObjectBindingPattern(name)) {
      for (const element of name.elements) {
        const key = element.propertyName !== undefined ? propertyKey(source, element.propertyName) : ts.isIdentifier(element.name) ? element.name.text : "<computed>";
        bindName(element.name, element.dotDotDotToken !== undefined ? path : memberOf(path, key));
      }
    } else {
      name.elements.forEach((element, index) => {
        if (ts.isBindingElement(element)) bindName(element.name, memberOf(path, element.dotDotDotToken !== undefined ? "[...]" : `[${index}]`));
      });
    }
  };
  const bindTarget = (target: ts.Expression, path: MemberPath): void => {
    const node = unwrap(target);
    if (ts.isIdentifier(node)) {
      bind(node.text, path);
    } else if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) bindTarget(property.initializer, memberOf(path, propertyKey(source, property.name)));
        else if (ts.isShorthandPropertyAssignment(property)) bind(property.name.text, memberOf(path, property.name.text));
        else if (ts.isSpreadAssignment(property)) bindTarget(property.expression, path);
        else add(property, pathLabel(path), "<reference>");
      }
    } else if (ts.isArrayLiteralExpression(node)) {
      node.elements.forEach((element, index) => {
        if (ts.isSpreadElement(element)) bindTarget(element.expression, memberOf(path, "[...]"));
        else if (!ts.isOmittedExpression(element)) bindTarget(element, memberOf(path, `[${index}]`));
      });
    } else if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      bindTarget(node.left, path);
    } else {
      // a property store (this.cp = ..., holder.cp = ...): the tracer does not follow the value there
      add(node, pathLabel(path), "<reference>");
    }
  };
  const consume = (value: ts.Expression, path: MemberPath): void => {
    if (path.length > PATH_DEPTH) {
      add(value, pathLabel(path), "<reference>");
      return;
    }
    let at: ts.Expression = value;
    for (;;) {
      const wrapper = at.parent;
      const wraps =
        (ts.isParenthesizedExpression(wrapper) ||
          ts.isAsExpression(wrapper) ||
          ts.isSatisfiesExpression(wrapper) ||
          ts.isTypeAssertionExpression(wrapper) ||
          ts.isNonNullExpression(wrapper) ||
          ts.isAwaitExpression(wrapper) ||
          isInstantiation(wrapper)) &&
        wrapper.expression === at;
      if (!wraps) break;
      at = wrapper;
    }
    const parent = at.parent;
    if (ts.isPropertyAccessExpression(parent) && parent.expression === at) {
      consume(parent, memberOf(path, parent.name.text));
    } else if (ts.isElementAccessExpression(parent) && parent.expression === at) {
      consume(parent, memberOf(path, elementKey(source, parent.argumentExpression)));
    } else if (ts.isCallExpression(parent) && parent.expression === at) {
      const member = path.length === 1 ? path[0] : undefined;
      const first = parent.arguments[0];
      if (member !== undefined && LAUNCH_CALLS.includes(member)) add(parent, member, (first === undefined ? undefined : resolveTexts(source, first))?.join("|") ?? "<expression>");
      else add(parent, pathLabel(path), "<reference>");
    } else if (ts.isVariableDeclaration(parent) && parent.initializer === at) {
      bindName(parent.name, path);
      if (exportedNode(parent.parent.parent)) add(parent, pathLabel(path), "<re-export>");
    } else if (ts.isBinaryExpression(parent) && parent.right === at && BINDING_ASSIGNMENTS.includes(parent.operatorToken.kind)) {
      bindTarget(parent.left, path);
      consume(parent, path);
    } else if (ts.isBinaryExpression(parent) && (EITHER_OPERAND.includes(parent.operatorToken.kind) || (parent.operatorToken.kind === ts.SyntaxKind.CommaToken && parent.right === at))) {
      consume(parent, path);
    } else if (ts.isConditionalExpression(parent) && parent.condition !== at) {
      consume(parent, path);
    } else if (ts.isExportAssignment(parent)) {
      add(parent, pathLabel(path), "<re-export>");
    } else if (!(ts.isExpressionStatement(parent) || ts.isVoidExpression(parent) || (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.CommaToken))) {
      add(at, pathLabel(path), "<reference>");
    }
  };
  const names = (expression: ts.Expression | undefined): boolean => expression !== undefined && (resolveTexts(source, expression) ?? []).some(text => text.includes(CHILD_PROCESS));
  const specifierSlot = (node: ts.Node): boolean => {
    const parent = node.parent;
    return (
      ((ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) && parent.moduleSpecifier === node) ||
      (ts.isExternalModuleReference(parent) && parent.expression === node) ||
      (ts.isModuleDeclaration(parent) && parent.name === node) ||
      (ts.isCallExpression(parent) && parent.arguments[0] === node && isLoaderCall(parent, source))
    );
  };
  visit(source, node => {
    if (ts.isImportDeclaration(node) && names(node.moduleSpecifier) && node.importClause !== undefined && !node.importClause.isTypeOnly) {
      const clause = node.importClause;
      if (clause.name !== undefined) bind(clause.name.text, []);
      const imported = clause.namedBindings;
      if (imported !== undefined && ts.isNamespaceImport(imported)) bind(imported.name.text, []);
      if (imported !== undefined && ts.isNamedImports(imported)) {
        for (const element of imported.elements) if (!element.isTypeOnly) bind(element.name.text, memberOf([], (element.propertyName ?? element.name).text));
      }
    } else if (ts.isImportEqualsDeclaration(node) && !node.isTypeOnly && ts.isExternalModuleReference(node.moduleReference) && names(node.moduleReference.expression)) {
      bind(node.name.text, []);
      if (exportedNode(node)) add(node, "<module>", "<re-export>");
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && names(node.moduleSpecifier)) {
      const clause = node.exportClause;
      const exported = clause !== undefined && ts.isNamedExports(clause) ? clause.elements.map(element => (element.propertyName ?? element.name).text) : ["*"];
      for (const name of exported) add(node, name, "<re-export>");
    } else if (isLoaderCall(node, source) && names(node.arguments[0])) {
      consume(node, []);
    } else if (
      (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) &&
      node.text.includes(CHILD_PROCESS) &&
      !specifierSlot(node) &&
      !inType(node)
    ) {
      add(node, "<string>", "<untraced>");
    }
  });
  for (let round = 0; ; round += 1) {
    if (round === TRACE_ROUNDS) {
      add(source, "<module>", "<reference>");
      break;
    }
    grew = false;
    visit(source, node => {
      if (!ts.isIdentifier(node) || isNameSlot(node) || inType(node) || isWriteTarget(node)) return;
      // A snapshot of the name's paths: a binding this reference adds is read in the next round, so each round deepens a
      // path by at most one step and TRACE_ROUNDS bounds the tracer whatever PATH_DEPTH is.
      for (const path of [...(bindings.get(node.text)?.values() ?? [])]) consume(node, path);
    });
    if (!grew) break;
  }
  visit(source, node => {
    if (!ts.isExportSpecifier(node) || node.parent.parent.moduleSpecifier !== undefined) return;
    const local = node.propertyName ?? node.name;
    if (!ts.isIdentifier(local)) return;
    for (const path of bindings.get(local.text)?.values() ?? []) add(node, pathLabel(path), "<re-export>");
  });
  return [...found.values()].sort((a, b) => a.at - b.at);
}
function childProcessLaunches(module: string, source?: ts.SourceFile): LaunchSite[] {
  return childProcessLaunchesAt(module, source).map(entry => entry.site);
}
/** A loader call as spelled: import(), require(), getBuiltinModule(), a createRequire result called directly or by name. */
function loaderLabel(call: ts.CallExpression): string {
  if (call.expression.kind === ts.SyntaxKind.ImportKeyword) return "import()";
  const callee = unwrap(call.expression);
  return ts.isCallExpression(callee) ? `${calleeName(callee) ?? "<call>"}()()` : `${calleeName(call) ?? "<call>"}()`;
}
/** Every loader call in one module whose specifier does not resolve (any of them could load child_process). */
function unresolvedLoads(module: string, source: ts.SourceFile = parse(module)): string[] {
  const found: string[] = [];
  visit(source, node => {
    if (!isLoaderCall(node, source)) return;
    const first = node.arguments[0];
    if (first === undefined || resolveTexts(source, first) === undefined) found.push(`${module}:${loaderLabel(node)}`);
  });
  return found;
}
/** Every launch site both readers read in one module, one per call (the child_process reader's reading first). */
function launchUnion(module: string, source: ts.SourceFile = parse(module)): LaunchSite[] {
  const byCall = new Map<string, LaunchSite>();
  for (const entry of [...childProcessLaunchesAt(module, source), ...launchSitesAt(module, source)]) {
    const key = `${entry.at}:${entry.site.callee}`;
    if (!byCall.has(key)) byCall.set(key, entry.site);
  }
  return [...byCall.values()];
}
let srcSitesCache: LaunchSite[] | undefined;
/** launchUnion over every tracked src module. */
function srcLaunchSites(): LaunchSite[] {
  srcSitesCache ??= trackedScriptModules().flatMap(module => launchUnion(module));
  return srcSitesCache;
}
let foreignCache: string[] | undefined;
/** The commands src launches by name other than rf - every resolved command (each candidate) of srcLaunchSites: the
 * stand-ins beside the stand-in rf. */
function foreignCommands(): string[] {
  foreignCache ??= [...new Set(srcLaunchSites().flatMap(site => site.command.split("|")))].filter(command => command !== "rf" && /^[a-z][a-z0-9-]*$/.test(command)).sort();
  return foreignCache;
}
/** References to an I/O global by name, and every reference to a global object (with the member read off it): name slots
 * and types are not references. */
function ioGlobalReferences(module: string, source: ts.SourceFile = parse(module)): string[] {
  const found: string[] = [];
  visit(source, node => {
    if (!ts.isIdentifier(node) || isNameSlot(node) || inType(node)) return;
    if (IO_GLOBALS.includes(node.text)) found.push(`${module}:${node.text}`);
    else if (GLOBAL_OBJECTS.includes(node.text)) found.push(`${module}:${node.text}${memberRead(node)}`);
  });
  return found;
}
/** Every reference to process other than a PROCESS_READS member read: getBuiltinModule, binding, dlopen, kill, a stdio
 * write, the object aliased or passed on. */
function processReferences(module: string, source: ts.SourceFile = parse(module)): string[] {
  const found: string[] = [];
  visit(source, node => {
    if (!ts.isIdentifier(node) || node.text !== "process" || isNameSlot(node) || inType(node)) return;
    const member = memberRead(node);
    if (!PROCESS_READS.some(read => member === `.${read}` || member === `[${read}]`)) found.push(`${module}:process${member}`);
  });
  return found;
}
type PositionKind = (typeof REFERENCE_POSITIONS)[string]["kind"];
interface PositionReading {
  readonly io: string[];
  readonly global: string[];
  readonly process: string[];
  readonly tracer: string[];
}
/** One position probe through the identifier readers: the I/O-global reader with HELD as WebSocket and as globalThis, the
 * process reader with HELD as process, the tracer with HELD as a namespace binding of child_process. */
function positionReading(position: string, probe: string): PositionReading {
  const module = `positions/${position}.ts`;
  const held = (name: string, prefix = ""): ts.SourceFile => parse(module, `${prefix}${probe.replaceAll("HELD", name)}`);
  const named = (readings: readonly string[]): string[] => readings.map(reading => reading.slice(module.length + 1));
  return {
    io: named(ioGlobalReferences(module, held("WebSocket"))),
    global: named(ioGlobalReferences(module, held("globalThis"))),
    process: named(processReferences(module, held("process"))),
    tracer: childProcessLaunches(module, held("cp", 'import * as cp from "node:child_process";\n')).map(site => `${site.callee} ${site.command}`),
  };
}
/** Whether a position's readings are what its kind says (REFERENCE_POSITIONS). */
function positionAsKind(entry: PositionReading & { readonly kind: PositionKind }): boolean {
  const identifier = entry.kind === "value" || entry.kind === "discarded" || entry.kind === "written" ? 1 : 0;
  const traced = entry.kind === "value" || entry.kind === "export";
  return entry.io.length === identifier && entry.global.length === identifier && entry.process.length === identifier && entry.tracer.length > 0 === traced;
}
type SourceOf = (module: string) => ts.SourceFile;
interface ReachReading {
  readonly launches: LaunchSite[];
  readonly namedLaunches: LaunchSite[];
  readonly union: LaunchSite[];
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
    launches: each(childProcessLaunches),
    namedLaunches: each(launchSites),
    union: each(launchUnion),
    specifiers: each((_module, source) => specifiers(source)),
    ioBuiltins: each((module, source) =>
      specifiers(source)
        .filter(specifier => isBuiltin(specifier) && IO_BUILTINS.includes(specifier.replace(/^node:/, "")))
        .map(specifier => `${module}:${specifier}`),
    ),
    ioGlobals: each(ioGlobalReferences),
    processReach: each(processReferences),
  };
}
/** The tool providers, model host and tool SDK native-modules.ts loads besides the render module, and the packages they import. */
function foreignSet(): { modules: string[]; externals: string[] } {
  const loaded = specifiers(parse(NATIVE_LOADER)).filter(specifier => {
    const source = parse(NATIVE_LOADER);
    let dynamic = false;
    visit(source, node => {
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        const first = node.arguments[0];
        if (first !== undefined && ts.isStringLiteralLike(first) && first.text === specifier) dynamic = true;
      }
    });
    return dynamic;
  });
  const modules = loaded.map(specifier => resolveModule(NATIVE_LOADER, specifier)).filter((module): module is string => module !== undefined && module !== RENDER_MODULE);
  const externals = new Set(loaded.filter(specifier => resolveModule(NATIVE_LOADER, specifier) === undefined));
  for (const module of modules) for (const specifier of specifiers(parse(module))) if (resolveModule(module, specifier) === undefined && !isBuiltin(specifier)) externals.add(specifier);
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
  visit(source, node => {
    if (ts.isIdentifier(node) && (HOOK_NAME.test(node.text) || node.text === DESCRIPTOR_NAME)) found.push(`${module}:${node.text}`);
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      const word = HOOK_WORD.exec(node.text)?.[1];
      if (word !== undefined) found.push(`${module}:string ${word}`);
      if (node.text.includes(DESCRIPTOR_NAME)) found.push(`${module}:string ${DESCRIPTOR_NAME}`);
      if (node.text.includes(TSX_SDK)) found.push(`${module}:string ${TSX_SDK}`);
    }
  });
  for (const specifier of specifiers(source)) if (specifier === TSX_SDK || specifier.startsWith(`${TSX_SDK}/`)) found.push(`${module}:import ${specifier}`);
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
  visit(source, node => {
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
    const unresolvedInSrc = trackedScriptModules().flatMap(module => childProcessLaunches(module).filter(site => site.command.startsWith("<")));
    const unresolvedLoadsInSrc = trackedScriptModules().flatMap(module => unresolvedLoads(module));
    // The form roster: each form's probe through both launch readers and the loader reader, held to what it must read.
    const forms = Object.entries(REACH_FORMS).map(([form, { probe, reads }]) => {
      const module = `forms/${form}.ts`;
      const source = parse(module, probe);
      return { form, reads, sites: launchUnion(module, source), loads: unresolvedLoads(module, source) };
    });
    expect(
      forms
        .filter(({ reads, sites, loads }) =>
          reads === "<load>" ? loads.length === 0 : !sites.some(site => (reads === "rf" ? site.command.split("|").includes("rf") : site.command === reads)),
        )
        .map(({ form, reads }) => `${form} (reads ${reads})`),
      "A5's tracer reads every form of its roster (REACH_FORMS)",
    ).toEqual([]);
    const positions = Object.entries(REFERENCE_POSITIONS).map(([position, { probe, kind }]) => ({ position, kind, ...positionReading(position, probe) }));
    expect(
      positions.filter(entry => !positionAsKind(entry)).map(({ position, kind }) => `${position} (${kind})`),
      "A5's identifier readers read every position of their roster as its kind says (REFERENCE_POSITIONS)",
    ).toEqual([]);
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
      forms: forms.map(({ form, sites, loads }) =>
        [`${form}:`, ...sites.map(site => `${site.callee} ${site.command}`), ...loads.map(load => `load ${load.slice(load.indexOf(":") + 1)}`)].join(" "),
      ),
      positions: positions.map(
        ({ position, kind, io, global, process, tracer }) =>
          `${position} (${kind}): io ${io.join("; ") || "none"}, global ${global.join("; ") || "none"}, process ${process.join("; ") || "none"}, tracer ${tracer.join("; ") || "none"}`,
      ),
      controls,
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
          specifiers: specifiers(source).length,
          childProcess: childProcessLaunches(module, source).length,
          launchSites: launchSites(module, source).length,
          loads: unresolvedLoads(module, source).length,
          ioGlobals: ioGlobalReferences(module, source).length,
          processReach: processReferences(module, source).length,
          rf: launchUnion(module, source).filter(site => site.command.split("|").includes("rf")).length,
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
        launchCalls: LAUNCH_CALLS,
        childProcess: CHILD_PROCESS,
        loaderCalls: LOADER_CALLS,
        loaderFactories: LOADER_FACTORIES,
        resolveDepth: RESOLVE_DEPTH,
        pathDepth: PATH_DEPTH,
        traceRounds: TRACE_ROUNDS,
        ioGlobals: IO_GLOBALS,
        globalObjects: GLOBAL_OBJECTS,
        processReads: PROCESS_READS,
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
        reachForms: REACH_FORMS,
        referencePositions: REFERENCE_POSITIONS,
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
