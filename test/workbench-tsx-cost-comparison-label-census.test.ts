/**
 * wb-csbt.4 (TSX-RESOURCE-EFFICIENCY-FRONTIER-R4, program-triage-2026-10-22), the absent-today leg. Statement (bead notes,
 * full form): "No Pi surface (including Pi's installed rf/TSX skill copies and program summaries) shall label the SDK+RFCLI
 * end-to-end cost comparison complete until the producer publishes it with measured evidence (gated:
 * docs/perf/programs/perf-f-2026-10-17/sdk-rfcli-cost-comparison.{md,json} plus TSX-PF-05 skill updates, bead rftsx-zblcp -
 * absent at the pin, bead open at the record)" (ReactiveFiberTSXSDK docs/programs/resource-efficiency-frontier-2026-10-17/
 * 03-PROFILES-DECISIONS-AND-WORK-PACKAGES.md:34@76bbbffd9d4a). Authority (owner filing): the label belongs to the publisher;
 * Pi echoes the published label byte for byte and never mints one.
 * Acceptance (owner filing, verbatim; the labels of rows A, B and C): "(a) a Pi guard greps Pi docs, workbench strings and
 * any installed skill copies for a complete claim about the TSX SDK + RFCLI cost comparison and finds 0 while the artifact is
 * absent (0 hits today at d75b68d); (b) when the artifact exists, a fixture copy of sdk-rfcli-cost-comparison.md renders in Pi
 * with the producer's status label verbatim and no added complete/done qualifier; (c) Pi's rf/TSX skill refresh path re-reads
 * the producer's skill update rather than editing the label text locally."
 *
 * MEASURED PRODUCER FACTS (the roster's `producer` block, read with read-only git show and ls-tree on the local
 * ReactiveFiberTSXSDK checkout, whose origin/main is the pin 76bbbffd9d4a419f972d6fefc8b7f9dc524df8df, by the cutting seat on
 * 2026-10-23; this census is hermetic and never re-reads the producer): docs/perf/programs at the pin holds one program,
 * ip-2026-10-15, so the gating pair is absent; the two cited table rows (03:34, the TSX-PF-05 packet row, and
 * BEADS-2026-10-21.md:39, the rftsx-zblcp bead row) are vendored base64 with their SHA256, and both read quiet.
 *
 * READINGS
 * - (a) SCANNED: every file git lists (tracked or untracked, never ignored) below docs/, src/, qa/, examples/, test/, .agents/
 *   and .pi/ (Pi's installed skill copies; .claude/ is named too, but git ignores it, so only its absence is pinned, by A1
 *   and C1) and the repository root's .md pages, read as UTF-8. That is the filing's three surfaces plus the qa, examples
 *   and test trees. An independent filesystem walk (symlinks refused, never followed) minus git's ignored set must equal that
 *   list. This file and its roster are EXEMPT: judged in the same pass as every other listed file, their findings set aside
 *   by path, and each exemption is load-bearing (the pass must find in the pair exactly what judging the pair alone finds).
 * - COVERAGE (wb-3or6, the landing-306 follow-up): every real-tree scan carries known positives in the SAME pass and must
 *   find exactly them - the live pass (A3) the exempt pair's own claims, the d75b68d judgment (A4) two in-memory claim texts,
 *   the writer scan (C3) the five control writes, the fixture-copy scan (B1) two planted copy paths - so a pass that reads
 *   nothing reds, and so does any finding the real tree adds. Each pass also returns what it visited, counted as it visits,
 *   and its witness pins the visit: the live pass read exactly the listed files, at A1's per-root floors and a sentence
 *   floor; the d75b68d pass judged exactly the files and sentences the roster holds (an immutable tree, so exact counts);
 *   the writer pass parsed every src module git lists and examined their write calls (at a floor of 15); the copy pass
 *   examined the git listing (at a floor of 650 paths). The same scan function then runs over a scratch git repository
 *   (git init, files left untracked, so gitList reads it as it reads Pi's tree) holding plants it must find, so a scan that
 *   reads less than the tree also reds.
 * - EXACT COVERAGE (wb-vp5l, the landing-398 follow-up): a floor alone admits a partial read above it, so every moving count
 *   of a real-tree pass is also held equal to a recount made outside the pass, from a fresh git listing and a fresh read of
 *   each file: the live pass's listing equals a fresh gitList and the sentences it judged equal a per-file recount of that
 *   listing (A3); the copy pass examined exactly a fresh gitList plus the two plants (B1); the write calls the writer pass
 *   examined equal an independent count of the write calls in a fresh read of every src module (C3). The floors stay, so an
 *   equality between two empty readings still reds.
 * - SENTENCE: a file's text cut after ".", "!", "?" or ";" before white space or the line end, at a blank line, around a line
 *   opening a table row ("|"), in a .md file before a line opening a list item, and in a data file (.json, .jsonl, .yaml,
 *   .yml, .toml) at every line end, so one key and its value are one sentence. A code comment's wrapped lines stay one.
 * - MENTION: a NAMED family (N1 the artifact stem sdk-rfcli, N2 the packet TSX-PF-05, N3 the bead rftsx-zblcp, N4 the program
 *   directory perf-f-2026-10-17) matches the sentence, or the PAIR does (N5: an SDK side, an RFCLI side and a comparison word
 *   in one sentence). Matching is on the NFKC-folded, lower-cased sentence, between non-alphanumeric boundaries.
 * - FINDING: a mentioning sentence that carries a CLAIM word (complete with its inflections, completion, done, finished) and
 *   no MARKER (a negating or gating word, or the n't contraction), reported `<path>:<line> <families>: asserted-<word>`.
 * - GATE: gateOf(entries) reads a producer tree listing; PRESENT only when both gating files are regular blobs at the gating
 *   directory. The guard is armed while the gate reads ABSENT (at the pin, from the roster's measured listing) and then
 *   requires zero findings; on PRESENT it stands down and rule (b) governs.
 * - (b) RENDER PATHS, the primitives every Pi display composes: SKILL (src/skill-loader.ts preloadSkills into src/prompts.ts
 *   buildAgentPrompt, both prompt modes), DISPLAY (the shared sanitizer sanitizeWorkbenchText in each named layout), RF (an rf
 *   context render carrying the document as its output text and one block, through the native provider with a stand-in rf on
 *   PATH, the injected registry, the curated MCP reply and the shared JSON sanitizer and its text form) and VIEWER
 *   (src/ui/conversation-viewer.ts, Pi's Markdown renderer, with the markdown mode on and off). The producer's file does not
 *   exist, so the document is a CONSTRUCTED STAND-IN that says so; B1 pins that no copy named after the gating files exists
 *   in Pi's tree while the gate reads ABSENT, so the real copy arrives only by a re-cut. B3 reads every carrier's render of
 *   each producer label, with the next label as the label-axis control; the two R-DISPLAY-GAPS labels are its carrier-axis
 *   negative rows (wb-vp5l): the carriers that render a gap do not hold them byte for byte, so a cell that reads the input
 *   document instead of its carrier's render reds.
 * - (c) REFRESH PATH: Pi has no rf/TSX skill copy installed; its only skill reader is preloadSkills, called only by
 *   src/agent-runner.ts on each run; it re-reads the installed file every call (no cache), its only transform is trim, and no
 *   src module writes into a skill root (a writer scan over every src module, with planted positive controls).
 *
 * OUTSIDE ANCHOR (the judged-set case): the owner filing's row of wb-csbt.4 in the tracked bead export (.beads/issues.jsonl).
 * Its acceptance holds exactly the clauses (a)-(c), each equal to its row label, and each row's pin quotes tile its clause
 * (only separators between them). The statement's subject, the acceptance's subject, the gated path, packet and bead, and the
 * claim words of the statement and of clause (b) are read from that text: every subject token (STOP words aside) is matched
 * by a family, each gated name diagnoses as a claim subject by itself (a check naming no family) and with its family, the
 * gated path expands to GATE, and each claim word diagnoses as itself. A family or claim word the bead spells, removed from
 * every literal of this file and the roster, therefore still reds.
 * ROOTS AND MARKERS, ANCHORED OUTSIDE THIS FILE (wb-3or6): the filing's shipped-status sentence names the trees it grepped
 * (docs, src and test) and the skill root it found absent (.claude/skills), and each must be scanned (the judged set);
 * src/skill-loader.ts names the project skill roots Pi loads from (its join(cwd, ...) calls), and each must be scanned
 * (A1); every top-level directory git tracks must be a scanned root or a named outside directory, so a root dropped from
 * both lists or a new top-level directory reds (A1). SHIPPED ROOTS (wb-vp5l): the packaged artifact's boundary
 * (qa/workbench/package-boundary.mjs TOP_LEVEL_ALLOWLIST) names what Pi ships, and every top-level directory it admits that
 * git tracks must be scanned, except the directory package.json's file: dependencies resolve into (vendor/, where the
 * vendored SDK tarballs live, an R-OUTSIDE-ROOTS member), so a shipped root such as qa or examples reclassified as outside in
 * this file and the roster together still reds (A1). The statement gates its claim with one word followed by a condition
 * ("until the producer publishes it with measured evidence"): that gating word must admit the statement's own claim, and no
 * word of the condition may be a marker - each, appended to the claim as a qualifier, keeps it a finding (the judged set).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, vocabulary, constants and every pin's
 * witness are held to the out-of-file roster (test/fixtures/tsx-cost-comparison-label-roster.json); a last case reads that
 * every pin ran to its witness. Not claimed: a family alternative or inflection that the bead text never spells (for example
 * reactivefibercli, benchmark or finished) removed from the vocabulary, the roster and A2's probe together; a marker word the
 * statement's condition never spells (for example verified) added to the vocabulary and the roster together; a primitive
 * that a pass and its recount share (gitList, sentences, WRITE_APIS) hollowed for both sides of an EXACT COVERAGE equality at
 * once (A1's walk, A2's cutter rows, A4's exact counts at d75b68d and C3's five controls read those primitives too); a pass
 * that visits a path, a sentence or a write call and then drops its verdict (the EXACT COVERAGE counts are visits, not
 * verdicts; the in-pass positives and the replica plants judge verdicts only where they sit).
 * RESIDUALS (named; each has a pinned quiet row): R-OUTSIDE-ROOTS (A1) a claim in new-feedback/, vendor/, media/, .beads/,
 *   dist/, node_modules/, .codex/ or .github/, in a root file that is not a .md page (package.json, forge.toml, LICENSE and
 *   the like), or in one of the three user-level skill roots src/skill-loader.ts reads (getAgentDir()/skills,
 *   ~/.agents/skills, ~/.pi/skills) is not read: each plant is a finding when read, the loader serves each user-level plant,
 *   and the live pass finds none of them; R-MARKER-ANYWHERE (A2) a marker anywhere in a sentence admits
 *   it, whatever it qualifies; R-UNANCHORED (A2) a comparison word without both pair sides, or the pair without a comparison
 *   word; R-SPLIT (A2) a claim and its subject in different sentences: a later sentence that names no family, an earlier
 *   one, or a subject cut at an abbreviation's period (SDK vs. RFCLI); R-PARAPHRASE (A2) a claim outside the claim
 *   words (final, ready, published, shipped); R-LOOKALIKE (A2) a look-alike letter or an inserted invisible inside a name or
 *   a claim word; R-RENDERED-TEXT (A2) the guard reads raw text, so markup or a character reference inside a claim word
 *   (com**plete**, comp&#108;ete) is silent, while a claim inside an HTML comment, which no reader sees, is still found;
 *   R-GATE-PARTIAL (B1) the gate reads the two files only, so the TSX-PF-05 skill updates and the bead's closure are not read;
 *   R-DISPLAY-GAPS (B3) the text, terminal and label layouts and the shared JSON sanitizer (so the curated reply) render a
 *   line break or a tab as a gap and the label layout also collapses a run of spaces, so a label is byte-identical there
 *   only when it is one line of single spaces without a tab (its words always are);
 *   R-COVERAGE-WORD (B4) Pi's rf topology projection states its own coverage word ("complete" for this render) on every
 *   render, content-independent, beside a content-addressed reference and no document text; R-SHADOWED-COPY (C2) a
 *   higher-precedence project copy (.pi/skills) shadows the producer's update installed in .agents/skills; R-INDIRECT-TARGET
 *   (C3) a write whose target is computed outside the call (a function result) escapes the writer scan.
 *
 * Display paths added: none. Test-only: the stand-in rf, the skill roots, the replica trees (the scratch git repositories
 * included), the scratch home and the viewer stubs live in makeScratch scratch or in memory; HOME and PI_CODING_AGENT_DIR
 * are set only around the user-level reads and restored; src, docs, qa, the skills and the bead export are only read.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { TOP_LEVEL_ALLOWLIST } from "../qa/workbench/package-boundary.mjs";
import { buildAgentPrompt } from "../src/prompts.js";
import { preloadSkills } from "../src/skill-loader.js";
import type { AgentConfig, AgentRecord, EnvInfo } from "../src/types.js";
import { ConversationViewer } from "../src/ui/conversation-viewer.js";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { sanitizeWorkbenchJson, sanitizeWorkbenchJsonText, sanitizeWorkbenchText, WORKBENCH_TEXT_LIMIT, type WorkbenchTextLayout } from "../src/workbench/redaction.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Obj = { [key: string]: JsonValue };
type Gate = "ABSENT" | "PRESENT";
interface Pin { readonly id: string; readonly quote: string }
interface Row { readonly id: string; readonly label: string; readonly pins: readonly Pin[] }
interface TreeEntry { readonly path: string; readonly kind: "blob" | "tree" | "link" }
interface Family { readonly id: string; readonly source: string }
interface Vocabulary { readonly named: readonly Family[]; readonly pair: { readonly sdk: string; readonly rfcli: string; readonly comparison: string }; readonly claim: string; readonly marker: string }
interface Constants { readonly roots: readonly string[]; readonly skillRoots: readonly string[]; readonly outside: readonly string[]; readonly gate: { readonly directory: string; readonly files: readonly string[] }; readonly filingRead: string; readonly exempt: readonly string[] }
interface Roster {
  readonly bead: string;
  readonly citation: string;
  readonly producer: { readonly repository: string; readonly pin: string; readonly measured: string; readonly gate: string; readonly perfTree: readonly TreeEntry[]; readonly excerpts: readonly { readonly site: string; readonly textBase64: string; readonly sha256: string }[] };
  readonly vocabulary: Vocabulary;
  readonly constants: Constants;
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: JsonValue })[] }[];
  readonly residuals: readonly { readonly id: string; readonly quietPin: string }[];
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROOT = process.cwd();
const SELF = "test/workbench-tsx-cost-comparison-label-census.test.ts";
const ROSTER_FILE = "test/fixtures/tsx-cost-comparison-label-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-csbt.4";
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;
const CONSTANTS: Constants = {
  roots: ["docs", "src", "qa", "examples", "test", ".agents", ".pi", ".claude"],
  skillRoots: [".pi/skills", ".agents/skills", ".claude/skills"],
  outside: ["new-feedback", "vendor", "media", ".beads", "dist", "node_modules", ".codex", ".github"],
  gate: { directory: "docs/perf/programs/perf-f-2026-10-17", files: ["sdk-rfcli-cost-comparison.md", "sdk-rfcli-cost-comparison.json"] },
  filingRead: "d75b68d10a1a",
  exempt: [SELF, ROSTER_FILE],
};
const VOCABULARY: Vocabulary = {
  named: [
    { id: "N1", source: "(?<![a-z0-9])sdk[-_]rfcli(?![a-z0-9])" },
    { id: "N2", source: "(?<![a-z0-9])tsx[-_ ]?pf[-_ ]?0?5(?![a-z0-9])" },
    { id: "N3", source: "(?<![a-z0-9])rftsx[-_ ]?zblcp(?![a-z0-9])" },
    { id: "N4", source: "(?<![a-z0-9])perf[-_ ]?f[-_ ]?2026[-_ ]?10[-_ ]?17(?![a-z0-9])" },
  ],
  pair: {
    sdk: "(?<![a-z0-9])(?:sdks?|reactivefibertsxsdk|@reactive-fiber/tsx)(?![a-z0-9])",
    rfcli: "(?<![a-z0-9])(?:rfcli|reactivefibercli|rf[- ]cli)(?![a-z0-9])",
    comparison: "(?<![a-z0-9])(?:comparisons?|compar(?:e|es|ed|ing)|costs?|bench(?:mark)?(?:s|ed|ing)?)(?![a-z0-9])",
  },
  claim: "(?<![a-z0-9])(complete[ds]?|completion|done|finished)(?![a-z0-9])",
  marker: "(?<![a-z0-9])(?:not|no|never|nor|without|until|unless|pending|absent|unshipped|unpublished|gated|before|if|when|once|whether)(?![a-z0-9])|n['\u2019]t(?![a-z0-9])",
};
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a Pi guard greps Pi docs, workbench strings and any installed skill copies for a complete claim about the TSX SDK + RFCLI cost comparison and finds 0 while the artifact is absent (0 hits today at d75b68d)",
    pins: [
      { id: "A1", quote: "a Pi guard greps Pi docs, workbench strings and any installed skill copies" },
      { id: "A2", quote: "for a complete claim about the TSX SDK + RFCLI cost comparison" },
      { id: "A3", quote: "and finds 0 while the artifact is absent" },
      { id: "A4", quote: "(0 hits today at d75b68d)" },
    ],
  },
  {
    id: "B",
    label: "(b) when the artifact exists, a fixture copy of sdk-rfcli-cost-comparison.md renders in Pi with the producer's status label verbatim and no added complete/done qualifier",
    pins: [
      { id: "B1", quote: "when the artifact exists" },
      { id: "B2", quote: "a fixture copy of sdk-rfcli-cost-comparison.md renders in Pi" },
      { id: "B3", quote: "with the producer's status label verbatim" },
      { id: "B4", quote: "and no added complete/done qualifier" },
    ],
  },
  {
    id: "C",
    label: "(c) Pi's rf/TSX skill refresh path re-reads the producer's skill update rather than editing the label text locally",
    pins: [
      { id: "C1", quote: "Pi's rf/TSX skill refresh path" },
      { id: "C2", quote: "re-reads the producer's skill update" },
      { id: "C3", quote: "rather than editing the label text locally" },
    ],
  },
];

// ---------------------------------------------------------------------------------------------------------------- the scanner
const compile = (source: string, flags = ""): RegExp => new RegExp(source, flags);
const NAMED = VOCABULARY.named.map(family => ({ id: family.id, rx: compile(family.source) }));
const PAIR = { sdk: compile(VOCABULARY.pair.sdk), rfcli: compile(VOCABULARY.pair.rfcli), comparison: compile(VOCABULARY.pair.comparison) };
const CLAIM = compile(VOCABULARY.claim);
const CLAIMS = compile(VOCABULARY.claim, "g");
const MARKER = compile(VOCABULARY.marker);
const fold = (text: string): string => text.normalize("NFKC").toLowerCase();
function familiesOf(folded: string): string[] {
  const found = NAMED.filter(family => family.rx.test(folded)).map(family => family.id);
  if (PAIR.sdk.test(folded) && PAIR.rfcli.test(folded) && PAIR.comparison.test(folded)) found.push("N5");
  return found;
}
/** The census verdict on one sentence: null (quiet) or `<families>: asserted-<claim word>`. */
function verdict(sentence: string): string | null {
  const folded = fold(sentence);
  const families = familiesOf(folded);
  if (families.length === 0 || MARKER.test(folded)) return null;
  const claim = CLAIM.exec(folded);
  return claim === null ? null : `${families.join("+")}: asserted-${claim[1]}`;
}
const claimCount = (text: string): number => [...fold(text).matchAll(CLAIMS)].length;
const TABLE_ROW = /^\s*\|/;
const LIST_ITEM = /^\s*(?:[-+*]|\d+[.)])\s/;
const TERMINATOR = /[.!?;](?=\s|$)/g;
type TextKind = "markdown" | "data" | "prose";
const kindOf = (path: string): TextKind => (path.endsWith(".md") ? "markdown" : /\.(?:json|jsonl|ya?ml|toml)$/.test(path) ? "data" : "prose");
function sentences(text: string, kind: TextKind): { readonly line: number; readonly text: string }[] {
  const out: { line: number; text: string }[] = [];
  let buffer = "";
  let start = 0;
  const flush = (): void => { if (buffer !== "") out.push({ line: start, text: buffer }); buffer = ""; };
  const append = (piece: string, line: number): void => {
    const trimmed = piece.trim();
    if (trimmed === "") return;
    if (buffer === "") start = line;
    buffer = buffer === "" ? trimmed : `${buffer} ${trimmed}`;
  };
  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    const line = index + 1;
    if (raw.trim() === "") { flush(); continue; }
    const row = TABLE_ROW.test(raw);
    if (row || (kind === "markdown" && LIST_ITEM.test(raw))) flush();
    let from = 0;
    for (const match of raw.matchAll(TERMINATOR)) { const at = (match.index ?? 0) + 1; append(raw.slice(from, at), line); flush(); from = at; }
    append(raw.slice(from), line);
    if (row || kind === "data") flush();
  }
  flush();
  return out;
}
/** One file's judgment: its findings and the number of sentences it judged (the scan's own coverage, counted as it judges). */
function survey(path: string, text: string): { readonly findings: string[]; readonly sentences: number } {
  let judged = 0;
  const findings = sentences(text, kindOf(path)).flatMap(sentence => {
    judged += 1;
    const found = verdict(sentence.text);
    return found === null ? [] : [`${path}:${sentence.line} ${found}`];
  });
  return { findings, sentences: judged };
}
function judgeText(path: string, text: string): string[] {
  return survey(path, text).findings;
}

