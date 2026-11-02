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
 *   Each pin holds the member's declaration as the refusal's gate wrote it - as its record quotes it, but X4's, which the record
 *   describes in prose - its paths left as the record's placeholders (a probe is parsed, never run), and, but X4, its named twin as the
 *   gate wrote it, which names its source (X1n, X2n, X3n, X4n, X5n); each is read refused.
 * - Row E, the members of wb-5333's refusal #4 that R-B256 folded into wb-26dh, sides naming a value inside an instantiation expression
 *   or a class expression's heritage clause: E1 (INVOCATION through an in-file helper called as an instantiation expression), E2 (ROWS
 *   likewise), E3 (INVOCATION spread from a new class expression extending an in-file class) and E4 (FIELD_SPELLINGS through another
 *   side's member called as an instantiation expression), each with its named twin (E1n-E4n), each read refused.
 * - Row K, THE FORM - the cure (a) wb-5333's refusal #3 names - clause by clause. K1 a string, a regular expression and a
 *   substitution-free template literal are read clean, and a number, a member of a string, two strings joined by +, a string in
 *   parentheses and another side's name are refused. K2 an array of strings, an array of regular expressions, an object keyed by an
 *   identifier and a string, objects and arrays nested, and an array read through `as const` are read clean. K3 a getter keyed by an
 *   identifier and by a string, a setter, a string-keyed method, a computed key, __proto__ as an identifier and as a string key, a
 *   shorthand property, a spread element and a spread property are refused. K4 deepFrozen over a string, an array, an object, a regular
 *   expression and an array read through `as const` is read clean, and deepFrozen with two arguments, over deepFrozen and over a spread
 *   argument, another function over a string and a member function over a string are refused. K5 row A's label composing TRIGGER is read
 *   clean, and TRIGGER composed into another side, into row B's label, into a pin quote of row A or into another member of row A,
 *   TRIGGER read through a member in row A's label and another side composed into it are refused. K6 a call of a string's member, a call
 *   through an element access, an immediately invoked arrow function, a new expression, a tagged template, an await, an import() call
 *   and import.meta are refused, and so is every side declared by such a call, each in IN_FILE_SIDES's order as the tip lists them
 *   (:1334-1355), so the helper's side list and order are held to one literal reading here.
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its probe ids, and the rows'
 *   pins in pin order, each held to a literal.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl and never retyped as the
 *   expectation): (1) wb-26dh's title holds row X's label as its claim clause, and its description's member paragraph names exactly
 *   row X's pins, in order, each with its pin's quote and side, the side each member probe's reading refuses; (2) in wb-5333's notes,
 *   refusal #3 (from its CLAIMS at tip 6dacecc up to its RED) quotes each row X member's declaration that its pin holds, and its CURE
 *   names its red-first members among row X's pins and holds row K's label as cure (a), whose text row K's pin quotes tile, in pin
 *   order, with separator-only gaps; (3) in wb-5333's notes, refusal #4 (from 'refusal #4, on cut #4 bce0de7f' up to LOOP CAP AND NEXT
 *   RUNG) holds row E's label as its reason's cause, names exactly row E's pins with their sides, in order, and quotes each row E
 *   member's declaration that its pin holds; (4) wb-26dh's notes open with the R-B256 fold, whose unmet slug names the readNames family
 *   and each of row E's sides.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe bindingsRead() returns exactly the literal reading written here: a reader edit that
 * changes one reading reds that pin case. (2) Each X and E member is refused by THE FORM where the tip's names test read it clean: the
 * cutting seat runs this census over the tip's reader (RED-0) and reads every X and E pin case red at its member probe, while each
 * named twin reads refused on both readers; a reader mutant that admits one form the K probes spell reds the pin case holding it.
 * (3) The rows with their labels, row X's pins with their quotes, sides and declarations, row E's pins with their sides and
 * declarations, and row K's pin quotes are the ones the tracker export records: a row or a pin removed, or one of those labels, quotes,
 * sides or declarations changed - in one literal or in every literal together - reds SHAPE or ANCHOR, and a pin's probes exchanged for
 * another pin's in one literal reds SHAPE (standing rule 16's CT1-CT6).
 *
 * NOT CLAIMED. A reading on any input that is not one of these probes is NOT CLAIMED by this census - among them a form the K probes do
 * not spell (a satisfies or angle-bracket assertion, a non-null assertion, a numeric key, a boolean or null, an operator other than +, a
 * function or class expression standing alone), a source that declares a side twice, by let or var, by an ambient const or otherwise
 * than by one top-level const (bindingsRead's declaration and let/var rules, moved unchanged), and a source whose deepFrozen is not the
 * parent's: bindingsRead reads the callee's name at a deepFrozen call and never deepFrozen's own declaration, so what deepFrozen returns
 * is NOT CLAIMED by this census (TRIGGER, an in-file side, is read at its own declaration like every side). Whether a side the reader
 * reads clean computes nothing when the source runs is NOT CLAIMED beyond these readings. Row E's pin quotes are this file's
 * descriptions of refusal #4's members (the export anchors their ids, sides and declarations, not the quotes), so a row E quote reworded
 * in every literal together is NOT CLAIMED by this census; the row ids and row K's pin ids are this file's names, and the export anchors
 * row K's quotes, by tiling, but not which probes each row K pin holds, so row K pin ids renamed, or two row K pins' probes exchanged,
 * in every literal together is NOT CLAIMED by this census. The parent census's own header, cases, roster and SELF-READ are NOT CLAIMED by this census. No
 * residual is claimed. The harness itself - the pin cases' loop and their assertion count edited together - is NOT CLAIMED by this
 * census, and the helper's side list edited together with K6's every-side reading is NOT CLAIMED by this census.
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
const FOLD = { open: "RULE19 DEPENDENCY INVERSION R-B256", close: "\nrule19-invert idem" } as const;
/** A gap between two tiled quotes: separators only (the parent census's SEPARATOR, with parentheses). */
const GAP = /^[\s,;:()]*(?:and[\s,;:()]+)?$/;

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
  /** X and E: the member's declaration (or its quoted part) as its refusal record quotes it. */
  readonly quoted?: string;
  readonly probes: readonly Probe[];
}
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
const X5B = `${X5B_HEAD}unified-decision-inference-2026-10-21/01-contracts.md:14@485f3615db1e\`;`;
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
const E4 = `${E4_HEAD}/model[_.-]?revision/i, /sampling[_.-]?policy/i, /native_evidence/i]));`;
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
    quoted: X1,
    probes: [
      probe("X1", { INVOCATION: X1 }, [refused("INVOCATION")]),
      probe("X1n", { INVOCATION: 'const INVOCATION = deepFrozen(JSON.parse(readFileSync(join(HERE, "fixtures", "<private roster>"), "utf8")).invocation);' }, [refused("INVOCATION")]),
    ],
  },
  {
    id: "X2",
    quote: "ROWS computed by a helper module loaded through a dynamic import specifier beside the roster's row A label edited",
    side: "ROWS",
    quoted: X2,
    probes: [
      probe("X2", { ROWS: X2 }, [refused("ROWS")]),
      probe("X2n", { ROWS: "const ROWS: readonly Row[] = deepFrozen(HELPER_ROWS);" }, [refused("ROWS")], ['import { rows as HELPER_ROWS } from "./zz-gp6-x2n-helper.js";']),
    ],
  },
  {
    id: "X3k",
    quote: "QUOTE read from the bead export",
    side: "QUOTE",
    quoted: X3K,
    probes: [
      probe("X3k", { QUOTE: X3K }, [refused("QUOTE")]),
      probe("X3n", { QUOTE: String.raw`const QUOTE: string = readFileSync(EXPORT_PATH, "utf8").match(/'(Preserve [^']*)' docs\//)?.[1] ?? "";` }, [refused("QUOTE")]),
    ],
  },
  {
    id: "X4k",
    quote: "a string-keyed accessor on INVOCATION",
    side: "INVOCATION",
    quoted: STRING_KEYED_TASK,
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
    quoted: X5B_HEAD,
    probes: [
      probe("X5b", { QUOTE_PIN: X5B }, [refused("QUOTE_PIN")]),
      probe("X5n", { QUOTE: `const QUOTE = \`\${BEAD.slice(0, 0)}Preserve endpoint/model revision, sampling policy and complete native evidence where available.\`;` }, [refused("QUOTE")]),
    ],
  },
  {
    id: "E1",
    quote: "INVOCATION through an in-file helper called as an instantiation expression",
    side: "INVOCATION",
    quoted: E1,
    probes: [
      probe("E1", { INVOCATION: E1 }, [refused("INVOCATION")], INVOCATION_OF),
      probe("E1n", { INVOCATION: `const INVOCATION = deepFrozen(invocationOf<${INVOCATION_TYPE}>());` }, [refused("INVOCATION")], INVOCATION_OF),
    ],
  },
  {
    id: "E2",
    quote: "ROWS through an in-file helper called as an instantiation expression",
    side: "ROWS",
    quoted: E2,
    probes: [
      probe("E2", { ROWS: E2 }, [refused("ROWS")], ROWS_OF),
      probe("E2n", { ROWS: "const ROWS: readonly Row[] = deepFrozen(rowsOf<readonly Row[]>());" }, [refused("ROWS")], ROWS_OF),
    ],
  },
  {
    id: "E3",
    quote: "INVOCATION spread from a new class expression whose heritage clause names an in-file class",
    side: "INVOCATION",
    quoted: E3,
    probes: [
      probe("E3", { INVOCATION: E3 }, [refused("INVOCATION")], FRESH_INVOCATION),
      probe("E3n", { INVOCATION: "const INVOCATION = deepFrozen({ ...new FreshInvocation() });" }, [refused("INVOCATION")], FRESH_INVOCATION),
    ],
  },
  {
    id: "E4",
    quote: "FIELD_SPELLINGS through another side's member called as an instantiation expression",
    side: "FIELD_SPELLINGS",
    quoted: E4_HEAD,
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
      probe("TRIGGER read through a member in row A's label", { ROWS: rowsWith(`\`(trigger, absent today) \${TRIGGER.slice(0, 0)}\``) }, [refused("ROWS")]),
      probe("another side composed into row A's label", { ROWS: rowsWith(`\`(trigger, absent today) \${QUOTE}\``) }, [refused("ROWS")]),
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
      probe("import.meta", { QUOTE_PIN: "const QUOTE_PIN = import.meta.url;" }, [refused("QUOTE_PIN")]),
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
function rowOf(id: string): Row {
  const row = ROWS.find(candidate => candidate.id === id);
  if (row === undefined) throw new Error(`${id}: no such row`);
  return row;
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
/** Where `quotes`, in order, fail to tile `body` with separator-only gaps: each missing quote and each gap that is not one. */
function untiled(body: string, quotes: readonly string[]): string[] {
  const misses: string[] = [];
  let at = 0;
  for (const quote of quotes) {
    const found = body.indexOf(quote, at);
    if (found < 0) {
      misses.push(`missing: ${quote}`);
      continue;
    }
    if (!GAP.test(body.slice(at, found))) misses.push(`gap: ${body.slice(at, found)}`);
    at = found + quote.length;
  }
  if (!GAP.test(body.slice(at))) misses.push(`gap: ${body.slice(at)}`);
  return misses;
}

describe("wb-26dh bindings census (test/helpers/ri-decision-provenance-echo-bindings.ts): sixteen pin cases, each holding literal bindingsRead() readings of planted sources - wb-5333's run-time-computed (X) and instantiation and heritage (E) members refused beside their named twins, and THE FORM's admitted and refused forms (K) - with SHAPE and ANCHOR", () => {
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
      "K5:row A's label composing TRIGGER,TRIGGER composed into another side,TRIGGER composed into row B's label,TRIGGER composed into a pin quote of row A,TRIGGER composed into another member of row A,TRIGGER read through a member in row A's label,another side composed into row A's label",
      "K6:a call of a string's member,a call through an element access,an immediately invoked arrow function,a new expression,a tagged template,an await,an import() call,import.meta,every side a call of a string's member",
    ]);
    expect(ROWS.flatMap(row => row.pins), "the rows hold every pin once, in pin order").toEqual(PINS.map(pin => pin.id));
  });

  it("ANCHOR: the rows' labels, row X's and row E's pins with their quotes, sides and declarations, and row K's quotes are the ones wb-26dh's and wb-5333's tracker-export rows record", () => {
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
    for (const id of rowX.pins) {
      const pin = pinOf(id);
      if (pin.quoted === undefined) continue;
      expect(refusal3, `${id}: refusal #3 quotes the member's declaration its pin holds`).toContain(pin.quoted);
      expect(pin.probes[0]?.source, `${id}: the member probe holds that declaration`).toContain(pin.quoted);
    }
    const rowK = rowOf("K");
    expect(between(refusal3, CURE_LABEL), "refusal #3's CURE holds row K's label as cure (a)").toBe(rowK.label);
    const redFirst = between(refusal3, CURE_MEMBERS).split(/, | and /);
    expect(
      redFirst.filter(id => rowX.pins.includes(id)),
      "the members cure (a) names red-first are row X's pins, in row X's order",
    ).toEqual(rowX.pins.filter(id => redFirst.includes(id)));
    expect(redFirst.length > 0 && redFirst.every(id => rowX.pins.includes(id)), `cure (a) names its red-first members: ${redFirst.join(", ")}`).toBe(true);
    expect(
      untiled(
        between(refusal3, CURE_A),
        rowK.pins.map(id => pinOf(id).quote),
      ),
      "row K's pin quotes, in pin order, tile cure (a) with separator-only gaps",
    ).toEqual([]);
    const rowE = rowOf("E");
    const refusal4 = between(parent.notes, REFUSAL_4);
    expect(between(refusal4, CAUSE), "refusal #4's reason holds row E's label as its cause").toBe(rowE.label);
    const named = [...between(refusal4, NAMED_E).matchAll(/\b(E\d+) \(([A-Z_]+)\)/g)].map(match => ({ id: match[1] ?? "", side: match[2] ?? "" }));
    expect(
      named.map(member => member.id),
      "refusal #4's reason names exactly row E's pins, in order",
    ).toEqual(rowE.pins);
    for (const member of named) {
      const pin = pinOf(member.id);
      expect(pin.side, `${pin.id}: the side refusal #4 names for it`).toBe(member.side);
      expect([pin.probes[0]?.id, pin.probes[0]?.reading], `${pin.id}: its member probe reads its side refused`).toEqual([pin.id, [refused(member.side)]]);
      expect(refusal4, `${pin.id}: refusal #4 quotes the member's declaration its pin holds`).toContain(`'${pin.quoted ?? "<none>"}`);
      expect(pin.probes[0]?.source, `${pin.id}: the member probe holds that declaration`).toContain(pin.quoted ?? "<none>");
    }
    const fold = between(child.notes, FOLD);
    expect(fold, "wb-26dh's notes open with the R-B256 fold of the readNames family").toContain("READNAMES-NEVER-READS-EXPRESSION-WITH-TYPE-ARGUMENTS");
    for (const side of new Set(named.map(member => member.side))) expect(fold, `the R-B256 fold's unmet slug names ${side}`).toContain(`-${side.replaceAll("_", "-")}-`);
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
