# the 7e9a1eb detached timing cure leaves the census tier on the vitest 5000 ms default which burned 119 file-alone legs of the docs09 census file (88 tests each) = 66.1 min in 24 h

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77)
**Date:** 2026-10-25
**`pi-subagents` revision:** `workbench/implementation-program@b887fa2e9f581f9a6b1e9d47cb723029aae353ae` — the installed pin. It is on trunk (`git merge-base --is-ancestor b887fa2e9f581f9a6b1e9d47cb723029aae353ae origin/workbench/implementation-program` → rc=0) and is itself the ledger commit that closes landing 395: `ledger: close wb-maza (landing 395, merge 3114970d)`, 2026-10-25 07:31:29 +0000. The clone's `origin/workbench/implementation-program` pointed at b887fa2e from 07:32:01Z to 08:27:50Z (remote-tracking reflog) and moved while this file was written — to 2982607 (landing 396, 08:27:50Z) and dc8e816 (landing 397, 08:45:20Z). `git diff --stat b887fa2e dc8e816` touches 6 paths (`.beads/interactions.jsonl`, `.beads/issues.jsonl`, `test/fixtures/h2-close-condition-roster.json`, `test/fixtures/tsx-resource-closure-roster.json`, `test/workbench-h2-close-condition-census.test.ts`, `test/workbench-tsx-resource-closure-census.test.ts`), none of them a file quoted here. The clone's checked-out HEAD (188ae590) is 550 commits behind the pin (`git rev-list --count HEAD..b887fa2e…` → 550) and was not used for any quote.
**`vitest` revision:** 4.1.10 (`package-lock.json` at b887fa2e, `"node_modules/vitest": { "version": "4.1.10"`; `package.json` `"vitest": "^4.0.18"`). Its 5000 ms default `testTimeout` is per test case and governs every row where neither a config nor an `it` option sets a budget.
**Method:** read-only probes. Ledger: a `python3 -I` filter of `machines/flywheel/ledger/metrics.jsonl` keeping rows with `"2026-10-24T07:45" <= utc <= "2026-10-25T07:45"` (3705 rows on each of three reads, at 19,477 / 19,482 / 19,542 file lines; `M:n` = line n). Serial-leg numerics are JSON strings in that ledger (`"ms":"14882"`, `"realAssertions":"0"`, `"load1":"214.58"`, while `vitestCap` is a number) and were coerced with `float()` before every sum below — a machine-ledger property that belongs in the machine's own notes, not a pi-subagents finding. Source: every byte quoted below was read as `git show b887fa2e9f581f9a6b1e9d47cb723029aae353ae:<path>` or `git grep … b887fa2e9f581f9a6b1e9d47cb723029aae353ae -- <pathspec>`, never through the moving ref. Register: `machines/flywheel/state/known-settled-rows.json`, read-only. No test execution; no `bd` command.
**Scope:** feedback about `pi-subagents`' own test and gate surface — the two vitest tier configs, the census tier's budgets, and the time its landing gates spend re-proving timing reds — not about the workbench product beads in its tracker. The flywheel machine's own register and red-row schema (`machines/flywheel/`, its own git toplevel, not tracked at b887fa2e) appear here only as the consumer's realized cost and workaround.
**Prior art (filenames in full; the listing is the index):** on trunk at b887fa2e: `new-feedback/2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker-in-loaded-parallel-gates-and-green-in-60-s-serial-legs-while-vitest-config-sets-no-testtimeout-and-none-of-the-five-it-calls-carries-one.md`; `new-feedback/2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts-and-green-file-alone-at-2329-22796-ms-while-vitest-census-config-ts-sets-no-testtimeout.md`; `new-feedback/2026-10-21-vitest-run-on-a-census-ts-file-without-the-census-config-collects-0-tests-and-exits-1-which-16-of-16-owner-judge-legs-read-as-timeout-reds-and-nothing-makes-it-loud.md`; `new-feedback/2026-10-21-vitest-4-1-10-json-report-failuremessages-read-error-stack-trace-error-for-every-timeout-red-so-a-marker-reader-must-pair-reporter-default-with-reporter-json-n-10-gates.md` (adjacent: the marker-reading side of the same red class); `new-feedback/2026-10-24-CORROBORATION-docs09-787-red-at-5000-ms-in-8-of-23-landings-315-337-four-more-register-rows-at-1-2-each-13-reds-0-asserts-12-of-12-legs-green-census-config-at-cbe3588-sets-no-testtimeout.md`. On `origin/machine/flywheel/feedback-2026-10-23`: `new-feedback/2026-10-23-CORROBORATION-docs09-census-787-red-at-8-of-22-landings-262-283-and-inspector-58-at-8-of-22-each-costing-one-13823-52080-ms-serial-leg-while-the-60000-ms-it-options-cure-stays-unapplied.md`. `origin/machine/flywheel/feedback-2026-10-22` adds no file on this theme. Duplicate check: `git grep -il -e 'maza' -e '7e9a1eb' -e 'detached-timing' b887fa2e9f581f9a6b1e9d47cb723029aae353ae -- new-feedback/` → rc=1 (no hit), and the same grep against both feedback branches → rc=1. What this file adds, and why it is a request rather than a fourth corroboration: a systemic cure for the sibling red class now sits on trunk (7e9a1eb, merged as 3114970d) and reaches only the detached family (Finding 4); the census tier's realized cost is re-measured at b887fa2e (Finding 2); the two tiers' budget practice is counted file by file (Finding 5); and the ledger's own per-case measurement (Finding 6) re-sizes the fixes the earlier files proposed. The `## Already filed` and `## Re-check verdicts` sections below keep this file from restating them.

## Summary, with numbers

