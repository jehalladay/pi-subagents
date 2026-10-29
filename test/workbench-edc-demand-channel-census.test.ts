/**
 * wb-pyel.2 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R4, program-triage-2026-10-18 child of wb-pyel), the until-then leg of a
 * conditional duty: the EDC demand-channel census.
 * Statement (the bead title, read at run time from the tracked bead export .beads/issues.jsonl, where each dash is spelled as
 * the six characters backslash-u2014): "If Pi-subagents adopts EDC context assembly, context demand and precision shall be
 * expressed only as an explicit, typed, declarative client projection requirement validated at the boundary - never encoded as
 * an imperative model instruction or tool call - so no Pi prompt, tool description or capability input becomes the demand
 * channel. Artifact: a Pi EDC context-assembly consumer (none exists)."
 * Acceptance (owner filing, verbatim): "Acceptance: at adoption, a falsifier shows demand carried as a typed
 * projection-requirement value, plus a red case where an imperative prompt phrase or tool call attempts to carry demand and is
 * refused."
 *
 * CLAIMED (rows A-C; each label is one of the title's clauses that bind today, word for word): A the antecedent, read as the
 * consumer gate; B the until-then posture, judged with zero findings while the gate reads ABSENT; C the artifact clause, the
 * gate's semantics and its live verdict.
 * NOT CLAIMED (ROSTER.unclaimed, each held to the export): U1 and U2, the title's two armed duties ("context demand and
 * precision shall be expressed only as an explicit, typed, declarative client projection requirement validated at the
 * boundary", "never encoded as an imperative model instruction or tool call"), and U3, the acceptance's falsifier pair. No Pi EDC
 * context-assembly consumer exists (C2), so there is no projection requirement to type, validate or falsify. An adoption ends
 * the until-then: the gate then reads PRESENT and this census reds by design (verdict "owed", naming U1-U3; C1), so the adopting
 * cut delivers the falsifier pair and re-measures this file.
 *
 * THE PRODUCER AT THE PIN (the roster's `producer` block, measured read-only by the cutting seat with git show in the local
 * ReactiveComponentsSDK checkout; this census is hermetic and never re-reads it): the charter
 * docs/programs/evidence-directed-computation-2026-10-18.md is one blob (de04229d) at the bead pin 44b72145b175 and at the
 * checkout's origin/master 5c480c5712b4; the roster vendors the cited line :14 with its sha256 (UTF-8, no line end). The line
 * reads MARKER by its "not" and, with the marker removed, a finding of all three families: it is the vocabulary's producer anchor.
 *
 * READINGS
 * - WORDS: NFKC with format controls and combining marks removed, an acronym's plural s split off, a break at each lower-to-upper
 *   case change and before the last capital of an acronym run, lower case, the runs of a-z and 0-9 (contextDemand reads context
 *   demand; parseEDC reads parse edc; EDCs reads edc s; snake_case and kebab-case split at their separators).
 * - SENTENCES: every text is cut into sentences after ".", "!", "?" or ";" before white space or the line end, at a blank line,
 *   around a table row and a heading line and before a list item (a sentence wrapped over lines stays one); each is judged alone.
 * - THE DEMAND READING of one sentence: none when it carries no family word and no carrier; SUBJECTLESS when a family word stands
 *   with no subject word and no carrier (Pi's own senses: "on demand", "be precise"); MARKER when it names the subject (or the
 *   carrier) and a family beside a marker; otherwise a FINDING naming its families. SUBJECT: context, contexts. FAMILIES: demand
 *   (demand, demands, demanded, demanding) and precision (precision, precise, precisely, imprecise, imprecisely, imprecision).
 *   CARRIER (the charter's name for the typed demand value, read as subject and family at once): the adjacent pairs projection
 *   requirement and projection requirements. MARKERS: not, no, never, nor, neither, without, cannot, none and nothing as words,
 *   and the n't contraction. OVER-READ (disclosed, the strict direction): any mood counts - a description that merely says
 *   "context precision" is read as the channel; a page restating the posture keeps its marker.
 * - THE SURFACES (row B, the clause's three nouns):
 *   PROMPTS (B1): every git-listed JS or TS module below src/ and examples/ (tracked or untracked, never ignored), parsed with the
 *   TypeScript compiler (.tsx as TSX, .jsx as JSX, the other TS extensions as TS, the other JS extensions as JS, which parses
 *   JSX), never a comment (a comment is no prompt). The code reader reads exactly the forms below and no other; each form is
 *   pinned by a plant in B1's forms witness (FORMS), and R-UNREAD-FORM names the forms it leaves unread:
 *   LEXEME each identifier, private name, string literal (a no-substitution template too), template head, middle and tail,
 *   regular expression literal and non-blank JSX text; each template literal type, its literal parts joined by spaces; and each
 *   template expression and + concatenation as spelled (a non-constant part read as one space).
 *   ACCESS as receiver.key (a computed key: its constant, else "?"): each property access (a.b) and qualified name (A.B), as
 *   written; each element access (a[k]) and indexed access type (A["k"]); each key of an object binding pattern, the receiver
 *   being the declaration's initializer, else the iterated expression of the for-of or for-in declaring it, or the parameter's
 *   type annotation, else its default value, and in a nested pattern the enclosing element's path (receiver.key; an array
 *   pattern's element, receiver.index); and each key of a destructuring assignment target (an object or array literal left of
 *   "=", or the target of a for-of or for-in) after the assigned or iterated expression, likewise at depth.
 *   MEMBER each member name (a computed name: its constant) joined after the names of its enclosing declarations - variables,
 *   properties, methods, accessors, functions and classes (declared or expressions), interfaces, type aliases, enums and their
 *   members, namespaces and modules, parameter properties; a member with none reads as its lexeme alone. The members: an object
 *   literal's properties, shorthands, methods and accessors; a class's, an interface's and a type literal's properties, methods
 *   and accessors, declared or as signatures; a constructor's parameter properties; an enum's members; and each declaration
 *   directly in a namespace or module body (a variable an identifier names, a function, class, interface, type alias, enum or
 *   nested namespace, a dotted namespace's inner name too).
 *   IMPORT each name joined after its module specifier or module reference: an import declaration's default, namespace and named
 *   bindings; an export declaration's named and namespace re-exports from a module specifier (an import or export specifier's
 *   module name and its alias, both); and an import-equals declaration's name, after a require's specifier or the entity name as
 *   written.
 *   Every git-listed .md page below .pi/, .agents/ and examples/. And at run time: every default agent's configuration
 *   (DEFAULT_AGENTS), the curated Claude MCP server's instructions, every registered Pi tool's promptSnippet and promptGuidelines.
 *   TOOL DESCRIPTIONS (B2), at run time: every Pi tool the real extension registers when booted hermetically with the workbench's
 *   Claude backend (its name, label and description), every curated Claude tool listed by an in-memory MCP client (every field but
 *   its input schema), and every capability descriptor of the native registration and of the four injected-client registrations
 *   (every field but its input schema).
 *   CAPABILITY INPUTS (B3), at run time: the input schemas of all three - every key and every string at any depth. And the
 *   boundary: every input arm of the context seam (reactivefiber.render.preview, Pi's one consumer of assembled context) is closed,
 *   and an admitted input plus one demand key (the vocabulary's own spellings: contextDemand, contextPrecision,
 *   projectionRequirement) is refused at input validation by every registered capability before any provider runs (the injected
 *   registrations count every client call), and at the seam through CapabilityRegistry.invoke, a workflow script's node() and
 *   Claude's capability_invoke before any rf process spawns (a stand-in rf as the only PATH entry records its argv).
 * - THE CONSUMER (the gate, rows A and C): every git-listed module below src/ through the same code reader, plus package.json's
 *   four dependency tables (names and specifiers). A reading names an EDC stem when its words carry edc or edcs, or its joined
 *   fold (every character outside a-z and 0-9 removed) carries evidencedirected - the title's acronym and the cited charter
 *   slug's words before its head noun. The consumer reads PRESENT when any reading or dependency names a stem, ABSENT otherwise.
 *   guard(ABSENT, findings) is pass on zero findings and fail otherwise; guard(PRESENT, ...) is owed: the armed duties U1-U3
 *   govern and this file is re-measured.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; every witness is held to the roster):
 *  A "If Pi-subagents adopts EDC context assembly": A1 the consumer reading over the live tree (the src walk equal to git's
 *    listing, its floors, the frozen pass at the cut's base); A2 the stems and the consumer reader's routes and near misses.
 *  B "so no Pi prompt, tool description or capability input becomes the demand channel": B1 the prompt surfaces (live findings,
 *    floors, the frozen pass) and the code reader's forms (a plant per form, its reading held); B2 the tool descriptions; B3 the
 *    capability inputs and the boundary; B4 the demand reading itself and its append quiet row (a note appended after the owner
 *    filing block, spelling every vocabulary word, leaves the whole B4 witness unchanged; read past the block it would empty
 *    R-SYNONYM; a block edited in place is refused).
 *  C "Artifact: a Pi EDC context-assembly consumer (none exists)": C1 the gate and guard semantics, and a replica consumer read
 *    PRESENT and owed; C2 the live verdict - ONE pass over every surface and in-memory positives (it reads the live tree's
 *    modules, pages and readings plus exactly the positives' own) holds every finding of the positives read alone and, beyond
 *    them, exactly the live findings (both directions asserted), the gate reads ABSENT, the guard reads pass, and the same pass
 *    over a scratch git repository finds exactly its plants.
 * OUTSIDE ANCHORS (the judged-set case): the bead's row in the tracked export (.beads/issues.jsonl). Its title, after the id
 *   prefix, is tiled by the three labels and the two title duties U1 and U2 in title order with separator-only gaps (so every word
 *   of the title is claimed or unclaimed), and each label is tiled by its pins' quotes. Its OWNER FILING BLOCK - the byte-exact
 *   prefix of its notes the roster measures (filing: length and sha256), equal to the row's whole notes in the export at
 *   CONSTANTS.frozenAt read from git objects - holds U3 verbatim and the citation whose path, line and pin equal the producer's.
 *   Every reading of the export takes the title and that block, never the whole notes: bd appends each later note (a delivery, a
 *   gate verdict, a landing) after the block and a ledger hop exports it, so a whole-notes read moved at every hop (the cut #1
 *   refusal, U1: the cut's own delivery note spelled five R-SYNONYM words); a block edited in place is refused, never read through
 *   an appended copy, and an appended note restating the citation and duties changes no reading (the judged set's quiet row).
 *   ROLE PLACES, derived from the title's own structure, never from a word list:
 *   every word of U1 before "shall" but "and" reads a distinct role among subject, demand and precision; the two words before
 *   "validated" are a carrier pair; the word after "so" in B, U2's first word and C's first word in parentheses are markers; the
 *   word after "adopts" in A and the word before "context" in C are word stems; the cited slug's words before its head noun, joined,
 *   are the joined stem; B's second-to-last word reads demand. The producer line reads MARKER and, without its marker, a finding of
 *   all three families. So a row, a pin, a label or an anchored word removed from every literal of this file and of the roster
 *   together still reds.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, vocabulary, constants, the producer line,
 *   the unclaimed duties, the residuals and every pin's witness are held to the out-of-file roster
 *   (test/fixtures/edc-demand-channel-roster.json); a last case reads that every pin ran to its witness.
 * RESIDUALS (named; each has a pinned quiet row): R-UNNAMED-ADOPTION (A2) an EDC consumer spelled without either stem (a
 *   ReactiveComponents import, a QueryView input) reads ABSENT - Pi's ReactiveComponents surface is pinned by
 *   test/workbench-rc-assembler-expectation-census.test.ts; R-GLUED-STEM (A2) a stem glued to a suffix the WORDS rule keeps in one
 *   word or splits after the acronym's last capital names no stem and reads ABSENT (EDCv2Assembler reads ed, cv2, assembler;
 *   EDC2Assembler and edc2_assembler read edc2), while each twin with the stem split off (EdcV2Assembler, EDC_2Assembler,
 *   edc_2_assembler) names it; R-SCOPE (B1) texts outside the surfaces: docs/ pages (claim pages, which
 *   test/workbench-edc-shipped-claim-census.test.ts reads for EDC claims), qa/ and test/ modules, root files, comments, YAML
 *   (.agents/skills/beads/agents/openai.yaml's default_prompt), an operator's own agent files and settings (workbench roles), model
 *   replies; R-COMPOSED (B1) a prompt composed at run time from a part that is no constant (a variable holding the family word, a
 *   += onto a variable, an array of parts joined by a call) and prompts composed per call (buildAgentPrompt); R-UNREAD-FORM (B1)
 *   the code forms the reader leaves unread, each read as its lexemes alone: a binding pattern with no receiver (an untyped
 *   parameter without a default value, such as a callback's ({ demand }) => ...), a require or a dynamic import bound to a name,
 *   an export alias with no module specifier, and a key passed to a call (context.get("demand")) - each twin, the same words
 *   through a read form, finds them; R-UNNAMED-INPUT (B3) an input that steers context with no family word - the
 *   Agent tool's inherit_context, measured: a Pi-native fork switch the model sets ("If true, fork parent conversation into the
 *   agent. Default: false (fresh context).") - reads quiet; R-PARAPHRASE (B4) demand or precision in other words ("Ask for more
 *   context when you need it.") - measured: a paraphrase family (request, ask, need, more, narrow, ...) beside the subject flags
 *   four live sentences of the Agent and SubagentWorkflow tools that carry no demand (inherit_context guidance, "Give enough
 *   context about the surrounding problem ..."), so it cannot be read; R-SUBJECTLESS (B4) a family word with no subject word
 *   reads quiet, an imperative one too ("Demand more evidence before answering."); R-SPLIT (B4) the subject and the family in
 *   different sentences; R-MARKER-ANYWHERE (B4) a marker anywhere in the sentence quiets it, whatever it qualifies;
 *   R-LOOKALIKE (B4) a look-alike letter of another script inside a word (NFKC folds fullwidth forms and the fold drops format
 *   controls, which are read); R-SYNONYM (B4) a vocabulary word no outside text - the export's title, the owner filing block and
 *   the producer line - spells (the inflections, contexts, the plural carrier, the extra markers) is held by this file and the
 *   roster alone - removed from both together it stays green; B4 lists them.
 * SCOPE: a mention is judged, not the sentence's truth; the charter's own status is read by the cutting seat, never by this file.
 *
 * Display paths added: none. Test-only: the stand-in rf, the hermetic boot directories and the replica trees live in makeScratch
 * scratch with the leak guard installed; Pi's modules, pages, package.json, the bead export and the frozen tree are only read;
 * nothing is spawned but git, the workflow worker and the stand-in rf. Input-hygiene pins only: no security claim is made here.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { DEFAULT_AGENTS } from "../src/default-agents.js";
import subagentsExtension from "../src/index.js";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { CLAUDE_CAPABILITY_TOOL_NAMES, createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type ForgeReadClient, registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { type FurnaceReadClient, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { runWorkflow } from "../src/workflow/runtime.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type Gate = "PRESENT" | "ABSENT";
type Verdict = "pass" | "fail" | "owed";
type Via = "lexeme" | "access" | "member" | "import";
type FamilyId = "demand" | "precision" | "carrier";
interface Pin {
  readonly id: string;
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}
interface Vocabulary {
  readonly subject: readonly string[];
  readonly families: { readonly demand: readonly string[]; readonly precision: readonly string[] };
  readonly carrier: readonly (readonly [string, string])[];
  readonly markers: readonly string[];
  readonly stems: { readonly word: readonly string[]; readonly joined: readonly string[] };
}
interface Constants {
  readonly codeRoots: readonly string[];
  readonly pageRoots: readonly string[];
  readonly consumerRoot: string;
  readonly frozenAt: string;
  readonly titlePrefix: string;
  readonly seam: string;
  readonly backend: string;
}
interface ProducerLine {
  readonly line: number;
  readonly text: string;
  readonly sha256: string;
}
interface Producer {
  readonly repository: string;
  readonly path: string;
  readonly beadPin: string;
  readonly originMaster: string;
  readonly measuredAt: string;
  readonly blob: string;
  readonly lines: readonly ProducerLine[];
}
interface Unclaimed {
  readonly id: string;
  readonly source: "title" | "filing";
  readonly duty: string;
  readonly reason: string;
}
/** The owner filing block's measure: the byte-exact prefix of the bead's notes as the owner filed them. */
interface Filing {
  readonly length: number;
  readonly sha256: string;
}
interface Roster {
  readonly bead: string;
  readonly filing: Filing;
  readonly producer: Producer;
  readonly vocabulary: Vocabulary;
  readonly constants: Constants;
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: Json })[] }[];
  readonly unclaimed: readonly Unclaimed[];
  readonly residuals: readonly { readonly id: string; readonly quietPin: string }[];
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_FILE = "test/fixtures/edc-demand-channel-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-pyel.2";
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;
const CONSTANTS: Constants = {
  codeRoots: ["examples", "src"],
  pageRoots: [".agents", ".pi", "examples"],
  consumerRoot: "src",
  frozenAt: "864dff943711",
  titlePrefix: "[SDK-EVIDENCE-DIRECTED-COMPUTATION-R4] ",
  seam: "reactivefiber.render.preview",
  backend: "claude",
};
const VOCABULARY: Vocabulary = {
  subject: ["context", "contexts"],
  families: {
    demand: ["demand", "demands", "demanded", "demanding"],
    precision: ["precision", "precise", "precisely", "imprecise", "imprecisely", "imprecision"],
  },
  carrier: [
    ["projection", "requirement"],
    ["projection", "requirements"],
  ],
  markers: ["not", "no", "never", "nor", "neither", "without", "cannot", "none", "nothing"],
  stems: { word: ["edc", "edcs"], joined: ["evidencedirected"] },
};
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "If Pi-subagents adopts EDC context assembly",
    pins: [
      { id: "A1", quote: "If Pi-subagents adopts" },
      { id: "A2", quote: "EDC context assembly" },
    ],
  },
  {
    id: "B",
    label: "so no Pi prompt, tool description or capability input becomes the demand channel",
    pins: [
      { id: "B1", quote: "so no Pi prompt" },
      { id: "B2", quote: "tool description" },
      { id: "B3", quote: "or capability input" },
      { id: "B4", quote: "becomes the demand channel" },
    ],
  },
  {
    id: "C",
    label: "Artifact: a Pi EDC context-assembly consumer (none exists)",
    pins: [
      { id: "C1", quote: "Artifact: a Pi EDC context-assembly consumer" },
      { id: "C2", quote: "(none exists)" },
    ],
  },
];
/** The registered capabilities every leg must hold (a floor, never the exact set). */
const REQUIRED_DESCRIPTORS = ["forge.gate.status", "furnace.run.inspect", "hyperunix.find", "reactivefiber.render.preview"] as const;
/** The Pi tools the hermetic boot with the Claude backend must register (a floor, never the exact set). */
const REQUIRED_PI_TOOLS = ["Agent", "SubagentWorkflow", "get_subagent_result", "steer_subagent", "workbench_catalog", "workflow_execute"] as const;
/** Floors below the counts measured at the cut (116 src modules, 6 example modules, 3 pages, 136731 code and page readings, 136007
 * consumer readings, 16 Pi tools, 3 default agents, 2 tools with guidelines, 65 prompt, 190 description and 805 input texts). */
