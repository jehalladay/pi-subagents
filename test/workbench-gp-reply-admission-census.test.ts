/**
 * wb-0lf.3 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R3, program-triage-2026-10-18, child of wb-0lf), the GP reply admission
 * census. Statement (bead title, verbatim): "When Pi admits a GraphPolicyCLI reply (artifact: released GP reply schema + a Pi
 * decision point), the host shall independently check schema and checkpoint identity, snapshot-digest freshness vs the pinned
 * basis, actor scope, action support and resource constraints before admission; a stale basis, unsupported action, worker
 * timeout or crash yields a typed refusal, never a decision or success."
 * Acceptance (owner filing, verbatim; rows A, B and C are its three '; '-separated clauses, the third without its trailing
 * carry note "(carries O11's GP case)"): "a reader-adapter test over a fixture reply asserts admission requires schema id and
 * checkpoint id in the pinned set, snapshotDigest === the digest Pi exported, actor in scope and proposed action inside the
 * exported support; each violation yields exactly one typed refusal naming only the field and no decision object; a GP worker
 * timeout, non-zero exit or malformed stdout yields typed unavailable and no receipt row claims success (carries O11's GP
 * case)". Row T's label is the title's trigger, verbatim: its parenthetical names the two gating artifacts.
 *
 * MEASURED (read-only, by the cutting seats: cut 1 at base ade68d6534cc; the producer lines re-read by cut 3 at base
 * f5ffe68513ef; the src facts re-read by cut 4 at base 43509269827c). Producer (the local Furnace checkout, git show; the
 * roster's producer block holds the three lines and the blob, and this census never re-reads the producer): at the bead's pin
 * 0f791db71b9d,
 * docs/programs/graph-policy-decision-executor-2026-10-18/README.md (blob 73135c2df014) line 13 opens "Furnace host checks
 * schema, source freshness, actor scope, action support and resource constraints independently.", line 11 lists the reply
 * ("Reply: schema and checkpoint identity, snapshot digest, ..."), line 25 carries "no fabricated success on worker timeout,
 * model crash or retry", and line 3 opens "**2026-10-18, design-only.**". The reply schema half of the gate is released:
 * test/fixtures/gp-sample-receipt.json (vendored by wb-gxd7.5) holds gp sample's own result.decision at GraphPolicyCLI
 * 3f7d52cd17397d8e, a graphpolicy.receipt.decision.v1 sampled-decision receipt that gp inspect decision accepted, and its
 * graph_digest is the SHA-256 of test/fixtures/gp-host-adapter-snapshot.json's bytes (the producer's host-adapter snapshot,
 * vendored byte for byte; wb-gxd7.3 captured the same value as P-SAMPLE-FILE). The gp CLI frame is measured in
 * test/fixtures/gp-kind-label-roster.json's producer runs (wb-gxd7.4, the same build): exit 0 writes
 * {"schema":"graphpolicy.cli.v1","ok":true,"result":...} and the run "ready-work" exits 2 with an ok:false GP_CLI_ error
 * envelope; wb-gxd7.3 measured the receipt's path in gp sample's stdout as result.decision (its P-SAMPLE-FILE capture). The Pi
 * decision point half is unbuilt: at base 43509269827c no src module (117 files; 116 at ade68d6534cc) spells a GraphPolicyCLI
 * name (anywhere, in any case) or a receipt identity field (as a whole case-sensitive token), and the one near miss is
 * src/workbench/reactivefiber-observer.ts's GRAPH_DIGEST, an rf constant; NATIVE_CONTROL_ACTIONS registers no GraphPolicyCLI
 * provider (so decideControl denies a gp target as unknown-action before it reads the projection); and no src decision point
 * exists (wb-0lf.1 landed at landing 648 as a test-only census of that absence).
 *
 * By the two readings below, Pi admits no GP reply today: no src module spells the reply vocabulary (T1) and the control core
 * registers no GraphPolicyCLI provider (T3). Row T1 pins the listed spelled vocabulary in src (GraphPolicyCLI's names in any
 * case, the field tokens case-sensitive), not all ways a module can admit a reply. Rows A to C exercise the synthetic
 * admitters on the listed inputs; they do not certify a future host implementation without a new fixture review.
 *  T, the trigger. T1 (spelled reply vocabulary): no src module spells the reply vocabulary, which is GraphPolicyCLI's names
 *    (graph and policy joined or split by a hyphen, underscore, dot or space, and GraphDataIR, matched anywhere in any case;
 *    another gp name such as GraphFunctionIR is not read) and the receipt's identity fields graph_digest, checkpoint_digest and
 *    chosen_id and their camel-case spellings (each a whole case-sensitive token); src is git's would-commit listing under src/
 *    (tracked and untracked files present in the tree, never ignored ones). The src modules that spell any of it are exactly
 *    the bound admitters
 *    in GP_REPLY_ADMITTERS (empty both ways today); the reader is shown reading its planted controls and quiet on the near
 *    miss's real text, and the listing holding at least SRC_FLOOR files and the control core's real text. T2 (the released
 *    reply schema): the vendored receipt is gp sample's accepted output, its schema the pinned reply schema, carrying every
 *    field the checks read. T3 (a Pi decision point): the control core registers none of the provider spellings gp,
 *    graphpolicy and graph-policy-cli, decideControl denies a gp target as unknown-action, and the roster pins the core's
 *    provider list.
 *  A, B, C, fixture-scoped on landing. The armed judge measures the fifteen listed fixtures and 23 listed mutants, not
 *    every possible admitter or input.
 *    For a future decision point, repeat the admission review against its real code and the then-current exported basis.
 *    The synthetic judge reads an admitter as one function over the call: the snapshot bytes Pi
 *    presented, the pinned reply schemas and checkpoints, the actor scope, the exported support, and the worker's result
 *    (timed out, exit code, stdout). It yields typed results ({outcome: admitted, decision}, {outcome: refused, field},
 *    {outcome: unavailable, cause}) and records receipt rows ({outcome, tone}, tone a Pi statusTone). Fifteen fixtures run
 *    every admitter; each call presents the vendored snapshot's bytes or one of the four digest presentations below, and each
 *    worker stdout is the vendored receipt in the CLI frame at result.decision (edited where named), that stdout truncated, the
 *    measured exit-2 envelope, the frame with an empty result, or empty: F-ADMIT (the reply as gp wrote it); eight
 *    single-field fixtures, each violating one field alone (one each for schema, checkpoint, actor and support, four for
 *    snapshotDigest: F-SCHEMA gp's shipped runtime receipt schema in place of the decision receipt's, F-CHECKPOINT a
 *    same-length checkpoint id outside the pinned set sharing the pinned id's form prefix, F-DIGEST-COMPACT / -NEWLINE / -CRLF
 *    the snapshot presented under wb-gxd7.3's whitespace-only edits, F-DIGEST-MOVED a snapshot whose content moved, F-ACTOR a
 *    scope without the proposal's worker, F-SUPPORT a proposal the reply's own candidates claim and Pi never offered); and six
 *    worker fixtures (F-TIMEOUT and F-EXIT-CRASH with a complete valid reply on stdout, F-EXIT-ERROR the measured exit-2
 *    envelope verbatim, F-MALFORMED-TRUNCATED / -EMPTY / -NO-DECISION). Eleven CHECKS judge each journal: admitted-<field> (a
 *    reply violating that field was admitted), refusal-count (a violating reply did not yield exactly one result, a refusal),
 *    refusal-field (a refusal's own keys are not exactly outcome and field, or its field is not the one violated),
 *    refusal-decision (a result of a violating reply carries a decision by its own properties: an admitted outcome, an own
 *    decision key, or the reply's proposal anywhere among its own properties; a prototype is never read), unavailable (a
 *    worker fixture did not yield exactly one unavailable result of its cause), success-row (a non-admitted call recorded a
 *    row of tone success, or of an outcome other than refused and unavailable) and decision-kept (the valid reply was not
 *    admitted exactly once with its proposal and its receipt verbatim). The census's reference admitter (HONEST) passes every
 *    fixture; each of the 23 MUTANTS fails at least one check, and every check fires.
 *  A1 drives the bound admitters (none) and the synthetic ones over every listed fixture. A2 on F-SCHEMA and F-CHECKPOINT,
 *    exact-set membership refuses gp's shipped runtime schema and one same-length checkpoint id sharing the pinned id's form
 *    prefix, and M-SCHEMA-FAMILY and M-CHECKPOINT-PREFIX admit them; other membership bugs (G1 to G4, G15, G23, G24 and G27
 *    below) pass the judge. A3 on the four digest fixtures, byte hashing refuses each presentation the reply did not hash, and
 *    M-DIGEST-RESERIALIZED fails the judge on exactly the three whitespace-only ones (it admits them); hashing decoded text
 *    (G12), comparing the digest case-insensitively (G17), trimming it (G25) and comparing its first 23 characters (G26) pass
 *    the judge.
 *    A4 on F-ACTOR, the proposal's worker (read from the presented snapshot's can_execute relation) is outside the scope and
 *    the reply is refused naming actor; a relation with two workers (G8) passes the judge. A5 on F-SUPPORT, a relation Pi
 *    never offered but the reply's own candidates claim is refused naming support, and M-SUPPORT-FROM-REPLY admits it; a
 *    substring of a supported id (G7) passes the judge. B1 on the eight single-field fixtures, each violates exactly its one
 *    field and HONEST yields exactly one result; B2 that result's own keys are exactly outcome and field (the judge accepts
 *    either order); B3 no such result carries a decision by its own properties (a decision on a prototype, G9, passes the
 *    judge). C1 on the six worker fixtures, HONEST yields exactly one unavailable of its cause; a frame of another schema
 *    (G5), a truthy non-boolean ok (G6), a decision salvaged from the last stdout line (G10) and a null exit code read as
 *    success (G11) pass the judge. C2 on the fourteen non-admit fixtures, HONEST records no row of tone success and no row
 *    outcome other than refused or unavailable.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS and each residual family's member
 * count as literals, beside the fields, the causes, the checks, the mutants, the fixtures, the field tokens, the admitters, the
 * READINGS and the BOUND table (`${member}:${reading}`); the judged set (every row's id, label and pins, every pin's quote and
 * witness, the residual members, every registered test title) is held to the out-of-file roster
 * test/fixtures/gp-reply-admission-roster.json. The roster is cut with the census, so an edit made to both passes these roster
 * comparisons.
 * OUTSIDE ANCHORS (their own case). The anchor model (AnchorModel; LIVE is the census's own) holds the census and roster
 * literals the readings compare: the requirement tag, the rows and their pins, the pin quotes, the fields and their pins, the
 * causes, clause (c)'s carry note, the words unavailable and success, the cited line numbers, the pinned schema and checkpoint
 * ids, the frame schema id, the frame the census writes around the vendored receipt (F-ADMIT's valid stdout), the residual
 * members, and the roster's statement and producer block. Twenty-two of the 27 READINGS compare part of the model with a file
 * outside the census and its roster, through fixed parse patterns (the acceptance split, clause (c)'s pattern, the citation
 * pattern and PRODUCER_SPEC's capture id). The other five compare model parts with one another: tiling T, tiling A, tiling B
 * and tiling C a row's pin quotes with its label (through the separator class), and field pins a field's pin quote with the
 * field; they reach a file outside only jointly with the label readings (trigger and clauses) and the field readings (field
 * count and field order), which the outside-anchor case asserts with them at once. (1) The bead's own row in the tracker export
 * (.beads/issues.jsonl), read through its title and the owner filing's citation line only (the first notes line opening
 * "Citation: ", so a note appended later changes no reading; measured: an appended note, and an appended note carrying its own
 * Citation line): statement (the roster's statement is the title); tag (the title opens with the requirement tag); trigger
 * (row T's label is the title's trigger); clauses (the citation line's three acceptance clauses are the labels of rows A, B and
 * C, in order); carry (clause (c) alone carries a note, the carry note); tiling T, tiling A, tiling B and tiling C (model-internal: the row's
 * pin quotes, in order, tile its label: each quote is non-empty and opens and closes on a non-separator character, and only
 * separator characters lie between quotes and at the label's ends); field count and field order (clause (a) splits into one
 * requirement per field, the i-th containing the i-th field); field pins (model-internal: each field's pin quote contains the field); cause
 * count and cause order (clause (c) splits into one failure per cause, the i-th containing the i-th cause); unavailable word and
 * success word (clause (c)'s word after "yields typed" equals the unavailable word, and its last word, after "claims", equals
 * the success word); cites (the citation quotes README.md lines 13 and 25); producer quotes (each cited quote lies in the
 * roster's producer line of that number); producer sha (each cited pin opens the roster's producer sha). (2) The vendored
 * receipt: pinned schema and pinned checkpoint (each equals the receipt's own). (3) The measured runs: frame schema (a measured
 * exit-0 run writes the frame schema id with ok true and an object result, and the measured exit-2 envelope carries it); frame
 * keys (every key of the census's frame is a key of one measured exit-0 frame, whose schema id and ok value the frame carries).
 * (4) wb-gxd7.3's P-SAMPLE-FILE capture path (result.decision.graph_digest): frame path (the census's frame holds the vendored
 * receipt at that path, the field segment dropped). (5) Pi's own source: registry word and tone word (the unavailable word is a
 * CapabilityErrorCategory member and the success word a statusTone member, membership only). (6) The wb-gxd7.3 census: A3
 * quote (its clause (c) sentence quotes row A3's quote whole).
 * BOUND: each BOUND member is an edit of the anchor model, named for the coordinated census-and-roster edit it stands for (the
 * C6-, PL- and G- edits the gate measured on cut 3; G-fieldpin, G-causeorder, G-unavailable-nonmember, G-success-nonmember,
 * ST-statement, G-requirement, G-carry, G-cites, G-schema, G-checkpoint and G-envelope added by cut 4), and the case asserts
 * that each reds the reading the BOUND table names beside it; every reading is red under at least one member.
 * So the readings hold by equality the labels of rows T, A, B and C, the requirement tag, the carry note, the cited line
 * numbers, the two words, the pinned ids, the frame schema id, the roster's statement and A3's quote; by count, order and
 * containment the five fields and the three causes; each quote's text once the row's split into pins is given, a separator at
 * a quote's edge included; the frame's top-level key names (schema, ok and result; any further top-level key must be a measured
 * frame key) and its decision path (the decision key under result, holding the vendored receipt); and the cited quotes in the
 * producer lines with each cited pin as the producer sha's prefix. They do not read the split of a label into pins
 * (R-PARTITION), row Q, the residual members, the producer block beyond the cited quotes and the sha's prefix, the frame's
 * whitespace and key order (the decision's included), a key the frame's result holds beside the decision, a field-pin entry
 * for a name that is not a field, or which pin carries a field beyond its quote containing the field (R-UNREAD), the
 * witnesses, the test titles, the checks, the mutants, the fixtures, or the frame reader (F-ADMIT, a census check, holds the
 * reader to the frame the census writes). The last case reads the vitest task tree (every registered test, in roster order, in
 * run mode, ran before it) and REACHED (every pin reached its witness compare).
 * RESIDUALS (named families, each with a pinned quiet row over its listed members; an instrument that starts reading a listed
 * member reds its row; a family's definition reaches further than its list, and the census claims nothing about an instance
 * the list does not name):
 * R-SPELLING (Q1, a receipt field the vocabulary reader does not read: composed from parts at run time, concatenated,
 * a Unicode-escaped identifier P3, or the upper-case constant of another producer; a vocabulary-free admitter (P4),
 * including a gp-spawning one (P5), is outside T1's text trigger; both are pinned as quiet input text here, not as a
 * complete call-site audit), R-MULTI-VIOLATION (Q2, a reply violating two fields: the judge accepts a refusal
 * naming either), R-RESOURCE (Q3, the statement's "resource constraints": no acceptance clause names one, the armed call
 * carries no exported budget and no check reads the reply's runtime_budget), R-SIDE-PATH (Q4, an admitter that reports a
 * refused reply's proposal outside its journal: the armed check reads the returned results and rows only), R-JUDGE (Q5, an
 * admitter the judge passes on all fifteen fixtures with HONEST's outcome on each, whose journal, as a property read sees it
 * (prototypes included), departs from HONEST's on its own input: D1 to D12, D15, D17 and D23 to D27, with F-SCHEMA's call as
 * D9 and D13 and F-TIMEOUT's as D14), R-PARTITION (Q6, a pin merged into its sibling with its quote re-homed, or the boundary
 * between two sibling pins moved with both quotes re-cut: every reading holds, and the same merge with the sibling's quote
 * left in place, or the same move with the right-hand quote left in place, reds one) and R-UNREAD (Q7, an edit of a model part
 * no reading takes, or of the part of one a reading passes over: every reading holds and the model changes).
 * R-JUDGE members: G1: schema substring membership; G2: reverse checkpoint prefix; G3: schema compared case-insensitively;
 * G4: any member of the decision receipt's family, including one gp has not shipped; G5: CLI frame schema ignored; G6: CLI ok
 * coerced truthy; G7: support searched as a substring of joined ids; G8: actor validation fails open on a relation with multiple
 * workers; G9: a refusal inherits a decision on its prototype; G10: a last-line salvage after noisy stdout; G11: null exit
 * status treated as success; G12: digest of decoded UTF-8 text; G13: a refused reply's receipt rows carry its decision;
 * G14: an unavailable result carries the complete stdout's decision; G15: checkpoint compared case-insensitively;
 * G17: graph_digest compared case-insensitively; G23: schema trimmed before the membership check; G24: checkpoint trimmed
 * before the membership check; G25: graph_digest trimmed before the comparison; G26: graph_digest compared on its first 23
 * characters; G27: checkpoint compared after its form prefix (G15, G17 and G23 keep the numbers of the landing-663 gate's
 * probes, and G24 to G27 stand for the landing-705 gate's jCkptTrim, jDigestTrim, jDigestPrefix and jCkptHexOnly). Their
 * survival limits the synthetic judge, not the independently specified host admission requirement. The first future admitter
 * must add inputs for these cases or explicitly re-scope its own claim. A bound admitter is run over the fifteen fixtures (A1)
 * and must be a module that spells the vocabulary (T1); binding one also changes the frozen admitter literal (rule 16).
 * R-PARTITION members: C6-mA: A5 into A4; C6-mT: T2 into T1; C6-mB: B2 into B1; C6-mC: C2 into C1; mT32: T3 into T2; mA21:
 * A2 into A1; mB32: B3 into B2; mT12: T1 into T2; mT23: T2 into T3; mA12: A1 into A2; mA45: A4 into A5; mB12: B1 into B2;
 * mB23: B2 into B3; mC12: C1 into C2; C6-sT: the boundary of T1 and T2 moved, 'reply' into T2; C6-sB: the boundary of B1 and
 * B2 moved, 'naming' into B1; sA12: the boundary of A1 and A2 moved, 'requires' into A2; sA45: the boundary of A4 and A5
 * moved, 'and' into A4; sC12: the boundary of C1 and C2 moved, 'and' into C1; sT23: the boundary of T2 and T3 moved, 'schema'
 * into T3; sT12r: the boundary of T1 and T2 moved the other way, 'artifact' into T1; sB23: the boundary of B2 and B3 moved,
 * 'and' into B2; sB12r: the boundary of B1 and B2 moved the other way, 'refusal' into B2; sT23r: the boundary of T2 and T3
 * moved the other way, 'a' into T2; sA45r: the boundary of A4 and A5 moved the other way, 'scope' into A5; sB23r: the
 * boundary of B2 and B3 moved the other way, 'field' into B3; sC12r: the boundary of C1 and C2 moved the other way,
 * 'unavailable' into C2 (mT32, mA21, mB32, sA12, sA45, sC12, sT23, sT12r, sB23 and sB12r keep the names of the landing-705
 * gate's probes; mT12, mT23, mA12, mA45, mB12, mB23, mC12, sT23r, sA45r, sB23r and sC12r were added from wb-54hd's survey of
 * one-pin merges and one-word boundary moves).
 * R-UNREAD members: C6-labelQ: row Q's label; C6-quoteQ: Q3's quote; C6-Q4: pin Q4 with its quote and members; C6-Q: row Q
 * whole with every residual member; C6-member: the Q1 member composed; PL1: the producer's line 11; PL2: text appended to
 * line 13 outside its quote; PL4: the producer blob id; PL5: text appended to line 25 outside its quote; PL-sha-suffix: the
 * producer sha's last hex digit changed, past every cited pin; G-frame-nested: a key nested beside the decision in the frame's
 * result; G-fieldpin-T2: schema's pin moved to T2, whose quote also contains the field; uPath: the producer path's directory
 * changed, '/README.md' kept; uKeyOrder: the frame's top-level keys reordered; uPretty: the frame pretty-printed;
 * uDecisionKeyOrder: the decision receipt's keys reversed in the frame; uNestedTwo: two keys nested beside the decision in the
 * frame's result; uSha13: the producer sha's 13th hex digit changed, just past the cited 12-hex pin; uLine25Prefix: text
 * prepended to line 25 outside its quote; uLine13Prefix: text prepended to line 13 outside its quote; uFieldPinsExtra: a
 * field-pin entry for a name that is not a field (uPath to uFieldPinsExtra keep the names of the landing-705 gate's probes).
 * NOT CLAIMED (limits of this file's own literals, not reading modes: no source outside the census and its roster names
 * them): an edit of this file and the roster together that changes only literals no reading takes, namely a BOUND, R-JUDGE,
 * R-PARTITION, R-UNREAD or other residual member removed from its table, the frozen literal and the roster; a check removed
 * from CHECKS and the judge while every remaining mutant still fails one; a mutant or a fixture removed from its table, the
 * frozen literal and the roster while every check still fires; a pin's case replaced by one that echoes its roster witness
 * (H6); the last respin-scope case removed with its roster title (H10-4; the respin-scope count holds the other three); a
 * header sentence no respin-scope case pins; and the outcome words admitted and refused, or a check, mutant, fixture or
 * residual family name, renamed everywhere it appears. Outside the claim: modules outside src/ (qa/, test/ and docs/ name the
 * vocabulary as text a test judges, this census included); the decision point's actual shape (the armed contract is this
 * census's reading of an unbuilt decision point, so an admitter whose cut takes another shape re-measures rows A to C with
 * it); the RPC transport (gp rpc --stdio replies are not modelled; the armed call is the CLI's exit code and stdout); a
 * deterministic, scores-only reply (gp eval's keyed scores carry no proposal: wb-0lf.5's duty). An unavailable result may
 * carry more than its outcome and cause (wb-1xvp.4's fallback record echoes the producer's refusal code verbatim; R-JUDGE's
 * G14 is one such result); only those two are judged.
 * SCOPE: the vocabulary reader does not read negation or context, so a src comment that merely names a field reds T1 (OVER-READ,
 * disclosed: no src module spells one today).
 *
 * Display paths added: none. Test-only: no src change, no GraphPolicyCLI dependency, adapter, worker or fake binary.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { describe, expect, it } from "vitest";
import type { CapabilityErrorCategory } from "../src/workbench/capability-registry.js";
import { decideControl, NATIVE_CONTROL_ACTIONS, type NativeControlRequest } from "../src/workbench/control.js";
import { ObservationProjection, type ObservationScope, type Presentation } from "../src/workbench/observation.js";
import { CAPTURES, fixtureOf, materialize, type Presented, presentedBytes, presentedKey, type WhitespaceEdit } from "./helpers/gp-snapshot-join-census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-0lf.3";
const REQUIREMENT = "FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R3";
const SUITE = `gp reply admission census (${BEAD}, ${REQUIREMENT})`;
const ROSTER_PATH = "test/fixtures/gp-reply-admission-roster.json";
const EXPORT = ".beads/issues.jsonl";
/** wb-gxd7.5's vendored gp sample receipt: result.decision of gp sample's stdout, unedited, accepted by gp inspect decision. */
const SAMPLE = "test/fixtures/gp-sample-receipt.json";
/** The producer's host-adapter snapshot, vendored byte for byte: the bytes the sample receipt's graph_digest hashes. */
const SNAPSHOT = "test/fixtures/gp-host-adapter-snapshot.json";
/** wb-gxd7.4's measured gp CLI runs (argv, rc, stdout) at the same build: the census's source for the CLI frame. */
const RUNS = "test/fixtures/gp-kind-label-roster.json";
/** The measured run whose stdout is the exit-2 error envelope F-EXIT-ERROR replays verbatim. */
const ERROR_RUN = "ready-work";
/** wb-gxd7.3's census: its acceptance (c) binds row A3's check to the byte-exact join key. */
const JOIN_CENSUS = "test/workbench-gp-snapshot-join-census.test.ts";
const CONTROL = "src/workbench/control.ts";
const REGISTRY = "src/workbench/capability-registry.ts";
const OBSERVATION = "src/workbench/observation.ts";
/** The one src module holding a near miss of the reply vocabulary (an rf digest pattern named GRAPH_DIGEST). */
const NEAR_MISS = "src/workbench/reactivefiber-observer.ts";
/** src holds well over this many files; fewer means the listing read nothing. */
const SRC_FLOOR = 100;
/** The live cases parse every src module or the tracker export; they carry this explicit budget. */
const LIVE_BUDGET_MS = 120_000;

