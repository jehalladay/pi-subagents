import { lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Options } from "@anthropic-ai/claude-agent-sdk";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import {afterEach,describe,expect,it} from "vitest";
import {loadSettings,type WorkbenchSettings} from "../src/settings.js";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { createDetachedWorkflowHost, type DetachedHostRequest } from "../src/workbench/hosts/local-detached.js";
import { DETACHED_HOST_ENV_ALLOWLIST } from "../src/workbench/process-env.js";
import { registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import type { WorkflowSpawnRequest } from "../src/workflow/runtime.js";
import {hermeticDir} from "./helpers/boot-extension.js";
import { docsSection, type RenderedBlock } from "./helpers/census.js";
import { FakeClaudeSdk, sdkSuccess } from "./helpers/claude-sdk-stream.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

let sandbox:ReturnType<typeof hermeticDir>|undefined;
afterEach(()=>{sandbox?.restore();sandbox=undefined;});
it("pins finite Claude role provider allowlists without granting provider permission",()=>{
 sandbox=hermeticDir({settings:{workbench:{workflowAgentBackend:"claude",roles:{reviewer:{prompt:"Review",capabilities:["forge.gate.status"]}}}}});
 expect(loadSettings(sandbox.dir).workbench?.roles?.reviewer).toMatchObject({capabilities:["forge.gate.status"]});
 expect(loadSettings(sandbox.dir).workbench?.capabilityGrants).toBeUndefined();
});
it("rejects wildcard role capabilities",()=>{
 sandbox=hermeticDir({settings:{workbench:{workflowAgentBackend:"claude",roles:{reviewer:{prompt:"Review",capabilities:["*"]}}}}});
 expect(()=>loadSettings(sandbox!.dir)).toThrow(/roles|capabilities/);
});

// ---------------------------------------------------------------------------------------------
// wb-973.15 (SCG-R15): docs/workbench/19-worked-examples.md shows a Claude role configured as a swarm context graph
// worker. The cases below measure each sentence of that section through the settings loader and the REAL Claude hosts
// behind their documented SDK query fixture seam (FakeClaudeSdk: the SDK module is never mocked, no process is spawned,
// nothing touches the network). test/workbench-docs19-scg-worker-role.census.ts binds the section's sentences to the
// WORKER_SUITE cases by file, describe path and verbatim title; the NEGATIVES_SUITE cases are the bead's two negatives in
// force now ("Negative, in force now" in its acceptance), bound to no sentence. The served-leaves negative judges every
// docs/workbench page twice (refusal #1 U2): as a reader sees it (the RENDERED LEG below) and as its source reads (the
// SOURCE LEG, sentencesIn), so a served sentence reds whether its markup hides it from the source or its source hides it
// from the reader. Refusal #2's class-level guard widens both legs: an HTML break or block tag reads as white space to the
// reader (U1), a reader's sentence is never split after a listed abbreviation or before a lower-case continuation (U2),
// and serve in every form is the served claim (U3); the family members neither leg reads are named residuals, each with
// a pinned quiet row.
// ---------------------------------------------------------------------------------------------
installScratchLeakGuard();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_FILE = "docs/workbench/19-worked-examples.md";
const DOCS_PARENT = "19 — Worked usage examples and expected outcomes";
const WORKER_SECTION = "Claude role as a swarm context graph worker";
const WORKER_SUITE = "wb-973.15 SCG-R15: the docs/19 swarm context graph worker role";
const NEGATIVES_SUITE = "wb-973.15 SCG-R15 negatives in force now";
/** Where rf install-skill --agent claude writes the skill (rf install-skill --list --json, rf 0.1.845, measured 2026-10-26). */
const INSTALLED_SKILL = "~/.claude/skills/rf";
/**
 * rf's top-level commands, measured with rf --json --version (cli 0.1.845: 79 leaves under 18 top-level commands,
 * 2026-10-26), less install-skill, the one command the page names. A rendered `rf <command>`, global flags allowed
 * before the command, is a recipe step.
 */
const RF_COMMANDS: readonly string[] = [
  "completion", "component", "config", "context", "doctor", "dolt", "graph", "inference", "init", "operation", "optic", "schema",
  "session", "state", "status", "storage", "view",
];
const RECIPE_STEP = new RegExp(`\\brf\\b(?:\\s+-\\S+(?:\\s+[^\\s-]\\S*)?)*\\s+(?:${RF_COMMANDS.join("|")})\\b`);
/** The four rf leaves the bead's negative names, in their spaced, dotted, hyphenated or underscored spellings. */
const NAMED_LEAF = /\b(?:graph[ ._-]impact|graph[ ._-]candidate|optic[ ._-]list|view[ ._-]list)\b/i;
/** Every form of the verb a reader reads as the served claim (refusal #2 U3): serve, serves, served and serving. */
const SERVED_WORD = /\bserv(?:e|es|ed|ing)\b/i;
/** Directories no repository walk below enters: dependencies, git internals and build or report output. */
const WALK_SKIP: ReadonlySet<string> = new Set(["node_modules", ".git", "dist", ".forge", "coverage"]);

const fakes: FakeClaudeSdk[] = [];
const plants: string[] = [];
afterEach(() => {
  for (const fake of fakes.splice(0)) fake.release();
  removeScratch(...plants.splice(0));
});

/** The worker section of docs/19 (the page read from its real path), refused loudly when absent or ambiguous. */
function workerSection(markdown = readFileSync(join(ROOT, DOCS_FILE), "utf8")): readonly RenderedBlock[] {
  const section = docsSection(markdown, WORKER_SECTION, 2, [DOCS_PARENT]);
  if (!section.ok) throw new Error(`${DOCS_FILE} § ${WORKER_SECTION}: ${section.why}`);
  return section.blocks;
}
/** What a reader sees of a block: a list's items joined, any other block's text. */
const shown = (block: RenderedBlock): string => (block.kind === "list" ? block.items.map(item => item.text).join(" ") : block.text);

/** The section's one JSON block, parsed: the `.pi/subagents.json` the page shows. */
function workerFile(): Record<string, unknown> {
  const code = workerSection().flatMap(block => (block.kind === "code" ? [block.text] : []));
  if (code.length !== 1) throw new Error(`${DOCS_FILE} § ${WORKER_SECTION} shows ${code.length} code blocks; it shows exactly one settings file`);
  const parsed: unknown = JSON.parse(code[0] ?? "");
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("the settings block is not a JSON object");
  return parsed as Record<string, unknown>;
}
/** The page's workbench object with `edit` applied to a copy, so a case can vary one key of the file the page shows. */
function editedFile(edit: (workbench: Record<string, unknown>) => void): Record<string, unknown> {
  const file = structuredClone(workerFile());
  const workbench = file.workbench;
  if (workbench === null || typeof workbench !== "object" || Array.isArray(workbench)) throw new Error("the settings block has no workbench object");
  edit(workbench as Record<string, unknown>);
  return file;
}
/** Loads a settings file through the real loader in a hermetic project; the top-level afterEach restores it. */
function loadWorkbench(file: Record<string, unknown>): WorkbenchSettings {
  // One hermetic project at a time: an earlier one is restored first, so the chdir/HOME chain unwinds in order.
  sandbox?.restore();
  sandbox = hermeticDir({ settings: file });
  const workbench = loadSettings(sandbox.dir).workbench;
  if (workbench === undefined) throw new Error("the settings file loaded no workbench settings");
  return workbench;
}
/** The one role the page's block declares, by name. */
function workerRole(workbench: WorkbenchSettings): { readonly name: string; readonly role: NonNullable<WorkbenchSettings["roles"]>[string] } {
  const names = Object.keys(workbench.roles ?? {});
  const [name] = names;
  const role = name === undefined ? undefined : workbench.roles?.[name];
  if (names.length !== 1 || name === undefined || role === undefined) throw new Error(`the block declares ${names.length} roles; the page shows exactly one`);
  return { name, role };
}
/** A fixture SDK whose every call completes at once, recorded so a case reads the Options the host handed it. */
function answeringSdk(): FakeClaudeSdk {
  const sdk = new FakeClaudeSdk({
    script: call => {
      call.push(...sdkSuccess(`sdk-${call.index}`, "done"));
      call.end();
    },
  });
  fakes.push(sdk);
  return sdk;
}
const spawnAs = (agentType: string): WorkflowSpawnRequest => ({ agentId: "wf-agent-0", index: 0, prompt: "Render the context of the bead.", label: "worker", agentType });
/** The registry the embedded host is handed, with the RF preview registered as on a real host, so an empty role is measured beside a provider it could reach. */
function providerRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, () => Promise.reject(new Error("the worker-role cases never invoke the RF preview")), ROOT);
  return registry;
}
/**
 * One session of the embedded Claude host built from loaded workbench settings exactly as src/index.ts builds it
 * (settingSources ?? [], tools ?? [], roles, the provider registry, capabilityGrants ?? []), started as `agentType`;
 * returns the Options the host handed the SDK.
 */
