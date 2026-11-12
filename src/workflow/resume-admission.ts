/**
 * resume-admission.ts — what SubagentWorkflow checks about a resume's SOURCE journal before anything of the resumed
 * run exists (wb-q0on; program pi-system-dx-triage-2026-11-11, EAT-R357, EAT-R359, EAT-R360). Each check refuses
 * typed, with a ResumeRefusalCode, before the new run's script is persisted, its task created or its worker started;
 * nothing here dispatches anything.
 *
 *  - admitResumeJournal (EAT-R360, EAT-R357): the raw source bytes go through the landed compatibility classifier
 *    (journal-compat.ts) first. A journal this build cannot read whole is refused with the classifier's verdict and
 *    its bounded warnings: a line the reader would drop silently could be the very effect row a resume has to stop
 *    on. A torn final line alone is admitted, as it always was: a row whose append never finished leaves nothing that
 *    ran unrecorded, because a non-read call's marker is written, and read back, before its provider is called. A run
 *    recovered from disk after a restart is refused while its journal holds a dispatched marker no settled row and no
 *    bound operator decision answers: whether that call took effect is unknown, so nothing new is dispatched until an
 *    operator reconciles the position.
 *  - spendOverridesAtResume (EAT-R359): every live operator override in the source journal is spent by appending its
 *    consumed copy and reading that row back; a spend that does not persist refuses the resume, so one authorization
 *    can never re-run an effect twice because its spend was lost.
 *  - journalAppender (EAT-R358): the journal seam a run is handed; a non-read node's dispatched marker is read back
 *    before the runtime may dispatch the call it records.
 */

import { closeSync, fstatSync, openSync, readFileSync, readSync } from "node:fs";
import { sanitizeWorkbenchText } from "../workbench/redaction.js";
import { appendJournal, readJournal, type WorkflowJournalEntry } from "./journal.js";
import { classifyJournal, type JournalCompatReport } from "./journal-compat.js";
import { consumeOverridesAtResume, entryDigestOf, indexReconciliations } from "./reconcile.js";
import type { ResumeRefusalCode } from "./task.js";

/** The bound of a refusal's quoted warnings. */
const WARNINGS_LIMIT = 1_200;

export type ResumeAdmission =
  | { readonly ok: true; readonly entries: WorkflowJournalEntry[]; readonly report: JournalCompatReport }
  | { readonly ok: false; readonly code: ResumeRefusalCode; readonly message: string };

/**
 * Whether the file at `path` ends with exactly `line`, read back from disk. Never throws: a file that cannot be
 * opened or read answers false.
 */
export function journalEndsWith(path: string, line: string): boolean {
  const expected = Buffer.from(line, "utf-8");
  let fd: number | undefined;
  try {
    fd = openSync(path, "r");
    const size = fstatSync(fd).size;
    if (size < expected.length) return false;
    const tail = Buffer.alloc(expected.length);
    if (readSync(fd, tail, 0, expected.length, size - expected.length) !== expected.length) return false;
    return tail.equals(expected);
  } catch {
    return false;
  } finally {
    if (fd !== undefined) {
      try {
        closeSync(fd);
      } catch {
        // A read-only descriptor that fails to close loses no row; the answer above stands.
      }
    }
  }
}

/**
 * The journal seam a run is handed (src/index.ts): every row is appended as appendJournal does, and a non-read node's
 * dispatched marker is also read back, so the runtime dispatches only once the marker is on disk as written (EAT-R358);
 * a marker the read-back does not find reports false, which refuses the call fail-closed (runtime.ts).
 */
export function journalAppender(path: string): (entry: WorkflowJournalEntry) => boolean {
  return entry => {
    if (!appendJournal(path, entry)) return false;
    return entry.dispatched !== true || journalEndsWith(path, `${JSON.stringify(entry)}\n`);
  };
}

/** The raw text at `path`; a journal that was never written (a run that recorded nothing) reads as empty. */
function rawJournal(path: string): string {
  try {
    return readFileSync(path, "utf-8");
  } catch {
    return "";
  }
}

