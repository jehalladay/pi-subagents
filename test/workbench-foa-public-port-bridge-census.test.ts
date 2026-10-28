/**
 * wb-2wiv.2 (SDK-UNIVERSAL-REACTIVE-RENDERING-R2, program-triage-2026-10-18), the public-port bridge census: the until-then
 * leg of a requirement whose gate is conjoint and closed.
 * Statement (the bead's tracker-export title, verbatim): "Gating artifact: released FiberOpticsSDK PublicPortBridge
 * (unshipped) + a wb-x32 committing decision connecting a Pi runtime over it; then Pi supplies the full bridge contract
 * (visibility/schema/direction through resync on gaps), keeps one authority per runtime domain, admits no private endpoint
 * or remote executable function, and asserts no global ordering, shared memory or implicit conflict merge."
 * Owner filing (the export notes' PROGRAM paragraph, the one line this file reads from the notes): the gate is conjoint
 * ("binds only on the conjoint gate (released PublicPortBridge + wb-x32 committing decision)"), "Until both gates exist,
 * no src or docs change", and the acceptance shape is "typed rejection fixtures for a private endpoint, an executable
 * function on the wire, a bad version/digest, a stale epoch/duplicate message and a gap without resync", "plus a falsifier
 * that no Pi surface renders a cross-runtime read as globally ordered, shared-memory or auto-merged".
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-28, at base 7a0ab7f). Producer (the local FiberOpticsSDK clone, git show
 * and rev-parse only; this census never re-reads the producer, and the roster's producer block carries every line and id it
 * quotes): the charter docs/programs/universal-reactive-rendering-2026-10-18.md is blob 5ae73cc3 at the filing pin
 * dcc5b57c4aed and the same blob at origin/master 2099f193 (2026-10-28): :3 "design charter only", :19 "## Proposed
 * interfaces (unshipped)", and :17, :23 and :41 as the roster quotes them. Since the filing the producer's master gained the
 * bridge's contract half, FO-UI-05-a (52c16fc72, 2026-10-22: src/fiber_optics/bridge.py blob 61697119, whose nine BRIDGE_*
 * refusal codes are the rows of conformance/urr/v1/diagnostic_codes.json blob dba3980c, and whose executable-payload keys
 * are code, handler, script and function), and a transport tier, FO-UI-05-d (384f03f9c, 2026-10-23: a test-side carrier
 * whose receiver answers a sequence gap with BRIDGE_GAP and a resync request). The clone carries no release tag, the code
 * roster holds no code for a stale epoch, a duplicate message, a gap, a missing basis, an unauthorized effect or unbounded
 * feedback, and the rf release Pi's newest receipt names (0.1.845, docs/workbench/receipts/wb-jwc.4.md) bundles fiber_optics
 * 0.1.0.20261014202847, built before 52c16fc72. So the bridge half is LANDING upstream and UNRELEASED to Pi (UNVERIFIED
 * beyond these readings) and the decision half is ABSENT: the conjoint gate is closed. The notes' parenthesis "the charter's
 * 'Required acceptance' names stable diagnostics for exactly these" does not hold as written: :41 names seven members, four
 * of which are the notes' (the private-port bridge, bad version/digest, stale epoch, duplicate message), the notes'
 * executable function and gap come from :23 and :17, and :41's missing basis, unauthorized effect and unbounded feedback are
 * not in the notes' list; this census arms the union (the title's "full bridge contract"). Pi, at the base: package.json and
 * package-lock.json name no FiberOptics or bridge package; no src, qa or examples file spells the SDK or the bridge in any
 * reading; no docs page outside receipts/, front-matter page or examples file spells the bridge; wb-x32's export row ("W10:
 * ReactiveFiber provider/interop", open) and its children (none) spell no bridge, nor does docs/workbench/18; and no src, qa,
 * docs (receipts aside), front-matter or examples file spells a claim of global ordering, shared memory or an automatic,
 * implicit or optimistic merge. Four receipts echo rf's own identity key fiber_optics (an SDK version, never a bridge):
 * receipts/ is outside every leg.
 *
 * THE JUDGES. A MENTION is a word list read in order with any run, empty included, of characters that are neither letters nor
 * digits between the words, case-insensitive, each word optionally plural: BRIDGE (public, port, bridge: PublicPortBridge,
 * public-port bridge, public_port_bridge, PUBLIC PORT BRIDGES) and SDK (fiber, optics: FiberOpticsSDK, fiber_optics,
 * fiber-optics); a spelling outside those words is a named residual (R-SPELLING), never claimed read. A CLAIM is one of three families (CLAIMS): order (global or globally, then an optional "transaction", then
 * order, ordered, ordering or orders), shared (shared, then memory or memories) and merge (auto, automatic, automatically,
 * implicit, implicitly, optimistic or optimistically, then an optional "conflict", then merge, merged or merges), each a whole
 * word run. A file's READINGS: its raw text; a script (.ts .mts .cts .tsx .js .mjs .cjs .jsx) also each string-like literal
 * and template part by its cooked value, each identifier spelled with an escape by its cooked name and each "+" chain of
 * string literals by its folded value, each one reading of its own; a .json file also each parsed key and string value; a
 * markup file (.md .html .htm .xml .svg) also its text with numeric character references and the common named entities
 * decoded; and every reading also NFKD-decomposed with its combining marks dropped (a fullwidth or accented letter reads as
 * its base letter). A judge fires on a file when any reading matches. A binary file (a NUL byte) has no reading. Code roots
 * (src, qa, examples) are judged for BRIDGE and SDK, page roots (docs, front) for BRIDGE only. Each reading form and each
 * root's judge choice has its own planted control, so a narrowed reader reds its control.
 *
 * ROWS (one test per pin, titled by the pin id and its quote; each row's pin quotes tile its label and the labels tile the
 * title after its requirement prefix):
 *  G, the gate. G1 (the artifact half): no dependency map of package.json and no package path of package-lock.json names
 *    the SDK or the bridge, no src, qa or examples file mentions either, no docs page (receipts aside) and no front-matter
 *    page mentions the bridge, and the code modules that do are exactly the bound hosts in BRIDGE_HOSTS (none today); each
 *    root walked holds its floor and its liveness anchors, and every planted control reads as planted. G2 (the decision half): the
 *    decision bead's own export row, every child row (a dotted id or a parent-child edge) and the decision log
 *    docs/workbench/18 mention no bridge, the row was read, and the planted note, child, edge and log row are read.
 *  C, O, P: the ARMED contract, binding the first host. A host is one function over a negotiated contract (the endpoints,
 *    each with an owner runtime, a visibility, a schema and a lane and invalidation disposition; the supported versions;
 *    each remote runtime's epoch; the feedback bound), the inbound messages in delivery order (kind, endpoint, source
 *    runtime, version, schema, content digest, epoch, sequence, message identity, source revision, feedback depth, value),
 *    Pi's local values and ONE injected seam, the only path by which an admitted message changes Pi's view. It answers one
 *    receipt per message (admitted, or rejected with a typed diagnostic), the endpoints it asks to resync, and the
 *    cross-runtime read (values per runtime domain and the rendered label). The census's oracle classifies every message in
 *    a fixed order: executable payload (a callable or an executable key: the producer's set), unauthorized effect (a kind
 *    outside snapshot/delta/ack/gap/resync), private endpoint (undeclared or not public), foreign authority (a source that
 *    is not the endpoint's owner, or an endpoint Pi owns), missing disposition, bad version, schema mismatch, bad digest
 *    (the carried digest against the canonical bytes of the value), stale epoch, duplicate message, missing basis (no
 *    source revision), unbounded feedback (absent or over the bound), and a gap (a delta that does not follow the last
 *    applied sequence, or follows an announced gap, before a snapshot or resync). Nine CHECKS judge a driven fixture:
 *    admit, reject (a rejected message reached the seam or was not rejected), diagnostic, resync (the endpoints asked to
 *    resync are exactly the gapped ones), aliased (the seam received an object the wire message holds), merged (the read
 *    is not each runtime's own values) and the three claim checks over the label. Sixteen fixtures; the honest host meets
 *    every check on every fixture, each of 29 mutants fails at least one, every check fires, and every check is the only
 *    check some mutant fails (each half of a two-sided check too: M-GAP-SILENT and M-RESYNC-SPURIOUS for resync, M-REFUSE-ALL
 *    and M-DOUBLE-APPLY for admit, M-REJECTED-APPLIED for the seam half of reject).
 *    C1 the full contract: the session fixture is admitted (the ack never applied), every class is the honest host's
 *    diagnostic (so the oracle's verdict) on some message, and the contract-field mutants each fail, as do a host that admits nothing (M-REFUSE-ALL) and one that
 *    applies the ack and gap signals (M-SIGNAL-APPLIED). C2 the gap: a detected and an announced gap are rejected
 *    until a resync and asked to resync once, no gapless stream is asked to resync, and five gap mutants fail. O1 one authority per runtime domain: a remote write
 *    into Pi's own endpoint and a write by a non-owner runtime are rejected. P1 a private and an undeclared endpoint are
 *    rejected (the undeclared one is the producer's own trap: FiberGraph answers public for an endpoint it does not hold).
 *    P2 a callable and an executable key on the wire, and a remote effect request (the charter's :41 unauthorized effect),
 *    are rejected.
 *  N, the falsifier, one pin per claim family: no src, qa, docs (receipts aside), front-matter or examples file spells the
 *    family (each root at its floor, every planted control read and every quiet control quiet), the honest host's label of
 *    a two-runtime read spells no claim and names each runtime's own epoch and sequence, and the family's mutants fail: N1
 *    order (M-ORDER-LABEL), N2 shared memory (M-SHARED-REF hands the seam the wire's own object, M-SHARED-LABEL), N3
 *    implicit conflict merge (M-MERGE keys the read by port across runtimes, M-MERGE-LABEL).
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS and each residual family's
 * member count as literals, beside the classes, the contract parts, the claim families, the checks, the mutants, the
 * fixtures, the words, the walks (floors, pathspecs, code roots and anchors) and the hosts; the judged set (every row's id, label and pins, every pin's quote, witness
 * and readers, the residual members, every registered test title) is held to the out-of-file roster
 * test/fixtures/foa-public-port-bridge-roster.json. Every case names the readers it ran (READS: the walks, the manifests,
 * the export, the decision log, the judges, the host driver), held to the roster, so a case returning a constant witness
 * reds. OUTSIDE ANCHORS (their own registered case): the bead's export row - its title after the requirement prefix is tiled
 * in order by the five row labels with nothing but separators between them, each row's pin quotes tile its label, the
 * bridge words are the title's token after "released FiberOpticsSDK " split at its capitals, the SDK words are that
 * token's predecessor without "SDK", and the decision bead is the title's; the owner filing's PROGRAM line - its
 * acceptance-shape list derives seven classes (article dropped, a slash distributing the leading adjective), each a class
 * the census arms; its "requires" quote derives nine contract parts, each keyed in PART_CLASS; its falsifier list reads one
 * claim family per item, in order; its gate names the same decision bead and record; its citation names the roster
 * producer's path, pin and lines, and each of its authority quotes is a producer line's text; and an appended note, even
 * one that opens like the filing, changes no reading. The producer's :41 list, read through the one alias it needs, is covered by the classes, and its members
 * outside the notes' list are exactly the three classes this file adds from it; :17's prohibition reads all three families.
 * So a row, a class, a contract part or a family removed from every literal of this file and the roster together still reds.
 * The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it) and REACHED.
 * NOT CLAIMED: test/ and docs/workbench/receipts/ (they name the vocabulary as text they judge or record, this census
 * included); a mention outside the BRIDGE and SDK words (FO-UI-05, URR, "the bridge"); the producer's own code spellings (the
 * armed diagnostics are this census's class names: a bound host maps its producer's codes onto them and re-measures); a
 * sender-announced gap whose sequence is not the last applied one (the oracle reads it as a gap like any other); a mutant,
 * a fixture, a planted control or a residual member removed from its table, the frozen literal and the roster together
 * while every check still fires; a check removed from CHECKS and the judge together while every remaining mutant fails one;
 * a pin's case replaced by one that echoes its roster witness and runs the same readers.
 * RESIDUALS (named families, each member a pinned quiet row; a reader that starts reading a member reds its row):
 * R-SPELLING (Q1, a spelling the mention judges do not read: an abbreviation, words split across statements, base64, a YAML
 * escape, a homoglyph letter, a digit for a letter), R-INDIRECT-LOAD (Q2, a producer reached through a name the text never spells: an environment specifier, a
 * configured subprocess, a binary on a configured path), R-DECISION-ELSEWHERE (Q3, a committing decision the decision reader
 * does not read: a row outside the decision bead's family, a decision naming only the SDK, a log row naming only the work
 * package), R-SIDE-PATH (Q4, a host that changes Pi's view outside the injected seam: the armed check observes the seam
 * only) and R-PARAPHRASE (Q5, a claim worded outside the three families: a total order, a single timeline, a reversed
 * "merged automatically", a reversed "memory is shared", last-writer-wins, claim words split across statements).
 * SCOPE: the judges read no negation or context, so a src comment that merely names the bridge or a claim reds G1 or N
 * (OVER-READ, disclosed: none does today), and so does a src read of rf's identity key fiber_optics (a planted control
 * shows it read). The decision reader reads the bridge words only, so an rf note on wb-x32 naming fiber_optics binds nothing.
 *
 * Display paths added: none. Test-only: no src or docs change, no FiberOpticsSDK dependency, bridge, adapter or seam.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-2wiv.2";
const REQUIREMENT = "SDK-UNIVERSAL-REACTIVE-RENDERING-R2";
const SUITE = `public-port bridge census (${BEAD}, ${REQUIREMENT})`;
const ROSTER_PATH = "test/fixtures/foa-public-port-bridge-roster.json";
const EXPORT = ".beads/issues.jsonl";
/** The decision bead the gate names (title: "+ a wb-x32 committing decision"). */
const DECISION_BEAD = "wb-x32";
/** Pi's decision log, where a committing decision is recorded beside the bead. */
const DECISIONS_PAGE = "docs/workbench/18-decisions-and-risks.md";
const RECEIPTS = "docs/workbench/receipts/";
/** The owner filing's own paragraph opens with this; the tracker appends every later note on a line of its own. */
const PROGRAM_OPENING = "PROGRAM: sdk-universal-reactive-rendering ";
/** The live cases parse every walked script; they carry this explicit budget. */
const LIVE_BUDGET_MS = 120_000;

