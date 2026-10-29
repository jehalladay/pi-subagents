/**
 * wb-km7q.4 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R12, program-triage-2026-10-18 child of wb-km7q), the
 * CoverageWitness adoption census (cut #2). Statement (the bead's export title, read at run time): "If Pi ever consumes a
 * CoverageWitness (gated RL-RQ1..RL-RQ8; 'coverage is not freshness' amendment), the adapter carries all eight typed fields
 * (collection identity through invalidation conditions); a freshness witness never proves enumeration coverage, an
 * old-generation seal is stale for today's task, and source-only 'no records observed' never certifies absence." Acceptance
 * (the owner filing, verbatim, read from the tracked bead export): "adoption-time falsifiers that freshness-without-coverage
 * never reads complete and stale-generation seals are refused for current tasks". The filing cites the ReactiveLensesSDK
 * charter docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md (:35, :37 and :41 at d75fe44948cd); this
 * census echoes the producer's words and claims nothing of the producer.
 *
 * NO PI ADAPTER EXISTS: no judged Pi product file names the CoverageWitness vocabulary today (A1), so the title's duties have no
 * Pi subject yet. The acceptance is met in the form it names: falsifiers that run now (against model adapters, A2, and against
 * the Pi readers a witness would land in, B and C) and that run against Pi's adapter the moment a cut registers one
 * (adoption()), refusing the adoption when one of them fires (A2's adoption judge).
 *
 * ROWS (the labels joined by one space are the acceptance; each row's pin quotes joined by one space are its label; frozen
 * shape ["A:2", "B:2", "C:2"]):
 * - A, "adoption-time falsifiers".
 *   A1 "adoption-time", the TRIGGER (armed; absent today). The judged files are every file git lists (tracked or untracked,
 *     never ignored) below src/, qa/ and examples/ and the root package.json, each read as UTF-8, put through NFKC and cut into
 *     runs of letters, digits, '_' and '-'; a run whose lower-case form without '_' and '-' contains a TERM's (read the same
 *     way) is a hit. TERMS: the title's CoverageWitness; the producer's other coverage records and judge, CoveragePopulation,
 *     CoverageIssuer, CoverageInvalidation, CoverageJudgement and judge_coverage (reactive_lenses/coverage_witness.py),
 *     CoverageLedger, CoverageVerdict, ManifestDeclaration and SealWithdrawal (reactive_lenses/coverage_ledger.py); and the
 *     witness's seal field sealed_snapshot. package.json also hits on each of its keys and string values, at any depth, that
 *     matches reactive[-_]?lenses (case-insensitive): a dependency name, an npm-alias or git spec that spells the SDK's name, an
 *     override, a script. The walk records symlinks (never followed), files that are not UTF-8 and listed paths missing on disk
 *     (each list is empty today); each root has a floor (src 100, qa 55, examples 5); two planted files ride last (a short src
 *     plant and a qa plant longer than every judged file with its term on its last line), and the hits are exactly the plants'.
 *     The planted texts, package texts and files below read through the same judge, each with its hit count in the witness. A
 *     hit while adoption() is null throws OWED: the trigger refuses whatever the roster holds, so a cut that re-measures the
 *     witnesses without registering an adapter still reds. The rf leg: on every render variant this census feeds the rf preview
 *     reader (reactivefiberTopology, which reads the reactivefiber.render.preview provider output) - B2's six and C2's four, the
 *     clean render shared (RF_VARIANTS) - the render whose observation rows carry coverage_witness (A2's sealed payload) and
 *     freshness_witness (A2's freshness payload) and whose result carries coverage_witness projects to the same JSON text, or the
 *     same refusal, as the render without them; a variant that differs throws, whatever the roster holds; the clean render with
 *     its row reused projects differently, so the compare sees a change.
 *   A2 "falsifiers", the BATTERY over the producer's JSON forms. PAYLOADS are this file's values in the producer's rosters
 *     (COVERAGE_WITNESS_FIELDS and its nested rosters, FRESHNESS_WITNESS_FIELDS; key order included): sealed (collection
 *     beads:issues, scope open, generation g2, a manifest of 20 observing 20, a sealed snapshot), partial (observing 4),
 *     oldGeneration (generation g1), noRecords (no manifest, expected 0, observing 0, a sealed snapshot) and freshness (a
 *     FreshnessWitness of beads:issues at g2); the task's generation is g2. L-SEALED (RL-RQ1) needs sealed to read complete;
 *     F-PARTIAL (RL-RQ2) needs partial never to read complete; F-FIELDS needs the adapter's fields to equal
 *     COVERAGE_WITNESS_FIELDS in order; F-FRESHNESS, F-GENERATION and F-NO-RECORDS need freshness, oldGeneration and noRecords
 *     never to read complete. The producer's judgement of each payload is VERDICTS, measured at cut #1 by executing the
 *     installed reactive_lenses (its coverage_witness.py and freshness.py blobs equal the pin's): sealed is sealed
 *     (manifest_complete), partial is no_seal (population_incomplete), oldGeneration is refused_generation
 *     (generation_mismatch), noRecords is no_seal (no_records), and freshness is refused by CoverageWitness.from_json and by
 *     judge_coverage (naming witness); each rule agrees with its payload's verdict. ORACLE, the passing subject, carries those
 *     verdicts (complete for a sealed verdict, unknown otherwise) and judges nothing. Each of the mutants M-FRESHNESS,
 *     M-PARTIAL, M-GENERATION, M-NO-RECORDS, M-FIELDS and M-CONSTANT fires exactly its own falsifier; the residuals' mutants
 *     M-CAMEL and M-EXPIRY break a rule through a shape no payload states and fire none: the battery fires on what its
 *     falsifiers state, not on every violating adapter. THE ADOPTION JUDGE: an adapter is accepted when no falsifier fires on it
 *     and refused when one does; it runs today on ORACLE (accepted) and on every mutant (refused exactly when its battery
 *     fires), and the records case holds that every falsifier refused at least one of them. adoption() returns the adapter an
 *     adopting cut imports statically, with its module path (held to the roster's adoption block); A2 holds that registration
 *     (the module sits below src/, holds a trigger hit, is imported statically by this file with a value binding, and
 *     adoption()'s body names a binding that import introduces; each refusal branch runs today on probes) and then judges the
 *     adapter: a refused registration or a refused adoption throws, red whatever the roster holds. adoption() is null today, so
 *     no Pi adapter is run (A1's OWED forces the registration). No loader call with a computed specifier is used (the rc
 *     remote-component census pins those).
 * - B, "that freshness-without-coverage never reads complete".
 *   B1 "that freshness-without-coverage", on ObservationProjection (src/workbench/observation.ts), the projection a Pi reader's
 *     snapshot lands in: a current refresh stating no coverage reads unknown, a partial one partial, a complete one complete; a
 *     later current refresh stating no coverage after a complete one reads unknown; a node seen only through events reads
 *     unknown; a failed read (markStale) after a complete refresh reads stale and unknown.
 *   B2 "never reads complete", on two readers that state a coverage reading: the rf preview reader, its one row fresh and
 *     observed, reads complete only with both inclusion records stated (result.blocks and result.necessity), a block included
 *     and none withheld (both records absent, either record absent alone, both empty, or one candidate withheld read partial);
 *     the HyperUnix reader (the filing's house precedent wb-6ze.7; docs/workbench/07 'known-empty vs incomplete/unknown') reads
 *     complete only on a runtime-licensed complete-empty answer here (a complete or complete-empty answer the runtime did not
 *     license, with zero rows or with rows, reads partial).
 * - C, "and stale-generation seals are refused for current tasks".
 *   C1 "and stale-generation seals are refused", on ObservationProjection: after a current read stating no coverage, a complete
 *     snapshot captured earlier, or at a lower sequence, or with no sequence after a sequenced one, is refused out-of-order and
 *     the node keeps reading unknown; a complete snapshot at a higher sequence and a later capture applies and reads complete.
 *   C2 "for current tasks", on the rf preview reader: a row replayed from an earlier render (freshness reused) holds the render
 *     at partial, with or without the witness keys (A1's rf leg), and a committed render (render_id or commit_seq stated) is
 *     refused; the render with its row captured at render reads complete.
 *
 * OUTSIDE ANCHOR: the wb-km7q.4 row of the tracked bead export (.beads/issues.jsonl): its title (the record, the gate list, the
 * field count and the four duty clauses are parsed from it) and the first span after each of the notes labels "Citations: ",
 * "Carrier fields: ", "House precedent to reuse, not re-derive: " and "Acceptance: " (to a full stop before white space or the
 * end); appended notes and status writes do not move them. What it anchors, and so what a removal made in every literal of this
 * file and the roster together still reds:
 *   - the acceptance's words: the labels joined are the acceptance, each row's pin quotes joined are its label, and each quote
 *     sits in the acceptance once, so a row, or any word of the acceptance, removed or shortened reds; how a row's words split
 *     into its pins is this census's own reading (a pin merged into another pin of its row is not detected; LIMITS);
 *   - the falsifiers: the four duty clauses are the duties of the four duty falsifiers, in order; the title's gate list equals
 *     the items of the charter's :41 line and is partitioned exactly into the battery's gate falsifiers (L-SEALED RL-RQ1 and
 *     F-PARTIAL RL-RQ2, whose payloads carry the counts their items name: 20 of 20 and 4 of 20) and UNBATTERIED (RL-RQ3..RL-RQ8,
 *     each with why), so a duty or gate falsifier removed reds; and the records case holds that the adoption judge saw every
 *     falsifier refuse an adapter, so a battery left unrun (A2's body deleted, its quote re-homed) reds;
 *   - the carrier phrases map one to one, in order, onto COVERAGE_WITNESS_FIELDS (the title's count, eight, included) and are
 *     the list the charter's :37 line spells; the citation names the roster's charter path, revision and lines;
 *   - the precedent names wb-6ze.7 (absence must be runtime-licensed) and docs/workbench/07 HX known-empty vs
 *     incomplete/unknown: the records case holds that the HX reader read a runtime-licensed and an unlicensed complete-empty
 *     answer, so B2's HX leg deleted reds; and the page's '## HyperUnix provider' section, bound with the landed docsSection
 *     (test/helpers/census.ts) under the page's title heading, carries no HTML and renders, in its prose, the sentence holding
 *     the precedent's phrase exactly once, so the phrase wrapped in a comment, moved to another section or kept only in a code
 *     block, or its sentence rewritten in place, reds.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, TERMS, the carrier map, the gate list
 * and UNBATTERIED, the payload digests, VERDICTS, the battery, the residual table, adoption() and every pin's witness are held to
 * the out-of-file roster (test/fixtures/rl-coverage-witness-roster.json). SELF-READ: no IMPL member names ROSTER (direct
 * identifiers only), the roster is deep-frozen when loaded, and the registration check reads this file's static imports and
 * adoption()'s identifiers from its AST. RECORDS: the last case holds that every registered pin ran to its compare and
 * re-digests each witness against its roster witness, that every falsifier refused an adapter in the adoption judge, and that
 * the HX reader read the precedent's licensed and unlicensed complete-empty answers.
 * RESIDUALS (named; each has pinned quiet rows and a live twin among the planted inputs of its pin, read in that pin's case):
 *   R-COMPOSED (A1) a term assembled at run time (quiet: "Coverage" + "Witness"; twin: the one literal).
 *   R-SPACED (A1) a term's words apart (quiet: "the coverage witness", coverage.witness, "sealed snapshot"; twin: coverage_witness).
 *   R-ESCAPED (A1) a term spelled through a source escape (quiet: CoverageWitness as written; twin: the title's word).
 *   R-LOOKALIKE (A1) a confusable letter, or an invisible inside a word, that NFKC does not fold (quiet: a Cyrillic C, a zero-width
 *     space, a soft hyphen; twin: fullwidth letters, which NFKC folds).
 *   R-OTHER-NAME (A1) a consumer under a name no term spells (quiet: PopulationSeal, enumerationCertificate; twin: isCoverageWitness).
 *   R-OUTSIDE-ROOTS (A1) a file below test/ or docs/ or another root file (quiet: such plants; twin: the same text below src/).
 *   R-UNNAMED-SPEC (A1) a package.json dependency whose spec reaches the SDK without spelling its name (quiet: a tarball URL
 *     under another name; twin: the npm-alias spec npm:vibranium-reactive-lenses@0.1.1).
 *   R-UNFED-RENDER (A1) an rf reader that reads a witness key only on a render shape no variant feeds (quiet: a stand-in reader
 *     that reads freshness_witness only on a render of two or more rows; twin: the stand-in that reads it on any row; each is
 *     otherwise the real reader on the render with the witness keys taken off).
 *   R-OTHER-SHAPE (A2) a violation reached only through a payload shape the battery never feeds, such as a camelCase port
 *     (quiet: M-CAMEL, complete on a sealedSnapshot key; twin: M-SNAKE, complete on a sealed_snapshot key).
 *   R-EXPIRY (A2) an expired or clockless proof (RL-RQ4): no payload states valid_until (quiet: M-EXPIRY, complete on a stated
 *     valid_until; twin: M-NO-EXPIRY, complete on a null one).
 *   R-EVENT-KEEPS-SEAL (C1) an in-order event stating a new source version after a complete snapshot leaves the node complete
 *     and current: the projection withdraws no seal on a source revision change (charter:39 gives that to the producer's ledger)
 *     (quiet: that journey ends complete; twin: a refresh at the new version stating no coverage ends unknown).
 * NOT CLAIMED: Pi's other coverage readers (beads, claude, detached, forge, forge-operation, furnace) are not judged by B or C;
 * the filing's Authority sentence ("no second freshness implementation in QuerySDK and none in Pi") is not judged here (A1's rf
 * leg reads only that the witness keys change no projection on the variants it feeds); of the gate list the battery holds
 * RL-RQ1 (L-SEALED) and RL-RQ2 (F-PARTIAL) only, and UNBATTERIED says why for each other gate (F-GENERATION's old generation of
 * the same collection is the title's duty, not RL-RQ3's wrong-source case); the payload values are this file's own, not a
 * producer fixture; VERDICTS are the producer's answers at cut #1, seen again only when a cut re-measures them; an adoption the
 * judge accepts has passed the battery, which is not a proof the adapter is right (R-OTHER-SHAPE, R-EXPIRY).
 * LIMITS: a check deleted or rewritten in this file's code is not detected beyond the SELF-READ (a pin rewritten to return its
 * roster witness through a helper is not); a residual removed together with its planted inputs and their roster readings is not
 * detected (residuals are this census's own reading); a TERM other than the title's CoverageWitness removed from TERMS, its
 * planted text, the roster and the witnesses together is not detected (the producer's other names are measured into the roster,
 * not read at run time); a pin merged into another pin of its row (its words and body re-homed), or a pin's sub-case (a journey,
 * a render variant, an HX variant, a planted text or file, a mutant) removed from this file and its roster witness together, is
 * not detected, except where the outside anchor holds it: a falsifier (its title duty or gate), the adoption judge's refusals,
 * the precedent's two HX reads and a carrier pair; a registration that names its import's binding but runs a stand-in adapter is
 * not detected (the registration check holds the module path, the import and the name; the battery judges the behaviour);
 * ORACLE is a lookup and proves only that the battery can be passed; a filtered run (-t) reds the records case by design.
 * MEASURED (seat records, read-only; not assertions): cut #2 over trunk e3022a1, 2026-10-29: 192 judged files (src 117, qa 67,
 * examples 7, package.json), 0 hits, 0 symlinks, 0 non-UTF-8, and package.json names reactive[-_]?lenses in no key or value. Cut
 * #1 (seat ws-01, trunk 1f8117a, 2026-10-28; the producer facts verified again by the gate's PREP, finding F1):
 * ReactiveLensesSDK's pin d75fe44948cd (2026-10-18) and origin/master 4efe999ceba2 (2026-10-24) hold the charter as one blob
 * ed7137db247b (its :3 status 'proposed / doc-only'), and src/reactive_lenses/coverage_witness.py (blob afde4a99409d, added at
 * 28f172dc7715 before the pin) and freshness.py (blob dd655682d361) are the same blobs at both; the installed rf environment
 * (vibranium-reactive-lenses 0.1.1.20261024.1) carries those two blobs, and executing it (python -I -B, no bytecode written)
 * gave VERDICTS and the rosters in the roster's producer block; RL's tests/test_coverage_witness.py and
 * tests/test_coverage_ledger.py name RL-RQ1..RL-RQ5 and RL-RQ7, not RL-RQ6 or RL-RQ8. ReactiveFiberCLI origin/main
 * 48f020fe625f (2026-10-28T12:09:10Z): context.render.schema.json (blob 3282323161f4) has no line matching coverage, witness or
 * seal (case-insensitive).
 *
 * Display paths added: none. Test-only: the renders, HX readings, projections and adapters live in memory (no scratch); the
 * only spawn is git ls-files; src, qa, examples, package.json, docs/workbench/07 and the bead export are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, readFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { type HyperUnixTopologyContext, hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import { type NativeRef, type NativeSnapshot, type ObservationEvent, ObservationProjection, type ObservationScope, type Presentation } from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { docsSection } from "./helpers/census.js";
import { fullShapeRf, type Json, rfFixtureDecision } from "./helpers/rf-render-fixture.js";

type JsonObject = { [key: string]: Json };
interface Pin { readonly id: string; readonly quote: string }
interface Row { readonly id: string; readonly label: string; readonly pins: readonly Pin[] }
interface Residual { readonly id: string; readonly pin: string; readonly quiet: readonly string[]; readonly twin: readonly string[] }
type Rule = "complete" | "never-complete" | "fields";
interface Falsifier { readonly id: string; readonly basis: string; readonly payload: string | null; readonly rule: Rule }
interface CharterLine { readonly sha256: string; readonly text: string }
interface Roster {
  readonly bead: string;
  readonly constants: JsonValue;
  readonly producer: {
    readonly charter: { readonly repo: string; readonly path: string; readonly revision: string; readonly blob: string; readonly status: CharterLine; readonly lines: Readonly<Record<string, CharterLine>> };
    readonly measured: JsonValue;
  };
  readonly residuals: readonly Residual[];
  readonly adoption: { readonly module: string } | null;
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: JsonValue })[] }[];
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SELF = "test/workbench-rl-coverage-witness-census.test.ts";
const ROSTER_FILE = "test/fixtures/rl-coverage-witness-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-km7q.4";
const PRECEDENT_PAGE = "docs/workbench/07-native-integrations.md";
const PRECEDENT_SECTION = "HyperUnix provider";
/** The precedent page's title heading, the section's parent (its dash is U+2014). */
const PRECEDENT_PARENT = `07 ${String.fromCodePoint(0x2014)} MechanicalWorkflows and ecosystem native SDK integration`;
/** The sentence of the precedent section that holds the precedent's phrase. */
const PRECEDENT_SENTENCE = "Use typed TS HX SDK/HXQ builder/results; preserve source basis, coverage classification, bounds, known-empty vs incomplete/unknown and evidence.";
const deepFreeze = <T>(value: T): T => {
  if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) deepFreeze(item);
    Object.freeze(value);
  }
  return value;
};
const ROSTER = deepFreeze(JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster);
const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
const sha256 = (text: string): string => createHash("sha256").update(text).digest("hex");
const digestOf = (value: unknown): string => sha256(JSON.stringify(value)).slice(0, 16);
const isObject = (value: unknown): value is JsonObject => value !== null && typeof value === "object" && !Array.isArray(value);
function objectOf(value: Json | undefined, what: string): JsonObject {
  if (!isObject(value)) throw new Error(`${what} is not an object`);
  return value;
}
const without = (value: JsonObject, ...keys: readonly string[]): JsonObject => Object.fromEntries(Object.entries(value).filter(([key]) => !keys.includes(key)));
/** A planted input as a witness carries it: ASCII only, every other code point as \u{hex}. */
const shown = (text: string): string => [...text].map(unit => ((unit.codePointAt(0) ?? 0) < 0x80 ? unit : `\\u{${(unit.codePointAt(0) ?? 0).toString(16)}}`)).join("");
const occurrences = (text: string, part: string): number => (part.length === 0 ? 0 : text.split(part).length - 1);

