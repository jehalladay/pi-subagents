/**
 * wb-ojm5.2 (GPC-GRAPH-NATIVE-LLM-RLP-R2, program-triage-2026-10-22, epic wb-ojm5): the GP cache scope census. Statement (the
 * bead title, untrimmed): "No Pi surface shall reuse cached GP scores, embeddings or posteriors across a source scope boundary,
 * and Pi shall invalidate any such cache on graph/source revision change or permission change/revocation, carrying provenance
 * and tenant scope in every cached object (posture; no gating artifact, no GP cache exists in Pi today)" - GraphPolicyCLI
 * docs/programs/graph-native-llm-rlp-2026-10-18/14-sparse-query-design-and-bayesian-certification.md:13 at 0107c72992f3.
 * Acceptance (the owner filing's, verbatim; each clause is exactly one row label below): "(a) a GP cache key omitting source
 * scope, source revision or permission basis cannot be constructed, and every cached object carries provenance and tenant
 * scope; (b) after a permission revocation or source revision bump a lookup under the prior key returns miss/invalidated, never
 * the old score, embedding or posterior; (c) a lookup from another scope never returns a cached GP object." Posture (the
 * filing's "Not P0" sentence, verbatim in row D's label): "no such cache exists, nothing is live-false; the pin binds the first
 * GP cache".
 *
 * MEASURED BY THE CUTTING SEAT (ws-01, run g10-work-s58, 2026-10-23; read-only `git show` / `git grep` in the local
 * GraphPolicyCLI checkout at the pin 0107c72992f35cf6832a37615a25c7df45747ebc, no fetch; the roster carries every line verbatim
 * with its blob id): 14:13 ends with the quote ("The host executes effects, checks current permissions and invalidates stale
 * posteriors/embeddings."); 01:16 is GLLM-104 ("no embedding cache reuse across source scope boundary; cache invalidation on
 * graph revision or permission changes."); 06:21 carries "Carry provenance and tenant scope in every cached object."; 06:12 lists
 * "redaction/embedding cache cross-scope rejection"; 13:20 "source permission revocation must invalidate cached scores"; 12:24
 * "do not cache across revoked permission/version without invalidation"; 10:21 and 11:20 key E0 embedding caches by scope and
 * source revision. 15:18 names a SOURCE_INVALIDATE port message; `git grep -l SOURCE_INVALIDATE` at the pin lists that document
 * only, no file under ts/, python/ or fixtures/ (the filing's "PROPOSED design, 0 hits"): GP ships no invalidation signal for a
 * Pi cache to follow, so the host's own revision and permission observations are the triggers, which is how the reference below
 * is driven. AT PI BASE feebb63 (the trunk tip at claim): no module below src, qa or examples reaches GraphPolicyCLI (the landed
 * scanner of test/helpers/gp-fallback-census.ts reads 0 touchpoints and no identifier or literal spells graph policy as words);
 * the cached-output words are spelled only by src/model-resolver.ts (Pi's own model ranking: bestScore, score) and
 * src/workflow/tool-description.ts (prose: "score with parallel judges"), neither of which holds a cache shape, and the three
 * "bidi embedding" mentions are doc comments, which are not read; 56 modules hold a cache shape (src 46, qa 10),
 * src/workbench/evidence-loader.ts among them, whose cacheKey (line 86, the filing's cited line, unchanged since d75b68d)
 * composes scope.workspace and scope.principal.
 *
 * Pi has no GP cache today, so the posture holds by absence and (a)-(c) are armed on a test-side REFERENCE, the contract the
 * first GP cache must meet, its JUDGES and their MUTANTS, beside the walk that keeps the absence true and binds the first one:
 *  ReferenceGpCache.key mints a frozen key only from a source scope (workspace and principal), a source revision, a permission
 *    basis, a kind (score, embedding or posterior) and a subject, refusing every omission with a typed refusal that names the
 *    part; put and get accept only a key this cache minted, so a hand-built key that omits a part cannot be used. put stores a
 *    frozen copy and refuses an object without provenance (producer, checkpoint and receipt) or tenant scope, or whose tenant
 *    scope is not its key's scope. revise (a source revision the host observed) and revoke (a permission basis the host
 *    withdrew) purge the scope's stale slots, remember the change (a late put under the prior key is refused) and read the prior
 *    key as invalidated. get answers only the key's own scope, and slots are keyed by the JSON of every part, so two scopes whose
 *    parts concatenate alike never share one.
 *  The judges (RULES): fifteen rules, each a scenario over a fresh cache; fourteen take their term verbatim from one acceptance
 *    clause and H-AFTER is the liveness control (a cache still serves after a change). An adopter's cache is judged by outcome
 *    only: any thrown error is a refusal and any non-hit satisfies (a) and (c), but (b)'s lookup must RETURN a miss or an
 *    invalidated (the clause's "returns miss/invalidated": a throw returns neither); a setup step that throws violates the rule (a
 *    cache that stores nothing proves nothing).
 *  The mutants (DEFECTS), twenty-two, each the reference with one guard switched off and refused by the rules the roster pins for
 *    it: key-scope-, key-revision- and key-basis-unchecked mint without that part; key-forgeable lets put and get use a hand-built
 *    key; provenance-unchecked, tenant-unchecked and tenant-foreign skip that check at put; stored-by-reference keeps the caller's
 *    object; revision- and permission-ignored drop the change; -unpurged record it (a late put is refused) but let stale slots
 *    serve; -forgotten purge the stale slots but do not record it (a late put serves); revision-skips-scores and
 *    permission-skips-embeddings leave one kind out of the change; stale-lookup-throws throws where it should return
 *    invalidated; slot-without-principal and slot-joined drop the principal from the slot or join its parts unseparated;
 *    requester-ignored serves any requester; never-hit and disabled-after-change fail liveness.
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the reference key: every omission refused by name, a complete set minted frozen, a hand-built key
 *    refused at put and get; A2 every cached object: provenance and tenant scope required, a foreign tenant refused, the stored
 *    copy carried verbatim and frozen past an edit of the caller's object; A3 the (a) rules pass the reference and refuse their
 *    mutants, each by exactly its rules.
 *  B, acceptance (b). B1 a source revision bump, per kind: the prior key and a re-minted prior key invalidated, a late put
 *    refused, the new revision served, another scope untouched; B2 a permission revocation, the same per kind, another basis
 *    served; B3 the (b) rules on the reference and their mutants.
 *  C, acceptance (c). C1 another scope (its principal, its workspace, both, and a pair whose parts concatenate alike) and a
 *    foreign requester holding the owner's key never get the object; C2 the (c) rules on the reference and their mutants.
 *  D, the posture. D1 the walk: every module below WALK_ROOTS read as tokens (the src walk equals the tsconfig program's file
 *    set; qa and examples above their floors); a module that reaches GraphPolicyCLI (the landed touchpoint scanner, or graph
 *    policy spelled as words) or spells a cached-output word (a KIND as a word, singular or plural; identifiers and literals
 *    split into words at case, separator and letter-digit boundaries), and holds a cache shape (a Map or WeakMap construction,
 *    by name or as a property such as globalThis.Map, or a cache-named identifier), is FLAGGED and must be bound in GP_CACHES, and every binding must
 *    name a flagged module (empty both ways today), with the cache detector's floor, its anchor (the evidence store, quiet, and
 *    its cacheKey scope-keyed) and flagged and quiet controls; D2 every bound cache passes every rule (none bound today; the same
 *    judge over the reference and the mutants is the non-vacuity control: the reference passes, every mutant is refused, the
 *    two liveness mutants by H-AFTER); D3 the judges' reading of the reference's choices (CHOICES): every one of the ADOPTERS
 *    making a choice otherwise is held to the rules that refuse it - independent designs (opaque-token or record keys, no subject
 *    part, no kind check at put, no purge, a stale key read as miss, a provenance field read leniently) run through every rule -
 *    so the provenance triple reads bound by A-PROVENANCE exactly as far as PROVENANCE_CASES reads it, and the fields' type and
 *    every other choice free (see SCOPE).
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * OUTSIDE ANCHOR (the tracked bead export, .beads/issues.jsonl row wb-ojm5.2, read only through the OWNER FILING: the row's
 * notes through their first "Not P0:" line, so a lane's delivery or refusal note appended later changes nothing read, which the
 * first case pins against an appended note restating another quote, pins, authority, port, acceptance and posture): the labels
 * of rows A to D equal the filing's clauses and posture sentence (parsed, not quoted here), the statement is the bead title, the
 * quote, its file and line, the authority sentences, the merged pins and the SOURCE_INVALIDATE line are the roster's producer
 * lines, and the
 * reference's vocabulary is parsed from the clauses: KEY_PARTS from (a)'s "omitting ... cannot be constructed", OBJECT_PARTS
 * from its "carries ...", CHANGES from (b)'s "after a ... a lookup", KINDS from its "never the old ...", and each parsed part and
 * change is the term of a rule. FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every row, pin
 * witness, constant, rule, defect, residual, adopter, choice and registered test title is held to the out-of-file roster
 * (test/fixtures/gp-cache-scope-roster.json). Not claimed (each measured green by the seat that names it): a pin, rule or defect
 * removed from this file and the roster together (the bead row anchors rows, clauses and terms, not pins, and a term two rules
 * share keeps the other); a root dropped from WALK_ROOTS together with its floor (src is held to tsconfig's program, qa and
 * examples stand on floors); an edit of the judging code itself (the tsconfig comparison replaced by true stays green) - these
 * three by the census's cutting seat; and, by wb-yco1's seat, a residual family removed from every literal of this file and of
 * the roster together (its RESIDUALS entry, its quiet pin in ROWS, IMPL and the literal, and the roster's rows, tests and
 * constants.residuals: R-NON-MODULE with Q8 stays green), a D1 control removed from CONTROLS and the roster's D1 witness
 * together, and an adopter or a choice removed from ADOPTERS or CHOICES (and from the choices naming it) and the roster together;
 * and, by wb-ne7z's seat, the member grain of the same hollow: a reading removed from a pin's IMPL witness and the roster's
 * witness together, a residual member's quiet reading among them (the gate's P-Q7SUB, digitInside removed from IMPL Q7 and the
 * roster's Q7 witness, stays green, as do Q7's zeroWidth, zeroWidthInside, kind and kindZeroWidth), and one PROVENANCE_CASES
 * member filtered out of the grid with A2's roster refusal for it (green for each member but receipt absent, which D3 reds; a
 * whole half of the grid so removed reds D3) - nothing outside the two files names a residual family, a member reading, a grid
 * member, a control, an adopter or a choice.
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode,
 * not inverted, ran; every pin's case reached its witness compare with the witness equal to the roster's (REACHED: a guarded
 * early return or a swapped matcher leaves a pin unreached, the wb-csbt.3 F2 class).
 * RESIDUALS (named families, each with its pinned quiet row: a sample the walk reads quiet beside a twin it flags):
 * R-VOCABULARY GP's own reply words outside the kinds (logits, probability, log_probability, measured in the pin's ts/src) are not
 * cached-output words (Q1); R-COMPOSED a GP name assembled at run time from parts (Q2); R-INDIRECT a module caching values from a
 * local adapter imported under a generic name (Q3); R-SHAPE a cache held in a plain object, an array, a closure or a Map
 * constructed through an alias (const M = Map), with no cache-named identifier (Q4); R-OUTSIDE test/, docs and the tracker export lie outside WALK_ROOTS (this file and the GP censuses hold GP
 * caches and vocabulary on purpose) (Q5); R-GENERIC-CACHE a GP value handed to a generic Pi cache whose module names no GP word,
 * the EvidenceStore of src/workbench/evidence-loader.ts through a loader registered elsewhere (Q6); R-INTERRUPTED a GP name or a
 * cached-output word spelled with a homoglyph letter, split inside a word by a zero-width character, or interrupted by a digit
 * (graph2policy reads graph, 2, policy; a zero-width split at the name's own word boundary is caught, the word split reading
 * graph, policy, and a digit glued after a word is split off) (Q7); R-NON-MODULE a shell script, JSON or Markdown file below the
 * roots is listed but never judged (Q8).
 * SCOPE: the walk reads presence, not flow: a flagged module may hold a cache that never sees a GP value (its cut binds it and
 * drives it through the judges, or re-measures this census), and score is read even where it is Pi's own (OVER-READ, disclosed:
 * no Pi module spelling it holds a cache shape today). The reference fixes choices the filing leaves open (CHOICES, judged by D3
 * over the ADOPTERS), and the judges BIND one of them: the provenance fields (producer, checkpoint, receipt, after GLLM-103 at
 * 01:15). A-PROVENANCE refuses an object without provenance, and one whose producer, checkpoint or receipt is absent or the empty
 * string (PROVENANCE_CASES, seven cases), so the first GP cache binds only if it refuses each of those - a narrower reading than
 * clause (a)'s "carries provenance": an adopter requiring the producer only, or the producer and the receipt, or accepting an
 * absent receipt (the landing-427 PREP probe's G-receipt-absent-ok), or empty producer and checkpoint keys (its G-keys-present),
 * or every field empty, is refused by exactly A-PROVENANCE, and the same design requiring the triple passes every rule. The
 * judges bind presence and non-emptiness, not type: an adopter accepting any present value but the empty string (null, a number)
 * passes every rule where the reference refuses it (D3, the choice "a string in each provenance field"). The judges require none
 * of the others: the subject part, a kind check at put, invalidated as the prior key's reading, a refusal of even a complete
 * hand-built key, frozen keys the cache minted and a purge at the change. NOT CLAIMED: a revision rolled back to an earlier value
 * (the filing does not say whether its slot may serve again; the reference purged it at the bump, D3's token adopter serves it
 * again, and the judges accept both), a permission basis re-granted under its old name (the reference keeps it revoked), and
 * anything about GP's own caches. No GP cache is added to src and none is faked there.
 *
 * wb-yco1 (the R694 follow-up of landing 336; seat ws-03, run g10-work-s87, 2026-10-25, base 24e0d5b): F1 the header said the
 * judges require none of the reference's choices, the provenance fields among them; D3 made that claim executable and it read red
 * (the adopters requiring the producer only, or the producer and the receipt, are refused by A-PROVENANCE), so SCOPE now states
 * the binding - the gate's second cure; the judges are unchanged. F2 the residual-family form of the coordinated hollow is named
 * in the non-claim. F3 wordsOf splits letter-digit boundaries: the gate's two plants (embedding2Cache and graphPolicy2 beside a
 * Map) read red as D1 controls before the split, and on the real tree the split flags no module and changes no witness. GLLM-103
 * at the pin reads "all receipts include graph schema/revision/scope digest, function/checkpoint digest, numerical profile,
 * backend and target provenance where applicable" (01-requirements-decisions.md:15, blob 407b1ae4b96e, read with git show, no
 * fetch): it names the checkpoint digest and the receipt, not a producer field, so the triple stays the reference's reading.
 *
 * wb-ne7z (hop 3, the last, of the chain wb-ojm5.2 336 -> wb-yco1 427 -> wb-ne7z: the R694 follow-up of the landing-427 gate's
 * F1 and F2, in the R739 TERMINAL enumerate-the-resolvable form under rules 14 and 19(c); seat ws-02, run g10-work-s103,
 * 2026-10-26, base fced7bf). THE CRITERION: A-PROVENANCE and D3's two provenance choices claim exactly the classes below, every
 * class pinned by its rows, never the escapes found so far. F1 CURED: an object (P1) without provenance, or whose producer,
 * checkpoint or receipt is (P2) absent or (P3) the empty string, is refused - PROVENANCE_CASES reads that grid over
 * PROVENANCE_FIELDS (A2's seven refusals), so the gate's two designs are now refused (D3's adopters "an absent receipt accepted"
 * and "empty producer and checkpoint accepted", each by exactly A-PROVENANCE, their readings serving the object their choice
 * lets through), and either half of the grid removed with its roster refusals reds D3 ((P2) through "an absent receipt
 * accepted", (P3) through "empty fields accepted", which only the empty half refuses); (P4) the fields' type is free - an adopter
 * accepting any present value but the empty string passes every rule (D3's "a string in each provenance field", bound to no
 * rule, beside the reference refusing a numeric receipt). D3 holds every adopter of a choice to its bound rules, not only one
 * of them (the landed check read their union), and refuses a choice naming no adopter. F2 DISCLOSED: the member grain of the
 * coordinated hollow is named in the non-claim above; nothing outside the two files names a member reading to anchor it. CHAIN
 * TERMINAL (R739): a later survivor outside these classes is record-only unless it contradicts a claim above.
 *
 * Display paths added: none. Test-only: no process is spawned and no file is written; src, qa, examples, tsconfig.json, the
 * roster and the bead export are only read.
 */
