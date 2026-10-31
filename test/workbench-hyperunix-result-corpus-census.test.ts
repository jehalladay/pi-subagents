/**
 * wb-tz2.7 (HX-ORIGINAL-GOALS-CLOSURE-R7, program-triage-2026-10-17), the HyperUnix result-corpus census: the until-then leg of
 * a trigger-gated requirement whose upstream corpus has not shipped. Cut #4 answers refusal #3 (U1-U3 in the bead note) under
 * orchestrator ruling R-B96, in the enumerate-the-resolvable form (the standing rule 14 shape) that R-B79 bound for T1 identity
 * and R-B96 binds for the export-field class: the census claims exactly the items CLAIMS lists, each bound to an executable
 * falsifier this file runs, and every form outside them is a named residual with a pinned quiet row (RESIDUALS).
 * wb-ulnv (the R694 follow-up of wb-tz2.7's landing 708) adds R-DECODER and R-HIDDEN's wrapped members: its cut #1 (seat
 *   ws-05, run g10-work-s151, trunk 42ab54d2) named them, and its cut #2 (seat ws-01, run g10-work-s158, trunk e792b37) answers
 *   wb-ulnv refusal #1 (U1-U3 and F5-F7 in that bead's note) by pinning the plants those quiet rows and T2 claim.
 * Statement: STATEMENT below, the bead's export title verbatim after its id prefix. Acceptance: ACCEPTANCE below, verbatim: the
 * export description's only ACCEPTANCE line, three clauses.
 *
 * MEASURED (read-only). Cuts #1-#3 (seats ws-06, ws-02 and ws-05; bases cd8927f, 04123dc and 499fb36) and cut #4 (seat ws-06,
 * run g10-work-s143, trunk 95960b9) read the same release. package.json names @hyperunix/sdk, its one HX-scoped package, once:
 * in dependencies, as file:vendor/hyperunix-sdk-0.1.0.tgz (sha256 655e08b0, as vendor/README.md records). That tarball is gzip
 * over POSIX ustar: 111 entries, each typeflag 0 under magic ustar 00, with a valid checksum ended by a NUL inside its field, a
 * path under package/ (unique, the longest 39 characters) with only NULs after it in the name field, an all-zero linkname and
 * prefix field, and no number field opening with a high-bit byte; then 1024 zero bytes. They are package/LICENSE,
 * package/README.md, package/package.json and 108 under package/dist (27 modules, each as .js, .d.ts, .js.map and
 * .d.ts.map); their content digest is MEASURED's, and the installed copy, node_modules/@hyperunix/sdk, is the same 111 regular
 * files. The manifest lists files dist, README.md and LICENSE and exports ".", "./raw" and "./protocol". No entry is a data
 * file, no entry path spells conformance, corpus or fixture, exactly two entries spell hyperunix.result/1 in their bytes
 * (dist/result.js and dist/result.d.ts, which define and declare SDK_REPRESENTATION), and of the values the three export
 * subpaths' namespaces hold, walked as exported-representations walks them, only SDK_REPRESENTATION carries it. The release's
 * prose names a corpus it does not ship (dist/result.js: "both consume the one shared fixture corpus
 * sdk/python/test/fixtures/results (the conformance law)"). The export holds one row with the bead's id; its description is
 * 1301 characters of printable ASCII in 11 lines cut at LF alone (sha256 21b968be, DESCRIPTION_SHA256).
 * Upstream (cut #1's reading, not re-run since; read-only git at HyperUnix-CLI main 6d0369d0, 2026-10-28T03:13:09Z):
 * sdk/conformance still holds only evidence/native-resource-bindings (81 files), resource-contract.json, test and tools; the
 * corpus the release names is 49 files of SDK-internal test fixtures, neither hyperunix.result/1 documents nor shipped to
 * consumers; and HXGC-PROV-003 (docs/programs/original-goals-closure-2026-10-16/requirements.jsonl:24) still reads
 * "status":"DESIGN". So the trigger has fired neither in the release Pi vendors nor upstream.
 * SCOPE: the census reads package.json, the vendored tarball of each dependency-field spec naming an HX-scoped package, the
 * installed copy of each such package (its regular files, and @hyperunix/sdk's three export subpaths as imported), the named
 * surface, this file's own source (its header and its import declarations), and the bead's own export row (counted by id; its
 * title and description only, which later store writes leave alone). It never reads HX's tree: a corpus HX publishes in its
 * own tree alone is left to the wb-kqx channel (PARKED below).
 *
 * CLAIMS (the pinned set; each names the case that judges it and the falsifier that shows its reader live). Every case runs once
 * this file has loaded, and the file imports the SDK's three export subpaths statically: a release whose module code fails at
 * import fails the file before any case runs (R-UNLOADED below).
 * T0 the readings are live: package.json's spec names the tarball read; the installed copy equals the strict reading of it file
 *   for file and byte for byte; the codec exports the representation the statement names; the content reader finds the
 *   release's prose naming the corpus it does not ship; the export walk imports every export subpath the vendored manifest
 *   declares and refuses a Proxy; and the comparison, digest, dependency and naming readers each see their planted controls.
 * T1 IDENTITY (ARMED; the census's re-vendor detection claim): for every HX-scoped package package.json names (a name under
 *   @hyperunix/ in any of dependencies, devDependencies, optionalDependencies and peerDependencies), one assertion compares three
 *   facets with WATCHED's measurement, its message the OWED text (which names the acceptance on landing as owed), and it reds
 *   when any facet differs. The set of such packages differing from WATCHED's keys reds it with the OWED text too.
 *   (naming) every [field, spec] pair of the four fields that names the package, in field order: today exactly one,
 *     dependencies with the spec text file:vendor/hyperunix-sdk-0.1.0.tgz. So a package named again in a second field, moved to
 *     another field, or given another spec text reds it, whichever spec npm would install.
 *   (tarballs) for each pair, its file: tarball as the strict reader reads it: the regular-file count and the content digest.
 *     The strict reader reads an archive only in the measured release's form: gzip (Node's gunzip, which concatenates members)
 *     over POSIX ustar in which every header has a checksum of octal digits (then optional spaces, up to the field's first
 *     NUL) that a NUL or a space ends inside its eight bytes and that equals the header's sum; magic ustar with version 00;
 *     typeflag 0; an all-zero linkname field; no number field it does not otherwise read (mode, uid, gid, mtime, devmajor,
 *     devminor) opening with a byte whose high bit is set; a size of octal digits (then optional spaces, up to the field's first
 *     NUL); an all-zero prefix field; and a path of package/ followed by non-empty segments other than . and .., with only NULs
 *     after it in the name field. No path appears twice, every entry's data lies inside the archive, and nothing but zero bytes
 *     follows the first zero block (or the last entry). Any other archive reads refused, naming the first rule it breaks
 *     (REFUSALS); so does a spec outside file: and a missing tarball. So a re-vendor in any form this reader refuses (among
 *     them every typeflag other than 0: contiguous files, links, devices, directories, pax and GNU extended headers; a regular
 *     file whose header node-tar drops and whose data it then reads as headers: one carrying a linkname, a number field node-tar
 *     cannot parse, or a checksum it reads on into the typeflag; a name field holding text after its NUL, which node-tar keeps
 *     past a line feed; data after a zero block; a duplicate path) reds it whatever it holds, and a re-vendor this reader reads
 *     reds it when its content changes.
 *   (installed) the installed copy, node_modules/<name>, walked through its directories: every regular file by path and bytes,
 *     as the count and the content digest. An entry of any other kind (a symbolic link, a socket), or a root that is not a
 *     directory, reads refused. So whatever npm materialized there, from whichever field, spec or lockfile entry it resolved,
 *     reds it when its regular files are not the measured release's or it holds an entry of another kind.
 *   T1 identity cannot tell a re-vendor that ships a corpus from one that ships none (its cutter re-measures WATCHED and ROWS
 *   and says so); the classification pins tell them apart only in the forms they read.
 * T1 IDENTITY FORMS (one case per FORMS row): each re-vendor form the identity claim names is planted in memory into one input
 *   of identityOf, the reader T1 identity runs (the measured release's archive, or its first entry, with the form spliced in;
 *   package.json with the naming edited; or the installed copy with a file added, changed or removed, or with an entry of
 *   another kind), and reads the facets that differ and the outcome its row pins. Three control rows read the measured
 *   identity. The tarballs facet reads only each entry's path and bytes from an archive in the measured form, so a re-pack in
 *   that form reads the measured identity: rebuild-control pins five (other end padding, another gzip level, the gzip stream
 *   cut into two members, the entries in reverse order, and the header fields the strict reader does not read rewritten:
 *   mode, uid, gid, mtime, uname, gname, devmajor, devminor). naming-control and installed-control read package.json and the
 *   installed copy as they are. An archive outside the measured form reads refused whatever it holds, even when npm would
 *   install the same files: repack-refused pins that false red (the fail-closed direction) on the measured entries re-packed
 *   with typeflag NUL (the gate's G-TFNUL-REPACK), with GNU magic (G-GNUMAGIC-REPACK), behind a directory entry, with every
 *   checksum after a space, uncompressed, and under another top directory. Every REFUSALS rule has a row. The forms R-B79
 *   names map to rows: the devDependencies re-name to named-again (the gate's G-DEVDUP), the typeflag variants to typeflags
 *   and typeflag-7 (G-T7), zero-block padding to zero-block-padding (G-ZB) and data-after-end, and the pax renames to
 *   pax-rename (G-PAX) and extended-headers; refusal #3's G-LINKPATH maps to linkname.
 *   FORMS ROSTER (FROZEN SHAPE holds it equal to FORMS' ids): named-again, moved-field, respec, naming-control, typeflag-7,
 *   zero-block-padding, pax-rename, regular-entry, rebuild-control, repack-refused, typeflags, extended-headers,
 *   data-after-end, duplicate-path, checksum, magic, linkname, number, size, prefix, path, truncated, gzip, installed-added,
 *   installed-changed, installed-removed, installed-other-kind, installed-control.
 * T1 CLASSIFICATION (ARMED; one case per pin of ROWS, its message the OWED text): each clause's subject reads absent from the
 *   vendored @hyperunix/sdk (the strict reading of the one tarball package.json names it from) in exactly the forms its pins
 *   read; when that release is refused, or the package is named in more than one field or from no vendored file, every pin
 *   reads the reason and reds.
 *   (provenance) data-entries: every entry other than a dist code file (.js and .d.ts under package/dist and their .map files)
 *   and the three package files is a data entry, and there is none; corpus-paths: no entry path spells conformance, corpus or
 *   fixture, in any case. So no corpus entry ships as a data file or under a corpus-word path.
 *   (drift) representation-entries: only the codec's two files spell the literal hyperunix.result/1 in their bytes;
 *   exported-representations: the only string the walk reaches from the three export subpaths' namespaces that spells it is
 *   SDK_REPRESENTATION itself. The walk reads a string, a primitive (it carries the representation when it includes it; a
 *   String wrapper object is an object, read by its own enumerable properties: its index characters one character each, so
 *   its string value is never read whole, as R-HIDDEN's quiet row shows, and any other own property, as T2's planted String
 *   wrapper shows); the own
 *   enumerable string-keyed data properties of an object or an array; a Map's keys and values, read through
 *   Map.prototype.entries, and a Set's members, read through Set.prototype.values (both as the realm holds them when the walk
 *   runs, never through the value's own iterator or methods), plus the Map's or Set's own enumerable data properties. It calls
 *   no function a value it reaches holds or defines (an accessor, a method, an iterator or a toString; a function value is
 *   never entered, a class included), only built-ins as the realm holds them when the walk runs (Map.prototype.entries,
 *   Set.prototype.values and the iterators they return, Object.keys, Object.getOwnPropertyDescriptor and node:util's type
 *   checks among them). It labels a Map key by its index and a Map value by its key only when the key is a primitive, and
 *   refuses a Proxy before any trap could run (the readings then read unread).
 *   It reads the subpaths as this file imports them, which with no alias or override in place resolve to
 *   node_modules/@hyperunix/sdk, the installed copy T0 holds to the tarball. So no result document ships with
 *   hyperunix.result/1 spelled byte for byte in an entry, or as a primitive string the walk reaches that spells it, however
 *   that string is written or built (a value that is not a string but whose string value includes it is R-HIDDEN's).
 *   (second-entry) exports and files: the manifest's export subpath names and its files list (a member that is not a string
 *   read as its JSON) are today's, so no new subpath name or files member is declared. A corpus behind an existing subpath
 *   name is read by the walk, which imports every subpath, or is R-HIDDEN, as is a corpus in a form none of these reads.
 * T2 the same readers find every signal in a planted release that ships a corpus: a corpus directory, a mixed-case corpus
 *   module, a JSONL data file, a fixtures declaration, a files member that is not a string, exported documents in an array, a
 *   Map's values, a Map's keys (an object key and a string key), a Set, a Map's and a Set's own property, a String wrapper
 *   object's own property, and a Map whose own iterator and entries method hide its entries, and additions to exports and
 *   files. The planted values also carry an
 *   accessor, a Map key's toString and that Map's own entries method, each throwing when called (its own iterator yields
 *   nothing), so a walk that invokes one fails T2. Every pin sees its plant, so a reader hollowed to miss any planted signal
 *   reds.
 * A1 the outside anchors: the export holds exactly one row whose id is the bead's (each non-blank line parsed as JSON.parse
 *   decodes it, member names case-sensitive, so a member another decoder reads as id, title or description is R-DECODER's;
 *   the rows counted by id before any other field is read, as ROW_CONTROLS pin with second rows carrying no title or description, or fields that
 *   are not strings; that row then carries a string title and a string description); the export title is the statement; A1
 *   description holds the description to the one measured, by the sha256 of its text as JSON decodes it, so any edit to it, in
 *   any line form, reds there whatever the field reader reads (its controls edit it after each boundary, with a second value,
 *   a continuation line and an invisible prefix); the description's ACCEPTANCE lines are exactly one, ACCEPTANCE's line, and its
 *   SURFACES lines are exactly one, `SURFACES: ${SURFACE_PIN}`. The field reader cuts the text into lines at every boundary of
 *   LINE_BOUNDARIES: CR LF (as one), LF, CR, VT, FF, FS, GS, RS, NEL, LS and PS, the union of ECMAScript's line terminators
 *   (the engine anchors those four), Unicode's mandatory breaks and Python's splitlines. A field line opens the field: after
 *   any run of whitespace (JavaScript's \s), the field word in any ASCII letter case, then any whitespace and a colon. The
 *   reader returns whole lines, so a second field line after any of those boundaries, or a second value on the one line,
 *   changes the reading, as FIELD_CONTROLS and BOUNDARY_CONTROLS pin. ROWS' clauses are exactly that ACCEPTANCE line's
 *   clauses, in order; and the named surface still holds hand-built result documents in the one form the surface reading
 *   reads: an object-literal property named representation (an identifier, a string key or a computed string key) whose
 *   initializer is a string literal or a template without substitutions spelling hyperunix.result/1, read from the TypeScript
 *   AST through parentheses, as, satisfies, type assertions and non-null marks (comments, other strings and quote style aside).
 *   A representation set from a binding, a concatenation or a template with substitutions, or declared in a type, is not read.
 *   A1's surface controls pin that form. R-B96's items map to falsifiers: the field-line boundary forms to BOUNDARY_CONTROLS'
 *   rows (the gate's G-CR-SURFACES and G-CR-ACCEPTANCE to CR, G-LS-SURFACES to LS, the U+2029 row to PS, G-CRLF-CONTROL to
 *   CR LF) and to A1 description, exportRow's one-row read to the row count by id (G-DUPROW), and the packaging sentence to
 *   rebuild-control and repack-refused above.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every reading is pinned exactly once; WATCHED's
 *   keys and facets are literals (held to package.json by T1 identity and RECORDS); LINE_BOUNDARIES' names and code points,
 *   REFUSALS, FORMS' ids and facets, SURFACE_CONTROLS' and ROW_CONTROLS' counts and FIELD_CONTROLS' fields and counts are
 *   literals; every REFUSALS rule has a FORMS row; the FORMS ROSTER above equals FORMS' ids; R-DECODER's PLACEMENTS ids and
 *   members, its plant-set reading by placement, the engine's fold classes and the spelling counts are literals; and the
 *   RESIDUALS lines below equal QUIET's keys.
 * RECORDS (the last case): T1 identity judged every HX-scoped package package.json names (an anchor outside the census's
 *   literals), and every classification pin's case, every FORMS row's case and every residual's quiet row ran to its end.
 * RESIDUALS (named families, each with a pinned quiet row in QUIET; FROZEN SHAPE reads the five lines below):
 * R-HIDDEN a corpus in any form the classification readings do not read. Known members: documents behind a function call, an
 *   accessor, a non-enumerable, symbol-keyed or inherited property or a function's own property; documents in a WeakMap or a
 *   WeakSet, a class instance's private field, a Promise's resolution, or bytes (a typed array holding a document's JSON);
 *   documents whose representation is not a string but a value whose string value includes it: a String wrapper object (new
 *   String(SDK_REPRESENTATION), the gate's G-STRING-OBJECT, whose index characters the walk reads one at a time), an object
 *   whose toString or Symbol.toPrimitive returns it, a symbol whose description holds it, or a function whose source
 *   spells it; documents the walk would read through a built-in that the release's import-time code replaced (Map.prototype.entries);
 *   documents in a neutral-named module that no export subpath re-exports and whose bytes never spell hyperunix.result/1 byte
 *   for byte (the representation imported from the codec, or escape-spelled); and documents declared only in types. Shipped
 *   in the vendored release, each still changes T1 identity's tarballs facet (the strict reader reads the new content or
 *   refuses the archive) and its installed facet. The quiet row plants every known member in today's release (it replaces
 *   Map.prototype.entries for one walk and restores it), and every classification pin reads today's set. Literals pin the
 *   plant itself (hiddenPlant): the planted namespace's bindings beside the SDK's own, by name and property kind
 *   (resultCases, loadCases, INHERITED_CASES, WEAK_CASES, WEAK_SET, VAULT, PENDING_CASES, CASE_BYTES and WRAPPED_CASES as
 *   enumerable data, CASES as an enumerable accessor, HIDDEN_CASES as non-enumerable data and the symbol-keyed cases); the
 *   wrapped members as the namespace carries them where the walk reads (each WRAPPED_CASES document's representation,
 *   reached through own enumerable data properties; beside the quiet, the same plant with each member replaced by the
 *   representation itself is read by the walk at exactly those five paths): one of each kind by the realm's own checks (a
 *   String wrapper by node:util's isStringObject, an object whose own toString or own Symbol.toPrimitive is a function, a
 *   symbol, a function), each one's string value (String.prototype.valueOf, the method's result, the description,
 *   Function.prototype.toString) including the representation; and the planted module entries (cases, samples, shapes and
 *   wrapped, with the declarations of cases and wrapped), each of which, shipped alone in today's release, makes T1
 *   identity's tarballs facet read another release.
 * R-OTHER-PACKAGE a corpus in a package T1 identity does not watch: one outside the @hyperunix/ scope (another scope, that scope
 *   in another letter case, or none), or an HX-scoped one that package.json's four dependency fields do not name (named only
 *   in bundledDependencies, overrides or workspaces, or installed only as another package's dependency). The quiet row plants
 *   such packages in two dependency fields and in those three manifest fields: the HX-scoped set stays @hyperunix/sdk alone,
 *   and the unnamed one has no naming.
 * R-SELF-HOLLOW a census member removed from every literal that names it is unseen by the outside anchors, which bind ROWS'
 *   clauses (A1), the export description (A1 description), package.json's HX-scoped packages (T1 identity and RECORDS),
 *   ECMAScript's four line terminators (the engine, in A1) and Unicode simple case folding (the engine, in R-DECODER's fold
 *   classes and plant sets), and nothing else: a pin (from ROWS, ReadingId, READINGS,
 *   PLANTED_READINGS and the frozen literal), a residual (from QUIET, the frozen literal and its header line), a planted signal
 *   (from PLANTED_ENTRIES or PLANTED_MODULES and PLANTED_READINGS), a surface control (from SURFACE_CONTROLS and its frozen
 *   counts), a field or row control (from FIELD_CONTROLS or ROW_CONTROLS and its frozen literal), a re-vendor form (from FORMS,
 *   its frozen literal and CLAIMS), a residual's known member (from its quiet row's plant, the quiet row's literals that name
 *   it and the residual's header text; R-HIDDEN's planted bindings, wrapped members and planted entries among them), an
 *   R-DECODER placement (from PLACEMENTS and its frozen literals), or a line boundary other than LF, CR, LS and PS (from
 *   LINE_BOUNDARIES, its frozen literals and CLAIMS). The quiet row pins that each pin's removal leaves A1's anchor reading
 *   unchanged while each row's removal changes it, and that a boundary's removal leaves the engine anchor's reading unchanged
 *   for exactly CR LF, VT, FF, FS, GS, RS and NEL. For the two member kinds wb-ulnv names it pins that each R-HIDDEN planted
 *   binding's, wrapped member's and planted entry's removal from the plant alone leaves every classification pin's reading of
 *   the planted release unchanged and T1 identity's tarballs facet still reading it as another release, while R-HIDDEN's
 *   literal for that member reads the removal; and that each R-DECODER placement's removal leaves the engine fold anchor's
 *   reading (the placements whose plant set is not the one the engine's folds predict: none) unchanged, while one name's
 *   removal from any placement's plant set is read.
 * R-UNLOADED a re-vendor whose module code fails when this file imports the SDK's three export subpaths (a throw at import, or
 *   a subpath retargeted to a file Node cannot import as a module): the file then fails at load with the loader's error,
 *   before any case runs, so no case's message (the OWED text included) is read, though its package.json, tarball or
 *   installed copy would read changed if the cases ran. The quiet row reads this file's import declarations (TypeScript AST):
 *   its only imports from the @hyperunix/ scope are the three static subpath imports MODULES walks.
 * R-DECODER a member another decoder reads as one A1 reads (id, title or description) while JSON.parse, by which A1 reads the
 *   export, keeps it apart. bd is a Go program (go version -m reads go1.26.2), and Go's encoding/json matches each member name
 *   to a field case-insensitively, so a later member spelled in another case sets the field over the exact one; go 1.26.2
 *   matched, at every position of the three names, exactly the code points Unicode simple case folding takes to the name's
 *   letter (MEASURED over every code point by wb-ulnv cut #1, seat ws-05, run g10-work-s151, trunk 42ab54d2, and again by the
 *   gate at wb-ulnv refusal #1; the only one outside ASCII is U+017F for s), the folding the engine's case-insensitive Unicode
 *   match reads (engineFolds, an anchor outside this file's literals). Which decoder bd's import runs is unread (PLAUSIBLE).
 *   Known members: every spelling of id, title and description other than the exact one whose code points each fold to the
 *   name's letter (3, 31 and 3071), in each PLACEMENTS placement: a later member of the bead's row holding another id, an
 *   edited title or an edited description (the gate's G-DESC-CASEKEY, Description), a second row whose only id member holds
 *   the bead's id (G-IDKEY-UPPER, ID), or another bead's row with a later id member holding the bead's id. go 1.26.2 read
 *   every one of these texts as the exact name's edit (MEASURED by the same two readings, 3, 31, 3071, 3 and 3 texts by
 *   placement). The quiet row plants every spelling in every placement in memory and pins the names it reads at the engine:
 *   in each placement they number the product of the engine's fold-class sizes over the member's letters less one, all
 *   distinct, of which all but the all-ASCII spellings hold a code point outside ASCII (1024 for description), each one the
 *   engine's case-insensitive Unicode match reads as the member and none the member itself (FROZEN SHAPE holds each
 *   placement's plant-set reading as a literal too). A1's reading (the rows counted by id, the title against the statement
 *   and the description against its digest) reads today's for each name; beside the quiet, a decoder that sets id, title or
 *   description from each member whose name that engine match reads as one, a later member over an earlier one, reads each of
 *   those texts as its placement's exact edit and the bead's row re-encoded alone as A1 does; and each placement under the
 *   exact name reads the edit.
 * PARKED (the external remainder; standing rules 21(1) and 24): the acceptance's three clauses need a consumer-facing
 * hyperunix.result/1 corpus in a release Pi vendors, and the request for it travels the wb-kqx upstream-feedback channel, a
 * HyperUnix-CLI new-feedback write outside Pi-subagents that this cut does not make. A landing of this cut closes only the
 * until-then leg; the on-landing leg stays owed.
 * Display paths added: none. Test-only: it reads files, spawns nothing and writes no file.
 */
