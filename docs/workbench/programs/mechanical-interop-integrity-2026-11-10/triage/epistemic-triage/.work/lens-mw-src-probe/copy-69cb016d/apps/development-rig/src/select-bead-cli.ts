/**
 * `--select-bead`: the host's work-selection step with optional GraphPolicy advice. Beads' native
 * `ready` is the only readiness source and `bd update --claim` (claimBeadsWork) the only claim; the
 * host enumerates the legal support BEFORE gp sees anything, gp (when the mode is shadow or
 * canary) draws over exactly that support through its real CLI, and the host resolves: shadow keeps
 * the deterministic baseline and only records gp's advice; canary takes gp's in-support choice and
 * falls back to the baseline with a named reason otherwise. Every run writes one
 * mw.bead-selection.v1 record (with its mw.decision-receipt.v1 sidecar) and one experience row;
 * a gp-resolved and claimed choice gets a "pending" feedback record in gp's own journal, which
 * `--gp-reconcile` later resolves from Beads' authoritative issue state. Exit 0: a bead was
 * resolved (and claimed when asked); 1: the claim was refused or uncertain; 3: no legal candidate.
 */
import { appendFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { nativeBdExecutor, type BdExecutor } from "./beads-host.js";
import { claimBeadsWork } from "./beads-claim.js";
import { legalSupport, parseReadyBeads, sha256Bytes, sha256Canonical } from "./graph-policy-snapshot.js";
import { GP_MODES, adviseBead, experienceRow, hostBaseline, loadGpConfig, resolveSelection, type BeadSelection, type GpConfig, type GpMode, type Workdir } from "./graph-policy-advice.js";
import { gpAdmissionAppend, gpEffectOutcomeAppend, gpEntryExecutor, gpFeedbackAdd, type GpAdmissionStatus, type GpExecutor } from "./graph-policy-cli.js";

export interface SelectBeadSeams {
  readonly bd?: BdExecutor | undefined;
  readonly gp?: GpExecutor | undefined;
  readonly claim?: typeof claimBeadsWork | undefined;
  readonly now?: (() => string) | undefined;
  readonly workdir?: (() => Workdir) | undefined;
  readonly env?: Readonly<Record<string, string | undefined>> | undefined;
  readonly readFile?: ((path: string) => string) | undefined;
  readonly writeFile?: ((path: string, text: string, append: boolean) => void) | undefined;
  readonly ensureDir?: ((path: string) => void) | undefined;
}
interface Args { directory: string; mode: GpMode; config: string | undefined; entry: string | undefined; records: string | undefined; allow: string[] | undefined; types: string[] | undefined; seed: string | undefined; claim: boolean }
const VALUED = ["--beads-directory", "--gp-mode", "--gp-config", "--gp-entry", "--records", "--support", "--types", "--seed"];
export function parseSelectBeadArgs(args: readonly string[], env: Readonly<Record<string, string | undefined>>): Args {
  const out: Args = { directory: "", mode: "off", config: env["MW_GP_CONFIG"], entry: env["MW_GP_ENTRY"], records: env["MW_GP_RECORDS"], allow: undefined, types: undefined, seed: undefined, claim: false };
  let mode: string | undefined = env["MW_GP_MODE"];
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    if (key === "--claim") { out.claim = true; continue; }
    if (!VALUED.includes(key ?? "")) throw new Error("UNKNOWN_ARGUMENT: " + String(key));
    const value = args[++i];
    if (!value || value.startsWith("--")) throw new Error("INVALID_ARGUMENT: " + key + " requires a value");
    if (key === "--beads-directory") out.directory = value;
    else if (key === "--gp-mode") mode = value;
    else if (key === "--gp-config") out.config = value;
    else if (key === "--gp-entry") out.entry = value;
    else if (key === "--records") out.records = value;
    else if (key === "--support") out.allow = value.split(",").map(s => s.trim()).filter(Boolean);
    else if (key === "--types") out.types = value.split(",").map(s => s.trim()).filter(Boolean);
    else { if (!/^\d{1,19}$/.test(value)) throw new Error("INVALID_ARGUMENT: --seed must be a decimal integer"); out.seed = value; }
  }
  if (!out.directory) throw new Error("MISSING_ARGUMENT: --beads-directory is required");
  if (mode !== undefined) {
    if (!(GP_MODES as readonly string[]).includes(mode)) throw new Error("GP_MODE_INVALID: expected one of " + GP_MODES.join("|"));
    out.mode = mode as GpMode;
  }
  if (out.mode !== "off") {
    if (!out.config) throw new Error("GP_CONFIG_REQUIRED: --gp-config (or MW_GP_CONFIG) is required when --gp-mode is " + out.mode);
    if (!out.entry) throw new Error("GP_ENTRY_REQUIRED: --gp-entry (or MW_GP_ENTRY) must name the built GraphPolicyCLI entry");
    if (!out.records) throw new Error("GP_RECORDS_REQUIRED: --records (or MW_GP_RECORDS) must name the decision-record directory");
  }
  return out;
}
const defaultWorkdir = (): Workdir => { const dir = mkdtempSync(join(tmpdir(), "mw-gp-")); return { write: (name, content) => { const path = join(dir, name); writeFileSync(path, content); return path; } }; };
const defaultWrite = (path: string, text: string, append: boolean): void => { mkdirSync(join(path, ".."), { recursive: true }); if (append) appendFileSync(path, text); else writeFileSync(path, text); };
export interface SelectBeadOutput { readonly mode: "select-bead"; readonly selection: BeadSelection; readonly claim: { readonly status: "in_progress" } | { readonly refused: string } | null; readonly feedback: { readonly entry: string } | { readonly failed: string } | null; readonly admission: { readonly status: GpAdmissionStatus; readonly digest: string } | { readonly status: GpAdmissionStatus; readonly failed: string } | null; readonly records: string | null }
export async function selectBeadCli(args: readonly string[], seams: SelectBeadSeams = {}): Promise<number> {
  const env = seams.env ?? process.env;
  const parsed = parseSelectBeadArgs(args, env);
  const read = seams.readFile ?? ((path: string) => readFileSync(path, "utf8"));
  const write = seams.writeFile ?? defaultWrite;
  const now = (seams.now ?? (() => new Date().toISOString()))();
  const bd = seams.bd ?? nativeBdExecutor;
  const cwd = realpathSync(parsed.directory);
  const store = basename(cwd);
  const config: GpConfig | null = parsed.mode === "off" ? null : loadGpConfig(parsed.config as string, read);
  // Beads is the readiness authority: one native read-only query, digested exactly as returned.
  const readyRun = await bd(["--readonly", "--directory", cwd, "ready", "--json", "--limit", "0"], cwd);
  if (readyRun.exitCode !== 0) throw new Error("BEADS_QUERY_UNESTABLISHED: ready exited nonzero: " + readyRun.stderr);
  let document: unknown;
  try { document = JSON.parse(readyRun.stdout); } catch { throw new Error("BEADS_RESPONSE_INVALID: ready did not return JSON"); }
  const ready = parseReadyBeads(document);
  const readyDigest = sha256Bytes(readyRun.stdout);
  const support = legalSupport(ready, { allow: parsed.allow, types: parsed.types });
  const baseline = hostBaseline(ready, support);
  const seed = parsed.seed ?? BigInt("0x" + sha256Canonical({ readyDigest, now }).slice(7, 7 + 13)).toString();
  // gp appends its journal under the records directory, which must exist before the first draw.
  if (parsed.records) (seams.ensureDir ?? ((path: string) => { mkdirSync(path, { recursive: true }); }))(parsed.records);
  const journal = parsed.records ? join(parsed.records, "gp-journal.jsonl") : undefined;
  // gp writes each decision receipt once into this store (`gp sample --store DIR --store-receipt`), where gp train finds it.
  const receiptStore = parsed.records ? join(parsed.records, "gp-store") : undefined;
  if (receiptStore !== undefined && config !== null) (seams.ensureDir ?? ((path: string) => { mkdirSync(path, { recursive: true }); }))(receiptStore);
  // The attested revision order: this host's own sequence of observations, one per experience row already recorded in the records directory.
  const experiencePath = parsed.records ? join(parsed.records, "experience.jsonl") : undefined;
  const priorRows = experiencePath !== undefined && existsSync(experiencePath) ? read(experiencePath).split("\n").filter(Boolean).length : 0;
  const execute = seams.gp ?? (config === null ? null : gpEntryExecutor(parsed.entry as string, config.timeoutMs));
  const advice = config === null || execute === null ? null
    : await adviseBead({ ready, support, config, seed, now, store, readyDigest, execute, workdir: (seams.workdir ?? defaultWorkdir)(), journal, receiptStore, revisionOrder: { attestedBy: "mechanicalworkflows.development-rig.select-bead", ordinal: priorRows + 1 } });
  const selection = resolveSelection({ mode: parsed.mode, now, store, readyDigest, readyCount: ready.length, support, baseline, advice, config, seed });
  let claim: SelectBeadOutput["claim"] = null;
  let feedback: SelectBeadOutput["feedback"] = null;
  // The host's admission of gp's draw goes beside the decision in gp's own journal through GraphPolicyCLI main's
  // `gp journal append --kind host-admission` (GPR-1173, pending triage ratification; seat ruling on MechanicalWorkflows-u54e):
  // admitted when the host resolved the draw, denied when it kept the baseline (shadow, or a canary fallback). A gp whose
  // capabilities.commands omit `journal append` is not spawned: the admission is recorded as GP_UNSUPPORTED, once, never retried.
  let admission: SelectBeadOutput["admission"] = null;
  const drawn = selection.advice?.kind === "advice" ? selection.advice.gp : selection.advice?.kind === "abstain" ? selection.advice.gp ?? null : null;
  const drawEntry = drawn?.journalEntry ?? null;
  if (drawEntry && journal && execute && selection.resolved !== null) {
    const status: GpAdmissionStatus = selection.resolved.source === "graph-policy" ? "admitted" : "denied";
    const workdir = (seams.workdir ?? defaultWorkdir)();
    const added = await gpAdmissionAppend(execute, { journal, entry: drawEntry, status, commands: drawn?.capabilityCommands ?? null,
      host: { adapter: "mechanicalworkflows.development-rig.select-bead", revision: readyDigest, scope: "beads://" + store + "#" + selection.resolved.beadId, ref: "mw:bead-selection/" + selection.decisionId + "#" + selection.mode + ":" + selection.resolved.source },
      writeHost: document => workdir.write("host-admission.json", document) });
    admission = added.ok ? { status, digest: added.result.digest } : { status, failed: added.code + ": " + added.detail };
  }
  if (parsed.claim && selection.resolved !== null) {
    try { await (seams.claim ?? claimBeadsWork)(cwd, selection.resolved.beadId); claim = { status: "in_progress" }; }
    catch (error) { claim = { refused: error instanceof Error ? error.message : String(error) }; }
    // Only a gp-drawn, actually claimed choice earns a (pending) feedback record: a shadow draw was never executed.
    if (claim !== null && "status" in claim && selection.resolved.source === "graph-policy" && selection.advice?.kind === "advice" && selection.advice.gp.journalEntry && journal && execute) {
      const workdir = (seams.workdir ?? defaultWorkdir)();
      const added = await gpFeedbackAdd(execute, { journal, entry: selection.advice.gp.journalEntry, labelClass: "source-verified",
        evidence: { adapter: "mechanicalworkflows.development-rig.beads", revision: readyDigest, scope: "beads://" + store + "#" + selection.resolved.beadId, ref: "mw:bead-selection/" + selection.decisionId },
        value: { status: "pending" }, writeEvidence: document => workdir.write("feedback-pending.json", document) });
      feedback = added.ok ? { entry: added.result.entry } : { failed: added.code + ": " + added.detail };
    }
  }
  const output: SelectBeadOutput = { mode: "select-bead", selection, claim, feedback, admission, records: parsed.records ?? null };
  if (parsed.records) {
    write(join(parsed.records, "selections", selection.decisionId + ".json"), JSON.stringify(output, null, 1) + "\n", false);
    write(join(parsed.records, "experience.jsonl"), JSON.stringify(experienceRow(selection, { claim: claim === null ? null : "status" in claim ? claim.status : "refused" })) + "\n", true);
  }
  process.stdout.write(JSON.stringify(output) + "\n");
  if (selection.resolved === null) return 3;
  if (claim !== null && "refused" in claim) return 1;
  return 0;
}
/**
 * `--gp-reconcile`: resolve pending gp feedback from Beads' authoritative issue state. For every
 * recorded gp-resolved, claimed decision whose feedback is still pending, one native read-only
 * `bd show`; closed → resolved scalar 1, open and unassigned → resolved scalar 0 (the claim was
 * released without completion), anything else stays pending. A resolved decision also gets one
 * `gp journal append --kind effect-outcome-reference` joined to the host-admission digest recorded at
 * selection time (closed → succeeded, released → failed; none while pending). Nothing here fabricates a reward.
 */
