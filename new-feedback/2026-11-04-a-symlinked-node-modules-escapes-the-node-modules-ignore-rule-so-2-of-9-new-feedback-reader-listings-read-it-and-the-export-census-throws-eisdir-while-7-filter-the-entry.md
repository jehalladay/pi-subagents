# A symlinked node_modules escapes the node_modules/ ignore rule, so 2 of 9 new-feedback reader listings read it and the export census throws EISDIR while 7 filter the entry

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — filing the carried owner-sourced candidate from the 2026-11-03 landing's pre-push run; the first file on this class at the fetched ref.
**Date:** 2026-11-04 (filing window 2026-11-03T07:55Z..2026-11-04T07:55Z; the rows of `machines/flywheel/ledger/metrics.jsonl` whose `utc` falls in it = 3,954 of the 54,994 rows at read time; `M:n` = 1-based line n; stamp 2026-11-04T07:54Z)
**`pi-subagents` revision:** installed tool = trunk `origin/workbench/implementation-program` at `a14c87f82e88b56a26c5c53d2f990a4fdc3bcb20` after `git fetch -q origin` rc 0 at launch (committer date 2026-11-04T07:51:27Z, subject `ledger: close wb-cl20 (landing 925, merge 8a69b896)`); every `path:line` below was read with `git show` / `git grep` at that sha and nothing from the clone's checked-out HEAD `188ae59016` (3,419 commits behind the ref). The rig ships no binary of its own: the installed tool is that trunk tree, which the censuses run from. Host instruments: `git version 2.50.1`, node `v24.20.0`.
**Method:** read-only re-derivation at the pin (`git show`, `git grep`, `git ls-tree`); two armed probes in throwaway scratch git repositories (a symlinked `node_modules` against a real one populated by `cp -al`, and the same `.gitignore` rule with and without its trailing slash) plus a node probe on the same paths; the machine ledger, two `state/collect-done/*.json` records and the owner's landing merge read-only. No census was executed; every claim about a test file is a static read and says so.
**Scope:** feedback about pi-subagents' census test-infra as a tool surface — the readers under `test/` that build their file set from `git ls-files --cached --others --exclude-standard` and then read what git listed — not about the beads those censuses judge, and not about the driving machine, whose rows are quoted as producer-side records.
**Prior art:** none on this class at the fetched ref: `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` lists 41 entries (40 files + README.md); the filename grep `symlink|node.?modules|eisdir|census|walker|lstat|cp-al|hardlink|same-filesystem|ignore|gitignore|readfile|ls-files|others|exclude` hits 23 of the 40, every one a census-timing, census-conflict or reader-count file and none on a symlink, EISDIR or lstat; the body grep `git grep -il -E 'EISDIR|isSymbolicLink|symlinked node_modules|node_modules symlink|node_modules/ ignore|lstatSync' origin/workbench/implementation-program -- new-feedback/` hits 0 files. Nearest: `2026-11-02-CORROBORATION-export-readers-grew-83-of-475-to-141-of-545-in-6-days-...md` Finding 2 (59 of 507 test files name `node_modules`; installed-tree reads — an adjacent surface, a different mechanism) and `2026-10-20-npm-ci-in-25-gate-worktrees-...-node-modules-snapshot-...md`, whose fix 2 proposes a `node_modules` snapshot restored by `cp -a` or a hardlink tree — the shared-install motive this hazard sits on. The scaffold ranked `2026-10-27-the-wb-tz4r-8-census-reads-the-bead-export-in-the-gate-...md` first on shared title words (census, export, read); it is about what a census reads at gate time, not about how it lists.
**Delivery:** branch `machine/flywheel/feedback-2026-11-04`, cut from a detached worktree of `origin/workbench/implementation-program`; one-file commit, header `docs(new-feedback): a symlinked node_modules escapes the ignore rule and the export census throws EISDIR (pi-subagents)`; docs-only, so the commit body discloses the gate waiver as `new-feedback/README.md` asks. The owner's pre-push protocol — lint plus every census that names `new-feedback/` (34 test files at the pin) on the merged tree — is the landing check this file itself must pass, which is why the next line exists.
**Path spelling:** every census test path below is written in bracketed descriptive form — `test/workbench-[wb-021.3 export census].test.ts` and the like, the brackets marking my substitution — including inside quoted record text, so that trunk's doc-walking censuses (the wb-021.3, wb-4nut.1 and wb-2wiv.2 families, which read `new-feedback/*.md` at test time) stay green when this file lands, as the 2026-11-02 reword `a1173b1a` did for the sibling file. The literal names are the output of the quoted `git grep` commands at the pin. No quoted sentence is otherwise changed.

