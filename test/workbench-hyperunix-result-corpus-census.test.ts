/**
 * wb-tz2.7 (HX-ORIGINAL-GOALS-CLOSURE-R7, program-triage-2026-10-17), the HyperUnix result-corpus census: the until-then leg of
 * a trigger-gated requirement whose upstream corpus has not shipped. Cut #2 answers refusal #1 (U1, U2 and U3 in the bead note).
 * Statement: STATEMENT below, the bead's export title verbatim after its id prefix. Acceptance: ACCEPTANCE below, verbatim: the
 * export description's ACCEPTANCE line, which A1 asserts is the description's only one, three clauses.
 *
 * MEASURED (read-only). Cut #1 (seat ws-06, run g10-work-s123, 2026-10-28, base cd8927f) and cut #2 (seat ws-02, run
 * g10-work-s136, 2026-10-29, trunk 04123dc) read the same release. package.json resolves @hyperunix/sdk, its one HX-scoped
 * package, from file:vendor/hyperunix-sdk-0.1.0.tgz (sha256 655e08b0, as vendor/README.md records), and the installed copy is
 * that tarball's package directory file for file. The tarball holds 111 regular files: package/LICENSE, package/README.md,
 * package/package.json and 108 under package/dist (27 modules, each as .js, .d.ts, .js.map and .d.ts.map); its content digest
 * is WATCHED's (cut #2 cross-checked it with an independent tar reader). Its manifest lists files dist, README.md and LICENSE and
 * exports ".", "./raw" and "./protocol". No entry is a data file, no entry path spells conformance, corpus or fixture, exactly two
 * entries spell hyperunix.result/1 in their bytes (dist/result.js and dist/result.d.ts, which define and declare
 * SDK_REPRESENTATION), and of the values the three export subpaths' namespaces hold, walked as exported-representations walks
 * them, only SDK_REPRESENTATION carries it. The release's prose names a corpus it does not ship (dist/result.js: "both consume
 * the one shared fixture corpus sdk/python/test/fixtures/results (the conformance law)").
 * Upstream (cut #1's reading, not re-run by cut #2; read-only git at HyperUnix-CLI main 6d0369d0, 2026-10-28T03:13:09Z):
 * sdk/conformance still holds only evidence/native-resource-bindings (81 files), resource-contract.json, test and tools; the
 * corpus the release names is 49 files of SDK-internal test fixtures, neither hyperunix.result/1 documents nor shipped to
 * consumers; and HXGC-PROV-003 (docs/programs/original-goals-closure-2026-10-16/requirements.jsonl:24) still reads
 * "status":"DESIGN". So the trigger has fired neither in the release Pi vendors nor upstream.
 * SCOPE: the census reads package.json, the vendored tarball of each HX-scoped package it names, the installed @hyperunix/sdk (its
 * files, and its three export subpaths as imported), the named surface, this file's header, and the bead's own export row (title
 * and description only, which later store writes leave alone). It never reads HX's tree: a corpus HX publishes in its own tree
 * alone is left to the wb-kqx channel (PARKED below).
 *
 * CASES. T0 the readings are live: package.json's spec names the tarball read; the installed copy equals it byte for byte; the
 * codec exports the representation the statement names; the content reader finds the release's prose naming the corpus it does
 * not ship; the export walk imports every export subpath the vendored manifest declares; and the comparison, digest and
 * dependency readers each see their planted controls.
 * T1 IDENTITY (ARMED; the census's detection claim): the HX-scoped packages package.json depends on (names under @hyperunix/, in
 * any of dependencies, devDependencies, optionalDependencies and peerDependencies) are exactly WATCHED's, and each resolves from a
 * vendored file: tarball whose content (its regular-file count, and contentDigest over every entry's path and bytes) is the
 * measured one. So a re-vendor that changes an HX-scoped release's content reds T1 identity naming the acceptance on landing as
 * owed: one that ships a corpus in any form, and one that ships none, whose cutter re-measures WATCHED and ROWS and says so. A
 * spec that leaves file:, and a tarball that is missing or no longer reads, red it with the same message. T1
 * identity cannot tell the two apart; the classification pins tell them apart only in the forms they read.
 * T1 CLASSIFICATION (ARMED; one case per pin of ROWS): each clause's subject reads absent from the vendored @hyperunix/sdk in
 * exactly the forms its pins read. (provenance) data-entries: every entry other than a dist code file (.js and .d.ts under
 * package/dist and their .map files) and the three package files is a data entry, and there is none; corpus-paths: no entry path
 * spells conformance, corpus or fixture, in any case. So no corpus entry ships as a data file or under a corpus-word path.
 * (drift) representation-entries: only the codec's two files spell the literal hyperunix.result/1 in their bytes;
 * exported-representations: the only string the walk reaches from the three export subpaths' namespaces that spells it is
 * SDK_REPRESENTATION itself (the walk follows own enumerable data properties, array items and Map and Set members; it never
 * invokes an accessor or calls a function; it reads the subpaths as this file imports them, which with no alias or override in
 * place resolve to node_modules/@hyperunix/sdk, the installed copy T0 holds to the tarball). So no result document ships with
 * hyperunix.result/1 spelled byte for byte in an entry, or as an exported value the walk reaches whose representation string
 * spells it, however that string is written or built.
 * (second-entry) exports and files: the manifest's export subpaths and files list are today's, so no corpus subpath or shipped
 * corpus directory is declared. A corpus in a form none of these reads is R-HIDDEN below: T1 identity still reds on it.
 * T2 the same readers find every signal in a planted release that ships a corpus: a corpus directory, a mixed-case corpus
 * module, a JSONL data file, a fixtures declaration, exported documents in an array, a Map and a Set, and additions to exports
 * and files. Every pin sees its plant, so a reader hollowed to miss any planted signal reds.
 * A1 the outside anchors: the export title is the statement; the description holds exactly one ACCEPTANCE line (a line that
 * opens an ACCEPTANCE field: the word acceptance in any case, after any indent, then a colon) and it is ACCEPTANCE; ROWS' clauses
 * are exactly that line's clauses, in order; the SURFACES line names SURFACE_PIN; and the named surface still holds hand-built
 * result documents in the one form the surface reading reads: an object-literal property named representation (an identifier,
 * a string key or a computed string key) whose initializer is a string literal or a template without substitutions spelling
 * hyperunix.result/1, read from the TypeScript AST through parentheses, as, satisfies, type assertions and non-null marks
 * (comments, other strings and quote style aside). A representation set from a binding, a concatenation or a template with
 * substitutions, or declared in a type, is not read. A1's surface controls pin that form.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every reading is pinned exactly once; WATCHED's
 * keys are a literal (held to package.json by T1 identity and RECORDS); SURFACE_CONTROLS' counts are a literal; and the RESIDUALS
 * lines below equal QUIET's keys.
 * RECORDS (the last case): T1 identity judged every HX-scoped package package.json names (an anchor outside the census's
 * literals), and every classification pin's case and every residual's quiet row ran to its end.
 * RESIDUALS (named families, each with a pinned quiet row in QUIET; FROZEN SHAPE reads the three lines below):
 * R-HIDDEN a corpus in any form the classification readings do not read. Known members: documents behind a function call, an
 *   accessor, a non-enumerable, symbol-keyed or inherited property or a function's own property; documents in a neutral-named
 *   module that no export subpath re-exports and whose bytes never spell hyperunix.result/1 byte for byte (the representation
 *   imported from the codec, or escape-spelled); and documents declared only in types. The quiet row plants every known member in
 *   today's release: every classification pin reads today's set, and T1 identity's content digest changes.
 * R-OTHER-PACKAGE a corpus shipped in a package outside the @hyperunix/ scope is not watched. The quiet row plants such packages
 *   in two dependency fields: the HX-scoped set stays @hyperunix/sdk alone.
 * R-SELF-HOLLOW a census member removed from every literal that names it is unseen by the outside anchors, which bind ROWS'
 *   clauses (A1) and package.json's HX-scoped packages (T1 identity and RECORDS), and nothing else: a pin (from ROWS, ReadingId,
 *   READINGS, PLANTED_READINGS and the frozen literal), a residual (from QUIET, the frozen literal and its header line), a planted
 *   signal (from PLANTED_ENTRIES or PLANTED_MODULES and PLANTED_READINGS) or a surface control (from SURFACE_CONTROLS and its
 *   frozen counts). The quiet row pins that each pin's removal leaves A1's anchor reading unchanged while each row's removal
 *   changes it.
 * PARKED (the external remainder; standing rules 21(1) and 24): the acceptance's three clauses need a consumer-facing
 * hyperunix.result/1 corpus in a release Pi vendors, and the request for it travels the wb-kqx upstream-feedback channel, a
 * HyperUnix-CLI new-feedback write outside Pi-subagents that this cut does not make. A landing of this cut closes only the
 * until-then leg; the on-landing leg stays owed.
 * Display paths added: none. Test-only: it reads files, spawns nothing and writes nothing.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
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
const INSTALLED = join(REPO, "node_modules", "@hyperunix", "sdk");
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
/** The surface the acceptance on landing converts, as the export's SURFACES line names it (A1). */
const SURFACE = "test/workbench-hyperunix-observer.test.ts";
const SURFACE_PIN = `${SURFACE}:37-78@9df9a03`;
/** The prose by which the release names the SDK-internal corpus it does not ship (dist/result.js, measured). */
const NAMED_CORPUS = "fixture corpus sdk/python/test/fixtures/results";
/** The ARMED message: what changed, the acceptance on landing it may make owed, and the re-measure duty otherwise. */
const owed = (change: string): string =>
  `ARMED (${BEAD}): ${change}. If HX shipped a consumer-facing ${REPRESENTATION} conformance corpus, the acceptance on landing is owed: ${ACCEPTANCE} If it did not, re-measure WATCHED and ROWS' today sets against the new release and say so.`;

