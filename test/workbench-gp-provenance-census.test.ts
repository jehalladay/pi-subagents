/**
 * wb-gxd7.5 (GPC-FEEDBACK-CONTRACT-AUDIT-R5): "Pi shall ground every claim about gp in machine-captured evidence at a
 * pinned build: identify gp by checkout SHA plus built-entry sha256, never by `gp --version`; take capabilities from a
 * captured `gp --help`/`hello` roster, never SKILL.md prose, so a missing fixture or binary is 'prerequisite-missing',
 * never 'not implemented'; vendor only generated or `gp sample` receipt fixtures that `gp inspect decision --json`
 * accepts" - GraphPolicyCLI docs/programs/feedback-contract-audit-2026-10-21/04-verification-playbook.md:37@0107c72992f3
 * (program status at 0107c72992f3: "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics")
 * ("`gp --version` is known to print a stale command shortlist and is not a revision ID."); merged pins 04:104, 04:109,
 * 03-developer-workplan.md:7 and :67; authority 01-finding-inventory.md:49 ("Never conflate the installed command with
 * source HEAD."). The four acceptance clauses (ACCEPTANCE, quoted verbatim from the bead) map one table each:
 *  (a) PROVENANCE: provenanceFindings refuses a record without the 40-hex checkout sha and the 64-hex entry sha256, and
 *      a version line in any revision field; revisionOf never returns the version line;
 *  (b) CAPABILITY: capabilityOf reads the captured roster test/fixtures/gp-capability-capture.json (help commands, hello
 *      methods, the producing sha) and claimFindings refuses a not-implemented status, a claim off the captured sha, a
 *      claim read from skill prose or the --version shortlist, and a claim the roster contradicts;
 *  (c) DOC_LINES: docLineClasses reads a markdown line as C1 (a gp revision via its version number or --version, without
 *      the build it means) or C2 (a gp verb served/unserved without the roster or a sha); the live (c) row walks every
 *      markdown file below the root;
 *  (d) RECEIPT_MUTANTS and RESOLVE: receiptFixtureFindings judges the vendored receipt test/fixtures/gp-sample-receipt.json
 *      (gp sample output, its generator argv, sha, entry sha256, probability_exactness and the recorded inspect
 *      acceptance); the live (d) row walks every JSON file below the root for a decision receipt; the live leg replays the
 *      capture and runs `gp inspect decision --json` over the vendored receipt when the installed gp is the pinned build
 *      (resolvePinnedGp), and otherwise records a typed prerequisite-missing receipt (missing binary or pinned build).
 *
 * PRODUCER FACTS (measured 2026-10-23, never via gp --version as a revision): the installed gp is the clean checkout
 * 3f7d52cd17397d8ed22e2c768714a057fe098b62 (the bead pin 0107c72992f3 is its ancestor), built entry ts/dist/main.js sha256
 * 0ad799c31da1dcd3ea3abf78bb099a407072c11ce63a76c2c6a1dd6b9ba52bd4, run as node <entry>. ts/src/version.ts is one blob
 * (6e945010) at five revisions (b68b777, a173f61, 22f978a, the pin and 3f7d52cd), so all five print one --version line;
 * that line lists six commands while --help lists the doc-10 thirteen and the extensions, and the captured hello serves
 * compile, evaluate, inspect, sample and validateGraph and refuses train, feedback, promote and acknowledgeState with
 * GP_RPC_HELLO_OP_NOT_ALLOWED. SKILL.md:13-14 says compilation, evaluation, sampling and training are "designed but NOT
 * implemented" at the pin and implemented at 3f7d52cd, beside the same version line. gp sample with the producer's own
 * generator argv (seed 11, the host-adapter inputs) wrote a decision deep-equal to the producer's committed receipt.json at
 * 3f7d52cd (blob c0fb7f43), which gp inspect decision accepts with recompute bitwise; the pin's receipt.json (blob c58d4878)
 * is the same receipt without probability_exactness, refused exit 2 at /probability_exactness (finding F04).
 *
 * KNOWN UNGROUNDED (live (c)): three lines of landed append-only receipts (R539) cite gp by its version - wb-1xvp.3.md:15
 * and :18 and wb-1xvp.5.md:11 - and are pinned by line text sha256 as disclosed findings; any other citation reds.
 * RESIDUALS (named, each with a pinned quiet row): R-SPLIT-LINE, R-ENCODED, R-PARAPHRASE, R-NON-MARKDOWN, R-SHAPE-ONLY,
 * R-LISTED-NOT-SERVED, R-STATIC-RECEIPT, R-CAPTURE-REPLAY, R-LEXICAL-GROUNDING, R-JSONL.
 * Rule 16: the frozen-shape case pins every table's row and pin shape, the residual families, the known set and the
 * clause map; the OUT-OF-FILE anchors are test/fixtures/gp-provenance-roster.json (every judged row with the SHA-256 of
 * each pin, every registered test title, the residual families and the known set; the roster case judges this file
 * against it in order and both ways, with each test's run mode), the captured roster (every captured rpc op and cli word
 * is a judged case) and the bead's export row in .beads/issues.jsonl (the four clauses).
 *
 * Display paths added: none. Test-only: no src change, no gp seam. No scratch is allocated: every case is in memory, and
 * the live leg passes the receipt to gp on stdin.
 */