type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json };

function record(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");

// ---- the readers each case runs (READS: held to the roster, so a case returning a constant witness reds) ----

let ACTIVE: string | undefined;
const READS = new Map<string, string[]>();
function note(reader: string): void {
  if (ACTIVE === undefined) return;
  const list = READS.get(ACTIVE) ?? [];
  if (!list.includes(reader)) list.push(reader);
  READS.set(ACTIVE, list);
}

// ---- the judges ----

/** The record's words: the title's token after "released FiberOpticsSDK ", split at its capitals. */
const BRIDGE_WORDS = ["public", "port", "bridge"] as const;
/** The producer's words: the title's SDK token without its "SDK" suffix, split at its capitals. */
const SDK_WORDS = ["fiber", "optics"] as const;
const BEFORE = "(?<![\\p{L}\\p{N}])";
const AFTER = "(?![\\p{L}\\p{N}])";
/** Between two words: any run, empty included, of characters that are neither letters nor digits. */
const SEP = "[^\\p{L}\\p{N}]*";
const mentionOf = (words: readonly string[]): RegExp => new RegExp(words.map(word => `${word}s?`).join(SEP), "iu");
const JUDGES = { bridge: mentionOf(BRIDGE_WORDS), sdk: mentionOf(SDK_WORDS) } as const;
type Judge = keyof typeof JUDGES;
const CLAIMS = {
  order: new RegExp(`${BEFORE}global(?:ly)?${SEP}(?:transaction${SEP})?order(?:ed|ing|s)?${AFTER}`, "iu"),
  shared: new RegExp(`${BEFORE}shared${SEP}memor(?:y|ies)${AFTER}`, "iu"),
  merge: new RegExp(`${BEFORE}(?:auto(?:matic(?:ally)?)?|implicit(?:ly)?|optimistic(?:ally)?)${SEP}(?:conflict${SEP})?merge[ds]?${AFTER}`, "iu"),
} as const;
type Family = keyof typeof CLAIMS;
const FAMILIES = Object.keys(CLAIMS) as Family[];

const CODE_EXTENSIONS = new Set([".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"]);
const MARKUP_EXTENSIONS = new Set([".md", ".html", ".htm", ".xml", ".svg"]);
function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extname(path).toLowerCase();
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".jsx") return ts.ScriptKind.JSX;
  if (extension === ".js" || extension === ".mjs" || extension === ".cjs") return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}
/** Each string-like literal and template part by its cooked value, each escaped identifier by its cooked name, each "+" chain of string literals folded. */
function cookedParts(path: string, text: string): string[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const parts: string[] = [];
  const isPlus = (node: ts.Node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken;
  const fold = (node: ts.Node): string | undefined => {
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isParenthesizedExpression(node)) return fold(node.expression);
    if (!isPlus(node)) return undefined;
    const left = fold(node.left);
    const right = fold(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  };
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) parts.push(node.text);
    else if (ts.isIdentifier(node) && node.getText(source) !== ts.idText(node)) parts.push(ts.idText(node));
    if (isPlus(node) && !isPlus(node.parent)) {
      const folded = fold(node);
      if (folded !== undefined) parts.push(folded);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return parts;
}
/** Each parsed key and string value of a JSON text (none when it does not parse). */
function jsonParts(text: string): string[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return [];
  }
  const parts: string[] = [];
  const visit = (value: unknown): void => {
    if (typeof value === "string") parts.push(value);
    else if (Array.isArray(value)) for (const item of value) visit(item);
    else if (record(value)) {
      for (const [key, item] of Object.entries(value)) {
        parts.push(key);
        visit(item);
      }
    }
  };
  visit(parsed);
  return parts;
}
const NAMED_ENTITIES: Readonly<Record<string, string>> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
/** A markup text with its numeric character references and the common named entities decoded. */
function decoded(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole: string, body: string) => {
    if (body.startsWith("#x") || body.startsWith("#X")) return String.fromCodePoint(Number.parseInt(body.slice(2), 16));
    if (body.startsWith("#")) return String.fromCodePoint(Number.parseInt(body.slice(1), 10));
    return NAMED_ENTITIES[body.toLowerCase()] ?? whole;
  });
}
const readingsCache = new Map<string, readonly string[]>();
/** A file's readings: its raw text, then the cooked, parsed or decoded readings its extension carries. */
function readingsOf(path: string, text: string): readonly string[] {
  const key = `${path}\0${text}`;
  const cached = readingsCache.get(key);
  if (cached !== undefined) return cached;
  const extension = extname(path).toLowerCase();
  const readings = [text];
  if (CODE_EXTENSIONS.has(extension)) readings.push(...cookedParts(path, text));
  else if (extension === ".json") readings.push(...jsonParts(text));
  else if (MARKUP_EXTENSIONS.has(extension)) readings.push(decoded(text));
  const normalized = readings.map(reading => reading.normalize("NFKD").replace(/\p{M}/gu, "")).filter((reading, index) => reading !== readings[index]);
  readings.push(...normalized);
  readingsCache.set(key, readings);
  return readings;
}
/** The judges that fire on a file: any of its readings carries the mention. */
function mentionsIn(path: string, text: string, judges: readonly Judge[]): Judge[] {
  note("mention-judge");
  const readings = readingsOf(path, text);
  return judges.filter(judge => readings.some(reading => JUDGES[judge].test(reading)));
}
/** The claim families a file spells in any reading. */
function claimsIn(path: string, text: string): Family[] {
  note("claim-judge");
  const readings = readingsOf(path, text);
  return FAMILIES.filter(family => readings.some(reading => CLAIMS[family].test(reading)));
}
/** The claim families a rendered label spells. */
function claimsOfLabel(label: string): Family[] {
  note("claim-judge");
  return FAMILIES.filter(family => CLAIMS[family].test(label));
}

// ---- the walks ----

const ROOTS = ["src", "qa", "examples", "docs", "front"] as const;
type Root = (typeof ROOTS)[number];
/** The roots whose files are code a bridge host could be: read for the SDK and the record. Pages are read for the record. */
const CODE_ROOTS: readonly Root[] = ["src", "qa", "examples"];
const PATHSPECS: Readonly<Record<Root, readonly string[]>> = {
  src: ["src"],
  qa: ["qa"],
  examples: ["examples"],
  docs: ["docs", `:(exclude)${RECEIPTS}`],
  front: [":(glob)*.md"],
};
/** A walk listing fewer files than its floor read nothing. */
const FLOORS: Readonly<Record<Root, number>> = { src: 100, qa: 40, examples: 3, docs: 20, front: 3 };
/** Each walk must list its anchors and read each anchor's token from its text; a root with subtrees has one anchor outside the other's. */
const ANCHORS: Readonly<Record<Root, readonly { readonly path: string; readonly token: string }[]>> = {
  src: [
    { path: "src/workbench/redaction.ts", token: "export function sanitizeWorkbenchText(" },
    { path: "src/index.ts", token: "A pi extension providing Claude Code-style autonomous sub-agents" },
  ],
  qa: [{ path: "qa/workbench/receipts-index.mjs", token: "the receipts index is a RENDERED VIEW" }],
  examples: [
    { path: "examples/agent-tool-description.md", token: "Launch a new agent" },
    { path: "examples/workflows/compose.js", token: "reuse a saved workflow inside another one" },
  ],
  docs: [
    { path: DECISIONS_PAGE, token: "Decisions, risks, deliberate defaults" },
    { path: "docs/workflows.md", token: "# Scripted workflows" },
  ],
  front: [{ path: "README.md", token: "# @tintinweb/pi-subagents" }],
};
interface Entry {
  readonly path: string;
  readonly text: string;
  readonly binary: boolean;
}
const walked = new Map<Root, readonly Entry[]>();
/** git's would-commit listing under a root (tracked and untracked, never ignored, a regular file in the tree), each with its text. */
function walk(root: Root): readonly Entry[] {
  note(root);
  const cached = walked.get(root);
  if (cached !== undefined) return cached;
  const listed = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...PATHSPECS[root]], { cwd: ROOT, encoding: "utf8" });
  const paths = [...new Set(listed.split("\0").filter(path => path !== "" && existsSync(join(ROOT, path)) && statSync(join(ROOT, path)).isFile()))].sort();
  const entries = paths.map(path => {
    const bytes = readFileSync(join(ROOT, path));
    const binary = bytes.includes(0);
    return { path, text: binary ? "" : bytes.toString("utf8"), binary };
  });
  walked.set(root, entries);
  return entries;
}
function liveness(root: Root): { readonly floor: boolean; readonly anchor: boolean } {
  const entries = walk(root);
  const anchor = ANCHORS[root].every(({ path, token }) => entries.find(entry => entry.path === path)?.text.includes(token) === true);
  return { floor: entries.length >= FLOORS[root], anchor };
}
const judgesOf = (root: Root): readonly Judge[] => (CODE_ROOTS.includes(root) ? ["bridge", "sdk"] : ["bridge"]);
/** The root a path falls under (a root-level markdown file is front matter). */
const rootOf = (path: string): Root => ROOTS.find(root => root !== "front" && path.startsWith(`${root}/`)) ?? "front";
/** The files of a root a mention judge fires on, as `<path>: <judges>`. */
function mentionSites(root: Root): string[] {
  return walk(root).filter(entry => !entry.binary).flatMap(entry => {
    const found = mentionsIn(entry.path, entry.text, judgesOf(root));
    return found.length > 0 ? [`${entry.path}: ${found.join(", ")}`] : [];
  });
}
/** The files of a root that spell a claim family. */
function claimSites(root: Root, family: Family): string[] {
  return walk(root).filter(entry => !entry.binary && claimsIn(entry.path, entry.text).includes(family)).map(entry => entry.path);
}

