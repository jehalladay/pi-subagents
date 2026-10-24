/**
 * wb-pfxo.1 (RF-COMPOSITIONAL-ASSEMBLY-R1, program-triage-2026-10-22): no Pi surface reports an rf defect witnessed at one
 * build as a present failure of another build, nor presents a figure inferred from historical rf feedback as a new
 * measurement. Every rf defect, fix, CORROBORATION or performance claim Pi carries names the build it was witnessed at
 * (installed version or head sha) or the receipt-backed measurement Pi ran, and is otherwise labelled historical feedback
 * with its file name and build. Source: "Fix-state differs by revision; never collapse historical defect into present
 * failure." (ReactiveFiberCLI docs/programs/compositional-assembly-2026-10-18/README.md:21@6a251bf73af5, E7), merged with
 * "No benchmarks inferred from historical feedback should be called new measurements." (README.md:84) and "Treat feedback
 * filenames/reports as clustered incidents, not independent experiments." (README.md:5). Gating artifact: none (posture).
 *
 * THE READING. A claim line is one line of a doc root (DOC_ROOTS: the root pages README.md, CHANGELOG.md, AGENTS.md,
 * CONTRIBUTING.md and SECURITY.md; every file of any extension under docs/ and new-feedback/, the WHOLE_ROOTS; the .md files
 * under vendor/, .agents/ and .pi/agents/) that names rf standalone (SUBJECT: rf, RFCLI, ReactiveFiber, ReactiveFiberCLI,
 * reactivefibercli, Reactive Fiber; never a compound such as rf-preview, reactivefiber-observer or the dotted
 * reactivefiber.render.preview) beside a word of a claim family (FAMILIES) or a feedback-file citation (a new-feedback/ path
 * or a dated YYYY-MM-DD-<claim>.md name). verdictA judges it: a line citing a feedback file must be marked historical and
 * carry a build (a 0.1.NNN release token, bare or v-prefixed, or a 7-40 hex sha); any other claim line must carry a build or
 * a receipt-backed measurement (a forge cmd_ id or a receipts/wb-*.md path). Lines are read raw, so a claim inside a comment
 * or a code fence is judged too.
 *
 * GIT'S LISTING (wb-dl6t, the landing-280 follow-up). What git would commit (tracked or untracked, never ignored, present on
 * disk) is the outside anchor of every reading of the tree. The doc roots together hold every markdown file git lists
 * outside the R-SCOPE roots and every file it lists under the WHOLE_ROOTS (A1 holds the walk to that listing, so a markdown
 * page added under a root no row reads reds until a cut reads it or names it), and each pin that reads the tree (A2, A4, B1,
 * C2, C3, D1, D2) returns its read coverage: the listed paths it left unread, whether it read every line of the files it
 * read, and, for a judging pass (passOver), the verdicts its judge gave constructed controls in the same loop as the files.
 * So a reading narrowed to one file, emptied, cut short or judged by a constant reds, while an additive file does not.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the roots exist, the walk holds git's listing and the reading is not blind (floors, and the
 *    subject read on three named docs); A2 every claim line outside the frozen record is admitted; A3 the frozen record
 *    docs/workbench/TRACEABILITY.md (byte frozen, rule 13) holds exactly one refused line, :140 in section "Feedback
 *    delivery status", and this cut's receipt carries its correction entry (docs/15 "Delivery receipts": a correction
 *    names the corrected row, never edits it), a historical line with a build (correctsFrozenRow, also judged on
 *    constructed entries); A4 no file under Pi's new-feedback/ is an rf report (isRfReport, also on constructed texts; the
 *    Pi-authored rf reports live upstream: R-UPSTREAM); A5 verdictA on constructed lines, each refusal and each admission.
 *  B, acceptance (b). Pi ships no rf feedback filer: B1 no src/**.ts line, no qa/ line and no package.json script spells a
 *    new-feedback path (a filing site), while the same reader finds the path in a test file and in a constructed script
 *    (controls) and reads every listed src/qa file and every package.json script (filerPass); a filer that lands reds B1
 *    and must bind recheckFindings; B2 recheckFindings, the rule a filer must apply: a feedback text graded
 *    CORROBORATION, CHANGED or FIXED (its file name or title) is refused unless one line names an installed build (a
 *    0.1.NNN token beside "installed") and one names a head sha (beside "head" or "main"; a commit_id alone is the
 *    installed binary's, not a head).
 *  C, acceptance (c). The rf report Pi re-delivered (wb-jwc.1, R2 = wb-jwc.2) keeps its identities: C1 REDELIVERY is held to
 *    the wb-jwc.2 row of the tracked bead export (report 0e6e88345 and row 3a29b4987, re-delivered as 0c7fc5e7... and
 *    5bfe03c1..., and the report's builds: installed 0.1.583, checkout 5edd4c6fc at 0.1.675; a constructed row missing one
 *    is read as missing it); C2 every doc line naming one of those shas spells it unaltered (prefix-consistent; namedIn
 *    and alteredIn also on constructed lines); C3 such a line names no rf build but the report's own (no re-stamp; also on
 *    constructed lines), and at least one such line names a build (the reading is not blind); C4 redeliveryFindings on
 *    constructed texts (identities dropped, altered or added, a grade introduced; an additive waiver passes).
 *  D, acceptance (d). verdictD: a line naming rf that cites a feedback file and carries a figure (a digit outside the
 *    citation, the identities and the dates, or a number word: zero to twenty, the tens, hundred, thousand, million,
 *    billion, dozen, half, quarter, twice, thrice) under a measured word (measured, re-measured, benchmark(s), benchmarked,
 *    new measurement(s)) not negated within the four words before it, must cite a receipt-backed measurement. D1 the doc
 *    roots; D2 every line of src/**.ts and qa/; D3 verdictD on constructed lines.
 *  M, the matchers: M1 the subject, M2 every word of every family and the compound near misses, M3 the identity forms, M4
 *    the feedback citation, the historical marker, the measured words, the negators and the figure reading.
 *  R, the named residuals, each a pinned quiet row (the escape stays uncaught; the row reds when that changes):
 *    Q1 R-LINE one identity anywhere on a line admits every claim on it; Q2 R-VOCABULARY a defect worded outside the
 *    families (hangs, misbehaves) is not a claim line, and a quantity worded outside the number words (several, a few) is
 *    not a figure; Q3 R-SUBJECT an rf subject that is a compound, a dotted id or on another line is not read; Q4 R-UPSTREAM
 *    the Pi-authored rf reports live in ReactiveFiberCLI new-feedback/ and no root reads outside this repository (the
 *    receipt records their read-only measurement); Q5 R-NEGATION a negator in the four words before a measured word quiets
 *    row D even when it negates another verb; Q6 R-OTHER-TOOL a line citing another tool's feedback without naming rf is
 *    outside rows A and D; Q7 R-SCOPE test/, examples/ and .beads/ are judged by no row (this file's own D3 fixtures are
 *    refused lines), and they are exactly the roots of the markdown git lists that the walk leaves unread; Q8
 *    R-COORDINATED an edit of the census and the receipt anchor listing together reads clean (a landed receipt is
 *    append-only under R539, so the gate's numstat check refuses the receipt half).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}`, FAMILIES `${id}:${words.length}` and REDELIVERY its
 * ids as literals. Every pin's case returns a witness held to WITNESS under its own pin, so a case swapped for another
 * passing one reds.
 * OUTSIDE ANCHORS: the owner filing's row in the tracked bead export (.beads/issues.jsonl, row wb-pfxo.1) states the
 * acceptance clauses (a)-(d) and rows A-D hold their labels to them verbatim; its wb-jwc.2 row holds REDELIVERY; the
 * receipt docs/workbench/receipts/wb-pfxo.1.md carries the anchor listing every row, pin, family word, identity and
 * residual is held to, in order. A member removed from every literal of this file still reds there. Git's listing anchors
 * every reading of the tree (above).
 * Not claimed: the judging of sentences (the unit is the line, R-LINE); the upstream rf reports themselves (R-UPSTREAM).
 *
 * Display paths added: none. Test-only: the docs, src, qa, the receipt and the export are only read, and git's listing is
 * read with git ls-files; no scratch is made.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-pfxo.1";
const REDELIVERY_BEAD = "wb-jwc.2";
const RECEIPT = `docs/workbench/receipts/${BEAD}.md`;
const EXPORT = ".beads/issues.jsonl";
const FROZEN_RECORD = "docs/workbench/TRACEABILITY.md";
const THIS_FILE = "test/workbench-rf-historical-claim-census.test.ts";

const read = (file: string): string => readFileSync(join(REPO, file), "utf8");
const linesOf = (text: string): string[] => text.split(/\r\n|\n|\r/);

/** Repository-relative, "/"-separated paths of every regular file below dir, sorted so a reading is reproducible. */
function filesBelow(dir: string): string[] {
  if (!existsSync(join(REPO, dir))) return [];
  return readdirSync(join(REPO, dir), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => relative(REPO, join(entry.parentPath, entry.name)).split("\\").join("/"))
    .sort();
}