const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "adoption-time falsifiers",
    pins: [
      { id: "A1", quote: "adoption-time" },
      { id: "A2", quote: "falsifiers" },
    ],
  },
  {
    id: "B",
    label: "that freshness-without-coverage never reads complete",
    pins: [
      { id: "B1", quote: "that freshness-without-coverage" },
      { id: "B2", quote: "never reads complete" },
    ],
  },
  {
    id: "C",
    label: "and stale-generation seals are refused for current tasks",
    pins: [
      { id: "C1", quote: "and stale-generation seals are refused" },
      { id: "C2", quote: "for current tasks" },
    ],
  },
];

// ------------------------------------------------------------------------------------------------------------- the bead row
interface BeadRow { readonly title: string; readonly notes: string }
function beadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (value === null || typeof value !== "object" || !("id" in value) || value.id !== BEAD) continue;
    const title = "title" in value && typeof value.title === "string" ? value.title : "";
    const notes = "notes" in value && typeof value.notes === "string" ? value.notes : "";
    return { title, notes };
  }
  throw new Error(`the bead export holds no ${BEAD} row`);
}
/** The first span after `label` in the notes, up to the first full stop followed by white space or the end. */
function spanOf(notes: string, label: string): string {
  const at = notes.indexOf(label);
  if (at < 0) return "";
  const rest = notes.slice(at + label.length);
  const end = /\.(?:\s|$)/u.exec(rest);
  return end === null ? "" : rest.slice(0, end.index);
}
const ROW = beadRow();
const ACCEPTANCE = spanOf(ROW.notes, "Acceptance: ");
const CARRIER = spanOf(ROW.notes, "Carrier fields: ").split(", ");
const CITATIONS = spanOf(ROW.notes, "Citations: ");
const PRECEDENT = spanOf(ROW.notes, "House precedent to reuse, not re-derive: ");
const TITLE = /^\[(?<requirement>[A-Z0-9-]+)\] If Pi ever consumes a (?<record>\w+) \(gated RL-RQ(?<first>\d+)\.\.RL-RQ(?<last>\d+); '(?<amendment>[^']+)' amendment\), (?<duties>.+)\.$/u.exec(ROW.title)?.groups ?? {};
const RECORD = TITLE.record ?? "";
const GATES = Array.from({ length: Math.max(0, Number(TITLE.last ?? 0) - Number(TITLE.first ?? 1) + 1) }, (_, index) => `RL-RQ${Number(TITLE.first ?? 1) + index}`);
/** The title's duty clauses: the first up to its semicolon, then the comma-separated rest, a leading "and " dropped. */
const DUTIES = (TITLE.duties ?? "").split("; ").flatMap((part, index) => (index === 0 ? [part] : part.split(", ").map(clause => clause.replace(/^and /u, ""))));
const COUNT = /carries all (\w+) typed fields/u.exec(TITLE.duties ?? "")?.[1] ?? "";
const NUMBER_WORDS: Readonly<Record<string, number>> = { six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
/** The citation: the charter path and every `:<line>@<revision>` pin it carries. */
const CITED = {
  path: /^(\S+?\.md):/u.exec(CITATIONS)?.[1] ?? "",
  pins: [...CITATIONS.matchAll(/:(\d+)@([0-9a-f]{12})/gu)].map(match => ({ line: match[1] ?? "", revision: match[2] ?? "" })),
};
/** The acceptance items of a charter line: each `RL-RQ<n> <words>` up to the next item or the line's closing full stop. */
function charterItems(line: string): Record<string, string> {
  const items: Record<string, string> = {};
  for (const match of line.matchAll(/(RL-RQ\d+) (.+?)(?=; RL-RQ\d+ |\.$)/gu)) items[match[1] ?? ""] = match[2] ?? "";
  return items;
}

// ------------------------------------------------------------------------------------------------------- the trigger judge
const TERMS: readonly string[] = [
  "CoverageWitness", "CoveragePopulation", "CoverageIssuer", "CoverageInvalidation", "CoverageJudgement", "judge_coverage",
  "CoverageLedger", "CoverageVerdict", "ManifestDeclaration", "SealWithdrawal", "sealed_snapshot",
];
const folded = (text: string): string => text.toLowerCase().replace(/[_-]/gu, "");
const FOLDED_TERMS = TERMS.map(folded);
/** The hits of one text: each run of letters, digits, '_' and '-' (after NFKC) whose folded form contains a folded term. */
function termHits(text: string): string[] {
  const runs = text.normalize("NFKC").match(/[\p{L}\p{N}_-]+/gu) ?? [];
  return runs.filter(run => FOLDED_TERMS.some(term => folded(run).includes(term)));
}
const ROOTS: readonly string[] = ["src", "qa", "examples"];
const PACKAGE = "package.json";
const FLOORS: Readonly<Record<string, number>> = { src: 100, qa: 55, examples: 5 };
/** The Lenses SDK's name as the package rule reads it: reactivelenses, reactive-lenses or reactive_lenses, in any case. */
const LENSES_NAME = /reactive[-_]?lenses/iu;
const judgedPath = (path: string): boolean => path === PACKAGE || ROOTS.some(root => path.startsWith(`${root}/`));
interface TextFile { readonly path: string; readonly text: string }
/** package.json's keys and string values, at any depth, that name the Lenses SDK: `<key path>` for a key, `<key path>=<value>` for a value. */
function packageHits(text: string): string[] {
  const hits: string[] = [];
  const visit = (value: unknown, path: string): void => {
    if (typeof value === "string") {
      if (LENSES_NAME.test(value)) hits.push(`${path}=${value}`);
    } else if (Array.isArray(value)) {
      for (const [index, item] of value.entries()) visit(item, `${path}[${index}]`);
    } else if (value !== null && typeof value === "object") {
      for (const [key, inner] of Object.entries(value)) {
        const at = path === "" ? key : `${path}.${key}`;
        if (LENSES_NAME.test(key)) hits.push(at);
        visit(inner, at);
      }
    }
  };
  visit(JSON.parse(text), "");
  return hits;
}
/** The judged files among `files` (in order) and their hits, as `<path> <run>` or `<path> <key path>[=<value>]`. */
function judgeFiles(files: readonly TextFile[]): { judged: string[]; hits: string[] } {
  const judged: string[] = [];
  const hits: string[] = [];
  for (const file of files) {
    if (!judgedPath(file.path)) continue;
    judged.push(file.path);
    for (const run of termHits(file.text)) hits.push(`${file.path} ${run}`);
    if (file.path === PACKAGE) for (const name of packageHits(file.text)) hits.push(`${file.path} ${name}`);
  }
  return { judged, hits };
}
/** The judged files among `files` that hold at least one hit. */
const hitFiles = (files: readonly TextFile[]): string[] => files.filter(file => judgeFiles([file]).hits.length > 0).map(file => file.path);
/** What git would commit below the roots, and the root package.json: tracked or untracked, never ignored. */
function listedPaths(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...ROOTS, PACKAGE], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  return [...new Set(out.split("\0").filter(path => path.length > 0))].sort(byName);
}
interface Walk { readonly files: readonly TextFile[]; readonly links: readonly string[]; readonly notUtf8: readonly string[]; readonly missing: readonly string[] }
function readListed(paths: readonly string[]): Walk {
  const files: TextFile[] = [];
  const links: string[] = [];
  const notUtf8: string[] = [];
  const missing: string[] = [];
  const decoder = new TextDecoder("utf-8", { fatal: true });
  for (const path of paths) {
    let stat: ReturnType<typeof lstatSync>;
    try {
      stat = lstatSync(join(REPO, path));
    } catch {
      missing.push(path);
      continue;
    }
    if (stat.isSymbolicLink()) links.push(path);
    else if (!stat.isFile()) missing.push(path);
    else {
      try {
        files.push({ path, text: decoder.decode(readFileSync(join(REPO, path))) });
      } catch {
        notUtf8.push(path);
      }
    }
  }
  return { files, links, notUtf8, missing };
}
const cp = (...points: number[]): string => String.fromCodePoint(...points);
/** A1's planted texts: claims the judge must read, Pi's own coverage words (NON_CLAIMS) and each residual's quiet rows and twins. */
const PLANTED_TEXTS: Readonly<Record<string, string>> = {
  title: "CoverageWitness",
  snake: "coverage_witness",
  kebab: "coverage-witness",
  upper: "COVERAGE_WITNESS",
  camel: "coverageWitness",
  embedded: "isCoverageWitness",
  judge: "judge_coverage(witness, generation)",
  seal: "witness.sealed_snapshot",
  ledger: "new CoverageLedger()",
  composedTwin: 'const name = "CoverageWitness";',
  fullwidth: cp(0xff23, 0xff4f, 0xff56, 0xff45, 0xff52, 0xff41, 0xff47, 0xff45, 0xff37, 0xff49, 0xff54, 0xff4e, 0xff45, 0xff53, 0xff53),
  composed: 'const name = "Coverage" + "Witness";',
  spaced: "reads the coverage witness",
  dotted: "coverage.witness",
  spacedSeal: "sealed snapshot",
  escaped: 'const name = "Coverage\\u0057itness";',
  cyrillic: `${cp(0x421)}overageWitness`,
  zeroWidth: `Coverage${cp(0x200b)}Witness`,
  softHyphen: `Cover${cp(0xad)}ageWitness`,
  otherName: "type PopulationSeal = { sealed: boolean };",
  otherCertificate: "const enumerationCertificate = read();",
  hxCoverage: "coverage_summary: { licenses_absence: false }",
  rfRowKey: "freshness_witness",
  piCompleteness: "completeness: 'complete'",
};
/** A1's planted package.json texts, read by the package rule: each way a manifest names the SDK, and R-UNNAMED-SPEC's quiet row. */
const PACKAGE_PLANTS: Readonly<Record<string, string>> = {
  packageName: JSON.stringify({ name: "plant", dependencies: { "vibranium-reactive-lenses": "0.1.1" } }),
  packageScoped: JSON.stringify({ name: "plant", devDependencies: { "@scope/reactive_lenses": "1.0.0" } }),
  packageAlias: JSON.stringify({ name: "plant", dependencies: { rl: "npm:vibranium-reactive-lenses@0.1.1" } }),
  packageGit: JSON.stringify({ name: "plant", dependencies: { rl: "github:example/ReactiveLensesSDK#v0.1.1" } }),
  packageOverride: JSON.stringify({ name: "plant", overrides: { "some-tool": { "reactive-lenses": "1.0.0" } } }),
  packageScript: JSON.stringify({ name: "plant", scripts: { probe: "python -m reactive_lenses" } }),
  packageTarball: JSON.stringify({ name: "plant", dependencies: { rl: "https://example.invalid/rl-0.1.1.tgz" } }),
};
const PLANT_TEXT = "export type Plant = CoverageWitness;\n";
/** A1's planted files: the src twin of R-OUTSIDE-ROOTS and its quiet rows (the same text where the walk does not judge). */
const PLANTED_FILES: Readonly<Record<string, TextFile>> = {
  srcPlant: { path: "src/workbench/coverage-witness-plant.ts", text: PLANT_TEXT },
  docsPlant: { path: "docs/coverage-witness-plant.md", text: PLANT_TEXT },
  testPlant: { path: "test/coverage-witness-plant.test.ts", text: PLANT_TEXT },
  rootPlant: { path: "coverage-witness-plant.ts", text: PLANT_TEXT },
};
const BIG_PLANT = "qa/coverage-witness-plant-big.mjs";
const OWED =
  "OWED: a judged Pi product file names the CoverageWitness vocabulary (or package.json names the Lenses SDK in a key or string value) - the adopting cut registers its adapter in adoption() (imported statically from the src module the trigger hits) and in the roster's adoption block, so A2 runs the battery against it and refuses the adoption when a falsifier fires, and re-measures A1's and A2's witnesses";
