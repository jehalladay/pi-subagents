/**
 * wb-j4sm (RF-NATIVE-TSX-COMPONENTS-R2, program-triage-2026-10-18): the carrier child of wb-70xe, filed at its rule-19 structural
 * exit (orchestrator rulings R-B275 and R-B292) and made its blocker by the dependency inversion (orchestrator ruling R-B307).
 * THE IDENTITY CENSUS of test/helpers/rf-tsx-deno.ts, whose code is wb-70xe's cut #4 (cb85b5c8) unchanged and which this cut lands
 * first: for five of the helper's exported functions, the readings over planted PATHs, planted engines and planted texts. wb-70xe's
 * own cases (its tier wiring in test/workbench-rf-tsx-tier.test.ts, its provisioning and lane census, its docs07 row R10) are not on
 * this tree; nothing here restates them, and wb-70xe's re-cut composes this helper when it lands.
 * CUT #3, in the enumerate-the-resolvable form (rule 19(c); the SECOND-STAGE CAP ruling R-B405 on refusal #2 froze the pin READ and
 * ANCHOR claim sets): the header claims exactly the pinned set below, each READ form known to pass the pin cases' passes unread is a
 * NAMED RESIDUAL with a pinned quiet row, and the rest is NOT CLAIMED.
 *
 * THE PINNED READER SET (this file, test/workbench-rf-tsx-deno-identity-census.test.ts; 10 cases and two last words, file-level
 * afterAll hooks, each passed with this cut on trunk 5259399):
 *  - "the frozen shape: ..." - ROWS' `${id}:${pins.length}` equals ["ID:3", "SCAN:2"]; readings(), EXPECTED and WITNESS each hold
 *    exactly one entry per pin; QUIET's ids equal ["R-CARRIED-STATE", "R-VALUE-AWARE"], and so do, in order, the residual ids this
 *    header's RESIDUALS paragraph names, while QUIET's titles equal, in order, the quiet rows' titles this header quotes (both read
 *    from this file's own text, outside its literals). Falsifier: deleting a pin or a row (CT1, CT1b, CT4); a quiet row or a
 *    residual dropped from this file's literals, named in only one of QUIET and the header, or its title shortened in QUIET.
 *  - "the helper anchor: ..." - read from the helper's own source by the TypeScript parser and from its module namespace as this
 *    file loads it. THE SOURCE holds no top-level variable statement but a plain const (a let, a var and a using are refused), no
 *    var declaration anywhere (one in a block or a loop head binds a module name), no import declaration but of a node: built-in
 *    module, no import-equals declaration, no export declaration with a from clause, and nowhere the characters @ts-; so every name of the helper's module namespace is bound by a declaration of its own (a const,
 *    function, class, enum or namespace declaration, or an export default expression) or by an import of a node: built-in module,
 *    each a binding tsc refuses to assign. A SECTION is a `// ---- <title> ----` line comment
 *    among the leading comments of one of the helper's top-level statements or of its end of file, as ts.getLeadingCommentRanges
 *    reads them; the same characters anywhere else (inside a string, a template literal or a block, or a trailing comment) are no
 *    section. A FUNCTION EXPORT is a name of that namespace whose value is a function (a class among them), placed in the section
 *    of the top-level statement the parser reads as exporting that name: an export modifier on a function, class, variable, enum or
 *    namespace declaration (a default one under the name default), an export list with or without a from clause, or an export
 *    default expression. Every row's label is a section title, rows stand in section order, every function export is placed in
 *    exactly one section, and each section's function exports are exactly its row's pins (in the helper's order) plus its UNCLAIMED
 *    names. Falsifier: deleting, renaming or relabelling a pin or a row in this file (CT2, CT5, CT6); a function export the helper
 *    gains in any of those forms (a function or class declaration, a const holding an arrow, a function expression or another
 *    export, an export alias, a default export, a re-export) or in a form the parser does not read (then placed in no section); a
 *    section mark moved, retitled, deleted or held in a string or template literal; refusal #2's U2 member G2-A01 (a let export the
 *    helper binds to a function at its first call) and its eager twin G2-A01t, each refused at the source.
 *  - one case per pin, titled by the pin under `${row.id} ${row.label}`. It plants one tree under one scratch root, then runs its
 *    three passes, in order, from one call site, before it asserts anything: in each pass READ is the pin's entry of the record
 *    readings() builds for that pass alone, handed the one planted tree and a stand-in reader made by the one factory
 *    handedReader, whose n-th call (from 0) returns either the result of the function the helper module exports under the pin's
 *    own name, for the arguments READ passed, or a sentinel naming the pin and n. THE READING PASS (no sentinel): the stand-in is
 *    called once per row, READ's reading strictly equals the reading built here from the same tables without the helper
 *    (EXPECTED), and its sha256 prefix equals WITNESS. THE TWO BINDING PASSES (sentinels on the even calls, then on the odd calls,
 *    so every call is a sentinel in exactly one of them): the stand-in is called once per row, each sentinel row (row n, of call n)
 *    carries its own call's sentinel and no other, and every other row strictly equals its EXPECTED row. So a READ that, in all
 *    three passes alike, substitutes on some row anything for its stand-in's return on that row's call - a sibling export's
 *    reading, the pin's export read directly, its own expectation, a constant - reds at that row's sentinel. A READ chooses alike
 *    in all three passes when its choice reads only what is the same in each: this file's tables and bindings, which no pass
 *    writes; its entry's own closures (each pass builds a fresh record); the planted tree's paths, entry kinds and file bytes (one
 *    tree per case); the runner's assertion count (no assertion runs until the three passes have); and the arguments it hands its
 *    stand-in. Falsifier: each one-edit member named in that pin's clause below; any swap of a pin's
 *    reading (CT3); refusal #1's U3 members (READ reading the sibling export, its own expectation or a constant); refusal #2's U1
 *    members G2-B01, G2-B03, G2-B04 and G2-B05 (a pass count in the entry's own closure) and G2-B02 (the pass read from the
 *    runner's assertion count), alone and each with its held member (G-H03, G-D02, G-P01, G-S01).
 *  - the two quiet rows, one per residual, under "the residuals' quiet rows: ...": "R-CARRIED-STATE: a READ that counts its passes
 *    in state outliving them keeps its stand-in's value on the sentinel calls alone, and the passes read it quiet over a held
 *    member" and "R-VALUE-AWARE: a READ that tells a sentinel from a reading by the value its stand-in returns keeps the sentinels
 *    alone, and the passes read it quiet over a held member" (QUIET's titles equal these quotations, in order). Each plants the tree
 *    and runs the denoInstallHits pin's three passes three times over that pin's EXPECTED and WITNESS, every time with the stand-in
 *    reading heldShapeIds, a planted held member (the helper's hits with their line numbers dropped, G-H03's form): with the pin's
 *    own READ the passes break (the loud twin); with the residual's READ, from one source for the three passes, they break nothing
 *    (the quiet page); and with the residual's READ from a source made for each pass they break for R-CARRIED-STATE, whose quiet
 *    rides on the count its source carries, and break nothing for R-VALUE-AWARE, whose quiet does not. Falsifier: the residual's
 *    READ made to take its stand-in's return on every row (the quiet page silenced); the held member made to read every row as the
 *    helper does, or the denoInstallHits pin's own READ made one of the two residual forms (the loud twin silenced); one quiet row's
 *    READ swapped for the other's; each reds the quiet rows it reaches. The residual forms on the other four pins' READs are not
 *    read by them (RESIDUALS below).
 *  - "the registered tests and the reached pins: ..." - registered at the top level of this file after the readers' describe, so no
 *    modifier of that describe reaches it. It reads the vitest task tree: every other test of this file in run mode, not inverted
 *    and ran before it, titles unique and in order, every pin reached its compare in row order and then every quiet row its own.
 *    THE LAST WORD, this file's own afterAll, reads the same tree after every case has run, through the file task the top-level
 *    afterEach leaves after each case that ran (when none left it, the tree reads empty): the liveness case is registered once, in
 *    run mode, not inverted, and passed. Falsifier: a skipped, todo, failing-inverted or missing case at any level of this file -
 *    the readers' describe, a row's describe, a case, the liveness case itself - in each form vitest offers: the chained modifiers
 *    skip, todo, fails, skipIf and runIf, the options skip, todo and fails, and the context's skip() in a case or in a hook.
 *  - THE LAST WORD ON THE NAMESPACE, a second file-level afterAll: once every case has run, the helper's module namespace holds
 *    exactly the names it held as this file loaded it, each bound to the same value (Object.is). Falsifier: G2-A01 (its let export
 *    reads undefined at load and a function at the last word).
 *
 * THE CLAIMS, pin by pin (each clause is its pin's tables and nothing wider). Paths are planted under one scratch root and read back
 * with that root, and its realpath, written <root>. The falsifiers named are the one-edit members wb-70xe's refusals #3 (O:1718) and
 * #4 (O:1736) carried into this bead; each reds this census at the pins its clause names:
 *  - resolveOnPath (row ID): with the name deno, over each PATH_ROWS PATH, the join <entry>/deno of the first entry whose deno is an
 *    executable regular file (mode 0700) or a symlink to one, and undefined when no entry has one. The entry kinds (ENTRY_KINDS): a
 *    directory named deno, a symlink to a directory, a regular file of mode 0600, a symlink to a missing path, an entry holding no
 *    deno and an absent entry (the six PASSED_OVER kinds), then the two RESOLVING kinds. The PATHs: each kind alone; each passed-over
 *    kind before each resolving kind; the two resolving kinds in both orders; for every length n from 1 to PATH_BOUND and every index
 *    k below n, the passed-over kinds in turn before index k, an engine at k and resolving entries after it; the empty string and an
 *    unset PATH, read from this census's working directory (the repository root, which holds no deno). Falsifier: refusal #4's U2
 *    (G4-I-M3, the directory test read with lstatSync, so a symlink to a directory is returned).
 *  - shimReasons (row ID): over each MARK_ROWS engine, handed {resolved, realpath} with the realpath read by realpathSync from the
 *    resolved path, as provisionedDeno hands it, the reasons equal the row's, each row holding no reason or exactly one: the script
 *    reason for a regular deno whose bytes open with each SCRIPT_HEADS head, and none for each QUIET_HEADS head; the name reason, its
 *    realpath names <name>, not deno, for a deno that is a symlink to a file named each OTHER_NAMES name, and none for one named deno;
 *    the shims reason for a directory named shims d levels above the deno, for every d from 1 to DEPTH_BOUND, on the resolved path
 *    alone (a symlink there to an engine outside any shims directory), on the realpath alone (a symlink outside to an engine there)
 *    and on both (a regular file there); none for a directory named each NEAR_NAMES name one and two levels above a regular deno; and
 *    none for a regular engine and for a symlink through a linked directory to one. Falsifiers: refusal #3's U1 (SCRIPT_MAGIC "#!/"),
 *    U2 (both paths read in their last three segments only), U3 (the realpath name read with ".exe" stripped, or trimmed) and U6 (a
 *    segment that starts with shims), and refusal #4's U1 (G4-I-M1, the resolved path read at its parent only).
 *  - provisionedDeno (row ID): over the one-entry PATH of each MARK_ROWS engine (its resolved path's directory) and over each
 *    PATH_ROWS PATH: the returned {resolved, realpath} when the resolved engine carries no mark; the DenoIdentityRefusal whose reason
 *    is rf_tsx_deno_shim and whose message is, whole, "rf_tsx_deno_shim: the PATH-resolved deno <resolved> (realpath <realpath>) is a
 *    version-manager shim (<its reason>); executing it can install Deno over the network (rfc-3fhh4.28), so rf is never launched
 *    with it" when it carries one; and the DenoIdentityRefusal rf_tsx_deno_unresolved with its whole message when no entry resolves.
 *    Falsifiers: every member named for the two pins above, read through the composed reading wb-70xe's tier wires.
 *  - denoInstallScan (row SCAN): for the install line of each of the six shapes (INSTALL_LINES, one per shape, composed at run time
 *    so that no line of this file spells one), {lines, hits} reads {n, ["<k>:<shape>"]} with the line at line k of n lines of
 *    fillers, for every n from 1 to LINE_BOUND and every k from 1 to n; reads {k, ["<k>:<shape>"]} as the last of k lines for each
 *    FAR_LINES count; reads {2, ["2:<shape>"]} on the line after a filler line of each LONG_SIZES length, and {1, ["1:<shape>"]} at
 *    the end of a line holding that many filler characters and a space before it; reads {1, ["1:<shape>"]} led by each LEADS lead and
 *    {2, ["1:<shape>"]} followed by a newline; and reads {n, []} for n filler lines, n from 1 to LINE_BOUND, and {1, []} for the empty
 *    text. Falsifiers: refusal #3's U4 (d) (a line led by # never tested, still counted), and the scan-side forms of its U4 (a) (hits
 *    dropped in a text over 128 KiB) and U4 (b) (hits dropped past line 4096).
 *  - denoInstallHits (row SCAN): the same texts, the hits denoInstallScan reports. Falsifiers: the same members.
 *
 * WHAT THE BEAD CARRIES, item by item: refusal #3's U1 (the #! /bin/sh and #!sh witness pages), U2 (manager/shims/v2/bin/deno: shims
 * three levels up, depth 3 here, with every depth to DEPTH_BOUND), U3 (deno.exe and a trailing-space name, with a leading-space one)
 * and U6 (shims2 among NEAR_NAMES) are pinned above; its U4 (a), (b) and (d) are pinned at the scan, and its U4 (c) (hits in a
 * dot-named file) is a property of the lane walk's file names, which the scan never receives (NOT CLAIMED below); its U5 (the
 * residual table's row-level frozen shape) belongs to wb-70xe's lane census, which holds the residual table and is not on this tree;
 * this census's own residual list is QUIET, held to the header above. Refusal #4's U1 (a symlink at <x>/shims/v1/deno, shims two
 * levels up on the resolved path alone, to an engine outside any shims directory) and U2 (a symlink to a directory before an engine)
 * are pinned above; their tier pages are wb-70xe's tier wiring, NOT CLAIMED here. This bead's own refusal #1 (O:1840): its U1 (a
 * collection skip of the readers' describe, which also skipped the liveness case) is pinned by the liveness case standing outside
 * that describe and by the last word; its U2 (function exports in forms other than a named function declaration, and section marks
 * read by a line pattern over the raw text) by the anchor's parser and namespace reading; its U3 (READ bound to its handed reader by
 * this file's text alone) by the pin cases' binding passes. This bead's refusal #2 (O:1886), whose pin READ and ANCHOR claim sets
 * R-B405 froze: its U1 (READs that tell the passes apart by a count in the entry's own closure or by the runner's assertion count,
 * G2-B01 to G2-B05, under which the held members G-H03, G-D02 and G-P01 read green) is pinned by each pass building its own record
 * over the one planted tree before any assertion runs; its U2 (the late-bound let export G2-A01, beside its eager twin G2-A01t) by
 * the anchor's source reading and the last word on the namespace. The READ forms that tell the passes apart otherwise are the two
 * residuals below.
 *
 * NOT CLAIMED (scope sentences; no follow-up): every UNCLAIMED function export of the helper (the class DenoIdentityRefusal and the
 * functions echoPath, sha256Of and pinnedDenoDigest), every helper export whose value is not a function (each helper constant), and
 * a function reachable only as a member of an export (a class's static or instance member, a property of an object or an array);
 * for a pinned reader, every input outside its tables. For resolveOnPath: a name other
 * than deno, an entry kind outside ENTRY_KINDS (a FIFO, a socket, a device, a symlink loop, an entry the user may not search, an
 * executable the user may not read), an empty entry inside PATH, a relative entry, an empty PATH read from a working directory that
 * holds a deno, and a PATH longer than PATH_BOUND. For shimReasons and provisionedDeno: an engine carrying two or more marks (the
 * order and the joining of their reasons among them), a head in neither head table, a name outside OTHER_NAMES (a name that is not
 * printable ASCII among them), a shims directory more than DEPTH_BOUND levels above the deno, a NEAR_NAMES name more than two levels
 * above it or on one path only, a path that is not absolute, a symlink chain other than the planted ones, and an engine either half
 * cannot read (rf_tsx_deno_unreadable). For the scan: an install line other than the six planted (which spellings a shape reads is
 * wb-70xe's lane census's claim), a text holding more than one install line, a second hit on one line, a line past the planted
 * positions, a line longer than the largest LONG_SIZES length plus its install line, a lead outside LEADS, and a carriage return
 * before a newline. And the tier wiring of these readers, the lane walk and what it reads of file names, the residual families the
 * helper's header names for wb-70xe's lane census, and wb-70xe's docs07 row R10. For the pin cases: a READ whose choice reads what
 * differs between the passes without telling them apart (the clock, a random draw), so that it substitutes on a row a pass holds
 * to EXPECTED by chance alone. For the anchor: a namespace binding changed after the last words through a path the source reading
 * leaves open, a direct eval (biome's recommended noGlobalEval refuses one; this file does not read for it). For the liveness case
 * and the last word: a vitest run that selects none of this file's cases (a name
 * or line filter that matches none, a configuration that excludes the file) and a set of edits that skips every case of this file
 * at once (the readers' describe and the liveness case both); vitest then runs no case and no hook of the file.
 *
 * RESIDUALS (named families, each with its pinned quiet row, a case of its own): R-CARRIED-STATE, a READ that tells the passes apart
 * by state an earlier pass leaves - a count it keeps on globalThis or on what that reaches (process.env among them), on a table,
 * an array or a map of this file, on an imported module's objects, or on the planted tree (a file it writes, the tree's
 * descriptor, a time a read leaves on a file) - and takes its stand-in's return on the calls that pass makes sentinels alone, its
 * own expectation on every other row: the passes break nothing, so a held member under it is not read (the form of refusal #2's
 * G2-B01, its count moved out of the fresh record into state that outlives it). R-VALUE-AWARE, a READ that tells a sentinel from a
 * reading by what a call of its stand-in shows - the value it returns, a throw, how long it takes - and takes its stand-in's
 * return on the sentinel calls alone, its own expectation on every other row: the same (cut #2's NOT CLAIMED boundary W-B14, named
 * here). On the denoInstallHits pin either form reds through the quiet rows' loud twin, which reads that pin's own READ; on the
 * other four pins neither does.
 *
 * FROZEN SHAPE (standing rule 16): the two literals above, ROWS' ids and pin counts and QUIET's ids. THE ANCHORS outside this
 * file's literals: for ROWS, the helper's own source and its module namespace (its sections and its function exports, read as the
 * anchor case above says); for QUIET, this header's RESIDUALS paragraph (the ids) and its quotations of the quiet rows' titles.
 *
 * Display paths added: none. Test-only: nothing is executed, spawned or installed; the planted engines are text files under a
 * scratch root, and the helper's source is only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, mkdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { delimiter, dirname, join, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it, type RunnerTestFile } from "vitest";
import * as helper from "./helpers/rf-tsx-deno.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const HERE = dirname(fileURLToPath(import.meta.url));
const HELPER_PATH = join(HERE, "helpers", "rf-tsx-deno.ts");
const ENGINE = "deno";

const allocated: string[] = [];
afterEach(() => removeScratch(...allocated.splice(0)));

// ---- the bounds: every quantifier of the claims ranges over one of these, and NOT CLAIMED names what lies past them ----

/** The longest planted PATH: every positions row holds 1 to PATH_BOUND entries, the engine at every index. */
const PATH_BOUND = 8;
/** The deepest planted shims directory: a directory named shims 1 to DEPTH_BOUND levels above the deno. */
const DEPTH_BOUND = 8;
/** The longest planted text of the positions rows: 1 to LINE_BOUND lines, the install line at every line. */
const LINE_BOUND = 16;
/** The far positions: the install line as the last of this many lines. */
const FAR_LINES: readonly number[] = [2049, 4096, 4097, 8192];
/** The long fillers: this many characters on the line before the install line, or before it on its own line. */
const LONG_SIZES: readonly number[] = [65_536, 131_072, 131_073, 262_144];

