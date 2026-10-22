/**
 * wb-72c respin U2 (R2, BLOCKING under R590-owner): the F1 identity-ref closure of src/index.ts runWorkflowTask, the evidence
 * reference a Claude stream observation lists for the session's last message. An evidence reference is an identity, not display
 * text: docs/workbench/20 lists claude-message:<uuid> only when exact, so the id goes through the one helper as an identity check
 * (the gate's R2 default (a), the forge-evidence.ts operationIdOf shape): it is listed verbatim when
 * sanitizeWorkbenchText(id, 120, "label") leaves it unchanged, and withheld otherwise. Before the respin the closure repaired
 * the id instead (stripUnsafeText(id, " ").slice(0, 120)), so it listed a ref the session never reported: an unsafe unit became a
 * space, a credential-shaped id was listed as it came, and an over-long one was cut to a different id.
 *
 * The closure is exported from src/index.ts as claudeMessageEvidenceRef, so it is pinned red-first here. Its one call site, the
 * observer callback in runWorkflowTask, runs only under a live Claude SDK query, so the call site is a NAMED RESIDUAL (the zo9 R2
 * precedent: the shared closure is pinned, the live-tier-only call site is named). The live tier's own mirror of that callback
 * (test/workbench-claude-control-live.test.ts observerFor) still repaired the id after wb-72c (the 72c gate's F4); since wb-p2ef it
 * derives the ref through this closure on production's own line, and the F4 rows at the end of this file read both files as
 * text, so the case list here binds the mirror too. wb-p2ef F3: each row's value (the message id it tests) is frozen beside its
 * row name, as a digest (the 72c gate's H2 swapped W1's ZWSP id for W2's BEL id and stayed green). wb-72c.1: those F4 rows read a
 * template substring, so the census at the end of this file judges each observer site's emitted shape on its parsed source.
 *
 * Every credential-shaped id below is an obviously fake placeholder; the rows pin input hygiene only. Failures name the row,
 * never the id (names only).
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { claudeMessageEvidenceRef } from "../src/index.js";
import { docsSection } from "./helpers/census.js";

const cp = (code: number): string => String.fromCodePoint(code);
const NUL = cp(0x00);
const BEL = cp(0x07);
const LF = cp(0x0a);
const ESC = cp(0x1b);
const ZWSP = cp(0x200b);
const RLO = cp(0x202e);
const BOM = cp(0xfeff);

interface Row {
  readonly id: string;
  readonly value: string;
}

/** Ids the helper leaves unchanged: each is listed verbatim, as the session reported it. */
const LISTED: readonly Row[] = [
  { id: "L1 an RFC 4122 uuid, the SDK's message uuid", value: "0f8e7d6c-5b4a-4938-a7b6-c5d4e3f2a1b0" },
  { id: "L2 a short fixture id", value: "m-9" },
  { id: "L3 exactly 120 units", value: "m".repeat(120) },
];

/** Ids the helper would change in some way: each is withheld whole, never repaired into a different ref. */
const WITHHELD: readonly Row[] = [
  { id: "W1 ZWSP inside the id", value: `m${ZWSP}9` },
  { id: "W2 BEL inside the id", value: `m${BEL}9` },
  { id: "W3 SGR inside the id", value: `m-${ESC}[31m9` },
  { id: "W4 RLO inside the id", value: `m${RLO}9` },
  { id: "W5 LF inside the id", value: `m${LF}9` },
  { id: "W6 NUL inside the id", value: `m${NUL}9` },
  { id: "W7 BOM before the id", value: `${BOM}m-9` },
  { id: "W8 lone surrogate inside the id", value: `m-${cp(0xd800)}9` },
  { id: "W9 8-bit CSI inside the id", value: `m-${cp(0x9b)}31m9` },
  { id: "W10 a Bearer-shaped id", value: "Bearer FAKETOKENZERO" },
  { id: "W11 a key-prefixed id", value: "sk-ant-FAKEFAKEFAKE0000" },
  { id: "W12 an assignment-shaped id", value: "password=FAKEVALUE" },
  { id: "W13 a run of spaces inside the id (the label layout collapses it)", value: "m  9" },
  { id: "W14 a leading space (the label layout trims it)", value: " m-9" },
  { id: "W15 121 units, one past the 120 bound", value: "m".repeat(121) },
];

/** U8-style each-liveness for this file's tables: the rows at this cut, as literals. */
const FROZEN_LISTED: readonly string[] = ["L1 an RFC 4122 uuid, the SDK's message uuid", "L2 a short fixture id", "L3 exactly 120 units"];
const FROZEN_WITHHELD: readonly string[] = [
  "W1 ZWSP inside the id",
  "W2 BEL inside the id",
  "W3 SGR inside the id",
  "W4 RLO inside the id",
  "W5 LF inside the id",
  "W6 NUL inside the id",
  "W7 BOM before the id",
  "W8 lone surrogate inside the id",
  "W9 8-bit CSI inside the id",
  "W10 a Bearer-shaped id",
  "W11 a key-prefixed id",
  "W12 an assignment-shaped id",
  "W13 a run of spaces inside the id (the label layout collapses it)",
  "W14 a leading space (the label layout trims it)",
  "W15 121 units, one past the 120 bound",
];
/**
 * wb-p2ef F3: the message id each frozen row tests (its value), LISTED then WITHHELD, in table order. The frozen row names pin
 * what a row is called, not the value it tests, so a value swapped for another with the same verdict kept every row green (the
 * 72c gate's H2: W1's ZWSP id swapped for W2's BEL id). Each digest is the first 16 hex digits of the sha256 of the row's JSON
 * text [value]: it repeats no credential-shaped text, and a mismatch is reported by row name alone (names only).
 */
const FROZEN_VALUE_DIGESTS: readonly string[] = [
  "4ff037335d7fb365",
  "6f9bd4e13a2dfd76",
  "3af01d066d98aedf",
  "b792e79b819d6821",
  "b8a753b5cde40b17",
  "f2543e520be765c7",
  "5c21f3ae263abbbd",
  "ea8ec15a69c7a915",
  "087ceeea0808a2a5",
  "946fac0ee80858c0",
  "79f30419c6c3a2e8",
  "d4b2cbed5d00c5d4",
  "bbad53fc385a1096",
  "5415b9838788e772",
  "ad0e6845fe362a95",
  "604fd8c229520934",
  "0d58d5d4b621a341",
  "ec832114c42d2571",
];
/** A row's value digest: its value as JSON text, sha256, the first 16 hex digits. */
const valueDigest = (row: Row): string => createHash("sha256").update(JSON.stringify([row.value])).digest("hex").slice(0, 16);
const REGISTERED: string[] = [];

describe("wb-72c the F1 identity-ref closure: claude-message:<id> exact or withheld, through the one helper", () => {
  for (const row of LISTED) {
    REGISTERED.push(row.id);
    it(`${row.id}: listed verbatim`, () => {
      // Names only: a boolean, so a failure never prints the id.
      expect(claudeMessageEvidenceRef(row.value) === `claude-message:${row.value}`, `${row.id}: not listed verbatim`).toBe(true);
    });
  }

  for (const row of WITHHELD) {
    REGISTERED.push(row.id);
    it(`${row.id}: withheld, never repaired`, () => {
      expect(claudeMessageEvidenceRef(row.value) === undefined, `${row.id}: a ref was listed for an id the helper changes`).toBe(true);
    });
  }

  it("an absent or empty id lists nothing", () => {
    expect(claudeMessageEvidenceRef(undefined)).toBeUndefined();
    expect(claudeMessageEvidenceRef("")).toBeUndefined();
  });

  it("each-liveness: both tables are exactly the frozen ids, and every row registered", () => {
    expect(LISTED.map(row => row.id)).toEqual(FROZEN_LISTED);
    expect(WITHHELD.map(row => row.id)).toEqual(FROZEN_WITHHELD);
    expect(REGISTERED).toEqual([...FROZEN_LISTED, ...FROZEN_WITHHELD]);
  });

  it("wb-p2ef F3 content pin: every frozen row tests exactly its frozen message id, so a swap that keeps the row name and the verdict is red (names only)", () => {
    expect(FROZEN_VALUE_DIGESTS).toHaveLength(FROZEN_LISTED.length + FROZEN_WITHHELD.length);
    expect([...LISTED, ...WITHHELD].filter((row, index) => valueDigest(row) !== FROZEN_VALUE_DIGESTS[index]).map(row => row.id)).toEqual([]);
  });
});

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** A repository file as text: the live tier is read here, never run (it runs only from its own forge command). */
const readRepo = (relative: string): string => readFileSync(join(ROOT, relative), "utf8");
/** How often `part` occurs in `text`. */
const occurrences = (text: string, part: string): number => text.split(part).length - 1;
/** The credentialed live tier, excluded from the default gate: its observerFor mirrors runWorkflowTask's observer callback. */
const LIVE_SUITE = "test/workbench-claude-control-live.test.ts";
/** The line on which production's observer callback, and the live tier's mirror of it, derive the ref from this closure. */
const DERIVE_LINE = "const messageRef = claudeMessageEvidenceRef(snapshot.lastMessageId);";
/** How both hand the derived ref to the emitter: that ref alone, or nothing. */
const EMIT_SHAPE = "messageRef ? [messageRef] : undefined";
/** The live tier takes the closure from src/index.ts, the one definition, beside the extension it boots. */
const LIVE_IMPORT = 'import subagentsExtension, { claudeMessageEvidenceRef } from "../src/index.js";';

describe("wb-p2ef F4: the live tier's observer mirror derives the claude-message ref through this closure, so the case list above binds it", () => {
  const index = readRepo("src/index.ts");
  const live = readRepo(LIVE_SUITE);
  const lines = (source: string): string[] => source.split("\n").map(line => line.trim());

  it("production and the live mirror each carry the one shared derive line and the one emit shape (the ref alone, or nothing) exactly once", () => {
    expect(lines(index).filter(line => line === DERIVE_LINE).length, "src/index.ts derive line").toBe(1);
    expect(lines(live).filter(line => line === DERIVE_LINE).length, "live suite derive line").toBe(1);
    expect(occurrences(index, EMIT_SHAPE), "src/index.ts emit shape").toBe(1);
    expect(occurrences(live, EMIT_SHAPE), "live suite emit shape").toBe(1);
  });

  it("the live mirror imports the closure from src/index.ts and composes no ref of its own (the old repair, stripUnsafeText then a 120-unit cut, is gone)", () => {
    expect(lines(live).includes(LIVE_IMPORT), "live suite imports claudeMessageEvidenceRef from src/index.ts").toBe(true);
    expect(occurrences(live, "`claude-message:${"), "live suite composes a claude-message ref itself").toBe(0);
    expect(occurrences(live, "stripUnsafeText"), "live suite strips locally").toBe(0);
  });
});

/**
 * wb-72c.1 (the wb-p2ef gate's PREP F1, routed by owner ruling R620): the F4 rows above judge a template substring, not the emitted
 * shape. They find the derive LINE, count the emit shape as a SUBSTRING and count the template form `claude-message:${ to zero, so
 * three drift shapes kept them, and the live receipt suite, green: G-F4-CONCAT-LIVE (the live emit restores the 72c-era repair by
 * concatenation when the closure withholds), G-F4-SHADOW-LIVE (a local const claudeMessageEvidenceRef shadows the import inside
 * observerFor) and G-F4-WRAP-LIVE+SRC (a post-closure ?.map(ref => ref.substring(0, 120)) around the emit, live and src). The census
 * below judges every observer site on its PARSED source instead - code as the TypeScript printer prints it, comments dropped - so
 * what the F4 titles claim ("the ref alone, or nothing", "composes no ref of its own") is what is checked.
 *
 * SHAPE (standing rule 16). SITES is the judged table, one row per observer site, and PINS is what every site must hold: one row
 * per site and pin. FROZEN SHAPE pins the pins, the sites with their pin lists, the drift battery and the registered rows. ANCHOR
 * finds the sites from outside this file: a file the package loads as an extension (package.json pi.extensions) or runs as a
 * credentialed live tier (vitest.config.ts test.exclude) that calls claudeMessageEvidenceRef is exactly one site and calls it only
 * inside that site's observer callback, so a site removed from every literal here is still red. DRIFTS applies each drift shape -
 * the gate's three named ones, then members of the same class (M-*) - to an in-memory copy of the real source (nothing is written)
 * and pins the pins it reds, its true cause. LIVENESS keeps that battery honest: every pin of every site is red under some drift,
 * every drift reds some pin, every pin has a drift that reds it alone (so a pin dropped everywhere leaves a dead drift), every drift
 * is the only one to red some site's pin, judged on the real source (so a drift dropped everywhere leaves a pin unred), and
 * NAMED_DRIFTS, the gate's own count, holds the named three. wb-72c.2 anchors the PINS dimension to the published
 * docs/20 pin section outside this file (F1); the named quoted/constant-computed P4/P5 forms are pinned below (F2/F3).
 * No arbitrary variable-key/alias resolution is claimed by constantKey; it resolves literals and their concatenations
 * through parentheses and TypeScript assertions only. This cut does not run the credentialed live tier.
 */
type PinId = "P1" | "P2" | "P3" | "P4" | "P5";

interface Pin {
  readonly id: PinId;
  readonly requirement: string;
}

/** What every observer site must hold, judged on its parsed source. */
const PINS: readonly Pin[] = [
  {
    id: "P1",
    requirement: "derive: messageRef is the callback's one binding of that name, a const of exactly claudeMessageEvidenceRef(snapshot.lastMessageId)",
  },
  {
    id: "P2",
    requirement:
      "emit: the callback's one emitObservation call hands exactly messageRef ? [messageRef] : undefined to the emitter's evidenceRefs and reads messageRef nowhere else (the ref alone, or nothing)",
  },
  {
    id: "P3",
    requirement: "closure: the file binds claudeMessageEvidenceRef once, as the site's own binding, so no local declaration shadows the one closure",
  },
  {
    id: "P4",
    requirement: "compose: the callback reads lastMessageId only inside that derive and carries no claude-message text of its own",
  },
  {
    id: "P5",
    requirement: "ingest: the emitter never rebinds evidenceRefs and ingests it as the site's frozen value, so no ref is rewritten on its way in",
  },
];

interface Site {
  /** The row key the drift attributions name. */
  readonly key: string;
  readonly name: string;
  /** The repository file the site lives in. */
  readonly file: string;
  /** How the file binds the one closure: production defines it; the live tier imports it from src/index.ts. */
  readonly binding: "exported module function" | "import from ../src/index.js";
  /** What the site's emitter ingests as evidenceRefs, as printed. */
  readonly ingest: string;
  readonly pins: readonly PinId[];
}

/** The observer sites that derive the claude-message ref and emit it. */
const SITES: readonly Site[] = [
  {
    key: "S1",
    name: "production, runWorkflowTask's Claude observer callback",
    file: "src/index.ts",
    binding: "exported module function",
    ingest: "evidenceRefs.slice(0, 32)",
    pins: ["P1", "P2", "P3", "P4", "P5"],
  },
  {
    key: "S2",
    name: "live tier, observerFor's mirror of that callback",
    file: LIVE_SUITE,
    binding: "import from ../src/index.js",
    ingest: "[...evidenceRefs]",
    pins: ["P1", "P2", "P3", "P4", "P5"],
  },
];

const CLOSURE = "claudeMessageEvidenceRef";
/** The derive and the emitted shape, as printed. */
const DERIVE = "claudeMessageEvidenceRef(snapshot.lastMessageId)";
const EMITTED = "messageRef ? [messageRef] : undefined";

/** A file as the TypeScript compiler parses it. */
const parse = (path: string, text: string): ts.SourceFile => ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
/** Code as printed without comments, whitespace collapsed: the shape compared, never the raw text. */
const printed = (node: ts.Node, file: ts.SourceFile): string =>
  ts.createPrinter({ removeComments: true }).printNode(ts.EmitHint.Unspecified, node, file).replace(/\s+/g, " ").trim();
function nodesOf<T extends ts.Node>(root: ts.Node, test: (node: ts.Node) => node is T, found: T[] = []): T[] {
  if (test(root)) found.push(root);
  ts.forEachChild(root, child => {
    nodesOf(child, test, found);
  });
  return found;
}
/** True when `node` lies inside `outer`. */
const within = (node: ts.Node, outer: ts.Node): boolean => node.pos >= outer.pos && node.end <= outer.end;
/** The name a call invokes: f(...) and owner?.f(...) both name f. */
const calleeName = (call: ts.CallExpression): string | undefined =>
  ts.isIdentifier(call.expression) ? call.expression.text : ts.isPropertyAccessExpression(call.expression) ? call.expression.name.text : undefined;
type Binding = ts.VariableDeclaration | ts.ParameterDeclaration | ts.BindingElement | ts.FunctionDeclaration | ts.FunctionExpression
  | ts.ClassDeclaration | ts.ClassExpression | ts.ImportSpecifier | ts.ImportClause | ts.NamespaceImport | ts.ImportEqualsDeclaration | ts.EnumDeclaration;
/** A node that binds a name in some scope: a binding of the closure's name anywhere in a file can shadow the one closure. */
const isBinding = (node: ts.Node): node is Binding =>
  ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isBindingElement(node) || ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) ||
  ts.isClassDeclaration(node) || ts.isClassExpression(node) || ts.isImportSpecifier(node) || ts.isImportClause(node) || ts.isNamespaceImport(node) ||
  ts.isImportEqualsDeclaration(node) || ts.isEnumDeclaration(node);
const binds = (binding: Binding, name: string): boolean => binding.name !== undefined && ts.isIdentifier(binding.name) && binding.name.text === name;
/** Every binding of `name` under `root`, at any depth. */
const bindingsOf = (root: ts.Node, name: string): Binding[] => nodesOf(root, isBinding).filter(binding => binds(binding, name));

/** A site's file as parsed, with what the pins read from it. */
interface Reading {
  readonly file: ts.SourceFile;
  /** The callback passed first to the file's one createClaudeObserver call. */
  readonly callback: ts.ArrowFunction | ts.FunctionExpression | undefined;
  /** The file's one emitObservation declaration: the emitter the callback hands its refs to. */
  readonly emitter: ts.FunctionDeclaration | undefined;
  /** Every binding of the closure's name in the file. */
  readonly closures: readonly Binding[];
  /** Every call of the closure in the file. */
  readonly derives: readonly ts.CallExpression[];
}

/** Reads a site's file in one walk. */
function readSite(path: string, text: string): Reading {
  const file = parse(path, text);
  const observers: ts.CallExpression[] = [];
  const emitters: ts.FunctionDeclaration[] = [];
  const closures: Binding[] = [];
  const derives: ts.CallExpression[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && calleeName(node) === "createClaudeObserver") observers.push(node);
    if (ts.isCallExpression(node) && calleeName(node) === CLOSURE) derives.push(node);
    if (ts.isFunctionDeclaration(node) && node.name?.text === "emitObservation") emitters.push(node);
    if (isBinding(node) && binds(node, CLOSURE)) closures.push(node);
    ts.forEachChild(node, visit);
  };
  visit(file);
  const first = observers.length === 1 ? observers[0].arguments[0] : undefined;
  return {
    file,
    callback: first !== undefined && (ts.isArrowFunction(first) || ts.isFunctionExpression(first)) ? first : undefined,
    emitter: emitters.length === 1 ? emitters[0] : undefined,
    closures,
    derives,
  };
}


/** A bounded constant member name; unresolved keys stay outside the claimed constant-key forms. */
function constantKey(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node)) return constantKey(node.expression);
  if (ts.isComputedPropertyName(node)) return constantKey(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = constantKey(node.left);
    const right = constantKey(node.right);
    return left !== undefined && right !== undefined ? left + right : undefined;
  }
  return undefined;
}