/** The roots the claim census reads, all inside this repository: five root pages, two directories read whole and three read
 * for their .md files. Together they hold every markdown file git would commit outside the R-SCOPE roots (A1, wb-dl6t F1). */
const DOC_ROOTS = ["README.md", "CHANGELOG.md", "AGENTS.md", "CONTRIBUTING.md", "SECURITY.md", "docs/", "new-feedback/", "vendor/", ".agents/", ".pi/agents/"];
/** The directory roots read whole: every file below them, of any extension (wb-dl6t F3, X5). */
const WHOLE_ROOTS = ["docs/", "new-feedback/"];
function docFiles(): string[] {
  return DOC_ROOTS.flatMap(root => {
    if (!root.endsWith("/")) return existsSync(join(REPO, root)) ? [root] : [];
    return WHOLE_ROOTS.includes(root) ? filesBelow(root) : filesBelow(root).filter(file => file.endsWith(".md"));
  });
}
const srcFiles = (): string[] => filesBelow("src").filter(file => file.endsWith(".ts"));
const qaFiles = (): string[] => filesBelow("qa");

/** The roots no row judges (R-SCOPE, Q7). */
const R_SCOPE_ROOTS = ["test/", "examples/", ".beads/"];
/** What git would commit for the pathspecs: tracked or untracked, never ignored, present on disk, sorted. */
function gitListed(...pathspecs: string[]): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...pathspecs], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(REPO, path))))].sort();
}
const outsideScope = (path: string): boolean => !R_SCOPE_ROOTS.some(root => path.startsWith(root));
/** The doc anchor: every markdown file git lists outside the R-SCOPE roots and every file it lists below the WHOLE_ROOTS. */
const docAnchor = (): string[] => [...new Set([...gitListed(":(glob)**/*.md"), ...gitListed(...WHOLE_ROOTS)])].filter(outsideScope).sort();
/** The code anchor: every src .ts file and every qa file git lists. */
const codeAnchor = (): string[] => [...gitListed("src").filter(path => path.endsWith(".ts")), ...gitListed("qa")];
/** The listed paths a reading left unread. */
function unreadOf(readFiles: readonly string[], anchor: readonly string[]): string[] {
  const readSet = new Set(readFiles);
  return anchor.filter(path => !readSet.has(path));
}
/** A reading's coverage against its anchor: the listed paths it left unread, and whether it read every line of what it read. */
function coverageOf(readFiles: readonly string[], lines: number, anchor: readonly string[]): { readonly unread: string[]; readonly everyLine: boolean } {
  return { unread: unreadOf(readFiles, anchor), everyLine: lines === readFiles.reduce((sum, file) => sum + linesOf(read(file)).length, 0) };
}

// ---------------------------------------------------------------- the matchers

/** A standalone word: not joined to a word character, ".", "/" or "-" before it, nor to a word character, "/", "-" or a dotted continuation after it. */
const EDGE_BEFORE = "(?<![\\w./-])";
const EDGE_AFTER = "(?![\\w/-]|\\.\\w)";
const escapeWord = (word: string): string => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const standalone = (words: readonly string[], flags: string): RegExp => new RegExp(`${EDGE_BEFORE}(?:${words.map(escapeWord).join("|")})${EDGE_AFTER}`, flags);

/** rf named as the tool, in any case: never a compound (rf-preview), a dotted id (reactivefiber.render.preview) or a path. */
const SUBJECT = standalone(["rf", "rfcli", "reactivefiber", "reactivefibercli", "reactive fiber"], "i");

interface Family {
  readonly id: string;
  /** The words the family reads; for a unit family, the units read after a number. */
  readonly words: readonly string[];
  readonly kind: "word" | "unit";
  readonly caseSensitive: boolean;
}
/** The claim families: an rf defect, a failure, a fix, a re-check grade, a corroboration, a performance word or figure. */
const FAMILIES: readonly Family[] = [
  { id: "defect", kind: "word", caseSensitive: false, words: ["defect", "defects", "bug", "bugs", "regression", "regressions", "regressed", "regresses", "broken", "crash", "crashes", "crashed"] },
  { id: "failure", kind: "word", caseSensitive: false, words: ["fail", "fails", "failed", "failing", "failure", "failures"] },
  { id: "fix", kind: "word", caseSensitive: false, words: ["fixed", "fixes"] },
  { id: "grade", kind: "word", caseSensitive: true, words: ["CHANGED", "STILL-TRUE", "NEVER-TRUE"] },
  { id: "corroboration", kind: "word", caseSensitive: false, words: ["corroborate", "corroborates", "corroborated", "corroborating", "corroboration", "corroborations"] },
  { id: "performance", kind: "word", caseSensitive: false, words: ["latency", "latencies", "throughput", "benchmark", "benchmarks", "slower", "faster", "p50", "p95", "p99", "RSS"] },
  { id: "figure", kind: "unit", caseSensitive: true, words: ["ms", "seconds", "s", "GiB", "MiB", "KiB", "GB", "MB", "KB", "bytes"] },
];
function familyPattern(family: Family): RegExp {
  const flags = family.caseSensitive ? "" : "i";
  if (family.kind === "word") return standalone(family.words, flags);
  return new RegExp(`(?<![\\w.])\\d+(?:\\.\\d+)?(?:-\\d+(?:\\.\\d+)?)? ?(?:${family.words.map(escapeWord).join("|")})${EDGE_AFTER}`, flags);
}
const familiesOf = (line: string): string[] => FAMILIES.filter(family => familyPattern(family).test(line)).map(family => family.id);

/** A build: an rf release token 0.1.NNN, bare or v-prefixed (wb-dl6t F3, X6), or a 7-40 hex sha holding a digit and a letter
 * (so no plain number or word). */
