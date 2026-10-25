/**
 * wb-gxd7.3 (GPC-FEEDBACK-CONTRACT-AUDIT-R3): the tables, the src scan, the reference join, the outcome judge and the recipe
 * drives behind test/workbench-gp-snapshot-join-census.test.ts. The rule, as the bead states it from GraphPolicyCLI
 * docs/programs/feedback-contract-audit-2026-10-21/02-contract-audit.md:26@0107c72992f3 (program status at 0107c72992f3:
 * "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics"): when Pi compares or joins its
 * exported snapshot against gp's `receipt.input_snapshot` or `graph_digest`, "it shall hash exactly the bytes it presented —
 * compact `JSON.stringify(graph)` for RPC, the file bytes for CLI — and shall never substitute `identities.graph` or
 * `canonical_digest` for that join key".
 *
 * Every export except srcFiles is pure (no clock, environment, process or filesystem); srcFiles reads only the tree it is
 * handed, and the census plants each WALKS tree on its own scratch. Every table is plain data, so ROWS (each row's id, label and the SHA-256 of each pin) is the same wherever this
 * module loads; test/fixtures/gp-snapshot-join-roster.json is the out-of-file anchor ROWS is judged against. Nothing here
 * starts gp or implements a Pi join site: the producer values are captures (CAPTURES, with the argv that produced each), and
 * a drive is a function the census hands a presentation.
 */
import { createHash } from "node:crypto";
import { readdirSync, realpathSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";

const sha256Hex = (data: Uint8Array | string): string => createHash("sha256").update(data).digest("hex");
const utf8 = (text: string): Uint8Array => Buffer.from(text, "utf8");

// ---- the src scan (the gate of the duty: no Pi module joins against a gp receipt today) ----

/** FIELD: a gp join-value field; IDENTITIES: gp's whole-document identity; PREFIX: gp's graph-identity spelling; SHARED: snapshotDigest. */
export type TouchKind = "FIELD" | "IDENTITIES" | "PREFIX" | "SHARED";

export interface Touch {
  readonly file: string;
  readonly line: number;
  readonly kind: TouchKind;
  /** The field name, identities.graph, or the prefix the code token carries. */
  readonly name: string;
  readonly text: string;
}

/** gp's join-value fields (eval receipt, decision receipt, inspect graph) and the camel-case mirrors a wrapper would give them. */
export const FIELD_NAMES = ["input_snapshot", "graph_digest", "canonical_digest", "inputSnapshot", "graphDigest", "canonicalDigest"] as const;
/** The name gp's journal and host observation records give the join value (and its snake-case mirror); Pi's detached host uses it for its own invocation snapshot. */
export const SHARED_NAMES = ["snapshotDigest", "snapshot_digest"] as const;
/** The spelling gp gives both its whole-document identity (identities.graph) and its projection identity (canonical_digest). */
export const PREFIX_TEXT = "graphpolicy.snapshot.c1";
const IDENTITIES_TEXT = ["identities.graph", "identities/graph"] as const;

const isWordChar = (char: string | undefined): boolean => char !== undefined && /[A-Za-z0-9_$]/.test(char);
/** Whether `word` stands in `text` as a whole word (no letter, digit, _ or $ on either side). */
function hasWord(text: string, word: string): boolean {
  for (let at = text.indexOf(word); at !== -1; at = text.indexOf(word, at + 1)) {
    if (!isWordChar(text[at - 1]) && !isWordChar(text[at + word.length])) return true;
  }
  return false;
}

function scriptKind(file: string): ts.ScriptKind {
  switch (extname(file).toLowerCase()) {
    case ".tsx":
      return ts.ScriptKind.TSX;
    case ".js":
    case ".mjs":
    case ".cjs":
      return ts.ScriptKind.JS;
    case ".jsx":
      return ts.ScriptKind.JSX;
    case ".json":
      return ts.ScriptKind.JSON;
    default:
      return ts.ScriptKind.TS;
  }
}

/** The member a node names when it is the `identities` object: identities, x.identities, x?.identities or x["identities"]. */
function isIdentities(node: ts.Expression): boolean {
  if (ts.isIdentifier(node)) return node.text === "identities";
  if (ts.isPropertyAccessExpression(node)) return node.name.text === "identities";
  if (ts.isElementAccessExpression(node)) return ts.isStringLiteralLike(node.argumentExpression) && node.argumentExpression.text === "identities";
  if (ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node)) return isIdentities(node.expression);
  return false;
}

/** The binding element names a destructured member by (its property name, else its own name). */
function bindingKey(element: ts.BindingElement): string | undefined {
  const key = element.propertyName ?? element.name;
  return ts.isIdentifier(key) || ts.isStringLiteralLike(key) ? key.text : undefined;
}

/** Every gp snapshot-join touch in one module's code: comments are not code and are never read. */
export function scanSource(file: string, text: string): Touch[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKind(file));
  const touches: Touch[] = [];
  const report = (node: ts.Node, kind: TouchKind, name: string, value: string): void => {
    touches.push({ file, line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1, kind, name, text: value });
  };
  /** A name in code: an identifier or a private name, exactly one of the field or shared names. */
  const named = (node: ts.Node, value: string): void => {
    for (const name of FIELD_NAMES) if (value === name) report(node, "FIELD", name, value);
    for (const name of SHARED_NAMES) if (value === name) report(node, "SHARED", name, value);
  };
  /** Text in code: a string, a template part or a regular expression body, read for each name as a whole word. */
  const textual = (node: ts.Node, value: string): void => {
    for (const name of FIELD_NAMES) if (hasWord(value, name)) report(node, "FIELD", name, value);
    for (const name of SHARED_NAMES) if (hasWord(value, name)) report(node, "SHARED", name, value);
    if (value.indexOf(PREFIX_TEXT) !== -1) report(node, "PREFIX", PREFIX_TEXT, value);
    if (IDENTITIES_TEXT.some(path => value.indexOf(path) !== -1)) report(node, "IDENTITIES", "identities.graph", value);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) named(node, node.text);
    else if (ts.isPrivateIdentifier(node)) named(node, node.text.slice(1));
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) textual(node, node.text);
    else if (node.kind === ts.SyntaxKind.RegularExpressionLiteral) {
      const body = node.getText(source);
      textual(node, body.slice(1, body.lastIndexOf("/")).replace(/\\(.)/g, "$1"));
    }
    if (ts.isPropertyAccessExpression(node) && node.name.text === "graph" && isIdentities(node.expression)) report(node, "IDENTITIES", "identities.graph", node.getText(source));
    if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression) && node.argumentExpression.text === "graph" && isIdentities(node.expression)) {
      report(node, "IDENTITIES", "identities.graph", node.getText(source));
    }
    if (ts.isBindingElement(node) && bindingKey(node) === "identities" && ts.isObjectBindingPattern(node.name)) {
      for (const inner of node.name.elements) if (bindingKey(inner) === "graph") report(inner, "IDENTITIES", "identities.graph", node.getText(source));
    }
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name) && node.initializer !== undefined && isIdentities(node.initializer)) {
      for (const inner of node.name.elements) if (bindingKey(inner) === "graph") report(inner, "IDENTITIES", "identities.graph", node.getText(source));
    }
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isObjectLiteralExpression(node.left) && isIdentities(node.right)) {
      for (const member of node.left.properties) {
        const key = ts.isShorthandPropertyAssignment(member) || ts.isPropertyAssignment(member) ? member.name : undefined;
        if (key !== undefined && (ts.isIdentifier(key) || ts.isStringLiteralLike(key)) && key.text === "graph") report(member, "IDENTITIES", "identities.graph", node.getText(source));
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return touches;
}

/**
 * Every regular file under `root`/`dir` (hidden, nested and extensionless paths included, symlinks followed, each real directory
 * walked once), as root-relative POSIX paths, each directory's names in sorted order and walked depth-first. Any other entry
 * fails closed. WALKS pins each of these on a synthetic tree.
 */
export function srcFiles(root: string, dir = "src"): string[] {
  const files: string[] = [];
  const walked = new Set<string>();
  const walk = (rel: string): void => {
    const real = realpathSync(join(root, rel));
    if (walked.has(real)) return;
    walked.add(real);
    for (const name of readdirSync(join(root, rel)).sort()) {
      const child = `${rel}/${name}`;
      const info = statSync(join(root, child));
      if (info.isDirectory()) walk(child);
      else if (info.isFile()) files.push(child);
      else throw new Error(`${child}: neither a regular file nor a directory under the scan root`);
    }
  };
  walk(dir);
  return files;
}

/** The names a module exports: exported function, class and variable declarations and export { a, b as c } lists. */
export function exportedNames(file: string, text: string): string[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, scriptKind(file));
  const names: string[] = [];
  const exported = (node: ts.Node): boolean => ts.canHaveModifiers(node) && (ts.getModifiers(node) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
  for (const statement of source.statements) {
    if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) && exported(statement) && statement.name !== undefined) names.push(statement.name.text);
    if (ts.isVariableStatement(statement) && exported(statement)) {
      for (const declaration of statement.declarationList.declarations) if (ts.isIdentifier(declaration.name)) names.push(declaration.name.text);
    }
    if (ts.isExportDeclaration(statement) && !statement.isTypeOnly && statement.exportClause !== undefined && ts.isNamedExports(statement.exportClause)) {
      for (const element of statement.exportClause.elements) names.push(element.name.text);
    }
  }
  return names;
}

