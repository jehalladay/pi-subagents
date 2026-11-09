# wb-7wkb: [MNI-2026-11-09 P01] Safety-foundation falsifier expansion incl. host-death evidence (EAT-R211..R216)

## 2026-11-09 receipt: a process-kill preservation trial for EAT-R215, Claude-host falsifiers for a basis change during a parked admission and for the final write call, the preserved fixes named, and EAT-R216 typed BLOCKED (machine seat ws-05, cut #1, base 008e25c)

- Program and requirements: mechanical-native-interoperability-2026-11-09, packet P01, epic wb-rhyt. EAT-R211 to EAT-R216 are read from `docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/ATOMIC-REQUIREMENTS.md` and the packet from `docs/programs/mechanical-native-interoperability-2026-11-09/02-IMPLEMENTATION-PACKAGES.md` section P01, both at pi-subagents master `18b016b2`. The program pages are not on trunk at this base. At that pin the TDD-MATRIX rows of EAT-R211 to EAT-R216 read NOT_RUN for their gates.
- Scope: component-level only. This cut does not claim the registered Mechanical function route. No file under `src/` changes: the packet says to edit its listed sources only if a test fails, and every row below passes on trunk `008e25c` as found.
- Surface:
  - `test/worktree-process-kill-preservation.test.ts` (new), EAT-R215. A child Node process imports the real `src/worktree.ts`, makes a worktree of a scratch repo, writes a tracked edit and an untracked file, and runs the real `cleanupWorktree`, parked at one git step. A separate verifier process reads the before snapshot, the test sends SIGKILL to the child, and a fresh verifier process runs the real `pruneWorktrees` and reads the after snapshot. Rows: KILL-ROWS K1 to K5 (parked at git status, add, commit, branch and worktree remove), FULL-RUN, KILL-SHAPE, MUTANT-ROWS M-REMOVE and M-WIPE, JUDGE-ROWS, and ROSTER (the file's registered tests, bound to its header's row ids).
  - `test/workbench-claude-host-revocation-falsifiers.test.ts` (new), two items of the packet's falsifier list, measured at the real `createClaudeWorkflowHost` through its fixture query seam. Rows: PARK-REVOKE-GRANT, PARK-CHANGE-PRINCIPAL, PARK-CONTROL, WRITE-REVOKE-GRANT, WRITE-CHANGE-PRINCIPAL, WRITE-CONTROL, and ROSTER (the file's registered tests, bound to its header's row ids).
  - This receipt.
- Requirement dispositions at this cut:

| Requirement | Disposition | Evidence |
| --- | --- | --- |
| EAT-R211 | preserved, not edited | `test/workbench-detached-grants.test.ts` (wb-wupg) |
| EAT-R212 | preserved, not edited | F10 and the F10 control in `test/workbench-claude-cancel-faults.test.ts` |
| EAT-R213, EAT-R214 | NOT CLAIMED by this cut | this bead's description places the repair in wb-3121 (in progress at this cut); REQUIREMENTS-AUDIT finding F3 recommends attaching both rows, with EAT-R253, to the wb-9v02 bead as legs; its readings are in `test/workbench-mwi-cancel-repro.test.ts` |
| EAT-R215 | new process-kill trial | `test/worktree-process-kill-preservation.test.ts` |
| EAT-R216 | BLOCKED, typed below | none |

- The packet's falsifier list, item by item:
  - "process kill after partial git commit, untracked plus tracked bytes": KILL-ROWS. For each of the five git steps that `cleanupWorktree` runs when the agent changed files, the child is parked at that step and killed. The before snapshot holds the agent's exact tracked and untracked bytes, the row's HEAD, status lines, index paths and pi-agent branches, at a path the repo's worktree list registers. After the kill and the restart prune, the after snapshot equals it and the judge reads retained. FULL-RUN observes the same five steps, in order, from a run with no park; KILL-SHAPE pins the tables to that observation.
  - "per-agent skip after async startup (separate from run abort)": NOT CLAIMED by this cut (EAT-R213, wb-3121).
  - "grants revoked during parked admission": PARK-REVOKE-GRANT and PARK-CHANGE-PRINCIPAL. While the agent's admission check is parked, the operator fixture it re-reads loses a grant or changes its principal id. On release, the host settles the agent as the IDENTITY_CONFLICT refusal, and query() is never called. PARK-CONTROL makes exactly one query() call. The function-authority seam pins its own parked revocation (`test/workbench-function-authority.test.ts`, wb-201v, EAT-R030 and EAT-R031); the registered function composition belongs to packet P03 (wb-2ukh, EAT-R228 and EAT-R234).
  - "final write call never launches with stale principal": WRITE-REVOKE-GRANT and WRITE-CHANGE-PRINCIPAL. After the agent's query() started, the host's own grant and principal copies are stale. The capability_invoke call to the write fixture, made through a real MCP client on the in-process workbench server, is rejected with the IDENTITY_CONFLICT text, and the write fixture receives no dispatch. WRITE-CONTROL dispatches the write once, under the principal and grants the host was built with.
