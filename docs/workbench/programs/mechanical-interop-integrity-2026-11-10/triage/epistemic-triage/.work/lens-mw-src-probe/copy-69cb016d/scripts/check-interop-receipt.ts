import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// MechanicalWorkflows-loexn.1 (EAT-R001, EAT-R035): the per-cut receipt validator of the Pi native interoperability program.
// Source of the grammar: docs/programs/pi-native-interoperability-2026-11-09/03-VERIFICATION-AND-RELEASE.md ("Required receipt template").
// A receipt claims a pass only through native evidence. This check judges one JSON record (the template field for field) and refuses,
// by a closed set of names, a record that claims more than its native ids and gate verdicts hold. It is an L1 validator: a clean verdict
// says the record is well formed and honest, never that the cut passed, and the CLI therefore never prints PASS.

export const INTEROP_RECEIPT_SCHEMA = "mw.pi-interop-receipt.v1";
export const PROGRAM_DIR = "qa/integration/pi-native-interoperability-2026-11-09";
export const NATIVE_VERDICTS: readonly string[] = ["PASS", "FAIL", "partial", "unknown", "not-run"];
const STATUSES: readonly string[] = ["pass", "fail", "blocked", "not-run"];
const TIERS: readonly string[] = ["L0", "L1", "L2", "L3", "L4", "L5", "L6"];
const DISPOSITIONS: readonly string[] = ["not-started", "started", "settled", "uncertain"];
const GATE_VERDICTS: readonly string[] = ["PASS", "FAIL", "partial", "unknown"];
const KINDS: readonly string[] = ["cut", "baseline"];
const NULLABLE: readonly string[] = ["candidate_source_commit", "candidate_source_tree", "forge_manifest_sha256", "descriptor_sha256", "mechanical_tarball_sha256", "pi_definition_digest"];
const NATIVE_IDS: readonly string[] = ["pi_invocation_id", "claude_session_id", "forge_operation_id"];
const ARRAYS: readonly string[] = ["commands", "negative_controls", "mutants"];
// An id is fixture-shaped when it names itself a stand-in, counts up through the hex alphabet, or repeats one character twelve times.
const FIXTURE_ID = /fixture|fake|mock|stub|example|placeholder|\btodo\b|\btbd\b|0123456789abcdef|(.)\1{11,}/i;
const SHA40 = /^[0-9a-f]{40}$/;

export type InteropReceiptCode =
  | "INTEROP_RECEIPT_FIELD_MISSING"
  | "INTEROP_RECEIPT_SHA_INVALID"
  | "INTEROP_RECEIPT_GATE_UNSTATED"
  | "INTEROP_RECEIPT_NATIVE_ID_FIXTURE"
  | "INTEROP_RECEIPT_NATIVE_ID_MISSING"
  | "INTEROP_RECEIPT_LIMITATIONS_MISSING"
  | "INTEROP_RECEIPT_BASELINE_INCOMPLETE"
  | "INTEROP_RECEIPT_ARCHIVE_EXISTS"
  | "INTEROP_RECEIPT_ARCHIVE_PATH"
  | "INTEROP_RECEIPT_ARCHIVE_MODIFIED";
export interface InteropReceiptRefusal { readonly code: InteropReceiptCode; readonly subject: string; readonly detail: string }
export interface InteropReceiptVerdict { readonly ok: boolean; readonly refusals: readonly InteropReceiptRefusal[] }
export interface InteropReceiptExpect { readonly headSha?: string | undefined }

type Obj = Record<string, unknown>;
const isObj = (value: unknown): value is Obj => typeof value === "object" && value !== null && !Array.isArray(value);
const isText = (value: unknown): value is string => typeof value === "string" && value.trim() !== "";
const isFixtureId = (value: string): boolean => value.trim() === "" || FIXTURE_ID.test(value);
const measuredText = (value: unknown): boolean => isText(value) && !/assumed/i.test(value);