// ---- the site registration (every touched module is a registered join site or a listed own use of the shared name) ----

/** A src module that joins a presented snapshot against a gp-written value, and the join function it exports. */
export interface SiteEntry {
  readonly file: string;
  readonly join: string;
}

/** A src module that uses the shared name for an identity of its own, never a gp join value; reviewed by name, with its reason. */
export interface NearName {
  readonly file: string;
  readonly name: string;
  readonly reason: string;
}

/** Pi's own uses of snapshotDigest today: the local-detached host's invocation snapshot, not a gp value. */
export const NEAR_NAMES: readonly NearName[] = [
  {
    file: "src/workbench/detached-observer.ts",
    name: "snapshotDigest",
    reason: "the detached receipt's own invocation snapshot digest, compared with the copy embedded at boot and reported as the source revision",
  },
  {
    file: "src/workbench/hosts/local-detached.ts",
    name: "snapshotDigest",
    reason: "the local-detached host's invocation snapshot digest (identityDigest over the invocation snapshot), written at boot and re-checked before control",
  },
];

/**
 * Judge the registration of a tree: each finding names its rule. S-UNREGISTERED (a touched module that is neither a registered
 * site nor a listed own use of the shared name - a FIELD, IDENTITIES or PREFIX touch is never listable), S-DUPLICATE, S-STALE
 * (a site with no touch), S-UNEXPORTED (a site that does not export its join), S-NEAR-NAME (a listed name that is not the
 * shared name), S-NEAR-REASON (a listing with no reason), S-STALE-NEAR (a listing whose module no longer carries the name).
 */
export function siteFindings(sites: readonly SiteEntry[], near: readonly NearName[], touches: readonly Touch[], texts: ReadonlyMap<string, string>): string[] {
  const findings: string[] = [];
  const registered = new Map<string, number>();
  for (const site of sites) registered.set(site.file, (registered.get(site.file) ?? 0) + 1);
  const listed = new Set(near.map(entry => `${entry.file}#${entry.name}`));
  const unregistered = new Map<string, Set<string>>();
  for (const touch of touches) {
    if (registered.has(touch.file)) continue;
    if (touch.kind === "SHARED" && listed.has(`${touch.file}#${touch.name}`)) continue;
    const names = unregistered.get(touch.file) ?? new Set<string>();
    names.add(`${touch.kind}:${touch.name}`);
    unregistered.set(touch.file, names);
  }
  for (const file of [...unregistered.keys()].sort()) {
    findings.push(`S-UNREGISTERED ${file} touches ${[...(unregistered.get(file) ?? [])].sort().join(", ")} with no JOIN_SITES registration`);
  }
  for (const [file, count] of registered) if (count > 1) findings.push(`S-DUPLICATE ${file} is registered ${count} times`);
  for (const site of sites) {
    if (!touches.some(touch => touch.file === site.file)) findings.push(`S-STALE ${site.file} is registered but carries no gp snapshot-join touch`);
    const text = texts.get(site.file);
    if (text === undefined || !exportedNames(site.file, text).some(name => name === site.join)) findings.push(`S-UNEXPORTED ${site.file} does not export its join ${site.join}`);
  }
  for (const entry of near) {
    if (!SHARED_NAMES.some(name => name === entry.name)) findings.push(`S-NEAR-NAME ${entry.file} lists ${entry.name}, which is not the shared name`);
    if (entry.reason.trim() === "") findings.push(`S-NEAR-REASON ${entry.file} lists ${entry.name} with no reason`);
    if (!touches.some(touch => touch.file === entry.file && touch.name === entry.name)) findings.push(`S-STALE-NEAR ${entry.file} no longer carries ${entry.name}`);
  }
  return findings;
}

// ---- the producer: what gp wrote for the vendored fixture graph, captured with the argv that produced it ----

/** The capture provenance: the installed gp named by source checkout and built-entry SHA-256, and the fixture blob. */
export const PRODUCER = {
  sourceSha: "3f7d52cd17397d8ed22e2c768714a057fe098b62",
  entry: "ts/dist/main.js",
  entrySha256: "0ad799c31da1dcd3ea3abf78bb099a407072c11ce63a76c2c6a1dd6b9ba52bd4",
  beadPin: "0107c72992f35cf6832a37615a25c7df45747ebc",
  fixturePath: "fixtures/conformance/host-adapter/snapshot.json",
  fixtureBlob: "127c80eb0f6cd8ff393d3e373a692eac3ad0fd17",
  fixtureBytes: 4784,
  capturedUtc: "2026-10-23T14:14:03Z",
} as const;

/** The program-bound checkpoint the fixture's theta derives (the producer's fixture.json digests.checkpoint). */
const CHECKPOINT = "graphpolicy.checkpoint.c1:c463f16949fe653b3b09eab84f2ef6f80a60f880d02e85a515a28f3f61ac080d";

/** The one-field non-ASCII variant: the extraction generator gains U+00E9, and digests.canonical carries the projection digest gp recomputes. */
export const VARIANT_EDITS: readonly { readonly path: readonly string[]; readonly value: string }[] = [
  { path: ["observation", "extraction", "generator"], value: `host-adapter-fixture-caf${String.fromCodePoint(0xe9)}` },
  { path: ["digests", "canonical"], value: "graphpolicy.snapshot.c1:93bb7b7943a63cc543347025bf654db19818a51b1d2690cb1a11351a729b8cef" },
];

/** The variant with its accent decomposed (e + U+0301, NFD): the same text once normalized, different bytes. */
export const DECOMPOSED_GENERATOR = `host-adapter-fixture-cafe${String.fromCodePoint(0x301)}`;

export type GraphName = "fixture" | "variant" | "variant-decomposed";
/** How Pi's RPC frame spelled the graph: compact, a space after every separator, or every non-ASCII unit as a JSON \u escape. */
export type Frame = "compact" | "spaced" | "ascii-escaped";
/**
 * file-bytes: SHA-256 of the vendored file; stringify / stringify-variant: SHA-256 of UTF-8 JSON.stringify; declared /
 * declared-variant: gp's projection identity, the value the snapshot itself declares in digests.canonical; c1: gp's whole-document
 * identity, which Pi cannot recompute.
 */
export type Recompute = "file-bytes" | "stringify" | "stringify-variant" | "declared" | "declared-variant" | "c1";

export interface CaptureRow {
  readonly id: string;
  readonly label: string;
  /** The command as run (<in>: the producer fixture directory at PRODUCER.sourceSha; <out>: this seat's derived files). */
  readonly argv: readonly string[];
  /** The RPC rows: the graph and frame of the one sample request after hello. */
  readonly frame?: { readonly graph: GraphName; readonly spelling: Frame };
  /** Where the value sits in gp's JSON output. */
  readonly path: string;
  readonly value: string;
  readonly recompute: Recompute;
}

const evalArgv = (graph: string): readonly string[] => ["gp", "eval", "--program", "<in>/program.json", "--theta", "<in>/theta.json", "--checkpoint", CHECKPOINT, "--graph", graph, "--candidates", "<in>/candidates.json", "--json"];
const RPC_ARGV = ["gp", "rpc", "--stdio"] as const;