async function embeddedSession(workbench: WorkbenchSettings, agentType: string): Promise<Options> {
  const sdk = answeringSdk();
  const host = createClaudeWorkflowHost({
    cwd: sandbox?.dir ?? ROOT,
    ...(workbench.model ? { model: workbench.model } : {}),
    ...(workbench.permissionMode ? { permissionMode: workbench.permissionMode } : {}),
    settingSources: workbench.settingSources ?? [],
    tools: workbench.tools ?? [],
    roles: workbench.roles,
    capabilities: providerRegistry(),
    grants: workbench.capabilityGrants ?? [],
    query: sdk.query,
  });
  const result = await host.spawnAgent(spawnAs(agentType));
  expect(result.ok, result.ok ? "" : result.error).toBe(true);
  expect(sdk.calls).toHaveLength(1);
  const [call] = sdk.calls;
  if (call === undefined) throw new Error("the host made no SDK query");
  return call.options;
}

/**
 * The initializer source of `key` in the object literal each call of a function named `callee` passes in `file`, read
 * from the AST (comments, strings and formatting never stand in for the call). It pins how src/index.ts wires the loaded
 * workbench settings into the embedded Claude host, whose `settings` is structuredClone(loadSettings(ctx.cwd).workbench)
 * under the claude backend (runWorkflowTask), so the sessions measured above are the sessions that file starts.
 */