const VERSION = /(?<![\w.])v?0\.1\.\d{3,}(?!\w|\.\d)/;
const SHA = /(?<![0-9A-Za-z_])(?=[0-9a-f]*\d)(?=[0-9a-f]*[a-f])[0-9a-f]{7,40}(?![0-9A-Za-z_])/;
/** A receipt-backed measurement Pi ran: a forge command id or a path to a Pi receipt. */
const RECEIPT_ID = /(?<!\w)cmd_[0-9a-f]{12}(?!\w)|(?<![\w-])receipts\/wb-[A-Za-z0-9.-]+?\.md(?!\w)/;
/** A feedback-file citation: a new-feedback/ path or a dated feedback file name. */
const FEEDBACK_CITATION = /new-feedback\/|(?<![\w/.-])\d{4}-\d{2}-\d{2}-[A-Za-z0-9][\w-]*\.md(?!\w)/;
const HISTORICAL = /(?<![\w-])historical(?![\w-])/i;
/** The words clause (d) names, with re-measured and benchmarked; "measurement" alone is not one. */
const MEASURED = /(?<!\w)(?:measured|benchmarked|benchmarks|benchmark|new measurements|new measurement)(?![\w-])/gi;
const NEGATORS = ["not", "no", "never", "nor", "neither", "without"];
const global = (pattern: RegExp): RegExp => new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`);

type VerdictA = "unjudged" | "admitted" | "unidentified" | "unmarked" | "no-build";
/** Clause (a) on one line. */
function verdictA(line: string): VerdictA {
  if (!SUBJECT.test(line)) return "unjudged";
  const cites = FEEDBACK_CITATION.test(line);
  if (!cites && familiesOf(line).length === 0) return "unjudged";
  const build = VERSION.test(line) || SHA.test(line);
  if (cites) return !HISTORICAL.test(line) ? "unmarked" : build ? "admitted" : "no-build";
  return build || RECEIPT_ID.test(line) ? "admitted" : "unidentified";
}

/** The measured words of a line that no negator precedes within four words. */
function unnegatedMeasured(line: string): string[] {
  return [...line.matchAll(MEASURED)].flatMap(match => {
    const before = line.slice(0, match.index).split(/\s+/).filter(word => word.length > 0).slice(-4);
    const negated = before.some(word => {
      const bare = word.toLowerCase().replace(/[^a-z']/g, "");
      return NEGATORS.includes(bare) || bare.endsWith("n't");
    });
    return negated ? [] : [match[0]];
  });
}
/** A figure spelled in words (wb-dl6t F3, X7): a cardinal from zero to twenty, a ten, a power word, dozen, a fraction or a multiple. */
const NUMBER_WORD =
  /(?<![\w-])(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundreds?|thousands?|millions?|billions?|dozens?|half|halves|quarters?|twice|thrice)(?![\w-])/i;
/** A figure: a digit or a number word left once the citations, the identities and the ISO dates are taken out. */
function carriesFigure(line: string): boolean {
  const stripped = line
    .split(/\s+/)
    .filter(token => !global(FEEDBACK_CITATION).test(token))
    .join(" ")
    .replace(global(VERSION), " ")
    .replace(global(SHA), " ")
    .replace(global(RECEIPT_ID), " ")
    .replace(/\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2})?Z?)?/g, " ");
  return /\d/.test(stripped) || NUMBER_WORD.test(stripped);
}
type VerdictD = "unjudged" | "admitted" | "unbacked";
/** Clause (d) on one line. */
function verdictD(line: string): VerdictD {
  if (!SUBJECT.test(line) || !FEEDBACK_CITATION.test(line) || !carriesFigure(line) || unnegatedMeasured(line).length === 0) return "unjudged";
  return RECEIPT_ID.test(line) ? "admitted" : "unbacked";
}

interface Finding {
  readonly at: string;
  readonly verdict: string;
}
/** Every line of one text whose verdict is neither unjudged nor admitted, as file:line. */
function findingsIn(file: string, text: string, judge: (line: string) => string): Finding[] {
  return linesOf(text).flatMap((line, index) => {
    const verdict = judge(line);
    return verdict === "unjudged" || verdict === "admitted" ? [] : [{ at: `${file}:${index + 1}`, verdict }];
  });
}
const findingsOver = (files: readonly string[], judge: (line: string) => string): Finding[] => files.flatMap(file => findingsIn(file, read(file), judge));
interface Pass {
  readonly findings: Finding[];
  readonly read: readonly string[];
  readonly lines: number;
  readonly controls: readonly string[];
}
/** One judging pass over the tree: every line of the files, then every constructed control, goes through judge in the same
 * loop. It returns the findings over the files, the files and the line count it read, and the verdict judge gave each
 * control, so a pass narrowed, cut short or judged by a constant changes its coverage or its control verdicts. */
function passOver(files: readonly string[], judge: (line: string) => string, controls: readonly string[]): Pass {
  const sources: { readonly file: string | null; readonly text: string }[] = [...files.map(file => ({ file, text: read(file) })), ...controls.map(text => ({ file: null, text }))];
  const findings: Finding[] = [];
  const readFiles: string[] = [];
  const controlVerdicts: string[] = [];
  let lines = 0;
  for (const source of sources) {
    const verdicts = linesOf(source.text).map(judge);
    const file = source.file;
    if (file === null) {
      controlVerdicts.push(...verdicts);
      continue;
    }
    readFiles.push(file);
    lines += verdicts.length;
    verdicts.forEach((verdict, index) => {
      if (verdict !== "unjudged" && verdict !== "admitted") findings.push({ at: `${file}:${index + 1}`, verdict });
    });
  }
  return { findings, read: readFiles, lines, controls: controlVerdicts };
}
/** The src .ts and qa files rows B and D read, and whether both floors are met by that same list. */
function codeFiles(): { readonly files: string[]; readonly floorsMet: boolean } {
  const files = [...srcFiles(), ...qaFiles()];
  return { files, floorsMet: files.filter(file => file.startsWith("src/")).length >= 100 && files.filter(file => file.startsWith("qa/")).length >= 50 };
}
const judgedCount = (files: readonly string[]): number => files.reduce((sum, file) => sum + linesOf(read(file)).filter(line => verdictA(line) !== "unjudged").length, 0);

// ---------------------------------------------------------------- clause (b): the filer rule

/** A feedback filing site: a line that spells a new-feedback path. */
const FILER_SITE = /new-feedback/;
/** The scripts of a package manifest, as name and value. */
const scriptsOf = (manifest: unknown): [string, unknown][] => Object.entries(isObject(manifest) && isObject(manifest.scripts) ? manifest.scripts : {});
/** The filer reader: the filing sites among the lines of the files and then the manifest's scripts, with the files, the line
 * count and the script count it read. */
function filerPass(files: readonly string[], manifest: unknown): { readonly sites: string[]; readonly read: readonly string[]; readonly lines: number; readonly scripts: number } {
  const sites: string[] = [];
  const readFiles: string[] = [];
  let lines = 0;
  for (const file of files) {
    const fileLines = linesOf(read(file));
    readFiles.push(file);
    lines += fileLines.length;
    fileLines.forEach((line, index) => {
      if (FILER_SITE.test(line)) sites.push(`${file}:${index + 1}`);
    });
  }
  const scripts = scriptsOf(manifest);
  for (const [name, value] of scripts) if (typeof value === "string" && FILER_SITE.test(value)) sites.push(`package.json scripts.${name}`);
  return { sites, read: readFiles, lines, scripts: scripts.length };
}
const RECHECK_GRADE = /(?<![A-Za-z0-9])(?:CORROBORATION|CHANGED|FIXED)(?![A-Za-z0-9])/;
/** The rule a filer applies: a re-check is refused without an installed build and a head sha it was measured at. */
function recheckFindings(name: string, text: string): string[] {
  const lines = linesOf(text);
  const title = lines.find(line => line.startsWith("# ")) ?? "";
  if (!RECHECK_GRADE.test(name) && !RECHECK_GRADE.test(title)) return [];
  const findings: string[] = [];
  if (!lines.some(line => /\binstalled\b/i.test(line) && VERSION.test(line))) findings.push("installed");
  if (!lines.some(line => /\b(?:head|main)\b/i.test(line) && SHA.test(line))) findings.push("head");
  return findings;
}

// ---------------------------------------------------------------- clause (c): the re-delivered report

interface Identity {
  readonly id: string;
  readonly token: string;
}
/** The identities of the rf report Pi re-delivered, as the wb-jwc.2 row states them. */
const REDELIVERY: readonly Identity[] = [
  { id: "report", token: "0e6e88345" },
  { id: "row", token: "3a29b4987" },
  { id: "redelivered-report", token: "0c7fc5e7cbadebb1110ad6220b752c29db4077c6" },
  { id: "redelivered-row", token: "5bfe03c1024d8ae53d1f3d969197b8bac044ce58" },
  { id: "installed", token: "0.1.583" },
  { id: "checkout", token: "5edd4c6fc" },
  { id: "checkout-version", token: "0.1.675" },
];
const tokenOf = (id: string): string => REDELIVERY.find(identity => identity.id === id)?.token ?? "";
const REPORT_SHAS = REDELIVERY.filter(identity => SHA.test(identity.token) && identity.id !== "checkout");
const REPORT_BUILDS = REDELIVERY.filter(identity => VERSION.test(identity.token)).map(identity => identity.token);
const consistent = (token: string, identity: string): boolean => token.startsWith(identity) || identity.startsWith(token);
const shasIn = (line: string): string[] => [...line.matchAll(global(SHA))].map(match => match[0]);
/** The release tokens of a line, a v prefix dropped so v0.1.583 and 0.1.583 name one build. */
const versionsIn = (line: string): string[] => [...line.matchAll(global(VERSION))].map(match => match[0].replace(/^v/, ""));
/** The report identities a line names, unaltered (prefix-consistent), by id. */
const namedIn = (line: string): string[] => REPORT_SHAS.filter(identity => shasIn(line).some(token => consistent(token, identity.token))).map(identity => identity.id);
/** The hex tokens of a line sharing a report identity's first seven characters without being a prefix-consistent form of it. */
const alteredIn = (line: string): string[] =>
  shasIn(line).filter(token => REPORT_SHAS.some(identity => token.slice(0, 7) === identity.token.slice(0, 7) && !consistent(token, identity.token)));
/** The doc lines naming a report identity, unaltered or altered, with the files and the line count the reading read. */
function restatements(): { readonly found: { readonly at: string; readonly line: string }[]; readonly read: readonly string[]; readonly lines: number } {
  const found: { readonly at: string; readonly line: string }[] = [];
  const readFiles: string[] = [];
  let lines = 0;
  for (const file of docFiles()) {
    const fileLines = linesOf(read(file));
    readFiles.push(file);
    lines += fileLines.length;
    fileLines.forEach((line, index) => {
      if (namedIn(line).length > 0 || alteredIn(line).length > 0) found.push({ at: `${file}:${index + 1}`, line });
    });
  }
  return { found, read: readFiles, lines };
}
const GRADES = /(?<![A-Za-z0-9-])(?:FIXED|CHANGED|STILL-TRUE|NEVER-TRUE)(?![A-Za-z0-9-])/g;
/** A re-delivery keeps every build and sha of the original and adds none, and introduces no grade. */
function redeliveryFindings(original: string, redelivered: string): string[] {
  const identities = (text: string): string[] => [...new Set([...versionsIn(text), ...shasIn(text)])];
  const before = identities(original);
  const after = identities(redelivered);
  const findings: string[] = [];
  for (const token of before) {
    if (after.includes(token)) continue;
    findings.push(after.some(other => other.slice(0, 7) === token.slice(0, 7)) ? `altered ${token}` : `dropped ${token}`);
  }
  for (const token of after) if (!before.some(other => other.slice(0, 7) === token.slice(0, 7))) findings.push(`added ${token}`);
  const grades = new Set([...original.matchAll(GRADES)].map(match => match[0]));
  for (const grade of new Set([...redelivered.matchAll(GRADES)].map(match => match[0]))) if (!grades.has(grade)) findings.push(`re-graded ${grade}`);
  return findings;
}

/** The build tokens of a restatement line that are not the report's own (a re-stamp). */
const restampedIn = (line: string): string[] => versionsIn(line).filter(version => !REPORT_BUILDS.includes(version));
/** The REDELIVERY ids a text does not spell. */
const missingIdentities = (text: string): string[] => REDELIVERY.filter(identity => !text.includes(identity.token)).map(identity => identity.id);
/** A feedback file whose title line names rf is an rf report. */
const isRfReport = (text: string): boolean => SUBJECT.test(linesOf(text).find(line => line.startsWith("# ")) ?? "");
/** A receipt line names the frozen row and its section, is marked historical and carries a build. */
const correctsFrozenRow = (receipt: string): boolean =>
  linesOf(receipt).some(line => line.includes(`${FROZEN_RECORD}:140`) && line.includes("Feedback delivery status") && HISTORICAL.test(line) && (VERSION.test(line) || SHA.test(line)));

// ---------------------------------------------------------------- the outside anchors

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function exportRow(id: string): { [key: string]: unknown } {
  for (const line of linesOf(read(EXPORT))) {
    if (!line.includes(`"id":"${id}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id) return row;
  }
  throw new Error(`the tracked bead export holds no ${id} row`);
}
/** The owner filing's acceptance clauses (a)-(d), read from the wb-pfxo.1 row of the tracked bead export. */
function exportClauses(): string[] {
  const notes = exportRow(BEAD).notes;
  const match = typeof notes === "string" ? /Acceptance: \(a\) (.+?); \(b\) (.+?); \(c\) (.+?); \(d\) (.+?)\. Related: /s.exec(notes) : null;
  if (match === null) throw new Error(`the ${BEAD} export row carries no (a)-(d) acceptance sentence`);
  return [`(a) ${match[1]}`, `(b) ${match[2]}`, `(c) ${match[3]}`, `(d) ${match[4]}`];
}

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned by the judged-set case and held to the two outside anchors. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) census over Pi docs and the new-feedback files Pi authors about rf: every defect/fix/performance sentence carries a version token (0.1.NNN) or a sha, or is marked historical with its feedback file name and build",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  { id: "B", label: "(b) the rf feedback filer refuses a CORROBORATION / CHANGED / FIXED claim without the installed and head identities it was measured at", pins: ["B1", "B2"] },
  { id: "C", label: "(c) a claim re-delivered by Pi (wb-jwc.2) keeps its original SHAs and build names unchanged", pins: ["C1", "C2", "C3", "C4"] },
  { id: "D", label: "(d) no Pi string calls a number sourced only from a new-feedback file 'measured', 'benchmark' or 'new measurement'", pins: ["D1", "D2", "D3"] },
  { id: "M", label: "the matchers rows A and D read: the subject, the claim families, the identity forms, the citation, the historical marker and the measured words", pins: ["M1", "M2", "M3", "M4"] },
  { id: "R", label: "the named residuals, each a pinned quiet row that reds when its escape stops being quiet", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"] },
];
/** The acceptance rows, in the order the owner filing states its clauses; the receipt lists them by clause. */
const ACCEPTANCE_ROWS = ["A", "B", "C", "D"];
const RESIDUALS: Readonly<Record<string, string>> = {
  Q1: "R-LINE",
  Q2: "R-VOCABULARY",
  Q3: "R-SUBJECT",
  Q4: "R-UPSTREAM",
  Q5: "R-NEGATION",
  Q6: "R-OTHER-TOOL",
  Q7: "R-SCOPE",
  Q8: "R-COORDINATED",
};

