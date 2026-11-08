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

## 2026-11-08 respin (cut #2): refusal #1's members pinned through a settled read window, sealed results and exact argument lists, two sentences restated (machine seat ws-11, run g10-work-s242)

- Refusal #1 (gate run g10-gate-s243, seat gate-prep-13, on cut #1 3658beb9) found 18 one-edit members of `src/workbench/mechanical-coordination.ts` that kept the suite at 263 passed (items U1 to U5) and two false sentences (U6 and U7). Cut #2 pins each member red-first. The module changes one line of code: the loader is now called with no receiver, where cut #1 called it as a method of the options object. Its header is rewritten to claim exactly what the cases now pin.
- U1, deferred calls. Each planted call now runs with setTimeout, setInterval and setImmediate faked. Its counts are read only after it has returned or thrown and every timer it scheduled has run; the read also yields to the real event loop, so microtasks and next ticks have run too. Every function a case hands the boundary is then sealed, and C-LATE, the last case, reads that none of them was called after its case's read. C-SETTLE reads a call that a planted loader defers in each of those five ways.
- U2, hidden members. Results, diagnostics and observations are read through `Reflect.ownKeys`, with their descriptors and prototypes. A non-enumerable, symbol-keyed or inherited member, an accessor, an unfrozen container or a proxy anywhere in an observation reads as unsealed, and in a diagnostic as unclosed.
- U3, the export surface and the import list. X-SURFACE pins the module's eight export names and walks every export through any own key, accessor and prototype for a function. X-IMPORTS also reads export-from and import-equals declarations and import type nodes. X-NO-LOAD reads that the module's code names none of a list of global names (process, globalThis, eval, Function, constructor, fetch, the timers and others).
- U4, handed extras. Every recording function records its receiver and arguments. Every admitted call asserts that the loader was called with no receiver and exactly the entry and the artifact, and that reconcile was called with no receiver and exactly one argument: plain data, equal to the input, sharing no container with it. Every planted call asserts that the grant read was called as the host's method, with no argument.
- U5. G-FIRST now asserts zero provider handle and export calls in the read window. L-THROWS's calls assert the same before their error is rethrown.
- U6, restated. Entry 1's "The module spells none of the producer's schema vocabulary; the published files supply it at run time" is false. Of the member names and enum values the two schema files define, the module's code spells exactly fifteen member names and no enum value (C-SPELLING):
  - basis, workspaceId, revision, budget, compute, workers, queue and latencyMs, which its basis and budget echo reads;
  - admitted, rejected, conflicts and budgetUsed, which its result type names;
  - authority and code, as the observation's and the diagnostic's own members;
  - target, a local name in its schema judge.

  Its comments also name the enum value authorized-effect.
- U7, restated. Entry 1's module header and cut #1's D-EXPORT title said "the 16 other value exports of the coordination package"; the 16 are a subset. This seat counted the package index at the pin (blob 458913c5, read with a read-only `git cat-file`) with the TypeScript parser: 284 value exports, 283 other than reconcile. The suite reads no such count.
- Claim boundary, entry 1. Its "reads the host's grants once", "calls the host loader once", "It calls the export once, with a copy of the input", "The result is returned as a frozen `observation-only` observation" and "no provider handle is called" now claim only what the module header's steps claim, read in the read window above. Its "it imports only the bindings X-IMPORTS lists" claims only the forms X-IMPORTS and X-NO-LOAD read. Its "answers with recording functions" holds for every case's loader except L-THROWS's, which reject or throw.
- Tests: 268, cut #1's 263 plus C-SPELLING, C-READERS (each of the suite's readers flags its planted controls), X-NO-LOAD, C-SETTLE and C-LATE.
- Red: the cut #2 suite against cut #1's module reads 26 failed | 242 passed (268). Every admitted case fails at the loader's receiver, cut #1's options object, which holds the host; C-TALLY fails as well. Each of refusal #1's 24 members alone on the entry commit's own suite reproduces the gate's reading: the 18 survivors and the -B variant at 0|263, and the five controls killed as the gate read them.
- Falsification on the cut #2 tree: each member applied alone by exact anchor, the suite run, the module restored by sha256. 133 runs, 132 killed:
  - refusal #1's 24 members, all killed (GP13-L-LOADER-EXTRA-ARG re-expressed on the new loader line);
  - 35 seat members of the new pins, all killed;
  - cut #1's 74 members, 73 killed; the survivor S-MINLENGTH-UNITS is equivalent, as entry 1 says.

  The refusal's gate witness suite reads 10 of 10 on the cut #2 tree.
