/**
 * wb-u62: the shared title-census FLOOR helper (owner program ruling 2026-10-16 12:22Z; one helper,
 * never N per-census scanners - 15 scanner variants are 15 divergence surfaces, the GATE-STEER1 class).
 *
 * A census pins named test cases and docs sections and must go red, naming the pin and the cause,
 * when a pinned case would no longer EXIST, RUN where its tier label says, or ASSERT (the three legs).
 * "Closed" (owner ruling on the 6ze.38 verdict): a pin counts only when it is COLLECTED EXACTLY ONCE (an
 * it.each / it.for pin: once per table row, table non-empty) and its RESULT IS PASSED under the claimed tier
 * ENTRYPOINT. Two modes read that, by the owner's three-stage ruling on the u62 gate-1 verdict (2026-10-16 16:12Z:
 * R1 = (b) as the architecture, (a) as the hardening):
 *
 * - REPORT MODE, the default-tier judgment: judge(reportPath, pins) reads vitest's own JSON report of the tier's run
 *   (per-file assertionResults: title, ancestorTitles, status, location) and NEVER re-executes it. The run judged is
 *   the gate's own run, so nothing the judged code can observe tells the judge from the gate (the fabricated-green
 *   class G29, closed by construction). The default tier's report is DEFAULT_TIER_REPORT, written by the gate's own test
 *   step (wb-nl8); a live tier is judged only over ITS OWN report by a census leg inside that tier (R2 = (i)). The report
 *   must carry task locations (includeTaskLocation): the runner-located call site anchors the AST legs. What the report
 *   cannot carry, report mode reads from the source and fails closed on: the fails inversion (an inverted case is
 *   recorded as passed) and the third leg (no runtime assertion count, so an exit reachable before the first assertion
 *   reddens, a break out of a labeled block included). A pinned file changed after the report, or a report that records
 *   the judging file itself, is refused. THE ROSTER MODEL (owner acceptance criterion, 2026-10-17, binding from
 *   respin-4; it replaces the respin-3 "closed by construction" claim, which the gate-2 battery measured false): the
 *   report model resolves a value flow ONLY through the RESOLVABLE-CONSTRUCT ROSTER shipped below (ROSTER, exported as
 *   RESOLVABLE_CONSTRUCTS: per row an id, its flow, the construct it resolves and the guard that keeps it from
 *   fabricating green). Every step of a flow must match a roster row, or the flow is unresolved and the pin red, naming
 *   the step (options-unknown / context-unknown / no-assertion): fail-closed. Every ok verdict names the rows it
 *   resolved through (PinVerdict.through), so a resolution outside the roster is visible - and, by the criterion, a
 *   defect. The three flows are what the roster rows resolve, not properties claimed of the code:
 *   (1) REGISTRATION (report mode; the registration.* / api-use.* / options.* rows): a chain resolves only through links
 *       vitest's own API defines - a root that IS vitest's it / test / describe / suite or one of its hooks (a named or
 *       namespace import, import.meta.vitest, a global, a const alias of a resolved chain, a relative module's export
 *       of one) and members its runtime objects carry (REGISTRATION_MEMBERS, pinned against the installed vitest). The
 *       inversion is read only for a case chain resolving to it / test, through no fixture method and no suite factory
 *       that takes the test API, every enclosing body running WHERE IT IS WRITTEN inside a callback a resolved
 *       describe / suite holds, with same-file const options read through read positions only, in a file whose
 *       registration API - over its whole relative import closure - stands in api-use positions and defines no fixtures
 *       (registration.integrity: test.override / scoped give a plain case an auto fixture, respin-4 X22 / X22b).
 *       Anything else is options-unknown, naming the link it could not resolve.
 *   (2) CONTEXT (both modes; the context.* rows): the test context - the case's context parameter, every parameter of
 *       every vitest hook of the pin's own chain or placed where the census cannot bound it (afterEach / afterAll
 *       included: vitest reads fails after them), and every parameter of a handler registered through onTestFailed /
 *       onTestFinished that the walk reaches - is followed with all runner state reached through it until it provably
 *       stops being runner state; a write through it, a check that may call an argument with it, or a use the walk
 *       cannot follow is context-unknown, and so is a runner binding (getCurrentTest / getCurrentSuite / TestRunner)
 *       anywhere but called on the spot in a case body's or suite factory's own synchronous code. vitest flips fails
 *       after the last hook and handler, and its main process syncs only a task's result and meta (vitest 4.1.10,
 *       measured), so neither the JSON report nor the reporter's task sees such a write: executing mode reads it from
 *       the source too (the R2 runtime read of the final task.fails is infeasible there - TestCase.task is not public
 *       and never carries the write; respin-4 measured X15-X19 ok in BOTH modes on d9e0b26).
 *   (3) ASSERTION (both modes; the assertion.* rows): third-leg evidence is an assertion vitest builds and checks -
 *       expect(x) / expect.soft(x) / expect.poll(fn) (ctx.expect and a namespace's included) whose first call is a
 *       matcher, an assert call, or a member of expect that fails the case when reached (FAILING_MEMBERS: unreachable,
 *       fail) - read through handles nothing in the import closure redefines (assertion.handle-integrity: no
 *       expect.extend / addEqualityTesters / addSnapshotSerializer / chai.use, no handle member written, no constructor /
 *       __proto__ / prototype read - the Assertion class whose matchers chai overwrites, respin-4 X21 - no vi.mock of an
 *       assertion or runner module); any other static expect member (getState, assertions ...), a bare expect(x) and
 *       a member every object or function carries (toString, bind, call ...) assert nothing.
 *   MEASURED, NOT PROVEN: what the roster is known to refuse is its measured probe set, re-run on the delivered bytes in
 *   BOTH modes - the gate-3 battery (sixteen shapes), the gate-2 battery (38 shapes) and the respin-4 seat's own (S1-S16,
 *   X1-X19, X21, X22, X22b), every one a row of test/workbench-census-helper.test.ts; its ROSTER_JUSTIFICATION table
 *   names, per roster row, the falsifier rows that would fabricate green through it and go red instead. A shape
 *   outside that set is refused only as far as the guards of the roster rows reach.
 *   NAMED RESIDUALS - what the roster does NOT cover, so no census may claim it; each MEASURED (a probe ran the shape on
 *   these bytes) or UNMEASURED (named, never run):
 *   - C1, sibling cases (MEASURED, both modes ok on the inverted pin): another case's own code reaching the pin's task
 *     through the task tree - its context's task.suite.tasks (gate-2 c1), or getCurrentTest().suite called on the spot
 *     in its body (respin-4 X20).
 *   - package modules (UNMEASURED): a package's top-level code run by an import, and the API or a hook reached inside
 *     it. Its relative twin - a relative module's top-level code reached by a side-effect import (R1) - is closed:
 *     integrity and the hook walk read the whole relative import closure (rows r-u62g2r3-r1-side-effect-mutation and
 *     r-u62r4-s16-side-effect-hook, measured red both modes).
 *   - setup files, globalSetup and config (UNMEASURED), and a custom matcher, tester or serializer registered there or in
 *     a package (UNMEASURED; inside the import closure they are refused, X8 measured).
 *   - the global object (UNMEASURED; this repository runs globals: false): the API or a hook reached through
 *     globalThis or vi.stubGlobal.
 *   - vitest internals beyond the public routes (UNMEASURED): chai's assertion flags (an expect(x) object carries its
 *     test), the worker-state global, dynamic code (eval, new Function), asymmetric matchers' prototypes.
 *   - the called-helper rule (assertion.called-helper, E9 sharpened): a called same-file function's assertion counts as
 *     reached, a generator's only once it is iterated (E9, measured red); the strict reading does not follow a called
 *     helper's own branches or awaits, an invoked callback's or a loop body's (UNMEASURED beyond their rows).
 *   Each fail-closed rule's cost on test/** is measured on the respin record (the trunk judge), never assumed.
 * - EXECUTING MODE, for fixtures and non-default tiers only (never the default tier once wb-nl8 lands): judgePins
 *   EXECUTES each claimed tier's real command - the forge.toml step through its npm script, with setupFiles /
 *   globalSetup, testNamePattern, include/exclude and every CLI flag as the gate runs them (owner ruling on the 6hb.7
 *   verdict) - with the census reporter, --includeTaskLocation and --expect.requireAssertions appended. The judged code's
 *   environment is the gate's: the helper adds NO name to it (the report path and the recursion guard travel on the
 *   run's command line) and strips only what vitest itself sets in a worker, so every operator name, VITEST_MAX_WORKERS
 *   included, passes through (J1-J4).
 *   NAMED RESIDUAL (executing mode): a judge that re-executes stays detectable through channels other than the
 *   environment - the parent-process argv (the per-run census reporter on the vitest command line, the very word the
 *   recursion guard reads), timing, and the narrowed file set. That is why executing mode is never the default-tier
 *   judgment: full closure is report mode, judging the gate's own run.
 * - inner legs (both modes; keep-or-match floors): a parse-aware TypeScript AST scan of the case the RUNNER located
 *   (its reported line:column, never a title search) - a reachable test-context skip or runner-state write in the case
 *   body or in a vitest hook of the pin's own enclosing call chain (never file-wide); the runner's public current-test
 *   routes (getCurrentTest / getCurrentSuite from vitest/suite or @vitest/runner, TestRunner from vitest) read as context
 *   references, fail-closed (J5, the test.extend precedent), and refused file-wide wherever they are not placed
 *   (context.runner-placed); fail-closed on context uses it cannot follow; and a bare expect(x) with no matcher, which
 *   the runtime assertion count accepts.
 * - docs: sections from the RENDERED view (marked's lexer, resolved through the pinned @earendil-works/pi-tui
 *   devDependency): unique heading, bounded at the next level-1/2 heading or EOF, bound to its normative parent heading
 *   path (D9), refusing an HTML comment or code fence inside the section that spans a heading boundary (D10). Adopt with
 *   sectionMatches - exact equality of the whole rendered block list, HTML-free (D1-D3); an html block exposes no
 *   rendered text, only its raw source (the D2 footgun).
 *
 * Fail-closed throughout: an unreadable or unparseable file or report, a run error, a tier command outside the
 * modelled grammar or an unanalysable case body is a red verdict naming its cause, never a pass.
 */

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { expect } from "vitest";

/** The forge.toml command the complete gate runs for vitest (forge.toml [build] gate must list it). */
export const DEFAULT_GATE_TIER = "test";
/**
 * The default tier's report (the wb-nl8 interface, bound on the u62 respin spec): the gate's own test step writes
 * vitest's JSON report here, and every default-gate census judges it with judge() - never by executing the tier again.
 */
export const DEFAULT_TIER_REPORT = ".forge/vitest-report.json";


export interface CasePin {
  /** Repository-relative test file. */
  readonly file: string;
  /** The case title exactly as registered (TestCase.name); for an it.each / it.for pin, the literal template. */
  readonly title: string;
  /** Optional exact enclosing describe path, outermost first. */
  readonly suite?: readonly string[];
  /** The forge.toml command whose run must execute the case: DEFAULT_GATE_TIER or a tier such as "native-read". */
  readonly tier: string;
  /**
   * Marks an it.each / it.for template pin: its call site must register each table row exactly once, at least
   * max(1, minCases) of them, and every one must pass.
   */
  readonly each?: { readonly minCases: number };
}

export type CensusLeg = "exists" | "runs-where" | "asserts";
export type CensusCode =
  | "ok"
  | "unreadable"
  | "unparseable"
  | "nested-run"
  | "run-error"
  | "collection-error"
  | "tier-unresolved"
  | "not-collected"
  | "also-default-gate"
  | "absent"
  | "duplicated"
  | "skipped"
  | "inverted"
  | "each-empty"
  | "unmapped-location"
  | "body-unresolved"
  | "context-skip"
  | "context-unknown"
  | "hook-skip"
  | "failed"
  | "no-assertion"
  | "report-unreadable"
  | "report-stale"
  | "report-unlocated"
  | "tier-mismatch"
  | "options-unknown";


export interface PinVerdict {
  readonly pin: CasePin;
  readonly ok: boolean;
  /** The failing leg (for an ok verdict: "asserts", the last leg passed). */
  readonly leg: CensusLeg;
  readonly code: CensusCode;
  /** Names the pin (file, title, tier) and the cause: attribution IS the census row. */
  readonly why: string;
  /** Cases the tier run collected for the pin (an it.each / it.for pin: the cases from its call site). */
  readonly cases: number;
  /** The roster rows (RESOLVABLE_CONSTRUCTS) the judgment resolved a value flow through, sorted; an ok verdict holds no other resolution. */
  readonly through: readonly RosterId[];
}

/**
 * One row of the RESOLVABLE-CONSTRUCT ROSTER (owner acceptance criterion 2026-10-17, binding from respin-4): the report
 * model resolves a value flow ONLY through a construct listed here, and every step of a flow matches a row or the flow
 * fails closed (options-unknown, context-unknown or no-assertion, naming what it could not resolve). The roster is the
 * acceptance surface: each row names the construct it resolves and the guard that keeps it from fabricating green, and
 * the helper's falsifier suite pins one refusal shape per row (its justification) and that every ok verdict resolved
 * through roster rows only (PinVerdict.through).
 */
export interface ResolvableConstruct {
  readonly id: string;
  readonly flow: "registration" | "options" | "context" | "assertion";
  /** The construct, exactly as the model resolves it. */
  readonly construct: string;
  /** What keeps it from fabricating green; anything outside the construct fails closed. */
  readonly guard: string;
}

const ROSTER = [
  // ---- the registration flow: what a callee is (report mode reads a registration's fails through these) ----
  {
    id: "registration.import",
    flow: "registration",
    construct: 'an identifier bound by import { <name> } from "vitest" (an alias included), <name> being it / test / describe / suite, a hook or a context registrar',
    guard: "an import binding is never reassigned; the object it holds is guarded by registration.integrity",
  },
  {
    id: "registration.namespace",
    flow: "registration",
    construct: 'a literal member <name> (as in registration.import) of import * as <ns> from "vitest" or of vitest\'s import.meta.vitest',
    guard: "a namespace is read only through literal member names; registration.integrity refuses any other use of it, and any use of import.meta but a literal member read",
  },
  {
    id: "registration.global",
    flow: "registration",
    construct: "an undeclared identifier named as in registration.import (vitest's globals)",
    guard: "as registration.import; the global object's own route to it (globalThis.<name> under globals: true) is a NAMED RESIDUAL",
  },
  {
    id: "registration.relative-export",
    flow: "registration",
    construct: "an import from a relative module - named, default, or a literal member of its namespace - whose export resolves through these rows: export { <name> } from \"vitest\", export * from \"vitest\", export { <local> }, export const, export default, through further relative re-exports",
    guard: "the binding holds vitest's own object, so registration.integrity scans its references as it scans vitest's; a namespace or dynamic import of a module exporting the API is read only through literal members",
  },
  {
    id: "registration.alias",
    flow: "registration",
    construct: "an identifier bound by const <id> = <initializer> (an identifier, never a pattern) resolves to what its initializer resolves to",
    guard: "a const binding is never reassigned; let, var, parameters and patterns are unresolved; the object is guarded by registration.integrity",
  },
  {
    id: "registration.member",
    flow: "registration",
    construct: "a member read by a literal name that vitest's runtime object carries at that link (REGISTRATION_MEMBERS: flags, chain methods, describe / suite, hooks)",
    guard: "REGISTRATION_MEMBERS is pinned against the installed vitest; any other member is unresolved, and a write to any member escapes (registration.integrity)",
  },
  {
    id: "registration.method-call",
    flow: "registration",
    construct: "a call of a chain method (each / for / skipIf / runIf / override / scoped / extend of it / test; each / for / skipIf / runIf of describe / suite) yields the next registration function",
    guard: "the call of a registration, a hook or a registrar yields no API (pinned: it / hooks / registrars return undefined, describe / suite the collector api-use.collector reads); extend / override / scoped define fixtures, functions vitest calls WITH the test context, so a case registered through one is context-unknown and any reference to one escapes (registration.integrity)",
  },
  {
    id: "registration.suite-factory",
    flow: "registration",
    construct: "the factory a describe / suite call is handed (describe.each / for excepted: they hand it rows) is a function literal or same-file function that declares no parameter and reads no arguments object; every other argument past the name is an options object or a number",
    guard: "describe / suite call their factory WITH vitest's test API (factory(test), @vitest/runner, measured), so a declared parameter, an arguments read, or an argument the census does not read as a factory or options escapes (registration.integrity)",
  },
  {
    id: "registration.integrity",
    flow: "registration",
    construct: "the scan of every reference to vitest's API (through the registration rows) in the pinned file and in every relative module of its import closure (imports, re-exports and literal dynamic loads, transitively: all the code the walk follows lives there): each stands in an api-use position",
    guard: "an escape of an it / test / describe / suite value leaves the file's fails unreadable (options-unknown) and its test context too (that API carries hooks and returns suite collectors); of a hook, a registrar or a suite collector, every pin of the file is context-unknown in both modes; a runner-module import of an API name or of the whole module, a dynamic load of vitest, a runner module or a relative module exporting the API, vitest's namespace re-exported whole, and import.meta used but for a literal member read escape outright; so do a fixture definition (test.extend / override / scoped), a suite factory that takes the test API (registration.suite-factory), a hook or registrar placed outside one suite whose callback does not read clean (context.free-hook), a runner binding (getCurrentTest, getCurrentSuite, TestRunner ...) referenced anywhere but called on the spot in a case body's or suite factory's own synchronous code (context.runner-placed), and a re-export that hands importers one",
  },
  {
    id: "api-use.member-read",
    flow: "registration",
    construct: "the reference is the object of a member read that is no assignment, compound-assignment, delete or update target; the scan follows the member read's own use",
    guard: "a write escapes; a destructuring or for-in / for-of target, like every position not on the roster, escapes",
  },
  {
    id: "api-use.call",
    flow: "registration",
    construct: "the reference is the callee of a call (or a tag) whose callee chain resolves: a test registration, a hook or a registrar returns undefined (pinned) and the flow ends there; a chain method's result is scanned on",
    guard: "an unresolved callee (a member vitest does not define, .call / .bind / .apply included) escapes",
  },
  {
    id: "api-use.collector",
    flow: "registration",
    construct: "a describe / suite call returns the suite collector (pinned), discarded as an expression statement or a void operand",
    guard: "the collector reaches the suite's hooks (on), options, task and cases (measured), so any other use of it escapes",
  },
  {
    id: "api-use.const-alias",
    flow: "registration",
    construct: "the reference initializes a const identifier binding whose initializer resolves; the alias's own references are scanned in turn",
    guard: "a let / var / pattern / parameter initializer escapes (context.hook-parameter aside)",
  },
  {
    id: "api-use.discard",
    flow: "registration",
    construct: "the reference is discarded: an expression statement, a void operand, or a typeof operand (a type tag is read)",
    guard: "nothing flows on from a discarded value",
  },
  {
    id: "api-use.re-export",
    flow: "registration",
    construct: 'the reference is re-exported (export { x }, export { x } from "vitest", export * from "vitest", export default x)',
    guard: "a re-export is read where it is imported (registration.relative-export), and the scan covers every module of the pinned file's import closure; vitest's namespace re-exported whole (export * as ns) escapes",
  },
  {
    id: "api-use.type",
    flow: "registration",
    construct: "a reference in a type position (typeof it in a type annotation) carries no runtime value",
    guard: "type positions are erased before the run",
  },
  {
    id: "context.hook-parameter",
    flow: "context",
    construct: "a parameter whose default is a vitest hook or registrar, referenced in its function only as the callee of direct calls: each call is read as that hook's registration",
    guard: "the callback is read as the hook's context flow whether or not a caller injects another function (that function's own code is read where it is written); any other reference to the parameter escapes",
  },
  // ---- the options flow (report mode): the fails a registration's options set ----
  {
    id: "options.literal",
    flow: "options",
    construct: "an object literal in place whose properties are plain: a literal key with a value, a shorthand, or a spread read by these rows",
    guard: "a method or an accessor may expose the object as this, and a computed key may name fails: either is options-unknown",
  },
  {
    id: "options.const",
    flow: "options",
    construct: "an identifier bound by const to options the options rows read, every reference to it standing in an options.read-position",
    guard: "any other reference escapes, since fails may be written through it",
  },
  {
    id: "options.read-position",
    flow: "options",
    construct: "a reference read and never written: the object of a member read whose value is only read (an operand, a condition, an argument, an initializer, a discard), a spread source in a non-target object literal, a typeof operand, or an argument of a resolved registration call",
    guard: "an assignment / destructuring / for-in / for-of target, a delete or update operand, a callee (it passes the object as this), an alias, a call argument and every other position escape",
  },
  {
    id: "options.fails-constant",
    flow: "options",
    construct: "fails set to a literal (true, false, null, a number or a string, ! applied; undefined where no declaration redeclares it) or to a const identifier bound to one",
    guard: "any other value is options-unknown",
  },
  {
    id: "options.enclosure",
    flow: "options",
    construct: "each enclosing function of the case is a function literal passed as a callback to a call resolving to describe / suite (the suites' options read in order), or a class static block or static field, which run where written",
    guard: "a method, accessor, constructor, instance initializer or any other holder runs where it is called, so the enclosing suites are unknown",
  },
  // ---- the context flow (both modes): every use of the test context and the runner state it reaches ----
  {
    id: "context.seed",
    flow: "context",
    construct: "the roots: the case function's context parameter (it / test: the first; it.for: the second; it.each: none), every parameter of a hook callback (aroundEach / aroundAll: from the second), every parameter of a registered handler - an identifier, or an object pattern with literal keys",
    guard: "a rest parameter, a computed key or an array pattern is context-unknown; a function that reads its arguments object is context-unknown",
  },
  {
    id: "context.member",
    flow: "context",
    construct: "a member read of a root by a literal name: task / context re-enter as roots; expect / annotate / signal carry no runner state; skip is the skip hazard; onTestFailed / onTestFinished are called directly (context.handler); any other member is runner state (context.derived) - CONTEXT_MEMBERS pinned against the installed vitest",
    guard: "a write through a root, a computed key, a registrar used but by a direct call, are context-unknown",
  },
  {
    id: "context.alias",
    flow: "context",
    construct: "a variable declaration initialized by a root: an identifier joins the roots, an object pattern is read by context.member",
    guard: "an array pattern is context-unknown; every reference to an alias is classified like the root's",
  },
  {
    id: "context.discard",
    flow: "context",
    construct: "a root discarded: an expression statement, a void or typeof operand",
    guard: "a root called, handed to a call, or used in any other position is context-unknown",
  },
  {
    id: "context.derived",
    flow: "context",
    construct: "runner state followed until it provably stops being state: a further member read, read into a fresh primitive (a comparison, arithmetic, !, in, instanceof, a template span, a condition), flowing on through || / ?? / the right of && / a comma / a ternary arm / a declaration or for-of binding, checked (context.checked), or discarded",
    guard: "written, called, handed to any other call, returned, placed in an object or array literal, or in any other position, it is context-unknown",
  },
  {
    id: "context.checked",
    flow: "context",
    construct: "runner state handed to a call that checks it: an expect construction, an assert call (assertion.assert-call), or a matcher on an expect chain (assertion.matcher); its callback arguments' parameters join the derived values",
    guard: "a non-matcher member (NON_MATCHERS) or a custom matcher name receives the value unchecked, so it is context-unknown; a check may CALL another of its arguments with the value (toSatisfy(fn), an object carrying asymmetricMatch), so every other argument of the chain is inert (a literal, a template, an operator yielding a primitive, an object or array literal of such values, a const bound to a primitive), a read of the flow, or a function literal - any other is context-unknown",
  },
  {
    id: "context.handler",
    flow: "context",
    construct: "a handler registered through onTestFailed / onTestFinished (the context's member or a destructured registrar called directly, or vitest's export through the registration rows) is a function literal or a same-file function, read as a context flow of its own",
    guard: "a handler that is neither, or that reads its arguments object, is context-unknown",
  },
  {
    id: "context.hook",
    flow: "context",
    construct: "a call resolving (registration rows, context.hook-parameter) to a vitest hook in the pin's own chain or in code the walk follows: its callback, a function literal or a same-file function, is read as a context flow",
    guard: "a callback that is neither is context-unknown; a hook value that leaves its direct call escapes (registration.integrity)",
  },
  {
    id: "context.sibling",
    flow: "context",
    construct: "a call the runner located as a registered case or suite, or resolving to vitest's it / test / describe / suite, registers a sibling task whose callback runs as that task, never as this pin's hook",
    guard: "an unresolved call is followed (context.follow) and its callback arguments scanned",
  },
  {
    id: "context.free-hook",
    flow: "context",
    construct: "a vitest hook or registrar called where the census cannot place it in one suite - anywhere but a module's top level or directly in a describe / suite factory (inside a function, a method, a class body, a callback) - is read as a context flow wherever it is, for every pin of the file (a parameter defaulting to a hook: each of its calls)",
    guard: "it may run in any pin's suite through a call the walk cannot follow (a function kept on an object member, a callback a library holds), so a callback that does not read clean escapes (registration.integrity), whether or not the pin's walk reaches it",
  },
  {
    id: "context.runner-placed",
    flow: "context",
    construct: "a runner binding (getCurrentTest / getCurrentSuite from vitest/suite or @vitest/runner, a runner namespace's member, vitest's TestRunner.<member>) called on the spot in the own synchronous code of a case body or a suite factory - the function literal itself handed to a resolved it / test / describe / suite call - reaches the case or suite the runner calls that literal for; the pin's own chain is read by J5",
    guard: "anywhere else - module code, a hook callback, a nested function, method, class or callback, an async or generator literal, an alias, an argument or a bound copy - it may reach any pin's run, so it escapes (registration.integrity); a placed one in ANOTHER case reaches the pin only through the task tree, C1 (the named sibling-case residual)",
  },
  {
    id: "context.follow",
    flow: "context",
    construct: "the code the walk follows from the pin's case, its chain and the arguments of its chain's calls, with no depth bound: a referenced same-file function or class (all of it), variable initializer (a destructured binding's whole initializer) or parameter default, and a relative module's matching export - named, default or re-exported - or, for a namespace import, the member read (else the whole module)",
    guard: "a module none of whose import closure touches vitest is not entered (nothing there reaches the runner or the API); a package module is not followed (NAMED RESIDUAL); a runner binding or a dynamic runner load reached is context-unknown (J5); a hook or registrar reached is read by context.hook / context.handler, an API value by registration.integrity",
  },
  // ---- the assertion flow (both modes; the third leg) ----
  {
    id: "assertion.matcher",
    flow: "assertion",
    construct: "expect(x) / expect.soft(x) / expect.poll(fn) (ctx.expect, a destructured context expect or a vitest namespace's expect), followed by chain members from CHAIN_MEMBERS, called through a member of MATCHERS",
    guard: "MATCHERS and CHAIN_MEMBERS are pinned against the installed vitest; a NON_MATCHERS member (withContext, withTest, chai's internal assert, constructor), any other name, and an expect.extend name assert nothing; an undeclared expect (the global object) is no evidence; the matchers are vitest's own only while assertion.handle-integrity holds",
  },
  {
    id: "assertion.failing-member",
    flow: "assertion",
    construct: "expect.unreachable() / expect.fail() (FAILING_MEMBERS), which fail the case when reached",
    guard: "pinned against the installed vitest to throw when called; any other static expect member asserts nothing",
  },
  {
    id: "assertion.assert-call",
    flow: "assertion",
    construct: "vitest's (chai's) assert or node:assert called, or one of their methods from ASSERT_METHODS (node:assert.strict's included; a named import from node:assert by its ASSERT_METHODS name)",
    guard: "ASSERT_METHODS is pinned against the installed runtime; node:assert's classes and every other member assert nothing; an undeclared assert is no evidence; the checks are the runtime's own only while assertion.handle-integrity holds",
  },
  {
    id: "assertion.handle-integrity",
    flow: "assertion",
    construct: "every reference to an assertion handle - vitest's expect / assert / chai and node:assert in any import form, by binding or by name (the context's expect, a renamed import) - in the pinned file and its relative import closure is called, read through literal members that are no write and register no code, or discarded; the assertion expect(x) / expect.soft(x) / expect.poll(fn) builds stays on its matcher chain (member reads, calls, await) and ends as a statement, a void operand, or the return of a callback",
    guard: "a write, an alias, a computed read, a handle or an assertion handed to a call or returned to code the census does not read, a read of constructor / __proto__ / prototype, a code-registering member (extend: custom matchers get MatcherState.task; addEqualityTesters / addSnapshotSerializer: they get the checked value; use), chai itself, and vi.mock of node:assert, chai, vitest or of a module it cannot name escape: every pin of the file is context-unknown",
  },
  {
    id: "assertion.case-body",
    flow: "assertion",
    construct: "the case function's own body (never a generator's: its body runs only when iterated), read strictly in report mode: its first assertion is reached on every statically visible path",
    guard: "a return, a branch, a short-circuit, a catch or a switch clause that routes around it, and a labeled break that leaves before it, are no-assertion",
  },
  {
    id: "assertion.invoked-callback",
    flow: "assertion",
    construct: "a function literal (never a generator) that is a call argument or immediately invoked runs where it is written",
    guard: "an uncalled arrow, function, object-literal method or accessor, or class member asserts nothing - NAMED RESIDUAL: the callee may never call the callback (report mode reads no count; executing mode's runtime count needs only some assertion to have run)",
  },
  {
    id: "assertion.called-helper",
    flow: "assertion",
    construct: "a call of a same-file function declaration or const-bound function literal, or of a relative module's export of either (never a generator)",
    guard: "its body counts as reached, non-strictly - NAMED RESIDUAL: a branch inside the helper may route around its assertion, an async helper called without await may assert after the case ends",
  },
  {
    id: "assertion.loop-body",
    flow: "assertion",
    construct: "a loop body counts as reached",
    guard: "NAMED RESIDUAL: an iteration count is not static (a literal empty array aside)",
  },
] as const satisfies readonly ResolvableConstruct[];

/** A roster row's id. */
export type RosterId = (typeof ROSTER)[number]["id"];
/** The roster itself (the acceptance surface; the falsifier suite pins one justification shape per row). */
export const RESOLVABLE_CONSTRUCTS: readonly ResolvableConstruct[] = ROSTER;

/** The roster rows the judgment of the pin in hand resolves through (judge and judgePins judge one pin at a time). */
let trail: Set<RosterId> | undefined;
/** Every resolved step of a value flow passes through here, naming its roster row; no other code resolves a step. */
function through<T>(id: RosterId, value: T): T {
  trail?.add(id);
  return value;
}

export interface TierResolution {
  readonly ok: boolean;
  readonly tier: string;
  /** The forge.toml command line itself: what judgePins executes (with its census arguments appended). */
  readonly command: string;
  /** Read-only analysis of the vitest argv the command reaches, e.g. ["run", "--config", "vitest.native.config.ts"]. */
  readonly argv: readonly string[];
  /** How the command resolves, one entry per hop (forge.toml step, npm script). */
  readonly chain: readonly string[];
  readonly why: string;
}

export interface JudgeOptions {
  /** Per tier run, default 300 s. */
  readonly timeoutMs?: number;
  /**
   * vitest workers for each tier run, default 2. F2 cap fidelity holds through env fidelity: vitest 4 resolves maxWorkers
   * from VITEST_MAX_WORKERS OVER the CLI flag, so the operator's cap, passed through, bounds every run the helper starts.
   */
  readonly maxWorkers?: number;
}

/** Report mode's options: the report belongs to ONE tier's run, read relative to one repository root. */
export interface ReportOptions {
  /** The repository root the pins' files are relative to; default: the directory holding the report's .forge directory. */
  readonly root?: string;
  /** The tier whose own run wrote the report; default DEFAULT_GATE_TIER. A pin of any other tier is refused (R2 = (i)). */
  readonly tier?: string;
  /** A non-default tier's exclusivity is read from the default tier's report; default <root>/DEFAULT_TIER_REPORT. */
  readonly defaultReport?: string;
}

export interface RenderedText {
  /** What a reader sees: inline markup and HTML comments removed, whitespace collapsed. */
  readonly text: string;
  /** The source markdown of the block, whitespace collapsed. */
  readonly markdown: string;
}
/**
 * A rendered block. Every text field is what a READER sees: an html block renders none (its source is only under raw,
 * the D2 footgun closed), and an other block (a blockquote, a table) carries its rendered text, HTML excluded.
 */
export type RenderedBlock =
  | { readonly kind: "heading"; readonly depth: number; readonly text: string }
  | { readonly kind: "paragraph"; readonly text: string; readonly markdown: string }
  | { readonly kind: "list"; readonly ordered: boolean; readonly items: readonly RenderedText[] }
  | { readonly kind: "code"; readonly text: string }
  | { readonly kind: "html"; readonly text: ""; readonly raw: string }
  | { readonly kind: "other"; readonly type: string; readonly text: string };
