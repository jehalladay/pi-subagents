/**
 * wb-csbt.2 (TSX-RESOURCE-EFFICIENCY-FRONTIER-R2, program-triage-2026-10-22), a conditional echo-posture census; gating artifact:
 * none. The bead's title (its statement) and its owner filing's acceptance clauses are read verbatim from the bead's row in the
 * tracked bead export (.beads/issues.jsonl) at run time rather than restated in this comment: this file and its roster are under
 * acceptance (a)'s own guard (every file below src/ and test/), so neither spells the producer's key path or the label (a) names.
 * Both are composed from parts (SEGMENTS, SKIP_WORDS and LABEL_NOUNS below), and the guard reads this file and the roster like any
 * other test file, with no exemption.
 *
 * THE STATEMENT, in substance: if any Pi surface ever reads the TSX SDK's render-report component-reuse counter through the rf
 * envelope, Pi echoes it under the producer's own key with the producer's meaning (the pinned ADR-0032 title: "`reused` = Fiber node
 * not re-rendered") and never re-labels it as a skip figure. The filing leaves open whether the field reaches the rf envelope and
 * notes that Pi's rf reader reads no components key. Citation (ReactiveFiberTSXSDK): docs/programs/resource-efficiency-frontier-
 * 2026-10-17/02-INCREMENTAL-ASSEMBLY-AND-REUSE.md:18@76bbbffd9d4a.
 *
 * MEASURED BY THE CUTTING SEAT (ws-03, g10-work-s47, 2026-10-23; every read below was read-only and none is re-read here, so the
 * census stays hermetic):
 * - At the pin, `git show 76bbbffd9d4a:<path>` on the local ReactiveFiberTSXSDK checkout: 02-INCREMENTAL-ASSEMBLY-AND-REUSE.md:18
 *   (blob deb9b069) reads the quote the export carries; 01-COST-MODEL-AND-INSTRUMENTATION.md:6 (blob fc91bbeb) counts component
 *   reuse "in the **ADR-0032 Fiber-node sense**"; README.md:8 (blob 841e6d04) reads "The framework's Fiber-node reuse is not
 *   evidence for whole-subtree skip."; the ADR-0032 title (blob e4aa3139) reads "`reused` = Fiber node not re-rendered"; and
 *   src/render/report.ts (blob 58f4afa4) declares the counter optional inside the report's components object (:347), sets
 *   COMPONENT_SKIP_ENABLED = false (:260) and so reports the counter as 0 (:543, :608-610).
 * - The installed rf (`rf --json --version` result.version 0.1.832): none of the 231 JSON schemas below its
 *   reactive_fiber_cli/schemas declares a property of the counter's name or of either render-report spelling; its
 *   context.render.schema.json (sha256 06ac92079d39) leaves result open to additive keys and closes every result.components row to
 *   five keys (component_id, component_instance_id, component_revision_id, source_unavailable, status); and rf's own component
 *   counter, result.work_metrics.reused_component_count, counts the distinct component instances whose sink outcome was a
 *   component-output cache hit (integrations/fiber.py:2820, PMO-07d): an instance-cache meaning, not the SDK's Fiber-node count.
 * - The captured rf result-key roster (test/fixtures/rf-result-keys.json, rf 0.1.784, receipt cmd_ab79e0c5d689, exhaustive in both
 *   directions under owner ruling R649 (3)) lists the second segment as a result key and no first-segment key.
 * So the field reaches no rf envelope Pi reads at either build, and every carrying fixture below is CONSTRUCTED: the full-shape
 * envelope of test/helpers/rf-render-fixture.ts (fullShapeRf) plus the producer object - the three segments nested, valued 0 (the
 * only value the pin reports) or 3 (a value a producer with COMPONENT_SKIP_ENABLED on could report) - under a result-level key
 * spelled the SDK's way (camel case) or rf's way (snake case).
 *
 * PI'S RF READERS, enumerated at run time (T1): every src module that imports providers/reactivefiber.js or
 * reactivefiber-observer.js, or spells the capability id reactivefiber.render.preview as a whole literal - six at base
 * (hosts/local-detached.ts, native-evidence.ts, native-modules.ts, providers/reactivefiber.ts, reactivefiber-observer.ts and
 * src/workflow/reconcile.ts). A reading reaches five surfaces: the registered reading of the injected-reader seam
 * (registerReactiveFiberRender), the native provider (registerNativeReactiveFiberRender, which spawns rf and validates the
 * envelope), the agent-visible capability_invoke reply (the real curated MCP server behind a real MCP client), the reader adapter's
 * topology (reactivefiberTopology) and the native-evidence projection (nativeEvidence).
 *
 * THE READINGS (their vocabularies are held to the roster):
 * - KEY, acceptance (a)'s grep widened: case-insensitively, over a text whose whitespace runs are removed, the first segment (its two
 *   camel parts joined by at most one character that is not a letter or digit, so rf's snake spelling too) followed by the second,
 *   or the second followed by the third, the two joined by any one character (the grep's dot), by a run of at most SEPARATOR
 *   characters that are neither letters nor digits (a dot, an optional chain, a bracket and a quote, a JSON colon and brace, an
 *   underscore) or by nothing. The bare third segment alone is never read.
 * - LABEL: a text splits into units at line breaks and at UNIT_BREAKS; a unit folds (a lower-to-upper camel boundary becomes a
 *   space, NFKC, lower case, every run outside [a-z0-9] one space); a label is a SKIP_WORDS word (the owner's own word in (a) and in
 *   the title) and a LABEL_NOUNS word, both whole folded words at most WINDOW words apart, in either order.
 * - FIGURE (acceptance (c)): a FIGURE_WORDS word anywhere in a string a projection surfaces, keys included.
 *
 * ROWS: T, the trigger, absent today (T1, T2), its label the export title's trigger (its opening condition and its closing
 * absent-today note); A, B and C, the owner's acceptance clauses (a), (b) and (c); every label held to the export verbatim and in
 * order. Each pin's case asserts its own outcome and returns a witness the roster holds:
 *  T1 Pi's rf readers read no key the producer object has: no property access, element-access key, binding or object-literal key
 *    equal to the first segment (either spelling) or the second, and no literal naming either, with the reader floor and two
 *    positive controls (the adapter reads result.observations; the provider names engine_metrics);
 *  T2 the rf capability roster stays the preview alone (native and injected registrations selected by id, permission and contract
 *    source, and RECONCILE_EVIDENCE_READS.reactivefiber), both descriptors carrying REACTIVE_FIBER_CONTRACT_SOURCE, whose verb is
 *    context.render --no-commit: no rf surface that could carry a render report (rf component test, context show) is registered;
 *  A1 every regular file below src/ and test/ (this file and its roster included; dot directories followed) reads no KEY pair and
 *    no LABEL, with floors (100 src and 450 test files), the four test extensions read, a depth-four path read, and the precision
 *    files read (the adapter spells the bare third segment; the fixture helper spells rf's own counters); and the readings ran over
 *    each file's own bytes: every file reaches the end of the scan with a text whose UTF-8 length is its size on disk (a lossy
 *    decode, which carries the replacement character, counts when the text is not empty), so a blanked or cut-short read reds;
 *  A2 the outside anchors agree with the readings: the export title's backticked path is SEGMENTS joined by dots, the backticked
 *    targets of clause (a) are the two KEY pairs, KEY reads each target and not the bare word clause (a) names, LABEL reads clause
 *    (a)'s phrase, the title's phrase and the quoted program line, the title ends with the citation, and the captured rf roster
 *    lists the second segment and no first-segment key;
 *  A3 every planted spelling of KEY_CONTROLS and LABEL_CONTROLS is read, every precision and residual control of QUIET_CONTROLS
 *    reads quiet under both readings, and the walker row holds R-SYMLINK: in makeScratch scratch, a link to a file spelling a KEY
 *    pair is not followed while the same file walked where it lives is read;
 *  B1 the registered reading of each carrying fixture carries the source byte for byte, the producer object under its own key with
 *    its own value, and Pi adds only its contract and root: no number, no LABEL, no KEY pair;
 *  B2 the native provider admits each carrying fixture from a stand-in rf and returns it byte for byte in one spawn of the render
 *    argv;
 *  B3 the capability_invoke reply returns that reading as {kind: "returned", value}, its text spelling the producer object's key and
 *    value exactly, and Pi's strings only "returned", the contract and the root;
 *  B4 the adapter's topology of each carrying fixture, under both seams, equals its twin's without the object: no LABEL, no KEY
 *    pair, no FIGURE word; the twin really differs from the fixture, and the same comparison tells apart a divergent twin (the twin
 *    with its operation id changed, which every projection surfaces), so a self-compared leg reds (blindness);
 *  B5 the native-evidence projection of each carrying fixture equals its twin's, with no LABEL and no FIGURE word, under the same
 *    divergent-twin control;
 *  C1 the plain fixture (no render-report key) at every surface: no first-segment key at any depth, Pi adds none, and the topology
 *    and the evidence carry no FIGURE word;
 *  C2 rf's own instance counter at 3 with the key absent: every projection equals the zero-counter twin with no FIGURE word (the
 *    divergent-twin control again), and the readings carry the counter verbatim with no render-report key synthesized from it;
 *  C3 observation rows read freshness reused: the only reuse word any surfaced string carries is the adapter's observations note
 *    (the wb-973.9 freshness word), which names rows and no LABEL_NOUNS word, and no surfaced string carries a skip word.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal. OUTSIDE ANCHORS: the export row (labels, row
 * T's from the title's trigger, path, targets, quote, citation), the out-of-file roster (every row's id, label digest and pins,
 * every pin's witness, the vocabularies, placements, values, the bound record and the registered tests), the captured rf roster
 * and the src readers themselves. The last case walks this file's vitest task tree against the roster, so a member removed from
 * every literal of this file still reds there; a member removed from every literal of this file and of the roster together reds
 * at the bound case, whose anchors lie outside both.
 * BOUND (wb-5618, the R694 follow-up of the wb-csbt.2 gate's F1): every pin of rows T and B is bound, one pin each, to an anchor
 * outside this file and its roster (BINDINGS). T's pins hold the terms of the export title's absent-today note, the parenthetical
 * split at its semicolon: T1 "Pi's rf reader reads no components key", T2 "whether the field reaches the rf envelope is unknown
 * today" (the one rf envelope Pi reads is the preview's). B's pins hold the reading surfaces src derives (surfaceDerivation), never
 * restated: (i) every capability descriptor of the preview id in a Pi rf reader - any object property id naming the preview id,
 * spelled as the literal or as a const of the module and wherever the object sits (inline in a register call, behind a type
 * assertion or in a variable) - keyed by its enclosing exported function (B1 the injected registerReactiveFiberRender, B2 the
 * native registerNativeReactiveFiberRender); (ii) every tool of the curated agent server - a src module importing tool from the
 * agent SDK - whose handler invokes the registry (B3 capability_invoke); (iii) every exported function of an ENVELOPE READER - a
 * Pi rf reader whose syntax names the rf envelope schema constant, so it reads the envelope itself - declared as a function or as
 * an exported const function value, that declares a parameter typed JsonValue (B4 reactivefiberTopology, B5 nativeEvidence).
 * The bound witness holds T1's reader floor, not an exact reader count, so a new rf reader adding no surface stays green as it
 * does at T1. Each B binding is also proven as the case runs: reach() records the src
 * function the case called, by that function's own name, or the agent tool it called, and the bound case requires each B pin to
 * have reached the surface it is bound to, so a swap of two B bindings, roster included, reds. A coordinated hollow of a T or B
 * pin, or of row T, through this file and the roster leaves a term or a surface unjudged and reds the bound case; a term the title
 * gains or a surface src gains reds it too, so a new Pi surface of either kind re-judges this census.
 * NOT CLAIMED (scope of BOUND): the src routes that invoke the registry outside (i)-(iii) are not derived as surfaces - workflow
 * callNode in claude-host.ts and hosts/local-detached.ts, reconcile-tool.ts's evidence read (its reply carries the read value as
 * its snapshot), evidence-wiring.ts's forge read and the registry's own dispatch. They receive the registered reading B1 and B2
 * pin byte for byte; what they add of their own is not judged here.
 * RESIDUALS (named, each with a pinned quiet row in A3's QUIET_CONTROLS unless named otherwise): R-FEATURE-WORDS skip, skips and
 * skipping beside the nouns are not read - they name ADR-0032's deferred skip feature (the wb-csbt.1 posture's subject), not a
 * figure Pi states as done (featureSkipping, featureSkipPredicate, featureWholeSubtree); R-VOCABULARY a synonym outside SKIP_WORDS
 * is not read (vocabularyBypassed, vocabularyElided, vocabularyOmitted); R-WINDOW a pair more than WINDOW words apart in one unit is
 * not read (windowFour); R-SPLIT a label split across units - by a line break, a quote, a colon, a comma or a bracket - is not
 * read, which keeps a producer grade list quiet (a JSON list naming one gate's grade and a component check's grade, as
 * test/fixtures/rf-evaluator-artifact-context-roster.json holds) (splitLine, splitJsonKey, gradeList); R-COMPOSED a key path
 * assembled at run time from parts that never meet in the text, as this file composes its own, is invisible to the text scan
 * (composedParts) - B1-B5 and C1-C3 are the runtime backstop, reading what each reached surface carries; R-ALIAS a reader holding
 * the second segment's object under another name and reading the third off the alias spells no pair (aliasRead) - T1 still reads
 * the second segment as a property name in any rf reader; R-SEPARATOR a pair joined by a run that holds a letter or digit beside
 * another character, or by more than SEPARATOR characters that are not letters or digits, is not read (longSeparator); R-TREES
 * qa/, docs/, examples/, .beads/ and the repository root are outside (a)'s trees (the clause names src and test; A1's witness pins
 * its roots) - at base they spell no KEY pair except the bead export (.beads/issues.jsonl), which A2 reads as the anchor; R-ESCAPE
 * (wb-5618, the gate's L09e) a pair whose joining character is spelled as a string escape (a backslash-u escape of the dot) reads
 * as escape text, not as its cooked value, so the text scan stays quiet (escapeSpelled) - T1 still reads a cooked literal naming
 * the second segment in any rf reader, and B1-B5 and C1-C3 read what each reached surface carries; R-SYMLINK (wb-5618, the gate's
 * L10) the walker does not follow a symbolic link, as git tracks the link and not its target: a link below src/ or test/ to a
 * file elsewhere is not read through, while the target is read wherever it lies inside the trees (A3's walker row).
 * PRECISION (not escapes): the bare third segment is never a needle - the adapter's observation-freshness note ("observations: <n>
 * rows, <r> ...", wb-973.9) and rf's own counters (reused_component_count, observation_reused_count) read quiet (bareWord,
 * rfInstanceCounter, rfObservationCounter), and A1 reads the adapter and the fixture helper that spell them.
 * THE TRIGGER, ABSENT TODAY: Pi reads no render-report key and registers no rf surface beyond the preview (T1, T2). The armed half -
 * a Pi surface that reads the counter and echoes it under the producer's key and meaning - waits for the field to reach an rf
 * envelope; a cut that starts reading it re-judges this census rather than editing a witness.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, the bead export and the rf roster are
 * only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, mkdirSync, readdirSync, readFileSync, statSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberSeam, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf, readRfResultRoster } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };
/** The envelope the injected-reader seam hands on; it validates nothing, which is what B1, B3 and C1 read. */
type InjectedEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;

