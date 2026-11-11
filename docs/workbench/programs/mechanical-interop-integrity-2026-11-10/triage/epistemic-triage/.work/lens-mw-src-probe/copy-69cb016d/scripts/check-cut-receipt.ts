import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// MechanicalWorkflows-fwexf.1 (EAT-R116, EAT-R169, EAT-R040 validator half): the per-cut receipt grammar check.
// Source of the grammar: docs/programs/pi-workbench-interoperability-audit-2026-11-06/04-qa-feedback.md ("A receipt must contain ...").
// A receipt claims acceptance only through native evidence taken at the cut's own basis. This check judges one JSON record and
// refuses, by a closed set of names, a record that claims acceptance without it. It is an L0 validator: a clean verdict says the
// record is well formed and honest about its basis, never that the cut passed, and the CLI therefore never prints PASS.

export const CUT_RECEIPT_SCHEMA = "mw.cut-receipt.v1";
export const EVIDENCE_DIR = "qa/integration/evidence";

export type CutReceiptCode =
  | "CUT_RECEIPT_FIELD_MISSING"
  | "CUT_RECEIPT_GATE_UNSTATED"
  | "CUT_RECEIPT_NATIVE_REF_MISSING"
  | "CUT_RECEIPT_FIXTURE_AS_NATIVE"
  | "CUT_RECEIPT_HISTORICAL_ONLY";
export interface CutReceiptRefusal { readonly code: CutReceiptCode; readonly subject: string; readonly detail: string }
export interface CutReceiptVerdict { readonly ok: boolean; readonly refusals: readonly CutReceiptRefusal[] }
export interface CutReceiptCut { readonly cutSourceCommit?: string | undefined; readonly cutDeclaredUtc?: string | undefined }

type Obj = Record<string, unknown>;
const isObj = (value: unknown): value is Obj => typeof value === "object" && value !== null && !Array.isArray(value);
const isText = (value: unknown): value is string => typeof value === "string" && value.trim() !== "";
const UTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
const utcMs = (value: unknown): number | null => (isText(value) && UTC.test(value) && !Number.isNaN(Date.parse(value)) ? Date.parse(value) : null);
const PASS_LIKE = new Set(["pass", "passed", "verified_candidate"]);
const passLike = (value: unknown): boolean => typeof value === "string" && PASS_LIKE.has(value.trim().toLowerCase());
const ABSENT = "required grammar field is absent or blank";

// Grammar fields: [path, kind]. "text" is a non-blank string, "utc" a non-blank UTC timestamp, "list" a non-empty array, "array" any array.
const FIELDS: ReadonlyArray<readonly [string, "text" | "utc" | "list" | "array"]> = [
  ["cut.program", "text"], ["cut.requirement_ids", "list"], ["cut.source_commit", "text"], ["cut.declared_utc", "utc"],
  ["commits.mw", "text"],
  ["versions.node", "text"], ["versions.forge", "text"], ["versions.package", "text"],
  ["environment.commands", "list"], ["scope.files", "list"],
  ["git.base", "text"], ["git.commit", "text"], ["git.tree", "text"],
  ["digests.source", "text"],
  ["status.domain", "text"], ["status.transport", "text"],
  ["native_refs", "array"], ["negative_controls", "array"], ["deviations", "array"], ["unknowns", "array"], ["simulated", "array"],
];

function at(record: Obj, path: string): unknown {
  let node: unknown = record;
  for (const key of path.split(".")) { if (!isObj(node)) return undefined; node = node[key]; }
  return node;
}

