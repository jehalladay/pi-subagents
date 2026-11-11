import { existsSync, readdirSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { judgeCutReceipt } from "./check-cut-receipt.ts";

// MechanicalWorkflows-254je.2 (EAT-R011 L1, EAT-R003 L0 validator leg): the MW-R0 pack-confirm report linter.
// The report wraps one mw.cut-receipt.v1 record (judged by judgeCutReceipt, never rebuilt here) with the measured npm pack and the
// file-driven test result. The check refuses "completed-source" as a PASS receipt, requires commit, commands, packed digest, test
// counts and negative controls before the gate reads measured, keeps the gate pending while pack or tests have not run, refuses the
// fixture operation id literal as a native reference, and labels a fixture-driven run exactly R0_FIXTURE_TIER_LABEL. It is an
// L0/L1 validator: a clean verdict says the report is well formed and honest about its tier, never that MW-R0-PACK-CONFIRM passed,
// and the CLI therefore never prints PASS.

export const R0_CONFIRM_SCHEMA = "mw.r0-pack-confirm.v1";
export const R0_EVIDENCE_DIR = "qa/integration/evidence";
/** Fixture operation ids the descriptor-file test emits (apps/development-rig/test/entrypoint-descriptor-file.test.ts:26). They never name a native operation. */
export const R0_FIXTURE_IDS = ["op-file-driven"] as const;
export const R0_FIXTURE_TIER_LABEL = "L2 installed consumer / producer unverified";

export type R0ConfirmCode =
  | "R0_CONFIRM_FIELD_MISSING"
  | "R0_CONFIRM_RECEIPT_REFUSED"
  | "R0_CONFIRM_COMPLETED_SOURCE_NOT_PASS"
  | "R0_CONFIRM_FIXTURE_ID_AS_NATIVE"
  | "R0_CONFIRM_TIER_OVERCLAIM";
export interface R0ConfirmRefusal { readonly code: R0ConfirmCode; readonly subject: string; readonly detail: string }
export type R0ConfirmGate = "pending" | "measured" | "refused";
export interface R0ConfirmVerdict { readonly ok: boolean; readonly gate: R0ConfirmGate; readonly tier: string | null; readonly refusals: readonly R0ConfirmRefusal[] }

type Obj = Record<string, unknown>;
const isObj = (value: unknown): value is Obj => typeof value === "object" && value !== null && !Array.isArray(value);
const isText = (value: unknown): value is string => typeof value === "string" && value.trim() !== "";
const isCount = (value: unknown): value is number => typeof value === "number" && Number.isInteger(value) && value >= 0;
const SHA256 = /^sha256:[0-9a-f]{64}$/;
const PASS_LIKE = new Set(["pass", "passed", "verified_candidate"]);
const passLike = (value: unknown): boolean => typeof value === "string" && PASS_LIKE.has(value.trim().toLowerCase());
const COMPLETED_SOURCE = "completed-source";
const isCompletedSource = (value: unknown): boolean => typeof value === "string" && value.trim().toLowerCase() === COMPLETED_SOURCE;
const TIER_OVERCLAIM = /\bL[34]\b|\b(?:native|joint)\b/i;
const isFixtureId = (value: unknown): boolean => isText(value) && (R0_FIXTURE_IDS as readonly string[]).includes(value.trim());
const ABSENT = "required field is absent or blank";

export function judgeR0Confirm(record: unknown): R0ConfirmVerdict {
  const refusals: R0ConfirmRefusal[] = [];
  const refuse = (code: R0ConfirmCode, subject: string, detail: string): void => { refusals.push({ code, subject, detail }); };
  const missing = (subject: string, detail: string = ABSENT): void => refuse("R0_CONFIRM_FIELD_MISSING", subject, detail);
  if (!isObj(record)) {
    missing("(record)", "the report record is not a JSON object");
    return { ok: false, gate: "refused", tier: null, refusals };
  }
  if (record.schema !== R0_CONFIRM_SCHEMA) missing("schema", isText(record.schema) ? `schema must equal "${R0_CONFIRM_SCHEMA}", found "${record.schema}"` : `${ABSENT}; it must equal "${R0_CONFIRM_SCHEMA}"`);

  // The wrapped cut receipt: every grammar refusal is forwarded under its own CUT_RECEIPT_ code.
  const receipt = isObj(record.receipt) ? record.receipt : null;
  if (receipt === null) missing("receipt", `${ABSENT}; it needs a full mw.cut-receipt.v1 object`);
  else for (const r of judgeCutReceipt(receipt).refusals) refuse("R0_CONFIRM_RECEIPT_REFUSED", `receipt.${r.subject}`, `${r.code}: ${r.detail}`);

  // pack and tests: the literal "not-run" or a complete measurement object.
  const pack = record.pack === "not-run" ? "not-run" : isObj(record.pack) ? record.pack : null;
  if (pack === null) missing("pack", `${ABSENT}; it must be the literal "not-run" or {command, tarball_sha256, tarball_bytes, package_version}`);
  else if (pack !== "not-run") {
    if (!isText(pack.command)) missing("pack.command");
    if (typeof pack.tarball_sha256 !== "string" || !SHA256.test(pack.tarball_sha256)) missing("pack.tarball_sha256", `${ABSENT}, or not sha256:<64 hex>`);
    if (!(typeof pack.tarball_bytes === "number" && Number.isInteger(pack.tarball_bytes) && pack.tarball_bytes > 0)) missing("pack.tarball_bytes", `${ABSENT}, or not a positive integer`);
    if (!isText(pack.package_version)) missing("pack.package_version");
  }
  const tests = record.tests === "not-run" ? "not-run" : isObj(record.tests) ? record.tests : null;
  if (tests === null) missing("tests", `${ABSENT}; it must be the literal "not-run" or {command, declared, passed, failed, verdict, harness}`);
  else if (tests !== "not-run") {
    if (!isText(tests.command)) missing("tests.command");
    for (const key of ["declared", "passed", "failed"]) if (!isCount(tests[key])) missing(`tests.${key}`, `${ABSENT}, or not a non-negative integer`);
    if (tests.verdict !== "passed" && tests.verdict !== "failed") missing("tests.verdict", `${ABSENT}, or not "passed" or "failed"`);
    if (tests.harness !== "fixture" && tests.harness !== "native") missing("tests.harness", `${ABSENT}, or not "fixture" or "native"`);
  }

  const status = receipt !== null && isObj(receipt.status) ? receipt.status : {};
  const gateObj = isObj(status.gate) ? status.gate : null;
  const testsObj = tests !== null && tests !== "not-run" ? tests : null;
  const closure = isObj(record.closure) ? record.closure : {};

  // R0_CONFIRM_COMPLETED_SOURCE_NOT_PASS (EAT-R003): completed-source describes where the work stands, never a PASS receipt.
  const claimsPass = passLike(status.domain) || (gateObj !== null && passLike(gateObj.verdict)) || (testsObj !== null && testsObj.verdict === "passed");
  if (claimsPass) {
    const holders: Array<readonly [string, unknown]> = [["receipt.status.completion", status.completion], ...Object.entries(closure).map(([key, value]) => [`closure.${key}`, value] as const)];
    for (const [subject, value] of holders) if (isCompletedSource(value)) refuse("R0_CONFIRM_COMPLETED_SOURCE_NOT_PASS", subject, `${subject} reads "${COMPLETED_SOURCE}" while the gate, domain or tests claim a pass; completed-source is not a PASS receipt`);
  }

  // R0_CONFIRM_FIXTURE_ID_AS_NATIVE (EAT-R011): the fixture operation id never stands in for a native reference, listed in simulated[] or not.
  let fixtureId = false;
  if (receipt !== null && Array.isArray(receipt.native_refs)) {
    receipt.native_refs.forEach((ref: unknown, index) => {
      if (isObj(ref) && isFixtureId(ref.id)) { fixtureId = true; refuse("R0_CONFIRM_FIXTURE_ID_AS_NATIVE", `receipt.native_refs[${index}]`, `native ref id "${String(ref.id).trim()}" is a fixture operation id from the file-driven descriptor test; it is not a native operation`); }
    });
  }
  if (testsObj !== null && testsObj.evidence !== undefined) {
    const list = Array.isArray(testsObj.evidence);
    const entries: unknown[] = list ? (testsObj.evidence as unknown[]) : [testsObj.evidence];
    entries.forEach((entry, index) => {
      const id = isObj(entry) ? entry.id : entry;
      if (isFixtureId(id)) { fixtureId = true; refuse("R0_CONFIRM_FIXTURE_ID_AS_NATIVE", list ? `tests.evidence[${index}]` : "tests.evidence", `tests evidence id "${String(id).trim()}" is a fixture operation id from the file-driven descriptor test; it is not a native operation`); }
    });
  }

  // Run state: measured only when both ran, the tests passed and nothing failed. Pending is an honest wait, not a refusal.
  const ran = pack !== null && pack !== "not-run" && testsObj !== null && testsObj.verdict === "passed" && isCount(testsObj.failed) && testsObj.failed === 0;
  const fixtureDriven = fixtureId || (testsObj !== null && testsObj.harness === "fixture");

  // R0_CONFIRM_TIER_OVERCLAIM (EAT-R011): an L3/L4 or native/joint closure claim on a fixture-driven or unmeasured run.
  const tierClaim = closure.tier;
  if (typeof tierClaim === "string" && TIER_OVERCLAIM.test(tierClaim) && (fixtureDriven || !ran)) {
    refuse("R0_CONFIRM_TIER_OVERCLAIM", "closure.tier", `closure.tier claims "${tierClaim.trim()}" while the run is ${fixtureDriven ? "fixture-driven" : "unmeasured"}; the ceiling is "${R0_FIXTURE_TIER_LABEL}"`);
  }

  // Negative controls are owed only once the run happened.
  if (ran && receipt !== null && !(Array.isArray(receipt.negative_controls) && receipt.negative_controls.length > 0)) missing("receipt.negative_controls", `${ABSENT}; a measured gate needs at least one negative control`);

  const gate: R0ConfirmGate = refusals.length > 0 ? "refused" : ran ? "measured" : "pending";
  return { ok: refusals.length === 0, gate, tier: fixtureDriven ? R0_FIXTURE_TIER_LABEL : null, refusals };
}

function main(argv: readonly string[]): number {
  let root = resolve(fileURLToPath(import.meta.url), "..", "..");
  const files: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--root") root = resolve(argv[++i] ?? ".");
    else files.push(argv[i]!);
  }
  const label = (file: string): string => relative(root, resolve(root, file)).replace(/\\/g, "/");
  const judged: Array<{ file: string; verdict: R0ConfirmVerdict }> = [];
  const explicit = files.length > 0;
  const evidence = resolve(root, R0_EVIDENCE_DIR);
  const candidates = explicit ? files : existsSync(evidence) ? readdirSync(evidence).filter(name => name.endsWith(".json")).sort().map(name => `${R0_EVIDENCE_DIR}/${name}`) : [];
  for (const file of candidates) {
    let record: unknown;
    try { record = JSON.parse(readFileSync(resolve(root, file), "utf8")); } catch (error) {
      if (!explicit) continue;
      const unreadable = error instanceof Error && "code" in error;
      judged.push({ file, verdict: { ok: false, gate: "refused", tier: null, refusals: [{ code: "R0_CONFIRM_FIELD_MISSING", subject: "(record)", detail: unreadable ? "the file is unreadable" : "the file is not valid JSON" }] } });
      continue;
    }
    if (!explicit && !(isObj(record) && record.schema === R0_CONFIRM_SCHEMA)) continue;
    judged.push({ file, verdict: judgeR0Confirm(record) });
  }
  if (judged.length === 0) { console.log("no r0 pack confirms"); return 0; }
  let refused = 0;
  for (const { file, verdict } of judged) {
    if (verdict.ok) { console.log(`${label(file)}: no refusals (${[`gate ${verdict.gate}`, ...(verdict.tier === null ? [] : [`tier ${verdict.tier}`])].join("; ")})`); continue; }
    refused++;
    console.log(`${label(file)}: refused (${verdict.refusals.length})`);
    for (const r of verdict.refusals) console.error(`${label(file)}: ${r.code}: ${r.subject} - ${r.detail}`);
  }
  return refused === 0 ? 0 : 2;
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main(process.argv.slice(2)));