/** The docs adoption verdict (sectionMatches). */
export interface SectionMatch {
  readonly ok: boolean;
  readonly why: string;
}

export interface DocsSection {
  readonly ok: boolean;
  readonly why: string;
  /** The rendered blocks between the unique heading and the next level-1/2 heading (or EOF). */
  readonly blocks: readonly RenderedBlock[];
  /** True when any HTML (block or inline, comments included) sits inside the section. */
  readonly hasHtml: boolean;
}

// ---- run report protocol (written by census-reporter.ts) ----

export interface RunCase {
  readonly name: string;
  readonly suitePath: readonly string[];
  readonly mode: string;
  readonly fails: boolean;
  readonly each: boolean;
  readonly line: number;
  readonly column: number;
  /** The case's result state when the tier ran: passed, failed, skipped or pending (report mode: the report's status). */
  readonly state: string;
  readonly errors: readonly string[];
  /** Report mode only: the case's tags as the report records them (a config tag definition may set fails). */
  readonly tags?: readonly string[];
}

export interface RunSuite {
  readonly name: string;
  readonly suitePath: readonly string[];
  readonly mode: string;
  readonly line: number;
  readonly column: number;
}
export interface RunModule {
  readonly file: string;
  readonly state: string;
  readonly errors: readonly string[];
  readonly tests: readonly RunCase[];
  readonly suites: readonly RunSuite[];
}
export interface RunReport {
  readonly complete: true;
  /** The test files the run scheduled when it started (onTestRunStart), absolute. */
  readonly scheduled: readonly string[];
  readonly modules: readonly RunModule[];
  readonly unhandledErrors: readonly string[];
}

const REPORTER = join(dirname(fileURLToPath(import.meta.url)), "census-reporter.ts");
const NODE_ASSERT = new Set(["node:assert", "node:assert/strict", "assert", "assert/strict"]);
const VITEST_BINARIES = new Set(["vitest", "./node_modules/.bin/vitest", "node_modules/.bin/vitest"]);

// ---------------------------------------------------------------------------------------------
// Tier resolution: forge.toml step -> npm script -> vitest argv (read-only, fail-closed grammar).
// ---------------------------------------------------------------------------------------------

type TomlValue = { readonly kind: "string"; readonly value: string } | { readonly kind: "strings"; readonly value: readonly string[] } | { readonly kind: "other" };
type TomlTables = ReadonlyMap<string, ReadonlyMap<string, TomlValue>>;
type Parsed<T> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly why: string };

/** Drops a # comment that is outside quotes. */
function stripTomlComment(line: string): string {
  let quote = "";
  for (let i = 0; i < line.length; i += 1) {
    const ch = line.charAt(i);
    if (quote === '"' && ch === "\\") {
      i += 1;
      continue;
    }
    if (quote !== "") {
      if (ch === quote) quote = "";
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "#") return line.slice(0, i);
  }
  return line;
}

/** Brackets still open in an array value, ignoring brackets inside strings. */
function openBrackets(text: string): number {
  let depth = 0;
  let quote = "";
  for (let i = 0; i < text.length; i += 1) {
    const ch = text.charAt(i);
    if (quote === '"' && ch === "\\") {
      i += 1;
      continue;
    }
    if (quote !== "") {
      if (ch === quote) quote = "";
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "[") depth += 1;
    else if (ch === "]") depth -= 1;
  }
  return depth;
}

function tomlString(text: string): string | undefined {
  if (/^"(?:[^"\\\u0000-\u001f]|\\["\\bfnrt/]|\\u[0-9A-Fa-f]{4})*"$/.test(text)) {
    const value: unknown = JSON.parse(text);
    return typeof value === "string" ? value : undefined;
  }
  if (/^'[^'\n]*'$/.test(text)) return text.slice(1, -1);
  return undefined;
}

function tomlValue(text: string): TomlValue {
  const single = tomlString(text);
  if (single !== undefined) return { kind: "string", value: single };
  if (text.startsWith("[") && text.endsWith("]")) {
    const items: string[] = [];
    let current = "";
    let quote = "";
    for (const ch of text.slice(1, -1)) {
      if (quote !== "") {
        current += ch;
        if (ch === quote && !current.endsWith(`\\${quote}`)) quote = "";
        continue;
      }
      if (ch === '"' || ch === "'") quote = ch;
      if (ch === ",") {
        items.push(current.trim());
        current = "";
        continue;
      }
      current += ch;
    }
    items.push(current.trim());
    const strings = items.filter(item => item !== "").map(tomlString);
    if (strings.every((item): item is string => item !== undefined)) return { kind: "strings", value: strings };
  }
  return { kind: "other" };
}

/** The TOML subset forge.toml uses: [tables], dotted or quoted keys, strings, string arrays. Anything structural outside it fails closed. */
function parseToml(text: string): Parsed<TomlTables> {
  const tables = new Map<string, Map<string, TomlValue>>();
  const tableOf = (name: string): Map<string, TomlValue> => {
    let table = tables.get(name);
    if (table === undefined) {
      table = new Map();
      tables.set(name, table);
    }
    return table;
  };
  let current = "";
  tableOf(current);
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = stripTomlComment(lines[index] ?? "").trim();
    if (line === "") continue;
    if (line.includes('"""') || line.includes("'''")) return { ok: false, why: `forge.toml line ${index + 1}: multi-line strings are outside the parsed subset` };
    const header = /^\[\s*([A-Za-z0-9_.-]+)\s*\]$/.exec(line);
    if (header?.[1] !== undefined) {
      current = header[1];
      if (tables.has(current) && (tables.get(current)?.size ?? 0) > 0) return { ok: false, why: `forge.toml line ${index + 1}: table [${current}] is declared twice` };
      tableOf(current);
      continue;
    }
    if (/^\[\[/.test(line)) {
      current = `${line}@${index}`;
      tableOf(current);
      continue;
    }
    const pair = /^((?:[A-Za-z0-9_-]+|"[^"]*")(?:\s*\.\s*(?:[A-Za-z0-9_-]+|"[^"]*"))*)\s*=\s*(.+)$/.exec(line);
    if (pair?.[1] === undefined || pair[2] === undefined) return { ok: false, why: `forge.toml line ${index + 1} is outside the parsed TOML subset: ${line.slice(0, 120)}` };
    const keys = pair[1].split(".").map(key => key.trim().replace(/^"|"$/g, ""));
    let valueText = pair[2].trim();
    while (valueText.startsWith("[") && openBrackets(valueText) > 0 && index + 1 < lines.length) {
      index += 1;
      valueText += ` ${stripTomlComment(lines[index] ?? "").trim()}`;
    }
    const key = keys[keys.length - 1] ?? "";
    const tableName = [current, ...keys.slice(0, -1)].filter(part => part !== "").join(".");
    const table = tableOf(tableName);
    if (table.has(key)) return { ok: false, why: `forge.toml line ${index + 1}: key ${key} is defined twice in [${tableName}]` };
    const value = tomlValue(valueText);
    if (value.kind === "other" && (valueText.startsWith('"') || valueText.startsWith("'") || valueText.startsWith("[")) && !/^\[.*\]$/.test(valueText)) {
      return { ok: false, why: `forge.toml line ${index + 1}: unterminated value for ${key}` };
    }
    if (value.kind === "other" && !/^(?:[+-]?\d[\d_]*(?:\.\d+)?|true|false|\[.*\]|\{.*\}|\d{4}-\d{2}-\d{2}.*)$/.test(valueText)) {
      return { ok: false, why: `forge.toml line ${index + 1}: value of ${key} is outside the parsed TOML subset: ${valueText.slice(0, 120)}` };
    }
    table.set(key, value);
  }
  return { ok: true, value: tables };
}

/** Shell-word split of a command line; anything a shell would interpret beyond words and quotes fails closed. */
function tokenize(command: string): Parsed<readonly string[]> {
  const words: string[] = [];
  let current = "";
  let started = false;
  let quote = "";
  for (let i = 0; i < command.length; i += 1) {
    const ch = command.charAt(i);
    if (quote === "'") {
      if (ch === "'") quote = "";
      else current += ch;
      continue;
    }
    if (quote === '"') {
      if (ch === '"') quote = "";
      else if (ch === "$" || ch === "`") return { ok: false, why: `the command expands ${ch} inside double quotes` };
      else if (ch === "\\") return { ok: false, why: "the command uses a shell escape inside double quotes" };
      else current += ch;
      continue;
    }
    if (ch === "'" || ch === '"') {
      quote = ch;
      started = true;
      continue;
    }
    if (ch === " " || ch === "\t") {
      if (started) words.push(current);
      current = "";
      started = false;
      continue;
    }
    if ("|&;<>()$`*?[]{}~!\n\r#".includes(ch)) return { ok: false, why: `the command uses the shell operator ${JSON.stringify(ch)}` };
    if (ch === "\\") return { ok: false, why: "the command uses a shell escape" };
    current += ch;
    started = true;
  }
  if (quote !== "") return { ok: false, why: "the command has an unterminated quote" };
  if (started) words.push(current);
  if (words.length === 0) return { ok: false, why: "the command is empty" };
  if (/^[A-Za-z_][A-Za-z0-9_]*=/.test(words[0] ?? "")) return { ok: false, why: "the command sets environment variables" };
  return { ok: true, value: words };
}

function readScripts(root: string): Parsed<Readonly<Record<string, string>>> {
  let value: unknown;
  try {
    value = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  } catch (error) {
    return { ok: false, why: `package.json is unreadable: ${String(error instanceof Error ? error.message : error)}` };
  }
  const scripts = typeof value === "object" && value !== null ? (value as { scripts?: unknown }).scripts : undefined;
  if (scripts === undefined) return { ok: true, value: {} };
  if (typeof scripts !== "object" || scripts === null) return { ok: false, why: "package.json scripts is not an object" };
  const out: Record<string, string> = {};
  for (const [name, body] of Object.entries(scripts)) if (typeof body === "string") out[name] = body;
  return { ok: true, value: out };
}

function resolveWords(words: readonly string[], scripts: Readonly<Record<string, string>>, chain: string[], depth: number): Parsed<readonly string[]> {
  const [head, ...rest] = words;
  if (head === "npm") {
    let script: string | undefined;
    let extra: readonly string[];
    if (rest[0] === "run" || rest[0] === "run-script") {
      script = rest[1];
      extra = rest.slice(2);
    } else if (rest[0] === "test" || rest[0] === "t") {
      script = "test";
      extra = rest.slice(1);
    } else return { ok: false, why: `npm ${rest[0] ?? ""} is not a modelled npm invocation` };
    if (script === undefined || script.startsWith("-")) return { ok: false, why: "npm run names no script" };
    if (extra.length > 0 && extra[0] !== "--") return { ok: false, why: `npm flag ${extra[0] ?? ""} before -- is not modelled` };
    const body = scripts[script];
    if (body === undefined) return { ok: false, why: `package.json declares no script ${script}` };
    if (depth > 4) return { ok: false, why: "npm scripts nest deeper than four levels" };
    chain.push(`package.json scripts.${script} = ${JSON.stringify(body)}`);
    const nested = tokenize(body);
    if (!nested.ok) return { ok: false, why: `package.json scripts.${script}: ${nested.why}` };
    return resolveWords([...nested.value, ...extra.slice(1)], scripts, chain, depth + 1);
  }
  const vitestArgs = head === "npx" && rest[0] === "vitest" ? rest.slice(1) : head !== undefined && VITEST_BINARIES.has(head) ? rest : undefined;
  if (vitestArgs === undefined) return { ok: false, why: `the tier runs ${head ?? "nothing"}, not vitest` };
  if (vitestArgs[0] !== "run" && !vitestArgs.includes("--run")) return { ok: false, why: "vitest without run is watch mode" };
  return { ok: true, value: vitestArgs };
}

/** Resolves a forge.toml command to the vitest argv it runs, read-only; anything outside the modelled grammar fails closed. */
export function resolveTier(root: string, tier: string): TierResolution {
  const fail = (why: string, chain: readonly string[] = [], command = ""): TierResolution => ({ ok: false, tier, command, argv: [], chain, why });
  let text: string;
  try {
    text = readFileSync(join(root, "forge.toml"), "utf8");
  } catch (error) {
    return fail(`forge.toml is unreadable: ${String(error instanceof Error ? error.message : error)}`);
  }
  const toml = parseToml(text);
  if (!toml.ok) return fail(toml.why);
  if (tier === DEFAULT_GATE_TIER) {
    const gate = toml.value.get("build")?.get("gate");
    if (gate?.kind !== "strings" || !gate.value.includes(tier)) return fail(`forge.toml [build] gate does not run the ${tier} step`);
  }
  const inline = toml.value.get("build.commands")?.get(tier);
  const block = toml.value.get(`build.commands.${tier}`)?.get("command");
  if (inline !== undefined && block !== undefined) return fail(`forge.toml declares ${tier} both inline and as a table`);
  const command = inline ?? block;
  if (command === undefined) return fail(`forge.toml declares no command ${tier}`);
  if (command.kind !== "string") return fail(`forge.toml command ${tier} is not a string`);
  const chain = [inline !== undefined ? `forge.toml [build.commands] ${tier} = ${JSON.stringify(command.value)}` : `forge.toml [build.commands.${tier}] command = ${JSON.stringify(command.value)}`];
  const words = tokenize(command.value);
  if (!words.ok) return fail(`forge.toml command ${tier}: ${words.why}`, chain, command.value);
  const scripts = readScripts(root);
  if (!scripts.ok) return fail(scripts.why, chain, command.value);
  const argv = resolveWords(words.value, scripts.value, chain, 0);
  if (!argv.ok) return fail(argv.why, chain, command.value);
  if (chain.length > 2) return fail("the command reaches vitest through more than one npm script; only one npm hop is executed faithfully", chain, command.value);
  return { ok: true, tier, command: command.value, argv: argv.value, chain, why: "" };
}
// ---------------------------------------------------------------------------------------------
// Execution: the tier's REAL entrypoint with the census reporter appended (owner rulings 13:20Z, 13:30Z).
// ---------------------------------------------------------------------------------------------

type TierRun = { readonly ok: true; readonly report: RunReport } | { readonly ok: false; readonly why: string };

/**
 * What vitest itself sets in a worker's environment (measured on 4.1.10): a tier run started from inside a worker must
 * not inherit these, and NOTHING else is touched - every operator name (VITEST_MAX_WORKERS included) passes through and
 * the helper adds none, so the judged code sees the gate's environment (J1-J4).
 */
const VITEST_WORKER_ENV = new Set(["VITEST", "VITEST_MODE", "VITEST_POOL_ID", "VITEST_WORKER_ID", "TEST", "BASE_URL", "MODE", "DEV", "PROD", "SSR", "FORCE_TTY"]);
const NO_ASSERTION = "expected any number of assertion, but got none";

function runEnv(): NodeJS.ProcessEnv {
  const inWorker = process.env.VITEST !== undefined;
  const env: NodeJS.ProcessEnv = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined || (inWorker && VITEST_WORKER_ENV.has(key))) continue;
    env[key] = value;
  }
  return env;
}

/**
 * Each tier run gets its own directory holding a generated reporter module that writes the run's report next to
 * itself, so the report path reaches the run only through its command line (--reporter=<that module>), never through
 * the environment the judged code reads. The same command-line word marks the run for the recursion guard.
 */
const RUN_DIR_PREFIX = "census-run.";
const RUN_REPORTER = "census-reporter-run.ts";
const RUN_MARKER = /census-run\.[^/\s]+\/census-reporter-run\.ts/;

const runReporterSource = (out: string): string =>
  [`import CensusReporter from ${JSON.stringify(REPORTER)};`, "", "export default class CensusRunReporter extends CensusReporter {", "  constructor() {", `    super(${JSON.stringify(out)});`, "  }", "}", ""].join("\n");

/** This process's command line and its ancestors', from /proc (or one ps listing where /proc is absent); undefined when neither answers. */
function ancestorCommandLines(): readonly string[] | undefined {
  try {
    const lines: string[] = [];
    let pid = process.pid;
    for (let depth = 0; depth < 64 && pid > 1; depth += 1) {
      lines.push(readFileSync(`/proc/${pid}/cmdline`, "utf8").split("\0").join(" "));
      const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
      const parent = Number(stat.slice(stat.lastIndexOf(")") + 2).split(" ")[1]);
      if (!Number.isInteger(parent) || parent < 1) break;
      pid = parent;
    }
    return lines;
  } catch {
    const listing = spawnSync("ps", ["-ww", "-A", "-o", "pid=,ppid=,args="], { encoding: "utf8" });
    if (listing.status !== 0) return undefined;
    const table = new Map<number, { readonly parent: number; readonly args: string }>();
    for (const row of listing.stdout.split("\n")) {
      const match = /^\s*(\d+)\s+(\d+)\s(.*)$/.exec(row);
      if (match?.[1] !== undefined && match[2] !== undefined) table.set(Number(match[1]), { parent: Number(match[2]), args: match[3] ?? "" });
    }
    const lines: string[] = [];
    for (let pid = process.pid, depth = 0; depth < 64 && pid > 1; depth += 1) {
      const entry = table.get(pid);
      if (entry === undefined) break;
      lines.push(entry.args);
      pid = entry.parent;
    }
    return lines.length > 0 ? lines : undefined;
  }
}

/**
 * The recursion guard, carried on the run's command line instead of the environment: is this process inside a tier run
 * the helper started (an ancestor's command line names a per-run census reporter)? Fail-closed: when the ancestry cannot
 * be read, the answer is yes, so the helper never starts a run it cannot bound.
 */
function insideCensusRun(): boolean {
  const lines = ancestorCommandLines();
  return lines === undefined || lines.some(line => RUN_MARKER.test(line));
}


/** vitest 4 CLI flags that take a required value (the word after them is never a file filter). */
const VALUE_FLAGS = new Set([
  "attachmentsDir",
  "bail",
  "browser",
  "config",
  "configLoader",
  "diff",
  "dir",
  "environment",
  "exclude",
  "execArgv",
  "experimental",
  "hookTimeout",
  "maxConcurrency",
  "maxWorkers",
  "mode",
  "outputFile",
  "pool",
  "project",
  "reporter",
  "retry",
  "root",
  "sequence",
  "shard",
  "slowTestThreshold",
  "tagsFilter",
  "teardownTimeout",
  "testNamePattern",
  "testTimeout",
  "vmMemoryLimit",
]);
const SHORT_VALUE_FLAGS: ReadonlyMap<string, string> = new Map([
  ["c", "config"],
  ["r", "root"],
  ["t", "testNamePattern"],
]);
/** vitest 4 CLI flags that take no value and leave the run's file set alone. */
const BOOLEAN_FLAGS = new Set([
  "allowOnly",
  "cache",
  "clearScreen",
  "color",
  "coverage",
  "dangerouslyIgnoreUnhandledErrors",
  "detectAsyncLeaks",
  "disableConsoleIntercept",
  "dom",
  "expandSnapshotDiff",
  "fileParallelism",
  "globals",
  "hideSkippedTests",
  "includeTaskLocation",
  "isolate",
  "logHeapUsage",
  "passWithNoTests",
  "printConsoleTrace",
  "run",
  "standalone",
  "strictTags",
  "typecheck",
]);

const camel = (flag: string): string => flag.replace(/-([a-z])/g, (_match, letter: string) => letter.toUpperCase());

/**
 * May the census append the pinned files as filters? Only when the tier's own argv carries no file filter and
 * nothing whose meaning depends on the whole file set (--shard); any word it cannot classify keeps the full run.
 * Appended filters only narrow what the config's include/exclude already selects, so membership is unchanged.
 */
function narrowable(argv: readonly string[]): boolean {
  for (let index = argv[0] === "run" ? 1 : 0; index < argv.length; index += 1) {
    const word = argv[index] ?? "";
    if (!word.startsWith("-") || word === "--") return false;
    const long = word.startsWith("--");
    const body = word.slice(long ? 2 : 1);
    const equals = body.indexOf("=");
    const raw = equals === -1 ? body : body.slice(0, equals);
    const name = long ? camel(raw.startsWith("no-") ? raw.slice(3) : raw) : (SHORT_VALUE_FLAGS.get(raw) ?? "");
    if (name === "shard") return false;
    if (VALUE_FLAGS.has(name)) {
      if (equals === -1) index += 1;
      continue;
    }
    if (long && equals === -1 && BOOLEAN_FLAGS.has(name)) continue;
    return false;
  }
  return true;
}

const isStringArray = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every(item => typeof item === "string");
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

function isRunCase(value: unknown): value is RunCase {
  return (
    isRecord(value) &&
    typeof value.name === "string" &&
    isStringArray(value.suitePath) &&
    typeof value.mode === "string" &&
    typeof value.fails === "boolean" &&
    typeof value.each === "boolean" &&
    typeof value.line === "number" &&
    typeof value.column === "number" &&
    typeof value.state === "string" &&
    isStringArray(value.errors)
  );
}

const isRunSuite = (value: unknown): value is RunSuite =>
  isRecord(value) && typeof value.name === "string" && isStringArray(value.suitePath) && typeof value.mode === "string" && typeof value.line === "number" && typeof value.column === "number";

function isRunModule(value: unknown): value is RunModule {
  return (
    isRecord(value) &&
    typeof value.file === "string" &&
    typeof value.state === "string" &&
    isStringArray(value.errors) &&
    Array.isArray(value.tests) &&
    value.tests.every(isRunCase) &&
    Array.isArray(value.suites) &&
    value.suites.every(isRunSuite)
  );
}

function parseReport(text: string): TierRun {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return { ok: false, why: "the census reporter wrote malformed JSON" };
  }
  if (
    !isRecord(value) ||
    value.complete !== true ||
    !isStringArray(value.scheduled) ||
    !isStringArray(value.unhandledErrors) ||
    !Array.isArray(value.modules) ||
    !value.modules.every(isRunModule)
  ) {
    return { ok: false, why: "the census report does not have the reporter's shape" };
  }
  if (value.unhandledErrors.length > 0) return { ok: false, why: `the run reported unhandled errors: ${value.unhandledErrors[0] ?? ""}` };
  return { ok: true, report: { complete: true, scheduled: value.scheduled, modules: value.modules, unhandledErrors: value.unhandledErrors } };
}

/** The command line judgePins executes: the forge.toml command itself, then (after an npm "--") the census arguments. */
function censusCommand(resolution: TierResolution, files: readonly string[], reporter: string, options: JudgeOptions): string | undefined {
  const words = tokenize(resolution.command);
  if (!words.ok) return undefined;
  const npm = words.value[0] === "npm" && !words.value.includes("--");
  const maxWorkers = resolution.argv.some(word => /^--max(?:Workers|-workers)(?:=|$)/.test(word));
  const extra = [
    ...(narrowable(resolution.argv) ? files : []),
    `--reporter=${reporter}`,

    "--includeTaskLocation",
    "--expect.requireAssertions",
    ...(maxWorkers ? [] : [`--maxWorkers=${options.maxWorkers ?? 2}`]),
  ];
  if (extra.some(word => /['\n\r]/.test(word))) return undefined;
  return [resolution.command, ...(npm ? ["--"] : []), ...extra.map(word => `'${word}'`)].join(" ");
}

async function runTier(root: string, resolution: TierResolution, files: readonly string[], options: JudgeOptions): Promise<TierRun> {
  const dir = mkdtempSync(join(tmpdir(), RUN_DIR_PREFIX));
  const out = join(dir, "report.json");
  const reporter = join(dir, RUN_REPORTER);
  try {
    writeFileSync(reporter, runReporterSource(out));
    const line = censusCommand(resolution, files, reporter, options);
    if (line === undefined) return { ok: false, why: "a pinned path or the reporter path cannot be quoted for the shell" };
    const timeoutMs = options.timeoutMs ?? 300_000;
    const exit = await new Promise<{ readonly code: number | null; readonly stderr: string; readonly timedOut: boolean }>(settle => {
      const child = spawn("bash", ["-c", line], { cwd: root, env: runEnv(), stdio: ["ignore", "ignore", "pipe"], detached: true });

      let stderr = "";
      let timedOut = false;
      const timer = setTimeout(() => {
        timedOut = true;
        if (child.pid !== undefined) process.kill(-child.pid, "SIGKILL");
      }, timeoutMs);
      child.stderr.on("data", (chunk: Buffer) => {
        stderr = `${stderr}${chunk.toString("utf8")}`.slice(-16_000);
      });
      child.on("error", error => {
        clearTimeout(timer);
        settle({ code: null, stderr: `${stderr}${error.message}`, timedOut });
      });
      child.on("close", code => {
        clearTimeout(timer);
        settle({ code, stderr, timedOut });
      });
    });
    if (exit.timedOut) return { ok: false, why: `the tier run timed out after ${timeoutMs} ms` };
    if (!existsSync(out)) return { ok: false, why: `the tier run wrote no census report (exit ${String(exit.code)}): ${exit.stderr.trim().slice(-600)}` };
    return parseReport(readFileSync(out, "utf8"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function realOrSelf(path: string): string {
  try {
    return realpathSync(path);
  } catch {
    return path;
  }
}

// ---------------------------------------------------------------------------------------------
// Source analysis: parse-aware (TypeScript compiler API), one program per file, symbols bound.
// ---------------------------------------------------------------------------------------------

type FunctionLiteral = ts.ArrowFunction | ts.FunctionExpression;
type AnalysedFunction = FunctionLiteral | ts.FunctionDeclaration;
const isFunctionLiteral = (node: ts.Node): node is FunctionLiteral => ts.isArrowFunction(node) || ts.isFunctionExpression(node);

class SourceAnalysis {
  readonly file: string;
  readonly sf: ts.SourceFile;
  readonly checker: ts.TypeChecker;
  readonly syntaxError: string | undefined;
  /** The cache that loaded it: relative modules resolve through it (registration.relative-export, context.follow). */
  readonly sources: SourceCache | undefined;

  constructor(file: string, text: string, sources?: SourceCache) {
    this.file = file;
    this.sources = sources;
    const kind = /\.[cm]?js$/.test(file) ? ts.ScriptKind.JS : file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
    this.sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, kind);
    const sf = this.sf;
    const host: ts.CompilerHost = {
      getSourceFile: name => (name === file ? sf : undefined),
      getDefaultLibFileName: () => "lib.d.ts",
      writeFile: () => undefined,
      getCurrentDirectory: () => dirname(file),
      getCanonicalFileName: name => name,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => "\n",
      fileExists: name => name === file,
      readFile: name => (name === file ? text : undefined),
    };
    const program = ts.createProgram({ rootNames: [file], options: { noLib: true, noResolve: true, allowJs: true, types: [], target: ts.ScriptTarget.Latest, module: ts.ModuleKind.ESNext }, host });
    const diagnostic = program.getSyntacticDiagnostics(sf)[0];
    this.syntaxError = diagnostic === undefined ? undefined : `${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")} at ${this.where(diagnostic.start ?? 0)}`;
    this.checker = program.getTypeChecker();
  }

  where(node: ts.Node | number): string {
    const at = this.sf.getLineAndCharacterOfPosition(typeof node === "number" ? node : node.getStart(this.sf));
    return `line ${at.line + 1}:${at.character + 1}`;
  }

  key(position: number): string {
    const at = this.sf.getLineAndCharacterOfPosition(position);
    return `${at.line + 1}:${at.character + 1}`;
  }

  /** The source positions V8 can report for a call: callee start, member name, element key, the argument list's open paren. */
  callKeys(call: ts.CallExpression): string[] {
    const keys = [this.key(call.expression.getStart(this.sf)), this.key(call.arguments.pos - 1)];
    const callee = call.expression;
    if (ts.isPropertyAccessExpression(callee)) keys.push(this.key(callee.name.getStart(this.sf)));
    if (ts.isElementAccessExpression(callee)) {
      const start = callee.argumentExpression.getStart(this.sf);
      keys.push(this.key(start), this.key(start - 1));
    }
    return keys;
  }

  /** The outermost call expression at a runner-reported line:column. */
  callAt(line: number, column: number): ts.CallExpression | undefined {
    const wanted = `${line}:${column}`;
    let found: ts.CallExpression | undefined;
    const visit = (node: ts.Node): void => {
      if (found !== undefined) return;
      if (ts.isCallExpression(node) && this.callKeys(node).includes(wanted)) {
        found = node;
        return;
      }
      ts.forEachChild(node, visit);
    };
    visit(this.sf);
    return found;
  }

  /** it.each(table)(template, fn) / it.for(table)(template, fn) call sites whose literal template equals title. */
  eachSites(title: string): ts.CallExpression[] {
    const sites: ts.CallExpression[] = [];
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && ts.isCallExpression(node.expression)) {
        const head = node.expression.expression;
        const first = node.arguments[0];
        if (ts.isPropertyAccessExpression(head) && (head.name.text === "each" || head.name.text === "for") && first !== undefined && ts.isStringLiteralLike(first) && first.text === title) sites.push(node);
      }
      ts.forEachChild(node, visit);
    };
    visit(this.sf);
    return sites;
  }
}

type LoadedSource = { readonly kind: "ok"; readonly analysis: SourceAnalysis } | { readonly kind: "unreadable" | "unparseable"; readonly why: string };

class SourceCache {
  private readonly loaded = new Map<string, LoadedSource>();
  /** Files read since the last reset, cache hits included: report mode checks each is older than the report. */
  private readonly reads = new Set<string>();

  touched(): readonly string[] {
    return [...this.reads];
  }

  resetTouched(): void {
    this.reads.clear();
  }

  get(file: string): LoadedSource {
    this.reads.add(file);
    let entry = this.loaded.get(file);

    if (entry === undefined) {
      entry = this.load(file);
      this.loaded.set(file, entry);
    }
    return entry;
  }

  private load(file: string): LoadedSource {
    let text: string;
    try {
      text = readFileSync(file, "utf8");
    } catch (error) {
      return { kind: "unreadable", why: `the file is unreadable: ${String(error instanceof Error ? error.message : error)}` };
    }
    const analysis = new SourceAnalysis(file, text, this);
    if (analysis.syntaxError !== undefined) return { kind: "unparseable", why: `the file does not parse: ${analysis.syntaxError}` };
    return { kind: "ok", analysis };
  }

  /** A relative import's module file, mapping a .js specifier to its .ts source. */
  module(from: string, specifier: string): SourceAnalysis | undefined {
    if (!specifier.startsWith("./") && !specifier.startsWith("../")) return undefined;
    const base = resolve(dirname(from), specifier);
    const candidates = [base, base.replace(/\.js$/, ".ts"), base.replace(/\.mjs$/, ".mts"), base.replace(/\.js$/, ".tsx"), `${base}.ts`, join(base, "index.ts")];
    for (const candidate of candidates) {
      if (!existsSync(candidate)) continue;
      const loaded = this.get(candidate);
      return loaded.kind === "ok" ? loaded.analysis : undefined;
    }
    return undefined;
  }
}

// ---------------------------------------------------------------------------------------------
// Runtime skips: the test context's skip, reached from the case body or a hook of its own chain.
// ---------------------------------------------------------------------------------------------

interface Hazard {
  readonly kind: "skip" | "unknown";
  readonly detail: string;
}

const skipAt = (a: SourceAnalysis, node: ts.Node, what: string): Hazard => ({ kind: "skip", detail: `${what} at ${a.where(node)}` });
const unknownAt = (a: SourceAnalysis, node: ts.Node, what: string): Hazard => ({ kind: "unknown", detail: `${what} at ${a.where(node)}` });

function unwrap(expression: ts.Expression): ts.Expression {
  let current = expression;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isNonNullExpression(current) || ts.isTypeAssertionExpression(current)) current = current.expression;
  return current;
}

/** The key a binding element reads, or undefined for a computed non-literal key. */
function bindingKey(element: ts.BindingElement): string | undefined {
  const property = element.propertyName;
  if (property === undefined) return ts.isIdentifier(element.name) ? element.name.text : undefined;
  if (ts.isIdentifier(property) || ts.isStringLiteral(property) || ts.isNumericLiteral(property) || ts.isPrivateIdentifier(property)) return property.text;
  if (ts.isComputedPropertyName(property)) {
    const expression = unwrap(property.expression);
    return ts.isStringLiteralLike(expression) ? expression.text : undefined;
  }
  return undefined;
}

/**
 * The test context's value flow (u62 gate-3 U2 / respin-3, the design invariant in BOTH modes). vitest reads a case's
 * fails AFTER its last hook and handler and flips the result then (@vitest/runner runTest), so code holding the context
 * can invert a case, or rewrite its result, after collection - and neither the JSON report nor the reporter's collected
 * task sees it (vitest 4.1.10 syncs only a task's result and meta to the main process; measured). ROOTS are the context
 * itself and its task: every use is classified, anything else is unknown. DERIVED values are runner state reached
 * through a root (a task's result, suite, meta, file, a fixture), followed until they provably stop being that state;
 * a write through either is context-unknown, and so is any use the walk cannot follow.
 */
class ContextFlow {
  readonly roots = new Set<ts.Symbol>();
  readonly derived = new Set<ts.Symbol>();
  /** A destructured onTestFailed / onTestFinished: the handlers it registers receive the context. */
  readonly registrars = new Set<ts.Symbol>();
  /** The context's destructured expect: the assertion API, never runner state. */
  readonly expects = new Set<ts.Symbol>();
  skip: Hazard | undefined;
  unknown: Hazard | undefined;
  readonly a: SourceAnalysis;
  /** Functions whose context flow is already being read (a handler that registers itself stops there). */
  readonly seen: Set<ts.Node>;

  constructor(a: SourceAnalysis, seen: Set<ts.Node>) {
    this.a = a;
    this.seen = seen;
  }

  size(): number {
    return this.roots.size + this.derived.size + this.registrars.size + this.expects.size;
  }

  /** A reachable skip is the more specific finding, so it outranks an unknown use found anywhere in the same walk. */
  record(hazard: Hazard | undefined): void {
    if (hazard === undefined) return;
    if (hazard.kind === "skip") this.skip ??= hazard;
    else this.unknown ??= hazard;
  }
}

/** The members of vitest 4.1's TestContext that carry no runner state: the assertion, annotation and abort APIs. */
const CONTEXT_API: ReadonlySet<string> = new Set(["expect", "annotate", "signal"]);
/** The context members (and vitest exports) that register a handler vitest calls WITH the context (OnTestFailedHandler / OnTestFinishedHandler). */
const CONTEXT_REGISTRARS: ReadonlySet<string> = new Set(["onTestFailed", "onTestFinished"]);
/** Operators that read a value into a fresh primitive (it stops being runner state there). */
const READ_OPERATORS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.EqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken,
  ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.LessThanToken,
  ts.SyntaxKind.GreaterThanToken,
  ts.SyntaxKind.LessThanEqualsToken,
  ts.SyntaxKind.GreaterThanEqualsToken,
  ts.SyntaxKind.InstanceOfKeyword,
  ts.SyntaxKind.InKeyword,
  ts.SyntaxKind.PlusToken,
  ts.SyntaxKind.MinusToken,
  ts.SyntaxKind.AsteriskToken,
  ts.SyntaxKind.SlashToken,
  ts.SyntaxKind.PercentToken,
  ts.SyntaxKind.AsteriskAsteriskToken,
]);
/** Operators whose result may BE an operand (a || b, a ?? b, the right of a && b or of a comma), so the value flows on through them. */
const FLOW_OPERATORS: ReadonlySet<ts.SyntaxKind> = new Set([ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.CommaToken]);

/** A node's source text, whitespace collapsed and clipped, so a red names what it could not follow. */
function nodeText(node: ts.Node, a: SourceAnalysis): string {
  const text = node.getText(a.sf).replace(/\s+/g, " ");
  return text.length > 60 ? `${text.slice(0, 57)}...` : text;
}

/** The outermost expression a node is wrapped into by parentheses and type assertions. */
function climbWrappers(node: ts.Expression): ts.Expression {
  let current = node;
  while (
    ts.isParenthesizedExpression(current.parent) ||
    ts.isAsExpression(current.parent) ||
    ts.isSatisfiesExpression(current.parent) ||
    ts.isNonNullExpression(current.parent) ||
    ts.isTypeAssertionExpression(current.parent)
  ) {
    current = current.parent;
  }
  return current;
}

/**
 * Does an expression get written: an assignment target (compound included), a delete operand, or an increment /
 * decrement? Exact, unlike isWritten (which also takes ! and - for writes, the options read's fail-closed shortcut),
 * since the context flow reads that runner state is only tested there.
 */
function writes(target: ts.Expression): boolean {
  const node = climbWrappers(target);
  const parent = node.parent;
  if (ts.isBinaryExpression(parent) && parent.left === node) return parent.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && parent.operatorToken.kind <= ts.SyntaxKind.LastAssignment;
  if (ts.isDeleteExpression(parent)) return true;
  const update = (operator: ts.SyntaxKind): boolean => operator === ts.SyntaxKind.PlusPlusToken || operator === ts.SyntaxKind.MinusMinusToken;
  return (ts.isPrefixUnaryExpression(parent) && update(parent.operator)) || (ts.isPostfixUnaryExpression(parent) && update(parent.operator));
}

function addSymbol(into: Set<ts.Symbol>, name: ts.Identifier, a: SourceAnalysis): void {
  const symbol = a.checker.getSymbolAtLocation(name);
  if (symbol !== undefined) into.add(symbol);
}

/** Every identifier a binding name introduces joins the derived values (patterns and rests included). */
function bindDerived(name: ts.BindingName, flow: ContextFlow): void {
  if (ts.isIdentifier(name)) {
    addSymbol(flow.derived, name, flow.a);
    return;
  }
  for (const element of name.elements) if (!ts.isOmittedExpression(element)) bindDerived(element.name, flow);
}

/** A destructuring of the context: skip is a hazard; task / context lead back to the context; a rest or computed key is unknowable. */
function bindingHazard(pattern: ts.ObjectBindingPattern, flow: ContextFlow): Hazard | undefined {
  const a = flow.a;
  for (const element of pattern.elements) {
    if (element.dotDotDotToken !== undefined) return unknownAt(a, element, "a rest element collects the test context");
    const key = bindingKey(element);
    if (key === undefined) return unknownAt(a, element, "a computed key destructures the test context");
    if (key === "skip") return skipAt(a, element, "the test context's skip is destructured");
    if (key === "task" || key === "context") {
      if (ts.isIdentifier(element.name)) addSymbol(flow.roots, element.name, a);
      else if (ts.isObjectBindingPattern(element.name)) {
        const nested = bindingHazard(element.name, flow);
        if (nested !== undefined) return nested;
      } else return unknownAt(a, element, "the test context is destructured through an array pattern");
      continue;
    }
    if (CONTEXT_API.has(key)) {
      if (key === "expect" && ts.isIdentifier(element.name)) addSymbol(flow.expects, element.name, a);
      continue;
    }
    if (CONTEXT_REGISTRARS.has(key)) {
      if (!ts.isIdentifier(element.name)) return unknownAt(a, element, `the test context's ${key} is destructured through a pattern`);
      addSymbol(flow.registrars, element.name, a);
      continue;
    }
    bindDerived(element.name, flow);
  }
  return undefined;
}

/** A parameter vitest fills with the context (a case's, a hook's, a registered handler's) joins the roots. */
function seedParameter(parameter: ts.ParameterDeclaration, flow: ContextFlow): Hazard | undefined {
  const a = flow.a;
  if (parameter.dotDotDotToken !== undefined) return unknownAt(a, parameter, "a rest parameter collects the test context");
  if (ts.isIdentifier(parameter.name)) {
    addSymbol(flow.roots, parameter.name, a);
    return undefined;
  }
  if (ts.isObjectBindingPattern(parameter.name)) return bindingHazard(parameter.name, flow);
  return unknownAt(a, parameter, "the test context is destructured through an array pattern");
}

/** The arguments object a function (not an arrow) reads in its own body, nested arrows included, or undefined. */
function argumentsRead(fn: AnalysedFunction): ts.Identifier | undefined {
  if (fn.body === undefined || ts.isArrowFunction(fn)) return undefined;
  let reads: ts.Identifier | undefined;
  const visit = (node: ts.Node): void => {
    if (reads !== undefined || ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node)) return;
    if (ts.isIdentifier(node) && node.text === "arguments" && isReference(node)) reads = node;
    else ts.forEachChild(node, visit);
  };
  ts.forEachChild(fn.body, visit);
  return reads;
}