export const CAPTURES: readonly CaptureRow[] = [
  {
    id: "P-EVAL-FILE",
    label: "gp eval over the fixture file: the runtime receipt's input_snapshot is SHA-256 of the file bytes",
    argv: evalArgv("<in>/snapshot.json"),
    path: "result.receipt.input_snapshot",
    value: "sha256:06d3bcbb80f339636874630a8ae6c259ad14fb2251d485b72b4e28b62022fa2d",
    recompute: "file-bytes",
  },
  {
    id: "P-SAMPLE-FILE",
    label: "gp sample over the fixture file, seed 11: the decision receipt's graph_digest is SHA-256 of the file bytes",
    argv: ["gp", "sample", "--program", "<in>/program.json", "--theta", "<in>/theta.json", "--checkpoint", CHECKPOINT, "--graph", "<in>/snapshot.json", "--candidates", "<in>/candidates.json", "--seed", "11", "--json"],
    path: "result.decision.graph_digest",
    value: "sha256:06d3bcbb80f339636874630a8ae6c259ad14fb2251d485b72b4e28b62022fa2d",
    recompute: "file-bytes",
  },
  {
    id: "P-EVAL-COMPACT-FILE",
    label: "gp eval over the fixture value written as JSON.stringify with no trailing newline: input_snapshot is SHA-256 of those bytes",
    argv: evalArgv("<out>/snapshot.compact.json"),
    path: "result.receipt.input_snapshot",
    value: "sha256:f6acb8ea80ddfc1a5f0e65236afe078432f2b7e207358542a8411ef28d0eaa90",
    recompute: "stringify",
  },
  {
    id: "P-RPC-COMPACT",
    label: "gp rpc sample, the fixture value in a compact frame: graph_digest is SHA-256 of UTF-8 JSON.stringify of the value",
    argv: RPC_ARGV,
    frame: { graph: "fixture", spelling: "compact" },
    path: "result.decision.graph_digest",
    value: "sha256:f6acb8ea80ddfc1a5f0e65236afe078432f2b7e207358542a8411ef28d0eaa90",
    recompute: "stringify",
  },
  {
    id: "P-RPC-SPACED",
    label: "gp rpc sample, the same value in a spaced frame: the frame's spelling does not move graph_digest",
    argv: RPC_ARGV,
    frame: { graph: "fixture", spelling: "spaced" },
    path: "result.decision.graph_digest",
    value: "sha256:f6acb8ea80ddfc1a5f0e65236afe078432f2b7e207358542a8411ef28d0eaa90",
    recompute: "stringify",
  },
  {
    id: "P-RPC-VARIANT",
    label: "gp rpc sample, the non-ASCII variant in a compact frame: graph_digest is SHA-256 of the UTF-8 bytes",
    argv: RPC_ARGV,
    frame: { graph: "variant", spelling: "compact" },
    path: "result.decision.graph_digest",
    value: "sha256:d2658daf992d330c0a6ec2046b51b1f363141b05578d8e3c4cf0f5fd7dc1ac74",
    recompute: "stringify-variant",
  },
  {
    id: "P-RPC-VARIANT-ESCAPED",
    label: "gp rpc sample, the non-ASCII variant in an ASCII-escaped frame: the escapes do not move graph_digest",
    argv: RPC_ARGV,
    frame: { graph: "variant", spelling: "ascii-escaped" },
    path: "result.decision.graph_digest",
    value: "sha256:d2658daf992d330c0a6ec2046b51b1f363141b05578d8e3c4cf0f5fd7dc1ac74",
    recompute: "stringify-variant",
  },
  {
    id: "P-GRAPH-CHECK",
    label: "gp graph check over the fixture: identities.graph, the whole-document c1 identity",
    argv: ["gp", "graph", "check", "--schema", "<in>/schema.json", "--graph", "<in>/snapshot.json", "--json"],
    path: "identities.graph",
    value: "graphpolicy.snapshot.c1:69ce84735635f9c2c96a8bc0f05fa7f407fc73d89b76b5d1163cace3a364266a",
    recompute: "c1",
  },
  {
    id: "P-INSPECT-GRAPH",
    label: "gp inspect graph over the fixture: canonical_digest, the projection c1 identity",
    argv: ["gp", "inspect", "graph", "--id", "<in>/snapshot.json", "--schema", "<in>/schema.json", "--json"],
    path: "result.canonical_digest",
    value: "graphpolicy.snapshot.c1:d821ba50282dee2e69381b6b089ce4eb2417d8836ec4a714ffbe92d107948b70",
    recompute: "declared",
  },
  {
    id: "P-GRAPH-CHECK-VARIANT",
    label: "gp graph check over the variant (written compact): identities.graph of the variant",
    argv: ["gp", "graph", "check", "--schema", "<in>/schema.json", "--graph", "<out>/snapshot.variant.json", "--json"],
    path: "identities.graph",
    value: "graphpolicy.snapshot.c1:8a8ce0ef18bc45ec0c8e48b77c94ce60d3dcace8a07bb75a0644813879de5b69",
    recompute: "c1",
  },
  {
    id: "P-INSPECT-GRAPH-VARIANT",
    label: "gp inspect graph over the variant: canonical_digest of the variant, the value its digests.canonical declares",
    argv: ["gp", "inspect", "graph", "--id", "<out>/snapshot.variant.json", "--schema", "<in>/schema.json", "--json"],
    path: "result.canonical_digest",
    value: "graphpolicy.snapshot.c1:93bb7b7943a63cc543347025bf654db19818a51b1d2690cb1a11351a729b8cef",
    recompute: "declared-variant",
  },
];

const captured = (id: string): string => {
  const row = CAPTURES.find(entry => entry.id === id);
  if (row === undefined) throw new Error(`no capture ${id}`);
  return row.value;
};

/** The vendored fixture: its bytes, its value and the variant value. */
export interface Fixture {
  readonly bytes: Uint8Array;
  readonly value: unknown;
  readonly variant: unknown;
  readonly decomposed: unknown;
}

/** A copy of the value with each edit applied in place (key order kept). */
function editedValue(text: string, edits: readonly { readonly path: readonly string[]; readonly value: string }[]): unknown {
  const value: unknown = JSON.parse(text);
  for (const edit of edits) {
    let target = value as Record<string, unknown>;
    for (const key of edit.path.slice(0, -1)) target = target[key] as Record<string, unknown>;
    target[edit.path[edit.path.length - 1] ?? ""] = edit.value;
  }
  return value;
}

/** The fixture behind the vendored bytes: the value, the variant (VARIANT_EDITS), and the variant with its accent decomposed. */
export function fixtureOf(bytes: Uint8Array): Fixture {
  const text = Buffer.from(bytes).toString("utf8");
  const decomposed = [{ path: VARIANT_EDITS[0]?.path ?? [], value: DECOMPOSED_GENERATOR }, ...VARIANT_EDITS.slice(1)];
  return { bytes, value: JSON.parse(text), variant: editedValue(text, VARIANT_EDITS), decomposed: editedValue(text, decomposed) };
}

/** The git blob id of bytes (what `git rev-parse <sha>:<path>` prints for a file with those contents). */
export const gitBlobId = (bytes: Uint8Array): string => createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");

/** Every UTF-16 unit above U+007F written as a JSON \u escape: the same JSON value in ASCII-only text. */
function asciiEscaped(text: string): string {
  let out = "";
  for (let at = 0; at < text.length; at++) {
    const unit = text.charCodeAt(at);
    out += unit > 0x7f ? `\\u${unit.toString(16).padStart(4, "0")}` : text.charAt(at);
  }
  return out;
}

/** The graph text a frame carries: compact, a space after every separator (structural whitespace only), or ASCII-escaped. */
export function frameSpelling(value: unknown, spelling: Frame): string {
  if (spelling === "spaced") return JSON.stringify(value, null, 2).replace(/\n */g, " ");
  if (spelling === "ascii-escaped") return asciiEscaped(JSON.stringify(value));
  return JSON.stringify(value);
}

// ---- the presentations a join site is handed, and the oracle ----

export type ProducerField = "input_snapshot" | "graph_digest";
/** A whitespace-only edit of the presented file bytes (acceptance (c)): the parsed value is unchanged, the bytes are not. */
export type WhitespaceEdit = "append-newline" | "strip-final-newline" | "crlf" | "tabs" | "space-after-first-colon";

export type PresentationSpec =
  | { readonly transport: "rpc"; readonly graph: GraphName; readonly frame: Frame }
  | { readonly transport: "cli"; readonly file: "fixture" | "compact"; readonly edit?: WhitespaceEdit };

/** The gp-written value a case joins against: a capture, or a form derived from the presented key (a substitution). */
export type ProducerSpec =
  | { readonly field: ProducerField; readonly capture: string }
  | { readonly field: ProducerField; readonly form: "relabelled" | "bare" | "uppercase" | "last-digit" | "padded" };

/** The other gp identities of the same graph the site holds (graph check and inspect graph). */
export interface Held {
  readonly "identities.graph": string;
  readonly canonical_digest: string;
}

/** What a join site is handed: what it presented to gp, the gp-written value, and the identities it holds. */
export type Presented =
  | { readonly transport: "rpc"; readonly graph: unknown; readonly spelled: string; readonly producer: { readonly field: ProducerField; readonly value: string }; readonly held: Held }
  | { readonly transport: "cli"; readonly file: Uint8Array; readonly producer: { readonly field: ProducerField; readonly value: string }; readonly held: Held };

/** The bytes Pi presented: rpc, UTF-8 of JSON.stringify of the value it sent; cli, the exact file bytes it handed gp. */
export const presentedBytes = (presented: Presented): Uint8Array => (presented.transport === "rpc" ? utf8(JSON.stringify(presented.graph)) : presented.file);
/** The join key over the bytes Pi presented, in gp's receipt spelling. */
export const presentedKey = (presented: Presented): string => `sha256:${sha256Hex(presentedBytes(presented))}`;

function edited(text: string, edit: WhitespaceEdit): string {
  switch (edit) {
    case "append-newline":
      return `${text}\n`;
    case "strip-final-newline":
      if (text.charAt(text.length - 1) !== "\n") throw new Error("strip-final-newline needs a text that ends with a newline");
      return text.slice(0, -1);
    case "crlf":
      return text.replace(/\n/g, "\r\n");
    case "tabs":
      return text.replace(/^(?: {2})+/gm, indent => "\t".repeat(indent.length / 2));
    case "space-after-first-colon": {
      const at = text.indexOf('":');
      if (at === -1) throw new Error("space-after-first-colon needs a member");
      return `${text.slice(0, at + 2)} ${text.slice(at + 2)}`;
    }
  }
}

/** The presented file text before its whitespace edit (cli cases). */
export const fileText = (fixture: Fixture, file: "fixture" | "compact"): string => (file === "fixture" ? Buffer.from(fixture.bytes).toString("utf8") : JSON.stringify(fixture.value));