import { readFileSync } from "node:fs";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import type { ObservationScope } from "../src/workbench/observation.js";
import { scanSource, srcFiles } from "./helpers/gp-fallback-census.js";

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const CENSUS_FILE = "test/workbench-gp-cache-scope-census.test.ts";
const ROSTER_FILE = "test/fixtures/gp-cache-scope-roster.json";
const BEAD = "wb-ojm5.2";
/** The program pin every producer line is read at (GraphPolicyCLI at the 2026-10-22 triage). */
const PIN = "0107c72992f35cf6832a37615a25c7df45747ebc";

// ---- the vocabulary, parsed from the filing's clauses and held equal to them (the first case) ----

/** Clause (b)'s "never the old ...": the cached GP outputs. */
const KINDS = ["score", "embedding", "posterior"] as const;
type GpKind = (typeof KINDS)[number];
/** Clause (a)'s "omitting ... cannot be constructed": the parts no key may lack. */
const KEY_PARTS: readonly string[] = ["source scope", "source revision", "permission basis"];
/** Clause (a)'s "carries ...": what every cached object carries. */
const OBJECT_PARTS: readonly string[] = ["provenance", "tenant scope"];
/** Clause (b)'s "after a ... a lookup": the changes after which a prior key never serves. */
const CHANGES: readonly string[] = ["permission revocation", "source revision bump"];
/** The reference's provenance record (its choice: GLLM-103 at 01:15 names the checkpoint digest and the receipt). */
const PROVENANCE_FIELDS = ["producer", "checkpoint", "receipt"] as const;

// ---- the contract the first GP cache owes ----

/** The tenant scope a GP value was computed for: Pi's own observation scope. */
type GpScope = Readonly<ObservationScope>;
interface GpKeyParts {
  readonly scope: GpScope;
  readonly sourceRevision: string;
  readonly permissionBasis: string;
  readonly kind: GpKind;
  readonly subject: string;
}
interface GpProvenance {
  readonly producer: string;
  readonly checkpoint: string;
  readonly receipt: string;
}
interface GpCachedObject {
  readonly kind: GpKind;
  readonly value: JsonValue;
  readonly provenance: GpProvenance;
  readonly tenantScope: GpScope;
}
type GpLookup =
  | { readonly state: "hit"; readonly object: GpCachedObject }
  | { readonly state: "miss" }
  | { readonly state: "invalidated"; readonly reason: "sourceRevision" | "permissionBasis" };
/** A GP cache as the judges drive it: keys and objects arrive untyped (a caller may be JavaScript); a refusal is a throw. */
interface GpCache {
  key(parts: unknown): unknown;
  put(key: unknown, object: unknown): void;
  get(requester: GpScope, key: unknown): GpLookup;
  /** The host observed the scope's source at this revision. */
  revise(scope: GpScope, revision: string): void;
  /** The host withdrew this permission basis for the scope. */
  revoke(scope: GpScope, basis: string): void;
}

type Clause = "a" | "b" | "c" | "control";
interface Rule {
  readonly id: string;
  readonly clause: Clause;
  /** The words the rule judges, verbatim from its clause (null for the liveness control). */
  readonly term: string | null;
}
const RULES: readonly Rule[] = [
  { id: "A-KEY-SCOPE", clause: "a", term: "source scope" },
  { id: "A-KEY-REVISION", clause: "a", term: "source revision" },
  { id: "A-KEY-BASIS", clause: "a", term: "permission basis" },
  { id: "A-KEY-FORGED", clause: "a", term: "cannot be constructed" },
  { id: "A-PROVENANCE", clause: "a", term: "provenance" },
  { id: "A-TENANT", clause: "a", term: "tenant scope" },
  { id: "A-CARRIED", clause: "a", term: "every cached object carries" },
  { id: "B-REVISION", clause: "b", term: "source revision bump" },
  { id: "B-REVISION-LATE", clause: "b", term: "source revision bump" },
  { id: "B-PERMISSION", clause: "b", term: "permission revocation" },
  { id: "B-PERMISSION-LATE", clause: "b", term: "permission revocation" },
  { id: "C-OTHER-SCOPE", clause: "c", term: "another scope" },
  { id: "C-FOREIGN-REQUESTER", clause: "c", term: "a lookup from another scope" },
  { id: "C-JOINED-SCOPE", clause: "c", term: "another scope" },
  { id: "H-AFTER", clause: "control", term: null },
];
/** Each defect switches off exactly one guard of the reference. */
const DEFECTS = [
  "key-scope-unchecked",
  "key-revision-unchecked",
  "key-basis-unchecked",
  "key-forgeable",
  "provenance-unchecked",
  "tenant-unchecked",
  "tenant-foreign",
  "stored-by-reference",
  "revision-ignored",
  "revision-unpurged",
  "revision-forgotten",
  "revision-skips-scores",
  "permission-ignored",
  "permission-unpurged",
  "permission-forgotten",
  "permission-skips-embeddings",
  "stale-lookup-throws",
  "slot-without-principal",
  "slot-joined",
  "requester-ignored",
  "never-hit",
  "disabled-after-change",
] as const;
type Defect = (typeof DEFECTS)[number];

