/**
 * wb-pyel.6 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R14, program-triage-2026-10-18, child of wb-pyel): the EDC scope-narrowing census -
 * the until-then leg of a conditional duty, with the acceptance's falsifier armed and proven.
 * Statement (the bead title, read at run time from its row in the tracked bead export .beads/issues.jsonl): "If Pi adopts EDC
 * assembly or components, request freshness, result precision and resource ceiling shall be scoped through parent boundaries with
 * children able to tighten but never silently expand rights, mirroring Pi's existing grant discipline. Artifact: a Pi EDC
 * assembly/component surface carrying scoped freshness/precision/ceiling (none exists)."
 * Acceptance (owner filing, verbatim, read from the same row's notes): "a falsifier where a child context requests looser
 * freshness, precision or ceiling than its parent and is clamped or refused with a typed diagnostic, never silently widened; a
 * silent-widening mutant goes red."
 *
 * DELIVERED HERE: (B) the falsifier - a law over a scope composer, (parent scope, child request) -> outcome, judged over a fixed
 * probe grid - shown to accept both lawful forms the acceptance names (a clamping and a refusing reference composer) and to red
 * every named mutant, among them one silent-widening mutant per axis; (C) the same narrowing read on two of Pi's own grant surfaces
 * (the capability registry's permission and invoke grants and the curated Claude tools' bound ceilings); (A, D) the until-then
 * gate - no src module or manifest names an EDC stem and no src declaration or registered descriptor carries the
 * freshness/precision/ceiling triple - with its guard reading pass.
 * NOT DELIVERED: binding the falsifier to a Pi composer - none exists (D1 reads the artifact ABSENT). An adoption ends the
 * until-then: the gate then reads PRESENT, the guard reads "owed" and this census reds by design (D2), so the adopting cut binds its
 * composer through falsify() (adapting a surface that throws typed errors, or answers asynchronously, into the synchronous
 * outcome shape), proves its own per-axis
 * silent-widening mutants red and re-measures this file. The charter's own status is not read here (it lives in another
 * repository; the landed wb-pyel.4 census holds the R7 adoption freeze).
 *
 * THE LAW (row B):
 *  - A scope is the triple, each axis a number where SMALLER IS TIGHTER: freshness the oldest acceptable evidence age, precision the
 *    widest acceptable result tolerance, ceiling the largest resource allowance. An adopting surface maps its own scales onto this
 *    order before it binds.
 *  - A composer is handed the parent's scope and a child's request (any subset of the axes), both frozen, and returns an outcome
 *    that is judged as an untrusted value: {kind: "scoped", scope, diagnostics} or {kind: "refused", diagnostic}. A diagnostic is
 *    typed when it is {code, axis, requested, bound}: code clamped or refused, axis one of the triple, two finite numbers.
 *  - Per probe and axis: an absent axis inherits the parent's bound with no diagnostic; a tighter or equal request is adopted as
 *    asked with no diagnostic; a looser request is clamped to the parent's bound with exactly one clamped diagnostic carrying the
 *    axis, the requested value and the bound - or the whole request is refused with one refused diagnostic on a looser axis. A
 *    refusal of a request with no looser axis, and every other outcome, is a violation named by its class (CLASSES); a composer
 *    that throws (a write to a frozen input among them) is the class threw.
 *  - The grid (PROBES): one parent, each axis at a distinct bound; inherit (the empty request); each axis alone tighter (half the
 *    bound), equal and looser (twice the bound); all tighter; all looser; each axis looser with the other two tighter.
 * THE MIRROR (row C; the notes' "Pi binds the same monotone-narrowing rule for grants and tool surfaces"):
 *  - C1 grants: a CapabilityRegistry holding one planted read capability that needs one permission, one that needs two, and one
 *    with no permission (it needs its invoke grant) is invoked under child contexts (GRANT_CONTEXTS, PAIR_CONTEXTS,
 *    INVOKE_CONTEXTS): only a context holding every needed grant, exactly or within a superset, dispatches; every other one - a
 *    disjoint or empty grant set, a discover grant alone, a permission capability's own invoke grant without its permission, one
 *    of its two permissions alone, another capability's invoke grant - is refused with a CapabilityError of category
 *    authorization before the provider runs (its call count stays 0); discovery lists a capability only under its discover grant.
 *  - C2 tool surfaces: createCuratedTools (src/workbench/claude-capability-tools.ts), the host adapter that bounds a Claude role
 *    session, is given each bound below (half), at and above (+1) its host ceiling (CURATED_CEILINGS): below and at are accepted,
 *    above is refused with a CapabilityError of category validation - at construction, a child's bound is accepted only within
 *    the host's ceiling (the run-time enforcement of an accepted bound is not read here; see NOT CLAIMED).
 * THE GATE (rows A and D) - READINGS:
 *  - THE SRC WALK: every script module below src (.ts .mts .cts .tsx .js .mjs .cjs .jsx), held equal both ways to git's tracked
 *    script modules below src as git itself filters them (git ls-files -z with one glob pathspec per script extension, never the
 *    walk's own scope predicate), each parsed by the TypeScript compiler, never a comment; the scope predicate is pinned by one
 *    in-scope control per script extension (and by Q5's out-of-scope paths).
 *  - A, the adoption: each module's identifiers, private names, string, template and regular-expression literal texts and JSX
 *    text, and package.json read whole (every key and string, and its raw text), read for the two EDC stems (the notes' charter
 *    path: its slug's initials "edc" as a word or plural in the word fold, its modifier "evidencedirected" anywhere in the joined
 *    fold - the landed wb-pyel.4 vocabulary: both folds start from NFKC with format controls and combining marks removed, so a
 *    zero-width space never splits a stem and full-width letters fold; the word fold splits an acronym's plural s, camel
 *    boundaries and every run outside a-z and 0-9). Any mention reads the adoption PRESENT.
 *  - D, the artifact: each name-carrying declaration (an interface, a type literal, a class, an object literal, an object binding
 *    pattern, an enum - its members' written names; a function-like declaration's parameter list, constructor parameter properties
 *    included; a union type's string-literal members, plain or no-substitution template literal types; an array literal's string
 *    elements) and each object of each registered descriptor (the native registration and the four injected-client
 *    registrations; every object at any depth by its own keys, so a schema's properties object reads by its property names) is
 *    read for the triple: it carries an axis when one of its names has the axis word, or its plural (es after a sibilant ending,
 *    so freshnesses; s otherwise, so precisions and ceilings), as a word of the word fold (requestFreshness, result_precision,
 *    Ceiling, freshnesses); it carries the triple when it carries all three. Any triple reads the artifact PRESENT.
 *  - The guard: guard(ABSENT, ABSENT) = pass; any PRESENT = owed. Each gate reads PRESENT on any one of its sources (a src
 *    reading, the manifest, either registration), pinned by composition controls; the live verdict is pinned.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; every witness is held to the roster):
 *  A "If Pi adopts EDC assembly or components": A1 the adoption gate - the live walk (floors, both-way tracked equality, no
 *    mention) and its reader controls.
 *  B "request freshness, result precision and resource ceiling shall be scoped through parent boundaries with children able to
 *    tighten but never silently expand rights": B1 the axes and the grid; B2 the lawful references, the classifier's controls and
 *    the mutants that clamp or refuse without the typed diagnostic or restrict a tightening; B3 the widening mutants; B4 the
 *    acceptance's silent-widening mutants, one per axis.
 *  C "mirroring Pi's existing grant discipline": C1 grants; C2 tool surfaces.
 *  D "Artifact: a Pi EDC assembly/component surface carrying scoped freshness/precision/ceiling (none exists)": D1 the artifact
 *    reading, live and its reader controls; D2 the guard - its semantics, both gates' composition and the live verdict.
 *  Q the residuals, each named family pinned by its quiet row.
 * OUTSIDE ANCHORS (the judged-set case; the bead's own row in .beads/issues.jsonl): the title's statement after its requirement tag
 *   is tiled, in order and with separator-only gaps, by the labels of A, B, C and D, and A's and D's labels by their pins' quotes;
 *   the acceptance sentence after its lead ("a falsifier where ") is tiled by B's pins' quotes; the notes' mirror span (the owner
 *   filing's text after its first "monotone-narrowing rule for ", up to the spaced em-dash terminator) is exactly C's pins' quotes
 *   joined by " and ". AXES equal the heads of the title's triple, the acceptance's looser list and the artifact's slash list;
 *   CODES equal the acceptance's "clamped or refused"; FORBIDDEN is the acceptance's "never silently widened"; STEMS are the notes'
 *   charter-path initials and modifier. So a row, a pin of A-D, an axis, a code or a stem removed from every literal of this file
 *   and of the roster together still reds.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, quotes, constants and every pin's witness are
 *   held to the out-of-file roster (test/fixtures/edc-scope-narrowing-roster.json); the last case reads the vitest task tree (every
 *   registered test, in roster order, in run mode, ran before it) and that every pin reached its witness compare.
 * NOT CLAIMED: a Q pin removed from ROWS, the literal, IMPL, RESIDUALS and the roster together (no surface of the bead anchors the
 *   residual families); git's listing replaced, in this file, by the walk it anchors together with a narrowing of that walk smaller
 *   than the module floor's margin; a pin's case replaced by one that echoes its roster witness; a capability registered at run time by
 *   any path other than the five registrations read (its literal src declaration is still read by the src walk); the rest of Pi's
 *   grant discipline (role exposure, inspect, observe and control grants) and the curated tools' run-time enforcement of an
 *   accepted bound (the call quota and the serialized byte limits), which their own suites pin; that any future composer is
 *   lawful - only that the falsifier reds the named mutants and accepts the two references.
 * RESIDUALS (named; each with its pinned quiet row): R-LOOKALIKE an EDC stem written with a look-alike letter of another script
 *   reads no stem (Q1); R-PARTIAL a declaration or descriptor object carrying one or two axes of the triple reads no triple - an
 *   unnamed partial surface is not the artifact (Q2); R-VOCABULARY the triple in other words (maxAgeMs, staleness, tolerance,
 *   accuracy, budget, quota, limit, cap, fresh, precise) carries no axis (Q3); R-COMPOSED a computed member name and a stem composed
 *   from parts are not read (Q4); R-SCOPE modules outside src (examples/, qa/, test/, scripts/), markdown, and the files below src
 *   that are no script module (a .json resource) are read by neither gate reader (Q5); R-GRID a composer that widens only outside the grid (beyond
 *   twice the bound) reads holds (Q6); R-STATEFUL a composer whose answers depend on its call history (lawful for the grid's calls,
 *   widening after them) reads holds (Q7); R-SUFFIXED the acronym run into a lower-case-led suffix (EDCv2, GateEDCv2Client), which
 *   the word fold splits before its last letter (ed, cv2), reads no stem (Q8); R-DOTTED a dotted acronym (E.D.C.), which the word
 *   fold reads as single letters, reads no stem (Q9) - both inherited with the landed wb-pyel.4 vocabulary.
 *
 * Display paths added: none. Test-only: no scratch is allocated; src, package.json, .beads and git's index are only read, and the
 * mirror rows build in-memory registries and curated tool servers only.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { type CuratedToolOptions, createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type ForgeReadClient, registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { type FurnaceReadClient, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "edc-scope-narrowing-roster.json");
const BEAD = "wb-pyel.6";

// ---- the vocabulary and the law's constants ----

/** The EDC stems and how each is read (the landed wb-pyel.4 vocabulary): the charter slug's initials as a word, its modifier joined. */
const STEMS: Readonly<Record<string, "word" | "joined">> = { edc: "word", evidencedirected: "joined" };
/** The triple, in title order; every bound is a number where a smaller value is tighter. */
const AXES = ["freshness", "precision", "ceiling"] as const;
type Axis = (typeof AXES)[number];
/** The typed diagnostic codes: the acceptance's two lawful outcomes. */
const CODES = ["clamped", "refused"] as const;
type Code = (typeof CODES)[number];
/** The class the acceptance forbids by name ("never silently widened"). */
const FORBIDDEN = "widened-silently";
/** Every violation class the falsifier names. */
const CLASSES = [
  "widened-silently",
  "widened-with-diagnostic",
  "clamp-undiagnosed",
  "clamp-misplaced",
  "diagnostic-misattributed",
  "diagnostic-spurious",
  "diagnostic-untyped",
  "diagnostics-untyped",
  "refusal-undiagnosed",
  "tightening-refused",
  "tightening-dropped",
  "inherit-changed",
  "scope-untyped",
  "outcome-untyped",
  "threw",
] as const;
type ViolationClass = (typeof CLASSES)[number];
/** The acceptance sentence's lead, before the part B's pins quote. */
const ACCEPTANCE_LEAD = "a falsifier where ";
/** The owner filing's lead before the mirror span C's pins quote, and the span's terminator: a spaced em dash (U+2014). */
const MIRROR_LEAD = "monotone-narrowing rule for ";
const DASH = String.fromCodePoint(0x2014);