const SELF = fileURLToPath(import.meta.url);
const HERE = dirname(SELF);
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-fiber-node-reuse-echo-roster.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const ROOT = process.cwd();
const BEAD = "wb-csbt.2";
const STATEMENT = "TSX-RESOURCE-EFFICIENCY-FRONTIER-R2";
const PIN = "76bbbffd9d4a";
const RF_VERSION = "0.1.832";
const CITATION = "docs/programs/resource-efficiency-frontier-2026-10-17/02-INCREMENTAL-ASSEMBLY-AND-REUSE.md:18@76bbbffd9d4a";
/** The root every judged envelope names: a fixture root, never a host path. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_VERSION = "1.0.0";
const GRANTS = ["reactivefiber:render"];

/** The producer's key path - the render report, its components object and the counter - each segment spelled so that no line of
 * this file spells two of them together (this file is under its own (a) guard). */
const SEGMENTS: readonly [string, string, string] = [["render", "Report"].join(""), "components", ["re", "used"].join("")];
const [FIRST, SECOND, THIRD] = SEGMENTS;
/** A camel key in rf's own spelling (rf's envelope keys are snake case). */
function snake(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
}
/** The two result-level keys a carrying fixture places the producer object under: the SDK's spelling, then rf's. */
const PLACEMENTS: readonly string[] = [FIRST, snake(FIRST)];
const PLACEMENT_KINDS: readonly string[] = ["sdk", "rf"];
/** The values a carrying fixture states: 0, the only value the pin reports, and 3. */
const VALUES: readonly number[] = [0, 3];
/** KEY's bound on a joining run of characters that are neither letters nor digits. */
const SEPARATOR = 6;
/** LABEL's vocabulary: the owner's own word in clause (a) and in the title, the nouns it qualifies, and the word window. */
const SKIP_WORDS: readonly string[] = ["skipped"];
const LABEL_NOUNS: readonly string[] = ["subtree", "subtrees", "component", "components"];
const WINDOW = 3;
/** The characters that end a LABEL unit, beside a line break. */
const UNIT_BREAKS = ",;:\"'`()[]{}<>=|";
/** Words that state a reuse or a skip figure, read over every string a projection surfaces (acceptance (c)). */
const FIGURE_WORDS: readonly string[] = ["reuse", "reused", "reuses", "reusing", "skip", "skips", "skipped", "skipping"];
/** The modules every reader enumeration must hold: the provider, the reader adapter and the native-evidence projection. */
const CORE_READERS: readonly string[] = ["src/workbench/native-evidence.ts", "src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"];
/** The reader floor measured at base (six modules). */
const READER_FLOOR = 6;

const JOIN = `(?:[\\s\\S]|[\\W_]{0,${SEPARATOR}})`;
/** KEY's two pairs, each read on its own so the full path reads both: the first segment then the second, the second then the third. */
const KEY_PATTERNS: readonly RegExp[] = [
  new RegExp(`${FIRST.replace(/([a-z])([A-Z])/g, "$1[\\W_]?$2")}${JOIN}${SECOND}`, "gi"),
  new RegExp(`${SECOND}${JOIN}${THIRD}`, "gi"),
];
const UNIT_SPLIT = new RegExp(`[\\n\\r${UNIT_BREAKS.replace(/[\\\]^[-]/g, character => `\\${character}`)}]+`);

