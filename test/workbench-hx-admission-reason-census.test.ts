/**
 * wb-z3ft.3 (HX-CERTIFIED-STRUCTURAL-OPTIMIZATION-R3, program-triage-2026-10-22), the HX admission-reason census.
 * Statement (bead notes, full form): "If hx ships VC1 explain-only admission reason codes into a result or trace Pi consumes
 * (gated: CSO VC1, design-only), the HX adapter shall echo each rejected/accepted reason code and the checked profile/provider
 * facts verbatim as explain facets, shall not map a rejected-admission code to a query failure, absence or coverage change, shall
 * surface no provider evidence carried by a per-law trace, and - holding hx to its own 'no user-visible query semantic change' -
 * results lacking them project byte-identically." It rests on "**VC1 (immediate):** observation-profile vocabulary, explain-only
 * rejected/accepted admission reason codes and negative fixtures, without changing execution. Acceptance: every law proposal
 * explains exactly which profile and provider facts were checked; no user-visible query semantic change." (HyperUnix-CLI
 * docs/programs/certified-structural-optimization-2026-10-18/README.md:69@0091719d0288) and README.md:79 "Per-law tracing must
 * record reject reasons and assumptions without exposing sensitive provider evidence." Acceptance (owner filing, verbatim; the
 * labels of rows A to C quote it, each up to its trailing source citation): "(a) today: a test asserts those two files carry no
 * admission or reason-code field, kind and licence alone decide absence (observer.ts:217), diagnostics never surface (H5 :453);
 * (b) on landing: each admission reason code and the checked profile/provider facts project verbatim as explain facets; coverage,
 * statusTone, statusText and evidenceRefs unchanged; (c) on landing: a rejected-admission code never yields statusTone 'failure',
 * coverage 'complete' or 'known-empty', and a per-law trace fixture carrying a provider-evidence sentinel yields no output field
 * containing it."
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-23; the producer facts ride the roster with their blob ids): at the program pin
 * the program is design-only (README.md:3 "DESIGN ONLY. No runtime law admitted, ..."; :83 "All law admissions remain blocked."),
 * and the admission vocabulary lives only in HX's own planner (src/hx_planner/law_admission.mli: `type reason` at :113, `type
 * verdict = Admitted of witness | Withheld of reason` at :144), which no wire format Pi reads carries. The SDK at the pin is
 * @hyperunix/sdk 0.1.0, the version Pi vendors (vendor/hyperunix-sdk-0.1.0.tgz). Its dist/result.d.ts - the installed copy and
 * the committed tarball's, held byte-identical and each read here - spells no stem, and no member of its result declarations
 * names an admission or reason field. The other vendored declarations spell the stems only in other senses (Q3 pins the sites:
 * the provider metadata `admission` record, the mutation plan's authorization/admission records, the error, plan and schema
 * `reason` strings). src/workbench/hyperunix-observer.ts spells no stem; it decides absence from the execution kind and the
 * licence alone (`const absence = reads === 'complete' && licensed;`, observer.ts:217 at this census's base) and reads no
 * diagnostic, so a producer diagnostic never reaches an output field (H5, test/workbench-hyperunix-observer.test.ts:453). On the
 * provider's own path (resultFromJson, resultToJson, the registry's JSON) an unknown member survives inside the open containers
 * the SDK copies whole and is dropped from every record it rebuilds field by field (A4 measures which is which).
 *
 * THE VOCABULARY: STEMS are read case-insensitively inside any word or identifier. The filing measured /admission|reason_code|
 * law_admission/ case-sensitively; that grep cannot see the camel-case member a TypeScript declaration spells (reasonCode,
 * lawAdmission: the vendored result.d.ts spells every multi-word member that way), a constant-case or kebab spelling, clause (a)'s
 * own "reason-code", or the bare `reason` field the gating-artifact sentence quotes ("Law_admission 'reason' (01:10)"). The census
 * reads the filing's three alternatives plus that quoted field, so "reason" catches every reason-code spelling and "admission"
 * every admission one; all four measure 0 in both judged files, and A1 pins which controls the filing's grep, run as written,
 * misses.
 *
 * THE FIXTURES: every admission record, reason code, fact text, carrier key and trace is CONSTRUCTED (VC1 is unshipped and mints
 * no wire spelling). The codes borrow two of the planner's reason constructors at the pin (Coverage_below, Law_not_adopted) and its
 * Admitted verdict, in this census's kebab spelling. The armed fixtures carry the records in the SDK's lossless extension sidecar
 * under the census's own keys, a carrier B1 shows survives the provider path; every armed text is display-stable under the shared
 * sanitizer (sanitizeWorkbenchText, label layout), so verbatim and sanitized coincide on them.
 *
 * Pi reads no admission reason today. The census pins (a), and an ARMED half that binds the first reader to come to (b) and (c):
 *  A, (a). A1 the two files: the vendored result.d.ts - the installed copy and the committed tarball's, held byte-identical and
 *    each read - spells no stem (a hit there is the gating artifact arriving: re-measure), and no member of its result declarations
 *    names one; the reader adapter's stem count is 0, a judged src file spelling a stem exactly when its reader is bound in
 *    HX_ADMISSION_READERS (empty both ways today); the stem judge is read on flagged and quiet controls, and the filing's own grep
 *    (its pattern read from the bead row) still finds 0 in both files while missing the controls it cannot see. A2 kind and licence
 *    alone decide absence: over the 13 kinds and both licences the absence reading (coverage, statusTone, a known-empty answer, and
 *    the live invariant's absenceLicensed) is pinned, and it holds unchanged when any other primitive member of a full provider
 *    reading (every object node the SDK emits, counted from its JSON text) is perturbed, under the absence-suggesting temptations
 *    (licence words, certificates, truth, terminal and exit class, rows, admission records and diagnostics), and on the provider
 *    path. A3 diagnostics never surface, on the adapter: admission reason codes in the existing diagnostic grammar (and as the
 *    status's diagnostic code) leave the projection strictEqual and its diagnostics exactly the adapter's derived lines; an
 *    admission-shaped member planted at EVERY object node of a full provider reading (positions derived from the SDK's own
 *    representation) moves nothing and shows nothing; a planted operation text is the control that the leak detector sees a leak.
 *    A4 the same through the registered provider, planted at every object node of the SDK document plus the diagnostic grammar:
 *    which positions survive the decoder is measured, and the projection stays strictEqual with nothing shown.
 *  B, (b), armed on landing. B1 the fixture oracle: each armed fixture is the base plus exactly its carrier members (and the kind and
 *    licence its spec names), the carriers survive the provider path, today's adapter projects each fixture equal to its twin, and
 *    every text is sanitizer-stable. B2 the armed check (violationsOf) on synthetic readers: the honest reader (today's projection
 *    plus one sanitized facet per admission record) passes every fixture, each mutant fails at least one, and every check fires.
 *    The check reads every snapshot: the four (b) members pair by position, so a snapshot a reader adds or drops breaks them, and
 *    the whole projection (every snapshot, relation and diagnostic) is held to the twin's (projection, README:69's "no
 *    user-visible query semantic change"). A reader echoing each admission code into the diagnostics, noting the verdicts in the
 *    title, relating a law node or appending a second snapshot fails it (wb-hqls, the R694 follow-up of landing 333: F1, G14/G15).
 *    The check also reads each facet's own members: a facet holds exactly the five FACET_MEMBERS (law, verdict, code, profile,
 *    provider: the members of every admission record the roster holds), as a set in any order (a reordered facet is the quiet
 *    control), so a reader that adds a member to any facet, drops one or renames one fails facet-members. The added members
 *    pinned: a neutral display hint on every facet, clause (c)'s readings on each rejected facet (statusTone 'failure'; coverage
 *    'complete' with an answer 'known-empty') and complete coverage with a success tone on each accepted facet (wb-1vci, the R694
 *    follow-up of landing 428: F1, P1 facetTone and P2 facetCoverage).
 *  C, (c), armed on landing. C1 a rejected-admission code read as a query failure, as complete coverage or as a known-empty answer
 *    fails on every fixture that carries one, on today's snapshot or on a second one a reader appends (the forbidden readings are
 *    the words clause (c) quotes, held on every snapshot; a facet carries none as a member of its own, since facet-members holds
 *    every facet to its record's five members, B2). C2 the per-law trace: its provider-evidence sentinel reaches the
 *    adapter's input on the provider path and no output field of today's projection or of the honest reader, while a reader echoing
 *    the trace into a facet or a diagnostic fails on both traced fixtures. C3 every bound reader meets every check on every fixture
 *    (none bound today; the same loop over synthetic bindings is the non-vacuity control).
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and pins,
 * every pin's witness, the constants, the fixture specs, the checks, the readers, the residual families and every registered test
 * title - is held to the out-of-file roster (test/fixtures/hx-admission-reason-roster.json). OUTSIDE ANCHORS (their own registered
 * case): the bead's own row in the tracker export (.beads/issues.jsonl): each acceptance clause, up to its trailing citation, is
 * exactly one row's label; the judged files are the two the filing's grep sentence names; STEMS are that grep's alternatives plus
 * the field the gating-artifact sentence quotes; UNCHANGED_FIELDS are the members clause (b) lists; NEVER holds the words clause (c)
 * quotes. The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it) and the set
 * of pins that reached their witness.
 * NOT CLAIMED (edits of this file and the roster together below row level): a pin removed from ROWS, the literal, IMPL and the
 * roster (the bead text anchors rows, not pins); a check removed from CHECKS, the judge and the roster (the firing assertion binds
 * the listed checks only); a fixture, a reader, a control or a temptation removed while every remaining mutant still fails some
 * fixture; a pin's case replaced by one that echoes its roster witness; the outside-anchor case or the closing case removed with
 * its roster title.
 * RESIDUALS (named, each with its pinned quiet row): R-VOCABULARY an admission field under a generic name - among them the planner's
 * own verdict spellings Admitted and Withheld - spells no stem and is invisible to A1's trigger, while A3 still withholds its
 * content (Q1); R-COMPOSED a stem assembled at runtime from parts is invisible to any text scan (Q2); R-NAMESAKE the vendored
 * declarations outside the judged pair spell the stems in other senses and A1 does not read them (Q3); R-RAW-READING the
 * registered provider hands the surviving containers, the armed carriers among them, to its invoking caller verbatim - only the
 * display projection withholds them, so the echo the statement owes binds the armed half, not today's raw reading (Q4);
 * R-INTERRUPTED a stem split by a zero-width code point or spelled with a homoglyph letter is not caught (Q5); R-SCOPE the trigger
 * reads the two files the acceptance names: the src modules that load the HX SDK or provider lie outside it, and no src module
 * imports the adapter yet (Q6); R-EMBEDDED provider evidence embedded in an admission record's own checked-fact text is echoed
 * verbatim by the honest reader and no check fires, because (c) binds the per-law trace and (b) owes the facts verbatim (Q7).
 * SCOPE: the stem judge does not read negation or context, so a comment that merely mentions a stem in either file reds A1
 * (OVER-READ, disclosed: neither file spells one today, and an edit that must will re-measure this census). The armed contract
 * reads "explain facets" as exactly one facet per admission record and holds a trace to nothing but the evidence withholding: a
 * reader that also surfaces a trace's reject reasons fails own-facet (OVER-READ of (b), disclosed; its own cut re-measures B2).
 * It reads each facet as exactly its record's five members, so a reader that adds any member, a neutral display hint as well as
 * a (c) reading, fails facet-members (OVER-READ of (b)'s "verbatim", disclosed; a reader whose own cut must add a facet member
 * re-measures B2). Facet-members reads the member set only, as own enumerable string keys (what JSON carries): the
 * values stay with verbatim and synthesized.
 * Projection holds the whole projection of every fixture to its twin, so a reader that adds any diagnostic, relation or title
 * text, an admission echo or not, fails it: the explain output rides the facets alone (README:69 and VC1's "without changing
 * execution", read strictly - an OVER-READ of the four members (b) names, disclosed; a reader whose own cut must change the
 * projection re-measures B2). Projection compares content, not member order: byte-identical holds the order, on carrier-less
 * fixtures only.
 * The armed fixtures use one constructed carrier: a reader bound to the producer's real carrier re-measures the fixtures. Hostile
 * reason text is not judged here; display safety stays with the shared sanitizers' own pins. No HX admission reader is added or
 * faked: a reader's own cut binds itself in HX_ADMISSION_READERS and meets B2 and C.
 *
 * Display paths added: none. Test-only: no scratch is allocated; src, vendor, node_modules and .beads are only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { gunzipSync } from "node:zlib";
import { resultFromJson } from "@hyperunix/sdk";
import { describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import {
  HYPERUNIX_EXECUTION_KINDS,
  type HyperUnixObservedRelation,
  type HyperUnixProjectionTopology,
  type HyperUnixTopologyContext,
  hxLiveInvariant,
  hyperunixTopology,
} from "../src/workbench/hyperunix-observer.js";
import type { NativeSnapshot } from "../src/workbench/observation.js";
import { registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { sanitizeWorkbenchText } from "../src/workbench/redaction.js";

type JsonObject = { [key: string]: JsonValue };
type Path = readonly (string | number)[];

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "hx-admission-reason-roster.json");
const BEAD = "wb-z3ft.3";
/** The program pin (HyperUnix-CLI origin/main at the 2026-10-22 triage). */
const PROGRAM_PIN = "0091719d02887910fa0c2fb6693a32723e243600";
/** The vendored SDK artifact, and the member of it that npm installs as the first judged file. */
const VENDORED_TGZ = "vendor/hyperunix-sdk-0.1.0.tgz";
const PACKED_RESULT = "package/dist/result.d.ts";
/** "those two files" of acceptance (a): the vendored result declaration and the HX reader adapter. */
const JUDGED_FILES = ["node_modules/@hyperunix/sdk/dist/result.d.ts", "src/workbench/hyperunix-observer.ts"];
/** The admission vocabulary: the filing's three grep alternatives, then the field its gating-artifact sentence quotes. */
const STEMS = ["admission", "reason_code", "law_admission", "reason"];
/** The result declarations whose members A1 reads (StatusBase is the unexported base of every ExecutionStatus variant). */
const DECLARATIONS = ["QueryResult", "CoverageSummary", "Coverage", "EvidenceSummary", "StatusBase", "ClassificationInput"];
/** Each spelling the stem judge must flag, and each it must leave quiet. */
const FLAGGED_CONTROLS = [
  "readonly reasonCode: string;",
  "readonly lawAdmission: LawAdmission;",
  "ADMISSION_REASON_CODES",
  "a reason-code field",
  "Withheld of reason",
  "readonly law_admission: string;",
  "admission_reason_codes",
];
const QUIET_CONTROLS = [
  "readonly diagnosticCode: string | null;",
  "readonly licensesAbsence: boolean;",
  "mutation-rejected",
  "verdict",
  "checked profile and provider facts",
  "withheld from evidence references",
];
/** The members (b) holds unchanged, and the readings (c) forbids for a rejected-admission code (statusTone, coverage, answer). */
const UNCHANGED_FIELDS = ["coverage", "statusTone", "statusText", "evidenceRefs"] as const;
type UnchangedField = (typeof UNCHANGED_FIELDS)[number];
const NEVER = { statusTone: "failure", coverage: "complete", answer: "known-empty" } as const;
/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-VOCABULARY": ["Q1"],
  "R-COMPOSED": ["Q2"],
  "R-NAMESAKE": ["Q3"],
  "R-RAW-READING": ["Q4"],
  "R-INTERRUPTED": ["Q5"],
  "R-SCOPE": ["Q6"],
  "R-EMBEDDED": ["Q7"],
};

