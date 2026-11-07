/**
 * source-admission.ts: host-owned write admission against an immutable source identity (wb-s8rm, the B-source bead of the
 * mechanical-workflows-interop-2026-11-04 program, slice PI-1, requirements EAT-R022..EAT-R027; the program is design-only and
 * its function host does not exist yet). test/workbench-mechanical-source-admission.test.ts names the case that pins each
 * form these comments state; a form no case pins is NOT CLAIMED there.
 *
 * admitSourceWrite(request, host, dispatch) calls a write-capable dispatch at most once, with the one grant it mints, after
 * these rules pass in this order; the first refusal wins and is returned before the dispatch is called:
 * 1. request shape: a plain request object, a clean invocation reference and a dispatch function;
 * 2. cancellation: the host's signal is not aborted;
 * 3. the write request: the caller's JSON policy asks for writes (it never grants them; EAT-R027);
 * 4. confinement (EAT-R023, confineWorkspace): the caller's workspace path is a locator, never authority;
 * 5. measurement (EAT-R022, EAT-R026, measureSourceIdentity): the host measures the source identity itself;
 * 6. attestation (EAT-R027): the host's attestation slot holds an attestation this host's WriteBoundaryAuthority minted for
 *    exactly that workspace and identity;
 * 7. the writer lease (EAT-R024): one lease per canonical workspace root;
 * then the host's admission wait, cancellation, a fresh measurement whose digest must equal the admitted one, and the
 * attestation read again (EAT-R025). The lease is released when the admission refuses after taking it or the dispatch
 * settles, and a dispatch error propagates unchanged. A refusal carries the fixed reason of its code, never caller text.
 *
 * Boundaries: the module launches nothing. Git is read through the host's SourceGitReader, and every call's argv starts with
 * --no-optional-locks -c core.fsmonitor=false -c core.untrackedCache=false. Not wired yet: workflow_execute still refuses a
 * function definition (execute-tool.ts, unsupported-definition-kind) until the dispatch bead composes this seam. One
 * WriterLeases registry binds the writers of one host process.
 */
import { createHash } from "node:crypto";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { CapabilityError, type JsonValue } from "./capability-registry.js";
import { identityDigest } from "./identity.js";

/** The identityDigest domain of a SourceIdentity's digest. */
export const SOURCE_IDENTITY_DOMAIN = "source-identity";

/**
 * The host's read-only Git reader: runs git in `directory` with exactly `args` and returns its stdout as a Buffer, or undefined
 * when git cannot answer. The host owns the process and its environment. A reader that throws, or answers with anything but a
 * Buffer, has not answered.
 */
export type SourceGitReader = (directory: string, args: readonly string[]) => Buffer | undefined;

export type SourceAdmissionCode =
  | "malformed-request"
  | "writes-not-requested"
  | "workspace-unresolvable"
  | "workspace-outside-root"
  | "workspace-not-worktree-root"
  | "source-unmeasurable"
  | "dirty-base"
  | "gate-manifest-unavailable"
  | "attestation-absent"
  | "attestation-other-workspace"
  | "attestation-stale"
  | "writer-held"
  | "admission-cancelled"
  | "admission-refused"
  | "source-changed";

/**
 * Counts of the records of git status --porcelain=v1 -z --untracked-files=all --no-renames: untracked counts the "??" records,
 * staged the other records whose index column is not a space, tracked the other records whose worktree column is not a space
 * (one record can count as staged and as tracked). Ignored paths are not listed.
 */
export interface SourceDirtiness {
  readonly tracked: number;
  readonly staged: number;
  readonly untracked: number;
}
export interface SourceAdmissionRefusal {
  readonly decision: "refused";
  readonly code: SourceAdmissionCode;
  readonly reason: string;
  /** Present on dirty-base only. */
  readonly dirty?: SourceDirtiness;
}
/**
 * The measured identity of one clean workspace, frozen together with its gateManifest member. Only measureSourceIdentity mints
 * one that an authority will attest.
 */
