// @ts-check
/**
 * wb-8py9: the seat-side receipt lint. It re-measures, against the tree, the quantitative claims that a delivery's added
 * or modified receipt and census files make, so a false figure is refused at the seat instead of at the gate (bottleneck
 * audit 2026-11-11, finding #7: 15 of 34 refusals in the window were mechanically preventable claims-wider-than-pins
 * errors; refusal M:75230 of wb-bau is the model case, "receipt line 31 states 44 SITES rows; measured 35").
 *
 * THE DELIVERY. Against a base revision (--base, else the merge-base of HEAD and origin/workbench/implementation-program,
 * else HEAD), the delivery is every path git reports added or modified in the working tree, committed or not and untracked
 * included, that is a receipt (docs/workbench/receipts/<name>.md) or a census file (a TypeScript file under test/ whose
 * name holds "census"). A receipt is append-only, so a modified receipt is judged on its added lines only: a claim is
 * placed on the source line of its own match, so a line appended to a landed paragraph is judged on that line. An added
 * receipt, a census file and a file named on the command line (a markdown file, or a TypeScript file under test/) are
 * judged whole.
 *
 * THE RENDERED VIEW (parse-aware, never a regex over raw markdown). A markdown file is lexed with marked and judged on
 * what a reader sees. An HTML comment renders nothing, so its text is never a claim and never counts toward a measured
 * figure. Text that renders through raw HTML (an HTML block, or an inline element tag such as a hidden span) depends on
 * markup this lint does not render, so a claim there is refused fail-closed (kind html). A fenced or indented code block
 * is quoted material, not a claim. Struck-through text and image alt text are not assertions. Entities are decoded and
 * the text is NFKC-normalized. A census file is parsed with TypeScript; its comments and its case and suite titles (the
 * first argument of it, test, describe or suite) are its text, and its other string literals are data, never claims.
 *
 * THE CLAIMS. Each is matched within one sentence of one block. A claim's revision is the first "at|on [trunk|base|tip|
 * commit|main|origin] <hex>" of its sentence (7 to 40 hex digits), else the working tree. A token that holds a letter (or
 * all 40 digits) is a revision; an all-decimal one is a revision only when it resolves to a commit (a short sha can be all
 * digits), else it is a figure and the claim is measured at the working tree. A lettered token wins over a decimal one.
 *   rows   "<path> holds|has|carries|contains|keeps <N> <IDENT> rows|entries|elements|members", plus its continuations
 *          "plus|and <N> <IDENT> rows" in the same sentence. N is the element count of the array literal declared as
 *          IDENT (upper case) in <path>, read with the TypeScript AST. In a census file the path may be left out when
 *          IDENT is an array literal the file itself declares (not after a delta word such as "adds" or "first").
 *   array  "<N> [elements] in the <IDENT> array literal [(lines A to B)]". It binds to the last path and revision named
 *          earlier in its block (in a census file, to the file itself) and states the element count and the first and
 *          last line of the literal.
 *   table  a heading ending "(<N> rows)". N is the number of rendered body rows of the tables in the heading's section,
 *          or, when it holds no table, the number of non-blank lines of its code blocks (a listing).
 *   lines  "<path> (<N> lines". N is the file's line count.
 *   cite   "<path>:<A>" or "<path>:<A>-<B>" naming a file that exists at the measured revision, with A <= B <= its line
 *          count. A path absent there is an external citation and is not judged.
 * A path is a file name with an extension: under a directory (it holds a "/") any extension, as a bare name one of the
 * known ones (ROOT_EXTENSIONS). A revision that resolves to no commit here names another
 * repository's commit: a cite at it is not judged, nor is a figure whose path this working tree does not hold; a figure
 * at it whose path this repository holds is refused.
 * Anything else is not a claim this lint judges: run outcomes ("N passed"), sums, prose counts, mixed-case identifiers,
 * and a figure split by an invisible character.
 *
 * READERS (--readers). The landed default-tier test files that read a delivered path: tracked at the base, absent from
 * the delivery and from vitest.config.ts's exclude list, and naming the delivered path (for a receipt, the receipts
 * directory). These are the censuses that judge the delivery's new text by their own rules (the wb-w8fk class), so a
 * seat can run them on the cut before it is enqueued. The lint lists them and runs none of them.
 *
 * CLI: node qa/workbench/receipt-lint.mjs [--base <rev>] [--json] [--readers] [<file> ...]
 *   exit 0: every judged claim holds (the report on stdout)
 *   exit 1: a judged claim does not hold (one finding per line on stderr, naming the claim, its figure and the measured one)
 *   exit 2: usage (an unknown option, or a named file that does not exist)
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, isAbsolute, join } from "node:path";
import { pathToFileURL } from "node:url";
import { Lexer } from "marked";
import ts from "typescript";

export const TOOL = "receipt-lint";
export const TRUNK_REF = "origin/workbench/implementation-program";
export const RECEIPTS_DIR = "docs/workbench/receipts";
export const CODE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];

/** @typedef {"rows" | "array" | "table" | "lines" | "cite" | "html"} ClaimKind */
/**
 * @typedef {object} Claim
 * @property {ClaimKind} kind
 * @property {string} file  the judged file (repository-relative)
 * @property {number} line  the 1-based line of the claim in that file
 * @property {string} text  the claim as the reader sees it
 * @property {string | null} path  the file the figure is measured in
 * @property {string | null} rev  the revision the claim names
 * @property {boolean} [revDecimal]  the revision is an all-decimal token: a revision only when it resolves to a commit
 * @property {string} [ident]
 * @property {number} [count]
 * @property {readonly number[]} [span]  array: the stated first and last line of the literal
 * @property {readonly number[]} [cite]  cite: the first and last cited line
 * @property {number} [rows]  table: the rendered rows measured under the heading (-1: no table, -2: raw HTML there)
 * @property {string} [markup]  html: the raw HTML the claim renders through
 * @property {Claim[]} [inner]  html: the claims the block would carry in either reading (it is judged when one of them is)
 */
/**
 * @typedef {object} Finding
 * @property {string} file
 * @property {number} line
 * @property {ClaimKind} kind
 * @property {string} claim  the claim text
 * @property {string} states  what the claim states
 * @property {string} measured  what the lint measured
 */
/**
 * @typedef {object} LintReport
 * @property {string | null} base  the base commit, or null outside a git work tree
 * @property {string[]} files  the judged files, sorted
 * @property {Claim[]} claims  every judged claim
 * @property {Finding[]} findings
 */