export function judgeCutReceipt(record: unknown, cut: CutReceiptCut = {}): CutReceiptVerdict {
  const refusals: CutReceiptRefusal[] = [];
  const refuse = (code: CutReceiptCode, subject: string, detail: string): void => { refusals.push({ code, subject, detail }); };
  if (!isObj(record)) {
    refuse("CUT_RECEIPT_FIELD_MISSING", "(record)", "the receipt record is not a JSON object");
    return { ok: false, refusals };
  }
  if (record.schema !== CUT_RECEIPT_SCHEMA) {
    if (!isText(record.schema)) refuse("CUT_RECEIPT_FIELD_MISSING", "schema", `${ABSENT}; it must equal "${CUT_RECEIPT_SCHEMA}"`);
    else refuse("CUT_RECEIPT_FIELD_MISSING", "schema", `schema must equal "${CUT_RECEIPT_SCHEMA}", found "${record.schema}"`);
  }
  for (const [path, kind] of FIELDS) {
    const value = at(record, path);
    if (kind === "text" && !isText(value)) refuse("CUT_RECEIPT_FIELD_MISSING", path, ABSENT);
    else if (kind === "utc" && utcMs(value) === null) refuse("CUT_RECEIPT_FIELD_MISSING", path, `${ABSENT}, or not a YYYY-MM-DDTHH:MM:SSZ UTC timestamp`);
    else if (kind === "list" && !(Array.isArray(value) && value.length > 0 && value.every(isText))) refuse("CUT_RECEIPT_FIELD_MISSING", path, `${ABSENT}; it needs a non-empty list of non-blank strings`);
    else if (kind === "array" && !Array.isArray(value)) refuse("CUT_RECEIPT_FIELD_MISSING", path, `${ABSENT}; it needs a list (an empty list states that nothing exists)`);
  }
  const status = isObj(record.status) ? record.status : {};
  const gate = status.gate;
  if (gate === undefined || (typeof gate === "string" && gate.trim() === "") || gate === null) refuse("CUT_RECEIPT_FIELD_MISSING", "status.gate", ABSENT);

  const refs: Obj[] = [];
  if (Array.isArray(record.native_refs)) {
    record.native_refs.forEach((ref: unknown, index) => {
      if (!isObj(ref)) { refuse("CUT_RECEIPT_FIELD_MISSING", `native_refs[${index}]`, "native ref is not an object {system, kind, id, observed_utc}"); return; }
      for (const key of ["system", "kind", "id"]) if (!isText(ref[key])) refuse("CUT_RECEIPT_FIELD_MISSING", `native_refs[${index}].${key}`, ABSENT);
      if (utcMs(ref.observed_utc) === null) refuse("CUT_RECEIPT_FIELD_MISSING", `native_refs[${index}].observed_utc`, `${ABSENT}, or not a YYYY-MM-DDTHH:MM:SSZ UTC timestamp`);
      refs.push(ref);
    });
  }
  const simulated = Array.isArray(record.simulated) ? record.simulated.filter(isText).map(entry => entry.trim()) : [];
  const stripExt = (name: string): string => basename(name, extname(name));
  const isSimulated = (id: unknown): boolean => isText(id) && simulated.some(entry => entry === id.trim() || stripExt(entry) === id.trim());

  // CUT_RECEIPT_GATE_UNSTATED: the gate is the literal "not-run" or a native forge operation reference carrying its verdict.
  const gateObj = isObj(gate) ? gate : null;
  const gateStated = gate === "not-run"
    || (gateObj !== null && String(gateObj.system).toLowerCase() === "forge" && gateObj.kind === "operation" && isText(gateObj.id) && isText(gateObj.verdict));
  if (gate !== undefined && gate !== null && !(typeof gate === "string" && gate.trim() === "") && !gateStated) {
    refuse("CUT_RECEIPT_GATE_UNSTATED", "status.gate", `the gate is neither the literal "not-run" nor a native {system: "forge", kind: "operation", id, verdict}; found ${JSON.stringify(gate)}`);
  }

  // CUT_RECEIPT_FIXTURE_AS_NATIVE: a fixture or simulation artifact never stands in for a native reference.
  refs.forEach((ref, index) => {
    if (typeof ref.system === "string" && ref.system.trim().toLowerCase() === "fixture") refuse("CUT_RECEIPT_FIXTURE_AS_NATIVE", `native_refs[${index}]`, `native ref names system "fixture"; a fixture is not a native reference`);
    else if (isSimulated(ref.id)) refuse("CUT_RECEIPT_FIXTURE_AS_NATIVE", `native_refs[${index}]`, `native ref id "${String(ref.id)}" is listed in simulated[]; a simulated artifact is not a native reference`);
  });
  for (const leg of ["domain", "transport"]) {
    const value = status[leg];
    if (isText(value) && simulated.includes(value.trim())) refuse("CUT_RECEIPT_FIXTURE_AS_NATIVE", `status.${leg}`, `status.${leg} points at "${value.trim()}", a path listed in simulated[]`);
  }
  if (typeof gate === "string" && isText(gate) && simulated.includes(gate.trim())) refuse("CUT_RECEIPT_FIXTURE_AS_NATIVE", "status.gate", `status.gate points at "${gate.trim()}", a path listed in simulated[]`);
  if (gateObj !== null && (String(gateObj.system).toLowerCase() === "fixture" || isSimulated(gateObj.id))) {
    refuse("CUT_RECEIPT_FIXTURE_AS_NATIVE", "status.gate", `status.gate names a fixture system or a simulated id (${JSON.stringify(gateObj.id)})`);
  }

  // CUT_RECEIPT_NATIVE_REF_MISSING: a PASS or verified_candidate assertion needs a forge operation in native_refs, and the gate's own operation must be there.
  const forgeOps = refs.filter(ref => String(ref.system).toLowerCase() === "forge" && ref.kind === "operation" && isText(ref.id)).map(ref => String(ref.id).trim());
  const domainClaims = passLike(status.domain);
  const gateClaims = gateStated && gateObj !== null && passLike(gateObj.verdict);
  if ((domainClaims || gateClaims) && forgeOps.length === 0) {
    refuse("CUT_RECEIPT_NATIVE_REF_MISSING", domainClaims ? "status.domain" : "status.gate.verdict", `status asserts ${JSON.stringify(domainClaims ? status.domain : gateObj?.verdict)} while native_refs holds no forge operation id`);
  }
  if (gateStated && gateObj !== null && !forgeOps.includes(String(gateObj.id).trim())) {
    refuse("CUT_RECEIPT_NATIVE_REF_MISSING", "status.gate.id", `gate operation id "${String(gateObj.id)}" is absent from native_refs`);
  }

  // CUT_RECEIPT_HISTORICAL_ONLY: evidence older than the cut, or taken at a different commit, cannot close this cut.
  const declared = utcMs(cut.cutDeclaredUtc) ?? utcMs(at(record, "cut.declared_utc"));
  const source = isText(cut.cutSourceCommit) ? cut.cutSourceCommit.trim() : isText(at(record, "cut.source_commit")) ? String(at(record, "cut.source_commit")).trim() : null;
  if (declared !== null && refs.length > 0 && !refs.some(ref => { const ms = utcMs(ref.observed_utc); return ms !== null && ms >= declared; })) {
    refuse("CUT_RECEIPT_HISTORICAL_ONLY", "native_refs", `every native ref observed_utc predates cut.declared_utc ${new Date(declared).toISOString().replace(".000Z", "Z")}; historical receipts cannot close a new cut`);
  }
  const commit = at(record, "git.commit");
  if ((domainClaims || gateClaims) && source !== null && isText(commit) && commit.trim() !== source) {
    refuse("CUT_RECEIPT_HISTORICAL_ONLY", "git.commit", `git.commit ${commit.trim()} differs from cut.source_commit ${source} while status claims acceptance`);
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
  const judged: Array<{ file: string; verdict: CutReceiptVerdict }> = [];
  const explicit = files.length > 0;
  const evidence = resolve(root, EVIDENCE_DIR);
  const candidates = explicit ? files : existsSync(evidence) ? readdirSync(evidence).filter(name => name.endsWith(".json")).sort().map(name => `${EVIDENCE_DIR}/${name}`) : [];
  for (const file of candidates) {
    let record: unknown;
    try { record = JSON.parse(readFileSync(resolve(root, file), "utf8")); } catch (error) {
      if (!explicit) continue;
      const unreadable = error instanceof Error && "code" in error;
      judged.push({ file, verdict: { ok: false, refusals: [{ code: "CUT_RECEIPT_FIELD_MISSING", subject: "(record)", detail: unreadable ? "the file is unreadable" : "the file is not valid JSON" }] } });
      continue;
    }
    if (!explicit && !(isObj(record) && record.schema === CUT_RECEIPT_SCHEMA)) continue;
    judged.push({ file, verdict: judgeCutReceipt(record) });
  }
  if (judged.length === 0) { console.log("no cut receipts"); return 0; }
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