type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json };
type Tone = Presentation["statusTone"];

const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const bytesOf = (path: string): Uint8Array => new Uint8Array(readFileSync(join(ROOT, path)));
const utf8 = (text: string): Uint8Array => new Uint8Array(Buffer.from(text, "utf8"));

function record(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** An own data property; an accessor is never invoked and an inherited value never counts. */
function own(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
}
const ownKeys = (value: unknown): string[] => (typeof value === "object" && value !== null ? Reflect.ownKeys(value).map(key => String(key)) : []);
const listOf = (value: unknown): readonly unknown[] => (Array.isArray(value) ? value : []);
function recordOf(value: unknown, what: string): Readonly<Record<string, unknown>> {
  if (!record(value)) throw new Error(`${what} is not an object`);
  return value;
}

// ---- the reply vocabulary (row T1): GraphPolicyCLI's names and the receipt's identity fields ----

/** The receipt's identity fields the admission compares, as gp writes them, and their camel-case spellings. */
const FIELD_TOKENS = ["graph_digest", "checkpoint_digest", "chosen_id", "graphDigest", "checkpointDigest", "chosenId"] as const;
/** GraphPolicyCLI's names in any case: graph and policy joined or split by a hyphen, underscore, dot or space; GraphDataIR. */
const NAMESPACE = /graph[-_. ]?policy|graphdatair/i;
const escaped = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const tokenPattern = (word: string): RegExp => new RegExp(`(?<![A-Za-z0-9_$])${escaped(word)}(?![A-Za-z0-9_$])`);
/** What a text spells of the reply vocabulary: the first GraphPolicyCLI name, then each field token, in FIELD_TOKENS order. */
function replyVocabulary(text: string): string[] {
  const name = NAMESPACE.exec(text)?.[0];
  return [...(name === undefined ? [] : [`namespace:${name.toLowerCase()}`]), ...FIELD_TOKENS.filter(token => tokenPattern(token).test(text))];
}

interface Entry {
  readonly path: string;
  readonly text: string;
}
let srcCache: readonly Entry[] | undefined;
/** git's would-commit listing under src/ (tracked and untracked, never ignored, present in the tree), each with its text. */
function srcEntries(): readonly Entry[] {
  if (srcCache === undefined) {
    const listed = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: ROOT, encoding: "utf8" });
    const paths = [...new Set(listed.split("\0").filter(path => path !== "" && existsSync(join(ROOT, path))))].sort();
    srcCache = paths.map(path => ({ path, text: textOf(path) }));
  }
  return srcCache;
}

// ---- the released reply (the vendored receipt, the vendored snapshot and the measured CLI frame) ----

/** The reply schema and checkpoint Pi pins: the vendored receipt's own (the outside anchors hold both to it). */
const PINNED_SCHEMA = "graphpolicy.receipt.decision.v1";
const PINNED_CHECKPOINT = "graphpolicy.checkpoint.c1:c463f16949fe653b3b09eab84f2ef6f80a60f880d02e85a515a28f3f61ac080d";
/** The gp CLI envelope's schema (the measured runs) and the decision's path in gp sample's stdout (wb-gxd7.3's capture). */
const ENVELOPE_SCHEMA = "graphpolicy.cli.v1";
/** The provider spellings the census tries at the control core: none is registered. */
const GP_PROVIDERS = ["gp", "graphpolicy", "graph-policy-cli"] as const;
/** The typed unavailable outcome: the capability registry's own category word. */
const UNAVAILABLE: Extract<CapabilityErrorCategory, "unavailable"> = "unavailable";
/** The tone a receipt row must never carry for a refused or unavailable call. */
const SUCCESS: Extract<Tone, "success"> = "success";
/** The only outcomes a row of a refused or unavailable call may record: any other word (admitted, succeeded, ...) claims more. */
const NON_SUCCESS: readonly string[] = ["refused", UNAVAILABLE];

const SAMPLE_DOC: unknown = JSON.parse(textOf(SAMPLE));
const RECEIPT = recordOf(own(SAMPLE_DOC, "receipt"), "the vendored receipt");
const SAMPLED = recordOf(own(RECEIPT, "sample"), "the vendored receipt's sample");
const JOIN = fixtureOf(bytesOf(SNAPSHOT));
const SNAPSHOT_VALUE = recordOf(JOIN.value, "the vendored snapshot");
const proposalOf = (receipt: unknown): unknown => own(own(receipt, "sample"), "chosen_id");
/** The exported support: the candidates gp received, which are the candidates Pi offered. */
const SUPPORT: readonly string[] = listOf(own(RECEIPT, "candidates")).filter((entry): entry is string => typeof entry === "string");
/** The actor scope of every fixture but F-ACTOR: the snapshot's agents. */
const AGENTS: readonly string[] = listOf(own(SNAPSHOT_VALUE, "entities"))
  .filter(entry => own(entry, "kind") === "agent")
  .map(entry => own(entry, "id"))
  .filter((entry): entry is string => typeof entry === "string");
/** The relation F-SUPPORT proposes: a can_execute relation of the snapshot Pi never offered, whose worker is in scope. */
const UNOFFERED = "exec-a2-t3";

interface MeasuredRun {
  readonly rc: number;
  readonly stdout: string;
}
/** A measured gp run of wb-gxd7.4's roster, by id. */
function measuredRun(id: string): MeasuredRun {
  const run = listOf(own(own(JSON.parse(textOf(RUNS)), "producer"), "runs")).find(entry => own(entry, "id") === id);
  const rc = own(run, "rc");
  const stdout = own(run, "stdout");
  if (typeof rc !== "number" || typeof stdout !== "string") throw new Error(`no measured run ${id}`);
  return { rc, stdout };
}
const MEASURED_ERROR = measuredRun(ERROR_RUN);

// ---- the armed contract: the census's reading of a Pi admitter for a GP reply ----

const FIELDS = ["schema", "checkpoint", "snapshotDigest", "actor", "support"] as const;
type Field = (typeof FIELDS)[number];
const CAUSES = ["timeout", "exit", "malformed"] as const;
type Cause = (typeof CAUSES)[number];

interface WorkerResult {
  /** The worker's deadline elapsed before it exited; stdout is whatever it had written. */
  readonly timedOut: boolean;
  /** Its exit code; null when it never exited. */
  readonly exitCode: number | null;
  readonly stdout: string;
}
interface AdmissionCall {
  /** The snapshot bytes Pi handed the worker (the CLI --graph file). */
  readonly presented: Uint8Array;
  /** The reply schema ids and checkpoint ids Pi pins. */
  readonly schemas: readonly string[];
  readonly checkpoints: readonly string[];
  /** The actor scope: the agents whose actions the caller may admit. */
  readonly actors: readonly string[];
  /** The exported support: the candidate action ids Pi offered. */
  readonly support: readonly string[];
  readonly worker: WorkerResult;
}
interface AdmissionJournal {
  /** What the admitter yields for the call; the judge reads each element by its own data properties. */
  readonly results: readonly unknown[];
  /** The receipt rows the admitter records for the call. */
  readonly rows: readonly unknown[];
}
type Admitter = (call: AdmissionCall) => AdmissionJournal;

/** The census allowlist: every src module bound as a GP reply admitter, with its armed entry point. Empty today. */
const GP_REPLY_ADMITTERS: readonly { readonly path: string; readonly admit: Admitter }[] = [];

const keyOf = (bytes: Uint8Array): string => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
/** The presented snapshot parsed and pretty-printed again: what a host hashing its own re-serialization hashes. */
function reserialized(bytes: Uint8Array): Uint8Array {
  try {
    return utf8(`${JSON.stringify(JSON.parse(Buffer.from(bytes).toString("utf8")), null, 2)}\n`);
  } catch {
    return bytes;
  }
}
/** The decision receipt of a gp CLI stdout: the frame's schema, ok true, and an object at result.decision. */
function decisionOf(stdout: string): Readonly<Record<string, unknown>> | undefined {
  let envelope: unknown;
  try {
    envelope = JSON.parse(stdout);
  } catch {
    return undefined;
  }
  if (own(envelope, "schema") !== ENVELOPE_SCHEMA || own(envelope, "ok") !== true) return undefined;
  const decision = own(own(envelope, "result"), "decision");
  return record(decision) ? decision : undefined;
}
/** The worker of the exported can_execute relation a proposal names, read from the bytes Pi presented (never from the reply). */
function actorOf(presented: Uint8Array, proposal: unknown): string | undefined {
  let snapshot: unknown;
  try {
    snapshot = JSON.parse(Buffer.from(presented).toString("utf8"));
  } catch {
    return undefined;
  }
  const relation = listOf(own(snapshot, "relations")).find(entry => own(entry, "id") === proposal && own(entry, "kind") === "can_execute");
  const workers = listOf(own(relation, "incidences"))
    .filter(entry => own(entry, "role") === "worker")
    .map(entry => own(entry, "participant"));
  const [worker] = workers;
  return workers.length === 1 && typeof worker === "string" ? worker : undefined;
}
/** The pinned schema's receipt family (graphpolicy.receipt.) and the pinned checkpoint's form prefix: what a loose host accepts. */
const familyOf = (id: string): string => `${id.split(".").slice(0, 2).join(".")}.`;
const prefixOf = (id: string): string => id.slice(0, id.indexOf(":") + 1);

