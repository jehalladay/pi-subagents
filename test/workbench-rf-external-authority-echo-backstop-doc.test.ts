/**
 * wb-sagm (R694 follow-up of wb-wf9m landing 508, F1 LOW LEADS): the doc comment over the census suite of
 * test/workbench-rf-external-authority-echo-census.test.ts must say only what that file's backstop reads. The gate's finding,
 * verbatim: "the census doc comment over the census suite at test/workbench-rf-external-authority-echo-census.test.ts:1368-1369
 * says 'the backstop below reads the file task vitest hands a file-level hook', but the backstop afterAll at :1456 takes no
 * argument and reads only FINISHED and ENDED; the header at :96-102 and the backstop comment at :1448-1455 describe it
 * correctly." Its cure: "reword the clause at :1369 to name FINISHED and ENDED".
 *
 * The reading is the census's own TypeScript AST, never a copy of its text. The backstop is the census's one file-scope
 * afterAll call; what it takes is its callback's declared parameter list; what it reads is the set of the census's file-scope
 * run-time records (a const bound to an empty array literal, which the cases push into) that its callback names. The clause is
 * the one clause (split at each sentence end and semicolon) of the census suite's doc comment - the last JSDoc block before the
 * census's one file-scope describe call - that names the backstop. The clause must name every record the backstop reads and,
 * while the backstop takes no argument, name nothing vitest hands a file-level hook (a suite or a task). Two liveness controls
 * plant over the census's own bytes, at offsets its AST gives: the landed clause, which must read red here, and a parameter on
 * the backstop's parameter list, which the reading must see (so the reading of what the backstop takes is not fixed at none).
 *
 * NOT CLAIMED: the census header's backstop sentences (:96-102) and the comment over the backstop (:1448-1455), which the gate
 * read as correct and this file does not read; what the clause says about anything but the backstop's reads; the clause's
 * grammar (a negated or conditional mention of a record reads as naming it); a record the backstop reaches only through a call.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** The census whose suite doc comment this file holds to the census's own code. */
const CENSUS = "test/workbench-rf-external-authority-echo-census.test.ts";
/** The census suite's doc comment as it landed at wb-wf9m (blob 5995f50a, :1368-1369), byte for byte: the clause F1 names. */
const LANDED_SUITE_DOC = [
  "/** The census suite: the rows, each pin's case. Its collector is held in no binding (wb-wf9m: the census tier's judge refuses a",
  " * describe's collector that escapes into a declaration); the backstop below reads the file task vitest hands a file-level hook. */",
].join("\n");
/** What vitest hands a file-level hook, by the words a clause would name it with; a backstop that takes no argument reads neither. */
const HOOK_ARGUMENT_WORDS: readonly string[] = ["suite", "task"];

interface BackstopReading {
  /** The backstop callback's declared parameters, as written. */
  readonly parameters: readonly string[];
  /** The census's file-scope run-time records the backstop callback names, sorted. */
  readonly records: readonly string[];
  /** The one clause of the census suite's doc comment that names the backstop, whitespace collapsed. */
  readonly clause: string;
  /** Where the census suite's doc comment sits in the census text: its start and end offsets. */
  readonly doc: readonly [number, number];
  /** Where the backstop callback's parameter list sits in the census text, inside its parentheses: its start and end offsets. */
  readonly parameterList: readonly [number, number];
}

interface ClauseJudgement {
  /** Records the backstop reads that the clause does not name. */
  readonly unnamed: readonly string[];
  /** Hook-argument words the clause names while the backstop takes no argument. */
  readonly hookWords: readonly string[];
}

/** The file-scope call to `callee` a statement makes, if it is one. */
function callOf(statement: ts.Statement, callee: string): ts.CallExpression | undefined {
  if (!ts.isExpressionStatement(statement) || !ts.isCallExpression(statement.expression)) return undefined;
  const target = statement.expression.expression;
  return ts.isIdentifier(target) && target.text === callee ? statement.expression : undefined;
}

/** The one member of a list the census must hold exactly once, refused by name otherwise. */
function onlyOne<T>(items: readonly T[], what: string): T {
  const [item] = items;
  if (items.length !== 1 || item === undefined) throw new Error(`${CENSUS} must hold exactly one ${what}; it holds ${items.length}`);
  return item;
}

/** The census's file-scope run-time records: every const bound to an empty array literal at file scope. */
function fileRecords(source: ts.SourceFile): ReadonlySet<string> {
  const names = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement) || (statement.declarationList.flags & ts.NodeFlags.Const) === 0) continue;
    for (const { initializer, name } of statement.declarationList.declarations) {
      if (ts.isIdentifier(name) && initializer !== undefined && ts.isArrayLiteralExpression(initializer) && initializer.elements.length === 0) {
        names.add(name.text);
      }
    }
  }
  return names;
}

