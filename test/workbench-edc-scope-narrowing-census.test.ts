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
 *    fold - the landed wb-pyel.4 vocabulary, its normal form cured in both EDC censuses by wb-a6m9: both folds start from NFKD
 *    (the compatibility mapping of NFKC, left decomposed) with format controls (Cf) and every combining mark (\p{M}: nonspacing,
 *    spacing and enclosing) removed, so a zero-width space never splits a stem, a combining mark never splits a stem or an axis
 *    word whether it is written after its letter or precomposed with it (E + U+0301 + DC and U+00C9 + DC both read EDC, and
 *    pre + U+0301 + cision reads precision), and full-width letters fold; the word fold splits an acronym's plural s, camel
 *    boundaries and every run outside a-z and 0-9). A text is read as the compiler reads it: an identifier's escapes and a
 *    string's or a template's escapes are decoded (\x45DC reads EDC), while a regular-expression literal, JSX text and a JSX
 *    attribute's string are read as written, so an escape or a character reference in them is not decoded (R-ESCAPED). Any
 *    mention reads the adoption PRESENT.
 *  - D, the artifact. THE FORMS (DECLARATION_FORMS; the claim is exactly these seven forms, each pinned by its TRIPLE_CONTROLS
 *    rows): a name-carrying declaration is a node of one of the forms, read by its names -
 *     (1) members: an interface, a type literal or a class (declaration or expression) - its members' written names (properties,
 *         methods and get/set accessors; an index, call or construct signature, a constructor and a static block write none);
 *     (2) object-literal: an object literal - its properties' written names (assignments, shorthands, methods and get/set
 *         accessors; a spread writes none);
 *     (3) enum: an enum - its members' written names;
 *     (4) binding-pattern: an object or array binding pattern, read whole - the property names and bound names of its elements,
 *         through its nested patterns at any depth (an omitted element writes none; a default value is read on its own);
 *     (5) parameters: the parameter list of a function-like node (a function declaration or expression, an arrow function, a
 *         method, a get/set accessor, a constructor, a call, construct, method or index signature, a function or constructor
 *         type), read whole - each parameter's name, and the property names and bound names of a destructured parameter's
 *         elements, through its nested patterns at any depth (constructor parameter properties included; a parameter's type and
 *         default value are read on their own);
 *     (6) literal-union: a union type - its members that are string-literal types (plain or no-substitution template literal
 *         types), each read through any parentheses; a member that is a parenthesized union contributes that union's members the
 *         same way, recursively (a union nested inside any other type, an intersection or a type argument among them, is its
 *         own union);
 *     (7) string-array: an array literal - its string elements (plain or no-substitution template literals), each read through
 *         any nesting of parentheses and as, satisfies, <T> and non-null assertions (a spread writes none).
 *    A written name is an identifier, a private name, or a string or numeric literal; a computed name writes none. Each
 *    declaration is read by its own names: a declaration nested in another (an interface, a type literal, a class, an object
 *    literal, a union or an array literal inside another) is its own declaration and adds no name to the outer one - except the
 *    nested patterns of forms 4 and 5 and the parenthesized union members of form 6 - and a spread or a heritage clause adds no
 *    name to the declaration around it. NO OTHER NODE IS READ FOR THE TRIPLE: every syntactic form outside the seven reads no
 *    name, and each known one is a named residual family with a pinned quiet row (R-PARTIAL, R-COMPOSED, R-SITES, R-VALUES, R-DOC
 *    below); a name read by a form carries an axis only through the word fold, whose known gaps are named the same way
 *    (R-LOOKALIKE, R-VOCABULARY, R-SUFFIXED, R-DIGIT, R-SPLIT).
 *    Each object of each registered descriptor (the native registration and the four injected-client registrations; every
 *    object at any depth by its own keys, so a schema's properties object reads by its property names; a string value is no
 *    key) is read the same way. A declaration or descriptor object carries an axis when one of its names has the axis word, or
 *    its plural (es after a sibilant ending, so freshnesses; s otherwise, so precisions and ceilings), as a word of the word fold
 *    (requestFreshness, result_precision, Ceiling, freshnesses); it carries the triple when it carries all three. Any triple
 *    reads the artifact PRESENT.
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
 *   joined by " and ". THE PARTITIONS (each row's split into pins, read from the bead's text, never from this file's quotes): A's
 *   and D's pins are their labels' clauses and B's pins the acceptance's clauses after its lead (clausesOf: split at "; " and ", "
 *   and before " and " and a parenthetical " (", outside the acceptance's looser list, which keeps its commas), and C's pins are
 *   the mirror span's parts split at " and ". AXES equal the heads of the title's triple, the acceptance's looser list and the
 *   artifact's slash list; CODES equal the acceptance's "clamped or refused"; FORBIDDEN is the acceptance's "never silently
 *   widened"; STEMS are the notes' charter-path initials and modifier. So a row, a pin of A-D, an axis, a code or a stem removed
 *   from every literal of this file and of the roster together still reds, and so does a pin of A-D merged into a sibling pin of
 *   its row in every literal and the roster (the dropped pin's quote folded into the kept pin's quote).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, quotes, constants and every pin's witness are
 *   held to the out-of-file roster (test/fixtures/edc-scope-narrowing-roster.json); the last case reads the vitest task tree (every
 *   registered test, in roster order, in run mode, ran before it) and that every pin reached its witness compare.
 * NOT CLAIMED: a Q pin removed from ROWS, the literal, IMPL, RESIDUALS and the roster together (no surface of the bead anchors the
 *   residual families); git's listing replaced or narrowed, in this file, together with the walk it anchors, by less than the module
 *   floor's margin; a pin's case replaced by one that echoes its roster witness; a capability registered at run time by
 *   any path other than the five registrations read (its literal src declaration is still read by the src walk); the rest of Pi's
 *   grant discipline (role exposure, inspect, observe and control grants) and the curated tools' run-time enforcement of an
 *   accepted bound (the call quota and the serialized byte limits), which their own suites pin; that any future composer is
 *   lawful - only that the falsifier reds the named mutants and accepts the two references.
 * RESIDUALS (named; each with its pinned quiet row): R-LOOKALIKE an EDC stem or an axis word written with a look-alike letter of
 *   another script reads no stem and no axis (Q1); R-PARTIAL a declaration or descriptor object carrying one or two axes of the
 *   triple reads no triple - an unnamed partial surface is not the artifact - the triple split across declarations included (two
 *   declarations; a nested declaration, in a member, an element, an intersection, a type argument or a default value; an object
 *   or array spread; a heritage clause) (Q2); R-VOCABULARY the triple in other words (maxAgeMs, staleness, tolerance, accuracy,
 *   budget, quota, limit, cap, fresh, precise) carries no axis (Q3); R-COMPOSED a computed member name, a stem composed from
 *   parts, and an array element or a union member that is no string literal once its wrappers are read through (a reference to
 *   a constant or a type alias, a concatenation, a conditional, a template literal with substitutions, a tagged template, a
 *   call) are not read (Q4); R-SCOPE modules outside src
 *   (examples/, qa/, test/, scripts/), markdown, and the files below src that are no script module (a .json resource) are read by
 *   neither gate reader (Q5); R-GRID a composer that departs from the law only at requests off the grid's probe points (any
 *   value but half, equal to and twice the bound) reads holds - pinned by one that widens unreported every looser request but
 *   twice the bound, red at 1.5x and 3x probes (Q6); R-STATEFUL a composer
 *   whose answers depend on its call history (lawful for the grid's calls, widening after them) reads holds (Q7); R-SUFFIXED the
 *   acronym run into a lower-case-led suffix (EDCv2, GateEDCv2Client), which the word fold splits before its last letter (ed,
 *   cv2), reads no stem, and an all-capitals axis word run into one (FRESHNESSms) reads no axis (Q8); R-DOTTED a dotted acronym
 *   (E.D.C.), which the word fold reads as single letters, reads no stem (Q9) - both inherited with the landed wb-pyel.4
 *   vocabulary; R-SITES the name sites outside the seven forms - a type parameter list, labeled tuple members, a tuple type's
 *   literal elements, import and export specifier lists, one statement's variable declarations, declarations in separate
 *   statements (a module's or a namespace's top level), an array destructuring assignment's targets, JSX attributes - read no
 *   triple (Q10); R-VALUES the triple written as string values, never names - an object member's values, a call's arguments, case
 *   labels, an enum's initializers, a descriptor's string values (a schema's enum list) - reads no triple (Q11); R-DIGIT a
 *   stem or an axis word run into digits (EDC2, freshness2), one word of the fold, reads no stem and no axis (Q12); R-DOC a
 *   comment, a doc comment included, is never read (Q13); R-SPLIT a stem or an axis word written across a word boundary of the
 *   fold - split by a separator or an inner capital (fresh-ness, preCision, ceil_ing, E-D-C, EdC) - reads no stem and no axis
 *   (Q14); R-ESCAPED (wb-a6m9) a stem spelled through an escape the A reader reads as written - a hex, a unicode or a
 *   code-point escape in a regular-expression literal (/\x45DC/, /\u0045DC/, /\u{45}DC/u) and a decimal or hex character
 *   reference in JSX text or in a JSX attribute's string (&#69;DC, &#x45;DC) - reads no stem, while the plain twin at each site
 *   does (Q15).
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

/** NFKD (the compatibility mapping of NFKC, left decomposed, so a combining mark on a letter drops instead of composing into
 * another letter) with format controls and every combining mark removed (wb-a6m9). */
function normal(text: string): string {
  return text.normalize("NFKD").replace(/[\p{Cf}\p{M}]/gu, "");
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
/** A binding read whole: an identifier's own name, or the property names and bound names of a binding pattern's elements, through
 * its nested patterns at any depth (an omitted element writes none; a default value is not read here). */
function boundNames(name: ts.BindingName): string[] {
  if (ts.isIdentifier(name)) return [name.text];
  const elements: readonly ts.ArrayBindingElement[] = name.elements;
  return elements.flatMap(element => (ts.isBindingElement(element) ? [...writtenName(element.propertyName), ...boundNames(element.name)] : []));
}
/** A type read through any parentheses. */
function unwrapType(type: ts.TypeNode): ts.TypeNode {
  return ts.isParenthesizedTypeNode(type) ? unwrapType(type.type) : type;
}
/** An expression read through any nesting of parentheses and as, satisfies, <T> and non-null assertions. */
function unwrapExpression(expression: ts.Expression): ts.Expression {
  if (
    ts.isParenthesizedExpression(expression) ||
    ts.isAsExpression(expression) ||
    ts.isSatisfiesExpression(expression) ||
    ts.isTypeAssertionExpression(expression) ||
    ts.isNonNullExpression(expression)
  ) {
    return unwrapExpression(expression.expression);
  }
  return expression;
}
/** A union's members that are string-literal types (plain or no-substitution template literal types), each read through any
 * parentheses; a member that is a parenthesized union contributes that union's members the same way, recursively. */
function unionStrings(union: ts.UnionTypeNode): string[] {
  return union.types.flatMap(member => {
    const type = unwrapType(member);
    if (ts.isUnionTypeNode(type)) return unionStrings(type);
    return ts.isLiteralTypeNode(type) && ts.isStringLiteralLike(type.literal) ? [type.literal.text] : [];
  });
}
/** An array literal's string elements (plain or no-substitution template literals), each read through unwrapExpression; a spread
 * writes none. */
function arrayStrings(array: ts.ArrayLiteralExpression): string[] {
  return array.elements.flatMap(element => {
    const expression = unwrapExpression(element);
    return ts.isStringLiteralLike(expression) ? [expression.text] : [];
  });
}
/** A name-carrying declaration's written names, by the seven forms of the header's D reading (DECLARATION_FORMS): (1) an interface, a
 * type literal or a class - its members' names; (2) an object literal - its properties' names; (3) an enum - its members' names;
 * (4) an object or array binding pattern, read whole; (5) a function-like node's parameter list, read whole; (6) a union type's
 * string-literal members, read through parentheses; (7) an array literal's string elements, read through unwrapExpression. Any other
 * node, or a parameter list, union or array that writes no name, is none. */
function memberNames(node: ts.Node): { kind: string; names: string[] } | undefined {
  if (ts.isInterfaceDeclaration(node)) return { kind: "interface", names: node.members.flatMap(member => writtenName(member.name)) };
  if (ts.isTypeLiteralNode(node)) return { kind: "type-literal", names: node.members.flatMap(member => writtenName(member.name)) };
  if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) return { kind: "class", names: node.members.flatMap(member => writtenName(member.name)) };
  if (ts.isObjectLiteralExpression(node)) return { kind: "object-literal", names: node.properties.flatMap(property => writtenName(property.name)) };
  if (ts.isEnumDeclaration(node)) return { kind: "enum", names: node.members.flatMap(member => writtenName(member.name)) };
  if (ts.isObjectBindingPattern(node)) return { kind: "binding-pattern", names: boundNames(node) };
  if (ts.isArrayBindingPattern(node)) return { kind: "array-binding-pattern", names: boundNames(node) };
  const listed = (kind: string, names: string[]): { kind: string; names: string[] } | undefined => (names.length > 0 ? { kind, names } : undefined);
  if (ts.isFunctionLike(node)) return listed("parameters", node.parameters.flatMap(parameter => boundNames(parameter.name)));
  if (ts.isUnionTypeNode(node)) return listed("literal-union", unionStrings(node));
  if (ts.isArrayLiteralExpression(node)) return listed("string-array", arrayStrings(node));
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
 * and strings 120, descriptor objects 24 in each; re-measured for respin 2 on trunk a4cf24c with its readers (forms 4-7 read whole
 * and through wrappers): modules 117, texts 101769, declarations 7840, written names 19361, package.json keys and strings 120,
 * descriptor objects 24 in each. */
const FLOORS = { modules: 100, texts: 60000, declarations: 2500, members: 7000, manifestTexts: 80, descriptorObjects: 16 } as const;
const ZWSP = String.fromCodePoint(0x200b);
/** A Latin word written in full-width letters (the compatibility mapping folds each back to its Latin letter). */
const fullWidth = (word: string): string => [...word].map(letter => String.fromCodePoint((letter.codePointAt(0) ?? 0) + 0xfee0)).join("");
/** The combining-mark controls' marks and letters (wb-a6m9): two nonspacing marks NFKC composes with the letter before them (the
 * acute U+0301, the diaeresis U+0308), a nonspacing mark it composes with none (the combining low line U+0332), a spacing mark
 * (the Devanagari sign visarga U+0903), an enclosing mark (the combining enclosing circle U+20DD), and three precomposed letters
 * NFKD decomposes into a Latin letter and a mark (U+00C9, U+00E9, U+00EF). */
const ACUTE = String.fromCodePoint(0x0301);
const DIAERESIS = String.fromCodePoint(0x0308);
const LOW_LINE = String.fromCodePoint(0x0332);
const VISARGA = String.fromCodePoint(0x0903);
const ENCLOSING_CIRCLE = String.fromCodePoint(0x20dd);
const CAPITAL_E_ACUTE = String.fromCodePoint(0x00c9);
const SMALL_E_ACUTE = String.fromCodePoint(0x00e9);
const SMALL_I_DIAERESIS = String.fromCodePoint(0x00ef);
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
  "combining-mark": `const label = "E${ACUTE}DC scope";`,
  precomposed: `const label = "${CAPITAL_E_ACUTE}DC scope";`,
  "noncomposing-mark": `const label = "E${LOW_LINE}DC scope";`,
  "spacing-mark": `const label = "E${VISARGA}DC scope";`,
  "enclosing-mark": `const label = "E${ENCLOSING_CIRCLE}DC scope";`,
  "joined-mark": `const label = "evide${ACUTE}nce-directed context";`,
  "string-escape": 'const label = "\\x45DC scope";',
  "template-escape": `const label = \`\\x45DC \${name} scope\`;`,
  "identifier-escape": "const \\u0045dcAssembler = 1;",
};
/** Synthetic manifests the adoption reader must read exactly as pinned. */
const MANIFEST_CONTROLS: Readonly<Record<string, string>> = {
  dependency: `{ "name": "x", "dependencies": { "@example/edc": "1.0.0" } }`,
  "dev-dependency": `{ "name": "x", "devDependencies": { "evidence-directed-sdk": "1.0.0" } }`,
  specifier: `{ "name": "x", "dependencies": { "blocks": "npm:edc-assembler@1.0.0" } }`,
  "shadowed-key": `{ "name": "x", "dependencies": { "@example/edc": "1.0.0" }, "dependencies": { "blocks": "1.0.0" } }`,
  clean: `{ "name": "x", "description": "A workflow workbench", "dependencies": { "@example/blocks": "1.0.0" } }`,
};
/** Synthetic modules the artifact reader must read exactly as pinned: every variant of the seven forms the D reading claims, each
 * carrying the triple (DECLARATION_FORMS binds each row to its form). */
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
  "combining-mark": `interface Scope { "fre${ACUTE}shness": number; "pre${ACUTE}cision": number; "ceili${DIAERESIS}ng": number }`,
  precomposed: `interface Scope { "fr${SMALL_E_ACUTE}shness": number; "pr${SMALL_E_ACUTE}cision": number; "ceil${SMALL_I_DIAERESIS}ng": number }`,
  "string-names": `interface Scope { "freshness": number; 'precision': number; ceiling: number }`,
  accessors: "interface Scope { get freshness(): number; set precision(value: number); readonly ceiling: number }",
  "class-accessors": "class Scope { get freshness() { return 1; } set precision(value: number) {} static ceiling = 3; }",
  "class-expression": "const Scope = class { freshness = 1; precision = 2; ceiling = 3; };",
  shorthand: "const scope = { freshness, precision, ceiling };",
  "object-methods": "const scope = { freshness() { return 1; }, get precision() { return 2; }, set ceiling(value: number) {} };",
  "enum-string-names": 'enum Axis { "freshness" = 1, "precision" = 2, "ceiling" = 3 }',
  "binding-declaration": "const { freshness, precision, ceiling } = scope;",
  "binding-renamed": "const { a: freshness, b: precision, c: ceiling } = scope;",
  "binding-properties": "const { freshness: first, precision: second, ceiling: third } = scope;",
  "binding-nested": "const { limits: { freshness }, precision, ceiling } = scope;",
  "array-binding": "const [gateFreshness, gatePrecision, gateCeiling] = [1, 2, 3];",
  "array-binding-defaults": "const [freshness = 1, , precision, ...ceiling] = values;",
  "array-binding-nested": "const [[freshness], { precision }, ceiling] = values;",
  "array-binding-parameter": "function narrow([freshness, precision, ceiling]: readonly number[]) { return freshness + precision + ceiling; }",
  "parameters-destructured": "function narrow({ freshness }: Scope, [precision]: number[], ceiling: number) { return freshness + precision + ceiling; }",
  "arrow-parameters": "const narrow = (freshness: number, precision: number, ceiling: number) => freshness;",
  "function-type": "type Narrow = (freshness: number, precision: number, ceiling: number) => void;",
  "method-signature": "interface Narrower { narrow(freshness: number, precision: number, ceiling: number): void }",
  "function-expression": "const narrow = function (freshness: number, precision: number, ceiling: number) { return freshness; };",
  "class-method": "class Narrower { narrow(freshness: number, precision: number, ceiling: number) { return freshness; } }",
  "setter-pattern": "class Narrower { set scope({ freshness, precision, ceiling }: Limits) {} }",
  "call-signature": "interface Narrow { (freshness: number, precision: number, ceiling: number): void }",
  "construct-signature": "interface NarrowFactory { new (freshness: number, precision: number, ceiling: number): object }",
  "constructor-type": "type NarrowFactory = new (freshness: number, precision: number, ceiling: number) => object;",
  "index-signature": "interface Limits { [freshnessPrecisionCeiling: string]: number }",
  "paren-union": 'type Axis = ("freshness") | ("precision") | ("ceiling");',
  "paren-union-mixed": 'type Axis = "freshness" | ("precision") | `ceiling`;',
  "paren-union-one": 'type Axis = "freshness" | "precision" | ("ceiling");',
  "paren-union-deep": 'type Axis = (("freshness")) | "precision" | "ceiling";',
  "nested-union": 'type Axis = "freshness" | ("precision" | ("ceiling"));',
  "template-array": "const axes = [`freshness`, `precision`, `ceiling`];",
  "array-paren": 'const axes = [("freshness"), ("precision"), ("ceiling")];',
  "array-as": 'const axes = ["freshness" as const, "precision" as const, "ceiling" as const];',
  "array-satisfies": 'const axes = ["freshness" satisfies string, "precision" satisfies string, "ceiling" satisfies string];',
  "array-assertion": 'const axes = [<const>"freshness", <const>"precision", <const>"ceiling"];',
  "array-non-null": 'const axes = ["freshness"!, "precision"!, "ceiling"!];',
  "array-wrapped-deep": 'const axes = [(("freshness" as const)), (<const>"precision")!, ("ceiling" satisfies string)];',
};
/** The D reading's seven forms (the header's list, in order): each form's declaration kinds, and the TRIPLE_CONTROLS rows that pin
 * it - every row pins exactly one form and reads a triple of that form's kind. */
const DECLARATION_FORMS: Readonly<Record<string, { readonly kinds: readonly string[]; readonly controls: readonly string[] }>> = {
  members: {
    kinds: ["interface", "type-literal", "class"],
    controls: [
      "interface",
      "type-literal",
      "class",
      "nested",
      "private-names",
      "methods",
      "plurals",
      "zero-width",
      "full-width",
      "combining-mark",
      "precomposed",
      "string-names",
      "accessors",
      "class-accessors",
      "class-expression",
    ],
  },
  "object-literal": { kinds: ["object-literal"], controls: ["object-literal", "string-keys", "shorthand", "object-methods"] },
  enum: { kinds: ["enum"], controls: ["enum", "enum-string-names"] },
  "binding-pattern": {
    kinds: ["binding-pattern", "array-binding-pattern"],
    controls: [
      "binding-declaration",
      "binding-renamed",
      "binding-properties",
      "binding-nested",
      "array-binding",
      "array-binding-defaults",
      "array-binding-nested",
    ],
  },
  parameters: {
    kinds: ["parameters"],
    controls: [
      "parameters",
      "parameter-properties",
      "binding-pattern",
      "array-binding-parameter",
      "parameters-destructured",
      "arrow-parameters",
      "function-type",
      "method-signature",
      "function-expression",
      "class-method",
      "setter-pattern",
      "call-signature",
      "construct-signature",
      "constructor-type",
      "index-signature",
    ],
  },
  "literal-union": {
    kinds: ["literal-union"],
    controls: ["literal-union", "template-union", "paren-union", "paren-union-mixed", "paren-union-one", "paren-union-deep", "nested-union"],
  },
  "string-array": {
    kinds: ["string-array"],
    controls: ["string-array", "template-array", "array-paren", "array-as", "array-satisfies", "array-assertion", "array-non-null", "array-wrapped-deep"],
  },
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
/** R-LOOKALIKE's axis probe: an axis word with one look-alike letter (the Cyrillic ie for the Latin e), and the Latin letter. */
const LOOKALIKE_TRIPLE = `interface Scope { fr${CYRILLIC_IE}shness: number; precision: number; ceiling: number }`;
/** R-PARTIAL's probes: declarations carrying one or two axes, the triple split across declarations (two, nested, spread, heritage),
 * and the complete control. */
const PARTIAL_CONTROLS: Readonly<Record<string, string>> = {
  "two-of-three": "interface Scope { freshness: number; ceiling: number }",
  "one-of-three": "interface Scope { precision: number }",
  "split-across": "interface A { freshness: number; precision: number } interface B { ceiling: number }",
  "nested-split": "interface Outer { limits: { freshness: number }; precision: number; ceiling: number }",
  "spread-split": "const scope = { ...{ freshness: 1 }, precision: 2, ceiling: 3 };",
  "array-spread-split": 'const axes = [...["freshness", "precision"], "ceiling"];',
  "heritage-split": "interface Base { freshness: number } interface Derived extends Base { precision: number; ceiling: number }",
  "array-nested-split": 'const axes = [["freshness"], "precision", "ceiling"];',
  "union-argument-split": 'type Axis = "freshness" | Array<"precision" | "ceiling">;',
  "union-intersection-split": 'type Axis = "freshness" | (("precision" | "ceiling") & string);',
  "binding-default-split": "const { freshness = { precision: 1, ceiling: 2 } } = scope;",
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
/** R-COMPOSED's element probes: an array element or a union member reached through a reference or an expression; and the plain twin. */
const COMPOSED_ELEMENTS: Readonly<Record<string, string>> = {
  constant: 'const FRESHNESS = "freshness"; const axes = [FRESHNESS, "precision", "ceiling"];',
  "type-alias": 'type Freshness = "freshness"; type Axis = Freshness | "precision" | "ceiling";',
  concatenation: 'const axes = ["fresh" + "ness", "precision", "ceiling"];',
  conditional: 'const axes = [strict ? "freshness" : "staleness", "precision", "ceiling"];',
  "template-substitution": `type Axis = \`\${"fresh"}ness\` | "precision" | "ceiling";`,
  "tagged-template": 'const axes = [raw`freshness`, "precision", "ceiling"];',
  call: 'const axes = [String("freshness"), "precision", "ceiling"];',
  twin: 'const axes = ["freshness", "precision", "ceiling"];',
};
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
/** R-GRID's composer: lawful on the grid, it widens unreported every looser request but one at the grid's looser factor. */
const GRID_EVADER: Composer = (parent, request) => {
  const evading = AXES.filter(axis => {
    const asked = request[axis];
    return asked !== undefined && asked > parent[axis] && asked !== parent[axis] * FACTORS.looser;
  });
  return {
    kind: "scoped",
    scope: adopt(parent, request, evading),
    diagnostics: clamp(parent, request).diagnostics.filter(diagnostic => !evading.includes(diagnostic.axis)),
  };
};
/** R-GRID's requests off the grid, as factors on the parent's bound: one between the bound and the looser factor, one beyond it. */
const EVADER_FACTORS = [1.5, 3] as const;
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
/** R-SUFFIXED's axis probe: all-capitals axis words run into lower-case-led suffixes; and the separated twin. */
const SUFFIXED_TRIPLE = "interface Scope { FRESHNESSms: number; PRECISIONpct: number; CEILINGbytes: number }";
const SUFFIXED_TRIPLE_TWIN = "interface Scope { FRESHNESS_MS: number; PRECISION_PCT: number; CEILING_BYTES: number }";
/** R-DOTTED's probe: the dotted acronym; and its undotted twin. */
const DOTTED_SOURCE = 'export const ASSEMBLY_LABEL = "E.D.C. assembly";';
const DOTTED_TWIN = 'export const ASSEMBLY_LABEL = "EDC assembly";';
/** R-SITES's probes: the name sites outside the seven forms, each carrying the triple; and the twin the reader reads. */
const SITE_CONTROLS: Readonly<Record<string, string>> = {
  "type-parameters": "function narrow<Freshness, Precision, Ceiling>(): void {}",
  "labeled-tuple": "type Scope = [freshness: number, precision: number, ceiling: number];",
  "tuple-literals": 'type Axes = readonly ["freshness", "precision", "ceiling"];',
  "import-specifiers": 'import { freshness, precision, ceiling } from "./scope";',
  "export-specifiers": "export { freshness, precision, ceiling };",
  "variable-list": "const freshness = 1, precision = 2, ceiling = 3;",
  "namespace-members": "namespace Scope { export const freshness = 1; export const precision = 2; export const ceiling = 3; }",
  "module-exports": "export const freshness = 1; export function precision() {} export class Ceiling {}",
  "array-assignment": "[freshness, precision, ceiling] = values;",
  "jsx-attributes.tsx": "const view = <Scope freshness={1} precision={2} ceiling={3} />;",
};
const SITE_TWIN = "interface Scope { freshness: number; precision: number; ceiling: number }";
/** R-VALUES's probes: the triple written as string values, never names; the descriptor's twin is PLANTED_DESCRIPTOR (D1). */
const VALUE_CONTROLS: Readonly<Record<string, string>> = {
  "member-values": 'const names = { a: "freshness", b: "precision", c: "ceiling" };',
  "call-arguments": 'pick("freshness", "precision", "ceiling");',
  "case-labels": 'switch (axis) { case "freshness": case "precision": case "ceiling": break; }',
  "enum-initializers": 'enum Axis { A = "freshness", B = "precision", C = "ceiling" }',
};
const VALUE_DESCRIPTOR: CapabilityDescriptor = {
  ...PLANTED_DESCRIPTOR,
  id: "planted.values.read",
  inputSchema: {
    type: "object",
    properties: { axis: { type: "string", enum: ["freshness", "precision", "ceiling"] } },
    required: ["axis"],
    additionalProperties: false,
  },
};
/** R-DIGIT's probes: an axis word and the word stem run into digits; and their separated twins. */
const DIGIT_TRIPLE = "interface Scope { freshness2: number; precision2: number; ceiling2: number }";
const DIGIT_TRIPLE_TWIN = "interface Scope { freshness_2: number; precision_2: number; ceiling_2: number }";
const DIGIT_SOURCE = 'export const label = "EDC2 assembler"; export const GateEDC2Client = 1;';
const DIGIT_SOURCE_TWIN = 'export const label = "EDC 2 assembler";';
/** R-DOC's probes: the triple and a stem written only in comments, a doc comment included; and the code twin. */
const DOC_SOURCE =
  "/** @property freshness @property precision @property ceiling - an EDC assembly scope */\ntype Scope = Record<string, number>;\n// interface Scope { freshness: number; precision: number; ceiling: number }";
const DOC_TWIN = "interface Scope { freshness: number; precision: number; ceiling: number }";
/** R-SPLIT's probes: axis words and the word stem split by a separator or an inner capital; and their whole twins. */
const SPLIT_NAMES = ["fresh-ness", "preCision", "ceil_ing"] as const;
const SPLIT_TRIPLE = 'interface Scope { "fresh-ness": number; preCision: number; ceil_ing: number }';
const SPLIT_TRIPLE_TWIN = 'interface Scope { "freshness": number; precision: number; ceiling: number }';
const SPLIT_SOURCE = 'export const label = "E-D-C assembly"; export const EdC = 1;';
const SPLIT_SOURCE_TWIN = 'export const label = "EDC assembly";';
/** R-ESCAPED's probes (wb-a6m9): a stem spelled through an escape the A reader reads as written - a hex, a unicode and a
 * code-point escape in a regular-expression literal, and a decimal and a hex character reference in JSX text and one in a JSX
 * attribute's string; and the plain twin at each site. */
const ESCAPED_CONTROLS: Readonly<Record<string, string>> = {
  "regex-hex": "export const pattern = /\\x45DC/;",
  "regex-unicode": "export const pattern = /\\u0045DC/;",
  "regex-code-point": "export const pattern = /\\u{45}DC/u;",
  "jsx-decimal.tsx": "export const view = <span>&#69;DC scope</span>;",
  "jsx-hex.tsx": "export const view = <span>&#x45;DC scope</span>;",
  "jsx-attribute.tsx": 'export const view = <span title="&#69;DC scope">view</span>;',
};
const ESCAPED_TWINS: Readonly<Record<string, string>> = {
  regex: "export const pattern = /EDC/;",
  "jsx.tsx": "export const view = <span>EDC scope</span>;",
  "jsx-attribute.tsx": 'export const view = <span title="EDC scope">view</span>;',
};
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
  "R-SITES": ["Q10"],
  "R-VALUES": ["Q11"],
  "R-DIGIT": ["Q12"],
  "R-DOC": ["Q13"],
  "R-SPLIT": ["Q14"],
  "R-ESCAPED": ["Q15"],
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
    declarationForms: DECLARATION_FORMS,
    planted: PLANTED_DESCRIPTOR,
    lookalike: LOOKALIKE_PROBES,
    lookalikeTriple: LOOKALIKE_TRIPLE,
    partialControls: PARTIAL_CONTROLS,
    partialDescriptor: PARTIAL_DESCRIPTOR,
    vocabularyControls: VOCABULARY_CONTROLS,
    composed: [COMPOSED_DECLARATION, COMPOSED_SOURCE],
    composedElements: COMPOSED_ELEMENTS,
    outOfScope: OUT_OF_SCOPE,
    outOfScopeModule: OUT_OF_SCOPE_MODULE,
    evaderFactors: EVADER_FACTORS,
    suffixed: [SUFFIXED_SOURCE, SUFFIXED_TWIN],
    suffixedTriple: [SUFFIXED_TRIPLE, SUFFIXED_TRIPLE_TWIN],
    dotted: [DOTTED_SOURCE, DOTTED_TWIN],
    siteControls: SITE_CONTROLS,
    siteTwin: SITE_TWIN,
    valueControls: VALUE_CONTROLS,
    valueDescriptor: VALUE_DESCRIPTOR,
    digit: [DIGIT_TRIPLE, DIGIT_TRIPLE_TWIN, DIGIT_SOURCE, DIGIT_SOURCE_TWIN],
    doc: [DOC_SOURCE, DOC_TWIN],
    split: [...SPLIT_NAMES, SPLIT_TRIPLE, SPLIT_TRIPLE_TWIN, SPLIT_SOURCE, SPLIT_SOURCE_TWIN],
    escaped: ESCAPED_CONTROLS,
    escapedTwins: ESCAPED_TWINS,
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
/** The acceptance's looser span: the words after "looser " up to " than ", or none. */
function looserSpan(acceptance: string): string {
  return /looser (.+?) than /.exec(acceptance)?.[1] ?? "";
}
/** The acceptance's looser list: its looser span split at ", " and " or ". */
function looserList(acceptance: string): string[] {
  const span = looserSpan(acceptance);
  return span === "" ? [] : span.split(/, | or /);
}
/** A text's clauses, in order (a row's partition into pins): the text without its trailing separators, split at "; " and ", " and
 * before " and " and a parenthetical " (" - a conjunction or a parenthesis opens its clause - except inside a kept span (an
 * enumeration such as the acceptance's looser list keeps its commas). */
function clausesOf(text: string, kept: readonly string[]): string[] {
  const body = text.replace(/[\s,;.:]+$/, "");
  const spans = kept.flatMap(span => {
    const at = span === "" ? -1 : body.indexOf(span);
    return at === -1 ? [] : [{ start: at, end: at + span.length }];
  });
  const clauses: string[] = [];
  let start = 0;
  for (let index = 0; index < body.length; index += 1) {
    if (spans.some(span => index >= span.start && index < span.end)) continue;
    const dropped = body.startsWith("; ", index) || body.startsWith(", ", index);
    const opened = body.startsWith(" and ", index) || body.startsWith(" (", index);
    if (!dropped && !opened) continue;
    clauses.push(body.slice(start, index));
    start = index + (dropped ? 2 : 1);
  }
  clauses.push(body.slice(start));
  return clauses.filter(clause => clause !== "");
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
    const sources = Object.fromEntries(Object.entries(TRIPLE_CONTROLS).map(([name, text]) => [name, readModule(text, name).triples]));
    const formed = Object.values(DECLARATION_FORMS).flatMap(form => form.controls);
    expect([...formed].sort(), "every TRIPLE_CONTROLS row pins exactly one of the seven forms").toEqual(Object.keys(TRIPLE_CONTROLS).sort());
    expect(
      Object.entries(DECLARATION_FORMS).filter(([, form]) => form.controls.length === 0).map(([name]) => name),
      "every form is pinned by a control",
    ).toEqual([]);
    for (const [form, { kinds, controls }] of Object.entries(DECLARATION_FORMS)) {
      for (const control of controls) {
        expect((sources[control] ?? []).some(triple => kinds.includes(triple.split("|")[1] ?? "")), `${control} reads a ${form} triple`).toBe(true);
      }
    }
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
        sources,
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
    expect(LOOKALIKE_TRIPLE.includes(CYRILLIC_IE), "the axis probe carries its look-alike").toBe(true);
    return json({
      lookalike: LOOKALIKE_PROBES.map(probe => stemsIn(probe.text)),
      repaired: LOOKALIKE_PROBES.map(probe => stemsIn(probe.text.split(probe.lookalike).join(probe.latin))),
      triple: {
        axes: axesOf([`fr${CYRILLIC_IE}shness`]),
        lookalike: readModule(LOOKALIKE_TRIPLE, "lookalike-triple").triples,
        repaired: readModule(LOOKALIKE_TRIPLE.split(CYRILLIC_IE).join("e"), "repaired-triple").triples,
      },
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
      elements: Object.fromEntries(Object.entries(COMPOSED_ELEMENTS).map(([name, text]) => [name, readModule(text, name).triples])),
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
    const offGrid: Probe[] = EVADER_FACTORS.map(factor => ({ name: `ceiling:x${factor}`, request: { ceiling: PARENT.ceiling * factor } }));
    return json({
      grid: falsify(GRID_EVADER),
      offGrid: offGrid.map(probe => judge(probe, GRID_EVADER(Object.freeze({ ...PARENT }), Object.freeze({ ...probe.request })))),
    });
  },
  Q7: async () => {
    const composer = statefulComposer(PROBES.length);
    const first = falsify(composer);
    const second = falsify(composer);
    return json({ first: first.verdict, second: second.verdict, secondClasses: classesOf(second), secondViolations: second.violations.length });
  },
  Q8: async () =>
    json({
      suffixed: readModule(SUFFIXED_SOURCE, "suffixed").mentions,
      twin: readModule(SUFFIXED_TWIN, "suffixed-twin").mentions,
      axes: axesOf(["FRESHNESSms", "PRECISIONpct", "CEILINGbytes"]),
      triple: readModule(SUFFIXED_TRIPLE, "suffixed-triple").triples,
      tripleTwin: readModule(SUFFIXED_TRIPLE_TWIN, "suffixed-triple-twin").triples,
    }),
  Q9: async () => json({ dotted: readModule(DOTTED_SOURCE, "dotted").mentions, twin: readModule(DOTTED_TWIN, "dotted-twin").mentions }),
  Q10: async () =>
    json({
      sites: Object.fromEntries(Object.entries(SITE_CONTROLS).map(([name, text]) => [name, readModule(text, name).triples])),
      twin: readModule(SITE_TWIN, "site-twin").triples,
    }),
  Q11: async () =>
    json({
      values: Object.fromEntries(Object.entries(VALUE_CONTROLS).map(([name, text]) => [name, readModule(text, name).triples])),
      descriptor: registryReading(plantedRegistry(VALUE_DESCRIPTOR)).triples,
      twin: registryReading(plantedRegistry(PLANTED_DESCRIPTOR)).triples,
    }),
  Q12: async () =>
    json({
      axes: axesOf(["freshness2", "precision2", "ceiling2"]),
      triple: readModule(DIGIT_TRIPLE, "digit-triple").triples,
      tripleTwin: readModule(DIGIT_TRIPLE_TWIN, "digit-triple-twin").triples,
      source: readModule(DIGIT_SOURCE, "digit-source").mentions,
      sourceTwin: readModule(DIGIT_SOURCE_TWIN, "digit-source-twin").mentions,
    }),
  Q13: async () => {
    const doc = readModule(DOC_SOURCE, "doc");
    return json({ triples: doc.triples, mentions: doc.mentions, twin: readModule(DOC_TWIN, "doc-twin").triples });
  },
  Q14: async () =>
    json({
      axes: axesOf(SPLIT_NAMES),
      triple: readModule(SPLIT_TRIPLE, "split-triple").triples,
      tripleTwin: readModule(SPLIT_TRIPLE_TWIN, "split-triple-twin").triples,
      source: readModule(SPLIT_SOURCE, "split-source").mentions,
      sourceTwin: readModule(SPLIT_SOURCE_TWIN, "split-source-twin").mentions,
    }),
  Q15: async () =>
    json({
      escaped: Object.fromEntries(Object.entries(ESCAPED_CONTROLS).map(([name, text]) => [name, readModule(text, name).mentions])),
      twins: Object.fromEntries(Object.entries(ESCAPED_TWINS).map(([name, text]) => [name, readModule(text, name).mentions])),
    }),
};

describe("wb-pyel.6 EDC scope-narrowing census (SDK-EVIDENCE-DIRECTED-COMPUTATION-R14, until-then leg, falsifier armed)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's title, acceptance and notes, and the cases agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:1", "B:4", "C:2", "D:2", "Q:15"]);
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
    // The partitions: each row's split into pins is the bead text's own, so a pin merged into a sibling (its quote folded in) reds.
    expect(quotes("A"), "A's pins are its label's clauses").toEqual(clausesOf(row("A").label, []));
    expect(quotes("B"), "B's pins are the acceptance's clauses after its lead, its looser list kept whole").toEqual(
      clausesOf(acceptance.slice(ACCEPTANCE_LEAD.length), [looserSpan(acceptance)]),
    );
    expect(quotes("C"), "C's pins are the mirror span's parts, split at ' and '").toEqual(mirrorSpan(notes).split(" and "));
    expect(quotes("D"), "D's pins are its label's clauses").toEqual(clausesOf(row("D").label, []));
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
    expect(looserSpan("asks looser one, two or three than its parent"), "a looser span").toBe("one, two or three");
    expect(clausesOf("a b and c d, e; f (g h).", []), "clauses split at '; ' and ', ' and before ' and ' and ' ('").toEqual(["a b", "and c d", "e", "f", "(g h)"]);
    expect(clausesOf("x asks one, two or three then y, z", ["one, two or three"]), "a kept span keeps its commas").toEqual(["x asks one, two or three then y", "z"]);
    expect(clausesOf("one clause: no boundary", []), "a text with no boundary is one clause").toEqual(["one clause: no boundary"]);
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