/** How a synthetic admitter departs from the honest one (an empty shape is the honest admitter). */
interface Shape {
  /** Skip one field's check. */
  readonly skip?: Field;
  /** Accept any gp receipt schema of the pinned id's family, or any checkpoint id sharing the pinned id's prefix. */
  readonly schemaFamily?: boolean;
  readonly checkpointPrefix?: boolean;
  /** Hash the presented snapshot re-serialized instead of the bytes presented. */
  readonly reserialize?: boolean;
  /** Read the support from the reply's own candidates instead of the exported support. */
  readonly supportFromReply?: boolean;
  /** How a failed check is reported. */
  readonly refusal?: "twice" | "none" | "echo" | "first-field" | "with-decision" | "last-field";
  /** Read stdout although the deadline elapsed, or although the worker exited nonzero. */
  readonly timeoutRead?: boolean;
  readonly exitIgnored?: boolean;
  /** Report every unavailable cause as exit. */
  readonly causeCollapsed?: boolean;
  /** Report stdout that holds no decision as a schema refusal. */
  readonly malformedAsRefusal?: boolean;
  /** Salvage a proposal from stdout that holds no decision, and admit it. */
  readonly salvage?: boolean;
  /** Record every row with this tone. */
  readonly rowTone?: Tone;
  /** Also record an admitted row for every call that admits nothing. */
  readonly rowAdmitted?: boolean;
  /** Refuse every reply that parses. */
  readonly alwaysRefuse?: boolean;
  /** Admit the reply's last candidate instead of its sampled proposal. */
  readonly resample?: boolean;
  /** A side path: each refused reply's proposal, reported outside the journal. */
  readonly side?: (proposal: unknown) => void;
}
function passes(shape: Shape, field: Field, receipt: Readonly<Record<string, unknown>>, call: AdmissionCall): boolean {
  const proposal = proposalOf(receipt);
  switch (field) {
    case "schema": {
      const id = own(receipt, "schema");
      return typeof id === "string" && (shape.schemaFamily === true ? id.startsWith(familyOf(PINNED_SCHEMA)) : call.schemas.includes(id));
    }
    case "checkpoint": {
      const id = own(receipt, "checkpoint_digest");
      return typeof id === "string" && (shape.checkpointPrefix === true ? id.startsWith(prefixOf(PINNED_CHECKPOINT)) : call.checkpoints.includes(id));
    }
    case "snapshotDigest":
      return own(receipt, "graph_digest") === keyOf(shape.reserialize === true ? reserialized(call.presented) : call.presented);
    case "actor": {
      const actor = actorOf(call.presented, proposal);
      return actor !== undefined && call.actors.includes(actor);
    }
    case "support": {
      const offered: readonly unknown[] = shape.supportFromReply === true ? listOf(own(receipt, "candidates")) : call.support;
      return typeof proposal === "string" && offered.includes(proposal);
    }
  }
}
/** What a field's check compared, as the reply or the presented bytes state it (what an echoing refusal carries). */
function comparedValue(field: Field, receipt: Readonly<Record<string, unknown>>, call: AdmissionCall): unknown {
  if (field === "schema") return own(receipt, "schema");
  if (field === "checkpoint") return own(receipt, "checkpoint_digest");
  if (field === "snapshotDigest") return own(receipt, "graph_digest");
  if (field === "actor") return actorOf(call.presented, proposalOf(receipt)) ?? null;
  return proposalOf(receipt);
}
function hostOf(shape: Shape): Admitter {
  return call => {
    const results: unknown[] = [];
    const rows: unknown[] = [];
    const row = (outcome: string, tone: Tone): void => {
      rows.push({ outcome, tone: shape.rowTone ?? tone });
      if (shape.rowAdmitted === true && outcome !== "admitted") rows.push({ outcome: "admitted", tone: "active" });
    };
    const unavailable = (cause: Cause): AdmissionJournal => {
      results.push({ outcome: UNAVAILABLE, cause: shape.causeCollapsed === true ? "exit" : cause });
      row(UNAVAILABLE, "unknown");
      return { results, rows };
    };
    const refuse = (field: Field, receipt: Readonly<Record<string, unknown>> | undefined): AdmissionJournal => {
      const refusal = { outcome: "refused", field };
      if (shape.refusal === "twice") results.push(refusal, { ...refusal });
      else if (shape.refusal === "echo") results.push({ ...refusal, value: receipt === undefined ? null : comparedValue(field, receipt, call) });
      else if (shape.refusal === "first-field") results.push({ outcome: "refused", field: FIELDS[0] });
      else if (shape.refusal === "with-decision") results.push({ ...refusal, decision: { proposal: proposalOf(receipt), receipt: receipt ?? null } });
      else if (shape.refusal !== "none") results.push(refusal);
      row("refused", "failure");
      return { results, rows };
    };
    const admit = (proposal: unknown, receipt: unknown): AdmissionJournal => {
      results.push({ outcome: "admitted", decision: { proposal, receipt } });
      row("admitted", "active");
      return { results, rows };
    };
    const { worker } = call;
    if (worker.timedOut && shape.timeoutRead !== true) return unavailable("timeout");
    const exitCode = worker.timedOut ? 0 : worker.exitCode;
    if (exitCode !== 0 && shape.exitIgnored !== true) return unavailable("exit");
    const receipt = decisionOf(worker.stdout);
    if (receipt === undefined) {
      const salvaged = shape.salvage === true ? /"chosen_id":"([^"]+)"/.exec(worker.stdout)?.[1] : undefined;
      if (salvaged !== undefined) return admit(salvaged, null);
      return shape.malformedAsRefusal === true ? refuse(FIELDS[0], undefined) : unavailable("malformed");
    }
    if (shape.alwaysRefuse === true) return refuse(FIELDS[0], receipt);
    const failing = FIELDS.filter(field => field !== shape.skip && !passes(shape, field, receipt, call));
    if (failing.length > 0) {
      shape.side?.(proposalOf(receipt));
      return refuse(shape.refusal === "last-field" ? failing[failing.length - 1] : failing[0], receipt);
    }
    const candidates = listOf(own(receipt, "candidates"));
    return admit(shape.resample === true ? candidates[candidates.length - 1] : proposalOf(receipt), receipt);
  };
}
const HONEST = hostOf({});

// ---- the fixtures ----

type Expectation = { readonly kind: "admit" } | { readonly kind: "refuse"; readonly fields: readonly Field[] } | { readonly kind: "unavailable"; readonly cause: Cause };
interface Fixture {
  readonly id: string;
  readonly call: AdmissionCall;
  readonly expected: Expectation;
  /** The reply's decision receipt as the worker wrote it, when its stdout carries one. */
  readonly reply?: Readonly<Record<string, unknown>>;
}
const PRODUCER_SPEC = { field: "graph_digest", capture: "P-SAMPLE-FILE" } as const;
const presentation = (file: "fixture" | "compact", edit?: WhitespaceEdit): Presented =>
  materialize(JOIN, edit === undefined ? { transport: "cli", file } : { transport: "cli", file, edit }, PRODUCER_SPEC);
const FIXTURE_FILE = presentation("fixture");
/** The snapshot presented under each digest fixture: wb-gxd7.3's whitespace-only edits, and a snapshot whose content moved. */
const PRESENTATIONS: Readonly<Record<string, Presented>> = {
  "F-DIGEST-COMPACT": presentation("compact"),
  "F-DIGEST-NEWLINE": presentation("fixture", "strip-final-newline"),
  "F-DIGEST-CRLF": presentation("fixture", "crlf"),
  "F-DIGEST-MOVED": FIXTURE_FILE.transport === "cli" ? { ...FIXTURE_FILE, file: utf8(`${JSON.stringify(JOIN.variant, null, 2)}\n`) } : FIXTURE_FILE,
};
function presentationOf(id: string): Presented {
  const found = PRESENTATIONS[id];
  if (found === undefined) throw new Error(`no presentation ${id}`);
  return found;
}
/** The gp CLI frame around a result, as the measured exit-0 runs write it: the frame schema id, ok true and the result. */
const frameOf = (result: unknown): string => `${JSON.stringify({ schema: ENVELOPE_SCHEMA, ok: true, result })}\n`;
const envelopeOf = (receipt: unknown): string => frameOf({ decision: receipt });
const exited = (exitCode: number, stdout: string): WorkerResult => ({ timedOut: false, exitCode, stdout });
const VALID = envelopeOf(RECEIPT);
/** The valid stdout cut just after the proposal: the decision's tail and the frame never arrived. */
const TRUNCATED = VALID.slice(0, VALID.indexOf(`"chosen_id":${JSON.stringify(proposalOf(RECEIPT))}`) + `"chosen_id":${JSON.stringify(proposalOf(RECEIPT))}`.length);
function callOf(edit: Partial<AdmissionCall>): AdmissionCall {
  return { presented: presentedBytes(FIXTURE_FILE), schemas: [PINNED_SCHEMA], checkpoints: [PINNED_CHECKPOINT], actors: AGENTS, support: SUPPORT, worker: exited(0, VALID), ...edit };
}
const edited = (edits: Readonly<Record<string, unknown>>): Readonly<Record<string, unknown>> => ({ ...RECEIPT, ...edits });
/** A shipped gp receipt schema outside the pinned set: gp eval's runtime receipt in place of the sampled decision receipt. */
const R_SCHEMA = edited({ schema: "graphpolicy.receipt.runtime.v1" });
const R_CHECKPOINT = edited({ checkpoint_digest: `${prefixOf(PINNED_CHECKPOINT)}${"0".repeat(64)}` });
const R_SUPPORT = edited({ candidates: [...SUPPORT, UNOFFERED], sample: { ...SAMPLED, chosen_id: UNOFFERED } });
const R_OVER_BUDGET = edited({ runtime_budget: { max_candidates: 1, max_wall_ms: 1 } });
const refusing = (...fields: Field[]): Expectation => ({ kind: "refuse", fields });
const unavailableFor = (cause: Cause): Expectation => ({ kind: "unavailable", cause });
const OUT_OF_SCOPE = AGENTS.filter(agent => agent !== actorOf(presentedBytes(FIXTURE_FILE), proposalOf(RECEIPT)));
const digestFixture = (id: string): Fixture => ({
  id,
  call: callOf({ presented: presentedBytes(presentationOf(id)) }),
  expected: refusing("snapshotDigest"),
  reply: RECEIPT,
});
const FIXTURES: readonly Fixture[] = [
  { id: "F-ADMIT", call: callOf({}), expected: { kind: "admit" }, reply: RECEIPT },
  { id: "F-SCHEMA", call: callOf({ worker: exited(0, envelopeOf(R_SCHEMA)) }), expected: refusing("schema"), reply: R_SCHEMA },
  { id: "F-CHECKPOINT", call: callOf({ worker: exited(0, envelopeOf(R_CHECKPOINT)) }), expected: refusing("checkpoint"), reply: R_CHECKPOINT },
  digestFixture("F-DIGEST-COMPACT"),
  digestFixture("F-DIGEST-NEWLINE"),
  digestFixture("F-DIGEST-CRLF"),
  digestFixture("F-DIGEST-MOVED"),
  { id: "F-ACTOR", call: callOf({ actors: OUT_OF_SCOPE }), expected: refusing("actor"), reply: RECEIPT },
  { id: "F-SUPPORT", call: callOf({ worker: exited(0, envelopeOf(R_SUPPORT)) }), expected: refusing("support"), reply: R_SUPPORT },
  { id: "F-TIMEOUT", call: callOf({ worker: { timedOut: true, exitCode: null, stdout: VALID } }), expected: unavailableFor("timeout") },
  { id: "F-EXIT-ERROR", call: callOf({ worker: exited(MEASURED_ERROR.rc, MEASURED_ERROR.stdout) }), expected: unavailableFor("exit") },
  { id: "F-EXIT-CRASH", call: callOf({ worker: exited(134, VALID) }), expected: unavailableFor("exit") },
  { id: "F-MALFORMED-TRUNCATED", call: callOf({ worker: exited(0, TRUNCATED) }), expected: unavailableFor("malformed") },
  { id: "F-MALFORMED-EMPTY", call: callOf({ worker: exited(0, "") }), expected: unavailableFor("malformed") },
  { id: "F-MALFORMED-NO-DECISION", call: callOf({ worker: exited(0, frameOf({})) }), expected: unavailableFor("malformed") },
];
/** The residual fixtures (never judged with FIXTURES): a reply violating two fields, and one over its own runtime budget. */
const F_TWO: Fixture = { id: "F-TWO", call: callOf({ worker: exited(0, envelopeOf(R_SCHEMA)), actors: OUT_OF_SCOPE }), expected: refusing("schema", "actor"), reply: R_SCHEMA };
const F_OVER_BUDGET: Fixture = { id: "F-OVER-BUDGET", call: callOf({ worker: exited(0, envelopeOf(R_OVER_BUDGET)) }), expected: { kind: "admit" }, reply: R_OVER_BUDGET };
function fixture(id: string): Fixture {
  const found = FIXTURES.find(entry => entry.id === id);
  if (found === undefined) throw new Error(`no fixture ${id}`);
  return found;
}

// ---- the judge ----

const CHECKS = [
  "admitted-schema",
  "admitted-checkpoint",
  "admitted-snapshotDigest",
  "admitted-actor",
  "admitted-support",
  "refusal-count",
  "refusal-field",
  "refusal-decision",
  "unavailable",
  "success-row",
  "decision-kept",
] as const;
type Check = (typeof CHECKS)[number];
const ADMITTED: Readonly<Record<Field, Check>> = {
  schema: "admitted-schema",
  checkpoint: "admitted-checkpoint",
  snapshotDigest: "admitted-snapshotDigest",
  actor: "admitted-actor",
  support: "admitted-support",
};
/** Whether a value holds the needle at any depth, by own properties (a cycle is walked once). */
function holds(value: unknown, needle: unknown, seen: Set<object> = new Set()): boolean {
  if (value === needle) return true;
  if (typeof value !== "object" || value === null || seen.has(value)) return false;
  seen.add(value);
  return Reflect.ownKeys(value).some(key => holds(Object.getOwnPropertyDescriptor(value, key)?.value, needle, seen));
}
/** A result carries a decision: it is admitted, has a decision key, or holds the reply's proposal anywhere. */
function carriesDecision(result: unknown, entry: Fixture): boolean {
  return own(result, "outcome") === "admitted" || ownKeys(result).includes("decision") || (entry.reply !== undefined && holds(result, proposalOf(entry.reply)));
}
/** The checks one driven fixture fails, in CHECKS order. */
function violations(entry: Fixture, journal: AdmissionJournal): Check[] {
  const found = new Set<Check>();
  const results = [...journal.results];
  const of = (outcome: string): unknown[] => results.filter(result => own(result, "outcome") === outcome);
  const { expected } = entry;
  if (expected.kind === "admit") {
    const [admitted] = of("admitted");
    const decision = own(admitted, "decision");
    const kept = own(decision, "proposal") === proposalOf(entry.reply) && isDeepStrictEqual(own(decision, "receipt"), entry.reply);
    if (results.length !== 1 || of("admitted").length !== 1 || !kept) found.add("decision-kept");
  } else if (journal.rows.some(row => own(row, "tone") === SUCCESS || !NON_SUCCESS.some(word => word === own(row, "outcome")))) {
    found.add("success-row");
  }
  if (expected.kind === "refuse") {
    if (of("admitted").length > 0) for (const field of expected.fields) found.add(ADMITTED[field]);
    const refused = of("refused");
    if (results.length !== 1 || refused.length !== 1) found.add("refusal-count");
    for (const result of refused) {
      const field = own(result, "field");
      if (!isDeepStrictEqual(ownKeys(result).sort(), ["field", "outcome"]) || !expected.fields.some(member => member === field)) found.add("refusal-field");
    }
    if (results.some(result => carriesDecision(result, entry))) found.add("refusal-decision");
  }
  if (expected.kind === "unavailable") {
    const unavailable = of(UNAVAILABLE);
    if (results.length !== 1 || unavailable.length !== 1 || own(unavailable[0], "cause") !== expected.cause) found.add("unavailable");
  }
  return CHECKS.filter(check => found.has(check));
}
const drive = (admit: Admitter, entry: Fixture): AdmissionJournal => admit(entry.call);
/** One admitter over every fixture: each fixture's failed checks. */
function violationsOf(admit: Admitter): Record<string, Check[]> {
  return Object.fromEntries(FIXTURES.map(entry => [entry.id, violations(entry, drive(admit, entry))]));
}
/** A one-word reading of a journal's results: outcome:field, outcome:cause or admitted:proposal, comma-joined. */
function outcomeOf(journal: AdmissionJournal): string {
  return journal.results
    .map(result => {
      const outcome = String(own(result, "outcome"));
      if (outcome === "refused") return `refused:${String(own(result, "field"))}`;
      if (outcome === UNAVAILABLE) return `${UNAVAILABLE}:${String(own(result, "cause"))}`;
      return `${outcome}:${String(own(own(result, "decision"), "proposal"))}`;
    })
    .join(",");
}
/** The fields a fixture's reply violates under the honest predicates (none when its stdout carries no decision). */
function failingOf(entry: Fixture): Field[] {
  const receipt = decisionOf(entry.call.worker.stdout);
  return receipt === undefined ? [] : FIELDS.filter(field => !passes({}, field, receipt, entry.call));
}