/** The message of A1's roster compare: its witness reads the walk, the package rule, the planted inputs and the rf leg. */
const A1_DIFFERS = `A1's witness differs from its roster witness (a judged file, the package rule, a planted input or an rf reading changed); when a trigger hit is the cause, ${OWED}`;

// ---------------------------------------------------------------------------------------------------------- the rf reader
const RF_ROOT = "/workspace/km7q4-rf";
const RF_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: RF_ROOT, principal: "local-operator:tester" },
  seam: "rf-cli",
  capturedAt: "2026-10-28T00:00:00Z",
  observedAt: "2026-10-28T00:00:01Z",
};
const RF_ROW: Json = { status: "observed", freshness: "captured_at_render", replayed: false };
const RF_REUSED: Json = { status: "observed", freshness: "reused", replayed: true };
const rfTopology = (envelope: JsonObject): ReturnType<typeof reactivefiberTopology> =>
  reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: RF_ROOT, source: envelope }, RF_CONTEXT);
/** The full-shape render with its observation rows replaced by `rows` and its result edited. */
function rfRender(edit: (result: JsonObject) => JsonObject, rows: readonly Json[] = [RF_ROW]): JsonObject {
  const envelope = fullShapeRf(RF_ROOT);
  return { ...envelope, result: edit({ ...objectOf(envelope.result, "fullShapeRf result"), observations: [...rows] }) };
}
interface RfVariant { readonly rows: readonly Json[]; readonly edit: (result: JsonObject) => JsonObject }
/** Every render this census feeds the rf reader: B2's six (one fresh observed row) and C2's four, the clean render shared. */
const RF_VARIANTS: Readonly<Record<string, RfVariant>> = {
  clean: { rows: [RF_ROW], edit: result => result },
  undiagnosed: { rows: [RF_ROW], edit: result => without(result, "blocks", "necessity") },
  blocksOnly: { rows: [RF_ROW], edit: result => without(result, "necessity") },
  necessityOnly: { rows: [RF_ROW], edit: result => without(result, "blocks") },
  noBlock: { rows: [RF_ROW], edit: result => ({ ...result, blocks: [], necessity: [] }) },
  withheld: { rows: [RF_ROW], edit: result => ({ ...result, necessity: [rfFixtureDecision(), rfFixtureDecision(false, "fixture.component:main::extra")] }) },
  reused: { rows: [RF_REUSED], edit: result => result },
  committedRender: { rows: [RF_ROW], edit: result => ({ ...result, render_id: "rnd_aaaaaaaaaaaaaaaaaaaaaa" }) },
  committedSeq: { rows: [RF_ROW], edit: result => ({ ...result, commit_seq: 1 }) },
};
const B2_RF: readonly string[] = ["clean", "undiagnosed", "blocksOnly", "necessityOnly", "noBlock", "withheld"];
const C2_RF: readonly string[] = ["clean", "reused", "committedRender", "committedSeq"];
const variantRender = (name: string): JsonObject => {
  const variant = RF_VARIANTS[name];
  if (variant === undefined) throw new Error(`no rf variant ${name}`);
  return rfRender(variant.edit, variant.rows);
};
/** The render's inputs as the witness carries them. */
function renderShape(envelope: JsonObject): string {
  const result = objectOf(envelope.result, "render result");
  const length = (key: string): string => {
    const value = result[key];
    return Array.isArray(value) ? String(value.length) : "absent";
  };
  const rows = Array.isArray(result.observations) ? result.observations.map(row => (isObject(row) ? String(row.freshness) : "?")).join(",") : "absent";
  const withheld = Array.isArray(result.necessity) ? result.necessity.filter(item => isObject(item) && item.include === false).length : 0;
  return `rows=[${rows}] blocks=${length("blocks")} necessity=${length("necessity")} withheld=${withheld} render_id=${JSON.stringify(result.render_id ?? null)} commit_seq=${JSON.stringify(result.commit_seq ?? null)}`;
}
/** What the rf reader makes of one render: coverage, tone and its inclusion and observations notes, or the refusal. */
function rfReading(envelope: JsonObject): string {
  try {
    const topology = rfTopology(envelope);
    const snapshot = topology.snapshots[0];
    const notes = topology.diagnostics.filter(note => /^(?:inclusion|observations)/u.test(note));
    return `${snapshot?.coverage ?? "none"} ${snapshot?.node.statusTone ?? "none"}${notes.map(note => ` | ${note}`).join("")}`;
  } catch (error) {
    return `refused ${error instanceof CapabilityError ? error.category : "error"}: ${error instanceof Error ? error.message : String(error)}`;
  }
}
/** A reader of one render as A1's rf leg compares it: its projection's JSON text, or its refusal. */
type RfReader = (envelope: JsonObject) => string;
const RF_REAL: RfReader = envelope => {
  try {
    return JSON.stringify(rfTopology(envelope));
  } catch (error) {
    return `refused ${error instanceof Error ? error.message : String(error)}`;
  }
};
/** The render with the witness keys riding it: A2's sealed and freshness payloads on every row, the sealed one on the result. */
function withWitnessKeys(envelope: JsonObject): JsonObject {
  const result = objectOf(envelope.result, "render result");
  const rows = Array.isArray(result.observations) ? result.observations : [];
  const carried = rows.map(row => ({ ...objectOf(row, "row"), coverage_witness: PAYLOADS.sealed ?? null, freshness_witness: PAYLOADS.freshness ?? null }));
  return { ...envelope, result: { ...result, observations: carried, coverage_witness: PAYLOADS.sealed ?? null } };
}
/** The variants whose reading under `reader` changes when the witness keys ride the render. */
function witnessKeyReads(reader: RfReader): string[] {
  return Object.keys(RF_VARIANTS).filter(name => {
    const envelope = variantRender(name);
    return reader(envelope) !== reader(withWitnessKeys(envelope));
  });
}
const rowsOf = (envelope: JsonObject): readonly Json[] => {
  const result = objectOf(envelope.result, "render result");
  return Array.isArray(result.observations) ? result.observations : [];
};
const carriesFreshness = (row: Json): boolean => isObject(row) && row.freshness_witness !== undefined;
/** The render with the witness keys taken off again: every row's coverage_witness and freshness_witness, the result's coverage_witness. */
function withoutWitnessKeys(envelope: JsonObject): JsonObject {
  const result = objectOf(envelope.result, "render result");
  return { ...envelope, result: { ...without(result, "coverage_witness"), observations: rowsOf(envelope).map(row => without(objectOf(row, "row"), "coverage_witness", "freshness_witness")) } };
}
/** A1's stand-in rf readers (R-UNFED-RENDER): complete when a row carries freshness_witness - on a render of two or more rows only
 * (no variant has two), or on any render (the twin) - and otherwise the real reader on the render with the witness keys taken off,
 * so a stand-in reads loud or quiet by its own rule, never by the real reader's. */
