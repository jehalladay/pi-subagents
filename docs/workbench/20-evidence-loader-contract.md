# 20 — EvidenceLoader contract (workbench.evidence-loader/v1)

Host-side, grant-gated, bounded, lazy resolution of an observed node's evidence references for the inspector details view. Design verified against the current sources; implementation is bead wb-g1g.1 (inspector slice) plus a parent wiring slice.

## Types

New module `src/workbench/evidence-loader.ts` exporting `EVIDENCE_CONTRACT = "workbench.evidence-loader/v1"`.

`EvidenceRequest`: `{scope: ObservationScope; nativeRef: NativeRef; evidenceRef: string; maxBytes: number; signal: AbortSignal}`. The host binds scope and grants, never the UI. `nativeRef` is required because evidence ref strings are not globally namespaced; producer routing keys off `nativeRef.provider` first, with `canLoad(evidenceRef)` as a shape check inside that producer only.

`EvidenceContent`: `{kind; provider; capturedAt; bytes; truncated; preview: readonly string[]; sourceBasis?; freshness: "current"|"stale"; producerReceipt?}`. `EvidenceEntry` is `not-requested | loading | loaded & EvidenceContent | {state:"unavailable"; reason; freshness?}` with reasons `no-loader | unauthorized | transport | timeout | too-large`. Only `loaded` ever carries preview text. `truncated` is always visibly marked in the preview. `sourceBasis` accepts digest-shaped values only.

`EvidenceLoader`: `{provider; requiredGrant; canLoad(ref); load(request): Promise<EvidenceContent>}`. Grant gating is exact-string and purely live: a loader is built for every supplied reader, and the exact-grant check every `load` runs against the live grant set is the only authorization decision, so missing and revoked grants are indistinguishable (both refuse with `unauthorized`) and a grant that appears after construction authorizes the next load.

`EvidenceStore`: synchronous `get`, idempotent `request`, `abort`, `abortAll`; options `{loaders; maxEntries; maxBytes; timeoutMs}`. Cache keys are producer-qualified like the projection's own `keyOf` (scope + full nativeRef + ref) so same-scope cross-producer ref strings cannot collide. Scope mismatch refuses before any loader runs. Timeouts race a per-request abort. Loader errors map by CapabilityError category; raw error text never enters an entry. Every preview entry is redacted whole, exactly once, by the shared helper's `lines` layout before the store splits it into rows or cuts it to the byte budget, so a credential whose scheme or key and value straddle a line break stays one credential (wb-ktf); a loader therefore hands each producer text whole, never pre-split. Every row then passes the terminal sanitizer; raw payloads are never retained. Abort paths stop only the local read; no projection method and no producer control verb is ever called from the store.

## Producer mapping

| Producer | Ref | Resolution | Grant |
|---|---|---|---|
| claude-agent-sdk session | `claude-message:<uuid>` | bounded transcript read, select the row by uuid; a ref outside the bounded window is transport, never fabricated | `claude:transcript` (new) |
| furnace run | native Attempt id listed on the owning run node | the observer's bounded logs read with its run/attempt/stream identity checks; lossy, incomplete or paged reads are loaded with truncated true; an attempt belonging to another run is unauthorized | `furnace:inspect` |
| forge operation | `forge-operation:<operation_id>` | re-read through the registered read capability; a failed or partial domain verdict is a legitimate loaded result rendered as its own status, never "verified" | `forge:inspect` |
| anything else | — | `unavailable: no-loader`, a visible unknown | — |

## Refusal and freshness rules

Unknown producer or ref kind: no-loader, ref stays listed sanitized. Scope mismatch or missing/revoked exact grant: unauthorized. Stale or disconnected owning nodes label loaded evidence stale; a failed read against a disconnected source is transport plus stale. A loaded entry never upgrades projection freshness and never changes node status text or tone. Transport success never implies verification.

## UI integration

Mirrors the lazy transcript pattern: the inspector details view renders per-ref state from a synchronous `store.get`; Enter on a selected ref emits a `load-evidence` action the dialog wires to `store.request`; `e` inside details advances the evidence selection; j/k reset it. `not-requested` renders as "not loaded (Enter)", never optimistic loading. Dialog close calls `abortAll` and never cancels the workflow. With no store supplied the details view renders byte-identical to today.

## Owner rulings on the design conflicts

1. `loaded` equals the full `EvidenceContent` (kind, sourceBasis, freshness included).
2. The double redaction in the sanitizer order is deliberate. A second pass is idempotent or over-redacts only, never a leak: a marker an earlier pass left as an assignment's whole value stays as it is when only closing brackets and a value end follow it, and any other change a second pass makes hides more text and shows none (wb-3l3).
3. Loaders take the full request, not a bare ref; routing is provider-first.
4. Cache keys are producer-qualified, matching the projection.
5. Forge nodes will emit `forge-operation:<operation_id>` evidence refs from native-evidence shaping (parent slice); the loader also accepts synthesis from the owning ref until then. The parent slice implemented this: `forge.gate.status` shaping now emits `forge-operation:<operation_id>` whenever the native payload carries a validated operation id.
6. A new `claude:transcript` grant gates the loader, and the existing `c` transcript path adopts the same grant in the parent slice so the two paths cannot diverge. The parent slice implemented the grant: the host transcript path now refuses with a typed permission message unless `claude:transcript` is granted.
7. The `e`/`enter` reducer deltas inside the details view are accepted behavior changes.
8. Zero-width characters are stripped in the loader's own preview pass; the acceptance wording is width-boundedness.
9. Store-level default budgets with per-request overrides.
10. Until the parent wires `load-evidence`, Enter renders the inert not-loaded hint.