import { createHash } from "node:crypto";
import { lstatSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { types } from "node:util";
import { gunzipSync, gzipSync } from "node:zlib";
import * as sdkRoot from "@hyperunix/sdk";
import * as sdkProtocol from "@hyperunix/sdk/protocol";
import * as sdkRaw from "@hyperunix/sdk/raw";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const SELF = fileURLToPath(import.meta.url);
const REPO = join(dirname(SELF), "..");
const BEAD = "wb-tz2.7";
const EXPORT = ".beads/issues.jsonl";
const SDK = "@hyperunix/sdk";
/** The npm scope HX publishes under: every package of it that Pi depends on is a release T1 identity watches. */
const HX_SCOPE = "@hyperunix/";
const DEPENDENCY_FIELDS = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"] as const;
const PACKAGE_DIR = "package/";
const REPRESENTATION = "hyperunix.result/1";
const TITLE_ID = "[HX-ORIGINAL-GOALS-CLOSURE-R7]";
/** The bead's statement: its export title after the id prefix, verbatim (A1). */
const STATEMENT =
  "When HX publishes a consumer-facing hyperunix.result/1 conformance corpus (HXGC-PROV-003 DESIGN requirements.jsonl:24@6ed14cab8d; at the pin sdk/conformance holds only budget fixtures), Pi shall pin its consumer fixtures to corpus entries (id + sha), replacing or cross-validating the hand-built JSON derived from one measured live read; the request travels the wb-kqx upstream-feedback channel.";
/** The bead's acceptance: the export description's one ACCEPTANCE line's item, verbatim (A1). */
const ACCEPTANCE =
  "On landing: fixture provenance lines cite corpus entry id + sha; a drift test fails when a vendored corpus entry and the Pi fixture derived from it disagree; a second corpus entry (not just today's shape) round-trips through the adapter, proving the fixture set is not hard-coded to one shape.";
const ON_LANDING = "On landing: ";
/** The surface the acceptance on landing converts, as the export's one SURFACES line names it (A1). */
const SURFACE = "test/workbench-hyperunix-observer.test.ts";
const SURFACE_PIN = `${SURFACE}:37-78@9df9a03`;
/** The export description as cut #4 measured it at trunk 95960b9: the sha256 of its text as JSON decodes it (A1 description). */
const DESCRIPTION_SHA256 = "21b968beac29c6411e6f9ac04df77ce56dab6519b3820427589e14c9c70a8e68";
/** The prose by which the release names the SDK-internal corpus it does not ship (dist/result.js, measured). */
const NAMED_CORPUS = "fixture corpus sdk/python/test/fixtures/results";
/** The ARMED message: what changed, the acceptance on landing it may make owed, and the re-measure duty otherwise. */
const owed = (change: string): string =>
  `ARMED (${BEAD}): ${change}. If HX shipped a consumer-facing ${REPRESENTATION} conformance corpus, the acceptance on landing is owed: ${ACCEPTANCE} If it did not, re-measure WATCHED and ROWS' today sets against the new release and say so.`;

/** A release reading: its regular-file count and content digest, or why the reader refused it. */
type Reading = { readonly entries: number; readonly digest: string } | { readonly refused: string };
/** What T1 identity reads of one HX-scoped package: its three facets. */
interface Identity {
  /** Every [field, spec] pair of the four dependency fields that names the package, in field order. */
  readonly naming: readonly (readonly [string, string])[];
  /** The strict reading of each pair's vendored tarball, in naming order. */
  readonly tarballs: readonly Reading[];
  /** The reading of the installed copy, node_modules/<name>. */
  readonly installed: Reading;
}
const FACETS = ["naming", "tarballs", "installed"] as const;
type Facet = (typeof FACETS)[number];
/** The measured release's reading (cut #2 measured it at trunk 04123dc; cuts #3 and #4 re-read it, tarball and installed copy). */
const MEASURED: Reading = { entries: 111, digest: "e1364c255d26df631e5be23be971f1041cfcb1075aad27867052fd990b7df9d7" };
const MEASURED_SPEC = "file:vendor/hyperunix-sdk-0.1.0.tgz";
/** Every HX-scoped release Pi vendors, as measured (T1 identity). */
const WATCHED: Readonly<Record<string, Identity>> = {
  [SDK]: { naming: [["dependencies", MEASURED_SPEC]], tarballs: [MEASURED], installed: MEASURED },
};

interface Release {
  /** Every regular file of the release by its archive path (package/...), as bytes. */
  readonly entries: ReadonlyMap<string, Buffer>;
  /** The release manifest's files list (a member that is not a string as its JSON). */
  readonly files: readonly string[];
  /** The release manifest's export subpath names. */
  readonly exports: readonly string[];
  /** Each export subpath's module namespace, as imported. */
  readonly modules: Readonly<Record<string, object>>;
}
/** The installed SDK's three export subpaths as Pi imports them (T0 holds the installed copy to the tarball and the set to the
 * vendored manifest's exports). */
const MODULES: Readonly<Record<string, object>> = { ".": sdkRoot, "./protocol": sdkProtocol, "./raw": sdkRaw };

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> => typeof value === "object" && value !== null && !Array.isArray(value);
const sha256 = (bytes: Buffer | string): string => createHash("sha256").update(bytes).digest("hex");
const same = (left: readonly string[], right: readonly string[]): boolean => JSON.stringify(left) === JSON.stringify(right);
const bytesOf = (pairs: readonly (readonly [string, string])[]): Map<string, Buffer> => new Map(pairs.map(([path, text]) => [path, Buffer.from(text, "utf8")]));
const reason = (error: unknown): string => (error instanceof Error ? error.message : String(error));

/** The release's content identity: sha256 over every entry's path and the sha256 of its bytes, in path order. */
function contentDigest(entries: ReadonlyMap<string, Buffer>): string {
  return sha256(
    [...entries.keys()]
      .sort()
      .map((path) => `${path}\n${sha256(entries.get(path) ?? Buffer.alloc(0))}\n`)
      .join(""),
  );
}
const readingOf = (entries: ReadonlyMap<string, Buffer>): Reading => ({ entries: entries.size, digest: contentDigest(entries) });

const BLOCK = 512;
const ZERO_BLOCK = Buffer.alloc(BLOCK);
/** The ustar magic and version the measured release's headers carry: "ustar", NUL, "00". */
const USTAR = Buffer.from([0x75, 0x73, 0x74, 0x61, 0x72, 0x00, 0x30, 0x30]);
/** The GNU magic and version: "ustar", two spaces, NUL. */
const GNU_MAGIC = Buffer.from([0x75, 0x73, 0x74, 0x61, 0x72, 0x20, 0x20, 0x00]);
/** The offsets of the number fields the strict reader does not otherwise read: mode, uid, gid, mtime, devmajor and devminor. */
const NUMBER_FIELDS = [100, 108, 116, 136, 329, 337] as const;
/** Every rule the strict reader refuses by (gzip is the layer under it). FROZEN SHAPE holds each to a FORMS row. */
const REFUSALS = ["gzip", "checksum", "magic", "typeflag", "linkname", "number", "size", "prefix", "path", "duplicate", "truncated", "trailing"] as const;
type Refusal = (typeof REFUSALS)[number];
type Archive = { readonly entries: Map<string, Buffer>; readonly end: number } | { readonly refused: Refusal; readonly at: number };
/** A header field's text up to its first NUL. */
function fieldText(field: Buffer, encoding: BufferEncoding = "utf8"): string {
  const end = field.indexOf(0);
  return field.subarray(0, end === -1 ? field.length : end).toString(encoding);
}
/** A header field that holds nothing but NULs after its first NUL (node-tar keeps text that follows a NUL and a line feed). */
function nulPadded(field: Buffer): boolean {
  const end = field.indexOf(0);
  return end === -1 || field.subarray(end).every((byte) => byte === 0);
}
/** A ustar number field's value when it holds octal digits then optional spaces (up to its first NUL); otherwise undefined. */
function octalField(field: Buffer): number | undefined {
  const text = fieldText(field, "latin1");
  return /^[0-7]+ *$/.test(text) ? Number.parseInt(text, 8) : undefined;
}
/** The ustar header checksum: the sum of the block's bytes with the checksum field read as eight spaces. */
function headerSum(header: Buffer): number {
  let sum = 0;
  for (let index = 0; index < BLOCK; index++) sum += index >= 148 && index < 156 ? 0x20 : header[index];
  return sum;
}
/** A checksum field node-tar reads as the strict reader does: a NUL or a space ends it inside its eight bytes (node-tar reads
 * twelve bytes from it, so eight unended digits run on into the typeflag). */
const endedChecksum = (field: Buffer): boolean => field.some((byte) => byte === 0 || byte === 0x20);
/** A path of package/ followed by non-empty segments other than . and .. */
function cleanPath(path: string): boolean {
  const segments = path.split("/");
  return segments.length > 1 && segments[0] === "package" && segments.every((segment) => segment !== "" && segment !== "." && segment !== "..");
}
/** The strict reader: a raw archive's regular files by path, read only in the measured release's form (CLAIMS, T1 identity's
 * tarballs facet); any other archive is refused, naming the first rule it breaks and the offset of the block that breaks it. */
function strictRead(raw: Buffer): Archive {
  const entries = new Map<string, Buffer>();
  let offset = 0;
  while (offset + BLOCK <= raw.length) {
    const header = raw.subarray(offset, offset + BLOCK);
    if (header.equals(ZERO_BLOCK)) break;
    const refused = (rule: Refusal): Archive => ({ refused: rule, at: offset });
    const checksum = header.subarray(148, 156);
    if (!endedChecksum(checksum) || octalField(checksum) !== headerSum(header)) return refused("checksum");
    if (!header.subarray(257, 265).equals(USTAR)) return refused("magic");
    if (header[156] !== 0x30) return refused("typeflag");
    if (header.subarray(157, 257).some((byte) => byte !== 0)) return refused("linkname");
    if (NUMBER_FIELDS.some((start) => header[start] >= 0x80)) return refused("number");
    const size = octalField(header.subarray(124, 136));
    if (size === undefined) return refused("size");
    if (header.subarray(345, 500).some((byte) => byte !== 0)) return refused("prefix");
    const name = header.subarray(0, 100);
    const path = fieldText(name);
    if (!cleanPath(path) || !nulPadded(name)) return refused("path");
    if (entries.has(path)) return refused("duplicate");
    if (offset + BLOCK + size > raw.length) return refused("truncated");
    entries.set(path, raw.subarray(offset + BLOCK, offset + BLOCK + size));
    offset += BLOCK + Math.ceil(size / BLOCK) * BLOCK;
  }
  const end = Math.min(offset, raw.length);
  return raw.subarray(end).some((byte) => byte !== 0) ? { refused: "trailing", at: end } : { entries, end };
}
/** A gzipped archive as the tarballs facet reads it: the strict reading of what Node's gunzip yields. */
function archiveReading(gzipped: Buffer): Reading {
  let raw: Buffer;
  try {
    raw = gunzipSync(gzipped);
  } catch (error) {
    return { refused: `gzip: ${reason(error)}` };
  }
  const archive = strictRead(raw);
  return "refused" in archive ? { refused: `${archive.refused} at byte ${archive.at}` } : readingOf(archive.entries);
}
const tarballReadings = new Map<string, Reading>();
/** T1 identity's tarballs facet for one spec: the strict reading of its vendored file: tarball (read once per path). */
function tarballReading(spec: string): Reading {
  if (!spec.startsWith("file:")) return { refused: `spec: ${spec} names no vendored file` };
  const tarball = spec.slice("file:".length);
  const cached = tarballReadings.get(tarball);
  if (cached !== undefined) return cached;
  let bytes: Buffer;
  try {
    bytes = readFileSync(join(REPO, tarball));
  } catch (error) {
    return { refused: `unreadable: ${reason(error)}` };
  }
  const reading = archiveReading(bytes);
  tarballReadings.set(tarball, reading);
  return reading;
}

type Kind = "directory" | "file" | "other";
/** A tree as the installed walk reads one: a path's own kind (links are not followed), a directory's entries, a file's bytes. */
interface Tree {
  readonly kind: (path: string) => Kind;
  readonly list: (dir: string) => readonly (readonly [string, Kind])[];
  readonly read: (file: string) => Buffer;
}
const kindOf = (entry: { isDirectory(): boolean; isFile(): boolean }): Kind => (entry.isDirectory() ? "directory" : entry.isFile() ? "file" : "other");
const DISK: Tree = {
  kind: (path) => kindOf(lstatSync(path)),
  list: (dir) => readdirSync(dir, { withFileTypes: true }).map((entry): readonly [string, Kind] => [entry.name, kindOf(entry)]),
  read: (file) => readFileSync(file),
};
const installedRoot = (name: string): string => join(REPO, "node_modules", ...name.split("/"));
/** An installed copy's regular files by archive path (package/...), walked through its directories; a root that is not a
 * directory, or an entry of any other kind, is thrown. */
function walkCopy(root: string, tree: Tree): Map<string, Buffer> {
  if (tree.kind(root) !== "directory") throw new Error(`${root} is not a directory`);
  const files = new Map<string, Buffer>();
  const visit = (dir: string): void => {
    for (const [name, kind] of tree.list(dir)) {
      const path = join(dir, name);
      if (kind === "directory") visit(path);
      else if (kind === "file") files.set(`${PACKAGE_DIR}${relative(root, path)}`, tree.read(path));
      else throw new Error(`${relative(root, path)} is neither a regular file nor a directory`);
    }
  };
  visit(root);
  return files;
}
const diskReadings = new Map<string, Reading>();
/** T1 identity's installed facet: the reading of the installed copy, or why the walk refused it (the disk is walked once per
 * package and run). */
function installedReading(name: string, tree: Tree): Reading {
  const cached = tree === DISK ? diskReadings.get(name) : undefined;
  if (cached !== undefined) return cached;
  let reading: Reading;
  try {
    reading = readingOf(walkCopy(installedRoot(name), tree));
  } catch (error) {
    reading = { refused: `walk: ${reason(error)}` };
  }
  if (tree === DISK) diskReadings.set(name, reading);
  return reading;
}

/** The manifest's files list (a member that is not a string as its JSON) and export subpath names; a missing or malformed field
 * reads as none. */
function manifestOf(bytes: Buffer | undefined): { files: string[]; exports: string[] } {
  if (bytes === undefined) throw new Error(`the release ships no ${PACKAGE_DIR}package.json`);
  const parsed: unknown = JSON.parse(bytes.toString("utf8"));
  if (!isRecord(parsed)) throw new Error("the release manifest is not an object");
  const files = parsed.files;
  const exported = parsed.exports;
  return {
    files: Array.isArray(files) ? files.map((item: unknown) => (typeof item === "string" ? item : JSON.stringify(item))) : [],
    exports: isRecord(exported) ? Object.keys(exported) : [],
  };
}
function releaseOf(entries: ReadonlyMap<string, Buffer>, modules: Readonly<Record<string, object>>): Release {
  return { entries, modules, ...manifestOf(entries.get(`${PACKAGE_DIR}package.json`)) };
}
function packageManifest(): unknown {
  return JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
}
/** The HX-scoped package names a manifest depends on, across its four dependency fields, sorted and unique. */
function hxPackages(manifest: unknown): string[] {
  const names = DEPENDENCY_FIELDS.flatMap((field) => {
    const specs = isRecord(manifest) ? manifest[field] : undefined;
    return isRecord(specs) ? Object.keys(specs) : [];
  });
  return [...new Set(names.filter((name) => name.startsWith(HX_SCOPE)))].sort();
}
/** T1 identity's naming facet: every [field, spec] pair of the four dependency fields that names the package, in field order (a
 * spec that is not a string reads as its JSON). */
function namings(manifest: unknown, name: string): (readonly [string, string])[] {
  return DEPENDENCY_FIELDS.flatMap((field): (readonly [string, string])[] => {
    const specs = isRecord(manifest) ? manifest[field] : undefined;
    const spec = isRecord(specs) ? specs[name] : undefined;
    return spec === undefined ? [] : [[field, typeof spec === "string" ? spec : JSON.stringify(spec)]];
  });
}
/** What T1 identity reads of a package: its naming, each named tarball's strict reading and its installed copy's reading (the
 * FORMS rows substitute one input: the manifest, the tarball reader or the tree). */
function identityOf(manifest: unknown, name: string, tree: Tree, tarball: (spec: string) => Reading = tarballReading): Identity {
  const naming = namings(manifest, name);
  return { naming, tarballs: naming.map(([, spec]) => tarball(spec)), installed: installedReading(name, tree) };
}
/** The tarball the classification readings read: the file: spec of the one dependency field that names the SDK. */
function vendoredTarball(): string {
  const naming = namings(packageManifest(), SDK);
  if (naming.length !== 1) throw new Error(`package.json names ${SDK} in ${naming.length} dependency fields; the classification readings read exactly one`);
  const spec = naming[0][1];
  if (!spec.startsWith("file:")) throw new Error(`package.json resolves ${SDK} from no vendored file (${spec})`);
  return spec.slice("file:".length);
}
const releases = new Map<string, Release>();
/** The vendored @hyperunix/sdk the classification readings read: the strict reading of its one tarball, with the installed
 * export subpaths; a refused archive is thrown. */
function vendoredRelease(): Release {
  const tarball = vendoredTarball();
  const cached = releases.get(tarball);
  if (cached !== undefined) return cached;
  const archive = strictRead(gunzipSync(readFileSync(join(REPO, tarball))));
  if ("refused" in archive) throw new Error(`the strict reader refuses ${tarball}: ${archive.refused} at byte ${archive.at}`);
  const release = releaseOf(archive.entries, MODULES);
  releases.set(tarball, release);
  return release;
}
/** Every path on either side that the other lacks or holds with other bytes. */
function differingEntries(installed: ReadonlyMap<string, Buffer>, release: ReadonlyMap<string, Buffer>): string[] {
  const paths = new Set([...installed.keys(), ...release.keys()]);
  return [...paths]
    .filter((path) => {
      const mine = installed.get(path);
      const theirs = release.get(path);
      return mine === undefined || theirs === undefined || !mine.equals(theirs);
    })
    .sort();
}

/** A data property's value, or nothing for an accessor (never invoked) or an absent key. */
function dataValue(holder: object, key: string): readonly unknown[] {
  const property = Object.getOwnPropertyDescriptor(holder, key);
  return property !== undefined && "value" in property ? [property.value] : [];
}
/** A value that is neither an object nor a function (String() of it runs no code a release defines). */
const isPrimitive = (value: unknown): boolean => value === null || (typeof value !== "object" && typeof value !== "function");
/** Every path from a value to a string that spells the representation (CLAIMS, the drift row's walk): a string carries it when
 * it includes it; an object's or an array's own enumerable string-keyed data properties are walked; a Map's keys (as <key N>)
 * and values are read through Map.prototype.entries and a Set's members through Set.prototype.values, as the realm holds them
 * when the walk runs (never the value's own iterator or methods), and the Map's or Set's own enumerable data properties are
 * walked too. A Map value is labeled by its key when the key is a primitive, else <value N>. An accessor is never invoked, a
 * function (a class included) is never entered or called, and a Proxy is thrown before any trap could run. */
function carriers(value: unknown, path: string, seen: Set<object>): string[] {
  if (typeof value === "string") return value.includes(REPRESENTATION) ? [path] : [];
  if (typeof value !== "object" || value === null || seen.has(value)) return [];
  if (types.isProxy(value)) throw new Error(`${path} is a Proxy, which the walk does not read`);
  seen.add(value);
  const members: (readonly [string, unknown])[] = [];
  if (types.isMap(value)) {
    const entries: (readonly [unknown, unknown])[] = [...Map.prototype.entries.call(value)];
    for (const [index, [key, member]] of entries.entries()) members.push([`<key ${index}>`, key], [isPrimitive(key) ? String(key) : `<value ${index}>`, member]);
  } else if (types.isSet(value)) {
    const items: unknown[] = [...Set.prototype.values.call(value)];
    for (const [index, member] of items.entries()) members.push([String(index), member]);
  }
  for (const key of Object.keys(value)) for (const member of dataValue(value, key)) members.push([key, member]);
  return members.flatMap(([key, member]) => carriers(member, `${path}.${key}`, seen));
}
/** Every exported binding path (subpath:name, then .key per step) that reaches a string spelling the representation. */
function exportedCarriers(modules: Readonly<Record<string, object>>): string[] {
  return Object.entries(modules)
    .flatMap(([subpath, namespace]) => Object.keys(namespace).flatMap((name) => dataValue(namespace, name).flatMap((value) => carriers(value, `${subpath}:${name}`, new Set()))))
    .sort();
}

/** A release entry of a kind the package ships today: a compiled module, its declaration, or either one's source map. */
const CODE = /^package\/dist\/.+\.(?:js|d\.ts|js\.map|d\.ts\.map)$/;
const PACKAGE_FILES: readonly string[] = ["package/LICENSE", "package/README.md", "package/package.json"];
/** The words a corpus directory or file would carry in its path, any case. */
const CORPUS_WORD = /conformance|corpus|fixture/i;

type ReadingId = "data-entries" | "corpus-paths" | "representation-entries" | "exported-representations" | "exports" | "files";
type Reader = (release: Release) => string[];
/** Every reading T1 judges, by id; FROZEN SHAPE holds each to exactly one pin of ROWS. */
const READINGS: Readonly<Record<ReadingId, Reader>> = {
  "data-entries": (release) => [...release.entries.keys()].filter((path) => !CODE.test(path) && !PACKAGE_FILES.includes(path)).sort(),
  "corpus-paths": (release) => [...release.entries.keys()].filter((path) => CORPUS_WORD.test(path)).sort(),
  "representation-entries": (release) =>
    [...release.entries]
      .filter(([, bytes]) => bytes.includes(REPRESENTATION))
      .map(([path]) => path)
      .sort(),
  "exported-representations": (release) => exportedCarriers(release.modules),
  exports: (release) => [...release.exports].sort(),
  files: (release) => [...release.files].sort(),
};
/** A classification reading of the vendored release, or the reason the census cannot read that release in the measured form. */
function classified(reading: ReadingId): string[] {
  try {
    return READINGS[reading](vendoredRelease());
  } catch (error) {
    return [`unread: ${reason(error)}`];
  }
}

interface Pin {
  readonly reading: ReadingId;
  /** The vendored release's reading today (measured; T1 holds it to the release). */
  readonly today: readonly string[];
}
interface Row {
  readonly id: string;
  /** One clause of the acceptance on landing, verbatim (A1 holds the clause list to the export). */
  readonly clause: string;
  /** The readings that show the clause's subject absent from the vendored release today, in the forms they read. */
  readonly pins: readonly Pin[];
}
const ROWS: readonly Row[] = [
  {
    id: "provenance",
    clause: "fixture provenance lines cite corpus entry id + sha",
    pins: [
      { reading: "data-entries", today: [] },
      { reading: "corpus-paths", today: [] },
    ],
  },
  {
    id: "drift",
    clause: "a drift test fails when a vendored corpus entry and the Pi fixture derived from it disagree",
    pins: [
      { reading: "representation-entries", today: ["package/dist/result.d.ts", "package/dist/result.js"] },
      { reading: "exported-representations", today: [".:SDK_REPRESENTATION"] },
    ],
  },
  {
    id: "second-entry",
    clause: "a second corpus entry (not just today's shape) round-trips through the adapter, proving the fixture set is not hard-coded to one shape.",
    pins: [
      { reading: "exports", today: [".", "./protocol", "./raw"] },
      { reading: "files", today: ["LICENSE", "README.md", "dist"] },
    ],
  },
];
const PINS = ROWS.flatMap((row) => row.pins.map((pin) => ({ row: row.id, reading: pin.reading, today: pin.today })));
const pinId = (pin: { readonly row: string; readonly reading: ReadingId }): string => `${pin.row}/${pin.reading}`;

/** A corpus document as a release could export it: an entry id, its sha and a result document. */
const PLANTED_DOCUMENT = { id: "find-incomplete", sha256: "0".repeat(64), document: { representation: REPRESENTATION, operation: "find" } };
/** A Map whose own iterator yields nothing and whose own entries method throws: only Map.prototype.entries reads its entries. */
class SilentMap extends Map<string, unknown> {
  override [Symbol.iterator](): MapIterator<[string, unknown]> {
    return new Map<string, unknown>().entries();
  }
  override entries(): MapIterator<[string, unknown]> {
    throw new Error("the walk called a Map's own entries method");
  }
}
/** A value whose one property is an accessor that throws when invoked. */
const ACCESSOR_TRAP = Object.defineProperty({}, "cases", {
  enumerable: true,
  get: (): never => {
    throw new Error("the walk invoked an accessor");
  },
});
/** A Map key carrying a document, whose toString throws when called. */
const KEY_TRAP = {
  representation: REPRESENTATION,
  toString: (): never => {
    throw new Error("the walk called a Map key's toString");
  },
};
/** A release that ships a corpus each reading must see: a corpus directory, a module, a data file, a declaration and exports. */
const PLANTED_ENTRIES: readonly (readonly [string, string])[] = [
  [
    "package/package.json",
    JSON.stringify({
      name: SDK,
      files: ["dist", "README.md", "LICENSE", "conformance", { conformance: "conformance" }],
      exports: { ".": "./dist/index.js", "./raw": "./dist/transport/cli.js", "./protocol": "./dist/protocol.js", "./conformance": "./conformance/index.json" },
    }),
  ],
  ["package/dist/result.js", `export const SDK_REPRESENTATION = "${REPRESENTATION}";`],
  ["package/dist/result.d.ts", `export declare const SDK_REPRESENTATION = "${REPRESENTATION}";`],
  ["package/conformance/find-incomplete.json", JSON.stringify({ representation: REPRESENTATION, operation: "find" })],
  ["package/dist/Corpus/entries.js", `export default [{ representation: "${REPRESENTATION}" }];`],
  ["package/dist/results.jsonl", `${JSON.stringify({ representation: REPRESENTATION })}\n`],
  ["package/dist/fixture-names.d.ts", "export declare const NAMES: readonly string[];"],
];
/** The planted release's export subpaths: documents exported in an array, a Map's values, a Map's keys, a Set, a Map's and a
 * Set's own property, a String wrapper object's own property (beside its index characters) and a Map whose own iteration hides
 * its entries, beside an accessor and methods that throw if called. */
const PLANTED_MODULES: Readonly<Record<string, object>> = {
  ".": {
    SDK_REPRESENTATION: REPRESENTATION,
    RESULT_CASES: [PLANTED_DOCUMENT],
    BOXED_CASES: Object.assign(new String("find-incomplete"), { cases: [PLANTED_DOCUMENT] }),
    TRAPPED: ACCESSOR_TRAP,
  },
  "./conformance": {
    default: new Map([["find-complete-empty", { representation: REPRESENTATION }]]),
    INDEX: new Map([[KEY_TRAP, "find-incomplete"]]),
    BY_REPRESENTATION: new Map([[REPRESENTATION, 2]]),
    CASES_INDEX: Object.assign(new Map<string, number>(), { cases: [PLANTED_DOCUMENT] }),
    SILENT: new SilentMap([["find-incomplete", PLANTED_DOCUMENT]]),
  },
  "./protocol": { MODES: new Set(["observation", REPRESENTATION]), MODE_CASES: Object.assign(new Set<string>(), { cases: [PLANTED_DOCUMENT] }) },
};
/** What each reading finds in the planted release. */
const PLANTED_READINGS: Readonly<Record<ReadingId, readonly string[]>> = {
  "data-entries": ["package/conformance/find-incomplete.json", "package/dist/results.jsonl"],
  "corpus-paths": ["package/conformance/find-incomplete.json", "package/dist/Corpus/entries.js", "package/dist/fixture-names.d.ts"],
  "representation-entries": [
    "package/conformance/find-incomplete.json",
    "package/dist/Corpus/entries.js",
    "package/dist/result.d.ts",
    "package/dist/result.js",
    "package/dist/results.jsonl",
  ],
  "exported-representations": [
    "./conformance:BY_REPRESENTATION.<key 0>",
    "./conformance:CASES_INDEX.cases.0.document.representation",
    "./conformance:INDEX.<key 0>.representation",
    "./conformance:SILENT.find-incomplete.document.representation",
    "./conformance:default.find-complete-empty.representation",
    "./protocol:MODES.1",
    "./protocol:MODE_CASES.cases.0.document.representation",
    ".:BOXED_CASES.cases.0.document.representation",
    ".:RESULT_CASES.0.document.representation",
    ".:SDK_REPRESENTATION",
  ],
  exports: [".", "./conformance", "./protocol", "./raw"],
  files: ["LICENSE", "README.md", "conformance", "dist", '{"conformance":"conformance"}'],
};

/** Every row of an export text whose id is the bead's: each non-blank line parsed as JSON, the rows counted by id before any
 * other field is read. */
function beadRows(text: string): unknown[] {
  return text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line): unknown => JSON.parse(line))
    .filter((row) => isRecord(row) && row.id === BEAD);
}
/** The row reader's controls: an export text and how many rows with the bead's id it holds, whatever fields they carry. */
const ROW_CONTROLS: readonly (readonly [string, number])[] = [
  [`{"id":"${BEAD}","title":"t","description":"d"}`, 1],
  [`{"id":"${BEAD}","title":"t","description":"d"}\n{"id":"${BEAD}","title":"t2","status":"open"}`, 2],
  [`{"id":"${BEAD}","title":"t","description":"d"}\n{"id":"${BEAD}"}`, 2],
  [`{"id":"${BEAD}","title":"t","description":"d"}\n{"id":"${BEAD}","title":["t"],"description":7}`, 2],
  [`{"id":"${BEAD}","title":"t","description":"d"}\n\n{"id":"wb-other","title":"t","description":"d"}\n`, 1],
  [`["${BEAD}"]\n{"id":"${BEAD}","title":"t","description":"d"}\n{"id":"${BEAD} "}`, 1],
];
/** A1's reading of an export text: how many rows carry the bead's id (counted before any field is read) and, when exactly one
 * does, that row's title and description, as JSON.parse decodes them (member names case-sensitive; R-DECODER). */
