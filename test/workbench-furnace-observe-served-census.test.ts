/**
 * wb-g20x (the rule-19 structural-exit child of wb-40zp; rulings R-B163, R-B208 and R-B248), the furnace_observe SERVED census:
 * what the tool pi serves under the name furnace_observe replies to five pinned calls, read at run time through the tool
 * registry the boot harness keeps, and never through the source text of a registration. wb-40zp's final cut #4 (4c1368f1, not
 * on trunk) defers two readings here in its NOT CLAIMED sentence: which execute pi serves under the name furnace_observe, and
 * what the two literal refusals say and what the error reply is handed. Statement (the bead's tracker-export title,
 * verbatim): "R694 follow-up from wb-40zp (rule-19 structural exit): the R-B163-frozen reader class gets member witnesses or
 * named-residual status". Acceptance (the export description, verbatim): "per surviving member, a witness that reds the
 * delivered census under the member while reading clean under trunk, or the member documented as a NAMED residual with the
 * claims narrowed to the proven subset; claims no wider than pins (rule 16 LEG 2, R514/R515/R668)." Cut #2 answers this bead's
 * own refusal #1 (O:1772): each claim word that refusal names is held by a case that reds under its gate probe (MEMBERS).
 * Cut #3 answers refusal #2 (O:1825), whose record reads the class refusal #1 guarded (the served reader's own claim words)
 * re-failing through new members, so rule 19(c) freezes it, in the ENUMERATE-THE-RESOLVABLE form: this header claims exactly
 * the pinned set (THE PINNED READER SET, J2 PINNED FORMS and CLAIMS), every known member of the frozen class is pinned so the
 * census reds under it (MEMBERS), a form no case writes is NOT CLAIMED, and RESIDUALS names each known escape within the
 * claims with its pinned quiet row.
 *
 * THE READER is test/helpers/furnace-observe-served-reader.ts, whose header is the reading of record. In one line: pi's
 * extension loader keys an extension's tools by tool.name and the last registration wins, so the census reads the served tool
 * where the boot harness keys it the same way (K1), and reads its replies by calling it.
 *
 * THE PINNED READER SET (this file, test/workbench-furnace-observe-served-census.test.ts; each case title opens with its id and
 * the ROWS it holds; 17 cases, registered in this order):
 * - J0 [registered]: target recordRegistrations on a stub registerTool; observed: every value reaches the stub unchanged and in
 *   order, each return value comes back, and the names read are exactly J0_NAMES, a property read of each value (a nameless
 *   object, a primitive and null read undefined, an anonymous function reads "", and a named function, an array's own name
 *   and an inherited name read theirs); a name behind a getter is read once per registration; a wrapper installed over the
 *   recorder that calls it reaches the stub through it, and the recorder reads the name the wrapper hands on; and each name
 *   is appended before its value reaches the stub (a stub that reads the recorder's list as it is called).
 * - J1 [registered]: target judgeRegistrations over the nine J1 fixtures; observed: each fixture's findings, exactly.
 * - J2 [grant, identity, data, error]: target judgeReply over the 72 J2 fixtures; observed: each fixture's findings, exactly.
 *   The forms the fixtures write are J2 PINNED FORMS below; the census claims the judge's reading at those forms and at no
 *   other.
 * - S0 [registered, grant, identity, data, error]: target isServedTool over the S0 fixtures; observed: true for an object whose
 *   execute is a function (own, async, inherited, a class method, on a null-prototype object), false for an object without
 *   one or whose execute is a string or an object, and false for an array or a function holding a function execute, null,
 *   undefined and a string.
 * - B0 [registered, grant, identity, data, error]: target bootServed over two planted factories in place of the real one;
 *   observed: the recorder reads the factory's own registration and then those of the session_start handler, which runs once,
 *   awaited, with {} and a context whose cwd (as realpath reads it) is the boot's sandbox, whose .pi/subagents.json holds the
 *   header's settings with the boot's grants; serves is true for the object tools registered and false for an array tool and
 *   an absent name; call resolves to what the served execute returns and calls it as execute("census", params, undefined,
 *   undefined, that context); and an array tool under furnace_observe is registered and not served, so call throws.
 * - K1 [registered, grant, identity, data, error]: target a fresh harness pi and pi's loader source; observed: of two tools
 *   registered under one name the harness serves the second, a tool of another name is kept apart, and loader.js holds one
 *   extension.tools.set site, `extension.tools.set(tool.name, {` with `definition: tool,`, inside its registerTool method.
 * - I1 [data, error]: target the census's instrument; observed: while installed, the fake is the first furnace on PATH and,
 *   after restore, it is not; a command no answer names exits 2 with nothing on stdout; Date reads FIXED_NOW inside
 *   atFixedDate and the real clock after it; the census's own observer reads the complete Run with
 *   completeness "complete" and the partial Run with "partial", each stamped FIXED_NOW, each with source.producerVersion
 *   holding INVISIBLE, which JSON.stringify of the reading keeps and sanitizeWorkbenchJsonText of it does not; and it rejects
 *   the failing Run with an Error whose message is FAILING_MESSAGE, a text sanitizeWorkbenchText leaves unchanged.
 * - C0 [registered]: target bootServed([]) and bootServed(["furnace:inspect"]); observed: C0 boots once without the grant and
 *   then once with it; each boot's <sandbox>/.pi/subagents.json reads the reader header's settings with that boot's grants;
 *   judgeRegistrations(received, "furnace_observe") is [] for each, and each serves an execute under that name.
 * - C1 [grant]: target the served execute of bootServed([]) called with { runId: "frn-run-census-grant" }; observed:
 *   judgeReply(result, REFUSALS.grant) is [].
 * - C2 [identity]: target the served execute of bootServed(["furnace:inspect"]) called with { runId: "census-not-a-run" };
 *   observed: judgeReply(result, REFUSALS.identity) is [].
 * - C3 [data]: target the same boot's served execute called with { runId: "frn-run-census-complete" } while the fake plays the
 *   complete Run, under atFixedDate; observed: judgeReply(result, sanitizeWorkbenchJsonText(R)) is [], where R is the census
 *   observer's reading of the same Run under the same fixed Date, and R's completeness is "complete".
 * - C4 [data]: the same for { runId: "frn-run-census-partial" } and the partial Run; R's completeness is "partial".
 * - C5 [error]: the same boot's served execute called with { runId: "frn-run-census-failing" } while the fake plays the failing
 *   Run; observed: judgeReply(result, sanitizeWorkbenchText(M)) is [], where M is the message of the Error the census
 *   observer rejects the same Run with.
 * - A0 []: target sourceAnchors over the 28 A0 fixtures (planted texts); observed: each fixture's literal count and reply
 *   sites, exactly. The fixtures write these forms of the reader header's sourceAnchors reading, and the census claims the
 *   reading at them and at no other: the keys (an identifier and a string
 *   literal read, each also with an escape; a computed key, a shorthand, a method and a computed execute do not), the value
 *   (an escaped value reads cooked; a template literal, the value under parentheses, satisfies, as, a type assertion or a
 *   non-null assertion, an identifier, a concatenation, a call, and another case, a longer, shorter, padded or prefixed name
 *   do not; a literal holding another name key before it still counts), which literal (the first of two, the outer of two
 *   nested), which execute (the first; no site without one), the callee (the identifier, escaped or called optionally,
 *   reads; under parentheses, a member, .call, new and a tagged template do not), the order (nested functions included; a
 *   call in another's arguments after it), and the argument (only the first; a string literal's cooked text; an identifier
 *   callee's cooked name; any other form's source text, without the space and comment before it, "" when absent).
 * - A1 []: target src/index.ts read by sourceAnchors; observed: one literal names furnace_observe, one registration row stands
 *   per such literal, and its execute's textResult sites are exactly the reply rows' sites in ROWS order.
 * - F1 []: target the tables; observed: the frozen shape (standing rule 16) below.
 * - J3 []: target ROWS and CASES; observed: each row's pins are exactly the cases naming it, and every case is registered once.
 *
 * J2 PINNED FORMS (the judge's reading of each word, held by the J2 fixtures named; findings exactly as each fixture states):
 * - the result as an object: undefined (not-an-object), null (result-null), a string (result-string), a number
 *   (result-number), a boolean (result-boolean), a symbol (result-symbol), a bigint (result-bigint), an array of the element
 *   (an-array), and an array (result-array-shaped) or a function (result-function) holding content and details each read
 *   "result: not an object", alone.
 * - its keys, the own enumerable string keys sorted and comma-joined, against content,details: details absent
 *   (details-absent) and content absent (content-absent); an extra key sorting before content (result-key-before-content's
 *   annotations, result-underscore-key's _zz, result-dollar-key's $zz, result-digit-key's 0, result-empty-key's empty
 *   string), between content and details (result-key-between's data) and after details (extra-result-key's isError, and
 *   result-key-defined-first's isError defined first, whose finding lists the keys sorted); an expected key in another case
 *   (result-key-case's Content) and a padded copy beside it (result-key-padded); the expected keys defined in another order
 *   (result-key-order), inherited (result-inherited-keys) and beside a non-enumerable and a symbol-keyed property
 *   (unread-keys), which read no key finding, no keys and no key finding.
 * - details, a property read: undefined alone reads no finding; an object (details-defined), null (details-null), an
 *   inherited object (inherited-details), 0 (details-zero), the empty string (details-empty-string), false (details-false),
 *   a function (details-function), a symbol (details-symbol), a bigint (details-bigint) and an inherited 0
 *   (inherited-primitive-details) each read "details: defined".
 * - content: a string (content-not-array), an array-like object (content-array-like), null (content-null) and an absent
 *   content (content-absent) read "content: not an array"; no element (no-items) and two (two-items) read the count.
 * - the element as an object: a string (item-not-object), null (item-null), an array (item-array) and a function
 *   (item-function) holding type and text read "item: not an object".
 * - its keys against text,type: an extra key sorting before text (item-extra-key's extra), between text and type
 *   (item-key-between's title) and after type (item-key-after-type's zz, defined after type and text), an underscore-led key
 *   (item-underscore-key's _zz) and an expected key in another case (item-key-case's Text); the expected keys defined in
 *   another order (item-key-order), inherited (item-inherited-keys) and beside unread properties (unread-keys).
 * - its type against "text", ===: another word (item-type), another case (type-case), padded after (type-padded) and
 *   before (type-leading-padded), a longer word ending in text (type-ends-with), a String wrapper (type-wrapped) and an
 *   array (type-array).
 * - its text against the text, ===: longer (text-differs), another case (text-case), padded after (text-padded) and before
 *   (text-leading-padded), a longer text ending in the text (text-ends-with), a prefix (text-prefix), a String wrapper
 *   (text-wrapped), an array (text-array) and absent (text-absent).
 * - the exact text (exact) reads no finding; the order of the findings and the points where a reading ends: all-findings,
 *   ends-at-content, ends-at-count and ends-at-item, and every fixture above that reads two findings.
 *
 * CLAIMS (each claims exactly the pinned set it names and no wider; its falsifiers are the cases named). "A result judgeReply
 * reads as textResult(X)" is a result judgeReply finds nothing in for the text X. The reader header words that reading (an
 * object whose keys are content and details, details undefined, content an array of one object whose keys are type and text,
 * type === "text" and text === X), and the census claims it at the J2 PINNED FORMS and no other: a reply that differs from
 * textResult(X) in a listed form that reads a finding makes the calling case red, and the listed forms that read none (the
 * expected keys defined in another order, unread properties) read clean, as the reading says. "Served" is the reader's
 * isServedTool (S0): a tool S0 reads as not served (an array or a function holding a function execute, null, undefined and a
 * string, and an object whose execute is absent, a string or an object) is refused, so the census reds on it.
 * - registered: the pinned boot, booted once without the furnace:inspect grant and once with it, its settings read back, hands
 *   the harness's registerTool exactly one tool named furnace_observe (the name the recorder reads once, when the tool is
 *   handed, === "furnace_observe"), so the harness serves that tool under the name (C0; J0, J1, S0, B0, K1).
 * - grant: without the furnace:inspect grant the served furnace_observe replies to C1's call with a result judgeReply reads
 *   as textResult(REFUSALS.grant) (C1; J2, S0, B0, K1).
 * - identity: with the grant it replies to C2's call with a result judgeReply reads as textResult(REFUSALS.identity) (C2; J2,
 *   S0, B0, K1).
 * - data: for the complete and the partial pinned Run it replies with a result judgeReply reads as
 *   textResult(sanitizeWorkbenchJsonText(R)), R being the census observer's reading of that Run; R carries INVISIBLE, which
 *   JSON.stringify(R) keeps and that sanitizer removes (I1), so a reply of the reading's plain JSON text differs (C3, C4; J2,
 *   S0, B0, K1, I1).
 * - error: for the failing pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchText(M)), M
 *   being the message of the census observer's rejection, FAILING_MESSAGE (C5; J2, S0, B0, K1, I1).
 *
 * NOT CLAIMED (scope sentences; no residual semantics; no follow-up bead):
 * - A reply that differs from textResult(X) only in a form J2 PINNED FORMS does not list (another extra-key spelling or
 *   position, another details value, another spelling of the type or the text) is NOT CLAIMED by this census: the reader
 *   header describes how the judge reads it, and no case holds that reading.
 * - Each other reader at a form its case does not write (a registered value J0 does not hand, a received list J1 does not
 *   judge, a tools-Map value S0 does not test, a factory B0 does not plant, a src text A0 does not read) is NOT CLAIMED by
 *   this census: the reader header describes those readings, and the census claims them at the fixtures and plants named.
 * - A served reply's properties that judgeReply does not read are NOT CLAIMED by this census: its non-enumerable,
 *   symbol-keyed and inherited properties other than the four the reading reads (details, content, type and text).
 * - A tool whose name reads differently on different reads (a name getter) is NOT CLAIMED by this census: the recorder reads
 *   each name once (J0), and what pi serves for such a tool is not read.
 * - A call other than C1-C5's (other params, another tool-call id, a signal or an update callback, another grant set,
 *   another Run, an Attempt page that holds Attempts and their log reads) is NOT CLAIMED by this census.
 * - A boot other than the pinned boot (other settings, pi's own loader and runtime, a registration made after session_start)
 *   is NOT CLAIMED by this census.
 * - What the observer reads from a Run and what the shared sanitizers do are NOT CLAIMED by this census: the expected replies
 *   are computed with the FurnaceObserver and the sanitizers src/index.ts imports, so a change to
 *   src/workbench/furnace-observer.ts or src/workbench/redaction.ts moves both sides alike (wb-b04.2's census reads them).
 * - Whether the served execute is the function the furnace_observe literal holds, and what it hands the client and the
 *   observer it builds, are NOT CLAIMED by this census: only its replies to the pinned calls are.
 * - Whether the error reply is run through sanitizeWorkbenchText is NOT CLAIMED by this census: FAILING_MESSAGE is a text that
 *   sanitizer leaves unchanged, so C5 reads the reply's text only.
 * - A served execute that tells this census's calls from others is NOT CLAIMED by this census.
 * - Tools other than furnace_observe are NOT CLAIMED by this census: their names are read only to count furnace_observe.
 *
 * RESIDUALS: none named at this cut, and none is known within the claims. Every known member of the frozen class (MEMBERS:
 * refusal #2's four with their witnesses, and its riding F3's two) reds the census, and so does every member of the cutting
 * seat's own one-edit battery over the judge, the recorder and the served predicate (the delivery note's SM3 line) but the
 * two EQUIVALENT ones MEMBERS names. A newly found escape within the claims is a residual-list addition here, with its
 * pinned quiet row.
 *
 * MEMBERS (the bead's members of record; each src plant is applied to src/index.ts in the cutting seat's worktree and the
 * census run on it, src restored by sha256 after; the counts are the seat's receipts in the delivery note):
 * - refusal #3 (O:1582) U1, which execute pi serves: GP23-REG-TEMPLATE-NAME, GP23-REG-CONST-NAME, GP23-REG-CONCAT-NAME (a
 *   second registration named by a template literal, a constant or a concatenation) red C0, C1, C2, C3, C4 and C5;
 *   GP23-EXEC-SPREAD-OVERRIDE-2 (a spread after execute) and GP23-REGISTER-PATCH (a wrapped registerTool) red C1-C5;
 *   GP23-REGISTER-PATCH-PASSTHROUGH and GP23-DEFINE-SHADOW-PASSTHROUGH (the real body run, "partial" rewritten to "complete")
 *   red C4. U2, what the replies say: GP23-REFUSAL-LITERAL-FABRICATED reds C1 and A1, GP23-IDENTITY-REFUSAL-FABRICATED reds C2
 *   and A1, GP23-ERROR-TEXT-FABRICATED reds C5.
 * - refusal #4 (O:1650) U1-LOW: GP8-REG-ESCAPED-NAME-KEY (a second registration whose name key is spelled with a unicode
 *   escape) reds C0, C1-C5 and A1 (A1's anchor reads the key as TypeScript cooks it, A0). U1-LOW's reader mutants
 *   GP8-M-REG-COOKED-NAME-KEY, GP8-M-FIND-COOKED-NAME-KEY and GP8-M-FIND-COOKED-EXEC-KEY, and U2-LOW's
 *   GP8-M-FIND-NAME-CASEFOLD, GP8-M-REG-NAME-CASEFOLD, GP8-M-FIND-SATISFIES-VALUE and GP8-M-REG-SATISFIES-VALUE, are one-edit
 *   mutants of wb-40zp cut #4's source-text name readers, which this census does not carry: it reads the name pi's loader keys
 *   by, at run time. Their analogs here are killed: a registration count that folds case, trims or matches a substring by J1,
 *   and an anchor that reads a key by its source text, folds the name's case or reads a template-literal value by A0. Their
 *   paired plants: GP8-REG-SATISFIES-NAME reds C0 and C1-C5, and GP8-REG-CASE-NAME, a second tool named Furnace_Observe, reads
 *   clean, as it should: pi serves that tool under another name.
 * - this bead's refusal #1 (O:1772; each gate probe read as data from the gate-prep-24 PREP archive and applied verbatim to
 *   these bytes, the census run on trunk's src/index.ts): U1's GP24-H01-TEXT-COERCE, GP24-H02-TYPE-COERCE and
 *   GP24-H08-ITEM-ARRAY-SPREAD (and its first form GP24-H08-ITEM-ARRAY) red J2; U2's GP24-C01-C0-GRANT-ARM reds C0; U3's
 *   GP24-H07-SERVES-ARRAY reds S0; U4's GP24-H03-ANC-AS-VALUE, GP24-H04-ANC-STRKEY-RAW, GP24-H05-ANC-PAREN-CALLEE and
 *   GP24-H13-ANC-ARG-RAW red A0; and the riding finding F3's GP24-H06-ANC-POSTORDER reds A0.
 * - this bead's refusal #2 (O:1825; each gate member, witness and record-only probe read as data from the gate-prep-3 PREP
 *   archive and applied verbatim to these bytes, the witnesses to src/index.ts's textResult): U1's GP3-M01-RESULT-KEYS-SUFFIX,
 *   GP3-M02-ITEM-KEYS-PREFIX and GP3-M04-KEYS-SKIP-UNDERSCORE and U2's GP3-M03-DETAILS-OBJECT-ONLY red J2
 *   (result-key-before-content, item-key-after-type, result-underscore-key and details-zero hold their witnesses' forms:
 *   GW01's annotations key, GW02's zz element key, GW04's _zz key and GW03's details 0); each witness reds C1-C5 under the
 *   delivered census and J2 under its paired mutant. The riding F3's GP3-X05-ANCHOR-OTHER-FULLTEXT reds A0 (other-trivia) and
 *   GP3-X08-FINDING-KEYS-UNSORTED reds J2 (result-key-defined-first). GP3-X02-BOOT-CTX-DEFAULT-CWD reads clean and is
 *   EQUIVALENT by construction: hermeticDir chdirs into the sandbox, so ctx()'s default cwd is the sandbox. The seat's SM3
 *   member that dedupes the keys reads clean and is EQUIVALENT by construction: Object.keys returns each own key once.
 *
 * FROZEN SHAPE (standing rule 16): F1 pins ROWS as `${id}:${pins.length}` and its clauses, the case ids, SCENARIO_IDS,
 * J0_NAMES, the ids of the J1, J2 and A0 fixtures, and the S0 fixtures as `${id}:${served}`, as literals. A1 holds the rows to
 * src/index.ts outside this file: the one furnace_observe literal stands for the registration row and its four textResult
 * sites for the four reply rows, in order.
 */