/** One 64-hex digest select-bead stored in `selections/<decisionId>.json` under `<section>.<field>`; null when absent or malformed. */
function storedDigest(read: (path: string) => string, records: string, decisionId: string, section: string, field: string): string | null {
  const path = join(records, "selections", decisionId + ".json");
  if (!existsSync(path)) return null;
  try {
    const record: unknown = JSON.parse(read(path));
    const body = record !== null && typeof record === "object" ? (record as Record<string, unknown>)[section] : null;
    const value = body !== null && typeof body === "object" ? (body as Record<string, unknown>)[field] : null;
    return typeof value === "string" && /^[0-9a-f]{64}$/.test(value) ? value : null;
  } catch { return null; }
}
/** The pending feedback root entry select-bead stored in `selections/<decisionId>.json` (`feedback.entry`). */
const pendingRoot = (read: (path: string) => string, records: string, decisionId: string): string | null => storedDigest(read, records, decisionId, "feedback", "entry");
/** The host-admission digest select-bead stored in `selections/<decisionId>.json` (`admission.digest`); absent when the admission append failed or was never made. */
const recordedAdmission = (read: (path: string) => string, records: string, decisionId: string): string | null => storedDigest(read, records, decisionId, "admission", "digest");
export interface ReconcileSeams { readonly bd?: BdExecutor | undefined; readonly gp?: GpExecutor | undefined; readonly env?: Readonly<Record<string, string | undefined>> | undefined; readonly readFile?: ((path: string) => string) | undefined; readonly writeFile?: ((path: string, text: string, append: boolean) => void) | undefined; readonly workdir?: (() => Workdir) | undefined }
export async function gpReconcileCli(args: readonly string[], seams: ReconcileSeams = {}): Promise<number> {
  const env = seams.env ?? process.env;
  let directory = ""; let records = env["MW_GP_RECORDS"]; let configPath = env["MW_GP_CONFIG"]; let entry = env["MW_GP_ENTRY"];
  for (let i = 0; i < args.length; i++) {
    const key = args[i]; const value = args[++i];
    if (!["--beads-directory", "--records", "--gp-config", "--gp-entry"].includes(key ?? "")) throw new Error("UNKNOWN_ARGUMENT: " + String(key));
    if (!value || value.startsWith("--")) throw new Error("INVALID_ARGUMENT: " + key + " requires a value");
    if (key === "--beads-directory") directory = value; else if (key === "--records") records = value; else if (key === "--gp-config") configPath = value; else entry = value;
  }
  if (!directory) throw new Error("MISSING_ARGUMENT: --beads-directory is required");
  if (!records) throw new Error("GP_RECORDS_REQUIRED: --records (or MW_GP_RECORDS) must name the decision-record directory");
  if (!configPath) throw new Error("GP_CONFIG_REQUIRED: --gp-config (or MW_GP_CONFIG) is required");
  if (!entry) throw new Error("GP_ENTRY_REQUIRED: --gp-entry (or MW_GP_ENTRY) must name the built GraphPolicyCLI entry");
  const read = seams.readFile ?? ((path: string) => readFileSync(path, "utf8"));
  const write = seams.writeFile ?? defaultWrite;
  const config = loadGpConfig(configPath, read);
  const execute = seams.gp ?? gpEntryExecutor(entry, config.timeoutMs);
  const bd = seams.bd ?? nativeBdExecutor;
  const cwd = realpathSync(directory);
  const journal = join(records, "gp-journal.jsonl");
  const statePath = join(records, "feedback-state.json");
  const state: Record<string, { status: string; scalar?: number; entry?: string; supersedes?: string; admission?: string; effectOutcome?: string }> = existsSync(statePath) ? JSON.parse(read(statePath)) as Record<string, { status: string }> : {};
  const experiencePath = join(records, "experience.jsonl");
  const rows = existsSync(experiencePath) ? read(experiencePath).split("\n").filter(Boolean).map(line => JSON.parse(line) as Record<string, unknown>) : [];
  const results: Record<string, unknown>[] = [];
  for (const row of rows) {
    const id = String(row["decisionId"]); const gp = row["gp"]; const resolved = row["resolved"];
    if (row["claim"] !== "in_progress" || !gp || typeof gp !== "object" || typeof (gp as Record<string, unknown>)["journalEntry"] !== "string" || !resolved || typeof resolved !== "object") continue;
    if ((resolved as Record<string, unknown>)["source"] !== "graph-policy" || state[id]?.status === "resolved") continue;
    const beadId = String((resolved as Record<string, unknown>)["beadId"]);
    const shown = await bd(["--readonly", "--directory", cwd, "show", beadId, "--json"], cwd);
    if (shown.exitCode !== 0) { results.push({ decisionId: id, beadId, outcome: "BEADS_QUERY_UNESTABLISHED" }); continue; }
    let issue: Record<string, unknown> | null = null;
    try { const parsedShow: unknown = JSON.parse(shown.stdout); const first = Array.isArray(parsedShow) ? parsedShow[0] : parsedShow; issue = first !== null && typeof first === "object" ? first as Record<string, unknown> : null; } catch { issue = null; }
    if (issue === null || issue["id"] !== beadId) { results.push({ decisionId: id, beadId, outcome: "BEADS_RESPONSE_INVALID" }); continue; }
    const status = String(issue["status"]); const assignee = typeof issue["assignee"] === "string" ? issue["assignee"].trim() : "";
    const scalar = status === "closed" ? 1 : status === "open" && assignee === "" ? 0 : null;
    if (scalar === null) { results.push({ decisionId: id, beadId, outcome: "pending", status }); continue; }
    // The resolved value supersedes the pending root recorded at selection time (`gp feedback add --supersedes`), never a second root.
    const root = pendingRoot(read, records, id);
    if (root === null) { results.push({ decisionId: id, beadId, outcome: "GP_FEEDBACK_ROOT_MISSING", detail: "selections/" + id + ".json holds no pending feedback root entry to supersede" }); continue; }
    // The effect outcome joins the admission select-bead recorded: without that digest nothing is written for the decision, so a later run can still resolve it.
    const admissionDigest = recordedAdmission(read, records, id);
    if (admissionDigest === null) { results.push({ decisionId: id, beadId, outcome: "GP_ADMISSION_DIGEST_MISSING", detail: "selections/" + id + ".json holds no host-admission digest to join the effect outcome to" }); continue; }
    const workdir = (seams.workdir ?? defaultWorkdir)();
    const added = await gpFeedbackAdd(execute, { journal, entry: (gp as Record<string, unknown>)["journalEntry"] as string, supersedes: root, labelClass: "source-verified",
      evidence: { adapter: "mechanicalworkflows.development-rig.beads", revision: sha256Bytes(shown.stdout), scope: "beads://" + basename(cwd) + "#" + beadId, ref: "bd:" + beadId + "#" + status },
      value: { status: "resolved", scalar }, writeEvidence: document => workdir.write("feedback-" + id.replace(/[^a-z0-9]/gi, "") + ".json", document) });
    if (!added.ok) { results.push({ decisionId: id, beadId, outcome: added.code, detail: added.detail }); continue; }
    // Exactly one effect-outcome-reference per resolved decision (closed -> succeeded, released -> failed), appended once and never retried.
    const effect = { adapter: "mechanicalworkflows.development-rig.beads", revision: sha256Bytes(shown.stdout), scope: "beads://" + basename(cwd) + "#" + beadId, ref: "bd:" + beadId + "#" + status };
    const linked = await gpEffectOutcomeAppend(execute, { journal, admissionDigest, outcome: scalar === 1 ? "succeeded" : "failed", effect, writeRecord: document => workdir.write("effect-outcome-" + id.replace(/[^a-z0-9]/gi, "") + ".json", document) });
    state[id] = { status: "resolved", scalar, entry: added.result.entry, supersedes: root, admission: admissionDigest, ...(linked.ok ? { effectOutcome: linked.result.digest } : {}) };
    results.push({ decisionId: id, beadId, outcome: "resolved", scalar, status, entry: added.result.entry, supersedes: root, effectOutcome: linked.ok ? { entry: linked.result.digest } : { failed: linked.code + ": " + linked.detail } });
  }
  write(statePath, JSON.stringify(state, null, 1) + "\n", false);
  process.stdout.write(JSON.stringify({ mode: "gp-reconcile", examined: rows.length, results }) + "\n");
  return 0;
}
