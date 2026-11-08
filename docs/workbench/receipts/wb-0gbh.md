# wb-0gbh: [MWI-coordination] Invoke one pinned pure coordination export without effect authority

## 2026-11-08 receipt: the pure coordination boundary, fixture legs only, the installed-consumer leg explicitly partial (machine seat ws-09, base 932ee8f)

- Requirements: EAT-R071 ("Pi MUST invoke only the published pure coordination schema and export") and EAT-R072 ("Pi MUST treat a coordination proposal as observation until separately authorized") of the program's `triage/requirements/ATOMIC-REQUIREMENTS.md` at pi-subagents master `0b25e14e` (slice PI-7; BEAD-PLAN B-coordination, "no — gated PI-COORDINATION-INSTALLED (MW-COORDINATION)"). Owner: Pi. The producer delivery it waits on (MW-COORDINATION, EAT-R093) is owned by MechanicalWorkflows.
- Surface: `src/workbench/mechanical-coordination.ts` is the boundary and `test/workbench-mechanical-coordination.test.ts` the suite. The fixtures are MechanicalWorkflows files vendored byte-identical with read-only `git show` at MechanicalWorkflows origin/main `469ee2e5`:
  - `test/fixtures/mw-coordination-reconcile-entrypoint-v1.json`, from `contracts/entrypoints/coordination-reconcile.v1.json` (blob `566d6e76`);
  - `test/fixtures/mw-coordination-resolver-input-v1.schema.json` (blob `64298c50`);
  - `test/fixtures/mw-coordination-resolution-v1.schema.json` (blob `0066df7e`).

  Suite case C-1 holds each file to its SHA-256 and git blob id. No existing source, test or doc file is edited.
- What the boundary does. This bullet summarizes the module header. The header states each step with the suite cases that pin it, in the enumerated form: each step claims exactly the forms its cases plant, and a form no case plants is NOT CLAIMED, whatever this summary's wording seems to cover.
  - `invokeMechanicalCoordination` reads the host's grants once and requires `workbench:coordinate`. That is a separate read-only grant: `workbench:execute`, the blanket write grant, confers nothing here.
  - It checks the artifact pin, one `sha256:` digest.
  - It reads the producer's descriptor and its two published schema files from the host's paths. It refuses any file whose bytes are not the reviewed ones, by SHA-256 against `MECHANICAL_COORDINATION_REVIEWED_DIGESTS`. A descriptor naming another export therefore refuses before anything is loaded.
  - The input must be serialized data that is valid against the input schema it read.
  - The artifact file's digest must equal the pin. The boundary then calls the host loader once and reads the reviewed `reconcile` export as an own data property. It calls the export once, with a copy of the input.
  - The result must be serialized data that is valid against the output schema, and it must echo the input's basis and budget.
  - The result is returned as a frozen `observation-only` observation.

  The module spells none of the producer's schema vocabulary; the published files supply it at run time.
- Observation, never authority (EAT-R072). In X-NO-EFFECT the resolution admits a Beads close, a Forge publish and a Furnace start, and all three come back as data. The host also holds a provider handle for each action and every exact effect grant, and no provider handle is called. The module's only function export is `invokeMechanicalCoordination` (X-SURFACE), and it imports only the bindings X-IMPORTS lists. An admitted intent declaring `authorized-effect` is refused `resolution schema-invalid` (X-AUTHORIZED).
- Red: the suite was run against a blind stub with the exported API and no guard (every call loads, calls the export and admits): 235 failed | 28 passed (263). The first failing assertion is G-1, "expected +0 to be 1", because the stub never reads the grant. The 28 that pass are cases a blind accept also passes: the constant pins (C-1, C-KEYWORDS, C-VOCABULARY), the admitted-form controls, L-THROWS, and the static X-SURFACE and X-IMPORTS rows.
- Green: 263 of 263.
- Mutants: 74 one-edit members, each applied alone to a throwaway copy of the tree and restored byte-identical (SHA-256 checked). 73 are killed.
  - The three adversarial mutants the requirements name are killed in four forms:
    - "reuse blanket write grant": `workbench:execute` accepted in place of the coordination grant (27 failures).
    - "allow arbitrary coordination exports": the descriptor read without its reviewed-bytes check (22), and that with the descriptor's export read from the loader result (22).
    - "auto-execute policy output as a command": each admitted intent's action called on the host (2).
  - The acceptance's callable inputs, passed through a JSON round trip instead of refused, are killed too (30).
  - The one survivor, S-MINLENGTH-UNITS (minLength counted in UTF-16 units instead of code points), is equivalent by reading. The only minLength in the two schemas is 1, and a string is non-empty in code points exactly when it is non-empty in UTF-16 units.
- Explicitly partial. The closure gate is PI-COORDINATION-INSTALLED, with the external dependency MW-COORDINATION.
  - No packed or installed coordination package is read. Every case hands a scratch file standing in for the artifact. Its loader records its calls, imports nothing and answers with recording functions.
  - The `reconcile` among them is a stand-in that admits each propose-only intent once; it is not the producer's resolver.
  - No installed API and no native operation were read, so no native id exists to record. The slice is not claimed live or closed (EAT-R085).
- Not claimed:
  - where a production pin, schema directory or descriptor comes from;
  - the producer's resolution semantics;
  - grant revocation after the grant read;
  - where the files lie and whether a path passes through a link;
  - a host, pin or loader result whose member read runs code, other than the accessor rows the suite plants;
  - any form a step's cases do not plant.
- Display paths added: none. The boundary returns closed-vocabulary diagnostics and data, and composes no label or reply text.
