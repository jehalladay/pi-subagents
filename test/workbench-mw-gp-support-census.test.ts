/**
 * wb-e66.1 (MW-GRAPH-POLICY-COORDINATION-R2, program-triage-2026-10-18), the pre-sampling support census.
 * Statement (bead title, verbatim): "Gate as R1. Before any sampling the Pi-side adapter shall enumerate the finite typed
 * legal PRE-SAMPLING support from hard known capacity and the registry grants in force and export it as the bounded
 * role-aware GraphDataIR; it shall never derive that support from mw.training-export.v1 post-proposal admission or reconcile
 * verdicts; a candidate outside the support is a typed refusal."
 * Acceptance (owner filing, verbatim; the labels of rows A1-A4): "a fixture with N agents, per-agent capacity and grants
 * yields a support set equal to exactly the legal (agent, task) pairs; a fixture that feeds an admission/reconcile record as
 * the support goes red with a typed refusal; the exported IR carries the support's basis revision and count; test-only until
 * the gate, src untouched." The statement's last clause is row A5's label. The filing: "Zero Pi change owed until the
 * conjoint gate (GP shadow-mode adapter + Pi hosting) fires."
 *
 * MEASURED (read-only, by the seat of cut #3, 2026-10-28, at trunk 014d116 merged into the branch and again at c843ed5,
 * whose deltas from cut #2's trunk 5fbe25e hold no src or docs path). Producer (the local MechanicalWorkflows checkout,
 * git show at the bead's pin 4b8b974ca72bf2ed36b99e315e45857c6181fbe8; the roster's producer block holds the four cited
 * lines and their blobs, re-read equal at cut #3, and this census never re-reads the producer):
 * docs/programs/graph-policy-coordination-2026-10-18.md (blob 01ff00d480ec) :8 ends "and does not reinterpret
 * mw.training-export.v1 post-proposal admission as the policy's pre-sampling eligible support." and :12 reads "2. A
 * trusted adapter enumerates a finite, typed, legal **pre-sampling** assignment support under hard known
 * capacity/permissions, and exports a bounded role-aware GraphDataIR."; its README.md (blob 0dbff582a14c) :9 opens the
 * host's flow "Host: obtain bounded typed graph and **pre-sampling** legal candidates" and :15 holds "Post-proposal
 * admission is **not** original sampler support." Pi: git's src listing holds 117 files, all .ts, and the vocabulary
 * reader below reads none of them. The filing's other two search words are Pi's own words with other meanings:
 * "capacity" in src/ui/workflow-dialog.ts, src/ui/workflow-inspector.ts and src/workbench/claude-control-observer.ts,
 * "eligible" in src/agent-manager.ts, src/ui/agent-widget.ts and src/workflow/journal-compat.ts. docs/workbench/06 is
 * byte-identical at the filing pin 758ec18187a5, at 014d116 and at c843ed5 (git diff --quiet rc 0); its :5, :15 and :73
 * are the filing's citations, and the routing-hint sentence the filing paraphrases is its :28. No src module names the
 * vocabulary: the gate has not fired.
 * MEASURED (by the wb-lmme seat, 2026-10-30, at trunk 577493f, with a throwaway probe file run under this repo's vitest and
 * removed): vitest's assertion count (expect.getState().assertionCalls) grows by one per expect() call - a bare expect()
 * with no matcher included, and by one, not two, for an expect() call a matcher completes - and not at all for chai's
 * assert (assert.ok, assert.deepEqual).
 * FOLLOW-UP wb-lmme (the R694 carry of landing 660, gate cmd_f8015b42a20b; F1 leads, F2 and F3 ride): A4b's witness carries
 * unread, the echo guard states its count in the measured vocabulary, and NOT CLAIMED names the changes that keep the count
 * (F1); the empty-support case's a-near and the grant-matching mutants M23-M29 put grant matching looser than exact
 * equality by the seven NEAR_GRANTS kinds in reach of S1's parity and K-LEGAL (F2); NOT CLAIMED names the runner's own
 * use of the copy and the floor (F3).
 * FOLLOW-UP wb-s51u (the R694 carry of landing 707, gate cmd_f38c2660edc1; F1 leads, F2 rides): A1b ties each
 * grant-matching mutant's matcher to its declared kind (one mutant per NEAR_GRANTS kind, and each matcher accepts every
 * near grant of its declared kind), and A1b's witness carries what each matcher accepts, derived from NEAR_GRANTS and the
 * registry's catalog: the kinds, and each near grant with the required grants it stands in for. M29's containment accepts
 * the padded grants beside the longer ones; THE CHECKS and the LOOSE_MATCHING texts say what each matcher accepts (F1).
 * The wb-lmme FOLLOW-UP line is scoped to the seven NEAR_GRANTS kinds (F2).
 *
 * READINGS.
 * - THE MODEL (this file; test-only, src untouched): a pre-sampling basis (a revision, agents with a capacity and grants,
 *   tasks with a capability and a load) or a post-proposal record (an mw.training-export.v1 admission or a reconcile
 *   verdict, each naming the pairs it admitted). A pair (agent, task) is legal when the agent's capacity is hard known (a
 *   non-negative safe integer), the task's load fits it, and the registry grants the agent invocation of the task's
 *   capability: every explicit permission of the registered descriptor, or exact invoke:<id> when it requires none
 *   (docs/workbench/06 "Current experimental policy surface"; the invoke-grants case's agent holds exact invoke:<id> for
 *   every fixture capability and its only legal pair is the one whose capability requires no permission, as the registry's
 *   own decisions in S1 give it); an unregistered capability is never legal. The empty-support case's a-near (capacity 5,
 *   so every task's load fits) holds only NEAR_GRANTS, each a near miss of a required grant (fixture:read, fixture:write or
 *   the open capability's exact invoke:fixture.support-open) by prefix, suffix, case, padding, a trailing wildcard, a
 *   compatibility (NFKC) spelling or a longer grant containing it, and no required grant itself, so the registry refuses it
 *   every task and it holds no legal pair (S1, A1b). capacityKind splits capacities into eight kinds: unknown (the
 *   "unknown" marker), not-a-number (NaN), unbounded, fraction, unsafe (an integer past the safe range), negative, zero and
 *   known; the fixtures hold an agent of every kind, and each fixture agent's capacity is hard known exactly when its kind
 *   is zero or known (A1a). The registry is the real src CapabilityRegistry holding four fixture capabilities: its
 *   catalogSnapshot is the catalog an adapter reads, and its invoke is the oracle rows S and P hold the reading to.
 * - THE REFERENCE adapter: a pre-sampling basis yields the IR {basisRevision, count, pairs} of exactly its legal pairs; any
 *   other source is the typed refusal {ok: false, code: "support-source", source: <its kind>}; a candidate outside the IR's
 *   pairs is the typed refusal {admitted: false, code: "outside-support", agent, task}, and one inside is {admitted: true}.
 * - THE CHECKS (judged by value): K-LEGAL (each case's support equals its hand-authored legal pairs exactly, no pair twice),
 *   K-SOURCE (each post-proposal record is the typed refusal), K-IR (each IR's basisRevision is its basis's revision and
 *   its count its pair count), K-OUTSIDE (every candidate of the agent x task grid, plus a ghost agent and a ghost task, is
 *   admitted exactly when inside the support and refused typed otherwise). MUTANTS: 29 adapters, each refused by exactly
 *   its declared checks, and every check refuses one alone. M23-M29 (LOOSE_MATCHING) loosen the reference's exact grant
 *   matching, one per NEAR_GRANTS kind in NEAR_GRANTS order, each built for its declared kind: its matcher accepts every
 *   near grant of that kind. A1b pins, derived from NEAR_GRANTS and the registry's catalog, every kind and every near grant
 *   each matcher accepts, with the required grants each near grant stands in for: M23-M28 accept their declared kind's near
 *   grants and no other, and M29's containment, built for the longer grants, also accepts the padded ones. Each gains
 *   a-near a pair through an explicit permission and through the open capability's exact invoke:<id> (A1b).
 * - THE ARMED REGISTRATIONS (SITES, empty today): a src module that names the vocabulary must register its adapter there,
 *   and every check then judges it beside the reference; an unregistered naming module, a stale registration and a duplicate
 *   are findings.
 * - THE SRC READING (row A4): every path git lists under src/ (tracked, plus untracked files git does not ignore), each a
 *   regular file read as text; a listed path that is not a regular file is a finding, never skipped. A vocabulary word
 *   (sampler, training-export, GraphDataIR, PRE-SAMPLING) is read case-insensitively anywhere in the path or the text: its
 *   parts in order, with any run of these separators between them - whitespace (the regex class \s), a full stop (U+002E),
 *   a low line (U+005F), a dash (Unicode category Pd, which holds the hyphen-minus, U+2010 HYPHEN, U+2011 NON-BREAKING
 *   HYPHEN and the en dash) or a format character (Cf). A spelling's parts are its words split at whitespace, full stops, low
 *   lines and hyphen-minus, then at camel humps (GraphDataIR is graph, data, ir). A4b's controls read every separator kind.
 * - THE DOCS ANCHORS (row S): each docs/workbench/06 line row S reads (:5, :15, :28 and :73) is read at the filing pin and
 *   in the live page. At the pin, the line holds the row's text and the text stands nowhere else in the page. Both pages
 *   are read in the rendered view (test/helpers/census.ts docsSection, marked's lexer: markup and HTML comments render no
 *   text), where the line's level-2 section is bound once under the page's title and runs to the next level-1 or 2 heading
 *   or EOF: at the pin the section is HTML-free and renders the text in exactly one block, and the live section renders
 *   exactly the pinned section's blocks and carries no HTML (sectionMatches: slice equality, never includes-anywhere). The
 *   first cut's reading, the pinned line standing whole in the live page's raw text, is kept as a further conjunct. Each
 *   line's anchor is also read under five controls, and none leaves it holding: four edits of the live page (the line
 *   deleted, the line edited, the line wrapped in an HTML comment, the line moved under a new trailing section) and the
 *   text read at the pinned page's next line. The comment and the move keep the raw line whole, so only the section reading
 *   refuses them.
 * - THE ECHO GUARD (the runner, never the case). The suite parses the roster file once, inside its own callback, into a
 *   view whose witnesses are sealed (sealedRoster): a property get or a property descriptor taken through them
 *   (Object.keys and Object.entries take one per key) throws, except inside the suite's read (readWitnesses: the
 *   runner's witness compare and the roster case's key read; neither calls a case, though a builtin a case patched runs
 *   inside them, under NOT CLAIMED), and no unsealed copy of the witnesses is kept. Every pin's case is declared
 *   outside the suite (IMPL), so a case that names the roster or its read throws a ReferenceError when it runs, or at
 *   module load if it reads the name there. The runner copies a case's returned value (copyOf, a JSON round trip) while
 *   the witnesses are sealed, so a read deferred into that value (a getter or toJSON) throws too. The assertions a case
 *   makes are read as the growth of vitest's assertion count (expect.getState().assertionCalls) across its run (one per
 *   expect() call, as MEASURED: a matcher adds nothing and chai's assert counts nothing) and must number at least OWN_FLOOR
 *   (one); after the witness compare the runner records the pin's assertion count, and the last case holds those counts, in
 *   row order, to the roster's. So these each red: a case that reads its roster witness through the view, by name or
 *   deferred into its returned value; a case whose run leaves vitest's count unmoved (it returns a witness, copied or not,
 *   without asserting); and a case that gains or loses an expect() call, writing no count of its own, while the roster's
 *   counts stand. A4b's witness carries unread, so beside a listed src path that is not a regular file A4b's witness
 *   compare reds even with the matcher of its unread assertion dropped. The roster case reads the seal (a get and a
 *   descriptor read inside a case, a get outside any case, a read deferred into a toJSON) and the floor on probes. What the
 *   guard does not bind is under NOT CLAIMED.
 *
 * ROWS. A1-A4, the acceptance's four clauses; A5, the statement's last clause; S, the filing's authority slice (the registry
 * authorizes: the reference's permission bit is the registry's dispatch decision for every agent and task, and the
 * registry's own decisions under hard known capacity give each case's legal pairs; effectClass is a routing hint: rotating
 * every fixture's effect class changes no decision and no support; a read-only agent that knows a write capability's id is
 * refused it and holds no pair on it), each pin with its docs anchors; P, the parity rule (every support pair is one the
 * registry permits, so the support only narrows the registry decision; wb-6hb.4 is closed in the tracker export and its
 * parity test keeps the narrowing sentence); Q, the residuals' pinned quiet rows.
 * RESIDUALS (named families, each member a pinned quiet row; a reading that starts reading a member reds its row):
 * R-COMPOSED (Q1, eight members: a word whose parts are split by something other than the reading's separators - an
 * operator, a comment, a quote, a slash, a middle dot, a minus sign (U+2212, Sm) - or that is escaped, spelled with a
 * homoglyph or joined at run time),
 * R-SHARED-WORD (Q2: the filing's search words "capacity" and "eligible", Pi words with other meanings), R-UNNAMED-ADAPTER
 * (Q3: an enumerator whose path and text name no vocabulary word: what a support enumeration means without the words is
 * outside a text reading) and R-JOINT-CAPACITY (Q4: the support is per pair; three load-1 pairs of one capacity-2 agent all
 * stand in it, since joint capacity across one agent's pairs is the selector's duty, R3 = wb-e66.2).
 * NOT CLAIMED: the bounded, role-aware GraphDataIR schema (node and edge kinds, roles, the bound), design-only at the
 * producer pin (the census pins the acceptance's two IR fields, the basis revision and the count); provider-specific
 * resource scope (docs/workbench/06: enforced by native adapters and host wiring); grant expiry or revocation (the grants
 * "in force" are the ones a basis carries; docs/workbench/06 names no expired-token service); the host's configured grants
 * (workbench.capabilityGrants) and its registry wiring (an adapter here reads a registry this file builds); the authority
 * sentence's first clause (the support is the host adapter's duty, never GP's and never MW reconcile's: A2 judges the
 * reconcile half, and the GP half has no Pi subject before the gate); that a producer line reads the same past the pin; the
 * producer block's line texts beyond the two quotes the source citations carry (the seats read them equal at the pin; the
 * census never re-reads the producer); that R-COMPOSED's eight members exhaust the ways a text reading misses a word; that
 * a grant matching looser than exact equality is seen when no NEAR_GRANTS entry exercises it (NEAR_GRANTS are fixtures, not
 * an enumeration of loose matchings); that a grant-matching mutant's matcher traded for another that accepts the same near
 * grants for the same required grants is seen (A1b pins what a matcher accepts over NEAR_GRANTS, never the matcher itself).
 * Nor does it claim that these removals red when made in every literal of this file and
 * the roster together (the self-anchored CT6 / 6ze.39 class): row Q (its label, its pins Q1-Q4, its residual families and
 * their members), which no source outside this file names; a pin merge (a pin's case deleted and its quote re-homed into a
 * neighbouring pin of its row), since the row still tiles its label, so the deleted case's checks (such as A4b's src floor
 * or S2's effect-class rotation) are held by no anchor outside this file; the :28 docs line's own entry and reading (not a
 * citation; the section equality of :15, which shares its section, still holds its text); a docs line's text cut to another
 * substring that stands once in the pinned page (the text only finds the line); a case, a record, a mutant, a near grant, a
 * residual member, a capacity kind or a vocabulary control; and a case's assertions changed together with the roster's
 * count. Nor that vitest's count sees a change that keeps it: a matcher dropped from its expect() call, an expect() call
 * traded for another, or a chai assert gained or lost; the witness compare still judges what such a change stops judging
 * wherever the case's witness carries it (A4b's carries unread). Nor does it claim the echo guard against a case that
 * returns its pin's roster witness obtained by a route that does not read the suite's view - the roster file read again
 * (fs, an import, or sealedRoster called on a fresh parse) or the witness pasted as a literal - while it makes assertions
 * of its own (padded) or writes vitest's assertion count itself (expect.setState, or any route to vitest's matcher state);
 * such a case stands in for its pin's case, so the pin's subject is read by nothing (beside a live plant the unmodified
 * census reds, such as a src module naming the vocabulary or a docs/workbench/06 line wrapped in an HTML comment, it stays
 * green). Nor against a case that patches a global, a builtin or a vitest API the census or the runner calls (Proxy,
 * Reflect, JSON, Array.prototype, expect's matchers or state) to obtain a witness or to pass its compare. Nor that a change
 * to the guard's own code reds: the roster or its read declared where a case can name them (no probe reads their scope); a
 * trap, the copy or the floor hollowed together with the probe that reads it; or the runner's own use of the copy or the
 * floor changed (such as the copy taken inside the read window or the floor compared at zero): the roster case's probes
 * read the traps, copyOf and OWN_FLOOR with runCase's count, never the runner's call sites.
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS, one quote and one case per
 * pin in row order, and as literals the shape of the capabilities, the tasks, the cases, the records, the mutants, the
 * near grants and the grant-matching mutants' kinds, the residual families and members, the vocabulary, the shared words,
 * the docs lines, the capacity kinds and the registrations. The out-of-file roster test/fixtures/mw-gp-support-roster.json
 * holds the rows (id, label, pins), the quotes, the residual members, the mutants with their declared checks, every pin's
 * witness and assertion count, and every registered test title; each is compared by equality and in order (keys included).
 * The cases and the records reach the roster through the pins' witnesses.
 * OUTSIDE ANCHORS (their own registered case): the bead's own row in the tracker export (.beads/issues.jsonl). The title
 * opens with the requirement id and the gate; each acceptance clause is exactly one of rows A1-A4's labels, A5's label ends
 * the statement, rows S and P are the authority sentence's slices, and the pin quotes of each of rows A1-A5, S and P tile
 * that row's label with nothing but separators between them; the cited docs/workbench/06 lines (:5, :15, :73) and the
 * filing pin are the authority citation's; the shared words and V1-V3 are the filing's search words, in order, V4 is the
 * statement's word, and the filing names every vocabulary word; the producer block's paths, lines and pin are the source
 * citations' (the pin is also PRODUCER_PIN), and it carries their two quotes. So, made in every literal of this file and
 * the roster together, each of these removals still reds through the export: one of rows A1-A5, S and P; its label, or a
 * word of it; a pin of one of those rows whose quote is not re-homed (the row's quotes stop tiling its label); a cited docs
 * line; a vocabulary word or a shared word; a producer line.
 * The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it), REACHED
 * (every pin reached its witness compare, and each compare's own result) and the recorded assertion counts.
 *
 * Display paths added: none. Test-only: no src change, no GraphPolicyCLI adapter, sampler, seam or fake binary.
 */