const FLOORS = { srcModules: 110, exampleModules: 5, pages: 3, codeReadings: 120_000, consumerReadings: 120_000, piTools: 16, defaultAgents: 3, guidelines: 2, promptTexts: 50, descriptionTexts: 150, inputTexts: 600 } as const;

// ---------------------------------------------------------------------------------------------------------------- the reader
const SUBJECT = new Set(VOCABULARY.subject);
const DEMAND = new Set(VOCABULARY.families.demand);
const PRECISION = new Set(VOCABULARY.families.precision);
const MARKERS = new Set(VOCABULARY.markers);
/** Every vocabulary word: the subject, both families, the carrier pairs' words and the markers, in vocabulary order. */
const VOCABULARY_WORDS: readonly string[] = [...VOCABULARY.subject, ...VOCABULARY.families.demand, ...VOCABULARY.families.precision, ...VOCABULARY.carrier.flat(), ...VOCABULARY.markers];
const CONTRACTION = /n['\u2019]t(?![a-z0-9])/;
/** NFKC with format controls and combining marks removed (a zero-width space never splits a word; fullwidth letters fold). */
function normal(text: string): string {
  return text.normalize("NFKC").replace(/[\p{Cf}\p{Mn}\p{Me}]/gu, "");
}
/** The words of a text: an acronym's plural s split, a break at each case change and before an acronym's last capital. */
function words(text: string): string[] {
  return normal(text)
    .replace(/([A-Z]{2,})s(?![a-z])/g, "$1 s")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word !== "");
}
/** The joined fold: lower case with every character outside a-z and 0-9 removed. */
function joined(text: string): string {
  return normal(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}
const hasPair = (tokens: readonly string[], pairs: readonly (readonly [string, string])[]): boolean => tokens.some((word, index) => pairs.some(([first, second]) => word === first && tokens[index + 1] === second));
interface Reading {
  readonly kind: "finding" | "marker" | "subjectless" | "none";
  readonly families: readonly FamilyId[];
  readonly reason: string;
}
/** One sentence: none, subjectless (a family word with no subject), quiet by a marker, or a finding naming its families. */
function readSentence(text: string): Reading {
  const tokens = words(text);
  const families: FamilyId[] = [];
  if (tokens.some(word => DEMAND.has(word))) families.push("demand");
  if (tokens.some(word => PRECISION.has(word))) families.push("precision");
  if (hasPair(tokens, VOCABULARY.carrier)) families.push("carrier");
  if (families.length === 0) return { kind: "none", families: [], reason: "" };
  const named = families.includes("carrier") || tokens.some(word => SUBJECT.has(word));
  if (!named) return { kind: "subjectless", families, reason: families.join("+") };
  const marker = tokens.find(word => MARKERS.has(word)) ?? (CONTRACTION.test(normal(text).toLowerCase()) ? "n't" : undefined);
  if (marker !== undefined) return { kind: "marker", families, reason: marker };
  return { kind: "finding", families, reason: families.join("+") };
}
/** The verdict on one sentence: null (quiet) or its families joined by "+". */
function verdict(text: string): string | null {
  const reading = readSentence(text);
  return reading.kind === "finding" ? reading.reason : null;
}
/** The stems one reading names: a word stem among its words, a joined stem inside its joined fold. */
function stemsOf(text: string): string[] {
  const tokens = new Set(words(text));
  const fold = joined(text);
  return [...VOCABULARY.stems.word.filter(stem => tokens.has(stem)), ...VOCABULARY.stems.joined.filter(stem => fold.includes(stem))];
}

// ------------------------------------------------------------------------------------------------------------- the sentences
const TABLE_ROW = /^\s*\|/;
const LIST_ITEM = /^\s*(?:[-+*]|\d+[.)])\s/;
const HEADING = /^\s{0,3}#{1,6}(?:\s|$)/;
const TERMINATOR = /[.!?;](?=\s|$)/g;
function sentences(text: string): { readonly line: number; readonly text: string }[] {
  const out: { line: number; text: string }[] = [];
  let buffer = "";
  let start = 0;
  const flush = (): void => {
    if (buffer !== "") out.push({ line: start, text: buffer });
    buffer = "";
  };
  const append = (piece: string, line: number): void => {
    const trimmed = piece.trim();
    if (trimmed === "") return;
    if (buffer === "") start = line;
    buffer = buffer === "" ? trimmed : `${buffer} ${trimmed}`;
  };
  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    const line = index + 1;
    if (raw.trim() === "") {
      flush();
      continue;
    }
    const whole = TABLE_ROW.test(raw) || HEADING.test(raw);
    if (whole || LIST_ITEM.test(raw)) flush();
    let from = 0;
    for (const match of raw.matchAll(TERMINATOR)) {
      const at = (match.index ?? 0) + 1;
      append(raw.slice(from, at), line);
      flush();
      from = at;
    }
    append(raw.slice(from), line);
    if (whole) flush();
  }
  flush();
  return out;
}
/** Every finding and every quieted reading of one text, each as `<where>:<sentence line> <reason>`. */
function textReadings(where: string, text: string): { readonly findings: string[]; readonly quieted: string[] } {
  const findings: string[] = [];
  const quieted: string[] = [];
  for (const sentence of sentences(text)) {
    const reading = readSentence(sentence.text);
    if (reading.kind === "finding") findings.push(`${where}:${sentence.line} ${reading.reason}`);
    else if (reading.kind !== "none") quieted.push(`${where}:${sentence.line} ${reading.kind}:${reading.reason}`);
  }
  return { findings, quieted };
}

