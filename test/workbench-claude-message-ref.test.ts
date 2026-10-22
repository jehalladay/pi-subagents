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
  (call.expression.expression.text === "Reflect" || (call.expression.expression.text === "Object" && call.expression.name.text === "defineProperty"));

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
 * wb-celw (R685 F1-F4): the third-generation class closes on writes, not on
 * a finite list of key spellings. Object.prototype writes in the emitter and
 * non-literal bulk writes into snapshot in the callback are refused even when
 * the property key cannot be folded. The old R-ENUM-P4 quiet row describes the
 * landed keyed reader; the promoted row below judges the extended reader.
 * Every placement is parsed, never executed (including prototype writes).
 */
const CELW_ROSTER = "test/fixtures/claude-message-ref-celw.json";
const CELW_ROWS: readonly Escape[] = [
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
];

/** Unwrap only syntax that preserves the expression's target, not arbitrary dataflow. */
function celwTarget(node: ts.Expression | undefined): ts.Expression | undefined {
  if (node === undefined) return undefined;
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) ||
    ts.isNonNullExpression(node) || ts.isSatisfiesExpression(node)) return celwTarget(node.expression);
  return node;
}

/** A locally visible const alias to a built-in method; never assume external bindings. */
function celwMethod(call: ts.CallExpression, body: ts.Block): string | undefined {
  const direct = celwTarget(call.expression);
  if (direct === undefined) return undefined;
  const method = (node: ts.Expression): string | undefined => {
    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression)) return `${node.expression.text}.${node.name.text}`;
    if (ts.isElementAccessExpression(node) && ts.isIdentifier(node.expression) && node.argumentExpression !== undefined) {
      const name = folded(node.argumentExpression);
      return name === undefined ? undefined : `${node.expression.text}.${name}`;
    }
    return undefined;
  };
  const named = method(direct);
  if (named !== undefined) return named;
  if (!ts.isIdentifier(direct)) return undefined;
  const visible = bindingsOf(body, direct.text).filter(ts.isVariableDeclaration);
  const binding = visible.length === 1 ? visible[0] : undefined;
  return binding !== undefined && ts.isVariableDeclarationList(binding.parent) &&
    (binding.parent.flags & ts.NodeFlags.Const) !== 0 && binding.pos < call.pos && binding.initializer !== undefined
    ? method(celwTarget(binding.initializer) ?? binding.initializer) : undefined;
}

/** Does this expression name the built-in prototype in this reading? */
function celwPrototype(node: ts.Expression | undefined): boolean {
  const target = celwTarget(node);
  return target !== undefined && ts.isPropertyAccessExpression(target) &&
    ts.isIdentifier(target.expression) && target.expression.text === "Object" && target.name.text === "prototype";
}

/** Recognize a key-independent write, not a read, on Object.prototype. */
function celwPrototypeWrite(node: ts.Node, body: ts.Block): boolean {
  if (ts.isBinaryExpression(node)) {
    const target = celwTarget(node.left);
    if ((ts.isElementAccessExpression(target ?? node.left) || ts.isPropertyAccessExpression(target ?? node.left)) &&
      celwPrototype((target as ts.ElementAccessExpression | ts.PropertyAccessExpression).expression)) {
      return node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment;
    }
  }
  if (ts.isCallExpression(node)) {
    const method = celwMethod(node, body);
    return celwPrototype(node.arguments[0]) && (
      method === "Object.assign" || method === "Object.defineProperty" || method === "Object.defineProperties" ||
      method === "Reflect.set" || method === "Reflect.defineProperty" || method === "Reflect.deleteProperty");
  }
  return false;
}

/** Class-level P5: no prototype write, regardless of key or locally visible callee spelling. */
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