/** The integers from `first` to `last`. */
function upTo(first: number, last: number): number[] {
  return Array.from({ length: last - first + 1 }, (_, index) => first + index);
}

// ---- the planted PATHs (resolveOnPath, provisionedDeno) ----

type EntryKind = "directory" | "directory-link" | "unexecutable" | "broken-link" | "no-deno" | "absent" | "engine" | "engine-link";
/** The kinds resolveOnPath passes over, then the kinds it resolves. */
const PASSED_OVER: readonly EntryKind[] = ["directory", "directory-link", "unexecutable", "broken-link", "no-deno", "absent"];
const RESOLVING: readonly EntryKind[] = ["engine", "engine-link"];
const ENTRY_KINDS: readonly EntryKind[] = [...PASSED_OVER, ...RESOLVING];

/** A planted PATH: entries of the given kinds, the empty string, or no PATH at all. */
type PlantedPath = { readonly form: "entries"; readonly kinds: readonly EntryKind[] } | { readonly form: "empty" } | { readonly form: "unset" };
interface PathRow {
  readonly key: string;
  readonly path: PlantedPath;
}
function entries(...kinds: EntryKind[]): PlantedPath {
  return { form: "entries", kinds };
}
/** The positions row of length `length` with the engine at `at`: passed-over kinds in turn before it, resolving kinds after it. */
function positioned(length: number, at: number): EntryKind[] {
  return upTo(0, length - 1).map(index => (index < at ? (PASSED_OVER[index % PASSED_OVER.length] ?? "absent") : index === at ? "engine" : (RESOLVING[index % RESOLVING.length] ?? "engine")));
}
const PATH_ROWS: readonly PathRow[] = [
  ...ENTRY_KINDS.map(kind => ({ key: `${kind} alone`, path: entries(kind) })),
  ...PASSED_OVER.flatMap(first => RESOLVING.map(second => ({ key: `${first} before ${second}`, path: entries(first, second) }))),
  { key: "engine before engine-link", path: entries("engine", "engine-link") },
  { key: "engine-link before engine", path: entries("engine-link", "engine") },
  ...upTo(1, PATH_BOUND).flatMap(length => upTo(0, length - 1).map(at => ({ key: `${length} entries, the engine at ${at}`, path: entries(...positioned(length, at)) }))),
  { key: "the empty PATH", path: { form: "empty" } },
  { key: "an unset PATH", path: { form: "unset" } },
];