/**
 * @typedef {object} Tree
 * @property {string} root
 * @property {(rev: string) => string | null} resolve  the full commit sha a claim's revision names, or null
 * @property {(path: string, sha: string | null) => string | null} read  a file's text at a commit (null: the working tree), or null when absent
 */

/** @param {string} rel */
export function isReceiptPath(rel) {
  const name = rel.startsWith(`${RECEIPTS_DIR}/`) ? rel.slice(RECEIPTS_DIR.length + 1) : "";
  return name.endsWith(".md") && !name.includes("/");
}

/** @param {string} rel */
export function isCensusPath(rel) {
  return rel.startsWith("test/") && /\.(?:ts|mts|cts|tsx)$/.test(rel) && rel.slice(rel.lastIndexOf("/") + 1).includes("census");
}

/** @param {string} rel */
const isMarkdownPath = rel => rel.endsWith(".md");
/** @param {string} rel */
const isTestSourcePath = rel => rel.startsWith("test/") && /\.(?:ts|mts|cts|tsx)$/.test(rel);

/**
 * @param {string} root
 * @param {readonly string[]} args
 * @returns {string | null}
 */
function gitOut(root, args) {
  try {
    return execFileSync("git", ["-C", root, ...args], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return null;
  }
}

/** A repository-relative path the lint may read: relative, inside the tree, no parent step. @param {string} path */
function safeRelative(path) {
  const rel = path.startsWith("./") ? path.slice(2) : path;
  if (rel === "" || isAbsolute(rel) || rel.split("/").some(part => part === ".." || part === "")) return null;
  return rel;
}

/**
 * The tree the lint measures: the working tree, or a commit's blobs. Reads and resolutions are cached per instance.
 * @param {string} root
 * @returns {Tree}
 */
export function treeOf(root) {
  /** @type {Map<string, string | null>} */
  const shas = new Map();
  /** @type {Map<string, string | null>} */
  const texts = new Map();
  return {
    root,
    resolve(rev) {
      if (!shas.has(rev)) {
        const out = /^[0-9a-f]{7,40}$/.test(rev) ? gitOut(root, ["rev-parse", "--verify", "--quiet", `${rev}^{commit}`]) : null;
        shas.set(rev, out === null || out.trim() === "" ? null : out.trim());
      }
      return shas.get(rev) ?? null;
    },
    read(path, sha) {
      const rel = safeRelative(path);
      if (rel === null) return null;
      const key = `${sha ?? ""}:${rel}`;
      if (!texts.has(key)) {
        let text = null;
        if (sha !== null) text = gitOut(root, ["cat-file", "blob", `${sha}:${rel}`]);
        else {
          const file = join(root, rel);
          if (existsSync(file) && statSync(file).isFile()) text = readFileSync(file, "utf8");
        }
        texts.set(key, text);
      }
      return texts.get(key) ?? null;
    },
  };
}

/** The number of lines of a text: LF-terminated lines plus a final line without one. @param {string} text */
export function lineCount(text) {
  if (text === "") return 0;
  const parts = text.split("\n").length;
  return text.endsWith("\n") ? parts - 1 : parts;
}

/** @param {string} path */
function scriptKind(path) {
  const ext = extname(path);
  if (ext === ".tsx") return ts.ScriptKind.TSX;
  if (ext === ".jsx") return ts.ScriptKind.JSX;
  if (ext === ".js" || ext === ".mjs" || ext === ".cjs") return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

/** @param {ts.Expression} expression */
function isObjectFreeze(expression) {
  return ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression) && expression.expression.text === "Object" && expression.name.text === "freeze";
}

/**
 * The array literal an initializer is, through type assertions, parentheses and Object.freeze.
 * @param {ts.Expression} initializer
 * @returns {ts.ArrayLiteralExpression | undefined}
 */
function arrayOf(initializer) {
  let expression = initializer;
  for (;;) {
    if (ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression) || ts.isParenthesizedExpression(expression) || ts.isTypeAssertionExpression(expression) || ts.isNonNullExpression(expression)) {
      expression = expression.expression;
    } else if (ts.isCallExpression(expression) && expression.arguments.length === 1 && isObjectFreeze(expression.expression)) {
      const [argument] = expression.arguments;
      if (argument === undefined) break;
      expression = argument;
    } else break;
  }
  return ts.isArrayLiteralExpression(expression) ? expression : undefined;
}

/**
 * Every variable declared with an array literal initializer, by name: its element count, its first and last line and
 * whether it holds a spread element (whose rows are not statically countable).
 * @param {string} text
 * @param {string} path
 * @returns {Map<string, { count: number, first: number, last: number, spread: boolean }[]>}
 */