const ROW_LINE = /^- Row ([A-Z]) \(pins ([A-Z0-9]+(?:, [A-Z0-9]+)*)\): (.+)$/;
const FAMILY_LINE = /^- Family ([a-z]+): (.+)$/;
const IDENTITY_LINE = /^- Identity ([a-z-]+): (\S+)$/;
const RESIDUAL_LINE = /^- Residual (Q\d+): (R-[A-Z-]+)$/;
/** How the receipt lists a row: an acceptance row by its clause, any other row by its label. */
const listedText = (row: Row): string => (ACCEPTANCE_ROWS.includes(row.id) ? `clause (${row.id.toLowerCase()})` : row.label);

/** Every disagreement between the census literals, the receipt's anchor listing and the export's acceptance clauses. */
function anchorFindings(rows: readonly Row[], families: readonly Family[], identities: readonly Identity[], residuals: Readonly<Record<string, string>>, receipt: string, clauses: readonly string[]): string[] {
  const lines = linesOf(receipt);
  const listed = <T>(pattern: RegExp, shape: (match: RegExpExecArray) => T): T[] =>
    lines.flatMap(line => {
      const match = pattern.exec(line);
      return match === null ? [] : [shape(match)];
    });
  const listedRows = listed(ROW_LINE, match => ({ id: match[1] ?? "", pins: (match[2] ?? "").split(", "), text: match[3] ?? "" }));
  const listedFamilies = listed(FAMILY_LINE, match => ({ id: match[1] ?? "", words: (match[2] ?? "").split(", ") }));
  const listedIdentities = listed(IDENTITY_LINE, match => ({ id: match[1] ?? "", token: match[2] ?? "" }));
  const listedResiduals = Object.fromEntries(listed(RESIDUAL_LINE, match => [match[1] ?? "", match[2] ?? ""] as const));
  const findings: string[] = [];
  if (JSON.stringify(listedRows) !== JSON.stringify(rows.map(row => ({ id: row.id, pins: [...row.pins], text: listedText(row) })))) findings.push("receipt rows differ");
  if (JSON.stringify(listedFamilies) !== JSON.stringify(families.map(family => ({ id: family.id, words: [...family.words] })))) findings.push("receipt families differ");
  if (JSON.stringify(listedIdentities) !== JSON.stringify(identities.map(identity => ({ id: identity.id, token: identity.token })))) findings.push("receipt identities differ");
  if (JSON.stringify(listedResiduals) !== JSON.stringify(residuals)) findings.push("receipt residuals differ");
  const labels = ACCEPTANCE_ROWS.map(id => rows.find(row => row.id === id)?.label ?? "");
  if (JSON.stringify(labels) !== JSON.stringify(clauses)) findings.push("acceptance labels differ from the export");
  return findings;
}