type Scope = Readonly<Record<Axis, number>>;
type ScopeRequest = Readonly<Partial<Record<Axis, number>>>;
interface ScopeDiagnostic {
  readonly code: Code;
  readonly axis: Axis;
  readonly requested: number;
  readonly bound: number;
}
/** A scope composer: the parent's scope and a child's request in, an outcome out - judged as an untrusted value, never trusted. */
type Composer = (parent: Scope, request: ScopeRequest) => unknown;
interface Probe {
  readonly name: string;
  readonly request: ScopeRequest;
}
interface Verdict {
  readonly verdict: "holds" | "violated";
  readonly probes: number;
  readonly violations: readonly string[];
}

/** The parent's scope: each axis at a distinct bound, so a composer that crosses axes is told apart. */
const PARENT: Scope = { freshness: 300, precision: 20, ceiling: 5000 };
/** Each relation's factor on the parent's bound. */
const FACTORS = { tighter: 0.5, equal: 1, looser: 2 } as const;
type Relation = keyof typeof FACTORS;
const RELATIONS: readonly Relation[] = ["tighter", "equal", "looser"];

function valueAt(axis: Axis, relation: Relation): number {
  return PARENT[axis] * FACTORS[relation];
}
function requestOf(entries: readonly (readonly [Axis, number])[]): ScopeRequest {
  const request: Partial<Record<Axis, number>> = {};
  for (const [axis, value] of entries) request[axis] = value;
  return request;
}
/** The grid: inherit, each axis alone at each relation, all tighter, all looser, and each axis looser with the other two tighter. */
const PROBES: readonly Probe[] = [
  { name: "inherit", request: {} },
  ...AXES.flatMap(axis => RELATIONS.map(relation => ({ name: `${axis}:${relation}`, request: requestOf([[axis, valueAt(axis, relation)]]) }))),
  { name: "all:tighter", request: requestOf(AXES.map((axis): [Axis, number] => [axis, valueAt(axis, "tighter")])) },
  { name: "all:looser", request: requestOf(AXES.map((axis): [Axis, number] => [axis, valueAt(axis, "looser")])) },
  ...AXES.map(looser => ({
    name: `mixed:${looser}-looser`,
    request: requestOf(AXES.map((axis): [Axis, number] => [axis, valueAt(axis, axis === looser ? "looser" : "tighter")])),
  })),
];

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

// ---- the falsifier (row B) ----

const isCode = (value: unknown): value is Code => CODES.some(code => code === value);
const isAxis = (value: unknown): value is Axis => AXES.some(axis => axis === value);
/** A diagnostic read as typed: code, axis and two finite numbers, or undefined. */
function typedDiagnostic(value: unknown): ScopeDiagnostic | undefined {
  if (!isObject(value)) return undefined;
  const { code, axis, requested, bound } = value;
  if (!isCode(code) || !isAxis(axis) || typeof requested !== "number" || typeof bound !== "number") return undefined;
  return Number.isFinite(requested) && Number.isFinite(bound) ? { code, axis, requested, bound } : undefined;
}
/** A scope read as typed: a number on every axis, or undefined. */
function typedScope(value: unknown): Partial<Record<Axis, number>> | undefined {
  if (!isObject(value)) return undefined;
  const scope: Partial<Record<Axis, number>> = {};
  for (const axis of AXES) {
    const bound = value[axis];
    if (typeof bound !== "number") return undefined;
    scope[axis] = bound;
  }
  return scope;
}
/** The axes a request asks looser than the parent's bound. */
function looserAxes(request: ScopeRequest): Axis[] {
  return AXES.filter(axis => {
    const asked = request[axis];
    return asked !== undefined && asked > PARENT[axis];
  });
}
/** One probe's violations under the law, each `${probe}|${axis or -}|${class}`, in AXES order. */
function judge(probe: Probe, outcome: unknown): string[] {
  const named = (axis: Axis | "-", kind: ViolationClass): string => `${probe.name}|${axis}|${kind}`;
  const looser = looserAxes(probe.request);
  if (!isObject(outcome) || (outcome.kind !== "scoped" && outcome.kind !== "refused")) return [named("-", "outcome-untyped")];
  if (outcome.kind === "refused") {
    if (looser.length === 0) return [named("-", "tightening-refused")];
    const diagnostic = typedDiagnostic(outcome.diagnostic);
    if (diagnostic === undefined) return [named("-", "refusal-undiagnosed")];
    const lawful =
      diagnostic.code === "refused" &&
      looser.includes(diagnostic.axis) &&
      diagnostic.requested === probe.request[diagnostic.axis] &&
      diagnostic.bound === PARENT[diagnostic.axis];
    return lawful ? [] : [named(diagnostic.axis, "diagnostic-misattributed")];
  }
  const scope = typedScope(outcome.scope);
  if (scope === undefined) return [named("-", "scope-untyped")];
  if (!Array.isArray(outcome.diagnostics)) return [named("-", "diagnostics-untyped")];
  const diagnostics = outcome.diagnostics.map(typedDiagnostic);
  const violations = diagnostics.some(diagnostic => diagnostic === undefined) ? [named("-", "diagnostic-untyped")] : [];
  for (const axis of AXES) {
    const asked = probe.request[axis];
    const bound = PARENT[axis];
    const got = scope[axis] ?? Number.NaN;
    const own = diagnostics.filter((diagnostic): diagnostic is ScopeDiagnostic => diagnostic?.axis === axis);
    if (got > bound) violations.push(named(axis, own.length === 0 ? "widened-silently" : "widened-with-diagnostic"));
    else if (asked === undefined || asked <= bound) {
      if (got !== (asked ?? bound)) violations.push(named(axis, asked === undefined ? "inherit-changed" : "tightening-dropped"));
      if (own.length > 0) violations.push(named(axis, "diagnostic-spurious"));
    } else if (got !== bound) violations.push(named(axis, "clamp-misplaced"));
    else if (own.length === 0) violations.push(named(axis, "clamp-undiagnosed"));
    else if (own.length > 1 || own[0]?.code !== "clamped" || own[0]?.requested !== asked || own[0]?.bound !== bound) {
      violations.push(named(axis, "diagnostic-misattributed"));
    }
  }
  return violations;
}
/** Runs a composer over the grid, the parent and each request frozen, and returns the law's verdict. */
function falsify(composer: Composer): Verdict {
  const violations: string[] = [];
  for (const probe of PROBES) {
    let outcome: unknown;
    try {
      outcome = composer(Object.freeze({ ...PARENT }), Object.freeze({ ...probe.request }));
    } catch {
      violations.push(`${probe.name}|-|threw`);
      continue;
    }
    violations.push(...judge(probe, outcome));
  }
  return { verdict: violations.length === 0 ? "holds" : "violated", probes: PROBES.length, violations };
}

