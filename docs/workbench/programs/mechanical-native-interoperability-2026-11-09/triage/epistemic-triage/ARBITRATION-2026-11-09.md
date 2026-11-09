# ARBITRATION-2026-11-09 — mechanical-native-interoperability-2026-11-09 (Pi-subagents)

## Method

Trigger: in Phase 6 consolidation, eight ledger rows carried two different Wave-3 audit statuses (audit-a-baseline-readme vs audit-a-joint-mw; audit-a-corrections vs audit-a-joint-mw; audit-a-embedded-norms vs audit-a-joint-mw). Arbiter: the Phase 6 consolidator. Rule: each row is decided from primary evidence re-read at the pins, never by preferring the later audit, the more conservative status or the majority; an arbitration never leaves a row stronger than the better-warranted reading. Both readings are kept in CLAIMS.jsonl (`rivalReading`, `attacks`, `evidence`) and the ruling is appended to the row's `verdict_history` as `arbitration-20261109:<STATUS>@8e2fedeb`.

## Pinned rebuild

- Document pin: Pi `b085c34ed01cb71ce0d600ac98ade7ee18e832f0` (`docs/programs/mechanical-native-interoperability-2026-11-09/*.md`, byte-identical to the deposited `docs/pi-*.md`); MW sibling docs `7f3809fd8d6f20d22b9b4b81b6dfdb917bcc3c73`.
- Environment pins: Pi `8e2fedeb8e3ce7d94c2d3724a6ef7e2c5eb02164` (worktree pins/pi-8e2fedeb), MW `62a10b5924ccb10db428999cb148fa23f732e4fe` (worktree pins/mw-62a10b59). `pins/<x>` below ≡ `git show <sha>:<path>` in the respective repo.

## Re-run probes