export function arrayLiterals(text, path) {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKind(path));
  /** @type {Map<string, { count: number, first: number, last: number, spread: boolean }[]>} */
  const out = new Map();
  /** @param {ts.Node} node */
  const visit = node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) {
      const literal = arrayOf(node.initializer);
      if (literal !== undefined) {
        const first = source.getLineAndCharacterOfPosition(literal.getStart(source)).line + 1;
        const last = source.getLineAndCharacterOfPosition(literal.getEnd()).line + 1;
        const entry = { count: literal.elements.length, first, last, spread: literal.elements.some(element => ts.isSpreadElement(element)) };
        out.set(node.name.text, [...(out.get(node.name.text) ?? []), entry]);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return out;
}

// ---- the claim grammar ---------------------------------------------------------------------------------------------

const ROOT_EXTENSIONS = "ts|mts|cts|tsx|js|mjs|cjs|jsx|md|json|toml|yaml|yml|txt|sh|py";
const PATH = String.raw`(?<![\w@./-])((?:[A-Za-z0-9_@.-]+\/)+[A-Za-z0-9_@.-]*[A-Za-z0-9_@-]\.[A-Za-z0-9]+|[A-Za-z0-9_@-][A-Za-z0-9_@.-]*\.(?:${ROOT_EXTENSIONS})(?![A-Za-z0-9]))`;
const IDENT = String.raw`([A-Z][A-Z0-9_]*[A-Z0-9])`;
const NOUN = String.raw`(?:rows|entries|elements|members)\b`;
const ROWS_RX = new RegExp(String.raw`${PATH}\s+(?:holds|has|carries|contains|keeps)\s+(\d+)\s+${IDENT}\s+${NOUN}`, "g");
const CONTINUATION_RX = new RegExp(String.raw`\b(?:plus|and)\s+(\d+)\s+${IDENT}\s+${NOUN}`, "g");
const SELF_ROWS_RX = new RegExp(String.raw`(?<![\w@./-])(\d+)\s+${IDENT}\s+${NOUN}`, "g");
const ARRAY_RX = new RegExp(String.raw`(?<![\w.-])(\d+)\s+(?:elements\s+)?in\s+the\s+${IDENT}\s+array\s+literal(?:\s*\(\s*lines?\s+(\d+)\s*(?:to|through|-|–)\s*(\d+)\s*\))?`, "g");
const TABLE_RX = /\((\d+)\s+rows\)\s*$/;
const LINES_RX = new RegExp(String.raw`${PATH}\s*\(\s*(\d+)\s+lines\b`, "g");
const CITE_RX = new RegExp(String.raw`${PATH}:(\d+)(?:[-–](\d+))?(?::\d+)?(?![\w:]|\.\d)`, "g");
const REV_RX = /\b(?:at|on)\s+(?:(?:trunk|base|tip|commit|main|origin)\s+)?([0-9a-f]{7,40})\b/g;
const PATH_RX = new RegExp(PATH, "g");
/** Words before a count that make it a delta or a subset rather than a total. */
const DELTA_WORDS = new Set(["adds", "added", "adding", "removes", "removed", "drops", "dropped", "gains", "gained", "loses", "lost", "deletes", "deleted", "moves", "moved", "extra", "new", "more", "fewer", "other", "another", "first", "last", "next"]);

/** A hex token is a definite revision when it holds a letter or is a full 40-digit sha; an all-decimal one is a candidate. @param {string} hex */
const isDefinite = hex => hex.length === 40 || /[a-f]/.test(hex);

/**
 * The revision named in a text: the first (or last) lettered token, else the first (or last) all-decimal candidate.
 * @param {string} text
 * @param {"first" | "last"} which
 * @returns {{ rev: string | null, revDecimal: boolean }}
 */
function revisionIn(text, which) {
  const tokens = [...text.matchAll(REV_RX)].map(match => match[1] ?? "").filter(token => token !== "");
  const pick = (/** @type {string[]} */ list) => (which === "first" ? list[0] : list[list.length - 1]);
  const definite = pick(tokens.filter(isDefinite));
  if (definite !== undefined) return { rev: definite, revDecimal: false };
  const decimal = pick(tokens.filter(token => !isDefinite(token)));
  return decimal === undefined ? { rev: null, revDecimal: false } : { rev: decimal, revDecimal: true };
}

/** @param {{ rev: string | null, revDecimal: boolean }} named */
const revFields = named => (named.revDecimal ? { rev: named.rev, revDecimal: true } : { rev: named.rev });

/** @param {string} text */
function lastPath(text) {
  let path = null;
  for (const match of text.matchAll(PATH_RX)) if (match[1] !== undefined) path = match[1];
  return path;
}

/** Sentences of a rendered block: split after . ! or ? where the next word starts upper case. @param {string} text */
function sentences(text) {
  /** @type {{ text: string, start: number }[]} */
  const out = [];
  let start = 0;
  for (const match of text.matchAll(/[.!?]\s+(?=[A-Z])/g)) {
    const end = (match.index ?? 0) + 1;
    out.push({ text: text.slice(start, end), start });
    start = (match.index ?? 0) + match[0].length;
  }
  out.push({ text: text.slice(start), start });
  return out;
}

const ENTITIES = /** @type {Record<string, string>} */ ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " });
/** @param {string} text */
export function decodeEntities(text) {
  return text.replace(/&(#[xX][0-9a-fA-F]+|#[0-9]+|[A-Za-z]+);/g, (entity, body) => {
    if (body.startsWith("#x") || body.startsWith("#X")) return codePoint(Number.parseInt(body.slice(2), 16), entity);
    if (body.startsWith("#")) return codePoint(Number.parseInt(body.slice(1), 10), entity);
    return ENTITIES[body] ?? entity;
  });
}
/** @param {number} value @param {string} fallback */
function codePoint(value, fallback) {
  return Number.isInteger(value) && value > 0 && value <= 0x10ffff ? String.fromCodePoint(value) : fallback;
}

/** What a reader matches: NFKC, whitespace collapsed. @param {string} text */
const readable = text => text.normalize("NFKC").replace(/\s+/g, " ").trim();

/**
 * One unit of text a claim is matched in: a block of a markdown file, or a comment or string literal of a census file.
 * @typedef {object} Unit
 * @property {string} text  the rendered text
 * @property {string} raw  the source of the unit
 * @property {number} line  the 1-based line where the source starts
 * @property {string | null} markup  raw HTML the text renders through, or null
 * @property {number} [heading]  a top-level heading: its index in the lexed token list
 * @property {string} [alt]  for an inline element: the rendered text without the text inside element tags
 */

/** @param {string} text */
const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * A needle as a pattern: its words joined across any whitespace (a source line break included), each word optionally
 * inside a code span's backticks.
 * @param {string} needle
 */
const needlePattern = needle =>
  new RegExp(
    needle
      .trim()
      .split(/\s+/)
      .map(word => `\`?${escapeRegExp(word)}\`?`)
      .join(String.raw`\s+`),
    "g",
  );

/** A unit's source with its HTML comments blanked (line breaks kept): a hidden copy of a needle never places a claim. @param {string} raw */
const visibleSource = raw => raw.replace(/<!--[\s\S]*?-->/g, comment => comment.replace(/[^\n]/g, " "));

/**
 * The line of the claim matched at offset `at` of a unit's rendered text (wb-8py9 U2: each match by its own offset, so a
 * line appended to a landed paragraph is placed on its own line, not on the first line naming the same path). For the
 * first needle that occurs as often in the unit's source (comments blanked) as in its rendered text, the needle's first
 * occurrence at or after `at` is located at the same rank in the source. With no such needle: `fallback` when given, else
 * the first occurrence in the source of the first needle found there, else the unit's first line.
 * @param {Unit} unit
 * @param {readonly string[]} needles
 * @param {number} at
 * @param {number} [fallback]
 * @returns {number}
 */
function lineIn(unit, needles, at, fallback) {
  const source = visibleSource(unit.raw);
  /** @param {number} offset */
  const lineOf = offset => unit.line + (source.slice(0, offset).match(/\n/g) ?? []).length;
  for (const needle of needles) {
    if (needle.trim() === "") continue;
    const pattern = needlePattern(needle);
    const rendered = [...unit.text.matchAll(pattern)].map(match => match.index ?? 0);
    const located = [...source.matchAll(pattern)].map(match => match.index ?? 0);
    const rank = rendered.findIndex(index => index >= at);
    const offset = located[rank];
    if (rank >= 0 && rendered.length === located.length && offset !== undefined) return lineOf(offset);
  }
  if (fallback !== undefined) return fallback;
  for (const needle of needles) {
    const offset = needle.trim() === "" ? -1 : source.search(needlePattern(needle));
    if (offset >= 0) return lineOf(offset);
  }
  return unit.line;
}

/**
 * The claims of one unit.
 * @param {Unit} unit
 * @param {string} file
 * @param {{ selfArrays?: ReadonlySet<string>, self?: string }} context  a census file's own arrays and path
 * @returns {Claim[]}
 */
function unitClaims(unit, file, context) {
  /** @type {Claim[]} */
  const out = [];
  const text = unit.text;
  for (const sentence of sentences(text)) {
    const s = sentence.text;
    const named = revisionIn(s, "first");
    /** @type {[number, number][]} */
    const covered = [];
    const rowsMatches = [...s.matchAll(ROWS_RX)];
    rowsMatches.forEach((match, index) => {
      const [whole, path, n, ident] = match;
      if (path === undefined || n === undefined || ident === undefined) return;
      const start = match.index ?? 0;
      covered.push([start, start + whole.length]);
      const head = lineIn(unit, [path, `${n} ${ident}`], sentence.start + start);
      out.push({ kind: "rows", file, line: head, text: whole, path, ...revFields(named), ident, count: Number(n) });
      const next = rowsMatches[index + 1]?.index ?? s.length;
      const tail = s.slice(start + whole.length, next);
      const nextPath = tail.search(PATH_RX);
      const scope = nextPath >= 0 ? tail.slice(0, nextPath) : tail;
      for (const more of scope.matchAll(CONTINUATION_RX)) {
        const [cont, m, id] = more;
        if (m === undefined || id === undefined) continue;
        const at = start + whole.length + (more.index ?? 0);
        covered.push([at, at + cont.length]);
        out.push({ kind: "rows", file, line: lineIn(unit, [`${m} ${id}`], sentence.start + at, head), text: `${whole} ${cont}`, path, ...revFields(named), ident: id, count: Number(m) });
      }
    });
    if (context.selfArrays !== undefined && context.self !== undefined) {
      for (const match of s.matchAll(SELF_ROWS_RX)) {
        const [whole, n, ident] = match;
        const start = match.index ?? 0;
        if (n === undefined || ident === undefined || !context.selfArrays.has(ident)) continue;
        if (covered.some(([a, b]) => start >= a && start < b)) continue;
        const before = s.slice(0, start).trim().split(/\s+/).pop()?.toLowerCase() ?? "";
        if (DELTA_WORDS.has(before)) continue;
        out.push({ kind: "rows", file, line: lineIn(unit, [`${n} ${ident}`, ident], sentence.start + start), text: whole, path: context.self, rev: null, ident, count: Number(n) });
      }
    }
    for (const match of s.matchAll(ARRAY_RX)) {
      const [whole, n, ident, a, b] = match;
      if (n === undefined || ident === undefined) continue;
      const at = sentence.start + (match.index ?? 0);
      const upTo = text.slice(0, at);
      const before = revisionIn(upTo, "last");
      /** @type {Claim} */
      const claim = { kind: "array", file, line: lineIn(unit, [`${n} elements in the ${ident}`, `${ident} array literal`, ident], at), text: whole, path: lastPath(upTo) ?? context.self ?? null, ...revFields(before.rev === null ? named : before), ident, count: Number(n) };
      if (a !== undefined && b !== undefined) claim.span = [Number(a), Number(b)];
      out.push(claim);
    }
    for (const match of s.matchAll(LINES_RX)) {
      const [whole, path, n] = match;
      if (path === undefined || n === undefined) continue;
      out.push({ kind: "lines", file, line: lineIn(unit, [path], sentence.start + (match.index ?? 0)), text: whole, path, ...revFields(named), count: Number(n) });
    }
    for (const match of s.matchAll(CITE_RX)) {
      const [whole, path, a, b] = match;
      if (path === undefined || a === undefined) continue;
      out.push({ kind: "cite", file, line: lineIn(unit, [whole, path], sentence.start + (match.index ?? 0)), text: whole, path, ...revFields(named), cite: [Number(a), Number(b ?? a)] });
    }
  }
  return out;
}

/**
 * The claims of a unit. One that renders through raw HTML yields one fail-closed html claim instead, carrying the claims
 * either reading of it holds (with the text inside element tags, and without it).
 * @param {Unit} unit
 * @param {string} file
 * @param {{ selfArrays?: ReadonlySet<string>, self?: string }} context
 * @param {readonly Claim[]} [extra]  claims of the unit found outside the sentence grammar (a heading's row total)
 * @returns {Claim[]}
 */
function claimsOf(unit, file, context, extra = []) {
  const plain = [...unitClaims(unit, file, context), ...extra];
  if (unit.markup === null) return plain;
  const inner = [...plain, ...(unit.alt === undefined ? [] : unitClaims({ ...unit, text: unit.alt, markup: null }, file, context))];
  const first = inner[0];
  if (first === undefined) return [];
  return [{ kind: "html", file, line: first.line, text: first.text, path: null, rev: null, markup: unit.markup, inner }];
}

// ---- markdown: the rendered view -----------------------------------------------------------------------------------

/** @param {import("marked").Token} token */
const childrenOf = token => {
  const value = /** @type {{ tokens?: unknown }} */ (token).tokens;
  return Array.isArray(value) ? /** @type {import("marked").Token[]} */ (value) : [];
};
/** @param {import("marked").Token} token */
const textOf = token => {
  const value = /** @type {{ text?: unknown }} */ (token).text;
  return typeof value === "string" ? value : "";
};
/** A complete HTML comment (or a run of them): it renders nothing. @param {string} raw */
const commentOnly = raw => /^(?:\s*<!--[\s\S]*?-->)+\s*$/.test(raw);
/** What raw HTML would show as text: comments, tags and code-span backticks removed. @param {string} raw */
const htmlText = raw =>
  raw
    .replace(/<!--[\s\S]*?(?:-->|$)/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/`/g, "")
    .trim();
const VOID_ELEMENTS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

/**
 * Inline tokens as a reader sees them, twice: with the text inside inline element tags (text) and without it (alt).
 * @param {readonly import("marked").Token[]} tokens
 * @param {{ markup: string | null, depth: number }} state
 * @returns {{ text: string, alt: string }}
 */
function inlineText(tokens, state) {
  let text = "";
  let alt = "";
  for (const token of tokens) {
    if (token.type === "html") {
      const raw = token.raw;
      if (commentOnly(raw)) continue;
      state.markup ??= raw.trim();
      const tag = /^<(\/?)([A-Za-z][\w-]*)[^>]*?(\/?)>$/.exec(raw.trim());
      if (tag !== null && tag[2] !== undefined && !VOID_ELEMENTS.has(tag[2].toLowerCase()) && tag[3] !== "/") state.depth = Math.max(0, state.depth + (tag[1] === "/" ? -1 : 1));
      const shown = htmlText(raw);
      text += shown === "" ? "" : ` ${shown} `;
      continue;
    }
    if (token.type === "del" || token.type === "image") continue;
    if (token.type === "br") {
      text += " ";
      alt += " ";
    } else if (token.type !== "codespan" && token.type !== "escape" && childrenOf(token).length > 0) {
      const inner = inlineText(childrenOf(token), state);
      text += inner.text;
      alt += inner.alt;
    } else {
      const leaf = decodeEntities(textOf(token));
      text += leaf;
      if (state.depth === 0) alt += leaf;
    }
  }
  return { text, alt };
}

/** @param {import("marked").Token} token */
const isTable = token => token.type === "table";

/**
 * The rendered body rows of a table: a row whose every cell renders no text is not a row a reader can read.
 * @param {import("marked").Tokens.Table} table
 */
function renderedRows(table) {
  return table.rows.filter(row => row.some(cell => readable(inlineText(cell.tokens, { markup: null, depth: 0 }).text) !== "")).length;
}

/**
 * The markdown units of a document, in source order, each with its source line.
 * @param {string} markdown
 * @returns {Unit[]}
 */
export function markdownUnits(markdown) {
  const tokens = new Lexer({ gfm: true }).lex(markdown);
  /** @type {Unit[]} */
  const units = [];
  let cursor = 0;
  /** @param {number} offset */
  const lineAt = offset => (markdown.slice(0, offset).match(/\n/g) ?? []).length + 1;
  /** @param {string} raw @param {number} from */
  const locate = (raw, from) => {
    const at = markdown.indexOf(raw, from);
    return at >= 0 ? at : from;
  };
  let blockDepth = 0;
  /** @type {string | null} */
  let blockMarkup = null;
  /**
   * @param {import("marked").Token} token
   * @param {number} offset
   * @param {number} [index]  the top-level token index
   */
  const block = (token, offset, index) => {
    const line = lineAt(offset);
    const inherited = blockDepth > 0 ? blockMarkup : null;
    if (token.type === "space" || token.type === "hr" || token.type === "code" || token.type === "def") return;
    if (token.type === "html") {
      if (commentOnly(token.raw)) return;
      const raw = token.raw.trim();
      const opens = (raw.match(/<[A-Za-z][\w-]*[^>]*>/g) ?? []).filter(tag => !/\/>$/.test(tag) && !VOID_ELEMENTS.has((/^<([A-Za-z][\w-]*)/.exec(tag)?.[1] ?? "").toLowerCase())).length;
      const closes = (raw.match(/<\/[A-Za-z][\w-]*\s*>/g) ?? []).length;
      if (opens > closes) {
        blockDepth += opens - closes;
        blockMarkup ??= raw.split("\n")[0] ?? raw;
      } else if (closes > opens) {
        blockDepth = Math.max(0, blockDepth - (closes - opens));
        if (blockDepth === 0) blockMarkup = null;
      }
      const shown = readable(htmlText(token.raw));
      if (shown !== "") units.push({ text: shown, raw: token.raw, line, markup: raw.split("\n")[0] ?? raw });
      return;
    }
    if (token.type === "heading") {
      const state = { markup: inherited, depth: 0 };
      const rendered = inlineText(childrenOf(token), state);
      units.push({ text: readable(rendered.text), raw: token.raw, line, markup: state.markup, alt: readable(rendered.alt), ...(index === undefined ? {} : { heading: index }) });
      return;
    }
    if (token.type === "list") {
      let from = offset;
      for (const item of /** @type {import("marked").Tokens.List} */ (token).items) {
        const at = locate(item.raw, from);
        for (const child of item.tokens) {
          const childAt = locate(child.raw, at);
          if (child.type === "text") {
            const state = { markup: inherited, depth: 0 };
            const rendered = inlineText(childrenOf(child).length > 0 ? childrenOf(child) : [child], state);
            units.push({ text: readable(rendered.text), raw: child.raw, line: lineAt(childAt), markup: state.markup, alt: readable(rendered.alt) });
          } else block(child, childAt);
        }
        from = at + item.raw.length;
      }
      return;
    }
    if (token.type === "blockquote") {
      let from = offset;
      for (const child of childrenOf(token)) {
        const at = locate(child.raw, from);
        block(child, at);
        from = at + child.raw.length;
      }
      return;
    }
    if (isTable(token)) {
      const table = /** @type {import("marked").Tokens.Table} */ (token);
      for (const cell of [...table.header, ...table.rows.flat()]) {
        const state = { markup: inherited, depth: 0 };
        const rendered = inlineText(cell.tokens, state);
        const at = locate(cell.text, offset);
        units.push({ text: readable(rendered.text), raw: cell.text, line: at >= offset && at < offset + token.raw.length ? lineAt(at) : line, markup: state.markup, alt: readable(rendered.alt) });
      }
      return;
    }
    const state = { markup: inherited, depth: 0 };
    const rendered = inlineText(childrenOf(token).length > 0 ? childrenOf(token) : [token], state);
    units.push({ text: readable(rendered.text), raw: token.raw, line, markup: state.markup, alt: readable(rendered.alt) });
  };
  tokens.forEach((token, index) => {
    const offset = locate(token.raw, cursor);
    block(token, offset, index);
    cursor = offset + token.raw.length;
  });
  return units;
}

/**
 * The measured rows under every heading: the rendered body rows of its section's tables or, when the section holds no
 * table, the non-blank lines of its code blocks (a listing); -1 when it holds neither, -2 when raw HTML (an HTML block
 * that is not a comment) sits in the section.
 * @param {string} markdown
 * @returns {Map<number, number>} heading token index in top-level order -> measured rows
 */
function sectionRows(markdown) {
  const tokens = new Lexer({ gfm: true }).lex(markdown);
  /** @type {Map<number, number>} */
  const out = new Map();
  tokens.forEach((token, index) => {
    if (token.type !== "heading") return;
    const depth = /** @type {import("marked").Tokens.Heading} */ (token).depth;
    let rows = 0;
    let tables = 0;
    let listing = 0;
    let codes = 0;
    let html = false;
    /** @param {import("marked").Token} child */
    const visit = child => {
      if (child.type === "html" && !commentOnly(child.raw)) html = true;
      if (isTable(child)) {
        tables += 1;
        rows += renderedRows(/** @type {import("marked").Tokens.Table} */ (child));
      }
      if (child.type === "code") {
        codes += 1;
        listing += textOf(child).split("\n").filter(line => line.trim() !== "").length;
      }
      if (child.type === "list") for (const item of /** @type {import("marked").Tokens.List} */ (child).items) for (const nested of item.tokens) visit(nested);
      if (child.type === "blockquote") for (const nested of childrenOf(child)) visit(nested);
    };
    for (const next of tokens.slice(index + 1)) {
      if (next.type === "heading" && /** @type {import("marked").Tokens.Heading} */ (next).depth <= depth) break;
      visit(next);
    }
    out.set(index, html ? -2 : tables > 0 ? rows : codes > 0 ? listing : -1);
  });
  return out;
}

/**
 * The claims of a markdown file, as a reader sees it.
 * @param {string} markdown
 * @param {string} file
 * @returns {Claim[]}
 */
export function markdownClaims(markdown, file) {
  const rows = sectionRows(markdown);
  /** @type {Claim[]} */
  const out = [];
  for (const unit of markdownUnits(markdown)) {
    /** @type {Claim[]} */
    const extra = [];
    for (const reading of unit.markup === null ? [unit.text] : [unit.text, unit.alt ?? ""]) {
      const table = TABLE_RX.exec(reading);
      if (unit.heading !== undefined && table !== null && table[1] !== undefined) {
        extra.push({ kind: "table", file, line: unit.line, text: reading, path: null, rev: null, count: Number(table[1]), rows: rows.get(unit.heading) ?? -1 });
        break;
      }
    }
    out.push(...claimsOf(unit, file, {}, extra));
  }
  return out;
}

// ---- TypeScript census files ---------------------------------------------------------------------------------------

/** A comment's prose: markers and leading asterisks removed. @param {string} raw */
function commentText(raw) {
  if (raw.startsWith("//")) return raw.slice(2);
  return raw
    .replace(/^\/\*+/, "")
    .replace(/\*+\/$/, "")
    .split("\n")
    .map(line => line.replace(/^\s*\*(?!\/)/, ""))
    .join("\n");
}

/** The vitest registration roots whose first argument is a case or suite title. */
const TITLE_ROOTS = new Set(["it", "test", "describe", "suite"]);

/** @param {ts.Expression} callee */
function calleeRoot(callee) {
  let expression = callee;
  while (ts.isPropertyAccessExpression(expression) || ts.isCallExpression(expression)) expression = ts.isCallExpression(expression) ? expression.expression : expression.expression;
  return ts.isIdentifier(expression) ? expression.text : null;
}

/**
 * The claims of a TypeScript census file: its comments and its case and suite titles are its text (other string
 * literals are data, never claims); a path-less row count binds to an array literal the file declares.
 * @param {string} text
 * @param {string} file
 * @returns {Claim[]}
 */
export function censusClaims(text, file) {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKind(file));
  /** @param {number} position */
  const lineAt = position => source.getLineAndCharacterOfPosition(position).line + 1;
  /** @type {Unit[]} */
  const units = [];
  const seen = new Set();
  /** @param {readonly ts.CommentRange[] | undefined} ranges */
  const comments = ranges => {
    for (const range of ranges ?? []) {
      if (seen.has(range.pos)) continue;
      seen.add(range.pos);
      const raw = text.slice(range.pos, range.end);
      units.push({ text: readable(commentText(raw)), raw, line: lineAt(range.pos), markup: null });
    }
  };
  /** @param {ts.Node} node */
  const visit = node => {
    comments(ts.getLeadingCommentRanges(text, node.pos));
    comments(ts.getTrailingCommentRanges(text, node.end));
    if (ts.isCallExpression(node) && TITLE_ROOTS.has(calleeRoot(node.expression) ?? "")) {
      const [title] = node.arguments;
      if (title !== undefined && (ts.isStringLiteral(title) || ts.isNoSubstitutionTemplateLiteral(title))) {
        units.push({ text: readable(title.text), raw: title.getText(source), line: lineAt(title.getStart(source)), markup: null });
      } else if (title !== undefined && ts.isTemplateExpression(title)) {
        const parts = [title.head.text, ...title.templateSpans.map(span => span.literal.text)];
        units.push({ text: readable(parts.join(" ")), raw: title.getText(source), line: lineAt(title.getStart(source)), markup: null });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  comments(ts.getLeadingCommentRanges(text, source.endOfFileToken.pos));
  const selfArrays = new Set(arrayLiterals(text, file).keys());
  return units.flatMap(unit => unitClaims(unit, file, { selfArrays, self: file }));
}

// ---- measurement ---------------------------------------------------------------------------------------------------

/**
 * The revision a claim is measured at: its named commit, or null (the working tree). An all-decimal candidate that
 * resolves to no commit was a figure, not a revision, so the claim is measured at the working tree.
 * @param {Claim} claim
 * @param {Tree} tree
 * @returns {{ rev: string | null, sha: string | null }}
 */
function measuredAt(claim, tree) {
  if (claim.rev === null) return { rev: null, sha: null };
  const sha = tree.resolve(claim.rev);
  if (sha === null && claim.revDecimal === true) return { rev: null, sha: null };
  return { rev: claim.rev, sha };
}

/** @param {Claim} claim @param {string} states @param {string} measured @returns {Finding} */
const finding = (claim, states, measured) => ({ file: claim.file, line: claim.line, kind: claim.kind, claim: claim.text, states, measured });

/**
 * Whether a claim is judged here. A revision that resolves to no commit here names another repository's commit, so a
 * cite at such a revision is an external citation, and so is a figure whose path this working tree does not hold; a cite
 * of a path absent at its measured revision is external too. Every other claim is judged.
 * @param {Claim} claim
 * @param {Tree} tree
 * @returns {boolean}
 */
export function isJudged(claim, tree) {
  if (claim.kind === "html") return (claim.inner ?? []).some(inner => isJudged(inner, tree));
  if (claim.kind === "table") return true;
  if (claim.path === null) return claim.kind !== "cite";
  const { rev, sha } = measuredAt(claim, tree);
  if (claim.kind === "cite") return (rev === null || sha !== null) && tree.read(claim.path, sha) !== null;
  return rev === null || sha !== null || tree.read(claim.path, null) !== null;
}

/**
 * Re-measure one claim against the tree: null when it holds, else the finding naming its figure and the measured one.
 * @param {Claim} claim
 * @param {Tree} tree
 * @returns {Finding | null}
 */
export function measure(claim, tree) {
  if (claim.kind === "html") return finding(claim, "a figure that renders through raw HTML", `nothing: the claim renders through ${JSON.stringify(claim.markup ?? "")}, whose rendered text this lint does not read (fail closed; write the claim without HTML)`);
  if (claim.kind === "table") {
    const rows = claim.rows ?? -1;
    if (rows === claim.count) return null;
    if (rows === -1) return finding(claim, `${claim.count} rows`, "no table and no listing in the heading's section");
    if (rows === -2) return finding(claim, `${claim.count} rows`, "nothing: raw HTML sits in the heading's section, so its rendered rows are not read (fail closed)");
    return finding(claim, `${claim.count} rows`, `${rows} rendered rows in the heading's section (its tables' body rows, else its code listing's non-blank lines)`);
  }
  const path = claim.path;
  const ident = claim.ident ?? "";
  const stated =
    claim.kind === "rows"
      ? `${claim.count} ${ident} rows in ${path ?? "no file"}`
      : claim.kind === "array"
        ? `${claim.count} elements in the ${ident} array literal of ${path ?? "no file"}`
        : claim.kind === "lines"
          ? `${claim.count} lines in ${path}`
          : `line ${(claim.cite ?? [])[1]} of ${path}`;
  const { rev, sha } = measuredAt(claim, tree);
  const statedAt = rev === null ? stated : `${stated} at ${rev}`;
  if (path === null) return finding(claim, statedAt, "nothing: the claim names no file it counts in");
  if (rev !== null && sha === null) return finding(claim, statedAt, `nothing: revision ${rev} resolves to no single commit in this repository, which holds ${path}`);
  const where = sha === null ? `${path} in the working tree` : `${path} at ${rev}`;
  if ((claim.kind === "rows" || claim.kind === "array") && !CODE_EXTENSIONS.includes(extname(path))) return finding(claim, statedAt, `nothing: ${path} is not a TypeScript or JavaScript source`);
  const text = tree.read(path, sha);
  if (text === null) return claim.kind === "cite" ? null : finding(claim, statedAt, `nothing: ${where} does not exist`);
  if (claim.kind === "lines") {
    const lines = lineCount(text);
    return lines === claim.count ? null : finding(claim, statedAt, `${lines} lines (${where})`);
  }
  if (claim.kind === "cite") {
    const [first = 0, last = 0] = claim.cite ?? [];
    const lines = lineCount(text);
    if (first >= 1 && first <= last && last <= lines) return null;
    return finding(claim, statedAt, first > last ? `an inverted line range ${first}-${last}` : `${where} has ${lines} lines`);
  }
  const found = arrayLiterals(text, path).get(ident) ?? [];
  if (found.length === 0) return finding(claim, statedAt, `nothing: ${where} declares no array literal named ${ident}`);
  if (found.length > 1) return finding(claim, statedAt, `nothing: ${where} declares ${found.length} array literals named ${ident}`);
  const [literal] = found;
  if (literal === undefined) return null;
  const shape = `the ${ident} array literal, lines ${literal.first} to ${literal.last}, TypeScript AST of ${where}`;
  if (literal.spread) return finding(claim, statedAt, `nothing countable: ${shape} holds a spread element`);
  const span = claim.span;
  if (literal.count !== claim.count) return finding(claim, statedAt, `${literal.count} (${shape})`);
  if (span !== undefined && (span[0] !== literal.first || span[1] !== literal.last)) return finding(claim, `lines ${span[0]} to ${span[1]} for the ${ident} array literal`, `lines ${literal.first} to ${literal.last} (${shape})`);
  return null;
}