/** The lawful clamp: each looser axis held at the parent's bound with one clamped diagnostic, every other axis as asked or inherited. */
function clamp(parent: Scope, request: ScopeRequest): { scope: Record<Axis, number>; diagnostics: ScopeDiagnostic[] } {
  const scope: Record<Axis, number> = { ...parent };
  const diagnostics: ScopeDiagnostic[] = [];
  for (const axis of AXES) {
    const asked = request[axis];
    if (asked === undefined) continue;
    if (asked > parent[axis]) diagnostics.push({ code: "clamped", axis, requested: asked, bound: parent[axis] });
    else scope[axis] = asked;
  }
  return { scope, diagnostics };
}
/** The clamp's scope with each of the given axes taking the child's request whenever it asks one. */
function adopt(parent: Scope, request: ScopeRequest, axes: readonly Axis[]): Record<Axis, number> {
  const { scope } = clamp(parent, request);
  for (const axis of axes) scope[axis] = request[axis] ?? scope[axis];
  return scope;
}
function firstLooser(parent: Scope, request: ScopeRequest): Axis | undefined {
  return AXES.find(axis => {
    const asked = request[axis];
    return asked !== undefined && asked > parent[axis];
  });
}
const CLAMPING: Composer = (parent, request) => ({ kind: "scoped", ...clamp(parent, request) });
const REFUSING: Composer = (parent, request) => {
  const looser = firstLooser(parent, request);
  if (looser === undefined) return { kind: "scoped", scope: clamp(parent, request).scope, diagnostics: [] };
  return { kind: "refused", diagnostic: { code: "refused", axis: looser, requested: request[looser], bound: parent[looser] } };
};
/** The acceptance's two lawful forms: a looser request clamped, or refused, with a typed diagnostic. */
const REFERENCES: Readonly<Record<string, Composer>> = { clamping: CLAMPING, refusing: REFUSING };
/** B2's mutants: they clamp or refuse without the typed diagnostic, or restrict what the child may tighten or inherit. */
const TYPED_MUTANTS: Readonly<Record<string, Composer>> = {
  "clamp-silent": (parent, request) => ({ kind: "scoped", scope: clamp(parent, request).scope, diagnostics: [] }),
  "diagnostic-untyped": (parent, request) => {
    const { scope, diagnostics } = clamp(parent, request);
    return { kind: "scoped", scope, diagnostics: diagnostics.map(diagnostic => `${diagnostic.code} ${diagnostic.axis}`) };
  },
  "diagnostic-misattributed": (parent, request) => {
    const { scope, diagnostics } = clamp(parent, request);
    return {
      kind: "scoped",
      scope,
      diagnostics: diagnostics.map(diagnostic => ({ ...diagnostic, axis: AXES[(AXES.indexOf(diagnostic.axis) + 1) % AXES.length] })),
    };
  },
  "refuse-undiagnosed": (parent, request) => (firstLooser(parent, request) === undefined ? REFUSING(parent, request) : { kind: "refused" }),
  "refuse-any-change": (parent, request) => {
    const changed = AXES.find(axis => request[axis] !== undefined && request[axis] !== parent[axis]);
    if (changed === undefined) return CLAMPING(parent, request);
    return { kind: "refused", diagnostic: { code: "refused", axis: changed, requested: request[changed], bound: parent[changed] } };
  },
  "tightening-dropped": (parent, request) => ({ kind: "scoped", scope: { ...parent }, diagnostics: clamp(parent, request).diagnostics }),
  "inherit-zero": (parent, request) => {
    const { scope, diagnostics } = clamp(parent, request);
    for (const axis of AXES) if (request[axis] === undefined) scope[axis] = 0;
    return { kind: "scoped", scope, diagnostics };
  },
  "clamp-below": (parent, request) => {
    const { scope, diagnostics } = clamp(parent, request);
    for (const diagnostic of diagnostics) scope[diagnostic.axis] = diagnostic.bound * FACTORS.tighter;
    return { kind: "scoped", scope, diagnostics };
  },
};
/** A bound some composers compare a request against in place of the parent's (B3's default-bound mutant). */
const DEFAULT_BOUND = 1_000_000;
/** B3's mutants: they widen a looser request - with a diagnostic, past the first axis, by a max merge, against a default bound, or
 * by writing the looser request into the parent. */
const WIDENING_MUTANTS: Readonly<Record<string, Composer>> = {
  "widen-diagnosed": (parent, request) => ({ kind: "scoped", scope: adopt(parent, request, AXES), diagnostics: clamp(parent, request).diagnostics }),
  "first-only": (parent, request) => {
    const first = AXES.find(axis => request[axis] !== undefined);
    return {
      kind: "scoped",
      scope: adopt(
        parent,
        request,
        AXES.filter(axis => axis !== first),
      ),
      diagnostics: clamp(parent, request).diagnostics.filter(diagnostic => diagnostic.axis === first),
    };
  },
  "max-merge": (parent, request) => ({
    kind: "scoped",
    scope: requestOf(AXES.map((axis): [Axis, number] => [axis, Math.max(request[axis] ?? parent[axis], parent[axis])])),
    diagnostics: [],
  }),
  "default-bound": (_parent, request) => {
    const ceilingOf: Scope = requestOf(AXES.map((axis): [Axis, number] => [axis, DEFAULT_BOUND])) as Scope;
    return CLAMPING(ceilingOf, request);
  },
  "widen-parent": (parent, request) => {
    const writable = parent as Record<Axis, number>;
    for (const axis of AXES) {
      const asked = request[axis];
      if (asked !== undefined && asked > parent[axis]) writable[axis] = asked;
    }
    return CLAMPING(parent, request);
  },
};
/** B4's mutants, the acceptance's silent-widening mutants: one per axis, that axis adopting the child's request whatever it is,
 * unreported, the other two axes lawful. */
const SILENT_MUTANTS: Readonly<Record<string, Composer>> = Object.fromEntries(
  AXES.map(silent => [
    `silent:${silent}`,
    (parent: Scope, request: ScopeRequest) => ({
      kind: "scoped",
      scope: adopt(parent, request, [silent]),
      diagnostics: clamp(parent, request).diagnostics.filter(diagnostic => diagnostic.axis !== silent),
    }),
  ]),
);
/** The classifier's own controls: hand-built outcomes for the ceiling-looser probe, each read exactly as pinned. */
const CONTROL_PROBE = "ceiling:looser";
function classifierControls(): Readonly<Record<string, unknown>> {
  const requested = valueAt("ceiling", "looser");
  const bound = PARENT.ceiling;
  const clamped = { code: "clamped", axis: "ceiling", requested, bound };
  const refused = { ...clamped, code: "refused" };
  const widened = { ...PARENT, ceiling: requested };
  return {
    "lawful-clamp": { kind: "scoped", scope: { ...PARENT }, diagnostics: [clamped] },
    "lawful-refusal": { kind: "refused", diagnostic: refused },
    "no-outcome": null,
    "unknown-kind": { kind: "granted", scope: { ...PARENT }, diagnostics: [] },
    "scope-strings": { kind: "scoped", scope: Object.fromEntries(AXES.map(axis => [axis, String(PARENT[axis])])), diagnostics: [clamped] },
    "scope-missing-axis": { kind: "scoped", scope: { freshness: PARENT.freshness, precision: PARENT.precision }, diagnostics: [clamped] },
    "diagnostics-object": { kind: "scoped", scope: { ...PARENT }, diagnostics: { 0: clamped } },
    "diagnostic-string-number": { kind: "scoped", scope: { ...PARENT }, diagnostics: [{ ...clamped, requested: String(requested) }] },
    "diagnostic-unknown-code": { kind: "scoped", scope: { ...PARENT }, diagnostics: [{ ...clamped, code: "trimmed" }] },
    "widened-silently": { kind: "scoped", scope: widened, diagnostics: [] },
    "widened-with-diagnostic": { kind: "scoped", scope: widened, diagnostics: [clamped] },
    "clamped-twice": { kind: "scoped", scope: { ...PARENT }, diagnostics: [clamped, clamped] },
    "clamp-code-refused": { kind: "scoped", scope: { ...PARENT }, diagnostics: [refused] },
    "clamp-bound-requested": { kind: "scoped", scope: { ...PARENT }, diagnostics: [{ ...clamped, bound: requested }] },
    "clamp-requested-bound": { kind: "scoped", scope: { ...PARENT }, diagnostics: [{ ...clamped, requested: bound }] },
    "refusal-code-clamped": { kind: "refused", diagnostic: clamped },
    "refusal-bound-requested": { kind: "refused", diagnostic: { ...refused, bound: requested } },
    "refusal-other-axis": { kind: "refused", diagnostic: { ...refused, axis: "precision", requested: valueAt("precision", "looser"), bound: PARENT.precision } },
    "refusal-undiagnosed": { kind: "refused" },
  };
}

// ---- the mirror (row C) ----

/** The planted capabilities: one needs a permission; one needs two; one, with no permission, needs its invoke grant. */
const PERMISSION_ID = "planted.scope.read";
const PAIR_ID = "planted.pair.read";
const INVOKE_ID = "planted.open.read";
const PERMISSION = "planted:read";
const SECOND_PERMISSION = "planted:audit";
/** Child contexts for the permission capability: the exact grant, a superset, a disjoint grant, none, its discover grant only, and
 * its own invoke grant without the permission. */