// ---------------------------------------------------------------- the constructed lines

const FEEDBACK = "new-feedback/2026-10-18-CORROBORATION-current-json-rewrite.md";
const A5_LINES: readonly string[] = [
  "rf regressed the render envelope.",
  "rf 0.1.768 regressed the render envelope.",
  "rf at head 7ae3800b7 fixes the index rewrite.",
  "rf failed the live tier at cmd_c8fa1da3d9c4.",
  "rf failures are listed in receipts/wb-c7ku.md.",
  `rf rewrites current.json in 10 of 10 renders (${FEEDBACK}).`,
  `Historical: rf rewrites current.json in 10 of 10 renders (${FEEDBACK}).`,
  `Historical: rf 0.1.768 rewrote current.json in 10 of 10 renders (${FEEDBACK}).`,
  `Historical, cmd_c8fa1da3d9c4: rf rewrote current.json (${FEEDBACK}).`,
  "rf renders the context.",
  "rf v0.1.768 regressed the render envelope.",
];
/** The controls a row A pass judges after the files: a refused claim line and an admitted one. */
const A_CONTROLS: readonly string[] = ["rf regressed the render envelope.", "rf 0.1.768 regressed the render envelope."];
const REVISION_BOTH = "**`rf` revision:** installed `rf --json --version` gives 0.1.768; feedback clone at HEAD a9d08c421.";
const B2_TEXTS: readonly (readonly [string, string])[] = [
  ["2026-10-21-CORROBORATION-x-still-true.md", `# x STILL-TRUE\n\n${REVISION_BOTH}\n`],
  ["2026-10-21-CORROBORATION-y-CHANGED.md", "# y CHANGED\n\ninstalled 0.1.768, clone not named.\n"],
  ["2026-10-21-z-is-FIXED-at-head.md", "# z is FIXED at head\n\nfeedback clone at HEAD a9d08c421.\n"],
  ["2026-10-21-CORROBORATION-w.md", "# w\n\nno identity named.\n"],
  ["2026-10-21-v.md", "# v is FIXED at head\n\nno identity named.\n"],
  ["2026-10-21-u.md", "# u, a first report\n\nno identity named.\n"],
  ["2026-10-21-t.md", "# t is fixed now\n\nno identity named.\n"],
  ["2026-10-21-q-FIXED.md", "# q FIXED\n\nfixed in 0.1.769 per the changelog; feedback clone at HEAD a9d08c421.\n"],
  ["2026-10-21-r-CHANGED.md", "# r CHANGED\n\ninstalled 0.1.768 with commit_id 7ae3800b7e08, main a7addbcec.\n"],
  ["2026-10-21-p-CHANGED.md", "# p CHANGED\n\ninstalled 0.1.768 with commit_id 7ae3800b7e08.\n"],
];
const A3_RECEIPTS: readonly string[] = [
  `- Correction: ${FROZEN_RECORD}:140, section "Feedback delivery status", is historical, written in commit 43ad58b5dc2a.`,
  `- Correction: ${FROZEN_RECORD}:140, section "Feedback delivery status", is historical; no build named.`,
  `- Correction: ${FROZEN_RECORD}:140, section "Feedback delivery status", written in commit 43ad58b5dc2a.`,
  `- Correction: ${FROZEN_RECORD}:141, section "Feedback delivery status", is historical, written in commit 43ad58b5dc2a.`,
];
const C2_LINES: readonly string[] = [
  "- ReactiveFiber: `0e6e88345` plus required dispositions ledger row `3a29b49`.",
  "ReactiveFiber report 0c7fc5e7cbadebb1110ad6220b752c29db4077c7 re-delivered.",
  "the original report 0e6e8834f on its branch",
  "an unrelated sha 9180ad1244d7",
];
const C3_LINES: readonly string[] = ["report 0c7fc5e7cbadebb1110ad6220b752c29db4077c6 holds at 0.1.768", "report 0e6e88345 at installed 0.1.583, checkout 0.1.675"];
const ORIGINAL = "installed ReactiveFiberCLI 0.1.583; checkout HEAD `5edd4c6fc`, VERSION 0.1.675. Finding 1 CONFIRMED.";
const C4_TEXTS: readonly string[] = [
  ORIGINAL,
  `${ORIGINAL}\nGate waiver disclosed in the commit body.`,
  ORIGINAL.replace("5edd4c6fc", "5edd4c6fd"),
  ORIGINAL.replace("0.1.583", "0.1.768"),
  ORIGINAL.replace("CONFIRMED", "FIXED"),
];
const D3_LINES: readonly string[] = [
  "rf measured 0.83 s per refused status (new-feedback/2026-10-21-x.md).",
  "rf benchmark: 8 renders ran in a quarter of the time (new-feedback/2026-10-18-y.md).",
  "A new measurement of rf: 66 servers, 6.38 GiB (new-feedback/2026-10-18-z.md).",
  "rf re-measured 0.83 s (new-feedback/2026-10-21-x.md).",
  "rf costs 0.83 s per refused status, not a new measurement (historical, new-feedback/2026-10-21-x.md at 0.1.768).",
  "rf measured 0.81 s at cmd_c8fa1da3d9c4 against new-feedback/2026-10-21-x.md.",
  "rf was measured in new-feedback/2026-10-21-x.md.",
  "rf measured 0.83 s per refused status.",
  "rf measured twelve refused statuses per call (new-feedback/2026-10-21-x.md).",
];
/** The controls a row D pass judges after the files: an unbacked figure and a receipt-backed one. */
const D_CONTROLS: readonly string[] = ["rf measured 0.83 s per refused status (new-feedback/2026-10-21-x.md).", "rf measured 0.81 s at cmd_c8fa1da3d9c4 against new-feedback/2026-10-21-x.md."];
const SUBJECT_CAUGHT = ["rf", "RF's", "`rf`", "ReactiveFiber", "ReactiveFiberCLI", "RFCLI", "reactivefibercli", "Reactive Fiber", "the tool rf."];
const SUBJECT_CLEAN = ["rf-preview", "reactivefiber-observer", "reactivefiber.render.preview", "providers/reactivefiber.ts", "RF_RELEASE_DRIFT", "RF-06-1", "perf", "rfx"];
const FAMILY_NEAR_MISSES = ["14-qa-and-benchmarks.md", "fail-closed", "debugger", "prefixed", "nothing changed", "bugfix", "3sec", "v0.1.768-s"];
const BUILD_CAUGHT = ["0.1.768", "7ae3800b7", "7ae3800b7e08fa93484d4987ab5d34591e261750", "0e6e88345's", "v0.1.768"];
const RECEIPT_CAUGHT = ["cmd_c8fa1da3d9c4", "docs/workbench/receipts/wb-c7ku.md"];
const IDENTITY_CLEAN = ["0.1.7", "1.0.0", "20261021", "defaced", `${"a5fec79c".repeat(8)}`, "0-1-768", "cmd_c8fa1da3", "receipts/INDEX.md", "rev0.1.768"];
const CITATION_CAUGHT = ["new-feedback/2026-10-18-x.md", "2026-10-18-CORROBORATION-x-at-0-1-768.md", "new-feedback/README.md"];
const CITATION_CLEAN = ["docs/workbench/receipts/wb-c7ku.md", "docs/programs/compositional-assembly-2026-10-18/README.md", "the new-feedback directory"];
const HISTORICAL_CAUGHT = ["historical", "Historical:"];
const HISTORICAL_CLEAN = ["historically", "prehistorical", "non-historical"];
const MEASURED_CAUGHT = ["measured", "re-measured", "benchmark", "benchmarks", "benchmarked", "new measurement", "New measurements"];
const MEASURED_CLEAN = ["measurement", "unmeasured", "measuredly"];
const NEGATED = ["not a new measurement", "never measured", "no new measurement", "isn't measured"];
const FIGURE_CAUGHT = ["took 0.83 s", "ten renders", "twelve calls", "twice as slow", "a quarter of the time", "one hundred renders"];
const FIGURE_CLEAN = ["someone", "often", "tension", "anyone", "at 0.1.768", "at v0.1.768", "on 2026-10-21", "at 7ae3800b7"];

