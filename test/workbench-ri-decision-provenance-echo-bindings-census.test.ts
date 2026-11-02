/**
 * wb-26dh bindings census (the rule-19 dependency-inversion child of wb-5333: ruling R-B222 filed it at wb-5333's refusal #3, ruling
 * R-B256 folded wb-5333's refusal #4 members into it). SUBJECT: one reader of test/helpers/ri-decision-provenance-echo-bindings.ts,
 * bindingsRead() - THE BINDINGS of the wb-tz4r.3 ri-decision-provenance-echo census - moved byte for byte from wb-5333's FINAL cut #4
 * (tip bce0de7f) with THE FORM in place of that tip's names test (the helper's header lists the lines). The parent's census and roster
 * at that tip are not on trunk and are neither added nor edited here; trunk's test/workbench-ri-decision-provenance-echo-census.test.ts
 * carries no THE BINDINGS reader and is not read by this census. The parent stays parked until this lands, and its later re-cut can
 * import bindingsRead.
 *
 * PINNED READER SET (this file, test/workbench-ri-decision-provenance-echo-bindings-census.test.ts; observed at the cut: 18 cases, every
 * case passes on the helper, and on the tip's own reader - the helper with the tip's names test restored - the X, E, K1 and K3-K6 pin
 * cases red). Each pin case is named "<pin id>: <quote>" and asserts, for every probe it holds, that bindingsRead() over the probe returns
 * exactly the literal reading written here (toEqual over the reader's whole output), once per probe (expect.assertions holds the
 * count, so a case that reads fewer probes than it holds reds). A probe is a planted source read as
 * test/probe.test.ts: each in-file side of IN_FILE_SIDES one top-level const of a string, but the sides the probe declares as written in
 * it, after the helper declarations it holds; a refused side reads '<side> is not one top-level const of literals'.
 * - Row X, the members of wb-5333's refusal #3 that wb-26dh's description carries, sides computed when the source runs through no
 *   identifier: X1 (INVOCATION through a dynamic import of node:module and createRequire), X2 (ROWS through a dynamic import of a helper
 *   module), X3k (QUOTE from the bead export through a dynamic import of node:fs), X4k (a string-keyed accessor on INVOCATION), X4 (that
 *   accessor reading a __proto__ property set from the roster read afresh) and X5b (QUOTE_PIN composing TRIGGER through a member call).
 *   Each pin but X4 holds the member's declaration as refusal #3's record quotes it, its paths left as the record's placeholders (a
 *   probe is parsed, never run): X1's, X2's and X3k's whole, X5b's as a head and a tail around the record's elision, and X4k's
 *   string-keyed accessor, which the record quotes inside a sentence, held in INVOCATION's declaration. X4's declaration is this
 *   file's (the record describes it in prose). Each pin but X4 also holds a named twin (X1n, X2n, X3n, X4n, X5n), which the tip's
 *   names test refuses too (claim (2)). Each probe is read refused.
 * - Row E, the members of wb-5333's refusal #4 that R-B256 folded into wb-26dh, sides naming a value inside an instantiation expression
 *   or a class expression's heritage clause: E1 (INVOCATION through an in-file helper called as an instantiation expression), E2 (ROWS
 *   likewise), E3 (INVOCATION spread from a new class expression extending an in-file class) and E4 (FIELD_SPELLINGS through another
 *   side's member called as an instantiation expression). Each pin holds the member's declaration as refusal #4's record quotes it -
 *   E1's, E2's and E3's whole and E4's as a head and a tail around the record's elision - and a named twin (E1n-E4n), which the tip's
 *   names test refuses too (claim (2)); each probe is read refused.
 * - Row K, THE FORM - the cure (a) wb-5333's refusal #3 names - clause by clause. K1 a string, a regular expression and a
 *   substitution-free template literal are read clean, and a number, a member of a string, two strings joined by +, a string in
 *   parentheses and another side's name are refused. K2 an array of strings, an array of regular expressions, an object keyed by an
 *   identifier and a string, objects and arrays nested, and an array read through `as const` are read clean. K3 a getter keyed by an
 *   identifier and by a string, a setter, a string-keyed method, a computed key, __proto__ as an identifier and as a string key, a
 *   shorthand property, a spread element and a spread property are refused. K4 deepFrozen over a string, an array, an object, a regular
 *   expression and an array read through `as const` is read clean, and deepFrozen with two arguments, over deepFrozen and over a spread
 *   argument, another function over a string and a member function over a string are refused. K5 row A's label composing TRIGGER is read
 *   clean, and TRIGGER composed into another side, into row B's label, into a pin quote of row A or into another member of row A,
 *   TRIGGER's member called or read in row A's label, and another side composed into it alone or beside TRIGGER are refused. K6 a
 *   call of a string's member, a call through an element access, an immediately invoked arrow function, a new expression, a tagged
 *   template, an await, an import() call, import.meta and a member of import.meta are refused, and so is every side declared by such a
 *   call, each in IN_FILE_SIDES's order as the tip lists them (:1334-1355), so the helper's side list and order are held to one literal
 *   reading here.
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its probe ids, and the rows'
 *   pins in pin order, each held to a literal.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl): (1) wb-26dh's title holds
 *   row X's label as its claim clause, and its description's member paragraph names exactly row X's pins, in order, each with its pin's
 *   quote and side, the side each member probe's reading refuses; (2) in wb-5333's notes, refusal #3 (from its CLAIMS at tip 6dacecc up
 *   to its RED) quotes between apostrophes the declarations row X's pins hold and no other, in pin order - each quotation read whole,
 *   from an apostrophe followed by 'const ' up to the first ';' followed by an apostrophe, and exactly these: X1's, X2's and X3k's,
 *   then X5b's head, the record's elision '...' and X5b's tail - and writes X4k's accessor exactly between 'INVOCATION gets a
 *   string-keyed accessor, ' and the next '. Result'; each of those member probes declares its side by one const line, which is exactly
 *   its pin's declaration (X5b's starting with the head and ending with the tail, X4k's holding the accessor); and refusal #3's CURE
 *   names its red-first members among row X's pins and holds row K's label as cure (a), whose text is exactly row K's pin quotes, in
 *   pin order, joined by the gaps CURE_A_GAPS writes - ', ' (K1 to K2), ' (' (K2 to K3), '), ' (K3 to K4), ', and ' (K4 to K5) and
 *   '; ' (K5 to K6) - with nothing before K1 or after K6; (3) in wb-5333's notes, refusal #4 (from 'refusal #4, on cut #4 bce0de7f' up
 *   to LOOP CAP AND NEXT RUNG) holds row E's label as its reason's cause, names exactly row E's pins with their sides, in order, and
 *   quotes between apostrophes, read as in (2), the declarations row E's pins hold and no other, in pin order, exactly these: E1's,
 *   E2's and E3's, then E4's head, the record's elision '...the three patterns...' and E4's tail - each member probe declaring its
 *   side by one const line, which is exactly its pin's declaration (E4's starting with the head and ending with the tail); (4)
 *   wb-26dh's notes open with the R-B256 fold: their first line is exactly the fold's head and their third its idem line, and their
 *   second, the fold's unmet slug, is exactly the readNames family's - U1-R514-R515-R668-R739, then
 *   READNAMES-NEVER-READS-EXPRESSION-WITH-TYPE-ARGUMENTS, then INSTANTIATION-AND-HERITAGE-IDENTIFIERS, then row E's sides in pin order
 *   without repeats, each underscore a hyphen, then 0-OF-18, joined by hyphens.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe bindingsRead() returns exactly the literal reading written here: a reader edit that
 * changes one reading reds that pin case. (2) Each X and E member is refused by THE FORM where the tip's names test read it clean: the
 * cutting seat runs this census over the tip's reader (RED-0) and reads every X and E pin case red at its member probe, while each
 * named twin reads refused on both readers; a reader mutant that admits one form the K probes spell reds the pin case holding it.
 * (3) The rows with their labels, row X's pins with their quotes and sides, row E's pins with their sides, the declarations of row X's
 * pins but X4 and of row E's pins as their records quote them (X5b's and E4's as the head and the tail around the record's elision,
 * X4k's as its accessor), row K's pin quotes with the gaps between them and the R-B256 fold's lines are the ones the tracker export
 * records, each held by exact equality, its ends included: a row or a pin removed, or one of those labels, quotes, gaps, sides,
 * declarations or fold lines changed - in one literal or in every literal together, among them a declaration or a row K quote cut at
 * its end or at its front or extended there, emptied, or every declaration emptied together - reds SHAPE or ANCHOR, and a pin's probes
 * exchanged for another pin's in one literal reds SHAPE (standing rule 16's CT1-CT6).
 *
 * NOT CLAIMED. A reading on any input that is not one of these probes is NOT CLAIMED by this census - among them a form the K probes do
 * not spell (a satisfies or angle-bracket assertion, a non-null assertion, a numeric key, a boolean or null, an operator other than +, a
 * function or class expression standing alone), a source that declares a side twice, by let or var, by an ambient const or otherwise
 * than by one top-level const (bindingsRead's declaration and let/var rules, moved unchanged), and a source whose deepFrozen is not the
 * parent's: bindingsRead reads the callee's name at a deepFrozen call and never deepFrozen's own declaration, so what deepFrozen returns
 * is NOT CLAIMED by this census (TRIGGER, an in-file side, is read at its own declaration like every side). Whether a side the reader
 * reads clean computes nothing when the source runs is NOT CLAIMED beyond these readings. Row E's pin quotes are this file's
 * descriptions of refusal #4's members (the export anchors their ids, sides and declarations, not the quotes), so a reworded row E
 * quote is NOT CLAIMED by this census; the row ids and row K's pin ids are this file's names, and the export anchors row K's quotes
 * and the gaps between them, but not which probes each row K pin holds, so row K pin ids renamed, or two row K pins' probes exchanged,
 * in every literal together is NOT CLAIMED by this census. A boundary moved between two literals that together compose one text the
 * export is compared with, so that text is kept byte for byte, is NOT CLAIMED by this census, since no export separates it from the
 * census as written - among them a row K quote and the gap beside it, a row's label or X4k's accessor and the bound beside it
 * (TITLE_CLAUSE, CAUSE, CURE_LABEL, ACCESSOR), X5b's or E4's head or tail and its elision, and two parts of the fold's slug. The part
 * of X5b's and E4's member declarations that their records elide, X4k's member declaration but its accessor, and X4's member
 * declaration (its record describes it in prose) are NOT CLAIMED by this census, and neither are the helper and class declarations a
 * probe holds before its sides (row E's in-file helpers, X2n's import). A probe removed together with its SHAPE entry is NOT CLAIMED
 * by this census, and a probe's source replaced with its id and reading kept is NOT CLAIMED by this census but for the member
 * declarations ANCHOR items (2) and (3) hold. The parent census's own header, cases, roster and SELF-READ are NOT CLAIMED by this
 * census. No residual is claimed. The harness itself - the pin cases' loop and their assertion count edited together - is NOT CLAIMED
 * by this census, and the helper's side list edited together with K6's every-side reading is NOT CLAIMED by this census.
 *
 * Display paths added: none (test-only). No scratch is allocated; the tracker export is only read; no src, docs or receipt is edited.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { bindingsRead, IN_FILE_SIDES } from "./helpers/ri-decision-provenance-echo-bindings.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXPORT = ".beads/issues.jsonl";
const CHILD = "wb-26dh";
const PARENT = "wb-5333";
/** The path every probe is read as. */
const PROBE_PATH = "test/probe.test.ts";
/** The first occurrences that open and close each export text this census reads (bead notes are append-only). */
const TITLE_CLAUSE = { open: "(rule-19 structural exit): ", close: ", or the header claim" } as const;
const MEMBER_PARAGRAPH = { open: "Members by mechanism (from the row): ", close: "\n" } as const;
const REFUSAL_3 = { open: "CLAIMS (census at tip 6dacecc", close: "\nRED (record.red" } as const;
const CURE_A = { open: "with planted pins for each form: ", close: ". Or (b)" } as const;
const CURE_LABEL = { open: "Either (a) ", close: ", red-first against " } as const;
const CURE_MEMBERS = { open: ", red-first against ", close: " with planted pins" } as const;
const REFUSAL_4 = { open: "refusal #4, on cut #4 bce0de7f", close: "\nLOOP CAP AND NEXT RUNG" } as const;
const CAUSE = { open: "ExpressionWithTypeArguments node, so ", close: ". Gate-authored " } as const;
const NAMED_E = { open: ". Gate-authored ", close: " each keep" } as const;
/** X4k's accessor, which refusal #3 writes inside a sentence: the words before it and the first words after it. */
const ACCESSOR = { open: "INVOCATION gets a string-keyed accessor, ", close: ". Result" } as const;
/** A declaration a refusal record quotes between apostrophes: from an apostrophe and 'const ' up to the first ';' and apostrophe after it. */
const QUOTATION = /'(const [\s\S]*?;)'/g;
/** wb-26dh's notes open with the R-B256 fold's three lines: its head, its unmet slug and its idem line. */
const FOLD_HEAD = "RULE19 DEPENDENCY INVERSION R-B256 (ruling M:44599, refusal O:1666): members folded into wb-26dh";
const FOLD_IDEM = "rule19-invert idem rule19-inversion-M44599-wb-5333-wb-26dh";
/** The fold's unmet slug: its rule ids, the readNames family, its class words, row E's sides and its count, joined by hyphens. */
const SLUG = { rules: "U1-R514-R515-R668-R739", family: "READNAMES-NEVER-READS-EXPRESSION-WITH-TYPE-ARGUMENTS", words: "INSTANTIATION-AND-HERITAGE-IDENTIFIERS", count: "0-OF-18" } as const;
/** The gaps cure (a) writes between row K's pin quotes, in pin order: K1 to K2, K2 to K3, K3 to K4, K4 to K5 and K5 to K6. */
const CURE_A_GAPS: readonly string[] = [", ", " (", "), ", ", and ", "; "];