// ------------------------------------------------------------------------------------------------------------- the file sets
const PAGE = /^[^/]+\.md$/;
const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
/** Every regular file below the roots and every root .md page; a symlink is reported, never followed. */
function walkTree(base: string): { files: string[]; links: string[] } {
  const files: string[] = [];
  const links: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(join(base, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isSymbolicLink()) links.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(path);
    }
  };
  for (const root of CONSTANTS.roots) {
    if (!existsSync(join(base, root))) continue;
    if (lstatSync(join(base, root)).isSymbolicLink()) links.push(root);
    else visit(root);
  }
  for (const entry of readdirSync(base, { withFileTypes: true })) {
    if (!PAGE.test(entry.name)) continue;
    if (entry.isSymbolicLink()) links.push(entry.name);
    else if (entry.isFile()) files.push(entry.name);
  }
  return { files: files.sort(byName), links: links.sort(byName) };
}
/** What git would commit below the roots: tracked or untracked, never ignored. */
function gitList(base: string): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...CONSTANTS.roots, ":(glob)*.md"], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(base, path))))].sort(byName);
}
function ignored(base: string, paths: readonly string[]): Set<string> {
  const result = spawnSync("git", ["check-ignore", "--stdin", "-z"], { cwd: base, input: paths.join("\0"), encoding: "utf8", maxBuffer: 1 << 26 });
  if (result.status !== 0 && result.status !== 1) throw new Error(`git check-ignore failed: ${result.stderr}`);
  return new Set(result.stdout.split("\0").filter(path => path !== ""));
}
interface Judgment { readonly findings: string[]; readonly read: string[]; readonly sentences: number }
/** Judges each (path, text) in one pass and records what it read: the paths, in order, and the sentences judged. */
function judgeAll(texts: readonly (readonly [string, string])[]): Judgment {
  const findings: string[] = [];
  const read: string[] = [];
  let judged = 0;
  for (const [path, text] of texts) {
    const one = survey(path, text);
    findings.push(...one.findings);
    read.push(path);
    judged += one.sentences;
  }
  return { findings, read, sentences: judged };
}
function judgeFiles(base: string, paths: readonly string[]): Judgment & { readonly unreadable: string[] } {
  const texts: [string, string][] = [];
  const unreadable: string[] = [];
  for (const path of paths) {
    try { texts.push([path, readFileSync(join(base, path), "utf8")]); } catch { unreadable.push(path); }
  }
  return { ...judgeAll(texts), unreadable };
}
const FLOORS: Readonly<Record<string, number>> = { docs: 60, src: 100, qa: 50, examples: 5, test: 400, ".agents": 2, ".pi": 1, ".claude": 0 };
const SENTENCE_FLOOR = 150_000;
/** Each scanned root holds at least its floor of `paths`, and the repository root at least five .md pages. */
function floorsMetBy(paths: readonly string[]): boolean {
  return CONSTANTS.roots.every(root => paths.filter(path => path.startsWith(`${root}/`)).length >= (FLOORS[root] ?? Number.POSITIVE_INFINITY)) && paths.filter(path => PAGE.test(path)).length >= 5;
}
interface Pass extends Judgment { readonly listed: string[]; readonly unreadable: string[]; readonly exempt: Readonly<Record<string, number>> }
const ownerOf = (finding: string): string | undefined => CONSTANTS.exempt.find(path => finding.startsWith(`${path}:`));
/**
 * The live guard's pass: every path git lists under `base`, the exempt pair included, judged at once. `findings` is every
 * finding, `exempt` the count the pair carries (its in-pass positive control).
 */