import { execFileSync } from "node:child_process";
import { lstatSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { afterAll, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, type CapabilityErrorCategory, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { docsSection, type RenderedBlock, sectionMatches } from "./helpers/census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-e66.1";
const REQUIREMENT = "MW-GRAPH-POLICY-COORDINATION-R2";
const SUITE = `mw gp pre-sampling support census (${BEAD}, ${REQUIREMENT})`;
const ROSTER_PATH = "test/fixtures/mw-gp-support-roster.json";
const EXPORT = ".beads/issues.jsonl";
/** The filing's Pi pin (docs/workbench/06's cited lines) and the producer pin (the program's cited lines). */
const FILING_PIN = "758ec18187a5d66ba40b766caad38754b5313558";
const PRODUCER_PIN = "4b8b974ca72bf2ed36b99e315e45857c6181fbe8";
const DOCS_06 = "docs/workbench/06-capability-registry.md";
const PARITY_TEST = "test/workbench-capability-surface-parity.test.ts";
const PARITY_BEAD = "wb-6hb.4";
/** The parity test's narrowing sentence, as its header line 12 holds it. */
const PARITY_SENTENCE = "surface may only NARROW the oracle's decision";
/** src holds well over this many files; fewer means the listing read nothing. */
const SRC_FLOOR = 100;
/** A src module the listing must read, with a line it must hold: the registry this census's permission side is held to. */
const SRC_ANCHOR = { path: "src/workbench/capability-registry.ts", token: "Explicit grants are required for *both* discovery and invocation." };
const LIVE_BUDGET_MS = 60_000;

// ---- the model ----

type Capacity = number | "unknown";
interface Agent {
  readonly id: string;
  readonly capacity: Capacity;
  readonly grants: readonly string[];
}
interface Task {
  readonly id: string;
  readonly capability: string;
  readonly load: number;
}
interface Basis {
  readonly kind: "pre-sampling";
  readonly revision: string;
  readonly agents: readonly Agent[];
  readonly tasks: readonly Task[];
}
interface Pair {
  readonly agent: string;
  readonly task: string;
}
/** A post-proposal record: an mw.training-export.v1 admission or a reconcile verdict, each naming the pairs it admitted. */
interface PostProposal {
  readonly kind: "mw.training-export.v1" | "reconcile-verdict";
  readonly revision: string;
  readonly admitted: readonly Pair[];
}
type Source = Basis | PostProposal;
interface SupportIR {
  readonly basisRevision: string;
  readonly count: number;
  readonly pairs: readonly Pair[];
}
/** An adapter's answer for a source: a support IR, or a refusal (judged by value: the typed one is code support-source naming the source's kind). */
type Enumerated = { readonly ok: true; readonly ir: SupportIR } | { readonly ok: false; readonly code: string; readonly source: string };
/** An adapter's answer for a candidate (judged by value: the typed refusal is code outside-support naming the candidate). */
type Admission = { readonly admitted: true } | { readonly admitted: false; readonly code?: string; readonly agent?: string; readonly task?: string };
type EffectClass = CapabilityDescriptor["effectClass"];
/** What an adapter reads of the registry: a capability's registered permissions and effect class (undefined: not registered). */
interface Catalog {
  readonly permissions: (capability: string) => readonly string[] | undefined;
  readonly effectClass: (capability: string) => EffectClass | undefined;
}
interface Adapter {
  readonly enumerate: (source: Source, catalog: Catalog) => Enumerated;
  readonly admit: (ir: SupportIR, candidate: Pair) => Admission;
}

// ---- the fixture registry (the real src CapabilityRegistry) ----

interface FixtureCapability {
  readonly id: string;
  readonly effectClass: EffectClass;
  readonly permissions: readonly string[];
}
const CAPABILITIES: readonly FixtureCapability[] = [
  { id: "fixture.support-read", effectClass: "read", permissions: ["fixture:read"] },
  { id: "fixture.support-write", effectClass: "write", permissions: ["fixture:write"] },
  { id: "fixture.support-open", effectClass: "read", permissions: [] },
  { id: "fixture.support-dual", effectClass: "external", permissions: ["fixture:read", "fixture:write"] },
];
/** Registered nowhere: a task naming it is never legal. */
const UNREGISTERED = "fixture.support-missing";
const TASKS: readonly Task[] = [
  { id: "t-read", capability: "fixture.support-read", load: 1 },
  { id: "t-write", capability: "fixture.support-write", load: 2 },
  { id: "t-open", capability: "fixture.support-open", load: 1 },
  { id: "t-dual", capability: "fixture.support-dual", load: 3 },
  { id: "t-missing", capability: UNREGISTERED, load: 1 },
];

interface FixtureRegistry {
  readonly registry: CapabilityRegistry;
  /** Every invocation that reached a provider: the capability and the grants it ran under. */
  readonly calls: string[];
}
/** A real CapabilityRegistry holding the fixture capabilities, each provider recording the calls that reach it; effect classes optionally rotated. */
function fixtureRegistry(effectOf: (capability: FixtureCapability) => EffectClass = capability => capability.effectClass): FixtureRegistry {
  const registry = new CapabilityRegistry();
  const calls: string[] = [];
  for (const capability of CAPABILITIES) {
    registry.register({
      descriptor: {
        id: capability.id,
        version: "1.0.0",
        description: `wb-e66.1 fixture ${capability.id}`,
        inputSchema: { type: "object" },
        effectClass: effectOf(capability),
        permissions: [...capability.permissions],
        supportedModes: ["invoke"],
      },
      invoke: async (_input, context) => {
        calls.push(`${capability.id} ${context.grants.join(",")}`);
        return { ok: true };
      },
    });
  }
  return { registry, calls };
}
/** The registry's metadata-only catalog snapshot, read as an adapter reads it. */
function catalogOf(registry: CapabilityRegistry): Catalog {
  const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
  const find = (capability: string): CapabilityDescriptor | undefined => descriptors.find(descriptor => descriptor.id === capability);
  return { permissions: capability => find(capability)?.permissions, effectClass: capability => find(capability)?.effectClass };
}
type Decision = "permitted" | CapabilityErrorCategory;
/** The oracle: the registry's own dispatch decision for an invocation under the grants. */
async function decide(registry: CapabilityRegistry, capability: string, grants: readonly string[]): Promise<Decision> {
  try {
    await registry.invoke(capability, {}, { grants, signal: new AbortController().signal });
    return "permitted";
  } catch (error) {
    if (error instanceof CapabilityError) return error.category;
    throw error;
  }
}

// ---- the reference adapter ----

/** Hard known capacity: a non-negative safe integer; "unknown", NaN, an unbounded value, a fraction, an integer past the safe range or a negative is not known. */
const knownCapacity = (capacity: Capacity): capacity is number => typeof capacity === "number" && Number.isSafeInteger(capacity) && capacity >= 0;
/** The registry's invocation rule over the catalog: every explicit permission, or exact invoke:<id> when the descriptor requires none; an unregistered capability is never permitted. */
function permits(catalog: Catalog, capability: string, grants: readonly string[]): boolean {
  const permissions = catalog.permissions(capability);
  if (permissions === undefined) return false;
  return permissions.length === 0 ? grants.includes(`invoke:${capability}`) : permissions.every(permission => grants.includes(permission));
}
/** The task's load fits the agent's hard known capacity. */
const fits = (agent: Agent, task: Task): boolean => knownCapacity(agent.capacity) && task.load <= agent.capacity;
type Legal = (catalog: Catalog, agent: Agent, task: Task) => boolean;
/** A legal pair: the load fits a hard known capacity and the registry grants the agent the task's capability. */
const legal: Legal = (catalog, agent, task) => fits(agent, task) && permits(catalog, task.capability, agent.grants);
const pairsOf = (basis: Basis, catalog: Catalog, isLegal: Legal): Pair[] =>
  basis.agents.flatMap(agent => basis.tasks.filter(task => isLegal(catalog, agent, task)).map(task => ({ agent: agent.id, task: task.id })));
/** A pre-sampling basis yields the IR of its legal pairs; any other source is the typed refusal naming its kind. */
const enumerateWith =
  (isLegal: Legal) =>
  (source: Source, catalog: Catalog): Enumerated => {
    if (source.kind !== "pre-sampling") return { ok: false, code: "support-source", source: source.kind };
    const pairs = pairsOf(source, catalog, isLegal);
    return { ok: true, ir: { basisRevision: source.revision, count: pairs.length, pairs } };
  };
const key = (pair: Pair): string => `${pair.agent}/${pair.task}`;
/** A candidate inside the IR's pairs is admitted; one outside is the typed refusal naming it. */
const referenceAdmit = (ir: SupportIR, candidate: Pair): Admission =>
  ir.pairs.some(pair => key(pair) === key(candidate)) ? { admitted: true } : { admitted: false, code: "outside-support", agent: candidate.agent, task: candidate.task };
const REFERENCE: Adapter = { enumerate: enumerateWith(legal), admit: referenceAdmit };

// ---- the cases ----

interface Case {
  readonly id: string;
  readonly basis: Basis;
  /** The legal pairs, authored by hand: agent-major in agent order, task-minor in task order. */
  readonly legal: readonly string[];
}
const basisOf = (id: string, agents: readonly Agent[], tasks: readonly Task[] = TASKS): Basis => ({ kind: "pre-sampling", revision: `rev-${id}`, agents, tasks });
/** FULLWIDTH COLON (U+FF1A): its compatibility (NFKC) form is the colon. */
const FULLWIDTH_COLON = String.fromCodePoint(0xff1a);
/**
 * a-near's grants (the empty-support case): each, under its kind, a near miss of a required grant - fixture:read,
 * fixture:write or the open capability's exact invoke:fixture.support-open - and never a required grant itself.
 */
const NEAR_GRANTS: readonly (readonly [string, string])[] = [
  ["prefix", "fixture"],
  ["prefix", "invoke"],
  ["prefix", "invoke:fixture"],
  ["suffix", "read"],
  ["suffix", "fixture.support-open"],
  ["case", "FIXTURE:READ"],
  ["case", "INVOKE:FIXTURE.SUPPORT-OPEN"],
  ["padded", " fixture:read"],
  ["padded", "fixture:write "],
  ["padded", " invoke:fixture.support-open"],
  ["padded", "invoke:fixture.support-open "],
  ["wildcard", "fixture:*"],
  ["wildcard", "invoke:*"],
  ["compatibility", `fixture${FULLWIDTH_COLON}read`],
  ["compatibility", `invoke${FULLWIDTH_COLON}fixture.support-open`],
  ["longer", "fixture:reader"],
  ["longer", "invoke:fixture.support-opener"],
];
const CASES: readonly Case[] = [
  {
    id: "five-agents",
    basis: basisOf("five-agents", [
      { id: "a-reader", capacity: 2, grants: ["fixture:read", "discover:fixture.support-write", "discover:fixture.support-open"] },
      { id: "a-writer", capacity: 3, grants: ["fixture:read", "fixture:write"] },
      { id: "a-operator", capacity: 1, grants: ["invoke:fixture.support-open", "fixture:write"] },
      { id: "a-unknown", capacity: "unknown", grants: ["fixture:read", "fixture:write", "invoke:fixture.support-open"] },
      { id: "a-idle", capacity: 0, grants: ["fixture:read"] },
    ]),
    legal: ["a-reader/t-read", "a-writer/t-read", "a-writer/t-write", "a-writer/t-dual", "a-operator/t-open"],
  },
  {
    id: "one-agent",
    basis: basisOf("one-agent", [{ id: "a-solo", capacity: 2, grants: ["fixture:read", "fixture:write", "invoke:fixture.support-open"] }]),
    legal: ["a-solo/t-read", "a-solo/t-write", "a-solo/t-open"],
  },
  {
    id: "bounds",
    basis: basisOf("bounds", [
      { id: "a-unbounded", capacity: Number.POSITIVE_INFINITY, grants: ["fixture:read", "fixture:write"] },
      { id: "a-fraction", capacity: 1.5, grants: ["fixture:read"] },
      { id: "a-negative", capacity: -1, grants: ["fixture:read"] },
      { id: "a-unsafe", capacity: Number.MAX_SAFE_INTEGER + 1, grants: ["fixture:read"] },
      { id: "a-nan", capacity: Number.NaN, grants: ["fixture:read"] },
      { id: "a-partial", capacity: 4, grants: ["fixture:read"] },
    ]),
    legal: ["a-partial/t-read"],
  },
  {
    id: "empty-support",
    basis: basisOf("empty-support", [
      { id: "a-ungranted", capacity: 5, grants: [] },
      { id: "a-unmeasured", capacity: "unknown", grants: ["fixture:read", "fixture:write", "invoke:fixture.support-open"] },
      { id: "a-near", capacity: 5, grants: NEAR_GRANTS.map(([, grant]) => grant) },
    ]),
    legal: [],
  },
  {
    id: "invoke-grants",
    basis: basisOf("invoke-grants", [
      {
        id: "a-invoker",
        capacity: 3,
        grants: ["invoke:fixture.support-read", "invoke:fixture.support-write", "invoke:fixture.support-open", "invoke:fixture.support-dual", "invoke:fixture.support-missing"],
      },
    ]),
    legal: ["a-invoker/t-open"],
  },
];
interface PostCase {
  readonly id: string;
  readonly source: PostProposal;
}
/** Each record admits a pair outside the legal pre-sampling support, so a support read from it is not the support. */
const RECORDS: readonly PostCase[] = [
  {
    id: "training-export-admission",
    source: {
      kind: "mw.training-export.v1",
      revision: "rev-training-export-admission",
      admitted: [
        { agent: "a-reader", task: "t-write" },
        { agent: "a-writer", task: "t-read" },
      ],
    },
  },
  { id: "reconcile-verdict", source: { kind: "reconcile-verdict", revision: "rev-reconcile-verdict", admitted: [{ agent: "a-operator", task: "t-write" }] } },
];
const caseOf = (id: string): Case => {
  const found = CASES.find(entry => entry.id === id);
  if (found === undefined) throw new Error(`no case ${id}`);
  return found;
};
/** Every candidate of a basis: its agent x task grid, then a ghost agent on its first task and its first agent on a ghost task. */
function candidatesOf(basis: Basis): Pair[] {
  const grid = basis.agents.flatMap(agent => basis.tasks.map(task => ({ agent: agent.id, task: task.id })));
  return [...grid, { agent: "a-ghost", task: basis.tasks[0].id }, { agent: basis.agents[0].id, task: "t-ghost" }];
}

// ---- the checks ----

type Check = "K-LEGAL" | "K-SOURCE" | "K-IR" | "K-OUTSIDE";
const CHECKS: readonly Check[] = ["K-LEGAL", "K-SOURCE", "K-IR", "K-OUTSIDE"];
type Verdict = Readonly<Record<Check, readonly string[]>>;
const pairCount = (count: number): string => `${count} pair${count === 1 ? "" : "s"}`;

/** K-LEGAL: each case's support equals its legal pairs exactly, and no pair stands twice. */
function legalFindings(adapter: Adapter, catalog: Catalog, cases: readonly Case[] = CASES): string[] {
  const findings: string[] = [];
  for (const entry of cases) {
    const outcome = adapter.enumerate(entry.basis, catalog);
    if (!outcome.ok) {
      findings.push(`${entry.id}: refused (${outcome.code})`);
      continue;
    }
    const got = outcome.ir.pairs.map(key);
    for (const pair of entry.legal) if (!got.includes(pair)) findings.push(`${entry.id}: misses ${pair}`);
    for (const pair of got) if (!entry.legal.includes(pair)) findings.push(`${entry.id}: holds ${pair}, outside the legal pairs`);
    for (const [index, pair] of got.entries()) if (got.indexOf(pair) !== index) findings.push(`${entry.id}: holds ${pair} twice`);
  }
  return findings;
}
/** K-SOURCE: each post-proposal record is the typed refusal naming its kind, never a support. */
function sourceFindings(adapter: Adapter, catalog: Catalog): string[] {
  const findings: string[] = [];
  for (const record of RECORDS) {
    const outcome = adapter.enumerate(record.source, catalog);
    if (outcome.ok) findings.push(`${record.id}: yields a support of ${pairCount(outcome.ir.pairs.length)}`);
    else if (!isDeepStrictEqual(outcome, { ok: false, code: "support-source", source: record.source.kind })) findings.push(`${record.id}: refused untyped ${JSON.stringify(outcome)}`);
  }
  return findings;
}
/** K-IR: each case's IR carries its basis's revision and its own pair count. */
function irFindings(adapter: Adapter, catalog: Catalog): string[] {
  const findings: string[] = [];
  for (const entry of CASES) {
    const outcome = adapter.enumerate(entry.basis, catalog);
    if (!outcome.ok) {
      findings.push(`${entry.id}: no IR`);
      continue;
    }
    if (outcome.ir.basisRevision !== entry.basis.revision) findings.push(`${entry.id}: basis revision ${JSON.stringify(outcome.ir.basisRevision)}, not ${entry.basis.revision}`);
    if (outcome.ir.count !== outcome.ir.pairs.length) findings.push(`${entry.id}: count ${outcome.ir.count} for ${pairCount(outcome.ir.pairs.length)}`);
  }
  return findings;
}
/** K-OUTSIDE: every candidate is admitted exactly when inside the adapter's own support, and refused typed otherwise. */
function outsideFindings(adapter: Adapter, catalog: Catalog): string[] {
  const findings: string[] = [];
  for (const entry of CASES) {
    const outcome = adapter.enumerate(entry.basis, catalog);
    if (!outcome.ok) {
      findings.push(`${entry.id}: no IR to admit against`);
      continue;
    }
    const support = new Set(outcome.ir.pairs.map(key));
    for (const candidate of candidatesOf(entry.basis)) {
      const inside = support.has(key(candidate));
      const expected: Admission = inside ? { admitted: true } : { admitted: false, code: "outside-support", agent: candidate.agent, task: candidate.task };
      if (!isDeepStrictEqual(adapter.admit(outcome.ir, candidate), expected)) findings.push(`${entry.id}: ${key(candidate)} ${inside ? "is refused inside the support" : "is not the typed refusal"}`);
    }
  }
  return findings;
}
function judge(adapter: Adapter, catalog: Catalog): Verdict {
  return { "K-LEGAL": legalFindings(adapter, catalog), "K-SOURCE": sourceFindings(adapter, catalog), "K-IR": irFindings(adapter, catalog), "K-OUTSIDE": outsideFindings(adapter, catalog) };
}
const refusing = (verdict: Verdict): Check[] => CHECKS.filter(check => verdict[check].length > 0);

// ---- the mutants ----

interface Mutant {
  readonly id: string;
  readonly name: string;
  readonly refusedBy: readonly Check[];
  readonly adapter: Adapter;
}
const withLegal = (isLegal: Legal): Adapter => ({ enumerate: enumerateWith(isLegal), admit: referenceAdmit });
const withEnumerate = (enumerate: Adapter["enumerate"]): Adapter => ({ enumerate, admit: referenceAdmit });
/** The reference's IR reshaped (a refusal passes through unchanged). */
const reshaped = (reshape: (ir: SupportIR, source: Source) => SupportIR): Adapter =>
  withEnumerate((source, catalog) => {
    const outcome = REFERENCE.enumerate(source, catalog);
    return outcome.ok ? { ok: true, ir: reshape(outcome.ir, source) } : outcome;
  });
/** A post-proposal record of the kind read as the support: its admitted pairs become the IR. */
const postAsSupport = (kind: PostProposal["kind"]): Adapter =>
  withEnumerate((source, catalog) =>
    source.kind !== "pre-sampling" && source.kind === kind ? { ok: true, ir: { basisRevision: source.revision, count: source.admitted.length, pairs: source.admitted } } : REFERENCE.enumerate(source, catalog),
  );
/** The reference's invocation rule with its grant matching loosened: each required grant (every explicit permission, or invoke:<id> when the descriptor requires none) is held when `matches` holds for one of the agent's grants, where the registry asks exact equality. */
const looseLegal =
  (matches: (held: string, required: string) => boolean): Legal =>
  (catalog, agent, task) => {
    const permissions = catalog.permissions(task.capability);
    if (!fits(agent, task) || permissions === undefined) return false;
    const required = permissions.length === 0 ? [`invoke:${task.capability}`] : permissions;
    return required.every(grant => agent.grants.some(held => matches(held, grant)));
  };
interface LooseMatching {
  readonly id: string;
  readonly name: string;
  /** The NEAR_GRANTS kind the loosened matching is built for: it accepts every near grant of that kind (A1b's witness carries every kind it accepts). */
  readonly kind: string;
  readonly matches: (held: string, required: string) => boolean;
}
/** The grant-matching mutants (M23-M29), one per NEAR_GRANTS kind: each loosens the exact matching for that kind and accepts every near grant of it; M29's containment also accepts the padded grants (A1b). */
const LOOSE_MATCHING: readonly LooseMatching[] = [
  { id: "M23", name: "grant-matched-as-prefix", kind: "prefix", matches: (held, required) => required.startsWith(held) },
  { id: "M24", name: "grant-matched-as-suffix", kind: "suffix", matches: (held, required) => required.endsWith(held) },
  { id: "M25", name: "grant-matched-case-folded", kind: "case", matches: (held, required) => held.toLowerCase() === required.toLowerCase() },
  { id: "M26", name: "grant-matched-trimmed", kind: "padded", matches: (held, required) => held.trim() === required },
  { id: "M27", name: "grant-matched-by-wildcard", kind: "wildcard", matches: (held, required) => (held.endsWith("*") ? required.startsWith(held.slice(0, -1)) : held === required) },
  { id: "M28", name: "grant-matched-compatibility-folded", kind: "compatibility", matches: (held, required) => held.normalize("NFKC") === required.normalize("NFKC") },
  { id: "M29", name: "grant-matched-when-contained", kind: "longer", matches: (held, required) => held.includes(required) },
];
/** The grants a near grant can stand in for, read from the registry's catalog: each task's registered permissions, or its exact invoke:<id> when the descriptor requires none (an unregistered capability requires none), each once, in task order. */
const requiredGrants = (catalog: Catalog): string[] => [
  ...new Set(
    TASKS.flatMap(task => {
      const permissions = catalog.permissions(task.capability);
      if (permissions === undefined) return [];
      return permissions.length === 0 ? [`invoke:${task.capability}`] : [...permissions];
    }),
  ),
];
/** The required grants a grant-matching mutant's matcher holds a near grant for. */
const standsIn = (entry: LooseMatching, grant: string, required: readonly string[]): string[] => required.filter(need => entry.matches(grant, need));
const MUTANTS: readonly Mutant[] = [
  { id: "M01", name: "capacity-ignored", refusedBy: ["K-LEGAL"], adapter: withLegal((catalog, agent, task) => permits(catalog, task.capability, agent.grants)) },
  {
    id: "M02",
    name: "unknown-capacity-unbounded",
    refusedBy: ["K-LEGAL"],
    adapter: withLegal((catalog, agent, task) => (agent.capacity === "unknown" || fits(agent, task)) && permits(catalog, task.capability, agent.grants)),
  },
  {
    id: "M03",
    name: "any-number-capacity",
    refusedBy: ["K-LEGAL"],
    adapter: withLegal((catalog, agent, task) => typeof agent.capacity === "number" && task.load <= agent.capacity && permits(catalog, task.capability, agent.grants)),
  },
  { id: "M04", name: "grant-blind", refusedBy: ["K-LEGAL"], adapter: withLegal((catalog, agent, task) => fits(agent, task) && catalog.permissions(task.capability) !== undefined) },
  {
    id: "M05",
    name: "read-effect-ungated",
    refusedBy: ["K-LEGAL"],
    adapter: withLegal((catalog, agent, task) => fits(agent, task) && (catalog.effectClass(task.capability) === "read" || permits(catalog, task.capability, agent.grants))),
  },
  {
    id: "M06",
    name: "discover-grant-invokes",
    refusedBy: ["K-LEGAL"],
    adapter: withLegal((catalog, agent, task) => fits(agent, task) && (agent.grants.includes(`discover:${task.capability}`) || permits(catalog, task.capability, agent.grants))),
  },
  {
    id: "M07",
    name: "unregistered-permitted",
    refusedBy: ["K-LEGAL"],
    adapter: withLegal((catalog, agent, task) => fits(agent, task) && (catalog.permissions(task.capability) === undefined || permits(catalog, task.capability, agent.grants))),
  },
  {
    id: "M08",
    name: "any-one-permission",
    refusedBy: ["K-LEGAL"],
    adapter: withLegal((catalog, agent, task) => {
      const permissions = catalog.permissions(task.capability);
      if (!fits(agent, task) || permissions === undefined) return false;
      return permissions.length === 0 ? agent.grants.includes(`invoke:${task.capability}`) : permissions.some(permission => agent.grants.includes(permission));
    }),
  },
  {
    id: "M09",
    name: "pair-twice",
    refusedBy: ["K-LEGAL"],
    adapter: reshaped(ir => {
      const pairs = ir.pairs.length === 0 ? [] : [ir.pairs[0], ...ir.pairs];
      return { ...ir, count: pairs.length, pairs };
    }),
  },
  {
    id: "M10",
    name: "legal-pair-dropped",
    refusedBy: ["K-LEGAL"],
    adapter: reshaped(ir => {
      const pairs = ir.pairs.slice(0, -1);
      return { ...ir, count: pairs.length, pairs };
    }),
  },
  {
    id: "M11",
    name: "strict-load",
    refusedBy: ["K-LEGAL"],
    adapter: withLegal((catalog, agent, task) => knownCapacity(agent.capacity) && task.load < agent.capacity && permits(catalog, task.capability, agent.grants)),
  },
  { id: "M12", name: "training-export-as-support", refusedBy: ["K-SOURCE"], adapter: postAsSupport("mw.training-export.v1") },
  { id: "M13", name: "reconcile-verdict-as-support", refusedBy: ["K-SOURCE"], adapter: postAsSupport("reconcile-verdict") },
  {
    id: "M14",
    name: "untyped-source-refusal",
    refusedBy: ["K-SOURCE"],
    adapter: withEnumerate((source, catalog) => (source.kind === "pre-sampling" ? REFERENCE.enumerate(source, catalog) : { ok: false, code: "refused", source: source.kind })),
  },
  {
    id: "M15",
    name: "source-unnamed",
    refusedBy: ["K-SOURCE"],
    adapter: withEnumerate((source, catalog) => (source.kind === "pre-sampling" ? REFERENCE.enumerate(source, catalog) : { ok: false, code: "support-source", source: "" })),
  },
  { id: "M16", name: "revision-dropped", refusedBy: ["K-IR"], adapter: reshaped(ir => ({ ...ir, basisRevision: "" })) },
  {
    id: "M17",
    name: "count-of-the-grid",
    refusedBy: ["K-IR"],
    adapter: reshaped((ir, source) => ({ ...ir, count: source.kind === "pre-sampling" ? source.agents.length * source.tasks.length : ir.count })),
  },
  { id: "M18", name: "admit-every-candidate", refusedBy: ["K-OUTSIDE"], adapter: { enumerate: REFERENCE.enumerate, admit: () => ({ admitted: true }) } },
  {
    id: "M19",
    name: "untyped-outside-refusal",
    refusedBy: ["K-OUTSIDE"],
    adapter: { enumerate: REFERENCE.enumerate, admit: (ir, candidate) => (ir.pairs.some(pair => key(pair) === key(candidate)) ? { admitted: true } : { admitted: false }) },
  },
  { id: "M20", name: "refuse-every-source", refusedBy: ["K-LEGAL", "K-IR", "K-OUTSIDE"], adapter: withEnumerate(source => ({ ok: false, code: "support-source", source: source.kind })) },
  {
    id: "M21",
    name: "unsafe-integer-capacity",
    refusedBy: ["K-LEGAL"],
    adapter: withLegal(
      (catalog, agent, task) =>
        typeof agent.capacity === "number" && Number.isInteger(agent.capacity) && agent.capacity >= 0 && task.load <= agent.capacity && permits(catalog, task.capability, agent.grants),
    ),
  },
  {
    id: "M22",
    name: "invoke-grant-overrides-permissions",
    refusedBy: ["K-LEGAL"],
    adapter: withLegal(
      (catalog, agent, task) =>
        fits(agent, task) && ((catalog.permissions(task.capability) !== undefined && agent.grants.includes(`invoke:${task.capability}`)) || permits(catalog, task.capability, agent.grants)),
    ),
  },
  ...LOOSE_MATCHING.map((entry): Mutant => ({ id: entry.id, name: entry.name, refusedBy: ["K-LEGAL"], adapter: withLegal(looseLegal(entry.matches)) })),
];
const mutantOf = (id: string): Mutant => {
  const found = MUTANTS.find(mutant => mutant.id === id);
  if (found === undefined) throw new Error(`no mutant ${id}`);
  return found;
};
/** Each mutant declaring the check, with that check's findings on it. */
const mutantReadings = (check: Check, catalog: Catalog): [string, string[]][] =>
  MUTANTS.filter(mutant => mutant.refusedBy.includes(check)).map(mutant => [mutant.id, [...judge(mutant.adapter, catalog)[check]]]);

// ---- the armed registrations ----

interface Site {
  readonly path: string;
  readonly adapter: Adapter;
}
/** A src module naming the vocabulary must register its adapter here; every check then judges it beside the reference. Empty: the gate has not fired. */
const SITES: readonly Site[] = [];
/** Every adapter the checks judge: the reference, then each registration. */
const JUDGED: readonly { readonly name: string; readonly adapter: Adapter }[] = [{ name: "reference", adapter: REFERENCE }, ...SITES.map(site => ({ name: site.path, adapter: site.adapter }))];

// ---- the src reading ----

interface Word {
  readonly id: string;
  readonly spelling: string;
}
/** The filing's search words Pi's src never uses (V1-V3, in the filing's order) and the statement's PRE-SAMPLING (V4). */
const VOCABULARY: readonly Word[] = [
  { id: "V1", spelling: "sampler" },
  { id: "V2", spelling: "training-export" },
  { id: "V3", spelling: "GraphDataIR" },
  { id: "V4", spelling: "PRE-SAMPLING" },
];
/** The filing's other two search words: Pi's own words with other meanings, never read (R-SHARED-WORD). */
const SHARED_WORDS: readonly string[] = ["capacity", "eligible"];
/** A spelling's parts: split at whitespace, dots, underscores and hyphens, then at camel humps. */
const partsOf = (spelling: string): string[] => spelling.split(/[\s._-]+/).flatMap(word => word.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g) ?? []);
const escapeRegex = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** A word's reading: its parts in order, any case, with any run of whitespace, full stops, low lines, dashes (Unicode Pd, the hyphen-minus among them) or format characters (Cf) between them. */
const readerOf = (word: Word): RegExp => new RegExp(partsOf(word.spelling).map(escapeRegex).join("[\\s._\\p{Pd}\\p{Cf}]*"), "iu");
const READERS = VOCABULARY.map(word => ({ word, reader: readerOf(word) }));
/** The vocabulary words a text names, in vocabulary order. */
const namedWords = (text: string): string[] => READERS.filter(({ reader }) => reader.test(text)).map(({ word }) => word.spelling);

interface Entry {
  readonly path: string;
  readonly text: string;
}
/** git's would-commit listing under a scope: tracked, plus untracked files git does not ignore. */
function gitList(root: string, scope: string): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", scope], { cwd: root, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== ""))].sort();
}
/** Each listed path's text; a listed path that is not a regular file is unread, never skipped. */
function entriesOf(root: string, paths: readonly string[]): { readonly entries: Entry[]; readonly unread: string[] } {
  const entries: Entry[] = [];
  const unread: string[] = [];
  for (const path of paths) {
    let regular = false;
    try {
      regular = lstatSync(join(root, path)).isFile();
    } catch {
      regular = false;
    }
    if (regular) entries.push({ path, text: readFileSync(join(root, path), "utf8") });
    else unread.push(path);
  }
  return { entries, unread };
}
/** The vocabulary words a listed file names, in its path or its text. */
const entryWords = (entry: Entry): string[] => namedWords(`${entry.path}\n${entry.text}`);
/** A src module naming the vocabulary without a registration, a stale registration and a duplicate registration are findings. */
function srcFindings(entries: readonly Entry[], sites: readonly Site[]): string[] {
  const findings: string[] = [];
  const naming = new Set<string>();
  for (const entry of entries) {
    const words = entryWords(entry);
    if (words.length === 0) continue;
    naming.add(entry.path);
    if (!sites.some(site => site.path === entry.path)) findings.push(`${entry.path}: names ${words.join(", ")}, no SITES registration`);
  }
  const seen = new Set<string>();
  for (const site of sites) {
    if (seen.has(site.path)) findings.push(`${site.path}: registered twice`);
    else if (!naming.has(site.path)) findings.push(`${site.path}: registered, names no vocabulary word (stale)`);
    seen.add(site.path);
  }
  return findings;
}
let liveCache: { readonly entries: readonly Entry[]; readonly unread: readonly string[] } | undefined;
/** The live src listing, each path read once per run. */
function liveSrc(): { readonly entries: readonly Entry[]; readonly unread: readonly string[] } {
  if (liveCache === undefined) liveCache = entriesOf(ROOT, gitList(ROOT, "src"));
  return liveCache;
}
const FORMAT_CHARACTER = String.fromCodePoint(0x200b);
const CYRILLIC_A = String.fromCodePoint(0x430);
/** Dashes (Unicode Pd) other than the hyphen-minus: HYPHEN, NON-BREAKING HYPHEN and EN DASH. */
const HYPHEN = String.fromCodePoint(0x2010);
const NON_BREAKING_HYPHEN = String.fromCodePoint(0x2011);
const EN_DASH = String.fromCodePoint(0x2013);
/** MIDDLE DOT (Po): none of the reading's separators. */
const MIDDLE_DOT = String.fromCodePoint(0xb7);
/** MINUS SIGN (Sm): none of the reading's separators. */
const MINUS_SIGN = String.fromCodePoint(0x2212);
/** The reading's controls: each label with its text, read for the words it names. */
const VOCABULARY_CONTROLS: readonly (readonly [string, string])[] = [
  ["camel", "export type GraphDataIR = unknown;"],
  ["snake", "const graph_data_ir = 1;"],
  ["upper kebab", "GRAPH-DATA-IR"],
  ["spaced", "a graph data ir export"],
  ["dotted", "graph.data.ir"],
  ["format characters between the parts", `graph${FORMAT_CHARACTER}data${FORMAT_CHARACTER}ir`],
  ["hyphen (U+2010) between the parts", `pre${HYPHEN}sampling`],
  ["non-breaking hyphens (U+2011) between the parts", `Graph${NON_BREAKING_HYPHEN}Data${NON_BREAKING_HYPHEN}IR`],
  ["en dash (U+2013) between the parts", `training${EN_DASH}export`],
  ["schema id", "mw.training-export.v1"],
  ["constant", "TRAINING_EXPORT"],
  ["camel training export", "trainingExport"],
  ["sampler", "a named Sampler draws"],
  ["inside a longer name", "resampler"],
  ["pre-sampling", "the pre-sampling support"],
  ["pre_sampling", "PRE_SAMPLING"],
  ["presampling", "presampling"],
  ["every word", "sampler training_export GraphDataIR pre sampling"],
  ["sampling alone", "sampling"],
  ["shared words", "capacity eligible"],
];

