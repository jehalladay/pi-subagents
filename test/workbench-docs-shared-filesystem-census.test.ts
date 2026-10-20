/**
 * wb-973.5 (SWARM-CONTEXT-GRAPH-R5) docs census: no Pi document presents a shared-filesystem (NFS/EFS) swarm workspace as
 * safe for multi-host use, and docs/13 states the RF workspace root's single-host, local-coordinated scope. Sources:
 * ADR-SCG-010 (ReactiveFiberCLI 09-ADRS-AND-DECISIONS.md:33 @8a8b83e4d, "never present EFS/NFS file sharing as safe
 * distributed mutation") and QA-18 (06-QA-SECURITY-ROLLOUT.md:24, "Explicit unsupported guidance; no safety claim").
 *
 * READING (respin on gate row 553, ORCH-REC-R554): the docs-pin floor binds this census over the acceptance's "grep"
 * wording (row 487 R1(a); row 547 / ORCH-REC-R548 precedent). Every .md file under docs/workbench, receipts included, is
 * judged in two legs, and a sentence either leg refuses reds the census.
 * - FAMILY RULE (both legs; respin 2 on gate row 600: a SUPERSET of the AC4 grep NFS|EFS|shared filesystem|multi-host,
 *   a case-sensitive substring match, so every sentence that grep matches is a family match): a sentence MATCHES when
 *   it names NFS or EFS at the start of a word in any case (nfs, NFSv4; refs and confs never do) or in capitals
 *   anywhere in a word (pNFS, AmazonEFS), or names, case-insensitively and anywhere in a word, shared filesystem
 *   (shared-filesystem, shared file system, shared file-system, plural, unshared filesystem, filesystem_root) or
 *   multi-host (multi host, multihost, plural, multi-hosted, multi-hosting, nonmulti-host). A matching sentence must
 *   say "unsupported" or "not safe", in any case, and may use the word "safe" (or "safely") only inside "not safe";
 *   "unsafe" is not the word.
 * - RENDERED LEG (what a reader sees; rendered-text truth, 9x5.17): marked 18.0.11 (GFM, the lexer test/helpers/census.ts
 *   and test/workbench-w10-stamped-claim-guard.test.ts use) lexes the page once. A unit is a paragraph, a heading, the
 *   text of a list item or block quote, a table cell, a code block or an HTML block. A unit renders its text, backslash
 *   escapes and code spans as written, and emphasis, strikethrough (struck text still shows), link text and image alt
 *   text flattened; a link destination or title is never read. An inline html token (an HTML comment or a tag) and a task
 *   checkbox render nothing; an HTML block renders its source with comments (an unclosed one to its end) and tags
 *   removed; soft wraps and hard breaks join into one line. Numeric character references and the named ones in
 *   NAMED_REFERENCES are decoded, never inside a code span or code block, which show them as written; any other named
 *   reference is refused, since the census cannot say what it renders. The FOLDED KEY then applies: NFKD (the
 *   compatibility mapping of NFKC, left decomposed so that a combining mark on a letter drops instead of composing into
 *   another letter), combining marks dropped, format code points (Cf: the zero-width characters, the soft hyphen, the
 *   byte-order mark) dropped, every white-space run one space, control code points (Cc) dropped, every dash (Pd) and the
 *   minus sign read as "-". The folded unit splits into sentences after a ".", "!" or "?" followed by white space.
 * - RAW LEG (additional strictness; the ed1be42 judge unchanged): every SOURCE line, hidden text included (an HTML
 *   comment, an HTML block, a fence, a link destination), splits into sentences the same way, so an unqualified family
 *   hidden from the reader still reds, a safety word hidden beside a qualifier still reds, and a qualifier must share
 *   its family's source line.
 * - LIVENESS: each family is named by at least one rendered docs sentence and by at least one source sentence.
 * - SECTION PIN (heading uniqueness 6hb.9, section bound cax.24, slice equality 6hb.7): docsSection(markdown,
 *   "Host boundary", 2, [the page's level-1 title]) from test/helpers/census.ts finds docs/13's unique level-2 heading of
 *   that name under its title and the section up to the next level-1/2 heading; sectionMatches pins the section's WHOLE
 *   rendered block list to HOST_BOUNDARY_BLOCKS (the WorkbenchHost sketch, the local/detached paragraph, the hosted-agent
 *   channel paragraph, the root paragraph) and refuses any HTML in it. Under the folded key exactly one heading of the
 *   page, at any depth, reads as "host boundary".
 * - ROOT SENTENCE: exactly one rendered sentence of docs/13 cites ADR-SCG-010; it sits in a top-level paragraph of section
 *   "Host boundary" (the nearest level-1/2 heading above it), names the RF workspace root and states single-host and
 *   local-coordinated scope. The raw leg keeps its own count: exactly one source sentence of docs/13 cites ADR-SCG-010
 *   and states the same clauses, so a hidden second citing sentence reds.
 * FALSIFIER FLOOR (U3): the gate battery of row 553 is carried as independently-authored edits of the committed docs,
 * each judged in memory over the whole docs tree by docsFindings and compared with the findings its row names. R1-R7
 * and the controls C1-C2 edit docs/13 at its root paragraph, located through the lexer (whose top-level raws tile each
 * page), and compare every finding but liveness, which another page may satisfy at any time; W1-W8, W15, W18, W19 and
 * the controls C3-C5 add a page and compare every finding, and so do X1-X4, the AC4 grep mutants of gate row 600. W9
 * and W10 are accepted rows naming residual F3 below. The H rows add shapes this header claims beyond the battery; the
 * N rows are compliant controls the census accepts; the L rows judge liveness alone, each leg over synthetic docs
 * trees, so no row depends on which committed page names a family. Every look-alike is built with String.fromCodePoint.
 * GREP FLOOR (row 600 U2): three rows hold the family rule to the AC4 grep as the acceptance writes it (AC4_GREP). Each
 * grep alternative set inside a word (GREP_FLOOR_BEFORE x GREP_FLOOR_AFTER, 168 sentences) is refused unqualified by
 * both legs; every synthetic sentence the grep matches is a family match and no NO_MATCH control is a grep match; and
 * every docs sentence the grep matches, raw or rendered, is a family match that says unsupported or not safe.
 * FROZEN SHAPE (standing rule 16, owner order 2026-10-18T18:14:19Z). One row pins the family table, the judge patterns
 * and every table as literals derived from them at this cut (the ed1be42 literals unchanged; the respin's reference
 * table, fold and HTML patterns, pinned blocks and battery tables appended), so deleting a family or a row, narrowing a
 * pattern or swapping a row for an unrelated passing case reds the census. The live docs are not frozen: any page may
 * add a sentence that complies.
 * RESIDUALS (named, not closed; the GREP FLOOR makes every AC4 grep match a family match, so none of these leaves an
 * AC4 grep match unjudged): letters NFKC leaves distinct (a Cyrillic or Greek look-alike of N, E, F or S) and sentence
 * ends NFKC does not fold to ".", "!" or "?"; a named reference written without its ";", and a numeric reference from
 * 0x80 to 0x9F, which browsers read as Windows-1252 but this census as a control code point; an HTML block's text is
 * read with its tags removed, not laid out; a qualifier that is negated or belongs to another clause of the sentence (W9,
 * W10, finding F3: a sentence-meaning judge is outside this AC); styling applied from outside the page; NFS or EFS inside
 * a longer word in lower or mixed case (pnfs, AmazonEfs: NO_MATCH quiet rows; the case-sensitive AC4 grep matches
 * neither); a sentence describing multi-host or shared-filesystem use without a family word (multiple hosts, shared
 * files: NO_MATCH quiet rows; F3 again).
 * Spawns nothing; writes nothing; reads docs/workbench.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, posix, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Token, type Tokens } from "marked";
import { describe, expect, it } from "vitest";
import { docsSection, type RenderedBlock, sectionMatches } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = "docs/workbench";
const ROOT_SENTENCE_FILE = `${DOCS}/13-contracts-and-config.md`;
const ADR = "ADR-SCG-010";

const FAMILIES: ReadonlyArray<readonly [string, RegExp]> = [
  ["NFS", /\b[Nn][Ff][Ss]|NFS/],
  ["EFS", /\b[Ee][Ff][Ss]|EFS/],
  ["shared filesystem", /shared[- ]?file[- ]?system/i],
  ["multi-host", /multi[- ]?host/i],
];
const FAMILY_NAMES = FAMILIES.map(([name]) => name);
const QUALIFIER = /\bunsupported\b|\bnot safe\b/i;
const SAFE_WORD = /\bsafe(?:ly)?\b/gi;
const NOT_SAFE = /\bnot safe\b/gi;
/** The AC4 grep exactly as the acceptance writes it: a case-sensitive substring match, which the family rule must cover. */
const AC4_GREP = /NFS|EFS|shared filesystem|multi-host/;
/** The text the grep-floor rows set before and after each AC4 grep alternative: word characters, a digit, nothing. */
const GREP_FLOOR_BEFORE: readonly string[] = ["", "p", "Amazon", "un", "x_", "9"];
const GREP_FLOOR_AFTER: readonly string[] = ["", "v4", "ed", "ing", "s", "_root", "d"];

type Problem = "unqualified" | "safety-claim";
interface Match {
  readonly file: string;
  readonly line: number;
  readonly sentence: string;
  readonly families: readonly string[];
  readonly problem: Problem | null;
}

/** The sentences of one source line: split after `.`, `!` or `?` followed by white space. */
function sentencesOf(line: string): string[] {
  return line.split(/(?<=[.!?])\s+/).filter(sentence => sentence.trim() !== "");
}

function linesOf(text: string): string[] {
  return text.split(/\r\n|\r|\n/);
}

/** The families a sentence names and what is wrong with it: null when it complies or names no family. */
function classify(sentence: string): { readonly families: string[]; readonly problem: Problem | null } {
  const families = FAMILIES.filter(([, pattern]) => pattern.test(sentence)).map(([name]) => name);
  if (families.length === 0) return { families, problem: null };
  const safeWords = sentence.match(SAFE_WORD)?.length ?? 0;
  const notSafe = sentence.match(NOT_SAFE)?.length ?? 0;
  const problem: Problem | null = !QUALIFIER.test(sentence) ? "unqualified" : safeWords > notSafe ? "safety-claim" : null;
  return { families, problem };
}

/** Every sentence of `text` naming a family, with what is wrong with it (null when it complies). */
function judge(file: string, text: string): Match[] {
  const matches: Match[] = [];
  linesOf(text).forEach((line, index) => {
    for (const sentence of sentencesOf(line)) {
      const { families, problem } = classify(sentence);
      if (families.length > 0) matches.push({ file, line: index + 1, sentence, families, problem });
    }
  });
  return matches;
}

/** The clauses the root sentence must state: no problems means it names the RF workspace root with single-host, local-coordinated scope. */
function clauseProblems(sentence: string): string[] {
  const problems: string[] = [];
  if (!/\bRF workspace root\b/.test(sentence)) problems.push("does not name the RF workspace root");
  if (!/\bsingle-host\b/i.test(sentence)) problems.push("does not state single-host scope");
  if (!/\blocal-coordinated\b/i.test(sentence)) problems.push("does not state local-coordinated scope");
  return problems;
}