const GRANT_CONTEXTS: Readonly<Record<string, readonly string[]>> = {
  exact: [PERMISSION],
  superset: [PERMISSION, "planted:write"],
  disjoint: ["planted:write"],
  empty: [],
  "discover-only": [`discover:${PERMISSION_ID}`],
  "own-invoke": [`invoke:${PERMISSION_ID}`],
};
/** Child contexts for the two-permission capability: both, a superset, each permission alone, and its own invoke grant with one. */
const PAIR_CONTEXTS: Readonly<Record<string, readonly string[]>> = {
  both: [PERMISSION, SECOND_PERMISSION],
  superset: [PERMISSION, SECOND_PERMISSION, "planted:write"],
  "first-only": [PERMISSION],
  "second-only": [SECOND_PERMISSION],
  "own-invoke-and-first": [`invoke:${PAIR_ID}`, PERMISSION],
};
/** Child contexts for the invoke-grant capability: its invoke grant, another capability's, none, and its discover grant only. */
const INVOKE_CONTEXTS: Readonly<Record<string, readonly string[]>> = {
  exact: [`invoke:${INVOKE_ID}`],
  "other-invoke": [`invoke:${PERMISSION_ID}`],
  empty: [],
  "discover-only": [`discover:${INVOKE_ID}`],
};
function plantedProvider(id: string, permissions: readonly string[], counter: { calls: number }) {
  return {
    descriptor: {
      id,
      version: "1.0.0",
      description: "A planted read for the scope-narrowing mirror",
      inputSchema: { type: "object" },
      effectClass: "read" as const,
      permissions,
      supportedModes: ["invoke" as const],
    },
    invoke: async (): Promise<JsonValue> => {
      counter.calls += 1;
      return { read: true };
    },
  };
}
/** One child context's invocation outcome on a fresh registry, with the provider's call count. */
async function grantOutcome(id: string, permissions: readonly string[], grants: readonly string[]): Promise<string> {
  const counter = { calls: 0 };
  const registry = new CapabilityRegistry();
  registry.register(plantedProvider(id, permissions, counter));
  try {
    await registry.invoke(id, {}, { grants, signal: new AbortController().signal });
    return `dispatched calls=${counter.calls}`;
  } catch (error) {
    return `${error instanceof CapabilityError ? `refused:${error.category}` : "threw"} calls=${counter.calls}`;
  }
}
/** The curated Claude tools' host ceilings on a role's bounds (src/workbench/claude-capability-tools.ts at the cut). */
const CURATED_CEILINGS = { maxCalls: 10_000, maxInputBytes: 256 * 1024, maxOutputBytes: 256 * 1024 } as const;
type CuratedBound = keyof typeof CURATED_CEILINGS;
const CURATED_BOUNDS: readonly CuratedBound[] = ["maxCalls", "maxInputBytes", "maxOutputBytes"];
/** One bound's outcome: the curated tools built with every other option valid. */
function curatedOutcome(bound: CuratedBound, value: number): string {
  const overrides: Partial<CuratedToolOptions> =
    bound === "maxCalls" ? { maxCalls: value } : bound === "maxInputBytes" ? { maxInputBytes: value } : { maxOutputBytes: value };
  try {
    createCuratedTools({
      registry: new CapabilityRegistry(),
      allowedCapabilities: [],
      grants: [],
      principal: { id: "census-host", role: "reader" },
      workspace: REPO,
      invocationId: "census-scope",
      signal: new AbortController().signal,
      ...overrides,
    });
    return "accepted";
  } catch (error) {
    return error instanceof CapabilityError ? `refused:${error.category}` : "threw";
  }
}

// ---- the gate's readings (rows A and D) ----

/** NFKC with format controls and combining marks removed. */
function normal(text: string): string {
  return text.normalize("NFKC").replace(/[\p{Cf}\p{Mn}\p{Me}]/gu, "");
}
/** The word fold: an acronym's plural s and camel boundaries split, lower-cased, split at every run outside a-z and 0-9. */
function wordsOf(text: string): string[] {
  return normal(text)
    .replace(/([A-Z]{2,})s(?![a-z])/g, "$1 s")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word !== "");
}
/** The joined fold: lower-cased with every character outside a-z and 0-9 removed. */
function joinedOf(text: string): string {
  return normal(text)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}
/** The stems a text names, in STEMS order: a word stem as a whole word or its plural, a joined stem anywhere. */
function stemsIn(text: string): string[] {
  const words = new Set(wordsOf(text));
  const joined = joinedOf(text);
  return Object.entries(STEMS)
    .filter(([stem, kind]) => (kind === "word" ? words.has(stem) || words.has(`${stem}s`) : joined.includes(stem)))
    .map(([stem]) => stem);
}
/** A word's plural: es after a sibilant ending (freshness -> freshnesses), s otherwise (precisions, ceilings). */
function pluralOf(word: string): string {
  return /(?:s|x|z|ch|sh)$/.test(word) ? `${word}es` : `${word}s`;
}
/** The axes a set of names carries: an axis when one name has the axis word, or its plural, as a word of the word fold. */
function axesOf(names: readonly string[]): Axis[] {
  return AXES.filter(axis => names.some(name => wordsOf(name).some(word => word === axis || word === pluralOf(axis))));
}

/** Every script module kind below src, by extension, and the TypeScript script kind each one is parsed as. */
const SCRIPT_KINDS: Readonly<Record<string, ts.ScriptKind>> = {
  ".ts": ts.ScriptKind.TS,
  ".mts": ts.ScriptKind.TS,
  ".cts": ts.ScriptKind.TS,
  ".tsx": ts.ScriptKind.TSX,
  ".js": ts.ScriptKind.JS,
  ".mjs": ts.ScriptKind.JS,
  ".cjs": ts.ScriptKind.JS,
  ".jsx": ts.ScriptKind.JSX,
};
function scriptKind(module: string): ts.ScriptKind {
  return SCRIPT_KINDS[module.slice(module.lastIndexOf("."))] ?? ts.ScriptKind.TS;
}
/** A path is read by the gate when it is a script module below src. */
function inSrcScope(path: string): boolean {
  return path.startsWith("src/") && Object.keys(SCRIPT_KINDS).some(extension => path.endsWith(extension));
}
/** A node's judged text and its kind: identifiers and private names, string and template literal texts, regular-expression
 * literals as written and JSX text; any other node reads none. */
function judgedText(node: ts.Node): { kind: string; text: string } | undefined {
  if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) return { kind: "identifier", text: node.text };
  if (ts.isStringLiteralLike(node)) return { kind: "string", text: node.text };
  if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) return { kind: "template", text: node.text };
  if (ts.isRegularExpressionLiteral(node)) return { kind: "regex", text: node.text };
  if (ts.isJsxText(node)) return { kind: "jsx", text: node.text };
  return undefined;
}
/** A written member name's text: an identifier, a private name or a string, numeric or plain template literal; a computed name
 * reads none (R-COMPOSED). */
function writtenName(name: ts.PropertyName | ts.BindingName | undefined): string[] {
  if (name === undefined) return [];
  if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return [name.text];
  if (ts.isNoSubstitutionTemplateLiteral(name)) return [name.text];
  return [];
}
/** A name-carrying declaration's written names: an interface, a type literal, a class, an object literal, an object binding pattern
 * or an enum (its members' names); a function-like declaration's parameter list (constructor parameter properties included); a
 * union type's string-literal members (plain or no-substitution template literal types); an array literal's string elements. Any
 * other node, or one that writes no name, is none. */
function memberNames(node: ts.Node): { kind: string; names: string[] } | undefined {
  if (ts.isInterfaceDeclaration(node)) return { kind: "interface", names: node.members.flatMap(member => writtenName(member.name)) };
  if (ts.isTypeLiteralNode(node)) return { kind: "type-literal", names: node.members.flatMap(member => writtenName(member.name)) };
  if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) return { kind: "class", names: node.members.flatMap(member => writtenName(member.name)) };
  if (ts.isObjectLiteralExpression(node)) return { kind: "object-literal", names: node.properties.flatMap(property => writtenName(property.name)) };
  if (ts.isObjectBindingPattern(node)) return { kind: "binding-pattern", names: node.elements.flatMap(element => writtenName(element.propertyName ?? element.name)) };
  if (ts.isEnumDeclaration(node)) return { kind: "enum", names: node.members.flatMap(member => writtenName(member.name)) };
  const listed = (kind: string, names: string[]): { kind: string; names: string[] } | undefined => (names.length > 0 ? { kind, names } : undefined);
  if (ts.isFunctionLike(node)) return listed("parameters", node.parameters.flatMap(parameter => writtenName(parameter.name)));
  if (ts.isUnionTypeNode(node)) {
    return listed(
      "literal-union",
      node.types.flatMap(type => (ts.isLiteralTypeNode(type) && ts.isStringLiteralLike(type.literal) ? [type.literal.text] : [])),
    );
  }
  if (ts.isArrayLiteralExpression(node)) {
    return listed(
      "string-array",
      node.elements.flatMap(element => (ts.isStringLiteral(element) || ts.isNoSubstitutionTemplateLiteral(element) ? [element.text] : [])),
    );
  }
  return undefined;
}
interface ModuleReading {
  readonly texts: number;
  readonly mentions: string[];
  readonly declarations: number;
  readonly members: number;
  readonly triples: string[];
}
/** One module's reading in one pass: its judged texts' stem mentions (`${module}:${line}|${kind}|${stems}`) and its declarations'
 * triples (`${module}:${line}|${kind}|${the names carrying an axis}`). */