// ---- the docs, the export and the roster ----

const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
/** docs/workbench/06's title: the parent heading every bound section sits under. */
const DOCS_06_TITLE = "06 \u2014 Capability registry, typed node providers and agent tools";
interface DocsLine {
  readonly line: number;
  readonly cited: boolean;
  /** The level-2 section the line sits in. */
  readonly section: string;
  readonly text: string;
}
/** The filing's docs/workbench/06 citations (:5, :15, :73) and the routing-hint sentence's own line (:28), each with its section and the text its row needs. */
const DOCS_LINES: readonly DocsLine[] = [
  { line: 5, cited: true, section: "Location and scope", text: "its job is discover/authorize/dispatch/inspect operations" },
  { line: 15, cited: true, section: "Proposed capability descriptor", text: 'effectClass: "read" | "write" | "external" | "unknown";' },
  { line: 28, cited: false, section: "Proposed capability descriptor", text: 'The "effectClass" is a conservative routing hint, not an exactly-once guarantee.' },
  { line: 73, cited: true, section: "Conformance tests", text: "Read-only agent cannot invoke write capability even if it knows ID." },
];
const docsLineOf = (line: number): DocsLine => {
  const found = DOCS_LINES.find(entry => entry.line === line);
  if (found === undefined) throw new Error(`no docs line ${line}`);
  return found;
};
let pinDocCache: string | undefined;
const pinDoc = (): string => {
  if (pinDocCache === undefined) pinDocCache = execFileSync("git", ["show", `${FILING_PIN}:${DOCS_06}`], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
  return pinDocCache;
};
interface DocAnchor {
  readonly line: number;
  /** The pinned page's line holds the text, and the text stands nowhere else in the pinned page. */
  readonly pin: boolean;
  /** The pinned line stands whole somewhere in the live page's raw text (the first cut's reading, kept as a conjunct). */
  readonly head: boolean;
  /** At the pin, the line's section (rendered view) carries no HTML and renders the text in exactly one block. */
  readonly rendered: boolean;
  /** The live page's section, bound the same way, renders exactly the pinned section's blocks and carries no HTML. */
  readonly section: boolean;
}
/** A rendered block shows the text: a list through one of its items, any other block but a heading through its own text. */
const blockRenders = (block: RenderedBlock, text: string): boolean => (block.kind === "list" ? block.items.some(item => item.text.includes(text)) : block.kind !== "heading" && block.text.includes(text));
/**
 * A docs anchor read at a line of the pinned page and over a live page. Both pages are read in the rendered view
 * (test/helpers/census.ts docsSection: marked's lexer, where markup and HTML comments render no text, the section's heading
 * stands once in the page under its title, and the section runs to the next level-1 or 2 heading or EOF), and the live
 * section must equal the pinned one block for block (sectionMatches: slice equality, HTML refused, never includes-anywhere).
 */
function anchorIn(entry: DocsLine, line: number, pinned: string, live: string): DocAnchor {
  const at = pinned.split("\n")[line - 1] ?? "";
  const pinnedSection = docsSection(pinned, entry.section, 2, [DOCS_06_TITLE]);
  return {
    line,
    pin: entry.text !== "" && at.includes(entry.text) && pinned.split(entry.text).length === 2,
    head: at !== "" && live.split("\n").includes(at),
    rendered: pinnedSection.ok && !pinnedSection.hasHtml && pinnedSection.blocks.filter(block => blockRenders(block, entry.text)).length === 1,
    section: pinnedSection.ok && pinnedSection.blocks.length > 0 && sectionMatches(docsSection(live, entry.section, 2, [DOCS_06_TITLE]), pinnedSection.blocks).ok,
  };
}
/** An anchor holds when every one of its readings holds. */
const holds = (anchor: DocAnchor): boolean => anchor.pin && anchor.head && anchor.rendered && anchor.section;
/** A docs/workbench/06 anchor at its own line: the filing pin's page and the live page. */
const docAnchor = (line: number): DocAnchor => anchorIn(docsLineOf(line), line, pinDoc(), textOf(DOCS_06));
interface DocControls {
  readonly lineDeleted: DocAnchor;
  readonly lineEdited: DocAnchor;
  readonly textAtNextLine: DocAnchor;
  readonly lineCommented: DocAnchor;
  readonly lineMoved: DocAnchor;
}
/**
 * A docs line's anchor read under five controls, each of which must leave it not holding: four edits of the live page (the
 * line deleted, the line edited, the line wrapped in an HTML comment - the B5 shape - and the line moved under a new
 * trailing section - the B6 shape) and the text read at the pinned page's next line. The comment and the move keep the raw
 * line whole in the live page.
 */
function docControls(line: number): DocControls {
  const entry = docsLineOf(line);
  const pinned = pinDoc();
  const live = textOf(DOCS_06);
  const raw = pinned.split("\n")[line - 1] ?? "";
  const lines = live.split("\n");
  const at = lines.indexOf(raw);
  const edited = (replacement: readonly string[]): string => (at < 0 ? live : [...lines.slice(0, at), ...replacement, ...lines.slice(at + 1)].join("\n"));
  return {
    lineDeleted: anchorIn(entry, line, pinned, edited([])),
    lineEdited: anchorIn(entry, line, pinned, edited([`${raw} (edited)`])),
    textAtNextLine: anchorIn(entry, line + 1, pinned, live),
    lineCommented: anchorIn(entry, line, pinned, edited(["<!--", raw, "-->"])),
    lineMoved: anchorIn(entry, line, pinned, `${edited([]).trimEnd()}\n\n## Withdrawn (not enforced)\n\n${raw}\n`),
  };
}
/** A docs line, asserted: its anchor holds, no control leaves it holding, and the comment and move edits fall to the section reading alone. */
function assertDocLine(line: number): { readonly anchor: DocAnchor; readonly controls: DocControls } {
  const anchor = docAnchor(line);
  expect(anchor, `docs/workbench/06:${line} at the filing pin; its section renders the same in the live page`).toEqual({ line, pin: true, head: true, rendered: true, section: true });
  const controls = docControls(line);
  expect(
    Object.entries(controls)
      .filter(([, control]) => holds(control))
      .map(([name]) => name),
    `no edit of :${line} in the live page leaves its anchor holding`,
  ).toEqual([]);
  expect([controls.lineCommented, controls.lineMoved], `:${line} commented or moved keeps its raw line whole, and only the section reading refuses it`).toEqual([
    { line, pin: true, head: true, rendered: true, section: false },
    { line, pin: true, head: true, rendered: true, section: false },
  ]);
  return { anchor, controls };
}
interface BeadRow {
  readonly title: string;
  readonly notes: string;
  readonly status: string;
}
let exportCache: string | undefined;
const exportText = (): string => {
  if (exportCache === undefined) exportCache = textOf(EXPORT);
  return exportCache;
};
/** A bead's row in the tracker export. */
function beadRow(bead: string): BeadRow | undefined {
  for (const line of exportText().split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (typeof row !== "object" || row === null) continue;
    const { id, title, notes, status } = row as { readonly id?: unknown; readonly title?: unknown; readonly notes?: unknown; readonly status?: unknown };
    if (id === bead && typeof title === "string" && typeof notes === "string" && typeof status === "string") return { title, notes, status };
  }
  return undefined;
}
/** The owner filing's acceptance clauses: the first "Acceptance shape: " sentence to its line end, split at "; ", the final period dropped. */
function acceptanceClauses(notes: string): string[] {
  const start = notes.indexOf("Acceptance shape: ");
  if (start === -1) return [];
  const end = notes.indexOf("\n", start);
  return notes
    .slice(start + "Acceptance shape: ".length, end === -1 ? undefined : end)
    .trim()
    .replace(/\.$/, "")
    .split("; ");
}
/** The quotes tile the label in order, with nothing but separators (whitespace, comma, semicolon, colon, parentheses) between. */
function tiles(label: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = label.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:()]*$/.test(label.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:()]*$/.test(label.slice(at));
}

