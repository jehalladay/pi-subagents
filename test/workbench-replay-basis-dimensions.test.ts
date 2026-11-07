/**
 * wb-413a [MWI-replay], the Phase 10 delta (the bead's amendment of 2026-11-07T07:06Z; program
 * mechanical-interoperability-audit-2026-11-06, slice PI-4): the replay basis dimensions, EAT-R161 and EAT-R162 as
 * docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md
 * writes them at pi-subagents master b8cd53aa. The acceptance lines this suite pins, verbatim:
 *  - EAT-R161 "The specification (path named in the receipt) lists each dimension with its measurement source and owner;
 *    a test enumerates the Claude host's recorded basis keys and asserts set-equality with the specification's Pi-side
 *    list; a dimension present in the specification but absent from the recorded basis fails; 'effect references' is
 *    either recorded or explicitly deferred with a dated reason in the specification." (adversarial mutant: "Drop
 *    'effect references' from the recorded basis while the specification lists it; the set-equality assertion fails.")
 *  - EAT-R162 "A census test tokenizes the runtime.ts (and journal.ts) replayBasis doc-comment dimension list and the
 *    recorded dimensions of each registered host (the claude-host.ts literal; the local-detached.ts identityDigest keys)
 *    and asserts: every unqualified comment dimension is recorded by every host, every host-specific dimension carries
 *    its host name, and every Claude-host dimension is named; at the pin the test is red ('provider manifest' unqualified
 *    while the Claude host records no provider version; `settings` and `principal` unnamed); after EAT-R017-R019 the
 *    lists grow together." (adversarial mutant: "Keep 'provider manifest' unqualified while the Claude host records no
 *    provider version (or drop `settings` from the comment); the census fails.")
 *
 * Claimed here, each by its rows, and nothing wider:
 *  - EAT-R161, the specification docs/workbench/replay-basis-dimensions.md. Its table is written out (RB-SPEC-SHAPE).
 *    Each dimension the page's quote of the statement names is the dimension of exactly one row, each name of the page's
 *    quote of the conditions' MW half is the dimension or the measurement source of exactly one row, and every row's
 *    dimension is one of those names (RB-SPEC-QUOTE). The rows marked as in the Claude host's basis are, in table order, the
 *    option keys a Claude host built with a distinct value for each of its eight policy options and with replay
 *    dependencies holds in its basis, in basis order, and as a set the same keys, so a marked row the basis does not
 *    hold, or a held key no row marks, reds (RB-SPEC-KEYS); built without replay dependencies the host holds the first
 *    eight marked keys alone (RB-SPEC-KEYS-LEGACY). Each marked row names its option key in its measurement source, a
 *    reading's row the module's reader function too, and every row names Pi or MW as its owner (RB-SPEC-CELLS). The
 *    effect references row is not marked and is deferred with a past date and a reason (RB-SPEC-DEFERRED); the MW
 *    half's two names are rows owned by MW, not marked, owed on wb-1zn2 (RB-SPEC-MW-HALF).
 *  - EAT-R162, the WorkflowHost.replayBasis comment of src/workflow/runtime.ts and the WorkflowJournalEntry.basis comment
 *    of src/workflow/journal.ts. The hosts are the three exported src functions declared to return a WorkflowHost
 *    (RB-HOSTS); the Claude host records the eleven dimensions its claude-host.ts literal holds (RB-RECORDED-claude), the
 *    detached host the eight keys of its local-detached.ts identityDigest object (RB-RECORDED-detached), and the legacy
 *    host's returned object holds no replayBasis (RB-RECORDED-legacy). Each comment names, host by host, exactly those
 *    dimensions in that order, and the legacy host as recording none (RB-DOC-runtime, RB-DOC-journal); neither comment
 *    holds a phrase of the dimension table outside its host's list, nor anywhere one of the three dimensions EAT-R161
 *    names that no host records here (RB-UNQUALIFIED-runtime, RB-UNQUALIFIED-journal); the two comments name the same
 *    lists (RB-DOC-MIRROR); the dimension table, written out, is tied to the two hosts' source texts
 *    (RB-DIMENSIONS-SHAPE).
 * NOT CLAIMED by this suite: what the basis holds for a given option value (test/workbench-claude-replay-dependencies.test.ts
 * judges it); how a reading is measured (test/workbench-replay-dependency-readers.test.ts and
 * test/workbench-replay-dependencies-wiring.test.ts); the detached host's basis values; a WorkflowHost built anywhere but
 * those three functions; and a complete joint basis.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type ClaudeWorkflowHostOptions, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { type ClaudeReplayDependencies, instructionDependency, providerDependency, sourceDependency } from "../src/workbench/replay-dependencies.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SPEC = "docs/workbench/replay-basis-dimensions.md";
/** Every row here reads files or parses source text; each declares its own time budget (EAT-R168's form). */
const BUDGET = 30_000;

