/**
 * wb-752.13 (VC-4 W13-Fw/W16-Bw2; EAT-R349): furnace_observe answers in the bounded, sanitized workbench.tool-reply/v1 dialect
 * over the Run's own viewport.
 *
 * Specs pinned (docs/workbench in this repository):
 * - 11 "First public Pi tools (proposed)": "workflow_observe(ref,selectors?,cursor?,limit?): bounded native snapshot, event
 *   window, aggregates, freshness, anomaly evidence." (C1, C1F, C3R)
 * - 09 "Freshness and ambiguity": "A disconnected Furnace event stream must not make a previously RUNNING node permanently
 *   authoritative RUNNING; it becomes last-known-running + stale. Pi tool summaries must communicate that nuance." (C2, C2P,
 *   C2O, C2X, C2R, C2E, C2W, C2F; the residual R-RECORDER-CAP's quiet rows C2Q and C2H)
 * - 11: "Use compact structured schema, discover more capability detail on demand" (C3, C5M, C8, the byte cap)
 * - 09 "Acceptance/negative controls" item 10: "Large/secret payload does not leak into Pi tool result or screen by default."
 *   (C4)
 * - EAT-R349 (DX triage 2026-11-11): "Registered furnace_observe MUST return successes and refusals through the bounded
 *   sanitized workbench.tool-reply/v1 contract." (C1, C3, C5, C5B)
 *
 * THE PINNED READER SET (this file; each case title opens with its id):
 * - G0: target observeInvocation over an ObservationProjection refreshed with the observer's Run snapshot; observed: without
 *   FurnaceObserverOptions.traceRun the Run viewport serves zero rows (window.total 0, nodes [], "no nodes returned": the
 *   reader gap of record), and with it the Run row, then its Attempt rows.
 * - C1: target furnaceObserveReply over a complete fixture Run with two Attempts; observed: the envelope's contract, tool, ok,
 *   invoked, runId and maxBytes, its source equal to the reading's sanitized source, its observe reply (workbench.observe/v1,
 *   invocationId the Run ID, the Run row and the two Attempt rows, all current), and no key `contract` anywhere whose value is
 *   furnace.external-observation/v1.
 * - C1F: target furnaceObserveReply over that Run, then the registered furnace_observe; observed: the envelope's snapshot, run,
 *   attempts and logs equal the reading's freshness facts, Run facts, Attempt page counts (no items) and log references as the
 *   shared serializer writes them (Run state active, freshness current, connection connected, the one log reference of the
 *   last Attempt), no fact omitted at the default cap, and the registered reply carries the same Run state, freshness, log
 *   reference and Attempt count.
 * - C1R: target the registered furnace_observe (boot harness, counting fake furnace first on PATH); observed: the data reply
 *   parses to the same envelope shape with the Run and Attempt rows, and the fake answered one status, one Attempt page and
 *   one log read.
 * - C2: target furnaceObserveFailure after a refresh, a failed read and the host's two stale steps (the Run's ref, then each
 *   Attempt ref FurnaceObservedAttempts recorded for the Run); observed: the unavailable refusal with the native error's
 *   category and the observer's bounded message carries lastKnown, whose Run and Attempt rows are both stale and
 *   disconnected with tone active,
 *   whose freshness counts are current 0, stale 2, unknown 0 and lastKnownRunningStale 2, and whose summary is "2
 *   last-known-running + stale (active, not current); 2 stale / 0 unknown"; the private native detail never reaches the text.
 * - C2P: target FurnaceObservedAttempts over two reads of one Run and one read of another; observed: the Run's refs once each
 *   in first-seen order, the other Run's refs only under its own ID, none for a Run never read, refs handed out as copies,
 *   and past its cap (3 here, 2000 by default) the oldest ref forgotten first. C2P's two reads record no ref again after
 *   another read and record its capped refs under one Run: C2O and C2X pin those. Every ref C2P records shares one provider,
 *   type and scope, and no ID is recorded for two Runs.
 * - C2O: target FurnaceObservedAttempts over three reads of one Run (frn-atm-1 and frn-atm-2, then frn-atm-3, then frn-atm-2
 *   again), then a recorder capped at 2 over frn-atm-a and frn-atm-b, frn-atm-a again and frn-atm-c; observed: the refs
 *   frn-atm-1, frn-atm-2, frn-atm-3 (a ref recorded again after another read keeps its first-seen slot), and the capped
 *   recorder's frn-atm-b, frn-atm-c (past the cap the first-seen frn-atm-a is forgotten, though it was recorded again last).
 * - C2X: target FurnaceObservedAttempts capped at 3 over two refs of Run A, two of Run B, then a third and a fourth of Run B;
 *   observed: Run A keeps frn-atm-a2 and Run B frn-atm-b1 and frn-atm-b2 (the fourth ref across Runs forgot Run A's oldest),
 *   then Run A none and Run B all three, then Run B frn-atm-b2, frn-atm-b3 and frn-atm-b4 (the cap counts refs across Runs,
 *   and the oldest ref goes first whichever Run holds it: another Run's, then the recording Run's own).
 * - C2R: target the registered furnace_observe, one call answered (one running Attempt) and two failing; observed:
 *   ObservationProjection.prototype.markStale was called on the first failing call exactly twice, the Run's ref and then the
 *   Attempt row's ref, each under the call's scope, and each failing reply's lastKnown rows read run:stale:active and
 *   attempt:stale:active (none current) with the summary "2 last-known-running + stale (active, not current); 2 stale / 0
 *   unknown".
 * - C2E: target the registered furnace_observe, one call answered (a Run of three running Attempts, frn-atm-1..3) and one
 *   failing; observed: the answered read serves the Run row and the three Attempt rows current; on the failing call
 *   ObservationProjection.prototype.markStale was called exactly four times, the Run's ref and then each Attempt row's ref in
 *   page order, each under the call's scope; its lastKnown rows read stale (the Run and frn-atm-1..3) and active, none
 *   current, with the summary "4 last-known-running + stale (active, not current); 4 stale / 0 unknown".
 * - C2W: target the registered furnace_observe, two calls answered (the first pages frn-atm-2 and frn-atm-3, the second
 *   frn-atm-1 alone) and one failing; observed: markStale on the failing call exactly the Run's ref and then frn-atm-2,
 *   frn-atm-3 and frn-atm-1 (first-seen order, which is not the IDs' sorted order), each under the call's scope, and the
 *   failing reply's lastKnown holds those four rows, each stale, with the four-row summary above.
 * - C2F: target the registered furnace_observe, three calls answered (paging frn-atm-1 and frn-atm-2, then frn-atm-3, then
 *   frn-atm-2 again) and one failing; observed: each answered reply ok with its page's Attempt count, markStale on the failing
 *   call exactly the Run's ref and then frn-atm-1, frn-atm-2 and frn-atm-3 (first-seen order: frn-atm-2 keeps its place
 *   although the last answered read returned it again), each under the call's scope, and the failing reply's lastKnown holds
 *   those four rows, each stale, with the four-row summary above.
 * - C2Q (a quiet row of residual R-RECORDER-CAP below, its module half): target src/index.ts's text, then
 *   FurnaceObservedAttempts capped at 2 after three Attempt refs of one Run, the host's two stale steps (the test's markedStale
 *   copy, which C2E and C2W pin to the host) and furnaceObserveFailure; observed: the host constructs its one recorder as
 *   `new FurnaceObservedAttempts()` (the module default cap, FURNACE_OBSERVED_ATTEMPTS_MAX, which C2P reads as 2000) and builds
 *   its one session projection with maxNodes equal to FURNACE_OBSERVED_ATTEMPTS_MAX, the capped recorder holds frn-atm-2 and
 *   frn-atm-3, and lastKnown reads the Run, frn-atm-2 and frn-atm-3 stale and frn-atm-1 current (exactly one current row).
 * - C2H (a quiet row of residual R-RECORDER-CAP below, its host half): target the registered furnace_observe, one call
 *   answered (frn-atm-1 and frn-atm-2) with ObservationProjection.prototype.refresh spied (the real refresh still runs), then
 *   an Attempt row of the Run for frn-atm-3 written into the projection that call refreshed, by a FurnaceObserver the test
 *   builds over the in-memory client under the scope the host wrote with (no furnace_observe read returned frn-atm-3, so the
 *   host's recorder does not hold its ref: the state a ref forgotten past the cap leaves), then one failing call; observed:
 *   the answered read refreshed one projection three times (its Run row and two Attempt rows), markStale on the failing call
 *   exactly the Run's ref, frn-atm-1 and frn-atm-2, each under the call's scope, and lastKnown reads the Run, frn-atm-1 and
 *   frn-atm-2 stale and frn-atm-3 current (exactly one current row).
 * - C3: target furnaceObserveReply over 20-Attempt fixtures written in ASCII, quote-escaped and non-ASCII shapes, at every
 *   cap of CAPS; observed: the UTF-8 byte length (TextEncoder) of each success reply, and of the typed invalid-request refusal
 *   a cap too small for the viewport gets, is at most its cap, and each success reply states its truncation
 *   (observe.truncatedForBytes with droppedForBytes, or omitted facts, beside returned + dropped equal to the page's rows); at
 *   the 1024-byte floor too.
 * - C3P: target furnaceObserveReply over the 20-Attempt fixture; observed: 21 rows offered, 20 returned on the first page with
 *   a cursor, and the cursor's page returns the 21st.
 * - C3R: target the registered furnace_observe over a three-Attempt Run; observed: limit 2 returns the Run row and the first
 *   Attempt row of 4 with a next cursor, that cursor with limit 2 returns the next two Attempt rows, maxBytes 2048 is the
 *   reply's own maxBytes and bounds its UTF-8 bytes, and a call without them reads the default cap 16384 and all 4 rows.
 * - C4: target furnaceObserveReply (and the registered tool for the line-split case); observed: the probes "Bearer
 *   abc123def456" in an Attempt executor, a log cursor, the beads Run ID and the producer version, and the line-split
 *   "Authorization: Bearer" + newline + value in the beads Run ID, never reach the reply text.
 * - C5: target the registered tool's refusals; observed: no grant and an invalid Run ID each read exactly
 *   furnaceObserveRefusal's text for their code, the grant set ["workbench:observe"] still refuses, with zero fake furnace
 *   invocations each, every error code is a member of FURNACE_OBSERVE_ERROR_CODES, and a Run the fake cannot answer (exit
 *   2, no envelope; the absent state root's shape here) is the typed unavailable refusal.
 * - C5B: target the registered furnace_observe; observed: limit 0, 41 and 1.5, a 257-byte ASCII cursor, a 258-byte cursor of
 *   86 three-byte characters, and maxBytes 1023 and 65537 each read the typed invalid-request refusal while the counting fake
 *   records zero invocations, and limit 40 with maxBytes 65536 is answered.
 * - C5M: target furnaceObserveFailure over an empty projection and over the Run's stale 20-Attempt viewport, at every cap of
 *   CAPS, for a native message of 6004 UTF-16 code units (three-byte characters, a quote and a backslash); observed: each
 *   reply's UTF-8 bytes are at most its cap, each is the typed unavailable refusal whose message is at most 160 code units
 *   and opens with that message's first character, and each carries lastKnown or names it in omitted (lastKnown carried at
 *   65536 for the held viewport, omitted at the 1024-byte floor).
 * - C6: target every workbench tool the extension registers (mode C minus mode A), each called with {} under zero grants, and
 *   furnace_observe's granted data reply; observed: no reply's contract is a provider reading contract, and the judge reds a
 *   planted raw reading reply.
 * - C7: target the registered furnace_observe over a two-Attempt Run with ObservationProjection.prototype.relate spied (the
 *   real relate still runs); observed: exactly two relate calls, each an ownership edge from the Run to one Attempt, in page
 *   order, carrying the Attempt page's request ID as nativeConfirmationRef.
 * - C8: target furnaceObserveReply over a two-Attempt Run with 600-character producer fields, at every cap from 1024 to 4096 in
 *   16-byte steps; observed: each success reply's omitted list is a prefix of logs, attempts, run, snapshot, source (that
 *   order, written out here), every fact it does not omit is carried and none it omits is, and the omission sets seen as the
 *   cap grows are exactly all five facts, four, three, two, one (logs) and none.
 *
 * CLASS GUARD OF RECORD (refusal #2 of wb-752.13, g10-gate-s295 seat gate-prep-92; rule 19 shape frozen, so this suite is
 * authored in the rule-14 enumerate-the-resolvable form for it): the failure-reply freshness claim for a failed read of the Run
 * (docs/workbench/09 "Freshness and ambiguity"), stated since cut #5 as exactly what its pins hold (NARROWED AT CUT #5 below).
 * This suite claims exactly its pinned sessions: answered reads of one Run, each paging one to three running Attempts whose
 * refs share one provider, type and scope (the fixture workspace's), at most three distinct Attempt refs in all and none of
 * them returned by another Run's read, then a failed read that is the counting fake's run_not_found answer (in C2 the in-memory
 * client's run_not_found rejection, with the host's two stale steps restated by markedStale). In those sessions the failed read
 * marks the Run's ref and then each Attempt ref those reads returned - one Attempt (C2R), the three of one answered read in
 * page order (C2E), those of two answered reads in first-seen order (C2W), a ref a later read returned again in its first-seen
 * place (C2F) - each under the call's scope, and no other row (C2H); the failure reply's lastKnown then reads every marked row
 * stale, none of them current (C2, C2R, C2E, C2W, C2F). The recorder's own semantics, over refs of one provider, type and scope
 * whose IDs no two Runs share, are C2P, C2O and C2X. Beside the pinned sessions the census names one residual family with
 * pinned quiet rows, R-RECORDER-CAP below.
 * ORDER AND CAP SCOPE (refusal #3 of wb-752.13, g10-gate-s295 seat gate-prep-154, items U1 and U2): the recorder's first-seen
 * order is pinned where a ref is recorded again after another read, in the module (C2O; the gate's mutant P3, under which a
 * ref recorded again moves to the last slot, reds it) and through the registered tool (C2F; P3 reds it), and its cap counts
 * refs across Runs (C2X; the gate's mutant P4, a cap counted per Run, reds it).
 * NARROWED AT CUT #5 (refusal #4 of wb-752.13, g10-gate-s294 seat gate-prep-253, items U1 and U2 with finding F1; the rule-19
 * second-stage cap engaged there, orchestrator ruling R-B813, and the stronger words left this bead for the exit child
 * wb-zcj6): the gate's mutants Q3 (the recorder's key without the Run ID: an Attempt ref recorded for a second Run is held
 * under the first only), Q4 (the key without the scope) and Q8 (the host records the Run viewport's Attempt rows) each fall in
 * a mode below that this census does not claim, as do two seat mutants of cut #5 (a host that marks only the first three refs
 * the recorder hands back; a host that marks the Attempt rows only after an unavailable failure).
 *
 * RESIDUAL (named family + pinned quiet rows): R-RECORDER-CAP - FurnaceObservedAttempts keeps at most
 * FURNACE_OBSERVED_ATTEMPTS_MAX refs counted across Runs (C2X; 2000, C2P, the maxNodes of the host's one session projection,
 * C2Q; the host's one recorder takes that default, C2Q) and forgets the first-seen ref first, a ref recorded again included
 * (C2O); so after a session recorded more refs than the cap, a forgotten ref is not marked by a failed read and its row, if
 * the projection still holds it, reads current in lastKnown. Quiet rows (this file), each red if its row stops reading
 * current: C2Q, the module half (a capped recorder forgets the first-seen ref, and the two stale steps markedStale restates
 * from the host leave its row current), and C2H, the host half (the registered tool's failing read marks no row whose ref its
 * recorder does not hold, so such a row reads current; the gate's mutant P5b, which marks those rows too, reds it). No case
 * records more than 2000 refs through the registered tool: C2H's test-written row stands in for a forgotten ref.
 *
 * NOT CLAIMED (scope sentences): the real furnace binary's own envelopes (every native read here is the counting fake or an
 * in-memory client) is NOT CLAIMED by this census; Beads Work linkage (not in this cut: docs/workbench/receipts/wb-752.13.md
 * names the landed census it conflicts with) is NOT CLAIMED by this census; what FurnaceObserver reads from a Run and what the
 * shared sanitizers do (both sides of every comparison use them) are NOT CLAIMED by this census; the freshness of an Attempt
 * row that a later answered read no longer returns (it keeps the freshness of its last refresh) is NOT CLAIMED by this census;
 * the rows a read under another scope refreshed (another workspace or principal: markStale invalidates only the call's own
 * scope) are NOT CLAIMED by this census; Furnace Attempt rows a writer other than furnace_observe refreshes into a Run's
 * viewport, beyond C2H's one row (written after the Run's last answered read; the failed read does not mark it), are NOT
 * CLAIMED by this census (one written before an answered read among them); the session projection's own eviction and admission
 * order (src/workbench/observation.ts: whether it still holds a row the recorder forgot) is NOT CLAIMED by this census; an
 * Attempt ref that an answered read of another Run returned as well (which Run's failed read marks it, and whether its row
 * stays current) is NOT CLAIMED by this census; refs of one Run that share an ID and differ in scope, provider or type (whether
 * the recorder holds each) are NOT CLAIMED by this census; whether a failed read marks every ref of a session whose answered
 * reads of the Run returned more than three distinct Attempt refs is NOT CLAIMED by this census (residual R-RECORDER-CAP's
 * quiet rows pin only that a ref the recorder does not hold is not marked); a failed read of another kind than the
 * run_not_found answer (a status answer for another workspace, no answer at all, a timeout or an aborted call) is NOT CLAIMED
 * by this census.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { BEADS_WORK_CONTRACT } from "../src/workbench/beads-observer.js";
import {
  FURNACE_OBSERVE_ERROR_CODES,
  FURNACE_OBSERVE_TOOL,
  FURNACE_OBSERVED_ATTEMPTS_MAX,
  FurnaceObservedAttempts,
  type FurnaceObserveView,
  furnaceObserveFailure,
  furnaceObserveRefusal,
  furnaceObserveReply,
} from "../src/workbench/furnace-observe-reply.js";
import { FURNACE_EXTERNAL_OBSERVATION_CONTRACT, FurnaceObserver, type FurnaceReading } from "../src/workbench/furnace-observer.js";
import { HYPERUNIX_OBSERVATION_CONTRACT } from "../src/workbench/hyperunix-observer.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { OBSERVE_CONTRACT, observeInvocation } from "../src/workbench/observe-query.js";
import { REACTIVEFIBER_OBSERVATION_CONTRACT } from "../src/workbench/reactivefiber-observer.js";
import { sanitizeWorkbenchJsonText } from "../src/workbench/redaction.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "../src/workbench/tool-replies.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";
import { type CountingCli, type FixtureAttempt, type FixtureRun, furnaceAnswers, furnaceMissing, installCountingCli, memoryFurnace } from "./helpers/furnace-observe-fakes.js";
import { atFixedDate, bootServed, firstOnPath, type ServedBoot } from "./helpers/furnace-observe-served-reader.js";
import { installScratchLeakGuard } from "./helpers/scratch.js";

installScratchLeakGuard();

const CASE_TIMEOUT_MS = 120_000;
const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const WORKSPACE = "/fixture/external-ws";
const SCOPE: ObservationScope = { workspace: WORKSPACE, principal: "fixture" };
const LIMITS = { maxPolls: 1, intervalMs: 1000, maxElapsedMs: 30_000, attemptLimit: 20, logBytes: 512, callTimeoutMs: 10_000 } as const;
const RUN_ID = "frn-run-reply-fixture";
/** The raw provider reading contracts the C6 census refuses in any tool reply. */
const PROVIDER_READINGS: readonly string[] = [FURNACE_EXTERNAL_OBSERVATION_CONTRACT, BEADS_WORK_CONTRACT, HYPERUNIX_OBSERVATION_CONTRACT, REACTIVEFIBER_OBSERVATION_CONTRACT];
const CAPS = [1024, 1025, 1100, 1300, 1600, 2048, 3000, 4096, 8192, 16_384, 32_768, 65_536] as const;
const PROBE = "abc123def456";
/** The freshness summary of a Run row and one Attempt row, both running and both stale (observe-query's own wording). */
const TWO_STALE = "2 last-known-running + stale (active, not current); 2 stale / 0 unknown";
/** The same summary for a Run row and three Attempt rows, all running and all stale. */
const FOUR_STALE = "4 last-known-running + stale (active, not current); 4 stale / 0 unknown";
/** The order a tighter cap omits the success facts in, written out (C8 reads the builder against it, not against its constant). */
const OMISSION_ORDER: readonly string[] = ["logs", "attempts", "run", "snapshot", "source"];

