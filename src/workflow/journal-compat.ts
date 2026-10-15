/**
 * journal-compat.ts — what this build does with every line of a workflow
 * journal, reported before anyone resumes from it (W22 migration acceptance).
 *
 * docs/workbench/16 § "Compatibility feature control": "Ensure older journal
 * format remains readable when supported, but does not become unsafe reuse
 * for effectful calls; compatibility may require explicit "journal
 * unsupported" warnings."
 *
 * readJournal (journal.ts) is forgiving on purpose: a line it cannot read is
 * skipped without a word, because a shorter replayable prefix still saves a
 * resume tokens. That is right for the runtime and wrong for an operator
 * deciding whether a journal written by another build can be resumed: the
 * dropped line is invisible, and a dropped effect row is invisible to the
 * uncertain-effect tripwire as well. This module is the report that makes the
 * silence visible. It reports and never decides:
 *
 *   - Pure: the caller passes the raw text; nothing here touches a file.
 *   - Read-only: readJournal, appendJournal and the runtime's admission are
 *     neither changed nor called, so a resume behaves exactly as it would
 *     without this report.
 *   - Lossless: every physical line is classified, counted blank, or named in
 *     the unsupported census with its line number and reason. An entry kind
 *     this build does not know is kept and refused, never read as another.
 *   - Mirroring, never relaxing: each line's replay disposition restates the
 *     admission rules in runtime.ts — the agent prefix replay's basis check,
 *     node admission per recorded effect class, the position map that
 *     consults the last node row at a position — as conditions a resuming
 *     host must meet. No classification marks an effectful entry
 *     replay-eligible.
 *
 * The accept set restates journal.ts's (unexported) isEntry clause by clause;
 * the compile-time pin below and the readJournal differential in
 * test/workflow-journal-compat.test.ts keep the two from drifting apart.
 *
 * Structured identity fields (basis, capabilityId, effectClass) are carried
 * verbatim so a caller can compare them exactly, as admission does; every
 * human-readable string (notes, details, warnings, ignored field names) has
 * passed through the shared sanitizer in workbench/redaction.ts.
 */

import { WORKFLOW_SCRIPT_SCHEMA_VERSION } from "../workbench/identity.js";
import type { NativeRef } from "../workbench/observation.js";
import { sanitizeWorkbenchText } from "../workbench/redaction.js";
import type { WorkflowJournalEntry } from "./journal.js";
import { entryDigestOf, isReconcileRecord, producerOf, type ReconcileRecord } from "./reconcile.js";

/* ------------------------------------------------------------------------- *
 * The shape this reader accepts, pinned to journal.ts
 * ------------------------------------------------------------------------- */

/** Every top-level field journal.ts's WorkflowJournalEntry declares, in declaration order. */
export const JOURNAL_ENTRY_FIELDS = [
  "index",
  "key",
  "ok",
  "text",
  "resumed",
  "kind",
  "capabilityId",
  "effectClass",
  "basis",
  "nativeRefs",
  "reconcile",
] as const;

/** The entry kinds journal.ts reads. A row with no kind at all is a settled agent. */
export const JOURNAL_ENTRY_KINDS = ["node", "acknowledge", "override"] as const;

export type JournalEntryField = (typeof JOURNAL_ENTRY_FIELDS)[number];
export type JournalEntryKind = (typeof JOURNAL_ENTRY_KINDS)[number];

/**
 * The entry shape this reader accepts, field for field. Restated rather than
 * aliased so the pin below has two sides to compare.
 */
interface AcceptedJournalEntry {
  index: number;
  key: string;
  ok: boolean;
  text?: string;
  resumed?: true;
  kind?: JournalEntryKind;
  capabilityId?: string;
  effectClass?: string;
  basis?: string;
  nativeRefs?: readonly NativeRef[];
  reconcile?: ReconcileRecord;
}

type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
type Holds<T extends true> = T;

/**
 * Compile-time pin to journal.ts. When WorkflowJournalEntry gains, drops,
 * renames or retypes a field or a kind, one of these stops satisfying `true`
 * and `npm run typecheck` fails, so the accept set below cannot drift from the
 * reader it restates without the build saying so.
 */