| argv | rc | sha256(stdout) | bears on |
|---|---|---|---|
| `sed -n 215,219p pins/pi-8e2fedeb/src/workbench/execute-tool.ts` | 0 | sha256:cf7c35990c8c293df8551f7124edba7bc6e0340f5408ed5af13e626b6e092d97 | C031 |
| `sed -n 13,15p pins/mw-62a10b59/.agents/skills/mechanical-pi-host/SKILL.md` | 0 | sha256:7cfb1355d943d5312edc83687baa62000a28d5f74eb5e679c5fe78c52d19c7a8 | C031 |
| `git -C pins/pi-8e2fedeb grep -c -F 'from "@mechanical/' -- src` | 1 | sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 | C031 (rc 1 = zero hits) |
| `git -C pins/mw-62a10b59 grep -il -E 'pi-subagents\|workbench' -- packages/development` | 1 | sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 | C031 (rc 1 = zero hits) |
| `sed -n 213,223p pins/pi-8e2fedeb/src/workbench/function-authority.ts` | 0 | sha256:5424e552ca600f43c03d1f15ff066b66e7361e7d3db2e71c5c937852cbae0a19 | C039/C093 |
| `sed -n 240,243p pins/pi-8e2fedeb/test/workbench-function-authority.test.ts` | 0 | sha256:feb656ea8c6515d8efa4dc7e815304894033413b50db1d563861ff81f4a04607 | C039/C093 |
| `sed -n 84,86p pins/pi-8e2fedeb/src/workbench/execute.ts` | 0 | sha256:f9995d8fb8e44a225c76742c8406838f371c9d4254ef3de220ef5766a347d735 | C039 |
| `ls pins/mw-62a10b59/apps/development-rig/src` | 0 | sha256:46953d64b8c42da5dc77e427e9d59c6cbee1937f51718be46df8d9a73d57c465 | C169 |
| `ls pins/mw-62a10b59/contracts/entrypoints` | 0 | sha256:3da5f869d289db3c65b3e101e9ae55c2a9fe094a23baf043b688d94b45677ed9 | C169 |
| `sed -n 14,24p pins/mw-62a10b59/packages/development/src/develop.ts` | 0 | sha256:2cbf9c73022de190324b4b9f06030739f0f9119968f57e4768cff4060b932476 | C002 |
| `git -C pins/mw-62a10b59 grep -n -i -E '\breview(ed)?\b' -- packages/development` | 0 | sha256:6f566902a297ad7728773bfe1f37f4a59452f16a69d49ceee05084dda2956789 | C002 |
| `python3 -I -c 'import json;r=json.load(open('"'"'pins/mw-62a10b59/apps/development-rig/package.json'"'"'));d=json.load(open('"'"'pins/mw-62a10b59/packages/development/package.json'"'"'));print({k:r.get(k) for k in ['"'"'name'"'"','"'"'main'"'"','"'"'exports'"'"','"'"'bin'"'"']});print({k:d.get(k) for k in ['"'"'name'"'"','"'"'main'"'"','"'"'exports'"'"']})'` | 0 | sha256:845489ae81e90d968b8af39a4589abb2f2bd4b0774b92f6b2fa31c89b1259c1b | C238 |
| `grep -n 'npm pack' pins/mw-62a10b59/apps/development-rig/forge.toml pins/mw-62a10b59/packages/development/forge.toml` | 0 | sha256:1c9443594a7346a6a68d2fabac62b46e93a5b541d45feb9fabec11a2b066d15d | C238 |
| `grep -n -E '\bL[0-9]\b' docs/pi-README.md docs/pi-01-AUDIT-AND-PROTOCOL.md docs/pi-02-IMPLEMENTATION-PACKAGES.md docs/pi-03-VERIFICATION-AND-RELEASE.md` | 0 | sha256:65d449653658dac4a4ab4465a10766f7d11f9c308b3035f4a8ef83c06d8e5643 | C147 (L usages; none is a definition) |
| `sed -n '35p;51p;89p' docs/pi-02-IMPLEMENTATION-PACKAGES.md` | 0 | sha256:60880b8e2ea4ca9273253139474c9610ae4fc168c0ab040caad760cd8007f149 | C164 |
| `sed -n '12,24p;72p;79p' docs/mw-02-IMPLEMENTATION-PACKAGES.md` | 0 | sha256:4f6b81606e1fd4c08b69dcad9becb4a7fc81cece5c380cd5d6f28d82d77de316 | C164 |

## Per ruled row

### C002 — MechanicalWorkflows contains a reviewed ordinary function with the signature develop(services, request); it is the invocation target of the ...

- Proposition: MechanicalWorkflows contains a reviewed ordinary function with the signature develop(services, request); it is the invocation target of the whole program.
- Reading A (audit-a-baseline-readme): **SUPPORTED**
- Reading B (audit-a-joint-mw): **ESTABLISHED**
- Evidence inspected: re-read mw-62a10b59 packages/development/src/develop.ts:15-24 (header 'Ordinary async composition', signature); git grep -n -i 'review' -- packages/development -> README.md:5 disclaimer, index.ts:7-8 reviewCandidate export only
- Ruling: The proposition as atomized carries the predicate 'reviewed'. develop.ts:21-24 establishes the exported ordinary async `develop(services, request)` signature; no artifact at mw-62a10b59 records a review of it (git grep -i 'review' in packages/development returns only the reviewCandidate export and a README disclaimer). A conjunction with an unwitnessed predicate cannot be ESTABLISHED; the function-existence half is. SUPPORTED, with 'reviewed' read as the program's designation.
- Final status: **SUPPORTED**
- verdict_history entry appended: `arbitration-20261109:SUPPORTED@8e2fedeb`
- Permitted wording now on the row: MW exports the typed ordinary develop(services, request) function at 62a10b59; its review status is asserted by the program, not independently certified.

### C031 — Neither MW's local loader nor its native producer run history is evidence that a Pi-registered workflow_execute(function) invocation works; ...