type Verdict = "accepted" | "rejected";
interface Admission {
  readonly law: string;
  readonly verdict: Verdict;
  readonly code: string;
  readonly profile: readonly string[];
  readonly provider: readonly string[];
}
/** The constructed admission records; every fact carries a CSO-n sentinel no output may show today. */
const ADMISSIONS: Readonly<Record<string, Admission>> = {
  accepted: {
    law: "hx.law/scoped-anti-join",
    verdict: "accepted",
    code: "admitted",
    profile: ["observation profile hx.fs/v1: derivation identities are not observed (CSO-1)"],
    provider: ["hx.fs/builtin: certificate mode complete-within-scope over the src subtree (CSO-2)"],
  },
  rejected: {
    law: "hx.law/laminar-cover-dp",
    verdict: "rejected",
    code: "coverage-below",
    profile: ["observation profile hx.fs/v1: multiplicity is observed (CSO-3)"],
    provider: ["hx.fs/builtin: certificate mode opportunistic over the src subtree (CSO-4)"],
  },
  unadopted: {
    law: "hx.law/typed-incidence-semijoin",
    verdict: "rejected",
    code: "law-not-adopted",
    profile: ["observation profile hx.fs/v1: ordinal use is excluded (CSO-5)", "projection: incidence roles are observed (CSO-6)"],
    provider: ["hx.fs/builtin: the law registry reads proposal (CSO-7)"],
  },
};
/** The per-law trace of the rejected law: reject reasons and assumptions beside the sensitive provider evidence (README.md:79). */
const TRACE: JsonObject = {
  law: "hx.law/laminar-cover-dp",
  reasons: ["coverage-below: the certificate for relation-expansion is opportunistic (CSO-8)"],
  assumptions: ["the snapshot generation did not move while planning (CSO-9)"],
  provider_evidence: { support: "PROVIDER-EVIDENCE-SENTINEL-41d7", rows: [{ path: "src/provider-evidence-sentinel.ts" }] },
};
const EVIDENCE_SENTINEL = "provider-evidence-sentinel";
const SENTINEL = /CSO-\d+|provider-evidence-sentinel/gi;
/** The admission-shaped member A3 and A4 plant, the diagnostic code of the grammar entries, and the census's constructed carrier
 * keys inside the SDK's extension sidecar. */
const MEMBER = "law_admissions";
const DIAGNOSTIC_CODE = "HX-LAW-ADMISSION";
const CARRIER = "hx.law-admissions";
const TRACE_CARRIER = "hx.law-traces";
/** The facet bound the honest reader displays within (the adapter's diagnostic bound). */
const FACET_LIMIT = 200;
/** The members of every explain facet, exactly: the members of each admission record (the law, its verdict and code, and the
 * checked profile and provider facts). facetKey reads their values; facet-members holds each facet's own member set to them, in
 * any order (wb-1vci). */
const FACET_MEMBERS = ["law", "verdict", "code", "profile", "provider"] as const satisfies readonly (keyof Facet)[];

interface FixtureSpec {
  readonly name: string;
  readonly kind: string;
  readonly licensed: boolean;
  readonly admissions: readonly string[];
  readonly traced: boolean;
}
/** The armed fixtures: rows [] throughout; no twin is a failure, and only the accepted known-empty twin licenses absence. */
const FIXTURE_SPECS: readonly FixtureSpec[] = [
  { name: "none", kind: "incomplete", licensed: false, admissions: [], traced: false },
  { name: "accepted", kind: "incomplete", licensed: false, admissions: ["accepted"], traced: false },
  { name: "accepted-known-empty", kind: "complete-empty", licensed: true, admissions: ["accepted"], traced: false },
  { name: "rejected", kind: "incomplete", licensed: false, admissions: ["rejected"], traced: false },
  { name: "rejected-licensed-incomplete", kind: "incomplete", licensed: true, admissions: ["rejected"], traced: false },
  { name: "rejected-complete-unlicensed", kind: "complete", licensed: false, admissions: ["rejected"], traced: false },
  { name: "rejected-complete-empty-unlicensed", kind: "complete-empty", licensed: false, admissions: ["rejected"], traced: false },
  { name: "mixed", kind: "incomplete", licensed: false, admissions: ["accepted", "rejected", "unadopted"], traced: false },
  { name: "repeated", kind: "incomplete", licensed: false, admissions: ["rejected", "rejected"], traced: false },
  { name: "traced", kind: "incomplete", licensed: false, admissions: ["rejected"], traced: true },
  { name: "trace-only", kind: "incomplete", licensed: false, admissions: [], traced: true },
];
/** The checks the armed half runs, in the order a violation list reports them: the (b) checks (projection, README:69's reading,
 * beside the four members (b) names; facet-members, each facet's own member set), then the (c) checks. */