function liveScan(base: string): Pass {
  const listed = gitList(base);
  const pass = judgeFiles(base, listed);
  return { ...pass, listed, exempt: Object.fromEntries(CONSTANTS.exempt.map(path => [path, pass.findings.filter(finding => ownerOf(finding) === path).length])) };
}
/** A pass's findings outside the exempt pair (the guard's input; the replica runs it too). */
const outside = (pass: Pass): string[] => pass.findings.filter(finding => ownerOf(finding) === undefined);
/** The sentences of `paths` recounted outside any pass (wb-vp5l): each file read afresh and cut, nothing judged. */
function sentenceRecount(base: string, paths: readonly string[]): number {
  return paths.reduce((total, path) => total + sentences(readFileSync(join(base, path), "utf8"), kindOf(path)).length, 0);
}
/** The fixture-copy scan over a listing: every path whose file name is a gating file's, with how many paths it examined (counted as it examines). */
function copiesAmong(listing: readonly string[]): { readonly copies: string[]; readonly examined: number } {
  let examined = 0;
  const copies = listing.filter(path => {
    examined += 1;
    return CONSTANTS.gate.files.includes(path.slice(path.lastIndexOf("/") + 1));
  });
  return { copies, examined };
}
/** The top-level directories git tracks: the repository's own listing, which the scanned and outside roots must partition. */
function trackedTopDirectories(base: string): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached"], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path.includes("/")).map(path => path.slice(0, path.indexOf("/"))))].sort(byName);
}
/** The skill roots src/skill-loader.ts loads from, read from its join(<base>, ...literals, "skills") calls as `<base>/<segments>`. */
function loaderRoots(): string[] {
  const path = "src/skill-loader.ts";
  const source = ts.createSourceFile(path, readFileSync(join(REPO, path), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const roots: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "join") {
      const [first, ...rest] = node.arguments;
      const segments = rest.flatMap(argument => (ts.isStringLiteralLike(argument) ? [argument.text] : []));
      if (first !== undefined && segments.length > 0 && segments.length === rest.length && segments[segments.length - 1] === "skills") roots.push([first.getText(source), ...segments].join("/"));
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return roots;
}
/** The top-level directories package.json's file: dependencies resolve into (where the vendored SDK tarballs live). */
function vendoredDirectories(): string[] {
  const manifest = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8")) as { readonly dependencies?: Readonly<Record<string, string>> };
  return [...new Set(Object.values(manifest.dependencies ?? {}).filter(spec => spec.startsWith("file:")).map(spec => spec.slice("file:".length).split("/")[0] ?? ""))].sort(byName);
}
function gateOf(entries: readonly TreeEntry[]): Gate {
  const blobs = new Set(entries.filter(entry => entry.kind === "blob").map(entry => entry.path));
  return CONSTANTS.gate.files.every(name => blobs.has(`${CONSTANTS.gate.directory}/${name}`)) ? "PRESENT" : "ABSENT";
}
function guard(gate: Gate, findings: readonly string[]): "pass" | "fail" | "stand-down" {
  return gate === "PRESENT" ? "stand-down" : findings.length === 0 ? "pass" : "fail";
}
/** One `git cat-file --batch` read of many blobs, keyed by object id. */
function readBlobs(ids: readonly string[]): Map<string, string> {
  const out: Buffer = execFileSync("git", ["cat-file", "--batch"], { cwd: REPO, input: Buffer.from(`${ids.join("\n")}\n`), maxBuffer: 1 << 28 });
  const texts = new Map<string, string>();
  let at = 0;
  while (at < out.length) {
    const eol = out.indexOf(0x0a, at);
    const [id, type, size] = out.subarray(at, eol).toString("utf8").split(" ");
    if (id === undefined || type !== "blob" || size === undefined) throw new Error(`unexpected cat-file record at ${at}`);
    const end = eol + 1 + Number(size);
    texts.set(id, out.subarray(eol + 1, end).toString("utf8"));
    at = end + 1;
  }
  return texts;
}

// ---------------------------------------------------------------------------------------------------------- the render paths
const scratches: string[] = [];
const oldPath = process.env.PATH;
afterEach(() => { process.env.PATH = oldPath; removeScratch(...scratches.splice(0)); });
function scratch(prefix: string): string { const dir = makeScratch(prefix); scratches.push(dir); return dir; }
/** A scratch git repository holding `files`, left untracked, so gitList reads it exactly as it reads Pi's tree. */
function gitReplica(prefix: string, files: Readonly<Record<string, string>>): string {
  const dir = scratch(prefix);
  execFileSync("git", ["init", "-q"], { cwd: dir, stdio: "pipe" });
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), text);
  }
  return dir;
}
/** Runs `work` with HOME at `home` and PI_CODING_AGENT_DIR unset (so getAgentDir() is <home>/.pi/agent), then restores both. */
function withHome<T>(home: string, work: () => T): T {
  const saved = { home: process.env.HOME, agentDir: process.env.PI_CODING_AGENT_DIR };
  process.env.HOME = home;
  delete process.env.PI_CODING_AGENT_DIR;
  try {
    return work();
  } finally {
    if (saved.home === undefined) delete process.env.HOME;
    else process.env.HOME = saved.home;
    if (saved.agentDir === undefined) delete process.env.PI_CODING_AGENT_DIR;
    else process.env.PI_CODING_AGENT_DIR = saved.agentDir;
  }
}
function object(value: JsonValue | undefined): Obj {
  if (value === null || value === undefined || typeof value !== "object" || Array.isArray(value)) throw new Error("expected an object");
  return value;
}
const copy = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const words = (text: string): string[] => text.split(/\s+/).filter(word => word !== "");
/** bytes: identical; words: the same words in order with white space rendered otherwise; changed: anything else. */
function carriage(input: string, output: string): "bytes" | "words" | "changed" {
  return output === input ? "bytes" : JSON.stringify(words(output)) === JSON.stringify(words(input)) ? "words" : "changed";
}
const STAND_IN_LINE = "Constructed stand-in for docs/perf/programs/perf-f-2026-10-17/sdk-rfcli-cost-comparison.md, not the producer's bytes.";
const BASE_LABEL = "Status: measured, 3 of 5 scenarios published";
function standIn(label: string): string {
  return ["# TSX SDK + RFCLI end-to-end cost comparison", "", STAND_IN_LINE, "", label, "", "| scenario | sdk ms | rfcli ms |", "| --- | --- | --- |", "| blocks-10 | 12 | 40 |", ""].join("\n");
}
/** The producer's own label shapes: Pi carries each byte for byte, its own claim words included. */
const LABELS: readonly string[] = [BASE_LABEL, "Status: draft, numbers pending a re-measure", "Status: \u201ccomplete\u201d per the producer, measured at a pinned revision", "Status: done for 4 of 5 scenarios"];
const ENV: EnvInfo = { isGitRepo: false, branch: "", platform: "linux" };
const CONFIG: AgentConfig = { name: "census-skill-agent", description: "census", builtinToolNames: [], extensions: false, skills: true, systemPrompt: "Census agent.", promptMode: "replace", inheritContext: false, runInBackground: false, isolated: false };
const SKILL = "csbt-cost-comparison";
interface SkillRender { readonly flat: string; readonly directory: string; readonly replace: string; readonly append: string }
function skillRender(doc: string): SkillRender {
  const flatCwd = scratch("csbt4-skill-flat-");
  mkdirSync(join(flatCwd, ".pi", "skills"), { recursive: true });
  writeFileSync(join(flatCwd, ".pi", "skills", `${SKILL}.md`), doc);
  const dirCwd = scratch("csbt4-skill-dir-");
  mkdirSync(join(dirCwd, ".agents", "skills", SKILL), { recursive: true });
  writeFileSync(join(dirCwd, ".agents", "skills", SKILL, "SKILL.md"), doc);
  const flat = preloadSkills([SKILL], flatCwd);
  const directory = preloadSkills([SKILL], dirCwd);
  const header = `\n# Preloaded Skill: ${SKILL}\n`;
  const suffix = (prompt: string): string => (prompt.lastIndexOf(header) < 0 ? "" : prompt.slice(prompt.lastIndexOf(header) + header.length));
  return {
    flat: flat[0]?.content ?? "",
    directory: directory[0]?.content ?? "",
    replace: suffix(buildAgentPrompt(CONFIG, dirCwd, ENV, undefined, { skillBlocks: directory })),
    append: suffix(buildAgentPrompt({ ...CONFIG, promptMode: "append" }, dirCwd, ENV, "Parent prompt.", { skillBlocks: directory })),
  };
}
const LAYOUTS: readonly WorkbenchTextLayout[] = ["text", "lines", "terminal", "label"];
const display = (text: string): Record<string, string> => Object.fromEntries(LAYOUTS.map(layout => [layout, sanitizeWorkbenchText(text, WORKBENCH_TEXT_LIMIT, layout)]));
const ID = "reactivefiber.render.preview";
function envelopeWith(doc: string): Obj {
  const envelope = fullShapeRf(ROOT) as Obj;
  const result = object(envelope.result);
  object(result.output).text = doc;
  result.blocks = [{ final_index: 0, candidate_key: "fixture::comparison", component_id: "fixture", content: doc }];
  result.necessity = [{ candidate_key: "fixture::comparison", include: true }];
  return envelope;
}
const reading = (envelope: JsonValue): Obj => ({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: envelope });
function injected(envelope: JsonValue): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  type Envelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;
  registerReactiveFiberRender(registry, async () => copy(envelope) as unknown as Envelope, ROOT);
  return registry;
}
function native(envelope: JsonValue): CapabilityRegistry {
  const dir = scratch("csbt4-rf-");
  const executable = join(dir, "rf");
  writeFileSync(executable, `#!/usr/bin/env node\nprocess.stdout.write(${JSON.stringify(JSON.stringify(envelope))});\n`);
  chmodSync(executable, 0o700);
  process.env.PATH = `${dir}:${oldPath ?? ""}`;
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  return registry;
}
async function invoke(registry: CapabilityRegistry): Promise<JsonValue> {
  return registry.invoke(ID, { model: "fixture", task: "fixture" }, { grants: ["reactivefiber:render"], signal: new AbortController().signal });
}
async function curated(registry: CapabilityRegistry): Promise<JsonValue> {
  const server = createCuratedTools({ registry, allowedCapabilities: [ID], grants: [`discover:${ID}`, `invoke:${ID}`, "reactivefiber:render"], principal: { id: "fixture", role: "fixture" }, workspace: ROOT, invocationId: "csbt4-fixture", signal: new AbortController().signal });
  const client = new Client({ name: "csbt4-fixture", version: "1.0.0" });
  const [clientEnd, serverEnd] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverEnd);
  await client.connect(clientEnd);
  try {
    const reply = await client.callTool({ name: "capability_invoke", arguments: { capabilityId: ID, capabilityVersion: "1.0.0", input: { model: "fixture", task: "fixture" } } });
    const content: unknown = reply.content;
    const first: unknown = Array.isArray(content) ? content[0] : undefined;
    if (typeof first !== "object" || first === null || !("text" in first) || typeof first.text !== "string") throw new Error("expected one text reply");
    const payload = object(JSON.parse(first.text) as JsonValue);
    expect(reply.isError === true).toBe(false);
    expect(payload.kind).toBe("returned");
    return payload.value ?? null;
  } finally { await client.close(); await server.instance.close(); }
}
/** Every existing rf carrier; each yields the carried output text and block content. */
async function rfCarried(doc: string): Promise<Record<string, { output: string; block: string }>> {
  const envelope = envelopeWith(doc);
  const values: Record<string, JsonValue> = {
    native: await invoke(native(envelope)),
    injected: await invoke(injected(envelope)),
    "curated-MCP": await curated(injected(envelope)),
    "shared-JSON": sanitizeWorkbenchJson(reading(envelope)),
    "shared-JSON-text": JSON.parse(sanitizeWorkbenchJsonText(reading(envelope))) as JsonValue,
  };
  return Object.fromEntries(Object.entries(values).map(([name, value]) => {
    const result = object(object(object(value).source).result);
    const block = object((result.blocks as JsonValue[])[0]);
    return [name, { output: String(object(result.output).text), block: String(block.content) }];
  }));
}
function topology(envelope: JsonValue): JsonValue {
  return copy(reactivefiberTopology(reading(envelope), { scope: { workspace: ROOT, principal: "fixture" }, seam: "rf-cli", capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z" })) as unknown as JsonValue;
}
function leaves(value: JsonValue, path = "$"): string[] {
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => leaves(item, `${path}.${key}`));
  return [`${path}=${JSON.stringify(value)}`];
}
type ViewerArgs = ConstructorParameters<typeof ConversationViewer>;
const ANSI = /\x1b\[[0-9;]*m/g;
/** The viewer's rendered lines (ANSI stripped) for one assistant message, in a markdown mode. */
function viewerLines(text: string | null, mode: "assistant" | "off"): string[] {
  const tui = { terminal: { rows: 60, columns: 200 }, requestRender: (): void => undefined } as unknown as ViewerArgs[0];
  const messages = text === null ? [] : [{ role: "assistant", content: [{ type: "text", text }] }];
  const session = { messages, subscribe: () => (): void => undefined, dispose: (): void => undefined, getSessionStats: () => ({ tokens: { input: 0, output: 0, cacheWrite: 0 } }) } as unknown as ViewerArgs[1];
  const record = { id: "csbt4-viewer", type: "general-purpose", description: "census viewer", status: "running", toolUses: 0, startedAt: 0 } as AgentRecord;
  const theme = { fg: (_color: string, value: string) => value, bold: (value: string) => value } as unknown as ViewerArgs[4];
  const viewer = new ConversationViewer(tui, session, record, undefined, theme, () => undefined, undefined, undefined, undefined, false, () => mode);
  return viewer.render(200).map(line => line.replace(ANSI, ""));
}
const visible = (lines: readonly string[], line: string): boolean => lines.some(rendered => rendered.includes(line));
/** One render of `doc` through every carrier; the returned reader says which carriers hold a given label (B3's cells). */
async function holdersOf(doc: string): Promise<(label: string) => Obj> {
  const skill = Object.values(skillRender(doc));
  const shown = Object.values(display(doc));
  const carried = Object.values(await rfCarried(doc));
  const viewer = [viewerLines(doc, "assistant"), viewerLines(doc, "off")];
  return label => ({
    skill: skill.map(value => value.includes(label)),
    display: [...shown.map(value => value.includes(label)), sanitizeWorkbenchText(label, WORKBENCH_TEXT_LIMIT, "label") === label],
    rf: carried.map(value => value.output.includes(label) && value.block.includes(label)),
    viewer: viewer.map(rendered => visible(rendered, label)),
  });
}

// --------------------------------------------------------------------------------------------------------- the writer scan
const WRITE_APIS = new Set(["writeFile", "writeFileSync", "appendFile", "appendFileSync", "copyFile", "copyFileSync", "cp", "cpSync", "rename", "renameSync", "createWriteStream", "symlink", "symlinkSync", "link", "linkSync", "truncate", "truncateSync", "rm", "rmSync", "unlink", "unlinkSync"]);
const SKILL_NAME = /skill/i;
function constant(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return constant(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = constant(node.left);
    const right = constant(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let text = node.head.text;
    for (const span of node.templateSpans) text += `\u0000${span.literal.text}`;
    return text;
  }
  return undefined;
}
/** Write calls whose arguments spell skill (a skill root, SKILL.md or a skill-named identifier; literals constant-folded), and how many write calls were examined. */
function writers(path: string, text: string): { readonly hits: string[]; readonly examined: number } {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const hits: string[] = [];
  let examined = 0;
  const names = (node: ts.Node): string[] => {
    const own = constant(node);
    const here = own !== undefined ? [own] : ts.isIdentifier(node) ? [node.text] : [];
    return [...here, ...node.getChildren(source).flatMap(names)];
  };
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const callee = ts.isIdentifier(node.expression) ? node.expression.text : ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : "";
      if (WRITE_APIS.has(callee)) {
        examined += 1;
        if (node.arguments.some(argument => names(argument).some(name => SKILL_NAME.test(name)))) hits.push(`${path}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1} ${callee}`);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { hits, examined };
}
const isSrcModule = (path: string): boolean => path.startsWith("src/") && /\.tsx?$/.test(path);
function srcModules(): string[] { return gitList(REPO).filter(isSrcModule); }
/** Every src module git lists under `base`, with its text. */
function srcSources(base: string): (readonly [string, string])[] {
  return gitList(base).filter(isSrcModule).map(path => [path, readFileSync(join(base, path), "utf8")] as const);
}
/** The writer scan over named sources: each parsed, every write call examined, the skill-spelling ones reported. */
function writerPass(sources: readonly (readonly [string, string])[]): { readonly hits: string[]; readonly parsed: string[]; readonly examined: number } {
  const hits: string[] = [];
  const parsed: string[] = [];
  let examined = 0;
  for (const [path, text] of sources) {
    const one = writers(path, text);
    hits.push(...one.hits);
    parsed.push(path);
    examined += one.examined;
  }
  return { hits, parsed, examined };
}
/** The write calls in `sources` counted outside the writer pass (wb-vp5l): a walk of its own, every call naming a write API, no skill predicate. */
function writeCallCount(sources: readonly (readonly [string, string])[]): number {
  let count = 0;
  for (const [path, text] of sources) {
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node)) {
        const callee = node.expression;
        if (WRITE_APIS.has(ts.isIdentifier(callee) ? callee.text : ts.isPropertyAccessExpression(callee) ? callee.name.text : "")) count += 1;
      }
      ts.forEachChild(node, visit);
    };
    visit(ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS));
  }
  return count;
}
function imports(path: string, text: string): string[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  return source.statements.flatMap(statement => (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) ? [statement.moduleSpecifier.text] : []));
}
function literalSites(path: string, text: string, wanted: ReadonlySet<string>): boolean {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let found = false;
  const visit = (node: ts.Node): void => { if (ts.isStringLiteralLike(node) && wanted.has(node.text)) found = true; ts.forEachChild(node, visit); };
  visit(source);
  return found;
}
function calls(path: string, text: string, name: string): boolean {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let found = false;
  const visit = (node: ts.Node): void => { if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === name) found = true; ts.forEachChild(node, visit); };
  visit(source);
  return found;
}