/** Each pin, judged on one site's reading: true when it holds. */
const JUDGES: Readonly<Record<PinId, (site: Site, reading: Reading) => boolean>> = {
  P1: (_site, { file, callback }) => {
    const bound = callback === undefined ? [] : bindingsOf(callback, "messageRef");
    const only = bound.length === 1 ? bound[0] : undefined;
    return (
      only !== undefined &&
      ts.isVariableDeclaration(only) &&
      ts.isVariableDeclarationList(only.parent) &&
      (only.parent.flags & ts.NodeFlags.BlockScoped) === ts.NodeFlags.Const &&
      only.initializer !== undefined &&
      printed(only.initializer, file) === DERIVE
    );
  },
  P2: (_site, { file, callback, emitter }) => {
    if (callback === undefined || emitter === undefined) return false;
    const calls = nodesOf(callback, ts.isCallExpression).filter(call => calleeName(call) === "emitObservation");
    const slot = emitter.parameters.findIndex(parameter => ts.isIdentifier(parameter.name) && parameter.name.text === "evidenceRefs");
    const handed = calls.length === 1 && slot >= 0 ? calls[0].arguments[slot] : undefined;
    // Three: the binding itself and the two reads of the emitted shape.
    const named = nodesOf(callback, ts.isIdentifier).filter(identifier => identifier.text === "messageRef").length;
    return handed !== undefined && printed(handed, file) === EMITTED && named === 3;
  },
  P3: (site, { file, closures }) => {
    const only = closures.length === 1 ? closures[0] : undefined;
    if (only === undefined) return false;
    if (site.binding === "exported module function") {
      return ts.isFunctionDeclaration(only) && only.parent === file && (ts.getModifiers(only) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
    }
    if (!ts.isImportSpecifier(only) || only.propertyName !== undefined || only.isTypeOnly) return false;
    const declaration = only.parent.parent.parent;
    return (
      ts.isImportDeclaration(declaration) &&
      declaration.importClause?.phaseModifier === undefined &&
      ts.isStringLiteral(declaration.moduleSpecifier) &&
      `import from ${declaration.moduleSpecifier.text}` === site.binding
    );
  },
  P4: (_site, { callback }) => {
    if (callback === undefined) return false;
    const derive = bindingsOf(callback, "messageRef").find(ts.isVariableDeclaration)?.initializer;
    const reads = nodesOf(callback, (node): node is ts.Identifier | ts.StringLiteralLike | ts.ElementAccessExpression =>
      (ts.isIdentifier(node) && node.text === "lastMessageId") ||
      (ts.isStringLiteralLike(node) && node.text === "lastMessageId" && !ts.isElementAccessExpression(node.parent)) ||
      (ts.isElementAccessExpression(node) && constantKey(node.argumentExpression) === "lastMessageId"));
    const texts = nodesOf(callback, (node): node is ts.StringLiteral | ts.TemplateLiteralToken => ts.isStringLiteral(node) || ts.isTemplateLiteralToken(node));
    return derive !== undefined && reads.length === 1 && within(reads[0], derive) && !texts.some(text => text.text.includes("claude-message"));
  },
  P5: (site, { file, emitter }) => {
    if (emitter === undefined || emitter.body === undefined) return false;
    const body = emitter.body;
    const uses = nodesOf(body, ts.isIdentifier).filter(identifier => identifier.text === "evidenceRefs");
    const spreads = nodesOf(body, ts.isSpreadAssignment).filter(spread => uses.some(use => within(use, spread)));
    const spread = spreads.length === 1 ? spreads[0] : undefined;
    const ingest = spread !== undefined && ts.isObjectLiteralExpression(spread.parent) ? spread.parent.parent : undefined;
    return (
      spread !== undefined &&
      ingest !== undefined &&
      ts.isCallExpression(ingest) &&
      calleeName(ingest) === "ingest" &&
      uses.every(use => within(use, spread)) &&
      bindingsOf(emitter, "evidenceRefs").length === 1 &&
      printed(spread, file) === `...(evidenceRefs?.length ? { evidenceRefs: ${site.ingest} } : {})` &&
      ts.isObjectLiteralExpression(spread.parent) &&
      // Explicit keys beside the spread can replace its result without mentioning the parameter at all.
      !spread.parent.properties.some(property => property.name !== undefined &&
        (ts.isIdentifier(property.name) ? property.name.text : constantKey(property.name)) === "evidenceRefs")
    );
  },
};

interface Edit {
  readonly file: string;
  /** Real source text, which must occur exactly once in the file: a drift that stopped applying is red, never vacuous. */
  readonly from: string;
  readonly to: string;
}

interface Drift {
  readonly id: string;
  readonly edits: readonly Edit[];
  /** The site:pin pairs it reds, in SITES then pin order: its true cause. */
  readonly reds: readonly string[];
}

/** The wb-p2ef gate (cmd_dce6424b086a) names three drift shapes in its PREP F1: the battery keeps that many G-F4-* drifts. */
const NAMED_DRIFTS = 3;
const LIVE_EMIT = "messageRef ? [messageRef] : undefined);";
const SRC_EMIT = "messageRef ? [messageRef] : undefined,";
const OBSERVER_FOR = "function observerFor(journey: Journey) {";
const SRC_OBSERVER = "const observer = native?.createClaudeObserver((call, snapshot) => {";
const SRC_EMITTER = "evidenceRefs?: readonly string[], subjectBasis?: string): void {";
const REPAIRED = '"claude-message:" + snapshot.lastMessageId.substring(0, 120)';
const SHADOW = 'const claudeMessageEvidenceRef = (id: string | undefined): string | undefined => (id ? "claude-message:" + id.substring(0, 120) : undefined);';
const WRAPPED = "(messageRef ? [messageRef] : undefined)?.map(ref => ref.substring(0, 120))";

/** Each drift shape, applied to an in-memory copy of the real source. */
const DRIFTS: readonly Drift[] = [
  {
    id: "G-F4-CONCAT-LIVE: the live emit restores the 72c-era repair by concatenation when the closure withholds",
    edits: [{ file: LIVE_SUITE, from: LIVE_EMIT, to: `(messageRef ? [messageRef] : undefined) ?? (snapshot.lastMessageId ? [${REPAIRED}] : undefined));` }],
    reds: ["S2:P2", "S2:P4"],
  },
  {
    id: "G-F4-SHADOW-LIVE: a local const claudeMessageEvidenceRef shadows the import inside observerFor",
    edits: [{ file: LIVE_SUITE, from: OBSERVER_FOR, to: `${OBSERVER_FOR}\n  ${SHADOW}` }],
    reds: ["S2:P3"],
  },
  {
    id: "G-F4-WRAP-LIVE+SRC: a post-closure ?.map(ref => ref.substring(0, 120)) around the emit, live and src",
    edits: [
      { file: "src/index.ts", from: SRC_EMIT, to: `${WRAPPED},` },
      { file: LIVE_SUITE, from: LIVE_EMIT, to: `${WRAPPED});` },
    ],
    reds: ["S1:P2", "S2:P2"],
  },
  {
    id: "M-SHADOW-SRC: a local const claudeMessageEvidenceRef shadows the module function around production's callback",
    edits: [{ file: "src/index.ts", from: SRC_OBSERVER, to: `${SHADOW}\n      ${SRC_OBSERVER}` }],
    reds: ["S1:P3"],
  },
  {
    id: "M-PRE-REPAIR-SRC: production trims the id before the closure judges it, so a changed id would be listed",
    edits: [{ file: "src/index.ts", from: DERIVE_LINE, to: "const messageRef = claudeMessageEvidenceRef(snapshot.lastMessageId?.trim());" }],
    reds: ["S1:P1"],
  },
  {
    id: "M-COMPOSE-SRC: production's callback composes a repaired claude-message ref of its own beside the derive",
    edits: [{ file: "src/index.ts", from: DERIVE_LINE, to: `${DERIVE_LINE}\n        const repairedRef = snapshot.lastMessageId ? ${REPAIRED} : undefined;` }],
    reds: ["S1:P4"],
  },
  {
    id: "M-REBIND-SRC: production's emitter rebinds evidenceRefs to cut every ref before it ingests",
    edits: [{ file: "src/index.ts", from: SRC_EMITTER, to: `${SRC_EMITTER}\n        evidenceRefs = evidenceRefs?.map(ref => ref.substring(0, 120));` }],
    reds: ["S1:P5"],
  },
  {
    id: "M-LET-LIVE: the live callback binds messageRef with let and substitutes another ref when the closure withholds",
    edits: [
      {
        file: LIVE_SUITE,
        from: DERIVE_LINE,
        to: 'let messageRef = claudeMessageEvidenceRef(snapshot.lastMessageId);\n    messageRef ??= snapshot.sessionId ? "claude-session:" + snapshot.sessionId : undefined;',
      },
    ],
    reds: ["S2:P1", "S2:P2"],
  },
  {
    id: "M-INGEST-LIVE: the live emitter cuts every ref on its way to the projection",
    edits: [{ file: LIVE_SUITE, from: "{ evidenceRefs: [...evidenceRefs] }", to: "{ evidenceRefs: evidenceRefs.map(ref => ref.substring(0, 120)) }" }],
    reds: ["S2:P5"],
  },
];

const sources = new Map<string, string>();
/** A repository file's text, read once. */
function sourceOf(path: string): string {
  const known = sources.get(path);
  if (known !== undefined) return known;
  const text = readRepo(path);
  sources.set(path, text);
  return text;
}
const readings = new Map<string, Reading>();
/** A real file's reading, parsed once. */
function readingOf(path: string): Reading {
  const known = readings.get(path);
  if (known !== undefined) return known;
  const reading = readSite(path, sourceOf(path));
  readings.set(path, reading);
  return reading;
}
/** The site:pin pairs a reading breaks. */
const broken = (site: Site, reading: Reading): string[] => site.pins.filter(pin => !JUDGES[pin](site, reading)).map(pin => `${site.key}:${pin}`);
const drifted = new Map<string, string[]>();
/** What a drift reds: every site's broken pins, the drift's edits applied to an in-memory copy of the real source. */
function driftReds(drift: Drift): string[] {
  const known = drifted.get(drift.id);
  if (known !== undefined) return known;
  const reds = SITES.flatMap(site => {
    const edits = drift.edits.filter(edit => edit.file === site.file);
    if (edits.length === 0) return broken(site, readingOf(site.file));
    return broken(site, readSite(site.file, edits.reduce((text, edit) => text.split(edit.from).join(edit.to), sourceOf(site.file))));
  });
  drifted.set(drift.id, reds);
  return reds;
}
const strings = (value: unknown): string[] => (Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : []);
const propertyName = (property: ts.PropertyAssignment): string | undefined =>
  ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : undefined;
/** The files a site may live in, read from outside this census: the package's extension entries and its credentialed live tiers. */
function anchoredFiles(): string[] {
  const manifest: unknown = JSON.parse(sourceOf("package.json"));
  const pi = typeof manifest === "object" && manifest !== null && "pi" in manifest ? manifest.pi : undefined;
  const entries = typeof pi === "object" && pi !== null && "extensions" in pi ? strings(pi.extensions) : [];
  const excluded = nodesOf(parse("vitest.config.ts", sourceOf("vitest.config.ts")), ts.isPropertyAssignment)
    .filter(property => propertyName(property) === "exclude")
    .filter(property => ts.isObjectLiteralExpression(property.parent) && ts.isPropertyAssignment(property.parent.parent) && propertyName(property.parent.parent) === "test")
    .flatMap(property => (ts.isArrayLiteralExpression(property.initializer) ? property.initializer.elements.filter(ts.isStringLiteral).map(element => element.text) : []));
  return [...entries.map(entry => normalize(entry)), ...excluded];
}
/** The first 16 hex digits of the sha256 of the JSON text of `parts`. */
const digest16 = (parts: readonly string[]): string => createHash("sha256").update(JSON.stringify(parts)).digest("hex").slice(0, 16);
const JUDGED: string[] = [];

describe("wb-72c.1: the F4 composition guard judges the emitted shape of every observer site, on its parsed source", () => {
  for (const site of SITES) {
    for (const id of site.pins) {
      JUDGED.push(`${site.key}:${id}`);
      it(`${site.key}:${id} ${site.name}: ${PINS.find(pin => pin.id === id)?.requirement ?? "a pin with no requirement"}`, () => {
        expect(JUDGES[id](site, readingOf(site.file)), `${site.key}:${id}`).toBe(true);
      });
    }
  }

  it("ANCHOR: every file the package loads as an extension (package.json pi.extensions) or runs as a credentialed live tier (vitest.config.ts test.exclude) that calls claudeMessageEvidenceRef is exactly one site, and calls it only inside that site's observer callback", () => {
    const anchored = anchoredFiles();
    const calling = anchored.filter(path => existsSync(join(ROOT, path)) && sourceOf(path).includes(CLOSURE) && readingOf(path).derives.length > 0);
    expect(calling.map(path => `${path}:${SITES.filter(site => site.file === path).length}`), "each calling file is exactly one site").toEqual(calling.map(path => `${path}:1`));
    expect(SITES.filter(site => !anchored.includes(site.file)).map(site => site.key), "every site lives in an anchored file").toEqual([]);
    const outside = calling.flatMap(path => {
      const { callback, derives } = readingOf(path);
      return derives.filter(call => callback === undefined || !within(call, callback)).map(() => path);
    });
    expect(outside, "a call of the closure outside the site's observer callback").toEqual([]);
  });

  for (const drift of DRIFTS) {
    JUDGED.push(drift.id.split(":")[0]);
    it(`${drift.id}: red for its true cause, on an in-memory copy of the real source`, () => {
      expect(drift.edits.map(edit => `${edit.file}:${occurrences(sourceOf(edit.file), edit.from)}`), "each edit applies exactly once").toEqual(drift.edits.map(edit => `${edit.file}:1`));
      expect(driftReds(drift)).toEqual(drift.reds);
    });
  }

  it("LIVENESS: every pin of every site is red under some drift, every drift reds some pin, every pin has a drift of its own, every drift alone reds some site's pin, and the gate's named drifts stay", () => {
    const reds = DRIFTS.map(drift => driftReds(drift));
    const pairs = SITES.flatMap(site => site.pins.map(pin => `${site.key}:${pin}`));
    expect(pairs.filter(pair => !reds.some(list => list.includes(pair))), "a pin no drift reds").toEqual([]);
    expect(DRIFTS.filter((_drift, index) => reds[index].length === 0).map(drift => drift.id), "a drift that reds nothing").toEqual([]);
    expect(PINS.filter(pin => !reds.some(list => list.length > 0 && list.every(pair => pair.endsWith(`:${pin.id}`)))).map(pin => pin.id), "a pin with no drift of its own").toEqual([]);
    const alone = (pair: string): boolean => reds.filter(list => list.includes(pair)).length === 1;
    expect(DRIFTS.filter((_drift, index) => !reds[index].some(alone)).map(drift => drift.id), "a drift no site's pin depends on").toEqual([]);
    expect(DRIFTS.filter(drift => drift.id.startsWith("G-F4-")).length, "the gate's named drifts").toBe(NAMED_DRIFTS);
  });

  it("FROZEN SHAPE (standing rule 16): the pins, the sites with their pin lists, the drift battery and the registered rows are their frozen literal", () => {
    expect(PINS.map(pin => `${pin.id}:${digest16([pin.requirement])}`)).toEqual([
      "P1:9ed48f58aa9ea079",
      "P2:50e2bb85cdc8fc49",
      "P3:ad7b2d68eb885bd7",
      "P4:ff08e227886aa75f",
      "P5:f7dbebafa3885922",
    ]);
    expect(SITES.map(site => `${site.key}:${site.pins.join(",")}:${digest16([site.name, site.file, site.binding, site.ingest])}`)).toEqual([
      "S1:P1,P2,P3,P4,P5:59686becfb19bd32",
      "S2:P1,P2,P3,P4,P5:426501fc9dc3c58a",
    ]);
    expect(DRIFTS.map(drift => `${drift.reds.join(",")}:${digest16([drift.id, ...drift.edits.flatMap(edit => [edit.file, edit.from, edit.to])])}`)).toEqual([
      "S2:P2,S2:P4:e9f314f1ec0b339b",
      "S2:P3:b2df9cb32baad445",
      "S1:P2,S2:P2:919c680fc9cf9629",
      "S1:P3:672e5f459a9d0016",
      "S1:P1:b8b000a16f66f7ab",
      "S1:P4:bc985ca7261efe51",
      "S1:P5:caab85e304480350",
      "S2:P1,S2:P2:41b5f9abd8d56048",
      "S2:P5:354d678beb0d8f88",
    ]);
    expect(JUDGED).toEqual([
      "S1:P1",
      "S1:P2",
      "S1:P3",
      "S1:P4",
      "S1:P5",
      "S2:P1",
      "S2:P2",
      "S2:P3",
      "S2:P4",
      "S2:P5",
      "G-F4-CONCAT-LIVE",
      "G-F4-SHADOW-LIVE",
      "G-F4-WRAP-LIVE+SRC",
      "M-SHADOW-SRC",
      "M-PRE-REPAIR-SRC",
      "M-COMPOSE-SRC",
      "M-REBIND-SRC",
      "M-LET-LIVE",
      "M-INGEST-LIVE",
    ]);
  });
});

/** wb-72c.2 F1: the pin roster lives in the published contract, outside this census's literals. */
const PIN_DOC = "docs/workbench/20-evidence-loader-contract.md";
const PIN_HEADING = "Claude message observer pins";

/** F2/F3: these exact quoted/constant-computed member shapes are pinned, not a claim of arbitrary alias resolution. */
const KEY_FORMS = [
  { id: "quoted", key: '"evidenceRefs"', read: '["lastMessageId"]' },
  { id: "computed literal", key: '["evidenceRefs"]', read: '["lastMessageId"]' },
  { id: "computed concatenation", key: '["evidence" + "Refs"]', read: '["lastMessage" + "Id"]' },
  { id: "computed asserted concatenation", key: '[("evidence" + "Refs") as string]', read: '[("lastMessage" + "Id") as string]' },
] as const;

describe("wb-72c.2: outside pin anchor and quoted/computed P4/P5 keys", () => {
  it("F1: docs/20 anchors every requirement, site pin list, judge key and registered site:pin pair outside the test file", () => {
    const section = docsSection(readRepo(PIN_DOC), PIN_HEADING, 2, ["20 — EvidenceLoader contract (workbench.evidence-loader/v1)"]);
    expect(section.ok, section.why).toBe(true);
    expect(section.hasHtml, "the pin anchor is rendered, never hidden in HTML").toBe(false);
    expect(section.blocks.map(block => block.kind)).toEqual(["list"]);
    const block = section.blocks[0];
    const documented = block?.kind === "list" && !block.ordered ? block.items.map(item => item.text) : [];
    expect(PINS.map(pin => `${pin.id}: ${pin.requirement}`), "published requirements, full phrases in order").toEqual(documented);
    const ids = documented.map(line => line.split(":")[0]);
    expect(Object.keys(JUDGES), "every published pin has its judge").toEqual(ids);
    for (const site of SITES) {
      expect(site.pins, `${site.key}: published pin roster`).toEqual(ids);
      expect(JUDGED.filter(row => row.startsWith(`${site.key}:`)), `${site.key}: registered published pins`).toEqual(ids.map(id => `${site.key}:${id}`));
    }
  });

  for (const form of KEY_FORMS) {
    for (const site of SITES) {
      it(`F3 ${site.key}: ${form.id} lastMessageId pre-repair is refused by P4`, () => {
        const original = sourceOf(site.file);
        expect(occurrences(original, DERIVE_LINE), "the pre-repair edit applies once").toBe(1);
        const repair = `(snapshot as unknown as Record<string, string | undefined>)${form.read} = (snapshot as unknown as Record<string, string | undefined>)${form.read}?.trim();`;
        const reading = readSite(site.file, original.replace(DERIVE_LINE, `${repair}\n${DERIVE_LINE}`));
        expect(JUDGES.P4(site, reading), "P4 must see the keyed write before the live derive").toBe(false);
      });
      it(`F2 ${site.key}: ${form.id} evidenceRefs override after the ingest spread is refused by P5`, () => {
        const original = sourceOf(site.file);
        const spread = `...(evidenceRefs?.length ? { evidenceRefs: ${site.ingest} } : {}),`;
        expect(occurrences(original, spread), "the override edit applies once").toBe(1);
        const reading = readSite(site.file, original.replace(spread, `${spread}\n${form.key}: ["claude-session:FAKE-FIXTURE"],`));
        expect(JUDGES.P5(site, reading), "P5 must see the last-key-wins override").toBe(false);
      });
    }
  }
  it("key-form shape: the four named forms keep their exact keys and reads", () => {
    expect(KEY_FORMS.map(row => [row.id, row.key, row.read])).toEqual([
      ["quoted", '"evidenceRefs"', '["lastMessageId"]'],
      ["computed literal", '["evidenceRefs"]', '["lastMessageId"]'],
      ["computed concatenation", '["evidence" + "Refs"]', '["lastMessage" + "Id"]'],
      ["computed asserted concatenation", '[("evidence" + "Refs") as string]', '[("lastMessage" + "Id") as string]'],
    ]);
  });
});

/**
 * wb-rh28 (owner ruling R661 (2); the wb-72c.2 gate cmd_eceb2b7ff7d7 PREP F1-F4, routed as one follow-up). Three gaps of the census
 * above: F1 KEY_FORMS had no anchor outside its own two literals (CT5/CT6 removing a form from both stayed green 59/59); F2/F3 eight
 * keyed escapes passed every row on the real files (P5: N1 a template-expression key, N2 a variable key, N3 a nested spread with a
 * quoted key, N3c a nested spread with a computed key, N10 the spread of a pre-built override; P4: N5 a template-expression key, N6
 * a variable key, N7 Reflect.set/Reflect.get with a concatenated key); F4 the 16 generated F2/F3 rows were not registered (LV1 and
 * LV2 dropped 2 and 8 of them and stayed green).
 *
 * ROSTER (out of file): test/fixtures/claude-message-ref-key-forms.json holds the key forms, the site keys, the escape table and the
 * residual table, in order, each escape and residual with its digest. KEY_FORMS, SITES, ESCAPES and RESIDUALS must equal it, and
 * REGISTRATION reads this file's own task tree: every generated row - the 72c.2 F2/F3 rows and every row below - is registered in
 * run mode exactly as the roster derives it, and each row below records itself after its last assertion.
 *
 * STRICT READING. P4 and P5 above stay as landed; STRICT adds, on the parsed source, the keyed channels they miss. A key folds
 * through string literals, template expressions whose spans fold, and '+' concatenations, nothing else. Strict P5: nothing in the
 * emitter's body folds to evidenceRefs; each member of the ingest object literal beside the ingest spread has a key that resolves
 * (an identifier or string name, or a computed name that folds) and is not __proto__ (a prototype supplies an evidenceRefs the
 * payload lacks); each other spread there resolves through parentheses and conditionals to object literals held to the same rule;
 * a key or a spread that does not resolve is refused. Strict P4: nothing in the callback folds to lastMessageId, and every key the
 * callback names - an element access, a computed member name, the second argument of a Reflect call or of Object.defineProperty -
 * folds; one that does not is refused. ESCAPES puts each form at both sites into an in-memory copy of the real source (nothing is
 * written); each row checks that every other landed pin and the other strict reading still hold, and pins the causes the strict
 * reading names: its true cause. N* are the gate's eight forms; X* are this cut's own, each refused by one rule alone (X1 a
 * __proto__ member, X2 an Object.prototype write in the emitter, X3 a nested computed key bound at module scope; X4-X7 a key bound
 * at module scope, through an element access, Reflect, a computed member name and Object.defineProperty).
 *
 * RESIDUALS (named families, each with a pinned quiet row at both sites): a rewrite the callback or the emitter performs without
 * naming a key, or that code declared outside them performs, is outside a keyed reading - R-ENUM-P4 a whole-snapshot rewrite
 * through a runtime key enumeration before the derive, R-HELPER-P4 a keyed pre-repair performed by a helper declared outside the
 * callback, R-ARGS-P5 an in-place rewrite of the emitter's array argument through arguments, R-OUTSIDE-P5 an evidenceRefs supplied
 * by code declared outside the emitter (a module-scope Object.prototype write). A quiet row reds when its family stops reading
 * quiet (promote it to ESCAPES); the roster reds when one is dropped. This cut does not run the credentialed live tier.
 */
const ROSTER_FILE = "test/fixtures/claude-message-ref-key-forms.json";
type StrictPin = "P4" | "P5";

/** Where a form puts its text: each anchor must occur exactly once in the real file, so a form that stopped applying is red. */
interface Placement {
  /** Module-scope text before the file's first line: outside the callback and the emitter. */
  readonly prelude?: string;
  /** Statements at the head of the emitter's body, before its first statement. */
  readonly emitter?: string;
  /** Members right after the ingest spread, inside the ingest object literal. */
  readonly afterSpread?: string;
  /** Statements right before the derive line, inside the callback. */
  readonly beforeDerive?: string;
}

interface Escape extends Placement {
  readonly id: string;
  readonly pin: StrictPin;
  /** What the form does, as its rows name it. */
  readonly form: string;
  readonly sites: readonly string[];
  /** The causes the strict reading names for it, sorted: its true cause. */
  readonly causes: readonly string[];
}

interface Residual extends Placement {
  readonly id: string;
  readonly pin: StrictPin;
  /** The family the quiet row stands for. */
  readonly family: string;
  readonly sites: readonly string[];
  /** The frozen reading of its quiet row. */
  readonly reading: string;
}

/** The override value every P5 form writes: an obviously fake ref, never a real session. */
const OVERRIDE_REFS = '["claude-session:FAKE-FIXTURE"]';
/** The snapshot as a keyed record, the cast a keyed pre-repair needs. */
const AS_RECORD = "(snapshot as unknown as Record<string, string | undefined>)";
/** The emitter's first statement at both sites: the anchor of the emitter's head. */
const EMITTER_HEAD = "const refKey = JSON.stringify(source);";
/** A key bound at module scope, outside the callback: a fold inside the callback never sees it. */
const OUTER_KEY = 'const MESSAGE_KEY = "lastMessage" + "Id";';

/** The keyed escapes: the gate's named forms (N*) and this cut's own (X*), one per rule that refuses it alone. */
const ESCAPES: readonly Escape[] = [
  {
    id: "N1",
    pin: "P5",
    form: "a template-expression key after the ingest spread",
    sites: ["S1", "S2"],
    causes: ["evidenceRefs key"],
    afterSpread: `[\`evidence\${"Refs"}\`]: ${OVERRIDE_REFS},`,
  },
  {
    id: "N2",
    pin: "P5",
    form: "a variable key bound in the emitter, after the ingest spread",
    sites: ["S1", "S2"],
    causes: ["evidenceRefs key", "unresolved key"],
    emitter: 'const key = "evidenceRefs" as const;',
    afterSpread: "[key]: " + OVERRIDE_REFS + ",",
  },
  {
    id: "N3",
    pin: "P5",
    form: "a nested spread carrying a quoted key, after the ingest spread",
    sites: ["S1", "S2"],
    causes: ["evidenceRefs key"],
    afterSpread: '...{ "evidenceRefs": ' + OVERRIDE_REFS + " },",
  },
  {
    id: "N3c",
    pin: "P5",
    form: "a nested spread carrying a computed-concatenation key, after the ingest spread",
    sites: ["S1", "S2"],
    causes: ["evidenceRefs key"],
    afterSpread: '...{ ["evidence" + "Refs"]: ' + OVERRIDE_REFS + " },",
  },
  {
    id: "N10",
    pin: "P5",
    form: "a pre-built override object with a quoted key, spread after the ingest spread",
    sites: ["S1", "S2"],
    causes: ["evidenceRefs key", "unresolved spread"],
    emitter: 'const override = { "evidenceRefs": ' + OVERRIDE_REFS + " };",
    afterSpread: "...override,",
  },
  {
    id: "X1",
    pin: "P5",
    form: "a quoted __proto__ member naming a prototype bound at module scope",
    sites: ["S1", "S2"],
    causes: ["prototype key"],
    prelude: `const PRESET = { evidenceRefs: ${OVERRIDE_REFS} };`,
    afterSpread: '"__proto__": PRESET,',
  },
  {
    id: "X2",
    pin: "P5",
    form: "an Object.prototype evidenceRefs written in the emitter",
    sites: ["S1", "S2"],
    causes: ["evidenceRefs key"],
    emitter: `Object.defineProperty(Object.prototype, "evidenceRefs", { value: ${OVERRIDE_REFS}, configurable: true });`,
  },
  {
    id: "X3",
    pin: "P5",
    form: "a nested spread whose computed key is bound at module scope",
    sites: ["S1", "S2"],
    causes: ["unresolved key"],
    prelude: 'const OVERRIDE_KEY = ["evidence", "Refs"].join("");',
    afterSpread: `...{ [OVERRIDE_KEY]: ${OVERRIDE_REFS} },`,
  },
  {
    id: "N5",
    pin: "P4",
    form: "a template-expression keyed pre-repair before the derive",
    sites: ["S1", "S2"],
    causes: ["folded lastMessageId key"],
    beforeDerive: `${AS_RECORD}[\`lastMessage\${"Id"}\`] = ${AS_RECORD}[\`lastMessage\${"Id"}\`]?.trim();`,
  },
  {
    id: "N6",
    pin: "P4",
    form: "a variable-keyed pre-repair whose key is bound in the callback",
    sites: ["S1", "S2"],
    causes: ["folded lastMessageId key", "unresolved key"],
    beforeDerive: 'const key = "lastMessage" + "Id";\n' + AS_RECORD + "[key] = " + AS_RECORD + "[key]?.trim();",
  },
  {
    id: "N7",
    pin: "P4",
    form: "a Reflect.set/Reflect.get pre-repair with a concatenated key",
    sites: ["S1", "S2"],
    causes: ["folded lastMessageId key"],
    beforeDerive: 'Reflect.set(snapshot, "lastMessage" + "Id", String(Reflect.get(snapshot, "lastMessage" + "Id") ?? "").trim() || undefined);',
  },
  {
    id: "X4",
    pin: "P4",
    form: "an element-keyed pre-repair whose key is bound at module scope",
    sites: ["S1", "S2"],
    causes: ["unresolved key"],
    prelude: OUTER_KEY,
    beforeDerive: AS_RECORD + "[MESSAGE_KEY] = " + AS_RECORD + "[MESSAGE_KEY]?.trim();",
  },
  {
    id: "X5",
    pin: "P4",
    form: "a Reflect.set/Reflect.get pre-repair whose key is bound at module scope",
    sites: ["S1", "S2"],
    causes: ["unresolved key"],
    prelude: OUTER_KEY,
    beforeDerive: 'Reflect.set(snapshot, MESSAGE_KEY, String(Reflect.get(snapshot, MESSAGE_KEY) ?? "").trim() || undefined);',
  },
  {
    id: "X6",
    pin: "P4",
    form: "an Object.assign write through a computed member name bound at module scope",
    sites: ["S1", "S2"],
    causes: ["unresolved key"],
    prelude: OUTER_KEY,
    beforeDerive: "Object.assign(snapshot, { [MESSAGE_KEY]: undefined });",
  },
  {
    id: "X7",
    pin: "P4",
    form: "an Object.defineProperty write whose key is bound at module scope",
    sites: ["S1", "S2"],
    causes: ["unresolved key"],
    prelude: OUTER_KEY,
    beforeDerive: "Object.defineProperty(snapshot, MESSAGE_KEY, { value: undefined });",
  },
];

/** The named residual families: rewrites that name no key, so no keyed reading sees them. */
const RESIDUALS: readonly Residual[] = [
  {
    id: "R-ENUM-P4",
    pin: "P4",
    family: "a whole-snapshot rewrite through a runtime key enumeration before the derive",
    sites: ["S1", "S2"],
    reading: "quiet",
    beforeDerive: 'Object.assign(snapshot, Object.fromEntries(Object.entries(snapshot).map(([name, value]) => [name, typeof value === "string" ? value.trim() : value])));',
  },
  {
    id: "R-HELPER-P4",
    pin: "P4",
    family: "a keyed pre-repair performed by a helper declared outside the callback",
    sites: ["S1", "S2"],
    reading: "quiet",
    prelude: "function trimLastMessageId(target: { lastMessageId?: string }): void {\n  target.lastMessageId = target.lastMessageId?.trim();\n}",
    beforeDerive: "trimLastMessageId(snapshot);",
  },
  {
    id: "R-ARGS-P5",
    pin: "P5",
    family: "an in-place rewrite of the emitter's array argument through arguments",
    sites: ["S1", "S2"],
    reading: "quiet",
    emitter: 'for (const value of arguments) if (Array.isArray(value)) value.splice(0, value.length, "claude-session:FAKE-FIXTURE");',
  },
  {
    id: "R-OUTSIDE-P5",
    pin: "P5",
    family: "an evidenceRefs supplied by code declared outside the emitter, a module-scope Object.prototype write",
    sites: ["S1", "S2"],
    reading: "quiet",
    prelude: `Object.defineProperty(Object.prototype, "evidenceRefs", { value: ${OVERRIDE_REFS}, configurable: true });`,
  },
];

/** A key folded to its text: string literals, template expressions whose spans fold, and '+' concatenations; nothing else folds. */
function folded(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isTemplateExpression(node)) {
    let text = node.head.text;
    for (const span of node.templateSpans) {
      const part = folded(span.expression);
      if (part === undefined) return undefined;
      text += part + span.literal.text;
    }
    return text;
  }
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = folded(node.left);
    const right = folded(node.right);
    return left !== undefined && right !== undefined ? left + right : undefined;
  }
  return undefined;
}

const sortedUnique = (causes: readonly string[]): string[] => [...new Set(causes)].sort();

/** A member's key: an identifier or string name as written, a computed name folded. */
function memberKey(name: ts.PropertyName): string | undefined {
  if (ts.isComputedPropertyName(name)) return folded(name.expression);
  return ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : undefined;
}

/** What one member beside the ingest spread can put into the payload's evidenceRefs without naming it. */
function memberCauses(member: ts.ObjectLiteralElementLike): string[] {
  if (ts.isSpreadAssignment(member)) return spreadCauses(member.expression);
  const key = memberKey(member.name);
  if (key === undefined) return ["unresolved key"];
  return key === "__proto__" ? ["prototype key"] : [];
}

/** Another spread beside the ingest spread: through parentheses and conditionals to object literals; anything else does not resolve. */
function spreadCauses(expression: ts.Expression): string[] {
  if (ts.isParenthesizedExpression(expression)) return spreadCauses(expression.expression);
  if (ts.isConditionalExpression(expression)) return [...spreadCauses(expression.whenTrue), ...spreadCauses(expression.whenFalse)];
  return ts.isObjectLiteralExpression(expression) ? expression.properties.flatMap(memberCauses) : ["unresolved spread"];
}

/** The ingest spread, found as P5 finds it: the one spread of the emitter's body that holds a use of evidenceRefs. */
function ingestSpread(body: ts.Block): ts.SpreadAssignment | undefined {
  const uses = nodesOf(body, ts.isIdentifier).filter(identifier => identifier.text === "evidenceRefs");
  const spreads = nodesOf(body, ts.isSpreadAssignment).filter(spread => uses.some(use => within(use, spread)));
  return spreads.length === 1 ? spreads[0] : undefined;
}

/** Strict P5: what the emitter holds that could replace or supply evidenceRefs on its way into the payload. */
function ingestCauses({ emitter }: Reading): string[] {
  const body = emitter?.body;
  const spread = body === undefined ? undefined : ingestSpread(body);
  if (body === undefined || spread === undefined) return ["no ingest spread"];
  const named = nodesOf(body, (node): node is ts.Node => folded(node) === "evidenceRefs").map(() => "evidenceRefs key");
  return sortedUnique([...named, ...spread.parent.properties.filter(member => member !== spread).flatMap(memberCauses)]);
}

/** A Reflect call, or Object.defineProperty: the second argument names the property it reads or writes. */
const keyedReflection = (call: ts.CallExpression): boolean =>
  ts.isPropertyAccessExpression(call.expression) &&
  ts.isIdentifier(call.expression.expression) &&
  ((call.expression.expression.text === "Reflect" && ["get", "set", "has", "deleteProperty", "defineProperty", "getOwnPropertyDescriptor"].includes(call.expression.name.text)) ||
    (call.expression.expression.text === "Object" && call.expression.name.text === "defineProperty"));

/** The key a keyed access names: an element access's argument, a computed member name, or keyed reflection's second argument. */
function accessKey(node: ts.Node): { readonly key: ts.Expression | undefined } | undefined {
  if (ts.isElementAccessExpression(node)) return { key: node.argumentExpression };
  if (ts.isComputedPropertyName(node)) return { key: node.expression };
  if (ts.isCallExpression(node) && keyedReflection(node)) return { key: node.arguments.at(1) };
  return undefined;
}

