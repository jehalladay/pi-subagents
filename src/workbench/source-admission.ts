/**
 * source-admission.ts: host-owned write admission against a measured source identity (wb-s8rm, the B-source bead of the
 * mechanical-workflows-interop-2026-11-04 program, slice PI-1, requirements EAT-R022..EAT-R027; the program is design-only and
 * its function host does not exist yet). The header of test/workbench-mechanical-source-admission.test.ts names the case that
 * pins each form these comments state, the residual family whose quiet rows it pins, and the forms it does not claim.
 *
 * admitSourceWrite(request, host, dispatch) calls dispatch at most once, with the one grant it mints, after the rules below
 * pass; a request that fails one of them gets that rule's refusal, and dispatch is not called. When a request fails two rules,
 * the refusal is the earlier rule's for the clause pairs the suite header's rule-order cases fail (one case for each adjacent
 * pair of rules); which refusal answers for any other pair of failing clauses (rule 1's plain-object and dispatch clauses
 * against rule 2's cancellation among them) is NOT CLAIMED. The rules, numbered as the rule-order cases name them:
 * 1. request shape (malformed-request): request is a plain object whose invocationId is clean text, and dispatch is a function;
 * 2. cancellation (admission-cancelled): host.signal is not aborted;
 * 3. the write request (writes-not-requested): request.policy asks for writes (see writesRequested for the policies the suite
 *    pins); asking grants nothing;
 * 4. confinement (EAT-R023): confineWorkspace(host.authorizedRoot, request.workspace, host.git) answers confined, else its
 *    refusal is returned;
 * 5. measurement (EAT-R022, EAT-R026): measureSourceIdentity(the confined canonical root, host.gateManifest, host.git) answers
 *    measured, else its refusal is returned;
 * 6. attestation (EAT-R027): host.attestation is an object host.authority minted (attestation-absent), whose workspace is that
 *    canonical root (attestation-other-workspace) and whose sourceIdentity is that identity's digest (attestation-stale);
 * 7. the writer lease (EAT-R024, writer-held): host.leases.acquire(that canonical root, request.invocationId) returns a lease;
 *    while inv-a's lease holds that root, the suite's admissions of inv-b and inv-c there do not get one (see WriterLeases),
 *    and what an admission of any other invocation id meets while a lease holds the root (the holder's own id, or one that
 *    differs from it only in letter case, among them) is NOT CLAIMED;
 * 8. the admission wait: host.admissionWait, when set, is called with host.signal and resolves; a rejection refuses
 *    admission-cancelled when host.signal is aborted by then and admission-refused otherwise;
 * 9. cancellation (admission-cancelled): host.signal is not aborted;
 * 10. the fresh measurement (EAT-R025, source-changed): measureSourceIdentity of that root answers measured, with the digest of
 *    the identity rule 5 measured;
 * 11. the attestation read again: rule 6's checks and codes, against the fresh identity.
 * The lease rule 7 takes is released when a later rule refuses and when dispatch settles; an error dispatch throws propagates
 * unchanged. A refusal carries the fixed reason of its code (REASONS) and, on dirty-base only, the counts.
 *
 * Git is read through host.git (a SourceGitReader), and every argv the module passes it starts with --no-optional-locks -c
 * core.fsmonitor=false -c core.untrackedCache=false. Not wired yet: workflow_execute still refuses a function definition
 * (execute-tool.ts, unsupported-definition-kind) until the dispatch bead composes this seam. One WriterLeases registry binds the
 * writers of one host process.
 */
import { createHash } from "node:crypto";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { CapabilityError, type JsonValue } from "./capability-registry.js";
import { identityDigest } from "./identity.js";

/** The identityDigest domain of a SourceIdentity's digest. */
export const SOURCE_IDENTITY_DOMAIN = "source-identity";