function callObjectProperty(file: string, callee: string, key: string): string[] {
  const source = ts.createSourceFile(file, readFileSync(join(ROOT, file), "utf8"), ts.ScriptTarget.ES2022, true);
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const name = ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : ts.isIdentifier(node.expression) ? node.expression.text : "";
      const [argument] = node.arguments;
      if (name === callee && argument !== undefined && ts.isObjectLiteralExpression(argument)) {
        for (const property of argument.properties) {
          if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === key) found.push(property.initializer.getText(source));
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

/** Every regular file (or link) below `dir` of `base`, outside WALK_SKIP, as a sorted `/`-joined path; links are never entered. */
function filesBelow(base: string, dir = ""): string[] {
  const out: string[] = [];
  for (const name of readdirSync(join(base, dir)).sort()) {
    if (WALK_SKIP.has(name)) continue;
    const path = dir === "" ? name : `${dir}/${name}`;
    if (lstatSync(join(base, path)).isDirectory()) out.push(...filesBelow(base, path));
    else out.push(path);
  }
  return out;
}
/** The YAML front matter of a markdown text, or "" when it has none. */
const frontMatter = (text: string): string => /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? "";
/** Why a path below `base` is a copy of the rf skill, or undefined: an rf directory under a skills directory, the recipe file, or a SKILL.md whose front matter names rf. */
function skillCopy(base: string, path: string): string | undefined {
  const parts = path.toLowerCase().split("/");
  if (parts.some((part, index) => part === "skills" && parts[index + 1] === "rf")) return "an rf directory under a skills directory";
  const name = parts.at(-1) ?? "";
  if (name === "swarm-integration.md") return "the swarm recipe file";
  if (name === "skill.md" && /^name:\s*["']?rf["']?\s*$/m.test(frontMatter(readFileSync(join(base, path), "utf8")))) return "a SKILL.md whose front matter names rf";
  return undefined;
}
/** Every rf skill copy below `base`, as `<path>: <why>`. */
const skillCopies = (base: string): string[] =>
  filesBelow(base).flatMap(path => {
    const why = skillCopy(base, path);
    return why === undefined ? [] : [`${path}: ${why}`];
  });
/** A line that starts a markdown block of its own: a list item, a heading, a table row, a quote or a fence. */
const BLOCK_START = /^\s*(?:[-*+]\s|\d+[.)]\s|#{1,6}\s|\||>|```)/;
/**
 * Abbreviations whose full stop never ends a reader's sentence (refusal #2 U2): the guard's e.g., i.e., etc. and vs., and
 * the Latin and English abbreviations of technical prose beside them, matched in any case.
 */
const ABBREVIATIONS: readonly string[] = ["e.g.", "i.e.", "etc.", "vs.", "cf.", "viz.", "et al.", "a.k.a.", "approx.", "incl."];
/** A text that ends with one of ABBREVIATIONS as a word of its own (a word that only ends like one, such as devs., does not). */
const ABBREVIATION_END = new RegExp(
  `(?<![\\p{L}\\p{N}])(?:${ABBREVIATIONS.map(abbreviation => abbreviation.replaceAll(".", "\\.").replaceAll(" ", "\\s+")).join("|")})$`,
  "iu",
);
/**
 * The sentences of one unit, for both legs (refusal #2 U2): the unit splits after ".", "!" or "?" that white space
 * follows, except where the text before ends with one of ABBREVIATIONS or the text after opens with a lower-case letter
 * (the reader's sentence goes on: an ellipsis, a full stop that ends a code span, an abbreviation outside the list), so a
 * reader's single sentence is judged as one.
 */
function splitSentences(unit: string): string[] {
  const sentences: string[] = [];
  let start = 0;
  for (const gap of unit.matchAll(/(?<=[.!?])\s+/gu)) {
    const end = gap.index + gap[0].length;
    if (ABBREVIATION_END.test(unit.slice(start, gap.index)) || /^\p{Ll}/u.test(unit.slice(end))) continue;
    sentences.push(unit.slice(start, gap.index));
    start = end;
  }
  sentences.push(unit.slice(start));
  return sentences.filter(sentence => sentence !== "");
}
/**
 * The sentences of a text: each paragraph, list item, table row, heading or fence line with its continuation lines joined
 * (a wrapped sentence stays whole, two list items never merge), split by splitSentences.
 */
function sentencesIn(text: string): string[] {
  const units: string[] = [];
  let current = "";
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed === "" || BLOCK_START.test(line) || current === "") {
      if (current !== "") units.push(current);
      current = trimmed;
    } else current = `${current} ${trimmed}`;
  }
  if (current !== "") units.push(current);
  return units.flatMap(splitSentences);
}
/** A sentence that names one of the four leaves and a served word. */
const servedLeaf = (sentence: string): boolean => NAMED_LEAF.test(sentence) && SERVED_WORD.test(sentence);
/** SOURCE LEG: every source sentence (sentencesIn) of every file below `dir` that names one of the four leaves and a served word, as `<path>: <sentence>`. */
const servedLeafSentences = (base: string, dir: string): string[] =>
  filesBelow(base, dir).flatMap(path =>
    sentencesIn(readFileSync(join(base, path), "utf8")).filter(servedLeaf).map(sentence => `${path}: ${sentence}`),
  );

// RENDERED LEG (refusal #1 U2, the rendered-text docs truth floor of wb-9x5.17; widened by refusal #2's class-level guard),
// every markdown page below the walked directory (any other file renders as its source text: its sentencesIn sentences,
// folded as below, no reference decoded): marked 18.0.11 (the lexer test/helpers/census.ts uses, GFM) lexes the page
// once. A unit is a paragraph, a heading, the text of a list item or block quote, a code block, an HTML block, a table's
// header row, and each body row read after its header row (cells joined by a space); a list that follows a paragraph
// whose last sentence is not ended by ".", "!" or "?" (a lead-in, such as one ending in ":") is read item by item after
// that lead-in sentence. A unit renders its text, code spans and backslash escapes as written, and emphasis, strong,
// strikethrough, link text and image alt text flattened (a link destination or title is never read); a task checkbox
// renders nothing, and raw HTML, an inline HTML token or an HTML block's source, renders as a reader sees it (renderHtml,
// refusal #2 U1): a comment (an unclosed one to its end) renders nothing, a tag of BREAK_ELEMENTS (br in any case,
// self-closing or carrying attributes, and every block-level element, met inline or in an HTML block) renders as white
// space, and any other tag renders nothing; a soft wrap or a hard break renders as white space. Numeric character
// references and the names in NAMED_REFERENCES are decoded outside code; any other named reference is recorded, and the
// live pages must carry none. The FOLDED KEY then applies: NFKD with combining marks dropped, format code points (Cf)
// dropped, every white-space run one space, control code points (Cc) dropped, every dash (Pd) and the minus sign read as
// "-". The folded unit splits into sentences by splitSentences (after ".", "!" or "?" that white space follows, never
// after one of ABBREVIATIONS or before a lower-case letter; refusal #2 U2), and a sentence naming a leaf and a served word
// (SERVED_WORD, serve in every form; refusal #2 U3) is a served sentence. RESIDUALS, each a named family whose planted
// quiet row below is read and stays quiet: R-ANAPHORA, the served word in a later sentence that points back to the leaf
// ("It is served."; cure: a sentence opening with It, This or That is also read after the sentence before it);
// R-HEADING-SCOPE, the served word in a heading over a list or paragraph that names the leaf ("## Served leaves" over
// "- graph impact"; cure: read each unit of a section after its heading); R-PARAPHRASE, the leaf named in other words
// ("the impact leaf of rf graph"; cure: read the leaf words in either order within a clause); R-SYNONYM, the claim in
// other words than serve ("available", "implemented"; cure: widen SERVED_WORD); R-CSS-PRESENTATION, an element a style
// displays as a block ('graph<span style="display:block">impact</span>'; the leg reads HTML by element, never by style;
// cure: read a block display style as a break); R-UNLISTED-ABBREVIATION, the full stop of an abbreviation outside
// ABBREVIATIONS before a capitalized word ("(Ref. Pi) is served."; cure: add it to ABBREVIATIONS).
const at = (code: number): string => String.fromCodePoint(code);
/** The named character references the rendered leg decodes; any other named reference is recorded as unreadable. */
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
  ["lowbar", "_"],
  ["excl", "!"],
  ["quest", "?"],
  ["comma", ","],
  ["colon", ":"],
  ["semi", ";"],
]);
const REFERENCE = /&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g;
/** The folded key's rewrites after NFKD and dropping combining marks, in order. */
const FOLD: ReadonlyArray<readonly [RegExp, string]> = [
  [/\p{Cf}/gu, ""],
  [/\s+/gu, " "],
  [/\p{Cc}/gu, ""],
  [/[\p{Pd}\u{2212}]/gu, "-"],
  [/ {2,}/g, " "],
];
const HTML_COMMENT = /<!--[\s\S]*?(?:-->|$)/g;
const HTML_TAG = /<\/?([A-Za-z][A-Za-z0-9-]*)(?:\s[^>]*)?\/?>/g;
/**
 * The elements whose tags a reader sees as white space or a line break (refusal #2 U1): br, pre, and every block-level
 * element marked 18.0.11 opens an HTML block with (CommonMark's start condition 6 names, with meta).
 */
const BREAK_ELEMENTS: ReadonlySet<string> = new Set([
  "br", "pre", "address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd",
  "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1",
  "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "meta",
  "nav", "noframes", "ol", "optgroup", "option", "p", "param", "search", "section", "summary", "table", "tbody", "td", "tfoot", "th",
  "thead", "title", "tr", "track", "ul",
]);
/** Raw HTML as a reader sees it: a comment (an unclosed one to its end) renders nothing, a tag of BREAK_ELEMENTS one space, any other tag nothing. */
const renderHtml = (raw: string): string =>
  raw.replace(HTML_COMMENT, "").replace(HTML_TAG, (_tag: string, name: string) => (BREAK_ELEMENTS.has(name.toLowerCase()) ? " " : ""));
const MARKDOWN_PAGE = /\.(?:md|markdown)$/i;

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
/** The FOLDED KEY of rendered text (see the RENDERED LEG). */
const foldKey = (text: string): string =>
  FOLD.reduce((folded, [pattern, replacement]) => folded.replace(pattern, replacement), text.normalize("NFKD").replace(/\p{M}/gu, "")).trim();
/** The rendered sentences of a unit: its folded key split by splitSentences. */
const renderedSentences = (unit: string): string[] => splitSentences(foldKey(unit));
const tokenText = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
};
const tokenChildren = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
const isListToken = (token: Token): token is Tokens.List => token.type === "list";
const isTableToken = (token: Token): token is Tokens.Table => token.type === "table";

