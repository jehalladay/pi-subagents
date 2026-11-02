/**
 * wb-jwc.13 binding text reader sub-form census: what test/helpers/rf-binding-text-reader.ts reads on the 39 pins below (37
 * pages; the twin tw-coll.ts is read by three pins), the sub-forms that wb-jwc.10's refusals #3 and #4 name. wb-jwc.13 is the
 * rule-19 dependency-inversion child of wb-jwc.10: ruling R-B233 filed it at refusal #3 (O:1611) with that refusal's members,
 * and ruling R-B263 folded refusal #4's members (O:1685) into its notes. The reader is wb-jwc.10's FINAL cut #4 reader, its
 * code moved byte for byte (the helper's header names the lines). wb-jwc.10's census, roster and claim parts are not on trunk
 * and are neither added nor edited here; wb-jwc.10 stays parked until this lands, and its later re-cut can import the reader.
 *
 * CUT #2 (wb-jwc.13's refusal #1, O:1768; the helper is unchanged). U1: a words pin now reads words(x) as JSON, its words in
 * order, and an undefined words(x) as the bare word undefined, which no JSON text is; so one joined element in place of six
 * or two words (L2-W1) and the list ["unresolved"] in place of undefined (L2-W2) each read apart from the pins, and an exact
 * pin reads exact(x) the same way. U2: the sentence that called c and d declared wherever a page uses them is gone; R4-R668
 * states that its two pages use c with no declaration. The cut also pins the words of R4-U1c that cut #1 planted only with
 * one-word texts and single spaces (PG-WORDS, PG-WHITESPACE), and names NOT CLAIMED each further sub-form this cut's one-edit
 * reader mutants leave unpinned.
 *
 * THE PINNED READER SET (this file; 42 cases). One case per pin, registered in ROWS order as `<pin id> reads as pinned`
 * inside `<row id>: <row label>`, then SHAPE, ANCHOR and ROSTER. For each pin the assertion target is the pin's probe over
 * the pin's page, read by bindingTextReader at the pin's path, and the observed result is the pin's reading, exactly and in
 * order (toEqual). Each probe reads the calls it locates, in source order: texts - for each probe(x), rendered() of x's
 * alternatives (a text as its JSON string, an opaque part as <opaque LABEL>; every texts pin here reads one alternative);
 * exact - for each probe(x), exact(x) as JSON, or the bare word undefined when exact(x) is undefined; words - for each
 * probe(x), words(x) as JSON, or the bare word undefined when words(x) is undefined; programs - for each call of spawn,
 * spawnSync, execFile, execFileSync, exec, execSync or fork, `<callee>:` and program() of its first argument; registrations
 * - registrations(); registration - for each object literal whose registration() is not undefined, its registration()
 * entries joined by ", ". Every pin case passes on the moved reader. A page named tw-* is the gate's twin file of that name
 * byte for byte (ANCHOR holds each twin's digest to its record).
 *
 * CLAIMS (each names its pages and the readings its pins hold; the falsifiers are its row's pin cases).
 * - R3-U1a (refusal #3 member n03): the module's const X, X = "a" probed at the top level, reads <opaque X:eval> when the
 *   module's one eval call is eval("1", "2") as a const's initializer with its callee through an as cast (n03-ts, twin
 *   tw-n03.ts) or as an expression statement in a .js module (n03-js, twin tw-n03.js), or eval(), eval("1"),
 *   eval("1", "2") or eval("1", "2", "3") as an expression statement in a .ts module (EV-ZERO, EV-ONE, EV-TWO, EV-THREE);
 *   with no eval call it reads "a" (EV-NONE). Falsifier named by the record: n03 (a call counted only with at most one
 *   argument).
 * - R3-U1b (member n23): words() reads tw-n23.ts's probe("rf.bat x.COM y") as ["rf.bat","x.COM","y"] (n23); and on WD-FORMS
 *   it reads "rf.bat a.BAT b.Bat c.com d.COM e.Com" as those six words, ["rf.bat","a.BAT","b.Bat","c.com","d.COM","e.Com"],
 *   "rf.exe a.EXE b.Exe c.cmd d.CMD e.Cmd" as ["rf","a","b","c","d","e"], and "z.exe.bak y.cmd.txt" as those two words,
 *   ["z.exe.bak","y.cmd.txt"]. Falsifiers: n23 (.bat and .com dropped) and refusal #1's L2-W1 (the words as one joined
 *   element).
 * - R3-U1c (member n31): a catch clause variable probed in its block reads <opaque NAME:catch> for catch (e: any) in an
 *   exported function of a .ts module (n31, twin tw-n31.ts), for catch (e: unknown) and catch (u) there (CA-TS), and for
 *   catch (e) at the top level of a .js module (CA-JS). Falsifier: n31 (any read as other).
 * - R3-U1d (member n18): registrations() reads { id: "reactivefiber.f", effectClass: c ? "<opaque p:parameter>" : p } as
 *   reactivefiber.f:<opaque p:parameter> (n18, twin tw-n18.ts), and EF-FORMS's reactivefiber.g with effectClass
 *   c ? p : "<opaque p:parameter>" as reactivefiber.g:<opaque p:parameter> and reactivefiber.h with effectClass
 *   c ? "<opaque p:parameter>" : d ? p : "read" as reactivefiber.h:<opaque p:parameter>|read. Falsifier: n18 (the EFFECT
 *   Set dropped).
 * - R3-U2 (members n30 and n35): past the depth bound, a 16-link const chain's root initializer reads as one
 *   <opaque c ? "a" : "b":bound> written as c, a line feed, two spaces and ? "a" : "b" (n30, twin tw-n30.ts) and written
 *   with tabs and runs of two spaces (BD-WHITESPACE); past the combination bound, seven (c ? "0" : "1") parts joined by +
 *   read as one <opaque TEXT:bound>, TEXT the seven parts joined by " + ", written across line feeds with two-space
 *   indentation (n35, twin tw-n35.ts) and across carriage return line feeds with the same indentation (BD-WHITESPACE).
 *   Falsifiers: n30 and n35 (the raw source text as the label).
 * - R4-U1a (refusal #4 members q06 and q06b): exact() reads undefined for c ? "a" : p (q06, twin tw-q06.ts) and for
 *   p ?? "b", c ? "a" : d ? p : "b", c ? "a" : d ? "b" : p and p (EX-POSITIONS: p written as the left operand of ??, as the
 *   middle and as the last of three conditional branches, and alone), and ["a","b"] for c ? "a" : "b" (EX-POSITIONS).
 *   Falsifiers: q06 and q06b.
 * - R4-U1b (member q07): words() reads undefined for c ? "rf x" : p (q07, twin tw-q07.ts) and for p ?? "rf",
 *   c ? "rf x" : d ? p : "rf y", c ? "rf x" : d ? "rf y" : p and p (WO-POSITIONS: p written where EX-POSITIONS writes it),
 *   and ["rf","x","y"] for c ? "rf x" : "rf y" (WO-POSITIONS). Falsifiers: q07 and refusal #1's L2-W2 (the list
 *   ["unresolved"] in place of undefined).
 * - R4-U1c (members q08 and q08b): program() reads <opaque TEXT>, TEXT the argument's source text with each whitespace run
 *   read as one space, for execFileSync's c ? "git" : p and process.env.PI_VCS === undefined ? "git" : process.env.PI_VCS
 *   (q08, twin tw-q08.ts), for spawn's p ?? "git", c ? "git" : d ? p : "rf", c ? "git" : d ? "rf" : p and p (PG-POSITIONS:
 *   p written where EX-POSITIONS writes it), for spawn's c ? "git" : "", c ? "" : "git", c ? "git" : " " and ""
 *   (PG-WORDLESS: an empty or a blank string as a branch or as the argument), and for spawn's c ? "git" : p written with
 *   runs of two spaces, with tabs, across line feeds with indentation and across a carriage return line feed, each with TEXT
 *   c ? "git" : p, and c ? "git  log" : p with TEXT c ? "git log" : p (PG-WHITESPACE: a run inside a string literal read as
 *   one space too); and it reads git|rf for spawn's c ? "rf" : "git" (PG-POSITIONS), and on PG-WORDS git for
 *   c ? "git log" : "git status" (one first word written twice, read once), git|rf for c ? "git x" : "rf y" and for
 *   c ? "rf x" : "git y" (the first words, in code-unit order whichever branch holds which), Zed|apt for
 *   c ? "Zed x" : "apt y" (Z before a), and git|rf for c ? "/usr/bin/git x" : "C:\\tools\\rf.cmd y" (each first word
 *   cut to its last path segment, its .cmd dropped). Falsifiers: q08 and q08b, and refusal #1's uncounted L2-P1 (the raw
 *   source text as the label), which PG-WHITESPACE reds.
 * - R4-U1d (members p08 and q05): exact() reads ["b","a"] for c ? "b" : "a" (p08, twin tw-p08.ts), ["b","c","a"] for
 *   c ? "b" : d ? "c" : "a" and ["a","B"] for c ? "a" : "B" (OR-ORDERS). Falsifiers: p08 (sorted) and q05 (sorted by
 *   localeCompare).
 * - R4-R668 (the U1-R668 rider): the pages XT-TEXTS and XW-WORDS, copied from wb-jwc.10's branch (this census reads no file
 *   of that branch, so where the pages came from is NOT CLAIMED by this census), both using c with no declaration and p as
 *   a parameter: exact() reads XT-TEXTS's
 *   c ? "a" : "b" as ["a","b"], p ?? "b" as undefined and "only" as ["only"]; words() reads XW-WORDS's first text as
 *   ["rf","context","render","tee","log","out","in","bg","q","d","b"], its second as ["rf","x"], c ? "rf x" : "rf y" as
 *   ["rf","x","y"] and p ?? "rf" as undefined. The roster states for each page its forms and readings and no other words;
 *   those pages write p only as the left operand of ??, and the other positions of p are R4-U1a's and R4-U1b's pins.
 * - R4-F2 (refusal #4 finding F2, members p23 to p26): on twin tw-coll.ts, program() reads spawn's c ? "apt" : "Zed" as
 *   Zed|apt (coll-programs), registrations() reads reactivefiber.B:<none>, reactivefiber.a:<none> and
 *   reactivefiber.e:Write|read (coll-registrations), and the registration probe reads reactivefiber.e:Write|read and
 *   reactivefiber.B:<none>, reactivefiber.a:<none> (coll-registration): code-unit order, Z and W and B before a and r.
 *   Falsifiers: p23 to p26 (localeCompare).
 * - R4-F3 (refusal #4 finding F3, member p30): the module's const X reads <opaque X:eval> when its one eval call is
 *   eval(`1`) as a const's initializer (p30, twin tw-p30.ts) or, as an expression statement, eval(CODE) with CODE a const
 *   (EV-IDENTIFIER), eval(1) (EV-NUMBER), eval of a template whose one substitution is X (EV-TEMPLATE), eval(...codes)
 *   (EV-SPREAD) or eval(String(1)) (EV-CALL). Falsifier: p30 (a call counted only with no argument or one string literal).
 * - SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}` and the pins as `${id}:${sha256/16 of the
 *   page}`, each held to a literal.
 * - ANCHOR (outside this file; the tracked tracker export .beads/issues.jsonl, read at run time, never retyped as the
 *   expectation; bead notes only append, so each text is read from its first occurrence): (1) wb-jwc.13's description lists
 *   its unmet items as refusal #3's class item and then the R3 rows' labels, in order; (2) wb-jwc.13's notes open the R-B263
 *   fold, which lists refusal #4's class item and then the R4 member rows' labels, in order; (3) wb-jwc.10's notes hold
 *   refusal #3's UNMET block, whose item labels are its class item and the R3 rows' labels, in order, each R3 row's item
 *   naming exactly the row's twins with their pages' digests, in order; (4) the same for refusal #4's UNMET block and the R4
 *   member rows, the rider's item naming XT-TEXTS and XW-WORDS, R4-R668's pins; (5) wb-jwc.10's notes hold refusal #4's
 *   findings block, in which exactly two lines route their coverage to wb-jwc.13 (a "wb-jwc.13 candidate", coverage that
 *   "belongs to wb-jwc.13"): their PREP heads are R4-F2's and R4-F3's labels, in order, each naming exactly its row's twin
 *   with its page's digest.
 * - ROSTER (outside this file): test/fixtures/rf-binding-text-reader-subforms-roster.json holds every row, in order, with its
 *   label, and every pin, in order, with its page's digest, its forms (each probed argument's source text, whitespace runs
 *   read as one space; for the programs probe `<callee>:` and the first argument's; for the registration probes each
 *   registering object literal's) and its reading.
 * A row or a pin removed, a pin's page or reading changed, or a label shortened, in ROWS alone or in ROWS and the
 * frozen-shape literals together (standing rule 16's CT1-CT5), reds ROSTER, and SHAPE too unless the frozen-shape literals
 * follow; a reading changed in ROWS also reds its own pin case. In every literal together, the roster included (CT6): a row
 * removed or its label changed, a twin's page changed, a twin's only pin removed, or a rider pin (XT-TEXTS, XW-WORDS)
 * removed reds ANCHOR, whose anchor is the tracker export; a reading changed reds its own pin case. In every literal
 * together, the roster included, these read green (the 6ze.39-class posture, disclosed in NOT CLAIMED): a seat plant (a pin
 * with neither a twin nor a rider id) removed, or its page and reading replaced; a rider pin's page and reading replaced;
 * and one of R4-F2's three tw-coll.ts pins removed while another keeps the twin. Their only anchors are this file's
 * literals and the roster that this census's own cuts write.
 *
 * NOT CLAIMED (scope sentences; no residual is claimed and none is owed by them). A reading of any page that is not one of
 * these 37 is NOT CLAIMED by this census. On such a page: an eval call at a position no page here writes (inside parentheses
 * as a whole, a conditional, a property access or a binary expression, among others) is NOT CLAIMED by this census; a word
 * with an extension no page here writes, a quote inside a word and the empty word are NOT CLAIMED by this census; a catch
 * variable with another annotation, or destructured, is NOT CLAIMED by this census; EFFECT for any other effectClass, a field
 * an opaque member may set, a registration whose id has an opaque alternative, a registration whose reactivefiber. id text
 * follows another alternative, and two registering object literals with the same entries (whether registrations() lists such
 * an entry once or twice) are NOT CLAIMED by this census; a bound past which a literal or an unresolved identifier sits, how
 * many depth levels any form other than a const link counts (a wrapper, a conditional, a ??, || or && expression, a + join or
 * a template), and any other whitespace character in a label are NOT CLAIMED by this census; an empty first word among a
 * program's words is NOT CLAIMED by this census; how rendered() renders two or more alternatives (their separator, their order
 * and which of them it shows) is NOT CLAIMED by this census, every texts pin here reading one; a conditional whose two
 * branches read the same alternative (whether that alternative reads once or twice) is NOT CLAIMED by this census; the
 * alternatives of a + join, a template or a ??, || or && expression (their texts, their joining and their order), an
 * assignment, a prefix or postfix operator, a tagged template, a type assertion and every other expression form (its label
 * included), an object literal's fields, a const cycle, a with body, an unbound identifier's kind, a path's parse and the
 * rendering of a text that JSON escapes are NOT CLAIMED by this census. Every reading of the moved reader on another page is
 * NOT CLAIMED by this census; wb-jwc.10's census pins many of them on its branch, not on trunk. Beyond this file's literals
 * and its roster, the presence of a seat plant, the pages of the rider pins and the count of R4-F2's tw-coll.ts pins are NOT
 * CLAIMED by this census (no outside text this census reads names them; the 6ze.39-class posture above). Which calls the
 * probes locate (probe, the seven launcher names and the registering object literals) is this census's own locator, not a
 * claim about a module.
 *
 * Display paths added: none (test-only). No scratch is allocated (every page is a string parsed in memory); the tracker export
 * and the roster are only read; no src, docs or receipt is edited.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type BindingTextReader, bindingTextReader, rendered } from "./helpers/rf-binding-text-reader.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXPORT = ".beads/issues.jsonl";
const ROSTER = "test/fixtures/rf-binding-text-reader-subforms-roster.json";
const CHILD = "wb-jwc.13";
const PARENT = "wb-jwc.10";
/** The class item each refusal's member items sit under (the first of its unmet list). */
const R3_CLASS = "U1-RULE16-LEG2-4-SURVIVING-NON-EQUIVALENT-HELPER-MUTANTS-ON-CLAIM-NAMED-SUBFORMS-OUTSIDE-THE-NAMED-RESIDUALS-0of164-R514-R515";
const R4_CLASS = "U1-RULE16-LEG2-NEW-MEMBERS-ON-CUT4-FAIL-CLOSED-CORE-0of164-R514-R515";
/** The first occurrences that open and close each export text this census reads. */
const UNMET_LIST = { open: "Unmet items verbatim: ", close: "\n" } as const;
const FOLD = { open: "RULE19 DEPENDENCY INVERSION R-B263 (ruling M:45049, refusal O:1685): members folded into wb-jwc.13\n", close: "\nrule19-invert idem" } as const;
const R3_UNMET = { open: "UNMET (record.unmet, PREP's list verbatim; 6 lines: U1 the class item with members U1a-U1d", close: "\nRED (record.red" } as const;
const R4_UNMET = { open: "UNMET (record.unmet, PREP's list verbatim; 6 lines: U1 the class item and its members U1a-U1d", close: "\nRED (record.red" } as const;
const R4_FINDINGS = { open: "FINDINGS (F1-F12 are record.findings", close: "\n- F13 INFO" } as const;
const LAUNCHERS: ReadonlySet<string> = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"]);