const RF_READERS: Readonly<Record<string, RfReader>> = {
  rfTwoRowReader: envelope => (rowsOf(envelope).length >= 2 && rowsOf(envelope).some(carriesFreshness) ? "complete" : RF_REAL(withoutWitnessKeys(envelope))),
  rfAnyRowReader: envelope => (rowsOf(envelope).some(carriesFreshness) ? "complete" : RF_REAL(withoutWitnessKeys(envelope))),
};
/** A1's rf leg: each variant's reading and whether the witness keys change it; a read key (the clean render reused) must. */
function rfWitnessLeg(): Json {
  const read = witnessKeyReads(RF_REAL);
  if (read.length > 0) throw new Error(`the rf preview reader reads a witness key: the witness keys change the projection of ${read.join(", ")}`);
  const variants = Object.fromEntries(Object.keys(RF_VARIANTS).map(name => [name, `${rfReading(variantRender(name))}; witness keys identical`]));
  const readKey = RF_REAL(variantRender("clean")) === RF_REAL(variantRender("reused")) ? "identical" : "differing";
  return { variants, readKey };
}

// --------------------------------------------------------------------------------------------------------- the HX reader
const HX_ROOT = "/workspace/km7q4-hx";
/** The runtime identity of the measured live read test/workbench-hyperunix-observer.test.ts carries (hx 0.1.0, 2026-10-15). */
const HX_BINARY = "3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d";
const HX_CONTEXT: HyperUnixTopologyContext = {
  scope: { workspace: HX_ROOT, principal: "local-operator:tester" },
  target: { kind: "hx.fs/regular-file", root: "src" },
  capturedAt: "2026-10-28T00:00:00Z",
  observedAt: "2026-10-28T00:00:01Z",
};
/** The HX answers the HX reader has read, `<kind> licensed=<boolean>` (the records case holds the precedent's pair). */
const HX_READ = new Set<string>();
/** One hyperunix.find provider reading in the measured shape (test/workbench-native-ecosystem.test.ts), read by the HX reader. */
function hxReading(kind: string, licensed: boolean, rows: readonly Json[]): string {
  const reading: JsonValue = {
    contract: "hyperunix.find/v1",
    source: { representation: "hyperunix.result/1", execution_status: { kind }, coverage_summary: { licenses_absence: licensed }, rows: [...rows], rows_retained: true, operation: "find" },
    workspaceRoot: HX_ROOT,
    runtime: { version: "0.1.0", binarySha256: HX_BINARY },
  };
  HX_READ.add(`${kind} licensed=${licensed}`);
  try {
    const snapshot = hyperunixTopology(reading, HX_CONTEXT).snapshots[0];
    return `${snapshot?.coverage ?? "none"} ${snapshot?.node.statusTone ?? "none"} | ${snapshot?.node.statusText ?? ""}`;
  } catch (error) {
    return `refused ${error instanceof CapabilityError ? error.category : "error"}: ${error instanceof Error ? error.message : String(error)}`;
  }
}