// -------------------------------------------------------------------------------------------------------------- the code reader
interface Site {
  readonly line: number;
  readonly via: Via;
  readonly text: string;
}
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
    for (const span of node.templateSpans) {
      const value = constant(span.expression);
      if (value === undefined) return undefined;
      text += value + span.literal.text;
    }
    return text;
  }
  return undefined;
}
/** A template or concatenation as it is spelled: its literal parts in order, each non-constant part read as one space. */
function spelled(node: ts.Node): string {
  const value = constant(node);
  if (value !== undefined) return value;
  if (ts.isParenthesizedExpression(node)) return spelled(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) return spelled(node.left) + spelled(node.right);
  if (ts.isTemplateExpression(node)) return node.head.text + node.templateSpans.map(span => spelled(span.expression) + span.literal.text).join("");
  return " ";
}
/** The declarations whose own name a member path joins (with a constructor parameter property, see nameOf). */
const NAMED_KINDS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.VariableDeclaration,
  ts.SyntaxKind.PropertyAssignment,
  ts.SyntaxKind.ShorthandPropertyAssignment,
  ts.SyntaxKind.PropertyDeclaration,
  ts.SyntaxKind.PropertySignature,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.MethodSignature,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ClassDeclaration,
  ts.SyntaxKind.ClassExpression,
  ts.SyntaxKind.InterfaceDeclaration,
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.EnumDeclaration,
  ts.SyntaxKind.EnumMember,
  ts.SyntaxKind.ModuleDeclaration,
]);
/** The member kinds of an object literal, a class, an interface or type literal and an enum. */
const MEMBER_KINDS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.PropertyAssignment,
  ts.SyntaxKind.ShorthandPropertyAssignment,
  ts.SyntaxKind.PropertyDeclaration,
  ts.SyntaxKind.PropertySignature,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.MethodSignature,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
  ts.SyntaxKind.EnumMember,
]);
/** The declaration kinds a namespace or module body holds as members. */
const NAMESPACE_MEMBER_KINDS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.VariableDeclaration,
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.ClassDeclaration,
  ts.SyntaxKind.InterfaceDeclaration,
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.EnumDeclaration,
  ts.SyntaxKind.ModuleDeclaration,
]);
/** A constructor parameter property (readonly, public, private, protected or override): a class member declared as a parameter. */
const isParameterProperty = (node: ts.Node): node is ts.ParameterDeclaration => ts.isParameter(node) && ts.isParameterPropertyDeclaration(node, node.parent);
/** A declaration directly in a namespace or module body: a variable named by an identifier whose statement sits in the body, or
 * a function, class, interface, type alias, enum or namespace in the body (a dotted namespace's inner name in its outer one). */
function inNamespaceBody(node: ts.Node): boolean {
  if (!NAMESPACE_MEMBER_KINDS.has(node.kind)) return false;
  if (ts.isVariableDeclaration(node)) {
    const statement = node.parent.parent;
    return ts.isIdentifier(node.name) && ts.isVariableStatement(statement) && ts.isModuleBlock(statement.parent);
  }
  return ts.isModuleBlock(node.parent) || ts.isModuleDeclaration(node.parent);
}
const isMember = (node: ts.Node): boolean => MEMBER_KINDS.has(node.kind) || isParameterProperty(node) || inNamespaceBody(node);
/** A name or key as text: an identifier, private name, string or number; a computed name's constant; undefined otherwise. */
function keyText(key: ts.Node): string | undefined {
  if (ts.isIdentifier(key) || ts.isPrivateIdentifier(key) || ts.isStringLiteralLike(key) || ts.isNumericLiteral(key)) return key.text;
  if (ts.isComputedPropertyName(key)) return constant(key.expression);
  return undefined;
}
function nameOf(node: ts.Node): string | undefined {
  if (!NAMED_KINDS.has(node.kind) && !isParameterProperty(node)) return undefined;
  const name = (node as ts.NamedDeclaration).name;
  return name === undefined ? undefined : keyText(name);
}
/** The receiver a binding pattern destructures: its declaration's initializer, else the iterated expression of the for-of or
 * for-in that declares it; its parameter's type annotation, else its default value; in a nested pattern, the enclosing element's
 * path. undefined when there is none (an untyped parameter without a default value, a catch binding): R-UNREAD-FORM. */
function receiverOf(pattern: ts.BindingPattern, source: ts.SourceFile): string | undefined {
  const holder = pattern.parent;
  if (ts.isBindingElement(holder)) return elementPath(holder, source);
  if (ts.isParameter(holder)) return (holder.type ?? holder.initializer)?.getText(source);
  if (!ts.isVariableDeclaration(holder)) return undefined;
  if (holder.initializer !== undefined) return holder.initializer.getText(source);
  const statement = holder.parent.parent;
  return ts.isForOfStatement(statement) || ts.isForInStatement(statement) ? statement.expression.getText(source) : undefined;
}
/** A binding element's path: its pattern's receiver joined with its key (an object pattern) or its index (an array pattern). */
function elementPath(element: ts.BindingElement, source: ts.SourceFile): string | undefined {
  const pattern = element.parent;
  const receiver = receiverOf(pattern, source);
  if (receiver === undefined) return undefined;
  const key = ts.isObjectBindingPattern(pattern) ? keyText(element.propertyName ?? element.name) : String(pattern.elements.indexOf(element));
  return `${receiver}.${key ?? "?"}`;
}
/** The keys of a destructuring assignment target after its receiver: each object literal property or shorthand as receiver.key
 * (a nested target deeper, an array literal's elements by index, a target's default value skipped). */
function assignmentPaths(target: ts.Expression, receiver: string): { readonly node: ts.Node; readonly path: string }[] {
  if (ts.isParenthesizedExpression(target)) return assignmentPaths(target.expression, receiver);
  if (ts.isBinaryExpression(target) && target.operatorToken.kind === ts.SyntaxKind.EqualsToken) return assignmentPaths(target.left, receiver);
  if (ts.isArrayLiteralExpression(target)) return target.elements.flatMap((element, index) => assignmentPaths(element, `${receiver}.${index}`));
  if (!ts.isObjectLiteralExpression(target)) return [];
  return target.properties.flatMap(property => {
    if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property)) return [];
    const path = `${receiver}.${keyText(property.name) ?? "?"}`;
    return [{ node: property, path }, ...(ts.isPropertyAssignment(property) ? assignmentPaths(property.initializer, path) : [])];
  });
}
const isLiteralTarget = (node: ts.Node | undefined): node is ts.ObjectLiteralExpression | ts.ArrayLiteralExpression => node !== undefined && (ts.isObjectLiteralExpression(node) || ts.isArrayLiteralExpression(node));
/** The parse kind of a module: TSX for .tsx, JSX for .jsx, TS for the other TS extensions, JS (which parses JSX) otherwise. */
function scriptKindOf(path: string): ts.ScriptKind {
  if (path.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (path.endsWith(".jsx")) return ts.ScriptKind.JSX;
  return /\.(?:ts|mts|cts)$/.test(path) ? ts.ScriptKind.TS : ts.ScriptKind.JS;
}
/** Every code reading of one module (never a comment): lexemes, accesses, member paths and imports, each with its line - exactly
 * the forms the header's B1 paragraph lists, each pinned by its FORMS plant. */
function codeSites(path: string, text: string): Site[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const sites: Site[] = [];
  const lineOf = (position: number): number => source.getLineAndCharacterOfPosition(position).line + 1;
  const visit = (node: ts.Node): void => {
    const at = (): number => lineOf(node.getStart(source));
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) sites.push({ line: at(), via: "lexeme", text: node.text });
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isRegularExpressionLiteral(node)) sites.push({ line: at(), via: "lexeme", text: node.text });
    else if (ts.isJsxText(node)) {
      if (!node.containsOnlyTriviaWhiteSpaces) sites.push({ line: at(), via: "lexeme", text: node.text });
    } else if (ts.isTemplateLiteralTypeNode(node)) sites.push({ line: at(), via: "lexeme", text: node.head.text + node.templateSpans.map(span => ` ${span.literal.text}`).join("") });
    else if (ts.isTemplateExpression(node) || (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken)) {
      const value = spelled(node);
      if (value.trim() !== "") sites.push({ line: at(), via: "lexeme", text: value });
    } else if (ts.isPropertyAccessExpression(node) || ts.isQualifiedName(node)) sites.push({ line: at(), via: "access", text: node.getText(source) });
    else if (ts.isElementAccessExpression(node)) sites.push({ line: at(), via: "access", text: `${node.expression.getText(source)}.${constant(node.argumentExpression) ?? "?"}` });
    else if (ts.isIndexedAccessTypeNode(node)) {
      const index = ts.isLiteralTypeNode(node.indexType) ? constant(node.indexType.literal) : undefined;
      sites.push({ line: at(), via: "access", text: `${node.objectType.getText(source)}.${index ?? "?"}` });
    } else if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const elementAt = elementPath(node, source);
      if (elementAt !== undefined) sites.push({ line: at(), via: "access", text: elementAt });
    } else if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier)) {
      const from = node.moduleSpecifier.text;
      const names: string[] = [];
      const specifier = (element: ts.ImportSpecifier | ts.ExportSpecifier): void => {
        if (element.propertyName !== undefined) names.push(element.propertyName.text);
        names.push(element.name.text);
      };
      if (ts.isImportDeclaration(node)) {
        const clause = node.importClause;
        if (clause?.name !== undefined) names.push(clause.name.text);
        const bindings = clause?.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.push(bindings.name.text);
        if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) specifier(element);
      } else if (node.exportClause !== undefined && ts.isNamedExports(node.exportClause)) {
        for (const element of node.exportClause.elements) specifier(element);
      } else if (node.exportClause !== undefined && ts.isNamespaceExport(node.exportClause)) names.push(node.exportClause.name.text);
      for (const name of names) sites.push({ line: at(), via: "import", text: `${from}.${name}` });
    } else if (ts.isImportEqualsDeclaration(node)) {
      const reference = node.moduleReference;
      const from = ts.isExternalModuleReference(reference) && ts.isStringLiteralLike(reference.expression) ? reference.expression.text : reference.getText(source);
      sites.push({ line: at(), via: "import", text: `${from}.${node.name.text}` });
    }
    const assigned = ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && isLiteralTarget(node.left) ? { target: node.left, receiver: node.right } : (ts.isForOfStatement(node) || ts.isForInStatement(node)) && isLiteralTarget(node.initializer) ? { target: node.initializer, receiver: node.expression } : undefined;
    if (assigned !== undefined) for (const key of assignmentPaths(assigned.target, assigned.receiver.getText(source))) sites.push({ line: lineOf(key.node.getStart(source)), via: "access", text: key.path });
    if (isMember(node)) {
      const own = nameOf(node);
      const path: string[] = [];
      for (let parent: ts.Node | undefined = node.parent; parent !== undefined; parent = parent.parent) {
        const name = nameOf(parent);
        if (name !== undefined) path.unshift(name);
      }
      if (own !== undefined && path.length > 0) sites.push({ line: at(), via: "member", text: [...path, own].join(".") });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}
