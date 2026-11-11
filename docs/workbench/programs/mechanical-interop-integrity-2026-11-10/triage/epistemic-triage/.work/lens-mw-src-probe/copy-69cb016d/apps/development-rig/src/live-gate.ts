/**
 * Real Forge App Server integration; does not implement Forge protocol or gate semantics.
 * Public SDK: @forge/sdk ServerConnection.spawn().initialize().request("gate.run", {root}).
 * The generic request is intentional: on the inspected Forge revision the typed gate
 * facade forwards {target,changed} while the server's gate.run requires {root}.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync, readFileSync, realpathSync, statSync } from "node:fs";
import { join, sep } from "node:path";

const execFileAsync = promisify(execFile);

export interface GitBasis {
  readonly commit: string;
  readonly tree: string;
  readonly clean: true;
}

/** Not an SDK substitute: only the small public connection shape this host consumes. */
export interface ForgeConnection {
  initialize(): Promise<unknown>;
  request(method: string, params: Record<string, unknown>): Promise<unknown>;
  close(): Promise<void>;
}
export interface ForgeModule {
  readonly ServerConnection: {
    spawn(executable: string): ForgeConnection;
  };
}

/** How one receipt statement is bound: a native envelope field, a run-record derivation, or an unpinned descriptor. */
export type BindingSource = "native" | "run_record" | "descriptor";

/** Per-receipt binding record (CACWC-EAT-R006). The environment is never "established" while execution_environment.pinned is false. */
export interface GateBinding {
  readonly commit: BindingSource;
  readonly gateDefinition: "native" | "descriptor";
  readonly environment: "established" | "descriptor";
}

export interface GateObservation {
  readonly kind: "passed" | "failed" | "indeterminate";
  readonly reason: string;
  readonly basis: GitBasis;
  readonly operationId: string | null;
  readonly native: unknown;
  readonly binding: GateBinding;
}

/** Nothing read, nothing bound: the all-descriptor record for unreadable or undispatched receipts. */
const DESCRIPTOR_BINDING: GateBinding = { commit: "descriptor", gateDefinition: "descriptor", environment: "descriptor" };

/** Environment and gate-definition binding from the data carrier; commit binding is supplied by pin resolution. */
function bindingOf(data: Record<string, unknown> | null, commit: BindingSource): GateBinding {
  const environment = object(data?.["execution_environment"]);
  return {
    commit,
    gateDefinition: data !== null && data["gate_definition"] !== undefined && data["gate_definition"] !== null ? "native" : "descriptor",
    // The law: never "established" while pinned is false (or unreadable).
    environment: environment?.["pinned"] === true ? "established" : "descriptor",
  };
}

function object(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}

async function git(root: string, ...args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", ["-C", root, ...args], {
    encoding: "utf8", timeout: 30_000, maxBuffer: 8 * 1024 * 1024,
  });
  return stdout.trim();
}

export function packageRoot(input: string): string {
  let root: string;
  try { root = realpathSync(input); }
  catch { throw new Error("FORGE_PACKAGE_ROOT_REQUIRED: expected an existing directory containing forge.toml, got " + input); }
  if (!statSync(root).isDirectory() || !existsSync(join(root, "forge.toml"))) {
    throw new Error("FORGE_PACKAGE_ROOT_REQUIRED: expected an existing directory containing forge.toml");
  }
  return root;
}

export async function cleanGitBasis(root: string): Promise<GitBasis> {
  const [commit, tree, dirty] = await Promise.all([
    git(root, "rev-parse", "--verify", "HEAD"),
    git(root, "rev-parse", "--verify", "HEAD^{tree}"),
    git(root, "status", "--porcelain=v1", "--untracked-files=all"),
  ]);
  if (!/^[0-9a-f]{40,64}$/.test(commit) || !/^[0-9a-f]{40,64}$/.test(tree)) {
    throw new Error("GIT_BASIS_UNREADABLE: commit/tree could not be verified");
  }
  if (dirty.length > 0) throw new Error("WORKSPACE_NOT_CLEAN: live verification requires a committed, clean candidate");
  return { commit, tree, clean: true };
}