/** The synthetic admitters that must each fail the armed check: one or more per acceptance quote. */
const MUTANTS: Readonly<Record<string, Shape>> = {
  "M-NO-SCHEMA": { skip: "schema" },
  "M-SCHEMA-FAMILY": { schemaFamily: true },
  "M-NO-CHECKPOINT": { skip: "checkpoint" },
  "M-CHECKPOINT-PREFIX": { checkpointPrefix: true },
  "M-NO-DIGEST": { skip: "snapshotDigest" },
  "M-DIGEST-RESERIALIZED": { reserialize: true },
  "M-NO-ACTOR": { skip: "actor" },
  "M-NO-SUPPORT": { skip: "support" },
  "M-SUPPORT-FROM-REPLY": { supportFromReply: true },
  "M-REFUSAL-TWICE": { refusal: "twice" },
  "M-REFUSAL-NONE": { refusal: "none" },
  "M-REFUSAL-ECHO": { refusal: "echo" },
  "M-REFUSAL-FIRST-FIELD": { refusal: "first-field" },
  "M-REFUSAL-DECISION": { refusal: "with-decision" },
  "M-TIMEOUT-READ": { timeoutRead: true },
  "M-EXIT-IGNORED": { exitIgnored: true },
  "M-CAUSE-COLLAPSED": { causeCollapsed: true },
  "M-MALFORMED-REFUSED": { malformedAsRefusal: true },
  "M-SALVAGED": { salvage: true },
  "M-SUCCESS-ROW": { rowTone: "success" },
  "M-ADMITTED-ROW": { rowAdmitted: true },
  "M-ALWAYS-REFUSE": { alwaysRefuse: true },
  "M-PROPOSAL-RESAMPLED": { resample: true },
};
/** A mutant's failed checks, for the fixtures where it fails any. */
function mutant(name: string): Record<string, Check[]> {
  const shape = MUTANTS[name];
  if (shape === undefined) throw new Error(`no mutant ${name}`);
  return Object.fromEntries(Object.entries(violationsOf(hostOf(shape))).filter(([, found]) => found.length > 0));
}
const outcomesOf = (ids: readonly string[], admit: Admitter = HONEST): Record<string, string> =>
  Object.fromEntries(ids.map(id => [id, outcomeOf(drive(admit, fixture(id)))]));
const expectedFields = (entry: Fixture): Field[] => (entry.expected.kind === "refuse" ? [...entry.expected.fields] : []);
const expectedCause = (entry: Fixture): Cause | undefined => (entry.expected.kind === "unavailable" ? entry.expected.cause : undefined);
const REFUSE_IDS = FIXTURES.filter(entry => entry.expected.kind === "refuse").map(entry => entry.id);
const WORKER_IDS = FIXTURES.filter(entry => entry.expected.kind === "unavailable").map(entry => entry.id);
const DIGEST_IDS = Object.keys(PRESENTATIONS);

// ---- the judge's residual members (R-JUDGE): admitters the judge passes, each departing from HONEST on its own input ----

/** A text parsed as JSON, or undefined when it does not parse. */
function parsedOf(text: string): unknown {
  try {
    const value: unknown = JSON.parse(text);
    return value;
  } catch {
    return undefined;
  }
}
/** The object at result.decision of a parsed frame. */
function decisionAt(frame: unknown): Readonly<Record<string, unknown>> | undefined {
  const decision = own(own(frame, "result"), "decision");
  return record(decision) ? decision : undefined;
}
/** Every key a property read reaches on an object: its own and its prototypes' (Object.prototype aside). */
function reachable(value: object): string[] {
  const keys: string[] = [];
  for (let at: object | null = value; at !== null && at !== Object.prototype; at = Object.getPrototypeOf(at)) keys.push(...Reflect.ownKeys(at).map(key => String(key)));
  return [...new Set(keys)];
}
/** A value as a property read sees it, prototypes included (measured on node v24.20.0: util.isDeepStrictEqual reads a decision
 * inherited through a prototype as no difference). */
function readView(value: unknown): unknown {
  if (typeof value !== "object" || value === null) return value;
  if (Array.isArray(value)) return value.map(readView);
  return Object.fromEntries(reachable(value).map(key => [key, readView(Reflect.get(value, key))]));
}
/** How an R-JUDGE member departs from the honest admitter: each hook replaces one honest step. */
interface Departure {
  readonly schemaOk?: (id: string, call: AdmissionCall) => boolean;
  readonly checkpointOk?: (id: string, call: AdmissionCall) => boolean;
  readonly digestOk?: (receipt: Readonly<Record<string, unknown>>, call: AdmissionCall) => boolean;
  readonly actorOk?: (receipt: Readonly<Record<string, unknown>>, call: AdmissionCall) => boolean;
  readonly supportOk?: (receipt: Readonly<Record<string, unknown>>, call: AdmissionCall) => boolean;
  readonly read?: (stdout: string) => Readonly<Record<string, unknown>> | undefined;
  readonly exitFailed?: (worker: WorkerResult) => boolean;
  readonly refusal?: (field: Field, receipt: Readonly<Record<string, unknown>>) => unknown;
}
/** gate-prep-38's departing admitter (its LEG 2 probe, typed): the honest steps, each hook in place of its step. */
function departing(hooks: Departure): Admitter {
  return call => {
    const unavailable = (cause: Cause): AdmissionJournal => ({ results: [{ outcome: UNAVAILABLE, cause }], rows: [{ outcome: UNAVAILABLE, tone: "unknown" }] });
    const { worker } = call;
    if (worker.timedOut) return unavailable("timeout");
    if (hooks.exitFailed === undefined ? worker.exitCode !== 0 : hooks.exitFailed(worker)) return unavailable("exit");
    const receipt = (hooks.read ?? decisionOf)(worker.stdout);
    if (receipt === undefined) return unavailable("malformed");
    const idHolds = (hook: ((id: string, call: AdmissionCall) => boolean) | undefined, key: string, field: Field): boolean => {
      const id = own(receipt, key);
      return hook === undefined ? passes({}, field, receipt, call) : typeof id === "string" && hook(id, call);
    };
    const holds: Readonly<Record<Field, () => boolean>> = {
      schema: () => idHolds(hooks.schemaOk, "schema", "schema"),
      checkpoint: () => idHolds(hooks.checkpointOk, "checkpoint_digest", "checkpoint"),
      snapshotDigest: () => (hooks.digestOk === undefined ? passes({}, "snapshotDigest", receipt, call) : hooks.digestOk(receipt, call)),
      actor: () => (hooks.actorOk === undefined ? passes({}, "actor", receipt, call) : hooks.actorOk(receipt, call)),
      support: () => (hooks.supportOk === undefined ? passes({}, "support", receipt, call) : hooks.supportOk(receipt, call)),
    };
    const [field] = FIELDS.filter(entry => !holds[entry]());
    if (field !== undefined) return { results: [hooks.refusal === undefined ? { outcome: "refused", field } : hooks.refusal(field, receipt)], rows: [{ outcome: "refused", tone: "failure" }] };
    return { results: [{ outcome: "admitted", decision: { proposal: proposalOf(receipt), receipt } }], rows: [{ outcome: "admitted", tone: "active" }] };
  };
}
/** HONEST's journal reworked after the fact (G13 and G14: HONEST's results and outcomes, more carried). */
const reworked =
  (edit: (call: AdmissionCall, journal: AdmissionJournal) => AdmissionJournal): Admitter =>
  call =>
    edit(call, HONEST(call));
/** The presented snapshot with its relations edited, pretty-printed as the fixture file is. */
function relationsEdited(edit: (relations: readonly Readonly<Record<string, unknown>>[]) => readonly unknown[]): Uint8Array {
  const snapshot = recordOf(parsedOf(Buffer.from(presentedBytes(FIXTURE_FILE)).toString("utf8")), "the presented snapshot");
  return utf8(`${JSON.stringify({ ...snapshot, relations: edit(listOf(own(snapshot, "relations")).filter(record)) }, null, 2)}\n`);
}
/** D7: an exported relation whose id is a substring of the joined support but no member of it. */
const D7_BYTES = relationsEdited(relations => [...relations, ...relations.filter(relation => own(relation, "id") === "exec-a1-t1").map(relation => ({ ...relation, id: "exec-a1-t" }))]);
/** D8: the proposal's relation carrying two workers. */
const D8_BYTES = relationsEdited(relations =>
  relations.map(relation => {
    if (own(relation, "id") !== "exec-a1-t1") return relation;
    const incidences = listOf(own(relation, "incidences"));
    const worker = incidences.find(incidence => own(incidence, "role") === "worker");
    return { ...relation, incidences: [...incidences, ...(record(worker) ? [{ ...worker, participant: "agent-2" }] : [])] };
  }),
);
/** D12: the presented bytes with one invalid UTF-8 byte inside a string value. */
const D12_AT = Buffer.from(presentedBytes(FIXTURE_FILE)).indexOf(Buffer.from('"agent-1"')) + 2;
const D12_BYTES = new Uint8Array(
  Buffer.concat([Buffer.from(presentedBytes(FIXTURE_FILE).slice(0, D12_AT)), Buffer.from([0xff]), Buffer.from(presentedBytes(FIXTURE_FILE).slice(D12_AT))]),
);
/** An id with the hex after its form prefix upper-cased (D15's checkpoint and D17's digest). */
const hexUpper = (id: string): string => `${prefixOf(id)}${id.slice(prefixOf(id).length).toUpperCase()}`;
/** Each R-JUDGE member's own input, where it departs from HONEST (D9 and D13 are F-SCHEMA's call, D14 is F-TIMEOUT's; D15, D17
 * and D23 keep the numbers of the landing-663 gate's probes; D24 to D27 are the inputs of G24 to G27, which stand for the
 * landing-705 gate's four). */
const DEPARTURES: Readonly<Record<string, AdmissionCall>> = {
  D1: callOf({ worker: exited(0, envelopeOf(edited({ schema: "graphpolicy.receipt.decision" }))) }),
  D2: callOf({ worker: exited(0, envelopeOf(edited({ checkpoint_digest: prefixOf(PINNED_CHECKPOINT) }))) }),
  D3: callOf({ worker: exited(0, envelopeOf(edited({ schema: PINNED_SCHEMA.toUpperCase() }))) }),
  D4: callOf({ worker: exited(0, envelopeOf(edited({ schema: "graphpolicy.receipt.decision.draft" }))) }),
  D5: callOf({ worker: exited(0, `${JSON.stringify({ schema: "other.cli.v9", ok: true, result: { decision: RECEIPT } })}\n`) }),
  D6: callOf({ worker: exited(0, `${JSON.stringify({ schema: ENVELOPE_SCHEMA, ok: 1, result: { decision: RECEIPT } })}\n`) }),
  D7: callOf({ presented: D7_BYTES, worker: exited(0, envelopeOf(edited({ graph_digest: keyOf(D7_BYTES), candidates: [...SUPPORT, "exec-a1-t"], sample: { ...SAMPLED, chosen_id: "exec-a1-t" } }))) }),
  D8: callOf({ presented: D8_BYTES, worker: exited(0, envelopeOf(edited({ graph_digest: keyOf(D8_BYTES) }))) }),
  D9: fixture("F-SCHEMA").call,
  D10: callOf({ worker: exited(0, `progress 1/1\n${VALID}`) }),
  D11: callOf({ worker: { timedOut: false, exitCode: null, stdout: VALID } }),
  D12: callOf({ presented: D12_BYTES, worker: exited(0, envelopeOf(edited({ graph_digest: keyOf(utf8(Buffer.from(D12_BYTES).toString("utf8"))) }))) }),
  D13: fixture("F-SCHEMA").call,
  D14: fixture("F-TIMEOUT").call,
  D15: callOf({ worker: exited(0, envelopeOf(edited({ checkpoint_digest: hexUpper(PINNED_CHECKPOINT) }))) }),
  D17: callOf({ worker: exited(0, envelopeOf(edited({ graph_digest: hexUpper(String(own(RECEIPT, "graph_digest"))) }))) }),
  D23: callOf({ worker: exited(0, envelopeOf(edited({ schema: `${PINNED_SCHEMA} ` }))) }),
  D24: callOf({ worker: exited(0, envelopeOf(edited({ checkpoint_digest: `${PINNED_CHECKPOINT} ` }))) }),
  D25: callOf({ worker: exited(0, envelopeOf(edited({ graph_digest: `${String(own(RECEIPT, "graph_digest"))} ` }))) }),
  D26: callOf({ worker: exited(0, envelopeOf(edited({ graph_digest: `${String(own(RECEIPT, "graph_digest")).slice(0, 23)}${"0".repeat(64 - 16)}` }))) }),
  D27: callOf({ worker: exited(0, envelopeOf(edited({ checkpoint_digest: `graphpolicy.checkpoint.c2:${PINNED_CHECKPOINT.slice(prefixOf(PINNED_CHECKPOINT).length)}` }))) }),
};
/** R-JUDGE (Q5): each member passes every check on all fifteen fixtures with HONEST's outcomes, and departs on its own input. */
const JUDGE_SURVIVORS: Readonly<Record<string, { readonly about: string; readonly input: string; readonly admit: Admitter }>> = {
  G1: { about: "schema substring membership", input: "D1", admit: departing({ schemaOk: (id, call) => call.schemas.some(schema => schema.includes(id)) }) },
  G2: { about: "reverse checkpoint prefix", input: "D2", admit: departing({ checkpointOk: (id, call) => call.checkpoints.some(checkpoint => checkpoint.startsWith(id)) }) },
  G3: {
    about: "schema compared case-insensitively",
    input: "D3",
    admit: departing({ schemaOk: (id, call) => call.schemas.some(schema => schema.toLowerCase() === id.toLowerCase()) }),
  },
  G4: { about: "any member of the decision receipt's family, including one gp has not shipped", input: "D4", admit: departing({ schemaOk: id => id.startsWith("graphpolicy.receipt.decision.") }) },
  G5: { about: "CLI frame schema ignored", input: "D5", admit: departing({ read: stdout => (own(parsedOf(stdout), "ok") === true ? decisionAt(parsedOf(stdout)) : undefined) }) },
  G6: {
    about: "CLI ok coerced truthy",
    input: "D6",
    admit: departing({ read: stdout => (own(parsedOf(stdout), "schema") === ENVELOPE_SCHEMA && own(parsedOf(stdout), "ok") ? decisionAt(parsedOf(stdout)) : undefined) }),
  },
  G7: {
    about: "support searched as a substring of joined ids",
    input: "D7",
    admit: departing({ supportOk: (receipt, call) => typeof proposalOf(receipt) === "string" && call.support.join(",").includes(String(proposalOf(receipt))) }),
  },
  G8: {
    about: "actor validation fails open on a relation with multiple workers",
    input: "D8",
    admit: departing({
      actorOk: (receipt, call) => {
        const actor = actorOf(call.presented, proposalOf(receipt));
        return actor === undefined || call.actors.includes(actor);
      },
    }),
  },
  G9: {
    about: "a refusal inherits a decision on its prototype",
    input: "D9",
    admit: departing({
      refusal: (field, receipt) => {
        const refusal: unknown = { outcome: "refused", field };
        Object.setPrototypeOf(refusal, { decision: { proposal: proposalOf(receipt), receipt } });
        return refusal;
      },
    }),
  },
  G10: { about: "a last-line salvage after noisy stdout", input: "D10", admit: departing({ read: stdout => decisionOf(stdout) ?? decisionOf(stdout.trim().split("\n").pop() ?? "") }) },
  G11: { about: "null exit status treated as success", input: "D11", admit: departing({ exitFailed: worker => Boolean(worker.exitCode) }) },
  G12: {
    about: "digest of decoded UTF-8 text",
    input: "D12",
    admit: departing({ digestOk: (receipt, call) => own(receipt, "graph_digest") === keyOf(utf8(Buffer.from(call.presented).toString("utf8"))) }),
  },
  G13: {
    about: "a refused reply's receipt rows carry its decision",
    input: "D13",
    admit: reworked((call, journal) => {
      const receipt = decisionOf(call.worker.stdout);
      if (receipt === undefined || !journal.results.some(result => own(result, "outcome") === "refused")) return journal;
      return { results: journal.results, rows: journal.rows.map(row => (record(row) ? { ...row, decision: { proposal: proposalOf(receipt), receipt } } : row)) };
    }),
  },
  G14: {
    about: "an unavailable result carries the complete stdout's decision",
    input: "D14",
    admit: reworked((call, journal) => {
      const receipt = decisionOf(call.worker.stdout);
      if (receipt === undefined) return journal;
      return {
        results: journal.results.map(result => (record(result) && own(result, "outcome") === UNAVAILABLE ? { ...result, decision: { proposal: proposalOf(receipt), receipt } } : result)),
        rows: journal.rows,
      };
    }),
  },
  G15: {
    about: "checkpoint compared case-insensitively",
    input: "D15",
    admit: departing({ checkpointOk: (id, call) => call.checkpoints.some(checkpoint => checkpoint.toLowerCase() === id.toLowerCase()) }),
  },
  G17: {
    about: "graph_digest compared case-insensitively",
    input: "D17",
    admit: departing({
      digestOk: (receipt, call) => {
        const digest = own(receipt, "graph_digest");
        return typeof digest === "string" && digest.toLowerCase() === keyOf(call.presented).toLowerCase();
      },
    }),
  },
  G23: { about: "schema trimmed before the membership check", input: "D23", admit: departing({ schemaOk: (id, call) => call.schemas.includes(id.trim()) }) },
  G24: { about: "checkpoint trimmed before the membership check", input: "D24", admit: departing({ checkpointOk: (id, call) => call.checkpoints.includes(id.trim()) }) },
  G25: {
    about: "graph_digest trimmed before the comparison",
    input: "D25",
    admit: departing({
      digestOk: (receipt, call) => {
        const digest = own(receipt, "graph_digest");
        return typeof digest === "string" && digest.trim() === keyOf(call.presented);
      },
    }),
  },
  G26: {
    about: "graph_digest compared on its first 23 characters",
    input: "D26",
    admit: departing({
      digestOk: (receipt, call) => {
        const digest = own(receipt, "graph_digest");
        return typeof digest === "string" && digest.slice(0, 23) === keyOf(call.presented).slice(0, 23);
      },
    }),
  },
  G27: {
    about: "checkpoint compared after its form prefix",
    input: "D27",
    admit: departing({ checkpointOk: (id, call) => call.checkpoints.some(checkpoint => checkpoint.slice(prefixOf(checkpoint).length) === id.slice(prefixOf(id).length)) }),
  },
};

