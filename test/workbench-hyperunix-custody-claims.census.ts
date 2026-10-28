/**
 * wb-tz2.11 (HX-ORIGINAL-GOALS-CLOSURE-R11), STANDING LEG ONLY, cut #2: the run pin of the HyperUnix custody claims, judged in wb-u62
 * REPORT MODE. It carries the "stay green" half of the acceptance row "Standing: the custody tests stay green and claim only call-custody,
 * never real-child termination." judge() (test/helpers/census.ts) reads the gate's own test report (DEFAULT_TIER_REPORT, written by
 * the test step) and never re-executes the tier; the .census.ts suffix keeps this file out of the report it judges.
 *
 * Pinned by exact title under the exact describe path, each collected once, passed in the test tier's report and asserting:
 *   - the three cases of the "HyperUnix SDK custody" suite of test/workbench-provider-lifecycle.test.ts, the custody tests the
 *     bead's rationale names (close-once on the first, abort-dispose and close after abort on the third; the second is the same
 *     suite's incomplete-coverage case). They are never re-tested, edited or mocked here: this leg only asks that each still ran,
 *     passed and asserted in the gate's report, so a skip, a todo, a fails inversion, a rename, a deletion or an exit before the
 *     first assertion reds here, naming the case;
 *   - every case of the claims census test/workbench-hyperunix-custody-claims.test.ts (its rows, calibrations, residual rows and
 *     records row), so a collection-time skip of that census (a skipped describe, or its cases rebound to a skipping variant),
 *     which no row inside it can see, reds here.
 * The claims census holds this file to its own rows (its C9: these literals name the custody suite, every frozen custody case, the
 * census's suite and every census case), so neither file is edited alone. A liveness row proves the judge is not accept-all.
 *
 * Display paths added: none. Test-only: spawns nothing, writes nothing, reads the report and the pinned sources.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge, type PinVerdict } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
/** judge() reads each pinned file's whole import closure: a loaded gate host needs far more than vitest's 5000 ms default. */
const JUDGE_TIMEOUT = 240_000;

const LIFECYCLE = "test/workbench-provider-lifecycle.test.ts";
const CUSTODY_SUITE = "HyperUnix SDK custody";
/** The custody suite's cases, exact titles as registered, in registration order. */
const CUSTODY_CASES: readonly string[] = [
  "delegates binary selection to SDK PATH discovery and enforces read grants",
  "preserves incomplete native coverage instead of inventing absence",
  "closes an SDK client when abort fires during asynchronous open, before find",
];

const CENSUS = "test/workbench-hyperunix-custody-claims.test.ts";
const CENSUS_SUITE = "wb-tz2.11 HyperUnix custody-claims census (HX-ORIGINAL-GOALS-CLOSURE-R11, standing leg)";
/** The claims census's cases, exact titles as registered, in registration order. */
const CENSUS_CASES: readonly string[] = [
  "frozen shape: every table the census judges or reads with is exactly its frozen literal",
  "matcher: every vocabulary term is found in each case fold and separator spelling, every near miss stays quiet, and every signal name node:os knows on this platform is a W2 term",
  "C1 cases: the HyperUnix SDK custody suite holds exactly the three frozen cases, in order, with their ordered assertion signatures, each registration a bare title-and-callback call with a parameterless callback, no suite nested inside, and the vitest registrars declared only by their import",
  "C1 custody map: every lifecycle-call assertion of the suite is claimed by exactly one CUSTODY pin, and every claimed lifecycle call is one the provider makes",
  "C1 calibration: a chained member, an options object, a test-context parameter, a nested suite and a re-bound registrar or SDK binding each change the C1 reading",
  "C2 call custody only: every assertion is a mock-call assertion on a const stand-in or an outcome assertion on the provider's own result (a direct provider or registry call, or a const binding of one used only as an expect subject), with no re-bound or module-mocked provider, SDK or registry and no spy or global stub beside HyperUnix.open",
  "C2 calibration: a reassigned or let-bound subject, a re-declared or mutated subject, a stand-in registration on the registry, a module mock of the provider and a global spy each read as a violation",
  "C3 stand-in clients only: every case stubs the SDK's own HyperUnix.open import with a mocked return before it drives the provider",
  "C4 no termination claim: the suite's titles, every comment attached to or inside its statement, every string, template and regular-expression literal and identifier word inside it, and every HX-naming comment of the file carry no vocabulary term",
  "C4 calibration: the same collector finds the termination claim of every RF case whose stand-in child ignores SIGTERM, a JSDoc attached before the suite, a regular-expression literal, an identifier word, an HX-naming comment elsewhere and a word split by a zero-width character, and every termination word of the RF titles and the SDK's own prose is a vocabulary term",
  "C5 Pi delegates: the HyperUnix provider disposes on abort and closes in finally, carries no falsifier shape, names no signal and names the child_process module in no literal",
  "C5 calibration: a dynamic import or created require of child_process, a signals constant, a destructured pid with an element-key kill and a direct kill each read in the provider reading as what they are",
  "C6 SDK-owned termination: in the installed SDK transport the group-killing functions are exactly runHx and streamHx, the abort listener of each reaches its group kill through the function's own closures, and every signal it or the RF provider sends is a vocabulary term",
  "C6 calibration: an SDK copy whose abort listeners no longer reach the group kill reads unreached, and an alias, call or bind hop still reads reached",
  "C7 no hand-rolled kill falsifier: no test or qa file that loads an HX module, invokes hyperunix.find or uses the HYPERUNIX_HX override carries a kill read, a pid read, a process-table probe or ESRCH in any form F1-F4 reads",
  "C7 calibration: the detector finds the SDK transport's and the RF provider's kill code and every planted member in its own shape and form, and the classifier classes each driving form but never a capability-id or override data literal, a module mock or a type position alone",
  "C8 docs: every docs/workbench page, read as marked renders it and a browser shows it, is a modelled page with no clause pairing the HX side with a vocabulary term unless it names the upstream HXGC-OPS-002 artifact",
  "C8 calibration: the same view finds an RF termination clause in the frozen TRACEABILITY.md and HX clauses across the docs, reads every planted page exactly as a browser shows it, and refuses an unmodelled element or a hiding attribute",
  "C9 run pin: the run pin's literals name the HX suite, every frozen case title, this file's suite and every case of this file, and each residual row's title is its RESIDUALS entry",
  "R-WORDING (C4 C8): a termination claim worded outside the vocabulary, or split across a literal concatenation, reads quiet",
  "R-UNANCHORED (frozen shape): a coordinated hollow of a vocabulary term no outside anchor holds, or of an instrument or calibration table member whose own literals are its only anchor, stays green",
  "R-SHAPELESS (C7): a falsifier written without the four shapes (a timing deadline, a poll of an SDK counter, a ChildProcess state read, a process package called under another name) reads quiet",
  "R-COMPOSED (C5 C7): a kill or pid name, a /proc path, a tool, ESRCH, a signal or the child_process module assembled at run time, escaped or spelled through a class inside a regular expression, or reached through a computed key reads quiet",
  "R-ERRNO (C7): ESRCH by its errno number reads quiet",
  "R-UNDRIVEN (C7): a falsifier in a test or qa file that loads no HX module, invokes no hyperunix.find and uses no HYPERUNIX_HX override is not judged",
  "R-ARGUMENTS (C1 C2): C1 freezes each assertion's subject and chain, not its arguments, so a vacuous argument reads quiet",
  "R-RUNTIME (C1 C2 C3): an exit before the first assertion is the run pin's to see; the static rows read quiet",
  "R-DEAD-PATH (C6): a group kill the abort listener reaches syntactically behind a dead branch or an early return reads reached",
  "R-CLAUSE (C8): a claim whose HX side and term fall in different clauses reads quiet",
  "R-CITATION (C8): a clause naming HXGC-OPS-002 is trusted (the on-landing census judges the citation)",
  "R-REFERENCE (C8): a named character reference beyond the six reads as written (none spells a vocabulary letter, but a space or format reference such as &ensp; or &shy; can split a term)",
  "R-LOOKALIKE (C4 C8): a look-alike letter from another script reads as itself",
  "R-ATTRIBUTE (C8): attribute text a browser can show (a link title, an image alt) is not read",
  "R-SCOPE (C8): a page outside docs/workbench is not read",
  "R-DETACHED-COMMENT (C4): a comment outside the suite's statement that names no HX side reads quiet",
  "records: every residual row ran its own case to its end",
];