In the 24 h window ending 2026-10-25T07:45Z (3705 ledger rows; first M:15679 at 2026-10-24T07:45:20Z, last M:19383 at 2026-10-25T07:43:54Z), 86 of 99 gate-pass rows carry verdictClass PASS-WITH-TIMING-NOTE, and the machine spent 299 serial re-proof legs = 132.3 min of test wall on this repo's suite — 285 of the 299 legs (129.9 min) re-proving rows that carried 0 real assertions. The docs09 census file, `test/workbench-docs09-readers-relationships.census.ts`, took 119 of those legs = 66.1 min on its own, every leg a file-alone re-run of all 88 tests (min 21,372 / median 31,813 / max 78,174 ms); files whose name contains `census` took 250 of the 299 legs = 117.0 min. The systemic cure for the sibling red class — 7e9a1eb (wb-maza), cut 2026-10-24T15:08:08Z and merged to trunk as 3114970d at 2026-10-25T07:12:55Z, 32 min before the window closed — adds `test/helpers/detached-timing.ts` plus a family guard, and at b887fa2e reaches six files (12 occurrences), all in the detached family: the 119 legs predate the cure's presence on trunk for all but those 32 minutes, and the cure would not have reached them anyway. At b887fa2e, `vitest.census.config.ts` (6 lines) spells no `testTimeout`; 0 of 27 census-tier `.census.ts` files carry the literal `{ timeout: N }` it-option that 89 of 104 default-tier `*census*.test.ts` files carry; 10 of the 11 files behind the register's 32 census-tier keys spell `timeout` nowhere. The ledger's per-case measurement (M:19068: the :787 case is one synchronous `judge()` over 56 pins, 3635-5645 ms file-alone at load1 147-237, 5 of 10 runs past 5000 ms) and the machine's own serial legs at `--testTimeout=60000` (22 of 32 embedded docs09 legs carry an outcome field, all 22 `green`, none `failed` > 0) size a per-case budget at 60_000, not the 120_000 the file-wall numbers suggest. A per-it cure for :787 alone is in flight (wb-ro6u, e5b10c53, delivered 06:46:46Z; not on trunk at b887fa2e or dc8e816); it leaves the file's second register key, :688, on 5000 ms. The request: a per-case budget for the census tier and the register's 14 default-tier keys, sized from the per-case measurements; acceptance criteria under Suggested fixes. I executed no tests.

## Finding 1 — 86 of 99 gate-pass rows in the 24 h window carry verdictClass PASS-WITH-TIMING-NOTE, the other 13 PASS-WITH-FINDING — **CONFIRMED**

My window filter over the ledger (Method) printed, verbatim:

```
file_lines 19482 window_rows 3705
first 2026-10-24T07:45:20Z last 2026-10-25T07:43:54Z
gate-pass 99 {'PASS-WITH-TIMING-NOTE': 86, 'PASS-WITH-FINDING': 13}
```

(Three reads at 19,477 / 19,482 / 19,542 file lines gave the same 3705 window rows and the same split; the appends landed outside the window.) Every one of the 99 gate-pass rows carries the `verdictClass` field; no third class occurred in the window.

## Finding 2 — serial re-proof cost 299 legs = 132.3 min in 24 h; 285 of 299 legs carry realAssertions=0; 119 file-alone legs of the docs09 census file (88 tests each) = 66.1 min, every one try=1 and zero-assert — **CONFIRMED**

Verbatim from the same derivation (the third read prints the same values):

```
serial-leg 299 sum_ms 7939227 wall_min 132.3
zeroAssert legs 285 ms 7793284 min 129.9
serial-leg load1 min 105.29 max 458.52
serial-leg tries {1: 292, 2: 7}
LEGFILE test/workbench-docs09-readers-relationships.census.ts legs 119 ms 3968036 zeroAssert 119
LEGFILE test/workbench-tool-exposure-census.census.ts legs 28 ms 642652 zeroAssert 28
LEGFILE test/workbench-inspector.test.ts legs 27 ms 485377 zeroAssert 27
LEGFILE test/workbench-compat-feature.census.ts legs 25 ms 775681 zeroAssert 25
docs09 legs 119 sum_ms 3968036 wall_min 66.1 min 21372 med 31813 max 78174 zeroAssert 119 tries {1: 119}
census-name legs 250 ms 7019376 wall_min 117.0
```

Scope of each number: 299 serial-leg rows in the window; "zeroAssert" = rows whose `realAssertions` coerces to 0 (285 of 299); "census-name" = the 250 of 299 legs whose `file` contains `census`. One serial-leg row verbatim, M:18821:

```
{"kind":"serial-leg","bead":"wb-5uq7","seat":"land-prep","file":"test/workbench-inspector.test.ts","ms":"14882","realAssertions":"0","try":"1","tree":"f6749ee7880eafca13423e233f324cf28427372b","load1":"214.58","vitestCap":1,"testsRun":"133","utc":"2026-10-25T04:12:04Z","run":"gate-judge","gen":"g10","actor":"flywheel"}
```

The row shape shows what each leg is: one file re-run at `vitestCap` 1 under measured host load (`load1` 105.29–458.52 across the 299 legs), proving a red that asserted nothing.