const CHECKS = ["refused", "byte-identical", "unchanged", "projection", "verbatim", "own-facet", "synthesized", "facet-members", "failure", "absence", "evidence"] as const;
type Check = (typeof CHECKS)[number];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A to C, to the bead's acceptance clauses. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) today: a test asserts those two files carry no admission or reason-code field, kind and licence alone decide absence (observer.ts:217), diagnostics never surface",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(b) on landing: each admission reason code and the checked profile/provider facts project verbatim as explain facets; coverage, statusTone, statusText and evidenceRefs unchanged",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(c) on landing: a rejected-admission code never yields statusTone 'failure', coverage 'complete' or 'known-empty', and a per-law trace fixture carrying a provider-evidence sentinel yields no output field containing it",
    pins: ["C1", "C2", "C3"],
  },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
];

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly programPin: string;
  readonly producer: JsonObject;
  readonly constants: JsonObject;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: unknown, field: string): JsonObject {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return json(value) as JsonObject;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return [...value];
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || typeof raw.programPin !== "string" || !Array.isArray(raw.rows)) {
    throw new Error("roster must be an object with programPin and rows");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      }
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    programPin: raw.programPin,
    producer: objectOf(raw.producer, "roster producer"),
    constants: objectOf(raw.constants, "roster constants"),
    tests: strings(raw.tests, "roster tests"),
    rows,
  };
}

const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

function textOf(path: string): string {
  return readFileSync(path, "utf8");
}
function sha256(bytes: Buffer | string): string {
  return createHash("sha256").update(bytes).digest("hex");
}

/** Every regular file of a gzipped tar by entry name (ustar prefix joined); directories and other entry types are skipped. */
function tarEntries(archive: Buffer): Map<string, Buffer> {
  const tar = gunzipSync(archive);
  const entries = new Map<string, Buffer>();
  let offset = 0;
  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512);
    if (header.every(byte => byte === 0)) break;
    const field = (from: number, to: number): string => {
      const raw = header.subarray(from, to).toString("utf8");
      const end = raw.indexOf("\u0000");
      return end === -1 ? raw : raw.slice(0, end);
    };
    const prefix = field(345, 500);
    const name = prefix.length > 0 ? `${prefix}/${field(0, 100)}` : field(0, 100);
    const size = Number.parseInt(field(124, 136).trim() || "0", 8);
    const type = field(156, 157);
    const body = offset + 512;
    if (type === "" || type === "0") entries.set(name, tar.subarray(body, body + size));
    offset = body + Math.ceil(size / 512) * 512;
  }
  return entries;
}
function vendoredEntries(): Map<string, Buffer> {
  return tarEntries(readFileSync(join(REPO, VENDORED_TGZ)));
}

/** Every stem occurrence of a text, as `line:stem`, read case-insensitively inside words and identifiers. */
function stemHits(text: string): string[] {
  const hits: string[] = [];
  text.split("\n").forEach((line, index) => {
    const lower = line.toLowerCase();
    for (const stem of STEMS) {
      let at = lower.indexOf(stem);
      while (at !== -1) {
        hits.push(`${index + 1}:${stem}`);
        at = lower.indexOf(stem, at + stem.length);
      }
    }
  });
  return hits;
}
/** The 1-based line numbers of a text that carry a stem. */
function stemLines(text: string): number[] {
  return [...new Set(stemHits(text).map(hit => Number(hit.slice(0, hit.indexOf(":")))))].sort((left, right) => left - right);
}
/** The member names an interface (exported or not) declares, in declaration order. */
function interfaceMembers(text: string, name: string): string[] {
  const start = text.search(new RegExp(`^(?:export )?interface ${name}(?:<[^>]*>)? \\{`, "m"));
  if (start === -1) return [];
  const open = text.indexOf("{", start);
  const close = text.indexOf("\n}", open);
  return [...text.slice(open + 1, close).matchAll(/^ {4}readonly (\w+)\??:/gm)].map(match => match[1] ?? "");
}
/** The members the ExecutionStatus variants declare beside StatusBase, distinct, in declaration order. */
function variantMembers(text: string): string[] {
  const start = text.indexOf("export type ExecutionStatus =");
  const end = text.indexOf("export type ExecutionStatusKind");
  if (start === -1 || end === -1) return [];
  return [...new Set([...text.slice(start, end).matchAll(/readonly (\w+)\??:/g)].map(match => match[1] ?? ""))];
}

/** Every regular .ts file below a directory (symlinks are not followed). */
function tsBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return tsBelow(path);
    return entry.isFile() && entry.name.endsWith(".ts") ? [path] : [];
  });
}
/** The module specifiers a source text loads, static and dynamic. */
function specifiersOf(text: string): string[] {
  return [...text.matchAll(/\bfrom\s+["']([^"']+)["']|\bimport\s*\(\s*["']([^"']+)["']\s*\)/g)].map(match => match[1] ?? match[2] ?? "");
}

const WS = "/srv/pi-hx-census-z3ft3";
/** The runtime identity the measured live read of this workspace reported (test/workbench-hyperunix-observer.test.ts:21). */
const BINARY = "3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d";
const CONTEXT: HyperUnixTopologyContext = {
  scope: { workspace: WS, principal: "local-operator:census" },
  target: { kind: "hx.fs/regular-file", root: "src" },
  capturedAt: "2026-10-23T12:00:00Z",
  observedAt: "2026-10-23T12:00:01Z",
};

/** A full SDK representation of one find, shaped like the measured live read (one certificate, region, diagnostic and cost each),
 * with the given top-level members replaced. */
function sdkDocument(overrides: JsonObject = {}): JsonObject {
  return {
    representation: "hyperunix.result/1",
    operation: "find",
    rows: [],
    rows_retained: true,
    coverage: [
      {
        mode: "opportunistic",
        cause: { cause: "other", detail: "No_change_exclusion" },
        scope: { path: [], scope: "fs-subtree" },
        target: { target: "relation-expansion" },
        provider: "hx.fs/builtin",
        stream: "hx-fs",
        batch_id: "b1",
        body: { mode: "opportunistic" },
      },
    ],
    status: { exit_code: 0, signal: null, streams: [{ name: "hx-fs", frames: 12, ended: true, mode: "observation" }], terminal_reached: true, frames_total: 12 },
    execution_status: { kind: "incomplete", diagnostic_code: "HX-COVERAGE-INCOMPLETE" },
    diagnostics: [
      {
        code: "HX-COVERAGE-INCOMPLETE",
        severity: "warning",
        message: "licenses no absence",
        details: { region: "fs:src" },
        remediation: null,
        request: null,
        origin: "hxs",
        stream: "hx-fs",
        extra: { note: "census" },
      },
    ],
    view: null,
    cost: { provider_calls: 1 },
    transport: {
      started_at: "2026-10-23T11:59:59.000Z",
      startup_latency_s: 0.01,
      process_duration_s: 0.2,
      stdout_bytes: 1000,
      stderr_bytes: 0,
      stderr_bytes_retained: 0,
      frames: 12,
    },
    workspace_root: WS,
    terminal: "complete",
    truth: null,
    coverage_summary: {
      modes: ["opportunistic"],
      completeness: "incomplete",
      licenses_absence: false,
      certificates_license_absence: false,
      incomplete_regions: [{ scope: "fs:src", target: "hx.fs/directory-entry" }],
      result_coverage: { count: 0 },
      answer_count: null,
    },
    evidence: { support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: { "hx.fs": "0.1.0" } },
    digest: null,
    digest_source: "absent",
    local_digest: null,
    structural_digest: null,
    execution_id: null,
    budget_dimension: null,
    extensions: {},
    ...overrides,
  };
}
/** One row, so the walks reach a row object. */
const ONE_ROW: JsonObject = { rows: [{ path: "src/index.ts" }] };

/** What registry.invoke returns for a native result through registerHyperUnixFind (the provider's own path). */
async function invoked(document: JsonObject): Promise<JsonValue> {
  const native = resultFromJson(document);
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(
    registry,
    { find: async () => native, runtime: async () => ({ version: "0.1.0", binarySha256: BINARY }), close: async () => {} },
    WS,
  );
  return registry.invoke("hyperunix.find", { kind: "hx.fs/regular-file", root: "src" }, { grants: ["hyperunix:read"], signal: new AbortController().signal });
}
function sourceOf(value: JsonValue): JsonObject {
  return isObject(value) && isObject(value.source) ? (json(value.source) as JsonObject) : {};
}
function withSource(value: JsonValue, source: JsonObject): JsonValue {
  return json({ ...(isObject(value) ? value : {}), source });
}

/** The object nodes of a JSON value counted from its JSON text (each object serializes exactly one opening brace outside strings):
 * an anchor for the walk below that shares no code with it. */
function bracesOf(value: JsonValue): number {
  const text = JSON.stringify(value);
  let count = 0;
  let inString = false;
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (inString) {
      if (char === "\\") index++;
      else if (char === '"') inString = false;
    } else if (char === '"') inString = true;
    else if (char === "{") count++;
  }
  return count;
}
/** Every object node of a JSON value, as a path from its root, in document order. */
function objectPaths(value: JsonValue, path: Path = []): Path[] {
  if (Array.isArray(value)) return value.flatMap((item, index) => objectPaths(item, [...path, index]));
  if (value !== null && typeof value === "object") {
    return [path, ...Object.entries(value).flatMap(([key, item]) => objectPaths(item, [...path, key]))];
  }
  return [];
}
/** A JSONPath-like spelling: identifier keys dotted, any other key bracketed and quoted, indexes bracketed. */
function pathText(path: Path): string {
  const step = (part: string | number): string =>
    typeof part === "number" ? `[${part}]` : /^[A-Za-z_][A-Za-z0-9_]*$/.test(part) ? `.${part}` : `[${JSON.stringify(part)}]`;
  return `$${path.map(step).join("")}`;
}
function nodeAt(value: JsonValue, path: Path): JsonValue | undefined {
  let node: JsonValue | undefined = value;
  for (const step of path) {
    if (Array.isArray(node) && typeof step === "number") node = node[step];
    else if (isObject(node) && typeof step === "string") node = (node as JsonObject)[step];
    else return undefined;
  }
  return node;
}
/** A copy of the value with `member` set to `content` on the object at the path. */
function planted(value: JsonValue, path: Path, member: string, content: JsonValue): JsonValue {
  const copy = json(value);
  const node = nodeAt(copy, path);
  if (!isObject(node)) throw new Error(`no object at ${pathText(path)}`);
  (node as JsonObject)[member] = json(content);
  return copy;
}
function admissionOf(name: string): Admission {
  const found = ADMISSIONS[name];
  if (found === undefined) throw new Error(`no admission record ${name}`);
  return found;
}
/** The admission-shaped content A3 and A4 plant: every record and the per-law trace, verbatim. */
function shapedContent(): JsonValue {
  return json({ admissions: Object.values(ADMISSIONS), trace: TRACE });
}
/** The admission records in the existing diagnostic grammar: the slot an explain-only code could ride today without a new field. */
function admissionDiagnostics(): JsonObject[] {
  return Object.values(ADMISSIONS).map(entry => ({
    code: DIAGNOSTIC_CODE,
    severity: "info",
    message: `${entry.verdict} ${entry.law}: ${entry.code} (CSO-D)`,
    details: json(entry),
    remediation: null,
    request: null,
    origin: "hxs",
    stream: "hx-fs",
    extra: { trace: TRACE },
  }));
}
/** Every sentinel and stem an output shows. */
function leaksOf(output: unknown): string[] {
  const text = JSON.stringify(output);
  const sentinels = (text.match(SENTINEL) ?? []).map(found => found.toLowerCase());
  return [...new Set([...sentinels, ...stemHits(text).map(hit => hit.slice(hit.indexOf(":") + 1))])].sort();
}

