# wb-5ik5: [MWI-preserve] P0 preserve edited worktrees when Git preservation fails

## 2026-11-06 receipt: a failed preservation step keeps the edited worktree and returns a typed preservation-failed result, which each AgentManager path that cleans up stores (machine seat ws-02, cut #2, base fd90f9d)

- Program and requirements: mechanical-workflows-interop-2026-11-04, slice PI-0, B-preserve. EAT-R001, EAT-R002 and EAT-R003 are read from `triage/requirements/ATOMIC-REQUIREMENTS.md` at pi-subagents master `0b25e14e`; their rows in `TDD-MATRIX.md` at the same pin say `not run`. The triage pages are not on trunk at this base.
- Cuts: cut #1 (`e76448ea`, base 600a253) was refused at the gate as refusal #1 (ledger row M:61581; guard row R-B650, M:61586) because its claim words were wider than its pins. Cut #2 merges trunk fd90f9d into the branch, cures that refusal's four unmet items (U1 to U4, below) and corrects the wording its finding F2 names.
- Surface:
  - `src/worktree.ts`: `WorktreeCleanupResult` is three typed variants: clean, preserved to a branch, and preservation failed (`hasChanges: true`, `preservationFailed: true`, `path`, `diagnostic`). When the status, add, commit, `rev-parse HEAD` or branch step fails, the outer catch keeps the worktree and returns the failed variant. On trunk that catch force-removes the worktree and returns `{ hasChanges: false }`. Cut #2 changes only this file's comments.
  - `src/types.ts`: `AgentRecord.worktreeResult` has the cleanup result type. Cut #2 changes only its comment.
  - `src/agent-manager.ts`: when cleanup returned the failed variant, the settlement of a resolved run appends the note `preservationFailureNote` builds to the record's result. Cut #2 changes only comments here.
  - `test/worktree.test.ts`: C1 and C2 are corrected under the ruling below, byte-stable since cut #1. The describe block added for EAT-R001 and EAT-R002 gains, in cut #2, an add row, a `rev-parse HEAD` case, four diagnostic rows and a no-branch check on each row of its table.
  - `test/worktree-preservation-failure-e2e.test.ts` (new): EAT-R003 through the real extension, and the exact text of the note.
  - `test/worktree-preservation-settlement.test.ts` (new in cut #2): the three AgentManager paths that store a cleanup result.
  - `docs/workbench/16-repository-refactor.md` (cut #2): three rows in the measured fork divergence table record `src/agent-manager.ts`, `src/types.ts` and `src/worktree.ts` at cut #1's commit `e76448e`, the first commit at which each differs from the baseline.
- Specification ruling, cited verbatim (`BEAD-PLAN.md:8` at `0b25e14e`: "the ruling is part of the cut receipt"). Ledger row M:61188, ruling-received, 2026-11-06T13:22:34Z:

  > OWNER SPECIFICATION RULING (cross-session, Pi-Subagents Sr. Engineer acting for the user, 2026-11-06 ~13:3xZ) on the wb-5ik5 B-preserve conflict (blocked row M:60570; the pre-ordered route per M:60495): option (A) GRANTED - correct C1/C2 and land EAT-R001..R003 in ONE cut. BASIS: test/worktree.test.ts C1 (:413/:428) and C2 (:432/:445) are characterization tests that FROZE the P0 defect - they assert the false-clean hasChanges:false report the triage established as the bug (C0168/C0171 ESTABLISHED; EAT-R002's mutant guard is literally that assertion); correcting them under this explicit ruling is a SPECIFICATION correction, not a weakening - the replacements are STRICTLY STRONGER. BINDING CONDITIONS on the cut and its receipt: (1) the C1/C2 replacement assertions are strictly stronger (typed preservation-failed variant + recovery path + byte-retention assertions replacing the false-clean assertion; corrections only, no deletions; the before/after diff of BOTH tests quoted in the receipt with this ruling cited verbatim per BEAD-PLAN.md:8); (2) red-first evidence preserved as measured (the 5|27 by-construction base red + each requirement's mutant guard demonstrated red: outer-catch force-remove restore, failure-branch hasChanges:false return, caller-projection variant drop); (3) scope = only C1/C2 + the one measured C2 trackScratch hygiene line, no other existing test changes; (4) EAT-R003's caller-projection leg lands in the same cut as drafted. Resume from the held ws-06-wb-5ik5 worktree. Execution: ruling appended to the bead notes, dead claim check + reopen for store pick.

- C1 and C2, before and after (the `cleanupWorktree — failure path` block of `test/worktree.test.ts`, `git diff` against trunk fd90f9d; the file has the same blob at 600a253, where cut #1 measured it). Each replaced assertion is the false-clean `expect(result.hasChanges).toBe(false)`. Each replacement asserts the typed variant, the recovery path, the kept directory, the kept bytes and git's diagnostic. Both `expect(result.branch).toBeUndefined()` lines are kept. The describe comment is rewritten to state the corrected contract, as option (A) proposed. C2 gains one line, `trackScratch(wt.path)`, because the kept worktree is now the test's to remove. No other existing test changes. Cut #2 leaves these lines byte-stable.

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

- Refusal #1, each unmet item and the pins that cure it:
  - U1, the settlement leg with a caller-supplied cwd and the repo the note names: `test/worktree-preservation-settlement.test.ts` drives the settlement of a resolved run at each of the five statuses a resolved run settles with, once with a caller-supplied cwd and once in the parent session's own cwd. The note ends with that cwd as the repo in the first mode and names no repo in the second. The real-extension case in `test/worktree-preservation-failure-e2e.test.ts` also checks that the note names no repo. GA1, GA2 and GA3 are each red on this cut.
  - U2, the label layout and the shared sanitizer for the repo and the diagnostic: `test/worktree-preservation-failure-e2e.test.ts` plants eight witnesses in each of the three values, one value at a time, and pins the exact note for each. GA4, GA5, GA6 and GA7 are each red on this cut.
  - U3, the add step: the EAT-R002 table gains an add row. GA12 is red on this cut.
  - U4, the rejected-run record: the settlement file drives a run that rejects after its worktree was edited, in both cwd modes. The record holds the failed variant, and the record's result stays unset. The note's doc comment now says the settlement of a rejected run appends none, and the record field's doc comment names each of the three paths that store a cleanup result. GA16 is red on this cut.
  - F2: the scope sentences below end "NOT CLAIMED by this cut".
  - Found by this cut, not by the refusal: with cut #1 committed on the branch, `test/workbench-upstream-divergence.test.ts` "the repository record equals the measured divergence from the TRACEABILITY baseline" failed on cut #2's first full default-tier pass, naming the three src files as unrecorded divergences. The docs/16 rows above make it green.
- Pinned reader set. Every case is green on this cut.
  - `test/workbench-upstream-divergence.test.ts` "upstream fork divergence record (docs/workbench/16 Upstream maintainability) > the repository record equals the measured divergence from the TRACEABILITY baseline": the docs/16 record names every path in that test's scope that HEAD modifies against the baseline, each at an ancestor commit of HEAD where the path already differed from it.
  - `test/worktree.test.ts`, block `cleanupWorktree — failure path`:
    - "answers a git failure inside a still-present worktree with the typed preservation-failed result and keeps the worktree" (C1). git fails for real on a broken `.git` link. Asserts `hasChanges` true, `preservationFailed` true, `path` equal to the worktree, the directory present, the `work.txt` bytes kept, a diagnostic containing "not a git repository", and no branch.
    - "answers a failed preservation commit with the typed preservation-failed result and keeps the worktree" (C2). The same targets, with an injected commit failure whose stderr is `boom`.
  - `test/worktree.test.ts`, block `cleanupWorktree — preservation failure keeps the edited bytes`:
    - "keeps the worktree and its exact bytes when the preservation commit fails" (EAT-R001, commit leg). No `pi-agent-*` ref, the worktree present, and the exact bytes of the edited tracked README and the untracked file.
    - "keeps the worktree and its committed bytes when every branch name is refused" (EAT-R001, branch-exhaustion leg). Both names are tried (the agent's own and the suffixed retry), no ref exists, the worktree is present, and its HEAD commit holds both files' exact bytes.
    - "a failed commit step / a failed status step / a failed branch step / a failed add step is not answered with the clean result" (EAT-R002, four rows). The result equals `{ hasChanges: true, preservationFailed: true, path, diagnostic: "boom" }`, the directory and the bytes are kept, no `pi-agent-<id>*` ref exists, and a JSON round trip is strict-equal to that variant ("serialization preserves that variant").
    - "a failed `rev-parse HEAD` after the agent committed its own work is answered with the failed variant and keeps that commit". The same variant, no ref, the worktree present, and its HEAD commit holds both files' exact bytes.
    - "the diagnostic of a failed commit with ..." (four rows). Stderr spanning lines gives that stderr trimmed and whole; no stderr, or stderr of only whitespace, with exit 1 gives `git commit --no-verify -m pi-agent: commit fails failed (exit 1)`; no stderr from a killed call gives the same text ending `(exit 0)`.
  - `test/worktree-preservation-failure-e2e.test.ts`:
    - "worktree preservation failure through the real agent settlement path (EAT-R003) > keeps the edited worktree; the record and the Agent result name the kept path and git's failure, and the note names no repo". A real git repo, a real pi-mono session, the real extension and the real `createWorktree`/`cleanupWorktree`, on a faux model pinned `live: false`, with no module mocked. The child's own bash command edits the tracked README, adds an untracked file and leaves a stale `index.lock` in its worktree's git directory. The record, read through the manager handle by the Agent result's agent id, holds the failed variant with the kept path, and its diagnostic equals what `git add -A` writes to stderr, trimmed, in the kept worktree, which names "index.lock". The kept directory exists and holds the exact bytes, and no `pi-agent-*` branch exists. The Agent result names the failure, the kept path and "index.lock", does not contain "Changes saved to branch", and contains the note's closing sentence with the kept path and no repo after it.
    - Block "preservationFailureNote renders the diagnostic, the kept path and the repo with sanitizeWorkbenchText's label layout": "renders this case's escape sequences, BEL and line break as the label layout does", "names the repo whenever one is passed, an empty one included", "leaves the repo out when called without one", and the 24 rows "the <value> with <witness>". Each pins the exact note text. The witnesses, planted in the diagnostic, the path and the repo in turn: an escape sequence between two words, a line break, a BEL between two words, a zero-width space, padding and a run of spaces, an obviously fake bearer credential, the same credential glued on by an escape sequence, and 2100 characters.
  - `test/worktree-preservation-settlement.test.ts`, block "AgentManager paths that store a cleanup result, each driven to a preservation failure (wb-5ik5, EAT-R003)", once "with a caller-supplied cwd" and once "with the parent session's own cwd". Real git, the real `AgentManager`, the real `runAgent` and a real pi-mono child session on a faux model, with no module mocked.
    - "a run that resolves as 'completed' / 'steered' / 'aborted' / 'error' / 'stopped': the record holds the failed variant and the result ends with the note" (five rows). The record's status is that status. The record holds the failed variant, whose diagnostic equals what `git add -A` writes to stderr, trimmed, in the kept worktree. The kept path holds the exact bytes, no `pi-agent-*` branch exists, and the note appears once, at the end of the result, ending with the kept path and then the repo (a caller-supplied cwd) or nothing (the parent session's own cwd).
    - "a rejected run: the record holds the failed variant as cleanup returned it, and no result text is set". The caller's `onSessionCreated` edits the worktree, leaves the stale `index.lock` and throws, so `runAgent` rejects. The record's status is `error`, it holds the same failed variant, the kept path holds the exact bytes, and `record.result` is undefined.
    - "a stop that lands while the worktree is being created: the record holds the failed variant cleanup returned". The pi given to the manager answers `git status` with a failure whose stderr is `boom`. The record's status is `stopped`, it holds the failed variant with diagnostic `boom`, the worktree is kept, and `record.result` is undefined.
- Red first, as measured. Command: `env -u CLAUDECODE NO_COLOR=1 VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/worktree.test.ts test/worktree-preservation-failure-e2e.test.ts test/worktree-preservation-settlement.test.ts`.
  - Cut #1: the held draft (seat ws-06; worktree `ws-06-wb-5ik5`; mirror `~/s3/artifacts/flywheel/ws-06/2026-11-06-wb-5ik5-spec-ruling-request/`) measured 5 failed | 27 passed (32) at c4e8f826, and the same at 600a253. Cut #1's tests against trunk src (600a253) gave 10 failed | 25 passed (35).
  - Cut #2: these three files against trunk src (`src/agent-manager.ts`, `src/types.ts` and `src/worktree.ts` at their fd90f9d blobs, then restored sha256-identical) gave 55 failed | 25 passed (80):
    - `test/worktree.test.ts`, 13 failed | 25 passed (38): C1 and C2, the two EAT-R001 cases and the four EAT-R002 rows read `hasChanges` false or a removed worktree; the `rev-parse HEAD` case and the four diagnostic rows read `{ hasChanges: false }`.
    - `test/worktree-preservation-failure-e2e.test.ts`, 28 failed (28): after the real settlement path the worktree directory is gone, and `preservationFailureNote` is not a function at base in the 27 note cases.
    - `test/worktree-preservation-settlement.test.ts`, 14 failed (14): on every path the worktree directory is gone.
- Green: 80 of 80 on the same command.
- Mutant guards. Each mutant was applied in place and restored sha256-identical, and each run used the command above. 46 of 46 are killed:
  - Refusal #1's nine realized hollows, with the gate's own edits: GA1 5 failed, GA2 6, GA3 5, GA4 5, GA5 4, GA6 7, GA7 4, GA12 1, GA16 2. Its record-only hollow GA13 (finding F3): 14.
  - The three the ruling names: the outer-catch force removal restored, 23; the failure branch returning `{ hasChanges: false }`, 26; the caller projection dropping the typed variant, run in two halves, the note dropped 11 and the record variant dropped 11.
  - Cut #1's other seven: the diagnostic emptied 26, the path dropped from the variant 26, the `preservationFailed` tag dropped 26, the note losing the kept path 38, the note bypassing the sanitizer 25, the note losing the diagnostic 38, a failed status step read as clean 3.
  - Twenty-four against cut #2's words: the stop-during-copy store dropping the variant 2; a failed `rev-parse HEAD` read as an unmoved HEAD 1; the note gated on status completed 8, and skipped for stopped 2, error 2, steered 2 and aborted 2; the rejected settlement appending the note 2; the repo gated on status completed 4; the label bound set to 300, 3; the terminal layout for every value 10; the path through the lines layout 6 and the text layout 5; the diagnostic through the lines layout 6 and through a local strip then redact 6; the path through a local strip 8; the repo through a local strip with a space, collapse and redact 1; the git helper's message without its exit code 3; a killed call read as a success 2; the rejected store dropping the variant for a caller-supplied cwd only 1; the stop-during-copy store doing the same 1; the failed variant naming a branch 26; the note appended twice 10; an empty repo left out 1; the note prepended 4.
  - The paired witness file of refusal #1 (WIT-A to WIT-H, archived with that gate's evidence) was copied into this cut's worktree as a throwaway, run, and removed: 8 of 8 passed.
- Display path: the preservation-failure note in the record's result (`preservationFailureNote` in `src/agent-manager.ts`), added by cut #1. Its diagnostic, kept path and repo each go through `sanitizeWorkbenchText(value, WORKBENCH_TEXT_LIMIT, "label")`. Cut #2 adds no display path. The collapsed-readings corpus, `test/workbench-sanitizer-corpus.test.ts`, was re-run on cut #2: 3771 of 3771.
- NOT CLAIMED:
  - What `src/index.ts` shows for a run that rejects is NOT CLAIMED by this cut. The cases pin only that the record's result stays unset on that path.
  - The docs that finding F1 names are unchanged: `README.md:865` ("The worktree directory is removed on completion either way") and the Agent tool description at `src/index.ts:1612` ("The worktree is removed when the agent finishes") and `:1616` ("removed on completion"). Correcting them is NOT CLAIMED by this cut.
  - What the workflow host's `childCwd` reports after a failed preservation is NOT CLAIMED by this cut. No workflow test drives a failed preservation.
