# wb-lri: W07: HyperUnix provider

## 2026-11-11 receipt: the source-basis standing census and the installed-HX probe, cut 4 (machine seat ws-10; cures refusal #3, U1-U5)

- Surface: test and docs only, no src, qa or record change. `test/workbench-hyperunix-source-basis-standing.test.ts` is the census (19 rows: 14 cases, 4 shape and anchor rows and the registration row), `qa/workbench/hx-source-basis-probe.mjs` the native probe and `qa/workbench/receipts/wb-lri-hx-source-basis-probe.json` its committed record (both unchanged since cut 1), and this file the receipt. Base trunk `ce180d82f938`.
- Census: wb-lri (W07) source-basis standing census: the provider module's injected hyperunix.find registration, run over a recording reader, issues the record's request, with and without its root, with no view member, and over results on the three view values the committed record holds (its live view, its pinned request spelling and its null view), each without and with its enumerated SDK pinned-view resolution, outputs exactly the envelope of the SDK's own serialization of the result without the resolution, so each view verbatim, while hyperunixTopology over those outputs states no subjectBasis, sourceRevision or definitionDigest; its native registration, read with the TypeScript parser and binder in the read sets enumerated here, spells no view in its request and no revision member in its return; and the committed record, anchored leaf for leaf, holds the installed hx's refusal of a pinned find (HX-VIEW-013)
- History: cut 1 (`ca61b20c`, machine seat ws-09) was refused at gate run g10-gate-s289 (refusal #1, gate-prep-36: G1, G2 and G3). Cut 2 (`65cb9bff`, machine seat ws-01) was refused at the same gate run (refusal #2, gate-prep-160, standing rule 16 LEG 2: U1-U6; the class guard of record bound by R-B778). Cut 3 (`fa7cbee3`, machine seat ws-08) cured U1-U6 and was refused at gate run g10-gate-s290 (refusal #3, gate-prep-3, standing rule 16 LEG 2: U1-U5), which engaged the second-stage cap of standing rule 19(c) (R-B794): the claim-word shape is frozen and this cut is authored in the rule-14 enumerate-the-resolvable form. None landed; this entry replaces cut 3's.
- Form: the census's rows, their pins, the residual families and the anchor rows are cut 3's, unchanged, so the frozen-shape literal is cut 3's. Cure form pin-and-falsify for U1-U5: each survivor gets a witness the census reds on, and every claim word now ranges over the read sets and results the census header enumerates, with everything outside them a NOT CLAIMED scope sentence. The run-time rows invoke the injected registration with the record's request on the three view values the committed record holds: the live leg's measured `hx.view/workspace-head`, the pinned leg's requested `git:04eeeaaf6cfb1db030ac3b1362e589c050d81f2a` (the recorded build answered no pinned find, so this request spelling stands in for the identity a runtime would print for one) and the pinned leg's null view. The quiet row runs each of them with a resolution too: on the pinned view the resolution of that request (requested and resolved to the base revision), on the live and null views cut 3's distinctive control resolution.
- U1, N01 (a relay of the resolution as `basis`, keyed on a view other than the live spelling): QUIET-DROPPED-RESOLUTION now runs over the pinned view carrying that request's own resolution, the form a resolution travels, besides the live and null views carrying the control resolution; it pins the three pairs and shows each reader result carries its resolution, and holds each resolution-carrying output, member for member, to the envelope of the SDK's own serialization of the result without the resolution and to the output without it, with the projections equal too. SB2a's envelope pin covers the pinned view as well. N01 replayed alone from the refusal's archive reds 3 failed (SB2a, QUIET-DROPPED-RESOLUTION, REGISTRATION). The quiet row's title, the R-DROPPED-RESOLUTION header and this entry now name the enumerated views and resolutions; another resolution, or a resolution on another view, is NOT CLAIMED.
- U2, N03 (a pinned view rewritten to the live spelling): SB2a now runs over both string views the record holds, the live and the pinned spelling, pins them to those spellings, and requires each verbatim in `source.view` and the whole envelope; SB2b keeps the pinned leg's null view, read from the record. N03 replayed alone reds 4 failed (SB2a, QUIET-DROPPED-RESOLUTION, SB3, REGISTRATION). The title and the ENVELOPE row now say each enumerated view verbatim, never the runtime's view at large.
- U3, N04 (an observer `subjectBasis` for a pinned view): SB3 now projects the injected outputs for all three enumerated views, pinned to the record's three values, requires each topology's one snapshot to carry no `subjectBasis`, `sourceRevision` or `definitionDigest`, and requires the three topologies, their view facets set aside, to be equal (a witness pins what is set aside: one view facet per string view, none for the null view). N04 replayed alone reds 2 failed (SB3, REGISTRATION). The PROJECTION row and the title now range over the three enumerated outputs, and the NOT CLAIMED sentence is reconciled: hyperunixTopology over any other output (one carrying a basis included) is NOT CLAIMED.
- U4, N11 (the observer omitting the snapshot's source reference): SB3 now requires each topology to project exactly one snapshot whose source reference is provider `hyperunix`, type `query`, a 64-hex id and the workspace as scope, before any equality between views. N11 replayed alone reds 2 failed (SB3, REGISTRATION).
- U5, N10 (a `/srv/` host path in the live leg's diagnostic reason, record and receipt together): SB6 now reads every string value of the record for an absolute path in ABSOLUTE_PATH's forms (a slash or tilde-slash opening the value or following white space, a colon or an equals sign; a backslash pair; a lone drive letter before a backslash) and keeps cut 3's seven host roots over the record's JSON serialization; one witness of each form and of each root reads as one, and N10's `/srv/` reason and N10c's `/home/` reason, each planted into the record text, read as that one absolute path. N10 replayed alone reds 2 failed (SB6, REGISTRATION). A host path in another form (a relative path, one joined to the text before it by another character, an encoded path, one in an object key) is NOT CLAIMED.
- The bead's source-basis half: "Typed HX query capability preserving source basis ... Verify actual installed HX SDK surface first; honest blocker if absent. Acceptance: real query coverage and source basis." Its notes leave "Full source basis/observer acceptance" open. The coverage half is landed and pinned elsewhere (the observer's H2 cases and the docs/07 census row H1).
- SDK surface (background, from the vendored `@hyperunix/sdk` 0.1.0 declarations, `dist/workspace.d.ts`): a read's source basis is declared only as `ReadResult.revision`, the runtime's own resolution of a pinned view (its `hx.view` frame: the requested revision and the resolved commit, "null when the stream carried none (a live read)"). `QueryResult` declares no such member, and the record's live leg serialized no `revision` key, so the `hyperunix.find/v1` output, whose source is `resultToJson` of the result, carries none.
- Version pin, measured 2026-11-11: the runtime hx 0.1.0, binary SHA-256 `50b17a4b4c2ac5bc1f7a1cbf12652ff00271ac89726f025bf5184b82a3eebc90`, resolved from PATH, HXS 1.0, protocol hxs/1.0; `@hyperunix/sdk` 0.1.0, the vendored package.
- Leg provider-live (the provider's find request exactly as issued, no view: kind `hx.fs/regular-file`, root `src`, best effort, a 30 s wall bound, a 60 s wait, over a two-file scratch repository at base revision `04eeeaaf6cfb`): exit 0, terminal complete over unknown completeness, absence not licensed, view `hx.view/workspace-head`, no pinned-view resolution (the SDK's revision member is null) and no runtime query digest.
- Leg provider-pinned (the same request pinned through GitView to the base revision, the SDK's only revision binding): refused with exit 2 (usage_refused), HX-CLI-USAGE-ERROR, reason `view-binding-pending: hx find under --view git:04eeeaaf6cfb1db030ac3b1362e589c050d81f2a`, requirements HX-VIEW-003, HX-VIEW-008 and HX-VIEW-013, zero frames: the demand is not answered from the live tree.
- Honest blocker: no source basis exists for a find at this build. Over the enumerated results the injected registration issues no view member and outputs exactly the envelope of the SDK's own serialization of the result without the resolution (each enumerated view verbatim), and hyperunixTopology over those outputs states no `subjectBasis`, `sourceRevision` or `definitionDigest`; the native registration, read with the TypeScript parser and binder in the census's enumerated read sets, spells no view in its request and no revision member in its return; and the census pins exactly that. The remainder (a pinned find answered with the runtime's revision resolution, its relay through hyperunix.find and its projection as the snapshot's source basis) waits on HyperUnix-CLI binding a view for find (HX-VIEW-013), parked on the bead per standing rule 21(1).
- NOT CLAIMED: a pinned find's source basis; for the run-time rows, a request other than the record's, a view value other than the three enumerated (another pinned spelling, the SDK's live or epoch request spelling, an identity a later runtime prints for a pinned read), a resolution other than the two enumerated, and a result of another shape than the census's document; hyperunixTopology over any output other than the injected outputs for the three enumerated views (one carrying a basis included); hx verbs other than find; hx builds other than the recorded binary; a live re-measure (the census reads the committed record); the hyperunix.find descriptor surface (its input schema and version; the BINDING table spells the input schema's declaration, so an edit reds SB7, but no claim is made of it); the native registration at run time (its code is read by the parser and the binder, never run); a view or option reaching the runtime by a route the parser does not read (the child environment, an hx or SDK configuration file, the runtime's own default view); SDK operations or hx processes other than the two find calls (the token pins red on any that names find or a view in an identifier or a plain string literal; a name split across a template literal or a string concatenation says nothing); the injected find call's receiver beyond its name (SB1c reads it as the identifier `reader`, so a same-named wrapper forwarding to the injected reader, as refusal #3's boundary member N06 plants, is not read); the native find call's kind and root values and the invoke's arguments; names under a type; a rewrite of an SDK export, a global or a provider binding made outside the provider module (another module's code, a test's spy); which host registers which registration; a host path in a form SB6's two readings do not read.
- Residuals, each named and pinned by a quiet row (the residual table below). R-DROPPED-RESOLUTION: both registrations serialize with the SDK's `resultToJson`, which keeps no pinned-view resolution, so a result that carried one would reach the output without its source basis; QUIET-DROPPED-RESOLUTION pins it at run time over the three enumerated views, each carrying its enumerated resolution (the output equal to the envelope of the SDK's own serialization of the result without it and to the output without it, its runtime exactly version and binary digest, no member named revision, the projection unchanged, and on the live and null views neither half of the control resolution in the output's text), with the parser over the provider's code (no identifier, private name or string or template literal text containing revision or resolvedcommit in any case) and with the binder (both serializer calls resolve to the SDK import); another resolution, or a resolution on another view, is NOT CLAIMED. R-RUNTIME-REWRITE: a run-time rewrite of what a resolved binding holds leaves every parser and binder reading unchanged; QUIET-RUNTIME-REWRITE pins the provider module's code to no write in the read forms (assignment, update, delete, for-in or for-of target, or a call naming a landed MUTATORS member, const aliases followed), and any other rewrite form inside the module is a member of this family it does not read.
- Frozen shape (standing rule 16): unchanged from cut 3; one row pins REQUEST:4, ENVELOPE:3, BINDING:1, PROJECTION:1, MEASURED:3, the two residual families, the four anchor rows and the record's 54 leaves. Outside anchors: this entry's census line, its layout and its five tables below, which the census reads row by row; every row of the census states its exact assertion count, held by the Judged pins and Shape rows tables.
- Red first: the cut-4 census over the receipt as cut 3 left it (19:11:16Z) gives 3 failed | 16 passed (19): ANCHOR-RECEIPT and ANCHOR-RECORD (no cut-4 heading yet) and the registration row; every case, FROZEN-SHAPE and TILING are green on the real provider. Cut 3's census and receipt under each of refusal #3's five survivors applied alone each read 0 failed, 19 of 19 green (N01, N03, N04, N11 and N10), the refusal ground reproduced (control 0 failed, 19 of 19 green); this cut reds each (next item).
- Refusal #3's members, each replayed alone on a replay tree of the entry commit `fa7cbee3` carrying this cut (failed rows, the registration row among them): the survivors N01 3 failed (SB2a, QUIET-DROPPED-RESOLUTION, REGISTRATION), N03 4 failed (SB2a, QUIET-DROPPED-RESOLUTION, SB3, REGISTRATION), N04 2 failed (SB3, REGISTRATION), N11 2 failed (SB3, REGISTRATION) and N10 2 failed (SB6, REGISTRATION); the kills stay red, N01c 4 failed (SB2a, SB2b, QUIET-DROPPED-RESOLUTION, REGISTRATION), N03c 5 failed (SB2a, SB2b, QUIET-DROPPED-RESOLUTION, SB3, REGISTRATION), N04c 2 failed (SB3, REGISTRATION), N05 2 failed (SB3, REGISTRATION), N07 ported to this entry's heading 2 failed (ANCHOR-RECEIPT, REGISTRATION), N08 ported to this entry's census line 2 failed (ANCHOR-RECEIPT, REGISTRATION) and N10c 2 failed (SB6, REGISTRATION); the boundary member N06 0 failed, 19 of 19 green, as the receiver sentence scopes it. Pin flips PF1 2 failed (SB4, REGISTRATION), PF2 2 failed (SB7, REGISTRATION), PF3 2 failed (FROZEN-SHAPE, REGISTRATION) and PF4 (ported to this entry's table) 2 failed (ANCHOR-RECEIPT, REGISTRATION).
- Refusal #2's members, each alone on the same tree: L01 4 failed (SB2c, SB7, QUIET-RUNTIME-REWRITE, REGISTRATION), L02 4 failed (SB2c, QUIET-DROPPED-RESOLUTION, SB7, REGISTRATION), L04 3 failed (SB1c, SB7, REGISTRATION), L06 2 failed (ANCHOR-RECORD, REGISTRATION), L07 2 failed (ANCHOR-RECORD, REGISTRATION), L08 2 failed (ANCHOR-RECORD, REGISTRATION), L10 ported to this entry's Surface item 2 failed (ANCHOR-RECEIPT, REGISTRATION), L12 4 failed (SB2a, SB2b, QUIET-DROPPED-RESOLUTION, REGISTRATION), L03 4 failed (SB2c, QUIET-DROPPED-RESOLUTION, SB7, REGISTRATION), L05 2 failed (SB1a, REGISTRATION), L09 3 failed (SB5, ANCHOR-RECORD, REGISTRATION); its NOT CLAIMED boundary probe L11 0 failed, 19 of 19 green. Refusal #1's plants: G1 6 failed (SB1c, SB1d, SB2c, QUIET-DROPPED-RESOLUTION, SB7, REGISTRATION), G2 5 failed (SB1c, SB1d, SB2c, SB7, REGISTRATION), G3 3 failed (SB2c, QUIET-DROPPED-RESOLUTION, REGISTRATION), G4 5 failed (SB1a, SB1b, SB1c, SB1d, REGISTRATION), G5 4 failed (SB2a, SB2b, QUIET-DROPPED-RESOLUTION, REGISTRATION), G6 2 failed (ANCHOR-RECORD, REGISTRATION), G7 2 failed (ANCHOR-RECORD, REGISTRATION), G8 ported to this entry's headings 2 failed (ANCHOR-RECEIPT, REGISTRATION), G9 ported 2 failed (ANCHOR-RECEIPT, REGISTRATION), G10 1 failed + 1 skipped (SB4) (REGISTRATION), G11 2 failed (SB4, REGISTRATION).
- CT battery (v2), each member applied alone on the replay tree (never the seat checkout), the census run there and the tree restored: CT-BATTERY v2: CT1 red=4; CT1b red=4; CT2 red=2; CT3 red=3; CT4 red=4; CT5 red=3; CT6 red=3. CT1 takes SB1b out of the REQUEST row, CT1b SB5 out of the MEASURED row, CT2 shortens the REQUEST claim by its last clause, CT3 swaps the ENVELOPE pin SB2b for SB4, and CT4 deletes the PROJECTION row and its case SB3. CT5 deletes that row and case and takes PROJECTION:1 out of the frozen-shape literal, and CT6 takes SB2b out of its case, its row's pins and the frozen-shape count together. CT5 and CT6 are killed by this entry's Claims, Judged pins and Shape rows tables (ANCHOR-RECEIPT, outside the census), with TILING's exact assertion count beside them. The unplanted control reads 0 failed, 19 of 19 green.
- Seat probes against this cut's own claim words, each alone on the replay tree (failed rows): P01 a basis member relayed by the injected registration for a view with the git: prefix: 3 failed (SB2a, QUIET-DROPPED-RESOLUTION, REGISTRATION); P02 the resolution relayed only when one is present and the view is not the live spelling: 2 failed (QUIET-DROPPED-RESOLUTION, REGISTRATION); P03 a git: view rewritten to git:HEAD: 4 failed (SB2a, QUIET-DROPPED-RESOLUTION, SB3, REGISTRATION); P04 a string view other than the live spelling dropped to null: 4 failed (SB2a, QUIET-DROPPED-RESOLUTION, SB3, REGISTRATION); P05 the requested revision appended to runtime.version when a resolution is present: 2 failed (QUIET-DROPPED-RESOLUTION, REGISTRATION); P06 the resolution relayed into source.extensions only when its requested text is the view's revision: 2 failed (QUIET-DROPPED-RESOLUTION, REGISTRATION); P18 an extra top-level output member for a string view other than the live spelling: 3 failed (SB2a, QUIET-DROPPED-RESOLUTION, REGISTRATION); P07 an extra observer facet for a non-live string view: 2 failed (SB3, REGISTRATION); P08 the view facet of a non-live string view prefixed: 2 failed (SB3, REGISTRATION); P09 the view appended to the snapshot title for a non-live string view: 2 failed (SB3, REGISTRATION); P10 a second snapshot carrying the view as subjectBasis for a non-live string view: 2 failed (SB3, REGISTRATION); P11 the source reference scope widened with a non-live view: 2 failed (SB3, REGISTRATION); P17 a subjectBasis key holding undefined for a non-live string view: 2 failed (SB3, REGISTRATION); P12 a file URL in the live leg's diagnostic reason, record and receipt together: 2 failed (SB6, REGISTRATION); P13 a home-relative path opening that reason: 2 failed (SB6, REGISTRATION); P14 a drive-letter path opening that reason: 2 failed (SB6, REGISTRATION); P15 an absolute path after an equals sign in that reason: 2 failed (SB6, REGISTRATION); P19 an absolute /srv/ path in producer.binaryOrigin, record and receipt together: 2 failed (SB6, REGISTRATION); P20 a /var/ host root joined to the text before it in producer.binaryOrigin: 2 failed (SB6, REGISTRATION); and the NOT CLAIMED boundary of SB6, a path joined to the text before it, P16 (in producer.binaryOrigin): 0 failed, 19 of 19 green, as that sentence scopes it (the same text put in the live leg's reason instead reds SB6 only through its in-census plants, whose one anchor, the record's null reason, is then gone: 2 failed (SB6, REGISTRATION))
- Green: 19 of 19 (census), with `test/workbench-receipts-shape.test.ts` 25 of 25 and `test/workbench-receipts-convention.test.ts` 24 of 24.
- Record command: `node qa/workbench/hx-source-basis-probe.mjs --write qa/workbench/receipts/wb-lri-hx-source-basis-probe.json` (2026-11-11). The record is tied to the probe by its SHA-256 (SB6) and to this receipt leaf for leaf (ANCHOR-RECORD), so an edit to the probe reds SB6 and a regenerated record (its `utc` at least) reds ANCHOR-RECORD until this table is re-cut with it.
- Display paths added: none.

### Claims, wb-lri cut 4

| Row | Claim |
| --- | --- |
| REQUEST | the injected registration issues the record's request with no view member at run time, with its root and without it; read with the TypeScript parser and binder, the module's two find calls on identifier receivers (named reader and workspace) pass exactly the five request members with a bounds member spelled Bounds.create of the record's wall, nativeHyperUnixFind opens its workspace with the realpath root alone, the names its find and open calls read resolve to the SDK and node:fs imports and the function's own parameters and const, and no identifier, private name or string or template literal text of the code contains view in any case |
| ENVELOPE | over a result on each of the three enumerated views, without a resolution, the injected registration's output equals the envelope of the contract, the SDK's own serialization of the result, the workspace root and the runtime's version and binary digest, so it relays that view verbatim and no member name in it matches revision, basis or resolved; read with the TypeScript parser and binder, nativeHyperUnixFind returns exactly the four envelope members, its source being the SDK's resultToJson of its own find result, and registerNativeHyperUnixFind's one register call's invoke calls the module's nativeHyperUnixFind |
| BINDING | read with the TypeScript binder, every name the two native function bodies read resolves as this census's name tables pin, nativeHyperUnixFind's own declarations and parameters are exactly the pinned ones, and both registration names are each declared once, by an exported function, in a module with no export declaration or export assignment |
| PROJECTION | hyperunixTopology over the injected registration's outputs for the three enumerated views projects for each exactly one snapshot with no subjectBasis, sourceRevision or definitionDigest and the hyperunix query source reference, and the three topologies, their view facets set aside, are equal |
| MEASURED | the committed record, tied to its probe and anchored leaf for leaf in the receipt, measured the live view without a pinned-view resolution and the pinned request refused under HX-VIEW-013 |

### Judged pins, wb-lri cut 4

| Row | Pin | Assertions |
| --- | --- | --- |
| REQUEST | SB1a | 9 |
| REQUEST | SB1b | 3 |
| REQUEST | SB1c | 18 |
| REQUEST | SB1d | 12 |
| ENVELOPE | SB2a | 13 |
| ENVELOPE | SB2b | 5 |
| ENVELOPE | SB2c | 21 |
| BINDING | SB7 | 10 |
| PROJECTION | SB3 | 22 |
| MEASURED | SB4 | 10 |
| MEASURED | SB5 | 11 |
| MEASURED | SB6 | 15 |
| ENVELOPE | QUIET-DROPPED-RESOLUTION | 25 |
| BINDING | QUIET-RUNTIME-REWRITE | 5 |

### Residuals, wb-lri cut 4

| Residual | Quiet row |
| --- | --- |
| R-DROPPED-RESOLUTION | QUIET-DROPPED-RESOLUTION |
| R-RUNTIME-REWRITE | QUIET-RUNTIME-REWRITE |

### Shape rows, wb-lri cut 4

| Row | Assertions |
| --- | --- |
| FROZEN-SHAPE | 4 |
| TILING | 30 |
| ANCHOR-RECEIPT | 11 |
| ANCHOR-RECORD | 2 |
| REGISTRATION | 3 |

### Measured record, wb-lri cut 4

| Field | Value |
| --- | --- |
| schema | "wb-lri.hx-source-basis-probe/1" |
| bead | "wb-lri" |
| utc | "2026-11-11T05:36:44.126Z" |
| probe.script | "qa/workbench/hx-source-basis-probe.mjs" |
| probe.scriptSha256 | "af09e069e0b56b0d793286b536df32ad4f8375c509a5224b2ee934affc8f41c9" |
| producer.name | "hx" |
| producer.version | "0.1.0" |
| producer.binarySha256 | "50b17a4b4c2ac5bc1f7a1cbf12652ff00271ac89726f025bf5184b82a3eebc90" |
| producer.binaryOrigin | "path" |
| producer.hxsVersion | "1.0" |
| producer.protocol | "hxs/1.0" |
| producer.sdk.name | "@hyperunix/sdk" |
| producer.sdk.version | "0.1.0" |
| repository.files | ["src/a.txt","src/b.txt"] |
| repository.baseRevision | "04eeeaaf6cfb1db030ac3b1362e589c050d81f2a" |
| request.kind | "hx.fs/regular-file" |
| request.root | "src" |
| request.bestEffort | true |
| request.wall | "30s" |
| request.timeoutMs | 60000 |
| legs.provider-live.id | "provider-live" |
| legs.provider-live.requestedView | null |
| legs.provider-live.outcome | "result" |
| legs.provider-live.exitCode | 0 |
| legs.provider-live.terminal | "complete" |
| legs.provider-live.statusKind | "complete" |
| legs.provider-live.diagnostics.0.code | "HX-COVERAGE-INCOMPLETE" |
| legs.provider-live.diagnostics.0.severity | "warning" |
| legs.provider-live.diagnostics.0.reason | null |
| legs.provider-live.diagnostics.0.requirements | [] |
| legs.provider-live.view | "hx.view/workspace-head" |
| legs.provider-live.revision | null |
| legs.provider-live.revisionMember | true |
| legs.provider-live.resultJsonKeys | ["representation","operation","rows","rows_retained","coverage","status","execution_status","diagnostics","view","cost","transport","workspace_root","terminal","truth","coverage_summary","evidence","digest","digest_source","local_digest","structural_digest","execution_id","budget_dimension","extensions"] |
| legs.provider-live.queryDigest | null |
| legs.provider-live.digestSource | "absent" |
| legs.provider-live.licensesAbsence | false |
| legs.provider-live.completeness | "unknown" |
| legs.provider-live.rows | 3 |
| legs.provider-live.frames | 18 |
| legs.provider-pinned.id | "provider-pinned" |
| legs.provider-pinned.requestedView | "git:04eeeaaf6cfb1db030ac3b1362e589c050d81f2a" |
| legs.provider-pinned.outcome | "process-failure" |
| legs.provider-pinned.errorCode | "SDK_PROCESS_FAILED" |
| legs.provider-pinned.exitCode | 2 |
| legs.provider-pinned.terminal | "usage_refused" |
| legs.provider-pinned.diagnostics.0.code | "HX-CLI-USAGE-ERROR" |
| legs.provider-pinned.diagnostics.0.severity | "fatal" |
| legs.provider-pinned.diagnostics.0.reason | "view-binding-pending: hx find under --view git:04eeeaaf6cfb1db030ac3b1362e589c050d81f2a" |
| legs.provider-pinned.diagnostics.0.requirements | ["HX-VIEW-003","HX-VIEW-008","HX-VIEW-013"] |
| legs.provider-pinned.view | null |
| legs.provider-pinned.revision | null |
| legs.provider-pinned.rows | null |
| legs.provider-pinned.frames | 0 |
