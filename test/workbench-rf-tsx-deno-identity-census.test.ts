/**
 * wb-j4sm (RF-NATIVE-TSX-COMPONENTS-R2, program-triage-2026-10-18): the carrier child of wb-70xe, filed at its rule-19 structural
 * exit (orchestrator rulings R-B275 and R-B292) and made its blocker by the dependency inversion (orchestrator ruling R-B307).
 * THE IDENTITY CENSUS of test/helpers/rf-tsx-deno.ts, whose code is wb-70xe's cut #4 (cb85b5c8) unchanged and which this cut lands
 * first: for five of the helper's exported functions, the readings over planted PATHs, planted engines and planted texts. wb-70xe's
 * own cases (its tier wiring in test/workbench-rf-tsx-tier.test.ts, its provisioning and lane census, its docs07 row R10) are not on
 * this tree; nothing here restates them, and wb-70xe's re-cut composes this helper when it lands.
 *
 * THE PINNED READER SET (this file, test/workbench-rf-tsx-deno-identity-census.test.ts; 8 cases, each passed with this cut on trunk
 * d16ddd7 and again on trunk 118dcf7):
 *  - "the frozen shape: ..." - ROWS' `${id}:${pins.length}` equals ["ID:3", "SCAN:2"], and READ, EXPECTED and WITNESS each hold
 *    exactly one entry per pin. Falsifier: deleting a pin or a row (CT1, CT1b, CT4).
 *  - "the helper anchor: ..." - read from the helper's own source (its `// ---- <title> ----` section lines and the exported function
 *    declarations below each, by the TypeScript parser at run time): every row's label is a section title, rows stand in section
 *    order, and each section's exported functions are exactly its row's pins (in the helper's order) plus its UNCLAIMED names.
 *    Falsifier: deleting, renaming or relabelling a pin or a row in this file (CT2, CT5, CT6), or a helper export this file does not
 *    account for.
 *  - one case per pin, titled by the pin under `${row.id} ${row.label}`: the reader the helper module exports under the pin's own
 *    name, read over its planted tables (READ), strictly equals the reading built here from the same tables without the helper
 *    (EXPECTED), and its sha256 prefix equals WITNESS. Falsifier: each one-edit member named in that pin's clause below, and any swap
 *    of a pin's reading (CT3).
 *  - "the registered tests and the reached pins: ..." - the vitest task tree: every test of this file in run mode, not inverted and
 *    ran, titles unique and in order, and every pin reached its compare in row order. Falsifier: a skipped, todo, failing-inverted or
 *    missing case.
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
 * residual table's row-level frozen shape) belongs to wb-70xe's lane census, which holds the residual table and is not on this tree,
 * and this census holds no residual table. Refusal #4's U1 (a symlink at <x>/shims/v1/deno, shims two levels up on the resolved path
 * alone, to an engine outside any shims directory) and U2 (a symlink to a directory before an engine) are pinned above; their tier
 * pages are wb-70xe's tier wiring, NOT CLAIMED here.
 *
 * NOT CLAIMED (scope sentences; no residual, no follow-up): every UNCLAIMED function of the helper (echoPath, sha256Of and
 * pinnedDenoDigest) and every helper constant; for a pinned reader, every input outside its tables. For resolveOnPath: a name other
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
 * helper's header names for wb-70xe's lane census, and wb-70xe's docs07 row R10. This census names no residual: every member the
 * bead carries is pinned above or placed outside it here.
 *
 * FROZEN SHAPE (standing rule 16): the literal above. THE ANCHOR outside this file's literals is the helper's own source: its section
 * titles and its exported function declarations, read by the TypeScript parser at run time.
 *
 * Display paths added: none. Test-only: nothing is executed, spawned or installed; the planted engines are text files under a
 * scratch root, and the helper's source is only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, mkdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { delimiter, dirname, join, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterEach, describe, expect, it } from "vitest";
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
/** Each section's exported functions no row claims. */
const UNCLAIMED: Readonly<Record<string, readonly string[]>> = {
  "the identity reading": ["echoPath"],
  "the digest half": ["sha256Of", "pinnedDenoDigest"],
};