// ---------------------------------------------------------------- the cases

/** Each pin's case: it asserts its own outcome and returns the witness WITNESS holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const files = docFiles();
    const rootsExist = DOC_ROOTS.every(root => existsSync(join(REPO, root)));
    const floorsMet = files.filter(file => file.startsWith("docs/")).length >= 60 && files.filter(file => file.startsWith("new-feedback/")).length >= 10 && judgedCount(files) >= 10;
    const controls = ["docs/workbench/07-native-integrations.md", "docs/workbench/feature-matrix.md", FROZEN_RECORD].map(file => linesOf(read(file)).some(line => SUBJECT.test(line)));
    const unread = unreadOf(files, docAnchor());
    expect(rootsExist).toBe(true);
    expect(floorsMet, `doc files read: ${files.length}`).toBe(true);
    expect(controls).toEqual([true, true, true]);
    expect(unread, "a file git would commit outside the R-SCOPE roots is read by no row: read it or name it (wb-dl6t F1)").toEqual([]);
    return { roots: [...DOC_ROOTS], rootsExist, floorsMet, controls, unread };
  },
  A2: () => {
    const pass = passOver(
      docFiles().filter(file => file !== FROZEN_RECORD),
      verdictA,
      A_CONTROLS,
    );
    expect(pass.findings, "an rf claim line carries no build, receipt-backed measurement or historical marking").toEqual([]);
    const coverage = coverageOf(
      pass.read,
      pass.lines,
      docAnchor().filter(file => file !== FROZEN_RECORD),
    );
    return { findings: pass.findings.map(finding => ({ ...finding })), ...coverage, controls: [...pass.controls] };
  },
  A3: () => {
    const frozen = findingsOver([FROZEN_RECORD], verdictA);
    const corrected = correctsFrozenRow(read(RECEIPT));
    const constructed = A3_RECEIPTS.map(correctsFrozenRow);
    expect(frozen).toEqual([{ at: `${FROZEN_RECORD}:140`, verdict: "unidentified" }]);
    expect(corrected, "the receipt carries no historical correction entry, with a build, naming the frozen row and its section").toBe(true);
    return { frozen: frozen.map(finding => ({ ...finding })), corrected, constructed };
  },
  A4: () => {
    const files = filesBelow("new-feedback");
    const titles = files.map(file => ({ file, rfReport: isRfReport(read(file)) }));
    const rfReports = titles.filter(title => title.rfReport).map(title => title.file);
    const unread = unreadOf(
      titles.map(title => title.file),
      gitListed("new-feedback"),
    );
    const constructed = ["# rf renders slowly on large graphs\n", "# pi-subagents operational feedback\n", "the rf note before any title\n# a Pi finding\n"].map(isRfReport);
    expect(files.length).toBeGreaterThanOrEqual(10);
    expect(rfReports).toEqual([]);
    return { floorMet: files.length >= 10, rfReports, unread, constructed };
  },
  A5: () => {
    const verdicts = A5_LINES.map(verdictA);
    const findings = findingsIn("constructed.md", A5_LINES.join("\n"), verdictA);
    expect(new Set(verdicts)).toEqual(new Set(["unidentified", "admitted", "unmarked", "no-build", "unjudged"]));
    expect(findings.length).toBe(verdicts.filter(verdict => verdict !== "admitted" && verdict !== "unjudged").length);
    return { verdicts, findings: findings.map(finding => ({ ...finding })) };
  },
  B1: () => {
    const { files, floorsMet } = codeFiles();
    const pass = filerPass(files, JSON.parse(read("package.json")));
    const controlMet = linesOf(read("test/workbench-receipts-convention.test.ts")).some(line => FILER_SITE.test(line));
    expect(floorsMet).toBe(true);
    expect(controlMet, "the filer reader finds no new-feedback path even in a test that names one").toBe(true);
    const scriptControl = filerPass([], { scripts: { build: "tsc", file: "node qa/file.mjs --into new-feedback/" } }).sites;
    expect(pass.sites, "a feedback filing site landed: bind it to recheckFindings through a registered case (wb-pfxo.1 clause b)").toEqual([]);
    const listedScripts = scriptsOf(JSON.parse(read("package.json"))).length;
    const coverage = coverageOf(pass.read, pass.lines, codeAnchor());
    return { sites: pass.sites, floorsMet, controlMet, scriptControl, ...coverage, scriptsRead: listedScripts > 0 && pass.scripts === listedScripts };
  },
  B2: () => {
    const findings = B2_TEXTS.map(([name, text]) => recheckFindings(name, text));
    expect(findings[0]).toEqual([]);
    expect(findings.slice(1, 5).every(finding => finding.length > 0)).toBe(true);
    return findings;
  },
  C1: () => {
    const row = exportRow(REDELIVERY_BEAD);
    const text = `${typeof row.description === "string" ? row.description : ""}\n${typeof row.close_reason === "string" ? row.close_reason : ""}`;
    const missing = missingIdentities(text);
    const constructedMissing = missingIdentities(text.split(tokenOf("checkout")).join("5edd4c6"));
    const sameBlob = /byte-identical to (\w+)'s[^\n]*Landed as (\w+)\./.exec(text);
    expect(missing, `identities absent from the ${REDELIVERY_BEAD} export row`).toEqual([]);
    expect([sameBlob?.[1], sameBlob?.[2]]).toEqual([tokenOf("report"), tokenOf("redelivered-report")]);
    return { missing, constructedMissing, original: sameBlob?.[1] ?? null, redelivered: sameBlob?.[2] ?? null };
  },
  C2: () => {
    const reading = restatements();
    const found = reading.found;
    const altered = found.flatMap(({ at, line }) => alteredIn(line).map(token => `${at} ${token}`));
    const frozenRecord = found.some(({ at, line }) => at === `${FROZEN_RECORD}:227` && namedIn(line).length === REPORT_SHAS.length);
    expect(frozenRecord, "the frozen record's ReactiveFiber delivery row no longer names the four shas").toBe(true);
    expect(found.length).toBeGreaterThanOrEqual(2);
    const constructed = C2_LINES.map(line => ({ named: namedIn(line), altered: alteredIn(line) }));
    expect(altered).toEqual([]);
    return { frozenRecord, restatements: found.length >= 2, altered, constructed, ...coverageOf(reading.read, reading.lines, docAnchor()) };
  },
  C3: () => {
    const reading = restatements();
    const found = reading.found;
    const restamped = found.flatMap(({ at, line }) => restampedIn(line).map(version => `${at} ${version}`));
    const builds = found.filter(({ line }) => versionsIn(line).length > 0).length;
    const constructed = C3_LINES.map(restampedIn);
    expect(restamped, "a line naming the re-delivered report names a build that is not the report's own").toEqual([]);
    return { restamped, buildsRead: builds >= 1, constructed, ...coverageOf(reading.read, reading.lines, docAnchor()) };
  },
  C4: () => {
    const findings = C4_TEXTS.map(text => redeliveryFindings(ORIGINAL, text));
    expect(findings.slice(0, 2)).toEqual([[], []]);
    expect(findings.slice(2).every(finding => finding.length > 0)).toBe(true);
    return findings;
  },
  D1: () => {
    const pass = passOver(docFiles(), verdictD, D_CONTROLS);
    const citationControl = linesOf(read(FROZEN_RECORD)).some(line => FEEDBACK_CITATION.test(line));
    expect(citationControl, "the citation reader finds no feedback file in the frozen record's delivery receipts").toBe(true);
    expect(pass.findings, "a line calls a figure from a feedback file measured without a receipt").toEqual([]);
    const coverage = coverageOf(pass.read, pass.lines, docAnchor());
    return { findings: pass.findings.map(finding => ({ ...finding })), citationControl, ...coverage, controls: [...pass.controls] };
  },
  D2: () => {
    const { files, floorsMet } = codeFiles();
    const pass = passOver(files, verdictD, D_CONTROLS);
    expect(floorsMet).toBe(true);
    expect(pass.findings).toEqual([]);
    const coverage = coverageOf(pass.read, pass.lines, codeAnchor());
    return { findings: pass.findings.map(finding => ({ ...finding })), floorsMet, ...coverage, controls: [...pass.controls] };
  },
  D3: () => {
    const verdicts = D3_LINES.map(verdictD);
    expect(verdicts.slice(0, 4)).toEqual(["unbacked", "unbacked", "unbacked", "unbacked"]);
    expect(verdicts[verdicts.length - 1], "a figure spelled in number words is a figure (wb-dl6t F3, X7)").toBe("unbacked");
    return verdicts;
  },
  M1: () => {
    const caught = SUBJECT_CAUGHT.map(spelling => SUBJECT.test(`${spelling} fails`));
    const clean = SUBJECT_CLEAN.map(spelling => SUBJECT.test(`${spelling} fails`));
    expect(caught.every(Boolean)).toBe(true);
    expect(clean.some(Boolean)).toBe(false);
    return { caught, clean };
  },
  M2: () => {
    const perFamily = FAMILIES.map(family => family.words.every(word => familiesOf(family.kind === "unit" ? `took 3 ${word}` : `it ${word} here`).includes(family.id)));
    const nearMisses = FAMILY_NEAR_MISSES.map(familiesOf);
    expect(perFamily.every(Boolean)).toBe(true);
    expect(nearMisses.flat()).toEqual([]);
    return { perFamily, nearMisses };
  },
  M3: () => {
    const builds = BUILD_CAUGHT.map(token => VERSION.test(` ${token} `) || SHA.test(` ${token} `));
    const receipts = RECEIPT_CAUGHT.map(token => RECEIPT_ID.test(` ${token} `));
    const clean = IDENTITY_CLEAN.map(token => VERSION.test(` ${token} `) || SHA.test(` ${token} `) || RECEIPT_ID.test(` ${token} `));
    expect([...builds, ...receipts].every(Boolean)).toBe(true);
    expect(clean.some(Boolean)).toBe(false);
    return { builds, receipts, clean };
  },
  M4: () => {
    const citations = [...CITATION_CAUGHT, ...CITATION_CLEAN].map(text => FEEDBACK_CITATION.test(` ${text} `));
    const historical = [...HISTORICAL_CAUGHT, ...HISTORICAL_CLEAN].map(text => HISTORICAL.test(` ${text} `));
    const measured = [...MEASURED_CAUGHT, ...MEASURED_CLEAN].map(text => unnegatedMeasured(` ${text} `).length > 0);
    const negated = NEGATED.map(text => unnegatedMeasured(text).length > 0);
    const figures = [...FIGURE_CAUGHT, ...FIGURE_CLEAN].map(text => carriesFigure(` ${text} `));
    expect(citations).toEqual([...CITATION_CAUGHT.map(() => true), ...CITATION_CLEAN.map(() => false)]);
    expect(historical).toEqual([...HISTORICAL_CAUGHT.map(() => true), ...HISTORICAL_CLEAN.map(() => false)]);
    expect(measured).toEqual([...MEASURED_CAUGHT.map(() => true), ...MEASURED_CLEAN.map(() => false)]);
    expect(negated.some(Boolean)).toBe(false);
    expect(figures).toEqual([...FIGURE_CAUGHT.map(() => true), ...FIGURE_CLEAN.map(() => false)]);
    return { citations, historical, measured, negated, figures };
  },
  Q1: () => {
    const verdict = verdictA("rf 0.1.768 fails the render; rf also regressed the replay at an unnamed build.");
    expect(verdict).toBe("admitted");
    return { residual: RESIDUALS.Q1 ?? "", verdict };
  },
  Q2: () => {
    const outside = verdictA("rf hangs on every render and misbehaves under load.");
    const inside = verdictA("rf hangs on every render and took 3 s.");
    const quantity = verdictD("rf measured several refused statuses per call (new-feedback/2026-10-21-x.md).");
    expect([outside, inside, quantity]).toEqual(["unjudged", "unidentified", "unjudged"]);
    return { residual: RESIDUALS.Q2 ?? "", outside, inside, quantity };
  },
  Q3: () => {
    const verdicts = ["The rf-preview tier regressed.", "reactivefiber.render.preview regressed.", "The context producer, rf:", "regressed the render envelope."].map(verdictA);
    expect(verdicts).toEqual(["unjudged", "unjudged", "unjudged", "unjudged"]);
    return { residual: RESIDUALS.Q3 ?? "", verdicts };
  },
  Q4: () => {
    const outside = docFiles().filter(file => isAbsolute(file) || file.startsWith("..")).length;
    const upstream = verdictA("Historical: rf 0.1.768 rewrote current.json in 10 of 10 renders (ReactiveFiberCLI new-feedback/2026-10-18-x.md).");
    expect(outside).toBe(0);
    expect(upstream).toBe("admitted");
    return { residual: RESIDUALS.Q4 ?? "", roots: [...DOC_ROOTS], outside, upstream };
  },
  Q5: () => {
    const verdict = verdictD("rf does not stall; measured 0.83 s per call (new-feedback/2026-10-21-x.md).");
    expect(verdict).toBe("unjudged");
    return { residual: RESIDUALS.Q5 ?? "", verdict };
  },
  Q6: () => {
    const line = "Forge measured 3 s per gate (new-feedback/2026-10-15-forge-x.md).";
    const verdicts = [verdictA(line), verdictD(line)];
    expect(verdicts).toEqual(["unjudged", "unjudged"]);
    return { residual: RESIDUALS.Q6 ?? "", verdicts };
  },
  Q7: () => {
    const refusedHere = linesOf(read(THIS_FILE)).filter(line => verdictD(line) === "unbacked").length > 0;
    const readByNoRow = ![...docFiles(), ...srcFiles(), ...qaFiles()].some(file => file.startsWith("test/") || file.startsWith("examples/") || file.startsWith(".beads/"));
    const unwalked = unreadOf(docFiles(), gitListed(":(glob)**/*.md"));
    const unwalkedRoots = [...new Set(unwalked.map(path => (path.includes("/") ? `${path.split("/")[0]}/` : path)))].sort();
    expect([refusedHere, readByNoRow]).toEqual([true, true]);
    expect(unwalkedRoots, "the markdown git lists that the walk leaves unread lies exactly under the R-SCOPE roots").toEqual([...R_SCOPE_ROOTS].sort());
    return { residual: RESIDUALS.Q7 ?? "", refusedHere, readByNoRow, unwalkedRoots };
  },
  Q8: () => {
    const receipt = read(RECEIPT);
    const clauses = exportClauses();
    const lessRows = ROWS.filter(row => row.id !== "R");
    const lessReceipt = linesOf(receipt)
      .filter(line => !line.startsWith("- Row R "))
      .join("\n");
    const coordinated = anchorFindings(lessRows, FAMILIES, REDELIVERY, RESIDUALS, lessReceipt, clauses);
    const censusOnly = anchorFindings(lessRows, FAMILIES, REDELIVERY, RESIDUALS, receipt, clauses);
    expect(coordinated).toEqual([]);
    expect(censusOnly).toEqual(["receipt rows differ"]);
    return { residual: RESIDUALS.Q8 ?? "", coordinated, censusOnly };
  },
};