// ---- the planted engines (shimReasons, provisionedDeno) ----

const SCRIPT_REASON = "it is a #! script, not the engine binary";
const SHIMS_REASON = "it sits in a shims directory";
function nameReason(name: string): string {
  return `its realpath names ${name}, not ${ENGINE}`;
}
/** Heads that open with the two bytes #! (each carries the script reason) and heads that do not (none). */
const SCRIPT_HEADS: readonly string[] = ["#!/bin/sh\n", "#! /bin/sh\n", "#!sh\n", "#!/usr/bin/env sh\n", "#!\n", "#!", "#!!\n", "#! \n"];
const QUIET_HEADS: readonly string[] = ["#\n", "# !/bin/sh\n", "!#/bin/sh\n", " #!/bin/sh\n", "\n#!/bin/sh\n", "##!/bin/sh\n", "#", ""];
/** Names a manager file planted behind a symlink named deno carries (each another name than deno). */
const OTHER_NAMES: readonly string[] = ["mise", "deno-shim", "Deno", "DENO", "mise-deno", "xdeno", "dino", "den", "denoo", "deno.exe", "deno.EXE", "deno.sh", "deno.", ".deno", "deno ", " deno", "deno~"];
/** Directory names that are not shims. */
const NEAR_NAMES: readonly string[] = ["Shims", "SHIMS", "shim", "myshims", "shims2", "shims.d", "shims-old", ".shims", "shimss"];
/** The bytes of every planted engine: a text file with no #! head, never executed. */
const ENGINE_BYTES = "engine stand-in: a text file this census plants and never runs\n";