/** KEY: every pair the text spells once its whitespace runs are removed. */
function keyPairsOf(text: string): string[] {
  const flat = text.replace(/\s+/g, "");
  return KEY_PATTERNS.flatMap(pattern => [...flat.matchAll(pattern)].map(match => match[0]));
}
/** A unit's folded words: a lower-to-upper camel boundary becomes a space, then NFKC, lower case and alphanumeric runs. */
function foldedWords(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .normalize("NFKC")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 0);
}
/** LABEL: every SKIP_WORDS word with a LABEL_NOUNS word at most WINDOW words away inside one unit, as the folded span between. */
function labelsOf(text: string): string[] {
  const found: string[] = [];
  for (const unit of text.split(UNIT_SPLIT)) {
    const words = foldedWords(unit);
    words.forEach((word, at) => {
      if (!SKIP_WORDS.includes(word)) return;
      const start = Math.max(0, at - WINDOW);
      const near = words.slice(start, at + WINDOW + 1).findIndex((other, index) => start + index !== at && LABEL_NOUNS.includes(other));
      if (near >= 0) found.push(words.slice(Math.min(at, start + near), Math.max(at, start + near) + 1).join(" "));
    });
  }
  return found;
}
/** FIGURE: the FIGURE_WORDS words a list of surfaced strings carries. */
function figureWordsOf(texts: readonly string[]): string[] {
  return texts.flatMap(foldedWords).filter(word => FIGURE_WORDS.includes(word));
}
function digestOf(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

/** Spellings KEY must read: the producer's path or one of its pairs, spelled as code, JSON and prose. */
const KEY_CONTROLS: Readonly<Record<string, string>> = {
  dotPath: `report.${FIRST}.${SECOND}.${THIRD}`,
  optionalChain: `report?.${FIRST}?.${SECOND}?.${THIRD}`,
  bracketPath: `report[${JSON.stringify(FIRST)}][${JSON.stringify(SECOND)}][${JSON.stringify(THIRD)}]`,
  innerPair: `stats.${SECOND}.${THIRD} = 3;`,
  outerPair: `const part = result.${FIRST}.${SECOND};`,
  snakeOuter: `result.${snake(FIRST)}.${SECOND}`,
  jsonCompact: JSON.stringify({ [FIRST]: { [SECOND]: { [THIRD]: 3 } } }),
  jsonPretty: JSON.stringify({ [snake(FIRST)]: { [SECOND]: { [THIRD]: 3 } } }, null, 2),
  upperSnake: `${SECOND.toUpperCase()}_${THIRD.toUpperCase()}`,
  joinedCamel: `${SECOND}${THIRD.slice(0, 1).toUpperCase()}${THIRD.slice(1)}`,
  proseSpace: `the ${SECOND} ${THIRD} counter`,
  anyOneCharacter: `${SECOND}X${THIRD}`,
};
const SKIP = SKIP_WORDS[0] ?? "";
const SUBTREE = LABEL_NOUNS[0] ?? "";
const SUBTREES = LABEL_NOUNS[1] ?? "";
const COMPONENTS = LABEL_NOUNS[3] ?? "";
/** Labels LABEL must read: clause (a)'s phrase, the title's phrase, and code, JSON-key and prose spellings of either. */
const LABEL_CONTROLS: Readonly<Record<string, string>> = {
  ownerPhrase: `${SUBTREE} ${SKIP}`,
  titlePhrase: `${COMPONENTS} or ${SUBTREES} ${SKIP}`,
  countFirst: `3 ${COMPONENTS} ${SKIP}`,
  skipFirst: `${SKIP} 3 ${SUBTREES}`,
  camelKey: `stats.${SUBTREES}${SKIP.slice(0, 1).toUpperCase()}${SKIP.slice(1)}`,
  snakeKey: `${SUBTREES}_${SKIP}`,
  kebabKey: `${SUBTREE}-${SKIP}`,
  upperKey: `${COMPONENTS.toUpperCase()}_${SKIP.toUpperCase()}`,
  windowThree: `${COMPONENTS} were then ${SKIP}`,
  fullwidth: [...`${SUBTREE} ${SKIP}`].map(character => (character === " " ? character : String.fromCodePoint((character.codePointAt(0) ?? 0) + 0xfee0))).join(""),
};
/** Precision and residual controls: each must read quiet under KEY and LABEL both. */
const QUIET_CONTROLS: Readonly<Record<string, string>> = {
  bareWord: `observations: 2 rows, 2 ${THIRD}: partial`,
  rfInstanceCounter: `${THIRD}_component_count`,
  rfObservationCounter: `observation_${THIRD}_count`,
  secondAlone: `result.${SECOND} = []`,
  firstAlone: `the ${FIRST} object`,
  featureSkipping: `component-${SUBTREE} skipping`,
  featureSkipPredicate: "component skip predicate",
  featureWholeSubtree: `whole-${SUBTREE} skip`,
  vocabularyBypassed: `${SUBTREES} bypassed`,
  vocabularyElided: `${COMPONENTS} elided`,
  vocabularyOmitted: `${COMPONENTS} omitted`,
  windowFour: `${COMPONENTS} were then left ${SKIP}`,
  splitLine: `${SUBTREE}\n * ${SKIP}`,
  splitJsonKey: JSON.stringify({ [SKIP]: [SUBTREE] }),
  gradeList: JSON.stringify([`budget_gate:${SKIP}`, "component_revisions:passed"]),
  composedParts: `[${JSON.stringify(SECOND.slice(0, 5))} + ${JSON.stringify(SECOND.slice(5))}, ${JSON.stringify(THIRD)}].join(".")`,
  aliasRead: `const part = report.${SECOND};\nreturn part.${THIRD};`,
  longSeparator: `${SECOND} /* the inner key */ .${THIRD}`,
  // R-ESCAPE (wb-5618, the gate's L09e): the inner pair inside a string literal, its dot spelled as a backslash-u escape.
  escapeSpelled: `export const k = "${SECOND}\\u002e${THIRD}";`,
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const INNER_PAIR = `${SECOND}.${THIRD}`;
const OUTER_PAIR = `${FIRST}.${SECOND}`;
/** The judged rows: the trigger, then one row per owner acceptance clause; their shape is pinned and held to the roster and export. */
const ROWS: readonly Row[] = [
  {
    id: "T",
    label: `If any Pi surface ever reads \`${SEGMENTS.join(".")}\` through the rf envelope (whether the field reaches the rf envelope is unknown today; Pi's rf reader reads no components key)`,
    pins: ["T1", "T2"],
  },
  {
    id: "A",
    label: `(a) guard grep for ${INNER_PAIR}|${SUBTREE} ${SKIP} over Pi src and test = 0 (0 today at d75b68d); the guard targets \`${INNER_PAIR}\`/\`${OUTER_PAIR}\`, never the bare word ${THIRD}`,
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label: `(b) a fixture envelope carrying ${INNER_PAIR} renders the producer key name verbatim with no Pi-authored semantic label`,
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C",
    label: "(c) if the key is absent from the envelope Pi surfaces no reuse/skip figure at all (never synthesized)",
    pins: ["C1", "C2", "C3"],
  },
];
/** BOUND (wb-5618): each pin of rows T and B and the anchor outside this file and its roster it is held to - for T a term of the
 * export title's absent-today note, for B a reading surface src derives (surfaceDerivation), keyed `<module>#<symbol>`. */
const BINDINGS: Readonly<Record<string, string>> = {
  T1: "Pi's rf reader reads no components key",
  T2: "whether the field reaches the rf envelope is unknown today",
  B1: "src/workbench/providers/reactivefiber.ts#registerReactiveFiberRender",
  B2: "src/workbench/providers/reactivefiber.ts#registerNativeReactiveFiberRender",
  B3: "src/workbench/claude-capability-tools.ts#capability_invoke",
  B4: "src/workbench/reactivefiber-observer.ts#reactivefiberTopology",
  B5: "src/workbench/native-evidence.ts#nativeEvidence",
};
/** BOUND (wb-5618): the surfaces each pin's case reached as it ran - the src function it called, by that function's own name, or
 * the agent tool it called - so a B binding is proven at run time rather than only named. */
const REACHED = new Map<string, Set<string>>();
let runningPin = "";
function reach(symbol: string): void {
  if (runningPin === "") return;
  const symbols = REACHED.get(runningPin) ?? new Set<string>();
  symbols.add(symbol);
  REACHED.set(runningPin, symbols);
}
/** Runs one pin's case with reach() recording under that pin. */
async function runAs(pin: string, impl: () => Promise<JsonValue>): Promise<JsonValue> {
  runningPin = pin;
  try {
    return await impl();
  } finally {
    runningPin = "";
  }
}

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly labelDigest: string;
  readonly pins: readonly RosterPin[];
}
interface Vocabulary {
  readonly segments: readonly string[];
  readonly placements: readonly string[];
  readonly values: readonly number[];
  readonly separator: number;
  readonly skipWords: readonly string[];
  readonly labelNouns: readonly string[];
  readonly window: number;
  readonly unitBreaks: string;
  readonly figureWords: readonly string[];
  readonly coreReaders: readonly string[];
  readonly readerFloor: number;
}
interface Roster {
  readonly bead: string;
  readonly statement: string;
  readonly pin: string;
  readonly rfVersion: string;
  readonly citation: string;
  readonly vocabulary: Vocabulary;
  readonly rows: readonly RosterRow[];
  /** The bound case's witness (wb-5618). */
  readonly bound: JsonValue;
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function numbers(value: unknown, field: string): number[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "number")) throw new Error(`roster ${field} must be a number list`);
  return value;
}
function integer(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value)) throw new Error(`roster ${field} must be an integer`);
  return value;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) throw new Error(`roster ${field} must be a non-empty string`);
  return value;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. The segments are
 * stored split into parts (the roster is under (a)'s guard too) and joined here. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.vocabulary)) throw new Error("roster must be an object with rows and a vocabulary");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.labelDigest !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a labelDigest and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, labelDigest: row.labelDigest, pins };
  });
  const { vocabulary } = raw;
  if (!Array.isArray(vocabulary.segments) || !vocabulary.segments.every(parts => Array.isArray(parts))) throw new Error("roster vocabulary.segments must be a list of part lists");
  if (!isObject(raw.bound)) throw new Error("roster must hold the bound case's witness as an object");
  const segments = vocabulary.segments.map((parts: unknown, index: number) => strings(parts, `vocabulary.segments[${index}]`).join(""));
  return {
    bead: text(raw.bead, "bead"),
    statement: text(raw.statement, "statement"),
    pin: text(raw.pin, "pin"),
    rfVersion: text(raw.rfVersion, "rfVersion"),
    citation: text(raw.citation, "citation"),
    vocabulary: {
      segments,
      placements: strings(vocabulary.placements, "vocabulary.placements"),
      values: numbers(vocabulary.values, "vocabulary.values"),
      separator: integer(vocabulary.separator, "vocabulary.separator"),
      skipWords: strings(vocabulary.skipWords, "vocabulary.skipWords"),
      labelNouns: strings(vocabulary.labelNouns, "vocabulary.labelNouns"),
      window: integer(vocabulary.window, "vocabulary.window"),
      unitBreaks: text(vocabulary.unitBreaks, "vocabulary.unitBreaks"),
      figureWords: strings(vocabulary.figureWords, "vocabulary.figureWords"),
      coreReaders: strings(vocabulary.coreReaders, "vocabulary.coreReaders"),
      readerFloor: integer(vocabulary.readerFloor, "vocabulary.readerFloor"),
    },
    rows,
    bound: json(raw.bound),
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** The character a lossy UTF-8 decode puts in place of bytes it cannot read (A1's liveness, wb-5618). */
const REPLACEMENT = String.fromCodePoint(0xfffd);
/** The bead's row of the tracked bead export: its title and its notes. */
function exportRow(): { title: string; notes: string } {
  const rows: unknown[] = textOf(EXPORT_PATH)
    .split("\n")
    .filter(entry => entry.includes(`"id":"${BEAD}"`))
    .map(entry => JSON.parse(entry) as unknown);
  const row = rows.find(entry => isObject(entry) && entry.id === BEAD);
  if (!isObject(row) || typeof row.title !== "string") throw new Error(`the bead export holds no ${BEAD} row`);
  return { title: row.title, notes: typeof row.notes === "string" ? row.notes : "" };
}
/** The owner filing's acceptance clauses, read from the export row: "(a) ...", "(b) ...", "(c) ...". */
function ownerClauses(): string[] {
  const { notes } = exportRow();
  const start = notes.indexOf("Acceptance: ");
  const end = notes.indexOf(". Not P0:", start);
  if (start < 0 || end < 0) throw new Error(`the ${BEAD} export row states no acceptance sentence`);
  return notes.slice(start + "Acceptance: ".length, end).split(/; (?=\([a-z]\) )/);
}
/** The program line the filing quotes, read from the export row. */
function exportQuote(): string {
  const { notes } = exportRow();
  const start = notes.indexOf('Quote: "');
  const end = notes.indexOf(`" ${CITATION.split(":")[0]}`, start);
  if (start < 0 || end < 0) throw new Error(`the ${BEAD} export row quotes no program line`);
  return notes.slice(start + 'Quote: "'.length, end);
}
/** Row T's anchor (wb-5618), read from the export title: the trigger - its opening condition (after the statement id, up to the
 * first comma) and its closing absent-today note (the last parenthetical, just before the citation) - and the note's terms, split
 * at its semicolons. */
function exportTrigger(): { text: string; terms: string[] } {
  const { title } = exportRow();
  const opening = `[${STATEMENT}] `;
  const conditionEnd = title.indexOf(", ");
  const noteStart = title.lastIndexOf(" (");
  const noteEnd = title.lastIndexOf(`) - ${CITATION}`);
  if (!title.startsWith(opening) || conditionEnd < 0 || noteStart < conditionEnd || noteEnd < noteStart) throw new Error(`the ${BEAD} export title states no trigger`);
  const condition = title.slice(opening.length, conditionEnd);
  const note = title.slice(noteStart + " (".length, noteEnd);
  return { text: `${condition} (${note})`, terms: note.split("; ") };
}
function backticked(value: string): string[] {
  return [...value.matchAll(/`([^`]+)`/g)].map(match => match[1] ?? "");
}

/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** Every string a JSON value holds, keys included: what a surfaced value shows. */
function wordLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(wordLeaves);
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [key, ...wordLeaves(item)]);
  return [];
}
function numberLeaves(value: unknown): number[] {
  if (typeof value === "number") return [value];
  if (Array.isArray(value)) return value.flatMap(numberLeaves);
  if (isObject(value)) return Object.values(value).flatMap(numberLeaves);
  return [];
}
/** Every key at any depth of a JSON value. */
function keysAtAnyDepth(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(keysAtAnyDepth);
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [key, ...keysAtAnyDepth(item)]);
  return [];
}
/** The keys of a value that spell the first segment either way. */
function firstSegmentKeys(value: unknown): string[] {
  return keysAtAnyDepth(value).filter(key => PLACEMENTS.includes(key));
}

interface Fixture {
  readonly kind: string;
  readonly placement: string;
  readonly value: number;
  readonly envelope: JsonObject;
}
function resultOf(envelope: JsonObject): JsonObject {
  return objectOf(envelope.result, "envelope result");
}
/** The plain full-shape envelope: no render-report key anywhere. */
function plainEnvelope(root: string): JsonObject {
  return objectOf(json(fullShapeRf(root)), "full-shape envelope");
}
/** The CONSTRUCTED carrying fixtures, one per placement and value, each built fresh. */
function carryingFixtures(root: string): Fixture[] {
  return PLACEMENTS.flatMap((placement, at) =>
    VALUES.map(value => {
      const envelope = plainEnvelope(root);
      resultOf(envelope)[placement] = { [SECOND]: { [THIRD]: value } };
      return { kind: PLACEMENT_KINDS[at] ?? "unknown", placement, value, envelope };
    }),
  );
}
/** The producer object's counter as a reading's source states it, or null when the path is absent. */
function producerValue(source: JsonValue | undefined, placement: string): JsonValue {
  const result = isObject(source) ? source.result : undefined;
  const report = isObject(result) ? result[placement] : undefined;
  const part = isObject(report) ? report[SECOND] : undefined;
  return isObject(part) && Object.hasOwn(part, THIRD) ? json(part[THIRD]) : null;
}
/** The plain envelope with rf's own instance counter set, the render-report key still absent. */
function counterEnvelope(root: string, count: number): JsonObject {
  const envelope = plainEnvelope(root);
  objectOf(resultOf(envelope).work_metrics, "work_metrics").reused_component_count = count;
  return envelope;
}
/** One observation row in the pinned context.render shape (the observer suite's), observed and read from an earlier render. */
function reusedObservationRow(at: number): JsonObject {
  return {
    observation_id: `rfl_${String(at).padStart(22, "0")}`,
    lens_key: "beads.current",
    value_digest: `sha256:${"d4".repeat(32)}`,
    status: "observed",
    code: null,
    freshness: THIRD,
    replayed: true,
    required: true,
    degraded: false,
    persisted: true,
  };
}
function observationEnvelope(root: string): JsonObject {
  const envelope = plainEnvelope(root);
  resultOf(envelope).observations = [reusedObservationRow(1), reusedObservationRow(2)];
  return envelope;
}

/** Every regular file below a root; symlinks are not followed and dot directories are. */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
function repoPath(file: string): string {
  return relative(REPO, file).split(sep).join("/");
}

interface ReaderLexicon {
  readonly file: string;
  readonly keys: string[];
  readonly literals: string[];
  readonly specifiers: string[];
}
/** One module's lexicon: every key it reads or writes (property access, string element access, binding and object-literal keys),
 * every string and no-substitution template literal, and every static or dynamic import specifier. */
function lexiconOf(fileName: string, source: string): ReaderLexicon {
  const tree = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const keys: string[] = [];
  const literals: string[] = [];
  const specifiers: string[] = [];
  const named = (name: ts.Node | undefined): void => {
    if (name !== undefined && (ts.isIdentifier(name) || ts.isStringLiteralLike(name))) keys.push(name.text);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAccessExpression(node)) keys.push(node.name.text);
    else if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) keys.push(node.argumentExpression.text);
    else if (ts.isBindingElement(node)) named(node.propertyName ?? node.name);
    else if (ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) named(node.name);
    if (ts.isStringLiteralLike(node)) literals.push(node.text);
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier)) {
      specifiers.push(node.moduleSpecifier.text);
    }
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const [first] = node.arguments;
      if (first !== undefined && ts.isStringLiteralLike(first)) specifiers.push(first.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return { file: fileName, keys, literals, specifiers };
}
const READER_SPECIFIER = /(?:^|\/)(?:providers\/reactivefiber|reactivefiber-observer)\.js$/;
let readerCache: ReaderLexicon[] | undefined;
/** Pi's rf readers: every src .ts module importing the provider or the adapter, or spelling the capability id as a whole literal. */
function rfReaders(): ReaderLexicon[] {
  readerCache ??= filesBelow(join(REPO, "src"))
    .filter(file => file.endsWith(".ts"))
    .map(file => lexiconOf(repoPath(file), textOf(file)))
    .filter(lexicon => lexicon.specifiers.some(specifier => READER_SPECIFIER.test(specifier)) || lexicon.literals.includes(PREVIEW_ID));
  return readerCache;
}
/** A key naming the first segment (either spelling) or the second, in any case. */
function namesObjectKey(key: string): boolean {
  return [FIRST, snake(FIRST), SECOND].some(entry => entry.toLowerCase() === key.toLowerCase());
}
/** A literal whose folded words name the second segment, or the first segment's two parts in order. */
function namesObjectLiteral(literal: string): boolean {
  const words = foldedWords(literal);
  const [head, tail] = foldedWords(FIRST);
  return words.includes(SECOND) || words.some((word, at) => word === head && words[at + 1] === tail);
}

/** The parsed syntax of a src module, by its repository path. */
function syntaxOf(file: string): ts.SourceFile {
  return ts.createSourceFile(file, textOf(join(REPO, file)), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
/** Every node of a tree, depth first. */
function nodesOf(root: ts.Node): ts.Node[] {
  const found: ts.Node[] = [];
  const visit = (node: ts.Node): void => {
    found.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}
function isExported(node: ts.Node): boolean {
  return ts.canHaveModifiers(node) && (ts.getModifiers(node) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
}
/** The exported function a node lies inside, or "(module)" when it lies inside none. */
function enclosingExport(node: ts.Node): string {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if (ts.isFunctionDeclaration(at) && isExported(at) && at.name !== undefined) return at.name.text;
  }
  return "(module)";
}
/** A call of `<anything>.<name>(...)`. */
function callsMethod(node: ts.Node, name: string): boolean {
  return ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === name;
}
/** An expression with its parentheses, type assertions, satisfies clauses and non-null assertions taken off. */
function unwrapped(expression: ts.Expression): ts.Expression {
  let at = expression;
  while (ts.isParenthesizedExpression(at) || ts.isAsExpression(at) || ts.isSatisfiesExpression(at) || ts.isTypeAssertionExpression(at) || ts.isNonNullExpression(at)) at = at.expression;
  return at;
}
/** Whether a module's syntax states the preview id: the literal itself, or a const of this module initialized to it. */
function previewIdReader(nodes: readonly ts.Node[]): (expression: ts.Expression) => boolean {
  const constants = new Set(
    nodes.flatMap(node => {
      if (!ts.isVariableDeclaration(node) || !ts.isIdentifier(node.name) || node.initializer === undefined) return [];
      const value = unwrapped(node.initializer);
      return ts.isStringLiteralLike(value) && value.text === PREVIEW_ID && (ts.getCombinedNodeFlags(node) & ts.NodeFlags.Const) !== 0 ? [node.name.text] : [];
    }),
  );
  return expression => {
    const value = unwrapped(expression);
    return (ts.isStringLiteralLike(value) && value.text === PREVIEW_ID) || (ts.isIdentifier(value) && constants.has(value.text));
  };
}
/** Whether a parameter list declares a parameter typed JsonValue (a reading). */
function takesReading(parameters: ts.NodeArray<ts.ParameterDeclaration>): boolean {
  return parameters.some(parameter => parameter.type !== undefined && ts.isTypeReferenceNode(parameter.type) && ts.isIdentifier(parameter.type.typeName) && parameter.type.typeName.text === "JsonValue");
}
/** The rf envelope's schema constant: a Pi rf reader whose syntax names it reads the envelope itself (an ENVELOPE READER). */
const ENVELOPE_SCHEMA_CONSTANT = "REACTIVE_FIBER_CLI_SCHEMA";
/** The agent SDK whose tool helper defines the curated agent server's tools. */
const AGENT_SDK = "@anthropic-ai/claude-agent-sdk";
interface SurfaceDerivation {
  readonly readers: number;
  readonly envelopeReaders: readonly string[];
  readonly registrations: readonly string[];
  readonly tools: readonly string[];
  readonly projections: readonly string[];
}
let derivationCache: SurfaceDerivation | undefined;
/** BOUND (wb-5618): the reading surfaces src states, derived and never restated, each keyed `<module>#<symbol>` - (i) every object
 * property id naming the preview id (the literal or a const of the module) in a Pi rf reader, by its enclosing exported function;
 * (ii) every tool of a src module importing tool from the agent SDK whose handler invokes the registry, by the tool's name; (iii)
 * every exported function or exported const function value of an envelope reader that declares a parameter typed JsonValue. */
function surfaceDerivation(): SurfaceDerivation {
  if (derivationCache !== undefined) return derivationCache;
  const readers = rfReaders().map(reader => reader.file);
  const registrations: string[] = [];
  const envelopeReaders: string[] = [];
  const projections: string[] = [];
  for (const file of readers) {
    const nodes = nodesOf(syntaxOf(file));
    const namesPreview = previewIdReader(nodes);
    for (const node of nodes) {
      if (!ts.isPropertyAssignment(node) || !(ts.isIdentifier(node.name) || ts.isStringLiteralLike(node.name)) || node.name.text !== "id" || !namesPreview(node.initializer)) continue;
      const key = `${file}#${enclosingExport(node)}`;
      if (!registrations.includes(key)) registrations.push(key);
    }
    if (!nodes.some(node => ts.isIdentifier(node) && node.text === ENVELOPE_SCHEMA_CONSTANT)) continue;
    envelopeReaders.push(file);
    for (const node of nodes) {
      if (ts.isFunctionDeclaration(node) && isExported(node) && node.name !== undefined && takesReading(node.parameters)) projections.push(`${file}#${node.name.text}`);
      if (!ts.isVariableStatement(node) || !isExported(node)) continue;
      for (const declaration of node.declarationList.declarations) {
        const value = declaration.initializer === undefined ? undefined : unwrapped(declaration.initializer);
        if (ts.isIdentifier(declaration.name) && value !== undefined && (ts.isArrowFunction(value) || ts.isFunctionExpression(value)) && takesReading(value.parameters)) {
          projections.push(`${file}#${declaration.name.text}`);
        }
      }
    }
  }
  const tools: string[] = [];
  for (const path of filesBelow(join(REPO, "src")).filter(entry => entry.endsWith(".ts") && textOf(entry).includes(AGENT_SDK))) {
    const file = repoPath(path);
    const tree = syntaxOf(file);
    const helpers = tree.statements.flatMap(statement => {
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteralLike(statement.moduleSpecifier) || statement.moduleSpecifier.text !== AGENT_SDK) return [];
      const bindings = statement.importClause?.namedBindings;
      return bindings !== undefined && ts.isNamedImports(bindings) ? bindings.elements.filter(element => (element.propertyName ?? element.name).text === "tool").map(element => element.name.text) : [];
    });
    for (const node of nodesOf(tree)) {
      if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression) || !helpers.includes(node.expression.text)) continue;
      const [name, ...rest] = node.arguments;
      if (name !== undefined && ts.isStringLiteralLike(name) && rest.some(argument => nodesOf(argument).some(inner => callsMethod(inner, "invoke")))) tools.push(`${file}#${name.text}`);
    }
  }
  derivationCache = { readers: readers.length, envelopeReaders, registrations: registrations.sort(), tools: tools.sort(), projections: projections.sort() };
  return derivationCache;
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
const closers: (() => Promise<void>)[] = [];
afterEach(async () => {
  process.env.PATH = oldPath;
  for (const close of closers.splice(0)) await close();
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `answer` and exits 0. */
function standInRf(answer: JsonValue): string {
  const folder = makeScratch("rf-fiber-node-reuse-echo-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(answer))});`,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log)
    .trim()
    .split("\n")
    .filter(Boolean)
    .map(line => JSON.parse(line) as string[]);
}
function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}

/** One registry invocation of the INJECTED preview whose reader answers a deep copy of the envelope. */
async function registeredReading(envelope: JsonObject): Promise<{ reading: JsonObject; calls: number }> {
  const handed = json(envelope);
  let calls = 0;
  const registry = new CapabilityRegistry();
  reach(registerReactiveFiberRender.name);
  registerReactiveFiberRender(
    registry,
    async () => {
      calls += 1;
      return handed as unknown as InjectedEnvelope;
    },
    FIXTURE_ROOT,
  );
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext()), "reading");
  return { reading, calls };
}
/** One registry invocation of the NATIVE preview against a stand-in rf printing the envelope. */
async function nativeReading(envelope: JsonObject): Promise<{ reading: JsonObject; spawns: string[][] }> {
  const log = standInRf(envelope);
  const registry = new CapabilityRegistry();
  reach(registerNativeReactiveFiberRender.name);
  registerNativeReactiveFiberRender(registry, ROOT);
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext()), "native reading");
  return { reading, spawns: spawnsOf(log) };
}
/** The agent-visible reply of capability_invoke: the real curated MCP server behind a real MCP client, exposing only the injected
 * preview whose reader answers a deep copy of the envelope. */