function readModule(text: string, module: string): ModuleReading {
  const source = ts.createSourceFile(module, text, ts.ScriptTarget.Latest, true, scriptKind(module));
  const line = (node: ts.Node): number => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
  const mentions: string[] = [];
  const triples: string[] = [];
  let texts = 0;
  let declarations = 0;
  let members = 0;
  const visit = (node: ts.Node): void => {
    const judged = judgedText(node);
    if (judged !== undefined) {
      texts += 1;
      const stems = stemsIn(judged.text);
      if (stems.length > 0) mentions.push(`${module}:${line(node)}|${judged.kind}|${stems.join("+")}`);
    }
    const declaration = memberNames(node);
    if (declaration !== undefined) {
      declarations += 1;
      members += declaration.names.length;
      if (axesOf(declaration.names).length === AXES.length) {
        const carrying = declaration.names.filter(name => axesOf([name]).length > 0);
        triples.push(`${module}:${line(node)}|${declaration.kind}|${carrying.join("+")}`);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { texts, mentions, declarations, members, triples };
}
function filesBelow(directory: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...filesBelow(path));
    else if (entry.isFile()) found.push(path);
  }
  return found;
}
function repoPath(path: string): string {
  return relative(REPO, path).split("\\").join("/");
}
/** git's tracked script modules below src (its index, git ls-files -z, never quoted), filtered by git itself - one glob pathspec per
 * script extension - and never by inSrcScope: the walk's independent anchor, so a narrowed scope predicate leaves a tracked module
 * unread. */
function trackedModules(): string[] {
  const pathspecs = Object.keys(SCRIPT_KINDS).map(extension => `:(glob)src/**/*${extension}`);
  return execFileSync("git", ["ls-files", "-z", "--", ...pathspecs], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
    .split("\0")
    .filter(path => path !== "");
}
interface SrcReading extends ModuleReading {
  readonly modules: string[];
  readonly tracked: string[];
}
let src: SrcReading | undefined;
/** The src walk, read once per file: every script module below src, and git's tracked script modules below src. */
function srcReading(): SrcReading {
  if (src !== undefined) return src;
  const modules = filesBelow(join(REPO, "src")).map(repoPath).filter(inSrcScope).sort();
  const tracked = trackedModules().sort();
  const readings = modules.map(module => readModule(readFileSync(join(REPO, module), "utf8"), module));
  src = {
    modules,
    tracked,
    texts: readings.reduce((total, reading) => total + reading.texts, 0),
    mentions: readings.flatMap(reading => reading.mentions),
    declarations: readings.reduce((total, reading) => total + reading.declarations, 0),
    members: readings.reduce((total, reading) => total + reading.members, 0),
    triples: readings.flatMap(reading => reading.triples),
  };
  return src;
}
/** Every key and string of a value at any depth, each with its path. */
function textsOf(value: unknown, path: string): { path: string; text: string }[] {
  if (typeof value === "string") return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => textsOf(item, `${path}[${index}]`));
  if (isObject(value)) {
    return Object.entries(value).flatMap(([key, child]) => [{ path: `${path}.${key}#key`, text: key }, ...textsOf(child, `${path}.${key}`)]);
  }
  return [];
}
function textMentions(value: unknown, location: string): string[] {
  return textsOf(value, location).flatMap(entry => {
    const stems = stemsIn(entry.text);
    return stems.length > 0 ? [`${entry.path}|${stems.join("+")}`] : [];
  });
}
/** A manifest's mentions: every key and string read whole, and its raw text (so a shadowed duplicate key is read too). */
function manifestMentions(raw: string, location: string): string[] {
  const parsed: unknown = JSON.parse(raw);
  return [...textMentions(parsed, location), ...stemsIn(raw).map(stem => `${location}#raw|${stem}`)];
}
/** The triples of a descriptor value: every object at any depth, read by its own keys (a schema's properties object reads by its
 * property names). */
function objectTriples(value: unknown, path: string): { objects: number; triples: string[] } {
  if (Array.isArray(value)) {
    const items = value.map((item, index) => objectTriples(item, `${path}[${index}]`));
    return { objects: items.reduce((total, item) => total + item.objects, 0), triples: items.flatMap(item => item.triples) };
  }
  if (!isObject(value)) return { objects: 0, triples: [] };
  const names = Object.keys(value);
  const own = axesOf(names).length === AXES.length ? [`${path}|${names.filter(name => axesOf([name]).length > 0).join("+")}`] : [];
  const children = Object.entries(value).map(([key, child]) => objectTriples(child, `${path}.${key}`));
  return { objects: 1 + children.reduce((total, child) => total + child.objects, 0), triples: [...own, ...children.flatMap(child => child.triples)] };
}
/** Clients and readers that are never invoked: registration only stores the descriptor. */
const NEVER = (): never => {
  throw new Error("census: a registered capability is never invoked");
};
const FORGE_CLIENT: ForgeReadClient = { gate: { status: async () => NEVER() } };
const FURNACE_CLIENT: FurnaceReadClient = { runs: { get: () => ({ inspect: async () => NEVER() }) } };
const HX_READER: HyperUnixReader = { find: async () => NEVER(), runtime: async () => NEVER(), async close() {} };
const RF_INVOKE: Parameters<typeof registerReactiveFiberRender>[1] = async () => NEVER();
/** The descriptor ids each read registration must register. */
const REQUIRED_DESCRIPTORS = ["forge.gate.status", "furnace.run.inspect", "hyperunix.find", "reactivefiber.render.preview"] as const;
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
/** The registry the four injected-client registrations fill. */
function injectedRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerForgeGateStatus(registry, FORGE_CLIENT, "0.1.0");
  registerHyperUnixFind(registry, HX_READER, REPO);
  registerFurnaceRunInspect(registry, FURNACE_CLIENT, REPO);
  registerReactiveFiberRender(registry, RF_INVOKE, REPO);
  return registry;
}
function plantedRegistry(descriptor: CapabilityDescriptor): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registry.register({ descriptor, invoke: async () => NEVER() });
  return registry;
}
interface RegistryReading {
  readonly missing: string[];
  readonly objects: number;
  readonly triples: string[];
  readonly descriptions: string[];
}
/** A registry's artifact reading: the required ids missing, the objects read, the triples, and its fingerprint - each descriptor's
 * id and description, in id order (the native and the injected registrations describe each capability in their own words, so one
 * leg read from the other registration reds). */
function registryReading(registry: CapabilityRegistry): RegistryReading {
  const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
  const ids = descriptors.map(descriptor => descriptor.id);
  const readings = descriptors.map(descriptor => objectTriples(descriptor, descriptor.id));
  return {
    missing: REQUIRED_DESCRIPTORS.filter(id => !ids.includes(id)),
    objects: readings.reduce((total, reading) => total + reading.objects, 0),
    triples: readings.flatMap(reading => reading.triples),
    descriptions: descriptors.map(descriptor => `${descriptor.id}: ${descriptor.description}`).sort(),
  };
}
type Gate = "ABSENT" | "PRESENT";
const gateOf = (findings: number): Gate => (findings > 0 ? "PRESENT" : "ABSENT");
/** The until-then guard: pass while both the adoption and the artifact read ABSENT, owed once either reads PRESENT. */
function guard(adoption: Gate, artifact: Gate): "pass" | "owed" {
  return adoption === "ABSENT" && artifact === "ABSENT" ? "pass" : "owed";
}
/** The duty an owed verdict names. */
const OWED =
  "the until-then has ended: an EDC surface or the freshness/precision/ceiling triple reads PRESENT - bind its composer through falsify(), prove its per-axis silent-widening mutants red and re-measure this census (wb-pyel.6)";
/** The adoption gate over one reading: the src walk's stem mentions and one manifest's raw text. */
function adoptionOf(mentions: readonly string[], manifestRaw: string): { manifestTexts: number; manifest: string[]; adoption: Gate } {
  const manifest = manifestMentions(manifestRaw, "package.json");
  return { manifestTexts: textsOf(JSON.parse(manifestRaw), "package.json").length, manifest, adoption: gateOf(mentions.length + manifest.length) };
}
/** The artifact gate over one reading: the src walk's triples and each registration's. */
function artifactOf(triples: readonly string[], registrations: readonly RegistryReading[]): Gate {
  return gateOf(triples.length + registrations.reduce((total, registration) => total + registration.triples.length, 0));
}
/** The adoption gate's live reading (A1 and D2 read it alike). */
function adoptionReading(): { manifestTexts: number; manifest: string[]; adoption: Gate } {
  return adoptionOf(srcReading().mentions, readFileSync(join(REPO, "package.json"), "utf8"));
}
/** The artifact gate's live reading (D1 and D2 read it alike): the src walk's triples and both registrations'. */
async function artifactReading(): Promise<{ native: RegistryReading; injected: RegistryReading; artifact: Gate }> {
  const native = registryReading(await nativeRegistry());
  const injected = registryReading(injectedRegistry());
  return { native, injected, artifact: artifactOf(srcReading().triples, [native, injected]) };
}

/** Walk and reading floors, each well below the cut-time measure: on trunk 7a0ab7f modules 116, texts 100929, name-carrying
 * declarations 7623, written names 18793, package.json keys and strings 120, descriptor objects 24 in each read registration;
 * re-measured for respin 1 on trunk 04123dc: modules 117, texts 101769, declarations 7694, written names 19003, package.json keys
 * and strings 120, descriptor objects 24 in each. */