/** Strict P4: what the callback names that could read or rewrite lastMessageId through a key. */
function composeCauses({ callback }: Reading): string[] {
  if (callback === undefined) return ["no callback"];
  const causes: string[] = [];
  const visit = (node: ts.Node): void => {
    if (folded(node) === "lastMessageId") causes.push("folded lastMessageId key");
    const access = accessKey(node);
    if (access !== undefined && (access.key === undefined || folded(access.key) === undefined)) causes.push("unresolved key");
    ts.forEachChild(node, visit);
  };
  visit(callback);
  return sortedUnique(causes);
}

const STRICT: Readonly<Record<StrictPin, (reading: Reading) => string[]>> = { P4: composeCauses, P5: ingestCauses };
const OTHER_PIN: Readonly<Record<StrictPin, StrictPin>> = { P4: "P5", P5: "P4" };

/** A site by its key: a form naming no site is an error, never a skipped row. */
function siteNamed(key: string): Site {
  const site = SITES.find(row => row.key === key);
  if (site === undefined) throw new Error(`${key} names no site`);
  return site;
}

/** The site's real text with a placement applied in memory, and how often each anchor it uses occurred. */
function placed(site: Site, placement: Placement): { readonly text: string; readonly anchors: readonly { readonly name: string; readonly count: number }[] } {
  const spread = `...(evidenceRefs?.length ? { evidenceRefs: ${site.ingest} } : {}),`;
  const anchors: { name: string; count: number }[] = [];
  let text = sourceOf(site.file);
  const insert = (name: string, anchor: string, value: string | undefined, before: boolean): void => {
    if (value === undefined) return;
    anchors.push({ name, count: occurrences(text, anchor) });
    text = text.split(anchor).join(before ? `${value}\n${anchor}` : `${anchor}\n${value}`);
  };
  insert("emitter head", EMITTER_HEAD, placement.emitter, true);
  insert("ingest spread", spread, placement.afterSpread, false);
  insert("derive line", DERIVE_LINE, placement.beforeDerive, true);
  if (placement.prelude !== undefined) text = `${placement.prelude}\n${text}`;
  return { text, anchors };
}

/** The digest the roster pins for a form: its id, pin, wording, sites, causes or reading, and every placement text. */
const escapeDigest = (row: Escape): string =>
  digest16([row.id, row.pin, row.form, row.sites.join(","), row.causes.join(","), row.prelude ?? "", row.emitter ?? "", row.afterSpread ?? "", row.beforeDerive ?? ""]);
const residualDigest = (row: Residual): string =>
  digest16([row.id, row.pin, row.family, row.sites.join(","), row.reading, row.prelude ?? "", row.emitter ?? "", row.afterSpread ?? "", row.beforeDerive ?? ""]);

