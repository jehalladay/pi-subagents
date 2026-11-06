# wb-5ik5: [MWI-preserve] P0 preserve edited worktrees when Git preservation fails

## 2026-11-06 receipt: a failed preservation step keeps the edited worktree and answers with a typed preservation-failed result (machine seat ws-02, base 600a253)

- Program and requirements: mechanical-workflows-interop-2026-11-04, slice PI-0, B-preserve. EAT-R001, EAT-R002 and EAT-R003 are read from `triage/requirements/ATOMIC-REQUIREMENTS.md` at pi-subagents master `0b25e14e`; their rows in `TDD-MATRIX.md` at the same pin say `not run`. The triage pages are not on trunk at this base.
- Surface:
  - `src/worktree.ts`: `WorktreeCleanupResult` is now three typed variants: clean, preserved to a branch, and preservation failed (`hasChanges: true`, `preservationFailed: true`, `path`, `diagnostic`). When a status, add, commit or branch step fails, the outer catch keeps the worktree and returns the failed variant with git's own failure text. Before this cut it force-removed the worktree and returned `{ hasChanges: false }`.
  - `src/types.ts`: `AgentRecord.worktreeResult` has the cleanup result type, so the record keeps each variant as cleanup returned it.
  - `src/agent-manager.ts`: on the settlement path, a failed variant appends a note to the result. The note, from `preservationFailureNote`, names git's failure and the kept worktree path.
  - `test/worktree.test.ts`: C1 and C2 are corrected under the ruling below, and one describe block is added for EAT-R001 and EAT-R002.
  - `test/worktree-preservation-failure-e2e.test.ts` (new): EAT-R003 runs through the real settlement path, and two cases cover the note's display path.
- Specification ruling, cited verbatim (`BEAD-PLAN.md:8` at `0b25e14e`: "the ruling is part of the cut receipt"). Ledger row M:61188, ruling-received, 2026-11-06T13:22:34Z:

  > OWNER SPECIFICATION RULING (cross-session, Pi-Subagents Sr. Engineer acting for the user, 2026-11-06 ~13:3xZ) on the wb-5ik5 B-preserve conflict (blocked row M:60570; the pre-ordered route per M:60495): option (A) GRANTED - correct C1/C2 and land EAT-R001..R003 in ONE cut. BASIS: test/worktree.test.ts C1 (:413/:428) and C2 (:432/:445) are characterization tests that FROZE the P0 defect - they assert the false-clean hasChanges:false report the triage established as the bug (C0168/C0171 ESTABLISHED; EAT-R002's mutant guard is literally that assertion); correcting them under this explicit ruling is a SPECIFICATION correction, not a weakening - the replacements are STRICTLY STRONGER. BINDING CONDITIONS on the cut and its receipt: (1) the C1/C2 replacement assertions are strictly stronger (typed preservation-failed variant + recovery path + byte-retention assertions replacing the false-clean assertion; corrections only, no deletions; the before/after diff of BOTH tests quoted in the receipt with this ruling cited verbatim per BEAD-PLAN.md:8); (2) red-first evidence preserved as measured (the 5|27 by-construction base red + each requirement's mutant guard demonstrated red: outer-catch force-remove restore, failure-branch hasChanges:false return, caller-projection variant drop); (3) scope = only C1/C2 + the one measured C2 trackScratch hygiene line, no other existing test changes; (4) EAT-R003's caller-projection leg lands in the same cut as drafted. Resume from the held ws-06-wb-5ik5 worktree. Execution: ruling appended to the bead notes, dead claim check + reopen for store pick.

- C1 and C2, before and after (the `cleanupWorktree — failure path` block of `test/worktree.test.ts`, `git diff` against trunk 600a253). Each replaced assertion is the false-clean `expect(result.hasChanges).toBe(false)`. Each replacement asserts the typed variant, the recovery path, the kept directory, the kept bytes and git's diagnostic. Both `expect(result.branch).toBeUndefined()` lines are kept. The describe comment is rewritten to state the corrected contract, as option (A) proposed. C2 gains one line, `trackScratch(wt.path)`, because the kept worktree is now the test's to remove. No other existing test changes.

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