/**
 * The host's Git reader: it runs git in `directory` with `args` and returns git's stdout, or undefined when git cannot answer.
 * The host owns the process and its environment. The module reads a throw, or an answer that is not a Buffer, as no answer.
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
 * Counts of the NUL-separated records of the measurement's git status call (status --porcelain=v1 -z --untracked-files=all
 * --ignore-submodules=none --no-renames, after the global options): untracked counts the records whose two status columns are
 * both "?", staged the other records whose first (index) column is not a space, and tracked the other records whose second
 * (worktree) column is not a space, so one record can count as staged and as tracked. A path git status does not list is not
 * counted.
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
 * What measureSourceIdentity answers for a workspace it measured: frozen, with its gateManifest member frozen. dirtiness "clean"
 * records that the measurement's git status call listed no record (see SourceDirtiness). Only measureSourceIdentity mints one
 * that an authority will attest.
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
  /** The invocation reference: clean text (see cleanText). */
  readonly invocationId: string;
  /** The caller's absolute workspace path; rule 4 confines it. */
  readonly workspace: string;
  /** The caller's JSON policy: rule 3 reads whether it asks for writes (see writesRequested), and asking grants nothing. */
  readonly policy?: JsonValue;
}
/** What the host supplies. */
export interface SourceAdmissionHost {
  /** The absolute path of the root the host authorized writes under; rule 4 judges the workspace against its realpath. */
  readonly authorizedRoot: string;
  /** The gate manifest the identity binds: a path relative to the workspace root (see gateManifestOf). */
  readonly gateManifest: string;
  readonly git: SourceGitReader;
  readonly authority: WriteBoundaryAuthority;
  /** The operator's attestation from the host's own channel: rule 6 reads it, and rule 11 reads it again after the wait. */
  attestation?: WriteBoundaryAttestation;
  readonly leases: WriterLeases;
  readonly signal?: AbortSignal;
  /** The host's asynchronous admission wait (queue, budget or operator): rule 8. */
  readonly admissionWait?: (signal: AbortSignal | undefined) => Promise<void>;
}
/** The one child write capability this module mints: frozen, and passed to dispatch; the outcome carries no grant. */
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
  "workspace-not-worktree-root": "git does not report the workspace as the root of its own worktree",
  "source-unmeasurable": "the source identity cannot be measured: git does not answer a measurement call, or reports another worktree root, another Git directory than the workspace's .git, no object id for HEAD's commit or tree, or an index entry tagged other than H",
  "dirty-base": "git status lists tracked, staged or untracked edits of the implementation base",
  "gate-manifest-unavailable": "the gate manifest path is absolute or leaves the workspace, or what it names is missing, unreadable, not a regular file or over its bound",
  "attestation-absent": "the host holds no operator attestation that its authority minted",
  "attestation-other-workspace": "the operator attestation names another workspace",
  "attestation-stale": "the operator attestation names another source identity of this workspace",
  "writer-held": "the writer lease of this canonical workspace is held",
  "admission-cancelled": "the invocation was cancelled during admission",
  "admission-refused": "the host admission wait refused the invocation",
  "source-changed": "the source identity measured after the admission wait is not the admitted one",
});

/** A commit or tree object id: 40 (SHA-1) or 64 (SHA-256) lowercase hex digits. */
const OBJECT_ID = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/;
/** The clean-text bound: 4096 UTF-8 bytes. */
const TEXT_BYTES = 4096;
/** The gate manifest bound: 1 MiB (1048576 bytes). */
const GATE_MANIFEST_BYTES = 1024 * 1024;
/** The global options that open every argv the module passes the reader: --no-optional-locks (no optional index write), core.fsmonitor and core.untrackedCache off. */
const GIT_MEASURE_OPTIONS: readonly string[] = ["--no-optional-locks", "-c", "core.fsmonitor=false", "-c", "core.untrackedCache=false"];

/** Every SourceIdentity measureSourceIdentity minted; an authority attests no other object. */
const measuredIdentities = new WeakSet<SourceIdentity>();