/**
 * A handler vitest calls WITH the test context (onTestFailed / onTestFinished): its own parameters are context roots,
 * read as a flow of their own - a function literal, or a same-file function by name; anything else is unreadable.
 */
function handlerHazard(call: ts.CallExpression, registrar: string, a: SourceAnalysis, seen: Set<ts.Node>): Hazard | undefined {
  const handler = call.arguments[0];
  if (handler === undefined) return undefined;
  const literal = unwrap(handler);
  const fn = isFunctionLiteral(literal) ? literal : localFunction(handler, a);
  if (fn === undefined) return unknownAt(a, handler, `the handler ${registrar} registers is not a function the census can read`);
  const reads = argumentsRead(fn);
  if (reads !== undefined) return unknownAt(a, reads, `the handler ${registrar} registers reads the arguments object`);
  through("context.handler", call);
  const found = contextHazard(fn, { from: 0 }, a, seen);
  if (found === undefined || fn === literal) return found;
  return { kind: found.kind, detail: `the handler ${nodeText(handler, a)} that ${registrar} registers: ${found.detail}` };
}

/** context.handler: vitest's onTestFailed / onTestFinished (through the registration rows) or a destructured context registrar a call invokes directly, or undefined. */
function registrarCalled(call: ts.CallExpression, flow: ContextFlow): string | undefined {
  const callee = unwrap(call.expression);
  if (ts.isIdentifier(callee)) {
    const symbol = flow.a.checker.getSymbolAtLocation(callee);
    if (symbol !== undefined && flow.registrars.has(symbol)) return through("context.handler", callee.text);
  }
  const resolved = resolveChain(call.expression, flow.a);
  return "unresolved" in resolved || resolved.method || resolved.api !== "registrar" ? undefined : through("context.handler", resolved.name);
}

/** context.handler: a destructured context registrar may only be called directly (registrarCalled reads that call). */
function registrarUse(reference: ts.Identifier, flow: ContextFlow): Hazard | undefined {
  const node = climbWrappers(reference);
  const parent = node.parent;
  return ts.isCallExpression(parent) && parent.expression === node ? undefined : unknownAt(flow.a, parent, `the test context's ${reference.text} is used other than by calling it`);
}

/** How the context flow reads an identifier for the assertion predicates: a context root, its expect, or an import. */
const contextRootOf =
  (flow: ContextFlow): RootOf =>
  (id: ts.Identifier): AssertionRoot | undefined => {
    const symbol = flow.a.checker.getSymbolAtLocation(id);
    if (symbol !== undefined && flow.roots.has(symbol)) return "context";
    if (symbol !== undefined && flow.expects.has(symbol)) return "expect";
    return importedAssertionRoot(id, flow.a);
  };

/**
 * context.checked: is a call one vitest checks a value through - expect(v) / expect.soft(v) / ctx.expect(v), an assert
 * call, or one of MATCHERS on an expect chain (assertionKind)? A NON_MATCHERS member or any other name receives the
 * value unchecked.
 */
function checksValue(call: ts.CallExpression, flow: ContextFlow): boolean {
  const rootOf = contextRootOf(flow);
  const checked = isExpectConstructor(call.expression, rootOf) || isAssertBase(call.expression, rootOf) || assertionKind(call, rootOf) !== undefined;
  if (checked) through("context.checked", call);
  return checked;
}

/**
 * Runner state an assertion checks reaches the callbacks its chain is handed (toSatisfy((value) => ...)): their
 * parameters join the derived values, so a write there is read like one in the case body.
 */
function bindCallbacks(call: ts.CallExpression, flow: ContextFlow, value: ts.Expression): Hazard | undefined {
  let top: ts.Expression = call;
  for (;;) {
    const node = climbWrappers(top);
    const parent = node.parent;
    if (((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === node) || (ts.isCallExpression(parent) && parent.expression === node)) top = parent;
    else break;
  }
  for (let link: ts.Expression = unwrap(top); ; ) {
    if (ts.isCallExpression(link)) {
      for (const argument of link.arguments) {
        const fn = unwrap(argument);
        if (isFunctionLiteral(fn)) {
          for (const parameter of fn.parameters) bindDerived(parameter.name, flow);
          continue;
        }
        // context.checked (u62 respin-4): a check may CALL another argument with the checked state (toSatisfy(fn), an
        // object carrying asymmetricMatch), so every other argument is inert, or a read of the flow (classified on its own)
        if (argument === value || flowRead(argument, flow) || inertValue(argument, flow.a)) continue;
        return unknownAt(flow.a, argument, `${nodeText(argument, flow.a)}, handed to the check of runner state, may be called with that state (toSatisfy, an object carrying asymmetricMatch); only a literal, a template, an operator yielding a primitive, an object or array literal of such values, a const bound to a primitive, or a function literal is read there`);
      }
      link = unwrap(link.expression);
    } else if (ts.isPropertyAccessExpression(link) || ts.isElementAccessExpression(link)) link = unwrap(link.expression);
    else break;
  }
  return undefined;
}

/** Is an expression a read of the flow's own state - a root, a derived value, or a member chain off one (each such read is classified on its own)? */
function flowRead(expression: ts.Expression, flow: ContextFlow): boolean {
  let target = unwrap(expression);
  while (ts.isPropertyAccessExpression(target) || ts.isElementAccessExpression(target)) target = unwrap(target.expression);
  if (!ts.isIdentifier(target)) return false;
  const symbol = flow.a.checker.getSymbolAtLocation(target);
  return symbol !== undefined && (flow.roots.has(symbol) || flow.derived.has(symbol));
}

/**
 * context.checked: a value no check can call - a literal, a template, an operator yielding a primitive, an object or
 * array literal of such values, or a const bound to a primitive one (an object a const holds may gain a method later).
 */
function inertValue(expression: ts.Expression, a: SourceAnalysis, depth = 0): boolean {
  const value = unwrap(expression);
  if (depth > 6) return false;
  if (ts.isStringLiteralLike(value) || ts.isNumericLiteral(value) || ts.isBigIntLiteral(value) || ts.isRegularExpressionLiteral(value) || ts.isTemplateExpression(value)) return true;
  if (value.kind === ts.SyntaxKind.TrueKeyword || value.kind === ts.SyntaxKind.FalseKeyword || value.kind === ts.SyntaxKind.NullKeyword) return true;
  if (ts.isPrefixUnaryExpression(value) || ts.isTypeOfExpression(value) || ts.isVoidExpression(value)) return true;
  if (ts.isBinaryExpression(value)) {
    if (READ_OPERATORS.has(value.operatorToken.kind)) return true;
    return FLOW_OPERATORS.has(value.operatorToken.kind) && inertValue(value.left, a, depth + 1) && inertValue(value.right, a, depth + 1);
  }
  if (ts.isConditionalExpression(value)) return inertValue(value.whenTrue, a, depth + 1) && inertValue(value.whenFalse, a, depth + 1);
  if (ts.isArrayLiteralExpression(value)) return value.elements.every(element => !ts.isSpreadElement(element) && !ts.isOmittedExpression(element) && inertValue(element, a, depth + 1));
  if (ts.isObjectLiteralExpression(value)) {
    return value.properties.every(
      property => (ts.isPropertyAssignment(property) && !ts.isComputedPropertyName(property.name) && inertValue(property.initializer, a, depth + 1)) || (ts.isShorthandPropertyAssignment(property) && inertValue(property.name, a, depth + 1)),
    );
  }
  if (!ts.isIdentifier(value)) return false;
  const declarations = a.checker.getSymbolAtLocation(value)?.declarations;
  if (value.text === "undefined") return declarations === undefined || declarations.length === 0;
  const declaration = declarations?.[0];
  if (declaration === undefined || !ts.isVariableDeclaration(declaration) || !isConst(declaration) || declaration.initializer === undefined) return false;
  const initializer = unwrap(declaration.initializer);
  return !ts.isObjectLiteralExpression(initializer) && !ts.isArrayLiteralExpression(initializer) && inertValue(initializer, a, depth + 1);
}

/** One member read off a ROOT: a write fails closed, skip is the hazard, task / context re-enter, the APIs are benign. */
function memberHazard(access: ts.Expression, name: string, flow: ContextFlow): Hazard | undefined {
  const a = flow.a;
  if (writes(access)) return unknownAt(a, access, `${nodeText(access, a)} is written through the test context`);
  through("context.member", access);
  if (name === "skip") return skipAt(a, access, `${access.getText(a.sf)} reaches the test context's skip`);
  if (name === "task" || name === "context") return useHazard(access, flow);
  if (CONTEXT_API.has(name)) return undefined;
  if (CONTEXT_REGISTRARS.has(name)) {
    const node = climbWrappers(access);
    const parent = node.parent;
    if (!ts.isCallExpression(parent) || parent.expression !== node) return unknownAt(a, parent, `${nodeText(access, a)} is used other than by calling it`);
    return handlerHazard(parent, nodeText(access, a), a, flow.seen);
  }
  return derivedHazard(access, flow);
}

/** How one reference to a ROOT (the context, its task, or an alias of either) is used. */
function useHazard(reference: ts.Expression, flow: ContextFlow): Hazard | undefined {
  const a = flow.a;
  const node = climbWrappers(reference);
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.expression === node) return memberHazard(parent, parent.name.text, flow);
  if (ts.isElementAccessExpression(parent) && parent.expression === node) {
    const key = unwrap(parent.argumentExpression);
    return ts.isStringLiteralLike(key) ? memberHazard(parent, key.text, flow) : unknownAt(a, parent, "the test context is read through a computed key");
  }
  if (ts.isVariableDeclaration(parent) && parent.initializer === node) {
    through("context.alias", parent);
    if (ts.isIdentifier(parent.name)) {
      addSymbol(flow.roots, parent.name, a);
      return undefined;
    }
    if (ts.isObjectBindingPattern(parent.name)) return bindingHazard(parent.name, flow);
    return unknownAt(a, parent, "the test context is destructured through an array pattern");
  }
  if (ts.isVoidExpression(parent) || ts.isTypeOfExpression(parent) || ts.isExpressionStatement(parent)) return through("context.discard", undefined);
  if (ts.isCallExpression(parent) && parent.expression === node) return unknownAt(a, parent, "the test context is called");
  if ((ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.arguments?.some(argument => argument === node)) return unknownAt(a, parent, "the test context is handed to a call");
  return unknownAt(a, parent, `the test context is used as ${ts.SyntaxKind[parent.kind] ?? "an expression"}`);
}

/**
 * How runner state reached through the context (DERIVED) is used: read on, compared, tested, interpolated, or checked
 * by a vitest assertion it stops mattering; through || / ?? / a ternary branch it flows on; written it is
 * context-unknown; called, handed to any other call, or flowing anywhere else it fails closed.
 */
function derivedHazard(value: ts.Expression, flow: ContextFlow): Hazard | undefined {
  const a = flow.a;
  const node = climbWrappers(value);
  const parent = node.parent;
  const what = `${nodeText(node, a)}, reached through the test context,`;
  if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === node) {
    if (writes(parent)) return unknownAt(a, parent, `${nodeText(parent, a)} is written through the test context`);
    return derivedHazard(parent, flow);
  }
  if (writes(node)) return unknownAt(a, node, `${nodeText(node, a)} is written through the test context`);
  if (ts.isCallExpression(parent) && parent.expression === node) return unknownAt(a, parent, `${what} is called`);
  if ((ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.arguments?.some(argument => argument === node)) {
    if (!ts.isCallExpression(parent) || !checksValue(parent, flow)) return unknownAt(a, parent, `${what} is handed to a call`);
    const called = bindCallbacks(parent, flow, node);
    if (called !== undefined) return called;
    return through("context.derived", undefined);
  }
  if (ts.isVariableDeclaration(parent) && parent.initializer === node) {
    bindDerived(parent.name, flow);
    return through("context.derived", undefined);
  }
  if ((ts.isForOfStatement(parent) || ts.isForInStatement(parent)) && parent.expression === node) {
    if (!ts.isVariableDeclarationList(parent.initializer)) return unknownAt(a, parent, `${what} is iterated into an assignment target`);
    for (const declaration of parent.initializer.declarations) bindDerived(declaration.name, flow);
    return through("context.derived", undefined);
  }
  if (ts.isBinaryExpression(parent) && FLOW_OPERATORS.has(parent.operatorToken.kind)) {
    // a && b only TESTS a: it flows on only when falsy, a primitive; a comma's left operand is discarded
    const tested = parent.left === node && (parent.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken || parent.operatorToken.kind === ts.SyntaxKind.CommaToken);
    return tested ? through("context.derived", undefined) : derivedHazard(parent, flow);
  }
  if (ts.isConditionalExpression(parent)) return parent.condition === node ? through("context.derived", undefined) : derivedHazard(parent, flow);
  if (ts.isExpressionStatement(parent) || ts.isVoidExpression(parent) || ts.isTypeOfExpression(parent) || ts.isTemplateSpan(parent)) return through("context.derived", undefined);
  if (ts.isPrefixUnaryExpression(parent) || (ts.isBinaryExpression(parent) && READ_OPERATORS.has(parent.operatorToken.kind))) return through("context.derived", undefined);
  if (ts.isIfStatement(parent) || ts.isWhileStatement(parent) || ts.isDoStatement(parent) || ts.isSwitchStatement(parent) || ts.isCaseClause(parent)) return through("context.derived", undefined);
  if (ts.isForStatement(parent) && parent.condition === node) return through("context.derived", undefined);
  return unknownAt(a, parent, `${what} is used as ${ts.SyntaxKind[parent.kind] ?? "an expression"}`);
}

/** Identifiers that read a binding (not declaration names, member names or object keys). */
function isReference(id: ts.Identifier): boolean {
  const parent = id.parent;
  if ((ts.isPropertyAccessExpression(parent) && parent.name === id) || (ts.isQualifiedName(parent) && parent.right === id)) return false;
  if ((ts.isPropertyAssignment(parent) || ts.isMethodDeclaration(parent) || ts.isPropertyDeclaration(parent)) && parent.name === id) return false;
  if ((ts.isBindingElement(parent) && (parent.name === id || parent.propertyName === id)) || (ts.isParameter(parent) && parent.name === id)) return false;
  if ((ts.isVariableDeclaration(parent) || ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent)) && parent.name === id) return false;
  return !ts.isImportSpecifier(parent) && !ts.isImportClause(parent) && !ts.isLabeledStatement(parent) && !ts.isBreakOrContinueStatement(parent);
}

/** vitest's around hooks take the run function first (aroundEach(runTest, context, suite)); a hook's later parameters, like every other hook's, are runner state. */
const RUN_FIRST: ReadonlySet<string> = new Set(["aroundEach", "aroundAll"]);
/** The parameters contextHazard seeds: the case's context parameter by its index, or a hook's or handler's from an index on. */
type ContextSeed = number | { readonly from: number };

/**
 * Does fn reach the vitest test context's skip, or write runner state through it, through its context parameter(s), the
 * arguments object, or a handler it registers? A skip anywhere outranks an unknown use; anything unread is unknown.
 */
function contextHazard(fn: AnalysedFunction, seed: ContextSeed, a: SourceAnalysis, seen: Set<ts.Node> = new Set()): Hazard | undefined {
  const body = fn.body;
  if (body === undefined || seen.has(fn)) return undefined;
  seen.add(fn);
  const reads = argumentsRead(fn);
  if (reads !== undefined) return unknownAt(a, reads, "the case reads the arguments object");
  const flow = new ContextFlow(a, seen);
  const seeded = typeof seed === "number" ? fn.parameters.filter((_parameter, position) => position === seed) : fn.parameters.slice(seed.from);
  for (const parameter of seeded) {
    const hazard = seedParameter(parameter, flow);
    if (hazard !== undefined) return hazard;
  }
  through("context.seed", fn);
  let known = -1;
  while (known !== flow.size()) {
    known = flow.size();
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node)) {
        const registrar = registrarCalled(node, flow);
        if (registrar !== undefined) flow.record(handlerHazard(node, registrar, a, seen));
      }
      if (ts.isShorthandPropertyAssignment(node)) {
        const value = a.checker.getShorthandAssignmentValueSymbol(node);
        if (value !== undefined && (flow.roots.has(value) || flow.derived.has(value) || flow.registrars.has(value))) flow.record(unknownAt(a, node, "the test context is placed into an object literal"));
        return;
      }
      if (ts.isIdentifier(node) && isReference(node)) {
        const symbol = a.checker.getSymbolAtLocation(node);
        if (symbol !== undefined && flow.roots.has(symbol)) flow.record(useHazard(node, flow));
        else if (symbol !== undefined && flow.derived.has(symbol)) flow.record(derivedHazard(node, flow));
        else if (symbol !== undefined && flow.registrars.has(symbol)) flow.record(registrarUse(node, flow));
        return;
      }
      ts.forEachChild(node, visit);
    };
    visit(body);
  }
  return flow.skip ?? flow.unknown;
}

function moduleOf(declaration: ts.Declaration): string | undefined {
  let node: ts.Node = declaration;
  while (!ts.isImportDeclaration(node)) {
    if (ts.isSourceFile(node)) return undefined;
    node = node.parent;
  }
  return ts.isStringLiteral(node.moduleSpecifier) ? node.moduleSpecifier.text : undefined;
}

/** A same-file function an expression names (a function declaration or a const bound to a function literal). */
function localFunction(expression: ts.Expression, a: SourceAnalysis): AnalysedFunction | undefined {
  const target = unwrap(expression);
  if (isFunctionLiteral(target)) return target;
  if (!ts.isIdentifier(target)) return undefined;
  const declaration = a.checker.getSymbolAtLocation(target)?.declarations?.[0];
  if (declaration === undefined) return undefined;
  if (ts.isFunctionDeclaration(declaration) && declaration.body !== undefined) return declaration;
  if (ts.isVariableDeclaration(declaration) && declaration.initializer !== undefined) {
    const initializer = unwrap(declaration.initializer);
    if (isFunctionLiteral(initializer)) return initializer;
  }
  return undefined;
}

/** Vitest hooks lexically in the pin's own enclosing call chain (enclosing function bodies up to the file), never siblings. */
function chainHazard(call: ts.CallExpression, a: SourceAnalysis, registered: ReadonlySet<string>, sources: SourceCache): Hazard | undefined {
  const scopes: ts.Node[] = [];
  for (let node: ts.Node = call; node.parent !== undefined; node = node.parent) {
    const parent = node.parent;
    if (isFunctionLiteral(parent) || ts.isFunctionDeclaration(parent)) {
      if (parent.body !== undefined) scopes.push(parent.body);
    } else if (ts.isSourceFile(parent)) scopes.push(parent);
  }
  for (const scope of scopes) {
    const hazard = scopeHazard(scope, a, registered, sources);
    if (hazard !== undefined) return hazard;
  }
  // context.follow (u62 respin-4, R1): the top level of every module the pinned file loads runs at import, inside the
  // file's collection, so a hook it registers is a hook of every pin (a module whose closure never touches vitest has none)
  for (const member of importClosure(a)) {
    if (member.module === a || !closureTouchesVitest(member.module)) continue;
    through("context.follow", member.module);
    const hazard = scopeHazard(member.module.sf, member.module, new Set(), sources);
    if (hazard !== undefined) return { kind: hazard.kind, detail: `in ${member.via}: ${hazard.detail}` };
  }
  return undefined;
}

/** The vitest hooks one scope of the chain registers - its own statements, never a function or class it only declares - read as context flows. */
function scopeHazard(scope: ts.Node, a: SourceAnalysis, registered: ReadonlySet<string>, sources: SourceCache): Hazard | undefined {
  let hazard: Hazard | undefined;
  const visit = (node: ts.Node): void => {
    if (hazard !== undefined || isFunctionLiteral(node) || ts.isFunctionDeclaration(node) || ts.isClassLike(node)) return;
    if (ts.isCallExpression(node)) {
      // u62 respin-3: EVERY vitest hook - afterEach / afterAll run before the runner reads fails too - however the
      // registration rows resolve it (a named or namespace import, a global, a const alias, the test API's own
      // it.beforeEach, context.hook-parameter), read before the registration skip, which would otherwise take
      // it.beforeEach for a sibling registration of it (context.hook).
      const hook = hookCalled(node, a);
      if (hook !== undefined) {
        // A vitest hook's callback is its first argument; a second argument is its timeout.
        const callback = node.arguments[0];
        const fn = callback === undefined ? undefined : localFunction(callback, a);
        if (callback !== undefined && fn === undefined) hazard = unknownAt(a, callback, `the ${hook} callback is not statically analysable`);
        const found = fn === undefined ? undefined : (contextHazard(fn, { from: RUN_FIRST.has(hook) ? 1 : 0 }, a) ?? (fn.body === undefined ? undefined : runnerRoute(fn.body, a, sources, `the ${hook} callback`)));
        if (found !== undefined) hazard = { kind: found.kind, detail: `${hook} at ${a.where(node)}: ${found.detail}` };
        return;
      }
      // context.sibling: a registration (located by the runner, or resolved to vitest's API) is a sibling task, never a hook.
      if (a.callKeys(node).some(key => registered.has(key)) || registrationApi(node, a) !== undefined) {
        through("context.sibling", node);
        return;
      }
      // J5: a call of the pin's own chain that reaches the runner's current suite or test, e.g. getCurrentSuite().on(...).
      const runner = runnerRoute(node.expression, a, sources, "a call in the pin's own call chain");
      if (runner !== undefined) {
        hazard = runner;
        return;
      }
      for (const argument of node.arguments) {
        if (hazard !== undefined) return;
        const fn = unwrap(argument);
        if (isFunctionLiteral(fn)) visit(fn.body);
        else {
          // context.follow (u62 respin-4): code an argument names - a function, a class, a module's export - runs where
          // the callee calls it, so it is followed as the callee is
          hazard = runnerRoute(argument, a, sources, "an argument of a call in the pin's own call chain");
          visit(argument);
        }
      }
      visit(node.expression);
      return;
    }
    ts.forEachChild(node, visit);
  };
  if (ts.isSourceFile(scope)) for (const statement of scope.statements) visit(statement);
  else visit(scope);
  return hazard;
}

/** test.extend / test.override / test.scoped (vitest 4.1): fixtures, functions vitest calls WITH the test context. */
const FIXTURE_METHODS: ReadonlySet<string> = new Set(["extend", "override", "scoped"]);

/**
 * registration.method-call: a case registered through a fixture method (test.extend / override / scoped, however the
 * registration rows reach it - inline, an alias, a relative module's export) runs fixture code with its context, which
 * the census does not read.
 */
function fixtureHazard(call: ts.CallExpression, a: SourceAnalysis): Hazard | undefined {
  const resolved = resolveChain(call.expression, a);
  if ("unresolved" in resolved) return undefined;
  const fixture = resolved.members.find(member => FIXTURE_METHODS.has(member));
  return fixture === undefined ? undefined : unknownAt(a, call, `the case is registered through test.${fixture} fixtures, which the census does not analyse`);
}

// ---------------------------------------------------------------------------------------------
// J5: the runner's public current-test routes are test-context references (the test.extend precedent).
// ---------------------------------------------------------------------------------------------

/** Modules whose exports reach the runner's current test or suite (vitest/suite re-exports @vitest/runner; vitest/runners). */
const RUNNER_MODULES = new Set(["vitest/suite", "@vitest/runner", "vitest/runners"]);
/** The vitest entry's runner classes: their statics reach the current test (TestRunner.getCurrentTest(), the 4.1 route). */
const RUNNER_CLASSES = new Set(["TestRunner", "VitestTestRunner"]);
/** Modules a dynamic import() or require() may load to reach the runner. */
const RUNNER_LOADS = new Set([...RUNNER_MODULES, "vitest"]);

/** What a reference reaches of the runner's internals: an import from a runner module, or the vitest entry's runner class. */
function runnerBinding(id: ts.Identifier, a: SourceAnalysis): string | undefined {
  const declaration = a.checker.getSymbolAtLocation(id)?.declarations?.[0];
  if (declaration === undefined || !(ts.isImportSpecifier(declaration) || ts.isImportClause(declaration) || ts.isNamespaceImport(declaration))) return undefined;
  const from = moduleOf(declaration);
  if (from === undefined) return undefined;
  const imported = ts.isImportSpecifier(declaration) ? (declaration.propertyName ?? declaration.name).text : id.text;
  if (RUNNER_MODULES.has(from)) return `${imported} from ${from}`;
  if (from !== "vitest") return undefined;
  if (ts.isImportSpecifier(declaration)) return RUNNER_CLASSES.has(imported) ? `${imported} from vitest` : undefined;
  const parent = id.parent;
  if (ts.isNamespaceImport(declaration) && ts.isPropertyAccessExpression(parent) && parent.expression === id && RUNNER_CLASSES.has(parent.name.text)) return `${parent.name.text} from vitest`;
  return undefined;
}