export interface SourceIdentity {
  readonly canonicalRoot: string;
  readonly commit: string;
  readonly tree: string;
  readonly dirtiness: "clean";
  /**
   * The gate manifest as measured: the workspace-relative path (POSIX separators) of the file the declared path resolves to by
   * realpath, and "sha256:" followed by the SHA-256 of its bytes in hex.
   */
  readonly gateManifest: { readonly path: string; readonly sha256: string };
  /** identityDigest(SOURCE_IDENTITY_DOMAIN, the five members above). */
  readonly digest: string;
}
export type SourceMeasurement = { readonly decision: "measured"; readonly identity: SourceIdentity } | SourceAdmissionRefusal;
export type WorkspaceConfinement = { readonly decision: "confined"; readonly canonicalRoot: string } | SourceAdmissionRefusal;
/** One operator-attested write boundary: one measured identity of one canonical workspace. Frozen when it is minted. */
export interface WriteBoundaryAttestation {
  readonly operatorId: string;
  readonly workspace: string;
  readonly sourceIdentity: string;
}
export interface WriterLease {
  readonly canonicalRoot: string;
  readonly invocationId: string;
}
export interface SourceWriteRequest {
  /** The host-minted logical invocation reference: clean text (see cleanText). */
  readonly invocationId: string;
  /** The caller's absolute workspace path: a locator, never authority. */
  readonly workspace: string;
  /** The caller's JSON policy: it asks for writes (see writesRequested) and never authorizes them. */
  readonly policy?: JsonValue;
}
/** What only the host supplies. Nothing here is read from the request. */
export interface SourceAdmissionHost {
  /** The absolute root the host authorized writes under, judged by its realpath; the workspace must resolve inside it. */
  readonly authorizedRoot: string;
  /** The gate manifest the identity binds: a path relative to the workspace root. */
  readonly gateManifest: string;
  readonly git: SourceGitReader;
  readonly authority: WriteBoundaryAuthority;
  /** The operator's attestation from the host's own channel. Read again after the admission wait, so withdrawing it refuses. */
  attestation?: WriteBoundaryAttestation;
  readonly leases: WriterLeases;
  readonly signal?: AbortSignal;
  /**
   * The host's asynchronous admission wait (queue, budget or operator). A rejection refuses admission-cancelled when the signal
   * is aborted by then and admission-refused otherwise; after it resolves the source is measured again.
   */
  readonly admissionWait?: (signal: AbortSignal | undefined) => Promise<void>;
}
/** The one child write capability this module mints: frozen, and handed to the dispatch only. */
export interface SourceWriteGrant {
  readonly invocationId: string;
  readonly identity: SourceIdentity;
  readonly operatorId: string;
  readonly lease: WriterLease;
}
export type SourceAdmissionOutcome<T> = { readonly decision: "dispatched"; readonly identity: SourceIdentity; readonly value: T } | SourceAdmissionRefusal;

/** One fixed reason per code: a refusal never carries caller or producer text. */
const REASONS: Readonly<Record<SourceAdmissionCode, string>> = Object.freeze({
  "malformed-request": "malformed source write request",
  "writes-not-requested": "the request does not ask for writes, so no write capability is granted",
  "workspace-unresolvable": "the workspace or the authorized root does not resolve",
  "workspace-outside-root": "the workspace resolves outside the authorized canonical root",
  "workspace-not-worktree-root": "the workspace is not the root of its own Git worktree",
  "source-unmeasurable": "the source identity cannot be measured: no canonical worktree root, a repository other than the one its .git names, no HEAD, or an index entry hidden from git status or unmerged",
  "dirty-base": "the implementation base has tracked, staged or untracked edits",
  "gate-manifest-unavailable": "the gate manifest is missing, leaves the workspace, is not a regular file or exceeds its bound",
  "attestation-absent": "no operator attestation minted by this host covers the write boundary",
  "attestation-other-workspace": "the operator attestation names another workspace",
  "attestation-stale": "the operator attestation names another source identity of this workspace",
  "writer-held": "another invocation holds the writer lease of this canonical workspace",
  "admission-cancelled": "the invocation was cancelled during admission",
  "admission-refused": "the host admission wait refused the invocation",
  "source-changed": "the source identity changed while the admission waited",
});

/** A commit or tree object id: 40 (SHA-1) or 64 (SHA-256) lowercase hex digits. */
const OBJECT_ID = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/;
const TEXT_BYTES = 4096;
/** The gate manifest bound: 1 MiB (1048576 bytes). */
const GATE_MANIFEST_BYTES = 1024 * 1024;
/** Global options that open every call's argv: --no-optional-locks (no optional index write), core.fsmonitor and core.untrackedCache off. */
const GIT_MEASURE_OPTIONS: readonly string[] = ["--no-optional-locks", "-c", "core.fsmonitor=false", "-c", "core.untrackedCache=false"];

/** Every SourceIdentity measureSourceIdentity minted; an authority attests no other object. */
const measuredIdentities = new WeakSet<SourceIdentity>();

