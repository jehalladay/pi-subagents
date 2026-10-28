/**
 * wb-4ap.12 (COLLECTIVE-ADAPTATION-R12, program-triage-2026-10-17), the Furnace episode-lineage census: the until-then leg
 * of a trigger-gated requirement whose upstream record has not shipped.
 * Statement (the bead's export title, verbatim up to its own truncation): "When @furnace/sdk publishes Furnace F2's
 * persistent episode lineage (FRC-01: episode, task, actor, attempt, policy-revision and artifact refs on
 * AttemptDto/RunStatusDto), the Furnace observer shall project each ref additively as a provenanced snapshot facet or typed
 * edge (never causation, never ownership without a native confirmation reference), with absent keys keeping today's output
 * byte-identical."
 *
 * MEASURED (read-only, 2026-10-28; by cut #1 at base f5589e0 and 695105d, re-read by cut #2 at 51f4db4, whose landings
 * 596-631 touched neither the vendored SDK nor the observer). The installed @furnace/sdk is 0.1.0 from
 * vendor/furnace-sdk-0.1.0.tgz: 128 files, 28 of them TypeScript declaration files (the only TypeScript files it ships).
 * Read through the TypeScript type checker (READER below), AttemptDto (27 members) and RunStatusDto (16 members, plus
 * RunDto's 29 by heritage), each declared once, in dist/src/protocol.d.ts, reach 193 members at every depth of the
 * release's own types, 143 string literals in those members' types (counted per member) and 44 other named types, and no
 * open slot. Three FRC-01 words reach any of them, and nothing they reach is lineage: actor reaches two members
 * (AttestationDto.actor, who attested an Attempt clear; InspectionClaimDto.actor, the `bd --actor` a held claim was made
 * as, on run inspect); attempt reaches 27 entries (the Attempt's own identity, the Run's attempt_timeout budget and
 * active_attempts count, the Attempt ids, states and counts of run inspect's rows, of the Run's held-work rows and of run
 * status's work and unreadable rows, the successor mark SupersedingAttemptDto.attempt_id, seven reconciliation-basis words
 * and four type names); policy-revision reaches seven (RunDto.binary_revision, the producer build; RunDto.policy_bypass and
 * policy_provenance, the start-time sources of executor and max_parallel; and four type names). No file of the release
 * spells "episode" or "lineage". At cut #1's reading (not re-read by cut #2), Furnace's own tree at main 0d41031
 * (2026-10-26) read "Status: proposed additive development program ... No implementation implied"
 * (docs/programs/collective-adaptation-2026-10-16/04-implementation-and-qa.md:3; F2 "Persistent episode lineage export" at
 * :11), and its sdk/typescript/src/protocol.ts spelled neither record word, so the trigger had fired neither in the release
 * Pi vendors nor upstream. The census reads only the installed release, never Furnace's tree. AttemptDto.superseded_by is
 * the existing successor mark (set on run status failed and attention rows only; attempt list never sets it), not F2's
 * export: the observer reads the Run's counts and attempt list pages, so the fixture carries the mark and no reading
 * projects it. src/workbench/furnace-observer.ts copies each Attempt by named field (attemptRef) and states one Run->Attempt
 * ownership edge per returned Attempt, confirmed by the Attempt page request id. No src, docs or tracker text is edited.
 *
 * READER (cut #2, which cures refusal #1's U1 and U2): T1 reads the release through the TypeScript type checker, never by
 * syntax alone. A Program over every TypeScript file of the release (the ES2023 library without the DOM, no ambient types)
 * resolves every declaration named AttemptDto or RunStatusDto in any file (an interface, a type alias or a class,
 * augmentations and namespaces included) and walks its type: every member the checker resolves on it, inherited ones
 * included, and each parent its heritage names (an interface, a type alias, a generic-wrapped or an intersection parent),
 * then each reached member's type at every depth of the release's own types (objects, arrays, tuples, unions,
 * intersections, mapped and Record types). The FRC-01 words are matched against every reached member name (quoted and
 * computed names as the checker resolves them), every string literal and enum member in a reached member's type, and every
 * named type the walk reaches or a reached member's declaration names (so a primitive alias is read by its name). An open
 * slot is a place a ref could sit with no name to match: an index signature, a member typed unknown, any, object or {} (an
 * empty object type), a type parameter or another unresolved type, a callable, a non-array type declared outside the
 * release, an unresolved parent, or a depth past DEPTH.
 *
 * CASES. T1 (ARMED) the roots are exactly protocol.d.ts's AttemptDto and RunStatusDto, the matches equal LINEAGE's today
 * sets, the walk finds no open slot, and no release file spells "episode" or "lineage" by path or content (the content
 * reading is proven live by finding the release's own superseded_by, spelled today only in dist/src/protocol.d.ts). A
 * re-vendor that brings an FRC-01 word to any place the walk matches, an open slot, another root or a record word anywhere
 * in the release reds T1, naming the acceptance on landing as owed. T2 the same reader reads a planted six-file release: an
 * FRC-01 word through an interface parent, a type-alias parent, a generic-wrapped parent (Partial) and a second type-alias
 * parent of RunStatusDto that is an intersection, nested in an array of objects and in a tuple, by a quoted and a computed
 * member name, as a string literal and an enum member, as a type name and as a primitive alias's name, and on a DTO
 * declared again in a second file, as a class, as a generic type alias, by a module augmentation and in a namespace; and
 * every kind of open slot (an index signature, an unknown member, an empty object type, a callable, a type declared
 * outside the release, a type parameter, an unresolved parent and a depth past DEPTH), so a hollowed reader reds. B1
 * (ACCEPTANCE[2]) a fixture without the fields produces a reading, a projectionSnapshot and a projectionTopology
 * toStrictEqual today's (frozen literals at a fixed clock) and byte-identical JSON. B2 the same fixture carrying FRC-01-shaped keys under this file's own
 * hypothetical spellings (the release reaches none of them) on the Run status, its failed row and every Attempt row
 * produces the same three literals and no planted value: nothing is projected before the SDK publishes it. C1
 * (ACCEPTANCE[3]) over a failed Attempt and its successor at one Work sharing one hypothetical episode, every relation is a
 * Furnace-confirmed Run->Attempt ownership edge and none is causation or Attempt->Attempt, although causation is a kind the
 * projection accepts. A1 the outside anchors: the export row's title lists exactly LINEAGE's refs and its description
 * carries exactly the ACCEPTANCE list quoted here. R1 the residuals' pinned quiet rows: a planted member of each family
 * reads quiet, and the reader is shown to have seen it.
 * RESIDUALS (named, each pinned quiet by its R1 row; nothing above reads them): R-SYNONYM a ref named by no FRC-01 word (a
 * synonym or an abbreviation, such as owner, job, outputs or prev) is reached but not matched; R-UNDECLARED a ref the
 * release carries only outside its TypeScript files (its JavaScript or JSON) and under no record word is not read;
 * R-UNREACHED a ref on a type neither DTO reaches (another response DTO such as AttemptListDto, or an unreferenced
 * declaration) is not read.
 * FROZEN SHAPE (standing rule 16): LINEAGE pins `${ref}:${today.length}` and RESIDUALS their ids as literals; LINEAGE's refs
 * are held to the export title (A1) and its today sets to the installed release (T1).
 * NOT CLAIMED (edits of this file alone): a residual row removed from RESIDUALS and the frozen-shape literal together (no
 * outside anchor names the residual families); a case whose subject is replaced by its own expected value (A1's export read
 * by a constant title and description, B1's observer call by the frozen literals).
 * HYGIENE: B1, B2 and C1 run under vi.useFakeTimers({ toFake: ["Date"] }) with vi.setSystemTime(CLOCK), a frozen clock for
 * the observer's stamps; no module, function or timer is replaced. Nothing is written and no scratch is allocated: every
 * planted release is served from memory.
 * PARKED (the external remainder, a Furnace release): ACCEPTANCE[0] and ACCEPTANCE[1] need F2's fields in a released
 * @furnace/sdk. A re-vendor that declares them under an FRC-01 word, with an open slot or under a record word reds T1 and
 * owes both, AC2's fixture then replacing B2; one that carried them only in a residual family would not.
 */