const DEPENDENCY_MAPS = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"] as const;
const named = (name: string): boolean => JUDGES.bridge.test(name) || JUDGES.sdk.test(name);
/** The SDK or bridge packages a manifest declares, as `<map>:<name>`. */
function manifestFindings(text: string): string[] {
  note("manifest");
  const manifest: unknown = JSON.parse(text);
  if (!record(manifest)) return ["manifest:unreadable"];
  return DEPENDENCY_MAPS.flatMap(map => {
    const entries = manifest[map];
    return record(entries) ? Object.keys(entries).filter(named).map(name => `${map}:${name}`) : [];
  });
}
/** The lock's package paths that install an SDK or bridge package at any depth. */
function lockFindings(text: string): string[] {
  note("lock");
  const lock: unknown = JSON.parse(text);
  if (!record(lock) || !record(lock.packages)) return ["lock:unreadable"];
  return Object.keys(lock.packages).filter(named);
}

// ---- the decision half: the decision bead's export rows and the decision log ----

interface ExportRow {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly notes: string;
  readonly parents: readonly string[];
}
const FIELDS = ["title", "description", "notes"] as const;
function parseExport(text: string): ExportRow[] {
  const rows: ExportRow[] = [];
  const string = (value: unknown): string => (typeof value === "string" ? value : "");
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue;
    const row: unknown = JSON.parse(line);
    if (!record(row) || typeof row.id !== "string") continue;
    const edges = Array.isArray(row.dependencies) ? row.dependencies.filter(record) : [];
    const parents = edges.filter(edge => edge.type === "parent-child" && typeof edge.depends_on_id === "string").map(edge => string(edge.depends_on_id));
    rows.push({ id: row.id, title: string(row.title), description: string(row.description), notes: string(row.notes), parents });
  }
  return rows;
}
let exportCache: readonly ExportRow[] | undefined;
function exportRows(): readonly ExportRow[] {
  note("export");
  exportCache ??= parseExport(textOf(EXPORT));
  return exportCache;
}
function decisionPage(): string {
  note("decisions");
  return textOf(DECISIONS_PAGE);
}
/** The decision half's mentions: the bridge in the decision bead's row, in any child row (dotted id or parent-child edge), or in the log. */
function decisionFindings(rows: readonly ExportRow[], page: string): string[] {
  note("decision-reader");
  const family = rows.filter(row => row.id === DECISION_BEAD || row.id.startsWith(`${DECISION_BEAD}.`) || row.parents.includes(DECISION_BEAD));
  const found = family.flatMap(row => FIELDS.filter(field => mentionsIn(`${row.id}.json`, JSON.stringify(row[field]), ["bridge"]).length > 0).map(field => `${row.id}:${field}`));
  if (mentionsIn(DECISIONS_PAGE, page, ["bridge"]).length > 0) found.push(DECISIONS_PAGE);
  return found;
}

// ---- the armed contract: the census's reading of a Pi bridge host ----

interface Endpoint {
  readonly id: string;
  readonly owner: string;
  readonly visibility: string;
  readonly schema: string;
  readonly lane?: string;
  readonly invalidation?: string;
}
interface Contract {
  readonly local: string;
  readonly versions: readonly string[];
  readonly epochs: Readonly<Record<string, number>>;
  readonly feedbackBound: number;
  readonly endpoints: readonly Endpoint[];
}
interface Message {
  readonly kind: string;
  readonly endpoint: string;
  readonly source: string;
  readonly version: string;
  readonly schema: string;
  readonly digest: string;
  readonly epoch: number;
  readonly sequence: number;
  readonly messageId: string;
  readonly sourceRevision?: string;
  readonly feedback?: number;
  readonly value: unknown;
}
interface Receipt {
  readonly status: "admitted" | "rejected";
  readonly diagnostic?: string;
}
type Values = Readonly<Record<string, Readonly<Record<string, unknown>>>>;
interface Journal {
  readonly receipts: readonly Receipt[];
  readonly resync: readonly string[];
  readonly read: { readonly values: Values; readonly label: string };
}
interface Call {
  readonly contract: Contract;
  readonly messages: readonly Message[];
  readonly local: Readonly<Record<string, Json>>;
  /** The one seam: the only path by which an admitted message changes Pi's view. */
  readonly apply: (endpoint: string, value: unknown, index: number) => void;
}
type BridgeHost = (call: Call) => Journal;

/** The census allowlist: every code module bound as a bridge host, with its armed entry point. Empty today. */
const BRIDGE_HOSTS: readonly { readonly path: string; readonly host: BridgeHost }[] = [];

/** The rejection classes, in the order the oracle decides them. */
const CLASSES = [
  "executable-function-on-the-wire",
  "unauthorized-effect",
  "private-endpoint",
  "foreign-authority",
  "missing-disposition",
  "bad-version",
  "schema-mismatch",
  "bad-digest",
  "stale-epoch",
  "duplicate-message",
  "missing-basis",
  "unbounded-feedback",
  "gap-without-resync",
] as const;
type RejectionClass = (typeof CLASSES)[number];
/** Each part of the owner filing's "requires" quote and the class that guards it. */
const PART_CLASS: Readonly<Record<string, RejectionClass>> = {
  "endpoint visibility": "private-endpoint",
  schema: "schema-mismatch",
  direction: "foreign-authority",
  lane: "missing-disposition",
  "invalidation disposition": "missing-disposition",
  "source revision": "missing-basis",
  "message identity": "duplicate-message",
  "feedback bound": "unbounded-feedback",
  "explicit resync on gaps": "gap-without-resync",
};
/** The one :41 member whose class is not its own words: the private-port bridge is the private endpoint. */
const CHARTER_ALIASES: Readonly<Record<string, RejectionClass>> = { "invalid-private-port-bridge": "private-endpoint" };
/** The producer's executable-payload keys (FO-UI-05-a EXECUTABLE_PAYLOAD_KEYS), compared lower-cased. */
const EXECUTABLE_KEYS = ["code", "handler", "script", "function"] as const;
/** The wire kinds of charter :23 (snapshot/delta/ack/gap/resync); the value-bearing ones reach the seam. */
const WIRE_KINDS: readonly string[] = ["snapshot", "delta", "ack", "gap", "resync"];
const VALUE_KINDS: readonly string[] = ["snapshot", "delta", "resync"];
const PUBLIC = "public";