// ---- the judged rows (rule 16) ----

interface Row {
  readonly id: string;
  /** An acceptance clause verbatim (A1-A4), the statement's last clause (A5), a slice of the authority sentence (S, P) or the residual families (Q). */
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  { id: "A1", label: "a fixture with N agents, per-agent capacity and grants yields a support set equal to exactly the legal (agent, task) pairs", pins: ["A1a", "A1b"] },
  { id: "A2", label: "a fixture that feeds an admission/reconcile record as the support goes red with a typed refusal", pins: ["A2a", "A2b"] },
  { id: "A3", label: "the exported IR carries the support's basis revision and count", pins: ["A3a", "A3b"] },
  { id: "A4", label: "test-only until the gate, src untouched", pins: ["A4a", "A4b"] },
  { id: "A5", label: "a candidate outside the support is a typed refusal", pins: ["A5a", "A5b"] },
  { id: "S", label: "the registry authorizes, effectClass is a routing hint, a read-only agent cannot invoke a write capability", pins: ["S1", "S2", "S3"] },
  { id: "P", label: "the parity rule that surface allowlists only narrow a registry decision (closed wb-6hb.4)", pins: ["P1", "P2"] },
  { id: "Q", label: "the named residual families, each member a pinned quiet row", pins: ["Q1", "Q2", "Q3", "Q4"] },
];
/** Each pin's quote: the quotes of rows A1-A5, S and P tile their row's label (the outside anchors read it); Q's pins name their residual families. */
const QUOTES: Readonly<Record<string, string>> = {
  A1a: "a fixture with N agents, per-agent capacity and grants",
  A1b: "yields a support set equal to exactly the legal (agent, task) pairs",
  A2a: "a fixture that feeds an admission/reconcile record as the support",
  A2b: "goes red with a typed refusal",
  A3a: "the exported IR carries the support's basis revision",
  A3b: "and count",
  A4a: "test-only until the gate",
  A4b: "src untouched",
  A5a: "a candidate outside the support",
  A5b: "is a typed refusal",
  S1: "the registry authorizes",
  S2: "effectClass is a routing hint",
  S3: "a read-only agent cannot invoke a write capability",
  P1: "the parity rule that surface allowlists only narrow a registry decision",
  P2: "closed wb-6hb.4",
  Q1: "R-COMPOSED",
  Q2: "R-SHARED-WORD",
  Q3: "R-UNNAMED-ADAPTER",
  Q4: "R-JOINT-CAPACITY",
};