/** One planted file or symlink, relative to the scratch root; a link's target is relative to the root as well. */
type Plant = { readonly file: string; readonly bytes: string; readonly mode: number } | { readonly link: string; readonly target: string };
interface MarkRow {
  readonly key: string;
  readonly resolved: string;
  readonly realpath: string;
  readonly plants: readonly Plant[];
  readonly reasons: readonly string[];
}
function engineFile(file: string, bytes: string = ENGINE_BYTES): Plant {
  return { file, bytes, mode: 0o700 };
}
/** The path of a deno `depth` levels below a directory named `name`: name, then v1 ... v(depth - 1), then deno. */
function below(name: string, depth: number): string {
  return [name, ...upTo(1, depth - 1).map(index => `v${index}`), ENGINE].join("/");
}
function headRow(group: string, index: number, head: string, reasons: readonly string[]): MarkRow {
  const file = `${group}/${index}/bin/${ENGINE}`;
  return { key: `${group} head ${JSON.stringify(head)}`, resolved: file, realpath: file, plants: [engineFile(file, head.endsWith("\n") ? `${head}exit 0\n` : head)], reasons };
}
function nameRow(index: number, name: string): MarkRow {
  const manager = `name/${index}/manager/${name}`;
  const link = `name/${index}/bin/${ENGINE}`;
  return { key: `a symlink to a file named ${JSON.stringify(name)}`, resolved: link, realpath: manager, plants: [engineFile(manager), { link, target: manager }], reasons: name === ENGINE ? [] : [nameReason(name)] };
}
function depthRows(depth: number): MarkRow[] {
  const resolvedLink = `depth/${depth}/resolved/${below("shims", depth)}`;
  const resolvedTarget = `depth/${depth}/resolved-target/${ENGINE}`;
  const realTarget = `depth/${depth}/realpath/${below("shims", depth)}`;
  const realLink = `depth/${depth}/realpath-link/${ENGINE}`;
  const both = `depth/${depth}/both/${below("shims", depth)}`;
  return [
    { key: `shims ${depth} up, the resolved path alone`, resolved: resolvedLink, realpath: resolvedTarget, plants: [engineFile(resolvedTarget), { link: resolvedLink, target: resolvedTarget }], reasons: [SHIMS_REASON] },
    { key: `shims ${depth} up, the realpath alone`, resolved: realLink, realpath: realTarget, plants: [engineFile(realTarget), { link: realLink, target: realTarget }], reasons: [SHIMS_REASON] },
    { key: `shims ${depth} up, both paths`, resolved: both, realpath: both, plants: [engineFile(both)], reasons: [SHIMS_REASON] },
  ];
}
function nearRow(index: number, name: string, depth: number): MarkRow {
  const file = `near/${index}/${depth}/${below(name, depth)}`;
  return { key: `${JSON.stringify(name)} ${depth} up, both paths`, resolved: file, realpath: file, plants: [engineFile(file)], reasons: [] };
}
const CHAIN_ENGINE = `clean/chain/tools/2.9.7/bin/${ENGINE}`;
const MARK_ROWS: readonly MarkRow[] = [
  ...SCRIPT_HEADS.map((head, index) => headRow("script", index, head, [SCRIPT_REASON])),
  ...QUIET_HEADS.map((head, index) => headRow("quiet", index, head, [])),
  ...[...OTHER_NAMES, ENGINE].map((name, index) => nameRow(index, name)),
  ...upTo(1, DEPTH_BOUND).flatMap(depthRows),
  ...NEAR_NAMES.flatMap((name, index) => [1, 2].map(depth => nearRow(index, name, depth))),
  { key: "a regular engine", resolved: `clean/file/${ENGINE}`, realpath: `clean/file/${ENGINE}`, plants: [engineFile(`clean/file/${ENGINE}`)], reasons: [] },
  {
    key: "a symlink through a linked directory to an engine",
    resolved: `clean/chain/bin/${ENGINE}`,
    realpath: CHAIN_ENGINE,
    plants: [engineFile(CHAIN_ENGINE), { link: "clean/chain/current", target: "clean/chain/tools/2.9.7" }, { link: `clean/chain/bin/${ENGINE}`, target: `clean/chain/current/bin/${ENGINE}` }],
    reasons: [],
  },
];

// ---- the planted texts (denoInstallScan, denoInstallHits) ----

/** One install line per shape, composed from parts at run time so that no line of this file spells one. */
const INSTALL_LINES: readonly { readonly shape: string; readonly line: string }[] = [
  { shape: "I1", line: ["curl -fsSL https://", "deno", ".land/install.sh | sh"].join("") },
  { shape: "I2", line: ["curl -fsSLO https://dl.", "deno", ".land/release/v2.9.7/deno-x86_64-unknown-linux-gnu.zip"].join("") },
  { shape: "I3", line: ["mi", "se use -g deno@2.9.7"].join("") },
  { shape: "I4", line: ["np", "m install -g deno"].join("") },
  { shape: "I5", line: ["den", "o upgrade"].join("") },
  { shape: "I6", line: ["uses: denoland/setup", "-deno@v2"].join("") },
];
const LEADS: readonly string[] = ["#", "# ", "##", "#!", "  ", "// ", "- "];
function filler(line: number): string {
  return `filler line ${line}`;
}
/** `count` lines, the given line at `at` (from 1) and fillers elsewhere, joined with no newline after the last. */
function textWith(count: number, at: number, line: string): string {
  return upTo(1, count)
    .map(index => (index === at ? line : filler(index)))
    .join("\n");
}
interface TextRow {
  readonly key: string;
  readonly text: string;
  readonly lines: number;
  readonly hits: readonly string[];
}
const TEXT_ROWS: readonly TextRow[] = [
  ...INSTALL_LINES.flatMap(({ shape, line }) => [
    ...upTo(1, LINE_BOUND).flatMap(count => upTo(1, count).map(at => ({ key: `${shape} at line ${at} of ${count}`, text: textWith(count, at, line), lines: count, hits: [`${at}:${shape}`] }))),
    ...FAR_LINES.map(count => ({ key: `${shape} as the last of ${count} lines`, text: textWith(count, count, line), lines: count, hits: [`${count}:${shape}`] })),
    ...LONG_SIZES.flatMap(size => [
      { key: `${shape} after a filler line of ${size} characters`, text: `${"x".repeat(size)}\n${line}`, lines: 2, hits: [`2:${shape}`] },
      { key: `${shape} after ${size} filler characters on its line`, text: `${"x".repeat(size)} ${line}`, lines: 1, hits: [`1:${shape}`] },
    ]),
    ...LEADS.map(lead => ({ key: `${shape} led by ${JSON.stringify(lead)}`, text: `${lead}${line}`, lines: 1, hits: [`1:${shape}`] })),
    { key: `${shape} followed by a newline`, text: `${line}\n`, lines: 2, hits: [`1:${shape}`] },
  ]),
  ...upTo(1, LINE_BOUND).map(count => ({ key: `${count} filler lines`, text: textWith(count, 0, ""), lines: count, hits: [] })),
  { key: "the empty text", text: "", lines: 1, hits: [] },
];

// ---- planting and reading back ----