/** What is wrong with the root sentence of `text`: no problems means exactly one ADR-SCG-010 sentence that states the scope. */
function rootSentenceProblems(text: string): string[] {
  const citing = linesOf(text).flatMap(sentencesOf).filter(sentence => sentence.includes(ADR));
  if (citing.length !== 1) return [`${citing.length} sentences cite ${ADR}`];
  const [sentence] = citing;
  return clauseProblems(sentence);
}

/** Every Markdown page under docs/workbench, as a repo-relative POSIX path. */
function docsPages(): string[] {
  return readdirSync(join(ROOT, DOCS), { recursive: true, encoding: "utf8" })
    .map(entry => `${DOCS}/${entry.split(sep).join(posix.sep)}`)
    .filter(path => path.endsWith(".md") && statSync(join(ROOT, path)).isFile())
    .sort();
}

const read = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const liveMatches = (): Match[] => docsPages().flatMap(path => judge(path, read(path)));
const problems = (matches: readonly Match[]): string[] => matches.filter(match => match.problem !== null).map(match => `${match.file}:${match.line} ${match.problem}: ${match.sentence}`);

describe("SCG-R5 AC4 (wb-973.5): docs/workbench never presents a shared-filesystem swarm workspace as safe", () => {
  it("SCG-R5: the census reads every Markdown page under docs/workbench, receipts included", () => {
    const pages = docsPages();
    const top = readdirSync(join(ROOT, DOCS)).filter(name => name.endsWith(".md")).map(name => `${DOCS}/${name}`);
    const receipts = readdirSync(join(ROOT, DOCS, "receipts")).filter(name => name.endsWith(".md")).map(name => `${DOCS}/receipts/${name}`);
    expect(pages).toEqual([...top, ...receipts].sort());
    expect(pages).toContain(ROOT_SENTENCE_FILE);
    expect(pages).toContain(`${DOCS}/07-native-integrations.md`);
    expect(receipts.length).toBeGreaterThan(0);
  });

  it("SCG-R5: every sentence naming NFS, EFS, a shared filesystem or multi-host use says unsupported or not safe, and claims no safety", () => {
    expect(problems(liveMatches())).toEqual([]);
  });

  it("SCG-R5: the census is live on the docs: each of the four families is named by at least one docs sentence", () => {
    const named = new Set(liveMatches().flatMap(match => match.families));
    expect(FAMILY_NAMES.filter(name => !named.has(name))).toEqual([]);
  });

  it("SCG-R5: docs/13 holds exactly one ADR-SCG-010 sentence, naming the RF workspace root with single-host, local-coordinated scope", () => {
    expect(rootSentenceProblems(read(ROOT_SENTENCE_FILE))).toEqual([]);
  });

  it("SCG-R5: the root sentence is itself a census match that complies", () => {
    const [sentence] = linesOf(read(ROOT_SENTENCE_FILE)).flatMap(sentencesOf).filter(candidate => candidate.includes(ADR));
    const matches = judge(ROOT_SENTENCE_FILE, sentence ?? "");
    expect(matches).toHaveLength(1);
    expect(matches[0]?.problem).toBeNull();
  });
});

/** Synthetic sentences each judge must refuse: [case, text, families it names, problem]. */
const REFUSED: ReadonlyArray<readonly [string, string, readonly string[], Problem]> = [
  ["NFS, unqualified", "Pi supports NFS swarm workspaces.", ["NFS"], "unqualified"],
  ["EFS, unqualified", "An EFS mount is fine for the swarm.", ["EFS"], "unqualified"],
  ["shared filesystem, unqualified", "A shared filesystem works across machines.", ["shared filesystem"], "unqualified"],
  ["multi-host, claimed supported", "Multi-host swarms are supported.", ["multi-host"], "unqualified"],
  ["lower-case nfs", "nfs mounts work for the swarm.", ["NFS"], "unqualified"],
  ["shared-filesystem spelling", "A shared-filesystem workspace works.", ["shared filesystem"], "unqualified"],
  ["shared file system spelling", "A shared file system works.", ["shared filesystem"], "unqualified"],
  ["multihost spelling", "Multihost swarms work.", ["multi-host"], "unqualified"],
  ["a safety claim beside the qualifier", "NFS is safe for multi-host use; clusters are unsupported.", ["NFS", "multi-host"], "safety-claim"],
  ["safely beside the qualifier", "EFS works safely here, though NFS is unsupported.", ["NFS", "EFS"], "safety-claim"],
  ["versioned NFSv4", "NFSv4 mounts work for the swarm.", ["NFS"], "unqualified"],
  ["lower-case efs", "efs mounts work for the swarm.", ["EFS"], "unqualified"],
  ["capitalised shared filesystem", "Shared filesystem workspaces work.", ["shared filesystem"], "unqualified"],
  ["plural shared filesystems", "The swarm runs on shared filesystems.", ["shared filesystem"], "unqualified"],
  ["shared file-system spelling", "A shared file-system works.", ["shared filesystem"], "unqualified"],
  ["multi host spelling", "Multi host swarms work.", ["multi-host"], "unqualified"],
  ["plural multi-hosts", "The swarm spans multi-hosts.", ["multi-host"], "unqualified"],
  ["a capitalised safety claim", "Safe on NFS, though multi-host use is unsupported.", ["NFS", "multi-host"], "safety-claim"],
];
/** Synthetic sentences that name a family and comply: [case, text]. */
const COMPLIANT: ReadonlyArray<readonly [string, string]> = [
  ["unsupported", "NFS is unsupported."],
  ["not safe", "An EFS workspace is not safe for the swarm."],
  ["both qualifiers", "Multi-host use of a shared filesystem is unsupported and not safe."],
  ["a capitalised Unsupported", "Unsupported: NFS swarm workspaces."],
  ["a capitalised Not safe", "Not safe: an EFS swarm workspace."],
  ["unsafe (not the word safe)", "An NFS workspace is unsafe and unsupported."],
];
/** Synthetic sentences that name no family: [case, text]. */
const NO_MATCH: ReadonlyArray<readonly [string, string]> = [
  ["refs", "Evidence refs are digests."],
  ["confs", "Both confs load first."],
  ["single-host", "The root has single-host scope."],
  ["host alone", "Each host binds its own root."],
  ["pnfs (residual: lower case inside a word)", "A pnfs layout stays on one host."],
  ["AmazonEfs (residual: mixed case inside a word)", "An AmazonEfs mount stays on one host."],
  ["multiple hosts (residual: no family word)", "Multiple hosts can share one swarm workspace."],
  ["shared files (residual: no family word)", "Shared files on one network mount serve every machine."],
];
const SENTENCE = "That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use is unsupported and not safe.";
/** Root-sentence texts the judge must refuse: [case, text, problems]. */
const ROOT_REFUSED: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["no citing sentence", "The RF workspace root has single-host, local-coordinated scope.", ["0 sentences cite ADR-SCG-010"]],
  ["two citing sentences", `${SENTENCE} ${SENTENCE}`, ["2 sentences cite ADR-SCG-010"]],
  ["the root unnamed", "It has single-host, local-coordinated scope (ADR-SCG-010).", ["does not name the RF workspace root"]],
  ["single-host missing", "The RF workspace root has local-coordinated scope (ADR-SCG-010).", ["does not state single-host scope"]],
  ["local-coordinated missing", "The RF workspace root has single-host scope (ADR-SCG-010).", ["does not state local-coordinated scope"]],
];

// ---------------------------------------------------------------------------------------------
// The rendered leg, the section pin and the whole-tree verdict (respin on gate row 553).
// ---------------------------------------------------------------------------------------------

const at = (code: number): string => String.fromCodePoint(code);
/** Where a battery row's new page goes: the gate's page wrapper (probePage) at a path the gate's own probe page never takes. */
const PROBE_FILE = `${DOCS}/zz-scg-r5-probe.md`;
const HOST_BOUNDARY = "Host boundary";
const DOCS13_TITLE = "13 — Low-level contracts, type sketches and configuration";
const SECTION_LABEL = `${ROOT_SENTENCE_FILE} section "${HOST_BOUNDARY}"`;
const ROOT_SENTENCE = "That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use of a swarm workspace on a shared filesystem (NFS or EFS) is unsupported and not safe.";

/** The named character references the rendered leg decodes; any other named reference is refused. */
const NAMED_REFERENCES: ReadonlyMap<string, string> = new Map([
  ["amp", "&"],
  ["lt", "<"],
  ["gt", ">"],
  ["quot", '"'],
  ["apos", "'"],
  ["nbsp", at(0xa0)],
  ["ensp", at(0x2002)],
  ["emsp", at(0x2003)],
  ["thinsp", at(0x2009)],
  ["hairsp", at(0x200a)],
  ["shy", at(0xad)],
  ["ZeroWidthSpace", at(0x200b)],
  ["zwnj", at(0x200c)],
  ["zwj", at(0x200d)],
  ["NoBreak", at(0x2060)],
  ["hyphen", at(0x2010)],
  ["dash", at(0x2010)],
  ["ndash", at(0x2013)],
  ["mdash", at(0x2014)],
  ["minus", at(0x2212)],
  ["period", "."],
  ["excl", "!"],
  ["quest", "?"],
  ["comma", ","],
  ["colon", ":"],
  ["semi", ";"],
]);
const REFERENCE = /&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g;
const MARKS = /\p{M}/gu;
/** The folded key's rewrites after NFKD and MARKS, in order (see the header). */
const FOLD: ReadonlyArray<readonly [RegExp, string]> = [
  [/\p{Cf}/gu, ""],
  [/\s+/gu, " "],
  [/\p{Cc}/gu, ""],
  [/[\p{Pd}\u{2212}]/gu, "-"],
  [/ {2,}/g, " "],
];
const HTML_COMMENT = /<!--[\s\S]*?(?:-->|$)/g;
const HTML_TAG = /<\/?[A-Za-z][A-Za-z0-9-]*(?:\s[^>]*)?\/?>/g;

/** `text` with every numeric reference and each NAMED_REFERENCES name decoded; any other named reference stays as written and is recorded in `unknown`. */
function decodeReferences(text: string, unknown: string[]): string {
  return text.replace(REFERENCE, (whole: string, decimal?: string, hex?: string, name?: string) => {
    const code = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    if (code !== undefined) return code <= 0x10ffff ? at(code) : whole;
    const value = NAMED_REFERENCES.get(name ?? "");
    if (value === undefined) unknown.push(whole);
    return value ?? whole;
  });
}

/** The FOLDED KEY of rendered text (see the header). */
function foldKey(text: string): string {
  const decomposed = text.normalize("NFKD").replace(MARKS, "");
  return FOLD.reduce((folded, [pattern, replacement]) => folded.replace(pattern, replacement), decomposed).trim();
}

const clean = (text: string): string => text.replace(/\s+/g, " ").trim();
const textOf = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
};
const childrenOf = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";

/** What a reader sees of inline tokens (see RENDERED LEG); a link destination or title is never read. */
function inlineText(tokens: readonly Token[], unknown: string[]): string {
  let out = "";
  for (const token of tokens) {
    if (token.type === "html" || token.type === "checkbox") continue;
    if (token.type === "br") out += " ";
    else if (token.type === "codespan" || token.type === "escape") out += textOf(token);
    else if (childrenOf(token).length > 0) out += inlineText(childrenOf(token), unknown);
    else out += decodeReferences(textOf(token), unknown);
  }
  return out;
}

