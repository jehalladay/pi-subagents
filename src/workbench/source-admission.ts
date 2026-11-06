/**
 * source-admission.ts: host-owned write admission against an immutable source identity (wb-s8rm, the B-source bead of the
 * mechanical-workflows-interop-2026-11-04 program, slice PI-1, requirements EAT-R022..EAT-R027; the program is design-only and
 * its function host does not exist yet).
 *
 * A write-capable dispatch, such as a function host's implement callback, runs through admitSourceWrite. In order:
 * - the caller's workspace path is a locator, never authority: it is resolved by realpath and must be the root of its own Git
 *   worktree inside the host's authorized root, judged by path containment and never by a string prefix (EAT-R023);
 * - the host measures the source identity itself: the canonical worktree root read through the repository its own .git names,
 *   the HEAD commit and tree, an index and working tree with no tracked, staged or untracked edit and no index entry hidden
 *   from git status, and the gate manifest's SHA-256 over its bytes (EAT-R022, EAT-R026);
 * - an operator attestation that this host's WriteBoundaryAuthority minted for exactly that workspace and identity is required;
 *   the request's JSON policy may ask for writes (allowWrites: true) and never grants them (EAT-R027);
 * - one writer lease per canonical workspace root is taken, and only the admission that took a lease releases it (EAT-R024);
 * - after the host's asynchronous admission wait the identity and the attestation are read again, immediately before the
 *   dispatch, so a basis that moved while the admission waited refuses (EAT-R025).
 * Every refusal is returned before the dispatch is called, with one fixed reason per code and never caller text.
 *
 * Boundaries: the module launches nothing. Git is read through the host's SourceGitReader, handed the argv this module builds
 * (optional locks off, core.fsmonitor and core.untrackedCache pinned off); a reader that points git at another repository is
 * refused because the repository git reports must be the one the workspace's .git names. Nothing here reads a clock or writes
 * a file. Not wired yet: workflow_execute still refuses a function definition (execute-tool.ts, unsupported-definition-kind)
 * until the dispatch bead composes this seam. One WriterLeases registry binds the writers of one host process.
 */
import { createHash } from "node:crypto";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { CapabilityError, type JsonValue } from "./capability-registry.js";
import { identityDigest } from "./identity.js";

/** The identityDigest domain of a SourceIdentity's digest. */
export const SOURCE_IDENTITY_DOMAIN = "source-identity";

/**
 * The host's read-only Git reader: runs git in `directory` with exactly `args` and returns its stdout, or undefined when git
 * cannot answer (absent, failing or timed out). The host owns the process and its environment.
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

/** Counts of the edits git status reports: tracked and not staged, staged, and untracked (ignored paths are not counted). */
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
/** The measured identity of one clean workspace. Only measureSourceIdentity mints one that an authority will attest. */
export interface SourceIdentity {
  readonly canonicalRoot: string;
  readonly commit: string;
  readonly tree: string;
  readonly dirtiness: "clean";
  /** Workspace-relative path (POSIX separators) of the gate manifest and the SHA-256 of its bytes. */
  readonly gateManifest: { readonly path: string; readonly sha256: string };
  /** identityDigest(SOURCE_IDENTITY_DOMAIN, every member above). */
  readonly digest: string;
}
export type SourceMeasurement = { readonly decision: "measured"; readonly identity: SourceIdentity } | SourceAdmissionRefusal;
export type WorkspaceConfinement = { readonly decision: "confined"; readonly canonicalRoot: string } | SourceAdmissionRefusal;
/** One operator-attested write boundary: one measured identity of one canonical workspace. */
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
  /** The host-minted logical invocation reference. */
  readonly invocationId: string;
  /** The caller's absolute workspace path: a locator, never authority. */
  readonly workspace: string;
  /** The caller's JSON policy: allowWrites: true asks for writes and never authorizes them. */
  readonly policy?: JsonValue;
}
/** What only the host supplies. Nothing here is read from the request. */
export interface SourceAdmissionHost {
  /** The root the host authorized writes under; the workspace must resolve inside it. */
  readonly authorizedRoot: string;
  /** The gate manifest the identity binds, relative to the workspace root. */
  readonly gateManifest: string;
  readonly git: SourceGitReader;
  readonly authority: WriteBoundaryAuthority;
  /** The operator's attestation from the host's own channel. Read again after the admission wait, so withdrawing it refuses. */
  attestation?: WriteBoundaryAttestation;
  readonly leases: WriterLeases;
  readonly signal?: AbortSignal;
  /** The host's asynchronous admission wait (queue, budget or operator); the source is measured again after it settles. */
  readonly admissionWait?: (signal: AbortSignal | undefined) => Promise<void>;
}
/** The one child write capability this module mints, handed to the dispatch and to nothing else. */
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
  "source-unmeasurable": "the source identity cannot be measured: no canonical worktree root, a repository other than the one its .git names, no HEAD, or an index entry hidden from git status",
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

const OBJECT_ID = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/;
const TEXT_BYTES = 4096;
const GATE_MANIFEST_BYTES = 1024 * 1024;
const GITFILE_BYTES = 4096;
/** Global options on every measurement: no optional index write, and no hook or stored memo answering for the working tree. */
const GIT_MEASURE_OPTIONS: readonly string[] = ["--no-optional-locks", "-c", "core.fsmonitor=false", "-c", "core.untrackedCache=false"];

