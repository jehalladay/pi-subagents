# isTypeNode-guarded readers skip value-position instantiation expressions under TS 6.0.3: 11 wb-021.2 plants quiet, 8 of 9 landed guard sites lack the scratch-census carve-out

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77)
**Date:** 2026-10-31 (filing window 2026-10-29T07:35Z..2026-10-31T07:55Z; the gate row this rests on, M:40402, is stamped 2026-10-31T07:16:43Z)
**`pi-subagents` revision:** trunk `origin/workbench/implementation-program` = `89109cd37724d20335040444548d942b60f77bda` at 07:55Z (`git fetch -q origin` rc 0, then `git rev-parse`; committer date 2026-10-31T05:55:38Z). Every trunk `path:line` below was read with `git show 89109cd377:<path>` and carries its blob id in the Evidence table. The refused cut is commit `2f0531861d6d079a73cbf44826afc97ccb3d1ba9` (branch `origin/machine/flywheel/wb-021.2`, committed 2026-10-30T20:29:22Z; its base `3c9db90d55f355623bd326534d869a6f56be9ba4` is an ancestor of the pin by `git merge-base --is-ancestor`, rc 0; `git diff --name-status` base..cut = 3 added test files, no src change); its helper `test/helpers/apo-snapshot-census.ts` is blob `04e6fff1b47853508cc091ae7bafcd8d79dac253` and does not exist at trunk (`git cat-file -e 89109cd377:test/helpers/apo-snapshot-census.ts` rc 128). The package is `@tintinweb/pi-subagents` 0.20.0 (`package.json:2-3`) with no `bin` field, so the installed binary that matters here is the host `pi` below, whose loader runs this package's TypeScript.
**`typescript` revision:** 6.0.3 (`package.json:42` at the pin: `"typescript": "6.0.3"`; the rig clone's `node_modules/typescript/package.json:5` reads `"version": "6.0.3"`; `ts.version` printed by both probes below)
**`pi` revision:** 1.2.0 (`pi --version` prints `1.2.0`; the install at `/local/home/jehallad/.pi/agent/install/releases/1.2.0/` ships `node_modules/jiti/package.json:3` `"version": "2.7.0"`). The rig clone has no `node_modules/jiti`, so jiti was exercised from the pi install.
**`node` revision:** v24.20.0
**Machine-side producer pins (not this repo):** ledger `machines/flywheel/ledger/metrics.jsonl`, 40,514 lines at the read (M:n = line n): M:40402 kind `gate-refused`, seat `gate-prep-20`, run `g10-gate-s157`, refusal #4 on cut #4 (`cutFinal` true), `gateStatus` "not-run (synthesized record, g10.17 K2 refusal fast path; no GATE agent, runner, slot or forge ran)", `loadAtPrep` 434.01; M:40405 `gate-dequeued` 07:18:16Z; M:40406 `ruling-bound` R-B166 07:18:20Z (child wb-021.8); M:40411 `gate-stage` bind 923 s. `machines/flywheel/BOUNDARY.md` 11,406 lines at the read (append-only; 11,434 lines at this file's 2026-10-31 fix-pass re-check, with :11390 still the R-B166 line and :10995 still the R-B134 line). Evidence archive `~/s3/artifacts/flywheel/gate-prep-20/2026-10-31-wb-021.2-g10-gate-s157-prep/`: `leg2/leg2-ie.json` (2,961 bytes, 23 keys) and `leg2/landable/G4-IE10-landable.live.json`, `G4-IE11-landable-fetch.live.json`, `G4-IE12-landable-meta.live.json` (75 bytes each).
**Method:** read-only throughout. (1) `git show` of every quoted line at the pin and at the cut, both from this clone's object store. (2) Two node probes against the rig clone's installed typescript 6.0.3: `probe.cjs` prints SyntaxKind, `ts.isTypeNode` and parent kind per node over a 6-line fixture; `probe2.cjs` runs verbatim JavaScript copies of `test/helpers/census.ts:3273-3279`, `test/workbench-rf-federation-effect-authority-census.test.ts:799-806` and `test/workbench-rf-typed-status-echo-census.test.ts:2171-2178`, plus the cut's `:485-489` visitor and the landed `test/workbench-scratch-census.test.ts:226-236` visitor as reachability tests, over a 5-line fixture. (3) One jiti probe: `createJiti` from the pi 1.2.0 install's jiti 2.7.0, `transform({ ts: true })` then a load of a 4-line `plant.ts`; `tsc --noEmit --strict --target es2022 --module esnext --moduleResolution bundler` with the rig's typescript on the same file. (4) Ledger rows read by line with `python3 -I` (M:40402, M:40405, M:40406, M:40410, M:40411), `grep -n` over BOUNDARY.md, and the two archive files read on the `~/s3` mount. All scripts are quoted in full under Evidence (probe2.cjs with its comment-only lines trimmed; the code is identical and every quoted output reproduces byte-for-byte on re-run). No bd command ran, nothing under `machines/` was written, and no gate ran for this file (docs-only; the gate waiver is disclosed in the commit body per `new-feedback/README.md`).
**Scope:** feedback about pi-subagents' census readers - the TypeScript-AST "type position" predicates in `test/helpers/*.ts` and `test/*.test.ts` at trunk, and the same predicate in the refused cut's `test/helpers/apo-snapshot-census.ts` - which is the code that would change. Not about the wb-021.2 bead's standing (the machine ruled it, R-B166) and not about the flywheel gate, which found the hole; the gate's rows and artifacts are quoted as the producer-side record and re-derived here only where this seat could run the instrument itself.
**Prior art:** none on this mechanism. At the fetched ref, `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` lists 18 entries (17 files + README.md); the filename grep `instantiation|jiti|isTypeNode|type-?arg|expressionwith|free-?name|reader|hidden|plant|wb-021|apo-snapshot|guard` hits 2 of 17, both on a generic word (`reader` in `2026-10-21-vitest-4-1-10-json-report-failuremessages-...-a-marker-reader-must-pair-...md`, `guard` in `2026-10-25-positive-the-detached-timing-guard-...md`); the body grep `git grep -li -E 'jiti|instantiation|ExpressionWithTypeArguments|isTypeNode|freeNamesOf|wb-021' origin/workbench/implementation-program -- new-feedback/` hits 0 files. Over the union of the 13 `origin/machine/flywheel/feedback-*` branches (2026-10-15..2026-10-30; 33 unique `new-feedback/` paths = 32 files + README.md, 15 of them not at trunk 89109cd377 - the other 18 are the trunk listing carried on the branches, `comm -12` against the trunk ls-tree = 18, sample blob identical - and 5 of the 13 branch tips are ancestors of the pin) the filename grep hits 5 over the full 33-path union, the 2 trunk hits above plus 3 unlanded (again generic words: `reader` x3, `guard` x1, `plant` x1), and the body grep hits 1, `2026-10-29-CORROBORATION-70-of-86-gate-refusals-in-24-h-...md`, on `wb-021` only (its rows name wb-021.5 and wb-021.7, other beads and the R515/R668 class). This working tree sits 1,895 commits behind the ref (`git rev-list --count HEAD..origin/workbench/implementation-program`), so the ref listing, not `ls`, is the index. Nearest sibling by theme, cited not restated: `2026-10-30-positive-16-of-30-census-files-carry-both-control-cases-and-falsifier-rows-...md` (the control/falsifier discipline that fix 2 below leans on).

## Summary, with numbers

TypeScript's `ts.isTypeNode` answers true for an `ExpressionWithTypeArguments`, and since TS 4.7 that same node kind is what an instantiation expression in a value position parses to (`const g = f<string>;`, or `(f<number>)(1)`); at the pinned 6.0.3 the installed `typescript.js:21501` lists `234 /* ExpressionWithTypeArguments */` in `isTypeNodeKind`, and my probe prints `isTypeNode=true` for both value-position forms (Finding 1). A reader that returns on `isTypeNode` therefore never reads the operand, and jiti strips the type arguments and runs it: under the pi 1.2.0 install's jiti 2.7.0 my plant's operand executed (`globalThis.__ewta_ran = "the operand ran"`) with `tsc --noEmit --strict` rc 0 (Finding 3). The flywheel gate found this on the wb-021.2 cut #4 (M:40402, refusal #4 on the FINAL cut): the cut's `freeNamesOf` returns at `test/helpers/apo-snapshot-census.ts:489` on `ts.isTypeNode(node)` with a `:485` carve-out for class `extends` only, so of the gate's 12 instantiation-expression plants, 11 are admitted with `findings []` against `src/apo/view.ts` while 6 of 6 paired controls red (IE1c-IE5c without the type arguments, 2+1+1+1+1 findings, plus IE5d, a call with type arguments, 1 finding; `leg2/leg2-ie.json`); 3 of the 11 (a real `process.kill`, a `fetch`, an `Object.assign` into `import.meta.env`) pass `tsc -p tsconfig.json` and `biome check` and read quiet on the live src tree (`fileCount` 119, `findings []` in all three `.live.json`); my reachability copy of the cut's visitor reaches the operand in 0 of 2 value-position cases (Finding 2). The same guard shape is landed at trunk: 9 `ts.isTypeNode` sites in 6 of the 159 test files that import typescript at 89109cd377 (0 in `src/`); 1 of 9 (`test/workbench-scratch-census.test.ts:236`) is preceded by an operand carve-out at `:231-235`, 1 of 9 (`test/workbench-beads-program-readiness.test.ts:581`) by a class-extends-only carve-out (`:510-511`, the cut's shape), and 7 of 9 by none; verbatim copies of the three ancestor-walk predicates (`census.ts:3273`, `rf-federation:799`, `rf-typed-status-echo:2171`) read the operand of both value-position forms as a type position while reading the call control as a value (Finding 4, CONFIRMED for the predicates, PLAUSIBLE for what each census would admit). Realized cost on the machine side, quoted not re-measured: the cut's own census was green 178/178 on the probe with 175 pins while the hole stood (M:40402 F6, F9), PREP spent 1,849 s of checklist (F alone 1,385 s) at load 434 and BIND 923 s, and R-B166 parked the bead behind child wb-021.8, which now owns the cure. The cheapest fix is three lines the repo already carries at `scratch-census:231-235`.

## Finding 1 - `ts.isTypeNode` is true for an `ExpressionWithTypeArguments` in a value position under TypeScript 6.0.3 - **CONFIRMED**

```
$ cd /tmp/fb-c1-probe-1924300 && node probe.cjs
typescript version: 6.0.3
line 1 Identifier text="f" isTypeNode=false parent=FunctionDeclaration
line 2 ExpressionWithTypeArguments text="f<string>" isTypeNode=true parent=VariableDeclaration
line 2 Identifier text="f" isTypeNode=false parent=ExpressionWithTypeArguments
line 3 CallExpression text="(f<number>)(1)" isTypeNode=false parent=ExpressionStatement
line 3 ExpressionWithTypeArguments text="f<number>" isTypeNode=true parent=ParenthesizedExpression
line 3 Identifier text="f" isTypeNode=false parent=ExpressionWithTypeArguments
line 4 CallExpression text="f<boolean>(true)" isTypeNode=false parent=ExpressionStatement
line 4 Identifier text="f" isTypeNode=false parent=CallExpression
line 5 ExpressionWithTypeArguments text="Array<string>" isTypeNode=true parent=HeritageClause
line 6 ExpressionWithTypeArguments text="Map<string, number>" isTypeNode=true parent=HeritageClause
```

Line 4 is the control: a call with type arguments keeps them on the `CallExpression` itself and creates no `ExpressionWithTypeArguments` node, so `isTypeNode` is false there - which is why the gate's IE5d control (`structuredClone<number>(...)` as a call) reds while the IE plants do not.

The source of the answer, in the installed compiler the repo pins (`node_modules/typescript/lib/typescript.js` at version 6.0.3):

```
typescript.js:15656  function isTypeNode(node) {
typescript.js:15657    return isTypeNodeKind(node.kind);
typescript.js:15658  }
typescript.js:21501  function isTypeNodeKind(kind) {
typescript.js:21502    return kind >= 183 /* FirstTypeNode */ && kind <= 206 /* LastTypeNode */ || kind === 133 /* AnyKeyword */ || kind === 159 /* UnknownKeyword */ || kind === 150 /* NumberKeyword */ || kind === 163 /* BigIntKeyword */ || kind === 151 /* ObjectKeyword */ || kind === 136 /* BooleanKeyword */ || kind === 154 /* StringKeyword */ || kind === 155 /* SymbolKeyword */ || kind === 116 /* VoidKeyword */ || kind === 157 /* UndefinedKeyword */ || kind === 146 /* NeverKeyword */ || kind === 141 /* IntrinsicKeyword */ || kind === 234 /* ExpressionWithTypeArguments */ || kind === 313 /* JSDocAllType */ || kind === 314 /* JSDocUnknownType */ || kind === 315 /* JSDocNullableType */ || kind === 316 /* JSDocNonNullableType */ || kind === 317 /* JSDocOptionalType */ || kind === 318 /* JSDocFunctionType */ || kind === 319 /* JSDocVariadicType */;
typescript.js:21503  }
```

So the predicate does not distinguish `Array<string>` under a `HeritageClause` (a type-ish position TypeScript itself evaluates for a class) from `f<string>` under a `VariableDeclaration` or a `ParenthesizedExpression` (a run-time value). Measured at 6.0.3 only; other compiler versions were not run.

## Finding 2 - the refused cut's `freeNamesOf` never reaches a name inside a value-position instantiation expression, and the gate's 12-plant battery shows 11 admitted against 6 of 6 red controls - **CONFIRMED**

The bytes, `test/helpers/apo-snapshot-census.ts` at `2f0531861d` (blob `04e6fff1`):

```
476  /** The free names of one module of a checked program (see the module header: GLOBAL), each with its line; import.meta is read as the free name import.meta (the meta rule). */
477  function freeNamesOf(sf: ts.SourceFile, checker: ts.TypeChecker): { readonly line: number; readonly name: string }[] {
...
484    const visit = (node: ts.Node): void => {
485      if (ts.isExpressionWithTypeArguments(node) && ts.isHeritageClause(node.parent) && node.parent.token === ts.SyntaxKind.ExtendsKeyword && (ts.isClassDeclaration(node.parent.parent) || ts.isClassExpression(node.parent.parent))) {
486        visit(node.expression);
487        return;
488      }
489      if (ts.isTypeNode(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || isErased(node)) return;
490      if (ts.isMetaProperty(node) && node.keywordToken === ts.SyntaxKind.ImportKeyword) {
```

`:485` reads through an `ExpressionWithTypeArguments` only when its parent is a class `extends` heritage clause; every other `ExpressionWithTypeArguments` - the value-position instantiation expression included - hits `:489` and returns before its `expression` child is visited. The helper's own header states the claim this contradicts (`:62-63`): "GLOBAL: a closure identifier - a reference or a declaration's own name - that names no RUN-TIME binding of its own module, outside ADMITTED_FREE."

My reachability copy of `:485-489` (probe2.cjs, column "cut :485-489 reaches"), beside the landed scratch-census visitor:

```
$ cd /tmp/fb-c1-probe-1924300 && node probe2.cjs
typescript version: 6.0.3
identifier f | line | parent kind | inTypePosition(census.ts:3273) | isValueRead(rf-federation:799) | isUse(rf-typed-status-echo:2171) | cut :485-489 reaches | scratch-census :226-236 reaches
f | 2 | ExpressionWithTypeArguments | true | false | false | false | true
f | 3 | ExpressionWithTypeArguments | true | false | false | false | true
f | 4 | CallExpression | false | true | true | true | true
f | 5 | TypeQuery | true | false | false | false | false
```

Rows 2 and 3 are the value positions (`const g = f<string>;` and `(f<number>)(1);`): the cut's visitor reaches `f` in 0 of 2, the landed scratch-census visitor in 2 of 2. Row 4 is the control (a call with type arguments): both reach it. Row 5 is a true type position (`let h: typeof f<string>;`): neither reaches it, which is correct.

The gate's producer-side record, quoted verbatim from M:40402 (`unmetFull[0]`, the sentences that carry the counts):

> 11 gate plants are admitted with views [src/apo/view.ts] and findings []: G4-IE1 `(process.kill(this.selected), setTimeout)<[]>`, IE2 `(fetch(...) as unknown as typeof pick)<void>`, IE3 an import.meta.env write, IE4 globalThis, IE5 `structuredClone<number>`, IE6 Function, IE7 a closure module's process.kill, IE9 eval, and IE10/IE11/IE12. IE10 (process.kill), IE11 (fetch) and IE12 (Object.assign into import.meta.env) are src-landable: tsc -p tsconfig.json rc 0, biome check rc 0, no fixes, and the live 119-file src judgment reads views [src/apo/view.ts] findings []. Paired controls without the type arguments red (IE1c 2; IE2c, IE3c, IE4c, IE5c 1 each; IE5d, a call with type arguments, 1). IE8's require edge reds by PACKAGE only, with GLOBAL require unread.

Re-derived from the archive rather than the prose: `leg2/leg2-ie.json` holds 23 keys; 12 are `G4-IE<n>` plants, of which 11 carry `findings: []` and IE8 carries one `PACKAGE ... require node:child_process` finding (its GLOBAL `require` read is the one that stays unread); the 6 control keys all red - `G4-IE1c-control` with 2 findings (`GLOBAL src/apo/view.ts -> src/apo/view.ts:7 process via src/apo/view.ts`, `... :7 setTimeout ...`), `IE2c` fetch, `IE3c` import.meta, `IE4c` globalThis, `IE5c` structuredClone and `IE5d-call-type-args` structuredClone with 1 each. The three `landable/*.live.json` files each read `"fileCount": 119, "views": ["src/apo/view.ts"], "findings": []`.

What the record says the cut claimed and could not hold (M:40402, verbatim): "Claims it contradicts: the helper header's 'the names read: every identifier outside type positions', the meta rule's 'import.meta reds wherever a value position reads it', the FAIL-CLOSED CORE's 'every form a reading does not list as quiet reds', and the acceptance's 'zero capability invokes and zero journal/native writes'. No residual names it." And the cure the gate wrote for the inversion's child: "read an ExpressionWithTypeArguments outside a heritage clause through its expression, with a pinned falsifier, or state the hole as NOT CLAIMED with a pinned quiet row."

## Finding 3 - the operand of a value-position instantiation expression executes under the host's jiti 2.7.0, and the plant type-checks - **CONFIRMED**

My 4-line plant (`/tmp/fb-c1-probe-1924300/plant/plant.ts`, the shape of the gate's G4-IE1 comma plant with a harmless side effect):

```ts
// A value-position instantiation expression that hides a side effect in its operand (shape of the gate's G4-IE1 plant).
const id = <T,>(x: T): T => x;
export const taken = (((globalThis as Record<string, unknown>).__ewta_ran = "the operand ran"), id)<string>;
export const seen = (globalThis as Record<string, unknown>).__ewta_ran;
```

```
$ cd /tmp/fb-c1-probe-1924300 && node jiti-probe.cjs /local/home/jehallad/.pi/agent/install/releases/1.2.0/node_modules/jiti /tmp/fb-c1-probe-1924300/plant/plant.ts
--- jiti.transform output (TS -> JS) ---
"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.taken = exports.seen = void 0; // A value-position instantiation expression that hides a side effect in its operand (shape of the gate's G4-IE1 plant).
const id = (x) => x;
const taken = exports.taken = (globalThis.__ewta_ran = "the operand ran", id);
const seen = exports.seen = globalThis.__ewta_ran;
--- jiti load ---
mod.seen = "the operand ran" | globalThis.__ewta_ran = "the operand ran"
rc=0
$ cd /tmp/fb-c1-probe-1924300/plant && node .../rig/node_modules/typescript/bin/tsc --noEmit --strict --target es2022 --module esnext --moduleResolution bundler plant.ts; echo "tsc rc=$?"
tsc rc=0
```

The transform drops `<string>` and keeps the comma expression; the load runs it. This is the same statement the gate recorded for its plants ("Pi's jiti 2.7.0 strips the type arguments and runs the expression (twin readbacks: host process.pid 'number', host env key written, globalThis and Function reached)", M:40402), here reproduced with a plant of my own on the jiti the installed pi 1.2.0 ships. What this does not show: that pi's own extension loader calls jiti with the options I used (`createJiti(__filename, { interopDefault: true, moduleCache: false, fsCache: false })`); the stripping is TypeScript emit semantics, not an option.

## Finding 4 - 8 of the 9 landed `ts.isTypeNode` guard sites at trunk lack the instantiation-expression carve-out, and verbatim copies of three of their predicates read the operand as a type position - **CONFIRMED** for the predicates' answers, **PLAUSIBLE** for what each census admits

The census at 89109cd377 (`git grep -n -E 'ts\.isTypeNode\b' origin/workbench/implementation-program -- src test`; 9 sites, 6 files, 0 under `src/`; 159 files under `test/` import typescript):

| site | shape | carve-out before the guard | probe2 answer for `f` in `f<string>` (value) / in `f<boolean>(true)` (control) |
|---|---|---|---|
| `test/helpers/census.ts:3275` `if (ts.isTypeNode(current)) return true;` | `inTypePosition` ancestor walk (`:3273-3279`), consulted at 7 sites at the pin: `:3184`, `:3460`, `:3681`, `:3691`, `:4873`, `:6046`, `:6052` | none | `true` / `false` |
| `test/workbench-rf-federation-effect-authority-census.test.ts:804` `for (let at: ts.Node \| undefined = parent; at !== undefined; at = at.parent) if (ts.isTypeNode(at)) return false;` | `isValueRead` (`:799-806`) | none | `false` / `true` |
| `test/workbench-rf-typed-status-echo-census.test.ts:2177` `return ts.findAncestor(id, ts.isTypeNode) === undefined;` | `isUse` (`:2171-2178`) | none | `false` / `true` |
| `test/helpers/apo-rerender-census.ts:1168` `const typed = inType \|\| ts.isTypeNode(node);` | visitor; `:1188` recurses `ts.forEachChild(node, child => visit(child, typed))`; `:1147-1148` routes a `typed` member reference to the `type` set, not `value` | none | not run (visitor needs the checker and the model) |
| `test/helpers/apo-rerender-census.ts:1929` and `:1954` | second visitor, same `typed` flag, `:1973` recurses with it | none | not run |
| `test/workbench-beads-program-readiness.test.ts:581` `if ((ts.isTypeNode(node) && !extendsValue(node)) \|\| ts.isInterfaceDeclaration(node) \|\| ts.isTypeAliasDeclaration(node)) return;` | `extendsValue` `:510-511` = `ts.isExpressionWithTypeArguments(node) && ts.isHeritageClause(node.parent) && node.parent.token === ts.SyntaxKind.ExtendsKeyword && ts.isClassLike(node.parent.parent)` | class `extends` only - the cut's `:485` condition | same condition as the cut row above: `false` reach (by bytes, not run) |
| `test/workbench-scratch-census.test.ts:236` `if (ts.isTypeNode(node)) return;` | `:231-235` `if (ts.isExpressionWithTypeArguments(node)) { // An instantiation expression (f<T>) reads its operand; the type arguments are erased. visit(node.expression); return; }` | **operand carve-out present** | reaches `f`: `true` / `true` |
| `test/workbench-scratch-census.test.ts:389` `if (ts.isTypeNode(node)) return;` | second visitor of the same file (`:388-`), no `ExpressionWithTypeArguments` case before it | none | not run |

For the three ancestor-walk predicates the probe ran the repo's own lines (TypeScript types dropped, nothing else changed; the copies are in `probe2.cjs` under Evidence): `inTypePosition` says `true` (a type) for the operand of `f<string>` and of `(f<number>)`, `isValueRead` and `isUse` say `false` (not a value read) for both, and all three give the opposite answer for the call control `f<boolean>(true)` and the expected answer for the type query `typeof f<string>`. That part is CONFIRMED.

What each of these predicates gates - and so what a hidden operand would escape - differs per file, and none of it was exercised with a plant through the census itself, which is why the admission claim is PLAUSIBLE and not CONFIRMED: `census.ts:3184`/`:3460` skip a vitest-API reference in a type position when judging registration integrity; `rf-federation:804` decides whether an identifier is a value read for its closure walk over loaders, `process` members and network calls; `rf-typed-status-echo:2177` decides whether a context name is read; `apo-rerender-census` sends a member reference reached under `typed` to the type set, where the value-side rules (`:1931-1934` run only `!typed`) do not apply; `beads-program-readiness:581-584` collects free reads of allowed globals. The state not exercised is one planted fixture per census in the gate's IE1/IE1c pair shape.

## Finding 5 - the record's "live 119-file src tree" is `srcFiles()`'s tracked-plus-untracked count; tracked `src/` is 117 files at the pin, at the cut and at the probe tree - **PLAUSIBLE** for the 2-file gap, both numbers **CONFIRMED** as their instruments print them

```
$ git ls-tree -r --name-only origin/workbench/implementation-program -- src | wc -l   -> 117
$ git ls-tree -r --name-only 2f0531861d6d079a73cbf44826afc97ccb3d1ba9 -- src | wc -l  -> 117
$ git ls-tree -r --name-only 7904ba91f6a576e4658e7de5fb1166fbc754dea0 -- src | wc -l  -> 117   (M:40402 probeTree)
```

The cut's census counts differently, `test/workbench-apo-snapshot-census.test.ts:146-148` at `2f0531861d`:

```
146  function srcFiles(): string[] {
147    const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
148    return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(ROOT, path))))].sort();
```

`--others --exclude-standard` adds untracked, non-ignored files on disk, and the three `.live.json` artifacts print `"fileCount": 119`. The 2 extra are consistent with the gate's own on-disk plant files in the probe worktree (the plants target `src/apo/view.ts`); the worktree was removed at BIND (M:40410 `worktree-removed`), so its `git ls-files --others` listing is the artifact that would settle it, and it was not kept.

## Evidence

Per-path blob ids at `89109cd37724d20335040444548d942b60f77bda` (`git rev-parse 89109cd377:<path>`), so a reader can check the lines without the sha moving under them:

| path | blob |
|---|---|
| `package.json` | `c6bc334452048f10699df9c21c11efbf38eddc41` |
| `test/helpers/census.ts` | `51bc11af33774f11f9eb57840d62c3bd33221d75` |
| `test/workbench-rf-federation-effect-authority-census.test.ts` | `fcd4d1dd3170b338f8c076ccdf317e21a5c1f9bf` |
| `test/workbench-rf-typed-status-echo-census.test.ts` | `60b28869a0162c0dc82fd339e77646d8064904f6` |
| `test/helpers/apo-rerender-census.ts` | `cf0ab22169648e1cf587bc35d836a3b7535cb552` |
| `test/workbench-beads-program-readiness.test.ts` | `7aa38a4703ae75cbae20d8dd4ff7c562c5f70f45` |
| `test/workbench-scratch-census.test.ts` | `472d56e3e6d656554ddf039704f5c58193c85e8e` |
| `test/helpers/apo-snapshot-census.ts` at `2f0531861d` (cut only) | `04e6fff1b47853508cc091ae7bafcd8d79dac253` |

Ledger rows (read by line; the `reason` field of M:40402, first two sentences, verbatim):

> Substance RESPIN at PREP F, refusal #4 on the R-B134 FINAL cut #4 (2f0531861d6d079a73cbf44826afc97ccb3d1ba9, the FAIL-CLOSED CORE). First failure: U1 INSTANTIATION-EXPRESSION, a NEW reader-domain class (first failure): freeNamesOf (test/helpers/apo-snapshot-census.ts:489) returns on ts.isTypeNode, which TypeScript 6.0.3 answers true for an ExpressionWithTypeArguments (the :485 case covers only a class extends clause), so GLOBAL and the meta rule never read a name inside an instantiation expression; 11 gate plants are admitted with findings [] while their controls without type arguments red; three are src-landable (real process.kill, fetch and an import.meta.env write; tsc rc 0, biome rc 0) and read quiet on the live 119-file src tree; Pi's jiti 2.7.0 strips the type arguments and runs the hidden code against the host.

M:40402 `unmet` = `["U1-INSTANTIATION-EXPRESSION-VALUE-POSITIONS-UNREAD-11-PLANTS-ADMITTED-3-SRC-LANDABLE", "U2-LEG2-JUDGE-MUTANTS-GK1-GK2-GK3-SURVIVE-0of178"]`; `refusedAtStage` "PREP F"; `gateBase` `89109cd37724d20335040444548d942b60f77bda`; `probeSha` `cf7f6aacd00b850810365753d77ec4c831e2740f`, `probeTree` `7904ba91f6a576e4658e7de5fb1166fbc754dea0`. Its `prepSummary` carries the timing: "prep-done M:40369: installSeconds 21, checklistSeconds 1849 (D 327, E 48, F 1385, G 89), targetedSuiteSeconds 211, loadAtPrep 434.01" and "gate-stage prep M:40370: 2479 s". Its `findingBullets` F6 and F9 (verbatim fragments): "cut #3 has 143 pins and cut #4 has 175 (+32)"; "targeted sets green on the probe: census 178/178; the delivery's 62-file set 62/62 with 2727/2727 (the seat's 2726 plus one trunk-landed test); the gate-added 12 trunk-changed walker suites 441/441. No timing red this run."

M:40406 (`ruling-bound`, label R-B166, child wb-021.8, 2026-10-31T07:18:20Z; BOUNDARY.md:11390), the operative sentence: "The refused cut's unmet members fold into wb-021.8's note (the U1 instantiation-expression hole joins the child's reader-coverage scope); wb-021.2 is PARKED (blocked, not ready) until wb-021.8 lands and its eventual re-cut is a mechanical restatement over the child's landed reader. NEVER closed, NEVER respun; the loop ends here (no cut #5)."

The second unmet member, U2 (gate-authored judge mutants GK1/GK2/GK3 surviving at 0 failed of 178), is a different class (the row calls it "class U3 again") and is not examined in this file.

`probe.cjs` (run from `/tmp/fb-c1-probe-1924300/`; the `require` path is the rig clone's installed typescript):

```js
const ts = require("/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/rig/node_modules/typescript");
console.log("typescript version:", ts.version);
const src = [
  "declare function f<T>(x: T): T;",
  "const g = f<string>;",                 // value position: instantiation expression
  "(f<number>)(1);",                      // called instantiation expression (parenthesised)
  "f<boolean>(true);",                    // control: a call with type arguments (no EWTA node)
  "class A extends Array<string> {}",     // heritage clause (class extends)
  "interface I extends Map<string, number> {}", // heritage clause (interface extends)
].join("\n");
const sf = ts.createSourceFile("probe.ts", src, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
const rows = [];
const visit = (n) => {
  if (ts.isExpressionWithTypeArguments(n) || ts.isCallExpression(n) || (ts.isIdentifier(n) && n.text === "f")) {
    const line = sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;
    rows.push(`line ${line} ${ts.SyntaxKind[n.kind]} text=${JSON.stringify(n.getText(sf))} isTypeNode=${ts.isTypeNode(n)} parent=${ts.SyntaxKind[n.parent.kind]}`);
  }
  ts.forEachChild(n, visit);
};
visit(sf);
for (const r of rows) console.log(r);
```

`probe2.cjs` (same directory; the four function bodies are the repo's lines with TypeScript annotations removed):

```js
const ts = require("/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/rig/node_modules/typescript");
console.log("typescript version:", ts.version);
// test/helpers/census.ts:3273-3279 at 89109cd377
function inTypePosition(node) {
  for (let current = node.parent; current !== undefined && !ts.isSourceFile(current); current = current.parent) {
    if (ts.isTypeNode(current)) return true;
    if (ts.isExpression(current) || ts.isStatement(current)) return false;
  }
  return false;
}
// test/workbench-rf-federation-effect-authority-census.test.ts:799-806 at 89109cd377
function isValueRead(node) {
  const parent = node.parent;
  if (ts.isShorthandPropertyAssignment(parent)) return true;
  if (["name", "propertyName", "label"].some(key => Reflect.get(parent, key) === node)) return false;
  if (ts.isQualifiedName(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent)) return false;
  for (let at = parent; at !== undefined; at = at.parent) if (ts.isTypeNode(at)) return false;
  return true;
}
// test/workbench-rf-typed-status-echo-census.test.ts:2171-2178 at 89109cd377
const isUse = (id) => {
  const parent = id.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.name === id) return false;
  if ((ts.isPropertyAssignment(parent) || ts.isPropertySignature(parent) || ts.isPropertyDeclaration(parent) || ts.isMethodDeclaration(parent)) && parent.name === id) return false;
  if (ts.isBindingElement(parent) && (parent.name === id || parent.propertyName === id)) return false;
  if ((ts.isVariableDeclaration(parent) || ts.isParameter(parent) || ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent)) && parent.name === id) return false;
  return ts.findAncestor(id, ts.isTypeNode) === undefined;
};
// The cut's guard, test/helpers/apo-snapshot-census.ts:485-489 at 2f0531861d, as a reachability test: does visit() reach the identifier?
function cutReaches(sf, target) {
  let reached = false;
  const visit = (node) => {
    if (node === target) { reached = true; return; }
    if (ts.isExpressionWithTypeArguments(node) && ts.isHeritageClause(node.parent) && node.parent.token === ts.SyntaxKind.ExtendsKeyword && (ts.isClassDeclaration(node.parent.parent) || ts.isClassExpression(node.parent.parent))) { visit(node.expression); return; }
    if (ts.isTypeNode(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) return;
    ts.forEachChild(node, visit);
  };
  visit(sf); return reached;
}
// The landed model, test/workbench-scratch-census.test.ts:226-236 at 89109cd377, as the same reachability test.
function scratchReaches(sf, target) {
  let reached = false;
  const visit = (node) => {
    if (node === target) { reached = true; return; }
    if (ts.isHeritageClause(node)) { if (node.token === ts.SyntaxKind.ExtendsKeyword) for (const type of node.types) visit(type.expression); return; }
    if (ts.isExpressionWithTypeArguments(node)) { visit(node.expression); return; }
    if (ts.isTypeNode(node)) return;
    ts.forEachChild(node, visit);
  };
  visit(sf); return reached;
}
const src = [
  "declare function f<T>(x: T): T;",
  "const g = f<string>;",        // line 2: value-position instantiation expression
  "(f<number>)(1);",             // line 3: called instantiation expression
  "f<boolean>(true);",           // line 4: control, a call with type arguments
  "let h: typeof f<string>;",    // line 5: control, a type position (typeof query with type arguments)
].join("\n");
const sf = ts.createSourceFile("probe2.ts", src, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
const ids = [];
const walk = (n) => { if (ts.isIdentifier(n) && n.text === "f" && !ts.isFunctionDeclaration(n.parent)) ids.push(n); ts.forEachChild(n, walk); };
walk(sf);
console.log("identifier f | line | parent kind | inTypePosition(census.ts:3273) | isValueRead(rf-federation:799) | isUse(rf-typed-status-echo:2171) | cut :485-489 reaches | scratch-census :226-236 reaches");
for (const id of ids) {
  const line = sf.getLineAndCharacterOfPosition(id.getStart(sf)).line + 1;
  console.log(`f | ${line} | ${ts.SyntaxKind[id.parent.kind]} | ${inTypePosition(id)} | ${isValueRead(id)} | ${isUse(id)} | ${cutReaches(sf, id)} | ${scratchReaches(sf, id)}`);
}
```

`jiti-probe.cjs` (argv[2] = the pi install's jiti directory, argv[3] = `plant.ts`):

```js
const { createJiti } = require(process.argv[2]);
const jiti = createJiti(__filename, { interopDefault: true, moduleCache: false, fsCache: false });
const fs = require("fs");
const source = fs.readFileSync(process.argv[3], "utf8");
const out = jiti.transform({ source, filename: process.argv[3], ts: true });
console.log("--- jiti.transform output (TS -> JS) ---");
console.log(out.trim());
console.log("--- jiti load ---");
const mod = jiti(process.argv[3]);
console.log("mod.seen =", JSON.stringify(mod.seen), "| globalThis.__ewta_ran =", JSON.stringify(globalThis.__ewta_ran));
```

The two landed carve-outs, for comparison with the cut's `:485`:

```
test/workbench-scratch-census.test.ts:226  if (ts.isHeritageClause(node)) {
test/workbench-scratch-census.test.ts:227    // A class's `extends` operand is evaluated; `implements` is erased (an interface's clauses never reach here).
test/workbench-scratch-census.test.ts:228    if (node.token === ts.SyntaxKind.ExtendsKeyword) for (const type of node.types) visit(type.expression);
test/workbench-scratch-census.test.ts:229    return;
test/workbench-scratch-census.test.ts:230  }
test/workbench-scratch-census.test.ts:231  if (ts.isExpressionWithTypeArguments(node)) {
test/workbench-scratch-census.test.ts:232    // An instantiation expression (f<T>) reads its operand; the type arguments are erased.
test/workbench-scratch-census.test.ts:233    visit(node.expression);
test/workbench-scratch-census.test.ts:234    return;
test/workbench-scratch-census.test.ts:235  }
test/workbench-scratch-census.test.ts:236  if (ts.isTypeNode(node)) return;

test/workbench-beads-program-readiness.test.ts:509  /** A class's extends clause: TypeScript parses it as a type node, but the class evaluates it (wb-52th GM33f). */
test/workbench-beads-program-readiness.test.ts:510  const extendsValue = (node: ts.Node): boolean =>
test/workbench-beads-program-readiness.test.ts:511    ts.isExpressionWithTypeArguments(node) && ts.isHeritageClause(node.parent) && node.parent.token === ts.SyntaxKind.ExtendsKeyword && ts.isClassLike(node.parent.parent);
```

## Suggested fixes, cheapest first

1. **Read an `ExpressionWithTypeArguments` through its `expression` unless it sits under a `HeritageClause` that is not a class `extends`** - in the cut's `freeNamesOf` (`:485-489`) and at the 7 landed sites with no carve-out. For a visitor this is the three lines `scratch-census:231-235` already carries; for an ancestor walk (`census.ts:3275`, `rf-federation:804`, `rf-typed-status-echo:2177`) stop the walk and answer "value" when the first `isTypeNode` ancestor is an `ExpressionWithTypeArguments` whose parent is not a `HeritageClause` (or is a class `extends`); for `beads-program-readiness:510-511`, widen `extendsValue` to that same predicate. It does not fix `typeof f<string>` being a type (it is one), and it does not touch `apo-rerender-census`'s `typed` routing beyond the same operand read.
2. **Pin the falsifier beside each carve-out** - one planted fixture per reader in the gate's pair shape (`(sideEffect, generic)<T>` in a value position, plus its no-type-argument control), so that the admitted-quiet answer is a red row and not a silent hole. This is the gate's own cure direction for the child ("with a pinned falsifier, or state the hole as NOT CLAIMED with a pinned quiet row", M:40402), and it is what the 2026-10-30 positive file praised the census tier for already doing in 16 of 30 files.
3. **One shared `isTypePosition(node)` in `test/helpers/`** that encodes TypeScript's `isTypeNode` exceptions once (the class-extends heritage read, the value-position instantiation expression, the true type query), with a drift test over the five fixture lines of `probe2.cjs`, so that 6 files stop re-deriving the rule and the next `isTypeNode` site inherits the answer. Costs a helper and a test; buys the class rather than the instance.

## Positives worth protecting

- **`test/workbench-scratch-census.test.ts:231-235` already has the right shape, with the reason in the comment** - "An instantiation expression (f<T>) reads its operand; the type arguments are erased." The probe's last column shows that visitor reaching `f` in 2 of 2 value-position cases and not reaching it in the type-query control. A refactor that "simplifies" the visitor to a bare `isTypeNode` return (the `:389` visitor in the same file is exactly that) loses this; the fix above is to copy it, not to remove it.
- **`test/workbench-beads-program-readiness.test.ts:509` records why the class-extends operand is read** - "TypeScript parses it as a type node, but the class evaluates it (wb-52th GM33f)" - a bead-cited reason a maintainer can check rather than a bare condition. The same reasoning, one clause wider, is this file's fix 1.
- **The cut's `srcFiles()` counts untracked, non-ignored files** (`test/workbench-apo-snapshot-census.test.ts:146-148`, `git ls-files --cached --others --exclude-standard -- src`), which is why the gate's on-disk plants were judged live (`fileCount` 119 in all three `.live.json`). A census that read only the index would have let a plant escape by being unstaged; keep the `--others`.
- **The cut's header states GLOBAL's claim in checkable words** (`apo-snapshot-census.ts:62-68`: "a closure identifier ... that names no RUN-TIME binding of its own module, outside ADMITTED_FREE", with the resolution rules enumerated) - which is what let the gate write "claims it contradicts" and name four of them. A fail-closed reader whose claim is explicit can be refuted; one whose claim is implicit can only be doubted.

## What I did not establish

- **Admission through the five landed censuses.** I ran the predicates, not the censuses: no plant was run through `test/helpers/census.ts`'s registration-integrity walk, the rf-federation closure walk, the rf-typed-status-echo context scan, either `apo-rerender-census` visitor, or `beads-program-readiness`'s free-read collector. The artifact that settles each is a vitest run of that census with one IE1-shaped fixture and its control. Until then Finding 4's admission half stays PLAUSIBLE.
- **The 2-file gap (119 vs 117).** The probe worktree's `git ls-files --others --exclude-standard -- src` listing was removed at BIND (M:40410) and is not in the archive's `leg2/`; the explanation in Finding 5 is consistent with the plants' on-disk shape, not read from that listing.
- **pi's own loader options.** `jiti-probe.cjs` calls `createJiti` with options I chose; pi 1.2.0's extension loader source was not read, so whether it adds a transform step that would behave differently is not measured. The type-argument erasure itself is TypeScript emit semantics and does not depend on an option.
- **The gate's IE10/IE11/IE12 under the repo's `tsconfig.json`.** "tsc -p tsconfig.json rc 0, biome check rc 0" is the gate's record, quoted; my own `tsc` run used flags I chose on a plant of my own, not the gate's plant bytes (which live in the archive's `leg2/landable/` and were not re-run here).
- **Other TypeScript versions.** Only 6.0.3 was run. `ExpressionWithTypeArguments` has carried the heritage-clause role since long before instantiation expressions reused it (TS 4.7), so the answer is unlikely to differ at nearby versions, but that is reasoning, not measurement.
- **U2** (GK1/GK2/GK3 surviving at 0 of 178) and whether wb-021.8's eventual reader carries fix 1: both belong to the machine's record and to a future cut, not to this file.

## Postscript - the filename cap

The scaffold's slug for the first title ran to 190 characters; the task's cap is under 190 and some hosts fail above about 200, so the file was renamed before writing (`typescript` to `ts` in the slug, and "5 of 6 landed readers" restated as "8 of 9 landed guard sites" once the word-bounded grep separated sites from files - the scratch-census file carries the carve-out at one of its two sites, so a per-file count hid the `:389` site). The title above matches the renamed slug. A sibling file for the same day (`2026-10-31-CORROBORATION-r-b162-...`) appeared in this working tree while this one was drafted, from another lane; it was not opened or touched.
