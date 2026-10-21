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
 * NAMED_DRIFTS, the gate's own count, holds the named three.
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
    const reads = nodesOf(callback, (node): node is ts.Identifier | ts.StringLiteralLike => (ts.isIdentifier(node) || ts.isStringLiteralLike(node)) && node.text === "lastMessageId");
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
      printed(spread, file) === `...(evidenceRefs?.length ? { evidenceRefs: ${site.ingest} } : {})`
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