/** Class-level P4: any recognized bulk write of non-literal data into snapshot. */
function celwP4(reading: Reading): string[] {
  const callback = reading.callback;
  const causes = composeCauses(reading);
  if (callback === undefined || !ts.isBlock(callback.body)) return causes;
  const body = callback.body;
  const writes = nodesOf(body, ts.isCallExpression).some(call => {
    const method = celwMethod(call, body);
    const args = call.arguments;
    // Spread calls can carry the target and source inside one array argument.
    const first = args[0];
    const spread = first !== undefined && ts.isSpreadElement(first) ? celwTarget(first.expression) : undefined;
    const argumentsList = spread !== undefined && ts.isArrayLiteralExpression(spread) ? spread.elements : args;
    const target = argumentsList[0];
    const unwrapped = target !== undefined && ts.isExpression(target) ? celwTarget(target) : undefined;
    if (unwrapped === undefined || !ts.isIdentifier(unwrapped) || unwrapped.text !== "snapshot") return false;
    if (method === "Object.assign") return argumentsList.slice(1).some(source => ts.isExpression(source) && !celwLiteralOnly(source));
    if (method === "Object.defineProperties") return argumentsList.length < 2 ||
      argumentsList.slice(1).some(source => ts.isExpression(source) && !celwLiteralOnly(source));
    return false;
  });
  return sortedUnique([...causes, ...(writes ? ["data-carried snapshot write"] : [])]);
}
const CELW_STRICT: Readonly<Record<StrictPin, (reading: Reading) => string[]>> = { P4: celwP4, P5: celwP5 };
const CELW_REACHED: string[] = [];

describe("wb-celw R685: class-closing emitter and snapshot-write refusals", () => {
  for (const row of CELW_ROWS) {
    for (const key of row.sites) {
      it(`wb-celw ${row.id} ${key}: ${row.form}`, () => {
        const site = siteNamed(key);
        const { text, anchors } = placed(site, row);
        expect(anchors.every(anchor => anchor.count === 1), "every insertion anchor applies once").toBe(true);
        const reading = readSite(site.file, text);
        expect(PINS.filter(pin => pin.id !== row.pin && !JUDGES[pin.id](site, reading)).map(pin => pin.id), "other landed pins hold").toEqual([]);
        expect(CELW_STRICT[OTHER_PIN[row.pin]](reading), "the other strict reading stays quiet").toEqual([]);
        expect(CELW_STRICT[row.pin](reading), "the class-closing reading names the true cause").toEqual(row.causes);
        CELW_REACHED.push(`wb-celw ${row.id} ${key}`);
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
    const rows = rosterRows(raw, "rows").map(row => ({
      id: rosterText(row, "id"), pin: rosterText(row, "pin"), form: rosterText(row, "form"),
      sites: rosterTexts(row, "sites"), causes: rosterTexts(row, "causes"), digest: rosterText(row, "digest"),
    }));
    expect(SITES.map(site => site.key)).toEqual(rosterTexts(raw, "sites"));
    expect(CELW_ROWS.map(row => `${row.id}|${row.pin}|${row.form}|${row.sites.join(",")}|${row.causes.join(",")}|${escapeDigest(row)}`)).toEqual(
      rows.map(row => `${row.id}|${row.pin}|${row.form}|${row.sites.join(",")}|${row.causes.join(",")}|${row.digest}`),
    );
  });
  it("wb-celw registration: every externally anchored row and both control rows ran through their last assertion", ({ task }) => {
    const raw: unknown = JSON.parse(readRepo(CELW_ROSTER));
    if (!isRecord(raw)) throw new Error(`${CELW_ROSTER}: not an object`);
    const rows = rosterRows(raw, "rows").flatMap(row => rosterTexts(row, "sites").map(site => `wb-celw ${rosterText(row, "id")} ${site}`));
    const controls = rosterTexts(raw, "sites").map(site => `wb-celw control ${site}`);
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push(`${child.name}|${child.mode}`);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(registered.filter(row => /^wb-celw (?:S-|R-ENUM|control)/.test(row))).toEqual([
      ...rosterRows(raw, "rows").flatMap(row => rosterTexts(row, "sites").map(site => `wb-celw ${rosterText(row, "id")} ${site}: ${rosterText(row, "form")}|run`)),
      ...controls.map(row => `${row}: literal snapshot writes and unrelated targets stay quiet|run`),
    ]);
    expect(registered.filter(row => /^wb-4smh control /.test(row))).toEqual(
      controls.map((_row, index) => `wb-4smh control ${rosterTexts(raw, "sites")[index]}: the real source and benign literal writes retain a quiet extended reading|run`),
    );
    expect(FOURSMH_CONTROLS_REACHED).toEqual(rosterTexts(raw, "sites").map(site => `wb-4smh control ${site}`));
    expect(CELW_REACHED).toEqual([...rows, ...controls]);
  });
});