function rowFields(text: string): { readonly rows: number; readonly title: unknown; readonly description: unknown } {
  const mine = beadRows(text);
  const row = mine.length === 1 ? mine[0] : undefined;
  return { rows: mine.length, title: isRecord(row) ? row.title : undefined, description: isRecord(row) ? row.description : undefined };
}
/** The bead's own export row: the rows whose id is the bead's counted before any field is read (exactly one), then that row's
 * title and description, which must be strings (later store writes change neither). */
function exportRow(): { title: string; description: string } {
  const { rows, title, description } = rowFields(readFileSync(join(REPO, EXPORT), "utf8"));
  expect(rows, "the export holds exactly one row whose id is the bead's (counted by id, before any field is read)").toBe(1);
  if (typeof title !== "string" || typeof description !== "string") throw new Error(`the export row of ${BEAD} carries no string title and description`);
  return { title, description };
}
/** What A1 reads of an export text, in one line: how many rows carry the bead's id, then the one row's title against the
 * statement and its description against the measured digest (the R-DECODER quiet row reads its plants through it). */
function rowReading(text: string): string {
  const { rows, title, description } = rowFields(text);
  if (rows !== 1) return `${rows} rows`;
  const titled = title === `${TITLE_ID} ${STATEMENT}` ? "the statement" : "another title";
  const described = typeof description === "string" && sha256(description) === DESCRIPTION_SHA256 ? "the measured description" : "another description";
  return `1 row: ${titled}, ${described}`;
}
/** A Python list item as the export's ACCEPTANCE list spells it: double quotes exactly when the text holds a single quote. */
function listItem(text: string): string {
  return text.includes("'") && !text.includes('"') ? `"${text}"` : `'${text}'`;
}
/** Every line boundary the field reader cuts at, by name: CR LF (one boundary, so it cuts once), LF, CR, VT, FF, FS, GS, RS,
 * NEL, LS and PS, the union of ECMAScript's line terminators, Unicode's mandatory breaks and Python's splitlines. FROZEN SHAPE
 * pins the names and code points. */