function refusal(code: SourceAdmissionCode): SourceAdmissionRefusal {
  return Object.freeze({ decision: "refused", code, reason: REASONS[code] });
}

/** An object whose prototype is Object.prototype or null (an array is not one). */
function plainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/** Clean text: a string that is not blank after trim(), of at most 4096 UTF-8 bytes, with no U+0000-U+001F or U+007F. */
function cleanText(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "" && Buffer.byteLength(value) <= TEXT_BYTES && !/[\u0000-\u001f\u007f]/.test(value);
}

function absolutePath(value: unknown): value is string {
  return cleanText(value) && isAbsolute(value);
}

/** path is root or inside it, judged by path.relative: a sibling that only shares the root's prefix is outside. */
function contains(root: string, path: string): boolean {
  const rel = relative(root, path);
  return rel === "" || (rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel));
}

function realpathOf(path: string): string | undefined {
  try {
    return realpathSync(path);
  } catch {
    return undefined;
  }
}

/** The reader's answer for one call: undefined when it throws or answers with anything but a Buffer. */
function read(git: SourceGitReader, directory: string, args: readonly string[]): Buffer | undefined {
  try {
    const output = git(directory, [...GIT_MEASURE_OPTIONS, ...args]);
    return Buffer.isBuffer(output) ? output : undefined;
  } catch {
    return undefined;
  }
}

/** The answer as UTF-8 text with one final newline removed. */
function readLine(git: SourceGitReader, directory: string, args: readonly string[]): string | undefined {
  const output = read(git, directory, args)?.toString("utf8");
  return output?.endsWith("\n") ? output.slice(0, -1) : output;
}

function records(output: Buffer): string[] {
  return output.toString("utf8").split("\0").filter(record => record !== "");
}

/** The realpath of the root git reports for the worktree that holds directory; undefined when git does not answer. */
function worktreeRoot(git: SourceGitReader, directory: string): string | undefined {
  const top = readLine(git, directory, ["rev-parse", "--show-toplevel"]);
  return top === undefined ? undefined : realpathOf(top);
}

function dirtiness(status: Buffer): SourceDirtiness {
  let tracked = 0;
  let staged = 0;
  let untracked = 0;
  for (const record of records(status)) {
    const index = record.charAt(0);
    const worktree = record.charAt(1);
    if (index === "?" && worktree === "?") {
      untracked += 1;
      continue;
    }
    if (index !== " ") staged += 1;
    if (worktree !== " ") tracked += 1;
  }
  return Object.freeze({ tracked, staged, untracked });
}

/**
 * The gate manifest measured by bytes, whether Git tracks it or not. Undefined when the declared path is absolute, when it leaves
 * the workspace by path or its realpath leaves it by symlink, when it is missing or cannot be read, when what it resolves to is not
 * a regular file, or when it holds more than 1 MiB.
 */
function gateManifestOf(root: string, manifest: string): { readonly path: string; readonly sha256: string } | undefined {
  if (isAbsolute(manifest)) return undefined;
  const declared = resolve(root, manifest);
  if (!contains(root, declared)) return undefined;
  const real = realpathOf(declared);
  if (real === undefined || !contains(root, real)) return undefined;
  try {
    const stat = lstatSync(real);
    if (!stat.isFile() || stat.size > GATE_MANIFEST_BYTES) return undefined;
    const bytes = readFileSync(real);
    if (bytes.length > GATE_MANIFEST_BYTES) return undefined;
    return Object.freeze({ path: relative(root, real).split(sep).join("/"), sha256: `sha256:${createHash("sha256").update(bytes).digest("hex")}` });
  } catch {
    return undefined;
  }
}

/**
 * EAT-R023: the canonical root of the caller's workspace. Both paths must be absolute (a relative one would resolve against Pi's
 * own directory); the workspace's realpath must lie inside the authorized root's realpath, judged by path.relative and never by a
 * string prefix, and must be the root git reports for it, so a subdirectory of a wider checkout is refused. Refusals in order:
 * malformed-request, workspace-unresolvable, workspace-outside-root, workspace-not-worktree-root.
 */