/** Today's projection and live verdict of one reading. */
function reading(value: JsonValue): { topology: HyperUnixProjectionTopology; verdict: JsonValue } {
  return { topology: hyperunixTopology(value, CONTEXT), verdict: json(hxLiveInvariant(value)) };
}
interface Plant {
  readonly unchanged: boolean;
  readonly leaked: readonly string[];
}
function judgePlant(base: JsonValue, candidate: JsonValue): Plant {
  const before = reading(base);
  const after = reading(candidate);
  const unchanged =
    isDeepStrictEqual(after.topology, before.topology) &&
    JSON.stringify(after.topology) === JSON.stringify(before.topology) &&
    isDeepStrictEqual(after.verdict, before.verdict);
  return { unchanged, leaked: leaksOf(after.topology) };
}

/** The absence reading of one value: the projection's coverage, tone and known-empty answer (or the refusal), and the live
 * invariant's absenceLicensed. */
function absenceOf(value: JsonValue): JsonValue {
  let projected: JsonValue;
  try {
    const [snapshot] = hyperunixTopology(value, CONTEXT).snapshots;
    projected = snapshot === undefined ? null : [snapshot.coverage ?? null, snapshot.node.statusTone, snapshot.node.statusText.includes(NEVER.answer)];
  } catch (error) {
    projected = error instanceof CapabilityError ? `refused:${error.category}` : "threw";
  }
  return json({ projected, absenceLicensed: hxLiveInvariant(value).absenceLicensed });
}
/** A reading with the two deciders set: the execution kind and the runtime's licence. */
function decided(value: JsonValue, kind: string, licensed: boolean): JsonValue {
  const source = sourceOf(value);
  const status = isObject(source.execution_status) ? source.execution_status : {};
  const summary = isObject(source.coverage_summary) ? source.coverage_summary : {};
  return withSource(value, { ...source, execution_status: { ...status, kind }, coverage_summary: { ...summary, licenses_absence: licensed } });
}
interface Leaf {
  readonly path: Path;
  readonly key: string | number;
}
const isPrimitive = (item: JsonValue | undefined): boolean => item === null || typeof item !== "object";
/** The primitive members of a source - object members and the primitive elements of array members, by container path and key -
 * minus the two deciders and the representation tag. */
function perturbable(source: JsonObject): Leaf[] {
  const deciders = new Set(["$.execution_status.kind", "$.coverage_summary.licenses_absence", "$.representation"]);
  return objectPaths(source).flatMap(path => {
    const node = nodeAt(source, path);
    if (!isObject(node)) return [];
    return Object.entries(node as JsonObject).flatMap(([key, item]): Leaf[] => {
      if (Array.isArray(item)) return item.flatMap((element, index) => (isPrimitive(element) ? [{ path: [...path, key], key: index }] : []));
      return isPrimitive(item) && !deciders.has(pathText([...path, key])) ? [{ path, key }] : [];
    });
  });
}
/** A copy of the source with one primitive member changed: a string suffixed, a number incremented, a boolean flipped, null
 * replaced by a string. */
function perturbed(source: JsonObject, leaf: Leaf): JsonObject {
  const copy = json(source) as JsonObject;
  const node = nodeAt(copy, leaf.path);
  const change = (item: JsonValue | undefined): JsonValue =>
    typeof item === "string" ? `${item}-perturbed` : typeof item === "number" ? item + 1 : typeof item === "boolean" ? !item : "perturbed";
  if (Array.isArray(node) && typeof leaf.key === "number") node[leaf.key] = change(node[leaf.key]);
  else if (isObject(node) && typeof leaf.key === "string") (node as JsonObject)[leaf.key] = change((node as JsonObject)[leaf.key]);
  else throw new Error(`no container at ${pathText(leaf.path)}`);
  return copy;
}
/** The absence-suggesting temptations A2 applies beside the perturbations: each replaces source members with values that would
 * read as absence or as an admission if anything but the kind and the licence decided it. */
const TEMPTATIONS: Readonly<Record<string, (source: JsonObject) => JsonObject>> = {
  "rows-not-retained": source => ({ ...source, rows_retained: false }),
  "three-rows": source => ({ ...source, rows: [{ path: "a" }, { path: "b" }, { path: "c" }] }),
  "completeness-complete": source => ({ ...source, coverage_summary: { ...(source.coverage_summary as JsonObject), completeness: "complete" } }),
  "certificates-license-absence": source => ({
    ...source,
    coverage_summary: { ...(source.coverage_summary as JsonObject), certificates_license_absence: true },
  }),
  "answer-count-zero": source => ({ ...source, coverage_summary: { ...(source.coverage_summary as JsonObject), answer_count: 0 } }),
  "truth-known-absent": source => ({ ...source, truth: "known_absent" }),
  "terminal-established-empty": source => ({ ...source, terminal: "established_empty" }),
  "exit-class-one": source => ({ ...source, status: { ...(source.status as JsonObject), exit_code: 1 } }),
  "complete-within-scope-certificate": source => ({
    ...source,
    coverage: (source.coverage as JsonValue[]).map(item => ({ ...(item as JsonObject), mode: "complete-within-scope" })),
    coverage_summary: { ...(source.coverage_summary as JsonObject), modes: ["complete-within-scope"] },
  }),
  "no-certificates": source => ({ ...source, coverage: [] }),
  "accepted-admission": source => ({ ...source, [MEMBER]: [json(admissionOf("accepted"))] }),
  "rejected-admission": source => ({ ...source, [MEMBER]: [json(admissionOf("rejected"))] }),
  "admission-diagnostics": source => ({
    ...source,
    execution_status: { ...(source.execution_status as JsonObject), diagnostic_code: DIAGNOSTIC_CODE },
    diagnostics: [...(source.diagnostics as JsonValue[]), ...admissionDiagnostics()],
  }),
};

interface Facet {
  readonly law: string;
  readonly verdict: string;
  readonly code: string;
  readonly profile: readonly string[];
  readonly provider: readonly string[];
}
interface AdmittedProjection {
  readonly topology: HyperUnixProjectionTopology;
  readonly facets: readonly Facet[];
}
type AdmissionReader = (value: JsonValue, context: HyperUnixTopologyContext) => AdmittedProjection;
/** The armed half: each src module that reads an HX admission reason, bound to a call of its reader on one provider reading. A
 * reader's own cut adds its row here and meets B2 and C on every fixture; the table stays empty while no judged src file spells
 * a stem (A1 holds both directions). */
const HX_ADMISSION_READERS: Readonly<Record<string, AdmissionReader>> = {};

function isVerdict(value: unknown): value is Verdict {
  return value === "accepted" || value === "rejected";
}
function isStrings(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}
function extensionsOf(value: JsonValue): JsonObject {
  const source = sourceOf(value);
  return isObject(source.extensions) ? (source.extensions as JsonObject) : {};
}
/** The admission records the constructed carrier holds: source.extensions[CARRIER], a list of records. */
function admissionsCarriedBy(value: JsonValue): Admission[] {
  const list = extensionsOf(value)[CARRIER];
  if (!Array.isArray(list)) return [];
  return list.flatMap(item =>
    isObject(item) &&
    typeof item.law === "string" &&
    isVerdict(item.verdict) &&
    typeof item.code === "string" &&
    isStrings(item.profile) &&
    isStrings(item.provider)
      ? [{ law: item.law, verdict: item.verdict, code: item.code, profile: [...item.profile], provider: [...item.provider] }]
      : [],
  );
}
/** The per-law traces the constructed trace carrier holds, verbatim. */
function tracesCarriedBy(value: JsonValue): JsonValue[] {
  const list = extensionsOf(value)[TRACE_CARRIER];
  return Array.isArray(list) ? list.map(item => json(item)) : [];
}
const shown = (text: string): string => sanitizeWorkbenchText(text, FACET_LIMIT, "label");
const facetOf = (entry: Admission): Facet => ({
  law: shown(entry.law),
  verdict: entry.verdict,
  code: shown(entry.code),
  profile: entry.profile.map(shown),
  provider: entry.provider.map(shown),
});
/** The honest reader: today's projection unchanged, plus one facet per carried admission record, every text through the shared
 * sanitizer; traces are read for nothing. */
const honest: AdmissionReader = (value, context) => ({
  topology: hyperunixTopology(value, context),
  facets: admissionsCarriedBy(value).map(facetOf),
});
function patched(topology: HyperUnixProjectionTopology, patch: (snapshot: NativeSnapshot) => NativeSnapshot): HyperUnixProjectionTopology {
  const copy = JSON.parse(JSON.stringify(topology)) as HyperUnixProjectionTopology;
  return { ...copy, snapshots: copy.snapshots.map(patch) };
}
function withTopology(out: AdmittedProjection, when: boolean, patch: (snapshot: NativeSnapshot) => NativeSnapshot): AdmittedProjection {
  return when ? { ...out, topology: patched(out.topology, patch) } : out;
}
function withFacets(out: AdmittedProjection, facets: readonly Facet[]): AdmittedProjection {
  return { ...out, facets };
}
/** The projection with one more snapshot after today's, derived from the first, whenever the reading carries an admission record. */
function withSecond(out: AdmittedProjection, patch: (snapshot: NativeSnapshot) => NativeSnapshot): AdmittedProjection {
  const [first] = out.topology.snapshots;
  return out.facets.length === 0 || first === undefined ? out : { ...out, topology: { ...out.topology, snapshots: [...out.topology.snapshots, patch(first)] } };
}
const has = (out: AdmittedProjection, verdict: Verdict): boolean => out.facets.some(facet => facet.verdict === verdict);
/** The provider evidence of each carried trace, as JSON text (short enough that the display bound keeps all of it). */
const evidenceTexts = (value: JsonValue): string[] =>
  tracesCarriedBy(value).map(trace => JSON.stringify(isObject(trace) ? (trace.provider_evidence ?? null) : null));