async function toolReply(envelope: JsonObject): Promise<{ isError: boolean; text: string; payload: JsonObject }> {
  const handed = json(envelope);
  const registry = new CapabilityRegistry();
  reach(registerReactiveFiberRender.name);
  registerReactiveFiberRender(registry, async () => handed as unknown as InjectedEnvelope, FIXTURE_ROOT);
  const server = createCuratedTools({
    registry,
    allowedCapabilities: [PREVIEW_ID],
    grants: [`discover:${PREVIEW_ID}`, `inspect:${PREVIEW_ID}`, `invoke:${PREVIEW_ID}`, ...GRANTS],
    principal: { id: "census-user", role: "reviewer" },
    workspace: FIXTURE_ROOT,
    invocationId: "rf-fiber-node-reuse-echo-1",
    signal: new AbortController().signal,
  });
  const client = new Client({ name: "rf-fiber-node-reuse-echo-census", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  closers.push(async () => {
    await client.close();
    await server.instance.close();
  });
  const tool = "capability_invoke";
  reach(tool);
  const result = await client.callTool({ name: tool, arguments: { capabilityId: PREVIEW_ID, capabilityVersion: PREVIEW_VERSION, input: { model: "m", task: "t" } } });
  const content: unknown = result.content;
  const first: unknown = Array.isArray(content) ? content[0] : undefined;
  if (!isObject(first) || first.type !== "text" || typeof first.text !== "string") throw new Error("expected one text content block");
  return { isError: result.isError === true, text: first.text, payload: objectOf(json(JSON.parse(first.text)), "capability_invoke reply") };
}

function contextFor(seam: ReactiveFiberSeam): ReactiveFiberTopologyContext {
  return { scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" }, seam, capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z" };
}
const SEAMS: readonly ReactiveFiberSeam[] = ["rf-cli", "injected-fixture"];
function topologyOf(envelope: JsonObject, seam: ReactiveFiberSeam): JsonValue {
  reach(reactivefiberTopology.name);
  return json(reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: envelope }, contextFor(seam)));
}
function evidenceOf(envelope: JsonObject): JsonValue {
  reach(nativeEvidence.name);
  return json(nativeEvidence(PREVIEW_ID, { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: envelope }));
}
/** What a projection surfaces, judged: its LABELs, its KEY pairs and its FIGURE words. */
function surfaced(value: JsonValue): { labels: string[]; keyPairs: number; figureWords: string[] } {
  const shown = wordLeaves(value);
  return { labels: shown.flatMap(labelsOf), keyPairs: keyPairsOf(JSON.stringify(value)).length, figureWords: figureWordsOf(shown) };
}
function coverageOf(topology: JsonValue): JsonValue {
  const snapshots = isObject(topology) ? topology.snapshots : undefined;
  const [snapshot] = Array.isArray(snapshots) ? snapshots : [];
  return isObject(snapshot) ? json(snapshot.coverage) : null;
}
/** The divergent twin's operation id: a valid rf operation id other than the fixture's, which every projection surfaces. */
const DIVERGENT_OPERATION_ID = `rfo_${"b".repeat(22)}`;
/** A blind leg's reading (wb-5618, the gate's F3), one comparison for all three: blind - the projection of the fixture equals its
 * twin's; diverges - the twin really differs from the fixture; seesDivergence - the same comparison tells apart a divergent twin
 * (the twin with its operation id changed), so a self-compared leg, or a twin that is the fixture itself, reds. */