const LINE_BOUNDARIES: readonly (readonly [string, string])[] = [
  ["CR LF", String.fromCodePoint(0x0d, 0x0a)],
  ["LF", String.fromCodePoint(0x0a)],
  ["CR", String.fromCodePoint(0x0d)],
  ["VT", String.fromCodePoint(0x0b)],
  ["FF", String.fromCodePoint(0x0c)],
  ["FS", String.fromCodePoint(0x1c)],
  ["GS", String.fromCodePoint(0x1d)],
  ["RS", String.fromCodePoint(0x1e)],
  ["NEL", String.fromCodePoint(0x85)],
  ["LS", String.fromCodePoint(0x2028)],
  ["PS", String.fromCodePoint(0x2029)],
];
const codePoints = (text: string): number[] => [...text].map((char) => char.codePointAt(0) ?? -1);
/** A regex alternation of the boundaries, in LINE_BOUNDARIES' order (CR LF before CR), each spelled by its code points. */
const boundaryPattern = (boundaries: readonly (readonly [string, string])[]): RegExp =>
  new RegExp(boundaries.map(([, chars]) => codePoints(chars).map((code) => `\\u{${code.toString(16)}}`).join("")).join("|"), "u");
const BOUNDARY = boundaryPattern(LINE_BOUNDARIES);
/** Every line of the text that opens the field (after any run of whitespace, the field word in any ASCII letter case, then any
 * whitespace and a colon), whole: the text is cut at every LINE_BOUNDARIES boundary, so a second line after any of them, or a
 * second value on the one line, changes the reading. */
function fieldLines(description: string, field: string): string[] {
  const opens = new RegExp(`^\\s*${field}\\s*:`, "i");
  return description.split(BOUNDARY).filter((line) => opens.test(line));
}
/** The field reader's controls: a description, the field read, and the lines the reader returns. */
const FIELD_CONTROLS: readonly (readonly [string, string, readonly string[]])[] = [
  ["PROGRAM: p\nACCEPTANCE: ['a']\nSURFACES: s:1-2@x", "ACCEPTANCE", ["ACCEPTANCE: ['a']"]],
  ["ACCEPTANCE: ['a']\n\nACCEPTANCE: ['b']", "ACCEPTANCE", ["ACCEPTANCE: ['a']", "ACCEPTANCE: ['b']"]],
  ["ACCEPTANCE: ['a', 'b']", "ACCEPTANCE", ["ACCEPTANCE: ['a', 'b']"]],
  ["  acceptance :['a']\nRELATED: ACCEPTANCE: ['b']", "ACCEPTANCE", ["  acceptance :['a']"]],
  ["PROGRAM: p\nSURFACES: s:1-2@x\nRELATED: r", "SURFACES", ["SURFACES: s:1-2@x"]],
  ["SURFACES: s:1-2@x\n\nSURFACES: t:3-4@x", "SURFACES", ["SURFACES: s:1-2@x", "SURFACES: t:3-4@x"]],
  ["SURFACES: s:1-2@x, t:3-4@x", "SURFACES", ["SURFACES: s:1-2@x, t:3-4@x"]],
  ["\tSurfaces: s\nSURFACE: t\nRELATED (SURFACES: u)", "SURFACES", ["\tSurfaces: s"]],
];
/** One control per boundary and field: a field line, the boundary, then a second line of the field (the reader returns both). */
const BOUNDARY_CONTROLS = LINE_BOUNDARIES.flatMap(([name, chars]) =>
  ["ACCEPTANCE", "SURFACES"].map((field) => ({ name, field, text: `RELATED: r${chars}${field}: a${chars}${field}: b`, lines: [`${field}: a`, `${field}: b`] })),
);
let engineLineTerminators: string[] | undefined;
/** The code points JavaScript's own multiline regex reads a line start after (the engine: an anchor outside this file's literals). */
function engineTerminators(): string[] {
  engineLineTerminators ??= Array.from({ length: 0x10000 }, (_, code) => String.fromCharCode(code)).filter((char) => /^b/m.test(`a${char}b`));
  return engineLineTerminators;
}
/** The names of the members A1 reads from an export row: the id its rows are counted by, the title and the description. */
const READ_MEMBERS = ["id", "title", "description"] as const;
type ReadMember = (typeof READ_MEMBERS)[number];
let engineFoldClasses: Readonly<Record<string, string>> | undefined;
/** For each letter of READ_MEMBERS' names, every code point the engine's case-insensitive Unicode match reads as that letter,
 * scanned over every code point: Unicode simple case folding (the engine: an anchor outside this file's literals; R-DECODER). */
function engineFolds(): Readonly<Record<string, string>> {
  if (engineFoldClasses !== undefined) return engineFoldClasses;
  const letters = [...new Set(READ_MEMBERS.join(""))].sort();
  const anyLetter = new RegExp(`^[${letters.join("")}]$`, "iu");
  const classes: Record<string, string> = Object.fromEntries(letters.map((letter) => [letter, ""]));
  for (let code = 0; code <= 0x10ffff; code++) {
    const char = String.fromCodePoint(code);
    if (anyLetter.test(char)) for (const letter of letters) if (new RegExp(`^${letter}$`, "iu").test(char)) classes[letter] += char;
  }
  engineFoldClasses = classes;
  return classes;
}
/** Every spelling of a member name whose code points each fold to the name's letter (engineFolds), the name itself included. */
function spellings(name: string): string[] {
  return [...name].reduce<string[]>((prefixes, letter) => prefixes.flatMap((prefix) => [...engineFolds()[letter]].map((char) => `${prefix}${char}`)), [""]);
}
/** The engine's line terminators a boundary set does not hold as a boundary of its own. */
const engineMisses = (boundaries: readonly (readonly [string, string])[]): string[] =>
  engineTerminators().filter((char) => !boundaries.some(([, chars]) => chars === char));
/** The clauses of the export's ACCEPTANCE item, cut at "; " after "On landing: "; none unless the description holds exactly one
 * ACCEPTANCE line and that line is one list item. */
function exportedClauses(description: string): string[] {
  const lines = fieldLines(description, "ACCEPTANCE");
  if (lines.length !== 1) return [];
  const item = /^ACCEPTANCE: \[(["'])(.*)\1\]$/.exec(lines[0])?.[2];
  if (item === undefined || !item.startsWith(ON_LANDING)) return [];
  return item.slice(ON_LANDING.length).split("; ");
}
/** What A1's clause anchor reads of a row set: its clauses, in order. */
const anchorReading = (rows: readonly Row[]): string[] => rows.map((row) => row.clause);

/** A property's name: an identifier, a string key or a computed string key. */
function propertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name)) return name.text;
  return ts.isComputedPropertyName(name) && ts.isStringLiteralLike(name.expression) ? name.expression.text : undefined;
}
/** An expression with its parentheses, as, satisfies, type assertions and non-null marks taken off. */
function unwrapped(expression: ts.Expression): ts.Expression {
  return ts.isParenthesizedExpression(expression) ||
    ts.isAsExpression(expression) ||
    ts.isSatisfiesExpression(expression) ||
    ts.isTypeAssertionExpression(expression) ||
    ts.isNonNullExpression(expression)
    ? unwrapped(expression.expression)
    : expression;
}
/** The line of every object-literal property named representation whose initializer is a string literal (or a template without
 * substitutions) spelling the representation, read from the TypeScript AST (comments, other strings and quote style aside). */