/** One case's presentation, built from the vendored fixture. */
export function materialize(fixture: Fixture, spec: PresentationSpec, producer: ProducerSpec): Presented {
  const variant = spec.transport === "rpc" && spec.graph !== "fixture";
  // The decomposed spelling holds the variant's identities: the site joins it against the composed variant's decision.
  const held: Held = variant
    ? { "identities.graph": captured("P-GRAPH-CHECK-VARIANT"), canonical_digest: captured("P-INSPECT-GRAPH-VARIANT") }
    : { "identities.graph": captured("P-GRAPH-CHECK"), canonical_digest: captured("P-INSPECT-GRAPH") };
  const graph = spec.transport !== "rpc" ? undefined : spec.graph === "variant" ? fixture.variant : spec.graph === "variant-decomposed" ? fixture.decomposed : fixture.value;
  const base =
    spec.transport === "rpc"
      ? { transport: "rpc" as const, graph, spelled: frameSpelling(graph, spec.frame) }
      : { transport: "cli" as const, file: spec.edit === undefined && spec.file === "fixture" ? fixture.bytes : utf8(spec.edit === undefined ? fileText(fixture, spec.file) : edited(fileText(fixture, spec.file), spec.edit)) };
  const placeholder = { field: producer.field, value: "" };
  const hex = presentedKey(base.transport === "rpc" ? { ...base, producer: placeholder, held } : { ...base, producer: placeholder, held }).slice("sha256:".length);
  let value: string;
  if ("capture" in producer) value = captured(producer.capture);
  else if (producer.form === "relabelled") value = `${PREFIX_TEXT}:${hex}`;
  else if (producer.form === "bare") value = hex;
  else if (producer.form === "uppercase") value = `sha256:${hex.toUpperCase()}`;
  else if (producer.form === "last-digit") value = `sha256:${hex.slice(0, -1)}${hex.charAt(hex.length - 1) === "0" ? "1" : "0"}`;
  else value = `sha256:${hex} `;
  const given = { field: producer.field, value };
  return base.transport === "rpc" ? { ...base, producer: given, held } : { ...base, producer: given, held };
}

// ---- the judged outcome contract and its judge ----

/** The typed refusal code a join site reports when the gp-written value is not the key over the bytes it presented. */
export const MISMATCH = "snapshot-mismatch";

/**
 * Judge what a join site reported for one presentation (own keys only). The contract: `{joined: true, key}` when the gp-written
 * value is, whole-string, the key over the presented bytes; otherwise `{joined: false, code: "snapshot-mismatch", field, presented,
 * producer}` naming the producer's field, the key over the presented bytes and the producer's value verbatim. Each finding names
 * its rule: J-OUTCOME, J-KEY, J-SUBSTITUTE, J-SILENT-PASS, J-FALSE-REFUSAL, J-CODE, J-FIELD or J-ECHO.
 */
export function judgeOutcome(outcome: unknown, presented: Presented): string[] {
  if (typeof outcome !== "object" || outcome === null || Array.isArray(outcome)) {
    return [`J-OUTCOME the drive returned ${outcome === null ? "null" : Array.isArray(outcome) ? "an array" : typeof outcome}, not an outcome object`];
  }
  const own = (key: string): unknown => (Object.hasOwn(outcome, key) ? (outcome as Readonly<Record<string, unknown>>)[key] : undefined);
  const joined = own("joined");
  if (typeof joined !== "boolean") return [`J-OUTCOME joined is ${JSON.stringify(joined) ?? "absent"}, not a boolean`];
  const expected = presentedKey(presented);
  const match = presented.producer.value === expected;
  const key = joined ? own("key") : own("presented");
  const findings: string[] = [];
  if (key !== expected) findings.push(`J-KEY the ${joined ? "joined key" : "refusal's presented key"} ${JSON.stringify(key) ?? "absent"} is not ${expected}, the key over the presented bytes`);
  if (Object.values(presented.held).some(identity => identity === key)) findings.push(`J-SUBSTITUTE the key ${String(key)} is a held gp identity (identities.graph or canonical_digest), not the presented-bytes key`);
  if (joined && !match) findings.push(`J-SILENT-PASS joined although ${presented.producer.field} ${presented.producer.value} is not ${expected}`);
  if (!joined && match) findings.push(`J-FALSE-REFUSAL refused although ${presented.producer.field} is ${expected}`);
  if (!joined) {
    if (own("code") !== MISMATCH) findings.push(`J-CODE the refusal's code is ${JSON.stringify(own("code")) ?? "absent"}, not ${MISMATCH}`);
    if (own("field") !== presented.producer.field) findings.push(`J-FIELD the refusal names ${JSON.stringify(own("field")) ?? "no field"}, not ${presented.producer.field}`);
    if (own("producer") !== presented.producer.value) findings.push(`J-ECHO the refusal's producer value ${JSON.stringify(own("producer")) ?? "absent"} is not the producer's string verbatim`);
  }
  return findings;
}

/** The rule id each finding opens with. */
export const ruleOf = (finding: string): string => finding.split(" ", 1)[0] ?? "";

/** Run one drive on one presentation and judge its outcome; a drive that throws or rejects reports nothing (J-OUTCOME). */
export async function outcomeFindings(drive: (presented: Presented) => unknown, presented: Presented): Promise<string[]> {
  let outcome: unknown;
  try {
    outcome = await drive(presented);
  } catch (error) {
    return [`J-OUTCOME the drive threw: ${error instanceof Error ? error.message : String(error)}`];
  }
  return judgeOutcome(outcome, presented);
}

// ---- recipe drives: the reference join and its mutants, as data ----

export type KeyRecipe =
  | "presented"
  | "reparsed-compact"
  | "reparsed-pretty"
  | "frame-spelling"
  | "trimmed"
  | "line-endings-normalized"
  | "latin1"
  | "utf16le"
  | "ascii-escaped"
  | "nfc-normalized"
  | "held-identities-graph"
  | "held-canonical"
  | "bare-hex"
  | "trust-producer";
export type CompareRecipe = "whole-string" | "hex-suffix" | "case-folded" | "trimmed-producer" | "prefix-20" | "always" | "never";
export type RefusalEdit = { readonly op: "delete"; readonly key: string } | { readonly op: "set"; readonly key: string; readonly value: string } | { readonly op: "uppercase-echo" };
export type Behaviour = "outcome" | "throw" | "null" | "boolean";

export interface Recipe {
  readonly key: KeyRecipe;
  readonly compare: CompareRecipe;
  readonly refusal: readonly RefusalEdit[];
  readonly behaviour: Behaviour;
}

/** The conforming join: the key over the presented bytes, compared whole-string, refused typed. */
export const REFERENCE: Recipe = { key: "presented", compare: "whole-string", refusal: [], behaviour: "outcome" };

/** The presented text a recipe re-reads: rpc, JSON.stringify of the value sent; cli, the file bytes as UTF-8. */
const presentedText = (presented: Presented): string => (presented.transport === "rpc" ? JSON.stringify(presented.graph) : Buffer.from(presented.file).toString("utf8"));
const parsedValue = (presented: Presented): unknown => (presented.transport === "rpc" ? presented.graph : JSON.parse(presentedText(presented)));
const hexAfterColon = (value: string): string => value.split(":").pop() ?? value;

function recipeKey(recipe: KeyRecipe, presented: Presented): string {
  const hashed = (bytes: Uint8Array): string => `sha256:${sha256Hex(bytes)}`;
  switch (recipe) {
    case "presented":
      return presentedKey(presented);
    case "reparsed-compact":
      return hashed(utf8(JSON.stringify(parsedValue(presented))));
    case "reparsed-pretty":
      return hashed(utf8(JSON.stringify(parsedValue(presented), null, 2)));
    case "frame-spelling":
      return presented.transport === "rpc" ? hashed(utf8(presented.spelled)) : presentedKey(presented);
    case "trimmed":
      return hashed(utf8(presentedText(presented).trim()));
    case "line-endings-normalized":
      return hashed(utf8(presentedText(presented).replace(/\r\n/g, "\n")));
    case "latin1":
      return hashed(Buffer.from(presentedText(presented), "latin1"));
    case "utf16le":
      return hashed(Buffer.from(presentedText(presented), "utf16le"));
    case "ascii-escaped":
      return hashed(utf8(asciiEscaped(presentedText(presented))));
    case "nfc-normalized":
      return hashed(utf8(presentedText(presented).normalize("NFC")));
    case "held-identities-graph":
      return presented.held["identities.graph"];
    case "held-canonical":
      return presented.held.canonical_digest;
    case "bare-hex":
      return hexAfterColon(presentedKey(presented));
    case "trust-producer":
      return presented.producer.value;
  }
}

function recipeCompare(recipe: CompareRecipe, key: string, producer: string): boolean {
  switch (recipe) {
    case "whole-string":
      return key === producer;
    case "hex-suffix":
      return hexAfterColon(key) === hexAfterColon(producer);
    case "case-folded":
      return key.toLowerCase() === producer.toLowerCase();
    case "trimmed-producer":
      return key === producer.trim();
    case "prefix-20":
      return key.slice(0, 20) === producer.slice(0, 20);
    case "always":
      return true;
    case "never":
      return false;
  }
}

