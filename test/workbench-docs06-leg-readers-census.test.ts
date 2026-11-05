/**
 * wb-mcoj cut #2 (the rule-19 carrier child of wb-ouo3: structural exit R-B258 at refusal #4 M:44680 / O:1671,
 * dependency inversion R-B309 at refusal #5 O:1738; this cut answers wb-mcoj refusal #1, O:1784). Three pinned sets:
 * moduleImports and propertyWrites in test/helpers/docs06-leg-readers.ts read each planted text of this file's MODULES
 * and WRITES tables as exactly its pinned reading - the gate twins of wb-ouo3 refusals #4 and #5 among them, so each of
 * the six gate narrowings G-MI-DEFAULT-NAMED, G-MI-DEFAULT-NS, G-MI-NSEXPORT, GP9-MI-NODE-ALIAS, GP9-MI-NODE-TYPEONLY and
 * G-PW-COMPUTED-KEY, applied to the helper, reds its row (measured red-first); two expect-member readers that share no
 * code, membersNamedExpect and expectNamedAccesses, each read every SCAN and R-CTX-EXPECT plant as exactly its pinned
 * reading and their own read of test/workbench-docs06-conformance.census.ts as no entry (the quiet rows of the named
 * residual R-CTX-EXPECT); and two statement readers that share no code, helperCode and helperStatements, each read the
 * helper as exactly its typescript import and its four declarations.
 *
 * The helper's readers are wb-ouo3 cut #5's code (afda7b0d8d45), byte for byte (the CODE cases), shared so the docs06
 * census's fail-closed leg can ride them. wb-ouo3 was parked behind this bead, its cut #5 census unlanded, when this
 * census was cut, and wb-ouo3's restatement (R-B309: its cut #7, which restates this sentence) rides the helper; this
 * census claims these plants and these readings, not that census's leg.
 *
 * PINNED READER SET (every case named here is a registered test of this file; observed at this cut: 20 passed (20)):
 * - MODULES, the cases "MODULES '<row>': moduleImports reads each planted text as exactly its pinned reading" (6 rows, 21
 *   plants): moduleImports' reading of each plant's text equals the plant's pinned reading, entry for entry and in
 *   order. Rows MI-DEFAULT-NAMED, MI-DEFAULT-NS, MI-NSEXPORT, MI-NODE-ALIAS and MI-NODE-TYPEONLY each plant the form one
 *   gate member narrows (the row's members), as that member's gate twin (G-TWIN-TS-NAMED, G-TWIN2-NS,
 *   GP9-TWIN-NODE-ALIAS2, GP9-TWIN-NODE-ALIAS, GP9-TWIN-NODE-TYPEONLY: the docs06 census's import block at cut #5 with the
 *   twin's line in place) where the gate wrote one, and as the row's S- plants spell it from each module kind that block
 *   holds (a node: builtin, a package, a relative module; row MI-NODE-TYPEONLY also plants an aliased inline type-only
 *   specifier and a type-only clause of a node: builtin); row MI-PLANTED plants that block itself (P-RECORD, whose
 *   reading was that census's MODULE_IMPORTS_OF_RECORD at cut #5; from wb-ouo3's restatement that record holds the
 *   helper's load as an eighth entry, last, and P-RECORD's reading is the record less that entry - pinned by that
 *   census's restatement row (C), NOT CLAIMED here) and its "the modules loaded" row's loads.ts (P-LOADS).
 *   Falsifier: the row's member, applied to the helper.
 * - WRITES, the cases "WRITES '<row>': propertyWrites reads each planted text as exactly its pinned reading" (2 rows, 9
 *   plants): likewise for propertyWrites. Row PW-COMPUTED-KEY plants an object pattern property with a computed key
 *   (G-PW-COMPUTED-KEY's form) as the gate twin G-TWIN2-PW (in an AC2 case body) and with an identifier, numeric and
 *   template key, an element-access target, inside an array pattern, with a default and in a for-of head; row
 *   PW-PLANTED plants the docs06 census's "the property writes" row's writes.ts (P-WRITES). Falsifier: G-PW-COMPUTED-KEY,
 *   applied to the helper.
 * - TWINS, the case "TWINS: ...": each gate twin of the import block is P-RECORD's text with exactly one line edited, and
 *   its pinned reading differs from P-RECORD's in exactly that line's entry. That the docs06 census's record refuses
 *   each twin at collection is wb-ouo3's measurement, NOT CLAIMED here. Falsifier: a twin plant swapped for another
 *   text, edited back to the page or edited in a second line.
 * - SCAN, the cases "SCAN '<row>': membersNamedExpect and expectNamedAccesses each read each planted text as exactly its
 *   pinned reading" (4 rows, 22 plants): each reader's reading of each plant's text equals the plant's pinned reading,
 *   entry for entry and in order. Rows SC-OBJECT, SC-POSITION and SC-ELEMENT plant the forms wb-mcoj refusal #1's eight
 *   membersNamedExpect narrowings drop (the row's members: U2 GA1-OBJ-CONTEXT and GA2-OBJ-IDENT; U1 GA3-PARENT-MEMBER,
 *   GA4-NO-VARDECL, GA9-NO-AWAIT and GA10-NO-FUNCTION-DECL; U3 GA5-ELEM-NOOPT and GA6-ELEM-NO-SINGLE-QUOTE), each as the
 *   gate's witness (WA1-WA6, WA9 and WA10: the case or declaration the gate added to the docs06 census file, as written)
 *   and as the row's S- plants: a this, a parenthesized, a non-null, an element and a call object; a describe callback, a
 *   class property and a method, the twelve expression and statement positions of S-POS-EXPRESSIONS and the object of
 *   another member named expect; an optional template key, an optional single-quoted key and a key read bare. Row
 *   SC-ESCAPED plants the name and the key spelled through an escape. Falsifier: the row's members, applied to
 *   membersNamedExpect, and any edit of either reader that drops or changes a planted entry.
 * - R-CTX-EXPECT, the cases "R-CTX-EXPECT quiet row (top-down): ..." and "R-CTX-EXPECT quiet row (bottom-up): ...":
 *   membersNamedExpect over readRepo's read of the docs06 census file, and expectNamedAccesses over its own read of that
 *   file through DOCS06_URL, each read it as no entry (the quiet row), and each reads the residual's plants as pinned -
 *   G-CTX-TESTERS and G-CTX-MARK as the gate wrote them, an optional, an element and a template spelling of the member,
 *   and a text whose only expect is the identifier (S-CTX-QUIET, no entry). Falsifier: a member named expect, in a
 *   spelling the SCAN and R-CTX-EXPECT plants pin, written anywhere in the docs06 census file's code; each of the two
 *   cases reds on it alone, so an edit of one reader that hides it leaves the other case red.
 * - CODE, the cases "CODE (statements): ..." and "CODE (child walk): ...": helperCode reads the helper's top-level
 *   statements, each as its export modifier, its kind, its name and the sha256 of its text without the export keyword,
 *   as exactly the typescript import (HELPER_IMPORT_OF_RECORD) and then spelledAnywhere, WRITER_ROUTE, moduleImports and
 *   propertyWrites, each exported, in that order, each digest wb-ouo3 cut #5's census lines (CODE_OF_RECORD: :1487-1499,
 *   :1554, :1515-1540 and :1572-1603); helperStatements reads its own read of the helper through HELPER_URL, by a child
 *   walk of a separate parse, as exactly five top-level statements, each by the sha512 of its whole text
 *   (HELPER_STATEMENTS). So the helper exports exactly those four names. Falsifier: an added, removed, unexported or
 *   edited top-level statement of the helper, an export list, an export * re-export, an export default and an exported
 *   type among them (wb-mcoj refusal #1 U4: GB1-GB4); each of the two cases reds on it alone.
 * - SHAPE, ROSTER and HEADER, the cases "SHAPE (rule 16): ...", "ROSTER: ..." and "HEADER: ...": FROZEN_SHAPE (every row
 *   with its plant count) equals the tables; test/fixtures/docs06-leg-readers-roster.json, the out-of-file anchor, holds
 *   every row in table order with its members, its form and each plant's id and sha256 (of the plant's id, text and
 *   reading), the CODE digests, the helper import and HELPER_STATEMENTS, both ways; and the PINS BY ROW lines below
 *   equal the tables row for row and plant for plant, both ways. Falsifier: a hollowed, swapped or deleted row or plant
 *   (the CT battery).
 *
 * PINS BY ROW (table order):
 * - MI-DEFAULT-NAMED: G-TWIN-TS-NAMED, S-DN-NODE, S-DN-PKG, S-DN-REL
 * - MI-DEFAULT-NS: G-TWIN2-NS, S-DNS-NODE, S-DNS-REL
 * - MI-NSEXPORT: S-NSX-PKG, S-NSX-NODE, S-NSX-REL
 * - MI-NODE-ALIAS: GP9-TWIN-NODE-ALIAS2, GP9-TWIN-NODE-ALIAS, S-ALIAS-PKG, S-ALIAS-REL
 * - MI-NODE-TYPEONLY: GP9-TWIN-NODE-TYPEONLY, S-TYPE-NODE-ALIAS, S-TYPE-CLAUSE-NODE, S-TYPE-PKG, S-TYPE-REL
 * - MI-PLANTED: P-RECORD, P-LOADS
 * - PW-COMPUTED-KEY: G-TWIN2-PW, S-PW-IDENT-KEY, S-PW-NUMERIC-KEY, S-PW-TEMPLATE-KEY, S-PW-ELEMENT, S-PW-NESTED, S-PW-DEFAULT, S-PW-LOOP
 * - PW-PLANTED: P-WRITES
 * - R-CTX-EXPECT: G-CTX-TESTERS, G-CTX-MARK, S-CTX-OPTIONAL, S-CTX-ELEMENT, S-CTX-TEMPLATE, S-CTX-QUIET
 * - SC-OBJECT: WA1, WA2, S-OBJ-THIS, S-OBJ-PAREN, S-OBJ-NONNULL, S-OBJ-ELEMENT, S-OBJ-CALL
 * - SC-POSITION: WA3, WA4, WA9, WA10, S-POS-DESCRIBE, S-POS-CLASS, S-POS-EXPRESSIONS, S-POS-NESTED
 * - SC-ELEMENT: WA5, WA6, S-ELEM-OPT-TEMPLATE, S-ELEM-OPT-SINGLE, S-ELEM-BARE
 * - SC-ESCAPED: S-ESC-NAME, S-ESC-KEY
 *
 * NOT CLAIMED by this census:
 * - what either module reader returns for a text the tables do not plant: the same form from another module, at another
 *   place in a text (after other code, inside a function or a block), in another combination or beside other code; a
 *   module loaded twice (wb-ouo3 refusal #5 F3, GP9-MI-DEDUPE); a type-position import("...") (refusal #5 F4,
 *   GP9-W-IMPORT-TYPE); and any form no row plants;
 * - spelledAnywhere with a pattern other than WRITER_ROUTE, and the docs06 census's other readers (its reflective routes,
 *   its call-site and guard readers, and hookRoster's uses of expect);
 * - the docs06 census's fail-closed leg itself - its records, its collection-time read and the exit of a name-filtered
 *   run of that file - which is wb-ouo3's to restate over these readers;
 * - for the expect-member readers: a member named expect written in any file but the docs06 census file (every other
 *   text they read is a plant); a member the parse does not hold as a property or element access expression - a
 *   type-position name (typeof context.expect, an indexed access type, an import type's qualifier), a private name
 *   #expect, and text inside a comment, a string or a template; an element access whose key is not one string or
 *   no-substitution template literal reading expect (a key in parentheses or under as or satisfies, a concatenation, a
 *   template with a substitution, an identifier or any key computed at run time); a string handed to a reflective API
 *   (Reflect.get(context, "expect")) and a destructuring (const { expect } = context); and the identifier expect itself
 *   (vitest's named import, which S-CTX-QUIET pins as no entry);
 * - for the statement readers: the helper's comments and docs, which neither reads.
 *
 * RESIDUAL (a named family with its pinned quiet row; rule 19 (d)):
 * - R-CTX-EXPECT, the test context's own expect: a member named expect, reached through a case's context parameter -
 *   G-CTX-TESTERS (context.expect.addEqualityTesters; the gate measured a name-filtered run of the docs06 census exiting
 *   0 under it, wb-ouo3 refusal #4 U2, which this census does not pin) and its marker control G-CTX-MARK. wb-ouo3 cut #5
 *   names the family NOT CLAIMED for its uses-of-expect reader, and neither helper reader reads it. Quiet rows: the cases
 *   "R-CTX-EXPECT quiet row (top-down): ..." and "R-CTX-EXPECT quiet row (bottom-up): ...", each of which reds the moment
 *   test/workbench-docs06-conformance.census.ts holds in its code a member named expect in a spelling the SCAN and
 *   R-CTX-EXPECT plants pin - a property access .expect or ?.expect, or an element access whose key is a string (either
 *   quote) or a no-substitution template reading expect, optional or not, the name or the key through an escape
 *   included - whatever its object and wherever it stands.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { moduleImports, propertyWrites } from "./helpers/docs06-leg-readers.js";

/** A planted text and a reader's whole pinned reading of it. */
interface Plant {
  /** A gate twin, member or witness by the id its refusal gives it, the docs06 census's own planted text (P-) or this cut's plant (S-). */
  readonly id: string;
  readonly text: string;
  readonly reading: readonly string[];
}
interface Row {
  readonly id: string;
  /** The gate members whose form the row plants, by the ids the refusals of wb-ouo3 and wb-mcoj give them (none for a P- row or a row of this cut's own plants). */
  readonly members: readonly string[];
  /** The form the row plants, with the refusal item that names its members. */
  readonly form: string;
  readonly plants: readonly Plant[];
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-docs06-leg-readers-census.test.ts";
const HELPER = "test/helpers/docs06-leg-readers.ts";
const ROSTER = "test/fixtures/docs06-leg-readers-roster.json";
const DOCS06_CENSUS = "test/workbench-docs06-conformance.census.ts";
/** The docs06 census file and the helper again, for the second reader of each: read through this module's URL, never through readRepo. */
const DOCS06_URL = new URL("./workbench-docs06-conformance.census.ts", import.meta.url);
const HELPER_URL = new URL("./helpers/docs06-leg-readers.ts", import.meta.url);
const readRepo = (file: string): string => readFileSync(join(ROOT, file), "utf8");
const sha256 = (text: string): string => createHash("sha256").update(text).digest("hex");

const MODULES: readonly Row[] = [
  {
    id: "MI-DEFAULT-NAMED",
    members: ["G-MI-DEFAULT-NAMED"],
    form: "one import declaration binding a default together with named bindings (wb-ouo3 refusal #4 U1 (a))",
    plants: [
      {
        id: "G-TWIN-TS-NAMED",
        text: [
          'import { createHash } from "node:crypto";',
          'import { readFileSync } from "node:fs";',
          'import { basename, dirname, join } from "node:path";',
          'import { fileURLToPath } from "node:url";',
          'import ts, { type Node } from "typescript";',
          'import { afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner } from "vitest";',
          'import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";',
        ].join("\n"),
        reading: [
          "node:crypto | createHash",
          "node:fs | readFileSync",
          "node:path | basename, dirname, join",
          "node:url | fileURLToPath",
          "typescript | default as ts, type Node",
          "vitest | afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner",
          "./helpers/census.js | type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure",
        ],
      },
      {
        id: "S-DN-NODE",
        text: 'import fs, { readFileSync } from "node:fs";',
        reading: [
          "node:fs | default as fs, readFileSync",
        ],
      },
      {
        id: "S-DN-PKG",
        text: 'import ts, { SyntaxKind as Kind, type Node } from "typescript";',
        reading: [
          "typescript | default as ts, SyntaxKind as Kind, type Node",
        ],
      },
      {
        id: "S-DN-REL",
        text: 'import census, { judge } from "./helpers/census.js";',
        reading: [
          "./helpers/census.js | default as census, judge",
        ],
      },
    ],
  },
  {
    id: "MI-DEFAULT-NS",
    members: ["G-MI-DEFAULT-NS"],
    form: "one import declaration binding a default together with a namespace (wb-ouo3 refusal #4 U1 (b))",
    plants: [
      {
        id: "G-TWIN2-NS",
        text: [
          'import { createHash } from "node:crypto";',
          'import { readFileSync } from "node:fs";',
          'import { basename, dirname, join } from "node:path";',
          'import { fileURLToPath } from "node:url";',
          'import ts, * as tstx from "typescript";',
          'import { afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner } from "vitest";',
          'import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";',
        ].join("\n"),
        reading: [
          "node:crypto | createHash",
          "node:fs | readFileSync",
          "node:path | basename, dirname, join",
          "node:url | fileURLToPath",
          "typescript | default as ts, * as tstx",
          "vitest | afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner",
          "./helpers/census.js | type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure",
        ],
      },
      {
        id: "S-DNS-NODE",
        text: 'import fs, * as fsx from "node:fs";',
        reading: [
          "node:fs | default as fs, * as fsx",
        ],
      },
      {
        id: "S-DNS-REL",
        text: 'import census, * as all from "./helpers/census.js";',
        reading: [
          "./helpers/census.js | default as census, * as all",
        ],
      },
    ],
  },
  {
    id: "MI-NSEXPORT",
    members: ["G-MI-NSEXPORT"],
    form: "an export * as <name> from a module (wb-ouo3 refusal #4 F3)",
    plants: [
      {
        id: "S-NSX-PKG",
        text: 'export * as tsx from "typescript";',
        reading: [
          "typescript | re-exports * as tsx",
        ],
      },
      {
        id: "S-NSX-NODE",
        text: 'export * as fsx from "node:fs";',
        reading: [
          "node:fs | re-exports * as fsx",
        ],
      },
      {
        id: "S-NSX-REL",
        text: 'export * as all from "./helpers/census.js";',
        reading: [
          "./helpers/census.js | re-exports * as all",
        ],
      },
    ],
  },
  {
    id: "MI-NODE-ALIAS",
    members: ["GP9-MI-NODE-ALIAS"],
    form: "an aliased named specifier, of a node: builtin and of each other module kind the record holds (wb-ouo3 refusal #5 U1)",
    plants: [
      {
        id: "GP9-TWIN-NODE-ALIAS2",
        text: [
          'import { createHash } from "node:crypto";',
          'import { existsSync as exists, readFileSync } from "node:fs";',
          'import { basename, dirname, join } from "node:path";',
          'import { fileURLToPath } from "node:url";',
          'import ts from "typescript";',
          'import { afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner } from "vitest";',
          'import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";',
        ].join("\n"),
        reading: [
          "node:crypto | createHash",
          "node:fs | existsSync as exists, readFileSync",
          "node:path | basename, dirname, join",
          "node:url | fileURLToPath",
          "typescript | default as ts",
          "vitest | afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner",
          "./helpers/census.js | type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure",
        ],
      },
      {
        id: "GP9-TWIN-NODE-ALIAS",
        text: [
          'import { createHash } from "node:crypto";',
          'import { readFileSync, readFileSync as readText } from "node:fs";',
          'import { basename, dirname, join } from "node:path";',
          'import { fileURLToPath } from "node:url";',
          'import ts from "typescript";',
          'import { afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner } from "vitest";',
          'import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";',
        ].join("\n"),
        reading: [
          "node:crypto | createHash",
          "node:fs | readFileSync, readFileSync as readText",
          "node:path | basename, dirname, join",
          "node:url | fileURLToPath",
          "typescript | default as ts",
          "vitest | afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner",
          "./helpers/census.js | type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure",
        ],
      },
      {
        id: "S-ALIAS-PKG",
        text: 'import { describe as suite, it } from "vitest";',
        reading: [
          "vitest | describe as suite, it",
        ],
      },
      {
        id: "S-ALIAS-REL",
        text: 'import { docsSection, judge as run } from "./helpers/census.js";',
        reading: [
          "./helpers/census.js | docsSection, judge as run",
        ],
      },
    ],
  },
  {
    id: "MI-NODE-TYPEONLY",
    members: ["GP9-MI-NODE-TYPEONLY"],
    form: "an inline type-only named specifier, of a node: builtin and of each other module kind the record holds (wb-ouo3 refusal #5 U2)",
    plants: [
      {
        id: "GP9-TWIN-NODE-TYPEONLY",
        text: [
          'import { createHash } from "node:crypto";',
          'import { type Dirent, readFileSync } from "node:fs";',
          'import { basename, dirname, join } from "node:path";',
          'import { fileURLToPath } from "node:url";',
          'import ts from "typescript";',
          'import { afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner } from "vitest";',
          'import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";',
        ].join("\n"),
        reading: [
          "node:crypto | createHash",
          "node:fs | type Dirent, readFileSync",
          "node:path | basename, dirname, join",
          "node:url | fileURLToPath",
          "typescript | default as ts",
          "vitest | afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner",
          "./helpers/census.js | type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure",
        ],
      },
      {
        id: "S-TYPE-NODE-ALIAS",
        text: 'import { type Dirent as Entry } from "node:fs";',
        reading: [
          "node:fs | type Dirent as Entry",
        ],
      },
      {
        id: "S-TYPE-CLAUSE-NODE",
        text: 'import type { Dirent } from "node:fs";',
        reading: [
          "node:fs | type Dirent",
        ],
      },
      {
        id: "S-TYPE-PKG",
        text: 'import { type Node, SyntaxKind } from "typescript";',
        reading: [
          "typescript | type Node, SyntaxKind",
        ],
      },
      {
        id: "S-TYPE-REL",
        text: 'import { type CasePin, judge } from "./helpers/census.js";',
        reading: [
          "./helpers/census.js | type CasePin, judge",
        ],
      },
    ],
  },
  {
    id: "MI-PLANTED",
    members: [],
    form: "the docs06 census's own page and planted loads (wb-ouo3 cut #5: its import block :50-56 and the 'the modules loaded' row's loads.ts, :2435)",
    plants: [
      {
        id: "P-RECORD",
        text: [
          'import { createHash } from "node:crypto";',
          'import { readFileSync } from "node:fs";',
          'import { basename, dirname, join } from "node:path";',
          'import { fileURLToPath } from "node:url";',
          'import ts from "typescript";',
          'import { afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner } from "vitest";',
          'import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";',
        ].join("\n"),
        reading: [
          "node:crypto | createHash",
          "node:fs | readFileSync",
          "node:path | basename, dirname, join",
          "node:url | fileURLToPath",
          "typescript | default as ts",
          "vitest | afterAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner",
          "./helpers/census.js | type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure",
        ],
      },
      {
        id: "P-LOADS",
        text: [
          'import a from "a";',
          'import * as b from "b";',
          'import { c, d as e } from "c";',
          'import type { F } from "f";',
          'import "g";',
          'export * from "h";',
          'export { i } from "i";',
          'const j = await import("j");',
          'const k = require("k");',
          'import l = require("l");',
          "export { z };",
          'const m = load("m");',
        ].join("\n"),
        reading: [
          "a | default as a",
          "b | * as b",
          "c | c, d as e",
          "f | type F",
          "g | (nothing bound)",
          "h | re-exports *",
          "i | re-exports { i }",
          'import("j") | loaded at run time',
          'require("k") | loaded at run time',
          'import l = require("l"); | loaded at run time',
        ],
      },
    ],
  },
];
const WRITES: readonly Row[] = [
  {
    id: "PW-COMPUTED-KEY",
    members: ["G-PW-COMPUTED-KEY"],
    form: "an object pattern property with a computed key (wb-ouo3 refusal #4 U1 (c))",
    plants: [
      {
        id: "G-TWIN2-PW",
        text: [
          '  it.each(JUDGED)("AC2 bullet $row.bullet/$half.id", ({ row, half }) => {',
          "    const sink = { length: 1 };",
          '    ({ ["length"]: sink.length } = { length: 0 });',
          "    AC2_RAN.push(judgedKey({ row, half }));",
          "  });",
        ].join("\n"),
        reading: [
          "an assignment to sink.length at 3:6",
        ],
      },
      {
        id: "S-PW-IDENT-KEY",
        text: "({ [key]: a.b } = source);",
        reading: [
          "an assignment to a.b at 1:2",
        ],
      },
      {
        id: "S-PW-NUMERIC-KEY",
        text: "({ [0]: a.c } = source);",
        reading: [
          "an assignment to a.c at 1:2",
        ],
      },
      {
        id: "S-PW-TEMPLATE-KEY",
        text: "({ [`k`]: a.d } = source);",
        reading: [
          "an assignment to a.d at 1:2",
        ],
      },
      {
        id: "S-PW-ELEMENT",
        text: "({ [key]: a[k] } = source);",
        reading: [
          "an assignment to a[k] at 1:2",
        ],
      },
      {
        id: "S-PW-NESTED",
        text: "[{ [key]: a.e }] = list;",
        reading: [
          "an assignment to a.e at 1:1",
        ],
      },
      {
        id: "S-PW-DEFAULT",
        text: "({ [key]: a.f = 1 } = source);",
        reading: [
          "an assignment to a.f at 1:2",
          "an assignment to a.f at 1:11",
        ],
      },
      {
        id: "S-PW-LOOP",
        text: "for ({ [key]: a.g } of list) {}",
        reading: [
          "a loop head writing a.g at 1:1",
        ],
      },
    ],
  },
  {
    id: "PW-PLANTED",
    members: [],
    form: "the docs06 census's planted writes (wb-ouo3 cut #5: the 'the property writes' row's writes.ts, :2475-2504)",
    plants: [
      {
        id: "P-WRITES",
        text: [
          "a.b = 1;",
          "a[k] += 1;",
          "a.c ??= 2;",
          "a.x ^= 1;",
          "delete a.d;",
          "a.e++;",
          "--a[f];",
          "(a.y)++;",
          "[a.g] = list;",
          "({ h: a.i } = source);",
          "(a.p) = 1;",
          "[...a.q] = list;",
          "({ ...a.r } = source);",
          "(a.s as number) = 1;",
          "(<number>a.t) = 1;",
          "a.u! = 1;",
          "(a.v satisfies number) = 1;",
          "[a.w = 1] = list;",
          "for (a.j of list) {}",
          "for (a.z in source) {}",
          "Object.assign(a, b);",
          "Reflect.set(a, k, 1);",
          "Reflect.deleteProperty(a, k);",
          "a.__defineGetter__(k, g);",
          "a.__defineSetter__(k, g);",
          "const settle = a.assignee + a.asset;",
          "x = 1;",
          "x++;",
        ].join("\n"),
        reading: [
          "an assignment to a.b at 1:1",
          "an assignment to a[k] at 2:1",
          "an assignment to a.c at 3:1",
          "an assignment to a.x at 4:1",
          "a delete of a.d at 5:1",
          "an update of a.e at 6:1",
          "an update of a[f] at 7:1",
          "an update of a.y at 8:1",
          "an assignment to a.g at 9:1",
          "an assignment to a.i at 10:2",
          "an assignment to a.p at 11:1",
          "an assignment to a.q at 12:1",
          "an assignment to a.r at 13:2",
          "an assignment to a.s at 14:1",
          "an assignment to a.t at 15:1",
          "an assignment to a.u at 16:1",
          "an assignment to a.v at 17:1",
          "an assignment to a.w at 18:1",
          "an assignment to a.w at 18:2",
          "a loop head writing a.j at 19:1",
          "a loop head writing a.z at 20:1",
          "a writer named assign at 21:8",
          "a writer named set at 22:9",
          "a writer named deleteProperty at 23:9",
          "a writer named __defineGetter__ at 24:3",
          "a writer named __defineSetter__ at 25:3",
        ],
      },
    ],
  },
];
const RESIDUALS: readonly Row[] = [
  {
    id: "R-CTX-EXPECT",
    members: ["G-CTX-TESTERS", "G-CTX-MARK"],
    form: "the test context's own expect: a member named expect, reached through a case's context parameter (wb-ouo3 refusal #4 U2)",
    plants: [
      {
        id: "G-CTX-TESTERS",
        text: [
          '  it("AC2 bullet 1 context: the test context matcher", context => {',
          '    context.expect.addEqualityTesters([(actual: unknown) => (Array.isArray(actual) && actual.length === 1 && actual[0] === "1/guard:6" ? true : undefined)]);',
          "  });",
        ].join("\n"),
        reading: [
          "context.expect at 2:5",
        ],
      },
      {
        id: "G-CTX-MARK",
        text: [
          '  it("AC2 bullet 1 context: the test context marker", context => {',
          "    context.expect.addEqualityTesters([() => {",
          '      throw new Error("G-CTX marker: the test context tester reached the call-site comparison");',
          "    }]);",
          "  });",
        ].join("\n"),
        reading: [
          "context.expect at 2:5",
        ],
      },
      {
        id: "S-CTX-OPTIONAL",
        text: "context?.expect.addEqualityTesters([]);",
        reading: [
          "context?.expect at 1:1",
        ],
      },
      {
        id: "S-CTX-ELEMENT",
        text: 'context["expect"].addEqualityTesters([]);',
        reading: [
          'context["expect"] at 1:1',
        ],
      },
      {
        id: "S-CTX-TEMPLATE",
        text: "context[`expect`].extend({});",
        reading: [
          "context[`expect`] at 1:1",
        ],
      },
      {
        id: "S-CTX-QUIET",
        text: [
          "expect(1).toBe(1);",
          "expect.extend({});",
          "const expectation = holder.expected;",
        ].join("\n"),
        reading: [],
      },
    ],
  },
];
const SCAN: readonly Row[] = [
  {
    id: "SC-OBJECT",
    members: ["GA1-OBJ-CONTEXT", "GA2-OBJ-IDENT"],
    form: "a member named expect whose object is not the identifier context: the test context under another parameter name, reached through a member chain, and a this, parenthesized, non-null, element and call object (wb-mcoj refusal #1 U2)",
    plants: [
      {
        id: "WA1",
        text: [
          '  it("gate witness WA1: the test context under another parameter name", ctx => {',
          "    ctx.expect.addEqualityTesters([]);",
          "  });",
        ].join("\n"),
        reading: [
          "ctx.expect at 2:5",
        ],
      },
      {
        id: "WA2",
        text: [
          '  it("gate witness WA2: the test context\'s expect reached through its task", context => {',
          "    context.task.context.expect.addEqualityTesters([]);",
          "  });",
        ].join("\n"),
        reading: [
          "context.task.context.expect at 2:5",
        ],
      },
      {
        id: "S-OBJ-THIS",
        text: "this.expect.extend({});",
        reading: [
          "this.expect at 1:1",
        ],
      },
      {
        id: "S-OBJ-PAREN",
        text: "(context).expect.extend({});",
        reading: [
          "(context).expect at 1:1",
        ],
      },
      {
        id: "S-OBJ-NONNULL",
        text: "context!.expect.extend({});",
        reading: [
          "context!.expect at 1:1",
        ],
      },
      {
        id: "S-OBJ-ELEMENT",
        text: "contexts[0].expect.extend({});",
        reading: [
          "contexts[0].expect at 1:1",
        ],
      },
      {
        id: "S-OBJ-CALL",
        text: "contextOf().expect.extend({});",
        reading: [
          "contextOf().expect at 1:1",
        ],
      },
    ],
  },
  {
    id: "SC-POSITION",
    members: ["GA3-PARENT-MEMBER", "GA4-NO-VARDECL", "GA9-NO-AWAIT", "GA10-NO-FUNCTION-DECL"],
    form: "a member named expect anywhere but at the head of a member call in a top-level or it() body statement: called directly, bound to a local, awaited, returned from a function declaration, in a describe callback, in a class, at twelve expression and statement positions and as the object of another (wb-mcoj refusal #1 U1)",
    plants: [
      {
        id: "WA3",
        text: [
          '  it("gate witness WA3: the test context\'s expect called directly", context => {',
          "    context.expect(1).toBe(1);",
          "  });",
        ].join("\n"),
        reading: [
          "context.expect at 2:5",
        ],
      },
      {
        id: "WA4",
        text: [
          '  it("gate witness WA4: the test context\'s expect bound to a local", context => {',
          "    const contextExpect = context.expect;",
          "    contextExpect(1).toBe(1);",
          "  });",
        ].join("\n"),
        reading: [
          "context.expect at 2:27",
        ],
      },
      {
        id: "WA9",
        text: [
          '  it("gate witness WA9: the test context\'s expect awaited through poll", async context => {',
          "    await context.expect.poll(() => 1).toBe(1);",
          "  });",
        ].join("\n"),
        reading: [
          "context.expect at 2:11",
        ],
      },
      {
        id: "WA10",
        text: [
          "function contextExpectOf(context: { readonly expect: unknown }): unknown {",
          "  return context.expect;",
          "}",
          "void contextExpectOf;",
        ].join("\n"),
        reading: [
          "context.expect at 2:10",
        ],
      },
      {
        id: "S-POS-DESCRIBE",
        text: [
          'describe("a suite", () => {',
          '  it("a case", context => {',
          "    context.expect.addEqualityTesters([]);",
          "  });",
          "});",
        ].join("\n"),
        reading: [
          "context.expect at 3:5",
        ],
      },
      {
        id: "S-POS-CLASS",
        text: [
          "class Probe {",
          "  readonly held = context.expect;",
          "  read(): unknown {",
          "    return context.expect;",
          "  }",
          "}",
        ].join("\n"),
        reading: [
          "context.expect at 2:19",
          "context.expect at 4:12",
        ],
      },
      {
        id: "S-POS-EXPRESSIONS",
        text: [
          "const viaArrow = () => context.expect;",
          `const viaTemplate = \`\${context.expect}\`;`,
          "const viaConditional = flag ? context.expect : undefined;",
          "const viaArray = [context.expect];",
          "const viaObject = { held: context.expect };",
          "call(...context.expect);",
          "const viaTypeof = typeof context.expect;",
          "const viaDefault = (held = context.expect) => held;",
          "if (context.expect) call();",
          "for (const each of context.expect) call(each);",
          "const viaCast = context.expect as unknown;",
          "export default context.expect;",
        ].join("\n"),
        reading: [
          "context.expect at 1:24",
          "context.expect at 2:24",
          "context.expect at 3:31",
          "context.expect at 4:19",
          "context.expect at 5:27",
          "context.expect at 6:9",
          "context.expect at 7:26",
          "context.expect at 8:28",
          "context.expect at 9:5",
          "context.expect at 10:20",
          "context.expect at 11:17",
          "context.expect at 12:16",
        ],
      },
      {
        id: "S-POS-NESTED",
        text: 'context.expect["expect"].extend({});',
        reading: [
          'context.expect["expect"] at 1:1',
          "context.expect at 1:1",
        ],
      },
    ],
  },
  {
    id: "SC-ELEMENT",
    members: ["GA5-ELEM-NOOPT", "GA6-ELEM-NO-SINGLE-QUOTE"],
    form: "an element access keyed by expect: optional with a double-quoted, a template and a single-quoted key, single-quoted, and read bare (wb-mcoj refusal #1 U3)",
    plants: [
      {
        id: "WA5",
        text: [
          '  it("gate witness WA5: the test context\'s expect as an optional element access", context => {',
          '    context?.["expect"].addEqualityTesters([]);',
          "  });",
        ].join("\n"),
        reading: [
          'context?.["expect"] at 2:5',
        ],
      },
      {
        id: "WA6",
        text: [
          '  it("gate witness WA6: the test context\'s expect as a single-quoted element key", context => {',
          "    context['expect'].addEqualityTesters([]);",
          "  });",
        ].join("\n"),
        reading: [
          "context['expect'] at 2:5",
        ],
      },
      {
        id: "S-ELEM-OPT-TEMPLATE",
        text: "context?.[`expect`].extend({});",
        reading: [
          "context?.[`expect`] at 1:1",
        ],
      },
      {
        id: "S-ELEM-OPT-SINGLE",
        text: "context?.['expect'].extend({});",
        reading: [
          "context?.['expect'] at 1:1",
        ],
      },
      {
        id: "S-ELEM-BARE",
        text: 'const held = context["expect"];',
        reading: [
          'context["expect"] at 1:14',
        ],
      },
    ],
  },
  {
    id: "SC-ESCAPED",
    members: [],
    form: "the name or the key expect spelled through an escape sequence (this cut's plants)",
    plants: [
      {
        id: "S-ESC-NAME",
        text: "context.\\u0065xpect.extend({});",
        reading: [
          "context.\\u0065xpect at 1:1",
        ],
      },
      {
        id: "S-ESC-KEY",
        text: 'context["\\x65xpect"].extend({});',
        reading: [
          'context["\\x65xpect"] at 1:1',
        ],
      },
    ],
  },
];
/** wb-ouo3 cut #5's code of the helper's four declarations: each declaration's kind, name and the sha256 of its text without the export keyword. */
const CODE_OF_RECORD: readonly { readonly kind: string; readonly name: string; readonly sha256: string }[] = [
  { kind: "function", name: "spelledAnywhere", sha256: "44127d218ef0b7bb18aa8d555c155619e63326ee27fd6acf365fa5514a8de1dc" },
  { kind: "variable", name: "WRITER_ROUTE", sha256: "1499820093e9d54e157837e89cd9ae28dcfbdcb409382b03c3e4000001dc10a0" },
  { kind: "function", name: "moduleImports", sha256: "b29c2cc7075b7e71a15665238dcbde7dde5fa3bf6151293b30052109083695a3" },
  { kind: "function", name: "propertyWrites", sha256: "ef19d3b858ea4b4652f0d0086ec485291368a41ccfc93f8baadbdffadfee8187" },
];
/** The helper's one import, as helperCode reads it. */
const HELPER_IMPORT_OF_RECORD = 'local import "typescript" c110ad21c643bc950c6353bd6ea31de589d5aa3ec2c4ecc0ab36e21322fbf9a9';
/** The helper's five top-level statements as helperStatements reads them: the sha512 of each one's whole text, in order. */
const HELPER_STATEMENTS: readonly string[] = [
  "0aa8640547476a2244ecaaa3b96a7e38218318e4d8e59c6b5569c74301a378e455c94fa9963d18aa7a63e8a489b8b53d38e910481ebfbc41730e5e763363dc89",
  "c32285d746a0d843098a8aedc14440909feb87f87f20c3df440741b9d643ea233ef3a7a03263c175e564e9b500302adb417cf2c1ec6b49f3de1881bab3325fa6",
  "a0ee8e35889e543e9dd99e4b2adfa2ee95cb7b89b2f5b55b1dd97da0ac9de4019a4d57341a605b378f60ef0020dfc2c527aafd360555f7f167e720ea6607ddca",
  "825faea52ab08553196ec9f65ce17a47843a7d148fc6d90fbb9fa25c3430cbd5de7e15a9b83cf62d7c5d86d14edd010e9a9fbb30bc4beb7bb83365694bd70190",
  "7d54157aa15d86bae86dcc6cb71ba64140c0f4694b2eb36dc1fbf45cd9392fa1461c72ac48da242f2f185ac9245c19d9f0bf1324eb727673a4ba70797ad7bf67",
];
const FROZEN_SHAPE: readonly string[] = ["MI-DEFAULT-NAMED:4", "MI-DEFAULT-NS:3", "MI-NSEXPORT:3", "MI-NODE-ALIAS:4", "MI-NODE-TYPEONLY:5", "MI-PLANTED:2", "PW-COMPUTED-KEY:8", "PW-PLANTED:1", "R-CTX-EXPECT:6", "SC-OBJECT:7", "SC-POSITION:8", "SC-ELEMENT:5", "SC-ESCAPED:2"];
const TABLES: readonly (readonly [string, readonly Row[]])[] = [
  ["MODULES", MODULES],
  ["WRITES", WRITES],
  ["RESIDUALS", RESIDUALS],
  ["SCAN", SCAN],
];
const ALL_ROWS: readonly Row[] = TABLES.flatMap(([, rows]) => rows);
/** The import-block twins: the plants of the MODULES rows whose text is P-RECORD's with one line edited. */
const IMPORT_BLOCK_TWINS: readonly string[] = ["G-TWIN-TS-NAMED", "G-TWIN2-NS", "GP9-TWIN-NODE-ALIAS2", "GP9-TWIN-NODE-ALIAS", "GP9-TWIN-NODE-TYPEONLY"];

/**
 * R-CTX-EXPECT's first reader: a top-down walk of its parse from each access expression - a property access whose name
 * is expect, optional or not, and an element access whose key is a string or no-substitution template reading expect -
 * each as "<the access as written> at <line>:<column>", in source order (an enclosing access first). CLAIMED: its reading
 * of the docs06 census file (read through readRepo) and of each SCAN and R-CTX-EXPECT plant, as pinned; what it returns
 * for any other text is NOT CLAIMED.
 */
function membersNamedExpect(file: string, text: string): readonly string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    const named = ts.isPropertyAccessExpression(node) ? node.name.text === "expect" : ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression) && node.argumentExpression.text === "expect";
    if (named) {
      const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
      out.push(`${node.getText(sf)} at ${line + 1}:${character + 1}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}
/**
 * R-CTX-EXPECT's second reader, sharing no code with membersNamedExpect: a bottom-up walk of its own parse, from each
 * identifier and string-like literal whose text reads expect to the access it names - the property access whose name it
 * is, or the element access whose key it is - each as "<the access as written> at <line>:<column>", ordered by start
 * with an enclosing access first. CLAIMED: its reading of the docs06 census file (read through DOCS06_URL) and of each
 * SCAN and R-CTX-EXPECT plant, as pinned; what it returns for any other text is NOT CLAIMED.
 */
function expectNamedAccesses(text: string): readonly string[] {
  const source = ts.createSourceFile("expect-named-accesses.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const accesses: ts.Node[] = [];
  const pending: ts.Node[] = [source];
  for (let node = pending.pop(); node !== undefined; node = pending.pop()) {
    const holder = node.parent;
    if (holder !== undefined && ts.isIdentifier(node) && node.text === "expect" && ts.isPropertyAccessExpression(holder) && holder.name === node) accesses.push(holder);
    if (holder !== undefined && ts.isStringLiteralLike(node) && node.text === "expect" && ts.isElementAccessExpression(holder) && holder.argumentExpression === node) accesses.push(holder);
    ts.forEachChild(node, child => {
      pending.push(child);
    });
  }
  return accesses
    .sort((left, right) => left.getStart(source) - right.getStart(source) || right.getEnd() - left.getEnd())
    .map(access => {
      const { line, character } = source.getLineAndCharacterOfPosition(access.getStart(source));
      return `${access.getText(source)} at ${line + 1}:${character + 1}`;
    });
}

/** A plant as the roster holds it: its id and the sha256 of its id, text and reading. */
const rosterPlant = (plant: Plant): { readonly id: string; readonly sha256: string } => ({ id: plant.id, sha256: sha256(JSON.stringify([plant.id, plant.text, plant.reading])) });
/**
 * The helper's top-level statements, from sf.statements of readRepo's read: each as "<export|local> <kind> <name> <the
 * sha256 of its text without a leading export keyword>", the kind import, function or variable, or the syntax kind's name.
 */
function helperCode(): readonly string[] {
  const sf = ts.createSourceFile(HELPER, readRepo(HELPER), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  return sf.statements.map(statement => {
    const exported = ts.canHaveModifiers(statement) && (ts.getModifiers(statement) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
    const kind = ts.isImportDeclaration(statement) ? "import" : ts.isFunctionDeclaration(statement) ? "function" : ts.isVariableStatement(statement) ? "variable" : ts.SyntaxKind[statement.kind];
    const name = ts.isImportDeclaration(statement) ? statement.moduleSpecifier.getText(sf) : ts.isFunctionDeclaration(statement) ? statement.name?.text : ts.isVariableStatement(statement) ? statement.declarationList.declarations.map(declaration => declaration.name.getText(sf)).join(", ") : undefined;
    return `${exported ? "export" : "local"} ${kind} ${name ?? "(unnamed)"} ${sha256(statement.getText(sf).replace(/^export /, ""))}`;
  });
}
/**
 * The helper's top-level statements again, sharing no code with helperCode: a child walk of a separate parse of the
 * helper read through HELPER_URL, each statement as the sha512 of its whole text, its export keyword included.
 */
function helperStatements(): readonly string[] {
  const source = ts.createSourceFile("helper-statements.ts", readFileSync(HELPER_URL, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const digests: string[] = [];
  ts.forEachChild(source, child => {
    if (child.kind !== ts.SyntaxKind.EndOfFileToken) digests.push(createHash("sha512").update(child.getText(source)).digest("hex"));
  });
  return digests;
}
/** This file's PINS BY ROW lines, as "<row>: <plant>, <plant>". */
function headerPins(): readonly string[] {
  const lines = readRepo(SELF).split("\n");
  const start = lines.indexOf(" * PINS BY ROW (table order):");
  const end = lines.indexOf(" *", start);
  return start < 0 || end < 0 ? [] : lines.slice(start + 1, end).map(line => line.replace(/^ \* - /, ""));
}

describe("wb-mcoj: moduleImports and propertyWrites read each MODULES and WRITES plant as pinned, both expect-member readers read each SCAN and R-CTX-EXPECT plant as pinned and the docs06 census file as no entry, and both statement readers read the helper as its import and four declarations", () => {
  it.each(MODULES)("MODULES $id: moduleImports reads each planted text as exactly its pinned reading", row => {
    for (const plant of row.plants) expect(moduleImports(`${plant.id}.ts`, plant.text), `${row.id} ${plant.id}`).toEqual(plant.reading);
  });

  it.each(WRITES)("WRITES $id: propertyWrites reads each planted text as exactly its pinned reading", row => {
    for (const plant of row.plants) expect(propertyWrites(`${plant.id}.ts`, plant.text), `${row.id} ${plant.id}`).toEqual(plant.reading);
  });

  it("TWINS: each gate twin of the import block is P-RECORD's text with exactly one line edited, and its pinned reading differs from P-RECORD's in exactly that line's entry", () => {
    const plants = MODULES.flatMap(row => row.plants);
    const page = plants.find(plant => plant.id === "P-RECORD");
    expect(page, "P-RECORD is a plant of row MI-PLANTED").toBeDefined();
    const pageLines = page?.text.split("\n") ?? [];
    expect(pageLines, "the import block reads one entry per line").toHaveLength(page?.reading.length ?? -1);
    const twins = plants.filter(plant => IMPORT_BLOCK_TWINS.includes(plant.id));
    expect(
      twins.map(plant => plant.id),
      "every import-block twin is planted",
    ).toEqual([...IMPORT_BLOCK_TWINS]);
    for (const twin of twins) {
      const lines = twin.text.split("\n");
      const edited = lines.flatMap((line, index) => (line === pageLines[index] ? [] : [index]));
      const read = twin.reading.flatMap((entry, index) => (entry === page?.reading[index] ? [] : [index]));
      expect([lines.length, twin.reading.length, edited.length], `${twin.id}: the page's line count and entry count, one line edited`).toEqual([pageLines.length, pageLines.length, 1]);
      expect(read, `${twin.id}: its reading differs from the page's in the edited line's entry alone`).toEqual(edited);
    }
  });

  it.each(SCAN)("SCAN $id: membersNamedExpect and expectNamedAccesses each read each planted text as exactly its pinned reading", row => {
    for (const plant of row.plants) {
      expect(membersNamedExpect(`${plant.id}.ts`, plant.text), `${row.id} ${plant.id}: membersNamedExpect`).toEqual(plant.reading);
      expect(expectNamedAccesses(plant.text), `${row.id} ${plant.id}: expectNamedAccesses`).toEqual(plant.reading);
    }
  });

  it("R-CTX-EXPECT quiet row (top-down): membersNamedExpect reads test/workbench-docs06-conformance.census.ts as no entry and each R-CTX-EXPECT plant as pinned", () => {
    expect(membersNamedExpect(DOCS06_CENSUS, readRepo(DOCS06_CENSUS)), "membersNamedExpect: the members named expect in the docs06 census file").toEqual([]);
    for (const row of RESIDUALS) for (const plant of row.plants) expect(membersNamedExpect(`${plant.id}.ts`, plant.text), `${row.id} ${plant.id}`).toEqual(plant.reading);
  });

  it("R-CTX-EXPECT quiet row (bottom-up): expectNamedAccesses reads its own read of test/workbench-docs06-conformance.census.ts as no entry and each R-CTX-EXPECT plant as pinned", () => {
    expect(expectNamedAccesses(readFileSync(DOCS06_URL, "utf8")), "expectNamedAccesses: the accesses named expect in the docs06 census file").toEqual([]);
    for (const row of RESIDUALS) for (const plant of row.plants) expect(expectNamedAccesses(plant.text), `${row.id} ${plant.id}`).toEqual(plant.reading);
  });

  it("CODE (statements): helperCode reads the helper's top-level statements as its typescript import and then its four declarations, each exported and each wb-ouo3 cut #5's text by digest", () => {
    expect(helperCode(), "the helper's top-level statements, in order").toEqual([HELPER_IMPORT_OF_RECORD, ...CODE_OF_RECORD.map(entry => `export ${entry.kind} ${entry.name} ${entry.sha256}`)]);
  });

  it("CODE (child walk): helperStatements reads its own read of the helper as exactly five top-level statements, each by the sha512 of its whole text", () => {
    expect(helperStatements(), "the helper's top-level statements by digest, in order").toEqual([...HELPER_STATEMENTS]);
  });

  it("SHAPE (rule 16): the frozen shape is the literal list of every row with its plant count", () => {
    expect(
      ALL_ROWS.map(row => `${row.id}:${row.plants.length}`),
      "every row of the MODULES, WRITES, RESIDUALS and SCAN tables with its plant count",
    ).toEqual([...FROZEN_SHAPE]);
  });

  it("ROSTER: test/fixtures/docs06-leg-readers-roster.json holds every row in table order with its members, its form and each plant's id and sha256, the CODE digests, the helper import and HELPER_STATEMENTS, both ways", () => {
    const roster: unknown = JSON.parse(readRepo(ROSTER));
    expect(roster, "the roster, as the tables, CODE_OF_RECORD, HELPER_IMPORT_OF_RECORD and HELPER_STATEMENTS give it").toEqual({
      bead: "wb-mcoj",
      census: SELF,
      helper: HELPER,
      quietPage: DOCS06_CENSUS,
      rows: TABLES.flatMap(([table, rows]) => rows.map(row => ({ table, id: row.id, members: [...row.members], form: row.form, plants: row.plants.map(rosterPlant) }))),
      code: [...CODE_OF_RECORD],
      helperImport: HELPER_IMPORT_OF_RECORD,
      statements: [...HELPER_STATEMENTS],
    });
  });

  it("HEADER: the PINS BY ROW lines of this file's header equal the tables row for row and plant for plant, both ways", () => {
    expect(headerPins(), "the header's PINS BY ROW lines").toEqual(ALL_ROWS.map(row => `${row.id}: ${row.plants.map(plant => plant.id).join(", ")}`));
  });
});