interface Planted {
  readonly root: string;
  readonly realRoot: string;
}
/** A fresh scratch root holding every planted PATH entry and engine. */
function plantAll(): Planted {
  const root = makeScratch("deno-identity-");
  allocated.push(root);
  const realRoot = realpathSync(root);
  if ([...root.split(sep), ...realRoot.split(sep)].includes("shims") || !/^[\x20-\x7e]{1,3000}$/.test(`${root}${realRoot}`)) {
    throw new Error(`the scratch root ${JSON.stringify(root)} would read as a planted mark`);
  }
  const plant = (entry: Plant): void => {
    const at = join(root, "file" in entry ? entry.file : entry.link);
    mkdirSync(dirname(at), { recursive: true });
    if ("file" in entry) {
      writeFileSync(at, entry.bytes);
      chmodSync(at, entry.mode);
    } else {
      symlinkSync(join(root, entry.target), at);
    }
  };
  mkdirSync(join(root, "targets", "a-directory"), { recursive: true });
  for (const [row, { path }] of PATH_ROWS.entries()) {
    if (path.form !== "entries") continue;
    for (const [index, kind] of path.kinds.entries()) {
      const entry = `path/${row}/${index}`;
      const deno = `${entry}/${ENGINE}`;
      if (kind === "absent") continue;
      if (kind === "no-deno") mkdirSync(join(root, entry), { recursive: true });
      else if (kind === "directory") mkdirSync(join(root, deno), { recursive: true });
      else if (kind === "directory-link") plant({ link: deno, target: "targets/a-directory" });
      else if (kind === "unexecutable") plant({ file: deno, bytes: ENGINE_BYTES, mode: 0o600 });
      else if (kind === "broken-link") plant({ link: deno, target: "targets/missing" });
      else if (kind === "engine") plant(engineFile(deno));
      else {
        plant(engineFile(`${entry}-target/${ENGINE}`));
        plant({ link: deno, target: `${entry}-target/${ENGINE}` });
      }
    }
  }
  for (const row of MARK_ROWS) for (const entry of row.plants) plant(entry);
  return { root, realRoot };
}
/** The PATH a row plants, under `root`. */
function pathOf(planted: Planted, row: number, path: PlantedPath): string | undefined {
  if (path.form === "unset") return undefined;
  if (path.form === "empty") return "";
  return path.kinds.map((_, index) => join(planted.root, "path", String(row), String(index))).join(delimiter);
}
/** `value` as its JSON reads it back, with the root and its realpath written <root> (undefined read as null). */
function rooted(planted: Planted, value: unknown): unknown {
  return JSON.parse((JSON.stringify(value ?? null) ?? "null").split(planted.realRoot).join("<root>").split(planted.root).join("<root>")) as unknown;
}
/** What a reading returned, or the error it threw, as a JSON value. */
function outcome(planted: Planted, read: () => unknown): unknown {
  try {
    return { returned: rooted(planted, read()) };
  } catch (error) {
    if (error instanceof helper.DenoIdentityRefusal) return { refused: rooted(planted, { name: error.name, reason: error.reason, message: error.message }) };
    return { threw: rooted(planted, error instanceof Error ? { name: error.name, message: error.message } : String(error)) };
  }
}

// ---- the expectations, built from the tables without the helper ----

/** The PATH a row resolves to: the first resolving entry's deno and the file it names, or none. */
function resolutionOf(row: number, path: PlantedPath): { readonly resolved: string; readonly realpath: string } | null {
  if (path.form !== "entries") return null;
  const index = path.kinds.findIndex(kind => RESOLVING.includes(kind));
  const kind = path.kinds[index];
  if (kind === undefined) return null;
  const entry = `<root>/path/${row}/${index}`;
  return { resolved: `${entry}/${ENGINE}`, realpath: kind === "engine" ? `${entry}/${ENGINE}` : `${entry}-target/${ENGINE}` };
}
const UNRESOLVED_MESSAGE = "rf_tsx_deno_unresolved: no executable deno on PATH; the operator provisions the pinned Deno (RFCLI ruling A4) and puts its bin directory first on PATH";
function shimMessage(resolved: string, realpath: string, reasons: readonly string[]): string {
  return `rf_tsx_deno_shim: the PATH-resolved deno ${resolved} (realpath ${realpath}) is a version-manager shim (${reasons.join("; ")}); executing it can install Deno over the network (rfc-3fhh4.28), so rf is never launched with it`;
}
function refusedAs(reason: string, message: string): unknown {
  return { refused: { name: "DenoIdentityRefusal", reason, message } };
}
function markOutcome(row: MarkRow): unknown {
  const resolved = `<root>/${row.resolved}`;
  const realpath = `<root>/${row.realpath}`;
  return row.reasons.length === 0 ? { returned: { resolved, realpath } } : refusedAs("rf_tsx_deno_shim", shimMessage(resolved, realpath, row.reasons));
}

// ---- the rows, the readings, the expectations and the witnesses ----

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** Each row is a helper section (its `// ---- <title> ----` line); its pins are the section's claimed exported functions. */
const ROWS: readonly Row[] = [
  { id: "ID", label: "the identity reading", pins: ["resolveOnPath", "shimReasons", "provisionedDeno"] },
  { id: "SCAN", label: "the install-shape read", pins: ["denoInstallScan", "denoInstallHits"] },
];
/** Each section's function exports no row claims, in the helper's order. */
const UNCLAIMED: Readonly<Record<string, readonly string[]>> = {
  "the identity reading": ["DenoIdentityRefusal", "echoPath"],
  "the digest half": ["sha256Of", "pinnedDenoDigest"],
};

/** A pin's reading: handed the stand-in reader its pin case makes with handedReader, and the case's one planted tree. */
type ReadFn = (reader: unknown, planted: Planted) => unknown;
/**
 * Each pin's reading (READ), in a record built afresh by every call: each pass of a pin case calls readings() once and reads its
 * pin's entry, so no closure an entry makes lives from one pass into the next.
 */
const readings = (): Readonly<Record<string, ReadFn>> => ({
  resolveOnPath: (reader, planted) => {
    const read = reader as typeof helper.resolveOnPath;
    return PATH_ROWS.map((row, index) => ({ key: row.key, read: rooted(planted, read(ENGINE, pathOf(planted, index, row.path))) }));
  },
  shimReasons: (reader, planted) => {
    const read = reader as typeof helper.shimReasons;
    return MARK_ROWS.map(row => {
      const resolved = join(planted.root, row.resolved);
      return { key: row.key, read: outcome(planted, () => read({ resolved, realpath: realpathSync(resolved) })) };
    });
  },
  provisionedDeno: (reader, planted) => {
    const read = reader as typeof helper.provisionedDeno;
    return [
      ...MARK_ROWS.map(row => ({ key: row.key, read: outcome(planted, () => read(dirname(join(planted.root, row.resolved)))) })),
      ...PATH_ROWS.map((row, index) => ({ key: row.key, read: outcome(planted, () => read(pathOf(planted, index, row.path))) })),
    ];
  },
  denoInstallScan: reader => {
    const read = reader as typeof helper.denoInstallScan;
    return TEXT_ROWS.map(row => ({ key: row.key, read: JSON.parse(JSON.stringify(read(row.text))) as unknown }));
  },
  denoInstallHits: reader => {
    const read = reader as typeof helper.denoInstallHits;
    return TEXT_ROWS.map(row => ({ key: row.key, read: read(row.text) }));
  },
});

const EXPECTED: Readonly<Record<string, () => unknown>> = {
  resolveOnPath: () => PATH_ROWS.map((row, index) => ({ key: row.key, read: resolutionOf(index, row.path)?.resolved ?? null })),
  shimReasons: () => MARK_ROWS.map(row => ({ key: row.key, read: { returned: [...row.reasons] } })),
  provisionedDeno: () => [
    ...MARK_ROWS.map(row => ({ key: row.key, read: markOutcome(row) })),
    ...PATH_ROWS.map((row, index) => {
      const resolution = resolutionOf(index, row.path);
      return { key: row.key, read: resolution === null ? refusedAs("rf_tsx_deno_unresolved", UNRESOLVED_MESSAGE) : { returned: resolution } };
    }),
  ],
  denoInstallScan: () => TEXT_ROWS.map(row => ({ key: row.key, read: { lines: row.lines, hits: [...row.hits] } })),
  denoInstallHits: () => TEXT_ROWS.map(row => ({ key: row.key, read: [...row.hits] })),
};