// ---- the judged rows (rule 16) ----

interface Row {
  readonly id: string;
  /** Row T: the title's trigger; rows A to C: an acceptance clause; row Q: the residual families. */
  readonly label: string;
  readonly pins: readonly string[];
}
/** Each pin's quote: the quotes of a row tile its label. Q's pins name their residual families. */
const QUOTES: Readonly<Record<string, string>> = {
  T1: "When Pi admits a GraphPolicyCLI reply",
  T2: "artifact: released GP reply schema",
  T3: "a Pi decision point",
  A1: "a reader-adapter test over a fixture reply asserts admission requires",
  A2: "schema id and checkpoint id in the pinned set",
  A3: "snapshotDigest === the digest Pi exported",
  A4: "actor in scope",
  A5: "and proposed action inside the exported support",
  B1: "each violation yields exactly one typed refusal",
  B2: "naming only the field",
  B3: "and no decision object",
  C1: "a GP worker timeout, non-zero exit or malformed stdout yields typed unavailable",
  C2: "and no receipt row claims success",
  Q1: "R-SPELLING",
  Q2: "R-MULTI-VIOLATION",
  Q3: "R-RESOURCE",
  Q4: "R-SIDE-PATH",
  Q5: "R-JUDGE",
  Q6: "R-PARTITION",
  Q7: "R-UNREAD",
};
const ROWS: readonly Row[] = [
  { id: "T", label: "When Pi admits a GraphPolicyCLI reply (artifact: released GP reply schema + a Pi decision point)", pins: ["T1", "T2", "T3"] },
  {
    id: "A",
    label:
      "a reader-adapter test over a fixture reply asserts admission requires schema id and checkpoint id in the pinned set, snapshotDigest === the digest Pi exported, actor in scope and proposed action inside the exported support",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  { id: "B", label: "each violation yields exactly one typed refusal naming only the field and no decision object", pins: ["B1", "B2", "B3"] },
  { id: "C", label: "a GP worker timeout, non-zero exit or malformed stdout yields typed unavailable and no receipt row claims success", pins: ["C1", "C2"] },
  { id: "Q", label: "the residuals' pinned quiet rows", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
];
/** The field each field-bearing pin of row A carries, in FIELDS order. */
const FIELD_PINS: Readonly<Record<Field, string>> = { schema: "A2", checkpoint: "A2", snapshotDigest: "A3", actor: "A4", support: "A5" };

/** The residual families' members: texts for the vocabulary reader (Q1), fixtures and synthetic admitters (Q2 to Q4). */
const SPELLINGS: Readonly<Record<string, string>> = {
  composed: 'const key = ["graph", "digest"].join("_");\nexport const digestOf = (reply: Record<string, string>) => reply[key];\n',
  concatenated: 'export const field = "checkpoint" + "_digest";\nexport const proposal = "chosen" + "_id";\n',
  "upper-snake": "const GRAPH_DIGEST = /^sha256:[0-9a-f]{64}$/;\nexport const CHOSEN_ID = 1;\n",
  "escaped-identifier": `export const digestOf = (reply: Record<string, string>) => reply.graph${String.fromCodePoint(0x5c)}u005fdigest;\n`,
  "vocabulary-free-admitter": 'export function admitReply(frame: { result?: { decision?: unknown } }) { return frame.result?.decision; }\n',
  "gp-spawning-admitter": 'export function admitReply(run: (binary: string) => unknown) { const frame = run("gp"); return frame; }\n',
};
// ---- the anchor model: what the outside readings compare from this census and its roster ----

/** The census and roster literals the outside readings compare (LIVE, below the roster, is the census's own). */
interface AnchorModel {
  readonly requirement: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly fields: readonly string[];
  readonly fieldPins: Readonly<Record<string, string>>;
  readonly causes: readonly string[];
  /** Clause (c)'s carry note. */
  readonly carry: string;
  readonly unavailable: string;
  readonly success: string;
  /** The README.md lines the filing cites. */
  readonly citedLines: readonly number[];
  readonly schema: string;
  readonly checkpoint: string;
  readonly envelope: string;
  /** The frame the census writes around the vendored receipt: F-ADMIT's valid stdout. */
  readonly frame: string;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  /** The roster's statement and producer block. */
  readonly statement: string;
  readonly producer: Roster["producer"];
}
type Edit = (model: AnchorModel) => AnchorModel;
function omitted<T>(table: Readonly<Record<string, T>>, keys: readonly string[]): Record<string, T> {
  return Object.fromEntries(Object.entries(table).filter(([key]) => !keys.includes(key)));
}
const quoted = (model: AnchorModel, pin: string, quote: string): AnchorModel => ({ ...model, quotes: { ...model.quotes, [pin]: quote } });
const relabeled = (model: AnchorModel, id: string, label: string): AnchorModel => ({ ...model, rows: model.rows.map(row => (row.id === id ? { ...row, label } : row)) });
const labelIn = (model: AnchorModel, id: string): string => model.rows.find(row => row.id === id)?.label ?? "";
function rowRemoved(model: AnchorModel, id: string): AnchorModel {
  const pins = model.rows.find(row => row.id === id)?.pins ?? [];
  return { ...model, rows: model.rows.filter(row => row.id !== id), quotes: omitted(model.quotes, pins) };
}
function pinRemoved(model: AnchorModel, id: string, pin: string): AnchorModel {
  return { ...model, rows: model.rows.map(row => (row.id === id ? { ...row, pins: row.pins.filter(entry => entry !== pin) } : row)), quotes: omitted(model.quotes, [pin]) };
}
/** Pin `from` of a row merged into its sibling `into`, whose quote becomes `quote`; a field `from` carried moves to `into`. */
function merged(model: AnchorModel, id: string, into: string, from: string, quote: string): AnchorModel {
  const removed = quoted(pinRemoved(model, id, from), into, quote);
  return { ...removed, fieldPins: Object.fromEntries(Object.entries(model.fieldPins).map(([field, pin]) => [field, pin === from ? into : pin])) };
}
const fieldRemoved = (model: AnchorModel, field: string): AnchorModel => ({ ...model, fields: model.fields.filter(entry => entry !== field), fieldPins: omitted(model.fieldPins, [field]) });
const causeRemoved = (model: AnchorModel, cause: string): AnchorModel => ({ ...model, causes: model.causes.filter(entry => entry !== cause) });
const lined = (model: AnchorModel, line: string, text: string): AnchorModel => ({ ...model, producer: { ...model.producer, lines: { ...model.producer.lines, [line]: text } } });
const frameText = (frame: Readonly<Record<string, unknown>>): string => `${JSON.stringify(frame)}\n`;

/** R-PARTITION (Q6): a pin merged into its sibling, its quote re-homed into the sibling's (the gates' coordinated merges, and the
 * merges wb-54hd's survey of one-pin merges found quiet). */
const PARTITIONS: Readonly<Record<string, { readonly row: string; readonly into: string; readonly from: string; readonly quote: string }>> = {
  "C6-mA": { row: "A", into: "A4", from: "A5", quote: "actor in scope and proposed action inside the exported support" },
  "C6-mT": { row: "T", into: "T1", from: "T2", quote: "When Pi admits a GraphPolicyCLI reply (artifact: released GP reply schema" },
  "C6-mB": { row: "B", into: "B1", from: "B2", quote: "each violation yields exactly one typed refusal naming only the field" },
  "C6-mC": { row: "C", into: "C1", from: "C2", quote: "a GP worker timeout, non-zero exit or malformed stdout yields typed unavailable and no receipt row claims success" },
  mT32: { row: "T", into: "T2", from: "T3", quote: "artifact: released GP reply schema + a Pi decision point" },
  mA21: { row: "A", into: "A1", from: "A2", quote: "a reader-adapter test over a fixture reply asserts admission requires schema id and checkpoint id in the pinned set" },
  mB32: { row: "B", into: "B2", from: "B3", quote: "naming only the field and no decision object" },
  mT12: { row: "T", into: "T2", from: "T1", quote: "When Pi admits a GraphPolicyCLI reply (artifact: released GP reply schema" },
  mT23: { row: "T", into: "T3", from: "T2", quote: "artifact: released GP reply schema + a Pi decision point" },
  mA12: { row: "A", into: "A2", from: "A1", quote: "a reader-adapter test over a fixture reply asserts admission requires schema id and checkpoint id in the pinned set" },
  mA45: { row: "A", into: "A5", from: "A4", quote: "actor in scope and proposed action inside the exported support" },
  mB12: { row: "B", into: "B2", from: "B1", quote: "each violation yields exactly one typed refusal naming only the field" },
  mB23: { row: "B", into: "B3", from: "B2", quote: "naming only the field and no decision object" },
  mC12: { row: "C", into: "C2", from: "C1", quote: "a GP worker timeout, non-zero exit or malformed stdout yields typed unavailable and no receipt row claims success" },
};
interface Resplit {
  readonly left: string;
  readonly right: string;
  /** The left pin's quote and the right pin's quote once the boundary between them moved. */
  readonly quotes: readonly [string, string];
}
/** R-PARTITION (Q6) too: the boundary between two sibling pins moved, both quotes re-cut (the landing-663 and landing-705 gates'
 * re-splits, and the one-word moves wb-54hd's survey found quiet). */
const RESPLITS: Readonly<Record<string, Resplit>> = {
  "C6-sT": { left: "T1", right: "T2", quotes: ["When Pi admits a GraphPolicyCLI", "reply (artifact: released GP reply schema"] },
  "C6-sB": { left: "B1", right: "B2", quotes: ["each violation yields exactly one typed refusal naming", "only the field"] },
  sA12: { left: "A1", right: "A2", quotes: ["a reader-adapter test over a fixture reply asserts admission", "requires schema id and checkpoint id in the pinned set"] },
  sA45: { left: "A4", right: "A5", quotes: ["actor in scope and", "proposed action inside the exported support"] },
  sC12: { left: "C1", right: "C2", quotes: ["a GP worker timeout, non-zero exit or malformed stdout yields typed unavailable and", "no receipt row claims success"] },
  sT23: { left: "T2", right: "T3", quotes: ["artifact: released GP reply", "schema + a Pi decision point"] },
  sT12r: { left: "T1", right: "T2", quotes: ["When Pi admits a GraphPolicyCLI reply (artifact", "released GP reply schema"] },
  sB23: { left: "B2", right: "B3", quotes: ["naming only the field and", "no decision object"] },
  sB12r: { left: "B1", right: "B2", quotes: ["each violation yields exactly one typed", "refusal naming only the field"] },
  sT23r: { left: "T2", right: "T3", quotes: ["artifact: released GP reply schema + a", "Pi decision point"] },
  sA45r: { left: "A4", right: "A5", quotes: ["actor in", "scope and proposed action inside the exported support"] },
  sB23r: { left: "B2", right: "B3", quotes: ["naming only the", "field and no decision object"] },
  sC12r: { left: "C1", right: "C2", quotes: ["a GP worker timeout, non-zero exit or malformed stdout yields typed", "unavailable and no receipt row claims success"] },
};
/** A moved boundary: the left pin's quote re-cut, and the right pin's too unless it is left in place. */
function resplit(model: AnchorModel, member: Resplit, rightKept = false): AnchorModel {
  const moved = quoted(model, member.left, member.quotes[0]);
  return rightKept ? moved : quoted(moved, member.right, member.quotes[1]);
}
/** R-UNREAD (Q7): edits of model parts no outside reading takes, or of the part of one a reading passes over (the gates' coordinated edits
 * of row Q, the residual list, the producer block, the frame's text and result, and the field pins). */
const UNREAD: Readonly<Record<string, Edit>> = {
  "C6-labelQ": model => relabeled(model, "Q", "the residuals' quiet rows"),
  "C6-quoteQ": model => quoted(model, "Q3", "R-RESOURCES"),
  "C6-Q4": model => ({ ...pinRemoved(model, "Q", "Q4"), residuals: omitted(model.residuals, ["Q4"]) }),
  "C6-Q": model => ({ ...rowRemoved(model, "Q"), residuals: {} }),
  "C6-member": model => ({ ...model, residuals: { ...model.residuals, Q1: (model.residuals.Q1 ?? []).filter(member => member !== "composed") } }),
  PL1: model => lined(model, "11", (model.producer.lines["11"] ?? "").replace("permission-scoped, ", "")),
  PL2: model => lined(model, "13", `${model.producer.lines["13"] ?? ""} (an edit outside the quote)`),
  PL4: model => ({ ...model, producer: { ...model.producer, blob: "0".repeat(40) } }),
  PL5: model => lined(model, "25", `${model.producer.lines["25"] ?? ""} (an edit outside the quote)`),
  "PL-sha-suffix": model => ({ ...model, producer: { ...model.producer, sha: `${model.producer.sha.slice(0, -1)}${model.producer.sha.endsWith("0") ? "1" : "0"}` } }),
  "G-frame-nested": model => ({ ...model, frame: frameText({ schema: model.envelope, ok: true, result: { decision: RECEIPT, probe: 1 } }) }),
  "G-fieldpin-T2": model => ({ ...model, fieldPins: { ...model.fieldPins, schema: "T2" } }),
  uPath: model => ({ ...model, producer: { ...model.producer, path: model.producer.path.replace(/[^/]+(?=\/README\.md$)/, "another-program") } }),
  uKeyOrder: model => ({ ...model, frame: frameText({ result: { decision: RECEIPT }, ok: true, schema: model.envelope }) }),
  uPretty: model => ({ ...model, frame: `${JSON.stringify(parsedOf(model.frame), null, 2)}\n` }),
  uDecisionKeyOrder: model => ({ ...model, frame: frameText({ schema: model.envelope, ok: true, result: { decision: Object.fromEntries(Object.entries(RECEIPT).reverse()) } }) }),
  uNestedTwo: model => ({ ...model, frame: frameText({ schema: model.envelope, ok: true, result: { decision: RECEIPT, probe: 1, trace: 2 } }) }),
  uSha13: model => ({ ...model, producer: { ...model.producer, sha: `${model.producer.sha.slice(0, 12)}${model.producer.sha.charAt(12) === "0" ? "1" : "0"}${model.producer.sha.slice(13)}` } }),
  uLine25Prefix: model => lined(model, "25", `(an edit outside the quote) ${model.producer.lines["25"] ?? ""}`),
  uLine13Prefix: model => lined(model, "13", `(an edit outside the quote) ${model.producer.lines["13"] ?? ""}`),
  uFieldPinsExtra: model => ({ ...model, fieldPins: { ...model.fieldPins, extra: "A1" } }),
};
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  Q1: Object.keys(SPELLINGS),
  Q2: ["two-field-reply"],
  Q3: ["over-budget-reply"],
  Q4: ["side-path-admitter"],
  Q5: Object.keys(JUDGE_SURVIVORS),
  Q6: [...Object.keys(PARTITIONS), ...Object.keys(RESPLITS)],
  Q7: Object.keys(UNREAD),
};

// ---- the planted controls ----

const PLANTS: Readonly<Record<string, string>> = {
  field: "const digest = reply.graph_digest;\n",
  camel: "const { graphDigest, checkpointDigest, chosenId } = parsed;\n",
  namespace: 'if (envelope.schema === "graphpolicy.cli.v1") return envelope;\n',
  all: `GraphPolicyCLI ${FIELD_TOKENS.join(" ")}\n`,
  quiet: "const GRAPH_DIGEST = 1;\nconst graph_digests = 2;\nexport const xchosen_id = 3;\nconst digest = node.subjectBasis;\n",
};

// ---- the cases ----

const IMPL: Readonly<Record<string, () => Json>> = {
  T1: () => {
    const src = srcEntries();
    const reading = src.map(entry => ({ path: entry.path, found: replyVocabulary(entry.text) })).filter(entry => entry.found.length > 0);
    const named = reading.map(entry => `${entry.path}: ${entry.found.join(", ")}`);
    const bound = GP_REPLY_ADMITTERS.map(entry => entry.path);
    expect(named, "no src module spells a GraphPolicyCLI name or a receipt identity field").toEqual([]);
    expect(
      reading.map(entry => entry.path),
      "the src modules that spell the reply vocabulary (names in any case, field tokens case-sensitive) are exactly the bound admitters",
    ).toEqual(bound);
    expect(src.length, "the src floor").toBeGreaterThanOrEqual(SRC_FLOOR);
    const readsCore = src.find(entry => entry.path === CONTROL)?.text.includes("export function decideControl(") === true;
    expect(readsCore, "the src leg read the control core's real text").toBe(true);
    const near = src.find(entry => entry.path === NEAR_MISS)?.text ?? "";
    expect(near.includes("GRAPH_DIGEST"), "the near miss's real text holds its constant").toBe(true);
    const controls = Object.fromEntries(Object.entries(PLANTS).map(([label, text]) => [label, replyVocabulary(text)]));
    expect(controls.all, "every member is read").toEqual(["namespace:graphpolicy", ...FIELD_TOKENS]);
    expect(controls.quiet, "near tokens are not the vocabulary").toEqual([]);
    return { srcFloor: src.length >= SRC_FLOOR, named, bound, readsCore, nearMiss: replyVocabulary(near), controls };
  },
  T2: () => {
    const generator = own(SAMPLE_DOC, "generator");
    const validation = own(SAMPLE_DOC, "validation");
    const argv = listOf(own(generator, "argv"));
    const witness = {
      generatedBy: String(argv[2]),
      accepted: own(validation, "ok") === true && own(validation, "valid") === true,
      sourceSha: String(own(generator, "sourceSha")),
      receiptSchema: String(own(RECEIPT, "schema")),
      kind: String(own(RECEIPT, "kind")),
      reads: {
        checkpoint_digest: typeof own(RECEIPT, "checkpoint_digest"),
        graph_digest: typeof own(RECEIPT, "graph_digest"),
        candidates: SUPPORT.length,
        proposal: String(proposalOf(RECEIPT)),
      },
      graphDigestHashesSnapshot: own(RECEIPT, "graph_digest") === keyOf(bytesOf(SNAPSHOT)),
      checkpointIsGeneratorArgument: argv[argv.indexOf("--checkpoint") + 1] === own(RECEIPT, "checkpoint_digest"),
    };
    expect(witness.generatedBy, "gp sample wrote the vendored receipt").toBe("sample");
    expect(witness.accepted, "gp inspect decision accepted it").toBe(true);
    expect(witness.receiptSchema, "its schema is the pinned reply schema").toBe(PINNED_SCHEMA);
    expect(witness.graphDigestHashesSnapshot, "its graph_digest hashes the vendored snapshot's bytes").toBe(true);
    expect(witness.checkpointIsGeneratorArgument, "its checkpoint is the one gp sample was handed").toBe(true);
    return witness;
  },
  T3: () => {
    const registered = GP_PROVIDERS.filter(provider => Object.hasOwn(NATIVE_CONTROL_ACTIONS, provider));
    const scope: ObservationScope = { workspace: "/work/gp-reply-admission", principal: "operator" };
    const request: NativeControlRequest = {
      scope,
      principal: { id: scope.principal, role: "local-operator" },
      grants: ["control:gp.apply"],
      target: { provider: "gp", type: "decision", id: "gp-decision-1", scope: scope.workspace },
      action: "apply",
      params: { confirmed: true },
      invocationId: "inv-gp-reply",
      requestedAt: "2026-10-28T05:00:00Z",
    };
    const core = decideControl(request, { projection: new ObservationProjection(), now: () => "2026-10-28T05:00:01Z" });
    const denial: Json = core.decision === "denied" ? { decision: core.decision, policy: core.policy, category: core.category } : { decision: core.decision };
    expect(registered, "the control core registers no GraphPolicyCLI provider").toEqual([]);
    expect(denial, "a gp target is an unknown action").toEqual({ decision: "denied", policy: "unknown-action", category: "validation" });
    return { registered, providers: Object.keys(NATIVE_CONTROL_ACTIONS), denial };
  },
  A1: () => {
    const bound = GP_REPLY_ADMITTERS.map(entry => ({ path: entry.path, violations: violationsOf(entry.admit) }));
    for (const entry of bound) expect(Object.values(entry.violations).flat(), `${entry.path} meets every check`).toEqual([]);
    const honest = violationsOf(HONEST);
    const judged = Object.fromEntries(Object.keys(MUTANTS).map(name => [name, mutant(name)]));
    const fired = CHECKS.filter(check => Object.values(judged).some(table => Object.values(table).some(found => found.includes(check))));
    const quiet = Object.entries(judged)
      .filter(([, table]) => Object.keys(table).length === 0)
      .map(([name]) => name);
    expect(Object.values(honest).flat(), "the honest admitter meets every check on every fixture").toEqual([]);
    expect(fired, "every check fires on some mutant").toEqual([...CHECKS]);
    expect(quiet, "every mutant fails some check").toEqual([]);
    expect(outcomeOf(drive(HONEST, fixture("F-ADMIT"))), "the valid reply is admitted with its proposal").toBe(`admitted:${String(proposalOf(RECEIPT))}`);
    return {
      bound: bound.map(entry => entry.path),
      outcomes: outcomesOf(FIXTURES.map(entry => entry.id)),
      fired,
      quiet,
      "M-ALWAYS-REFUSE": mutant("M-ALWAYS-REFUSE"),
      "M-PROPOSAL-RESAMPLED": mutant("M-PROPOSAL-RESAMPLED"),
    };
  },
  A2: () => {
    const outcomes = outcomesOf(["F-SCHEMA", "F-CHECKPOINT"]);
    expect(outcomes, "a schema id or a checkpoint id outside the pinned set is refused, naming it").toEqual({ "F-SCHEMA": "refused:schema", "F-CHECKPOINT": "refused:checkpoint" });
    const family = mutant("M-SCHEMA-FAMILY");
    const prefix = mutant("M-CHECKPOINT-PREFIX");
    expect(family["F-SCHEMA"], "a schema family is not the pinned set").toContain("admitted-schema");
    expect(prefix["F-CHECKPOINT"], "a shared checkpoint prefix is not the pinned set").toContain("admitted-checkpoint");
    return {
      outcomes,
      sharesPrefix: String(own(R_CHECKPOINT, "checkpoint_digest")).startsWith(prefixOf(PINNED_CHECKPOINT)),
      sharesFamily: String(own(R_SCHEMA, "schema")).startsWith(familyOf(PINNED_SCHEMA)),
      "M-NO-SCHEMA": mutant("M-NO-SCHEMA"),
      "M-SCHEMA-FAMILY": family,
      "M-NO-CHECKPOINT": mutant("M-NO-CHECKPOINT"),
      "M-CHECKPOINT-PREFIX": prefix,
    };
  },
  A3: () => {
    const exported = keyOf(presentedBytes(FIXTURE_FILE));
    const joinKeys = [FIXTURE_FILE, ...Object.values(PRESENTATIONS)].every(entry => keyOf(presentedBytes(entry)) === presentedKey(entry));
    const capture = CAPTURES.find(row => row.id === PRODUCER_SPEC.capture)?.value;
    const whitespaceOnly = Object.fromEntries(
      DIGEST_IDS.map(id => [id, isDeepStrictEqual(JSON.parse(Buffer.from(presentedBytes(presentationOf(id))).toString("utf8")), JOIN.value)]),
    );
    const outcomes = outcomesOf(DIGEST_IDS);
    const reserialized = mutant("M-DIGEST-RESERIALIZED");
    expect(exported, "the digest Pi exported is the reply's graph_digest").toBe(own(RECEIPT, "graph_digest"));
    expect(capture, "and wb-gxd7.3's P-SAMPLE-FILE capture").toBe(exported);
    expect(joinKeys, "the census's key is wb-gxd7.3's presentedKey on every presentation").toBe(true);
    expect(outcomes, "a presentation the reply did not hash is refused, naming snapshotDigest").toEqual(Object.fromEntries(DIGEST_IDS.map(id => [id, "refused:snapshotDigest"])));
    expect(Object.keys(reserialized), "hashing a re-serialization admits exactly the whitespace-only presentations").toEqual(DIGEST_IDS.filter(id => whitespaceOnly[id] === true));
    return { exported, joinKeys, whitespaceOnly, outcomes, "M-NO-DIGEST": mutant("M-NO-DIGEST"), "M-DIGEST-RESERIALIZED": reserialized };
  },
  A4: () => {
    const proposal = proposalOf(RECEIPT);
    const actor = actorOf(presentedBytes(FIXTURE_FILE), proposal) ?? null;
    const outcomes = outcomesOf(["F-ACTOR"]);
    expect(actor, "the proposal's worker is read from the exported relation").toBe("agent-1");
    expect(OUT_OF_SCOPE, "F-ACTOR's scope holds the other agent only").not.toContain(actor);
    expect(outcomes, "a proposal whose worker is out of scope is refused, naming actor").toEqual({ "F-ACTOR": "refused:actor" });
    return { proposal: String(proposal), actor, agents: [...AGENTS], scope: [...OUT_OF_SCOPE], outcomes, "M-NO-ACTOR": mutant("M-NO-ACTOR") };
  },
  A5: () => {
    const witness = {
      proposal: UNOFFERED,
      actor: actorOf(presentedBytes(FIXTURE_FILE), UNOFFERED) ?? null,
      offered: SUPPORT.includes(UNOFFERED),
      replyClaims: listOf(own(R_SUPPORT, "candidates")).includes(UNOFFERED),
      outcomes: outcomesOf(["F-SUPPORT"]),
      "M-NO-SUPPORT": mutant("M-NO-SUPPORT"),
      "M-SUPPORT-FROM-REPLY": mutant("M-SUPPORT-FROM-REPLY"),
    };
    expect(witness.actor, "the unoffered proposal's worker is in scope").toBe("agent-2");
    expect(witness.offered, "Pi never offered it").toBe(false);
    expect(witness.replyClaims, "the reply's own candidates claim it").toBe(true);
    expect(witness.outcomes, "it is refused, naming support").toEqual({ "F-SUPPORT": "refused:support" });
    expect(witness["M-SUPPORT-FROM-REPLY"]["F-SUPPORT"], "the reply's own support is no check").toContain("admitted-support");
    return witness;
  },
  B1: () => {
    const violated = Object.fromEntries(REFUSE_IDS.map(id => [id, failingOf(fixture(id))]));
    const counts = Object.fromEntries(REFUSE_IDS.map(id => [id, drive(HONEST, fixture(id)).results.length]));
    for (const id of REFUSE_IDS) expect(violated[id], `${id} violates exactly its one field`).toEqual(expectedFields(fixture(id)));
    expect(Object.values(counts), "each violating reply yields exactly one result").toEqual(REFUSE_IDS.map(() => 1));
    return { violated, counts, "M-REFUSAL-TWICE": mutant("M-REFUSAL-TWICE"), "M-REFUSAL-NONE": mutant("M-REFUSAL-NONE") };
  },
  B2: () => {
    const keys = Object.fromEntries(REFUSE_IDS.map(id => [id, drive(HONEST, fixture(id)).results.map(ownKeys)]));
    for (const id of REFUSE_IDS) expect(keys[id], `${id}'s refusal names the field and nothing else`).toEqual([["outcome", "field"]]);
    expect(violations(fixture("F-SCHEMA"), { results: [{ field: "schema", outcome: "refused" }], rows: [] }), "own-key order is not judged").toEqual([]);
    return { keys, "M-REFUSAL-ECHO": mutant("M-REFUSAL-ECHO"), "M-REFUSAL-FIRST-FIELD": mutant("M-REFUSAL-FIRST-FIELD") };
  },
  B3: () => {
    const carries = Object.fromEntries(REFUSE_IDS.map(id => [id, drive(HONEST, fixture(id)).results.some(result => carriesDecision(result, fixture(id)))]));
    expect(Object.values(carries), "no refusal carries a decision").toEqual(REFUSE_IDS.map(() => false));
    const leaked = mutant("M-REFUSAL-DECISION");
    expect(Object.keys(leaked), "a refusal carrying the decision is caught on every violating reply").toEqual(REFUSE_IDS);
    return { carries, "M-REFUSAL-DECISION": leaked };
  },
  C1: () => {
    const outcomes = outcomesOf(WORKER_IDS);
    expect(outcomes, "each worker failure yields exactly one typed unavailable of its cause").toEqual(
      Object.fromEntries(WORKER_IDS.map(id => [id, `${UNAVAILABLE}:${expectedCause(fixture(id)) ?? "none"}`])),
    );
    const error = JSON.parse(MEASURED_ERROR.stdout) as unknown;
    const measured = { rc: MEASURED_ERROR.rc, schema: String(own(error, "schema")), ok: own(error, "ok") === true, code: String(own(own(error, "error"), "code")) };
    expect(measured.rc !== 0 && !measured.ok && measured.code.startsWith("GP_CLI_"), "F-EXIT-ERROR replays a measured GP_CLI_ refusal").toBe(true);
    const timedOut = decisionOf(fixture("F-TIMEOUT").call.worker.stdout) !== undefined && decisionOf(fixture("F-EXIT-CRASH").call.worker.stdout) !== undefined;
    expect(timedOut, "the timeout and crash fixtures hold a complete valid reply on stdout").toBe(true);
    return {
      outcomes,
      measured,
      completeStdout: timedOut,
      "M-TIMEOUT-READ": mutant("M-TIMEOUT-READ"),
      "M-EXIT-IGNORED": mutant("M-EXIT-IGNORED"),
      "M-CAUSE-COLLAPSED": mutant("M-CAUSE-COLLAPSED"),
      "M-MALFORMED-REFUSED": mutant("M-MALFORMED-REFUSED"),
      "M-SALVAGED": mutant("M-SALVAGED"),
    };
  },
  C2: () => {
    const ids = FIXTURES.filter(entry => entry.expected.kind !== "admit").map(entry => entry.id);
    const rows = Object.fromEntries(ids.map(id => [id, drive(HONEST, fixture(id)).rows.map(row => `${String(own(row, "outcome"))}:${String(own(row, "tone"))}`)]));
    for (const id of ids) {
      for (const row of rows[id] ?? []) expect(row.endsWith(`:${SUCCESS}`) || !NON_SUCCESS.some(word => row.startsWith(`${word}:`)), `${id} records no success row`).toBe(false);
    }
    return { rows, "M-SUCCESS-ROW": mutant("M-SUCCESS-ROW"), "M-ADMITTED-ROW": mutant("M-ADMITTED-ROW") };
  },
  Q1: () => {
    const findings = Object.fromEntries(Object.entries(SPELLINGS).map(([name, text]) => [name, replyVocabulary(text)]));
    expect(Object.values(findings).flat(), "R-SPELLING: every member is quiet").toEqual([]);
    expect(replyVocabulary("reply.graph_digest"), "the reader reads the whole token").toEqual(["graph_digest"]);
    expect(findings["escaped-identifier"], "P3's source spelling is quiet").toEqual([]);
    expect(findings["vocabulary-free-admitter"], "P4 is quiet under T1's spelling reader").toEqual([]);
    expect(findings["gp-spawning-admitter"], "P5 is quiet under T1's spelling reader").toEqual([]);
    return findings;
  },
  Q2: () => {
    const last = hostOf({ refusal: "last-field" });
    const witness = {
      violated: failingOf(F_TWO),
      honest: outcomeOf(drive(HONEST, F_TWO)),
      last: outcomeOf(drive(last, F_TWO)),
      violations: { honest: violations(F_TWO, drive(HONEST, F_TWO)), last: violations(F_TWO, drive(last, F_TWO)) },
    };
    expect(witness.violated, "the reply violates two fields").toEqual(["schema", "actor"]);
    expect(witness.honest === witness.last, "the two admitters name different fields").toBe(false);
    expect([...witness.violations.honest, ...witness.violations.last], "R-MULTI-VIOLATION: either refusal passes").toEqual([]);
    return witness;
  },
  Q3: () => {
    const budget = own(R_OVER_BUDGET, "runtime_budget");
    const witness = {
      maxCandidates: Number(own(budget, "max_candidates")),
      candidates: SUPPORT.length,
      honest: outcomeOf(drive(HONEST, F_OVER_BUDGET)),
      violations: violations(F_OVER_BUDGET, drive(HONEST, F_OVER_BUDGET)),
    };
    expect(witness.maxCandidates, "the reply's own budget is below its candidate count").toBeLessThan(witness.candidates);
    expect(witness.violations, "R-RESOURCE: no check reads the reply's runtime budget").toEqual([]);
    return witness;
  },
  Q4: () => {
    const leaked: unknown[] = [];
    const found = violationsOf(hostOf({ side: proposal => leaked.push(proposal) }));
    expect(Object.values(found).flat(), "R-SIDE-PATH: the armed check reads the journal only").toEqual([]);
    expect(leaked.length, "the side path was taken").toBeGreaterThan(0);
    return { violations: found, leaked: leaked.length };
  },
  Q5: () => {
    const witness = Object.fromEntries(
      Object.entries(JUDGE_SURVIVORS).map(([name, member]) => {
        const call = DEPARTURES[member.input];
        const honest = call === undefined ? undefined : HONEST(call);
        const departed = call === undefined ? undefined : member.admit(call);
        return [
          name,
          {
            input: member.input,
            judged: Object.values(violationsOf(member.admit)).flat(),
            sameOutcomes: FIXTURES.every(entry => outcomeOf(drive(member.admit, entry)) === outcomeOf(drive(HONEST, entry))),
            honest: honest === undefined ? null : outcomeOf(honest),
            member: departed === undefined ? null : outcomeOf(departed),
            departs: honest !== undefined && departed !== undefined && !isDeepStrictEqual(readView(honest), readView(departed)),
          },
        ];
      }),
    );
    const members = Object.entries(witness);
    expect(
      members.filter(([, entry]) => entry.judged.length > 0).map(([name]) => name),
      "R-JUDGE: the judge passes every member on the fifteen fixtures",
    ).toEqual([]);
    expect(
      members.filter(([, entry]) => !entry.sameOutcomes).map(([name]) => name),
      "with HONEST's outcome on each fixture",
    ).toEqual([]);
    expect(
      members.filter(([, entry]) => !entry.departs).map(([name]) => name),
      "and each member departs from HONEST on its own input",
    ).toEqual([]);
    return witness;
  },
  Q6: () => {
    const quiet = Object.fromEntries([
      ...Object.entries(PARTITIONS).map(([name, merge]) => [name, failing(merged(LIVE, merge.row, merge.into, merge.from, merge.quote))] as const),
      ...Object.entries(RESPLITS).map(([name, member]) => [name, failing(resplit(LIVE, member))] as const),
    ]);
    const kept = Object.fromEntries([
      ...Object.entries(PARTITIONS).map(([name, merge]) => [name, failing(merged(LIVE, merge.row, merge.into, merge.from, LIVE.quotes[merge.into] ?? ""))] as const),
      ...Object.entries(RESPLITS).map(([name, member]) => [name, failing(resplit(LIVE, member, true))] as const),
    ]);
    expect(Object.values(quiet).flat(), "R-PARTITION: every reading holds under each merge and each moved boundary").toEqual([]);
    expect(
      Object.entries(kept)
        .filter(([, reds]) => reds.length === 0)
        .map(([name]) => name),
      "the same merge with the sibling's quote left in place, and the same move with the right-hand quote left in place, reds a reading",
    ).toEqual([]);
    return { quiet, kept };
  },
  Q7: () => {
    const quiet = Object.fromEntries(Object.entries(UNREAD).map(([name, edit]) => [name, failing(edit(LIVE))]));
    const unchanged = Object.entries(UNREAD)
      .filter(([, edit]) => isDeepStrictEqual(edit(LIVE), LIVE))
      .map(([name]) => name);
    expect(Object.values(quiet).flat(), "R-UNREAD: every reading holds under each edit").toEqual([]);
    expect(unchanged, "each edit changes the model").toEqual([]);
    return quiet;
  },
};

interface Roster {
  readonly bead: string;
  readonly statement: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly witnesses: Readonly<Record<string, Json>>;
  readonly tests: readonly string[];
  readonly producer: {
    readonly repo: string;
    readonly sha: string;
    readonly path: string;
    readonly blob: string;
    readonly lines: Readonly<Record<string, string>>;
  };
}
const ROSTER = JSON.parse(textOf(ROSTER_PATH)) as Roster;
const REACHED: { readonly pin: string; readonly same: boolean }[] = [];

/** The tracker export's row for a bead. */
function beadRow(bead: string): { readonly title: string; readonly notes: string } | undefined {
  for (const line of textOf(EXPORT).split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (own(row, "id") !== bead) continue;
    const title = own(row, "title");
    const notes = own(row, "notes");
    if (typeof title === "string") return { title, notes: typeof notes === "string" ? notes : "" };
  }
  return undefined;
}
/** The owner filing's citation paragraph opens with this; the tracker appends every later note on a line of its own. */
const CITATION_LEAD = "Citation: ";
const ACCEPTANCE_LEAD = "Acceptance: ";
const ACCEPTANCE_END = ". Consolidation candidate with R1/R9.";
/** Clause (c)'s carry note, and the README.md lines the filing cites. */
const CARRY = "carries O11's GP case";
const CITED_LINES: readonly number[] = [13, 25];
interface Cite {
  readonly line: number;
  readonly sha?: string;
  readonly quote: string;
}
/** What the anchors read from the notes: the filing's citation line only, so a note appended later binds nothing. */
function filingReading(notes: string): { readonly clauses: readonly string[]; readonly cites: readonly Cite[] } {
  const line = notes.split("\n").find(entry => entry.startsWith(CITATION_LEAD)) ?? "";
  const start = line.indexOf(ACCEPTANCE_LEAD);
  const end = line.indexOf(ACCEPTANCE_END);
  const acceptance = start >= 0 && end > start ? line.slice(start + ACCEPTANCE_LEAD.length, end) : "";
  const cites = [...line.matchAll(/README\.md:(\d+)(?:@([0-9a-f]{7,40}))? \('([^']+)'\)/g)].map(match =>
    match[2] === undefined ? { line: Number(match[1]), quote: match[3] ?? "" } : { line: Number(match[1]), sha: match[2], quote: match[3] ?? "" },
  );
  return { clauses: acceptance === "" ? [] : acceptance.split("; "), cites };
}
/** A clause without a trailing carry note ("(carries ...)"). */
function labelOf(clause: string): { readonly label: string; readonly carry?: string } {
  const carried = /^(.*) \((carries [^()]+)\)$/.exec(clause);
  return carried === null ? { label: clause } : { label: carried[1] ?? "", carry: carried[2] ?? "" };
}
/** The title's requirement tag and its trigger (the text before ", the host shall"). */
function titleReading(title: string): { readonly tag?: string; readonly trigger?: string } {
  const match = /^\[([A-Z0-9-]+)\] (.+?), the host shall /.exec(title);
  return match === null ? {} : { tag: match[1], trigger: match[2] };
}
/** A separator character: whitespace, comma, semicolon, colon, parentheses or plus. */
const SEPARATOR = /[\s,;:()+]/;
const separatorsOnly = (text: string): boolean => [...text].every(character => SEPARATOR.test(character));
/** The quotes tile the label in order: each quote is non-empty and opens and closes on a non-separator character, and only
 * separator characters lie between quotes and at the label's ends. */
function tiles(label: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    if (quote === "" || SEPARATOR.test(quote.charAt(0)) || SEPARATOR.test(quote.charAt(quote.length - 1))) return false;
    const found = label.indexOf(quote, at);
    if (found < 0 || !separatorsOnly(label.slice(at, found))) return false;
    at = found + quote.length;
  }
  return separatorsOnly(label.slice(at));
}

