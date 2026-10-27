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
 * Rule 16: the frozen-shape case pins every table's row and pin shape, the residual families, the known set, the clause
 * map and (wb-pzbq) the standalone cases by key; the OUT-OF-FILE anchors are test/fixtures/gp-provenance-roster.json (every
 * judged row with the SHA-256 of each pin, every registered test title, the residual families, the known set and, since
 * wb-pzbq, the clause map; the roster case judges this file against it in order and both ways, with each test's run mode),
 * the captured roster (every captured rpc op and cli word is a judged case) and the bead's export row in .beads/issues.jsonl
 * (the four clauses).
 * OUTSIDE ANCHORS (wb-atq9, the wb-gxd7.5 gate's F1 and F2): the roster is a same-cut literal, so a coordinated hollow of
 * this file, the helper and the roster together stayed green below the capture and the docs walk. Three readers anchor the
 * census outside all three. (1) The append-only receipt docs/workbench/receipts/wb-atq9.md, read through the shared docs
 * reader of test/helpers/census.ts: every level-3 section is a ledger section "<family>, wb-atq9 cut <n>" rendering one
 * table, and the ledger (every cut's tables in cut order: a member stands once a cut adds it and leaves only when a Removed
 * table names it, so a restated table that drops a member removes nothing) equals the census's judged set both ways: every
 * row with its label and each pin (the first 16 hex digits of the sha256 the roster holds) and every member of VOCABULARIES
 * (verdict words and codes, capability nouns, revision keys, claim statuses, missing prerequisites, receipt fields, walk
 * exclusions), each member likewise as a digest so no docs page spells a judged word. (2) wb-gxd7.5's export row, read through two append-only paragraphs only: the owner filing's Acceptance
 * sentence, cut at each "; (<letter>) " marker, equals ACCEPTANCE clause by clause, never a substring of the notes, each
 * clause's sha256 pinned in the roster; and the landed delivery paragraph's RESIDUALS line, every family of which stays a
 * named residual here. (3) The vocabularies case proves each verdict word and code, capability noun, revision key, claim
 * status and missing prerequisite is read by its judge, so a list and the judge built from it cannot part.
 * CASE AND CLAUSE ANCHORS (wb-pzbq, the wb-atq9 gate's F1 and F2): the standalone cases (every registered test that is no
 * judged row's) were held only by the roster's tests list and the clause map only by its rule-16 literal, so a reader case
 * deleted with its roster title, or a table moved out of a clause with its literal, stayed green. The receipt's cut-2 anchor
 * families hold both: Cases, each standalone case by key (its title before the first ": ") with its title's digest, read
 * against this file's vitest task tree both ways by the receipt anchors case and the roster case and by key in the rule 16
 * case; Clause tables, each clause's tables, read by the receipt anchors case and the bead case. Deleting or retitling a
 * case, a reader case included, or moving a table out of a clause, takes a named Removed cases or Removed clause tables line.
 * PERMISSIVE VOCABULARIES (wb-pzbq, the wb-atq9 gate's F3): an appended Vocabularies table adds a member by its digest, and
 * three lists only loosen their judge or walk when they grow, so each is grounded outside itself: the claim statuses and
 * missing prerequisites equal what the reference readers mint from the capture, and every walk exclusion is the VCS
 * directory or a directory the root .gitignore names, below which git tracks no file.
 * NOT CLAIMED: the receipt anchors membership, never order (the roster and the frozen-shape literals hold order and counts);
 * a member appended to a list that can only add findings (verdict words and codes, capability nouns, revision keys) still
 * needs only its digest, and an exclusion naming another ignored directory with nothing tracked below it passes, since it
 * skips nothing git tracks; deleting all three readers of the Cases family at once (the receipt anchors, rule 16 and roster
 * cases) with their titles leaves no case to read it; a coordinated edit of the ledger's family names or FOLLOW_UP together
 * with an appended receipt section re-points the anchor, a visible docs append.
 *
 * Display paths added: none. Test-only: no src change, no gp seam. No scratch is allocated: every case is in memory, the
 * live leg passes the receipt to gp on stdin, and the walk-exclusion ground reads git ls-files.
 */
import { spawnSync } from "node:child_process";
import { readFileSync, realpathSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Tokens } from "marked";
import { describe, expect, it, type RunnerTask, type RunnerTestCase } from "vitest";
import { docsSection, sectionTables } from "./helpers/census.js";
import {
  ACCEPTANCE,
  anchorEntryTables,
  applyEdits,
  BEAD,
  CAPABILITY,
  CAPTURE_EDITS,
  CAPTURE_FIXTURE,
  type Capture,
  CLAIM_STATUSES,
  CLAUSE_TABLES,
  capabilityOf,
  caseKey,
  claimFindings,
  DELIVERED_HEAD,
  DELIVERED_RESIDUALS_HEAD,
  DOC_LINES,
  deliveredResiduals,
  digest16,
  docFindings,
  docLineClasses,
  docTextFindings,
  FILING_HEAD,
  FOLLOW_UP,
  filesBelow,
  filingClauses,
  foldAnchors,
  foldLedger,
  type HostFs,
  ignoredDirectories,
  judgedAnchors,
  judgedLedger,
  KNOWN_UNGROUNDED,
  LEDGER_HEADERS,
  type LedgerSection,
  ledgerEntryTables,
  ledgerHeading,
  MISSING,
  memoryHost,
  mintedVocabularies,
  NOUNS,
  namesGp,
  ownerFiling,
  PROVENANCE,
  provenanceFindings,
  RECEIPT_DOC,
  RECEIPT_FIXTURE,
  RECEIPT_MUTANTS,
  REFUSED_CODE,
  RESIDUAL_FAMILIES,
  RESIDUALS,
  RESOLVE,
  RESOLVE_PIN,
  REVISION_KEYS,
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
  SKIP_DIRS,
  STATIC_RECEIPT_EDITS,
  sha256,
  standaloneTitles,
  trackedBelow,
  VCS_DIR,
  VENDORED_RECEIPTS,
  VERDICT_CODES,
  VERDICT_WORDS,
  VERSION_LINE,
  VOCABULARIES,
  vendoredReceipts,
} from "./helpers/gp-provenance-census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** The tree holds well over these many markdown and JSON files; fewer means a walk found nothing. */
const MIN_DOC_FILES = 100;
const MIN_JSON_FILES = 50;
/** git tracks well over these many files here; fewer means the listing read no tree (wb-pzbq, the walk-exclusion ground). */
const MIN_TRACKED_FILES = 500;
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
  /** wb-atq9: the sha256 of each acceptance clause, in clause order. */
  readonly clauses: unknown;
  /** wb-atq9: the census's vocabularies, each in its judge's order. */
  readonly vocabularies: unknown;
  /** wb-pzbq: the clause map, each clause's judged tables in clause order. */
  readonly clauseTables: unknown;
}
const readRoster = (): Roster => readJson(ROSTER_FIXTURE) as Roster;

/** A bead's notes in the tracked bead export (.beads/issues.jsonl), "" when its row is absent. */
function beadNotes(id: string): string {
  const rows = readFileSync(join(ROOT, ".beads/issues.jsonl"), "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line) as { id?: unknown; notes?: unknown });
  const notes = rows.find((candidate) => candidate.id === id)?.notes;
  return typeof notes === "string" ? notes : "";
}

type SectionsReading = { readonly ok: true; readonly sections: readonly LedgerSection[] } | { readonly ok: false; readonly why: string };

/**
 * The ledger sections of a receipt, read through the shared docs reader (test/helpers/census.ts): every level-3 heading of
 * the receipt must be a ledger heading ("<family>, wb-atq9 cut <n>"), and each section must render exactly one table with
 * its family's header and no HTML (a comment or a tag), so an appended line can neither hide a row nor split a table and
 * restate it. A cell is the table's source text.
 */
function receiptSections(markdown: string): SectionsReading {
  const refuse = (why: string): SectionsReading => ({ ok: false, why });
  const sections: LedgerSection[] = [];
  const path: Tokens.Heading[] = [];
  for (const token of marked.lexer(markdown)) {
    if (token.type !== "heading") continue;
    const heading = token as Tokens.Heading;
    while (path.length > 0 && (path[path.length - 1]?.depth ?? 0) >= heading.depth) path.pop();
    const parents = path.map((entry) => entry.text);
    path.push(heading);
    if (heading.depth !== 3) continue;
    const bound = ledgerHeading(heading.text);
    if (bound === undefined) return refuse(`the level-3 section "${heading.text}" is no ledger section`);
    const section = docsSection(markdown, heading.text, 3, parents);
    if (!section.ok) return refuse(`"${heading.text}": ${section.why}`);
    if (section.hasHtml) return refuse(`"${heading.text}" carries HTML, which can hide a row of its table`);
    const kinds = section.blocks.map((block) => (block.kind === "other" ? `other:${block.type}` : block.kind));
    if (kinds.join(",") !== "other:table") return refuse(`"${heading.text}" must render exactly one table and nothing else; it renders [${kinds.join(", ")}]`);
    const [head, ...rows] = sectionTables(markdown, heading.text, 3, parents).grids[0] ?? [];
    if (JSON.stringify(head) !== JSON.stringify(LEDGER_HEADERS[bound.family])) return refuse(`"${heading.text}": its header row is ${JSON.stringify(head ?? null)}`);
    sections.push({ ...bound, rows });
  }
  return { ok: true, sections };
}
/** A receipt's ledger: its sections folded, or why it cannot be read. */
function receiptLedger(markdown: string): ReturnType<typeof foldLedger> {
  const reading = receiptSections(markdown);
  return reading.ok ? foldLedger(reading.sections) : reading;
}
/** A receipt's anchors (wb-pzbq): its Cases and Clause tables sections folded, or why it cannot be read. */
function receiptAnchors(markdown: string): ReturnType<typeof foldAnchors> {
  const reading = receiptSections(markdown);
  return reading.ok ? foldAnchors(reading.sections) : reading;
}
/** The anchors the committed receipt states, or why it cannot be read. */
const committedAnchors = (): ReturnType<typeof foldAnchors> => receiptAnchors(readFileSync(join(ROOT, RECEIPT_DOC), "utf8"));

/** Every registered test of this file in the vitest task tree, in registration order. */
function registered(tasks: readonly RunnerTask[]): RunnerTestCase[] {
  return tasks.flatMap((child): RunnerTestCase[] => (child.type === "test" ? [child] : child.type === "suite" ? registered(child.tasks) : []));
}

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
    // wb-atq9 (the wb-gxd7.5 gate's F2): each clause is the WHOLE delimited clause of the owner filing's Acceptance sentence,
    // never a substring of the notes, and each clause's sha256 is the roster's.
    const filing = ownerFiling(String(bead?.notes));
    expect(filing.startsWith(FILING_HEAD), "the notes' second paragraph is the owner filing").toBe(true);
    const clauses = filingClauses(filing);
    expect(clauses.length, "the filing's Acceptance sentence was read").toBe(CLAUSE_TABLES.length);
    expect(ACCEPTANCE, "ACCEPTANCE equals the owner filing's delimited clauses, each whole, in order").toEqual(clauses);
    expect(clauses.map((clause) => sha256(clause)), "each delimited clause's sha256 is the roster's").toEqual(readRoster().clauses);
    // The filing reader's controls on synthetic text: it cuts only before a "; (<letter>) " marker, ends at its sentence,
    // and reads nothing from a filing without one Acceptance head or with clauses out of order.
    expect(filingClauses("Owner filing (x). Acceptance: (a) one; two (b) three; (b) four. Not P0: five.")).toEqual(["(a) one; two (b) three", "(b) four"]);
    expect(filingClauses("Owner filing (x). Acceptance: (a) one; (c) two.")).toEqual([]);
    expect(filingClauses("Owner filing (x). Acceptance: (a) one. Acceptance: (a) two.")).toEqual([]);
    expect(filingClauses("Owner filing (x). No acceptance sentence.")).toEqual([]);
    expect(ownerFiling("a statement\n\nnot the filing\n\nOwner filing (x). Acceptance: (a) one.")).toBe("");
    // wb-pzbq (the wb-atq9 gate's F2): the clause map is held outside the census as well - each clause's judged tables
    // stand in the receipt's Clause tables ledger, so a table moved out of a clause needs a named removal there.
    const anchors = committedAnchors();
    expect(anchors.ok ? anchors.anchors.clauses : anchors.why, "each clause's judged tables equal the receipt's Clause tables ledger").toEqual(judgedAnchors([]).clauses);
  });

  it("landed note: every residual family the landed wb-gxd7.5 delivery named stays a named residual here, read from its append-only delivered paragraph", () => {
    const delivered = deliveredResiduals(beadNotes(BEAD));
    expect(delivered.length, "the delivered paragraph's RESIDUALS line was read").toBeGreaterThan(0);
    expect(new Set(delivered).size, "each landed residual family is named once").toBe(delivered.length);
    expect(
      delivered.filter((name) => !RESIDUALS.some((entry) => entry.id === name)),
      "landed residual families no longer named here",
    ).toEqual([]);
    // The reader's controls on synthetic notes: it reads the delivered paragraph's own line, and nothing elsewhere.
    expect(deliveredResiduals(`lead\n\n${DELIVERED_HEAD}x)\nRed: y\n${DELIVERED_RESIDUALS_HEAD} z): R-ONE, R-TWO-PARTS.\n\nlater`)).toEqual(["R-ONE", "R-TWO-PARTS"]);
    expect(deliveredResiduals(`lead\n\nnot delivered\n${DELIVERED_RESIDUALS_HEAD} z): R-ONE.`)).toEqual([]);
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

  it("vocabularies: every verdict word and code, capability noun, revision key, claim status and missing prerequisite is read by its judge, and the same reading without one is not", () => {
    const captured = capture();
    const roster = rosterOf(captured);
    // A verdict word or code makes a gp line naming a backticked roster verb a C2 claim; the same frame without one is quiet.
    for (const word of VERDICT_WORDS) expect(docLineClasses(`gp \`eval\` is ${word} here.`, roster), word).toEqual(["C2"]);
    for (const code of VERDICT_CODES) expect(docLineClasses(`gp \`eval\` exits with GP_CLI_${code}`, roster), code).toEqual(["C2"]);
    expect(docLineClasses("gp `eval` is fast here.", roster), "the frame alone").toEqual([]);
    // A capability noun stands in for a verb; a word outside the nouns does not.
    for (const noun of NOUNS) expect(docLineClasses(`gp ${noun} is unavailable here.`, roster), noun).toEqual(["C2"]);
    expect(docLineClasses("gp scoring is unavailable here.", roster), "a word outside the nouns").toEqual([]);
    // A version line under any revision key is refused as a revision; under versionLine it stays an opaque string.
    const { sourceSha, entrySha256 } = captured.build;
    for (const key of REVISION_KEYS) expect(provenanceFindings({ sourceSha, entrySha256, [key]: VERSION_LINE }).map(ruleOf), key).toContain("P-VERSION-AS-REVISION");
    expect(provenanceFindings({ sourceSha, entrySha256, versionLine: VERSION_LINE }), "versionLine is no revision key").toEqual([]);
    // Every claim status is a status the claim judge accepts, and not-implemented is not; every missing prerequisite is one
    // a prerequisite-missing claim may name.
    for (const status of CLAIM_STATUSES) expect(claimFindings({ surface: "cli", verb: "eval", status }, undefined).map(ruleOf), status).not.toContain("C-STATUS");
    expect(claimFindings({ surface: "cli", verb: "eval", status: "not-implemented" }, undefined).map(ruleOf), "not-implemented").toContain("C-STATUS");
    for (const missing of MISSING) expect(claimFindings({ surface: "cli", verb: "eval", status: "prerequisite-missing", missing }, undefined), missing).toEqual([]);
    expect(claimFindings({ surface: "cli", verb: "eval", status: "prerequisite-missing", missing: "network" }, undefined).map(ruleOf), "network").toEqual(["C-MISSING"]);
  });

  it("permissive vocabularies: every claim status and missing prerequisite is one the reference readers mint from the capture, and every walk exclusion is the VCS directory or a .gitignore directory below which git tracks no file, so an appended member that loosens the claim judge or narrows a walk is red", () => {
    // wb-pzbq (the wb-atq9 gate's F3): the receipt holds each member by digest, so an appended Vocabularies table admits a
    // member; these three lists only loosen their judge or walk when they grow, so each member is grounded outside them.
    const captured = capture();
    const minted = mintedVocabularies(captured);
    expect([...CLAIM_STATUSES].sort(), "the claim statuses are exactly the statuses the reference readers mint").toEqual(minted.statuses);
    expect([...MISSING].sort(), "the missing prerequisites are exactly the ones the reference readers name").toEqual(minted.missing);
    // The mint is read from the readers over the capture, never a fixed answer: without the hello's refusals no case is
    // refused, and the no-binary case alone mints one status and one prerequisite.
    const withoutRefusals: Capture = { ...captured, hello: { ...captured.hello, replies: captured.hello.replies.filter((line) => !line.includes(REFUSED_CODE)) } };
    expect(mintedVocabularies(withoutRefusals).statuses, "a capture without refusals mints no refused").toEqual(["listed", "prerequisite-missing", "served", "unlisted"]);
    expect(mintedVocabularies(captured, [{ reader: "no-binary", surface: "rpc", verb: "sample", status: "prerequisite-missing", expect: [] }])).toEqual({ statuses: ["prerequisite-missing"], missing: ["binary"] });
    const ignored = ignoredDirectories(readFileSync(join(ROOT, ".gitignore"), "utf8"));
    expect(
      SKIP_DIRS.filter((dir) => dir !== VCS_DIR && !ignored.includes(dir)),
      "walk exclusions the root .gitignore does not ignore",
    ).toEqual([]);
    const listing = spawnSync("git", ["ls-files", "-z"], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
    expect(listing.status, "git ls-files read the tracked tree").toBe(0);
    const tracked = listing.stdout.split("\0").filter((path) => path !== "");
    expect(tracked.length).toBeGreaterThanOrEqual(MIN_TRACKED_FILES);
    expect(trackedBelow(tracked, SKIP_DIRS), "tracked files below a walk exclusion").toEqual([]);
    // The grounds' controls: they read what they are given. qa/ holds tracked files, so excluding it would be read; a name
    // .gitignore does not ignore is read; only plain "<name>/" lines ignore a directory at every depth.
    expect(trackedBelow(tracked, ["qa"]).length, "qa/ holds tracked files").toBeGreaterThan(0);
    expect(trackedBelow(["qa/a.mjs", "docs/b.md", "c/build/d.json", "build"], ["qa", "build"])).toEqual(["qa/a.mjs", "c/build/d.json"]);
    expect(["qa", "vendor-cache"].filter((dir) => !ignored.includes(dir))).toEqual(["qa", "vendor-cache"]);
    expect(ignoredDirectories("node_modules/\n# dist/\n!keep/\n*.log\n/anchored/\ntest/perf/.results/\n  plan/  \n")).toEqual(["node_modules", "plan"]);
  });

  it("receipt ledger: every judged row (its label and each pin) and every vocabulary member stands in the append-only receipt docs/workbench/receipts/wb-atq9.md, read through every cut's tables, so a member leaves only by a named removal", () => {
    const reading = receiptLedger(readFileSync(join(ROOT, RECEIPT_DOC), "utf8"));
    if (!reading.ok) throw new Error(`${RECEIPT_DOC}: ${reading.why}`);
    expect(
      ROWS.filter((entry) => new Set(entry.pins.map(digest16)).size !== entry.pins.length).map((entry) => entry.test),
      "rows whose pins share a ledger digest",
    ).toEqual([]);
    expect(reading.ledger, "the census's judged set equals the receipt's ledger, both ways").toEqual(judgedLedger());
    // The ledger reader's controls on synthetic receipts: it reads what it is given, never a fixed answer.
    const [pinA, pinB, pinC, label1, label2, word1, word2] = ["a", "b", "c", "1", "2", "d", "e"].map((digit) => digit.repeat(16));
    const section = (family: string, cut: number, lines: readonly string[]): string => {
      const header = family.endsWith("rows") || family.startsWith("Judged rows") ? ["Row", "Label", "Pins"] : ["Vocabulary", "Members"];
      return [`### ${family}, ${FOLLOW_UP} cut ${cut}`, "", `| ${header.join(" | ")} |`, `| ${header.map(() => "---").join(" | ")} |`, ...lines, ""].join("\n");
    };
    const receipt = (...entries: readonly string[]): string => [`# ${FOLLOW_UP}: synthetic`, "", ...entries.map((body, index) => `## 2026-01-0${index + 1} entry ${index + 1}\n\n${body}`)].join("\n");
    const cut1 = `${section("Judged rows", 1, [`| T/X | ${label1} | ${pinA} ${pinB} |`])}\n${section("Vocabularies", 1, [`| v | ${word1} ${word2} |`])}`;
    const read = (markdown: string): unknown => {
      const folded = receiptLedger(markdown);
      return folded.ok ? folded.ledger : folded.why;
    };
    expect(read(receipt(cut1))).toEqual({ rows: { "T/X": { labels: [label1], pins: [pinA, pinB] } }, vocabularies: { v: [word1, word2] } });
    // A later cut that restates the tables without a member removes nothing; a named removal does.
    const restated = `${section("Judged rows", 2, [`| T/X | ${label1} | ${pinA} |`])}\n${section("Vocabularies", 2, [`| v | ${word1} |`])}`;
    expect(read(receipt(cut1, restated))).toEqual({ rows: { "T/X": { labels: [label1], pins: [pinA, pinB] } }, vocabularies: { v: [word1, word2] } });
    const removed = `${section("Removed rows", 2, [`| T/X |  | ${pinB} |`])}\n${section("Removed vocabulary members", 2, [`| v | ${word2} |`])}`;
    expect(read(receipt(cut1, removed))).toEqual({ rows: { "T/X": { labels: [label1], pins: [pinA] } }, vocabularies: { v: [word1] } });
    // A relabel without the old label's removal, a removal of a member that does not stand, a gap in the cuts, an unbound
    // level-3 section, HTML inside a section and a second table are each no reading.
    expect(read(receipt(cut1, section("Judged rows", 2, [`| T/X | ${label2} | ${pinA} |`])))).toBe(`row T/X stands with 2 labels and 2 pins`);
    expect(read(receipt(cut1, section("Removed rows", 2, [`| T/X |  | ${pinC} |`])))).toBe(`cut 2 Removed rows: the removal names pin ${pinC} of row T/X, which does not stand`);
    expect(read(receipt(cut1, section("Judged rows", 3, [`| T/Y | ${label1} | ${pinC} |`])))).toBe("the ledger's cuts are [1, 3], not 1..k without a gap");
    expect(read(receipt(cut1, section("Judged rows v2", 2, [`| T/X | ${label1} | ${pinA} |`])))).toBe(`the level-3 section "Judged rows v2, ${FOLLOW_UP} cut 2" is no ledger section`);
    expect(read(receipt(cut1, section("Removed rows", 2, ["<!-- hidden -->", "", `| T/X |  | ${pinB} |`])))).toMatch(/carries HTML/);
    expect(read(receipt(cut1, `${section("Removed rows", 2, [`| T/X |  | ${pinB} |`])}\n| Row | Label | Pins |\n| --- | --- | --- |\n| T/X | ${label1} | ${pinB} |\n`))).toMatch(/exactly one table/);
    // The census's own tables, rendered as a cut states them, read back as its judged set.
    expect(read(receipt(ledgerEntryTables(1)))).toEqual(judgedLedger());
  });

  it("receipt anchors: every standalone case of this file (its key and its title) and every acceptance clause's judged tables stand in the append-only receipt docs/workbench/receipts/wb-atq9.md, read through every cut's Cases and Clause tables, so deleting or retitling a case, or moving a table out of a clause, needs a named removal", ({ task }) => {
    // wb-pzbq (the wb-atq9 gate's F1 and F2): the standalone titles were held only by the roster's tests list and the clause
    // map only by its rule-16 literal, so a reader case deleted with its roster title, or a table moved between clauses with
    // its literal, stayed green. Both are read here against the vitest task tree and CLAUSE_TABLES, both ways.
    const reading = committedAnchors();
    if (!reading.ok) throw new Error(`${RECEIPT_DOC}: ${reading.why}`);
    const titles = registered(task.file.tasks).map((entry) => entry.name);
    const standalone = standaloneTitles(titles);
    expect(standalone.filter((title) => caseKey(title) === ""), "standalone titles without a case key").toEqual([]);
    expect(new Set(standalone.map(caseKey)).size, "each standalone case has its own key").toBe(standalone.length);
    expect(reading.anchors, "the standalone cases and the clause map equal the receipt's anchors, both ways").toEqual(judgedAnchors(titles));
    // The anchor reader's controls on synthetic receipts: it reads what it is given, never a fixed answer.
    const [title1, title2, title3] = ["1", "2", "3"].map((digit) => digit.repeat(16));
    const section = (family: string, cut: number, lines: readonly string[]): string => {
      const header = family === "Cases" || family === "Removed cases" ? ["Case", "Title"] : ["Clause", "Tables"];
      return [`### ${family}, ${FOLLOW_UP} cut ${cut}`, "", `| ${header.join(" | ")} |`, `| ${header.map(() => "---").join(" | ")} |`, ...lines, ""].join("\n");
    };
    const receipt = (...entries: readonly string[]): string => [`# ${FOLLOW_UP}: synthetic`, "", ...entries.map((body, index) => `## 2026-01-0${index + 1} entry ${index + 1}\n\n${body}`)].join("\n");
    const read = (markdown: string): unknown => {
      const folded = receiptAnchors(markdown);
      return folded.ok ? folded.anchors : folded.why;
    };
    const cut1 = ledgerEntryTables(1);
    const cut2 = `${section("Cases", 2, [`| one | ${title1} |`, `| live (a) | ${title2} |`])}\n${section("Clause tables", 2, ["| (a) | ONE |", "| (b) | TWO THREE |"])}`;
    const stated = { cases: { one: [title1], "live (a)": [title2] }, clauses: { "(a)": ["ONE"], "(b)": ["THREE", "TWO"] } };
    expect(read(receipt(cut1, cut2))).toEqual(stated);
    // A later cut that restates the tables without a member removes nothing; a named removal does.
    const restated = `${section("Cases", 3, [`| one | ${title1} |`])}\n${section("Clause tables", 3, ["| (a) | ONE |", "| (b) | TWO |"])}`;
    expect(read(receipt(cut1, cut2, restated))).toEqual(stated);
    const removed = `${section("Removed cases", 3, [`| live (a) | ${title2} |`])}\n${section("Removed clause tables", 3, ["| (b) | THREE |"])}`;
    expect(read(receipt(cut1, cut2, removed))).toEqual({ cases: { one: [title1] }, clauses: { "(a)": ["ONE"], "(b)": ["TWO"] } });
    // A retitle without the old title's removal, a removal of a member that does not stand or of a clause no cut added, two
    // titles on one line, a malformed key or member, and an unbound anchor section are each no reading.
    expect(read(receipt(cut1, cut2, section("Cases", 3, [`| one | ${title3} |`])))).toBe("case one stands with 2 titles");
    expect(read(receipt(cut1, cut2, section("Removed cases", 3, [`| one | ${title3} |`])))).toBe(`cut 3 Removed cases: the removal names ${title3} of one, which does not stand`);
    expect(read(receipt(cut1, cut2, section("Removed clause tables", 3, ["| (c) | ONE |"])))).toBe("cut 3 Removed clause tables: the removal names (c), which no cut added");
    expect(read(receipt(cut1, section("Cases", 2, [`| one | ${title1} ${title2} |`])))).toBe("cut 2 Cases: case one states 2 titles");
    expect(read(receipt(cut1, section("Cases", 2, [`| One | ${title1} |`])))).toBe('cut 2 Cases: case key "One" is malformed');
    expect(read(receipt(cut1, section("Clause tables", 2, ["| (a) | one |"])))).toBe("cut 2 Clause tables: (a) carries a member that is not a table name");
    expect(read(receipt(cut1, section("Cases v2", 2, [`| one | ${title1} |`])))).toBe(`the level-3 section "Cases v2, ${FOLLOW_UP} cut 2" is no ledger section`);
    // The census's own anchors, rendered as a cut states them beside cut 1's tables, read back as its anchors.
    expect(read(receipt(cut1, anchorEntryTables(2, titles)))).toEqual(judgedAnchors(titles));
  });

  it("rule 16: every judged table, the residual families, the known set and the clause map are frozen at their measured shape", ({ task }) => {
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
    expect(Object.entries(VOCABULARIES).map(([name, members]) => `${name}:${members.length}`)).toEqual([
      "verdict words:12",
      "verdict codes:2",
      "capability nouns:4",
      "revision keys:6",
      "claim statuses:5",
      "missing prerequisites:2",
      "receipt fields:17",
      "walk exclusions:6",
    ]);
    // wb-pzbq (the wb-atq9 gate's F1): the standalone cases by key, in registration order; the receipt's Cases ledger holds
    // the same keys, so a case deleted together with its element of this literal is red here as well.
    const keys = standaloneTitles(registered(task.file.tasks).map((entry) => entry.name)).map(caseKey);
    expect(keys).toEqual(["bead", "landed note", "live (a)", "live (b)", "live (c)", "live (d)", "live leg", "vocabularies", "permissive vocabularies", "receipt ledger", "receipt anchors", "rule 16", "roster"]);
    const anchors = committedAnchors();
    expect(anchors.ok ? Object.keys(anchors.anchors.cases).sort() : anchors.why, "the receipt's Cases ledger holds exactly these keys").toEqual([...keys].sort());
  });

  it("roster: the judged rows, the registered tests, the residual families and the known set equal test/fixtures/gp-provenance-roster.json, in order and both ways", ({ task }) => {
    const roster = readRoster();
    expect(ROWS, "the judged rows, read now, equal the roster rows exactly and in order").toEqual(roster.rows);
    expect(RESIDUAL_FAMILIES, "the named residual families equal the roster's").toEqual(roster.residuals);
    expect(KNOWN_UNGROUNDED, "the known ungrounded lines equal the roster's").toEqual(roster.known);
    expect(ACCEPTANCE.map((clause) => sha256(clause)), "each acceptance clause's sha256 equals the roster's").toEqual(roster.clauses);
    expect(VOCABULARIES, "the vocabularies, each in its judge's order, equal the roster's").toEqual(roster.vocabularies);
    expect(CLAUSE_TABLES, "the clause map, clause by clause, equals the roster's").toEqual(roster.clauseTables);
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
    // wb-pzbq (the wb-atq9 gate's F1): the roster's tests list is a same-cut literal, so every standalone case this walk
    // registered also stands in the receipt's Cases ledger with its title, both ways: a case deleted together with its
    // roster title is red here as well as in the receipt anchors case.
    const anchors = committedAnchors();
    expect(anchors.ok ? anchors.anchors.cases : anchors.why, "the standalone cases registered here equal the receipt's Cases ledger, both ways").toEqual(judgedAnchors(titles).cases);
    const here = walked.findIndex((entry) => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