## Summary, with numbers

At `a14c87f82e`, `.gitignore:2` is `node_modules/`. The trailing slash makes the rule match a directory only, and to git a symlink named `node_modules` is not a directory: in an armed scratch repository (git 2.50.1) `git ls-files --others --exclude-standard` prints `node_modules` when it is a symlink to a directory and prints nothing when it is a real directory, with `git check-ignore -v node_modules` rc 1 against rc 0 (Finding 1). Node v24.20.0 then throws `EISDIR: illegal operation on a directory, read` on `readFileSync` of that path (Finding 2).

34 test files at the pin name `new-feedback`; 9 of the 34 build a file set from `git ls-files -z --cached --others --exclude-standard`; 2 of the 9 keep a root-level entry from a pathspec-free listing and 7 of the 9 drop it by pathspec, by an extension filter or by an `isFile()` stat (Finding 4). Of the two: the `[wb-021.3 export census]` filters its listing with `existsSync` only (`:799`) and `readFileSync`s every kept path (`:811`), so a symlinked `node_modules` throws (Finding 3 — the listing/filter/read shape CONFIRMED by static read, the throw PLAUSIBLE); the `[tsx activity-boundary census]` catches the read and records the path `unreadable` (`:633-636`), the state its own header says the live pass must not have (`:202`).

The class has two producer-side records before this window — seat ws-02 on 2026-10-27 (`EISDIR: the probe's symlinked node_modules is listed by git as untracked under the 'node_modules/' ignore rule`) and seat ws-05 on 2026-10-29 — and, per the orchestrator's evidence packet, one in-window hit on the owner's pre-push run of the 2026-11-03 landing, cured operator-side with a same-filesystem worktree whose `node_modules` is a real `cp -al` directory. That hit left no ledger row: `EISDIR` matches 0 of the 3,954 in-window rows (1 of 54,994 overall, M:3108 on 2026-10-16, a different EISDIR) and `cp -al` matches 0 of 54,994; what survives is the readback M:51377 `32 censuses 1102/1102 on the merged tree` and the landing merge `4f49666be69a`'s subject `lint + 32 new-feedback reader censuses run pre-push` (Finding 5, UNDETERMINED for the hit, CONFIRMED for the readback). The machine itself never hits the class: 18 in-window rows (16 `worktree-removed` + 2 `gate-refused`) describe its worktrees as carrying `real (non-symlink) node_modules directories` (Finding 6).

Cost in this window: no machine landing lost to it. Exposure: any harness that symlinks `node_modules` to share one install — the owner's pre-push worktree, the machine's 10-27 and 10-29 probe trees, and the snapshot shape the 2026-10-20 file's fix 2 proposes. Cheapest cure: one `lstatSync(join(REPO, path)).isFile()` filter on the export census listing, the form two sibling sites already use (`[rf tsx-cost-adequacy census]:1302`, `test/helpers/[gp-mw coordination census helper].ts:461`); alternatively, `.gitignore:2` without the trailing slash ignores the symlink as well (Finding 1, probe C).

## Finding 1 — the `node_modules/` rule ignores a directory and not a symlink to one, so `ls-files --others` lists the symlink — **CONFIRMED**

Armed probe, both rows, git 2.50.1, in throwaway repositories under my home directory (removed afterwards). Each repository: `git init -q .`, a `.gitignore` of two lines (`dist/` then `node_modules/`, so the rule sits at line 2 as at the pin), a `README.md`, and the `node_modules` entry under test. The target directory `../target/pkg` holds one file, `index.js`.