interface Survey {
  readonly code: string[];
  readonly pages: string[];
  readonly findings: string[];
  readonly quieted: string[];
  readonly readings: number;
}
const isModule = (path: string): boolean => /\.(?:ts|tsx|mts|cts|js|mjs|cjs|jsx)$/.test(path);
const isMarkdown = (path: string): boolean => /\.md$/.test(path);
const underAny = (path: string, roots: readonly string[]): boolean => roots.some(root => path.startsWith(`${root}/`));
const isCode = (path: string): boolean => isModule(path) && underAny(path, CONSTANTS.codeRoots);
const isPage = (path: string): boolean => isMarkdown(path) && underAny(path, CONSTANTS.pageRoots);
const isConsumerModule = (path: string): boolean => isModule(path) && path.startsWith(`${CONSTANTS.consumerRoot}/`);
/** One pass over (path, text) pairs: code modules by the code reader, pages by the sentence reader. */
function survey(texts: readonly (readonly [string, string])[]): Survey {
  const code: string[] = [];
  const pages: string[] = [];
  const findings: string[] = [];
  const quieted: string[] = [];
  let readings = 0;
  for (const [path, text] of texts) {
    if (isModule(path)) {
      code.push(path);
      for (const site of codeSites(path, text)) {
        readings += 1;
        const one = textReadings(`${path}:${site.line} ${site.via}`, site.text);
        findings.push(...one.findings);
        quieted.push(...one.quieted);
      }
    } else {
      pages.push(path);
      const one = textReadings(path, text);
      readings += sentences(text).length;
      findings.push(...one.findings);
      quieted.push(...one.quieted);
    }
  }
  return { code, pages, findings: [...new Set(findings)], quieted: [...new Set(quieted)], readings };
}
const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
/** What git would commit below the code and page roots: tracked or untracked, never ignored. */
function gitList(base: string): string[] {
  const roots = [...new Set([...CONSTANTS.codeRoots, ...CONSTANTS.pageRoots])].sort(byName);
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...roots], { cwd: base, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(base, path)) && (isCode(path) || isPage(path))))].sort(byName);
}
function readTexts(base: string, paths: readonly string[]): [string, string][] {
  return paths.map(path => [path, readFileSync(join(base, path), "utf8")]);
}
/** Every regular file below the roots that the readers take; a symlink is reported, never followed. */
function walkTree(base: string): { readonly files: string[]; readonly links: string[] } {
  const files: string[] = [];
  const links: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(join(base, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isSymbolicLink()) links.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && (isCode(path) || isPage(path))) files.push(path);
    }
  };
  for (const root of [...new Set([...CONSTANTS.codeRoots, ...CONSTANTS.pageRoots])].sort(byName)) {
    if (!existsSync(join(base, root))) continue;
    if (lstatSync(join(base, root)).isSymbolicLink()) links.push(root);
    else visit(root);
  }
  return { files: files.sort(byName), links: links.sort(byName) };
}
function ignored(base: string, paths: readonly string[]): Set<string> {
  const result = spawnSync("git", ["check-ignore", "--stdin", "-z"], { cwd: base, input: paths.join("\0"), encoding: "utf8", maxBuffer: 1 << 26 });
  if (result.status !== 0 && result.status !== 1) throw new Error(`git check-ignore failed: ${result.stderr}`);
  return new Set(result.stdout.split("\0").filter(path => path !== ""));
}
/** The walk, ignored files dropped, equals git's listing of the same scope. */
function walkAgreesWithGit(base: string): { readonly agrees: boolean; readonly links: string[] } {
  const walked = walkTree(base);
  const skip = ignored(base, walked.files);
  return { agrees: JSON.stringify(walked.files.filter(path => !skip.has(path))) === JSON.stringify(gitList(base)), links: walked.links };
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
/** The frozen tree: every file `keep` takes at CONSTANTS.frozenAt, read from git objects (symlinks skipped). */
function frozenTexts(keep: (path: string) => boolean): [string, string][] {
  const listing = execFileSync("git", ["ls-tree", "-r", "-z", "--full-tree", CONSTANTS.frozenAt], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  const entries = listing
    .split("\0")
    .filter(line => line !== "")
    .map(line => {
      const [meta = "", path = ""] = line.split("\t");
      const [mode = "", type = "", id = ""] = meta.split(" ");
      return { mode, type, id, path };
    })
    .filter(entry => entry.type === "blob" && entry.mode !== "120000" && keep(entry.path));
  const texts = readBlobs([...new Set(entries.map(entry => entry.id))]);
  return entries.map(entry => [entry.path, texts.get(entry.id) ?? ""]);
}
const frozenIsAncestor = (): boolean => spawnSync("git", ["merge-base", "--is-ancestor", CONSTANTS.frozenAt, "HEAD"], { cwd: REPO }).status === 0;
let livePass: Survey | undefined;
/** The live pass over Pi's code and page surfaces, computed once. */
function live(): Survey {
  livePass ??= survey(readTexts(REPO, gitList(REPO)));
  return livePass;
}

// ---------------------------------------------------------------------------------------------------------------- the consumer
const DEPENDENCY_TABLES = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"] as const;
function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
/** Every stem a module's code readings name: `<path>:<line> <via> <stems>`. */
function consumerSites(path: string, text: string): string[] {
  return codeSites(path, text).flatMap(site => {
    const stems = stemsOf(site.text);
    return stems.length === 0 ? [] : [`${path}:${site.line} ${site.via} ${stems.join("+")}`];
  });
}
/** Every dependency name or specifier in package.json's four tables that names a stem: `<table>.<name>`. */
function consumerDependencies(manifest: string): string[] {
  const parsed: unknown = JSON.parse(manifest);
  if (!isObject(parsed)) return [];
  return DEPENDENCY_TABLES.flatMap(field => {
    const table = parsed[field];
    if (!isObject(table)) return [];
    return Object.entries(table)
      .filter(([name, spec]) => stemsOf(name).length > 0 || (typeof spec === "string" && stemsOf(spec).length > 0))
      .map(([name]) => `${field}.${name}`);
  });
}
interface ConsumerReading {
  readonly modules: string[];
  readonly readings: number;
  readonly sites: string[];
  readonly dependencies: string[];
  readonly tables: number;
}
function consumerOf(texts: readonly (readonly [string, string])[], manifest: string): ConsumerReading {
  const modules = texts.filter(([path]) => isConsumerModule(path));
  const parsed: unknown = JSON.parse(manifest);
  return {
    modules: modules.map(([path]) => path),
    readings: modules.reduce((total, [path, text]) => total + codeSites(path, text).length, 0),
    sites: modules.flatMap(([path, text]) => consumerSites(path, text)),
    dependencies: consumerDependencies(manifest),
    tables: isObject(parsed) ? DEPENDENCY_TABLES.filter(field => isObject(parsed[field])).length : 0,
  };
}
function liveConsumer(base: string): ConsumerReading {
  const manifest = existsSync(join(base, "package.json")) ? readFileSync(join(base, "package.json"), "utf8") : "{}";
  return consumerOf(readTexts(base, gitList(base).filter(isConsumerModule)), manifest);
}
function gateOf(sites: readonly string[], dependencies: readonly string[]): Gate {
  return sites.length === 0 && dependencies.length === 0 ? "ABSENT" : "PRESENT";
}
function guard(gate: Gate, findings: readonly string[]): Verdict {
  return gate === "PRESENT" ? "owed" : findings.length === 0 ? "pass" : "fail";
}
/** The duties an owed verdict names: the armed duties and the acceptance, which bind at adoption. */
function owed(gate: Gate): string[] {
  return gate === "PRESENT" ? ROSTER.unclaimed.map(entry => entry.id) : [];
}

// ---------------------------------------------------------------------------------------------------------- the runtime surfaces
interface RuntimeSite {
  readonly where: string;
  readonly text: string;
}
/** Every key and string of a value at any depth, each with its path. */
function textsOf(value: unknown, path: string): RuntimeSite[] {
  if (typeof value === "string") return [{ where: path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => textsOf(item, `${path}[${index}]`));
  if (isObject(value)) return Object.entries(value).flatMap(([key, child]) => [{ where: `${path}.${key}#key`, text: key }, ...textsOf(child, `${path}.${key}`)]);
  return [];
}
function siteFindings(sites: readonly RuntimeSite[]): string[] {
  return sites.flatMap(site => textReadings(site.where, site.text).findings);
}
interface PiTool {
  readonly name: string;
  readonly label: unknown;
  readonly description: unknown;
  readonly promptSnippet: unknown;
  readonly promptGuidelines: unknown;
  readonly parameters: unknown;
}
function toPiTool(value: unknown): PiTool {
  if (!isObject(value) || typeof value.name !== "string") throw new Error("census: a registered Pi tool without a name");
  return { name: value.name, label: value.label, description: value.description, promptSnippet: value.promptSnippet, promptGuidelines: value.promptGuidelines, parameters: value.parameters };
}
interface Surfaces {
  readonly prompts: RuntimeSite[];
  readonly descriptions: RuntimeSite[];
  readonly inputs: RuntimeSite[];
}
/** A Pi tool's texts by surface: its prompt snippet and guidelines, its name, label and description, its parameters. */
function piToolSurfaces(tools: readonly PiTool[]): Surfaces {
  return {
    prompts: tools.flatMap(tool => [...textsOf(tool.promptSnippet, `pi:${tool.name}.promptSnippet`), ...textsOf(tool.promptGuidelines, `pi:${tool.name}.promptGuidelines`)]),
    descriptions: tools.flatMap(tool => [...textsOf(tool.name, `pi:${tool.name}.name`), ...textsOf(tool.label, `pi:${tool.name}.label`), ...textsOf(tool.description, `pi:${tool.name}.description`)]),
    inputs: tools.flatMap(tool => textsOf(tool.parameters, `pi:${tool.name}.parameters`)),
  };
}
/** A listed MCP tool's texts by surface: every field but its input schema describes it; the input schema is its input. */
function curatedSurfaces(instructions: string, tools: readonly Record<string, unknown>[]): Surfaces {
  return {
    prompts: textsOf(instructions, "mcp:instructions"),
    descriptions: tools.flatMap(tool => {
      const { inputSchema: _input, ...rest } = tool;
      return textsOf(rest, `mcp:${String(tool.name)}`);
    }),
    inputs: tools.flatMap(tool => textsOf(tool.inputSchema, `mcp:${String(tool.name)}.inputSchema`)),
  };
}
/** A descriptor's texts by surface: every field but its input schema describes it; the input schema is its input. */
function descriptorSurfaces(leg: string, descriptors: readonly CapabilityDescriptor[]): Surfaces {
  return {
    prompts: [],
    descriptions: descriptors.flatMap(descriptor => {
      const { inputSchema: _input, ...rest } = descriptor;
      return textsOf(rest, `${leg}:${descriptor.id}`);
    }),
    inputs: descriptors.flatMap(descriptor => textsOf(descriptor.inputSchema, `${leg}:${descriptor.id}.inputSchema`)),
  };
}
/** Clients and readers that count every call: registration stores the descriptor, and no admitted input should reach them. */
const calls = { count: 0 };
const NEVER = (): never => {
  calls.count += 1;
  throw new Error("census: a registered capability is never invoked");
};
const FORGE_CLIENT: ForgeReadClient = { gate: { status: async () => NEVER() } };
const FURNACE_CLIENT: FurnaceReadClient = { runs: { get: () => ({ inspect: async () => NEVER() }) } };
const HX_READER: HyperUnixReader = { find: async () => NEVER(), runtime: async () => NEVER(), async close() {} };
const RF_INVOKE: Parameters<typeof registerReactiveFiberRender>[1] = async () => NEVER();
function injectedRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerForgeGateStatus(registry, FORGE_CLIENT, "0.1.0");
  registerHyperUnixFind(registry, HX_READER, REPO);
  registerFurnaceRunInspect(registry, FURNACE_CLIENT, REPO);
  registerReactiveFiberRender(registry, RF_INVOKE, REPO);
  return registry;
}
let nativeCache: Promise<CapabilityRegistry> | undefined;
function nativeRegistry(): Promise<CapabilityRegistry> {
  nativeCache ??= loadWorkbenchNative().then(modules => {
    const registry = new CapabilityRegistry();
    modules.registerNativeProviders(registry, REPO);
    return registry;
  });
  return nativeCache;
}
const descriptorsOf = (registry: CapabilityRegistry): CapabilityDescriptor[] => registry.catalogSnapshot().map(entry => entry.descriptor);
/** The real curated MCP server behind a real in-memory MCP client: its instructions and every tool it lists. */
async function curatedListing(registry: CapabilityRegistry): Promise<{ readonly instructions: string; readonly tools: Record<string, unknown>[] }> {
  const ids = descriptorsOf(registry).map(descriptor => descriptor.id);
  const server = createCuratedTools({ registry, allowedCapabilities: ids, grants: ids.map(id => `discover:${id}`), principal: { id: "census-principal", role: "census-role" }, workspace: REPO, invocationId: "pyel2-census", signal: new AbortController().signal });
  const client = new Client({ name: "pyel2-census-client", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  try {
    const listed = await client.listTools();
    return { instructions: client.getInstructions() ?? "", tools: listed.tools.map(tool => ({ ...tool })) };
  } finally {
    await client.close();
    await server.instance.close();
  }
}
/** The real extension booted hermetically with the workbench's Claude backend: every Pi tool it registers. */
async function bootedTools(): Promise<PiTool[]> {
  const hermetic = hermeticDir({ settings: { outputTranscript: false, workbench: { workflowAgentBackend: CONSTANTS.backend } } });
  try {
    const booted = makePi();
    subagentsExtension(booted.pi);
    await booted.lifecycle.get("session_start")?.({ type: "session_start" }, ctx({ cwd: hermetic.dir }));
    const tools = [...booted.tools.values()].map(toPiTool);
    await booted.lifecycle.get("session_shutdown")?.();
    return tools;
  } finally {
    Reflect.deleteProperty(globalThis, Symbol.for("pi-subagents:manager"));
    hermetic.restore();
  }
}
interface Runtime extends Surfaces {
  readonly piTools: string[];
  readonly described: boolean;
  readonly curated: string[];
  readonly instructions: boolean;
  readonly native: string[];
  readonly injected: string[];
  readonly defaultAgents: string[];
  readonly guidelines: number;
  readonly agentParameters: string[];
}
let runtimeCache: Promise<Runtime> | undefined;
async function readRuntime(): Promise<Runtime> {
  const native = await nativeRegistry();
  const injected = injectedRegistry();
  const listing = await curatedListing(native);
  const tools = await bootedTools();
  const agents = [...DEFAULT_AGENTS.entries()].map(([name, config]) => ({ name, config }));
  const parts: Surfaces[] = [
    { prompts: agents.flatMap(agent => textsOf(agent.config, `defaults:${agent.name}`)), descriptions: [], inputs: [] },
    piToolSurfaces(tools),
    curatedSurfaces(listing.instructions, listing.tools),
    descriptorSurfaces("native", descriptorsOf(native)),
    descriptorSurfaces("injected", descriptorsOf(injected)),
  ];
  const agentTool = tools.find(tool => tool.name === "Agent");
  const agentProperties = isObject(agentTool?.parameters) && isObject(agentTool.parameters.properties) ? Object.keys(agentTool.parameters.properties) : [];
  return {
    prompts: parts.flatMap(part => part.prompts),
    descriptions: parts.flatMap(part => part.descriptions),
    inputs: parts.flatMap(part => part.inputs),
    piTools: tools.map(tool => tool.name).sort(byName),
    described: tools.every(tool => typeof tool.description === "string" && tool.description.trim() !== ""),
    curated: listing.tools.map(tool => String(tool.name)).sort(byName),
    instructions: listing.instructions.trim() !== "",
    native: descriptorsOf(native)
      .map(descriptor => descriptor.id)
      .sort(byName),
    injected: descriptorsOf(injected)
      .map(descriptor => descriptor.id)
      .sort(byName),
    defaultAgents: agents.map(agent => agent.name).sort(byName),
    guidelines: tools.filter(tool => Array.isArray(tool.promptGuidelines) && tool.promptGuidelines.length > 0).length,
    agentParameters: agentProperties.sort(byName),
  };
}
function runtime(): Promise<Runtime> {
  runtimeCache ??= readRuntime();
  return runtimeCache;
}

// ----------------------------------------------------------------------------------------------------------------- the boundary
/** The demand keys: the vocabulary's own spellings as camelCase input keys (each reads as a finding, B3 keys). */
const capitalized = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
const [CARRIER_FIRST = "", CARRIER_SECOND = ""] = VOCABULARY.carrier[0] ?? [];
const DEMAND_KEYS: readonly string[] = [
  `${VOCABULARY.subject[0]}${capitalized(VOCABULARY.families.demand[0] ?? "")}`,
  `${VOCABULARY.subject[0]}${capitalized(VOCABULARY.families.precision[0] ?? "")}`,
  `${CARRIER_FIRST}${capitalized(CARRIER_SECOND)}`,
];
/** The admitted inputs of a schema: one per arm (the oneOf arms, or the schema itself), each required string given a value. */
function admittedArms(schema: unknown): Record<string, string>[] {
  if (!isObject(schema)) return [];
  const arms: unknown[] = Array.isArray(schema.oneOf) ? schema.oneOf : [schema];
  return arms.filter(isObject).map(arm => {
    const required = Array.isArray(arm.required) ? arm.required.filter((key): key is string => typeof key === "string") : [];
    return Object.fromEntries(required.map(key => [key, `fixture-${key}`]));
  });
}
const armName = (input: Readonly<Record<string, string>>): string => `{${Object.keys(input).join(",")}}`;
async function outcomeOf(run: () => Promise<unknown>): Promise<string> {
  try {
    await run();
    return "returned";
  } catch (error) {
    return error instanceof CapabilityError ? error.category : "thrown";
  }
}
/** Every registered capability of the injected registrations: each admitted arm reaches its client, each demand-keyed copy is
 * refused at input validation and reaches none. */
async function refusalMatrix(): Promise<string[]> {
  const registry = injectedRegistry();
  const descriptors = descriptorsOf(registry).sort((a, b) => byName(a.id, b.id));
  const grants = [...new Set(descriptors.flatMap(descriptor => descriptor.permissions))];
  const context = () => ({ grants, signal: new AbortController().signal });
  const out: string[] = [];
  for (const descriptor of descriptors) {
    for (const arm of admittedArms(descriptor.inputSchema)) {
      const before = calls.count;
      const control = await outcomeOf(() => registry.invoke(descriptor.id, arm, context()));
      out.push(`${descriptor.id} ${armName(arm)}: ${control} reached=${calls.count > before}`);
      for (const key of DEMAND_KEYS) {
        const start = calls.count;
        const refused = await outcomeOf(() => registry.invoke(descriptor.id, { ...arm, [key]: "fixture-demand" }, context()));
        out.push(`${descriptor.id} ${armName(arm)} +${key}: ${refused} reached=${calls.count > start}`);
      }
    }
  }
  return out;
}
/** Every input arm of a schema: its declared closure and property names. */
function armsOf(schema: unknown): { readonly closed: boolean; readonly properties: string[] }[] {
  if (!isObject(schema)) return [];
  const arms: unknown[] = Array.isArray(schema.oneOf) ? schema.oneOf : [schema];
  return arms.filter(isObject).map(arm => ({ closed: arm.additionalProperties === false, properties: isObject(arm.properties) ? Object.keys(arm.properties).sort(byName) : [] }));
}
const scratches: string[] = [];
const cleanups: Array<() => Promise<void>> = [];
const originalPath = process.env.PATH;
afterEach(async () => {
  for (const close of cleanups.splice(0)) await close();
  process.env.PATH = originalPath;
  removeScratch(...scratches.splice(0));
});
function scratch(prefix: string): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  return realpathSync(dir);
}
/** The stand-in rf as the ONLY PATH entry: it records its argv and prints the full-shape offline envelope. */
function standIn(root: string): string {
  const dir = scratch("pyel2-rf-");
  const record = join(dir, "argv.json");
  writeFileSync(join(dir, "rf"), [`#!${process.execPath}`, "const fs = require('node:fs');", `fs.writeFileSync(${JSON.stringify(record)}, JSON.stringify(process.argv.slice(2)));`, `process.stdout.write(${JSON.stringify(JSON.stringify(fullShapeRf(root)))});`, ""].join("\n"));
  chmodSync(join(dir, "rf"), 0o700);
  process.env.PATH = dir;
  return record;
}
function seamRegistry(root: string): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, root);
  return registry;
}
const SEAM_GRANTS = ["reactivefiber:render"];
const SCRIPT_HEAD = 'export const meta = { name: "edc-demand-channel", description: "R4 boundary keys" };\n';
async function viaInvoke(root: string, input: Readonly<Record<string, string>>): Promise<string> {
  return outcomeOf(() => seamRegistry(root).invoke(CONSTANTS.seam, input, { grants: SEAM_GRANTS, signal: new AbortController().signal }));
}
async function viaNode(root: string, input: Readonly<Record<string, string>>): Promise<string> {
  const host = createClaudeWorkflowHost({ cwd: root, capabilities: seamRegistry(root), grants: SEAM_GRANTS, principal: { id: "census-principal", role: "census-role" }, invocationId: "pyel2-node" });
  const result = await runWorkflow({ script: `${SCRIPT_HEAD}return await node(${JSON.stringify(CONSTANTS.seam)}, ${JSON.stringify(input)});`, host });
  return result.status === "completed" ? "returned" : (result.capabilityError?.category ?? result.status);
}
async function curatedInvoker(root: string): Promise<(input: Readonly<Record<string, string>>) => Promise<string>> {
  const server = createCuratedTools({
    registry: seamRegistry(root),
    allowedCapabilities: [CONSTANTS.seam],
    grants: [`discover:${CONSTANTS.seam}`, `invoke:${CONSTANTS.seam}`, ...SEAM_GRANTS],
    principal: { id: "census-principal", role: "census-role" },
    workspace: root,
    invocationId: "pyel2-agent",
    signal: new AbortController().signal,
  });
  const client = new Client({ name: "pyel2-census-invoker", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  cleanups.push(async () => {
    await client.close();
    await server.instance.close();
  });
  return async input => {
    const result = await client.callTool({ name: "capability_invoke", arguments: { capabilityId: CONSTANTS.seam, capabilityVersion: "1.0.0", input } });
    const content: unknown = result.content;
    const first: unknown = Array.isArray(content) ? content[0] : undefined;
    if (!isObject(first) || typeof first.text !== "string") return "unreadable";
    const payload: unknown = JSON.parse(first.text);
    if (!isObject(payload)) return "unreadable";
    return payload.kind === "rejected" ? String(payload.category) : String(payload.kind);
  };
}
/** The seam through all three paths: every demand-keyed copy of each admitted arm, then one admitted control; each path's
 * stand-in records whether rf spawned and with what argv. */
async function seamPaths(): Promise<Record<string, { readonly refusals: string[]; readonly spawnedOnRefusal: boolean; readonly control: string; readonly controlArgv: string[] | null }>> {
  const root = scratch("pyel2-seam-");
  const arms = admittedArms(descriptorsOf(seamRegistry(root)).find(descriptor => descriptor.id === CONSTANTS.seam)?.inputSchema);
  const curated = await curatedInvoker(root);
  const paths: Record<string, (input: Readonly<Record<string, string>>) => Promise<string>> = { invoke: input => viaInvoke(root, input), node: input => viaNode(root, input), capability_invoke: curated };
  const out: Record<string, { refusals: string[]; spawnedOnRefusal: boolean; control: string; controlArgv: string[] | null }> = {};
  for (const [name, run] of Object.entries(paths)) {
    const record = standIn(root);
    const refusals: string[] = [];
    for (const arm of arms) for (const key of DEMAND_KEYS) refusals.push(`${armName(arm)} +${key}: ${await run({ ...arm, [key]: "fixture-demand" })}`);
    const spawnedOnRefusal = existsSync(record);
    const control = await run({ model: "fixture-model", task: "fixture-task" });
    const argv: unknown = existsSync(record) ? JSON.parse(readFileSync(record, "utf8")) : null;
    out[name] = { refusals, spawnedOnRefusal, control, controlArgv: Array.isArray(argv) ? argv.map(word => (word === root ? "<root>" : String(word))) : null };
  }
  return out;
}

// -------------------------------------------------------------------------------------------------------------- the replicas
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
const codeOf = (text: string, path = "src/plant.ts"): string[] => survey([[path, text]]).findings;
const consumerOfCode = (text: string, path = "src/plant.ts"): string[] => consumerSites(path, text);
const LOOKALIKE_A = String.fromCodePoint(0x0430);
const FULLWIDTH_E = String.fromCodePoint(0xff25);
const INVISIBLE = String.fromCodePoint(0x200b);
/** A word in fullwidth letters (each ASCII letter moved to its fullwidth form), which NFKC folds back. */
const fullwidth = (word: string): string => [...word].map(letter => String.fromCodePoint((letter.codePointAt(0) ?? 0) + 0xfee0)).join("");
/** A template placeholder opener for planted code, spelled in two parts so no literal of this file holds one. */
const HOLE = "$" + "{";
/** A ReactiveComponents package specifier, assembled from parts at run time: no literal of this file spells the distribution, so
 * the sibling census that reads every module's load positions (test/workbench-rc-remote-component-stream-census.test.ts) holds
 * over this file too. */
const RC_SPECIFIER = ["@reactive", "components/sdk"].join("-");
const PLANT = "Set the context demand before the render.";
const PLANT_TWIN = "Never set the context demand before the render.";
/** A plant for each form the header's B1 paragraph names (its LEXEME, ACCESS, MEMBER - the member kinds and the enclosing
 * declarations - and IMPORT lists, in that order): each spells the subject and a family together through its form, so the form's
 * reading is a finding no other reading of the plant spells (a reading's line or via tells it apart). A template head starts its
 * template, so its finding is the template's own as spelled (findings are a set): the head is held by the readings counts and A2's
 * template route, and the middle and tail rows carry the template parts. Among them the cut #2 refusal's four forms (U1: a nested
 * binding key, a destructuring assignment key, a parameter property, an import-equals) and its riders (F3 a namespace's member,
 * F5 JSX text in a .tsx module). */
const FORMS: Readonly<Record<string, readonly [path: string, code: string]>> = {
  "lexeme.identifier": ["src/plant.ts", "export const contextDemand = 1;\n"],
  "lexeme.private-name": ["src/plant.ts", "export class Plant {\n  #contextDemand = 1;\n}\n"],
  "lexeme.string": ["src/plant.ts", 'export const prompt = "Set the context demand first.";\n'],
  "lexeme.no-substitution-template": ["src/plant.ts", "export const prompt = `Set the context demand first.`;\n"],
  "lexeme.template-middle": ["src/plant.ts", `export const prompt = \`First line.\n${HOLE}name} set the context demand ${HOLE}place} last.\`;\n`],
  "lexeme.template-tail": ["src/plant.ts", `export const prompt = \`First line.\n${HOLE}name} set the context demand.\`;\n`],
  "lexeme.regular-expression": ["src/plant.ts", "export const pattern = /context demand/;\n"],
  "lexeme.jsx-text-tsx": ["src/plant.tsx", "export const View = () => <p>Set the context demand first.</p>;\n"],
  "lexeme.jsx-text-jsx": ["src/plant.jsx", "export const View = () => <p>Set the context demand first.</p>;\n"],
  "lexeme.template-literal-type": ["src/plant.ts", `export type Prompt = \`context ${HOLE}string} demand\`;\n`],
  "lexeme.template-as-spelled": ["src/plant.ts", `export const prompt = \`Set the context ${HOLE}name} demand.\`;\n`],
  "lexeme.concatenation": ["src/plant.ts", 'export const prompt = "Set the context " + "demand.";\n'],
  "access.property-access": ["src/plant.ts", "export const value = context.demand;\n"],
  "access.qualified-name": ["src/plant.ts", "export type Value = Context.Demand;\n"],
  "access.element-access": ["src/plant.ts", 'export const value = context["demand"];\n'],
  "access.indexed-access-type": ["src/plant.ts", 'export type Value = Context["demand"];\n'],
  "access.binding-initializer": ["src/plant.ts", "export function read(context: Options): unknown {\n  const { demand } = context;\n  return demand;\n}\n"],
  "access.binding-for-of": ["src/plant.ts", "export function read(contexts: Options[]): unknown {\n  for (const { demand } of contexts) return demand;\n  return undefined;\n}\n"],
  "access.binding-for-in": ["src/plant.ts", "export function read(contexts: Options): unknown {\n  for (const { demand } in contexts) return demand;\n  return undefined;\n}\n"],
  "access.binding-parameter-type": ["src/plant.ts", "export function read({ demand }: Context): unknown {\n  return demand;\n}\n"],
  "access.binding-parameter-default": ["src/plant.ts", "export function read({ demand } = context): unknown {\n  return demand;\n}\n"],
  "access.binding-nested": ["src/plant.ts", "export function read(opts: Options): unknown {\n  const { context: { demand } } = opts;\n  return demand;\n}\n"],
  "access.binding-computed-key": ["src/plant.ts", 'export function read(context: Options): unknown {\n  const { ["demand"]: wanted } = context;\n  return wanted;\n}\n'],
  "access.binding-array-element": ["src/plant.ts", "export function read(contexts: Options[]): unknown {\n  const [{ demand }] = contexts;\n  return demand;\n}\n"],
  "access.assignment": ["src/plant.ts", "export let demand: unknown;\n({ demand } = context);\n"],
  "access.assignment-nested": ["src/plant.ts", "export let demand: unknown;\n({ inner: { demand } } = context);\n"],
  "access.assignment-computed-key": ["src/plant.ts", 'export let wanted: unknown;\n({ ["demand"]: wanted } = context);\n'],
  "access.assignment-array-element": ["src/plant.ts", "export let demand: unknown;\n[{ demand }] = contexts;\n"],
  "access.assignment-for-of": ["src/plant.ts", "export let demand: unknown;\nfor ({ demand } of contexts) break;\n"],
  "access.assignment-for-in": ["src/plant.ts", "export let demand: unknown;\nfor ({ demand } in contexts) break;\n"],
  "member.property-assignment": ["src/plant.ts", "export const context = { demand: 1 };\n"],
  "member.shorthand": ["src/plant.ts", "const demand = 1;\nexport const context = { demand };\n"],
  "member.object-method": ["src/plant.ts", "export const context = {\n  demand(): number {\n    return 1;\n  },\n};\n"],
  "member.object-accessor": ["src/plant.ts", "export const context = {\n  get demand(): number {\n    return 1;\n  },\n};\n"],
  "member.computed-name": ["src/plant.ts", 'export const context = { ["demand"]: 1 };\n'],
  "member.class-property": ["src/plant.ts", 'export class Context {\n  readonly demand: string = "";\n}\n'],
  "member.class-method": ["src/plant.ts", "export class Context {\n  demand(): void {}\n}\n"],
  "member.class-accessor": ["src/plant.ts", "export class Context {\n  get demand(): number {\n    return 1;\n  }\n}\n"],
  "member.class-setter": ["src/plant.ts", "export class Context {\n  set demand(value: number) {}\n}\n"],
  "member.class-expression": ["src/plant.ts", "export const Plant = class Context {\n  demand = 1;\n};\n"],
  "member.function-expression": ["src/plant.ts", "export const Plant = function context() {\n  return { demand: 1 };\n};\n"],
  "member.parameter-property": ["src/plant.ts", "export class Context {\n  constructor(readonly demand: string) {}\n}\n"],
  "member.interface-property": ["src/plant.ts", "export interface Context {\n  demand: string;\n}\n"],
  "member.interface-method": ["src/plant.ts", "export interface Context {\n  demand(): void;\n}\n"],
  "member.type-literal": ["src/plant.ts", "export type Context = {\n  demand: string;\n};\n"],
  "member.enum-member": ["src/plant.ts", "export enum Context {\n  Demand = 1,\n}\n"],
  "member.namespace-variable": ["src/plant.ts", "export namespace Context {\n  export const demand = 1;\n}\n"],
  "member.namespace-function": ["src/plant.ts", "export namespace Context {\n  export function demand(): void {}\n}\n"],
  "member.namespace-class": ["src/plant.ts", "export namespace Context {\n  export class Demand {}\n}\n"],
  "member.namespace-interface": ["src/plant.ts", "export namespace Context {\n  export interface Demand {}\n}\n"],
  "member.namespace-type-alias": ["src/plant.ts", "export namespace Context {\n  export type Demand = string;\n}\n"],
  "member.namespace-enum": ["src/plant.ts", "export namespace Context {\n  export enum Demand {}\n}\n"],
  "member.namespace-namespace": ["src/plant.ts", "export namespace Context {\n  export namespace Demand {}\n}\n"],
  "member.namespace-dotted": ["src/plant.ts", "export namespace Context.Demand {}\n"],
  "member.module-body": ["src/plant.ts", 'declare module "context-store" {\n  export const demand: number;\n}\n'],
  "member.enclosing-property": ["src/plant.ts", "export const plant = { context: { demand: 1 } };\n"],
  "member.enclosing-shorthand": ["src/plant.ts", "export let context: unknown;\n({ context = { demand: 1 } } = source);\n"],
  "member.enclosing-property-declaration": ["src/plant.ts", "export class Plant {\n  context = { demand: 1 };\n}\n"],
  "member.enclosing-property-signature": ["src/plant.ts", "export interface Plant {\n  context: { demand: string };\n}\n"],
  "member.enclosing-method": ["src/plant.ts", "export class Plant {\n  context() {\n    return { demand: 1 };\n  }\n}\n"],
  "member.enclosing-method-signature": ["src/plant.ts", "export interface Plant {\n  context(): { demand: string };\n}\n"],
  "member.enclosing-getter": ["src/plant.ts", "export class Plant {\n  get context() {\n    return { demand: 1 };\n  }\n}\n"],
  "member.enclosing-setter": ["src/plant.ts", "export class Plant {\n  set context(value: { demand: string }) {}\n}\n"],
  "member.enclosing-function": ["src/plant.ts", "export function context() {\n  return { demand: 1 };\n}\n"],
  "member.enclosing-enum-member": ["src/plant.ts", "export enum Plant {\n  context = ({ demand: 1 }).demand,\n}\n"],
  "member.enclosing-parameter-property": ["src/plant.ts", "export class Plant {\n  constructor(readonly context: { demand: string }) {}\n}\n"],
  "import.default": ["src/plant.ts", 'import demand from "./context.js";\nexport { demand };\n'],
  "import.namespace": ["src/plant.ts", 'import * as demand from "./context.js";\nexport { demand };\n'],
  "import.named": ["src/plant.ts", 'import { demand } from "./context.js";\nexport { demand };\n'],
  "import.named-module-name": ["src/plant.ts", 'import { demand as wanted } from "./context.js";\nexport { wanted };\n'],
  "import.named-alias": ["src/plant.ts", 'import { wanted as demand } from "./context.js";\nexport { demand };\n'],
  "import.re-export": ["src/plant.ts", 'export { demand } from "./context.js";\n'],
  "import.re-export-module-name": ["src/plant.ts", 'export { demand as wanted } from "./context.js";\n'],
  "import.re-export-alias": ["src/plant.ts", 'export { wanted as demand } from "./context.js";\n'],
  "import.re-export-namespace": ["src/plant.ts", 'export * as demand from "./context.js";\n'],
  "import.equals-require": ["src/plant.cts", 'import demand = require("./context.cjs");\nexport = demand;\n'],
  "import.equals-entity": ["src/plant.ts", "import demand = Context.Inner;\nexport { demand };\n"],
};

// ------------------------------------------------------------------------------------------------------------------- the pins
/** B4's witness over a bead row: the demand reading itself and its quiet rows; only R-SYNONYM reads the row, through its owner
 * filing block. */
function demandWitness(row: BeadRow): { [key: string]: Json } {
  const subjects = ["The context demand rides in the prompt.", "Contexts demand a tool call.", "contextDemand", "context_precision", "CONTEXT-PRECISION", `The ${INVISIBLE}context demand rides in the prompt.`, `The context dem${INVISIBLE}and rides in the prompt.`, `The ${fullwidth("CONTEXT")} demand rides in the prompt.`].map(verdict);
  const families = [...VOCABULARY.families.demand, ...VOCABULARY.families.precision].map(word => verdict(`The context ${word} rides in the prompt.`));
  const carrier = ["Send a projection requirement.", "projectionRequirements", "Projection-Requirement", "a projection requirement for the render"].map(verdict);
  const markers = [...VOCABULARY.markers.map(word => verdict(`The context demand is ${word} a tool call.`)), verdict("The context demand isn't a tool call."), verdict(`The context demand isn${String.fromCodePoint(0x2019)}t a tool call.`)];
  const nearMisses = ["Retrieve an authorized provider contract on demand.", "Be thorough and precise", "If true, fork parent conversation into the agent. Default: false (fresh context).", "A projection of the requirement.", "The project requirement."].map(text => readSentence(text).kind);
  const cuts = [
    textReadings("t", "Render the context. The context demand rides in the prompt.").findings,
    textReadings("t", "The context\ndemand rides in the prompt.").findings,
    textReadings("t", "| context | demand |\n| --- | --- |").findings,
    textReadings("t", "The context\n- demand").findings,
    textReadings("t", "# The context\ndemand").findings,
    textReadings("t", "The context demand rides; the host owns none of it.").findings,
  ];
  const quiet = {
    "R-PARAPHRASE": ["Ask for more context when you need it.", "Request a narrower context.", "Tighten the context to the failing file.", "Pass a larger context budget."].map(verdict),
    "R-SUBJECTLESS": ["Demand more evidence before answering.", "Be more precise about the files.", "Precision matters here."].map(verdict),
    "R-SPLIT": [textReadings("t", "Render the context. Demand is set by the model.").findings, textReadings("t", "Precision is set by the model.\n\nThe context follows.").findings],
    "R-MARKER-ANYWHERE": ["The context demand is a tool call, not a projection.", "No host decides; the model sets the context precision."].map(verdict),
    "R-LOOKALIKE": [`The context dem${LOOKALIKE_A}nd rides in the prompt.`, `The c${String.fromCodePoint(0x043e)}ntext demand rides in the prompt.`].map(verdict),
    "R-SYNONYM": synonymsOf(row),
  };
  expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "B4").map(residual => residual.id));
  return { subjects, families, carrier, markers, nearMisses, cuts, quiet };
}
const REACHED = new Set<string>();
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const reading = liveConsumer(REPO);
    const walk = walkAgreesWithGit(REPO);
    const manifest = execFileSync("git", ["show", `${CONSTANTS.frozenAt}:package.json`], { cwd: REPO, encoding: "utf8" });
    const frozen = consumerOf(
      frozenTexts(isConsumerModule),
      manifest,
    );
    return {
      gate: gateOf(reading.sites, reading.dependencies),
      sites: reading.sites,
      dependencies: reading.dependencies,
      floors: { srcModules: reading.modules.length >= FLOORS.srcModules, readings: reading.readings >= FLOORS.consumerReadings, tables: reading.tables >= 2 },
      walkAgreesWithGit: walk.agrees,
      links: walk.links,
      frozen: { revision: CONSTANTS.frozenAt, ancestor: frozenIsAncestor(), modules: frozen.modules.length, readings: frozen.readings, sites: frozen.sites, dependencies: frozen.dependencies, tables: frozen.tables },
    };
  },
  A2: async () => {
    const routes = {
      identifier: consumerOfCode("export const edcAssembler = 1;\n"),
      acronymPlural: consumerOfCode("export const EDCs: string[] = [];\n"),
      camel: consumerOfCode("parseEDC();\nnew EdcAssembler();\n"),
      string: consumerOfCode('export const key = "evidence-directed";\n'),
      joinedForms: consumerOfCode("export const EvidenceDirectedView = 1;\nexport const snake = 'evidence_directed';\n"),
      specifier: consumerOfCode('import { assemble } from "@plant/edc";\n'),
      dynamicImport: consumerOfCode('export const loaded = import("edc-assembly");\n'),
      template: consumerOfCode(`export const text = \`evidence directed ${HOLE}x}\`;\n`),
      member: consumerOfCode("export const options = { context: { edc: true } };\n"),
      invisible: consumerOfCode(`export const key = "e${INVISIBLE}dc";\n`),
      fullwidth: consumerOfCode(`export const key = "${FULLWIDTH_E}DC";\n`),
      javascript: consumerOfCode("module.exports = { edc: 1 };\n", "src/plant.cjs"),
      manifest: consumerDependencies('{"dependencies":{"edc-sdk":"1.0.0"},"devDependencies":{"x":"file:vendor/evidence-directed-0.1.0.tgz"},"optionalDependencies":{"EvidenceDirected":"*"},"peerDependencies":{"y":"^1"}}'),
    };
    const nearMisses = {
      comment: consumerOfCode("// The EDC assembler is not adopted.\n/* evidence-directed */\nexport {};\n"),
      inner: consumerOfCode("export const redcap = 1;\nexport const medcost = 2;\n"),
      evidenceAlone: consumerOfCode('export const evidence = "directed by the host";\n'),
      testModule: liveConsumerOfReplica({ "test/plant.test.ts": "export const edc = 1;\n", "qa/plant.mjs": "export const edc = 1;\n", "docs/plant.md": "EDC is adopted.\n", "examples/plant.js": "export const edc = 1;\n" }),
    };
    const quiet = {
      "R-UNNAMED-ADOPTION": [consumerOfCode(`import { renderBlock } from "${RC_SPECIFIER}";\n`), consumerOfCode("export const verdicts = queryView.judgments;\n")],
      // The cut #2 refusal, F4: a stem glued to a suffix the WORDS rule keeps in one word or splits after the acronym's last
      // capital reads no stem; each twin, the same stem split off, does.
      "R-GLUED-STEM": {
        unread: [consumerOfCode("export const EDCv2Assembler = 1;\n"), consumerOfCode("export const EDC2Assembler = 1;\n"), consumerOfCode("export const edc2_assembler = 1;\n")],
        readTwins: [consumerOfCode("export const EdcV2Assembler = 1;\n"), consumerOfCode("export const EDC_2Assembler = 1;\n"), consumerOfCode("export const edc_2_assembler = 1;\n")],
      },
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "A2").map(residual => residual.id));
    return { stems: { word: [...VOCABULARY.stems.word], joined: [...VOCABULARY.stems.joined] }, routes, nearMisses, quiet };
  },
  B1: async () => {
    const real = live();
    const walk = walkAgreesWithGit(REPO);
    const surfaces = await runtime();
    const frozen = survey(frozenTexts(path => isCode(path) || isPage(path)));
    const pagesUnder = (root: string): boolean => real.pages.filter(path => path.startsWith(`${root}/`)).length >= 1;
    // R-SCOPE quiet row: the planted sentence in every out-of-scope place is never listed, though each reads a finding alone.
    const outside: Record<string, string> = {
      "docs/workbench/plant.md": `${PLANT}\n`,
      "qa/plant.mjs": `export const prompt = ${JSON.stringify(PLANT)};\n`,
      "test/plant.test.ts": `export const prompt = ${JSON.stringify(PLANT)};\n`,
      "PLANT.md": `${PLANT}\n`,
      "vitest.plant.config.ts": `export const prompt = ${JSON.stringify(PLANT)};\n`,
      ".agents/skills/plant/agents/openai.yaml": `interface:\n  default_prompt: "${PLANT}"\n`,
      "src/plant-comment.ts": `// ${PLANT}\nexport {};\n`,
    };
    const replica = gitReplica("pyel2-scope-", outside);
    const listed = gitList(replica);
    const read = survey(readTexts(replica, listed));
    const quiet = {
      "R-SCOPE": { listed, findings: read.findings, aloneWouldFind: Object.keys(outside).sort(byName).filter(path => !listed.includes(path)).map(path => textReadings(path, PLANT).findings.length) },
      "R-COMPOSED": [
        codeOf(`const noun = pick();\nexport const prompt = \`Set the context ${HOLE}noun} first.\`;\n`),
        codeOf('const noun = pick();\nexport const prompt = "Raise the context " + noun + ".";\n'),
        codeOf('let prompt = "Set the context ";\nprompt += "demand first.";\nexport { prompt };\n'),
        codeOf('const parts = ["Set the context", "demand first."];\nexport const prompt = parts.join(" ");\n'),
      ],
      // The forms the code reader leaves unread (the cut #2 refusal, U1: the header names exactly what is read): each reads as its
      // lexemes alone, so it finds nothing; each twin spells the same words through a read form and finds them.
      "R-UNREAD-FORM": {
        unread: {
          untypedParameter: codeOf("export const read = (contexts: Options[]) => contexts.map(({ demand }) => demand);\n"),
          requireBinding: codeOf('const demand = require("./context.cjs");\nmodule.exports = { value: demand };\n', "src/plant.cjs"),
          dynamicImport: codeOf('export const demand = await import("./context.js");\n'),
          localExportAlias: codeOf("const demand = 1;\nexport { demand as context };\n"),
          callKey: codeOf('export const value = context.get("demand");\n'),
        },
        readTwins: {
          untypedParameter: codeOf("export const read = (contexts: Options[]) => contexts.map(({ demand }: Context) => demand);\n"),
          requireBinding: codeOf('import demand = require("./context.cjs");\nexport = demand;\n', "src/plant.cts"),
          dynamicImport: codeOf('import * as demand from "./context.js";\nexport { demand };\n'),
          localExportAlias: codeOf('export { demand as context } from "./context.js";\n'),
          callKey: codeOf('export const value = context["demand"];\n'),
        },
      },
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "B1").map(residual => residual.id));
    return {
      findings: [...real.findings, ...siteFindings(surfaces.prompts)],
      floors: {
        srcModules: real.code.filter(path => path.startsWith("src/")).length >= FLOORS.srcModules,
        exampleModules: real.code.filter(path => path.startsWith("examples/")).length >= FLOORS.exampleModules,
        pages: real.pages.length >= FLOORS.pages,
        everyPageRoot: CONSTANTS.pageRoots.map(pagesUnder),
        codeReadings: real.readings >= FLOORS.codeReadings,
        defaultAgents: surfaces.defaultAgents.length >= FLOORS.defaultAgents,
        guidelines: surfaces.guidelines >= FLOORS.guidelines,
        promptTexts: surfaces.prompts.length >= FLOORS.promptTexts,
        instructions: surfaces.instructions,
      },
      walkAgreesWithGit: walk.agrees,
      links: walk.links,
      frozen: { revision: CONSTANTS.frozenAt, ancestor: frozenIsAncestor(), modules: frozen.code.length, pages: frozen.pages.length, readings: frozen.readings, findings: frozen.findings, quieted: frozen.quieted },
      // One plant per form the header lists: the reading each form composes (the cut #2 refusal, U1).
      forms: Object.fromEntries(Object.entries(FORMS).map(([id, [path, code]]) => [id, codeOf(code, path)])),
      quiet,
    };
  },
  B2: async () => {
    const surfaces = await runtime();
    const planted: CapabilityDescriptor = {
      ...descriptorsOf(injectedRegistry())[0],
      id: "plant.capability",
      description: "Raise the context precision before rendering.",
    } as CapabilityDescriptor;
    const plants = {
      piTool: siteFindings(piToolSurfaces([{ name: "plant_tool", label: "Plant", description: `Read the files. ${PLANT}`, promptSnippet: undefined, promptGuidelines: undefined, parameters: undefined }]).descriptions),
      curatedTool: siteFindings(curatedSurfaces("", [{ name: "plant_tool", description: "Send a projection requirement to the assembler.", inputSchema: {} }]).descriptions),
      descriptor: siteFindings(descriptorSurfaces("planted", [planted]).descriptions),
    };
    return {
      findings: siteFindings(surfaces.descriptions),
      floors: {
        piTools: surfaces.piTools.length >= FLOORS.piTools,
        requiredPiTools: REQUIRED_PI_TOOLS.filter(name => !surfaces.piTools.includes(name)),
        everyToolDescribed: surfaces.described,
        curatedEqualsExport: JSON.stringify(surfaces.curated) === JSON.stringify([...CLAUDE_CAPABILITY_TOOL_NAMES].sort(byName)),
        nativeMissing: REQUIRED_DESCRIPTORS.filter(id => !surfaces.native.includes(id)),
        injectedMissing: REQUIRED_DESCRIPTORS.filter(id => !surfaces.injected.includes(id)),
        texts: surfaces.descriptions.length >= FLOORS.descriptionTexts,
      },
      plants,
    };
  },
  B3: async () => {
    const surfaces = await runtime();
    const native = await nativeRegistry();
    const seamArms = armsOf(descriptorsOf(native).find(descriptor => descriptor.id === CONSTANTS.seam)?.inputSchema);
    const plants = {
      piParameter: siteFindings(piToolSurfaces([{ name: "plant_tool", label: undefined, description: undefined, promptSnippet: undefined, promptGuidelines: undefined, parameters: { type: "object", properties: { contextDemand: { type: "string" } } } }]).inputs),
      curatedInput: siteFindings(curatedSurfaces("", [{ name: "plant_tool", inputSchema: { type: "object", properties: { mode: { type: "string", description: "The context precision to render at." } } } }]).inputs),
      descriptorInput: siteFindings(descriptorSurfaces("planted", [{ ...descriptorsOf(injectedRegistry())[0], id: "plant.capability", inputSchema: { type: "object", properties: { projection_requirement: { type: "string" } }, additionalProperties: false } } as CapabilityDescriptor]).inputs),
    };
    const agentInputs = surfaces.inputs.filter(site => site.where.startsWith("pi:Agent.parameters"));
    const quiet = {
      "R-UNNAMED-INPUT": {
        declared: surfaces.agentParameters.filter(name => words(name).some(word => SUBJECT.has(word))),
        findings: siteFindings(agentInputs),
        shapes: [siteFindings(textsOf({ scope: "narrow", detail: "high" }, "plant")), siteFindings(textsOf({ inherit_context: true }, "plant"))],
      },
    };
    expect(Object.keys(quiet)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "B3").map(residual => residual.id));
    return {
      findings: siteFindings(surfaces.inputs),
      floors: { texts: surfaces.inputs.length >= FLOORS.inputTexts },
      keys: DEMAND_KEYS.map(key => `${key}: ${verdict(key)}`),
      seamArms,
      matrix: await refusalMatrix(),
      seam: await seamPaths(),
      plants,
      quiet,
    };
  },
  B4: async () => {
    const row = beadRecord();
    const witness = demandWitness(row);
    // The quiet row (the cut #1 refusal, U1): a note appended after the owner filing block - spelling every vocabulary word and
    // restating the filing's citation and duties - leaves the whole B4 witness unchanged.
    const appended = appendedRow(row);
    expect(demandWitness(appended), "an appended note leaves the B4 witness unchanged").toEqual(witness);
    // Non-vacuity: read past the block, the same note spells every vocabulary word, so R-SYNONYM would hold none; and a block
    // edited in place is refused, never read through the note's restated copies.
    return { ...witness, appended: { pastBlock: synonymsOver(appended.title, appended.notes), edited: blockVerdict(() => demandWitness(editedRow(row))) } };
  },
  C1: async () => {
    const table = {
      gates: [gateOf([], []), gateOf(["src/x.ts:1 lexeme edc"], []), gateOf([], ["dependencies.edc-sdk"])],
      guards: [guard("ABSENT", []), guard("ABSENT", ["x:1 demand"]), guard("PRESENT", []), guard("PRESENT", ["x:1 demand"])],
      owed: [owed("ABSENT"), owed("PRESENT")],
    };
    const replica = gitReplica("pyel2-consumer-", {
      "src/consumer.ts": 'import { assemble } from "@plant/edc";\nexport const run = assemble;\n',
      "package.json": '{"name":"replica","dependencies":{"evidence-directed-assembly":"0.1.0"}}',
    });
    const reading = liveConsumer(replica);
    const gate = gateOf(reading.sites, reading.dependencies);
    return { table, replica: { sites: reading.sites, dependencies: reading.dependencies, gate, verdict: guard(gate, []), owed: owed(gate) } };
  },
  C2: async () => {
    const consumer = liveConsumer(REPO);
    const gate = gateOf(consumer.sites, consumer.dependencies);
    const real = live();
    const surfaces = await runtime();
    const runtimeSites = [...surfaces.prompts, ...surfaces.descriptions, ...surfaces.inputs];
    // ONE pass over every listed module and page, every runtime text and in-memory positives: exactly what the positives find alone,
    // asserted both ways (the cut #2 refusal, U2) - the pass holds every finding of the positives read alone, and beyond them it
    // holds exactly the live findings - and the pass read the live tree and the positives together.
    const positives: readonly (readonly [string, string])[] = [
      ["src/zz-plant.ts", "export const contextDemand = 1;\n"],
      [".pi/agents/zz-plant.md", "Raise the context precision when unsure.\n"],
      ["examples/zz-plant.md", "Pass a projection requirement to the render.\n"],
    ];
    const runtimePositives: RuntimeSite[] = [{ where: "pi:zz_plant.description", text: "Use this tool to set the context demand." }];
    const positivesAlone = survey(positives);
    const alone = [...positivesAlone.findings, ...siteFindings(runtimePositives)];
    expect(alone.length).toBeGreaterThanOrEqual(positives.length + runtimePositives.length);
    const onePass = survey([...readTexts(REPO, gitList(REPO)), ...positives]);
    const pass = [...onePass.findings, ...siteFindings([...runtimeSites, ...runtimePositives])];
    expect(alone.filter(finding => !pass.includes(finding)), "the one pass finds every finding of the positives").toEqual([]);
    const outside = pass.filter(finding => !alone.includes(finding));
    expect(outside, "beyond the positives, the one pass finds exactly the live findings").toEqual([...real.findings, ...siteFindings(runtimeSites)]);
    expect([onePass.code.length - real.code.length, onePass.pages.length - real.pages.length, onePass.readings - real.readings], "the one pass read the live tree and the positives together").toEqual([positivesAlone.code.length, positivesAlone.pages.length, positivesAlone.readings]);
    // The same guard over a scratch git repository: a plant per root, each beside a negated twin that stays quiet.
    const plants: Record<string, string> = {
      "src/plant.ts": "export const contextDemand = 1;\n",
      "src/plant-twin.ts": "export const noContextDemand = 1;\n",
      "examples/workflows/plant.js": 'export const prompt = "Raise the context precision.";\n',
      "examples/workflows/plant-twin.js": 'export const prompt = "Never raise the context precision.";\n',
      ".pi/agents/plant.md": `${PLANT}\n`,
      ".pi/agents/plant-twin.md": `${PLANT_TWIN}\n`,
      ".agents/skills/plant/SKILL.md": "Send a projection requirement with every render.\n",
      "examples/plant.md": "- The context demand rides in the prompt.\n",
      "docs/plant.md": `${PLANT}\n`,
    };
    const replica = gitReplica("pyel2-live-", plants);
    const mirror = survey(readTexts(replica, gitList(replica)));
    return {
      gate,
      verdict: guard(gate, outside),
      findings: outside,
      positives: alone,
      replica: { code: mirror.code, pages: mirror.pages, findings: mirror.findings, verdict: guard("ABSENT", mirror.findings), owed: guard("PRESENT", mirror.findings) },
    };
  },
};
/** A replica's consumer reading: only src modules and package.json are read. */
function liveConsumerOfReplica(files: Readonly<Record<string, string>>): string[] {
  const reading = liveConsumer(gitReplica("pyel2-near-", files));
  return [...reading.sites, ...reading.dependencies];
}