const FLOORS = { modules: 100, texts: 60000, declarations: 2500, members: 7000, manifestTexts: 80, descriptorObjects: 16 } as const;
const ZWSP = String.fromCodePoint(0x200b);
/** A Latin word written in full-width letters (NFKC folds each back to its Latin letter). */
const fullWidth = (word: string): string => [...word].map(letter => String.fromCodePoint((letter.codePointAt(0) ?? 0) + 0xfee0)).join("");
/** Synthetic modules the adoption reader must read exactly as pinned (each a module body; none is compiled or run). */
const SOURCE_CONTROLS: Readonly<Record<string, string>> = {
  identifier: "const EdcAssembler = 1;",
  string: `const label = "evidence-directed context";`,
  template: `const label = \`EDC \${name} scope\`;`,
  "import-specifier": `import { assemble } from "@example/edc";`,
  regex: "const pattern = /EDCs/;",
  "private-name": "class Host { #edcScope = 1; }",
  "jsx.tsx": "export const view = <span>EDC scope</span>;",
  comment: "// EDC assembly\n/* evidence-directed */\nconst value = 1;",
  "inside-word": "const credcheck = 1; const reedcraft = 2;",
  "zero-width": `const label = "E${ZWSP}DC scope";`,
  "full-width": `const label = "${fullWidth("EDC")} scope";`,
};
/** Synthetic manifests the adoption reader must read exactly as pinned. */
const MANIFEST_CONTROLS: Readonly<Record<string, string>> = {
  dependency: `{ "name": "x", "dependencies": { "@example/edc": "1.0.0" } }`,
  "dev-dependency": `{ "name": "x", "devDependencies": { "evidence-directed-sdk": "1.0.0" } }`,
  specifier: `{ "name": "x", "dependencies": { "blocks": "npm:edc-assembler@1.0.0" } }`,
  "shadowed-key": `{ "name": "x", "dependencies": { "@example/edc": "1.0.0" }, "dependencies": { "blocks": "1.0.0" } }`,
  clean: `{ "name": "x", "description": "A workflow workbench", "dependencies": { "@example/blocks": "1.0.0" } }`,
};
/** Synthetic modules the artifact reader must read exactly as pinned: each declaration kind carrying the triple once. */
const TRIPLE_CONTROLS: Readonly<Record<string, string>> = {
  interface: "interface RequestScope { requestFreshness: number; resultPrecision: number; resourceCeiling: number }",
  "type-literal": "type Scope = { freshness: number; precision: number; ceiling: number };",
  class: "class Scope { freshness = 1; precision = 2; ceiling = 3; }",
  "object-literal": "const scope = { maxFreshness: 1, precision: 2, ceilings: [3] };",
  "binding-pattern": "function narrow({ freshness, precision, ceiling }: Scope) { return freshness + precision + ceiling; }",
  enum: "enum Axis { Freshness, Precision, Ceiling }",
  "string-keys": `const scope = { "request_freshness": 1, "result-precision": 2, 'resource ceiling': 3 };`,
  nested: "interface Outer { limits: { freshness: number; precision: number; ceiling: number }; freshness: number }",
  "private-names": "class Scope { #freshness = 1; #precision = 2; #ceiling = 3; }",
  methods: "interface Scope { freshness(): number; precision(): number; ceiling(): number }",
  parameters: "function narrow(requestFreshness: number, resultPrecision: number, resourceCeiling: number) { return requestFreshness; }",
  "parameter-properties": "class Scope { constructor(readonly freshness: number, readonly precision: number, readonly ceiling: number) {} }",
  "literal-union": 'type Axis = "freshness" | "precision" | "ceiling";',
  "template-union": "type Axis = `freshness` | `precision` | `ceiling`;",
  "string-array": 'const axes = ["freshness", "precision", "ceiling"] as const;',
  plurals: "interface Scope { freshnesses: number[]; precisions: number[]; ceilings: number[] }",
  "zero-width": `interface Scope { "fresh${ZWSP}ness": number; precision: number; ceiling: number }`,
  "full-width": `interface Scope { ${fullWidth("freshness")}: number; precision: number; ceiling: number }`,
};
/** The planted descriptor the artifact reader must read: the triple in its input schema's properties. */
const PLANTED_DESCRIPTOR: CapabilityDescriptor = {
  id: "planted.scope.read",
  version: "1.0.0",
  description: "Read one planted scope",
  inputSchema: {
    type: "object",
    properties: { requestFreshness: { type: "number" }, resultPrecision: { type: "number" }, resourceCeiling: { type: "number" } },
    additionalProperties: false,
  },
  effectClass: "read",
  permissions: ["planted:read"],
  supportedModes: ["invoke"],
};
/** R-LOOKALIKE's probes: one stem each, one letter replaced by its look-alike from another script, and the Latin letter. */
const CYRILLIC_IE = String.fromCodePoint(0x0435);
const CYRILLIC_ES = String.fromCodePoint(0x0421);
const LOOKALIKE_PROBES: readonly { readonly text: string; readonly lookalike: string; readonly latin: string }[] = [
  { text: `${CYRILLIC_IE}vidence-directed scope`, lookalike: CYRILLIC_IE, latin: "e" },
  { text: `ED${CYRILLIC_ES} scope`, lookalike: CYRILLIC_ES, latin: "C" },
];
/** R-PARTIAL's probes: declarations carrying one or two axes, the triple split across two declarations, and the complete control. */
const PARTIAL_CONTROLS: Readonly<Record<string, string>> = {
  "two-of-three": "interface Scope { freshness: number; ceiling: number }",
  "one-of-three": "interface Scope { precision: number }",
  "split-across": "interface A { freshness: number; precision: number } interface B { ceiling: number }",
  complete: "interface Scope { freshness: number; precision: number; ceiling: number }",
};
const PARTIAL_DESCRIPTOR: CapabilityDescriptor = {
  ...PLANTED_DESCRIPTOR,
  id: "planted.partial.read",
  inputSchema: { type: "object", properties: { requestFreshness: { type: "number" }, resourceCeiling: { type: "number" } } },
};
/** R-VOCABULARY's probes: the triple in other words, and its word-for-word twin. */
const VOCABULARY_CONTROLS: Readonly<Record<string, string>> = {
  age: "interface Scope { maxAgeMs: number; staleness: number }",
  tolerance: "interface Scope { tolerance: number; accuracy: number; epsilon: number }",
  budget: "interface Scope { budget: number; quota: number; limit: number; cap: number }",
  adjectives: "interface Scope { fresh: boolean; precise: boolean; ceil: number }",
  twin: "interface Scope { freshness: number; precision: number; ceiling: number }",
};
/** R-COMPOSED's probes: computed member names, and a stem composed from parts that each name none. */
const COMPOSED_DECLARATION = 'const CEILING = "ceiling"; const scope = { ["fresh" + "ness"]: 1, [`precision`]: 2, [CEILING]: 3 };';
const COMPOSED_SOURCE = 'const label = "evidence-" + "directed"; const acronym = ["E", "D", "C"].join("");';
/** R-SCOPE's probes: paths outside the src walk, and one module the readers would read if it were walked. */
const OUT_OF_SCOPE: readonly string[] = [
  "examples/edc-scope.ts",
  "qa/workbench/edc-scope.mjs",
  "test/edc-scope.test.ts",
  "scripts/edc-scope.mjs",
  "docs/workbench/edc-scope.md",
  "src/workbench/edc-scope.json",
  "src/workbench/edc-scope.d.json",
];
const OUT_OF_SCOPE_MODULE = "export interface EdcScope { freshness: number; precision: number; ceiling: number }";
/** R-GRID's composer: lawful on the grid, it widens unreported any request beyond the grid's looser factor. */
const GRID_EVADER: Composer = (parent, request) => {
  const evading = AXES.filter(axis => (request[axis] ?? 0) > parent[axis] * FACTORS.looser);
  return {
    kind: "scoped",
    scope: adopt(parent, request, evading),
    diagnostics: clamp(parent, request).diagnostics.filter(diagnostic => !evading.includes(diagnostic.axis)),
  };
};
/** R-GRID's request beyond the grid, as a factor on the parent's bound. */
const EVADER_FACTOR = 3;
/** R-STATEFUL's composer: lawful for its first `lawful` calls, then every axis adopts the child's request, unreported. */
function statefulComposer(lawful: number): Composer {
  let calls = 0;
  return (parent, request) => {
    calls += 1;
    return calls <= lawful ? CLAMPING(parent, request) : { kind: "scoped", scope: adopt(parent, request, AXES), diagnostics: [] };
  };
}
/** R-SUFFIXED's probe: the acronym run into a lower-case-led suffix, as an identifier and a string; and its spaced twin. */
const SUFFIXED_SOURCE = 'export const GateEDCv2Client = "EDCv2";';
const SUFFIXED_TWIN = 'export const GateEdcV2Client = "EDC v2";';
/** R-DOTTED's probe: the dotted acronym; and its undotted twin. */
const DOTTED_SOURCE = 'export const ASSEMBLY_LABEL = "E.D.C. assembly";';
const DOTTED_TWIN = 'export const ASSEMBLY_LABEL = "EDC assembly";';
/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-LOOKALIKE": ["Q1"],
  "R-PARTIAL": ["Q2"],
  "R-VOCABULARY": ["Q3"],
  "R-COMPOSED": ["Q4"],
  "R-SCOPE": ["Q5"],
  "R-GRID": ["Q6"],
  "R-STATEFUL": ["Q7"],
  "R-SUFFIXED": ["Q8"],
  "R-DOTTED": ["Q9"],
};

// ---- the rows and the roster ----