type Json = Record<string, unknown>;
const parse = (text: string): Json => JSON.parse(text) as Json;
const bytes = (text: string): number => new TextEncoder().encode(text).length;
const textOfResult = (result: unknown): string => {
  const content = (result as { content?: { text?: unknown }[] } | undefined)?.content;
  const text = content?.[0]?.text;
  if (typeof text !== "string") throw new Error("the tool returned no text item");
  return text;
};
/** A reply's rows under key (observe or lastKnown), each "<native type>:<freshness>:<status tone>". */
const rowsOf = (reply: Json, key: "observe" | "lastKnown"): string[] =>
  (((reply[key] as Json | undefined)?.nodes as Json[] | undefined) ?? []).map(node => `${(node.nativeRef as Json).type}:${node.freshness}:${(node.presentation as Json).statusTone}`);
/** The native IDs of a reply's observe rows, in order. */
const idsOf = (reply: Json): string[] => (((reply.observe as Json).nodes as Json[] | undefined) ?? []).map(node => String((node.nativeRef as Json).id));
/** A reply's rows under key, each "<native type>:<native ID>:<freshness>", in order. */
const idRowsOf = (reply: Json, key: "observe" | "lastKnown"): string[] =>
  (((reply[key] as Json | undefined)?.nodes as Json[] | undefined) ?? []).map(node => `${(node.nativeRef as Json).type}:${(node.nativeRef as Json).id}:${node.freshness}`);
