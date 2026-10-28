/**
 * wb-tz2.7 (HX-ORIGINAL-GOALS-CLOSURE-R7, program-triage-2026-10-17), the HyperUnix result-corpus census: the until-then leg of
 * a trigger-gated requirement whose upstream corpus has not shipped.
 * Statement: STATEMENT below, the bead's export title verbatim after its id prefix. Acceptance: ACCEPTANCE below, the export
 * description's one ACCEPTANCE item verbatim, three clauses. A1 holds both to the export.
 *
 * MEASURED (read-only, by the cutting seat ws-06, run g10-work-s123, 2026-10-28, at base cd8927f). package.json resolves
 * @hyperunix/sdk from file:vendor/hyperunix-sdk-0.1.0.tgz (sha256 655e08b0, as vendor/README.md records), and the installed copy
 * is that tarball's package directory file for file. The tarball holds 111 regular files: package/LICENSE, package/README.md,
 * package/package.json and 108 under package/dist (27 modules, each as .js, .d.ts, .js.map and .d.ts.map). Its manifest lists
 * files dist, README.md and LICENSE and exports ".", "./raw" and "./protocol". No entry is a data file, no entry path spells
 * conformance, corpus or fixture, and exactly two entries spell hyperunix.result/1: dist/result.js and dist/result.d.ts, which
 * define and declare SDK_REPRESENTATION. The release's prose names a corpus it does not ship (dist/result.js: "both consume the
 * one shared fixture corpus sdk/python/test/fixtures/results (the conformance law)").
 * Upstream, read with read-only git at HyperUnix-CLI main 6d0369d0 (2026-10-28T03:13:09Z): sdk/conformance still holds only
 * evidence/native-resource-bindings (81 files), resource-contract.json, test and tools; the corpus the release names is 49
 * files, HXS wire streams beside a manifest of expected classifications with one stdout_sha256 each, unchanged since
 * 6ed14cab8d: SDK-internal test fixtures, neither hyperunix.result/1 documents nor shipped to consumers; and HXGC-PROV-003
 * (docs/programs/original-goals-closure-2026-10-16/requirements.jsonl:24) still reads "status":"DESIGN",
 * "implementation_evidence":null and "graduated":false. So the trigger has fired neither in the release Pi vendors nor upstream.
 * SCOPE: the census reads the vendored release, its installed copy, package.json, the named surface and the bead's own export
 * row (title and description only, which later store writes leave alone). It never reads HX's tree, so a corpus HX publishes in
 * its own tree alone is left to the wb-kqx channel (PARKED below).
 *
 * CASES. T0 the reading is live: package.json's spec names the tarball read, the installed copy is the vendored one, the codec
 * exports the representation the statement names, and the content reader finds the release's prose naming the corpus it does
 * not ship. T1 (ARMED; one case per pin of ROWS) each acceptance clause's subject is absent from the vendored release:
 * (provenance) no entry is a data file and no entry path spells a corpus word, so no corpus entry exists to cite; (drift) only
 * the codec's two files spell hyperunix.result/1, so no vendored result document exists to drift against; (second-entry) the
 * manifest's exports and files are today's, so no corpus is reachable through the package. A re-vendor that ships a corpus reds
 * T1 naming the acceptance on landing as owed. T2 the same readers find every signal in a planted release, so a hollowed reader
 * reds. A1 the outside anchors: the export title is the statement, the description carries exactly ACCEPTANCE, ROWS' clauses are
 * exactly that item's clauses in order, and the surface its SURFACES line names still builds hyperunix.result/1 documents by
 * hand (the fixtures the acceptance on landing converts).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal and every reading is pinned exactly once;
 * ROWS' clauses are held to the export (A1) and the pins' today sets to the vendored release (T1).
 * PARKED (the external remainder): the acceptance's three clauses need a consumer-facing hyperunix.result/1 corpus in a release
 * Pi vendors, and the request for it travels the wb-kqx upstream-feedback channel, a HyperUnix-CLI new-feedback write outside
 * Pi-subagents (standing rules 21(1) and 24) that this cut does not make.
 * Display paths added: none. Test-only: it reads files, spawns nothing and writes nothing.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { SDK_REPRESENTATION } from "@hyperunix/sdk";
import { describe, expect, it } from "vitest";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-tz2.7";
const EXPORT = ".beads/issues.jsonl";
const SDK = "@hyperunix/sdk";
const INSTALLED = join(REPO, "node_modules", "@hyperunix", "sdk");
const PACKAGE_DIR = "package/";
const REPRESENTATION = "hyperunix.result/1";
const TITLE_ID = "[HX-ORIGINAL-GOALS-CLOSURE-R7]";
/** The bead's statement: its export title after the id prefix, verbatim (A1). */
const STATEMENT =
  "When HX publishes a consumer-facing hyperunix.result/1 conformance corpus (HXGC-PROV-003 DESIGN requirements.jsonl:24@6ed14cab8d; at the pin sdk/conformance holds only budget fixtures), Pi shall pin its consumer fixtures to corpus entries (id + sha), replacing or cross-validating the hand-built JSON derived from one measured live read; the request travels the wb-kqx upstream-feedback channel.";