export function judgeInteropReceipt(record: unknown, expect: InteropReceiptExpect = {}): InteropReceiptVerdict {
  const refusals: InteropReceiptRefusal[] = [];
  const refuse = (code: InteropReceiptCode, subject: string, detail: string): void => { refusals.push({ code, subject, detail }); };
  if (!isObj(record)) {
    refuse("INTEROP_RECEIPT_FIELD_MISSING", "(record)", "the receipt record is not a JSON object");
    return { ok: false, refusals };
  }
  if (record.schema !== INTEROP_RECEIPT_SCHEMA) {
    refuse("INTEROP_RECEIPT_FIELD_MISSING", "schema", isText(record.schema) ? `schema must equal "${INTEROP_RECEIPT_SCHEMA}", found "${record.schema}"` : `required field is absent or blank; it must equal "${INTEROP_RECEIPT_SCHEMA}"`);
  }
  if (typeof record.kind !== "string" || !KINDS.includes(record.kind)) refuse("INTEROP_RECEIPT_FIELD_MISSING", "kind", `kind must be one of ${KINDS.join(", ")}`);
  for (const field of ["program", "packet", "scope", "mechanical_outcome"]) if (!isText(record[field])) refuse("INTEROP_RECEIPT_FIELD_MISSING", field, "required field is absent or blank");
  const enums: ReadonlyArray<readonly [string, readonly string[]]> = [["status", STATUSES], ["evidence_tier", TIERS], ["effect_disposition", DISPOSITIONS]];
  for (const [field, allowed] of enums) {
    const value = record[field];
    if (typeof value !== "string" || !allowed.includes(value)) refuse("INTEROP_RECEIPT_FIELD_MISSING", field, `${field} must be one of ${allowed.join(", ")}`);
  }
  for (const field of NULLABLE) if (!(field in record) || (record[field] !== null && !isText(record[field]))) refuse("INTEROP_RECEIPT_FIELD_MISSING", field, "field must be present as a non-blank exact value or null");
  for (const field of ARRAYS) if (!Array.isArray(record[field])) refuse("INTEROP_RECEIPT_FIELD_MISSING", field, "field must be an array");
  const performance = record.performance;
  if (!isObj(performance) || typeof performance.measured !== "boolean" || !isText(performance.reason)) refuse("INTEROP_RECEIPT_FIELD_MISSING", "performance", "performance needs a boolean measured and a non-blank reason");

  for (const field of ["mechanical_sha", "pi_sha"]) {
    const value = record[field];
    if (typeof value !== "string" || !SHA40.test(value)) refuse("INTEROP_RECEIPT_SHA_INVALID", field, "the value must be a 40-character lowercase hexadecimal commit, not blank or assumed");
  }
  if (expect.headSha !== undefined && record.mechanical_sha !== expect.headSha && SHA40.test(String(record.mechanical_sha))) {
    refuse("INTEROP_RECEIPT_SHA_INVALID", "mechanical_sha", `the value differs from the implementing checkout head ${expect.headSha}`);
  }

  for (const field of NATIVE_IDS) {
    if (!(field in record)) { refuse("INTEROP_RECEIPT_FIELD_MISSING", field, "field must be present as an observed id or null"); continue; }
    const value = record[field];
    if (value === null) continue;
    if (typeof value !== "string") { refuse("INTEROP_RECEIPT_FIELD_MISSING", field, "field must be an observed id string or null"); continue; }
    if (isFixtureId(value)) refuse("INTEROP_RECEIPT_NATIVE_ID_FIXTURE", field, "the id is blank or fixture-shaped; record the observed native id or null");
  }

  const verdict = record.native_gate_verdict;
  if (typeof verdict !== "string" || !NATIVE_VERDICTS.includes(verdict)) {
    refuse("INTEROP_RECEIPT_GATE_UNSTATED", "native_gate_verdict", `native_gate_verdict must be one of ${NATIVE_VERDICTS.join(", ")}`);
  } else if (record.status === "pass" && verdict !== "PASS") {
    refuse("INTEROP_RECEIPT_GATE_UNSTATED", "native_gate_verdict", `status pass needs native_gate_verdict PASS, found ${verdict}`);
  }
  if (record.status === "pass" && record.forge_operation_id === null) refuse("INTEROP_RECEIPT_NATIVE_ID_MISSING", "forge_operation_id", "status pass needs the observed Forge operation id");

  const limitations = record.limitations;
  if (!Array.isArray(limitations) || limitations.length === 0 || !limitations.every(isText)) refuse("INTEROP_RECEIPT_LIMITATIONS_MISSING", "limitations", "limitations must list every unresolved unknown as a non-empty array of non-blank strings");

  if (record.kind === "baseline") judgeBaseline(record.baseline, refuse);
  return { ok: refusals.length === 0, refusals };
}