/** What a reader sees of inline tokens (see the RENDERED LEG); a link destination or title is never read. */
function inlineText(tokens: readonly Token[], unknown: string[]): string {
  let out = "";
  for (const token of tokens) {
    if (token.type === "checkbox") continue;
    if (token.type === "html") out += renderHtml(token.raw);
    else if (token.type === "br") out += " ";
    else if (token.type === "codespan" || token.type === "escape") out += tokenText(token);
    else if (tokenChildren(token).length > 0) out += inlineText(tokenChildren(token), unknown);
    else out += decodeReferences(tokenText(token), unknown);
  }
  return out;
}
/** The units one block token renders (see the RENDERED LEG), in page order. */
function unitsOf(token: Token, unknown: string[]): string[] {
  if (token.type === "space" || token.type === "hr" || token.type === "def" || token.type === "checkbox") return [];
  if (token.type === "html") return [decodeReferences(renderHtml(token.raw), unknown)];
  if (token.type === "code") return [tokenText(token)];
  if (isTableToken(token)) {
    const header = token.header.map(cell => inlineText(cell.tokens, unknown)).join(" ");
    return [header, ...token.rows.map(row => `${header} ${row.map(cell => inlineText(cell.tokens, unknown)).join(" ")}`)];
  }
  if (isListToken(token)) return token.items.flatMap(item => blockUnits(item.tokens, unknown));
  if (token.type === "blockquote") return blockUnits(tokenChildren(token), unknown);
  const children = tokenChildren(token);
  return [children.length > 0 ? inlineText(children, unknown) : decodeReferences(tokenText(token), unknown)];
}
/** The units a run of block tokens renders, in order; a list after a paragraph whose last sentence is not ended by ".", "!" or "?" is read item by item after that lead-in. */
function blockUnits(tokens: readonly Token[], unknown: string[]): string[] {
  const out: string[] = [];
  let leadIn = "";
  for (const token of tokens) {
    if (token.type === "space") continue;
    const lead = leadIn;
    const units =
      lead !== "" && isListToken(token) ? token.items.flatMap(item => blockUnits(item.tokens, unknown).map(unit => `${lead} ${unit}`)) : unitsOf(token, unknown);
    out.push(...units);
    const last = token.type === "paragraph" || token.type === "text" ? (renderedSentences(units.join(" ")).at(-1) ?? "") : "";
    leadIn = /[.!?]$/.test(last) ? "" : last;
  }
  return out;
}
/** RENDERED LEG: every rendered sentence of every file below `dir`, as [path, sentence]; each named reference a markdown page carries that the leg cannot decode goes to `unknown` as `<path>: <reference>`. */
function renderedSentencesBelow(base: string, dir: string, unknown: string[]): (readonly [string, string])[] {
  return filesBelow(base, dir).flatMap(path => {
    const source = readFileSync(join(base, path), "utf8");
    const missed: string[] = [];
    const units = MARKDOWN_PAGE.test(path) ? blockUnits(marked.lexer(source), missed) : sentencesIn(source);
    unknown.push(...missed.map(reference => `${path}: ${reference}`));
    return units.flatMap(renderedSentences).map(sentence => [path, sentence] as const);
  });
}
/** RENDERED LEG: every rendered sentence below `dir` that names one of the four leaves and a served word, as `<path>: <sentence>`. */
const renderedServedLeafSentences = (base: string, dir: string, unknown: string[] = []): string[] =>
  renderedSentencesBelow(base, dir, unknown)
    .filter(([, sentence]) => servedLeaf(sentence))
    .map(([path, sentence]) => `${path}: ${sentence}`);
function plantFile(base: string, path: string, text: string): void {
  mkdirSync(dirname(join(base, path)), { recursive: true });
  writeFileSync(join(base, path), text);
}
function plantRoot(prefix: string): string {
  const base = makeScratch(prefix);
  plants.push(base);
  return base;
}

