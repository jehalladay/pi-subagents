/**
 * wb-4ap.12 (COLLECTIVE-ADAPTATION-R12, program-triage-2026-10-17), the Furnace episode-lineage census: the until-then
 * leg of a trigger-gated requirement whose upstream record has not shipped.
 * Statement (the bead's export title, verbatim up to its own truncation): "When @furnace/sdk publishes Furnace F2's
 * persistent episode lineage (FRC-01: episode, task, actor, attempt, policy-revision and artifact refs on
 * AttemptDto/RunStatusDto), the Furnace observer shall project each ref additively as a provenanced snapshot facet or
 * typed edge (never causation, never ownership without a native confirmation reference), with absent keys keeping
 * today's output byte-identical."
 *
 * MEASURED (read-only, 2026-10-28/29; by cut #1 at base f5589e0 and 695105d, re-read by cut #2 at 51f4db4 and by cut #3
 * at c843ed5, whose landings 596-653 touched neither the vendored SDK nor the observer). The installed @furnace/sdk is
 * 0.1.0 from vendor/furnace-sdk-0.1.0.tgz: 128 regular files in 12 directories and no entry of any other kind
 * (byte-identical to the tarball's package tree at cut #3), 28 of them TypeScript declaration files (the only
 * TypeScript files it ships), each an ES module with no reference directive and no global augmentation. Its entry,
 * package.json's types, is dist/src/index.d.ts, which re-exports dist/src/protocol.d.ts. Read through the TypeScript
 * type checker (READER below), AttemptDto (27 members) and RunStatusDto (16 members, plus RunDto's 29 by heritage),
 * each declared once, in dist/src/protocol.d.ts, reach 193 members at every depth of the release's own types, no
 * labeled tuple element, 143 string literals in those members' types (counted per member) and 44 other type names, and
 * no open slot. Three FRC-01 words reach any of them, and nothing they reach is lineage: actor reaches two members
 * (AttestationDto.actor, who attested an Attempt clear; InspectionClaimDto.actor, the `bd --actor` a held claim was
 * made as, on run inspect); attempt reaches 27 entries (the Attempt's own identity, the Run's attempt_timeout budget
 * and active_attempts count, the Attempt ids, states and counts of run inspect's rows, of the Run's held-work rows and
 * of run status's work and unreadable rows, the successor mark SupersedingAttemptDto.attempt_id, seven
 * reconciliation-basis words and four type names); policy-revision reaches seven (RunDto.binary_revision, the producer
 * build; RunDto.policy_bypass and policy_provenance, the start-time sources of executor and max_parallel; and four type
 * names). No file of the release spells "episode" or "lineage". At cut #1's reading (not re-read by cuts #2 and #3),
 * Furnace's own tree at main 0d41031 (2026-10-26) read "Status: proposed additive development program ... No
 * implementation implied" (docs/programs/collective-adaptation-2026-10-16/04-implementation-and-qa.md:3; F2 "Persistent
 * episode lineage export" at :11), and its sdk/typescript/src/protocol.ts spelled neither record word, so the trigger
 * had fired neither in the release Pi vendors nor upstream. The census reads only the installed release, never
 * Furnace's tree. AttemptDto.superseded_by is the existing successor mark (set on run status failed and attention rows
 * only; attempt list never sets it), not F2's export: the observer reads the Run's counts and attempt list pages, so
 * the fixture carries the mark and no reading projects it. src/workbench/furnace-observer.ts copies each Attempt by
 * named field (attemptRef) and states one Run->Attempt ownership edge per returned Attempt, confirmed by the Attempt
 * page request id. No src, docs or tracker text is edited.
 *
 * READER (cut #2's checker walk, widened by cut #3, which cures refusal #2's U1, the unread labeled tuple elements). T0
 * reads every entry under the installed package root at every depth: its path, its kind and, for a regular file, the
 * sha256 of its bytes (a symbolic link by its target, never followed); the manifest is the sha256 of those lines,
 * sorted. T1 reads the release through the TypeScript type checker, never by syntax alone: a Program over every
 * TypeScript file under the package root (the ES2023 library without the DOM, no ambient types). Its roots are every
 * interface, type alias, class, enum, namespace, function or variable declaration named AttemptDto or RunStatusDto in
 * any of those files, at any nesting (inside a namespace, a module augmentation or a global block), and every
 * declaration of what the package entry exports under either name (an alias followed to its target), the entry being
 * the file TypeScript's own NodeNext resolution gives an ES module that imports @furnace/sdk. It walks the type of each
 * interface, type alias, class or enum root, and lists a namespace, a function or a variable root by its kind. The walk
 * reads every member the checker resolves on a type, inherited ones included, and each parent its heritage names (an
 * interface, a type alias, a generic-wrapped or an intersection parent), then each reached member's type at every depth
 * of the release's own types (objects, arrays, tuples, unions, intersections, mapped and Record types); an array or a
 * tuple is read through its element types and a tuple's element labels, never through the members Array itself carries.
 * The FRC-01 words are matched against every reached member name (quoted and computed names as the checker resolves
 * them), every label of a reached tuple element (a named tuple member, or the parameter a tuple was taken from), every
 * string literal, template literal and enum member the walk reaches, every named type the walk reaches, and every
 * type-position name the sweep reads. The sweep reads the syntax of each reached named type's declarations (a class's
 * constructor included), each reached member's declarations and each parent's heritage expression, inside the release,
 * and transitively of the release declarations that a type reference, an import type or a type query in that syntax
 * names (a resolved parent's declarations are swept as a reached type): the name of every type reference (a qualified
 * name whole), heritage expression, import type qualifier and type query (`typeof x`). Comments are not matched (a
 * comment declares no member). An open slot is a place a ref could sit with no name to match, or a source the walk does
 * not read: an index signature, a member typed unknown, any, object or {} (an empty object type), a type parameter or
 * another unresolved type, a callable, a non-array type declared outside the release, an unresolved parent, a depth
 * past DEPTH, a root the checker does not resolve, a release TypeScript file the Program does not hold or that is a
 * global script, carries a reference directive or holds a global augmentation, a file the Program loads from outside
 * the release other than the TypeScript library, an entry that does not resolve to a TypeScript file of the release,
 * and a subject the entry does not export.
 *
 * CASES. T0 (ARMED, bytes) the installed release's manifest, regular-file count and directory count equal INSTALLED,
 * and no entry is of another kind; the manifest is shown to move with a changed byte, path or kind and with an added or
 * a removed entry, and the entry walk to read a symbolic link as one, by its target (the npm-made
 * node_modules/.bin/tsc). So any re-vendor that changes, adds or removes an installed file reds T0, whatever form the
 * change takes, naming the acceptance on landing as owed. T1 (ARMED) the roots are exactly protocol.d.ts's AttemptDto
 * and RunStatusDto, the matches equal LINEAGE's today sets, the walk finds no open slot, and no release file spells
 * "episode" or "lineage" by path or content (the content reading is proven live by finding the release's own
 * superseded_by, spelled today only in dist/src/protocol.d.ts); a re-vendor that brings an FRC-01 word to a place
 * READER matches, an open slot, another root or a record word anywhere in the release reds T1 as well. T2 the same
 * reader reads a planted release: an FRC-01 word through an interface parent, a type-alias parent, a generic-wrapped
 * parent (Partial) and a second type-alias parent of RunStatusDto that is an intersection, nested in an array of
 * objects and in a tuple, by a quoted and a computed member name, as a string literal and an enum member, as a type
 * name, as a primitive alias's name and as the left part of a qualified name, as a tuple element's label (plain, rest
 * and optional, and a parameter's through Parameters), as a primitive alias's name behind a neutral tuple alias and
 * behind a neutral union alias, as a getter's return type, as a generic parameter's default, as a class constructor's
 * parameter type, as an unresolved parent's name, through an import type and in a type query (each read by its own
 * name, and behind a neutral one whose declaration names it), as the type name of a member of a module's namespace
 * object (typeof import), on a DTO declared again in a second file, as a class, as a generic type alias, by a module
 * augmentation, in a namespace and under the name the entry exports for a differently named declaration; every other
 * kind of root (a namespace, a variable, a function and an enum named like a DTO); and every kind of open slot (an
 * index signature, an unknown member, an empty object type, a callable, a type declared outside the release, a type
 * parameter, an unresolved parent, a depth past DEPTH, a global augmentation, a global script with a reference
 * directive and a file loaded from outside the release), with two more releases whose entry fails (nothing resolves;
 * the entry exports one DTO), so a hollowed reader reds. B1 (ACCEPTANCE[2]) a fixture without the fields produces a
 * reading, a projectionSnapshot and a projectionTopology toStrictEqual today's (frozen literals at a fixed clock) and
 * byte-identical JSON. B2 the same fixture carrying FRC-01-shaped keys under this file's own hypothetical spellings
 * (the release reaches none of them) on the Run status, its failed row and every Attempt row produces the same three
 * literals and no planted value: nothing is projected before the SDK publishes it. C1 (ACCEPTANCE[3]) over a failed
 * Attempt and its successor at one Work sharing one hypothetical episode, every relation is a Furnace-confirmed
 * Run->Attempt ownership edge and none is causation or Attempt->Attempt, although causation is a kind the projection
 * accepts. A1 the outside anchors: the export row's title lists exactly LINEAGE's refs and its description carries
 * exactly the ACCEPTANCE list quoted here. R1 the residuals' pinned quiet rows: a planted member of each family reads
 * quiet, and the reader is shown to have seen it.
 * RESIDUALS (named, each pinned quiet by its R1 row; T1 does not read them, and a re-vendor that adds one changes an
 * installed file, so T0 reds it): R-SYNONYM a ref named by no FRC-01 word (a synonym or an abbreviation, such as owner,
 * job, outputs or prev) is reached but not matched; R-UNDECLARED a ref the release carries only outside its TypeScript
 * files (its JavaScript or JSON) and under no record word is not read; R-UNREACHED a ref on a type neither DTO reaches
 * (another response DTO such as AttemptListDto, or an unreferenced declaration) is not read.
 * FROZEN SHAPE (standing rule 16): LINEAGE pins `${ref}:${today.length}` and RESIDUALS their ids as literals; LINEAGE's
 * refs are held to the export title (A1) and its today sets to the installed release (T1); INSTALLED is held to the
 * installed release (T0).
 * NOT CLAIMED (edits of this file alone): a residual row removed from RESIDUALS and the frozen-shape literal together
 * (no outside anchor names the residual families); a case whose subject is replaced by its own expected value (T0's
 * entries by the pinned manifest, A1's export read by a constant title and description, B1's observer call by the
 * frozen literals); a T0 entry walk that drops a kind no directory it reads holds (anything but a regular file, a
 * directory or a symbolic link).
 * HYGIENE: B1, B2 and C1 run under vi.useFakeTimers({ toFake: ["Date"] }) with vi.setSystemTime(CLOCK), a frozen clock
 * for the observer's stamps; no module, function or timer is replaced. Nothing is written and no scratch is allocated:
 * T0 and T1 only read the installed files (T0 also lists node_modules/.bin for its symbolic-link control), and every
 * planted release is served from memory.
 * PARKED (the external remainder, a Furnace release): ACCEPTANCE[0] and ACCEPTANCE[1] need F2's fields in a released
 * @furnace/sdk. The re-vendor that brings them changes the installed release, so T0 reds and names both as owed,
 * whatever form the fields take (a residual family's included); T1 then reports the FRC-01 words the new release
 * reaches where READER matches, and AC2's fixture replaces B2.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, readlinkSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { AttemptDto, AttemptListDto, LogsReadDto, Response, ResponseKind, RunStatusDto } from "@furnace/sdk";
import ts from "typescript";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  type FurnaceObservedRelation,
  FurnaceObserver,
  type FurnaceObserverClient,
  type FurnaceProjectionTopology,
  type FurnaceReading,
} from "../src/workbench/furnace-observer.js";
import { type NativeSnapshot, ObservationProjection } from "../src/workbench/observation.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-4ap.12";
const EXPORT = ".beads/issues.jsonl";
const SDK_ROOT = dirname(createRequire(import.meta.url).resolve("@furnace/sdk/package.json"));
/** The DTOs the export title names; each is read with its heritage. */
const DTOS: readonly string[] = ["AttemptDto", "RunStatusDto"];
/** F2's own words (the title's "persistent episode lineage"): no release file spells either until F2 ships. */
const RECORD_WORDS: readonly string[] = ["episode", "lineage"];
/** Every AttemptDto field attemptRef copies: the reader's liveness anchor in the release it judges. */
const OBSERVER_READS: readonly string[] = [
  "attempt_id",
  "run_id",
  "work_id",
  "ordinal",
  "executor",
  "state",
  "outcome",
  "created_at",
  "started_at",
  "finished_at",
  "exit_code",
  "termination_cause",
];
/** The bead's acceptance, verbatim from its export description (A1 holds the whole list to the export). */
const ACCEPTANCE: readonly string[] = [
  "On landing: re-vendor @furnace/sdk per docs/workbench/17:61@9df9a03 in one owner commit sequenced with wb-zby.",
  "The furnace-observer test gains a fixture carrying the new fields and asserts each ref appears as evidenceRefs/trace.correlationIds or a typed edge with provenance.source === 'furnace' and nativeConfirmationRef from the Attempt page request id (furnace-observer.ts:170-171@9df9a03 pattern).",
  "A fixture WITHOUT the fields produces output toStrictEqual today's.",
  "No edge of kind 'causation' is stated from lineage alone (MW/02-architecture.md:44@b8264aa: event linkage is provenance, not proof of causal responsibility).",
];
const OWED = `ARMED (${BEAD}): the installed @furnace/sdk now differs from LINEAGE's today reading (an FRC-01 word, an open slot, a root or a record word). If F2 shipped, the acceptance on landing is owed: ${ACCEPTANCE[0]} ${ACCEPTANCE[1]} If it did not, re-measure LINEAGE's today sets against the new release and say so.`;