/** The doc roots the walk reads (A1, Q4). */
const ROOTS_READ: Json = ["README.md", "CHANGELOG.md", "AGENTS.md", "CONTRIBUTING.md", "SECURITY.md", "docs/", "new-feedback/", "vendor/", ".agents/", ".pi/agents/"];
/** Each pin's witness, measured at base df64ad0; the coverage, control, figure and v-prefix fields (wb-dl6t) at base 27ae04e. */
const WITNESS: Readonly<Record<string, Json>> = {
  A1: { roots: ROOTS_READ, rootsExist: true, floorsMet: true, controls: [true, true, true], unread: [] },
  A2: { findings: [], unread: [], everyLine: true, controls: ["unidentified", "admitted"] },
  A3: { frozen: [{ at: "docs/workbench/TRACEABILITY.md:140", verdict: "unidentified" }], corrected: true, constructed: [true, false, false, false] },
  A4: { floorMet: true, rfReports: [], unread: [], constructed: [true, false, false] },
  A5: {
    verdicts: ["unidentified", "admitted", "admitted", "admitted", "admitted", "unmarked", "no-build", "admitted", "no-build", "unjudged", "admitted"],
    findings: [
      { at: "constructed.md:1", verdict: "unidentified" },
      { at: "constructed.md:6", verdict: "unmarked" },
      { at: "constructed.md:7", verdict: "no-build" },
      { at: "constructed.md:9", verdict: "no-build" },
    ],
  },
  B1: { sites: [], floorsMet: true, controlMet: true, scriptControl: ["package.json scripts.file"], unread: [], everyLine: true, scriptsRead: true },
  B2: [[], ["head"], ["installed"], ["installed", "head"], ["installed", "head"], [], [], ["installed"], [], ["head"]],
  C1: { missing: [], constructedMissing: ["checkout"], original: "0e6e88345", redelivered: "0c7fc5e7cbadebb1110ad6220b752c29db4077c6" },
  C2: {
    frozenRecord: true,
    restatements: true,
    altered: [],
    constructed: [
      { named: ["report", "row"], altered: [] },
      { named: [], altered: ["0c7fc5e7cbadebb1110ad6220b752c29db4077c7"] },
      { named: [], altered: ["0e6e8834f"] },
      { named: [], altered: [] },
    ],
    unread: [],
    everyLine: true,
  },
  C3: { restamped: [], buildsRead: true, constructed: [["0.1.768"], []], unread: [], everyLine: true },
  C4: [[], [], ["altered 5edd4c6fc"], ["dropped 0.1.583", "added 0.1.768"], ["re-graded FIXED"]],
  D1: { findings: [], citationControl: true, unread: [], everyLine: true, controls: ["unbacked", "admitted"] },
  D2: { findings: [], floorsMet: true, unread: [], everyLine: true, controls: ["unbacked", "admitted"] },
  D3: ["unbacked", "unbacked", "unbacked", "unbacked", "unjudged", "admitted", "unjudged", "unjudged", "unbacked"],
  M1: { caught: [true, true, true, true, true, true, true, true, true], clean: [false, false, false, false, false, false, false, false] },
  M2: { perFamily: [true, true, true, true, true, true, true], nearMisses: [[], [], [], [], [], [], [], []] },
  M3: { builds: [true, true, true, true, true], receipts: [true, true], clean: [false, false, false, false, false, false, false, false, false] },
  M4: {
    citations: [true, true, true, false, false, false],
    historical: [true, true, false, false, false],
    measured: [true, true, true, true, true, true, true, false, false, false],
    negated: [false, false, false, false],
    figures: [true, true, true, true, true, true, false, false, false, false, false, false, false, false],
  },
  Q1: { residual: "R-LINE", verdict: "admitted" },
  Q2: { residual: "R-VOCABULARY", outside: "unjudged", inside: "unidentified", quantity: "unjudged" },
  Q3: { residual: "R-SUBJECT", verdicts: ["unjudged", "unjudged", "unjudged", "unjudged"] },
  Q4: { residual: "R-UPSTREAM", roots: ROOTS_READ, outside: 0, upstream: "admitted" },
  Q5: { residual: "R-NEGATION", verdict: "unjudged" },
  Q6: { residual: "R-OTHER-TOOL", verdicts: ["unjudged", "unjudged"] },
  Q7: { residual: "R-SCOPE", refusedHere: true, readByNoRow: true, unwalkedRoots: [".beads/", "examples/", "test/"] },
  Q8: { residual: "R-COORDINATED", coordinated: [], censusOnly: ["receipt rows differ"] },
};