describe(WORKER_SUITE, () => {
  it("SCG-R15 R1: the page's block declares exactly one Claude role, whose tools carry Bash and whose prompt names the installed rf skill and SWARM_RF_WORKSPACE", () => {
    const workbench = loadWorkbench(workerFile());
    expect(workbench.workflowAgentBackend).toBe("claude");
    const { role } = workerRole(workbench);
    expect(role.tools).toContain("Bash");
    expect(role.prompt).toContain(INSTALLED_SKILL);
    expect(role.prompt).toContain("SWARM_RF_WORKSPACE");
  });

  it("SCG-R15 R3a: the section names the installed skill's location and restates no recipe step: no rendered rf command beyond rf install-skill", () => {
    const texts = workerSection().map(shown);
    expect(texts.join(" ")).toContain(INSTALLED_SKILL);
    expect(texts.join(" ")).toContain("rf install-skill");
    expect(texts.filter(text => RECIPE_STEP.test(text))).toEqual([]);
    // The step reader is live: each served step of the swarm recipe reads as a step, the page's own rf words do not.
    const steps = ["rf init --backend jsonl --no-input --json", "rf context render --model m --task t --json", "rf graph candidate create --scope private --json", "rf --json context explain rfr_x", "rf --workspace /srv/rf context replay rfr_x"];
    expect(steps.filter(step => !RECIPE_STEP.test(step))).toEqual([]);
    const quiet = ["runs rf through its shell tool", "rf install-skill --agent claude writes the skill", "the installed rf skill", "every rf command"];
    expect(quiet.filter(text => RECIPE_STEP.test(text))).toEqual([]);
  });

  it("SCG-R15 R3b: the repository tracks no copy of the rf skill: no rf directory under a skills directory, no recipe file and no SKILL.md naming rf", () => {
    expect(skillCopies(ROOT)).toEqual([]);
    // The walk read the repository: the tracked beads skill is seen and judged quiet.
    expect(filesBelow(ROOT)).toContain(".agents/skills/beads/SKILL.md");
    expect(skillCopy(ROOT, ".agents/skills/beads/SKILL.md")).toBeUndefined();
    // The same walk and judge flag each copy shape planted in scratch, and only those.
    const base = plantRoot("scg-r15-skill-copy-");
    plantFile(base, "a/.claude/skills/rf/references/commands.md", "# commands\n");
    plantFile(base, "docs/swarm-integration.md", "# swarm\n");
    plantFile(base, "b/SKILL.md", "---\nname: rf\ndescription: x\n---\n# rf\n");
    plantFile(base, "c/skills/beads/SKILL.md", "---\nname: beads\n---\n# beads\n");
    plantFile(base, "node_modules/x/skills/rf/SKILL.md", "---\nname: rf\n---\n");
    expect(skillCopies(base)).toEqual([
      "a/.claude/skills/rf/references/commands.md: an rf directory under a skills directory",
      "b/SKILL.md: a SKILL.md whose front matter names rf",
      "docs/swarm-integration.md: the swarm recipe file",
    ]);
  });

  it("SCG-R15 R4a: Pi loads the page's .pi/subagents.json as written, settingSources a workbench key", () => {
    const file = workerFile();
    const workbench = loadWorkbench(file);
    expect(workbench).toStrictEqual(file.workbench);
    expect(workbench.settingSources).toEqual(["user"]);
  });

  it("SCG-R15 R4b: a role that declares settingSources itself is refused, never read", () => {
    const file = editedFile(workbench => {
      const roles = workbench.roles as Record<string, Record<string, unknown>>;
      for (const role of Object.values(roles)) role.settingSources = ["user"];
    });
    expect(() => loadWorkbench(file)).toThrow(/workbench\.roles\.[\w-]+ must declare prompt with optional tools\/capabilities\/model\/effort\./);
  });

  it("SCG-R15 R5: the Claude host passes every session the configured settingSources, the page's user, and [] when the key is absent", async () => {
    const workbench = loadWorkbench(workerFile());
    const { name } = workerRole(workbench);
    expect((await embeddedSession(workbench, name)).settingSources).toEqual(["user"]);
    expect((await embeddedSession(workbench, "general-purpose")).settingSources).toEqual(["user"]);
    const without = loadWorkbench(editedFile(file => { Reflect.deleteProperty(file, "settingSources"); }));
    expect(without.settingSources).toBeUndefined();
    expect((await embeddedSession(without, name)).settingSources).toEqual([]);
    // The embedded host is built from the loaded settings this way, its one call site in src/index.ts.
    expect(callObjectProperty("src/index.ts", "createClaudeWorkflowHost", "settingSources")).toEqual(["settings.settingSources ?? []"]);
  });

  it("SCG-R15 R6: the installed Agent SDK documents user as the global ~/.claude/settings.json source and [] as disabling filesystem settings", () => {
    const pinned = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as { dependencies: Record<string, string> };
    const installed = JSON.parse(readFileSync(join(ROOT, "node_modules/@anthropic-ai/claude-agent-sdk/package.json"), "utf8")) as { version: string };
    expect(installed.version).toBe(pinned.dependencies["@anthropic-ai/claude-agent-sdk"]);
    const types = readFileSync(join(ROOT, "node_modules/@anthropic-ai/claude-agent-sdk/sdk.d.ts"), "utf8");
    expect(types).toContain("- `'user'` - Global user settings (`~/.claude/settings.json`)");
    expect(types).toContain("Pass `[]` to disable filesystem settings (SDK isolation mode).");
    expect(types).toContain("export declare type SettingSource = 'user' | 'project' | 'local';");
  });

  it("SCG-R15 R7: the role's tools replace the workbench-wide tools for its sessions, so Bash reaches the worker", async () => {
    const workbench = loadWorkbench(editedFile(file => { file.tools = ["Read", "Grep"]; }));
    const { name, role } = workerRole(workbench);
    const options = await embeddedSession(workbench, name);
    expect(options.tools).toEqual(role.tools);
    expect(options.tools).toContain("Bash");
    // A session outside the role keeps the workbench-wide list, so the role's list is a replacement, not a merge.
    expect((await embeddedSession(workbench, "general-purpose")).tools).toEqual(["Read", "Grep"]);
    expect(callObjectProperty("src/index.ts", "createClaudeWorkflowHost", "tools")).toEqual(["settings.tools ?? []"]);
    expect(callObjectProperty("src/index.ts", "createClaudeWorkflowHost", "roles")).toEqual(["settings.roles"]);
  });

  it("SCG-R15 R8: the role declares no capabilities, so its sessions expose no Pi provider tool and the file needs no capability grant", async () => {
    const workbench = loadWorkbench(workerFile());
    const { name, role } = workerRole(workbench);
    expect(role.capabilities).toBeUndefined();
    expect(workbench.capabilityGrants).toBeUndefined();
    const options = await embeddedSession(workbench, name);
    expect(options.mcpServers).toBeUndefined();
    expect(options.allowedTools).toBeUndefined();
    // The same registry does expose the provider to a role that names it, so the empty role is what withholds it.
    const named = loadWorkbench(editedFile(file => {
      const roles = file.roles as Record<string, Record<string, unknown>>;
      for (const entry of Object.values(roles)) entry.capabilities = ["reactivefiber.render.preview"];
    }));
    expect(Object.keys((await embeddedSession(named, name)).mcpServers ?? {})).toEqual(["workbench"]);
    expect(callObjectProperty("src/index.ts", "createClaudeWorkflowHost", "grants")).toEqual(["settings.capabilityGrants ?? []"]);
  });

  it("SCG-R15 R9: the role adds no environment of its own: its sessions get no env override, the detached allowlist carries RF_WORKSPACE and SWARM_RF_WORKSPACE, and a role env is refused", async () => {
    const workbench = loadWorkbench(workerFile());
    const { name } = workerRole(workbench);
    expect(Object.hasOwn(await embeddedSession(workbench, name), "env")).toBe(false);
    expect(DETACHED_HOST_ENV_ALLOWLIST).toEqual(expect.arrayContaining(["RF_WORKSPACE", "SWARM_RF_WORKSPACE"]));
    const withEnv = editedFile(file => {
      const roles = file.roles as Record<string, Record<string, unknown>>;
      for (const entry of Object.values(roles)) entry.env = { SWARM_RF_WORKSPACE: "/srv/swarm/rf" };
    });
    expect(() => loadWorkbench(withEnv)).toThrow(/workbench\.roles\.[\w-]+ must declare prompt with optional tools\/capabilities\/model\/effort\./);
  });

  it("SCG-R15 R10: the detached host starts its Claude sessions with settingSources [] whatever reaches it", async () => {
    const workbench = loadWorkbench(workerFile());
    const { name, role } = workerRole(workbench);
    const sdk = answeringSdk();
    // The documented fixture seam (ClaudeWorkflowHostOptions.query) and a user source ride the request's claude object,
    // which createDetachedWorkflowHost spreads into the Claude host before its own settingSources: the production child
    // admits only model/tools/roles there (validateRequest), so this is the one way a case reaches that line.
    const claude = { tools: role.tools ?? [], roles: workbench.roles, settingSources: ["user"], query: sdk.query };
    const request: DetachedHostRequest = {
      backend: "claude", cwd: sandbox?.dir ?? ROOT, invocationId: "scg-r15-detached", providers: [],
      grants: ["claude:invoke", ...(role.tools ?? []).map(tool => `claude:tool:${tool}`)], claude,
    };
    const host = createDetachedWorkflowHost({ request, registry: new CapabilityRegistry(), principal: { id: "local-operator", role: "local-operator" }, signal: new AbortController().signal, beforeDispatch: () => {} });
    const result = await host.spawnAgent(spawnAs(name));
    expect(result.ok, result.ok ? "" : result.error).toBe(true);
    expect(sdk.calls.map(call => call.options.settingSources)).toEqual([[]]);
  });
});