type Probe = "texts" | "exact" | "words" | "programs" | "registrations" | "registration";
interface Pin {
  readonly id: string;
  readonly path: string;
  readonly page: string;
  readonly probe: Probe;
  readonly reading: readonly string[];
  /** A gate twin: the twin file's name in its refusal record (the page is that file byte for byte). */
  readonly twin?: string;
}
interface Row {
  readonly id: string;
  /** The requirement the row answers, verbatim from its record: an unmet item's label or a finding's PREP head. */
  readonly label: string;
  readonly pins: readonly Pin[];
}

function page(...text: string[]): string {
  return `${text.join("\n")}\n`;
}
function pin(id: string, probe: Probe, text: string, reading: readonly string[]): Pin {
  return { id, path: `src/workbench/providers/zz-${id.toLowerCase()}.ts`, page: text, probe, reading };
}
/** A gate twin read at src/workbench/providers/zz-<twin file name>. */
function twin(id: string, file: string, probe: Probe, text: string, reading: readonly string[]): Pin {
  return { id, path: `src/workbench/providers/zz-${file}`, page: text, probe, reading, twin: file };
}
/** A template substitution's source text, built so that no string in this file spells a placeholder. */
function sub(expression: string): string {
  return `$${"{"}${expression}}`;
}
function digest(text: string): string {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}
/** A const chain J1 = J0 ... J16 = J15 (sixteen links), so a probe of J16 reads J0's initializer seventeen levels deep. */
function chain(name: string): string[] {
  return Array.from({ length: 16 }, (_, index) => `const ${name}${index + 1} = ${name}${index};`);
}

