/**
 * wb-4zgj: the B1, A1, B2 and C1 readers of the wb-hs2j.3 lifecycle census (test/workbench-rf-session-lifecycle-census.test.ts) as
 * wb-khhg's FINAL cut #4 wrote them (machine/flywheel/wb-khhg tip b6182e1b335cd22fe35b1d04ddf0f625f68b604c, that census's blob
 * 41d75e9443fb0838f6436296072955e8d6544a2b, sha256 6f1d4f02bb62fb6bd0c3c4802713c55a7ecf35b9313177d550115f97c0bf453d), moved here
 * so that the wb-4zgj reach census (test/workbench-rf-session-lifecycle-reach-census.test.ts) can hold their readings. Under the
 * rule-19 dependency inversion R-B301 the parent wb-khhg is parked and waits on wb-4zgj; its later re-cut can import these
 * readers. The code of every declaration below the imports, from its first line to its closing line, is copied byte for byte from
 * that blob: lines 177-178, 196-198, 200-201, 203, 205-238, 240-242, 250-251, 253-259, 529-544, 547-564, 567, 569-573, 595-600,
 * 602-635, 637-658, 670-677, 721-727, 729-743, 745, 748-768, 770-776, 781-854, 856-863, 867-896, 898-902, 906-921, 973-989,
 * 992-1008, 1010-1017 and 1019-1028, in that order. descriptorJudgeOf wraps the descriptor judge of that census's C1 case (lines
 * 1587-1592, verbatim, their indentation kept), the read log its line 1586 declares handed in as a parameter. The doc comments
 * above those declarations are not copied: several spell sentences the B1 judge flags, and this module, unlike the parent census
 * and its roster, is no exempt file of trunk's census, which judges every walked file. present (lines 670-677) comes along with
 * the readers so that lstatSync stays in scope here as it is in that census. Only this comment, the imports, descriptorJudgeOf's
 * first line, its return line and closing brace, and the export statements are added. Test-only: each reader reads only the root,
 * the modules or the descriptors it is handed; nothing is written here and no src module is imported.
 */