describe("wb-pfxo.1 rf historical claim census (RF-COMPOSITIONAL-ASSEMBLY-R1)", () => {
  it("the judged set: the frozen shape, the owner's acceptance in the tracked export, the receipt anchor listing and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:2", "C:4", "D:3", "M:4", "R:8"]);
    expect(FAMILIES.map(family => `${family.id}:${family.words.length}`)).toEqual(["defect:12", "failure:6", "fix:2", "grade:3", "corroboration:6", "performance:11", "figure:10"]);
    expect(REDELIVERY.map(identity => identity.id)).toEqual(["report", "row", "redelivered-report", "redelivered-row", "installed", "checkout", "checkout-version"]);
    expect(anchorFindings(ROWS, FAMILIES, REDELIVERY, RESIDUALS, read(RECEIPT), exportClauses())).toEqual([]);
    const pins = ROWS.flatMap(row => row.pins).sort();
    expect(Object.keys(IMPL).sort()).toEqual(pins);
    expect(Object.keys(WITNESS).sort()).toEqual(pins);
    expect(Object.keys(RESIDUALS).sort()).toEqual([...(ROWS.find(row => row.id === "R")?.pins ?? [])].sort());
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(witness).toStrictEqual(WITNESS[pin]);
        });
      }
    });
  }
});