interface RosterKeyForm {
  readonly id: string;
  readonly key: string;
  readonly read: string;
}
interface RosterEscape {
  readonly id: string;
  readonly pin: string;
  readonly form: string;
  readonly sites: readonly string[];
  readonly causes: readonly string[];
  readonly digest: string;
}
interface RosterResidual {
  readonly id: string;
  readonly pin: string;
  readonly family: string;
  readonly sites: readonly string[];
  readonly reading: string;
  readonly digest: string;
}
interface Roster {
  readonly keyForms: readonly RosterKeyForm[];
  readonly sites: readonly string[];
  readonly escapes: readonly RosterEscape[];
  readonly residuals: readonly RosterResidual[];
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
/** A roster field that must be a string: anything else is a malformed roster, never an empty one. */
function rosterText(row: Record<string, unknown>, field: string): string {
  const value = row[field];
  if (typeof value !== "string") throw new Error(`${ROSTER_FILE}: ${field} is not a string`);
  return value;
}
function rosterTexts(row: Record<string, unknown>, field: string): string[] {
  const value = row[field];
  if (!Array.isArray(value) || !value.every((entry): entry is string => typeof entry === "string")) throw new Error(`${ROSTER_FILE}: ${field} is not a list of strings`);
  return value;
}
function rosterRows(row: Record<string, unknown>, field: string): Record<string, unknown>[] {
  const value = row[field];
  if (!Array.isArray(value) || !value.every(isRecord)) throw new Error(`${ROSTER_FILE}: ${field} is not a list of objects`);
  return value;
}
/** The out-of-file roster, read and shape-checked. */
function loadRoster(): Roster {
  const raw: unknown = JSON.parse(readRepo(ROSTER_FILE));
  if (!isRecord(raw)) throw new Error(`${ROSTER_FILE} is not an object`);
  return {
    keyForms: rosterRows(raw, "keyForms").map(row => ({ id: rosterText(row, "id"), key: rosterText(row, "key"), read: rosterText(row, "read") })),
    sites: rosterTexts(raw, "sites"),
    escapes: rosterRows(raw, "escapes").map(row => ({
      id: rosterText(row, "id"),
      pin: rosterText(row, "pin"),
      form: rosterText(row, "form"),
      sites: rosterTexts(row, "sites"),
      causes: rosterTexts(row, "causes"),
      digest: rosterText(row, "digest"),
    })),
    residuals: rosterRows(raw, "residuals").map(row => ({
      id: rosterText(row, "id"),
      pin: rosterText(row, "pin"),
      family: rosterText(row, "family"),
      sites: rosterTexts(row, "sites"),
      reading: rosterText(row, "reading"),
      digest: rosterText(row, "digest"),
    })),
  };
}

/** The rows below that judged to their last assertion, this run. */
const RH28_JUDGED: string[] = [];

describe("wb-rh28: the key forms anchored out of file, the keyed P4/P5 escapes refused by the strict reading, every generated row registered", () => {
  for (const site of SITES) {
    for (const pin of ["P4", "P5"] as const) {
      it(`wb-rh28 strict ${site.key} ${pin}: the real source holds ${pin} with no strict cause, and a reading with no observer site is refused`, () => {
        const reading = readingOf(site.file);
        expect(JUDGES[pin](site, reading), `${site.key}:${pin}`).toBe(true);
        expect(STRICT[pin](reading), `${site.key}:${pin}: strict causes on the real source`).toEqual([]);
        expect(STRICT[pin](readSite(site.file, "")), `${site.key}:${pin}: a reading with no observer site`).toEqual([pin === "P4" ? "no callback" : "no ingest spread"]);
        RH28_JUDGED.push(`wb-rh28 strict ${site.key} ${pin}`);
      });
    }
  }

  for (const entry of ESCAPES) {
    for (const key of entry.sites) {
      it(`wb-rh28 escape ${entry.id} ${key}: ${entry.form} is refused by the strict ${entry.pin} reading for its true cause (${entry.causes.join(", ")})`, () => {
        const site = siteNamed(key);
        const { text, anchors } = placed(site, entry);
        expect(anchors.filter(anchor => anchor.count !== 1).map(anchor => `${anchor.name}:${anchor.count}`), "each anchor applies exactly once").toEqual([]);
        const reading = readSite(site.file, text);
        expect(PINS.map(pin => pin.id).filter(pin => pin !== entry.pin && !JUDGES[pin](site, reading)), "every other landed pin still holds").toEqual([]);
        expect(STRICT[OTHER_PIN[entry.pin]](reading), `the strict ${OTHER_PIN[entry.pin]} reading names no cause`).toEqual([]);
        expect(STRICT[entry.pin](reading), `the strict ${entry.pin} causes`).toEqual(entry.causes);
        RH28_JUDGED.push(`wb-rh28 escape ${entry.id} ${key}`);
      });
    }
  }

  for (const residual of RESIDUALS) {
    for (const key of residual.sites) {
      it(`wb-rh28 residual ${residual.id} ${key}: ${residual.family}: pinned quiet reading`, () => {
        const site = siteNamed(key);
        const { text, anchors } = placed(site, residual);
        expect(anchors.filter(anchor => anchor.count !== 1).map(anchor => `${anchor.name}:${anchor.count}`), "each anchor applies exactly once").toEqual([]);
        const reading = readSite(site.file, text);
        const loud = [...PINS.map(pin => pin.id).filter(pin => !JUDGES[pin](site, reading)), ...STRICT.P4(reading), ...STRICT.P5(reading)];
        expect(loud.length === 0 ? "quiet" : `loud: ${loud.join(", ")}`, `${residual.id} ${key}: no landed pin and no strict reading sees the family`).toBe(residual.reading);
        RH28_JUDGED.push(`wb-rh28 residual ${residual.id} ${key}`);
      });
    }
  }

  it("wb-rh28 ROSTER (F1): KEY_FORMS, the sites, the escape table and the residual table equal the out-of-file roster, in order, each escape and residual by digest", () => {
    const roster = loadRoster();
    expect(KEY_FORMS.map(form => `${form.id}|${form.key}|${form.read}`), "the 72c.2 key forms").toEqual(roster.keyForms.map(form => `${form.id}|${form.key}|${form.read}`));
    expect(SITES.map(site => site.key), "the site keys").toEqual(roster.sites);
    expect(ESCAPES.map(row => `${row.id}|${row.pin}|${row.form}|${row.sites.join(",")}|${row.causes.join(",")}|${escapeDigest(row)}`), "the escape table").toEqual(
      roster.escapes.map(row => `${row.id}|${row.pin}|${row.form}|${row.sites.join(",")}|${row.causes.join(",")}|${row.digest}`),
    );
    expect(RESIDUALS.map(row => `${row.id}|${row.pin}|${row.family}|${row.sites.join(",")}|${row.reading}|${residualDigest(row)}`), "the residual table").toEqual(
      roster.residuals.map(row => `${row.id}|${row.pin}|${row.family}|${row.sites.join(",")}|${row.reading}|${row.digest}`),
    );
  });

  it("wb-rh28 FROZEN SHAPE (standing rule 16): the escape and residual tables are their frozen literal, and every strict cause has an escape", () => {
    expect(ESCAPES.map(row => `${row.id}:${row.pin}:${row.sites.join(",")}:${row.causes.join("|")}`)).toEqual([
      "N1:P5:S1,S2:evidenceRefs key",
      "N2:P5:S1,S2:evidenceRefs key|unresolved key",
      "N3:P5:S1,S2:evidenceRefs key",
      "N3c:P5:S1,S2:evidenceRefs key",
      "N10:P5:S1,S2:evidenceRefs key|unresolved spread",
      "X1:P5:S1,S2:prototype key",
      "X2:P5:S1,S2:evidenceRefs key",
      "X3:P5:S1,S2:unresolved key",
      "N5:P4:S1,S2:folded lastMessageId key",
      "N6:P4:S1,S2:folded lastMessageId key|unresolved key",
      "N7:P4:S1,S2:folded lastMessageId key",
      "X4:P4:S1,S2:unresolved key",
      "X5:P4:S1,S2:unresolved key",
      "X6:P4:S1,S2:unresolved key",
      "X7:P4:S1,S2:unresolved key",
    ]);
    expect(RESIDUALS.map(row => `${row.id}:${row.pin}:${row.sites.join(",")}:${row.reading}`)).toEqual([
      "R-ENUM-P4:P4:S1,S2:quiet",
      "R-HELPER-P4:P4:S1,S2:quiet",
      "R-ARGS-P5:P5:S1,S2:quiet",
      "R-OUTSIDE-P5:P5:S1,S2:quiet",
    ]);
    expect(sortedUnique(ESCAPES.filter(row => row.pin === "P5").flatMap(row => row.causes)), "the strict P5 causes").toEqual(["evidenceRefs key", "prototype key", "unresolved key", "unresolved spread"]);
    expect(sortedUnique(ESCAPES.filter(row => row.pin === "P4").flatMap(row => row.causes)), "the strict P4 causes").toEqual(["folded lastMessageId key", "unresolved key"]);
  });

  it("wb-rh28 REGISTRATION (F4): every generated row is registered in run mode exactly as the roster derives it, in order, and every row above judged to its last assertion", ({ task }) => {
    const roster = loadRoster();
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push(`${child.name}|${child.mode}`);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const generated = roster.keyForms.flatMap(form =>
      roster.sites.flatMap(site => [
        `F3 ${site}: ${form.id} lastMessageId pre-repair is refused by P4|run`,
        `F2 ${site}: ${form.id} evidenceRefs override after the ingest spread is refused by P5|run`,
      ]),
    );
    expect(registered.filter(row => /^F[23] /.test(row)), "the 72c.2 generated F2/F3 rows").toEqual(generated);
    const rows = [
      ...roster.sites.flatMap(site => ["P4", "P5"].map(pin => `wb-rh28 strict ${site} ${pin}`)),
      ...roster.escapes.flatMap(row => row.sites.map(site => `wb-rh28 escape ${row.id} ${site}`)),
      ...roster.residuals.flatMap(row => row.sites.map(site => `wb-rh28 residual ${row.id} ${site}`)),
    ];
    const prefixed = registered.flatMap(row => {
      const match = /^(wb-rh28 (?:strict|escape|residual) \S+ \S+): .*\|(\w+)$/.exec(row);
      return match === null ? [] : [`${match[1]}|${match[2]}`];
    });
    expect(prefixed, "the strict, escape and residual rows").toEqual(rows.map(row => `${row}|run`));
    expect(RH28_JUDGED, "each of them judged to its last assertion, this run").toEqual(rows);
  });
});

/**
 * wb-4smh, R674/R661 F1-F3: pin the rh28 gate's unfolded emitter keys (L2-A/B), data-carried callback
 * writes (L2-C/D), and conditional/parenthesized spread refusals (FLW-COND/PAREN). These are source readings,
 * never executions of a prototype write or of the credentialed live tier. The landed readings above are unchanged.
 * The extended reading refuses an unresolved reflected key in the emitter and a bulk write into snapshot whose
 * source is not an object literal. It does not claim arbitrary dataflow/alias resolution. Each named form has a
 * true-cause row at both observer sites; an external roster binds its full phrase, placements, causes and sites.
 */
const FOURSMH_ROSTER = "test/fixtures/claude-message-ref-4smh.json";
const FOURSMH_ROWS: readonly Escape[] = [
  {
    id: "L2-A", pin: "P5", form: "Object.defineProperty writes Object.prototype through an unfolded join key inside the emitter",
    sites: ["S1", "S2"], causes: ["unresolved emitter key"],
    emitter: `Object.defineProperty(Object.prototype, ["evidence", "Refs"].join(""), { value: ${OVERRIDE_REFS}, configurable: true });`,
  },
  {
    id: "L2-B", pin: "P5", form: "Reflect.set writes Object.prototype through an unfolded join key inside the emitter",
    sites: ["S1", "S2"], causes: ["unresolved emitter key"],
    emitter: `Reflect.set(Object.prototype, ["evidence", "Refs"].join(""), ${OVERRIDE_REFS});`,
  },
  {
    id: "L2-C", pin: "P4", form: "Object.assign rewrites snapshot from JSON.parse data before the derive",
    sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: `Object.assign(snapshot, JSON.parse('{"lastMessageId":"FAKE-FIXTURE-ID"}'));`,
  },
  {
    id: "L2-D", pin: "P4", form: "Object.assign rewrites snapshot from Object.fromEntries data with a joined key before the derive",
    sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign(snapshot, Object.fromEntries([[["lastMessage", "Id"].join(""), "FAKE-FIXTURE-ID"]]));',
  },
  {
    id: "COND-TRUE", pin: "P5", form: "a conditional nested spread has an unresolved computed key in its true branch",
    sites: ["S1", "S2"], causes: ["unresolved key"],
    afterSpread: `...(kind ? { [kind]: ${OVERRIDE_REFS} } : {}),`,
  },
  {
    id: "COND-FALSE", pin: "P5", form: "a conditional nested spread has an unresolved computed key in its false branch",
    sites: ["S1", "S2"], causes: ["unresolved key"],
    afterSpread: `...(kind ? {} : { [kind]: ${OVERRIDE_REFS} }),`,
  },
  {
    id: "PAREN", pin: "P5", form: "a parenthesized nested object spread has an unresolved computed key",
    sites: ["S1", "S2"], causes: ["unresolved key"],
    afterSpread: `...({ [kind]: ${OVERRIDE_REFS} }),`,
  },
  {
    id: "PAREN-COND", pin: "P5", form: "a multiply parenthesized conditional nested spread has an unresolved computed key",
    sites: ["S1", "S2"], causes: ["unresolved key"],
    afterSpread: `...((kind ? { [kind]: ${OVERRIDE_REFS} } : {})),`,
  },
];

/** F1: reflected property operations in the emitter must name a folded key, even outside the ingest literal. */
function fourSmhIngest(reading: Reading): string[] {
  const body = reading.emitter?.body;
  const causes = ingestCauses(reading);
  if (body === undefined) return causes;
  const unresolved = nodesOf(body, ts.isCallExpression).filter(keyedReflection).some(call => {
    const key = call.arguments.at(1);
    return key === undefined || folded(key) === undefined;
  });
  return sortedUnique([...causes, ...(unresolved ? ["unresolved emitter key"] : [])]);
}

/** F2: a bulk write into snapshot can carry lastMessageId as data without a keyed-access node. */
function fourSmhCompose(reading: Reading): string[] {
  const callback = reading.callback;
  const causes = composeCauses(reading);
  if (callback === undefined) return causes;
  const dataWrite = nodesOf(callback, ts.isCallExpression).some(call => {
    if (!ts.isPropertyAccessExpression(call.expression) || !ts.isIdentifier(call.expression.expression) ||
      call.expression.expression.text !== "Object" || call.expression.name.text !== "assign") return false;
    const target = call.arguments[0];
    return target !== undefined && ts.isIdentifier(target) && target.text === "snapshot" &&
      call.arguments.slice(1).some(source => !ts.isObjectLiteralExpression(source));
  });
  return sortedUnique([...causes, ...(dataWrite ? ["data-carried snapshot write"] : [])]);
}

const FOURSMH_STRICT: Readonly<Record<StrictPin, (reading: Reading) => string[]>> = { P4: fourSmhCompose, P5: fourSmhIngest };
const FOURSMH_REACHED: string[] = [];
const FOURSMH_CONTROLS_REACHED: string[] = [];

interface FourSmhRoster {
  readonly rows: readonly RosterEscape[];
  readonly sites: readonly string[];
}
function fourSmhRoster(): FourSmhRoster {
  const raw: unknown = JSON.parse(readRepo(FOURSMH_ROSTER));
  if (!isRecord(raw)) throw new Error(`${FOURSMH_ROSTER}: not an object`);
  return {
    sites: rosterTexts(raw, "sites"),
    rows: rosterRows(raw, "rows").map(row => ({
      id: rosterText(row, "id"), pin: rosterText(row, "pin"), form: rosterText(row, "form"),
      sites: rosterTexts(row, "sites"), causes: rosterTexts(row, "causes"), digest: rosterText(row, "digest"),
    })),
  };
}

describe("wb-4smh R674 F1-F3: unfolded keys, data-carried writes and nested spread refusals", () => {
  for (const row of FOURSMH_ROWS) {
    for (const key of row.sites) {
      it(`wb-4smh ${row.id} ${key}: ${row.form}`, () => {
        const site = siteNamed(key);
        const { text, anchors } = placed(site, row);
        expect(anchors.every(anchor => anchor.count === 1), "each placement applies exactly once").toBe(true);
        const reading = readSite(site.file, text);
        expect(PINS.filter(pin => pin.id !== row.pin && !JUDGES[pin.id](site, reading)).map(pin => pin.id), "other landed pins hold").toEqual([]);
        expect(FOURSMH_STRICT[OTHER_PIN[row.pin]](reading), "the other strict reading holds").toEqual([]);
        expect(FOURSMH_STRICT[row.pin](reading), "named true cause").toEqual(row.causes);
        FOURSMH_REACHED.push(`wb-4smh ${row.id} ${key}`);
      });
    }
  }

  for (const site of SITES) {
    it(`wb-4smh control ${site.key}: the real source and benign literal writes retain a quiet extended reading`, () => {
      expect(FOURSMH_STRICT.P4(readingOf(site.file))).toEqual([]);
      expect(FOURSMH_STRICT.P5(readingOf(site.file))).toEqual([]);
      const benign = placed(site, {
        emitter: 'Reflect.set(emitNumbers, "benign", 1);',
        beforeDerive: 'Object.assign(snapshot, { benign: "FAKE-FIXTURE" });',
        afterSpread: '...(kind ? { benign: "FAKE-FIXTURE" } : {}), ...({ other: true }),',
      });
      expect(benign.anchors.every(anchor => anchor.count === 1)).toBe(true);
      const reading = readSite(site.file, benign.text);
      expect(FOURSMH_STRICT.P4(reading)).toEqual([]);
      expect(FOURSMH_STRICT.P5(reading)).toEqual([]);
      expect(FOURSMH_STRICT.P4(readSite(site.file, ""))).toEqual(["no callback"]);
      expect(FOURSMH_STRICT.P5(readSite(site.file, ""))).toEqual(["no ingest spread"]);
      FOURSMH_CONTROLS_REACHED.push(`wb-4smh control ${site.key}`);
    });
  }

  it("wb-4smh FROZEN SHAPE: every named requirement, both site pins and the true-cause roster stay", () => {
    expect(FOURSMH_ROWS.map(row => `${row.id}:${row.pin}:${row.sites.join(",")}:${row.causes.join("|")}`)).toEqual([
      "L2-A:P5:S1,S2:unresolved emitter key",
      "L2-B:P5:S1,S2:unresolved emitter key",
      "L2-C:P4:S1,S2:data-carried snapshot write",
      "L2-D:P4:S1,S2:data-carried snapshot write",
      "COND-TRUE:P5:S1,S2:unresolved key",
      "COND-FALSE:P5:S1,S2:unresolved key",
      "PAREN:P5:S1,S2:unresolved key",
      "PAREN-COND:P5:S1,S2:unresolved key",
    ]);
  });

  it("wb-4smh ROSTER: full requirements, causes and placement digests equal the external source of truth", () => {
    const roster = fourSmhRoster();
    expect(SITES.map(site => site.key)).toEqual(roster.sites);
    expect(FOURSMH_ROWS.map(row => `${row.id}|${row.pin}|${row.form}|${row.sites.join(",")}|${row.causes.join(",")}|${escapeDigest(row)}`)).toEqual(
      roster.rows.map(row => `${row.id}|${row.pin}|${row.form}|${row.sites.join(",")}|${row.causes.join(",")}|${row.digest}`),
    );
  });

  it("wb-4smh REGISTRATION: every externally required row is registered in run mode and reached its last assertion", ({ task }) => {
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push(`${child.name}|${child.mode}`);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const roster = fourSmhRoster();
    const names = roster.rows.flatMap(row => row.sites.map(site => `wb-4smh ${row.id} ${site}`));
    expect(registered.filter(row => /^wb-4smh (?:L2-|COND-|PAREN)/.test(row))).toEqual(
      roster.rows.flatMap(row => row.sites.map(site => `wb-4smh ${row.id} ${site}: ${row.form}|run`)),
    );
    expect(FOURSMH_REACHED).toEqual(names);
  });
});

/**
 * wb-celw cut #3 (R685 F1-F4, rule-19 frozen enumerate-the-resolvable form).
 * PINNED REFUSALS, and no broader claim: every G-*, S-*, U1-*, U2-* and
 * R-ENUM-P4-PROMOTED form in CELW_ROWS, at S1 and S2, with its exact placement
 * and cause digest in CELW_ROSTER. Each row pins its own spelling, not the
 * category its form belongs to (wb-561n F2): the landing-242 gate's LEG 2 read
 * 34 more families of those categories quiet here (22 P5, 12 P4), among them the
 * P4 spread-of-const asymmetry (celwP4 unwraps a spread argument with celwTarget,
 * celwP5 with celwResolve), destructured, bound, globalThis-owned and spread-fed
 * callees, comma and conditional targets, object-rest and for-in/for-of write
 * positions, runtime-reached prototypes, and the alias bound below. The wb-561n
 * section at the end of this file pins 27 of them refused and names 7 residuals.
 * NAMED BOUND (wb-561n F3): celwResolve follows a binding only when it is the one
 * VariableDeclaration of its name inside the callback or emitter body, a const,
 * declared before the use; it never follows an external binding (module scope)
 * or a mutable (let or var) alias. The bound's five LEG-2 families (let and
 * module-scope aliases) are named residuals with pinned quiet rows in W561N_QUIET.
 * NAMED QUIET RESIDUALS: R-HELPER-P4 (effect inside an outside helper),
 * R-ARGS-P5 (arguments rewrite) and R-OUTSIDE-P5 (module-scope prototype write)
 * are CELW_QUIET rows at both sites with external roster anchors. Other unseen
 * modes are not asserted absent. The landed R-ENUM-P4 quiet row describes only
 * the earlier keyed reading; this cut pins its promoted refusal separately.
 * All placements are parsed, never executed (including prototype writes).
 */
const CELW_ROSTER = "test/fixtures/claude-message-ref-celw.json";
const CELW_ROWS: readonly Escape[] = [
  // Respinned R685 U1/U2: independent syntactic variants at both observer sites, never executed.
  { id: "G-P5-ELEMENT-PROTOTYPE", pin: "P5", form: "element-access Object prototype receives an unfolded keyed assignment", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object["prototype"][["evidence", "Refs"].join("")] = ["claude-session:FAKE-FIXTURE"];' },
  { id: "G-P5-DELETE", pin: "P5", form: "delete writes an unrelated Object.prototype key", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'delete Object.prototype.benign;' },
  { id: "G-P5-DELETE-ELEMENT", pin: "P5", form: "delete writes a computed key on a parenthesized element-access prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'delete (Object)["prototype"][["ben", "ign"].join("")];' },
  { id: "G-P5-UNARY", pin: "P5", form: "postfix increment writes Object.prototype without an assignment node", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.prototype.benign++;' },
  { id: "G-P5-PREFIX", pin: "P5", form: "prefix decrement writes a member of a parenthesized element-access prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: '--(Object["prototype"]).benign;' },
  { id: "G-P5-PAREN-CALLEE", pin: "P5", form: "parenthesized built-in owner bulk-writes into Object.prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: '(Object).assign(Object.prototype, JSON.parse(\'{"evidenceRefs":["claude-session:FAKE-FIXTURE"]}\'));' },
  { id: "G-P5-PAREN-PROTOTYPE", pin: "P5", form: "Reflect writes through a parenthesized element-access prototype target", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Reflect.set((Object)["prototype"], "benign", 1);' },
  { id: "G-P4-PAREN-CALLEE", pin: "P4", form: "parenthesized built-in owner bulk-writes parsed data into snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: '(Object).assign(snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "G-P4-ELEMENT-OWNER", pin: "P4", form: "parenthesized element owner and target bulk-write parsed descriptors", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: '(Object)["defineProperties"]((snapshot), JSON.parse(\'{"lastMessageId":{"value":"FAKE-FIXTURE-ID"}}\'));' },
  { id: "G-P4-SPREAD-PAREN", pin: "P4", form: "parenthesized built-in owner consumes a spread of snapshot and parsed data", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: '(Object).assign(...[snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\')]);' },
  { id: "G-P5-TARGET-ALIAS", pin: "P5", form: "locally visible prototype alias receives a key-independent write", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'const prototypeTarget = Object.prototype; Object.assign(prototypeTarget, JSON.parse(\'{"benign":1}\'));' },
  { id: "G-P5-CALL-CALLEE", pin: "P5", form: "Object.assign.call writes through a prototype argument", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign.call(Object, Object.prototype, JSON.parse(\'{"benign":1}\'));' },
  { id: "G-P5-REFLECT-APPLY", pin: "P5", form: "Reflect.apply invokes a built-in writer on the prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Reflect.apply(Object.assign, Object, [Object.prototype, JSON.parse(\'{"benign":1}\')]);' },
  { id: "G-P4-TARGET-ALIAS", pin: "P4", form: "locally visible snapshot alias receives a parsed bulk source", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'const snapshotTarget = snapshot; Object.assign(snapshotTarget, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "G-P4-CALL-CALLEE", pin: "P4", form: "Object.assign.call writes parsed data to snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign.call(Object, snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "G-P4-REFLECT-APPLY", pin: "P4", form: "Reflect.apply invokes built-in bulk writer with parsed snapshot data", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Reflect.apply(Object.assign, Object, [snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\')]);' },
  { id: "G-P5-ASSIGN-DIRECT", pin: "P5", form: "the prototype slot itself receives a new value", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.prototype = { benign: 1 };' },
  { id: "G-P5-SET-PROTOTYPE", pin: "P5", form: "setPrototypeOf changes the prototype object itself", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.setPrototypeOf(Object.prototype, { benign: 1 });' },
  { id: "G-P5-DYNAMIC-CALLEE", pin: "P5", form: "unfolded built-in writer name must not silently bypass a prototype target", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object[["as", "sign"].join("")](Object.prototype, JSON.parse(\'{"benign":1}\'));' },
  { id: "G-P4-DYNAMIC-CALLEE", pin: "P4", form: "unfolded built-in writer name must not silently bypass a snapshot target", sites: ["S1", "S2"], causes: ["data-carried snapshot write", "unresolved key"],
    beforeDerive: 'Object[["as", "sign"].join("")](snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "G-P4-APPLY-CALLEE", pin: "P4", form: "Object.assign.apply writes parsed data through an array argument", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign.apply(Object, [snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\')]);' },
  { id: "G-P5-DELETE-SLOT", pin: "P5", form: "delete writes the Object prototype slot itself", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'delete Object["prototype"];' },
  { id: "G-P5-INCREMENT-SLOT", pin: "P5", form: "update writes the Object prototype slot itself", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.prototype++;' },
  { id: "G-P5-DEFINE-SLOT", pin: "P5", form: "defineProperty writes the Object prototype slot", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.defineProperty(Object, "prototype", { value: { benign: 1 } });' },
  { id: "G-P5-REFLECT-SLOT", pin: "P5", form: "Reflect.set writes the Object prototype slot", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Reflect.set(Object, "prototype", { benign: 1 });' },
  { id: "G-P4-CALL-ELEMENT", pin: "P4", form: "computed built-in writer through call consumes parsed snapshot data", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object["assign"].call(Object, snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "G-P5-DEFPROPS-SLOT", pin: "P5", form: "defineProperties writes the Object prototype slot through descriptors", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.defineProperties(Object, { prototype: { value: { benign: 1 } } });' },
  { id: "G-P5-ASSIGN-SLOT", pin: "P5", form: "assign writes the Object prototype slot through a source literal", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign(Object, { prototype: { benign: 1 } });' },
  { id: "G-P5-DEFPROPS-COMPUTED", pin: "P5", form: "defineProperties writes a computed prototype descriptor", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.defineProperties(Object, { ["proto" + "type"]: { value: { benign: 1 } } });' },
  { id: "S-ELEM-P5", pin: "P5", form: "computed Object.prototype assignment", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: `(Object.prototype as unknown as Record<string, unknown>)[["evidence", "Refs"].join("")] = ${OVERRIDE_REFS};` },
  { id: "S-ELEMCALL-P5", pin: "P5", form: "element-access Object.defineProperty prototype write", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: `Object["defineProperty"](Object.prototype, ["evidence", "Refs"].join(""), { value: ${OVERRIDE_REFS}, configurable: true });` },
  { id: "S-DEFPROPS-P5", pin: "P5", form: "Object.defineProperties prototype write with data-carried key", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: `Object.defineProperties(Object.prototype, { [["evidence", "Refs"].join("")]: { value: ${OVERRIDE_REFS} } });` },
  { id: "S-ASSIGN-PROTO-P5", pin: "P5", form: "Object.assign prototype write from parsed data", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign(Object.prototype, JSON.parse(\'{"evidenceRefs":["claude-session:FAKE-FIXTURE"]}\'));' },
  { id: "S-ALIAS-P5", pin: "P5", form: "locally visible alias of Object.defineProperty writing prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: `const define = Object.defineProperty; define(Object.prototype, ["evidence", "Refs"].join(""), { value: ${OVERRIDE_REFS} });` },
  { id: "S-PAREN-TARGET-P4", pin: "P4", form: "parenthesized snapshot target and non-literal assign source", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign((snapshot), JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "S-DEFPROPS-P4", pin: "P4", form: "Object.defineProperties bulk snapshot write from parsed descriptors", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.defineProperties(snapshot, JSON.parse(\'{"lastMessageId":{"value":"FAKE-FIXTURE-ID"}}\'));' },
  { id: "S-AS-TARGET-P4", pin: "P4", form: "asserted snapshot target and non-literal assign source", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign(snapshot as unknown as Record<string, unknown>, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "S-ELEMCALL-ASSIGN-P4", pin: "P4", form: "element-access Object.assign and non-literal source", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object["assign"](snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "S-SPREAD-ARG-P4", pin: "P4", form: "spread arguments carrying snapshot and non-literal source", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign(...[snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\')]);' },
  { id: "S-ALIAS-ASSIGN-P4", pin: "P4", form: "locally visible alias of Object.assign writing snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'const merge = Object.assign; merge(snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "S-SPREAD-LIT-P4", pin: "P4", form: "literal spread of parsed data is a non-literal bulk source", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign(snapshot, { ...JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\') });' },
  { id: "R-ENUM-P4-PROMOTED", pin: "P4", form: "runtime enumeration of snapshot keys is a non-literal bulk source", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: RESIDUALS[0].beforeDerive },
  // Refusal #2 U1(a-e)/U2(a-b), at each site. They are visible syntax, not external effects.
  { id: "U1-SPREAD-PROTO", pin: "P5", form: "U1(a) spread argument array writes Object.prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign(...[Object.prototype, JSON.parse(\'{"benign":1}\')]);' },
  { id: "U1-CONST-APPLY", pin: "P5", form: "U1(b) visible const array carries prototype through Object.assign.apply", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'const localArgs = [Object.prototype, JSON.parse(\'{"benign":1}\')]; Object.assign.apply(Object, localArgs);' },
  { id: "U1-OWNER-ALIAS", pin: "P5", form: "U1(c) visible const Object owner bulk-writes prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'const Builtin = Object; Builtin.assign(Object.prototype, JSON.parse(\'{"benign":1}\'));' },
  { id: "U1-PARSED-SLOT", pin: "P5", form: "U1(d) parsed source can write Object prototype slot", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign(Object, JSON.parse(\'{"prototype":{"benign":1}}\'));' },
  { id: "U1-DESTRUCTURE", pin: "P5", form: "U1(e) destructuring target writes a prototype member", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: '({ benign: Object.prototype.benign } = { benign: 1 });' },
  { id: "U2-CONST-APPLY", pin: "P4", form: "U2(a) visible const array carries snapshot and parsed data through apply", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'const localArgs = [snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\')]; Object.assign.apply(Object, localArgs);' },
  { id: "U2-OWNER-ALIAS", pin: "P4", form: "U2(b) visible const Object owner writes parsed data into snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'const Builtin = Object; Builtin.assign(snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
];
/** The cut-3 named external-effect families, each with an in-census quiet row (wb-561n re-reads them and names seven more). */
const CELW_QUIET: readonly Residual[] = [RESIDUALS[1], RESIDUALS[2], RESIDUALS[3]];

/** Unwrap only syntax that preserves the expression's target, not arbitrary dataflow. */
function celwTarget(node: ts.Expression | undefined): ts.Expression | undefined {
  if (node === undefined) return undefined;
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) ||
    ts.isNonNullExpression(node) || ts.isSatisfiesExpression(node)) return celwTarget(node.expression);
  return node;
}

/** Resolve only a visible, unique const initializer, never an external binding or a mutable alias. */
function celwBinding(node: ts.Expression, body: ts.Block, at: ts.Node): ts.Expression | undefined {
  if (!ts.isIdentifier(node)) return undefined;
  const visible = bindingsOf(body, node.text).filter(ts.isVariableDeclaration);
  const binding = visible.length === 1 ? visible[0] : undefined;
  return binding !== undefined && ts.isVariableDeclarationList(binding.parent) &&
    (binding.parent.flags & ts.NodeFlags.Const) !== 0 && binding.pos < at.pos ? binding.initializer : undefined;
}

/** A locally visible const alias to the target; cycle-limited to the callback/emitter's own bindings. */
function celwResolve(node: ts.Expression | undefined, body: ts.Block, at: ts.Node, seen: ReadonlySet<string> = new Set()): ts.Expression | undefined {
  const target = celwTarget(node);
  if (target === undefined || !ts.isIdentifier(target) || seen.has(target.text)) return target;
  const binding = celwBinding(target, body, at);
  return binding === undefined ? target : celwResolve(binding, body, at, new Set([...seen, target.text]));
}

/** A syntax-preserving property access; the owner can itself be parenthesized. */
function celwMember(node: ts.Expression): { readonly owner: ts.Expression; readonly name: string } | undefined {
  const target = celwTarget(node);
  if (target !== undefined && ts.isPropertyAccessExpression(target)) return { owner: celwTarget(target.expression) ?? target.expression, name: target.name.text };
  if (target !== undefined && ts.isElementAccessExpression(target) && target.argumentExpression !== undefined) {
    const name = folded(target.argumentExpression);
    return name === undefined ? undefined : { owner: celwTarget(target.expression) ?? target.expression, name };
  }
  return undefined;
}

/** A locally visible const alias to a built-in method; never assume external bindings. */
function celwMethodExpression(node: ts.Expression, body: ts.Block, at: ts.Node): string | undefined {
  const resolved = celwResolve(node, body, at);
  const member = resolved === undefined ? undefined : celwMember(resolved);
  const owner = member === undefined ? undefined : celwResolve(member.owner, body, at);
  return owner !== undefined && ts.isIdentifier(owner) ? `${owner.text}.${member?.name}` : undefined;
}

/** An unresolved computed writer on the built-in owner is not a safe omission. */
function celwUnknownObjectMember(node: ts.Expression): boolean {
  const target = celwTarget(node);
  if (target === undefined || !ts.isElementAccessExpression(target)) return false;
  const owner = celwTarget(target.expression);
  return owner !== undefined && ts.isIdentifier(owner) && owner.text === "Object" &&
    (target.argumentExpression === undefined || folded(target.argumentExpression) === undefined);
}

interface CelwInvocation {
  readonly method: string | undefined;
  readonly args: readonly ts.Expression[];
}
/** Direct, .call and .apply invocations of a visible built-in writer share one argument reading. */
function celwInvocation(call: ts.CallExpression, body: ts.Block): CelwInvocation {
  const direct = celwMethodExpression(call.expression, body, call);
  if (direct !== undefined && direct !== "Reflect.apply") return { method: direct, args: call.arguments };
  const wrapper = celwMember(call.expression);
  if (wrapper !== undefined && (wrapper.name === "call" || wrapper.name === "apply")) {
    const method = celwMethodExpression(wrapper.owner, body, call);
    if (method !== undefined) {
      if (wrapper.name === "call") return { method, args: call.arguments.slice(1) };
      const array = celwResolve(call.arguments[1], body, call);
      return { method, args: array !== undefined && ts.isArrayLiteralExpression(array) ? array.elements : [] };
    }
  }
  if (celwMethodExpression(call.expression, body, call) === "Reflect.apply") {
    const method = call.arguments[0] === undefined ? undefined : celwMethodExpression(call.arguments[0], body, call);
    const array = celwResolve(call.arguments[2], body, call);
    return { method, args: array !== undefined && ts.isArrayLiteralExpression(array) ? array.elements : [] };
  }
  return { method: undefined, args: call.arguments };
}

/** Does this expression name the built-in prototype in this reading? */
function celwPrototype(node: ts.Expression | undefined, body: ts.Block, at: ts.Node): boolean {
  const target = celwResolve(node, body, at);
  const member = target === undefined ? undefined : celwMember(target);
  return member !== undefined && ts.isIdentifier(member.owner) && member.owner.text === "Object" && member.name === "prototype";
}

/** Recognize a key-independent write, not a read, on Object.prototype. */
function celwPrototypeMember(node: ts.Expression, body: ts.Block, at: ts.Node): boolean {
  const target = celwTarget(node);
  return (target !== undefined && (ts.isElementAccessExpression(target) || ts.isPropertyAccessExpression(target))) &&
    celwPrototype(target.expression, body, at);
}

/** A source that visibly writes Object's prototype slot, including parsed constant data. */
function celwPrototypeSource(node: ts.Expression): boolean {
  const source = celwTarget(node);
  if (source !== undefined && ts.isObjectLiteralExpression(source)) return source.properties.some(property =>
    property.name !== undefined && memberKey(property.name) === "prototype");
  if (source === undefined || !ts.isCallExpression(source) || celwMember(source.expression)?.name !== "parse") return false;
  const owner = celwMember(source.expression)?.owner;
  const input = source.arguments[0];
  if (owner === undefined || !ts.isIdentifier(owner) || owner.text !== "JSON" || input === undefined || !ts.isStringLiteral(input)) return false;
  try {
    const parsed: unknown = JSON.parse(input.text);
    return isRecord(parsed) && Object.hasOwn(parsed, "prototype");
  } catch {
    return false;
  }
}

/** A destructuring assignment target can write nested prototype members. */
function celwPrototypePattern(node: ts.Expression, body: ts.Block, at: ts.Node): boolean {
  const target = celwTarget(node);
  if (target === undefined) return false;
  if (celwPrototypeMember(target, body, at) || celwPrototype(target, body, at)) return true;
  if (ts.isObjectLiteralExpression(target)) return target.properties.some(property =>
    ts.isPropertyAssignment(property) && celwPrototypePattern(property.initializer, body, at));
  if (ts.isArrayLiteralExpression(target)) return target.elements.some(element =>
    ts.isExpression(element) && celwPrototypePattern(element, body, at));
  if (ts.isBinaryExpression(target) && target.operatorToken.kind === ts.SyntaxKind.EqualsToken) return celwPrototypePattern(target.left, body, at);
  return ts.isSpreadElement(target) && celwPrototypePattern(target.expression, body, at);
}

/** Detect the write POSITION, independent of the property key's spelling. */
function celwPrototypeWrite(node: ts.Node, body: ts.Block): boolean {
  if (ts.isBinaryExpression(node)) {
    return node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment &&
      celwPrototypePattern(node.left, body, node);
  }
  if (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) {
    return (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) &&
      (celwPrototypeMember(node.operand, body, node) || celwPrototype(node.operand, body, node));
  }
  if (ts.isDeleteExpression(node)) return celwPrototypeMember(node.expression, body, node) || celwPrototype(node.expression, body, node);
  if (ts.isCallExpression(node)) {
    const { method, args } = celwInvocation(node, body);
    // A property API can write *onto* the prototype or write the prototype
    // slot on Object. Neither case depends on the key's literal spelling.
    const first = args[0];
    const spread = first !== undefined && ts.isSpreadElement(first) ? celwResolve(first.expression, body, node) : undefined;
    const argumentsList = spread !== undefined && ts.isArrayLiteralExpression(spread) ? spread.elements : args;
    const target = argumentsList[0];
    const resolved = celwResolve(target, body, node);
    const keyedSlot = resolved !== undefined && ts.isIdentifier(resolved) && resolved.text === "Object" &&
      argumentsList[1] !== undefined && folded(argumentsList[1]) === "prototype";
    if (keyedSlot && (method === "Object.defineProperty" || method === "Reflect.set" ||
      method === "Reflect.defineProperty" || method === "Reflect.deleteProperty")) return true;
    const objectTarget = resolved !== undefined && ts.isIdentifier(resolved) && resolved.text === "Object";
    if (objectTarget && (method === "Object.assign" || method === "Object.defineProperties") &&
      argumentsList.slice(1).some(celwPrototypeSource)) return true;
    return celwPrototype(target, body, node) && (
      method === "Object.assign" || method === "Object.defineProperty" || method === "Object.defineProperties" ||
      method === "Reflect.set" || method === "Reflect.defineProperty" || method === "Reflect.deleteProperty" ||
      method === "Object.setPrototypeOf" || method === "Reflect.setPrototypeOf" ||
      (method === undefined && celwUnknownObjectMember(node.expression)));
  }
  return false;
}

/** P5 classifier for the named placement forms in CELW_ROWS. */
function celwP5(reading: Reading): string[] {
  const body = reading.emitter?.body;
  const causes = fourSmhIngest(reading);
  if (body === undefined) return causes;
  const writes = nodesOf(body, (node): node is ts.Node => celwPrototypeWrite(node, body));
  return sortedUnique([...causes, ...(writes.length > 0 ? ["prototype write"] : [])]);
}

/** A literal containing a spread of data is not a literal-only source. */
function celwLiteralOnly(node: ts.Expression): boolean {
  const source = celwTarget(node);
  return source !== undefined && ts.isObjectLiteralExpression(source) &&
    source.properties.every(property => !ts.isSpreadAssignment(property) || celwLiteralOnly(property.expression));
}

/** P4 classifier for the named non-literal bulk-write forms in CELW_ROWS. */
function celwP4(reading: Reading): string[] {
  const callback = reading.callback;
  const causes = composeCauses(reading);
  if (callback === undefined || !ts.isBlock(callback.body)) return causes;
  const body = callback.body;
  const writes = nodesOf(body, ts.isCallExpression).some(call => {
    const { method, args } = celwInvocation(call, body);
    // Spread calls can carry the target and source inside one array argument.
    const first = args[0];
    const spread = first !== undefined && ts.isSpreadElement(first) ? celwTarget(first.expression) : undefined;
    const argumentsList = spread !== undefined && ts.isArrayLiteralExpression(spread) ? spread.elements : args;
    const target = argumentsList[0];
    const unwrapped = target !== undefined && ts.isExpression(target) ? celwResolve(target, body, call) : undefined;
    if (unwrapped === undefined || !ts.isIdentifier(unwrapped) || unwrapped.text !== "snapshot") return false;
    const dataSource = argumentsList.slice(1).some(source => ts.isExpression(source) && !celwLiteralOnly(source));
    if (method === "Object.assign") return dataSource;
    if (method === "Object.defineProperties") return argumentsList.length < 2 || dataSource;
    if (method === undefined && celwUnknownObjectMember(call.expression)) return dataSource;
    return false;
  });
  return sortedUnique([...causes, ...(writes ? ["data-carried snapshot write"] : [])]);
}
const CELW_STRICT: Readonly<Record<StrictPin, (reading: Reading) => string[]>> = { P4: celwP4, P5: celwP5 };
const CELW_REACHED: string[] = [];

describe("wb-celw R685: enumerated emitter and snapshot-write refusals with pinned quiet residuals", () => {
  for (const row of CELW_ROWS) {
    for (const key of row.sites) {
      it(`wb-celw ${row.id} ${key}: ${row.form}`, () => {
        const site = siteNamed(key);
        const { text, anchors } = placed(site, row);
        expect(anchors.every(anchor => anchor.count === 1), "every insertion anchor applies once").toBe(true);
        const reading = readSite(site.file, text);
        expect(PINS.filter(pin => pin.id !== row.pin && !JUDGES[pin.id](site, reading)).map(pin => pin.id), "other landed pins hold").toEqual([]);
        expect(CELW_STRICT[OTHER_PIN[row.pin]](reading), "the other strict reading stays quiet").toEqual([]);
        expect(CELW_STRICT[row.pin](reading), "the enumerated reading names the true cause").toEqual(row.causes);
        CELW_REACHED.push(`wb-celw ${row.id} ${key}`);
      });
    }
  }
  for (const residual of CELW_QUIET) {
    for (const key of residual.sites) {
      it(`wb-celw quiet ${residual.id} ${key}: ${residual.family}`, () => {
        const site = siteNamed(key);
        const { text, anchors } = placed(site, residual);
        expect(anchors.every(anchor => anchor.count === 1), "every insertion anchor applies once").toBe(true);
        const reading = readSite(site.file, text);
        expect(PINS.filter(pin => !JUDGES[pin.id](site, reading)).map(pin => pin.id), "landed pins stay quiet").toEqual([]);
        expect(CELW_STRICT.P4(reading), "no snapshot write is seen").toEqual([]);
        expect(CELW_STRICT.P5(reading), "no prototype write is seen").toEqual([]);
        CELW_REACHED.push(`wb-celw quiet ${residual.id} ${key}`);
      });
    }
  }
  for (const site of SITES) {
    it(`wb-celw control ${site.key}: literal snapshot writes and unrelated targets stay quiet`, () => {
      const benign = placed(site, {
        emitter: 'Reflect.set(emitNumbers, "benign", 1); Object.assign(emitNumbers, { benign: 1 });',
        beforeDerive: 'Object.assign(snapshot, { benign: "FAKE-FIXTURE" }); Object.assign({}, JSON.parse("{}"));',
      });
      expect(benign.anchors.every(anchor => anchor.count === 1)).toBe(true);
      expect(CELW_STRICT.P4(readingOf(site.file))).toEqual([]);
      expect(CELW_STRICT.P5(readingOf(site.file))).toEqual([]);
      expect(CELW_STRICT.P4(readSite(site.file, benign.text))).toEqual([]);
      expect(CELW_STRICT.P5(readSite(site.file, benign.text))).toEqual([]);
      CELW_REACHED.push(`wb-celw control ${site.key}`);
    });
  }
  it("wb-celw FROZEN SHAPE: every judged requirement has its full site count and cause pinned at cut time", () => {
    expect(CELW_ROWS.map(row => `${row.id}:${row.pin}:${row.sites.length}:${row.causes.join("|")}`)).toEqual([
      "G-P5-ELEMENT-PROTOTYPE:P5:2:prototype write",
      "G-P5-DELETE:P5:2:prototype write",
      "G-P5-DELETE-ELEMENT:P5:2:prototype write",
      "G-P5-UNARY:P5:2:prototype write",
      "G-P5-PREFIX:P5:2:prototype write",
      "G-P5-PAREN-CALLEE:P5:2:prototype write",
      "G-P5-PAREN-PROTOTYPE:P5:2:prototype write",
      "G-P4-PAREN-CALLEE:P4:2:data-carried snapshot write",
      "G-P4-ELEMENT-OWNER:P4:2:data-carried snapshot write",
      "G-P4-SPREAD-PAREN:P4:2:data-carried snapshot write",
      "G-P5-TARGET-ALIAS:P5:2:prototype write",
      "G-P5-CALL-CALLEE:P5:2:prototype write",
      "G-P5-REFLECT-APPLY:P5:2:prototype write",
      "G-P4-TARGET-ALIAS:P4:2:data-carried snapshot write",
      "G-P4-CALL-CALLEE:P4:2:data-carried snapshot write",
      "G-P4-REFLECT-APPLY:P4:2:data-carried snapshot write",
      "G-P5-ASSIGN-DIRECT:P5:2:prototype write",
      "G-P5-SET-PROTOTYPE:P5:2:prototype write",
      "G-P5-DYNAMIC-CALLEE:P5:2:prototype write",
      "G-P4-DYNAMIC-CALLEE:P4:2:data-carried snapshot write|unresolved key",
      "G-P4-APPLY-CALLEE:P4:2:data-carried snapshot write",
      "G-P5-DELETE-SLOT:P5:2:prototype write",
      "G-P5-INCREMENT-SLOT:P5:2:prototype write",
      "G-P5-DEFINE-SLOT:P5:2:prototype write",
      "G-P5-REFLECT-SLOT:P5:2:prototype write",
      "G-P4-CALL-ELEMENT:P4:2:data-carried snapshot write",
      "G-P5-DEFPROPS-SLOT:P5:2:prototype write",
      "G-P5-ASSIGN-SLOT:P5:2:prototype write",
      "G-P5-DEFPROPS-COMPUTED:P5:2:prototype write",
      "S-ELEM-P5:P5:2:prototype write",
      "S-ELEMCALL-P5:P5:2:prototype write",
      "S-DEFPROPS-P5:P5:2:prototype write",
      "S-ASSIGN-PROTO-P5:P5:2:prototype write",
      "S-ALIAS-P5:P5:2:prototype write",
      "S-PAREN-TARGET-P4:P4:2:data-carried snapshot write",
      "S-DEFPROPS-P4:P4:2:data-carried snapshot write",
      "S-AS-TARGET-P4:P4:2:data-carried snapshot write",
      "S-ELEMCALL-ASSIGN-P4:P4:2:data-carried snapshot write",
      "S-SPREAD-ARG-P4:P4:2:data-carried snapshot write",
      "S-ALIAS-ASSIGN-P4:P4:2:data-carried snapshot write",
      "S-SPREAD-LIT-P4:P4:2:data-carried snapshot write",
      "R-ENUM-P4-PROMOTED:P4:2:data-carried snapshot write",
      "U1-SPREAD-PROTO:P5:2:prototype write",
      "U1-CONST-APPLY:P5:2:prototype write",
      "U1-OWNER-ALIAS:P5:2:prototype write",
      "U1-PARSED-SLOT:P5:2:prototype write",
      "U1-DESTRUCTURE:P5:2:prototype write",
      "U2-CONST-APPLY:P4:2:data-carried snapshot write",
      "U2-OWNER-ALIAS:P4:2:data-carried snapshot write",
    ]);
    expect(CELW_QUIET.map(row => `${row.id}:${row.pin}:${row.sites.join(",")}:${row.reading}`)).toEqual([
      "R-HELPER-P4:P4:S1,S2:quiet",
      "R-ARGS-P5:P5:S1,S2:quiet",
      "R-OUTSIDE-P5:P5:S1,S2:quiet",
    ]);
  });
  it("wb-celw boundary: a data-only literal is quiet, but a literal whose spread carries non-literal data is refused", () => {
    for (const site of SITES) {
      const literal = placed(site, { beforeDerive: 'Object.assign(snapshot, { note: "FAKE-FIXTURE" });' });
      const data = placed(site, { beforeDerive: `Object.assign(snapshot, { ...JSON.parse('{"lastMessageId":"FAKE-FIXTURE-ID"}') });` });
      expect(literal.anchors.every(anchor => anchor.count === 1)).toBe(true);
      expect(data.anchors.every(anchor => anchor.count === 1)).toBe(true);
      expect(CELW_STRICT.P4(readSite(site.file, literal.text))).toEqual([]);
      expect(CELW_STRICT.P4(readSite(site.file, data.text))).toEqual(["data-carried snapshot write"]);
    }
  });
  it("wb-celw external roster: each full phrase, source placement, sites and cause are anchored outside the census", () => {
    const raw: unknown = JSON.parse(readRepo(CELW_ROSTER));
    if (!isRecord(raw)) throw new Error(`${CELW_ROSTER}: not an object`);
    expect(CELW_ROWS.length, "external required refusal count").toBe(raw.requiredRows);
    expect(CELW_QUIET.length, "external required quiet count").toBe(raw.requiredQuietRows);
    const rows = rosterRows(raw, "rows").map(row => ({
      id: rosterText(row, "id"), pin: rosterText(row, "pin"), form: rosterText(row, "form"),
      sites: rosterTexts(row, "sites"), causes: rosterTexts(row, "causes"), digest: rosterText(row, "digest"),
    }));
    expect(SITES.map(site => site.key)).toEqual(rosterTexts(raw, "sites"));
    expect(CELW_ROWS.map(row => `${row.id}|${row.pin}|${row.form}|${row.sites.join(",")}|${row.causes.join(",")}|${escapeDigest(row)}`)).toEqual(
      rows.map(row => `${row.id}|${row.pin}|${row.form}|${row.sites.join(",")}|${row.causes.join(",")}|${row.digest}`),
    );
    const quiet = rosterRows(raw, "residuals");
    expect(CELW_QUIET.map(row => `${row.id}|${row.pin}|${row.family}|${row.sites.join(",")}|${row.reading}|${residualDigest(row)}`)).toEqual(
      quiet.map(row => `${rosterText(row, "id")}|${rosterText(row, "pin")}|${rosterText(row, "family")}|${rosterTexts(row, "sites").join(",")}|${rosterText(row, "reading")}|${rosterText(row, "digest")}`),
    );
  });
  it("wb-celw registration: every externally anchored row and both control rows ran through their last assertion", ({ task }) => {
    const raw: unknown = JSON.parse(readRepo(CELW_ROSTER));
    if (!isRecord(raw)) throw new Error(`${CELW_ROSTER}: not an object`);
    const rows = rosterRows(raw, "rows").flatMap(row => rosterTexts(row, "sites").map(site => `wb-celw ${rosterText(row, "id")} ${site}`));
    const quiet = rosterRows(raw, "residuals").flatMap(row => rosterTexts(row, "sites").map(site => `wb-celw quiet ${rosterText(row, "id")} ${site}`));
    const controls = rosterTexts(raw, "sites").map(site => `wb-celw control ${site}`);
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push(`${child.name}|${child.mode}`);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(registered.filter(row => /^wb-celw (?:G-|S-|R-ENUM|U[12]-|quiet|control)/.test(row))).toEqual([
      ...rosterRows(raw, "rows").flatMap(row => rosterTexts(row, "sites").map(site => `wb-celw ${rosterText(row, "id")} ${site}: ${rosterText(row, "form")}|run`)),
      ...rosterRows(raw, "residuals").flatMap(row => rosterTexts(row, "sites").map(site => `wb-celw quiet ${rosterText(row, "id")} ${site}: ${rosterText(row, "family")}|run`)),
      ...controls.map(row => `${row}: literal snapshot writes and unrelated targets stay quiet|run`),
    ]);
    expect(registered.filter(row => /^wb-4smh control /.test(row))).toEqual(
      controls.map((_row, index) => `wb-4smh control ${rosterTexts(raw, "sites")[index]}: the real source and benign literal writes retain a quiet extended reading|run`),
    );
    expect(FOURSMH_CONTROLS_REACHED).toEqual(rosterTexts(raw, "sites").map(site => `wb-4smh control ${site}`));
    expect(CELW_REACHED).toEqual([...rows, ...quiet, ...controls]);
  });
});

/**
 * wb-561n, the wb-celw landing-242 follow-up (owner ruling R694 on gate cmd_0c6ffdd7ddb5, findings F1-F3; F4 is not taken).
 * ACCOUNTING (F1): the landing-242 gate's LEG 2 measured 34 families that CELW_STRICT reads quiet at S1 and S2 while every
 * landed pin holds (22 P5, 10 P4 class, 2 P4 exploratory). W561N_LEG2 is that list in the gate's order, W561N_ROSTER
 * carries it again outside this file, and the accounting row proves each family is exactly one of a pinned refusal or a
 * named residual with a pinned quiet row. Every refusal and residual placement is the gate's own LEG-2 text, byte for
 * byte; the twins are this cut's.
 * PINNED REFUSALS, and no broader claim: exactly the 28 W561N_ROWS forms at S1 and S2 (27 LEG-2 families, plus
 * L3-P4-ALIAS-DYNAMIC, the gate's F7 twin, which CELW_STRICT refused only through 'unresolved key'), each with its exact
 * placement, cause and digest in W561N_ROSTER. W561N_STRICT is CELW_STRICT plus one more reading of the same two causes,
 * prototype write and data-carried snapshot write. Its rules are listed so each row's cause can be checked; they are not a
 * category claim, and a rule is claimed only through the rows that exercise it. w561nValues reads what an expression may
 * evaluate to through the celwTarget wrappers, a comma sequence's last operand, both branches of a conditional, a binding
 * inside the NAMED BOUND below (an identifier, or an object-binding element with its default), property access, element
 * access with a folded or const-folded key, and the target Object.assign returns. An Object owner is Object,
 * globalThis.Object or <any>.constructor, and a Reflect owner is Reflect or globalThis.Reflect. A prototype is
 * <Object owner>.prototype, <any>.__proto__ or getPrototypeOf(<any>), which is Object.prototype for every plain object.
 * A writer is reached directly, bound (.bind), through .call, .apply or Reflect.apply, with the spread of a const array
 * expanded in place. The P5 write positions are an assignment pattern (object rest included), a for-in or for-of
 * target, an update, a delete, a built-in writer's target or Object-slot source, and __defineGetter__/__defineSetter__
 * on a prototype; P4 reads the same bulk writes into snapshot as CELW_STRICT.
 * NAMED BOUND (F3): w561nValues follows a binding only when it is the one binding of its name inside the callback or
 * emitter body, a const, declared before the use. It never follows an external binding (module scope, or anywhere outside
 * that body) or a mutable (let or var) alias.
 * NAMED QUIET RESIDUALS (W561N_QUIET, both sites, anchored in W561N_ROSTER): the bound's five LEG-2 families
 * (R-L3-P5-LET-ALIAS, R-L3-P5-MODULE-ALIAS, R-L3-P5-MODULE-OWNER, R-L3-P4-LET-ALIAS, R-L3-P4-MODULE-ALIAS); the two
 * exploratory P4 families, neither of which writes an own property of the snapshot (R-L3-P4-SETPROTO, an inherited read
 * through a replaced prototype; R-L3-P4-REASSIGN, the snapshot parameter rebound); and the cut-3 residuals R-HELPER-P4,
 * R-ARGS-P5 and R-OUTSIDE-P5, re-read under this reading.
 * PAIRED TWINS (W561N_TWINS, both sites): one benign twin per new rule reads quiet, so the reading refuses no unrelated
 * target and no read. Other unseen modes are not asserted absent. All placements are parsed, never executed.
 */
const W561N_ROSTER = "test/fixtures/claude-message-ref-561n.json";
/** The landing-242 gate's LEG-2 escape families, in its order: 22 P5, then 10 P4 class, then 2 P4 exploratory. */
const W561N_LEG2: readonly string[] = [
  "L3-P5-OBJ-REST",
  "L3-P5-FOR-OF",
  "L3-P5-FOR-IN",
  "L3-P5-DESTRUCT-TARGET",
  "L3-P5-DESTRUCT-METHOD",
  "L3-P5-BIND",
  "L3-P5-BIND-ALIAS",
  "L3-P5-GLOBAL-OWNER",
  "L3-P5-GLOBAL-PROTO",
  "L3-P5-GETPROTO",
  "L3-P5-DUNDER",
  "L3-P5-CONSTRUCTOR",
  "L3-P5-DEFINE-GETTER",
  "L3-P5-LET-ALIAS",
  "L3-P5-MODULE-ALIAS",
  "L3-P5-MODULE-OWNER",
  "L3-P5-FROMENTRIES-SLOT",
  "L3-P5-ALIAS-DYNAMIC",
  "L3-P5-COMPUTED-SLOT-ALIAS",
  "L3-P5-CALL-SPREAD",
  "L3-P5-SEQUENCE-TARGET",
  "L3-P5-CONDITIONAL-TARGET",
  "L3-P4-SPREAD-CONST",
  "L3-P4-DESTRUCT-METHOD",
  "L3-P4-LET-ALIAS",
  "L3-P4-BIND",
  "L3-P4-GLOBAL-OWNER",
  "L3-P4-NESTED-TARGET",
  "L3-P4-COMMA-TARGET",
  "L3-P4-CONDITIONAL-TARGET",
  "L3-P4-MODULE-ALIAS",
  "L3-P4-CALL-SPREAD",
  "L3-P4-SETPROTO",
  "L3-P4-REASSIGN",
];
const W561N_ROWS: readonly Escape[] = [
  { id: "L3-P5-OBJ-REST", pin: "P5", form: "an object-rest destructuring target writes a prototype member", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: "({ ...Object.prototype.benign } = { benign: 1 });" },
  { id: "L3-P5-FOR-OF", pin: "P5", form: "a for-of iteration target writes a prototype member", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: "for (Object.prototype.benign of [1]) break;" },
  { id: "L3-P5-FOR-IN", pin: "P5", form: "a for-in iteration target writes a prototype member", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: "for (Object.prototype.benign in { benign: 1 }) break;" },
  { id: "L3-P5-DESTRUCT-TARGET", pin: "P5", form: "a destructured const alias of Object.prototype receives a parsed bulk write", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'const { prototype: prototypeTarget } = Object; Object.assign(prototypeTarget, JSON.parse(\'{"benign":1}\'));' },
  { id: "L3-P5-DESTRUCT-METHOD", pin: "P5", form: "a destructured const alias of Object.assign bulk-writes the prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'const { assign } = Object; assign(Object.prototype, JSON.parse(\'{"benign":1}\'));' },
  { id: "L3-P5-BIND", pin: "P5", form: "a bound Object.assign bulk-writes the prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign.bind(Object)(Object.prototype, JSON.parse(\'{"benign":1}\'));' },
  { id: "L3-P5-BIND-ALIAS", pin: "P5", form: "a const alias of a bound Object.assign bulk-writes the prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'const assignBound = Object.assign.bind(Object); assignBound(Object.prototype, JSON.parse(\'{"benign":1}\'));' },
  { id: "L3-P5-GLOBAL-OWNER", pin: "P5", form: "Object.assign owned through globalThis bulk-writes the prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'globalThis.Object.assign(Object.prototype, JSON.parse(\'{"benign":1}\'));' },
  { id: "L3-P5-GLOBAL-PROTO", pin: "P5", form: "a member of the prototype spelled through globalThis is assigned", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: "globalThis.Object.prototype.benign = 1;" },
  { id: "L3-P5-GETPROTO", pin: "P5", form: "a member of the prototype reached through getPrototypeOf is assigned", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: "Object.getPrototypeOf({}).benign = 1;" },
  { id: "L3-P5-DUNDER", pin: "P5", form: "a member of the prototype reached through __proto__ is assigned", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: "({}).__proto__.benign = 1;" },
  { id: "L3-P5-CONSTRUCTOR", pin: "P5", form: "a member of the prototype reached through constructor.prototype is assigned", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: "({}).constructor.prototype.benign = 1;" },
  { id: "L3-P5-DEFINE-GETTER", pin: "P5", form: "the legacy __defineGetter__ accessor API defines a prototype member", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.prototype.__defineGetter__("benign", () => 1);' },
  { id: "L3-P5-FROMENTRIES-SLOT", pin: "P5", form: "Object.fromEntries pairs carry the Object prototype slot into Object.assign", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign(Object, Object.fromEntries([["prototype", { benign: 1 }]]));' },
  { id: "L3-P5-ALIAS-DYNAMIC", pin: "P5", form: "a const Object owner alias with an unfolded writer name targets the prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'const Builtin = Object; Builtin[["as", "sign"].join("")](Object.prototype, JSON.parse(\'{"benign":1}\'));' },
  { id: "L3-P5-COMPUTED-SLOT-ALIAS", pin: "P5", form: "a const-folded computed key carries the Object prototype slot into Object.assign", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'const slotKey = "prototype"; Object.assign(Object, { [slotKey]: { benign: 1 } });' },
  { id: "L3-P5-CALL-SPREAD", pin: "P5", form: "Object.assign.call fed by the spread of a const argument array writes the prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'const localArgs = [Object, Object.prototype, JSON.parse(\'{"benign":1}\')] as const; Object.assign.call(...localArgs);' },
  { id: "L3-P5-SEQUENCE-TARGET", pin: "P5", form: "a comma-expression target evaluates to the prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign((0, Object.prototype), JSON.parse(\'{"benign":1}\'));' },
  { id: "L3-P5-CONDITIONAL-TARGET", pin: "P5", form: "a conditional target has the prototype as one branch", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign(emitNumbers.size >= 0 ? Object.prototype : {}, JSON.parse(\'{"benign":1}\'));' },
  { id: "L3-P4-SPREAD-CONST", pin: "P4", form: "the spread of a const argument array carries snapshot and parsed data into Object.assign", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'const localArgs = [snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\')]; Object.assign(...localArgs);' },
  { id: "L3-P4-DESTRUCT-METHOD", pin: "P4", form: "a destructured const alias of Object.assign writes parsed data into snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'const { assign } = Object; assign(snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "L3-P4-BIND", pin: "P4", form: "a bound Object.assign writes parsed data into snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign.bind(Object)(snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "L3-P4-GLOBAL-OWNER", pin: "P4", form: "Object.assign owned through globalThis writes parsed data into snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'globalThis.Object.assign(snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "L3-P4-NESTED-TARGET", pin: "P4", form: "the target is the snapshot an inner Object.assign returns", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign(Object.assign(snapshot, {}), JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "L3-P4-COMMA-TARGET", pin: "P4", form: "a comma-expression target evaluates to snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign((0, snapshot), JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "L3-P4-CONDITIONAL-TARGET", pin: "P4", form: "a conditional target has snapshot as a branch", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign(live ? snapshot : snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "L3-P4-CALL-SPREAD", pin: "P4", form: "Object.assign.call fed by the spread of a const argument array writes parsed data into snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'const localArgs = [Object, snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\')] as const; Object.assign.call(...localArgs);' },
  { id: "L3-P4-ALIAS-DYNAMIC", pin: "P4", form: "the gate's F7 twin: a const Object owner alias with an unfolded writer name writes parsed data into snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write", "unresolved key"],
    beforeDerive: 'const Builtin = Object; Builtin[["as", "sign"].join("")](snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
];
/** The seven LEG-2 families named here: the alias bound's five, then the two exploratory P4 families. */
const W561N_RESIDUALS: readonly Residual[] = [
  { id: "R-L3-P5-LET-ALIAS", pin: "P5", family: "the alias bound (F3): a let alias of Object.prototype, a mutable alias the reading never follows", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'let prototypeTarget = Object.prototype; Object.assign(prototypeTarget, JSON.parse(\'{"benign":1}\'));' },
  { id: "R-L3-P5-MODULE-ALIAS", pin: "P5", family: "the alias bound (F3): a module-scope alias of Object.prototype, an external binding the reading never follows", sites: ["S1", "S2"], reading: "quiet",
    prelude: "const GP4_PROTOTYPE = Object.prototype;", emitter: 'Object.assign(GP4_PROTOTYPE, JSON.parse(\'{"benign":1}\'));' },
  { id: "R-L3-P5-MODULE-OWNER", pin: "P5", family: "the alias bound (F3): a module-scope alias of the Object owner, an external binding the reading never follows", sites: ["S1", "S2"], reading: "quiet",
    prelude: "const GP4_OBJECT = Object;", emitter: 'GP4_OBJECT.assign(Object.prototype, JSON.parse(\'{"benign":1}\'));' },
  { id: "R-L3-P4-LET-ALIAS", pin: "P4", family: "the alias bound (F3): a let alias of snapshot, a mutable alias the reading never follows", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'let snapshotTarget = snapshot; Object.assign(snapshotTarget, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "R-L3-P4-MODULE-ALIAS", pin: "P4", family: "the alias bound (F3): a module-scope alias of Object.assign, an external binding the reading never follows", sites: ["S1", "S2"], reading: "quiet",
    prelude: "const GP4_MERGE = Object.assign;", beforeDerive: 'GP4_MERGE(snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "R-L3-P4-SETPROTO", pin: "P4", family: "exploratory, no own-property write: the snapshot's prototype replaced by parsed data, an inherited read", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Object.setPrototypeOf(snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "R-L3-P4-REASSIGN", pin: "P4", family: "exploratory, no own-property write: the snapshot parameter rebound to a fresh object carrying parsed data", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'snapshot = { ...snapshot, ...JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\') };' },
];
/** Every residual this reading names: the seven above, then the three cut-3 families re-read. */
const W561N_QUIET: readonly Residual[] = [...W561N_RESIDUALS, ...CELW_QUIET];

/** A benign twin of one rule: the same syntax on an unrelated target, or a read, which every reading keeps quiet. */
interface Twin extends Placement {
  readonly id: string;
  readonly pin: StrictPin;
  /** What the twin does. */
  readonly form: string;
  readonly sites: readonly string[];
  /** The frozen reading of its row. */
  readonly reading: string;
}
const W561N_TWINS: readonly Twin[] = [
  { id: "T-P5-OBJ-REST", pin: "P5", form: "an object-rest destructuring target writes an unrelated member", sites: ["S1", "S2"], reading: "quiet",
    emitter: "({ ...emitNumbers.benign } = { benign: 1 });" },
  { id: "T-P5-FOR-OF", pin: "P5", form: "a for-of iteration target writes an unrelated member", sites: ["S1", "S2"], reading: "quiet",
    emitter: "for (emitNumbers.benign of [1]) break;" },
  { id: "T-P5-FOR-IN", pin: "P5", form: "a for-in iteration target writes an unrelated member", sites: ["S1", "S2"], reading: "quiet",
    emitter: "for (emitNumbers.benign in { benign: 1 }) break;" },
  { id: "T-P5-DESTRUCT-TARGET", pin: "P5", form: "a destructured const alias of Object.prototype is only read", sites: ["S1", "S2"], reading: "quiet",
    emitter: "const { prototype: prototypeTarget } = Object; Object.keys(prototypeTarget);" },
  { id: "T-P5-DESTRUCT-METHOD", pin: "P5", form: "a destructured const alias of a non-writing Object method reads the prototype", sites: ["S1", "S2"], reading: "quiet",
    emitter: "const { keys } = Object; keys(Object.prototype);" },
  { id: "T-P5-BIND", pin: "P5", form: "a bound Object.assign writes an unrelated target", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.assign.bind(Object)(emitNumbers, JSON.parse(\'{"benign":1}\'));' },
  { id: "T-P5-GLOBAL-OWNER", pin: "P5", form: "Object.assign owned through globalThis writes an unrelated target", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'globalThis.Object.assign(emitNumbers, JSON.parse(\'{"benign":1}\'));' },
  { id: "T-P5-GLOBAL-PROTO", pin: "P5", form: "the prototype spelled through globalThis is only read", sites: ["S1", "S2"], reading: "quiet",
    emitter: "Object.keys(globalThis.Object.prototype);" },
  { id: "T-P5-GETPROTO", pin: "P5", form: "the prototype reached through getPrototypeOf is only read", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.getPrototypeOf({}).hasOwnProperty("benign");' },
  { id: "T-P5-DUNDER", pin: "P5", form: "the prototype reached through __proto__ is only read", sites: ["S1", "S2"], reading: "quiet",
    emitter: "Object.keys(({}).__proto__);" },
  { id: "T-P5-CONSTRUCTOR", pin: "P5", form: "the prototype reached through constructor.prototype is only read", sites: ["S1", "S2"], reading: "quiet",
    emitter: '({}).constructor.prototype.hasOwnProperty("benign");' },
  { id: "T-P5-LEGACY-READ", pin: "P5", form: "the legacy __lookupGetter__ accessor API only reads a prototype member", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.prototype.__lookupGetter__("benign");' },
  { id: "T-P5-FROMENTRIES-SLOT", pin: "P5", form: "Object.fromEntries pairs without the prototype slot are assigned into Object", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.assign(Object, Object.fromEntries([["benign", { benign: 1 }]]));' },
  { id: "T-P5-ALIAS-DYNAMIC", pin: "P5", form: "a const Object owner alias with an unfolded writer name targets an unrelated object", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'const Builtin = Object; Builtin[["as", "sign"].join("")](emitNumbers, JSON.parse(\'{"benign":1}\'));' },
  { id: "T-P5-COMPUTED-SLOT-ALIAS", pin: "P5", form: "a const-folded computed key that is not the prototype slot is assigned into Object", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'const slotKey = "benign"; Object.assign(Object, { [slotKey]: { benign: 1 } });' },
  { id: "T-P5-CALL-SPREAD", pin: "P5", form: "Object.assign.call fed by the spread of a const argument array writes an unrelated target", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'const localArgs = [Object, emitNumbers, JSON.parse(\'{"benign":1}\')] as const; Object.assign.call(...localArgs);' },
  { id: "T-P5-SEQUENCE-TARGET", pin: "P5", form: "a comma-expression target evaluates to an unrelated object", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.assign((Object.prototype, emitNumbers), JSON.parse(\'{"benign":1}\'));' },
  { id: "T-P5-CONDITIONAL-TARGET", pin: "P5", form: "a conditional target has no prototype branch", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.assign(emitNumbers.size >= 0 ? emitNumbers : {}, JSON.parse(\'{"benign":1}\'));' },
  { id: "T-P4-SPREAD-CONST", pin: "P4", form: "the spread of a const argument array carries snapshot and a literal-only source", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'const localArgs = [snapshot, { benign: "FAKE-FIXTURE" }]; Object.assign(...localArgs);' },
  { id: "T-P4-DESTRUCT-METHOD", pin: "P4", form: "a destructured const alias of Object.assign copies snapshot and parsed data into a fresh target", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'const { assign } = Object; assign({}, snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-P4-BIND", pin: "P4", form: "a bound Object.assign writes a literal-only source into snapshot", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Object.assign.bind(Object)(snapshot, { benign: "FAKE-FIXTURE" });' },
  { id: "T-P4-GLOBAL-OWNER", pin: "P4", form: "Object.assign owned through globalThis copies snapshot and parsed data into a fresh target", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'globalThis.Object.assign({}, snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-P4-NESTED-TARGET", pin: "P4", form: "the target is the fresh copy an inner Object.assign returns", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Object.assign(Object.assign({}, snapshot), JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-P4-COMMA-TARGET", pin: "P4", form: "a comma-expression target evaluates to a fresh object", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Object.assign((snapshot, {}), JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-P4-CONDITIONAL-TARGET", pin: "P4", form: "a conditional target has no snapshot branch", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Object.assign(live ? {} : {}, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-P4-CALL-SPREAD", pin: "P4", form: "Object.assign.call fed by the spread of a const argument array writes a fresh target", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: "const localArgs = [Object, {}, snapshot] as const; Object.assign.call(...localArgs);" },
];
const twinDigest = (row: Twin): string =>
  digest16([row.id, row.pin, row.form, row.sites.join(","), row.reading, row.prelude ?? "", row.emitter ?? "", row.afterSpread ?? "", row.beforeDerive ?? ""]);

/** What an expression may evaluate to, as w561nValues reads it: a node as written, or a named member of an owner's values. */
type W561nValue = { readonly kind: "node"; readonly node: ts.Expression } | { readonly kind: "member"; readonly owner: readonly W561nValue[]; readonly name: string };
const w561nNode = (node: ts.Expression): W561nValue => ({ kind: "node", node });
const w561nIdentifier = (value: W561nValue, name: string): boolean => value.kind === "node" && ts.isIdentifier(value.node) && value.node.text === name;

/** A const declaration exactly: never let, var or using. */
const w561nConst = (declaration: ts.VariableDeclaration): boolean =>
  ts.isVariableDeclarationList(declaration.parent) && (declaration.parent.flags & ts.NodeFlags.BlockScoped) === ts.NodeFlags.Const;

/** The declaration an object-binding element sits in, through nested object patterns only. */
function w561nDeclarationOf(element: ts.BindingElement): ts.VariableDeclaration | undefined {
  const pattern = element.parent;
  if (!ts.isObjectBindingPattern(pattern)) return undefined;
  const holder = pattern.parent;
  if (ts.isVariableDeclaration(holder)) return holder;
  return ts.isBindingElement(holder) ? w561nDeclarationOf(holder) : undefined;
}

/** The NAMED BOUND: the one binding of a name inside the body, a const, declared before the use. Nothing else is followed. */
function w561nBinding(name: string, body: ts.Block, at: ts.Node): ts.VariableDeclaration | ts.BindingElement | undefined {
  const all = bindingsOf(body, name);
  const only = all.length === 1 ? all[0] : undefined;
  if (only === undefined || only.pos >= at.pos) return undefined;
  if (ts.isVariableDeclaration(only)) return w561nConst(only) ? only : undefined;
  if (!ts.isBindingElement(only) || only.dotDotDotToken !== undefined) return undefined;
  const declaration = w561nDeclarationOf(only);
  return declaration !== undefined && w561nConst(declaration) ? only : undefined;
}

/** A property name's key: as written, or a computed key folded through the bound. */
function w561nKey(name: ts.PropertyName, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): string | undefined {
  return ts.isComputedPropertyName(name) ? w561nFold(name.expression, body, at, seen) : memberKey(name);
}

/** A key folded as written, or through the one constant value the bound resolves it to. */
function w561nFold(node: ts.Expression | undefined, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): string | undefined {
  const target = celwTarget(node);
  if (target === undefined) return undefined;
  const direct = folded(target);
  if (direct !== undefined) return direct;
  const values = w561nValues(target, body, at, seen);
  const only = values.length === 1 ? values[0] : undefined;
  return only !== undefined && only.kind === "node" && only.node !== target ? folded(only.node) : undefined;
}

/** An object-binding element's values: the member its key names on what its pattern destructures, or its default. */
function w561nElementValues(element: ts.BindingElement, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): W561nValue[] {
  const holder = element.parent.parent;
  const key = element.propertyName === undefined ? (ts.isIdentifier(element.name) ? element.name.text : undefined) : w561nKey(element.propertyName, body, at, seen);
  const owner = ts.isVariableDeclaration(holder) ? w561nValues(holder.initializer, body, at, seen) : ts.isBindingElement(holder) ? w561nElementValues(holder, body, at, seen) : [];
  const member: W561nValue[] = key === undefined || owner.length === 0 ? [] : [{ kind: "member", owner, name: key }];
  return [...member, ...w561nValues(element.initializer, body, at, seen)];
}

/** What an expression may evaluate to, by the header's rules only. */
function w561nValues(node: ts.Expression | undefined, body: ts.Block, at: ts.Node, seen: ReadonlySet<string> = new Set()): W561nValue[] {
  const target = celwTarget(node);
  if (target === undefined) return [];
  if (ts.isBinaryExpression(target) && target.operatorToken.kind === ts.SyntaxKind.CommaToken) return w561nValues(target.right, body, at, seen);
  if (ts.isConditionalExpression(target)) return [...w561nValues(target.whenTrue, body, at, seen), ...w561nValues(target.whenFalse, body, at, seen)];
  if (ts.isIdentifier(target)) {
    const binding = seen.has(target.text) ? undefined : w561nBinding(target.text, body, at);
    const next = new Set([...seen, target.text]);
    const values = binding === undefined ? [] : ts.isVariableDeclaration(binding) ? w561nValues(binding.initializer, body, at, next) : w561nElementValues(binding, body, at, next);
    return values.length > 0 ? values : [w561nNode(target)];
  }
  if (ts.isPropertyAccessExpression(target)) return [{ kind: "member", owner: w561nValues(target.expression, body, at, seen), name: target.name.text }];
  if (ts.isElementAccessExpression(target)) {
    const name = w561nFold(target.argumentExpression, body, at, seen);
    return name === undefined ? [w561nNode(target)] : [{ kind: "member", owner: w561nValues(target.expression, body, at, seen), name }];
  }
  if (ts.isCallExpression(target)) {
    // Object.assign returns its target.
    const invocation = w561nInvocation(target, body, seen);
    if (invocation.method === "Object.assign" && invocation.args.length > 0) return w561nValues(invocation.args[0], body, target, seen);
  }
  return [w561nNode(target)];
}

/** An Object or Reflect owner: the identifier, the same name on globalThis, and for Object any receiver's constructor. */
function w561nOwner(value: W561nValue, name: "Object" | "Reflect"): boolean {
  if (value.kind === "node") return w561nIdentifier(value, name);
  if (value.name === name) return value.owner.some(owner => w561nIdentifier(owner, "globalThis"));
  return name === "Object" && value.name === "constructor";
}

/** A prototype: an Object owner's prototype, any receiver's __proto__, or what getPrototypeOf returns. */
function w561nPrototype(value: W561nValue, body: ts.Block, seen: ReadonlySet<string>): boolean {
  if (value.kind === "member") return value.name === "__proto__" || (value.name === "prototype" && value.owner.some(owner => w561nOwner(owner, "Object")));
  if (!ts.isCallExpression(value.node)) return false;
  const { method } = w561nInvocation(value.node, body, seen);
  return method === "Object.getPrototypeOf" || method === "Reflect.getPrototypeOf";
}

/** The one array literal an expression evaluates to, when the rules resolve exactly one. */
function w561nArrayLiteral(node: ts.Expression | undefined, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): ts.ArrayLiteralExpression | undefined {
  const values = w561nValues(node, body, at, seen);
  const only = values.length === 1 ? values[0] : undefined;
  return only !== undefined && only.kind === "node" && ts.isArrayLiteralExpression(only.node) ? only.node : undefined;
}

/** Arguments with each spread of a const array expanded in place, each array once. */
function w561nSpread(args: readonly ts.Expression[], body: ts.Block, at: ts.Node, seen: ReadonlySet<string>, expanded: ReadonlySet<ts.Node> = new Set()): ts.Expression[] {
  return args.flatMap(arg => {
    if (!ts.isSpreadElement(arg)) return [arg];
    const array = w561nArrayLiteral(arg.expression, body, at, seen);
    return array === undefined || expanded.has(array) ? [arg] : w561nSpread(array.elements, body, at, seen, new Set([...expanded, array]));
  });
}

/** What an apply-style argument list carries, or nothing when it is not one array literal. */
function w561nListed(node: ts.Expression | undefined, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): ts.Expression[] {
  const array = w561nArrayLiteral(node, body, at, seen);
  return array === undefined ? [] : w561nSpread(array.elements, body, at, seen, new Set([array]));
}

interface W561nMethod {
  /** The built-in method reached, as Owner.name, when the rules resolve one. */
  readonly method: string | undefined;
  /** Arguments a .bind put first. */
  readonly bound: readonly ts.Expression[];
}
/** The method a callee's values name: a member of an Object or Reflect owner, or such a method bound. */
function w561nMethodOf(values: readonly W561nValue[], body: ts.Block, seen: ReadonlySet<string>): W561nMethod {
  for (const value of values) {
    if (value.kind === "member") {
      for (const owner of ["Object", "Reflect"] as const) {
        if (value.owner.some(candidate => w561nOwner(candidate, owner))) return { method: `${owner}.${value.name}`, bound: [] };
      }
    } else if (ts.isCallExpression(value.node)) {
      const bind = value.node;
      for (const callee of w561nValues(bind.expression, body, bind, seen)) {
        if (callee.kind !== "member" || callee.name !== "bind") continue;
        const inner = w561nMethodOf(callee.owner, body, seen);
        if (inner.method !== undefined) return { method: inner.method, bound: [...inner.bound, ...w561nSpread(bind.arguments.slice(1), body, bind, seen)] };
      }
    }
  }
  return { method: undefined, bound: [] };
}

interface W561nCall extends W561nMethod {
  /** The callee is an element access on an Object owner whose key does not fold. */
  readonly unknownObjectMember: boolean;
  /** The arguments the method receives, after .bind, .call, .apply or Reflect.apply and spread expansion. */
  readonly args: readonly ts.Expression[];
}
/** One call read through the rules: the method it reaches and the arguments that method receives. */
function w561nInvocation(call: ts.CallExpression, body: ts.Block, seen: ReadonlySet<string> = new Set()): W561nCall {
  const args = w561nSpread(call.arguments, body, call, seen);
  const callee = w561nValues(call.expression, body, call, seen);
  const direct = w561nMethodOf(callee, body, seen);
  if (direct.method === "Reflect.apply") {
    const applied = w561nMethodOf(w561nValues(args[0], body, call, seen), body, seen);
    return { ...applied, unknownObjectMember: false, args: [...applied.bound, ...w561nListed(args[2], body, call, seen)] };
  }
  if (direct.method !== undefined) return { ...direct, unknownObjectMember: false, args: [...direct.bound, ...args] };
  for (const value of callee) {
    if (value.kind !== "member" || (value.name !== "call" && value.name !== "apply")) continue;
    const inner = w561nMethodOf(value.owner, body, seen);
    if (inner.method === undefined) continue;
    const rest = value.name === "call" ? args.slice(1) : w561nListed(args[1], body, call, seen);
    return { ...inner, unknownObjectMember: false, args: [...inner.bound, ...rest] };
  }
  const unknownObjectMember = callee.some(value => value.kind === "node" && ts.isElementAccessExpression(value.node) &&
    w561nValues(value.node.expression, body, call, seen).some(owner => w561nOwner(owner, "Object")));
  return { method: undefined, bound: [], unknownObjectMember, args };
}

const W561N_PROTOTYPE_WRITERS: readonly string[] = ["Object.assign", "Object.defineProperty", "Object.defineProperties", "Reflect.set",
  "Reflect.defineProperty", "Reflect.deleteProperty", "Object.setPrototypeOf", "Reflect.setPrototypeOf"];
const W561N_SLOT_WRITERS: readonly string[] = ["Object.defineProperty", "Reflect.set", "Reflect.defineProperty", "Reflect.deleteProperty"];
const W561N_ACCESSOR_WRITERS: readonly string[] = ["__defineGetter__", "__defineSetter__"];

/** A write target that writes a prototype member or a prototype itself; an identifier target only rebinds its name. */
function w561nPattern(node: ts.Expression, body: ts.Block, at: ts.Node): boolean {
  const target = celwTarget(node);
  if (target === undefined) return false;
  if (ts.isPropertyAccessExpression(target) || ts.isElementAccessExpression(target)) {
    const values = w561nValues(target, body, at);
    const owners = values.flatMap(value =>
      value.kind === "member" ? value.owner : ts.isElementAccessExpression(value.node) ? w561nValues(value.node.expression, body, at) : []);
    return [...values, ...owners].some(value => w561nPrototype(value, body, new Set()));
  }
  if (ts.isObjectLiteralExpression(target)) return target.properties.some(property =>
    (ts.isPropertyAssignment(property) && w561nPattern(property.initializer, body, at)) ||
    (ts.isSpreadAssignment(property) && w561nPattern(property.expression, body, at)));
  if (ts.isArrayLiteralExpression(target)) return target.elements.some(element => w561nPattern(ts.isSpreadElement(element) ? element.expression : element, body, at));
  return ts.isBinaryExpression(target) && target.operatorToken.kind === ts.SyntaxKind.EqualsToken && w561nPattern(target.left, body, at);
}

/** A source carrying Object's prototype slot: celwPrototypeSource's forms, a const-folded literal key, or Object.fromEntries pairs. */
function w561nSlotSource(node: ts.Expression, body: ts.Block, at: ts.Node): boolean {
  if (celwPrototypeSource(node)) return true;
  return w561nValues(node, body, at).some(value => {
    if (value.kind !== "node") return false;
    const source = value.node;
    if (ts.isObjectLiteralExpression(source)) {
      return source.properties.some(property => property.name !== undefined && w561nKey(property.name, body, at, new Set()) === "prototype");
    }
    if (!ts.isCallExpression(source) || w561nInvocation(source, body).method !== "Object.fromEntries") return false;
    return w561nListed(source.arguments[0], body, at, new Set()).some(entry => {
      const pair = w561nArrayLiteral(entry, body, at, new Set());
      return pair !== undefined && w561nFold(pair.elements[0], body, at, new Set()) === "prototype";
    });
  });
}

/** The P5 write positions, read through the rules. */
function w561nPrototypeWrite(node: ts.Node, body: ts.Block): boolean {
  if (ts.isBinaryExpression(node)) {
    return node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment && w561nPattern(node.left, body, node);
  }
  if (ts.isForInStatement(node) || ts.isForOfStatement(node)) return !ts.isVariableDeclarationList(node.initializer) && w561nPattern(node.initializer, body, node);
  if (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) {
    return (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) && w561nPattern(node.operand, body, node);
  }
  if (ts.isDeleteExpression(node)) return w561nPattern(node.expression, body, node);
  if (!ts.isCallExpression(node)) return false;
  const { method, unknownObjectMember, args } = w561nInvocation(node, body);
  const target: ts.Expression | undefined = args[0];
  const values = target === undefined ? [] : w561nValues(target, body, node);
  const objectTarget = values.some(value => w561nOwner(value, "Object"));
  if (objectTarget && W561N_SLOT_WRITERS.includes(method ?? "") && w561nFold(args[1], body, node, new Set()) === "prototype") return true;
  if (objectTarget && (method === "Object.assign" || method === "Object.defineProperties") && args.slice(1).some(source => w561nSlotSource(source, body, node))) return true;
  if (values.some(value => w561nPrototype(value, body, new Set())) && (W561N_PROTOTYPE_WRITERS.includes(method ?? "") || unknownObjectMember)) return true;
  return w561nValues(node.expression, body, node).some(value =>
    value.kind === "member" && W561N_ACCESSOR_WRITERS.includes(value.name) && value.owner.some(owner => w561nPrototype(owner, body, new Set())));
}

/** The P4 bulk writes into snapshot, read through the rules: CELW_STRICT's writers and sources, any spelling the rules reach. */
function w561nSnapshotWrite(call: ts.CallExpression, body: ts.Block): boolean {
  const { method, unknownObjectMember, args } = w561nInvocation(call, body);
  const target: ts.Expression | undefined = args[0];
  if (target === undefined || !w561nValues(target, body, call).some(value => w561nIdentifier(value, "snapshot"))) return false;
  const dataSource = args.slice(1).some(source => !celwLiteralOnly(source));
  if (method === "Object.assign") return dataSource;
  if (method === "Object.defineProperties") return args.length < 2 || dataSource;
  return method === undefined && unknownObjectMember && dataSource;
}

/** Strict P5 of this cut: CELW_STRICT's P5, plus a prototype write the rules read. */
function w561nP5(reading: Reading): string[] {
  const causes = celwP5(reading);
  const body = reading.emitter?.body;
  if (body === undefined) return causes;
  const writes = nodesOf(body, (node): node is ts.Node => w561nPrototypeWrite(node, body));
  return sortedUnique([...causes, ...(writes.length > 0 ? ["prototype write"] : [])]);
}

/** Strict P4 of this cut: CELW_STRICT's P4, plus a data-carried snapshot write the rules read. */
function w561nP4(reading: Reading): string[] {
  const causes = celwP4(reading);
  const callback = reading.callback;
  if (callback === undefined || !ts.isBlock(callback.body)) return causes;
  const body = callback.body;
  const writes = nodesOf(body, ts.isCallExpression).some(call => w561nSnapshotWrite(call, body));
  return sortedUnique([...causes, ...(writes ? ["data-carried snapshot write"] : [])]);
}
const W561N_STRICT: Readonly<Record<StrictPin, (reading: Reading) => string[]>> = { P4: w561nP4, P5: w561nP5 };

const W561N_REACHED: string[] = [];
const W561N_CONTROL = "the real source and the cut-3 benign writes read quiet under the extended reading";

/** The out-of-file roster, shape-checked. */
function w561nRoster(): Record<string, unknown> {
  const raw: unknown = JSON.parse(readRepo(W561N_ROSTER));
  if (!isRecord(raw)) throw new Error(`${W561N_ROSTER}: not an object`);
  return raw;
}

describe("wb-561n R694 F1-F3: each landing-242 LEG-2 escape pinned refused, or named with a pinned quiet row", () => {
  for (const row of W561N_ROWS) {
    for (const key of row.sites) {
      it(`wb-561n ${row.id} ${key}: ${row.form}`, () => {
        const site = siteNamed(key);
        const { text, anchors } = placed(site, row);
        expect(anchors.every(anchor => anchor.count === 1), "every insertion anchor applies once").toBe(true);
        const reading = readSite(site.file, text);
        expect(PINS.filter(pin => pin.id !== row.pin && !JUDGES[pin.id](site, reading)).map(pin => pin.id), "other landed pins hold").toEqual([]);
        expect(W561N_STRICT[OTHER_PIN[row.pin]](reading), "the other strict reading stays quiet").toEqual([]);
        expect(W561N_STRICT[row.pin](reading), "the extended reading names the true cause").toEqual(row.causes);
        W561N_REACHED.push(`wb-561n ${row.id} ${key}`);
      });
    }
  }
  for (const residual of W561N_QUIET) {
    for (const key of residual.sites) {
      it(`wb-561n quiet ${residual.id} ${key}: ${residual.family}`, () => {
        const site = siteNamed(key);
        const { text, anchors } = placed(site, residual);
        expect(anchors.every(anchor => anchor.count === 1), "every insertion anchor applies once").toBe(true);
        const reading = readSite(site.file, text);
        expect(PINS.filter(pin => !JUDGES[pin.id](site, reading)).map(pin => pin.id), "landed pins stay quiet").toEqual([]);
        expect(W561N_STRICT.P4(reading), "no snapshot write is read").toEqual([]);
        expect(W561N_STRICT.P5(reading), "no prototype write is read").toEqual([]);
        W561N_REACHED.push(`wb-561n quiet ${residual.id} ${key}`);
      });
    }
  }
  for (const twin of W561N_TWINS) {
    for (const key of twin.sites) {
      it(`wb-561n twin ${twin.id} ${key}: ${twin.form}`, () => {
        const site = siteNamed(key);
        const { text, anchors } = placed(site, twin);
        expect(anchors.every(anchor => anchor.count === 1), "every insertion anchor applies once").toBe(true);
        const reading = readSite(site.file, text);
        expect(PINS.filter(pin => !JUDGES[pin.id](site, reading)).map(pin => pin.id), "landed pins stay quiet").toEqual([]);
        expect(W561N_STRICT.P4(reading), "no snapshot write is read").toEqual([]);
        expect(W561N_STRICT.P5(reading), "no prototype write is read").toEqual([]);
        W561N_REACHED.push(`wb-561n twin ${twin.id} ${key}`);
      });
    }
  }
  for (const site of SITES) {
    it(`wb-561n control ${site.key}: ${W561N_CONTROL}`, () => {
      expect(W561N_STRICT.P4(readingOf(site.file))).toEqual([]);
      expect(W561N_STRICT.P5(readingOf(site.file))).toEqual([]);
      const benign = placed(site, {
        emitter: 'Reflect.set(emitNumbers, "benign", 1); Object.assign(emitNumbers, { benign: 1 });',
        beforeDerive: 'Object.assign(snapshot, { benign: "FAKE-FIXTURE" }); Object.assign({}, JSON.parse("{}"));',
      });
      expect(benign.anchors.every(anchor => anchor.count === 1)).toBe(true);
      expect(W561N_STRICT.P4(readSite(site.file, benign.text))).toEqual([]);
      expect(W561N_STRICT.P5(readSite(site.file, benign.text))).toEqual([]);
      expect(W561N_STRICT.P4(readSite(site.file, ""))).toEqual(["no callback"]);
      expect(W561N_STRICT.P5(readSite(site.file, ""))).toEqual(["no ingest spread"]);
      W561N_REACHED.push(`wb-561n control ${site.key}`);
    });
  }
  it("wb-561n ACCOUNTING (F1): each of the 34 LEG-2 escape families is exactly one pinned refusal or one named residual, on its own pin, and only the F7 twin is added", () => {
    const raw = w561nRoster();
    expect(W561N_LEG2.length, "the gate's measured family count").toBe(raw.requiredLeg2);
    expect(W561N_LEG2, "the gate's list, out of file").toEqual(rosterTexts(raw, "leg2Escapes"));
    const refused = W561N_ROWS.map(row => row.id).filter(id => W561N_LEG2.includes(id));
    const named = W561N_QUIET.map(row => row.id).filter(id => id.startsWith("R-L3-")).map(id => id.slice("R-".length));
    expect([...refused, ...named].sort(), "each family once, refused or named").toEqual([...W561N_LEG2].sort());
    expect(W561N_ROWS.map(row => row.id).filter(id => !W561N_LEG2.includes(id)), "the only addition is the F7 twin").toEqual(["L3-P4-ALIAS-DYNAMIC"]);
    expect([...W561N_ROWS, ...W561N_RESIDUALS].filter(row => !row.id.replace(/^R-/, "").startsWith(`L3-${row.pin}-`)).map(row => row.id), "each row on its family's pin").toEqual([]);
    expect([refused.length, named.length], "27 refused, 7 named").toEqual([27, 7]);
  });
  it("wb-561n FROZEN SHAPE (standing rule 16): the refusal, residual and twin tables keep their frozen ids, pins, sites and causes or readings", () => {
    expect(W561N_ROWS.map(row => `${row.id}:${row.pin}:${row.sites.length}:${row.causes.join("|")}`)).toEqual([
      "L3-P5-OBJ-REST:P5:2:prototype write",
      "L3-P5-FOR-OF:P5:2:prototype write",
      "L3-P5-FOR-IN:P5:2:prototype write",
      "L3-P5-DESTRUCT-TARGET:P5:2:prototype write",
      "L3-P5-DESTRUCT-METHOD:P5:2:prototype write",
      "L3-P5-BIND:P5:2:prototype write",
      "L3-P5-BIND-ALIAS:P5:2:prototype write",
      "L3-P5-GLOBAL-OWNER:P5:2:prototype write",
      "L3-P5-GLOBAL-PROTO:P5:2:prototype write",
      "L3-P5-GETPROTO:P5:2:prototype write",
      "L3-P5-DUNDER:P5:2:prototype write",
      "L3-P5-CONSTRUCTOR:P5:2:prototype write",
      "L3-P5-DEFINE-GETTER:P5:2:prototype write",
      "L3-P5-FROMENTRIES-SLOT:P5:2:prototype write",
      "L3-P5-ALIAS-DYNAMIC:P5:2:prototype write",
      "L3-P5-COMPUTED-SLOT-ALIAS:P5:2:prototype write",
      "L3-P5-CALL-SPREAD:P5:2:prototype write",
      "L3-P5-SEQUENCE-TARGET:P5:2:prototype write",
      "L3-P5-CONDITIONAL-TARGET:P5:2:prototype write",
      "L3-P4-SPREAD-CONST:P4:2:data-carried snapshot write",
      "L3-P4-DESTRUCT-METHOD:P4:2:data-carried snapshot write",
      "L3-P4-BIND:P4:2:data-carried snapshot write",
      "L3-P4-GLOBAL-OWNER:P4:2:data-carried snapshot write",
      "L3-P4-NESTED-TARGET:P4:2:data-carried snapshot write",
      "L3-P4-COMMA-TARGET:P4:2:data-carried snapshot write",
      "L3-P4-CONDITIONAL-TARGET:P4:2:data-carried snapshot write",
      "L3-P4-CALL-SPREAD:P4:2:data-carried snapshot write",
      "L3-P4-ALIAS-DYNAMIC:P4:2:data-carried snapshot write|unresolved key",
    ]);
    expect(W561N_QUIET.map(row => `${row.id}:${row.pin}:${row.sites.join(",")}:${row.reading}`)).toEqual([
      "R-L3-P5-LET-ALIAS:P5:S1,S2:quiet",
      "R-L3-P5-MODULE-ALIAS:P5:S1,S2:quiet",
      "R-L3-P5-MODULE-OWNER:P5:S1,S2:quiet",
      "R-L3-P4-LET-ALIAS:P4:S1,S2:quiet",
      "R-L3-P4-MODULE-ALIAS:P4:S1,S2:quiet",
      "R-L3-P4-SETPROTO:P4:S1,S2:quiet",
      "R-L3-P4-REASSIGN:P4:S1,S2:quiet",
      "R-HELPER-P4:P4:S1,S2:quiet",
      "R-ARGS-P5:P5:S1,S2:quiet",
      "R-OUTSIDE-P5:P5:S1,S2:quiet",
    ]);
    expect(W561N_TWINS.map(row => `${row.id}:${row.pin}:${row.sites.join(",")}:${row.reading}`)).toEqual([
      "T-P5-OBJ-REST:P5:S1,S2:quiet",
      "T-P5-FOR-OF:P5:S1,S2:quiet",
      "T-P5-FOR-IN:P5:S1,S2:quiet",
      "T-P5-DESTRUCT-TARGET:P5:S1,S2:quiet",
      "T-P5-DESTRUCT-METHOD:P5:S1,S2:quiet",
      "T-P5-BIND:P5:S1,S2:quiet",
      "T-P5-GLOBAL-OWNER:P5:S1,S2:quiet",
      "T-P5-GLOBAL-PROTO:P5:S1,S2:quiet",
      "T-P5-GETPROTO:P5:S1,S2:quiet",
      "T-P5-DUNDER:P5:S1,S2:quiet",
      "T-P5-CONSTRUCTOR:P5:S1,S2:quiet",
      "T-P5-LEGACY-READ:P5:S1,S2:quiet",
      "T-P5-FROMENTRIES-SLOT:P5:S1,S2:quiet",
      "T-P5-ALIAS-DYNAMIC:P5:S1,S2:quiet",
      "T-P5-COMPUTED-SLOT-ALIAS:P5:S1,S2:quiet",
      "T-P5-CALL-SPREAD:P5:S1,S2:quiet",
      "T-P5-SEQUENCE-TARGET:P5:S1,S2:quiet",
      "T-P5-CONDITIONAL-TARGET:P5:S1,S2:quiet",
      "T-P4-SPREAD-CONST:P4:S1,S2:quiet",
      "T-P4-DESTRUCT-METHOD:P4:S1,S2:quiet",
      "T-P4-BIND:P4:S1,S2:quiet",
      "T-P4-GLOBAL-OWNER:P4:S1,S2:quiet",
      "T-P4-NESTED-TARGET:P4:S1,S2:quiet",
      "T-P4-COMMA-TARGET:P4:S1,S2:quiet",
      "T-P4-CONDITIONAL-TARGET:P4:S1,S2:quiet",
      "T-P4-CALL-SPREAD:P4:S1,S2:quiet",
    ]);
  });
  it("wb-561n ROSTER: the sites and every refusal, residual and twin by full phrase, cause or reading and placement digest equal the out-of-file roster, in order", () => {
    const raw = w561nRoster();
    expect(W561N_ROWS.length, "external required refusal count").toBe(raw.requiredRows);
    expect(W561N_QUIET.length, "external required quiet count").toBe(raw.requiredQuietRows);
    expect(W561N_TWINS.length, "external required twin count").toBe(raw.requiredTwinRows);
    expect(SITES.map(site => site.key)).toEqual(rosterTexts(raw, "sites"));
    expect(W561N_ROWS.map(row => `${row.id}|${row.pin}|${row.form}|${row.sites.join(",")}|${row.causes.join(",")}|${escapeDigest(row)}`)).toEqual(
      rosterRows(raw, "rows").map(row =>
        `${rosterText(row, "id")}|${rosterText(row, "pin")}|${rosterText(row, "form")}|${rosterTexts(row, "sites").join(",")}|${rosterTexts(row, "causes").join(",")}|${rosterText(row, "digest")}`),
    );
    expect(W561N_QUIET.map(row => `${row.id}|${row.pin}|${row.family}|${row.sites.join(",")}|${row.reading}|${residualDigest(row)}`)).toEqual(
      rosterRows(raw, "residuals").map(row =>
        `${rosterText(row, "id")}|${rosterText(row, "pin")}|${rosterText(row, "family")}|${rosterTexts(row, "sites").join(",")}|${rosterText(row, "reading")}|${rosterText(row, "digest")}`),
    );
    expect(W561N_TWINS.map(row => `${row.id}|${row.pin}|${row.form}|${row.sites.join(",")}|${row.reading}|${twinDigest(row)}`)).toEqual(
      rosterRows(raw, "twins").map(row =>
        `${rosterText(row, "id")}|${rosterText(row, "pin")}|${rosterText(row, "form")}|${rosterTexts(row, "sites").join(",")}|${rosterText(row, "reading")}|${rosterText(row, "digest")}`),
    );
  });
  it("wb-561n REGISTRATION: every roster row and both control rows are registered in run mode and ran through their last assertion", ({ task }) => {
    const raw = w561nRoster();
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push(`${child.name}|${child.mode}`);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const named = (rows: Record<string, unknown>[], prefix: string, label: string): { readonly name: string; readonly label: string }[] =>
      rows.flatMap(row => rosterTexts(row, "sites").map(site => ({ name: `wb-561n ${prefix}${rosterText(row, "id")} ${site}`, label: rosterText(row, label) })));
    const expected = [
      ...named(rosterRows(raw, "rows"), "", "form"),
      ...named(rosterRows(raw, "residuals"), "quiet ", "family"),
      ...named(rosterRows(raw, "twins"), "twin ", "form"),
      ...rosterTexts(raw, "sites").map(site => ({ name: `wb-561n control ${site}`, label: W561N_CONTROL })),
    ];
    expect(registered.filter(row => /^wb-561n (?:L3-|quiet |twin |control )/.test(row))).toEqual(expected.map(row => `${row.name}: ${row.label}|run`));
    expect(W561N_REACHED).toEqual(expected.map(row => row.name));
  });
});

/**
 * wb-e3eh, the wb-561n landing-246 follow-up (ruling R697's duty on gate cmd_2d8fd0925489, PREP F1). Probe source:
 * gp1-probes.json, sha256 7630a0938c4e7ce987fe688f36775a0e0f4bfd99a22e896e9b622572f657e118, in the gate-prep-1 g10-gate-s17
 * PREP archive, named again by E3EH_ROSTER's probeSource.
 * ACCOUNTING (F1): that gate's LEG 2 read 33 exploratory forms past W561N_STRICT at S1 and S2 while every landed pin held:
 * 32 spellings read quiet (16 P5, 16 P4) and GP4X-ARRAY-ELEMENT was refused only through 'unresolved key'. E3EH_F1 is that
 * list in the gate's probe order, E3EH_ROSTER carries it again outside this file, and the accounting row proves each form is
 * exactly one of a pinned refusal or a named residual with a pinned quiet row. Every refusal and residual placement is the
 * gate's own probe text, byte for byte; the twins are this cut's.
 * PINNED REFUSALS, and no broader claim: exactly the 27 E3EH_ROWS forms at S1 and S2, each with its exact placement, cause
 * and digest in E3EH_ROSTER, and each row also pins that W561N_STRICT reads it without its class cause (the F1 measurement).
 * E3EH_STRICT is W561N_STRICT plus one more reading of the same two causes, prototype write and data-carried snapshot write.
 * Its rules are listed so each row's cause can be checked; they are not a category claim, and a rule is claimed only through
 * the rows that exercise it. e3ehValues reads what w561nValues reads, and also: both operands of &&, || and ??; an
 * assignment expression's right operand; a numeric-literal element of an array literal; the value of an object literal's
 * property assignment, by its key; an array-binding element, and a const for-of variable over an array literal, inside the
 * NAMED BOUND; Object(x) as x; and the target Object.defineProperty returns. global is a global-object owner beside
 * globalThis. A writer is also reached through <any>.call.call (its first argument invoked on the rest); the spread of
 * Array.of(...) expands like the spread of a const array; __defineGetter__ and __defineSetter__ also write through .call
 * or .apply on a prototype receiver; and Object.fromEntries over Object.entries of an object literal carries that literal's
 * prototype key as an Object-slot source.
 * NAMED BOUND (wb-561n F3, unchanged): a binding is followed only when it is the one binding of its name inside the callback
 * or emitter body, a const declaration, declared before the use; never a parameter, an external binding, or a let or var
 * alias. A call's value is followed only for Object.assign, Object.defineProperty and Object(x).
 * NAMED QUIET RESIDUALS (E3EH_QUIET, both sites, anchored in E3EH_ROSTER): the six F1 forms outside those rules -
 * R-GP5X-PARAM-ALIAS, R-GP4X-PARAM-ALIAS and R-GP4X-FOREACH-PARAM (a parameter, which the bound never follows),
 * R-GP5X-HELPER-RETURN and R-GP4X-HELPER-RETURN (a helper's return value, which the reading never follows) and
 * R-GP4X-REFLECT-SETPROTO (no own-property write, the Reflect twin of R-L3-P4-SETPROTO); the bound's six probe spellings (a
 * var alias, a shadowed name and a const declared after its use, at P5 and at P4); and every wb-561n quiet row, re-read.
 * PAIRED TWINS (E3EH_TWIN_ROWS, both sites): one benign twin per refusal keeps its pin quiet - the P4 array element keeps
 * only the landed 'unresolved key' that every unfolded key in the callback carries - and every wb-561n twin re-reads quiet.
 * Other unseen modes are not asserted absent. All placements are parsed, never executed.
 */
const E3EH_ROSTER = "test/fixtures/claude-message-ref-e3eh.json";
/** The wb-561n gate's PREP F1 forms, in its probe order: 16 P5, then 17 P4. */
const E3EH_F1: readonly string[] = [
  "GP5X-LOGICAL-AND",
  "GP5X-LOGICAL-OR",
  "GP5X-NULLISH",
  "GP5X-ARRAY-DESTRUCT",
  "GP5X-PARAM-ALIAS",
  "GP5X-FOROF-VARIABLE",
  "GP5X-OBJECT-PROPERTY",
  "GP5X-ARRAY-ELEMENT",
  "GP5X-ASSIGN-EXPR",
  "GP5X-OBJECT-WRAP",
  "GP5X-HELPER-RETURN",
  "GP5X-GLOBAL-ALIAS",
  "GP5X-DEFINE-GETTER-CALL",
  "GP5X-ENTRIES-SLOT",
  "GP5X-ARRAY-OF-SPREAD",
  "GP5X-CALL-CALL",
  "GP4X-LOGICAL-AND",
  "GP4X-LOGICAL-OR",
  "GP4X-NULLISH",
  "GP4X-ARRAY-DESTRUCT",
  "GP4X-OBJECT-PROPERTY",
  "GP4X-PARAM-ALIAS",
  "GP4X-FOREACH-PARAM",
  "GP4X-FOROF-VARIABLE",
  "GP4X-DEFINEPROPERTY-RETURN",
  "GP4X-OBJECT-WRAP",
  "GP4X-ARRAY-ELEMENT",
  "GP4X-ASSIGN-EXPR",
  "GP4X-ARRAY-OF-SPREAD",
  "GP4X-HELPER-RETURN",
  "GP4X-GLOBAL-ALIAS",
  "GP4X-CALL-CALL",
  "GP4X-REFLECT-SETPROTO",
];
/** The gate's NAMED BOUND probe spellings, in its probe order. */
const E3EH_BOUND: readonly string[] = [
  "GP5B-VAR-ALIAS",
  "GP5B-SHADOWED",
  "GP5B-AFTER-USE",
  "GP4B-VAR-ALIAS",
  "GP4B-SHADOWED",
  "GP4B-AFTER-USE",
];
const E3EH_ROWS: readonly Escape[] = [
  { id: "GP5X-LOGICAL-AND", pin: "P5", form: "a logical-and target has the prototype as its right operand", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign(emitNumbers.size >= 0 && Object.prototype, JSON.parse(\'{"benign":1}\'));' },
  { id: "GP5X-LOGICAL-OR", pin: "P5", form: "a logical-or target has the prototype as its left operand", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign(Object.prototype || {}, JSON.parse(\'{"benign":1}\'));' },
  { id: "GP5X-NULLISH", pin: "P5", form: "a nullish-coalescing target has the prototype as its left operand", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign(Object.prototype ?? {}, JSON.parse(\'{"benign":1}\'));' },
  { id: "GP5X-ARRAY-DESTRUCT", pin: "P5", form: "an array-binding const alias of Object.prototype receives a parsed bulk write", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'const [prototypeTarget] = [Object.prototype]; Object.assign(prototypeTarget, JSON.parse(\'{"benign":1}\'));' },
  { id: "GP5X-FOROF-VARIABLE", pin: "P5", form: "a const for-of variable over an array literal holding the prototype receives a parsed bulk write", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'for (const prototypeTarget of [Object.prototype]) Object.assign(prototypeTarget, JSON.parse(\'{"benign":1}\'));' },
  { id: "GP5X-OBJECT-PROPERTY", pin: "P5", form: "a property of a const object literal holding the prototype receives a parsed bulk write", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'const holder = { target: Object.prototype }; Object.assign(holder.target, JSON.parse(\'{"benign":1}\'));' },
  { id: "GP5X-ARRAY-ELEMENT", pin: "P5", form: "a numeric-literal element of an array literal holding the prototype receives a parsed bulk write", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign([Object.prototype][0], JSON.parse(\'{"benign":1}\'));' },
  { id: "GP5X-ASSIGN-EXPR", pin: "P5", form: "an assignment-expression target evaluates to the prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'let prototypeTarget: object; Object.assign((prototypeTarget = Object.prototype), JSON.parse(\'{"benign":1}\'));' },
  { id: "GP5X-OBJECT-WRAP", pin: "P5", form: "the prototype passed through Object(...) receives a parsed bulk write", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign(Object(Object.prototype), JSON.parse(\'{"benign":1}\'));' },
  { id: "GP5X-GLOBAL-ALIAS", pin: "P5", form: "a member of the prototype spelled through global is assigned", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: "global.Object.prototype.benign = 1;" },
  { id: "GP5X-DEFINE-GETTER-CALL", pin: "P5", form: "the legacy __defineGetter__ accessor API, reached through .call, defines a prototype member", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.prototype.__defineGetter__.call(Object.prototype, "benign", () => 1);' },
  { id: "GP5X-ENTRIES-SLOT", pin: "P5", form: "Object.fromEntries over Object.entries of a literal carries the Object prototype slot into Object.assign", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: "Object.assign(Object, Object.fromEntries(Object.entries({ prototype: { benign: 1 } })));" },
  { id: "GP5X-ARRAY-OF-SPREAD", pin: "P5", form: "the spread of Array.of(...) carries the prototype and parsed data into Object.assign", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Object.assign(...Array.of<object>(Object.prototype, JSON.parse(\'{"benign":1}\')));' },
  { id: "GP5X-CALL-CALL", pin: "P5", form: "Object.assign reached through Function.prototype.call.call bulk-writes the prototype", sites: ["S1", "S2"], causes: ["prototype write"],
    emitter: 'Function.prototype.call.call(Object.assign, Object, Object.prototype, JSON.parse(\'{"benign":1}\'));' },
  { id: "GP4X-LOGICAL-AND", pin: "P4", form: "a logical-and target has snapshot as its right operand", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign(live && snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "GP4X-LOGICAL-OR", pin: "P4", form: "a logical-or target has snapshot as its left operand", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign(snapshot || {}, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "GP4X-NULLISH", pin: "P4", form: "a nullish-coalescing target has snapshot as its left operand", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign(snapshot ?? {}, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "GP4X-ARRAY-DESTRUCT", pin: "P4", form: "an array-binding const alias of snapshot receives parsed data", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'const [snapshotTarget] = [snapshot]; Object.assign(snapshotTarget, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "GP4X-OBJECT-PROPERTY", pin: "P4", form: "a property of a const object literal holding snapshot receives parsed data", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'const holder = { target: snapshot }; Object.assign(holder.target, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "GP4X-FOROF-VARIABLE", pin: "P4", form: "a const for-of variable over an array literal holding snapshot receives parsed data", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'for (const snapshotTarget of [snapshot]) Object.assign(snapshotTarget, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "GP4X-DEFINEPROPERTY-RETURN", pin: "P4", form: "the target is the snapshot Object.defineProperty returns", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign(Object.defineProperty(snapshot, "benign", { value: 1 }), JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "GP4X-OBJECT-WRAP", pin: "P4", form: "snapshot passed through Object(...) receives parsed data", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign(Object(snapshot), JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "GP4X-ARRAY-ELEMENT", pin: "P4", form: "a numeric-literal element of an array literal holding snapshot receives parsed data, its key still unresolved", sites: ["S1", "S2"], causes: ["data-carried snapshot write", "unresolved key"],
    beforeDerive: 'Object.assign([snapshot][0], JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "GP4X-ASSIGN-EXPR", pin: "P4", form: "an assignment-expression target evaluates to snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'let snapshotTarget: typeof snapshot; Object.assign((snapshotTarget = snapshot), JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "GP4X-ARRAY-OF-SPREAD", pin: "P4", form: "the spread of Array.of(...) carries snapshot and parsed data into Object.assign", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Object.assign(...Array.of<object>(snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\')));' },
  { id: "GP4X-GLOBAL-ALIAS", pin: "P4", form: "Object.assign owned through global writes parsed data into snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'global.Object.assign(snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "GP4X-CALL-CALL", pin: "P4", form: "Object.assign reached through Function.prototype.call.call writes parsed data into snapshot", sites: ["S1", "S2"], causes: ["data-carried snapshot write"],
    beforeDerive: 'Function.prototype.call.call(Object.assign, Object, snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
];
/** The six F1 forms named here, then the bound's six probe spellings. */
const E3EH_RESIDUALS: readonly Residual[] = [
  { id: "R-GP5X-PARAM-ALIAS", pin: "P5", family: "a parameter binding: an immediately invoked arrow's parameter bound to Object.prototype, which the bound never follows", sites: ["S1", "S2"], reading: "quiet",
    emitter: '((prototypeTarget: object) => Object.assign(prototypeTarget, JSON.parse(\'{"benign":1}\')))(Object.prototype);' },
  { id: "R-GP5X-HELPER-RETURN", pin: "P5", family: "a helper's return: the prototype returned by an arrow declared in the emitter, a call value the reading never follows", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'const protoOf = (): object => Object.prototype; Object.assign(protoOf(), JSON.parse(\'{"benign":1}\'));' },
  { id: "R-GP4X-PARAM-ALIAS", pin: "P4", family: "a parameter binding: an immediately invoked arrow's parameter bound to snapshot, which the bound never follows", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: '((snapshotTarget: typeof snapshot) => Object.assign(snapshotTarget, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\')))(snapshot);' },
  { id: "R-GP4X-FOREACH-PARAM", pin: "P4", family: "a parameter binding: a forEach callback's parameter over a list holding snapshot, which the bound never follows", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: '[snapshot].forEach(snapshotTarget => Object.assign(snapshotTarget, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\')));' },
  { id: "R-GP4X-HELPER-RETURN", pin: "P4", family: "a helper's return: snapshot returned by an arrow declared in the callback, a call value the reading never follows", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'const targetOf = (): typeof snapshot => snapshot; Object.assign(targetOf(), JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "R-GP4X-REFLECT-SETPROTO", pin: "P4", family: "no own-property write: the snapshot's prototype replaced by parsed data through Reflect.setPrototypeOf, an inherited read (the Reflect twin of R-L3-P4-SETPROTO)", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Reflect.setPrototypeOf(snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "R-GP5B-VAR-ALIAS", pin: "P5", family: "the named bound: a var alias of Object.prototype, a mutable alias the reading never follows", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'var prototypeTarget = Object.prototype; Object.assign(prototypeTarget, JSON.parse(\'{"benign":1}\'));' },
  { id: "R-GP5B-SHADOWED", pin: "P5", family: "the named bound: an alias of Object.prototype shadowed by a second binding of its name, so the reading follows neither", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'const prototypeTarget = Object.prototype; { const prototypeTarget = 0; void prototypeTarget; } Object.assign(prototypeTarget, JSON.parse(\'{"benign":1}\'));' },
  { id: "R-GP5B-AFTER-USE", pin: "P5", family: "the named bound: a const alias of Object.prototype declared after its use, which the reading never follows", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'const run = (): void => { Object.assign(laterTarget, JSON.parse(\'{"benign":1}\')); }; const laterTarget = Object.prototype; run();' },
  { id: "R-GP4B-VAR-ALIAS", pin: "P4", family: "the named bound: a var alias of snapshot, a mutable alias the reading never follows", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'var snapshotTarget = snapshot; Object.assign(snapshotTarget, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "R-GP4B-SHADOWED", pin: "P4", family: "the named bound: an alias of snapshot shadowed by a second binding of its name, so the reading follows neither", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'const snapshotTarget = snapshot; { const snapshotTarget = {}; void snapshotTarget; } Object.assign(snapshotTarget, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "R-GP4B-AFTER-USE", pin: "P4", family: "the named bound: a const alias of snapshot declared after its use, which the reading never follows", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'const run = (): void => { Object.assign(laterTarget, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\')); }; const laterTarget = snapshot; run();' },
];
/** One benign twin per refusal, in the refusal order; its reading is quiet, or the one landed cause its pin always carries. */
const E3EH_TWINS: readonly Twin[] = [
  { id: "T-GP5X-LOGICAL-AND", pin: "P5", form: "a logical-and target has no prototype operand", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.assign(emitNumbers.size >= 0 && emitNumbers, JSON.parse(\'{"benign":1}\'));' },
  { id: "T-GP5X-LOGICAL-OR", pin: "P5", form: "a logical-or target has no prototype operand", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.assign(emitNumbers || {}, JSON.parse(\'{"benign":1}\'));' },
  { id: "T-GP5X-NULLISH", pin: "P5", form: "a nullish-coalescing target has no prototype operand", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.assign(emitNumbers ?? {}, JSON.parse(\'{"benign":1}\'));' },
  { id: "T-GP5X-ARRAY-DESTRUCT", pin: "P5", form: "an array-binding const alias takes the unrelated first element, not the prototype after it", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'const [prototypeTarget] = [emitNumbers, Object.prototype]; Object.assign(prototypeTarget, JSON.parse(\'{"benign":1}\'));' },
  { id: "T-GP5X-FOROF-VARIABLE", pin: "P5", form: "a const for-of variable over an array literal holding only an unrelated object", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'for (const prototypeTarget of [emitNumbers]) Object.assign(prototypeTarget, JSON.parse(\'{"benign":1}\'));' },
  { id: "T-GP5X-OBJECT-PROPERTY", pin: "P5", form: "a property of a const object literal names the unrelated member, not the prototype beside it", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'const holder = { target: emitNumbers, other: Object.prototype }; Object.assign(holder.target, JSON.parse(\'{"benign":1}\'));' },
  { id: "T-GP5X-ARRAY-ELEMENT", pin: "P5", form: "a numeric-literal element names the unrelated first element, not the prototype after it", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.assign([emitNumbers, Object.prototype][0], JSON.parse(\'{"benign":1}\'));' },
  { id: "T-GP5X-ASSIGN-EXPR", pin: "P5", form: "an assignment-expression target evaluates to an unrelated object", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'let prototypeTarget: object; Object.assign((prototypeTarget = emitNumbers), JSON.parse(\'{"benign":1}\'));' },
  { id: "T-GP5X-OBJECT-WRAP", pin: "P5", form: "an unrelated object passed through Object(...) receives a parsed bulk write", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.assign(Object(emitNumbers), JSON.parse(\'{"benign":1}\'));' },
  { id: "T-GP5X-GLOBAL-ALIAS", pin: "P5", form: "the prototype spelled through global is only read", sites: ["S1", "S2"], reading: "quiet",
    emitter: "Object.keys(global.Object.prototype);" },
  { id: "T-GP5X-DEFINE-GETTER-CALL", pin: "P5", form: "__defineGetter__ reached through .call defines a member of an unrelated receiver", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.prototype.__defineGetter__.call(emitNumbers, "benign", () => 1);' },
  { id: "T-GP5X-ENTRIES-SLOT", pin: "P5", form: "Object.fromEntries over Object.entries of a literal without the prototype slot is assigned into Object", sites: ["S1", "S2"], reading: "quiet",
    emitter: "Object.assign(Object, Object.fromEntries(Object.entries({ benign: { benign: 1 } })));" },
  { id: "T-GP5X-ARRAY-OF-SPREAD", pin: "P5", form: "the spread of Array.of(...) carries an unrelated target and parsed data into Object.assign", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Object.assign(...Array.of<object>(emitNumbers, JSON.parse(\'{"benign":1}\')));' },
  { id: "T-GP5X-CALL-CALL", pin: "P5", form: "Object.assign reached through Function.prototype.call.call writes an unrelated target", sites: ["S1", "S2"], reading: "quiet",
    emitter: 'Function.prototype.call.call(Object.assign, Object, emitNumbers, JSON.parse(\'{"benign":1}\'));' },
  { id: "T-GP4X-LOGICAL-AND", pin: "P4", form: "a logical-and target has no snapshot operand", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Object.assign(live && {}, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-GP4X-LOGICAL-OR", pin: "P4", form: "a logical-or target has no snapshot operand", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Object.assign(live || {}, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-GP4X-NULLISH", pin: "P4", form: "a nullish-coalescing target has no snapshot operand", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Object.assign(live ?? {}, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-GP4X-ARRAY-DESTRUCT", pin: "P4", form: "an array-binding const alias takes the fresh first element, not snapshot after it", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'const [snapshotTarget] = [{}, snapshot]; Object.assign(snapshotTarget, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-GP4X-OBJECT-PROPERTY", pin: "P4", form: "a property of a const object literal names the fresh member, not snapshot beside it", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'const holder = { target: {}, other: snapshot }; Object.assign(holder.target, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-GP4X-FOROF-VARIABLE", pin: "P4", form: "a const for-of variable over an array literal holding only a fresh object", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'for (const snapshotTarget of [{}]) Object.assign(snapshotTarget, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-GP4X-DEFINEPROPERTY-RETURN", pin: "P4", form: "the target is the fresh object Object.defineProperty returns", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Object.assign(Object.defineProperty({}, "benign", { value: 1 }), JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-GP4X-OBJECT-WRAP", pin: "P4", form: "a fresh object passed through Object(...) receives parsed data", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Object.assign(Object({}), JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-GP4X-ARRAY-ELEMENT", pin: "P4", form: "a numeric-literal element names the fresh first element, not snapshot after it, so only its unresolved key reads", sites: ["S1", "S2"], reading: "unresolved key",
    beforeDerive: 'Object.assign([{}, snapshot][0], JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-GP4X-ASSIGN-EXPR", pin: "P4", form: "an assignment-expression target evaluates to a fresh object", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'let snapshotTarget: object; Object.assign((snapshotTarget = {}), JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-GP4X-ARRAY-OF-SPREAD", pin: "P4", form: "the spread of Array.of(...) carries a fresh target, snapshot and parsed data into Object.assign", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Object.assign(...Array.of<object>({}, snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\')));' },
  { id: "T-GP4X-GLOBAL-ALIAS", pin: "P4", form: "Object.assign owned through global copies snapshot and parsed data into a fresh target", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'global.Object.assign({}, snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
  { id: "T-GP4X-CALL-CALL", pin: "P4", form: "Object.assign reached through Function.prototype.call.call writes a fresh target", sites: ["S1", "S2"], reading: "quiet",
    beforeDerive: 'Function.prototype.call.call(Object.assign, Object, {}, snapshot, JSON.parse(\'{"lastMessageId":"FAKE-FIXTURE-ID"}\'));' },
];
/** Every quiet row this reading names: the twelve above, then every wb-561n quiet row re-read. */
const E3EH_QUIET: readonly Residual[] = [...E3EH_RESIDUALS, ...W561N_QUIET];
/** Every twin this reading keeps to its frozen reading: the 27 above, then every wb-561n twin re-read. */
const E3EH_TWIN_ROWS: readonly Twin[] = [...E3EH_TWINS, ...W561N_TWINS];
/** The class cause each pin's extended reading adds. */
const E3EH_CAUSE: Readonly<Record<StrictPin, string>> = { P4: "data-carried snapshot write", P5: "prototype write" };
/** A twin's frozen reading as causes: quiet is none. */
const twinCauses = (reading: string): string[] => (reading === "quiet" ? [] : [reading]);

/** The global-object owners: an Object or Reflect owner may be spelled as a member of either. */
const E3EH_GLOBALS: readonly string[] = ["globalThis", "global"];

/** The declaration a binding element sits in, through nested object and array patterns. */
function e3ehDeclarationOf(element: ts.BindingElement): ts.VariableDeclaration | undefined {
  const holder = element.parent.parent;
  if (ts.isVariableDeclaration(holder)) return holder;
  return ts.isBindingElement(holder) ? e3ehDeclarationOf(holder) : undefined;
}

/** The NAMED BOUND, unchanged: the one binding of a name inside the body, a const declaration, declared before the use. */
function e3ehBinding(name: string, body: ts.Block, at: ts.Node): ts.VariableDeclaration | ts.BindingElement | undefined {
  const all = bindingsOf(body, name);
  const only = all.length === 1 ? all[0] : undefined;
  if (only === undefined || only.pos >= at.pos) return undefined;
  if (ts.isVariableDeclaration(only)) return w561nConst(only) ? only : undefined;
  if (!ts.isBindingElement(only) || only.dotDotDotToken !== undefined) return undefined;
  const declaration = e3ehDeclarationOf(only);
  return declaration !== undefined && w561nConst(declaration) ? only : undefined;
}

/** A property name's key: as written, or a computed key folded through the bound. */
function e3ehKey(name: ts.PropertyName, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): string | undefined {
  return ts.isComputedPropertyName(name) ? e3ehFold(name.expression, body, at, seen) : memberKey(name);
}

/** A key folded as written, or through the one constant value the bound resolves it to. */
function e3ehFold(node: ts.Expression | undefined, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): string | undefined {
  const target = celwTarget(node);
  if (target === undefined) return undefined;
  const direct = folded(target);
  if (direct !== undefined) return direct;
  const values = e3ehValues(target, body, at, seen);
  const only = values.length === 1 ? values[0] : undefined;
  return only !== undefined && only.kind === "node" && only.node !== target ? folded(only.node) : undefined;
}

/** The values a declaration gives its name: its initializer, or for a const for-of variable each element of an array literal. */
function e3ehDeclared(declaration: ts.VariableDeclaration, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): W561nValue[] {
  if (declaration.initializer !== undefined) return e3ehValues(declaration.initializer, body, at, seen);
  const loop = declaration.parent.parent;
  if (!ts.isForOfStatement(loop) || loop.initializer !== declaration.parent) return [];
  const array = e3ehArrayLiteral(loop.expression, body, at, seen);
  return array === undefined ? [] : e3ehSpread(array.elements, body, at, seen, new Set([array])).flatMap(element => e3ehValues(element, body, at, seen));
}

/** The values at one index of an array literal value, when no unexpanded spread comes first. */
function e3ehIndexed(value: W561nValue, index: number, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): W561nValue[] {
  if (value.kind !== "node" || !ts.isArrayLiteralExpression(value.node)) return [];
  const elements = e3ehSpread(value.node.elements, body, at, seen, new Set([value.node]));
  if (elements.slice(0, index + 1).some(ts.isSpreadElement)) return [];
  const element = elements[index];
  return element === undefined || ts.isOmittedExpression(element) ? [] : e3ehValues(element, body, at, seen);
}

/** The values of a property assignment named `name` in an object literal an owner evaluates to. */
function e3ehProperty(owner: readonly W561nValue[], name: string, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): W561nValue[] {
  return owner.flatMap(value => value.kind === "node" && ts.isObjectLiteralExpression(value.node)
    ? value.node.properties.filter(ts.isPropertyAssignment).filter(property => e3ehKey(property.name, body, at, seen) === name)
      .flatMap(property => e3ehValues(property.initializer, body, at, seen))
    : []);
}

/** A binding element's values: the indexed element or the named member of what its pattern destructures, or its default. */
function e3ehElementValues(element: ts.BindingElement, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): W561nValue[] {
  const pattern = element.parent;
  const holder = pattern.parent;
  const owner = ts.isVariableDeclaration(holder) ? e3ehDeclared(holder, body, at, seen) : ts.isBindingElement(holder) ? e3ehElementValues(holder, body, at, seen) : [];
  const defaults = e3ehValues(element.initializer, body, at, seen);
  if (ts.isArrayBindingPattern(pattern)) {
    const index = pattern.elements.indexOf(element);
    return [...owner.flatMap(value => e3ehIndexed(value, index, body, at, seen)), ...defaults];
  }
  const key = element.propertyName === undefined ? (ts.isIdentifier(element.name) ? element.name.text : undefined) : e3ehKey(element.propertyName, body, at, seen);
  const member: W561nValue[] = key === undefined || owner.length === 0 ? [] : [{ kind: "member", owner, name: key }, ...e3ehProperty(owner, key, body, at, seen)];
  return [...member, ...defaults];
}

/** What an expression may evaluate to, by w561nValues' rules and the header's added ones only. */
function e3ehValues(node: ts.Expression | undefined, body: ts.Block, at: ts.Node, seen: ReadonlySet<string> = new Set()): W561nValue[] {
  const target = celwTarget(node);
  if (target === undefined) return [];
  if (ts.isBinaryExpression(target)) {
    const operator = target.operatorToken.kind;
    if (operator === ts.SyntaxKind.CommaToken || operator === ts.SyntaxKind.EqualsToken) return e3ehValues(target.right, body, at, seen);
    if (operator === ts.SyntaxKind.AmpersandAmpersandToken || operator === ts.SyntaxKind.BarBarToken || operator === ts.SyntaxKind.QuestionQuestionToken) {
      return [...e3ehValues(target.left, body, at, seen), ...e3ehValues(target.right, body, at, seen)];
    }
  }
  if (ts.isConditionalExpression(target)) return [...e3ehValues(target.whenTrue, body, at, seen), ...e3ehValues(target.whenFalse, body, at, seen)];
  if (ts.isIdentifier(target)) {
    const binding = seen.has(target.text) ? undefined : e3ehBinding(target.text, body, at);
    const next = new Set([...seen, target.text]);
    const values = binding === undefined ? [] : ts.isVariableDeclaration(binding) ? e3ehDeclared(binding, body, at, next) : e3ehElementValues(binding, body, at, next);
    return values.length > 0 ? values : [w561nNode(target)];
  }
  if (ts.isPropertyAccessExpression(target)) {
    const owner = e3ehValues(target.expression, body, at, seen);
    return [{ kind: "member", owner, name: target.name.text }, ...e3ehProperty(owner, target.name.text, body, at, seen)];
  }
  if (ts.isElementAccessExpression(target)) {
    const index = celwTarget(target.argumentExpression);
    if (index !== undefined && ts.isNumericLiteral(index)) {
      const element = e3ehValues(target.expression, body, at, seen).flatMap(value => e3ehIndexed(value, Number(index.text), body, at, seen));
      if (element.length > 0) return element;
    }
    const name = e3ehFold(target.argumentExpression, body, at, seen);
    if (name === undefined) return [w561nNode(target)];
    const owner = e3ehValues(target.expression, body, at, seen);
    return [{ kind: "member", owner, name }, ...e3ehProperty(owner, name, body, at, seen)];
  }
  if (ts.isCallExpression(target)) {
    // Object.assign and Object.defineProperty return their target; Object(x) returns x itself when x is an object.
    const invocation = e3ehInvocation(target, body, seen);
    if ((invocation.method === "Object.assign" || invocation.method === "Object.defineProperty") && invocation.args.length > 0) {
      return e3ehValues(invocation.args[0], body, target, seen);
    }
    if (invocation.args.length > 0 && e3ehValues(target.expression, body, target, seen).some(value => e3ehOwner(value, "Object"))) {
      return e3ehValues(invocation.args[0], body, target, seen);
    }
  }
  return [w561nNode(target)];
}

/** An Object or Reflect owner: the identifier, the same name on a global-object owner, and for Object any receiver's constructor. */
function e3ehOwner(value: W561nValue, name: "Object" | "Reflect"): boolean {
  if (value.kind === "node") return w561nIdentifier(value, name);
  if (value.name === name) return value.owner.some(owner => E3EH_GLOBALS.some(global => w561nIdentifier(owner, global)));
  return name === "Object" && value.name === "constructor";
}

/** A prototype: an Object owner's prototype, any receiver's __proto__, or what getPrototypeOf returns. */
function e3ehPrototype(value: W561nValue, body: ts.Block, seen: ReadonlySet<string>): boolean {
  if (value.kind === "member") return value.name === "__proto__" || (value.name === "prototype" && value.owner.some(owner => e3ehOwner(owner, "Object")));
  if (!ts.isCallExpression(value.node)) return false;
  const { method } = e3ehInvocation(value.node, body, seen);
  return method === "Object.getPrototypeOf" || method === "Reflect.getPrototypeOf";
}

/** The one array literal an expression evaluates to, when the rules resolve exactly one. */
function e3ehArrayLiteral(node: ts.Expression | undefined, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): ts.ArrayLiteralExpression | undefined {
  const values = e3ehValues(node, body, at, seen);
  const only = values.length === 1 ? values[0] : undefined;
  return only !== undefined && only.kind === "node" && ts.isArrayLiteralExpression(only.node) ? only.node : undefined;
}

/** The one Array.of(...) call an expression evaluates to, when the rules resolve exactly one. */
function e3ehArrayOf(node: ts.Expression, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): ts.CallExpression | undefined {
  const values = e3ehValues(node, body, at, seen);
  const only = values.length === 1 ? values[0] : undefined;
  if (only === undefined || only.kind !== "node" || !ts.isCallExpression(only.node)) return undefined;
  const call = only.node;
  return e3ehValues(call.expression, body, call, seen).some(value =>
    value.kind === "member" && value.name === "of" && value.owner.some(owner => w561nIdentifier(owner, "Array"))) ? call : undefined;
}

/** Arguments with each spread of a const array, or of Array.of(...), expanded in place, each once. */
function e3ehSpread(args: readonly ts.Expression[], body: ts.Block, at: ts.Node, seen: ReadonlySet<string>, expanded: ReadonlySet<ts.Node> = new Set()): ts.Expression[] {
  return args.flatMap(arg => {
    if (!ts.isSpreadElement(arg)) return [arg];
    const array = e3ehArrayLiteral(arg.expression, body, at, seen);
    if (array !== undefined) return expanded.has(array) ? [arg] : e3ehSpread(array.elements, body, at, seen, new Set([...expanded, array]));
    const listed = e3ehArrayOf(arg.expression, body, at, seen);
    return listed === undefined || expanded.has(listed) ? [arg] : e3ehSpread(listed.arguments, body, at, seen, new Set([...expanded, listed]));
  });
}

/** What an apply-style argument list carries, or nothing when it is not one array literal. */
function e3ehListed(node: ts.Expression | undefined, body: ts.Block, at: ts.Node, seen: ReadonlySet<string>): ts.Expression[] {
  const array = e3ehArrayLiteral(node, body, at, seen);
  return array === undefined ? [] : e3ehSpread(array.elements, body, at, seen, new Set([array]));
}

/** The method a callee's values name: a member of an Object or Reflect owner, or such a method bound. */
function e3ehMethodOf(values: readonly W561nValue[], body: ts.Block, seen: ReadonlySet<string>): W561nMethod {
  for (const value of values) {
    if (value.kind === "member") {
      for (const owner of ["Object", "Reflect"] as const) {
        if (value.owner.some(candidate => e3ehOwner(candidate, owner))) return { method: `${owner}.${value.name}`, bound: [] };
      }
    } else if (ts.isCallExpression(value.node)) {
      const bind = value.node;
      for (const callee of e3ehValues(bind.expression, body, bind, seen)) {
        if (callee.kind !== "member" || callee.name !== "bind") continue;
        const inner = e3ehMethodOf(callee.owner, body, seen);
        if (inner.method !== undefined) return { method: inner.method, bound: [...inner.bound, ...e3ehSpread(bind.arguments.slice(1), body, bind, seen)] };
      }
    }
  }
  return { method: undefined, bound: [] };
}

/** One call read through the rules: the method it reaches and the arguments that method receives. */
function e3ehInvocation(call: ts.CallExpression, body: ts.Block, seen: ReadonlySet<string> = new Set()): W561nCall {
  const args = e3ehSpread(call.arguments, body, call, seen);
  const callee = e3ehValues(call.expression, body, call, seen);
  const direct = e3ehMethodOf(callee, body, seen);
  if (direct.method === "Reflect.apply") {
    const applied = e3ehMethodOf(e3ehValues(args[0], body, call, seen), body, seen);
    return { ...applied, unknownObjectMember: false, args: [...applied.bound, ...e3ehListed(args[2], body, call, seen)] };
  }
  if (direct.method !== undefined) return { ...direct, unknownObjectMember: false, args: [...direct.bound, ...args] };
  for (const value of callee) {
    if (value.kind !== "member" || (value.name !== "call" && value.name !== "apply")) continue;
    if (value.name === "call" && value.owner.some(owner => owner.kind === "member" && owner.name === "call")) {
      // <any>.call.call(writer, thisArg, ...rest) invokes the writer on the rest.
      const invoked = e3ehMethodOf(e3ehValues(args[0], body, call, seen), body, seen);
      if (invoked.method !== undefined) return { ...invoked, unknownObjectMember: false, args: [...invoked.bound, ...args.slice(2)] };
    }
    const inner = e3ehMethodOf(value.owner, body, seen);
    if (inner.method === undefined) continue;
    const rest = value.name === "call" ? args.slice(1) : e3ehListed(args[1], body, call, seen);
    return { ...inner, unknownObjectMember: false, args: [...inner.bound, ...rest] };
  }
  const unknownObjectMember = callee.some(value => value.kind === "node" && ts.isElementAccessExpression(value.node) &&
    e3ehValues(value.node.expression, body, call, seen).some(owner => e3ehOwner(owner, "Object")));
  return { method: undefined, bound: [], unknownObjectMember, args };
}

/** A write target that writes a prototype member or a prototype itself, read as a reference; an identifier only rebinds. */
function e3ehPattern(node: ts.Expression, body: ts.Block, at: ts.Node): boolean {
  const target = celwTarget(node);
  if (target === undefined) return false;
  if (ts.isPropertyAccessExpression(target) || ts.isElementAccessExpression(target)) {
    const owner = e3ehValues(target.expression, body, at);
    const name = ts.isPropertyAccessExpression(target) ? target.name.text : e3ehFold(target.argumentExpression, body, at, new Set());
    const reference: W561nValue[] = name === undefined ? [] : [{ kind: "member", owner, name }];
    return [...reference, ...owner].some(value => e3ehPrototype(value, body, new Set()));
  }
  if (ts.isObjectLiteralExpression(target)) return target.properties.some(property =>
    (ts.isPropertyAssignment(property) && e3ehPattern(property.initializer, body, at)) ||
    (ts.isSpreadAssignment(property) && e3ehPattern(property.expression, body, at)));
  if (ts.isArrayLiteralExpression(target)) return target.elements.some(element => e3ehPattern(ts.isSpreadElement(element) ? element.expression : element, body, at));
  return ts.isBinaryExpression(target) && target.operatorToken.kind === ts.SyntaxKind.EqualsToken && e3ehPattern(target.left, body, at);
}

/** An object literal with a property keyed prototype. */
const e3ehSlotLiteral = (source: ts.ObjectLiteralExpression, body: ts.Block, at: ts.Node): boolean =>
  source.properties.some(property => property.name !== undefined && e3ehKey(property.name, body, at, new Set()) === "prototype");

/** A source carrying Object's prototype slot: w561nSlotSource's forms, and Object.fromEntries over Object.entries of one. */
function e3ehSlotSource(node: ts.Expression, body: ts.Block, at: ts.Node): boolean {
  if (celwPrototypeSource(node)) return true;
  return e3ehValues(node, body, at).some(value => {
    if (value.kind !== "node") return false;
    const source = value.node;
    if (ts.isObjectLiteralExpression(source)) return e3ehSlotLiteral(source, body, at);
    if (!ts.isCallExpression(source)) return false;
    const fromEntries = e3ehInvocation(source, body);
    if (fromEntries.method !== "Object.fromEntries") return false;
    const pairs = e3ehListed(fromEntries.args[0], body, at, new Set()).some(entry => {
      const pair = e3ehArrayLiteral(entry, body, at, new Set());
      return pair !== undefined && e3ehFold(pair.elements[0], body, at, new Set()) === "prototype";
    });
    return pairs || e3ehValues(fromEntries.args[0], body, at).some(entries => {
      if (entries.kind !== "node" || !ts.isCallExpression(entries.node)) return false;
      const listed = e3ehInvocation(entries.node, body);
      return listed.method === "Object.entries" && e3ehValues(listed.args[0], body, at).some(literal =>
        literal.kind === "node" && ts.isObjectLiteralExpression(literal.node) && e3ehSlotLiteral(literal.node, body, at));
    });
  });
}

/** The P5 write positions, read through the rules. */
function e3ehPrototypeWrite(node: ts.Node, body: ts.Block): boolean {
  if (ts.isBinaryExpression(node)) {
    return node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment && e3ehPattern(node.left, body, node);
  }
  if (ts.isForInStatement(node) || ts.isForOfStatement(node)) return !ts.isVariableDeclarationList(node.initializer) && e3ehPattern(node.initializer, body, node);
  if (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) {
    return (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) && e3ehPattern(node.operand, body, node);
  }
  if (ts.isDeleteExpression(node)) return e3ehPattern(node.expression, body, node);
  if (!ts.isCallExpression(node)) return false;
  const { method, unknownObjectMember, args } = e3ehInvocation(node, body);
  const target: ts.Expression | undefined = args[0];
  const values = target === undefined ? [] : e3ehValues(target, body, node);
  const objectTarget = values.some(value => e3ehOwner(value, "Object"));
  if (objectTarget && W561N_SLOT_WRITERS.includes(method ?? "") && e3ehFold(args[1], body, node, new Set()) === "prototype") return true;
  if (objectTarget && (method === "Object.assign" || method === "Object.defineProperties") && args.slice(1).some(source => e3ehSlotSource(source, body, node))) return true;
  if (values.some(value => e3ehPrototype(value, body, new Set())) && (W561N_PROTOTYPE_WRITERS.includes(method ?? "") || unknownObjectMember)) return true;
  return e3ehValues(node.expression, body, node).some(value => value.kind === "member" && (
    (W561N_ACCESSOR_WRITERS.includes(value.name) && value.owner.some(owner => e3ehPrototype(owner, body, new Set()))) ||
    // The accessor writer reached through .call or .apply writes onto the receiver it is handed.
    ((value.name === "call" || value.name === "apply") && value.owner.some(owner => owner.kind === "member" && W561N_ACCESSOR_WRITERS.includes(owner.name)) &&
      e3ehValues(node.arguments[0], body, node).some(receiver => e3ehPrototype(receiver, body, new Set())))));
}

/** The P4 bulk writes into snapshot, read through the rules: CELW_STRICT's writers and sources, any spelling the rules reach. */
function e3ehSnapshotWrite(call: ts.CallExpression, body: ts.Block): boolean {
  const { method, unknownObjectMember, args } = e3ehInvocation(call, body);
  const target: ts.Expression | undefined = args[0];
  if (target === undefined || !e3ehValues(target, body, call).some(value => w561nIdentifier(value, "snapshot"))) return false;
  const dataSource = args.slice(1).some(source => !celwLiteralOnly(source));
  if (method === "Object.assign") return dataSource;
  if (method === "Object.defineProperties") return args.length < 2 || dataSource;
  return method === undefined && unknownObjectMember && dataSource;
}

/** Strict P5 of this cut: W561N_STRICT's P5, plus a prototype write the e3eh rules read. */
function e3ehP5(reading: Reading): string[] {
  const causes = w561nP5(reading);
  const body = reading.emitter?.body;
  if (body === undefined) return causes;
  const writes = nodesOf(body, (node): node is ts.Node => e3ehPrototypeWrite(node, body));
  return sortedUnique([...causes, ...(writes.length > 0 ? ["prototype write"] : [])]);
}

/** Strict P4 of this cut: W561N_STRICT's P4, plus a data-carried snapshot write the e3eh rules read. */
function e3ehP4(reading: Reading): string[] {
  const causes = w561nP4(reading);
  const callback = reading.callback;
  if (callback === undefined || !ts.isBlock(callback.body)) return causes;
  const body = callback.body;
  const writes = nodesOf(body, ts.isCallExpression).some(call => e3ehSnapshotWrite(call, body));
  return sortedUnique([...causes, ...(writes ? ["data-carried snapshot write"] : [])]);
}
const E3EH_STRICT: Readonly<Record<StrictPin, (reading: Reading) => string[]>> = { P4: e3ehP4, P5: e3ehP5 };

const E3EH_REACHED: string[] = [];
const E3EH_CONTROL = "the real source and the benign writes read quiet under the e3eh reading";

/** The out-of-file roster, shape-checked. */
function e3ehRoster(): Record<string, unknown> {
  const raw: unknown = JSON.parse(readRepo(E3EH_ROSTER));
  if (!isRecord(raw)) throw new Error(`${E3EH_ROSTER}: not an object`);
  return raw;
}

describe("wb-e3eh R697 PREP F1: each wb-561n F1 form pinned refused, or named with a pinned quiet row", () => {
  for (const row of E3EH_ROWS) {
    for (const key of row.sites) {
      it(`wb-e3eh ${row.id} ${key}: ${row.form}`, () => {
        const site = siteNamed(key);
        const { text, anchors } = placed(site, row);
        expect(anchors.every(anchor => anchor.count === 1), "every insertion anchor applies once").toBe(true);
        const reading = readSite(site.file, text);
        expect(PINS.filter(pin => pin.id !== row.pin && !JUDGES[pin.id](site, reading)).map(pin => pin.id), "other landed pins hold").toEqual([]);
        expect(E3EH_STRICT[OTHER_PIN[row.pin]](reading), "the other strict reading stays quiet").toEqual([]);
        expect(W561N_STRICT[row.pin](reading), "the wb-561n reading misses its class cause, as the gate measured").toEqual(row.causes.filter(cause => cause !== E3EH_CAUSE[row.pin]));
        expect(E3EH_STRICT[row.pin](reading), "the extended reading names the true cause").toEqual(row.causes);
        E3EH_REACHED.push(`wb-e3eh ${row.id} ${key}`);
      });
    }
  }
  for (const residual of E3EH_QUIET) {
    for (const key of residual.sites) {
      it(`wb-e3eh quiet ${residual.id} ${key}: ${residual.family}`, () => {
        const site = siteNamed(key);
        const { text, anchors } = placed(site, residual);
        expect(anchors.every(anchor => anchor.count === 1), "every insertion anchor applies once").toBe(true);
        const reading = readSite(site.file, text);
        expect(PINS.filter(pin => !JUDGES[pin.id](site, reading)).map(pin => pin.id), "landed pins stay quiet").toEqual([]);
        expect(E3EH_STRICT.P4(reading), "no snapshot write is read").toEqual([]);
        expect(E3EH_STRICT.P5(reading), "no prototype write is read").toEqual([]);
        E3EH_REACHED.push(`wb-e3eh quiet ${residual.id} ${key}`);
      });
    }
  }
  for (const twin of E3EH_TWIN_ROWS) {
    for (const key of twin.sites) {
      it(`wb-e3eh twin ${twin.id} ${key}: ${twin.form}`, () => {
        const site = siteNamed(key);
        const { text, anchors } = placed(site, twin);
        expect(anchors.every(anchor => anchor.count === 1), "every insertion anchor applies once").toBe(true);
        const reading = readSite(site.file, text);
        expect(PINS.filter(pin => !JUDGES[pin.id](site, reading)).map(pin => pin.id), "landed pins stay quiet").toEqual([]);
        expect(E3EH_STRICT[OTHER_PIN[twin.pin]](reading), "the other strict reading stays quiet").toEqual([]);
        expect(E3EH_STRICT[twin.pin](reading), "its own pin reads only its frozen reading").toEqual(twinCauses(twin.reading));
        E3EH_REACHED.push(`wb-e3eh twin ${twin.id} ${key}`);
      });
    }
  }
  for (const site of SITES) {
    it(`wb-e3eh control ${site.key}: ${E3EH_CONTROL}`, () => {
      expect(E3EH_STRICT.P4(readingOf(site.file))).toEqual([]);
      expect(E3EH_STRICT.P5(readingOf(site.file))).toEqual([]);
      const benign = placed(site, {
        emitter: 'Reflect.set(emitNumbers, "benign", 1); Object.assign(emitNumbers, { benign: 1 });',
        beforeDerive: 'Object.assign(snapshot, { benign: "FAKE-FIXTURE" }); Object.assign({}, JSON.parse("{}"));',
      });
      expect(benign.anchors.every(anchor => anchor.count === 1)).toBe(true);
      expect(E3EH_STRICT.P4(readSite(site.file, benign.text))).toEqual([]);
      expect(E3EH_STRICT.P5(readSite(site.file, benign.text))).toEqual([]);
      expect(E3EH_STRICT.P4(readSite(site.file, ""))).toEqual(["no callback"]);
      expect(E3EH_STRICT.P5(readSite(site.file, ""))).toEqual(["no ingest spread"]);
      E3EH_REACHED.push(`wb-e3eh control ${site.key}`);
    });
  }
  it("wb-e3eh ACCOUNTING (F1): each of the 33 F1 forms is exactly one pinned refusal or one named residual, on its own pin, and the bound's six spellings are named", () => {
    const raw = e3ehRoster();
    expect(E3EH_F1.length, "the gate's measured form count").toBe(raw.requiredF1);
    expect(E3EH_F1, "the gate's list, out of file").toEqual(rosterTexts(raw, "f1Escapes"));
    expect(E3EH_BOUND, "the bound's spellings, out of file").toEqual(rosterTexts(raw, "boundSpellings"));
    const refused = E3EH_ROWS.map(row => row.id);
    const named = E3EH_RESIDUALS.map(row => row.id.slice("R-".length));
    expect([...refused, ...named.filter(id => E3EH_F1.includes(id))].sort(), "each F1 form once, refused or named").toEqual([...E3EH_F1].sort());
    expect(named.filter(id => !E3EH_F1.includes(id)), "every other named row is one of the bound's spellings, in order").toEqual(E3EH_BOUND);
    expect([...E3EH_ROWS, ...E3EH_RESIDUALS].filter(row => !row.id.replace(/^R-/, "").startsWith(`GP${row.pin.slice(1)}`)).map(row => row.id), "each row on its form's pin").toEqual([]);
    expect(E3EH_TWINS.map(twin => twin.id), "one twin per refusal, in order").toEqual(refused.map(id => `T-${id}`));
    expect([refused.length, named.length - E3EH_BOUND.length, E3EH_BOUND.length], "27 refused, 6 named, 6 bound").toEqual([27, 6, 6]);
  });
  it("wb-e3eh FROZEN SHAPE (standing rule 16): the refusal, quiet and twin tables keep their frozen ids, pins, sites and causes or readings", () => {
    expect(E3EH_ROWS.map(row => `${row.id}:${row.pin}:${row.sites.length}:${row.causes.join("|")}`)).toEqual([
      "GP5X-LOGICAL-AND:P5:2:prototype write",
      "GP5X-LOGICAL-OR:P5:2:prototype write",
      "GP5X-NULLISH:P5:2:prototype write",
      "GP5X-ARRAY-DESTRUCT:P5:2:prototype write",
      "GP5X-FOROF-VARIABLE:P5:2:prototype write",
      "GP5X-OBJECT-PROPERTY:P5:2:prototype write",
      "GP5X-ARRAY-ELEMENT:P5:2:prototype write",
      "GP5X-ASSIGN-EXPR:P5:2:prototype write",
      "GP5X-OBJECT-WRAP:P5:2:prototype write",
      "GP5X-GLOBAL-ALIAS:P5:2:prototype write",
      "GP5X-DEFINE-GETTER-CALL:P5:2:prototype write",
      "GP5X-ENTRIES-SLOT:P5:2:prototype write",
      "GP5X-ARRAY-OF-SPREAD:P5:2:prototype write",
      "GP5X-CALL-CALL:P5:2:prototype write",
      "GP4X-LOGICAL-AND:P4:2:data-carried snapshot write",
      "GP4X-LOGICAL-OR:P4:2:data-carried snapshot write",
      "GP4X-NULLISH:P4:2:data-carried snapshot write",
      "GP4X-ARRAY-DESTRUCT:P4:2:data-carried snapshot write",
      "GP4X-OBJECT-PROPERTY:P4:2:data-carried snapshot write",
      "GP4X-FOROF-VARIABLE:P4:2:data-carried snapshot write",
      "GP4X-DEFINEPROPERTY-RETURN:P4:2:data-carried snapshot write",
      "GP4X-OBJECT-WRAP:P4:2:data-carried snapshot write",
      "GP4X-ARRAY-ELEMENT:P4:2:data-carried snapshot write|unresolved key",
      "GP4X-ASSIGN-EXPR:P4:2:data-carried snapshot write",
      "GP4X-ARRAY-OF-SPREAD:P4:2:data-carried snapshot write",
      "GP4X-GLOBAL-ALIAS:P4:2:data-carried snapshot write",
      "GP4X-CALL-CALL:P4:2:data-carried snapshot write",
    ]);
    expect(E3EH_QUIET.map(row => `${row.id}:${row.pin}:${row.sites.join(",")}:${row.reading}`)).toEqual([
      "R-GP5X-PARAM-ALIAS:P5:S1,S2:quiet",
      "R-GP5X-HELPER-RETURN:P5:S1,S2:quiet",
      "R-GP4X-PARAM-ALIAS:P4:S1,S2:quiet",
      "R-GP4X-FOREACH-PARAM:P4:S1,S2:quiet",
      "R-GP4X-HELPER-RETURN:P4:S1,S2:quiet",
      "R-GP4X-REFLECT-SETPROTO:P4:S1,S2:quiet",
      "R-GP5B-VAR-ALIAS:P5:S1,S2:quiet",
      "R-GP5B-SHADOWED:P5:S1,S2:quiet",
      "R-GP5B-AFTER-USE:P5:S1,S2:quiet",
      "R-GP4B-VAR-ALIAS:P4:S1,S2:quiet",
      "R-GP4B-SHADOWED:P4:S1,S2:quiet",
      "R-GP4B-AFTER-USE:P4:S1,S2:quiet",
      "R-L3-P5-LET-ALIAS:P5:S1,S2:quiet",
      "R-L3-P5-MODULE-ALIAS:P5:S1,S2:quiet",
      "R-L3-P5-MODULE-OWNER:P5:S1,S2:quiet",
      "R-L3-P4-LET-ALIAS:P4:S1,S2:quiet",
      "R-L3-P4-MODULE-ALIAS:P4:S1,S2:quiet",
      "R-L3-P4-SETPROTO:P4:S1,S2:quiet",
      "R-L3-P4-REASSIGN:P4:S1,S2:quiet",
      "R-HELPER-P4:P4:S1,S2:quiet",
      "R-ARGS-P5:P5:S1,S2:quiet",
      "R-OUTSIDE-P5:P5:S1,S2:quiet",
    ]);
    expect(E3EH_TWIN_ROWS.map(row => `${row.id}:${row.pin}:${row.sites.join(",")}:${row.reading}`)).toEqual([
      "T-GP5X-LOGICAL-AND:P5:S1,S2:quiet",
      "T-GP5X-LOGICAL-OR:P5:S1,S2:quiet",
      "T-GP5X-NULLISH:P5:S1,S2:quiet",
      "T-GP5X-ARRAY-DESTRUCT:P5:S1,S2:quiet",
      "T-GP5X-FOROF-VARIABLE:P5:S1,S2:quiet",
      "T-GP5X-OBJECT-PROPERTY:P5:S1,S2:quiet",
      "T-GP5X-ARRAY-ELEMENT:P5:S1,S2:quiet",
      "T-GP5X-ASSIGN-EXPR:P5:S1,S2:quiet",
      "T-GP5X-OBJECT-WRAP:P5:S1,S2:quiet",
      "T-GP5X-GLOBAL-ALIAS:P5:S1,S2:quiet",
      "T-GP5X-DEFINE-GETTER-CALL:P5:S1,S2:quiet",
      "T-GP5X-ENTRIES-SLOT:P5:S1,S2:quiet",
      "T-GP5X-ARRAY-OF-SPREAD:P5:S1,S2:quiet",
      "T-GP5X-CALL-CALL:P5:S1,S2:quiet",
      "T-GP4X-LOGICAL-AND:P4:S1,S2:quiet",
      "T-GP4X-LOGICAL-OR:P4:S1,S2:quiet",
      "T-GP4X-NULLISH:P4:S1,S2:quiet",
      "T-GP4X-ARRAY-DESTRUCT:P4:S1,S2:quiet",
      "T-GP4X-OBJECT-PROPERTY:P4:S1,S2:quiet",
      "T-GP4X-FOROF-VARIABLE:P4:S1,S2:quiet",
      "T-GP4X-DEFINEPROPERTY-RETURN:P4:S1,S2:quiet",
      "T-GP4X-OBJECT-WRAP:P4:S1,S2:quiet",
      "T-GP4X-ARRAY-ELEMENT:P4:S1,S2:unresolved key",
      "T-GP4X-ASSIGN-EXPR:P4:S1,S2:quiet",
      "T-GP4X-ARRAY-OF-SPREAD:P4:S1,S2:quiet",
      "T-GP4X-GLOBAL-ALIAS:P4:S1,S2:quiet",
      "T-GP4X-CALL-CALL:P4:S1,S2:quiet",
      "T-P5-OBJ-REST:P5:S1,S2:quiet",
      "T-P5-FOR-OF:P5:S1,S2:quiet",
      "T-P5-FOR-IN:P5:S1,S2:quiet",
      "T-P5-DESTRUCT-TARGET:P5:S1,S2:quiet",
      "T-P5-DESTRUCT-METHOD:P5:S1,S2:quiet",
      "T-P5-BIND:P5:S1,S2:quiet",
      "T-P5-GLOBAL-OWNER:P5:S1,S2:quiet",
      "T-P5-GLOBAL-PROTO:P5:S1,S2:quiet",
      "T-P5-GETPROTO:P5:S1,S2:quiet",
      "T-P5-DUNDER:P5:S1,S2:quiet",
      "T-P5-CONSTRUCTOR:P5:S1,S2:quiet",
      "T-P5-LEGACY-READ:P5:S1,S2:quiet",
      "T-P5-FROMENTRIES-SLOT:P5:S1,S2:quiet",
      "T-P5-ALIAS-DYNAMIC:P5:S1,S2:quiet",
      "T-P5-COMPUTED-SLOT-ALIAS:P5:S1,S2:quiet",
      "T-P5-CALL-SPREAD:P5:S1,S2:quiet",
      "T-P5-SEQUENCE-TARGET:P5:S1,S2:quiet",
      "T-P5-CONDITIONAL-TARGET:P5:S1,S2:quiet",
      "T-P4-SPREAD-CONST:P4:S1,S2:quiet",
      "T-P4-DESTRUCT-METHOD:P4:S1,S2:quiet",
      "T-P4-BIND:P4:S1,S2:quiet",
      "T-P4-GLOBAL-OWNER:P4:S1,S2:quiet",
      "T-P4-NESTED-TARGET:P4:S1,S2:quiet",
      "T-P4-COMMA-TARGET:P4:S1,S2:quiet",
      "T-P4-CONDITIONAL-TARGET:P4:S1,S2:quiet",
      "T-P4-CALL-SPREAD:P4:S1,S2:quiet",
    ]);
  });
  it("wb-e3eh ROSTER: the sites and every refusal, quiet row and twin by full phrase, cause or reading and placement digest equal the out-of-file roster, in order", () => {
    const raw = e3ehRoster();
    expect(E3EH_ROWS.length, "external required refusal count").toBe(raw.requiredRows);
    expect(E3EH_QUIET.length, "external required quiet count").toBe(raw.requiredQuietRows);
    expect(E3EH_TWIN_ROWS.length, "external required twin count").toBe(raw.requiredTwinRows);
    expect(SITES.map(site => site.key)).toEqual(rosterTexts(raw, "sites"));
    expect(E3EH_ROWS.map(row => `${row.id}|${row.pin}|${row.form}|${row.sites.join(",")}|${row.causes.join(",")}|${escapeDigest(row)}`)).toEqual(
      rosterRows(raw, "rows").map(row =>
        `${rosterText(row, "id")}|${rosterText(row, "pin")}|${rosterText(row, "form")}|${rosterTexts(row, "sites").join(",")}|${rosterTexts(row, "causes").join(",")}|${rosterText(row, "digest")}`),
    );
    expect(E3EH_QUIET.map(row => `${row.id}|${row.pin}|${row.family}|${row.sites.join(",")}|${row.reading}|${residualDigest(row)}`)).toEqual(
      rosterRows(raw, "residuals").map(row =>
        `${rosterText(row, "id")}|${rosterText(row, "pin")}|${rosterText(row, "family")}|${rosterTexts(row, "sites").join(",")}|${rosterText(row, "reading")}|${rosterText(row, "digest")}`),
    );
    expect(E3EH_TWIN_ROWS.map(row => `${row.id}|${row.pin}|${row.form}|${row.sites.join(",")}|${row.reading}|${twinDigest(row)}`)).toEqual(
      rosterRows(raw, "twins").map(row =>
        `${rosterText(row, "id")}|${rosterText(row, "pin")}|${rosterText(row, "form")}|${rosterTexts(row, "sites").join(",")}|${rosterText(row, "reading")}|${rosterText(row, "digest")}`),
    );
  });
  it("wb-e3eh REGISTRATION: every roster row and both control rows are registered in run mode and ran through their last assertion", ({ task }) => {
    const raw = e3ehRoster();
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push(`${child.name}|${child.mode}`);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const named = (rows: Record<string, unknown>[], prefix: string, label: string): { readonly name: string; readonly label: string }[] =>
      rows.flatMap(row => rosterTexts(row, "sites").map(site => ({ name: `wb-e3eh ${prefix}${rosterText(row, "id")} ${site}`, label: rosterText(row, label) })));
    const expected = [
      ...named(rosterRows(raw, "rows"), "", "form"),
      ...named(rosterRows(raw, "residuals"), "quiet ", "family"),
      ...named(rosterRows(raw, "twins"), "twin ", "form"),
      ...rosterTexts(raw, "sites").map(site => ({ name: `wb-e3eh control ${site}`, label: E3EH_CONTROL })),
    ];
    expect(registered.filter(row => /^wb-e3eh (?:GP|quiet |twin |control )/.test(row))).toEqual(expected.map(row => `${row.name}: ${row.label}|run`));
    expect(E3EH_REACHED).toEqual(expected.map(row => row.name));
  });
});
