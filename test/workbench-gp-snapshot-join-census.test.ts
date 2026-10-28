/**
 * wb-gxd7.3 (GPC-FEEDBACK-CONTRACT-AUDIT-R3): a Pi join against gp's snapshot digest hashes exactly the bytes Pi presented.
 *
 * The bead (full statement in its note): "When Pi compares or joins its exported snapshot against gp's
 * `receipt.input_snapshot` or `graph_digest` ..., it shall hash exactly the bytes it presented — compact
 * `JSON.stringify(graph)` for RPC, the file bytes for CLI — and shall never substitute `identities.graph` or
 * `canonical_digest` for that join key". Source: GraphPolicyCLI docs/programs/feedback-contract-audit-2026-10-21/
 * 02-contract-audit.md:26@0107c72992f3 (program status at 0107c72992f3:
 * "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics"), "SHA-256 of the exact
 * presented graph bytes (for RPC sample, compact
 * `JSON.stringify(graph)` bytes) | Byte-exact invocation/journal join key | Whitespace and serialization affect the hash. Do
 * not substitute a canonical document/projection hash into an existing journal link", and :32 "An object passed to RPC is not
 * the bytes of a pretty-printed CLI file; equality of keys without equality of preimages is insufficient." That program states
 * its own status at :3, read at 0107c72992f3: "Proposed audit obligations and candidate resolutions, NOT accepted
 * GraphPolicyCLI semantics." Acceptance, quoted from the bead:
 *  (a) "a fixture graph serialized pretty and compact yields two different sha256 values and Pi's join uses the one over the
 *      bytes it actually sent, equal to the fixture rpc sample reply's graph_digest";
 *  (b) "substituting identities.graph or canonical_digest for the join key fails with a typed mismatch, never a silent pass";
 *  (c) "wb-0lf.3's 'snapshotDigest === the digest Pi exported' check is pinned to this byte-exact form by a whitespace-only
 *      mutation on the presented-byte path that expects a mismatch refusal".
 * Not P0 (bead): "no Pi code joins against a gp receipt today; gated duty, P2." The Pi side of the gate (a Pi gp decision
 * point, wb-0lf.1) does not exist, so this suite PINS TODAY'S ABSENCE and ARMS (a)-(c) for the first join site:
 *  - the live rows scan every regular file under src/ (scanSource: a join-value field name, identities.graph, the
 *    graphpolicy.snapshot.c1 spelling, and the shared name snapshotDigest, read as code tokens) and require every touched
 *    module to be a JOIN_SITES registration, or, for the shared name only, one of Pi's own listed uses (NEAR_NAMES: the
 *    local-detached host's invocation snapshot). JOIN_SITES is empty today; Pi's own snapshotDigest reads are the positive
 *    control that the walk reads src members at all.
 *  - every JOIN_SITES entry's drive runs through every CASES row and each outcome must pass judgeOutcome: joined with the key
 *    over the presented bytes when the gp-written value is that key whole-string, else the typed refusal
 *    {joined: false, code: "snapshot-mismatch", field, presented, producer}. No entry exists today, so the judge is proven on the
 *    reference join (the CASES rows) and on MUTANTS, each refused with exactly its rules.
 * PRODUCER FACTS (measured, never `gp --version`): every gp value below was captured on 2026-10-23 from the installed gp, source
 * checkout 3f7d52cd17397d8ed22e2c768714a057fe098b62 (a descendant of the bead's pin) with built entry ts/dist/main.js SHA-256
 * 0ad799c31da1dcd3ea3abf78bb099a407072c11ce63a76c2c6a1dd6b9ba52bd4, over the producer's own fixture
 * fixtures/conformance/host-adapter/snapshot.json (git blob 127c80eb at both 0107c72992f3 and 3f7d52cd), vendored here byte for
 * byte as test/fixtures/gp-host-adapter-snapshot.json; each CAPTURES row keeps the argv it ran. At 0107c72992f3 the presented
 * bytes are defined in gp's source: ts/src/cli/rpc-sample.ts:164-166 hashes JSON.stringify(graph), ts/src/cli/eval-run.ts:21
 * and :299 hash the presented file bytes. The non-ASCII variant (VARIANT_EDITS) is the fixture with one field edited and its
 * declared projection digest recomputed by gp; gp graph check accepts it. Its decomposed spelling (DECOMPOSED_GENERATOR) is never
 * sent to gp: it is the same text once NFC-normalized, so a site that normalizes before hashing joins a value it did not present.
 * RESIDUALS (named, each pinned by a quiet row): R-COMPUTED, R-ALIASED, R-TRANSITIVE and R-PATTERN (the scan); R-SHARED-NAME and
 * R-DRIVE-BYPASS (the registration judge).
 * THE SCAN'S OWN CLAIMS (wb-5efc, the landing-324 hollowing probes P15-P18): TOUCHPOINTS pins a private name for a field
 * (T-FIELD) and for the shared name (T-SHARED), and the dotted identities.graph path string beside the slashed one
 * (T-IDENTITIES). WALKS plants one synthetic tree per property srcFiles claims, on rule-11 scratch: hidden files and
 * directories, a nested extensionless file, a followed file link and directory link, each real directory walked once, a link
 * loop, the root/src scope, the listing in srcFiles' own sort order (two names whose UTF-8 byte order, the order readdirSync
 * returns, differs from their UTF-16 code-unit order), the depth-first listing (a directory's files at its name's place),
 * and a FIFO that fails the walk closed. ORACLE pins both answers of the whitespace-only oracle the clause-(c) rows read:
 * false for identical bytes, for a one-field value edit and for a space added inside a string value; true for the file
 * respelled compact.
 * THE SCAN'S TEXT READINGS (wb-yae1, the landing-417 under-report probes G19, G24 and G25): every landed text pin held its
 * name at the end of its string, or as the whole string, and named it once, so a scan reading only a suffix or only the
 * first occurrence stayed green. TOUCHPOINTS now holds each text reading away from the end and past the first occurrence:
 * the identities path inside a longer path, slashed ("/identities/graph/0", G19) and dotted; a field name inside a dotted
 * path string ("receipt.input_snapshot.value", G24); a whole-word field after a longer name that holds it
 * ("xinput_snapshot input_snapshot", G25) and before one (the last-occurrence twin); and the shared name inside a dotted
 * path.
 * THE SCAN'S TEXT READINGS, EVERY BOUNDARY AND PART (wb-njkv, the landing-507 under-report probes GA4, GA5b and GA6 and the
 * template probes GA7 and GA8): the landed pins bounded every whole word only by '/', '.', ' ', ',' and the text's ends, held
 * each slashed identities path behind a leading '/', put a field's only bounded occurrence no later than its second, and put a
 * field in no template middle and no template without substitutions, so a scan reading '-' as a word character (GA6), the slashed
 * path only after a '/' (GA5b), only the first two occurrences (GA4), and no template middle (GA7) or substitution-free template
 * (GA8) stayed green. TOUCHPOINTS now pins: both identities spellings, slashed and dotted, as the whole string and at the start,
 * inside and at the end of a longer path; a field bounded on both sides by each printable ASCII character that is not a letter,
 * digit, _ or $ (the hyphen among them); a field after two longer names that hold it (its third occurrence) and after sixteen;
 * and a field in a template head, a template middle, a template tail and a template without substitutions.
 * Rule 16: the frozen-shape case pins every table's row and pin shape and the live subjects; the OUT-OF-FILE anchor
 * test/fixtures/gp-snapshot-join-roster.json (the hk9l/5jha roster pattern) carries every judged row (table, id, label, the
 * SHA-256 of each pin), every registered test title and the residual families, and the roster case judges this file against it
 * in order and both ways, with each registered test's run mode.
 *
 * Display paths added: none. Test-only: no src change, no gp adapter, seam or fake binary.
 */
