/**
 * wb-km7q.4 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R12, program-triage-2026-10-18 child of wb-km7q), the
 * CoverageWitness adoption census. Statement (the bead's export title, read at run time): "If Pi ever consumes a
 * CoverageWitness (gated RL-RQ1..RL-RQ8; 'coverage is not freshness' amendment), the adapter carries all eight typed fields
 * (collection identity through invalidation conditions); a freshness witness never proves enumeration coverage, an
 * old-generation seal is stale for today's task, and source-only 'no records observed' never certifies absence." Acceptance
 * (the owner filing, verbatim, read from the tracked bead export): "adoption-time falsifiers that freshness-without-coverage
 * never reads complete and stale-generation seals are refused for current tasks". The filing cites the ReactiveLensesSDK
 * charter docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md (:35, :37 and :41 at d75fe44948cd); this
 * census echoes the producer's words and claims nothing of the producer.
 *
 * NO PI ADAPTER EXISTS: no judged Pi product file names a CoverageWitness today (A1), so the title's duties have no Pi subject
 * yet. The acceptance is met in the form it names: falsifiers that run now (against model adapters, A2, and against the Pi
 * readers a witness would land in, B and C) and that run against Pi's adapter the moment a cut registers one (adoption()).
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
 *     witness's seal field sealed_snapshot. package.json also hits on a name in any of its five dependency maps matching
 *     reactive[-_]?lenses. The walk records symlinks (never followed), files that are not UTF-8 and listed paths missing on disk
 *     (each list is empty today); each root has a floor (src 100, qa 55, examples 5); two planted files ride last (a short src
 *     plant and a qa plant longer than every judged file with its term on its last line), and the hits are exactly the plants'.
 *     The planted texts and files below read through the same judge, each with its hit count in the witness. The rf leg: the rf
 *     preview reader (reactivefiberTopology, which reads the reactivefiber.render.preview provider output) reads no witness: a
 *     stand-in render whose observation rows carry coverage_witness (A2's sealed payload) and freshness_witness (A2's freshness
 *     payload) and whose result carries coverage_witness projects to the same JSON text as the render without them, on a clean
 *     base (complete) and on an undiagnosed base (partial), while a read key (one row reused) changes the projection. A hit while
 *     adoption() is null reds A1 with OWED.
 *   A2 "falsifiers", the BATTERY over the producer's JSON forms. PAYLOADS are this file's values in the producer's rosters
 *     (COVERAGE_WITNESS_FIELDS and its nested rosters, FRESHNESS_WITNESS_FIELDS; key order included): sealed (collection
 *     beads:issues, scope open, generation g2, a manifest of 20 observing 20, a sealed snapshot), partial (observing 4),
 *     oldGeneration (generation g1), noRecords (no manifest, expected 0, observing 0, a sealed snapshot) and freshness (a
 *     FreshnessWitness of beads:issues at g2); the task's generation is g2. L-SEALED (RL-RQ1) needs sealed to read complete;
 *     F-PARTIAL (RL-RQ2) needs partial never to read complete; F-FIELDS needs the adapter's fields to equal
 *     COVERAGE_WITNESS_FIELDS in order; F-FRESHNESS, F-GENERATION and F-NO-RECORDS need freshness, oldGeneration and noRecords
 *     never to read complete. The producer's judgement of each payload is VERDICTS, measured at the cut by executing the
 *     installed reactive_lenses (its coverage_witness.py and freshness.py blobs equal the pin's): sealed is sealed
 *     (manifest_complete), partial is no_seal (population_incomplete), oldGeneration is refused_generation
 *     (generation_mismatch), noRecords is no_seal (no_records), and freshness is refused by CoverageWitness.from_json and by
 *     judge_coverage (naming witness); each rule agrees with its payload's verdict. ORACLE, the passing subject, carries those
 *     verdicts (complete for a sealed verdict, unknown otherwise) and judges nothing; each of the mutants M-FRESHNESS,
 *     M-PARTIAL, M-GENERATION, M-NO-RECORDS, M-FIELDS and M-CONSTANT fires exactly its own falsifier. The adoption leg:
 *     adoption() returns the adapter an adopting cut imports statically, with its module path (held to the roster's adoption
 *     block), and A2 runs the same battery against it; adoption() is null today, so no Pi adapter is run (A1's OWED forces the
 *     registration). No loader call with a computed specifier is used (the rc remote-component census pins those).
 * - B, "that freshness-without-coverage never reads complete".
 *   B1 "that freshness-without-coverage", on ObservationProjection (src/workbench/observation.ts), the projection a Pi reader's
 *     snapshot lands in: a current refresh stating no coverage reads unknown, a partial one partial, a complete one complete; a
 *     later current refresh stating no coverage after a complete one reads unknown; a node seen only through events reads
 *     unknown; a failed read (markStale) after a complete refresh reads stale and unknown.
 *   B2 "never reads complete", on two readers that state a coverage reading: the rf preview reader, every variant's one row
 *     fresh and observed, reads complete only with its inclusion records stated, a block included and none withheld (the
 *     records absent, empty, or one candidate withheld read partial); the HyperUnix reader (the filing's house precedent
 *     wb-6ze.7; docs/workbench/07 'known-empty vs incomplete/unknown') reads complete only on a runtime-licensed complete-empty
 *     answer here (a complete or complete-empty answer the runtime did not license, with zero rows or with rows, reads partial).
 * - C, "and stale-generation seals are refused for current tasks".
 *   C1 "and stale-generation seals are refused", on ObservationProjection: after a current read stating no coverage, a complete
 *     snapshot captured earlier, or at a lower sequence, or with no sequence after a sequenced one, is refused out-of-order and
 *     the node keeps reading unknown; a complete snapshot at a higher sequence and a later capture applies and reads complete.
 *   C2 "for current tasks", on the rf preview reader: a row replayed from an earlier render (freshness reused) holds the render
 *     at partial, and a committed render (render_id or commit_seq stated) is refused; the render with its row captured at
 *     render reads complete.
 *
 * OUTSIDE ANCHOR: the wb-km7q.4 row of the tracked bead export (.beads/issues.jsonl): its title (the record, the gate list, the
 * field count and the four duty clauses are parsed from it) and the first span after each of the notes labels "Citations: ",
 * "Carrier fields: ", "House precedent to reuse, not re-derive: " and "Acceptance: " (to a full stop before white space or the
 * end); appended notes and status writes do not move them. The labels joined are the acceptance, and each quote sits in it once
 * (so a row, a pin or a quote removed or shortened in every literal of this file and the roster together still reds); the four
 * duty clauses are the duties of the four duty falsifiers, in order; L-SEALED's and F-PARTIAL's gates are in the title's gate
 * list and named on the charter's :41 line; the carrier phrases map one to one, in order, onto COVERAGE_WITNESS_FIELDS (the
 * title's count, eight, included) and are the list the charter's :37 line spells; the citation names the roster's charter
 * path, revision and lines; the precedent names wb-6ze.7 and docs/workbench/07, and that page states its trailing phrase.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, TERMS, the carrier map, the gate list,
 * the payload digests, VERDICTS, the battery, the residual table, adoption() and every pin's witness are held to the
 * out-of-file roster (test/fixtures/rl-coverage-witness-roster.json). SELF-READ: no IMPL member names ROSTER (direct
 * identifiers only), and the roster is deep-frozen when loaded. RECORDS: the last case holds that every registered pin ran to
 * its compare and re-digests each witness against its roster witness.
 * RESIDUALS (named; each has pinned quiet rows and a live twin among the planted inputs of its pin, read in that pin's case):
 *   R-COMPOSED (A1) a term assembled at run time (quiet: "Coverage" + "Witness"; twin: the one literal).
 *   R-SPACED (A1) a term's words apart (quiet: "the coverage witness", coverage.witness, "sealed snapshot"; twin: coverage_witness).
 *   R-ESCAPED (A1) a term spelled through a source escape (quiet: CoverageWitness as written; twin: the title's word).
 *   R-LOOKALIKE (A1) a confusable letter, or an invisible inside a word, that NFKC does not fold (quiet: a Cyrillic C, a zero-width
 *     space, a soft hyphen; twin: fullwidth letters, which NFKC folds).
 *   R-OTHER-NAME (A1) a consumer under a name no term spells (quiet: PopulationSeal, enumerationCertificate; twin: isCoverageWitness).
 *   R-OUTSIDE-ROOTS (A1) a file below test/ or docs/ or another root file (quiet: such plants; twin: the same text below src/).
 *   R-OTHER-SHAPE (A2) a violation reached only through a payload shape the battery never feeds, such as a camelCase port
 *     (quiet: M-CAMEL, complete on a sealedSnapshot key; twin: M-SNAKE, complete on a sealed_snapshot key).
 *   R-EXPIRY (A2) an expired or clockless proof (RL-RQ4): no payload states valid_until (quiet: M-EXPIRY, complete on a stated
 *     valid_until; twin: M-NO-EXPIRY, complete on a null one).
 *   R-EVENT-KEEPS-SEAL (C1) an in-order event stating a new source version after a complete snapshot leaves the node complete
 *     and current: the projection withdraws no seal on a source revision change (charter:39 gives that to the producer's ledger)
 *     (quiet: that journey ends complete; twin: a refresh at the new version stating no coverage ends unknown).
 * NOT CLAIMED: Pi's other coverage readers (beads, claude, detached, forge, forge-operation, furnace) are not judged by B or C;
 * the filing's Authority sentence ("no second freshness implementation in QuerySDK and none in Pi") is not judged here (the rf
 * reader names rf's row key freshness_witness in one comment and never reads it, which A1's rf leg shows); of the gate list the
 * battery holds RL-RQ1 (L-SEALED) and RL-RQ2 (F-PARTIAL) only: F-GENERATION's old generation of the same collection is the
 * title's duty, not RL-RQ3's wrong-source case, and RL-RQ4 (R-EXPIRY) and RL-RQ5..RL-RQ8 are not in the battery; the payload
 * values are this file's own, not a producer fixture; VERDICTS are the producer's answers at the cut, seen again only when a
 * cut re-measures them.
 * LIMITS: a pin rewritten to return its roster witness through a helper is not detected by the SELF-READ; a residual removed
 * together with its planted inputs and their roster readings is not detected (residuals are this census's own reading); a TERM
 * other than the title's CoverageWitness removed from TERMS, its planted text, the roster and the witnesses together is not
 * detected (the producer's other names are measured into the roster, not read at run time); a pin's sub-case (a journey, a
 * render or HX variant, a planted text or file, a mutant) removed from this file and its roster witness together is not
 * detected, except a falsifier (its title duty or gate) and a carrier pair (the bead's carrier fields), which the export
 * anchors; ORACLE is a lookup and proves only that the battery can be passed; a filtered run (-t) reds the records case by
 * design.
 * MEASURED AT THE CUT (seat records, read-only; not assertions): trunk 1f8117a, 2026-10-28: 191 judged files (src 116, qa 67,
 * examples 7, package.json), 0 hits, 0 symlinks, 0 non-UTF-8. ReactiveLensesSDK: the pin d75fe44948cd (2026-10-18) and
 * origin/master 4efe999ceba2 (2026-10-24) hold the charter as one blob ed7137db247b (its :3 status 'proposed / doc-only'), and
 * src/reactive_lenses/coverage_witness.py (blob afde4a99409d, added at 28f172dc7715 before the pin) and freshness.py (blob
 * dd655682d361) are the same blobs at both; the installed rf environment (vibranium-reactive-lenses 0.1.1.20261024.1) carries
 * those two blobs, and executing it (python -I -B, no bytecode written) gave VERDICTS and the rosters in the roster's producer
 * block; RL's tests/test_coverage_witness.py and tests/test_coverage_ledger.py name RL-RQ1..RL-RQ5 and RL-RQ7, not RL-RQ6 or
 * RL-RQ8. ReactiveFiberCLI origin/main 48f020fe625f (2026-10-28T12:09:10Z): context.render.schema.json (blob 3282323161f4) has
 * no line matching coverage, witness or seal (case-insensitive).
 *
 * Display paths added: none. Test-only: the renders, HX readings, projections and adapters live in memory (no scratch); the
 * only spawn is git ls-files; src, qa, examples, package.json, docs/workbench/07 and the bead export are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { type HyperUnixTopologyContext, hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import { type NativeRef, type NativeSnapshot, type ObservationEvent, ObservationProjection, type ObservationScope, type Presentation } from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
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
  readonly constants: {
    readonly terms: readonly string[];
    readonly carrier: readonly (readonly string[])[];
    readonly gates: readonly string[];
    readonly generation: string;
    readonly payloads: Readonly<Record<string, string>>;
    readonly verdicts: Readonly<Record<string, string>>;
    readonly battery: readonly Falsifier[];
  };
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
const DEPENDENCY_MAPS: readonly string[] = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies", "bundleDependencies"];
const judgedPath = (path: string): boolean => path === PACKAGE || ROOTS.some(root => path.startsWith(`${root}/`));
interface TextFile { readonly path: string; readonly text: string }
/** package.json's dependency names that name the Lenses SDK, as `<map>:<name>`. */
function packageHits(text: string): string[] {
  const value: unknown = JSON.parse(text);
  if (value === null || typeof value !== "object") return [];
  const hits: string[] = [];
  for (const map of DEPENDENCY_MAPS) {
    const entry: unknown = map in value ? (value as Record<string, unknown>)[map] : undefined;
    const names = Array.isArray(entry) ? entry.filter((name): name is string => typeof name === "string") : entry !== null && typeof entry === "object" ? Object.keys(entry) : [];
    for (const name of names) if (/reactive[-_]?lenses/iu.test(name)) hits.push(`${map}:${name}`);
  }
  return hits;
}
/** The judged files among `files` (in order) and their hits, as `<path> <run>` or `<path> <map>:<name>`. */
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
const PLANT_TEXT = "export type Plant = CoverageWitness;\n";
/** A1's planted files: the src twin of R-OUTSIDE-ROOTS and its quiet rows (the same text where the walk does not judge). */
const PLANTED_FILES: Readonly<Record<string, TextFile>> = {
  srcPlant: { path: "src/workbench/coverage-witness-plant.ts", text: PLANT_TEXT },
  docsPlant: { path: "docs/coverage-witness-plant.md", text: PLANT_TEXT },
  testPlant: { path: "test/coverage-witness-plant.test.ts", text: PLANT_TEXT },
  rootPlant: { path: "coverage-witness-plant.ts", text: PLANT_TEXT },
};
const BIG_PLANT = "qa/coverage-witness-plant-big.mjs";
const PACKAGE_PLANT = JSON.stringify({ name: "plant", dependencies: { "vibranium-reactive-lenses": "0.1.1" }, devDependencies: { "@scope/reactive_lenses": "1.0.0" } });
const OWED =
  "OWED: a judged Pi product file names the CoverageWitness vocabulary (or package.json depends on the Lenses SDK) - the adopting cut registers its adapter in adoption() and the roster's adoption block, so A2 runs the battery against it, and re-measures A1's and A2's witnesses";

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
/** A1's rf leg: witness keys on every row and on the result change nothing; a read key (one row reused) does. */
function rfWitnessLeg(): Json {
  const out: JsonObject = {};
  const bases: Readonly<Record<string, (result: JsonObject) => JsonObject>> = { clean: result => result, undiagnosed: result => without(result, "blocks", "necessity") };
  for (const [name, edit] of Object.entries(bases)) {
    const plain = rfRender(edit);
    const result = objectOf(plain.result, "render result");
    const rows = Array.isArray(result.observations) ? result.observations : [];
    const carried: JsonObject = {
      ...plain,
      result: { ...result, observations: rows.map(row => ({ ...objectOf(row, "row"), coverage_witness: PAYLOADS.sealed ?? null, freshness_witness: PAYLOADS.freshness ?? null })), coverage_witness: PAYLOADS.sealed ?? null },
    };
    const read = rfRender(edit, [RF_REUSED]);
    const [base, withWitness, readKey] = [rfTopology(plain), rfTopology(carried), rfTopology(read)];
    out[name] = `${base.snapshots[0]?.coverage ?? "none"}; witness keys ${JSON.stringify(base) === JSON.stringify(withWitness) ? "identical" : "differing"}; a read key ${JSON.stringify(base) === JSON.stringify(readKey) ? "identical" : "differing"}`;
  }
  return out;
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
/** One hyperunix.find provider reading in the measured shape (test/workbench-native-ecosystem.test.ts), read by the HX reader. */
function hxReading(kind: string, licensed: boolean, rows: readonly Json[]): string {
  const reading: JsonValue = {
    contract: "hyperunix.find/v1",
    source: { representation: "hyperunix.result/1", execution_status: { kind }, coverage_summary: { licenses_absence: licensed }, rows: [...rows], rows_retained: true, operation: "find" },
    workspaceRoot: HX_ROOT,
    runtime: { version: "0.1.0", binarySha256: HX_BINARY },
  };
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
/** The producer's judgement of each payload at the task's generation (measured at the cut; the roster's producer block). */
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
  { id: "R-OTHER-SHAPE", pin: "A2", quiet: ["M-CAMEL"], twin: ["M-SNAKE"] },
  { id: "R-EXPIRY", pin: "A2", quiet: ["M-EXPIRY"], twin: ["M-NO-EXPIRY"] },
  { id: "R-EVENT-KEEPS-SEAL", pin: "C1", quiet: ["eventKeepsSeal"], twin: ["refreshDropsSeal"] },
];
const residualsOf = (pin: string): readonly Residual[] => RESIDUALS.filter(residual => residual.pin === pin);
/** An A1 planted input's hit count: a text through the judge, a file through the walk's judge (unjudged paths read 0). */
function plantedHits(id: string): number | undefined {
  const text = PLANTED_TEXTS[id];
  if (text !== undefined) return termHits(text).length;
  const file = PLANTED_FILES[id];
  return file === undefined ? undefined : judgeFiles([file]).hits.length;
}
/** Each residual of `pin`: its quiet rows must read quiet and its twins loud, by the pin's own reading. */
function holdResiduals(pin: string, loud: (id: string) => boolean): void {
  for (const residual of residualsOf(pin)) {
    const quietLoud = residual.quiet.filter(loud);
    const twinsQuiet = residual.twin.filter(id => !loud(id));
    if (quietLoud.length > 0 || twinsQuiet.length > 0) throw new Error(`${residual.id}: quiet rows read loud (${quietLoud.join(", ")}) or twins read quiet (${twinsQuiet.join(", ")})`);
  }
}

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    holdResiduals("A1", id => (plantedHits(id) ?? 0) > 0);
    const paths = listedPaths();
    const walk = readListed(paths);
    const count = (root: string): number => paths.filter(path => path.startsWith(`${root}/`)).length;
    const real = judgeFiles(walk.files);
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
        files: Object.fromEntries(Object.entries(PLANTED_FILES).map(([id, file]) => [id, `judged=${judgedPath(file.path)} hits=${judgeFiles([file]).hits.length} ${file.path}`])),
      },
      package: { real: packageHits(realPackage), planted: packageHits(PACKAGE_PLANT) },
      rf: rfWitnessLeg(),
      adoption: adoptionJson(),
    };
  },
  A2: async () => {
    const runs: Record<string, BatteryRun> = { ORACLE: runBattery(ORACLE) };
    for (const [id, adapter] of Object.entries(MUTANTS)) runs[id] = runBattery(adapter);
    holdResiduals("A2", id => (runs[id]?.fired.length ?? 0) > 0);
    const registered = adoption();
    const adopted = registered === null ? null : runBattery(registered.adapter);
    return {
      battery: BATTERY.map(entry => ({ ...entry })),
      payloads: Object.fromEntries(Object.entries(PAYLOADS).map(([name, payload]) => [name, `${digestOf(payload)} ${Object.keys(payload).join(",")}`])),
      verdicts: { ...VERDICTS },
      runs: Object.fromEntries(Object.entries(runs).map(([id, run]) => [id, { fired: [...run.fired], readings: { ...run.readings } }])),
      adoption: adoptionJson(),
      adopted: adopted === null ? null : { fired: [...adopted.fired], readings: { ...adopted.readings } },
    };
  },
  B1: async () => journeyWitness(B1_JOURNEYS),
  B2: async () => {
    const rf: Readonly<Record<string, (result: JsonObject) => JsonObject>> = {
      clean: result => result,
      undiagnosed: result => without(result, "blocks", "necessity"),
      noBlock: result => ({ ...result, blocks: [], necessity: [] }),
      withheld: result => ({ ...result, necessity: [rfFixtureDecision(), rfFixtureDecision(false, "fixture.component:main::extra")] }),
    };
    const hx: Readonly<Record<string, readonly [string, boolean, readonly Json[]]>> = {
      licensedEmpty: ["complete-empty", true, []],
      unlicensedEmpty: ["complete", false, []],
      unlicensedCompleteEmpty: ["complete-empty", false, []],
      unlicensedRows: ["complete", false, [{ path: "src/a.ts" }, { path: "src/b.ts" }]],
    };
    return {
      rf: Object.fromEntries(Object.entries(rf).map(([name, edit]) => {
        const envelope = rfRender(edit);
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
  C2: async () => {
    const variants: Readonly<Record<string, { readonly rows: readonly Json[]; readonly edit: (result: JsonObject) => JsonObject }>> = {
      current: { rows: [RF_ROW], edit: result => result },
      reused: { rows: [RF_REUSED], edit: result => result },
      committedRender: { rows: [RF_ROW], edit: result => ({ ...result, render_id: "rnd_aaaaaaaaaaaaaaaaaaaaaa" }) },
      committedSeq: { rows: [RF_ROW], edit: result => ({ ...result, commit_seq: 1 }) },
    };
    return Object.fromEntries(Object.entries(variants).map(([name, variant]) => {
      const envelope = rfRender(variant.edit, variant.rows);
      return [name, `${renderShape(envelope)}: ${rfReading(envelope)}`];
    }));
  },
};

/** The SELF-READ: each IMPL member's direct identifiers, parsed from this file. */
function implIdentifiers(): Record<string, string[]> {
  const text = readFileSync(join(REPO, SELF), "utf8");
  const source = ts.createSourceFile(SELF, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const found: Record<string, string[]> = {};
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "IMPL" && node.initializer !== undefined && ts.isObjectLiteralExpression(node.initializer)) {
      for (const property of node.initializer.properties) {
        const name = property.name !== undefined && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) ? property.name.text : "?";
        const names = new Set<string>();
        const collect = (inner: ts.Node): void => {
          if (ts.isIdentifier(inner)) names.add(inner.text);
          ts.forEachChild(inner, collect);
        };
        collect(property);
        found[name] = [...names].sort(byName);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
const REACHED = new Map<string, string>();

describe("wb-km7q.4 CoverageWitness adoption census (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R12)", () => {
  it("judged set: frozen shape, roster, and the owner filing's acceptance, title duties, carrier fields, citation and precedent", () => {
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
    expect(GATES).toEqual(ROSTER.constants.gates);
    expect(DUTIES).toHaveLength(4);
    expect(BATTERY.filter(entry => !GATES.includes(entry.basis)).map(entry => entry.basis)).toEqual(DUTIES);
    expect(BATTERY.filter(entry => GATES.includes(entry.basis)).map(entry => `${entry.id}:${entry.basis}`)).toEqual(["L-SEALED:RL-RQ1", "F-PARTIAL:RL-RQ2"]);
    expect(NUMBER_WORDS[COUNT]).toBe(FIELDS.length);
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
    const charter = ROSTER.producer.charter;
    expect(CITED.path).toBe(charter.path);
    expect(CITED.pins.map(pin => pin.revision)).toEqual(CITED.pins.map(() => charter.revision.slice(0, 12)));
    expect(CITED.pins.map(pin => pin.line).sort(byName)).toEqual(Object.keys(charter.lines).sort(byName));
    expect([charter.status, ...Object.values(charter.lines)].filter(line => sha256(line.text) !== line.sha256)).toEqual([]);
    expect(charter.lines["37"]?.text ?? "").toContain(`**${RECORD} adapter**: ${CARRIER.slice(0, -1).join(", ")} and ${CARRIER.at(-1) ?? ""}.`);
    expect(BATTERY.filter(entry => GATES.includes(entry.basis) && !(charter.lines["41"]?.text ?? "").includes(`${entry.basis} `)).map(entry => entry.id)).toEqual([]);
    // Outside anchor, the house precedent: it names wb-6ze.7 and docs/workbench/07, and that page states its trailing phrase.
    const phrase = /docs\/workbench\/07 HX (.+)$/u.exec(PRECEDENT)?.[1] ?? "";
    expect([PRECEDENT.includes("wb-6ze.7"), phrase.length > 0, readFileSync(join(REPO, PRECEDENT_PAGE), "utf8").includes(phrase)]).toEqual([true, true, true]);
    // The roster holds this file's constants.
    expect(ROSTER.constants).toEqual({
      terms: TERMS, carrier: CARRIER_MAP, gates: GATES, generation: GENERATION,
      payloads: Object.fromEntries(Object.entries(PAYLOADS).map(([name, payload]) => [name, digestOf(payload)])), verdicts: VERDICTS, battery: BATTERY,
    });
    expect(ROSTER.adoption).toEqual(adoptionJson());
    // The residual table: held to the roster, each quiet row and twin a planted input of its pin.
    expect(RESIDUALS.map(residual => residual.id)).toEqual(["R-COMPOSED", "R-SPACED", "R-ESCAPED", "R-LOOKALIKE", "R-OTHER-NAME", "R-OUTSIDE-ROOTS", "R-OTHER-SHAPE", "R-EXPIRY", "R-EVENT-KEEPS-SEAL"]);
    expect(ROSTER.residuals).toEqual(RESIDUALS);
    const plantedOf: Readonly<Record<string, readonly string[]>> = { A1: [...Object.keys(PLANTED_TEXTS), ...Object.keys(PLANTED_FILES)], A2: Object.keys(MUTANTS), C1: Object.keys(C1_JOURNEYS) };
    expect(RESIDUALS.flatMap(residual => [...residual.quiet, ...residual.twin].filter(id => !(plantedOf[residual.pin] ?? []).includes(id)).map(id => `${residual.id}:${id}`))).toEqual([]);
    // Every A1 planted input that reads quiet is a named non-claim or one residual's quiet row, never both; every mutant that
    // fires nothing is one A2 residual's quiet row: a residual dropped from the table leaves its quiet row unaccounted for.
    const quietOf = (pin: string): string[] => residualsOf(pin).flatMap(residual => residual.quiet);
    expect(plantedOf.A1?.filter(id => plantedHits(id) === 0).sort(byName)).toEqual([...NON_CLAIMS, ...quietOf("A1")].sort(byName));
    expect(NON_CLAIMS.filter(id => quietOf("A1").includes(id))).toEqual([]);
    expect(Object.keys(MUTANTS).filter(id => runBattery(MUTANTS[id] ?? ORACLE).fired.length === 0)).toEqual(quietOf("A2"));
    // SELF-READ: no pin body names the roster, and the roster cannot be rewritten in memory.
    const identifiers = implIdentifiers();
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
          if (pin.id === "A1") expect(witness, OWED).toEqual(held?.witness);
          else expect(witness).toEqual(held?.witness);
          REACHED.set(pin.id, digestOf(witness));
        });
      }
    });
  }
  it("records: every registered pin ran to its compare, and each witness it produced digests as its roster witness", () => {
    // A second compare, independent of the pin cases': a pin case whose own compare is removed still reds here.
    const held = ROSTER.rows.flatMap(row => row.pins.map(pin => [pin.id, digestOf(pin.witness)] as const)).sort(([a], [b]) => byName(a, b));
    expect([...REACHED].sort(([a], [b]) => byName(a, b))).toEqual(held);
  });
});