/** The units a block token renders (see RENDERED LEG), in page order, before folding. */
function unitsOf(token: Token, unknown: string[]): string[] {
  if (token.type === "space" || token.type === "hr" || token.type === "def" || token.type === "checkbox") return [];
  if (token.type === "html") return [decodeReferences(token.raw.replace(HTML_COMMENT, "").replace(HTML_TAG, ""), unknown)];
  if (token.type === "code") return [textOf(token)];
  if (isTable(token)) return [...token.header, ...token.rows.flat()].map(cell => inlineText(cell.tokens, unknown));
  if (isList(token)) return token.items.flatMap(item => item.tokens.flatMap(child => unitsOf(child, unknown)));
  if (token.type === "blockquote") return childrenOf(token).flatMap(child => unitsOf(child, unknown));
  const children = childrenOf(token);
  return [children.length > 0 ? inlineText(children, unknown) : decodeReferences(textOf(token), unknown)];
}

/** Every heading the page renders, at any depth: a heading inside a list item or block quote still renders as one. */
function headingsIn(tokens: readonly Token[]): Tokens.Heading[] {
  const out: Tokens.Heading[] = [];
  for (const token of tokens) {
    if (isHeading(token)) out.push(token);
    if (isList(token)) out.push(...headingsIn(token.items.flatMap(item => item.tokens)));
    if (token.type === "blockquote") out.push(...headingsIn(childrenOf(token)));
  }
  return out;
}

const problemsOf = (sentences: readonly string[]): Array<readonly [Problem, string]> =>
  sentences.flatMap(sentence => {
    const { problem } = classify(sentence);
    return problem === null ? [] : [[problem, sentence] as const];
  });
const familiesOf = (sentences: readonly string[]): string[] => {
  const named = new Set(sentences.flatMap(sentence => classify(sentence).families));
  return FAMILY_NAMES.filter(name => named.has(name));
};

interface Cited {
  readonly sentence: string;
  readonly hostParagraph: boolean;
}
/** One page in both legs (see the header), computed once per distinct text. */
interface PageView {
  /** Every named character reference the rendered leg does not know, in page order. */
  readonly unknown: readonly string[];
  /** Every rendered sentence that names a family and breaks the rule, with its problem. */
  readonly renderedProblems: ReadonlyArray<readonly [Problem, string]>;
  /** Every source sentence that names a family and breaks the rule, with its problem. */
  readonly rawProblems: ReadonlyArray<readonly [Problem, string]>;
  /** The families some rendered sentence names, in FAMILIES order. */
  readonly renderedFamilies: readonly string[];
  /** The families some source sentence names, in FAMILIES order. */
  readonly rawFamilies: readonly string[];
  /** Every heading at any depth, under the folded key and lower-cased. */
  readonly headings: readonly string[];
  /** Every rendered sentence citing ADR-SCG-010, with whether it sits in a top-level paragraph of section "Host boundary". */
  readonly citing: readonly Cited[];
  /** Every rendered sentence of the page, folded, in page order. */
  readonly renderedSentences: readonly string[];
  /** Every source sentence of the page, in page order. */
  readonly rawSentences: readonly string[];
}

function lexPage(markdown: string): PageView {
  const tokens = marked.lexer(markdown);
  const unknown: string[] = [];
  const rendered: string[] = [];
  const citing: Cited[] = [];
  let inHost = false;
  for (const token of tokens) {
    // A section runs to the next level-1/2 heading, as docsSection bounds it.
    if (isHeading(token) && token.depth <= 2) inHost = token.depth === 2 && clean(inlineText(token.tokens, [])) === HOST_BOUNDARY;
    for (const unit of unitsOf(token, unknown)) {
      for (const sentence of sentencesOf(foldKey(unit))) {
        rendered.push(sentence);
        if (sentence.includes(ADR)) citing.push({ sentence, hostParagraph: inHost && token.type === "paragraph" });
      }
    }
  }
  const raw = linesOf(markdown).flatMap(sentencesOf);
  return {
    unknown,
    renderedProblems: problemsOf(rendered),
    rawProblems: problemsOf(raw),
    renderedFamilies: familiesOf(rendered),
    rawFamilies: familiesOf(raw),
    headings: headingsIn(tokens).map(heading => foldKey(inlineText(heading.tokens, [])).toLowerCase()),
    citing,
    renderedSentences: rendered,
    rawSentences: raw,
  };
}

const VIEWS = new Map<string, PageView>();
function pageView(markdown: string): PageView {
  const cached = VIEWS.get(markdown);
  if (cached !== undefined) return cached;
  const view = lexPage(markdown);
  VIEWS.set(markdown, view);
  return view;
}

/** One page's family-rule findings in both legs, named by its file. */
const pageFindings = (file: string, view: PageView): string[] => [
  ...view.unknown.map(reference => `${file} rendered refused: unknown character reference ${reference} (the census cannot say what it renders)`),
  ...view.renderedProblems.map(([problem, sentence]) => `${file} rendered ${problem}: ${sentence}`),
  ...view.rawProblems.map(([problem, sentence]) => `${file} raw ${problem}: ${sentence}`),
];

/** What is wrong with docs/13's rendered root sentence: no problems means exactly one rendered sentence cites ADR-SCG-010, in a top-level paragraph of section "Host boundary", stating every clause. */
function renderedRootProblems(view: PageView): string[] {
  if (view.citing.length !== 1) return [`${view.citing.length} rendered sentences of the page cite ${ADR}`];
  const [only] = view.citing;
  const placed = only.hostParagraph ? [] : [`the citing sentence is not in a paragraph of section "${HOST_BOUNDARY}"`];
  return [...placed, ...clauseProblems(only.sentence)];
}

/** The WHOLE rendered block list of docs/13 section "Host boundary", block by block (sectionMatches pins it). */
const HOST_BOUNDARY_BLOCKS: readonly RenderedBlock[] = [
  {
    kind: "code",
    text: [
      "interface WorkbenchHost {",
      "  executeWorkflow(request: InvocationIdentity & { input: Json }): Promise<HostLaunchReceipt>;",
      "  getSnapshot(ref: NativeRef): Promise<NativeSnapshot>;",
      "  observe(ref: NativeRef, cursor?: string): AsyncIterable<ObservationEnvelope>;",
      "  inspectCapability(id: string): Promise<CapabilityDescriptor>;",
      "  callCapability(req: NodeCall): Promise<NodeCallResult>;",
      "  requestControl(req: NativeControlRequest): Promise<NativeControlReceipt>;",
      "}",
    ].join("\n"),
  },
  {
    kind: "paragraph",
    text: "Local implementation may be in-process services; detached hosting needs explicit authenticated transport but should not require changes to MechanicalWorkflows direct-function usage.",
    markdown: "Local implementation may be in-process services; detached hosting needs explicit authenticated transport but should not require changes to MechanicalWorkflows direct-function usage.",
  },
  {
    kind: "paragraph",
    text: "A hosted agent learns the swarm's rf workspace from two environment variables, the documented channel for it: RF_WORKSPACE (rf's own workspace default) and SWARM_RF_WORKSPACE (what agent instructions pass as rf --workspace \"$SWARM_RF_WORKSPACE\"). Both hold a directory path, operational workspace locators rather than credentials, and both reach the Claude SDK child the same way on either host: the embedded host builds its SDK options with no env override, so the child inherits process.env; the detached host carries the two names on its launch allowlist (DETACHED_HOST_ENV_ALLOWLIST in src/workbench/process-env.ts). The channel adds no other variable.",
    markdown: "A hosted agent learns the swarm's rf workspace from two environment variables, the documented channel for it: `RF_WORKSPACE` (rf's own workspace default) and `SWARM_RF_WORKSPACE` (what agent instructions pass as `rf --workspace \"$SWARM_RF_WORKSPACE\"`). Both hold a directory path, operational workspace locators rather than credentials, and both reach the Claude SDK child the same way on either host: the embedded host builds its SDK options with no `env` override, so the child inherits `process.env`; the detached host carries the two names on its launch allowlist (`DETACHED_HOST_ENV_ALLOWLIST` in `src/workbench/process-env.ts`). The channel adds no other variable.",
  },
  {
    kind: "paragraph",
    text: "The RF workspace root Pi renders against is bound by the host: it registers the reactivefiber.render.preview capability with the real path of the project directory Pi runs in, every render passes that directory as --workspace, and an envelope whose workspace.root names another directory is refused. A capability input, a workflow script, a Claude tool argument or an environment variable never sets it: the input schema admits no path-shaped property, top-level tool arguments are stripped before dispatch, and Pi never derives --workspace from RF_WORKSPACE or SWARM_RF_WORKSPACE, which are for hosted agents. That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use of a swarm workspace on a shared filesystem (NFS or EFS) is unsupported and not safe.",
    markdown: "The RF workspace root Pi renders against is bound by the host: it registers the `reactivefiber.render.preview` capability with the real path of the project directory Pi runs in, every render passes that directory as `--workspace`, and an envelope whose `workspace.root` names another directory is refused. A capability input, a workflow script, a Claude tool argument or an environment variable never sets it: the input schema admits no path-shaped property, top-level tool arguments are stripped before dispatch, and Pi never derives `--workspace` from `RF_WORKSPACE` or `SWARM_RF_WORKSPACE`, which are for hosted agents. That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use of a swarm workspace on a shared filesystem (NFS or EFS) is unsupported and not safe.",
  },
];

type Section = ReturnType<typeof docsSection>;
const blockKey = (block: RenderedBlock): string => JSON.stringify(Object.entries(block).sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0)));

/** Why the section fails its pin, in sectionMatches's order: a refused section, HTML, the first differing block, the block count. */
function sectionDiagnosis(section: Section, why: string): string {
  if (!section.ok) return `the section is refused: ${section.why}`;
  if (section.hasHtml) return "the section carries HTML";
  const index = HOST_BOUNDARY_BLOCKS.findIndex((pinned, position) => {
    const actual = section.blocks[position];
    return actual !== undefined && blockKey(actual) !== blockKey(pinned);
  });
  const actual = section.blocks[index];
  const pinned = HOST_BOUNDARY_BLOCKS[index];
  if (index >= 0 && actual !== undefined && pinned !== undefined) return `block ${index + 1} differs (${actual.kind} vs pinned ${pinned.kind})`;
  if (section.blocks.length !== HOST_BOUNDARY_BLOCKS.length) return `the section has ${section.blocks.length} blocks; the census pins ${HOST_BOUNDARY_BLOCKS.length}`;
  return why;
}

/** docs/13's section pin, folded-heading uniqueness and root sentence in both legs (see the header). */
function hostBoundaryFindings(markdown: string): string[] {
  const findings: string[] = [];
  const section = docsSection(markdown, HOST_BOUNDARY, 2, [DOCS13_TITLE]);
  const verdict = sectionMatches(section, HOST_BOUNDARY_BLOCKS);
  if (!verdict.ok) findings.push(`${SECTION_LABEL}: ${sectionDiagnosis(section, verdict.why)}`);
  const view = pageView(markdown);
  const readAsHost = view.headings.filter(text => text === "host boundary").length;
  if (readAsHost !== 1) findings.push(`${SECTION_LABEL}: ${readAsHost} headings of the page read as "host boundary" under the folded key`);
  findings.push(...renderedRootProblems(view).map(problem => `${ROOT_SENTENCE_FILE} rendered root: ${problem}`));
  findings.push(...rootSentenceProblems(markdown).map(problem => `${ROOT_SENTENCE_FILE} raw root: ${problem}`));
  return findings;
}

