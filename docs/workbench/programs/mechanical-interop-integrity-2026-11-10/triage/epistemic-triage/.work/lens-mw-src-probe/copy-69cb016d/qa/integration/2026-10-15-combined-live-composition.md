# Combined composition with a real HyperUnix read (fail-closed)

`developWithNativeEvidence()` ran once on the clean scratch package at
`ce0657cb7437…` with real product callbacks wired for every stage: a real
`hx dependencies --depth 1` read (through the bounded dependency adapter), the
real ReactiveFiber renderer, and real agent/Forge callbacks behind them. The
live HyperUnix answer returned frames with incomplete result coverage and no
native query digest, so the adapter reported `partial` with the seed file and
**no** evidence ref rather than inventing one. The composition returned
`needs_evidence` / `SCOPE_INCOMPLETE` and made zero RF, agent or Forge calls.

Evidence: `evidence/2026-10-15-combined-live-composition.json`, checked by the
root `evidence` step. This witnesses the WP-G wiring discipline — real HX in
front of RF, agent and Forge with an honest stop — not a complete task-scoped
journey; that remains blocked on the upstream HyperUnix pinned task-scope gap
(feedback `aff862b06b53`, merged to HX main). The full RF→agent→Forge PASS
journey is recorded separately in `2026-10-15-native-hx-rf-observations.md`
and `evidence/2026-10-15-live-rf-claude-forge-verified.json`.