const DECLARE_PROBE = "declare function probe(value: unknown): void;";
const DECLARE_C = "declare const c: boolean;";
const DECLARE_D = "declare const d: boolean;";
const SEVEN = '(c ? "0" : "1")';

const ROWS: readonly Row[] = [
  {
    id: "R3-U1a",
    label: "U1a-EVAL-CALL-WITH-TWO-OR-MORE-ARGUMENTS-UNCOUNTED-FAIL-OPEN",
    pins: [
      twin("n03-ts", "tw-n03.ts", "texts", page(DECLARE_PROBE, DECLARE_C, 'const X = "a";', "probe(X);", 'export const y: unknown = (eval as (...code: string[]) => unknown)("1", "2");'), ["<opaque X:eval>"]),
      twin("n03-js", "tw-n03.js", "texts", page('const X = "a";', "probe(X);", 'eval("1", "2");', "function probe(value) { return value; }"), ["<opaque X:eval>"]),
      pin("EV-ZERO", "texts", page(DECLARE_PROBE, 'const X = "a";', "probe(X);", "eval();", "export {};"), ["<opaque X:eval>"]),
      pin("EV-ONE", "texts", page(DECLARE_PROBE, 'const X = "a";', "probe(X);", 'eval("1");', "export {};"), ["<opaque X:eval>"]),
      pin("EV-TWO", "texts", page(DECLARE_PROBE, 'const X = "a";', "probe(X);", 'eval("1", "2");', "export {};"), ["<opaque X:eval>"]),
      pin("EV-THREE", "texts", page(DECLARE_PROBE, 'const X = "a";', "probe(X);", 'eval("1", "2", "3");', "export {};"), ["<opaque X:eval>"]),
      pin("EV-NONE", "texts", page(DECLARE_PROBE, 'const X = "a";', "probe(X);", "export {};"), ['"a"']),
    ],
  },
  {
    id: "R3-U1b",
    label: "U1b-WORDS-DROP-SET-TRAILING-BAT-COM-DROPPED-UNPINNED",
    pins: [
      twin("n23", "tw-n23.ts", "words", page(DECLARE_PROBE, DECLARE_C, 'probe("rf.bat x.COM y");', "export {};"), ['["rf.bat","x.COM","y"]']),
      pin(
        "WD-FORMS",
        "words",
        page(DECLARE_PROBE, 'probe("rf.bat a.BAT b.Bat c.com d.COM e.Com");', 'probe("rf.exe a.EXE b.Exe c.cmd d.CMD e.Cmd");', 'probe("z.exe.bak y.cmd.txt");', "export {};"),
        ['["rf.bat","a.BAT","b.Bat","c.com","d.COM","e.Com"]', '["rf","a","b","c","d","e"]', '["z.exe.bak","y.cmd.txt"]'],
      ),
    ],
  },
  {
    id: "R3-U1c",
    label: "U1c-KINDS-CATCH-TYPED-ANY-READS-OTHER-UNPINNED",
    pins: [
      twin(
        "n31",
        "tw-n31.ts",
        "texts",
        page(DECLARE_PROBE, DECLARE_C, "declare function f(): void;", "export function g(): void {", "  try {", "    f();", "  } catch (e: any) {", "    probe(e);", "  }", "}"),
        ["<opaque e:catch>"],
      ),
      pin(
        "CA-TS",
        "texts",
        page(DECLARE_PROBE, "declare function f(): void;", "export function g(): void {", "  try {", "    f();", "  } catch (e: unknown) {", "    probe(e);", "  }", "  try {", "    f();", "  } catch (u) {", "    probe(u);", "  }", "}"),
        ["<opaque e:catch>", "<opaque u:catch>"],
      ),
      { ...pin("CA-JS", "texts", page("function f() {}", "function probe(value) { return value; }", "try {", "  f();", "} catch (e) {", "  probe(e);", "}"), ["<opaque e:catch>"]), path: "src/workbench/providers/zz-ca-js.js" },
    ],
  },
  {
    id: "R3-U1d",
    label: "U1d-REGISTRATION-EFFECT-EACH-ONCE-RENDERED-DEDUPE-UNEXERCISED",
    pins: [
      twin(
        "n18",
        "tw-n18.ts",
        "registrations",
        page(DECLARE_PROBE, DECLARE_C, "export function f(p: string) {", '  return { id: "reactivefiber.f", effectClass: c ? "<opaque p:parameter>" : p };', "}"),
        ["reactivefiber.f:<opaque p:parameter>"],
      ),
      pin(
        "EF-FORMS",
        "registrations",
        page(
          DECLARE_C,
          DECLARE_D,
          "export function g(p: string) {",
          '  return { id: "reactivefiber.g", effectClass: c ? p : "<opaque p:parameter>" };',
          "}",
          "export function h(p: string) {",
          '  return { id: "reactivefiber.h", effectClass: c ? "<opaque p:parameter>" : d ? p : "read" };',
          "}",
        ),
        ["reactivefiber.g:<opaque p:parameter>", "reactivefiber.h:<opaque p:parameter>|read"],
      ),
    ],
  },
  {
    id: "R3-U2",
    label: "U2-R668-TEXT12-BOUND-LABEL-SOURCE-TEXT-WORDS-VS-WHITESPACE-COLLAPSE-UNPINNED",
    pins: [
      twin("n30", "tw-n30.ts", "texts", page(DECLARE_PROBE, DECLARE_C, "const I0 = c", '  ? "a" : "b";', ...chain("I"), "probe(I16);", "export {};"), ['<opaque c ? "a" : "b":bound>']),
      twin(
        "n35",
        "tw-n35.ts",
        "texts",
        page(DECLARE_PROBE, DECLARE_C, `probe(${SEVEN} +`, ...Array.from({ length: 5 }, () => `  ${SEVEN} +`), `  ${SEVEN});`, "export {};"),
        [`<opaque ${Array.from({ length: 7 }, () => SEVEN).join(" + ")}:bound>`],
      ),
      pin(
        "BD-WHITESPACE",
        "texts",
        page(DECLARE_PROBE, DECLARE_C, 'const J0 = c\t?\t"a"  :  "b";', ...chain("J"), "probe(J16);", `probe(${SEVEN} +\r`, ...Array.from({ length: 5 }, () => `  ${SEVEN} +\r`), `  ${SEVEN});`, "export {};"),
        ['<opaque c ? "a" : "b":bound>', `<opaque ${Array.from({ length: 7 }, () => SEVEN).join(" + ")}:bound>`],
      ),
    ],
  },
  {
    id: "R4-U1a",
    label: "U1a-READINGS1-EXACT-FIRST-ALTERNATIVE-ONLY-FAIL-OPEN",
    pins: [
      twin("q06", "tw-q06.ts", "exact", page(DECLARE_PROBE, DECLARE_C, "export function g(p: string): void {", '  probe(c ? "a" : p);', "}"), ["undefined"]),
      pin(
        "EX-POSITIONS",
        "exact",
        page(DECLARE_PROBE, DECLARE_C, DECLARE_D, "export function g(p: string): void {", '  probe(p ?? "b");', '  probe(c ? "a" : d ? p : "b");', '  probe(c ? "a" : d ? "b" : p);', "  probe(p);", '  probe(c ? "a" : "b");', "}"),
        ["undefined", "undefined", "undefined", "undefined", '["a","b"]'],
      ),
    ],
  },
  {
    id: "R4-U1b",
    label: "U1b-READINGS2-WORDS-FIRST-ALTERNATIVE-ONLY-FAIL-OPEN",
    pins: [
      twin("q07", "tw-q07.ts", "words", page(DECLARE_PROBE, DECLARE_C, "export function g(p: string): void {", '  probe(c ? "rf x" : p);', "}"), ["undefined"]),
      pin(
        "WO-POSITIONS",
        "words",
        page(DECLARE_PROBE, DECLARE_C, DECLARE_D, "export function g(p: string): void {", '  probe(p ?? "rf");', '  probe(c ? "rf x" : d ? p : "rf y");', '  probe(c ? "rf x" : d ? "rf y" : p);', "  probe(p);", '  probe(c ? "rf x" : "rf y");', "}"),
        ["undefined", "undefined", "undefined", "undefined", '["rf","x","y"]'],
      ),
    ],
  },
  {
    id: "R4-U1c",
    label: "U1c-READINGS3-PROGRAM-FIRST-ALTERNATIVE-ONLY-FAIL-OPEN-R-B115-E1E2-CLASS",
    pins: [
      twin(
        "q08",
        "tw-q08.ts",
        "programs",
        page(
          'import { execFileSync } from "node:child_process";',
          DECLARE_C,
          "export function g(p: string): string {",
          '  return execFileSync(c ? "git" : p, [], { encoding: "utf8" });',
          "}",
          "export function h(): string {",
          '  return execFileSync(process.env.PI_VCS === undefined ? "git" : process.env.PI_VCS, [], { encoding: "utf8" });',
          "}",
        ),
        ['execFileSync:<opaque c ? "git" : p>', 'execFileSync:<opaque process.env.PI_VCS === undefined ? "git" : process.env.PI_VCS>'],
      ),
      pin(
        "PG-POSITIONS",
        "programs",
        page(
          'import { spawn } from "node:child_process";',
          DECLARE_C,
          DECLARE_D,
          "export function g(p: string): void {",
          '  spawn(p ?? "git", []);',
          '  spawn(c ? "git" : d ? p : "rf", []);',
          '  spawn(c ? "git" : d ? "rf" : p, []);',
          "  spawn(p, []);",
          '  spawn(c ? "rf" : "git", []);',
          "}",
        ),
        ['spawn:<opaque p ?? "git">', 'spawn:<opaque c ? "git" : d ? p : "rf">', 'spawn:<opaque c ? "git" : d ? "rf" : p>', "spawn:<opaque p>", "spawn:git|rf"],
      ),
      pin(
        "PG-WORDLESS",
        "programs",
        page('import { spawn } from "node:child_process";', DECLARE_C, 'spawn(c ? "git" : "", []);', 'spawn(c ? "" : "git", []);', 'spawn(c ? "git" : " ", []);', 'spawn("", []);'),
        ['spawn:<opaque c ? "git" : "">', 'spawn:<opaque c ? "" : "git">', 'spawn:<opaque c ? "git" : " ">', 'spawn:<opaque "">'],
      ),
      pin(
        "PG-WORDS",
        "programs",
        page('import { spawn } from "node:child_process";', DECLARE_C, 'spawn(c ? "git log" : "git status", []);', 'spawn(c ? "git x" : "rf y", []);', 'spawn(c ? "rf x" : "git y", []);', 'spawn(c ? "Zed x" : "apt y", []);', 'spawn(c ? "/usr/bin/git x" : "C:\\\\tools\\\\rf.cmd y", []);'),
        ["spawn:git", "spawn:git|rf", "spawn:git|rf", "spawn:Zed|apt", "spawn:git|rf"],
      ),
      pin(
        "PG-WHITESPACE",
        "programs",
        page(
          'import { spawn } from "node:child_process";',
          DECLARE_C,
          "export function g(p: string): void {",
          '  spawn(c  ?  "git"  :  p, []);',
          '  spawn(c\t?\t"git"\t:\tp, []);',
          "  spawn(",
          "    c",
          '      ? "git"',
          "      : p,",
          "    [],",
          "  );",
          "  spawn(c ?\r",
          '    "git" : p, []);',
          '  spawn(c ? "git  log" : p, []);',
          "}",
        ),
        ['spawn:<opaque c ? "git" : p>', 'spawn:<opaque c ? "git" : p>', 'spawn:<opaque c ? "git" : p>', 'spawn:<opaque c ? "git" : p>', 'spawn:<opaque c ? "git log" : p>'],
      ),
    ],
  },
  {
    id: "R4-U1d",
    label: "U1d-READINGS1-EXACT-IN-ORDER-SORTED-UNPINNED",
    pins: [
      twin("p08", "tw-p08.ts", "exact", page(DECLARE_PROBE, DECLARE_C, 'probe(c ? "b" : "a");', "export {};"), ['["b","a"]']),
      pin("OR-ORDERS", "exact", page(DECLARE_PROBE, DECLARE_C, DECLARE_D, 'probe(c ? "b" : d ? "c" : "a");', 'probe(c ? "a" : "B");', "export {};"), ['["b","c","a"]', '["a","B"]']),
    ],
  },
  {
    id: "R4-R668",
    label: "U1-R668 rider",
    pins: [
      pin("XT-TEXTS", "exact", page('probe(c ? "a" : "b");', 'function g(p: string) { probe(p ?? "b"); }', 'probe("only");'), ['["a","b"]', "undefined", '["only"]']),
      pin(
        "XW-WORDS",
        "words",
        page(
          "probe(\"/usr/bin/rf.EXE context;render|tee(log) > out < in & bg 'q' \\\"d\\\" `b`\");",
          'probe("C:\\\\tools\\\\rf.cmd x");',
          'probe(c ? "rf x" : "rf y");',
          'function g(p: string) { probe(p ?? "rf"); }',
        ),
        ['["rf","context","render","tee","log","out","in","bg","q","d","b"]', '["rf","x"]', '["rf","x","y"]', "undefined"],
      ),
    ],
  },
  {
    id: "R4-F2",
    label: "F2 INFO (LEG 2 survivors below the claim's vocabulary; not counted)",
    pins: ((): Pin[] => {
      const coll = page(
        'import { spawn } from "node:child_process";',
        DECLARE_C,
        'export const a = spawn(c ? "apt" : "Zed", []);',
        'export const e = { id: "reactivefiber.e", effectClass: c ? "read" : "Write" };',
        'export const r = { id: c ? "reactivefiber.a" : "reactivefiber.B" };',
      );
      return [
        twin("coll-programs", "tw-coll.ts", "programs", coll, ["spawn:Zed|apt"]),
        twin("coll-registrations", "tw-coll.ts", "registrations", coll, ["reactivefiber.B:<none>", "reactivefiber.a:<none>", "reactivefiber.e:Write|read"]),
        twin("coll-registration", "tw-coll.ts", "registration", coll, ["reactivefiber.e:Write|read", "reactivefiber.B:<none>, reactivefiber.a:<none>"]),
      ];
    })(),
  },
  {
    id: "R4-F3",
    label: "F3 INFO (LEG 2 survivor on a NOT CLAIMED form; the narrowing holds)",
    pins: [
      twin("p30", "tw-p30.ts", "texts", page(DECLARE_PROBE, 'const X = "a";', "probe(X);", "export const y: unknown = eval(`1`);"), ["<opaque X:eval>"]),
      pin("EV-IDENTIFIER", "texts", page(DECLARE_PROBE, 'const X = "a";', "probe(X);", 'const CODE = "1";', "eval(CODE);", "export {};"), ["<opaque X:eval>"]),
      pin("EV-NUMBER", "texts", page(DECLARE_PROBE, 'const X = "a";', "probe(X);", "eval(1);", "export {};"), ["<opaque X:eval>"]),
      pin("EV-TEMPLATE", "texts", page(DECLARE_PROBE, 'const X = "a";', "probe(X);", `eval(\`${sub("X")}\`);`, "export {};"), ["<opaque X:eval>"]),
      pin("EV-SPREAD", "texts", page(DECLARE_PROBE, "declare const codes: string[];", 'const X = "a";', "probe(X);", "eval(...codes);", "export {};"), ["<opaque X:eval>"]),
      pin("EV-CALL", "texts", page(DECLARE_PROBE, 'const X = "a";', "probe(X);", "eval(String(1));", "export {};"), ["<opaque X:eval>"]),
    ],
  },
];