// -------------------------------------------------------------------------------------------------------- the projection
const P_ROOT = "/workspace/km7q4-projection";
const P_SCOPE: ObservationScope = { workspace: P_ROOT, principal: "local-operator:tester" };
const P_REF: NativeRef = { provider: "coverage-census", type: "collection", id: "beads:issues", scope: P_ROOT };
const PRESENTATION: Presentation = { title: "beads:issues open", type: "sdk-operation", statusText: "read", statusTone: "success" };
const [T1, T2, T3] = ["2026-10-28T00:00:01Z", "2026-10-28T00:00:02Z", "2026-10-28T00:00:03Z"];
type Step =
  | { readonly kind: "refresh"; readonly at: string; readonly coverage?: "complete" | "partial"; readonly sequence?: number; readonly version?: string }
  | { readonly kind: "event"; readonly id: string; readonly sequence: number; readonly version?: string }
  | { readonly kind: "markStale" };
function stepText(step: Step): string {
  if (step.kind === "markStale") return "markStale";
  const version = step.version === undefined ? "" : ` version=${step.version}`;
  if (step.kind === "event") return `event ${step.id} seq=${step.sequence}${version}`;
  return `refresh at=${step.at.slice(17, 19)}s${step.sequence === undefined ? "" : ` seq=${step.sequence}`}${version}${step.coverage === undefined ? "" : ` coverage=${step.coverage}`}`;
}
/** One journey on a fresh projection: after each step, `<result>: <freshness>/<completeness>` of the one node. */
function journey(steps: readonly Step[]): string[] {
  const projection = new ObservationProjection();
  const readings: string[] = [];
  for (const step of steps) {
    let result: string;
    if (step.kind === "refresh") {
      const snapshot: NativeSnapshot = {
        source: P_REF, scope: P_SCOPE, capturedAt: step.at, observedAt: step.at, node: PRESENTATION,
        ...(step.coverage === undefined ? {} : { coverage: step.coverage }),
        ...(step.sequence === undefined ? {} : { sequence: step.sequence }),
        ...(step.version === undefined ? {} : { sourceVersion: step.version }),
      };
      result = projection.refresh(snapshot);
    } else if (step.kind === "event") {
      const event: ObservationEvent = {
        projectionEventId: step.id, source: P_REF, scope: P_SCOPE, observedAt: T3, kind: "native.event", sourceSequence: step.sequence,
        ...(step.version === undefined ? {} : { sourceVersion: step.version }),
      };
      result = projection.ingest(event);
    } else {
      projection.markStale({ scope: P_SCOPE, ref: P_REF });
      result = "marked";
    }
    const node = projection.query({ scope: P_SCOPE, limit: 1, ref: P_REF }).nodes[0];
    readings.push(`${result}: ${node?.freshness ?? "none"}/${node?.completeness ?? "none"}`);
  }
  return readings;
}
const journeyWitness = (journeys: Readonly<Record<string, readonly Step[]>>): Json =>
  Object.fromEntries(Object.entries(journeys).map(([name, steps]) => [name, { steps: steps.map(stepText), readings: journey(steps) }]));
const B1_JOURNEYS: Readonly<Record<string, readonly Step[]>> = {
  freshOnly: [{ kind: "refresh", at: T1 }],
  partial: [{ kind: "refresh", at: T1, coverage: "partial" }],
  stated: [{ kind: "refresh", at: T1, coverage: "complete" }],
  fresherRead: [{ kind: "refresh", at: T1, coverage: "complete" }, { kind: "refresh", at: T2 }],
  eventsOnly: [{ kind: "event", id: "e1", sequence: 1 }, { kind: "event", id: "e2", sequence: 2 }],
  failedRead: [{ kind: "refresh", at: T1, coverage: "complete" }, { kind: "markStale" }],
};
const C1_JOURNEYS: Readonly<Record<string, readonly Step[]>> = {
  olderCapture: [{ kind: "refresh", at: T2 }, { kind: "refresh", at: T1, coverage: "complete" }],
  lowerSequence: [{ kind: "refresh", at: T2, sequence: 3 }, { kind: "refresh", at: T3, sequence: 2, coverage: "complete" }],
  unsequenced: [{ kind: "refresh", at: T2, sequence: 3 }, { kind: "refresh", at: T3, coverage: "complete" }],
  laterSeal: [{ kind: "refresh", at: T2, sequence: 3 }, { kind: "refresh", at: T3, sequence: 4, coverage: "complete" }],
  eventKeepsSeal: [{ kind: "refresh", at: T1, sequence: 1, version: "v1", coverage: "complete" }, { kind: "event", id: "e2", sequence: 2, version: "v2" }],
  refreshDropsSeal: [{ kind: "refresh", at: T1, sequence: 1, version: "v1", coverage: "complete" }, { kind: "refresh", at: T2, sequence: 2, version: "v2" }],
};

