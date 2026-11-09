# wb-5ik5: [MWI-preserve] P0 preserve edited worktrees when Git preservation fails

## 2026-11-07 receipt: a failed preservation step keeps the edited worktree and returns a typed preservation-failed result, the three AgentManager paths that clean up store it, and the resolved settlement appends its note (machine seat ws-02, cut #3, base fd90f9d)

- Program and requirements: mechanical-workflows-interop-2026-11-04, slice PI-0, B-preserve. EAT-R001, EAT-R002 and EAT-R003 are read from `triage/requirements/ATOMIC-REQUIREMENTS.md` at pi-subagents master `0b25e14e`; their rows in `TDD-MATRIX.md` at the same pin say `not run`. The triage pages are not on trunk at this base.
- Cuts and refusals: cut #1 (`e76448ea`, base 600a253) was refused as refusal #1 (ledger row M:61581; guard row R-B650, M:61586) because its claim words were wider than its pins. Cut #2 (`eff69178`, base fd90f9d) cured that refusal's members and was refused as refusal #2 (ledger row M:61854): the R-B650 claim-word set failed again through six new one-edit members (GP1, GP1b, GP2, GS1, GS2, GK1), so its second-stage cap is engaged (typed at R-B662, ledger row M:61879) and cut #3 takes the enumerate-the-resolvable form. Each claim below names the rows that pin it and claims nothing wider; the named residuals carry pinned quiet rows; every other form is NOT CLAIMED by this cut.
- Surface:
  - `src/worktree.ts`: `WorktreeCleanupResult` is three typed variants: clean, preserved to a branch, and preservation failed (`hasChanges: true`, `preservationFailed: true`, `path`, `diagnostic`). On trunk the outer catch of `cleanupWorktree` force-removes the worktree and returns `{ hasChanges: false }`; on this cut it keeps the worktree and returns the failed variant. Cut #3 changes only this file's comments.
  - `src/types.ts`: `AgentRecord.worktreeResult` has the cleanup result type. Cut #3 changes only its comment.
  - `src/agent-manager.ts`: `preservationFailureNote` builds the note, and the settlement of a resolved run appends it to the record's result when cleanup returned the failed variant. Cut #3 changes only comments here.
  - `test/worktree.test.ts`: C1 and C2 are corrected under the ruling below and are byte-stable since cut #1. The describe block this bead added (`cleanupWorktree — preservation failure keeps the edited bytes`) holds the PF rows; cut #3 adds the 40 PF-M rows and gives every PF row an id and the same full set of assertions.
  - `test/worktree-preservation-failure-e2e.test.ts`: E2E-R003 through the real extension, and the NOTE rows.
  - `test/worktree-preservation-settlement.test.ts`: the ST rows, in four cwd modes since cut #3.
  - `docs/workbench/16-repository-refactor.md`: three rows of the measured fork divergence table record `src/agent-manager.ts`, `src/types.ts` and `src/worktree.ts` at cut #1's commit `e76448e`. Cut #3 corrects their notes to the numstat at `e76448e` against the baseline: +19 -1, +6 -2 and +47 -11 (refusal #2, finding F2).
- Specification ruling, cited verbatim (`BEAD-PLAN.md:8` at `0b25e14e`: "the ruling is part of the cut receipt"). Ledger row M:61188, ruling-received, 2026-11-06T13:22:34Z:

  > OWNER SPECIFICATION RULING (cross-session, Pi-Subagents Sr. Engineer acting for the user, 2026-11-06 ~13:3xZ) on the wb-5ik5 B-preserve conflict (blocked row M:60570; the pre-ordered route per M:60495): option (A) GRANTED - correct C1/C2 and land EAT-R001..R003 in ONE cut. BASIS: test/worktree.test.ts C1 (:413/:428) and C2 (:432/:445) are characterization tests that FROZE the P0 defect - they assert the false-clean hasChanges:false report the triage established as the bug (C0168/C0171 ESTABLISHED; EAT-R002's mutant guard is literally that assertion); correcting them under this explicit ruling is a SPECIFICATION correction, not a weakening - the replacements are STRICTLY STRONGER. BINDING CONDITIONS on the cut and its receipt: (1) the C1/C2 replacement assertions are strictly stronger (typed preservation-failed variant + recovery path + byte-retention assertions replacing the false-clean assertion; corrections only, no deletions; the before/after diff of BOTH tests quoted in the receipt with this ruling cited verbatim per BEAD-PLAN.md:8); (2) red-first evidence preserved as measured (the 5|27 by-construction base red + each requirement's mutant guard demonstrated red: outer-catch force-remove restore, failure-branch hasChanges:false return, caller-projection variant drop); (3) scope = only C1/C2 + the one measured C2 trackScratch hygiene line, no other existing test changes; (4) EAT-R003's caller-projection leg lands in the same cut as drafted. Resume from the held ws-06-wb-5ik5 worktree. Execution: ruling appended to the bead notes, dead claim check + reopen for store pick.