describe(NEGATIVES_SUITE, () => {
  it("SCG-R15 negative: no docs/workbench sentence lists graph impact, graph candidate, optic list or view list as served", () => {
    expect(servedLeafSentences(ROOT, "docs/workbench")).toEqual([]);
    // The rendered leg (refusal #1 U2): no page renders a served sentence to a reader, and every named reference the
    // live pages carry is one the leg decodes.
    const unknown: string[] = [];
    expect(renderedServedLeafSentences(ROOT, "docs/workbench", unknown)).toEqual([]);
    expect(unknown).toEqual([]);
    // Both legs are live on the real pages: every page renders a sentence, and a receipt that names a leaf is read, and quiet.
    const rendered = renderedSentencesBelow(ROOT, "docs/workbench", []);
    expect([...new Set(rendered.map(([path]) => path))]).toEqual(filesBelow(ROOT, "docs/workbench"));
    expect(rendered.filter(([, sentence]) => NAMED_LEAF.test(sentence)).map(([path, sentence]) => `${path}: ${sentence}`)).toContain(
      "docs/workbench/receipts/wb-a9l2.8.md: Leaf graph.impact: reads (registry.py:880)",
    );
    const named = filesBelow(ROOT, "docs/workbench").filter(path => sentencesIn(readFileSync(join(ROOT, path), "utf8")).some(sentence => NAMED_LEAF.test(sentence)));
    expect(named).toContain("docs/workbench/receipts/wb-a9l2.8.md");
    const base = plantRoot("scg-r15-served-leaf-");
    plantFile(base, "docs/a.md", "The rf graph impact leaf is served.\n");
    plantFile(base, "docs/b.md", "Here graph.candidate.create\nis served by this build.\n");
    plantFile(base, "docs/c.md", "The view list leaf serves rows. Optic-list serving is next.\n");
    plantFile(base, "docs/d.md", "rf graph impact refuses with RF_USAGE_NOT_IMPLEMENTED. The preview is served. Leaf graph.impact: reads.\n");
    expect(servedLeafSentences(base, "docs")).toEqual([
      "docs/a.md: The rf graph impact leaf is served.",
      "docs/b.md: Here graph.candidate.create is served by this build.",
      "docs/c.md: The view list leaf serves rows.",
      "docs/c.md: Optic-list serving is next.",
    ]);
  });

  it("SCG-R15 negative, rendered leg (refusal #1 U2): a served sentence reds as a reader sees it, whatever its white space, inline markup, references or structure, outside the named residuals", () => {
    const base = plantRoot("scg-r15-rendered-leaf-");
    const fullwidth = (word: string): string => [...word].map(letter => at((letter.codePointAt(0) ?? 0) + 0xfee0)).join("");
    // Each plant needs one reading of the leg to red (named in its path); the source leg misses all but the noted ones.
    plantFile(base, "docs/db.md", "The rf graph impact leaf is served by this build.\n");
    plantFile(base, "docs/db2.md", "The rf graph  impact leaf is served by this build.\n");
    plantFile(base, "docs/db3.md", "The rf graph **impact** leaf is served by this build.\n");
    plantFile(base, "docs/e1-references.md", "The rf graph&nbsp;candidate leaf is ser<!-- x -->ved. The rf graph&#46;impact leaf is served.\n");
    plantFile(base, "docs/e10-controls.md", `The rf graph ${at(0x7)} impact leaf is served.\n`);
    plantFile(base, "docs/e11-marks.md", `The rf graph impact leaf is se${at(0x301)}rved.\n`);
    plantFile(base, "docs/e12-quote.md", "> The rf optic list leaf is served.\n");
    plantFile(base, "docs/e13-list.md", "- The rf view list leaf is served.\n");
    plantFile(base, "docs/e14-heading.md", "## The rf graph candidate leaf is served\n");
    plantFile(base, "docs/e15-open-lead-in.md", "The leaves this build serves\n\n- optic list\n");
    plantFile(base, "docs/e16-soft-wrap.md", "The rf graph\nimpact leaf is served.\n");
    plantFile(base, "docs/e17-named.md", "The rf graph&lowbar;impact, optic&period;list, view&hyphen;list and graph&ensp;candidate leaves are served.\n");
    plantFile(base, "docs/e2-escapes.md", "The rf optic\\_list leaf **serv**es rows.\n");
    plantFile(base, "docs/e3-link.md", `The [rf view${at(0x200b)} list](https://example.invalid/a) leaf is served.\n`);
    plantFile(base, "docs/e4-break.md", "The rf graph  \nimpact leaf is served.\n");
    plantFile(base, "docs/e5-table.md", "| Served leaf | Notes |\n| --- | --- |\n| graph&#46;impact | slice 17 |\n");
    plantFile(base, "docs/e6-lead-in.md", "The leaves this build serves:\n\n- graph candidate\n- view list\n");
    plantFile(base, "docs/e7-fold.md", `The rf ${fullwidth("graph")}${at(0x2011)}impact leaf is served.\n`);
    plantFile(base, "docs/e8-html.md", "<div>\nThe rf view list leaf is served.\n</div>\n");
    plantFile(base, "docs/e9-code.md", "```text\nrf graph impact: served\n```\n");
    plantFile(base, "docs/notes.txt", "The rf graph  impact leaf is served.\n");
    // Quiet for the rendered leg: a destination or a comment a reader never sees, inline, inside an HTML block or left
    // unclosed there (the source leg flags all four), a served word in another sentence, and a named reference the leg
    // cannot decode, which it records instead.
    plantFile(base, "docs/q1-destination.md", "The [preview](https://example.invalid/graph-impact) is served.\n");
    plantFile(base, "docs/q2-comment.md", "Text. <!-- The rf graph impact leaf is served. -->\n");
    plantFile(base, "docs/q3-apart.md", "rf graph impact refuses with RF_USAGE_NOT_IMPLEMENTED. The preview is served.\n");
    plantFile(base, "docs/q4-unknown.md", "The rf graph&rarr;impact leaf is served.\n");
    plantFile(base, "docs/q5-block-comment.md", "<div>\n<!-- The rf graph impact leaf is served. -->\n</div>\n");
    plantFile(base, "docs/q6-unclosed-comment.md", "<div>\n<!-- The rf graph impact leaf is served.\n</div>\n");
    const unknown: string[] = [];
    expect(renderedServedLeafSentences(base, "docs", unknown)).toEqual([
      "docs/db.md: The rf graph impact leaf is served by this build.",
      "docs/db2.md: The rf graph impact leaf is served by this build.",
      "docs/db3.md: The rf graph impact leaf is served by this build.",
      "docs/e1-references.md: The rf graph candidate leaf is served.",
      "docs/e1-references.md: The rf graph.impact leaf is served.",
      "docs/e10-controls.md: The rf graph impact leaf is served.",
      "docs/e11-marks.md: The rf graph impact leaf is served.",
      "docs/e12-quote.md: The rf optic list leaf is served.",
      "docs/e13-list.md: The rf view list leaf is served.",
      "docs/e14-heading.md: The rf graph candidate leaf is served",
      "docs/e15-open-lead-in.md: The leaves this build serves optic list",
      "docs/e16-soft-wrap.md: The rf graph impact leaf is served.",
      "docs/e17-named.md: The rf graph_impact, optic.list, view-list and graph candidate leaves are served.",
      "docs/e2-escapes.md: The rf optic_list leaf serves rows.",
      "docs/e3-link.md: The rf view list leaf is served.",
      "docs/e4-break.md: The rf graph impact leaf is served.",
      "docs/e5-table.md: Served leaf Notes graph.impact slice 17",
      "docs/e6-lead-in.md: The leaves this build serves: graph candidate",
      "docs/e6-lead-in.md: The leaves this build serves: view list",
      "docs/e7-fold.md: The rf graph-impact leaf is served.",
      "docs/e8-html.md: The rf view list leaf is served.",
      "docs/e9-code.md: rf graph impact: served",
      "docs/notes.txt: The rf graph impact leaf is served.",
    ]);
    expect(unknown).toEqual(["docs/q4-unknown.md: &rarr;"]);
    // The source leg reads the same plants: it misses DB2, DB3 and every rendered-only shape, and flags what a reader never sees.
    expect(servedLeafSentences(base, "docs")).toEqual([
      "docs/db.md: The rf graph impact leaf is served by this build.",
      "docs/e12-quote.md: > The rf optic list leaf is served.",
      "docs/e13-list.md: - The rf view list leaf is served.",
      "docs/e14-heading.md: ## The rf graph candidate leaf is served",
      "docs/e16-soft-wrap.md: The rf graph impact leaf is served.",
      "docs/e4-break.md: The rf graph impact leaf is served.",
      "docs/e8-html.md: <div> The rf view list leaf is served.",
      "docs/e9-code.md: ```text rf graph impact: served",
      "docs/q1-destination.md: The [preview](https://example.invalid/graph-impact) is served.",
      "docs/q2-comment.md: <!-- The rf graph impact leaf is served.",
      "docs/q5-block-comment.md: <div> <!-- The rf graph impact leaf is served.",
      "docs/q6-unclosed-comment.md: <div> <!-- The rf graph impact leaf is served.",
    ]);
  });

  it("SCG-R15 negative, refusal #2 class guard (U1-U3): an HTML break or block tag reads as white space, a listed abbreviation or a lower-case continuation never ends a reader's sentence, and every form of serve is the served claim", () => {
    const base = plantRoot("scg-r15-class-guard-");
    // (i) Rendered text (refusal #2 U1): a tag a reader sees as white space or a line break, br in every spelling, case and
    // self-closing form and a block-level tag met inline, in a paragraph, a table cell or an HTML block (h01, h02, h03 and
    // h04 are the gate's L23, L25, L26 and L43).
    plantFile(base, "docs/h01-br.md", "The rf graph<br>impact leaf is served by this build.\n");
    plantFile(base, "docs/h02-br-table.md", "| Leaf | Status |\n| --- | --- |\n| graph<br>impact | served |\n");
    plantFile(base, "docs/h03-br-self-closing.md", "The rf optic<br/>list leaf is served by this build.\n");
    plantFile(base, "docs/h04-br-upper.md", "The rf graph<BR>candidate leaf is served by this build.\n");
    plantFile(base, "docs/h05-br-spaced.md", "The rf view<br />list leaf is served by this build.\n");
    plantFile(base, "docs/h06-br-attribute.md", 'The rf graph<Br class="x">impact leaf is served by this build.\n');
    plantFile(base, "docs/h07-paragraph-tags.md", "The rf graph</p><p>impact leaf is served by this build.\n");
    plantFile(base, "docs/h08-div-tags.md", "The rf optic<div>list</div> leaf is served by this build.\n");
    plantFile(base, "docs/h09-html-block.md", "<p>The rf graph<br>candidate leaf is served.</p>\n");
    plantFile(base, "docs/h10-html-table.md", "<table><tr><td>view</td><td>list</td><td>served</td></tr></table>\n");
    plantFile(base, "docs/h11-heading-tags.md", "The rf view<h2>list</h2> leaf is served by this build.\n");
    // Quiet: a tag a reader sees as nothing (an inline element), and a tag spelled with references or inside a code span,
    // which a reader sees as written.
    plantFile(base, "docs/hq1-inline-element.md", "The rf graph<span>impact</span> leaf is served.\n");
    plantFile(base, "docs/hq2-escaped-tag.md", "The rf graph&lt;br&gt;impact leaf is served.\n");
    plantFile(base, "docs/hq3-code-span-tag.md", "The rf `graph<br>impact` leaf is served.\n");
    // (ii) Sentence units (refusal #2 U2): a reader's single sentence is judged whole through a listed abbreviation (s01 and
    // s02 are the gate's L27 and L28; s10 to s20 hold each ABBREVIATIONS entry, in either case, before a capitalized word,
    // which only the list keeps in the sentence, and s21 a white-space run inside one) and before a lower-case continuation
    // (an ellipsis, a full stop that ends a code span, a question mark inside parentheses).
    plantFile(base, "docs/s01-eg.md", "The rf graph impact leaf, e.g. in this build, is served.\n");
    plantFile(base, "docs/s02-ie.md", "The rf view list leaf is, i.e. at rf 0.1.845, served by this build.\n");
    plantFile(base, "docs/s03-ellipsis.md", "The rf optic list leaf... is served.\n");
    plantFile(base, "docs/s04-code-span-stop.md", "The `rf graph candidate.` leaf is served.\n");
    plantFile(base, "docs/s05-question.md", "The rf view list leaf (ready? yes) is served.\n");
    plantFile(base, "docs/s10-eg.md", "The rf graph impact leaf (e.g. Pi) is served.\n");
    plantFile(base, "docs/s11-ie.md", "The rf graph impact leaf (i.e. Pi) is served.\n");
    plantFile(base, "docs/s12-etc.md", "The rf graph impact leaf (etc. Pi) is served.\n");
    plantFile(base, "docs/s13-vs.md", "The rf graph impact leaf (vs. Pi) is served.\n");
    plantFile(base, "docs/s14-cf.md", "The rf graph impact leaf (cf. Pi) is served.\n");
    plantFile(base, "docs/s15-viz.md", "The rf graph impact leaf (viz. Pi) is served.\n");
    plantFile(base, "docs/s16-et-al.md", "The rf graph impact leaf (et al. Pi) is served.\n");
    plantFile(base, "docs/s17-aka.md", "The rf graph impact leaf (a.k.a. Pi) is served.\n");
    plantFile(base, "docs/s18-approx.md", "The rf graph impact leaf (approx. Pi) is served.\n");
    plantFile(base, "docs/s19-incl.md", "The rf graph impact leaf (incl. Pi) is served.\n");
    plantFile(base, "docs/s20-eg-capital.md", "The rf view list leaf (E.g. Pi) is served.\n");
    plantFile(base, "docs/s21-et-al-spaced.md", "The rf view list leaf (et  al. Pi) is served.\n");
    // Quiet: two sentences, and a word that only ends like an abbreviation, still end where a reader ends them.
    plantFile(base, "docs/sq1-two-sentences.md", "The rf graph impact leaf refuses. The preview is served.\n");
    plantFile(base, "docs/sq2-word-ending.md", "The rf graph impact leaf is for devs. The preview is served.\n");
    // (iii) The served claim (refusal #2 U3): the bare verb (v01 is the gate's L29) and the imperative; quiet: the nouns.
    plantFile(base, "docs/v01-serve.md", "This build will serve the rf graph impact leaf.\n");
    plantFile(base, "docs/v02-serve-imperative.md", "Serve the rf optic list leaf from this build.\n");
    plantFile(base, "docs/vq1-nouns.md", "The rf graph impact leaf names a server and a service.\n");
    const unknown: string[] = [];
    expect(renderedServedLeafSentences(base, "docs", unknown)).toEqual([
      "docs/h01-br.md: The rf graph impact leaf is served by this build.",
      "docs/h02-br-table.md: Leaf Status graph impact served",
      "docs/h03-br-self-closing.md: The rf optic list leaf is served by this build.",
      "docs/h04-br-upper.md: The rf graph candidate leaf is served by this build.",
      "docs/h05-br-spaced.md: The rf view list leaf is served by this build.",
      "docs/h06-br-attribute.md: The rf graph impact leaf is served by this build.",
      "docs/h07-paragraph-tags.md: The rf graph impact leaf is served by this build.",
      "docs/h08-div-tags.md: The rf optic list leaf is served by this build.",
      "docs/h09-html-block.md: The rf graph candidate leaf is served.",
      "docs/h10-html-table.md: view list served",
      "docs/h11-heading-tags.md: The rf view list leaf is served by this build.",
      "docs/s01-eg.md: The rf graph impact leaf, e.g. in this build, is served.",
      "docs/s02-ie.md: The rf view list leaf is, i.e. at rf 0.1.845, served by this build.",
      "docs/s03-ellipsis.md: The rf optic list leaf... is served.",
      "docs/s04-code-span-stop.md: The rf graph candidate. leaf is served.",
      "docs/s05-question.md: The rf view list leaf (ready? yes) is served.",
      "docs/s10-eg.md: The rf graph impact leaf (e.g. Pi) is served.",
      "docs/s11-ie.md: The rf graph impact leaf (i.e. Pi) is served.",
      "docs/s12-etc.md: The rf graph impact leaf (etc. Pi) is served.",
      "docs/s13-vs.md: The rf graph impact leaf (vs. Pi) is served.",
      "docs/s14-cf.md: The rf graph impact leaf (cf. Pi) is served.",
      "docs/s15-viz.md: The rf graph impact leaf (viz. Pi) is served.",
      "docs/s16-et-al.md: The rf graph impact leaf (et al. Pi) is served.",
      "docs/s17-aka.md: The rf graph impact leaf (a.k.a. Pi) is served.",
      "docs/s18-approx.md: The rf graph impact leaf (approx. Pi) is served.",
      "docs/s19-incl.md: The rf graph impact leaf (incl. Pi) is served.",
      "docs/s20-eg-capital.md: The rf view list leaf (E.g. Pi) is served.",
      "docs/s21-et-al-spaced.md: The rf view list leaf (et al. Pi) is served.",
      "docs/v01-serve.md: This build will serve the rf graph impact leaf.",
      "docs/v02-serve-imperative.md: Serve the rf optic list leaf from this build.",
    ]);
    expect(unknown).toEqual([]);
    // The source leg shares the sentence units and the served word, so it flags every (ii) and (iii) plant; it reads a tag
    // as written, so it flags no (i) plant (the rendered leg owns those).
    expect(servedLeafSentences(base, "docs")).toEqual([
      "docs/s01-eg.md: The rf graph impact leaf, e.g. in this build, is served.",
      "docs/s02-ie.md: The rf view list leaf is, i.e. at rf 0.1.845, served by this build.",
      "docs/s03-ellipsis.md: The rf optic list leaf... is served.",
      "docs/s04-code-span-stop.md: The `rf graph candidate.` leaf is served.",
      "docs/s05-question.md: The rf view list leaf (ready? yes) is served.",
      "docs/s10-eg.md: The rf graph impact leaf (e.g. Pi) is served.",
      "docs/s11-ie.md: The rf graph impact leaf (i.e. Pi) is served.",
      "docs/s12-etc.md: The rf graph impact leaf (etc. Pi) is served.",
      "docs/s13-vs.md: The rf graph impact leaf (vs. Pi) is served.",
      "docs/s14-cf.md: The rf graph impact leaf (cf. Pi) is served.",
      "docs/s15-viz.md: The rf graph impact leaf (viz. Pi) is served.",
      "docs/s16-et-al.md: The rf graph impact leaf (et al. Pi) is served.",
      "docs/s17-aka.md: The rf graph impact leaf (a.k.a. Pi) is served.",
      "docs/s18-approx.md: The rf graph impact leaf (approx. Pi) is served.",
      "docs/s19-incl.md: The rf graph impact leaf (incl. Pi) is served.",
      "docs/s20-eg-capital.md: The rf view list leaf (E.g. Pi) is served.",
      "docs/s21-et-al-spaced.md: The rf view list leaf (et  al. Pi) is served.",
      "docs/v01-serve.md: This build will serve the rf graph impact leaf.",
      "docs/v02-serve-imperative.md: Serve the rf optic list leaf from this build.",
    ]);
  });

  it("SCG-R15 negative, residuals: R-ANAPHORA, R-HEADING-SCOPE, R-PARAPHRASE, R-SYNONYM, R-CSS-PRESENTATION and R-UNLISTED-ABBREVIATION are read and stay quiet, and each named cure flags its quiet row", () => {
    const base = plantRoot("scg-r15-leaf-residual-");
    // [family, page path, page text, the page's rendered sentences]
    const QUIET: ReadonlyArray<readonly [string, string, string, readonly string[]]> = [
      ["R-ANAPHORA", "docs/r-anaphora.md", "The rf graph impact leaf ships in this build. It is served.", ["The rf graph impact leaf ships in this build.", "It is served."]],
      ["R-HEADING-SCOPE", "docs/r-heading-scope.md", "## Served leaves\n\n- graph impact", ["Served leaves", "graph impact"]],
      ["R-PARAPHRASE", "docs/r-paraphrase.md", "The impact leaf of rf graph is served.", ["The impact leaf of rf graph is served."]],
      ["R-SYNONYM", "docs/r-synonym.md", "The rf graph impact leaf is available in this build.", ["The rf graph impact leaf is available in this build."]],
      ["R-CSS-PRESENTATION", "docs/r-css-presentation.md", 'The rf graph<span style="display:block">impact</span> leaf is served.', ["The rf graphimpact leaf is served."]],
      ["R-UNLISTED-ABBREVIATION", "docs/r-unlisted-abbreviation.md", "The rf graph impact leaf (Ref. Pi) is served.", ["The rf graph impact leaf (Ref.", "Pi) is served."]],
    ];
    for (const [, path, page] of QUIET) plantFile(base, path, `${page}\n`);
    plantFile(base, "docs/control.md", "The rf graph impact leaf is served.\n");
    // Each quiet row's page is read (it renders exactly its pinned sentences), and only the control reds: the families stay quiet.
    const read = renderedSentencesBelow(base, "docs", []);
    const sentencesOfPage = (path: string): string[] => read.filter(([page]) => page === path).map(([, sentence]) => sentence);
    expect(QUIET.map(([, path]) => sentencesOfPage(path))).toEqual(QUIET.map(([, , , sentences]) => [...sentences]));
    expect(renderedServedLeafSentences(base, "docs")).toEqual(["docs/control.md: The rf graph impact leaf is served."]);
    expect(servedLeafSentences(base, "docs")).toEqual(["docs/control.md: The rf graph impact leaf is served."]);
    // Each named cure, read over its own quiet row's rendered sentences (R-CSS-PRESENTATION's over its page, since a style
    // never reaches a rendered sentence), flags it: the quiet input is a member of its family.
    const cures: Readonly<Record<string, (sentences: readonly string[], page: string) => boolean>> = {
      "R-ANAPHORA": sentences => sentences.some((sentence, index) => index > 0 && /^(?:It|This|That)\b/.test(sentence) && servedLeaf(`${sentences[index - 1]} ${sentence}`)),
      // The heading is the page's first rendered sentence; every later unit of its section is read after it.
      "R-HEADING-SCOPE": sentences => sentences.slice(1).some(sentence => servedLeaf(`${sentences[0]} ${sentence}`)),
      "R-PARAPHRASE": sentences => sentences.some(sentence => /\bimpact\b[^,;:]*\bgraph\b/i.test(sentence) && SERVED_WORD.test(sentence)),
      "R-SYNONYM": sentences => sentences.some(sentence => NAMED_LEAF.test(sentence) && /\b(?:available|implemented)\b/i.test(sentence)),
      // The page with each tag whose style displays it as a block read as a break, then rendered by the leg.
      "R-CSS-PRESENTATION": (_sentences, page) =>
        blockUnits(marked.lexer(page.replace(/<[A-Za-z][A-Za-z0-9-]*\s[^>]*\bstyle\s*=\s*"[^"]*\bdisplay\s*:\s*block[^"]*"[^>]*>/g, " ")), [])
          .flatMap(renderedSentences)
          .some(servedLeaf),
      // The sentence before a split that ends with the unlisted abbreviation, read with the sentence after it.
      "R-UNLISTED-ABBREVIATION": sentences =>
        sentences.some((sentence, index) => index > 0 && /\bRef\.$/.test(sentences[index - 1] ?? "") && servedLeaf(`${sentences[index - 1]} ${sentence}`)),
    };
    expect(QUIET.map(([family, path, page]) => `${family}:${cures[family]?.(sentencesOfPage(path), page) === true}`)).toEqual([
      "R-ANAPHORA:true",
      "R-HEADING-SCOPE:true",
      "R-PARAPHRASE:true",
      "R-SYNONYM:true",
      "R-CSS-PRESENTATION:true",
      "R-UNLISTED-ABBREVIATION:true",
    ]);
    expect(QUIET.map(([family, path]) => `${family}:${sentencesOfPage(path).some(servedLeaf)}`)).toEqual([
      "R-ANAPHORA:false",
      "R-HEADING-SCOPE:false",
      "R-PARAPHRASE:false",
      "R-SYNONYM:false",
      "R-CSS-PRESENTATION:false",
      "R-UNLISTED-ABBREVIATION:false",
    ]);
  });
});