function blindness(project: (envelope: JsonObject) => JsonValue, fixture: JsonObject, twin: JsonObject): { blind: boolean; diverges: boolean; seesDivergence: boolean } {
  const sameAs = (other: JsonObject): boolean => JSON.stringify(project(fixture)) === JSON.stringify(project(other));
  const divergent = objectOf(json(twin), "divergent twin");
  divergent.operation_id = DIVERGENT_OPERATION_ID;
  return { blind: sameAs(twin), diverges: JSON.stringify(fixture) !== JSON.stringify(twin), seesDivergence: !sameAs(divergent) };
}

let nativeCatalog: Promise<CapabilityDescriptor[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  nativeCatalog ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeCatalog;
}
/** The rf descriptors of a catalog, by any of three selectors: id prefix, permission family or contract source. */
function rfDescriptors(descriptors: readonly CapabilityDescriptor[]): CapabilityDescriptor[] {
  return descriptors.filter(
    descriptor =>
      descriptor.id.startsWith("reactivefiber.") ||
      descriptor.id.startsWith("rf.") ||
      descriptor.permissions.some(permission => permission.startsWith("reactivefiber:")) ||
      (descriptor.contractSource ?? "").includes("reactive-fiber.cli"),
  );
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  T1: async () => {
    const readers = rfReaders();
    const names = readers.map(reader => reader.file).sort();
    const floor = { core: CORE_READERS.every(file => names.includes(file)), count: names.length >= READER_FLOOR };
    const keyHits = readers.flatMap(reader => reader.keys.filter(namesObjectKey).map(key => `${reader.file}: ${key}`));
    const literalHits = readers.flatMap(reader => reader.literals.filter(namesObjectLiteral).map(literal => `${reader.file}: ${literal.slice(0, 120)}`));
    const controls = {
      adapterReadsObservations: readers.some(reader => reader.file === "src/workbench/reactivefiber-observer.ts" && reader.keys.includes("observations")),
      providerNamesEngineMetrics: readers.some(reader => reader.file === "src/workbench/providers/reactivefiber.ts" && reader.literals.includes("engine_metrics")),
      keyRuleReadsSecond: namesObjectKey(SECOND) && namesObjectKey(snake(FIRST)),
      literalRuleReadsSpaced: namesObjectLiteral(`the ${foldedWords(FIRST).join(" ")} object`),
    };
    expect(floor, `readers: ${names.join(", ")}`).toStrictEqual({ core: true, count: true });
    expect(controls).toStrictEqual({ adapterReadsObservations: true, providerNamesEngineMetrics: true, keyRuleReadsSecond: true, literalRuleReadsSpaced: true });
    expect({ keyHits, literalHits }, "a Pi rf reader reading or naming the producer object").toStrictEqual({ keyHits: [], literalHits: [] });
    return { floor, controls, keyHits, literalHits };
  },
  T2: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const native = rfDescriptors(await nativeDescriptors()).map(descriptor => descriptor.id);
    const injectedIds = rfDescriptors(injected.catalogSnapshot().map(entry => entry.descriptor)).map(descriptor => descriptor.id);
    const carriers = [...rfDescriptors(await nativeDescriptors()), ...rfDescriptors(injected.catalogSnapshot().map(entry => entry.descriptor))].map(
      descriptor => descriptor.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE,
    );
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const verb = REACTIVE_FIBER_CONTRACT_SOURCE.endsWith(" context.render --no-commit");
    expect({ native, injected: injectedIds, reconcile }).toStrictEqual({ native: [PREVIEW_ID], injected: [PREVIEW_ID], reconcile: [PREVIEW_ID] });
    expect(carriers).toEqual([true, true]);
    expect(verb).toBe(true);
    return { native, injected: injectedIds, reconcile, carriers, verb };
  },
  A1: async () => {
    const roots = ["src", "test"];
    const files = roots.flatMap(root => filesBelow(join(REPO, root)));
    const paths = files.map(repoPath);
    const keyHits: string[] = [];
    const labelHits: string[] = [];
    const scanned = new Set<string>();
    files.forEach((file, index) => {
      const content = textOf(file);
      for (const pair of keyPairsOf(content)) keyHits.push(`${paths[index]}: ${pair}`);
      for (const label of labelsOf(content)) labelHits.push(`${paths[index]}: ${label}`);
      // Liveness (wb-5618, the gate's F2): the readings above ran over the file's own bytes - the scanned text's UTF-8 length is the
      // file's size on disk, or the text is not empty and carries the replacement character of a lossy decode.
      const size = statSync(file).size;
      if (Buffer.byteLength(content) === size || (size > 0 && content.length > 0 && content.includes(REPLACEMENT))) scanned.add(file);
    });
    const unscanned = files.filter(file => !scanned.has(file)).map(repoPath);
    const testExtensions = new Set(paths.filter(path => path.startsWith("test/")).map(path => extname(path)));
    const floors = { src: paths.filter(path => path.startsWith("src/")).length >= 100, test: paths.filter(path => path.startsWith("test/")).length >= 450 };
    const adapter = "src/workbench/reactivefiber-observer.ts";
    const helper = "test/helpers/rf-render-fixture.ts";
    const reads = {
      self: paths.includes(repoPath(SELF)),
      roster: paths.includes(repoPath(ROSTER_PATH)),
      adapterBareWord: paths.includes(adapter) && foldedWords(textOf(join(REPO, adapter))).includes(THIRD),
      helperCounters: paths.includes(helper) && textOf(join(REPO, helper)).includes(`${THIRD}_component_count`),
      dotDirectory: paths.some(path => path.split("/").some(part => part.startsWith("."))),
      depthFour: paths.some(path => path.split("/").length >= 5),
      testExtensions: [".json", ".md", ".mjs", ".ts"].every(extension => testExtensions.has(extension)),
    };
    expect(floors, `src and test files read: ${paths.length}`).toStrictEqual({ src: true, test: true });
    expect(reads).toStrictEqual({ self: true, roster: true, adapterBareWord: true, helperCounters: true, dotDirectory: true, depthFour: true, testExtensions: true });
    expect({ keyHits, labelHits }, "a KEY pair or a LABEL below src/ or test/").toStrictEqual({ keyHits: [], labelHits: [] });
    expect(unscanned.slice(0, 10), `files the readings did not scan as read from disk (${unscanned.length} of ${files.length})`).toEqual([]);
    return { roots, floors, reads, keyHits, labelHits, unscanned };
  },
  A2: async () => {
    const { title } = exportRow();
    const clauses = ownerClauses();
    const clauseA = clauses[0] ?? "";
    const targets = backticked(clauseA);
    const quote = exportQuote();
    const phrase = clauseA.slice(clauseA.indexOf("|") + 1, clauseA.indexOf(" over Pi src"));
    const bareWord = clauseA.slice(clauseA.lastIndexOf(" ") + 1);
    const resultKeys = readRfResultRoster().resultKeys;
    const anchors = {
      titlePath: backticked(title).filter(span => span.split(".").length === 3),
      targets,
      targetsAreThePairs: JSON.stringify(targets) === JSON.stringify([INNER_PAIR, OUTER_PAIR]),
      keyReadsEachTarget: targets.map(target => keyPairsOf(target).length),
      keyReadsTheQuote: keyPairsOf(quote).length,
      bareWordQuiet: bareWord === THIRD && keyPairsOf(bareWord).length === 0,
      labelReadsPhrase: labelsOf(phrase).length,
      labelReadsTitle: labelsOf(title).length,
      labelReadsQuote: labelsOf(quote).length,
      citation: title.endsWith(CITATION) && CITATION.endsWith(`@${PIN}`),
      rfRosterListsSecond: resultKeys.includes(SECOND),
      rfRosterFirstKeys: resultKeys.filter(key => PLACEMENTS.includes(key)).length,
    };
    expect(anchors.titlePath).toStrictEqual([SEGMENTS.join(".")]);
    expect(anchors.targetsAreThePairs).toBe(true);
    expect(anchors.keyReadsEachTarget).toEqual([1, 1]);
    expect(anchors.keyReadsTheQuote).toBeGreaterThanOrEqual(2);
    expect([anchors.bareWordQuiet, anchors.citation, anchors.rfRosterListsSecond]).toEqual([true, true, true]);
    expect([anchors.labelReadsPhrase, anchors.labelReadsTitle >= 1, anchors.labelReadsQuote >= 1]).toEqual([1, true, true]);
    expect(anchors.rfRosterFirstKeys).toBe(0);
    return { ...anchors, titlePath: anchors.titlePath.length, targets: targets.length };
  },
  A3: async () => {
    const key = Object.fromEntries(Object.entries(KEY_CONTROLS).map(([name, sample]) => [name, keyPairsOf(sample).length > 0]));
    const label = Object.fromEntries(Object.entries(LABEL_CONTROLS).map(([name, sample]) => [name, labelsOf(sample).length > 0]));
    const quiet = Object.fromEntries(Object.entries(QUIET_CONTROLS).map(([name, sample]) => [name, keyPairsOf(sample).length + labelsOf(sample).length]));
    expect(Object.entries(key).filter(([, read]) => !read), "a KEY control read quiet").toEqual([]);
    expect(Object.entries(label).filter(([, read]) => !read), "a LABEL control read quiet").toEqual([]);
    expect(Object.entries(quiet).filter(([, hits]) => hits !== 0), "a quiet control read a hit").toEqual([]);
    // R-SYMLINK (wb-5618, the gate's L10): in scratch, a link to a file spelling a KEY pair is not followed by the walker, while the
    // same file walked where it lies is read.
    const folder = makeScratch("rf-fiber-node-reuse-echo-walk-");
    scratches.push(folder);
    mkdirSync(join(folder, "elsewhere"));
    mkdirSync(join(folder, "tree"));
    const target = join(folder, "elsewhere", "target.ts");
    writeFileSync(target, KEY_CONTROLS.innerPair ?? "");
    symlinkSync(target, join(folder, "tree", "link.ts"));
    const walker = {
      linkRead: filesBelow(join(folder, "tree")).length,
      targetHits: filesBelow(join(folder, "elsewhere")).flatMap(file => keyPairsOf(textOf(file))).length,
    };
    expect(walker, "R-SYMLINK: the link is not followed; its target, walked where it lies, is read").toStrictEqual({ linkRead: 0, targetHits: 1 });
    return { key, label, quiet, walker };
  },
  B1: async () => {
    const rows: JsonValue[] = [];
    for (const fixture of carryingFixtures(FIXTURE_ROOT)) {
      const { reading, calls } = await registeredReading(fixture.envelope);
      const piPart = { ...reading, source: null };
      const row = {
        kind: fixture.kind,
        value: producerValue(reading.source, fixture.placement),
        verbatim: JSON.stringify(reading.source) === JSON.stringify(carryingFixtures(FIXTURE_ROOT).find(entry => entry.kind === fixture.kind && entry.value === fixture.value)?.envelope),
        calls,
        piStrings: stringLeaves(piPart),
        piNumbers: numberLeaves(piPart),
        piLabels: wordLeaves(piPart).flatMap(labelsOf),
        piKeyPairs: keyPairsOf(JSON.stringify(piPart)).length,
      };
      expect(row).toStrictEqual({ ...row, value: fixture.value, verbatim: true, calls: 1, piStrings: [REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, FIXTURE_ROOT], piNumbers: [], piLabels: [], piKeyPairs: 0 });
      rows.push(row);
    }
    return { fixtures: rows.length, rows };
  },
  B2: async () => {
    const rows: JsonValue[] = [];
    for (const fixture of carryingFixtures(ROOT)) {
      const { reading, spawns } = await nativeReading(fixture.envelope);
      const [argv = []] = spawns;
      const row = {
        kind: fixture.kind,
        value: producerValue(reading.source, fixture.placement),
        verbatim: JSON.stringify(reading.source) === JSON.stringify(fixture.envelope),
        piKeys: Object.keys(reading).sort(),
        contract: reading.contract === REACTIVEFIBER_RENDER_PREVIEW_CONTRACT && reading.workspaceRoot === ROOT,
        spawns: spawns.length,
        verb: argv.slice(2, 4),
        tail: argv.slice(-3),
      };
      expect(row).toStrictEqual({
        ...row,
        value: fixture.value,
        verbatim: true,
        piKeys: ["contract", "source", "workspaceRoot"],
        contract: true,
        spawns: 1,
        verb: ["context", "render"],
        tail: ["--no-commit", "--no-input", "--json"],
      });
      rows.push(row);
    }
    return { fixtures: rows.length, rows };
  },
  B3: async () => {
    const rows: JsonValue[] = [];
    for (const fixture of carryingFixtures(FIXTURE_ROOT)) {
      const reply = await toolReply(fixture.envelope);
      const value = objectOf(reply.payload.value, "capability_invoke reply value");
      const expected = JSON.stringify({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: fixture.envelope });
      const spelled = `${JSON.stringify(fixture.placement)}:${JSON.stringify({ [SECOND]: { [THIRD]: fixture.value } })}`;
      const piPart = { ...reply.payload, value: { ...value, source: null } };
      const row = {
        kind: fixture.kind,
        isError: reply.isError,
        replyKind: json(reply.payload.kind),
        verbatim: JSON.stringify(value) === expected,
        keySpelledVerbatim: reply.text.includes(spelled),
        piStrings: stringLeaves(piPart),
        piLabels: wordLeaves(piPart).flatMap(labelsOf),
        replyLabels: labelsOf(reply.text).length,
      };
      expect(row).toStrictEqual({
        ...row,
        isError: false,
        replyKind: "returned",
        verbatim: true,
        keySpelledVerbatim: true,
        piStrings: ["returned", REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, FIXTURE_ROOT],
        piLabels: [],
        replyLabels: 0,
      });
      rows.push(row);
    }
    return { fixtures: rows.length, rows };
  },
  B4: async () => {
    const twin = plainEnvelope(FIXTURE_ROOT);
    const rows: JsonValue[] = [];
    for (const fixture of carryingFixtures(FIXTURE_ROOT)) {
      for (const seam of SEAMS) {
        const topology = topologyOf(fixture.envelope, seam);
        const row = { kind: fixture.kind, value: fixture.value, seam, ...blindness(envelope => topologyOf(envelope, seam), fixture.envelope, twin), coverage: coverageOf(topology), ...surfaced(topology) };
        expect(row).toStrictEqual({ ...row, blind: true, diverges: true, seesDivergence: true, labels: [], keyPairs: 0, figureWords: [] });
        rows.push(row);
      }
    }
    return { cases: rows.length, rows };
  },
  B5: async () => {
    const twin = plainEnvelope(FIXTURE_ROOT);
    const rows: JsonValue[] = [];
    for (const fixture of carryingFixtures(FIXTURE_ROOT)) {
      const evidence = evidenceOf(fixture.envelope);
      const row = { kind: fixture.kind, value: fixture.value, ...blindness(evidenceOf, fixture.envelope, twin), keys: Object.keys(objectOf(evidence, "evidence")).sort(), ...surfaced(evidence) };
      expect(row).toStrictEqual({ ...row, blind: true, diverges: true, seesDivergence: true, labels: [], keyPairs: 0, figureWords: [] });
      rows.push(row);
    }
    return { cases: rows.length, rows };
  },
  C1: async () => {
    const plain = plainEnvelope(FIXTURE_ROOT);
    const registered = await registeredReading(plain);
    const native = await nativeReading(plainEnvelope(ROOT));
    const reply = await toolReply(plain);
    const witness = {
      registered: { firstKeys: firstSegmentKeys(registered.reading).length, verbatim: JSON.stringify(registered.reading.source) === JSON.stringify(plain), keyPairs: keyPairsOf(JSON.stringify(registered.reading)).length },
      native: { firstKeys: firstSegmentKeys(native.reading).length, verbatim: JSON.stringify(native.reading.source) === JSON.stringify(plainEnvelope(ROOT)), spawns: native.spawns.length },
      reply: { firstKeys: firstSegmentKeys(reply.payload).length, keyPairs: keyPairsOf(reply.text).length, isError: reply.isError },
      topology: SEAMS.map(seam => ({ seam, ...surfaced(topologyOf(plain, seam)) })),
      evidence: surfaced(evidenceOf(plain)),
    };
    expect(witness.registered).toStrictEqual({ firstKeys: 0, verbatim: true, keyPairs: 0 });
    expect(witness.native).toStrictEqual({ firstKeys: 0, verbatim: true, spawns: 1 });
    expect(witness.reply).toStrictEqual({ firstKeys: 0, keyPairs: 0, isError: false });
    expect(witness.topology.map(({ labels, keyPairs, figureWords }) => ({ labels, keyPairs, figureWords }))).toStrictEqual(SEAMS.map(() => ({ labels: [], keyPairs: 0, figureWords: [] })));
    expect(witness.evidence).toStrictEqual({ labels: [], keyPairs: 0, figureWords: [] });
    return witness;
  },
  C2: async () => {
    const zero = counterEnvelope(FIXTURE_ROOT, 0);
    const counted = counterEnvelope(FIXTURE_ROOT, 3);
    const registered = await registeredReading(counted);
    const reply = await toolReply(counted);
    const counterOf = (source: JsonValue | undefined): JsonValue => {
      const result = isObject(source) ? source.result : undefined;
      const metrics = isObject(result) ? result.work_metrics : undefined;
      return isObject(metrics) ? json(metrics.reused_component_count) : null;
    };
    const witness = {
      topology: SEAMS.map(seam => ({ seam, ...blindness(envelope => topologyOf(envelope, seam), counted, zero), ...surfaced(topologyOf(counted, seam)) })),
      evidence: { ...blindness(evidenceOf, counted, zero), ...surfaced(evidenceOf(counted)) },
      registered: { counter: counterOf(registered.reading.source), firstKeys: firstSegmentKeys(registered.reading).length, verbatim: JSON.stringify(registered.reading.source) === JSON.stringify(counted) },
      reply: { counter: counterOf(objectOf(reply.payload.value, "reply value").source), firstKeys: firstSegmentKeys(reply.payload).length, keyPairs: keyPairsOf(reply.text).length },
    };
    expect(
      witness.topology.map(({ blind, diverges, seesDivergence, labels, keyPairs, figureWords }) => ({ blind, diverges, seesDivergence, labels, keyPairs, figureWords })),
    ).toStrictEqual(SEAMS.map(() => ({ blind: true, diverges: true, seesDivergence: true, labels: [], keyPairs: 0, figureWords: [] })));
    expect(witness.evidence).toStrictEqual({ blind: true, diverges: true, seesDivergence: true, labels: [], keyPairs: 0, figureWords: [] });
    expect(witness.registered).toStrictEqual({ counter: 3, firstKeys: 0, verbatim: true });
    expect(witness.reply).toStrictEqual({ counter: 3, firstKeys: 0, keyPairs: 0 });
    return witness;
  },
  C3: async () => {
    const observed = observationEnvelope(FIXTURE_ROOT);
    const seams = SEAMS.map(seam => {
      const topology = topologyOf(observed, seam);
      const shown = wordLeaves(topology);
      const reuseStrings = shown.filter(entry => figureWordsOf([entry]).some(word => word.startsWith("reus")));
      return {
        seam,
        coverage: coverageOf(topology),
        reuseStrings,
        nounsInReuseStrings: reuseStrings.flatMap(foldedWords).filter(word => LABEL_NOUNS.includes(word)).length,
        skipWords: figureWordsOf(shown).filter(word => word.startsWith("skip")).length,
        labels: shown.flatMap(labelsOf),
      };
    });
    const evidence = surfaced(evidenceOf(observed));
    for (const entry of seams) {
      expect(entry.reuseStrings.length, `${entry.seam}: the adapter's observations note`).toBeGreaterThanOrEqual(1);
      expect(entry.reuseStrings.every(note => note.startsWith("observations: "))).toBe(true);
      expect({ nouns: entry.nounsInReuseStrings, skip: entry.skipWords, labels: entry.labels }).toStrictEqual({ nouns: 0, skip: 0, labels: [] });
    }
    expect(evidence).toStrictEqual({ labels: [], keyPairs: 0, figureWords: [] });
    return { seams, evidence };
  },
};