/** Every SourceIdentity measureSourceIdentity minted; an authority attests no other object. */
const measuredIdentities = new WeakSet<SourceIdentity>();

function refusal(code: SourceAdmissionCode): SourceAdmissionRefusal {
  return Object.freeze({ decision: "refused", code, reason: REASONS[code] });
}

function plainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/** Bounded, non-blank text with no control character. */
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

/** The reader's answer for one measurement; a reader that throws is a reader that cannot answer. */
function read(git: SourceGitReader, directory: string, args: readonly string[]): Buffer | undefined {
  try {
    const output = git(directory, [...GIT_MEASURE_OPTIONS, ...args]);
    return Buffer.isBuffer(output) ? output : undefined;
  } catch {
    return undefined;
  }
}

function readLine(git: SourceGitReader, directory: string, args: readonly string[]): string | undefined {
  const output = read(git, directory, args)?.toString("utf8");
  return output?.endsWith("\n") ? output.slice(0, -1) : output;
}

function records(output: Buffer): string[] {
  return output.toString("utf8").split("\0").filter(record => record !== "");
}

/** The canonical root of the worktree that contains directory, by realpath; undefined outside any worktree. */
function worktreeRoot(git: SourceGitReader, directory: string): string | undefined {
  const top = readLine(git, directory, ["rev-parse", "--show-toplevel"]);
  return top === undefined || top === "" ? undefined : realpathOf(top);
}

/** The repository directory the worktree's own .git names: the directory itself, or a gitfile's `gitdir:` target. */
function ownGitDirectory(root: string): string | undefined {
  const dotGit = join(root, ".git");
  try {
    const stat = lstatSync(dotGit);
    if (stat.isDirectory()) return realpathOf(dotGit);
    if (!stat.isFile() || stat.size > GITFILE_BYTES) return undefined;
    const match = /^gitdir: (.+?)\r?\n?$/.exec(readFileSync(dotGit, "utf8"));
    return match?.[1] === undefined ? undefined : realpathOf(resolve(root, match[1]));
  } catch {
    return undefined;
  }
}

/** Counts git status -z porcelain v1 records (renames off): "??" is untracked, X is staged, Y is tracked and not staged. */
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
 * The gate manifest's workspace-relative path (POSIX separators) and SHA-256, read by bytes whether Git tracks it or not.
 * Undefined when it is missing, leaves the workspace by path or by symlink, is not a regular file or exceeds its bound.
 */
function gateManifestOf(root: string, manifest: string): { readonly path: string; readonly sha256: string } | undefined {
  if (isAbsolute(manifest)) return undefined;
  const declared = resolve(root, manifest);
  if (declared === root || !contains(root, declared)) return undefined;
  const real = realpathOf(declared);
  if (real === undefined || real === root || !contains(root, real)) return undefined;
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
 * EAT-R023: the canonical root of the caller's workspace. The path must be absolute (a relative one would resolve against Pi's
 * own directory), resolve by realpath inside the authorized root, and be the root of its own Git worktree, so a subdirectory of
 * a wider checkout is refused.
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
 * EAT-R022 and EAT-R026: the identity of a clean worktree, measured by the host. canonicalRoot must already be canonical (as
 * confineWorkspace returns it), be its worktree's root, and be read through the repository its own .git names. Dirtiness is
 * git status over tracked, staged and untracked paths; an index entry flagged assume-unchanged or skip-worktree, or unmerged,
 * keeps the working tree from that reading, so such an identity is unmeasurable rather than clean. HEAD equality alone never
 * admits.
 */
export function measureSourceIdentity(canonicalRoot: string, gateManifest: string, git: SourceGitReader): SourceMeasurement {
  if (!absolutePath(canonicalRoot) || !cleanText(gateManifest) || typeof git !== "function") return refusal("malformed-request");
  if (realpathOf(canonicalRoot) !== canonicalRoot || worktreeRoot(git, canonicalRoot) !== canonicalRoot) return refusal("source-unmeasurable");
  const gitDirectory = readLine(git, canonicalRoot, ["rev-parse", "--absolute-git-dir"]);
  const own = ownGitDirectory(canonicalRoot);
  if (gitDirectory === undefined || own === undefined || realpathOf(gitDirectory) !== own) return refusal("source-unmeasurable");
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
 * workspace. Only an object this instance minted is an attestation: an equal-shaped copy (a JSON policy member, a spread) and
 * another instance's attestation are not.
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
 * admission measured, never by the caller's spelling of the workspace, and a lease is released only by presenting that lease,
 * so a stale or foreign lease never frees the root for another writer.
 */
export class WriterLeases {
  readonly #held = new Map<string, WriterLease>();

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

/** The JSON policy asks for writes only with an own allowWrites data member that is exactly true; it never authorizes them. */
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
 * Admits one write against the host-measured source identity and calls dispatch at most once, with the only grant it mints.
 * Rules apply in order and the first refusal wins: request shape, cancellation, the write request, confinement, measurement,
 * attestation and the writer lease; then the host's admission wait, cancellation, a fresh measurement that must equal the
 * admitted identity, and the attestation again. The lease is released when the admission refuses or the dispatch settles,
 * and a dispatch error propagates unchanged.
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