// ------------------------------------------------------------------------------------------------------------ the bead export
interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The bead's row in an export's text: its title and notes, never retyped here. */
function beadRowIn(text: string, where: string): BeadRow {
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string") return { title: row.title, notes: typeof row.notes === "string" ? row.notes : "" };
  }
  throw new Error(`census: ${BEAD} is not in ${where}`);
}
let beadCache: BeadRow | undefined;
/** The bead's row in the tracked export. */
function beadRecord(): BeadRow {
  beadCache ??= beadRowIn(readFileSync(join(REPO, BEAD_EXPORT), "utf8"), BEAD_EXPORT);
  return beadCache;
}
/** The bead's row in the export at CONSTANTS.frozenAt, read from git objects: its notes then were the owner filing alone. */
function frozenBeadRecord(): BeadRow {
  const where = `${CONSTANTS.frozenAt}:${BEAD_EXPORT}`;
  return beadRowIn(execFileSync("git", ["show", where], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 28 }), where);
}
const FILING_CHANGED = "owner filing block changed";
/** The owner filing block of a row: the byte-exact prefix of its notes the roster measures (filing: length and sha256). bd appends
 * every later note - a delivery, a gate verdict, a landing - after it, so no filing reading sees an appended note (the cut #1
 * refusal, U1: a whole-notes read went red at every ledger hop exporting a note that spells a vocabulary word); a block edited in
 * place or cut short is refused, never read through an appended copy. */