interface Probe {
  readonly id: string;
  readonly source: string;
  readonly reading: readonly string[];
}
interface Pin {
  readonly id: string;
  readonly quote: string;
  /** X and E: the side the member declares. */
  readonly side?: string;
  /** X and E but X4: the member's declaration as its refusal record quotes it. */
  readonly quoted?: Quoted;
  readonly probes: readonly Probe[];
}
/** How a refusal record quotes a member's declaration: whole between apostrophes; between apostrophes as its head, the record's
 * elision and its tail; or, X4k's accessor, inside a sentence (ACCESSOR). */
type Quoted =
  | { readonly form: "whole"; readonly text: string }
  | { readonly form: "elided"; readonly head: string; readonly elision: string; readonly tail: string }
  | { readonly form: "sentence"; readonly text: string };
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The reading of a side THE BINDINGS refuse. */
const refused = (side: string): string => `${side} is not one top-level const of literals`;
/** A planted source: `before`, then each in-file side one top-level const of a string, but the sides `lines` declares as written there. */
function planted(lines: Readonly<Record<string, string>>, before: readonly string[] = []): string {
  return `${[...before, ...IN_FILE_SIDES.map(side => lines[side] ?? `const ${side} = "${side.toLowerCase()}";`)].join("\n")}\n`;
}
const probe = (id: string, lines: Readonly<Record<string, string>>, reading: readonly string[], before: readonly string[] = []): Probe => ({ id, source: planted(lines, before), reading });