/** The synthetic readers that exercise the armed check; each mutant differs from the honest reader in one way. */
const READERS: Readonly<Record<string, AdmissionReader>> = {
  honest,
  raiseOnAccepted: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, has(out, "accepted"), snapshot => ({ ...snapshot, coverage: "complete", node: { ...snapshot.node, statusTone: "success" } }));
  },
  evidenceRef: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, out.facets.length > 0, snapshot => ({
      ...snapshot,
      evidenceRefs: [...(snapshot.evidenceRefs ?? []), ...out.facets.map((_, index) => `hx-admission:${index + 1}`)],
    }));
  },
  answerText: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, out.facets.length > 0, snapshot => ({
      ...snapshot,
      node: { ...snapshot.node, statusText: `${snapshot.node.statusText} · ${out.facets.length} law verdicts` },
    }));
  },
  codeOnly: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(facet => ({ ...facet, profile: [], provider: [] })),
    );
  },
  paraphrase: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(facet => ({ ...facet, code: `HX law verdict: ${facet.code}` })),
    );
  },
  truncate: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(facet => ({ ...facet, provider: facet.provider.map(text => text.slice(0, 24)) })),
    );
  },
  mergeFacets: (value, context) => {
    const out = honest(value, context);
    const [first] = out.facets;
    return first === undefined || out.facets.length < 2
      ? out
      : withFacets(out, [
          { ...first, code: out.facets.map(facet => facet.code).join("; "), profile: out.facets.flatMap(facet => facet.profile), provider: out.facets.flatMap(facet => facet.provider) },
        ]);
  },
  dedupeFacets: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.filter((facet, index, all) => all.findIndex(other => JSON.stringify(other) === JSON.stringify(facet)) === index),
    );
  },
  dropRejected: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.filter(facet => facet.verdict !== "rejected"),
    );
  },
  reclassRejected: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(facet => (facet.verdict === "rejected" ? { ...facet, verdict: "accepted" } : facet)),
    );
  },
  facetForNone: (value, context) => {
    const out = honest(value, context);
    return out.facets.length > 0 ? out : withFacets(out, [{ law: "none", verdict: "accepted", code: "no-law-proposed", profile: [], provider: [] }]);
  },
  refuseAdmissions: (value, context) => {
    if (admissionsCarriedBy(value).length > 0) throw new Error("admission reasons are not read");
    return honest(value, context);
  },
  failureOnRejected: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, has(out, "rejected"), snapshot => ({ ...snapshot, coverage: "unknown", node: { ...snapshot.node, statusTone: "failure" } }));
  },
  completeOnRejected: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, has(out, "rejected"), snapshot => ({ ...snapshot, coverage: "complete" }));
  },
  knownEmptyOnRejected: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, has(out, "rejected"), snapshot => ({
      ...snapshot,
      node: { ...snapshot.node, statusText: "known-empty (runtime-licensed) · rows 0" },
    }));
  },
  traceEcho: (value, context) => {
    const out = honest(value, context);
    const texts = evidenceTexts(value);
    return texts.length === 0
      ? out
      : withFacets(out, [...out.facets, ...texts.map(text => ({ law: "per-law trace", verdict: "rejected", code: "trace", profile: [], provider: [shown(text)] }))]);
  },
  traceInDiagnostics: (value, context) => {
    const out = honest(value, context);
    const texts = evidenceTexts(value);
    return texts.length === 0
      ? out
      : { ...out, topology: { ...out.topology, diagnostics: [...out.topology.diagnostics, ...texts.map(text => shown(`per-law trace evidence: ${text}`))] } };
  },
  codeInDiagnostics: (value, context) => {
    const out = honest(value, context);
    return out.facets.length === 0 ? out : { ...out, topology: { ...out.topology, diagnostics: [...out.topology.diagnostics, ...out.facets.map(facet => facet.code)] } };
  },
  titleNote: (value, context) => {
    const out = honest(value, context);
    return withTopology(out, out.facets.length > 0, snapshot => ({
      ...snapshot,
      node: { ...snapshot.node, title: `${snapshot.node.title} · ${out.facets.length} law verdicts` },
    }));
  },
  lawRelation: (value, context) => {
    const out = honest(value, context);
    const [first] = out.topology.snapshots;
    if (out.facets.length === 0 || first === undefined) return out;
    const edges = out.facets.map(
      (facet): HyperUnixObservedRelation => ({
        scope: { ...first.scope },
        from: { provider: "hyperunix", type: "law", id: facet.law, scope: first.scope.workspace },
        to: { ...first.source },
        kind: "grouping",
        provenance: { source: "hyperunix", observedAt: first.observedAt },
      }),
    );
    return { ...out, topology: { ...out.topology, relations: [...out.topology.relations, ...edges] } };
  },
  failureSnapshot: (value, context) =>
    withSecond(honest(value, context), snapshot => ({ ...snapshot, node: { ...snapshot.node, statusTone: "failure", statusText: "rejected" } })),
  knownEmptySnapshot: (value, context) =>
    withSecond(honest(value, context), snapshot => ({
      ...snapshot,
      coverage: "complete",
      node: { ...snapshot.node, statusTone: "success", statusText: "known-empty (runtime-licensed) · rows 0" },
    })),
  // The facet-member channel (wb-1vci, F1 of landing 428): P1 facetTone and P2 facetCoverage carry clause (c)'s readings as
  // members of each rejected facet, facetRaise raises each accepted facet, facetHint adds a display hint to every facet, and
  // facetDrop and facetRenamed each lose a member.
  facetTone: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(facet => (facet.verdict === "rejected" ? { ...facet, statusTone: NEVER.statusTone } : facet)),
    );
  },
  facetCoverage: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(facet => (facet.verdict === "rejected" ? { ...facet, coverage: NEVER.coverage, answer: NEVER.answer } : facet)),
    );
  },
  facetRaise: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(facet => (facet.verdict === "accepted" ? { ...facet, coverage: "complete", statusTone: "success" } : facet)),
    );
  },
  facetHint: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(facet => ({ ...facet, hint: `${facet.verdict}: ${facet.code}` })),
    );
  },
  facetDrop: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(({ provider: _dropped, ...kept }) => kept as Facet),
    );
  },
  facetRenamed: (value, context) => {
    const out = honest(value, context);
    return withFacets(
      out,
      out.facets.map(({ provider, ...kept }) => ({ ...kept, evidence: provider }) as unknown as Facet),
    );
  },
};
function readerOf(name: string): AdmissionReader {
  const read = READERS[name];
  if (read === undefined) throw new Error(`no synthetic reader ${name}`);
  return read;
}
/** The mutants C1 holds to the rejected-admission readings, and the ones C2 holds to the trace evidence, with the check each owes. */
const REJECTED_MUTANTS: Readonly<Record<string, Check>> = {
  failureOnRejected: "failure",
  completeOnRejected: "absence",
  knownEmptyOnRejected: "absence",
  failureSnapshot: "failure",
  knownEmptySnapshot: "absence",
};
const TRACE_MUTANTS: readonly string[] = ["traceEcho", "traceInDiagnostics"];

interface ArmedFixture {
  readonly name: string;
  readonly document: JsonObject;
  readonly reading: JsonValue;
  readonly twin: JsonValue;
  readonly admissions: readonly Admission[];
  readonly traced: boolean;
}
/** The base document of a spec: rows [], the spec's kind and licence. */
function specDocument(spec: { readonly kind: string; readonly licensed: boolean }): JsonObject {
  const base = sdkDocument();
  return sdkDocument({
    execution_status: { kind: spec.kind, diagnostic_code: null },
    coverage_summary: { ...(base.coverage_summary as JsonObject), licenses_absence: spec.licensed },
  });
}
/** A spec's document with its carriers: the admission records and, when traced, the per-law trace. */
function carried(twin: JsonObject, admissions: readonly Admission[], traced: boolean): JsonObject {
  if (admissions.length === 0 && !traced) return twin;
  const extensions: JsonObject = {
    ...(admissions.length > 0 ? { [CARRIER]: admissions.map(entry => json(entry)) } : {}),
    ...(traced ? { [TRACE_CARRIER]: [TRACE] } : {}),
  };
  return sdkDocument({ ...twin, extensions });
}
let armedCache: Promise<ArmedFixture[]> | undefined;
async function buildArmed(): Promise<ArmedFixture[]> {
  const built: ArmedFixture[] = [];
  for (const spec of FIXTURE_SPECS) {
    const admissions = spec.admissions.map(admissionOf);
    const twinDocument = specDocument(spec);
    const document = carried(twinDocument, admissions, spec.traced);
    built.push({ name: spec.name, document, reading: await invoked(document), twin: await invoked(twinDocument), admissions, traced: spec.traced });
  }
  return built;
}
function armedFixtures(): Promise<ArmedFixture[]> {
  armedCache ??= buildArmed();
  return armedCache;
}

/** A facet's identity: the values of its FACET_MEMBERS, in that order (a member the facet lacks reads null). */
const facetKey = (facet: Facet): string => JSON.stringify(FACET_MEMBERS.map(member => facet[member]));
/** The member set every facet holds, sorted: facet-members compares each facet's own sorted member names to it. */
const FACET_MEMBER_SET: readonly string[] = [...FACET_MEMBERS].sort();
function fieldOf(snapshot: NativeSnapshot, field: UnchangedField): JsonValue {
  if (field === "coverage") return snapshot.coverage ?? null;
  if (field === "statusTone") return snapshot.node.statusTone;
  if (field === "statusText") return snapshot.node.statusText;
  return json(snapshot.evidenceRefs ?? []);
}
/** The armed check: what one reader shows for one fixture, judged against today's projection of the fixture's twin. Every
 * snapshot is read: the four (b) members pair by position (a snapshot one side lacks breaks them), the (c) readings hold on
 * each snapshot, and the whole projection - every snapshot, relation and diagnostic - equals the twin's (projection). Every
 * facet is read too: its own members are exactly FACET_MEMBERS, as a set in any order (facet-members). */