- Proposition: Neither MW's local loader nor its native producer run history is evidence that a Pi-registered workflow_execute(function) invocation works; MW-side evidence does not establish registered Pi interoperability.
- Reading A (audit-a-baseline-readme): **SUPPORTED**
- Reading B (audit-a-joint-mw): **ESTABLISHED**
- Evidence inspected: re-read pi-8e2fedeb src/workbench/execute-tool.ts:215-219 (refuse unsupported-definition-kind); mw-62a10b59 .agents/skills/mechanical-pi-host/SKILL.md:14-15; git grep -F 'from "@mechanical/' -- src at pi-8e2fedeb -> 0; git grep -il 'pi-subagents|workbench' -- packages/development at mw-62a10b59 -> 0
- Ruling: The inference is deductive from an ESTABLISHED premise: execute-tool.ts:217-218 refuses every non-script definition kind at the registered route (C015), so no artifact at the pins can be evidence that a registered function invocation works; MW's own SKILL.md:15 labels its receipts 'not Pi->Mechanical acceptance' and no file in either repo imports the other. The baseline-readme cap rested on kind ('inferential over a receipt store'), not on a defeater. ESTABLISHED within the inspected stores at the pins; C029's SUPPORTED status is not a necessary premise (if the receipts were not real the conclusion holds a fortiori).
- Final status: **ESTABLISHED**
- verdict_history entry appended: `arbitration-20261109:ESTABLISHED@8e2fedeb`
- Permitted wording now on the row: Neither MW's local loader nor its October native receipts is evidence that a Pi-registered workflow_execute(kind:function) invocation works: Pi's registered route refuses `function` at the pins and MW's evidence is CLI/in-repo.

### C039 — Pi's exact action grant syntax at the pin represents a single-colon namespace:action form, and the three-part (two-colon) grant spelling use...

- Proposition: Pi's exact action grant syntax at the pin represents a single-colon namespace:action form, and the three-part (two-colon) grant spelling used by an earlier program document is not representable in that syntax ('previously unrepresentable').
- Reading A (audit-a-baseline-readme): **ESTABLISHED**
- Reading B (audit-a-joint-mw): **SUPPORTED**
- Evidence inspected: re-read pi-8e2fedeb src/workbench/function-authority.ts:213-223 (GRANT, HOST_GRANT, 'never an action grant'); test/workbench-function-authority.test.ts:240-243 ('which has two colons'); src/workbench/execute.ts:84-86
- Ruling: Both audits agree on every primary fact: GRANT = one-colon namespace:permission (function-authority.ts:215; execute.ts:86), the earlier program's `mechanical:develop:write` (two colons, three segments) is refused (test :241-242, :794), and `claude:tool:<name>` is permission data that 'is never an action grant' (:218-219). The atomized proposition is scoped to the action-grant syntax and to 'the' earlier spelling, so the universal reading joint-mw refuted is not the proposition graded. The README's bare 'syntax' is a wording defect handled by remediation, not a warrant gap. ESTABLISHED.
- Final status: **ESTABLISHED**
- verdict_history entry appended: `arbitration-20261109:ESTABLISHED@8e2fedeb`
- Permitted wording now on the row: An action grant must use the one-colon namespace:permission form (the only two-colon form admitted is the reserved claude:tool:<name> right); the earlier mechanical:develop:write spelling is unrepresentable.

### C093 — The effective action-grant grammar at the pin accepts the two-segment form `namespace:permission` and does not accept a three-colon (three-s...