/** A liveness finding of docsFindings, in either leg. */
const LIVENESS = /^(?:rendered|raw) liveness: /;

/** The whole-tree verdict: docs/13's section pin and root sentence, each page's findings in both legs, then each leg's liveness. */
function docsFindings(pages: ReadonlyMap<string, string>): string[] {
  const findings = hostBoundaryFindings(pages.get(ROOT_SENTENCE_FILE) ?? "");
  const rendered = new Set<string>();
  const raw = new Set<string>();
  for (const file of [...pages.keys()].sort()) {
    const view = pageView(pages.get(file) ?? "");
    findings.push(...pageFindings(file, view));
    for (const name of view.renderedFamilies) rendered.add(name);
    for (const name of view.rawFamilies) raw.add(name);
  }
  for (const name of FAMILY_NAMES) if (!rendered.has(name)) findings.push(`rendered liveness: no rendered docs sentence names ${name}`);
  for (const name of FAMILY_NAMES) if (!raw.has(name)) findings.push(`raw liveness: no source docs sentence names ${name}`);
  return findings;
}

let LIVE_PAGES: ReadonlyMap<string, string> | undefined;
/** A fresh copy of the committed docs tree (path to text), read once. */
function livePages(): Map<string, string> {
  LIVE_PAGES ??= new Map(docsPages().map(path => [path, read(path)] as const));
  return new Map(LIVE_PAGES);
}

/** An edit of docs/13, applied at its root paragraph (the one top-level paragraph whose source cites ADR-SCG-010). */
type DocEdit =
  | { readonly op: "replace"; readonly from: string; readonly to: string }
  | { readonly op: "wrap"; readonly before: string; readonly after: string }
  | { readonly op: "insert-before"; readonly text: string }
  | { readonly op: "move-under"; readonly heading: string }
  | { readonly op: "append"; readonly text: string };

/** The offsets of the top-level tokens of `markdown` matching `pick`, each without its trailing newlines; the token raws must tile the page. */
function topLevelSpans(markdown: string, pick: (token: Token) => boolean): Array<{ readonly start: number; readonly end: number }> {
  const tokens = marked.lexer(markdown);
  if (tokens.map(token => token.raw).join("") !== markdown) throw new Error("the top-level token raws do not tile the page");
  const spans: Array<{ readonly start: number; readonly end: number }> = [];
  let offset = 0;
  for (const token of tokens) {
    if (pick(token)) spans.push({ start: offset, end: offset + token.raw.replace(/\n+$/, "").length });
    offset += token.raw.length;
  }
  return spans;
}

/** `markdown` with `edit` applied; throws unless the root paragraph (and a moved-to heading) is found exactly once. */
function applyEdit(markdown: string, edit: DocEdit): string {
  if (edit.op === "append") return markdown + edit.text;
  const roots = topLevelSpans(markdown, token => token.type === "paragraph" && token.raw.includes(ADR));
  if (roots.length !== 1) throw new Error(`${roots.length} top-level paragraphs cite ${ADR}`);
  const [{ start, end }] = roots;
  const paragraph = markdown.slice(start, end);
  const around = (replacement: string): string => markdown.slice(0, start) + replacement + markdown.slice(end);
  if (edit.op === "replace") {
    const copies = paragraph.split(edit.from).length - 1;
    if (copies !== 1) throw new Error(`the root paragraph holds ${copies} copies of ${JSON.stringify(edit.from)}`);
    return around(paragraph.replace(edit.from, () => edit.to));
  }
  if (edit.op === "wrap") return around(edit.before + paragraph + edit.after);
  if (edit.op === "insert-before") return around(edit.text + paragraph);
  // move-under: the paragraph and the blank line before it leave; it returns after the heading behind a blank line.
  if (markdown.slice(start - 2, start) !== "\n\n") throw new Error("the root paragraph does not follow a blank line");
  const without = markdown.slice(0, start - 2) + markdown.slice(end);
  const headings = topLevelSpans(without, token => isHeading(token) && token.raw.replace(/\n+$/, "") === edit.heading);
  if (headings.length !== 1) throw new Error(`${headings.length} top-level headings read ${edit.heading}`);
  const [{ end: cut }] = headings;
  return `${without.slice(0, cut)}\n\n${paragraph}${without.slice(cut)}`;
}

const probePage = (page: string): string => `# 99 gate probe\n\n${page}\n`;
/** `text` with a newline as \n and every code point outside printable ASCII as \u{HEX}, so a frozen literal shows each look-alike. */
const visible = (text: string): string =>
  [...text]
    .map(char => {
      const code = char.codePointAt(0) ?? 0;
      if (char === "\n") return "\\n";
      return code >= 0x20 && code <= 0x7e ? char : `\\u{${code.toString(16).toUpperCase()}}`;
    })
    .join("");
function editLabel(edit: DocEdit): string {
  if (edit.op === "replace") return `replace ${visible(edit.from)} with ${visible(edit.to)}`;
  if (edit.op === "wrap") return `wrap in ${visible(edit.before)} ... ${visible(edit.after)}`;
  if (edit.op === "move-under") return `move under ${edit.heading}`;
  return `${edit.op} ${visible(edit.text)}`;
}

/** A docs/13 edit from the gate battery (or added by this census) and the whole-tree findings it must produce, in docsFindings order. */
interface DocRow {
  readonly id: string;
  readonly cls: string;
  readonly what: string;
  readonly edit: DocEdit;
  readonly findings: readonly string[];
}
/** A new page from the gate battery (or added by this census) and its findings, each named by the probe file. */
interface PageRow {
  readonly id: string;
  readonly cls: string;
  readonly what: string;
  readonly page: string;
  readonly findings: readonly string[];
}
/** A new page the census accepts, and the families its rendered sentences name. */
interface AcceptedRow {
  readonly id: string;
  readonly cls: string;
  readonly what: string;
  readonly page: string;
  readonly families: readonly string[];
}
/** A synthetic docs tree (one page per entry) and the liveness findings docsFindings names for it. */
interface LivenessRow {
  readonly id: string;
  readonly cls: string;
  readonly what: string;
  readonly pages: readonly string[];
  readonly findings: readonly string[];
}

const F13 = ROOT_SENTENCE_FILE;
const ROOT_FINE = "That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use of a swarm workspace on a shared filesystem (NFS or EFS) is fine.";
const SECTION_HTML = `${F13} section "Host boundary": the section carries HTML`;
const BLOCK_4_PARAGRAPH = `${F13} section "Host boundary": block 4 differs (paragraph vs pinned paragraph)`;
const NOT_IN_SECTION = `${F13} rendered root: the citing sentence is not in a paragraph of section "Host boundary"`;
const DOC_ROWS: readonly DocRow[] = [
  {
    id: "R1",
    cls: "rendered/comment",
    what: "the scope clause wrapped in an HTML comment",
    edit: { op: "replace", from: "has single-host, local-coordinated scope", to: "has <!-- single-host, local-coordinated --> scope" },
    findings: [SECTION_HTML, `${F13} rendered root: does not state single-host scope`, `${F13} rendered root: does not state local-coordinated scope`],
  },
  {
    id: "R2",
    cls: "rendered/comment",
    what: "the qualifier wrapped in an HTML comment",
    edit: { op: "replace", from: "is unsupported and not safe.", to: "is <!-- unsupported and not safe --> fine." },
    findings: [SECTION_HTML, `${F13} rendered unqualified: ${ROOT_FINE}`],
  },
  {
    id: "R3",
    cls: "rendered/comment",
    what: "the whole root paragraph inside an HTML comment block",
    edit: { op: "wrap", before: "<!--\n", after: "\n-->" },
    findings: [SECTION_HTML, `${F13} rendered root: 0 rendered sentences of the page cite ADR-SCG-010`],
  },
  {
    id: "R7",
    cls: "rendered/fence",
    what: "the whole root paragraph inside a fenced code block",
    edit: { op: "wrap", before: "```\n", after: "\n```" },
    findings: [`${F13} section "Host boundary": block 4 differs (code vs pinned paragraph)`, NOT_IN_SECTION],
  },
  {
    id: "R4",
    cls: "section/D1",
    what: "the root paragraph moved under the Representative config heading",
    edit: { op: "move-under", heading: "## Representative config (proposed, not installed)" },
    findings: [`${F13} section "Host boundary": the section has 3 blocks; the census pins 4`, NOT_IN_SECTION],
  },
  {
    id: "R5",
    cls: "section/D3",
    what: "the root paragraph kept under an inserted withdrawn-guidance subsection",
    edit: { op: "insert-before", text: "### Withdrawn guidance (kept for history)\n\n" },
    findings: [`${F13} section "Host boundary": block 4 differs (heading vs pinned paragraph)`],
  },
  {
    id: "R6",
    cls: "section/includes",
    what: "an in-sentence scope weakening that keeps every token",
    edit: {
      op: "replace",
      from: ROOT_SENTENCE,
      to: "That RF workspace root had single-host, local-coordinated scope (ADR-SCG-010) before 0.20: multi-host use of a swarm workspace on a shared filesystem (NFS or EFS) is unsupported and not safe only on those releases.",
    },
    findings: [BLOCK_4_PARAGRAPH],
  },
  {
    id: "C1",
    cls: "control",
    what: "the qualifier deleted visibly",
    edit: { op: "replace", from: "is unsupported and not safe.", to: "is fine." },
    findings: [BLOCK_4_PARAGRAPH, `${F13} rendered unqualified: ${ROOT_FINE}`, `${F13} raw unqualified: ${ROOT_FINE}`],
  },
  {
    id: "C2",
    cls: "control",
    what: "the ADR citation deleted visibly",
    edit: { op: "replace", from: " (ADR-SCG-010)", to: "" },
    findings: [BLOCK_4_PARAGRAPH, `${F13} rendered root: 0 rendered sentences of the page cite ADR-SCG-010`, `${F13} raw root: 0 sentences cite ADR-SCG-010`],
  },
  {
    id: "H16",
    cls: "section/uniqueness",
    what: "a second heading reading as host boundary appended to the page",
    edit: { op: "append", text: "\n## Host Boundary\n" },
    findings: [`${F13} section "Host boundary": 2 headings of the page read as "host boundary" under the folded key`],
  },
  {
    id: "H17",
    cls: "raw/comment",
    what: "a hidden second citing sentence above the root paragraph",
    edit: { op: "insert-before", text: "<!-- That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010). -->\n\n" },
    findings: [SECTION_HTML, `${F13} raw root: 2 sentences cite ADR-SCG-010`],
  },
];