import { execFileSync } from "node:child_process";
import { lstatSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it } from "vitest";
import {
  CAPTURES,
  CASES,
  CLEAN,
  FIXTURE,
  type Fixture,
  fileText,
  fixtureOf,
  gitBlobId,
  type JudgedRow,
  judgeOutcome,
  MUTANTS,
  materialize,
  NEAR_NAMES,
  ORACLE,
  oracleText,
  outcomeFindings,
  PRODUCER,
  type Presented,
  presentedKey,
  REFERENCE,
  RESIDUAL_FAMILIES,
  RESIDUALS,
  ROWS,
  recipeDrive,
  ruleOf,
  SITE_CASES,
  type SiteEntry,
  scanSource,
  siteFindings,
  srcFiles,
  TOUCHPOINTS,
  type Touch,
  WALKS,
  whitespaceOnly,
} from "./helpers/gp-snapshot-join-census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER = "test/fixtures/gp-snapshot-join-roster.json";
const VENDORED = "test/fixtures/gp-host-adapter-snapshot.json";
/** src holds well over this many files; fewer means the walk found nothing. */
const MIN_SRC_FILES = 100;

/** A src module that joins Pi's presented snapshot against a gp-written value, with a drive over the census's presentations. */
interface JoinSite extends SiteEntry {
  /** Runs the site's join on one presentation and resolves to the outcome it reports. */
  readonly drive: (presented: Presented) => unknown;
}