- Proposition: The effective action-grant grammar at the pin accepts the two-segment form `namespace:permission` and does not accept a three-colon (three-segment) example. No file is named by the document.
- Reading A (audit-a-corrections): **CONTESTED**
- Reading B (audit-a-joint-mw): **SUPPORTED**
- Evidence inspected: same re-read as C039
- Ruling: CONTESTED requires conflicting primary evidence; here the primary evidence is one-sided (same regexes and test rows as C039). The substance (one-colon action grants; the earlier example refused) holds; the doc's literal 'three-colon example' miscounts the two-colon example, and the atomizer's '(three-segment)' gloss is false for the host grant grammar's claude:tool:<name>. A proposition whose literal referent is miscounted cannot be ESTABLISHED; SUPPORTED with a LINGUISTIC_INTEGRITY repair.
- Final status: **SUPPORTED**
- verdict_history entry appended: `arbitration-20261109:SUPPORTED@8e2fedeb`
- Permitted wording now on the row: Pi's effective action-grant grammar accepts one-colon `namespace:permission` and refuses the earlier two-colon example `mechanical:develop:write`; `claude:tool:<name>` is carried only as a Claude tool right, never as an action grant.

### C147 — The current evidence for the program is L0 (static source inspection) plus historical tests and producer receipts, each at its own pin.

- Proposition: The current evidence for the program is L0 (static source inspection) plus historical tests and producer receipts, each at its own pin.
- Reading A (audit-a-corrections): **SUPPORTED**
- Reading B (audit-a-joint-mw): **ESTABLISHED**
- Evidence inspected: lens-contradict row 9 detection model (regex '\bL[0-9]\b' / '\bV[0-9]\b' over pi-*.md); pi-README:47 footer; pi-03:3
- Ruling: Both audits agree the inventory of evidence (static inspection + historical test files/receipts) is accurate. The proposition's tier label 'L0' has no definition anywhere in the four Pi docs (regex grep: usages at pi-01:134, pi-02:57, pi-02:71 only; pi-03 defines V0-V6), and the 'nothing else was run' half is the author's self-report (C221 UNDETERMINED). An inventory statement whose tier term is unanchored and whose completeness rests on a self-report is SUPPORTED, not ESTABLISHED.
- Final status: **SUPPORTED**
- verdict_history entry appended: `arbitration-20261109:SUPPORTED@8e2fedeb`
- Permitted wording now on the row: The program's own evidence is static source inspection at the stated pins (V0 in pi-03's ladder; 'L0 audit' in mw-03's) plus historical test runs and producer receipts at their own commits; no command was executed for the doc commit.

### C164 — P02/P03 and the producer packets M01-M04 can proceed concurrently, and P04 needs only their ratified exact API. Internal tension: the P02 he...

- Proposition: P02/P03 and the producer packets M01-M04 can proceed concurrently, and P04 needs only their ratified exact API. Internal tension: the P02 heading lists 'P00 + Mechanical M01' as a prerequisite, so P02 is not fully concurrent with M01 as stated.
- Reading A (audit-a-embedded-norms): **CONTESTED**
- Reading B (audit-a-joint-mw): **SUPPORTED**
- Evidence inspected: re-read docs/pi-02:14-20, :35, :51, :67, :89 and docs/mw-02:11-24, :72, :79 (quoted in lens-contradict row 4 and lens-mw-side row 26)
- Ruling: The proposition is a feasibility claim about joint scheduling. Pi's own text contradicts it (pi-02:35 'P02/P03 and producer M01-M04 can work concurrently' vs pi-02:51 'P02 — ... (P0; P00 + Mechanical M01)') and MW's DAG (mw-02:12-24) orders M05 before every Pi packet P01-P06. Two authoritative program statements point in opposite directions about the same ordering, which is the CONTESTED bar. The narrower proposition 'P03 and M01-M04 touch disjoint repos and can proceed concurrently' is SUPPORTED and is recorded as permitted wording; the row stays CONTESTED until P00/M00 rule one joint DAG.
- Final status: **CONTESTED**
- verdict_history entry appended: `arbitration-20261109:CONTESTED@8e2fedeb`
- Permitted wording now on the row: Pi's pi-02 L35 says P02/P03 can proceed concurrently with M01-M04 while its P02 heading (L51) requires M01 and MW's DAG (mw-02 L12-24) orders M05 before all Pi packets; the ordering is unsettled until P00/M00 rule one joint DAG. Narrower supported proposition: P03 and MW's M01-M04 touch disjoint repos and can proceed concurrently; P02's installed-host leg waits on M01; P04 needs the ratified API.