/** One entry of the installed release: its path inside the package, its kind and, for a regular file, the sha256 of its
 * bytes (for a symbolic link, its target). */
interface ReleaseEntry {
  readonly path: string;
  readonly kind: "file" | "directory" | "symlink" | "other";
  readonly content: string;
}
const sha256 = (bytes: string | Buffer): string => createHash("sha256").update(bytes).digest("hex");
/** Every entry under `dir`, at every depth: nothing is skipped, whatever its kind. */
function releaseEntries(dir: string, root: string = dir): ReleaseEntry[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry): ReleaseEntry[] => {
    const path = join(dir, entry.name);
    const at = relative(root, path);
    if (entry.isDirectory()) return [{ path: at, kind: "directory", content: "" }, ...releaseEntries(path, root)];
    if (entry.isFile()) return [{ path: at, kind: "file", content: sha256(readFileSync(path)) }];
    if (entry.isSymbolicLink()) return [{ path: at, kind: "symlink", content: readlinkSync(path) }];
    return [{ path: at, kind: "other", content: "" }];
  });
}
/** The sha256 of the sorted lines `kind<TAB>path<TAB>content`, one per entry. */
function manifest(entries: readonly ReleaseEntry[]): string {
  return sha256(
    entries
      .map(({ kind, path, content }) => `${kind}\t${path}\t${content}`)
      .sort()
      .join("\n"),
  );
}
/** The installed release T0 pins, entry for entry and byte for byte (measured at cut #3; vendor/furnace-sdk-0.1.0.tgz). */
const INSTALLED = { files: 128, directories: 12, manifest: "4603217b221e3a9aeff51ffd97ff770371f0f7d4aa0719dbea3d918b15812225" } as const;
function owedBytes(measured: { readonly files: number; readonly directories: number; readonly manifest: string }): string {
  return `ARMED (${BEAD}): the installed @furnace/sdk is not the release T0 pins (measured ${measured.files} files, ${measured.directories} directories, manifest ${measured.manifest}). If F2 shipped, the acceptance on landing is owed: ${ACCEPTANCE[0]} ${ACCEPTANCE[1]} If it did not, read T1 against the new release, re-measure LINEAGE's today sets, re-pin INSTALLED and say so.`;
}

interface LineageRow {
  readonly ref: string;
  readonly pattern: RegExp;
  readonly today: readonly string[];
}
/** FRC-01's refs in the export title's order: the reading that would carry each, and what the installed release already
 * reaches under it (measured at cut #2 and unchanged under cut #3's wider reader, sorted; none of it is lineage):
 * `Owner.member` for a member name, `Owner.member[index:label]` for a tuple element's label, `Owner.member="value"` for a
 * literal in its type and `type Name` for a named type or a type-position name. */