/** Each pin's witness: the first 16 hex digits of the sha256 of its reading's JSON. */
const WITNESS: Readonly<Record<string, string>> = {
  resolveOnPath: "84995e9609afa310",
  shimReasons: "2d7cfcc376f64f3e",
  provisionedDeno: "b512c27dcea4e536",
  denoInstallScan: "571507c43d380fa4",
  denoInstallHits: "687ea73538d0da94",
};

function plain(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value)) as unknown;
}
function digest(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);
}

// ---- the handed reader: the reading pass and the two binding passes ----

/** The sentinel the binding pass's stand-in returns on its `call`-th call (from 0) for `pin`. */
function sentinel(pin: string, call: number): string {
  return `wb-j4sm binding sentinel ${pin} ${call}`;
}
/** Every sentinel a value's JSON carries, in order. */
function sentinelsIn(value: unknown): string[] {
  return [...(JSON.stringify(value) ?? "").matchAll(/wb-j4sm binding sentinel \S+ \d+/g)].map(match => match[0]);
}
/**
 * The reader a pin case hands READ, made by this one factory for every pass so that READ cannot tell the passes apart by what it
 * is handed: its n-th call (from 0) returns sentinel(pin, n) when `sentinelAt(n)`, and otherwise `target`'s own result for its
 * arguments (`target` is the helper's export under the pin's name). `calls` counts the calls.
 */
function handedReader(pin: string, target: unknown, sentinelAt: (call: number) => boolean, calls: { count: number }): (...args: unknown[]) => unknown {
  return (...args: unknown[]): unknown => {
    const call = calls.count;
    calls.count += 1;
    return typeof target === "function" && !sentinelAt(call) ? Reflect.apply(target, undefined, args) : sentinel(pin, call);
  };
}
/**
 * The three passes of a pin case, in order: the reading pass (no sentinel), then the two binding passes, whose stand-in returns a
 * sentinel on its even calls in one and on its odd calls in the other.
 */
const PASSES: readonly { readonly label: string; readonly binding: boolean; readonly sentinelAt: (call: number) => boolean }[] = [
  { label: "reading", binding: false, sentinelAt: () => false },
  { label: "even", binding: true, sentinelAt: call => call % 2 === 0 },
  { label: "odd", binding: true, sentinelAt: call => call % 2 === 1 },
];
interface ReadRow {
  readonly key: string;
  readonly read: unknown;
}
/** A reading's rows: every READ returns one { key, read } per table row, in table order. */
function rowsOf(reading: unknown): ReadRow[] {
  if (!Array.isArray(reading)) throw new Error("a reading is an array of rows");
  return reading.map((entry: unknown) => {
    if (typeof entry !== "object" || entry === null || !("key" in entry) || typeof entry.key !== "string" || !("read" in entry)) {
      throw new Error(`a reading row is no { key, read }: ${JSON.stringify(entry)}`);
    }
    return { key: entry.key, read: entry.read };
  });
}
/** One pass of a pin case: the pass, how many times READ called its stand-in, and READ's reading as its JSON reads back. */
interface PassRun {
  readonly label: string;
  readonly binding: boolean;
  readonly sentinelAt: (call: number) => boolean;
  readonly calls: number;
  readonly reading: unknown;
}
/**
 * The three passes, run in PASSES order from this one call site before the case asserts anything: each takes the READ that `fresh`
 * builds for it alone, handed a stand-in from handedReader over `target` (its own call count) and the one planted tree.
 */
function passRuns(pin: string, fresh: () => ReadFn | undefined, target: unknown, planted: Planted): PassRun[] {
  return PASSES.map(pass => {
    const calls = { count: 0 };
    const read = fresh();
    const reading = read === undefined ? null : plain(read(handedReader(pin, target, pass.sentinelAt, calls), planted));
    return { ...pass, calls: calls.count, reading };
  });
}
/**
 * What the passes break, one line per broken check (none when every check holds): the passes are one reading pass and two binding
 * passes in which every call is a sentinel exactly once; each pass calls its stand-in once per row; the reading pass's reading
 * strictly equals `want` and its sha256 prefix is `witness`; in each binding pass each sentinel row carries its own call's sentinel
 * and no other, and every other row strictly equals its `want` row.
 */
function passFailures(pin: string, runs: readonly PassRun[], want: unknown, witness: string | undefined): string[] {
  const rows = rowsOf(want);
  const binding = runs.filter(run => run.binding);
  const failures: string[] = [];
  const unbound = rows.filter((_, call) => binding.filter(run => run.sentinelAt(call)).length !== 1).length;
  if (runs.length !== 3 || binding.length !== 2 || unbound > 0) failures.push(`${pin}: ${runs.length} passes, ${binding.length} binding, ${unbound} calls not a sentinel exactly once`);
  for (const run of runs) {
    if (run.calls !== rows.length) failures.push(`${pin}: the ${run.label} pass calls its stand-in ${run.calls} times for ${rows.length} rows`);
    if (!run.binding) {
      if (!isDeepStrictEqual(run.reading, want)) failures.push(`${pin}: the ${run.label} pass's reading is not its EXPECTED reading`);
      if (digest(run.reading) !== witness) failures.push(`${pin}'s witness: the ${run.label} pass reads ${digest(run.reading)}, not ${String(witness)}`);
      continue;
    }
    const bound = rowsOf(run.reading).map((entry, call) => (run.sentinelAt(call) ? { key: entry.key, sentinels: sentinelsIn(entry.read) } : entry));
    const held = rows.map((entry, call) => (run.sentinelAt(call) ? { key: entry.key, sentinels: [sentinel(pin, call)] } : entry));
    const broken = held.filter((entry, call) => !isDeepStrictEqual(bound[call], entry)).length + Math.max(0, bound.length - held.length);
    if (broken > 0) failures.push(`${pin}: the ${run.label} binding pass breaks ${broken} rows (a sentinel row not carrying exactly its own call's sentinel, or another row not its EXPECTED row)`);
  }
  return failures;
}

// ---- the anchor: the helper's own source and its module namespace ----

interface Section {
  readonly title: string;
  readonly functions: string[];
}
const SECTION_MARK = /^\/\/ ---- (.+) ----$/;
/** The helper's module namespace as this file loads it: each export name and its value (the last word reads it again). */
const NAMESPACE: ReadonlyMap<string, unknown> = new Map(Object.entries(helper));
/** The names a binding declares: an identifier, or every identifier of a destructuring pattern. */
function bindingNames(name: ts.BindingName): string[] {
  if (ts.isIdentifier(name)) return [name.text];
  return name.elements.flatMap(element => (ts.isOmittedExpression(element) ? [] : bindingNames(element.name)));
}
/**
 * The names a top-level statement of the helper exports, as the TypeScript parser reads it: an export list (with or without a from
 * clause; a namespace re-export under its name), an export default expression (default), and an export modifier on a function,
 * class, variable, enum or namespace declaration (a default one under the name default). None for a type-only export, an ambient
 * declaration, an overload signature or a statement that exports nothing.
 */