const PLAIN = "Multi-host NFS swarm workspaces work.";
const MULTI_HOST_WORKS = "rendered unqualified: A multi-host swarm workspace works.";
const SHARED_FS_WORKS = "rendered unqualified: A shared filesystem workspace works across machines.";
const NFS_MOUNTS_WORK = "rendered unqualified: NFS mounts work for the swarm.";
const PAGE_ROWS: readonly PageRow[] = [
  {
    id: "W1",
    cls: "rendered/comment",
    what: "the qualifier only inside an HTML comment",
    page: "Multi-host swarm workspaces on NFS work <!-- unsupported --> well for teams.",
    findings: ["rendered unqualified: Multi-host swarm workspaces on NFS work well for teams."],
  },
  {
    id: "W15",
    cls: "rendered/link-destination",
    what: "the qualifier only in a link destination",
    page: "[Multi-host NFS swarm workspaces work](https://example.invalid/unsupported) for teams.",
    findings: ["rendered unqualified: Multi-host NFS swarm workspaces work for teams."],
  },
  { id: "W2", cls: "rendered/emphasis-split", what: "the family phrase split by emphasis", page: "A shared *file*system workspace works across machines.", findings: [SHARED_FS_WORKS] },
  { id: "W3", cls: "rendered/link-split", what: "the family phrase split by a link", page: "A shared [filesystem](https://example.invalid/fs) workspace works across machines.", findings: [SHARED_FS_WORKS] },
  { id: "W4", cls: "rendered/char-reference", what: "the family word through a numeric character reference", page: "A multi&#45;host swarm workspace works.", findings: [MULTI_HOST_WORKS] },
  { id: "W18", cls: "rendered/inline-html", what: "the family word split by an inline HTML tag", page: "A multi-<span>host</span> swarm workspace works.", findings: [MULTI_HOST_WORKS] },
  { id: "W19", cls: "rendered/backslash-escape", what: "the family word with a backslash-escaped hyphen", page: "A multi\\-host swarm workspace works.", findings: [MULTI_HOST_WORKS] },
  {
    id: "W7",
    cls: "rendered/soft-wrap",
    what: "the family phrase soft-wrapped across two source lines",
    page: "Running one swarm workspace from two machines on a shared\nfilesystem works fine.",
    findings: ["rendered unqualified: Running one swarm workspace from two machines on a shared filesystem works fine."],
  },
  { id: "W5", cls: "spelling/nbsp", what: "a no-break space inside the family phrase", page: `A shared${at(0xa0)}filesystem workspace works across machines.`, findings: [SHARED_FS_WORKS] },
  { id: "W8", cls: "spelling/nb-hyphen", what: "a non-breaking hyphen inside the family word", page: `A multi${at(0x2011)}host swarm workspace works.`, findings: [MULTI_HOST_WORKS] },
  { id: "W6", cls: "spelling/zero-width", what: "a zero-width space inside the family word", page: `N${at(0x200b)}FS mounts work for the swarm.`, findings: [NFS_MOUNTS_WORK] },
  { id: "C3", cls: "control", what: "a plain unqualified sentence", page: PLAIN, findings: [`rendered unqualified: ${PLAIN}`, `raw unqualified: ${PLAIN}`] },
  { id: "C4", cls: "control", what: "an unqualified family inside a table", page: "| Backend | Use |\n|---|---|\n| NFS | works |", findings: ["rendered unqualified: NFS", "raw unqualified: | NFS | works |"] },
  { id: "C5", cls: "control", what: "an unqualified family in a heading", page: "## NFS swarm workspaces", findings: ["rendered unqualified: NFS swarm workspaces", "raw unqualified: ## NFS swarm workspaces"] },
  { id: "H1", cls: "rendered/named-reference", what: "the family word through a named hyphen reference", page: "A multi&hyphen;host swarm workspace works.", findings: [MULTI_HOST_WORKS] },
  {
    id: "H2",
    cls: "rendered/unknown-reference",
    what: "a named reference the census does not know inside the family word",
    page: "A multi&zz;host swarm workspace works.",
    findings: ["rendered refused: unknown character reference &zz; (the census cannot say what it renders)"],
  },
  { id: "H3", cls: "spelling/soft-hyphen", what: "a soft hyphen inside the family word", page: `A multi${at(0xad)}host swarm workspace works.`, findings: ["rendered unqualified: A multihost swarm workspace works."] },
  { id: "H4", cls: "rendered/named-reference", what: "the family word through a named minus-sign reference", page: "A multi&minus;host swarm workspace works.", findings: [MULTI_HOST_WORKS] },
  { id: "H5", cls: "spelling/fullwidth", what: "fullwidth letters spelling the family word", page: `${at(0xff2e)}${at(0xff26)}${at(0xff33)} mounts work for the swarm.`, findings: [NFS_MOUNTS_WORK] },
  { id: "H6", cls: "spelling/combining-mark", what: "a combining mark on a letter of the family word", page: `N${at(0x301)}FS mounts work for the swarm.`, findings: [NFS_MOUNTS_WORK] },
  { id: "H7", cls: "rendered/strikethrough", what: "a struck-through unqualified sentence, which still shows", page: `~~${PLAIN}~~`, findings: [`rendered unqualified: ${PLAIN}`, `raw unqualified: ~~${PLAIN}~~`] },
  { id: "H8", cls: "rendered/list-item", what: "an unqualified list item", page: `- ${PLAIN}`, findings: [`rendered unqualified: ${PLAIN}`, `raw unqualified: - ${PLAIN}`] },
  { id: "H9", cls: "rendered/block-quote", what: "an unqualified block quote", page: `> ${PLAIN}`, findings: [`rendered unqualified: ${PLAIN}`, `raw unqualified: > ${PLAIN}`] },
  { id: "H10", cls: "rendered/html-block", what: "an unqualified sentence inside an HTML block", page: `<div>\n${PLAIN}\n</div>`, findings: [`rendered unqualified: ${PLAIN}`, `raw unqualified: ${PLAIN}`] },
  { id: "H11", cls: "rendered/image-alt", what: "an unqualified image alt text", page: `![${PLAIN}](x.png)`, findings: [`rendered unqualified: ${PLAIN}`, `raw unqualified: ![${PLAIN}](x.png)`] },
  { id: "H12", cls: "raw/comment", what: "a safety word hidden in an HTML comment", page: "NFS is unsupported<!-- and safe -->.", findings: ["raw safety-claim: NFS is unsupported<!-- and safe -->."] },
  { id: "H13", cls: "raw/wrap", what: "a qualifier only on the next source line of a wrapped sentence", page: "A shared filesystem swarm workspace\nis unsupported.", findings: ["raw unqualified: A shared filesystem swarm workspace"] },
  {
    id: "H14",
    cls: "rendered/emphasis",
    what: "an emphasized safety word beside the qualifier",
    page: "NFS is *safe* for teams, though multi-host use is unsupported.",
    findings: ["rendered safety-claim: NFS is safe for teams, though multi-host use is unsupported.", "raw safety-claim: NFS is *safe* for teams, though multi-host use is unsupported."],
  },
  { id: "H15", cls: "raw/char-reference", what: "the qualifier spelled through a numeric character reference", page: "NFS is &#117;nsupported.", findings: ["raw unqualified: NFS is &#117;nsupported."] },
  {
    id: "X1",
    cls: "grep/derived-word",
    what: "a derived multi-host word (multi-hosted: the AC4 grep matches it)",
    page: "A multi-hosted swarm workspace on one mount works fine.",
    findings: ["rendered unqualified: A multi-hosted swarm workspace on one mount works fine.", "raw unqualified: A multi-hosted swarm workspace on one mount works fine."],
  },
  {
    id: "X2",
    cls: "grep/derived-word",
    what: "a derived multi-host word (multi-hosting: the AC4 grep matches it)",
    page: "Swarm workspaces support multi-hosting across machines.",
    findings: ["rendered unqualified: Swarm workspaces support multi-hosting across machines.", "raw unqualified: Swarm workspaces support multi-hosting across machines."],
  },
  {
    id: "X3",
    cls: "grep/inside-word",
    what: "NFS in capitals inside a word (pNFS: the AC4 grep matches it)",
    page: "A pNFS swarm workspace works across machines.",
    findings: ["rendered unqualified: A pNFS swarm workspace works across machines.", "raw unqualified: A pNFS swarm workspace works across machines."],
  },
  {
    id: "X4",
    cls: "grep/inside-word",
    what: "EFS in capitals inside a word (AmazonEFS: the AC4 grep matches it)",
    page: "An AmazonEFS swarm workspace works across machines.",
    findings: ["rendered unqualified: An AmazonEFS swarm workspace works across machines.", "raw unqualified: An AmazonEFS swarm workspace works across machines."],
  },
  {
    id: "H18",
    cls: "grep/inside-word",
    what: "shared filesystem after a word character (unshared filesystem: the AC4 grep matches it)",
    page: "An unshared filesystem works across machines.",
    findings: ["rendered unqualified: An unshared filesystem works across machines.", "raw unqualified: An unshared filesystem works across machines."],
  },
  {
    id: "H19",
    cls: "grep/derived-word",
    what: "a word character after shared filesystem (filesystem_root: the AC4 grep matches it)",
    page: "A shared filesystem_root works across machines.",
    findings: ["rendered unqualified: A shared filesystem_root works across machines.", "raw unqualified: A shared filesystem_root works across machines."],
  },
  {
    id: "H20",
    cls: "grep/inside-word",
    what: "multi-host after a word character (nonmulti-host: the AC4 grep matches it)",
    page: "A nonmulti-host swarm workspace works.",
    findings: ["rendered unqualified: A nonmulti-host swarm workspace works.", "raw unqualified: A nonmulti-host swarm workspace works."],
  },
];

const ACCEPTED_ROWS: readonly AcceptedRow[] = [
  { id: "W9", cls: "residual/F3 clause", what: "a qualifier attached to another clause of the same sentence", page: "NFS swarm workspaces work across hosts, and local disks are unsupported.", families: ["NFS"] },
  { id: "W10", cls: "residual/F3 negation", what: "a negated qualifier", page: "Multi-host NFS swarm workspaces are no longer unsupported.", families: ["NFS", "multi-host"] },
  { id: "N1", cls: "control", what: "a family and its qualifier under emphasis", page: "Multi-host use of a *shared filesystem* is **unsupported**.", families: ["shared filesystem", "multi-host"] },
  { id: "N2", cls: "control", what: "a qualified sentence as link text", page: "[NFS is unsupported](https://example.invalid/x).", families: ["NFS"] },
  { id: "N3", cls: "control", what: "an HTML comment beside a qualified sentence", page: "NFS <!-- a note --> is unsupported.", families: ["NFS"] },
  { id: "N4", cls: "control", what: "a qualified table cell", page: "| Backend | Use |\n|---|---|\n| NFS (unsupported) | none |", families: ["NFS"] },
  { id: "N5", cls: "control", what: "a qualified heading", page: "## NFS is unsupported", families: ["NFS"] },
];