/** The drive a recipe describes: the reference join, or one mutant of it. */
export function recipeDrive(recipe: Recipe): (presented: Presented) => unknown {
  return presented => {
    const key = recipeKey(recipe.key, presented);
    const joined = recipeCompare(recipe.compare, key, presented.producer.value);
    if (recipe.behaviour === "boolean") return joined;
    if (joined) return { joined: true, key };
    if (recipe.behaviour === "throw") throw new Error("snapshot mismatch");
    if (recipe.behaviour === "null") return null;
    const refusal: Record<string, unknown> = { joined: false, code: MISMATCH, field: presented.producer.field, presented: key, producer: presented.producer.value };
    for (const edit of recipe.refusal) {
      if (edit.op === "delete") delete refusal[edit.key];
      else if (edit.op === "set") refusal[edit.key] = edit.value;
      else refusal.producer = String(refusal.producer).toUpperCase();
    }
    return refusal;
  };
}

// ---- the judged tables ----

export interface SourceRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** One row per touch kind; every pin is a source the scan must report exactly once, under that kind only. */
export const TOUCHPOINTS: readonly (SourceRow & { readonly kind: TouchKind })[] = [
  {
    id: "T-FIELD",
    kind: "FIELD",
    label:
      "a gp join-value field in code: input_snapshot, graph_digest or canonical_digest, or a camel-case mirror, as a name, a private name, a member, a string, a template part or a regular expression",
    pins: [
      'if (receipt.input_snapshot !== exported) throw new Error("mismatch");',
      "const { graph_digest } = reply.result.decision;",
      'const value = inspect["canonical_digest"];',
      "const key = sample?.decision?.graphDigest;",
      'const pointer = "/result/receipt/input_snapshot";',
      "type Receipt = { readonly inputSnapshot: string };",
      ["const path = `decision.$", "{port}.graph_digest`;"].join(""),
      "const shaped = /canonicalDigest/.test(line);",
      'class Receipt { #inputSnapshot = ""; }',
    ],
  },
  {
    id: "T-IDENTITIES",
    kind: "IDENTITIES",
    label: "gp's whole-document identity read as identities.graph: a member chain, an optional chain, an element access, a binding or assignment pattern, or a path string, slashed or dotted",
    pins: [
      "const id = envelope.identities.graph;",
      "const id = check.identities?.graph;",
      'const id = envelope["identities"]["graph"];',
      "const { identities: { graph: id } } = envelope;",
      "const { graph } = envelope.identities;",
      "({ graph: documentId } = check.identities);",
      'const pointer = "/identities/graph";',
      'const id = get(check, "identities.graph");',
    ],
  },
  {
    id: "T-PREFIX",
    kind: "PREFIX",
    label: "the graphpolicy.snapshot.c1 spelling gp gives its document and its projection identity, in a string, a template or a regular expression",
    pins: ['const SNAPSHOT_FORM = "graphpolicy.snapshot.c1:";', ["const id = `graphpolicy.snapshot.c1:$", "{hex}`;"].join(""), "if (/^graphpolicy\\.snapshot\\.c1:/.test(value)) return value;"],
  },
  {
    id: "T-SHARED",
    kind: "SHARED",
    label: "snapshotDigest, the name gp's journal and observation records give the join value, or its snake-case mirror, as a member, a private name, a binding or a string",
    pins: ["if (reply.snapshotDigest !== exported) refuse();", 'const value = record["snapshotDigest"];', "const { snapshot_digest } = row;", 'class Host { #snapshotDigest = ""; }'],
  },
];

/** Sources the scan must leave clean: Pi's own digests, near names, and comments. */
export const CLEAN: readonly SourceRow[] = [
  {
    id: "C-PI-OWN",
    label: "Pi's own digests and snapshots: a SHA-256 over bytes, an invocation identity, a graph view, a snapshot record",
    pins: [
      'const digest = createHash("sha256").update(bytes).digest("hex");',
      'const boot = { inputDigest: identityDigest("invocation-input", request.input) };',
      "const graph = renderGraph(view);",
      "const snapshot = { input, digest, canonical: true };",
    ],
  },
  {
    id: "C-NEAR-NAMES",
    label: "near names: another identities member, the members in the other order, prose with spaces, a longer name, the bare graphpolicy.snapshot words",
    pins: ["const id = envelope.identities.program;", "const graph = envelope.graph.identities;", 'const text = "the input snapshot and the graph digest";', "const graph_digests = [];", 'const kind = "graphpolicy.snapshot";'],
  },
  {
    id: "C-COMMENT",
    label: "a comment that names a gp join field is not code",
    pins: ["// receipt.input_snapshot and decision.graph_digest are gp's join keys\nconst x = 1;", "/** identities.graph and canonical_digest (graphpolicy.snapshot.c1:) are gp's identities. */\nexport const y = 2;"],
  },
];

/** Named residual families of the scan: each member is a pinned quiet row (the scan reports nothing for it). */
export const RESIDUALS: readonly SourceRow[] = [
  {
    id: "R-COMPUTED",
    label: "a join-value field name assembled at run time or read through a variable, so no code token spells it",
    pins: ['const value = receipt[["input", "snapshot"].join("_")];', "const value = receipt[settings.joinField];", 'const form = ["graphpolicy", "snapshot", "c1"].join(".");'],
  },
  {
    id: "R-ALIASED",
    label: "the identities object taken into an alias, or walked by entry, before its graph member is read",
    pins: ["const ids = envelope.identities;\nconst id = ids.graph;", 'for (const [key, value] of Object.entries(envelope.identities)) if (key === "graph") use(value);'],
  },
  {
    id: "R-PATTERN",
    label: "a regular expression that matches a field name without spelling it (a character class or a wildcard in its place)",
    pins: ["const shaped = /graph[_]digest/.test(line);", "const shaped = /input.snapshot/.test(line);"],
  },
  {
    id: "R-TRANSITIVE",
    label: "a module that compares a join value only through another src module's API, which is the site and carries the registration",
    pins: ['import { presentedKey } from "./gp-join.js";\nif (presentedKey(bytes) !== reply.key) refuse();'],
  },
];

/** One fixture fact the cases stand on. */
export interface FixtureRow {
  readonly id: string;
  readonly label: string;
}

export const FIXTURE: readonly FixtureRow[] = [
  { id: "F-BLOB", label: "the vendored bytes are the producer's committed fixture: its git blob at the bead pin and at the capture source, byte for byte" },
  { id: "F-DISTINCT", label: "acceptance (a): the fixture serialized pretty (the file) and compact (JSON.stringify) hashes to two different SHA-256 values; the variant is a third" },
];

export interface CaseRow {
  readonly id: string;
  readonly label: string;
  readonly clause: "a" | "b" | "c";
  readonly presentation: PresentationSpec;
  readonly producer: ProducerSpec;
  readonly expect: "joined" | "refused";
}