/** A refusal of the reference: the code names the part or the guard that refused. */
class GpCacheRefusal extends Error {
  constructor(readonly code: string) {
    super(`gp cache refused: ${code}`);
    this.name = "GpCacheRefusal";
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const filled = (value: unknown): value is string => typeof value === "string" && value.length > 0;
const scopeId = (scope: GpScope): string => JSON.stringify([scope.workspace, scope.principal]);
const sameScope = (left: GpScope, right: GpScope): boolean => left.workspace === right.workspace && left.principal === right.principal;

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}

interface Slot {
  readonly key: GpKeyParts;
  readonly object: GpCachedObject;
}

/** The reference (see the header); each DEFECTS member, when given, switches off exactly one of its guards. */
class ReferenceGpCache implements GpCache {
  private readonly minted = new WeakSet<object>();
  private readonly slots = new Map<string, Slot>();
  private readonly revisions = new Map<string, string>();
  private readonly revoked = new Map<string, Set<string>>();
  private changed = false;

  constructor(private readonly defects: ReadonlySet<Defect> = new Set()) {}

  private on(defect: Defect): boolean {
    return this.defects.has(defect);
  }

  key(parts: unknown): unknown {
    if (!isRecord(parts)) throw new GpCacheRefusal("missing:parts");
    const scope = isRecord(parts.scope) ? parts.scope : undefined;
    if (!this.on("key-scope-unchecked")) {
      if (scope === undefined) throw new GpCacheRefusal("missing:scope");
      if (!filled(scope.workspace)) throw new GpCacheRefusal("missing:scope.workspace");
      if (!filled(scope.principal)) throw new GpCacheRefusal("missing:scope.principal");
    }
    if (!this.on("key-revision-unchecked") && !filled(parts.sourceRevision)) throw new GpCacheRefusal("missing:sourceRevision");
    if (!this.on("key-basis-unchecked") && !filled(parts.permissionBasis)) throw new GpCacheRefusal("missing:permissionBasis");
    if (!KINDS.some(kind => kind === parts.kind)) throw new GpCacheRefusal("missing:kind");
    if (!filled(parts.subject)) throw new GpCacheRefusal("missing:subject");
    const key = deepFreeze({
      scope: { workspace: scope?.workspace, principal: scope?.principal },
      sourceRevision: parts.sourceRevision,
      permissionBasis: parts.permissionBasis,
      kind: parts.kind,
      subject: parts.subject,
    });
    this.minted.add(key);
    return key;
  }

  /** The parts of a key this cache minted; anything else is refused, so a hand-built key cannot be used. */
  private keyParts(key: unknown): GpKeyParts {
    if (typeof key === "object" && key !== null && this.minted.has(key)) return key as GpKeyParts;
    if (this.on("key-forgeable") && isRecord(key)) return key as unknown as GpKeyParts;
    throw new GpCacheRefusal("unminted:key");
  }

  /** The JSON of every part: no two keys share a slot. */
  private slotOf(key: GpKeyParts): string {
    const scope = this.on("slot-without-principal") ? [key.scope.workspace] : [key.scope.workspace, key.scope.principal];
    const parts = [...scope, key.sourceRevision, key.permissionBasis, key.kind, key.subject];
    return this.on("slot-joined") ? parts.join("") : JSON.stringify(parts);
  }

  /** The change the host reported against this key's revision or basis, if any. */
  private staleness(key: GpKeyParts): "sourceRevision" | "permissionBasis" | undefined {
    const id = scopeId(key.scope);
    const current = this.revisions.get(id);
    const revisionRead = !this.on("revision-ignored") && !this.on("revision-unpurged") && !(this.on("revision-skips-scores") && key.kind === "score");
    if (revisionRead && current !== undefined && current !== key.sourceRevision) return "sourceRevision";
    const permissionRead =
      !this.on("permission-ignored") && !this.on("permission-unpurged") && !(this.on("permission-skips-embeddings") && key.kind === "embedding");
    if (permissionRead && this.revoked.get(id)?.has(key.permissionBasis) === true) return "permissionBasis";
    return undefined;
  }

  put(key: unknown, object: unknown): void {
    const parts = this.keyParts(key);
    const id = scopeId(parts.scope);
    const current = this.revisions.get(id);
    if (current !== undefined && current !== parts.sourceRevision) throw new GpCacheRefusal("stale:sourceRevision");
    if (this.revoked.get(id)?.has(parts.permissionBasis) === true) throw new GpCacheRefusal("revoked:permissionBasis");
    if (!isRecord(object)) throw new GpCacheRefusal("missing:object");
    if (object.kind !== parts.kind) throw new GpCacheRefusal("mismatch:kind");
    if (!this.on("provenance-unchecked")) {
      const provenance = object.provenance;
      if (!isRecord(provenance)) throw new GpCacheRefusal("missing:provenance");
      for (const field of PROVENANCE_FIELDS) if (!filled(provenance[field])) throw new GpCacheRefusal(`missing:provenance.${field}`);
    }
    const tenant = isRecord(object.tenantScope) ? object.tenantScope : undefined;
    if (!this.on("tenant-unchecked") && (tenant === undefined || !filled(tenant.workspace) || !filled(tenant.principal))) {
      throw new GpCacheRefusal("missing:tenantScope");
    }
    if (!this.on("tenant-foreign") && tenant !== undefined && (tenant.workspace !== parts.scope.workspace || tenant.principal !== parts.scope.principal)) {
      throw new GpCacheRefusal("foreign:tenantScope");
    }
    const stored = this.on("stored-by-reference") ? object : deepFreeze(structuredClone(object));
    this.slots.set(this.slotOf(parts), { key: parts, object: stored as unknown as GpCachedObject });
  }

  get(requester: GpScope, key: unknown): GpLookup {
    const parts = this.keyParts(key);
    if (this.on("never-hit") || (this.on("disabled-after-change") && this.changed)) return { state: "miss" };
    if (!this.on("requester-ignored") && !sameScope(requester, parts.scope)) return { state: "miss" };
    const reason = this.staleness(parts);
    if (reason !== undefined) {
      if (this.on("stale-lookup-throws")) throw new GpCacheRefusal(`stale:${reason}`);
      return { state: "invalidated", reason };
    }
    const slot = this.slots.get(this.slotOf(parts));
    return slot === undefined ? { state: "miss" } : { state: "hit", object: slot.object };
  }

  revise(scope: GpScope, revision: string): void {
    this.changed = true;
    if (this.on("revision-ignored")) return;
    const id = scopeId(scope);
    if (!this.on("revision-forgotten")) this.revisions.set(id, revision);
    if (this.on("revision-unpurged")) return;
    for (const [slot, entry] of [...this.slots]) {
      if (scopeId(entry.key.scope) !== id || entry.key.sourceRevision === revision) continue;
      if (this.on("revision-skips-scores") && entry.key.kind === "score") continue;
      this.slots.delete(slot);
    }
  }

