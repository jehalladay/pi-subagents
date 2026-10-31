# wb-l4q7: o4h0.1 census F1-F3 follow-up: aliased payload-only dedupe survives (P10/P10c), pin-level CT6 self-anchoring (B5/C4/Q2), self-anchored field universe - red-first cures

## 2026-10-24 the cache-key census pin set and additive-slice fields, anchored outside the census (wb-o4h0.1 gate F2 and F3)

- What binds here: test/workbench-rf-observation-cache-key.test.ts (the wb-o4h0.1 census) reads the two tables below through the shared docs reader of test/helpers/census.ts (docsSection and sectionTables). The census refuses this receipt unless each table is the only block of its section, the section holds no HTML and the header row reads as below.
- Judged pins: the judged-set case of the census holds every row's pins, row by row and in order, to the first table, so a pin removed from ROWS, the frozen shape literal, IMPL and the roster together still stands here and the census reds (the wb-o4h0.1 gate's F2). The table names the 24 pins this cut leaves: rows A (8), B (8, B8 new), C (5), D (1) and Q (2).
- Additive-slice fields: case C1 holds the fields of the five additive slices the census authors (failure 6, diagnostic 6, observed 5, view 6, engine 6), in census order, to the second table (the gate's F3). The 64 full-shape fields stay held to the shared full-shape fixture, the captured result roster and the src key constants. C1 now also holds the ok-diagnostic slice's fields to the observer's DIAGNOSTIC_KEYS, as it already held the failure slice's.
- Producer read for the engine slice, one read of the installed reactivefibercli 0.1.836 (dist-info METADATA Version 0.1.836) on this host: definitions/tsx_pins.py engine_version_entries (def :492, the returned mapping :511-520) writes tsx_runtime and tsx_sdk each as exactly distribution_version and contract_fingerprint, and domain/versions.py _engine_entries (def :1495) refuses any other member set (:1505) before it stores them (:1517). Each file has the sha256 its distribution's RECORD lists: tsx_pins.py 947c67a88099fbf8e549378e29b24a2aee6fc6b5027c9f3577392003916527d3, versions.py a9a5e6f2bd611ba2f14a42465a4aeaed38da64c0a3ce614acb680535b8086d13. So the note member the census gives both engine entries is planted there as an unread member, not a field the producer writes; its two rows (omitted, J-ENGINE-AUX) stand for any unread engine-entry member. The unread members of the observed and view slices (binding_ref, contract_digest) were not checked against the emitter by this cut.
- F1: new case B8 refreshes two readings with one payload under two operation ids into one cache and holds that both stay rows in stored, window(), query() by scope, query() by invocation and the graph view built on the window (the wb-o4h0.1 gate's F1). The census header's backstop sentence for R-ALIASED-PAYLOAD now names exactly those paths and B2's per-plane hash-site roster.
- Red first, measured on base faac2e8 over the 24 cases of the census with the wb-o4h0.1 gate's own plants and members (each applied in place or to a throwaway copy and restored byte-identical): P10, an aliased payload dedupe in window(), read 0 failed; P10c, the same in query(), 0 failed; L2-CT6-B5, L2-CT6-C4 and L2-CT6-Q2 0 failed of 23 each; L2-field-engine-note 0 failed. Before this file and the new roster pin existed the cut read 3 failed of 25 (the judged-set case and C1 on the absent receipt, B8 on its absent roster pin).
- Non-claims: this cut changes no src file and no shared helper or fixture beyond the census roster; TRACEABILITY.md is frozen and untouched. The producer read above is one read of one installed distribution on one host.

### Judged pins, wb-l4q7 cut 1

| Row | Pin |
| --- | --- |
| A | A1 |
| A | A2 |
| A | A3 |
| A | A4 |
| A | A5 |
| A | A6 |
| A | A7 |
| A | A8 |
| B | B1 |
| B | B2 |
| B | B3 |
| B | B4 |
| B | B5 |
| B | B6 |
| B | B7 |
| B | B8 |
| C | C1 |
| C | C2 |
| C | C3 |
| C | C4 |
| C | C5 |
| D | D1 |
| Q | Q1 |
| Q | Q2 |

### Additive-slice fields, wb-l4q7 cut 1

| Base | Field |
| --- | --- |
| failure | diagnostics[].code |
| failure | diagnostics[].severity |
| failure | diagnostics[].message |
| failure | diagnostics[].hint |
| failure | diagnostics[].source |
| failure | diagnostics[].metadata |
| diagnostic | diagnostics[].code |
| diagnostic | diagnostics[].severity |
| diagnostic | diagnostics[].message |
| diagnostic | diagnostics[].hint |
| diagnostic | diagnostics[].source |
| diagnostic | diagnostics[].metadata |
| observed | result.observations[].status |
| observed | result.observations[].freshness |
| observed | result.observations[].replayed |
| observed | result.observations[].degraded |
| observed | result.observations[].binding_ref |
| view | result.view_id |
| view | result.view_contract.view_id |
| view | result.view_contract.satisfied |
| view | result.view_contract.degraded |
| view | result.view_contract.failures |
| view | result.view_contract.contract_digest |
| engine | result.provenance.sdk_versions.tsx_runtime.distribution_version |
| engine | result.provenance.sdk_versions.tsx_runtime.contract_fingerprint |
| engine | result.provenance.sdk_versions.tsx_runtime.note |
| engine | result.provenance.sdk_versions.tsx_sdk.distribution_version |
| engine | result.provenance.sdk_versions.tsx_sdk.contract_fingerprint |
| engine | result.provenance.sdk_versions.tsx_sdk.note |