Scope of the docs09 attribution — the file, not the :787 row: serial-leg rows carry `file`, not `line` (0 of 299 rows have a `line` key), and each docs09 leg re-runs the whole file (`testsRun` `"88"` on all 119), so a leg proves the file. Of the 119 docs09 legs, 25 are back-referenced by `serialLegs[].row` from in-window gate-pass rows (those entries carry `file` and `row`, no `line`), 4 more by `reds[].legRow` from landing-gate and landing-gate-correction red entries (M:18829, M:18865, M:19000 and M:19198 name `:787`; M:18760 names both `:688` and `:787` against the same leg, M:18741), and 90 are referenced by no in-window row. The register holds two docs09 keys — `:787` (titleChain `… liveness: the adopted judge is not accept-all … > a present, passing case is never reported absent, skipped or inverted …`) and `:688` (the `it.each` template `AC2 $key: every pinned case is collected once, passed and asserting in the default gate's own report`, row `RA1/a`) — and 90 window rows name `:688` or `RA1/a` (among them gate-stage M:16181 and M:18737, and wb-ro6u's M:19212 / M:19239 / M:19240). The 66.1 min is therefore the docs09 file's cost; the two keys split it in a way the leg rows cannot show.

## Finding 3 — 10 of 61 landing-gate rows carry 21 red entries: the 10 entries with marker `Test timed out in 5000ms` all have realAssertions=0 and the 11 marker-NONE entries all have realAssertions=1; the 6 rows whose reds were all timeout-marker were held (2) or passed (4), the 4 rows carrying any marker-NONE red were refused, and the 1 timeout entry that rode a real-red row (M:17831, docs09:787) was refused with it — **CONFIRMED**

```
landing-gate 61 furnaceMode {'supervised': 61}
withReds 10 redEntries 21
```

The 10 timeout-marker entries (every one `realAssertions=0`): docs09:787 in 4 rows (M:17831 wb-hmre, M:18829 wb-5uq7, M:19000 wb-mymm landing 389, M:19198 wb-ab0i landing 392), inspector:58 in 3 rows (M:18829, M:18947 wb-fv2h landing 388, M:19272 wb-bhq5 landing 393), docs20-contract:550 and tool-exposure-census:581 in M:18553 (wb-v2um), attention-grouped-bench:172 in M:18829. The 11 marker-NONE entries (every one `realAssertions=1`): rc-context-block-census 1539/1551 and rf-tsx-closed-vocabulary-census 1154/1165 (M:17724 wb-vu3i), tsx-skip-cache-deferral-census 1310 ×2 + 1320 (M:17831), ri-decision-seed-claim-census 1112/1122 (M:18248 wb-4nut.5), observation-class-census:1005 and docs07-provider-rules:936 (M:18641 wb-kku9.1). Verdicts, from the rows: the 4 rows carrying any marker-NONE real-assert red (M:17724, M:17831, M:18248, M:18641) all read `'verdict': 'real-red-refusal', 'verdictClass': 'REAL-RED'` — so M:17831's docs09:787 timeout entry was refused along with the three tsx-skip real reds on its row; the 6 rows whose reds were all timeout-marker zero-assert read `held` (M:18553, M:18829) or `pass` (M:18947, M:19000, M:19198, M:19272), all 6 with `verdictClass: PASS-WITH-TIMING-NOTE`. The M:17831 docs09 red entry, in ledger key order (wb-hmre, 2026-10-24T22:21:53Z):

```
{"file": "test/workbench-docs09-readers-relationships.census.ts", "line": 787, "marker": "Test timed out in 5000ms", "realAssertions": 0, "titleChain": "wb-752.15 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict) > a present, passing case is never reported absent, skipped or inverted: the whole table is ok through roster rows only", "status": "matched-active register position 12 but NOT CLEARED - serial legs withheld by the pre-leg REAL RED rule, HOLD"}
```

The inspector:58 reds carry `registerPosition=2` and `legRow` back-references `M:18821`, `M:18942`, `M:19263` — all three resolve to serial-leg rows for the same beads (wb-5uq7, wb-fv2h, wb-bhq5; 14,882 / 20,182 / 12,133 ms, each `realAssertions:"0"`, `try:"1"`). `registerPosition=12` sits on 3 of the 4 docs09:787 reds (M:18829, M:19000, M:19198); M:17831's entry carries no `registerPosition` field and names position 12 only in its `status` string.

## Finding 4 — the systemic cure 7e9a1eb was cut 2026-10-24T15:08:08Z and merged to trunk as 3114970d at 2026-10-25T07:12:55Z, 32 min before the window closed; at b887fa2e it reaches six files (12 occurrences), all in the detached family, none a census file — **CONFIRMED**

```
$ git log --no-walk --format='%h %H%n%ci%n%s' 7e9a1eb
7e9a1eb 7e9a1eb8e7d72f0b7887eb99c6ce9a681d4c0201
2026-10-24 15:08:08 +0000
test(workbench): give the detached-* waits and the product's two lapses strict timing markers - budgeted pollFor, marked launch/connect twins, family guard (wb-maza)
$ git log --no-walk --format='%h %H%n%ci%n%s' 3114970d
3114970 3114970d17ad0154e3943cc73a01d2edf2a13b69
2026-10-25 07:12:55 +0000
detached-* tests: vitest strict timeouts for bare waits (R721 systemic cure) (wb-maza)
```

Timeline, ledger and git together: the cut 7e9a1eb was committed 2026-10-24T15:08:08Z and delivered at M:16767 (`delivered`, wb-maza, 2026-10-24T15:08:18Z, `"commit": "7e9a1eb8e7d72f0b7887eb99c6ce9a681d4c0201"`); the trunk merge 3114970d was committed 2026-10-25T07:12:55Z (07:45:00Z − 07:12:55Z = 32 min 5 s before the window closed; this clone's remote-tracking reflog first saw the ref at 3114970 at 07:31:32Z); landing-gate M:19361 at 07:30:42Z (`"verdict": "pass"`, `"reds": []`, `"landing": 395`), landable M:19364 at 07:32:51Z, and fold-done M:19496 at 2026-10-25T08:29:31Z — after the window. The pin b887fa2e is the ledger commit closing landing 395 (07:31:29Z). `git merge-base --is-ancestor 7e9a1eb b887fa2e…` → rc=0 and the same for 3114970d. So of the window's 24 h, the cure was on trunk for 32 minutes, and the 119 docs09 legs predate it for all but that span.

Its stat: 5 files, 763 insertions(+), 62 deletions(-) — `test/helpers/detached-timing.ts` (new, 143 lines), `test/workbench-detached-timing-guard.test.ts` (new, 230), `test/workbench-detached-timing.test.ts` (new, 298), and edits to `test/workbench-detached-child-environ.test.ts` and `test/workbench-detached-socket-base.test.ts`. The coverage probe, with its armed control (the grep does find hits — they are just not census files):

```
$ git grep -c 'detached-timing' b887fa2e9f581f9a6b1e9d47cb723029aae353ae
b887fa2e9f581f9a6b1e9d47cb723029aae353ae:.beads/issues.jsonl:2
b887fa2e9f581f9a6b1e9d47cb723029aae353ae:test/helpers/detached-timing.ts:1
b887fa2e9f581f9a6b1e9d47cb723029aae353ae:test/workbench-detached-child-environ.test.ts:1
b887fa2e9f581f9a6b1e9d47cb723029aae353ae:test/workbench-detached-socket-base.test.ts:2
b887fa2e9f581f9a6b1e9d47cb723029aae353ae:test/workbench-detached-timing-guard.test.ts:4
b887fa2e9f581f9a6b1e9d47cb723029aae353ae:test/workbench-detached-timing.test.ts:2
```

Six files, 12 occurrences; no `.census.ts` file and no other `.test.ts` imports it. The helper's mechanism, quoted from `test/helpers/detached-timing.ts` at b887fa2e: the header (lines 6-7) says "this module turns each one into a failure that NAMES its lapse with a strict marker the judge reads" / "(\"... exceeded ... timeout\"). vitest's own \"Test timed out in <N>ms\" stays the outer bound of every row."; line 32 `export const WAIT_BUDGET_MS = 20_000;`; the two lapse sentences at lines 41 and 45 (`lapse: "the launcher's fixed handshake poll exceeded its timeout"`, `lapse: "a host command exceeded its fixed socket timeout"`); line 99 `if (performance.now() >= deadline) throw new DetachedTimingLapse(`${what} exceeded its ${budgetMs} ms wait timeout`);`.

## Finding 5 — at b887fa2e the two tiers split on budgets: 0 of 27 census-tier `.census.ts` files carry a literal `{ timeout: N }` it-option while 89 of 104 default-tier `*census*.test.ts` files do; `vitest.census.config.ts` (6 lines) sets no `testTimeout`; 10 of the 11 files behind the register's census-tier keys spell `timeout` nowhere — **CONFIRMED**

The census config, the whole file, verbatim (`vitest.census.config.ts` at b887fa2e: 6 lines, 485 bytes):

```
import { defineConfig } from "vitest/config";
// wb-nl8 census tier: census legs (test/**/*.census.ts) judge the gate's OWN report at
// .forge/vitest-report.json (written by the test step) and never re-execute it. The .census.ts
// suffix keeps them outside the default include test/**/*.test.ts, so the default report can
// never record a judging file (u62 p-in-run, census.ts judge()).
export default defineConfig({ test: { include: ["test/**/*.census.ts"], allowOnly: false } });
```

No `testTimeout`, so vitest 4.1.10's 5000 ms default governs every `.census.ts` row that sets no budget of its own. The default config: `git show b887fa2e9f581f9a6b1e9d47cb723029aae353ae:vitest.config.ts | grep -in 'testtimeout\|hooktimeout'` → rc=1 (no hit); armed control on the same bytes, `grep -n 'include\|exclude'` → line 17 `include: ["test/**/*.test.ts"],` and line 27 `exclude: [...]`. The tier counts:

```
$ git ls-tree -r --name-only b887fa2e9f581f9a6b1e9d47cb723029aae353ae -- test/ | grep -E '^test/[^/]*\.census\.ts$' | wc -l
27
$ git grep -l -E '\{ *timeout: *[0-9_]+' b887fa2e9f581f9a6b1e9d47cb723029aae353ae -- 'test/*.census.ts' | wc -l
0
$ git ls-tree -r --name-only b887fa2e9f581f9a6b1e9d47cb723029aae353ae -- test/ | grep -E '^test/[^/]*census[^/]*\.test\.ts$' | wc -l
104
$ git grep -l -E '\{ *timeout: *[0-9_]+' b887fa2e9f581f9a6b1e9d47cb723029aae353ae -- 'test/*census*.test.ts' | wc -l
89
```

(Across all 437 `test/*.test.ts` files the same grep hits 101.) The literal regex misses budgets spelled through constants, so the negative is qualified: 13 of the 27 census-tier files spell `timeout` (case-insensitive) somewhere and 14 spell it nowhere; `test/workbench-docs06-conformance.census.ts` budgets through named constants — `:303 const JUDGE_BUDGET_MS = 50_000;`, `:304 const JUDGING: { readonly timeout: number } = { timeout: JUDGE_BUDGET_MS };`, and its `afterAll` closes `}, CALL_SITE_HOOK_BACKSTOP_MS);` at `:477`. Of the 11 files behind the register's 32 census-tier keys, 10 have zero `timeout` spellings at b887fa2e (`compat-feature`, `docs04-tests-census`, `docs09-readers-relationships`, `docs12-authorization`, `docs20-contract`, `evidence-ui-census`, `hk9l-copy-window`, `risk-register`, `tool-exposure-census`, `w21-survivor-pins`, all `.census.ts`); the eleventh, `docs07-provider-rules.census.ts`, has 15, and its `:850` row was still granted to the register at the 5000 ms marker in-window (M:18932, Finding 7). The top register key, `test/workbench-docs09-readers-relationships.census.ts` (1057 lines): 40 `it(` calls (`grep -cE '^\s*it\('` → 40), 0 case-insensitive `timeout` spellings, 0 numeric-third-argument closers (`grep -cE '^\s*\}, *[0-9A-Za-z_]+\);'` → 0); its line 787 is

```
  it("a present, passing case is never reported absent, skipped or inverted: the whole table is ok through roster rows only", () => {
```

— matching the `titleChain` of the Finding 3 reds. On the default-tier side the budgeted shape is the norm and a red there means an assertion: among the 11 marker-NONE real-assert reds of Finding 3, `test/workbench-rc-context-block-census.test.ts:1539` is `        it(pin, { timeout: 120_000 }, async () => {` (M:17724), and `test/workbench-tsx-skip-cache-deferral-census.test.ts` — one of the 89 — carries `{ timeout: 60_000 }` at 1277, `{ timeout: 180_000 }` at 1310 and `{ timeout: 60_000 }` at 1320, added by e7cf6d6 (2026-10-23 09:14:15 +0000, wb-csbt.1); its 3 in-window landing-gate reds (M:17831, lines 1310 ×2 and 1320) were `marker='NONE' realAssertions=1`. The 2 default-tier register keys that redded in window landing gates carry no budget: `test/workbench-inspector.test.ts:58` is `it('window access reads only visible rows even after 100k updates and retains selected identity',()=>{` (2067-line file; 0 lines match `\{ *timeout: *[0-9_]+`; the single `{ *timeout` hit is `:1187 const {model,store}=evidenceFixture(source,{timeoutMs:5000});`, a fixture config, not a test budget), and `test/workbench-attention-grouped-bench.test.ts:172` is `it("states the contract, host, toolchain and pinned production caps, and runs both passes at their query caps", () => {` (0 `{ *timeout` hits).

## Finding 6 — the ledger records the per-case mechanism: the :787 case is one synchronous `judge()` over 56 pins, 3635-5645 ms file-alone at load1 147-237, 5 of 10 runs past 5000 ms (M:19068); the machine's serial legs run the same file at `--testTimeout=60000` and 22 of 32 embedded docs09 legs carry `outcome: "green"`, none `failed` > 0; a per-it cure for :787 alone is in flight (wb-ro6u e5b10c53, delivered 06:46:46Z, not on trunk) — **CONFIRMED**

M:19068 (`red`, wb-ro6u, seat ws-03, 2026-10-25T05:38:45Z), the `result` field verbatim:

```
UNMODIFIED file (blob 3f7db602 at base 4c97422): 5 failed / 5 passed of 10 runs, every failure 'Error: Test timed out in 5000ms.' at test/workbench-docs09-readers-relationships.census.ts:787:3 (the owner's marker; caseMs 5236-5645), passes caseMs 3635-4877, the other 87 cases 10/10 passed in every run (tally 88), load1 147-237, no starvation harness; cause: the case body is ONE synchronous judge() over all 56 pins (43 distinct, 15 files) - CPU profile of the case: ~2.6 s TypeScript binder/checker + ~2.3 s census-helper walks, nothing awaited - and vitest 4.1.10 fails a sync body that returns past 5000 ms; corroborated by 130 gate serial legs on file (3436-11620 ms, p50 5398) and 4 census-step overruns (5474-6742 ms)
```

Its `cmd` ran `./node_modules/.bin/vitest run test/workbench-docs09-readers-relationships.census.ts --config vitest.census.config.ts --includeTaskLocation --reporter=default --reporter=json (file alone, cap 1, the census config's default 5000 ms)`. Two consequences for sizing: `testTimeout` is per case, so the 88-test file walls of Finding 2 (21,372-78,174 ms) are the wrong yardstick; and the case cannot be interrupted, so a budget moves only the duration verdict. The machine's own legs already run the file with a per-case budget of 60 s — one embedded `serialLegs[]` entry from gate-pass row M:15696, verbatim except for the log path:

```
"command": "env -u CLAUDECODE -u AI_AGENT VITEST_MAX_WORKERS=1 VITEST_MAX_THREADS=1 VITEST_MAX_FORKS=1 ./node_modules/.bin/vitest run test/workbench-docs09-readers-relationships.census.ts --testTimeout=60000 --reporter=default --config vitest.census.config.ts", "try": 1, "exitCode": 0, "testsRun": 88, "passed": 88, "failed": 0, "skipped": 0, "todo": 0, "ms": 32196, "durationMsReported": 31240, "load1": 204.76, "vitestCap": 1, … "tallyLine": "Tests  88 passed (88)", "outcome": "green", "row": "M:15645"
```

Scope: 32 embedded docs09 entries in the window's gate-pass rows; 22 carry `outcome: "green"`, 10 carry no `outcome` field (8 of those carry `passed: 88`), and 0 carry `failed` > 0; the 13 entries that record a `command` all carry `--testTimeout=60000 --reporter=default --config vitest.census.config.ts`; 156 window rows mention `testTimeout=60000`. The in-flight cure: `git log --no-walk --format='%h %ci %s' e5b10c5377169a4cb391ff17fbca46330a4dc7a1` → `e5b10c5 2026-10-25 06:46:27 +0000 test(workbench): give the docs09 readers-relationships census whole-table liveness case its own R546 budget (60000 ms, 5 x the 11620 ms wall of record) so vitest's 5000 ms default stops timing out its synchronous judge() under load (wb-ro6u)`; its docs09 diff adds `+  const WHOLE_TABLE_BUDGET_MS = 60_000;` and changes the case's closer `-  });` → `+  }, WHOLE_TABLE_BUDGET_MS);` (the numeric third-argument form, which the literal `{ timeout: N }` grep of Finding 5 would also miss). Ledger: M:19212 (`green`) reports "the whole-table case passed 20/20 consecutive serial runs on the delivered blob (caseMs 3456-6573, 13 of 20 past the old 5000 ms, every one of them a timeout before the cut), zero timeouts at the case, full file tally 88 every run" and discloses "1 of 20 delivered runs (run 16) and 1 of 20 interim runs (run 12) also red ONE other case, :688 AC2 'RA1/a' 'Test timed out in 5000ms' (6971 / 6845 ms), the separately registered row (known-settled idx 13, R676 entry 28), lines untouched by the cut"; M:19239 `delivered` and M:19240 `gate-enqueued` at 06:46:46Z. `git merge-base --is-ancestor e5b10c53… origin/workbench/implementation-program` → rc=1 at dc8e816 (`origin/machine/flywheel/wb-ro6u` = e5b10c53…), so at b887fa2e the :787 case has no budget and the :688 case has none in any tree.

## Finding 7 — the orchestrator's workaround register holds 46 ACTIVE rows for this red class (14 default-tier `.test.ts` entries, 32 census-tier `.census.ts` entries) and grew by 5 in-window across 10 register-grant rows, 43 → 44 → 46 — **CONFIRMED**

The register is the consumer's workaround, not the tool's mechanism: `machines/flywheel/state/known-settled-rows.json` is a 46-entry list (every entry ACTIVE). Default tier, 14 entries over 13 `file:line` keys: `test/strict-agent-files-wiring.test.ts:79` (markerClass `Hook timed out in`), `test/workbench-attention-grouped-bench.test.ts:172`, `test/workbench-env-scrub-census.test.ts:443`, `test/workbench-gp-control-loop-audit.test.ts:133`, `test/workbench-inspector.test.ts:58`, `:599`, `:926`, `test/workbench-pi-reconcile.test.ts:166`, `test/workbench-pre-push-hook.test.ts:319` (two entries), `test/workbench-release-checklist.test.ts:479`, `test/workbench-sanitizer-corpus.test.ts:1162`, `test/workbench-security-workflow.test.ts:21`, `test/workflow-gate-worktree.test.ts:299` (the rest markerClass `Test timed out in`). Census tier, 32 entries over 13 `file:line` keys in 11 files: `compat-feature.census.ts:406` (8 entries) and `:416`, `docs04-tests-census.census.ts:551` (2), `docs07-provider-rules.census.ts:850`, `docs09-readers-relationships.census.ts:688` and `:787`, `docs12-authorization.census.ts:448`, `docs20-contract.census.ts:550` (3), `evidence-ui-census.census.ts:553` (6), `hk9l-copy-window.census.ts:59`, `risk-register.census.ts:408` (2), `tool-exposure-census.census.ts:581` (4), `w21-survivor-pins.census.ts:60`. The two keys this file is about, fields verbatim:

```
ENTRY file=test/workbench-inspector.test.ts line=58 markerClass='Test timed out in' fileBlobSha=d792389d7926a9d266afccaf01e281859b4a8148
ENTRY file=test/workbench-docs09-readers-relationships.census.ts line=787 markerClass='Test timed out in' fileBlobSha=3f7db602
```

The docs09:787 entry's `evidence[2]` reads, in full: "line re-read at blob 3f7db602: :787 (was :642 at blob b78d92ea, expired file-wide at fold 211)"; its `note` reads "expires on blob change, serial fail, or owner ruling"; `known-settled-rows.expired.json` and `known-settled-rows.evicted.json` sit beside it. The window holds 10 register-grant rows (M:15930, 16626, 17490, 18220, 18373, 18594, 18595, 18864, 18932, 18933). The two granted during landing 383 — `rows[0]` of each row, `titleChain` omitted, keys sorted:

```
M:18594 register-grant wb-v2um ruling=R763 rows[0]: {"blob": "03f7b0adf959", "file": "test/workbench-docs20-contract.census.ts", "line": 550, "ruling": "R763", "status": "ACTIVE"}
M:18595 register-grant wb-v2um ruling=R763 rows[0]: {"blob": "036383babd79", "file": "test/workbench-tool-exposure-census.census.ts", "line": 581, "ruling": "R763", "status": "ACTIVE"}
```

Their outer fields: M:18594 `note` = "candidate idx 81 promoted; markerClass 'Test timed out in' VERBATIM; sightings wb-45bx run-1 cmd_932b7270ecac + wb-v2um cmd_7872fdf86c8d (distinct entries + commands per R758)"; M:18595 `note` = "candidate idx 63 promoted; markerClass 'Test timed out in' VERBATIM; sightings wb-xmo2 cmd_0bf166ea9344 + wb-v2um cmd_7872fdf86c8d (distinct entries + commands per R758)"; both `registerActive` = "43 after both R763 grants", `commit` = `2995c6c37cdba5f25343923ff69afe2d29332ed6`. Then M:18864 (R772, landing 387, `test/workbench-attention-grouped-bench.test.ts:172`, `registerActive` "44 after the R772 grant") and M:18932 / M:18933 (R775, landing 388, `test/workbench-docs07-provider-rules.census.ts:850` at `position` 45 and `test/workbench-docs12-authorization-and-auditability.census.ts:448` at `position` 46, both `registerActive` "46 after both R775 grants"). The standing per-landing cost shape, quoted from fold-done rulings: M:17327 (landing 364) — "Land-prep PASS-WITH-TIMING-NOTE cmd_1893892ee846, single inspector:58 red R705(b) routine-local on ACTIVE register position 2 (landing-gate M:17289, landable M:17290, ack M:17292 on closure 843); machine gate cmd_fdb07d8ee6e9 (gate-pass M:16327, PASS-WITH-FINDING, needsRuling false); owner sweep-364 ran owner-side (F5 rows all F5-KNOWN); duties: fold-duties automated (R694 follow-up, F1 leads F2+F3 ride per the Routing line)". M:18625 (landing 383, my read truncated at 300 chars) — "SPOT R633 pair agreement (owner class LANDABLE + exact tree 67e4cba8 + probe 475fe4ae) with land-prep PASS-WITH-TIMING-NOTE cmd_7872fdf86c8d: 8 register timeouts R705(b) routine-local, 2 unregistered keys presented-and-held (landing-gate M:18553) then FLIPPED by R748 pre-bound + R763 (landable M:185…".

## Evidence

- Ledger: `/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/machines/flywheel/ledger/metrics.jsonl`, 19,477 / 19,482 / 19,542 lines across three reads, window rows 3705 each time. `M:n` = line n (the ledger is append-only, so earlier lines keep their numbers).
- Serial-leg keys present on every one of the 299 rows: `actor, bead, file, gen, kind, load1, ms, realAssertions, run, seat, testsRun, tree, try, utc, vitestCap`; 4 more occur on some rows: `commandId` (40), `note` (40), `gateRun` (36), `skippedRecovered` (4). No row carries `line`.
- Window row kinds the numbers above rest on: gate-pass 99, serial-leg 299, landing-gate 61, landing-gate-correction 30, register-grant 10, fold-done 56, delivered 90, green 108, red 105.
- Register: `…/machines/flywheel/state/known-settled-rows.json` (46 entries; 14 `.test.ts`, 32 `.census.ts`), `known-settled-rows.expired.json` and `known-settled-rows.evicted.json` beside it.
- Source: every quoted line read at `b887fa2e9f581f9a6b1e9d47cb723029aae353ae` (the installed pin) by explicit sha; the blobs of the five 2026-10-24 register files at that sha equal the register's `fileBlobSha` values (`3f7db6021e7769a919378ffb6269b77549332603` docs09, `d792389d7926a9d266afccaf01e281859b4a8148` inspector, `036383babd79abed9c7153e5fb2a03a8dbbeb2c7` tool-exposure, `03f7b0adf959b464b05d93d31511948c68833463` docs20, `c2c2b4bd70e965af4cfb66460c480d44d839aeb0` attention-grouped-bench).

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| `vitest.census.config.ts` sets no `testTimeout`; `vitest.config.ts` sets none; the chronic census rows carry none | 2026-10-21 CORROBORATION, Finding 1 ("the census config sets no budget and the chronic rows carry none"); 2026-10-24 CORROBORATION, Finding 2 ("all five rows still carry no budget, both configs still set none, and the files are byte-identical to the register's keys") |
| per-it `{ timeout: 60_000 }` at exactly `docs09:787` and `inspector:58`, one line each | 2026-10-23 branch CORROBORATION, recommendation 1 |
| a config-level floor, `testTimeout: 30_000` in `vitest.census.config.ts` | 2026-10-21 CORROBORATION, fix #1 |
| per-row budgets as the cheapest fix; `--testTimeout=60000` on the leg's command line as an instrument, never an edit to the tree | 2026-10-20 file, fix #1 (`it(name, fn, 30_000)` or `{ timeout: 30_000 }`); 2026-10-23 branch file, Positives |
| the cost is one serial leg per red; the register exists because the same rows keep re-paying it; registration changed who rules, not whether the leg runs | 2026-10-20 Finding 3; 2026-10-21 Finding 3; 2026-10-23 Finding 3; 2026-10-24 Finding 3 |

## Re-check verdicts

| Claim | Verdict at b887fa2e |
|---|---|
| 2026-10-24 Finding 2 (at cbe3588): both configs set none; the five rows `docs09:787`, `docs09:688`, `inspector:58`, `tool-exposure:581`, `docs20:550` carry no budget; the files are byte-identical to the register's keys | **STILL-TRUE** (was cbe3588, now b887fa2e): `git show b887fa2e9f581f9a6b1e9d47cb723029aae353ae:vitest.census.config.ts` carries no `testTimeout`; the `vitest.config.ts` grep → rc=1; docs09, tool-exposure and docs20 spell `timeout` zero times, inspector only as the `:1187` fixture config; the four blobs equal the register's `fileBlobSha` values (Evidence) |
| 2026-10-23 branch recommendation 1 (per-it 60_000 at `docs09:787` and `inspector:58`) | **STILL-TRUE** that neither row carries a budget at b887fa2e; the docs09 half is in flight as wb-ro6u e5b10c53 in the numeric third-argument form (Finding 6), not on trunk at b887fa2e or dc8e816 |
| 2026-10-21 fix #1 (`testTimeout: 30_000` in `vitest.census.config.ts`) | **STILL-TRUE** unapplied at b887fa2e (the config is the 6-line file quoted in Finding 5) |

## Suggested fixes, cheapest first

This file is a request; the acceptance criteria follow the fixes. Each fix below is the 2026-10-21 or 2026-10-23 proposal re-sized on the per-case numbers of Finding 6 — `testTimeout` and an `it` option are per case, so the 88-test file walls of Finding 2 (median 31,813 / max 78,174 ms) must not size them.

1. **One line in `vitest.census.config.ts` — the 2026-10-21 fix #1, re-sized: `testTimeout: 60_000`.** Measured per-case need in this window: the :787 case 3635-5645 ms file-alone at load1 147-237 (M:19068), the :688 case 6845 / 6971 ms at its two reds (M:19212), and the machine's serial legs already run the file at `--testTimeout=60000` with 22 of 32 embedded docs09 legs `green` and none failed (Finding 6) — so 60_000 is the measured-sufficient budget (about 10x the measured per-case need), and 120_000 would be about 20x. The 30_000 the 2026-10-21 file proposed would also cover every per-case duration measured here (max 6971 ms), but I have no run at 30_000 to cite. One line covers all 13 census-tier register keys, including `:688`, which wb-ro6u leaves on 5000 ms; it does not reach the default tier, and it is a blanket budget rather than a named one.
2. **Per-it budgets on the register's 14 default-tier keys — the 2026-10-23 recommendation 1, widened from two rows to the register's default-tier list** (Finding 7: `inspector:58/:599/:926`, `attention-grouped-bench:172`, `pre-push-hook:319`, `strict-agent-files-wiring:79` (a hook budget), `env-scrub-census:443`, `gp-control-loop-audit:133`, `pi-reconcile:166`, `release-checklist:479`, `sanitizer-corpus:1162`, `security-workflow:21`, `workflow-gate-worktree:299`). The shape is already idiomatic in the default tier (89 of 104 census-named `.test.ts` files; e7cf6d6's `{ timeout: 60_000 }` / `{ timeout: 180_000 }` at tsx-skip 1277/1310/1320; `rc-context-block-census.test.ts:1539`), and the in-flight wb-ro6u cut does the docs09:787 half of the 2026-10-23 proposal in the `}, WHOLE_TABLE_BUDGET_MS);` form with the measured wall in a comment — the sizing discipline to copy. This is the only cheap shape that reaches the default tier, which `vitest.census.config.ts` cannot.
3. **A named-budget analogue of `detached-timing.ts` for the judged tiers**, only if the owner wants the named-lapse property there too: the census cases are synchronous `judge()` calls over a report (M:19068: "nothing awaited"), so `pollFor` does not transplant and a sync body cannot be interrupted — the analogue would time the judge call and throw a strict marker naming the row after it returns, or stay a plain budget per fixes 1-2.

**Acceptance:** `docs09:787`, `docs09:688` and `inspector:58` leave the landing-gate red list (Finding 3's 10 timeout entries → 0 for these keys over a comparable 24 h) and the ACTIVE register (46 rows today), and the serial-leg tier drops from 132.3 min/24 h, of which 285 of 299 legs were zero-assert re-proof and 119 legs (66.1 min) were the docs09 file alone.

## Positives worth protecting

- **The 7e9a1eb mechanism is the right shape and should survive refactors**: a lapse THROWS a message naming what it waited for (`DetachedTimingLapse`, `"<what> exceeded its <N> ms wait timeout"`, helper line 99), while "vitest's own \"Test timed out in <N>ms\" stays the outer bound of every row" (helper line 7), and the family is pinned by a dedicated guard test plus a sentence-pin test (`test/workbench-detached-timing-guard.test.ts`, `test/workbench-detached-timing.test.ts`, both at b887fa2e). Losing the named-lapse property would send the detached family back to unroutable reds.
- **The census tier is a deliberate design whose reason is written into the config itself** — the four comment lines of `vitest.census.config.ts` (Finding 5): census legs "judge the gate's OWN report at .forge/vitest-report.json (written by the test step) and never re-execute it", and "The .census.ts suffix keeps them outside the default include test/**/*.test.ts, so the default report can never record a judging file". A refactor that merged the tiers or renamed the suffix would lose the property that a judging file never appears in the report it judges; fix 1 above adds a budget to this file without touching that line.
- **In the default tier, a budgeted row's red means an assertion**: 89 of 104 census-named `.test.ts` files carry a literal `{ timeout: N }` it-option, and the window's reds in budgeted rows were all real-assert reds — `rc-context-block-census.test.ts:1539` `it(pin, { timeout: 120_000 }, …)` (M:17724) and the three tsx-skip reds at e7cf6d6's budgeted rows 1310/1320 (M:17831), each `marker='NONE' realAssertions=1`. `docs06-conformance.census.ts` shows the same discipline inside the census tier with file-local named constants sized from measurement (`JUDGE_BUDGET_MS = 50_000` at :303; `CALL_SITE_HOOK_BUDGET_MS = 20_000` at :318, "more than 2 x the hook's worst measured wall"), as does the in-flight wb-ro6u cut ("5 x the 11620 ms wall of record"). That convention — budget per row, size from the measured wall, say so in a comment — is what fixes 1-2 ask the census tier to adopt, and a refactor should not flatten it into one global number.

## What I did not establish

- I executed no vitest leg; every number is a ledger row or a git read at b887fa2e. The 5000 ms attribution rests on the rows' `marker` text, the configs' lack of a `testTimeout`, and M:19068's run by seat ws-03, not on a run I timed.
- Whether a 30_000 budget would hold: every per-case duration I can cite (3635-6971 ms) sits under it, but no in-window run used 30_000; the only measured-sufficient value is the legs' 60_000.
- Whether the 13 census-tier files that spell `timeout` budget their registered rows: only `docs07-provider-rules.census.ts` (15 spellings) is among the register's 11 census-tier files, and I did not read which rows its budgets cover; its `:850` row was granted at the 5000 ms marker in-window (M:18932).
- The 10 embedded docs09 legs without an `outcome` field (Finding 6): 8 carry `passed: 88` and none carries `failed` > 0, but I did not open their logs.
- The orchestrator's packet for the same window states 3717 rows and gate-pass 100 where I measure 3705 and 99; I did not diff the two derivations row-by-row (the ledger grew between my reads with the window count stable, so append timing and correction rows are the likely difference; the artifact that would settle it is the packet's own row-id list, which I do not have).
- Beyond wb-ro6u (Finding 6, from ledger rows), whether other cuts are in flight: I ran no `bd` commands, and `.beads/issues.jsonl` at b887fa2e mentions `detached-timing` twice (Finding 4's grep) but I did not read its rows. I also did not read wb-ro6u's gate state past M:19240.
- Whether per-it budgets change the census tests' semantics (a census judge that legitimately hangs would now take up to the budget to red); I measured cost, not that trade.