function literalRepresentations(text: string): number[] {
  const source = ts.createSourceFile("surface.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const lines: number[] = [];
  const visit = (node: ts.Node): void => {
    const initializer = ts.isPropertyAssignment(node) ? unwrapped(node.initializer) : undefined;
    if (ts.isPropertyAssignment(node) && propertyName(node.name) === "representation" && initializer !== undefined && ts.isStringLiteralLike(initializer) && initializer.text === REPRESENTATION)
      lines.push(source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return lines;
}
/** A1's surface controls: a source text and how many sites the surface reading must find in it. */
const SURFACE_CONTROLS: readonly (readonly [string, number])[] = [
  ["const a = {representation: 'hyperunix.result/1', operation: 'find'};", 1],
  ['const a = {representation: "hyperunix.result/1"};', 1],
  ["const a = {'representation': `hyperunix.result/1`, nested: {representation: 'hyperunix.result/1'}};", 2],
  ["const a = {representation: 'hyperunix.result/1' as const, b: {representation: ('hyperunix.result/1')}, c: {['representation']: 'hyperunix.result/1'}};", 3],
  ["const a = {representation: 'hyperunix.result/1' satisfies string, b: {representation: <const>'hyperunix.result/1'}};", 2],
  ["// {representation: 'hyperunix.result/1'}\n/* {representation: 'hyperunix.result/1'} */", 0],
  ["const s = \"{representation: 'hyperunix.result/1'}\";", 0],
  ["const a = {representation: 'hyperunix.result/2'};", 0],
  ["const a = {kind: 'hyperunix.result/1'};", 0],
  ["const a = {representation: SDK_REPRESENTATION};", 0],
  // A template with a substitution, spelled in two literals so no single one carries a placeholder.
  ["const a = {representation: 'hyperunix.result/' + '1', b: {representation: `hyperunix.result/$" + "{1}`}};", 0],
  ["type T = {representation: 'hyperunix.result/1'};", 0],
];
/** The module specifiers of this file's import declarations that name the @hyperunix/ scope, in order (TypeScript AST). */
function scopedImports(): string[] {
  const source = ts.createSourceFile("census.ts", readFileSync(SELF, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  return source.statements
    .filter(ts.isImportDeclaration)
    .map((statement) => (ts.isStringLiteral(statement.moduleSpecifier) ? statement.moduleSpecifier.text : ""))
    .filter((specifier) => specifier.startsWith(HX_SCOPE));
}

/** A copy of a header with its checksum recomputed, written as six octal digits, a NUL and a space. */
function sealed(header: Buffer): Buffer {
  const copy = Buffer.from(header);
  copy.write(headerSum(copy).toString(8).padStart(6, "0"), 148, "latin1");
  copy[154] = 0;
  copy[155] = 0x20;
  return copy;
}
/** A copy of a header with its checksum written after a space: a space, six octal digits and a NUL (node-tar trims the space). */
function spaceSealed(header: Buffer): Buffer {
  const copy = Buffer.from(header);
  copy.write(` ${headerSum(copy).toString(8).padStart(6, "0")}`, 148, "latin1");
  copy[155] = 0;
  return copy;
}
/** A copy of a header with its checksum written as eight octal digits and nothing to end them. */
function unendedSealed(header: Buffer): Buffer {
  const copy = Buffer.from(header);
  copy.write(headerSum(copy).toString(8).padStart(8, "0"), 148, "latin1");
  return copy;
}
/** A ustar header as a packer writes one: the name, mode 644, the size and typeflag, magic ustar 00 and a valid checksum. */
function ustarHeader(name: string, size: number, typeflag = 0x30): Buffer {
  const header = Buffer.alloc(BLOCK);
  header.write(name, 0, "utf8");
  header.write("0000644", 100, "latin1");
  header.write("0000000", 108, "latin1");
  header.write("0000000", 116, "latin1");
  header.write(size.toString(8).padStart(11, "0"), 124, "latin1");
  header.write("00000000000", 136, "latin1");
  header[156] = typeflag;
  USTAR.copy(header, 257);
  return sealed(header);
}
const padded = (data: Buffer): Buffer => Buffer.concat([data, Buffer.alloc((BLOCK - (data.length % BLOCK)) % BLOCK)]);
const entryBlocks = (name: string, data: Buffer, typeflag = 0x30): Buffer => Buffer.concat([ustarHeader(name, data.length, typeflag), padded(data)]);
/** A pax extended header (typeflag x local, g global) carrying one record, as the gate's G-PAX plant writes one. */
function paxBlocks(typeflag: number, key: string, value: string): Buffer {
  const record = (length: number): string => `${length} ${key}=${value}\n`;
  let length = record(0).length;
  while (record(length).length !== length) length = record(length).length;
  return entryBlocks("PaxHeader/x", Buffer.from(record(length)), typeflag);
}
const END_BLOCKS = Buffer.alloc(2 * BLOCK);
/** A corpus document as a re-vendor could ship it, at a corpus path (the gate's plant shape). */
const CORPUS_ENTRY = "package/conformance/find-incomplete.json";
const CORPUS_DOCUMENT = Buffer.from(JSON.stringify({ id: "hx-find-001", sha256: "f".repeat(64), document: { representation: REPRESENTATION, operation: "find" } }));
const GATE_SPEC = "file:vendor/hyperunix-sdk-0.1.0-gate.tgz";
/** An entry's header and data with one header edit applied after sealing (unsealed) or before it (sealed again). */
function editedEntry(edit: (header: Buffer) => void, reseal: boolean, name = CORPUS_ENTRY, data: Buffer = CORPUS_DOCUMENT): Buffer {
  const header = ustarHeader(name, data.length);
  edit(header);
  return Buffer.concat([reseal ? sealed(header) : header, padded(data)]);
}

let measuredBody: Buffer | undefined;
/** The measured release's entry blocks (its raw archive without the end-of-archive bytes). */
function body(): Buffer {
  if (measuredBody !== undefined) return measuredBody;
  const raw = gunzipSync(readFileSync(join(REPO, MEASURED_SPEC.slice("file:".length))));
  const archive = strictRead(raw);
  if ("refused" in archive) throw new Error(`the measured release no longer reads: ${archive.refused} at byte ${archive.at}`);
  measuredBody = raw.subarray(0, archive.end);
  return measuredBody;
}
/** The measured release's first entry blocks (a small archive base), and that entry's path. */
function first(): Buffer {
  const size = octalField(body().subarray(124, 136)) ?? 0;
  return body().subarray(0, BLOCK + Math.ceil(size / BLOCK) * BLOCK);
}
const firstPath = (): string => fieldText(body().subarray(0, 100));
/** The measured release's entries as [header, data] pairs, in archive order. */
function measuredPairs(): (readonly [Buffer, Buffer])[] {
  const pairs: (readonly [Buffer, Buffer])[] = [];
  for (let offset = 0; offset < body().length; ) {
    const header = body().subarray(offset, offset + BLOCK);
    const size = octalField(header.subarray(124, 136)) ?? 0;
    pairs.push([header, body().subarray(offset + BLOCK, offset + BLOCK + size)]);
    offset += BLOCK + Math.ceil(size / BLOCK) * BLOCK;
  }
  return pairs;
}
/** The measured entries re-packed: each header copied, edited and sealed again (by the given sealer), in the given order. */
function repacked(edit: (header: Buffer) => void, seal: (header: Buffer) => Buffer = sealed, reverse = false): Buffer {
  const pairs = measuredPairs();
  return Buffer.concat(
    (reverse ? pairs.reverse() : pairs).flatMap(([header, data]) => {
      const copy = Buffer.from(header);
      edit(copy);
      return [seal(copy), padded(data)];
    }),
  );
}
/** The header fields the strict reader does not read, rewritten: mode, uid, gid, mtime, uname, gname, devmajor and devminor. */
function unreadFieldsRewritten(header: Buffer): void {
  header.write("0000755", 100, "latin1");
  header.write("0001750", 108, "latin1");
  header.write("0001750", 116, "latin1");
  header.write("14000000000", 136, "latin1");
  header.write("hx", 265, "latin1");
  header.write("hx", 297, "latin1");
  header.write("0000001", 329, "latin1");
  header.write("0000002", 337, "latin1");
}
/** A header's path moved under another top directory (pkg/ in place of package/). */
function underOtherTop(header: Buffer): void {
  const path = fieldText(header.subarray(0, 100));
  header.fill(0, 0, 100);
  header.write(`pkg/${path.slice(PACKAGE_DIR.length)}`, 0, "utf8");
}
let installedNow: Map<string, Buffer> | undefined;
/** The installed copy's files as the walk reads them from disk (read once). */
function installedFiles(): Map<string, Buffer> {
  installedNow ??= walkCopy(installedRoot(SDK), DISK);
  return installedNow;
}
/** An in-memory tree of an installed copy: its files by archive path, extra entries of another kind, and the root's own kind. */
function memoryTree(files: ReadonlyMap<string, Buffer>, others: readonly string[], rootKind: Kind): Tree {
  const root = installedRoot(SDK);
  const kinds = new Map<string, Kind>([[root, rootKind]]);
  const add = (archivePath: string, kind: Kind): void => {
    const path = join(root, archivePath.slice(PACKAGE_DIR.length));
    for (let dir = dirname(path); dir.length > root.length; dir = dirname(dir)) kinds.set(dir, "directory");
    kinds.set(path, kind);
  };
  for (const path of files.keys()) add(path, "file");
  for (const path of others) add(path, "other");
  return {
    kind: (path) => kinds.get(path) ?? "other",
    list: (dir) => [...kinds].filter(([path]) => path !== root && dirname(path) === dir).map(([path, kind]): readonly [string, Kind] => [basename(path), kind]),
    read: (file) => files.get(`${PACKAGE_DIR}${relative(root, file)}`) ?? Buffer.alloc(0),
  };
}
/** T1 identity's reading of the SDK with one input planted, through identityOf: the measured tarball read from given bytes. */
function gzipPlant(gzipped: Buffer): Identity {
  const planted = archiveReading(gzipped);
  return identityOf(packageManifest(), SDK, DISK, (spec) => (spec === MEASURED_SPEC ? planted : tarballReading(spec)));
}
const tarPlant = (raw: Buffer): Identity => gzipPlant(gzipSync(raw));
/** package.json with the SDK's spec set (or removed, for undefined) in the given fields. */
function manifestWith(edits: readonly (readonly [string, string | undefined])[]): Record<string, unknown> {
  const manifest = packageManifest();
  if (!isRecord(manifest)) throw new Error("package.json is not an object");
  const copy: Record<string, unknown> = { ...manifest };
  for (const [field, spec] of edits) {
    const current = copy[field];
    const others = isRecord(current) ? Object.entries(current).filter(([name]) => name !== SDK) : [];
    copy[field] = Object.fromEntries(spec === undefined ? others : [...others, [SDK, spec]]);
  }
  return copy;
}
/** T1 identity's reading of the SDK through identityOf with a planted package.json. */
const namingPlant = (manifest: unknown): Identity => identityOf(manifest, SDK, DISK);
/** T1 identity's reading of the SDK through identityOf with a planted installed tree. */
const installedPlant = (files: ReadonlyMap<string, Buffer>, others: readonly string[] = [], rootKind: Kind = "directory"): Identity =>
  identityOf(packageManifest(), SDK, memoryTree(files, others, rootKind));
const withFile = (files: ReadonlyMap<string, Buffer>, path: string, bytes: Buffer | undefined): Map<string, Buffer> => {
  const copy = new Map(files);
  if (bytes === undefined) copy.delete(path);
  else copy.set(path, bytes);
  return copy;
};

/** A reading as a FORMS row states it: measured, the entry count read, or the rule that refused it. */
function stated(reading: Reading): string {
  if ("refused" in reading) return `refused ${reading.refused.split(/[ :]/)[0]}`;
  return JSON.stringify(reading) === JSON.stringify(MEASURED) ? "measured" : `read ${reading.entries} entries`;
}
/** One planted identity as a FORMS row states it: the facets that differ from WATCHED's (none for a control), then the planted
 * facet's reading (a naming as its fields, * marking a spec text other than the measured one). */
function plantedReading(identity: Identity, facet: Facet): string {
  const watched = WATCHED[SDK];
  const differing = FACETS.filter((name) => JSON.stringify(identity[name]) !== JSON.stringify(watched[name]));
  const reading =
    facet === "naming"
      ? identity.naming.map(([field, spec]) => (spec === MEASURED_SPEC ? field : `${field}*`)).join(" + ")
      : facet === "tarballs"
        ? identity.tarballs.map(stated).join(" + ")
        : stated(identity.installed);
  return `${differing.join("+") || "none"}: ${reading}`;
}
/** One re-vendor form the T1 identity claim names (or a control): the facet whose reader its plants go through, the identities
 * T1 identity would read with each plant in place, and what the row reads (FROZEN SHAPE pins the ids and facets). */
interface Form {
  readonly id: string;
  readonly facet: Facet;
  readonly plants: () => readonly Identity[];
  readonly reads: string;
}
/** A row's reading: its plant count, then each distinct planted reading. */
function formReading(form: Form): string {
  const plants = form.plants();
  return `${plants.length}x ${[...new Set(plants.map((identity) => plantedReading(identity, form.facet)))].join("; ")}`;
}
const OTHER_FIELDS = DEPENDENCY_FIELDS.filter((field) => field !== "dependencies");
const TYPEFLAGS = Array.from({ length: 256 }, (_, byte) => byte).filter((byte) => byte !== 0x30);
const UNCLEAN_PATHS = [
  "pkg/find-incomplete.json",
  "package/../find-incomplete.json",
  "package/./find-incomplete.json",
  "package//find-incomplete.json",
  "/package/find-incomplete.json",
  "package/conformance/",
  "package",
];
const corpusBlocks = (): Buffer => entryBlocks(CORPUS_ENTRY, CORPUS_DOCUMENT);
const FORMS: readonly Form[] = [
  {
    id: "named-again",
    facet: "naming",
    plants: () => OTHER_FIELDS.map((field) => namingPlant(manifestWith([[field, GATE_SPEC]]))),
    reads:
      "3x naming+tarballs: dependencies + devDependencies*; naming+tarballs: dependencies + optionalDependencies*; naming+tarballs: dependencies + peerDependencies*",
  },
  {
    id: "moved-field",
    facet: "naming",
    plants: () => [
      namingPlant(
        manifestWith([
          ["dependencies", undefined],
          ["devDependencies", MEASURED_SPEC],
        ]),
      ),
    ],
    reads: "1x naming: devDependencies",
  },
  {
    id: "respec",
    facet: "naming",
    plants: () => [namingPlant(manifestWith([["dependencies", "file:vendor/hyperunix-sdk-0.2.0.tgz"]])), namingPlant(manifestWith([["dependencies", "0.1.0"]]))],
    reads: "2x naming+tarballs: dependencies*",
  },
  { id: "naming-control", facet: "naming", plants: () => [namingPlant(packageManifest())], reads: "1x none: dependencies" },
  {
    id: "typeflag-7",
    facet: "tarballs",
    plants: () => [tarPlant(Buffer.concat([body(), entryBlocks(CORPUS_ENTRY, CORPUS_DOCUMENT, 0x37), END_BLOCKS]))],
    reads: "1x tarballs: refused typeflag",
  },
  {
    id: "zero-block-padding",
    facet: "tarballs",
    plants: () => [tarPlant(Buffer.concat([body(), ZERO_BLOCK, corpusBlocks(), END_BLOCKS]))],
    reads: "1x tarballs: refused trailing",
  },
  {
    id: "pax-rename",
    facet: "tarballs",
    plants: () => [tarPlant(Buffer.concat([paxBlocks(0x78, "path", CORPUS_ENTRY), entryBlocks("package/README.md", CORPUS_DOCUMENT), body(), END_BLOCKS]))],
    reads: "1x tarballs: refused typeflag",
  },
  {
    id: "regular-entry",
    facet: "tarballs",
    plants: () => [tarPlant(Buffer.concat([body(), corpusBlocks(), END_BLOCKS]))],
    reads: "1x tarballs: read 112 entries",
  },
  {
    id: "rebuild-control",
    facet: "tarballs",
    plants: () => [
      gzipPlant(gzipSync(Buffer.concat([body(), END_BLOCKS]), { level: 9 })),
      gzipPlant(gzipSync(Buffer.concat([body(), Buffer.alloc(20 * BLOCK)]), { level: 1 })),
      gzipPlant(Buffer.concat([gzipSync(body().subarray(0, 7 * BLOCK)), gzipSync(Buffer.concat([body().subarray(7 * BLOCK), END_BLOCKS]))])),
      tarPlant(Buffer.concat([repacked(() => undefined, sealed, true), END_BLOCKS])),
      tarPlant(Buffer.concat([repacked(unreadFieldsRewritten), END_BLOCKS])),
    ],
    reads: "5x none: measured",
  },
  {
    id: "repack-refused",
    facet: "tarballs",
    plants: () => [
      tarPlant(
        Buffer.concat([
          repacked((header) => {
            header[156] = 0;
          }),
          END_BLOCKS,
        ]),
      ),
      tarPlant(Buffer.concat([repacked((header) => GNU_MAGIC.copy(header, 257)), END_BLOCKS])),
      tarPlant(Buffer.concat([ustarHeader("package/dist/", 0, 0x35), body(), END_BLOCKS])),
      tarPlant(Buffer.concat([repacked(() => undefined, spaceSealed), END_BLOCKS])),
      gzipPlant(Buffer.concat([body(), END_BLOCKS])),
      tarPlant(Buffer.concat([repacked(underOtherTop), END_BLOCKS])),
    ],
    reads: "6x tarballs: refused typeflag; tarballs: refused magic; tarballs: refused checksum; tarballs: refused gzip; tarballs: refused path",
  },
  {
    id: "typeflags",
    facet: "tarballs",
    plants: () => TYPEFLAGS.map((typeflag) => tarPlant(Buffer.concat([first(), entryBlocks(CORPUS_ENTRY, CORPUS_DOCUMENT, typeflag), END_BLOCKS]))),
    reads: "255x tarballs: refused typeflag",
  },
  {
    id: "extended-headers",
    facet: "tarballs",
    plants: () =>
      [
        paxBlocks(0x78, "path", CORPUS_ENTRY),
        paxBlocks(0x67, "comment", "corpus"),
        entryBlocks("././@LongLink", Buffer.from(CORPUS_ENTRY), 0x4c),
        entryBlocks("././@LongLink", Buffer.from("package/README.md"), 0x4b),
      ].map((extended) => tarPlant(Buffer.concat([first(), extended, entryBlocks("package/dist/cases.json", CORPUS_DOCUMENT), END_BLOCKS]))),
    reads: "4x tarballs: refused typeflag",
  },
  {
    id: "data-after-end",
    facet: "tarballs",
    plants: () =>
      [
        Buffer.concat([first(), ZERO_BLOCK, corpusBlocks(), END_BLOCKS]),
        Buffer.concat([first(), END_BLOCKS, corpusBlocks(), END_BLOCKS]),
        Buffer.concat([first(), END_BLOCKS, Buffer.from([1])]),
        Buffer.concat([first(), Buffer.from([1])]),
      ].map(tarPlant),
    reads: "4x tarballs: refused trailing",
  },
  {
    id: "duplicate-path",
    facet: "tarballs",
    plants: () => [Buffer.concat([first(), entryBlocks(firstPath(), CORPUS_DOCUMENT), END_BLOCKS]), Buffer.concat([first(), first(), END_BLOCKS])].map(tarPlant),
    reads: "2x tarballs: refused duplicate",
  },
  {
    id: "checksum",
    facet: "tarballs",
    plants: () => [
      tarPlant(Buffer.concat([first(), editedEntry((header) => header.write("7", 148, "latin1"), false), END_BLOCKS])),
      tarPlant(Buffer.concat([first(), unendedSealed(ustarHeader(CORPUS_ENTRY, CORPUS_DOCUMENT.length)), padded(CORPUS_DOCUMENT), END_BLOCKS])),
    ],
    reads: "2x tarballs: refused checksum",
  },
  {
    id: "magic",
    facet: "tarballs",
    plants: () =>
      [GNU_MAGIC, Buffer.alloc(8)].map((magic) => tarPlant(Buffer.concat([first(), editedEntry((header) => magic.copy(header, 257), true), END_BLOCKS]))),
    reads: "2x tarballs: refused magic",
  },
  {
    id: "linkname",
    facet: "tarballs",
    plants: () => [
      tarPlant(
        Buffer.concat([
          body(),
          editedEntry((header) => header.write("x", 157, "latin1"), true, "package/dist/lp.js", corpusBlocks()),
          END_BLOCKS,
        ]),
      ),
    ],
    reads: "1x tarballs: refused linkname",
  },
  {
    id: "number",
    facet: "tarballs",
    plants: () =>
      NUMBER_FIELDS.map((start) =>
        tarPlant(
          Buffer.concat([
            first(),
            editedEntry((header) => {
              header[start] = 0x81;
            }, true),
            END_BLOCKS,
          ]),
        ),
      ),
    reads: "6x tarballs: refused number",
  },
  {
    id: "size",
    facet: "tarballs",
    plants: () =>
      [
        (header: Buffer) => {
          header.fill(0, 124, 136);
          header[124] = 0x80;
          header.writeUInt32BE(CORPUS_DOCUMENT.length, 132);
        },
        (header: Buffer) => header.write("0000000001x", 124, "latin1"),
        (header: Buffer) => header.fill(0, 124, 136),
      ].map((edit) => tarPlant(Buffer.concat([first(), editedEntry(edit, true), END_BLOCKS]))),
    reads: "3x tarballs: refused size",
  },
  {
    id: "prefix",
    facet: "tarballs",
    plants: () => [tarPlant(Buffer.concat([first(), editedEntry((header) => header.write("package/conformance", 345, "latin1"), true), END_BLOCKS]))],
    reads: "1x tarballs: refused prefix",
  },
  {
    id: "path",
    facet: "tarballs",
    plants: () => [
      ...UNCLEAN_PATHS.map((path) => tarPlant(Buffer.concat([first(), entryBlocks(path, CORPUS_DOCUMENT), END_BLOCKS]))),
      tarPlant(
        Buffer.concat([
          first(),
          editedEntry((header) => {
            header[CORPUS_ENTRY.length + 1] = 0x0a;
            header.write("package/conformance/tail.json", CORPUS_ENTRY.length + 2, "latin1");
          }, true),
          END_BLOCKS,
        ]),
      ),
    ],
    reads: "8x tarballs: refused path",
  },
  {
    id: "truncated",
    facet: "tarballs",
    plants: () => [tarPlant(Buffer.concat([first(), ustarHeader(CORPUS_ENTRY, 8 * BLOCK), CORPUS_DOCUMENT]))],
    reads: "1x tarballs: refused truncated",
  },
  {
    id: "gzip",
    facet: "tarballs",
    plants: () => {
      const archive = Buffer.concat([first(), END_BLOCKS]);
      const gzipped = gzipSync(archive);
      return [archive, Buffer.concat([gzipped, Buffer.from("trailing")]), gzipped.subarray(0, gzipped.length - 4)].map(gzipPlant);
    },
    reads: "3x tarballs: refused gzip",
  },
  {
    id: "installed-added",
    facet: "installed",
    plants: () => [installedPlant(withFile(installedFiles(), CORPUS_ENTRY, CORPUS_DOCUMENT))],
    reads: "1x installed: read 112 entries",
  },
  {
    id: "installed-changed",
    facet: "installed",
    plants: () => [installedPlant(withFile(installedFiles(), "package/README.md", Buffer.concat([installedFiles().get("package/README.md") ?? Buffer.alloc(0), Buffer.from(" ")])))],
    reads: "1x installed: read 111 entries",
  },
  {
    id: "installed-removed",
    facet: "installed",
    plants: () => [installedPlant(withFile(installedFiles(), "package/LICENSE", undefined))],
    reads: "1x installed: read 110 entries",
  },
  {
    id: "installed-other-kind",
    facet: "installed",
    plants: () => [installedPlant(installedFiles(), ["package/dist/corpus-link.json"]), installedPlant(installedFiles(), [], "other")],
    reads: "2x installed: refused walk",
  },
  {
    id: "installed-control",
    facet: "installed",
    plants: () => [installedPlant(installedFiles()), identityOf(packageManifest(), SDK, DISK)],
    reads: "2x none: measured",
  },
];

/** A title or description no store write gave the bead's row: what a member spelled in another case holds (R-DECODER). */
const EDIT = "a value no store write gave the bead's row";
/** An export line for the bead's row as A1 reads it (its id, title and description), then any later members. */
const beadLine = (row: { readonly title: string; readonly description: string }, later: Readonly<Record<string, string>> = {}): string =>
  JSON.stringify({ id: BEAD, title: row.title, description: row.description, ...later });
/** Where a member spelled other than exactly can sit in an export text (R-DECODER): the member it spells, the text it plants
 * for a spelling given the bead's row, and A1's reading of that text when the spelling is the member's exact name. */
interface Placement {
  readonly id: string;
  readonly member: ReadMember;
  readonly plant: (row: { readonly title: string; readonly description: string }, name: string) => string;
  readonly exact: string;
}
const PLACEMENTS: readonly Placement[] = [
  { id: "later-id", member: "id", plant: (row, name) => beadLine(row, { [name]: "wb-other" }), exact: "0 rows" },
  { id: "later-title", member: "title", plant: (row, name) => beadLine(row, { [name]: EDIT }), exact: "1 row: another title, the measured description" },
  { id: "later-description", member: "description", plant: (row, name) => beadLine(row, { [name]: EDIT }), exact: "1 row: the statement, another description" },
  { id: "second-row", member: "id", plant: (row, name) => `${beadLine(row)}\n${JSON.stringify({ [name]: BEAD, title: row.title, description: EDIT })}`, exact: "2 rows" },
  {
    id: "other-row",
    member: "id",
    plant: (row, name) => `${beadLine(row)}\n${JSON.stringify({ id: "wb-other", title: row.title, description: EDIT, [name]: BEAD })}`,
    exact: "2 rows",
  },
];
/** Each placement's plant set: every spelling of its member other than the exact one (spellings, from engineFolds). */
const decoderPlants = (): { readonly placement: Placement; readonly names: readonly string[] }[] =>
  PLACEMENTS.map((placement) => ({ placement, names: spellings(placement.member).filter((name) => name !== placement.member) }));
/** Whether a text holds a code point outside ASCII. */
const outsideAscii = (text: string): boolean => [...text].some((char) => (char.codePointAt(0) ?? 0) > 0x7f);
/** A plant set's reading: how many names it holds, how many are distinct, how many hold a code point outside ASCII, and how many
 * are not another spelling of the member (the member itself, or a name the engine's case-insensitive Unicode match of the whole
 * member name does not read as it: the engine, an anchor outside this file's literals). */
function plantSet(member: ReadMember, names: readonly string[]): string {
  const folds = new RegExp(`^${member}$`, "iu");
  const strays = names.filter((name) => name === member || !folds.test(name)).length;
  return `${names.length} names, ${new Set(names).size} distinct, ${names.filter(outsideAscii).length} outside ASCII, ${strays} not another spelling`;
}
/** The plant set the engine's fold classes (engineFolds, scanned over every code point) predict for a member: every spelling but
 * the exact one, the product of its letters' class sizes less one, of which all but the all-ASCII spellings hold a code point
 * outside ASCII. */
function predictedPlantSet(member: ReadMember): string {
  const product = (keep: (char: string) => boolean): number => [...member].reduce((count, letter) => count * [...engineFolds()[letter]].filter(keep).length, 1);
  const every = product(() => true);
  const ascii = product((char) => !outsideAscii(char));
  return `${every - 1} names, ${every - 1} distinct, ${every - ascii} outside ASCII, 0 not another spelling`;
}
/** What the engine fold anchor reads of a set of plant sets: each placement whose plant set is not the one the engine's folds
 * predict (none today; R-SELF-HOLLOW pins that a placement's removal leaves this reading unchanged). */
const foldAnchorMisses = (plants: readonly { readonly placement: Placement; readonly names: readonly string[] }[]): string[] =>
  plants.filter(({ placement, names }) => plantSet(placement.member, names) !== predictedPlantSet(placement.member)).map(({ placement }) => placement.id);
/** The members A1 reads, each with the engine's case-insensitive Unicode match of its whole name. */
const FOLDED_MEMBERS = READ_MEMBERS.map((member) => [member, new RegExp(`^${member}$`, "iu")] as const);
/** A row's id, title and description as a decoder that matches member names case-insensitively sets them: each member whose name
 * the engine's case-insensitive Unicode match reads as one of the three sets it, a later member over an earlier one (the matching
 * the MEASURED go 1.26.2 readings show for encoding/json; R-DECODER). */
function foldedFields(row: Readonly<Record<string, unknown>>): Partial<Record<ReadMember, unknown>> {
  const fields: Partial<Record<ReadMember, unknown>> = {};
  for (const [key, value] of Object.entries(row)) for (const [member, folds] of FOLDED_MEMBERS) if (folds.test(key)) fields[member] = value;
  return fields;
}
/** rowReading's line for an export text read through the folding decoder: the rows whose folded id is the bead's, then the one
 * row's folded title against the statement and its folded description against the measured digest. */
function foldedRowReading(text: string): string {
  const mine = text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line): unknown => JSON.parse(line))
    .flatMap((row) => (isRecord(row) ? [foldedFields(row)] : []))
    .filter((fields) => fields.id === BEAD);
  if (mine.length !== 1) return `${mine.length} rows`;
  const [{ title, description }] = mine;
  const titled = title === `${TITLE_ID} ${STATEMENT}` ? "the statement" : "another title";
  const described = typeof description === "string" && sha256(description) === DESCRIPTION_SHA256 ? "the measured description" : "another description";
  return `1 row: ${titled}, ${described}`;
}

/** The residual families this file's header names, one per line (the RESIDUALS lines). */
function headerResiduals(): string[] {
  const header = readFileSync(SELF, "utf8").split("*/")[0];
  return [...header.matchAll(/^ \* (R-[A-Z]+(?:-[A-Z]+)*) /gm)].map((match) => match[1]);
}
/** The FORMS ids this file's header names, in order (the FORMS ROSTER line). */
function headerRoster(): string[] {
  const header = readFileSync(SELF, "utf8").split("*/")[0].replace(/\n \*\s+/g, " ");
  const roster = /FORMS ROSTER \(FROZEN SHAPE holds it equal to FORMS' ids\): ([^.]+)\./.exec(header)?.[1];
  return roster === undefined ? [] : roster.split(", ");
}
/** A class whose instances hold documents in a private field only. */
class Vault {
  readonly #cases: readonly object[];
  constructor(cases: readonly object[]) {
    this.#cases = cases;
  }
  count(): number {
    return this.#cases.length;
  }
}
/** R-HIDDEN's wrapped members, one of each kind the residual names: a String wrapper object (the gate's G-STRING-OBJECT), an
 * object whose own toString returns the representation, one whose own Symbol.toPrimitive returns it, a symbol whose description
 * holds it, and a function whose source spells it. */
const WRAPPED: readonly unknown[] = [
  new String(REPRESENTATION),
  { toString: () => REPRESENTATION },
  { [Symbol.toPrimitive]: () => REPRESENTATION },
  Symbol(REPRESENTATION),
  () => "hyperunix.result/1",
];
/** A wrapped value's kind by the realm's own checks, with whether its string value includes the representation: a String wrapper
 * (node:util's isStringObject; its value by String.prototype.valueOf), a symbol (its description), a function (its source by
 * Function.prototype.toString), or an object whose own Symbol.toPrimitive, else whose own toString, is a function (its result). */
function wrappedKind(value: unknown): string {
  if (types.isStringObject(value)) return `string-object:${String.prototype.valueOf.call(value).includes(REPRESENTATION)}`;
  if (typeof value === "symbol") return `symbol:${(value.description ?? "").includes(REPRESENTATION)}`;
  if (typeof value === "function") return `function:${Function.prototype.toString.call(value).includes(REPRESENTATION)}`;
  if (typeof value === "object" && value !== null) {
    const primitive: unknown = Object.getOwnPropertyDescriptor(value, Symbol.toPrimitive)?.value;
    if (typeof primitive === "function") return `to-primitive:${String(primitive.call(value, "string")).includes(REPRESENTATION)}`;
    const stringify: unknown = Object.getOwnPropertyDescriptor(value, "toString")?.value;
    if (typeof stringify === "function") return `to-string:${String(stringify.call(value)).includes(REPRESENTATION)}`;
  }
  return "other";
}
/** The values at a key path through own enumerable string-keyed data properties (dataValue: an accessor is never invoked), the
 * walk's channel into an object or an array; none where a step is absent. */
function walked(value: unknown, keys: readonly string[]): readonly unknown[] {
  return keys.reduce<readonly unknown[]>(
    (values, key) => values.flatMap((holder) => (typeof holder === "object" && holder !== null && Object.keys(holder).includes(key) ? dataValue(holder, key) : [])),
    [value],
  );
}
/** R-HIDDEN's planted release: today's release with module entries the bytes readers cannot see, and its root namespace with
 * documents in every hidden form the residual names, the given wrapped members (WRAPPED by default) among them. */
function hiddenPlant(wrapped: readonly unknown[] = WRAPPED): { readonly release: Release; readonly namespace: object } {
  const today = vendoredRelease();
  const documents = [PLANTED_DOCUMENT];
  const entries = new Map(today.entries);
  entries.set(
    "package/dist/cases.js",
    Buffer.from(
      `import { SDK_REPRESENTATION as representation } from "./result.js";\nconst CASES = [{ id: "find-incomplete", sha256: "${"0".repeat(64)}", document: { representation } }];\nexport function resultCases() {\n  return CASES;\n}\n`,
    ),
  );
  entries.set("package/dist/cases.d.ts", Buffer.from("export declare function resultCases(): readonly object[];\n"));
  entries.set("package/dist/samples.js", Buffer.from('export const SAMPLES = [{ representation: "hyperunix\\u002eresult/1" }];\n'));
  entries.set("package/dist/shapes.d.ts", Buffer.from('export declare const SHAPES: readonly [{ readonly representation: "hyperunix\\u002eresult/1" }];\n'));
  // The module form of the String wrapper member (the gate's G-STRING-OBJECT): its bytes never spell the representation.
  entries.set(
    "package/dist/wrapped.js",
    Buffer.from('import { SDK_REPRESENTATION } from "./result.js";\nexport const WRAPPED_CASES = [{ id: "find-incomplete", document: { representation: new String(SDK_REPRESENTATION) } }];\n'),
  );
  entries.set("package/dist/wrapped.d.ts", Buffer.from("export declare const WRAPPED_CASES: readonly object[];\n"));
  const loadCases = Object.assign(() => documents, { cases: documents });
  const namespace: Record<string | symbol, unknown> = {
    ...sdkRoot,
    resultCases: () => documents,
    loadCases,
    INHERITED_CASES: Object.create({ documents }),
    [Symbol("cases")]: documents,
    WEAK_CASES: new WeakMap([[PLANTED_DOCUMENT, documents]]),
    WEAK_SET: new WeakSet(documents),
    VAULT: new Vault(documents),
    PENDING_CASES: Promise.resolve(documents),
    CASE_BYTES: new Uint8Array(Buffer.from(JSON.stringify(documents))),
    WRAPPED_CASES: wrapped.map((representation) => ({ id: "find-incomplete", sha256: "0".repeat(64), document: { representation, operation: "find" } })),
  };
  Object.defineProperty(namespace, "CASES", { enumerable: true, get: () => documents });
  Object.defineProperty(namespace, "HIDDEN_CASES", { enumerable: false, value: documents });
  return { release: { ...today, entries, modules: { ...today.modules, ".": namespace } }, namespace };
}
/** A namespace's bindings beside the SDK's own, by name and property kind (R-HIDDEN's binding roster). */
function bindingRoster(namespace: object): string[] {
  return Reflect.ownKeys(namespace)
    .filter((key) => typeof key === "symbol" || !Object.hasOwn(sdkRoot, key))
    .map((key) => {
      const property = Object.getOwnPropertyDescriptor(namespace, key);
      return `${String(key)}:${property !== undefined && "value" in property ? "data" : "accessor"}:${property?.enumerable === true ? "enumerable" : "non-enumerable"}`;
    });
}
/** The kinds of the wrapped members a namespace carries where the walk reads them: each WRAPPED_CASES document's representation. */
function wrappedKinds(namespace: object): string[] {
  return walked(namespace, ["WRAPPED_CASES"])
    .flatMap((cases) => (typeof cases === "object" && cases !== null ? Object.keys(cases).flatMap((index) => walked(cases, [index, "document", "representation"])) : []))
    .map(wrappedKind);
}
/** A release's entries beyond today's, each with what T1 identity's tarballs facet reads when it alone ships in today's release
 * (R-HIDDEN's entry roster). */
function entryRoster(release: Release): string[] {
  const today = vendoredRelease().entries;
  return [...release.entries]
    .filter(([path]) => !today.has(path))
    .map(([path, bytes]) => `${path}: ${JSON.stringify(readingOf(new Map([...today, [path, bytes]]))) === JSON.stringify(MEASURED) ? "the measured release" : "another release"}`)
    .sort();
}
/** Each named residual family's quiet row. */
const QUIET: Readonly<Record<string, () => void>> = {
  "R-HIDDEN": () => {
    const today = vendoredRelease();
    const { release: hidden, namespace } = hiddenPlant();
    expect(
      PINS.filter((pin) => !same(READINGS[pin.reading](hidden), pin.today)).map(pinId),
      "R-HIDDEN: every classification pin reads today's set",
    ).toStrictEqual([]);
    expect(bindingRoster(namespace), "R-HIDDEN: the planted namespace's bindings beside the SDK's own, by name and property kind").toStrictEqual([
      "resultCases:data:enumerable",
      "loadCases:data:enumerable",
      "INHERITED_CASES:data:enumerable",
      "WEAK_CASES:data:enumerable",
      "WEAK_SET:data:enumerable",
      "VAULT:data:enumerable",
      "PENDING_CASES:data:enumerable",
      "CASE_BYTES:data:enumerable",
      "WRAPPED_CASES:data:enumerable",
      "CASES:accessor:enumerable",
      "HIDDEN_CASES:data:non-enumerable",
      "Symbol(cases):data:enumerable",
    ]);
    expect(
      wrappedKinds(namespace),
      "R-HIDDEN: the wrapped members, read where the walk reads them, are one of each kind, each one's string value including the representation",
    ).toStrictEqual(["string-object:true", "to-string:true", "to-primitive:true", "symbol:true", "function:true"]);
    expect(
      READINGS["exported-representations"](hiddenPlant(WRAPPED.map(() => REPRESENTATION)).release),
      "beside the quiet, the same plant with each wrapped member replaced by the representation itself is read by the walk at each WRAPPED_CASES document",
    ).toStrictEqual([
      ".:SDK_REPRESENTATION",
      ".:WRAPPED_CASES.0.document.representation",
      ".:WRAPPED_CASES.1.document.representation",
      ".:WRAPPED_CASES.2.document.representation",
      ".:WRAPPED_CASES.3.document.representation",
      ".:WRAPPED_CASES.4.document.representation",
    ]);
    expect(entryRoster(hidden), "R-HIDDEN: each planted module entry, shipped alone in today's release, makes the tarballs facet read another release").toStrictEqual([
      "package/dist/cases.d.ts: another release",
      "package/dist/cases.js: another release",
      "package/dist/samples.js: another release",
      "package/dist/shapes.d.ts: another release",
      "package/dist/wrapped.d.ts: another release",
      "package/dist/wrapped.js: another release",
    ]);
    expect(readingOf(hidden.entries), "R-HIDDEN: T1 identity's tarballs facet reads the planted entries as another release").not.toStrictEqual(MEASURED);
    // A built-in the walk calls, replaced by import-time code: Map.prototype.entries, for one walk, then restored.
    const indexed: Release = { ...today, modules: { ".": { INDEX: new Map([["find-incomplete", PLANTED_DOCUMENT]]) } } };
    const intrinsic = Map.prototype.entries;
    let replaced: string[];
    try {
      Map.prototype.entries = () => intrinsic.call(new Map());
      replaced = READINGS["exported-representations"](indexed);
    } finally {
      Map.prototype.entries = intrinsic;
    }
    expect(replaced, "R-HIDDEN: a Map read through a replaced Map.prototype.entries reads none").toStrictEqual([]);
    expect(READINGS["exported-representations"](indexed), "beside the quiet, the same Map read through the built-in is read").toStrictEqual([".:INDEX.find-incomplete.document.representation"]);
    expect(
      READINGS["exported-representations"]({ ...hidden, modules: { ".": { RESULT_CASES: [PLANTED_DOCUMENT] } } }),
      "beside the quiet, the same documents exported as a plain value are read",
    ).toStrictEqual([".:RESULT_CASES.0.document.representation"]);
  },
  "R-OTHER-PACKAGE": () => {
    const unnamed = "@hyperunix/corpus";
    const manifest = {
      dependencies: { [SDK]: MEASURED_SPEC, "hx-conformance": "file:vendor/hx-conformance-0.1.0.tgz", "@HyperUnix/corpus": "file:vendor/hyperunix-corpus-0.1.0.tgz" },
      devDependencies: { "@acme/hyperunix-corpus": "1.0.0", "hyperunix-results": "file:vendor/hyperunix-results-0.1.0.tgz" },
      bundledDependencies: [SDK, unnamed],
      overrides: { [unnamed]: "file:vendor/hyperunix-corpus-0.1.0.tgz" },
      workspaces: ["vendor/hyperunix-corpus"],
    };
    expect(hxPackages(manifest), "R-OTHER-PACKAGE: a package outside the HX scope, or one named outside the four fields, reads quiet").toStrictEqual([SDK]);
    expect(namings(manifest, unnamed), "an HX-scoped package named outside the four fields has no naming").toStrictEqual([]);
  },
  "R-SELF-HOLLOW": () => {
    const anchored = exportedClauses(exportRow().description);
    expect(anchorReading(ROWS), "the anchor reads ROWS' clauses").toStrictEqual(anchored);
    const withoutPin = (reading: ReadingId): Row[] => ROWS.map((row) => ({ ...row, pins: row.pins.filter((pin) => pin.reading !== reading) }));
    expect(
      PINS.filter((pin) => same(anchorReading(withoutPin(pin.reading)), anchored)).map(pinId),
      "R-SELF-HOLLOW: each pin's removal from every literal leaves the anchor's reading unchanged",
    ).toStrictEqual(PINS.map(pinId));
    expect(
      ROWS.filter((row) => same(anchorReading(ROWS.filter((other) => other !== row)), anchored)).map((row) => row.id),
      "each row's removal changes it",
    ).toStrictEqual([]);
    expect(
      LINE_BOUNDARIES.filter((boundary) => engineMisses(LINE_BOUNDARIES.filter((other) => other !== boundary)).length === 0).map(([name]) => name),
      "R-SELF-HOLLOW: a boundary's removal leaves the engine anchor's reading unchanged exactly for the boundaries it does not anchor",
    ).toStrictEqual(["CR LF", "VT", "FF", "FS", "GS", "RS", "NEL"]);
    // The two member kinds wb-ulnv names (refusal #1 F5): a removal from the plant alone is read by the quiet row's own literal for
    // that member, never by an outside anchor.
    const hidden = hiddenPlant();
    const outside = (release: Release): string =>
      JSON.stringify([PINS.map((pin) => READINGS[pin.reading](release)), JSON.stringify(readingOf(release.entries)) === JSON.stringify(MEASURED)]);
    const baseline = outside(hidden.release);
    const unchanged = (release: Release): boolean => outside(release) === baseline;
    // The copy is built from every other binding's descriptor (CASES and HIDDEN_CASES are not configurable, so none is deleted).
    const withoutBinding = (key: string | symbol): object =>
      Object.defineProperties(
        {},
        Object.fromEntries(
          Reflect.ownKeys(hidden.namespace).flatMap((other) => {
            const property = Object.getOwnPropertyDescriptor(hidden.namespace, other);
            return other === key || property === undefined ? [] : [[other, property] as const];
          }),
        ),
      );
    const bindings = Reflect.ownKeys(hidden.namespace).filter((key) => typeof key === "symbol" || !Object.hasOwn(sdkRoot, key));
    const roster = bindingRoster(hidden.namespace);
    expect(
      bindings
        .filter((key) => {
          const namespace = withoutBinding(key);
          return unchanged({ ...hidden.release, modules: { ...hidden.release.modules, ".": namespace } }) && !same(bindingRoster(namespace), roster);
        })
        .map(String),
      "R-SELF-HOLLOW: each R-HIDDEN planted binding's removal leaves every outside reading unchanged, while the binding roster reads it",
    ).toStrictEqual(bindings.map(String));
    const kinds = wrappedKinds(hidden.namespace);
    expect(
      WRAPPED.map((_, index) => hiddenPlant(WRAPPED.filter((__, other) => other !== index)))
        .map((without, index) => (unchanged(without.release) && !same(wrappedKinds(without.namespace), kinds) ? index : -1))
        .filter((index) => index >= 0),
      "R-SELF-HOLLOW: each wrapped member's removal leaves every outside reading unchanged, while the wrapped-kind literal reads it",
    ).toStrictEqual(WRAPPED.map((_, index) => index));
    const planted = [...hidden.release.entries.keys()].filter((path) => !vendoredRelease().entries.has(path)).sort();
    const entryReading = entryRoster(hidden.release);
    expect(
      planted.filter((path) => {
        const entries = new Map(hidden.release.entries);
        entries.delete(path);
        const release: Release = { ...hidden.release, entries };
        return unchanged(release) && !same(entryRoster(release), entryReading);
      }),
      "R-SELF-HOLLOW: each planted entry's removal leaves every outside reading unchanged, while the entry roster reads it",
    ).toStrictEqual(planted);
    const plants = decoderPlants();
    const misses = foldAnchorMisses(plants);
    expect(
      PLACEMENTS.filter((placement) => same(foldAnchorMisses(plants.filter(({ placement: other }) => other !== placement)), misses)).map(
        (placement) => placement.id,
      ),
      "R-SELF-HOLLOW: each R-DECODER placement's removal leaves the engine fold anchor's reading unchanged",
    ).toStrictEqual(PLACEMENTS.map((placement) => placement.id));
    expect(
      plants.map((plant) => foldAnchorMisses([{ placement: plant.placement, names: plant.names.slice(1) }])),
      "while one name's removal from any placement's plant set is read",
    ).toStrictEqual(PLACEMENTS.map((placement) => [placement.id]));
  },
  "R-UNLOADED": () => {
    expect(scopedImports(), "R-UNLOADED: the file imports the SDK's export subpaths statically, so it loads only when they do").toStrictEqual(
      Object.keys(MODULES).map((subpath) => (subpath === "." ? SDK : `${SDK}${subpath.slice(1)}`)),
    );
  },
  "R-DECODER": () => {
    const row = exportRow();
    const today = rowReading(beadLine(row));
    expect(today, "A1 reads the bead's row, re-encoded alone, as the statement and the measured description").toBe("1 row: the statement, the measured description");
    const read = decoderPlants().map(({ placement, names }) => ({
      placement,
      readings: names.map((name) => {
        const text = placement.plant(row, name);
        return { name, a1: rowReading(text), folded: foldedRowReading(text) };
      }),
    }));
    expect(
      read.map(({ placement, readings }) => `${placement.id}: ${plantSet(placement.member, readings.map(({ name }) => name))}`),
      "R-DECODER: in each placement the names the quiet row reads are every spelling the engine's folds predict but the exact one",
    ).toStrictEqual(PLACEMENTS.map((placement) => `${placement.id}: ${predictedPlantSet(placement.member)}`));
    const loud = read.flatMap(({ placement, readings }) => readings.filter(({ a1 }) => a1 !== today).map(({ name }) => `${placement.id} ${name}`));
    expect(loud, "R-DECODER: every other spelling of a member A1 reads, in every placement, leaves A1's reading today's").toStrictEqual([]);
    const unfolded = read.flatMap(({ placement, readings }) => readings.filter(({ folded }) => folded !== placement.exact).map(({ name }) => `${placement.id} ${name}`));
    expect(
      unfolded,
      "beside the quiet, a decoder that matches member names case-insensitively, a later member over an earlier one, reads each planted text as its placement's exact edit",
    ).toStrictEqual([]);
    expect(foldedRowReading(beadLine(row)), "and reads the bead's row, re-encoded alone, as A1 does").toBe(today);
    const exact = PLACEMENTS.map((placement) => rowReading(placement.plant(row, placement.member)));
    expect(exact, "beside the quiet, each placement under the exact name reads the edit").toStrictEqual(PLACEMENTS.map((placement) => placement.exact));
    expect(
      exact.filter((reading) => reading === today),
      "and no placement's exact reading is today's",
    ).toStrictEqual([]);
  },
};

const IDENTIFIED = new Set<string>();
const JUDGED = new Set<string>();
const FORMED = new Set<string>();
const QUIETED = new Set<string>();

describe("wb-tz2.7 HyperUnix result-corpus census (until a consumer-facing hyperunix.result/1 corpus ships)", () => {
  it("T0: the readings are live: package.json names the tarball read, the installed copy is the vendored one, the codec exports the statement's representation, and each reader sees its controls", () => {
    const release = vendoredRelease();
    expect(vendoredTarball(), "package.json resolves the SDK from a vendored tarball").toMatch(/^vendor\/hyperunix-sdk-[^/]+\.tgz$/);
    expect(release.entries.size, "the vendored release was read").toBeGreaterThan(0);
    const installed = walkCopy(installedRoot(SDK), DISK);
    expect(installed.size, "the installed copy was read").toBeGreaterThan(0);
    expect(differingEntries(installed, release.entries), "the installed copy is the vendored one, file for file and byte for byte").toStrictEqual([]);
    // The comparison is live: it sees a changed byte, a file only the installed copy holds and one only the release holds.
    const sample = bytesOf([
      ["package/dist/a.js", "a"],
      ["package/dist/b.js", "b"],
    ]);
    const changed = bytesOf([
      ["package/dist/a.js", "a!"],
      ["package/dist/c.js", "c"],
    ]);
    expect(differingEntries(changed, sample)).toStrictEqual(["package/dist/a.js", "package/dist/b.js", "package/dist/c.js"]);
    expect(differingEntries(new Map(sample), sample)).toStrictEqual([]);
    // The digest is live: a changed byte, an added entry and a renamed entry each change it; entry order does not.
    const digest = contentDigest(sample);
    const variants = [
      bytesOf([
        ["package/dist/a.js", "a"],
        ["package/dist/b.js", "c"],
      ]),
      new Map([...sample, ["package/dist/c.js", Buffer.from("c")]]),
      bytesOf([
        ["package/dist/a.js", "a"],
        ["package/dist/B.js", "b"],
      ]),
    ];
    expect(variants.map(contentDigest).filter((other) => other === digest)).toStrictEqual([]);
    expect(contentDigest(new Map([...sample].reverse()))).toBe(digest);
    expect(sdkRoot.SDK_REPRESENTATION, "the codec Pi runs exports the representation the statement names").toBe(REPRESENTATION);
    expect(
      [...release.entries.values()].some((bytes) => bytes.includes(NAMED_CORPUS)),
      "the content reading is live: it finds the release's prose naming the corpus it does not ship",
    ).toBe(true);
    expect(Object.keys(release.modules).sort(), "the export walk imports every export subpath the vendored manifest declares").toStrictEqual([...release.exports].sort());
    expect(() => exportedCarriers({ ".": { HANDLE: new Proxy({ representation: REPRESENTATION }, {}) } }), "the export walk refuses a Proxy").toThrow("is a Proxy");
    // The dependency and naming readers are live: they read an HX-scoped package in each of the four fields, in field order.
    expect(DEPENDENCY_FIELDS.map((field) => hxPackages({ [field]: { "@hyperunix/conformance": "file:vendor/c.tgz", "left-pad": "1.0.0" } }))).toStrictEqual(
      DEPENDENCY_FIELDS.map(() => ["@hyperunix/conformance"]),
    );
    expect(namings(Object.fromEntries(DEPENDENCY_FIELDS.map((field) => [field, { [SDK]: `file:${field}.tgz` }])), SDK)).toStrictEqual(
      DEPENDENCY_FIELDS.map((field) => [field, `file:${field}.tgz`]),
    );
  });

  describe("T1 (ARMED): the vendored HX releases are the measured ones, and each clause's subject reads absent in the forms the readings read", () => {
    it("T1 identity: package.json's HX-scoped packages are WATCHED's, each named once under its measured spec, with its vendored tarball (read only in the measured form) and its installed copy the measured release", () => {
      const manifest = packageManifest();
      const packages = hxPackages(manifest);
      expect(packages, owed(`package.json's HX-scoped packages are no longer WATCHED's (${Object.keys(WATCHED).join(", ")})`)).toStrictEqual(Object.keys(WATCHED).sort());
      for (const name of packages) {
        expect(identityOf(manifest, name, DISK), owed(`${name}'s naming, vendored tarball or installed copy is no longer the measured one`)).toStrictEqual(WATCHED[name]);
        IDENTIFIED.add(name);
      }
    });

    it.each(FORMS.map((form) => [form.id, form] as const))("T1 identity form %s: the planted form reads the facets and outcome its row pins", (id, form) => {
      expect(formReading(form), `${id}: what T1 identity's ${form.facet} facet reads of the planted form`).toBe(form.reads);
      FORMED.add(id);
    });

    it.each(PINS.map((pin) => [pinId(pin), pin] as const))("T1 %s: the vendored release reads today's set", (name, pin) => {
      expect(classified(pin.reading), owed(`the vendored ${SDK} now differs on the ${name} reading`)).toStrictEqual([...pin.today]);
      JUDGED.add(name);
    });
  });

  it("T2: the same readers find every signal in a planted release that ships a corpus", () => {
    const planted = releaseOf(bytesOf(PLANTED_ENTRIES), PLANTED_MODULES);
    for (const pin of PINS) expect(READINGS[pin.reading](planted), pin.reading).toStrictEqual([...PLANTED_READINGS[pin.reading]]);
    expect(
      PINS.filter((pin) => same(READINGS[pin.reading](planted), pin.today)).map(pinId),
      "every pin sees its plant",
    ).toStrictEqual([]);
  });

  describe("residuals: each named family's quiet row", () => {
    for (const [family, quiet] of Object.entries(QUIET)) {
      // The quiet rows parse the whole bead export and replay whole plants: under ambient load one ran past vitest's 5 s default
      // (R-SELF-HOLLOW, 5448 ms, in wb-ulnv cut #2's battery), so each carries the suite's common 60 s bound.
      it(`${family} reads quiet`, { timeout: 60_000 }, () => {
        quiet();
        QUIETED.add(family);
      });
    }
  });

  it("A1 description: the export holds one row with the bead's id, and its description is the one measured (sha256), so any edit to it reds here", () => {
    const { description } = exportRow();
    expect(sha256(description), "the export description is no longer the one cut #4 measured: re-measure DESCRIPTION_SHA256 and A1's readings against it and say so").toBe(
      DESCRIPTION_SHA256,
    );
    // The reading is live: a second field line after each boundary, a second value, a continuation line and an invisible prefix
    // each change it.
    const edits = [
      ...LINE_BOUNDARIES.map(([, chars]) => `${description}${chars}SURFACES: t:3-4@x`),
      description.replace(`SURFACES: ${SURFACE_PIN}`, `SURFACES: ${SURFACE_PIN}, t:3-4@x`),
      description.replace(`SURFACES: ${SURFACE_PIN}`, `SURFACES: ${SURFACE_PIN}\n  t:3-4@x`),
      `${description}\n${String.fromCodePoint(0x200b)}SURFACES: t:3-4@x`,
    ];
    expect(edits.filter((edit) => edit === description || sha256(edit) === DESCRIPTION_SHA256)).toStrictEqual([]);
  });

  it("A1: the export title is the statement, its one ACCEPTANCE line is ACCEPTANCE with ROWS' clauses, its one SURFACES line names SURFACE_PIN alone at every line boundary, and the named surface still holds hand-built documents with a literal representation (TypeScript AST)", () => {
    const row = exportRow();
    expect(row.title, "the export title is the statement").toBe(`${TITLE_ID} ${STATEMENT}`);
    expect(STATEMENT, "the statement names the representation the codec exports").toContain(`a consumer-facing ${REPRESENTATION} conformance corpus`);
    expect(fieldLines(row.description, "ACCEPTANCE"), "the description holds exactly one ACCEPTANCE line, and it is ACCEPTANCE verbatim").toStrictEqual([`ACCEPTANCE: [${listItem(ACCEPTANCE)}]`]);
    expect(exportedClauses(row.description), "ROWS' clauses are the export item's clauses, in order").toStrictEqual(anchorReading(ROWS));
    expect(fieldLines(row.description, "SURFACES"), "the description holds exactly one SURFACES line, and it names SURFACE_PIN alone").toStrictEqual([`SURFACES: ${SURFACE_PIN}`]);
    expect(ROW_CONTROLS.map(([text]) => beadRows(text).length), "the row reader counts every row with the bead's id, whatever fields it carries").toStrictEqual(
      ROW_CONTROLS.map(([, count]) => count),
    );
    expect(FIELD_CONTROLS.map(([text, field]) => fieldLines(text, field)), "the field reader returns every field line, whole").toStrictEqual(FIELD_CONTROLS.map(([, , lines]) => [...lines]));
    expect(
      BOUNDARY_CONTROLS.map(({ name, field, text }) => `${name} ${field}: ${JSON.stringify(fieldLines(text, field))}`),
      "the field reader cuts at every line boundary, so a second field line after any of them is read, whole",
    ).toStrictEqual(BOUNDARY_CONTROLS.map(({ name, field, lines }) => `${name} ${field}: ${JSON.stringify(lines)}`));
    expect(engineTerminators().map((char) => codePoints(char)[0]), "the engine anchor is live: JavaScript reads LF, CR, LS and PS as line terminators").toStrictEqual([
      0x0a, 0x0d, 0x2028, 0x2029,
    ]);
    expect(engineMisses(LINE_BOUNDARIES), "every line terminator the engine reads is a boundary of the field reader").toStrictEqual([]);
    expect(
      literalRepresentations(readFileSync(join(REPO, SURFACE), "utf8")).length,
      "the surface still holds hand-built result documents whose representation is the string literal",
    ).toBeGreaterThan(0);
    expect(SURFACE_CONTROLS.map(([text]) => literalRepresentations(text).length), "the surface reading's form").toStrictEqual(SURFACE_CONTROLS.map(([, count]) => count));
  });

  it("FROZEN SHAPE (standing rule 16): ROWS' ids and pin counts, every reading pinned exactly once, WATCHED, the line boundaries, the refusals, the forms, the surface and field controls, and the residual roster", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toStrictEqual(["provenance:2", "drift:2", "second-entry:2"]);
    expect(PINS.map((pin) => pin.reading)).toStrictEqual(Object.keys(READINGS));
    expect(Object.keys(WATCHED)).toStrictEqual([SDK]);
    expect(Object.keys(WATCHED[SDK])).toStrictEqual([...FACETS]);
    expect(LINE_BOUNDARIES.map(([name]) => name)).toStrictEqual(["CR LF", "LF", "CR", "VT", "FF", "FS", "GS", "RS", "NEL", "LS", "PS"]);
    expect(LINE_BOUNDARIES.map(([, chars]) => codePoints(chars))).toStrictEqual([[13, 10], [10], [13], [11], [12], [28], [29], [30], [133], [8232], [8233]]);
    expect([...REFUSALS]).toStrictEqual(["gzip", "checksum", "magic", "typeflag", "linkname", "number", "size", "prefix", "path", "duplicate", "truncated", "trailing"]);
    expect(FORMS.map((form) => `${form.id}:${form.facet}`)).toStrictEqual([
      "named-again:naming",
      "moved-field:naming",
      "respec:naming",
      "naming-control:naming",
      "typeflag-7:tarballs",
      "zero-block-padding:tarballs",
      "pax-rename:tarballs",
      "regular-entry:tarballs",
      "rebuild-control:tarballs",
      "repack-refused:tarballs",
      "typeflags:tarballs",
      "extended-headers:tarballs",
      "data-after-end:tarballs",
      "duplicate-path:tarballs",
      "checksum:tarballs",
      "magic:tarballs",
      "linkname:tarballs",
      "number:tarballs",
      "size:tarballs",
      "prefix:tarballs",
      "path:tarballs",
      "truncated:tarballs",
      "gzip:tarballs",
      "installed-added:installed",
      "installed-changed:installed",
      "installed-removed:installed",
      "installed-other-kind:installed",
      "installed-control:installed",
    ]);
    expect(
      REFUSALS.filter((rule) => !FORMS.some((form) => form.reads.includes(`refused ${rule}`))),
      "every rule the strict reader refuses by has a FORMS row",
    ).toStrictEqual([]);
    expect(headerRoster(), "the header's FORMS ROSTER names exactly FORMS' ids, in order").toStrictEqual(FORMS.map((form) => form.id));
    expect(SURFACE_CONTROLS.map(([, count]) => count)).toStrictEqual([1, 1, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0]);
    expect(ROW_CONTROLS.map(([, count]) => count)).toStrictEqual([1, 2, 2, 2, 1, 1]);
    expect(FIELD_CONTROLS.map(([, field, lines]) => `${field}:${lines.length}`)).toStrictEqual([
      "ACCEPTANCE:1",
      "ACCEPTANCE:2",
      "ACCEPTANCE:1",
      "ACCEPTANCE:1",
      "SURFACES:1",
      "SURFACES:2",
      "SURFACES:1",
      "SURFACES:1",
    ]);
    expect(PLACEMENTS.map((placement) => `${placement.id}:${placement.member}`)).toStrictEqual([
      "later-id:id",
      "later-title:title",
      "later-description:description",
      "second-row:id",
      "other-row:id",
    ]);
    expect(Object.entries(engineFolds()).map(([letter, chars]) => `${letter}:${codePoints(chars).join(",")}`)).toStrictEqual([
      "c:67,99",
      "d:68,100",
      "e:69,101",
      "i:73,105",
      "l:76,108",
      "n:78,110",
      "o:79,111",
      "p:80,112",
      "r:82,114",
      "s:83,115,383",
      "t:84,116",
    ]);
    expect(READ_MEMBERS.map((member) => `${member}:${spellings(member).length}`)).toStrictEqual(["id:4", "title:32", "description:3072"]);
    expect(decoderPlants().map(({ placement, names }) => `${placement.id}: ${plantSet(placement.member, names)}`)).toStrictEqual([
      "later-id: 3 names, 3 distinct, 0 outside ASCII, 0 not another spelling",
      "later-title: 31 names, 31 distinct, 0 outside ASCII, 0 not another spelling",
      "later-description: 3071 names, 3071 distinct, 1024 outside ASCII, 0 not another spelling",
      "second-row: 3 names, 3 distinct, 0 outside ASCII, 0 not another spelling",
      "other-row: 3 names, 3 distinct, 0 outside ASCII, 0 not another spelling",
    ]);
    expect(Object.keys(QUIET)).toStrictEqual(["R-HIDDEN", "R-OTHER-PACKAGE", "R-SELF-HOLLOW", "R-UNLOADED", "R-DECODER"]);
    expect(headerResiduals(), "the header's RESIDUALS lines name exactly QUIET's families, in order").toStrictEqual(Object.keys(QUIET));
  });

  it("RECORDS: T1 identity judged every HX-scoped package package.json names, and every pin, form and quiet row ran to its end", () => {
    expect([...IDENTIFIED].sort(), "T1 identity judged every HX-scoped package Pi depends on").toStrictEqual(hxPackages(packageManifest()));
    expect([...JUDGED].sort(), "every classification pin's case ran to its end").toStrictEqual(PINS.map(pinId).sort());
    expect([...FORMED].sort(), "every FORMS row's case ran to its end").toStrictEqual(FORMS.map((form) => form.id).sort());
    expect([...QUIETED].sort(), "every residual's quiet row ran to its end").toStrictEqual(Object.keys(QUIET).sort());
  });
});