const LIVENESS_ROWS: readonly LivenessRow[] = [
  {
    id: "L1",
    cls: "liveness/none",
    what: "no page naming a family",
    pages: ["Local disks only."],
    findings: [
      "rendered liveness: no rendered docs sentence names NFS",
      "rendered liveness: no rendered docs sentence names EFS",
      "rendered liveness: no rendered docs sentence names shared filesystem",
      "rendered liveness: no rendered docs sentence names multi-host",
      "raw liveness: no source docs sentence names NFS",
      "raw liveness: no source docs sentence names EFS",
      "raw liveness: no source docs sentence names shared filesystem",
      "raw liveness: no source docs sentence names multi-host",
    ],
  },
  {
    id: "L2",
    cls: "liveness/rendered",
    what: "the families named only inside an HTML comment",
    pages: ["<!-- Multi-host use of a shared filesystem (NFS or EFS) is unsupported. -->"],
    findings: [
      "rendered liveness: no rendered docs sentence names NFS",
      "rendered liveness: no rendered docs sentence names EFS",
      "rendered liveness: no rendered docs sentence names shared filesystem",
      "rendered liveness: no rendered docs sentence names multi-host",
    ],
  },
  {
    id: "L3",
    cls: "liveness/raw",
    what: "the families spelled only through numeric character references",
    pages: ["Multi&#45;host use of a shared&#32;filesystem (N&#70;S or E&#70;S) is unsupported."],
    findings: [
      "raw liveness: no source docs sentence names NFS",
      "raw liveness: no source docs sentence names EFS",
      "raw liveness: no source docs sentence names shared filesystem",
      "raw liveness: no source docs sentence names multi-host",
    ],
  },
  {
    id: "L4",
    cls: "liveness/each",
    what: "one family left unnamed",
    pages: ["NFS and EFS mounts are unsupported for multi-host use."],
    findings: ["rendered liveness: no rendered docs sentence names shared filesystem", "raw liveness: no source docs sentence names shared filesystem"],
  },
  {
    id: "L5",
    cls: "control",
    what: "the four families named across two pages",
    pages: ["NFS and EFS are unsupported.", "Multi-host use of a shared filesystem is unsupported."],
    findings: [],
  },
];

/** A synthetic docs tree: each page in the probe page wrapper, at a path no committed page takes. */
const livenessTree = (pages: readonly string[]): Map<string, string> =>
  new Map(pages.map((page, index) => [`${DOCS}/zz-scg-r5-liveness-${index + 1}.md`, probePage(page)] as const));