// ----------------------------------------------------------------------------------------------------------- the battery
type Coverage = "complete" | "partial" | "unknown";
interface Adapter {
  readonly fields: readonly string[];
  read(payload: JsonValue, task: { readonly generation: string }): Coverage;
}
/** The producer's COVERAGE_WITNESS_FIELDS, in order (measured at the pin; the roster's producer block). */
const FIELDS: readonly string[] = ["collection", "scope", "generation", "population", "sealed_snapshot", "issuer", "policy_scope", "invalidation"];
/** The producer's FRESHNESS_WITNESS_FIELDS, in order (measured at the pin). */
const FRESHNESS_FIELDS: readonly string[] = ["source", "binding_revision", "readset", "observed_at", "witness_kind", "witness_value", "policy_scope", "valid_until"];
/** The bead's carrier phrases (outside anchor) onto the producer's fields, one to one and in order. */
const CARRIER_MAP: readonly (readonly [string, string])[] = [
  ["collection identity", "collection"],
  ["scope", "scope"],
  ["generation", "generation"],
  ["population manifest/expected range", "population"],
  ["sealed snapshot", "sealed_snapshot"],
  ["issuer/evidence", "issuer"],
  ["policy scope", "policy_scope"],
  ["invalidation conditions", "invalidation"],
];
const GENERATION = "g2";
const hex = (fill: string): string => `sha256:${fill.repeat(64)}`;
const SEALED: JsonObject = {
  collection: "beads:issues",
  scope: "open",
  generation: GENERATION,
  population: { manifest_digest: hex("a"), expected_count: 20, expected_range: null, observed_count: 20 },
  sealed_snapshot: hex("b"),
  issuer: { name: "beads", evidence_ref: null },
  policy_scope: "task",
  invalidation: { valid_until: null, on_source_revision_change: true, on_manifest_change: true },
};
const PAYLOADS: Readonly<Record<string, JsonObject>> = {
  sealed: SEALED,
  partial: { ...SEALED, population: { manifest_digest: hex("a"), expected_count: 20, expected_range: null, observed_count: 4 } },
  oldGeneration: { ...SEALED, generation: "g1" },
  noRecords: { ...SEALED, population: { manifest_digest: null, expected_count: 0, expected_range: null, observed_count: 0 } },
  freshness: {
    source: "beads:issues@g2", binding_revision: "b1", readset: [["key:issues.open", hex("c")]], observed_at: "2026-10-28T00:00:00.000Z",
    witness_kind: "revision_match", witness_value: GENERATION, policy_scope: "task", valid_until: null,
  },
};
/** The producer's judgement of each payload at the task's generation (measured at cut #1; the roster's producer block). */
const VERDICTS: Readonly<Record<string, string>> = {
  sealed: "sealed manifest_complete",
  partial: "no_seal population_incomplete",
  oldGeneration: "refused_generation generation_mismatch",
  noRecords: "no_seal no_records",
  freshness: "refused witness",
};
const BATTERY: readonly Falsifier[] = [
  { id: "L-SEALED", basis: "RL-RQ1", payload: "sealed", rule: "complete" },
  { id: "F-PARTIAL", basis: "RL-RQ2", payload: "partial", rule: "never-complete" },
  { id: "F-FIELDS", basis: "the adapter carries all eight typed fields (collection identity through invalidation conditions)", payload: null, rule: "fields" },
  { id: "F-FRESHNESS", basis: "a freshness witness never proves enumeration coverage", payload: "freshness", rule: "never-complete" },
  { id: "F-GENERATION", basis: "an old-generation seal is stale for today's task", payload: "oldGeneration", rule: "never-complete" },
  { id: "F-NO-RECORDS", basis: "source-only 'no records observed' never certifies absence", payload: "noRecords", rule: "never-complete" },
];
/** The title's gates the battery does not hold, each with why (the judged set partitions the gate list into these and the battery's). */
const UNBATTERIED: Readonly<Record<string, string>> = {
  "RL-RQ3": "not in the battery: F-GENERATION's old generation of the same collection is the title's duty, not this wrong-source case",
  "RL-RQ4": "not in the battery: no payload states valid_until (the residual R-EXPIRY)",
  "RL-RQ5": "not in the battery: no payload states a missing source",
  "RL-RQ6": "not in the battery: codec fixtures are no payload reading",
  "RL-RQ7": "not in the battery: source IO is no payload reading",
  "RL-RQ8": "not in the battery: installed-wheel evidence is no payload reading",
};
interface BatteryRun { readonly readings: Readonly<Record<string, string>>; readonly fired: readonly string[] }
/** Every falsifier against one adapter: its reading of each payload (a fresh copy, at the task's generation) and the ids that fired. */
function runBattery(adapter: Adapter): BatteryRun {
  const readings: Record<string, string> = {};
  const fired: string[] = [];
  for (const entry of BATTERY) {
    if (entry.rule === "fields") {
      const held = JSON.stringify([...adapter.fields]) === JSON.stringify(FIELDS);
      readings[entry.id] = held ? "fields held" : `fields ${adapter.fields.join(",")}`;
      if (!held) fired.push(entry.id);
      continue;
    }
    const payload = PAYLOADS[entry.payload ?? ""];
    const reading = payload === undefined ? "no payload" : adapter.read(structuredClone(payload), { generation: GENERATION });
    readings[entry.id] = reading;
    if (entry.rule === "complete" ? reading !== "complete" : reading === "complete") fired.push(entry.id);
  }
  return { readings, fired };
}
const canonical = (payload: JsonValue, generation: string): string => JSON.stringify([payload, generation]);
/** ORACLE's table: each payload at the task's generation onto complete for a sealed verdict, unknown for every other answer. */
const ORACLE_TABLE: Readonly<Record<string, Coverage>> = Object.fromEntries(
  Object.entries(PAYLOADS).map(([name, payload]): [string, Coverage] => [canonical(payload, GENERATION), (VERDICTS[name] ?? "").startsWith("sealed ") ? "complete" : "unknown"]),
);
const ORACLE: Adapter = { fields: FIELDS, read: (payload, task) => ORACLE_TABLE[canonical(payload, task.generation)] ?? "unknown" };
const recordOf = (value: JsonValue | undefined): { readonly [key: string]: JsonValue } | undefined => (value !== null && typeof value === "object" && !Array.isArray(value) ? value : undefined);
const populationOf = (payload: JsonValue): { readonly [key: string]: JsonValue } | undefined => recordOf(recordOf(payload)?.population);
/** ORACLE with one wrong rule each: every falsifier's mutant, and each A2 residual's quiet row and twin. */
const MUTANTS: Readonly<Record<string, Adapter>> = {
  "M-FRESHNESS": { fields: FIELDS, read: (payload, task) => (recordOf(payload)?.witness_kind !== undefined ? "complete" : ORACLE.read(payload, task)) },
  "M-PARTIAL": {
    fields: FIELDS,
    read: (payload, task) => {
      const witness = recordOf(payload);
      const sealedSnapshot = typeof witness?.sealed_snapshot === "string" && typeof populationOf(payload)?.manifest_digest === "string";
      return sealedSnapshot && witness?.generation === task.generation ? "complete" : ORACLE.read(payload, task);
    },
  },
  "M-GENERATION": {
    fields: FIELDS,
    read: (payload, task) => {
      const population = populationOf(payload);
      const sealed = typeof population?.manifest_digest === "string" && population.observed_count === population.expected_count && typeof recordOf(payload)?.sealed_snapshot === "string";
      return sealed ? "complete" : ORACLE.read(payload, task);
    },
  },
  "M-NO-RECORDS": { fields: FIELDS, read: (payload, task) => (populationOf(payload)?.observed_count === 0 ? "complete" : ORACLE.read(payload, task)) },
  "M-FIELDS": { fields: FIELDS.filter(field => field !== "invalidation"), read: (payload, task) => ORACLE.read(payload, task) },
  "M-CONSTANT": { fields: FIELDS, read: () => "unknown" },
  "M-CAMEL": { fields: FIELDS, read: (payload, task) => (recordOf(payload)?.sealedSnapshot !== undefined ? "complete" : ORACLE.read(payload, task)) },
  "M-SNAKE": { fields: FIELDS, read: (payload, task) => (recordOf(payload)?.sealed_snapshot !== undefined ? "complete" : ORACLE.read(payload, task)) },
  "M-EXPIRY": { fields: FIELDS, read: (payload, task) => (typeof recordOf(recordOf(payload)?.invalidation)?.valid_until === "string" ? "complete" : ORACLE.read(payload, task)) },
  "M-NO-EXPIRY": { fields: FIELDS, read: (payload, task) => (recordOf(recordOf(payload)?.invalidation)?.valid_until === null ? "complete" : ORACLE.read(payload, task)) },
};

// ----------------------------------------------------------------------------------------------------- the adoption judge
/** A registered Pi adapter: the module it lives in (relative to the repository root) and the adapter, imported statically. */
interface Adoption { readonly module: string; readonly adapter: Adapter }
/** The registered Pi adapter: the cut that adopts a CoverageWitness imports its adapter statically and returns it here. */
function adoption(): Adoption | null {
  return null;
}
/** adoption() as the roster and the witnesses carry it: its module path. */
function adoptionJson(): JsonValue {
  const registered = adoption();
  return registered === null ? null : { module: registered.module };
}
/** One static value import of this file: its module (a repository path when the specifier is relative) and its local bindings. */
interface SelfImport { readonly module: string; readonly locals: readonly string[] }
interface SelfRead { readonly impl: Readonly<Record<string, readonly string[]>>; readonly imports: readonly SelfImport[]; readonly adoptionNames: readonly string[] }
/** The SELF-READ, parsed from this file's AST: each IMPL member's direct identifiers, every static import that binds a value, and
 * the identifiers adoption()'s body names. */
function selfRead(): SelfRead {
  const text = readFileSync(join(REPO, SELF), "utf8");
  const source = ts.createSourceFile(SELF, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const identifiersOf = (node: ts.Node, into: Set<string>): void => {
    if (ts.isIdentifier(node)) into.add(node.text);
    ts.forEachChild(node, inner => identifiersOf(inner, into));
  };
  const impl: Record<string, string[]> = {};
  const imports: SelfImport[] = [];
  const adoptionNames = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.importClause?.isTypeOnly === true) continue;
    const clause = statement.importClause;
    const locals: string[] = [];
    if (clause?.name !== undefined) locals.push(clause.name.text);
    const bindings = clause?.namedBindings;
    if (bindings !== undefined && ts.isNamespaceImport(bindings)) locals.push(bindings.name.text);
    if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) if (!element.isTypeOnly) locals.push(element.name.text);
    const specifier = statement.moduleSpecifier.text;
    const module = specifier.startsWith(".") ? posix.normalize(posix.join(posix.dirname(SELF), specifier)).replace(/\.js$/u, ".ts") : specifier;
    if (locals.length > 0) imports.push({ module, locals });
  }
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "IMPL" && node.initializer !== undefined && ts.isObjectLiteralExpression(node.initializer)) {
      for (const property of node.initializer.properties) {
        const name = property.name !== undefined && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) ? property.name.text : "?";
        const names = new Set<string>();
        identifiersOf(property, names);
        impl[name] = [...names].sort(byName);
      }
    }
    if (ts.isFunctionDeclaration(node) && node.name?.text === "adoption" && node.body !== undefined) identifiersOf(node.body, adoptionNames);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { impl, imports, adoptionNames: [...adoptionNames].sort(byName) };
}
/** Why a registration is refused, or null: its module must sit below src/, hold a trigger hit, be imported statically by this file
 * with a value binding, and adoption()'s body must name a binding that import introduces. */
function registrationRefusal(module: string, triggered: readonly string[], self: SelfRead): string | null {
  if (!module.startsWith("src/")) return "its module is not below src/";
  if (!triggered.includes(module)) return "the trigger reads no hit in its module";
  const locals = self.imports.filter(entry => entry.module === module).flatMap(entry => entry.locals);
  if (locals.length === 0) return "this file imports no value from its module statically";
  if (!locals.some(local => self.adoptionNames.includes(local))) return "adoption() names no binding its module's import introduces";
  return null;
}
/** The falsifiers the adoption judge has seen refuse an adapter (the records case holds that every falsifier did). */
const JUDGED = new Set<string>();
/** The adoption judge: the battery against one adapter; any falsifier that fires refuses the adoption. */
function judgeAdoption(adapter: Adapter): { readonly run: BatteryRun; readonly refused: boolean } {
  const run = runBattery(adapter);
  for (const id of run.fired) JUDGED.add(id);
  return { run, refused: run.fired.length > 0 };
}
/** A registered Pi adapter held at adoption: a refused registration or a refused adoption throws, whatever the roster holds. */
function holdAdoption(registered: Adoption, triggered: readonly string[], self: SelfRead): BatteryRun {
  const why = registrationRefusal(registered.module, triggered, self);
  if (why !== null) throw new Error(`REFUSED: the registration of ${registered.module}: ${why}`);
  const verdict = judgeAdoption(registered.adapter);
  if (verdict.refused) {
    const read = verdict.run.fired.map(id => `${id} read ${verdict.run.readings[id] ?? "?"}`).join("; ");
    throw new Error(`REFUSED: Pi's adapter ${registered.module} fires ${verdict.run.fired.join(", ")} (${read})`);
  }
  return verdict.run;
}