/** One ObservationProjection.prototype.markStale call, "<scope workspace>|<provider>:<type>:<native ID>:<ref scope>". */
const staleCallOf = (input: { readonly scope: ObservationScope; readonly ref: NativeRef }): string =>
  `${input.scope.workspace}|${input.ref.provider}:${input.ref.type}:${input.ref.id}:${input.ref.scope ?? ""}`;

function attempts(count: number, shape: (index: number) => Partial<FixtureAttempt> = () => ({})): FixtureAttempt[] {
  return Array.from({ length: count }, (_, index) => ({ attempt_id: `frn-atm-${index + 1}`, work_id: `bd-work-${index + 1}`, state: "running", started_at: "2026-01-01T00:00:01Z", ...shape(index) }));
}

/** The host's writes for one answered read: the Run snapshot, the Attempt refs recorded, the Attempt rows and their edges. */
async function viewed(run: FixtureRun): Promise<{ projection: ObservationProjection; reading: FurnaceReading; observed: FurnaceObservedAttempts }> {
  const observer = new FurnaceObserver(memoryFurnace(run), { workspaceRoot: WORKSPACE, runId: run.runId, scope: SCOPE, limits: LIMITS, traceRun: true });
  const reading = await observer.snapshot();
  const projection = new ObservationProjection();
  const observed = new FurnaceObservedAttempts();
  projection.refresh(observer.projectionSnapshot(reading));
  const topology = observer.projectionTopology(reading);
  observed.record(run.runId, topology.snapshots.slice(1).map(snapshot => snapshot.source));
  for (const attempt of topology.snapshots.slice(1)) projection.refresh(attempt);
  for (const relation of topology.relations) projection.relate(relation);
  return { projection, reading, observed };
}

/** The Run viewport the host hands the builders: observeInvocation over the projection, scoped to the Run, with the paging. */
function viewOf(projection: ObservationProjection, bounds: { readonly maxBytes?: number; readonly limit?: number; readonly cursor?: string } = {}): FurnaceObserveView {
  const { maxBytes, limit, cursor } = bounds;
  return {
    runId: RUN_ID,
    maxBytes,
    read: budget => observeInvocation(projection, { scope: SCOPE, invocationId: RUN_ID, maxBytes: budget, ...(limit === undefined ? {} : { limit }), ...(cursor === undefined ? {} : { cursor }) }),
  };
}

/** The host's two stale steps on an attach failure: the Run's ref, then every Attempt ref recorded for the Run. */
function markedStale(projection: ObservationProjection, observed: FurnaceObservedAttempts): void {
  projection.markStale({ scope: SCOPE, ref: { provider: "furnace", type: "run", id: RUN_ID, scope: WORKSPACE } });
  for (const ref of observed.refs(RUN_ID)) projection.markStale({ scope: SCOPE, ref });
}

/** A Furnace Attempt ref of the fixture workspace. */
const attemptRef = (id: string): NativeRef => ({ provider: "furnace", type: "attempt", id, scope: WORKSPACE });