/* ------------------------------------------------------------------ the probes */

function visit(node: ts.Node, visitor: (node: ts.Node) => void): void {
  visitor(node);
  ts.forEachChild(node, (child) => visit(child, visitor));
}
function calleeName(call: ts.CallExpression): string | undefined {
  return ts.isIdentifier(call.expression) ? call.expression.text : undefined;
}
/** Each call the probe locates, in source order, with its callee's name and its first argument. */
function located(reader: BindingTextReader, probe: Probe): Array<{ readonly name: string; readonly argument: ts.Expression }> {
  const found: Array<{ readonly name: string; readonly argument: ts.Expression }> = [];
  visit(reader.source, (node) => {
    if (!ts.isCallExpression(node)) return;
    const name = calleeName(node);
    const argument = node.arguments[0];
    const wanted = probe === "programs" ? LAUNCHERS.has(name ?? "") : name === "probe";
    if (name !== undefined && argument !== undefined && wanted) found.push({ name, argument });
  });
  return found;
}
/** Each object literal the registration probes read (one with a registration), in source order. */
function registering(reader: BindingTextReader): ts.ObjectLiteralExpression[] {
  const found: ts.ObjectLiteralExpression[] = [];
  visit(reader.source, (node) => {
    if (ts.isObjectLiteralExpression(node) && reader.registration(node) !== undefined) found.push(node);
  });
  return found;
}
/** A probe's value as JSON, or the bare word undefined when the value is undefined (no JSON text is that bare word). */
function json(value: readonly string[] | undefined): string {
  return value === undefined ? "undefined" : JSON.stringify(value);
}
function reading(at: Pin): readonly string[] {
  const reader = bindingTextReader(at.path, at.page);
  if (at.probe === "registrations") return reader.registrations();
  if (at.probe === "registration") return registering(reader).map((object) => (reader.registration(object) ?? []).join(", "));
  const calls = located(reader, at.probe);
  if (at.probe === "programs") return calls.map(({ name, argument }) => `${name}:${reader.program(argument)}`);
  if (at.probe === "exact") return calls.map(({ argument }) => json(reader.exact(argument)));
  if (at.probe === "words") return calls.map(({ argument }) => json(reader.words(argument)));
  return calls.map(({ argument }) => rendered(reader.alternatives(argument)));
}
/** The forms a pin's probe reads, as the roster states them: each source text with its whitespace runs read as one space. */
function forms(at: Pin): string[] {
  const reader = bindingTextReader(at.path, at.page);
  const text = (node: ts.Node): string => node.getText(reader.source).replace(/\s+/g, " ");
  if (at.probe === "registrations" || at.probe === "registration") return registering(reader).map(text);
  return located(reader, at.probe).map(({ name, argument }) => (at.probe === "programs" ? `${name}:${text(argument)}` : text(argument)));
}