interface Measured {
  /** The tarball package.json's file: spec names. */
  readonly tarball: string;
  /** Its regular-file entry count. */
  readonly entries: number;
  /** contentDigest over its entries. */
  readonly digest: string;
}
/** Every HX-scoped release Pi vendors, as cut #2 measured it at trunk 04123dc (T1 identity). */
const WATCHED: Readonly<Record<string, Measured>> = {
  [SDK]: { tarball: "vendor/hyperunix-sdk-0.1.0.tgz", entries: 111, digest: "e1364c255d26df631e5be23be971f1041cfcb1075aad27867052fd990b7df9d7" },
};

interface Release {
  /** Every regular file of the release by its archive path (package/...), as bytes. */
  readonly entries: ReadonlyMap<string, Buffer>;
  /** The release manifest's files list. */
  readonly files: readonly string[];
  /** The release manifest's export subpaths. */
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

/** The regular files of a gzipped ustar archive, by path, as bytes. */
function tarEntries(bytes: Buffer): Map<string, Buffer> {
  const entries = new Map<string, Buffer>();
  let offset = 0;
  while (offset + 512 <= bytes.length) {
    const header = bytes.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;
    const field = (start: number, length: number): string =>
      header
        .subarray(start, start + length)
        .toString("utf8")
        .replace(/\0[\s\S]*$/, "");
    const name = field(0, 100);
    const prefix = field(345, 155);
    const size = Number.parseInt(field(124, 12).trim() || "0", 8);
    const type = field(156, 1);
    if (type === "0" || type === "") entries.set(prefix.length > 0 ? `${prefix}/${name}` : name, bytes.subarray(offset + 512, offset + 512 + size));
    offset += 512 + Math.ceil(size / 512) * 512;
  }
  return entries;
}
/** The release's content identity: sha256 over every entry's path and the sha256 of its bytes, in path order. */
function contentDigest(entries: ReadonlyMap<string, Buffer>): string {
  return sha256(
    [...entries.keys()]
      .sort()
      .map((path) => `${path}\n${sha256(entries.get(path) ?? Buffer.alloc(0))}\n`)
      .join(""),
  );
}
/** The manifest's files list and export subpaths; a missing or malformed field reads as none. */
function manifestOf(bytes: Buffer | undefined): { files: string[]; exports: string[] } {
  if (bytes === undefined) throw new Error(`the release ships no ${PACKAGE_DIR}package.json`);
  const parsed: unknown = JSON.parse(bytes.toString("utf8"));
  if (!isRecord(parsed)) throw new Error("the release manifest is not an object");
  const files = parsed.files;
  const exported = parsed.exports;
  return {
    files: Array.isArray(files) ? files.filter((item: unknown): item is string => typeof item === "string") : [],
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
/** The tarball a manifest resolves a package from: the file: spec of the first dependency field that names it. */
function vendoredSpec(manifest: unknown, name: string): string {
  for (const field of DEPENDENCY_FIELDS) {
    const specs = isRecord(manifest) ? manifest[field] : undefined;
    const spec = isRecord(specs) ? specs[name] : undefined;
    if (typeof spec === "string") {
      if (!spec.startsWith("file:")) throw new Error(`package.json resolves ${name} from no vendored file (${field}: ${spec})`);
      return spec.slice("file:".length);
    }
  }
  throw new Error(`package.json does not depend on ${name}`);
}
const tarballs = new Map<string, Map<string, Buffer>>();
/** A vendored tarball's entries, read once. */
function tarballEntries(tarball: string): Map<string, Buffer> {
  const cached = tarballs.get(tarball);
  if (cached !== undefined) return cached;
  const entries = tarEntries(gunzipSync(readFileSync(join(REPO, tarball))));
  tarballs.set(tarball, entries);
  return entries;
}
/** A package's spec in the first dependency field that names it. */
function specOf(manifest: unknown, name: string): string | undefined {
  for (const field of DEPENDENCY_FIELDS) {
    const specs = isRecord(manifest) ? manifest[field] : undefined;
    const spec = isRecord(specs) ? specs[name] : undefined;
    if (typeof spec === "string") return spec;
  }
  return undefined;
}
/** What T1 identity measures of a package: its vendored tarball's entry count and content digest, or why there is none. */
function measuredRelease(manifest: unknown, name: string): Readonly<Record<string, unknown>> {
  const spec = specOf(manifest, name);
  if (spec === undefined || !spec.startsWith("file:")) return { spec: spec ?? null };
  const tarball = spec.slice("file:".length);
  try {
    const entries = tarballEntries(tarball);
    return { tarball, entries: entries.size, digest: contentDigest(entries) };
  } catch (error) {
    return { tarball, unreadable: String(error) };
  }
}
/** The tarball Pi's package.json resolves the SDK from. */
function vendoredTarball(): string {
  return vendoredSpec(packageManifest(), SDK);
}
function vendoredRelease(): Release {
  return releaseOf(tarballEntries(vendoredTarball()), MODULES);
}
function installedFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? installedFiles(join(dir, entry.name)) : entry.isFile() ? [join(dir, entry.name)] : [],
  );
}
/** The installed copy of the package directory, by archive path, as bytes. */
function installedCopy(): Map<string, Buffer> {
  return new Map(installedFiles(INSTALLED).map((file) => [`${PACKAGE_DIR}${relative(INSTALLED, file)}`, readFileSync(file)]));
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
/** Every path from a value to a string that spells the representation: own enumerable data properties of objects and arrays and
 * the members of Maps and Sets, recursively. A function (a class included) is never entered or called. */
function carriers(value: unknown, path: string, seen: Set<object>): string[] {
  if (typeof value === "string") return value.includes(REPRESENTATION) ? [path] : [];
  if (typeof value !== "object" || value === null || seen.has(value)) return [];
  seen.add(value);
  const members: (readonly [string, unknown])[] =
    value instanceof Map
      ? [...value].map(([key, member]): readonly [string, unknown] => [String(key), member])
      : value instanceof Set
        ? [...value].map((member, index): readonly [string, unknown] => [String(index), member])
        : Object.keys(value).flatMap((key) => dataValue(value, key).map((member): readonly [string, unknown] => [key, member]));
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
/** A release that ships a corpus each reading must see: a corpus directory, a module, a data file, a declaration and exports. */
const PLANTED_ENTRIES: readonly (readonly [string, string])[] = [
  [
    "package/package.json",
    JSON.stringify({
      name: SDK,
      files: ["dist", "README.md", "LICENSE", "conformance"],
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
/** The planted release's export subpaths: documents exported in an array, a Map and a Set. */
const PLANTED_MODULES: Readonly<Record<string, object>> = {
  ".": { SDK_REPRESENTATION: REPRESENTATION, RESULT_CASES: [PLANTED_DOCUMENT] },
  "./conformance": { default: new Map([["find-complete-empty", { representation: REPRESENTATION }]]) },
  "./protocol": { MODES: new Set(["observation", REPRESENTATION]) },
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
  "exported-representations": ["./conformance:default.find-complete-empty.representation", "./protocol:MODES.1", ".:RESULT_CASES.0.document.representation", ".:SDK_REPRESENTATION"],
  exports: [".", "./conformance", "./protocol", "./raw"],
  files: ["LICENSE", "README.md", "conformance", "dist"],
};

/** The bead's own export row (title and description only: later store writes change neither). */
function exportRow(): { title: string; description: string } {
  const rows = readFileSync(join(REPO, EXPORT), "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line): unknown => JSON.parse(line));
  const mine = rows.flatMap((row) =>
    isRecord(row) && row.id === BEAD && typeof row.title === "string" && typeof row.description === "string" ? [{ title: row.title, description: row.description }] : [],
  );
  expect(mine, "the export holds exactly one row for the bead").toHaveLength(1);
  return mine[0];
}
/** A Python list item as the export's ACCEPTANCE list spells it: double quotes exactly when the text holds a single quote. */
function listItem(text: string): string {
  return text.includes("'") && !text.includes('"') ? `"${text}"` : `'${text}'`;
}
/** Every description line that opens an ACCEPTANCE field, in any case and after any indent. */
function acceptanceLines(description: string): string[] {
  return description.split("\n").filter((line) => /^\s*acceptance\s*:/i.test(line));
}
/** The clauses of the export's ACCEPTANCE item, cut at "; " after "On landing: "; none unless the description holds exactly one
 * ACCEPTANCE line and that line is one list item. */
function exportedClauses(description: string): string[] {
  const lines = acceptanceLines(description);
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

/** The residual families this file's header names, one per line (the RESIDUALS lines). */
function headerResiduals(): string[] {
  const header = readFileSync(SELF, "utf8").split("*/")[0];
  return [...header.matchAll(/^ \* (R-[A-Z]+(?:-[A-Z]+)*) /gm)].map((match) => match[1]);
}
/** Each named residual family's quiet row. */
const QUIET: Readonly<Record<string, () => void>> = {
  "R-HIDDEN": () => {
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
    const loadCases = Object.assign(() => documents, { cases: documents });
    const namespace: Record<string | symbol, unknown> = {
      ...sdkRoot,
      resultCases: () => documents,
      loadCases,
      INHERITED_CASES: Object.create({ documents }),
      [Symbol("cases")]: documents,
    };
    Object.defineProperty(namespace, "CASES", { enumerable: true, get: () => documents });
    Object.defineProperty(namespace, "HIDDEN_CASES", { enumerable: false, value: documents });
    const hidden: Release = { ...today, entries, modules: { ...today.modules, ".": namespace } };
    expect(
      PINS.filter((pin) => !same(READINGS[pin.reading](hidden), pin.today)).map(pinId),
      "R-HIDDEN: every classification pin reads today's set",
    ).toStrictEqual([]);
    expect(contentDigest(entries), "R-HIDDEN: T1 identity's content digest sees the release change").not.toBe(WATCHED[SDK].digest);
    expect(
      READINGS["exported-representations"]({ ...hidden, modules: { ".": { RESULT_CASES: documents } } }),
      "beside the quiet, the same documents exported as a plain value are read",
    ).toStrictEqual([".:RESULT_CASES.0.document.representation"]);
  },
  "R-OTHER-PACKAGE": () => {
    const manifest = {
      dependencies: { [SDK]: "file:vendor/hyperunix-sdk-0.1.0.tgz", "hx-conformance": "file:vendor/hx-conformance-0.1.0.tgz" },
      devDependencies: { "@acme/hyperunix-corpus": "1.0.0", "hyperunix-results": "file:vendor/hyperunix-results-0.1.0.tgz" },
    };
    expect(hxPackages(manifest), "R-OTHER-PACKAGE: a package outside the HX scope reads quiet").toStrictEqual([SDK]);
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
  },
};

const IDENTIFIED = new Set<string>();
const JUDGED = new Set<string>();
const QUIETED = new Set<string>();

describe("wb-tz2.7 HyperUnix result-corpus census (until a consumer-facing hyperunix.result/1 corpus ships)", () => {
  it("T0: the readings are live: package.json names the tarball read, the installed copy is the vendored one, the codec exports the statement's representation, and each reader sees its controls", () => {
    const release = vendoredRelease();
    expect(vendoredTarball(), "package.json resolves the SDK from a vendored tarball").toMatch(/^vendor\/hyperunix-sdk-[^/]+\.tgz$/);
    expect(release.entries.size, "the vendored release was read").toBeGreaterThan(0);
    const installed = installedCopy();
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
    // The dependency reader is live: it reads an HX-scoped package in each of the four fields.
    expect(DEPENDENCY_FIELDS.map((field) => hxPackages({ [field]: { "@hyperunix/conformance": "file:vendor/c.tgz", "left-pad": "1.0.0" } }))).toStrictEqual(
      DEPENDENCY_FIELDS.map(() => ["@hyperunix/conformance"]),
    );
  });

  describe("T1 (ARMED): the vendored HX releases are the measured ones, and each clause's subject reads absent in the forms the readings read", () => {
    it("T1 identity: package.json's HX-scoped packages are WATCHED's, and each resolves from a vendored tarball whose content is the measured one", () => {
      const manifest = packageManifest();
      const packages = hxPackages(manifest);
      expect(packages, owed(`package.json's HX-scoped packages are no longer WATCHED's (${Object.keys(WATCHED).join(", ")})`)).toStrictEqual(Object.keys(WATCHED).sort());
      for (const name of packages) {
        expect(measuredRelease(manifest, name), owed(`the vendored ${name} release is no longer the measured one`)).toStrictEqual(WATCHED[name]);
        IDENTIFIED.add(name);
      }
    });

    it.each(PINS.map((pin) => [pinId(pin), pin] as const))("T1 %s: the vendored release reads today's set", (name, pin) => {
      expect(READINGS[pin.reading](vendoredRelease()), owed(`the vendored ${SDK} now differs on the ${name} reading`)).toStrictEqual([...pin.today]);
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
      it(`${family} reads quiet`, () => {
        quiet();
        QUIETED.add(family);
      });
    }
  });

  it("A1: the export title is the statement, its one ACCEPTANCE line is ACCEPTANCE with ROWS' clauses, and the named surface still holds hand-built documents with a literal representation (TypeScript AST)", () => {
    const row = exportRow();
    expect(row.title, "the export title is the statement").toBe(`${TITLE_ID} ${STATEMENT}`);
    expect(STATEMENT, "the statement names the representation the codec exports").toContain(`a consumer-facing ${REPRESENTATION} conformance corpus`);
    expect(acceptanceLines(row.description), "the description holds exactly one ACCEPTANCE line, and it is ACCEPTANCE verbatim").toStrictEqual([`ACCEPTANCE: [${listItem(ACCEPTANCE)}]`]);
    expect(exportedClauses(row.description), "ROWS' clauses are the export item's clauses, in order").toStrictEqual(anchorReading(ROWS));
    expect(row.description).toContain(`SURFACES: ${SURFACE_PIN}`);
    expect(
      literalRepresentations(readFileSync(join(REPO, SURFACE), "utf8")).length,
      "the surface still holds hand-built result documents whose representation is the string literal",
    ).toBeGreaterThan(0);
    expect(SURFACE_CONTROLS.map(([text]) => literalRepresentations(text).length), "the surface reading's form").toStrictEqual(SURFACE_CONTROLS.map(([, count]) => count));
  });

  it("FROZEN SHAPE (standing rule 16): ROWS' ids and pin counts, every reading pinned exactly once, WATCHED, the surface controls and the residual roster", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toStrictEqual(["provenance:2", "drift:2", "second-entry:2"]);
    expect(PINS.map((pin) => pin.reading)).toStrictEqual(Object.keys(READINGS));
    expect(Object.keys(WATCHED)).toStrictEqual([SDK]);
    expect(SURFACE_CONTROLS.map(([, count]) => count)).toStrictEqual([1, 1, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0]);
    expect(Object.keys(QUIET)).toStrictEqual(["R-HIDDEN", "R-OTHER-PACKAGE", "R-SELF-HOLLOW"]);
    expect(headerResiduals(), "the header's RESIDUALS lines name exactly QUIET's families, in order").toStrictEqual(Object.keys(QUIET));
  });

  it("RECORDS: T1 identity judged every HX-scoped package package.json names, and every pin and quiet row ran to its end", () => {
    expect([...IDENTIFIED].sort(), "T1 identity judged every HX-scoped package Pi depends on").toStrictEqual(hxPackages(packageManifest()));
    expect([...JUDGED].sort(), "every classification pin's case ran to its end").toStrictEqual(PINS.map(pinId).sort());
    expect([...QUIETED].sort(), "every residual's quiet row ran to its end").toStrictEqual(Object.keys(QUIET).sort());
  });
});