function ownerFiling(row: BeadRow): string {
  const block = row.notes.slice(0, ROSTER.filing.length);
  const digest = createHash("sha256").update(block, "utf8").digest("hex");
  if (block.length !== ROSTER.filing.length || digest !== ROSTER.filing.sha256) {
    throw new Error(`census: ${BEAD}'s ${FILING_CHANGED}: the first ${ROSTER.filing.length} characters of its notes digest ${digest.slice(0, 16)}, the roster measured ${ROSTER.filing.sha256.slice(0, 16)}`);
  }
  return block;
}
/** "refused" when `read` throws the changed-block refusal, "read" when it returns; any other error propagates. */
function blockVerdict(read: () => unknown): string {
  try {
    read();
    return "read";
  } catch (error) {
    if (error instanceof Error && error.message.includes(FILING_CHANGED)) return "refused";
    throw error;
  }
}
const filingDuties = (): string[] => ROSTER.unclaimed.filter(entry => entry.source === "filing").map(entry => entry.duty);
/** A note as a ledger hop exports one after the owner filing block (bd joins an appended note with a newline): it spells every
 * vocabulary word and restates the block's citation and filing duties, so a reading past the block would see them. */
function appendedNote(block: string): string {
  return ["", `GATE VERDICT (BIND) ${BEAD}: the delivery note spells ${VOCABULARY_WORDS.join(", ")}.`, `${CITATION.exec(block)?.[0] ?? ""}. ${filingDuties().join(" ")}`].join("\n");
}
/** The row with the note appended after all of its notes. */
const appendedRow = (row: BeadRow): BeadRow => ({ title: row.title, notes: `${row.notes}${appendedNote(row.notes.slice(0, ROSTER.filing.length))}` });
/** The row's owner filing block edited in place - its citation and filing duties cut out - followed by the note, which restates
 * both: a reading past the block would take the restated copies for the filing. */