const LINEAGE: readonly LineageRow[] = [
  { ref: "episode", pattern: /episode/i, today: [] },
  { ref: "task", pattern: /task/i, today: [] },
  { ref: "actor", pattern: /actor/i, today: ["AttestationDto.actor", "InspectionClaimDto.actor"] },
  {
    ref: "attempt",
    pattern: /attempt/i,
    today: [
      "AttemptDto.attempt_id",
      "HeldWorkDto.attempt_id",
      "HeldWorkDto.attempt_state",
      "InspectionClaimDto.latest_attempt_state",
      "InspectionHeldWorkDto.attempt_id",
      "InspectionHeldWorkDto.attempt_state",
      "LatestAttemptDto.attempt_id",
      "RunDto.active_attempts",
      "RunDto.attempt_timeout",
      "RunInspectionDto.latest_attempts",
      "RunInspectionDto.latest_attempts_total",
      'RunStatusDto.reconciliation_basis="attempt_process_alive_supervised"',
      'RunStatusDto.reconciliation_basis="attempt_process_alive_unsupervised"',
      'RunStatusDto.reconciliation_basis="attempt_process_confirmed_dead"',
      'RunStatusDto.reconciliation_basis="attempt_process_indeterminate"',
      'RunStatusDto.reconciliation_basis="attempt_process_unobserved"',
      'RunStatusDto.reconciliation_basis="attempt_result_unsettled"',
      'RunStatusDto.reconciliation_basis="no_executing_attempt"',
      "RunWorkDto.attempts",
      "RunWorkDto.latest_attempt_id",
      "RunWorkDto.latest_attempt_state",
      "SupersedingAttemptDto.attempt_id",
      "UnreadableRecordDto.attempt_id",
      "type AttemptOutcome",
      "type AttemptState",
      "type LatestAttemptDto",
      "type SupersedingAttemptDto",
    ],
  },
  {
    ref: "policy-revision",
    pattern: /policy|revision/i,
    today: [
      "RunDto.binary_revision",
      "RunDto.policy_bypass",
      "RunDto.policy_provenance",
      "type PolicyBypass",
      "type PolicyLayer",
      "type PolicyProvenanceDto",
      "type PolicySourceDto",
    ],
  },
  { ref: "artifact", pattern: /artifact/i, today: [] },
];

function memberName(name: ts.PropertyName | undefined, source: ts.SourceFile): string {
  if (name === undefined) return "<unnamed>";
  return ts.isComputedPropertyName(name) ? name.getText(source) : name.text;
}
/** The release's TypeScript files: its declaration files and any other TypeScript it ships. */
const TYPESCRIPT = /\.[cm]?tsx?$/;
/** Where a planted release is installed: a node_modules directory that does not exist, so every planted file comes from
 * memory. A planted path that leaves the package (`../`) is served too but is not part of the release. */
const PLANTED_ROOT = "/wb-4ap.12-planted/node_modules/@furnace/sdk";
/** The checker's options: the ES2023 library without the DOM (the read types use primitives, literals, arrays and the
 * release's own declarations only), no ambient types, strict null checks. */
const CHECKER_OPTIONS: ts.CompilerOptions = {
  noEmit: true,
  skipLibCheck: true,
  strict: true,
  types: [],
  lib: ["lib.es2023.d.ts"],
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.NodeNext,
  moduleResolution: ts.ModuleResolutionKind.NodeNext,
};
/** Library and dependency files, parsed once and shared by every Program this file builds. */
const PARSED = new Map<string, ts.SourceFile>();
/** A host serving `files` (absolute path to text) from memory before the disk; nothing is written. */
function checkerHost(files: ReadonlyMap<string, string>): ts.CompilerHost {
  const base = ts.createCompilerHost(CHECKER_OPTIONS, true);
  return {
    ...base,
    fileExists: (file) => files.has(file) || base.fileExists(file),
    directoryExists: (dir) => [...files.keys()].some((file) => file.startsWith(`${dir}/`)) || (base.directoryExists?.(dir) ?? false),
    realpath: (path) => (files.has(path) ? path : (base.realpath?.(path) ?? path)),
    readFile: (file) => files.get(file) ?? base.readFile(file),
    getSourceFile: (file, language) => {
      const text = files.get(file);
      if (text !== undefined) return ts.createSourceFile(file, text, language, true, ts.ScriptKind.TS);
      const cached = PARSED.get(file);
      if (cached !== undefined) return cached;
      const read = base.getSourceFile(file, language);
      if (read !== undefined) PARSED.set(file, read);
      return read;
    },
  };
}
/** One word the walk reached: a member name or a literal, with the declaration (or the member) that holds it. */
interface Reached {
  readonly owner: string;
  readonly word: string;
}
/** A labeled tuple element: the member (or the type alias) holding the tuple, the element's position and its label. */
interface Label {
  readonly owner: string;
  readonly index: number;
  readonly word: string;
}
interface TypeReading {
  /** Every root (see READER in the header), as `path:name` with the path inside the release (a declaration that is not an
   * interface, a type alias or a class also names its kind), sorted. */
  readonly roots: readonly string[];
  /** Every member the walk reached, owned by the interface, type alias or class declaring it (an anonymous type by the
   * member path into it; a member with no declaration by the type it was reached on). */
  readonly members: readonly Reached[];
  /** Every labeled element of a reached tuple, owned like a member. */
  readonly labels: readonly Label[];
  /** Every string literal, template literal and enum member in a reached member's type, owned by that member. */
  readonly literals: readonly Reached[];
  /** Every named type the walk reached and every type-position name the sweep read (see READER), the subjects' own names
   * excepted. */
  readonly typeNames: readonly string[];
  /** Every open slot (see READER in the header), sorted. */
  readonly slots: readonly string[];
}
const memberKey = ({ owner, word }: Reached): string => `${owner}.${word}`;
const labelKey = ({ owner, index, word }: Label): string => `${owner}[${index}:${word}]`;
const NAMED_TYPE = ts.SymbolFlags.Interface | ts.SymbolFlags.Class | ts.SymbolFlags.Enum | ts.SymbolFlags.TypeAlias;
/** Leaves that carry no member and no word: primitives, number and boolean literals, null, undefined, void, never, symbols. */
const CLOSED =
  ts.TypeFlags.String |
  ts.TypeFlags.Number |
  ts.TypeFlags.Boolean |
  ts.TypeFlags.BigInt |
  ts.TypeFlags.BooleanLiteral |
  ts.TypeFlags.NumberLiteral |
  ts.TypeFlags.BigIntLiteral |
  ts.TypeFlags.Null |
  ts.TypeFlags.Undefined |
  ts.TypeFlags.Void |
  ts.TypeFlags.Never |
  ts.TypeFlags.ESSymbol |
  ts.TypeFlags.UniqueESSymbol;
/** The deepest member path the walk follows; anything deeper is an open slot. */
const DEPTH = 24;
function objectFlags(type: ts.Type): ts.ObjectFlags {
  return (type.flags & ts.TypeFlags.Object) !== 0 ? (type as ts.ObjectType).objectFlags : ts.ObjectFlags.None;
}
function isReference(type: ts.Type): type is ts.TypeReference {
  return (objectFlags(type) & ts.ObjectFlags.Reference) !== 0;
}
/** The tuple a reference instantiates, if it is one. */
function tupleTarget(type: ts.Type): ts.TupleType | undefined {
  return isReference(type) && (type.target.objectFlags & ts.ObjectFlags.Tuple) !== 0 ? (type.target as ts.TupleType) : undefined;
}
/** The interface, type alias or class declaring a member; an anonymous type is named by the member path into it. */
function ownerOf(declaration: ts.Declaration, fallback: string): string {
  const path: string[] = [];
  for (let at: ts.Node | undefined = declaration.parent; at !== undefined; at = at.parent) {
    if (ts.isInterfaceDeclaration(at) || ts.isTypeAliasDeclaration(at) || ts.isClassDeclaration(at))
      return [at.name?.text ?? "<anonymous>", ...path.reverse()].join(".");
    if (ts.isPropertySignature(at) || ts.isPropertyDeclaration(at)) path.push(memberName(at.name, at.getSourceFile()));
  }
  return fallback;
}
/** A declaration that can be a root: its name, and its kind when it is not an interface, a type alias or a class. */
function rootOf(node: ts.Node): { name: string; kind: string } | undefined {
  if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) return { name: node.name.text, kind: "" };
  if (ts.isClassDeclaration(node)) return node.name === undefined ? undefined : { name: node.name.text, kind: "" };
  if (ts.isEnumDeclaration(node)) return { name: node.name.text, kind: "enum " };
  if (ts.isModuleDeclaration(node)) return ts.isIdentifier(node.name) ? { name: node.name.text, kind: "namespace " } : undefined;
  if (ts.isFunctionDeclaration(node)) return node.name === undefined ? undefined : { name: node.name.text, kind: "function " };
  if (ts.isVariableDeclaration(node)) return ts.isIdentifier(node.name) ? { name: node.name.text, kind: "variable " } : undefined;
  return undefined;
}
/** The checker's reading of every root of the subjects in a release (READER in the header). `files` maps an absolute path
 * to its text; the release is every file under `rootDir`, and its TypeScript files are the Program's roots. */