function exportedNames(statement: ts.Statement): string[] {
  if (ts.isExportDeclaration(statement)) {
    const clause = statement.exportClause;
    if (statement.isTypeOnly || clause === undefined) return [];
    if (ts.isNamespaceExport(clause)) return [clause.name.text];
    return clause.elements.filter(element => !element.isTypeOnly).map(element => element.name.text);
  }
  if (ts.isExportAssignment(statement)) return statement.isExportEquals === true ? [] : ["default"];
  const modifiers = ts.canHaveModifiers(statement) ? (ts.getModifiers(statement) ?? []) : [];
  const has = (kind: ts.SyntaxKind): boolean => modifiers.some(modifier => modifier.kind === kind);
  if (!has(ts.SyntaxKind.ExportKeyword) || has(ts.SyntaxKind.DeclareKeyword)) return [];
  const own = (name: ts.Identifier | undefined): string[] => [has(ts.SyntaxKind.DefaultKeyword) ? "default" : (name?.text ?? "default")];
  if (ts.isFunctionDeclaration(statement)) return statement.body === undefined ? [] : own(statement.name);
  if (ts.isClassDeclaration(statement)) return own(statement.name);
  if (ts.isVariableStatement(statement)) return statement.declarationList.declarations.flatMap(declaration => bindingNames(declaration.name));
  if (ts.isEnumDeclaration(statement) || ts.isModuleDeclaration(statement)) return [statement.name.text];
  return [];
}
/**
 * What the anchor refuses in the helper's own source, one line each (none when it holds): a top-level variable statement whose
 * declaration list is not a plain const (a let, a var, a using), a var declaration anywhere (one in a block or a loop head at the
 * top level binds a module name), an import declaration of anything but a node: built-in module, an import-equals declaration,
 * an export declaration with a from clause, and the characters @ts- anywhere in its text (a directive that would silence a type
 * error). Under them every name the helper's module namespace holds is bound by a const, a
 * function, a class, an enum or a namespace declaration of its own, each a binding tsc refuses to assign (TS2588, TS2630, TS2629,
 * TS2628, TS2631).
 */
function helperRefusals(): string[] {
  const text = readFileSync(HELPER_PATH, "utf8");
  const file = ts.createSourceFile(HELPER_PATH, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const refusals: string[] = [];
  for (const statement of file.statements) {
    const at = `:${file.getLineAndCharacterOfPosition(statement.getStart(file)).line + 1}`;
    if (ts.isVariableStatement(statement) && (statement.declarationList.flags & ts.NodeFlags.BlockScoped) !== ts.NodeFlags.Const) refusals.push(`${at} a top-level variable statement that is no plain const`);
    if (ts.isImportDeclaration(statement) && !(ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text.startsWith("node:"))) refusals.push(`${at} an import of a module that is no node: built-in`);
    if (ts.isImportEqualsDeclaration(statement)) refusals.push(`${at} an import-equals declaration`);
    if (ts.isExportDeclaration(statement) && statement.moduleSpecifier !== undefined) refusals.push(`${at} an export declaration with a from clause`);
  }
  const varsIn = (node: ts.Node): void => {
    if (ts.isVariableDeclarationList(node) && (node.flags & ts.NodeFlags.BlockScoped) === 0) {
      refusals.push(`:${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1} a var declaration`);
    }
    ts.forEachChild(node, varsIn);
  };
  varsIn(file);
  if (text.includes("@ts-")) refusals.push("the characters @ts- in its text");
  return refusals;
}
/** The quiet rows' titles this file's header quotes, in order: each "R-<family>: ..." quotation, read with its line breaks joined. */
function headerQuietTitles(): string[] {
  const header = (/^\/\*\*([\s\S]*?)\*\//.exec(readFileSync(fileURLToPath(import.meta.url), "utf8"))?.[1] ?? "").replace(/\n \*\s*/g, " ");
  return [...header.matchAll(/"(R-[A-Z]+(?:-[A-Z]+)*: [^"]+)"/g)].map(match => match[1] ?? "");
}
/** The residual ids this file's header names, in order: its RESIDUALS paragraph, read from this file's own text. */
function headerResiduals(): string[] {
  const header = /^\/\*\*([\s\S]*?)\*\//.exec(readFileSync(fileURLToPath(import.meta.url), "utf8"))?.[1] ?? "";
  const paragraph = /\n \* RESIDUALS \(([\s\S]*?)\n \*\n/.exec(header)?.[1] ?? "";
  return [...new Set(paragraph.match(/\bR-[A-Z]+(?:-[A-Z]+)*\b/g) ?? [])];
}

// ---- the residuals' quiet rows: the denoInstallHits pin's passes over a planted held member ----

/** The pin the quiet rows read: its tables, its EXPECTED and its WITNESS are its pin case's own. */
const QUIET_PIN = "denoInstallHits";
/** A planted held member (G-H03's form): the helper's hits with their line numbers dropped, so every row holding a hit reads wrong. */
function heldShapeIds(text: string): string[] {
  return helper.denoInstallHits(text).map(hit => hit.slice(hit.indexOf(":") + 1));
}
/** What a residual's READ substitutes on a row: that row's own expectation. */
function ownHits(index: number): string[] {
  return [...(TEXT_ROWS[index]?.hits ?? [])];
}
interface Quiet {
  readonly id: string;
  readonly title: string;
  /** A source of the residual's READ, made once per quiet row: each call builds one pass's READ, and what the source holds outlives them. */
  readonly source: () => () => ReadFn;
  /** Whether the READ's quiet rides on what its source carries across the passes: with a source made for each pass, it breaks them. */
  readonly carried: boolean;
}
/** Each residual's quiet row: its id, its case title and the READ form the three passes read quiet. */
const QUIET: readonly Quiet[] = [
  {
    id: "R-CARRIED-STATE",
    title: "R-CARRIED-STATE: a READ that counts its passes in state outliving them keeps its stand-in's value on the sentinel calls alone, and the passes read it quiet over a held member",
    source: () => {
      const carried = { passes: 0 };
      return () => reader => {
        const pass = PASSES[carried.passes];
        carried.passes += 1;
        const read = reader as typeof helper.denoInstallHits;
        return TEXT_ROWS.map((row, index) => {
          const handed = read(row.text);
          return { key: row.key, read: pass?.sentinelAt(index) === true ? handed : ownHits(index) };
        });
      };
    },
    carried: true,
  },
  {
    id: "R-VALUE-AWARE",
    title: "R-VALUE-AWARE: a READ that tells a sentinel from a reading by the value its stand-in returns keeps the sentinels alone, and the passes read it quiet over a held member",
    source: () => () => reader => {
      const read = reader as (text: string) => unknown;
      return TEXT_ROWS.map((row, index) => {
        const handed = read(row.text);
        return { key: row.key, read: typeof handed === "string" ? handed : ownHits(index) };
      });
    },
    carried: false,
  },
];

/**
 * The helper's sections, in order: each `// ---- <title> ----` line comment among the leading comments of a top-level statement or
 * of the end of file (ts.getLeadingCommentRanges), and the function exports placed in it - every name a statement after the mark
 * exports (exportedNames) whose value in the module namespace is a function.
 */
function helperSections(): Section[] {
  const text = readFileSync(HELPER_PATH, "utf8");
  const file = ts.createSourceFile(HELPER_PATH, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const sections: Section[] = [];
  const marksAt = (position: number): void => {
    for (const range of ts.getLeadingCommentRanges(text, position) ?? []) {
      const mark = range.kind === ts.SyntaxKind.SingleLineCommentTrivia ? SECTION_MARK.exec(text.slice(range.pos, range.end)) : null;
      if (mark !== null) sections.push({ title: mark[1] ?? "", functions: [] });
    }
  };
  for (const statement of file.statements) {
    marksAt(statement.pos);
    for (const name of exportedNames(statement)) {
      if (typeof NAMESPACE.get(name) !== "function") continue;
      const section = sections.at(-1);
      if (section === undefined) throw new Error(`the helper exports ${name} before its first section`);
      section.functions.push(name);
    }
  }
  marksAt(file.endOfFileToken.pos);
  return sections;
}

const REACHED: string[] = [];
const FROZEN_TITLE = "the frozen shape: the rows' ids and pin counts, one reading, one expectation and one witness per pin, and the quiet rows the header's residuals name";
const ANCHOR_TITLE = "the helper anchor: the helper's source binds every export by a declaration tsc refuses to assign, each row is a helper section, and every function its module namespace exports is placed in one section as its pin or UNCLAIMED";
const LIVENESS_TITLE = "the registered tests and the reached pins: every other test in run mode, not inverted and ran before this case, and every pin reached its compare in row order";

describe("wb-j4sm identity census: 5 readers of test/helpers/rf-tsx-deno.ts over planted PATHs, engines and texts", () => {
  it(FROZEN_TITLE, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["ID:3", "SCAN:2"]);
    const pins = ROWS.flatMap(row => row.pins);
    expect(Object.keys(readings()).sort(), "one reading per pin").toEqual([...pins].sort());
    expect(Object.keys(EXPECTED).sort(), "one expectation per pin").toEqual([...pins].sort());
    expect(Object.keys(WITNESS).sort(), "one witness per pin").toEqual([...pins].sort());
    expect(
      QUIET.map(quiet => quiet.id),
      "the residuals' quiet rows",
    ).toEqual(["R-CARRIED-STATE", "R-VALUE-AWARE"]);
    expect(headerResiduals(), "the residuals this file's header names, in order, are the quiet rows'").toEqual(QUIET.map(quiet => quiet.id));
    expect(headerQuietTitles(), "the quiet rows' titles this file's header quotes, in order").toEqual(QUIET.map(quiet => quiet.title));
  });

  it(ANCHOR_TITLE, () => {
    expect(helperRefusals(), "what the anchor refuses in the helper's source").toEqual([]);
    const sections = helperSections();
    const titles = sections.map(section => section.title);
    expect(
      ROWS.map(row => row.label).filter(label => !titles.includes(label)),
      "row labels that are no helper section title",
    ).toEqual([]);
    expect(
      Object.keys(UNCLAIMED).filter(title => !titles.includes(title)),
      "UNCLAIMED keys that are no helper section title",
    ).toEqual([]);
    const order = ROWS.map(row => titles.indexOf(row.label));
    expect(order, "the rows stand in the helper's section order").toEqual([...order].sort((a, b) => a - b));
    const functions = [...NAMESPACE].filter(([, value]) => typeof value === "function").map(([name]) => name);
    expect(
      sections.flatMap(section => section.functions).sort(),
      "the helper's function exports (its module namespace), each placed in exactly one section",
    ).toEqual([...functions].sort());
    for (const section of sections) {
      const unclaimed = UNCLAIMED[section.title] ?? [];
      expect(
        section.functions.filter(name => !unclaimed.includes(name)),
        `${section.title}: its function exports not UNCLAIMED are its row's pins, in the helper's order`,
      ).toEqual(ROWS.find(row => row.label === section.title)?.pins ?? []);
      expect(
        unclaimed.filter(name => !section.functions.includes(name)),
        `${section.title}: UNCLAIMED names it does not export`,
      ).toEqual([]);
    }
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, () => {
          const reader: unknown = Object.entries(helper).find(([name]) => name === pin)?.[1];
          const planted = plantAll();
          const runs = passRuns(pin, () => readings()[pin], reader, planted);
          const expected = EXPECTED[pin];
          expect(
            { read: typeof readings()[pin], expected: typeof expected, reader: typeof reader },
            `${pin}: a reading, an expectation and a helper export of the pin's name`,
          ).toEqual({ read: "function", expected: "function", reader: "function" });
          const want = expected === undefined ? undefined : plain(expected());
          expect(passFailures(pin, runs, want, WITNESS[pin]), `${pin}: the reading pass and the two binding passes`).toEqual([]);
          REACHED.push(pin);
        });
      }
    });
  }

  describe("the residuals' quiet rows: the denoInstallHits pin's three passes over a planted held member", () => {
    for (const quiet of QUIET) {
      it(quiet.title, { timeout: 60_000 }, () => {
        const planted = plantAll();
        const expected = EXPECTED[QUIET_PIN];
        const want = expected === undefined ? undefined : plain(expected());
        const loud = passFailures(QUIET_PIN, passRuns(QUIET_PIN, () => readings()[QUIET_PIN], heldShapeIds, planted), want, WITNESS[QUIET_PIN]);
        const read = quiet.source();
        const silent = passFailures(QUIET_PIN, passRuns(QUIET_PIN, read, heldShapeIds, planted), want, WITNESS[QUIET_PIN]);
        const rebuilt = passFailures(QUIET_PIN, passRuns(QUIET_PIN, () => quiet.source()(), heldShapeIds, planted), want, WITNESS[QUIET_PIN]);
        expect(
          { loud: loud.length > 0, quiet: silent, rebuiltLoud: rebuilt.length > 0 },
          `${quiet.id}: the pin's own READ breaks the passes over the held member (the loud twin), the residual's READ breaks none, and with a source made for each pass it breaks them exactly when its quiet rides on carried state`,
        ).toEqual({ loud: true, quiet: [], rebuiltLoud: quiet.carried });
        REACHED.push(quiet.id);
      });
    }
  });
});