// ---- the delivery --------------------------------------------------------------------------------------------------

/**
 * The base commit: --base resolved, else the merge-base of HEAD and the trunk, else HEAD; null outside a git work tree.
 * @param {string} root
 * @param {string} [base]
 * @returns {string | null}
 */
export function resolveBase(root, base) {
  if (base !== undefined) {
    const sha = gitOut(root, ["rev-parse", "--verify", "--quiet", `${base}^{commit}`]);
    if (sha === null || sha.trim() === "") throw new Error(`--base ${base} resolves to no commit`);
    return sha.trim();
  }
  const merged = gitOut(root, ["merge-base", "HEAD", TRUNK_REF]);
  if (merged !== null && merged.trim() !== "") return merged.trim();
  const head = gitOut(root, ["rev-parse", "--verify", "--quiet", "HEAD^{commit}"]);
  return head === null || head.trim() === "" ? null : head.trim();
}

/**
 * The added line numbers of a path against the base (the new side of each zero-context hunk).
 * @param {string} root
 * @param {string} base
 * @param {string} path
 * @returns {Set<number>}
 */
function addedLines(root, base, path) {
  const diff = gitOut(root, ["diff", "--unified=0", "--no-renames", "--no-color", base, "--", path]) ?? "";
  /** @type {Set<number>} */
  const lines = new Set();
  for (const match of diff.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = Number(match[1]);
    const count = match[2] === undefined ? 1 : Number(match[2]);
    for (let line = start; line < start + count; line += 1) lines.add(line);
  }
  return lines;
}