/**
 * context.runner-placed (u62 respin-4): a runner binding CALLED on the spot - getCurrentTest(), getCurrentSuite(), a
 * runner namespace's or TestRunner's member called - in the own synchronous code of a case body or a suite factory (the
 * function literal itself handed to a resolved it / test / describe / suite call, not a function, class or callback
 * nested in it, not a hook callback) reaches the case or suite the runner calls that literal for: the pin's own chain is
 * J5's to read, another case's is C1 (the named sibling-case residual). Anywhere else - module code, a hook callback, a
 * function kept on a member or in a list, a class, an async or generator literal (its code after an await may run in
 * another case's turn), a binding not called on the spot (an alias, an argument, a bound copy) - it may reach any pin's
 * run, so it escapes (registration.integrity).
 */
function runnerPlaced(id: ts.Identifier, a: SourceAnalysis): boolean {
  const declaration = a.checker.getSymbolAtLocation(id)?.declarations?.[0];
  const holder =
    declaration !== undefined &&
    (ts.isNamespaceImport(declaration) || ts.isImportClause(declaration) || (ts.isImportSpecifier(declaration) && RUNNER_CLASSES.has((declaration.propertyName ?? declaration.name).text)));
  let callee: ts.Expression = climbWrappers(id);
  if (holder) {
    // a namespace or a runner class: exactly one literal member, called
    const access = callee.parent;
    if (!(ts.isPropertyAccessExpression(access) || ts.isElementAccessExpression(access)) || access.expression !== callee || accessedName(access) === undefined) return false;
    callee = climbWrappers(access);
  }
  const call = callee.parent;
  if (!ts.isCallExpression(call) || call.expression !== callee) return false;
  for (let node: ts.Node = call; node.parent !== undefined; node = node.parent) {
    const parent = node.parent;
    if (ts.isSourceFile(parent) || ts.isClassLike(parent) || ts.isClassStaticBlockDeclaration(parent)) return false;
    if (isFunctionLiteral(parent)) {
      if ((ts.isFunctionExpression(parent) && parent.asteriskToken !== undefined) || hasModifier(parent, ts.SyntaxKind.AsyncKeyword)) return false;
      const registration = callHolding(parent);
      if (registration === undefined) return false;
      const chain = resolveChain(registration.expression, a);
      if ("unresolved" in chain || chain.method || (chain.api !== "test" && chain.api !== "suite")) return false;
      through("context.runner-placed", call);
      return true;
    }
    if (ts.isFunctionLike(parent)) return false;
  }
  return false;
}

/**
 * A re-export that hands its importers a runner binding (registration.integrity): export * or export { ... } from a
 * runner module, vitest's TestRunner (export * from "vitest" included), or a local re-export of an imported one. Its
 * importers' references carry no runner binding by their own declaration, so it escapes where it stands.
 */
function runnerReexport(node: ts.ExportDeclaration, from: string | undefined, a: SourceAnalysis): string | undefined {
  if (from !== undefined && RUNNER_MODULES.has(from)) return from;
  const clause = node.exportClause;
  if (from === "vitest") {
    if (clause === undefined) return "vitest's TestRunner";
    if (!ts.isNamedExports(clause)) return undefined;
    const runner = clause.elements.find(element => RUNNER_CLASSES.has((element.propertyName ?? element.name).text));
    return runner === undefined ? undefined : `${(runner.propertyName ?? runner.name).text} from vitest`;
  }
  if (from !== undefined || clause === undefined || !ts.isNamedExports(clause)) return undefined;
  for (const element of clause.elements) {
    const local = a.checker.getExportSpecifierLocalTargetSymbol(element)?.declarations?.[0];
    if (local === undefined || !(ts.isImportSpecifier(local) || ts.isImportClause(local) || ts.isNamespaceImport(local))) continue;
    const module = moduleOf(local);
    if (module === undefined) continue;
    const imported = ts.isImportSpecifier(local) ? (local.propertyName ?? local.name).text : (element.propertyName ?? element.name).text;
    if (RUNNER_MODULES.has(module) || (module === "vitest" && ts.isImportSpecifier(local) && RUNNER_CLASSES.has(imported))) return `${imported} from ${module}`;
  }
  return undefined;
}

/** The module a dynamic import() or require() names with a literal specifier. */
function loadedModule(node: ts.Node): string | undefined {
  if (!ts.isCallExpression(node)) return undefined;
  const first = node.arguments[0];
  if (first === undefined || !ts.isStringLiteralLike(first)) return undefined;
  if (node.expression.kind === ts.SyntaxKind.ImportKeyword) return first.text;
  return ts.isIdentifier(node.expression) && node.expression.text === "require" ? first.text : undefined;
}

/**
 * Does code reach the runner's current test or suite (J5), or a vitest hook or context registrar whose callback the
 * context flow cannot read clean (context.hook, context.handler)? context.follow: a reference is followed to what it
 * binds - a same-file function or class (all of it, parameters included), a variable's initializer (a destructured
 * binding's whole initializer), a parameter's default - and into a relative module's export: named, default or
 * re-exported, or for a namespace import the member read (the whole module when the namespace is used otherwise).
 * Flow-insensitive on purpose: any reachable reference is a context reference the census cannot follow, so it fails
 * closed (context-unknown) instead of guessing whether the route skips. The walk has no depth bound; a module whose
 * import closure never touches vitest (moduleTouchesVitest) holds nothing it looks for, so it is not entered.
 */
function runnerRoute(root: ts.Node, a: SourceAnalysis, sources: SourceCache, what: string): Hazard | undefined {
  const seen = new Set<ts.Node>();
  let hazard: Hazard | undefined;
  const enter = (other: SourceAnalysis, name: string | undefined): void => {
    through("context.follow", other);
    if (!closureTouchesVitest(other)) return;
    if (name === undefined) scan(other.sf, other);
    else for (const target of exportTargets(other, name, 0)) scan(target.node, target.at);
  };
  const follow = (reference: ts.Identifier, declaration: ts.Declaration, at: SourceAnalysis): void => {
    if (ts.isVariableDeclaration(declaration)) {
      if (declaration.initializer !== undefined) scan(declaration.initializer, at);
    } else if (ts.isBindingElement(declaration)) {
      const whole = bindingRoot(declaration);
      if (whole?.initializer !== undefined) scan(whole.initializer, at);
    } else if (ts.isFunctionDeclaration(declaration) || ts.isClassDeclaration(declaration)) scan(declaration, at);
    else if (ts.isParameter(declaration)) {
      if (declaration.initializer !== undefined) scan(declaration.initializer, at);
    } else if (ts.isImportSpecifier(declaration) || ts.isImportClause(declaration) || ts.isNamespaceImport(declaration)) {
      const specifier = moduleOf(declaration);
      const other = specifier === undefined ? undefined : sources.module(at.file, specifier);
      if (other === undefined) return;
      if (ts.isImportSpecifier(declaration)) enter(other, (declaration.propertyName ?? declaration.name).text);
      else if (ts.isImportClause(declaration)) enter(other, "default");
      else {
        const parent = reference.parent;
        enter(other, (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === reference ? accessedName(parent) : undefined);
      }
    }
  };
  const scan = (node: ts.Node, at: SourceAnalysis): void => {
    if (hazard !== undefined || seen.has(node)) return;
    seen.add(node);
    const visit = (child: ts.Node): void => {
      if (hazard !== undefined) return;
      const loaded = loadedModule(child);
      if (loaded !== undefined && RUNNER_LOADS.has(loaded)) {
        hazard = unknownAt(at, child, `${what} imports ${loaded} dynamically, which reaches the runner's current test`);
        return;
      }
      if (ts.isCallExpression(child)) {
        const reached = registrationFlow(child, at);
        if (reached !== undefined) {
          hazard = { kind: reached.kind, detail: `${what} reaches ${reached.detail}` };
          return;
        }
      }
      if (ts.isIdentifier(child) && isReference(child)) {
        const binding = runnerBinding(child, at);
        if (binding !== undefined) {
          hazard = unknownAt(at, child, `${what} reaches the runner's current test through ${binding}`);
          return;
        }
        const declaration = valueSymbol(child, at)?.declarations?.[0];
        if (declaration !== undefined) follow(child, declaration, at);
      }
      ts.forEachChild(child, visit);
    };
    visit(node);
  };
  scan(root, a);
  return hazard;
}

/** The variable declaration a destructured binding element belongs to (through nested patterns), or undefined. */
function bindingRoot(element: ts.BindingElement): ts.VariableDeclaration | undefined {
  let node: ts.Node = element;
  while (ts.isBindingElement(node) || ts.isObjectBindingPattern(node) || ts.isArrayBindingPattern(node)) node = node.parent;
  return ts.isVariableDeclaration(node) ? node : undefined;
}

/** Does a declaration or statement carry a modifier (export, default)? */
const hasModifier = (node: ts.HasModifiers, kind: ts.SyntaxKind): boolean => ts.getModifiers(node)?.some(modifier => modifier.kind === kind) ?? false;

/** A module specifier's text (import / export declarations), or undefined. */
const specifierOf = (node: ts.ImportDeclaration | ts.ExportDeclaration): string | undefined => (node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier) ? node.moduleSpecifier.text : undefined);

/** Does a binding name (an identifier or a pattern) bind a given name? */
function bindsName(name: ts.BindingName, wanted: string): boolean {
  if (ts.isIdentifier(name)) return name.text === wanted;
  return name.elements.some(element => !ts.isOmittedExpression(element) && bindsName(element.name, wanted));
}

interface ExportTarget {
  readonly node: ts.Node;
  readonly at: SourceAnalysis;
}

/**
 * context.follow into a relative module: the code its export `name` runs - a function or class declaration, a
 * variable's initializer, a default export's expression - through local re-exports (export { local as name }) and
 * re-exports of other relative modules; a namespace re-export (export * as name) is that whole module. Past eight
 * re-export links it is the whole module (fail-closed).
 */
function exportTargets(m: SourceAnalysis, name: string, depth: number): readonly ExportTarget[] {
  if (depth > 8) return [{ node: m.sf, at: m }];
  const targets: ExportTarget[] = [];
  for (const statement of m.sf.statements) {
    if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) && hasModifier(statement, ts.SyntaxKind.ExportKeyword)) {
      const exported = hasModifier(statement, ts.SyntaxKind.DefaultKeyword) ? "default" : statement.name?.text;
      if (exported === name) targets.push({ node: statement, at: m });
    } else if (ts.isVariableStatement(statement) && hasModifier(statement, ts.SyntaxKind.ExportKeyword)) {
      for (const declaration of statement.declarationList.declarations) if (declaration.initializer !== undefined && bindsName(declaration.name, name)) targets.push({ node: declaration.initializer, at: m });
    } else if (ts.isExportAssignment(statement)) {
      if (!statement.isExportEquals && name === "default") targets.push({ node: statement.expression, at: m });
    } else if (ts.isExportDeclaration(statement) && !statement.isTypeOnly) {
      const from = specifierOf(statement);
      const other = from === undefined ? undefined : m.sources?.module(m.file, from);
      const clause = statement.exportClause;
      if (clause === undefined) {
        if (other !== undefined && name !== "default") targets.push(...exportTargets(other, name, depth + 1));
      } else if (ts.isNamespaceExport(clause)) {
        if (other !== undefined && clause.name.text === name) targets.push({ node: other.sf, at: other });
      } else {
        for (const element of clause.elements) {
          if (element.isTypeOnly || element.name.text !== name) continue;
          const local = (element.propertyName ?? element.name).text;
          if (other !== undefined) targets.push(...exportTargets(other, local, depth + 1));
          else if (from === undefined) targets.push(...localTargets(m, element, depth));
        }
      }
    }
  }
  return targets;
}

/** export { local as name } of a module's own binding: the code that binding runs (an imported one, the module it comes from). */
function localTargets(m: SourceAnalysis, element: ts.ExportSpecifier, depth: number): readonly ExportTarget[] {
  const declaration = m.checker.getExportSpecifierLocalTargetSymbol(element)?.declarations?.[0];
  if (declaration === undefined) return [];
  if (ts.isVariableDeclaration(declaration)) return declaration.initializer === undefined ? [] : [{ node: declaration.initializer, at: m }];
  if (ts.isBindingElement(declaration)) {
    const whole = bindingRoot(declaration);
    return whole?.initializer === undefined ? [] : [{ node: whole.initializer, at: m }];
  }
  if (ts.isFunctionDeclaration(declaration) || ts.isClassDeclaration(declaration)) return [{ node: declaration, at: m }];
  if (ts.isImportSpecifier(declaration) || ts.isImportClause(declaration) || ts.isNamespaceImport(declaration)) {
    const specifier = moduleOf(declaration);
    const other = specifier === undefined ? undefined : m.sources?.module(m.file, specifier);
    if (other === undefined) return [];
    if (ts.isNamespaceImport(declaration)) return [{ node: other.sf, at: other }];
    return exportTargets(other, ts.isImportSpecifier(declaration) ? (declaration.propertyName ?? declaration.name).text : "default", depth + 1);
  }
  return [];
}

// ---- the import closure: every relative module a file loads, and whether any of them touches vitest ----

interface ClosureMember {
  readonly module: SourceAnalysis;
  /** How the pinned file reaches it, for a red. */
  readonly via: string;
}
const LOADS = new WeakMap<SourceAnalysis, readonly { readonly text: string; readonly at: ts.Node }[]>();
const CLOSURES = new WeakMap<SourceAnalysis, readonly ClosureMember[]>();
const TOUCHES = new WeakMap<SourceAnalysis, boolean>();
const CLOSURE_TOUCHES = new WeakMap<SourceAnalysis, boolean>();

/** The relative module specifiers a module loads: imports and export-from declarations (type-only ones load nothing), literal dynamic import() / require(). */
function relativeLoads(m: SourceAnalysis): readonly { readonly text: string; readonly at: ts.Node }[] {
  const cached = LOADS.get(m);
  if (cached !== undefined) return cached;
  const loads: { readonly text: string; readonly at: ts.Node }[] = [];
  const add = (text: string | undefined, at: ts.Node): void => {
    if (text !== undefined && (text.startsWith("./") || text.startsWith("../"))) loads.push({ text, at });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node)) {
      if (node.importClause?.isTypeOnly !== true) add(specifierOf(node), node);
      return;
    }
    if (ts.isExportDeclaration(node)) {
      if (!node.isTypeOnly) add(specifierOf(node), node);
      return;
    }
    add(loadedModule(node), node);
    ts.forEachChild(node, visit);
  };
  visit(m.sf);
  LOADS.set(m, loads);
  return loads;
}

/** A module and every relative module it loads, transitively, breadth-first (each module once). */
function importClosure(m: SourceAnalysis): readonly ClosureMember[] {
  const cached = CLOSURES.get(m);
  if (cached !== undefined) return cached;
  const members: ClosureMember[] = [{ module: m, via: basename(m.file) }];
  const seen = new Set<SourceAnalysis>([m]);
  for (let index = 0; index < members.length; index += 1) {
    const member = members[index];
    if (member === undefined) break;
    for (const load of relativeLoads(member.module)) {
      const other = member.module.sources?.module(member.module.file, load.text);
      if (other === undefined || seen.has(other)) continue;
      seen.add(other);
      members.push({ module: other, via: `${load.text}, loaded at ${basename(member.module.file)} ${member.module.where(load.at)}` });
    }
  }
  CLOSURES.set(m, members);
  return members;
}

/**
 * Does a module's own code touch vitest: an import or re-export of vitest or a runner module, a dynamic load of one,
 * import.meta used other than to read a member that is not vitest, or an undeclared identifier vitest's globals name?
 * Only such code can reach vitest's API or the runner (a relative module re-exporting it touches vitest itself).
 */
function touchesVitest(m: SourceAnalysis): boolean {
  const cached = TOUCHES.get(m);
  if (cached !== undefined) return cached;
  let touches = false;
  const visit = (node: ts.Node): void => {
    if (touches) return;
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      const from = specifierOf(node);
      touches = from !== undefined && RUNNER_LOADS.has(from);
      return;
    }
    const loaded = loadedModule(node);
    if (loaded !== undefined && RUNNER_LOADS.has(loaded)) touches = true;
    else if (isImportMeta(node)) {
      const parent = climbWrappers(node).parent;
      const member = (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === climbWrappers(node) ? accessedName(parent) : undefined;
      touches = member === undefined || member === "vitest";
    } else if (ts.isIdentifier(node) && API_NAMES.has(node.text) && isReference(node) && valueSymbol(node, m) === undefined) touches = true;
    else ts.forEachChild(node, visit);
  };
  visit(m.sf);
  TOUCHES.set(m, touches);
  return touches;
}

/** Does any module of a module's import closure touch vitest? */
function closureTouchesVitest(m: SourceAnalysis): boolean {
  const cached = CLOSURE_TOUCHES.get(m);
  if (cached !== undefined) return cached;
  const touches = importClosure(m).some(member => touchesVitest(member.module));
  CLOSURE_TOUCHES.set(m, touches);
  return touches;
}

/**
 * u62 respin-3: a vitest hook, or an onTestFailed / onTestFinished registration, that the J5 walk reaches in code the
 * pin's chain calls (a same-file or relative-module helper) hands its callback the test context, so each is read as a
 * context flow of its own (context.hook, context.handler); undefined when the call is neither, or its flow reads clean.
 */
function registrationFlow(call: ts.CallExpression, a: SourceAnalysis): Hazard | undefined {
  const resolved = resolveChain(call.expression, a);
  if ("unresolved" in resolved || resolved.method) return undefined;
  if (resolved.api === "registrar") {
    through("context.handler", call);
    const found = handlerHazard(call, resolved.name, a, new Set());
    return found === undefined ? undefined : { kind: found.kind, detail: `the handler ${resolved.name} registers at ${a.where(call)}: ${found.detail}` };
  }
  if (resolved.api !== "hook") return undefined;
  through("context.hook", call);
  const callback = call.arguments[0];
  if (callback === undefined) return undefined;
  const fn = localFunction(callback, a);
  if (fn === undefined) return { kind: "unknown", detail: `the ${resolved.name} at ${a.where(call)}, whose callback is not statically analysable` };
  const found = contextHazard(fn, { from: RUN_FIRST.has(resolved.name) ? 1 : 0 }, a);
  return found === undefined ? undefined : { kind: found.kind, detail: `the ${resolved.name} at ${a.where(call)}: ${found.detail}` };
}

/** vitest's registration APIs: a call starting from one registers a test or a suite, never a hook. */
const REGISTRATIONS = new Set(["describe", "suite", "it", "test"]);

/** The vitest registration a call makes - it / test / describe / suite, resolved strictly through the registration rows - or undefined. */
function registrationApi(call: ts.CallExpression, a: SourceAnalysis): string | undefined {
  const resolved = resolveChain(call.expression, a);
  return "unresolved" in resolved || resolved.method || (resolved.api !== "test" && resolved.api !== "suite") ? undefined : resolved.name;
}


// ---------------------------------------------------------------------------------------------
// The registration flow read STRICTLY (u62 gate-3 U1, the design invariant): a chain resolves only through links vitest's
// own API defines - a root that IS vitest's it / test / describe / suite or one of its hooks (a named import, a namespace
// member, a global, or a const alias of a resolved chain) and members its runtime objects carry. Anything else - a
// user-added member, a let alias, a parameter, a call result that is not a chain method's - is unresolved, naming the link.
// ---------------------------------------------------------------------------------------------

/** vitest 4.1.10 (@vitest/runner createChainable / createTaskCollector): the flags and methods of it / test and of describe / suite. */
const TEST_FLAGS: ReadonlySet<string> = new Set(["concurrent", "sequential", "skip", "only", "todo", "fails"]);
const SUITE_FLAGS: ReadonlySet<string> = new Set(["concurrent", "sequential", "shuffle", "skip", "only", "todo"]);
/** Members that, called, return the chain's next registration function. */
const TEST_METHODS: ReadonlySet<string> = new Set(["each", "for", "skipIf", "runIf", "override", "scoped", "extend"]);
const SUITE_METHODS: ReadonlySet<string> = new Set(["each", "for", "skipIf", "runIf"]);
/** it.describe / it.suite are vitest's describe itself (taskFn.describe = suite): the chain switches to the suite API, its flags dropped. */
const SUITE_SWITCH: ReadonlySet<string> = new Set(["describe", "suite"]);
/** vitest's hooks: exported, and carried by it / test (taskFn.beforeEach = beforeEach, ...). */
const HOOK_NAMES: ReadonlySet<string> = new Set(["beforeEach", "afterEach", "beforeAll", "afterAll", "aroundEach", "aroundAll"]);

/** Every member report mode reads on vitest's registration objects (a row pins both lists against the installed runtime). */
export const REGISTRATION_MEMBERS: { readonly test: readonly string[]; readonly suite: readonly string[] } = {
  test: [...TEST_FLAGS, ...TEST_METHODS, ...SUITE_SWITCH, ...HOOK_NAMES].sort(),
  suite: [...SUITE_FLAGS, ...SUITE_METHODS].sort(),
};

/** A strictly resolved chain: which API it reaches, its root (hook or registrar) name, the members along it, and whether its last link is a chain method still to be called. */
interface ResolvedChain {
  readonly api: "test" | "suite" | "hook" | "registrar";
  readonly name: string;
  readonly members: readonly string[];
  readonly method: boolean;
}
type ChainResolution = ResolvedChain | { readonly unresolved: string };

/** Every name the registration rows resolve: it / test / describe / suite, the hooks and the context registrars. */
const API_NAMES: ReadonlySet<string> = new Set([...REGISTRATIONS, ...HOOK_NAMES, ...CONTEXT_REGISTRARS]);

function rootChain(name: string): ResolvedChain | undefined {
  if (REGISTRATIONS.has(name)) return { api: name === "it" || name === "test" ? "test" : "suite", name, members: [], method: false };
  if (HOOK_NAMES.has(name)) return { api: "hook", name, members: [], method: false };
  return CONTEXT_REGISTRARS.has(name) ? { api: "registrar", name, members: [], method: false } : undefined;
}

/** How a resolved API reads in a red. */
const apiLabel = (chain: ResolvedChain): string => (chain.api === "test" ? "test API" : chain.api === "suite" ? "suite API" : chain.api === "hook" ? "hook" : "context registrar");

/** The member a property or element access reads, or undefined for a computed non-literal key. */
function accessedName(access: ts.PropertyAccessExpression | ts.ElementAccessExpression): string | undefined {
  if (ts.isPropertyAccessExpression(access)) return access.name.text;
  const key = unwrap(access.argumentExpression);
  return ts.isStringLiteralLike(key) ? key.text : undefined;
}

/** import.meta itself. */
const isImportMeta = (node: ts.Node): node is ts.MetaProperty => ts.isMetaProperty(node) && node.keywordToken === ts.SyntaxKind.ImportKeyword && node.name.text === "meta";

/** import.meta.vitest, vitest's in-source handle: the same namespace object as import * as v from "vitest" (pinned). */
function isImportMetaVitest(expression: ts.Expression): boolean {
  const target = unwrap(expression);
  return (ts.isPropertyAccessExpression(target) || ts.isElementAccessExpression(target)) && accessedName(target) === "vitest" && isImportMeta(unwrap(target.expression));
}

/** The module a namespace import binds an identifier to, or undefined when it binds none. */
function namespaceOf(id: ts.Identifier, a: SourceAnalysis): string | undefined {
  const declaration = a.checker.getSymbolAtLocation(id)?.declarations?.[0];
  return declaration !== undefined && ts.isNamespaceImport(declaration) ? moduleOf(declaration) : undefined;
}

/** Is an expression vitest's namespace (registration.namespace): import * as v from "vitest", or import.meta.vitest? */
function isVitestNamespace(expression: ts.Expression, a: SourceAnalysis): boolean {
  const target = unwrap(expression);
  return ts.isIdentifier(target) ? namespaceOf(target, a) === "vitest" : isImportMetaVitest(target);
}

/** The symbol an identifier's VALUE reads: a shorthand property { it } reads the binding it names, not the property it declares. */
function valueSymbol(id: ts.Identifier, a: SourceAnalysis): ts.Symbol | undefined {
  const parent = id.parent;
  return ts.isShorthandPropertyAssignment(parent) && parent.name === id ? a.checker.getShorthandAssignmentValueSymbol(parent) : a.checker.getSymbolAtLocation(id);
}

/** registration.member: a link vitest's runtime object carries at this point of the chain. */
const memberOf = (chain: ResolvedChain): ResolvedChain => through("registration.member", chain);

/** One member link of a resolved chain, or why it does not resolve. */
function memberLink(chain: ResolvedChain, name: string): ChainResolution {
  if (chain.method) return { unresolved: `${name} is read off the uncalled chain method ${chain.members[chain.members.length - 1] ?? ""}` };
  if (chain.api === "hook" || chain.api === "registrar") return { unresolved: `${name} is not a member of vitest's ${chain.name} ${chain.api}` };
  const members = [...chain.members, name];
  if (chain.api === "test") {
    if (TEST_FLAGS.has(name)) return memberOf({ ...chain, members });
    if (TEST_METHODS.has(name)) return memberOf({ ...chain, members, method: true });
    if (SUITE_SWITCH.has(name)) return memberOf({ api: "suite", name, members: [], method: false });
    if (HOOK_NAMES.has(name)) return memberOf({ api: "hook", name, members: [], method: false });
    return { unresolved: `${name} is not a member of vitest's test API` };
  }
  if (SUITE_FLAGS.has(name)) return memberOf({ ...chain, members });
  if (SUITE_METHODS.has(name)) return memberOf({ ...chain, members, method: true });
  return { unresolved: `${name} is not a member of vitest's suite API` };
}

/** The vitest registration API (or hook, or context registrar) an identifier binds, read strictly. */
function resolveRoot(id: ts.Identifier, a: SourceAnalysis, depth: number): ChainResolution {
  const declaration = valueSymbol(id, a)?.declarations?.[0];
  // no declaration at all: a vitest global (globals: true)
  if (declaration === undefined) {
    const chain = rootChain(id.text);
    return chain === undefined ? { unresolved: `${id.text} at ${a.where(id)} is neither declared nor a vitest global` } : through("registration.global", chain);
  }
  return resolveDeclaration(declaration, id.text, a.where(id), a, depth);
}

/** What one declaration binds through the registration rows (registration.import / relative-export / alias, context.hook-parameter). */
function resolveDeclaration(declaration: ts.Declaration, text: string, where: string, a: SourceAnalysis, depth: number): ChainResolution {
  if (depth >= 8) return { unresolved: `${text} at ${where} is bound through more links than report mode follows` };
  if (ts.isImportSpecifier(declaration) || ts.isImportClause(declaration)) {
    const from = moduleOf(declaration);
    const refused: ChainResolution = { unresolved: `${text} at ${where} is imported from ${from ?? "a module"}, not vitest's registration API` };
    if (from === "vitest") {
      const chain = ts.isImportSpecifier(declaration) ? rootChain((declaration.propertyName ?? declaration.name).text) : undefined;
      return chain === undefined ? refused : through("registration.import", chain);
    }
    const imported = ts.isImportSpecifier(declaration) ? (declaration.propertyName ?? declaration.name).text : "default";
    const exported = from === undefined ? undefined : relativeExport(a, from, imported, depth + 1);
    return exported === undefined || "unresolved" in exported ? refused : through("registration.relative-export", exported);
  }
  if (ts.isVariableDeclaration(declaration)) {
    if (!isConst(declaration) || !ts.isIdentifier(declaration.name)) return { unresolved: `${text} at ${where} is not a const binding` };
    if (declaration.initializer === undefined) return { unresolved: `${text} at ${where} has no initializer report mode follows` };
    const resolved = resolveChain(declaration.initializer, a, depth + 1);
    return "unresolved" in resolved ? resolved : through("registration.alias", resolved);
  }
  if (ts.isParameter(declaration)) {
    const resolved = hookParameter(declaration, a, depth);
    if (resolved !== undefined) return resolved;
  }
  return { unresolved: `${text} at ${where} is bound by a ${ts.SyntaxKind[declaration.kind] ?? "declaration"}, not to vitest's registration API` };
}

/**
 * context.hook-parameter (the test/helpers/scratch.ts:125 and detached-peer.ts:96 shape): a parameter whose default
 * resolves to a vitest hook or context registrar, and that its function only ever calls directly, reads as that hook -
 * a caller injecting another function runs that function's own code, read where it is written; any other use of the
 * parameter is an escape (registration.integrity names it).
 */
function hookParameter(parameter: ts.ParameterDeclaration, a: SourceAnalysis, depth: number): ChainResolution | undefined {
  if (parameter.initializer === undefined || !ts.isIdentifier(parameter.name)) return undefined;
  const resolved = resolveChain(parameter.initializer, a, depth + 1);
  if ("unresolved" in resolved || resolved.method || (resolved.api !== "hook" && resolved.api !== "registrar")) return undefined;
  const misuse = parameterMisuse(parameter, a);
  return misuse === undefined ? through("context.hook-parameter", resolved) : { unresolved: `${parameter.name.text} at ${a.where(parameter)} defaults to vitest's ${resolved.name}, but ${misuse}` };
}

/** How a parameter is used other than as the callee of a direct call in its own function, or undefined when it never is. */
function parameterMisuse(parameter: ts.ParameterDeclaration, a: SourceAnalysis): string | undefined {
  const name = parameter.name;
  if (!ts.isIdentifier(name)) return "the parameter it defaults is a pattern";
  const symbol = a.checker.getSymbolAtLocation(name);
  if (symbol === undefined) return `the parameter ${name.text} it defaults is unbound`;
  let misuse: string | undefined;
  const visit = (node: ts.Node): void => {
    if (misuse !== undefined) return;
    if (ts.isIdentifier(node) && node !== name && isReference(node) && !inTypePosition(node) && valueSymbol(node, a) === symbol) {
      const current = climbWrappers(node);
      const parent = current.parent;
      if (!ts.isCallExpression(parent) || parent.expression !== current) misuse = `the parameter ${name.text} it defaults is used as ${ts.SyntaxKind[parent.kind] ?? "an expression"}`;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(parameter.parent);
  return misuse;
}

/** registration.relative-export: what a relative module's export resolves to, through its own re-exports and const bindings. */
function relativeExport(a: SourceAnalysis, specifier: string, name: string, depth: number): ChainResolution | undefined {
  const other = a.sources?.module(a.file, specifier);
  return other === undefined || depth >= 8 || !closureTouchesVitest(other) ? undefined : moduleExport(other, name, depth);
}

/** What a module's export `name` resolves to (export * / export { } from vitest or a relative module, export { local }, export const, export default). */
function moduleExport(m: SourceAnalysis, name: string, depth: number): ChainResolution | undefined {
  for (const statement of m.sf.statements) {
    if (ts.isExportDeclaration(statement)) {
      if (statement.isTypeOnly) continue;
      const from = specifierOf(statement);
      const clause = statement.exportClause;
      if (clause === undefined) {
        // export * from "...": every name but the default
        const found = name === "default" || from === undefined ? undefined : from === "vitest" ? rootChain(name) : relativeExport(m, from, name, depth + 1);
        if (found !== undefined && !("unresolved" in found)) return found;
        continue;
      }
      // export * as ns: a whole namespace, never a chain (registration.integrity refuses vitest's re-exported so)
      if (!ts.isNamedExports(clause)) continue;
      for (const element of clause.elements) {
        if (element.isTypeOnly || element.name.text !== name) continue;
        const local = (element.propertyName ?? element.name).text;
        if (from === "vitest") return rootChain(local) ?? { unresolved: `${name} is re-exported from vitest, but is not its registration API` };
        if (from !== undefined) return relativeExport(m, from, local, depth + 1);
        const target = m.checker.getExportSpecifierLocalTargetSymbol(element)?.declarations?.[0];
        return target === undefined ? undefined : resolveDeclaration(target, local, m.where(element), m, depth + 1);
      }
      continue;
    }
    if (ts.isVariableStatement(statement) && hasModifier(statement, ts.SyntaxKind.ExportKeyword)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.name.text === name) return resolveDeclaration(declaration, name, m.where(declaration), m, depth + 1);
      }
    }
    if (ts.isExportAssignment(statement) && !statement.isExportEquals && name === "default") return resolveChain(statement.expression, m, depth + 1);
  }
  return undefined;
}