/** The join battery: what a conforming site reports for each presentation; every registered site is driven through every row. */
export const CASES: readonly CaseRow[] = [
  {
    id: "A-RPC-COMPACT",
    label: "the fixture sent over RPC in a compact frame joins the RPC decision's graph_digest",
    clause: "a",
    presentation: { transport: "rpc", graph: "fixture", frame: "compact" },
    producer: { field: "graph_digest", capture: "P-RPC-COMPACT" },
    expect: "joined",
  },
  {
    id: "A-RPC-SPACED",
    label: "the fixture sent in a spaced frame still joins on JSON.stringify of the value, not on the frame's spelling",
    clause: "a",
    presentation: { transport: "rpc", graph: "fixture", frame: "spaced" },
    producer: { field: "graph_digest", capture: "P-RPC-SPACED" },
    expect: "joined",
  },
  {
    id: "A-RPC-VARIANT",
    label: "the non-ASCII variant joins on the UTF-8 bytes of JSON.stringify",
    clause: "a",
    presentation: { transport: "rpc", graph: "variant", frame: "compact" },
    producer: { field: "graph_digest", capture: "P-RPC-VARIANT" },
    expect: "joined",
  },
  {
    id: "A-RPC-VARIANT-ESCAPED",
    label: "the non-ASCII variant sent ASCII-escaped still joins on the UTF-8 bytes of the value",
    clause: "a",
    presentation: { transport: "rpc", graph: "variant", frame: "ascii-escaped" },
    producer: { field: "graph_digest", capture: "P-RPC-VARIANT-ESCAPED" },
    expect: "joined",
  },
  {
    id: "A-CLI-FILE",
    label: "the fixture file handed to gp eval joins the runtime receipt's input_snapshot on the file bytes",
    clause: "a",
    presentation: { transport: "cli", file: "fixture" },
    producer: { field: "input_snapshot", capture: "P-EVAL-FILE" },
    expect: "joined",
  },
  {
    id: "A-CLI-SAMPLE",
    label: "the fixture file handed to gp sample joins the decision's graph_digest on the file bytes",
    clause: "a",
    presentation: { transport: "cli", file: "fixture" },
    producer: { field: "graph_digest", capture: "P-SAMPLE-FILE" },
    expect: "joined",
  },
  {
    id: "A-CLI-COMPACT",
    label: "a compact file with no trailing newline joins input_snapshot on its own bytes",
    clause: "a",
    presentation: { transport: "cli", file: "compact" },
    producer: { field: "input_snapshot", capture: "P-EVAL-COMPACT-FILE" },
    expect: "joined",
  },
  {
    id: "A-CROSS-DECOMPOSED",
    label: "the variant presented with its accent decomposed refuses the decision over the composed value: normalized text is not the presented bytes",
    clause: "a",
    presentation: { transport: "rpc", graph: "variant-decomposed", frame: "compact" },
    producer: { field: "graph_digest", capture: "P-RPC-VARIANT" },
    expect: "refused",
  },
  {
    id: "A-CROSS-RPC",
    label: "a compact RPC presentation refuses the CLI decision over the pretty file of the same graph",
    clause: "a",
    presentation: { transport: "rpc", graph: "fixture", frame: "compact" },
    producer: { field: "graph_digest", capture: "P-SAMPLE-FILE" },
    expect: "refused",
  },
  {
    id: "A-CROSS-CLI",
    label: "the pretty fixture file refuses the receipt over the compact spelling of the same graph",
    clause: "a",
    presentation: { transport: "cli", file: "fixture" },
    producer: { field: "input_snapshot", capture: "P-EVAL-COMPACT-FILE" },
    expect: "refused",
  },
  {
    id: "B-IDENTITIES-GRAPH",
    label: "identities.graph substituted for input_snapshot is refused typed",
    clause: "b",
    presentation: { transport: "cli", file: "fixture" },
    producer: { field: "input_snapshot", capture: "P-GRAPH-CHECK" },
    expect: "refused",
  },
  {
    id: "B-CANONICAL",
    label: "canonical_digest substituted for graph_digest is refused typed",
    clause: "b",
    presentation: { transport: "rpc", graph: "fixture", frame: "compact" },
    producer: { field: "graph_digest", capture: "P-INSPECT-GRAPH" },
    expect: "refused",
  },
  {
    id: "B-RELABELLED",
    label: "the presented hex under the graphpolicy.snapshot.c1 spelling is refused: a prefix is part of the identity",
    clause: "b",
    presentation: { transport: "cli", file: "fixture" },
    producer: { field: "input_snapshot", form: "relabelled" },
    expect: "refused",
  },
  {
    id: "B-BARE",
    label: "the presented hex with no sha256: spelling is refused in a receipt field",
    clause: "b",
    presentation: { transport: "rpc", graph: "fixture", frame: "compact" },
    producer: { field: "graph_digest", form: "bare" },
    expect: "refused",
  },
  {
    id: "B-UPPERCASE",
    label: "the presented key in upper-case hex is refused: the comparison is byte-equal",
    clause: "b",
    presentation: { transport: "cli", file: "fixture" },
    producer: { field: "input_snapshot", form: "uppercase" },
    expect: "refused",
  },
  {
    id: "B-LAST-DIGIT",
    label: "a value that differs from the presented key only in its last hex digit is refused: the whole string is compared",
    clause: "b",
    presentation: { transport: "cli", file: "fixture" },
    producer: { field: "input_snapshot", form: "last-digit" },
    expect: "refused",
  },
  {
    id: "B-PADDED",
    label: "the presented key with a trailing space is refused: the producer's value is not trimmed",
    clause: "b",
    presentation: { transport: "rpc", graph: "fixture", frame: "compact" },
    producer: { field: "graph_digest", form: "padded" },
    expect: "refused",
  },
  {
    id: "C-APPEND-NEWLINE",
    label: "whitespace-only: one more trailing newline on the presented file is a mismatch refusal",
    clause: "c",
    presentation: { transport: "cli", file: "fixture", edit: "append-newline" },
    producer: { field: "input_snapshot", capture: "P-EVAL-FILE" },
    expect: "refused",
  },
  {
    id: "C-STRIP-NEWLINE",
    label: "whitespace-only: the presented file without its final newline is a mismatch refusal",
    clause: "c",
    presentation: { transport: "cli", file: "fixture", edit: "strip-final-newline" },
    producer: { field: "input_snapshot", capture: "P-EVAL-FILE" },
    expect: "refused",
  },
  {
    id: "C-CRLF",
    label: "whitespace-only: CRLF line ends on the presented file are a mismatch refusal",
    clause: "c",
    presentation: { transport: "cli", file: "fixture", edit: "crlf" },
    producer: { field: "input_snapshot", capture: "P-EVAL-FILE" },
    expect: "refused",
  },
  {
    id: "C-TABS",
    label: "whitespace-only: tab indentation on the presented file is a mismatch refusal",
    clause: "c",
    presentation: { transport: "cli", file: "fixture", edit: "tabs" },
    producer: { field: "input_snapshot", capture: "P-EVAL-FILE" },
    expect: "refused",
  },
  {
    id: "C-COMPACT-NEWLINE",
    label: "whitespace-only: a trailing newline after the compact spelling is a mismatch refusal against the compact receipt",
    clause: "c",
    presentation: { transport: "cli", file: "compact", edit: "append-newline" },
    producer: { field: "input_snapshot", capture: "P-EVAL-COMPACT-FILE" },
    expect: "refused",
  },
  {
    id: "C-COMPACT-SPACE",
    label: "whitespace-only: one space after the first member colon of the compact spelling is a mismatch refusal",
    clause: "c",
    presentation: { transport: "cli", file: "compact", edit: "space-after-first-colon" },
    producer: { field: "input_snapshot", capture: "P-EVAL-COMPACT-FILE" },
    expect: "refused",
  },
];

export interface MutantRow {
  readonly id: string;
  readonly label: string;
  /** The CASES row the mutant drive answers. */
  readonly case: string;
  /** The recipe fields that differ from REFERENCE. */
  readonly recipe: Partial<Recipe>;
  /** The exact rule ids the judge must report, in order. */
  readonly expect: readonly string[];
}

/** Mutant drives: the reference join changed one way each; the judge must refuse each with exactly its rules. */
export const MUTANTS: readonly MutantRow[] = [
  { id: "M-REPARSE-FILE", label: "the file is re-parsed and hashed compact", case: "A-CLI-FILE", recipe: { key: "reparsed-compact" }, expect: ["J-KEY", "J-FALSE-REFUSAL"] },
  { id: "M-REPARSE-WHITESPACE", label: "re-parsing hides a whitespace-only edit and joins", case: "C-COMPACT-SPACE", recipe: { key: "reparsed-compact" }, expect: ["J-KEY", "J-SILENT-PASS"] },
  { id: "M-PRETTY-RPC", label: "the RPC value is hashed pretty-printed", case: "A-RPC-COMPACT", recipe: { key: "reparsed-pretty" }, expect: ["J-KEY", "J-FALSE-REFUSAL"] },
  { id: "M-FRAME-SPACED", label: "the frame's spaced spelling is hashed instead of the value", case: "A-RPC-SPACED", recipe: { key: "frame-spelling" }, expect: ["J-KEY", "J-FALSE-REFUSAL"] },
  { id: "M-FRAME-ESCAPED", label: "the frame's ASCII-escaped spelling is hashed instead of the value", case: "A-RPC-VARIANT-ESCAPED", recipe: { key: "frame-spelling" }, expect: ["J-KEY", "J-FALSE-REFUSAL"] },
  { id: "M-TRIM", label: "trimming hides a trailing newline and joins", case: "C-COMPACT-NEWLINE", recipe: { key: "trimmed" }, expect: ["J-KEY", "J-SILENT-PASS"] },
  { id: "M-LINE-ENDINGS", label: "normalized line ends hide CRLF and join", case: "C-CRLF", recipe: { key: "line-endings-normalized" }, expect: ["J-KEY", "J-SILENT-PASS"] },
  { id: "M-LATIN1", label: "the text is hashed as Latin-1, not UTF-8", case: "A-RPC-VARIANT", recipe: { key: "latin1" }, expect: ["J-KEY", "J-FALSE-REFUSAL"] },
  { id: "M-UTF16", label: "the text is hashed as UTF-16 code units", case: "A-RPC-COMPACT", recipe: { key: "utf16le" }, expect: ["J-KEY", "J-FALSE-REFUSAL"] },
  { id: "M-ASCII-ESCAPED", label: "the value is hashed ASCII-escaped", case: "A-RPC-VARIANT", recipe: { key: "ascii-escaped" }, expect: ["J-KEY", "J-FALSE-REFUSAL"] },
  { id: "M-NFC-NORMALIZED", label: "the text is NFC-normalized before it is hashed and a decomposed presentation joins", case: "A-CROSS-DECOMPOSED", recipe: { key: "nfc-normalized" }, expect: ["J-KEY", "J-SILENT-PASS"] },
  { id: "M-HELD-GRAPH", label: "identities.graph is the key and joins its own substitution", case: "B-IDENTITIES-GRAPH", recipe: { key: "held-identities-graph" }, expect: ["J-KEY", "J-SUBSTITUTE", "J-SILENT-PASS"] },
  { id: "M-HELD-CANONICAL", label: "canonical_digest is the key and joins its own substitution", case: "B-CANONICAL", recipe: { key: "held-canonical" }, expect: ["J-KEY", "J-SUBSTITUTE", "J-SILENT-PASS"] },
  { id: "M-HELD-GRAPH-CLI", label: "identities.graph is the key against a conforming receipt", case: "A-CLI-FILE", recipe: { key: "held-identities-graph" }, expect: ["J-KEY", "J-SUBSTITUTE", "J-FALSE-REFUSAL"] },
  { id: "M-TRUST-PRODUCER", label: "the producer's value is taken as the key", case: "A-CROSS-RPC", recipe: { key: "trust-producer" }, expect: ["J-KEY", "J-SILENT-PASS"] },
  { id: "M-BARE-KEY", label: "the key drops its sha256: spelling and joins a bare value", case: "B-BARE", recipe: { key: "bare-hex" }, expect: ["J-KEY", "J-SILENT-PASS"] },
  { id: "M-HEX-SUFFIX", label: "the comparison reads only the hex after the colon", case: "B-RELABELLED", recipe: { compare: "hex-suffix" }, expect: ["J-SILENT-PASS"] },
  { id: "M-HEX-SUFFIX-BARE", label: "the hex-only comparison joins a bare value", case: "B-BARE", recipe: { compare: "hex-suffix" }, expect: ["J-SILENT-PASS"] },
  { id: "M-CASE-FOLD", label: "the comparison folds case", case: "B-UPPERCASE", recipe: { compare: "case-folded" }, expect: ["J-SILENT-PASS"] },
  { id: "M-PREFIX-COMPARE", label: "the comparison reads only the first twenty characters", case: "B-LAST-DIGIT", recipe: { compare: "prefix-20" }, expect: ["J-SILENT-PASS"] },
  { id: "M-TRIM-PRODUCER", label: "the producer's value is trimmed before the comparison", case: "B-PADDED", recipe: { compare: "trimmed-producer" }, expect: ["J-SILENT-PASS"] },
  { id: "M-ALWAYS", label: "every presentation joins", case: "A-CROSS-CLI", recipe: { compare: "always" }, expect: ["J-SILENT-PASS"] },
  { id: "M-NEVER", label: "every presentation is refused", case: "A-RPC-COMPACT", recipe: { compare: "never" }, expect: ["J-FALSE-REFUSAL"] },
  { id: "M-CODE-MISSING", label: "the refusal carries no code", case: "A-CROSS-CLI", recipe: { refusal: [{ op: "delete", key: "code" }] }, expect: ["J-CODE"] },
  { id: "M-CODE-RENAMED", label: "the refusal's code is not the typed mismatch", case: "C-CRLF", recipe: { refusal: [{ op: "set", key: "code", value: "mismatch" }] }, expect: ["J-CODE"] },
  { id: "M-FIELD", label: "the refusal names the other receipt field", case: "A-CROSS-CLI", recipe: { refusal: [{ op: "set", key: "field", value: "graph_digest" }] }, expect: ["J-FIELD"] },
  { id: "M-ECHO-RECASED", label: "the refusal re-cases the producer's value", case: "B-IDENTITIES-GRAPH", recipe: { refusal: [{ op: "uppercase-echo" }] }, expect: ["J-ECHO"] },
  { id: "M-PRESENTED-MISSING", label: "the refusal does not carry the presented key", case: "C-TABS", recipe: { refusal: [{ op: "delete", key: "presented" }] }, expect: ["J-KEY"] },
  { id: "M-THROWS", label: "the drive throws on a mismatch instead of refusing typed", case: "B-CANONICAL", recipe: { behaviour: "throw" }, expect: ["J-OUTCOME"] },
  { id: "M-NULL", label: "the drive returns null on a mismatch", case: "C-TABS", recipe: { behaviour: "null" }, expect: ["J-OUTCOME"] },
  { id: "M-BOOLEAN", label: "the drive returns a bare boolean", case: "A-RPC-COMPACT", recipe: { behaviour: "boolean" }, expect: ["J-OUTCOME"] },
];