// ------------------------------------------------------------------------------------------------------------------- the pins
const PLANT = "The SDK+RFCLI cost comparison is complete.";
/** Root files that are not .md pages (R-OUTSIDE-ROOTS): the walk never reads them. */
const ROOT_FILE_PLANTS: readonly string[] = ["PLANT.txt", "plant.json"];
/** One plant per user-level skill root src/skill-loader.ts reads, by skill name: getAgentDir()/skills, ~/.agents/skills, ~/.pi/skills. */
const USER_PLANTS: Readonly<Record<string, string>> = {
  "csbt4-user-agent": ".pi/agent/skills/csbt4-user-agent/SKILL.md",
  "csbt4-user-agents": ".agents/skills/csbt4-user-agents/SKILL.md",
  "csbt4-user-legacy": ".pi/skills/csbt4-user-legacy.md",
};
const twinOf = (path: string): string => path.replace(/(\.[^./]+)$/, "-twin$1");
const untie = (text: string): string => text.replace(/(complete|done|finished)/, "not $1");
const REACHED = new Set<string>();
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const walked = walkTree(REPO);
    const listed = gitList(REPO);
    const skip = ignored(REPO, walked.files);
    const walkAgreesWithGit = JSON.stringify(walked.files.filter(path => !skip.has(path))) === JSON.stringify(listed);
    expect(walked.links).toEqual([]);
    expect(walkAgreesWithGit).toBe(true);
    const floorsMet = floorsMetBy(listed);
    const anchors = ["AGENTS.md", "README.md", "docs/workbench/15-implementation-program.md", "docs/workbench/feature-matrix.md", "src/skill-loader.ts", "src/prompts.ts", "src/workbench/redaction.ts", "src/ui/conversation-viewer.ts", ".agents/skills/beads/SKILL.md", ".pi/agents/auditor.md", "qa/workbench/receipts-index.mjs", SELF, ROSTER_FILE];
    const { unreadable } = judgeFiles(REPO, listed.filter(path => !CONSTANTS.exempt.includes(path)));
    // The roots, anchored outside this file (wb-3or6): every top-level directory git tracks is a scanned root or a named
    // outside directory, and every project skill root src/skill-loader.ts loads from is scanned.
    const trackedTop = trackedTopDirectories(REPO);
    expect(trackedTop.filter(name => !CONSTANTS.roots.includes(name) && !CONSTANTS.outside.includes(name))).toEqual([]);
    // The shipped roots, anchored outside this file (wb-vp5l): every tracked top-level directory the packaged artifact ships
    // (qa/workbench/package-boundary.mjs TOP_LEVEL_ALLOWLIST) is scanned, except the directory package.json's file:
    // dependencies resolve into (vendor/, an R-OUTSIDE-ROOTS member), so a shipped root reclassified as outside reds.
    const shipped = trackedTop.filter(name => TOP_LEVEL_ALLOWLIST.includes(name));
    const vendored = vendoredDirectories();
    expect(shipped.filter(name => !vendored.includes(name) && !CONSTANTS.roots.includes(name))).toEqual([]);
    const loaded = loaderRoots();
    const projectSkillRoots = loaded.filter(root => root.startsWith("cwd/")).map(root => root.slice("cwd/".length));
    expect(projectSkillRoots.length).toBeGreaterThan(0);
    expect(projectSkillRoots.filter(root => !CONSTANTS.skillRoots.includes(root) || !CONSTANTS.roots.includes(root.slice(0, root.indexOf("/"))))).toEqual([]);
    // R-OUTSIDE-ROOTS quiet row: a replica plants the same claim in docs/, in every tree outside the scanned roots and in two
    // root files that are not .md pages; the walk reads docs/ only, while each other plant is a finding when it is read.
    const replica = scratch("csbt4-replica-");
    for (const directory of ["docs", ...CONSTANTS.outside]) { mkdirSync(join(replica, directory), { recursive: true }); writeFileSync(join(replica, directory, "plant.md"), `${PLANT}\n`); }
    for (const name of ROOT_FILE_PLANTS) writeFileSync(join(replica, name), `${PLANT}\n`);
    const replicaWalk = walkTree(replica);
    const outsideQuiet = judgeFiles(replica, replicaWalk.files).findings;
    expect(outsideQuiet).toEqual(["docs/plant.md:1 N5: asserted-complete"]);
    const outsideWhenRead = judgeFiles(replica, [...CONSTANTS.outside.map(directory => `${directory}/plant.md`), ...ROOT_FILE_PLANTS]).findings;
    // Its user-level member: Pi's loader serves a claim from each user-level root it reads, each claim is a finding when it is
    // read, and the live pass over a project finds none of them.
    const home = scratch("csbt4-home-");
    for (const path of Object.values(USER_PLANTS)) { mkdirSync(dirname(join(home, path)), { recursive: true }); writeFileSync(join(home, path), `${PLANT}\n`); }
    const project = gitReplica("csbt4-home-project-", { "docs/readme.md": "A project with no skill of its own.\n" });
    const userLevel = withHome(home, () => ({
      served: preloadSkills(Object.keys(USER_PLANTS), project).map(skill => skill.content === PLANT),
      whenRead: judgeFiles(home, Object.values(USER_PLANTS)).findings,
      livePass: liveScan(project).findings,
    }));
    return { roots: Object.fromEntries(CONSTANTS.roots.map(root => [root, existsSync(join(REPO, root))])), floorsMet, anchorsListed: anchors.filter(path => !listed.includes(path)), walkAgreesWithGit, links: walked.links, unreadable, outsideQuiet, replicaFiles: replicaWalk.files, trackedTop, shipped, vendored, loaderRoots: loaded, outsideWhenRead, userLevel };
  },
  A2: async () => {
    const spellings = [
      "sdk-rfcli-cost-comparison.md is complete.", "The sdk_rfcli JSON is done.", "TSX-PF-05 is complete.", "tsx pf 5 is finished.", "Packet tsx_pf_05 completed.",
      "rftsx-zblcp is done.", "The rftsx zblcp bead completes the packet.", "perf-f-2026-10-17 is complete.", "perf_f_2026_10_17: done.",
      "The SDK+RFCLI end-to-end cost comparison is complete.", "SDK + RFCLI costs: done.", "The SDKs and the RFCLI were compared: finished.",
      "ReactiveFiberTSXSDK versus ReactiveFiberCLI benchmark is complete.", "The @reactive-fiber/tsx and rf CLI benchmarks are done.", "SDK vs rf-cli, comparing costs: completion recorded.",
      "SDK, RFCLI, comparisons: complete.", "SDK and RFCLI compares: complete.", "SDK and RFCLI bench: complete.", "SDK and RFCLI benched: complete.", "SDK and RFCLI benchmarking: complete.",
      "\uff33\uff24\uff2b+RFCLI cost comparison is complete.",
    ];
    const claims = ["complete", "completed", "completes", "completion", "done", "finished", "COMPLETE", "**complete**", "\u201ccomplete\u201d", "complete/done"].map(word => verdict(`The SDK+RFCLI cost comparison: ${word}`));
    const markers = ["not", "no", "never", "nor", "without", "until", "unless", "pending", "absent", "unshipped", "unpublished", "gated", "before", "if", "when", "once", "whether", "isn't", "isn\u2019t"].map(word => verdict(`The SDK+RFCLI cost comparison ${word} complete.`));
    const cutter = [
      judgeText("docs/x.md", "Intro line.\n\nThe SDK+RFCLI cost comparison is complete; no other row changed."),
      judgeText("src/x.ts", "// The SDK+RFCLI cost\n// comparison is complete."),
      judgeText("docs/x.md", "| packet | state |\n| SDK+RFCLI cost comparison | complete |\n| SDK+RFCLI cost comparison | not complete |"),
      judgeText("docs/x.md", "SDK+RFCLI cost comparison\n- complete"),
      judgeText("src/x.ts", "SDK+RFCLI cost comparison\n- complete"),
      judgeText("docs/x.md", "SDK+RFCLI cost comparison\n\ncomplete"),
      judgeText("docs/x.md", "The SDK+RFCLI cost comparison is complete!Next"),
      judgeText("docs/x.md", "Version 0.1.668 of the SDK+RFCLI cost comparison is complete."),
      judgeText("test/fixtures/x.json", '"state": "SDK+RFCLI cost comparison complete",\n"note": "not measured"'),
      judgeText("test/x.ts", '"state": "SDK+RFCLI cost comparison complete",\n"note": "not measured"'),
    ];
    const producerRows = ROSTER.producer.excerpts.map(excerpt => verdict(Buffer.from(excerpt.textBase64, "base64").toString("utf8")));
    const quiet = {
      "R-MARKER-ANYWHERE": verdict("The SDK+RFCLI cost comparison is complete and no rerun is planned."),
      "R-UNANCHORED": [verdict("The TSX cost comparison is complete."), verdict("The SDK+RFCLI pairing is complete."), verdict("The RFCLI cost comparison is complete.")],
      "R-SPLIT": [judgeText("docs/x.md", "We ran the SDK+RFCLI cost comparison. It is complete."), judgeText("docs/x.md", "Status: complete. Subject: SDK+RFCLI cost comparison."), judgeText("docs/x.md", "SDK vs. RFCLI cost comparison: complete")],
      "R-PARAPHRASE": ["final", "ready", "published", "shipped"].map(word => verdict(`The SDK+RFCLI cost comparison is ${word}.`)),
      "R-LOOKALIKE": [verdict(`The ${String.fromCodePoint(0x0405)}DK+RFCLI cost comparison is complete.`), verdict(`sdk-rf${String.fromCodePoint(0x200b)}cli-cost-comparison.md is complete.`), verdict(`The SDK+RFCLI cost comparison is com${String.fromCodePoint(0x200b)}plete.`)],
      "R-RENDERED-TEXT": [judgeText("docs/x.md", "The SDK+RFCLI cost comparison is com**plete**."), judgeText("docs/x.md", "The SDK+RFCLI cost comparison is comp&#108;ete."), judgeText("docs/x.md", "<!-- The SDK+RFCLI cost comparison is complete. -->")],
    };
    // Each residual whose quiet row is A2 has exactly one entry here, in roster order.
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "A2").map(residual => residual.id));
    return { spellings: spellings.map(verdict), claims, markers, cutter, producerRows, quiet };
  },
  A3: async () => {
    const gate = gateOf(ROSTER.producer.perfTree);
    // ONE pass over every listed file, the exempt pair included (wb-3or6): it must find in the pair exactly what judging the
    // pair alone finds, so a pass that read nothing, or skipped the pair, reds - and it must find nothing outside the pair.
    const live = liveScan(REPO);
    const pair = [...CONSTANTS.exempt].sort(byName).flatMap(path => judgeText(path, readFileSync(join(REPO, path), "utf8")));
    expect(pair.length).toBeGreaterThan(0);
    expect(live.findings).toEqual(pair);
    expect(outside(live)).toEqual([]);
    const exemptionsLoadBearing = CONSTANTS.exempt.map(path => (live.exempt[path] ?? 0) > 0);
    // Exact coverage (wb-vp5l): the listing equals a fresh git listing and the sentences judged equal a recount of it made
    // outside the pass, so a partial read above the floors reds; the floors stay as non-vacuity guards.
    const listing = gitList(REPO);
    const coverage = { readAll: JSON.stringify(live.read) === JSON.stringify(live.listed) && live.unreadable.length === 0, floorsMet: floorsMetBy(live.read), sentencesFloorMet: live.sentences >= SENTENCE_FLOOR, listedAll: JSON.stringify(live.listed) === JSON.stringify(listing), sentencesAll: live.sentences === sentenceRecount(REPO, listing) };
    const plants: readonly (readonly [string, string])[] = [
      ["docs/workbench/plant.md", PLANT],
      ["src/workbench/plant.ts", 'const label = "TSX-PF-05: done";'],
      [".agents/skills/rf/SKILL.md", "Status: the sdk-rfcli-cost-comparison is complete."],
      ["README.md", "- SDK + RFCLI cost comparison: complete"],
      ["qa/workbench/plant.mjs", "// rftsx-zblcp finished, so the perf-f-2026-10-17 page is done."],
    ];
    const planted = plants.flatMap(([path, text]) => judgeText(path, text));
    const twins = plants.flatMap(([path, text]) => judgeText(path, untie(text)));
    // The same pass over a scratch git repository holding the plants, their twins and a copy of the exempt pair: through
    // gitList and judgeFiles it must find the plants, and only them, and set the pair aside.
    const files: Record<string, string> = {};
    for (const [path, text] of plants) { files[path] = `${text}\n`; files[twinOf(path)] = `${untie(text)}\n`; }
    for (const path of CONSTANTS.exempt) files[path] = readFileSync(join(REPO, path), "utf8");
    const mirror = liveScan(gitReplica("csbt4-live-", files));
    const replica = { findings: outside(mirror), exemptionsLoadBearing: CONSTANTS.exempt.map(path => (mirror.exempt[path] ?? 0) > 0), read: mirror.read.length, verdict: guard("ABSENT", outside(mirror)) };
    return { gate, live: guard(gate, outside(live)), findings: outside(live), exemptionsLoadBearing, planted, plantedVerdict: guard("ABSENT", planted), standDown: guard("PRESENT", planted), twins, coverage, replica };
  },
  A4: async () => {
    const ancestor = spawnSync("git", ["merge-base", "--is-ancestor", CONSTANTS.filingRead, "HEAD"], { cwd: REPO }).status === 0;
    const listing = execFileSync("git", ["ls-tree", "-r", "-z", "--full-tree", CONSTANTS.filingRead], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
    const entries = listing.split("\0").filter(line => line !== "").map(line => { const [meta = "", path = ""] = line.split("\t"); const [mode = "", type = "", id = ""] = meta.split(" "); return { mode, type, id, path }; });
    const inRoots = entries.filter(entry => CONSTANTS.roots.some(root => entry.path.startsWith(`${root}/`)) || PAGE.test(entry.path));
    const links = inRoots.filter(entry => entry.mode === "120000").map(entry => entry.path);
    const blobs = inRoots.filter(entry => entry.type === "blob" && entry.mode !== "120000");
    const texts = readBlobs([...new Set(blobs.map(entry => entry.id))]);
    // ONE pass over the tree and two in-memory claim texts (wb-3or6): it must find exactly what the two find alone.
    const positives = [["docs/workbench/plant.md", `${PLANT}\n`], ["src/workbench/plant.ts", 'const label = "TSX-PF-05: done";\n']] as const;
    const alone = judgeAll(positives).findings;
    expect(alone.length).toBe(positives.length);
    const pass = judgeAll([...blobs.map(entry => [entry.path, texts.get(entry.id) ?? ""] as const), ...positives]);
    expect(pass.findings).toEqual(alone);
    // The filing's own grep, read from its shipped-status sentence: the terms and the trees it names.
    const filing = filingOf(beadNotes());
    const grep = new RegExp(filing.terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "i");
    const filingGrep = Object.fromEntries(filing.roots.map(root => [root, blobs.filter(entry => entry.path.startsWith(`${root}/`) && grep.test(texts.get(entry.id) ?? "")).length]));
    return { revision: CONSTANTS.filingRead, ancestor, judgedFloor: blobs.length >= 650, exemptAbsent: CONSTANTS.exempt.every(path => !blobs.some(entry => entry.path === path)), links, findings: pass.findings.filter(finding => !alone.includes(finding)), filingGrep, judged: { files: pass.read.length, sentences: pass.sentences } };
  },
  B1: async () => {
    const tree = ROSTER.producer.perfTree;
    const at = (name: string, kind: TreeEntry["kind"], directory: string = CONSTANTS.gate.directory): TreeEntry => ({ path: `${directory}/${name}`, kind });
    const [md = "", json = ""] = CONSTANTS.gate.files;
    const both = [...tree, at(md, "blob"), at(json, "blob")];
    const nearMisses: readonly (readonly [string, readonly TreeEntry[]])[] = [
      ["md-only", [...tree, at(md, "blob")]],
      ["json-only", [...tree, at(json, "blob")]],
      ["directories", [...tree, at(md, "tree"), at(json, "tree")]],
      ["links", [...tree, at(md, "link"), at(json, "link")]],
      ["other-program", [...tree, at(md, "blob", "docs/perf/programs/ip-2026-10-15"), at(json, "blob", "docs/perf/programs/ip-2026-10-15")]],
      ["next-day", [...tree, at(md, "blob", "docs/perf/programs/perf-f-2026-10-18"), at(json, "blob", "docs/perf/programs/perf-f-2026-10-18")]],
      ["case-variant", [...tree, at(md.toUpperCase(), "blob"), at(json.toUpperCase(), "blob")]],
      ["root-level", [...tree, at(md, "blob", "docs/perf"), at(json, "blob", "docs/perf")]],
    ];
    // ONE pass over the listing and two planted copy paths (wb-3or6): it must find exactly the planted pair, and it must have
    // examined exactly a fresh git listing plus the plants (wb-vp5l), so a partial listing above the floor of 650 reds.
    const planted = [`test/fixtures/${md}`, `${CONSTANTS.gate.directory}/${json}`];
    const pass = copiesAmong([...gitList(REPO), ...planted]);
    expect(pass.copies).toEqual(planted);
    const examinedAll = pass.examined === gitList(REPO).length + planted.length;
    // The same scan over a scratch git repository holding two copies named after the gating files and three near names.
    const mirror = copiesAmong(gitList(gitReplica("csbt4-copies-", { [`test/fixtures/${md}`]: "copy\n", [`${CONSTANTS.gate.directory}/${json}`]: "{}\n", [`test/fixtures/${md.toUpperCase()}`]: "case variant\n", [`test/fixtures/${md}.bak`]: "suffixed\n", [`docs/${md.replace(".md", "-notes.md")}`]: "longer name\n" })));
    return { pin: gateOf(tree), programs: tree.filter(entry => entry.kind === "tree" && /^docs\/perf\/programs\/[^/]+$/.test(entry.path)).map(entry => entry.path), present: gateOf(both), nearMisses: Object.fromEntries(nearMisses.map(([name, entries]) => [name, gateOf(entries)])), fixtureCopies: pass.copies.filter(path => !planted.includes(path)), fixtureScan: { examinedFloorMet: pass.examined - planted.length >= 650, examinedAll }, replicaCopies: mirror.copies };
  },
  B2: async () => {
    const doc = standIn(BASE_LABEL);
    const skill = skillRender(doc);
    const shown = display(doc);
    const carried = await rfCarried(doc);
    const lines = { assistant: viewerLines(doc, "assistant"), off: viewerLines(doc, "off") };
    return {
      skill: Object.fromEntries(Object.entries(skill).map(([name, value]) => [name, carriage(doc.trim(), value)])),
      display: Object.fromEntries(Object.entries(shown).map(([layout, value]) => [layout, carriage(doc, value)])),
      rf: Object.fromEntries(Object.entries(carried).map(([name, value]) => [name, [carriage(doc, value.output), carriage(doc, value.block)]])),
      viewer: Object.fromEntries(Object.entries(lines).map(([mode, rendered]) => [mode, [STAND_IN_LINE, BASE_LABEL].map(line => visible(rendered, line))])),
    };
  },
  B3: async () => {
    const matrix: Record<string, JsonValue> = {};
    for (const [index, label] of LABELS.entries()) {
      const holds = await holdersOf(standIn(label));
      // In-census negative control (wb-3or6): the same render read for the next producer label, which its document does not
      // carry, holds it nowhere (the last display cell is the label layout's identity on that label, so it stays true).
      matrix[label] = { ...holds(label), foreign: holds(LABELS[(index + 1) % LABELS.length] ?? "") };
    }
    const gapLabels = ["Status:  partial, two spaces", "Status:\tpartial, one tab"];
    // Carrier-axis negative rows (wb-vp5l): each R-DISPLAY-GAPS label read through the same reader over its own document. The
    // carriers that render a gap do not hold it byte for byte, so a cell that reads the input document reds here.
    for (const label of gapLabels) matrix[label] = (await holdersOf(standIn(label)))(label);
    // R-DISPLAY-GAPS quiet row: a run of spaces or a tab in the label line is rendered as a gap by the display layouts and the
    // shared JSON sanitizer (bytes change, words do not); the byte carriers keep it.
    const gaps: Record<string, JsonValue> = {};
    for (const label of gapLabels) {
      const carried = await rfCarried(standIn(label));
      gaps[label] = { label: carriage(label, sanitizeWorkbenchText(label, WORKBENCH_TEXT_LIMIT, "label")), text: carriage(label, sanitizeWorkbenchText(label, WORKBENCH_TEXT_LIMIT, "text")), rf: Object.fromEntries(Object.entries(carried).map(([name, value]) => [name, value.output.includes(label)])) };
    }
    return { matrix, gaps };
  },
  B4: async () => {
    const deltas: Record<string, JsonValue> = {};
    const emptyAssistant = claimCount(viewerLines(null, "assistant").join("\n"));
    const emptyOff = claimCount(viewerLines(null, "off").join("\n"));
    for (const label of LABELS) {
      const doc = standIn(label);
      const base = claimCount(doc);
      const skill = skillRender(doc);
      const carried = await rfCarried(doc);
      deltas[label] = {
        base,
        skill: Object.values(skill).map(value => claimCount(value) - base),
        display: Object.values(display(doc)).map(value => claimCount(value) - base),
        rf: Object.values(carried).map(value => [claimCount(value.output) - base, claimCount(value.block) - base]),
        viewer: [claimCount(viewerLines(doc, "assistant").join("\n")) - emptyAssistant - base, claimCount(viewerLines(doc, "off").join("\n")) - emptyOff - base],
      };
    }
    // The checker's own controls: a render that adds a qualifier reads a positive delta.
    const doc = standIn(BASE_LABEL);
    const mutants = [doc.replace(BASE_LABEL, `${BASE_LABEL} (complete)`), doc.replace(BASE_LABEL, `Done: ${BASE_LABEL}`), doc.replace("measured", "completed"), `${doc}COMPLETE\n`, doc.replace(BASE_LABEL, `${BASE_LABEL}, complete/done`)].map(mutant => claimCount(mutant) - claimCount(doc));
    // R-COVERAGE-WORD quiet row: the projection differs from a neutral document's only by its content-addressed reference,
    // carries no document text, and states the same coverage word for both.
    const withDoc = topology(envelopeWith(doc));
    const neutral = topology(envelopeWith(standIn("Status: neutral").replace(STAND_IN_LINE, "Neutral line.").replace("# TSX SDK + RFCLI end-to-end cost comparison", "# Neutral")));
    const other = new Set(leaves(neutral));
    const coverage = (value: JsonValue): JsonValue[] => ((object(value).snapshots as JsonValue[]) ?? []).map(snapshot => object(snapshot).coverage ?? null);
    const projection = { differing: leaves(withDoc).filter(leaf => !other.has(leaf)).map(leaf => leaf.slice(0, leaf.indexOf("="))), carriesLabel: JSON.stringify(withDoc).includes(BASE_LABEL), carriesStandIn: JSON.stringify(withDoc).includes(STAND_IN_LINE), coverage: [coverage(withDoc), coverage(neutral)] };
    return { deltas, mutants, projection };
  },
  C1: async () => {
    const installed = Object.fromEntries(CONSTANTS.skillRoots.map(root => [root, existsSync(join(REPO, root)) ? readdirSync(join(REPO, root)).sort(byName) : null]));
    const rfTsxCopies = Object.values(installed).flatMap(names => (names ?? []).filter(name => /rf|tsx|reactive|fiber/i.test(name)));
    const modules = srcModules();
    const texts = new Map(modules.map(path => [path, readFileSync(join(REPO, path), "utf8")]));
    const loaderImporters = modules.filter(path => imports(path, texts.get(path) ?? "").some(specifier => /(?:^|\/)skill-loader\.js$/.test(specifier)));
    const skillRootSpellers = modules.filter(path => literalSites(path, texts.get(path) ?? "", new Set(["skills", "SKILL.md"])));
    const preloadCallers = modules.filter(path => calls(path, texts.get(path) ?? "", "preloadSkills"));
    const promptComposers = modules.filter(path => (texts.get(path) ?? "").includes("# Preloaded Skill: "));
    return { installed, rfTsxCopies, loaderImporters, skillRootSpellers, preloadCallers, promptComposers };
  },
  C2: async () => {
    const v1 = standIn("Status: draft, numbers pending a re-measure");
    const v2 = standIn("Status: measured, 5 of 5 scenarios published at a pinned revision");
    const cwd = scratch("csbt4-refresh-");
    const flatFile = join(cwd, ".pi", "skills", `${SKILL}-flat.md`);
    const dirFile = join(cwd, ".agents", "skills", `${SKILL}-dir`, "SKILL.md");
    mkdirSync(dirname(flatFile), { recursive: true });
    mkdirSync(dirname(dirFile), { recursive: true });
    const read = (): string[] => preloadSkills([`${SKILL}-flat`, `${SKILL}-dir`], cwd).map(skill => skill.content);
    const which = (content: string): string => (content === v1.trim() ? "v1" : content === v2.trim() ? "v2" : content.startsWith('(Skill "') ? "not-found" : "other");
    writeFileSync(flatFile, v1);
    writeFileSync(dirFile, v1);
    const first = read().map(which);
    writeFileSync(flatFile, v2);
    writeFileSync(dirFile, v2);
    const second = read().map(which);
    const prompt = buildAgentPrompt(CONFIG, cwd, ENV, undefined, { skillBlocks: preloadSkills([`${SKILL}-dir`], cwd) });
    const promptCarriesUpdate = prompt.endsWith(v2.trim()) && !prompt.includes("pending a re-measure");
    rmSync(flatFile);
    rmSync(dirFile);
    const removed = read().map(which);
    // R-SHADOWED-COPY quiet row: a stale project copy in .pi/skills wins over the producer's update in .agents/skills.
    const shadow = join(cwd, ".pi", "skills", `${SKILL}-shadow.md`);
    const update = join(cwd, ".agents", "skills", `${SKILL}-shadow`, "SKILL.md");
    mkdirSync(dirname(update), { recursive: true });
    writeFileSync(shadow, v1);
    writeFileSync(update, v2);
    const shadowed = preloadSkills([`${SKILL}-shadow`], cwd).map(skill => which(skill.content));
    return { first, second, promptCarriesUpdate, removed, shadowed };
  },
  C3: async () => {
    const samples = [standIn(BASE_LABEL), `  \n${standIn(LABELS[2] ?? BASE_LABEL)}\n\n`, `\n\n${standIn(LABELS[3] ?? BASE_LABEL)}   `];
    const trimOnly = samples.map(sample => skillRender(sample).directory === sample.trim());
    const controlTexts = [
      'writeFileSync(join(cwd, ".agents", "skills", "rf", "SKILL.md"), label);',
      'await fs.writeFile(path.join(root, "skills", name + ".md"), text);',
      'copyFileSync(update, join(skillDir, "README.md"));',
      "renameSync(tmp, skillPath);",
      'fs.appendFileSync(home + "/.pi/skills/rf.md", line);',
    ];
    const controls = controlTexts.map(text => writers("control.ts", text).hits);
    // ONE pass over every src module and the five controls (wb-3or6): it must find exactly what the controls find alone.
    const named = controlTexts.map((text, index) => [`control-${index + 1}.ts`, text] as const);
    const alone = writerPass(named);
    expect(alone.hits.length).toBe(named.length);
    const modules = srcSources(REPO);
    const pass = writerPass([...modules, ...named]);
    expect(pass.hits).toEqual(alone.hits);
    // R-INDIRECT-TARGET quiet row: a computed target escapes; an unrelated write stays quiet.
    const quiet = ["writeFileSync(target(), text);", 'writeFileSync(join(cwd, "out.txt"), text);'].map(text => writers("quiet.ts", text).hits);
    // The same scan over a scratch git repository: a src module writing into a skill root is found, an unrelated src write
    // and a test module writing into a skill root (outside src) are not.
    const plant = 'writeFileSync(join(cwd, ".agents", "skills", "rf", "SKILL.md"), label);\n';
    const mirror = writerPass(srcSources(gitReplica("csbt4-writers-", { "src/plant.ts": plant, "src/quiet.ts": 'writeFileSync(join(cwd, "out.txt"), text);\n', "test/plant.ts": plant })));
    // Exact coverage (wb-vp5l): the write calls the pass examined equal an independent count over a fresh read of every src
    // module, so a pass that skips write calls above the floor of 15 reds; the floors stay as non-vacuity guards.
    const scanned = { parsedAll: JSON.stringify(pass.parsed) === JSON.stringify([...srcModules(), ...named.map(([path]) => path)]), modulesFloorMet: pass.parsed.length - named.length >= 100, examinedFloorMet: pass.examined - alone.examined >= 15, examinedAll: pass.examined - alone.examined === writeCallCount(srcSources(REPO)) };
    return { trimOnly, writers: pass.hits.filter(hit => !alone.hits.includes(hit)), controls, quiet, scanned, replica: mirror };
  },
};