Probe A — `node_modules` is a symlink to a directory (`ln -s ../target/pkg node_modules`):

```
$ ls -l node_modules
node_modules -> ../target/pkg
$ git ls-files --others --exclude-standard
.gitignore
README.md
node_modules
$ git check-ignore -v node_modules; echo rc=$?
rc=1
```

Probe B, the control — `node_modules` is a real directory populated with a hardlink (`mkdir node_modules && cp -al ../target/pkg/index.js node_modules/index.js`):

```
$ stat -c 'links=%h %n' node_modules/index.js
links=2 node_modules/index.js
$ git ls-files --others --exclude-standard
.gitignore
README.md
$ git check-ignore -v node_modules; echo rc=$?
.gitignore:2:node_modules/	node_modules
rc=0
```

Probe C, the cure variant — the same symlink, `.gitignore` line 2 spelled `node_modules` without the slash:

```
$ git ls-files --others --exclude-standard
.gitignore
README.md
$ git check-ignore -v node_modules; echo rc=$?
.gitignore:2:node_modules	node_modules
rc=0
```

The rule at the pin:

```
$ git show a14c87f82e88b56a26c5c53d2f990a4fdc3bcb20:.gitignore | grep -n node_modules
2:node_modules/
```

So any `--others --exclude-standard` listing run in a worktree whose `node_modules` is a symlink carries the entry `node_modules`, and a listing run in a worktree with a real `node_modules` directory does not. The `cp -al` control is the operator's cure shape: a hardlinked tree is a real directory to git and shares the install's inodes.

## Finding 2 — node throws EISDIR on the listed symlink, and every cheap stat says what it is — **CONFIRMED**

Node v24.20.0 in probe A's repository (the symlink), one `node -e` script; command and output verbatim:

```
$ node -e 'const fs = require("fs"); const p = "node_modules"; try { fs.readFileSync(p); } catch (e) { console.log(`readFileSync -> ${e.code} - ${e.message}`); } console.log(`lstatSync.isSymbolicLink ${fs.lstatSync(p).isSymbolicLink()} | statSync.isDirectory ${fs.statSync(p).isDirectory()} | existsSync ${fs.existsSync(p)} | lstatSync.isFile ${fs.lstatSync(p).isFile()} | statSync.isFile ${fs.statSync(p).isFile()}`); const d = fs.readdirSync(".", { withFileTypes: true }).find(x => x.name === p); console.log(`readdirSync dirent: isFile ${d.isFile()} isDirectory ${d.isDirectory()} isSymbolicLink ${d.isSymbolicLink()}`);'
readFileSync -> EISDIR - EISDIR: illegal operation on a directory, read
lstatSync.isSymbolicLink true | statSync.isDirectory true | existsSync true | lstatSync.isFile false | statSync.isFile false
readdirSync dirent: isFile false isDirectory false isSymbolicLink true
```

The control in probe B's repository (the real directory):

```
$ node -e 'const fs = require("fs"); const p = "node_modules"; try { fs.readFileSync(p); } catch (e) { console.log(`readFileSync -> ${e.code} - ${e.message}`); } const l = fs.lstatSync(p); console.log(`lstatSync.isDirectory ${l.isDirectory()} isSymbolicLink ${l.isSymbolicLink()}`);'
readFileSync -> EISDIR - EISDIR: illegal operation on a directory, read
lstatSync.isDirectory true isSymbolicLink false
```

The throw is the same for a real directory; what differs is that git never lists the real one (Finding 1). `existsSync` is true for the symlink, so an `existsSync`-only filter keeps it, while `lstatSync(..).isFile()`, `statSync(..).isFile()` and the `withFileTypes` dirent all refuse it.

## Finding 3 — the `[wb-021.3 export census]` lists without a pathspec, filters by `existsSync` only and reads every kept path — **CONFIRMED** (static read at the pin) — so a symlinked `node_modules` throws inside it — **PLAUSIBLE** (not executed at the pin; observed once at an earlier revision, seat ws-02's 2026-10-27 record in Finding 5)