- Pinned reader set. Every case is green on this cut and was red against trunk src:
  - `test/worktree.test.ts` "cleanupWorktree — failure path > answers a git failure inside a still-present worktree with the typed preservation-failed result and keeps the worktree" (C1). Target: cleanup after git fails for real on a broken `.git` link. Asserts `hasChanges` true, `preservationFailed` true, `path` equal to the worktree, the directory present, `work.txt` bytes kept, a diagnostic containing "not a git repository", and no branch.
  - The same block, "answers a failed preservation commit with the typed preservation-failed result and keeps the worktree" (C2). The same targets, with an injected commit failure whose stderr is `boom`.
  - "cleanupWorktree — preservation failure keeps the edited bytes > keeps the worktree and its exact bytes when the preservation commit fails" (EAT-R001, commit leg). No `pi-agent-*` ref, the worktree present, and the exact bytes of the edited tracked README and the untracked file.
  - The same block, "keeps the worktree and its committed bytes when every branch name is refused" (EAT-R001, branch-exhaustion leg). Both names are tried (the agent's own and the suffixed retry), no ref exists, the worktree is present, and its HEAD commit holds both files' exact bytes.
  - The same block, "a failed commit step / a failed status step / a failed branch step is not answered with the clean result" (EAT-R002, three rows). The result equals `{ hasChanges: true, preservationFailed: true, path, diagnostic: "boom" }`, the directory and bytes are kept, and a JSON round trip is strict-equal to that variant ("serialization preserves that variant").
  - `test/worktree-preservation-failure-e2e.test.ts` "worktree preservation failure through the real agent settlement path (EAT-R003) > keeps the edited worktree, and the record and the Agent result name the kept path and git's failure". See EAT-R003 below.
  - The same file, "the preservation-failure note is a sanitized display path (EAT-R003 caller projection) > routes the diagnostic, the kept path and the repo through the single-line label layout" and "names no repo when the worktree belongs to the parent session's own". Each pins the exact note text.
- Red first, as measured. Command: `env -u CLAUDECODE VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/worktree.test.ts test/worktree-preservation-failure-e2e.test.ts`.
  - The held draft (seat ws-06; worktree `ws-06-wb-5ik5`; mirror `~/s3/artifacts/flywheel/ws-06/2026-11-06-wb-5ik5-spec-ruling-request/`) measured 5 failed | 27 passed (32) at c4e8f826. Re-measured at 600a253 as held, it gave 5 failed | 27 passed (32).
  - This cut's tests against trunk src (600a253; src reverted, then restored sha256-identical) gave 10 failed | 25 passed (35):
    - C1 and C2: `hasChanges` false.
    - The two EAT-R001 cases: the worktree was removed.
    - The three EAT-R002 rows: `hasChanges` false.
    - The EAT-R003 case: after the real settlement path, the record holds `{ hasChanges: false }`.
    - The two note cases: the helper does not exist at base. They were authored after the first implementation pass.
- Green: 35 of 35 on the same command.
- Mutant guards. Each mutant was applied in place and restored byte-identical (sha256 checked):
  - The three the ruling names:
    - Restoring the outer-catch force removal (EAT-R001): 7 failed.
    - The failure branch returning `{ hasChanges: false }` (EAT-R002): 6 failed.
    - The caller projection dropping the typed variant (EAT-R003), run in two halves: dropping the note gives 1 failed, and dropping the variant from the record gives 1 failed.
  - Seven more: the diagnostic emptied (6), the recovery path dropped from the variant (6), the `preservationFailed` tag dropped (6), the note losing the kept path (3), the note bypassing the shared sanitizer (1), the note losing the diagnostic (3), and a failed status step read as clean (1).
  - 11 of 11 killed.
- EAT-R003 runs through the real stack: a real git repo, a real pi-mono session, the real extension and the real `createWorktree`/`cleanupWorktree`, on a faux model pinned `live: false`. No module is mocked.
  - The child's own bash command edits the tracked README, adds an untracked file and leaves a stale `index.lock` in its worktree's git directory. `git status` still reads the tree, and the preservation's `git add` fails with git's own message.
  - The record, read through the manager handle by the Agent result's agent id, holds the failed variant naming the kept path.
  - The kept path holds the exact bytes, and no `pi-agent-*` branch exists.
  - The Agent result names the failure and the kept path. It does not contain "Changes saved to branch".
- Display path added: the preservation-failure note in the settled result.
  - The diagnostic, the kept path and the caller-cwd repo each go through `sanitizeWorkbenchText(value, WORKBENCH_TEXT_LIMIT, "label")`.
  - The two note cases pin the exact output: an escape sequence, a BEL and a line break in those values never reach the reader.
  - The collapsed-readings corpus, `test/workbench-sanitizer-corpus.test.ts`, was re-run on this cut: 3771 of 3771.
- NOT CLAIMED:
  - The rejected-run settlement path is NOT CLAIMED by this census. That is the `.catch` branch, entered when the run itself rejects. It keeps the typed variant on the record and displays no note, just as it displays no branch note today.
  - The Agent tool description's sentence that the worktree is removed when the agent finishes is NOT CLAIMED by this census; it is unchanged.
  - The workflow host's `childCwd` now reports a kept worktree's path, because that directory exists. No workflow test drives a failed preservation, so that reading is NOT CLAIMED by this census.