import { spawnSync } from "node:child_process";
import { readFileSync, realpathSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ACCEPTANCE,
  applyEdits,
  BEAD,
  CAPABILITY,
  CAPTURE_EDITS,
  CAPTURE_FIXTURE,
  type Capture,
  CLAUSE_TABLES,
  capabilityOf,
  claimFindings,
  DOC_LINES,
  docFindings,
  docLineClasses,
  docTextFindings,
  filesBelow,
  type HostFs,
  KNOWN_UNGROUNDED,
  memoryHost,
  namesGp,
  PROVENANCE,
  provenanceFindings,
  RECEIPT_FIXTURE,
  RECEIPT_MUTANTS,
  RESIDUAL_FAMILIES,
  RESIDUALS,
  RESOLVE,
  RESOLVE_PIN,
  ROSTER_FIXTURE,
  ROWS,
  readCapture,
  readClaim,
  receiptFixtureFindings,
  resolutionText,
  resolvePinnedGp,
  revisionOf,
  rosterOf,
  ruleOf,
  STATIC_RECEIPT_EDITS,
  sha256,
  VENDORED_RECEIPTS,
  VERSION_LINE,
  vendoredReceipts,
} from "./helpers/gp-provenance-census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** The tree holds well over these many markdown and JSON files; fewer means a walk found nothing. */
const MIN_DOC_FILES = 100;
const MIN_JSON_FILES = 50;
/** The live leg's bound: four short gp processes, each under its own 60 s timeout, on a loaded host. */
const LIVE_TIMEOUT_MS = 240_000;

const readJson = (file: string): unknown => JSON.parse(readFileSync(join(ROOT, file), "utf8"));
function capture(): Capture {
  const found = readCapture(ROOT);
  if (found === undefined) throw new Error(`${CAPTURE_FIXTURE} is absent: the captured roster is a prerequisite`);
  return found;
}
type Fixture = Record<string, Record<string, unknown>>;
const receiptFixture = (): Fixture => readJson(RECEIPT_FIXTURE) as Fixture;

interface Roster {
  readonly rows: unknown;
  readonly tests: readonly string[];
  readonly residuals: unknown;
  readonly known: unknown;
}
const readRoster = (): Roster => readJson(ROSTER_FIXTURE) as Roster;

/** The real host the live leg resolves gp on. */
const realHost: HostFs = {
  isFile: (path) => {
    try {
      return statSync(path).isFile();
    } catch {
      return false;
    }
  },
  realpath: (path) => realpathSync(path),
  read: (path) => readFileSync(path),
};