export type JournalEntryShapePin = [
  Holds<Same<AcceptedJournalEntry, WorkflowJournalEntry>>,
  Holds<Same<keyof AcceptedJournalEntry, keyof WorkflowJournalEntry>>,
  Holds<Same<JournalEntryField, keyof WorkflowJournalEntry>>,
  Holds<Same<JournalEntryKind, NonNullable<WorkflowJournalEntry["kind"]>>>,
];

/* ------------------------------------------------------------------------- *
 * The report
 * ------------------------------------------------------------------------- */

/** What a line is, as far as a resume is concerned. */
export const JOURNAL_LINE_CLASSES = [
  "legacy-agent",
  "basis-scoped-agent",
  "node-read",
  "node-effectful",
  "operator-decision",
  "unsupported",
] as const;

export type JournalLineClass = (typeof JOURNAL_LINE_CLASSES)[number];

/**
 * What a resume does with a line.
 *
 * - `replay-conditional-on-basis`: may be handed back, but only under a host
 *   recording the same basis (an entry with none: a host recording none) and
 *   only while the rest of admission holds — same call key, unbroken prefix,
 *   and for a node read a host that still declares the capability a read.
 * - `live`: never handed back; a resume that reaches it runs the call live.
 * - `refuse-uncertain-effect`: a journaled effect; a resume that reaches it
 *   stops with a typed uncertain-effect refusal unless a bound operator
 *   decision settles it. Not gated on any basis.
 * - `decision`: an operator decision row, never a result; consulted only at
 *   the refusing node position it binds to.
 * - `shadowed`: a node row a later row at the same position replaces; a
 *   resume never consults it.
 * - `dropped`: this build's reader skips the line; a resume never sees it.
 */
export type JournalReplayDisposition =
  | "replay-conditional-on-basis"
  | "live"
  | "refuse-uncertain-effect"
  | "decision"
  | "shadowed"
  | "dropped";

/** Why this build's reader drops a line — one name per isEntry clause it can fail. */
export type JournalUnsupportedReason =
  | "malformed-json"
  | "truncated-final-line"
  | "not-an-object"
  | "unknown-kind"
  | "invalid-field"
  | "node-without-capability"
  | "decision-without-record"
  | "stray-decision-record"
  | "invalid-decision";

/** The verdict warning docs/workbench/16 asks for: a dropped line or a foreign schema version raises it. */
export const JOURNAL_UNSUPPORTED_WARNING = "journal unsupported";
/** Node positions recorded more than once, where only the last row counts. */
export const JOURNAL_DUPLICATE_POSITION_WARNING = "journal duplicate position";
/** Journaled effects a resume will stop on. */
export const JOURNAL_UNCERTAIN_EFFECT_WARNING = "journal uncertain effect";
/** Node rows with no recorded effect class, which a resume re-runs live. */
export const JOURNAL_UNVOUCHED_NODE_WARNING = "journal unvouched node";
/** Entries recorded under more than one replay basis. */
export const JOURNAL_MIXED_BASIS_WARNING = "journal mixed basis";
/** Fields a newer writer added that this build does not read. */
export const JOURNAL_IGNORED_FIELDS_WARNING = "journal fields ignored";

/** A line this build's reader keeps, with what a resume does with it. */
export interface ReadJournalLine {
  /** 1-based physical line number. */
  readonly line: number;
  readonly class: Exclude<JournalLineClass, "unsupported">;
  readonly replay: Exclude<JournalReplayDisposition, "dropped">;
  /** True only where a resume could ever hand the recorded answer back; never for an effectful entry. */
  readonly replayEligible: boolean;
  readonly entryKind: "agent" | JournalEntryKind;
  /** Position in the entry's own position space (agents and nodes count separately). */
  readonly index: number;
  /** The recorded basis verbatim, or null when the line carries none; compared by strict equality, as admission does. */
  readonly basis: string | null;
  readonly capabilityId: string | null;
  readonly effectClass: string | null;
  /** The typed refusal a resume reaching this line raises whatever its host, if any. */
  readonly refusal: "uncertain-effect" | null;
  /** On a refusing node row: operator decisions in this file that bind to it by digest. */
  readonly boundDecisions: number;
  /** On a decision row: the line of the node row it binds to, or null when it binds to none. */
  readonly bindsToLine: number | null;
  /** Top-level fields this build does not read (sanitized names): kept on disk, without effect on resume. */
  readonly ignoredFields: readonly string[];
  /** A schemaVersion the line declares that is not this build's, sanitized for display; null otherwise. */
  readonly foreignSchemaVersion: string | null;
  readonly note: string;
}

