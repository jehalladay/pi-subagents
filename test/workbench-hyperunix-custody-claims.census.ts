/**
 * wb-tz2.11 (HX-ORIGINAL-GOALS-CLOSURE-R11), STANDING LEG ONLY, cut #4: the run pin of the HyperUnix custody claims, judged in wb-u62
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
 * EXACT COLLECTION (cut #3; the census's R-HELPER-REGISTRATION residual names this row): the report's assertion results for the
 * lifecycle file whose describe path starts with the custody suite's title are exactly the three frozen cases, in order, each
 * under that suite alone - so a case registered there by any route the static census cannot read (a helper called from the
 * suite, a registrar reached outside the file's vitest bindings) or a nested suite reds here.
 * The claims census holds this file to its own rows (its C9: these literals name the custody suite, every frozen custody case, the
 * census's suite and every census case), so neither file is edited alone. A liveness row proves the judge is not accept-all.
 *
 * Display paths added: none. Test-only: spawns nothing, writes nothing, reads the report and the pinned sources.
 */
import { existsSync, readFileSync, realpathSync } from "node:fs";
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
  "C1 cases: the HyperUnix SDK custody suite's own call registers, read through the file's vitest registrar bindings, exactly the three frozen cases, in order, with their ordered assertion signatures; each registration there is a bare title-and-callback call with a parameterless callback, no suite is nested there and no registrar call there has a computed title; file-wide, every vitest import binds its own name (no alias, no namespace import), registrars are used only as callee heads, expect only as a callee or a member's object and vi only as a member's object; and describe, it, expect, vi, HyperUnix, the provider entries and CapabilityRegistry are declared only by their own import",
  "C1 custody map: every lifecycle-call assertion of the suite is claimed by exactly one CUSTODY pin, and every claimed lifecycle call is one the provider makes",
  "C1 calibration: a chained member, an options object, a test-context parameter, a nested suite, a namespace registrar member, an aliased registrar's extra case, an aliased expect, expect, vi or a registrar used as a value, a computed title and a re-bound registrar or SDK binding each change the C1 reading",
  "C2 call custody only: every assertion in the suite sits in one of its cases and is a mock-call assertion on a const stand-in or an outcome assertion on the provider's own result (a direct provider or registry call, or a const binding of one used only as an expect subject); no BOUND name is re-bound; no call whose callee chains (literal or const-bound keys, every const alias, globalThis dropped) hold a MODULE_MOCKS name (mock or doMock on vi or on vitest) names a specifier value that resolves to the provider, the registry or the SDK package; and the file holds no vi.spyOn beside vi.spyOn(HyperUnix, \"open\"), no vi.stubGlobal, vi.useFakeTimers or vi.setSystemTime call, no reference to one of those callees, a MUTATORS call or a module mock other than as a callee (a destructured alias included), and no assignment (every destructuring-pattern target included), for-in or for-of target, delete, update or Object / Reflect mutator call on a chain rooted at a global (a platform global name even where a local elsewhere shadows it) or an import binding outside process.env",
  "C2 calibration: a reassigned, let-bound, re-declared or mutated subject, a stand-in registration on the registry, a module mock of the provider or registry through its .js or .ts specifier, an import() argument or a const-bound callee key, a file-level, in-case or aliased spy, a spy whose method name a twice-declared const spells, a global assigned or forged and restored (plainly, by array or object destructuring assignment, through a for-of target, through globalThis.Object.assign or a const alias of Object), an aliased global, a global shadowed by a local elsewhere, an alias whose name an earlier const also declares, a mutator call, fake timers, a patched import member, an assertion in a hook of the suite, a spy through call and an aliased, destructured, destructuring-assigned or rest-destructured mutator each read as a violation, and an environment write reads as none",
  "C3 stand-in clients only: every case's callback holds, as a top-level statement before the first top-level statement that references a provider entry, a vi.spyOn(HyperUnix, \"open\") call with a mocked return, no case calls a STUB_UNDOS member or an ALL_UNDOS restore, and HyperUnix is the file's import from @hyperunix/sdk",
  "C3 calibration: a stub nested in a closure or a branch, a stub after the provider call and a provider entry referenced through an alias before the stub each read as not stubbed first, and a restore in the case reads as undone",
  "C4 no termination claim: the suite's titles, every comment attached to or inside its statement, every string, template and regular-expression literal (escapes decoded) and identifier word inside it, and every HX-naming comment of the file carry no vocabulary term once Default_Ignorable code points are dropped",
  "C4 calibration: the same collector finds the termination claim of every RF case whose stand-in child ignores SIGTERM, a JSDoc attached before the suite, a regular-expression literal plain or escaped, an identifier word, an HX-naming comment elsewhere and a word split by a zero-width space or a combining grapheme joiner, and every termination word of the RF titles and the SDK's own prose is a vocabulary term",
  "C5 Pi delegates: the HyperUnix provider disposes from its abort listener and awaits close in its finally block, carries none of C7's F1-F4 shapes, names no signal as a SIG* literal or identifier and names the child_process module in no string or template literal",
  "C5 calibration: a dynamic import or created require of child_process, a signals constant, a destructured pid with an element-key kill and a direct kill each read in the provider reading as what they are",
  "C6 SDK-owned termination: in the installed SDK transport the functions holding a group kill as process.kill(-<x>.pid, ...) are exactly runHx and streamHx, the abort listener of each reaches its group kill through the function's own closures, and every string signal argument of a kill call in it or the RF provider is a vocabulary term",
  "C6 calibration: an SDK copy whose abort listeners no longer reach the group kill reads unreached, and an alias, call or bind hop still reads reached",
  "C7 no hand-rolled kill falsifier: no test or qa file whose text, raw or unescaped, holds the needle hyperunix (any case) and that the classifier's driving forms class as driving HX (a value import, export or import-equals of an HX module, a LOADERS call whose specifier is a literal or const-bound - every const declaration of its name read, fail-closed - a hyperunix.find invoke, or a HYPERUNIX_HX override form) carries an F1-F4 shape in a form the header enumerates, a wrapped command read fail-closed past its wrapper",
  "C7 calibration: the detector finds the SDK transport's and the RF provider's kill code and every planted member, refusal #1's, #2's and #3's among them, in its own shape and form, and the classifier classes each driving form, a const-bound, const-shadowed, escaped or node_modules-path specifier and an env-call override among them, each passing the prefilter, but never a capability-id or override data literal, a module mock, a type-only import or a type position alone",
  "C8 docs: every .md page under docs/workbench, read in the header's view of what marked renders and a browser shows (comments, tags and Default_Ignorable code points render nothing, character references decode, units split into clauses), is a modelled page with no clause pairing the HX side with a vocabulary term unless it names the upstream HXGC-OPS-002 artifact",
  "C8 calibration: the same view finds an RF termination clause in the frozen TRACEABILITY.md and HX clauses across the docs, reads every planted page exactly as the view models it (a combining grapheme joiner, its reference and a variation selector render nothing, a Hangul filler renders a blank), and refuses an unmodelled element or a hiding attribute",
  "C9 run pin: the run pin's literals name the HX suite, every frozen case title, this file's suite and every case of this file, and each residual row's title is its RESIDUALS entry",
  "R-WORDING (C4 C8): a termination claim worded outside the vocabulary, or split across a literal concatenation or a template substitution, reads quiet",
  "R-UNANCHORED (frozen shape): a coordinated hollow of a vocabulary term no outside anchor holds, or of an instrument or calibration table member whose own literals are its only anchor, stays green",
  "R-SHAPELESS (C7): a falsifier written without the four shapes (a timing deadline, a poll of an SDK counter, a ChildProcess state read, a process package called under another name) reads quiet",
  "R-COMPOSED (C4 C5 C7): a kill or pid name, a /proc path, a tool, ESRCH, a signal or the child_process module assembled at run time, escaped or spelled through a class inside a regular expression, or reached through a computed key reads quiet, and so does a vocabulary term spelled through a class inside a regular expression in the suite",
  "R-ERRNO (C7): ESRCH by its errno number reads quiet",
  "R-UNDRIVEN (C7): a falsifier in a test or qa file that imports HX modules only by type or not at all, invokes no hyperunix.find and uses no HYPERUNIX_HX override is not judged",
  "R-ARGUMENTS (C1 C2): C1 freezes each assertion's subject and chain, not its arguments, so a vacuous argument reads quiet",
  "R-RUNTIME (C1 C2 C3): an exit before an assertion reads quiet in the static rows: before a case's first assertion the run pin sees it, and between two assertions no row does (judge() needs one assertion reached)",
  "R-DEAD-PATH (C5 C6): a dispose, close or group kill reached syntactically behind a dead branch or an early return reads made",
  "R-CLAUSE (C8): a claim whose HX side and term fall in different clauses reads quiet",
  "R-CITATION (C8): a clause naming HXGC-OPS-002 is trusted (the on-landing census judges the citation)",
  "R-REFERENCE (C8): a named character reference beyond the six reads as written (none spells a vocabulary letter, but a space or format reference such as &ensp; or &shy; can split a term)",
  "R-LOOKALIKE (C4 C8): a look-alike letter from another script reads as itself",
  "R-ATTRIBUTE (C8): attribute text a browser can show (a link title, an image alt) is not read",
  "R-SCOPE (C8): a page outside docs/workbench is not read",
  "R-DETACHED-COMMENT (C4): a comment outside the suite's statement that names no HX side reads quiet",
  "R-WRAPPER (C7): a process-table tool run through a word outside WRAPPERS, SHELL_KEYWORDS and SHELLS, by a script file a shell runs, or inside another language's inline program reads quiet",
  "R-INDIRECT (C2 C7): a module specifier, override name, capability id or member name reached through anything but a literal or a const binding chain to one (a let binding, an object member, a parameter, an imported binding), a loader, invoke or environment call reached through call, apply or Reflect.apply, or a module named through a configured alias (package imports, a vitest alias) reads quiet",
  "R-DATA-OVERRIDE (C7): the HYPERUNIX_HX name passed only as data (an array or entries element, an argument of a call outside ENV_CALLS and ENV_METHODS) classes nothing",
  "R-DEFINITION (C7): a kill or pid named only as a defined key (an object-literal property, a method, a class or type member) is no read and reads quiet",
  "R-ELSEWHERE (C2): a stub or module mock installed outside the lifecycle file (a setup file, the vitest config, a module the file imports) is not read",
  "R-HELPER-REGISTRATION (C1): a case registered through a function called from the suite is outside C1's static reading (the run pin's exact-collection row reads the report)",
  "R-GROUP-FORM (C6): a group kill spelled other than process.kill(-<x>.pid, ...) is not read",
  "R-BIDI (C8): text a browser lays out right to left (a bdo element, a dir attribute, or a run of bidi controls, which the view drops as Default_Ignorable) is read in its logical order, so a claim stored reversed reads quiet",
  "records: every residual row ran its own case to its end",
];

