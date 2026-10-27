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
// and serve in every form is the served claim (U3). Refusal #3 engaged the loop cap (rule 19(c)), so cut #4 keeps that
// shape frozen and is written in the enumerate-the-resolvable form: each negative case title claims exactly the set its
// plants pin, the rendered leg cures the refusal's lead-in, table-row and raw-HTML members, and every family member the
// cut knows neither leg reads is a NAMED RESIDUAL with pinned quiet rows (a page that renders exactly its pinned
// sentences, stays quiet, and is flagged by the family's named cure), so silencing a quiet page reds its case. Cut #5
// (refusal #4, the same form) cures the refusal's reference, lead-in and continuation members, pins the list-item lead-in,
// names a raw img's alt text, a mark that ends a name and a marked continuation as residuals, widens R-HIDDEN-CONTENT and
// R-CONFUSABLE to the gate's members, and anchors the residual rows in the out-of-file roster.
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
/** A text that ends with one of `abbreviations` as a word of its own (a word that only ends like one, such as devs., does not). */
const abbreviationEndOf = (abbreviations: readonly string[]): RegExp =>
  new RegExp(
    `(?<![\\p{L}\\p{N}])(?:${abbreviations.map(abbreviation => abbreviation.replaceAll(".", "\\.").replaceAll(" ", "\\s+")).join("|")})$`,
    "iu",
  );
/** A text that ends with one of ABBREVIATIONS as a word of its own. */
const ABBREVIATION_END = abbreviationEndOf(ABBREVIATIONS);
/**
 * A CONTINUATION (refusal #4 U2(b)): text whose first letter is lower-case after any run of opening brackets (Ps), initial
 * and final punctuation (Pi, Pf), dashes (Pd and the Dash property), quotation marks (the Quotation_Mark property) and
 * white space, so the sentence before it goes on ("leaf... (is) served", "leaf... - is served").
 */
const CONTINUATION = /^[\p{Ps}\p{Pi}\p{Pf}\p{Pd}\p{Dash}\p{Quotation_Mark}\s]*\p{Ll}/u;
/**
 * The sentences of one unit, for both legs (refusal #2 U2, refusal #4 U2(b)): the unit splits after ".", "!" or "?" that
 * white space follows, except where the text before ends with one of ABBREVIATIONS or the text after is a CONTINUATION (the
 * reader's sentence goes on: an ellipsis, a full stop that ends a code span, an abbreviation outside the list before a
 * lower-case word, a lower-case word opened by an opening bracket, a quotation mark or a dash), so a reader's single sentence is
 * judged as one through those forms; a terminal mark inside an open parenthetical or quotation, an abbreviation outside the
 * list or a mark that ends a name before a word that is no CONTINUATION, and a continuation opened by a digit or another
 * mark are the named residuals R-ENCLOSED-STOP, R-UNLISTED-ABBREVIATION, R-MARK-IN-NAME and R-MARKED-CONTINUATION.
 * `abbreviationEnd` (ABBREVIATION_END unless given) and `continuation` (CONTINUATION unless given) let the named cures of
 * those residuals re-split with an abbreviation or a name added, or with every mark and digit read past.
 */