  revoke(scope: GpScope, basis: string): void {
    this.changed = true;
    if (this.on("permission-ignored")) return;
    const id = scopeId(scope);
    if (!this.on("permission-forgotten")) this.revoked.set(id, new Set([...(this.revoked.get(id) ?? []), basis]));
    if (this.on("permission-unpurged")) return;
    for (const [slot, entry] of [...this.slots]) {
      if (scopeId(entry.key.scope) !== id || entry.key.permissionBasis !== basis) continue;
      if (this.on("permission-skips-embeddings") && entry.key.kind === "embedding") continue;
      this.slots.delete(slot);
    }
  }
}

const reference = (): GpCache => new ReferenceGpCache();
const mutant =
  (defect: Defect) =>
  (): GpCache =>
    new ReferenceGpCache(new Set([defect]));

/** The bound GP caches: module path to a factory driving that module's cache as a GpCache. None exists in Pi today. */
const GP_CACHES: Readonly<Record<string, () => GpCache>> = {};

// ---- the scenarios the judges and the reference's witnesses run ----

const S: GpScope = { workspace: "tenant-a", principal: "alice" };
const PRINCIPAL_DIFFERS: GpScope = { workspace: "tenant-a", principal: "bob" };
/** Clause (c)'s other scopes: one part differs, or both. */
const OTHER_SCOPES: Readonly<Record<string, GpScope>> = {
  "principal differs": PRINCIPAL_DIFFERS,
  "workspace differs": { workspace: "tenant-b", principal: "alice" },
  "both differ": { workspace: "tenant-b", principal: "bob" },
};
/** Two scopes whose parts concatenate alike: "acme" + "dev" and "acm" + "edev". */
const JOINED: readonly [GpScope, GpScope] = [
  { workspace: "acme", principal: "dev" },
  { workspace: "acm", principal: "edev" },
];
const VALUES: Readonly<Record<GpKind, JsonValue>> = { score: 0.75, embedding: [0.25, -0.5, 1], posterior: { mean: 0.4, variance: 0.02 } };

/** A cached object as a caller holds it: mutable, so a later edit of the caller's copy can be judged. */
interface ObjectInput {
  kind: GpKind;
  value: JsonValue;
  provenance: { producer: string; checkpoint: string; receipt: string };
  tenantScope: { workspace: string; principal: string };
}

const partsOf = (overrides: Partial<GpKeyParts> = {}): GpKeyParts => ({
  scope: S,
  sourceRevision: "rev-1",
  permissionBasis: "grant-1",
  kind: "score",
  subject: "node-7",
  ...overrides,
});
const objectOf = (kind: GpKind = "score", tenantScope: GpScope = S): ObjectInput => ({
  kind,
  value: structuredClone(VALUES[kind]),
  provenance: { producer: "graph-policy fixture build", checkpoint: "checkpoint-fixture-1", receipt: "receipt-fixture-1" },
  tenantScope: { ...tenantScope },
});
const omit = (record: object, field: string): Record<string, unknown> => Object.fromEntries(Object.entries(record).filter(([name]) => name !== field));

/** Each way to omit a key part, keyed by clause (a)'s part names; key() refuses every one. */
const KEY_OMISSIONS = (): Readonly<Record<string, Readonly<Record<string, unknown>>>> => ({
  "source scope": {
    "scope absent": omit(partsOf(), "scope"),
    "scope a string": { ...partsOf(), scope: "tenant-a/alice" },
    "workspace absent": { ...partsOf(), scope: omit(S, "workspace") },
    "workspace empty": { ...partsOf(), scope: { ...S, workspace: "" } },
    "principal absent": { ...partsOf(), scope: omit(S, "principal") },
    "principal empty": { ...partsOf(), scope: { ...S, principal: "" } },
  },
  "source revision": {
    "revision absent": omit(partsOf(), "sourceRevision"),
    "revision empty": { ...partsOf(), sourceRevision: "" },
    "revision a number": { ...partsOf(), sourceRevision: 7 },
  },
  "permission basis": {
    "basis absent": omit(partsOf(), "permissionBasis"),
    "basis empty": { ...partsOf(), permissionBasis: "" },
    "basis null": { ...partsOf(), permissionBasis: null },
  },
});
/** Hand-built keys, each omitting one part: put and get refuse every one, so no usable key lacks a part by any route. */
const FORGERIES = (): Readonly<Record<string, unknown>> => ({
  "no source scope": omit(partsOf(), "scope"),
  "no source revision": omit(partsOf(), "sourceRevision"),
  "no permission basis": omit(partsOf(), "permissionBasis"),
});
/**
 * Each way an object lacks the provenance triple: provenance absent, and every field of PROVENANCE_FIELDS both absent and empty
 * (wb-ne7z F1: the landed four cases left a receipt absent and an empty producer or checkpoint unread). put refuses every one.
 */
const PROVENANCE_CASES = (): Readonly<Record<string, unknown>> => ({
  "provenance absent": omit(objectOf(), "provenance"),
  ...Object.fromEntries(
    PROVENANCE_FIELDS.flatMap(field => [
      [`${field} absent`, { ...objectOf(), provenance: omit(objectOf().provenance, field) }],
      [`${field} empty`, { ...objectOf(), provenance: { ...objectOf().provenance, [field]: "" } }],
    ]),
  ),
});
const TENANT_CASES = (): Readonly<Record<string, unknown>> => ({
  "tenant scope absent": omit(objectOf(), "tenantScope"),
  "tenant principal absent": { ...objectOf(), tenantScope: omit(S, "principal") },
  "tenant scope foreign": objectOf("score", PRINCIPAL_DIFFERS),
});

type Attempt<T> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: unknown };
function attempt<T>(run: () => T): Attempt<T> {
  try {
    return { ok: true, value: run() };
  } catch (error) {
    return { ok: false, error };
  }
}
const refused = (run: () => unknown): boolean => !attempt(run).ok;
/** True only for a lookup that returned a hit; a thrown refusal is no hit. */
function isHit(lookup: () => GpLookup): boolean {
  const result = attempt(lookup);
  return result.ok && isRecord(result.value) && result.value.state === "hit";
}
/** True for a lookup that returned a miss or an invalidated, clause (b)'s reading: a thrown error returns neither. */
function returnsNonHit(lookup: () => GpLookup): boolean {
  const result = attempt(lookup);
  return result.ok && isRecord(result.value) && (result.value.state === "miss" || result.value.state === "invalidated");
}
/** A prior key minted again returns no hit, or cannot be minted at all. */
function remintedNonHit(cache: GpCache, kind: GpKind): boolean {
  const again = attempt(() => cache.key(partsOf({ kind })));
  return !again.ok || returnsNonHit(() => cache.get(S, again.value));
}
/** The reference's reading of one call: its refusal code, the lookup's state (with the invalidation reason), or accepted. */
function reading(run: () => unknown): string {
  const result = attempt(run);
  if (!result.ok) return result.error instanceof GpCacheRefusal ? result.error.code : `threw:${String(result.error)}`;
  const value = result.value;
  if (isRecord(value) && typeof value.state === "string") return value.state === "invalidated" ? `invalidated:${String(value.reason)}` : value.state;
  return "accepted";
}
const toJson = (value: unknown): JsonValue => JSON.parse(JSON.stringify(value)) as JsonValue;

function keyOmissionsRefused(make: () => GpCache, part: string): boolean {
  const cases = KEY_OMISSIONS()[part];
  if (cases === undefined) throw new Error(`no omission cases for ${part}`);
  const cache = make();
  return Object.values(cases).every(parts => refused(() => cache.key(parts)));
}
function objectCasesRefused(make: () => GpCache, cases: () => Readonly<Record<string, unknown>>): boolean {
  const cache = make();
  const key = cache.key(partsOf());
  return Object.values(cases()).every(object => refused(() => cache.put(key, object))) && !isHit(() => cache.get(S, key));
}

/** Every rule as a scenario over fresh caches from make(): true when the rule holds. */
const CHECKS: Readonly<Record<string, (make: () => GpCache) => boolean>> = {
  "A-KEY-SCOPE": make => keyOmissionsRefused(make, "source scope"),
  "A-KEY-REVISION": make => keyOmissionsRefused(make, "source revision"),
  "A-KEY-BASIS": make => keyOmissionsRefused(make, "permission basis"),
  "A-KEY-FORGED": make => {
    const cache = make();
    cache.put(cache.key(partsOf()), objectOf());
    return Object.values(FORGERIES()).every(forged => refused(() => cache.put(forged, objectOf())) && !isHit(() => cache.get(S, forged)));
  },
  "A-PROVENANCE": make => objectCasesRefused(make, PROVENANCE_CASES),
  "A-TENANT": make => objectCasesRefused(make, TENANT_CASES),
  "A-CARRIED": make => {
    const cache = make();
    const key = cache.key(partsOf());
    const object = objectOf();
    const original = structuredClone(object);
    cache.put(key, object);
    object.provenance.receipt = "receipt-edited";
    object.tenantScope.principal = "mallory";
    const lookup = cache.get(S, key);
    return lookup.state === "hit" && isDeepStrictEqual(lookup.object, original);
  },
  "B-REVISION": make =>
    KINDS.every(kind => {
      const cache = make();
      const key = cache.key(partsOf({ kind }));
      cache.put(key, objectOf(kind));
      cache.revise(S, "rev-2");
      return returnsNonHit(() => cache.get(S, key)) && remintedNonHit(cache, kind);
    }),
  "B-REVISION-LATE": make =>
    KINDS.every(kind => {
      const cache = make();
      cache.revise(S, "rev-1");
      cache.revise(S, "rev-2");
      const key = attempt(() => cache.key(partsOf({ kind })));
      if (!key.ok) return true;
      attempt(() => cache.put(key.value, objectOf(kind)));
      return returnsNonHit(() => cache.get(S, key.value));
    }),
  "B-PERMISSION": make =>
    KINDS.every(kind => {
      const cache = make();
      const key = cache.key(partsOf({ kind }));
      cache.put(key, objectOf(kind));
      cache.revoke(S, "grant-1");
      return returnsNonHit(() => cache.get(S, key)) && remintedNonHit(cache, kind);
    }),
  "B-PERMISSION-LATE": make =>
    KINDS.every(kind => {
      const cache = make();
      cache.revoke(S, "grant-1");
      const key = attempt(() => cache.key(partsOf({ kind })));
      if (!key.ok) return true;
      attempt(() => cache.put(key.value, objectOf(kind)));
      return returnsNonHit(() => cache.get(S, key.value));
    }),
  "C-OTHER-SCOPE": make => {
    const cache = make();
    cache.put(cache.key(partsOf()), objectOf());
    return Object.values(OTHER_SCOPES).every(scope => !isHit(() => cache.get(scope, cache.key(partsOf({ scope })))));
  },
  "C-FOREIGN-REQUESTER": make => {
    const cache = make();
    const key = cache.key(partsOf());
    cache.put(key, objectOf());
    return Object.values(OTHER_SCOPES).every(scope => !isHit(() => cache.get(scope, key)));
  },
  "C-JOINED-SCOPE": make => {
    const [first, second] = JOINED;
    const cache = make();
    cache.put(cache.key(partsOf({ scope: first })), objectOf("score", first));
    return !isHit(() => cache.get(second, cache.key(partsOf({ scope: second }))));
  },
  "H-AFTER": make => {
    const cache = make();
    cache.put(cache.key(partsOf()), objectOf());
    cache.revise(S, "rev-2");
    const revised = cache.key(partsOf({ sourceRevision: "rev-2" }));
    cache.put(revised, objectOf());
    if (cache.get(S, revised).state !== "hit") return false;
    cache.revoke(S, "grant-1");
    const regranted = cache.key(partsOf({ sourceRevision: "rev-2", permissionBasis: "grant-2" }));
    cache.put(regranted, objectOf());
    return cache.get(S, regranted).state === "hit";
  },
};

/** The rule holds over make(); a scenario step that throws outside an expected refusal violates it. */
function holds(rule: Rule, make: () => GpCache): boolean {
  const check = CHECKS[rule.id];
  if (check === undefined) throw new Error(`no check for ${rule.id}`);
  const result = attempt(() => check(make));
  return result.ok && result.value;
}
const EVERY_CLAUSE: readonly Clause[] = ["a", "b", "c", "control"];
const violations = (make: () => GpCache, clauses: readonly Clause[] = EVERY_CLAUSE): string[] =>
  RULES.filter(rule => clauses.includes(rule.clause) && !holds(rule, make)).map(rule => rule.id);
/** The clauses' rules over the reference, and every defect they refuse with the rules that refuse it. */
function mutantTable(clauses: readonly Clause[]): { readonly reference: string[]; readonly mutants: Record<string, string[]> } {
  const mutants: Record<string, string[]> = {};
  for (const defect of DEFECTS) {
    const broken = violations(mutant(defect), clauses);
    if (broken.length > 0) mutants[defect] = broken;
  }
  return { reference: violations(reference, clauses), mutants };
}

// ---- independent adopters: the judges' reading of the reference's choices (row D3) ----

type ProvenanceField = (typeof PROVENANCE_FIELDS)[number];
/**
 * A provenance field an adopter's put reads more leniently than filled, named by the values it refuses (any other value passes):
 * "absent" refuses only a missing key (an empty string passes), "empty" refuses only the empty string (a missing key passes) and
 * "absent or empty" refuses both (null or a number passes).
 */
type LenientReading = "absent" | "empty" | "absent or empty";
/** An adopter's design. Each adopter is written apart from the reference, not as the reference with a guard off. */
interface AdopterDesign {
  /** Opaque string tokens, or plain records any caller may build (the reference mints frozen records only it accepts). */
  readonly keys: "token" | "record";
  /** The provenance fields put requires filled (the reference requires the triple). */
  readonly provenance: readonly ProvenanceField[];
  /** The fields put reads leniently instead (wb-ne7z), each with its reading; a field in neither list is not read. */
  readonly lenient?: Readonly<Partial<Record<ProvenanceField, LenientReading>>>;
}
/** Whether a lenient reading passes one field: it refuses exactly the values the reading names. */
function passesLeniently(provenance: Record<string, unknown>, field: ProvenanceField, reading: LenientReading): boolean {
  const absent = !Object.hasOwn(provenance, field);
  const empty = provenance[field] === "";
  if (reading === "absent") return !absent;
  if (reading === "empty") return !empty;
  return !absent && !empty;
}
/**
 * The adopters D3 judges: the wb-ojm5.2 gate's J10 (token keys, the triple), J11 (token keys, the producer only) and J12 (the
 * producer and the receipt, no checkpoint) designs, and a record-keyed design that serves a complete hand-built key; and, by
 * wb-ne7z, the landing-427 PREP probe's G-receipt-absent-ok (the producer and the checkpoint filled, a receipt refused only when
 * empty) and G-keys-present (the producer and checkpoint keys present, empty strings passing, a receipt refused only when empty)
 * designs, a keys-present design (each field refused only when absent, so it is refused only by the grid's empty half) and a
 * design that reads no type (each field refused only when absent or empty).
 */