/** Every value of a key named `contract` anywhere in a parsed reply. */
function contracts(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(contracts);
  if (typeof value !== "object" || value === null) return [];
  return Object.entries(value).flatMap(([key, child]) => [...(key === "contract" && typeof child === "string" ? [child] : []), ...contracts(child)]);
}

/** C6's judge: the reply text's own contract, when it parses to an object, must not be a provider reading contract. */
function rawReading(text: string): string | undefined {
  try {
    const value: unknown = JSON.parse(text);
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const contract = (value as Json).contract;
      return typeof contract === "string" && PROVIDER_READINGS.includes(contract) ? contract : undefined;
    }
  } catch {}
  return undefined;
}

async function withFake<T>(grants: readonly string[], read: (boot: ServedBoot, fake: CountingCli) => Promise<T>): Promise<T> {
  const fake = installCountingCli("furnace");
  try {
    if (firstOnPath("furnace") !== fake.binary) throw new Error("the counting fake furnace is not first on PATH");
    const boot = await bootServed(grants);
    try {
      return await read(boot, fake);
    } finally {
      boot.restore();
    }
  } finally {
    fake.restore();
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("furnace_observe reply (wb-752.13)", () => {
  it("G0: the reader gap of record - without traceRun the Run viewport serves zero rows; with it the Run row and its Attempt rows", { timeout: CASE_TIMEOUT_MS }, async () => {
    const run: FixtureRun = { runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(2) };
    // The base wiring: the Run snapshot alone, written by an observer without traceRun.
    const base = new FurnaceObserver(memoryFurnace(run), { workspaceRoot: WORKSPACE, runId: RUN_ID, scope: SCOPE, limits: LIMITS });
    const reading = await base.snapshot();
    const untraced = new ObservationProjection();
    untraced.refresh(base.projectionSnapshot(reading));
    const gap = parse(furnaceObserveReply(viewOf(untraced), reading)).observe as Json;
    expect([(gap.window as Json).total, gap.nodes, (gap.freshness as Json).summary], "the measured gap: window.total 0, nodes [], no nodes returned").toStrictEqual([0, [], "no nodes returned"]);
    const traced = await viewed(run);
    const view = parse(furnaceObserveReply(viewOf(traced.projection), traced.reading)).observe as Json;
    expect((view.nodes as Json[]).map(node => (node.nativeRef as Json).type), "the Run row first, then its Attempt rows").toStrictEqual(["run", "attempt", "attempt"]);
  });

  it("C1: the data reply is one tool-reply/v1 envelope carrying provenance and the observe/v1 Run viewport, never the raw reading", { timeout: CASE_TIMEOUT_MS }, async () => {
    const { projection, reading } = await viewed({ runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(2) });
    const text = furnaceObserveReply(viewOf(projection), reading);
    const reply = parse(text);
    expect([reply.contract, reply.tool, reply.ok, reply.invoked, reply.runId, reply.maxBytes]).toStrictEqual([TOOL_REPLY_CONTRACT_VERSION, FURNACE_OBSERVE_TOOL, true, false, RUN_ID, 16_384]);
    expect(reply.source, "the reading's producer provenance, sanitized").toStrictEqual(parse(sanitizeWorkbenchJsonText({ source: reading.source })).source);
    expect((reply.source as Json).ownership).toBe("external");
    expect(Object.keys(reply.attempts as Json), "the Attempt page's counts, never its items").not.toContain("items");
    const observe = reply.observe as Json;
    expect([observe.contract, observe.invocationId, (observe.window as Json).total]).toStrictEqual([OBSERVE_CONTRACT, RUN_ID, 3]);
    expect((observe.nodes as Json[]).map(node => (node.nativeRef as Json).id)).toStrictEqual([RUN_ID, "frn-atm-1", "frn-atm-2"]);
    expect((observe.freshness as Json).summary).toBe("all returned nodes current");
    expect(contracts(reply), "no key contract anywhere holds the raw reading's contract").not.toContain(FURNACE_EXTERNAL_OBSERVATION_CONTRACT);
    expect(contracts(reply)).toStrictEqual([TOOL_REPLY_CONTRACT_VERSION, OBSERVE_CONTRACT]);
  });

  it("C1F: a success carries the reading's freshness facts (snapshot), Run facts (run), Attempt page counts (attempts) and log references (logs), built and served alike", { timeout: CASE_TIMEOUT_MS }, async () => {
    const { projection, reading } = await viewed({ runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(2) });
    const reply = parse(furnaceObserveReply(viewOf(projection), reading));
    const { capturedAt, observedAt, lastConfirmedAt, freshness, connection, completeness, coherence } = reading;
    const { items: _items, ...counts } = reading.attempts;
    const facts = parse(sanitizeWorkbenchJsonText({ snapshot: { capturedAt, observedAt, lastConfirmedAt, freshness, connection, completeness, coherence }, run: reading.run, attempts: counts, logs: reading.logs }));
    expect([reply.snapshot, reply.run, reply.attempts, reply.logs], "each fact as the shared serializer writes the reading's own").toStrictEqual([facts.snapshot, facts.run, facts.attempts, facts.logs]);
    expect([(reply.run as Json).state, (reply.snapshot as Json).freshness, (reply.snapshot as Json).connection, (reply.logs as Json[]).map(log => log.attemptId)]).toStrictEqual(["active", "current", "connected", ["frn-atm-2"]]);
    expect(reply.omitted, "the default cap omits no fact").toBeUndefined();
    await withFake(["furnace:inspect"], async (boot, fake) => {
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, attempts: attempts(2) }));
      const served = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect([(served.run as Json | undefined)?.state, (served.snapshot as Json | undefined)?.freshness, ((served.logs as Json[] | undefined) ?? []).map(log => log.attemptId), (served.attempts as Json | undefined)?.returned]).toStrictEqual([
        "active",
        "current",
        ["frn-atm-2"],
        2,
      ]);
    });
  });

  it("C1R: the registered furnace_observe answers with that envelope for the Run it refreshed", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake(["furnace:inspect"], async (boot, fake) => {
      const run: FixtureRun = { runId: RUN_ID, workspace: boot.workspace, attempts: attempts(2) };
      fake.play(furnaceAnswers(run));
      const reply = parse(textOfResult(await atFixedDate(() => boot.call({ runId: RUN_ID }))));
      expect([reply.contract, reply.tool, reply.ok, reply.runId]).toStrictEqual([TOOL_REPLY_CONTRACT_VERSION, FURNACE_OBSERVE_TOOL, true, RUN_ID]);
      const observe = reply.observe as Json;
      expect((observe.nodes as Json[]).map(node => `${(node.nativeRef as Json).type}:${(node.nativeRef as Json).id}`)).toStrictEqual([`run:${RUN_ID}`, "attempt:frn-atm-1", "attempt:frn-atm-2"]);
      expect(contracts(reply)).toStrictEqual([TOOL_REPLY_CONTRACT_VERSION, OBSERVE_CONTRACT]);
      expect(fake.calls().map(argv => argv.find(word => ["run", "attempt", "logs"].includes(word))), "one status, one Attempt page and one log read").toStrictEqual(["run", "attempt", "logs"]);
    });
  });

  it("C2: after a refresh, a failed read and the host's two stale steps, the unavailable refusal's lastKnown reads the Run and its Attempt row last-known-running + stale, none current", { timeout: CASE_TIMEOUT_MS }, async () => {
    const run: FixtureRun = { runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(1) };
    const { projection, observed } = await viewed(run);
    const failing = new FurnaceObserver(memoryFurnace(run, () => Object.assign(new Error("private native detail"), { code: "run_not_found" })), { workspaceRoot: WORKSPACE, runId: RUN_ID, scope: SCOPE, limits: LIMITS, traceRun: true });
    const error = await failing.snapshot().then(() => undefined, (rejected: unknown) => rejected);
    markedStale(projection, observed);
    const reply = parse(furnaceObserveFailure(viewOf(projection), error));
    expect([reply.contract, reply.tool, reply.ok, reply.invoked, (reply.error as Json).code, (reply.error as Json).reason]).toStrictEqual([TOOL_REPLY_CONTRACT_VERSION, FURNACE_OBSERVE_TOOL, false, false, "unavailable", "unavailable"]);
    expect((reply.error as Json).message).toBe("Furnace status unavailable (run_not_found)");
    const lastKnown = reply.lastKnown as Json;
    expect((lastKnown.nodes as Json[]).map(node => `${(node.nativeRef as Json).type}:${node.freshness}:${node.sourceConnectionState}:${(node.presentation as Json).statusTone}`)).toStrictEqual([
      "run:stale:disconnected:active",
      "attempt:stale:disconnected:active",
    ]);
    expect(lastKnown.freshness).toStrictEqual({ current: 0, stale: 2, unknown: 0, lastKnownRunningStale: 2, summary: TWO_STALE });
    expect(JSON.stringify(reply)).not.toContain("private native detail");
  });

  it("C2P: FurnaceObservedAttempts hands back the Attempt refs recorded for a Run - refs of one provider, type and scope, no ID recorded for two Runs - once each in first-seen order across reads, never another Run's, as copies, and forgets the oldest past its cap", () => {
    const observed = new FurnaceObservedAttempts();
    observed.record(RUN_ID, [attemptRef("frn-atm-1"), attemptRef("frn-atm-2")]);
    observed.record("frn-run-other-fixture", [attemptRef("frn-atm-other")]);
    observed.record(RUN_ID, [attemptRef("frn-atm-2"), attemptRef("frn-atm-3")]);
    expect(observed.refs(RUN_ID), "the Run's refs, once each, in first-seen order").toStrictEqual([attemptRef("frn-atm-1"), attemptRef("frn-atm-2"), attemptRef("frn-atm-3")]);
    expect([observed.refs("frn-run-other-fixture"), observed.refs("frn-run-never-read")], "another Run's refs stay under its own ID").toStrictEqual([[attemptRef("frn-atm-other")], []]);
    const handed = observed.refs(RUN_ID);
    for (const entry of handed) entry.id = "frn-atm-overwritten";
    expect(observed.refs(RUN_ID).map(entry => entry.id), "the refs handed out are copies").toStrictEqual(["frn-atm-1", "frn-atm-2", "frn-atm-3"]);
    const capped = new FurnaceObservedAttempts(3);
    capped.record(RUN_ID, ["a", "b", "c", "d"].map(id => attemptRef(`frn-atm-${id}`)));
    expect(capped.refs(RUN_ID).map(entry => entry.id), "past the cap the oldest is forgotten first").toStrictEqual(["frn-atm-b", "frn-atm-c", "frn-atm-d"]);
    const defaulted = new FurnaceObservedAttempts();
    defaulted.record(RUN_ID, Array.from({ length: FURNACE_OBSERVED_ATTEMPTS_MAX + 1 }, (_, index) => attemptRef(`frn-atm-cap-${index}`)));
    const kept = defaulted.refs(RUN_ID).map(entry => entry.id);
    expect([FURNACE_OBSERVED_ATTEMPTS_MAX, kept.length, kept[0], kept.at(-1)], "the default cap is the session projection's 2000 nodes").toStrictEqual([2_000, 2_000, "frn-atm-cap-1", "frn-atm-cap-2000"]);
  });

  it("C2O: FurnaceObservedAttempts keeps a ref recorded again after another read in its first-seen slot, and past its cap forgets the first-seen ref first, a ref recorded again included", () => {
    const observed = new FurnaceObservedAttempts();
    observed.record(RUN_ID, [attemptRef("frn-atm-1"), attemptRef("frn-atm-2")]);
    observed.record(RUN_ID, [attemptRef("frn-atm-3")]);
    observed.record(RUN_ID, [attemptRef("frn-atm-2")]);
    expect(observed.refs(RUN_ID).map(ref => ref.id), "frn-atm-2, recorded again after frn-atm-3, keeps its first-seen slot").toStrictEqual(["frn-atm-1", "frn-atm-2", "frn-atm-3"]);
    const capped = new FurnaceObservedAttempts(2);
    capped.record(RUN_ID, [attemptRef("frn-atm-a"), attemptRef("frn-atm-b")]);
    capped.record(RUN_ID, [attemptRef("frn-atm-a")]);
    capped.record(RUN_ID, [attemptRef("frn-atm-c")]);
    expect(capped.refs(RUN_ID).map(ref => ref.id), "past the cap the first-seen frn-atm-a is forgotten, though it was recorded again last").toStrictEqual(["frn-atm-b", "frn-atm-c"]);
  });

  it("C2X: FurnaceObservedAttempts counts its cap across Runs, so past it the oldest ref of any Run is forgotten first", () => {
    const capped = new FurnaceObservedAttempts(3);
    const held = (): string[][] => ["frn-run-cap-a", "frn-run-cap-b"].map(runId => capped.refs(runId).map(ref => ref.id));
    capped.record("frn-run-cap-a", [attemptRef("frn-atm-a1"), attemptRef("frn-atm-a2")]);
    capped.record("frn-run-cap-b", [attemptRef("frn-atm-b1"), attemptRef("frn-atm-b2")]);
    expect(held(), "the fourth ref across Runs, Run B's second, forgets Run A's oldest").toStrictEqual([["frn-atm-a2"], ["frn-atm-b1", "frn-atm-b2"]]);
    capped.record("frn-run-cap-b", [attemptRef("frn-atm-b3")]);
    expect(held(), "the next ref of Run B forgets Run A's last").toStrictEqual([[], ["frn-atm-b1", "frn-atm-b2", "frn-atm-b3"]]);
    capped.record("frn-run-cap-b", [attemptRef("frn-atm-b4")]);
    expect(held(), "Run B's own oldest goes first when it is the oldest across Runs").toStrictEqual([[], ["frn-atm-b2", "frn-atm-b3", "frn-atm-b4"]]);
  });

  it("C2R: the registered furnace_observe marks the Run and its Attempt row stale when a read after an answered one fails, and every failing reply's lastKnown summary reads last-known-running + stale with no row current", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake(["furnace:inspect"], async (boot, fake) => {
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, attempts: attempts(1) }));
      expect(rowsOf(parse(textOfResult(await boot.call({ runId: RUN_ID }))), "observe"), "the answered read: both rows current and running").toStrictEqual(["run:current:active", "attempt:current:active"]);
      fake.play(furnaceMissing());
      const markStale = vi.spyOn(ObservationProjection.prototype, "markStale");
      const first = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect(
        markStale.mock.calls.map(([input]) => `${input.scope.workspace}|${input.ref.provider}:${input.ref.type}:${input.ref.id}:${input.ref.scope ?? ""}`),
        "the Run's ref, then the Attempt row's, each under the call's scope",
      ).toStrictEqual([`${boot.workspace}|furnace:run:${RUN_ID}:${boot.workspace}`, `${boot.workspace}|furnace:attempt:frn-atm-1:${boot.workspace}`]);
      const second = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      for (const reply of [first, second]) {
        expect([(reply.error as Json).code, rowsOf(reply, "lastKnown")], "no lastKnown row reads current").toStrictEqual(["unavailable", ["run:stale:active", "attempt:stale:active"]]);
        expect(((reply.lastKnown as Json).freshness as Json).summary).toBe(TWO_STALE);
      }
    });
  });

  it("C2E: the registered furnace_observe marks the Run's ref and then each of the three Attempt rows one answered read refreshed stale, in page order, when the next read fails, and that reply's lastKnown reads all four rows stale and running, none current", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake(["furnace:inspect"], async (boot, fake) => {
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, attempts: attempts(3) }));
      const answered = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect(idRowsOf(answered, "observe"), "the answered read: the Run row and its three Attempt rows, all current").toStrictEqual([
        `run:${RUN_ID}:current`,
        "attempt:frn-atm-1:current",
        "attempt:frn-atm-2:current",
        "attempt:frn-atm-3:current",
      ]);
      fake.play(furnaceMissing());
      const markStale = vi.spyOn(ObservationProjection.prototype, "markStale");
      const failed = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect(markStale.mock.calls.map(([input]) => staleCallOf(input)), "the Run's ref, then every Attempt row's, in page order, each under the call's scope").toStrictEqual([
        `${boot.workspace}|furnace:run:${RUN_ID}:${boot.workspace}`,
        ...["frn-atm-1", "frn-atm-2", "frn-atm-3"].map(id => `${boot.workspace}|furnace:attempt:${id}:${boot.workspace}`),
      ]);
      expect([(failed.error as Json).code, idRowsOf(failed, "lastKnown")], "every lastKnown row reads stale").toStrictEqual([
        "unavailable",
        [`run:${RUN_ID}:stale`, "attempt:frn-atm-1:stale", "attempt:frn-atm-2:stale", "attempt:frn-atm-3:stale"],
      ]);
      expect([rowsOf(failed, "lastKnown"), ((failed.lastKnown as Json).freshness as Json).summary], "each still running, none current").toStrictEqual([
        ["run:stale:active", "attempt:stale:active", "attempt:stale:active", "attempt:stale:active"],
        FOUR_STALE,
      ]);
    });
  });

  it("C2W: the registered furnace_observe marks stale the Attempt rows of both earlier answered reads of the Run, in first-seen order, an earlier page's rows included, when the next read fails", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake(["furnace:inspect"], async (boot, fake) => {
      // First-seen order (frn-atm-2, frn-atm-3, then frn-atm-1) is not the IDs' sorted order, so the call order below reads it.
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, attempts: attempts(3).slice(1) }));
      expect(idsOf(parse(textOfResult(await boot.call({ runId: RUN_ID })))), "the first answered read pages frn-atm-2 and frn-atm-3").toStrictEqual([RUN_ID, "frn-atm-2", "frn-atm-3"]);
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, attempts: attempts(1) }));
      const second = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect([second.ok, (second.attempts as Json).returned], "the second answered read pages frn-atm-1 alone").toStrictEqual([true, 1]);
      fake.play(furnaceMissing());
      const markStale = vi.spyOn(ObservationProjection.prototype, "markStale");
      const failed = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect(markStale.mock.calls.map(([input]) => staleCallOf(input)), "the Run's ref, then each Attempt ref either read refreshed, in first-seen order").toStrictEqual([
        `${boot.workspace}|furnace:run:${RUN_ID}:${boot.workspace}`,
        ...["frn-atm-2", "frn-atm-3", "frn-atm-1"].map(id => `${boot.workspace}|furnace:attempt:${id}:${boot.workspace}`),
      ]);
      const lastKnown = idRowsOf(failed, "lastKnown");
      expect([(failed.error as Json).code, [...lastKnown].sort()], "all four rows, each stale").toStrictEqual([
        "unavailable",
        ["attempt:frn-atm-1:stale", "attempt:frn-atm-2:stale", "attempt:frn-atm-3:stale", `run:${RUN_ID}:stale`],
      ]);
      expect(((failed.lastKnown as Json).freshness as Json).summary, "none current, each still running").toBe(FOUR_STALE);
    });
  });

  it("C2F: the registered furnace_observe keeps an Attempt a later read returns again in its first-seen place - after answered reads paging frn-atm-1 and frn-atm-2, then frn-atm-3, then frn-atm-2 again, a failing read marks the Run's ref and then frn-atm-1, frn-atm-2 and frn-atm-3, and its lastKnown reads those four rows stale, none current", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake(["furnace:inspect"], async (boot, fake) => {
      // frn-atm-2 is seen first in the first read, not in the second and again in the third: first-seen order is 1, 2, 3, while
      // the order the reads last returned the refs in is 1, 3, 2.
      for (const page of [["frn-atm-1", "frn-atm-2"], ["frn-atm-3"], ["frn-atm-2"]]) {
        fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, attempts: attempts(3).filter(attempt => page.includes(attempt.attempt_id)) }));
        const answered = parse(textOfResult(await boot.call({ runId: RUN_ID })));
        expect([answered.ok, (answered.attempts as Json).returned], `the answered read paging ${page.join(" and ")}`).toStrictEqual([true, page.length]);
      }
      fake.play(furnaceMissing());
      const markStale = vi.spyOn(ObservationProjection.prototype, "markStale");
      const failed = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect(markStale.mock.calls.map(([input]) => staleCallOf(input)), "the Run's ref, then each Attempt ref in first-seen order, each under the call's scope").toStrictEqual([
        `${boot.workspace}|furnace:run:${RUN_ID}:${boot.workspace}`,
        ...["frn-atm-1", "frn-atm-2", "frn-atm-3"].map(id => `${boot.workspace}|furnace:attempt:${id}:${boot.workspace}`),
      ]);
      expect([(failed.error as Json).code, [...idRowsOf(failed, "lastKnown")].sort()], "all four rows, each stale").toStrictEqual([
        "unavailable",
        ["attempt:frn-atm-1:stale", "attempt:frn-atm-2:stale", "attempt:frn-atm-3:stale", `run:${RUN_ID}:stale`],
      ]);
      expect(((failed.lastKnown as Json).freshness as Json).summary, "none current, each still running").toBe(FOUR_STALE);
    });
  });

  it("C2Q: residual R-RECORDER-CAP's quiet row, its module half - the host's one recorder takes the default cap, which is the session projection's node cap, and an Attempt ref a capped FurnaceObservedAttempts forgot is not marked by the two stale steps markedStale restates from the host, so its row, still in the projection, reads current in lastKnown beside the stale rest", { timeout: CASE_TIMEOUT_MS }, async () => {
    const host = readFileSync(join(REPO, "src", "index.ts"), "utf8");
    expect(host.match(/new FurnaceObservedAttempts\([^)]*\)/g), "the host constructs one recorder, at the module default cap").toStrictEqual(["new FurnaceObservedAttempts()"]);
    const nodeCaps = [...host.matchAll(/const projection = new ObservationProjection\(\{[^}]*\bmaxNodes: ([\d_]+)/g)].map(match => Number(match[1]?.replaceAll("_", "")));
    expect(nodeCaps, "the host builds its one session projection with maxNodes FURNACE_OBSERVED_ATTEMPTS_MAX").toStrictEqual([FURNACE_OBSERVED_ATTEMPTS_MAX]);
    const run: FixtureRun = { runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(3) };
    const { projection } = await viewed(run);
    const capped = new FurnaceObservedAttempts(2);
    capped.record(RUN_ID, ["frn-atm-1", "frn-atm-2", "frn-atm-3"].map(attemptRef));
    expect(capped.refs(RUN_ID).map(ref => ref.id), "past its cap the recorder forgot the oldest ref").toStrictEqual(["frn-atm-2", "frn-atm-3"]);
    const failing = new FurnaceObserver(memoryFurnace(run, () => Object.assign(new Error("private native detail"), { code: "run_not_found" })), { workspaceRoot: WORKSPACE, runId: RUN_ID, scope: SCOPE, limits: LIMITS, traceRun: true });
    const error = await failing.snapshot().then(() => undefined, (rejected: unknown) => rejected);
    markedStale(projection, capped);
    const reply = parse(furnaceObserveFailure(viewOf(projection), error));
    expect(idRowsOf(reply, "lastKnown"), "the forgotten ref's row stays current: the residual's page").toStrictEqual([
      `run:${RUN_ID}:stale`,
      "attempt:frn-atm-1:current",
      "attempt:frn-atm-2:stale",
      "attempt:frn-atm-3:stale",
    ]);
    expect(((reply.lastKnown as Json).freshness as Json).current, "exactly one row reads current").toBe(1);
  });

  it("C2H: residual R-RECORDER-CAP's quiet row, its host half - the registered furnace_observe's failing read marks the Run's ref and the refs its recorder holds and no other row, so an Attempt row of the Run's viewport whose ref the recorder does not hold reads current in lastKnown beside the stale rest", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake(["furnace:inspect"], async (boot, fake) => {
      const run: FixtureRun = { runId: RUN_ID, workspace: boot.workspace, attempts: attempts(2) };
      fake.play(furnaceAnswers(run));
      const refresh = vi.spyOn(ObservationProjection.prototype, "refresh");
      expect(idRowsOf(parse(textOfResult(await boot.call({ runId: RUN_ID }))), "observe"), "the answered read: the Run row and its two Attempt rows, current").toStrictEqual([
        `run:${RUN_ID}:current`,
        "attempt:frn-atm-1:current",
        "attempt:frn-atm-2:current",
      ]);
      // The session projection is the one projection the answered read refreshed: the Run's row, then its two Attempt rows.
      const sessions = [...new Set(refresh.mock.contexts)];
      expect([sessions.length, refresh.mock.calls.length], "one projection, refreshed three times").toStrictEqual([1, 3]);
      const session = sessions[0];
      const written = refresh.mock.calls[0]?.[0];
      if (!(session instanceof ObservationProjection) || written === undefined) throw new Error("the answered read refreshed no ObservationProjection");
      refresh.mockRestore();
      // The state a ref the recorder forgot past its cap leaves (C2Q, the module half): an Attempt row of the Run in the session
      // projection whose ref the recorder does not hold. A FurnaceObserver this test builds over the in-memory client, under the
      // scope the host wrote with, writes that row for frn-atm-3, which no furnace_observe read returned.
      const writer = new FurnaceObserver(memoryFurnace({ ...run, attempts: attempts(3).slice(2) }), { workspaceRoot: boot.workspace, runId: RUN_ID, scope: written.scope, limits: LIMITS, traceRun: true });
      const unheld = writer.projectionTopology(await writer.snapshot()).snapshots[1];
      if (unheld === undefined) throw new Error("the in-memory read produced no Attempt snapshot");
      session.refresh(unheld);
      fake.play(furnaceMissing());
      const markStale = vi.spyOn(ObservationProjection.prototype, "markStale");
      const failed = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect(markStale.mock.calls.map(([input]) => staleCallOf(input)), "the Run's ref and the two refs the recorder holds, and no other row").toStrictEqual([
        `${boot.workspace}|furnace:run:${RUN_ID}:${boot.workspace}`,
        ...["frn-atm-1", "frn-atm-2"].map(id => `${boot.workspace}|furnace:attempt:${id}:${boot.workspace}`),
      ]);
      expect(idRowsOf(failed, "lastKnown"), "the row whose ref the recorder does not hold stays current: the residual's page").toStrictEqual([
        `run:${RUN_ID}:stale`,
        "attempt:frn-atm-1:stale",
        "attempt:frn-atm-2:stale",
        "attempt:frn-atm-3:current",
      ]);
      expect(((failed.lastKnown as Json).freshness as Json).current, "exactly one row reads current").toBe(1);
    });
  });

  it("C3: every success reply text, and the invalid-request refusal a cap too small for the viewport gets, fits its cap in UTF-8 bytes, ASCII, quote-escaped and non-ASCII alike, and states what it left out", { timeout: CASE_TIMEOUT_MS }, async () => {
    const shapes: Record<string, FixtureRun> = {
      ascii: { runId: RUN_ID, workspace: WORKSPACE, beadsRunId: `bd-${"a".repeat(300)}`, attempts: attempts(20, index => ({ attempt_id: `frn-atm-${"x".repeat(80)}-${index}` })) },
      quoted: { runId: RUN_ID, workspace: WORKSPACE, beadsRunId: `bd-${'"\\'.repeat(150)}`, attempts: attempts(20, index => ({ attempt_id: `frn-atm-${'"'.repeat(60)}-${index}` })) },
      nonAscii: { runId: RUN_ID, workspace: WORKSPACE, furnaceVersion: `0.1.0-${String.fromCodePoint(0x20ac).repeat(300)}`, attempts: attempts(20, index => ({ attempt_id: `frn-atm-${String.fromCodePoint(0x6f22).repeat(60)}-${index}` })) },
    };
    const seen: string[] = [];
    for (const [shape, run] of Object.entries(shapes)) {
      const { projection, reading } = await viewed(run);
      for (const cap of CAPS) {
        const text = furnaceObserveReply(viewOf(projection, { maxBytes: cap }), reading);
        expect(bytes(text), `${shape} at ${cap}: the UTF-8 bytes of the reply`).toBeLessThanOrEqual(cap);
        const reply = parse(text);
        if (reply.ok === false) {
          expect((reply.error as Json).code, `${shape} at ${cap}: a cap that cannot hold the viewport is refused typed`).toBe("invalid-request");
          seen.push(`${shape}:${cap}:refused`);
          continue;
        }
        const observe = reply.observe as Json;
        const window = observe.window as Json;
        const dropped = observe.droppedForBytes as Json;
        expect(Number(window.returned) + Number(dropped.nodes), `${shape} at ${cap}: returned + dropped is the page's rows`).toBe(Math.min(20, Number(window.total)));
        const stated = observe.truncatedForBytes === true || Array.isArray(reply.omitted);
        if (Number(window.returned) < Math.min(20, Number(window.total))) expect(stated, `${shape} at ${cap}: a short page says why`).toBe(true);
        seen.push(`${shape}:${cap}:${Number(window.returned)}`);
      }
    }
    expect(seen.filter(entry => entry.endsWith(":1024:refused") || entry.split(":")[1] === "1024"), "the floor was read for each shape").toHaveLength(3);
    expect(seen.some(entry => entry.startsWith("ascii:65536:") && !entry.endsWith(":refused")), "the widest cap returns rows").toBe(true);
  });

  it("C3P: a 20-Attempt Run offers 21 rows, returns 20 with a cursor, and the cursor's page returns the 21st", { timeout: CASE_TIMEOUT_MS }, async () => {
    const { projection, reading } = await viewed({ runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(20) });
    const first = parse(furnaceObserveReply(viewOf(projection, { maxBytes: 65_536 }), reading));
    const window = (first.observe as Json).window as Json;
    expect([window.total, window.returned, window.truncated, typeof window.nextCursor]).toStrictEqual([21, 20, true, "string"]);
    const second = parse(furnaceObserveReply(viewOf(projection, { maxBytes: 65_536, cursor: String(window.nextCursor) }), reading));
    const rest = (second.observe as Json).nodes as Json[];
    expect(rest.map(node => (node.nativeRef as Json).id)).toStrictEqual(["frn-atm-20"]);
    const refused = parse(furnaceObserveReply(viewOf(projection, { cursor: "not-a-cursor" }), reading));
    expect([refused.ok, (refused.error as Json).code]).toStrictEqual([false, "invalid-request"]);
  });

  it("C3R: the registered furnace_observe forwards limit, cursor and maxBytes to the Run viewport, and without them reads the default cap and every row", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake(["furnace:inspect"], async (boot, fake) => {
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, attempts: attempts(3) }));
      const first = parse(textOfResult(await boot.call({ runId: RUN_ID, limit: 2 })));
      const window = (first.observe as Json).window as Json;
      expect([window.total, window.returned, typeof window.nextCursor, idsOf(first)], "limit 2: the Run row and the first Attempt row of 4").toStrictEqual([4, 2, "string", [RUN_ID, "frn-atm-1"]]);
      const second = parse(textOfResult(await boot.call({ runId: RUN_ID, limit: 2, cursor: String(window.nextCursor) })));
      expect([second.ok, idsOf(second)], "the cursor's page: the next two Attempt rows").toStrictEqual([true, ["frn-atm-2", "frn-atm-3"]]);
      const capped = textOfResult(await boot.call({ runId: RUN_ID, maxBytes: 2048 }));
      expect([parse(capped).ok, parse(capped).maxBytes, bytes(capped) <= 2048], "maxBytes 2048 is the reply's own cap").toStrictEqual([true, 2048, true]);
      const plain = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect([plain.maxBytes, ((plain.observe as Json).window as Json).returned], "no bounds: the default cap and every row").toStrictEqual([16_384, 4]);
    });
  });

  it("C4: credential probes in executors, log cursors, Run IDs and producer versions, line-split ones included, never reach the reply", { timeout: CASE_TIMEOUT_MS }, async () => {
    const { projection, reading } = await viewed({
      runId: RUN_ID,
      workspace: WORKSPACE,
      beadsRunId: `Authorization: Bearer\n${PROBE}ghi`,
      furnaceVersion: `0.1.0 Bearer ${PROBE}`,
      logCursor: `Bearer ${PROBE}`,
      attempts: attempts(1, () => ({ executor: `Bearer ${PROBE}` })),
    });
    const text = furnaceObserveReply(viewOf(projection), reading);
    expect(text).not.toContain(PROBE);
    expect(text).toContain("[REDACTED]");
    await withFake(["furnace:inspect"], async (boot, fake) => {
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, beadsRunId: `Authorization: Bearer\n${PROBE}ghi`, attempts: attempts(1) }));
      const served = textOfResult(await boot.call({ runId: RUN_ID }));
      expect(parse(served).ok, "the full wired reply answered").toBe(true);
      expect(served, "the line-split credential through the full wired reply").not.toContain(PROBE);
    });
  });

  it("C5: the three refusals are typed tool-reply errors with closed codes, and denial makes zero Furnace calls", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake([], async (boot, fake) => {
      const denied = textOfResult(await boot.call({ runId: RUN_ID }));
      expect(denied).toBe(furnaceObserveRefusal("not-granted", "Permission denied: furnace:inspect grant required."));
      expect(parse(denied)).toStrictEqual({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: FURNACE_OBSERVE_TOOL, ok: false, invoked: false, error: { code: "not-granted", message: "Permission denied: furnace:inspect grant required." } });
      expect(fake.calls(), "no Furnace call without the grant").toStrictEqual([]);
    });
    await withFake(["workbench:observe"], async (boot, fake) => {
      expect(parse(textOfResult(await boot.call({ runId: RUN_ID }))).error).toStrictEqual({ code: "not-granted", message: "Permission denied: furnace:inspect grant required." });
      expect(fake.calls(), "workbench:observe never implies furnace:inspect").toStrictEqual([]);
    });
    await withFake(["furnace:inspect"], async (boot, fake) => {
      const invalid = textOfResult(await boot.call({ runId: "census-not-a-run" }));
      expect(invalid).toBe(furnaceObserveRefusal("invalid-run-id", "Invalid native Furnace Run identity."));
      expect(fake.calls(), "no Furnace call for an invalid Run ID").toStrictEqual([]);
      const tooSmall = parse(textOfResult(await boot.call({ runId: RUN_ID, maxBytes: 10 })));
      expect([(tooSmall.error as Json).code, fake.calls()]).toStrictEqual(["invalid-request", []]);
      fake.play({});
      const absent = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect([absent.ok, (absent.error as Json).code, absent.runId]).toStrictEqual([false, "unavailable", RUN_ID]);
      fake.play(furnaceMissing());
      const missing = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect((missing.error as Json).message).toBe("Furnace status unavailable (run_not_found)");
      for (const reply of [parse(invalid), tooSmall, absent, missing]) expect(FURNACE_OBSERVE_ERROR_CODES as readonly unknown[]).toContain((reply.error as Json).code);
    });
  });

  it("C5B: a limit outside 1..40, a cursor over 256 UTF-8 bytes and a maxBytes outside 1024..65536 are each refused typed before any native read", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake(["furnace:inspect"], async (boot, fake) => {
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, attempts: attempts(1) }));
      const outside: readonly Json[] = [{ limit: 0 }, { limit: 41 }, { limit: 1.5 }, { cursor: "x".repeat(257) }, { cursor: String.fromCodePoint(0x20ac).repeat(86) }, { maxBytes: 1023 }, { maxBytes: 65_537 }];
      const codes: unknown[] = [];
      for (const bounds of outside) codes.push((parse(textOfResult(await boot.call({ runId: RUN_ID, ...bounds }))).error as Json | undefined)?.code);
      expect(codes, "each bound is refused typed").toStrictEqual(outside.map(() => "invalid-request"));
      expect(fake.calls(), "and no Furnace call was made for any of them").toStrictEqual([]);
      expect(parse(textOfResult(await boot.call({ runId: RUN_ID, limit: 40, maxBytes: 65_536 }))).ok, "the bounds themselves are answered").toBe(true);
    });
  });

  it("C5M: every attach-failure reply text fits its cap in UTF-8 bytes, a long non-ASCII, quote-escaped native message included, whose refusal message stays within 160 UTF-16 code units", { timeout: CASE_TIMEOUT_MS }, async () => {
    const { projection, observed } = await viewed({ runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(20) });
    markedStale(projection, observed);
    const native = `${String.fromCodePoint(0x754c).repeat(3000)}"\\`.repeat(2);
    const carried: string[] = [];
    for (const [holder, held] of [
      ["empty", new ObservationProjection()],
      ["held", projection],
    ] as const) {
      for (const cap of CAPS) {
        const text = furnaceObserveFailure(viewOf(held, { maxBytes: cap }), new Error(native));
        expect(bytes(text), `${holder} at ${cap}: the UTF-8 bytes of the failure reply`).toBeLessThanOrEqual(cap);
        const reply = parse(text);
        const message = String((reply.error as Json).message);
        expect([reply.ok, (reply.error as Json).code, message.length <= 160, message.startsWith(String.fromCodePoint(0x754c))], `${holder} at ${cap}: the typed unavailable refusal, its message bounded`).toStrictEqual([false, "unavailable", true, true]);
        if (reply.lastKnown !== undefined) carried.push(`${holder}:${cap}`);
        else expect(reply.omitted, `${holder} at ${cap}: a viewport it cannot carry is named`).toStrictEqual(["lastKnown"]);
      }
    }
    expect([carried.includes("held:65536"), carried.includes("held:1024")], "the held viewport is carried at 65536 and omitted at the floor").toStrictEqual([true, false]);
  });

  it("C6: no registered workbench tool answers with a raw provider reading contract, and the judge reds a planted raw reply", { timeout: CASE_TIMEOUT_MS }, async () => {
    const toolsOf = async (settings: Record<string, unknown>): Promise<Map<string, { execute: (...args: unknown[]) => Promise<unknown> }>> => {
      const sandbox = hermeticDir({ settings: { workflowsEnabled: true, ...settings } });
      try {
        const booted = makePi();
        subagentsExtension(booted.pi);
        await booted.lifecycle.get("session_start")?.({}, ctx({ cwd: sandbox.dir }));
        return new Map(booted.tools);
      } finally {
        sandbox.restore();
      }
    };
    const upstream = await toolsOf({});
    const sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [] } } });
    const replies: string[] = [];
    try {
      const booted = makePi();
      subagentsExtension(booted.pi);
      const context = ctx({ cwd: sandbox.dir });
      await booted.lifecycle.get("session_start")?.({}, context);
      const workbench = [...booted.tools.keys()].filter(name => !upstream.has(name)).sort();
      expect(workbench, "the census enumerates the registered workbench tools").toContain(FURNACE_OBSERVE_TOOL);
      for (const name of workbench) {
        try {
          replies.push(textOfResult(await booted.tools.get(name).execute("census", {}, undefined, undefined, context)));
        } catch {}
      }
    } finally {
      sandbox.restore();
    }
    expect(replies.map(rawReading).filter(found => found !== undefined), "no zero-grant reply carries a provider reading contract").toStrictEqual([]);
    await withFake(["furnace:inspect"], async (boot, fake) => {
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, attempts: attempts(1) }));
      const data = textOfResult(await boot.call({ runId: RUN_ID }));
      expect([rawReading(data), parse(data).contract]).toStrictEqual([undefined, TOOL_REPLY_CONTRACT_VERSION]);
    });
    const { reading } = await viewed({ runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(1) });
    expect(rawReading(sanitizeWorkbenchJsonText(reading)), "the judge reds the old raw reply").toBe(FURNACE_EXTERNAL_OBSERVATION_CONTRACT);
  });

  it("C7: the registered furnace_observe relates one native-confirmed Run->Attempt ownership edge per Attempt of the page it read", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake(["furnace:inspect"], async (boot, fake) => {
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, attempts: attempts(2) }));
      const relate = vi.spyOn(ObservationProjection.prototype, "relate");
      expect(parse(textOfResult(await boot.call({ runId: RUN_ID }))).ok).toBe(true);
      expect(
        relate.mock.calls.map(([input]) => `${input.kind}:${input.from.type}:${input.from.id}->${input.to.type}:${input.to.id}:${input.provenance.nativeConfirmationRef ?? ""}`),
        "one ownership edge per Attempt, confirmed by the Attempt page's request ID",
      ).toStrictEqual([`ownership:run:${RUN_ID}->attempt:frn-atm-1:fixture-attempts`, `ownership:run:${RUN_ID}->attempt:frn-atm-2:fixture-attempts`]);
    });
  });

  it("C8: a tighter cap omits the success facts logs first, then attempts, run, snapshot and source, and each reply names exactly what it left out", { timeout: CASE_TIMEOUT_MS }, async () => {
    const { projection, reading } = await viewed({ runId: RUN_ID, workspace: WORKSPACE, beadsRunId: `bd-${"b".repeat(600)}`, furnaceVersion: `0.1.0-${"v".repeat(600)}`, attempts: attempts(2) });
    const sets: string[] = [];
    for (let cap = 1024; cap <= 4096; cap += 16) {
      const reply = parse(furnaceObserveReply(viewOf(projection, { maxBytes: cap }), reading));
      if (reply.ok !== true) continue;
      const omitted = Array.isArray(reply.omitted) ? (reply.omitted as string[]) : [];
      expect(omitted, `at ${cap}: a prefix of the omission order`).toStrictEqual(OMISSION_ORDER.slice(0, omitted.length));
      expect(
        OMISSION_ORDER.map(fact => `${fact}:${Object.hasOwn(reply, fact)}`),
        `at ${cap}: every fact it keeps is carried and none it omits is`,
      ).toStrictEqual(OMISSION_ORDER.map(fact => `${fact}:${!omitted.includes(fact)}`));
      const set = omitted.join(",");
      if (sets.at(-1) !== set) sets.push(set);
    }
    expect(sets, "as the cap grows: all five facts omitted, then four, three, two, one (logs) and none").toStrictEqual([
      "logs,attempts,run,snapshot,source",
      "logs,attempts,run,snapshot",
      "logs,attempts,run",
      "logs,attempts",
      "logs",
      "",
    ]);
  });
});