/** A line this build's reader drops. */
export interface DroppedJournalLine {
  readonly line: number;
  readonly class: "unsupported";
  readonly replay: "dropped";
  readonly replayEligible: false;
  readonly reason: JournalUnsupportedReason;
  /** The entry field the line failed on, when one did. */
  readonly field: JournalEntryField | null;
  readonly detail: string;
  readonly note: string;
}

export type ClassifiedJournalLine = ReadJournalLine | DroppedJournalLine;

/** One row of the skipped-line census. */
export interface JournalUnsupportedLine {
  readonly line: number;
  readonly reason: JournalUnsupportedReason;
  readonly field: JournalEntryField | null;
  readonly detail: string;
}

/** Agent and node entries recorded under one replay basis. */
export interface JournalBasisCohort {
  /** The basis verbatim, or null for entries recorded without one: a cohort of its own, as in admission. */
  readonly basis: string | null;
  readonly lines: readonly number[];
  readonly agents: number;
  readonly nodes: number;
}

export type JournalCompatVerdict = "readable" | "unsupported";

export interface JournalCompatReport {
  /** "readable" when this build reads every line as its own; otherwise "unsupported", with a JOURNAL_UNSUPPORTED_WARNING. */
  readonly verdict: JournalCompatVerdict;
  readonly warnings: readonly string[];
  /** Physical lines in the text. A final newline ends the last line; it does not start another. */
  readonly physicalLines: number;
  /** Every non-blank line, in file order. */
  readonly lines: readonly ClassifiedJournalLine[];
  /** Whitespace-only lines, which the reader skips and which record nothing. */
  readonly blankLines: readonly number[];
  /** The skipped-line census: every line the reader drops, in file order. */
  readonly unsupported: readonly JournalUnsupportedLine[];
  readonly counts: Readonly<Record<JournalLineClass, number>>;
  /** Agent and node entries by recorded basis, in order of first appearance. Decision rows bind by digest instead. */
  readonly cohorts: readonly JournalBasisCohort[];
  /** More than one cohort: a resume under any one host matches at most one of them. */
  readonly mixedBasis: boolean;
}

/* ------------------------------------------------------------------------- *
 * Reading one line the way journal.ts does, naming what fails
 * ------------------------------------------------------------------------- */

/** Display bound for journal text quoted into a report string. */
const DISPLAY_LIMIT = 64;
/** How many items a warning names before it summarizes the rest. */
const LISTED = 10;

const ENTRY_FIELDS: ReadonlySet<string> = new Set<string>(JOURNAL_ENTRY_FIELDS);

/** What each field must hold for the reader to keep the line. */
const EXPECTED: Readonly<Record<JournalEntryField, string>> = {
  index: "a non-negative integer",
  key: "a string",
  ok: "a boolean",
  text: "a string when present",
  resumed: "true when present",
  kind: "a string naming an entry kind when present",
  capabilityId: "a string when present",
  effectClass: "a string when present",
  basis: "a string when present",
  nativeRefs: "a list of native references (provider, type and id strings, optional string scope) when present",
  reconcile: "a valid operator decision record on an acknowledge or override row, and absent elsewhere",
};

type Parsed =
  | {
      readonly kept: true;
      readonly entry: WorkflowJournalEntry;
      readonly ignoredFields: readonly string[];
      readonly foreignSchemaVersion: string | null;
    }
  | {
      readonly kept: false;
      readonly reason: JournalUnsupportedReason;
      readonly field: JournalEntryField | null;
      readonly detail: string;
    };
type KeptLine = Extract<Parsed, { kept: true }>;
type RefusedLine = Extract<Parsed, { kept: false }>;