/** Resolves a callee chain strictly: every link must be one a registration row resolves. */
function resolveChain(expression: ts.Expression, a: SourceAnalysis, depth = 0): ChainResolution {
  const node = unwrap(expression);
  if (ts.isIdentifier(node)) return resolveRoot(node, a, depth);
  if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
    const name = accessedName(node);
    if (name === undefined) return { unresolved: `the registration at ${a.where(node)} reaches a computed member` };
    const object = unwrap(node.expression);
    if (isVitestNamespace(object, a)) {
      const chain = rootChain(name);
      return chain === undefined ? { unresolved: `${name} is not vitest's it / test / describe / suite, one of its hooks or a context registrar` } : through("registration.namespace", chain);
    }
    const from = ts.isIdentifier(object) ? namespaceOf(object, a) : undefined;
    if (from !== undefined) {
      const exported = relativeExport(a, from, name, depth + 1);
      return exported === undefined || "unresolved" in exported ? { unresolved: `${name} is read off the namespace of ${from}, which does not resolve it to vitest's registration API` } : through("registration.relative-export", exported);
    }
    const inner = resolveChain(node.expression, a, depth);
    return "unresolved" in inner ? inner : memberLink(inner, name);
  }
  if (ts.isCallExpression(node) || ts.isTaggedTemplateExpression(node)) {
    const callee = resolveChain(ts.isCallExpression(node) ? node.expression : node.tag, a, depth);
    if ("unresolved" in callee) return callee;
    if (!callee.method) return { unresolved: `the call ${nodeText(node, a)} at ${a.where(node)} returns what a registration returns, not vitest's API` };
    return through("registration.method-call", { ...callee, method: false });
  }
  return { unresolved: `${nodeText(node, a)} at ${a.where(node)} is not vitest's registration API` };
}

/** The vitest hook a call registers (context.hook), however the registration rows resolve it, or undefined. */
function hookCalled(call: ts.CallExpression, a: SourceAnalysis): string | undefined {
  const resolved = resolveChain(call.expression, a);
  return "unresolved" in resolved || resolved.method || resolved.api !== "hook" ? undefined : through("context.hook", resolved.name);
}

/** Is a node inside a type (typeof it, a type argument): no runtime value flows there. */
function inTypePosition(node: ts.Node): boolean {
  for (let current: ts.Node | undefined = node.parent; current !== undefined && !ts.isSourceFile(current); current = current.parent) {
    if (ts.isTypeNode(current)) return true;
    if (ts.isExpression(current) || ts.isStatement(current)) return false;
  }
  return false;
}

// ---------------------------------------------------------------------------------------------
// registration.integrity (u62 respin-4, the roster's guard on every registration row): each reference to vitest's API -
// in the pinned file and in every relative module of its import closure, where all the code the walk follows lives -
// stands in an api-use position, or the flows through it are unreadable. An escape of it / test / describe / suite
// leaves the file's fails unreadable (options-unknown in report mode) and, since that API carries hooks (it.beforeEach)
// and returns suite collectors, also its test context; an escape of a hook, a registrar or a suite collector leaves
// every pin of the file context-unknown in BOTH modes.
// ---------------------------------------------------------------------------------------------

/** One escape: whether the escaping value is the registration API itself, and the red's text. */
interface Escape {
  readonly registration: boolean;
  readonly text: string;
}
/** What one module's own references let escape (the first of each consequence) and the roster rows the scan resolved through. */
interface ModuleIntegrity {
  readonly registration: string | undefined;
  readonly context: string | undefined;
  readonly rows: readonly RosterId[];
}
const OWN_INTEGRITY = new WeakMap<SourceAnalysis, ModuleIntegrity>();

/** How one API value leaves the api-use rows, for its red. */
type EscapeStep =
  | { readonly written: ts.Expression }
  | { readonly called: ts.Expression; readonly why: string }
  | { readonly aliased: ts.Expression; readonly why: string }
  | { readonly parameter: string }
  | { readonly handed: ts.Expression }
  | { readonly used: ts.Expression; readonly as: string };

function escapeOf(held: ResolvedChain, heldNode: ts.Expression, a: SourceAnalysis, step: EscapeStep): Escape {
  if (held.api === "test" || held.api === "suite") {
    let text: string;
    if ("written" in step) text = `${nodeText(step.written, a)} is written at ${a.where(step.written)}`;
    else if ("called" in step) text = `${nodeText(step.called, a)} at ${a.where(step.called)} is called, but ${step.why}`;
    else if ("aliased" in step) text = `${nodeText(step.aliased, a)} at ${a.where(step.aliased)} is aliased, but ${step.why}`;
    else if ("parameter" in step) text = `${nodeText(heldNode, a)} at ${a.where(heldNode)} defaults a parameter: ${step.parameter}`;
    else if ("handed" in step) text = `${nodeText(step.handed, a)} at ${a.where(step.handed)} is handed to a call`;
    else text = `${nodeText(step.used, a)} at ${a.where(step.used)} is used as ${step.as}`;
    return { registration: true, text };
  }
  let how: string;
  if ("written" in step) how = `${nodeText(step.written, a)} is written`;
  else if ("called" in step) how = `${nodeText(step.called, a)} is called, but ${step.why}`;
  else if ("aliased" in step) how = `it is aliased, but ${step.why}`;
  else if ("parameter" in step) how = step.parameter;
  else if ("handed" in step) how = "it is handed to a call";
  else how = `it is used as ${step.as}`;
  return { registration: false, text: `the vitest ${held.api} ${nodeText(heldNode, a)} at ${a.where(heldNode)} escapes: ${how}` };
}

