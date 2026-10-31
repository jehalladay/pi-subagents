/**
 * wb-56od: the census tier's run pin read from OUTSIDE it. test/workbench-rf-census-run-pins.census.ts judges every title of each
 * census its CENSUSES table names; each of those censuses reads the table back, from its own judged-set case in the test tier,
 * through runPinnedFiles and requires its own file there exactly once, so a census cut from the table reds in the census it drops,
 * not only in the tier that dropped it. The table is read as a TypeScript syntax tree: a comment, a string elsewhere or another
 * declaration never counts, and a source with no top-level CENSUSES array literal is refused by name.
 */
import ts from "typescript";

/** The census tier's run pin, repository-relative. */
export const RUN_PIN_FILE = "test/workbench-rf-census-run-pins.census.ts";

/** One element of the run pin's CENSUSES array literal: its `file` and its text span in the source read. */
export interface RunPinnedEntry {
  /** The element's string `file`, or a named stand-in when the element carries none. */
  readonly file: string;
  /** The element's span: start after its leading trivia, end exclusive. */
  readonly start: number;
  readonly end: number;
}

/** An expression with its `as`, `satisfies` and parentheses unwrapped. */
function unwrapped(expression: ts.Expression): ts.Expression {
  let current = expression;
  while (ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isParenthesizedExpression(current)) current = current.expression;
  return current;
}

/** The element's string `file` property, or a stand-in naming why it has none. */
function fileOf(element: ts.Expression, index: number): string {
  const literal = unwrapped(element);
  if (!ts.isObjectLiteralExpression(literal)) return `<CENSUSES[${index}] is not an object literal>`;
  for (const property of literal.properties) {
    if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === "file" && ts.isStringLiteralLike(property.initializer)) {
      return property.initializer.text;
    }
  }
  return `<CENSUSES[${index}] has no string file>`;
}

/** Every element of the source's top-level `CENSUSES` array literal, in order. */
export function runPinnedEntries(source: string): RunPinnedEntry[] {
  const tree = ts.createSourceFile(RUN_PIN_FILE, source, ts.ScriptTarget.Latest, true);
  for (const statement of tree.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== "CENSUSES" || declaration.initializer === undefined) continue;
      const table = unwrapped(declaration.initializer);
      if (!ts.isArrayLiteralExpression(table)) break;
      return table.elements.map((element, index) => ({ file: fileOf(element, index), start: element.getStart(tree), end: element.getEnd() }));
    }
  }
  throw new Error(`${RUN_PIN_FILE} declares no top-level CENSUSES array literal`);
}

/** The `file` of every element of the source's CENSUSES table, in order. */
export function runPinnedFiles(source: string): string[] {
  return runPinnedEntries(source).map(entry => entry.file);
}
