import { existsSync, readdirSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// MechanicalWorkflows-eor0c.2 (EAT-R056, EAT-R057 receipt half): the MW-R4 preflight-record validator.
// The preflight record lists the eight prerequisites of the MW-R4 joint run. Each row carries either a receipt (a reference plus the
// UTC instant it was observed) or the exact words "not landed" / "not run". This check judges one JSON record and refuses, by a closed
// set of names, a record that claims more than its receipts hold. It is an L0 validator: a clean verdict says the record is well formed
// and honest, never that MW-R4 may run, and the CLI therefore never prints PASS.

export const R4_PREFLIGHT_SCHEMA = "mw.r4-preflight.v1";
export const EVIDENCE_DIR = "qa/integration/evidence";
export const R4_PREFLIGHT_ROWS = [
  "mw_r0_packed_artifact_confirm_gate",
  "mw_r1_installed_facade",
  "mw_r2_callback_wiring",
  "mw_r3_abort_effect_identity",
  "pi_function_dispatch",
  "pi_worktree_preservation_repair",
  "pi_detached_grants_repair",
  "environment_capabilities",
] as const;

export type R4PreflightCode =
  | "R4_PREFLIGHT_FIELD_MISSING"
  | "R4_PREFLIGHT_ROW_MISSING"
  | "R4_PREFLIGHT_ROW_STATUS_UNSTATED"
  | "R4_PREFLIGHT_MEASURED_WITHOUT_RECEIPT"
  | "R4_PREFLIGHT_RUN_MARKER_UNEARNED";
export interface R4PreflightRefusal { readonly code: R4PreflightCode; readonly subject: string; readonly detail: string }
export interface R4PreflightVerdict { readonly ok: boolean; readonly refusals: readonly R4PreflightRefusal[] }

type Obj = Record<string, unknown>;
const isObj = (value: unknown): value is Obj => typeof value === "object" && value !== null && !Array.isArray(value);
const isText = (value: unknown): value is string => typeof value === "string" && value.trim() !== "";
const UTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
const isUtc = (value: unknown): boolean => isText(value) && UTC.test(value) && !Number.isNaN(Date.parse(value));
const ABSENT = "required grammar field is absent or blank";
const NO_RECEIPT_STATUSES: readonly string[] = ["not landed", "not run"];
const WORKTREE_ROW = "pi_worktree_preservation_repair";
const GRANTS_ROW = "pi_detached_grants_repair";

function at(record: Obj, path: string): unknown {
  let node: unknown = record;
  for (const key of path.split(".")) { if (!isObj(node)) return undefined; node = node[key]; }
  return node;
}

function rowOf(record: Obj, key: string): Obj | null {
  const rows = record.rows;
  return isObj(rows) && isObj(rows[key]) ? rows[key] : null;
}

// A row holds a receipt only when its status is exactly "receipt" and the receipt carries a non-blank reference and a UTC instant.
function receipted(record: Obj, key: string): boolean {
  const row = rowOf(record, key);
  if (row === null || row.status !== "receipt" || !isObj(row.receipt)) return false;
  return isText(row.receipt.ref) && isUtc(row.receipt.observed_utc);
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (isObj(value)) return Object.values(value).flatMap(strings);
  return [];
}

// The refused phrase is matched as a whole word so a longer word never trips it.
const REFUSED_PHRASE = /\bmeasured\b/i;

// The EAT-R054 ruling is recorded, never inferred: only the exact value below frees the worktree row, and a detached transport is the default.
function requiredRows(record: Obj): string[] {
  const worktreeOptional = at(record, "rulings.eat_r054") === "shared_invariant_not_prerequisite";
  const detachedOptional = at(record, "transport.detached") === false;
  return R4_PREFLIGHT_ROWS.filter(key => !(key === WORKTREE_ROW && worktreeOptional) && !(key === GRANTS_ROW && detachedOptional));
}

export function judgeR4Preflight(record: unknown): R4PreflightVerdict {
  const refusals: R4PreflightRefusal[] = [];
  const refuse = (code: R4PreflightCode, subject: string, detail: string): void => { refusals.push({ code, subject, detail }); };
  if (!isObj(record)) {
    refuse("R4_PREFLIGHT_FIELD_MISSING", "(record)", "the preflight record is not a JSON object");
    return { ok: false, refusals };
  }
  if (record.schema !== R4_PREFLIGHT_SCHEMA) {
    refuse("R4_PREFLIGHT_FIELD_MISSING", "schema", isText(record.schema) ? `schema must equal "${R4_PREFLIGHT_SCHEMA}", found "${record.schema}"` : `${ABSENT}; it must equal "${R4_PREFLIGHT_SCHEMA}"`);
  }
  for (const path of ["program", "pins.mw", "pins.pi"]) if (!isText(at(record, path))) refuse("R4_PREFLIGHT_FIELD_MISSING", path, ABSENT);
  if (!isUtc(record.declared_utc)) refuse("R4_PREFLIGHT_FIELD_MISSING", "declared_utc", `${ABSENT}, or not a YYYY-MM-DDTHH:MM:SSZ UTC timestamp`);
  if (!isObj(record.rows)) {
    refuse("R4_PREFLIGHT_FIELD_MISSING", "rows", `${ABSENT}; it needs an object keyed by the eight prerequisite names`);
    return { ok: false, refusals };
  }

  const known: readonly string[] = R4_PREFLIGHT_ROWS;
  for (const key of R4_PREFLIGHT_ROWS) {
    if (!isObj(record.rows[key])) refuse("R4_PREFLIGHT_ROW_MISSING", key, "the prerequisite row is absent or not an object");
  }
  for (const key of Object.keys(record.rows)) {
    if (!known.includes(key)) refuse("R4_PREFLIGHT_ROW_MISSING", key, "the row is not one of the eight closed prerequisite names");
  }

  for (const key of R4_PREFLIGHT_ROWS) {
    const row = rowOf(record, key);
    if (row === null) continue;
    const status = row.status;
    if (status === "receipt") {
      if (!receipted(record, key)) refuse("R4_PREFLIGHT_ROW_STATUS_UNSTATED", key, 'status "receipt" needs receipt.ref (non-blank) and receipt.observed_utc (UTC timestamp)');
    } else if (!(typeof status === "string" && NO_RECEIPT_STATUSES.includes(status))) {
      refuse("R4_PREFLIGHT_ROW_STATUS_UNSTATED", key, `status must be exactly "receipt", "not landed" or "not run"; found ${JSON.stringify(status)}`);
    }
    if (!receipted(record, key) && strings(row).some(text => REFUSED_PHRASE.test(text))) {
      refuse("R4_PREFLIGHT_MEASURED_WITHOUT_RECEIPT", key, "a row without a receipt uses the refused measurement word; give it a receipt or state the row as not landed or not run");
    }
  }

  const marker = isObj(record.joint_run) && record.joint_run.marker === true;
  if (marker) {
    for (const key of requiredRows(record).filter(key => !receipted(record, key))) {
      refuse("R4_PREFLIGHT_RUN_MARKER_UNEARNED", key, "joint_run.marker is true while this required row holds no receipt");
    }
  }
  return { ok: refusals.length === 0, refusals };
}

function main(argv: readonly string[]): number {
  let root = resolve(fileURLToPath(import.meta.url), "..", "..");
  const files: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--root") root = resolve(argv[++i] ?? ".");
    else files.push(argv[i]!);
  }
  const label = (file: string): string => relative(root, resolve(root, file)).replace(/\\/g, "/");
  const judged: Array<{ file: string; verdict: R4PreflightVerdict }> = [];
  const explicit = files.length > 0;
  const evidence = resolve(root, EVIDENCE_DIR);
  const candidates = explicit ? files : existsSync(evidence) ? readdirSync(evidence).filter(name => name.endsWith(".json")).sort().map(name => `${EVIDENCE_DIR}/${name}`) : [];
  for (const file of candidates) {
    let record: unknown;
    try { record = JSON.parse(readFileSync(resolve(root, file), "utf8")); } catch (error) {
      if (!explicit) continue;
      const unreadable = error instanceof Error && "code" in error;
      judged.push({ file, verdict: { ok: false, refusals: [{ code: "R4_PREFLIGHT_FIELD_MISSING", subject: "(record)", detail: unreadable ? "the file is unreadable" : "the file is not valid JSON" }] } });
      continue;
    }
    if (!explicit && !(isObj(record) && record.schema === R4_PREFLIGHT_SCHEMA)) continue;
    judged.push({ file, verdict: judgeR4Preflight(record) });
  }
  if (judged.length === 0) { console.log("no mw-r4 preflight records"); return 0; }
  let refused = 0;
  for (const { file, verdict } of judged) {
    if (verdict.ok) { console.log(`${label(file)}: no refusals`); continue; }
    refused++;
    console.log(`${label(file)}: refused (${verdict.refusals.length})`);
    for (const r of verdict.refusals) console.error(`${label(file)}: ${r.code}: ${r.subject} - ${r.detail}`);
  }
  return refused === 0 ? 0 : 2;
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main(process.argv.slice(2)));