function pinsOf(file: string, suite: string, titles: readonly string[]): CasePin[] {
  return titles.map(title => ({ file, title, suite: [suite], tier: DEFAULT_GATE_TIER }));
}
/** Each verdict that is not ok, or not collected exactly once, as its own attribution (the why names the title and the cause). */
function refusals(verdicts: readonly PinVerdict[]): string[] {
  return verdicts.filter(verdict => !verdict.ok || verdict.cases !== 1).map(verdict => `${verdict.pin.title} [${verdict.code}, cases ${verdict.cases}]: ${verdict.why}`);
}

describe("wb-tz2.11 HyperUnix custody run pin: the custody cases and the claims census, judged from the gate's own test report", () => {
  it("frozen shape: three custody cases and thirty-six census cases, every title distinct", () => {
    expect({ custody: CUSTODY_CASES.length, census: CENSUS_CASES.length, distinct: new Set([...CUSTODY_CASES, ...CENSUS_CASES]).size }).toStrictEqual({
      custody: 3,
      census: 36,
      distinct: 39,
    });
  });

  it("stay green: each HyperUnix SDK custody case was collected once, passed in the test tier's report and asserts", { timeout: JUDGE_TIMEOUT }, () => {
    const verdicts = judge(REPORT, pinsOf(LIFECYCLE, CUSTODY_SUITE, CUSTODY_CASES));
    expect({ judged: verdicts.length, refused: refusals(verdicts), codes: verdicts.map(verdict => `${verdict.code}:${verdict.cases}`) }).toStrictEqual({
      judged: CUSTODY_CASES.length,
      refused: [],
      codes: CUSTODY_CASES.map(() => "ok:1"),
    });
  });

  it("R-ALL-SKIP: every case of the claims census was collected once, passed in the test tier's report and asserts", { timeout: JUDGE_TIMEOUT }, () => {
    const verdicts = judge(REPORT, pinsOf(CENSUS, CENSUS_SUITE, CENSUS_CASES));
    expect({ judged: verdicts.length, refused: refusals(verdicts), codes: verdicts.map(verdict => `${verdict.code}:${verdict.cases}`) }).toStrictEqual({
      judged: CENSUS_CASES.length,
      refused: [],
      codes: CENSUS_CASES.map(() => "ok:1"),
    });
  });

  it("liveness: a title the report cannot hold is red, naming it (an accept-all judge cannot pass here)", { timeout: JUDGE_TIMEOUT }, () => {
    const [verdict] = judge(REPORT, [{ file: LIFECYCLE, title: "Z9 no such custody case", suite: [CUSTODY_SUITE], tier: DEFAULT_GATE_TIER }]);
    expect({ ok: verdict?.ok, code: verdict?.code, named: verdict?.why.includes("Z9 no such custody case") }).toStrictEqual({ ok: false, code: "absent", named: true });
  });
});
