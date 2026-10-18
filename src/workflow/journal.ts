/**
 * journal.ts — the record a workflow run leaves so a later run can skip work.
 *
 * ## What resume actually buys
 *
 * The documented iteration loop is "edit the persisted script and re-run it".
 * Without a journal that re-pays every agent from scratch, which for a 40-agent
 * audit is the entire cost of the run — to change one line of the last stage.
 * With one, the unchanged prefix comes back from disk and only the edit runs.
 *
 * ## Why a *prefix*, and not a lookup table
 *
 * Each entry is keyed by both its position in the run and a hash of everything
 * that decides what that agent does. A replay walks positions in order and
 * stops reusing at the first entry that does not match — every call from there
 * on runs live. Reusing later matches out of order would be reusing a result
 * produced under different upstream conditions: the same prompt at position 12
 * of a *different* run is not the same work, because what fed it changed.
 *
 * A failed agent is journaled as a failure and never replayed as one. Resuming
 * a run that died at agent 5 exists to retry agent 5, so the prefix ends there
 * and 5 onwards run live — the alternative would make a failure permanent.
 *
 * ## Runs that use `agent({ resume })`
 *
 * Those are not replayed at all. A replayed agent is text from a file, not a
 * live child, so there is no conversation in this run for a later `resume` to
 * continue — and the id map that would find one belongs to the run that did
 * the spawning. Rather than replay a prefix that strands the first `resume`
 * call, a journal carrying one declines the whole cache and the run pays in
 * full. Coarse on purpose: the alternative is tracking which label each entry
 * ran under and capping the prefix below the earliest one that gets resumed,
 * which is a second key concept for a case that costs one run.
 *
 * ## Ordering under concurrency
 *
 * Positions are assigned as calls arrive, and with `pipeline` that order
 * depends on which agent finished first. A replay usually reproduces it, since
 * cached calls answer in journal order, but it is not guaranteed. That is why
 * the key is checked as well as the position: a run that interleaves
 * differently loses cache hits, it never returns another agent's answer.
 *
 * The file is JSON Lines, appended as each agent settles, so a run that is
 * killed mid-flight still leaves everything it had finished. A non-read node
 * is the one row written before anything settles (below).
 *
 * ## SDK node entries
 *
 * `node()` operations share the file under `kind: "node"`, in their own
 * position space, so the agent prefix walk never sees them. They are recorded
 * for two reasons that pull against each other: a "read" result may be handed
 * back on resume (marked stale, never fresh), while any other effect class is
 * a tripwire — the resume stops on it rather than re-running or silently
 * replaying an effect the previous run already performed. The admission rules
 * live in runtime.ts; this file only keeps the record honest.
 *
 * The tripwire has to exist from dispatch, not from settlement: a run killed
 * between a provider's side effect and its result, or between the result and
 * its append, would otherwise leave no row for the resume to stop on. So a
 * non-read node (an unclassified one included) is appended once BEFORE its
 * provider is called, as a `dispatched` marker row, and its settled row at the
 * same position supersedes the marker — the runtime keys node rows last-wins.
 * A marker nothing superseded is a dispatch with no settled record, and a
 * resume refuses there as an uncertain effect.
 *
 * Failure to write is not failure to run — for agents and node reads, whose
 * lost row costs a later resume nothing worse than re-running work that can
 * safely run again. A non-read dispatch is the exception: an unrecorded one
 * is exactly the window the marker closes, so runtime.ts refuses the call,
 * fail-closed, when its marker row does not reach the file.
 */

import { createHash } from "node:crypto";
import { appendFileSync, readFileSync } from "node:fs";
import type { NativeRef } from "../workbench/observation.js";
import { isReconcileRecord, type ReconcileRecord } from "./reconcile.js";