/** Journal text bound for a report string: redacted, stripped of terminal controls, bounded, quoted. */
function quoted(value: string): string {
  return JSON.stringify(sanitizeWorkbenchText(value, DISPLAY_LIMIT));
}

function listed(items: readonly string[]): string {
  const shown = items.slice(0, LISTED).join(", ");
  return items.length > LISTED ? `${shown}, and ${items.length - LISTED} more` : shown;
}

function plainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function jsonTypeOf(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "an array";
  return `a ${typeof value}`;
}

/** journal.ts isNativeRef. */
function isNativeRef(value: unknown): value is NativeRef {
  return (
    plainObject(value) &&
    typeof value.provider === "string" &&
    typeof value.type === "string" &&
    typeof value.id === "string" &&
    (value.scope === undefined || typeof value.scope === "string")
  );
}

function isNativeRefList(value: unknown): value is readonly NativeRef[] {
  return Array.isArray(value) && value.every(isNativeRef);
}

function refused(reason: JournalUnsupportedReason, field: JournalEntryField | null, detail: string): RefusedLine {
  return { kept: false, reason, field, detail };
}

function invalid(field: JournalEntryField): RefusedLine {
  return refused("invalid-field", field, `field "${field}" must be ${EXPECTED[field]}`);
}

function parseLine(segment: string, unterminatedFinal: boolean): Parsed {
  let value: unknown;
  try {
    value = JSON.parse(segment);
  } catch {
    return unterminatedFinal
      ? refused(
          "truncated-final-line",
          null,
          "the final line ends without a newline and is not valid JSON, the mark of an append that never finished",
        )
      : refused("malformed-json", null, "the line is not valid JSON");
  }
  return parseEntry(value);
}

/**
 * journal.ts isEntry, clause by clause, naming the first clause a value
 * fails. Kind is checked first: an unknown kind is the forward-compatibility
 * signal, a row from a newer format, and it outranks whatever else that
 * format changed about the row.
 */
function parseEntry(value: unknown): Parsed {
  if (!plainObject(value)) {
    return refused("not-an-object", null, `the line is JSON ${jsonTypeOf(value)}, not an entry object`);
  }
  const { index, key, ok, text, resumed, kind, capabilityId, effectClass, basis, nativeRefs, reconcile } = value;
  const entryKind = JOURNAL_ENTRY_KINDS.find((known) => known === kind);
  if (kind !== undefined && entryKind === undefined) {
    return typeof kind === "string"
      ? refused(
          "unknown-kind",
          "kind",
          `entry kind ${quoted(kind)} is not one this build reads (node, acknowledge, override, or none for an agent)`,
        )
      : invalid("kind");
  }
  if (typeof index !== "number" || !Number.isInteger(index) || index < 0) return invalid("index");
  if (typeof key !== "string") return invalid("key");
  if (typeof ok !== "boolean") return invalid("ok");
  if (text !== undefined && typeof text !== "string") return invalid("text");
  if (resumed !== undefined && resumed !== true) return invalid("resumed");
  if (capabilityId !== undefined && typeof capabilityId !== "string") return invalid("capabilityId");
  if (effectClass !== undefined && typeof effectClass !== "string") return invalid("effectClass");
  if (basis !== undefined && typeof basis !== "string") return invalid("basis");
  if (nativeRefs !== undefined && !isNativeRefList(nativeRefs)) return invalid("nativeRefs");
  if (entryKind === "node" && capabilityId === undefined) {
    return refused(
      "node-without-capability",
      "capabilityId",
      "a node entry names no capabilityId, so there is no producer to reconcile with",
    );
  }

  let record: ReconcileRecord | undefined;
  if (entryKind === "acknowledge" || entryKind === "override") {
    if (reconcile === undefined) {
      return refused("decision-without-record", "reconcile", `an ${entryKind} row carries no operator decision record`);
    }
    if (capabilityId === undefined) {
      return refused("invalid-decision", "capabilityId", `the ${entryKind} row names no capabilityId`);
    }
    if (!isReconcileRecord(reconcile)) {
      return refused("invalid-decision", "reconcile", `the ${entryKind} row's record fails the reconcile contract (reconcile.ts)`);
    }
    if (reconcile.decision !== entryKind) {
      return refused(
        "invalid-decision",
        "reconcile",
        `the record's decision ${quoted(reconcile.decision)} differs from the row kind ${quoted(entryKind)}`,
      );
    }
    if (reconcile.entry.index !== index || reconcile.entry.key !== key) {
      return refused(
        "invalid-decision",
        "reconcile",
        "the record mirrors a different node row from the one it rides on (index or key differs)",
      );
    }
    record = reconcile;
  } else if (reconcile !== undefined) {
    return refused(
      "stray-decision-record",
      "reconcile",
      "an operator decision record rides on a row that is not an acknowledge or override decision",
    );
  }

  // Beyond isEntry: what the reader keeps but does not understand. A
  // schemaVersion equal to this build's is consistent and passes unremarked.
  const ignoredFields = Object.keys(value)
    .filter((name) => !ENTRY_FIELDS.has(name) && name !== "schemaVersion")
    .map((name) => sanitizeWorkbenchText(name, DISPLAY_LIMIT));
  const declared = value.schemaVersion;
  const foreignSchemaVersion =
    declared === undefined || declared === WORKFLOW_SCRIPT_SCHEMA_VERSION
      ? null
      : sanitizeWorkbenchText(typeof declared === "string" ? declared : JSON.stringify(declared), DISPLAY_LIMIT);
  return {
    kept: true,
    entry: { index, key, ok, text, resumed, kind: entryKind, capabilityId, effectClass, basis, nativeRefs, reconcile: record },
    ignoredFields,
    foreignSchemaVersion,
  };
}