`test/workbench-[wb-021.3 export census].test.ts` at `a14c87f82e` (1,453 lines):

```
787: const listedAll = lazy((): string[] => sorted(git(["ls-files", "-z", "--cached", "--others", "--exclude-standard"]).toString("utf8").split("\0").filter(Boolean)));
798:   const inScope = (path: string): boolean => !path.startsWith(SRC) && !outside(path);
799:   const listed = listedAll().filter(path => inScope(path) && existsSync(join(REPO, path)));
801:   const paths = listed.filter(path => !LOCKFILES.includes(path));
810: function realEntries(paths: readonly string[]): Entry[] {
811:   return asJudged(paths.map(path => ({ path, bytes: readFileSync(join(REPO, path)) })));
856: const docsVerdict = lazyPerProbe((): ScopeVerdict =>
857:   judgeScope([
858:     ...realEntries(docsListing().paths),
```

with `:198` `const SRC = "src/";`, `:200` `const OUTSIDE: readonly string[] = ["test/", ".beads/"];` and `:416` running git as `execFileSync("git", ["-C", REPO, ...args], ...)`. The listing at `:787` has no pathspec; a root entry `node_modules` starts with none of `src/`, `test/`, `.beads/`, `existsSync` is true for the symlink (Finding 2), and it is not a lockfile, so it reaches `:811` — the docs verdict at `:856-858` spreads `realEntries(docsListing().paths)` into the judged set — and `readFileSync` throws `EISDIR`. The throw has one observed instance, at an earlier revision: in seat ws-02's 2026-10-27 collect record (quoted in Finding 5) the census `reads 24/28` with the EISDIR laid to `the probe's symlinked node_modules`; at this pin it was not executed, hence the split grade. The docs scope at `:797-805` is every listed file outside `src/`, `test/` and `.beads/` — `new-feedback/*.md` included, which is why this file's own spelling matters (metadata, "Path spelling").

The census's filesystem walk is guarded and the listing is not:

```
756: /** Every regular file under a directory of the worktree (no symbolic link followed), skipping .git and node_modules. */
762:       if (item.name === ".git" || item.name === "node_modules" || skip(path)) continue;
763:       const stat = lstatSync(join(REPO, path));
804:   return { paths, excluded, walkEqualsGit: isDeepStrictEqual(walk.filter(path => !ignored.has(path) && !LOCKFILES.includes(path)), paths) };
```

So with a symlinked `node_modules` the walk omits the entry by name and the git listing carries it: `walkEqualsGit` at `:804` would read false and `realEntries` would throw before any row is judged. Which comes first in a run is not established here (not executed).

## Finding 4 — 7 of the 9 git-listing readers among the 34 drop a root entry; the `[tsx activity-boundary census]` is the second exposed one, recording the failed read instead of throwing — **CONFIRMED** for the listing shapes (static read); **PLAUSIBLE** for the red it would produce

The set: `git grep -l new-feedback a14c87f82e -- 'test/*.ts'` lists 34 files (32 at `d8cb84b1`, the 2026-11-03 landing's trunk); 9 of the 34 contain an `ls-files ... --others --exclude-standard` call. Their guard against a root-level `node_modules` entry, read at the pin:

| # | census (bracketed; literal name = the grep output) | listing line | what drops a root `node_modules` entry | exposed? |
|---|---|---|---|---|
| 1 | `test/workbench-[wb-021.3 export census].test.ts` | `:787` no pathspec | nothing — `existsSync` only (`:799`), then `readFileSync` (`:811`) | yes, throws |
| 2 | `test/workbench-[tsx activity-boundary census].test.ts` | `:625` no pathspec | nothing — `atRoot(path)` admits it (`:620`, `:622`, `:626`); the read at `:633` is caught and `:636` records it `unreadable` | yes, records |
| 3 | `test/workbench-[rf tsx-cost-adequacy census].test.ts` | `:1296` no pathspec | `:1302` `if (!lstatSync(absolute).isFile()) {` → `refused` | no |
| 4 | `test/workbench-[wb-2wiv.2 public-port census].test.ts` | `:750` pathspecs | pathspecs, and `:751` `statSync(join(cwd, path)).isFile()` | no |
| 5 | `test/workbench-[rc assembler-expectation census].test.ts` | `:1053` roots + `:(glob)*` (root entries listed) | `:1054` `(isCode(path) || isDoc(path))` — extension tests at `:1002-1003` | no |
| 6 | `test/workbench-[rf assembly-handoff census].test.ts` | `:437` pathspecs; `:443` `repoListed()` = no pathspec | `:906` `listed.filter(isSource)`, `:962` `listed.filter(isPage)` — extension filters | no |
| 7 | `test/workbench-[rf historical-claim census].test.ts` | `:248` pathspecs; `:254` `gitListed()` = no pathspec | `:218` `DOC_PAGE.test(source.path)` on the whole listing; `:177` `WHOLE_ROOTS = ["docs/", "new-feedback/"]` for the rest | no |
| 8 | `test/workbench-[gp seam-served census].test.ts` | `:1145` `...CONSTANTS.roots, ":(glob)*.md"` (`roots: ["docs"]`, `:395`) | the pathspec | no |
| 9 | `test/workbench-[tsx cost-comparison-label census].test.ts` | `:327` `...CONSTANTS.roots, ":(glob)*.md"` (`:179` roots) | the pathspec | no |

Row 2, verbatim at the pin:

```
620: const atRoot = (path: string): boolean => !path.includes("/");
622: const isRead = (path: string): boolean => atRoot(path) || underAny(path, CONSTANTS.readRoots);
625:   const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 });
626:   return [...new Set(out.split("\0").filter(path => path !== "" && isRead(path) && existsSync(join(base, path))))].sort(byName);
633:       texts.push([path, readFileSync(join(base, path), "utf8")]);
635:       // A file gone between its listing and its read is skipped; one still there that cannot be read is a finding.
636:       if (existsSync(join(base, path))) unreadable.push(path);
```

Its header: `:104` `A listed path that cannot be read as a file is recorded unreadable; one gone before its read is dropped.`; `:202` `the live read set (floors per root) reads ABSENT with no finding, no unreadable file`; `:207` `and records a listed directory unreadable`. The live row carries `:1224` `unreadable: [...real.unreadable],`. So in a symlinked worktree this census lists `node_modules` (root entry, `existsSync` true), fails the read, and records it — by its own `:104` rule, deliberately. That the live assertion then reds is PLAUSIBLE only because no census was executed — the expected literal is located: `test/fixtures/tsx-activity-boundary-roster.json:348` `"unreadable": [],` (pin A1's witness), and `:1772` `expect(witness).toEqual(held?.witness);` holds the live row to it, so a symlinked worktree's `unreadable: ["node_modules"]` reds it by derivation from source. Rows 3 and 4 are the two in-repo precedents for the cure: `:1294` `/** Every in-scope file git lists below a root, read as UTF-8; a symlink or a file holding a NUL is refused. */` and, outside the 34, `test/helpers/[gp-mw coordination census helper].ts:456-461` `/** What git would commit under a scope: tracked or untracked, never ignored, a regular file on disk (the walk's exact-set anchor). */` ... `return lstatSync(join(root, path)).isFile();`.

Scope of the count: 9 of 34 is the set that names `new-feedback`. The whole test tree at the pin has 61 `exclude-standard` lines in 53 files (`git grep -E 'exclude-standard' a14c87f82e -- 'test/'`); the 44 files outside the 34 were not audited.

## Finding 5 — the class is on the machine's record twice before the window; the in-window owner hit and its `cp -al` cure left no ledger row, and the 1102/1102 readback is what survives — **CONFIRMED** as recorded (the two records, the readback); **UNDETERMINED** for the in-window hit and the cure's application

Producer-side records, quoted from `machines/flywheel/state/collect-done/` (JSON, flattened to one line; the bracket marks my substitution of the abbreviation-bearing word):

- `wb-n8ye.20261027T175557Z.json` (seat `ws-02`, run `g10-work-s117`): `wb-021.3's [export] census reads 24/28 on its merged tree AND identically on its own tree and on its merge with trunk without this cut (EISDIR: the probe's symlinked node_modules is listed by git as untracked under the 'node_modules/' ignore rule) - a probe-environment artifact, not a contact of this cut.`
- `wb-6njq.20261029T153457Z.json` (seat `ws-05`, run `g10-work-s138`): `The clone's local exclude names the node_modules symlink, which git ls-files --others otherwise lists as a file. Two earlier attempts, in non-git copies and in a clone without that exclude, failed on the harness (not a git repository; EISDIR reading the symlink) and are not readings.`