export function confineWorkspace(authorizedRoot: string, workspace: string, git: SourceGitReader): WorkspaceConfinement {
  if (!absolutePath(authorizedRoot) || !absolutePath(workspace) || typeof git !== "function") return refusal("malformed-request");
  const root = realpathOf(authorizedRoot);
  const canonical = realpathOf(workspace);
  if (root === undefined || canonical === undefined) return refusal("workspace-unresolvable");
  if (!contains(root, canonical)) return refusal("workspace-outside-root");
  if (worktreeRoot(git, canonical) !== canonical) return refusal("workspace-not-worktree-root");
  return Object.freeze({ decision: "confined", canonicalRoot: canonical });
}

/**
 * EAT-R022 and EAT-R026: the identity of a clean worktree, measured by the host, in this order. canonicalRoot must be the root
 * git reports for it, by realpath; git must report the same Git directory for it as when it is told the workspace's own .git
 * (--git-dir=<root>/.git), so a reader whose environment points git at another repository is refused; HEAD must name a commit
 * and a tree; every index entry must be listed with the tag "H " by git ls-files -v (git status does not read the working-tree
 * file of an entry flagged assume-unchanged or skip-worktree, and an unmerged entry has no single staged version, so such an
 * identity is unmeasurable rather than clean); git status (see SourceDirtiness) must list no record; and the gate manifest must
 * be available (see gateManifestOf).
 * HEAD equality alone never admits.
 */
export function measureSourceIdentity(canonicalRoot: string, gateManifest: string, git: SourceGitReader): SourceMeasurement {
  if (!absolutePath(canonicalRoot) || !cleanText(gateManifest) || typeof git !== "function") return refusal("malformed-request");
  if (worktreeRoot(git, canonicalRoot) !== canonicalRoot) return refusal("source-unmeasurable");
  const reported = readLine(git, canonicalRoot, ["rev-parse", "--absolute-git-dir"]);
  const own = readLine(git, canonicalRoot, [`--git-dir=${join(canonicalRoot, ".git")}`, "rev-parse", "--absolute-git-dir"]);
  if (reported === undefined || reported !== own) return refusal("source-unmeasurable");
  const commit = readLine(git, canonicalRoot, ["rev-parse", "--verify", "--quiet", "HEAD^{commit}"]);
  const tree = readLine(git, canonicalRoot, ["rev-parse", "--verify", "--quiet", "HEAD^{tree}"]);
  if (commit === undefined || tree === undefined || !OBJECT_ID.test(commit) || !OBJECT_ID.test(tree)) return refusal("source-unmeasurable");
  const index = read(git, canonicalRoot, ["ls-files", "-v", "-z"]);
  if (index === undefined || records(index).some(entry => !entry.startsWith("H "))) return refusal("source-unmeasurable");
  const status = read(git, canonicalRoot, ["status", "--porcelain=v1", "-z", "--untracked-files=all", "--ignore-submodules=none", "--no-renames"]);
  if (status === undefined) return refusal("source-unmeasurable");
  const dirty = dirtiness(status);
  if (dirty.tracked + dirty.staged + dirty.untracked > 0) return Object.freeze({ ...refusal("dirty-base"), dirty });
  const manifest = gateManifestOf(canonicalRoot, gateManifest);
  if (manifest === undefined) return refusal("gate-manifest-unavailable");
  const basis: Omit<SourceIdentity, "digest"> = { canonicalRoot, commit, tree, dirtiness: "clean", gateManifest: manifest };
  const identity: SourceIdentity = Object.freeze({ ...basis, digest: identityDigest(SOURCE_IDENTITY_DOMAIN, basis) });
  measuredIdentities.add(identity);
  return Object.freeze({ decision: "measured", identity });
}

/**
 * The host's attestation channel (EAT-R027). The operator attests one write boundary: one measured identity of one canonical
 * workspace, by a clean operator id. Only an object this instance minted is an attestation: an equal-shaped copy (a JSON policy
 * member, a spread) and another instance's attestation are not.
 */
export class WriteBoundaryAuthority {
  readonly #minted = new WeakSet<object>();

  attest(operatorId: string, identity: SourceIdentity): WriteBoundaryAttestation {
    if (!cleanText(operatorId)) throw new CapabilityError("validation", "A write boundary attestation names its operator.");
    if (!measuredIdentities.has(identity)) throw new CapabilityError("validation", "Only a source identity this host measured can be attested.");
    const attestation: WriteBoundaryAttestation = Object.freeze({ operatorId, workspace: identity.canonicalRoot, sourceIdentity: identity.digest });
    this.#minted.add(attestation);
    return attestation;
  }

  minted(value: unknown): value is WriteBoundaryAttestation {
    return typeof value === "object" && value !== null && this.#minted.has(value);
  }
}