function stringField(source: Record<string, unknown> | null, key: string): string | null {
  const value = source?.[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

/**
 * Native candidate pinning. The installed Forge 0.2.1 app-server (rev 0deb972720ce)
 * returns envelope.gated_commit/gated_tree as null on gate.run, unlike the CLI build
 * envelope; the commit is carried by the envelope-named run record (evidence_ref,
 * which must resolve inside the verified package root) and the tree by
 * data.source_tree. Every present native commit/tree statement must agree with the
 * observed clean basis, and at least one native commit statement is required.
 */
function resolveCandidatePin(
  envelope: Record<string, unknown>,
  data: Record<string, unknown>,
  basis: GitBasis,
  root: string,
): { readonly verdict: "pinned" | string; readonly commit: BindingSource } {
  const commits: string[] = [];
  const trees: string[] = [];
  for (const source of [envelope, data]) {
    const commit = stringField(source, "gated_commit");
    if (commit) commits.push(commit);
    const tree = stringField(source, "gated_tree");
    if (tree) trees.push(tree);
  }
  const sourceTree = stringField(data, "source_tree");
  if (sourceTree) trees.push(sourceTree);
  const native = commits.length > 0;
  const evidenceRef = stringField(envelope, "evidence_ref");
  if (commits.length === 0 && evidenceRef) {
    let recordPath: string;
    try { recordPath = realpathSync(evidenceRef); }
    catch { return { verdict: "FORGE_EVIDENCE_RECORD_UNREADABLE", commit: "descriptor" }; }
    if (recordPath !== root && !recordPath.startsWith(root + sep)) {
      return { verdict: "FORGE_EVIDENCE_RECORD_OUTSIDE_ROOT", commit: "descriptor" };
    }
    let record: Record<string, unknown> | null = null;
    try { record = object(JSON.parse(readFileSync(recordPath, "utf8"))); }
    catch { return { verdict: "FORGE_EVIDENCE_RECORD_UNREADABLE", commit: "descriptor" }; }
    const recordCommit = stringField(record, "revision");
    if (recordCommit) commits.push(recordCommit);
    const recordTree = stringField(record, "source_tree");
    if (recordTree) trees.push(recordTree);
  }
  const source: BindingSource = native ? "native" : commits.length > 0 ? "run_record" : "descriptor";
  if (commits.length === 0 || commits.some(commit => commit !== basis.commit)) {
    return { verdict: "FORGE_GATED_COMMIT_MISSING_OR_MISMATCHED", commit: "descriptor" };
  }
  if (trees.some(tree => tree !== basis.tree)) {
    return { verdict: "FORGE_GATED_TREE_MISMATCHED", commit: "descriptor" };
  }
  return { verdict: "pinned", commit: source };
}

function operationIdOf(raw: unknown): string | null {
  const frame = object(raw);
  const id = frame?.["operation_id"];
  if (typeof id === "string" && id.trim()) return id;
  // A cancelled or wrapper-less result envelope names the operation only under data.
  const nested = object(frame?.["data"])?.["operation_id"];
  return typeof nested === "string" && nested.trim() ? nested : null;
}
/** The operation's own terminal says a cancellation was established; a cancel receipt never does. */
function cancellationEstablished(frame: Record<string, unknown> | null): boolean {
  const data = object(frame?.["data"]);
  return frame?.["terminal_disposition"] === "cancelled-established" ||
    data?.["terminal_disposition"] === "cancelled-established" ||
    object(data?.["cancellation"])?.["establishment"] === "CANCELLED_CONFIRMED";
}

/** Classify one native gate.run response for a known clean basis; exported for adversarial drivers, never a dispatcher. */
export function classifyGateResponse(raw: unknown, basis: GitBasis, root: string): GateObservation { return classify(raw, basis, root); }
function classify(raw: unknown, basis: GitBasis, root: string): GateObservation {
  const frame = object(raw);
  const native = object(frame?.["forge_result"]);
  const envelope = object(native?.["envelope"]);
  const data = object(native?.["data"]);
  const operationId = typeof frame?.["operation_id"] === "string" && frame["operation_id"].trim()
    ? frame["operation_id"] : null;
  const base: GateObservation = {
    kind: "indeterminate", reason: "FORGE_RESULT_UNREADABLE", basis, operationId, native: raw,
    binding: bindingOf(data, "descriptor"),
  };
  if (cancellationEstablished(frame)) return { ...base, reason: "FORGE_OPERATION_CANCELLED", operationId: operationIdOf(raw) };
  if (!frame || !native || !envelope || !data || operationId === null) return { ...base, operationId: operationIdOf(raw) };
  const delivery = object(frame["delivery"]);
  if (delivery && delivery["complete"] !== true) return { ...base, reason: "FORGE_RESPONSE_DELIVERY_INCOMPLETE" };
  if (native["status"] !== frame["status"] || native["status"] !== "success" && native["status"] !== "error" && native["status"] !== "partial" && native["status"] !== "usage_error") {
    return { ...base, reason: "FORGE_RESULT_STATUS_INCONSISTENT" };
  }
  const verdict = data["gate_verdict"];
  const disposition = envelope["disposition"];
  if (native["status"] === "success" && verdict === "PASS" && disposition === "SUCCEEDED") {
    // A green result for an unknown basis is not proof about the candidate.
    const pin = resolveCandidatePin(envelope, data, basis, root);
    if (pin.verdict !== "pinned") {
      return { ...base, reason: pin.verdict };
    }
    const bound = { ...base, binding: bindingOf(data, pin.commit) };
    // An explicit envelope verdict must agree with the data carrier; an absent one is the legacy shape.
    if (envelope["verdict"] !== undefined && envelope["verdict"] !== "PASS") {
      return { ...bound, reason: "FORGE_GATE_ENVELOPE_VERDICT_CONTRADICTED" };
    }
    if (data["gate_passed"] === false || frame["terminal_fact"] !== "completed") {
      return { ...bound, reason: "FORGE_GATE_COMPLETION_UNESTABLISHED" };
    }
    return { ...bound, kind: "passed", reason: "FORGE_GATE_PASS" };
  }
  if (verdict === "FAIL" && native["status"] === "error") {
    // A measured red must be about the requested candidate. An error-level
    // transport/harness refusal, another basis, or an incomplete terminal
    // cannot be relabeled as a domain gate failure. Forge's terminal fact for a
    // FAILED disposition is "failed" (result_projection.terminal_fact_for: SUCCEEDED/NO_OP
    // -> completed, FAILED/REJECTED/BLOCKED -> failed, PARTIAL/COULD_NOT_JUDGE ->
    // partial-indeterminate), so a FAILED envelope under any other fact is a contradiction.
    const pin = resolveCandidatePin(envelope, data, basis, root);
    if (disposition !== "FAILED" || frame["terminal_fact"] !== "failed" ||
        data["gate_passed"] === true || pin.verdict !== "pinned") {
      return { ...base, reason: pin.verdict !== "pinned" ? pin.verdict : "FORGE_GATE_FAILURE_UNESTABLISHED" };
    }
    return { ...base, binding: bindingOf(data, pin.commit), kind: "failed", reason: "FORGE_GATE_FAIL" };
  }
  return { ...base, reason: "FORGE_GATE_NOT_ESTABLISHED" };
}

export type ConnectForge = (executable: string) => ForgeConnection;

export type ModuleImporter = (specifier: string) => Promise<unknown>;
/** Defaults to loading the real, installed public Forge TypeScript SDK; the importer is a seam, never a substitute SDK. */
export async function loadForgeConnection(importer: ModuleImporter = specifier => import(specifier)): Promise<ConnectForge> {
  const specifier: string = "@forge/sdk";
  let sdk: unknown;
  try { sdk = await importer(specifier); }
  catch { throw new Error("FORGE_SDK_NOT_INSTALLED: install a compatible public @forge/sdk package into the development-rig workspace"); }
  const connector = object(sdk)?.["ServerConnection"] as { spawn?: unknown } | undefined;
  if (!connector || typeof connector.spawn !== "function") {
    throw new Error("FORGE_SDK_INCOMPATIBLE: ServerConnection.spawn is unavailable");
  }
  const spawn = connector.spawn as (executable: string) => ForgeConnection;
  return (executable: string) => spawn.call(connector, executable);
}

/**
 * Execute a **real** full package gate on a clean committed candidate.
 * A gate response is classified separately from SDK transport success.
 * Clean basis is re-observed after the gate; no mutation may be credited as verified.
 */
export async function verifyExistingCandidate(
  rootInput: string,
  forgeExecutable = "forge",
  connect?: ConnectForge,
): Promise<GateObservation> {
  const root = packageRoot(rootInput);
  const initial = await cleanGitBasis(root);
  const factory = connect ?? await loadForgeConnection();
  const connection = factory(forgeExecutable);
  let raw: unknown;
  let dispatchFailure: unknown;
  let closeFailure: unknown;
  try {
    const negotiation = await connection.initialize();
    if (negotiation !== "compatible") {
      throw new Error("FORGE_PROTOCOL_COMPATIBILITY_UNESTABLISHED: " + String(negotiation));
    }
    try {
      raw = await connection.request("gate.run", { root, require_complete: true });
    } catch (error) {
      // The request may have been dispatched before the transport failed.
      // This is not proof that Forge did not execute the gate.
      dispatchFailure = error;
    }
  } finally {
    try { await connection.close(); }
    catch (error) { closeFailure = error; }
  }
  if (closeFailure !== undefined) {
    return {
      kind: "indeterminate", reason: "FORGE_CONNECTION_CLOSE_UNCERTAIN",
      basis: initial, operationId: operationIdOf(raw), binding: DESCRIPTOR_BINDING,
      native: raw ?? { error: closeFailure instanceof Error ? closeFailure.message : String(closeFailure) },
    };
  }
  if (dispatchFailure !== undefined) {
    return {
      kind: "indeterminate",
      reason: "FORGE_DISPATCH_OUTCOME_UNKNOWN",
      basis: initial, operationId: null, binding: DESCRIPTOR_BINDING,
      native: { error: dispatchFailure instanceof Error ? dispatchFailure.message : String(dispatchFailure) },
    };
  }
  let finalBasis: GitBasis;
  try {
    finalBasis = await cleanGitBasis(root);
  } catch {
    return { kind: "indeterminate", reason: "WORKSPACE_NOT_CLEAN_AFTER_GATE", basis: initial, operationId: operationIdOf(raw), native: raw, binding: DESCRIPTOR_BINDING };
  }
  if (initial.commit !== finalBasis.commit || initial.tree !== finalBasis.tree) {
    return {
      kind: "indeterminate",
      reason: "WORKSPACE_CHANGED_DURING_GATE",
      basis: initial, operationId: operationIdOf(raw), native: raw, binding: DESCRIPTOR_BINDING,
    };
  }
  return classify(raw, initial, root);
}