The 10-29 record is also a third cure shape, used by a work seat: a local exclude that `names the node_modules symlink` (the record quotes neither the exclude file's path nor the pattern; by Finding 1 the pattern must match the symlink, so a spelling without the trailing slash, probe C, or an equivalent).

The in-window hit: the orchestrator's evidence packet names it (the owner's pre-push run of the 2026-11-03 landing read EISDIR, cured with a same-filesystem worktree and `cp -al`), and the packet names the artifact — the owner's volatile `/tmp` log, gone. Instrument, armed against the whole ledger:

```
EISDIR rows whole ledger: 1 -> [(3108, '2026-10-16T17:47:33Z', 'red')]
EISDIR rows in-window: 0
'cp -al' rows whole ledger: 0 -> []
```

(a python pass over the 54,994 lines, `utc` in `[2026-11-03T07:55:00Z, 2026-11-04T07:55:00Z)` for the window = 3,954 rows). The one EISDIR row in the ledger is 2026-10-16 and another error. So the hit is UNDETERMINED here: its mechanism is Finding 1 + Finding 3 and the cure's mechanism is probe B, but that it happened on that run rests on the packet's report, not on a row. What the ledger and the repo do carry:

- M:51377 (`kind` `ruling-bound`, `utc` 2026-11-03T10:30:11Z, `label` R-B423): `The owner pre-announced the push over the watch with the pre-push protocol receipts (merge-tree clean vs d8cb84b1; 32 censuses 1102/1102 on the merged tree).`
- `git log -1 4f49666be69a`: parents `d8cb84b14d1dee9896ce952acca117546001d3d4` `e894f2308f72b5f7929862b35397a822dd873ca6`, committer date 2026-11-03T10:14:01Z, subject ending `merge-tree clean vs trunk d8cb84b1; lint + 32 new-feedback reader censuses run pre-push.`; `git diff --stat 4f49666be69a^1 4f49666be69a` = `1 file changed, 162 insertions(+)` under `new-feedback/`.
- `git grep -l new-feedback d8cb84b1 -- 'test/*.ts' | wc -l` = 32, the "32 censuses" of both receipts; 34 at `a14c87f82e`.