/* ------------------------------------------------------------------------- *
 * What a resume does with a kept line (runtime.ts admission, restated)
 * ------------------------------------------------------------------------- */

const NOTES = {
  legacyAgent:
    "Agent entry recorded without a replay basis (the pre-basis shape): it replays only under a host that records none (the legacy Pi host), while the call key and replayable prefix still match; a basis-recording host (Claude, detached) re-runs it live on resume.",
  scopedAgent:
    "Agent entry scoped to its recorded replay basis: it replays only under a host that records the same basis, while the call key and replayable prefix still match; under any other basis it re-runs live on resume.",
  agentFailed: "Journaled agent failure: never replayed. A resume re-runs it live, and the replayable prefix ends here.",
  agentDeclined:
    "This journal records an agent({ resume }) call, so a resume declines agent replay for the whole file and re-runs this agent live.",
  readScoped:
    "Journaled read scoped to its recorded replay basis: it replays, marked stale, only under a host that still declares the capability a read and records the same basis, while the call key and replayable prefix still match. A capability that now declares another class refuses with uncertain-effect; anything else re-runs live.",
  readLegacy:
    "Node read recorded without a replay basis (the pre-basis shape): every Workbench host that vouches node reads (Claude, detached) records one, so a resume re-runs it live and never replays it.",
  readFailed:
    "Journaled failed read: never replayed. A resume re-runs it live, or refuses with uncertain-effect if the capability now declares another class.",
  readEmpty:
    "Journaled read with no recorded payload, so there is nothing to replay. A resume re-runs it live, or refuses with uncertain-effect if the capability now declares another class.",
  unvouched:
    "Node entry recorded without an effect class (the pre-policy shape): never replayed. A resume re-runs it live, so an effect it performed would be repeated.",
} as const;

function effectNote(effectClass: string, capabilityId: string, bound: number): string {
  return (
    `Journaled ${quoted(effectClass)} effect of producer ${quoted(producerOf(capabilityId))}: never re-run or replayed. ` +
    "A resume that reaches this position stops with a typed uncertain-effect refusal unless a bound operator decision " +
    `(workflow_reconcile) settles it; ${bound} bound decision(s) recorded here.`
  );
}

function shadowNote(consultedLine: number): string {
  return (
    `Shadowed: a later node row at the same position (line ${consultedLine}) is the only one a resume consults, ` +
    "so nothing recorded here is replayed or refused."
  );
}