function refusal(code: SourceAdmissionCode): SourceAdmissionRefusal {
  return Object.freeze({ decision: "refused", code, reason: REASONS[code] });
}

/**
 * An object whose prototype is Object.prototype or null; an array whose prototype is Array.prototype is not one. Whether an
 * array whose prototype is Object.prototype or null is one is NOT CLAIMED.
 */
function plainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/**
 * Clean text, in the forms the suite pins: a string is not clean text when String.prototype.trim() reduces it to "", when it is
 * over 4096 UTF-8 bytes, or when it holds a code point in U+0000-U+001F or U+007F; the four 4096-byte GEN-CLEAN-TEXT references
 * and the GEN-CLEAN-TEXT-FORMS strings are clean text. Whether any other string is clean text (one holding another code point
 * inside its content, U+200B or the bidi controls U+061C, U+200E, U+200F, U+202A-U+202E and U+2066-U+2069 among them) is NOT
 * CLAIMED.
 */
function cleanText(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "" && Buffer.byteLength(value) <= TEXT_BYTES && !/[\u0000-\u001f\u007f]/.test(value);
}

function absolutePath(value: unknown): value is string {
  return cleanText(value) && isAbsolute(value);
}

/**
 * Whether path is root or inside it, judged by path.relative(root, path) and never by a string prefix: "" (root itself) is
 * inside, and ".." or a relative path that starts with "../" is outside, so a sibling that only shares root's prefix is outside.
 * The other relative paths the suite plants are inside, among them a workspace named "..ws" (R023-DOTDOT-NAME) and the two
 * manifest paths that start with ".." (R026-DOTDOT-MANIFEST); whether every other relative path is inside (a name such as
 * "...ws" among them) is NOT CLAIMED.
 */
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
 * The gate manifest measured by its bytes, whether Git tracks it or ignores it. Undefined when the declared path is absolute,
 * when it leaves the workspace by path or its realpath leaves it, when what it names is missing or unreadable, when that is not a
 * regular file, or when it holds more than 1 MiB.
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
 * EAT-R023: the canonical root of the caller's workspace, judged by these clauses: authorizedRoot and workspace are absolute
 * clean text and git is a function (malformed-request); both resolve by realpath (workspace-unresolvable); the workspace's
 * realpath is the authorized root's realpath or inside it, judged by contains and never by a string prefix
 * (workspace-outside-root); and it is the root git reports for it, so a subdirectory of a worktree is refused
 * (workspace-not-worktree-root). The calls the suite pins, with every argument a call does not name valid: a path that is not
 * absolute clean text in a form the suite plants (a relative path, one holding U+000A, one over 4096 UTF-8 bytes, a value that
 * is not a string), none of which resolves by realpath, refuses malformed-request, as does a git that is a string; a missing
 * workspace or authorized root refuses workspace-unresolvable; a workspace outside the root refuses workspace-outside-root, also
 * when it is a subdirectory of its own worktree; and a subdirectory of a worktree, or a reader that throws or answers with no
 * Buffer, refuses workspace-not-worktree-root. Which refusal answers any other call is NOT CLAIMED, among them a path that is
 * not absolute clean text yet resolves by realpath, a git that is not a function beside a path that does not resolve or a
 * workspace outside the root, and a workspace that is not absolute clean text beside an authorized root that does not resolve.
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
 * EAT-R022 and EAT-R026: measures one workspace through the reader, judged by these clauses: canonicalRoot is absolute clean
 * text, the gate manifest clean text and git a function (malformed-request); each refusing source-unmeasurable, the root git
 * reports for canonicalRoot is canonicalRoot by realpath, git reports the same Git directory plainly and with
 * --git-dir=<canonicalRoot>/.git (so a reader whose GIT_DIR names another repository is refused), HEAD^{commit} and
 * HEAD^{tree} answer object ids, every entry git ls-files -v -z lists carries the tag "H " (assume-unchanged, skip-worktree and
 * unmerged entries carry other tags), and git status answers; git status lists no record (dirty-base, with the counts: see
 * SourceDirtiness); and the gate manifest measures (gate-manifest-unavailable; see gateManifestOf). Dirtiness is read from git
 * status alone, so an edit git status does not list is measured clean (the suite's residual family UNLISTED-EDITS pins two such
 * edits). HEAD equality alone never admits. The calls the suite pins, with every argument a call does not name valid: a
 * relative canonicalRoot or one that is not a string, and a git that is a string, refuse malformed-request (each also fails the
 * worktree-root clause), and so does a gate manifest that is not clean text in a form the suite plants on the clean worktree
 * ws, none of which measures; each source-unmeasurable clause refuses when it is the one that fails, and so do an unmerged entry
 * that git status lists and a symlink alias of the worktree root whose declared manifest resolves outside it; a git status
 * record refuses dirty-base, also when the gate manifest is missing; and a manifest the suite plants that does not measure
 * refuses gate-manifest-unavailable. Which refusal answers any other call is NOT CLAIMED, among them a gate manifest that is not
 * clean text beside a failing clause other than its own measurement (a root that is not the worktree root, a misreporting or
 * silent reader, or a dirty base) and an absolute canonicalRoot that is not clean text.
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
 * The host's attestation channel (EAT-R027). attest(operatorId, identity) mints a frozen attestation naming the identity's
 * canonical root and digest, and throws a validation CapabilityError unless operatorId is clean text and measureSourceIdentity
 * minted the identity. minted(value) is true only for an attestation this instance minted: an equal-shaped copy (a JSON policy
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
 * EAT-R024: the host's writer leases, keyed by canonical root. acquire grants a root's lease while no lease holds that root; while
 * inv-a's lease holds a root, it answers undefined to the suite's inv-b and inv-c, and what it answers any other invocation id
 * while a lease holds the root (the holder's own id, or one that differs from it only in letter case, among them) is NOT
 * CLAIMED. Leases of different roots are independent, so taking or releasing one root's lease leaves every other root's as it
 * was. release frees a root only for the very object acquire returned while it still holds that root, so a released lease, or a
 * copy naming the same root and invocation, frees nothing. admitSourceWrite keys the lease by the canonical root it measured,
 * never by the caller's spelling of the workspace.
 */
export class WriterLeases {
  readonly #held = new Map<string, WriterLease>();

  /** Throws a validation CapabilityError unless canonicalRoot is absolute clean text and invocationId is clean text. */
  acquire(canonicalRoot: string, invocationId: string): WriterLease | undefined {
    if (!absolutePath(canonicalRoot) || !cleanText(invocationId)) throw new CapabilityError("validation", "A writer lease names a canonical workspace root and an invocation.");
    if (this.#held.has(canonicalRoot)) return undefined;
    const lease: WriterLease = Object.freeze({ canonicalRoot, invocationId });
    this.#held.set(canonicalRoot, lease);
    return lease;
  }

  /** True when it freed the root. */
  release(lease: WriterLease): boolean {
    if (this.#held.get(lease.canonicalRoot) !== lease) return false;
    this.#held.delete(lease.canonicalRoot);
    return true;
  }

  /** The invocation id of the lease that holds canonicalRoot, or undefined. */
  holder(canonicalRoot: string): string | undefined {
    return this.#held.get(canonicalRoot)?.invocationId;
  }
}

/**
 * The JSON policy asks for writes only when it is a plain object (see plainObject) with an own allowWrites data member whose
 * value is exactly true; an accessor is never called. It never authorizes them. The suite pins two policies that ask,
 * { allowWrites: true } and its null-prototype copy; whether any other plain object with an own allowWrites data member true
 * asks (a non-enumerable, non-writable or frozen member, or an object with other members, among them) is NOT CLAIMED.
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

/** Admits one write by the rules the module comment lists. */
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
    // Rule 10 (EAT-R025): the root is measured again after the admission wait.
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