/**
 * The delivery: every receipt or census path added or modified in the working tree against the base.
 * @param {string} root
 * @param {string} base
 * @returns {{ path: string, status: "added" | "modified" }[]}
 */
export function deliveryFiles(root, base) {
  /** @type {Map<string, "added" | "modified">} */
  const out = new Map();
  for (const line of (gitOut(root, ["diff", "--name-status", "--no-renames", base]) ?? "").split("\n")) {
    const [status, path] = line.split("\t");
    if (path === undefined || status === undefined) continue;
    if (status.startsWith("A")) out.set(path, "added");
    else if (status.startsWith("M")) out.set(path, "modified");
  }
  for (const path of (gitOut(root, ["ls-files", "--others", "--exclude-standard"]) ?? "").split("\n")) if (path !== "") out.set(path, "added");
  return [...out]
    .filter(([path]) => isReceiptPath(path) || isCensusPath(path))
    .map(([path, status]) => ({ path, status }))
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}

/**
 * Lint a delivery: extract the claims of every judged file and re-measure each against the tree.
 * @param {string} root
 * @param {{ base?: string, files?: readonly string[] }} [options]
 * @returns {LintReport}
 */
export function lintDelivery(root, options = {}) {
  const tree = treeOf(root);
  const base = resolveBase(root, options.base);
  /** @type {Map<string, Set<number> | null>} */
  const judged = new Map();
  if (base !== null) for (const file of deliveryFiles(root, base)) judged.set(file.path, file.status === "modified" && isReceiptPath(file.path) ? addedLines(root, base, file.path) : null);
  for (const named of options.files ?? []) {
    const rel = safeRelative(named);
    if (rel !== null && (isMarkdownPath(rel) || isTestSourcePath(rel))) judged.set(rel, null);
  }
  /** @type {Claim[]} */
  const claims = [];
  /** @type {Finding[]} */
  const findings = [];
  const files = [...judged.keys()].sort();
  for (const file of files) {
    const text = tree.read(file, null);
    if (text === null) continue;
    const report = judgeText(text, file, tree, judged.get(file) ?? null);
    claims.push(...report.claims);
    findings.push(...report.findings);
  }
  return { base, files, claims, findings };
}