Reading: 1102 of 1102 tests green over the 32 readers on the merged tree is the state after the cure, so the cure (whatever its shape) worked for that landing; it says nothing about which census read EISDIR first.

## Finding 6 — the machine's own worktrees carry real `node_modules` directories, so the class never reached a machine landing in this window: 18 rows say so — **CONFIRMED** as recorded

In-window rows matching `non-symlink|no symlink|real node_modules|real \(non-symlink\)`: 18 of 3,954 — 16 `worktree-removed`, 2 `gate-refused` (M:51538 wb-g20x, M:53950 wb-ldqu). Two verbatim:

- M:51056 (`worktree-removed`, `utc` 2026-11-03T08:31:28Z, bead `wb-nnm7`, seat `gate-prep-16`, run `g10-gate-s195`): `... both worktrees detached at d2eecba2 with porcelain 0 and real (non-symlink) node_modules directories; then rm -rf /var/tmp/fwg.xFSjG9 (record.tmpdir, literal path, shape-guarded) rc 0 ...`
- M:51538 (`gate-refused`, `utc` 2026-11-03T11:25:26Z, bead `wb-g20x`, seat `gate-prep-23`, run `g10-gate-s195`): `The five record worktrees were clean (porcelain 0; HEAD tip 45c823c9, probe f923f6f5 three times, probe2 5f8676a0), unlocked, each with a real node_modules directory (no symlink), and a /proc scan of 1315 processes found no cwd or open fd under them or the tmpdir.`