function violationsOf(read: AdmissionReader, fixture: ArmedFixture): Check[] {
  const twin = hyperunixTopology(fixture.twin, CONTEXT);
  let out: AdmittedProjection;
  try {
    out = read(fixture.reading, CONTEXT);
  } catch {
    return ["refused"];
  }
  const failed = new Set<Check>();
  const snapshots = out.topology.snapshots;
  if (fixture.admissions.length === 0 && !fixture.traced && (JSON.stringify(out.topology) !== JSON.stringify(twin) || out.facets.length > 0)) {
    failed.add("byte-identical");
  }
  const paired = Array.from({ length: Math.max(snapshots.length, twin.snapshots.length) }, (_, index) => [snapshots[index], twin.snapshots[index]] as const);
  const moved = ([snapshot, base]: (typeof paired)[number]): boolean =>
    snapshot === undefined || base === undefined || UNCHANGED_FIELDS.some(field => !isDeepStrictEqual(fieldOf(snapshot, field), fieldOf(base, field)));
  if (paired.some(moved)) failed.add("unchanged");
  if (!isDeepStrictEqual(json(out.topology), json(twin))) failed.add("projection");
  const want = fixture.admissions.map(entry => facetKey(facetOf(entry)));
  const got = out.facets.map(facetKey);
  if (!want.every(key => got.includes(key))) failed.add("verbatim");
  if (got.length !== want.length) failed.add("own-facet");
  if (got.some(key => !want.includes(key))) failed.add("synthesized");
  if (out.facets.some(facet => !isDeepStrictEqual(Object.keys(facet).sort(), FACET_MEMBER_SET))) failed.add("facet-members");
  if (fixture.admissions.some(entry => entry.verdict === "rejected")) {
    if (snapshots.some(snapshot => snapshot.node.statusTone === NEVER.statusTone)) failed.add("failure");
    if (snapshots.some(snapshot => snapshot.coverage === NEVER.coverage || snapshot.node.statusText.includes(NEVER.answer))) failed.add("absence");
  }
  if (fixture.traced && JSON.stringify([out.topology, out.facets]).toLowerCase().includes(EVIDENCE_SENTINEL)) failed.add("evidence");
  return CHECKS.filter(check => failed.has(check));
}
/** Each fixture a reader fails, with the checks it fails; an empty object when it fails none. */
async function matrixOf(read: AdmissionReader): Promise<Record<string, Check[]>> {
  const matrix: Record<string, Check[]> = {};
  for (const fixture of await armedFixtures()) {
    const checks = violationsOf(read, fixture);
    if (checks.length > 0) matrix[fixture.name] = checks;
  }
  return matrix;
}
async function bindingViolations(bindings: Readonly<Record<string, AdmissionReader>>): Promise<Record<string, Record<string, Check[]>>> {
  const found: Record<string, Record<string, Check[]>> = {};
  for (const [module, read] of Object.entries(bindings)) {
    const matrix = await matrixOf(read);
    if (Object.keys(matrix).length > 0) found[module] = matrix;
  }
  return found;
}
let fullMatrix: Promise<Record<string, Record<string, Check[]>>> | undefined;
async function buildMatrix(): Promise<Record<string, Record<string, Check[]>>> {
  const matrix: Record<string, Record<string, Check[]>> = {};
  for (const name of Object.keys(READERS)) matrix[name] = await matrixOf(readerOf(name));
  return matrix;
}
function readerMatrix(): Promise<Record<string, Record<string, Check[]>>> {
  fullMatrix ??= buildMatrix();
  return fullMatrix;
}

/** The leaf paths where two JSON values differ (a whole member when one side lacks it). */
function differences(left: JsonValue | undefined, right: JsonValue | undefined, path: Path = []): string[] {
  if (isDeepStrictEqual(left, right)) return [];
  if (Array.isArray(left) && Array.isArray(right) && left.length === right.length) {
    return left.flatMap((item, index) => differences(item, right[index], [...path, index]));
  }
  if (isObject(left) && isObject(right)) {
    const keys = [...new Set([...Object.keys(left), ...Object.keys(right)])].sort();
    return keys.flatMap(key => differences((left as JsonObject)[key], (right as JsonObject)[key], [...path, key]));
  }
  return [pathText(path)];
}

/** The bead's own notes in the tracker export. */
function beadNotes(): string {
  for (const line of textOf(join(REPO, ".beads", "issues.jsonl")).split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.notes === "string") return row.notes;
  }
  return "";
}
/** The acceptance clauses of the notes, by letter, each without its trailing source citation. The notes spell "Acceptance: "
 * twice (the first inside the quoted README.md:69 sentence), so the parser starts at the one that opens clause (a). */
function acceptanceClauses(notes: string): Record<string, string> {
  const start = notes.indexOf("Acceptance: (a) ");
  if (start === -1) return {};
  const end = notes.indexOf(" Not P0:", start);
  const body = notes.slice(start + "Acceptance: ".length, end === -1 ? undefined : end);
  const clauses: Record<string, string> = {};
  for (const match of body.matchAll(/\(([a-z])\) (.*?)(?=; \([a-z]\) |\.$)/gs)) {
    const letter = match[1] ?? "";
    clauses[letter] = (match[2] ?? "").replace(/\s*\([^()]*:\d[^()]*\)$/, "");
  }
  return clauses;
}
/** A row label without its leading clause tag, and the tag's letter. */
function quoteOf(label: string): string {
  return label.replace(/^\([^)]*\) /, "");
}
function letterOf(label: string): string {
  return /^\(([a-z])\) /.exec(label)?.[1] ?? "";
}
/** The filing's own grep sentence ("grep /<pattern>/ over vendored X and Y = 0"): its pattern and its two file names. */
function filingGrep(notes: string): { pattern: string; files: string[] } {
  const match = /grep \/([^/]+)\/ over vendored (\S+) and (\S+) = 0/.exec(notes);
  return match === null ? { pattern: "", files: [] } : { pattern: match[1] ?? "", files: [match[2] ?? "", match[3] ?? ""] };
}
/** The field names the gating-artifact sentence quotes after Law_admission. */
function quotedFields(notes: string): string[] {
  const sentence = /Gating artifact: [^\n]*?Shipped:/.exec(notes)?.[0] ?? "";
  return [...sentence.matchAll(/Law_admission '([^']+)'/g)].map(match => match[1] ?? "");
}
/** The members clause (b) holds unchanged ("; X, Y, Z and W unchanged"). */
function unchangedOf(clause: string): string[] {
  const list = /; ([A-Za-z, ]+) unchanged$/.exec(clause)?.[1] ?? "";
  return list.split(/, | and /).filter(item => item.length > 0);
}
/** The readings clause (c) forbids: the quoted words between "never yields" and its next clause. */
function forbiddenOf(clause: string): string[] {
  const span = /never yields (.*?), and /.exec(clause)?.[1] ?? "";
  return [...span.matchAll(/'([^']+)'/g)].map(match => match[1] ?? "");
}
const basename = (path: string): string => path.slice(path.lastIndexOf("/") + 1);