function editedRow(row: BeadRow): BeadRow {
  const block = row.notes.slice(0, ROSTER.filing.length);
  const edited = filingDuties().reduce((text, duty) => text.replace(duty, ""), block.replace(CITATION, ""));
  return { title: row.title, notes: `${edited}${appendedNote(block)}` };
}
interface FilingReadings {
  readonly duties: readonly boolean[];
  readonly citation: readonly string[];
}
/** The filing readings over a text: each filing duty verbatim, and the first citation's path, line and pin. */
function readingsOver(text: string): FilingReadings {
  return { duties: filingDuties().map(duty => text.includes(duty)), citation: CITATION.exec(text)?.slice(1) ?? [] };
}
/** The filing readings of a row: over its owner filing block alone (never an appended note). */
const filingReadingsOf = (row: BeadRow): FilingReadings => readingsOver(ownerFiling(row));
/** R-SYNONYM over a title and a text: the vocabulary words that no word of them, nor of the producer line, spells. */
function synonymsOver(title: string, text: string): string[] {
  const outside = new Set(words([title, text, ...ROSTER.producer.lines.map(line => line.text)].join("\n")));
  return [...new Set(VOCABULARY_WORDS.filter(word => !outside.has(word)))].sort(byName);
}
/** R-SYNONYM of a row: over its title and its owner filing block alone (never an appended note). */
const synonymsOf = (row: BeadRow): string[] => synonymsOver(row.title, ownerFiling(row));
/** `parts` occur in `text` in order with only `joint` text between and around them. */
function tiles(text: string, parts: readonly string[], joint: RegExp): boolean {
  let at = 0;
  for (const part of parts) {
    const found = text.indexOf(part, at);
    if (found < 0 || !joint.test(text.slice(at, found))) return false;
    at = found + part.length;
  }
  return joint.test(text.slice(at));
}
/** The export spells each dash of the title as the six characters backslash, u, 2, 0, 1, 4. */
const TITLE_JOINT = /^(?:[\s,.]|\\u2014)*$/;
const LABEL_JOINT = /^[\s,]*$/;
const CITATION = /Citation: (\S+?):(\d+)@([0-9a-f]{12})/;
const roleOf = (word: string): string => (SUBJECT.has(word) ? "subject" : DEMAND.has(word) ? "demand" : PRECISION.has(word) ? "precision" : "none");