const ADOPTERS: Readonly<Record<string, AdopterDesign>> = {
  "token keys, the provenance triple": { keys: "token", provenance: ["producer", "checkpoint", "receipt"] },
  "token keys, the producer only": { keys: "token", provenance: ["producer"] },
  "token keys, the producer and the receipt": { keys: "token", provenance: ["producer", "receipt"] },
  "record keys, the provenance triple": { keys: "record", provenance: ["producer", "checkpoint", "receipt"] },
  "token keys, an absent receipt accepted": { keys: "token", provenance: ["producer", "checkpoint"], lenient: { receipt: "empty" } },
  "token keys, empty producer and checkpoint accepted": { keys: "token", provenance: [], lenient: { producer: "absent", checkpoint: "absent", receipt: "empty" } },
  "token keys, empty fields accepted": { keys: "token", provenance: [], lenient: { producer: "absent", checkpoint: "absent", receipt: "absent" } },
  "token keys, provenance values of any type": {
    keys: "token",
    provenance: [],
    lenient: { producer: "absent or empty", checkpoint: "absent or empty", receipt: "absent or empty" },
  },
};
/** A key as an adopter keeps it: no subject part (its design). */
type AdopterKey = Omit<GpKeyParts, "subject">;

/**
 * An adopter of the contract. Beyond its design it makes each of the reference's other choices otherwise: its keys carry no
 * subject, put checks no kind, a change is recorded and read at get (no purge), a stale key reads miss (not invalidated), and a
 * refusal is a plain Error.
 */
class AdopterGpCache implements GpCache {
  private readonly tokens = new Map<string, AdopterKey>();
  private readonly objects = new Map<string, GpCachedObject>();
  private readonly revisions = new Map<string, string>();
  private readonly withdrawn = new Set<string>();

  constructor(private readonly design: AdopterDesign) {}

  /** The parts every key needs, checked; a value lacking one is refused. */
  private parts(value: unknown): AdopterKey {
    const scope = isRecord(value) && isRecord(value.scope) ? value.scope : undefined;
    if (!isRecord(value) || scope === undefined || !filled(scope.workspace) || !filled(scope.principal)) throw new Error("adopter: no source scope");
    if (!filled(value.sourceRevision) || !filled(value.permissionBasis)) throw new Error("adopter: no source revision or permission basis");
    const kind = KINDS.find(candidate => candidate === value.kind);
    if (kind === undefined) throw new Error("adopter: no kind");
    return { scope: { workspace: scope.workspace, principal: scope.principal }, sourceRevision: value.sourceRevision, permissionBasis: value.permissionBasis, kind };
  }

  private resolve(key: unknown): AdopterKey {
    if (this.design.keys === "record") return this.parts(key);
    const found = typeof key === "string" ? this.tokens.get(key) : undefined;
    if (found === undefined) throw new Error("adopter: unknown key");
    return found;
  }

  private slotOf(key: AdopterKey): string {
    return JSON.stringify([key.scope.workspace, key.scope.principal, key.sourceRevision, key.permissionBasis, key.kind]);
  }

  key(parts: unknown): unknown {
    const checked = this.parts(parts);
    if (this.design.keys === "record") return { ...checked, scope: { ...checked.scope } };
    const token = `adopter-key-${this.tokens.size + 1}`;
    this.tokens.set(token, checked);
    return token;
  }

  put(key: unknown, object: unknown): void {
    const parts = this.resolve(key);
    if (!isRecord(object)) throw new Error("adopter: no object");
    const provenance: Record<string, unknown> = isRecord(object.provenance) ? object.provenance : {};
    if (this.design.provenance.some(field => !filled(provenance[field]))) throw new Error("adopter: no provenance");
    const lenient = this.design.lenient ?? {};
    for (const field of PROVENANCE_FIELDS) {
      const reading = lenient[field];
      if (reading !== undefined && !passesLeniently(provenance, field, reading)) throw new Error("adopter: no provenance");
    }
    const tenant: Record<string, unknown> = isRecord(object.tenantScope) ? object.tenantScope : {};
    if (tenant.workspace !== parts.scope.workspace || tenant.principal !== parts.scope.principal) throw new Error("adopter: no tenant scope");
    this.objects.set(this.slotOf(parts), structuredClone(object) as unknown as GpCachedObject);
  }

  get(requester: GpScope, key: unknown): GpLookup {
    const parts = this.resolve(key);
    if (!sameScope(requester, parts.scope)) return { state: "miss" };
    const id = scopeId(parts.scope);
    const revision = this.revisions.get(id);
    if (revision !== undefined && revision !== parts.sourceRevision) return { state: "miss" };
    if (this.withdrawn.has(JSON.stringify([id, parts.permissionBasis]))) return { state: "miss" };
    const object = this.objects.get(this.slotOf(parts));
    return object === undefined ? { state: "miss" } : { state: "hit", object };
  }

  revise(scope: GpScope, revision: string): void {
    this.revisions.set(scopeId(scope), revision);
  }

  revoke(scope: GpScope, basis: string): void {
    this.withdrawn.add(JSON.stringify([scopeId(scope), basis]));
  }
}

interface Choice {
  /** The reference's choice, as the header's SCOPE names it. */
  readonly choice: string;
  /** The adopters that make it otherwise. */
  readonly adopters: readonly string[];
  /** The rules that refuse those adopters: none when the judges leave the choice free. */
  readonly bound: readonly string[];
}
/** The choices the reference fixes and the filing leaves open, each held by D3 to the rules that refuse its adopters. */
const CHOICES: readonly Choice[] = [
  {
    choice: "the provenance fields (producer, checkpoint, receipt)",
    adopters: [
      "token keys, the producer only",
      "token keys, the producer and the receipt",
      "token keys, an absent receipt accepted",
      "token keys, empty producer and checkpoint accepted",
      "token keys, empty fields accepted",
    ],
    bound: ["A-PROVENANCE"],
  },
  { choice: "a string in each provenance field", adopters: ["token keys, provenance values of any type"], bound: [] },
  { choice: "the subject part", adopters: ["token keys, the provenance triple"], bound: [] },
  { choice: "a kind check at put", adopters: ["token keys, the provenance triple"], bound: [] },
  { choice: "invalidated as the prior key's reading", adopters: ["token keys, the provenance triple"], bound: [] },
  { choice: "a refusal of even a complete hand-built key", adopters: ["record keys, the provenance triple"], bound: [] },
  { choice: "frozen keys the cache minted", adopters: ["token keys, the provenance triple", "record keys, the provenance triple"], bound: [] },
  { choice: "a purge at the change", adopters: ["token keys, the provenance triple", "record keys, the provenance triple"], bound: [] },
];

// ---- the walk (row D) ----

const WALK_ROOTS: readonly string[] = ["src", "qa", "examples"];
const MODULE_EXTENSIONS: readonly string[] = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
/** Below the modules measured at base feebb63 (qa 62, examples 6); the src walk is held to tsconfig's program instead. */
const FLOORS: Readonly<Record<string, number>> = { qa: 55, examples: 5 };
/** Below the 56 cache-shaped modules measured at base feebb63 (src 46, qa 10): the cache detector's non-vacuity anchor. */
const CACHE_FLOOR = 50;
/** The filing's named producer-output cache: a cache shape, no GP word. */
const ANCHOR = "src/workbench/evidence-loader.ts";
/** A cache-named identifier: cache, cached, caches, caching, memoize or memoise, lru. */
const CACHE_NAME = /cach(?:e|ed|es|ing)|memoi[sz]|lru/i;
const CACHE_CONSTRUCTORS: readonly string[] = ["Map", "WeakMap"];

/**
 * The words of an identifier or literal: camel, Pascal, snake, kebab, dotted, spaced and letter-digit spellings split and
 * lowercased (embedding2Cache reads embedding, 2, cache; graphPolicy2 reads graph, policy, 2).
 */
const wordsOf = (text: string): string[] =>
  text
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .replace(/([a-z])([0-9])/g, "$1 $2")
    .replace(/([0-9])([a-z])/g, "$1 $2")
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 0);
/** GraphPolicyCLI's name as words: graphpolicy, or graph then policy. */
const namesGraphPolicy = (words: readonly string[]): boolean =>
  words.some((word, index) => word === "graphpolicy" || (word === "graph" && words[index + 1] === "policy"));

interface Verdict {
  readonly reach: boolean;
  readonly output: readonly string[];
  readonly cache: boolean;
  readonly flagged: boolean;
}
interface Sample {
  readonly file: string;
  readonly text: string;
}

/** One module read as tokens (comments are not code): GraphPolicyCLI reach, the cached-output words it spells, a cache shape. */
function verdictOf(file: string, text: string): Verdict {
  let reach = scanSource(file, text).touchpoints.length > 0;
  const output = new Set<string>();
  let cache = false;
  const read = (token: string): void => {
    const words = wordsOf(token);
    if (namesGraphPolicy(words)) reach = true;
    for (const kind of KINDS) if (words.includes(kind) || words.includes(`${kind}s`)) output.add(kind);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      read(node.text);
      if (CACHE_NAME.test(node.text)) cache = true;
    } else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      read(node.text);
    }
    if (ts.isNewExpression(node)) {
      const callee = ts.isPropertyAccessExpression(node.expression) ? node.expression.name : node.expression;
      if (ts.isIdentifier(callee) && CACHE_CONSTRUCTORS.includes(callee.text)) cache = true;
    }
    ts.forEachChild(node, visit);
  };
  visit(ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true));
  const words = KINDS.filter(kind => output.has(kind));
  return { reach, output: words, cache, flagged: (reach || words.length > 0) && cache };
}

const isModule = (file: string): boolean => MODULE_EXTENSIONS.includes(extname(file));
const textOf = (file: string): string => readFileSync(join(REPO, file), "utf8");

/** Every regular file below WALK_ROOTS (the landed walker: hidden and nested paths, symlinks followed), modules apart. */
function walk(): { readonly modules: readonly string[]; readonly others: readonly string[] } {
  const files = WALK_ROOTS.flatMap(root => srcFiles(REPO, root));
  return { modules: files.filter(isModule), others: files.filter(file => !isModule(file)) };
}