function pinsOf(file: string, suite: string, titles: readonly string[]): CasePin[] {
  return titles.map(title => ({ file, title, suite: [suite], tier: DEFAULT_GATE_TIER }));
}
/** Each verdict that is not ok, or not collected exactly once, as its own attribution (the why names the title and the cause). */
function refusals(verdicts: readonly PinVerdict[]): string[] {
  return verdicts.filter(verdict => !verdict.ok || verdict.cases !== 1).map(verdict => `${verdict.pin.title} [${verdict.code}, cases ${verdict.cases}]: ${verdict.why}`);
}
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isStrings = (value: unknown): value is string[] => Array.isArray(value) && value.every(entry => typeof entry === "string");
const real = (path: string): string => (existsSync(path) ? realpathSync(path) : path);
/** The report's assertion results for one file, each as its describe path and title (vitest's JSON reporter shape), and whether the report records this run pin. */
function collected(file: string): { readonly found: boolean; readonly judging: boolean; readonly cases: readonly { readonly path: readonly string[]; readonly title: string }[] } {
  const report: unknown = JSON.parse(readFileSync(REPORT, "utf8"));
  const results = isRecord(report) && Array.isArray(report.testResults) ? report.testResults.filter(isRecord) : [];
  const named = (target: string) => results.find(entry => typeof entry.name === "string" && real(entry.name) === real(join(ROOT, target)));
  const module = named(file);
  const assertions = module !== undefined && Array.isArray(module.assertionResults) ? module.assertionResults.filter(isRecord) : [];
  return {
    found: module !== undefined,
    judging: named("test/workbench-hyperunix-custody-claims.census.ts") !== undefined,
    cases: assertions.flatMap(entry => (isStrings(entry.ancestorTitles) && typeof entry.title === "string" ? [{ path: entry.ancestorTitles, title: entry.title }] : [])),
  };
}

describe("wb-tz2.11 HyperUnix custody run pin: the custody cases and the claims census, judged from the gate's own test report", () => {
  it("frozen shape: three custody cases and 45 census cases, every title distinct", () => {
    expect({ custody: CUSTODY_CASES.length, census: CENSUS_CASES.length, distinct: new Set([...CUSTODY_CASES, ...CENSUS_CASES]).size }).toStrictEqual({
      custody: 3,
      census: 45,
      distinct: 48,
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

  it("exact collection: the report records, for the lifecycle file, exactly the three frozen custody cases under a describe path starting with the custody suite's title, in order, each under that suite alone", { timeout: JUDGE_TIMEOUT }, () => {
    const reading = collected(LIFECYCLE);
    expect({
      found: reading.found,
      judging: reading.judging,
      custody: reading.cases.filter(entry => entry.path[0] === CUSTODY_SUITE).map(entry => [...entry.path, entry.title].join(" > ")),
    }).toStrictEqual({ found: true, judging: false, custody: CUSTODY_CASES.map(title => `${CUSTODY_SUITE} > ${title}`) });
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