So the exposure is not the gate's: it is every harness that shares an install through a symlink — which is exactly the shape a `node_modules` snapshot or shared cache (the 2026-10-20 file's fix 2) tends toward, and the shape both 10-27/10-29 probes and the owner's pre-push worktree used.

## Evidence

- Reader table at the pin, `grep -q` per file over the 34 that name `new-feedback`: `readdirSync` in 31 of 34, `isSymbolicLink` in 17 of 34, `lstatSync` in 8 of 34, `node_modules` named in 22 of 34. The 31 readdir-based walkers were not audited line by line for pushing a symlink dirent as a file; Finding 4 covers only the 9 git-listing sites.
- `git grep -E 'exclude-standard' a14c87f82e -- 'test/'`: 61 lines in 53 files (whole test tree).
- Ledger kinds in the window (3,954 rows): `gate-stage` 364, `ritual-check` 246, `daemon-liveness` 246, `host-sample` 235, `mp-outcome` 206, `landing-post-result` 159, `green` 151, `gate-slot-acquired` 131, `gate-slot-released` 131, `red` 130, `claim` 129, `prep-done` 121; `gate-refused` 56. 0 of the 56 names EISDIR; none names a symlinked `node_modules` as its cause — the 2 of the 56 that contain the word symlink both deny one rather than report one: M:51538 (wb-g20x) `each with a real node_modules directory (no symlink)`, M:53951 (wb-pyel.1) `a filesystem walk of src that records and never follows a symlink`.
- Probe transcripts are in Findings 1 and 2 verbatim; the scratch repositories were removed after the run.

## Suggested fixes, cheapest first

