# CORROBORATION, n=2: export readers grew 83 of 475 to 141 of 545 in 6 days, a landed census reads the installed tree, and 41 of 41 sweeps say unflagged_red=none

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat as the corroborated file, a later cycle: the window 2026-11-01T07:55Z..2026-11-02T07:55Z against its 2026-10-26T07:30Z..2026-10-27T08:00Z, re-running the corroborated file's own instrument at a revision six days and 336 landings later. A later window with the same instrument, not a re-run of its rows.
**Date:** 2026-11-02 (ledger window: rows whose `utc` is at or after 2026-11-01T07:55:00Z and before 2026-11-02T07:55:00Z = M:44048..M:47330; stamp 2026-11-02T07:55Z; every count re-derived 08:35Z-08:55Z; the Finding 2 split, the Finding 3 window census list, the Finding 4 export grep, the Finding 7 re-check grep and the registry/vocabulary quotes were re-derived again at the verifier-driven fix pass, which started after 09:07Z and finished at 09:17Z)
**`pi-subagents` revision:** installed tool = trunk `origin/workbench/implementation-program` at `5779ecaf116178b603edd10e40655bd3acf7c2a5` at 07:55Z, the landing-813..814 hop (`ledger: close wb-ey9p .. wb-jwc.11 (landings 813..814, batch B813-814-d418fee-t1, merge 69d08250)`, committed 2026-11-02T07:51:34Z). After `git fetch -q origin` (rc 0) the fetched ref stands at `00b18a9c0eae8098414bfa7db6d8d55723d2c8ec` (2026-11-02T08:33:02Z, landing 817); `git merge-base --is-ancestor 5779ecaf11 origin/workbench/implementation-program` exits 0, and `git diff --stat 5779ecaf11 00b18a9c0eae -- new-feedback/ docs/ AGENTS.md CONTRIBUTING.md README.md package.json package-lock.json tsconfig.json vendor/ test/workbench-hx-mutation-verified-readers-census.test.ts test/helpers/hx-mutation-verified-readers.ts test/helpers/rf-e9dy-census-readers.ts test/workbench-rf-graph-policy-context-readers-census.test.ts test/helpers/census.ts` prints nothing, so every path:line below holds at both shas; the headline counts were re-run at `28eea0277c20c5170de88aba4a7606e808cb22ba` and at the fetched tip and are identical at all three (Finding 1). The corroborated file measured at `46ab74f5cc678e565fdc4d851f99e10d1f649309` (2026-10-27T08:16:56Z, `ledger: close wb-3l7x (landing 478, merge 9415907f)`). The rig clone's checked-out HEAD `188ae5901612` sits 2,450 commits behind the fetched ref; its dirty paths are all untracked new-feedback drafts and nothing else (16 at this lane's first read, 18 once this draft and a sibling lane's prep-cost draft were written; 0 tracked files modified); nothing below was read from the working tree, and trunk was neither checked out nor pushed from the main clone (live gate and land worktrees share its object store). At the fix pass (09:12Z) the fetched ref stood at `19d00aa9633ced760b3fd4528ea18c7cb54821a3` (2026-11-02T09:07:27Z, `ledger: close wb-2wiv.5 (landing 819, merge 2488cc85)`; HEAD then 2,456 behind) and the same `git diff --stat 5779ecaf11 19d00aa9633c -- <the path list above>` still prints nothing, so every path:line below holds at that tip too. Delivery: branch `machine/flywheel/feedback-2026-11-02`, cut from a detached worktree of the fetched trunk, for the program owner to land; the gate waiver (docs-only, no gate run) is disclosed in the commit body as this directory's README and the standing operator direction require.
**Machine evidence revision:** `machines/flywheel/ledger/metrics.jsonl` (47,464 lines at read time, 47,578 at the fix pass; `M:n` is the 1-based line number), `machines/flywheel/state/landing-order-registry.json` (450 entries at read time, 452 at the fix pass; `idx n` below means the 0-based position in its `entries[]` array — the entries carry no idx field (the first entry's keys are `alsoPinnedBy, base, census, engagedUtc, file, landed, owner, pinnedSurfaces`), so the locating read is `python3 -I -c 'import json,sys; print(json.load(open(sys.argv[1]))["entries"][446]["census"])' <registry>`; positions 445 and 446 name the same two censuses at both reads) and `machines/flywheel/state/registry-class-vocabulary.json`, all read read-only with `python3 -I`.
**Method:** read-only re-derivation: `git grep` / `git show` / `git ls-tree` at the pin (and at `46ab74f5`, `28eea0277c`, `00b18a9c`) in the rig clone after `git fetch -q origin`; the corroborated file's Finding 5 instrument re-run verbatim plus its own bounding filter (non-comment line + `readFileSync`); a `python3 -I` pass over the ledger window M:44048..M:47330. No test, gate, bd command or mutant ran in this lane; every red/green statement quoted is the machine's own, copied from a row.
**Scope:** feedback about pi-subagents' census convention as a tool surface — what a landed census reads at test time beyond the cut's own files (the bead export `.beads/issues.jsonl`, and now also the installed tree: `node_modules`, `tsconfig.json`) and whether any contributor doc names that read class. Not about the beads those censuses guard. The machine-side registry and ledger are cited as producer evidence; this file leaves the gate-red mechanics of the export class to the corroborated file and restates none of it.
**Corroborates:** [`2026-10-27-the-wb-tz4r-8-census-reads-the-bead-export-in-the-gate-so-one-unpinned-bead-note-redded-landing-467-at-32-min-vs-13-5-clean-n-2-with-412-and-83-of-475-trunk-tests-read-it.md`](2026-10-27-the-wb-tz4r-8-census-reads-the-bead-export-in-the-gate-so-one-unpinned-bead-note-redded-landing-467-at-32-min-vs-13-5-clean-n-2-with-412-and-83-of-475-trunk-tests-read-it.md) — verdict **STILL-TRUE** at `5779ecaf11` for its Findings 1, 2 and 5 (the only ones re-checked; table below); independent hit 2. The target is unlanded on trunk and travels on `origin/machine/flywheel/feedback-2026-10-27`; an untracked working copy of it sits in this directory and is byte-identical to that branch's blob (`git show` piped to `diff -q` against the working copy: no output, rc 0).
**Prior art:** at the fetched ref, `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` lists 18 entries (17 files + README.md, latest dated 2026-10-25) — none names the export-reader count, node_modules reads or the landing-order registry. A filename keyword scan (`node.?modules|issues.?jsonl|install-tree|83-of-475|141-of`) over all 15 `origin/machine/flywheel/feedback-*` branch listings hits only the corroborated file and the trunk npm-ci file (`2026-10-20-npm-ci-in-25-gate-worktrees-cost-13098-s-...md`, install COST, not test-time reads). Adjacent, cited in the table below and not restated: the 11-01 n=4 skip-cache file (same export surface, realized reds in ITS window) and the 10-31 istypenode file (installed-TypeScript reader behaviour). A sibling draft of this same cycle (the 2026-11-02 npm-ci 7-s-median prep-cost corroboration) sits uncommitted in this directory; different claim, no overlap with this one.

## Why a second file rather than an edit

The corroborated file carries its own window (2026-10-26T07:30Z..2026-10-27T08:00Z), its own revision (`46ab74f5`) and its own method, and it already travels on its own delivery branch; it is not edited. A separate file keeps the two measurements separable, which is what makes n=2 mean anything — folding this window's counts into that file would turn two dated samples of a growth curve into one undated one. It also keeps this directory's append-only rule and spares every writer the merge conflict a shared file imposes under concurrent filing.

## What this adds

- **A new measurement at a new revision:** the corroborated file's Finding 5 instrument, re-run verbatim six days later: 83 of 475 at `46ab74f5` grew to 141 of 545 at `5779ecaf11` (+58 reader files, 1.70x the count, share 17.5% to 25.9% of the test tree), stable across three read shas; 11 of the +58 are the census files this window's own 41 landings added (Finding 3).

The second read class on the same surface (a landed census that reads the installed tree, Finding 3) and the window's realized-cost zero (Finding 6) are reported as findings, not as the corroborating addition.

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| The gate's census reads the bead export, a foreign unpinned note reds a landing, 2 realized instances (landings 412, 467), 83 of 475 trunk tests read the export | the corroborated file (its Findings 1-5) |
| Realized cost of the export surface in a later window: trunk red twice in 24 h, 5 held gates, 16,648 gate-seconds (skip-cache census mention rows) | `2026-11-01-CORROBORATION-n-4-the-skip-cache-census-makes-any-note-naming-a-family-a-mention-row-quotes-included-so-trunk-red-twice-in-24-h-and-5-held-gates-burned-16-648-gate-seconds.md` (branch `machine/flywheel/feedback-2026-11-01`) |
| Installed-TypeScript reader behaviour under ts 6.0.3 (isTypeNode-guarded readers skip value-position instantiation expressions) | `2026-10-31-istypenode-guarded-readers-skip-value-position-instantiation-expressions-under-ts-6-0-3-11-wb-021-2-plants-quiet-8-of-9-landed-guard-sites-lack-the-scratch-census-carve-out.md` (branch `machine/flywheel/feedback-2026-10-31`) |
| The installed tree's INSTALL cost per gate worktree (npm ci, 13,098 s in 24 h) | `2026-10-20-npm-ci-in-25-gate-worktrees-cost-13098-s-3-6-h-in-24-h-median-398-s-max-1176-s-so-a-shared-offline-cache-or-node-modules-snapshot-would-return-about-a-seat-hour-per-gate-lane.md` (on trunk) |

## Summary, with numbers

Re-running the corroborated file's own instrument at `5779ecaf11`: **141 of 545** test-tree `.test.ts`/`.census.ts` files name `issues.jsonl`, against **83 of 475** at `46ab74f5` six days earlier — +58 files, 1.70x the count, 17.5% to 25.9% of the tree. Its bounding checks hold at both refs: every listed file names the export on a non-comment line AND carries `readFileSync`, and the bounded set is byte-identical to the name-grep set (comm diff 0 both ways, 141=141 and 83=83), so the count is a read count, not a mention count. The window's own 41 landings (772..812) added 11 test files to the tree, all 11 census files and 11 of 11 export readers in the 141; 1 of the 11 extends the read surface beyond the export: the landing-810 census (`test/workbench-hx-mutation-verified-readers-census.test.ts`, bead wb-ts6.3, 2,061 lines) reads, at test time, `tsconfig.json`, the installed TypeScript, the vendored `@hyperunix/sdk` dist under `node_modules/`, `@types/node`, a shared helper's whole header comment, and the bead export — self-declared at its line 40 and typed read-for-read by the machine's landing-order registry (the entry at idx 446; idx 445 is the landing-809 sibling; idx = the 0-based `entries[]` position, defined in the metadata block). Tree-wide, 59 of 507 top-level test files name `node_modules` on a non-comment line: 31 of the 59 touch or judge an installed-tree path (24 through a `join(..., "node_modules", ...)` call or a `/node_modules/` literal, 7 more through a bare `node_modules/@hyperunix/sdk/...` literal), 27 name it only in walker skip or exclusion lists, 1 probes for its presence; and 168 files under `test/` import the installed TypeScript (107 at `46ab74f5`). No contributor doc names either read class: the 73 installed-tree needle hits over `docs/` `AGENTS.md` `CONTRIBUTING.md` `README.md` are all packaging, SDK-API or per-bead receipt prose, and the 8 `issues\.jsonl` hits over the same corpus are 2 `AGENTS.md` "passive export" lines, 1 program-ledger description and 5 per-bead receipt lines (`CONTRIBUTING.md`: 0 of 73 and 0 of 8; armed control: 9 `vendor/` hits; `test/README.md` absent). Realized cost this window: none — 41 of 41 fold-done sweeps (landings 772..812) read `unflagged_red=none`; the single non-none `flagged_red` is the hand-flagged known red `wb-zmez` at landing 784. Findings 1-4 and 6 CONFIRMED, Finding 5 PLAUSIBLE. Cheapest fix: one contributor-doc paragraph naming the two test-time read classes and what moves them.

## Finding 1 — the corroborated count reproduces and grew: 83 of 475 at `46ab74f5` to 141 of 545 at `5779ecaf11`, the same 141 under the tighter bound, stable at three read shas — **CONFIRMED**

The corroborated file's Finding 5 stated its instrument verbatim: "At the pin, `git grep -l 'issues\.jsonl' 46ab74f5… -- 'test/*.test.ts' 'test/*.census.ts'` lists **83** files of **475** (`git ls-tree -r --name-only … -- test/ | grep -E '\.(test|census)\.ts$' | wc -l`)", bounded by "in **83 of 83** the first `issues\.jsonl` line survives `grep -vE '^\s*(//|\*|/\*)'`" and a file-read-call check. Re-run here:

```
$ git grep -l 'issues\.jsonl' 46ab74f5cc678e565fdc4d851f99e10d1f649309 -- 'test/*.test.ts' 'test/*.census.ts' | wc -l
83
$ git ls-tree -r --name-only 46ab74f5cc678e565fdc4d851f99e10d1f649309 -- test/ | grep -cE '\.(test|census)\.ts$'
475
$ git grep -l 'issues\.jsonl' 5779ecaf116178b603edd10e40655bd3acf7c2a5 -- 'test/*.test.ts' 'test/*.census.ts' | wc -l
141
$ git ls-tree -r --name-only 5779ecaf116178b603edd10e40655bd3acf7c2a5 -- test/ | grep -cE '\.(test|census)\.ts$'
545
```

Growth: +58 reader files and +70 tree files in 6 days; 141/83 = 1.70x; share 17.5% (83 of 475) to 25.9% (141 of 545). Under the tighter bound I applied (the match must sit on a non-comment line — stripped line not starting `//`, `*` or `/*` — AND the file must contain `readFileSync`, restricted to top-level `test/*.test.ts`): 83 of 439 top-level files at `46ab74f5` and 141 of 507 at the pin, and `comm -3` between the bounded list and the name-grep list prints nothing at either ref — the two instruments select the identical files, so every counted file is a top-level `.test.ts` that reads the export on a code line. The pin-level counts are identical at `28eea0277c` (landings 815-816) and at the fetched tip `00b18a9c` (landing 817): 141 of 507 top-level, 59 node_modules namers, 168 typescript importers, 164 census-named files at each. Tree shape at the pin: 164 of the 507 top-level `.test.ts` files are census-named (106 of 439 at `46ab74f5`), and 143 of the 199 files under `test/fixtures/` are roster-named. The wb-tz4r.8 census the corroborated file centred on is still in the set: `test/workbench-ri-decision-seed-claim-census.test.ts:182` at the pin reads `const BEAD_EXPORT = ".beads/issues.jsonl";` and the file carries `readFileSync`.

## Finding 2 — 59 of 507 top-level test files name `node_modules` on a non-comment line; 31 of the 59 touch or judge an installed-tree path, 27 only skip it, 1 probes for it; 168 files under `test/` import the installed TypeScript — **CONFIRMED**

Instrument: `git grep -n -E '"node_modules"|node_modules/@hyperunix' 5779ecaf11 -- 'test/*.test.ts'`, keep matches whose stripped line does not start `//`, `*` or `/*` and whose path is top-level `test/*.test.ts`, count distinct files: **59 of 507**. The split below was made by reading every matching line of each of the 59 files, not by subtraction. **24 of the 59** have at least one such line that passes the strict filter as it ran — the line holds both `join(` and `"node_modules"`, or holds the literal `/node_modules/` (the list begins `test/agent-runner.test.ts`, `test/skill-loader.test.ts`, `test/workbench-beads-claim-recheck-census.test.ts`, `test/workbench-census-helper.test.ts` and includes `test/workbench-hx-mutation-verified-readers-census.test.ts` and `test/workbench-release-checklist.test.ts`); **19** of the 24 use the `join(..., "node_modules", ...)` form. **7 more** fail that strict filter yet build, read or judge an installed-tree path through a bare `node_modules/@hyperunix/sdk/...` literal with no leading slash — the namer regex catches them and the strict filter misses them; `git grep -n -E 'node_modules/@hyperunix' 5779ecaf11 -- <the 7 files>`, non-comment lines, verbatim:

```
test/workbench-hx-admission-reason-census.test.ts:161:const JUDGED_FILES = ["node_modules/@hyperunix/sdk/dist/result.d.ts", "src/workbench/hyperunix-observer.ts"];
test/workbench-hx-cost-certificate-census.test.ts:217:const SDK_DIST = 'node_modules/@hyperunix/sdk/dist';
test/workbench-hx-gp-answer-invariance-census.test.ts:306:const SDK_DIST = "node_modules/@hyperunix/sdk/dist";
test/workbench-hx-gp-answer-invariance-census.test.ts:1308:    const sdkVersion: unknown = JSON.parse(textOf("node_modules/@hyperunix/sdk/package.json")).version;
test/workbench-hx-sio-design-status-census.test.ts:489:const SDK_DIST = "node_modules/@hyperunix/sdk/dist";
test/workbench-hx-sio-design-status-census.test.ts:3700:    const sdkVersion: unknown = JSON.parse(textOf("node_modules/@hyperunix/sdk/package.json")).version;
test/workbench-hyperunix-lineage-gate-census.test.ts:145:const SDK_ROOT = 'node_modules/@hyperunix/sdk';
test/workbench-hyperunix-structural-explanation-census.test.ts:168:const JUDGED_FILES = ["node_modules/@hyperunix/sdk/dist/result.d.ts", "src/workbench/hyperunix-observer.ts"];
test/workbench-package-boundary.test.ts:226:      "node_modules/@hyperunix/sdk/package.json",
```

So **31 of 59** touch or judge an installed-tree path (24 strict + 7 bare SDK-path literals). **27 of 59** name it only in walker skip or exclusion lists, or in an assertion over such a list (`test/workbench-gp-provenance-census.test.ts:588` parses an ignore file; `test/workbench-rf-undetermined-premise-census.test.ts:2619` asserts its own `SKIPPED_DIRS`), e.g.:

```
test/workbench-apo-export-census.test.ts:762:      if (item.name === ".git" || item.name === "node_modules" || skip(path)) continue;
test/workbench-fiber-debug-identity-census.test.ts:380:const DOC_SKIP: ReadonlySet<string> = new Set(["node_modules", ".git", "test", "dist", ".forge", "coverage"]);
test/workbench-fiber-debug-identity-census.test.ts:394:      if (entry.name === "node_modules" || (directory === base && DOC_SKIP.has(entry.name))) continue;
```

— the opposite mechanism: those censuses deliberately exclude the installed tree from their walks. The remaining **1 of 59** is neither: `test/workbench-furnace-episode-lineage-census.test.ts:353` reads `nodeModules: directories.some((entry) => name(entry) === "node_modules"),` — a presence probe over a listed directory. With the same non-comment filter at `46ab74f5` (pathspec `test/*.test.ts`, any depth), the namer count was **44**, so this class also grew (+15 files in 6 days). And `git grep -l -E 'from "typescript"' 5779ecaf11 -- test/` lists **168** files under `test/` (of the 599 `.ts` files under `test/`; the whole tree holds 729: 117 under `src/`, 599 under `test/`, 13 `vitest.*.config.ts`; **107** at `46ab74f5`) — each a test-time consumer of the installed `typescript` package.

## Finding 3 — the landing-810 census reads the installed tree at test time (`tsconfig.json`, the installed TypeScript, the vendored SDK dist, `@types/node`) and self-declares it at :40-41; it is 1 of the 11 census files the window's landings added, 11 of 11 export readers — **CONFIRMED**

`test/workbench-hx-mutation-verified-readers-census.test.ts` at the pin (2,061 lines; landed at landing 810, hop `e23b18e`), read with `git show 5779ecaf11:<path> | cat -n`:

```
    40	 * are virtual (in memory, never on disk). src, the installed SDK, tsconfig.json, the helper and .beads/issues.jsonl are only
    41	 * read. Display paths added: none.
    47	import ts from "typescript";
   507	const SDK_MUTATION_MODULE = join(REPO, "node_modules", SDK, "dist", "protocol", "mutation.js");
   508	const SDK_PACKAGE_DIR = join(REPO, "node_modules", SDK);
   511	  return realpathSync(SDK_PACKAGE_DIR).split(sep).join("/");
   886	  const configPath = join(REPO, "tsconfig.json");
   887	  const config = ts.readConfigFile(configPath, path => ts.sys.readFile(path));
   890	  const options: ts.CompilerOptions = { ...parsed.options, types: ["node"] };
   916	const SDK_DIST = "/node_modules/@hyperunix/sdk/dist/";
  1360	    { id: "ID-RESOLVE-BARE", read: () => resolvesIntoSdk(SDK, join(REPO, "src", "index.ts"), compiled().options, sdkReal()), expected: () => true },
  1877	  for (const line of readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")) {
  1922	    const lines = readFileSync(join(REPO, HELPER), "utf8").split("\n");
  1924	    expect(lines.slice(0, header.length), `${HELPER}'s header comment, line for line`).toStrictEqual(header);
```

So at test time this landed census reads: the installed TypeScript (:47), the vendored SDK's installed dist via `realpathSync` (:507-511) and the `/node_modules/@hyperunix/sdk/dist/` segment (:916) with module resolution exercised into it from `src/index.ts` (:1360, :1368), `tsconfig.json` through `ts.readConfigFile` (:886-888) with `types: ["node"]` (:890) pulling `@types/node`, the bead export (:1877), and the shared helper `test/helpers/hx-mutation-verified-readers.ts`, whose WHOLE header comment it holds line for line (:1922-1924; the helper's own header, lines 12-14, states "The falsifier census ... holds this whole header line for line"). The census declares this read set itself at :40-41. The machine's landing-order registry — producer evidence; 450 entries at read time and 452 at the fix pass; idx = the 0-based position in `entries[]`, the entries carry no idx field (metadata block) — types the same reads: the entry at idx 446 (`census: test/workbench-hx-mutation-verified-readers-census.test.ts`, `class: READER-NAMED`, `addedAtLanding: 810`, `addedUtc: 2026-11-02T06:59:29Z`) carries 7 reads, 4 of them under the installed tree or its config, quoted from `reads[2..5]`:

```
reads[2]: tsconfig.json (ts.readConfigFile at census :886-888, parsed for the virtual program with types [node] :891)
reads[3]: node_modules/typescript (import ts at census :47 and helper :72 - the parser and checker the readers run on; the installed TypeScript)
reads[4]: node_modules/@hyperunix/sdk/dist (SDK_PACKAGE_DIR and SDK_MUTATION_MODULE at census :507-508 read by realpathSync :511; the SDK_DIST segment :916; the ID-RESOLVE rows resolve into it from src/index.ts :1360/:1368)
reads[5]: node_modules/@types/node (the ProcessEnv interface the checker resolves for the EV-READS claim :192, named through types [node] :891)
```

Its `readsNote` records that the gate's PREP stage worded the class as the legacy string `READER + BEAD-EXPORT`, cured to the canonical token via `state/registry-class-vocabulary.json`, whose `legacy["READER + BEAD-EXPORT"]` entry reads, whole, `{"liveIdx": 185, "defaultCure": "READER-NAMED (its reads field is a 3-path named set) - verify at touch", "cureForm": "superseding append carrying cureOf (legacy string verbatim) + cureBasis (one line citing the read set)"}`. The sibling entry idx 445 (`test/workbench-rf-graph-policy-context-readers-census.test.ts`, landing 809, `addedUtc 2026-11-02T06:50:37Z`) types 6 reads for the other census landed this window; its cited lines verify at the pin — `:523` reads the export (`readFileSync(join(REPO, EXPORT), ...)`), `:579` the census's own source, `:794` its roster fixture. Eleven census files landed in the window: `git diff --diff-filter=A --name-only 8c19b3a d418fee -- 'test/*census*.test.ts'` lists 11, where `8c19b3a` is the `baseFrom` of landing 772's fold-done row (M:44055, `utc 2026-11-01T07:57:08Z`, sweep `sweep-landing aa9ea0d vs 8c19b3a: unflagged_red=none flagged_red=none f5=wb-0x41`) and `d418fee` is the landing-812 hop; the same diff over `'test/*.test.ts' 'test/*.census.ts'` lists the same 11 and nothing else:

```
test/workbench-apo-snapshot-census.test.ts
test/workbench-apo-snapshot-global-reader-census.test.ts
test/workbench-docs12-section-source-census.test.ts
test/workbench-edc-demand-channel-reader-census.test.ts
test/workbench-furnace-nested-rendering-census.test.ts
test/workbench-hx-mutation-verified-readers-census.test.ts
test/workbench-rf-committing-render-posture-census.test.ts
test/workbench-rf-graph-policy-context-readers-census.test.ts
test/workbench-rf-operation-receipt-honesty-census.test.ts
test/workbench-rf-tsx-registrar-readers-census.test.ts
test/workbench-sealed-reference-scan-census.test.ts
```

11 of 11 name `issues.jsonl` on a non-comment line and carry `readFileSync` at the pin (members of the 141, and 11 of the +58 since `46ab74f5`); 1 of 11 — this landing-810 census — names `node_modules` on a non-comment line (6 such lines; 0 in each of the other 10); the newest two (landings 809 and 810) are the ones the registry types at idx 445 and 446. The class the corroborated file measured is still being added to, and the reads are typed per census only in the machine's registry and in the census's own header, which is Finding 4.

## Finding 4 — the dependencies those reads land on are pinned and documented, but no contributor doc states that a landed census may read the installed tree or the export at test time — **CONFIRMED** (armed absence)

The pins, at the pin sha: `package.json:39` reads `"@hyperunix/sdk": "file:vendor/hyperunix-sdk-0.1.0.tgz",`, `:42` `"typescript": "6.0.3"` (exact), `:67` `"@types/node": "^25.5.0",` (caret range), `:71` `"vitest": "^4.0.18"`; `package-lock.json:1733-1736` pins the SDK tarball (`"version": "0.1.0"`, `"resolved": "file:vendor/hyperunix-sdk-0.1.0.tgz"`, `"integrity": "sha512-hP4oOt5yVnrtj7FN1xVzNPe1aCMMAz/vBJtnL6pn5zNB3Ax3JTcomAQVtcdmd2bFMjZUPMwAPFLCIFwMFNJqSA=="`); `docs/workbench/17-packaging-and-operations.md:68` is the dependency-table row, verbatim:

```
| @hyperunix/sdk | `0.1.0` vendored tarball (`file:vendor/hyperunix-sdk-0.1.0.tgz`), checksum-pinned by the lockfile | lockfile integrity |
```

The absence, installed-tree half: `git grep -n -i -E 'node_modules|installed sdk|re-vendor|install-dependent' 5779ecaf11 -- docs/ AGENTS.md CONTRIBUTING.md README.md` returns **73 lines across 20 files**, and every one is packaging/vendoring prose, SDK API-shape prose, or a per-bead gate receipt (41 of the 73 sit in one receipt, `docs/workbench/receipts/wb-nl8.1.md`; `CONTRIBUTING.md` contributes **0 of 73**). The closest line is a type-authoring rule, `AGENTS.md:17`: "Check `node_modules` for external API types (`@earendil-works/pi-*`, `typebox`, etc.); don't guess." — about writing code, not about tests reading the installed tree at run time. Armed control on the same instrument and corpus: the needle `vendor/` returns 9 hits (among them `docs/workbench/17:66-68` and `08-lifecycle-and-recovery.md:61`), so the grep does read these files and the zero is a real absence, not a dead instrument. `test/README.md` does not exist at the pin (`git cat-file -e` fails). The export half, armed with the same instrument on the same corpus: `git grep -n -i -E 'issues\.jsonl' 5779ecaf11 -- docs/ AGENTS.md CONTRIBUTING.md README.md` returns **8 lines** (`CONTRIBUTING.md` 0 of 8), quoted verbatim, with `...` marking the two lines cut for length:

```
AGENTS.md:191:**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.
AGENTS.md:248:**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.
docs/workbench/15-implementation-program.md:7:The in-repo Beads ledger (`.beads/issues.jsonl`, live local Dolt in `.beads/`) tracks each W01–W22 and VC-1–VC-7 with explicit dependencies; `bd ready` is its live state. ...
docs/workbench/receipts/wb-a9l2.8.md:12:- Owner anchor: the wb-a9l2.8 row of the tracked bead export (.beads/issues.jsonl) states the acceptance clauses (a), (b) and (c), and rows A, B and C hold their labels to them verbatim.
docs/workbench/receipts/wb-a9l2.8.md:64:- Owner anchor: the wb-pdee row of the tracked bead export (.beads/issues.jsonl) states F1's cure and F2's families (i), (ii) and (iii), and rows S, I, K and D hold their labels to them verbatim.
docs/workbench/receipts/wb-a9l2.8.md:107:- Owner anchor: the wb-7thm row of the tracked bead export (.beads/issues.jsonl) states F1's, F2's and F3's cure shapes and F7's two riders, and rows U, P, H, X and W hold their labels to them verbatim.
docs/workbench/receipts/wb-pfxo.1.md:20:- Owner anchor: the wb-pfxo.1 row of the tracked bead export (.beads/issues.jsonl) states the acceptance clauses (a) to (d), and rows A to D hold their labels to them verbatim.
docs/workbench/receipts/wb-zsv.md:113: ... tree-wide, one pre-existing .beads/issues.jsonl row (wb-2j3.6) and this receipt's own lines also carry the string, none of them executable code ...
```

None of the 8 is a contributor convention statement: `AGENTS.md` calls the export passive, twice, and never names it as a test input; `15-implementation-program.md:7` says the ledger tracks the program's work items; the four `Owner anchor` receipt lines do record that a census holds its rows to an export row — per-bead receipts written at closure, which is the receipt carve-out this finding already applies to the installed-tree half (41 of the 73 hits sit in `wb-nl8.1.md`) and applies here to the export half too; `wb-zsv.md:113` names an export row as a non-executable carrier of a string. The convention is stated only inside the census itself (:40-41) and in the machine's registry — a cutter reading this repository's docs cannot learn that a landed census may read `node_modules` or the export, nor what moves such a census.

## Finding 5 — a re-vendor or a lock bump moves what a landed census reads — **PLAUSIBLE**

Mechanism, from the pins in Finding 4: the SDK read lands on a lockfile-pinned tracked tarball, so a re-vendor is a tracked commit that the registry's READER-NAMED contact rule surfaces at landing time (reads[] intersection); the `@types/node` caret range (`^25.5.0`) means a lock bump can move the `ProcessEnv` declaration that the census's EV-READS claim resolves through `types: ["node"]` without any tracked source line changing. Not exercised: no re-vendor and no lock change occurred in this window — `git diff --stat 5779ecaf11 00b18a9c0eae -- package.json package-lock.json vendor/` prints nothing — so the movement is consistent with the evidence but was not observed, which is what this grade means here.

## Finding 6 — realized cost in this window: none; 41 of 41 fold-done sweeps read `unflagged_red=none`, and the one non-none `flagged_red` is a hand-flagged known red — **CONFIRMED**

All 41 `fold-done` rows in the window (landings 772..812) carry a `sweep` field containing `unflagged_red=none`; 40 of 41 also read `flagged_red=none`. The four landings that folded the censuses and registry work above, quoted verbatim:

```
M:47163 (landing 809, 2026-11-02T06:56:05Z): sweep-landing c820a4c vs f5cb912: unflagged_red=none flagged_red=none f5=wb-zmez
M:47181 (landing 810, 2026-11-02T07:03:50Z): sweep-landing e23b18e vs c820a4c: unflagged_red=none flagged_red=none f5=wb-zmez
M:47240 (landing 811, 2026-11-02T07:23:53Z): sweep-landing 061f928 vs e23b18e: unflagged_red=none flagged_red=none f5=wb-zmez
M:47280 (landing 812, 2026-11-02T07:39:43Z): sweep-landing d418fee vs 061f928: unflagged_red=none flagged_red=none f5=wb-zmez
```

The exception: M:44647 (landing 784, bead wb-wgk3) reads `sweep-landing 864e621 vs 91c88b3: unflagged_red=none flagged_red=wb-zmez f5=wb-0x41` — a hand-FLAGGED known red (the machine's knownRedAtLanding convention), not a surprise red; its unflagged field is still `none`. None of the window's 7 `machine-defect` rows (M:45435, M:45499, M:45823, M:46763, M:46764, M:46850, M:47200) names the export or an export-reading test. So the class the corroborated file measured at 2 realized instances (landings 412 and 467) and the 11-01 n=4 file measured at 2 trunk reds realized ZERO cost this window across 41 landings — the exposure grew (Finding 1) while the window's realized cost was none, and the same instrument family that showed the earlier reds (sweep fields, refusal rows, defect rows) is what shows the zero. Supporting mechanics re-checked: 4 of 4 spot-checked hop commits of those sweeps (`c820a4c`, `e23b18e`, `061f928`, `d418fee`) each touch exactly 2 files, one of them `.beads/issues.jsonl` — the export still moves under every landing, as the corroborated file's Finding 2 stated.

## Evidence

Counts at four revisions, one line per ref (the per-ref filter is spelled in Findings 1 and 2; `readers` = non-comment `issues.jsonl` line + `readFileSync`, top-level; `nm` = non-comment node_modules namers; `ts` = files under `test/` importing typescript; `census` = census-named top-level `.test.ts`):

```
REF=46ab74f5cc678e565fdc4d851f99e10d1f649309 total=439 readers=83  nm=44(any-depth) ts=107 census=106
REF=5779ecaf116178b603edd10e40655bd3acf7c2a5 total=507 readers=141 nm=59 ts=168 census=164
REF=28eea0277c20c5170de88aba4a7606e808cb22ba total=507 readers=141 nm=59 ts=168 census=164
REF=00b18a9c0eae8098414bfa7db6d8d55723d2c8ec total=507 readers=141 nm=59 ts=168 census=164
```

Set equality of the two reader instruments (Finding 1): at the pin, `comm` between the sorted name-grep list (141) and the sorted bounded list (141) prints 0 lines either way; same at `46ab74f5` (83, 0 lines). Ledger window: 3,283 rows M:44048 (`utc 2026-11-01T07:55:02Z`)..M:47330 (`utc 2026-11-02T07:54:50Z`); kind counts: fold-done 41 (landings min 772, max 812), gate-pass 41, gate-refused 76, machine-defect 7. Producer-side instruments, cited here as evidence and not graded as rig positives: the machine-side registry entries at positions 445 and 446 (6 and 7 line-anchored reads, and the vocabulary's cure of the legacy class string) and the 41 `fold-done` rows' `sweep` fields (`unflagged_red=...`, with the hand flag `flagged_red=wb-zmez` at landing 784) are what made Findings 3 and 6 checkable in one pass; they belong to the machine's ledger and state, which this file reads and does not grade. Registry and vocabulary quotes in Finding 3 are from the two `python3 -I` reads named in the metadata block; census, helper, `package.json`, `package-lock.json`, `docs/` and `AGENTS.md` lines are from `git show 5779ecaf11:<path> | cat -n` and `git grep ... 5779ecaf11`, quoted verbatim above.

## Re-check verdicts on the corroborated file

| Claim in the corroborated file | Verdict at `5779ecaf11` |
|---|---|
| Finding 1 — the gate's default test step runs the wb-tz4r.8 census and pin A3 asserts over every export row | **STILL-TRUE** for the reading half re-checked here: the census still reads the export (`:182` `const BEAD_EXPORT = ".beads/issues.jsonl";`, `readFileSync` present, member of the 141); the gate-step half was not re-read |
| Finding 2 — every landing's hop commit rewrites the export, so the gate reads the store as the previous landing left it | **STILL-TRUE** at 4 of 4 spot-checked window hops (`c820a4c`, `e23b18e`, `061f928`, `d418fee`: 2 files each, one `.beads/issues.jsonl`); the other 37 hops not checked |
| Finding 3 — landing 467 cost 32 min vs 13.5 clean | **UNDETERMINED** here — historical rows not re-read this session |
| Finding 4 — the cure (marker + pin append, 7 min 40 s) | **UNDETERMINED** here — not re-read |
| Finding 5 — 83 of 475 trunk test files name `issues.jsonl` on a code line and carry a file-read call | **STILL-TRUE and grown** — 141 of 545 with its own instrument, 141 of 507 under the tighter bound, identical file sets (Finding 1) |
| Finding 6 — the other 7 unpinned censuses hard-assert over foreign rows the way A3 does | **UNDETERMINED** here — not re-checked |
| Finding 7 — the admitting form is spelled in 24 tracked files and 0 under docs/; `AGENTS.md` calls the export passive and never a gate input | **STILL-TRUE** at `5779ecaf11` — `git grep -c '485f3615db1e' 5779ecaf11` lists 24 tracked files (`.beads/issues.jsonl`, now 24 rows against 22 at `46ab74f5`, plus 23 under `test/`), 0 of them under `'docs/**' '*.md'`; `AGENTS.md:191` and `:248` still read "`.beads/issues.jsonl` is a passive export"; the export is named in 0 non-receipt convention statements under `docs/` (8 hits in all, quoted in Finding 4) |
| Finding 8 — a docs-surface sibling at landing 401 | **UNDETERMINED** here — not re-checked |

## Suggested fixes, cheapest first — additive to the corroborated file's list

1. One contributor-doc paragraph (a new `test/README.md`, or `docs/workbench/17-packaging-and-operations.md` beside the dependency table, or `AGENTS.md` near line 17) stating the two test-time read classes a landed census may have — the bead export, and the installed tree (`node_modules/typescript`, the vendored SDK dist, `@types/node` via `types: ["node"]`, `tsconfig.json`) — what moves each (a hop commit; a re-vendor; a lock bump; a helper-header edit), and that the census must self-declare its reads the way `test/workbench-hx-mutation-verified-readers-census.test.ts:40` does. Docs-only; it closes Finding 4's absence.
2. Make the per-census read declaration a stated convention (the one-line read roster the landing-810 census already carries at :40-41), so the reader set is greppable by declaration instead of by the two-instrument derivation Finding 1 needed; today the declaration is verified in exactly one in-repo place, the landing-810 census's header (:40-41), and in the machine-side registry; the other 10 window censuses were not read for one (a loose header grep for read-words hits all 11 and decides nothing).
3. Endorse, without restating, the corroborated file's own fix list for scoping export reads to the census's filing rows.

## Positives worth protecting

- The landing-810 census SELF-DECLARES its full read set in its header (":40-41 — src, the installed SDK, tsconfig.json, the helper and .beads/issues.jsonl are only read") — the one in-repo line a cutter can read today; protect it in any census refactor.
- The installed read lands on a checksum-pinned vendored tarball (`package-lock.json:1733-1736`; `docs/workbench/17:68`), so the census's node_modules read is reproducible from the lock rather than from registry weather.
- 27 of the 59 node_modules-naming test files name it only to EXCLUDE it from walks (1 more only probes for its presence) — together with the 448 of 507 top-level test files that never name it, the tree-walking censuses' default posture keeps most of the suite independent of the installed tree.
- The helper-header hold (:1922-1927) freezes the falsifier roster byte-for-byte — a strong anti-drift guard, bought at the cost that every helper header-comment edit is a census change; both halves of that trade are worth knowing before touching the helper.

## What I did not establish

- The dispatch packet that scoped this run quoted "50 of 507" for node_modules-building tests; my re-derivation measures 59 (any non-comment mention), 31 (touches or judges an installed-tree path: 24 strict + 7 bare SDK-path literals) and 24 (the strict filter alone) with the filters spelled in Finding 2, and I file my measured numbers. The packet's exact filter was not stated; I could not reproduce 50 under any variant I ran (59 file-level, 59 non-comment, 31 touch-or-judge, 24 strict, 19 join-only).
- Whether any of the 141 reader files red on a foreign export row between sweeps: no gate or test ran in this lane; the ledger rows and sweep fields are the only witnesses used.
- The corroborated file's Findings 3, 4, 6 and 8 (verdict table: UNDETERMINED here).
- The mechanism behind the hand-flagged known red `wb-zmez` at landing 784 (and its later `f5=` appearances in sweeps 809-812): read as the machine's knownRedAtLanding convention, not traced to its source.
- Hop-rewrites-export was spot-checked at 4 of the window's 41 hops, not all 41.
- Finding 5's movement (re-vendor, lock bump) was not observed — no such change occurred in the window; that is why it is PLAUSIBLE, not CONFIRMED.
- Whether the installed-tree read pattern is intended as a durable convention or an accident of the landing-810 census: the registry types it, that census declares it, and 30 other top-level test files touch or judge an installed-tree path (Finding 2), but no owner statement in this repository says which it is.