### C169 — Mechanical at its pin has a host module and a descriptor artifact that Pi can read as the producer side of the ABI decision.

- Proposition: Mechanical at its pin has a host module and a descriptor artifact that Pi can read as the producer side of the ABI decision.
- Reading A (audit-a-embedded-norms): **ESTABLISHED**
- Reading B (audit-a-joint-mw): **SUPPORTED**
- Evidence inspected: ls mw-62a10b59/apps/development-rig/src -> entrypoint-host.ts, installed-host.ts, live-development.ts ...; ls contracts/entrypoints -> development.v1.json, coordination-reconcile.v1.json
- Ruling: Both audits agree the referents exist at mw-62a10b59: apps/development-rig/src/entrypoint-host.ts and installed-host.ts (host/loader modules) and contracts/entrypoints/development.v1.json (descriptor). joint-mw's reservation ('a host module' vs several modules) is a naming nicety, not a primary-evidence conflict; the stronger reading (a stable importable host subpath) is a different proposition, C239, which is REFUTED. ESTABLISHED for the proposition as written.
- Final status: **ESTABLISHED**
- verdict_history entry appended: `arbitration-20261109:ESTABLISHED@8e2fedeb`
- Permitted wording now on the row: MW has a committed descriptor and in-repo rig host/loader modules, not yet a stable host subpath for Pi.

### C238 — (implicit premise) The MechanicalWorkflows repo contains npm-packable packages `@mechanical/development-rig` (apps/development-rig) and `@me...

- Proposition: (implicit premise) The MechanicalWorkflows repo contains npm-packable packages `@mechanical/development-rig` (apps/development-rig) and `@mechanical/workflows-development` (packages/development) whose built members can be `npm pack`ed for an independent consumer.
- Reading A (audit-a-embedded-norms): **SUPPORTED**
- Reading B (audit-a-joint-mw): **ESTABLISHED**
- Evidence inspected: parsed mw-62a10b59 apps/development-rig/package.json (name @mechanical/development-rig, exports None, main None, bin cli) and packages/development/package.json (name @mechanical/workflows-development, exports '.'); grep -n pack */forge.toml -> line 20 `npm pack --ignore-scripts` in both
- Ruling: 'Can be npm packed' is a capability claim. Both manifests carry the exact names and both forge.toml files declare `npm pack --ignore-scripts` package steps, and MW's committed tests pack the library; but no pack was executed in this audit and the rig has no exports map. A configured-and-committed capability that was not exercised at the pin is SUPPORTED (inferential), not ESTABLISHED.
- Final status: **SUPPORTED**
- verdict_history entry appended: `arbitration-20261109:SUPPORTED@8e2fedeb`
- Permitted wording now on the row: MW declares two independently packable members with these package names; external host import still awaits M01/M05.

## Remediation impact

| Ruled row | Status after ruling | REMEDIATION.md row |
|---|---|---|
| C002 | SUPPORTED | M037 |
| C031 | ESTABLISHED | none owed (status not REFUTED/UNSUPPORTED/CONTESTED) |
| C039 | ESTABLISHED | M019 |
| C093 | SUPPORTED | M019 |
| C147 | SUPPORTED | M021 |
| C164 | CONTESTED | M007 |
| C169 | ESTABLISHED | none owed (status not REFUTED/UNSUPPORTED/CONTESTED) |
| C238 | SUPPORTED | M039 |

Only C164 (CONTESTED) is a status that owes a remediation row; it is covered (SURFACE_DISAGREEMENT). The other seven rulings land on ESTABLISHED/SUPPORTED and their wording defects are carried by the linguistic rows named above.