// The liveness case stands at the top level of the file, after the readers' describe, so no modifier of that describe reaches it.
it(LIVENESS_TITLE, ({ task }) => {
  const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
  const walk = (tasks: typeof task.file.tasks): void => {
    for (const child of tasks) {
      if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
      else if (child.type === "suite") walk(child.tasks);
    }
  };
  walk(task.file.tasks);
  const titles = walked.map(entry => entry.name);
  expect(titles, "every registered test of this file (vitest task tree), in order").toEqual([FROZEN_TITLE, ANCHOR_TITLE, ...ROWS.flatMap(row => row.pins), ...QUIET.map(quiet => quiet.title), LIVENESS_TITLE]);
  expect(
    titles.filter((name, index) => titles.indexOf(name) !== index),
    "titles registered twice",
  ).toEqual([]);
  const here = walked.findIndex(entry => entry.self);
  expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
  const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
  const reading = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
  expect(
    walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(reading),
    "every other test is in run mode, not inverted, and ran before this case",
  ).toEqual([]);
  expect(REACHED, "every pin reached its passes' compare, in row order, and then every quiet row its own").toEqual([...ROWS.flatMap(row => row.pins), ...QUIET.map(quiet => quiet.id)]);
});

// THE LAST WORD: no case can read its own skip, so this file's afterAll reads the liveness case once every case has run. The file
// task it reads is the one every case that ran leaves in FILE (the afterEach below); when no case left it, the tree reads empty.
const FILE: { task: RunnerTestFile | undefined } = { task: undefined };
afterEach(({ task }) => {
  FILE.task = task.file;
});
afterAll(() => {
  const liveness: string[] = [];
  const walk = (tasks: RunnerTestFile["tasks"]): void => {
    for (const child of tasks) {
      if (child.type === "test" && child.name === LIVENESS_TITLE) liveness.push(`${child.mode}${child.fails === true ? "+fails" : ""} | ${child.result?.state ?? "no result"}`);
      else if (child.type === "suite") walk(child.tasks);
    }
  };
  walk(FILE.task?.tasks ?? []);
  expect(liveness, "the last word: the liveness case is registered once, in run mode, not inverted, and passed").toEqual(["run | pass"]);
});
// THE LAST WORD ON THE NAMESPACE: once every case has run, the helper's module namespace holds exactly the names it held as this
// file loaded it, each bound to the same value.
afterAll(() => {
  const now = new Map(Object.entries(helper));
  const changed = [...new Set([...NAMESPACE.keys(), ...now.keys()])]
    .filter(name => !(NAMESPACE.has(name) && now.has(name) && Object.is(NAMESPACE.get(name), now.get(name))))
    .map(name => `${name}: ${NAMESPACE.has(name) ? typeof NAMESPACE.get(name) : "absent"} at load, ${now.has(name) ? typeof now.get(name) : "absent"} at the last word`);
  expect(changed, "the last word: the helper's module namespace holds the names it held at load, each bound to the same value").toEqual([]);
});