function readTypes(files: ReadonlyMap<string, string>, rootDir: string, subjects: readonly string[] = DTOS): TypeReading {
  const sources = new Set([...files.keys()].filter((file) => file.startsWith(`${rootDir}/`) && TYPESCRIPT.test(file)));
  const host = checkerHost(files);
  const program = ts.createProgram({ rootNames: [...sources], options: CHECKER_OPTIONS, host });
  const checker = program.getTypeChecker();
  const roots: string[] = [];
  const rootNodes = new Set<ts.Node>();
  const members = new Map<string, Reached>();
  const labels = new Map<string, Label>();
  const literals = new Map<string, Reached>();
  const typeNames = new Set<string>();
  const slots = new Set<string>();
  const seen = new Set<ts.Type>();
  const swept = new Set<ts.Node>();
  const at = (file: string): string => relative(rootDir, file);
  const inRelease = (node: ts.Node): boolean => sources.has(node.getSourceFile().fileName);
  const literal = (owner: string, word: string): void => {
    literals.set(`${owner}=${JSON.stringify(word)}`, { owner, word });
  };
  /** Sweep a release declaration once: every type-position name in its syntax, then the declarations those names name. */
  const sweep = (declaration: ts.Node): void => {
    if (swept.has(declaration) || !inRelease(declaration)) return;
    swept.add(declaration);
    named(declaration);
  };
  const sweepSymbol = (symbol: ts.Symbol | undefined): void => {
    const target = symbol !== undefined && (symbol.flags & ts.SymbolFlags.Alias) !== 0 ? checker.getAliasedSymbol(symbol) : symbol;
    for (const declaration of target?.declarations ?? []) sweep(declaration);
  };
  const named = (node: ts.Node): void => {
    if (ts.isTypeReferenceNode(node)) {
      typeNames.add(node.typeName.getText());
      sweepSymbol(checker.getSymbolAtLocation(node.typeName));
    } else if (ts.isExpressionWithTypeArguments(node)) {
      typeNames.add(node.expression.getText());
    } else if (ts.isImportTypeNode(node) && node.qualifier !== undefined) {
      typeNames.add(node.qualifier.getText());
      sweepSymbol(checker.getSymbolAtLocation(node.qualifier));
    } else if (ts.isTypeQueryNode(node)) {
      typeNames.add(`typeof ${node.exprName.getText()}`);
      sweepSymbol(checker.getSymbolAtLocation(node.exprName));
    }
    ts.forEachChild(node, named);
  };
  const walk = (type: ts.Type, label: string, depth: number): void => {
    for (const symbol of [type.aliasSymbol, type.getSymbol()])
      if (symbol !== undefined && (symbol.flags & NAMED_TYPE) !== 0) {
        typeNames.add(symbol.getName());
        for (const declaration of symbol.declarations ?? []) sweep(declaration);
      }
    if (depth > DEPTH) {
      slots.add(`${label}: deeper than ${DEPTH}`);
      return;
    }
    if (type.isUnion() || type.isIntersection()) {
      for (const part of type.types) walk(part, label, depth);
      return;
    }
    if ((type.flags & ts.TypeFlags.EnumLiteral) !== 0) literal(label, type.getSymbol()?.getName() ?? "");
    if (type.isStringLiteral()) {
      literal(label, type.value);
      return;
    }
    if ((type.flags & ts.TypeFlags.TemplateLiteral) !== 0) {
      literal(label, checker.typeToString(type));
      return;
    }
    if ((type.flags & (CLOSED | ts.TypeFlags.EnumLiteral)) !== 0) return;
    if ((type.flags & ts.TypeFlags.Object) === 0) {
      slots.add(`${label}: ${checker.typeToString(type)}`);
      return;
    }
    if (checker.isArrayType(type) || checker.isTupleType(type)) {
      tupleTarget(type)?.labeledElementDeclarations?.forEach((declaration, index) => {
        if (declaration === undefined) return;
        const item = { owner: ownerOf(declaration, label), index, word: declaration.name.getText() };
        labels.set(labelKey(item), item);
      });
      for (const element of isReference(type) ? checker.getTypeArguments(type) : []) walk(element, label, depth + 1);
      return;
    }
    if (seen.has(type)) return;
    seen.add(type);
    const declarations = type.getSymbol()?.declarations ?? [];
    if (!declarations.some(inRelease) && (objectFlags(type) & (ts.ObjectFlags.Mapped | ts.ObjectFlags.Anonymous)) === 0) {
      slots.add(`${label}: ${checker.typeToString(type)}, declared outside the release`);
      return;
    }
    const parents = declarations
      .filter(inRelease)
      .flatMap((declaration) => (ts.isInterfaceDeclaration(declaration) || ts.isClassDeclaration(declaration) ? (declaration.heritageClauses ?? []) : []))
      .flatMap((clause) => [...clause.types]);
    for (const parent of parents) {
      named(parent);
      const parentType = checker.getTypeAtLocation(parent);
      if ((parentType.flags & ts.TypeFlags.Any) !== 0) slots.add(`${label}: unresolved parent ${parent.getText()}`);
      else walk(parentType, label, depth + 1);
    }
    const properties = checker.getPropertiesOfType(type);
    const indexes = checker.getIndexInfosOfType(type);
    if (type.getCallSignatures().length + type.getConstructSignatures().length > 0) slots.add(`${label}: callable`);
    else if (properties.length === 0 && indexes.length === 0 && parents.length === 0) slots.add(`${label}: empty object type`);
    for (const index of indexes) {
      slots.add(`${label}[${checker.typeToString(index.keyType)}]`);
      walk(index.type, label, depth + 1);
    }
    for (const property of properties) {
      const declaration = property.declarations?.[0];
      const owner = declaration === undefined ? label : ownerOf(declaration, label);
      const word = property.getName();
      members.set(`${owner}.${word}`, { owner, word });
      for (const each of property.declarations ?? []) sweep(each);
      walk(checker.getTypeOfSymbol(property), `${owner}.${word}`, depth + 1);
    }
  };
  const root = (declaration: ts.Node, symbol: ts.Symbol | undefined, kind: string, name: string): void => {
    if (rootNodes.has(declaration)) return;
    rootNodes.add(declaration);
    roots.push(`${at(declaration.getSourceFile().fileName)}:${kind}${name}`);
    if (symbol === undefined) slots.add(`${name}: unresolved`);
    else if ((symbol.flags & NAMED_TYPE) !== 0) walk(checker.getDeclaredTypeOfSymbol(symbol), name, 0);
  };
  for (const file of sources) {
    const source = program.getSourceFile(file);
    if (source === undefined) {
      slots.add(`${at(file)}: not in the program`);
      continue;
    }
    if (!ts.isExternalModule(source) && source.statements.length > 0) slots.add(`${at(file)}: a global script`);
    for (const directive of [...source.referencedFiles, ...source.typeReferenceDirectives, ...source.libReferenceDirectives])
      slots.add(`${at(file)}: a reference directive to ${directive.fileName}`);
    const visit = (node: ts.Node): void => {
      if (ts.isModuleDeclaration(node) && (node.flags & ts.NodeFlags.GlobalAugmentation) !== 0) slots.add(`${at(file)}: a global augmentation`);
      const found = rootOf(node);
      if (found !== undefined && subjects.includes(found.name)) {
        const name = ts.getNameOfDeclaration(node as ts.Declaration);
        root(node, name === undefined ? undefined : checker.getSymbolAtLocation(name), found.kind, found.name);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  for (const source of program.getSourceFiles())
    if (!sources.has(source.fileName) && !program.isSourceFileDefaultLibrary(source)) slots.add(`${at(source.fileName)}: a program file outside the release`);
  // The entry: what an ES module importing the package resolves to, and each subject it exports.
  const installed = rootDir.lastIndexOf("/node_modules/");
  const packageName = rootDir.slice(installed + "/node_modules/".length);
  const resolved =
    installed < 0
      ? undefined
      : ts.resolveModuleName(packageName, join(rootDir.slice(0, installed), "wb-4ap.12-importer.mts"), CHECKER_OPTIONS, host, undefined, undefined, ts.ModuleKind.ESNext)
          .resolvedModule?.resolvedFileName;
  const entry = resolved !== undefined && sources.has(resolved) ? program.getSourceFile(resolved) : undefined;
  const entryModule = entry === undefined ? undefined : checker.getSymbolAtLocation(entry);
  if (entry === undefined || entryModule === undefined)
    slots.add(`entry: ${packageName} resolves to ${resolved === undefined ? "nothing" : at(resolved)}, not a TypeScript file of the release`);
  else {
    const exported = checker.getExportsOfModule(entryModule);
    for (const subject of subjects) {
      const symbol = exported.find((item) => item.getName() === subject);
      const target = symbol !== undefined && (symbol.flags & ts.SymbolFlags.Alias) !== 0 ? checker.getAliasedSymbol(symbol) : symbol;
      if (target === undefined) slots.add(`entry ${at(entry.fileName)}: exports no ${subject}`);
      for (const declaration of target?.declarations ?? []) {
        const found = rootOf(declaration);
        root(declaration, target, found?.kind ?? "", found?.name ?? subject);
      }
    }
  }
  return {
    roots: roots.sort(),
    members: [...members.values()],
    labels: [...labels.values()],
    literals: [...literals.values()],
    typeNames: [...typeNames].filter((name) => !subjects.includes(name)),
    slots: [...slots].sort(),
  };
}
/** Per LINEAGE row, every reached member name, tuple label, literal and type name the row's reading matches, sorted. */
function lineageWords(reading: TypeReading): Record<string, string[]> {
  return Object.fromEntries(
    LINEAGE.map((row) => [
      row.ref,
      [
        ...reading.members.filter(({ word }) => row.pattern.test(word)).map(memberKey),
        ...reading.labels.filter(({ word }) => row.pattern.test(word)).map(labelKey),
        ...reading.literals.filter(({ word }) => row.pattern.test(word)).map(({ owner, word }) => `${owner}=${JSON.stringify(word)}`),
        ...reading.typeNames.filter((name) => row.pattern.test(name)).map((name) => `type ${name}`),
      ].sort(),
    ]),
  );
}
function spells(text: string, words: readonly string[]): string[] {
  const lower = text.toLowerCase();
  return words.filter((word) => lower.includes(word));
}
function releaseFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? releaseFiles(join(dir, entry.name)) : entry.isFile() ? [join(dir, entry.name)] : [],
  );
}
interface Release {
  /** Every regular file of the release, by its path inside the package, with its text. */
  readonly files: ReadonlyMap<string, string>;
  /** The checker's reading of its TypeScript files. */
  readonly reading: TypeReading;
}
/** A release (path inside the package to text) installed at `root`, its TypeScript files read by the checker. */
function release(files: ReadonlyMap<string, string>, root: string, subjects: readonly string[] = DTOS): Release {
  return { files, reading: readTypes(new Map([...files].map(([path, text]): [string, string] => [join(root, path), text])), root, subjects) };
}
/** The installed release, read file by file. */
function installedRelease(): Release {
  return release(new Map(releaseFiles(SDK_ROOT).map((file): [string, string] => [relative(SDK_ROOT, file), readFileSync(file, "utf8")])), SDK_ROOT);
}
/** A planted release (path inside the package to text), served from memory at PLANTED_ROOT. */
function plantedRelease(plant: Readonly<Record<string, string>>, subjects: readonly string[] = DTOS): Release {
  return release(new Map(Object.entries(plant)), PLANTED_ROOT, subjects);
}
/** Every release file, by its path inside the package, whose path or content spells one of the words. */
function spelling(files: ReadonlyMap<string, string>, words: readonly string[]): string[] {
  return [...files].filter(([path, text]) => spells(path, words).length > 0 || spells(text, words).length > 0).map(([path]) => path);
}
/** The bead's own export row (title and description only: later store writes change neither). */
function exportRow(): { title: string; description: string } {
  const rows = readFileSync(join(REPO, EXPORT), "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line): unknown => JSON.parse(line));
  const mine = rows.flatMap((row) =>
    typeof row === "object" &&
    row !== null &&
    "id" in row &&
    row.id === BEAD &&
    "title" in row &&
    typeof row.title === "string" &&
    "description" in row &&
    typeof row.description === "string"
      ? [{ title: row.title, description: row.description }]
      : [],
  );
  expect(mine, "the export holds exactly one row for the bead").toHaveLength(1);
  return mine[0];
}
/** A Python list item as the export's ACCEPTANCE list spells it: double quotes exactly when the text holds a single quote. */
function listItem(text: string): string {
  return text.includes("'") && !text.includes('"') ? `"${text}"` : `'${text}'`;
}

/** T2's planted release (served from memory): one FRC-01 word per planted form, every kind of root and every kind of open slot. */
const PLANTED: Readonly<Record<string, string>> = {
  "package.json": `${JSON.stringify({ name: "@furnace/sdk", type: "module", types: "dist/src/index.d.ts" })}\n`,
  "dist/src/index.d.ts": 'export * from "./protocol.js";\nexport type { RunStatusDtoV2 as RunStatusDto } from "./v2.js";\n',
  "dist/src/protocol.d.ts": [
    "/** a lineage-free comment */",
    "export type LinkRefsDto = { task_ref?: string };",
    "export interface WhoRefs { actor_ref: string }",
    "export type OutputRefsDto = { artifact_refs?: string[] } & { note?: string };",
    "export declare enum RefKind { Episode = 0, Plain = 1 }",
    "export interface TaskLink { id: string }",
    "export type ActorName = string;",
    "export interface Deep<T> { next?: Deep<T[]> }",
    "export type TaskKey = string;",
    "export type NeutralPair = [TaskKey, string];",
    "export type ActorKey = string;",
    "export type Maybe = ActorKey | null;",
    "export type EpisodeKey = string;",
    "export type ArtifactKey = string;",
    "export interface Box<T = ArtifactKey> { v: T }",
    "export declare const artifactDefault: string;",
    "export type EpisodeSeed = string;",
    "export declare namespace TaskNames { type Plain = string }",
    "export declare const neutralSeed: EpisodeSeed;",
    "export interface AttemptDto extends LinkRefsDto, Partial<WhoRefs>, MissingTaskRefsDto {",
    "  attempt_id: string;",
    "  'policy_revision'?: string;",
    '  ["actor"]?: string;',
    "  refs?: { episode?: string }[];",
    "  pair?: [string, { attempt_no?: number }];",
    "  pairs?: [task_ref: string, ...artifact_refs: string[]];",
    "  opt?: [actor_ref?: string];",
    "  args?: Parameters<(episode_ref: string) => void>;",
    '  kind?: "artifact" | "plain";',
    "  ref_kind?: RefKind;",
    "  links?: TaskLink[];",
    "  who?: ActorName;",
    "  pair2?: NeutralPair;",
    "  maybe?: Maybe;",
    "  get gk(): EpisodeKey;",
    "  box?: Box;",
    '  imp?: import("./more.js").RevisionKey;',
    "  def?: typeof artifactDefault;",
    "  seed?: typeof neutralSeed;",
    "  qn?: TaskNames.Plain;",
    '  imp2?: import("./more.js").Wrapped;',
    '  mod?: typeof import("./gate.js");',
    "  extra?: Record<string, string>;",
    "  opaque?: unknown;",
    "  blank?: {};",
    "  hook?: () => void;",
    "  stamp?: Date;",
    "  deep?: Deep<string>;",
    "}",
    "export interface RunDto { attempt_timeout: string }",
    "export interface RunStatusDto extends RunDto, OutputRefsDto { failed_total: number }",
  ].join("\n"),
  "dist/src/more.d.ts":
    "export interface RunStatusDto { predecessor_attempt?: string }\nexport type RevisionKey = string;\nexport type PolicySeed = string;\nexport type Wrapped = PolicySeed | null;\n",
  "dist/src/alias.d.ts": "export type AttemptDto<P = string> = { prior_actor?: string; param?: P };\n",
  "dist/src/cls.d.ts": "export type RevisionSeed = string;\nexport declare class RunStatusDto {\n  constructor(seed: RevisionSeed);\n  revision_note?: string;\n}\n",
  "dist/src/aug.d.ts": 'import "./protocol.js";\ndeclare module "./protocol.js" {\n  interface AttemptDto { artifact_digest?: string }\n}\nexport {};\n',
  "dist/src/ns.d.ts": "export declare namespace v2 {\n  interface AttemptDto { task_owner?: string }\n}\n",
  "dist/src/v2.d.ts": "export interface RunStatusDtoV2 { actor_note?: string }\n",
  "dist/src/gate.d.ts": "export type ArtifactSlot = string;\nexport declare const gateValue: ArtifactSlot;\n",
  "dist/src/val.d.ts": "export declare namespace RunStatusDto {\n  const kind: string;\n}\nexport declare const AttemptDto: unique symbol;\n",
  "dist/src/fn.d.ts": "export declare function RunStatusDto(): void;\nexport declare enum AttemptDto {\n  Plain = 0,\n}\n",
  "dist/src/glob.d.ts": "export {};\ndeclare global {\n  interface Array<T> {\n    task_ref?: string;\n  }\n}\n",
  "dist/src/script.d.ts": '/// <reference path="./glob.d.ts" />\ninterface PlantedGlobal {\n  note?: string;\n}\n',
  "dist/src/outside.d.ts": 'import type { OtherRefs } from "../../../other-sdk/index.js";\nexport type OutsideRefs = OtherRefs;\n',
  "../other-sdk/index.d.ts": "export interface OtherRefs {\n  note?: string;\n}\n",
};
/** The release every residual and every entry plant builds on: the two DTOs and RunStatusDto's parent; its one FRC-01
 * word is attempt_id. */
const QUIET_RELEASE = [
  "export interface AttemptDto { attempt_id: string; run_id: string }",
  "export interface RunDto { run_id: string }",
  "export interface RunStatusDto extends RunDto { failed: AttemptDto[] }",
].join("\n");
/** QUIET_RELEASE's package entry: protocol.d.ts itself. */
const QUIET_PACKAGE = `${JSON.stringify({ name: "@furnace/sdk", type: "module", types: "dist/src/protocol.d.ts" })}\n`;
/** Two releases whose entry does not hold: no package file and no index (nothing resolves), and an entry exporting one DTO. */
const ENTRY_PLANTS: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  unresolved: { "dist/src/protocol.d.ts": QUIET_RELEASE },
  "one export": {
    "package.json": `${JSON.stringify({ name: "@furnace/sdk", type: "module", types: "dist/src/index.d.ts" })}\n`,
    "dist/src/index.d.ts": 'export type { AttemptDto } from "./protocol.js";\n',
    "dist/src/protocol.d.ts": QUIET_RELEASE,
  },
};
interface Residual {
  readonly id: string;
  /** The family nothing above reads. */
  readonly family: string;
  /** One planted member of the family, by path inside the package. */
  readonly plant: Readonly<Record<string, string>>;
  /** What the reader saw of the plant: the witness must be in it, so the quiet reading is the family's, not blindness. */
  readonly seen: (planted: Release) => readonly string[];
  readonly witness: string;
}
const RESIDUALS: readonly Residual[] = [
  {
    id: "R-SYNONYM",
    family: "a ref named by no FRC-01 word: a synonym or an abbreviation (owner, job, outputs, prev)",
    plant: {
      "package.json": QUIET_PACKAGE,
      "dist/src/protocol.d.ts": [
        "export interface AttemptDto { attempt_id: string; run_id: string; refs?: { owner?: string; job?: string; outputs?: string[]; prev?: string } }",
        "export interface RunDto { run_id: string }",
        "export interface RunStatusDto extends RunDto { failed: AttemptDto[] }",
      ].join("\n"),
    },
    seen: (planted) => planted.reading.members.map(memberKey),
    witness: "AttemptDto.refs.owner",
  },
  {
    id: "R-UNDECLARED",
    family: "a ref only outside the release's TypeScript files (its JavaScript or JSON), under no record word",
    plant: {
      "package.json": QUIET_PACKAGE,
      "dist/src/protocol.d.ts": QUIET_RELEASE,
      "dist/src/protocol.js": "export function attemptRow(row) {\n  return { ...row, task_ref: row.task_ref, actor_ref: row.actor_ref };\n}\n",
    },
    seen: (planted) => spelling(planted.files, ["task_ref"]),
    witness: "dist/src/protocol.js",
  },
  {
    id: "R-UNREACHED",
    family: "a ref on a type neither DTO reaches: another response DTO, or an unreferenced declaration",
    plant: {
      "package.json": QUIET_PACKAGE,
      "dist/src/protocol.d.ts": `${QUIET_RELEASE}\nexport interface AttemptListDto { attempts: AttemptDto[]; task_refs?: string[] }`,
    },
    seen: (planted) => release(planted.files, PLANTED_ROOT, ["AttemptListDto"]).reading.members.map(memberKey),
    witness: "AttemptListDto.task_refs",
  },
];
/** QUIET_RELEASE's words: nothing under any LINEAGE row but attempt's AttemptDto.attempt_id. */
const QUIET_WORDS = Object.fromEntries(LINEAGE.map((row) => [row.ref, row.ref === "attempt" ? ["AttemptDto.attempt_id"] : []]));

const CLOCK = "2026-10-28T03:00:00.000Z";
const WORKSPACE = "/srv/furnace-lineage-ws";
const SCOPE = { workspace: WORKSPACE, principal: "lineage-tester" };
const LIMITS = { maxPolls: 1, intervalMs: 1, maxElapsedMs: 5000, attemptLimit: 5, logBytes: 512, callTimeoutMs: 2000 };
const RUN_ID = "frn-run-lineage";
const failed: AttemptDto = {
  attempt_id: "frn-atm-l1",
  run_id: RUN_ID,
  work_id: "bd-work-l",
  ordinal: 1,
  executor: "runner",
  controller_session_id: "ctl-session-1",
  state: "failed",
  outcome: "work_failure",
  created_at: "2026-10-27T00:00:01Z",
  started_at: "2026-10-27T00:00:02Z",
  finished_at: "2026-10-27T00:00:04Z",
  exit_code: 1,
  termination_cause: "natural_exit",
};
const successor: AttemptDto = {
  attempt_id: "frn-atm-l2",
  run_id: RUN_ID,
  work_id: "bd-work-l",
  ordinal: 2,
  executor: "runner",
  controller_session_id: "ctl-session-2",
  state: "succeeded",
  outcome: "success",
  created_at: "2026-10-27T00:00:05Z",
  started_at: "2026-10-27T00:00:06Z",
  finished_at: "2026-10-27T00:00:09Z",
  exit_code: 0,
  termination_cause: "natural_exit",
};
const status: RunStatusDto = {
  run_id: RUN_ID,
  beads_run_id: "bd-run-lineage",
  workspace: WORKSPACE,
  state: "active",
  mode: "persistent_molecule",
  furnace_version: "0.1.0",
  binary_revision: "rev-lineage",
  created_at: "2026-10-27T00:00:00Z",
  updated_at: "2026-10-27T00:00:09Z",
  state_since: "2026-10-27T00:00:00Z",
  executor: "runner",
  max_parallel: 1,
  attempt_timeout: "30m",
  active: [],
  failed: [{ ...failed, superseded_by: { attempt_id: successor.attempt_id, ordinal: successor.ordinal } }],
  failed_total: 1,
  attention: [],
  unreadable: [],
  corrupt_events: [],
  corrupt_events_total: 0,
  conflicts: [],
  completed: 1,
  total: 2,
};
/** FRC-01-shaped keys under this file's own spellings: the release publishes no lineage field (T1), so no name is Furnace's. */
const UNPUBLISHED = {
  episode_ref: "HYPOTHETICAL-episode-1",
  task_ref: "HYPOTHETICAL-task-1",
  actor_ref: "HYPOTHETICAL-actor-1",
  attempt_ref: "HYPOTHETICAL-attempt-0",
  policy_revision_ref: "HYPOTHETICAL-policy-revision-7",
  artifact_refs: ["HYPOTHETICAL-artifact-a", "HYPOTHETICAL-artifact-b"],
} as const;
const withLineage = (item: AttemptDto): AttemptDto => ({ ...item, ...UNPUBLISHED });
const statusWithLineage: RunStatusDto = { ...status, ...UNPUBLISHED, failed: status.failed.map(withLineage) };

function respond<T>(kind: ResponseKind, requestId: string, data: T): Response<T> {
  return { protocolVersion: 1, kind, requestId, data, exit: { code: 0, signal: null }, stderr: "" };
}
function client(run: RunStatusDto, attempts: readonly AttemptDto[]): FurnaceObserverClient {
  return {
    runs: { get: () => ({ status: async () => respond("run_status", "req-status", run) }) },
    attempts: {
      list: async (runId, request) =>
        respond<AttemptListDto>("attempt_list", "req-attempts", {
          run_id: runId,
          beads_run_id: run.beads_run_id,
          complete: true,
          limit: request?.limit ?? null,
          returned: attempts.length,
          next_cursor: null,
          attempts: [...attempts],
          unreadable: [],
        }),
    },
    logs: {
      read: async (runId, request) =>
        respond<LogsReadDto>("logs_read", "req-logs", {
          run_id: runId,
          attempt_id: request?.attempt ?? "",
          stream: "stdout",
          complete: true,
          limit: request?.limit ?? null,
          returned: 0,
          next_cursor: null,
          lossy: false,
          lines: [],
        }),
    },
  };
}
async function outputs(
  run: RunStatusDto,
  attempts: readonly AttemptDto[],
): Promise<{ reading: FurnaceReading; snapshot: NativeSnapshot; topology: FurnaceProjectionTopology }> {
  const observer = new FurnaceObserver(client(run, attempts), { workspaceRoot: WORKSPACE, runId: RUN_ID, scope: SCOPE, limits: LIMITS });
  const reading = await observer.snapshot();
  return { reading, snapshot: observer.projectionSnapshot(reading), topology: observer.projectionTopology(reading) };
}

const runRef = { provider: "furnace", type: "run", id: RUN_ID, scope: WORKSPACE };
const attemptRef = (id: string) => ({ provider: "furnace", type: "attempt", id, scope: WORKSPACE });
const confirmed = { source: "furnace", observedAt: CLOCK, nativeConfirmationRef: "req-attempts" };
/** Today's reading of the fixture, frozen at CLOCK (measured at the base, key order included). */
const READING: FurnaceReading = {
  contract: "furnace.external-observation/v1",
  source: {
    provider: "furnace",
    runId: RUN_ID,
    beadsRunId: "bd-run-lineage",
    workspaceRoot: WORKSPACE,
    ownership: "external",
    sdk: "@furnace/sdk@0.1.0",
    producerVersion: "0.1.0",
    producerRevision: "rev-lineage",
    requestIds: { status: "req-status", attempts: "req-attempts", logs: ["req-logs"] },
  },
  capturedAt: CLOCK,
  observedAt: CLOCK,
  lastConfirmedAt: CLOCK,
  freshness: "current",
  connection: "connected",
  completeness: "complete",
  run: {
    state: "active",
    mode: "persistent_molecule",
    controllerLive: "unknown",
    stateSince: "2026-10-27T00:00:00Z",
    updatedAt: "2026-10-27T00:00:09Z",
    progress: { completed: 1, total: 2 },
    failedTotal: 1,
    corruptEventsTotal: 0,
    unreadableCount: 0,
    conflictCount: 0,
  },
  attempts: {
    complete: true,
    returned: 2,
    nextCursor: null,
    unreadableCount: 0,
    items: [
      {
        id: "frn-atm-l1",
        runId: RUN_ID,
        workId: "bd-work-l",
        ordinal: 1,
        executor: "runner",
        state: "failed",
        outcome: "work_failure",
        createdAt: "2026-10-27T00:00:01Z",
        startedAt: "2026-10-27T00:00:02Z",
        finishedAt: "2026-10-27T00:00:04Z",
        exitCode: 1,
        terminationCause: "natural_exit",
      },
      {
        id: "frn-atm-l2",
        runId: RUN_ID,
        workId: "bd-work-l",
        ordinal: 2,
        executor: "runner",
        state: "succeeded",
        outcome: "success",
        createdAt: "2026-10-27T00:00:05Z",
        startedAt: "2026-10-27T00:00:06Z",
        finishedAt: "2026-10-27T00:00:09Z",
        exitCode: 0,
        terminationCause: "natural_exit",
      },
    ],
  },
  logs: [{ attemptId: "frn-atm-l2", stream: "stdout", complete: true, lossy: false, returned: 0, nextCursor: null }],
  stream: { runLifecycle: "unavailable", attemptOutput: "logs --follow (one attempt only)", cursor: "unavailable" },
  coherence: "sequential-non-atomic",
};
/** Today's Run projection snapshot of READING. */
const RUN_SNAPSHOT: NativeSnapshot = {
  source: runRef,
  scope: SCOPE,
  capturedAt: CLOCK,
  observedAt: CLOCK,
  coverage: "complete",
  sourceRevision: "rev-lineage",
  node: { title: `Furnace Run ${RUN_ID}`, type: "workflow", statusText: "active", statusTone: "active" },
  kind: "furnace.run.snapshot",
  evidenceRefs: ["frn-atm-l1", "frn-atm-l2"],
};
/** Today's projection topology of READING: the Run snapshot, one Attempt snapshot and one confirmed ownership edge each. */
const TOPOLOGY: FurnaceProjectionTopology = {
  snapshots: [
    RUN_SNAPSHOT,
    {
      source: attemptRef("frn-atm-l1"),
      scope: SCOPE,
      capturedAt: CLOCK,
      observedAt: CLOCK,
      coverage: "complete",
      sourceRevision: "rev-lineage",
      node: { title: "Furnace Attempt frn-atm-l1", type: "sdk-operation", statusText: "failed (work_failure)", statusTone: "failure" },
      kind: "furnace.attempt.snapshot",
      trace: { invocationId: RUN_ID, correlationIds: { runId: RUN_ID, workId: "bd-work-l" } },
      interval: { startedAt: "2026-10-27T00:00:02Z", endedAt: "2026-10-27T00:00:04Z" },
    },
    {
      source: attemptRef("frn-atm-l2"),
      scope: SCOPE,
      capturedAt: CLOCK,
      observedAt: CLOCK,
      coverage: "complete",
      sourceRevision: "rev-lineage",
      node: { title: "Furnace Attempt frn-atm-l2", type: "sdk-operation", statusText: "succeeded (success)", statusTone: "success" },
      kind: "furnace.attempt.snapshot",
      trace: { invocationId: RUN_ID, correlationIds: { runId: RUN_ID, workId: "bd-work-l" } },
      interval: { startedAt: "2026-10-27T00:00:06Z", endedAt: "2026-10-27T00:00:09Z" },
    },
  ],
  relations: [
    { scope: SCOPE, from: runRef, to: attemptRef("frn-atm-l1"), kind: "ownership", provenance: confirmed },
    { scope: SCOPE, from: runRef, to: attemptRef("frn-atm-l2"), kind: "ownership", provenance: confirmed },
  ],
};


describe("wb-4ap.12 Furnace episode-lineage census (until F2 ships)", () => {
  it("T0 (ARMED, bytes): the installed release is exactly the one pinned here, entry for entry and byte for byte", () => {
    const entries = releaseEntries(SDK_ROOT);
    const measured = {
      files: entries.filter((entry) => entry.kind === "file").length,
      directories: entries.filter((entry) => entry.kind === "directory").length,
      manifest: manifest(entries),
    };
    expect(
      entries.filter((entry) => entry.kind !== "file" && entry.kind !== "directory").map((entry) => `${entry.kind} ${entry.path}`),
      owedBytes(measured),
    ).toStrictEqual([]);
    expect(measured, owedBytes(measured)).toStrictEqual(INSTALLED);
    // The manifest reads every part of every entry: a changed byte, path or kind, or an added or removed entry, moves it.
    const protocol = entries.findIndex((entry) => entry.path === "dist/src/protocol.d.ts");
    expect(protocol, "the release's protocol declarations are among the entries").toBeGreaterThanOrEqual(0);
    const moved = [
      entries.map((entry, index) => (index === protocol ? { ...entry, content: sha256(`${entry.content}\n`) } : entry)),
      entries.map((entry, index) => (index === protocol ? { ...entry, path: "dist/src/protocol-2.d.ts" } : entry)),
      entries.map((entry, index): ReleaseEntry => (index === protocol ? { ...entry, kind: "symlink" } : entry)),
      entries.filter((_, index) => index !== protocol),
      [...entries, { path: "dist/src/planted.d.ts", kind: "file" as const, content: sha256("") }],
    ].map(manifest);
    expect(moved.filter((digest) => digest === INSTALLED.manifest)).toStrictEqual([]);
    expect(new Set(moved).size).toBe(moved.length);
    // The entry walk reads a symbolic link as one, by its target, never following it (the npm-made link to tsc).
    expect(releaseEntries(join(REPO, "node_modules/.bin")).find((entry) => entry.path === "tsc")).toStrictEqual({
      path: "tsc",
      kind: "symlink",
      content: "../typescript/bin/tsc",
    });
  });

  it("T1 (ARMED): through the checker, AttemptDto and RunStatusDto reach no new FRC-01 word, open slot or root, and no file spells a record word", () => {
    const installed = installedRelease();
    expect(installed.files.size, "the installed release was read").toBeGreaterThan(0);
    expect(installed.reading.roots, OWED).toStrictEqual(["dist/src/protocol.d.ts:AttemptDto", "dist/src/protocol.d.ts:RunStatusDto"]);
    const reached = installed.reading.members.map(memberKey);
    expect(OBSERVER_READS.filter((field) => !reached.includes(`AttemptDto.${field}`)), "the reader sees every field the observer copies").toEqual([]);
    expect(
      ["RunDto.run_id", "SupersedingAttemptDto.attempt_id"].filter((member) => !reached.includes(member)),
      "RunStatusDto is read with its heritage and AttemptDto with its nested types",
    ).toEqual([]);
    expect(lineageWords(installed.reading), OWED).toStrictEqual(Object.fromEntries(LINEAGE.map((row) => [row.ref, [...row.today]])));
    expect(installed.reading.slots, OWED).toStrictEqual([]);
    expect(spelling(installed.files, RECORD_WORDS), OWED).toStrictEqual([]);
    const successorMark = spelling(installed.files, ["superseded_by"]).filter((path) => path.endsWith(".d.ts"));
    expect(successorMark.length, "the content reading is live: it finds the release's existing successor mark").toBeGreaterThan(0);
  });

  it("T2: the same reader reads every planted form: parents, nesting, names, labels, literals, type names, every kind of root and every open slot", () => {
    const planted = plantedRelease(PLANTED);
    expect(planted.reading.roots).toStrictEqual([
      "dist/src/alias.d.ts:AttemptDto",
      "dist/src/aug.d.ts:AttemptDto",
      "dist/src/cls.d.ts:RunStatusDto",
      "dist/src/fn.d.ts:enum AttemptDto",
      "dist/src/fn.d.ts:function RunStatusDto",
      "dist/src/more.d.ts:RunStatusDto",
      "dist/src/ns.d.ts:AttemptDto",
      "dist/src/protocol.d.ts:AttemptDto",
      "dist/src/protocol.d.ts:RunStatusDto",
      "dist/src/v2.d.ts:RunStatusDtoV2",
      "dist/src/val.d.ts:namespace RunStatusDto",
      "dist/src/val.d.ts:variable AttemptDto",
    ]);
    expect(lineageWords(planted.reading)).toStrictEqual({
      episode: ["AttemptDto.args[0:episode_ref]", 'AttemptDto.ref_kind="Episode"', "AttemptDto.refs.episode", "type EpisodeKey", "type EpisodeSeed"],
      task: [
        "AttemptDto.pairs[0:task_ref]",
        "AttemptDto.task_owner",
        "LinkRefsDto.task_ref",
        "type MissingTaskRefsDto",
        "type TaskKey",
        "type TaskLink",
        "type TaskNames.Plain",
      ],
      actor: [
        "AttemptDto.actor",
        "AttemptDto.opt[0:actor_ref]",
        "AttemptDto.prior_actor",
        "RunStatusDtoV2.actor_note",
        "WhoRefs.actor_ref",
        "type ActorKey",
        "type ActorName",
      ],
      attempt: ["AttemptDto.attempt_id", "AttemptDto.pair.attempt_no", "RunDto.attempt_timeout", "RunStatusDto.predecessor_attempt"],
      "policy-revision": ["AttemptDto.policy_revision", "RunStatusDto.revision_note", "type PolicySeed", "type RevisionKey", "type RevisionSeed"],
      artifact: [
        "AttemptDto.artifact_digest",
        'AttemptDto.kind="artifact"',
        "AttemptDto.pairs[1:artifact_refs]",
        "OutputRefsDto.artifact_refs",
        "type ArtifactKey",
        "type ArtifactSlot",
        "type typeof artifactDefault",
      ],
    });
    expect(planted.reading.slots).toStrictEqual([
      "../other-sdk/index.d.ts: a program file outside the release",
      "AttemptDto.blank: empty object type",
      "AttemptDto.extra[string]",
      "AttemptDto.hook: callable",
      "AttemptDto.opaque: unknown",
      "AttemptDto.param: P",
      "AttemptDto.stamp: Date, declared outside the release",
      "AttemptDto: unresolved parent MissingTaskRefsDto",
      `Deep.next: deeper than ${DEPTH}`,
      "dist/src/glob.d.ts: a global augmentation",
      "dist/src/script.d.ts: a global script",
      "dist/src/script.d.ts: a reference directive to ./glob.d.ts",
    ]);
    expect(spelling(planted.files, RECORD_WORDS)).toStrictEqual(["dist/src/protocol.d.ts"]);
    expect(spells(Object.values(PLANTED).join("\n"), RECORD_WORDS)).toStrictEqual([...RECORD_WORDS]);
    expect(spells("furnace.external-observation/v1", RECORD_WORDS)).toStrictEqual([]);
    expect(Object.fromEntries(Object.entries(ENTRY_PLANTS).map(([name, plant]) => [name, plantedRelease(plant).reading.slots]))).toStrictEqual({
      unresolved: ["entry: @furnace/sdk resolves to nothing, not a TypeScript file of the release"],
      "one export": ["entry dist/src/index.d.ts: exports no RunStatusDto"],
    });
  });
  describe("the observer's output at a fixed clock", () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ["Date"] });
      vi.setSystemTime(new Date(CLOCK));
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it("B1 (ACCEPTANCE[2]): a fixture without the fields produces today's reading, snapshot and topology, byte-identical", async () => {
      const out = await outputs(status, [failed, successor]);
      expect(out.reading).toStrictEqual(READING);
      expect(out.snapshot).toStrictEqual(RUN_SNAPSHOT);
      expect(out.topology).toStrictEqual(TOPOLOGY);
      expect(JSON.stringify(out)).toBe(JSON.stringify({ reading: READING, snapshot: RUN_SNAPSHOT, topology: TOPOLOGY }));
    });

    it("B2: FRC-01-shaped keys the release has not published change nothing and reach no output", async () => {
      expect(LINEAGE.filter((row) => !Object.keys(UNPUBLISHED).some((key) => row.pattern.test(key))).map((row) => row.ref), "every FRC-01 ref is planted").toEqual([]);
      const out = await outputs(statusWithLineage, [withLineage(failed), withLineage(successor)]);
      expect(out.reading).toStrictEqual(READING);
      expect(out.snapshot).toStrictEqual(RUN_SNAPSHOT);
      expect(out.topology).toStrictEqual(TOPOLOGY);
      expect(JSON.stringify(out)).toBe(JSON.stringify({ reading: READING, snapshot: RUN_SNAPSHOT, topology: TOPOLOGY }));
      expect(JSON.stringify(out)).not.toContain("HYPOTHETICAL");
    });

    it("C1 (ACCEPTANCE[3]): a failed Attempt and its successor sharing one episode get ownership edges only, never causation", async () => {
      const { topology } = await outputs(statusWithLineage, [withLineage(failed), withLineage(successor)]);
      const causation: FurnaceObservedRelation["kind"] = "causation";
      expect(topology.relations.map((relation) => relation.kind)).toStrictEqual(["ownership", "ownership"]);
      expect(topology.relations.filter((relation) => relation.kind === causation)).toStrictEqual([]);
      expect(topology.relations.filter((relation) => relation.from.type !== "run" || relation.to.type !== "attempt")).toStrictEqual([]);
      expect(topology.relations.map((relation) => relation.provenance)).toStrictEqual([confirmed, confirmed]);
      // The absence is the observer's: the projection accepts a causation statement between the same two Attempts.
      const projection = new ObservationProjection();
      for (const snapshot of topology.snapshots) projection.refresh(snapshot);
      for (const relation of topology.relations) projection.relate(relation);
      projection.relate({ scope: SCOPE, from: attemptRef("frn-atm-l1"), to: attemptRef("frn-atm-l2"), kind: causation, provenance: { source: "census-plant" } });
      expect(projection.relations({ scope: SCOPE }).filter((relation) => relation.kind === causation)).toHaveLength(1);
    });
  });

  it("A1: the export row's title lists exactly LINEAGE's refs and its description carries exactly the ACCEPTANCE quoted here", () => {
    const row = exportRow();
    const listed = /\(FRC-01: ([^)]+) refs on AttemptDto\/RunStatusDto\)/.exec(row.title)?.[1];
    expect(listed?.split(/, | and /)).toStrictEqual(LINEAGE.map((item) => item.ref));
    expect(row.description).toContain(`ACCEPTANCE: [${ACCEPTANCE.map(listItem).join(", ")}]`);
    expect(row.title.startsWith(`[COLLECTIVE-ADAPTATION-R12] When @furnace/sdk publishes Furnace F2's persistent episode lineage`)).toBe(true);
  });

  it.each(RESIDUALS)("R1 $id: a planted member of the family reads quiet, and the reader saw it", (residual) => {
    const planted = plantedRelease(residual.plant);
    expect(lineageWords(planted.reading), `${residual.id} is a named residual (${residual.family}): it reads quiet`).toStrictEqual(QUIET_WORDS);
    expect(planted.reading.slots).toStrictEqual([]);
    expect(planted.reading.roots).toStrictEqual(["dist/src/protocol.d.ts:AttemptDto", "dist/src/protocol.d.ts:RunStatusDto"]);
    expect(spelling(planted.files, RECORD_WORDS)).toStrictEqual([]);
    expect(residual.seen(planted), "the reader saw the plant: the quiet reading is the family's, not blindness").toContain(residual.witness);
  });

  it("FROZEN SHAPE (standing rule 16): LINEAGE's rows and pin counts, and the residual families", () => {
    expect(LINEAGE.map((row) => `${row.ref}:${row.today.length}`)).toStrictEqual([
      "episode:0",
      "task:0",
      "actor:2",
      "attempt:27",
      "policy-revision:7",
      "artifact:0",
    ]);
    expect(RESIDUALS.map((residual) => residual.id)).toStrictEqual(["R-SYNONYM", "R-UNDECLARED", "R-UNREACHED"]);
  });
});