function decisionNote(decision: JournalEntryKind, index: number, target: ConsultedRow | undefined, binds: boolean): string {
  if (target === undefined) {
    return `Operator ${decision} for node position ${index}, where this journal records no node row: no resume consults it.`;
  }
  if (binds) {
    return `Operator ${decision} bound by digest to the node row at line ${target.line}: never a result, consulted only when a resume refuses that position.`;
  }
  return `Operator ${decision} that does not bind to the node row a resume consults at position ${index} (line ${target.line}; the digest differs), so that position refuses again.`;
}

interface ConsultedRow {
  readonly line: number;
  readonly digest: string;
}

interface Context {
  /** runtime.ts: any agent({ resume }) row declines agent replay for the whole journal. */
  readonly agentReplayDeclined: boolean;
  /** Node position to the row a resume consults there: the last one in file order. */
  readonly consulted: ReadonlyMap<number, ConsultedRow>;
  /** Node row line to the operator decisions in this file that bind to it by digest. */
  readonly bound: ReadonlyMap<number, number>;
}

function classifyEntry(line: number, parsed: KeptLine, context: Context): ReadJournalLine {
  const { entry } = parsed;
  const shape = (
    cls: ReadJournalLine["class"],
    replay: ReadJournalLine["replay"],
    note: string,
    extra: { refusal?: "uncertain-effect"; boundDecisions?: number; bindsToLine?: number } = {},
  ): ReadJournalLine => ({
    line,
    class: cls,
    replay,
    // Derived, never asserted: only a conditional replay can ever hand an answer back.
    replayEligible: replay === "replay-conditional-on-basis",
    entryKind: entry.kind ?? "agent",
    index: entry.index,
    basis: entry.basis ?? null,
    capabilityId: entry.capabilityId ?? null,
    effectClass: entry.effectClass ?? null,
    refusal: extra.refusal ?? null,
    boundDecisions: extra.boundDecisions ?? 0,
    bindsToLine: extra.bindsToLine ?? null,
    ignoredFields: parsed.ignoredFields,
    foreignSchemaVersion: parsed.foreignSchemaVersion,
    note,
  });

  if (entry.kind === undefined) {
    // runtime.ts replayAt: `entry.basis !== hostBasis` ends the prefix, so an
    // entry with no basis matches only a host that records none.
    const cls = entry.basis === undefined ? "legacy-agent" : "basis-scoped-agent";
    if (context.agentReplayDeclined) return shape(cls, "live", NOTES.agentDeclined);
    if (!entry.ok) return shape(cls, "live", NOTES.agentFailed);
    return shape(cls, "replay-conditional-on-basis", entry.basis === undefined ? NOTES.legacyAgent : NOTES.scopedAgent);
  }

  if (entry.kind === "node") {
    const consulted = context.consulted.get(entry.index);
    if (consulted !== undefined && consulted.line !== line) {
      return shape(entry.effectClass === "read" ? "node-read" : "node-effectful", "shadowed", shadowNote(consulted.line));
    }
    // runtime.ts node admission: replay only a recorded read, under the same
    // basis (basis-on-every-entry, so a read without one is the legacy class),
    // with a payload to hand back; refuse any other recorded class whatever
    // the basis; keep the pre-policy "run live" for an entry with no class.
    if (entry.effectClass === "read") {
      if (entry.basis === undefined) return shape("node-read", "live", NOTES.readLegacy);
      if (!entry.ok) return shape("node-read", "live", NOTES.readFailed);
      if (entry.text === undefined) return shape("node-read", "live", NOTES.readEmpty);
      return shape("node-read", "replay-conditional-on-basis", NOTES.readScoped);
    }
    if (entry.effectClass === undefined) return shape("node-effectful", "live", NOTES.unvouched);
    const bound = context.bound.get(line) ?? 0;
    return shape(
      "node-effectful",
      "refuse-uncertain-effect",
      effectNote(entry.effectClass, entry.capabilityId ?? "", bound),
      { refusal: "uncertain-effect", boundDecisions: bound },
    );
  }

  // An operator decision row; parseEntry admits one only with a valid record.
  // It binds, as reconcile.ts admitReconcile binds it, by the digest of the
  // node row a resume consults at its position.
  const target = context.consulted.get(entry.index);
  const digest = entry.reconcile?.entry.entryDigest;
  const binds = target !== undefined && digest !== undefined && target.digest === digest;
  return shape(
    "operator-decision",
    "decision",
    decisionNote(entry.kind, entry.index, target, binds),
    binds ? { bindsToLine: target.line } : {},
  );
}