function splitSentences(unit: string, abbreviationEnd: RegExp = ABBREVIATION_END, continuation: RegExp = CONTINUATION): string[] {
  const sentences: string[] = [];
  let start = 0;
  for (const gap of unit.matchAll(/(?<=[.!?])\s+/gu)) {
    const end = gap.index + gap[0].length;
    if (abbreviationEnd.test(unit.slice(start, gap.index)) || continuation.test(unit.slice(end))) continue;
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
  return units.flatMap(unit => splitSentences(unit));
}
/** A sentence that names one of the four leaves and a served word. */
const servedLeaf = (sentence: string): boolean => NAMED_LEAF.test(sentence) && SERVED_WORD.test(sentence);
/** SOURCE LEG: every source sentence (sentencesIn) of every file below `dir` that names one of the four leaves and a served word, as `<path>: <sentence>`. */
const servedLeafSentences = (base: string, dir: string): string[] =>
  filesBelow(base, dir).flatMap(path =>
    sentencesIn(readFileSync(join(base, path), "utf8")).filter(servedLeaf).map(sentence => `${path}: ${sentence}`),
  );

// RENDERED LEG (refusal #1 U2, the rendered-text docs truth floor of wb-9x5.17; widened by refusal #2's class-level guard,
// then cured and enumerated by cut #4 and cut #5 in the rule 19(c) form bound at refusal #3), every markdown page below the
// walked directory (any other file renders as its source text: its sentencesIn sentences, folded as below, no reference
// decoded): marked 18.0.11 (the lexer test/helpers/census.ts uses, GFM) lexes the page once into READINGS (blockUnits):
// each sentence of a paragraph, a heading, a code block or the text of a list item or block quote, and, judged whole and
// never split (refusal #3 U1(a), the gate's G06), each table row (the header row, and each body row read after its header
// row, cells joined by a space) and each HTML block. LEAD-IN (refusal #3 U1(a); refusal #4 U2(a) adds the HTML block): a
// paragraph, the text of a list item or an HTML block whose last reading is not ended by ".", "!" or "?" (one ending in
// ":", say) is read before every reading of the next block of its container that renders a reading (a list item by item,
// a table, an HTML block, a code block, a block quote, a paragraph or a heading), and stays in place across the blocks
// that render none (such as a blank line, a comment, a link definition or a thematic break). A unit renders its text, code
// spans and backslash escapes as written, and emphasis, strong, strikethrough, link text and image alt text flattened (a
// link's destination and title are never read, except where the destination is the link's text, as in an autolink); a
// task checkbox renders nothing; a soft wrap or a hard break renders as white space; raw HTML, an inline HTML token or an
// HTML block's source, renders by these rules (renderHtml; refusal #2 U1, refusal #3 U1(b)): a comment (<!-->, <!---> or
// to the first --> or --!>, an unclosed one to its end), a markup declaration, CDATA section or processing instruction (a
// bogus comment, <! or <? to the first >) and an end tag opener followed by > or by a character other than a letter (to
// the first >) render nothing, and a tag (its name, then everything to its first > outside an attribute value its
// quotation mark closes) renders as white space when it names one of BREAK_ELEMENTS and as nothing otherwise. REFERENCES
// (refusal #4 U1), outside code: in markdown text a reference of CommonMark's form, closed by ";" (1 to 7 decimal digits,
// 1 to 6 hexadecimal digits, or a name of 2 to 32 letters and digits), decodes, a numeric one by numericReference (the
// HTML tokenizer's numeric end state: U+0000, a surrogate or a value past U+10FFFF reads U+FFFD, and a C1 code point in
// C1_REMAP reads as its windows-1252 character; marked passes such a reference to the page as written) and a named one by
// NAMED_REFERENCES, while any other "&" stays as written (marked escapes an unterminated reference, the gate's P01m; the
// forms it passes as written, a name that opens with a digit, has one letter or runs past 32, either stay as written for a
// reader or decode only a legacy name glued to the rest of its run, which completes no leaf word); in raw HTML a
// numeric reference with or
// without its semicolon and of any length decodes by numericReference, and a letters-and-digits run that is no closed name
// of 2 to 32 decodes by the longest legacy name it opens with (LEGACY_REFERENCES, the 106 names the tokenizer's table also
// lists without a semicolon; a run that opens with none stays as written), each as the HTML tokenizer decodes it, while a
// closed name of 2 to 32 decodes by NAMED_REFERENCES. In either, a closed named reference outside NAMED_REFERENCES is
// recorded, and the live pages must carry none. The FOLDED KEY then applies: NFKD with combining marks dropped, format code
// points (Cf) dropped, every white-space run one space, control code points (Cc) dropped, every dash (Pd) and the minus
// sign read as "-". A unit splits into sentences by splitSentences (after ".", "!" or "?" that white space follows, never
// after one of ABBREVIATIONS or before a CONTINUATION, text whose first letter is lower-case after any run of opening
// brackets, initial and final punctuation, dashes, quotation marks and white space; refusal #2 U2, refusal #4 U2(b)), and
// a reading naming a leaf and a served word
// (SERVED_WORD, serve in every form; refusal #2 U3) is a served sentence. RESIDUALS, each a named family whose planted
// quiet rows below are read and stay quiet, each with the named cure that flags them: R-ANAPHORA, the served word in a
// later sentence that points back to the leaf ("It is served."; cure: a sentence opening with It, This or That is also
// read after the sentence before it); R-HEADING-SCOPE, the served word in a heading over any block of its section that
// names the leaf ("## Served leaves" over "- graph impact" or over a table; cure: read each reading of a section after its
// heading); R-PARAPHRASE, the leaf named in other words ("the impact leaf of rf graph"; cure: read the leaf words in either
// order within a clause); R-SYNONYM, the claim in other words than serve ("available", "implemented"; cure: widen
// SERVED_WORD); R-CSS-PRESENTATION, an element a style displays as a block ('graph<span style="display:block">impact</span>';
// the leg reads HTML by element, never by style; cure: read a block display style as a break); R-UNLISTED-ABBREVIATION,
// the full stop of an abbreviation outside ABBREVIATIONS (an unlisted one such as "Ref." or "Fig.", a spaced spelling of a
// listed one such as "e. g.", or an initial such as "J.") before a word that is no CONTINUATION, a capitalized word or a
// digit ("(Ref. Pi) is served.", "see Fig. 2, is served."; cure: add it to ABBREVIATIONS). Cut #4's residuals (refusal #3;
// the enumeration case): R-ENCLOSED-STOP, a ".", "!" or "?" inside a parenthetical or quotation still open in its sentence
// (parentheses, brackets, straight or curly quotation marks, guillemets) before a word that is no CONTINUATION ("(ready?
// Yes)" and '"Phase 2. Final"', the gate's G30 and G31; cure: keep a unit whole while an enclosure opened in it is open;
// that cure also reads the frozen R-UNLISTED-ABBREVIATION quiet row "(Ref. Pi)" whole, so curing the family would re-scope
// a frozen quiet row, and cut #4 names it instead); R-LEAD-IN-ACROSS-CONTAINER, a lead-in that ends a container (a block
// quote, a list item) over the block after that container (cure: read a reading not ended by ".", "!" or "?" before the
// reading after it); R-HIDDEN-CONTENT, text a reader never sees, such as the content of a display:none element of the
// rendering section (script), of an element carrying hidden, or (cut #5, the gate's P07) of an element whose inline style
// declares display:none or visibility:hidden, glued between the leaf words (cure: drop that content); R-LEAF-SPELLING,
// the leaf words run together, in camel case, or joined by a slash or a colon ("graph/impact", "graphImpact"; cure: read
// those spellings as the leaf); R-CONFUSABLE, a letter of another script that renders like a Latin one and that NFKD
// keeps, such as a Cyrillic or Greek a, e, o, p, c, i, x or y or (cut #5, the gate's P09) an Armenian o (cure: read it as
// that Latin letter, by CONFUSABLE); R-ELLIPSIS, the served word opening a later sentence whose subject the sentence before
// names ("The rf graph impact leaf. Served by this build."; cure: read a sentence that opens with the served word after
// the sentence before it). Cut #5's residuals (refusal #4; the enumeration case): R-RAW-ALT-TEXT, the alt text of a raw
// HTML img, which the leg reads as white space although it reads a markdown image's alt text, the same rendered view
// ('graph <img src="x.png" alt="impact"> leaf', the gate's P04; cure: read a raw img as its alt text); R-MARK-IN-NAME, a
// ".", "!" or "?" that ends a name inside its sentence (Yahoo!, the gate's P06) before a word that is no CONTINUATION
// (cure: add the name to ABBREVIATIONS); R-MARKED-CONTINUATION, a continuation whose first letter is lower-case but which
// opens with a digit or with a mark CONTINUATION does not read past (any but the Ps, Pi, Pf and Pd marks, the Dash and
// Quotation_Mark characters and white space), such as an arrow ("leaf... -> is served" with a U+2192 arrow) or a count
// ("leaf... 2 builds serve it")
// (cure: read past every mark and digit before the continuation's first letter).
const at = (code: number): string => String.fromCodePoint(code);
/** The names the rendered leg decodes in a reference closed by ";"; any other closed named reference is recorded as unreadable. */
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
/** The C1 code points the HTML tokenizer's numeric end state remaps, each to its windows-1252 character (&#150; an en dash). */
const C1_REMAP: ReadonlyMap<number, number> = new Map([
  [0x80, 0x20ac],
  [0x82, 0x201a],
  [0x83, 0x192],
  [0x84, 0x201e],
  [0x85, 0x2026],
  [0x86, 0x2020],
  [0x87, 0x2021],
  [0x88, 0x2c6],
  [0x89, 0x2030],
  [0x8a, 0x160],
  [0x8b, 0x2039],
  [0x8c, 0x152],
  [0x8e, 0x17d],
  [0x91, 0x2018],
  [0x92, 0x2019],
  [0x93, 0x201c],
  [0x94, 0x201d],
  [0x95, 0x2022],
  [0x96, 0x2013],
  [0x97, 0x2014],
  [0x98, 0x2dc],
  [0x99, 0x2122],
  [0x9a, 0x161],
  [0x9b, 0x203a],
  [0x9c, 0x153],
  [0x9e, 0x17e],
  [0x9f, 0x178],
]);
/** A numeric reference's character by the HTML tokenizer's numeric end state: U+FFFD for U+0000, a surrogate or a value past U+10FFFF, C1_REMAP's character for a remapped C1 code point, else the code point. */
const numericReference = (code: number): string =>
  code === 0 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff) ? at(0xfffd) : at(C1_REMAP.get(code) ?? code);
/** The legacy names from U+00A0 to U+00FF, in code point order. */
const LATIN1_LEGACY_NAMES: readonly string[] = (
  "nbsp iexcl cent pound curren yen brvbar sect uml copy ordf laquo not shy reg macr deg plusmn sup2 sup3 acute micro para " +
  "middot cedil sup1 ordm raquo frac14 frac12 frac34 iquest Agrave Aacute Acirc Atilde Auml Aring AElig Ccedil Egrave Eacute " +
  "Ecirc Euml Igrave Iacute Icirc Iuml ETH Ntilde Ograve Oacute Ocirc Otilde Ouml times Oslash Ugrave Uacute Ucirc Uuml Yacute " +
  "THORN szlig agrave aacute acirc atilde auml aring aelig ccedil egrave eacute ecirc euml igrave iacute icirc iuml eth ntilde " +
  "ograve oacute ocirc otilde ouml divide oslash ugrave uacute ucirc uuml yacute thorn yuml"
).split(" ");
/**
 * The legacy names: the 106 names the HTML named character reference table also lists without a semicolon (the 96 from
 * U+00A0 to U+00FF, and amp, AMP, lt, LT, gt, GT, quot, QUOT, COPY and REG), which the tokenizer decodes in text whatever
 * follows them, by name.
 */