function beadNotes(): string {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const value: unknown = JSON.parse(line);
    if (value !== null && typeof value === "object" && "id" in value && value.id === BEAD && "notes" in value && typeof value.notes === "string") return value.notes;
  }
  throw new Error("bead export lacks the owner filing");
}
/** The filing's shipped-status sentence: the skill root it found absent, the terms it grepped and the trees it grepped. */
function filingOf(notes: string): { readonly skillRoot: string; readonly terms: string[]; readonly roots: string[] } {
  const found = /has no (\S+) directory and 0 hits for (.+?) in (.+?)\. Acceptance: /.exec(notes);
  return { skillRoot: found?.[1] ?? "", terms: (found?.[2] ?? "").split(" or "), roots: (found?.[3] ?? "").split(/, | and /) };
}
function tiled(body: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = body.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:]*$/.test(body.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:]*$/.test(body.slice(at));
}
const STOP = new Set(["the", "end-to-end", "tsx"]);
/** Subject tokens no family alternative matches (empty when the families cover the subject word for word). */
function uncovered(subject: string): string[] {
  return fold(subject).split(/[\s+/]+/).filter(token => token !== "" && !STOP.has(token)).filter(token => !(NAMED.some(family => family.rx.test(token)) || PAIR.sdk.test(token) || PAIR.rfcli.test(token) || PAIR.comparison.test(token)));
}
function expand(path: string): string[] {
  const braces = /^(.*)\{([^}]*)\}(.*)$/.exec(path);
  return braces === null ? [path] : (braces[2] ?? "").split(",").map(part => `${braces[1] ?? ""}${part}${braces[3] ?? ""}`);
}