/** The roster read afresh through no identifier, as wb-5333's refusal #3 quotes X1 (its placeholders kept) and its gate wrote X4. */
const FRESH_ROSTER = '(await import("node:module")).createRequire("<wt>/test/zz-gp6-anchor.ts")("./fixtures/<private roster>")';
const X1 = `const INVOCATION = deepFrozen(${FRESH_ROSTER}.invocation);`;
const X2 = 'const ROWS: readonly Row[] = deepFrozen((await import("./zz-gp6-x2-helper.js")).rows);';
const X3K = String.raw`const QUOTE: string = (await import("node:fs")).readFileSync("<wt>/.beads/issues.jsonl", "utf8").match(/'(Preserve [^']*)' docs\//)?.[1] ?? "";`;
const STRING_KEYED_TASK = 'get "task"(): string { return "summarise the notes"; }';
const X4K = `const INVOCATION = deepFrozen({ model: "pi-invocation-model-9d2", ${STRING_KEYED_TASK} });`;
const X4 = `const INVOCATION = deepFrozen({ __proto__: { "roster-task": ${FRESH_ROSTER}.invocation.task }, model: "pi-invocation-model-9d2", get "task"(): string { return (this as unknown as Readonly<Record<string, string>>)["roster-task"] ?? ""; } });`;
const X5B_HEAD = `const QUOTE_PIN = \`\${TRIGGER.slice(0, 0)}docs/programs/`;
const X5B_TAIL = "@485f3615db1e`;";
const X5B = `${X5B_HEAD}unified-decision-inference-2026-10-21/01-contracts.md:14${X5B_TAIL}`;
/** The in-file sources of wb-5333's refusal #4 members, as its gate wrote them (the private roster's name a placeholder here). */
const INVOCATION_OF = ["function invocationOf<T>(): T {", '  return JSON.parse(readFileSync(join(HERE, "fixtures", "<private roster>"), "utf8")).invocation;', "}"];
const ROWS_OF = [
  "function rowsOf<T>(): T {",
  '  return JSON.parse(readFileSync(join(HERE, "fixtures", "<private roster>"), "utf8")).rows.map((row: { id: string; label: string; pins: { id: string; quote: string }[] }) => ({',
  "    id: row.id,",
  "    label: row.label,",
  "    pins: row.pins.map(entry => ({ id: entry.id, quote: entry.quote })),",
  "  }));",
  "}",
];
const FRESH_INVOCATION = [
  "class FreshInvocation {",
  '  readonly model: string = JSON.parse(readFileSync(join(HERE, "fixtures", "<private roster>"), "utf8")).invocation.model;',
  '  readonly task: string = JSON.parse(readFileSync(join(HERE, "fixtures", "<private roster>"), "utf8")).invocation.task;',
  "}",
];
const INVOCATION_TYPE = "{ readonly model: string; readonly task: string }";
const E1 = `const INVOCATION = deepFrozen((invocationOf<${INVOCATION_TYPE}>)());`;
const E2 = "const ROWS: readonly Row[] = deepFrozen((rowsOf<readonly Row[]>)());";
const E3 = "const INVOCATION = deepFrozen({ ...new (class extends FreshInvocation {})() });";
const E4_HEAD = "const FIELD_SPELLINGS: readonly RegExp[] = deepFrozen((GATING_ARTIFACTS.flatMap<RegExp>)(() => []).concat([";
const E4_TAIL = "]));";
const E4 = `${E4_HEAD}/model[_.-]?revision/i, /sampling[_.-]?policy/i, /native_evidence/i${E4_TAIL}`;
/** Row A and row B of a ROWS literal, row A's label `label`, its pin's quote `quote` and row B's label `other`. */
const rowsWith = (label: string, quote = '"no package.json dependency"', other = '"(a) adoption fixture"'): string =>
  `const ROWS = deepFrozen([{ id: "A", label: ${label}, pins: [{ id: "A1", quote: ${quote} }] }, { id: "B", label: ${other}, pins: [] }]);`;