function dropped(line: number, parsed: RefusedLine): DroppedJournalLine {
  return {
    line,
    class: "unsupported",
    replay: "dropped",
    replayEligible: false,
    reason: parsed.reason,
    field: parsed.field,
    detail: parsed.detail,
    note: `Dropped by this build's journal reader: ${parsed.detail}. A resume never sees this line.`,
  };
}

/* ------------------------------------------------------------------------- *
 * The file
 * ------------------------------------------------------------------------- */

/**
 * Classify a journal's raw text, line by line, without reading or writing
 * anything. Never throws: text that is not a journal at all is a report full
 * of unsupported lines, which is the honest answer.
 */
export function classifyJournal(raw: string): JournalCompatReport {
  // readJournal splits on "\n" and so does this. A final newline terminates
  // the last line rather than starting another; without one, the last
  // segment is a line whose append may never have finished.
  const segments = raw.split("\n");
  const terminated = segments[segments.length - 1] === "";
  if (terminated) segments.pop();

  const blankLines: number[] = [];
  const slots: { readonly line: number; readonly parsed: Parsed }[] = [];
  for (const [offset, segment] of segments.entries()) {
    const line = offset + 1;
    // The reader's own blank test: a whitespace-only line records nothing.
    if (segment.trim() === "") {
      blankLines.push(line);
      continue;
    }
    slots.push({ line, parsed: parseLine(segment, !terminated && offset === segments.length - 1) });
  }

  const keptLines = slots.flatMap(({ line, parsed }) => (parsed.kept ? [{ line, entry: parsed.entry }] : []));
  // runtime.ts keys node rows by position in a Map, and readJournal's sort is
  // stable, so the last node row at a position is the only one consulted.
  const consulted = new Map<number, ConsultedRow>();
  for (const { line, entry } of keptLines) {
    if (entry.kind === "node") consulted.set(entry.index, { line, digest: entryDigestOf(entry) });
  }
  const bound = new Map<number, number>();
  for (const { entry } of keptLines) {
    const digest = entry.reconcile?.entry.entryDigest;
    const target = consulted.get(entry.index);
    if (digest !== undefined && target !== undefined && target.digest === digest) {
      bound.set(target.line, (bound.get(target.line) ?? 0) + 1);
    }
  }
  const context: Context = {
    agentReplayDeclined: keptLines.some(({ entry }) => entry.kind === undefined && entry.resumed === true),
    consulted,
    bound,
  };

  const lines: ClassifiedJournalLine[] = slots.map(({ line, parsed }) =>
    parsed.kept ? classifyEntry(line, parsed, context) : dropped(line, parsed),
  );
  const read = lines.filter((line): line is ReadJournalLine => line.class !== "unsupported");

  const counts: Record<JournalLineClass, number> = {
    "legacy-agent": 0,
    "basis-scoped-agent": 0,
    "node-read": 0,
    "node-effectful": 0,
    "operator-decision": 0,
    unsupported: 0,
  };
  for (const line of lines) counts[line.class] += 1;

  const unsupported: JournalUnsupportedLine[] = lines.flatMap((line) =>
    line.class === "unsupported" ? [{ line: line.line, reason: line.reason, field: line.field, detail: line.detail }] : [],
  );

  // Strict equality, as admission compares: null (no basis) and "" are different cohorts.
  const byBasis = new Map<string | null, { basis: string | null; lines: number[]; agents: number; nodes: number }>();
  for (const line of read) {
    if (line.entryKind !== "agent" && line.entryKind !== "node") continue;
    let cohort = byBasis.get(line.basis);
    if (cohort === undefined) {
      cohort = { basis: line.basis, lines: [], agents: 0, nodes: 0 };
      byBasis.set(line.basis, cohort);
    }
    cohort.lines.push(line.line);
    if (line.entryKind === "agent") cohort.agents += 1;
    else cohort.nodes += 1;
  }
  const cohorts: JournalBasisCohort[] = [...byBasis.values()];

  const foreign = read.filter((line) => line.foreignSchemaVersion !== null);
  const warnings: string[] = [];
  if (unsupported.length > 0) {
    const named = unsupported.map(
      (row) =>
        `line ${row.line} ${row.reason}${row.reason === "invalid-field" && row.field !== null ? ` (${row.field})` : ""}`,
    );
    warnings.push(
      `${JOURNAL_UNSUPPORTED_WARNING}: ${unsupported.length} of ${lines.length} line(s) are dropped by this build's journal reader (${listed(named)}); ` +
        "a resume never sees them, so nothing they record is replayed or refused, and a dropped effect row no longer stops a resume at its position.",
    );
  }
  if (foreign.length > 0) {
    const named = foreign.map((line) => `line ${line.line} declares schemaVersion ${JSON.stringify(line.foreignSchemaVersion)}`);
    warnings.push(
      `${JOURNAL_UNSUPPORTED_WARNING}: ${listed(named)}, but this build runs ${JSON.stringify(WORKFLOW_SCRIPT_SCHEMA_VERSION)} scripts ` +
        "and its reader takes such a line as one of its own without checking.",
    );
  }
  const shadowed = read.filter((line) => line.replay === "shadowed");
  if (shadowed.length > 0) {
    warnings.push(
      `${JOURNAL_DUPLICATE_POSITION_WARNING}: ${listed(shadowed.map((line) => `position ${line.index} (line ${line.line})`))} recorded again later in the file; ` +
        "a resume consults only the last row at each node position, so an effect recorded on an earlier row no longer stops it.",
    );
  }
  const refusing = read.filter((line) => line.replay === "refuse-uncertain-effect");
  if (refusing.length > 0) {
    const named = refusing.map(
      (line) => `position ${line.index} (line ${line.line}, ${quoted(line.capabilityId ?? "")} ${quoted(line.effectClass ?? "")})`,
    );
    warnings.push(
      `${JOURNAL_UNCERTAIN_EFFECT_WARNING}: ${listed(named)} record(s) an effect a resume never re-runs or replays; ` +
        "a resume that reaches one stops with a typed uncertain-effect refusal unless a bound operator decision settles it.",
    );
  }
  const unvouched = read.filter((line) => line.class === "node-effectful" && line.replay === "live");
  if (unvouched.length > 0) {
    const named = unvouched.map((line) => `position ${line.index} (line ${line.line}, ${quoted(line.capabilityId ?? "")})`);
    warnings.push(
      `${JOURNAL_UNVOUCHED_NODE_WARNING}: ${listed(named)} carry no effect class; a resume re-runs each live, repeating any effect it performed.`,
    );
  }
  if (cohorts.length > 1) {
    const named = cohorts.map(
      (cohort) => `${cohort.basis === null ? "none" : quoted(cohort.basis)} on ${cohort.lines.length} line(s)`,
    );
    warnings.push(
      `${JOURNAL_MIXED_BASIS_WARNING}: entries were recorded under ${cohorts.length} replay bases (${listed(named)}); ` +
        "a resume under any one host matches at most one of them, so agents and node reads of every other basis re-run live " +
        "(an effect row refuses whatever its basis).",
    );
  }
  const ignoring = read.filter((line) => line.ignoredFields.length > 0);
  if (ignoring.length > 0) {
    const named = ignoring.map(
      (line) => `line ${line.line} (${line.ignoredFields.map((name) => JSON.stringify(name)).join(", ")})`,
    );
    warnings.push(
      `${JOURNAL_IGNORED_FIELDS_WARNING}: ${listed(named)} carry field(s) this build does not read; they stay on disk but change nothing on resume.`,
    );
  }

  return {
    verdict: unsupported.length > 0 || foreign.length > 0 ? "unsupported" : "readable",
    warnings,
    physicalLines: segments.length,
    lines,
    blankLines,
    unsupported,
    counts,
    cohorts,
    mixedBasis: cohorts.length > 1,
  };
}