import { readdirSync, readFileSync } from "node:fs";
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

interface LineageRow {
  readonly ref: string;
  readonly pattern: RegExp;
  readonly today: readonly string[];
}
/** FRC-01's refs in the export title's order: the reading that would carry each, and what the installed release already
 * reaches under it (measured at cut #2, sorted; none of it is lineage): `Owner.member` for a member name,
 * `Owner.member="value"` for a literal in its type and `type Name` for a named type. */
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
/** Where a planted release is served from: a directory that does not exist, so every planted file comes from memory. */
const PLANTED_ROOT = "/wb-4ap.12-planted-release";
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
/** A Program over `sources` (absolute path to text, served from memory; nothing is written) and the library. */
function checkerProgram(sources: ReadonlyMap<string, string>): ts.Program {
  const base = ts.createCompilerHost(CHECKER_OPTIONS, true);
  const host: ts.CompilerHost = {
    ...base,
    fileExists: (file) => sources.has(file) || base.fileExists(file),
    directoryExists: (dir) => [...sources.keys()].some((file) => file.startsWith(`${dir}/`)) || (base.directoryExists?.(dir) ?? false),
    realpath: (path) => (sources.has(path) ? path : (base.realpath?.(path) ?? path)),
    readFile: (file) => sources.get(file) ?? base.readFile(file),
    getSourceFile: (file, language) => {
      const text = sources.get(file);
      if (text !== undefined) return ts.createSourceFile(file, text, language, true, ts.ScriptKind.TS);
      const cached = PARSED.get(file);
      if (cached !== undefined) return cached;
      const read = base.getSourceFile(file, language);
      if (read !== undefined) PARSED.set(file, read);
      return read;
    },
  };
  return ts.createProgram({ rootNames: [...sources.keys()], options: CHECKER_OPTIONS, host });
}
/** One word the walk reached: a member name or a literal, with the declaration (or the member) that holds it. */
interface Reached {
  readonly owner: string;
  readonly word: string;
}
interface TypeReading {
  /** Every declaration of a subject name, as `path:name` with the path inside the release, sorted. */
  readonly roots: readonly string[];
  /** Every member the walk reached, owned by the interface, type alias or class declaring it (an anonymous type by the
   * member path into it; a member with no declaration by the type it was reached on). */
  readonly members: readonly Reached[];
  /** Every string literal and enum member in a reached member's type, owned by that member. */
  readonly literals: readonly Reached[];
  /** Every named type the walk reached or a reached member's declaration names, the subjects' own names excepted. */
  readonly typeNames: readonly string[];
  /** Every open slot (see READER in the header), sorted. */
  readonly slots: readonly string[];
}
const memberKey = ({ owner, word }: Reached): string => `${owner}.${word}`;
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
/** The checker's reading of every declaration of a subject name in `sources` (READER in the header). */
function readTypes(sources: ReadonlyMap<string, string>, rootDir: string, subjects: readonly string[] = DTOS): TypeReading {
  const program = checkerProgram(sources);
  const checker = program.getTypeChecker();
  const roots: string[] = [];
  const members = new Map<string, Reached>();
  const literals = new Map<string, Reached>();
  const typeNames = new Set<string>();
  const slots = new Set<string>();
  const seen = new Set<ts.Type>();
  const inRelease = (node: ts.Node): boolean => sources.has(node.getSourceFile().fileName);
  const literal = (owner: string, word: string): void => {
    literals.set(`${owner}=${JSON.stringify(word)}`, { owner, word });
  };
  const named = (node: ts.Node): void => {
    if (ts.isTypeReferenceNode(node)) typeNames.add(node.typeName.getText());
    if (ts.isExpressionWithTypeArguments(node)) typeNames.add(node.expression.getText());
    ts.forEachChild(node, named);
  };
  const walk = (type: ts.Type, label: string, depth: number): void => {
    for (const symbol of [type.aliasSymbol, type.getSymbol()])
      if (symbol !== undefined && (symbol.flags & NAMED_TYPE) !== 0) typeNames.add(symbol.getName());
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
      if (
        declaration !== undefined &&
        inRelease(declaration) &&
        (ts.isPropertySignature(declaration) || ts.isPropertyDeclaration(declaration)) &&
        declaration.type !== undefined
      )
        named(declaration.type);
      walk(checker.getTypeOfSymbol(property), `${owner}.${word}`, depth + 1);
    }
  };
  for (const file of sources.keys()) {
    const source = program.getSourceFile(file);
    if (source === undefined) {
      slots.add(`${relative(rootDir, file)}: not in the program`);
      continue;
    }
    const visit = (node: ts.Node): void => {
      if (
        (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isClassDeclaration(node)) &&
        node.name !== undefined &&
        subjects.includes(node.name.text)
      ) {
        roots.push(`${relative(rootDir, file)}:${node.name.text}`);
        const symbol = checker.getSymbolAtLocation(node.name);
        if (symbol === undefined) slots.add(`${node.name.text}: unresolved`);
        else walk(checker.getDeclaredTypeOfSymbol(symbol), node.name.text, 0);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return {
    roots: roots.sort(),
    members: [...members.values()],
    literals: [...literals.values()],
    typeNames: [...typeNames].filter((name) => !subjects.includes(name)),
    slots: [...slots].sort(),
  };
}
/** Per LINEAGE row, every reached member name, literal and type name the row's reading matches, sorted. */
function lineageWords(reading: TypeReading): Record<string, string[]> {
  return Object.fromEntries(
    LINEAGE.map((row) => [
      row.ref,
      [
        ...reading.members.filter(({ word }) => row.pattern.test(word)).map(memberKey),
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
/** A release (path inside the package to text) under `root`, its TypeScript files read by the checker. */
function release(files: ReadonlyMap<string, string>, root: string, subjects: readonly string[] = DTOS): Release {
  const sources = new Map([...files].filter(([path]) => TYPESCRIPT.test(path)).map(([path, text]): [string, string] => [join(root, path), text]));
  return { files, reading: readTypes(sources, root, subjects) };
}
/** The installed release, read file by file. */
function installedRelease(): Release {
  return release(new Map(releaseFiles(SDK_ROOT).map((file): [string, string] => [relative(SDK_ROOT, file), readFileSync(file, "utf8")])), SDK_ROOT);
}
/** A planted release (path inside the package to text), served from memory under PLANTED_ROOT. */
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
  "dist/src/protocol.d.ts": [
    "/** a lineage-free comment */",
    "export type LinkRefsDto = { task_ref?: string };",
    "export interface WhoRefs { actor_ref: string }",
    "export type OutputRefsDto = { artifact_refs?: string[] } & { note?: string };",
    "export declare enum RefKind { Episode = 0, Plain = 1 }",
    "export interface TaskLink { id: string }",
    "export type ActorName = string;",
    "export interface Deep<T> { next?: Deep<T[]> }",
    "export interface AttemptDto extends LinkRefsDto, Partial<WhoRefs>, MissingRefsDto {",
    "  attempt_id: string;",
    "  'policy_revision'?: string;",
    '  ["actor"]?: string;',
    "  refs?: { episode?: string }[];",
    "  pair?: [string, { attempt_no?: number }];",
    '  kind?: "artifact" | "plain";',
    "  ref_kind?: RefKind;",
    "  links?: TaskLink[];",
    "  who?: ActorName;",
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
  "dist/src/more.d.ts": "export interface RunStatusDto { predecessor_attempt?: string }\n",
  "dist/src/alias.d.ts": "export type AttemptDto<P = string> = { prior_actor?: string; param?: P };\n",
  "dist/src/cls.d.ts": "export declare class RunStatusDto { revision_note?: string }\n",
  "dist/src/aug.d.ts": 'import "./protocol.js";\ndeclare module "./protocol.js" {\n  interface AttemptDto { artifact_digest?: string }\n}\nexport {};\n',
  "dist/src/ns.d.ts": "export declare namespace v2 {\n  interface AttemptDto { task_owner?: string }\n}\n",
};
/** The release every residual plants into: the two DTOs and RunStatusDto's parent; its one FRC-01 word is attempt_id. */
const QUIET_RELEASE = [
  "export interface AttemptDto { attempt_id: string; run_id: string }",
  "export interface RunDto { run_id: string }",
  "export interface RunStatusDto extends RunDto { failed: AttemptDto[] }",
].join("\n");
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
      "dist/src/protocol.d.ts": QUIET_RELEASE,
      "dist/src/protocol.js": "export function attemptRow(row) {\n  return { ...row, task_ref: row.task_ref, actor_ref: row.actor_ref };\n}\n",
    },
    seen: (planted) => spelling(planted.files, ["task_ref"]),
    witness: "dist/src/protocol.js",
  },
  {
    id: "R-UNREACHED",
    family: "a ref on a type neither DTO reaches: another response DTO, or an unreferenced declaration",
    plant: { "dist/src/protocol.d.ts": `${QUIET_RELEASE}\nexport interface AttemptListDto { attempts: AttemptDto[]; task_refs?: string[] }` },
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

  it("T2: the same reader reads every planted form: parents, nesting, names, literals, type names, every kind of root and every open slot", () => {
    const planted = plantedRelease(PLANTED);
    expect(planted.reading.roots).toStrictEqual([
      "dist/src/alias.d.ts:AttemptDto",
      "dist/src/aug.d.ts:AttemptDto",
      "dist/src/cls.d.ts:RunStatusDto",
      "dist/src/more.d.ts:RunStatusDto",
      "dist/src/ns.d.ts:AttemptDto",
      "dist/src/protocol.d.ts:AttemptDto",
      "dist/src/protocol.d.ts:RunStatusDto",
    ]);
    expect(lineageWords(planted.reading)).toStrictEqual({
      episode: ['AttemptDto.ref_kind="Episode"', "AttemptDto.refs.episode"],
      task: ["AttemptDto.task_owner", "LinkRefsDto.task_ref", "type TaskLink"],
      actor: ["AttemptDto.actor", "AttemptDto.prior_actor", "WhoRefs.actor_ref", "type ActorName"],
      attempt: ["AttemptDto.attempt_id", "AttemptDto.pair.attempt_no", "RunDto.attempt_timeout", "RunStatusDto.predecessor_attempt"],
      "policy-revision": ["AttemptDto.policy_revision", "RunStatusDto.revision_note"],
      artifact: ["AttemptDto.artifact_digest", 'AttemptDto.kind="artifact"', "OutputRefsDto.artifact_refs"],
    });
    expect(planted.reading.slots).toStrictEqual([
      "AttemptDto.blank: empty object type",
      "AttemptDto.extra[string]",
      "AttemptDto.hook: callable",
      "AttemptDto.opaque: unknown",
      "AttemptDto.param: P",
      "AttemptDto.stamp: Date, declared outside the release",
      "AttemptDto: unresolved parent MissingRefsDto",
      `Deep.next: deeper than ${DEPTH}`,
    ]);
    expect(spelling(planted.files, RECORD_WORDS)).toStrictEqual(["dist/src/protocol.d.ts"]);
    expect(spells(Object.values(PLANTED).join("\n"), RECORD_WORDS)).toStrictEqual([...RECORD_WORDS]);
    expect(spells("furnace.external-observation/v1", RECORD_WORDS)).toStrictEqual([]);
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