/* ------------------------------------------------------------------ the outside anchors */

/** A bead's row in the tracker export. */
function exportRow(id: string): { readonly description: string; readonly notes: string } {
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    if (line.trim() === "") continue;
    const row = JSON.parse(line) as { id?: unknown; description?: unknown; notes?: unknown };
    if (row.id === id && typeof row.description === "string") return { description: row.description, notes: typeof row.notes === "string" ? row.notes : "" };
  }
  throw new Error(`${EXPORT} holds no ${id} row`);
}
/** The text between the first occurrence of `open` and the first `close` after it. */
function between(text: string, marker: { readonly open: string; readonly close: string }): string {
  const start = text.indexOf(marker.open);
  expect(start, `the export holds ${JSON.stringify(marker.open.slice(0, 60))}`).toBeGreaterThanOrEqual(0);
  const from = start + marker.open.length;
  const end = text.indexOf(marker.close, from);
  expect(end, `the export closes ${JSON.stringify(marker.open.slice(0, 60))}`).toBeGreaterThanOrEqual(from);
  return text.slice(from, end);
}
/** An UNMET block's items: each `- ` line (indented or not), its label the text up to its first " (" or ":". */
function items(block: string): Array<{ readonly label: string; readonly text: string }> {
  return block
    .split("\n")
    .filter((line) => /^ *- /.test(line))
    .map((line) => {
      const text = line.replace(/^ *- /, "");
      const ends = [text.indexOf(" ("), text.indexOf(":")].filter((at) => at >= 0);
      return { label: text.slice(0, Math.min(...ends)), text };
    });
}
/** The twins a record text names, in order, each once: `<twin file>@<sha256/16>`. */
function twinsNamed(text: string): string[] {
  const named = [...text.matchAll(/[Tt]win (tw-[\w.-]+) \((?:sha256\/16 )?([0-9a-f]{16})[,:)]/g)].map((match) => `${match[1]}@${match[2]}`);
  return [...new Set(named)];
}
/** A row's twins, in pin order, each once: `<twin file>@<page digest>`. */
function twinsPinned(row: Row): string[] {
  return [...new Set(row.pins.filter((at) => at.twin !== undefined).map((at) => `${at.twin}@${digest(at.page)}`))];
}
const r3Rows = (): Row[] => ROWS.filter((row) => row.id.startsWith("R3-"));
const r4MemberRows = (): Row[] => ROWS.filter((row) => row.id.startsWith("R4-") && !row.id.startsWith("R4-F"));