function judgeBaseline(value: unknown, refuse: (code: InteropReceiptCode, subject: string, detail: string) => void): void {
  if (!isObj(value)) { refuse("INTEROP_RECEIPT_BASELINE_INCOMPLETE", "baseline", "a baseline receipt needs a baseline object"); return; }
  if (!measuredText(value.node_version)) refuse("INTEROP_RECEIPT_BASELINE_INCOMPLETE", "baseline.node_version", "node_version must be the observed node --version output");
  if (!("sdk_version" in value) || (value.sdk_version !== null && !measuredText(value.sdk_version))) refuse("INTEROP_RECEIPT_BASELINE_INCOMPLETE", "baseline.sdk_version", "sdk_version must be the resolved version or null");
  if (!isText(value.sdk_resolution)) refuse("INTEROP_RECEIPT_BASELINE_INCOMPLETE", "baseline.sdk_resolution", "sdk_resolution must say how the SDK version was resolved or why it was not");
  const gates = value.gates;
  if (!Array.isArray(gates) || gates.length === 0) { refuse("INTEROP_RECEIPT_BASELINE_INCOMPLETE", "baseline.gates", "gates must list the root gate and each member gate"); return; }
  if (!gates.some(gate => isObj(gate) && gate.scope === "root")) refuse("INTEROP_RECEIPT_BASELINE_INCOMPLETE", "baseline.gates", "gates must include a row whose scope is root");
  gates.forEach((gate, index) => {
    const label = `baseline.gates[${index}]`;
    if (!isObj(gate)) { refuse("INTEROP_RECEIPT_BASELINE_INCOMPLETE", label, "the gate row is not an object"); return; }
    if (!isText(gate.scope)) refuse("INTEROP_RECEIPT_BASELINE_INCOMPLETE", `${label}.scope`, "scope must name root or the member path");
    if (!isText(gate.command_id)) refuse("INTEROP_RECEIPT_BASELINE_INCOMPLETE", `${label}.command_id`, "command_id must be the observed Forge command id");
    if (typeof gate.verdict !== "string" || !GATE_VERDICTS.includes(gate.verdict)) refuse("INTEROP_RECEIPT_BASELINE_INCOMPLETE", `${label}.verdict`, `verdict must be one of ${GATE_VERDICTS.join(", ")}`);
    if (typeof gate.operation_id !== "string" || isFixtureId(gate.operation_id)) refuse("INTEROP_RECEIPT_NATIVE_ID_FIXTURE", `${label}.operation_id`, "the operation id is absent, blank or fixture-shaped");
  });
}

const SEGMENT = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

// A receipt is written once under qa/integration/pi-native-interoperability-2026-11-09/<cut>/<file>.json and never rewritten.
export function writeInteropReceipt(root: string, cutDir: string, fileName: string, record: unknown, expect: InteropReceiptExpect = {}): string {
  if (!SEGMENT.test(cutDir) || !SEGMENT.test(fileName) || !fileName.endsWith(".json")) {
    throw new Error("INTEROP_RECEIPT_ARCHIVE_PATH: the cut directory and file name must each be one plain path segment and the file must end in .json");
  }
  const verdict = judgeInteropReceipt(record, expect);
  if (!verdict.ok) throw new Error(verdict.refusals.map(r => `${r.code}: ${r.subject} - ${r.detail}`).join("\n"));
  const dir = resolve(root, PROGRAM_DIR, cutDir);
  mkdirSync(dir, { recursive: true });
  const target = join(dir, fileName);
  try { writeFileSync(target, `${JSON.stringify(record, null, 2)}\n`, { flag: "wx" }); } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "EEXIST") throw new Error(`INTEROP_RECEIPT_ARCHIVE_EXISTS: ${relative(root, target)} is already archived and is never rewritten`);
    throw error;
  }
  return target;
}

function archivedBytes(root: string, base: string, path: string): string | null {
  try { return execFileSync("git", ["-C", root, "show", `${base}:${path}`], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }); } catch { return null; }
}

function main(argv: readonly string[]): number {
  let root = resolve(fileURLToPath(import.meta.url), "..", "..");
  let headSha: string | undefined;
  let base: string | undefined;
  const files: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--root") root = resolve(argv[++i] ?? ".");
    else if (argv[i] === "--expect-head") headSha = argv[++i];
    else if (argv[i] === "--base") base = argv[++i];
    else files.push(argv[i]!);
  }
  const label = (file: string): string => relative(root, resolve(root, file)).replace(/\\/g, "/");
  const explicit = files.length > 0;
  const program = resolve(root, PROGRAM_DIR);
  const found: string[] = [];
  if (!explicit && existsSync(program)) {
    for (const entry of readdirSync(program, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      for (const name of readdirSync(join(program, entry.name)).filter(n => n.endsWith(".json")).sort()) found.push(`${PROGRAM_DIR}/${entry.name}/${name}`);
    }
  }
  const judged: Array<{ file: string; verdict: InteropReceiptVerdict }> = [];
  for (const file of explicit ? files : found) {
    let text: string;
    let record: unknown;
    try { text = readFileSync(resolve(root, file), "utf8"); record = JSON.parse(text); } catch (error) {
      if (!explicit) continue;
      const unreadable = error instanceof Error && "code" in error;
      judged.push({ file, verdict: { ok: false, refusals: [{ code: "INTEROP_RECEIPT_FIELD_MISSING", subject: "(record)", detail: unreadable ? "the file is unreadable" : "the file is not valid JSON" }] } });
      continue;
    }
    if (!explicit && !(isObj(record) && record.schema === INTEROP_RECEIPT_SCHEMA)) continue;
    const verdict = judgeInteropReceipt(record, { headSha });
    const archived = base === undefined ? null : archivedBytes(root, base, label(file));
    const refusals = archived !== null && archived !== text ? [...verdict.refusals, { code: "INTEROP_RECEIPT_ARCHIVE_MODIFIED" as const, subject: label(file), detail: `the receipt differs from its archived bytes at ${base}` }] : verdict.refusals;
    judged.push({ file, verdict: { ok: refusals.length === 0, refusals } });
  }
  if (judged.length === 0) { console.log("no pi interop receipts"); return 0; }
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