interface Residual {
  readonly id: string;
  readonly name: string;
  readonly members: readonly { readonly id: string; readonly text: string }[];
}
/** The text residuals (Q1-Q3): each member is a planted src text the reading stays quiet on. */
const RESIDUALS: readonly Residual[] = [
  {
    id: "Q1",
    name: "R-COMPOSED",
    members: [
      { id: "concatenated", text: 'export const name = "Graph" + "DataIR";\n' },
      { id: "commented", text: 'export const name = "Graph/* */DataIR";\n' },
      { id: "escaped", text: 'export const name = "\\u0047raphDataIR";\n' },
      { id: "homoglyph", text: `export const name = "Gr${CYRILLIC_A}phDataIR";\n` },
      { id: "joined", text: 'export const name = ["training", "export"].join("-");\n' },
      { id: "slashed", text: 'export const at = "graph/data/ir";\n' },
      { id: "middle-dot", text: `export const name = "graph${MIDDLE_DOT}data${MIDDLE_DOT}ir";\n` },
      { id: "minus-sign", text: `export const name = "Graph${MINUS_SIGN}Data${MINUS_SIGN}IR";\n` },
    ],
  },
  {
    id: "Q2",
    name: "R-SHARED-WORD",
    members: [
      { id: "capacity", text: "const capacity = Math.max(1, rows);\n" },
      { id: "eligible", text: "// the eligible entry keeps FIFO within each pool\n" },
    ],
  },
  {
    id: "Q3",
    name: "R-UNNAMED-ADAPTER",
    members: [{ id: "unnamed", text: "export const legalPairs = (agents, tasks) => agents.flatMap(agent => tasks.filter(task => task.load <= agent.capacity));\n" }],
  },
];
/** Q4's member: one capacity-2 agent with three load-1 legal pairs; the per-pair support holds all three. */
const JOINT_CASE: Case = {
  id: "joint-capacity",
  basis: basisOf(
    "joint-capacity",
    [{ id: "a-pair", capacity: 2, grants: ["fixture:read"] }],
    [
      { id: "t-read-1", capability: "fixture.support-read", load: 1 },
      { id: "t-read-2", capability: "fixture.support-read", load: 1 },
      { id: "t-read-3", capability: "fixture.support-read", load: 1 },
    ],
  ),
  legal: ["a-pair/t-read-1", "a-pair/t-read-2", "a-pair/t-read-3"],
};
/** Every residual family's member ids, Q4's member the joint case. */
const RESIDUAL_MEMBERS: Readonly<Record<string, readonly string[]>> = { ...Object.fromEntries(RESIDUALS.map(family => [family.id, family.members.map(member => member.id)])), Q4: [JOINT_CASE.id] };

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly mutants: readonly string[];
  readonly witnesses: Readonly<Record<string, unknown>>;
  /** Each pin's assertion count at the end of its test (`${pin}:${count}`), in row order. */
  readonly assertions: readonly string[];
  readonly tests: readonly string[];
  readonly producer: {
    readonly repo: string;
    readonly sha: string;
    readonly lines: readonly { readonly path: string; readonly blob: string; readonly line: number; readonly text: string }[];
  };
}
interface SealedRoster {
  /** The parsed roster file, its witnesses a sealed view. */
  readonly roster: Roster;
  /** The suite's read of the witnesses: the view opens while the reader runs (synchronously) and at no other time. */
  readonly read: <T>(reader: (witnesses: Roster["witnesses"]) => T) => T;
}
/** The echo guard's refusal: a roster witness read outside the runner's own reads. */
const sealError = (property: string | symbol): Error => new Error(`the roster witness ${String(property)} was read outside the runner's own reads (the echo guard)`);
/**
 * A parsed roster file, sealed (the echo guard): a property get or a property descriptor taken through its witnesses
 * throws unless the returned read is running, and no unsealed copy of the witnesses is kept. The suite calls it once,
 * inside its own callback, so no pin's case (IMPL, declared outside the suite) can name the roster or its read.
 */