export interface SiteCase {
  readonly id: string;
  readonly label: string;
  readonly sites: readonly SiteEntry[];
  readonly near: readonly NearName[];
  readonly files: Readonly<Record<string, string>>;
  readonly expect: readonly string[];
}

/** A synthetic join site: it names input_snapshot and exports joinSnapshot. */
export const SYNTHETIC_SITE =
  'import { createHash } from "node:crypto";\nexport function joinSnapshot(presented: Uint8Array, receipt: { input_snapshot: string }): boolean {\n  return "sha256:" + createHash("sha256").update(presented).digest("hex") === receipt.input_snapshot;\n}\n';
const HOST_OWN = 'if (receipt.snapshotDigest !== boot.snapshotDigest) throw new Error("IDENTITY_CONFLICT");\n';
const REASON = "the host's own invocation snapshot";

/** Synthetic trees for the registration judge: each row's files are scanned and its registrations judged against them. */
export const SITE_CASES: readonly SiteCase[] = [
  { id: "S-REGISTERED", label: "a join site registered with the join it exports", sites: [{ file: "src/gp-join.ts", join: "joinSnapshot" }], near: [], files: { "src/gp-join.ts": SYNTHETIC_SITE }, expect: [] },
  { id: "S-UNREGISTERED", label: "a join site with no registration", sites: [], near: [], files: { "src/gp-join.ts": SYNTHETIC_SITE }, expect: ["S-UNREGISTERED"] },
  { id: "S-STALE", label: "a registration whose module carries no touch", sites: [{ file: "src/plain.ts", join: "joinSnapshot" }], near: [], files: { "src/plain.ts": "export const joinSnapshot = () => true;\n" }, expect: ["S-STALE"] },
  {
    id: "S-DUPLICATE",
    label: "one site registered twice",
    sites: [
      { file: "src/gp-join.ts", join: "joinSnapshot" },
      { file: "src/gp-join.ts", join: "joinSnapshot" },
    ],
    near: [],
    files: { "src/gp-join.ts": SYNTHETIC_SITE },
    expect: ["S-DUPLICATE"],
  },
  {
    id: "S-UNEXPORTED",
    label: "a registration whose join the module declares but does not export",
    sites: [{ file: "src/gp-join.ts", join: "joinSnapshot" }],
    near: [],
    files: { "src/gp-join.ts": SYNTHETIC_SITE.replace("export function joinSnapshot", "function joinSnapshot") },
    expect: ["S-UNEXPORTED"],
  },
  { id: "S-NEAR-LISTED", label: "the shared name in a listed module of Pi's own", sites: [], near: [{ file: "src/host.ts", name: "snapshotDigest", reason: REASON }], files: { "src/host.ts": HOST_OWN }, expect: [] },
  { id: "S-NEAR-UNLISTED", label: "the shared name in a module nobody listed", sites: [], near: [], files: { "src/host.ts": HOST_OWN }, expect: ["S-UNREGISTERED"] },
  { id: "S-NEAR-STALE", label: "a listing whose module no longer carries the shared name", sites: [], near: [{ file: "src/plain.ts", name: "snapshotDigest", reason: REASON }], files: { "src/plain.ts": "export const x = 1;\n" }, expect: ["S-STALE-NEAR"] },
  {
    id: "S-NEAR-FIELD",
    label: "a listing that names a gp join field: the field stays unregistered and the listing is refused",
    sites: [],
    near: [{ file: "src/host.ts", name: "graph_digest", reason: REASON }],
    files: { "src/host.ts": "const value = reply.graph_digest;\n" },
    expect: ["S-UNREGISTERED", "S-NEAR-NAME"],
  },
  { id: "S-NEAR-REASON", label: "a listing with an empty reason", sites: [], near: [{ file: "src/host.ts", name: "snapshotDigest", reason: " " }], files: { "src/host.ts": HOST_OWN }, expect: ["S-NEAR-REASON"] },
  {
    id: "R-SHARED-NAME",
    label: "a gp join through snapshotDigest inside a listed module is not told apart from the module's own field",
    sites: [],
    near: [{ file: "src/host.ts", name: "snapshotDigest", reason: REASON }],
    files: { "src/host.ts": `${HOST_OWN}if (reply.snapshotDigest !== exportedDigest) refuse();\n` },
    expect: [],
  },
  {
    id: "R-DRIVE-BYPASS",
    label: "a registered module that names a join field and exports a join it never computes: whether the drive runs the module's code is reviewed, not judged",
    sites: [{ file: "src/gp-join.ts", join: "joinSnapshot" }],
    near: [],
    files: { "src/gp-join.ts": 'export const joinSnapshot = () => true;\nconst field = "graph_digest";\n' },
    expect: [],
  },
];

// ---- the walk: srcFiles on synthetic trees (every property its JSDoc claims) ----

/** One entry of a synthetic tree: a regular file, a symbolic link (its target relative to the link's directory), or a FIFO. */
export type WalkEntry = { readonly kind: "file"; readonly text: string } | { readonly kind: "symlink"; readonly target: string } | { readonly kind: "fifo" };

export interface WalkRow {
  readonly id: string;
  readonly label: string;
  /** The tree a test plants under a scratch root, keyed by root-relative POSIX path and planted in key order. */
  readonly tree: Readonly<Record<string, WalkEntry>>;
  /** What srcFiles(root) must return, in order, or the message it must throw. */
  readonly expect: { readonly files: readonly string[] } | { readonly throws: string };
}

const PLAIN: WalkEntry = { kind: "file", text: "export const plain = 1;\n" };

/** U+1F600 and U+FF5E: their UTF-8 byte order and their UTF-16 code-unit order disagree (W-SORTED). */
const ASTRAL_NAME = `${String.fromCodePoint(0x1f600)}.ts`;
const FULLWIDTH_NAME = `${String.fromCodePoint(0xff5e)}.ts`;

