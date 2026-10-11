# 09 — Observation, telemetry, provenance and derived graph

## Observer mandate

Pi must inspect work launched by this extension **and** native work launched independently (e.g. a Furnace Run created by bead machines). Observer uses supported public APIs and native references; never asserts control authority or completeness merely from discovering a parent reference.

## Two-layer storage model

1. Native producer remains the source of truth for execution state, evidence, mutable artifacts and errors.
2. Workbench materializes a bounded, rebuildable *read projection* for UI and Pi tool queries. It can cache snapshots/events with source/provenance, but is not a second authoritative Run/Work/Attempt or a global DB mandatory for execution.

## Observation event envelope (proposal)

    interface ObservationEnvelope {
      projectionEventId: string;
      source: { provider: string; sdkVersion?: string; nativeRef: string };
      sourceSequence?: string | number;
      sourceTimestamp?: string;
      observedAt: string;
      kind: string;
      nativeState?: unknown;
      subjectBasis?: string;
      definitionDigest?: string;
      trace?: {
        invocationId?: string;
        parentSpan?: string;
        spanId?: string;
        correlationIds?: Record<string,string>;
      };
      evidenceRefs?: string[];
      payloadRef?: string;  // large/sensitive content stored separately
    }

This envelope is for telemetry transport, not the authoritative native domain state. A source event may be duplicated, late, missing, unordered relative to another provider, or entirely unavailable. SourceTimestamp does not establish a total order across providers.

## Reader adapters

Every supported provider offers at least a read-current-snapshot function where its SDK supports it. Streaming observer optional:
- Claude: SDK message events from sessions controlled by Workbench; external Claude sessions may be unobservable unless records are available.
- Furnace: native Run status/event stream and possible descendant references.
- Forge: native operation/verdict/artifact evidence, build revision and gate axes.
- HX: query coverage/bounds/query basis, and optional graph traversal of linked native refs.
- RF: render context provenance and context artifact references.
- MechanicalWorkflows: invocation outcome, service spans if instrumented; arbitrary plain TypeScript calls are not magically discoverable.
- Beads: supported work readiness and linkage, never reconstructed from heuristics alone.

Reader adapter returns snapshot {nativeRef, capturedAt, observedAt, sourceRevision?, coverage?, nativePayloadRef} and optional change stream with cursor. Poll only where streaming unsupported, with explicit rate/budget. Handle stream reconnect and cursor gaps as stale/unknown until refreshed.

## Derived view indexes

Maintain:
- byNative(provider,ref) -> projection node
- byInvocation -> correlated operations
- byParent, byDependency, bySourceBasis -> child lists and reverse lookup
- byStatusKind -> compact counts
- byTime -> interval index for timeline
- byEvidence -> evidence jump targets
- byVersion -> comparison cohorts

Use stable keys by provider+native identity, but allow local temporary ID before native assignment; rekey safely and preserve selection. Coalesce same-node repeated updates; do not rebuild entire history on each render.

## Relationships are typed and provenanced

At minimum differentiate:
- declared dependency (from source/policy)
- observed causal edge (tool call to native result)
- lifecycle ownership (only if native producer confirms)
- grouping only (phase, display scope)
- inferred possible relationship (hypothesis; never treated as authoritative)

Store edge provenance with timestamp and source; Graph view styles each differently. Missing edges do not imply independence. Shared nodes may have multiple causal readers without one cancellation owner.

## Freshness and ambiguity

Each projection node includes lastConfirmedAt, observedAt, sourceConnectionState, sourceCursor and completeness label. UI shows STALE/UNKNOWN visibly. A disconnected Furnace event stream must not make a previously RUNNING node permanently authoritative RUNNING; it becomes last-known-running + stale. Pi tool summaries must communicate that nuance.

## Aggregates and profiling

Counts, direct child completion, token usage, elapsed intervals, concurrency, run cost where actual data exists, critical path, wait time, retries, build/cache outcomes. Distinguish measured actual from estimated projected metrics. If dependencies or interval bounds are missing, suppress precise critical path claims and show "incomplete trace". Derive latency decomposition only with valid source intervals. Compute bounded historical comparisons by revision/basis/config cohort.

## Data retention and privacy

Short hot window in memory (configurable); optional local/private disk cache for diagnostics and reattachment. Avoid raw prompts/tool bodies by default; store reference/short redacted preview, encrypt where required by deployment. Providers own transcript/artifact retention; UI fetches full text lazily subject to permission. Tenant/workspace boundaries apply at correlation queries, not just at individual SDK calls.

## Acceptance/negative controls

1. Attach by Furnace Run ID to independently created run without assuming parent ownership.
2. Replay duplicate/out-of-order events; no double count or status regression.
3. Disconnect mid-stream; show freshness stale and reconcile through snapshot after reconnect.
4. Two native sources reuse an identifier; provider-qualified keys do not collide.
5. Simulated missing relation; no fabricated dependency edge or precise critical path.
6. Native "partial" HX coverage never becomes "known empty".
7. A true Forge failed gate remains failed despite transport success.
8. Closing observer causes zero cancellation calls.
9. 100k-event benchmark proves incremental projection/viewport, not full-fold in render.
10. Large/secret payload does not leak into Pi tool result or screen by default.