/* --- EAT-R161: the specification's table ---------------------------------------------------------------------- */

/** One row of the specification's Dimensions table, its cells as written (a basis key's backquotes dropped). */
interface SpecRow {
  readonly dimension: string;
  readonly key: string;
  readonly inBasis: string;
  readonly source: string;
  readonly owner: string;
  readonly status: string;
}
function specText(): string {
  return readFileSync(join(ROOT, SPEC), "utf8");
}
/** The rows of the table under the page's "## Dimensions" heading: every table line after its header and its rule. */
function specRows(): SpecRow[] {
  const lines = specText().split("\n");
  const header = lines.findIndex((line, index) => index > lines.indexOf("## Dimensions") && line.startsWith("| Dimension |"));
  const rows: SpecRow[] = [];
  for (const line of lines.slice(header + 2)) {
    if (!line.startsWith("|")) break;
    const [dimension = "", key = "", inBasis = "", source = "", owner = "", status = ""] = line.slice(1, -1).split("|").map(cell => cell.trim());
    rows.push({ dimension, key: key.replace(/^`|`$/g, ""), inBasis, source, owner, status });
  }
  return rows;
}
/** The dimensions the page's verbatim quote of the statement names: its parenthesized list, split at its semicolons and the existing ones' commas. */
function statementDimensions(): string[] {
  const list = /enumerating every bound dimension \(([^)]*)\)/.exec(specText())?.[1] ?? "";
  return list.split("; ").flatMap(part => (part.startsWith("and the existing ") ? part.slice("and the existing ".length).split(", ") : [part]));
}
/** The names of the MW half the page's verbatim quote of the conditions gives, before its semicolon. */
function mwHalf(): string[] {
  return (/MW's app-local half \(([^;]*);/.exec(specText())?.[1] ?? "").split(", ").filter(name => name !== "");
}

/** The Claude host's eight policy options, in the order its basis holds them. */
const POLICY_OPTIONS = ["cwd", "model", "permissionMode", "settingSources", "tools", "roles", "grants", "principal"] as const;
/** A distinct value for each policy option, so each element of the basis matches one option alone. */
const DISTINCT: ClaudeWorkflowHostOptions = {
  cwd: "/rb-spec/cwd",
  model: "rb-spec-model",
  permissionMode: "acceptEdits",
  settingSources: ["local"],
  tools: ["RbSpecTool"],
  roles: { "rb-spec-role": { prompt: "rb spec role" } },
  grants: ["rb-spec:grant"],
  principal: { id: "rb-spec-principal" },
};
const measured = (seed: string) => ({ state: "measured" as const, digest: `sha256:${seed.repeat(64).slice(0, 64)}` });
const READINGS: ClaudeReplayDependencies = { source: measured("a"), instructions: measured("b"), provider: measured("c") };
/** The reader of each reading the replay dependencies carry (src/workbench/replay-dependencies.ts). */
const READING_READERS: Readonly<Record<string, { readonly name: string }>> = {
  "replayDependencies.source": sourceDependency,
  "replayDependencies.instructions": instructionDependency,
  "replayDependencies.provider": providerDependency,
};

/**
 * The option key each element of a Claude host's basis holds, in basis order: a policy element by the option whose value
 * it equals, and the readings element by each of its keys whose reading equals the one handed. Anything else is read as
 * unmatched, so it never equals a key the table marks.
 */
function heldKeys(options: ClaudeWorkflowHostOptions): string[] {
  const basis = JSON.parse(createClaudeWorkflowHost(options).replayBasis ?? "[]") as unknown[];
  const readings: Record<string, unknown> = { ...options.replayDependencies };
  return basis.flatMap(element => {
    const option = POLICY_OPTIONS.find(key => options[key] !== undefined && JSON.stringify(options[key]) === JSON.stringify(element));
    if (option !== undefined) return [option];
    if (element !== null && typeof element === "object" && !Array.isArray(element)) {
      return Object.entries(element).map(([key, value]) => (JSON.stringify(value) === JSON.stringify(readings[key]) ? `replayDependencies.${key}` : `unmatched ${key}`));
    }
    return [`unmatched ${JSON.stringify(element)}`];
  });
}

describe("wb-413a EAT-R161: the Pi-side replay basis dimension list", () => {
  it("RB-SPEC-SHAPE: the specification's table, written out (frozen shape): each row's dimension, basis key, place in the Claude host's basis and owner", () => {
    expect(specRows().map(row => `${row.dimension}|${row.key}|${row.inBasis}|${row.owner}`)).toEqual([
      "cwd|cwd|yes|Pi",
      "model|model|yes|Pi",
      "permissionMode|permissionMode|yes|Pi",
      "settings|settingSources|yes|Pi",
      "tools|tools|yes|Pi",
      "roles|roles|yes|Pi",
      "grants|grants|yes|Pi",
      "principal|principal|yes|Pi",
      "source commit/tree and dirty-file digest|replayDependencies.source|yes|Pi",
      "skill/system-instruction bytes|replayDependencies.instructions|yes|Pi",
      "effective provider/SDK versions and settings|replayDependencies.provider|yes|Pi",
      "effect references|none|no|Pi",
      "gate-manifest digest|none|no|MW",
      "prompt/config digest|none|no|MW",
    ]);
  }, BUDGET);

  it("RB-SPEC-QUOTE: each dimension the page's quote of the statement names is one row's dimension, each name of its quote of the MW half one row's dimension or measurement source, and every row's dimension one of those names", () => {
    const rows = specRows();
    const statement = statementDimensions();
    expect(statement).toEqual([
      "source commit/tree and dirty-file digest",
      "skill/system-instruction bytes",
      "effective provider/SDK versions and settings",
      "gate-manifest digest",
      "effect references",
      "cwd",
      "model",
      "permissionMode",
      "settings",
      "tools",
      "roles",
      "grants",
      "principal",
    ]);
    expect(mwHalf()).toEqual(["prompt/config digest", "Forge-manifest digest"]);
    for (const dimension of statement) expect(rows.filter(row => row.dimension === dimension), dimension).toHaveLength(1);
    // A name of the MW half is its row's dimension or is named by its row's measurement source.
    for (const name of mwHalf()) expect(rows.filter(row => row.dimension === name || row.source.includes(name)), name).toHaveLength(1);
    for (const row of rows) expect(statement.includes(row.dimension) || mwHalf().includes(row.dimension), row.dimension).toBe(true);
  }, BUDGET);

  it("RB-SPEC-KEYS: the rows marked in the Claude host's basis are, in table order and as a set, the keys a host built with distinct policy values and replay dependencies holds in its basis", () => {
    const marked = specRows().filter(row => row.inBasis === "yes").map(row => row.key);
    const held = heldKeys({ ...DISTINCT, replayDependencies: READINGS });
    expect(marked).toEqual(held);
    expect(new Set(marked)).toEqual(new Set(held));
    // Every row is marked yes or no: no third value hides a row from the comparison.
    for (const row of specRows()) expect(["yes", "no"], row.dimension).toContain(row.inBasis);
  }, BUDGET);

  it("RB-SPEC-KEYS-LEGACY: built without replay dependencies, the host's basis holds the first eight marked keys alone", () => {
    const marked = specRows().filter(row => row.inBasis === "yes").map(row => row.key);
    expect(heldKeys(DISTINCT)).toEqual(marked.slice(0, 8));
    expect(marked.slice(8)).toEqual(Object.keys(READING_READERS));
  }, BUDGET);

  it("RB-SPEC-CELLS: each marked row names its option key as a host option in its measurement source, a reading's row its reader, and every row names its owner", () => {
    for (const row of specRows()) {
      expect(row.source, row.dimension).not.toBe("");
      expect(["Pi", "MW"], row.dimension).toContain(row.owner);
      if (row.inBasis !== "yes") continue;
      expect(row.source, row.dimension).toContain(`the host option \`${row.key}\``);
      const reader = READING_READERS[row.key];
      if (reader !== undefined) expect(row.source.startsWith(`\`${reader.name}\` `), `${row.dimension}: ${reader.name}`).toBe(true);
    }
  }, BUDGET);

  it("RB-SPEC-DEFERRED: effect references are not marked in the Claude host's basis and are deferred with a past date and a reason", () => {
    const rows = specRows().filter(row => row.dimension === "effect references");
    expect(rows).toHaveLength(1);
    expect(rows[0]?.inBasis).toBe("no");
    const deferred = /^deferred (\d{4}-\d{2}-\d{2}): (\S.*)$/.exec(rows[0]?.status ?? "");
    expect(deferred, rows[0]?.status).not.toBeNull();
    const date = Date.parse(`${deferred?.[1]}T00:00:00Z`);
    expect(Number.isFinite(date) && date <= Date.now(), deferred?.[1]).toBe(true);
  }, BUDGET);

  it("RB-SPEC-MW-HALF: each name of the quoted MW half is a row owned by MW, not marked in the Claude host's basis, and owed on wb-1zn2", () => {
    expect(mwHalf()).toHaveLength(2);
    for (const name of mwHalf()) {
      const rows = specRows().filter(row => row.dimension === name || row.source.includes(name));
      expect(rows, name).toHaveLength(1);
      expect(rows[0], name).toMatchObject({ owner: "MW", inBasis: "no" });
      expect(rows[0]?.status, name).toMatch(/^owed on wb-1zn2 /);
    }
  }, BUDGET);
});

/* --- EAT-R162: the replayBasis comments and the hosts' recorded dimensions -------------------------------------- */

type Host = "Claude" | "detached";
/** [host, the dimension as its source text records it, the phrase the comments name it by]. */
const DIMENSIONS: readonly (readonly [Host, string, string])[] = [
  ["Claude", "cwd", "cwd"],
  ["Claude", "model", "model pin"],
  ["Claude", "permissionMode", "permission mode"],
  ["Claude", "settings", "setting sources"],
  ["Claude", "tools", "tools"],
  ["Claude", "roles", "roles"],
  ["Claude", "grants", "grants"],
  ["Claude", "principal", "principal"],
  ["Claude", "source", "source reading"],
  ["Claude", "instructions", "instruction reading"],
  ["Claude", "provider", "provider reading"],
  ["detached", "contract", "contract"],
  ["detached", "backend", "backend"],
  ["detached", "workspace", "workspace"],
  ["detached", "principal", "principal"],
  ["detached", "grants", "grants"],
  ["detached", "manifest", "provider manifest"],
  ["detached", "localProvider", "local provider"],
  ["detached", "host", "inner host basis"],
];
/** Three dimensions EAT-R161 names that no host records here: a comment naming one would claim a dimension no host has. */
const UNRECORDED = ["effect references", "gate-manifest digest", "prompt/config digest"] as const;
const recordedBy = (host: Host): string[] => DIMENSIONS.filter(([owner]) => owner === host).map(([, recorded]) => recorded);
const phrasesOf = (host: Host): string[] => DIMENSIONS.filter(([owner]) => owner === host).map(([, , phrase]) => phrase);

function sourceFile(path: string): ts.SourceFile {
  return ts.createSourceFile(path, readFileSync(join(ROOT, path), "utf8"), ts.ScriptTarget.Latest, true);
}
function nodesOf<T extends ts.Node>(root: ts.Node, test: (node: ts.Node) => node is T): T[] {
  const found: T[] = [];
  const visit = (node: ts.Node): void => {
    if (test(node)) found.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}
/** A basis element's dimensions: a property read or a name by itself, the left of `?? null`, a spread's object keys. */
function dimensionsOf(element: ts.Expression): string[] {
  if (ts.isSpreadElement(element)) {
    return nodesOf(element, ts.isObjectLiteralExpression).flatMap(object => object.properties.map(property => property.name?.getText() ?? `unread ${property.getText()}`));
  }
  if (ts.isBinaryExpression(element) && element.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) return dimensionsOf(element.left);
  if (ts.isPropertyAccessExpression(element)) return [element.name.text];
  if (ts.isIdentifier(element)) return [element.text];
  return [`unread ${element.getText()}`];
}
/** The dimensions the claude-host.ts literal records: the elements of the array its replayBasis JSON.stringify call writes. */
function claudeRecorded(): string[] {
  const declarations = nodesOf(sourceFile("src/workbench/claude-host.ts"), (node): node is ts.VariableDeclaration => ts.isVariableDeclaration(node) && node.name.getText() === "replayBasis");
  expect(declarations).toHaveLength(1);
  const call = declarations[0]?.initializer;
  if (call === undefined || !ts.isCallExpression(call) || call.expression.getText() !== "JSON.stringify") throw new Error("claude-host.ts: replayBasis is no JSON.stringify call");
  const array = call.arguments[0];
  if (array === undefined || !ts.isArrayLiteralExpression(array)) throw new Error("claude-host.ts: replayBasis stringifies no array literal");
  return array.elements.flatMap(dimensionsOf);
}
/** The dimensions the detached host records: the keys of the object its replayBasis identityDigest call digests. */
function detachedRecorded(): string[] {
  const assignments = nodesOf(sourceFile("src/workbench/hosts/local-detached.ts"), (node): node is ts.PropertyAssignment => ts.isPropertyAssignment(node) && node.name.getText() === "replayBasis");
  expect(assignments).toHaveLength(1);
  const call = assignments[0]?.initializer;
  if (call === undefined || !ts.isCallExpression(call) || call.expression.getText() !== "identityDigest") throw new Error("local-detached.ts: replayBasis is no identityDigest call");
  const object = call.arguments[1];
  if (object === undefined || !ts.isObjectLiteralExpression(object)) throw new Error("local-detached.ts: replayBasis digests no object literal");
  return object.properties.map(property => property.name?.getText() ?? `unread ${property.getText()}`);
}
/** The property names of each object literal createWorkflowHost's body returns directly. */
function legacyReturned(): string[][] {
  const declaration = nodesOf(sourceFile("src/workflow/host.ts"), (node): node is ts.FunctionDeclaration => ts.isFunctionDeclaration(node) && node.name?.text === "createWorkflowHost")[0];
  const statements: readonly ts.Statement[] = declaration?.body?.statements ?? [];
  return statements
    .filter((statement): statement is ts.ReturnStatement => ts.isReturnStatement(statement))
    .flatMap(statement => (statement.expression !== undefined && ts.isObjectLiteralExpression(statement.expression) ? [statement.expression] : []))
    .map(object => object.properties.map(property => property.name?.getText() ?? `unread ${property.getText()}`));
}
/** Each exported function below src declared to return a WorkflowHost, as a declaration or as a const's arrow or function, by path#name. */
function hostConstructors(): string[] {
  const found: string[] = [];
  const exported = (node: ts.Node): boolean => ts.canHaveModifiers(node) && (ts.getModifiers(node)?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false);
  const walk = (dir: string): void => {
    for (const entry of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith(".ts") && readFileSync(join(ROOT, path), "utf8").includes("WorkflowHost")) {
        const file = sourceFile(path);
        for (const declaration of nodesOf(file, ts.isFunctionDeclaration)) {
          if (exported(declaration) && declaration.type?.getText() === "WorkflowHost") found.push(`${path}#${declaration.name?.text}`);
        }
        for (const statement of file.statements.filter((candidate): candidate is ts.VariableStatement => ts.isVariableStatement(candidate) && exported(candidate))) {
          for (const variable of statement.declarationList.declarations) {
            const value = variable.initializer;
            if (value !== undefined && (ts.isArrowFunction(value) || ts.isFunctionExpression(value)) && value.type?.getText() === "WorkflowHost") found.push(`${path}#${variable.name.getText()}`);
          }
        }
      }
    }
  };
  walk("src");
  return found.sort();
}
/** The doc comment of one interface member, its lines joined: the leading `*` of each line and the delimiters dropped. */
function memberComment(path: string, interfaceName: string, member: string): string {
  const file = sourceFile(path);
  const declaration = nodesOf(file, (node): node is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(node) && node.name.text === interfaceName)[0];
  const property = declaration?.members.find(candidate => candidate.name?.getText() === member);
  if (property === undefined) throw new Error(`${path}: no ${interfaceName}.${member}`);
  const range = (ts.getLeadingCommentRanges(file.text, property.getFullStart()) ?? []).at(-1);
  if (range === undefined) throw new Error(`${path}: ${interfaceName}.${member} has no comment`);
  return file.text
    .slice(range.pos, range.end)
    .replace(/^\/\*\*|\*\/$/g, "")
    .split("\n")
    .map(line => line.replace(/^\s*\* ?/, ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
/** One host's list in a comment: the host's name and the dimensions it names (none for "records none"). */
interface HostList {
  readonly host: string;
  readonly named: readonly string[];
}
/**
 * A comment's host lists, each "the <host> host records: <list>;" (or "." at its end), its parenthesized notes dropped
 * and its list split at commas, or "the <host> host records none;", and the comment's text outside them.
 */
function hostLists(comment: string): { lists: HostList[]; outside: string } {
  const lists: HostList[] = [];
  const outside = comment.replace(/the (\w+) host records(?:: ([^;.]*)| none)[;.]/g, (_whole, host: string, list: string | undefined) => {
    lists.push({ host, named: (list ?? "").replace(/\([^)]*\)/g, "").split(",").map(name => name.trim()).filter(name => name !== "") });
    return " ";
  });
  return { lists, outside };
}
const COMMENTS: readonly (readonly [string, string, string, string])[] = [
  ["runtime", "src/workflow/runtime.ts", "WorkflowHost", "replayBasis"],
  ["journal", "src/workflow/journal.ts", "WorkflowJournalEntry", "basis"],
];

describe("wb-413a EAT-R162: the replayBasis comments name only what each host records, host by host", () => {
  it("RB-HOSTS: the exported src functions declared to return a WorkflowHost are the legacy, the Claude and the detached host constructors", () => {
    expect(hostConstructors()).toEqual(["src/workbench/claude-host.ts#createClaudeWorkflowHost", "src/workbench/hosts/local-detached.ts#createDetachedWorkflowHost", "src/workflow/host.ts#createWorkflowHost"]);
  }, BUDGET);

  it("RB-RECORDED-claude: the Claude host records the dimensions its claude-host.ts literal holds, the readings' three keys last", () => {
    expect(claudeRecorded()).toEqual(recordedBy("Claude"));
  }, BUDGET);

  it("RB-RECORDED-detached: the detached host records the keys of the object its local-detached.ts identityDigest call digests", () => {
    expect(detachedRecorded()).toEqual(recordedBy("detached"));
  }, BUDGET);

  it("RB-RECORDED-legacy: the one object createWorkflowHost returns holds replaySafe and no replayBasis", () => {
    const returned = legacyReturned();
    expect(returned).toHaveLength(1);
    expect(returned[0]).toContain("replaySafe");
    expect(returned[0]).not.toContain("replayBasis");
  }, BUDGET);

  for (const [name, path, interfaceName, member] of COMMENTS) {
    it(`RB-DOC-${name}: ${path}'s ${interfaceName}.${member} comment names, host by host, exactly the dimensions each host records, and the legacy host as recording none`, () => {
      const { lists } = hostLists(memberComment(path, interfaceName, member));
      expect(lists.map(list => list.host)).toEqual(["Claude", "detached", "legacy"]);
      expect(lists[0]?.named).toEqual(phrasesOf("Claude"));
      expect(lists[1]?.named).toEqual(phrasesOf("detached"));
      expect(lists[2]?.named).toEqual([]);
    }, BUDGET);

    it(`RB-UNQUALIFIED-${name}: ${path}'s ${interfaceName}.${member} comment holds no phrase of the dimension table outside its host's list, and nowhere one of the three EAT-R161 dimensions no host records`, () => {
      const comment = memberComment(path, interfaceName, member);
      const outside = hostLists(comment).outside.toLowerCase();
      const phrases = [...new Set(DIMENSIONS.map(([, , phrase]) => phrase))];
      expect(phrases.filter(phrase => new RegExp(`(^|[^a-z])${phrase}([^a-z]|$)`).test(outside))).toEqual([]);
      expect(UNRECORDED.filter(phrase => comment.toLowerCase().includes(phrase))).toEqual([]);
    }, BUDGET);
  }

  it("RB-DOC-MIRROR: the journal.ts comment names the same host lists as the runtime.ts comment", () => {
    const [runtime, journal] = COMMENTS.map(([, path, interfaceName, member]) => hostLists(memberComment(path, interfaceName, member)).lists);
    expect(journal).toEqual(runtime);
  }, BUDGET);

  it("RB-DIMENSIONS-SHAPE: the dimension table, written out (frozen shape), is each host's recorded dimensions as its source text holds them, each with its phrase", () => {
    expect(DIMENSIONS.map(([host, recorded, phrase]) => `${host}|${recorded}|${phrase}`)).toEqual([
      "Claude|cwd|cwd",
      "Claude|model|model pin",
      "Claude|permissionMode|permission mode",
      "Claude|settings|setting sources",
      "Claude|tools|tools",
      "Claude|roles|roles",
      "Claude|grants|grants",
      "Claude|principal|principal",
      "Claude|source|source reading",
      "Claude|instructions|instruction reading",
      "Claude|provider|provider reading",
      "detached|contract|contract",
      "detached|backend|backend",
      "detached|workspace|workspace",
      "detached|principal|principal",
      "detached|grants|grants",
      "detached|manifest|provider manifest",
      "detached|localProvider|local provider",
      "detached|host|inner host basis",
    ]);
    // Anchored outside the literal above: the two hosts' source texts.
    expect(recordedBy("Claude")).toEqual(claudeRecorded());
    expect(recordedBy("detached")).toEqual(detachedRecorded());
  }, BUDGET);
});