describe("SCG-R5 AC4 falsifiers: the judges over synthetic text", () => {
  it.each(REFUSED)("SCG-R5 falsifier: %s is refused", (_case, text, families, problem) => {
    expect(judge("synthetic.md", text)).toEqual([{ file: "synthetic.md", line: 1, sentence: text, families, problem }]);
  });

  it("SCG-R5 falsifier: a qualifier in the next sentence on the same line does not cover the first", () => {
    expect(judge("synthetic.md", "NFS works. Local disks are unsupported.").map(match => [match.sentence, match.problem])).toEqual([["NFS works.", "unqualified"]]);
  });

  it("SCG-R5 falsifier: a qualifier on the next source line does not cover a wrapped sentence", () => {
    expect(judge("synthetic.md", "A shared filesystem swarm workspace\nis unsupported.").map(match => [match.line, match.problem])).toEqual([[1, "unqualified"]]);
  });

  it("SCG-R5 falsifier: hidden source text is judged too", () => {
    expect(problems(judge("synthetic.md", "Text.\n<!-- NFS works for the swarm. -->\n"))).toEqual(["synthetic.md:2 unqualified: <!-- NFS works for the swarm."]);
  });

  it.each(COMPLIANT)("SCG-R5 control: a sentence saying %s complies", (_case, text) => {
    const matches = judge("synthetic.md", text);
    expect(matches).toHaveLength(1);
    expect(matches[0]?.problem).toBeNull();
  });

  it.each(NO_MATCH)("SCG-R5 control: %s is no match", (_case, text) => {
    expect(judge("synthetic.md", text)).toEqual([]);
  });

  it("SCG-R5 control: a root sentence stating every clause has no problem", () => {
    expect(rootSentenceProblems(`# 13\n\n${SENTENCE}\n`)).toEqual([]);
  });

  it.each(ROOT_REFUSED)("SCG-R5 falsifier: a root sentence with %s is refused", (_case, text, expected) => {
    expect(rootSentenceProblems(text)).toEqual(expected);
  });

  it("SCG-R5 frozen shape (rule 16): the family table, the judge patterns and every synthetic table keep their rows", () => {
    expect(FAMILIES.map(([name, pattern]) => `${name} ${String(pattern)}`)).toEqual([
      "NFS /\\b[Nn][Ff][Ss]|NFS/",
      "EFS /\\b[Ee][Ff][Ss]|EFS/",
      "shared filesystem /shared[- ]?file[- ]?system/i",
      "multi-host /multi[- ]?host/i",
    ]);
    expect([QUALIFIER, SAFE_WORD, NOT_SAFE].map(pattern => String(pattern))).toEqual([
      "/\\bunsupported\\b|\\bnot safe\\b/i",
      "/\\bsafe(?:ly)?\\b/gi",
      "/\\bnot safe\\b/gi",
    ]);
    expect(REFUSED.map(([name, text, families, problem]) => `${name} | ${text} | ${families.join(" + ")} | ${problem}`)).toEqual([
      "NFS, unqualified | Pi supports NFS swarm workspaces. | NFS | unqualified",
      "EFS, unqualified | An EFS mount is fine for the swarm. | EFS | unqualified",
      "shared filesystem, unqualified | A shared filesystem works across machines. | shared filesystem | unqualified",
      "multi-host, claimed supported | Multi-host swarms are supported. | multi-host | unqualified",
      "lower-case nfs | nfs mounts work for the swarm. | NFS | unqualified",
      "shared-filesystem spelling | A shared-filesystem workspace works. | shared filesystem | unqualified",
      "shared file system spelling | A shared file system works. | shared filesystem | unqualified",
      "multihost spelling | Multihost swarms work. | multi-host | unqualified",
      "a safety claim beside the qualifier | NFS is safe for multi-host use; clusters are unsupported. | NFS + multi-host | safety-claim",
      "safely beside the qualifier | EFS works safely here, though NFS is unsupported. | NFS + EFS | safety-claim",
      "versioned NFSv4 | NFSv4 mounts work for the swarm. | NFS | unqualified",
      "lower-case efs | efs mounts work for the swarm. | EFS | unqualified",
      "capitalised shared filesystem | Shared filesystem workspaces work. | shared filesystem | unqualified",
      "plural shared filesystems | The swarm runs on shared filesystems. | shared filesystem | unqualified",
      "shared file-system spelling | A shared file-system works. | shared filesystem | unqualified",
      "multi host spelling | Multi host swarms work. | multi-host | unqualified",
      "plural multi-hosts | The swarm spans multi-hosts. | multi-host | unqualified",
      "a capitalised safety claim | Safe on NFS, though multi-host use is unsupported. | NFS + multi-host | safety-claim",
    ]);
    expect(COMPLIANT.map(([name, text]) => `${name} | ${text}`)).toEqual([
      "unsupported | NFS is unsupported.",
      "not safe | An EFS workspace is not safe for the swarm.",
      "both qualifiers | Multi-host use of a shared filesystem is unsupported and not safe.",
      "a capitalised Unsupported | Unsupported: NFS swarm workspaces.",
      "a capitalised Not safe | Not safe: an EFS swarm workspace.",
      "unsafe (not the word safe) | An NFS workspace is unsafe and unsupported.",
    ]);
    expect(NO_MATCH.map(([name, text]) => `${name} | ${text}`)).toEqual([
      "refs | Evidence refs are digests.",
      "confs | Both confs load first.",
      "single-host | The root has single-host scope.",
      "host alone | Each host binds its own root.",
      "pnfs (residual: lower case inside a word) | A pnfs layout stays on one host.",
      "AmazonEfs (residual: mixed case inside a word) | An AmazonEfs mount stays on one host.",
      "multiple hosts (residual: no family word) | Multiple hosts can share one swarm workspace.",
      "shared files (residual: no family word) | Shared files on one network mount serve every machine.",
    ]);
    expect(ROOT_REFUSED.map(([name, text, expected]) => `${name} | ${text} | ${expected.join(" + ")}`)).toEqual([
      "no citing sentence | The RF workspace root has single-host, local-coordinated scope. | 0 sentences cite ADR-SCG-010",
      "two citing sentences | That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use is unsupported and not safe. That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use is unsupported and not safe. | 2 sentences cite ADR-SCG-010",
      "the root unnamed | It has single-host, local-coordinated scope (ADR-SCG-010). | does not name the RF workspace root",
      "single-host missing | The RF workspace root has local-coordinated scope (ADR-SCG-010). | does not state single-host scope",
      "local-coordinated missing | The RF workspace root has single-host scope (ADR-SCG-010). | does not state local-coordinated scope",
    ]);
    expect([...NAMED_REFERENCES].map(([name, value]) => `${name} ${visible(value)}`)).toEqual([
      "amp &",
      "lt <",
      "gt >",
      "quot \"",
      "apos '",
      "nbsp \\u{A0}",
      "ensp \\u{2002}",
      "emsp \\u{2003}",
      "thinsp \\u{2009}",
      "hairsp \\u{200A}",
      "shy \\u{AD}",
      "ZeroWidthSpace \\u{200B}",
      "zwnj \\u{200C}",
      "zwj \\u{200D}",
      "NoBreak \\u{2060}",
      "hyphen \\u{2010}",
      "dash \\u{2010}",
      "ndash \\u{2013}",
      "mdash \\u{2014}",
      "minus \\u{2212}",
      "period .",
      "excl !",
      "quest ?",
      "comma ,",
      "colon :",
      "semi ;",
    ]);
    expect([REFERENCE, MARKS, ...FOLD.map(([pattern]) => pattern), HTML_COMMENT, HTML_TAG, LIVENESS].map(pattern => String(pattern))).toEqual([
      "/&(?:#(\\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g",
      "/\\p{M}/gu",
      "/\\p{Cf}/gu",
      "/\\s+/gu",
      "/\\p{Cc}/gu",
      "/[\\p{Pd}\\u{2212}]/gu",
      "/ {2,}/g",
      "/<!--[\\s\\S]*?(?:-->|$)/g",
      "/<\\/?[A-Za-z][A-Za-z0-9-]*(?:\\s[^>]*)?\\/?>/g",
      "/^(?:rendered|raw) liveness: /",
    ]);
    expect(FOLD.map(([pattern, replacement]) => `${String(pattern)} -> ${JSON.stringify(replacement)}`)).toEqual([
      "/\\p{Cf}/gu -> \"\"",
      "/\\s+/gu -> \" \"",
      "/\\p{Cc}/gu -> \"\"",
      "/[\\p{Pd}\\u{2212}]/gu -> \"-\"",
      "/ {2,}/g -> \" \"",
    ]);
    expect(HOST_BOUNDARY_BLOCKS.map(block => `${block.kind} ${JSON.stringify(block).length}`)).toEqual([
      "code 487",
      "paragraph 406",
      "paragraph 1374",
      "paragraph 1636",
    ]);
    expect([PROBE_FILE, HOST_BOUNDARY, DOCS13_TITLE, SECTION_LABEL, ROOT_SENTENCE].map(visible)).toEqual([
      "docs/workbench/zz-scg-r5-probe.md",
      "Host boundary",
      "13 \\u{2014} Low-level contracts, type sketches and configuration",
      "docs/workbench/13-contracts-and-config.md section \"Host boundary\"",
      "That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use of a swarm workspace on a shared filesystem (NFS or EFS) is unsupported and not safe.",
    ]);
    expect(DOC_ROWS.map(row => `${row.id} | ${row.cls} | ${row.what} | ${editLabel(row.edit)} | ${row.findings.map(visible).join(" + ")}`)).toEqual([
      "R1 | rendered/comment | the scope clause wrapped in an HTML comment | replace has single-host, local-coordinated scope with has <!-- single-host, local-coordinated --> scope | docs/workbench/13-contracts-and-config.md section \"Host boundary\": the section carries HTML + docs/workbench/13-contracts-and-config.md rendered root: does not state single-host scope + docs/workbench/13-contracts-and-config.md rendered root: does not state local-coordinated scope",
      "R2 | rendered/comment | the qualifier wrapped in an HTML comment | replace is unsupported and not safe. with is <!-- unsupported and not safe --> fine. | docs/workbench/13-contracts-and-config.md section \"Host boundary\": the section carries HTML + docs/workbench/13-contracts-and-config.md rendered unqualified: That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use of a swarm workspace on a shared filesystem (NFS or EFS) is fine.",
      "R3 | rendered/comment | the whole root paragraph inside an HTML comment block | wrap in <!--\\n ... \\n--> | docs/workbench/13-contracts-and-config.md section \"Host boundary\": the section carries HTML + docs/workbench/13-contracts-and-config.md rendered root: 0 rendered sentences of the page cite ADR-SCG-010",
      "R7 | rendered/fence | the whole root paragraph inside a fenced code block | wrap in ```\\n ... \\n``` | docs/workbench/13-contracts-and-config.md section \"Host boundary\": block 4 differs (code vs pinned paragraph) + docs/workbench/13-contracts-and-config.md rendered root: the citing sentence is not in a paragraph of section \"Host boundary\"",
      "R4 | section/D1 | the root paragraph moved under the Representative config heading | move under ## Representative config (proposed, not installed) | docs/workbench/13-contracts-and-config.md section \"Host boundary\": the section has 3 blocks; the census pins 4 + docs/workbench/13-contracts-and-config.md rendered root: the citing sentence is not in a paragraph of section \"Host boundary\"",
      "R5 | section/D3 | the root paragraph kept under an inserted withdrawn-guidance subsection | insert-before ### Withdrawn guidance (kept for history)\\n\\n | docs/workbench/13-contracts-and-config.md section \"Host boundary\": block 4 differs (heading vs pinned paragraph)",
      "R6 | section/includes | an in-sentence scope weakening that keeps every token | replace That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use of a swarm workspace on a shared filesystem (NFS or EFS) is unsupported and not safe. with That RF workspace root had single-host, local-coordinated scope (ADR-SCG-010) before 0.20: multi-host use of a swarm workspace on a shared filesystem (NFS or EFS) is unsupported and not safe only on those releases. | docs/workbench/13-contracts-and-config.md section \"Host boundary\": block 4 differs (paragraph vs pinned paragraph)",
      "C1 | control | the qualifier deleted visibly | replace is unsupported and not safe. with is fine. | docs/workbench/13-contracts-and-config.md section \"Host boundary\": block 4 differs (paragraph vs pinned paragraph) + docs/workbench/13-contracts-and-config.md rendered unqualified: That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use of a swarm workspace on a shared filesystem (NFS or EFS) is fine. + docs/workbench/13-contracts-and-config.md raw unqualified: That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use of a swarm workspace on a shared filesystem (NFS or EFS) is fine.",
      "C2 | control | the ADR citation deleted visibly | replace  (ADR-SCG-010) with  | docs/workbench/13-contracts-and-config.md section \"Host boundary\": block 4 differs (paragraph vs pinned paragraph) + docs/workbench/13-contracts-and-config.md rendered root: 0 rendered sentences of the page cite ADR-SCG-010 + docs/workbench/13-contracts-and-config.md raw root: 0 sentences cite ADR-SCG-010",
      "H16 | section/uniqueness | a second heading reading as host boundary appended to the page | append \\n## Host Boundary\\n | docs/workbench/13-contracts-and-config.md section \"Host boundary\": 2 headings of the page read as \"host boundary\" under the folded key",
      "H17 | raw/comment | a hidden second citing sentence above the root paragraph | insert-before <!-- That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010). -->\\n\\n | docs/workbench/13-contracts-and-config.md section \"Host boundary\": the section carries HTML + docs/workbench/13-contracts-and-config.md raw root: 2 sentences cite ADR-SCG-010",
    ]);
    expect(PAGE_ROWS.map(row => `${row.id} | ${row.cls} | ${row.what} | ${visible(row.page)} | ${row.findings.map(visible).join(" + ")}`)).toEqual([
      "W1 | rendered/comment | the qualifier only inside an HTML comment | Multi-host swarm workspaces on NFS work <!-- unsupported --> well for teams. | rendered unqualified: Multi-host swarm workspaces on NFS work well for teams.",
      "W15 | rendered/link-destination | the qualifier only in a link destination | [Multi-host NFS swarm workspaces work](https://example.invalid/unsupported) for teams. | rendered unqualified: Multi-host NFS swarm workspaces work for teams.",
      "W2 | rendered/emphasis-split | the family phrase split by emphasis | A shared *file*system workspace works across machines. | rendered unqualified: A shared filesystem workspace works across machines.",
      "W3 | rendered/link-split | the family phrase split by a link | A shared [filesystem](https://example.invalid/fs) workspace works across machines. | rendered unqualified: A shared filesystem workspace works across machines.",
      "W4 | rendered/char-reference | the family word through a numeric character reference | A multi&#45;host swarm workspace works. | rendered unqualified: A multi-host swarm workspace works.",
      "W18 | rendered/inline-html | the family word split by an inline HTML tag | A multi-<span>host</span> swarm workspace works. | rendered unqualified: A multi-host swarm workspace works.",
      "W19 | rendered/backslash-escape | the family word with a backslash-escaped hyphen | A multi\\-host swarm workspace works. | rendered unqualified: A multi-host swarm workspace works.",
      "W7 | rendered/soft-wrap | the family phrase soft-wrapped across two source lines | Running one swarm workspace from two machines on a shared\\nfilesystem works fine. | rendered unqualified: Running one swarm workspace from two machines on a shared filesystem works fine.",
      "W5 | spelling/nbsp | a no-break space inside the family phrase | A shared\\u{A0}filesystem workspace works across machines. | rendered unqualified: A shared filesystem workspace works across machines.",
      "W8 | spelling/nb-hyphen | a non-breaking hyphen inside the family word | A multi\\u{2011}host swarm workspace works. | rendered unqualified: A multi-host swarm workspace works.",
      "W6 | spelling/zero-width | a zero-width space inside the family word | N\\u{200B}FS mounts work for the swarm. | rendered unqualified: NFS mounts work for the swarm.",
      "C3 | control | a plain unqualified sentence | Multi-host NFS swarm workspaces work. | rendered unqualified: Multi-host NFS swarm workspaces work. + raw unqualified: Multi-host NFS swarm workspaces work.",
      "C4 | control | an unqualified family inside a table | | Backend | Use |\\n|---|---|\\n| NFS | works | | rendered unqualified: NFS + raw unqualified: | NFS | works |",
      "C5 | control | an unqualified family in a heading | ## NFS swarm workspaces | rendered unqualified: NFS swarm workspaces + raw unqualified: ## NFS swarm workspaces",
      "H1 | rendered/named-reference | the family word through a named hyphen reference | A multi&hyphen;host swarm workspace works. | rendered unqualified: A multi-host swarm workspace works.",
      "H2 | rendered/unknown-reference | a named reference the census does not know inside the family word | A multi&zz;host swarm workspace works. | rendered refused: unknown character reference &zz; (the census cannot say what it renders)",
      "H3 | spelling/soft-hyphen | a soft hyphen inside the family word | A multi\\u{AD}host swarm workspace works. | rendered unqualified: A multihost swarm workspace works.",
      "H4 | rendered/named-reference | the family word through a named minus-sign reference | A multi&minus;host swarm workspace works. | rendered unqualified: A multi-host swarm workspace works.",
      "H5 | spelling/fullwidth | fullwidth letters spelling the family word | \\u{FF2E}\\u{FF26}\\u{FF33} mounts work for the swarm. | rendered unqualified: NFS mounts work for the swarm.",
      "H6 | spelling/combining-mark | a combining mark on a letter of the family word | N\\u{301}FS mounts work for the swarm. | rendered unqualified: NFS mounts work for the swarm.",
      "H7 | rendered/strikethrough | a struck-through unqualified sentence, which still shows | ~~Multi-host NFS swarm workspaces work.~~ | rendered unqualified: Multi-host NFS swarm workspaces work. + raw unqualified: ~~Multi-host NFS swarm workspaces work.~~",
      "H8 | rendered/list-item | an unqualified list item | - Multi-host NFS swarm workspaces work. | rendered unqualified: Multi-host NFS swarm workspaces work. + raw unqualified: - Multi-host NFS swarm workspaces work.",
      "H9 | rendered/block-quote | an unqualified block quote | > Multi-host NFS swarm workspaces work. | rendered unqualified: Multi-host NFS swarm workspaces work. + raw unqualified: > Multi-host NFS swarm workspaces work.",
      "H10 | rendered/html-block | an unqualified sentence inside an HTML block | <div>\\nMulti-host NFS swarm workspaces work.\\n</div> | rendered unqualified: Multi-host NFS swarm workspaces work. + raw unqualified: Multi-host NFS swarm workspaces work.",
      "H11 | rendered/image-alt | an unqualified image alt text | ![Multi-host NFS swarm workspaces work.](x.png) | rendered unqualified: Multi-host NFS swarm workspaces work. + raw unqualified: ![Multi-host NFS swarm workspaces work.](x.png)",
      "H12 | raw/comment | a safety word hidden in an HTML comment | NFS is unsupported<!-- and safe -->. | raw safety-claim: NFS is unsupported<!-- and safe -->.",
      "H13 | raw/wrap | a qualifier only on the next source line of a wrapped sentence | A shared filesystem swarm workspace\\nis unsupported. | raw unqualified: A shared filesystem swarm workspace",
      "H14 | rendered/emphasis | an emphasized safety word beside the qualifier | NFS is *safe* for teams, though multi-host use is unsupported. | rendered safety-claim: NFS is safe for teams, though multi-host use is unsupported. + raw safety-claim: NFS is *safe* for teams, though multi-host use is unsupported.",
      "H15 | raw/char-reference | the qualifier spelled through a numeric character reference | NFS is &#117;nsupported. | raw unqualified: NFS is &#117;nsupported.",
      "X1 | grep/derived-word | a derived multi-host word (multi-hosted: the AC4 grep matches it) | A multi-hosted swarm workspace on one mount works fine. | rendered unqualified: A multi-hosted swarm workspace on one mount works fine. + raw unqualified: A multi-hosted swarm workspace on one mount works fine.",
      "X2 | grep/derived-word | a derived multi-host word (multi-hosting: the AC4 grep matches it) | Swarm workspaces support multi-hosting across machines. | rendered unqualified: Swarm workspaces support multi-hosting across machines. + raw unqualified: Swarm workspaces support multi-hosting across machines.",
      "X3 | grep/inside-word | NFS in capitals inside a word (pNFS: the AC4 grep matches it) | A pNFS swarm workspace works across machines. | rendered unqualified: A pNFS swarm workspace works across machines. + raw unqualified: A pNFS swarm workspace works across machines.",
      "X4 | grep/inside-word | EFS in capitals inside a word (AmazonEFS: the AC4 grep matches it) | An AmazonEFS swarm workspace works across machines. | rendered unqualified: An AmazonEFS swarm workspace works across machines. + raw unqualified: An AmazonEFS swarm workspace works across machines.",
      "H18 | grep/inside-word | shared filesystem after a word character (unshared filesystem: the AC4 grep matches it) | An unshared filesystem works across machines. | rendered unqualified: An unshared filesystem works across machines. + raw unqualified: An unshared filesystem works across machines.",
      "H19 | grep/derived-word | a word character after shared filesystem (filesystem_root: the AC4 grep matches it) | A shared filesystem_root works across machines. | rendered unqualified: A shared filesystem_root works across machines. + raw unqualified: A shared filesystem_root works across machines.",
      "H20 | grep/inside-word | multi-host after a word character (nonmulti-host: the AC4 grep matches it) | A nonmulti-host swarm workspace works. | rendered unqualified: A nonmulti-host swarm workspace works. + raw unqualified: A nonmulti-host swarm workspace works.",
    ]);
    expect(ACCEPTED_ROWS.map(row => `${row.id} | ${row.cls} | ${row.what} | ${visible(row.page)} | ${row.families.join(" + ")}`)).toEqual([
      "W9 | residual/F3 clause | a qualifier attached to another clause of the same sentence | NFS swarm workspaces work across hosts, and local disks are unsupported. | NFS",
      "W10 | residual/F3 negation | a negated qualifier | Multi-host NFS swarm workspaces are no longer unsupported. | NFS + multi-host",
      "N1 | control | a family and its qualifier under emphasis | Multi-host use of a *shared filesystem* is **unsupported**. | shared filesystem + multi-host",
      "N2 | control | a qualified sentence as link text | [NFS is unsupported](https://example.invalid/x). | NFS",
      "N3 | control | an HTML comment beside a qualified sentence | NFS <!-- a note --> is unsupported. | NFS",
      "N4 | control | a qualified table cell | | Backend | Use |\\n|---|---|\\n| NFS (unsupported) | none | | NFS",
      "N5 | control | a qualified heading | ## NFS is unsupported | NFS",
    ]);
    expect(LIVENESS_ROWS.map(row => `${row.id} | ${row.cls} | ${row.what} | ${row.pages.map(visible).join(" ~ ")} | ${row.findings.join(" + ") || "none"}`)).toEqual([
      "L1 | liveness/none | no page naming a family | Local disks only. | rendered liveness: no rendered docs sentence names NFS + rendered liveness: no rendered docs sentence names EFS + rendered liveness: no rendered docs sentence names shared filesystem + rendered liveness: no rendered docs sentence names multi-host + raw liveness: no source docs sentence names NFS + raw liveness: no source docs sentence names EFS + raw liveness: no source docs sentence names shared filesystem + raw liveness: no source docs sentence names multi-host",
      "L2 | liveness/rendered | the families named only inside an HTML comment | <!-- Multi-host use of a shared filesystem (NFS or EFS) is unsupported. --> | rendered liveness: no rendered docs sentence names NFS + rendered liveness: no rendered docs sentence names EFS + rendered liveness: no rendered docs sentence names shared filesystem + rendered liveness: no rendered docs sentence names multi-host",
      "L3 | liveness/raw | the families spelled only through numeric character references | Multi&#45;host use of a shared&#32;filesystem (N&#70;S or E&#70;S) is unsupported. | raw liveness: no source docs sentence names NFS + raw liveness: no source docs sentence names EFS + raw liveness: no source docs sentence names shared filesystem + raw liveness: no source docs sentence names multi-host",
      "L4 | liveness/each | one family left unnamed | NFS and EFS mounts are unsupported for multi-host use. | rendered liveness: no rendered docs sentence names shared filesystem + raw liveness: no source docs sentence names shared filesystem",
      "L5 | control | the four families named across two pages | NFS and EFS are unsupported. ~ Multi-host use of a shared filesystem is unsupported. | none",
    ]);
    expect([String(AC4_GREP), JSON.stringify(GREP_FLOOR_BEFORE), JSON.stringify(GREP_FLOOR_AFTER)]).toEqual([
      "/NFS|EFS|shared filesystem|multi-host/",
      '["","p","Amazon","un","x_","9"]',
      '["","v4","ed","ing","s","_root","d"]',
    ]);
  });
});