function sealedRoster(file: Roster): SealedRoster {
  let open = false;
  const witnesses = new Proxy(file.witnesses, {
    get: (target, property, receiver): unknown => {
      if (!open) throw sealError(property);
      return Reflect.get(target, property, receiver);
    },
    getOwnPropertyDescriptor: (target, property): PropertyDescriptor | undefined => {
      if (!open) throw sealError(property);
      return Reflect.getOwnPropertyDescriptor(target, property);
    },
  });
  function read<T>(reader: (view: Roster["witnesses"]) => T): T {
    open = true;
    try {
      return reader(witnesses);
    } finally {
      open = false;
    }
  }
  return { roster: { ...file, witnesses }, read };
}
const mutantLine = (mutant: Mutant): string => `${mutant.id}:${mutant.name}:${mutant.refusedBy.join("+")}`;

// ---- the pins ----

const baseCatalog = (): Catalog => catalogOf(fixtureRegistry().registry);
const supportKeys = (adapter: Adapter, entry: Case, catalog: Catalog): string[] | null => {
  const outcome = adapter.enumerate(entry.basis, catalog);
  return outcome.ok ? outcome.ir.pairs.map(key) : null;
};
/** Every capacity kind, in capacityKind's order; only zero and known are hard known. */
const CAPACITY_KINDS = ["unknown", "not-a-number", "unbounded", "fraction", "unsafe", "negative", "zero", "known"] as const;
type CapacityKind = (typeof CAPACITY_KINDS)[number];
const HARD_KNOWN_KINDS: readonly CapacityKind[] = ["zero", "known"];
/** A capacity's kind ("unsafe": an integer past the safe range). */
const capacityKind = (capacity: Capacity): CapacityKind => {
  if (capacity === "unknown") return "unknown";
  if (Number.isNaN(capacity)) return "not-a-number";
  if (!Number.isFinite(capacity)) return "unbounded";
  if (!Number.isInteger(capacity)) return "fraction";
  if (!Number.isSafeInteger(capacity)) return "unsafe";
  if (capacity < 0) return "negative";
  return capacity === 0 ? "zero" : "known";
};
const ROTATE: Readonly<Record<EffectClass, EffectClass>> = { read: "write", write: "external", external: "unknown", unknown: "read" };