const ROW_A_LABEL = `\`(trigger, absent today) \${TRIGGER}\``;
/** The in-file sides, in their order of declaration at the tip (:1334-1355): K6's every-side probe reads each refused, in this order. */
const EVERY_SIDE: readonly string[] = [
  "BEAD",
  "PROGRAM_TAG",
  "TRIGGER",
  "QUOTE_PIN",
  "QUOTE",
  "GATING_ARTIFACTS",
  "INVOCATION",
  "FIELDS",
  "REF_KIND",
  "MEMBER",
  "RI_ROOT",
  "FIELD_SPELLINGS",
  "REF_PREFIX",
  "JUDGED_TITLE",
  "RECORD_TITLE",
  "ROWS",
  "SEPARATOR",
  "HARNESS",
  "RECORD",
  "HOOKS",
];

const PINS: readonly Pin[] = [
  {
    id: "X1",
    quote: "INVOCATION computed from the roster file read afresh (dynamic import of node:module, createRequire) beside the roster's task edited",
    side: "INVOCATION",
    quoted: { form: "whole", text: X1 },
    probes: [
      probe("X1", { INVOCATION: X1 }, [refused("INVOCATION")]),
      probe("X1n", { INVOCATION: 'const INVOCATION = deepFrozen(JSON.parse(readFileSync(join(HERE, "fixtures", "<private roster>"), "utf8")).invocation);' }, [refused("INVOCATION")]),
    ],
  },
  {
    id: "X2",
    quote: "ROWS computed by a helper module loaded through a dynamic import specifier beside the roster's row A label edited",
    side: "ROWS",
    quoted: { form: "whole", text: X2 },
    probes: [
      probe("X2", { ROWS: X2 }, [refused("ROWS")]),
      probe("X2n", { ROWS: "const ROWS: readonly Row[] = deepFrozen(HELPER_ROWS);" }, [refused("ROWS")], ['import { rows as HELPER_ROWS } from "./zz-gp6-x2n-helper.js";']),
    ],
  },
  {
    id: "X3k",
    quote: "QUOTE read from the bead export",
    side: "QUOTE",
    quoted: { form: "whole", text: X3K },
    probes: [
      probe("X3k", { QUOTE: X3K }, [refused("QUOTE")]),
      probe("X3n", { QUOTE: String.raw`const QUOTE: string = readFileSync(EXPORT_PATH, "utf8").match(/'(Preserve [^']*)' docs\//)?.[1] ?? "";` }, [refused("QUOTE")]),
    ],
  },
  {
    id: "X4k",
    quote: "a string-keyed accessor on INVOCATION",
    side: "INVOCATION",
    quoted: { form: "sentence", text: STRING_KEYED_TASK },
    probes: [
      probe("X4k", { INVOCATION: X4K }, [refused("INVOCATION")]),
      probe("X4n", { INVOCATION: 'const INVOCATION = deepFrozen({ model: "pi-invocation-model-9d2", get task(): string { return "summarise the notes"; } });' }, [refused("INVOCATION")]),
    ],
  },
  {
    id: "X4",
    quote: "a string-keyed accessor on INVOCATION",
    side: "INVOCATION",
    probes: [probe("X4", { INVOCATION: X4 }, [refused("INVOCATION")])],
  },
  {
    id: "X5b",
    quote: "QUOTE_PIN composed from TRIGGER",
    side: "QUOTE_PIN",
    quoted: { form: "elided", head: X5B_HEAD, elision: "...", tail: X5B_TAIL },
    probes: [
      probe("X5b", { QUOTE_PIN: X5B }, [refused("QUOTE_PIN")]),
      probe("X5n", { QUOTE: `const QUOTE = \`\${BEAD.slice(0, 0)}Preserve endpoint/model revision, sampling policy and complete native evidence where available.\`;` }, [refused("QUOTE")]),
    ],
  },
  {
    id: "E1",
    quote: "INVOCATION through an in-file helper called as an instantiation expression",
    side: "INVOCATION",
    quoted: { form: "whole", text: E1 },
    probes: [
      probe("E1", { INVOCATION: E1 }, [refused("INVOCATION")], INVOCATION_OF),
      probe("E1n", { INVOCATION: `const INVOCATION = deepFrozen(invocationOf<${INVOCATION_TYPE}>());` }, [refused("INVOCATION")], INVOCATION_OF),
    ],
  },
  {
    id: "E2",
    quote: "ROWS through an in-file helper called as an instantiation expression",
    side: "ROWS",
    quoted: { form: "whole", text: E2 },
    probes: [
      probe("E2", { ROWS: E2 }, [refused("ROWS")], ROWS_OF),
      probe("E2n", { ROWS: "const ROWS: readonly Row[] = deepFrozen(rowsOf<readonly Row[]>());" }, [refused("ROWS")], ROWS_OF),
    ],
  },
  {
    id: "E3",
    quote: "INVOCATION spread from a new class expression whose heritage clause names an in-file class",
    side: "INVOCATION",
    quoted: { form: "whole", text: E3 },
    probes: [
      probe("E3", { INVOCATION: E3 }, [refused("INVOCATION")], FRESH_INVOCATION),
      probe("E3n", { INVOCATION: "const INVOCATION = deepFrozen({ ...new FreshInvocation() });" }, [refused("INVOCATION")], FRESH_INVOCATION),
    ],
  },
  {
    id: "E4",
    quote: "FIELD_SPELLINGS through another side's member called as an instantiation expression",
    side: "FIELD_SPELLINGS",
    quoted: { form: "elided", head: E4_HEAD, elision: "...the three patterns...", tail: E4_TAIL },
    probes: [
      probe("E4", { FIELD_SPELLINGS: E4 }, [refused("FIELD_SPELLINGS")]),
      probe(
        "E4n",
        { FIELD_SPELLINGS: "const FIELD_SPELLINGS: readonly RegExp[] = deepFrozen(GATING_ARTIFACTS.flatMap<RegExp>(() => []).concat([/model[_.-]?revision/i, /sampling[_.-]?policy/i, /native_evidence/i]));" },
        [refused("FIELD_SPELLINGS")],
      ),
    ],
  },
  {
    id: "K1",
    quote: "admit only string, regex or substitution-free template literals",
    probes: [
      probe("every side a string", {}, []),
      probe("a regular expression", { SEPARATOR: "const SEPARATOR = /^[\\s,;:]*(?:(?:or|and)[\\s,;:]+)?$/;" }, []),
      probe("a substitution-free template literal", { JUDGED_TITLE: "const JUDGED_TITLE = `the judged set: the frozen shape and the cases agree`;" }, []),
      probe("a number", { BEAD: "const BEAD = 0;" }, [refused("BEAD")]),
      probe("a member of a string", { QUOTE: 'const QUOTE = "Preserve endpoint".length;' }, [refused("QUOTE")]),
      probe("two strings joined by +", { QUOTE: 'const QUOTE = "Preserve " + "endpoint";' }, [refused("QUOTE")]),
      probe("a string in parentheses", { QUOTE: 'const QUOTE = ("Preserve endpoint");' }, [refused("QUOTE")]),
      probe("another side's name", { BEAD: "const BEAD = QUOTE_PIN;" }, [refused("BEAD")]),
    ],
  },
  {
    id: "K2",
    quote: "array and object literals of them with plain property assignments",
    probes: [
      probe("an array of strings", { GATING_ARTIFACTS: 'const GATING_ARTIFACTS = ["RI-DEC-06", "RI-DEC-08"];' }, []),
      probe("an array of regular expressions", { FIELD_SPELLINGS: "const FIELD_SPELLINGS = [/endpoint/i, /revision/i];" }, []),
      probe("an object keyed by an identifier and a string", { INVOCATION: 'const INVOCATION = { model: "pi-invocation-model-9d2", "task": "summarise the notes" };' }, []),
      probe("objects and arrays nested", { RECORD: 'const RECORD = { context: "{ task }", statements: ["const walked = [];", `expect(walked).toHaveLength(0);`], hooks: [{ name: "afterEach" }] };' }, []),
      probe("an array read through as const", { FIELDS: 'const FIELDS = ["endpoint", "revision"] as const;' }, []),
    ],
  },
  {
    id: "K3",
    quote: "no accessor, method, computed key, __proto__ or spread",
    probes: [
      probe("a getter keyed by an identifier", { MEMBER: 'const MEMBER = { get endpoint(): string { return "riEndpoint"; } };' }, [refused("MEMBER")]),
      probe("a getter keyed by a string", { MEMBER: 'const MEMBER = { get "endpoint"(): string { return "riEndpoint"; } };' }, [refused("MEMBER")]),
      probe("a setter", { MEMBER: 'const MEMBER = { set "endpoint"(value: string) { void value; } };' }, [refused("MEMBER")]),
      probe("a string-keyed method", { MEMBER: 'const MEMBER = { "endpoint"(): string { return "riEndpoint"; } };' }, [refused("MEMBER")]),
      probe("a computed key", { MEMBER: 'const MEMBER = { ["endpoint"]: "riEndpoint" };' }, [refused("MEMBER")]),
      probe("__proto__ as an identifier key", { MEMBER: 'const MEMBER = { __proto__: { endpoint: "riEndpoint" } };' }, [refused("MEMBER")]),
      probe("__proto__ as a string key", { MEMBER: 'const MEMBER = { "__proto__": { endpoint: "riEndpoint" } };' }, [refused("MEMBER")]),
      probe("a shorthand property", { MEMBER: "const MEMBER = { TRIGGER };" }, [refused("MEMBER")]),
      probe("a spread element", { GATING_ARTIFACTS: 'const GATING_ARTIFACTS = [...["RI-DEC-06", "RI-DEC-08"]];' }, [refused("GATING_ARTIFACTS")]),
      probe("a spread property", { MEMBER: 'const MEMBER = { ...{ endpoint: "riEndpoint" } };' }, [refused("MEMBER")]),
    ],
  },
  {
    id: "K4",
    quote: "deepFrozen(...) over those",
    probes: [
      probe("deepFrozen over a string", { BEAD: 'const BEAD = deepFrozen("wb-tz4r.3");' }, []),
      probe("deepFrozen over an array", { GATING_ARTIFACTS: 'const GATING_ARTIFACTS = deepFrozen(["RI-DEC-06", "RI-DEC-08"]);' }, []),
      probe("deepFrozen over an object", { REF_KIND: 'const REF_KIND = deepFrozen({ endpoint: "ri-endpoint", "revision": "ri-revision" });' }, []),
      probe("deepFrozen over a regular expression", { REF_PREFIX: "const REF_PREFIX = deepFrozen(/^[a-z][a-z0-9-]*:$/);" }, []),
      probe("deepFrozen over an array read through as const", { FIELDS: 'const FIELDS = deepFrozen(["endpoint", "revision"] as const);' }, []),
      probe("deepFrozen with two arguments", { BEAD: 'const BEAD = deepFrozen("wb-tz4r.3", "wb-26dh");' }, [refused("BEAD")]),
      probe("deepFrozen over deepFrozen", { BEAD: 'const BEAD = deepFrozen(deepFrozen("wb-tz4r.3"));' }, [refused("BEAD")]),
      probe("deepFrozen over a spread argument", { GATING_ARTIFACTS: 'const GATING_ARTIFACTS = deepFrozen(...[["RI-DEC-06", "RI-DEC-08"]]);' }, [refused("GATING_ARTIFACTS")]),
      probe("another function over a string", { BEAD: 'const BEAD = String("wb-tz4r.3");' }, [refused("BEAD")]),
      probe("a member function over a string", { BEAD: 'const BEAD = Object.freeze("wb-tz4r.3");' }, [refused("BEAD")]),
    ],
  },
  {
    id: "K5",
    quote: "TRIGGER only in row A's label",
    probes: [
      probe("row A's label composing TRIGGER", { ROWS: rowsWith(ROW_A_LABEL) }, []),
      probe("TRIGGER composed into another side", { QUOTE_PIN: `const QUOTE_PIN = \`\${TRIGGER}docs/programs/unified-decision-inference-2026-10-21/01-contracts.md:14@485f3615db1e\`;` }, [refused("QUOTE_PIN")]),
      probe("TRIGGER composed into row B's label", { ROWS: rowsWith(ROW_A_LABEL, undefined, `\`(a) \${TRIGGER}\``) }, [refused("ROWS")]),
      probe("TRIGGER composed into a pin quote of row A", { ROWS: rowsWith(ROW_A_LABEL, `\`no package.json dependency \${TRIGGER}\``) }, [refused("ROWS")]),
      probe(
        "TRIGGER composed into another member of row A",
        { ROWS: `const ROWS = deepFrozen([{ id: "A", label: ${ROW_A_LABEL}, note: \`\${TRIGGER}\`, pins: [] }]);` },
        [refused("ROWS")],
      ),
      probe("TRIGGER's member called in row A's label", { ROWS: rowsWith(`\`(trigger, absent today) \${TRIGGER.slice(0, 0)}\``) }, [refused("ROWS")]),
      probe("TRIGGER's member read in row A's label", { ROWS: rowsWith(`\`(trigger, absent today) \${TRIGGER.length}\``) }, [refused("ROWS")]),
      probe("another side composed alone into row A's label", { ROWS: rowsWith(`\`(trigger, absent today) \${QUOTE}\``) }, [refused("ROWS")]),
      probe("another side composed beside TRIGGER into row A's label", { ROWS: rowsWith(`\`(trigger, absent today) \${TRIGGER}\${QUOTE}\``) }, [refused("ROWS")]),
    ],
  },
  {
    id: "K6",
    quote: "refuse any other call, await or import()",
    probes: [
      probe("a call of a string's member", { QUOTE: 'const QUOTE = "Preserve endpoint".trim();' }, [refused("QUOTE")]),
      probe("a call through an element access", { QUOTE: 'const QUOTE = "Preserve endpoint"["trim"]();' }, [refused("QUOTE")]),
      probe("an immediately invoked arrow function", { QUOTE: 'const QUOTE = (() => "Preserve endpoint")();' }, [refused("QUOTE")]),
      probe("a new expression", { INVOCATION: "const INVOCATION = new (class {})();" }, [refused("INVOCATION")]),
      probe("a tagged template", { QUOTE: "const QUOTE = String.raw`Preserve endpoint`;" }, [refused("QUOTE")]),
      probe("an await", { QUOTE: 'const QUOTE = await "Preserve endpoint";' }, [refused("QUOTE")]),
      probe("an import() call", { QUOTE: 'const QUOTE = import("node:fs");' }, [refused("QUOTE")]),
      probe("import.meta", { QUOTE_PIN: "const QUOTE_PIN = import.meta;" }, [refused("QUOTE_PIN")]),
      probe("a member of import.meta", { QUOTE_PIN: "const QUOTE_PIN = import.meta.url;" }, [refused("QUOTE_PIN")]),
      probe("every side a call of a string's member", Object.fromEntries(IN_FILE_SIDES.map(side => [side, `const ${side} = "${side}".trim();`])), EVERY_SIDE.map(refused)),
    ],
  },
];