- Failed-case matrix. Each mutant is one exact edit, made in a throwaway copy of the tree taken at `d1b45b4` (the three source files the mutants edit are byte-identical at `008e25c`; landing 1080 changed no file under `src/`). The two suites ran there under VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8; the unmutated control passed 18 of 18 in the same copy.

| Mutant | Edit | Rows red |
| --- | --- | --- |
| W1-DESTROY-BEFORE-PRESERVE | `cleanupWorktree` removes the worktree before `git status` | 9 of 11: K1 to K5, FULL-RUN, KILL-SHAPE, M-REMOVE, M-WIPE |
| W4-DESTRUCTIVE-RESTART-PRUNE | `pruneWorktrees` force-removes every registered pi-agent worktree before pruning | 5 of 11: K1 to K5 |
| W5-STAGE-TRACKED-ONLY | the preservation stages with `git add -u` in place of `git add -A` | 4 of 11: K3, K4, K5, FULL-RUN |
| W6-REMOVE-BEFORE-BRANCH | the worktree is removed before the branch is created | 4 of 11: K4, K5, FULL-RUN, KILL-SHAPE |
| H1-SWALLOW-ADMISSION-REJECTION | `claude-host.ts` ignores a rejected beforeDispatch and goes on | 2 of 7: PARK-REVOKE-GRANT, PARK-CHANGE-PRINCIPAL |
| H2-ADMISSION-NOT-AWAITED | `claude-host.ts` starts beforeDispatch without awaiting it | 2 of 7: PARK-REVOKE-GRANT, PARK-CHANGE-PRINCIPAL |
| H3-TOOLS-WITHOUT-BASIS-CHECK | `claude-host.ts` builds the curated tools without its beforeDispatch | 3 of 7: WRITE-REVOKE-GRANT, WRITE-CHANGE-PRINCIPAL, WRITE-CONTROL |
| T1-TOOL-CALL-NO-RECHECK | `claude-capability-tools.ts` drops the per-call beforeDispatch | 3 of 7: WRITE-REVOKE-GRANT, WRITE-CHANGE-PRINCIPAL, WRITE-CONTROL |
| T2-RECHECK-AFTER-WRITE | `claude-capability-tools.ts` runs the per-call beforeDispatch after the dispatch | 2 of 7: WRITE-REVOKE-GRANT, WRITE-CHANGE-PRINCIPAL |

- Table battery (standing rule 16, CT-BATTERY v2): each member was planted in a throwaway copy of the suite. In the process-kill suite, CT2 turned 2 rows red, CT3 4, CT4 3, CT5 3 and CT6 2; in the Claude-host suite, CT2, CT3, CT4, CT5 and CT6 each turned 1 row red. CT1 and CT1b do not apply to either suite: no row holds more than one case. CT6 in the process-kill suite is caught by the product's own observed step sequence. In the Claude-host suite it is caught by the header's row ids, which ROSTER reads from the file's source.
- EAT-R216, typed BLOCKED receipt:
  - Status: BLOCKED. The SDK child-death member stays UNDETERMINED at this cut (C221 remainder), and this cut asserts no settlement behavior after an SDK child dies.
  - Blocker: this tree has no killable SDK child for a test to terminate. The registered Claude path reaches the SDK only through the `@anthropic-ai/claude-agent-sdk` module, whose query() runs a Claude Code child process. The real child is credential-held, and only the live tiers that `vitest.config.ts` excludes run it. The fixture seam (FakeClaudeSdk) spawns no process, so ending it is not a host death. The SDK's options also declare a `spawnClaudeCodeProcess` hook (its `sdk.d.ts`), through which a fixture child could stand behind the real query(); no such fixture exists in this tree, and this cut neither built nor ran one, so that avenue is UNVERIFIED. The packet template says a failed external SDK is a typed blocker, not a reason to invent a local stub.
  - Smallest reproducer: EAT-R216 acceptance 1 to 3. Kill one registered Claude agent's SDK child during its query. Restart in a separate process, then read the attempt count, host result, journal and Pi invocation state. Run a no-kill control that settles one attempt, and a mutant that retries on a missing acknowledgment.
  - Owner: REQUIREMENTS-AUDIT finding F1 recommends, at bead filing, one SDK child-death acquisition bead carrying EAT-R216 and EAT-R257 as legs, owned by packet P06. Epic wb-rhyt maps P06 to wb-mwsy and wb-5a7k, whose dispatch it gates on the wb-3121 cancel fix.
- Not claimed by this cut: a kill inside a running git process (each park holds the call before git starts); power loss; a kill of a Pi session or of an AgentManager run; the preservation-failure variant, which `test/worktree.test.ts` and the `test/worktree-preservation-*` suites pin; the `src/index.ts` producer and the registered workflow tools, which reach the Claude host only through the SDK module; the local-detached host's basis check; anything at the V3, V4 or V5 tiers of the program.
- Display paths added: none. No README, W11, skill or operator example changes, because no behavior changes.