// ------------------------------------------------------------------------------------------------------- the residual table
/** A1's planted texts that read quiet and are no residual's: Pi's own coverage words, which hold no claim. */
const NON_CLAIMS: readonly string[] = ["hxCoverage", "rfRowKey", "piCompleteness"];
const RESIDUALS: readonly Residual[] = [
  { id: "R-COMPOSED", pin: "A1", quiet: ["composed"], twin: ["composedTwin"] },
  { id: "R-SPACED", pin: "A1", quiet: ["spaced", "dotted", "spacedSeal"], twin: ["snake"] },
  { id: "R-ESCAPED", pin: "A1", quiet: ["escaped"], twin: ["title"] },
  { id: "R-LOOKALIKE", pin: "A1", quiet: ["cyrillic", "zeroWidth", "softHyphen"], twin: ["fullwidth"] },
  { id: "R-OTHER-NAME", pin: "A1", quiet: ["otherName", "otherCertificate"], twin: ["embedded"] },
  { id: "R-OUTSIDE-ROOTS", pin: "A1", quiet: ["docsPlant", "testPlant", "rootPlant"], twin: ["srcPlant"] },
  { id: "R-UNNAMED-SPEC", pin: "A1", quiet: ["packageTarball"], twin: ["packageAlias"] },
  { id: "R-UNFED-RENDER", pin: "A1", quiet: ["rfTwoRowReader"], twin: ["rfAnyRowReader"] },
  { id: "R-OTHER-SHAPE", pin: "A2", quiet: ["M-CAMEL"], twin: ["M-SNAKE"] },
  { id: "R-EXPIRY", pin: "A2", quiet: ["M-EXPIRY"], twin: ["M-NO-EXPIRY"] },
  { id: "R-EVENT-KEEPS-SEAL", pin: "C1", quiet: ["eventKeepsSeal"], twin: ["refreshDropsSeal"] },
];
const residualsOf = (pin: string): readonly Residual[] => RESIDUALS.filter(residual => residual.pin === pin);
/** An A1 planted input's hit count: a text through the judge, a package text through the package rule, a file through the walk's
 * judge (unjudged paths read 0). */
function plantedHits(id: string): number | undefined {
  const text = PLANTED_TEXTS[id];
  if (text !== undefined) return termHits(text).length;
  const manifest = PACKAGE_PLANTS[id];
  if (manifest !== undefined) return packageHits(manifest).length;
  const file = PLANTED_FILES[id];
  return file === undefined ? undefined : judgeFiles([file]).hits.length;
}
/** Whether an A1 planted input reads loud: a stand-in rf reader when the witness keys change a variant's reading under it, every
 * other input when it hits. */
function a1Loud(id: string): boolean {
  const reader = RF_READERS[id];
  return reader === undefined ? (plantedHits(id) ?? 0) > 0 : witnessKeyReads(reader).length > 0;
}
/** Each residual of `pin`: its quiet rows must read quiet and its twins loud, by the pin's own reading. */
function holdResiduals(pin: string, loud: (id: string) => boolean): void {
  for (const residual of residualsOf(pin)) {
    const quietLoud = residual.quiet.filter(loud);
    const twinsQuiet = residual.twin.filter(id => !loud(id));
    if (quietLoud.length > 0 || twinsQuiet.length > 0) throw new Error(`${residual.id}: quiet rows read loud (${quietLoud.join(", ")}) or twins read quiet (${twinsQuiet.join(", ")})`);
  }
}
/** The roster's constants block, from this file's literals. */
const rosterConstants = (): JsonValue => ({
  terms: [...TERMS],
  carrier: CARRIER_MAP.map(pair => [...pair]),
  gates: GATES,
  unbatteried: { ...UNBATTERIED },
  generation: GENERATION,
  payloads: Object.fromEntries(Object.entries(PAYLOADS).map(([name, payload]) => [name, digestOf(payload)])),
  verdicts: { ...VERDICTS },
  battery: BATTERY.map(entry => ({ ...entry })),
});

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    holdResiduals("A1", a1Loud);
    const paths = listedPaths();
    const walk = readListed(paths);
    const count = (root: string): number => paths.filter(path => path.startsWith(`${root}/`)).length;
    const real = judgeFiles(walk.files);
    if (real.hits.length > 0 && adoption() === null) throw new Error(`${OWED}. Hits: ${real.hits.join("; ")}`);
    const longest = Math.max(0, ...walk.files.map(file => file.text.length));
    const big: TextFile = { path: BIG_PLANT, text: `${"/".repeat(2)} ${"x".repeat(longest)}\nexport const plant = "judge_coverage";\n` };
    const src = PLANTED_FILES.srcPlant ?? { path: "", text: "" };
    const planted = judgeFiles([...walk.files, src, big]);
    const realPackage = walk.files.find(file => file.path === PACKAGE)?.text ?? "{}";
    return {
      walk: {
        floorsMet: ROOTS.every(root => count(root) >= (FLOORS[root] ?? Number.POSITIVE_INFINITY)),
        packageListed: paths.includes(PACKAGE),
        links: [...walk.links], notUtf8: [...walk.notUtf8], missing: [...walk.missing],
        hits: real.hits,
        judgedEqualsListedPlusPlants: JSON.stringify(planted.judged) === JSON.stringify([...real.judged, src.path, big.path]),
        bigPlantLongest: big.text.length > longest,
        plantHits: planted.hits.slice(real.hits.length),
      },
      judge: {
        terms: Object.fromEntries(TERMS.map(term => [term, termHits(term).length])),
        texts: Object.fromEntries(Object.entries(PLANTED_TEXTS).map(([id, text]) => [id, `hits=${termHits(text).length} ${shown(text)}`])),
        packages: Object.fromEntries(Object.entries(PACKAGE_PLANTS).map(([id, text]) => [id, packageHits(text)])),
        files: Object.fromEntries(Object.entries(PLANTED_FILES).map(([id, file]) => [id, `judged=${judgedPath(file.path)} hits=${judgeFiles([file]).hits.length} ${file.path}`])),
        rfReaders: Object.fromEntries(Object.entries(RF_READERS).map(([id, reader]) => [id, witnessKeyReads(reader)])),
      },
      package: { real: packageHits(realPackage) },
      rf: rfWitnessLeg(),
      adoption: adoptionJson(),
    };
  },
  A2: async () => {
    const runs: Record<string, BatteryRun> = { ORACLE: runBattery(ORACLE) };
    for (const [id, adapter] of Object.entries(MUTANTS)) runs[id] = runBattery(adapter);
    holdResiduals("A2", id => (runs[id]?.fired.length ?? 0) > 0);
    // The adoption judge, live today: ORACLE is accepted, and every adapter is refused exactly when its battery fires.
    const candidates: readonly (readonly [string, Adapter])[] = [["ORACLE", ORACLE], ...Object.entries(MUTANTS)];
    const judge = Object.fromEntries(candidates.map(([id, adapter]) => {
      const verdict = judgeAdoption(adapter);
      return [id, verdict.refused ? `refused ${verdict.run.fired.join(",")}` : "accepted"];
    }));
    const misjudged = candidates.filter(([id]) => (judge[id] === "accepted") !== ((runs[id]?.fired.length ?? 1) === 0)).map(([id]) => id);
    if (judge.ORACLE !== "accepted" || misjudged.length > 0) throw new Error(`the adoption judge misreads ${["ORACLE", ...misjudged].join(", ")}`);
    // The registration check, live today on probes: each refusal branch refuses and a complete registration is accepted.
    const self = selfRead();
    const observation = "src/workbench/observation.ts";
    const srcPlant = PLANTED_FILES.srcPlant?.path ?? "";
    const probe = (module: string, triggered: readonly string[], names: readonly string[]): string => registrationRefusal(module, triggered, { ...self, adoptionNames: names }) ?? "accepted";
    const registration = {
      outsideSrc: probe(BIG_PLANT, [BIG_PLANT], ["ObservationProjection"]),
      noHit: probe(observation, [], ["ObservationProjection"]),
      notImported: probe(srcPlant, [srcPlant], ["ObservationProjection"]),
      unnamed: probe(observation, [observation], []),
      complete: probe(observation, [observation], ["ObservationProjection"]),
    };
    const wrongProbes = Object.entries(registration).filter(([name, outcome]) => (name === "complete") !== (outcome === "accepted")).map(([name]) => name);
    if (wrongProbes.length > 0) throw new Error(`the registration check misreads ${wrongProbes.join(", ")}`);
    const registered = adoption();
    const adopted = registered === null ? null : holdAdoption(registered, hitFiles(readListed(listedPaths()).files), self);
    return {
      battery: BATTERY.map(entry => ({ ...entry })),
      payloads: Object.fromEntries(Object.entries(PAYLOADS).map(([name, payload]) => [name, `${digestOf(payload)} ${Object.keys(payload).join(",")}`])),
      verdicts: { ...VERDICTS },
      runs: Object.fromEntries(Object.entries(runs).map(([id, run]) => [id, { fired: [...run.fired], readings: { ...run.readings } }])),
      judge,
      registration,
      adoption: adoptionJson(),
      adopted: adopted === null ? null : { fired: [...adopted.fired], readings: { ...adopted.readings } },
    };
  },
  B1: async () => journeyWitness(B1_JOURNEYS),
  B2: async () => {
    const hx: Readonly<Record<string, readonly [string, boolean, readonly Json[]]>> = {
      licensedEmpty: ["complete-empty", true, []],
      unlicensedEmpty: ["complete", false, []],
      unlicensedCompleteEmpty: ["complete-empty", false, []],
      unlicensedRows: ["complete", false, [{ path: "src/a.ts" }, { path: "src/b.ts" }]],
    };
    return {
      rf: Object.fromEntries(B2_RF.map(name => {
        const envelope = variantRender(name);
        return [name, `${renderShape(envelope)}: ${rfReading(envelope)}`];
      })),
      hx: Object.fromEntries(Object.entries(hx).map(([name, [kind, licensed, rows]]) => [name, `${kind} licensed=${licensed} rows=${rows.length}: ${hxReading(kind, licensed, rows)}`])),
      precedent: PRECEDENT,
    };
  },
  C1: async () => {
    holdResiduals("C1", id => {
      const readings = journey(C1_JOURNEYS[id] ?? []);
      return !(readings.at(-1) ?? "").endsWith("/complete");
    });
    return journeyWitness(C1_JOURNEYS);
  },
  C2: async () =>
    Object.fromEntries(C2_RF.map(name => {
      const envelope = variantRender(name);
      return [name, `${renderShape(envelope)}: ${rfReading(envelope)}`];
    })),
};