const ROWS: readonly Row[] = [
  { id: "X", label: "THE BINDINGS reader refuses run-time-computed sides that name no identifier", pins: ["X1", "X2", "X3k", "X4k", "X4", "X5b"] },
  { id: "E", label: "an identifier named as a value inside an instantiation expression or a class heritage clause is never read", pins: ["E1", "E2", "E3", "E4"] },
  { id: "K", label: "read the initializer's FORM, not only its names", pins: ["K1", "K2", "K3", "K4", "K5", "K6"] },
];

function pinOf(id: string): Pin {
  const pin = PINS.find(candidate => candidate.id === id);
  if (pin === undefined) throw new Error(`${id}: no such pin`);
  return pin;
}
/** A row of ROWS by id; a row this file lacks reads as an empty row, so ANCHOR's export reads, not this lookup, decide the case. */
function rowOf(id: string): Row {
  return ROWS.find(candidate => candidate.id === id) ?? { id, label: "", pins: [] };
}
/** bindingsRead() over a probe's source, read as PROBE_PATH. */
function readingOf(source: string): string[] {
  return bindingsRead(ts.createSourceFile(PROBE_PATH, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS));
}
/** A bead's title, description and notes, read from its row in the tracked tracker export. */
function exportRow(bead: string): { readonly title: string; readonly description: string; readonly notes: string } {
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (typeof value !== "object" || value === null || !("id" in value) || value.id !== bead) continue;
    const text = (field: string): string => (field in value && typeof (value as Record<string, unknown>)[field] === "string" ? String((value as Record<string, unknown>)[field]) : "");
    return { title: text("title"), description: text("description"), notes: text("notes") };
  }
  throw new Error(`${bead}: no row in ${EXPORT}`);
}
/** The text after the first occurrence of `open` up to the first occurrence of `close` after it ("" when either is absent). */
function between(text: string, bounds: { readonly open: string; readonly close: string }): string {
  const start = text.indexOf(bounds.open);
  if (start < 0) return "";
  const end = text.indexOf(bounds.close, start + bounds.open.length);
  return end < 0 ? "" : text.slice(start + bounds.open.length, end);
}
/** The first in-file side a text names as a word, or undefined. */
function sideIn(text: string): string | undefined {
  return (text.match(/\b[A-Z][A-Z_]*[A-Z]\b/g) ?? []).find(word => IN_FILE_SIDES.includes(word));
}
/** The members a member paragraph names, in order: '<id>[ and <id>] <phrase>[ - <result>]' segments joined by '; ', each with the
 * first in-file side its phrase names; a segment that opens with no id or names no side is not a member's. */