/**
 * EAT-R024: at most one writer per canonical workspace root in this host. The registry is keyed by the canonical root the
 * admission measured, never by the caller's spelling of the workspace. A lease is released only by presenting the very object
 * acquire returned while it still holds the root, so a stale lease, or a copy naming the same root and invocation, never frees
 * the root for another writer.
 */
export class WriterLeases {
  readonly #held = new Map<string, WriterLease>();

  /** Throws unless canonicalRoot is an absolute path and invocationId is clean text; undefined while the root is held. */
  acquire(canonicalRoot: string, invocationId: string): WriterLease | undefined {
    if (!absolutePath(canonicalRoot) || !cleanText(invocationId)) throw new CapabilityError("validation", "A writer lease names a canonical workspace root and an invocation.");
    if (this.#held.has(canonicalRoot)) return undefined;
    const lease: WriterLease = Object.freeze({ canonicalRoot, invocationId });
    this.#held.set(canonicalRoot, lease);
    return lease;
  }

  release(lease: WriterLease): boolean {
    if (this.#held.get(lease.canonicalRoot) !== lease) return false;
    this.#held.delete(lease.canonicalRoot);
    return true;
  }

  holder(canonicalRoot: string): string | undefined {
    return this.#held.get(canonicalRoot)?.invocationId;
  }
}

/**
 * The JSON policy asks for writes only when it is a plain object (see plainObject) with an own allowWrites data member whose
 * value is exactly true; an accessor is never called. It never authorizes them.
 */
function writesRequested(policy: unknown): boolean {
  if (!plainObject(policy)) return false;
  const member = Object.getOwnPropertyDescriptor(policy, "allowWrites");
  return member !== undefined && Object.hasOwn(member, "value") && member.value === true;
}

function boundaryOf(host: SourceAdmissionHost, identity: SourceIdentity): { readonly decision: "attested"; readonly operatorId: string } | SourceAdmissionRefusal {
  const attestation = host.attestation;
  if (!host.authority.minted(attestation)) return refusal("attestation-absent");
  if (attestation.workspace !== identity.canonicalRoot) return refusal("attestation-other-workspace");
  if (attestation.sourceIdentity !== identity.digest) return refusal("attestation-stale");
  return { decision: "attested", operatorId: attestation.operatorId };
}

/**
 * Admits one write against the host-measured source identity and calls dispatch at most once, with the only grant it mints,
 * by the rules and in the order the module comment lists.
 */
export async function admitSourceWrite<T>(request: SourceWriteRequest, host: SourceAdmissionHost, dispatch: (grant: SourceWriteGrant) => Promise<T>): Promise<SourceAdmissionOutcome<T>> {
  if (!plainObject(request) || !cleanText(request.invocationId) || typeof dispatch !== "function") return refusal("malformed-request");
  if (host.signal?.aborted) return refusal("admission-cancelled");
  if (!writesRequested(request.policy)) return refusal("writes-not-requested");
  const confined = confineWorkspace(host.authorizedRoot, request.workspace, host.git);
  if (confined.decision === "refused") return confined;
  const admitted = measureSourceIdentity(confined.canonicalRoot, host.gateManifest, host.git);
  if (admitted.decision === "refused") return admitted;
  const boundary = boundaryOf(host, admitted.identity);
  if (boundary.decision === "refused") return boundary;
  const lease = host.leases.acquire(admitted.identity.canonicalRoot, request.invocationId);
  if (lease === undefined) return refusal("writer-held");
  try {
    if (host.admissionWait !== undefined) {
      try {
        await host.admissionWait(host.signal);
      } catch {
        return refusal(host.signal?.aborted ? "admission-cancelled" : "admission-refused");
      }
    }
    if (host.signal?.aborted) return refusal("admission-cancelled");
    // EAT-R025: the identity a write is admitted against is measured after the last await, never only before it.
    const current = measureSourceIdentity(admitted.identity.canonicalRoot, host.gateManifest, host.git);
    if (current.decision === "refused" || current.identity.digest !== admitted.identity.digest) return refusal("source-changed");
    const attested = boundaryOf(host, current.identity);
    if (attested.decision === "refused") return attested;
    const grant: SourceWriteGrant = Object.freeze({ invocationId: request.invocationId, identity: current.identity, operatorId: attested.operatorId, lease });
    const value = await dispatch(grant);
    return Object.freeze({ decision: "dispatched", identity: current.identity, value });
  } finally {
    host.leases.release(lease);
  }
}