const DISPOSED = { lane: "does-not-cross", invalidation: "explicit" } as const;
const CONTRACT: Contract = {
  local: "pi",
  versions: ["1"],
  epochs: { browser: 3, server: 5 },
  feedbackBound: 2,
  endpoints: [
    { id: "browser/view", owner: "browser", visibility: PUBLIC, schema: "view/v1", ...DISPOSED },
    { id: "server/view", owner: "server", visibility: PUBLIC, schema: "view/v1", ...DISPOSED },
    { id: "pi/status", owner: "pi", visibility: PUBLIC, schema: "status/v1", ...DISPOSED },
    { id: "browser/secret", owner: "browser", visibility: "private", schema: "view/v1", ...DISPOSED },
    { id: "browser/bare", owner: "browser", visibility: PUBLIC, schema: "view/v1" },
    { id: "browser/half", owner: "browser", visibility: PUBLIC, schema: "view/v1", lane: DISPOSED.lane },
  ],
};
const LOCAL_VALUES: Readonly<Record<string, Json>> = { status: { state: "idle" } };

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (record(value)) {
    const keys = Object.keys(value).filter(key => typeof value[key] !== "function").sort();
    return `{${keys.map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  }
  return typeof value === "function" || value === undefined ? "null" : JSON.stringify(value);
}
const digestOf = (value: unknown): string => `sha256:${createHash("sha256").update(canonical(value)).digest("hex")}`;
/** A callable anywhere in the value, or (unless callables only are read) a key of EXECUTABLE_KEYS in any case. */
function executable(value: unknown, callablesOnly = false): boolean {
  if (typeof value === "function") return true;
  if (Array.isArray(value)) return value.some(item => executable(item, callablesOnly));
  if (!record(value)) return false;
  return Object.entries(value).some(([key, item]) => (!callablesOnly && (EXECUTABLE_KEYS as readonly string[]).includes(key.toLowerCase())) || executable(item, callablesOnly));
}
/** A deep copy of the data (a callable is not data and is carried as it is). */
function copyOf(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(copyOf);
  if (record(value)) return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, copyOf(item)]));
  return value;
}
function objectsIn(value: unknown, into: Set<object> = new Set()): Set<object> {
  if (typeof value === "object" && value !== null && !into.has(value)) {
    into.add(value);
    for (const item of Object.values(value)) objectsIn(item, into);
  }
  return into;
}
/** The applied value holds an object the wire message holds. */
function aliases(applied: unknown, sent: unknown): boolean {
  const wire = objectsIn(sent);
  return [...objectsIn(applied)].some(item => wire.has(item));
}
const split = (endpoint: string): { readonly domain: string; readonly port: string } => {
  const [domain = "", port = ""] = endpoint.split("/");
  return { domain, port };
};

function message(messageId: string, endpoint: string, kind: string, sequence: number, value: unknown, change: Partial<Message> = {}): Message {
  const { domain } = split(endpoint);
  const schema = CONTRACT.endpoints.find(entry => entry.id === endpoint)?.schema ?? "view/v1";
  const base: Message = {
    kind, endpoint, source: domain, version: "1", schema, digest: digestOf(value), epoch: CONTRACT.epochs[domain] ?? 0, sequence, messageId,
    sourceRevision: `rev-${messageId}`, feedback: 0, value,
  };
  return { ...base, ...change };
}
const snap = (messageId: string): Message => message(messageId, "browser/view", "snapshot", 1, { rows: [1] });
const delta = (messageId: string, change: Partial<Message> = {}): Message => message(messageId, "browser/view", "delta", 2, { rows: [2] }, change);
interface Fixture {
  readonly id: string;
  readonly messages: readonly Message[];
}
const FIXTURES: readonly Fixture[] = [
  {
    id: "F-SESSION",
    messages: [
      snap("s1"),
      message("s2", "browser/view", "delta", 2, { rows: [1, 2] }),
      message("s3", "browser/view", "ack", 2, null),
      message("s4", "browser/view", "delta", 3, { rows: [1, 2, 3] }),
    ],
  },
  { id: "F-READ", messages: [message("r1", "browser/view", "snapshot", 1, { rows: [1, 2] }), message("r2", "server/view", "snapshot", 1, { rows: [3] })] },
  { id: "F-VERSION", messages: [snap("v1"), delta("v2", { version: "2" })] },
  { id: "F-SCHEMA", messages: [snap("h1"), delta("h2", { schema: "view/v2" })] },
  { id: "F-DIGEST", messages: [snap("d1"), delta("d2", { digest: digestOf({ rows: [9] }) })] },
  { id: "F-EPOCH", messages: [snap("e1"), delta("e2", { epoch: 2 })] },
  { id: "F-DUPLICATE", messages: [snap("u1"), delta("u2"), delta("u2")] },
  { id: "F-BASIS", messages: [snap("b1"), delta("b2", { sourceRevision: undefined })] },
  { id: "F-DISPOSITION", messages: [message("p1", "browser/bare", "snapshot", 1, { rows: [1] }), message("p2", "browser/half", "snapshot", 1, { rows: [1] }), snap("p3")] },
  { id: "F-FEEDBACK", messages: [snap("k1"), delta("k2", { feedback: 3 }), delta("k3", { feedback: undefined })] },
  {
    id: "F-GAP",
    messages: [
      snap("g1"),
      message("g2", "browser/view", "delta", 3, { rows: [3] }),
      message("g3", "browser/view", "delta", 4, { rows: [4] }),
      message("g4", "browser/view", "resync", 10, { rows: [10] }),
      message("g5", "browser/view", "delta", 11, { rows: [11] }),
    ],
  },
  {
    id: "F-GAP-ANNOUNCED",
    messages: [
      snap("a1"),
      message("a2", "browser/view", "gap", 1, null),
      message("a3", "browser/view", "delta", 2, { rows: [2] }),
      message("a4", "browser/view", "resync", 5, { rows: [5] }),
      message("a5", "browser/view", "delta", 6, { rows: [6] }),
    ],
  },
  {
    id: "F-AUTHORITY",
    messages: [
      message("o1", "pi/status", "snapshot", 1, { state: "busy" }, { source: "browser", epoch: 3 }),
      message("o2", "browser/view", "snapshot", 1, { rows: [1] }, { source: "server", epoch: 5 }),
      snap("o3"),
    ],
  },
  { id: "F-PRIVATE", messages: [message("q1", "browser/secret", "snapshot", 1, { rows: [1] }), message("q2", "browser/undeclared", "snapshot", 1, { rows: [1] }), snap("q3")] },
  {
    id: "F-EXECUTABLE",
    messages: [message("x1", "browser/view", "snapshot", 1, { rows: [1], render: () => 1 }), message("x2", "browser/view", "snapshot", 1, { rows: [1], Handler: "rows => rows" }), snap("x3")],
  },
  { id: "F-EFFECT", messages: [snap("f1"), message("f2", "browser/view", "effect", 2, { verb: "stop" })] },
];
const fixture = (id: string): Fixture => FIXTURES.find(entry => entry.id === id) ?? { id, messages: [] };

interface Expected {
  readonly receipts: readonly Receipt[];
  readonly resync: readonly string[];
  readonly values: Values;
}
/** The census's oracle: every message's verdict in the fixed order, the endpoints that gapped and each runtime's own values. */
function expectation(fixture: Fixture): Expected {
  const receipts: Receipt[] = [];
  const resync: string[] = [];
  const seen = new Set<string>();
  const last = new Map<string, number>();
  const held = new Set<string>();
  const values: Record<string, Record<string, unknown>> = { [CONTRACT.local]: { ...LOCAL_VALUES } };
  const verdict = (entry: Message, endpoint: Endpoint | undefined): RejectionClass | undefined => {
    if (executable(entry.value)) return "executable-function-on-the-wire";
    if (!WIRE_KINDS.includes(entry.kind)) return "unauthorized-effect";
    if (endpoint === undefined || endpoint.visibility !== PUBLIC) return "private-endpoint";
    if (entry.source !== endpoint.owner || endpoint.owner === CONTRACT.local) return "foreign-authority";
    if (endpoint.lane === undefined || endpoint.invalidation === undefined) return "missing-disposition";
    if (!CONTRACT.versions.includes(entry.version)) return "bad-version";
    if (entry.schema !== endpoint.schema) return "schema-mismatch";
    if (entry.digest !== digestOf(entry.value)) return "bad-digest";
    if (entry.epoch < (CONTRACT.epochs[entry.source] ?? Number.POSITIVE_INFINITY)) return "stale-epoch";
    if (seen.has(entry.messageId)) return "duplicate-message";
    if (entry.sourceRevision === undefined || entry.sourceRevision === "") return "missing-basis";
    if (entry.feedback === undefined || entry.feedback > CONTRACT.feedbackBound) return "unbounded-feedback";
    const prior = last.get(endpoint.id);
    if (entry.kind === "delta" && (held.has(endpoint.id) || prior === undefined || entry.sequence !== prior + 1)) return "gap-without-resync";
    return undefined;
  };
  const gapped = (id: string): void => {
    held.add(id);
    if (!resync.includes(id)) resync.push(id);
  };
  for (const entry of fixture.messages) {
    const endpoint = CONTRACT.endpoints.find(item => item.id === entry.endpoint);
    const found = verdict(entry, endpoint);
    if (found !== undefined) {
      receipts.push({ status: "rejected", diagnostic: found });
      if (found === "gap-without-resync") gapped(entry.endpoint);
      continue;
    }
    seen.add(entry.messageId);
    receipts.push({ status: "admitted" });
    if (entry.kind === "gap") gapped(entry.endpoint);
    if (!VALUE_KINDS.includes(entry.kind)) continue;
    last.set(entry.endpoint, entry.sequence);
    held.delete(entry.endpoint);
    const { domain, port } = split(entry.endpoint);
    const view = values[domain] ?? {};
    view[port] = entry.value;
    values[domain] = view;
  }
  return { receipts, resync, values };
}

/** How a synthetic host departs from the honest one (an empty shape is the honest host). */
interface Shape {
  /** Rejection classes whose check the host skips. */
  readonly skip?: readonly RejectionClass[];
  readonly callablesOnly?: boolean;
  /** Treat an undeclared endpoint as a public one owned by its sender (the producer graph's own answer for an endpoint it does not hold). */
  readonly undeclaredOpen?: boolean;
  /** Every rejection under one code. */
  readonly collapse?: boolean;
  /** Reject every message: a host that admits nothing meets every refusal check trivially. */
  readonly refuseAll?: boolean;
  /** Hand the seam the ack and gap signals too. */
  readonly applySignals?: boolean;
  /** Ask to resync every endpoint a snapshot arrives on. */
  readonly resyncSpurious?: boolean;
  /** Hand the seam each admitted value twice. */
  readonly doubleApply?: boolean;
  /** Hand the seam a rejected message's value after rejecting it. */
  readonly rejectedApplied?: boolean;
  /** apply: no gap reading; silent: never ask to resync; resume: take the gapped sequence as the new base; ignore-announced: read no announced gap. */
  readonly gap?: "apply" | "silent" | "resume" | "ignore-announced";
  /** Hand the seam the wire's own value. */
  readonly alias?: boolean;
  /** Key the read by port across runtimes. */
  readonly merge?: boolean;
  /** A claim the label carries. */
  readonly claim?: Family;
  /** A change to Pi's view outside the seam, once per applied message. */
  readonly side?: () => void;
}
const CLAIM_SUFFIX: Readonly<Record<Family, string>> = { order: " (one globally ordered stream)", shared: " (one shared memory view)", merge: " (auto-merged)" };
function hostOf(shape: Shape): BridgeHost {
  const skipped = new Set<RejectionClass>(shape.skip ?? []);
  const on = (check: RejectionClass): boolean => !skipped.has(check);
  return call => {
    const receipts: Receipt[] = [];
    const resync: string[] = [];
    const seen = new Set<string>();
    const last = new Map<string, number>();
    const held = new Set<string>();
    const views = new Map<string, Map<string, unknown>>();
    const marks = new Map<string, string>();
    let current: { readonly entry: Message; readonly index: number } | undefined;
    const reject = (found: RejectionClass): void => {
      receipts.push({ status: "rejected", diagnostic: shape.collapse === true ? "rejected" : found });
      if (shape.rejectedApplied === true && current !== undefined) call.apply(current.entry.endpoint, copyOf(current.entry.value), current.index);
    };
    const askResync = (id: string): void => {
      if (shape.gap !== "silent" && !resync.includes(id)) resync.push(id);
    };
    for (const [index, entry] of call.messages.entries()) {
      current = { entry, index };
      if (shape.refuseAll === true) {
        reject("unauthorized-effect");
        continue;
      }
      const declared = call.contract.endpoints.find(item => item.id === entry.endpoint);
      const open: Endpoint = { id: entry.endpoint, owner: entry.source, visibility: PUBLIC, schema: entry.schema, ...DISPOSED };
      const endpoint = declared ?? (shape.undeclaredOpen === true ? open : undefined);
      if (on("executable-function-on-the-wire") && executable(entry.value, shape.callablesOnly === true)) {
        reject("executable-function-on-the-wire");
        continue;
      }
      if (on("unauthorized-effect") && !WIRE_KINDS.includes(entry.kind)) {
        reject("unauthorized-effect");
        continue;
      }
      if (endpoint === undefined || (on("private-endpoint") && endpoint.visibility !== PUBLIC)) {
        reject("private-endpoint");
        continue;
      }
      const checks: readonly [RejectionClass, boolean][] = [
        ["foreign-authority", entry.source !== endpoint.owner || endpoint.owner === call.contract.local],
        ["missing-disposition", endpoint.lane === undefined || endpoint.invalidation === undefined],
        ["bad-version", !call.contract.versions.includes(entry.version)],
        ["schema-mismatch", entry.schema !== endpoint.schema],
        ["bad-digest", entry.digest !== digestOf(entry.value)],
        ["stale-epoch", entry.epoch < (call.contract.epochs[entry.source] ?? Number.POSITIVE_INFINITY)],
        ["duplicate-message", seen.has(entry.messageId)],
        ["missing-basis", entry.sourceRevision === undefined || entry.sourceRevision === ""],
        ["unbounded-feedback", entry.feedback === undefined || entry.feedback > call.contract.feedbackBound],
      ];
      const failed = checks.find(([check, fails]) => fails && on(check));
      if (failed !== undefined) {
        reject(failed[0]);
        continue;
      }
      if (entry.kind === "gap" && shape.gap !== "ignore-announced") {
        held.add(endpoint.id);
        askResync(endpoint.id);
      }
      if (entry.kind === "delta" && shape.gap !== "apply") {
        const prior = last.get(endpoint.id);
        if (held.has(endpoint.id) || prior === undefined || entry.sequence !== prior + 1) {
          reject("gap-without-resync");
          askResync(endpoint.id);
          if (shape.gap === "resume") last.set(endpoint.id, entry.sequence);
          else held.add(endpoint.id);
          continue;
        }
      }
      seen.add(entry.messageId);
      receipts.push({ status: "admitted" });
      if (entry.kind === "ack" || entry.kind === "gap") {
        if (shape.applySignals === true) call.apply(endpoint.id, copyOf(entry.value), index);
        continue;
      }
      shape.side?.();
      const value = shape.alias === true ? entry.value : copyOf(entry.value);
      call.apply(endpoint.id, value, index);
      if (shape.doubleApply === true) call.apply(endpoint.id, copyOf(entry.value), index);
      if (shape.resyncSpurious === true && entry.kind === "snapshot") askResync(endpoint.id);
      last.set(endpoint.id, entry.sequence);
      held.delete(endpoint.id);
      const { domain, port } = split(endpoint.id);
      const view = views.get(domain) ?? new Map<string, unknown>();
      view.set(port, value);
      views.set(domain, view);
      marks.set(endpoint.id, `epoch ${entry.epoch}, sequence ${entry.sequence}`);
    }
    const perDomain: Record<string, Record<string, unknown>> = { [call.contract.local]: { ...(copyOf(call.local) as Record<string, unknown>) } };
    for (const [domain, view] of views) perDomain[domain] = { ...perDomain[domain], ...Object.fromEntries(view) };
    const merged: Record<string, unknown> = {};
    for (const view of Object.values(perDomain)) Object.assign(merged, view);
    const values: Values = shape.merge === true ? { merged } : perDomain;
    const positions = [...marks].sort(([left], [right]) => left.localeCompare(right)).map(([id, mark]) => `${id}: ${mark}`);
    const label = `${[...positions, `${call.contract.local}: local`].join("; ")}${shape.claim === undefined ? "" : CLAIM_SUFFIX[shape.claim]}`;
    return { receipts, resync, read: { values, label } };
  };
}
const HONEST = hostOf({});
/** The synthetic bindings that must each fail the armed check. */
const MUTANTS: Readonly<Record<string, Shape>> = {
  "M-EXECUTABLE": { skip: ["executable-function-on-the-wire"] },
  "M-CALLABLES-ONLY": { callablesOnly: true },
  "M-EFFECT": { skip: ["unauthorized-effect"] },
  "M-PRIVATE": { skip: ["private-endpoint"] },
  "M-UNDECLARED-OPEN": { undeclaredOpen: true },
  "M-FOREIGN": { skip: ["foreign-authority"] },
  "M-DISPOSITION": { skip: ["missing-disposition"] },
  "M-VERSION": { skip: ["bad-version"] },
  "M-SCHEMA": { skip: ["schema-mismatch"] },
  "M-DIGEST": { skip: ["bad-digest"] },
  "M-EPOCH": { skip: ["stale-epoch"] },
  "M-DUPLICATE": { skip: ["duplicate-message"] },
  "M-BASIS": { skip: ["missing-basis"] },
  "M-FEEDBACK": { skip: ["unbounded-feedback"] },
  "M-CODE-COLLAPSED": { collapse: true },
  "M-REFUSE-ALL": { refuseAll: true },
  "M-SIGNAL-APPLIED": { applySignals: true },
  "M-DOUBLE-APPLY": { doubleApply: true },
  "M-REJECTED-APPLIED": { rejectedApplied: true },
  "M-GAP-APPLY": { gap: "apply" },
  "M-GAP-SILENT": { gap: "silent" },
  "M-GAP-RESUME": { gap: "resume" },
  "M-ANNOUNCED-IGNORED": { gap: "ignore-announced" },
  "M-RESYNC-SPURIOUS": { resyncSpurious: true },
  "M-SHARED-REF": { alias: true },
  "M-MERGE": { merge: true },
  "M-ORDER-LABEL": { claim: "order" },
  "M-SHARED-LABEL": { claim: "shared" },
  "M-MERGE-LABEL": { claim: "merge" },
};

interface Drive {
  readonly journal: Journal;
  readonly calls: readonly { readonly endpoint: string; readonly value: unknown; readonly index: number }[];
}
function drive(host: BridgeHost, entry: Fixture): Drive {
  note("host");
  const calls: { readonly endpoint: string; readonly value: unknown; readonly index: number }[] = [];
  const journal = host({ contract: CONTRACT, messages: entry.messages, local: LOCAL_VALUES, apply: (endpoint, value, index) => calls.push({ endpoint, value, index }) });
  return { journal, calls };
}
const CHECKS = ["admit", "reject", "diagnostic", "resync", "aliased", "merged", "claim-order", "claim-shared", "claim-merge"] as const;
type Check = (typeof CHECKS)[number];
/** The checks one driven fixture fails, in CHECKS order. */
function violations(entry: Fixture, run: Drive): Check[] {
  const want = expectation(entry);
  const found = new Set<Check>();
  if (run.journal.receipts.length !== entry.messages.length) found.add("admit");
  for (const [index, sent] of entry.messages.entries()) {
    const expected = want.receipts[index];
    const receipt = run.journal.receipts[index];
    const applied = run.calls.filter(call => call.index === index).length;
    if (expected?.status === "admitted") {
      if (receipt?.status !== "admitted" || applied !== (VALUE_KINDS.includes(sent.kind) ? 1 : 0)) found.add("admit");
      continue;
    }
    if (receipt?.status !== "rejected" || applied > 0) found.add("reject");
    if (receipt?.diagnostic !== expected?.diagnostic) found.add("diagnostic");
  }
  if (!isDeepStrictEqual(run.journal.resync, want.resync)) found.add("resync");
  if (run.calls.some(call => aliases(call.value, entry.messages[call.index]?.value))) found.add("aliased");
  if (!isDeepStrictEqual(run.journal.read.values, want.values)) found.add("merged");
  for (const family of claimsOfLabel(run.journal.read.label)) found.add(`claim-${family}`);
  return CHECKS.filter(check => found.has(check));
}
/** One host over every fixture: the fixtures it fails, each with its failed checks. */
function violationsOf(host: BridgeHost): Record<string, Check[]> {
  return Object.fromEntries(FIXTURES.map(entry => [entry.id, violations(entry, drive(host, entry))] as const).filter(([, list]) => list.length > 0));
}
const mutant = (name: string): Record<string, Check[]> => violationsOf(hostOf(MUTANTS[name] ?? {}));
/** A driven fixture's receipts as `<status>` or `<status>:<diagnostic>`. */
const receiptsOf = (run: Drive): string[] => run.journal.receipts.map(receipt => (receipt.diagnostic === undefined ? receipt.status : `${receipt.status}:${receipt.diagnostic}`));
const indicesOf = (run: Drive): number[] => run.calls.map(call => call.index);

// ---- the judged rows (rule 16) ----

interface Row {
  readonly id: string;
  /** A title clause: the labels tile the title after its requirement prefix. Q's label names the residual rows. */
  readonly label: string;
  readonly pins: readonly string[];
}
/** Each pin's quote: a row's quotes tile its label. Q's pins name their residual families. */
const QUOTES: Readonly<Record<string, string>> = {
  G1: "Gating artifact: released FiberOpticsSDK PublicPortBridge (unshipped)",
  G2: "+ a wb-x32 committing decision connecting a Pi runtime over it",
  C1: "then Pi supplies the full bridge contract",
  C2: "(visibility/schema/direction through resync on gaps)",
  O1: "keeps one authority per runtime domain",
  P1: "admits no private endpoint",
  P2: "or remote executable function",
  N1: "and asserts no global ordering",
  N2: "shared memory",
  N3: "or implicit conflict merge",
  Q1: "R-SPELLING",
  Q2: "R-INDIRECT-LOAD",
  Q3: "R-DECISION-ELSEWHERE",
  Q4: "R-SIDE-PATH",
  Q5: "R-PARAPHRASE",
};
const ROWS: readonly Row[] = [
  { id: "G", label: "Gating artifact: released FiberOpticsSDK PublicPortBridge (unshipped) + a wb-x32 committing decision connecting a Pi runtime over it", pins: ["G1", "G2"] },
  { id: "C", label: "then Pi supplies the full bridge contract (visibility/schema/direction through resync on gaps)", pins: ["C1", "C2"] },
  { id: "O", label: "keeps one authority per runtime domain", pins: ["O1"] },
  { id: "P", label: "admits no private endpoint or remote executable function", pins: ["P1", "P2"] },
  { id: "N", label: "and asserts no global ordering, shared memory or implicit conflict merge", pins: ["N1", "N2", "N3"] },
  { id: "Q", label: "the residuals' pinned quiet rows", pins: ["Q1", "Q2", "Q3", "Q4", "Q5"] },
];

// ---- the planted controls and the residual members ----

const MANIFEST_PLANT = JSON.stringify({ name: "planted", dependencies: { "fiber-optics-sdk": "0.1.0" }, devDependencies: { "@public-port/bridge": "1.0.0", vitest: "4.0.0" } });
const LOCK_PLANT = JSON.stringify({ packages: { "": {}, "node_modules/fiberoptics": {}, "node_modules/a/node_modules/@x/public-port-bridge": {}, "node_modules/vitest": {} } });
/** Code plants, each judged as a file of its path; the rf identity key is the disclosed over-read. */
const CODE_PLANTS: Readonly<Record<string, { readonly path: string; readonly text: string }>> = {
  specifier: { path: "src/workbench/zz.ts", text: 'import { negotiate } from "fiber-optics-sdk/bridge";\n' },
  identifier: { path: "src/workbench/zz.ts", text: "export class PublicPortBridgeHost {}\n" },
  escaped: { path: "src/workbench/zz.ts", text: 'export const record = "\\u0050ublic\\u0050ort\\u0042ridge";\n' },
  folded: { path: "src/workbench/zz.ts", text: 'export const record = "\\u0050ublic" + ("\\u0050ort" + "\\u0042ridge");\n' },
  template: { path: "src/workbench/zz.ts", text: "export const record = `\\u0050ublicPortBridge $" + "{version}`;\n" },
  "escaped-identifier": { path: "src/workbench/zz.ts", text: "export const \\u0050ublicPortBridge = 1;\n" },
  normalized: { path: "src/workbench/zz.ts", text: `// ${String.fromCodePoint(0xff50, 0xff55, 0xff42, 0xff4c, 0xff49, 0xff43)} port bri${String.fromCodePoint(0x301)}dge\n` },
  comment: { path: "src/workbench/zz.ts", text: "// connects over the public-port bridge\n" },
  subprocess: { path: "qa/workbench/zz.mjs", text: 'spawn("python3", ["-I", "-m", "fiber_optics.bridge"]);\n' },
  "examples-sdk": { path: "examples/workflows/zz.js", text: "// spawns python -m fiber_optics.session\n" },
  json: { path: "src/workbench/zz.json", text: '{"\\u0066iber_optics": 1}\n' },
  "rf-identity-key": { path: "src/workbench/zz.ts", text: "const engines = provenance.sdk_versions.fiber_optics;\n" },
  quiet: { path: "src/workbench/zz.ts", text: 'const hook = "public-port resource hook"; // a port, a bridge\nconst fiber = 1; const optics = 2;\n' },
};
const PAGE_PLANTS: Readonly<Record<string, { readonly path: string; readonly text: string }>> = {
  page: { path: "docs/workbench/zz.md", text: "Pi connects the browser runtime over the PublicPortBridge.\n" },
  entity: { path: "docs/workbench/zz.md", text: "Pi connects over the Public&#80;ort&#x42;ridge.\n" },
  quiet: { path: "docs/workbench/zz.md", text: "A public-port resource hook lowers to readResource; FiberOpticsSDK ships the bridge.\n" },
  front: { path: "ZZ.md", text: "Pi connects over the public port bridge.\n" },
  "front-quiet": { path: "ZZ.md", text: "FiberOpticsSDK is the producer.\n" },
};
const row = (id: string, change: Partial<ExportRow>): ExportRow => ({ id, title: "", description: "", notes: "", parents: [], ...change });
const DECISION_PLANTS: Readonly<Record<string, { readonly rows: readonly ExportRow[]; readonly page: string }>> = {
  note: { rows: [row(DECISION_BEAD, { notes: "DECISION: connect the browser runtime over the PublicPortBridge." })], page: "" },
  child: { rows: [row(`${DECISION_BEAD}.9`, { title: "Connect a Pi runtime over the public-port bridge" })], page: "" },
  edge: { rows: [row("wb-zz01", { description: "Pi hosts a public_port_bridge session", parents: [DECISION_BEAD] })], page: "" },
  log: { rows: [], page: "| D-99 | Pi connects over Public&#80;ortBridge | adopted |\n" },
};
type Plant = { readonly path: string; readonly text: string };
const PAGE = "docs/workbench/zz.md";
const SCRIPT = "src/workbench/zz.ts";
const CLAIM_PLANTS: Readonly<Record<Family, { readonly read: Readonly<Record<string, Plant>>; readonly quiet: Readonly<Record<string, Plant>> }>> = {
  order: {
    read: {
      prose: { path: PAGE, text: "Pi renders one globally ordered stream.\n" },
      charter: { path: PAGE, text: "global transaction ordering\n" },
      camel: { path: SCRIPT, text: "const globalOrdering = true;\n" },
      negated: { path: PAGE, text: "no global ordering is asserted\n" },
      decoded: { path: PAGE, text: "globally&#32;ordered\n" },
    },
    quiet: { settings: { path: PAGE, text: "the global settings order\n" }, list: { path: PAGE, text: "an ordered list\n" } },
  },
  shared: {
    read: {
      hyphen: { path: PAGE, text: "a shared-memory view\n" },
      camel: { path: SCRIPT, text: "const sharedMemory = true;\n" },
      escaped: { path: SCRIPT, text: 'const label = "\\u0073hared memory";\n' },
      json: { path: "src/workbench/zz.json", text: '{"label": "shared\\u0020memory"}\n' },
    },
    quiet: { state: { path: PAGE, text: "shared state\n" }, store: { path: PAGE, text: "a memory store shared by name\n" } },
  },
  merge: {
    read: {
      hyphen: { path: PAGE, text: "an auto-merged read\n" },
      implicit: { path: PAGE, text: "implicitly merged values\n" },
      charter: { path: PAGE, text: "implicit optimistic conflict merge\n" },
      compact: { path: PAGE, text: "automerge\n" },
      normalized: { path: SCRIPT, text: `// ${String.fromCodePoint(0xff41, 0xff55, 0xff54, 0xff4f)}-merged\n` },
    },
    quiet: { loading: { path: PAGE, text: "never optimistic loading\n" }, request: { path: PAGE, text: "a merge request\n" }, save: { path: PAGE, text: "auto-save\n" } },
  },
};
/** Residual members: texts the mention judges stay quiet on (Q1, Q2), decision plants the reader stays quiet on (Q3), claims the claim judge stays quiet on (Q5). */
const SPELLINGS: Readonly<Record<string, { readonly path: string; readonly text: string }>> = {
  abbreviation: { path: "src/workbench/zz.ts", text: "const ppb = createPPB(); // FOSDK\n" },
  "split-statements": { path: "src/workbench/zz.ts", text: 'const a = "Public";\nconst b = "Port";\nconst c = "Bridge";\nexport const record = a + b + c;\n' },
  base64: { path: "src/workbench/zz.ts", text: 'export const record = atob("UHVibGljUG9ydEJyaWRnZQ==");\n' },
  "yaml-escape": { path: "docs/workbench/zz.yml", text: 'record: "\\u0050ublic\\u0050ort\\u0042ridge"\n' },
  homoglyph: { path: "src/workbench/zz.ts", text: `export class ${String.fromCodePoint(0x420)}ublicPortBridge {}\n` },
  "digit-substitution": { path: "src/workbench/zz.ts", text: "export class Pub1icPortBridge {}\n" },
};
const INDIRECT: Readonly<Record<string, { readonly path: string; readonly text: string }>> = {
  "environment-specifier": { path: "src/workbench/zz.ts", text: 'export const load = () => import(process.env.PI_RUNTIME_MODULE ?? "");\n' },
  "configured-subprocess": { path: "src/workbench/zz.ts", text: 'spawn(settings.python, ["-I", "-m", settings.module]);\n' },
  "configured-binary": { path: "src/workbench/zz.ts", text: "execFile(join(settings.binDir, settings.tool), settings.args);\n" },
};
const ELSEWHERE: Readonly<Record<string, { readonly rows: readonly ExportRow[]; readonly page: string }>> = {
  "other-bead-row": { rows: [row("wb-zz02", { notes: "Owner decision: Pi connects over the PublicPortBridge." })], page: "" },
  "sdk-only": { rows: [row(DECISION_BEAD, { notes: "Decision: Pi embeds the FiberOpticsSDK session for W10." })], page: "" },
  "work-package": { rows: [], page: "| D-98 | Pi adopts FO-UI-05 for the browser runtime | adopted |\n" },
};
const PARAPHRASES: Readonly<Record<string, string>> = {
  "total-order": "Pi shows one total order across the browser and server runtimes.\n",
  "single-timeline": "Both runtimes render on a single timeline.\n",
  "reversed-merge": "Conflicting edits are merged automatically.\n",
  "reversed-shared": "The two runtimes' memory is shared.\n",
  "last-writer-wins": "Concurrent writes resolve last writer wins.\n",
  "split-statements": 'const a = "globally";\nconst b = "ordered";\n',
};
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  Q1: Object.keys(SPELLINGS),
  Q2: Object.keys(INDIRECT),
  Q3: Object.keys(ELSEWHERE),
  Q4: ["side-path-host"],
  Q5: Object.keys(PARAPHRASES),
};
/** A plant judged exactly as a file of its path would be: its root's judges over its readings. */
const judgedPlant = (plant: { readonly path: string; readonly text: string }): Judge[] => mentionsIn(plant.path, plant.text, judgesOf(rootOf(plant.path)));
const mapOf = <T, R>(table: Readonly<Record<string, T>>, read: (value: T) => R): Record<string, R> => Object.fromEntries(Object.entries(table).map(([key, value]) => [key, read(value)]));

