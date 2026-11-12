# wb-y0n6: [MNI-2026-11-09 P02] Installed producer descriptor/package admission, external consumer (EAT-R217..R226)

## 2026-11-11 receipt: package admission (schema files pinned by bytes) and the duplicate-member refusal at V1 against a fixture host; installed-consumer leg explicitly partial (machine seat ws-08, base ce180d82)

- Surface: `src/workbench/mechanical-descriptor.ts` (the wb-ocie descriptor boundary, now with the package admission), `test/workbench-mechanical-package.test.ts` (new suite, 27 cases), and `test/workbench-mechanical-descriptor.test.ts` (R007-20 re-pinned, the reason list). Requirements: EAT-R217 to EAT-R226 of `docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/ATOMIC-REQUIREMENTS.md` at pi-subagents `18b016b2` (program packet P02 of `docs/programs/mechanical-native-interoperability-2026-11-09/02-IMPLEMENTATION-PACKAGES.md` at master `b085c34e`). Owner: Pi; the producer deliveries it waits on (MechanicalWorkflows M01, the installed host) are MechanicalWorkflows-owned.
- What changed.
  - Duplicate member names. The boundary's step 3 now refuses a descriptor text in which one object names a member twice, the names compared after JSON string decoding, as `member-duplicate` at field `descriptor`. It is judged after the digest and the parse and before every member check. This cures R-DUPLICATE-MEMBER, the wb-ocie header's one named residual: before, `JSON.parse` kept the last copy, so `status` written `invocable` then `descriptor-only` was admitted. R007-20, its former quiet row, now pins both orders refused. The closed reason list gains `member-duplicate` (nineteen reasons).
  - Package admission. `resolveMechanicalPackage`, `loadMechanicalPackage` and `admitMechanicalPackage` add the producer's two schema files to the entrypoint's ten steps. A schema pin (two `sha256:` digests) is judged first. The entrypoint's steps then run unchanged. Each schema file is then read by the reviewed entry's schema name (never a descriptor string) inside the host's schema directory. Its realpath must lie inside the approved root, it must be a regular file (judged before any open, so a FIFO never blocks), and its bytes' SHA-256 must equal the pin. At load, the artifact is measured again first, then each schema file (its realpath compared with the one recorded at validation), and only then does the host loader run, once. Every refusal comes with no loader call and uses the existing closed vocabulary (`inputSchema` / `outputSchema` with `unreadable`, `outside-root`, `not-a-file`, `digest-mismatch`, `changed`).
- Claimed at V1, against stand-in schema files pinned by their own bytes (each by case id in `test/workbench-mechanical-package.test.ts`):
  - EAT-R217 AC2: an absent schema file or directory (R217-2), a changed schema byte or swapped files (R217-3) and a wrong ref (R217-4) refuse before import; positive control R217-1. AC3: a stale pin over a producer file changed by one byte refuses (R217-5).
  - EAT-R219 AC2: the duplicate JSON key (R219-2 to R219-6, R219-8; quiet rows R219-1, R219-7). The other AC2 forms are the landed wb-ocie cases R007-6, R007-7, R007-11, R009-2 and R009-8. AC3: the permissive-parse mutant M1 below is killed.
  - EAT-R222 AC1 to AC3 for the two schema files: a link or a directory link resolving outside the root, a directory and a FIFO refuse; a link inside the root is admitted (R222-1, R222-2). Bytes flipped, a link re-pointed or a FIFO swapped in between validation and load refuse with zero loads (R222-3 to R222-5). Also pinned: the load order and minting (R222-6). The artifact's forms are the landed R011 cases.
  - EAT-R224 AC1 and AC2: two admissions run together are both admitted, each with its own root's artifact (R224-1). A changed schema byte or a re-pointed schema link in one refuses that one only; the shared loader runs once, for the other (R224-2, R224-3).
  - The pinned reader set itself: R-SET-1, the suite's last case, freezes the case set by requirement, case and criterion. It requires the module header's step 3 and PACKAGE ADMISSION section, read from src, to cite exactly the suite's R217, R219, R222 and R224 cases, so a case deleted, renamed or added, or a citation dropped or swapped, reds it.
  - EAT-R225 AC3: with the production contract unadopted, a request whose caller policy and input name the candidate spelling `mechanical:develop-write`, held by the host beside `workbench:execute` and `workbench:detach`, refuses at entry as `function-action-unadopted`, with zero dispatches in each host mode (R225-3).
- Explicitly partial, NOT CLAIMED (external remainder; closure gates MW-INSTALLED-HOST and PI-MECHANICAL-ARTIFACT):
  - EAT-R217 AC1 (a fresh external consumer outside both repositories, and the producer release manifest), EAT-R220 (exact tarball bytes of packed artifacts) and EAT-R221 AC1 and AC2 (the installed public host subpath). These need MechanicalWorkflows M01 and the jointly ratified layout.
  - EAT-R221 AC3 (a host API version). The `mechanical.pi-host/v1` binding is a proposal (P00, wb-w8fk).
  - EAT-R218 (the saved function-definition digest). The registered `workflow_execute` refuses every function definition before its source is read; that is P04, wb-4bxo.
  - EAT-R223 (import authority at the registered tool's input schema; V3, P04).
  - Every acceptance criterion's registered-path oracle PI-FUNCTION-REGISTERED (EAT-R217 AC4, EAT-R219 AC4, EAT-R222 AC4, EAT-R224 AC3, EAT-R225 AC4, EAT-R226 AC3). P04 (wb-4bxo) and P08 (wb-xr1z) carry these.
  - EAT-R225 AC1 and AC2 (the landed wb-201v rows pin them for fixture spellings; no spelling is adopted).
  - EAT-R226. Its AC1 and the embedded half of its AC2 are the landed registered-tool rows of `test/workbench-function-authority.test.ts` ("with hostMode %s and %j held, a function definition refuses as %s"). The detached positive control needs P04 and the optional P11.
  - Also not claimed: that the stand-in schema files are the producer's own; the descriptor path's containment; and writer and Forge calls (this module makes none).
- Red at base `ce180d82`: `test/workbench-mechanical-package.test.ts` Tests 23 failed | 2 passed (25). 16 rows failed because the package admission was absent, 6 duplicate rows read admitted, and the reason list lacked `member-duplicate`. The two quiet controls passed by design.
- Mutants (each on a throwaway copy, both suites run; 10 planted, 10 killed, 0 survived):
  - M1 permissive parse (the duplicate check removed, EAT-R219 AC3): 8 red.
  - M2 raw name compare: 1 red (R219-5).
  - M3 one name set for every object: 1 red (R219-7).
  - M4 no schema containment: 2 red.
  - M5 no load-time schema re-measure: 4 red.
  - M6 no realpath comparison at load: 2 red.
  - M7 open before stat: 3 red (R011-12, R222-2, R222-5).
  - M8 no schema pin check: 1 red (R217-6).
  - M9 schema digest unchecked: 4 red.
  - M10 output schema skipped: 9 red.
- CT-BATTERY v2 over R-SET-1 (each member on a throwaway copy): CT1 red=1; CT1b red=1; CT2 red=1; CT3 red=1; CT4 red=1; CT5 red=1; CT6 NA:census carries a single literal. CT5 deletes a case together with its literal entry and is killed through the src header's citations, outside the census literal.
- Display paths added: none (closed-vocabulary diagnostics only).