- Not claimed: a call deferred through another clock that lands after C-LATE ran; a facility reached through a member name computed at run time; an options object holding members beyond the seven the boundary reads.
- Explicitly partial, as entry 1 says: closure gate PI-COORDINATION-INSTALLED, external MW-COORDINATION.
- Display paths added: none.

## 2026-11-08 respin (cut #3): refusal #2's members pinned by recording the planted data functions and reading the loader's bytes, the late-call and artifact words narrowed (machine seat ws-06, run g10-work-s243)

- Refusal #2 (gate run g10-gate-s244, seat gate-prep-37, on cut #2 31759c81) found six one-edit members of `src/workbench/mechanical-coordination.ts` that kept the suite at 268 passed. Four call a function or getter a case planted as data after its case's read (U1), one calls a function input inside the read window (U2), and one hands the loader the host as a hidden member of the artifact's bytes (U3). Cut #3 changes the module's header, not its code: it narrows the words those members contradicted, and the suite adds the pins below.
- Pins. The functions I-DATA, O-DATA and C-ORDER plant as data (I-DATA's six function rows and own toJSON, O-DATA's returned function and own toJSON, C-ORDER's notData function) and O-DATA's accessor getter now record their receiver and arguments into a trace sealed from the start, so any call of one lands in LATE, which C-LATE reads. Every admitted call admittedOf reads also asserts that the artifact's bytes are a Buffer, not a proxy, whose own keys are exactly its indices, and C-READERS shows that reader flagging its planted controls.
- Claim boundary, entry 2. Its "Every function a case hands the boundary is then sealed, and C-LATE, the last case, reads that none of them was called after its case's read" claims only the set the module header's THE READ WINDOW names as sealed. Its "Every recording function records its receiver and arguments" claims only the functions the suite header's THE HOST paragraph names. Its "exactly the entry and the artifact" claims only what admittedOf reads: the entry itself, and a frozen artifact of Object.prototype whose own keys are exactly digest and bytes, its bytes a Buffer, not a proxy, whose own keys are exactly its indices.
- Red: each of refusal #2's seven members alone on a throwaway copy. On the cut #2 suite, six keep it at 0 failed and GP37-L-DIGEST-BOXED-HOST fails L-1, as the gate read. On the cut #3 suite all seven fail it: the four late members and GP37-I-CALL-INPUT-FN at C-LATE (1 failed each), GP37-L-BYTES-HIDDEN-HOST in the 25 cases that read an admitted call through admittedOf and in C-TALLY (26 failed), and GP37-L-DIGEST-BOXED-HOST at L-1 (1 failed).
- Green: 268 of 268.
- Falsification on the cut #3 tree: each member applied alone, the suite run, the files restored by sha256. 157 module runs, 152 killed:
  - refusal #2's 7 members, all killed;
  - this cut's 13 members of the new pins, all killed; its 4 scope probes survive, each inside the words below or equivalent to the narrowed claim (the host on the bytes' backing ArrayBuffer, a Buffer copy of the same bytes, a loader rejection's stack read at the next call, a planted value's class constructed at the next call);
  - cut #2's 36 seat members and refusal #1's 23 members that apply, all killed (GP13-L-LOADER-EXTRA-ARG names cut #1's loader line, as cut #2 recorded);
  - cut #1's 74 members, 73 killed; S-MINLENGTH-UNITS survives and is equivalent, as entry 1 says.

  Suite-side, 8 members edit the new pins. The 5 that hollow a reader or its control are killed by their planted controls (C-LATE, C-READERS). The 3 that remove a pin survive by construction, and with each removal the gate member that pin reads also survives (0 failed).
- Not claimed: a call, in its case's read window or after it, of a function or getter the read window does not name as sealed (a planted value's class or another prototype member, a built-in method or accessor, an error's stack among them); anything the loader can reach from its two arguments other than through their own keys (a prototype, a built-in accessor, the bytes' backing ArrayBuffer).
- Explicitly partial, as entries 1 and 2 say: closure gate PI-COORDINATION-INSTALLED, external MW-COORDINATION.
- Display paths added: none.