/** The falsifier leg of one claim family: every walked surface, the planted controls and the armed label. */
function falsifier(family: Family): Record<string, Json> {
  const surfaces = mapOf(Object.fromEntries(ROOTS.map(root => [root, root])), (root: Root) => claimSites(root, family));
  for (const [root, sites] of Object.entries(surfaces)) expect(sites, `no ${root} file spells a ${family} claim`).toEqual([]);
  const live = mapOf(Object.fromEntries(ROOTS.map(root => [root, root])), (root: Root) => liveness(root));
  for (const [root, reading] of Object.entries(live)) expect(reading, `the ${root} walk held its floor and read its anchor`).toEqual({ floor: true, anchor: true });
  const plants = CLAIM_PLANTS[family];
  const read = mapOf(plants.read, plant => claimsIn(plant.path, plant.text));
  const quiet = mapOf(plants.quiet, plant => claimsIn(plant.path, plant.text));
  for (const [name, found] of Object.entries(read)) expect(found, `the ${family} control ${name} is read`).toContain(family);
  for (const [name, found] of Object.entries(quiet)) expect(found, `the ${family} control ${name} is quiet`).toEqual([]);
  const honest = drive(HONEST, fixture("F-READ"));
  expect(claimsOfLabel(honest.journal.read.label), "the honest label of a two-runtime read spells no claim").toEqual([]);
  expect(honest.journal.read.label, "the label names each runtime's own epoch and sequence").toBe("browser/view: epoch 3, sequence 1; server/view: epoch 5, sequence 1; pi: local");
  return { surfaces, live, read, quiet, label: honest.journal.read.label };
}