/**
 * Judge one file's text against a tree: its claims (a markdown file by the rendered view, any other by the census
 * reading), each judged one re-measured; with `lines`, only the claims on those lines (a modified receipt's added lines).
 * @param {string} text
 * @param {string} file  the file's repository-relative path (its kind and the claims' file)
 * @param {Tree} tree
 * @param {ReadonlySet<number> | null} [lines]
 * @returns {{ claims: Claim[], findings: Finding[] }}
 */
export function judgeText(text, file, tree, lines = null) {
  /** @type {Claim[]} */
  const claims = [];
  /** @type {Finding[]} */
  const findings = [];
  for (const claim of isMarkdownPath(file) ? markdownClaims(text, file) : censusClaims(text, file)) {
    if (lines !== null && !lines.has(claim.line)) continue;
    if (!isJudged(claim, tree)) continue;
    claims.push(claim);
    const found = measure(claim, tree);
    if (found !== null) findings.push(found);
  }
  return { claims, findings };
}

/**
 * The string literals of the default vitest config's exclude array (vitest.config.ts), read with the TypeScript AST.
 * @param {string} root
 * @returns {Set<string>}
 */
function defaultExcludes(root) {
  const file = join(root, "vitest.config.ts");
  /** @type {Set<string>} */
  const out = new Set();
  if (!existsSync(file)) return out;
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  /** @param {ts.Node} node */
  const visit = node => {
    if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === "exclude" && ts.isArrayLiteralExpression(node.initializer)) {
      for (const element of node.initializer.elements) if (ts.isStringLiteral(element)) out.add(element.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return out;
}

/**
 * The landed readers of delivered paths: default-tier test files tracked at the base, absent from the delivery and from
 * the default config's exclude list, whose text names a delivered path (for a receipt: the receipts directory).
 * @param {string} root
 * @param {string} base
 * @param {readonly string[]} delivered
 * @param {readonly string[]} [own]  the delivery's own changed files, never landed readers
 * @returns {string[]}
 */
export function landedReaders(root, base, delivered, own = delivered) {
  const excluded = defaultExcludes(root);
  const mine = new Set(own);
  const needles = [...new Set(delivered.map(path => (isReceiptPath(path) ? RECEIPTS_DIR : path)))];
  if (needles.length === 0) return [];
  const listed = (gitOut(root, ["ls-tree", "-r", "--name-only", base, "--", "test"]) ?? "").split("\n").filter(path => path.endsWith(".test.ts"));
  return listed
    .filter(path => !mine.has(path) && !excluded.has(path))
    .filter(path => {
      const file = join(root, path);
      if (!existsSync(file)) return false;
      const text = readFileSync(file, "utf8");
      return needles.some(needle => text.includes(needle));
    })
    .sort();
}

/**
 * The named files that do not exist under the root: a usage error for both CLIs (Forge refuses an absent path only for an
 * {args} command, and census-file's command takes its arguments appended instead).
 * @param {string} root
 * @param {readonly string[]} files
 * @returns {string[]}
 */
export function missingFiles(root, files) {
  return files.filter(file => {
    const rel = safeRelative(file);
    return rel === null || !existsSync(join(root, rel)) || !statSync(join(root, rel)).isFile();
  });
}

/** @param {Finding} found */
export function formatFinding(found) {
  return `${found.file}:${found.line}: [${found.kind}] "${found.claim}" states ${found.states}; measured ${found.measured}`;
}

/**
 * @param {readonly string[]} argv
 * @returns {{ base?: string, json: boolean, readers: boolean, files: string[] }}
 */
export function parseArgs(argv) {
  /** @type {{ base?: string, json: boolean, readers: boolean, files: string[] }} */
  const out = { json: false, readers: false, files: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? "";
    if (arg === "--json") out.json = true;
    else if (arg === "--readers") out.readers = true;
    else if (arg === "--base") {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith("--")) throw new Error("--base needs a revision");
      out.base = value;
      index += 1;
    } else if (arg.startsWith("--base=")) out.base = arg.slice("--base=".length);
    else if (arg.startsWith("--")) throw new Error(`unknown option ${arg}`);
    else out.files.push(arg);
  }
  return out;
}

/**
 * The CLI: lint the delivery of the working tree at cwd; exit 0 clean, 1 on a finding, 2 on usage.
 * @param {readonly string[]} argv
 * @param {string} [root]
 * @returns {number}
 */
export function main(argv, root = process.cwd()) {
  let args;
  try {
    args = parseArgs(argv);
  } catch (error) {
    process.stderr.write(`${TOOL}: ${error instanceof Error ? error.message : String(error)}\nusage: node qa/workbench/receipt-lint.mjs [--base <rev>] [--json] [--readers] [<file> ...]\n`);
    return 2;
  }
  const missing = missingFiles(root, args.files);
  if (missing.length > 0) {
    process.stderr.write(`${TOOL}: no such file: ${missing.join(", ")}\n`);
    return 2;
  }
  let report;
  try {
    report = lintDelivery(root, { base: args.base, files: args.files });
  } catch (error) {
    process.stderr.write(`${TOOL}: ${error instanceof Error ? error.message : String(error)}\n`);
    return 2;
  }
  const readers = args.readers && report.base !== null ? landedReaders(root, report.base, report.files) : [];
  if (args.json) process.stdout.write(`${JSON.stringify({ tool: TOOL, base: report.base, files: report.files, claims: report.claims.length, findings: report.findings, ...(args.readers ? { readers } : {}) })}\n`);
  else {
    process.stdout.write(`${TOOL}: ${report.claims.length} claims judged in ${report.files.length} files at base ${report.base ?? "(none)"}; ${report.findings.length} do not hold\n`);
    if (args.readers) for (const reader of readers) process.stdout.write(`${TOOL}: reader ${reader}\n`);
  }
  for (const found of report.findings) process.stderr.write(`${TOOL}: ${formatFinding(found)}\n`);
  return report.findings.length === 0 ? 0 : 1;
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) process.exitCode = main(process.argv.slice(2));