import { spawnSync } from "node:child_process";
import { readFileSync, realpathSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "../src/workbench/redaction.js";
import { makePi } from "./helpers/boot-extension.js";
import {
  atFixedDate,
  bootServed,
  type FakeFurnace,
  FIXED_NOW,
  firstOnPath,
  INVISIBLE,
  installFakeFurnace,
  isServedTool,
  judgeRegistrations,
  judgeReply,
  ownObserver,
  type PlantedFactory,
  REFUSALS,
  type ReplySite,
  recordRegistrations,
  SCENARIO_IDS,
  SERVED_NAME,
  type ServedBoot,
  scenario,
  sourceAnchors,
} from "./helpers/furnace-observe-served-reader.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOADER = "node_modules/@earendil-works/pi-coding-agent/dist/core/extensions/loader.js";
/** The message the census observer rejects the failing Run with. */
const FAILING_MESSAGE = "Furnace status unavailable (run_not_found)";
/** Every case's bound (a case that boots the extension needs it under load), handed in an options literal in the second place
 * (vitest 4's test(name, options, fn)), the one form test/workbench-retry-census.test.ts reads beside a forwarded body. */
const CASE_TIMEOUT_MS = 60_000;

interface Row {
  readonly id: string;
  readonly clause: string;
  /** What A1 holds the row to in src/index.ts: the furnace_observe literal, or one textResult site of its execute. */
  readonly anchor: "registration" | "reply";
  readonly site?: ReplySite;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  {
    id: "registered",
    clause: "the pinned boot, booted once without the furnace:inspect grant and once with it, hands the harness's registerTool exactly one tool named furnace_observe",
    anchor: "registration",
    pins: ["J0", "J1", "S0", "B0", "K1", "C0"],
  },
  {
    id: "grant",
    clause: "without the furnace:inspect grant the served furnace_observe replies to C1's call with a result judgeReply reads as textResult(REFUSALS.grant)",
    anchor: "reply",
    site: { kind: "literal", text: REFUSALS.grant },
    pins: ["J2", "S0", "B0", "K1", "C1"],
  },
  {
    id: "identity",
    clause: "with the grant it replies to C2's call with a result judgeReply reads as textResult(REFUSALS.identity)",
    anchor: "reply",
    site: { kind: "literal", text: REFUSALS.identity },
    pins: ["J2", "S0", "B0", "K1", "C2"],
  },
  {
    id: "data",
    clause: "for the complete and the partial pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchJsonText(R))",
    anchor: "reply",
    site: { kind: "call", text: "sanitizeWorkbenchJsonText" },
    pins: ["J2", "S0", "B0", "K1", "I1", "C3", "C4"],
  },
  {
    id: "error",
    clause: "for the failing pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchText(M))",
    anchor: "reply",
    site: { kind: "call", text: "sanitizeWorkbenchText" },
    pins: ["J2", "S0", "B0", "K1", "I1", "C5"],
  },
];

interface Case {
  /** The ROWS this case holds (J3). */
  readonly rows: readonly string[];
  readonly title: string;
}
const CASES = {
  J0: { rows: ["registered"], title: "over J0's values the recorder reads each name once, as a property read does, before it hands the value on unchanged and in order, and returns what registerTool returns" },
  J1: { rows: ["registered"], title: "over J1's received lists the registration judge counts only names === furnace_observe: case variants, longer, shorter, padded and non-string names are other names" },
  J2: {
    rows: ["grant", "identity", "data", "error"],
    title: "at each J2 PINNED FORM the reply judge reads textResult(text)'s own enumerable keys, details, content, element, type and text, compared ===, and names each difference in its order",
  },
  S0: { rows: ["registered", "grant", "identity", "data", "error"], title: "over S0's values the served-tool predicate holds for an object whose execute, own or inherited, is a function, and not for an array, a function or a primitive" },
  B0: {
    rows: ["registered", "grant", "identity", "data", "error"],
    title: "the boot's own order, over two planted factories: settings written, the recorder in front of registerTool from the factory through the awaited session_start, serves and call as the header reads them",
  },
  K1: { rows: ["registered", "grant", "identity", "data", "error"], title: "the tool served under a name is the last one registered under it, in the harness as in pi's loader" },
  I1: { rows: ["data", "error"], title: "the instrument: the fake furnace is first on PATH, Date is fixed, and the census observer reads the three pinned Runs" },
  C0: {
    rows: ["registered"],
    title: "the pinned boot, booted without the grant and then with it, its settings read back, hands registerTool exactly one furnace_observe, and the harness serves it",
  },
  C1: { rows: ["grant"], title: "without the grant the served furnace_observe's reply reads as textResult of the grant refusal" },
  C2: { rows: ["identity"], title: "with the grant and the Run id census-not-a-run its reply reads as textResult of the identity refusal" },
  C3: { rows: ["data"], title: "for the complete Run its reply reads as textResult of the sanitized text of the census observer's reading" },
  C4: { rows: ["data"], title: "for the partial Run its reply reads as textResult of the sanitized text of the census observer's partial reading" },
  C5: { rows: ["error"], title: "for the failing Run its reply reads as textResult of the sanitized text of the census observer's error message" },
  A0: { rows: [], title: "the anchor reader reads each key, value, literal, execute, callee, order and argument form A0 writes as the census header lists it" },
  A1: { rows: [], title: "outside anchors: src/index.ts's furnace_observe literal and its execute's four textResult sites, one per reply row" },
  F1: { rows: [], title: "FROZEN SHAPE (standing rule 16): the rows, the cases, the scenarios and the judges' and readers' fixtures" },
  J3: { rows: [], title: "the judged set: each row's pins are exactly the cases naming it, and every case is registered once" },
} as const satisfies Readonly<Record<string, Case>>;
type CaseId = keyof typeof CASES;
const CASE_IDS = Object.keys(CASES) as CaseId[];
const registered: CaseId[] = [];
/** Registers one case under its id and the rows it holds. */
function pinned(id: CaseId, body: () => void | Promise<void>): void {
  registered.push(id);
  const rows: readonly string[] = CASES[id].rows;
  it(`${id} [${rows.join(", ")}]: ${CASES[id].title}`, { timeout: CASE_TIMEOUT_MS }, body);
}

/** The values J0 hands the recorder, and the names it reads from them. */
const J0_VALUES: readonly unknown[] = [
  { name: "Agent" },
  { name: "Furnace_Observe" },
  { name: SERVED_NAME },
  { name: SERVED_NAME },
  SERVED_NAME,
  { label: "nameless" },
  Object.assign(() => undefined, { execute: () => undefined }),
  function zzNamedTool() {},
  Object.assign([], { name: "zz-array-tool" }),
  Object.create({ name: "zz-inherited-tool" }),
  null,
];
const J0_NAMES: readonly unknown[] = [
  "Agent",
  "Furnace_Observe",
  SERVED_NAME,
  SERVED_NAME,
  undefined,
  undefined,
  "",
  "zzNamedTool",
  "zz-array-tool",
  "zz-inherited-tool",
  undefined,
];

const none = [`${SERVED_NAME} received 0 times`];
/** J1: received names and the registration judge's findings. */
const J1_FIXTURES: readonly { readonly id: string; readonly received: readonly unknown[]; readonly findings: readonly string[] }[] = [
  { id: "none", received: [], findings: none },
  { id: "one", received: [SERVED_NAME], findings: [] },
  { id: "among-others", received: ["Agent", SERVED_NAME, "workflow_detached"], findings: [] },
  { id: "twice", received: [SERVED_NAME, "Agent", SERVED_NAME], findings: [`${SERVED_NAME} received 2 times`] },
  { id: "thrice", received: [SERVED_NAME, SERVED_NAME, SERVED_NAME], findings: [`${SERVED_NAME} received 3 times`] },
  { id: "case-variants", received: ["Furnace_Observe", "FURNACE_OBSERVE", SERVED_NAME], findings: [] },
  { id: "longer-shorter", received: ["furnace_observer", "xfurnace_observe", "furnace_observ", "furnace"], findings: none },
  { id: "padded", received: [` ${SERVED_NAME}`, `${SERVED_NAME} `, `${SERVED_NAME}\n`], findings: none },
  { id: "not-strings", received: [undefined, null, 0, [SERVED_NAME], new String(SERVED_NAME)], findings: none },
];

const T = "the expected text";
const item = (fields: Readonly<Record<string, unknown>>): Readonly<Record<string, unknown>> => ({ type: "text", text: T, ...fields });
/** value with two properties judgeReply does not read as keys: a non-enumerable own isError and a symbol-keyed one. */
const withUnread = <V extends object>(value: V): V =>
  Object.defineProperties(value, { isError: { value: true, enumerable: false }, [Symbol.for("zz-unread")]: { value: true, enumerable: true } });
/** J2: results and the reply judge's findings for the text T (refusal #1 U1's words and their class from text-wrapped on). */
const J2_FIXTURES: readonly { readonly id: string; readonly result: unknown; readonly findings: readonly string[] }[] = [
  { id: "exact", result: { content: [item({})], details: undefined }, findings: [] },
  { id: "text-differs", result: { content: [item({ text: `${T}!` })], details: undefined }, findings: [`item text: ${JSON.stringify(`${T}!`)}`] },
  { id: "text-case", result: { content: [item({ text: T.toUpperCase() })], details: undefined }, findings: [`item text: ${JSON.stringify(T.toUpperCase())}`] },
  { id: "text-padded", result: { content: [item({ text: `${T} ` })], details: undefined }, findings: [`item text: ${JSON.stringify(`${T} `)}`] },
  { id: "text-prefix", result: { content: [item({ text: T.slice(0, 5) })], details: undefined }, findings: [`item text: ${JSON.stringify(T.slice(0, 5))}`] },
  { id: "two-items", result: { content: [item({}), item({})], details: undefined }, findings: ["content: 2 items"] },
  { id: "no-items", result: { content: [], details: undefined }, findings: ["content: 0 items"] },
  { id: "content-not-array", result: { content: T, details: undefined }, findings: ["content: not an array"] },
  { id: "item-not-object", result: { content: [T], details: undefined }, findings: ["item: not an object"] },
  { id: "details-defined", result: { content: [item({})], details: {} }, findings: ["details: defined"] },
  { id: "details-null", result: { content: [item({})], details: null }, findings: ["details: defined"] },
  { id: "details-absent", result: { content: [item({})] }, findings: ["result keys: content"] },
  { id: "extra-result-key", result: { content: [item({})], details: undefined, isError: true }, findings: ["result keys: content,details,isError"] },
  { id: "item-extra-key", result: { content: [item({ extra: 1 })], details: undefined }, findings: ["item keys: extra,text,type"] },
  { id: "item-type", result: { content: [item({ type: "image" })], details: undefined }, findings: ['item type: "image"'] },
  { id: "not-an-object", result: undefined, findings: ["result: not an object"] },
  { id: "an-array", result: [item({})], findings: ["result: not an object"] },
  // A String wrapper or an array of the expected text or type differs under === (GP24-H01, GP24-H02).
  { id: "text-wrapped", result: { content: [item({ text: new String(T) })], details: undefined }, findings: [`item text: ${JSON.stringify(new String(T))}`] },
  { id: "text-array", result: { content: [item({ text: [T] })], details: undefined }, findings: [`item text: ${JSON.stringify([T])}`] },
  { id: "text-absent", result: { content: [{ type: "text" }], details: undefined }, findings: ["item keys: type", "item text: undefined"] },
  { id: "type-wrapped", result: { content: [item({ type: new String("text") })], details: undefined }, findings: [`item type: ${JSON.stringify(new String("text"))}`] },
  { id: "type-array", result: { content: [item({ type: ["text"] })], details: undefined }, findings: ['item type: ["text"]'] },
  { id: "type-case", result: { content: [item({ type: "Text" })], details: undefined }, findings: ['item type: "Text"'] },
  { id: "type-padded", result: { content: [item({ type: "text " })], details: undefined }, findings: ['item type: "text "'] },
  // The element and the result as objects: an array, a function and null holding the right properties are not (GP24-H08).
  { id: "item-array", result: { content: [Object.assign([], { type: "text", text: T })], details: undefined }, findings: ["item: not an object"] },
  { id: "item-function", result: { content: [Object.assign(() => undefined, { type: "text", text: T })], details: undefined }, findings: ["item: not an object"] },
  { id: "item-null", result: { content: [null], details: undefined }, findings: ["item: not an object"] },
  { id: "result-array-shaped", result: Object.assign([], { content: [item({})], details: undefined }), findings: ["result: not an object"] },
  { id: "result-function", result: Object.assign(() => undefined, { content: [item({})], details: undefined }), findings: ["result: not an object"] },
  { id: "result-null", result: null, findings: ["result: not an object"] },
  { id: "content-array-like", result: { content: { 0: item({}), length: 1 }, details: undefined }, findings: ["content: not an array"] },
  // Keys are own enumerable string keys, sorted: order does not matter, inherited ones are not keys, unread ones are not read.
  { id: "result-key-order", result: { details: undefined, content: [item({})] }, findings: [] },
  { id: "item-key-order", result: { content: [{ text: T, type: "text" }], details: undefined }, findings: [] },
  { id: "result-inherited-keys", result: Object.create({ content: [item({})], details: undefined }), findings: ["result keys: "] },
  { id: "item-inherited-keys", result: { content: [Object.create(item({}))], details: undefined }, findings: ["item keys: "] },
  { id: "inherited-details", result: Object.assign(Object.create({ details: {} }), { content: [item({})] }), findings: ["result keys: content", "details: defined"] },
  { id: "unread-keys", result: withUnread({ content: [withUnread({ ...item({}) })], details: undefined }), findings: [] },
  // The order of the findings, and where a reading ends.
  {
    id: "all-findings",
    result: { content: [{ type: "image", text: "x", extra: 1 }], details: {}, isError: true },
    findings: ["result keys: content,details,isError", "details: defined", "item keys: extra,text,type", 'item type: "image"', 'item text: "x"'],
  },
  { id: "ends-at-content", result: { content: T, details: {}, extra: 1 }, findings: ["result keys: content,details,extra", "details: defined", "content: not an array"] },
  {
    id: "ends-at-count",
    result: { content: [item({ type: "image" }), item({})], details: null, isError: true },
    findings: ["result keys: content,details,isError", "details: defined", "content: 2 items"],
  },
  { id: "ends-at-item", result: { content: [null], details: {} }, findings: ["details: defined", "item: not an object"] },
  // Refusal #2 (O:1825), U1: an extra result key at each sorted position, before content (GP3-M01 with GW01's annotations, and
  // GP3-M04 with GW04's _zz), between content and details, and after details defined first (GP3-X08: the finding lists the
  // sorted keys); a result key in each spelling below (an underscore, a dollar sign, a digit, the empty string, another case
  // and a padded copy of an expected key); and content absent.
  { id: "result-key-before-content", result: { annotations: [], content: [item({})], details: undefined }, findings: ["result keys: annotations,content,details"] },
  { id: "result-underscore-key", result: { _zz: true, content: [item({})], details: undefined }, findings: ["result keys: _zz,content,details"] },
  { id: "result-key-between", result: { content: [item({})], data: 1, details: undefined }, findings: ["result keys: content,data,details"] },
  { id: "result-key-defined-first", result: { isError: true, content: [item({})], details: undefined }, findings: ["result keys: content,details,isError"] },
  { id: "result-dollar-key", result: { $zz: 1, content: [item({})], details: undefined }, findings: ["result keys: $zz,content,details"] },
  { id: "result-digit-key", result: { 0: 1, content: [item({})], details: undefined }, findings: ["result keys: 0,content,details"] },
  { id: "result-empty-key", result: { "": 1, content: [item({})], details: undefined }, findings: ["result keys: ,content,details"] },
  { id: "result-key-case", result: { Content: [item({})], details: undefined }, findings: ["result keys: Content,details", "content: not an array"] },
  { id: "result-key-padded", result: { "content ": 1, content: [item({})], details: undefined }, findings: ["result keys: content,content ,details"] },
  { id: "content-absent", result: { details: undefined }, findings: ["result keys: details", "content: not an array"] },
  { id: "content-null", result: { content: null, details: undefined }, findings: ["content: not an array"] },
  // U1: an extra element key after type (GP3-M02 with GW02's zz, defined after type and text) and between text and type, an
  // underscore-led element key (GP3-M04), and an element key in another case.
  { id: "item-key-after-type", result: { content: [item({ zz: true })], details: undefined }, findings: ["item keys: text,type,zz"] },
  { id: "item-key-between", result: { content: [item({ title: "x" })], details: undefined }, findings: ["item keys: text,title,type"] },
  { id: "item-underscore-key", result: { content: [item({ _zz: true })], details: undefined }, findings: ["item keys: _zz,text,type"] },
  { id: "item-key-case", result: { content: [{ Text: T, type: "text" }], details: undefined }, findings: ["item keys: Text,type", "item text: undefined"] },
  // U2: details defined as each primitive kind, as a function and as an inherited primitive (GP3-M03 with GW03's 0): only
  // undefined is not a finding.
  { id: "details-zero", result: { content: [item({})], details: 0 }, findings: ["details: defined"] },
  { id: "details-empty-string", result: { content: [item({})], details: "" }, findings: ["details: defined"] },
  { id: "details-false", result: { content: [item({})], details: false }, findings: ["details: defined"] },
  { id: "details-function", result: { content: [item({})], details: () => undefined }, findings: ["details: defined"] },
  { id: "details-symbol", result: { content: [item({})], details: Symbol("zz-details") }, findings: ["details: defined"] },
  { id: "details-bigint", result: { content: [item({})], details: 0n }, findings: ["details: defined"] },
  { id: "inherited-primitive-details", result: Object.assign(Object.create({ details: 0 }), { content: [item({})] }), findings: ["result keys: content", "details: defined"] },
  // The text and the type with something before them, and a result of each primitive kind.
  { id: "text-leading-padded", result: { content: [item({ text: ` ${T}` })], details: undefined }, findings: [`item text: ${JSON.stringify(` ${T}`)}`] },
  { id: "text-ends-with", result: { content: [item({ text: `x${T}` })], details: undefined }, findings: [`item text: ${JSON.stringify(`x${T}`)}`] },
  { id: "type-leading-padded", result: { content: [item({ type: " text" })], details: undefined }, findings: ['item type: " text"'] },
  { id: "type-ends-with", result: { content: [item({ type: "plaintext" })], details: undefined }, findings: ['item type: "plaintext"'] },
  { id: "result-string", result: T, findings: ["result: not an object"] },
  { id: "result-number", result: 0, findings: ["result: not an object"] },
  { id: "result-boolean", result: false, findings: ["result: not an object"] },
  { id: "result-symbol", result: Symbol("zz-result"), findings: ["result: not an object"] },
  { id: "result-bigint", result: 0n, findings: ["result: not an object"] },
];

const run = (): undefined => undefined;
/** A tool written as a class: its execute is a prototype method. */
class ZzClassTool {
  execute(): undefined {
    return undefined;
  }
}
/** S0: values in the harness tools Map and whether isServedTool reads them as served (refusal #1 U3, GP24-H07). */
const S0_FIXTURES: readonly { readonly id: string; readonly value: unknown; readonly served: boolean }[] = [
  { id: "own-execute", value: { name: SERVED_NAME, execute: run }, served: true },
  { id: "async-execute", value: { execute: async () => undefined }, served: true },
  { id: "inherited-execute", value: Object.create({ execute: run }), served: true },
  { id: "class-method", value: new ZzClassTool(), served: true },
  { id: "null-prototype", value: Object.assign(Object.create(null), { execute: run }), served: true },
  { id: "no-execute", value: { name: SERVED_NAME }, served: false },
  { id: "execute-string", value: { execute: "run" }, served: false },
  { id: "execute-object", value: { execute: { call: run } }, served: false },
  { id: "array-tool", value: Object.assign([], { execute: run }), served: false },
  { id: "function-tool", value: Object.assign(() => undefined, { execute: run }), served: false },
  { id: "null", value: null, served: false },
  { id: "undefined", value: undefined, served: false },
  { id: "string", value: SERVED_NAME, served: false },
];

const lit = (text: string): ReplySite => ({ kind: "literal", text });
const call = (text: string): ReplySite => ({ kind: "call", text });
const other = (text: string): ReplySite => ({ kind: "other", text });
/** A0: planted src texts and the anchor reader's readings of them (refusal #1 U4 and F3, and their class, from quoted-escaped-keys on). */
const A0_FIXTURES: readonly { readonly id: string; readonly text: string; readonly literals: number; readonly sites: readonly ReplySite[] }[] = [
  {
    id: "plain",
    text: 'x({ name: "furnace_observe", execute: async () => { if (a) return textResult("one"); return textResult(sanitize(reading)); } });',
    literals: 1,
    sites: [lit("one"), call("sanitize")],
  },
  {
    id: "first-of-two",
    text: 'x({ name: "furnace_observe", execute: async () => textResult("first") }); x({ name: "furnace_observe", execute: async () => textResult("second") });',
    literals: 2,
    sites: [lit("first")],
  },
  { id: "quoted-keys", text: 'x({ "name": "furnace_observe", "execute": async () => textResult("quoted") });', literals: 1, sites: [lit("quoted")] },
  { id: "escaped-keys", text: 'x({ n\\u0061me: "furnace_observe", ex\\u0065cute: async () => textResult("escaped") });', literals: 1, sites: [lit("escaped")] },
  { id: "escaped-value", text: 'x({ name: "furnace\\u005fobserve", execute: async () => textResult("cooked") });', literals: 1, sites: [lit("cooked")] },
  { id: "computed-key", text: 'x({ ["name"]: "furnace_observe", execute: async () => textResult("c") });', literals: 0, sites: [] },
  { id: "template-value", text: 'x({ name: `furnace_observe`, execute: async () => textResult("t") });', literals: 0, sites: [] },
  {
    id: "wrapped-value",
    text: 'x({ name: "furnace_observe" satisfies string, execute: async () => textResult("w") }); x({ name: ("furnace_observe"), execute: async () => textResult("p") });',
    literals: 0,
    sites: [],
  },
  {
    id: "other-names",
    text: 'x({ name: "Furnace_Observe", execute: async () => textResult("o") }); x({ name: "furnace_observer", execute: async () => textResult("o") });',
    literals: 0,
    sites: [],
  },
  { id: "first-execute", text: 'x({ name: "furnace_observe", execute: async () => textResult("one"), execute: async () => textResult("two") });', literals: 1, sites: [lit("one")] },
  { id: "no-execute", text: 'x({ name: "furnace_observe", run: async () => textResult("r") });', literals: 1, sites: [] },
  {
    id: "nested-order",
    text: 'x({ name: "furnace_observe", execute: async () => { const f = () => textResult("inner"); return textResult("outer"); } });',
    literals: 1,
    sites: [lit("inner"), lit("outer")],
  },
  {
    id: "other-sites",
    text: 'x({ name: "furnace_observe", execute: async () => { textResult(msg); textResult(`t`); textResult(); textResult(a.b()); } });',
    literals: 1,
    sites: [other("msg"), other("`t`"), other(""), other("a.b()")],
  },
  { id: "not-textresult", text: 'x({ name: "furnace_observe", execute: async () => { reply("x"); a.textResult("y"); } });', literals: 1, sites: [] },
  // The keys: a quoted key cooks its escapes as an identifier key does (GP24-H04); a shorthand, a method and a computed execute are not read.
  { id: "quoted-escaped-keys", text: 'x({ "n\\u0061me": "furnace_observe", "ex\\u0065cute": async () => textResult("qe") });', literals: 1, sites: [lit("qe")] },
  { id: "shorthand-name", text: 'x({ name, execute: async () => textResult("s") });', literals: 0, sites: [] },
  { id: "method-execute", text: 'x({ name: "furnace_observe", execute() { return textResult("m"); } });', literals: 1, sites: [] },
  { id: "computed-execute", text: 'x({ name: "furnace_observe", ["execute"]: async () => textResult("c") });', literals: 1, sites: [] },
  { id: "second-name-key", text: 'x({ name: "workflow_observe", name: "furnace_observe", execute: async () => textResult("n") });', literals: 1, sites: [lit("n")] },
  // The value: no wrapper (as: GP24-H03), no assertion and no computed value is read, and only === "furnace_observe" counts.
  {
    id: "as-value",
    text: 'x({ name: "furnace_observe" as const, execute: async () => textResult("a") }); x({ name: "furnace_observe" as string, execute: async () => textResult("s") });',
    literals: 0,
    sites: [],
  },
  {
    id: "assertion-values",
    text: 'x({ name: <string>"furnace_observe", execute: async () => textResult("t") }); x({ name: "furnace_observe"!, execute: async () => textResult("n") });',
    literals: 0,
    sites: [],
  },
  {
    id: "computed-values",
    text: 'x({ name: NAME, execute: async () => textResult("i") }); x({ name: "furnace_" + "observe", execute: async () => textResult("c") }); x({ name: String("furnace_observe"), execute: async () => textResult("f") });',
    literals: 0,
    sites: [],
  },
  {
    id: "other-values",
    text: 'x({ name: " furnace_observe", execute: async () => textResult("1") }); x({ name: "furnace_observe ", execute: async () => textResult("2") }); x({ name: "furnace_observ", execute: async () => textResult("3") }); x({ name: "xfurnace_observe", execute: async () => textResult("4") });',
    literals: 0,
    sites: [],
  },
  // Which literal: the outer of two nested ones; its execute's calls include the inner literal's.
  {
    id: "nested-literals",
    text: 'x({ name: "furnace_observe", execute: async () => { y({ name: "furnace_observe", execute: async () => textResult("inner") }); return textResult("outer"); } });',
    literals: 2,
    sites: [lit("inner"), lit("outer")],
  },
  // The callee: the identifier textResult itself, escaped or called optionally; not under parentheses (GP24-H05), a member, .call, new or a tag.
  {
    id: "callee-forms",
    text: 'x({ name: "furnace_observe", execute: async () => { t\\u0065xtResult("escaped"); textResult?.("optional"); (textResult)("p"); textResult.call(null, "c"); new textResult("n"); textResult`t`; return textResult("last"); } });',
    literals: 1,
    sites: [lit("escaped"), lit("optional"), lit("last")],
  },
  // The order: a call in another's arguments comes after it, in the source order of the calls' starts (F3, GP24-H06).
  { id: "nested-in-argument", text: 'x({ name: "furnace_observe", execute: async () => textResult(f(textResult("a"))) });', literals: 1, sites: [call("f"), lit("a")] },
  // The argument: only the first; a string literal by its cooked text (GP24-H13), an identifier callee by its cooked name, any other form by its source text.
  {
    id: "argument-forms",
    text: 'x({ name: "furnace_observe", execute: async () => { textResult("c\\u006fok\\u0065d"); textResult(s\\u0061nitize(r)); textResult("first", "second"); textResult(("p")); textResult("a" as string); textResult((g)(r)); } });',
    literals: 1,
    sites: [lit("cooked"), call("sanitize"), lit("first"), other('("p")'), other('"a" as string'), other("(g)(r)")],
  },
  // Any other form's source text has no leading trivia: a space and a comment before the argument are not read (GP3-X05).
  { id: "other-trivia", text: 'x({ name: "furnace_observe", execute: async () => textResult( /* note */ msg) });', literals: 1, sites: [other("msg")] },
];

/** Boots the extension with the fake furnace first on PATH, runs read, and restores both. */
async function withServed(grants: readonly string[], read: (boot: ServedBoot, fake: FakeFurnace) => Promise<void>): Promise<void> {
  const fake = installFakeFurnace();
  try {
    if (firstOnPath("furnace") !== fake.binary) throw new Error("the census fake furnace is not first on PATH, so no served call runs");
    const boot = await bootServed(grants);
    try {
      await read(boot, fake);
    } finally {
      boot.restore();
    }
  } finally {
    fake.restore();
  }
}
/** The Error a census observer rejects with, or what it resolved to. */
async function failureOf(read: Promise<unknown>): Promise<unknown> {
  return read.then(
    value => value,
    (error: unknown) => error,
  );
}

describe("wb-g20x: the furnace_observe served census", () => {
  pinned("J0", () => {
    const handed: unknown[] = [];
    const stub = { registerTool: (tool: unknown): unknown => handed.push(tool) };
    const received = recordRegistrations(stub);
    const returned = J0_VALUES.map(value => stub.registerTool(value));
    expect(handed, "every value reaches registerTool unchanged and in order").toStrictEqual([...J0_VALUES]);
    expect(handed.every((value, index) => value === J0_VALUES[index]), "as the same values").toBe(true);
    expect(returned, "and what registerTool returns comes back").toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(received, "the names read, as a property read reads them").toStrictEqual([...J0_NAMES]);
    // A name behind a getter: the recorder reads it once per registration (the getter NOT CLAIMED sentence rests on this).
    let reads = 0;
    const counted = {
      get name(): string {
        reads += 1;
        return "zz-counted-tool";
      },
    };
    expect(stub.registerTool(counted), "the counted tool reaches registerTool").toBe(12);
    expect([received.at(-1), reads], "and its name is read once").toStrictEqual(["zz-counted-tool", 1]);
    // A registerTool installed over the recorder that calls it (a wrapper bound to the pi, GP23-REGISTER-PATCH's shape).
    const bound = stub.registerTool.bind(stub);
    stub.registerTool = (tool: unknown): unknown => bound({ name: "zz-wrapped", wrapped: tool });
    expect(stub.registerTool({ name: SERVED_NAME }), "the wrapper reaches registerTool through the recorder").toBe(13);
    expect([received.at(-1), handed.length], "which reads the name the wrapper hands on").toStrictEqual(["zz-wrapped", 13]);
    // The recorder appends a name before it hands the value on: a stub that reads the recorder's list as it is called.
    const lengths: number[] = [];
    let listed: readonly unknown[] = [];
    const ordered = { registerTool: (_tool: unknown): unknown => lengths.push(listed.length) };
    listed = recordRegistrations(ordered);
    ordered.registerTool({ name: "zz-first" });
    ordered.registerTool({ name: "zz-second" });
    expect([lengths, [...listed]], "each name is appended before its value reaches registerTool").toStrictEqual([
      [1, 2],
      ["zz-first", "zz-second"],
    ]);
  });

  pinned("J1", () => {
    for (const fixture of J1_FIXTURES) expect(judgeRegistrations(fixture.received, SERVED_NAME), fixture.id).toStrictEqual([...fixture.findings]);
  });

  pinned("J2", () => {
    for (const fixture of J2_FIXTURES) expect(judgeReply(fixture.result, T), fixture.id).toStrictEqual([...fixture.findings]);
  });

  pinned("S0", () => {
    for (const fixture of S0_FIXTURES) expect(isServedTool(fixture.value), fixture.id).toBe(fixture.served);
  });

  pinned(
    "B0",
    async () => {
      const seen: unknown[][] = [];
      let session: unknown;
      // A planted factory registers one tool while it runs and three from a session_start handler that awaits a turn first,
      // so a recorder installed after the factory, or a session_start that is not awaited, reads a different list.
      const planted: PlantedFactory = pi => {
        pi.registerTool({ name: "zz-factory-tool", execute: run });
        pi.on("session_start", async (event, context) => {
          await new Promise<void>(resolve => setImmediate(resolve));
          session = context;
          seen.push(["session_start", event, realpathSync(context.cwd), JSON.parse(readFileSync(join(context.cwd, ".pi", "subagents.json"), "utf8"))]);
          pi.registerTool({
            name: SERVED_NAME,
            execute: async (...args: unknown[]) => {
              seen.push(["execute", ...args]);
              return "zz-planted-reply";
            },
          });
          pi.registerTool(Object.assign([], { name: "zz-array-tool", execute: run }));
        });
      };
      const boot = await bootServed(["furnace:inspect"], planted);
      try {
        expect(boot.received, "the recorder reads the factory's registration and then session_start's, in order").toStrictEqual(["zz-factory-tool", SERVED_NAME, "zz-array-tool"]);
        expect(seen, "session_start ran once, awaited, with {} and a context whose cwd is the sandbox holding the settings").toStrictEqual([
          ["session_start", {}, boot.workspace, { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["furnace:inspect"] } }],
        ]);
        expect([boot.serves("zz-factory-tool"), boot.serves(SERVED_NAME), boot.serves("zz-array-tool"), boot.serves("zz-absent")], "serves is isServedTool of the entry under the name").toStrictEqual([true, true, false, false]);
        expect(await boot.call({ runId: "zz-run" }), "call resolves to what the served execute returns").toBe("zz-planted-reply");
        const executed = seen.at(-1) ?? [];
        expect(executed.slice(0, 5), 'which it calls as execute("census", params, undefined, undefined, ...)').toStrictEqual(["execute", "census", { runId: "zz-run" }, undefined, undefined]);
        expect([executed.length, executed[5] === session], "with the session_start context last").toStrictEqual([6, true]);
      } finally {
        boot.restore();
      }
      const refused = await bootServed([], pi => {
        pi.on("session_start", async () => {
          pi.registerTool(Object.assign([], { name: SERVED_NAME, execute: run }));
        });
      });
      try {
        expect([refused.received, refused.serves(SERVED_NAME)], "an array tool under furnace_observe is registered and not served").toStrictEqual([[SERVED_NAME], false]);
        await expect(refused.call({ runId: "zz-run" }), "so call throws").rejects.toThrow(`the harness serves no ${SERVED_NAME} execute`);
      } finally {
        refused.restore();
      }
    },
  );

  pinned("K1", () => {
    const harness = makePi();
    harness.pi.registerTool({ name: "zz-served", parameters: {}, marker: "first" });
    harness.pi.registerTool({ name: "zz-served", parameters: {}, marker: "second" });
    harness.pi.registerTool({ name: "zz-other", parameters: {}, marker: "other" });
    const marker = (name: string): unknown => {
      const tool: unknown = harness.tools.get(name);
      return typeof tool === "object" && tool !== null && "marker" in tool ? tool.marker : undefined;
    };
    expect([marker("zz-served"), marker("zz-other"), harness.tools.size], "the harness serves the last tool registered under a name").toStrictEqual(["second", "other", 2]);
    const loader = readFileSync(join(REPO, LOADER), "utf8");
    const method = loader.slice(loader.indexOf("registerTool(tool) {"), loader.indexOf("registerCommand(name, options) {"));
    expect(loader.split("extension.tools.set(").length - 1, "pi's loader sets extension.tools at one site").toBe(1);
    expect([method.includes("extension.tools.set(tool.name, {"), method.includes("definition: tool,")], "inside registerTool, keyed by tool.name with the tool as definition").toStrictEqual([true, true]);
  });

  pinned("I1", async () => {
    const fake = installFakeFurnace();
    const workspace = "/census-served/workspace";
    try {
      expect(firstOnPath("furnace"), "the fake is the first furnace on PATH").toBe(fake.binary);
      expect(await atFixedDate(async () => new Date().toISOString()), "Date reads the fixed instant inside atFixedDate").toBe(FIXED_NOW);
      expect(new Date().toISOString() === FIXED_NOW, "and the real clock after it").toBe(false);
      for (const id of ["complete", "partial"] as const) {
        const runId = `frn-run-census-${id}`;
        fake.play(scenario(id, runId, workspace));
        const reading = await atFixedDate(() => ownObserver(fake, workspace, runId).snapshot());
        expect([reading.completeness, reading.capturedAt, reading.observedAt, reading.lastConfirmedAt], `${id}: the census observer's reading`).toStrictEqual([id, FIXED_NOW, FIXED_NOW, FIXED_NOW]);
        expect(reading.source.producerVersion, `${id}: its producer version holds INVISIBLE`).toBe(`0.1.0${INVISIBLE}census`);
        expect([JSON.stringify(reading).includes(INVISIBLE), sanitizeWorkbenchJsonText(reading).includes(INVISIBLE)], `${id}: the sanitizer removes it`).toStrictEqual([true, false]);
      }
      fake.play(scenario("failing", "frn-run-census-failing", workspace));
      const failure = await failureOf(atFixedDate(() => ownObserver(fake, workspace, "frn-run-census-failing").snapshot()));
      expect(failure, "the failing Run is rejected with an Error").toBeInstanceOf(Error);
      expect(failure instanceof Error ? failure.message : failure, "whose message is FAILING_MESSAGE").toBe(FAILING_MESSAGE);
      expect(sanitizeWorkbenchText(FAILING_MESSAGE), "a text the error reply's sanitizer leaves unchanged").toBe(FAILING_MESSAGE);
      fake.play({});
      const unanswered = spawnSync(fake.binary, ["run", "status", "frn-run-census-unanswered", "--json"], { encoding: "utf8" });
      expect([unanswered.status, unanswered.stdout], "a command no answer names exits 2 with nothing on stdout").toStrictEqual([2, ""]);
    } finally {
      fake.restore();
    }
    expect(firstOnPath("furnace") === fake.binary, "after restore the fake is off PATH").toBe(false);
  });

  pinned(
    "C0",
    async () => {
      const arms: boolean[] = [];
      for (const grants of [[], ["furnace:inspect"]]) {
        arms.push((grants as readonly string[]).includes("furnace:inspect"));
        await withServed(grants, async boot => {
          const settings: unknown = JSON.parse(readFileSync(join(boot.workspace, ".pi", "subagents.json"), "utf8"));
          expect(settings, `grants ${JSON.stringify(grants)}: the boot's settings`).toStrictEqual({ workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...grants] } });
          expect(judgeRegistrations(boot.received, SERVED_NAME), `grants ${JSON.stringify(grants)}: one furnace_observe registration`).toStrictEqual([]);
          expect(boot.serves(SERVED_NAME), `grants ${JSON.stringify(grants)}: the harness serves its execute`).toBe(true);
        });
      }
      expect(arms, "C0 booted once without the furnace:inspect grant and then once with it").toStrictEqual([false, true]);
    },
  );

  pinned(
    "C1",
    async () => {
      await withServed([], async boot => {
        expect(judgeReply(await boot.call({ runId: "frn-run-census-grant" }), REFUSALS.grant)).toStrictEqual([]);
      });
    },
  );

  pinned(
    "C2",
    async () => {
      await withServed(["furnace:inspect"], async boot => {
        expect(judgeReply(await boot.call({ runId: "census-not-a-run" }), REFUSALS.identity)).toStrictEqual([]);
      });
    },
  );

  for (const [id, run] of [
    ["C3", "complete"],
    ["C4", "partial"],
  ] as const) {
    pinned(
      id,
      async () => {
        await withServed(["furnace:inspect"], async (boot, fake) => {
          const runId = `frn-run-census-${run}`;
          fake.play(scenario(run, runId, boot.workspace));
          const [result, reading] = await atFixedDate(async () => [await boot.call({ runId }), await ownObserver(fake, boot.workspace, runId).snapshot()] as const);
          expect(reading.completeness, "the census observer's reading").toBe(run);
          expect(judgeReply(result, sanitizeWorkbenchJsonText(reading))).toStrictEqual([]);
        });
      },
    );
  }

  pinned(
    "C5",
    async () => {
      await withServed(["furnace:inspect"], async (boot, fake) => {
        const runId = "frn-run-census-failing";
        fake.play(scenario("failing", runId, boot.workspace));
        const [result, failure] = await atFixedDate(async () => [await boot.call({ runId }), await failureOf(ownObserver(fake, boot.workspace, runId).snapshot())] as const);
        expect(failure, "the census observer rejects the Run with an Error").toBeInstanceOf(Error);
        expect(judgeReply(result, sanitizeWorkbenchText(failure instanceof Error ? failure.message : String(failure)))).toStrictEqual([]);
      });
    },
  );

  pinned("A0", () => {
    for (const fixture of A0_FIXTURES) {
      const read = sourceAnchors(fixture.text);
      expect([read.literals, read.sites], fixture.id).toStrictEqual([fixture.literals, [...fixture.sites]]);
    }
  });

  pinned("A1", () => {
    const anchors = sourceAnchors(readFileSync(join(REPO, "src/index.ts"), "utf8"));
    expect(anchors.literals, "one registration row per furnace_observe literal").toBe(ROWS.filter(row => row.anchor === "registration").length);
    expect(anchors.sites, "its execute's textResult sites are the reply rows' sites, in order").toStrictEqual(ROWS.flatMap(row => (row.anchor === "reply" ? [row.site] : [])));
  });

  pinned("F1", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toStrictEqual(["registered:6", "grant:5", "identity:5", "data:7", "error:6"]);
    expect(ROWS.map(row => row.clause)).toStrictEqual([
      "the pinned boot, booted once without the furnace:inspect grant and once with it, hands the harness's registerTool exactly one tool named furnace_observe",
      "without the furnace:inspect grant the served furnace_observe replies to C1's call with a result judgeReply reads as textResult(REFUSALS.grant)",
      "with the grant it replies to C2's call with a result judgeReply reads as textResult(REFUSALS.identity)",
      "for the complete and the partial pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchJsonText(R))",
      "for the failing pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchText(M))",
    ]);
    expect(CASE_IDS).toStrictEqual(["J0", "J1", "J2", "S0", "B0", "K1", "I1", "C0", "C1", "C2", "C3", "C4", "C5", "A0", "A1", "F1", "J3"]);
    expect([...SCENARIO_IDS]).toStrictEqual(["complete", "partial", "failing"]);
    expect([...J0_NAMES]).toStrictEqual(["Agent", "Furnace_Observe", "furnace_observe", "furnace_observe", undefined, undefined, "", "zzNamedTool", "zz-array-tool", "zz-inherited-tool", undefined]);
    expect(J1_FIXTURES.map(fixture => fixture.id)).toStrictEqual(["none", "one", "among-others", "twice", "thrice", "case-variants", "longer-shorter", "padded", "not-strings"]);
    expect(J2_FIXTURES.map(fixture => fixture.id)).toStrictEqual([
      "exact",
      "text-differs",
      "text-case",
      "text-padded",
      "text-prefix",
      "two-items",
      "no-items",
      "content-not-array",
      "item-not-object",
      "details-defined",
      "details-null",
      "details-absent",
      "extra-result-key",
      "item-extra-key",
      "item-type",
      "not-an-object",
      "an-array",
      "text-wrapped",
      "text-array",
      "text-absent",
      "type-wrapped",
      "type-array",
      "type-case",
      "type-padded",
      "item-array",
      "item-function",
      "item-null",
      "result-array-shaped",
      "result-function",
      "result-null",
      "content-array-like",
      "result-key-order",
      "item-key-order",
      "result-inherited-keys",
      "item-inherited-keys",
      "inherited-details",
      "unread-keys",
      "all-findings",
      "ends-at-content",
      "ends-at-count",
      "ends-at-item",
      "result-key-before-content",
      "result-underscore-key",
      "result-key-between",
      "result-key-defined-first",
      "result-dollar-key",
      "result-digit-key",
      "result-empty-key",
      "result-key-case",
      "result-key-padded",
      "content-absent",
      "content-null",
      "item-key-after-type",
      "item-key-between",
      "item-underscore-key",
      "item-key-case",
      "details-zero",
      "details-empty-string",
      "details-false",
      "details-function",
      "details-symbol",
      "details-bigint",
      "inherited-primitive-details",
      "text-leading-padded",
      "text-ends-with",
      "type-leading-padded",
      "type-ends-with",
      "result-string",
      "result-number",
      "result-boolean",
      "result-symbol",
      "result-bigint",
    ]);
    expect(S0_FIXTURES.map(fixture => `${fixture.id}:${fixture.served}`)).toStrictEqual([
      "own-execute:true",
      "async-execute:true",
      "inherited-execute:true",
      "class-method:true",
      "null-prototype:true",
      "no-execute:false",
      "execute-string:false",
      "execute-object:false",
      "array-tool:false",
      "function-tool:false",
      "null:false",
      "undefined:false",
      "string:false",
    ]);
    expect(A0_FIXTURES.map(fixture => fixture.id)).toStrictEqual([
      "plain",
      "first-of-two",
      "quoted-keys",
      "escaped-keys",
      "escaped-value",
      "computed-key",
      "template-value",
      "wrapped-value",
      "other-names",
      "first-execute",
      "no-execute",
      "nested-order",
      "other-sites",
      "not-textresult",
      "quoted-escaped-keys",
      "shorthand-name",
      "method-execute",
      "computed-execute",
      "second-name-key",
      "as-value",
      "assertion-values",
      "computed-values",
      "other-values",
      "nested-literals",
      "callee-forms",
      "nested-in-argument",
      "argument-forms",
      "other-trivia",
    ]);
  });

  pinned("J3", () => {
    for (const row of ROWS) {
      expect(row.pins, `${row.id}: its pins are the cases naming it`).toStrictEqual(CASE_IDS.filter(id => (CASES[id].rows as readonly string[]).includes(row.id)));
    }
    const named = CASE_IDS.flatMap(id => [...CASES[id].rows]);
    expect(named.filter(id => !ROWS.some(row => row.id === id)), "every row a case names exists").toStrictEqual([]);
    expect([...registered].sort(), "every case is registered").toStrictEqual([...CASE_IDS].sort());
    expect(new Set(registered).size, "and once").toBe(registered.length);
  });
});