/** Each pin's reading, handed the reader the helper module exports under the pin's own name. */
const READ: Readonly<Record<string, (reader: unknown) => unknown>> = {
  resolveOnPath: reader => {
    const read = reader as typeof helper.resolveOnPath;
    const planted = plantAll();
    return PATH_ROWS.map((row, index) => ({ key: row.key, read: rooted(planted, read(ENGINE, pathOf(planted, index, row.path))) }));
  },
  shimReasons: reader => {
    const read = reader as typeof helper.shimReasons;
    const planted = plantAll();
    return MARK_ROWS.map(row => {
      const resolved = join(planted.root, row.resolved);
      return { key: row.key, read: outcome(planted, () => read({ resolved, realpath: realpathSync(resolved) })) };
    });
  },
  provisionedDeno: reader => {
    const read = reader as typeof helper.provisionedDeno;
    const planted = plantAll();
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
};

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

// ---- the anchor: the helper's own source ----

interface Section {
  readonly title: string;
  readonly functions: string[];
}
/** The helper's sections (its `// ---- <title> ----` lines, in order) and the functions each exports, in source order. */
function helperSections(): Section[] {
  const text = readFileSync(HELPER_PATH, "utf8");
  const marks = [...text.matchAll(/^\/\/ ---- (.+) ----$/gm)].map(match => ({ title: match[1] ?? "", at: match.index ?? 0 }));
  const sections: Section[] = marks.map(mark => ({ title: mark.title, functions: [] }));
  const file = ts.createSourceFile(HELPER_PATH, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const statement of file.statements) {
    if (!ts.isFunctionDeclaration(statement) || statement.name === undefined) continue;
    if (!(ts.getModifiers(statement) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    const start = statement.getStart(file);
    let index = -1;
    for (const [at, mark] of marks.entries()) if (mark.at < start) index = at;
    const section = sections[index];
    if (section === undefined) throw new Error(`the helper exports ${statement.name.text} before its first section`);
    section.functions.push(statement.name.text);
  }
  return sections;
}

const REACHED: string[] = [];
const FROZEN_TITLE = "the frozen shape: the rows' ids and pin counts, and one reading, one expectation and one witness per pin";
const ANCHOR_TITLE = "the helper anchor: each row is a helper section, and every function the helper exports is its section's pin or UNCLAIMED";
const LIVENESS_TITLE = "the registered tests and the reached pins: every test in run mode, not inverted and ran, and every pin reached its compare in row order";

describe("wb-j4sm identity census: 5 readers of test/helpers/rf-tsx-deno.ts over planted PATHs, engines and texts", () => {
  it(FROZEN_TITLE, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["ID:3", "SCAN:2"]);
    const pins = ROWS.flatMap(row => row.pins);
    expect(Object.keys(READ).sort(), "one reading per pin").toEqual([...pins].sort());
    expect(Object.keys(EXPECTED).sort(), "one expectation per pin").toEqual([...pins].sort());
    expect(Object.keys(WITNESS).sort(), "one witness per pin").toEqual([...pins].sort());
  });

  it(ANCHOR_TITLE, () => {
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
    for (const section of sections) {
      const unclaimed = UNCLAIMED[section.title] ?? [];
      expect(
        section.functions.filter(name => !unclaimed.includes(name)),
        `${section.title}: its exported functions not UNCLAIMED are its row's pins, in the helper's order`,
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
          const read = READ[pin];
          const expected = EXPECTED[pin];
          expect(read, `no reading for ${pin}`).toBeTypeOf("function");
          expect(expected, `no expectation for ${pin}`).toBeTypeOf("function");
          const reader: unknown = Object.entries(helper).find(([name]) => name === pin)?.[1];
          expect(reader, `the helper exports no function ${pin}`).toBeTypeOf("function");
          const reading = read === undefined ? null : plain(read(reader));
          expect(reading).toStrictEqual(expected === undefined ? undefined : plain(expected()));
          expect(digest(reading), `${pin}'s witness`).toBe(WITNESS[pin]);
          REACHED.push(pin);
        });
      }
    });
  }

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
    expect(titles, "every registered test of this file (vitest task tree), in order").toEqual([FROZEN_TITLE, ANCHOR_TITLE, ...ROWS.flatMap(row => row.pins), LIVENESS_TITLE]);
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
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