- C1 and C2, before and after (the `cleanupWorktree — failure path` block of `test/worktree.test.ts`, `git diff` against trunk fd90f9d; the file has the same blob at 600a253, where cut #1 measured it). Each replaced assertion is the false-clean `expect(result.hasChanges).toBe(false)`. Each replacement asserts the typed variant, the recovery path, the kept directory, the kept bytes and git's diagnostic. Both `expect(result.branch).toBeUndefined()` lines are kept. The describe comment is rewritten to state the corrected contract, as option (A) proposed. C2 gains one line, `trackScratch(wt.path)`, because the kept worktree is now the test's to remove. No other existing test changes. Cuts #2 and #3 leave these lines byte-stable.

```diff
@@ -380,11 +381,13 @@ describe("worktree", () => {
   });
 });
 
-// cleanupWorktree's outer catch is the only place in the repo where a caught
-// error can DESTROY user work while reporting success-shaped output: it removes
-// the worktree and returns `{ hasChanges: false }`, which the manager renders as
-// "the agent changed nothing". If the commit or branch step fails, the agent's
-// commits go with the worktree and nobody is told.
+// cleanupWorktree's outer catch is where a failed preservation step lands. It
+// used to remove the worktree and return `{ hasChanges: false }`, which the
+// manager rendered as "the agent changed nothing": a failed commit, status or
+// branch step destroyed the agent's work and nobody was told. The corrected
+// contract (EAT-R001/EAT-R002; wb-5ik5, owner specification ruling M:61188)
+// keeps the worktree and answers with the typed preservation-failed result:
+// its path is the recovery path and its diagnostic carries git's failure text.
 describe("cleanupWorktree — failure path", () => {
   let repoDir: string;
   let pi: ExtensionAPI;
@@ -410,12 +413,13 @@ describe("cleanupWorktree — failure path", () => {
     expect(result.branch).toBeUndefined();
   });
 
-  it("swallows a git failure inside a still-present worktree and reports no changes", async () => {
+  it("answers a git failure inside a still-present worktree with the typed preservation-failed result and keeps the worktree", async () => {
     // The outer catch. The directory exists — so the existsSync guard above
     // does not fire — but git cannot operate in it, which is what a corrupted
-    // or externally-detached worktree looks like. The agent's work is lost
-    // either way; what matters is that cleanup does not reject out of the
-    // manager's settle path and take the whole record down with it.
+    // or externally-detached worktree looks like. Cleanup keeps the worktree,
+    // so the agent's work stays at the recovery path, and it still resolves
+    // rather than rejecting out of the manager's settle path and taking the
+    // whole record down with it.
     const wt = (await createWorktree(pi, repoDir, "corrupt"))!;
     // git can no longer remove this worktree once its link is broken, so the directory is ours to remove.
     trackScratch(wt.path);
@@ -425,14 +429,20 @@ describe("cleanupWorktree — failure path", () => {
 
     const result = await cleanupWorktree(pi, repoDir, wt, "corrupted agent");
 
-    expect(result.hasChanges).toBe(false);
+    expect(result.hasChanges).toBe(true);
+    expect(result.preservationFailed).toBe(true);
+    expect(result.path).toBe(wt.path);
+    expect(existsSync(wt.path)).toBe(true);
+    expect(await readFile(join(wt.path, "work.txt"), "utf-8")).toBe("agent output");
+    expect(result.diagnostic).toContain("not a git repository");
     expect(result.branch).toBeUndefined();
   });
 
-  it("reports no changes when the preservation commit fails", async () => {
+  it("answers a failed preservation commit with the typed preservation-failed result and keeps the worktree", async () => {
     // `git commit` failing resolves with a non-zero code rather than throwing,
     // so the outer catch is only reached if the result is inspected.
     const wt = (await createWorktree(pi, repoDir, "commit-fails"))!;
+    trackScratch(wt.path); // the worktree is kept now, so the directory is the test's to remove
     writeFileSync(join(wt.path, "work.txt"), "agent output");
 
     const result = await cleanupWorktree(
@@ -442,7 +452,12 @@ describe("cleanupWorktree — failure path", () => {
       "commit fails",
     );
 
-    expect(result.hasChanges).toBe(false);
+    expect(result.hasChanges).toBe(true);
+    expect(result.preservationFailed).toBe(true);
+    expect(result.path).toBe(wt.path);
+    expect(existsSync(wt.path)).toBe(true);
+    expect(await readFile(join(wt.path, "work.txt"), "utf-8")).toBe("agent output");
+    expect(result.diagnostic).toContain("boom");
     expect(result.branch).toBeUndefined();
   });
 
```

- Refusal #2, each unmet item and the pins that cure it:
  - U1, the note at the settlement call site (GP1, GP1b, GP2): every ST-RESOLVED row and ST-RESOLVED-PLANTED pins the record's whole result, the run's reply followed by the exact note for the stored diagnostic and the kept path, with the repo the cwd mode gives; the real diagnostic spans lines. Two of the four modes create the worktree from the repo's pkg subdirectory, where workPath is not the worktree's root. E2E-R003 pins the Agent result's tail the same way. GP1 and GP1b each fail 25 rows, GP2 12.
  - U2, the stop during worktree creation (GS1, GS2): ST-STOP, in each mode, answers `git status --porcelain` with PLANTED_STDERR (padded, two lines, mixed case, an escape sequence, a tab, a double space and a non-ASCII letter) and pins the stored variant exactly. GS1 and GS2 each fail 4 rows.
  - U3, a killed call that wrote stderr (GK1): the five PF-M-<step>-killed-stderr rows plant PLANTED_STDERR on a killed call at each step. GK1 fails 5 rows.
  - Finding F3 (GB2): the PF-M-branch rows answer the agent's own branch name with FIRST_REFUSAL and the suffixed retry with each shape, and pin the retry's failure as the diagnostic. GB2 fails 8 rows.
  - Finding F2: the docs/16 notes above.
  - Finding F4: against the merge-base fd90f9d this receipt is ADDED (numstat deletions 0); it rewrites cut #2's un-landed text.
  - Finding F1 is not cured: `README.md:865` and the Agent tool description at `src/index.ts:1612` and `:1616` are unchanged (see NOT CLAIMED).
  - Refusal #1's unmet items U1 to U4 stay cured: its nine realized members (GA1 to GA7, GA12, GA16) and GA13 are each red on cut #3 (counts under Mutant guards).
- Pinned reader set, every case by file and case id. Each case is green on this cut (142 of 142 in the three files):
  - `test/worktree.test.ts`, block `cleanupWorktree — failure path` (C1 and C2, byte-stable since cut #1):
    - C1, "answers a git failure inside a still-present worktree with the typed preservation-failed result and keeps the worktree": git fails for real on a broken `.git` link. Asserts `hasChanges` true, `preservationFailed` true, `path` equal to the worktree, the directory present, the `work.txt` bytes kept, a diagnostic containing "not a git repository", and no branch.
    - C2, "answers a failed preservation commit with the typed preservation-failed result and keeps the worktree": the same targets, with an injected commit failure whose stderr is `boom`.
  - `test/worktree.test.ts`, block `cleanupWorktree — preservation failure keeps the edited bytes`. Every PF row asserts the same set: the result is exactly `{ hasChanges: true, preservationFailed: true, path, diagnostic }` with `path` the worktree's root and the diagnostic the row names; a JSON round trip keeps it; the directory is kept with the exact bytes of an edited tracked file and a new untracked one (on disk, or in the kept HEAD commit once the agent's work was committed); no `pi-agent-<id>*` ref exists.
    - PF-R001-COMMIT (EAT-R001, commit leg): a failed commit, stderr `boom`.
    - PF-R001-BRANCH (EAT-R001, branch-exhaustion leg): both branch names refused with stderr `boom`, the agent's own and then the suffixed retry, both tried; the bytes are in the kept HEAD commit.
    - PF-R002-commit, PF-R002-status, PF-R002-branch and PF-R002-add (EAT-R002): that step answered with stderr `boom`.
    - PF-REVPARSE: `git rev-parse HEAD` failing with stderr `boom` after the agent committed its own work.
    - PF-DIAG-1 to PF-DIAG-4: a failed commit with stderr spanning lines (the diagnostic is that stderr, trimmed), with no stderr and exit 1, with stderr of only whitespace and exit 1, and with no stderr from a killed call (exit 0); the last three give `git commit --no-verify -m pi-agent: commit fails failed (exit <code>)`.
    - PF-M-<step>-<shape>, 40 rows: step is each of status, add, commit, rev-parse and branch, and shape each of stderr (PLANTED_STDERR, exit 1), no-stderr (exit 128), blank-stderr (exit 1), killed (no stderr), killed-stderr (PLANTED_STDERR), rejects (an Error carrying PLANTED_STDERR), rejects-blank (an Error with a blank message) and rejects-value (PLANTED_STDERR as a non-Error rejection). The worktree is created from the repo's pkg subdirectory, so its workPath is not its root. The diagnostic is PLANTED_STDERR trimmed for stderr, killed-stderr, rejects and rejects-value; `git <args> failed (exit <code>)` with the failing call's argv for no-stderr, blank-stderr and killed; and "git failed without a message" for rejects-blank. The planted calls are exactly the step's argv; for the branch step they are the agent's own name, answered with FIRST_REFUSAL, then the suffixed retry, whose failure is the diagnostic.
  - `test/worktree-preservation-failure-e2e.test.ts`:
    - E2E-R003, "keeps the edited worktree; the record holds the failed variant, and the Agent result ends with the reply and the exact note": a foreground Agent call with worktree isolation from the parent session's own cwd at the repo root, through a real git repo, a real pi-mono session, the real extension and the real `createWorktree`/`cleanupWorktree` on a faux model pinned `live: false`, with no module mocked. The child's own bash command edits the tracked README, adds an untracked file and leaves a stale `index.lock`. The record, read through the manager handle by the Agent result's agent id, holds exactly the failed variant with the kept path and, as its diagnostic, what `git add -A` writes to stderr in the kept worktree, trimmed, which names "index.lock" and spans lines. The kept directory holds the exact bytes, no `pi-agent-*` branch exists, the Agent result does not contain "Changes saved to branch", and it ends with the child's reply followed by the exact note for that diagnostic and the kept path, with no repo.
    - NOTE-ESCAPES, NOTE-EMPTY-REPO, NOTE-NO-REPO and the 24 rows NOTE-<value>-<witness> (value each of diagnostic, path and repo; witness each of escape, line-break, bel, zero-width-space, padding, credential, glued-credential and long): the exact note text for each planted input.
  - `test/worktree-preservation-settlement.test.ts`, block "AgentManager paths that store a cleanup result, each driven to a preservation failure (wb-5ik5, EAT-R003)", each row once in each of four cwd modes: a caller-supplied cwd at the repo root, a caller-supplied cwd in the repo's pkg subdirectory, the parent session's own cwd at the repo root, and the parent session's own cwd in pkg. Real git, the real `AgentManager`, the real `runAgent` and a real pi-mono child session on a faux model, with no module mocked.
    - ST-RESOLVED-completed, -steered, -aborted, -error and -stopped: the run settles with that status (error carries the provider failure); the record holds exactly the failed variant with the worktree's root as path and, as its diagnostic, what `git add -A` writes to stderr in the kept worktree, trimmed, which spans lines; the kept directory holds the child's exact bytes; no `pi-agent-*` branch exists; the record's result is exactly the run's reply (the child's marker for completed and steered, empty for the other three) followed by the exact note for that diagnostic and the kept path, with the caller-supplied cwd as the repo, or no repo for the parent session's own cwd.
    - ST-RESOLVED-PLANTED: a completed run whose `git add -A` is answered with PLANTED_STDERR: the stored diagnostic is PLANTED_STDERR trimmed, and the result is the reply followed by its note.
    - ST-REJECTED (the stale index.lock) and ST-REJECTED-PLANTED (`git add -A` answered with PLANTED_STDERR): the caller's `onSessionCreated` edits the worktree and throws, so `runAgent` rejects. Status `error` with the thrown message as the error; the record holds exactly the failed variant; the kept directory holds the exact bytes; no `pi-agent-*` branch; `record.result` is undefined.
    - ST-STOP: a stop lands while the worktree is being created, and `git status --porcelain` is answered with PLANTED_STDERR. Status `stopped`; the record holds exactly the failed variant with PLANTED_STDERR trimmed; the directory is kept; no `pi-agent-*` branch; `record.result` is undefined.
    - In every ST row the expected note is built in the test from `sanitizeWorkbenchText`'s label layout, never from `preservationFailureNote`.
  - `test/workbench-upstream-divergence.test.ts`, "upstream fork divergence record (docs/workbench/16 Upstream maintainability) > the repository record equals the measured divergence from the TRACEABILITY baseline": the docs/16 record names every path in that test's scope that HEAD modifies against the baseline, each at an ancestor commit of HEAD where the path already differed from it.
- Named residuals, each a pinned quiet row that reds once a note appears there:
  - R-REJECTED-NOTE: the settlement of a rejected run stores the failed variant but appends no note naming the kept worktree. Quiet rows: ST-REJECTED and ST-REJECTED-PLANTED, in each mode, assert that `record.result` is undefined.
  - R-STOP-NOTE: a stop during worktree creation stores the failed variant but leaves no note. Quiet row: ST-STOP, in each mode, asserts that `record.result` is undefined.
- NOT CLAIMED by this cut:
  - Steps, failures, failure texts, statuses and cwd modes other than those the rows above plant; a clean or a preserved result on the rejected path or the stop path.
  - What `src/index.ts` shows from the record, beyond the tail of E2E-R003's Agent result.
  - The docs that finding F1 names, `README.md:865` ("The worktree directory is removed on completion either way") and the Agent tool description at `src/index.ts:1612` ("The worktree is removed when the agent finishes") and `:1616` ("removed on completion"); correcting them is not part of this cut.
  - What the workflow host's `childCwd` reports after a failed preservation.
- Red first, as measured. Command: `env -u CLAUDECODE NO_COLOR=1 VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/worktree.test.ts test/worktree-preservation-failure-e2e.test.ts test/worktree-preservation-settlement.test.ts`.
  - Cut #1: the held draft (seat ws-06; worktree `ws-06-wb-5ik5`; mirror `~/s3/artifacts/flywheel/ws-06/2026-11-06-wb-5ik5-spec-ruling-request/`) measured 5 failed | 27 passed (32) at c4e8f826, and the same at 600a253. Cut #1's tests against trunk src (600a253) gave 10 failed | 25 passed (35).
  - Cut #2: its three files against trunk src (fd90f9d) gave 55 failed | 25 passed (80).
  - Cut #3: the three files against trunk src (`src/agent-manager.ts`, `src/types.ts` and `src/worktree.ts` at their fd90f9d blobs, then restored sha256-identical) give 117 failed | 25 passed (142): `test/worktree.test.ts` 53 failed | 25 passed (78), the e2e file 28 failed (28), the settlement file 36 failed (36). Each of refusal #2's seven members, applied to the cut, gives 0 failed | 80 passed against cut #2's three files (the gate's survivors reproduced) and is red against cut #3's: GP1 25 failed, GP1b 25, GP2 12, GS1 4, GS2 4, GK1 5, GB2 8.
- Green: 142 of 142 on the same command.
- Mutant guards. Each mutant was applied in place and restored sha256-identical (src and the three test files), and each ran the command above against cut #3's files. 66 of 66 are red; the count is failed rows of 142:
  - The three the ruling names: the outer-catch force removal restored (M1) 89; the failure branch returning `{ hasChanges: false }` (M2) 90; the caller projection dropping the typed variant, run in two halves, the note dropped (M3a) 25 and the record variant dropped (M3b) 25.
  - Refusal #2's members, byte for byte from that gate's archived instrument: GP1 25, GP1b 25, GP2 12, GS1 4, GS2 4, GK1 5, GB2 8.
  - Refusal #1's members from the same instrument: GA1 12, GA2 13, GA3 12, GA4 5, GA5 4, GA6 7, GA7 8, GA12 17, GA13 58, GA16 8. The instrument's other members: M4 90, M5 90, M6 90, M7 52, M8 50, M9 52, M10 13, SN1 4, SN2 9, SN3 16, SN8 8, SN20 18, SN21 12, SN28 90, SN29 25, SN31 13.
  - Twenty-nine against cut #3's words: the git helper's stderr not trimmed 6; its message without the call's argv 18; its exit code read as 1 11; a non-Error rejection read as empty 5; the diagnostic's trim dropped 15; the blank-failure text changed 5; the variant's path set to workPath 58; the worktree removed for a failure ending "(exit 0)" 6; the diagnostic lower-cased 63; escape sequences stripped from it 32; its whitespace collapsed 58; its non-ASCII letters stripped 32; a failure whose text spans lines answered with the clean result 58; the branch retry not attempted 11; a failed commit ignored 15; the note replacing the result 13; the note's repo set to the parent session's cwd 12 and to the worktree's path 12; the error status's note carrying the record's error 4; the note skipped for an empty reply 12; the branch note shown for any change 25; the resolved store stripping escapes 4; the rejected store stripping non-ASCII letters 4; the stop store collapsing whitespace 4; the resolved store's path set to workPath 12; the rejected store's path set to workPath 4; the stop path appending a note 4; the note's text limit 4000 3; the note naming only the diagnostic's first line 27.
- Display path: the preservation-failure note in the record's result (`preservationFailureNote` in `src/agent-manager.ts`), added by cut #1. Its diagnostic, kept path and repo each go through `sanitizeWorkbenchText(value, WORKBENCH_TEXT_LIMIT, "label")`. Cut #3 adds no display path. The collapsed-readings corpus, `test/workbench-sanitizer-corpus.test.ts`, was re-run on cut #3 (count in the delivery note).

## 2026-11-07 cut #4: every PF row reads each ref name of the repo for `pi-agent-<id>` and pins that cleanup's failure path leaves every listed ref as it was (machine seat ws-02, cut #4, base fd90f9d)

- Refusal #3 (ledger row M:61972, outbox O:2235; guard row R-B667, M:61984) left one unmet item, U1. The words "no `pi-agent-<id>*` ref exists" (the PF block header in `test/worktree.test.ts`, the "no ref" of the PF-M row title and line 111 of this receipt) were wider than their pin, `git branch --list pi-agent-<id>*`, which lists branches only. Its members GP32-T1 (the outer catch tags HEAD as `pi-agent-<id>`) and GP32-T3 (it writes `refs/pi/pi-agent-<id>`) kept the three files green. GP32-T2 (it writes `refs/heads/kept/pi-agent-<id>`) did the same, read against "no preservation branch exists" in the `WorktreePreservationFailedResult` doc of `src/worktree.ts`.
- Cure, by pins; no claim word changes. Those words, every src comment, the PF block header, C1 and C2 and every line of the entry above are byte-stable since cut #3. Cut #4 changes only the PF block of `test/worktree.test.ts` (two helpers, and two assertions in each of its 51 rows) and adds this entry:
  - `preservationRefs(agentId)` returns the ref names and git-directory file paths of the repo that contain `pi-agent-<agentId>` in any letter case. It reads each refname `git for-each-ref` lists from the repo (every refs/ namespace, packed or loose) and the path of every file in the repo's git directory, with each worktree's admin directory read from its own root, so the admin directory's own name (`pi-agent-<id>-<suffix>`) is not read as a ref. It therefore reads tags, refs/pi and every other namespace, branches whose names only contain the id, the loose refs of every worktree (refs/worktree/* and refs/bisect/* included) and names outside refs/. It first asserts the files ref backend, under which every loose ref and every name outside refs/ is a file of that directory. Every PF row asserts that it returns "".
  - `refsSnapshot(wt.path)` is every ref `git for-each-ref` lists from the repo and from the kept worktree, each with the object it names. Every PF row takes it before cleanup and asserts it unchanged after. So in every PF form the failure path adds, moves and removes none of those refs and leaves no branch of any name behind; this pins "no preservation branch exists" (GP32-T2).
- Red first, as measured with the command above. Each member was applied in place and the files were restored sha256-identical after each run.
  - GP32-T1, GP32-T2 and GP32-T3, byte for byte from refusal #3's archived instrument: each 0 failed | 142 passed against cut #3's three files (the gate's survivors reproduced) and 51 failed | 91 passed against cut #4's (every PF row).
  - Thirteen seat members, each written into the outer catch the same way, each 0 failed | 142 passed against cut #3's files and red against cut #4's. Each fails 51 rows: `refs/worktree/pi-agent-<id>` and `refs/bisect/pi-agent-<id>` written from the kept worktree, the name `pi-agent-<id>` outside refs/, the nested name `kept/pi-agent-<id>` outside refs/, a branch `kept-work`, an annotated tag `pi-agent-<id>-<ms>`, a remote-tracking ref, a refs/pi ref that is then packed, a note on HEAD, a branch `kept-pi-agent-<id>`, the name `worktrees/pi-agent-<id>/kept`, and the name `pi-agent-<id>` in capitals. The main worktree's branch moved to the kept HEAD fails 19 rows: those whose kept HEAD is the agent's commit. In the other rows the kept HEAD is the commit that branch already names, so the move changes nothing.
  - Each pin alone, on throwaway copies. With the snapshot assertions removed, the census still fails GP32-T1, GP32-T2 and GP32-T3 in 51 rows each, while the branch `kept-work`, the note and the moved branch pass. With the census reverted to `git branch --list`, the snapshot still fails GP32-T1, GP32-T2, GP32-T3 and the refs/worktree member in 51 rows each, while the four names outside refs/ pass. Both pins are needed.
  - The three files against trunk src (fd90f9d): 117 failed | 25 passed (142).
- Green: 142 of 142 on the same command.
- Mutant guards: the 66 members of cut #3's battery, re-run against cut #4's files, are each red with the counts the entry above lists for cut #3. Refusal #3's remaining probes: GP32-D1 fails 5 rows and GP32-N1 1; GP32-H1 and GP32-K1 pass, read as equivalent at refusal #3 (finding F3).
- NOT CLAIMED by cut #4: a ref outside refs/ whose name does not contain `pi-agent-<id>`, such as a per-worktree pseudo-ref `PI_AGENT_KEPT` (a seat control member: it passes against cut #4's files); refs kept by a ref backend other than files; refs of any repository other than the one the worktree was made from.
- Display path: cut #4 adds none.

## 2026-11-07 wb-x6be: a correction of the cut #4 entry's scope sentence, and the three isolation docs lines the first entry left NOT CLAIMED, rewritten (the landing-1017 gate's F2 and F1; machine seat ws-04, base 7f54a59)

- Origin: wb-x6be is the R694 follow-up of this bead's landing 1017 (gate cmd_a2ec8e9322a6, PASS-WITH-FINDING). Finding F1 (MEDIUM) leads and finding F2 (LOW) rides.
- Correction (F2). The cut #4 entry above says "Cut #4 changes only the PF block of `test/worktree.test.ts` (two helpers, and two assertions in each of its 51 rows) and adds this entry". Measured with `git diff --numstat 75fd1f72 8721c0f1 -- test/worktree.test.ts` (55 added, 10 deleted), cut #4 changes that file in these places:
  - the `node:fs/promises` import at line 3, outside the PF block, which gains `readdir`;
  - three helpers of the PF block: `repoGit` is added, `preservationRefs` is rewritten and `refsSnapshot` is added;
  - each of the PF block's six test bodies (PF-R001-COMMIT, PF-R001-BRANCH, the PF-R002 table, PF-REVPARSE, the PF-DIAG table and the PF-M matrix, which give its 51 rows): one `refsBefore` capture line is added, the `preservationRefs` assertion is rewritten to await the helper, and one `refsSnapshot` assertion is added.
- The corrected sentence carries no behaviour claim (the finding's reading), and no other line of that entry changes. This entry is appended; no earlier line of this receipt is removed or rewritten.
- Docs truth (F1). The first entry's NOT CLAIMED list names three lines that said the worktree is removed in every case, which is false when Git preservation fails and the worktree is kept. The wb-x6be cut rewrites each one:
  - `README.md:865`, "The worktree directory is removed on completion either way — what differs is whether a branch is left behind:", now reads "On completion the worktree directory is removed, unless Git preservation fails (the last case below); otherwise what differs is whether a branch is left behind:". The case list under it gains that last case: "**Git preservation fails:** if checking for, committing or branching the changes fails, no branch is created and the worktree directory is kept instead of removed, with the agent's work in it".
  - The full Agent tool description's isolation bullet (`src/index.ts:1612`), "The worktree is removed when the agent finishes; if it made changes, they are committed to a branch and the branch is named in the result.", now reads "When the agent finishes, any changes it made are committed to a branch named in the result and the worktree is removed; if Git preservation fails, no branch is created and the worktree is kept instead, with the agent's work in it."
  - The compact description's isolation bullet (`src/index.ts:1616`), "(removed on completion); changes land on a branch named in the result.", now reads "; on completion, changes land on a branch named in the result and the worktree is removed, but if Git preservation fails, the worktree is kept and no branch is created."
- Pinned reader set: `test/tool-description-mode.test.ts`, block "the isolation docs lines for a failed Git preservation (wb-x6be)", three cases, each green on this cut:
  - `the full description has one isolation bullet, FULL_ISOLATION_BULLET, and no "The worktree is removed when the agent finishes"`: the default (full) Agent description, read from the real extension, has exactly one line that starts `- Use isolation: "worktree"`, that line is the new bullet, and the description does not contain the old sentence.
  - `the compact description has one isolation bullet, COMPACT_ISOLATION_BULLET, and no "(removed on completion)"`: the same for the compact description and its line that starts `- isolation: "worktree"`.
  - `README.md's Worktree Isolation section holds README_ISOLATION_BLOCK, and README.md has no "The worktree directory is removed on completion either way"`: inside that section, before its next heading, the paragraph line and its four case lines read as above and are followed by a blank line, and the old sentence is nowhere in the file.
- The three cases pin the words only. For the forms the PF rows plant, those rows pin the failed-preservation behaviour the new words describe.
- Red first, measured with `env -u CLAUDECODE NO_COLOR=1 VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/tool-description-mode.test.ts`: the three cases against the `README.md` and `src/index.ts` of base 2dab885, and again of base 13bb82a after trunk was merged in (both files are unchanged from 13bb82a to 7f54a59, the base this branch merges), give 3 failed | 28 passed (31) each time, each failure a deep-equal failure. Green: 31 of 31 on the cut.
- Mutant guards: eight mutants, each applied in place and restored sha256-identical, each fail exactly one of the three cases (1 failed | 30 passed): each of the three old lines restored, the new case line removed, the old README sentence planted under the next heading, a fifth case line appended to the list, the full isolation bullet duplicated, and "(removed on completion)" planted in the compact description's resume bullet.
- NOT CLAIMED by the wb-x6be cut: the clause that a branch is named in the result, which both bullets keep from their old text; what the Agent result says after a failed preservation; any other text about removing a worktree, such as the workflow `agent()` description in `src/workflow/tool-description.ts` ("the worktree is removed when the agent settles") and its header comment, `examples/workflows/gated-fix.js` and the comments of `src/worktree.ts` and `src/workflow/runtime.ts`; `CHANGELOG.md`.
- Display path: none added. The two edited `src/index.ts` lines are static description text with no value interpolated.