function membersOf(paragraph: string): { readonly id: string; readonly phrase: string; readonly side: string }[] {
  const members: { id: string; phrase: string; side: string }[] = [];
  for (const segment of paragraph.split("; ")) {
    const match = /^(X\d+[a-z]?(?: and X\d+[a-z]?)*) (.+?)(?: - .*)?$/.exec(segment);
    const phrase = match?.[2];
    const side = phrase === undefined ? undefined : sideIn(phrase);
    if (match?.[1] === undefined || phrase === undefined || side === undefined) continue;
    for (const id of match[1].split(" and ")) if (!members.some(member => member.id === id)) members.push({ id, phrase, side });
  }
  return members;
}
/** The declarations a refusal record quotes between apostrophes (QUOTATION), in the record's order. */
function quotations(record: string): string[] {
  return [...record.matchAll(QUOTATION)].map(match => match[1] ?? "");
}
/** The quotations a record writes between apostrophes for these pins' declarations, in pin order (a sentence quote writes none). */
function recordedOf(pins: readonly string[]): string[] {
  return pins.flatMap(id => {
    const quoted = pinOf(id).quoted;
    if (quoted === undefined || quoted.form === "sentence") return [];
    return [quoted.form === "whole" ? quoted.text : `${quoted.head}${quoted.elision}${quoted.tail}`];
  });
}
/** The one line of a probe's source that declares `side` by a const statement, or undefined when none or more than one does. */
function declarationOf(source: string, side: string): string | undefined {
  const lines = source.split("\n").filter(line => /^const ([A-Z_]+)\b/.exec(line)?.[1] === side);
  return lines.length === 1 ? lines[0] : undefined;
}
/** A pin's member probe declares its side by the declaration the pin's quote holds: that line exactly, a line starting with the head
 * and ending with the tail, or a line holding the accessor. */