/** The bead's acceptance: the export description's one ACCEPTANCE item, verbatim (A1). */
const ACCEPTANCE =
  "On landing: fixture provenance lines cite corpus entry id + sha; a drift test fails when a vendored corpus entry and the Pi fixture derived from it disagree; a second corpus entry (not just today's shape) round-trips through the adapter, proving the fixture set is not hard-coded to one shape.";
const ON_LANDING = "On landing: ";
/** The surface the acceptance on landing converts, as the export's SURFACES line names it (A1). */
const SURFACE = "test/workbench-hyperunix-observer.test.ts";
const SURFACE_PIN = `${SURFACE}:37-78@9df9a03`;
/** The prose by which the release names the SDK-internal corpus it does not ship (dist/result.js, measured). */
const NAMED_CORPUS = "fixture corpus sdk/python/test/fixtures/results";
const OWED = `ARMED (${BEAD}): the vendored ${SDK} now differs on a corpus reading. If HX shipped a consumer-facing ${REPRESENTATION} conformance corpus, the acceptance on landing is owed: ${ACCEPTANCE} If it did not, re-measure ROWS' today sets against the new release and say so.`;

interface Release {
  /** Every regular file of the release by its archive path (package/...), as UTF-8 text. */
  readonly entries: ReadonlyMap<string, string>;
  /** The release manifest's files list. */
  readonly files: readonly string[];
  /** The release manifest's export subpaths. */
  readonly exports: readonly string[];
}

/** The regular files of a gzipped ustar archive, by path, as UTF-8 text. */
function tarEntries(bytes: Buffer): Map<string, string> {
  const entries = new Map<string, string>();
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
    if (type === "0" || type === "")
      entries.set(prefix.length > 0 ? `${prefix}/${name}` : name, bytes.subarray(offset + 512, offset + 512 + size).toString("utf8"));
    offset += 512 + Math.ceil(size / 512) * 512;
  }
  return entries;
}
/** The manifest's files list and export subpaths; a missing or malformed field reads as none. */
function manifestOf(text: string | undefined): { files: string[]; exports: string[] } {
  if (text === undefined) throw new Error(`the release ships no ${PACKAGE_DIR}package.json`);
  const parsed: unknown = JSON.parse(text);
  if (typeof parsed !== "object" || parsed === null) throw new Error("the release manifest is not an object");
  const files: unknown = "files" in parsed ? parsed.files : undefined;
  const exported: unknown = "exports" in parsed ? parsed.exports : undefined;
  return {
    files: Array.isArray(files) ? files.filter((item: unknown): item is string => typeof item === "string") : [],
    exports: typeof exported === "object" && exported !== null ? Object.keys(exported) : [],
  };
}
function releaseOf(entries: ReadonlyMap<string, string>): Release {
  return { entries, ...manifestOf(entries.get(`${PACKAGE_DIR}package.json`)) };
}
/** The tarball Pi's package.json resolves the SDK from (its file: spec). */
function vendoredTarball(): string {
  const manifest: unknown = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
  const dependencies: unknown =
    typeof manifest === "object" && manifest !== null && "dependencies" in manifest ? manifest.dependencies : undefined;
  const spec: unknown = typeof dependencies === "object" && dependencies !== null && SDK in dependencies ? dependencies[SDK] : undefined;
  if (typeof spec !== "string" || !spec.startsWith("file:")) throw new Error(`package.json resolves ${SDK} from no vendored file`);
  return spec.slice("file:".length);
}
let vendored: Release | undefined;
function vendoredRelease(): Release {
  if (vendored === undefined) vendored = releaseOf(tarEntries(gunzipSync(readFileSync(join(REPO, vendoredTarball())))));
  return vendored;
}
function installedFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? installedFiles(join(dir, entry.name)) : entry.isFile() ? [join(dir, entry.name)] : [],
  );
}
/** The installed copy of the package directory, by archive path, as UTF-8 text. */
function installedCopy(): Map<string, string> {
  return new Map(installedFiles(INSTALLED).map((file) => [`${PACKAGE_DIR}${relative(INSTALLED, file)}`, readFileSync(file, "utf8")]));
}
/** Every path on either side that the other lacks or holds with other bytes. */
function differingEntries(installed: ReadonlyMap<string, string>, release: ReadonlyMap<string, string>): string[] {
  const paths = new Set([...installed.keys(), ...release.keys()]);
  return [...paths].filter((path) => installed.get(path) !== release.get(path)).sort();
}