describe("wb-csbt.2 rf render-report component-reuse echo census (TSX-RESOURCE-EFFICIENCY-FRONTIER-R2)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the owner's acceptance clauses and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:2", "A:3", "B:5", "C:3"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, labelDigest: digestOf(label), pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, labelDigest, pins }) => ({ id, labelDigest, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    // The owner's acceptance clauses in the tracked bead export are exactly the labels of rows A, B and C, in order.
    expect(ownerClauses()).toEqual(ROWS.filter(row => row.id !== "T").map(row => row.label));
    // And row T's label is the export title's trigger (wb-5618): every judged label is held to the export, the trigger first.
    expect(ROWS.map(row => row.label)).toEqual([exportTrigger().text, ...ownerClauses()]);
    expect({
      bead: BEAD,
      statement: STATEMENT,
      pin: PIN,
      rfVersion: RF_VERSION,
      citation: CITATION,
      vocabulary: {
        segments: [...SEGMENTS],
        placements: [...PLACEMENTS],
        values: [...VALUES],
        separator: SEPARATOR,
        skipWords: [...SKIP_WORDS],
        labelNouns: [...LABEL_NOUNS],
        window: WINDOW,
        unitBreaks: UNIT_BREAKS,
        figureWords: [...FIGURE_WORDS],
        coreReaders: [...CORE_READERS],
        readerFloor: READER_FLOOR,
      },
    }).toStrictEqual({
      bead: ROSTER.bead,
      statement: ROSTER.statement,
      pin: ROSTER.pin,
      rfVersion: ROSTER.rfVersion,
      citation: ROSTER.citation,
      vocabulary: { ...ROSTER.vocabulary, segments: [...ROSTER.vocabulary.segments], placements: [...ROSTER.vocabulary.placements] },
    });
    // The export row names this bead's statement id and the citation; the controls are the ones the roster's A3 witness names.
    expect(exportRow().title.startsWith(`[${STATEMENT}] `)).toBe(true);
    const a3 = rosterWitness("A3");
    expect(isObject(a3) ? [Object.keys(objectOf(a3.key, "A3 key")), Object.keys(objectOf(a3.label, "A3 label")), Object.keys(objectOf(a3.quiet, "A3 quiet"))] : null).toStrictEqual([
      Object.keys(KEY_CONTROLS),
      Object.keys(LABEL_CONTROLS),
      Object.keys(QUIET_CONTROLS),
    ]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await runAs(pin, impl);
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("bound: every pin of rows T and B holds one term of the export title's absent-today note or one reading surface src derives", { timeout: 120_000 }, () => {
    const trigger = exportTrigger();
    const derivation = surfaceDerivation();
    const surfaces = [...derivation.registrations, ...derivation.tools, ...derivation.projections].sort();
    const pinsOf = (id: string): string[] => [...(ROWS.find(row => row.id === id)?.pins ?? [])];
    const tPins = pinsOf("T");
    const bPins = pinsOf("B");
    const holders = (anchor: string, pins: readonly string[]): string[] => pins.filter(pin => BINDINGS[pin] === anchor);
    const witness = {
      trigger: trigger.terms.map(term => ({ term, pins: holders(term, tPins) })),
      surfaces: surfaces.map(surface => ({ surface, pins: holders(surface, bPins) })),
      derivation: {
        // T1's reader floor, not an exact count: a new Pi rf reader that adds no surface keeps this census green, as T1 does.
        readersAtFloor: derivation.readers >= READER_FLOOR,
        envelopeReaders: [...derivation.envelopeReaders],
        kinds: { registrations: derivation.registrations.length, tools: derivation.tools.length, projections: derivation.projections.length },
      },
      unbound: [...tPins.filter(pin => !trigger.terms.includes(BINDINGS[pin] ?? "")), ...bPins.filter(pin => !surfaces.includes(BINDINGS[pin] ?? ""))],
      stale: Object.keys(BINDINGS).filter(pin => !tPins.includes(pin) && !bPins.includes(pin)),
      // Each B case ran before this one (the registration case holds the order): what it reached, recorded by reach().
      reached: bPins.map(pin => ({ pin, symbols: [...(REACHED.get(pin) ?? [])].sort() })),
    };
    const symbolOf = (binding: string): string => binding.slice(binding.indexOf("#") + 1);
    expect(
      bPins.filter(pin => !(REACHED.get(pin)?.has(symbolOf(BINDINGS[pin] ?? "")) ?? false)),
      "a B pin whose case did not reach, as it ran, the surface it is bound to",
    ).toEqual([]);
    expect(witness.trigger.map(({ pins }) => pins.length), "each term of the export title's absent-today note is held by exactly one T pin").toEqual(trigger.terms.map(() => 1));
    expect(witness.surfaces.map(({ pins }) => pins.length), "each reading surface src derives is held by exactly one B pin").toEqual(surfaces.map(() => 1));
    expect({ unbound: witness.unbound, stale: witness.stale }, "a T or B pin bound to no anchor, or a binding naming no pin").toStrictEqual({ unbound: [], stale: [] });
    expect(Object.values(witness.derivation.kinds).every(count => count >= 1), "each derivation kind finds a surface (positive control)").toBe(true);
    expect(witness).toStrictEqual(ROSTER.bound);
  });

  it("registration: every case of this file is registered once, in roster order, in run mode, and ran before this one", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
  });
});