/** The registry: every src module carrying a gp snapshot-join touch has exactly one entry. Empty today. */
const JOIN_SITES: readonly JoinSite[] = [];

let vendored: Fixture | undefined;
/** The vendored producer fixture (read once per run). */
const fixture = (): Fixture => {
  vendored ??= fixtureOf(readFileSync(join(ROOT, VENDORED)));
  return vendored;
};
/** The projection identity a snapshot declares for itself (digests.canonical). */
const declaredProjection = (snapshot: unknown): unknown => (snapshot as { readonly digests?: { readonly canonical?: unknown } }).digests?.canonical;
const sha256 = (bytes: Uint8Array): string => presentedKey({ transport: "cli", file: bytes, producer: { field: "input_snapshot", value: "" }, held: { "identities.graph": "", canonical_digest: "" } });

interface Roster {
  readonly rows: readonly JudgedRow[];
  readonly tests: readonly string[];
  readonly residuals: Readonly<Record<string, readonly string[]>>;
}
const readRoster = (): Roster => JSON.parse(readFileSync(join(ROOT, ROSTER), "utf8")) as Roster;

interface Live {
  readonly files: readonly string[];
  readonly texts: ReadonlyMap<string, string>;
  readonly touches: readonly Touch[];
}
let cached: Live | undefined;
/** The src tree as it stands: every regular file, its text and its touches (read once per run). */
function live(): Live {
  if (cached === undefined) {
    const files = srcFiles(ROOT);
    const texts = new Map(files.map(file => [file, readFileSync(join(ROOT, file), "utf8")] as const));
    cached = { files, texts, touches: files.flatMap(file => scanSource(file, texts.get(file) ?? "")) };
  }
  return cached;
}

const caseRow = (id: string): (typeof CASES)[number] => {
  const entry = CASES.find(candidate => candidate.id === id);
  if (entry === undefined) throw new Error(`no CASES row ${id}`);
  return entry;
};