/** The product's own file set: tsconfig.json's program, as repo-relative paths. */
function programFiles(): string[] {
  const parsed = ts.getParsedCommandLineOfConfigFile(
    join(REPO, "tsconfig.json"),
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: diagnostic => {
        throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
      },
    },
  );
  if (parsed === undefined || parsed.errors.length > 0) throw new Error("tsconfig.json did not parse");
  return parsed.fileNames.map(file => relative(REPO, file).split(sep).join("/")).sort();
}

/** The anchor's cacheKey arrow reads both parts of its scope parameter (the filing's "scope-keyed"). */
function cacheKeyScoped(): boolean {
  const source = ts.createSourceFile(ANCHOR, textOf(ANCHOR), ts.ScriptTarget.Latest, true);
  const reads = new Set<string>();
  let declared = false;
  const visit = (node: ts.Node, inside: boolean): void => {
    const here =
      inside || (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "cacheKey" && node.initializer !== undefined && ts.isArrowFunction(node.initializer));
    if (here && !inside) declared = true;
    if (here && ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "scope") reads.add(node.name.text);
    ts.forEachChild(node, child => visit(child, here));
  };
  visit(source, false);
  return declared && reads.has("workspace") && reads.has("principal");
}

/**
 * D1's controls, each reaching its verdict by one route: the landed scanner's SDK specifier, CLI command and wire code, graph
 * policy as words, a cached-output word as an identifier, a plural literal and a singular identifier, a kind word and the name
 * each with a digit glued on (wb-yco1 F3), beside a Map, a WeakMap or a cache-named identifier; and the quiet ones: a cache with no GP word, GP words with no cache shape, words in comments only, and a
 * kind or the name across a word boundary.
 */
const CONTROLS: Readonly<Record<string, Sample>> = {
  "gp package specifier beside a Map": {
    file: "src/control.ts",
    text: ['import { evaluate } from "gp/sdk";', "const memo = new Map<string, number>();", "export const read = (id: string): number => memo.get(id) ?? evaluate(id);"].join("\n"),
  },
  "gp command beside a cache name": {
    file: "qa/control.mjs",
    text: ['import { execFileSync } from "node:child_process";', "let cachedReply;", 'export const run = () => (cachedReply ??= execFileSync("gp", ["eval"], { encoding: "utf8" }));'].join("\n"),
  },
  "wire code beside a WeakMap": {
    file: "src/control.ts",
    text: ["const seen = new WeakMap<object, string>();", 'export const refusal = (reply: object): string => seen.get(reply) ?? "GP_RPC_REFUSED";'].join("\n"),
  },
  "GraphPolicy identifier beside a Map": {
    file: "src/control.ts",
    text: ["export class GraphPolicyRanker {", "  private readonly slots = new Map<string, number>();", "  read(id: string): number | undefined {", "    return this.slots.get(id);", "  }", "}"].join("\n"),
  },
  "posterior identifier beside a cache name": {
    file: "examples/control.js",
    text: ["const posteriorCache = {};", "export const remember = (id, value) => {", "  posteriorCache[id] = value;", "};"].join("\n"),
  },
  "embeddings literal beside a Map": {
    file: "src/control.ts",
    text: ["const slots = new Map<string, number[]>();", 'export const read = (id: string): number[] | undefined => slots.get(id + ":embeddings");'].join("\n"),
  },
  "score literal beside a globalThis.Map": {
    file: "src/control.ts",
    text: ["const ranked = new globalThis.Map<string, number>();", 'export const read = (id: string): number => ranked.get(id) ?? Number("score");'].join("\n"),
  },
  "score identifier beside a Map": {
    file: "src/control.ts",
    text: ["const ranked = new Map<string, number>();", "export const bestScore = (id: string): number => ranked.get(id) ?? 0;"].join("\n"),
  },
  "embedding2Cache beside a Map": {
    file: "src/control.ts",
    text: ["const embedding2Cache = new Map<string, number[]>();", "export const read = (id: string): number[] | undefined => embedding2Cache.get(id);"].join("\n"),
  },
  "graphPolicy2 beside a Map": {
    file: "src/control.ts",
    text: ["const graphPolicy2 = new Map<string, number>();", "export const read = (id: string): number | undefined => graphPolicy2.get(id);"].join("\n"),
  },
  "a cache with no GP word": {
    file: "src/control.ts",
    text: ["const cache = new Map<string, string>();", "export const read = (id: string): string | undefined => cache.get(id);"].join("\n"),
  },
  "GP words with no cache shape": {
    file: "src/control.ts",
    text: ['export const command = "gp";', "export const posteriorOf = (scores: readonly number[]): number => scores[0] ?? 0;"].join("\n"),
  },
  "GP words and a cache in comments only": {
    file: "src/control.ts",
    text: ["// graphpolicy posterior cache: new Map()", "export const value = 1;"].join("\n"),
  },
  "isCoreMintedDecision beside a Map": {
    file: "src/control.ts",
    text: ["const minted = new Map<string, boolean>();", "export const isCoreMintedDecision = (id: string): boolean => minted.get(id) === true;"].join("\n"),
  },
  "paragraphPolicy beside a Map": {
    file: "src/control.ts",
    text: ["const seen = new Map<string, string>();", "export const paragraphPolicy = (id: string): string => seen.get(id) ?? id;"].join("\n"),
  },
};

/** A sample's whole verdict, every route read, not only whether it is flagged. */
function verdictShape(sample: Sample): JsonObject {
  const verdict = verdictOf(sample.file, sample.text);
  return { reach: verdict.reach, output: [...verdict.output], cache: verdict.cache, flagged: verdict.flagged };
}
/** The verdict beside its sample's file, so no two quiet rows share a witness. */
const verdictJson = (sample: Sample): JsonObject => ({ file: sample.file, ...verdictShape(sample) });
/** A residual's quiet row: its sample, read quiet, beside a twin with the escape undone, flagged. */
const quietRow = (sample: Sample, twin: Sample): JsonObject => ({ sample: verdictJson(sample), twin: verdictJson(twin) });

/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-VOCABULARY": ["Q1"],
  "R-COMPOSED": ["Q2"],
  "R-INDIRECT": ["Q3"],
  "R-SHAPE": ["Q4"],
  "R-OUTSIDE": ["Q5"],
  "R-GENERIC-CACHE": ["Q6"],
  "R-INTERRUPTED": ["Q7"],
  "R-NON-MODULE": ["Q8"],
};