const IMPL: Readonly<Record<string, () => unknown>> = {
  A1a: () => {
    const shapes = CASES.map(entry => ({ id: entry.id, agents: entry.basis.agents.map(agent => `${agent.id}:${capacityKind(agent.capacity)}:${agent.grants.length}`) }));
    for (const entry of CASES) expect(entry.basis.agents.length, `${entry.id} holds agents`).toBeGreaterThan(0);
    const kinds = [...new Set(CASES.flatMap(entry => entry.basis.agents.map(agent => capacityKind(agent.capacity))))].sort();
    expect(kinds, "the fixtures hold an agent of every capacity kind").toEqual([...CAPACITY_KINDS].sort());
    const disagree = CASES.flatMap(entry =>
      entry.basis.agents.filter(agent => knownCapacity(agent.capacity) !== HARD_KNOWN_KINDS.includes(capacityKind(agent.capacity))).map(agent => `${entry.id}/${agent.id}`),
    );
    expect(disagree, "each fixture agent's capacity is hard known exactly when its kind is zero or known").toEqual([]);
    expect(new Set(CASES.map(entry => entry.basis.agents.length)).size, "N differs across the fixtures").toBeGreaterThan(1);
    expect(
      CASES.every(entry => entry.basis.agents.every(agent => Array.isArray(agent.grants))),
      "every agent carries its grants",
    ).toBe(true);
    return { shapes, kinds, disagree };
  },
  A1b: () => {
    const catalog = baseCatalog();
    const support = Object.fromEntries(CASES.map(entry => [entry.id, supportKeys(REFERENCE, entry, catalog)]));
    expect(support, "each case's support is exactly its legal pairs").toEqual(Object.fromEntries(CASES.map(entry => [entry.id, [...entry.legal]])));
    const judged = Object.fromEntries(JUDGED.map(entry => [entry.name, legalFindings(entry.adapter, catalog)]));
    for (const [name, findings] of Object.entries(judged)) expect(findings, `${name} meets K-LEGAL`).toEqual([]);
    const mutants = mutantReadings("K-LEGAL", catalog);
    for (const [id, findings] of mutants) expect(findings.length, `${id} is refused by K-LEGAL`).toBeGreaterThan(0);
    const empty = caseOf("empty-support");
    const near = Object.fromEntries(LOOSE_MATCHING.map(entry => [entry.id, (supportKeys(mutantOf(entry.id).adapter, empty, catalog) ?? []).filter(pair => pair.startsWith("a-near/"))]));
    expect(
      Object.entries(near)
        .filter(([, pairs]) => !pairs.includes("a-near/t-open") || !(pairs.includes("a-near/t-read") || pairs.includes("a-near/t-write")))
        .map(([id]) => id),
      "each grant-matching mutant gains a-near a pair through an explicit permission and through the open capability's exact invoke:<id>",
    ).toEqual([]);
    const required = requiredGrants(catalog);
    expect(
      LOOSE_MATCHING.map(entry => entry.kind),
      "one grant-matching mutant per NEAR_GRANTS kind, in NEAR_GRANTS order",
    ).toEqual([...new Set(NEAR_GRANTS.map(([kind]) => kind))]);
    expect(
      LOOSE_MATCHING.filter(entry => !NEAR_GRANTS.every(([kind, grant]) => kind !== entry.kind || standsIn(entry, grant, required).length > 0)).map(entry => entry.id),
      "each grant-matching mutant's matcher accepts every near grant of its declared kind",
    ).toEqual([]);
    const kinds = Object.fromEntries(LOOSE_MATCHING.map(entry => [entry.id, [...new Set(NEAR_GRANTS.filter(([, grant]) => standsIn(entry, grant, required).length > 0).map(([kind]) => kind))]]));
    const through = Object.fromEntries(
      LOOSE_MATCHING.map(entry => [entry.id, NEAR_GRANTS.flatMap(([kind, grant]) => standsIn(entry, grant, required).map(need => `${kind}:${JSON.stringify(grant)}->${need}`))]),
    );
    return { support, judged, mutants, near, required, kinds, through };
  },
  A2a: () => {
    const records = RECORDS.map(record => ({ id: record.id, kind: record.source.kind, admitted: record.source.admitted.map(key) }));
    expect(RECORDS.map(record => record.source.kind), "an admission and a reconcile record").toEqual(["mw.training-export.v1", "reconcile-verdict"]);
    const legalPairs = new Set(caseOf("five-agents").legal);
    const outside = RECORDS.map(record => [record.id, record.source.admitted.map(key).filter(pair => !legalPairs.has(pair))] as const);
    for (const [id, pairs] of outside) expect(pairs.length, `${id} admits a pair outside the legal support`).toBeGreaterThan(0);
    return { records, outside };
  },
  A2b: () => {
    const catalog = baseCatalog();
    const outcomes = Object.fromEntries(RECORDS.map(record => [record.id, REFERENCE.enumerate(record.source, catalog)]));
    expect(outcomes, "each record fed as the support is the typed refusal").toEqual({
      "training-export-admission": { ok: false, code: "support-source", source: "mw.training-export.v1" },
      "reconcile-verdict": { ok: false, code: "support-source", source: "reconcile-verdict" },
    });
    const judged = Object.fromEntries(JUDGED.map(entry => [entry.name, sourceFindings(entry.adapter, catalog)]));
    for (const [name, findings] of Object.entries(judged)) expect(findings, `${name} meets K-SOURCE`).toEqual([]);
    const mutants = mutantReadings("K-SOURCE", catalog);
    for (const [id, findings] of mutants) expect(findings.length, `${id} is refused by K-SOURCE`).toBeGreaterThan(0);
    return { outcomes, judged, mutants };
  },
  A3a: () => {
    const catalog = baseCatalog();
    const revisions = CASES.map(entry => {
      const outcome = REFERENCE.enumerate(entry.basis, catalog);
      return { id: entry.id, carried: outcome.ok ? outcome.ir.basisRevision : null, basis: entry.basis.revision };
    });
    for (const entry of revisions) expect(entry.carried, `${entry.id}'s IR carries its basis revision`).toBe(entry.basis);
    expect(new Set(CASES.map(entry => entry.basis.revision)).size, "every case has its own revision").toBe(CASES.length);
    const judged = Object.fromEntries(JUDGED.map(entry => [entry.name, irFindings(entry.adapter, catalog)]));
    for (const [name, findings] of Object.entries(judged)) expect(findings, `${name} meets K-IR`).toEqual([]);
    const dropped = irFindings(mutantOf("M16").adapter, catalog);
    expect(dropped.length, "a dropped revision is refused").toBe(CASES.length);
    return { revisions, judged, dropped };
  },
  A3b: () => {
    const catalog = baseCatalog();
    const counts = CASES.map(entry => {
      const outcome = REFERENCE.enumerate(entry.basis, catalog);
      return { id: entry.id, count: outcome.ok ? outcome.ir.count : null, pairs: outcome.ok ? outcome.ir.pairs.length : null, legal: entry.legal.length };
    });
    for (const entry of counts) expect([entry.count, entry.pairs], `${entry.id}'s IR counts its pairs`).toEqual([entry.legal, entry.legal]);
    const grid = irFindings(mutantOf("M17").adapter, catalog);
    expect(grid.length, "a count of the whole grid is refused").toBe(CASES.length);
    return { counts, grid };
  },
  A4a: () => {
    const catalog = baseCatalog();
    const live = srcFindings(liveSrc().entries, SITES);
    expect(SITES, "no src adapter is registered: the gate has not fired").toEqual([]);
    expect(live, "no src module names the vocabulary").toEqual([]);
    const plant: Entry = { path: "src/workbench/gp-support.ts", text: "export interface GraphDataIR {\n  readonly support: readonly string[];\n}\n" };
    const site: Site = { path: plant.path, adapter: REFERENCE };
    const armed = {
      unregistered: srcFindings([plant], []),
      registered: srcFindings([plant], [site]),
      stale: srcFindings([], [site]),
      twice: srcFindings([plant], [site, site]),
      pathOnly: srcFindings([{ path: "src/workbench/sampler.ts", text: "export const supportOf = 1;\n" }], []),
      judged: refusing(judge(site.adapter, catalog)),
    };
    expect(armed, "the armed registrations").toEqual({
      unregistered: ["src/workbench/gp-support.ts: names GraphDataIR, no SITES registration"],
      registered: [],
      stale: ["src/workbench/gp-support.ts: registered, names no vocabulary word (stale)"],
      twice: ["src/workbench/gp-support.ts: registered twice"],
      pathOnly: ["src/workbench/sampler.ts: names sampler, no SITES registration"],
      judged: [],
    });
    return { sites: SITES.map(entry => entry.path), live, armed };
  },
  A4b: () => {
    const { entries, unread } = liveSrc();
    expect(unread, "every listed src path is a regular file the reading read").toEqual([]);
    const floor = entries.length >= SRC_FLOOR;
    expect(floor, "the src floor").toBe(true);
    const anchor = entries.find(entry => entry.path === SRC_ANCHOR.path)?.text.includes(SRC_ANCHOR.token) ?? false;
    expect(anchor, "the listing read the registry module").toBe(true);
    const words = entries.flatMap(entry => entryWords(entry).map(word => `${entry.path}: ${word}`));
    expect(words, "src names no vocabulary word").toEqual([]);
    const controls = Object.fromEntries(VOCABULARY_CONTROLS.map(([label, text]) => [label, namedWords(text)]));
    const scratch = makeScratch("wb-e661-listing-");
    let listing: unknown = null;
    try {
      execFileSync("git", ["init", "-q"], { cwd: scratch });
      writeFileSync(join(scratch, ".gitignore"), "*.log\n");
      mkdirSync(join(scratch, "src", "nested"), { recursive: true });
      writeFileSync(join(scratch, "src", "nested", "planted.ts"), "export const graphDataIr = 1;\n");
      writeFileSync(join(scratch, "src", "ignored.log"), "GraphDataIR\n");
      writeFileSync(join(scratch, "src", "quiet.ts"), "export const capacity = 1;\n");
      symlinkSync(join("nested", "planted.ts"), join(scratch, "src", "link.ts"));
      const listed = gitList(scratch, "src");
      const read = entriesOf(scratch, listed);
      listing = { listed, findings: srcFindings(read.entries, []), unread: read.unread };
    } finally {
      removeScratch(scratch);
    }
    expect(listing, "untracked files are listed and read, ignored files never, and a listed link is unread, never skipped").toEqual({
      listed: ["src/link.ts", "src/nested/planted.ts", "src/quiet.ts"],
      findings: ["src/nested/planted.ts: names GraphDataIR, no SITES registration"],
      unread: ["src/link.ts"],
    });
    return { unread, floor, anchor, words, controls, listing };
  },
  A5a: () => {
    const catalog = baseCatalog();
    const candidates = CASES.map(entry => {
      const support = new Set(supportKeys(REFERENCE, entry, catalog) ?? []);
      const all = candidatesOf(entry.basis);
      return { id: entry.id, inside: all.filter(candidate => support.has(key(candidate))).length, outside: all.filter(candidate => !support.has(key(candidate))).map(key) };
    });
    for (const entry of candidates) expect(entry.outside.filter(pair => pair.includes("ghost")).length, `${entry.id} judges both ghosts`).toBe(2);
    expect(
      candidates.map(entry => entry.inside),
      "every legal pair is a candidate inside the support",
    ).toEqual(CASES.map(entry => entry.legal.length));
    return { candidates };
  },
  A5b: () => {
    const catalog = baseCatalog();
    const five = caseOf("five-agents");
    const outcome = REFERENCE.enumerate(five.basis, catalog);
    const ir: SupportIR = outcome.ok ? outcome.ir : { basisRevision: "", count: 0, pairs: [] };
    const samples = [
      { agent: "a-reader", task: "t-write" },
      { agent: "a-ghost", task: "t-read" },
      { agent: "a-reader", task: "t-ghost" },
      { agent: "a-reader", task: "t-read" },
    ].map(candidate => [key(candidate), REFERENCE.admit(ir, candidate)] as const);
    expect(samples, "outside the support is the typed refusal; inside is admitted").toEqual([
      ["a-reader/t-write", { admitted: false, code: "outside-support", agent: "a-reader", task: "t-write" }],
      ["a-ghost/t-read", { admitted: false, code: "outside-support", agent: "a-ghost", task: "t-read" }],
      ["a-reader/t-ghost", { admitted: false, code: "outside-support", agent: "a-reader", task: "t-ghost" }],
      ["a-reader/t-read", { admitted: true }],
    ]);
    const judged = Object.fromEntries(JUDGED.map(entry => [entry.name, outsideFindings(entry.adapter, catalog)]));
    for (const [name, findings] of Object.entries(judged)) expect(findings, `${name} meets K-OUTSIDE`).toEqual([]);
    const mutants = mutantReadings("K-OUTSIDE", catalog);
    for (const [id, findings] of mutants) expect(findings.length, `${id} is refused by K-OUTSIDE`).toBeGreaterThan(0);
    return { samples, judged, mutants };
  },
  S1: async () => {
    const doc = assertDocLine(5);
    const { registry, calls } = fixtureRegistry();
    const catalog = catalogOf(registry);
    const tally: Record<string, number> = {};
    const fromRegistry: Record<string, string[]> = {};
    const parity: string[] = [];
    for (const entry of CASES) {
      const pairs: string[] = [];
      for (const agent of entry.basis.agents) {
        for (const task of entry.basis.tasks) {
          const decision = await decide(registry, task.capability, agent.grants);
          tally[decision] = (tally[decision] ?? 0) + 1;
          if ((decision === "permitted") !== permits(catalog, task.capability, agent.grants)) parity.push(`${entry.id}: ${agent.id}/${task.id} ${decision}`);
          if (decision === "permitted" && fits(agent, task)) pairs.push(`${agent.id}/${task.id}`);
        }
      }
      fromRegistry[entry.id] = pairs;
    }
    expect(fromRegistry, "the registry's own decisions under hard known capacity give each case's legal pairs").toEqual(Object.fromEntries(CASES.map(entry => [entry.id, [...entry.legal]])));
    expect(parity, "the reference's permission bit is the registry's dispatch decision for every agent and task").toEqual([]);
    expect(calls.length, "a refused invocation never reached a provider").toBe(tally.permitted ?? 0);
    return { doc, tally, fromRegistry, parity, providerCalls: calls.length };
  },
  S2: async () => {
    const docs = [assertDocLine(15), assertDocLine(28)];
    const base = fixtureRegistry();
    const rotated = fixtureRegistry(capability => ROTATE[capability.effectClass]);
    const effects = CAPABILITIES.map(capability => `${capability.id}:${base.registry.effectClassOf(capability.id)}->${rotated.registry.effectClassOf(capability.id)}`);
    const changed: string[] = [];
    for (const entry of CASES) {
      for (const agent of entry.basis.agents) {
        for (const task of entry.basis.tasks) {
          const before = await decide(base.registry, task.capability, agent.grants);
          const after = await decide(rotated.registry, task.capability, agent.grants);
          if (before !== after) changed.push(`${entry.id}: ${agent.id}/${task.id} ${before}->${after}`);
        }
      }
    }
    const baseCatalogRead = catalogOf(base.registry);
    const rotatedCatalog = catalogOf(rotated.registry);
    const moved = CASES.filter(entry => !isDeepStrictEqual(supportKeys(REFERENCE, entry, baseCatalogRead), supportKeys(REFERENCE, entry, rotatedCatalog))).map(entry => entry.id);
    const held = CASES.map(entry => supportKeys(REFERENCE, entry, rotatedCatalog)?.length ?? 0);
    expect(changed, "rotating every effect class changes no registry decision").toEqual([]);
    expect(moved, "and no support").toEqual([]);
    expect(held, "the unchanged supports are the legal ones, not empty").toEqual(CASES.map(entry => entry.legal.length));
    return { docs, effects, changed, moved, held };
  },
  S3: async () => {
    const doc = assertDocLine(73);
    const { registry } = fixtureRegistry();
    const five = caseOf("five-agents");
    const reader = five.basis.agents.find(agent => agent.id === "a-reader");
    expect(reader, "the read-only agent").toBeDefined();
    const grants = reader?.grants ?? [];
    const known = registry.discover({ grants }).map(descriptor => descriptor.id);
    const writes = CAPABILITIES.filter(capability => capability.effectClass === "write").map(capability => capability.id);
    const decisions = await Promise.all(writes.map(async capability => [capability, await decide(registry, capability, grants)] as const));
    const writeTasks = new Set(TASKS.filter(task => writes.includes(task.capability)).map(task => task.id));
    const own = (supportKeys(REFERENCE, five, catalogOf(registry)) ?? []).filter(pair => pair.startsWith("a-reader/"));
    const held = own.filter(pair => writeTasks.has(pair.slice("a-reader/".length)));
    expect(known, "the read-only agent knows the write capability's id").toContain("fixture.support-write");
    expect(decisions, "and the registry refuses it the invocation").toEqual([["fixture.support-write", "authorization"]]);
    expect(held, "so the support holds no pair of it on a write capability").toEqual([]);
    expect(own, "while it keeps its read pair").toEqual(["a-reader/t-read"]);
    return { doc, known, decisions, own, held };
  },
  P1: async () => {
    const sentence = textOf(PARITY_TEST).includes(PARITY_SENTENCE);
    expect(sentence, "the parity test keeps the narrowing sentence").toBe(true);
    const { registry } = fixtureRegistry();
    const catalog = catalogOf(registry);
    const unpermitted: string[] = [];
    let narrowed = 0;
    for (const entry of CASES) {
      const support = new Set(supportKeys(REFERENCE, entry, catalog) ?? []);
      for (const agent of entry.basis.agents) {
        for (const task of entry.basis.tasks) {
          const permitted = (await decide(registry, task.capability, agent.grants)) === "permitted";
          const pair = `${agent.id}/${task.id}`;
          if (support.has(pair) && !permitted) unpermitted.push(`${entry.id}: ${pair}`);
          if (permitted && !support.has(pair)) narrowed++;
        }
      }
    }
    expect(unpermitted, "every support pair is one the registry permits").toEqual([]);
    expect(narrowed, "and the support narrows the registry decision (capacity leaves permitted pairs out)").toBeGreaterThan(0);
    return { sentence, unpermitted, narrowed };
  },
  P2: () => {
    const row = beadRow(PARITY_BEAD);
    expect(row?.status, `${PARITY_BEAD} is closed in the tracker export`).toBe("closed");
    const parity = row?.title.includes("cross-surface capability authorization parity") ?? false;
    expect(parity, `${PARITY_BEAD} is the parity bead`).toBe(true);
    return { status: row?.status ?? null, parity };
  },
  Q1: () => quietText("Q1"),
  Q2: () => quietText("Q2"),
  Q3: () => quietText("Q3"),
  Q4: () => {
    const catalog = baseCatalog();
    const findings = legalFindings(REFERENCE, catalog, [JOINT_CASE]);
    const support = supportKeys(REFERENCE, JOINT_CASE, catalog);
    expect(findings, "R-JOINT-CAPACITY: the per-pair support is not refused").toEqual([]);
    expect((support?.length ?? 0) > 2, "and holds more pairs than the agent's capacity").toBe(true);
    return { members: RESIDUAL_MEMBERS.Q4, support, findings };
  },
};
/** A text residual's quiet row: every member reads no word, alone and planted as a src module. */
function quietText(id: string): unknown {
  const family = RESIDUALS.find(entry => entry.id === id);
  expect(family, `${id} is a residual family`).toBeDefined();
  const members = family?.members ?? [];
  expect(members.length, `${id} has members`).toBeGreaterThan(0);
  const findings = members.flatMap(member => [...namedWords(member.text), ...srcFindings([{ path: `src/workbench/zz-${member.id}.ts`, text: member.text }], [])]);
  expect(findings, `${family?.name ?? id}: every member is quiet`).toEqual([]);
  return { name: family?.name ?? null, members: members.map(member => member.id), findings };
}

const REACHED: { readonly pin: string; readonly same: boolean }[] = [];
/** Each pin's assertion count at the end of its test, recorded by the runner (`${pin}:${count}`). */
const ASSERTED: string[] = [];
/** The assertions a pin's case must make of its own. */
const OWN_FLOOR = 1;
/** The runner's copy of a case's returned value (a JSON round trip; undefined copies as null): the witness it compares. */
const copyOf = (raw: unknown): unknown => (raw === undefined ? null : JSON.parse(JSON.stringify(raw)));
/** Runs a pin's case as the runner does: the assertions it makes counted around it (the roster's witnesses stay sealed throughout; only the suite's read opens them). */
async function runCase(implementation: () => unknown): Promise<{ readonly raw: unknown; readonly own: number }> {
  const before = expect.getState().assertionCalls;
  const raw: unknown = await implementation();
  return { raw, own: expect.getState().assertionCalls - before };
}