/* ------------------------------------------------------------------ the census */

describe("wb-jwc.13 binding text reader sub-form census (test/helpers/rf-binding-text-reader.ts)", () => {
  for (const row of ROWS)
    describe(`${row.id}: ${row.label}`, () => {
      for (const at of row.pins)
        it(`${at.id} reads as pinned`, () => {
          expect(reading(at), `${row.id} ${at.id}`).toEqual(at.reading);
        });
    });

  it("SHAPE: the rows and their pins, and each pin's page, are the frozen set (standing rule 16)", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual([
      "R3-U1a:7", "R3-U1b:2", "R3-U1c:3", "R3-U1d:2", "R3-U2:3", "R4-U1a:2", "R4-U1b:2", "R4-U1c:5", "R4-U1d:2", "R4-R668:2", "R4-F2:3", "R4-F3:6",
    ]);
    expect(ROWS.flatMap((row) => row.pins.map((at) => `${at.id}:${digest(at.page)}`))).toEqual([
      "n03-ts:4683c4774af2e164", "n03-js:7fb4fbf7301c8f0c", "EV-ZERO:d734eea7ebe43878", "EV-ONE:992e22a72a4cd031",
      "EV-TWO:66f7c0072575eb2c", "EV-THREE:777091c3ff66895b", "EV-NONE:025735660d19d685", "n23:384c4b2382f1e1e7",
      "WD-FORMS:c57c9646e2824886", "n31:6b94788b573bb579", "CA-TS:c30202f13258761b", "CA-JS:9c004432c62ba782",
      "n18:c6f98fd2b748ae2a", "EF-FORMS:b3139d27a5e9e0b3", "n30:b0da7c958facc465", "n35:fdbb34a81c29040e",
      "BD-WHITESPACE:a069176905f1a486", "q06:972a9524951df019", "EX-POSITIONS:4ecc66ca83b63213", "q07:bc827e02b8e7f253",
      "WO-POSITIONS:580bd6457704631d", "q08:951150a7a262615c", "PG-POSITIONS:7dc99a9a184a1c67", "PG-WORDLESS:19fd7eaead2637e6",
      "PG-WORDS:86191cbe76d28b2b", "PG-WHITESPACE:ba323ea4d1822eb3",
      "p08:3cf6fa3a45eda664", "OR-ORDERS:d46fd2f48289fb93", "XT-TEXTS:17ff55942c562568", "XW-WORDS:8dd3d5171b8ea99e",
      "coll-programs:ddd76c8340a74979", "coll-registrations:ddd76c8340a74979", "coll-registration:ddd76c8340a74979", "p30:94111a5056405f34",
      "EV-IDENTIFIER:60a669211edd1f70", "EV-NUMBER:4feb86207931158c", "EV-TEMPLATE:f30e8c25e20de9b8", "EV-SPREAD:e74d5036c2c5185d",
      "EV-CALL:e2d17ff3aafa3719",
    ]);
  });

  it("ANCHOR: the tracker export's records name these rows, their labels and their twins (outside this file)", () => {
    const child = exportRow(CHILD);
    const parent = exportRow(PARENT);
    // (1) wb-jwc.13's description: refusal #3's unmet items.
    expect(JSON.parse(between(child.description, UNMET_LIST)), "wb-jwc.13's unmet list").toEqual([R3_CLASS, ...r3Rows().map((row) => row.label)]);
    // (2) wb-jwc.13's notes: the R-B263 fold of refusal #4's unmet items.
    expect(between(child.notes, FOLD).split("\n"), "the R-B263 fold").toEqual([R4_CLASS, ...r4MemberRows().map((row) => row.label)]);
    // (3) and (4) wb-jwc.10's notes: each refusal's UNMET block, its item labels and the twins each item names.
    for (const [marker, cls, rows] of [
      [R3_UNMET, R3_CLASS, r3Rows()],
      [R4_UNMET, R4_CLASS, r4MemberRows()],
    ] as const) {
      const held = items(between(parent.notes, marker));
      expect(
        held.map((item) => item.label),
        `${marker.open.slice(-40)}: its item labels`,
      ).toEqual([cls, ...rows.map((row) => row.label)]);
      for (const row of rows) expect(twinsNamed(held.find((item) => item.label === row.label)?.text ?? ""), `${row.id}: the twins its item names`).toEqual(twinsPinned(row));
    }
    const rider = items(between(parent.notes, R4_UNMET)).find((item) => item.label === "U1-R668 rider")?.text ?? "";
    expect(
      ["XT-TEXTS", "XW-WORDS"].filter((id) => rider.includes(`${id} '`)),
      "the rider names its two roster entries",
    ).toEqual(ROWS.find((row) => row.id === "R4-R668")?.pins.map((at) => at.id));
    // (5) wb-jwc.10's notes: refusal #4's findings that route their coverage to wb-jwc.13, each with the twin it names.
    const routed = between(parent.notes, R4_FINDINGS)
      .split("\n")
      .flatMap((line) => {
        const head = /^- F\d+ INFO: \[PREP head: "([^"]+)"/.exec(line)?.[1];
        return head !== undefined && /wb-jwc\.13 candidate|belongs to wb-jwc\.13/.test(line) ? [{ head, line }] : [];
      });
    const findingRows = ROWS.filter((each) => each.id.startsWith("R4-F"));
    expect(
      routed.map((finding) => finding.head),
      "refusal #4's findings routed to wb-jwc.13",
    ).toEqual(findingRows.map((row) => row.label));
    for (const row of findingRows) expect(twinsNamed(routed.find((finding) => finding.head === row.label)?.line ?? ""), `${row.id}: the twin its finding names`).toEqual(twinsPinned(row));
  });

  it("ROSTER: test/fixtures/rf-binding-text-reader-subforms-roster.json holds every row and pin, its page's digest, its forms and its reading (outside this file)", () => {
    const roster = JSON.parse(readFileSync(join(REPO, ROSTER), "utf8")) as { bead?: unknown; rows?: unknown };
    expect(roster.bead, `${ROSTER} is ${CHILD}'s roster`).toBe(CHILD);
    expect(roster.rows).toEqual(
      ROWS.map((row) => ({ row: row.id, label: row.label, pins: row.pins.map((at) => ({ pin: at.id, page: digest(at.page), forms: forms(at), reading: at.reading })) })),
    );
  });
});