// ---- the judged rows, the roster and the bead ----

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A to D, to the bead's own acceptance text. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) a GP cache key omitting source scope, source revision or permission basis cannot be constructed, and every cached object carries provenance and tenant scope",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label:
      "(b) after a permission revocation or source revision bump a lookup under the prior key returns miss/invalidated, never the old score, embedding or posterior",
    pins: ["B1", "B2", "B3"],
  },
  { id: "C", label: "(c) a lookup from another scope never returns a cached GP object", pins: ["C1", "C2"] },
  { id: "D", label: "(posture) no such cache exists, nothing is live-false; the pin binds the first GP cache", pins: ["D1", "D2", "D3"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"] },
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
interface ProducerLine {
  readonly id: string;
  readonly file: string;
  readonly blob: string;
  readonly line: number;
  readonly text: string;
}
interface Roster {
  readonly bead: string;
  readonly programPin: string;
  readonly title: string;
  readonly quote: string;
  readonly producer: {
    readonly repository: string;
    readonly directory: string;
    readonly lines: readonly ProducerLine[];
    readonly sourceInvalidate: { readonly matches: readonly string[]; readonly underCode: number };
  };
  readonly constants: JsonObject;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}
const ROSTER = JSON.parse(textOf(ROSTER_FILE)) as Roster;

/** The constants the roster holds, beside the census's own. */
const CONSTANTS: JsonObject = {
  kinds: [...KINDS],
  keyParts: [...KEY_PARTS],
  objectParts: [...OBJECT_PARTS],
  changes: [...CHANGES],
  provenanceFields: [...PROVENANCE_FIELDS],
  rules: RULES.map(rule => ({ id: rule.id, clause: rule.clause, term: rule.term })),
  defects: [...DEFECTS],
  walkRoots: [...WALK_ROOTS],
  moduleExtensions: [...MODULE_EXTENSIONS],
  floors: { ...FLOORS },
  cacheFloor: CACHE_FLOOR,
  anchor: ANCHOR,
  cacheName: CACHE_NAME.source,
  cacheConstructors: [...CACHE_CONSTRUCTORS],
  residuals: Object.fromEntries(Object.entries(RESIDUALS).map(([family, rows]) => [family, [...rows]])),
  adopters: Object.fromEntries(
    Object.entries(ADOPTERS).map(([name, design]) => {
      const lenient = PROVENANCE_FIELDS.flatMap(field => {
        const reading = design.lenient?.[field];
        return reading === undefined ? [] : [[field, reading] as const];
      });
      return [name, { keys: design.keys, provenance: [...design.provenance], ...(lenient.length === 0 ? {} : { lenient: Object.fromEntries(lenient) }) }];
    }),
  ),
  choices: CHOICES.map(({ choice, adopters, bound }) => ({ choice, adopters: [...adopters], bound: [...bound] })),
};

function rosterWitness(pin: string): JsonValue {
  for (const row of ROSTER.rows) for (const entry of row.pins) if (entry.id === pin) return entry.witness;
  throw new Error(`${pin} has no roster witness`);
}
function producerLine(id: string): ProducerLine {
  const line = ROSTER.producer.lines.find(entry => entry.id === id);
  if (line === undefined) throw new Error(`no producer line ${id}`);
  return line;
}

/** The bead's row in the tracker export: its title and its notes, the filing's text. */
function filing(): { readonly title: string; readonly notes: string } {
  for (const line of textOf(".beads/issues.jsonl").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isRecord(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD} is not in the tracker export`);
}
/** The owner filing: the row's notes through their first "Not P0:" line, so a note appended later (a lane's delivery or refusal
 * note) cannot change what the census reads. */
function ownerFiling(notes: string): string {
  const posture = /\nNot P0: [^\n]*(?:\n|$)/.exec(notes);
  return posture === null ? "" : notes.slice(0, posture.index + posture[0].length);
}
/** What the census reads of the owner filing. */
interface FilingReading {
  readonly clauses: Readonly<Record<"a" | "b" | "c" | "posture", string>>;
  /** The quote, its file, its line and its pin. */
  readonly quote: readonly string[];
  /** The merged pins as prefix:line. */
  readonly merged: readonly string[];
  /** Each quoted authority sentence as [file prefix, line, sentence]. */
  readonly authority: readonly (readonly string[])[];
  /** The gating sentence's port message: [name, file prefix, line]. */
  readonly port: readonly string[];
}
function readFiling(filing: string): FilingReading {
  const acceptance = /\nAcceptance: \(a\) (.+?); \(b\) (.+?); \(c\) (.+?)\.\n/.exec(filing);
  const posture = /\nNot P0: (.+?)\. Related: /.exec(filing);
  const quote = /\nQuote: '(.+?)' (\S+):(\d+)@([0-9a-f]+)\. /.exec(filing);
  const merged = /\nQuote: .*Merged pins \(same dir\/sha\): (.+?)\.\n/.exec(filing)?.[1] ?? "";
  const authority = /\nAuthority: (.+)\n/.exec(filing)?.[1] ?? "";
  const port = /the (\w+) port message \((\d+):(\d+)\)/.exec(filing);
  return {
    clauses: { a: acceptance?.[1] ?? "", b: acceptance?.[2] ?? "", c: acceptance?.[3] ?? "", posture: posture?.[1] ?? "" },
    quote: quote === null ? [] : quote.slice(1),
    merged: merged.split(", ").flatMap(item => {
      const found = /^([0-9a-z-]+):(\d+)(?:,:(\d+))?/.exec(item);
      return found === null ? [] : [found[2], found[3]].flatMap(line => (line === undefined ? [] : [`${found[1]}:${line}`]));
    }),
    authority: [...authority.matchAll(/(\d\d):(\d+) '([^']+)'/g)].map(found => found.slice(1)),
    port: port === null ? [] : port.slice(1),
  };
}
/** A lane note appended after the filing that restates another quote, pins, authority, port, acceptance and posture. */
const APPENDED_LANE_NOTE = [
  "",
  "DELIVERED by a lane (a later note restating another filing):",
  "Quote: 'a later quote' docs/programs/other/01-other.md:1@0123456789ab. Merged pins (same dir/sha): 99-other:1, 98-other:2.",
  "Authority: the lane (99:1); 99:1 'a later sentence'; 98:2 'another later sentence'",
  "Gating: the OTHER_PORT port message (99:1) is a later claim.",
  "Acceptance: (a) a later key clause; (b) a later change clause; (c) a later scope clause.",
  "Not P0: a later posture. Related: none.",
  "",
].join("\n");
/** The list a clause names after a pattern's first group: "x, y or z" and "x and y" read as their members. */
function listOf(text: string, pattern: RegExp): string[] {
  const found = pattern.exec(text)?.[1];
  return found === undefined ? [] : found.split(/, | or | and /);
}

/** The pins whose witness equalled the roster's at their compare, in run order; the last case holds it to every pin. */
const REACHED: string[] = [];

/** Each pin's case: it computes its witness, which the roster holds. */
const IMPL: Readonly<Record<string, () => JsonValue>> = {
  A1: () => {
    const cache = new ReferenceGpCache();
    const refusals: JsonObject = {};
    for (const [part, cases] of Object.entries(KEY_OMISSIONS())) {
      const row: JsonObject = {};
      for (const [name, parts] of Object.entries(cases)) row[name] = reading(() => cache.key(parts));
      refusals[part] = row;
    }
    const key = cache.key(partsOf());
    cache.put(key, objectOf());
    const forged: JsonObject = {};
    for (const [name, forgery] of Object.entries({ ...FORGERIES(), "complete copy": { ...partsOf() } })) {
      forged[name] = { put: reading(() => cache.put(forgery, objectOf())), get: reading(() => cache.get(S, forgery)) };
    }
    const frozen = isRecord(key) && Object.isFrozen(key) && Object.isFrozen(key.scope);
    return { refusals, minted: { parts: toJson(key), frozen, own: reading(() => cache.get(S, key)) }, forged };
  },
  A2: () => {
    const cache = new ReferenceGpCache();
    const key = cache.key(partsOf());
    const refusals: JsonObject = {};
    for (const [name, object] of Object.entries({ ...PROVENANCE_CASES(), ...TENANT_CASES(), "kind mismatch": objectOf("embedding") })) {
      refusals[name] = reading(() => cache.put(key, object));
    }
    const afterRefusals = reading(() => cache.get(S, key));
    const object = objectOf();
    const original = structuredClone(object);
    cache.put(key, object);
    object.provenance.receipt = "receipt-edited";
    object.tenantScope.principal = "mallory";
    const lookup = cache.get(S, key);
    const carried =
      lookup.state === "hit"
        ? {
            object: toJson(lookup.object),
            original: isDeepStrictEqual(lookup.object, original),
            frozen: Object.isFrozen(lookup.object) && Object.isFrozen(lookup.object.provenance) && Object.isFrozen(lookup.object.tenantScope),
          }
        : lookup.state;
    return { refusals, afterRefusals, carried };
  },
  A3: () => mutantTable(["a"]),
  B1: () => {
    const witness: JsonObject = {};
    for (const kind of KINDS) {
      const cache = new ReferenceGpCache();
      const key = cache.key(partsOf({ kind }));
      const elsewhere = cache.key(partsOf({ kind, scope: PRINCIPAL_DIFFERS }));
      cache.put(key, objectOf(kind));
      cache.put(elsewhere, objectOf(kind, PRINCIPAL_DIFFERS));
      cache.revise(S, "rev-2");
      const prior = reading(() => cache.get(S, key));
      const reminted = reading(() => cache.get(S, cache.key(partsOf({ kind }))));
      const latePut = reading(() => cache.put(key, objectOf(kind)));
      const afterLate = reading(() => cache.get(S, key));
      const next = cache.key(partsOf({ kind, sourceRevision: "rev-2" }));
      cache.put(next, objectOf(kind));
      witness[kind] = { prior, reminted, latePut, afterLate, newRevision: reading(() => cache.get(S, next)), otherScope: reading(() => cache.get(PRINCIPAL_DIFFERS, elsewhere)) };
    }
    return witness;
  },
  B2: () => {
    const witness: JsonObject = {};
    for (const kind of KINDS) {
      const cache = new ReferenceGpCache();
      const key = cache.key(partsOf({ kind }));
      const elsewhere = cache.key(partsOf({ kind, scope: PRINCIPAL_DIFFERS }));
      cache.put(key, objectOf(kind));
      cache.put(elsewhere, objectOf(kind, PRINCIPAL_DIFFERS));
      cache.revoke(S, "grant-1");
      const prior = reading(() => cache.get(S, key));
      const reminted = reading(() => cache.get(S, cache.key(partsOf({ kind }))));
      const latePut = reading(() => cache.put(key, objectOf(kind)));
      const afterLate = reading(() => cache.get(S, key));
      const next = cache.key(partsOf({ kind, permissionBasis: "grant-2" }));
      cache.put(next, objectOf(kind));
      witness[kind] = { prior, reminted, latePut, afterLate, otherBasis: reading(() => cache.get(S, next)), otherScope: reading(() => cache.get(PRINCIPAL_DIFFERS, elsewhere)) };
    }
    return witness;
  },
  B3: () => mutantTable(["b"]),
  C1: () => {
    const cache = new ReferenceGpCache();
    const key = cache.key(partsOf());
    cache.put(key, objectOf());
    const otherKey: JsonObject = {};
    const foreignRequester: JsonObject = {};
    for (const [name, scope] of Object.entries(OTHER_SCOPES)) {
      otherKey[name] = reading(() => cache.get(scope, cache.key(partsOf({ scope }))));
      foreignRequester[name] = reading(() => cache.get(scope, key));
    }
    const [first, second] = JOINED;
    const joinedKey = cache.key(partsOf({ scope: first }));
    cache.put(joinedKey, objectOf("score", first));
    return {
      own: reading(() => cache.get(S, key)),
      otherKey,
      foreignRequester,
      joined: reading(() => cache.get(second, cache.key(partsOf({ scope: second })))),
      joinedOwn: reading(() => cache.get(first, joinedKey)),
    };
  },
  C2: () => mutantTable(["c"]),
  D1: () => {
    const { modules } = walk();
    const verdicts = new Map(modules.map(file => [file, verdictOf(file, textOf(file))] as const));
    const inRoot = (root: string): string[] => modules.filter(file => file.startsWith(`${root}/`));
    const flagged = [...verdicts].filter(([, verdict]) => verdict.flagged).map(([file]) => file);
    const bound = Object.keys(GP_CACHES).sort();
    const anchor = verdicts.get(ANCHOR);
    const controls: JsonObject = {};
    for (const [name, sample] of Object.entries(CONTROLS)) controls[name] = verdictShape(sample);
    return {
      srcIsProgram: isDeepStrictEqual([...inRoot("src")].sort(), programFiles()),
      floorsMet: Object.fromEntries(Object.entries(FLOORS).map(([root, floor]) => [root, inRoot(root).length >= floor])),
      cacheFloorMet: [...verdicts.values()].filter(verdict => verdict.cache).length >= CACHE_FLOOR,
      anchor: anchor === undefined ? null : { reach: anchor.reach, output: [...anchor.output], cache: anchor.cache, cacheKeyScoped: cacheKeyScoped() },
      flagged,
      unbound: flagged.filter(file => !bound.includes(file)),
      stale: bound.filter(file => !flagged.includes(file)),
      controls,
    };
  },
  D2: () => {
    const bound: JsonObject = {};
    for (const [module, make] of Object.entries(GP_CACHES)) bound[module] = violations(make);
    return {
      bound,
      reference: violations(reference),
      liveness: mutantTable(["control"]).mutants,
      unrefused: DEFECTS.filter(defect => violations(mutant(defect)).length === 0),
    };
  },
  D3: () => {
    const refusals = new Map(Object.entries(ADOPTERS).map(([name, design]) => [name, violations(() => new AdopterGpCache(design))] as const));
    const choices: JsonObject = {};
    for (const { choice, adopters, bound } of CHOICES) {
      if (adopters.length === 0) throw new Error(`CHOICES: "${choice}" names no adopter`);
      // Each adopter, not only one of them (wb-ne7z F1): every design making the choice otherwise is refused by exactly the bound rules.
      for (const name of adopters) {
        const refusing = refusals.get(name);
        if (refusing === undefined) throw new Error(`CHOICES: "${choice}" names the adopter "${name}", which ADOPTERS does not define`);
        if (!isDeepStrictEqual(refusing, [...bound])) {
          throw new Error(`CHOICES: "${choice}" claims [${bound.join(", ")}]; its adopter "${name}" is refused by [${refusing.join(", ")}]`);
        }
      }
      choices[choice] = RULES.map(rule => rule.id).filter(id => adopters.some(name => refusals.get(name)?.includes(id) === true));
    }
    const design = (name: string): AdopterDesign => {
      const found = ADOPTERS[name];
      if (found === undefined) throw new Error(`no adopter ${name}`);
      return found;
    };
    const token = new AdopterGpCache(design("token keys, the provenance triple"));
    const key = token.key(partsOf());
    token.put(key, objectOf());
    const readings: JsonObject = {
      "token keys: the key": typeof key,
      "token keys: another subject's key": reading(() => token.get(S, token.key(partsOf({ subject: "node-8" })))),
      "token keys: an embedding put under a score key": reading(() => token.put(key, objectOf("embedding"))),
    };
    token.revise(S, "rev-2");
    readings["token keys: the prior key after a revision bump"] = reading(() => token.get(S, key));
    token.revise(S, "rev-1");
    readings["token keys: the prior key after the revision rolls back"] = reading(() => token.get(S, key));
    const record = new AdopterGpCache(design("record keys, the provenance triple"));
    record.put(record.key(partsOf()), objectOf());
    readings["record keys: a complete hand-built key"] = reading(() => record.get(S, { ...partsOf() }));
    // Each provenance design stores and serves the object its choice lets through (wb-ne7z); the reference refuses it.
    const served = (cache: GpCache, provenance: Record<string, unknown>): string =>
      reading(() => {
        const key = cache.key(partsOf());
        cache.put(key, { ...objectOf(), provenance });
        return cache.get(S, key);
      });
    const triple = (): Record<string, unknown> => ({ ...objectOf().provenance });
    readings["an absent receipt accepted: an object without its receipt"] = served(new AdopterGpCache(design("token keys, an absent receipt accepted")), omit(triple(), "receipt"));
    readings["empty producer and checkpoint accepted: both empty, no receipt"] = served(new AdopterGpCache(design("token keys, empty producer and checkpoint accepted")), {
      producer: "",
      checkpoint: "",
    });
    readings["empty fields accepted: every field empty"] = served(new AdopterGpCache(design("token keys, empty fields accepted")), { producer: "", checkpoint: "", receipt: "" });
    readings["provenance values of any type: a numeric receipt"] = served(new AdopterGpCache(design("token keys, provenance values of any type")), { ...triple(), receipt: 7 });
    readings["the reference: a numeric receipt"] = served(new ReferenceGpCache(), { ...triple(), receipt: 7 });
    return { adopters: Object.fromEntries(refusals), choices, readings };
  },
  Q1: () =>
    quietRow(
      { file: "src/q1.ts", text: ['import { decide } from "./decide.js";', "const logits = new Map<string, number[]>();", "export const read = (id: string): number[] => logits.get(id) ?? decide(id);"].join("\n") },
      { file: "src/q1.ts", text: ['import { decide } from "./decide.js";', "const scores = new Map<string, number[]>();", "export const read = (id: string): number[] => scores.get(id) ?? decide(id);"].join("\n") },
    ),
  Q2: () =>
    quietRow(
      { file: "src/q2.ts", text: ['const tool = ["graph", "policy"].join("-");', "const cache = new Map<string, string>();", "export const read = (): string => cache.get(tool) ?? tool;"].join("\n") },
      { file: "src/q2.ts", text: ['const tool = "graph-policy";', "const cache = new Map<string, string>();", "export const read = (): string => cache.get(tool) ?? tool;"].join("\n") },
    ),
  Q3: () =>
    quietRow(
      { file: "src/q3.ts", text: ['import { decide } from "./decide.js";', "const cache = new Map<string, number>();", "export const read = (id: string): number => cache.get(id) ?? decide(id);"].join("\n") },
      { file: "src/q3.ts", text: ['import { decide } from "./graph-policy-decide.js";', "const cache = new Map<string, number>();", "export const read = (id: string): number => cache.get(id) ?? decide(id);"].join("\n") },
    ),
  Q4: () =>
    quietRow(
      { file: "src/q4.ts", text: ['import { evaluate } from "@graphpolicy/sdk";', "const results: Record<string, number> = {};", "export const read = (id: string): number => (results[id] ??= evaluate(id));"].join("\n") },
      { file: "src/q4.ts", text: ['import { evaluate } from "@graphpolicy/sdk";', "const cachedResults: Record<string, number> = {};", "export const read = (id: string): number => (cachedResults[id] ??= evaluate(id));"].join("\n") },
    ),
  Q5: () => {
    const { modules, others } = walk();
    return { testWalked: [...modules, ...others].some(file => file.startsWith("test/")), censusFlagged: verdictOf(CENSUS_FILE, textOf(CENSUS_FILE)).flagged };
  },
  Q6: () => quietRow({ file: ANCHOR, text: textOf(ANCHOR) }, { file: ANCHOR, text: `${textOf(ANCHOR)}\nexport const GP_PROVIDER = "graphpolicy";\n` }),
  Q7: () => {
    const sample = (name: string): Sample => ({ file: "src/q7.ts", text: [`const tool = "${name}";`, "const cache = new Map<string, string>();", "export const read = (): string | undefined => cache.get(tool);"].join("\n") });
    return {
      ...quietRow(sample(`gr${String.fromCodePoint(0x0430)}phpolicy`), sample("graphpolicy")),
      zeroWidth: verdictJson(sample(`graph${String.fromCodePoint(0x200b)}policy`)),
      zeroWidthInside: verdictJson(sample(`gr${String.fromCodePoint(0x200b)}aphpolicy`)),
      digitInside: verdictJson(sample("graph2policy")),
      kind: quietRow(sample(`sc${String.fromCodePoint(0x043e)}res`), sample("scores")),
      kindZeroWidth: verdictJson(sample(`sco${String.fromCodePoint(0x200b)}res`)),
    };
  },
  Q8: () => {
    const text = ['import { execFileSync } from "node:child_process";', "const cache = new Map<string, string>();", 'export const run = () => execFileSync("gp", ["eval"], { encoding: "utf8" });'].join("\n");
    return { judged: isModule("qa/workbench/gp-cache.sh"), twin: isModule("qa/workbench/gp-cache.mjs") && verdictOf("qa/workbench/gp-cache.mjs", text).flagged, listed: walk().others.length > 0 };
  },
};

describe("wb-ojm5.2 GP cache scope census (GPC-GRAPH-NATIVE-LLM-RLP-R2)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead's acceptance text agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:3", "C:2", "D:3", "Q:8"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: BEAD, programPin: PIN, constants: CONSTANTS }).toStrictEqual({ bead: ROSTER.bead, programPin: ROSTER.programPin, constants: ROSTER.constants });
    expect(Object.keys(CHECKS).sort(), "one scenario per rule").toEqual(RULES.map(rule => rule.id).sort());
    expect(Object.keys(KEY_OMISSIONS()), "the omission cases are keyed by clause (a)'s parts").toEqual([...KEY_PARTS]);
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.flatMap(row => row.pins), `${member} is a judged pin`).toContain(member);

    const filed = filing();
    expect(filed.title, "the statement is the bead's title").toBe(ROSTER.title);
    const owner = ownerFiling(filed.notes);
    expect(owner.length, "the owner filing was read through its Not P0 line").toBeGreaterThan(0);
    const read = readFiling(owner);
    expect(readFiling(ownerFiling(`${filed.notes}${APPENDED_LANE_NOTE}`)), "a note appended to the bead's row changes nothing the census reads").toStrictEqual(read);
    const clause = read.clauses;
    expect(
      ROWS.filter(row => row.id !== "Q").map(row => row.label),
      "rows A to D are the filing's three clauses and its posture sentence",
    ).toEqual([`(a) ${clause.a}`, `(b) ${clause.b}`, `(c) ${clause.c}`, `(posture) ${clause.posture}`]);
    expect(KEY_PARTS, "clause (a)'s key parts").toEqual(listOf(clause.a, /omitting (.+?) cannot be constructed/));
    expect(OBJECT_PARTS, "clause (a)'s object parts").toEqual(listOf(clause.a, /carries (.+)$/));
    expect(CHANGES, "clause (b)'s changes").toEqual(listOf(clause.b, /^after a (.+?) a lookup/));
    expect([...KINDS], "clause (b)'s kinds").toEqual(listOf(clause.b, /never the old (.+)$/));
    const terms = RULES.flatMap(rule => (rule.term === null ? [] : [rule.term]));
    for (const term of [...KEY_PARTS, ...OBJECT_PARTS, ...CHANGES]) expect(terms, `"${term}" is a rule's term`).toContain(term);
    for (const rule of RULES) {
      if (rule.clause === "control") expect(rule.term, `${rule.id} is the liveness control`).toBeNull();
      else expect(clause[rule.clause], `${rule.id}'s term is its clause's words`).toContain(rule.term);
    }

    const [quoteText, quoteFile, quoteLine, quotePin] = read.quote;
    const quoted = producerLine("quote");
    expect(quoteText, "the filing's quote").toBe(ROSTER.quote);
    expect(quoteFile, "the quote's file").toBe(`${ROSTER.producer.directory}/${quoted.file}`);
    expect(Number(quoteLine), "the quote's line").toBe(quoted.line);
    expect(typeof quotePin === "string" && quotePin.length > 0 && PIN.startsWith(quotePin), "the quote's pin").toBe(true);
    expect(quoted.text, "the quote is the producer line's").toContain(ROSTER.quote);
    expect(read.merged.length, "the filing's merged pins were read").toBeGreaterThan(0);
    for (const pin of read.merged) {
      const [prefix, line] = pin.split(":");
      expect(ROSTER.producer.lines.some(entry => entry.file.startsWith(`${prefix}`) && entry.line === Number(line)), `the roster carries ${pin}`).toBe(true);
    }
    expect(read.authority.length, "the filing's two authority sentences").toBe(2);
    for (const [prefix, line, sentence] of read.authority) {
      const entry = ROSTER.producer.lines.find(candidate => candidate.file.startsWith(`${prefix}-`) && candidate.line === Number(line));
      expect(entry?.text, `the authority sentence at ${prefix}:${line}`).toContain(sentence);
    }
    const [portName, portPrefix, portNumber] = read.port;
    const portLine = ROSTER.producer.lines.find(entry => entry.file.startsWith(`${portPrefix}-`) && entry.line === Number(portNumber));
    expect(typeof portName === "string" && portLine !== undefined && portLine.text.includes(portName), "the gating sentence's port message line").toBe(true);
    expect(ROSTER.producer.sourceInvalidate, "the port message is design only: one document matches, no code").toStrictEqual({
      matches: [`${ROSTER.producer.directory}/${portLine?.file}`],
      underCode: 0,
    });
    const producerText = ROSTER.producer.lines.map(entry => entry.text.toLowerCase()).join("\n");
    for (const kind of KINDS) expect(producerText, `the producer lines name ${kind}`).toContain(kind);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          const expected = rosterWitness(pin);
          expect(witness).toStrictEqual(expected);
          // The record proves the comparison held, not only that the line ran (a swapped matcher leaves the pin unreached).
          if (isDeepStrictEqual(witness, expected)) REACHED.push(pin);
        });
      }
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
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