function expectDeclared(pin: Pin): void {
  const quoted = pin.quoted;
  if (quoted === undefined) return;
  const declaration = declarationOf(pin.probes[0]?.source ?? "", pin.side ?? "");
  const message = `${pin.id}: the member probe declares ${pin.side ?? "<none>"} by the declaration its pin holds`;
  if (quoted.form === "whole") expect(declaration, message).toBe(quoted.text);
  else if (quoted.form === "elided") expect([declaration?.startsWith(quoted.head), declaration?.endsWith(quoted.tail)], message).toEqual([true, true]);
  else expect(declaration, message).toContain(quoted.text);
}
/** `quotes` in order with gaps[i] between quote i and quote i + 1, or undefined unless the gaps number one fewer than the quotes. */
function joined(quotes: readonly string[], gaps: readonly string[]): string | undefined {
  if (quotes.length === 0 || gaps.length !== quotes.length - 1) return undefined;
  return quotes.reduce((text, quote, index) => `${text}${gaps[index - 1] ?? ""}${quote}`);
}

describe("wb-26dh bindings census (test/helpers/ri-decision-provenance-echo-bindings.ts): sixteen pin cases, each holding literal bindingsRead() readings of planted sources - wb-5333's run-time-computed (X) and instantiation and heritage (E) members and the named twins of all but X4 refused, and THE FORM's admitted and refused forms (K) - with SHAPE and ANCHOR", () => {
  it("SHAPE: the rows, their pins and each pin's probe ids stay frozen", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["X:6", "E:4", "K:6"]);
    expect(PINS.map(pin => `${pin.id}:${pin.probes.map(entry => entry.id).join(",")}`)).toEqual([
      "X1:X1,X1n",
      "X2:X2,X2n",
      "X3k:X3k,X3n",
      "X4k:X4k,X4n",
      "X4:X4",
      "X5b:X5b,X5n",
      "E1:E1,E1n",
      "E2:E2,E2n",
      "E3:E3,E3n",
      "E4:E4,E4n",
      "K1:every side a string,a regular expression,a substitution-free template literal,a number,a member of a string,two strings joined by +,a string in parentheses,another side's name",
      "K2:an array of strings,an array of regular expressions,an object keyed by an identifier and a string,objects and arrays nested,an array read through as const",
      "K3:a getter keyed by an identifier,a getter keyed by a string,a setter,a string-keyed method,a computed key,__proto__ as an identifier key,__proto__ as a string key,a shorthand property,a spread element,a spread property",
      "K4:deepFrozen over a string,deepFrozen over an array,deepFrozen over an object,deepFrozen over a regular expression,deepFrozen over an array read through as const,deepFrozen with two arguments,deepFrozen over deepFrozen,deepFrozen over a spread argument,another function over a string,a member function over a string",
      "K5:row A's label composing TRIGGER,TRIGGER composed into another side,TRIGGER composed into row B's label,TRIGGER composed into a pin quote of row A,TRIGGER composed into another member of row A,TRIGGER's member called in row A's label,TRIGGER's member read in row A's label,another side composed alone into row A's label,another side composed beside TRIGGER into row A's label",
      "K6:a call of a string's member,a call through an element access,an immediately invoked arrow function,a new expression,a tagged template,an await,an import() call,import.meta,a member of import.meta,every side a call of a string's member",
    ]);
    expect(ROWS.flatMap(row => row.pins), "the rows hold every pin once, in pin order").toEqual(PINS.map(pin => pin.id));
  });

  it("ANCHOR: the rows' labels, row X's pins with their quotes, sides and recorded declarations, row E's pins with their sides and recorded declarations, row K's quotes with their gaps and the R-B256 fold are the ones wb-26dh's and wb-5333's tracker-export rows record", () => {
    const child = exportRow(CHILD);
    const parent = exportRow(PARENT);
    const rowX = rowOf("X");
    expect(between(child.title, TITLE_CLAUSE), "wb-26dh's title holds row X's label as its claim clause").toBe(rowX.label);
    const members = membersOf(between(child.description, MEMBER_PARAGRAPH));
    expect(
      members.map(member => member.id),
      "wb-26dh's description's member paragraph names exactly row X's pins, in order",
    ).toEqual(rowX.pins);
    for (const member of members) {
      const pin = pinOf(member.id);
      expect([pin.quote, pin.side], `${pin.id}: the quote and side the description's member paragraph gives it`).toEqual([member.phrase, member.side]);
      expect([pin.probes[0]?.id, pin.probes[0]?.reading], `${pin.id}: its member probe reads its side refused`).toEqual([pin.id, [refused(member.side)]]);
    }
    const refusal3 = between(parent.notes, REFUSAL_3);
    expect(refusal3.length > 0, "wb-5333's notes hold refusal #3's record").toBe(true);
    expect(quotations(refusal3), "refusal #3 quotes between apostrophes exactly the declarations row X's pins hold, in pin order").toEqual(recordedOf(rowX.pins));
    for (const id of rowX.pins) {
      const pin = pinOf(id);
      if (pin.quoted?.form === "sentence") expect(between(refusal3, ACCESSOR), `${id}: refusal #3 writes the accessor its pin holds, between its sentence's words`).toBe(pin.quoted.text);
      expectDeclared(pin);
    }
    const rowK = rowOf("K");
    expect(between(refusal3, CURE_LABEL), "refusal #3's CURE holds row K's label as cure (a)").toBe(rowK.label);
    const redFirst = between(refusal3, CURE_MEMBERS).split(/, | and /);
    expect(
      redFirst.filter(id => rowX.pins.includes(id)),
      "the members cure (a) names red-first are row X's pins, in row X's order",
    ).toEqual(rowX.pins.filter(id => redFirst.includes(id)));
    expect(redFirst.length > 0 && redFirst.every(id => rowX.pins.includes(id)), `cure (a) names its red-first members: ${redFirst.join(", ")}`).toBe(true);
    expect(between(refusal3, CURE_A), "cure (a)'s text is exactly row K's pin quotes, in pin order, joined by CURE_A_GAPS").toBe(
      joined(
        rowK.pins.map(id => pinOf(id).quote),
        CURE_A_GAPS,
      ),
    );
    const rowE = rowOf("E");
    const refusal4 = between(parent.notes, REFUSAL_4);
    expect(between(refusal4, CAUSE), "refusal #4's reason holds row E's label as its cause").toBe(rowE.label);
    const named = [...between(refusal4, NAMED_E).matchAll(/\b(E\d+) \(([A-Z_]+)\)/g)].map(match => ({ id: match[1] ?? "", side: match[2] ?? "" }));
    expect(
      named.map(member => member.id),
      "refusal #4's reason names exactly row E's pins, in order",
    ).toEqual(rowE.pins);
    expect(quotations(refusal4), "refusal #4 quotes between apostrophes exactly the declarations row E's pins hold, in pin order").toEqual(recordedOf(rowE.pins));
    for (const member of named) {
      const pin = pinOf(member.id);
      expect(pin.side, `${pin.id}: the side refusal #4 names for it`).toBe(member.side);
      expect([pin.probes[0]?.id, pin.probes[0]?.reading], `${pin.id}: its member probe reads its side refused`).toEqual([pin.id, [refused(member.side)]]);
      expectDeclared(pin);
    }
    const [head, slug, idem] = child.notes.split("\n");
    expect([head, idem], "wb-26dh's notes open with the R-B256 fold: its head line first, its idem line third").toEqual([FOLD_HEAD, FOLD_IDEM]);
    const sides = [...new Set(rowE.pins.map(id => pinOf(id).side ?? ""))].map(side => side.replaceAll("_", "-"));
    expect(slug, "the fold's unmet slug, the notes' second line, is the readNames family's, naming row E's sides in pin order").toBe([SLUG.rules, SLUG.family, SLUG.words, ...sides, SLUG.count].join("-"));
  });

  for (const pin of PINS) {
    it(`${pin.id}: ${pin.quote}`, () => {
      expect.assertions(pin.probes.length);
      for (const entry of pin.probes) {
        expect(readingOf(entry.source), `${pin.id} / ${entry.id}: bindingsRead reads the probe exactly as written here`).toEqual(entry.reading);
      }
    });
  }
});