describe("wb-pyel.2 EDC demand-channel census (SDK-EVIDENCE-DIRECTED-COMPUTATION-R4, until Pi adopts EDC context assembly)", () => {
  it("the judged set: the frozen shape and roster, the bead export's title and filing, the role places and the producer line", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:4", "C:2"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id: pinId, quote }) => ({ id: pinId, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.vocabulary).toEqual(VOCABULARY);
    expect(ROSTER.constants).toEqual(CONSTANTS);
    const row = beadRecord();
    const { title } = row;
    // The title: its id prefix, then every claimed label and every title duty in title order, separator-only gaps.
    expect(title.startsWith(CONSTANTS.titlePrefix)).toBe(true);
    const body = title.slice(CONSTANTS.titlePrefix.length);
    const titleDuties = ROSTER.unclaimed.filter(entry => entry.source === "title").map(entry => entry.duty);
    const parts = [...ROWS.map(row => row.label), ...titleDuties];
    expect(parts.map(part => body.includes(part))).toEqual(parts.map(() => true));
    expect(tiles(body, [...parts].sort((a, b) => body.indexOf(a) - body.indexOf(b)), TITLE_JOINT)).toBe(true);
    expect(ROWS.map(row => tiles(row.label, row.pins.map(pin => pin.quote), LABEL_JOINT))).toEqual(ROWS.map(() => true));
    // The filing, read from the owner filing block alone: the acceptance duty verbatim, the citation's path, line and pin equal the
    // producer's.
    expect(filingDuties().length).toBeGreaterThan(0);
    const filing = filingReadingsOf(row);
    expect(filing.duties).toEqual(filingDuties().map(() => true));
    expect(ROSTER.unclaimed.every(entry => entry.reason.trim().length > 0)).toBe(true);
    const [citedPath = "", citedLine = "", citedPin = "-"] = filing.citation;
    expect(citedPath).toBe(ROSTER.producer.path);
    expect(ROSTER.producer.lines.map(line => line.line)).toEqual([Number(citedLine)]);
    expect(ROSTER.producer.beadPin.startsWith(citedPin)).toBe(true);
    // The block's extent, anchored outside this file and the roster: the row's whole notes in the export at CONSTANTS.frozenAt.
    expect(frozenBeadRecord().notes, "the owner filing block is the notes as filed").toBe(ownerFiling(row));
    // The quiet row (the cut #1 refusal, U1 and F2): an appended note changes no filing reading; a block edited in place is
    // refused, never read through the note's restated copies - which a whole-notes read takes for the filing (non-vacuity).
    const edited = editedRow(row);
    expect(filingReadingsOf(appendedRow(row)), "an appended note changes no filing reading").toEqual(filing);
    expect(readingsOver(edited.notes), "read past the block, the restated copies mask the edit").toEqual(filing);
    expect(blockVerdict(() => filingReadingsOf(edited)), "a block edited in place").toBe("refused");
    // ROLE PLACES, from the title's structure: U1's subject phrase, U1's carrier, the markers of B, U2 and C, the stems of A and C.
    const duty = (id: string): string => ROSTER.unclaimed.find(entry => entry.id === id)?.duty ?? "";
    const label = (id: string): string => ROWS.find(row => row.id === id)?.label ?? "";
    const u1 = words(duty("U1"));
    const phrase = u1.slice(0, u1.indexOf("shall")).filter(word => word !== "and");
    expect(phrase.map(roleOf)).not.toContain("none");
    expect(new Set(phrase.map(roleOf)).size).toBe(phrase.length);
    expect(phrase.map(roleOf)).toEqual(["subject", "demand", "precision"]);
    const validated = u1.indexOf("validated");
    expect(hasPair([u1[validated - 2] ?? "", u1[validated - 1] ?? ""], VOCABULARY.carrier)).toBe(true);
    const b = words(label("B"));
    expect(MARKERS.has(b[b.indexOf("so") + 1] ?? "")).toBe(true);
    expect(DEMAND.has(b[b.length - 2] ?? "")).toBe(true);
    expect(MARKERS.has(words(duty("U2"))[0] ?? "")).toBe(true);
    const c = label("C");
    expect(MARKERS.has(words(c.slice(c.indexOf("(")))[0] ?? "")).toBe(true);
    const cWords = words(c);
    expect(VOCABULARY.stems.word.includes(cWords[cWords.indexOf("context") - 1] ?? "")).toBe(true);
    const a = words(label("A"));
    expect(VOCABULARY.stems.word.includes(a[a.indexOf("adopts") + 1] ?? "")).toBe(true);
    const slug = words(citedPath.split("/").pop()?.replace(/-\d{4}-\d{2}-\d{2}\.md$/, "") ?? "");
    expect(VOCABULARY.stems.joined.includes(slug.slice(0, -1).join(""))).toBe(true);
    expect(verdict(duty("U1"))).toBe("demand+precision+carrier");
    // The producer line: its bytes match its sha256, it reads MARKER by its "not", and without it a finding of all three families.
    for (const line of ROSTER.producer.lines) expect(createHash("sha256").update(line.text, "utf8").digest("hex")).toBe(line.sha256);
    const producerLine = ROSTER.producer.lines[0]?.text ?? "";
    expect(readSentence(producerLine)).toEqual({ kind: "marker", families: ["demand", "precision", "carrier"], reason: "not" });
    expect(verdict(producerLine.replace(/,? not\b/, ""))).toBe("demand+precision+carrier");
    // The residuals: each named once, each quiet row on a judged pin.
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(ROSTER.residuals.map(residual => residual.id)).toEqual(["R-UNNAMED-ADOPTION", "R-GLUED-STEM", "R-SCOPE", "R-COMPOSED", "R-UNREAD-FORM", "R-UNNAMED-INPUT", "R-PARAPHRASE", "R-SUBJECTLESS", "R-SPLIT", "R-MARKER-ANYWHERE", "R-LOOKALIKE", "R-SYNONYM"]);
    expect(ROSTER.residuals.every(residual => pins.includes(residual.quietPin))).toBe(true);
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(`${pin.id}: ${pin.quote}`, async () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeDefined();
          const witness = impl === undefined ? null : await impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          REACHED.add(pin.id);
        }, 120_000);
      }
    });
  }
  it("records: every registered pin ran and reached its witness", () => {
    expect([...REACHED].sort(byName)).toEqual(ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
  });
});