describe("SCG-R5 AC4 rendered view (wb-973.5 respin): docs/workbench as a reader sees it", () => {
  it("SCG-R5: marked's top-level token raws tile every docs page, so the battery's docs edits are located through the lexer", () => {
    expect(docsPages().filter(path => marked.lexer(read(path)).map(token => token.raw).join("") !== read(path))).toEqual([]);
  });

  it("SCG-R5: every rendered docs sentence naming NFS, EFS, a shared filesystem or multi-host use says unsupported or not safe and claims no safety, and every character reference decodes", () => {
    expect(docsPages().flatMap(path => pageFindings(path, pageView(read(path))).filter(finding => finding.startsWith(`${path} rendered `)))).toEqual([]);
  });

  it("SCG-R5: the rendered leg is live on the docs: each of the four families is named by at least one rendered docs sentence", () => {
    const named = new Set(docsPages().flatMap(path => pageView(read(path)).renderedFamilies));
    expect(FAMILY_NAMES.filter(name => !named.has(name))).toEqual([]);
  });

  it('SCG-R5: docs/13 section "Host boundary" is the unique heading of that name under the page title, renders exactly the pinned blocks and carries no HTML', () => {
    const markdown = read(ROOT_SENTENCE_FILE);
    const section = docsSection(markdown, HOST_BOUNDARY, 2, [DOCS13_TITLE]);
    expect(section.why).toBe("");
    expect(section.ok).toBe(true);
    expect(section.hasHtml).toBe(false);
    expect(sectionMatches(section, HOST_BOUNDARY_BLOCKS)).toEqual({ ok: true, why: "" });
    expect(pageView(markdown).headings.filter(text => text === "host boundary")).toEqual(["host boundary"]);
  });

  it('SCG-R5: exactly one rendered docs/13 sentence cites ADR-SCG-010; it sits in a paragraph of section "Host boundary" and states single-host, local-coordinated scope', () => {
    const view = pageView(read(ROOT_SENTENCE_FILE));
    expect(renderedRootProblems(view)).toEqual([]);
    expect(view.citing).toEqual([{ sentence: ROOT_SENTENCE, hostParagraph: true }]);
  });

  it("SCG-R5: the whole-tree verdict the battery rows edit is clean on the committed docs", () => {
    expect(docsFindings(livePages())).toEqual([]);
  });
});

describe("SCG-R5 AC4 battery (gate row 553): edits of the committed docs, judged over the whole docs tree", () => {
  it.each(DOC_ROWS)("SCG-R5 battery $id ($cls): docs/13 with $what is refused", ({ edit, findings }) => {
    const pages = livePages();
    const edited = applyEdit(read(ROOT_SENTENCE_FILE), edit);
    expect(edited).not.toBe(read(ROOT_SENTENCE_FILE));
    pages.set(ROOT_SENTENCE_FILE, edited);
    expect(docsFindings(pages).filter(finding => !LIVENESS.test(finding))).toEqual(findings);
  });

  it.each(PAGE_ROWS)("SCG-R5 battery $id ($cls): a new page with $what is refused", ({ page, findings }) => {
    const pages = livePages();
    expect(pages.has(PROBE_FILE)).toBe(false);
    pages.set(PROBE_FILE, probePage(page));
    expect(docsFindings(pages)).toEqual(findings.map(finding => `${PROBE_FILE} ${finding}`));
  });

  it.each(ACCEPTED_ROWS)("SCG-R5 control $id ($cls): a new page with $what is accepted", ({ page, families }) => {
    const pages = livePages();
    pages.set(PROBE_FILE, probePage(page));
    expect(docsFindings(pages)).toEqual([]);
    expect(pageView(probePage(page)).renderedFamilies).toEqual(families);
  });
});

describe("SCG-R5 AC4 liveness: each leg judged over synthetic docs trees, whichever committed page names a family", () => {
  it.each(LIVENESS_ROWS)("SCG-R5 liveness $id ($cls): a docs tree with $what", ({ pages, findings }) => {
    const tree = livenessTree(pages);
    expect([...tree.keys()].filter(path => livePages().has(path))).toEqual([]);
    expect(docsFindings(tree).filter(finding => LIVENESS.test(finding))).toEqual(findings);
  });
});

/** The text a docs/13 edit carries, both sides of a replace. */
const editTexts = (edit: DocEdit): string[] =>
  edit.op === "replace" ? [edit.from, edit.to] : edit.op === "wrap" ? [edit.before, edit.after] : edit.op === "move-under" ? [edit.heading] : [edit.text];
/** Whether `leg` refuses exactly `sentence` as unqualified. */
const refusesUnqualified = (leg: ReadonlyArray<readonly [Problem, string]>, sentence: string): boolean =>
  leg.some(([problem, judged]) => problem === "unqualified" && judged === sentence);

describe("SCG-R5 AC4 grep floor (gate row 600 U2): every sentence the AC4 grep matches is a family match", () => {
  it("SCG-R5 grep floor: each AC4 grep alternative inside any word is a family match that both legs refuse unqualified", () => {
    const sentences = AC4_GREP.source
      .split("|")
      .flatMap(alternative => GREP_FLOOR_BEFORE.flatMap(before => GREP_FLOOR_AFTER.map(after => `A ${before}${alternative}${after} swarm workspace works.`)));
    expect(sentences).toHaveLength(168);
    const escapes = sentences.filter(sentence => {
      const view = pageView(probePage(sentence));
      return !AC4_GREP.test(sentence) || !refusesUnqualified(view.renderedProblems, sentence) || !refusesUnqualified(view.rawProblems, sentence);
    });
    expect(escapes).toEqual([]);
  });

  it("SCG-R5 grep floor: every synthetic sentence the AC4 grep matches is a family match, and no NO_MATCH control is an AC4 grep match", () => {
    const texts = [
      ...REFUSED.map(([, text]) => text),
      ...COMPLIANT.map(([, text]) => text),
      ...ROOT_REFUSED.map(([, text]) => text),
      ...DOC_ROWS.flatMap(row => editTexts(row.edit)),
      ...PAGE_ROWS.map(row => row.page),
      ...ACCEPTED_ROWS.map(row => row.page),
      ...LIVENESS_ROWS.flatMap(row => row.pages),
    ];
    const matched = texts.flatMap(text => linesOf(text).flatMap(sentencesOf)).filter(sentence => AC4_GREP.test(sentence));
    expect(matched.length).toBeGreaterThan(0);
    expect(matched.filter(sentence => classify(sentence).families.length === 0)).toEqual([]);
    expect(NO_MATCH.filter(([, text]) => AC4_GREP.test(text))).toEqual([]);
  });

  it("SCG-R5 grep floor: the AC4 grep over docs/workbench finds only family matches saying unsupported or not safe, in both legs", () => {
    const found = docsPages().flatMap(path => {
      const view = pageView(read(path));
      const legs = [...view.rawSentences.map(sentence => ({ leg: "raw", path, sentence })), ...view.renderedSentences.map(sentence => ({ leg: "rendered", path, sentence }))];
      return legs.filter(({ sentence }) => AC4_GREP.test(sentence));
    });
    expect(found.filter(({ sentence }) => classify(sentence).families.length === 0 || !QUALIFIER.test(sentence))).toEqual([]);
    expect([...new Set(found.map(({ leg }) => leg))].sort()).toEqual(["raw", "rendered"]);
  });
});