/** The pins that reached their witness compare, in run order; the last case holds it to every pin. */
const REACHED: string[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const packed = vendoredEntries().get(PACKED_RESULT);
    expect(packed, `${VENDORED_TGZ} packs ${PACKED_RESULT}`).toBeDefined();
    const installed = readFileSync(join(REPO, JUDGED_FILES[0] ?? ""));
    expect(sha256(installed), "the installed result.d.ts is the vendored tarball's bytes").toBe(sha256(packed ?? ""));
    const files = JUDGED_FILES.map(path => {
      const text = textOf(join(REPO, path));
      return { path, text, lines: text.split("\n").length, hits: stemHits(text) };
    });
    for (const file of files) expect(file.lines, `${file.path} was read`).toBeGreaterThan(100);
    const sdkHits = [
      ...files.filter(file => !file.path.startsWith("src/")).flatMap(file => file.hits),
      ...stemHits((packed ?? Buffer.alloc(0)).toString("utf8")).map(hit => `${PACKED_RESULT}:${hit}`),
    ];
    expect(sdkHits, "the vendored result declaration, installed and packed, spells no admission stem (a hit is the gating artifact: re-measure)").toStrictEqual([]);
    const declaration = files[0]?.text ?? "";
    const members: Record<string, string[]> = Object.fromEntries([
      ...DECLARATIONS.map(name => [name, interfaceMembers(declaration, name)]),
      ["ExecutionStatus", variantMembers(declaration)],
    ]);
    for (const [name, list] of Object.entries(members)) expect(list.length, `${name} members were read`).toBeGreaterThan(0);
    const fields = Object.entries(members).flatMap(([name, list]) => list.filter(member => stemHits(member).length > 0).map(member => `${name}.${member}`));
    expect(fields, "no result member is an admission or reason-code field").toStrictEqual([]);
    const flagged = FLAGGED_CONTROLS.filter(control => stemHits(control).length === 0);
    const quiet = QUIET_CONTROLS.filter(control => stemHits(control).length > 0);
    expect(flagged, "every flagged control trips the stem judge").toStrictEqual([]);
    expect(quiet, "every quiet control stays quiet").toStrictEqual([]);
    const filing = filingGrep(beadNotes());
    expect(filing.pattern.length, "the filing's grep pattern was read from the bead row").toBeGreaterThan(0);
    const asWritten = new RegExp(filing.pattern);
    const filingHits = files.map(file => file.text.split("\n").filter(line => asWritten.test(line)).length);
    expect(filingHits, "the filing's grep, run as written, still finds nothing in either file").toStrictEqual([0, 0]);
    const misses = FLAGGED_CONTROLS.filter(control => !asWritten.test(control));
    expect(misses.length, "the filing's grep misses spellings the census flags (the vocabulary finding)").toBeGreaterThan(0);
    const spelling = files.filter(file => file.path.startsWith("src/") && file.hits.length > 0).map(file => file.path);
    const bound = Object.keys(HX_ADMISSION_READERS).sort();
    expect(bound, "a judged src file that spells a stem binds its reader in HX_ADMISSION_READERS, both ways").toStrictEqual(spelling.sort());
    return {
      tarball: sha256(readFileSync(join(REPO, VENDORED_TGZ))),
      resultDeclaration: sha256(installed),
      files: files.map(file => ({ path: file.path, hits: file.hits.length })),
      members,
      controls: { flagged: FLAGGED_CONTROLS.length, quiet: QUIET_CONTROLS.length },
      filing: { pattern: filing.pattern, hitsAsWritten: filingHits, misses },
      bound,
    };
  },
  A2: async () => {
    const base = await invoked(sdkDocument());
    const combos: { kind: string; licensed: boolean; expected: JsonValue }[] = [];
    for (const kind of HYPERUNIX_EXECUTION_KINDS) {
      for (const licensed of [false, true]) combos.push({ kind, licensed, expected: absenceOf(decided(base, kind, licensed)) });
    }
    const licensing = combos.filter(combo => isObject(combo.expected) && combo.expected.absenceLicensed === true).map(combo => `${combo.kind}/${combo.licensed}`);
    expect(licensing, "only a licensed complete kind licenses absence").toStrictEqual(["complete/true", "complete-empty/true"]);
    const source = sourceOf(base);
    expect(objectPaths(source).length, "the walk reached every object node of the source (counted from its JSON text)").toBe(bracesOf(source));
    const leaves = perturbable(source);
    expect(leaves.length, "the perturbation reached the source's primitive members").toBeGreaterThan(20);
    const moved: string[] = [];
    for (const leaf of leaves) {
      const variant = withSource(base, perturbed(source, leaf));
      for (const combo of combos) {
        if (!isDeepStrictEqual(absenceOf(decided(variant, combo.kind, combo.licensed)), combo.expected)) {
          moved.push(`${pathText([...leaf.path, leaf.key])}@${combo.kind}/${combo.licensed}`);
        }
      }
    }
    expect(moved, "no perturbed member moves the absence reading").toStrictEqual([]);
    const tempted: string[] = [];
    const refusals: string[] = [];
    for (const [name, tempt] of Object.entries(TEMPTATIONS)) {
      const variant = withSource(base, tempt(source));
      for (const combo of combos) {
        const got = absenceOf(decided(variant, combo.kind, combo.licensed));
        if (isDeepStrictEqual(got, combo.expected)) continue;
        const projected = isObject(got) ? got.projected : null;
        (typeof projected === "string" && projected.startsWith("refused:") ? refusals : tempted).push(`${name}@${combo.kind}/${combo.licensed}`);
      }
    }
    expect(tempted, "no temptation moves the absence reading").toStrictEqual([]);
    const providerMoved: string[] = [];
    for (const combo of combos) {
      if (!isDeepStrictEqual(absenceOf(await invoked(specDocument(combo))), combo.expected)) providerMoved.push(`${combo.kind}/${combo.licensed}`);
    }
    expect(providerMoved, "the provider path reads every kind and licence as the adapter does").toStrictEqual([]);
    return {
      table: combos.map(combo => json([combo.kind, combo.licensed, combo.expected])),
      leaves: leaves.map(leaf => pathText([...leaf.path, leaf.key])),
      temptations: Object.keys(TEMPTATIONS),
      refusals,
    };
  },
  A3: async () => {
    const base = await invoked(sdkDocument(ONE_ROW));
    const source = sourceOf(base);
    const before = reading(base);
    const bare = reading(withSource(base, { ...source, diagnostics: [] }));
    expect(before.topology.diagnostics, "the adapter's diagnostics are its own derived lines, not the producer's").toStrictEqual(bare.topology.diagnostics);
    const grammar = withSource(base, {
      ...source,
      execution_status: { ...(source.execution_status as JsonObject), diagnostic_code: DIAGNOSTIC_CODE },
      diagnostics: [...(source.diagnostics as JsonValue[]), ...admissionDiagnostics()],
    });
    expect(hyperunixTopology(grammar, CONTEXT), "admission reason codes in the diagnostic grammar: projection strictEqual").toStrictEqual(before.topology);
    expect(judgePlant(base, grammar), "the diagnostic grammar moves nothing and shows nothing").toStrictEqual({ unchanged: true, leaked: [] });
    const positions = objectPaths(base);
    expect(positions.length, "the walk reached every object node of the reading (counted from its JSON text)").toBe(bracesOf(base));
    const failing: string[] = [];
    for (const path of positions) {
      const value = planted(base, path, MEMBER, shapedContent());
      expect(hyperunixTopology(value, CONTEXT), `${pathText(path)}: projection strictEqual`).toStrictEqual(before.topology);
      const plant = judgePlant(base, value);
      if (!plant.unchanged || plant.leaked.length > 0) failing.push(pathText(path));
    }
    expect(failing, "no planted position moves the projection or reaches an output string").toStrictEqual([]);
    const control = judgePlant(base, withSource(base, { ...source, operation: `find CSO-4 ${MEMBER}` }));
    expect(control.leaked, "the leak detector sees a leak through the operation the title shows").not.toStrictEqual([]);
    return { diagnostics: [...before.topology.diagnostics], grammarEntries: admissionDiagnostics().length, positions: positions.map(pathText), control: json(control) };
  },
  A4: async () => {
    const document = sdkDocument(ONE_ROW);
    const twin = await invoked(document);
    const twinSource = sourceOf(twin);
    const positions = objectPaths(twinSource);
    expect(positions.length, "the walk reached every object node the SDK emits (counted from its JSON text)").toBe(bracesOf(twinSource));
    const missing = positions.filter(path => !isObject(nodeAt(document, path)));
    expect(missing.map(pathText), "the base document holds every object node the SDK emits").toStrictEqual([]);
    const facts = Object.values(ADMISSIONS).flatMap(entry => [...entry.profile, ...entry.provider]);
    const evidence = JSON.stringify(TRACE.provider_evidence);
    const survives: Record<string, boolean> = {};
    const check = (label: string, value: JsonValue): void => {
      const text = JSON.stringify(value);
      survives[label] = facts.every(fact => text.includes(fact)) && text.includes(evidence);
      expect(hyperunixTopology(value, CONTEXT), `${label}: projection strictEqual`).toStrictEqual(hyperunixTopology(twin, CONTEXT));
      expect(judgePlant(twin, value), `${label}: nothing moves or shows`).toStrictEqual({ unchanged: true, leaked: [] });
    };
    for (const path of positions) check(pathText(path), await invoked(planted(document, path, MEMBER, shapedContent()) as JsonObject));
    const grammar = sdkDocument({
      ...ONE_ROW,
      execution_status: { ...(document.execution_status as JsonObject), diagnostic_code: DIAGNOSTIC_CODE },
      diagnostics: [...(document.diagnostics as JsonValue[]), ...admissionDiagnostics()],
    });
    const decoded = await invoked(grammar);
    const status = sourceOf(decoded).execution_status;
    expect(status, "the decoder keeps the admission diagnostic code and the kind").toStrictEqual({ kind: "incomplete", diagnostic_code: DIAGNOSTIC_CODE });
    check("$.diagnostics[+] and $.execution_status.diagnostic_code (diagnostic grammar)", decoded);
    return { survives };
  },
  B1: async () => {
    const fixtures = await armedFixtures();
    const deltas: Record<string, string[]> = {};
    for (const fixture of fixtures) {
      deltas[fixture.name] = differences(fixture.reading, fixture.twin);
      expect(admissionsCarriedBy(fixture.reading), `${fixture.name} carries exactly its admission records`).toStrictEqual([...fixture.admissions]);
      expect(tracesCarriedBy(fixture.reading), `${fixture.name} carries exactly its traces`).toStrictEqual(fixture.traced ? [TRACE] : []);
      expect([admissionsCarriedBy(fixture.twin), tracesCarriedBy(fixture.twin)], `${fixture.name}'s twin carries none`).toStrictEqual([[], []]);
      expect(hyperunixTopology(fixture.reading, CONTEXT), `${fixture.name}: today's adapter ignores the carriers`).toStrictEqual(
        hyperunixTopology(fixture.twin, CONTEXT),
      );
      expect(sourceOf(fixture.reading).rows, `${fixture.name} rows []`).toStrictEqual([]);
    }
    const texts = Object.values(ADMISSIONS).flatMap(entry => [entry.law, entry.code, ...entry.profile, ...entry.provider]);
    expect(
      texts.filter(text => shown(text) !== text),
      "every armed text is display-stable under the shared sanitizer",
    ).toStrictEqual([]);
    const projections: Record<string, JsonValue> = {};
    for (const fixture of fixtures) {
      const [snapshot] = hyperunixTopology(fixture.twin, CONTEXT).snapshots;
      expect(snapshot?.node.statusTone, `${fixture.name}'s twin is no failure`).not.toBe(NEVER.statusTone);
      if (fixture.admissions.some(entry => entry.verdict === "rejected")) {
        expect([snapshot?.coverage, snapshot?.node.statusText.includes(NEVER.answer)], `${fixture.name}'s twin reads no absence`).toStrictEqual(["partial", false]);
      }
      const source = sourceOf(fixture.reading);
      const kind = isObject(source.execution_status) ? source.execution_status.kind : null;
      const licensed = isObject(source.coverage_summary) ? source.coverage_summary.licenses_absence : null;
      projections[fixture.name] = json([kind, licensed, snapshot?.coverage ?? null, snapshot?.node.statusTone ?? null, snapshot?.node.statusText ?? null]);
    }
    return { fixtures: fixtures.map(fixture => fixture.name), deltas, projections };
  },
  B2: async () => {
    const matrix = await readerMatrix();
    expect(matrix.honest, "the honest reader passes every fixture").toStrictEqual({});
    const passing = Object.entries(matrix)
      .filter(([name, found]) => name !== "honest" && Object.keys(found).length === 0)
      .map(([name]) => name);
    expect(passing, "every mutant fails at least one fixture").toStrictEqual([]);
    const fired = new Set(Object.values(matrix).flatMap(found => Object.values(found).flat()));
    expect(CHECKS.filter(check => !fired.has(check)), "every armed check fires for some mutant and fixture").toStrictEqual([]);
    const records = Object.values(objectOf(ROSTER.constants.admissions, "roster admissions"));
    expect(
      records.map(record => Object.keys(objectOf(record, "roster admission record")).sort()),
      "FACET_MEMBERS are the members of every admission record the roster holds",
    ).toStrictEqual(records.map(() => FACET_MEMBER_SET));
    const reordered: AdmissionReader = (value, context) => {
      const out = honest(value, context);
      return withFacets(
        out,
        out.facets.map(facet => ({ provider: facet.provider, profile: facet.profile, code: facet.code, verdict: facet.verdict, law: facet.law })),
      );
    };
    expect(await matrixOf(reordered), "a facet's own members in any order meet every check (the quiet control)").toStrictEqual({});
    return json(matrix);
  },
  C1: async () => {
    const matrix = await readerMatrix();
    const fixtures = await armedFixtures();
    const rejected = fixtures.filter(fixture => fixture.admissions.some(entry => entry.verdict === "rejected"));
    expect(rejected.length, "fixtures carry rejected-admission codes").toBeGreaterThan(0);
    const table: Record<string, string[]> = {};
    for (const [name, owed] of Object.entries(REJECTED_MUTANTS)) {
      const found = matrix[name] ?? {};
      const missed = rejected.filter(fixture => !(found[fixture.name] ?? []).includes(owed)).map(fixture => fixture.name);
      expect(missed, `${name} fails ${owed} on every fixture carrying a rejected-admission code`).toStrictEqual([]);
      table[name] = Object.keys(found).sort();
    }
    const scoped = Object.entries(matrix).flatMap(([name, found]) =>
      Object.entries(found)
        .filter(([fixture, checks]) => (checks.includes("failure") || checks.includes("absence")) && !rejected.some(entry => entry.name === fixture))
        .map(([fixture]) => `${name}@${fixture}`),
    );
    expect(scoped, "the rejected-admission checks fire only where a rejected code is carried").toStrictEqual([]);
    return { rejected: rejected.map(fixture => fixture.name), table };
  },
  C2: async () => {
    const fixtures = await armedFixtures();
    const traced = fixtures.filter(fixture => fixture.traced);
    expect(traced.length, "fixtures carry a per-law trace").toBeGreaterThan(0);
    for (const fixture of traced) {
      expect(JSON.stringify(fixture.reading).toLowerCase(), `${fixture.name}: the provider evidence reaches the adapter's input`).toContain(EVIDENCE_SENTINEL);
      expect(JSON.stringify(hyperunixTopology(fixture.reading, CONTEXT)).toLowerCase(), `${fixture.name}: today's projection`).not.toContain(EVIDENCE_SENTINEL);
      expect(JSON.stringify(honest(fixture.reading, CONTEXT)).toLowerCase(), `${fixture.name}: the honest reader`).not.toContain(EVIDENCE_SENTINEL);
    }
    const matrix = await readerMatrix();
    const table: Record<string, Record<string, Check[]>> = {};
    for (const name of TRACE_MUTANTS) {
      const found = matrix[name] ?? {};
      const missed = traced.filter(fixture => !(found[fixture.name] ?? []).includes("evidence")).map(fixture => fixture.name);
      expect(missed, `${name} fails evidence on every traced fixture`).toStrictEqual([]);
      table[name] = found;
    }
    const scoped = Object.entries(matrix).flatMap(([name, found]) =>
      Object.entries(found)
        .filter(([fixture, checks]) => checks.includes("evidence") && !traced.some(entry => entry.name === fixture))
        .map(([fixture]) => `${name}@${fixture}`),
    );
    expect(scoped, "the evidence check fires only where a trace is carried").toStrictEqual([]);
    return json({ traced: traced.map(fixture => fixture.name), table });
  },
  C3: async () => {
    const bound = Object.keys(HX_ADMISSION_READERS).sort();
    const violations = await bindingViolations(HX_ADMISSION_READERS);
    expect(violations, "every bound reader meets the armed check").toStrictEqual({});
    return json({
      bound,
      violations,
      controls: {
        honestOnly: await bindingViolations({ "synthetic/honest": honest }),
        withMutant: await bindingViolations({ "synthetic/honest": honest, "synthetic/failure-on-rejected": readerOf("failureOnRejected") }),
      },
    });
  },
  Q1: async () => {
    const generic = ["verdict", "decision", "outcome", "admitted", "withheld", "accepted", "rejected", "law", "code", "why"];
    const base = await invoked(sdkDocument(ONE_ROW));
    const withheld = generic.map(key => judgePlant(base, planted(base, ["source"], key, json(admissionOf("rejected")))));
    return {
      genericKeyHits: generic.map(key => stemHits(key).length),
      producerVerdictHits: stemHits("Admitted of witness").length,
      withheld: json(withheld),
    };
  },
  Q2: async () => {
    const composed = 'const key = ["reas", "on"].join(""); const other = ["admis", "sion"].join("");';
    return { hits: stemHits(composed).length, composedKeys: [["reas", "on"].join(""), ["admis", "sion"].join("")] };
  },
  Q3: async () => {
    const entries = vendoredEntries();
    const namesakes: Record<string, number[]> = {};
    for (const [name, bytes] of [...entries].sort(([left], [right]) => left.localeCompare(right))) {
      if (!name.endsWith(".d.ts")) continue;
      const lines = stemLines(bytes.toString("utf8"));
      if (lines.length > 0) namesakes[name] = lines;
    }
    const judged = JUDGED_FILES.map(path => `package/${path.replace(/^node_modules\/@hyperunix\/sdk\//, "")}`);
    expect(Object.keys(namesakes).filter(name => judged.includes(name)), "no namesake lies in a judged file").toStrictEqual([]);
    return { declarations: [...entries.keys()].filter(name => name.endsWith(".d.ts")).length, namesakes };
  },
  Q4: async () => {
    const document = sdkDocument(ONE_ROW);
    const twin = await invoked(document);
    const carriedVerbatim: string[] = [];
    for (const path of objectPaths(sourceOf(twin))) {
      const value = await invoked(planted(document, path, MEMBER, shapedContent()) as JsonObject);
      const node = nodeAt(sourceOf(value), path);
      if (isObject(node) && isDeepStrictEqual(node[MEMBER], shapedContent())) carriedVerbatim.push(pathText(path));
      expect(leaksOf(hyperunixTopology(value, CONTEXT)), `${pathText(path)}: the projection shows none of it`).toStrictEqual([]);
    }
    const mixed = (await armedFixtures()).find(fixture => fixture.name === "mixed");
    const traced = (await armedFixtures()).find(fixture => fixture.name === "traced");
    return {
      carriedVerbatim,
      carriers: {
        [CARRIER]: isDeepStrictEqual(extensionsOf(mixed?.reading ?? null)[CARRIER], json(mixed?.admissions ?? [])),
        [TRACE_CARRIER]: isDeepStrictEqual(extensionsOf(traced?.reading ?? null)[TRACE_CARRIER], [TRACE]),
      },
    };
  },
  Q5: async () => {
    const zeroWidth = String.fromCodePoint(0x200b);
    const homoglyph = String.fromCodePoint(0x0430);
    const split = `readonly reas${zeroWidth}onCode: string; readonly law_admis${zeroWidth}sion: string;`;
    const lookalike = `readonly re${homoglyph}sonCode: string; readonly law_${homoglyph}dmission: string;`;
    return { split: stemHits(split).length, lookalike: stemHits(lookalike).map(hit => hit.slice(hit.indexOf(":") + 1)) };
  },
  Q6: async () => {
    const modules = tsBelow(join(REPO, "src")).map(path => relative(REPO, path).split("\\").join("/")).sort();
    const loads = (path: string, pattern: RegExp): boolean => specifiersOf(textOf(join(REPO, path))).some(specifier => pattern.test(specifier));
    const hxModules = modules.filter(path => !JUDGED_FILES.includes(path) && loads(path, /@hyperunix\/sdk|providers\/hyperunix\.js$|\/hyperunix\.js$/));
    const adapterImporters = modules.filter(path => loads(path, /hyperunix-observer\.js$/));
    expect(modules.length, "the src walk reached the modules").toBeGreaterThan(50);
    return { judged: [...JUDGED_FILES], hxModules, adapterImporters };
  },
  Q7: async () => {
    const embedded: Admission = { ...admissionOf("rejected"), provider: ["hx.fs/builtin: support PROVIDER-EVIDENCE-SENTINEL-41d7 was checked (CSO-10)"] };
    const twinDocument = specDocument({ kind: "incomplete", licensed: false });
    const document = carried(twinDocument, [embedded], false);
    const fixture: ArmedFixture = { name: "embedded", document, reading: await invoked(document), twin: await invoked(twinDocument), admissions: [embedded], traced: false };
    const out = honest(fixture.reading, CONTEXT);
    return { facetCarriesSentinel: JSON.stringify(out.facets).toLowerCase().includes(EVIDENCE_SENTINEL), violations: violationsOf(honest, fixture) };
  },
};