/** A release entry of a kind the package ships today: a compiled module, its declaration, or either one's source map. */
const CODE = /^package\/dist\/.+\.(?:js|d\.ts|js\.map|d\.ts\.map)$/;
const PACKAGE_FILES: readonly string[] = ["package/LICENSE", "package/README.md", "package/package.json"];
/** The words a corpus directory or file would carry in its path, any case. */
const CORPUS_WORD = /conformance|corpus|fixture/i;

type ReadingId = "data-entries" | "corpus-paths" | "representation-entries" | "exports" | "files";
type Reader = (release: Release) => string[];
/** Every reading T1 judges, by id; FROZEN SHAPE holds each to exactly one pin of ROWS. */
const READINGS: Readonly<Record<ReadingId, Reader>> = {
  "data-entries": (release) => [...release.entries.keys()].filter((path) => !CODE.test(path) && !PACKAGE_FILES.includes(path)).sort(),
  "corpus-paths": (release) => [...release.entries.keys()].filter((path) => CORPUS_WORD.test(path)).sort(),
  "representation-entries": (release) =>
    [...release.entries]
      .filter(([, text]) => text.includes(REPRESENTATION))
      .map(([path]) => path)
      .sort(),
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
  /** The readings that show the clause's subject absent from the vendored release today. */
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
    pins: [{ reading: "representation-entries", today: ["package/dist/result.d.ts", "package/dist/result.js"] }],
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

/** A release that ships a corpus each reading must see: a corpus directory, a module, a data file and a declaration. */
const PLANTED: ReadonlyMap<string, string> = new Map([
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
]);
/** What each reading finds in PLANTED. */
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
    typeof row === "object" &&
    row !== null &&
    "id" in row &&
    row.id === BEAD &&
    "title" in row &&
    typeof row.title === "string" &&
    "description" in row &&
    typeof row.description === "string"
      ? [{ title: row.title, description: row.description }]
      : [],
  );
  expect(mine, "the export holds exactly one row for the bead").toHaveLength(1);
  return mine[0];
}
/** A Python list item as the export's ACCEPTANCE list spells it: double quotes exactly when the text holds a single quote. */
function listItem(text: string): string {
  return text.includes("'") && !text.includes('"') ? `"${text}"` : `'${text}'`;
}
/** The clauses of the export's one ACCEPTANCE item, read from the export itself: the item after "On landing: ", cut at "; ". */
function exportedClauses(description: string): string[] {
  const item = /^ACCEPTANCE: \[(["'])(.*)\1\]$/m.exec(description)?.[2];
  if (item === undefined || !item.startsWith(ON_LANDING)) return [];
  return item.slice(ON_LANDING.length).split("; ");
}

describe("wb-tz2.7 HyperUnix result-corpus census (until a consumer-facing hyperunix.result/1 corpus ships)", () => {
  it("T0: the reading is live: package.json names the tarball read, the installed copy is the vendored one, the codec exports the statement's representation", () => {
    const release = vendoredRelease();
    expect(vendoredTarball(), "package.json resolves the SDK from a vendored tarball").toMatch(/^vendor\/hyperunix-sdk-[^/]+\.tgz$/);
    expect(release.entries.size, "the vendored release was read").toBeGreaterThan(0);
    const installed = installedCopy();
    expect(installed.size, "the installed copy was read").toBeGreaterThan(0);
    expect(differingEntries(installed, release.entries), "the installed copy is the vendored one, file for file and byte for byte").toStrictEqual([]);
    // The comparison is live: it sees a changed byte, a file only the installed copy holds and one only the release holds.
    const sample = new Map([
      ["package/dist/a.js", "a"],
      ["package/dist/b.js", "b"],
    ]);
    expect(
      differingEntries(
        new Map([
          ["package/dist/a.js", "a!"],
          ["package/dist/c.js", "c"],
        ]),
        sample,
      ),
    ).toStrictEqual(["package/dist/a.js", "package/dist/b.js", "package/dist/c.js"]);
    expect(differingEntries(new Map(sample), sample)).toStrictEqual([]);
    expect(SDK_REPRESENTATION, "the codec Pi runs exports the representation the statement names").toBe(REPRESENTATION);
    expect(
      [...release.entries.values()].some((text) => text.includes(NAMED_CORPUS)),
      "the content reading is live: it finds the release's prose naming the corpus it does not ship",
    ).toBe(true);
  });

  describe("T1 (ARMED): each acceptance clause's subject is absent from the vendored release", () => {
    it.each(PINS.map((pin) => [`${pin.row}/${pin.reading}`, pin] as const))("T1 %s: the vendored release reads today's set", (_name, pin) => {
      expect(READINGS[pin.reading](vendoredRelease()), OWED).toStrictEqual([...pin.today]);
    });
  });

  it("T2: the same readers find every signal in a planted release that ships a corpus", () => {
    const planted = releaseOf(PLANTED);
    for (const pin of PINS) expect(READINGS[pin.reading](planted), pin.reading).toStrictEqual([...PLANTED_READINGS[pin.reading]]);
    expect(
      PINS.filter((pin) => JSON.stringify(READINGS[pin.reading](planted)) === JSON.stringify(pin.today)).map((pin) => `${pin.row}/${pin.reading}`),
      "every pin sees its plant",
    ).toStrictEqual([]);
  });

  it("A1: the export title is the statement, its description carries exactly ACCEPTANCE and ROWS' clauses, and the named surface still builds result documents by hand", () => {
    const row = exportRow();
    expect(row.title, "the export title is the statement").toBe(`${TITLE_ID} ${STATEMENT}`);
    expect(STATEMENT, "the statement names the representation the codec exports").toContain(`a consumer-facing ${REPRESENTATION} conformance corpus`);
    expect(row.description).toContain(`ACCEPTANCE: [${listItem(ACCEPTANCE)}]`);
    expect(exportedClauses(row.description), "ROWS' clauses are the export item's clauses, in order").toStrictEqual(ROWS.map((item) => item.clause));
    expect(row.description).toContain(`SURFACES: ${SURFACE_PIN}`);
    const surface = readFileSync(join(REPO, SURFACE), "utf8");
    expect(
      surface.split("\n").filter((line) => line.includes(`representation: '${REPRESENTATION}'`)).length,
      "the surface still builds hyperunix.result/1 documents by hand",
    ).toBeGreaterThan(0);
  });

  it("FROZEN SHAPE (standing rule 16): ROWS' ids and pin counts, and every reading pinned exactly once", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toStrictEqual(["provenance:2", "drift:1", "second-entry:2"]);
    expect(PINS.map((pin) => pin.reading)).toStrictEqual(Object.keys(READINGS));
  });
});