/** One settled agent call, as replayed. */
export interface WorkflowJournalEntry {
  /** Position in the run — the same counter that names `wf-agent-N`. */
  index: number;
  /** Hash of the call's payload; a mismatch ends the replayable prefix. */
  key: string;
  /** Whether the agent succeeded. A failure ends the prefix on replay. */
  ok: boolean;
  /** The agent's answer, when it had one. */
  text?: string;
  /**
   * Whether the call continued an earlier child (`agent({ resume })`).
   *
   * A replayed agent leaves no session behind in the run that replays it — the
   * conversation belongs to the run that actually spawned it, and the host's
   * id map is per-run — so a later `resume` would have nothing to continue.
   * Recording it lets the next run decline to replay at all rather than fail
   * partway through, which is why the flag is on the journal and not derived.
   */
  resumed?: true;
  /**
   * Entry kind. Absent for a settled agent — the legacy shape, byte-for-byte —
   * and `"node"` for an SDK `node()` operation, which is admitted on resume by
   * the per-effect-class policy in runtime.ts, never by the agent prefix rule.
   * `"acknowledge"` and `"override"` are operator decision rows (reconcile.ts)
   * that ride beside the node row they bind to, in the same position space.
   */
  kind?: "node" | "acknowledge" | "override";
  /** The capability a node entry invoked; names the owning producer on refusal. */
  capabilityId?: string;
  /**
   * The effect class the host declared for the capability when the node ran.
   * `"read"` is the only class a resume may replay; anything else — including
   * an entry recorded without one, by a host that declared nothing — is never
   * handed back as a result. Open text rather than a closed union so a journal
   * written by a newer host with a new class is kept (and refused) rather than
   * dropped as malformed, which would erase the very record the refusal needs.
   */
  effectClass?: string;
  /**
   * The host's replay policy basis at record time (`WorkflowHost.replayBasis`).
   * A resume only reuses an agent entry, or replays a node read, recorded under
   * the SAME basis, which is how a changed host policy — model pin, permission
   * mode, tools, roles, grants, workspace, provider manifest — declines the
   * cache. The legacy host records none and matches entries that carry none,
   * so its journals stay byte-identical.
   */
  basis?: string;
  /**
   * The producer's own reference(s) for a journaled effect, when its result
   * named one (docs/workbench/08 "record ... native refs"). A reference, never
   * the answer: it is what a later reconciliation can bind native evidence to.
   * Recorded only for non-read entries, whose answers are deliberately not kept.
   */
  nativeRefs?: readonly NativeRef[];
  /**
   * Marks a node row written BEFORE its provider was called (`kind: "node"`
   * only), so a kill between the effect and its settled row still leaves a
   * row a resume refuses on. The settled row at the same position supersedes
   * it. The marker, not `ok`, is what the row says: `ok` is false because no
   * result had returned when it was written, never because the call failed.
   * Written for non-read effect classes and unclassified calls; never for a
   * read, so read-only journals are byte-identical to the pre-marker shape.
   */
  dispatched?: true;
  /**
   * The operator's recorded decision, on `kind: "acknowledge" | "override"`
   * rows only. The record binds to its node row by digest (reconcile.ts), and
   * a row whose record does not validate drops like any mangled line, so an
   * old binary keeps refusing and a resume never half-reads a decision.
   */
  reconcile?: ReconcileRecord;
}

/**
 * The fields that decide what an agent does.
 *
 * Deliberately not the whole payload: `phaseIndex` and `phaseTitle` move the
 * row around in the progress tree without changing a single token the agent
 * sees, so re-grouping phases should not throw away an hour of results.
 */
export interface JournalKeyInput {
  prompt: string;
  label?: string;
  model?: string;
  agentType?: string;
  effort?: string;
  isolation?: string;
  gate?: string;
  resume?: string;
  /** Serialized `agent({ schema })`, when the call asked for one. */
  schema?: string;
}

/** Stable hash of a call's payload. Field order is fixed here, not by the caller. */
export function journalKey(input: JournalKeyInput): string {
  const canonical = JSON.stringify([
    input.prompt,
    input.label ?? null,
    input.model ?? null,
    input.agentType ?? null,
    input.effort ?? null,
    input.isolation ?? null,
    input.gate ?? null,
    input.resume ?? null,
    // Appended only when present, which looks like a hack and is not: adding a
    // ninth slot unconditionally would change the canonical form of every entry
    // and invalidate every journal already on disk. Conditional, a schema-less
    // call keys exactly as it always did, and adding or changing a schema still
    // produces a different key.
    ...(input.schema !== undefined ? [input.schema] : []),
  ]);
  return createHash("sha256").update(canonical).digest("hex").slice(0, 32);
}