/** api-use.collector: the suite collector a describe / suite call returns may only be discarded. */
function collectorUse(call: ts.Expression, name: string, a: SourceAnalysis): Escape | undefined {
  const current = climbWrappers(call);
  const parent = current.parent;
  if (ts.isExpressionStatement(parent) || ts.isVoidExpression(parent)) {
    through("api-use.collector", call);
    return undefined;
  }
  const handed = (ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.arguments?.some(argument => argument === current);
  return { registration: false, text: `the suite collector vitest's ${name} returns at ${a.where(call)} escapes: ${handed ? "it is handed to a call" : `it is used as ${ts.SyntaxKind[parent.kind] ?? "an expression"}`}` };
}

/** Where one reference to vitest's API leaves the api-use rows, or undefined when every step matches one. */
function apiUse(reference: ts.Expression, a: SourceAnalysis): Escape | undefined {
  const start = resolveChain(reference, a);
  if ("unresolved" in start) return undefined;
  let held: ResolvedChain = start;
  let heldNode: ts.Expression = reference;
  let node: ts.Expression = reference;
  for (;;) {
    const current = climbWrappers(node);
    const parent = current.parent;
    if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === current) {
      if (writes(parent)) return escapeOf(held, heldNode, a, { written: parent });
      through("api-use.member-read", parent);
      const next = resolveChain(parent, a);
      if (!("unresolved" in next)) {
        // registration.method-call: a fixture method defines functions vitest calls with the test context
        const member = accessedName(parent);
        if (held.api === "test" && !held.method && member !== undefined && FIXTURE_METHODS.has(member)) {
          return { registration: false, text: `${nodeText(parent, a)} at ${a.where(parent)} defines test fixtures, which vitest calls with the test context and the census does not read` };
        }
        held = next;
        heldNode = parent;
      }
      node = parent;
      continue;
    }
    if ((ts.isCallExpression(parent) && parent.expression === current) || (ts.isTaggedTemplateExpression(parent) && parent.tag === current)) {
      const resolved = resolveChain(current, a);
      if ("unresolved" in resolved) return escapeOf(held, heldNode, a, { called: current, why: resolved.unresolved });
      through("api-use.call", parent);
      if (resolved.method) {
        held = { ...resolved, method: false };
        heldNode = parent;
        node = parent;
        continue;
      }
      // a test registration, a hook or a registrar returns undefined (pinned); describe / suite return the collector
      if (resolved.api === "suite") return (ts.isCallExpression(parent) ? suiteFactoryUse(parent, resolved, a) : undefined) ?? collectorUse(parent, resolved.name, a);
      if (resolved.api !== "hook" && resolved.api !== "registrar") return undefined;
      return ts.isCallExpression(parent) ? hookPlacement(parent, resolved, a) : escapeOf(held, heldNode, a, { called: current, why: "it is called as a template tag" });
    }
    if (ts.isVariableDeclaration(parent) && parent.initializer === current && ts.isIdentifier(parent.name) && isConst(parent)) {
      const resolved = resolveChain(current, a);
      if ("unresolved" in resolved) return escapeOf(held, heldNode, a, { aliased: current, why: resolved.unresolved });
      through("api-use.const-alias", parent);
      return undefined;
    }
    if (ts.isParameter(parent) && parent.initializer === current && !held.method && (held.api === "hook" || held.api === "registrar")) {
      const misuse = parameterMisuse(parent, a);
      if (misuse === undefined) {
        through("context.hook-parameter", parent);
        return parameterPlacement(parent, held, a);
      }
      return escapeOf(held, heldNode, a, { parameter: misuse });
    }
    if (ts.isExpressionStatement(parent) || ts.isVoidExpression(parent) || ts.isTypeOfExpression(parent)) {
      through("api-use.discard", parent);
      return undefined;
    }
    if (ts.isExportAssignment(parent)) {
      through("api-use.re-export", parent);
      return undefined;
    }
    const handed = (ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.arguments?.some(argument => argument === current);
    return escapeOf(held, heldNode, a, handed ? { handed: current } : { used: current, as: ts.SyntaxKind[parent.kind] ?? "an expression" });
  }
}

/**
 * registration.suite-factory: describe / suite call their factory WITH vitest's test API (factory(test), @vitest/runner,
 * measured; describe.each / for hand it rows instead), so a factory is read only as a function literal or same-file
 * function that declares no parameter and reads no arguments object; any other argument past the name is an options
 * object or a number.
 */
function suiteFactoryUse(call: ts.CallExpression, resolved: ResolvedChain, a: SourceAnalysis): Escape | undefined {
  if (resolved.members.some(member => member === "each" || member === "for")) return undefined;
  for (const argument of call.arguments.slice(1)) {
    const value = unwrap(argument);
    const fn = localFunction(value, a);
    if (fn !== undefined) {
      const parameter = fn.parameters[0];
      if (parameter !== undefined && (!ts.isIdentifier(parameter.name) || parameter.dotDotDotToken !== undefined || referenced(parameter.name, fn, a))) {
        return { registration: true, text: `the suite factory at ${a.where(value)} declares the parameter ${nodeText(parameter, a)}, through which ${resolved.name} hands it vitest's test API (factory(test))` };
      }
      if (!ts.isArrowFunction(fn) && fn.body !== undefined && readsArguments(fn.body)) {
        return { registration: true, text: `the suite factory at ${a.where(value)} reads its arguments object, through which ${resolved.name} hands it vitest's test API (factory(test))` };
      }
      through("registration.suite-factory", value);
      continue;
    }
    if (!suiteOptionsValue(value, a)) {
      return { registration: true, text: `the argument ${nodeText(value, a)} of ${resolved.name} at ${a.where(value)} is neither a factory the census reads nor an options object or a number, and ${resolved.name} would hand a factory vitest's test API` };
    }
  }
  return undefined;
}

/** A describe / suite argument past the name that is no function: an options object literal, a number, undefined, or a const bound to one. */
function suiteOptionsValue(value: ts.Expression, a: SourceAnalysis, depth = 0): boolean {
  const target = unwrap(value);
  if (ts.isObjectLiteralExpression(target) || ts.isNumericLiteral(target)) return true;
  if (!ts.isIdentifier(target) || depth >= 6) return false;
  const declarations = a.checker.getSymbolAtLocation(target)?.declarations;
  if (target.text === "undefined" && (declarations === undefined || declarations.length === 0)) return true;
  const declaration = declarations?.[0];
  return declaration !== undefined && ts.isVariableDeclaration(declaration) && isConst(declaration) && declaration.initializer !== undefined && suiteOptionsValue(declaration.initializer, a, depth + 1);
}

/** Does a function's code reference a binding (by its symbol)? */
function referenced(name: ts.Identifier, fn: AnalysedFunction, a: SourceAnalysis): boolean {
  const symbol = a.checker.getSymbolAtLocation(name);
  if (symbol === undefined) return true;
  let found = false;
  const visit = (node: ts.Node): void => {
    if (found) return;
    if (ts.isIdentifier(node) && node !== name && isReference(node) && !inTypePosition(node) && valueSymbol(node, a) === symbol) {
      found = true;
      return;
    }
    ts.forEachChild(node, visit);
  };
  if (fn.body !== undefined) visit(fn.body);
  return found;
}

/** Does code read its own function's arguments object (an arrow's arguments is its enclosing function's; a nested function has its own)? */
function readsArguments(body: ts.Node): boolean {
  let found = false;
  const visit = (node: ts.Node): void => {
    if (found || ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isAccessor(node) || ts.isConstructorDeclaration(node)) return;
    if (ts.isIdentifier(node) && node.text === "arguments" && isReference(node)) {
      found = true;
      return;
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(body, visit);
  return found;
}

/**
 * context.free-hook: a vitest hook or registrar called where the census cannot place it in one suite - anywhere but a
 * module's top level or directly in a describe / suite factory - may run in ANY pin's suite through a call the walk
 * cannot follow (a function kept on an object member, a callback a library holds), so its callback is read as a context
 * flow wherever it is, for every pin of the file; one that does not read clean escapes.
 */
function hookPlacement(call: ts.CallExpression, resolved: ResolvedChain, a: SourceAnalysis): Escape | undefined {
  if (placedInSuite(call, a)) return undefined;
  const found = registrationFlow(call, a);
  if (found === undefined) {
    through("context.free-hook", call);
    return undefined;
  }
  return { registration: false, text: `the vitest ${resolved.name} at ${a.where(call)} is called where the census cannot place it in one suite (it may run in any pin's suite), and ${found.detail}` };
}

/** context.hook-parameter + context.free-hook: every call of a parameter defaulting to a hook or registrar registers it from a function, so each is read wherever it is. */
function parameterPlacement(parameter: ts.ParameterDeclaration, held: ResolvedChain, a: SourceAnalysis): Escape | undefined {
  const name = parameter.name;
  const symbol = ts.isIdentifier(name) ? a.checker.getSymbolAtLocation(name) : undefined;
  if (symbol === undefined) return undefined;
  let leak: Escape | undefined;
  const visit = (node: ts.Node): void => {
    if (leak !== undefined) return;
    if (ts.isCallExpression(node)) {
      const callee = unwrap(node.expression);
      if (ts.isIdentifier(callee) && valueSymbol(callee, a) === symbol) {
        const found = registrationFlow(node, a);
        if (found === undefined) through("context.free-hook", node);
        else leak = { registration: false, text: `the vitest ${held.name} the parameter ${nodeText(name, a)} defaults to is called at ${a.where(node)}, where the census cannot place it in one suite, and ${found.detail}` };
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(parameter.parent);
  return leak;
}

/** Is a call placed in one suite: at a module's top level, or directly in a describe / suite factory (a function literal one is handed)? */
function placedInSuite(call: ts.Node, a: SourceAnalysis): boolean {
  for (let node: ts.Node = call; node.parent !== undefined; node = node.parent) {
    const parent = node.parent;
    if (ts.isSourceFile(parent)) return true;
    if (isFunctionLiteral(parent)) {
      const holder = callHolding(parent);
      if (holder === undefined) return false;
      const chain = resolveChain(holder.expression, a);
      return !("unresolved" in chain) && !chain.method && chain.api === "suite";
    }
    if (ts.isFunctionDeclaration(parent) || ts.isClassLike(parent) || ts.isMethodDeclaration(parent) || ts.isAccessor(parent) || ts.isConstructorDeclaration(parent) || ts.isClassStaticBlockDeclaration(parent)) return false;
  }
  return true;
}

/** registration.namespace: vitest's namespace (an import * as, or import.meta.vitest) is read only through literal member names. */
function namespaceUse(namespace: ts.Expression, label: string, a: SourceAnalysis): Escape | undefined {
  const current = climbWrappers(namespace);
  const parent = current.parent;
  if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === current) {
    const name = accessedName(parent);
    if (name === undefined) return { registration: true, text: `the vitest namespace ${label} at ${a.where(namespace)} is read through a computed key` };
    through("registration.namespace", parent);
    return rootChain(name) === undefined ? undefined : apiUse(parent, a);
  }
  return { registration: true, text: `the vitest namespace ${label} at ${a.where(namespace)} is used other than to read its members` };
}

/** A namespace import of a relative module that exports vitest's API is read, like vitest's own, only through literal members. */
function relativeNamespaceUse(namespace: ts.Identifier, from: string, a: SourceAnalysis): Escape | undefined {
  const current = climbWrappers(namespace);
  const parent = current.parent;
  if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === current) {
    if (accessedName(parent) === undefined) return { registration: true, text: `the namespace ${namespace.text} of ${from}, which exports vitest's API, is read through a computed key at ${a.where(namespace)}` };
    return "unresolved" in resolveChain(parent, a) ? undefined : apiUse(parent, a);
  }
  return { registration: true, text: `the namespace ${namespace.text} of ${from}, which exports vitest's API, is used other than to read its members at ${a.where(namespace)}` };
}

/** import.meta may only be read through a literal member; its vitest member is vitest's namespace. */
function importMetaUse(meta: ts.MetaProperty, a: SourceAnalysis): Escape | undefined {
  const current = climbWrappers(meta);
  const parent = current.parent;
  const refused: Escape = { registration: true, text: `import.meta at ${a.where(meta)} is used other than to read a member` };
  if (!(ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) || parent.expression !== current) return refused;
  const name = accessedName(parent);
  if (name === undefined) return refused;
  return name === "vitest" ? namespaceUse(parent, "import.meta.vitest", a) : undefined;
}

/** One identifier reference: vitest's namespace, the namespace of a module exporting the API, or a binding the registration rows resolve. */
function referenceUse(id: ts.Identifier, a: SourceAnalysis): Escape | undefined {
  const from = namespaceOf(id, a);
  if (from === "vitest") return namespaceUse(id, id.text, a);
  if (from !== undefined) {
    const other = a.sources?.module(a.file, from);
    return other !== undefined && exportsApi(other, 0) ? relativeNamespaceUse(id, from, a) : undefined;
  }
  return "unresolved" in resolveRoot(id, a, 0) ? undefined : apiUse(id, a);
}

/** Does a relative module export vitest's API (re-exported, or bound by an export a registration row resolves), so a namespace or dynamic import of it holds the API? Past eight links, yes (fail-closed). */
function exportsApi(m: SourceAnalysis, depth: number): boolean {
  if (depth >= 8) return true;
  if (!closureTouchesVitest(m)) return false;
  const resolves = (resolution: ChainResolution | undefined): boolean => resolution !== undefined && !("unresolved" in resolution);
  for (const statement of m.sf.statements) {
    if (ts.isExportDeclaration(statement)) {
      if (statement.isTypeOnly) continue;
      const from = specifierOf(statement);
      if (from !== undefined && RUNNER_LOADS.has(from)) return true;
      const other = from === undefined ? undefined : m.sources?.module(m.file, from);
      if (other !== undefined && exportsApi(other, depth + 1)) return true;
      const clause = statement.exportClause;
      if (from === undefined && clause !== undefined && ts.isNamedExports(clause) && clause.elements.some(element => !element.isTypeOnly && resolves(moduleExport(m, element.name.text, depth + 1)))) return true;
      continue;
    }
    if (ts.isVariableStatement(statement) && hasModifier(statement, ts.SyntaxKind.ExportKeyword)) {
      if (statement.declarationList.declarations.some(declaration => ts.isIdentifier(declaration.name) && resolves(moduleExport(m, declaration.name.text, depth + 1)))) return true;
    }
    if (ts.isExportAssignment(statement) && resolves(moduleExport(m, "default", depth + 1))) return true;
  }
  return false;
}

/** A registration name, a hook, a registrar or the whole module an import binds from a runner module, which holds the same API objects as vitest (pinned for @vitest/runner). */
function alternateHandle(declaration: ts.ImportDeclaration): Escape | undefined {
  const from = specifierOf(declaration);
  const bindings = declaration.importClause?.namedBindings;
  if (from === undefined || !RUNNER_MODULES.has(from) || bindings === undefined) return undefined;
  if (ts.isNamespaceImport(bindings)) return { registration: true, text: `an alternate handle to vitest's registration API, ${bindings.name.text} from ${from}` };
  const named = bindings.elements.find(element => API_NAMES.has((element.propertyName ?? element.name).text));
  if (named === undefined) return undefined;
  const imported = (named.propertyName ?? named.name).text;
  return { registration: REGISTRATIONS.has(imported), text: `an alternate handle to vitest's ${REGISTRATIONS.has(imported) ? "registration API" : HOOK_NAMES.has(imported) ? "hooks" : "context registrars"}, ${named.name.text} from ${from}` };
}

/** One module's own references to vitest's API (registration.integrity), scanned once per module; its roster rows are replayed into each pin's trail. */
function ownIntegrity(a: SourceAnalysis): ModuleIntegrity {
  const cached = OWN_INTEGRITY.get(a);
  if (cached !== undefined) return cached;
  const outer = trail;
  trail = new Set();
  let result: ModuleIntegrity;
  try {
    // a module none of whose import closure touches vitest holds no reference to its API
    const found = closureTouchesVitest(a) ? scanIntegrity(a) : { registration: undefined, context: undefined };
    result = { ...found, rows: [...trail] };
  } finally {
    trail = outer;
  }
  OWN_INTEGRITY.set(a, result);
  return result;
}

/** Every reference to vitest's API in one module, each classified by the api-use rows: the first escape of each consequence. */
function scanIntegrity(a: SourceAnalysis): { readonly registration: string | undefined; readonly context: string | undefined } {
  let registration: string | undefined;
  let context: string | undefined;
  const record = (leak: Escape | undefined): void => {
    if (leak === undefined) return;
    if (leak.registration) {
      registration ??= leak.text;
      context ??= `the registration API escapes in this file: ${leak.text}, and the hooks it carries (it.beforeEach) and the suite collectors it returns reach the test context`;
    } else context ??= leak.text;
  };
  const visit = (node: ts.Node): void => {
    if (registration !== undefined && context !== undefined) return;
    if (ts.isImportDeclaration(node)) {
      const handle = alternateHandle(node);
      if (handle !== undefined) record({ registration: handle.registration, text: `${handle.text}, is imported at ${a.where(node)}` });
      // assertion.handle-integrity: chai's plugins (chai.use) redefine the assertions the third leg reads as vitest's
      if (specifierOf(node) === "chai") record({ registration: false, text: `chai is imported at ${a.where(node)}, whose plugins redefine the assertions the census reads as vitest's and reach the test` });
      return;
    }
    if (ts.isExportDeclaration(node)) {
      // api-use.re-export: a re-export is read where it is imported (registration.relative-export); vitest's whole namespace re-exported is not
      const from = specifierOf(node);
      const runner = node.isTypeOnly ? undefined : runnerReexport(node, from, a);
      if (!node.isTypeOnly && node.exportClause !== undefined && ts.isNamespaceExport(node.exportClause) && from !== undefined && RUNNER_LOADS.has(from)) {
        record({ registration: true, text: `${from}'s namespace is re-exported as ${node.exportClause.name.text} at ${a.where(node)}` });
      } else if (runner !== undefined) {
        // its importers' references are no runner binding by their own declaration, so the placement read cannot see them
        record({ registration: from === "vitest" && node.exportClause === undefined, text: `${runner} is re-exported at ${a.where(node)}, so its importers reach the runner's current test from code the census does not place` });
      } else through("api-use.re-export", node);
      return;
    }
    const loaded = loadedModule(node);
    if (loaded !== undefined) {
      const other = RUNNER_LOADS.has(loaded) ? undefined : a.sources?.module(a.file, loaded);
      if (RUNNER_LOADS.has(loaded)) record({ registration: true, text: `${loaded} is loaded dynamically at ${a.where(node)}` });
      else if (other !== undefined && exportsApi(other, 0)) record({ registration: true, text: `${loaded}, which exports vitest's API, is loaded dynamically at ${a.where(node)}` });
    }
    if (ts.isCallExpression(node)) {
      const mocked = mockedAssertion(node, a);
      if (mocked !== undefined) record({ registration: false, text: mocked });
    }
    if (ts.isPropertyAccessExpression(node) && HANDLE_NAMES.has(node.name.text) && !inTypePosition(node)) {
      const kind = handleKind(node, a);
      if (kind !== undefined) record(handleUse(node, kind, a));
    }
    if (isImportMeta(node)) {
      record(importMetaUse(node, a));
      return;
    }
    if (ts.isIdentifier(node) && isReference(node)) {
      if (ts.isExportSpecifier(node.parent)) through("api-use.re-export", node);
      else if (inTypePosition(node)) {
        if (!("unresolved" in resolveRoot(node, a, 0))) through("api-use.type", node);
      } else {
        // registration.integrity (u62 respin-4): a runner binding reaches the current test or suite from wherever the
        // code it sits in runs, which a walk from the pin cannot bound (a function kept on an object member, a callback),
        // unless it is called on the spot in a case body or a suite factory (context.runner-placed)
        const binding = runnerBinding(node, a);
        if (binding !== undefined && !runnerPlaced(node, a)) {
          record({ registration: false, text: `${binding} at ${a.where(node)} reaches the runner's current test or suite from code the census cannot place in one case or suite factory (it may run in any pin's run)` });
        }
        const kind = handleKind(node, a);
        if (kind !== undefined) record(handleUse(node, kind, a));
        record(referenceUse(node, a));
      }
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(a.sf);
  return { registration, context };
}

// ---------------------------------------------------------------------------------------------
// assertion.handle-integrity (u62 respin-4): the third leg reads expect / assert as vitest's (and node:assert's) own, so
// every reference to an assertion handle in the pinned file and its relative import closure stands where nothing can
// redefine what a matcher or a check does, or reach the test through one.
// ---------------------------------------------------------------------------------------------

/** The assertion handles, by name: a renamed, destructured or context-held handle is still the same object. */
const HANDLE_NAMES: ReadonlySet<string> = new Set(["expect", "assert", "chai"]);
/** Members of an assertion handle that register code vitest runs with the test or the checked value in hand (custom matchers get MatcherState.task). */
const USER_CODE_MEMBERS: ReadonlySet<string> = new Set(["extend", "addEqualityTesters", "addSnapshotSerializer", "use"]);
/** Members through which an assertion object reaches the class its matchers are defined on. */
const PROTOTYPE_ROUTES: ReadonlySet<string> = new Set(["constructor", "__proto__", "prototype"]);

/** Is a reference an assertion handle: named expect / assert / chai, or bound by an import of one (vitest's, node:assert in any form, chai)? */
function handleKind(node: ts.Expression, a: SourceAnalysis): "expect" | "assert" | "chai" | undefined {
  const name = ts.isIdentifier(node) ? node.text : ts.isPropertyAccessExpression(node) ? node.name.text : undefined;
  if (name === "expect" || name === "assert" || name === "chai") return name;
  if (!ts.isIdentifier(node)) return undefined;
  const declaration = valueSymbol(node, a)?.declarations?.[0];
  if (declaration === undefined || !(ts.isImportSpecifier(declaration) || ts.isImportClause(declaration) || ts.isNamespaceImport(declaration))) return undefined;
  const from = moduleOf(declaration);
  if (from === undefined) return undefined;
  if (NODE_ASSERT.has(from)) return "assert";
  if (from === "chai") return "chai";
  if (from !== "vitest" || !ts.isImportSpecifier(declaration)) return undefined;
  const imported = (declaration.propertyName ?? declaration.name).text;
  return imported === "expect" || imported === "assert" || imported === "chai" ? imported : undefined;
}

/**
 * assertion.handle-integrity: a handle is called, read through literal members that are no write and register no code,
 * or discarded; the assertion expect(x) / expect.soft(x) / expect.poll(fn) builds stays on its matcher chain - member
 * reads (never constructor / __proto__ / prototype), calls, await - ending as a statement, a void operand, or the return
 * of a callback. Anything else escapes: the checks the census reads as vitest's may not be.
 */
function handleUse(handle: ts.Expression, kind: "expect" | "assert" | "chai", a: SourceAnalysis): Escape | undefined {
  const refused = (how: string): Escape => ({ registration: false, text: `the assertion handle ${nodeText(handle, a)} at ${a.where(handle)} ${how}, so the checks the census reads as vitest's may not be` });
  if (kind === "chai") return refused("is chai, whose plugins redefine assertions (chai.use) and reach the test");
  let node: ts.Expression = handle;
  let built = false;
  let members = 0;
  for (;;) {
    const current = climbWrappers(node);
    const parent = current.parent;
    if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === current) {
      const name = accessedName(parent);
      if (name === undefined) return refused("is read through a computed key");
      if (writes(parent)) return refused(`has ${name} written`);
      if (!built && USER_CODE_MEMBERS.has(name)) return refused(`registers code through ${name}, which vitest runs with the test or the checked value in hand`);
      if (PROTOTYPE_ROUTES.has(name)) return refused(`reaches ${name}, the class its matchers are defined on`);
      members += 1;
      node = parent;
      continue;
    }
    if ((ts.isCallExpression(parent) && parent.expression === current) || (ts.isTaggedTemplateExpression(parent) && parent.tag === current)) {
      // expect(x), expect.soft(x) and expect.poll(fn) build an assertion object; a matcher or chain call keeps it
      const builds = kind === "expect" && !built && ts.isCallExpression(parent) && (members === 0 || (members === 1 && ts.isPropertyAccessExpression(current) && (current.name.text === "soft" || current.name.text === "poll")));
      if (!built && !builds) {
        through("assertion.handle-integrity", parent);
        return undefined;
      }
      built = true;
      node = parent;
      continue;
    }
    if (built && ts.isAwaitExpression(parent)) {
      node = parent;
      continue;
    }
    // a matcher's result tested by && / || / ??, joined by a comma, or an arm of a conditional flows nowhere but the
    // expression around it, which is read on in its place (cond && expect(x).toBe(1) as a statement is the third leg's)
    if (built && ((ts.isBinaryExpression(parent) && FLOW_OPERATORS.has(parent.operatorToken.kind)) || (ts.isConditionalExpression(parent) && parent.condition !== current))) {
      node = parent;
      continue;
    }
    if (ts.isExpressionStatement(parent) || ts.isVoidExpression(parent) || (!built && ts.isTypeOfExpression(parent))) {
      through("assertion.handle-integrity", parent);
      return undefined;
    }
    if (built && (ts.isReturnStatement(parent) || (ts.isArrowFunction(parent) && parent.body === current))) {
      const fn = ts.isReturnStatement(parent) ? enclosingFunction(parent) : parent;
      if (fn !== undefined && isFunctionLiteral(fn) && callHolding(fn) !== undefined) {
        through("assertion.handle-integrity", parent);
        return undefined;
      }
      return refused("returns the assertion it builds to code the census does not read");
    }
    const handed = (ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.arguments?.some(argument => argument === current);
    return refused(`${built ? "builds an assertion that " : ""}${handed ? "is handed to a call" : `is used as ${ts.SyntaxKind[parent.kind] ?? "an expression"}`}`);
  }
}

/** The function a node sits in (its nearest enclosing function-like), or undefined at a module's top level. */
function enclosingFunction(node: ts.Node): ts.SignatureDeclaration | undefined {
  for (let current: ts.Node | undefined = node.parent; current !== undefined; current = current.parent) {
    if (ts.isFunctionLike(current)) return current;
  }
  return undefined;
}

/** vi.mock / vi.doMock of an assertion module (node:assert, chai, vitest) or of a module it cannot name replaces what the third leg reads. */
function mockedAssertion(call: ts.CallExpression, a: SourceAnalysis): string | undefined {
  const callee = unwrap(call.expression);
  if (!ts.isPropertyAccessExpression(callee) || (callee.name.text !== "mock" && callee.name.text !== "doMock")) return undefined;
  const object = unwrap(callee.expression);
  const named = ts.isIdentifier(object) ? object.text === "vi" || handleKindOfVi(object, a) : ts.isPropertyAccessExpression(object) && object.name.text === "vi";
  if (!named) return undefined;
  const first = call.arguments[0];
  if (first === undefined) return undefined;
  const target = unwrap(first);
  if (!ts.isStringLiteralLike(target)) return `vi.${callee.name.text} at ${a.where(call)} mocks a module the census cannot name, which may be an assertion module`;
  const name = target.text;
  return NODE_ASSERT.has(name) || name === "chai" || RUNNER_LOADS.has(name) ? `vi.${callee.name.text}("${name}") at ${a.where(call)} replaces an assertion or runner module the census reads as vitest's` : undefined;
}

/** Is an identifier vitest's vi under another name? */
function handleKindOfVi(id: ts.Identifier, a: SourceAnalysis): boolean {
  const declaration = valueSymbol(id, a)?.declarations?.[0];
  return declaration !== undefined && ts.isImportSpecifier(declaration) && moduleOf(declaration) === "vitest" && (declaration.propertyName ?? declaration.name).text === "vi";
}

/** registration.integrity for a pinned file: its own references and those of every relative module of its import closure. */
function integrity(a: SourceAnalysis): { readonly registration: string | undefined; readonly context: string | undefined } {
  through("registration.integrity", a);
  let registration: string | undefined;
  let context: string | undefined;
  for (const member of importClosure(a)) {
    const own = ownIntegrity(member.module);
    for (const row of own.rows) trail?.add(row);
    const where = member.module === a ? "" : `in ${member.via}: `;
    if (own.registration !== undefined) registration ??= `${where}${own.registration}`;
    if (own.context !== undefined) context ??= `${where}${own.context}`;
    if (registration !== undefined && context !== undefined) break;
  }
  return { registration, context };
}

/** The inversion read's verdict where the file (or a module it loads) lets the registration API escape. */
function apiEscapeHazard(a: SourceAnalysis): { readonly kind: "unknown"; readonly detail: string } | undefined {
  const leak = integrity(a).registration;
  return leak === undefined ? undefined : { kind: "unknown", detail: `the registration API escapes in this file: ${leak}, so report mode cannot read what a registration through it sets (fails included)` };
}

// ---------------------------------------------------------------------------------------------
// The third leg: at least one REACHED vitest (or node:assert) assertion in the case body.
// ---------------------------------------------------------------------------------------------

interface EvidenceScope {
  readonly a: SourceAnalysis;
  readonly sources: SourceCache;
  /** Symbols bound to the case's test context object (ctx.expect is vitest's). */
  readonly contextRoots: ReadonlySet<ts.Symbol>;
  /** Symbols bound to the context's destructured expect. */
  readonly contextExpect: ReadonlySet<ts.Symbol>;
  readonly visited: Set<ts.Node>;
  readonly depth: number;
  /**
   * The STRICT reading (report mode, whose report records no assertion count): in the case function's own flow, the
   * first matcher-bearing assertion must be reached on every statically visible path - a return before it, or a branch,
   * short-circuit, catch or switch clause that routes around it, reddens even where the run did not take that path.
   */
  readonly strictExits: boolean;
  /** Strict reading only (U2): labeled statements whose body is read again with their own breaks as plain jumps. */
  readonly landed?: ReadonlySet<ts.LabeledStatement>;
}
type Exit = "none" | "return" | "jump";
/** An assertion the strict reading sees reached on SOME paths only, and the route around it. */
interface Conditional {
  readonly evidence: string;
  readonly route: string;
}
interface Walk {
  readonly evidence: string | undefined;
  readonly exit: Exit;
  /**
   * The return statement the walk may leave through before an assertion (never a throw: a throw fails the case); under
   * the strict reading also a break leaving a labeled non-loop statement (U2), which that statement resolves.
   */
  readonly exitAt?: ts.Node;
  /** Strict reading only: an assertion reached on some paths, while another path continues past it without one. */
  readonly conditional?: Conditional;
}
const CONTINUES: Walk = { evidence: undefined, exit: "none" };
const found = (evidence: string | undefined): Walk => ({ evidence, exit: "none" });
/** The strict reading applies to the case function's own flow (depth 1) only, never to the helpers or callbacks it reaches. */
const strict = (scope: EvidenceScope): boolean => scope.strictExits && scope.depth === 1;
const mayReturn = (exitAt: ts.Node): Walk => ({ evidence: undefined, exit: "return", exitAt });
const withConditional = (walk: Walk, conditional: Conditional | undefined): Walk =>
  conditional === undefined || walk.evidence !== undefined || walk.conditional !== undefined ? walk : { ...walk, conditional };
/** A loop body counts as reached (an iteration count is not static); under the strict reading its return or some-paths assertion carries out. */
function loopBody(body: Walk, scope: EvidenceScope): Walk {
  if (body.evidence !== undefined) return through("assertion.loop-body", found(body.evidence));
  if (!strict(scope)) return CONTINUES;
  if (body.exitAt !== undefined) return mayReturn(body.exitAt);
  return withConditional(CONTINUES, body.conditional);
}


function literalTruth(expression: ts.Expression, a?: SourceAnalysis): boolean | undefined {
  const value = unwrap(expression);
  if (value.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (value.kind === ts.SyntaxKind.FalseKeyword || value.kind === ts.SyntaxKind.NullKeyword) return false;
  if (ts.isNumericLiteral(value)) return Number(value.text) !== 0;
  if (ts.isStringLiteralLike(value)) return value.text !== "";
  if (ts.isIdentifier(value) && value.text === "undefined") return a !== undefined && (a.checker.getSymbolAtLocation(value)?.declarations?.length ?? 0) > 0 ? undefined : false;
  if (ts.isPrefixUnaryExpression(value) && value.operator === ts.SyntaxKind.ExclamationToken) {
    const inner = literalTruth(value.operand, a);
    return inner === undefined ? undefined : !inner;
  }
  return undefined;
}

function isEmptyArray(expression: ts.Expression): boolean {
  const value = unwrap(expression);
  return ts.isArrayLiteralExpression(value) && value.elements.length === 0;
}

/** Is a function literal run when the code around it runs: a call argument (callback), or immediately invoked? */
function isInvoked(fn: FunctionLiteral): boolean {
  // a generator's body runs only when the generator it returns is iterated (E9)
  if (fn.asteriskToken !== undefined) return false;
  let node: ts.Node = fn;
  for (;;) {
    const parent = node.parent;
    if (parent === undefined) return false;
    if ((ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.arguments?.some(argument => argument === node)) return true;
    if (ts.isCallExpression(parent) && parent.expression === node) return true;
    if (
      ts.isParenthesizedExpression(parent) ||
      ts.isAsExpression(parent) ||
      ts.isSatisfiesExpression(parent) ||
      ts.isNonNullExpression(parent) ||
      ts.isPropertyAssignment(parent) ||
      ts.isObjectLiteralExpression(parent) ||
      ts.isArrayLiteralExpression(parent) ||
      ts.isConditionalExpression(parent) ||
      ts.isBinaryExpression(parent)
    ) {
      node = parent;
      continue;
    }
    return false;
  }
}

type AssertionRoot = "expect" | "assert" | "context" | "namespace";
/** How an assertion predicate classifies an identifier (the third leg through its EvidenceScope, the context flow through its roots). */
type RootOf = (id: ts.Identifier) => AssertionRoot | undefined;

/** The assertion an identifier imports (vitest's expect / assert, node:assert, a vitest namespace), or a vitest global's. */
function importedAssertionRoot(id: ts.Identifier, a: SourceAnalysis): AssertionRoot | undefined {
  const symbol = a.checker.getSymbolAtLocation(id);
  // u62 respin-4: an undeclared expect / assert reads the global object, which code the census does not read may set
  // (vi.stubGlobal, a setup file), so it is no evidence
  if (symbol === undefined) return undefined;
  const declaration = symbol.declarations?.[0];
  if (declaration === undefined) return undefined;
  const from = ts.isImportSpecifier(declaration) || ts.isImportClause(declaration) || ts.isNamespaceImport(declaration) ? moduleOf(declaration) : undefined;
  if (from === undefined) return undefined;
  if (NODE_ASSERT.has(from)) {
    // assertion.assert-call: node:assert itself (a default or namespace import), or a named import of one of its methods
    if (!ts.isImportSpecifier(declaration)) return "assert";
    const imported = (declaration.propertyName ?? declaration.name).text;
    return imported === "default" || ASSERT_SET.has(imported) ? "assert" : undefined;
  }
  if (from !== "vitest") return undefined;
  if (ts.isNamespaceImport(declaration)) return "namespace";
  const name = ts.isImportSpecifier(declaration) ? (declaration.propertyName ?? declaration.name).text : "";
  return name === "expect" ? "expect" : name === "assert" ? "assert" : undefined;
}

function assertionRoot(id: ts.Identifier, scope: EvidenceScope): AssertionRoot | undefined {
  const symbol = scope.a.checker.getSymbolAtLocation(id);
  if (symbol !== undefined && scope.contextRoots.has(symbol)) return "context";
  if (symbol !== undefined && scope.contextExpect.has(symbol)) return "expect";
  return importedAssertionRoot(id, scope.a);
}

/** expect's members that FAIL the case when reached (vitest's unreachable, chai's fail): an assertion like assert.fail, pinned against the runtime. */
export const FAILING_MEMBERS: readonly string[] = ["fail", "unreachable"];

/** chai's / vitest's Assertion members that check nothing about the subject (assertion.matcher's guard; pinned): chai's internal assert, the constructor, vitest's withContext / withTest. */
export const NON_MATCHERS: readonly string[] = ["assert", "constructor", "withContext", "withTest"];

/** The matchers an expect(x) assertion carries in vitest 4.1.10 - its callable members and chai's chainable methods - pinned against the installed runtime (assertion.matcher). */
export const MATCHERS: readonly string[] = [
  "Throw", "a", "above", "an", "approximately", "below", "by", "callCount", "calledAfter", "calledBefore", "calledOnceWith", "calledWith", "change", "changes", "closeTo", "contain", "containSubset", "contains",
  "decrease", "decreases", "eq", "eql", "eqls", "equal", "equals", "greaterThan", "greaterThanOrEqual", "gt", "gte", "haveOwnProperty", "haveOwnPropertyDescriptor", "include", "includes", "increase", "increases",
  "instanceOf", "instanceof", "key", "keys", "lastCalledWith", "lastReturnedWith", "least", "length", "lengthOf", "lessThan", "lessThanOrEqual", "lt", "lte", "match", "matchSnapshot", "matches", "members", "most",
  "nthCalledWith", "nthReturnedWith", "oneOf", "ownProperty", "ownPropertyDescriptor", "property", "respondTo", "respondsTo", "returned", "returnedTimes", "returnedWith", "satisfies", "satisfy", "string", "throw",
  "throws", "toBe", "toBeCalled", "toBeCalledTimes", "toBeCalledWith", "toBeCloseTo", "toBeDefined", "toBeFalsy", "toBeGreaterThan", "toBeGreaterThanOrEqual", "toBeInstanceOf", "toBeLessThan",
  "toBeLessThanOrEqual", "toBeNaN", "toBeNull", "toBeNullable", "toBeOneOf", "toBeTruthy", "toBeTypeOf", "toBeUndefined", "toContain", "toContainEqual", "toEqual", "toHaveBeenCalled", "toHaveBeenCalledAfter",
  "toHaveBeenCalledBefore", "toHaveBeenCalledExactlyOnceWith", "toHaveBeenCalledOnce", "toHaveBeenCalledTimes", "toHaveBeenCalledWith", "toHaveBeenLastCalledWith", "toHaveBeenNthCalledWith",
  "toHaveLastResolvedWith", "toHaveLastReturnedWith", "toHaveLength", "toHaveNthResolvedWith", "toHaveNthReturnedWith", "toHaveProperty", "toHaveResolved", "toHaveResolvedTimes", "toHaveResolvedWith",
  "toHaveReturned", "toHaveReturnedTimes", "toHaveReturnedWith", "toMatch", "toMatchFileSnapshot", "toMatchInlineSnapshot", "toMatchObject", "toMatchSnapshot", "toReturn", "toReturnTimes", "toReturnWith",
  "toSatisfy", "toStrictEqual", "toThrow", "toThrowError", "toThrowErrorMatchingInlineSnapshot", "toThrowErrorMatchingSnapshot", "within",
];

/** The members between expect(x) and its matcher - chai's flags, language chains and property getters - pinned against the installed runtime (_obj, the subject itself, excluded). */
export const CHAIN_MEMBERS: readonly string[] = [
  "Arguments", "NaN", "a", "all", "also", "an", "and", "any", "arguments", "at", "be", "been", "but", "callable", "called", "calledOnce", "calledThrice", "calledTwice", "contain", "contains", "deep", "does", "empty",
  "exist", "exists", "extensible", "false", "finite", "frozen", "has", "have", "include", "includes", "is", "iterable", "itself", "length", "lengthOf", "nested", "not", "null", "numeric", "of", "ok", "ordered", "own",
  "rejects", "resolves", "same", "sealed", "still", "that", "to", "true", "undefined", "which", "with",
];

/** The assert API's methods: chai's assert (vitest's) and node:assert's (its classes excluded), pinned against the installed runtime (assertion.assert-call). */
export const ASSERT_METHODS: readonly string[] = [
  "Throw", "approximately", "changes", "changesButNotBy", "changesBy", "closeTo", "containSubset", "containsAllDeepKeys", "containsAllKeys", "containsSubset", "decreases", "decreasesButNotBy", "decreasesBy",
  "deepEqual", "deepInclude", "deepNestedInclude", "deepNestedPropertyVal", "deepOwnInclude", "deepOwnPropertyVal", "deepPropertyVal", "deepStrictEqual", "doesNotChange", "doesNotContainSubset", "doesNotDecrease",
  "doesNotDecreaseBy", "doesNotHaveAllDeepKeys", "doesNotHaveAllKeys", "doesNotHaveAnyDeepKeys", "doesNotHaveAnyKeys", "doesNotIncrease", "doesNotMatch", "doesNotReject", "doesNotThrow", "empty", "equal", "exists",
  "extensible", "fail", "frozen", "hasAllDeepKeys", "hasAllKeys", "hasAnyDeepKeys", "hasAnyKeys", "ifError", "include", "includeDeepMembers", "includeDeepOrderedMembers", "includeMembers", "includeOrderedMembers",
  "increases", "increasesButNotBy", "increasesBy", "instanceOf", "isAbove", "isArray", "isAtLeast", "isAtMost", "isBelow", "isBoolean", "isCallable", "isDefined", "isEmpty", "isExtensible", "isFalse", "isFinite",
  "isFrozen", "isFunction", "isIterable", "isNaN", "isNotArray", "isNotBoolean", "isNotCallable", "isNotEmpty", "isNotExtensible", "isNotFalse", "isNotFrozen", "isNotFunction", "isNotNaN", "isNotNull",
  "isNotNumber", "isNotNumeric", "isNotObject", "isNotOk", "isNotSealed", "isNotString", "isNotTrue", "isNull", "isNumber", "isNumeric", "isObject", "isOk", "isSealed", "isString", "isTrue", "isUndefined",
  "lengthOf", "match", "nestedInclude", "nestedProperty", "nestedPropertyVal", "notDeepEqual", "notDeepInclude", "notDeepNestedInclude", "notDeepNestedPropertyVal", "notDeepOwnInclude", "notDeepOwnPropertyVal",
  "notDeepPropertyVal", "notDeepStrictEqual", "notEmpty", "notEqual", "notExists", "notExtensible", "notFrozen", "notInclude", "notIncludeDeepMembers", "notIncludeDeepOrderedMembers", "notIncludeMembers",
  "notIncludeOrderedMembers", "notInstanceOf", "notMatch", "notNestedInclude", "notNestedProperty", "notNestedPropertyVal", "notOk", "notOwnInclude", "notOwnProperty", "notOwnPropertyVal", "notProperty",
  "notPropertyVal", "notSameDeepMembers", "notSameDeepOrderedMembers", "notSameMembers", "notSameOrderedMembers", "notSealed", "notStrictEqual", "notTypeOf", "ok", "oneOf", "operator", "ownInclude",
  "ownProperty", "ownPropertyVal", "partialDeepStrictEqual", "property", "propertyVal", "rejects", "sameDeepMembers", "sameDeepOrderedMembers", "sameMembers", "sameOrderedMembers", "sealed", "strict",
  "strictEqual", "throw", "throws", "typeOf",
];

/** The members of vitest 4.1.10's test context (pinned; context.member classifies each): the function intrinsics aside. */
export const CONTEXT_MEMBERS: readonly string[] = ["_local", "annotate", "expect", "onTestFailed", "onTestFinished", "signal", "skip", "task"];

/** vitest's public routes to its registration API, a CLOSED set (pinned): each is a registration row (named / namespace import, import.meta.vitest, global) or an integrity escape (@vitest/runner, a dynamic import). */
export const REGISTRATION_ROUTES: readonly string[] = ["named import", "namespace import", "import.meta.vitest", "global", "@vitest/runner", "dynamic import"];

const MATCHER_SET: ReadonlySet<string> = new Set(MATCHERS);
const CHAIN_SET: ReadonlySet<string> = new Set(CHAIN_MEMBERS);
const ASSERT_SET: ReadonlySet<string> = new Set(ASSERT_METHODS);

/** vitest's expect itself: expect, ctx.expect, or a vitest namespace's expect. */
function isExpectBase(expression: ts.Expression, rootOf: RootOf): boolean {
  const target = unwrap(expression);
  if (ts.isIdentifier(target)) return rootOf(target) === "expect";
  if (!ts.isPropertyAccessExpression(target) || target.name.text !== "expect") return false;
  const object = unwrap(target.expression);
  if (!ts.isIdentifier(object)) return false;
  const root = rootOf(object);
  return root === "context" || root === "namespace";
}

/** The callee of a call that BUILDS a vitest assertion: expect(x), expect.soft(x), expect.poll(fn) (through ctx or a namespace). */
function isExpectConstructor(expression: ts.Expression, rootOf: RootOf): boolean {
  const target = unwrap(expression);
  if (isExpectBase(target, rootOf)) return true;
  return ts.isPropertyAccessExpression(target) && (target.name.text === "soft" || target.name.text === "poll") && isExpectBase(target.expression, rootOf);
}

/** vitest's (chai's) assert or node:assert, directly or as a vitest namespace's assert. */
function isAssertBase(expression: ts.Expression, rootOf: RootOf): boolean {
  const target = unwrap(expression);
  if (ts.isIdentifier(target)) return rootOf(target) === "assert";
  if (!ts.isPropertyAccessExpression(target) || target.name.text !== "assert") return false;
  const object = unwrap(target.expression);
  return ts.isIdentifier(object) && rootOf(object) === "namespace";
}

/** What an assertion call is - the roster row it resolves through - or undefined when it checks nothing. */
type AssertionKind = { readonly row: "assertion.assert-call" } | { readonly row: "assertion.failing-member" | "assertion.matcher"; readonly base: ts.Expression };

/**
 * The third leg's ASSERTION flow (u62 gate-3 U3; respin-4 the roster's allowlists, pinned against the installed
 * runtime): an assertion is assertion.assert-call - assert(x) / node:assert(x), or a member chain of ASSERT_METHODS
 * (assert.equal(...), assert.strict.equal(...)); assertion.failing-member - expect.unreachable() / expect.fail(); or
 * assertion.matcher - expect(x) / expect.soft(x) / expect.poll(fn) followed by CHAIN_MEMBERS and called through one of
 * MATCHERS. Anything else checks nothing: a NON_MATCHERS member (withContext, withTest, chai's internal assert, the
 * constructor), any other static expect member, a custom matcher (expect.extend: fail-closed), a bare expect(x).
 */
function assertionKind(call: ts.CallExpression, rootOf: RootOf): AssertionKind | undefined {
  const callee = unwrap(call.expression);
  if (isAssertBase(callee, rootOf)) return { row: "assertion.assert-call" };
  if (!ts.isPropertyAccessExpression(callee) && !ts.isElementAccessExpression(callee)) return undefined;
  const method = accessedName(callee);
  if (method === undefined) return undefined;
  // down the member reads (not / resolves / rejects, assert.strict) to the value the method is called on
  const members: string[] = [];
  let subject = unwrap(callee.expression);
  while ((ts.isPropertyAccessExpression(subject) || ts.isElementAccessExpression(subject)) && !isExpectBase(subject, rootOf) && !isAssertBase(subject, rootOf)) {
    const name = accessedName(subject);
    if (name === undefined) return undefined;
    members.push(name);
    subject = unwrap(subject.expression);
  }
  if (isAssertBase(subject, rootOf)) return ASSERT_SET.has(method) && members.every(name => ASSERT_SET.has(name)) ? { row: "assertion.assert-call" } : undefined;
  if (isExpectBase(subject, rootOf)) return members.length === 0 && FAILING_MEMBERS.includes(method) ? { row: "assertion.failing-member", base: subject } : undefined;
  if (!ts.isCallExpression(subject) || !isExpectConstructor(subject.expression, rootOf)) return undefined;
  if (!MATCHER_SET.has(method) || !members.every(name => CHAIN_SET.has(name))) return undefined;
  // expect.soft / expect.poll read as their expect
  let base = unwrap(subject.expression);
  if (ts.isPropertyAccessExpression(base) && base.name.text !== "expect") base = unwrap(base.expression);
  return { row: "assertion.matcher", base };
}

function assertionEvidence(call: ts.CallExpression, scope: EvidenceScope): string | undefined {
  const rootOf: RootOf = id => assertionRoot(id, scope);
  const kind = assertionKind(call, rootOf);
  if (kind === undefined) return undefined;
  const at = `${basename(scope.a.file)} ${scope.a.where(call)}`;
  return through(kind.row, kind.row === "assertion.assert-call" ? `assert at ${at}` : `${expectRoute(kind.base, rootOf)} at ${at}`);
}

/** How an expect base is reached, for the evidence text: expect itself, or ctx.expect / a namespace's expect by its root. */
function expectRoute(base: ts.Expression, rootOf: RootOf): string {
  const target = unwrap(base);
  const object = ts.isPropertyAccessExpression(target) ? unwrap(target.expression) : undefined;
  const via = object !== undefined && ts.isIdentifier(object) ? rootOf(object) : undefined;
  return via === "context" || via === "namespace" ? `${via} expect` : "expect";
}


/** A function a call reaches statically: same-file declarations, const-bound literals, relative-module exports. */
function calledFunction(call: ts.CallExpression, scope: EvidenceScope): { readonly fn: AnalysedFunction; readonly a: SourceAnalysis } | undefined {
  const callee = unwrap(call.expression);
  if (!ts.isIdentifier(callee)) return undefined;
  const local = localFunction(callee, scope.a);
  if (local !== undefined) return local.asteriskToken === undefined ? { fn: local, a: scope.a } : undefined;
  const declaration = scope.a.checker.getSymbolAtLocation(callee)?.declarations?.[0];
  if (declaration === undefined || !ts.isImportSpecifier(declaration)) return undefined;
  const specifier = moduleOf(declaration);
  if (specifier === undefined) return undefined;
  const other = scope.sources.module(scope.a.file, specifier);
  if (other === undefined) return undefined;
  const exported = (declaration.propertyName ?? declaration.name).text;
  for (const statement of other.sf.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name?.text === exported && statement.body !== undefined) return statement.asteriskToken === undefined ? { fn: statement, a: other } : undefined;
    if (ts.isVariableStatement(statement)) {
      for (const variable of statement.declarationList.declarations) {
        if (!ts.isIdentifier(variable.name) || variable.name.text !== exported || variable.initializer === undefined) continue;
        const initializer = unwrap(variable.initializer);
        if (isFunctionLiteral(initializer)) return initializer.asteriskToken === undefined ? { fn: initializer, a: other } : undefined;
      }
    }
  }
  return undefined;
}

/** Bodies that run where they are CALLED, never where they are written (U4): a function declaration, a class, an object-literal method, accessor or constructor. */
const deferredBody = (node: ts.Node): boolean =>
  ts.isFunctionDeclaration(node) || ts.isClassLike(node) || ts.isMethodDeclaration(node) || ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node) || ts.isConstructorDeclaration(node);

function findIn(root: ts.Node, scope: EvidenceScope): string | undefined {
  let result: string | undefined;
  const visit = (node: ts.Node): void => {
    if (result !== undefined) return;
    if (isFunctionLiteral(node)) {
      if (isInvoked(node)) {
        result = functionEvidence(node, scope);
        if (result !== undefined) through("assertion.invoked-callback", node);
      }
      return;
    }
    if (deferredBody(node)) return;
    if (ts.isCallExpression(node)) {
      result = assertionEvidence(node, scope);
      if (result !== undefined) return;
      const target = calledFunction(node, scope);
      if (target !== undefined) {
        result = functionEvidence(target.fn, { ...scope, a: target.a });
        if (result !== undefined) {
          through("assertion.called-helper", node);
          return;
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(root);
  return result;
}

const SHORT_CIRCUITS: ReadonlyMap<ts.SyntaxKind, string> = new Map([
  [ts.SyntaxKind.AmpersandAmpersandToken, "&&"],
  [ts.SyntaxKind.BarBarToken, "||"],
  [ts.SyntaxKind.QuestionQuestionToken, "??"],
]);

/**
 * findIn under the strict reading: an assertion only in a short-circuit's right operand or in one arm of a conditional
 * expression is reached on some paths only. Calls, helpers and invoked callbacks read exactly as findIn reads them.
 */
function findStrict(root: ts.Node, scope: EvidenceScope): Walk {
  if (!strict(scope)) return found(findIn(root, scope));
  let conditional: Conditional | undefined;
  const visit = (node: ts.Node): string | undefined => {
    if (isFunctionLiteral(node) || deferredBody(node)) return findIn(node, scope);
    if (ts.isCallExpression(node)) {
      const direct = assertionEvidence(node, scope);
      if (direct !== undefined) return direct;
      const target = calledFunction(node, scope);
      const reached = target === undefined ? undefined : functionEvidence(target.fn, { ...scope, a: target.a });
      if (reached !== undefined) return through("assertion.called-helper", reached);
    }
    const operator = ts.isBinaryExpression(node) ? SHORT_CIRCUITS.get(node.operatorToken.kind) : undefined;
    if (ts.isBinaryExpression(node) && operator !== undefined) {
      const left = visit(node.left);
      if (left !== undefined) return left;
      const right = visit(node.right);
      if (right !== undefined) conditional ??= { evidence: right, route: `the ${operator} at ${scope.a.where(node.operatorToken)} may short-circuit it` };
      return undefined;
    }
    if (ts.isConditionalExpression(node)) {
      const test = visit(node.condition);
      if (test !== undefined) return test;
      const yes = visit(node.whenTrue);
      const no = visit(node.whenFalse);
      if (yes !== undefined && no !== undefined) return yes;
      const arm = yes ?? no;
      if (arm !== undefined) conditional ??= { evidence: arm, route: `the conditional expression at ${scope.a.where(node)} may take the arm without it` };
      return undefined;
    }
    return ts.forEachChild(node, visit);
  };
  return withConditional(found(visit(root)), conditional);
}

function walkBlock(statements: readonly ts.Statement[], scope: EvidenceScope): Walk {
  let conditional: Conditional | undefined;
  for (const statement of statements) {
    const step = walkStatement(statement, scope);
    if (step.evidence !== undefined) return step;
    if (strict(scope) && step.exitAt !== undefined) return mayReturn(step.exitAt);
    conditional ??= step.conditional;
    if (step.exit !== "none") return { evidence: undefined, exit: step.exit, exitAt: step.exitAt, conditional };
  }
  return withConditional(CONTINUES, conditional);
}

/** A path that leaves by throwing fails the case, so it never hollows the pin. */
const throws = (walk: Walk): boolean => walk.evidence === undefined && walk.exit === "return" && walk.exitAt === undefined;

function walkIf(statement: ts.IfStatement, scope: EvidenceScope): Walk {
  const condition = findStrict(statement.expression, scope);
  if (condition.evidence !== undefined) return condition;
  const truth = literalTruth(statement.expression, scope.a);
  const then = truth === false ? CONTINUES : walkStatement(statement.thenStatement, scope);
  const otherwise = truth === true || statement.elseStatement === undefined ? CONTINUES : walkStatement(statement.elseStatement, scope);
  if (!strict(scope)) {
    if (then.evidence !== undefined) return found(then.evidence);
    if (otherwise.evidence !== undefined) return found(otherwise.evidence);
    if (truth === true) return then;
    if (truth === false) return otherwise;
    if (statement.elseStatement !== undefined && then.exit !== "none" && otherwise.exit !== "none") return { evidence: undefined, exit: then.exit === "return" && otherwise.exit === "return" ? "return" : "jump" };
    return CONTINUES;
  }
  if (truth === true) return withConditional(then, condition.conditional);
  if (truth === false) return withConditional(otherwise, condition.conditional);
  const exitAt = (then.evidence === undefined ? then.exitAt : undefined) ?? (otherwise.evidence === undefined ? otherwise.exitAt : undefined);
  if (exitAt !== undefined) return mayReturn(exitAt);
  if (then.evidence !== undefined && (otherwise.evidence !== undefined || throws(otherwise))) return found(then.evidence);
  if (otherwise.evidence !== undefined && throws(then)) return found(otherwise.evidence);
  const arm = then.evidence ?? otherwise.evidence;
  if (arm !== undefined) return { ...CONTINUES, conditional: condition.conditional ?? { evidence: arm, route: `the if at ${scope.a.where(statement)} may take the branch without it` } };
  const inner = condition.conditional ?? then.conditional ?? otherwise.conditional;
  if (statement.elseStatement !== undefined && then.exit !== "none" && otherwise.exit !== "none") return { evidence: undefined, exit: then.exit === "return" && otherwise.exit === "return" ? "return" : "jump", conditional: inner };
  return withConditional(CONTINUES, inner);
}

function walkTry(statement: ts.TryStatement, scope: EvidenceScope): Walk {
  const attempt = walkBlock(statement.tryBlock.statements, scope);
  const handler = statement.catchClause;
  if (!strict(scope)) {
    if (attempt.evidence !== undefined) return attempt;
    const recovery = handler === undefined ? CONTINUES : walkBlock(handler.block.statements, scope);
    if (recovery.evidence !== undefined) return recovery;
    const final = statement.finallyBlock === undefined ? CONTINUES : walkBlock(statement.finallyBlock.statements, scope);
    if (final.evidence !== undefined || final.exit !== "none") return final;
    return attempt.exit === "return" && (handler === undefined || recovery.exit === "return") ? { evidence: undefined, exit: "return" } : CONTINUES;
  }
  if (attempt.evidence === undefined && attempt.exitAt !== undefined) return mayReturn(attempt.exitAt);
  const recovery = handler === undefined ? undefined : walkBlock(handler.block.statements, scope);
  if (recovery !== undefined && recovery.evidence === undefined && recovery.exitAt !== undefined) return mayReturn(recovery.exitAt);
  if (attempt.evidence !== undefined && (recovery === undefined || recovery.evidence !== undefined || throws(recovery))) return found(attempt.evidence);
  const final = statement.finallyBlock === undefined ? undefined : walkBlock(statement.finallyBlock.statements, scope);
  if (final?.evidence !== undefined) return found(final.evidence);
  if (final?.exitAt !== undefined) return mayReturn(final.exitAt);
  const at = handler === undefined ? "" : scope.a.where(handler);
  if (attempt.evidence !== undefined) return { ...CONTINUES, conditional: { evidence: attempt.evidence, route: `the catch at ${at} may swallow a throw that comes before it` } };
  if (recovery?.evidence !== undefined) return { ...CONTINUES, conditional: { evidence: recovery.evidence, route: `it runs only in the catch at ${at}, when the try block throws` } };
  const inner = attempt.conditional ?? recovery?.conditional ?? final?.conditional;
  if (final !== undefined && final.exit !== "none") return { evidence: undefined, exit: final.exit, conditional: inner };
  if (attempt.exit === "return" && (recovery === undefined || recovery.exit === "return")) return { evidence: undefined, exit: "return", conditional: inner };
  return withConditional(CONTINUES, inner);
}

function walkSwitch(statement: ts.SwitchStatement, scope: EvidenceScope): Walk {
  const head = findStrict(statement.expression, scope);
  if (head.evidence !== undefined) return head;
  const discriminant = unwrap(statement.expression);
  const literal = ts.isNumericLiteral(discriminant) || ts.isStringLiteralLike(discriminant) ? discriminant.text : undefined;
  const clauses = statement.caseBlock.clauses;
  for (const clause of clauses) {
    const label = ts.isCaseClause(clause) ? findIn(clause.expression, scope) : undefined;
    if (label !== undefined) return found(label);
  }
  if (!strict(scope) || literal !== undefined) {
    let live = false;
    for (const clause of clauses) {
      if (ts.isCaseClause(clause)) {
        const value = unwrap(clause.expression);
        const matches = literal === undefined || !(ts.isNumericLiteral(value) || ts.isStringLiteralLike(value)) || value.text === literal;
        live = live || matches;
      } else live = true;
      if (!live) continue;
      const step = walkBlock(clause.statements, scope);
      if (step.evidence !== undefined) return step;
      if (strict(scope) && step.exitAt !== undefined) return mayReturn(step.exitAt);
      if (step.exit !== "none") live = false;
    }
    return withConditional(CONTINUES, head.conditional);
  }
  // Strict, non-literal discriminant: every clause the switch may enter runs on to its first exit (fallthrough included).
  const runs = clauses.map((_clause, start) => {
    let conditional: Conditional | undefined;
    for (const clause of clauses.slice(start)) {
      const step = walkBlock(clause.statements, scope);
      if (step.evidence !== undefined || step.exitAt !== undefined || step.exit !== "none") return withConditional(step, conditional);
      conditional ??= step.conditional;
    }
    return withConditional(CONTINUES, conditional);
  });
  const exitAt = runs.find(run => run.evidence === undefined && run.exitAt !== undefined)?.exitAt;
  if (exitAt !== undefined) return mayReturn(exitAt);
  const first = runs.find(run => run.evidence !== undefined)?.evidence;
  const covered = clauses.some(ts.isDefaultClause) && runs.every(run => run.evidence !== undefined || throws(run));
  if (first !== undefined && covered) return found(first);
  if (first !== undefined) return { ...CONTINUES, conditional: head.conditional ?? { evidence: first, route: `the switch at ${scope.a.where(statement)} may take a clause without it` } };
  return withConditional(CONTINUES, head.conditional ?? runs.find(run => run.conditional !== undefined)?.conditional);
}

/** U2: the labeled statement a labeled break leaves, when it is not a loop (a loop's break is the loop-body residual's). */
function leftStatement(statement: ts.BreakStatement): ts.LabeledStatement | undefined {
  const label = statement.label?.text;
  for (let node: ts.Node = statement.parent; label !== undefined && !ts.isSourceFile(node) && !ts.isFunctionLike(node); node = node.parent) {
    if (ts.isLabeledStatement(node) && node.label.text === label) return ts.isIterationStatement(node.statement, false) ? undefined : node;
  }
  return undefined;
}

function walkStatement(statement: ts.Statement, scope: EvidenceScope): Walk {
  if (ts.isBlock(statement)) return walkBlock(statement.statements, scope);
  if (ts.isExpressionStatement(statement)) return findStrict(statement.expression, scope);
  if (ts.isVariableStatement(statement)) {
    let conditional: Conditional | undefined;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.initializer === undefined) continue;
      const step = findStrict(declaration.initializer, scope);
      if (step.evidence !== undefined) return step;
      conditional ??= step.conditional;
    }
    return withConditional(CONTINUES, conditional);
  }
  if (ts.isReturnStatement(statement)) {
    const value = statement.expression === undefined ? CONTINUES : findStrict(statement.expression, scope);
    return value.evidence !== undefined ? { evidence: value.evidence, exit: "return" } : { evidence: undefined, exit: "return", exitAt: statement, conditional: value.conditional };
  }
  if (ts.isThrowStatement(statement)) return { evidence: findIn(statement.expression, scope), exit: "return" };
  if (ts.isBreakStatement(statement) || ts.isContinueStatement(statement)) {
    // U2: under the strict reading a break leaving a labeled NON-loop statement is a strict exit of it (exitAt = the break)
    const left = strict(scope) && ts.isBreakStatement(statement) ? leftStatement(statement) : undefined;
    if (left !== undefined && scope.landed?.has(left) !== true) return mayReturn(statement);
    return { evidence: undefined, exit: "jump" };
  }
  if (ts.isIfStatement(statement)) return walkIf(statement, scope);
  if (ts.isForOfStatement(statement) || ts.isForInStatement(statement)) {
    const head = findStrict(statement.expression, scope);
    if (head.evidence !== undefined) return head;
    if (isEmptyArray(statement.expression)) return withConditional(CONTINUES, head.conditional);
    return withConditional(loopBody(walkStatement(statement.statement, scope), scope), head.conditional);
  }
  if (ts.isForStatement(statement)) {
    const initializer = statement.initializer === undefined ? CONTINUES : findStrict(statement.initializer, scope);
    if (initializer.evidence !== undefined) return initializer;
    const condition = statement.condition === undefined ? CONTINUES : findStrict(statement.condition, scope);
    if (condition.evidence !== undefined) return condition;
    const conditional = initializer.conditional ?? condition.conditional;
    if (statement.condition !== undefined && literalTruth(statement.condition, scope.a) === false) return withConditional(CONTINUES, conditional);
    const body = walkStatement(statement.statement, scope);
    const incremented = body.evidence === undefined && !(strict(scope) && body.exitAt !== undefined) && statement.incrementor !== undefined ? findStrict(statement.incrementor, scope) : CONTINUES;
    return withConditional(loopBody(incremented.evidence !== undefined ? incremented : body, scope), conditional);
  }
  if (ts.isWhileStatement(statement)) {
    const head = findStrict(statement.expression, scope);
    if (head.evidence !== undefined) return head;
    if (literalTruth(statement.expression, scope.a) === false) return withConditional(CONTINUES, head.conditional);
    return withConditional(loopBody(walkStatement(statement.statement, scope), scope), head.conditional);
  }
  if (ts.isDoStatement(statement)) {
    const body = walkStatement(statement.statement, scope);
    if (body.evidence !== undefined) return found(body.evidence);
    if (strict(scope) && body.exitAt !== undefined) return mayReturn(body.exitAt);
    const tail = findStrict(statement.expression, scope);
    if (tail.evidence !== undefined) return tail;
    return strict(scope) ? withConditional(CONTINUES, body.conditional ?? tail.conditional) : CONTINUES;
  }
  if (ts.isTryStatement(statement)) return walkTry(statement, scope);
  if (ts.isLabeledStatement(statement)) {
    const inner = walkStatement(statement.statement, scope);
    const exit = inner.evidence === undefined ? inner.exitAt : undefined;
    if (exit !== undefined && ts.isBreakStatement(exit) && leftStatement(exit) === statement) {
      // U2: the break lands right after this statement, so the walk resumes there. Its body is read again with its own
      // breaks as plain jumps: a return later in it still reddens, its assertion is reached only on some paths, and an
      // assertion after the statement still counts on every path (no false red).
      const rest = walkStatement(statement.statement, { ...scope, landed: new Set([...(scope.landed ?? []), statement]) });
      if (rest.evidence !== undefined) return { ...CONTINUES, conditional: { evidence: rest.evidence, route: `the break at ${scope.a.where(exit)} may leave the labeled block ${statement.label.text} before it` } };
      return { evidence: undefined, exit: rest.exit === "return" ? "return" : "none", exitAt: rest.exitAt, conditional: rest.conditional };
    }
    return inner.evidence !== undefined ? inner : { evidence: undefined, exit: inner.exit === "return" ? "return" : "none", exitAt: inner.exitAt, conditional: inner.conditional };
  }
  if (ts.isSwitchStatement(statement)) return walkSwitch(statement, scope);
  if (
    ts.isFunctionDeclaration(statement) ||
    ts.isClassDeclaration(statement) ||
    ts.isInterfaceDeclaration(statement) ||
    ts.isTypeAliasDeclaration(statement) ||
    ts.isEnumDeclaration(statement) ||
    ts.isModuleDeclaration(statement) ||
    ts.isImportDeclaration(statement) ||
    ts.isEmptyStatement(statement)
  ) {
    return CONTINUES;
  }
  return findStrict(statement, scope);
}

function functionEvidence(fn: AnalysedFunction, scope: EvidenceScope): string | undefined {
  if (scope.visited.has(fn) || scope.depth > 8 || fn.body === undefined) return undefined;
  scope.visited.add(fn);
  const inner: EvidenceScope = { ...scope, depth: scope.depth + 1 };
  return ts.isBlock(fn.body) ? walkBlock(fn.body.statements, inner).evidence : findIn(fn.body, inner);
}

/** The case function's own walk (depth 1); under the strict reading it also names the return or some-paths assertion that hollows it. */
function caseEvidence(fn: AnalysedFunction, scope: EvidenceScope): Walk {
  // assertion.case-body, never a generator's: vitest calls the case, and the generator it returns is never iterated
  if (fn.body === undefined || fn.asteriskToken !== undefined) return CONTINUES;
  scope.visited.add(fn);
  const inner: EvidenceScope = { ...scope, depth: 1 };
  const walk = ts.isBlock(fn.body) ? walkBlock(fn.body.statements, inner) : findStrict(fn.body, inner);
  if (walk.evidence !== undefined) through("assertion.case-body", fn);
  return walk;
}


/** Symbols bound to the case's test context: the parameter itself, or its destructured expect. */
function contextSymbols(fn: AnalysedFunction, index: number, a: SourceAnalysis): { readonly roots: Set<ts.Symbol>; readonly expects: Set<ts.Symbol> } {
  const roots = new Set<ts.Symbol>();
  const expects = new Set<ts.Symbol>();
  const parameter = index < 0 ? undefined : fn.parameters[index];
  const symbolOf = (name: ts.BindingName): ts.Symbol | undefined => (ts.isIdentifier(name) ? a.checker.getSymbolAtLocation(name) : undefined);
  if (parameter !== undefined && ts.isIdentifier(parameter.name)) {
    const symbol = symbolOf(parameter.name);
    if (symbol !== undefined) roots.add(symbol);
  } else if (parameter !== undefined && ts.isObjectBindingPattern(parameter.name)) {
    for (const element of parameter.name.elements) {
      const symbol = bindingKey(element) === "expect" ? symbolOf(element.name) : undefined;
      if (symbol !== undefined) expects.add(symbol);
    }
  }
  return { roots, expects };
}

// ---------------------------------------------------------------------------------------------
// The judge: one verdict per pin, attribution in every red.
// ---------------------------------------------------------------------------------------------

function verdict(pin: CasePin, leg: CensusLeg, code: CensusCode, why: string, cases = 0): PinVerdict {
  return { pin, ok: code === "ok", leg, code, why: `${pin.file} "${pin.title}" [${pin.tier}]: ${why}`, cases, through: [...(trail ?? [])].sort() };
}

/** Judges one pin with its own trail of roster rows. */
function traced(judgment: () => PinVerdict): PinVerdict {
  const outer = trail;
  trail = new Set();
  try {
    return judgment();
  } finally {
    trail = outer;
  }
}

const sameSuite = (pin: CasePin, path: readonly string[]): boolean => pin.suite === undefined || (pin.suite.length === path.length && pin.suite.every((name, index) => name === path[index]));
/** The case ran under the tier: registered to run and reached a result (passed or failed). */
const ran = (test: RunCase): boolean => test.mode === "run" && (test.state === "passed" || test.state === "failed");

/** The registration's test function: its last function argument, or a named same-file function. */
function caseFunction(call: ts.CallExpression, a: SourceAnalysis): AnalysedFunction | undefined {
  for (let index = call.arguments.length - 1; index >= 0; index -= 1) {
    const argument = call.arguments[index];
    if (argument === undefined) continue;
    const fn = localFunction(argument, a);
    if (fn !== undefined) return fn;
  }
  return undefined;
}

/** Index of the test context among the case function's parameters: it.for passes it second, it.each never. */
function contextIndex(call: ts.CallExpression): number {
  const callee = unwrap(call.expression);
  if (ts.isCallExpression(callee)) {
    const head = unwrap(callee.expression);
    if (ts.isPropertyAccessExpression(head) && head.name.text === "for") return 1;
    if (ts.isPropertyAccessExpression(head) && head.name.text === "each") return -1;
  }
  return 0;
}

/** The row count of an it.each / it.for table written as an array literal without spreads; undefined otherwise. */
function literalRows(site: ts.CallExpression): number | undefined {
  const head = unwrap(site.expression);
  const table = ts.isCallExpression(head) ? head.arguments[0] : undefined;
  if (table === undefined) return undefined;
  const value = unwrap(table);
  if (!ts.isArrayLiteralExpression(value) || value.elements.some(ts.isSpreadElement)) return undefined;
  return value.elements.length;
}

interface Located {
  readonly cases: readonly RunCase[];
  readonly call: ts.CallExpression | undefined;
}

/**
 * The pinned case as the runner reported it. "Collected exactly once" (owner ruling 13:30Z), and for an .each pin
 * exactly once PER TABLE ROW with the table non-empty (13:36Z amendment): one suite path, at least max(1, minCases)
 * cases, and exactly one case per row when the table is a literal.
 */
function locate(pin: CasePin, module: RunModule, a: SourceAnalysis): Located | PinVerdict {
  if (pin.each !== undefined) {
    const sites = a.eachSites(pin.title);
    if (sites.length === 0) return verdict(pin, "exists", "absent", "no it.each / it.for call site registers this template");
    if (sites.length > 1) return verdict(pin, "exists", "duplicated", `${sites.length} it.each / it.for call sites register this template`);
    const site = sites[0];
    if (site === undefined) return verdict(pin, "exists", "absent", "no call site");
    const keys = new Set(a.callKeys(site));
    const cases = module.tests.filter(test => keys.has(`${test.line}:${test.column}`) && sameSuite(pin, test.suitePath));
    const suites = new Set(cases.map(test => JSON.stringify(test.suitePath)));
    if (suites.size > 1) return verdict(pin, "exists", "duplicated", `the call site registers its table under ${suites.size} suites; each row must be collected exactly once`, cases.length);
    const minimum = Math.max(1, pin.each.minCases);
    if (cases.length < minimum) return verdict(pin, "exists", "each-empty", `the table registered ${cases.length} case(s); the census needs at least ${minimum}`, cases.length);
    const rows = literalRows(site);
    if (rows !== undefined && cases.length !== rows) {
      return verdict(pin, "exists", cases.length > rows ? "duplicated" : "each-empty", `the runner collected ${cases.length} case(s) for a ${rows}-row table; each row must be collected exactly once`, cases.length);
    }
    return { cases, call: site };
  }
  const cases = module.tests.filter(test => test.name === pin.title && sameSuite(pin, test.suitePath));
  if (cases.length === 0) return verdict(pin, "exists", "absent", "the runner collected no case with this title");
  if (cases.length > 1) return verdict(pin, "exists", "duplicated", `the runner collected ${cases.length} cases with this title`, cases.length);
  const only = cases[0];
  return { cases, call: only === undefined ? undefined : a.callAt(only.line, only.column) };
}

interface JudgeContext {
  readonly root: string;
  readonly tierOf: (tier: string) => TierResolution;
  readonly runs: ReadonlyMap<string, TierRun>;
  readonly sources: SourceCache;
}

function moduleIn(run: TierRun | undefined, absolute: string): RunModule | undefined {
  if (run === undefined || !run.ok) return undefined;
  const target = realOrSelf(absolute);
  return run.report.modules.find(module => realOrSelf(module.file) === target);
}

const scheduledIn = (run: TierRun, absolute: string): boolean => run.ok && run.report.scheduled.some(file => realOrSelf(file) === realOrSelf(absolute));

interface Cause {
  readonly code: CensusCode;
  readonly detail: string;
}

/**
 * A skip reachable from the pin's own case function or from a hook of its own enclosing call chain (never file-wide),
 * including the runner's public current-test routes the case or its chain reaches (J5).
 */
function chainCause(call: ts.CallExpression, fn: AnalysedFunction | undefined, a: SourceAnalysis, registered: ReadonlySet<string>, sources: SourceCache, ran = false): Cause | undefined {
  const body = fn?.body;
  const hazard = fixtureHazard(call, a) ?? (fn === undefined ? undefined : contextHazard(fn, contextIndex(call), a)) ?? (body === undefined ? undefined : runnerRoute(body, a, sources, "the case"));
  if (hazard !== undefined) return { code: hazard.kind === "skip" ? "context-skip" : "context-unknown", detail: hazard.detail };
  const hook = chainHazard(call, a, registered, sources);
  if (hook !== undefined) return { code: hook.kind === "skip" ? "hook-skip" : "context-unknown", detail: hook.detail };
  // registration.integrity, for a case that ran green (a red one stays red, attributed as before): a hook, registrar or
  // collector (or the registration API) escaping the rows may reach the context of any pin of the file
  const leak = ran ? integrity(a).context : undefined;
  return leak === undefined ? undefined : { code: "context-unknown", detail: leak };
}

/** U2: an elimination red names what the census observed and every route still open, never a guessed cause. */
const UNMODELLED = "nothing the census models in the case or its own call chain skips it; the remaining routes: a setup file, a config filter, a CLI flag, or a runtime skip through code the census does not follow";
const UNMODELLED_REPORT =
  "nothing the census models in the case or its own call chain skips it; the remaining routes: a skip / todo modifier or a skipping options value, a setup file, a config filter, a CLI flag, or a runtime skip through code the census does not follow";

function judgeOne(pin: CasePin, context: JudgeContext): PinVerdict {
  const resolution = context.tierOf(pin.tier);
  if (!resolution.ok) return verdict(pin, "runs-where", "tier-unresolved", resolution.why);
  const absolute = resolve(context.root, pin.file);
  const loaded = context.sources.get(absolute);
  if (loaded.kind !== "ok") return verdict(pin, "exists", loaded.kind, loaded.why);
  const a = loaded.analysis;
  const run = context.runs.get(pin.tier);
  if (run === undefined || !run.ok) return verdict(pin, "runs-where", "run-error", `the ${pin.tier} tier run failed: ${run?.why ?? "it never started"}`);
  const module = moduleIn(run, absolute);
  if (module === undefined) {
    if (scheduledIn(run, absolute)) return verdict(pin, "runs-where", "run-error", `the ${pin.tier} tier run scheduled this file but never ran it (its global setup or the run aborted first)`);
    return verdict(pin, "runs-where", "not-collected", `the ${pin.tier} tier run does not collect this file (${resolution.chain.join(" -> ")})`);
  }
  if (module.errors.length > 0) return verdict(pin, "exists", "collection-error", `the runner could not collect the file: ${module.errors[0] ?? ""}`);
  const located = locate(pin, module, a);
  if ("ok" in located) return located;
  const count = located.cases.length;
  const registered = new Set<string>();
  for (const test of module.tests) registered.add(`${test.line}:${test.column}`);
  for (const suite of module.suites) registered.add(`${suite.line}:${suite.column}`);
  const call = located.call;
  const fn = call === undefined ? undefined : caseFunction(call, a);
  for (const test of located.cases) {
    if (test.fails) return verdict(pin, "asserts", "inverted", "registered with fails: it passes only when its assertions fail", count);
    if (test.mode !== "run") {
      return verdict(pin, "runs-where", "skipped", `the ${pin.tier} run collected the case with mode ${test.mode}: a skip / todo modifier, a skipping options value or a name filter keeps it from running`, count);
    }
    if (test.state === "failed") {
      if (test.errors.some(error => error.includes(NO_ASSERTION))) return verdict(pin, "asserts", "no-assertion", `the case reached no assertion when ${pin.tier} ran it`, count);
      return verdict(pin, "asserts", "failed", `the case failed when ${pin.tier} ran it: ${test.errors[0] ?? "no error message"}`, count);
    }
    if (test.state !== "passed") {
      const cause = call === undefined ? undefined : chainCause(call, fn, a, registered, context.sources);
      if (cause !== undefined) return verdict(pin, "runs-where", cause.code, cause.detail, count);
      return verdict(pin, "runs-where", "skipped", `${pin.tier} ran the file but not the case (result ${test.state}); ${UNMODELLED}`, count);
    }

  }
  if (pin.tier !== DEFAULT_GATE_TIER) {
    const gate = context.tierOf(DEFAULT_GATE_TIER);
    if (!gate.ok) return verdict(pin, "runs-where", "tier-unresolved", `exclusivity against the default gate is unverifiable: ${gate.why}`, count);
    const gateRun = context.runs.get(DEFAULT_GATE_TIER);
    if (gateRun === undefined || !gateRun.ok) return verdict(pin, "runs-where", "run-error", `exclusivity against the default gate is unverifiable: ${gateRun?.why ?? "the default gate never ran"}`, count);
    const gateModule = moduleIn(gateRun, absolute);
    if (gateModule !== undefined && gateModule.errors.length > 0) return verdict(pin, "runs-where", "also-default-gate", `labelled ${pin.tier} but the default gate (${DEFAULT_GATE_TIER}) also collects the file (and fails to load it: ${gateModule.errors[0] ?? ""})`, count);
    const shared = gateModule?.tests.filter(test => ran(test) && located.cases.some(own => own.name === test.name && own.line === test.line && own.column === test.column));
    if (shared !== undefined && shared.length > 0) return verdict(pin, "runs-where", "also-default-gate", `labelled ${pin.tier} but the default gate (${DEFAULT_GATE_TIER}) also runs it`, count);
  }
  if (call === undefined) return verdict(pin, "asserts", "unmapped-location", "the runner's location maps to no call expression", count);
  if (fn === undefined) return verdict(pin, "asserts", "body-unresolved", `the case function at ${a.where(call)} is not statically resolvable`, count);
  const cause = chainCause(call, fn, a, registered, context.sources, true);
  if (cause !== undefined) return verdict(pin, "runs-where", cause.code, cause.detail, count);
  const symbols = contextSymbols(fn, contextIndex(call), a);
  // The run carries --expect.requireAssertions, so the runtime count reads early exits; the AST reads the matcher.
  const evidence = caseEvidence(fn, { a, sources: context.sources, contextRoots: symbols.roots, contextExpect: symbols.expects, visited: new Set(), depth: 0, strictExits: false }).evidence;
  if (evidence === undefined) return verdict(pin, "asserts", "no-assertion", `the run counted an assertion, but no matcher-bearing vitest assertion is reachable in the case function at ${a.where(fn)} (a bare expect(x) asserts nothing)`, count);
  const runs = count === 1 ? "collected once" : `collected once per table row (${count} rows)`;
  return verdict(pin, "asserts", "ok", `${runs}, passed under ${pin.tier}, asserts (${evidence})`, count);
}


/**
 * EXECUTING MODE (fixtures and non-default tiers; never the default-tier judgment once wb-nl8 lands - use judge()):
 * judges every pin by EXECUTING each claimed tier's real entrypoint once (plus the default gate for the exclusivity of
 * non-default tiers), one tier after another, then the AST inner legs. Verdicts come back in pin order. Inside a tier
 * run the helper started (read from the ancestors' command lines, never the environment), it starts nothing and every
 * verdict is a nested-run red.
 */
export async function judgePins(root: string, pins: readonly CasePin[], options: JudgeOptions = {}): Promise<readonly PinVerdict[]> {
  if (insideCensusRun()) {
    return pins.map(pin => verdict(pin, "runs-where", "nested-run", "reached from inside a tier run the census helper started (an ancestor's command line names its per-run reporter); it never starts another one there (recursion guard)"));
  }

  const realRoot = realpathSync(root);
  const resolutions = new Map<string, TierResolution>();
  const tierOf = (tier: string): TierResolution => {
    let resolution = resolutions.get(tier);
    if (resolution === undefined) {
      resolution = resolveTier(realRoot, tier);
      resolutions.set(tier, resolution);
    }
    return resolution;
  };
  const filesByTier = new Map<string, Set<string>>();
  const add = (tier: string, file: string): void => {
    let files = filesByTier.get(tier);
    if (files === undefined) {
      files = new Set();
      filesByTier.set(tier, files);
    }
    files.add(file);
  };
  for (const pin of pins) {
    add(pin.tier, pin.file);
    if (pin.tier !== DEFAULT_GATE_TIER) add(DEFAULT_GATE_TIER, pin.file);
  }
  const runs = new Map<string, TierRun>();
  for (const [tier, files] of filesByTier) {
    const resolution = tierOf(tier);
    if (resolution.ok) runs.set(tier, await runTier(realRoot, resolution, [...files].sort(), options));
  }
  const context: JudgeContext = { root: realRoot, tierOf, runs, sources: new SourceCache() };
  return pins.map(pin => traced(() => judgeOne(pin, context)));
}

// ---------------------------------------------------------------------------------------------
// Report mode: judge(reportPath, pins) over vitest's own JSON report of the tier's run, never re-executed.
// ---------------------------------------------------------------------------------------------

interface JsonLocation {
  readonly line: number;
  readonly column: number;
}
/** One assertionResults entry of vitest's JSON reporter (4.1.10: ancestorTitles, title, status, failureMessages, location, tags). */
interface JsonCase {
  readonly ancestorTitles: readonly string[];
  readonly title: string;
  readonly status: string;
  readonly failureMessages: readonly string[];
  readonly location?: JsonLocation | null;
  readonly tags?: readonly string[];
}
interface JsonFile {
  readonly name: string;
  readonly status: string;
  readonly message?: string;
  readonly assertionResults: readonly JsonCase[];
}
type LoadedReport = { readonly ok: true; readonly files: readonly JsonFile[]; readonly mtimeMs: number } | { readonly ok: false; readonly why: string };
type ReadReport = Extract<LoadedReport, { readonly ok: true }>;

const isLocation = (value: unknown): value is JsonLocation => isRecord(value) && Number.isInteger(value.line) && Number.isInteger(value.column);
const isJsonCase = (value: unknown): value is JsonCase =>
  isRecord(value) &&
  isStringArray(value.ancestorTitles) &&
  typeof value.title === "string" &&
  typeof value.status === "string" &&
  isStringArray(value.failureMessages) &&
  (value.location === undefined || value.location === null || isLocation(value.location)) &&
  (value.tags === undefined || isStringArray(value.tags));
const isJsonFile = (value: unknown): value is JsonFile =>
  isRecord(value) &&
  typeof value.name === "string" &&
  typeof value.status === "string" &&
  (value.message === undefined || typeof value.message === "string") &&
  Array.isArray(value.assertionResults) &&
  value.assertionResults.every(isJsonCase);
const errorText = (error: unknown): string => String(error instanceof Error ? error.message : error);
const hasLocation = (entry: JsonCase): entry is JsonCase & { readonly location: JsonLocation } => entry.location !== undefined && entry.location !== null;

function loadReport(path: string): LoadedReport {
  let text: string;
  let mtimeMs: number;
  try {
    text = readFileSync(path, "utf8");
    mtimeMs = statSync(path).mtimeMs;
  } catch (error) {
    return { ok: false, why: `the report ${path} is unreadable: ${errorText(error)}` };
  }
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch (error) {
    return { ok: false, why: `the report ${path} is not JSON: ${errorText(error)}` };
  }
  if (!isRecord(value) || typeof value.numTotalTests !== "number" || !Array.isArray(value.testResults) || !value.testResults.every(isJsonFile)) {
    return { ok: false, why: `the report ${path} does not have vitest's JSON reporter shape (numTotalTests and per-file testResults of assertionResults)` };
  }
  return { ok: true, files: value.testResults, mtimeMs };
}

/** The repository root a report's pins resolve against: named, or the directory holding the report's .forge directory. */
function reportRoot(path: string, options: ReportOptions): string | undefined {
  if (options.root !== undefined) return realOrSelf(resolve(options.root));
  const holder = dirname(resolve(path));
  return basename(holder) === ".forge" ? realOrSelf(dirname(holder)) : undefined;
}

/** The test file whose case is calling judge() (vitest's expect state names it), or undefined outside a vitest run. */
function judgingFile(): string | undefined {
  try {
    const path: unknown = expect.getState().testPath;
    return typeof path === "string" && path !== "" ? realOrSelf(path) : undefined;
  } catch {
    return undefined;
  }
}

function reportModule(report: ReadReport, absolute: string): JsonFile | undefined {
  const target = realOrSelf(absolute);
  return report.files.find(file => realOrSelf(file.name) === target);
}

/** A report file in the run-report shape, so locate() reads both modes alike (the report records no mode or fails flag). */
function toRunModule(file: JsonFile): RunModule {
  const tests: RunCase[] = file.assertionResults.filter(hasLocation).map(entry => ({
    name: entry.title,
    suitePath: entry.ancestorTitles,
    mode: "run",
    fails: false,
    each: false,
    line: entry.location.line,
    column: entry.location.column,
    state: entry.status,
    errors: entry.failureMessages,
    tags: entry.tags ?? [],
  }));
  return { file: file.name, state: file.status, errors: file.message === undefined || file.message === "" ? [] : [file.message], tests, suites: [] };
}

// ---- the fails inversion, read from the source: the report records an inverted case as passed ----

/** A const binding (a let or var may be reassigned, so its value is not static). */
const isConst = (declaration: ts.VariableDeclaration): boolean => (ts.getCombinedNodeFlags(declaration) & ts.NodeFlags.Const) !== 0;

/** The text a property name reads, or undefined for a computed non-literal key. */
function propertyKey(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isPrivateIdentifier(name)) return name.text;
  if (ts.isComputedPropertyName(name)) {
    const key = unwrap(name.expression);
    return ts.isStringLiteralLike(key) ? key.text : undefined;
  }
  return undefined;
}

/** A static truth value: a literal, or a same-file const bound to one; "unknown" otherwise. */
function constTruth(expression: ts.Expression, a: SourceAnalysis, depth = 0): boolean | "unknown" {
  const literal = literalTruth(expression, a);
  if (literal !== undefined) return literal;
  const value = unwrap(expression);
  if (!ts.isIdentifier(value) || depth >= 6) return "unknown";
  const declaration = a.checker.getSymbolAtLocation(value)?.declarations?.[0];
  if (declaration === undefined || !ts.isVariableDeclaration(declaration) || !isConst(declaration) || declaration.initializer === undefined) return "unknown";
  return constTruth(declaration.initializer, a, depth + 1);
}

/**
 * options.const (u62 respin-4, a POSITIVE read list): a const options binding is read only if every reference to it
 * stands in an options.read-position; anywhere else - a destructuring or for-in / for-of target, a callee (it passes
 * the object as this), an alias, a non-registration argument - fails may be written through it.
 */
function escapes(declaration: ts.VariableDeclaration, a: SourceAnalysis): boolean {
  const name = declaration.name;
  const symbol = ts.isIdentifier(name) ? a.checker.getSymbolAtLocation(name) : undefined;
  if (symbol === undefined) return true;
  let escaped = false;
  const visit = (node: ts.Node): void => {
    if (escaped) return;
    if (ts.isIdentifier(node) && node !== name && isReference(node) && !inTypePosition(node) && valueSymbol(node, a) === symbol) {
      if (!optionsReference(node, a)) escaped = true;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(a.sf);
  return escaped;
}

/** options.read-position: one reference to a const options binding - a member read whose value is only read, the options argument of a resolved registration, a spread source, a typeof operand. */
function optionsReference(reference: ts.Identifier, a: SourceAnalysis): boolean {
  const node = climbWrappers(reference);
  const parent = node.parent;
  let read = false;
  if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === node) read = readOnly(parent);
  else if (ts.isCallExpression(parent) && parent.arguments[1] === node) read = registrationApi(parent, a) !== undefined;
  else if (ts.isSpreadAssignment(parent)) read = !assignmentPattern(parent.parent);
  else read = ts.isTypeOfExpression(parent);
  if (read) through("options.read-position", reference);
  return read;
}

const isAssignmentOperator = (kind: ts.SyntaxKind): boolean => kind >= ts.SyntaxKind.FirstAssignment && kind <= ts.SyntaxKind.LastAssignment;

/** Is a member read's VALUE only read - an operand, a condition, an argument, an initializer, a discard - never a write target, a callee or a tag? */
function readOnly(access: ts.Expression): boolean {
  const node = climbWrappers(access);
  const parent = node.parent;
  if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === node) return readOnly(parent);
  if (ts.isElementAccessExpression(parent) && parent.argumentExpression === node) return true;
  if (ts.isBinaryExpression(parent)) return parent.right === node || !isAssignmentOperator(parent.operatorToken.kind);
  if (ts.isPrefixUnaryExpression(parent)) return parent.operator !== ts.SyntaxKind.PlusPlusToken && parent.operator !== ts.SyntaxKind.MinusMinusToken;
  if (ts.isTypeOfExpression(parent) || ts.isVoidExpression(parent) || ts.isAwaitExpression(parent) || ts.isTemplateSpan(parent) || ts.isConditionalExpression(parent)) return true;
  if (ts.isExpressionStatement(parent) || ts.isReturnStatement(parent) || ts.isThrowStatement(parent) || ts.isIfStatement(parent) || ts.isWhileStatement(parent) || ts.isDoStatement(parent)) return true;
  if (ts.isSwitchStatement(parent) || ts.isCaseClause(parent) || ts.isForStatement(parent) || ts.isComputedPropertyName(parent)) return true;
  if ((ts.isForOfStatement(parent) || ts.isForInStatement(parent)) && parent.expression === node) return true;
  if ((ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.arguments?.some(argument => argument === node)) return true;
  if (ts.isVariableDeclaration(parent) && parent.initializer === node) return true;
  if (ts.isArrowFunction(parent) && parent.body === node) return true;
  if (ts.isPropertyAssignment(parent) && parent.initializer === node) return !assignmentPattern(parent.parent);
  if (ts.isArrayLiteralExpression(parent)) return !assignmentPattern(parent);
  if (ts.isSpreadElement(parent) || ts.isSpreadAssignment(parent)) return !assignmentPattern(parent.parent);
  return false;
}

/** Is an object or array literal a destructuring target - the left of =, a for-in / for-of initializer, or nested in one? */
function assignmentPattern(literal: ts.Node): boolean {
  let node: ts.Node = literal;
  for (;;) {
    const parent = node.parent;
    if (parent === undefined) return false;
    if (ts.isBinaryExpression(parent)) return parent.left === node && parent.operatorToken.kind === ts.SyntaxKind.EqualsToken;
    if (ts.isForOfStatement(parent) || ts.isForInStatement(parent)) return parent.initializer === node;
    if (!(ts.isParenthesizedExpression(parent) || ts.isPropertyAssignment(parent) || ts.isShorthandPropertyAssignment(parent) || ts.isSpreadAssignment(parent) || ts.isSpreadElement(parent) || ts.isArrayLiteralExpression(parent) || ts.isObjectLiteralExpression(parent))) return false;
    node = parent;
  }
}

type OptionsRead = { readonly fails: boolean | undefined } | { readonly unknown: string };

/** The fails an options value sets (true / false / absent), or why report mode cannot read it statically. */
function optionsFails(expression: ts.Expression, a: SourceAnalysis, depth = 0): OptionsRead {
  const value = unwrap(expression);
  if (ts.isNumericLiteral(value)) return { fails: undefined };
  if (ts.isIdentifier(value) && depth < 6) {
    const declaration = a.checker.getSymbolAtLocation(value)?.declarations?.[0];
    if (declaration !== undefined && ts.isVariableDeclaration(declaration) && isConst(declaration) && declaration.initializer !== undefined && !escapes(declaration, a)) {
      through("options.const", value);
      return optionsFails(declaration.initializer, a, depth + 1);
    }
  }
  if (!ts.isObjectLiteralExpression(value)) return { unknown: `the options at ${a.where(value)} are not a same-file const object literal, so report mode cannot read their fails (the report does not record it)` };
  through("options.literal", value);
  let fails: boolean | undefined;
  for (const property of value.properties) {
    if (ts.isSpreadAssignment(property)) {
      const spread = optionsFails(property.expression, a, depth + 1);
      if ("unknown" in spread) return spread;
      if (spread.fails !== undefined) fails = spread.fails;
      continue;
    }
    // options.literal: a method or an accessor may expose the object as this (vitest's spread runs a getter), so it may write fails
    if (ts.isMethodDeclaration(property) || ts.isGetAccessorDeclaration(property) || ts.isSetAccessorDeclaration(property)) {
      const kind = ts.isMethodDeclaration(property) ? "method" : ts.isGetAccessorDeclaration(property) ? "getter" : "setter";
      return { unknown: `the options at ${a.where(property)} carry the ${kind} ${propertyKey(property.name) ?? "with a computed name"}, which may write fails through this, so report mode cannot read their fails` };
    }
    const key = property.name === undefined ? undefined : propertyKey(property.name);
    if (key === undefined) return { unknown: `the options at ${a.where(property)} set a computed key, so report mode cannot read their fails` };
    if (key !== "fails") continue;
    const truth = ts.isPropertyAssignment(property) ? constTruth(property.initializer, a) : ts.isShorthandPropertyAssignment(property) ? constTruth(property.name, a) : "unknown";
    if (truth === "unknown") return { unknown: `the fails option at ${a.where(property)} is not a constant, so report mode cannot read it` };
    through("options.fails-constant", property);
    fails = truth;
  }
  return { fails };
}

/** The member names along a registration's callee chain (it.skip.fails: skip, fails) as the strict resolver reads them, or why they are unreadable. */
function chainMembers(expression: ts.Expression, a: SourceAnalysis): { readonly names: readonly string[] } | { readonly unknown: string } {
  const resolved = resolveChain(expression, a);
  return "unresolved" in resolved ? { unknown: `the chain of the registration at ${a.where(expression)} is unreadable, so report mode cannot read its fails: ${resolved.unresolved}` } : { names: resolved.members };
}

/** The options a registration passes (vitest 4: test(name, options, fn); a second argument that is the function passes none). */
function registrationOptions(call: ts.CallExpression, a: SourceAnalysis): ts.Expression | undefined {
  const second = call.arguments[1];
  return second === undefined || localFunction(second, a) !== undefined ? undefined : second;
}

/** The call a function literal is an argument of (through parentheses and assertions), or undefined. */
function callHolding(fn: FunctionLiteral): ts.CallExpression | undefined {
  let node: ts.Node = fn;
  while (ts.isParenthesizedExpression(node.parent) || ts.isAsExpression(node.parent) || ts.isSatisfiesExpression(node.parent)) node = node.parent;
  const parent = node.parent;
  return ts.isCallExpression(parent) && parent.arguments.some(argument => argument === node) ? parent : undefined;
}

/** A call's callee as written (whitespace collapsed, clipped), so an options-unknown red names what it could not resolve. */
function calleeText(call: ts.CallExpression, a: SourceAnalysis): string {
  const text = call.expression.getText(a.sf).replace(/\s+/g, " ");
  return text.length > 60 ? `${text.slice(0, 57)}...` : text;
}

/**
 * A class or object member whose code runs where it is CALLED or constructed, not where it is written (u62 gate-3
 * (1)-(5)), named for the red; undefined for anything else (a static block or static field runs where it is written).
 */
function deferredMember(member: ts.Node, child: ts.Node, a: SourceAnalysis): string | undefined {
  // a member's computed name and its decorators are evaluated where the class or object is written
  if (ts.isComputedPropertyName(child) || ts.isDecorator(child)) return undefined;
  const named = (name: ts.PropertyName): string => propertyKey(name) ?? "with a computed name";
  if (ts.isMethodDeclaration(member)) return `the method ${named(member.name)} at ${a.where(member)}`;
  if (ts.isGetAccessorDeclaration(member)) return `the getter ${named(member.name)} at ${a.where(member)}`;
  if (ts.isSetAccessorDeclaration(member)) return `the setter ${named(member.name)} at ${a.where(member)}`;
  if (ts.isConstructorDeclaration(member)) return `the constructor of a class at ${a.where(member)}`;
  if (!ts.isPropertyDeclaration(member) || member.initializer !== child) return undefined;
  // an instance field initializer runs at each construction; a static one runs where the class is written
  return (ts.getCombinedModifierFlags(member) & ts.ModifierFlags.Static) !== 0 ? undefined : `the instance property initializer ${named(member.name)} at ${a.where(member)}`;
}

/**
 * The fails flag the report cannot carry, read from the source the way vitest 4 merges it: the case's chain modifiers
 * (it.fails, through const aliases), then each enclosing suite's options outermost first and the case's own options last
 * (options override the chain). Fail-closed (the design invariant's registration flow): every enclosing body must run
 * WHERE IT IS WRITTEN inside a callback a strictly resolved describe / suite holds - a method, accessor, constructor or
 * instance initializer runs where it is called, and a wrapper function or any other holder may register a suite with
 * fails the source does not show (I1) - the options must be same-file constants, and the file must not let the
 * registration API escape (A1). judgeReported calls it only for a callee the strict resolver reads as it / test (U1).
 */
function inversionHazard(call: ts.CallExpression, a: SourceAnalysis): { readonly kind: "inverted" | "unknown"; readonly detail: string } | undefined {
  const suites: ts.CallExpression[] = [];
  for (let node: ts.Node = call; node.parent !== undefined && !ts.isSourceFile(node.parent); node = node.parent) {
    const parent = node.parent;
    const deferred = deferredMember(parent, node, a);
    if (deferred !== undefined) return { kind: "unknown", detail: `the case is registered inside ${deferred}, which runs where it is called, so report mode cannot read the enclosing suites' fails` };
    if (!(isFunctionLiteral(parent) || ts.isFunctionDeclaration(parent))) continue;
    const holder = ts.isFunctionDeclaration(parent) ? undefined : callHolding(parent);
    if (holder === undefined) return { kind: "unknown", detail: `the case is registered inside a function at ${a.where(parent)} that is not a suite callback, so report mode cannot read the enclosing suites' fails` };
    const resolved = resolveChain(holder.expression, a);
    const api = "unresolved" in resolved ? undefined : resolved.name;
    if (api === "describe" || api === "suite") suites.unshift(through("options.enclosure", holder));
    // I1 (the design invariant): any other holder - a wrapper function, an object-held describe, an array's forEach, a
    // member vitest's suite API does not define - may itself register a suite with fails that the source does not show.
    if (!suites.includes(holder)) {
      const why = "unresolved" in resolved ? resolved.unresolved : `${resolved.name} is vitest's ${apiLabel(resolved)}, not its suite API`;
      return { kind: "unknown", detail: `the case is registered inside a callback of ${calleeText(holder, a)} at ${a.where(holder)}, which does not resolve to vitest's describe / suite: ${why}, so report mode cannot read whether it registers a suite with fails` };
    }
  }
  let state: boolean | "unknown" | undefined;
  let source = "";
  const sources: { readonly options: ts.Expression | undefined; readonly what: string }[] = [
    ...suites.map(suite => ({ options: registrationOptions(suite, a), what: `the options of the enclosing suite at ${a.where(suite)}` })),
    { options: registrationOptions(call, a), what: "its own options" },
  ];
  let unknown = "";
  for (const entry of sources) {
    if (entry.options === undefined) continue;
    const read = optionsFails(entry.options, a);
    if ("unknown" in read) {
      state = "unknown";
      unknown = read.unknown;
    } else if (read.fails !== undefined) {
      state = read.fails;
      source = entry.what;
    }
  }
  if (state === "unknown") return { kind: "unknown", detail: unknown };
  if (state === true) return { kind: "inverted", detail: `registered with fails through ${source}: it passes only when its assertions fail, and the report records it passed` };
  if (state === false) return apiEscapeHazard(a);
  const members = chainMembers(call.expression, a);
  if ("unknown" in members) return { kind: "unknown", detail: members.unknown };
  if (members.names.includes("fails")) return { kind: "inverted", detail: `registered with fails at ${a.where(call)}: it passes only when its assertions fail, and the report records it passed` };
  return apiEscapeHazard(a);
}

// ---- the report-mode judge ----

interface ReportContext {
  readonly root: string;
  readonly tier: string;
  readonly report: ReadReport;
  /** The default tier's report, read once, for a non-default pin's exclusivity. */
  readonly gateReport: () => LoadedReport;
  readonly sources: SourceCache;
}

/** Report mode's third leg: the strict reading's red names the return or the some-paths route that hollows the case. */
function thirdLeg(walk: Walk, fn: AnalysedFunction, a: SourceAnalysis): string {
  const reading = "report mode reads the third leg from the source, as the report records no assertion count; a bare expect(x) asserts nothing";
  if (walk.exitAt !== undefined) return `the case function at ${a.where(fn)} may return at ${a.where(walk.exitAt)} before its first matcher-bearing assertion (${reading})`;
  if (walk.conditional !== undefined) return `the first matcher-bearing assertion of the case function at ${a.where(fn)} (${walk.conditional.evidence}) is reached only on some paths: ${walk.conditional.route} (${reading})`;
  return `no matcher-bearing vitest assertion is reachable in the case function at ${a.where(fn)} (${reading})`;
}

function judgeReported(pin: CasePin, context: ReportContext): PinVerdict {
  const tier = context.tier;
  if (pin.tier !== tier) return verdict(pin, "runs-where", "tier-mismatch", `the report is the ${tier} tier's own run; a ${pin.tier} pin is judged only over its own tier's report, by a census leg inside that tier (R2 = (i))`);
  const absolute = resolve(context.root, pin.file);
  const loaded = context.sources.get(absolute);
  if (loaded.kind !== "ok") return verdict(pin, "exists", loaded.kind, loaded.why);
  const a = loaded.analysis;
  const file = reportModule(context.report, absolute);
  if (file === undefined) {
    // REPORT-MODE BOUNDARY: the JSON report records no scheduled files, so a run that aborted before any file ran (a
    // throwing global setup) reads like one that collected none; both are red, and the why names both routes.
    if (context.report.files.length === 0) {
      return verdict(pin, "runs-where", "not-collected", `the report records no test file for the ${tier} run: it collected none (its include / exclude or a filter) or aborted before running one (a throwing global setup), so it does not collect this file`);
    }
    return verdict(pin, "runs-where", "not-collected", `the ${tier} run the report records does not collect this file`);
  }
  if (file.message !== undefined && file.message !== "") return verdict(pin, "exists", "collection-error", `the runner could not collect the file: ${file.message}`);
  if (!file.assertionResults.every(hasLocation)) {
    return verdict(pin, "exists", "report-unlocated", "the report records no task locations: the tier's run must carry includeTaskLocation, since the census anchors its AST legs on the runner-located call (never a title search)");
  }
  const module = toRunModule(file);
  const place = locate(pin, module, a);
  if ("ok" in place) return place;
  const count = place.cases.length;
  const registered = new Set(module.tests.map(test => `${test.line}:${test.column}`));
  const call = place.call;
  const fn = call === undefined ? undefined : caseFunction(call, a);
  // U1 (the design invariant's registration flow): the inversion is read only through a callee the STRICT resolver reads
  // as vitest's it / test - every link one vitest's API defines; any other callee (object-held, destructured,
  // function-returned, class-static, a member vitest does not define ...) may carry fails the source does not show, so
  // it is options-unknown below, naming the link it could not resolve - never read as no fails.
  const resolved = call === undefined ? undefined : resolveChain(call.expression, a);
  const api = resolved === undefined || "unresolved" in resolved ? undefined : resolved.name;
  const readable = api === "it" || api === "test";
  const inversion = call === undefined || !readable ? undefined : inversionHazard(call, a);
  if (inversion?.kind === "inverted") return verdict(pin, "asserts", "inverted", inversion.detail, count);
  for (const test of place.cases) {
    if (test.state === "failed") return verdict(pin, "asserts", "failed", `the case failed in the ${tier} report: ${test.errors[0] ?? "no error message"}`, count);
    if (test.state !== "passed") {
      const cause = call === undefined ? undefined : chainCause(call, fn, a, registered, context.sources);
      if (cause !== undefined) return verdict(pin, "runs-where", cause.code, cause.detail, count);
      return verdict(pin, "runs-where", "skipped", `the ${tier} report records the case ${test.state}; ${UNMODELLED_REPORT}`, count);
    }
  }
  if (inversion !== undefined) return verdict(pin, "asserts", "options-unknown", inversion.detail, count);
  const tags = [...new Set(place.cases.flatMap(test => test.tags ?? []))];
  if (tags.length > 0) return verdict(pin, "asserts", "options-unknown", `the case carries the tags ${JSON.stringify(tags)}: a config tag definition may set fails, which the report does not record`, count);
  if (tier !== DEFAULT_GATE_TIER) {
    const gate = context.gateReport();
    if (!gate.ok) return verdict(pin, "runs-where", "run-error", `exclusivity against the default gate is unverifiable: ${gate.why}`, count);
    const gateFile = reportModule(gate, absolute);
    if (gateFile?.message !== undefined && gateFile.message !== "") return verdict(pin, "runs-where", "also-default-gate", `labelled ${pin.tier} but the default gate (${DEFAULT_GATE_TIER}) also collects the file (and fails to load it: ${gateFile.message})`, count);
    if (gateFile !== undefined && !gateFile.assertionResults.every(hasLocation)) return verdict(pin, "runs-where", "run-error", "exclusivity against the default gate is unverifiable: the default tier's report records no task locations (includeTaskLocation)", count);
    const shared = gateFile?.assertionResults.filter(entry => (entry.status === "passed" || entry.status === "failed") && place.cases.some(own => own.name === entry.title && own.line === entry.location?.line && own.column === entry.location?.column));
    if (shared !== undefined && shared.length > 0) return verdict(pin, "runs-where", "also-default-gate", `labelled ${pin.tier} but the default gate (${DEFAULT_GATE_TIER}) also runs it`, count);
  }
  if (call === undefined) return verdict(pin, "asserts", "unmapped-location", "the report's location maps to no call expression", count);
  if (fn === undefined) return verdict(pin, "asserts", "body-unresolved", `the case function at ${a.where(call)} is not statically resolvable`, count);
  if (!readable) {
    const route = "report mode resolves a registration only through vitest's own API: its imports, globals and const aliases, and the members its runtime objects define";
    const why = resolved === undefined ? "it reaches no registration chain" : "unresolved" in resolved ? resolved.unresolved : `${resolved.name} is vitest's ${apiLabel(resolved)}, not its test API`;
    return verdict(pin, "asserts", "options-unknown", `the registration ${calleeText(call, a)} at ${a.where(call)} does not resolve to vitest's it / test: ${why} (${route}), so report mode cannot read its fails, which the report does not record`, count);
  }
  const cause = chainCause(call, fn, a, registered, context.sources, true);
  if (cause !== undefined) return verdict(pin, "runs-where", cause.code, cause.detail, count);
  const symbols = contextSymbols(fn, contextIndex(call), a);
  const walk = caseEvidence(fn, { a, sources: context.sources, contextRoots: symbols.roots, contextExpect: symbols.expects, visited: new Set(), depth: 0, strictExits: true });
  if (walk.evidence === undefined) return verdict(pin, "asserts", "no-assertion", thirdLeg(walk, fn, a), count);
  const runs = count === 1 ? "collected once" : `collected once per table row (${count} rows)`;
  return verdict(pin, "asserts", "ok", `${runs}, passed in the ${tier} report, asserts (${walk.evidence})`, count);
}

/** A verdict over a report only holds for the source the report ran: any file the judgment read must be older than the report. */
function judgeFresh(pin: CasePin, context: ReportContext): PinVerdict {
  context.sources.resetTouched();
  const judged = judgeReported(pin, context);
  const gate = context.tier === DEFAULT_GATE_TIER ? undefined : context.gateReport();
  const written = Math.min(context.report.mtimeMs, gate?.ok === true ? gate.mtimeMs : Number.POSITIVE_INFINITY);
  for (const file of context.sources.touched()) {
    let mtimeMs: number;
    try {
      mtimeMs = statSync(file).mtimeMs;
    } catch {
      continue;
    }
    if (mtimeMs > written) return verdict(pin, "runs-where", "report-stale", `${relative(context.root, file)} changed after the report was written, so the report is not of the source the census reads`, judged.cases);
  }
  return judged;
}

/**
 * REPORT MODE, the default-tier judgment (owner three-stage ruling 2026-10-16 16:12Z; interface bound on the respin
 * spec): judges every pin over vitest's own JSON report of the tier's run and NEVER executes a test run. The report must
 * carry task locations (includeTaskLocation). A pin of any tier but the report's own (options.tier, default
 * DEFAULT_GATE_TIER) is refused: a live tier is judged only over its own report, by a census leg inside that tier
 * (R2 = (i)). A report that records the judging file itself is that run's previous report and is refused, as is a report
 * older than any file the judgment reads. Verdicts come back in pin order.
 */
export function judge(reportPath: string, pins: readonly CasePin[], options: ReportOptions = {}): readonly PinVerdict[] {
  const report = loadReport(reportPath);
  if (!report.ok) return pins.map(pin => verdict(pin, "runs-where", "report-unreadable", report.why));
  const root = reportRoot(reportPath, options);
  if (root === undefined) {
    return pins.map(pin => verdict(pin, "runs-where", "report-unreadable", `the report ${reportPath} lies outside a .forge directory and no root was named, so the pins' files cannot be resolved`));
  }
  const judging = judgingFile();
  if (judging !== undefined && reportModule(report, judging) !== undefined) {
    return pins.map(pin => verdict(pin, "runs-where", "report-stale", `the report records the judging file ${relative(root, judging)} itself: it is the report of a run this census sits in, so on disk it can only be that run's previous report`));
  }
  let gate: LoadedReport | undefined;
  const gateReport = (): LoadedReport => {
    gate ??= loadReport(options.defaultReport === undefined ? join(root, DEFAULT_TIER_REPORT) : resolve(options.defaultReport));
    return gate;
  };
  const context: ReportContext = { root, tier: options.tier ?? DEFAULT_GATE_TIER, report, gateReport, sources: new SourceCache() };
  return pins.map(pin => traced(() => judgeFresh(pin, context)));
}

// ---------------------------------------------------------------------------------------------
// Docs: the rendered view (marked's lexer), one view for uniqueness and extraction.
// ---------------------------------------------------------------------------------------------

const textOf = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
};
const childrenOf = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
const isList = (token: Token): token is Tokens.List => token.type === "list";
const clean = (text: string): string => text.replace(/\s+/g, " ").trim();
const ENTITIES: Readonly<Record<string, string>> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&#x27;": "'", "&nbsp;": " " };
const decode = (text: string): string => text.replace(/&(?:amp|lt|gt|quot|nbsp|#39|#x27);/g, entity => ENTITIES[entity] ?? entity);

/** What a reader sees of inline tokens: markup and HTML (comments included) render no text. */
function inlineText(tokens: readonly Token[]): string {
  let out = "";
  for (const token of tokens) {
    if (token.type === "html") continue;
    if (token.type === "br") out += "\n";
    else if (token.type === "codespan" || token.type === "escape") out += decode(textOf(token));
    else if (childrenOf(token).length > 0) out += inlineText(childrenOf(token));
    else out += decode(textOf(token));
  }
  return out;
}

function blockText(tokens: readonly Token[]): string {
  return tokens
    .map(token => {
      if (token.type === "html") return "";
      if (token.type === "code") return textOf(token);
      if (isList(token)) return token.items.map(item => blockText(childrenOf(item))).join(" ");
      return childrenOf(token).length > 0 ? inlineText(childrenOf(token)) : decode(textOf(token));
    })
    .join(" ");
}

const isTable = (token: Token): token is Tokens.Table => token.type === "table";
/** A table's cells as token lists (header first), so its rendered text and its HTML are read like any other block's. */
const cellsOf = (table: Tokens.Table): readonly (readonly Token[])[] => [...table.header, ...table.rows.flat()].map(cell => cell.tokens);

function containsHtml(tokens: readonly Token[]): boolean {
  return tokens.some(
    token =>
      token.type === "html" ||
      containsHtml(childrenOf(token)) ||
      (isList(token) && token.items.some(item => containsHtml(childrenOf(item)))) ||
      (isTable(token) && cellsOf(token).some(cell => containsHtml(cell))),
  );
}

/** What a reader sees of a block the census has no dedicated kind for (a blockquote, a table): its rendered text, HTML excluded. */
function renderedOther(token: Token): string {
  if (isTable(token)) return cellsOf(token).map(cell => inlineText(cell)).join(" ");
  const children = childrenOf(token);
  return children.length > 0 ? blockText(children) : token.type === "hr" ? "" : decode(textOf(token));
}

function toBlock(token: Token): RenderedBlock | undefined {
  if (token.type === "space") return undefined;
  if (isHeading(token)) return { kind: "heading", depth: token.depth, text: clean(inlineText(childrenOf(token))) };
  if (token.type === "paragraph") return { kind: "paragraph", text: clean(inlineText(childrenOf(token))), markdown: clean(textOf(token)) };
  if (isList(token)) return { kind: "list", ordered: token.ordered, items: token.items.map(item => ({ text: clean(blockText(childrenOf(item))), markdown: clean(item.text) })) };
  if (token.type === "code") return { kind: "code", text: textOf(token) };
  // D2: an HTML block renders no text a reader sees; its source is under raw only, so no text reader is fooled by it.
  if (token.type === "html") return { kind: "html", text: "", raw: clean(token.raw) };
  return { kind: "other", type: token.type, text: clean(renderedOther(token)) };
}


/** A source line the markdown grammar renders as an ATX heading wherever nothing hides it. */
const HEADING_LINE = /^ {0,3}#{1,6}(?:[ \t]|$)/;

/** An HTML block or code fence inside the section whose source carries a heading line (D10). */
function spanningBlock(tokens: readonly Token[]): { readonly kind: string; readonly line: string } | undefined {
  for (const token of tokens) {
    if (token.type === "html" || token.type === "code") {
      const line = token.raw.split("\n").find(candidate => HEADING_LINE.test(candidate));
      if (line !== undefined) return { kind: token.type === "html" ? "an HTML block" : "a code block", line: line.trim() };
    }
    const nested = spanningBlock(isList(token) ? token.items.flatMap(item => childrenOf(item)) : childrenOf(token));
    if (nested !== undefined) return nested;
  }
  return undefined;
}

/** Every rendered heading at any nesting depth: a heading inside a list item or blockquote still renders as one. */
function headingsIn(tokens: readonly Token[]): Tokens.Heading[] {
  const out: Tokens.Heading[] = [];
  for (const token of tokens) {
    if (isHeading(token)) out.push(token);
    out.push(...headingsIn(isList(token) ? token.items.flatMap(item => childrenOf(item)) : childrenOf(token)));
  }
  return out;
}

/** The rendered headings enclosing the heading at index, outermost first. */
function parentPath(tokens: readonly Token[], index: number): string[] {
  const stack: { readonly depth: number; readonly text: string }[] = [];
  for (const token of tokens.slice(0, index)) {
    if (!isHeading(token)) continue;
    while (stack.length > 0 && (stack[stack.length - 1]?.depth ?? 0) >= token.depth) stack.pop();
    stack.push({ depth: token.depth, text: clean(inlineText(childrenOf(token))) });
  }
  const own = tokens[index];
  const depth = own !== undefined && isHeading(own) ? own.depth : 7;
  return stack.filter(entry => entry.depth < depth).map(entry => entry.text);
}

const refused = (why: string): DocsSection => ({ ok: false, why, blocks: [], hasHtml: false });

/**
 * The rendered section under a heading. The heading must occur exactly once in the rendered view (a copy hidden
 * in a comment or a code fence is not a heading) under exactly the parent heading path the census binds (D9: a
 * level-1 heading inserted above re-homes the section, so it reddens), and the section runs to the next heading
 * of level 1 or 2 (or of the pinned level, if deeper) or EOF, so a ### subsection belongs to it (FOLD-1). An HTML
 * block or code fence inside the section that carries a heading line hides a heading boundary from the rendered
 * view (D10, the same-view straddle) and reddens the section, as the hidden heading's own section is absent.
 */
export function docsSection(markdown: string, heading: string, depth: number, parents: readonly string[]): DocsSection {
  const tokens = marked.lexer(markdown);
  const matches = (token: Tokens.Heading): boolean => token.depth === depth && clean(inlineText(childrenOf(token))) === heading;
  // Uniqueness counts every RENDERED heading, a heading nested in a list item or blockquote included (752.15 M13).
  const rendered = headingsIn(tokens).filter(matches).length;
  if (rendered === 0) return refused(`the rendered view has no level-${depth} heading "${heading}"`);
  if (rendered > 1) return refused(`the heading "${heading}" occurs ${rendered} times in the rendered view; a pinned section needs it exactly once`);
  const starts = tokens.flatMap((token, index) => (isHeading(token) && matches(token) ? [index] : []));
  if (starts.length === 0) return refused(`the heading "${heading}" renders only nested inside a list item or blockquote, so no section is bounded under it`);
  const start = starts[0] ?? 0;
  const path = parentPath(tokens, start);
  if (path.length !== parents.length || path.some((text, index) => text !== parents[index])) {
    return refused(`the heading "${heading}" sits under the parent heading path ${JSON.stringify(path)}; the census binds it under ${JSON.stringify(parents)}`);
  }
  const bound = Math.max(2, depth);
  const section: Token[] = [];
  for (const token of tokens.slice(start + 1)) {
    if (isHeading(token) && token.depth <= bound) break;
    section.push(token);
  }
  const spanning = spanningBlock(section);
  if (spanning !== undefined) return refused(`${spanning.kind} inside the section spans the heading line ${JSON.stringify(spanning.line)}, hiding a heading boundary from the rendered view`);
  const blocks = section.map(toBlock).filter((block): block is RenderedBlock => block !== undefined);
  return { ok: true, why: "", blocks, hasHtml: containsHtml(section) };
}

/** Key-order-independent JSON of a rendered block, so a census may write its pinned blocks by hand. */
const canonical = (value: unknown): string =>
  JSON.stringify(value, (_key, inner: unknown) => (isRecord(inner) && !Array.isArray(inner) ? Object.fromEntries(Object.entries(inner).sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))) : inner));

/**
 * The docs ADOPTION form (wb-9x5.6 D1-D3): the pinned section's WHOLE rendered block list equals the census's, block by
 * block, and the section carries no HTML. Never an includes check: a clause moved out of the section (D1), wrapped in
 * an HTML comment (D2) or kept beside a withdrawn subsection (D3) each leaves a different list. A refused section
 * (docsSection's own red) never matches.
 */
export function sectionMatches(section: DocsSection, expected: readonly RenderedBlock[]): SectionMatch {
  if (!section.ok) return { ok: false, why: section.why };
  if (section.hasHtml) return { ok: false, why: "the section carries HTML (a comment or a tag), whose rendered text can hide what its source says; the adoption form refuses it" };
  const shared = Math.min(section.blocks.length, expected.length);
  for (let index = 0; index < shared; index += 1) {
    const actual = canonical(section.blocks[index]);
    const pinned = canonical(expected[index]);
    if (actual !== pinned) return { ok: false, why: `block ${index + 1} differs: the section renders ${actual}; the census pins ${pinned}` };
  }
  if (section.blocks.length !== expected.length) return { ok: false, why: `the section has ${section.blocks.length} blocks; the census pins ${expected.length}` };
  return { ok: true, why: "" };
}

// ---------------------------------------------------------------------------------------------
// Source structure: imports and top-level declarations from the AST (comment- and string-blind by
// construction), for pins such as "reuses the shared fixture and defines no second one" (0kg.7 F10 / X16).
// ---------------------------------------------------------------------------------------------

export interface SourceImport {
  readonly module: string;
  /** Imported binding names as exported by the module ("default", "*" for a namespace); [] for a side-effect import. */
  readonly names: readonly string[];
  /** static import / export-from (load at module evaluation), dynamic import(), or require(). */
  readonly kind: "static" | "export-from" | "dynamic" | "require";
  /** True when the declaration is erased at runtime (import type / all specifiers type-only): it loads nothing. */
  readonly typeOnly: boolean;
  readonly line: number;
}
export interface SourceStructure {
  readonly ok: boolean;
  readonly why: string;
  readonly imports: readonly SourceImport[];
  /** Names declared at the top level: functions, classes, enums and every const/let/var binding. */
  readonly declarations: readonly string[];
}

function bindingNames(name: ts.BindingName, out: string[]): void {
  if (ts.isIdentifier(name)) out.push(name.text);
  else for (const element of name.elements) if (!ts.isOmittedExpression(element)) bindingNames(element.name, out);
}

/** Imports and top-level declarations of one file, read from its AST; an unreadable or unparseable file fails closed. */
export function sourceStructure(root: string, file: string): SourceStructure {
  const loaded = new SourceCache().get(resolve(root, file));
  if (loaded.kind !== "ok") return { ok: false, why: `${file}: ${loaded.why}`, imports: [], declarations: [] };
  const a = loaded.analysis;
  const imports: SourceImport[] = [];
  const declarations: string[] = [];
  const line = (node: ts.Node): number => a.sf.getLineAndCharacterOfPosition(node.getStart(a.sf)).line + 1;
  for (const statement of a.sf.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      const clause = statement.importClause;
      const names: string[] = [];
      let typeOnly = clause?.isTypeOnly === true;
      if (clause?.name !== undefined) names.push("default");
      const bindings = clause?.namedBindings;
      if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.push("*");
      if (bindings !== undefined && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) names.push((element.propertyName ?? element.name).text);
        if (clause?.name === undefined && bindings.elements.length > 0 && bindings.elements.every(element => element.isTypeOnly)) typeOnly = true;
      }
      imports.push({ module: statement.moduleSpecifier.text, names, kind: "static", typeOnly, line: line(statement) });
    } else if (ts.isExportDeclaration(statement) && statement.moduleSpecifier !== undefined && ts.isStringLiteral(statement.moduleSpecifier)) {
      const clause = statement.exportClause;
      const names = clause === undefined ? ["*"] : ts.isNamedExports(clause) ? clause.elements.map(element => (element.propertyName ?? element.name).text) : ["*"];
      imports.push({ module: statement.moduleSpecifier.text, names, kind: "export-from", typeOnly: statement.isTypeOnly, line: line(statement) });
    } else if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isEnumDeclaration(statement)) && statement.name !== undefined) {
      declarations.push(statement.name.text);
    } else if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) bindingNames(declaration.name, declarations);
    }
  }
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const first = node.arguments[0];
      const literal = first !== undefined && ts.isStringLiteralLike(first) ? first.text : undefined;
      if (node.expression.kind === ts.SyntaxKind.ImportKeyword && literal !== undefined) imports.push({ module: literal, names: ["*"], kind: "dynamic", typeOnly: false, line: line(node) });
      if (ts.isIdentifier(node.expression) && node.expression.text === "require" && literal !== undefined) imports.push({ module: literal, names: ["*"], kind: "require", typeOnly: false, line: line(node) });
    }
    ts.forEachChild(node, visit);
  };
  visit(a.sf);
  return { ok: true, why: "", imports, declarations };
}