// ---- the outside readings of the anchor model ----

/** The files outside the census and its roster that the readings compare the model with, read once. */
interface Outside {
  readonly title: string;
  readonly notes: string;
  readonly receipt: Readonly<Record<string, unknown>>;
  readonly okFrames: readonly unknown[];
  readonly errorFrame: unknown;
  readonly registry: string;
  readonly tones: string;
  readonly join: string;
  /** wb-gxd7.3's P-SAMPLE-FILE capture path, its field segment dropped. */
  readonly decisionPath: readonly string[];
}
let outsideCache: Outside | undefined;
function outside(): Outside {
  if (outsideCache === undefined) {
    const row = beadRow(BEAD);
    const runs = listOf(own(own(parsedOf(textOf(RUNS)), "producer"), "runs"));
    const path = (CAPTURES.find(entry => entry.id === PRODUCER_SPEC.capture)?.path ?? "").split(".");
    outsideCache = {
      title: row?.title ?? "",
      notes: row?.notes ?? "",
      receipt: RECEIPT,
      okFrames: runs.filter(run => own(run, "rc") === 0).map(run => parsedOf(String(own(run, "stdout")))),
      errorFrame: parsedOf(MEASURED_ERROR.stdout),
      registry: /export type CapabilityErrorCategory = ([^;]+);/.exec(textOf(REGISTRY))?.[1] ?? "",
      tones: /statusTone: ([^;]+);/.exec(textOf(OBSERVATION))?.[1] ?? "",
      join: textOf(JOIN_CENSUS),
      decisionPath: path.at(-1) === PRODUCER_SPEC.field ? path.slice(0, -1) : [],
    };
  }
  return outsideCache;
}
/** The outside readings, in order (each named in the header's OUTSIDE ANCHORS paragraph). */
const READINGS = [
  "statement",
  "tag",
  "trigger",
  "clauses",
  "carry",
  "tiling T",
  "tiling A",
  "tiling B",
  "tiling C",
  "field count",
  "field order",
  "field pins",
  "cause count",
  "cause order",
  "unavailable word",
  "success word",
  "cites",
  "producer quotes",
  "producer sha",
  "pinned schema",
  "pinned checkpoint",
  "frame schema",
  "frame keys",
  "frame path",
  "registry word",
  "tone word",
  "A3 quote",
] as const;
type Reading = (typeof READINGS)[number];
/** Clause (c) read as its failures, its outcome word (after "yields typed") and its last word (after "claims"). */
const OUTCOME_CLAUSE = /^(.*) yields typed (\S+) and no receipt row claims (\S+)$/;
/** Every outside reading of a model: true where it holds. */
function anchorReadings(model: AnchorModel): Readonly<Record<Reading, boolean>> {
  const seen = outside();
  const row = (id: string): Row | undefined => model.rows.find(entry => entry.id === id);
  const tiled = (id: string): boolean => {
    const entry = row(id);
    return entry !== undefined && tiles(entry.label, entry.pins.map(pin => model.quotes[pin] ?? ""));
  };
  const heading = titleReading(seen.title);
  const filing = filingReading(seen.notes);
  const clauses = filing.clauses.map(labelOf);
  const requirements = (clauses[0]?.label.split("asserts admission requires ")[1] ?? "").split(/, | and /);
  const outcome = OUTCOME_CLAUSE.exec(clauses[2]?.label ?? "");
  const failures = (outcome?.[1] ?? "").split(/, | or /);
  const pinned = filing.cites.flatMap(cite => (cite.sha === undefined ? [] : [cite.sha]));
  const frame = parsedOf(model.frame);
  const keys = ownKeys(frame);
  return {
    statement: model.statement === seen.title,
    tag: heading.tag !== undefined && heading.tag === model.requirement,
    trigger: heading.trigger !== undefined && heading.trigger === row("T")?.label,
    clauses: isDeepStrictEqual(
      clauses.map(clause => clause.label),
      ["A", "B", "C"].map(id => row(id)?.label),
    ),
    carry: isDeepStrictEqual(
      clauses.map(clause => clause.carry ?? null),
      [null, null, model.carry],
    ),
    "tiling T": tiled("T"),
    "tiling A": tiled("A"),
    "tiling B": tiled("B"),
    "tiling C": tiled("C"),
    "field count": requirements.length === model.fields.length,
    "field order": model.fields.length > 0 && model.fields.every((field, index) => (requirements[index] ?? "").includes(field)),
    "field pins": model.fields.length > 0 && model.fields.every(field => (model.quotes[model.fieldPins[field] ?? ""] ?? "").includes(field)),
    "cause count": failures.length === model.causes.length,
    "cause order": model.causes.length > 0 && model.causes.every((cause, index) => (failures[index] ?? "").includes(cause)),
    "unavailable word": outcome?.[2] === model.unavailable,
    "success word": outcome?.[3] === model.success,
    cites: isDeepStrictEqual(
      filing.cites.map(cite => cite.line),
      model.citedLines,
    ),
    "producer quotes": filing.cites.length > 0 && filing.cites.every(cite => (model.producer.lines[String(cite.line)] ?? "").includes(cite.quote)),
    "producer sha": pinned.length > 0 && pinned.every(sha => model.producer.sha.startsWith(sha)),
    "pinned schema": model.schema === own(seen.receipt, "schema"),
    "pinned checkpoint": model.checkpoint === own(seen.receipt, "checkpoint_digest"),
    "frame schema":
      seen.okFrames.some(measured => own(measured, "schema") === model.envelope && own(measured, "ok") === true && record(own(measured, "result"))) &&
      own(seen.errorFrame, "schema") === model.envelope,
    "frame keys":
      keys.length > 0 &&
      seen.okFrames.some(measured => keys.every(key => ownKeys(measured).includes(key)) && own(frame, "schema") === own(measured, "schema") && own(frame, "ok") === own(measured, "ok")),
    "frame path": seen.decisionPath.length > 0 && isDeepStrictEqual(seen.decisionPath.reduce<unknown>((at, key) => own(at, key), frame), seen.receipt),
    "registry word": seen.registry.includes(`"${model.unavailable}"`),
    "tone word": seen.tones.includes(`"${model.success}"`),
    "A3 quote": seen.join.includes(`wb-0lf.3's '${model.quotes.A3 ?? ""}' check is pinned to this byte-exact form`),
  };
}
/** The readings a model fails, in READINGS order. */
function failing(model: AnchorModel): Reading[] {
  const readings = anchorReadings(model);
  return READINGS.filter(reading => !readings[reading]);
}
/** The census's own anchor model: its literals, and its roster's statement and producer block. */
const LIVE: AnchorModel = {
  requirement: REQUIREMENT,
  rows: ROWS,
  quotes: QUOTES,
  fields: FIELDS,
  fieldPins: FIELD_PINS,
  causes: CAUSES,
  carry: CARRY,
  unavailable: UNAVAILABLE,
  success: SUCCESS,
  citedLines: CITED_LINES,
  schema: PINNED_SCHEMA,
  checkpoint: PINNED_CHECKPOINT,
  envelope: ENVELOPE_SCHEMA,
  frame: VALID,
  residuals: RESIDUALS,
  statement: ROSTER.statement,
  producer: ROSTER.producer,
};
/** BOUND: model edits, each named for the coordinated census-and-roster edit it stands for, and the reading it must red. */
const BOUND: Readonly<Record<string, { readonly edit: Edit; readonly reds: Reading }>> = {
  "C6-rowT": { edit: model => rowRemoved(model, "T"), reds: "trigger" },
  "C6-rowA": { edit: model => rowRemoved(model, "A"), reds: "clauses" },
  "C6-rowB": { edit: model => rowRemoved(model, "B"), reds: "clauses" },
  "C6-rowC": { edit: model => rowRemoved(model, "C"), reds: "clauses" },
  "C6-labelT": { edit: model => relabeled(model, "T", labelIn(model, "T").replace(" + a Pi", " and a Pi")), reds: "trigger" },
  "C6-labelA": {
    edit: model => quoted(relabeled(model, "A", labelIn(model, "A").replace("reader-adapter", "reader adapter")), "A1", (model.quotes.A1 ?? "").replace("reader-adapter", "reader adapter")),
    reds: "clauses",
  },
  "C6-word-T3": { edit: model => quoted(model, "T3", "a Pi decision site"), reds: "tiling T" },
  "C6-word-A4": { edit: model => quoted(model, "A4", "actor within scope"), reds: "tiling A" },
  "C6-word-B2": { edit: model => quoted(model, "B2", "naming the field"), reds: "tiling B" },
  "C6-word-C2": { edit: model => quoted(model, "C2", "and no receipt row claims a success"), reds: "tiling C" },
  "G-sepT2": { edit: model => quoted(model, "T2", `(${model.quotes.T2 ?? ""}`), reds: "tiling T" },
  "G-sepA2": { edit: model => quoted(model, "A2", `${model.quotes.A2 ?? ""},`), reds: "tiling A" },
  "G-sepC1": { edit: model => quoted(model, "C1", ` ${model.quotes.C1 ?? ""}`), reds: "tiling C" },
  "C6-mA3": { edit: model => merged(model, "A", "A3", "A4", "snapshotDigest === the digest Pi exported, actor in scope"), reds: "A3 quote" },
  "C6-field-schema": { edit: model => fieldRemoved(model, "schema"), reds: "field count" },
  "C6-field-checkpoint": { edit: model => fieldRemoved(model, "checkpoint"), reds: "field count" },
  "C6-field-snapshotDigest": { edit: model => fieldRemoved(model, "snapshotDigest"), reds: "field count" },
  "C6-field-actor": { edit: model => fieldRemoved(model, "actor"), reds: "field count" },
  "C6-field-support": { edit: model => fieldRemoved(model, "support"), reds: "field count" },
  "G-fieldorder": { edit: model => ({ ...model, fields: [model.fields[1] ?? "", model.fields[0] ?? "", ...model.fields.slice(2)] }), reds: "field order" },
  "G-fieldpin": { edit: model => ({ ...model, fieldPins: { ...model.fieldPins, actor: "A5" } }), reds: "field pins" },
  "C6-cause-timeout": { edit: model => causeRemoved(model, "timeout"), reds: "cause count" },
  "C6-cause-exit": { edit: model => causeRemoved(model, "exit"), reds: "cause count" },
  "C6-cause-malformed": { edit: model => causeRemoved(model, "malformed"), reds: "cause count" },
  "G-causeorder": { edit: model => ({ ...model, causes: [model.causes[1] ?? "", model.causes[0] ?? "", ...model.causes.slice(2)] }), reds: "cause order" },
  "G-unavailable": { edit: model => ({ ...model, unavailable: "transport" }), reds: "unavailable word" },
  "G-unavailable-nonmember": { edit: model => ({ ...model, unavailable: "absent" }), reds: "registry word" },
  "G-success": { edit: model => ({ ...model, success: "waiting" }), reds: "success word" },
  "G-success-nonmember": { edit: model => ({ ...model, success: "succeeded" }), reds: "tone word" },
  "ST-statement": { edit: model => ({ ...model, statement: model.statement.replace("the host shall independently check", "the host shall check") }), reds: "statement" },
  "G-requirement": { edit: model => ({ ...model, requirement: model.requirement.replace(/R3$/, "R2") }), reds: "tag" },
  "G-carry": { edit: model => ({ ...model, carry: model.carry.replace("O11's GP case", "O11's case") }), reds: "carry" },
  "G-cites": { edit: model => ({ ...model, citedLines: model.citedLines.slice(0, 1) }), reds: "cites" },
  PL3: { edit: model => lined(model, "13", (model.producer.lines["13"] ?? "").replace("constraints independently.", "constraints separately.")), reds: "producer quotes" },
  "PL-sha": { edit: model => ({ ...model, producer: { ...model.producer, sha: `${model.producer.sha.startsWith("1") ? "2" : "1"}${model.producer.sha.slice(1)}` } }), reds: "producer sha" },
  "G-schema": { edit: model => ({ ...model, schema: "graphpolicy.receipt.decision.draft" }), reds: "pinned schema" },
  "G-checkpoint": { edit: model => ({ ...model, checkpoint: `${prefixOf(model.checkpoint)}${"0".repeat(64)}` }), reds: "pinned checkpoint" },
  "G-envelope": { edit: model => ({ ...model, envelope: "graphpolicy.cli.draft", frame: frameText({ schema: "graphpolicy.cli.draft", ok: true, result: { decision: RECEIPT } }) }), reds: "frame schema" },
  "C6-frame": { edit: model => ({ ...model, frame: frameText({ schema: model.envelope, ok: true, result: { choice: RECEIPT } }) }), reds: "frame path" },
  "G-frame-result": { edit: model => ({ ...model, frame: frameText({ schema: model.envelope, ok: true, output: { decision: RECEIPT } }) }), reds: "frame keys" },
  "G-frame-ok": { edit: model => ({ ...model, frame: frameText({ schema: model.envelope, okay: true, result: { decision: RECEIPT } }) }), reds: "frame keys" },
};

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: LIVE_BUDGET_MS }, () => {
        const implementation = IMPL[pin];
        const witness = implementation === undefined ? null : implementation();
        expect(witness, `${pin} has a case`).not.toBeNull();
        const expected = ROSTER.witnesses[pin];
        REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
        expect(witness, `${pin}'s witness equals the roster's`).toStrictEqual(expected);
      });
    }
  }

  it("rule 16: the rows, the residual families, the fields, the causes, the checks, the mutants, the fixtures, the field tokens, the admitters, the readings and the BOUND table are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:3", "A:5", "B:3", "C:2", "Q:7"]);
    expect(Object.entries(RESIDUALS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:6", "Q2:1", "Q3:1", "Q4:1", "Q5:21", "Q6:27", "Q7:21"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(IMPL), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(FIELDS).toEqual(["schema", "checkpoint", "snapshotDigest", "actor", "support"]);
    expect(Object.entries(FIELD_PINS).map(([field, pin]) => `${field}:${pin}`)).toEqual(["schema:A2", "checkpoint:A2", "snapshotDigest:A3", "actor:A4", "support:A5"]);
    expect(CAUSES).toEqual(["timeout", "exit", "malformed"]);
    expect(CHECKS).toEqual([
      "admitted-schema",
      "admitted-checkpoint",
      "admitted-snapshotDigest",
      "admitted-actor",
      "admitted-support",
      "refusal-count",
      "refusal-field",
      "refusal-decision",
      "unavailable",
      "success-row",
      "decision-kept",
    ]);
    expect(Object.keys(MUTANTS)).toEqual([
      "M-NO-SCHEMA",
      "M-SCHEMA-FAMILY",
      "M-NO-CHECKPOINT",
      "M-CHECKPOINT-PREFIX",
      "M-NO-DIGEST",
      "M-DIGEST-RESERIALIZED",
      "M-NO-ACTOR",
      "M-NO-SUPPORT",
      "M-SUPPORT-FROM-REPLY",
      "M-REFUSAL-TWICE",
      "M-REFUSAL-NONE",
      "M-REFUSAL-ECHO",
      "M-REFUSAL-FIRST-FIELD",
      "M-REFUSAL-DECISION",
      "M-TIMEOUT-READ",
      "M-EXIT-IGNORED",
      "M-CAUSE-COLLAPSED",
      "M-MALFORMED-REFUSED",
      "M-SALVAGED",
      "M-SUCCESS-ROW",
      "M-ADMITTED-ROW",
      "M-ALWAYS-REFUSE",
      "M-PROPOSAL-RESAMPLED",
    ]);
    expect(FIXTURES.map(entry => `${entry.id}:${entry.expected.kind === "refuse" ? entry.expected.fields.join("+") : entry.expected.kind === "unavailable" ? entry.expected.cause : "admit"}`)).toEqual([
      "F-ADMIT:admit",
      "F-SCHEMA:schema",
      "F-CHECKPOINT:checkpoint",
      "F-DIGEST-COMPACT:snapshotDigest",
      "F-DIGEST-NEWLINE:snapshotDigest",
      "F-DIGEST-CRLF:snapshotDigest",
      "F-DIGEST-MOVED:snapshotDigest",
      "F-ACTOR:actor",
      "F-SUPPORT:support",
      "F-TIMEOUT:timeout",
      "F-EXIT-ERROR:exit",
      "F-EXIT-CRASH:exit",
      "F-MALFORMED-TRUNCATED:malformed",
      "F-MALFORMED-EMPTY:malformed",
      "F-MALFORMED-NO-DECISION:malformed",
    ]);
    expect(FIELD_TOKENS).toEqual(["graph_digest", "checkpoint_digest", "chosen_id", "graphDigest", "checkpointDigest", "chosenId"]);
    expect(GP_PROVIDERS).toEqual(["gp", "graphpolicy", "graph-policy-cli"]);
    expect(GP_REPLY_ADMITTERS).toEqual([]);
    expect(SRC_FLOOR).toBe(100);
    expect([...READINGS]).toEqual([
      "statement",
      "tag",
      "trigger",
      "clauses",
      "carry",
      "tiling T",
      "tiling A",
      "tiling B",
      "tiling C",
      "field count",
      "field order",
      "field pins",
      "cause count",
      "cause order",
      "unavailable word",
      "success word",
      "cites",
      "producer quotes",
      "producer sha",
      "pinned schema",
      "pinned checkpoint",
      "frame schema",
      "frame keys",
      "frame path",
      "registry word",
      "tone word",
      "A3 quote",
    ]);
    expect(Object.entries(BOUND).map(([name, bound]) => `${name}:${bound.reds}`)).toEqual([
      "C6-rowT:trigger",
      "C6-rowA:clauses",
      "C6-rowB:clauses",
      "C6-rowC:clauses",
      "C6-labelT:trigger",
      "C6-labelA:clauses",
      "C6-word-T3:tiling T",
      "C6-word-A4:tiling A",
      "C6-word-B2:tiling B",
      "C6-word-C2:tiling C",
      "G-sepT2:tiling T",
      "G-sepA2:tiling A",
      "G-sepC1:tiling C",
      "C6-mA3:A3 quote",
      "C6-field-schema:field count",
      "C6-field-checkpoint:field count",
      "C6-field-snapshotDigest:field count",
      "C6-field-actor:field count",
      "C6-field-support:field count",
      "G-fieldorder:field order",
      "G-fieldpin:field pins",
      "C6-cause-timeout:cause count",
      "C6-cause-exit:cause count",
      "C6-cause-malformed:cause count",
      "G-causeorder:cause order",
      "G-unavailable:unavailable word",
      "G-unavailable-nonmember:registry word",
      "G-success:success word",
      "G-success-nonmember:tone word",
      "ST-statement:statement",
      "G-requirement:tag",
      "G-carry:carry",
      "G-cites:cites",
      "PL3:producer quotes",
      "PL-sha:producer sha",
      "G-schema:pinned schema",
      "G-checkpoint:pinned checkpoint",
      "G-envelope:frame schema",
      "C6-frame:frame path",
      "G-frame-result:frame keys",
      "G-frame-ok:frame keys",
    ]);
  });

  it("the outside anchors: every outside reading holds on the census's anchor model, every BOUND edit of that model reds the reading it names, and every reading is red under some BOUND edit", { timeout: LIVE_BUDGET_MS }, () => {
    const row = beadRow(BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    expect(Object.keys(anchorReadings(LIVE)), "the readings, in READINGS order").toEqual([...READINGS]);
    expect(failing(LIVE), "every outside reading holds on the census's own literals").toEqual([]);
    for (const [name, bound] of Object.entries(BOUND)) expect(failing(bound.edit(LIVE)), `${name} reds ${bound.reds}`).toContain(bound.reds);
    expect(
      READINGS.filter(reading => !Object.values(BOUND).some(bound => bound.reds === reading)),
      "every reading is red under some BOUND edit",
    ).toEqual([]);
    const notes = row?.notes ?? "";
    const appended = `${notes}\n\nCitation: README.md:99@0123456789ab ('appended'). Acceptance: x; y; z. Consolidation candidate with R1/R9.\n`;
    expect(filingReading(appended), "a note appended after the filing changes no reading").toEqual(filingReading(notes));
    expect(ROSTER.producer.repo, "the roster's producer is Furnace (a roster-internal check)").toBe("Furnace");
    expect(ROSTER.producer.path.endsWith("/README.md"), "the roster's producer path is a README (a roster-internal check)").toBe(true);
  });

  it("respin scope: the header carries the readings' summary and the not-read sentence, names each R-PARTITION and R-UNREAD member, and carries none of the retired summaries", () => {
    const header = textOf("test/workbench-gp-reply-admission-census.test.ts").split("*/", 1)[0] ?? "";
    const normalized = header.replace(/\s*\*\s*/g, " ").replace(/\s+/g, " ");
    expect(normalized).toContain(
      "So the readings hold by equality the labels of rows T, A, B and C, the requirement tag, the carry note, the cited line numbers, the two words, the pinned ids, the frame schema id, the roster's statement and A3's quote; by count, order and containment the five fields and the three causes; each quote's text once the row's split into pins is given, a separator at a quote's edge included; the frame's top-level key names (schema, ok and result; any further top-level key must be a measured frame key) and its decision path (the decision key under result, holding the vendored receipt); and the cited quotes in the producer lines with each cited pin as the producer sha's prefix.",
    );
    expect(normalized).toContain(
      "They do not read the split of a label into pins (R-PARTITION), row Q, the residual members, the producer block beyond the cited quotes and the sha's prefix, the frame's whitespace and key order (the decision's included), a key the frame's result holds beside the decision, a field-pin entry for a name that is not a field, or which pin carries a field beyond its quote containing the field (R-UNREAD), the witnesses, the test titles, the checks, the mutants, the fixtures, or the frame reader (F-ADMIT, a census check, holds the reader to the frame the census writes).",
    );
    for (const name of [...Object.keys(PARTITIONS), ...Object.keys(RESPLITS), ...Object.keys(UNREAD)]) expect(normalized, `${name} is named`).toContain(`${name}: `);
    for (const retired of [
      "So a field, a cause, a pin or a row removed",
      "and the two words; they do not bind",
      "Pi's own source binds the words",
      "So the outside anchors bind",
      "the sha's prefix, a key the frame's result holds beside the decision, or which pin",
    ]) {
      expect(normalized, "a retired summary").not.toContain(retired);
    }
  });

  it("respin scope: the header carries the fixture-boundary sentence and each R-JUDGE member's name with its description", () => {
    const header = textOf("test/workbench-gp-reply-admission-census.test.ts").split("*/", 1)[0] ?? "";
    const normalized = header.replace(/\s*\*\s*/g, " ").replace(/\s+/g, " ");
    expect(normalized).toContain("The armed judge measures the fifteen listed fixtures and 23 listed mutants, not every possible admitter or input.");
    for (const [name, member] of Object.entries(JUDGE_SURVIVORS)) expect(normalized, `${name} is named with its description`).toContain(`${name}: ${member.about}`);
    expect(header).not.toContain("that binds the first admitter to come");
  });

  it("respin scope: the header carries the T1 spelled-vocabulary sentence and the P4 and P5 sentence, P3's escaped spelling reads quiet, and the retired T1 sentence is absent", () => {
    const header = textOf("test/workbench-gp-reply-admission-census.test.ts").split("*/", 1)[0] ?? "";
    const normalized = header.replace(/\s*\*\s*/g, " ").replace(/\s+/g, " ");
    expect(normalized).toContain(
      "Row T1 pins the listed spelled vocabulary in src (GraphPolicyCLI's names in any case, the field tokens case-sensitive), not all ways a module can admit a reply.",
    );
    expect(normalized).toContain("a vocabulary-free admitter (P4), including a gp-spawning one (P5), is outside T1's text trigger");
    expect(replyVocabulary(`reply.graph${String.fromCodePoint(0x5c)}u005fdigest`)).toEqual([]);
    expect(header).not.toContain("The census pins that (row T) and an ARMED contract");
  });

  it("respin scope: no other registered title says bind or binds, four respin-scope cases are registered, one outside-anchor case title names the readings and the BOUND table, and the header carries the listed sentences and none of the retired ones", ({ task }) => {
    const header = textOf("test/workbench-gp-reply-admission-census.test.ts").split("*/", 1)[0] ?? "";
    const normalized = header.replace(/\s*\*\s*/g, " ").replace(/\s+/g, " ");
    const titles: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") titles.push(child.name);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(
      titles.filter(title => title !== task.name && /\bbinds?\b/i.test(title)),
      "no other title says what an anchor binds",
    ).toEqual([]);
    expect(titles.filter(title => title.startsWith("respin scope: ")).length, "the four respin-scope cases are registered").toBe(4);
    const anchorTitles = titles.filter(title => title.startsWith("the outside anchors: "));
    expect(anchorTitles.length, "one case speaks for the outside anchors").toBe(1);
    expect(anchorTitles[0], "its title names the readings on the anchor model").toContain("every outside reading holds on the census's anchor model");
    expect(anchorTitles[0], "and the BOUND table").toContain("every BOUND edit of that model reds the reading it names");
    const carried = [
      "and no src decision point exists (wb-0lf.1 landed at landing 648 as a test-only census of that absence)",
      "the control core registers none of the provider spellings gp, graphpolicy and graph-policy-cli",
      "one same-length checkpoint id sharing the pinned id's form prefix",
      "each quote is non-empty and opens and closes on a non-separator character, and only separator characters lie between quotes and at the label's ends",
      'unavailable word and success word (clause (c)\'s word after "yields typed" equals the unavailable word, and its last word, after "claims", equals the success word)',
      "registry word and tone word (the unavailable word is a CapabilityErrorCategory member and the success word a statusTone member, membership only)",
      "frame keys (every key of the census's frame is a key of one measured exit-0 frame, whose schema id and ok value the frame carries)",
      "frame path (the census's frame holds the vendored receipt at that path, the field segment dropped)",
      "the case asserts that each reds the reading the BOUND table names beside it; every reading is red under at least one member.",
      "Twenty-two of the 27 READINGS compare part of the model with a file outside the census and its roster, through fixed parse patterns (the acceptance split, clause (c)'s pattern, the citation pattern and PRODUCER_SPEC's capture id).",
      "The other five compare model parts with one another: tiling T, tiling A, tiling B and tiling C a row's pin quotes with its label (through the separator class), and field pins a field's pin quote with the field; they reach a file outside only jointly with the label readings (trigger and clauses) and the field readings (field count and field order), which the outside-anchor case asserts with them at once.",
      "departs from HONEST's on its own input: D1 to D12, D15, D17 and D23 to D27,",
      "or the boundary between two sibling pins moved with both quotes re-cut: every reading holds, and the same merge with the sibling's quote left in place, or the same move with the right-hand quote left in place, reds one",
      "an edit of a model part no reading takes, or of the part of one a reading passes over: every reading holds and the model changes",
      "RESIDUALS (named families, each with a pinned quiet row over its listed members; an instrument that starts reading a listed member reds its row; a family's definition reaches further than its list, and the census claims nothing about an instance the list does not name):",
    ];
    for (const sentence of carried) expect(normalized, "a carried sentence").toContain(sentence);
    const retired = [
      "the listed case-sensitive spelled vocabulary",
      "one longer prefix-sharing checkpoint",
      "A whole row, field or cause removed from every literal",
      "bind the pinned ids and the CLI frame",
      "the decision point of wb-0lf.1 has not landed",
      "The measured runs bind the frame's schema id",
      "Row T, A, B or C removed whole from every literal and the roster reds by those readings",
      "Each of the 27 READINGS compares part of the model with a file outside the census and its roster",
      "any further key must be a measured frame key",
      "RESIDUALS (named families, each member a pinned quiet row;",
      "departs from HONEST's on its own input: D1 to D12, D15, D17 and D23, with",
    ];
    for (const sentence of retired) expect(normalized, "a retired sentence").not.toContain(sentence);
  });

  it("roster: the judged rows, the quotes, the residual members and the registered tests equal test/fixtures/gp-reply-admission-roster.json, in order and both ways; every pin reached its witness compare", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
    expect(RESIDUALS, "the residual members equal the roster's").toEqual(ROSTER.residuals);
    expect(Object.keys(ROSTER.witnesses), "one roster witness per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
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
  });
});
