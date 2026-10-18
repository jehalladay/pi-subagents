/**
 * wb-973.5 (SWARM-CONTEXT-GRAPH-R5) docs census: no Pi document presents a shared-filesystem (NFS/EFS) swarm workspace as
 * safe for multi-host use. Sources: ADR-SCG-010 (ReactiveFiberCLI 09-ADRS-AND-DECISIONS.md:33 @8a8b83e4d, "never present
 * EFS/NFS file sharing as safe distributed mutation") and QA-18 (06-QA-SECURITY-ROLLOUT.md:24, "Explicit unsupported
 * guidance; no safety claim").
 *
 * GREP. Every .md file under docs/workbench, receipts included, is read from its SOURCE, so text the page hides (an HTML
 * comment, a fenced block) is held to the rule as well. Each source line is split into sentences after a `.`, `!` or `?`
 * followed by white space. A sentence MATCHES when it names one of four families, case-insensitively: NFS or EFS as a
 * whole word (so "refs" never matches), shared filesystem (with the shared-filesystem, shared file system and plural
 * spellings) or multi-host (multi host, multihost, plural). A matching sentence must say "unsupported" or "not safe", and
 * may use the word "safe" (or "safely") only inside "not safe". A sentence wrapped over two source lines is judged line by
 * line, so the qualifier has to share the family's line.
 * ROOT SENTENCE. docs/workbench/13-contracts-and-config.md holds exactly one sentence citing ADR-SCG-010; it names the RF
 * workspace root and states single-host, local-coordinated scope.
 * The falsifier tables run the same judges over synthetic text, so each family, the qualifier, the sentence split, the
 * safety-word rule and every root-sentence clause are shown live, independent of what the docs say today.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, posix, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = "docs/workbench";
const ROOT_SENTENCE_FILE = `${DOCS}/13-contracts-and-config.md`;
const ADR = "ADR-SCG-010";

const FAMILIES: ReadonlyArray<readonly [string, RegExp]> = [
  ["NFS", /\bNFS\b/i],
  ["EFS", /\bEFS\b/i],
  ["shared filesystem", /\bshared[- ]?file[- ]?systems?\b/i],
  ["multi-host", /\bmulti[- ]?hosts?\b/i],
];
const FAMILY_NAMES = FAMILIES.map(([name]) => name);
const QUALIFIER = /\bunsupported\b|\bnot safe\b/i;
const SAFE_WORD = /\bsafe(?:ly)?\b/gi;
const NOT_SAFE = /\bnot safe\b/gi;

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

/** Every sentence of `text` naming a family, with what is wrong with it (null when it complies). */
function judge(file: string, text: string): Match[] {
  const matches: Match[] = [];
  linesOf(text).forEach((line, index) => {
    for (const sentence of sentencesOf(line)) {
      const families = FAMILIES.filter(([, pattern]) => pattern.test(sentence)).map(([name]) => name);
      if (families.length === 0) continue;
      const safeWords = sentence.match(SAFE_WORD)?.length ?? 0;
      const notSafe = sentence.match(NOT_SAFE)?.length ?? 0;
      const problem: Problem | null = !QUALIFIER.test(sentence) ? "unqualified" : safeWords > notSafe ? "safety-claim" : null;
      matches.push({ file, line: index + 1, sentence, families, problem });
    }
  });
  return matches;
}

/** What is wrong with the root sentence of `text`: no problems means exactly one ADR-SCG-010 sentence that states the scope. */
function rootSentenceProblems(text: string): string[] {
  const citing = linesOf(text).flatMap(sentencesOf).filter(sentence => sentence.includes(ADR));
  if (citing.length !== 1) return [`${citing.length} sentences cite ${ADR}`];
  const [sentence] = citing;
  const problems: string[] = [];
  if (!/\bRF workspace root\b/.test(sentence)) problems.push("does not name the RF workspace root");
  if (!/\bsingle-host\b/i.test(sentence)) problems.push("does not state single-host scope");
  if (!/\blocal-coordinated\b/i.test(sentence)) problems.push("does not state local-coordinated scope");
  return problems;
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

describe("SCG-R5 AC4 falsifiers: the judges over synthetic text", () => {
  it.each([
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
  ] as const)("SCG-R5 falsifier: %s is refused", (_case, text, families, problem) => {
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

  it.each([
    ["unsupported", "NFS is unsupported."],
    ["not safe", "An EFS workspace is not safe for the swarm."],
    ["both qualifiers", "Multi-host use of a shared filesystem is unsupported and not safe."],
  ] as const)("SCG-R5 control: a sentence saying %s complies", (_case, text) => {
    const matches = judge("synthetic.md", text);
    expect(matches).toHaveLength(1);
    expect(matches[0]?.problem).toBeNull();
  });

  it.each([
    ["refs", "Evidence refs are digests."],
    ["single-host", "The root has single-host scope."],
    ["host alone", "Each host binds its own root."],
  ] as const)("SCG-R5 control: %s is no match", (_case, text) => {
    expect(judge("synthetic.md", text)).toEqual([]);
  });

  const SENTENCE = "That RF workspace root has single-host, local-coordinated scope (ADR-SCG-010): multi-host use is unsupported and not safe.";
  it("SCG-R5 control: a root sentence stating every clause has no problem", () => {
    expect(rootSentenceProblems(`# 13\n\n${SENTENCE}\n`)).toEqual([]);
  });

  it.each([
    ["no citing sentence", "The RF workspace root has single-host, local-coordinated scope.", ["0 sentences cite ADR-SCG-010"]],
    ["two citing sentences", `${SENTENCE} ${SENTENCE}`, ["2 sentences cite ADR-SCG-010"]],
    ["the root unnamed", "It has single-host, local-coordinated scope (ADR-SCG-010).", ["does not name the RF workspace root"]],
    ["single-host missing", "The RF workspace root has local-coordinated scope (ADR-SCG-010).", ["does not state single-host scope"]],
    ["local-coordinated missing", "The RF workspace root has single-host scope (ADR-SCG-010).", ["does not state local-coordinated scope"]],
  ] as const)("SCG-R5 falsifier: a root sentence with %s is refused", (_case, text, expected) => {
    expect(rootSentenceProblems(text)).toEqual(expected);
  });
});