/** Every name in `wanted` the node's subtree spells as an identifier, sorted. */
function namesIn(node: ts.Node, wanted: ReadonlySet<string>): string[] {
  const found = new Set<string>();
  const visit = (child: ts.Node): void => {
    if (ts.isIdentifier(child) && wanted.has(child.text)) found.add(child.text);
    ts.forEachChild(child, visit);
  };
  visit(node);
  return [...found].sort();
}

/** A JSDoc block's text with its delimiters and line stars removed and its whitespace collapsed. */
function docText(doc: string): string {
  return doc
    .replace(/^\/\*\*/, "")
    .replace(/\*\/$/, "")
    .split("\n")
    .map(line => line.replace(/^\s*\*?\s?/, ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

const wordsOf = (text: string): string[] => text.match(/[A-Za-z_$][\w$]*/g) ?? [];

/** The census's backstop, what it takes and reads, and the clause of the census suite's doc comment that names it. */
function readBackstop(text: string): BackstopReading {
  const source = ts.createSourceFile(CENSUS, text, ts.ScriptTarget.Latest, true);
  const hook = onlyOne(
    source.statements.flatMap(statement => callOf(statement, "afterAll") ?? []),
    "file-scope afterAll call (the backstop)",
  );
  const callback = hook.arguments[0];
  if (callback === undefined || !(ts.isArrowFunction(callback) || ts.isFunctionExpression(callback))) {
    throw new Error(`${CENSUS}: the backstop's first argument must be a function`);
  }
  const suite = onlyOne(
    source.statements.filter(statement => callOf(statement, "describe") !== undefined),
    "file-scope describe call (the census suite)",
  );
  const docs = (ts.getLeadingCommentRanges(source.text, suite.getFullStart()) ?? []).filter(range => source.text.startsWith("/**", range.pos));
  const doc = docs.at(-1);
  if (doc === undefined) throw new Error(`${CENSUS}: the census suite has no doc comment`);
  const clauses = docText(source.text.slice(doc.pos, doc.end)).split(/(?<=[.;])\s+/);
  return {
    parameters: callback.parameters.map(parameter => parameter.name.getText(source)),
    records: namesIn(callback.body, fileRecords(source)),
    clause: onlyOne(
      clauses.filter(clause => wordsOf(clause).includes("backstop")),
      "clause of the census suite's doc comment that names the backstop",
    ),
    doc: [doc.pos, doc.end],
    parameterList: [callback.parameters.pos, callback.parameters.end],
  };
}

/** What the clause leaves unnamed of the backstop's reads, and the hook argument it names while the backstop takes none. */
function judgeClause(reading: BackstopReading): ClauseJudgement {
  const words = wordsOf(reading.clause);
  const lower = new Set(words.map(word => word.toLowerCase()));
  return {
    unnamed: reading.records.filter(record => !words.includes(record)),
    hookWords: reading.parameters.length === 0 ? HOOK_ARGUMENT_WORDS.filter(word => lower.has(word)) : [],
  };
}

const censusText = (): string => readFileSync(join(ROOT, CENSUS), "utf8");

describe("wb-sagm: the rf external-authority echo census's suite doc comment says what its backstop reads", () => {
  it("the backstop takes no argument and reads FINISHED and ENDED, and the suite doc comment's backstop clause names both and no hook argument", () => {
    const reading = readBackstop(censusText());
    expect({ parameters: reading.parameters, records: reading.records }).toStrictEqual({ parameters: [], records: ["ENDED", "FINISHED"] });
    expect(judgeClause(reading), `the clause: ${reading.clause}`).toStrictEqual({ unnamed: [], hookWords: [] });
  });

  it("liveness: the landed clause planted back over the census's own bytes reads red - it names neither record and names the file task", () => {
    const text = censusText();
    const reading = readBackstop(text);
    const [start, end] = reading.doc;
    const planted = readBackstop(`${text.slice(0, start)}${LANDED_SUITE_DOC}${text.slice(end)}`);
    expect({ parameters: planted.parameters, records: planted.records }).toStrictEqual({ parameters: reading.parameters, records: reading.records });
    expect(planted.clause).toBe("the backstop below reads the file task vitest hands a file-level hook.");
    expect(judgeClause(planted)).toStrictEqual({ unnamed: ["ENDED", "FINISHED"], hookWords: ["task"] });
  });

  it("liveness: a parameter planted on the backstop's parameter list is read as one, and the backstop's records are unchanged", () => {
    const text = censusText();
    const reading = readBackstop(text);
    const [start, end] = reading.parameterList;
    const planted = readBackstop(`${text.slice(0, start)}suite${text.slice(end)}`);
    expect({ parameters: planted.parameters, records: planted.records }).toStrictEqual({ parameters: ["suite"], records: reading.records });
  });
});
