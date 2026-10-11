# 10 — Terminal-native rich workflow inspector, interaction and performance

## Design goals

Use Pi's existing @earendil-works/pi-tui Component rendering, overlays, themes, width utilities and terminal line diff. No browser, sixel, terminal bitmaps, JS DOM, web server, or dependence on mouse support. An SSH session at 80x24 must be usable. Pi model consumes structured observation queries separately from the human screen.

## Existing implementation to reuse

- src/ui/workflow-card.ts — pure compact card layout, Unicode/ASCII tiers, width-aware segments.
- src/ui/workflow-dialog.ts — pure layoutWorkflowDialog + handleWorkflowDialogKey, two-pane phases/agents, component adapter and 80ms spinner.
- src/ui/conversation-viewer.ts — lazy Markdown caching and viewport clipping for Pi sessions.
- src/ui/fleet-list.ts — workflow row selection and stable editor input ownership.
- src/workflow/progress.ts — append-only event entries + collapse and phase grouping.

Preserve existing key behavior and workflow run access where possible; introduce Workbench views without breaking upstream non-workflow Pi agent screens. Route Claude sessions to a *new* transcript adapter rather than passing a nonexistent Pi session.

## Four views

**Overview:** header (name, identity, native owner, freshness), status and counts, compact nested tree, active operations, attention panel and top measured bottlenecks. Critical path must be shown as *partial/estimated* when relationships/times incomplete.

**Graph:** navigable DAG-ish projection, explicit dependency arrows, fan-out collapsing, cross-provider nodes, nested workflows. Cycles/unknown dynamic edges represented explicitly as "references" rather than rendered as a fake acyclic plan. Re-layout only changed neighborhood or viewport, not the complete graph for every event.

**Timeline:** relative interval lanes grouped by owner/phase/provider, zoom and horizontal pan, observed waiting/executing/blocked periods and concurrency. Never infer exact timing from text or assume clocks agree; note uncertain clocks or event gaps.

**Details:** selected operation's source path/line, native reference, status axes, evidence, upstream/downstream, Claude transcript and tools, Forge basis/verdict, Furnace Run/Work/Attempt, HX coverage, RF context and provenance. Large content loaded only on focus.

## Proposed compact example

    ╭─ package-improvement ────────────────────────────────────╮
    │ RUNNING · observed 2s ago · 18/24 done · 6 active       │
    │ Agents: 8/12 · tokens: 243k · elapsed: 02:41             │
    ├─ WORKFLOW ───────────────────────────────────────────────┤
    │ ✓ Scope -> ✓ Context -> [◌ Implement A | ◌ Implement B]│
    │                        └─ ◌ Forge Verify -> ○ Publish  │
    ├─ ACTIVE ─────────────────────────────────────────────────┤
    │ ◌ Forge verify  7/10 gates  01:12                      │
    │ ◌ Claude B      editing parser   00:48                 │
    ├─ ATTENTION ──────────────────────────────────────────────┤
    │ ! 2 observers waiting on shared artifact (observed)    │
    ╰──────────────────────────────────────────────────────────╯

For ASCII: +-|>, * running, x failed, ? unknown. Color is redundant to glyph/text. Theme colors are not unique carrier of critical status. No flashing animation.

## Layout responsiveness

- <80 columns or <20 rows: single-column compact tree; details as subview, no side-by-side graph.
- 80–119: two-pane tree + details or timeline summary; scrollable pane cap.
- >=120: left hierarchy, center graph/timeline, right details when viable; cap width and height.
- Resize preserves node selection, focus and scroll intent where possible. Unicode visibleWidth always used; guard wide CJK, combining emoji, ANSI codes, zero-width characters.

## Navigation

/ workbench command (proposed /workflows, retain upstream menu), j/k or arrow move; Enter expands; Tab cycles views; / filters; f focuses subtree; c opens Claude transcript; e evidence; s source; Space toggles follow; Esc closes or steps back. Avoid hijacking Pi prompt input while editor owns keyboard. Mutating commands on separate explicit controls require confirmation and per-provider authorization. Closing view never stops workflow.

## Rendering pipeline

    native events -> per-provider reducer -> stable projection indexes
                  -> visible node selector -> cached layout + segments
                  -> Pi TUI styled lines -> terminal line diff

- Event burst coalescing (e.g. <=4 ordinary updates/s while active), not every token update.
- Seconds-only clock tick <=1Hz and only for visible running rows.
- No 80ms whole-dialog refresh under large-workload mode.
- Pure layout and keyboard reducers are unit-tested without a TTY.
- Avoid O(allHistory) collapse per frame; maintain by-node last projection and ancestor aggregates incrementally.
- Virtualized visible rows + modest overscan; expensive Markdown syntax parsing only for selected transcript slice.
- Graph layout cached by topology revision; no force-directed re-layout in render method. For large graphs show aggregate supernodes first.
- Bound memory: store highlights/current snapshots; stream older event/traces lazily.
- Pi observation tools paginate/filter/limit and return compact JSON, never rendered ANSI.

## Scalability targets (proposed, not measured)

Benchmark >=1000 visible-reachable operations and >=100k synthetic event updates. Typical viewport 30–100 rows; layout/nav calculation target <=20ms on benchmark host and memory bounded by active projection rather than accumulating full prompt bodies. 10k+ grouped operations P2. Record wall time, p50/p95 UI compute, max allocation, file IO and resize metrics; don't declare targets met without measured runs.

## Failure and deception defenses

STALLED vs WAITING vs STALE vs UNKNOWN must not be confused. Spinner should not imply work progressed. Node result with missing evidence is not marked verified merely because process exited 0. Cancel controls unavailable for observers without lifecycle authority. Historical reads with limited retention show missing details honestly.