// ---- the cases ----

const IMPL: Readonly<Record<string, () => Json>> = {
  G1: () => {
    const manifest = manifestFindings(textOf("package.json"));
    const lock = lockFindings(textOf("package-lock.json"));
    expect(manifest, "package.json declares no SDK or bridge package").toEqual([]);
    expect(lock, "package-lock.json installs no SDK or bridge package").toEqual([]);
    const sites = Object.fromEntries(ROOTS.map(root => [root, mentionSites(root)]));
    for (const [root, found] of Object.entries(sites)) expect(found, `no ${root} file mentions ${judgesOf(root as Root).join(" or ")}`).toEqual([]);
    const hosts = CODE_ROOTS.flatMap(root => (sites[root] ?? []).map(site => site.split(": ")[0] ?? ""));
    expect(hosts, "the code modules that mention the bridge or the SDK are exactly the bound hosts").toEqual(BRIDGE_HOSTS.map(entry => entry.path));
    const live = Object.fromEntries(ROOTS.map(root => [root, liveness(root)]));
    for (const [root, reading] of Object.entries(live)) expect(reading, `the ${root} walk held its floor and read its anchor`).toEqual({ floor: true, anchor: true });
    const controls = {
      manifest: manifestFindings(MANIFEST_PLANT),
      lock: lockFindings(LOCK_PLANT),
      code: mapOf(CODE_PLANTS, plant => judgedPlant(plant)),
      pages: mapOf(PAGE_PLANTS, plant => judgedPlant(plant)),
    };
    expect(controls.manifest, "the manifest control is read").toEqual(["dependencies:fiber-optics-sdk", "devDependencies:@public-port/bridge"]);
    expect(controls.lock, "the lock control is read").toEqual(["node_modules/fiberoptics", "node_modules/a/node_modules/@x/public-port-bridge"]);
    for (const [name, found] of Object.entries(controls.code)) {
      if (name === "quiet") expect(found, "an rf public-port hook and split words are no mention").toEqual([]);
      else expect(found.length, `the ${name} control is read`).toBeGreaterThan(0);
    }
    expect(controls.pages, "the page controls: the record read, the producer name on a page is not judged").toEqual({ page: ["bridge"], entity: ["bridge"], quiet: [], front: ["bridge"], "front-quiet": [] });
    return { manifest, lock, sites, hosts, bound: BRIDGE_HOSTS.map(entry => entry.path), live, controls };
  },
  G2: () => {
    const rows = exportRows();
    const found = decisionFindings(rows, decisionPage());
    const decisionRow = rows.find(entry => entry.id === DECISION_BEAD);
    expect(decisionRow, `${DECISION_BEAD}'s row was read from the export`).toBeDefined();
    expect(found, "no decision row, child row or decision log row mentions the bridge").toEqual([]);
    const controls = mapOf(DECISION_PLANTS, plant => decisionFindings(plant.rows, plant.page));
    expect(controls, "every planted decision is read").toEqual({ note: [`${DECISION_BEAD}:notes`], child: [`${DECISION_BEAD}.9:title`], edge: ["wb-zz01:description"], log: [DECISIONS_PAGE] });
    return { rowRead: decisionRow !== undefined, found, controls };
  },
  C1: () => {
    const bound = BRIDGE_HOSTS.map(entry => ({ path: entry.path, violations: violationsOf(entry.host) }));
    for (const entry of bound) expect(entry.violations, `${entry.path} meets every check`).toEqual({});
    const honest = violationsOf(HONEST);
    expect(honest, "the honest host meets every check on every fixture").toEqual({});
    const judged = mapOf(MUTANTS, shape => violationsOf(hostOf(shape)));
    const fired = CHECKS.filter(check => Object.values(judged).some(table => Object.values(table).some(list => list.includes(check))));
    const quiet = Object.entries(judged).filter(([, table]) => Object.keys(table).length === 0).map(([name]) => name);
    expect(fired, "every check fires on some mutant").toEqual([...CHECKS]);
    expect(quiet, "every mutant fails some check").toEqual([]);
    const isolated = CHECKS.filter(check => Object.values(judged).some(table => Object.keys(table).length > 0 && Object.values(table).every(list => list.length === 1 && list[0] === check)));
    expect(isolated, "every check is the only check some mutant fails").toEqual([...CHECKS]);
    const verdicts = Object.fromEntries(FIXTURES.map(entry => [entry.id, receiptsOf(drive(HONEST, entry))]));
    const covered = CLASSES.filter(found => Object.values(verdicts).some(list => list.includes(`rejected:${found}`)));
    expect(covered, "every class is the honest host's diagnostic on some fixture message").toEqual([...CLASSES]);
    const session = drive(HONEST, fixture("F-SESSION"));
    expect(receiptsOf(session), "the session is admitted").toEqual(["admitted", "admitted", "admitted", "admitted"]);
    expect(indicesOf(session), "the ack is admitted and never applied").toEqual([0, 1, 3]);
    const fields = ["M-DISPOSITION", "M-VERSION", "M-SCHEMA", "M-DIGEST", "M-EPOCH", "M-DUPLICATE", "M-BASIS", "M-FEEDBACK", "M-CODE-COLLAPSED", "M-REFUSE-ALL", "M-SIGNAL-APPLIED", "M-DOUBLE-APPLY", "M-REJECTED-APPLIED"];
    return { bound: bound.map(entry => entry.path), fixtures: FIXTURES.map(entry => entry.id), verdicts, fired, quiet, isolated, mutants: Object.fromEntries(fields.map(name => [name, judged[name] ?? {}])) };
  },
  C2: () => {
    const gap = drive(HONEST, fixture("F-GAP"));
    const announced = drive(HONEST, fixture("F-GAP-ANNOUNCED"));
    const quietStreams = FIXTURES.filter(entry => !entry.id.startsWith("F-GAP")).flatMap(entry => drive(HONEST, entry).journal.resync);
    expect(quietStreams, "no endpoint without a gap is asked to resync").toEqual([]);
    expect(receiptsOf(gap), "a detected gap is rejected until the resync").toEqual(["admitted", "rejected:gap-without-resync", "rejected:gap-without-resync", "admitted", "admitted"]);
    expect(receiptsOf(announced), "an announced gap holds the next delta until the resync").toEqual(["admitted", "admitted", "rejected:gap-without-resync", "admitted", "admitted"]);
    expect([gap.journal.resync, announced.journal.resync], "each gap asks for one resync of its endpoint").toEqual([["browser/view"], ["browser/view"]]);
    expect([indicesOf(gap), indicesOf(announced)], "no delta after a gap reaches the seam before the resync").toEqual([[0, 3, 4], [0, 3, 4]]);
    return {
      gap: receiptsOf(gap), announced: receiptsOf(announced), resync: [gap.journal.resync, announced.journal.resync], applied: [indicesOf(gap), indicesOf(announced)],
      "M-GAP-APPLY": mutant("M-GAP-APPLY"), "M-GAP-SILENT": mutant("M-GAP-SILENT"), "M-GAP-RESUME": mutant("M-GAP-RESUME"), "M-ANNOUNCED-IGNORED": mutant("M-ANNOUNCED-IGNORED"),
      "M-RESYNC-SPURIOUS": mutant("M-RESYNC-SPURIOUS"),
    };
  },
  O1: () => {
    const run = drive(HONEST, fixture("F-AUTHORITY"));
    expect(receiptsOf(run), "a remote write into Pi's own endpoint and a non-owner's write are rejected").toEqual(["rejected:foreign-authority", "rejected:foreign-authority", "admitted"]);
    const owners = Object.fromEntries(CONTRACT.endpoints.map(entry => [entry.id, entry.owner]));
    return { receipts: receiptsOf(run), applied: indicesOf(run), values: run.journal.read.values as Json, owners, "M-FOREIGN": mutant("M-FOREIGN") };
  },
  P1: () => {
    const run = drive(HONEST, fixture("F-PRIVATE"));
    expect(receiptsOf(run), "a private and an undeclared endpoint are rejected").toEqual(["rejected:private-endpoint", "rejected:private-endpoint", "admitted"]);
    return { receipts: receiptsOf(run), applied: indicesOf(run), "M-PRIVATE": mutant("M-PRIVATE"), "M-UNDECLARED-OPEN": mutant("M-UNDECLARED-OPEN") };
  },
  P2: () => {
    const payload = drive(HONEST, fixture("F-EXECUTABLE"));
    const effect = drive(HONEST, fixture("F-EFFECT"));
    expect(receiptsOf(payload), "a callable and an executable key on the wire are rejected").toEqual(["rejected:executable-function-on-the-wire", "rejected:executable-function-on-the-wire", "admitted"]);
    expect(receiptsOf(effect), "a remote effect request is rejected").toEqual(["admitted", "rejected:unauthorized-effect"]);
    return {
      payload: receiptsOf(payload), effect: receiptsOf(effect), applied: [indicesOf(payload), indicesOf(effect)], keys: [...EXECUTABLE_KEYS],
      "M-EXECUTABLE": mutant("M-EXECUTABLE"), "M-CALLABLES-ONLY": mutant("M-CALLABLES-ONLY"), "M-EFFECT": mutant("M-EFFECT"),
    };
  },
  N1: () => ({ ...falsifier("order"), "M-ORDER-LABEL": mutant("M-ORDER-LABEL") }),
  N2: () => {
    const run = drive(HONEST, fixture("F-READ"));
    const aliased = run.calls.some(call => aliases(call.value, fixture("F-READ").messages[call.index]?.value));
    expect(aliased, "the honest host hands the seam a copy, never the wire's object").toBe(false);
    return { ...falsifier("shared"), aliased, "M-SHARED-REF": mutant("M-SHARED-REF"), "M-SHARED-LABEL": mutant("M-SHARED-LABEL") };
  },
  N3: () => {
    const run = drive(HONEST, fixture("F-READ"));
    expect(run.journal.read.values, "the read keeps each runtime's own values").toEqual({ pi: LOCAL_VALUES, browser: { view: { rows: [1, 2] } }, server: { view: { rows: [3] } } });
    return { ...falsifier("merge"), values: run.journal.read.values as Json, "M-MERGE": mutant("M-MERGE"), "M-MERGE-LABEL": mutant("M-MERGE-LABEL") };
  },
  Q1: () => {
    const findings = mapOf(SPELLINGS, plant => judgedPlant(plant));
    expect(Object.values(findings).flat(), "R-SPELLING: every member is quiet").toEqual([]);
    return findings;
  },
  Q2: () => {
    const findings = mapOf(INDIRECT, plant => judgedPlant(plant));
    expect(Object.values(findings).flat(), "R-INDIRECT-LOAD: every member is quiet").toEqual([]);
    return findings;
  },
  Q3: () => {
    const findings = mapOf(ELSEWHERE, plant => decisionFindings(plant.rows, plant.page));
    expect(Object.values(findings).flat(), "R-DECISION-ELSEWHERE: every member is quiet").toEqual([]);
    return findings;
  },
  Q4: () => {
    let side = 0;
    const found = violationsOf(
      hostOf({
        side: () => {
          side += 1;
        },
      }),
    );
    expect(found, "R-SIDE-PATH: the armed check reads the seam only").toEqual({});
    expect(side, "the side path was taken").toBeGreaterThan(0);
    return { violations: found, sideTaken: side > 0 };
  },
  Q5: () => {
    const findings = mapOf(PARAPHRASES, text => claimsIn("src/workbench/zz.ts", text));
    expect(Object.values(findings).flat(), "R-PARAPHRASE: every member is quiet").toEqual([]);
    return findings;
  },
};