describe("wb-z3ft.3 HX admission-reason census (HX-CERTIFIED-STRUCTURAL-OPTIMIZATION-R3)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:2", "C:3", "Q:7"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(
      json({
        programPin: PROGRAM_PIN,
        vendoredTarball: VENDORED_TGZ,
        judgedFiles: JUDGED_FILES,
        stems: STEMS,
        declarations: DECLARATIONS,
        flaggedControls: FLAGGED_CONTROLS,
        quietControls: QUIET_CONTROLS,
        unchangedFields: UNCHANGED_FIELDS,
        never: NEVER,
        admissions: ADMISSIONS,
        trace: TRACE,
        member: MEMBER,
        diagnosticCode: DIAGNOSTIC_CODE,
        carrier: CARRIER,
        traceCarrier: TRACE_CARRIER,
        facetLimit: FACET_LIMIT,
        facetMembers: FACET_MEMBERS,
        fixtures: FIXTURE_SPECS,
        checks: CHECKS,
        readers: Object.keys(READERS),
        rejectedMutants: REJECTED_MUTANTS,
        traceMutants: TRACE_MUTANTS,
        temptations: Object.keys(TEMPTATIONS),
        residuals: RESIDUALS,
      }),
    ).toStrictEqual({ programPin: ROSTER.programPin, ...ROSTER.constants });
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.flatMap(row => row.pins), `${member} is a judged pin`).toContain(member);
    expect([...Object.keys(REJECTED_MUTANTS), ...TRACE_MUTANTS].filter(name => !Object.hasOwn(READERS, name)), "every held mutant is a reader").toStrictEqual([]);
  });

  it("the outside anchors: the bead's own row binds the row labels, the judged files, the stems, the unchanged members and the forbidden readings", () => {
    const notes = beadNotes();
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    const clauses = acceptanceClauses(notes);
    expect(Object.keys(clauses), "the bead states acceptance clauses").not.toStrictEqual([]);
    const judgedRows = ROWS.filter(row => row.id !== "Q");
    for (const row of judgedRows) expect(clauses[letterOf(row.label)], `row ${row.id} quotes its acceptance clause exactly`).toBe(quoteOf(row.label));
    for (const [letter, clause] of Object.entries(clauses)) {
      expect(
        judgedRows.filter(row => letterOf(row.label) === letter && quoteOf(row.label) === clause).map(row => row.id),
        `clause (${letter}) is quoted by exactly one row`,
      ).toHaveLength(1);
    }
    const filing = filingGrep(notes);
    expect(filing.files, "the judged files are the two of the filing's grep sentence").toStrictEqual(JUDGED_FILES.map(basename));
    expect([...filing.pattern.split("|"), ...quotedFields(notes)], "STEMS are the filing's grep alternatives and the quoted field").toStrictEqual(STEMS);
    expect(unchangedOf(clauses.b ?? ""), "UNCHANGED_FIELDS are the members clause (b) holds unchanged").toStrictEqual([...UNCHANGED_FIELDS]);
    expect(forbiddenOf(clauses.c ?? ""), "NEVER holds the readings clause (c) forbids, in its order").toStrictEqual(Object.values(NEVER));
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", ({ task }) => {
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
    const read = (entry: (typeof walked)[number]): string =>
      `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