/**
 * wb-5efc (landing-324 probe P18 and the walk's other claims), each tree planted on rule-11 scratch. readdirSync already returns
 * a directory's names in UTF-8 byte order (libuv sorts its scandir result), which equals srcFiles' own sort (UTF-16 code units)
 * for ASCII names, so W-SORTED lists two names the two orders disagree on: its listing's order is srcFiles' own sort.
 */
export const WALKS: readonly WalkRow[] = [
  {
    id: "W-HIDDEN",
    label: "a hidden file and a hidden directory's file are walked",
    tree: { "src/.hidden.ts": PLAIN, "src/plain.ts": PLAIN, "src/.cache/inner.ts": PLAIN },
    expect: { files: ["src/.cache/inner.ts", "src/.hidden.ts", "src/plain.ts"] },
  },
  {
    id: "W-EXTENSIONLESS",
    label: "an extensionless file in a nested directory is walked",
    tree: { "src/plain.ts": PLAIN, "src/nested/deeper/noext": PLAIN },
    expect: { files: ["src/nested/deeper/noext", "src/plain.ts"] },
  },
  {
    id: "W-SYMLINKED-FILE",
    label: "a symlinked file is followed and listed under its link path, beside its target",
    tree: { "src/real/target.ts": PLAIN, "src/link.ts": { kind: "symlink", target: "real/target.ts" } },
    expect: { files: ["src/link.ts", "src/real/target.ts"] },
  },
  {
    id: "W-LINKED-DIRECTORY",
    label: "a directory symlink is followed: a directory outside the scan root is walked under the link's path",
    tree: { "outside/inner.ts": PLAIN, "src/linked": { kind: "symlink", target: "../outside" } },
    expect: { files: ["src/linked/inner.ts"] },
  },
  {
    id: "W-DIRECTORY-ALIAS",
    label: "a second link to a real directory already walked is not walked again",
    tree: { "src/real/b.ts": PLAIN, "src/zalias": { kind: "symlink", target: "real" } },
    expect: { files: ["src/real/b.ts"] },
  },
  {
    id: "W-DIRECTORY-LOOP",
    label: "a directory symlink back to the walked directory ends the walk",
    tree: { "src/loop": { kind: "symlink", target: "." }, "src/a.ts": PLAIN },
    expect: { files: ["src/a.ts"] },
  },
  {
    id: "W-SCOPE",
    label: "only the tree under root/src is walked: a root file and another root directory are not",
    tree: { "src/b.ts": PLAIN, "top.ts": PLAIN, "lib/c.ts": PLAIN, "src/a.ts": PLAIN },
    expect: { files: ["src/a.ts", "src/b.ts"] },
  },
  {
    id: "W-SORTED",
    label: "the listing is in srcFiles' own sort order (UTF-16 code units), not the UTF-8 byte order readdirSync returns names in",
    tree: { [`src/${FULLWIDTH_NAME}`]: PLAIN, "src/a.ts": PLAIN, [`src/${ASTRAL_NAME}`]: PLAIN },
    expect: { files: ["src/a.ts", `src/${ASTRAL_NAME}`, `src/${FULLWIDTH_NAME}`] },
  },
  {
    id: "W-DEPTH-FIRST",
    label: "a directory's files are listed at its name's place among its siblings: src/a/x.ts before src/a-b.ts, which a plain sort of the paths puts first",
    tree: { "src/a-b.ts": PLAIN, "src/a/x.ts": PLAIN },
    expect: { files: ["src/a/x.ts", "src/a-b.ts"] },
  },
  {
    id: "W-FIFO",
    label: "a FIFO is neither a regular file nor a directory, so the walk fails closed",
    tree: { "src/a.ts": PLAIN, "src/pipe": { kind: "fifo" } },
    expect: { throws: "src/pipe: neither a regular file nor a directory under the scan root" },
  },
];

// ---- the whitespace-only oracle's controls (acceptance (c) reads it on every clause-c row) ----

/** A text the oracle is handed: the vendored file, its compact spelling, the variant's, or the compact spelling with a space inside its first string value. */
export type OracleText = "fixture" | "compact" | "variant-compact" | "compact-space-in-string";

export interface OracleRow {
  readonly id: string;
  readonly label: string;
  /** The text the presented file was written from. */
  readonly original: "fixture" | "compact";
  /** The text presented. */
  readonly text: OracleText;
  /** What whitespaceOnly(original, text) must answer. */
  readonly expect: boolean;
}

/** wb-5efc (landing-324 probe P15): the oracle answers false for identical bytes and for any value edit, true for a respelling. */
export const ORACLE: readonly OracleRow[] = [
  { id: "O-UNCHANGED", label: "the presented file as written: no byte differs, so it is not a whitespace-only edit", original: "fixture", text: "fixture", expect: false },
  { id: "O-RESPELLED", label: "the file respelled compact: the same value in different bytes is a whitespace-only edit", original: "fixture", text: "compact", expect: true },
  {
    id: "O-VALUE-EDIT",
    label: "a one-field value edit (the non-ASCII variant, spelled compact) changes the value, so it is not a whitespace-only edit",
    original: "compact",
    text: "variant-compact",
    expect: false,
  },
  { id: "O-SPACE-IN-STRING", label: "a space added inside a string value changes that value, so it is not a whitespace-only edit", original: "compact", text: "compact-space-in-string", expect: false },
];

/** An oracle row's text, built from the vendored fixture. */
export function oracleText(fixture: Fixture, text: OracleText): string {
  switch (text) {
    case "fixture":
    case "compact":
      return fileText(fixture, text);
    case "variant-compact":
      return JSON.stringify(fixture.variant);
    case "compact-space-in-string": {
      const compact = fileText(fixture, "compact");
      const at = compact.indexOf('":"');
      if (at === -1) throw new Error("compact-space-in-string needs a member whose value is a string");
      return `${compact.slice(0, at + 3)} ${compact.slice(at + 3)}`;
    }
  }
}

// ---- ROWS: every judged row, in census order, as the roster carries it ----

export interface JudgedRow {
  readonly table: string;
  readonly id: string;
  readonly label: string;
  /** The SHA-256 of each pin as written (a source, a capture, a case, a mutant's case, recipe and rules, or a site case). */
  readonly pins: readonly string[];
  /** The registered test of this row. */
  readonly test: string;
}

const row = (table: string, id: string, label: string, pins: readonly string[]): JudgedRow => ({ table, id, label, pins: pins.map(pin => sha256Hex(pin)), test: `${table} ${id}` });

export const ROWS: readonly JudgedRow[] = [
  ...TOUCHPOINTS.map(entry => row("TOUCHPOINTS", entry.id, entry.label, entry.pins)),
  ...CLEAN.map(entry => row("CLEAN", entry.id, entry.label, entry.pins)),
  ...RESIDUALS.map(entry => row("RESIDUALS", entry.id, entry.label, entry.pins)),
  ...CAPTURES.map(entry => row("CAPTURES", entry.id, entry.label, [JSON.stringify({ argv: entry.argv, frame: entry.frame ?? null, path: entry.path, value: entry.value, recompute: entry.recompute })])),
  ...FIXTURE.map(entry => row("FIXTURE", entry.id, entry.label, [JSON.stringify(PRODUCER)])),
  ...CASES.map(entry => row("CASES", entry.id, entry.label, [JSON.stringify({ clause: entry.clause, presentation: entry.presentation, producer: entry.producer, expect: entry.expect })])),
  ...MUTANTS.map(entry => row("MUTANTS", entry.id, entry.label, [JSON.stringify({ case: entry.case, recipe: { ...REFERENCE, ...entry.recipe }, expect: entry.expect })])),
  ...SITE_CASES.map(entry => row("SITE_CASES", entry.id, entry.label, [JSON.stringify({ sites: entry.sites, near: entry.near, files: entry.files, expect: entry.expect })])),
  ...WALKS.map(entry => row("WALKS", entry.id, entry.label, [JSON.stringify({ tree: entry.tree, expect: entry.expect })])),
  ...ORACLE.map(entry => row("ORACLE", entry.id, entry.label, [JSON.stringify({ original: entry.original, text: entry.text, expect: entry.expect })])),
];

/** The named residual families and their quiet-row members (scan residuals and the registration judge's two). */
export const RESIDUAL_FAMILIES: Readonly<Record<string, readonly string[]>> = {
  "R-COMPUTED": ["RESIDUALS R-COMPUTED"],
  "R-ALIASED": ["RESIDUALS R-ALIASED"],
  "R-TRANSITIVE": ["RESIDUALS R-TRANSITIVE"],
  "R-PATTERN": ["RESIDUALS R-PATTERN"],
  "R-SHARED-NAME": ["SITE_CASES R-SHARED-NAME"],
  "R-DRIVE-BYPASS": ["SITE_CASES R-DRIVE-BYPASS"],
};

/** Whether text is a whitespace-only edit of original: the same JSON value, different bytes (ORACLE pins both answers). */
export const whitespaceOnly = (original: string, text: string): boolean => original !== text && isDeepStrictEqual(JSON.parse(original), JSON.parse(text));