/**
 * Admit a resume's source journal, or refuse it typed (see the module header). `recovered` marks a run resolved from
 * disk rather than from this process's own record of it.
 */
export function admitResumeJournal(journalPath: string, options: { readonly runId: string; readonly recovered: boolean }): ResumeAdmission {
  const report = classifyJournal(rawJournal(journalPath));
  const blocking = report.unsupported.filter(row => row.reason !== "truncated-final-line");
  const foreign = report.lines.some(line => line.class !== "unsupported" && line.foreignSchemaVersion !== null);
  if (blocking.length > 0 || foreign) {
    const warnings = sanitizeWorkbenchText(report.warnings.join(" "), WARNINGS_LIMIT, "text");
    return {
      ok: false,
      code: "journal-unsupported",
      message: `Resume refused (journal-unsupported): the journal of "${options.runId}" has compatibility verdict unsupported. ${warnings} Nothing was dispatched; a line this build drops could be the effect row a resume has to stop on.`,
    };
  }
  const entries = readJournal(journalPath);
  if (options.recovered) {
    const unsettled = unsettledDispatches(entries);
    if (unsettled.length > 0) {
      const named = unsettled.map(row => `position ${row.index} (${sanitizeWorkbenchText(row.capabilityId ?? "unknown", 120, "label")})`).join(", ");
      return {
        ok: false,
        code: "recovered-unsettled",
        message: `Resume refused (recovered-unsettled): "${options.runId}" was recovered from disk after a restart, and its journal holds a call dispatched with no settled record at ${named}, so whether it took effect is unknown. Nothing was dispatched. Inspect the position with workflow_reconcile {taskId:"${options.runId}", action:"inspect"} and record an acknowledgement or override before resuming; a fresh run without resumeFromRunId would dispatch that call again, so start one only once the producer's evidence shows it did not take effect.`,
      };
    }
  }
  return { ok: true, entries, report };
}

/** Node positions whose last row is a dispatched marker that no operator decision bound to it answers. */
export function unsettledDispatches(entries: readonly WorkflowJournalEntry[]): WorkflowJournalEntry[] {
  const last = new Map<number, WorkflowJournalEntry>();
  for (const entry of entries) if (entry.kind === "node") last.set(entry.index, entry);
  const decisions = indexReconciliations(entries);
  return [...last.values()].filter(row => {
    if (row.dispatched !== true) return false;
    const bucket = decisions.get(row.index);
    if (bucket === undefined) return true;
    const digest = entryDigestOf(row);
    return ![...bucket.acks, ...bucket.overrides].some(decision => decision.reconcile.entry.entryDigest === digest);
  });
}

/**
 * Spend every live override in the SOURCE journal before anything runs (EAT-R359): each consumed copy is appended and
 * read back. The runtime receives the entries as read before the spend, so it may re-run once; any later resume finds
 * the authorization spent. A copy that does not persist refuses the resume, typed spend-not-persisted.
 */
export function spendOverridesAtResume(
  journalPath: string,
  entries: readonly WorkflowJournalEntry[],
  mark: { readonly byRunId: string; readonly at: string },
): { readonly ok: true; readonly spent: number } | { readonly ok: false; readonly code: "spend-not-persisted"; readonly message: string } {
  const copies = consumeOverridesAtResume(entries, mark);
  for (const copy of copies) {
    if (!appendJournal(journalPath, copy) || !journalEndsWith(journalPath, `${JSON.stringify(copy)}\n`)) {
      return {
        ok: false,
        code: "spend-not-persisted",
        message: `Resume refused (spend-not-persisted): the operator override at position ${copy.index} could not be recorded as spent in the source journal, and an override re-runs an effect only once its spend is on disk. Nothing was dispatched. Make the journal writable, then resume again.`,
      };
    }
  }
  return { ok: true, spent: copies.length };
}