describe("gp provenance census (wb-gxd7.5, GPC-FEEDBACK-CONTRACT-AUDIT-R5)", () => {
  for (const entry of PROVENANCE) {
    it(`PROVENANCE ${entry.id}`, () => {
      for (const item of entry.cases) {
        const text = JSON.stringify(item.record);
        expect(provenanceFindings(item.record).map(ruleOf), text).toEqual(item.expect);
        const revision = revisionOf(item.record);
        expect(revision.ok, text).toBe(item.expect.length === 0);
        // A revision is the record's two identities, never its version line.
        if (revision.ok) expect(revision, text).toEqual({ ok: true, ...Object.fromEntries(["sourceSha", "entrySha256"].map((key) => [key, (item.record as Record<string, unknown>)[key]])) });
        else expect([revision.code, revision.rules], text).toEqual(["provenance-incomplete", item.expect]);
      }
    });
  }

  for (const entry of CAPABILITY) {
    it(`CAPABILITY ${entry.id}`, () => {
      const captured = capture();
      for (const item of entry.cases) {
        const claim = readClaim(item, captured);
        const text = `${item.reader} ${item.surface} ${item.verb}`;
        expect(claim.status, text).toBe(item.status);
        expect(claimFindings(claim, item.reader === "no-capture" ? undefined : captured).map(ruleOf), text).toEqual(item.expect);
        // The reference readers never mint not-implemented: a gap in evidence is a missing prerequisite.
        if (item.reader !== "prose") expect(claim.status, text).not.toBe("not-implemented");
      }
    });
  }

  for (const entry of DOC_LINES) {
    it(`DOC_LINES ${entry.id}`, () => {
      const roster = rosterOf(capture());
      for (const item of entry.cases) expect(docLineClasses(item.line, roster), item.line).toEqual(item.expect);
    });
  }

  for (const entry of RECEIPT_MUTANTS) {
    it(`RECEIPT_MUTANTS ${entry.id}`, () => {
      const captured = capture();
      const fixture = receiptFixture();
      // The vendored fixture conforms, so each rule below is the edit's own finding.
      expect(receiptFixtureFindings(fixture, captured)).toEqual([]);
      expect(receiptFixtureFindings(applyEdits(fixture, entry.edits), captured).map(ruleOf)).toEqual(entry.expect);
    });
  }

  for (const entry of RESOLVE) {
    it(`RESOLVE ${entry.id}`, () => {
      expect(resolutionText(resolvePinnedGp(entry.path, RESOLVE_PIN, memoryHost(entry)))).toBe(entry.expect);
    });
  }

  for (const entry of RESIDUALS) {
    it(`RESIDUALS ${entry.id}`, () => {
      const captured = capture();
      const roster = rosterOf(captured);
      for (const pin of entry.pins) {
        switch (entry.probe) {
          case "doc":
            // A quiet row: the docs census reads nothing in this member of the named family.
            expect(docTextFindings("residual.md", pin, roster), pin).toEqual([]);
            break;
          case "walk": {
            // The member is real (its text holds a C1 line when read as markdown) and the walk never reads its file.
            const findings = docTextFindings(pin, readFileSync(join(ROOT, pin), "utf8"), roster).map((finding) => finding.cls);
            expect(findings, pin).toContain("C1");
            expect(filesBelow(ROOT, ".md"), pin).not.toContain(pin);
            break;
          }
          case "provenance":
            expect(provenanceFindings(JSON.parse(pin)), pin).toEqual([]);
            break;
          case "capability":
            // --help's own paragraph names the verb not implemented, and the census still claims only its listing.
            expect(captured.help.notImplemented.join(" "), pin).toMatch(new RegExp(`(?:^|[\\s,])${pin}(?:[\\s,]|$)`));
            expect(capabilityOf(captured, "cli", pin).status, pin).toBe("listed");
            break;
          case "walk-json": {
            // The member is real (a JSON-lines file of the tree) and the receipt walk never parses it.
            const first = readFileSync(join(ROOT, pin), "utf8").split("\n")[0] ?? "";
            expect(typeof JSON.parse(first), pin).toBe("object");
            expect(filesBelow(ROOT, ".json"), pin).not.toContain(pin);
            break;
          }
          case "capture": {
            // The edit changes the capture, and no static reading of it moves: the roster, the build, every claim.
            const edited = applyEdits(captured, CAPTURE_EDITS[pin] ?? []) as Capture;
            expect(JSON.stringify(edited), pin).not.toBe(JSON.stringify(captured));
            expect(rosterOf(edited), pin).toEqual(roster);
            expect(provenanceFindings(edited.build), pin).toEqual([]);
            for (const item of CAPABILITY.flatMap((entry) => entry.cases)) expect(readClaim(item, edited), pin).toEqual(readClaim(item, captured));
            break;
          }
          case "receipt": {
            // The edit changes the fixture, and the static judge stays silent on it.
            const edited = applyEdits(receiptFixture(), STATIC_RECEIPT_EDITS[pin] ?? []);
            expect(JSON.stringify(edited), pin).not.toBe(JSON.stringify(receiptFixture()));
            expect(receiptFixtureFindings(edited, captured), pin).toEqual([]);
            break;
          }
        }
      }
    });
  }

  it("bead: the four acceptance clauses this census arms are the bead's own words, each judged by its tables", () => {
    const rows = readFileSync(join(ROOT, ".beads/issues.jsonl"), "utf8")
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => JSON.parse(line) as { id?: unknown; notes?: unknown });
    const bead = rows.find((candidate) => candidate.id === BEAD);
    expect(typeof bead?.notes, "the bead's export row carries its notes").toBe("string");
    for (const clause of ACCEPTANCE) expect(String(bead?.notes).includes(clause), clause).toBe(true);
    expect(CLAUSE_TABLES.map((tables) => tables.every((table) => ROWS.some((entry) => entry.table === table)))).toEqual([true, true, true, true]);
  });

  it("live (a): the captured build is a provenance, five revisions print its one --version line, and that line is no revision", () => {
    const captured = capture();
    const { build } = captured;
    const line = captured.version.stdout.replace(/\n$/, "");
    expect(line).toBe(VERSION_LINE);
    expect(provenanceFindings({ ...build, versionLine: line })).toEqual([]);
    expect(revisionOf(build)).toEqual({ ok: true, sourceSha: build.sourceSha, entrySha256: build.entrySha256 });
    expect(provenanceFindings({ sourceSha: line, entrySha256: build.entrySha256 }).map(ruleOf)).toEqual(["P-SOURCE-SHA", "P-VERSION-AS-REVISION"]);
    // version.ts renders exactly the captured line, and it is one blob at five distinct revisions: the line names none.
    const source = captured.versionSource;
    const revisions = source.revisions;
    const version = /"([^"]+)"/.exec(source.constText)?.[1];
    const protocol = /"([^"]+)"/.exec(revisions[0]?.rpcSchemaId ?? "")?.[1];
    const template = /`([^`]+)`/.exec(source.text)?.[1] ?? "";
    expect(template.replace(["$", "{VERSION}"].join(""), String(version)).replace(["$", "{protocolId}"].join(""), String(protocol))).toBe(line);
    expect(new Set(revisions.map((revision) => revision.sha)).size).toBe(revisions.length);
    expect(revisions.map((revision) => revision.sha.slice(0, 7))).toEqual(["b68b777", "a173f61", "22f978a", "0107c72", "3f7d52c"]);
    expect(new Set(revisions.map((revision) => `${revision.versionTsBlob} ${revision.rpcSchemaId}`)).size).toBe(1);
    expect(revisions.map((revision) => revision.sha)).toEqual(expect.arrayContaining([build.sourceSha, build.programPin]));
    for (const revision of revisions) expect(provenanceFindings({ sourceSha: revision.sha, entrySha256: build.entrySha256 }), revision.sha).toEqual([]);
  });

  it("live (b): the capture is one build's roster - help commands, hello methods and the producing sha - and every captured op and word is judged", () => {
    const captured = capture();
    const roster = rosterOf(captured);
    expect([captured.build.checkoutClean, captured.build.programPinIsAncestor]).toEqual([true, true]);
    expect(provenanceFindings(captured.build)).toEqual([]);
    expect([captured.version.exit, captured.help.exit, captured.hello.exit, captured.version.stderr, captured.help.stderr, captured.hello.stderr]).toEqual([0, 0, 0, "", "", ""]);
    expect([captured.help.commands[0], captured.help.extensions[0], captured.help.notImplemented[0]]).toEqual([
      "Commands (doc 10, docs/program/10-cli-sdk.md):",
      "Extensions (outside doc 10; each required by its own row):",
      "Not implemented (refused with exit 2 GP_CLI_NOT_IMPLEMENTED until their beads land):",
    ]);
    expect(captured.hello.requests.length).toBe(captured.hello.replies.length);
    expect(roster.served).toEqual(["compile", "evaluate", "inspect", "sample", "validateGraph"]);
    expect(roster.refused).toEqual(["train", "feedback", "promote", "acknowledgeState"]);
    expect(roster.rpc).toEqual(["hello", ...roster.served, ...roster.refused, "close"]);
    expect(roster.cli).toEqual(["init", "graph", "check", "build", "inspect", "eval", "sample", "train", "test", "benchmark", "feedback", "promote", "rpc", "compose", "store", "profile", "conformance", "state", "journal", "skill"]);
    // The capture anchors the rows: every captured rpc op and every listed cli word is a judged reference case.
    const judged = new Set(CAPABILITY.flatMap((entry) => entry.cases.filter((item) => item.reader === "reference").map((item) => `${item.surface}:${item.verb}`)));
    const owed = [...[...roster.served, ...roster.refused].map((op) => `rpc:${op}`), ...roster.cli.map((word) => `cli:${word}`)];
    const residual = new Set(RESIDUALS.filter((entry) => entry.probe === "capability").flatMap((entry) => entry.pins.map((pin) => `cli:${pin}`)));
    expect(
      owed.filter((key) => !judged.has(key) && !residual.has(key)),
      "every captured rpc op and listed cli word is a judged case or a residual member",
    ).toEqual([]);
    const verdicts = CAPABILITY.flatMap((entry) => entry.cases.filter((item) => item.reader === "reference" && (item.status === "served" || item.status === "refused")).map((item) => `${item.surface}:${item.verb}`));
    expect(
      verdicts.filter((key) => !owed.includes(key)),
      "every served or refused case is a captured rpc op",
    ).toEqual([]);
    // The prose at the pin and at the source disagree beside one version line: prose is no roster.
    expect(captured.skillProse.atPin.join(" ")).toMatch(/designed but NOT implemented/);
    expect(captured.skillProse.atSource.join(" ")).not.toMatch(/NOT implemented/);
  });

  it("live (c): every markdown file below the root is read, and its ungrounded gp citations are exactly the known three", () => {
    const roster = rosterOf(capture());
    const files = filesBelow(ROOT, ".md");
    expect(files.length).toBeGreaterThanOrEqual(MIN_DOC_FILES);
    for (const page of ["README.md", "AGENTS.md", "CHANGELOG.md", "CONTRIBUTING.md", "SECURITY.md", "docs/workbench/03-architecture-and-ownership.md"]) expect(files, page).toContain(page);
    // The walk reads gp text: docs/03's GraphPolicyCLI boundary names gp, and is read clean.
    const docs03 = readFileSync(join(ROOT, "docs/workbench/03-architecture-and-ownership.md"), "utf8").split("\n");
    expect(docs03.filter((line) => namesGp(line)).length).toBeGreaterThanOrEqual(3);
    const findings = docFindings(ROOT, roster).map((finding) => ({ file: finding.file, line: finding.line, cls: finding.cls, sha256: sha256(finding.text) }));
    expect(findings).toEqual(KNOWN_UNGROUNDED);
  });

  it("live (d): every JSON file below the root is read, and its one gp decision receipt is the vendored fixture, generated and accepted", () => {
    const walk = vendoredReceipts(ROOT);
    expect(walk.files.length).toBeGreaterThanOrEqual(MIN_JSON_FILES);
    expect(walk.files).toEqual(expect.arrayContaining(["package.json", CAPTURE_FIXTURE, RECEIPT_FIXTURE]));
    expect(walk.unparsed).toEqual([]);
    expect(walk.receipts, "every vendored decision receipt is registered, and every registered one is found").toEqual(VENDORED_RECEIPTS);
    const captured = capture();
    for (const vendored of VENDORED_RECEIPTS) {
      expect(vendored.pointer, vendored.file).toBe("/receipt");
      expect(receiptFixtureFindings(readJson(vendored.file), captured), vendored.file).toEqual([]);
    }
    const fixture = receiptFixture();
    const generator = fixture.generator as { producerReceipt: { deepEqual: unknown; blob: unknown }; inputs: unknown[] };
    expect([generator.producerReceipt.deepEqual, /^[0-9a-f]{40}$/.test(String(generator.producerReceipt.blob)), generator.inputs.length]).toEqual([true, true, 4]);
    const validation = fixture.validation as { recompute: { within_tolerance: unknown }; pinReceipt: { exit: unknown; code: unknown; equalsReceiptWithout: unknown; rejections: { path: unknown }[] } };
    expect(validation.recompute.within_tolerance).toBe(true);
    const pin = validation.pinReceipt;
    expect([pin.exit, pin.code, pin.equalsReceiptWithout, pin.rejections.map((rejection) => rejection.path)]).toEqual([2, "GP_CLI_DECISION_INVALID", "probability_exactness", ["/probability_exactness"]]);
  });

  it("live leg: the installed gp, when it is the pinned build, replays the capture and accepts the vendored receipt; any other host records a typed prerequisite-missing receipt", { timeout: LIVE_TIMEOUT_MS }, async ({ annotate, task }) => {
    const captured = capture();
    const fixture = receiptFixture();
    const resolution = resolvePinnedGp(process.env.PATH, captured.build.entrySha256, realHost);
    // The branch this host took, in the run's own report (task meta reaches the JSON report; the annotation, the reporters).
    Object.assign(task.meta, { gpLiveLeg: resolutionText(resolution) });
    await annotate(`live leg: ${resolutionText(resolution)}`);
    if (resolution.status !== "pinned") {
      // The skip receipt: a missing binary or another build, never not-implemented.
      expect(["binary", "pinned-build"]).toContain(resolution.missing);
      expect(capabilityOf(captured, "rpc", "sample", "absent")).toEqual({ surface: "rpc", verb: "sample", status: "prerequisite-missing", missing: "binary" });
      return;
    }
    const run = (args: readonly string[], input?: string) => spawnSync(process.execPath, [resolution.entry, ...args], { cwd: ROOT, encoding: "utf8", input, timeout: 60_000 });
    const version = run(["--version"]);
    expect([version.status, version.stdout, version.stderr]).toEqual([0, captured.version.stdout, ""]);
    const help = run(["--help"]);
    expect([help.status, Buffer.byteLength(help.stdout), sha256(help.stdout), help.stderr]).toEqual([0, captured.help.stdoutBytes, captured.help.stdoutSha256, ""]);
    const hello = run(["rpc", "--stdio"], `${captured.hello.requests.join("\n")}\n`);
    expect([hello.status, hello.stdout.split("\n").filter((line) => line !== ""), hello.stderr]).toEqual([0, captured.hello.replies, ""]);
    const inspect = run(["inspect", "decision", "--file", "-", "--recompute-logprob", "--json"], JSON.stringify(fixture.receipt));
    expect([inspect.status, inspect.stderr]).toEqual([0, ""]);
    const accepted = JSON.parse(inspect.stdout) as { ok: unknown; result: { valid: unknown; recompute: unknown } };
    expect([accepted.ok, accepted.result.valid, accepted.result.recompute]).toEqual([true, true, (fixture.validation as { recompute: unknown }).recompute]);
    // The pin's receipt, the same receipt without probability_exactness, is refused (F04), as the fixture records.
    const { probability_exactness: _label, ...pinReceipt } = fixture.receipt;
    const refused = run(["inspect", "decision", "--file", "-", "--json"], JSON.stringify(pinReceipt));
    const envelope = JSON.parse(refused.stdout) as { ok: unknown; error: { code: unknown; details: { rejections: unknown } } };
    const recorded = (fixture.validation as { pinReceipt: { code: unknown; rejections: unknown } }).pinReceipt;
    expect([refused.status, envelope.ok, envelope.error.code, envelope.error.details.rejections]).toEqual([2, false, recorded.code, recorded.rejections]);
  });

  it("rule 16: every judged table, the residual families, the known set and the clause map are frozen at their measured shape", () => {
    expect(ROWS.map((entry) => `${entry.table}/${entry.id}:${entry.pins.length}`)).toEqual([
      "PROVENANCE/P-ACCEPT:3",
      "PROVENANCE/P-VERSION-LINE:4",
      "PROVENANCE/P-SOURCE-SHA:5",
      "PROVENANCE/P-ENTRY-SHA256:4",
      "PROVENANCE/P-NOT-A-RECORD:4",
      "CAPABILITY/B-SERVED:5",
      "CAPABILITY/B-REFUSED:4",
      "CAPABILITY/B-LISTED:17",
      "CAPABILITY/B-UNLISTED:3",
      "CAPABILITY/B-PREREQUISITE:3",
      "CAPABILITY/B-PROSE-READER:3",
      "CAPABILITY/B-VERSION-READER:3",
      "DOC_LINES/D-C1-VERSION:7",
      "DOC_LINES/D-C2-VERB:5",
      "DOC_LINES/D-GROUNDED:3",
      "DOC_LINES/D-QUIET:5",
      "RECEIPT_MUTANTS/M-PIN-RECEIPT:1",
      "RECEIPT_MUTANTS/M-EMPTY-EXACTNESS:1",
      "RECEIPT_MUTANTS/M-NO-ARGV:1",
      "RECEIPT_MUTANTS/M-HAND-WRITTEN:1",
      "RECEIPT_MUTANTS/M-NO-SEED:1",
      "RECEIPT_MUTANTS/M-VERSION-SHA:1",
      "RECEIPT_MUTANTS/M-SHORT-SHA:1",
      "RECEIPT_MUTANTS/M-OTHER-ENTRY:1",
      "RECEIPT_MUTANTS/M-EXTRA-FIELD:1",
      "RECEIPT_MUTANTS/M-SCHEMA:1",
      "RECEIPT_MUTANTS/M-NOT-VALIDATED:1",
      "RECEIPT_MUTANTS/M-REFUSED:1",
      "RESOLVE/L-PINNED:1",
      "RESOLVE/L-OTHER-BUILD:1",
      "RESOLVE/L-FIRST-WINS:1",
      "RESOLVE/L-NO-BINARY:1",
      "RESOLVE/L-NO-PATH:1",
      "RESIDUALS/R-SPLIT-LINE:2",
      "RESIDUALS/R-ENCODED:2",
      "RESIDUALS/R-PARAPHRASE:2",
      "RESIDUALS/R-NON-MARKDOWN:1",
      "RESIDUALS/R-SHAPE-ONLY:1",
      "RESIDUALS/R-LISTED-NOT-SERVED:3",
      "RESIDUALS/R-STATIC-RECEIPT:2",
      "RESIDUALS/R-CAPTURE-REPLAY:2",
      "RESIDUALS/R-LEXICAL-GROUNDING:1",
      "RESIDUALS/R-JSONL:1",
    ]);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([family, members]) => `${family}:${members.join(",")}`)).toEqual([
      "R-SPLIT-LINE:RESIDUALS R-SPLIT-LINE",
      "R-ENCODED:RESIDUALS R-ENCODED",
      "R-PARAPHRASE:RESIDUALS R-PARAPHRASE",
      "R-NON-MARKDOWN:RESIDUALS R-NON-MARKDOWN",
      "R-SHAPE-ONLY:RESIDUALS R-SHAPE-ONLY",
      "R-LISTED-NOT-SERVED:RESIDUALS R-LISTED-NOT-SERVED",
      "R-STATIC-RECEIPT:RESIDUALS R-STATIC-RECEIPT",
      "R-CAPTURE-REPLAY:RESIDUALS R-CAPTURE-REPLAY",
      "R-LEXICAL-GROUNDING:RESIDUALS R-LEXICAL-GROUNDING",
      "R-JSONL:RESIDUALS R-JSONL",
    ]);
    expect(KNOWN_UNGROUNDED.map((entry) => `${entry.file}:${entry.line}:${entry.cls}`)).toEqual(["docs/workbench/receipts/wb-1xvp.3.md:15:C1", "docs/workbench/receipts/wb-1xvp.3.md:18:C1", "docs/workbench/receipts/wb-1xvp.5.md:11:C1"]);
    expect(CLAUSE_TABLES.map((tables) => tables.join("+"))).toEqual(["PROVENANCE", "CAPABILITY", "DOC_LINES", "RECEIPT_MUTANTS+RESOLVE"]);
  });

  it("roster: the judged rows, the registered tests, the residual families and the known set equal test/fixtures/gp-provenance-roster.json, in order and both ways", ({ task }) => {
    const roster = readRoster();
    expect(ROWS, "the judged rows, read now, equal the roster rows exactly and in order").toEqual(roster.rows);
    expect(RESIDUAL_FAMILIES, "the named residual families equal the roster's").toEqual(roster.residuals);
    expect(KNOWN_UNGROUNDED, "the known ungrounded lines equal the roster's").toEqual(roster.known);
    for (const member of Object.values(RESIDUAL_FAMILIES).flat()) expect(ROWS.some((entry) => entry.test === member), `${member} is a judged row`).toBe(true);
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map((entry) => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(roster.tests);
    expect(roster.tests.slice(0, ROWS.length), "each judged row registers its own test, in row order").toEqual(ROWS.map((entry) => entry.test));
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex((entry) => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