describe(SUITE, () => {
  /** The roster file, parsed once here, inside the suite: no pin's case (IMPL, declared outside) can name it or its read. */
  const { roster: ROSTER, read: readWitnesses } = sealedRoster(JSON.parse(textOf(ROSTER_PATH)) as Roster);
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: LIVE_BUDGET_MS }, async () => {
        const implementation = IMPL[pin];
        expect(implementation, `${pin} has a case`).toBeDefined();
        const { raw, own } = implementation === undefined ? { raw: undefined, own: 0 } : await runCase(implementation);
        expect(own, `${pin}'s case asserts its own outcome before it returns its witness`).toBeGreaterThanOrEqual(OWN_FLOOR);
        expect(raw, `${pin} returns a witness`).not.toBeUndefined();
        const witness = copyOf(raw);
        const expected = readWitnesses(witnesses => witnesses[pin]);
        REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
        expect(witness, `${pin}'s witness equals the roster's`).toStrictEqual(expected);
        ASSERTED.push(`${pin}:${expect.getState().assertionCalls}`);
      });
    }
  }

  it("rule 16: the rows, the tables and the vocabulary are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A1:2", "A2:2", "A3:2", "A4:2", "A5:2", "S:3", "P:2", "Q:4"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(IMPL), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(CAPABILITIES.map(capability => `${capability.id}:${capability.effectClass}:${capability.permissions.join("+")}`)).toEqual([
      "fixture.support-read:read:fixture:read",
      "fixture.support-write:write:fixture:write",
      "fixture.support-open:read:",
      "fixture.support-dual:external:fixture:read+fixture:write",
    ]);
    expect(TASKS.map(task => `${task.id}:${task.capability}:${task.load}`)).toEqual([
      "t-read:fixture.support-read:1",
      "t-write:fixture.support-write:2",
      "t-open:fixture.support-open:1",
      "t-dual:fixture.support-dual:3",
      "t-missing:fixture.support-missing:1",
    ]);
    expect(CASES.map(entry => `${entry.id}:${entry.basis.agents.length}:${entry.legal.length}`)).toEqual(["five-agents:5:5", "one-agent:1:3", "bounds:6:1", "empty-support:3:0", "invoke-grants:1:1"]);
    expect(RECORDS.map(record => `${record.id}:${record.source.kind}:${record.source.admitted.length}`)).toEqual(["training-export-admission:mw.training-export.v1:2", "reconcile-verdict:reconcile-verdict:1"]);
    expect(MUTANTS.map(mutantLine)).toEqual([
      "M01:capacity-ignored:K-LEGAL",
      "M02:unknown-capacity-unbounded:K-LEGAL",
      "M03:any-number-capacity:K-LEGAL",
      "M04:grant-blind:K-LEGAL",
      "M05:read-effect-ungated:K-LEGAL",
      "M06:discover-grant-invokes:K-LEGAL",
      "M07:unregistered-permitted:K-LEGAL",
      "M08:any-one-permission:K-LEGAL",
      "M09:pair-twice:K-LEGAL",
      "M10:legal-pair-dropped:K-LEGAL",
      "M11:strict-load:K-LEGAL",
      "M12:training-export-as-support:K-SOURCE",
      "M13:reconcile-verdict-as-support:K-SOURCE",
      "M14:untyped-source-refusal:K-SOURCE",
      "M15:source-unnamed:K-SOURCE",
      "M16:revision-dropped:K-IR",
      "M17:count-of-the-grid:K-IR",
      "M18:admit-every-candidate:K-OUTSIDE",
      "M19:untyped-outside-refusal:K-OUTSIDE",
      "M20:refuse-every-source:K-LEGAL+K-IR+K-OUTSIDE",
      "M21:unsafe-integer-capacity:K-LEGAL",
      "M22:invoke-grant-overrides-permissions:K-LEGAL",
      "M23:grant-matched-as-prefix:K-LEGAL",
      "M24:grant-matched-as-suffix:K-LEGAL",
      "M25:grant-matched-case-folded:K-LEGAL",
      "M26:grant-matched-trimmed:K-LEGAL",
      "M27:grant-matched-by-wildcard:K-LEGAL",
      "M28:grant-matched-compatibility-folded:K-LEGAL",
      "M29:grant-matched-when-contained:K-LEGAL",
    ]);
    expect(NEAR_GRANTS.map(([kind, grant]) => `${kind}:${JSON.stringify(grant)}`)).toEqual([
      'prefix:"fixture"',
      'prefix:"invoke"',
      'prefix:"invoke:fixture"',
      'suffix:"read"',
      'suffix:"fixture.support-open"',
      'case:"FIXTURE:READ"',
      'case:"INVOKE:FIXTURE.SUPPORT-OPEN"',
      'padded:" fixture:read"',
      'padded:"fixture:write "',
      'padded:" invoke:fixture.support-open"',
      'padded:"invoke:fixture.support-open "',
      'wildcard:"fixture:*"',
      'wildcard:"invoke:*"',
      `compatibility:"fixture${FULLWIDTH_COLON}read"`,
      `compatibility:"invoke${FULLWIDTH_COLON}fixture.support-open"`,
      'longer:"fixture:reader"',
      'longer:"invoke:fixture.support-opener"',
    ]);
    expect(LOOSE_MATCHING.map(entry => `${entry.id}:${entry.kind}`)).toEqual(["M23:prefix", "M24:suffix", "M25:case", "M26:padded", "M27:wildcard", "M28:compatibility", "M29:longer"]);
    expect(Object.entries(RESIDUAL_MEMBERS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:8", "Q2:2", "Q3:1", "Q4:1"]);
    expect(RESIDUALS.map(family => `${family.id}:${family.name}`)).toEqual(["Q1:R-COMPOSED", "Q2:R-SHARED-WORD", "Q3:R-UNNAMED-ADAPTER"]);
    expect(VOCABULARY.map(word => `${word.id}:${word.spelling}`)).toEqual(["V1:sampler", "V2:training-export", "V3:GraphDataIR", "V4:PRE-SAMPLING"]);
    expect(SHARED_WORDS).toEqual(["capacity", "eligible"]);
    expect(DOCS_LINES.map(entry => `${entry.line}:${entry.cited}:${entry.section}`)).toEqual([
      "5:true:Location and scope",
      "15:true:Proposed capability descriptor",
      "28:false:Proposed capability descriptor",
      "73:true:Conformance tests",
    ]);
    expect(CAPACITY_KINDS).toEqual(["unknown", "not-a-number", "unbounded", "fraction", "unsafe", "negative", "zero", "known"]);
    expect(SITES).toEqual([]);
  });

  it("mutant battery: the reference meets every check, each mutant is refused by exactly its declared checks, and every check refuses a mutant alone", () => {
    const catalog = baseCatalog();
    for (const entry of JUDGED) expect(refusing(judge(entry.adapter, catalog)), `${entry.name} meets every check`).toEqual([]);
    expect(
      MUTANTS.map(mutant => [mutant.id, refusing(judge(mutant.adapter, catalog))]),
      "each mutant is refused by exactly its declared checks",
    ).toEqual(MUTANTS.map(mutant => [mutant.id, [...mutant.refusedBy]]));
    for (const check of CHECKS) {
      const alone = MUTANTS.filter(mutant => mutant.refusedBy.length === 1 && mutant.refusedBy[0] === check).map(mutant => mutant.id);
      expect(alone.length, `${check} refuses a mutant alone`).toBeGreaterThan(0);
    }
  });

  it("the outside anchors: the bead's own row binds the labels of rows A1-A5, S and P and the pin quotes that tile each, the cited docs lines and the filing pin, the vocabulary and the shared words, and the producer block's citations and quotes", { timeout: LIVE_BUDGET_MS }, () => {
    const row = beadRow(BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    const title = row?.title ?? "";
    const notes = row?.notes ?? "";
    expect(title.startsWith(`[${REQUIREMENT}] Gate as R1. `), "the title opens with the requirement id and the gate").toBe(true);
    const label = (id: string): string => ROWS.find(entry => entry.id === id)?.label ?? "-";
    expect(acceptanceClauses(notes), "the acceptance holds four clauses, each exactly one A row's label").toEqual(["A1", "A2", "A3", "A4"].map(label));
    expect(title.endsWith(`; ${label("A5")}.`), "row A5's label ends the statement").toBe(true);
    for (const entry of ROWS.filter(candidate => candidate.id !== "Q")) {
      expect(tiles(entry.label, entry.pins.map(pin => QUOTES[pin] ?? "")), `row ${entry.id}'s pin quotes tile its label`).toBe(true);
    }
    const authority = /grant set \(docs\/workbench\/06-capability-registry\.md:(\d+),:(\d+),:(\d+)@([0-9a-f]{12}) \u2014 (.+?)\) and (.+?)\. No bead /.exec(notes);
    expect(authority?.slice(1, 4).map(Number), "the docs lines are the authority citation's").toEqual(DOCS_LINES.filter(entry => entry.cited).map(entry => entry.line));
    expect(FILING_PIN.startsWith(authority?.[4] ?? "-"), "the filing pin is the citation's").toBe(true);
    expect([authority?.[5], authority?.[6]], "rows S and P are the authority sentence's slices").toEqual([label("S"), label("P")]);
    const search = /\(bd search ((?:'[^']+', )*'[^']+') all 0, open and closed\)/.exec(notes)?.[1] ?? "";
    expect(
      search.split(", ").map(word => word.replace(/^'|'$/g, "")),
      "the shared words and V1-V3 are the filing's search words, in order",
    ).toEqual([...SHARED_WORDS, ...VOCABULARY.slice(0, 3).map(word => word.spelling)]);
    expect(title.includes(`legal ${VOCABULARY[3]?.spelling ?? "-"} support`), "V4 is the statement's word").toBe(true);
    for (const word of VOCABULARY) expect(namedWords(`${title} ${notes}`), `the filing names ${word.spelling}`).toContain(word.spelling);
    const source = /Source: (docs\/programs\/[^:]+)\.md:(\d+) \(.+?\) and :(\d+) \(.+?\) @([0-9a-f]{12}); README\.md:(\d+) and :(\d+) \(.+?\) @([0-9a-f]{12})\./.exec(notes);
    expect(source, "the source citations parse").not.toBeNull();
    const cited = [
      { path: `${source?.[1] ?? "-"}.md`, line: Number(source?.[2]) },
      { path: `${source?.[1] ?? "-"}.md`, line: Number(source?.[3]) },
      { path: `${source?.[1] ?? "-"}/README.md`, line: Number(source?.[5]) },
      { path: `${source?.[1] ?? "-"}/README.md`, line: Number(source?.[6]) },
    ];
    expect(ROSTER.producer.lines.map(entry => ({ path: entry.path, line: entry.line })), "the producer lines are the source citations'").toEqual(cited);
    expect([source?.[4], source?.[7]].every(pin => PRODUCER_PIN.startsWith(pin ?? "-")), "the producer pin is the citations'").toBe(true);
    expect(ROSTER.producer.sha, "the producer block's pin").toBe(PRODUCER_PIN);
    const quoted = [...(source?.[0] ?? "").matchAll(/\((?:GP )?'(.+?)'\)/g)].map(match => match[1] ?? "");
    expect(quoted.length, "the citations quote the producer twice").toBe(2);
    const producerText = ROSTER.producer.lines.map(entry => entry.text).join("\n");
    for (const quote of quoted) expect(producerText, `the producer block carries '${quote}'`).toContain(quote);
  });

  it("roster: the judged rows, the quotes, the residual members, the mutants and the registered tests equal test/fixtures/mw-gp-support-roster.json, in order and both ways; every pin reached its witness compare", async ({ task }) => {
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
    expect(Object.keys(QUOTES), "in the roster's order").toEqual(Object.keys(ROSTER.quotes));
    expect(RESIDUAL_MEMBERS, "the residual members equal the roster's").toEqual(ROSTER.residuals);
    expect(Object.keys(RESIDUAL_MEMBERS), "in the roster's order").toEqual(Object.keys(ROSTER.residuals));
    expect(MUTANTS.map(mutantLine), "the mutants and their declared checks equal the roster's").toEqual(ROSTER.mutants);
    expect(
      readWitnesses(witnesses => Object.keys(witnesses)),
      "one roster witness per pin, in row order",
    ).toEqual(ROWS.flatMap(row => row.pins));
    expect(ROSTER.assertions.map(entry => entry.split(":")[0]), "one roster assertion count per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    await expect(
      runCase(() => ROSTER.witnesses.A1a),
      "the echo guard: a case that reads its roster witness through the view throws",
    ).rejects.toThrow("the roster witness A1a was read outside the runner's own reads");
    expect((await runCase(() => ({ copied: true }))).own, "the echo guard: a case returning a copied witness makes no assertion of its own").toBeLessThan(OWN_FLOOR);
    await expect(
      runCase(() => Object.getOwnPropertyDescriptor(ROSTER.witnesses, "A1a")),
      "the echo guard: a case that reads a witness's property descriptor through the view throws",
    ).rejects.toThrow("the roster witness A1a was read outside the runner's own reads");
    expect(
      () => ROSTER.witnesses.A1a,
      "the echo guard: the view is sealed outside the runner's own reads, so a read at module load or between cases throws",
    ).toThrow("the roster witness A1a was read outside the runner's own reads");
    const deferred = await runCase(() => ({ toJSON: () => ROSTER.witnesses.A1a }));
    expect(
      () => copyOf(deferred.raw),
      "the echo guard: a read deferred into the returned value (its toJSON), which the runner's copy calls, throws",
    ).toThrow("the roster witness A1a was read outside the runner's own reads");
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(
      REACHED.map(entry => entry.pin),
      "every pin reached its witness compare, in row order",
    ).toEqual(ROWS.flatMap(row => row.pins));
    expect(
      REACHED.filter(entry => !entry.same).map(entry => entry.pin),
      "and each compare held",
    ).toEqual([]);
    expect(ASSERTED, "every pin reached its end with the roster's assertion count, its witness compare included, in row order").toEqual(ROSTER.assertions);
  });
});