interface Pin {
  readonly id: string;
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A-D, to the bead's title, acceptance and notes. */
const ROWS: readonly Row[] = [
  { id: "A", label: "If Pi adopts EDC assembly or components", pins: [{ id: "A1", quote: "If Pi adopts EDC assembly or components" }] },
  {
    id: "B",
    label:
      "request freshness, result precision and resource ceiling shall be scoped through parent boundaries with children able to tighten but never silently expand rights",
    pins: [
      { id: "B1", quote: "a child context requests looser freshness, precision or ceiling than its parent" },
      { id: "B2", quote: "and is clamped or refused with a typed diagnostic" },
      { id: "B3", quote: "never silently widened" },
      { id: "B4", quote: "a silent-widening mutant goes red" },
    ],
  },
  { id: "C", label: "mirroring Pi's existing grant discipline", pins: [{ id: "C1", quote: "grants" }, { id: "C2", quote: "tool surfaces" }] },
  {
    id: "D",
    label: "Artifact: a Pi EDC assembly/component surface carrying scoped freshness/precision/ceiling (none exists)",
    pins: [
      { id: "D1", quote: "Artifact: a Pi EDC assembly/component surface carrying scoped freshness/precision/ceiling" },
      { id: "D2", quote: "(none exists)" },
    ],
  },
  {
    id: "Q",
    label: "the residuals: each named family pinned by its quiet row",
    pins: Object.entries(RESIDUALS).flatMap(([family, pins]) => pins.map(id => ({ id, quote: family }))),
  },
];

interface RosterPin {
  readonly id: string;
  readonly quote: string;
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
      if (!isObject(pin) || typeof pin.id !== "string" || typeof pin.quote !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id, a quote and a witness`);
      }
      return { id: pin.id, quote: pin.quote, witness: json(pin.witness) };
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
/** Every constant the cases read, as the roster holds them. */
function constants(): JsonValue {
  return json({
    stems: STEMS,
    axes: AXES,
    codes: CODES,
    forbidden: FORBIDDEN,
    classes: CLASSES,
    acceptanceLead: ACCEPTANCE_LEAD,
    mirrorLead: MIRROR_LEAD,
    parent: PARENT,
    factors: FACTORS,
    probes: PROBES,
    references: Object.keys(REFERENCES),
    typedMutants: Object.keys(TYPED_MUTANTS),
    defaultBound: DEFAULT_BOUND,
    wideningMutants: Object.keys(WIDENING_MUTANTS),
    silentMutants: Object.keys(SILENT_MUTANTS),
    controlProbe: CONTROL_PROBE,
    classifierControls: classifierControls(),
    permission: [PERMISSION_ID, PAIR_ID, INVOKE_ID, PERMISSION, SECOND_PERMISSION],
    grantContexts: GRANT_CONTEXTS,
    pairContexts: PAIR_CONTEXTS,
    invokeContexts: INVOKE_CONTEXTS,
    curatedCeilings: CURATED_CEILINGS,
    scriptKinds: Object.keys(SCRIPT_KINDS),
    floors: FLOORS,
    requiredDescriptors: REQUIRED_DESCRIPTORS,
    owed: OWED,
    sourceControls: SOURCE_CONTROLS,
    manifestControls: MANIFEST_CONTROLS,
    tripleControls: TRIPLE_CONTROLS,
    planted: PLANTED_DESCRIPTOR,
    lookalike: LOOKALIKE_PROBES,
    partialControls: PARTIAL_CONTROLS,
    partialDescriptor: PARTIAL_DESCRIPTOR,
    vocabularyControls: VOCABULARY_CONTROLS,
    composed: [COMPOSED_DECLARATION, COMPOSED_SOURCE],
    outOfScope: OUT_OF_SCOPE,
    outOfScopeModule: OUT_OF_SCOPE_MODULE,
    evaderFactor: EVADER_FACTOR,
    suffixed: [SUFFIXED_SOURCE, SUFFIXED_TWIN],
    dotted: [DOTTED_SOURCE, DOTTED_TWIN],
    residuals: RESIDUALS,
  });
}

// ---- the bead's own text ----

function exportRow(): { title: string; notes: string } {
  for (const line of readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  return { title: "", notes: "" };
}
/** The title's statement: everything after its requirement tag. */
function statementOf(title: string): string {
  return title.replace(/^\[[^\]]+\] /, "");
}
/** The acceptance sentence: the notes' text after "Acceptance: " up to the end of that sentence. */
function acceptanceOf(notes: string): string {
  return /Acceptance: (.+?\.)(?:\s|$)/.exec(notes)?.[1] ?? "";
}
/** The notes' mirror span: the text after the first MIRROR_LEAD up to the next spaced em dash, or none. */
function mirrorSpan(notes: string): string {
  const start = notes.indexOf(MIRROR_LEAD);
  if (start === -1) return "";
  const end = notes.indexOf(` ${DASH} `, start + MIRROR_LEAD.length);
  return end === -1 ? "" : notes.slice(start + MIRROR_LEAD.length, end);
}
/** Whether a text is exactly the quotes, in order, with separator-only gaps (spaces and , ; . :) between, before and after them. */
function tiled(text: string, quotes: readonly string[]): boolean {
  const separators = /^[\s,;.:]*$/;
  let at = 0;
  for (const quote of quotes) {
    const found = text.indexOf(quote, at);
    if (found === -1 || !separators.test(text.slice(at, found))) return false;
    at = found + quote.length;
  }
  return separators.test(text.slice(at));
}
/** The heads of the title's triple: B's label before " shall ", split at ", " and " and ", each item's last word. */
function tripleHeads(label: string): string[] {
  const end = label.indexOf(" shall ");
  if (end === -1) return [];
  return label
    .slice(0, end)
    .split(/, | and /)
    .map(item => item.split(" ").at(-1) ?? "");
}
/** The acceptance's looser list: the words after "looser " up to " than ", split at ", " and " or ". */
function looserList(acceptance: string): string[] {
  const match = /looser (.+?) than /.exec(acceptance);
  return match === null ? [] : (match[1] ?? "").split(/, | or /);
}
/** The artifact's slash list: the word after "scoped " split at "/". */
function slashList(label: string): string[] {
  return /scoped (\S+)/.exec(label)?.[1]?.split("/") ?? [];
}
/** The acceptance's lawful outcomes: the two words joined by " or " before " with a typed diagnostic". */
function lawfulCodes(acceptance: string): string[] {
  const match = /is (\w+) or (\w+) with a typed diagnostic/.exec(acceptance);
  return match === null ? [] : [match[1] ?? "", match[2] ?? ""];
}
/** The acceptance's forbidden outcome: "never <adverb> <participle>" read as <participle>-<adverb>. */
function forbiddenOf(acceptance: string): string {
  const match = /never (\w+) (\w+)/.exec(acceptance);
  return match === null ? "" : `${match[2]}-${match[1]}`;
}
/** The stems the notes' charter path derives: the slug's initials, and the slug's words before its head noun, joined. */
function charterStems(notes: string): string[] {
  const slug = /docs\/programs\/([a-z]+(?:-[a-z]+)+)-\d{4}-\d{2}-\d{2}\.md/.exec(notes)?.[1];
  if (slug === undefined) return [];
  const words = slug.split("-");
  return [words.map(word => word[0] ?? "").join(""), words.slice(0, -1).join("")];
}

// ---- the cases ----

const REACHED: string[] = [];
const falsified = (composers: Readonly<Record<string, Composer>>): Record<string, Verdict> =>
  Object.fromEntries(Object.entries(composers).map(([name, composer]) => [name, falsify(composer)]));
const classesOf = (verdict: Verdict): string[] => [...new Set(verdict.violations.map(violation => violation.split("|")[2] ?? ""))];

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const reading = srcReading();
    const { manifestTexts, manifest, adoption } = adoptionReading();
    return json({
      modulesBelowFloor: reading.modules.length < FLOORS.modules,
      textsBelowFloor: reading.texts < FLOORS.texts,
      untracked: reading.modules.filter(module => !reading.tracked.includes(module)),
      unread: reading.tracked.filter(module => !reading.modules.includes(module)),
      mentions: reading.mentions,
      manifestBelowFloor: manifestTexts < FLOORS.manifestTexts,
      manifest,
      adoption,
      controls: {
        scope: Object.fromEntries(Object.keys(SCRIPT_KINDS).map(extension => [`src/workbench/module${extension}`, inSrcScope(`src/workbench/module${extension}`)])),
        sources: Object.fromEntries(Object.entries(SOURCE_CONTROLS).map(([name, text]) => [name, readModule(text, name).mentions])),
        manifests: Object.fromEntries(Object.entries(MANIFEST_CONTROLS).map(([name, text]) => [name, manifestMentions(text, name)])),
      },
    });
  },
  B1: async () => {
    const parentBounds = AXES.map(axis => PARENT[axis]);
    expect(new Set(parentBounds).size, "each axis of the parent sits at a distinct bound").toBe(AXES.length);
    for (const axis of AXES) {
      for (const relation of RELATIONS) expect(PROBES.map(probe => probe.name), `the grid asks ${axis} ${relation} alone`).toContain(`${axis}:${relation}`);
      expect(
        PROBES.filter(probe => looserAxes(probe.request).length === 1 && looserAxes(probe.request)[0] === axis && Object.keys(probe.request).length === AXES.length).length,
        `the grid asks ${axis} looser beside two tighter axes`,
      ).toBe(1);
    }
    return json({
      axes: AXES,
      parent: PARENT,
      grid: PROBES.map(probe => `${probe.name} ${JSON.stringify(probe.request)} looser=${looserAxes(probe.request).join("+")}`),
    });
  },
  B2: async () => {
    const references = falsified(REFERENCES);
    const mutants = falsified(TYPED_MUTANTS);
    const probe = PROBES.find(entry => entry.name === CONTROL_PROBE);
    expect(probe, `the grid holds the control probe ${CONTROL_PROBE}`).toBeDefined();
    const controls = Object.fromEntries(Object.entries(classifierControls()).map(([name, outcome]) => [name, probe === undefined ? [] : judge(probe, outcome)]));
    expect(Object.values(references).map(verdict => verdict.verdict), "both lawful forms hold over the grid").toEqual(Object.keys(REFERENCES).map(() => "holds"));
    expect(Object.entries(mutants).filter(([, verdict]) => verdict.verdict !== "violated").map(([name]) => name), "every B2 mutant is red").toEqual([]);
    const named = [...Object.values(mutants).flatMap(classesOf), ...Object.values(controls).flatMap(list => list.map(entry => entry.split("|")[2] ?? ""))];
    expect(named.filter(kind => !CLASSES.some(member => member === kind)), "every class named is one of CLASSES").toEqual([]);
    return json({ references, controls, mutants });
  },
  B3: async () => {
    const mutants = falsified(WIDENING_MUTANTS);
    const widening = ["widened-silently", "widened-with-diagnostic", "threw"];
    expect(
      Object.entries(mutants).filter(([, verdict]) => !classesOf(verdict).some(kind => widening.includes(kind))).map(([name]) => name),
      "every widening mutant is red at a widening",
    ).toEqual([]);
    return json(mutants);
  },
  B4: async () => {
    const mutants = falsified(SILENT_MUTANTS);
    for (const axis of AXES) {
      expect(mutants[`silent:${axis}`]?.violations, `the silent-widening mutant on ${axis} goes red at ${axis}:looser`).toContain(`${axis}:looser|${axis}|${FORBIDDEN}`);
    }
    return json(mutants);
  },
  C1: async () => {
    const permission: Record<string, string> = {};
    for (const [name, grants] of Object.entries(GRANT_CONTEXTS)) permission[name] = await grantOutcome(PERMISSION_ID, [PERMISSION], grants);
    const pair: Record<string, string> = {};
    for (const [name, grants] of Object.entries(PAIR_CONTEXTS)) pair[name] = await grantOutcome(PAIR_ID, [PERMISSION, SECOND_PERMISSION], grants);
    const invoke: Record<string, string> = {};
    for (const [name, grants] of Object.entries(INVOKE_CONTEXTS)) invoke[name] = await grantOutcome(INVOKE_ID, [], grants);
    const registry = new CapabilityRegistry();
    registry.register(plantedProvider(PERMISSION_ID, [PERMISSION], { calls: 0 }));
    registry.register(plantedProvider(INVOKE_ID, [], { calls: 0 }));
    const listed = (grants: readonly string[]): string[] => registry.discover({ grants }).map(descriptor => descriptor.id);
    return json({
      permission,
      pair,
      invoke,
      discover: {
        none: listed([]),
        permission: listed([`discover:${PERMISSION_ID}`]),
        "invoke-grants": listed([PERMISSION, `invoke:${INVOKE_ID}`]),
        both: listed([`discover:${PERMISSION_ID}`, `discover:${INVOKE_ID}`]),
      },
    });
  },
  C2: async () =>
    json(
      Object.fromEntries(
        CURATED_BOUNDS.map(bound => {
          const ceiling = CURATED_CEILINGS[bound];
          return [bound, { below: curatedOutcome(bound, ceiling * FACTORS.tighter), at: curatedOutcome(bound, ceiling), above: curatedOutcome(bound, ceiling + 1) }];
        }),
      ),
    ),
  D1: async () => {
    const reading = srcReading();
    const { native: nativeReading, injected: injectedReading, artifact } = await artifactReading();
    const descriptors = (entry: RegistryReading) => ({
      missing: entry.missing,
      objectsBelowFloor: entry.objects < FLOORS.descriptorObjects,
      descriptions: entry.descriptions,
      triples: entry.triples,
    });
    return json({
      declarationsBelowFloor: reading.declarations < FLOORS.declarations,
      membersBelowFloor: reading.members < FLOORS.members,
      triples: reading.triples,
      native: descriptors(nativeReading),
      injected: descriptors(injectedReading),
      artifact,
      controls: {
        sources: Object.fromEntries(Object.entries(TRIPLE_CONTROLS).map(([name, text]) => [name, readModule(text, name).triples])),
        descriptor: registryReading(plantedRegistry(PLANTED_DESCRIPTOR)).triples,
      },
    });
  },
  D2: async () => {
    const live = { adoption: adoptionReading().adoption, artifact: (await artifactReading()).artifact };
    const verdict = guard(live.adoption, live.artifact);
    expect(verdict, OWED).toBe("pass");
    const gates: readonly Gate[] = ["ABSENT", "PRESENT"];
    const planted = registryReading(plantedRegistry(PLANTED_DESCRIPTOR));
    const empty = registryReading(new CapabilityRegistry());
    return json({
      semantics: Object.fromEntries(gates.flatMap(adoption => gates.map(artifact => [`${adoption}/${artifact}`, guard(adoption, artifact)]))),
      composition: {
        "adoption:manifest-only": adoptionOf([], MANIFEST_CONTROLS.dependency ?? "").adoption,
        "adoption:src-only": adoptionOf(["planted:1|identifier|edc"], MANIFEST_CONTROLS.clean ?? "").adoption,
        "adoption:neither": adoptionOf([], MANIFEST_CONTROLS.clean ?? "").adoption,
        "artifact:src-only": artifactOf(["planted:1|interface|freshness+precision+ceiling"], [empty, empty]),
        "artifact:first-registration": artifactOf([], [planted, empty]),
        "artifact:second-registration": artifactOf([], [empty, planted]),
        "artifact:neither": artifactOf([], [empty, empty]),
      },
      live: { ...live, verdict },
    });
  },
  Q1: async () => {
    expect(
      LOOKALIKE_PROBES.filter(probe => !probe.text.includes(probe.lookalike)).map(probe => probe.text),
      "each probe carries its look-alike",
    ).toStrictEqual([]);
    return json({
      lookalike: LOOKALIKE_PROBES.map(probe => stemsIn(probe.text)),
      repaired: LOOKALIKE_PROBES.map(probe => stemsIn(probe.text.split(probe.lookalike).join(probe.latin))),
    });
  },
  Q2: async () =>
    json({
      sources: Object.fromEntries(Object.entries(PARTIAL_CONTROLS).map(([name, text]) => [name, readModule(text, name).triples])),
      descriptor: registryReading(plantedRegistry(PARTIAL_DESCRIPTOR)).triples,
    }),
  Q3: async () =>
    json(
      Object.fromEntries(
        Object.entries(VOCABULARY_CONTROLS).map(([name, text]) => {
          const declarations: string[][] = [];
          const visit = (node: ts.Node): void => {
            const declaration = memberNames(node);
            if (declaration !== undefined) declarations.push(axesOf(declaration.names));
            ts.forEachChild(node, visit);
          };
          visit(ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS));
          return [name, declarations];
        }),
      ),
    ),
  Q4: async () =>
    json({
      declaration: readModule(COMPOSED_DECLARATION, "composed-declaration").triples,
      source: readModule(COMPOSED_SOURCE, "composed-source").mentions,
      parts: ["evidence-", "directed", "E", "D", "C"].map(part => stemsIn(part).length),
    }),
  Q5: async () => {
    const reading = srcReading();
    return json({
      inScope: OUT_OF_SCOPE.filter(path => inSrcScope(path)),
      walked: OUT_OF_SCOPE.filter(path => reading.modules.includes(path)),
      readDirectly: OUT_OF_SCOPE.slice(0, 1).map(path => {
        const direct = readModule(OUT_OF_SCOPE_MODULE, path);
        return { path, mentions: direct.mentions, triples: direct.triples };
      }),
    });
  },
  Q6: async () => {
    const outside: Probe = { name: "ceiling:outside", request: { ceiling: PARENT.ceiling * EVADER_FACTOR } };
    return json({
      grid: falsify(GRID_EVADER),
      outside: judge(outside, GRID_EVADER(Object.freeze({ ...PARENT }), Object.freeze({ ...outside.request }))),
    });
  },
  Q7: async () => {
    const composer = statefulComposer(PROBES.length);
    const first = falsify(composer);
    const second = falsify(composer);
    return json({ first: first.verdict, second: second.verdict, secondClasses: classesOf(second), secondViolations: second.violations.length });
  },
  Q8: async () => json({ suffixed: readModule(SUFFIXED_SOURCE, "suffixed").mentions, twin: readModule(SUFFIXED_TWIN, "suffixed-twin").mentions }),
  Q9: async () => json({ dotted: readModule(DOTTED_SOURCE, "dotted").mentions, twin: readModule(DOTTED_TWIN, "dotted-twin").mentions }),
};

describe("wb-pyel.6 EDC scope-narrowing census (SDK-EVIDENCE-DIRECTED-COMPUTATION-R14, until-then leg, falsifier armed)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's title, acceptance and notes, and the cases agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:1", "B:4", "C:2", "D:2", "Q:9"]);
    const shape = (rows: readonly { id: string; label: string; pins: readonly { id: string; quote: string }[] }[]) =>
      rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => ({ id: pin.id, quote: pin.quote })) }));
    expect(shape(ROWS)).toStrictEqual(shape(ROSTER.rows));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort());
    expect(constants()).toStrictEqual(ROSTER.constants);
    const quiet = ROWS.find(row => row.id === "Q")?.pins.map(pin => pin.id) ?? [];
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(quiet, `${member} is a quiet-row pin`).toContain(member);
    const { title, notes } = exportRow();
    expect(title.length, `${BEAD}'s title was read from the tracker export`).toBeGreaterThan(0);
    const judged = ROWS.filter(row => row.id !== "Q");
    const row = (id: string): Row => judged.find(entry => entry.id === id) ?? { id, label: "", pins: [] };
    const quotes = (id: string): string[] => row(id).pins.map(pin => pin.quote);
    expect(tiled(statementOf(title), judged.map(entry => entry.label)), "A-D's labels tile the title's statement, in order").toBe(true);
    expect(tiled(row("A").label, quotes("A")), "A's pins' quotes tile its label").toBe(true);
    expect(tiled(row("D").label, quotes("D")), "D's pins' quotes tile its label").toBe(true);
    const acceptance = acceptanceOf(notes);
    expect(acceptance.startsWith(ACCEPTANCE_LEAD), "the acceptance opens with its lead").toBe(true);
    expect(tiled(acceptance.slice(ACCEPTANCE_LEAD.length), quotes("B")), "B's pins' quotes tile the acceptance after its lead").toBe(true);
    expect(mirrorSpan(notes), "the notes' mirror span is exactly C's pins' quotes, joined by ' and '").toBe(quotes("C").join(" and "));
    expect(tripleHeads(row("B").label), "the axes are the heads of the title's triple").toEqual([...AXES]);
    expect(looserList(acceptance), "the axes are the acceptance's looser list").toEqual([...AXES]);
    expect(slashList(row("D").label), "the axes are the artifact's slash list").toEqual([...AXES]);
    expect(lawfulCodes(acceptance), "the codes are the acceptance's lawful outcomes").toEqual([...CODES]);
    expect(forbiddenOf(acceptance), "the forbidden class is the acceptance's").toBe(FORBIDDEN);
    expect(charterStems(notes), "the stems are the notes' charter-path initials and modifier").toStrictEqual(Object.keys(STEMS));
    expect(stemsIn(row("A").label), "the antecedent names the word stem").toContain("edc");
    // The anchor readers' own controls: each reads a synthetic text exactly as pinned, and the tiling refuses a dropped label.
    expect(tiled(statementOf(title), judged.filter(entry => entry.id !== "C").map(entry => entry.label)), "a dropped label leaves the title untiled").toBe(false);
    expect(tiled("x, y. z.", ["x", "z"]), "a worded gap is no separator").toBe(false);
    expect(tiled("x, z.", ["z", "x"]), "quotes are read in order").toBe(false);
    expect(tripleHeads("alpha one, beta two and gamma three shall hold"), "the heads of a triple").toEqual(["one", "two", "three"]);
    expect(looserList("asks looser one, two or three than its parent"), "a looser list").toEqual(["one", "two", "three"]);
    expect(slashList("a surface carrying scoped one/two/three (none)"), "a slash list").toEqual(["one", "two", "three"]);
    expect(lawfulCodes("and is kept or dropped with a typed diagnostic"), "the lawful outcomes").toEqual(["kept", "dropped"]);
    expect(forbiddenOf("held, never quietly grown; a mutant"), "the forbidden outcome").toBe("grown-quietly");
    expect(charterStems("Citation: docs/programs/alpha-beta-gamma-2026-01-02.md:1@abc"), "the charter stems").toStrictEqual(["abg", "alphabeta"]);
    expect(acceptanceOf("Owner. Acceptance: a b, c. More text."), "the acceptance sentence").toBe("a b, c.");
    expect(mirrorSpan(`Owner. The ${MIRROR_LEAD}alpha and beta gamma ${DASH} more; ${MIRROR_LEAD}delta ${DASH} end`), "the first mirror span").toBe(
      "alpha and beta gamma",
    );
    expect(mirrorSpan(`The ${MIRROR_LEAD}alpha and beta gamma.`), "a mirror span with no dash terminator reads none").toBe("");
    expect(mirrorSpan(`alpha and beta gamma ${DASH} more`), "a text with no mirror lead reads none").toBe("");
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin.id];
          expect(impl, `no case for ${pin.id}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin.id));
          REACHED.push(pin.id);
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
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(entry => entry.pins.map(pin => pin.id)));
  });
});