describe("gp snapshot-join census (wb-gxd7.3, GPC-FEEDBACK-CONTRACT-AUDIT-R3)", () => {
  for (const entry of TOUCHPOINTS) {
    it(`TOUCHPOINTS ${entry.id}`, () => {
      for (const pin of entry.pins) expect(scanSource("pin.ts", pin).map(touch => touch.kind), pin).toEqual([entry.kind]);
    });
  }

  for (const entry of CLEAN) {
    it(`CLEAN ${entry.id}`, () => {
      for (const pin of entry.pins) expect(scanSource("pin.ts", pin), pin).toEqual([]);
    });
  }

  for (const entry of RESIDUALS) {
    it(`RESIDUALS ${entry.id}`, () => {
      // A quiet row: the scan reports nothing for this named residual's member (it is not claimed).
      for (const pin of entry.pins) expect(scanSource("pin.ts", pin), pin).toEqual([]);
    });
  }

  for (const entry of CAPTURES) {
    it(`CAPTURES ${entry.id}`, () => {
      const { bytes, value, variant } = fixture();
      const presentedForms = CAPTURES.filter(other => ["file-bytes", "stringify", "stringify-variant"].includes(other.recompute)).map(other => other.value);
      if (entry.recompute === "file-bytes") expect(sha256(bytes), "SHA-256 of the vendored file bytes").toBe(entry.value);
      else if (entry.recompute === "stringify") expect(sha256(Buffer.from(JSON.stringify(value), "utf8")), "SHA-256 of UTF-8 JSON.stringify of the fixture").toBe(entry.value);
      else if (entry.recompute === "stringify-variant") expect(sha256(Buffer.from(JSON.stringify(variant), "utf8")), "SHA-256 of UTF-8 JSON.stringify of the variant").toBe(entry.value);
      else {
        // gp's canonical forms are gp's to compute; Pi holds them only as values: the spelling, and never a presented-bytes key.
        if (entry.recompute === "declared") expect(declaredProjection(value), "the projection identity the fixture declares").toBe(entry.value);
        if (entry.recompute === "declared-variant") expect(declaredProjection(variant), "the projection identity the variant declares").toBe(entry.value);
        expect(entry.value).toMatch(/^graphpolicy\.snapshot\.c1:[0-9a-f]{64}$/);
        expect(presentedForms.filter(form => form === entry.value)).toEqual([]);
        expect(CAPTURES.filter(other => other.value === entry.value).map(other => other.id)).toEqual([entry.id]);
      }
      expect(entry.argv[0]).toBe("gp");
    });
  }

  for (const entry of FIXTURE) {
    it(`FIXTURE ${entry.id}`, () => {
      const { bytes, value, variant } = fixture();
      if (entry.id === "F-BLOB") {
        expect([gitBlobId(bytes), bytes.length]).toEqual([PRODUCER.fixtureBlob, PRODUCER.fixtureBytes]);
      } else {
        const pretty = sha256(bytes);
        const compact = sha256(Buffer.from(JSON.stringify(value), "utf8"));
        const third = sha256(Buffer.from(JSON.stringify(variant), "utf8"));
        expect(new Set([pretty, compact, third]).size, "pretty, compact and variant keys").toBe(3);
        expect(Buffer.from(bytes).toString("utf8")).not.toBe(JSON.stringify(value));
        expect(JSON.parse(Buffer.from(bytes).toString("utf8"))).toEqual(value);
      }
    });
  }

  for (const entry of CASES) {
    it(`CASES ${entry.id}`, async () => {
      const presented = materialize(fixture(), entry.presentation, entry.producer);
      const outcome = await recipeDrive(REFERENCE)(presented);
      // The reference join conforms and reports the expected kind.
      expect(judgeOutcome(outcome, presented)).toEqual([]);
      expect((outcome as { joined: boolean }).joined ? "joined" : "refused").toBe(entry.expect);
      // A joined row anchors the oracle to gp: the key over the presented bytes IS the value gp wrote.
      if (entry.expect === "joined") expect(presentedKey(presented)).toBe(presented.producer.value);
      else expect(presentedKey(presented)).not.toBe(presented.producer.value);
      if (entry.clause === "c" && entry.presentation.transport === "cli") {
        // A whitespace-only edit: the same JSON value, different bytes.
        expect(whitespaceOnly(fileText(fixture(), entry.presentation.file), Buffer.from(presented.transport === "cli" ? presented.file : new Uint8Array()).toString("utf8"))).toBe(true);
      }
    });
  }

  for (const entry of MUTANTS) {
    it(`MUTANTS ${entry.id}`, async () => {
      const target = caseRow(entry.case);
      const presented = materialize(fixture(), target.presentation, target.producer);
      const findings = await outcomeFindings(recipeDrive({ ...REFERENCE, ...entry.recipe }), presented);
      expect(findings.map(ruleOf), findings.join("\n")).toEqual(entry.expect);
      // Without the change the same case conforms, so each rule above is the mutant's own finding.
      expect(await outcomeFindings(recipeDrive(REFERENCE), presented)).toEqual([]);
    });
  }

  for (const entry of SITE_CASES) {
    it(`SITE_CASES ${entry.id}`, () => {
      const texts = new Map(Object.entries(entry.files));
      const touches = [...texts].flatMap(([file, text]) => scanSource(file, text));
      expect(siteFindings(entry.sites, entry.near, touches, texts).map(ruleOf)).toEqual(entry.expect);
    });
  }

  for (const entry of WALKS) {
    it(`WALKS ${entry.id}`, () => {
      const root = makeScratch("gp-snapshot-join-walk-");
      try {
        for (const [rel, node] of Object.entries(entry.tree)) {
          const path = join(root, rel);
          mkdirSync(dirname(path), { recursive: true });
          if (node.kind === "file") writeFileSync(path, node.text);
          else if (node.kind === "symlink") symlinkSync(node.target, path);
          else execFileSync("mkfifo", [path]);
        }
        // The planted tree is the shape its row names.
        const planted = Object.keys(entry.tree).map(rel => {
          const info = lstatSync(join(root, rel));
          return `${rel}:${info.isFIFO() ? "fifo" : info.isSymbolicLink() ? "symlink" : info.isFile() ? "file" : "other"}`;
        });
        expect(planted).toEqual(Object.entries(entry.tree).map(([rel, node]) => `${rel}:${node.kind}`));
        let walked: readonly string[] | string;
        try {
          walked = srcFiles(root);
        } catch (error) {
          walked = error instanceof Error ? error.message : String(error);
        }
        expect(walked).toEqual("throws" in entry.expect ? entry.expect.throws : entry.expect.files);
      } finally {
        removeScratch(root);
      }
    });
  }

  for (const entry of ORACLE) {
    it(`ORACLE ${entry.id}`, () => {
      const original = fileText(fixture(), entry.original);
      const text = oracleText(fixture(), entry.text);
      // The two texts are byte-identical exactly when the row names one text twice, so each answer is judged on the texts its label names.
      expect(text === original, "the row's texts are byte-identical").toBe(entry.text === entry.original);
      expect(whitespaceOnly(original, text)).toBe(entry.expect);
    });
  }

  it("live: the scan walks every regular file under src/ and reads Pi's own snapshotDigest members there", () => {
    const { files, touches } = live();
    expect(files.length).toBeGreaterThanOrEqual(MIN_SRC_FILES);
    expect(files).toContain("src/index.ts");
    const shared = [...new Set(touches.filter(touch => touch.kind === "SHARED").map(touch => touch.file))].sort();
    expect(shared, "the src modules naming snapshotDigest are exactly Pi's listed own uses").toEqual(NEAR_NAMES.map(entry => entry.file).sort());
  });

  it("live: no src module joins against a gp receipt today, and the registry and the listing match the touched modules", () => {
    const { texts, touches } = live();
    const joins = touches.filter(touch => touch.kind !== "SHARED").map(touch => `${touch.file}:${touch.line} ${touch.kind} ${touch.name}`);
    // Both readings in one assertion, so an unregistered site reds naming its S- finding beside the absence pin.
    expect({ registration: siteFindings(JOIN_SITES, NEAR_NAMES, touches, texts), joins }).toEqual({ registration: [], joins: [] });
  });

  it("live (a)+(b)+(c): every JOIN_SITES entry reports a conforming outcome on every CASES row", async () => {
    const touched = [...new Set(live().touches.filter(touch => touch.kind !== "SHARED").map(touch => touch.file))].sort();
    expect(JOIN_SITES.map(site => site.file).sort()).toEqual(touched);
    const findings: string[] = [];
    for (const site of JOIN_SITES) {
      for (const entry of CASES) {
        const found = await outcomeFindings(site.drive, materialize(fixture(), entry.presentation, entry.producer));
        findings.push(...found.map(finding => `${site.file} ${entry.id} ${finding}`));
      }
    }
    expect(findings).toEqual([]);
  });

  it("rule 16: every judged table and the live subjects are frozen at their measured shape", () => {
    expect(ROWS.map(entry => `${entry.table}/${entry.id}:${entry.pins.length}`)).toEqual([
      "TOUCHPOINTS/T-FIELD:48",
      "TOUCHPOINTS/T-IDENTITIES:14",
      "TOUCHPOINTS/T-PREFIX:3",
      "TOUCHPOINTS/T-SHARED:5",
      "CLEAN/C-PI-OWN:4",
      "CLEAN/C-NEAR-NAMES:5",
      "CLEAN/C-COMMENT:2",
      "RESIDUALS/R-COMPUTED:3",
      "RESIDUALS/R-ALIASED:2",
      "RESIDUALS/R-PATTERN:2",
      "RESIDUALS/R-TRANSITIVE:1",
      "CAPTURES/P-EVAL-FILE:1",
      "CAPTURES/P-SAMPLE-FILE:1",
      "CAPTURES/P-EVAL-COMPACT-FILE:1",
      "CAPTURES/P-RPC-COMPACT:1",
      "CAPTURES/P-RPC-SPACED:1",
      "CAPTURES/P-RPC-VARIANT:1",
      "CAPTURES/P-RPC-VARIANT-ESCAPED:1",
      "CAPTURES/P-GRAPH-CHECK:1",
      "CAPTURES/P-INSPECT-GRAPH:1",
      "CAPTURES/P-GRAPH-CHECK-VARIANT:1",
      "CAPTURES/P-INSPECT-GRAPH-VARIANT:1",
      "FIXTURE/F-BLOB:1",
      "FIXTURE/F-DISTINCT:1",
      "CASES/A-RPC-COMPACT:1",
      "CASES/A-RPC-SPACED:1",
      "CASES/A-RPC-VARIANT:1",
      "CASES/A-RPC-VARIANT-ESCAPED:1",
      "CASES/A-CLI-FILE:1",
      "CASES/A-CLI-SAMPLE:1",
      "CASES/A-CLI-COMPACT:1",
      "CASES/A-CROSS-DECOMPOSED:1",
      "CASES/A-CROSS-RPC:1",
      "CASES/A-CROSS-CLI:1",
      "CASES/B-IDENTITIES-GRAPH:1",
      "CASES/B-CANONICAL:1",
      "CASES/B-RELABELLED:1",
      "CASES/B-BARE:1",
      "CASES/B-UPPERCASE:1",
      "CASES/B-LAST-DIGIT:1",
      "CASES/B-PADDED:1",
      "CASES/C-APPEND-NEWLINE:1",
      "CASES/C-STRIP-NEWLINE:1",
      "CASES/C-CRLF:1",
      "CASES/C-TABS:1",
      "CASES/C-COMPACT-NEWLINE:1",
      "CASES/C-COMPACT-SPACE:1",
      "MUTANTS/M-REPARSE-FILE:1",
      "MUTANTS/M-REPARSE-WHITESPACE:1",
      "MUTANTS/M-PRETTY-RPC:1",
      "MUTANTS/M-FRAME-SPACED:1",
      "MUTANTS/M-FRAME-ESCAPED:1",
      "MUTANTS/M-TRIM:1",
      "MUTANTS/M-LINE-ENDINGS:1",
      "MUTANTS/M-LATIN1:1",
      "MUTANTS/M-UTF16:1",
      "MUTANTS/M-ASCII-ESCAPED:1",
      "MUTANTS/M-NFC-NORMALIZED:1",
      "MUTANTS/M-HELD-GRAPH:1",
      "MUTANTS/M-HELD-CANONICAL:1",
      "MUTANTS/M-HELD-GRAPH-CLI:1",
      "MUTANTS/M-TRUST-PRODUCER:1",
      "MUTANTS/M-BARE-KEY:1",
      "MUTANTS/M-HEX-SUFFIX:1",
      "MUTANTS/M-HEX-SUFFIX-BARE:1",
      "MUTANTS/M-CASE-FOLD:1",
      "MUTANTS/M-PREFIX-COMPARE:1",
      "MUTANTS/M-TRIM-PRODUCER:1",
      "MUTANTS/M-ALWAYS:1",
      "MUTANTS/M-NEVER:1",
      "MUTANTS/M-CODE-MISSING:1",
      "MUTANTS/M-CODE-RENAMED:1",
      "MUTANTS/M-FIELD:1",
      "MUTANTS/M-ECHO-RECASED:1",
      "MUTANTS/M-PRESENTED-MISSING:1",
      "MUTANTS/M-THROWS:1",
      "MUTANTS/M-NULL:1",
      "MUTANTS/M-BOOLEAN:1",
      "SITE_CASES/S-REGISTERED:1",
      "SITE_CASES/S-UNREGISTERED:1",
      "SITE_CASES/S-STALE:1",
      "SITE_CASES/S-DUPLICATE:1",
      "SITE_CASES/S-UNEXPORTED:1",
      "SITE_CASES/S-NEAR-LISTED:1",
      "SITE_CASES/S-NEAR-UNLISTED:1",
      "SITE_CASES/S-NEAR-STALE:1",
      "SITE_CASES/S-NEAR-FIELD:1",
      "SITE_CASES/S-NEAR-REASON:1",
      "SITE_CASES/R-SHARED-NAME:1",
      "SITE_CASES/R-DRIVE-BYPASS:1",
      "WALKS/W-HIDDEN:1",
      "WALKS/W-EXTENSIONLESS:1",
      "WALKS/W-SYMLINKED-FILE:1",
      "WALKS/W-LINKED-DIRECTORY:1",
      "WALKS/W-DIRECTORY-ALIAS:1",
      "WALKS/W-DIRECTORY-LOOP:1",
      "WALKS/W-SCOPE:1",
      "WALKS/W-SORTED:1",
      "WALKS/W-DEPTH-FIRST:1",
      "WALKS/W-FIFO:1",
      "ORACLE/O-UNCHANGED:1",
      "ORACLE/O-RESPELLED:1",
      "ORACLE/O-VALUE-EDIT:1",
      "ORACLE/O-SPACE-IN-STRING:1",
    ]);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([family, members]) => `${family}:${members.join(",")}`)).toEqual([
      "R-COMPUTED:RESIDUALS R-COMPUTED",
      "R-ALIASED:RESIDUALS R-ALIASED",
      "R-TRANSITIVE:RESIDUALS R-TRANSITIVE",
      "R-PATTERN:RESIDUALS R-PATTERN",
      "R-SHARED-NAME:SITE_CASES R-SHARED-NAME",
      "R-DRIVE-BYPASS:SITE_CASES R-DRIVE-BYPASS",
    ]);
    expect(JOIN_SITES.map(site => `${site.file}#${site.join}`)).toEqual([]);
    expect(NEAR_NAMES.map(entry => `${entry.file}#${entry.name}`)).toEqual(["src/workbench/detached-observer.ts#snapshotDigest", "src/workbench/hosts/local-detached.ts#snapshotDigest"]);
  });

  it("roster: the judged rows, the registered tests and the residual families equal test/fixtures/gp-snapshot-join-roster.json, in order and both ways", ({ task }) => {
    const roster = readRoster();
    expect(ROWS, "the judged rows, read now, equal the roster rows exactly and in order").toEqual(roster.rows);
    expect(RESIDUAL_FAMILIES, "the named residual families equal the roster's").toEqual(roster.residuals);
    for (const member of Object.values(roster.residuals).flat()) expect(ROWS.some(entry => entry.test === member), `${member} is a judged row`).toBe(true);
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(roster.tests);
    expect(roster.tests.slice(0, ROWS.length), "each judged row registers its own test, in row order").toEqual(ROWS.map(entry => entry.test));
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