describe("wb-csbt.4 TSX SDK + RFCLI cost comparison label census (TSX-RESOURCE-EFFICIENCY-FRONTIER-R4, gated)", () => {
  it("judged set: frozen shape, roster, the owner filing's acceptance and statement, producer facts", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:4", "C:3"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id, quote }) => ({ id, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.vocabulary).toEqual(VOCABULARY);
    expect(ROSTER.constants).toEqual(CONSTANTS);
    const notes = beadNotes();
    const acceptance = /Acceptance: (\(a\) .*?)\. Not P0:/.exec(notes)?.[1] ?? "";
    const clauses = acceptance.split(/; (?=\([a-z]\) )/);
    expect(ROWS.map(row => row.label)).toEqual(clauses);
    expect(clauses.map((clause, index) => tiled(clause.slice(4), ROWS[index]?.pins.map(pin => pin.quote) ?? []))).toEqual(clauses.map(() => true));
    const statement = /shall label the (.+?) (\S+) until the producer publishes it/.exec(notes);
    const gated = /\(gated: (\S+) plus (\S+) skill updates, bead (\S+) - /.exec(notes);
    const subject = /for a complete claim about the (.+?) and finds 0/.exec(acceptance)?.[1] ?? "";
    const qualifier = /no added (\S+) qualifier/.exec(acceptance)?.[1] ?? "";
    const [item = "", word = ""] = statement?.slice(1) ?? [];
    const [path = "", packet = "", bead = ""] = gated?.slice(1) ?? [];
    expect([item, subject].map(uncovered)).toEqual([[], []]);
    expect([item, subject].map(text => verdict(`The ${text} is ${word}.`))).toEqual(["N5: asserted-complete", "N5: asserted-complete"]);
    expect(qualifier.split("/").map(claim => verdict(`The ${item} is ${claim}.`))).toEqual(qualifier.split("/").map(claim => `N5: asserted-${claim}`));
    // Literal-free (the CT6 anchor): each gated name the bead spells diagnoses as a claim subject by itself.
    expect([path, packet, bead].map(name => verdict(`${name} is ${word}.`) !== null)).toEqual([true, true, true]);
    expect([path, packet, bead].map(name => familiesOf(fold(name)))).toEqual([["N1", "N4", "N5"], ["N2"], ["N3"]]);
    expect(expand(path)).toEqual(CONSTANTS.gate.files.map(name => `${CONSTANTS.gate.directory}/${name}`));
    // ROOTS (wb-3or6): the filing names the trees it grepped and the skill root it found absent; each is scanned.
    const filing = filingOf(notes);
    expect(filing.roots.filter(root => !CONSTANTS.roots.includes(root))).toEqual([]);
    expect([CONSTANTS.skillRoots.includes(filing.skillRoot), CONSTANTS.roots.includes(filing.skillRoot.slice(0, filing.skillRoot.indexOf("/")))]).toEqual([true, true]);
    // MARKER CLOSEDNESS (wb-3or6): the statement gates its claim with one word and a condition. The gating word admits the
    // claim; no word of the condition is a marker, so each, appended to the claim as a qualifier, keeps it a finding.
    const opening = `${item} ${word} `;
    const clause = notes.slice(notes.indexOf(opening) + opening.length, notes.indexOf(" (gated: "));
    const [, ...condition] = clause.split(" ");
    expect(condition.length).toBeGreaterThan(0);
    expect(verdict(`The ${item} is ${word} ${clause}.`)).toBeNull();
    expect(condition.filter(term => MARKER.test(fold(term)))).toEqual([]);
    expect(condition.map(term => verdict(`The ${item} is ${word} (${term}).`))).toEqual(condition.map(() => `N5: asserted-${word}`));
    expect(verdict(`The ${item} is ${word}: ${condition.join(" ")}.`)).toBe(`N5: asserted-${word}`);
    expect(notes.includes(ROSTER.citation)).toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.pin.slice(0, 12)}`)).toBe(true);
    expect(ROSTER.producer.gate).toBe(gateOf(ROSTER.producer.perfTree));
    expect(ROSTER.producer.excerpts.map(excerpt => createHash("sha256").update(Buffer.from(excerpt.textBase64, "base64")).digest("hex"))).toEqual(ROSTER.producer.excerpts.map(excerpt => excerpt.sha256));
    expect(ROSTER.producer.excerpts.map(excerpt => notes.includes(excerpt.site.slice(excerpt.site.lastIndexOf("/") + 1)))).toEqual(ROSTER.producer.excerpts.map(() => true));
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(ROSTER.residuals.map(residual => residual.id)).toEqual(["R-OUTSIDE-ROOTS", "R-MARKER-ANYWHERE", "R-UNANCHORED", "R-SPLIT", "R-PARAPHRASE", "R-LOOKALIKE", "R-RENDERED-TEXT", "R-GATE-PARTIAL", "R-DISPLAY-GAPS", "R-COVERAGE-WORD", "R-SHADOWED-COPY", "R-INDIRECT-TARGET"]);
    expect(ROSTER.residuals.every(residual => pins.includes(residual.quietPin))).toBe(true);
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          REACHED.add(pin.id);
        });
      }
    });
  }
  it("records: every registered pin ran and reached its witness", () => {
    expect([...REACHED].sort(byName)).toEqual(ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
  });
});