// ---- the roster and the outside anchors ----

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly witnesses: Readonly<Record<string, Json>>;
  readonly readers: Readonly<Record<string, readonly string[]>>;
  readonly tests: readonly string[];
  readonly producer: {
    readonly repo: string;
    readonly path: string;
    readonly sha: string;
    readonly blob: string;
    readonly lines: Readonly<Record<string, string>>;
  };
}
const ROSTER = JSON.parse(textOf(ROSTER_PATH)) as Roster;
const REACHED: { readonly pin: string; readonly same: boolean }[] = [];

/** What the anchors read from the owner filing: its PROGRAM line only, so a note appended later binds nothing. */
function filingReading(notes: string): {
  readonly citation?: { readonly path: string; readonly lines: readonly number[]; readonly sha: string };
  readonly authority: readonly string[];
  readonly gate?: { readonly record: string; readonly decision: string };
  readonly shape: readonly string[];
  readonly parts: readonly string[];
  readonly falsifier: readonly string[];
  readonly frozen: boolean;
} {
  const line = notes.split("\n").find(entry => entry.startsWith(PROGRAM_OPENING)) ?? "";
  const cited = /charter (docs\/programs\/[\w.-]+\.md):(\d+),:(\d+)@([0-9a-f]{7,40}), design charter only/.exec(line);
  const authority = /Authority: (.*?) Pi connects no FOA runtimes today/.exec(line)?.[1] ?? "";
  const gate = /binds only on the conjoint gate \(released (\w+) \+ (wb-[0-9a-z.]+) committing decision\)/.exec(line);
  const listOf = (text: string): string[] => text.split(/, and |, | and (?=an? )|, or | or /).filter(item => item !== "");
  const requires = /the bridge 'requires ([^']+)'/.exec(line)?.[1] ?? "";
  const parts = requires.split(/, and |, /).flatMap(item => item.split("/").flatMap(part => part.split(" and ")));
  return {
    citation: cited ? { path: cited[1] ?? "", lines: [Number(cited[2]), Number(cited[3])], sha: cited[4] ?? "" } : undefined,
    authority: [...authority.matchAll(/'([^']+)'/g)].map(match => match[1] ?? ""),
    gate: gate ? { record: gate[1] ?? "", decision: gate[2] ?? "" } : undefined,
    shape: listOf(/Acceptance shape: typed rejection fixtures for (.+?) \(the charter's/.exec(line)?.[1] ?? ""),
    parts,
    falsifier: listOf(/a falsifier that no Pi surface renders a cross-runtime read as (.+?)\. Until both gates exist/.exec(line)?.[1] ?? ""),
    frozen: line.includes("Until both gates exist, no src or docs change."),
  };
}
const kebab = (words: string): string => words.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
/** A list item's classes: its article dropped, a slash distributing the words before the slashed word ("bad version/digest"). */
function classesOf(item: string): string[] {
  const bare = item.replace(/^(?:an?|the) /i, "");
  const [head = "", ...rest] = bare.split("/");
  const words = head.split(" ");
  const lead = words.slice(0, -1).join(" ");
  return [head, ...rest.map(part => (part.includes(" ") || lead === "" ? part : `${lead} ${part}`))].map(kebab);
}
/** The quotes tile the text in order, with nothing but separators between them. */
function tiles(text: string, quotes: readonly string[]): boolean {
  const separator = /^[\s,;:.()]*$/;
  let at = 0;
  for (const quote of quotes) {
    const found = text.indexOf(quote, at);
    if (found < 0 || !separator.test(text.slice(at, found))) return false;
    at = found + quote.length;
  }
  return separator.test(text.slice(at));
}
const capitals = (token: string): string[] => (token.match(/[A-Z][a-z]+/g) ?? []).map(word => word.toLowerCase());

describe(SUITE, () => {
  for (const entry of ROWS) {
    for (const pin of entry.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: LIVE_BUDGET_MS }, () => {
        const implementation = IMPL[pin];
        ACTIVE = pin;
        let witness: Json = null;
        try {
          witness = implementation === undefined ? null : implementation();
        } finally {
          ACTIVE = undefined;
        }
        expect(witness, `${pin} has a case`).not.toBeNull();
        const expected = ROSTER.witnesses[pin];
        REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
        expect(witness, `${pin}'s witness equals the roster's`).toStrictEqual(expected);
      });
    }
  }

  it("rule 16: the rows, the residual families, the classes, the contract parts, the claim families, the checks, the mutants, the fixtures, the words, the walks (floors, pathspecs, code roots and anchors) and the hosts are frozen at their measured shape", () => {
    expect(ROWS.map(entry => `${entry.id}:${entry.pins.length}`)).toEqual(["G:2", "C:2", "O:1", "P:2", "N:3", "Q:5"]);
    expect(Object.entries(RESIDUALS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:6", "Q2:3", "Q3:3", "Q4:1", "Q5:6"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(entry => entry.pins));
    expect(Object.keys(IMPL), "one case per pin, in row order").toEqual(ROWS.flatMap(entry => entry.pins));
    expect(CLASSES).toEqual([
      "executable-function-on-the-wire",
      "unauthorized-effect",
      "private-endpoint",
      "foreign-authority",
      "missing-disposition",
      "bad-version",
      "schema-mismatch",
      "bad-digest",
      "stale-epoch",
      "duplicate-message",
      "missing-basis",
      "unbounded-feedback",
      "gap-without-resync",
    ]);
    expect(Object.entries(PART_CLASS).map(([part, found]) => `${part}:${found}`)).toEqual([
      "endpoint visibility:private-endpoint",
      "schema:schema-mismatch",
      "direction:foreign-authority",
      "lane:missing-disposition",
      "invalidation disposition:missing-disposition",
      "source revision:missing-basis",
      "message identity:duplicate-message",
      "feedback bound:unbounded-feedback",
      "explicit resync on gaps:gap-without-resync",
    ]);
    expect(FAMILIES).toEqual(["order", "shared", "merge"]);
    expect(CHECKS).toEqual(["admit", "reject", "diagnostic", "resync", "aliased", "merged", "claim-order", "claim-shared", "claim-merge"]);
    expect(Object.keys(MUTANTS)).toEqual([
      "M-EXECUTABLE",
      "M-CALLABLES-ONLY",
      "M-EFFECT",
      "M-PRIVATE",
      "M-UNDECLARED-OPEN",
      "M-FOREIGN",
      "M-DISPOSITION",
      "M-VERSION",
      "M-SCHEMA",
      "M-DIGEST",
      "M-EPOCH",
      "M-DUPLICATE",
      "M-BASIS",
      "M-FEEDBACK",
      "M-CODE-COLLAPSED",
      "M-REFUSE-ALL",
      "M-SIGNAL-APPLIED",
      "M-DOUBLE-APPLY",
      "M-REJECTED-APPLIED",
      "M-GAP-APPLY",
      "M-GAP-SILENT",
      "M-GAP-RESUME",
      "M-ANNOUNCED-IGNORED",
      "M-RESYNC-SPURIOUS",
      "M-SHARED-REF",
      "M-MERGE",
      "M-ORDER-LABEL",
      "M-SHARED-LABEL",
      "M-MERGE-LABEL",
    ]);
    expect(FIXTURES.map(entry => `${entry.id}:${entry.messages.length}`)).toEqual([
      "F-SESSION:4",
      "F-READ:2",
      "F-VERSION:2",
      "F-SCHEMA:2",
      "F-DIGEST:2",
      "F-EPOCH:2",
      "F-DUPLICATE:3",
      "F-BASIS:2",
      "F-DISPOSITION:3",
      "F-FEEDBACK:3",
      "F-GAP:5",
      "F-GAP-ANNOUNCED:5",
      "F-AUTHORITY:3",
      "F-PRIVATE:3",
      "F-EXECUTABLE:3",
      "F-EFFECT:2",
    ]);
    expect([BRIDGE_WORDS, SDK_WORDS, EXECUTABLE_KEYS, WIRE_KINDS, VALUE_KINDS]).toEqual([
      ["public", "port", "bridge"],
      ["fiber", "optics"],
      ["code", "handler", "script", "function"],
      ["snapshot", "delta", "ack", "gap", "resync"],
      ["snapshot", "delta", "resync"],
    ]);
    expect(FLOORS).toEqual({ src: 100, qa: 40, examples: 3, docs: 20, front: 3 });
    expect([PATHSPECS, CODE_ROOTS]).toEqual([{ src: ["src"], qa: ["qa"], examples: ["examples"], docs: ["docs", ":(exclude)docs/workbench/receipts/"], front: [":(glob)*.md"] }, ["src", "qa", "examples"]]);
    expect(Object.entries(ANCHORS).map(([root, anchors]) => `${root}:${anchors.map(anchor => anchor.path).join(",")}`)).toEqual([
      "src:src/workbench/redaction.ts,src/index.ts",
      "qa:qa/workbench/receipts-index.mjs",
      "examples:examples/agent-tool-description.md,examples/workflows/compose.js",
      "docs:docs/workbench/18-decisions-and-risks.md,docs/workflows.md",
      "front:README.md",
    ]);
    expect(BRIDGE_HOSTS).toEqual([]);
  });

  it("the outside anchors: the bead's title binds the rows, the quotes, the words and the decision bead; the owner filing binds the derived classes, the contract parts, the claim families, the gate and the producer citation; the producer's :41, :17, :19 and :23 lines bind the charter-only classes, the three families, the unshipped heading and the record's own line", { timeout: 60_000 }, () => {
    const rows = parseExport(textOf(EXPORT));
    const own = rows.find(entry => entry.id === BEAD);
    expect(own, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    const title = own?.title ?? "";
    const prefix = `[${REQUIREMENT}] `;
    expect(title.startsWith(prefix), "the title opens with the requirement id").toBe(true);
    const clauses = ROWS.filter(entry => entry.id !== "Q");
    expect(tiles(title.slice(prefix.length), clauses.map(entry => entry.label)), "the row labels tile the title in order").toBe(true);
    for (const entry of clauses) expect(tiles(entry.label, entry.pins.map(pin => QUOTES[pin] ?? "")), `row ${entry.id}'s pin quotes tile its label`).toBe(true);
    const tokens = /released (\w+)SDK (\w+) \(unshipped\) \+ a (wb-[0-9a-z.]+) committing decision/.exec(title);
    expect(capitals(tokens?.[2] ?? ""), "the bridge words are the title's record token").toEqual([...BRIDGE_WORDS]);
    expect(capitals(tokens?.[1] ?? ""), "the SDK words are the title's producer token").toEqual([...SDK_WORDS]);
    expect(tokens?.[3], "the decision bead is the title's").toBe(DECISION_BEAD);
    const filing = filingReading(own?.notes ?? "");
    expect(filing.gate, "the owner filing's gate names the same record and decision bead").toEqual({ record: tokens?.[2] ?? "-", decision: DECISION_BEAD });
    expect(filing.frozen, "the owner filing freezes src and docs until both gates exist").toBe(true);
    const shapeClasses = filing.shape.flatMap(classesOf);
    expect(filing.shape.length, "the acceptance shape lists five items").toBe(5);
    expect(shapeClasses.filter(found => !(CLASSES as readonly string[]).includes(found)), "every class the acceptance shape derives is armed").toEqual([]);
    expect(shapeClasses.length, "and it derives seven").toBe(7);
    expect(filing.parts, "the requires quote's parts are PART_CLASS's keys, in order").toEqual(Object.keys(PART_CLASS));
    expect(filing.falsifier.map(item => claimsOfLabel(item)), "the falsifier's items read one claim family each, in order").toEqual(FAMILIES.map(family => [family]));
    expect(clauses.find(entry => entry.id === "N")?.pins.map(pin => claimsOfLabel(QUOTES[pin] ?? "")), "row N's quotes read the same families").toEqual(FAMILIES.map(family => [family]));
    const appended = `${own?.notes ?? ""}\n2026-10-28 appended note: Acceptance shape: typed rejection fixtures for a planted class (the charter's planted).`;
    expect(filingReading(appended), "a note appended after the owner filing changes no reading").toEqual(filing);
    const forged = `${own?.notes ?? ""}\n${PROGRAM_OPENING}(planted) the bridge 'requires planted parts' Acceptance shape: typed rejection fixtures for a planted class (the charter's planted).`;
    expect(filingReading(forged), "an appended line that opens like the owner filing changes no reading (the first one binds)").toEqual(filing);
    const producer = ROSTER.producer;
    expect(producer.repo, "the producer is FiberOpticsSDK").toBe("FiberOpticsSDK");
    expect(producer.path, "the producer path is the owner filing's citation").toBe(filing.citation?.path);
    expect(producer.sha.startsWith(filing.citation?.sha ?? "-"), "the producer sha is the citation's pin").toBe(true);
    for (const cited of filing.citation?.lines ?? []) expect(Object.keys(producer.lines), `the producer block carries cited line ${cited}`).toContain(String(cited));
    const charter = [producer.lines["17"] ?? "", producer.lines["23"] ?? ""];
    expect(filing.authority.length, "the owner filing quotes four authority sentences").toBe(4);
    for (const quote of filing.authority) expect(charter.some(text => text.toLowerCase().includes(quote.toLowerCase())), `the authority quote '${quote}' is a cited line's text`).toBe(true);
    const required = /^- (.+) are rejected with stable diagnostics\.$/.exec(producer.lines["41"] ?? "")?.[1] ?? "";
    const charterClasses = required.split(/, | and /).flatMap(classesOf).map(found => CHARTER_ALIASES[found] ?? found);
    expect(charterClasses.filter(found => !(CLASSES as readonly string[]).includes(found)), "every :41 member is an armed class").toEqual([]);
    expect(charterClasses.filter(found => !shapeClasses.includes(found)), ":41's members outside the notes' list").toEqual(["missing-basis", "unauthorized-effect", "unbounded-feedback"]);
    expect(claimsOfLabel(producer.lines["17"] ?? ""), ":17's prohibition reads all three families").toEqual([...FAMILIES]);
    expect(producer.lines["19"], "the producer's interfaces heading still reads unshipped").toBe("## Proposed interfaces (unshipped)");
    expect(producer.lines["23"]?.startsWith(`- ${tokens?.[2] ?? "-"}: `), ":23 is the record's own line").toBe(true);
  });

  it("roster: the judged rows, the quotes, the residual members, the readers and the registered tests equal test/fixtures/foa-public-port-bridge-roster.json, in order and both ways; every pin reached its witness compare", ({ task }) => {
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
    expect(RESIDUALS, "the residual members equal the roster's").toEqual(ROSTER.residuals);
    expect(Object.keys(ROSTER.witnesses), "one roster witness per pin, in row order").toEqual(ROWS.flatMap(entry => entry.pins));
    expect(Object.fromEntries(READS), "every pin ran exactly the roster's readers").toEqual(ROSTER.readers);
    expect(Object.keys(ROSTER.readers), "one reader list per pin, in row order").toEqual(ROWS.flatMap(entry => entry.pins));
    const walkedTests: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walkedTests.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    const titles = walkedTests.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walkedTests.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walkedTests.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(walkedTests.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED.map(entry => entry.pin), "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(entry => entry.pins));
    expect(REACHED.filter(entry => !entry.same).map(entry => entry.pin), "and each compare held").toEqual([]);
  });
});