const REACHED = new Map<string, string>();

describe("wb-km7q.4 CoverageWitness adoption census (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R12)", () => {
  it("judged set: frozen shape, roster, and the owner filing's acceptance, title duties, gates, carrier fields, citation and precedent", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2", "C:2"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id, quote }) => ({ id, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    // Outside anchor, the acceptance: the labels joined are its words, each row's quotes joined are its label, each quote sits in it once.
    expect(ACCEPTANCE.length).toBeGreaterThan(0);
    expect(ROWS.map(row => row.label).join(" ")).toBe(ACCEPTANCE);
    expect(ROWS.map(row => row.pins.map(pin => pin.quote).join(" "))).toEqual(ROWS.map(row => row.label));
    expect(ROWS.flatMap(row => row.pins.filter(pin => occurrences(ACCEPTANCE, pin.quote) !== 1).map(pin => pin.id))).toEqual([]);
    // Outside anchor, the title: the record, the gate list, the duty clauses and the field count.
    expect(RECORD).toBe(TERMS[0]);
    expect(DUTIES).toHaveLength(4);
    expect(BATTERY.filter(entry => !GATES.includes(entry.basis)).map(entry => entry.basis)).toEqual(DUTIES);
    expect(NUMBER_WORDS[COUNT]).toBe(FIELDS.length);
    // Outside anchor, the gates: the title's list is the charter :41 line's items, partitioned exactly into the battery's gate
    // falsifiers and UNBATTERIED, and each gate falsifier's payload carries the counts its item names.
    const charter = ROSTER.producer.charter;
    const items = charterItems(charter.lines["41"]?.text ?? "");
    expect(Object.keys(items)).toEqual(GATES);
    const batteryGates = BATTERY.filter(entry => GATES.includes(entry.basis)).map(entry => entry.basis);
    expect([...batteryGates, ...Object.keys(UNBATTERIED)].sort(byName)).toEqual([...GATES].sort(byName));
    expect(batteryGates.filter(gate => gate in UNBATTERIED)).toEqual([]);
    expect(BATTERY.filter(entry => GATES.includes(entry.basis)).map(entry => `${entry.id}:${entry.basis}`)).toEqual(["L-SEALED:RL-RQ1", "F-PARTIAL:RL-RQ2"]);
    const counts = (gate: string): string => {
      const population = populationOf(PAYLOADS[BATTERY.find(entry => entry.basis === gate)?.payload ?? ""] ?? null);
      return `${String(population?.observed_count)}/${String(population?.expected_count)}`;
    };
    const sealedCount = /^complete (\d+)-result manifest seal$/u.exec(items["RL-RQ1"] ?? "")?.[1] ?? "";
    const partialCounts = /^partial (\d+\/\d+) -> no seal$/u.exec(items["RL-RQ2"] ?? "")?.[1] ?? "";
    expect([counts("RL-RQ1"), counts("RL-RQ2")]).toEqual([`${sealedCount}/${sealedCount}`, partialCounts]);
    // Outside anchor, the carrier fields: the bead's eight phrases onto the producer's fields, one to one and in order.
    expect(CARRIER_MAP.map(([phrase]) => phrase)).toEqual(CARRIER);
    expect(CARRIER_MAP.map(([, field]) => field)).toEqual(FIELDS);
    expect(NUMBER_WORDS[COUNT]).toBe(CARRIER.length);
    // The payloads speak the producer's rosters: coverage payloads carry exactly FIELDS, the freshness payload FRESHNESS_FIELDS.
    expect(Object.entries(PAYLOADS).map(([name, payload]) => `${name}:${JSON.stringify(Object.keys(payload)) === JSON.stringify(name === "freshness" ? FRESHNESS_FIELDS : FIELDS)}`)).toEqual([
      "sealed:true", "partial:true", "oldGeneration:true", "noRecords:true", "freshness:true",
    ]);
    // Every rule agrees with its payload's measured verdict: complete exactly for a sealed one.
    expect(BATTERY.filter(entry => entry.payload !== null && (entry.rule === "complete") !== (VERDICTS[entry.payload] ?? "").startsWith("sealed ")).map(entry => entry.id)).toEqual([]);
    expect(Object.keys(VERDICTS)).toEqual(Object.keys(PAYLOADS));
    // Outside anchor, the citation: the charter path, its revision and its lines are the roster's.
    expect(CITED.path).toBe(charter.path);
    expect(CITED.pins.map(pin => pin.revision)).toEqual(CITED.pins.map(() => charter.revision.slice(0, 12)));
    expect(CITED.pins.map(pin => pin.line).sort(byName)).toEqual(Object.keys(charter.lines).sort(byName));
    expect([charter.status, ...Object.values(charter.lines)].filter(line => sha256(line.text) !== line.sha256)).toEqual([]);
    expect(charter.lines["37"]?.text ?? "").toContain(`**${RECORD} adapter**: ${CARRIER.slice(0, -1).join(", ")} and ${CARRIER.at(-1) ?? ""}.`);
    // Outside anchor, the house precedent: it names wb-6ze.7 and docs/workbench/07; that page's HX section, bound under its title
    // heading, carries no HTML and renders the sentence holding the precedent's phrase exactly once in its prose.
    const phrase = /docs\/workbench\/07 HX (.+)$/u.exec(PRECEDENT)?.[1] ?? "";
    const section = docsSection(readFileSync(join(REPO, PRECEDENT_PAGE), "utf8"), PRECEDENT_SECTION, 2, [PRECEDENT_PARENT]);
    const prose = section.blocks.map(block => (block.kind === "paragraph" || block.kind === "other" ? block.text : block.kind === "list" ? block.items.map(item => item.text).join(" ") : "")).join("\n");
    expect({ names: PRECEDENT.includes("wb-6ze.7"), phrase: occurrences(PRECEDENT_SENTENCE, phrase), ok: section.ok, why: section.why, hasHtml: section.hasHtml, sentence: occurrences(prose, PRECEDENT_SENTENCE) }).toEqual({
      names: true, phrase: 1, ok: true, why: "", hasHtml: false, sentence: 1,
    });
    // The roster holds this file's constants.
    expect(ROSTER.constants).toEqual(rosterConstants());
    expect(ROSTER.adoption).toEqual(adoptionJson());
    // The residual table: held to the roster, each quiet row and twin a planted input of its pin.
    expect(RESIDUALS.map(residual => residual.id)).toEqual([
      "R-COMPOSED", "R-SPACED", "R-ESCAPED", "R-LOOKALIKE", "R-OTHER-NAME", "R-OUTSIDE-ROOTS", "R-UNNAMED-SPEC", "R-UNFED-RENDER", "R-OTHER-SHAPE", "R-EXPIRY", "R-EVENT-KEEPS-SEAL",
    ]);
    expect(ROSTER.residuals).toEqual(RESIDUALS);
    const plantedOf: Readonly<Record<string, readonly string[]>> = {
      A1: [...Object.keys(PLANTED_TEXTS), ...Object.keys(PACKAGE_PLANTS), ...Object.keys(PLANTED_FILES), ...Object.keys(RF_READERS)],
      A2: Object.keys(MUTANTS),
      C1: Object.keys(C1_JOURNEYS),
    };
    expect(RESIDUALS.flatMap(residual => [...residual.quiet, ...residual.twin].filter(id => !(plantedOf[residual.pin] ?? []).includes(id)).map(id => `${residual.id}:${id}`))).toEqual([]);
    // Every A1 planted input that reads quiet is a named non-claim or one residual's quiet row, never both; every mutant that
    // fires nothing is one A2 residual's quiet row: a residual dropped from the table leaves its quiet row unaccounted for.
    const quietOf = (pin: string): string[] => residualsOf(pin).flatMap(residual => residual.quiet);
    expect(plantedOf.A1?.filter(id => !a1Loud(id)).sort(byName)).toEqual([...NON_CLAIMS, ...quietOf("A1")].sort(byName));
    expect(NON_CLAIMS.filter(id => quietOf("A1").includes(id))).toEqual([]);
    expect(Object.keys(MUTANTS).filter(id => runBattery(MUTANTS[id] ?? ORACLE).fired.length === 0)).toEqual(quietOf("A2"));
    // SELF-READ: no pin body names the roster, and the roster cannot be rewritten in memory.
    const identifiers = selfRead().impl;
    expect(Object.keys(identifiers).sort(byName)).toEqual(Object.keys(IMPL).sort(byName));
    expect(Object.entries(identifiers).filter(([, names]) => names.includes("ROSTER")).map(([id]) => id)).toEqual([]);
    expect([Object.isFrozen(ROSTER), Object.isFrozen(ROSTER.rows), ROSTER.rows.every(row => row.pins.every(pin => Object.isFrozen(pin)))]).toEqual([true, true, true]);
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          if (pin.id === "A1") expect(witness, A1_DIFFERS).toEqual(held?.witness);
          else expect(witness).toEqual(held?.witness);
          REACHED.set(pin.id, digestOf(witness));
        });
      }
    });
  }
  it("records: every registered pin ran to its compare and digests as its roster witness, every falsifier refused an adapter in the adoption judge, and the HX reader read the precedent's pair", () => {
    // A second compare, independent of the pin cases': a pin case whose own compare is removed still reds here.
    const held = ROSTER.rows.flatMap(row => row.pins.map(pin => [pin.id, digestOf(pin.witness)] as const)).sort(([a], [b]) => byName(a, b));
    expect([...REACHED].sort(([a], [b]) => byName(a, b))).toEqual(held);
    // The battery ran through the adoption judge: each falsifier (a title duty or a battery gate) refused at least one adapter.
    expect([...JUDGED].sort(byName)).toEqual(BATTERY.map(entry => entry.id).sort(byName));
    // The precedent (absence must be runtime-licensed) was read: a licensed and an unlicensed complete-empty HX answer.
    expect([PRECEDENT.includes("runtime-licensed"), HX_READ.has("complete-empty licensed=true"), HX_READ.has("complete-empty licensed=false")]).toEqual([true, true, true]);
  });
});