1. **Filter the export census listing to regular files** — in `test/workbench-[wb-021.3 export census].test.ts`, make `:799` (and `:791`, `:870`) keep a path only when `lstatSync(join(REPO, path)).isFile()`, the form of `[rf tsx-cost-adequacy census]:1302` and `test/helpers/[gp-mw coordination census helper].ts:461`; count a refused path in the row rather than throwing. One line per filter; it also keeps `walkEqualsGit` at `:804` true, because the walk already skips `node_modules` by name at `:762`. It does not change what the census judges in any real-directory worktree (the listing never carried the entry there, Finding 1 probe B).
2. **Spell the ignore rule for the symlink too** — `.gitignore:2` as `node_modules` (no trailing slash) ignores the symlink and the directory alike (probe C, `check-ignore` rc 0 at `.gitignore:2:node_modules`). Product-side and repo-wide (every one of the 61 listing lines in 53 test files benefits), but it changes `git status` for every clone, so it is the owner's call; the 10-29 record shows a seat already doing this per clone through the local exclude.
3. **Decide the activity-boundary rule for ignored names** — `test/workbench-[tsx activity-boundary census].test.ts:104` and `:207` record a listed directory `unreadable` on purpose, so a symlinked `node_modules` reds it by design; either carve out entries the ignore rules name (a `check-ignore` pass like the one the export census runs at `:772-777`) or state in its header that a symlinked `node_modules` is a refused worktree shape.
4. **One listing helper for the 9** — the 9 sites hand-roll 9 listings with 4 guard shapes; a `test/helpers` function (git list + `lstatSync().isFile()` + pathspec) would hold the guard once, as the gp-mw helper already does for its family.
5. **Harness side, recorded not recommended as the fix** — provision worktrees with a real `node_modules` (`cp -al` from a same-filesystem install, as the owner did, or the machine's real directories, Finding 6). It cures the symptom per harness and leaves the two readers as they are.

## Positives worth protecting

- **7 of the 9 git-listing readers already drop a root entry** (Finding 4, rows 3-9): two by an `isFile()` stat (rows 3-4), three by extension filters (rows 5-7: the `[rc assembler-expectation census]`'s `isCode`/`isDoc` at `:1002-1003`, the `[rf assembly-handoff census]`'s `isPage`/`isSource` at `:456-457`, the `[rf historical-claim census]`'s `DOC_PAGE` at `:180`, applied at `:218`), two by pathspec alone (rows 8-9). A refactor that unifies the listings must keep a non-file filter, not just the pathspecs — rows 5-7 list root entries on purpose and rely on the extension tests.
- **The export census's walk refuses symlinks and skips `node_modules` by name** (`:756`, `:762`, `:763`) and holds the walk equal to the listing (`:804` `walkEqualsGit`), so a listing/walk disagreement is visible in the row rather than silent; this is what would make fix 1 verifiable.
- **The activity-boundary census tests the planted-directory case** (`:207` `records a listed directory unreadable`) and separates a vanished file from an unreadable one (`:635-636`); the record is deliberate, which is why fix 3 is a decision and not a bug.
- **The machine records the worktree shape at removal** (`real (non-symlink) node_modules directories`, 18 in-window rows); it is the only reason this class is auditable from the ledger at all, and an unfiltered sweep over 54,994 rows found it in seconds.
- **The 10-27 collect record named the mechanism exactly** — `listed by git as untracked under the 'node_modules/' ignore rule` — a seat diagnosed git's trailing-slash semantics mid-run and classified the red as a probe-environment artifact rather than a contact of its cut; that is the diagnostic honesty worth keeping.

## What I did not establish

- **No census was executed.** Every `path:line` claim is a static read at `a14c87f82e`; the throw in Finding 3 and the record in Finding 4 are inferred from the lines quoted plus the probes of Findings 1-2, not observed in a census run at this pin (the throw's one observed instance is at an earlier revision: the ws-02 2026-10-27 record, Finding 5). Artifact that would settle both: one run of the 34 readers in a detached worktree of the pin whose `node_modules` is a symlink to an install (the owner's own instrument, not run here), and the same run after fix 1.
- **The in-window owner hit** and the `cp -al` cure's application: no ledger row, no surviving log (the volatile `/tmp` log the packet names is gone); only the readback M:51377 and merge `4f49666be69a` are cited. Which of the 32 readers read EISDIR first on that run is unknown; by Finding 4 it was one of two.
- **The activity-boundary red in a run**: the expected literal and its assertion are located (`test/fixtures/tsx-activity-boundary-roster.json:348` `"unreadable": [],`, held by `:1772`; Finding 4), so the red is derivable from source; it stays PLAUSIBLE only because no census was executed.
- **The 44 test files outside the 34** that also run `exclude-standard` listings (61 lines in 53 files) were not audited; the 31 readdir-based walkers among the 34 were tabulated, not read.
- **A symlink to a FILE** named at the root: `statSync().isFile()` (row 4, `:751`) follows it and would read it; `lstatSync().isFile()` (row 3) refuses it. Out of this class; not probed.
- **Other platforms and git versions**: probes ran on one Linux host with git 2.50.1 and node v24.20.0 only.
- **This file against the censuses**: not run here. I emulated the three known doc-walking judges (the abbreviation run and slug test of the wb-021.3 census `:474-491`, the two-family unit coupling of the wb-4nut.1 census `:445-450`, the three-word mention and the three claim regexes of the wb-2wiv.2 census `:553-568`) over this file's final text with their regexes copied from the pin and read 0 hits; the owner's pre-push run of the 34 readers on the merged tree is the real check.

## Postscript — this file is input to the census it reports

The docs scope at `:797-805` is every listed file outside `src/`, `test/` and `.beads/`, so this file will be read by the export census the moment it lands; the 2026-11-02 sibling file was read red by three doc-walking censuses on the owner's pre-run and reworded in `a1173b1a` before landing. Hence the bracketed census names throughout; a reader who needs the literal paths has them in one command: `git grep -n -E 'exclude-standard' a14c87f82e -- 'test/'`.
