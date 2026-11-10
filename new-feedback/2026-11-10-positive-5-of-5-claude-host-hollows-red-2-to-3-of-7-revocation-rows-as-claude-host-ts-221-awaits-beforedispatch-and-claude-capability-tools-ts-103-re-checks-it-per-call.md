# positive: the wb-7wkb receipt records 5 of 5 Claude-host hollows red 2 to 3 of 7 revocation rows as claude-host.ts:221 awaits beforeDispatch and claude-capability-tools.ts:103 re-checks it per call

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77)
**Date:** 2026-11-10 (window: flywheel g10.23 operation 2026-11-09T08:25Z to 2026-11-10T08:25Z, landings L1079-L1083 (L1083's merge ec7db5e4 at 08:13:30Z is inside the window; its fold and registry refresh are not); measured 08:57Z to 09:08Z)
**`pi-subagents` revision:** installed tool = trunk `origin/workbench/implementation-program` at `d00c37429887a6a0bad010983074553b5601e976`, fetched at launch (`git fetch -q origin` rc 0; `git log -1` prints `2026-11-10T08:25:50Z ledger: close wb-7u0r (landing 1083, merge ec7db5e4)`; root tree `9ee10c0a444e68b5b3ddf53f69a9e84ceb7bd297`; `package.json` blob `c6bc33445204` names `@tintinweb/pi-subagents` `0.20.0`). Source read at that same sha with `git show`, `git grep` and `git ls-tree`: `src/workbench/claude-host.ts` blob `baee92de0811` (396 lines), `src/workbench/claude-capability-tools.ts` blob `bd01077895b1` (155 lines), `test/workbench-claude-host-revocation-falsifiers.test.ts` blob `52ae340f50e6` (441 lines, sha256 prefix `ac401564e8936db1`), `docs/workbench/receipts/wb-7wkb.md` blob `c8f547741829` (91 lines, sha256 prefix `90324da4fe09bfa8`), `src/workbench/identity.ts`, `src/index.ts`, `.github/workflows/ci.yml`. No installed binary ran; the pin is a trunk pin. The main clone's own HEAD (`188ae59016`) is 4,826 commits behind the ref (`git rev-list --count HEAD..origin/workbench/implementation-program`) and was not moved.
**`git` revision:** `git version 2.50.1`, the instrument for every blob, line and sha here; `python3 -I` for the ledger rows and the registry; `node v24.20.0` is on the host and ran nothing for this file.
**Machine side (read-only, cited as how the repository is operated):** `machines/flywheel/ledger/metrics.jsonl` at 72,114 lines (one line = one `M:<n>` row; rows M:71500, M:71599, M:71612, M:72009, M:72049 read by line number) and `machines/flywheel/state/landing-order-registry.json` (543 entries; idx 539-542 read). Neither was edited.
**Method:** read-only re-derivation of the orchestrator's leads at the pin: `git show <sha>:<path> | sed -n` and `nl -ba` for every quoted line; `git grep -n` at the pin for the `beforeDispatch`, `IDENTITY_CONFLICT` and `IdentityConflictError` sites; `git log -1` over the cut tip `c13cf1165` and the L1082/L1083 merges; `git rev-parse 'c13cf1165^{tree}'` against the gate row's `gatedTree`; `python3 -I` filters over the five ledger rows and the registry. No vitest, pi, bd, forge or npm command ran: the mutant counts and gate tallies below are quoted from the receipt, the cut's commit body and the ledger rows, and graded as quoted figures.
**Scope:** feedback about `pi-subagents` the tool - the Claude workflow host (`src/workbench/claude-host.ts`), its curated capability tools (`src/workbench/claude-capability-tools.ts`) and the suite that pins them - not about the wb-7wkb bead or the MNI-2026-11-09 program it serves, not about the Claude Agent SDK (never reached: the suite drives the host through its fixture query seam) and not about the flywheel machine, whose ledger and registry are cited as producer evidence. Positives first; the one asymmetry found beside them (Finding 6) is the boundary of the praise, and the one nit (Finding 7) is a receipt-spelling convention.
**Prior art:** none for this claim. Checked at the fetched ref with `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` (41 entries) and on the five unlanded feedback branches (`origin/machine/flywheel/feedback-2026-11-04` `0bc3d6fd3a`, `-05` `3c806e1d6c`, `-06` `eb67a88ff1`, `-09` `2966416bf2`, `origin/feedback/shift-left-research-engineer-2026-11-07` `5e463083cf`; union 49 distinct entries; `git merge-base --is-ancestor <branch> origin/workbench/implementation-program` rc 1 for each): filename grep `identity|revocation|revoke|beforedispatch|claude-host|capability-invoke|capability_invoke|falsifier|hollow|admission|principal|grant|recheck|re-check|7wkb` = 1 hit on every ref, `2026-10-30-positive-16-of-30-census-files-carry-both-control-cases-and-falsifier-rows-at-a520cbd-and-23-of-the-window-s-28-rule-19-rulings-quote-a-control-twin-plant-or-falsifier-reading.md` (census falsifier rows in general, not this suite or these two source files); body `git grep -li -F` at the ref and on the five branches: `IDENTITY_CONFLICT` 0, `beforeDispatch` 0, `claude-capability-tools` 0, `capability_invoke` 0, `wb-7wkb` 0, `revocation` 0; `claude-host` 2 at the ref (the 2026-10-20 rule-16 file and the 2026-10-21 package.json type-field file, both another sense); `hollow` 6 at the ref (gate-refusal files, none about this host). As the 10-30 and 11-09 positives did, this file takes a plain claim filename with `positive-` in the slug.
**Delivery:** one docs-only commit on `machine/flywheel/feedback-2026-11-10`, cut from a detached worktree of `origin/workbench/implementation-program` (trunk never checked out or pushed), landed by the owner. Gate waiver disclosed in the commit body: docs-only, no forge gate run, no tests run, no hook bypassed (`git config core.hooksPath` rc 1 = unset; `.githooks` and `.gitmessage` absent at the ref per `git ls-tree` and in the clone, `ls` rc 2).

## Summary, with numbers

The window's two src-pinning landings succeeded and no escalation is owed: wb-7wkb landed at L1082 (merge `37a01a345653d7f8b1ffcacde442716ddff66d27`, 2026-11-10T04:45:34Z) on the gate of record M:71500 (`cmd_48b330998ab4`, PASS-WITH-TIMING-NOTE, 546.86 s wall, 29,024 of 29,034 tests passed with 1 expected fail, 7 skipped, 2 todo, 0 failed) and its follow-up wb-7u0r at L1083 (merge `ec7db5e4a1f6241522609d6d4cda20efae58e644`, 08:13:30Z) on M:72009 (`cmd_8d69af661967`, 29,026 of 29,036 passed, 0 failed). The positive is the mechanism those landings pinned. At the pin, `src/workbench/claude-host.ts:221-223` awaits the host-owned `beforeDispatch` inside a `try` and settles the agent as `{ ok: false, error }` on a throw, before the agent's `AbortController` (:230) or its curated tools (:238-243) exist; `src/workbench/claude-capability-tools.ts:103` awaits the same `beforeDispatch` on every curated tool call, after input validation (:101) and before `dispatch(...)` (:105), and its catch (:106-111) hands the agent `{ kind: "rejected", category: "transport", diagnostic }` with `isError: true`. The landed suite `test/workbench-claude-host-revocation-falsifiers.test.ts` registers 10 tests at the pin (ROSTER :162-173) that drive the real `createClaudeWorkflowHost` (:75) through `FakeClaudeSdk` and a real MCP `InMemoryTransport` client (:71-72) and pin both envelopes exactly (:276, :299, :380, :403). The receipt's failed-case matrix (`docs/workbench/receipts/wb-7wkb.md:34-38`) records 5 of 5 Claude-host hollows caught, each by 2 or 3 of the 7 cut #1 rows; the cut's gate ran 7 of 7 GH members red against the 9-case cut #2 suite (1 to 5 of 9 rows each, `c13cf1165` body); the gate of record ran the suite `9/9 passed` and the L1083 gate `(10 tests) 464ms`. The flywheel registry now binds both source files to this census (idx 540 at L1082 under R-B756 M:71599, refreshed as idx 542 at L1083 under R-B758 M:72049 (08:33:44Z and 08:34:14Z, after the window's 08:25Z end; read at measurement time 08:57-09:08Z) with the receipt path added), so a later landing that touches either file contacts it. Findings 1-5 CONFIRMED (mutant reproduction by this seat PLAUSIBLE: not re-run). The boundary (Finding 6, CONFIRMED from source, runtime string PLAUSIBLE): the production `beforeDispatch` throws an `IdentityConflictError` whose `code` field the host's settle path reads (`claude-host.ts:222`) and the tool path does not (`claude-capability-tools.ts:107-109`), so the agent-facing diagnostic of a real revocation is the 100-byte preview of a 164-byte message that never carries the `IDENTITY_CONFLICT` token; the suite's fixture spells the token into a plain `Error`'s message (:80, :207) and so cannot see this. Finding 7 (CONFIRMED) is a one-hand-resolution nit: the receipt's hollow table and the F2 duty text name the two files bare while the repo paths are `src/workbench/`.

## Finding 1 - the admission check is awaited inside a try at `claude-host.ts:221-223` and a throw settles the agent before the controller (:230) and the curated tools (:238-243) exist - **CONFIRMED**

```
$ git show d00c37429887a6a0bad010983074553b5601e976:src/workbench/claude-host.ts | sed -n '221,223p' | nl -ba -v 221
   221	    try { await config.beforeDispatch?.(); } catch (error) {
   222	      return { ok: false, error: error instanceof Error ? `${"code" in error ? String(error.code) + ": " : ""}${error.message}` : String(error) };
   223	    }
$ git show d00c37429887a6a0bad010983074553b5601e976:src/workbench/claude-host.ts | sed -n '229,243p' | nl -ba -v 229
   229	    if (config.signal?.aborted) return { ok: false, skipped: true, error: "Workflow aborted." };
   230	    const controller = new AbortController();
   231	    const onAbort = () => controller.abort();
   232	    config.signal?.addEventListener("abort", onAbort, { once: true });
   233	    if (config.signal?.aborted) controller.abort();
   234	    controllers.set(agentId, controller);
   235	    const allowedTools = previous?.tools ?? role?.tools ?? tools;
   236	    const effectiveEffort = previous?.effort ?? request?.effort ?? role?.effort;
   237	    const exposed = previous?.capabilities ?? role?.capabilities ?? [];
   238	    const providerTools = exposed.length > 0 && config.capabilities ? createCuratedTools({
   239	      registry: config.capabilities, allowedCapabilities: exposed, grants: config.grants ?? [],
   240	      principal: {id:config.principal?.id ?? "local-operator",role:config.principal?.role ?? request?.agentType ?? "general-purpose"},
   241	      workspace: config.cwd, invocationId: config.invocationId ?? agentId, signal: controller.signal,
   242	      beforeDispatch: config.beforeDispatch,
   243	    }) : undefined;
```

Both ranges are numbered by file line; :224-228 is a comment (named below) and the whole region was also read as `sed -n '212,245p' | nl -ba -v 212`. Three facts carry the claim: the `await` sits inside the `try` (:221); the catch returns `{ ok: false, error }` (:222) so a throw ends `spawnAgent` for that agent with nothing allocated; and the same `config.beforeDispatch` is handed to `createCuratedTools` (:242), which Finding 2 follows. The file carries five `beforeDispatch` lines in all (`git grep -n beforeDispatch` at the pin: :48 the option type, :115 a comment (the "CODE: message" shape), :221 the admission, :242 the hand-off, :379 the `callNode` path of Finding 6's scope note); the comment at :224-228 names the re-check after the await as the cure for `wb-a2g.5`, "init-after-abort".

## Finding 2 - every curated tool call awaits `beforeDispatch` at `claude-capability-tools.ts:103`, between input validation (:101) and `dispatch` (:105), and a throw reaches the agent as `{ kind: "rejected", category: "transport", diagnostic }` with `isError: true` (:106-111) - **CONFIRMED**

```
$ git show d00c37429887a6a0bad010983074553b5601e976:src/workbench/claude-capability-tools.ts | sed -n '97,111p' | nl -ba -v 97
    97	    try {
    98	      const callNumber = ++calls;
    99	      if (callNumber > maxCalls) throw new CapabilityError("authorization", "Claude capability call quota exhausted.");
   100	      refuseInput?.();
   101	      validatedCapabilityJson(args, "Claude tool input", 32, maxInputBytes);
   102	      if (controller.signal.aborted) throw new CapabilityError("transport", "Claude capability request cancelled.");
   103	      await beforeDispatch?.();
   104	      if (controller.signal.aborted) throw new CapabilityError("transport", "Claude capability request cancelled.");
   105	      return encoded(await dispatch({ grants, principal, workspace, invocationId, callId: `${invocationId}:mcp:${callNumber}`, signal: controller.signal }));
   106	    } catch (error) {
   107	      const category = error instanceof CapabilityError ? error.category : "transport";
   108	      const diagnostic = redactWorkbenchText(error instanceof Error ? error.message : String(error));
   109	      const preview = Buffer.from(diagnostic).subarray(0, 100).toString("utf8");
   110	      try { return encoded({ kind: "rejected", category, diagnostic: preview }, true); }
   111	      catch { return { content: [{ type: "text", text: JSON.stringify({ kind: "rejected", category, diagnostic: "Capability request failed; diagnostic exceeded display bounds." }) }], isError: true }; }
```

`beforeDispatch` is destructured from the options at :53 (`const { registry, signal, beforeDispatch } = options;`) and typed at :23 (`beforeDispatch?: () => void | Promise<void>;`). The ordering is the mechanism: quota (:99), the caller's own `refuseInput` (:100), input bounds (:101), abort (:102), the basis re-check (:103), abort again (:104), then the dispatch (:105). A throw from :103 is not a `CapabilityError`, so :107 labels it `transport`, and :110 wraps it with `isError` true. The `dispatch` of :105 never runs on that path, which is what the suite's WRITE rows read as "the write fixture has no dispatch" (Finding 3).

## Finding 3 - the landed suite registers 10 tests at the pin, drives the real host through `FakeClaudeSdk` and a real MCP client, and pins both envelopes exactly at :276/:299 and :380/:403 - **CONFIRMED**

```
$ git show d00c37429887a6a0bad010983074553b5601e976:test/workbench-claude-host-revocation-falsifiers.test.ts | grep -n -E '^\s*(it|it\.each|describe)\('
269:describe("a basis change while the agent's admission is parked refuses the agent, and at the quiescence point query() has no call", () => {
274:  it.each(rows)("$id: settled as the IDENTITY_CONFLICT refusal; at the quiescence point one beforeDispatch entry and no query() call", async row => {
280:  it("PARK-CONTROL: the same parked sequence with no change settles ok; at the quiescence point one beforeDispatch entry and one query() call", async () => {
291:  it("QUIESCE-PARK: a query() call from a 50 ms timer set once the agent settled is counted at the quiescence point", async () => {
372:describe("the final write call of a live session re-reads the basis, and at the quiescence point no dispatch ran under a stale principal or grant", () => {
377:  it.each(rows)("$id: capability_invoke is rejected with the IDENTITY_CONFLICT text; at the quiescence point the write fixture has no dispatch", async row => {
386:  it("WRITE-CONTROL: with no change the write returns; at the quiescence point exactly one dispatch, under the principal and grants the host was built with", async () => {
397:  it("QUIESCE-WRITE: a write dispatch from a 50 ms timer set once the agent settled is counted at the quiescence point", async () => {
409:it("RECEIPT-ROWS: the rows of this file's tests are exactly the rows the Rows lists of docs/workbench/receipts/wb-7wkb.md name for this file, the cut #1 entry's list among them, and each row a new-rows sentence of that receipt names is named for one of its two suites", ({ task }) => {
427:it("ROSTER the registered tests of this file are exactly these, in order, each run and none marked to fail, and their rows are the rows the receipt's Rows lists name for this file", ({ task }) => {
$ ... | grep -n -E 'toEqual\(\{ kind: "rejected"|toEqual\(\{ ok: false'
276:    expect(trial.outcome).toEqual({ ok: false, error: CONFLICT });
299:    expect(trial.outcome).toEqual({ ok: false, error: CONFLICT });
380:    expect(trial.payload).toEqual({ kind: "rejected", category: "transport", diagnostic: CONFLICT });
403:    expect(trial.payload).toEqual({ kind: "rejected", category: "transport", diagnostic: CONFLICT });
```

Two `it.each` rows each (:270-273 `PARK-REVOKE-GRANT`, `PARK-CHANGE-PRINCIPAL`; :373-376 `WRITE-REVOKE-GRANT`, `WRITE-CHANGE-PRINCIPAL`) plus six `it(` = 10 registrations, and the `ROSTER` constant at :162-173 lists exactly 10 titles. `CONFLICT` is the literal `"IDENTITY_CONFLICT: invocation basis changed after admission"` (:80). The host under test is the real one (`import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";` :75) built at :255 with `query: sdk.query, grants: [...state.grants], principal: { ...state.principal }, beforeDispatch: admission.beforeDispatch`; the SDK is `FakeClaudeSdk` from `./helpers/claude-sdk-stream.js` (:77, "the SDK module is never mocked", header :9-10); the write goes through `Client` and `InMemoryTransport` from `@modelcontextprotocol/sdk` (:71-72). The basis check is the fixture's own: `reobserve` throws `new Error(CONFLICT)` when `basisOf(state)` differs from the admitted reading (:201-208), parked behind a promise until `release()` (:228-245), with `revokeWriteGrant` removing `fixture:write` (:193-195) and `changePrincipal` setting `local-operator:2000` (:197-199). The suite's header states what it does not claim (:55-60): anything after a trial's 50 ms quiescence point, the receipt's counts, and "src/index.ts's own producer (its settings re-read and identity verification)" - the boundary Finding 6 measures.

## Finding 4 - the receipt records 5 of 5 Claude-host hollows caught by 2 or 3 of the 7 cut #1 rows, and the cut's commit body records 7 of 7 GH gate members red against the 9-case cut #2 suite - **CONFIRMED** (as quoted figures)

```
$ git show d00c37429887a6a0bad010983074553b5601e976:docs/workbench/receipts/wb-7wkb.md | sed -n '26p;28,29p;34,38p'
- Failed-case matrix. Each mutant is one exact edit, made in a throwaway copy of the tree taken at `d1b45b4` (the three source files the mutants edit are byte-identical at `008e25c`; landing 1080 changed no file under `src/`). The two suites ran there under VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8; the unmutated control passed 18 of 18 in the same copy.
| Mutant | Edit | Rows red |
| --- | --- | --- |
| H1-SWALLOW-ADMISSION-REJECTION | `claude-host.ts` ignores a rejected beforeDispatch and goes on | 2 of 7: PARK-REVOKE-GRANT, PARK-CHANGE-PRINCIPAL |
| H2-ADMISSION-NOT-AWAITED | `claude-host.ts` starts beforeDispatch without awaiting it | 2 of 7: PARK-REVOKE-GRANT, PARK-CHANGE-PRINCIPAL |
| H3-TOOLS-WITHOUT-BASIS-CHECK | `claude-host.ts` builds the curated tools without its beforeDispatch | 3 of 7: WRITE-REVOKE-GRANT, WRITE-CHANGE-PRINCIPAL, WRITE-CONTROL |
| T1-TOOL-CALL-NO-RECHECK | `claude-capability-tools.ts` drops the per-call beforeDispatch | 3 of 7: WRITE-REVOKE-GRANT, WRITE-CHANGE-PRINCIPAL, WRITE-CONTROL |
| T2-RECHECK-AFTER-WRITE | `claude-capability-tools.ts` runs the per-call beforeDispatch after the dispatch | 2 of 7: WRITE-REVOKE-GRANT, WRITE-CHANGE-PRINCIPAL |
```

"Of 7" is the cut #1 row count (:9 lists the seven: PARK-REVOKE-GRANT, PARK-CHANGE-PRINCIPAL, PARK-CONTROL, WRITE-REVOKE-GRANT, WRITE-CHANGE-PRINCIPAL, WRITE-CONTROL, ROSTER); cut #2 made it 9 (:52 "9 cases, was 7") and wb-7u0r 10 (:71 "10 cases, was 9"). The five edits are the five refactors the title names: swallow the rejection (H1), stop awaiting (H2), build the tools without the check (H3), drop the per-call re-check (T1), move it after the dispatch (T2). The cut's own commit body quotes the gate's independent members on the cut #2 suite, in `red|green` over 9 cases:

```
$ git log -1 --format='%cI%n%b' c13cf1165fc28d433999a765b3fa48f973c52eac | grep -o -E 'control 0\|21 \(21 cases: 12 process-kill \+ 9 Claude-host\)|G01-GH7 3\|6, G04-GH6 3\|6|G23-GH1 3\|6, G24-GH2 3\|6, G25-GH3 5\|4, G26-GH4 3\|6, G27-GH5 1\|8|other gate members 10/10 red|the cut.s own suites 9/9 \(Claude-host\) and 12/12 \(process-kill\)'
control 0|21 (21 cases: 12 process-kill + 9 Claude-host)
G01-GH7 3|6, G04-GH6 3|6
other gate members 10/10 red
G23-GH1 3|6, G24-GH2 3|6, G25-GH3 5|4, G26-GH4 3|6, G27-GH5 1|8
the cut's own suites 9/9 (Claude-host) and 12/12 (process-kill)
```

So GH1-GH7 red 3, 3, 5, 3, 1, 3 and 3 of 9 rows (7 of 7 members red; the commit is dated 2026-11-10T02:35:27Z and is an ancestor of trunk, `git merge-base --is-ancestor` rc 0). CONFIRMED is the grade for "the receipt and the commit body say this"; the reproduction grade is PLAUSIBLE because this seat ran no mutant and no vitest - the throwaway copies (`/tmp/fw-ws16-7wkb-mut`, the archive under `~/s3/artifacts/flywheel/gate-prep-1/2026-11-10-wb-7wkb-g10-gate-s264-prep`) were not opened.

## Finding 5 - the gate of record M:71500 ran the suite 9/9 on the tree `36af3a68df73` that `c13cf1165` carries, and the L1083 gate M:72009 ran it 10/10 after the RECEIPT-ROWS case - **CONFIRMED**

```
$ sed -n '71500p' machines/flywheel/ledger/metrics.jsonl | python3 -I -c '...'      # read-only, by line number
  kind: gate-pass   bead: wb-7wkb   utc: 2026-11-10T04:44:48Z   verdict: pass   verdictClass: PASS-WITH-TIMING-NOTE
  commit: c13cf1165fc28d433999a765b3fa48f973c52eac   gatedTree: 36af3a68df73aa101ee1ec8435b66a556487bc20   commandId: cmd_48b330998ab4   seat: gate-prep-6   run: g10-gate-s266
  wallSeconds: 546.86   gateSeconds: 2723
  cutSuiteInGate: {"run2": {"test/workbench-claude-host-revocation-falsifiers.test.ts": "9/9 passed", "test/worktree-process-kill-preservation.test.ts": "12/12 passed"}, "run1": {"test/worktree-process-kill-preservation.test.ts": "12 tests passed (7315 ms)", "test/workbench-claude-host-revocation-falsifiers.test.ts": "9 tests passed (513 ms)"}}
  testCountDelta.reading: "+21 tests = the cut's two added suites (Claude-host 9 + process-kill 12)"   (29013 -> 29034, 574 -> 576 files)
  testTally: 576 files passed (576); 29024 passed | 1 expected fail | 7 skipped | 2 todo (29034); duration 428.54 s; vitest JSON numFailedTests 0, 3189/3189 suites, success true; 0 timeout markers in the run-2 gate log
$ git rev-parse 'c13cf1165fc28d433999a765b3fa48f973c52eac^{tree}'
36af3a68df73aa101ee1ec8435b66a556487bc20
$ sed -n '72009p' machines/flywheel/ledger/metrics.jsonl | python3 -I -c '...'
  kind: gate-pass   bead: wb-7u0r   utc: 2026-11-10T08:13:14Z   verdict: pass   verdictClass: PASS-WITH-TIMING-NOTE   commit: 9389a0a3e44e4a4a23475ae06b99a786370010f6   commandId: cmd_8d69af661967   wallSeconds: 797.139
  cutSuiteInGate: {"test/worktree-process-kill-preservation.test.ts": "✓ test/worktree-process-kill-preservation.test.ts (13 tests) 5359ms", "test/workbench-claude-host-revocation-falsifiers.test.ts": "✓ test/workbench-claude-host-revocation-falsifiers.test.ts (10 tests) 464ms"}
  testCountDelta.reading: "+2 = the cut's two added cases (process-kill 12->13, Claude-host 9->10)"   (29034 -> 29036)
```

The `python3 -I -c '...'` reader prints selected fields of the row; the `key: value` layout above is the reader's and each value is verbatim from the row. The gated tree equals the cut tip's tree, so the gate measured the bytes that landed. The timing note on M:71500 is run 1 (`cmd_c0782d091258`, not of record, `gateVerdict: FAIL`) under `loadAvgStart 152.02`, whose six reds (`run1.reds`) are three timeouts (`workbench-scratch-census.test.ts:712` `Hook timed out in 60000ms`, `workbench-retained-memory.test.ts:372` and `workbench-rf-federation-stamps-census.test.ts:1418` both `Test timed out in 5000ms`) and three report-mode echoes in `workbench-rf-census-run-pins.census.ts` (:375, :390, :471), all six in files outside the cut per the row's `r574Reading` ("every red file outside the cut"); this suite passed in run 1 too (`9 tests passed (513 ms)`). The landings: `37a01a345653d7f8b1ffcacde442716ddff66d27` 2026-11-10T04:45:34Z `landing 1082: wb-7wkb (machine/flywheel/wb-7wkb tip c13cf1165 onto trunk d35bc9fe9; land-prep gate of record under standing rule 22)` and `ec7db5e4a1f6241522609d6d4cda20efae58e644` 08:13:30Z `landing 1083: wb-7u0r (machine/flywheel/wb-7u0r tip 9389a0a3e onto trunk fbbbf6704; ...)`, both read with `git log -1 --format='%H %cI %s'`.

## Finding 6 - the boundary of the praise: the production `beforeDispatch` throws `IdentityConflictError` (code field, message without the code), the settle path prefixes the code (`claude-host.ts:222`) and the tool path does not (`claude-capability-tools.ts:107-109`), so a real revocation reaches the agent as a 100-byte preview with no `IDENTITY_CONFLICT` token - **CONFIRMED**

```
$ git grep -n -E 'beforeDispatch' d00c37429887a6a0bad010983074553b5601e976 -- src/index.ts
src/index.ts:3164:      let beforeDispatch: (() => void) | undefined;
src/index.ts:3176:        beforeDispatch = () => {
src/index.ts:3204:              beforeDispatch,
src/index.ts:3256:        try { beforeDispatch?.(); } catch (error) {
$ git show d00c37429887a6a0bad010983074553b5601e976:src/index.ts | sed -n '3176,3182p'
        beforeDispatch = () => {
          // Re-read operator settings and measured candidate; pinned settings
          // alone would hide a mid-run grant revocation from verification.
          const current = loadSettings(ctx.cwd).workbench ?? { workflowAgentBackend: "pi" as const };
          const check = invocationInput(ctx, task, current, descriptors);
          verifyInvocationIdentity(task.identityReceipt!, check);
        };
$ git show d00c37429887a6a0bad010983074553b5601e976:src/workbench/identity.ts | sed -n '85,87p;365,369p'
export class IdentityConflictError extends Error {
  readonly code = "IDENTITY_CONFLICT";
  constructor(message: string) {
export function verifyInvocationIdentity(snapshot: InvocationSnapshot, current: IdentityCaptureInput): InvocationIdentity {
  const observed = captureInvocationIdentity(current);
  if (canonicalJson(snapshot) !== canonicalJson(observed)) {
    throw new IdentityConflictError("Logical invocation basis changed: definition, artifacts, configuration, ABI, provider contract, principal or workspace source no longer matches its pinned snapshot.");
  }
```

Read against Findings 1 and 2: `claude-host.ts:222` builds the settle error as `` `${"code" in error ? String(error.code) + ": " : ""}${error.message}` ``, so a production refusal at admission settles the agent as `IDENTITY_CONFLICT: Logical invocation basis changed: ...` - the "CODE: message" shape the file's own comment names at :115. `claude-capability-tools.ts:108` reads only `error.message` and :109 keeps its first 100 bytes; the :368 message is 164 bytes (`python3 -I`: `len(m.encode("utf8"))` = 164), so the agent-facing `diagnostic` of a real mid-session revocation would be `Logical invocation basis changed: definition, artifacts, configuration, ABI, provider contract, prin` with `category: "transport"`, and the stable `code` is not in it. The suite cannot see this: its fixture throws a plain `Error` whose message is the code-prefixed `CONFLICT` literal (:80, :207), so `"code" in error` is false on the settle path and the two envelopes agree by construction. The suite says so itself (:59 NOT CLAIMED "src/index.ts's own producer"), and the registry's wb-7wkb scope line (receipt :6) claims no `src/` change. On its own post-run re-check the producer prefixes the token by hand (`src/index.ts:3256-3258`, `` failWorkflowTask(task, error instanceof Error ? `IDENTITY_CONFLICT: ${error.message}` : String(error)) ``), so of the three catch sites around a `beforeDispatch` call at the pin (`claude-host.ts:221`, `claude-capability-tools.ts:106`, `src/index.ts:3256`) the tool path alone keeps no token from an `IdentityConflictError`. Grades: the two catch sites, the thrower and the 164-byte length are CONFIRMED by `git show` at the pin; the exact runtime string is PLAUSIBLE because no revocation was executed and `redactWorkbenchText` (:108) was not exercised on that message. Severity is a separate axis: the refusal itself is correct and pinned; only the agent-facing text loses the code.

## Finding 7 - nit: the receipt's hollow table (:34-38) and the F2 fold-duty text name the two files bare (`claude-host.ts`, `claude-capability-tools.ts`) while the repo paths are `src/workbench/`; one hand resolution at the L1082 fold, and the rc 7 came from the duty's class, not its spelling - **CONFIRMED**

```
$ git ls-tree -r --name-only d00c37429887a6a0bad010983074553b5601e976 | grep -E '(^|/)(claude-host|claude-capability-tools)\.ts$'
src/workbench/claude-capability-tools.ts
src/workbench/claude-host.ts
```

The registry's idx 539/540 `reason` field quotes the duty verbatim: `- F2 LOW FOLD DUTY: a src-pinning entry for the two new suites (...) may be owed at this landing's fold: the process-kill suite pins src/worktree.ts cleanupWorktree's git step sequence by observation and the Claude-host suite pins claude-host.ts:221 and claude-capability-tools.ts:103, while state/landing-order-registry.json names neither suite nor wb-7wkb`. The suite itself imports the full path (`../src/workbench/claude-host.js`, :75), the receipt names the process-kill target with its path (`src/worktree.ts`, :8) but the Claude-host targets bare (:34-38), and the hand resolved them (`idx 540 readsNote`: "the duty's bare filenames resolve to src/workbench/ paths (git ls-tree at the merge; no root or src/ homonyms)"); the `grep` above is this seat's own repeat of that check at the pin, two hits and both under `src/workbench/`. The post-fold rc 7 at L1082 is attributed by the gate row's own readback to the duty's class, not to the paths: M:71500 `verdictNote.readback` reads `bin/fold-duties.sh --parse-only over the stored notes: verdict-class FINDING, gate-cmd named, 28 F-lines, F1 lead, F2 unclassified FOLD DUTY (rc 7, for the hand at the fold), F26 owner-routed`. Cost measured: one hand resolution inside the R-B756 closure (M:71599 05:16:46Z to the fold-done M:71612 05:18:32Z, 1 min 46 s between the two rows; the hand work before the ruling row is not timed by any row read here).

## Evidence

- Pin: `git fetch -q origin` rc 0; `git rev-parse origin/workbench/implementation-program` = `d00c37429887a6a0bad010983074553b5601e976`; `git log -1 --format='%H %cI %s'` = `... 2026-11-10T08:25:50Z ledger: close wb-7u0r (landing 1083, merge ec7db5e4)`; `git rev-parse d00c3742^{tree}` = `9ee10c0a444e68b5b3ddf53f69a9e84ceb7bd297`.
- Blobs at the pin (`git rev-parse <sha>:<path>` / `git show | wc -l`): `src/workbench/claude-host.ts` `baee92de0811` 396; `src/workbench/claude-capability-tools.ts` `bd01077895b1` 155; `test/workbench-claude-host-revocation-falsifiers.test.ts` `52ae340f50e6` 441; `test/worktree-process-kill-preservation.test.ts` `3e1ecd7c44f2` 573; `docs/workbench/receipts/wb-7wkb.md` `c8f547741829` 91; `qa/workbench/tracker-export.mjs` `2bcb1244e1a6` 1,076 (byte-identical to the 11-09 pin); `package.json` `c6bc33445204` 85.
- `src/workbench/claude-host.ts` at the pin: :48 option type; :115 comment "(same "CODE: message" shape as the beforeDispatch refusal)"; :221-223 the admission try/catch; :224-228 the `wb-a2g.5` comment; :229 abort re-check; :230-234 controller; :238-243 `createCuratedTools({... beforeDispatch: config.beforeDispatch })`; :377-385 `callNode` with `await config.beforeDispatch?.();` at :379 (see "What I did not establish").
- `src/workbench/claude-capability-tools.ts` at the pin: :23 type; :53 destructure; :90-116 `run()`, quoted in Finding 2.
- `src/workbench/identity.ts` at the pin: :85-91 `IdentityConflictError` with `readonly code = "IDENTITY_CONFLICT"`; :365-370 `verifyInvocationIdentity`; 35 `new IdentityConflictError(` sites in the file (`git grep -c`; 0 elsewhere under `src/`), none of whose messages begins with `IDENTITY_CONFLICT:` (`git grep -c -E 'new IdentityConflictError\(["`]IDENTITY_CONFLICT'` rc 1 against the 35-hit control). Other `IDENTITY_CONFLICT` literals in `src/` at the pin spell the token into a plain `Error` message (`src/index.ts:2565`, `:3185`; `src/workbench/hosts/local-detached.ts:341`, `:475`, `:693`, `:701`, `:703`, `:716`, `:718`, `:720`) or prefix it onto the task-failure string (`src/index.ts:3257`, `` failWorkflowTask(task, error instanceof Error ? `IDENTITY_CONFLICT: ${error.message}` : String(error)) ``, the post-run catch Finding 6 names).
- `test/workbench-claude-host-revocation-falsifiers.test.ts` at the pin: header :1-60; imports :68-77; `CONFLICT` :80; `THIS_FILE`/`SIBLING_FILE`/`RECEIPT` :102-105 (reads `../docs/workbench/receipts/wb-7wkb.md`); `ROSTER` :162-173; `revokeWriteGrant` :193, `changePrincipal` :197, `basisOf` :201, `reobserve` :206-208; `parkedAdmission` :228-245; `parkedTrial` :251-260 (host built at :255); registrations :269-427 quoted in Finding 3; assertions :276, :299, :380, :403.
- `docs/workbench/receipts/wb-7wkb.md` at the pin: :3 cut #1 header (seat ws-05, base `008e25c`); :6 "No file under `src/` changes"; :9 the suite's Rows list; :24-25 the two falsifier items; :26-38 the failed-case matrix (control 18 of 18); :49-65 cut #2 (seat ws-16, run g10-work-s286; :52 "9 cases, was 7"; :63 control 21 of 21, "All 14 source-only members of the refusal archive are red (GH1 to GH7, GW1 to GW6, and GW4 twice)"); :67-91 the wb-7u0r follow-up (seat ws-08, run g10-work-s292; :71 "10 cases, was 9"; :78 control 23 of 23; :84 Claude-host CT battery `CT1 red=2; CT1b red=2; CT2 red=1; CT3 red=1; CT4 red=2; CT5 red=2; CT6 red=2`).
- Cut tip `c13cf1165fc28d433999a765b3fa48f973c52eac` (2026-11-10T02:35:27Z; tree `36af3a68df73aa101ee1ec8435b66a556487bc20`; ancestor of trunk rc 0): subject `test(worktree,claude-host): wb-7wkb cut #2 - read the Claude-host counts at a 50 ms quiescence point ... so gate members GH6, GH7, GW6 and GW4 red (wb-7wkb)`; body quoted in Finding 4; its green line names `8039 of 8039 tests passed, 0 failed, rc 0` over 185 files on the seat's targeted list.
- Ledger rows, read by line number from `machines/flywheel/ledger/metrics.jsonl` (72,114 lines at read time): M:71500 gate-pass wb-7wkb; M:71599 ruling-bound R-B756; M:71612 fold-done L1082; M:72009 gate-pass wb-7u0r; M:72049 ruling-bound R-B758 (08:33:44Z and 08:34:14Z, after the window's 08:25Z end; read at measurement time 08:57-09:08Z). Fields quoted in Findings 5 and 7 and in the registry bullet below.
- Machine-side producer evidence, not a tool finding (machine state; no pi-subagents disposition owed on it): the flywheel registry `machines/flywheel/state/landing-order-registry.json` (543 entries, read with `python3 -I` over `json.load`) binds this census to the two source files. idx 540 (L1082, R-B756 M:71599, class READER-NAMED, roster null) reads `["src/workbench/claude-host.ts", "src/workbench/claude-capability-tools.ts"]`, `readsAddedUtc` 2026-11-10T05:17:20Z, `readsNote` "the suite pins the claude-host.ts beforeDispatch catch (:221) and the claude-capability-tools.ts per-call recheck (:103) through capability_invoke IDENTITY_CONFLICT rows; the duty's bare filenames resolve to src/workbench/ paths (git ls-tree at the merge; no root or src/ homonyms)". Refreshed as idx 542 (L1083, R-B758 M:72049), which adds `docs/workbench/receipts/wb-7wkb.md` to the reads, carries `supersedes {"census": "test/workbench-claude-host-revocation-falsifiers.test.ts", "addedAtLanding": 1082}` and `readsNote` "refresh of idx 540 (R-B756): adds docs/workbench/receipts/wb-7wkb.md, whose Rows lists the suite reads per falsifier row; the two src pins unchanged" (08:33:44Z and 08:34:14Z, after the window's 08:25Z end; read at measurement time 08:57-09:08Z). The sibling entry is idx 539 (`test/worktree-process-kill-preservation.test.ts`, reads `[src/worktree.ts]`), refreshed as idx 541. Context: a later landing whose cut touches either source file is routed to this census by the registry, so the pin of Findings 1-3 is also an ordering fact at the landing queue - of the machine's queue, not of the tool.
- Prior art listing counts: 41 entries at the ref; 49 distinct across the ref and the five unlanded branches; greps in the metadata block.

## Suggested fixes, cheapest first

1. **Read `code` on the tool path as the settle path does** - one expression at `src/workbench/claude-capability-tools.ts:108`: build `diagnostic` from `` `${"code" in error ? String(error.code) + ": " : ""}${error.message}` `` before redaction, so a production `IdentityConflictError` reaches the agent as `IDENTITY_CONFLICT: Logical invocation basis changed: ...` inside the same 100-byte preview (code first, so the token survives the cut). The suite's WRITE rows stay green as written: the fixture's plain `Error` has no `code` property, so its `diagnostic` is unchanged. A red-first test is one `it.each` row that passes an `IdentityConflictError` (or any `Error` with a `code`) from `beforeDispatch` and expects the token at the head of `diagnostic`. This fixes the asymmetry of Finding 6 and nothing else.
2. **Spell the two Claude-host targets with their paths in the receipt and in fold-duty text** - `docs/workbench/receipts/wb-7wkb.md` is append-only (standing rule 15), so this is a convention for the next receipt and for the gate's F-line composer: `src/workbench/claude-host.ts:221`, as the same receipt already does for `src/worktree.ts` (:8) and as `docs/workbench/programs/mechanical-workflows-interop-2026-11-04/01-audit-and-evidence.md:39` does (`src/workbench/claude-host.ts:207-220`). Removes the hand resolution of Finding 7; does not touch the rc 7, which is the duty-class gap on the machine side.
3. **Name the agent-facing refusal envelope in the operator docs** - `docs/workbench/feature-matrix.md:62` lists the `CapabilityError` taxonomy (`validation / authorization / unavailable / transport / uncertain-effect`) and `docs/workbench/05-script-language-and-runtime.md:57` the typed error across worker RPC; neither says that a host basis-check throw (not a `CapabilityError`) reaches a curated tool caller as `category: "transport"` with `isError: true`, and at the pin the only document carrying `IDENTITY_CONFLICT` under `docs/` is the wb-7wkb receipt (`git grep -l -F IDENTITY_CONFLICT <pin> -- docs/` = 1 file). One sentence beside the taxonomy makes the pinned envelope a contract rather than a test literal. Structural alternative, not recommended here: a dedicated category for identity refusals would change the envelope the suite pins at :380/:403 and the `transport` reading the fixture relies on.

## Positives worth protecting

- **The admission await lives inside the `try` and the catch returns before anything is allocated** (`claude-host.ts:221-223`, Finding 1). The refactors that would lose it are the receipt's H1 (swallow the rejection) and H2 (stop awaiting); each reds `PARK-REVOKE-GRANT` and `PARK-CHANGE-PRINCIPAL` (2 of 7 cut #1 rows) and the gate's GH1/GH2 members (3 of 9 cut #2 rows each). Moving the `await` after the controller (:230) or the tools (:238) would also silently allocate on a refused agent; keep the order.
- **The per-call re-check is awaited before `dispatch` and after input validation** (`claude-capability-tools.ts:101-105`, Finding 2). The receipt's T1 (drop it) and T2 (move it after the dispatch) each red 2 or 3 of 7 rows; the gate's GH3 reds 5 of 9. The second abort check at :104 after the `await` is the same discipline as `claude-host.ts:229` and is worth keeping with it.
- **The curated tools inherit the host's `beforeDispatch` by hand-off** (`claude-host.ts:242` -> `claude-capability-tools.ts:53`), so a single host-owned basis function governs admission and every tool call; H3 (build the tools without it) reds 3 of 7 rows. A refactor that threads a second, tool-local check would split the basis.
- **The exact envelopes are pinned by a suite that drives the real host and a real MCP client** (:255, :71-72; assertions :276, :299, :380, :403), and the suite holds itself to the receipt from outside its own literals (`RECEIPT-ROWS` :409 and `ROSTER` :427 read `docs/workbench/receipts/wb-7wkb.md`; the receipt's CT6 reads `2 failed and 7 passed` only after wb-7u0r, :79). Renaming a row or shortening a title reds `ROSTER` (CT2/CT3 `red=1`, :84).
- **`claude-host.ts:222` keeps the stable code ahead of the message** - the "CODE: message" shape the file's :115 comment promises - and is the half of the pair that Finding 6 asks the tool path to match.

## What I did not establish

- No test, mutant or gate ran under this seat: every red/green figure is quoted from `docs/workbench/receipts/wb-7wkb.md`, the `c13cf1165` commit body and ledger rows M:71500/M:72009. Re-running the five Claude-host mutants at the pin (one edit each, `vitest run test/workbench-claude-host-revocation-falsifiers.test.ts --reporter=json`) is the artifact that would lift Finding 4's reproduction grade from PLAUSIBLE.
- Finding 6's runtime string was computed, not observed: `redactWorkbenchText` (`claude-capability-tools.ts:108`) was not exercised on the :368 message, and no live revocation was driven through `src/index.ts:3176-3182`. A one-off run with a settings change between admission and a `capability_invoke` call would settle it.
- The `callNode` path (`claude-host.ts:377-385`) also awaits `config.beforeDispatch` (:379) with no catch of its own; this suite has 0 references to `callNode`, and which other suite pins that await was not read (`git grep -l callNode <pin> -- test/` lists 8 files, none opened).
- The live tiers that reach the real SDK child (`workbench-claude-control-live`, `workbench-detached-control-live`, `workbench-furnace-hosted-real`, excluded by `vitest.config.ts:27` per the `c13cf1165` body) were not run and are out of this file's claim, as they are out of the suite's (:55-60).
- The hand's own clock at the L1082 fold (how long the bare-filename resolution took before R-B756 was written) is not recorded in any row read here; the 1 min 46 s of Finding 7 spans the ruling row to the fold-done row only.
- Registry entries were read from the machine's working state, not from a commit; whether idx 541/542 are committed to the machine repository was not checked.

## Postscript - two things noticed while filing, not this file's claim

- Lead 2 of the orchestrator's packet, measured here and filed separately by a sibling seat of this run as its own 2026-11-10 ci.yml/engines file (its final filename is set at delivery; that file is the home of the claim, and this bullet only records the same reading from this seat's own probe): `package.json:4-5` at the pin reads `"engines": { "node": ">=24" }`, while `.github/workflows/ci.yml` pins `node-version: 22` at :16, :51 and :72 (`actions/setup-node@v4`), and the sibling suite's child runs with `--experimental-strip-types` (`test/worktree-process-kill-preservation.test.ts:87` `NODE_FLAGS`). Reads so at `d00c3742`; graded in the sibling file. Whether CI's Node 22 accepts that flag for this suite was not run. Prior art at the ref: filename and body greps for `engines`, `node-version`, `strip-types`, `setup-node` all 0.
- `docs/workbench/programs/mechanical-workflows-interop-2026-11-04/01-audit-and-evidence.md:39` cites `src/workbench/claude-host.ts:207-220` for the `beforeDispatch` await; at the pin the await is at :221. A dated program document, so drift is expected; recorded so a reader who follows that citation knows which line to read.