import { type Dirent, lstatSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import ts from "typescript";

const SELF = "test/workbench-rf-session-lifecycle-census.test.ts";
const ROSTER_FILE = "test/fixtures/rf-session-lifecycle-roster.json";
const LAUNCHERS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"];
const CHILD_PROCESS = /^(?:node:)?child_process$/;
const SESSION_VERBS = ["open", "show", "list", "close", "recover", "handoff", "resume", "attach"];
const SESSION_VERB_TEXT = /\bsession\.(?:open|show|list|close|recover|handoff|resume|attach)\b|\brf\b[^\n]{0,80}?\bsession[\s_-]+(?:open|show|list|close|recover|handoff|resume|attach)\b/i;
const SESSION_FLAG_TEXT = /--session\b/;
const SESSION_FIELD_TEXT = /--session\b|\bsession_id\b|\bsession\.(?:open|show|list|close|recover|handoff|resume|attach)\b|\brfs_[0-9a-z]{4,}/i;
const SESSION_WORDS = ["session", "sessions"];
const RF_WORDS = ["rf", "rfs", "reactivefiber"];
const EXPIRY_WORDS = [
  "expire",
  "expires",
  "expired",
  "expiring",
  "expiry",
  "expiries",
  "expiration",
  "ttl",
  "ttls",
  "timeout",
  "timeouts",
  "lapse",
  "lapses",
  "lapsed",
  "reap",
  "reaps",
  "reaped",
  "reaper",
  "evict",
  "evicts",
  "evicted",
  "eviction",
  "autoclose",
  "autocloses",
  "autoclosed",
];
const EXPIRY_PAIRS = ["time out", "times out", "timed out", "timing out", "garbage collect", "garbage collected", "garbage collects"];
const AUTO_WORDS = ["auto", "automatic", "automatically"];
const END_WORDS = ["close", "closes", "closed", "closing", "end", "ends", "ended", "drop", "drops", "dropped"];
const NEGATORS = ["no", "never", "not", "without", "cannot", "none", "nor", "t"];
const WINDOWS = { rf: 6, expiry: 8 };
const SENTENCE_BREAK = /[.!?](?=\s)|[;{}]|\n[ \t]*\n/;
const SKIPPED_ROOTS = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge"];
const EXEMPT = [SELF, ROSTER_FILE];
const DEFAULT_IGNORABLE = /\p{Default_Ignorable_Code_Point}/gu;
const INTRAWORD_EMPHASIS = /(?<=[\p{L}\p{N}])\*+(?=[\p{L}\p{N}])/gu;
const WALK_ANCHORS: readonly (readonly [string, string])[] = [
  ["README.md", "pi-subagents"],
  ["src/workbench/providers/reactivefiber.ts", "RF render refused"],
  ["qa/workbench/receipts-index.mjs", "docs/workbench/receipts"],
  ["examples/workflows/compose.js", "export"],
  ["media/screenshot.png", "PNG"],
];
function wordsOf(value: string): string[] {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(word => word.length > 0);
}
const rfAt = (words: readonly string[], at: number): boolean => RF_WORDS.includes(words[at] ?? "") || (words[at] === "reactive" && words[at + 1] === "fiber");
function expiryAt(words: readonly string[], at: number): boolean {
  const word = words[at] ?? "";
  const next = words[at + 1] ?? "";
  return EXPIRY_WORDS.includes(word) || EXPIRY_PAIRS.includes(`${word} ${next}`) || (AUTO_WORDS.includes(word) && END_WORDS.includes(next)) || (END_WORDS.includes(word) && AUTO_WORDS.includes(next));
}
function sentenceFindings(value: string): string[] {
  const found: string[] = [];
  for (const sentence of value.split(SENTENCE_BREAK)) {
    const words = wordsOf(sentence);
    const asserted = words.some((word, at) => {
      if (!SESSION_WORDS.includes(word)) return false;
      const within = (radius: number, test: (index: number) => boolean): number[] => {
        const hits: number[] = [];
        for (let index = Math.max(0, at - radius); index <= Math.min(words.length - 1, at + radius); index += 1) if (test(index)) hits.push(index);
        return hits;
      };
      if (within(WINDOWS.rf, index => rfAt(words, index)).length === 0) return false;
      return within(WINDOWS.expiry, index => expiryAt(words, index)).some(term => !words.slice(0, Math.max(at, term) + 1).some(word => NEGATORS.includes(word)));
    });
    if (asserted) found.push(sentence.replace(/\s+/g, " ").trim().slice(0, 160));
  }
  return found;
}
const rendered = (value: string): string => value.normalize("NFKC").replace(DEFAULT_IGNORABLE, "").replace(INTRAWORD_EMPHASIS, "");
function expiryFindings(value: string): string[] {
  const shown = rendered(value);
  const found = sentenceFindings(value);
  return shown === value ? found : [...new Set([...found, ...sentenceFindings(shown)])];
}
const posix = (path: string): string => path.split(sep).join("/");
interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
function walkTree(root: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string, depth: number): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      unreadable.push(posix(relative(root, directory)));
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      if (depth === 0 && SKIPPED_ROOTS.includes(entry.name)) continue;
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) symlinks.push(posix(relative(root, path)));
      else if (entry.isDirectory()) visit(path, depth + 1);
      else if (entry.isFile()) files.push(posix(relative(root, path)));
    }
  };
  visit(root, 0);
  return { files, symlinks, unreadable };
}
interface TreeReading {
  /** The root the reading walked: the checkout for the live reading, a scratch mirror for a path control or a plant. */
  readonly root: string;
  readonly walk: Walk;
  readonly judged: string[];
  /** The files B1's judge ran on, each recorded after its judgement: the record the listing anchor reads. */
  readonly read: string[];
  readonly findings: string[];
  readonly anchorsWalked: boolean;
}
function readTree(root: string): TreeReading {
  const walk = walkTree(root);
  const judged = walk.files.filter(file => !EXEMPT.includes(file));
  const read: string[] = [];
  const findings: string[] = [];
  const anchors = new Map<string, boolean>();
  for (const file of judged) {
    let buffer: Buffer;
    try {
      buffer = readFileSync(join(root, file));
    } catch (error) {
      // A file gone between the listing and the read holds nothing; any other read failure is a finding.
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) walk.unreadable.push(file);
      continue;
    }
    findings.push(...expiryFindings(buffer.toString("utf8")).map(sentence => `${file}: ${sentence}`));
    read.push(file);
    const anchor = WALK_ANCHORS.find(([path]) => path === file);
    if (anchor !== undefined) anchors.set(file, buffer.includes(anchor[1]));
  }
  return { root, walk, judged, read, findings, anchorsWalked: WALK_ANCHORS.every(([path]) => anchors.get(path) === true) };
}
function present(path: string): boolean {
  try {
    lstatSync(path);
    return true;
  } catch {
    return false;
  }
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
const srcModulesOf = (root: string): string[] => filesBelow(join(root, "src")).filter(file => file.endsWith(".ts")).sort();
function fold(node: ts.Node | undefined): string | undefined {
  if (node === undefined) return undefined;
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return fold(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = fold(node.left);
    const right = fold(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let folded = node.head.text;
    for (const span of node.templateSpans) {
      const value = fold(span.expression);
      if (value === undefined) return undefined;
      folded += value + span.literal.text;
    }
    return folded;
  }
  return undefined;
}
const parse = (fileName: string, source: string): ts.SourceFile => ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
interface LaunchScan {
  readonly file: string;
  readonly rf: string[];
  readonly composed: string[];
  readonly unbound: string[];
  readonly commands: string[];
}
function launchesOf(fileName: string, source: string): LaunchScan {
  const file = parse(fileName, source);
  const bound = new Map<string, string>();
  const namespaces = new Set<string>();
  const isChildProcess = (node: ts.Node | undefined): boolean => node !== undefined && ts.isStringLiteralLike(node) && CHILD_PROCESS.test(node.text);
  const requiresChildProcess = (node: ts.Node | undefined): boolean =>
    node !== undefined && ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "require" && isChildProcess(node.arguments[0]);
  /** U2: transparent load-expression wrappers, recursively peeled in any order. */
  const bare = (node: ts.Node | undefined): ts.Node | undefined => {
    let current = node;
    while (current !== undefined && (ts.isParenthesizedExpression(current) || ts.isAwaitExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isNonNullExpression(current) || ts.isTypeAssertionExpression(current))) current = current.expression;
    return current;
  };
  const importsChildProcess = (node: ts.Node | undefined): boolean => {
    const call = bare(node);
    return call !== undefined && ts.isCallExpression(call) && call.expression.kind === ts.SyntaxKind.ImportKeyword && isChildProcess(call.arguments[0]);
  };
  /** A require or a dynamic import of child_process (wb-khhg F3: the dynamic import was the escaping form G20). */
  const loadsChildProcess = (node: ts.Node | undefined): boolean => requiresChildProcess(bare(node)) || importsChildProcess(node);
  const bind = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && isChildProcess(node.moduleSpecifier) && node.importClause !== undefined) {
      const clause = node.importClause;
      if (clause.name !== undefined) namespaces.add(clause.name.text);
      const named = clause.namedBindings;
      if (named !== undefined && ts.isNamespaceImport(named)) namespaces.add(named.name.text);
      if (named !== undefined && ts.isNamedImports(named)) {
        for (const element of named.elements) {
          const imported = (element.propertyName ?? element.name).text;
          if (LAUNCHERS.includes(imported)) bound.set(element.name.text, imported);
        }
      }
    }
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && isChildProcess(node.moduleReference.expression)) namespaces.add(node.name.text);
    if (ts.isVariableDeclaration(node) && loadsChildProcess(node.initializer)) {
      if (ts.isIdentifier(node.name)) namespaces.add(node.name.text);
      else if (ts.isObjectBindingPattern(node.name)) {
        for (const element of node.name.elements) {
          if (!ts.isIdentifier(element.name)) continue;
          const property = element.propertyName;
          const imported = property === undefined ? element.name.text : ts.isIdentifier(property) || ts.isStringLiteral(property) ? property.text : "";
          if (LAUNCHERS.includes(imported)) bound.set(element.name.text, imported);
        }
      }
    }
    ts.forEachChild(node, bind);
  };
  bind(file);
  const rf: string[] = [];
  const composed: string[] = [];
  const unbound: string[] = [];
  const commands: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      let launcher: string | undefined;
      if (ts.isIdentifier(callee) && bound.has(callee.text)) launcher = bound.get(callee.text);
      else if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) && namespaces.has(callee.expression.text) && LAUNCHERS.includes(callee.name.text)) launcher = callee.name.text;
      else if (ts.isPropertyAccessExpression(callee) && loadsChildProcess(callee.expression) && LAUNCHERS.includes(callee.name.text)) launcher = callee.name.text;
      else if (ts.isIdentifier(callee) && LAUNCHERS.includes(callee.text)) unbound.push(`${fileName}:${callee.text}`);
      if (launcher !== undefined) {
        const first = node.arguments[0];
        const command = fold(first);
        if (command === undefined) composed.push(`${fileName}:${launcher}(${first === undefined ? "" : first.getText(file)})`);
        else {
          commands.push(command);
          if (command.split("/").pop() === "rf") rf.push(`${fileName}:${launcher}`);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { file: fileName, rf, composed, unbound, commands };
}
interface VerbScan {
  readonly file: string;
  readonly argv: string[];
  readonly flags: string[];
  readonly literals: string[];
  readonly renderArgv: number;
  readonly composedArgv: number;
}
function sessionVerbsOf(fileName: string, source: string): VerbScan {
  const file = parse(fileName, source);
  const argv: string[] = [];
  const flags: string[] = [];
  const literals: string[] = [];
  let renderArgv = 0;
  let composedArgv = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const words = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : null));
      words.forEach((word, index) => {
        const next = words[index + 1];
        if (word === "context" && next === "render") renderArgv += 1;
        if (word === "session" && index + 1 < words.length) {
          if (next === null) composedArgv += 1;
          else if (next !== undefined && SESSION_VERBS.includes(next)) argv.push(`${fileName}: [${words.map(item => item ?? "<expr>").join(", ")}]`);
        }
        if (word !== null && (word === "--session" || word.startsWith("--session="))) flags.push(`${fileName}: ${word}`);
      });
    }
    if (ts.isStringLiteralLike(node) && (SESSION_VERB_TEXT.test(node.text) || SESSION_FLAG_TEXT.test(node.text))) literals.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" ");
      if (SESSION_VERB_TEXT.test(parts) || SESSION_FLAG_TEXT.test(parts)) literals.push(`${fileName}: ${parts}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { file: fileName, argv, flags, literals, renderArgv, composedArgv };
}
interface StateScan {
  readonly file: string;
  readonly identifiers: string[];
  readonly literals: string[];
}
function sessionStateOf(fileName: string, source: string): StateScan {
  const file = parse(fileName, source);
  const identifiers: string[] = [];
  const literals: string[] = [];
  const visit = (node: ts.Node): void => {
    if ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && wordsOf(node.text).some(word => SESSION_WORDS.includes(word))) identifiers.push(`${fileName}: ${node.text}`);
    if ((ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) && SESSION_FIELD_TEXT.test(node.text)) literals.push(`${fileName}: ${node.text}`);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const folded = fold(node);
      if (folded !== undefined && SESSION_FIELD_TEXT.test(folded)) literals.push(`${fileName}: ${folded}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { file: fileName, identifiers, literals };
}
interface LaunchInventory {
  readonly root: string;
  readonly scans: readonly LaunchScan[];
  readonly rf: string[];
  readonly composed: string[];
  readonly unbound: string[];
}
function launchInventory(root: string): LaunchInventory {
  const scans = srcModulesOf(root).map(path => launchesOf(posix(relative(root, path)), textOf(path)));
  return {
    root,
    scans,
    rf: scans.flatMap(scan => scan.rf).sort(),
    composed: scans.flatMap(scan => scan.composed).sort(),
    unbound: scans.flatMap(scan => scan.unbound).sort(),
  };
}
interface VerbLists {
  readonly argv: string[];
  readonly flags: string[];
  readonly literals: string[];
  readonly renderArgv: string[];
  readonly composedArgv: string[];
}
function verbLists(scans: readonly VerbScan[]): VerbLists {
  const marks = (count: (scan: VerbScan) => number, mark: string): string[] => scans.flatMap(scan => Array.from({ length: count(scan) }, () => `${scan.file}: ${mark}`));
  return {
    argv: scans.flatMap(scan => scan.argv),
    flags: scans.flatMap(scan => scan.flags),
    literals: scans.flatMap(scan => scan.literals),
    renderArgv: marks(scan => scan.renderArgv, "context render"),
    composedArgv: marks(scan => scan.composedArgv, "session <expr>"),
  };
}
interface VerbInventory extends VerbLists {
  readonly root: string;
  readonly scans: readonly VerbScan[];
}
function verbInventory(root: string): VerbInventory {
  const scans = srcModulesOf(root).map(path => sessionVerbsOf(posix(relative(root, path)), textOf(path)));
  return { root, scans, ...verbLists(scans) };
}
interface StateInventory {
  readonly root: string;
  readonly scans: readonly StateScan[];
  readonly identifiers: string[];
  readonly literals: string[];
}
function stateInventory(root: string, modules: readonly string[]): StateInventory {
  const scans = modules.map(module => sessionStateOf(module, textOf(join(root, module))));
  return { root, scans, identifiers: scans.flatMap(scan => scan.identifiers), literals: scans.flatMap(scan => scan.literals) };
}
function descriptorJudgeOf(descriptorsRead: string[]): (entries: readonly { readonly id: string }[]) => string[] {
    const descriptorJudge = (entries: readonly { readonly id: string }[]): string[] => entries
      .filter(descriptor => {
        descriptorsRead.push(descriptor.id);
        return SESSION_VERB_TEXT.test(JSON.stringify(descriptor)) || SESSION_FLAG_TEXT.test(JSON.stringify(descriptor));
      })
      .map(descriptor => descriptor.id);
  return descriptorJudge;
}

export type { LaunchInventory, LaunchScan, StateInventory, StateScan, TreeReading, VerbInventory, VerbLists, VerbScan, Walk };
export { AUTO_WORDS, CHILD_PROCESS, DEFAULT_IGNORABLE, descriptorJudgeOf, END_WORDS, EXEMPT, EXPIRY_PAIRS, EXPIRY_WORDS, expiryAt, expiryFindings, filesBelow, fold, INTRAWORD_EMPHASIS, LAUNCHERS, launchesOf, launchInventory, NEGATORS, parse, posix, present, RF_WORDS, ROSTER_FILE, readTree, rendered, rfAt, SELF, SENTENCE_BREAK, SESSION_FIELD_TEXT, SESSION_FLAG_TEXT, SESSION_VERB_TEXT, SESSION_VERBS, SESSION_WORDS, SKIPPED_ROOTS, sentenceFindings, sessionStateOf, sessionVerbsOf, srcModulesOf, stateInventory, textOf, verbInventory, verbLists, WALK_ANCHORS, WINDOWS, walkTree, wordsOf };