const LEGACY_REFERENCES: ReadonlyMap<string, string> = new Map<string, string>([
  ...LATIN1_LEGACY_NAMES.map((name, index): [string, string] => [name, at(0xa0 + index)]),
  ["amp", "&"],
  ["AMP", "&"],
  ["lt", "<"],
  ["LT", "<"],
  ["gt", ">"],
  ["GT", ">"],
  ["quot", '"'],
  ["QUOT", '"'],
  ["COPY", at(0xa9)],
  ["REG", at(0xae)],
]);
const LEGACY_LONGEST = Math.max(...[...LEGACY_REFERENCES.keys()].map(name => name.length));
/** The longest legacy name `run` opens with, or undefined: the tokenizer matches the longest name it can. */
function legacyPrefix(run: string): string | undefined {
  for (let length = Math.min(run.length, LEGACY_LONGEST); length >= 2; length -= 1) {
    const name = run.slice(0, length);
    if (LEGACY_REFERENCES.has(name)) return name;
  }
  return undefined;
}
/** A reference in raw HTML: hexadecimal or decimal digits with an optional semicolon, a closed name of 2 to 32, or a letters-and-digits run. */
const RAW_REFERENCE = /&(?:#[xX]([0-9a-fA-F]+);?|#(\d+);?|([A-Za-z][A-Za-z0-9]{1,31});|([A-Za-z][A-Za-z0-9]*))/g;
/** The folded key's rewrites after NFKD and dropping combining marks, in order. */
const FOLD: ReadonlyArray<readonly [RegExp, string]> = [
  [/\p{Cf}/gu, ""],
  [/\s+/gu, " "],
  [/\p{Cc}/gu, ""],
  [/[\p{Pd}\u{2212}]/gu, "-"],
  [/ {2,}/g, " "],
];
/**
 * Raw HTML's markup (refusal #3 U1(b)), tried in this order at each "<": a comment (<!--> and <!---> are empty, any other
 * runs to the first --> or --!>, an unclosed one to its end); a markup declaration, CDATA section or processing
 * instruction, read as a bogus comment (<! or <? to the first >); an end tag opener followed by > or by a character other
 * than a letter (to the first >); and a tag, whose name (group 1) runs to white space, "/" or ">" and which then runs to
 * its first > outside an attribute value its quotation mark closes (an unclosed tag to its end).
 */
const HTML_MARKUP =
  /<!--(?:-?>|[\s\S]*?(?:--!?>|$))|<[!?][^>]*(?:>|$)|<\/(?:>|[^A-Za-z>][^>]*(?:>|$))|<\/?([A-Za-z][^\t\n\f\r />]*)(?:\s*=\s*(?:"[^"]*"|'[^']*')|[^>])*?(?:>|$)/g;
/**
 * The elements whose tags the rendered leg reads as white space (refusal #2 U1, refusal #3 U1(b)): br; every element the
 * HTML rendering section's user-agent style sheet displays as a block, list-item or table box (cut #4 adds hgroup,
 * listing, plaintext and xmp, the gate's G11 and G21); the replaced and inline-block elements whose box parts the words
 * around it (cut #4: audio, button, canvas, embed, iframe, image, img, input, marquee, meter, object, progress, select,
 * svg, textarea and video); and the rest of CommonMark's start condition 6 names, which render nothing to a reader, so
 * reading them as white space errs toward flagging, never toward an escape.
 */
const BREAK_ELEMENTS: ReadonlySet<string> = new Set([
  "br", "pre", "address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd",
  "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1",
  "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "meta",
  "nav", "noframes", "ol", "optgroup", "option", "p", "param", "search", "section", "summary", "table", "tbody", "td", "tfoot", "th",
  "thead", "title", "tr", "track", "ul", "hgroup", "listing", "plaintext", "xmp", "audio", "button", "canvas", "embed", "image",
  "img", "input", "marquee", "meter", "object", "progress", "select", "svg", "textarea", "video",
]);
/** Raw HTML's markup rendered (see HTML_MARKUP): a tag of BREAK_ELEMENTS renders one space, any other markup nothing. */
const renderHtml = (raw: string): string =>
  raw.replace(HTML_MARKUP, (_markup: string, tag?: string) => (tag !== undefined && BREAK_ELEMENTS.has(tag.toLowerCase()) ? " " : ""));
const MARKDOWN_PAGE = /\.(?:md|markdown)$/i;

/** Markdown text with each reference of CommonMark's form decoded (numericReference, NAMED_REFERENCES); any other closed named reference stays as written and is recorded in `unknown`. */
function decodeReferences(text: string, unknown: string[]): string {
  return text.replace(REFERENCE, (whole: string, decimal?: string, hex?: string, name?: string) => {
    const code = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    if (code !== undefined) return numericReference(code);
    const value = NAMED_REFERENCES.get(name ?? "");
    if (value === undefined) unknown.push(whole);
    return value ?? whole;
  });
}
/**
 * Raw HTML text (an HTML block, or the text an inline HTML token carries) with its references decoded (refusal #4 U1): a
 * numeric reference with or without its semicolon and of any length by numericReference, and a letters-and-digits run
 * that is no closed name of 2 to 32 by the longest legacy name it opens with (the rest of the run as written), each as the
 * HTML tokenizer decodes it; a closed name of 2 to 32 by NAMED_REFERENCES, any other recorded in `unknown` as written.
 */
function decodeRawHtmlReferences(text: string, unknown: string[]): string {
  return text.replace(RAW_REFERENCE, (whole: string, hex?: string, decimal?: string, closed?: string, run?: string) => {
    if (hex !== undefined) return numericReference(Number.parseInt(hex, 16));
    if (decimal !== undefined) return numericReference(Number.parseInt(decimal, 10));
    if (closed !== undefined) {
      const value = NAMED_REFERENCES.get(closed);
      if (value === undefined) unknown.push(whole);
      return value ?? whole;
    }
    const letters = run ?? "";
    const name = legacyPrefix(letters);
    return name === undefined ? whole : `${LEGACY_REFERENCES.get(name) ?? ""}${letters.slice(name.length)}`;
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
    if (token.type === "html") out += decodeRawHtmlReferences(renderHtml(token.raw), unknown);
    else if (token.type === "br") out += " ";
    else if (token.type === "codespan" || token.type === "escape") out += tokenText(token);
    else if (tokenChildren(token).length > 0) out += inlineText(tokenChildren(token), unknown);
    else out += decodeReferences(tokenText(token), unknown);
  }
  return out;
}
/** A unit's readings in the FOLDED KEY: its sentences, or the whole unit (a table row, an HTML block) when `whole`; an empty unit renders none. */
const readingsOf = (unit: string, whole: boolean): string[] => {
  const folded = foldKey(unit);
  if (!whole) return splitSentences(folded);
  return folded === "" ? [] : [folded];
};
/** The readings one block token renders (see the RENDERED LEG), in page order. */
function tokenReadings(token: Token, unknown: string[]): string[] {
  if (token.type === "space" || token.type === "hr" || token.type === "def" || token.type === "checkbox") return [];
  if (token.type === "html") return readingsOf(decodeRawHtmlReferences(renderHtml(token.raw), unknown), true);
  if (token.type === "code") return readingsOf(tokenText(token), false);
  if (isTableToken(token)) {
    const header = token.header.map(cell => inlineText(cell.tokens, unknown)).join(" ");
    const rows = token.rows.map(row => `${header} ${row.map(cell => inlineText(cell.tokens, unknown)).join(" ")}`);
    return [header, ...rows].flatMap(row => readingsOf(row, true));
  }
  if (isListToken(token)) return token.items.flatMap(item => blockUnits(item.tokens, unknown));
  if (token.type === "blockquote") return blockUnits(tokenChildren(token), unknown);
  const children = tokenChildren(token);
  return readingsOf(children.length > 0 ? inlineText(children, unknown) : decodeReferences(tokenText(token), unknown), false);
}
/**
 * The READINGS a run of block tokens renders, in order (see the RENDERED LEG): a paragraph, the text of a list item or an
 * HTML block whose last reading is not ended by ".", "!" or "?" is a lead-in, read before every reading of the next block
 * that renders one, and a block that renders none leaves it in place.
 */
function blockUnits(tokens: readonly Token[], unknown: string[]): string[] {
  const out: string[] = [];
  let leadIn = "";
  for (const token of tokens) {
    const own = tokenReadings(token, unknown);
    if (own.length === 0) continue;
    const lead = leadIn;
    const readings = lead === "" ? own : own.map(reading => `${lead} ${reading}`);
    out.push(...readings);
    const last = token.type === "paragraph" || token.type === "text" || token.type === "html" ? (readings.at(-1) ?? "") : "";
    leadIn = /[.!?]$/.test(last) ? "" : last;
  }
  return out;
}
/** RENDERED LEG: every reading of every file below `dir`, as [path, reading]; each named reference a markdown page carries that the leg cannot decode goes to `unknown` as `<path>: <reference>`. */
function renderedSentencesBelow(base: string, dir: string, unknown: string[]): (readonly [string, string])[] {
  return filesBelow(base, dir).flatMap(path => {
    const source = readFileSync(join(base, path), "utf8");
    const missed: string[] = [];
    const readings = MARKDOWN_PAGE.test(path) ? blockUnits(marked.lexer(source), missed) : sentencesIn(source).flatMap(renderedSentences);
    unknown.push(...missed.map(reference => `${path}: ${reference}`));
    return readings.map(reading => [path, reading] as const);
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

// Cut #4 residual cures (refusal #3, rule 19(c)): the named cure of each residual family the enumeration case pins, read
// over its quiet rows only; neither leg applies one.
type ResidualCure = (sentences: readonly string[], page: string) => boolean;
/** Whether a parenthesis, bracket or quotation opened in `text` is still open (an apostrophe inside a word is no quotation mark). */
function enclosureOpen(text: string): boolean {
  const bare = text.replace(/(?<=\p{L})['\u{2019}](?=\p{L})/gu, "");
  const count = (pattern: RegExp): number => bare.match(pattern)?.length ?? 0;
  return (
    count(/[([{]/g) > count(/[)\]}]/g) ||
    count(/"/g) % 2 === 1 ||
    count(/'/g) % 2 === 1 ||
    count(/[\u{201c}\u{00ab}]/gu) > count(/[\u{201d}\u{00bb}]/gu) ||
    count(/\u{2018}/gu) > count(/\u{2019}/gu)
  );
}
/** R-ENCLOSED-STOP: the sentences re-joined while an enclosure opened before a split is still open. */
const enclosedCure: ResidualCure = sentences => {
  const joined: string[] = [];
  let open = "";
  for (const sentence of sentences) {
    open = open === "" ? sentence : `${open} ${sentence}`;
    if (!enclosureOpen(open)) {
      joined.push(open);
      open = "";
    }
  }
  return [...joined, ...(open === "" ? [] : [open])].some(servedLeaf);
};
/** R-UNLISTED-ABBREVIATION: the page's rendered text re-split with `abbreviation` added to ABBREVIATIONS. */
const abbreviationCure =
  (abbreviation: string): ResidualCure =>
  sentences =>
    splitSentences(sentences.join(" "), abbreviationEndOf([...ABBREVIATIONS, abbreviation])).some(servedLeaf);
/** R-HEADING-SCOPE: every later reading of the section read after its heading, the page's first reading. */
const headingScopeCure: ResidualCure = sentences => sentences.slice(1).some(sentence => servedLeaf(`${sentences[0]} ${sentence}`));
/** R-LEAD-IN-ACROSS-CONTAINER: a reading not ended by ".", "!" or "?" read before the reading after it. */
const containerLeadInCure: ResidualCure = sentences =>
  sentences.some((sentence, index) => index > 0 && !/[.!?]$/.test(sentences[index - 1] ?? "") && servedLeaf(`${sentences[index - 1]} ${sentence}`));
/**
 * The content of an element a reader never sees: a display:none element of the rendering section, one carrying hidden, or
 * (cut #5) one whose inline style declares display:none or visibility:hidden.
 */
const HIDDEN_CONTENT =
  /<(script|style|template|title|head|noembed|noframes|datalist|rp)\b[^>]*>[\s\S]*?<\/\1\s*>|<([A-Za-z][\w-]*)\b[^>]*\shidden\b[^>]*>[\s\S]*?<\/\2\s*>|<([A-Za-z][\w-]*)\b[^>]*\sstyle\s*=\s*(?:"[^"]*\b(?:display\s*:\s*none|visibility\s*:\s*hidden)\b[^"]*"|'[^']*\b(?:display\s*:\s*none|visibility\s*:\s*hidden)\b[^']*')[^>]*>[\s\S]*?<\/\3\s*>/gi;
/** R-HIDDEN-CONTENT: the page with that content dropped, then read by the leg. */
const hiddenContentCure: ResidualCure = (_sentences, page) => blockUnits(marked.lexer(page.replace(HIDDEN_CONTENT, "")), []).some(servedLeaf);
/** The leaf words run together, in camel case, or joined by a slash or a colon. */
const LEAF_SPELLING = /\b(?:graph[/:]?(?:impact|candidate)|(?:optic|view)[/:]?list)\b/i;
/** R-LEAF-SPELLING: a reading naming the leaf in one of those spellings and a served word. */
const leafSpellingCure: ResidualCure = sentences => sentences.some(sentence => LEAF_SPELLING.test(sentence) && SERVED_WORD.test(sentence));
/** Letters of another script that render like a Latin one, which NFKD keeps, by the Latin letter: Cyrillic, Greek and (cut #5) Armenian. */
const CONFUSABLE: ReadonlyMap<string, string> = new Map([
  [at(0x430), "a"],
  [at(0x435), "e"],
  [at(0x43e), "o"],
  [at(0x440), "p"],
  [at(0x441), "c"],
  [at(0x443), "y"],
  [at(0x445), "x"],
  [at(0x456), "i"],
  [at(0x3b1), "a"],
  [at(0x3bf), "o"],
  [at(0x585), "o"],
]);
/** R-CONFUSABLE: each reading with those letters read as their Latin letter. */
const confusableCure: ResidualCure = sentences => sentences.some(sentence => servedLeaf([...sentence].map(letter => CONFUSABLE.get(letter) ?? letter).join("")));
/** A reading that opens with the served word. */
const SERVED_OPENING = /^serv(?:e|es|ed|ing)\b/i;
/** R-ELLIPSIS: a reading that opens with the served word read after the reading before it. */
const ellipsisCure: ResidualCure = sentences =>
  sentences.some((sentence, index) => index > 0 && SERVED_OPENING.test(sentence) && servedLeaf(`${sentences[index - 1]} ${sentence}`));
// Cut #5 residual cures (refusal #4, rule 19(c)), read over their quiet rows only, like cut #4's; neither leg applies one.
/** A raw img tag that carries an alt attribute, its value double-quoted, single-quoted or bare. */
const RAW_ALT_TAG = /<img\b[^>]*?\salt\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))[^>]*>/gi;
/** R-RAW-ALT-TEXT: the page with each raw img read as its alt text, as the leg reads a markdown image, then read by the leg. */
const rawAltTextCure: ResidualCure = (_sentences, page) =>
  blockUnits(marked.lexer(page.replace(RAW_ALT_TAG, (_tag: string, double?: string, single?: string, bare?: string) => double ?? single ?? bare ?? "")), []).some(
    servedLeaf,
  );
/** R-MARK-IN-NAME: the page's rendered text re-split with `name` (a name that ends in a mark, such as Yahoo!) added to ABBREVIATIONS. */
const markInNameCure = (name: string): ResidualCure => abbreviationCure(name);
/** R-MARKED-CONTINUATION: the page's rendered text re-split reading past every mark and digit before a continuation's first letter. */
const markedContinuationCure: ResidualCure = sentences => splitSentences(sentences.join(" "), ABBREVIATION_END, /^[^\p{L}]*\p{Ll}/u).some(servedLeaf);
/** The out-of-file roster whose residualRows anchor the residual enumeration's row list (refusal #4 F7). */
const RESIDUAL_ROSTER = "test/fixtures/docs19-scg-worker-role-roster.json";
/** Every residual family (R-...) a text names, once each, sorted. */
const familiesNamed = (text: string): string[] => [...new Set(text.match(/\bR-[A-Z]+(?:-[A-Z]+)*\b/g) ?? [])].sort();
/** This file's RENDERED LEG comment: the leg's own statement of its rules and of its named residuals. */
function renderedLegComment(): string {
  const lines = readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n");
  const start = lines.findIndex(line => line.startsWith("// RENDERED LEG"));
  const end = lines.findIndex((line, index) => index > start && !line.startsWith("//"));
  if (start < 0 || end < 0) throw new Error("this file carries no RENDERED LEG comment");
  return lines.slice(start, end).join("\n");
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
  it("SCG-R15 negative: no docs/workbench sentence, as the source and the rendered leg read it outside the named residuals, lists graph impact, graph candidate, optic list or view list as served", () => {
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

  it("SCG-R15 negative, rendered leg (refusal #1 U2): the 21 pinned served plants red as a reader sees them (white space, inline markup, references, soft wraps and breaks, a quote, a list, a heading, a table, a lead-in over a list, an HTML block, a code block, a non-markdown page) and the 6 pinned quiet plants stay quiet", () => {
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

  it("SCG-R15 negative, refusal #2 class guard (U1-U3): br in its five pinned spellings and the pinned block-level tags (p, div, h2, and table, tr and td) read as white space, a listed abbreviation or a stop directly before a lower-case letter (after an ellipsis, a code span's full stop, a question mark in parentheses) never ends a reader's sentence, and serve, serves, served and serving are the served claim", () => {
    const base = plantRoot("scg-r15-class-guard-");
    // (i) Rendered text (refusal #2 U1): a tag a reader sees as white space or a line break, br in five spellings of case,
    // self-closing form and attributes, and a block-level tag met inline, in a paragraph, a table cell or an HTML block
    // (h01, h02, h03 and h04 are the gate's L23, L25, L26 and L43; refusal #3's further members are the cut #4 cures case's).
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

  it("SCG-R15 negative, refusal #3 cures (cut #4): the 27 pinned served plants red (a paragraph lead-in over a table, an HTML list, a code block, a quote, a paragraph or a heading, kept across a comment, a link definition and a thematic break and read before each reading of an item; a table row and an HTML table row judged whole; a quoted '>' in an attribute, hgroup, listing, xmp, plaintext, img and button, a processing instruction, a CDATA section and a declaration, an empty comment, a --!> close, a bogus end tag, a stray solidus and the text after a bogus comment's first '>') and the 4 pinned quiet plants stay quiet", () => {
    const base = plantRoot("scg-r15-cut4-cures-");
    // U1(a) lead-in structure (a01 to a05 are the gate's G01 to G05) and the whole table row (a06 is G06), with the further
    // members cut #4 reads: a lead-in over a paragraph or a heading, kept across blocks that render nothing, read before
    // every reading of the next block, and an HTML table row judged with its HTML block.
    plantFile(base, "docs/a01-lead-in-table.md", "The leaves this build serves:\n\n| Leaf | Notes |\n| --- | --- |\n| graph impact | slice 17 |\n");
    plantFile(base, "docs/a02-lead-in-html-list.md", "The leaves this build serves:\n\n<ul>\n<li>graph impact</li>\n</ul>\n");
    plantFile(base, "docs/a03-lead-in-code.md", "The leaves this build serves:\n\n```text\ngraph impact\n```\n");
    plantFile(base, "docs/a04-lead-in-quote.md", "The leaves this build serves:\n\n> graph impact\n");
    plantFile(base, "docs/a05-lead-in-names-leaf.md", "The rf graph impact leaf, by status:\n\n| Status | Since |\n| --- | --- |\n| served | rf 0.1.845 |\n");
    plantFile(base, "docs/a06-table-row-whole.md", "| Leaf | Status |\n| --- | --- |\n| The graph impact leaf. | Served by this build. |\n");
    plantFile(base, "docs/a07-lead-in-paragraph.md", "The leaves this build serves:\n\ngraph impact and view list\n");
    plantFile(base, "docs/a08-lead-in-heading.md", "The leaves this build serves:\n\n## graph impact\n");
    plantFile(base, "docs/a09-lead-in-kept.md", "The leaves this build serves:\n\n<!-- the list follows -->\n\n[ref]: https://example.invalid/r\n\n***\n\n- graph impact\n");
    plantFile(base, "docs/a10-lead-in-each-reading.md", "The leaves this build serves:\n\n- Ready. Graph impact\n");
    plantFile(base, "docs/a11-html-table-row.md", "<table><tr><td>The graph impact leaf.</td><td>Served by this build.</td></tr></table>\n");
    // U1(b) raw HTML as a reader sees it: a quoted attribute value holding ">" (b01 is G10), the block-level elements the
    // rendering section adds (b03 and b04 are G11 and G21), a replaced and an inline-block element, the processing
    // instruction, CDATA section and declaration that render nothing (b09 to b11 are G15 to G17), in an HTML block the empty
    // comment, the --!> close, the bogus end tag and a tag the HTML tokenizer reads past a stray solidus, and the text after
    // a bogus comment's first ">", which a reader reads with its references decoded.
    plantFile(base, "docs/b01-quoted-gt.md", 'The rf graph<br title=">">impact leaf is served by this build.\n');
    plantFile(base, "docs/b02-single-quoted-gt.md", "The rf view<br title='>'>list leaf is served by this build.\n");
    plantFile(base, "docs/b03-hgroup.md", "The rf graph<hgroup>impact</hgroup> leaf is served by this build.\n");
    plantFile(base, "docs/b04-listing.md", "The rf graph<listing>impact</listing> leaf is served by this build.\n");
    plantFile(base, "docs/b05-xmp.md", "The rf optic<xmp>list</xmp> leaf is served by this build.\n");
    plantFile(base, "docs/b06-plaintext.md", "The rf view<plaintext>list leaf is served by this build.\n");
    plantFile(base, "docs/b07-replaced.md", 'The rf graph<img src="x.png" alt="">impact leaf is served by this build.\n');
    plantFile(base, "docs/b08-inline-block.md", "The rf graph<button>candidate</button> leaf is served by this build.\n");
    plantFile(base, "docs/b09-processing-instruction.md", "The rf graph <?x?> impact leaf is served by this build.\n");
    plantFile(base, "docs/b10-cdata.md", "The rf graph <![CDATA[x]]> impact leaf is served by this build.\n");
    plantFile(base, "docs/b11-declaration.md", "The rf graph <!X y> impact leaf is served by this build.\n");
    plantFile(base, "docs/b12-empty-comment.md", "<div>\nThe rf graph impact leaf <!--> is served.\n</div>\n");
    plantFile(base, "docs/b13-bang-close.md", "<div>\n<!-- a note --!> The rf graph impact leaf is served.\n</div>\n");
    plantFile(base, "docs/b14-bogus-end-tag.md", "<div>\nThe rf graph</ x> impact leaf is served.\n</div>\n");
    plantFile(base, "docs/b15-stray-solidus.md", "<div>\nThe rf graph<br/ >impact leaf is served.\n</div>\n");
    plantFile(base, "docs/b16-bogus-comment-text.md", "The rf <?x >graph&period;impact?> leaf is served.\n");
    // Quiet: the cures are no wider than their claims. A wbr renders nothing; outside an HTML block a bogus end tag is no
    // HTML token, so a reader sees it as written; a paragraph ended by a full stop leads nothing; and a lead-in is read
    // before the next block that renders a reading only, never past it.
    plantFile(base, "docs/bq1-wbr.md", "The rf graph<wbr>impact leaf is served.\n");
    plantFile(base, "docs/bq2-literal-end-tag.md", "The rf graph</ x> impact leaf is served.\n");
    plantFile(base, "docs/bq3-closed-paragraph.md", "The leaves this build serves.\n\n| Leaf |\n| --- |\n| graph impact |\n");
    plantFile(base, "docs/bq4-lead-in-used.md", "The leaves this build serves:\n\nSee below.\n\n- graph impact\n");
    const unknown: string[] = [];
    expect(renderedServedLeafSentences(base, "docs", unknown)).toEqual([
      "docs/a01-lead-in-table.md: The leaves this build serves: Leaf Notes graph impact slice 17",
      "docs/a02-lead-in-html-list.md: The leaves this build serves: graph impact",
      "docs/a03-lead-in-code.md: The leaves this build serves: graph impact",
      "docs/a04-lead-in-quote.md: The leaves this build serves: graph impact",
      "docs/a05-lead-in-names-leaf.md: The rf graph impact leaf, by status: Status Since served rf 0.1.845",
      "docs/a06-table-row-whole.md: Leaf Status The graph impact leaf. Served by this build.",
      "docs/a07-lead-in-paragraph.md: The leaves this build serves: graph impact and view list",
      "docs/a08-lead-in-heading.md: The leaves this build serves: graph impact",
      "docs/a09-lead-in-kept.md: The leaves this build serves: graph impact",
      "docs/a10-lead-in-each-reading.md: The leaves this build serves: Graph impact",
      "docs/a11-html-table-row.md: The graph impact leaf. Served by this build.",
      "docs/b01-quoted-gt.md: The rf graph impact leaf is served by this build.",
      "docs/b02-single-quoted-gt.md: The rf view list leaf is served by this build.",
      "docs/b03-hgroup.md: The rf graph impact leaf is served by this build.",
      "docs/b04-listing.md: The rf graph impact leaf is served by this build.",
      "docs/b05-xmp.md: The rf optic list leaf is served by this build.",
      "docs/b06-plaintext.md: The rf view list leaf is served by this build.",
      "docs/b07-replaced.md: The rf graph impact leaf is served by this build.",
      "docs/b08-inline-block.md: The rf graph candidate leaf is served by this build.",
      "docs/b09-processing-instruction.md: The rf graph impact leaf is served by this build.",
      "docs/b10-cdata.md: The rf graph impact leaf is served by this build.",
      "docs/b11-declaration.md: The rf graph impact leaf is served by this build.",
      "docs/b12-empty-comment.md: The rf graph impact leaf is served.",
      "docs/b13-bang-close.md: The rf graph impact leaf is served.",
      "docs/b14-bogus-end-tag.md: The rf graph impact leaf is served.",
      "docs/b15-stray-solidus.md: The rf graph impact leaf is served.",
      "docs/b16-bogus-comment-text.md: The rf graph.impact?> leaf is served.",
    ]);
    expect(unknown).toEqual([]);
    // The quiet pages are read: each renders exactly these readings.
    const read = renderedSentencesBelow(base, "docs", []);
    const readingsOfPage = (path: string): string[] => read.filter(([page]) => page === path).map(([, sentence]) => sentence);
    expect(["bq1-wbr", "bq2-literal-end-tag", "bq3-closed-paragraph", "bq4-lead-in-used"].map(name => readingsOfPage(`docs/${name}.md`))).toEqual([
      ["The rf graphimpact leaf is served."],
      ["The rf graph</ x> impact leaf is served."],
      ["The leaves this build serves.", "Leaf", "Leaf graph impact"],
      ["The leaves this build serves:", "The leaves this build serves: See below.", "graph impact"],
    ]);
    // The source leg reads the same plants: it reads a tag, a table cell or an HTML block as its source spells it, so of
    // these it flags only the HTML blocks whose source sentence names the leaf and the served word.
    expect(servedLeafSentences(base, "docs")).toEqual([
      "docs/a11-html-table-row.md: <table><tr><td>The graph impact leaf.</td><td>Served by this build.</td></tr></table>",
      "docs/b12-empty-comment.md: <div> The rf graph impact leaf <!--> is served.",
      "docs/b13-bang-close.md: <div> <!-- a note --!> The rf graph impact leaf is served.",
    ]);
  });

  it("SCG-R15 negative, refusal #4 cures (cut #5): the 16 pinned served plants red (in raw HTML a numeric reference without its semicolon, decimal, hexadecimal or of twelve digits, and a legacy named reference without one, by longest match; a C1 numeric reference remapped as the HTML tokenizer remaps it, in raw HTML or in markdown text; the text an inline HTML token carries; an HTML block lead-in over a list or a table; a list item's lead-in over its nested list; a lower-case continuation opened by an opening bracket, a quotation mark or a dash; a markdown image's alt text) and the 4 pinned quiet plants stay quiet", () => {
    const base = plantRoot("scg-r15-cut5-cures-");
    // U1 (refusal #4; c01 to c03 are the gate's P01, P01h and P02): in raw HTML, an HTML block or the text an inline HTML
    // token carries, references decode as the HTML tokenizer decodes them: a numeric reference with or without its
    // semicolon and of any length, a legacy named reference without one by longest match (gr&aacuteph reads graph), and a
    // C1 code point remapped by the tokenizer's table (&#150 reads an en dash, which the folded key reads "-"); in markdown
    // text, where marked passes a terminated reference to the page as written, the C1 remap applies too.
    plantFile(base, "docs/c01-numeric-no-semicolon.md", "<div>\nThe rf graph&#32impact leaf is served by this build.\n</div>\n");
    plantFile(base, "docs/c02-hex-no-semicolon.md", "<div>\nThe rf graph&#x20impact leaf is served by this build.\n</div>\n");
    plantFile(base, "docs/c03-legacy-no-semicolon.md", "<div>\nThe rf graph&nbspimpact leaf is served by this build.\n</div>\n");
    plantFile(base, "docs/c04-legacy-longest-match.md", "<div>\nThe rf gr&aacuteph impact leaf is served by this build.\n</div>\n");
    plantFile(base, "docs/c05-raw-c1-remap.md", "<div>\nThe rf graph&#150impact leaf is served by this build.\n</div>\n");
    plantFile(base, "docs/c06-markdown-c1-remap.md", "The rf graph&#151;impact leaf is served by this build.\n");
    plantFile(base, "docs/c07-markdown-hex-c1-remap.md", "The rf view&#x96;list leaf is served by this build.\n");
    plantFile(base, "docs/c08-raw-twelve-digits.md", "<p>The rf graph&#000000000032impact leaf is served by this build.</p>\n");
    plantFile(base, "docs/c09-inline-raw-text.md", "The rf <?x >graph&#32impact?> leaf is served.\n");
    // U2(a) (c10 is the gate's P03): an HTML block whose reading is not ended by ".", "!" or "?" leads the next block, as a
    // paragraph does (c10 renders as the gate's red control G00).
    plantFile(base, "docs/c10-html-paragraph-lead-in.md", "<p>The leaves this build serves:</p>\n\n- graph impact\n");
    plantFile(base, "docs/c11-html-div-lead-in.md", "<div>The rf graph impact leaf, by status:</div>\n\n| Status |\n| --- |\n| served |\n");
    // U2(b) (c12 is the gate's P05): a continuation whose first letter is lower-case after an opening bracket, a quotation
    // mark or a dash goes on with the sentence before it.
    plantFile(base, "docs/c12-bracket-continuation.md", "The rf graph impact leaf... (is) served by this build.\n");
    plantFile(base, "docs/c13-quote-continuation.md", 'The rf optic list leaf... "is" served by this build.\n');
    plantFile(base, "docs/c14-dash-continuation.md", `The rf view list leaf... ${at(0x2014)} is served by this build.\n`);
    // F6 (c15 is the gate's P10): a list item's text leads its nested list, the path the gate's falsifier X3 removes.
    plantFile(base, "docs/c15-list-item-lead-in.md", "- The leaves this build serves:\n  - graph impact\n");
    // c16 is the gate's P04c: a markdown image's alt text is read (R-RAW-ALT-TEXT names the raw img that renders the same).
    plantFile(base, "docs/c16-markdown-image-alt.md", "The rf graph ![impact](x.png) leaf is served by this build.\n");
    // Quiet: an unterminated reference in markdown text, which marked escapes, so a reader sees it as written (the gate's
    // P01m); a terminated named reference outside NAMED_REFERENCES in raw HTML, recorded; an unterminated name that is no
    // legacy name, which the tokenizer leaves as written; and an HTML paragraph ended by a full stop, which leads nothing.
    plantFile(base, "docs/cq1-markdown-unterminated.md", "The rf graph&#32impact leaf is served by this build.\n");
    plantFile(base, "docs/cq2-raw-unknown-terminated.md", "<div>\nThe rf graph&rarr;impact leaf is served.\n</div>\n");
    plantFile(base, "docs/cq3-raw-non-legacy-unterminated.md", "<div>\nThe rf graph&rarrimpact leaf is served.\n</div>\n");
    plantFile(base, "docs/cq4-closed-html-paragraph.md", "<p>The leaves this build serves.</p>\n\n- graph impact\n");
    const unknown: string[] = [];
    expect(renderedServedLeafSentences(base, "docs", unknown)).toEqual([
      "docs/c01-numeric-no-semicolon.md: The rf graph impact leaf is served by this build.",
      "docs/c02-hex-no-semicolon.md: The rf graph impact leaf is served by this build.",
      "docs/c03-legacy-no-semicolon.md: The rf graph impact leaf is served by this build.",
      "docs/c04-legacy-longest-match.md: The rf graph impact leaf is served by this build.",
      "docs/c05-raw-c1-remap.md: The rf graph-impact leaf is served by this build.",
      "docs/c06-markdown-c1-remap.md: The rf graph-impact leaf is served by this build.",
      "docs/c07-markdown-hex-c1-remap.md: The rf view-list leaf is served by this build.",
      "docs/c08-raw-twelve-digits.md: The rf graph impact leaf is served by this build.",
      "docs/c09-inline-raw-text.md: The rf graph impact?> leaf is served.",
      "docs/c10-html-paragraph-lead-in.md: The leaves this build serves: graph impact",
      "docs/c11-html-div-lead-in.md: The rf graph impact leaf, by status: Status served",
      "docs/c12-bracket-continuation.md: The rf graph impact leaf... (is) served by this build.",
      'docs/c13-quote-continuation.md: The rf optic list leaf... "is" served by this build.',
      "docs/c14-dash-continuation.md: The rf view list leaf... - is served by this build.",
      "docs/c15-list-item-lead-in.md: The leaves this build serves: graph impact",
      "docs/c16-markdown-image-alt.md: The rf graph impact leaf is served by this build.",
    ]);
    expect(unknown).toEqual(["docs/cq2-raw-unknown-terminated.md: &rarr;"]);
    // The quiet pages are read: each renders exactly these readings.
    const read = renderedSentencesBelow(base, "docs", []);
    const readingsOfPage = (path: string): string[] => read.filter(([page]) => page === path).map(([, sentence]) => sentence);
    expect(["cq1-markdown-unterminated", "cq2-raw-unknown-terminated", "cq3-raw-non-legacy-unterminated", "cq4-closed-html-paragraph"].map(name => readingsOfPage(`docs/${name}.md`))).toEqual([
      ["The rf graph&#32impact leaf is served by this build."],
      ["The rf graph&rarr;impact leaf is served."],
      ["The rf graph&rarrimpact leaf is served."],
      ["The leaves this build serves.", "graph impact"],
    ]);
    // The source leg shares the sentence units, so it flags the three continuations; it reads references and HTML as the
    // source spells them, so it flags no other plant.
    expect(servedLeafSentences(base, "docs")).toEqual([
      "docs/c12-bracket-continuation.md: The rf graph impact leaf... (is) served by this build.",
      'docs/c13-quote-continuation.md: The rf optic list leaf... "is" served by this build.',
      `docs/c14-dash-continuation.md: The rf view list leaf... ${at(0x2014)} is served by this build.`,
    ]);
    // The tokenizer's two tables, whole: the 106 legacy names (each decodes in raw HTML without its semicolon) and the 27
    // C1 remaps; and the numeric end state's other branches: U+0000, a surrogate and a value past U+10FFFF read U+FFFD, the
    // first and last remapped C1 code points their characters, and a C1 code point the table does not remap itself.
    expect([LEGACY_REFERENCES.size, C1_REMAP.size]).toEqual([106, 27]);
    expect([0, 0xd800, 0xdfff, 0x110000, 0x80, 0x9f, 0x81].map(numericReference)).toEqual([
      at(0xfffd),
      at(0xfffd),
      at(0xfffd),
      at(0xfffd),
      at(0x20ac),
      at(0x178),
      at(0x81),
    ]);
    expect(decodeRawHtmlReferences([...LEGACY_REFERENCES.keys()].map(name => `&${name} `).join(""), [])).toBe(
      [...LEGACY_REFERENCES.values()].map(value => `${value} `).join(""),
    );
  });

  it("SCG-R15 negative, residual enumeration (rule 19(c); cut #4 for refusal #3, cut #5 for refusal #4): R-ENCLOSED-STOP, R-LEAD-IN-ACROSS-CONTAINER, R-HIDDEN-CONTENT, R-LEAF-SPELLING, R-CONFUSABLE, R-ELLIPSIS, R-RAW-ALT-TEXT, R-MARK-IN-NAME and R-MARKED-CONTINUATION, with the widened R-UNLISTED-ABBREVIATION, R-HEADING-SCOPE, R-HIDDEN-CONTENT and R-CONFUSABLE scopes, are read and stay quiet, each named cure flags its quiet rows, and the out-of-file roster, this title and the RENDERED LEG comment anchor the row list", ({ task }) => {
    const base = plantRoot("scg-r15-cut4-residual-");
    // [family, page path, page text, the page's rendered sentences, the family's named cure]
    const ROWS: ReadonlyArray<readonly [string, string, string, readonly string[], ResidualCure]> = [
      ["R-ENCLOSED-STOP", "docs/r-enclosed-parenthesis.md", "The rf graph impact leaf (ready? Yes) is served.", ["The rf graph impact leaf (ready?", "Yes) is served."], enclosedCure],
      ["R-ENCLOSED-STOP", "docs/r-enclosed-double-quote.md", 'The rf optic list leaf, which the plan calls "Phase 2. Final", is served.', ['The rf optic list leaf, which the plan calls "Phase 2.', 'Final", is served.'], enclosedCure],
      [
        "R-ENCLOSED-STOP",
        "docs/r-enclosed-curly-quote.md",
        `The rf view list leaf, which the plan calls ${at(0x201c)}Phase 2. Final${at(0x201d)}, is served.`,
        [`The rf view list leaf, which the plan calls ${at(0x201c)}Phase 2.`, `Final${at(0x201d)}, is served.`],
        enclosedCure,
      ],
      ["R-ENCLOSED-STOP", "docs/r-enclosed-bracket.md", "The rf graph candidate leaf [ready? Yes] is served.", ["The rf graph candidate leaf [ready?", "Yes] is served."], enclosedCure],
      ["R-ENCLOSED-STOP", "docs/r-enclosed-single-quote.md", "The rf graph impact leaf, which the plan calls 'Phase 2. Final', is served.", ["The rf graph impact leaf, which the plan calls 'Phase 2.", "Final', is served."], enclosedCure],
      // The frozen R-UNLISTED-ABBREVIATION quiet row's page, which this family's named cure also reads whole.
      ["R-ENCLOSED-STOP", "docs/r-enclosed-frozen-ref.md", "The rf graph impact leaf (Ref. Pi) is served.", ["The rf graph impact leaf (Ref.", "Pi) is served."], enclosedCure],
      ["R-UNLISTED-ABBREVIATION", "docs/r-unlisted-spaced.md", "The rf graph impact leaf, e. g. Pi's own build, is served.", ["The rf graph impact leaf, e. g.", "Pi's own build, is served."], abbreviationCure("e. g.")],
      ["R-UNLISTED-ABBREVIATION", "docs/r-unlisted-initial.md", "The rf graph impact leaf, by J. Smith, is served.", ["The rf graph impact leaf, by J.", "Smith, is served."], abbreviationCure("J.")],
      ["R-UNLISTED-ABBREVIATION", "docs/r-unlisted-digit.md", "The rf graph impact leaf, see Fig. 2, is served.", ["The rf graph impact leaf, see Fig.", "2, is served."], abbreviationCure("Fig.")],
      ["R-HEADING-SCOPE", "docs/r-heading-scope-table.md", "## Served leaves\n\n| Leaf |\n| --- |\n| graph impact |", ["Served leaves", "Leaf", "Leaf graph impact"], headingScopeCure],
      ["R-LEAD-IN-ACROSS-CONTAINER", "docs/r-lead-in-quote.md", "> The leaves this build serves:\n\n- graph impact", ["The leaves this build serves:", "graph impact"], containerLeadInCure],
      ["R-LEAD-IN-ACROSS-CONTAINER", "docs/r-lead-in-item.md", "- The leaves this build serves:\n- graph impact", ["The leaves this build serves:", "graph impact"], containerLeadInCure],
      ["R-HIDDEN-CONTENT", "docs/r-hidden-script.md", "The rf graph<script>x</script> impact leaf is served.", ["The rf graphx impact leaf is served."], hiddenContentCure],
      ["R-HIDDEN-CONTENT", "docs/r-hidden-attribute.md", "The rf view<span hidden>x</span> list leaf is served.", ["The rf viewx list leaf is served."], hiddenContentCure],
      ["R-LEAF-SPELLING", "docs/r-leaf-spelling-slash.md", "The rf graph/impact leaf is served.", ["The rf graph/impact leaf is served."], leafSpellingCure],
      ["R-LEAF-SPELLING", "docs/r-leaf-spelling-camel.md", "The rf graphImpact leaf is served.", ["The rf graphImpact leaf is served."], leafSpellingCure],
      ["R-CONFUSABLE", "docs/r-confusable.md", `The rf gr${at(0x430)}ph impact leaf is served.`, [`The rf gr${at(0x430)}ph impact leaf is served.`], confusableCure],
      ["R-ELLIPSIS", "docs/r-ellipsis.md", "The rf graph impact leaf. Served by this build.", ["The rf graph impact leaf.", "Served by this build."], ellipsisCure],
      // Cut #5 (refusal #4): R-RAW-ALT-TEXT (the gate's P04), R-MARK-IN-NAME (P06) and R-MARKED-CONTINUATION, and the
      // widened R-HIDDEN-CONTENT (P07, an inline style) and R-CONFUSABLE (P09, an Armenian letter) scopes.
      ["R-RAW-ALT-TEXT", "docs/r-raw-alt-text.md", 'The rf graph <img src="x.png" alt="impact"> leaf is served by this build.', ["The rf graph leaf is served by this build."], rawAltTextCure],
      [
        "R-MARK-IN-NAME",
        "docs/r-mark-in-name.md",
        "The rf graph impact leaf is, per the Yahoo! Search team, served by this build.",
        ["The rf graph impact leaf is, per the Yahoo!", "Search team, served by this build."],
        markInNameCure("Yahoo!"),
      ],
      [
        "R-MARKED-CONTINUATION",
        "docs/r-marked-continuation-arrow.md",
        `The rf graph impact leaf... ${at(0x2192)} is served by this build.`,
        ["The rf graph impact leaf...", `${at(0x2192)} is served by this build.`],
        markedContinuationCure,
      ],
      ["R-MARKED-CONTINUATION", "docs/r-marked-continuation-digit.md", "The rf view list leaf... 2 builds serve it.", ["The rf view list leaf...", "2 builds serve it."], markedContinuationCure],
      [
        "R-HIDDEN-CONTENT",
        "docs/r-hidden-style.md",
        'The rf graph<span style="display:none">x</span> impact leaf is served by this build.',
        ["The rf graphx impact leaf is served by this build."],
        hiddenContentCure,
      ],
      ["R-CONFUSABLE", "docs/r-confusable-armenian.md", `The rf ${at(0x585)}ptic list leaf is served by this build.`, [`The rf ${at(0x585)}ptic list leaf is served by this build.`], confusableCure],
    ];
    for (const [, path, page] of ROWS) plantFile(base, path, `${page}\n`);
    plantFile(base, "docs/control.md", "The rf graph impact leaf is served.\n");
    // The enumeration, row by row: the families and their quiet pages, frozen at the cut.
    expect(ROWS.map(([family, path]) => `${family} ${path}`)).toEqual([
      "R-ENCLOSED-STOP docs/r-enclosed-parenthesis.md",
      "R-ENCLOSED-STOP docs/r-enclosed-double-quote.md",
      "R-ENCLOSED-STOP docs/r-enclosed-curly-quote.md",
      "R-ENCLOSED-STOP docs/r-enclosed-bracket.md",
      "R-ENCLOSED-STOP docs/r-enclosed-single-quote.md",
      "R-ENCLOSED-STOP docs/r-enclosed-frozen-ref.md",
      "R-UNLISTED-ABBREVIATION docs/r-unlisted-spaced.md",
      "R-UNLISTED-ABBREVIATION docs/r-unlisted-initial.md",
      "R-UNLISTED-ABBREVIATION docs/r-unlisted-digit.md",
      "R-HEADING-SCOPE docs/r-heading-scope-table.md",
      "R-LEAD-IN-ACROSS-CONTAINER docs/r-lead-in-quote.md",
      "R-LEAD-IN-ACROSS-CONTAINER docs/r-lead-in-item.md",
      "R-HIDDEN-CONTENT docs/r-hidden-script.md",
      "R-HIDDEN-CONTENT docs/r-hidden-attribute.md",
      "R-LEAF-SPELLING docs/r-leaf-spelling-slash.md",
      "R-LEAF-SPELLING docs/r-leaf-spelling-camel.md",
      "R-CONFUSABLE docs/r-confusable.md",
      "R-ELLIPSIS docs/r-ellipsis.md",
      "R-RAW-ALT-TEXT docs/r-raw-alt-text.md",
      "R-MARK-IN-NAME docs/r-mark-in-name.md",
      "R-MARKED-CONTINUATION docs/r-marked-continuation-arrow.md",
      "R-MARKED-CONTINUATION docs/r-marked-continuation-digit.md",
      "R-HIDDEN-CONTENT docs/r-hidden-style.md",
      "R-CONFUSABLE docs/r-confusable-armenian.md",
    ]);
    // Each quiet row's page is read (it renders exactly its pinned sentences), and only the control reds, on both legs.
    const read = renderedSentencesBelow(base, "docs", []);
    const sentencesOfPage = (path: string): string[] => read.filter(([page]) => page === path).map(([, sentence]) => sentence);
    expect(ROWS.map(([, path]) => sentencesOfPage(path))).toEqual(ROWS.map(([, , , sentences]) => [...sentences]));
    expect(renderedServedLeafSentences(base, "docs")).toEqual(["docs/control.md: The rf graph impact leaf is served."]);
    expect(servedLeafSentences(base, "docs")).toEqual(["docs/control.md: The rf graph impact leaf is served."]);
    // Each family's named cure flags every quiet row of its family (the quiet inputs are members), and the leg flags none.
    expect(ROWS.map(([family, path, page, , cure]) => `${family} ${path}:${cure(sentencesOfPage(path), page)}`)).toEqual(ROWS.map(([family, path]) => `${family} ${path}:true`));
    expect(ROWS.map(([family, path]) => `${family} ${path}:${sentencesOfPage(path).some(servedLeaf)}`)).toEqual(ROWS.map(([family, path]) => `${family} ${path}:false`));
    // The row list's anchors outside this case's literals (refusal #4 F7, the rule 16 CT5/CT6 kill shape): the out-of-file
    // roster's residualRows equal it row for row, the families this title names are exactly its families, and the families
    // the RENDERED LEG comment names are exactly those the residual cases' titles name, so a row deleted from ROWS and from
    // the row-list literal above, or a family deleted from every literal here, still reds.
    const roster: unknown = JSON.parse(readFileSync(join(ROOT, RESIDUAL_ROSTER), "utf8"));
    const rosterRows: unknown = roster !== null && typeof roster === "object" && "residualRows" in roster ? roster.residualRows : undefined;
    expect(ROWS.map(([family, path]) => `${family} ${path}`), `${RESIDUAL_ROSTER} residualRows, the anchor outside this file`).toEqual(rosterRows);
    expect(familiesNamed(ROWS.map(([family]) => family).join(" "))).toEqual(familiesNamed(task.name));
    const residualTitles = (task.suite?.tasks ?? []).map(sibling => sibling.name).filter(name => /\bresiduals?\b/.test(name));
    expect(familiesNamed(renderedLegComment())).toEqual(familiesNamed(residualTitles.join(" ")));
  });
});