/**
 * Stable hash of what decides a node call: the capability and its input.
 *
 * Separate from {@link journalKey}, and salted with a kind tag, so an agent
 * and a node can never collide into each other's cache. `label` and phase are
 * display-only, exactly as they are for agents, and deliberately not part of
 * it.
 */
export function nodeJournalKey(capabilityId: string, inputJson: string): string {
  return createHash("sha256")
    .update(JSON.stringify(["node", capabilityId, inputJson]))
    .digest("hex")
    .slice(0, 32);
}

/**
 * Read a journal file into position order.
 *
 * Never throws: a missing, truncated or hand-mangled journal means "nothing to
 * replay", which costs tokens. Refusing to run would cost the whole run.
 * A partial last line is normal — the file is appended to while agents settle.
 */
export function readJournal(path: string): WorkflowJournalEntry[] {
  let raw: string;
  try {
    raw = readFileSync(path, "utf-8");
  } catch {
    return [];
  }

  const entries: WorkflowJournalEntry[] = [];
  for (const line of raw.split("\n")) {
    if (line.trim() === "") continue;
    try {
      const parsed = JSON.parse(line) as unknown;
      if (!isEntry(parsed)) continue;
      entries.push(parsed);
    } catch {
      // A half-written final line, or someone editing the file. Skipping it
      // keeps what came before, and a shorter prefix is still a useful one.
    }
  }
  entries.sort((a, b) => a.index - b.index);
  return entries;
}

/**
 * Append one row, reporting whether it reached the file. Never throws: what a
 * lost row costs is the caller's call. For agents and node reads, failure to
 * write is not failure to run; for a non-read node's dispatched marker it is a
 * refusal, decided in runtime.ts (see the header above).
 */
export function appendJournal(path: string, entry: WorkflowJournalEntry): boolean {
  try {
    appendFileSync(path, `${JSON.stringify(entry)}\n`, "utf-8");
    return true;
  } catch {
    return false;
  }
}

function isNativeRef(value: unknown): value is NativeRef {
  if (typeof value !== "object" || value === null) return false;
  const ref = value as Record<string, unknown>;
  return typeof ref.provider === "string" && typeof ref.type === "string" && typeof ref.id === "string" &&
    (ref.scope === undefined || typeof ref.scope === "string");
}

function isEntry(value: unknown): value is WorkflowJournalEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    Number.isInteger(entry.index) &&
    (entry.index as number) >= 0 &&
    typeof entry.key === "string" &&
    typeof entry.ok === "boolean" &&
    (entry.text === undefined || typeof entry.text === "string") &&
    (entry.resumed === undefined || entry.resumed === true) &&
    (entry.kind === undefined ||
      entry.kind === "node" ||
      entry.kind === "acknowledge" ||
      entry.kind === "override") &&
    (entry.capabilityId === undefined || typeof entry.capabilityId === "string") &&
    (entry.effectClass === undefined || typeof entry.effectClass === "string") &&
    (entry.basis === undefined || typeof entry.basis === "string") &&
    (entry.nativeRefs === undefined || (Array.isArray(entry.nativeRefs) && entry.nativeRefs.every(isNativeRef))) &&
    // The dispatch marker means something only on a node row; anything but a
    // literal true, or a marker on any other kind, is as mangled as a bad field.
    (entry.dispatched === undefined || (entry.dispatched === true && entry.kind === "node")) &&
    // A node entry that cannot name its capability cannot name a producer to
    // reconcile with, so it is as unusable as any other mangled line.
    (entry.kind !== "node" || typeof entry.capabilityId === "string") &&
    // An operator decision row must carry a record that validates and that
    // mirrors its own top-level fields; anything else drops like a mangled
    // line, so a resume refuses rather than honour a half-written decision.
    (entry.reconcile === undefined
      ? entry.kind !== "acknowledge" && entry.kind !== "override"
      : (entry.kind === "acknowledge" || entry.kind === "override") &&
        typeof entry.capabilityId === "string" &&
        isReconcileRecord(entry.reconcile) &&
        entry.reconcile.decision === entry.kind &&
        entry.reconcile.entry.index === entry.index &&
        entry.reconcile.entry.key === entry.key)
  );
}
