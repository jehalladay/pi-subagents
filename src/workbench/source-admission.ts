/**
 * source-admission.ts: host-owned write admission against a measured source identity (wb-s8rm, the B-source bead of the
 * mechanical-workflows-interop-2026-11-04 program, slice PI-1, requirements EAT-R022..EAT-R027; the program is design-only and
 * its function host does not exist yet). The header of test/workbench-mechanical-source-admission.test.ts names the case that
 * pins each form these comments state, the residual family whose quiet rows it pins, and the forms it does not claim, except
 * for the reservation-store form of WriterLeases (EAT-R399, wb-yk1k: new WriterLeases({ store }), the constructor's options,
 * acquire, holder and release with a store, and reservationPath), whose pinning cases and NOT CLAIMED forms the header of
 * test/workbench-mii-cross-pid-reservation.test.ts names; the WriterLeases comment and the comments of its constructor, of
 * acquire and of reservationPath cite those cases by id.
 *
 * admitSourceWrite(request, host, dispatch) calls dispatch at most once, with the one grant it mints, after the rules below
 * pass; a request that fails one of them in a form a suite header entry plants through admitSourceWrite gets that rule's
 * refusal, and dispatch is not called, and what a request that fails a rule in any other form gets is NOT CLAIMED. When a
 * request fails two rules, the refusal is the earlier rule's for the clause pairs the suite header's rule-order cases fail
 * (one case for each adjacent pair of rules, and GEN-ORDER-PLAIN-CANCEL and GEN-ORDER-DISPATCH-CANCEL for rule 1's
 * plain-object and dispatch clauses against rule 2's cancellation, in the forms they plant); which refusal answers for any
 * other pair of failing clauses is NOT CLAIMED. The rules, numbered as the rule-order cases name them:
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
 *    while inv-a's lease holds that root, the suite's admissions there of inv-b, inv-c, inv-a itself (on ws and through a
 *    symlink alias) and INV-A do not get one (see WriterLeases), and what an admission of any other invocation id meets
 *    while a lease holds the root is NOT CLAIMED;
 * 8. the admission wait: host.admissionWait, when set, is called and resolves - in the forms the suite plants it is called
 *    once with one argument, host.signal (the very AbortSignal while host.signal is set and not aborted, undefined when it is
 *    unset), and what it is called with in any other form is NOT CLAIMED; a rejection refuses admission-cancelled when
 *    host.signal is aborted by then and admission-refused otherwise (host.signal unset, or set and not aborted);
 * 9. cancellation (admission-cancelled): host.signal is not aborted;
 * 10. the fresh measurement (EAT-R025, source-changed): measureSourceIdentity of that root answers measured, with the digest of
 *    the identity rule 5 measured;
 * 11. the attestation read again: host.attestation as it is after the wait, in the forms the suite plants by replacing it
 *    while the admission waits - none, an equal-shaped copy and another authority's attestation refuse attestation-absent,
 *    the authority's attestation of another workspace refuses attestation-other-workspace and its attestation of another
 *    identity of that root attestation-stale (rule 6's codes, judged against the fresh identity, whose canonical root and
 *    digest are rule 5's), and its attestation of that identity by another operator dispatches with that operator; what any
 *    other attestation found at the re-read gets is NOT CLAIMED.
 * The lease rule 7 takes is released when a later rule refuses and when dispatch settles; an error dispatch throws propagates
 * unchanged. A refusal carries the fixed reason of its code (REASONS) and, on dirty-base only, the counts.
 *
 * Git is read through host.git (a SourceGitReader), and every argv the module passes it starts with --no-optional-locks -c
 * core.fsmonitor=false -c core.untrackedCache=false. Not wired yet: workflow_execute still refuses a function definition
 * (execute-tool.ts, unsupported-definition-kind) until the dispatch bead composes this seam. A WriterLeases registry without a
 * store binds the writers of one host process; registries in two processes configured with one reservation store hold one
 * lease between them for one canonical root, in the forms test/workbench-mii-cross-pid-reservation.test.ts pins (EAT-R399;
 * see WriterLeases).
 */
import { createHash, randomBytes } from "node:crypto";
import { closeSync, fsyncSync, linkSync, lstatSync, openSync, readFileSync, realpathSync, unlinkSync, writeSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { CapabilityError, type JsonValue } from "./capability-registry.js";
import { identityDigest } from "./identity.js";

/** The identityDigest domain of a SourceIdentity's digest. */
export const SOURCE_IDENTITY_DOMAIN = "source-identity";

/**
 * The host's Git reader: it runs git in `directory` with `args` and returns git's stdout, or undefined when git cannot answer.
 * The host owns the process and its environment. The module reads a throw, or an answer for which Buffer.isBuffer is false, as
 * no answer, in the forms the suite plants: a throw or a string at every call; git's bytes at every call as a Uint8Array, an
 * ArrayBuffer, a DataView, an array of byte values or an object whose toString answers git's text; and undefined, a throw, a
 * string, a Uint8Array or such an object at one call of a measurement alone. Whether any other answer that is not a Buffer is
 * no answer is NOT CLAIMED.
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
 * An object whose prototype is Object.prototype or null and that is not an array: the suite plants arrays whose prototype is
 * Array.prototype, Object.prototype or null (GEN-MALFORMED-SHAPES, R027-NOT-REQUESTED, GEN-ARRAY-PROTOTYPES), and none is one.
 * Whether any other array is one is NOT CLAIMED.
 */
function plainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/**
 * Clean text, in the forms the suite pins: a string is not clean text when String.prototype.trim() reduces it to "", when it is
 * over 4096 UTF-8 bytes, or when it holds a code point in U+0000-U+001F or U+007F; the four 4096-byte GEN-CLEAN-TEXT references,
 * the GEN-CLEAN-TEXT-FORMS strings and, for every code point outside U+0000-U+001F and U+007F (U+200B, the bidi controls
 * U+061C, U+200E, U+200F, U+202A-U+202E and U+2066-U+2069, and the lone surrogates among them), the text "a", that code point,
 * "b" (GEN-CLEAN-TEXT-SCAN) are clean text. Whether any other string is clean text (one holding two such code points inside its
 * content, or one at an end, among them) is NOT CLAIMED.
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
 * The other relative paths the suite plants are inside, among them the workspaces named "..ws" (R023-DOTDOT-NAME) and "...ws",
 * "..." and ".ws" (R023-DOT-NAMES) and the two manifest paths that start with ".." (R026-DOTDOT-MANIFEST); whether every other
 * relative path is inside is NOT CLAIMED.
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

/** The reader's answer for one call: the Buffer it answers, or undefined when it throws or answers a value for which Buffer.isBuffer is false (the suite's forms: see SourceGitReader). */
function read(git: SourceGitReader, directory: string, args: readonly string[]): Buffer | undefined {
  try {
    const output = git(directory, [...GIT_MEASURE_OPTIONS, ...args]);
    return Buffer.isBuffer(output) ? output : undefined;
  } catch {
    return undefined;
  }
}

/**
 * The answer as UTF-8 text, with one final LF removed when it ends with one, in the forms the suite pins: the suite reader's
 * rev-parse answers, each ending with one LF; those answers without their final LF on ws (R022-READER-FINAL-LF) and on each
 * worktree whose directory name is w followed by one of the 20 code points String.prototype.trim() removes outside
 * U+0000-U+001F (R022-READER-NO-LF-EDGE), which measure the identity the suite's reader measures and whose admissions
 * dispatch; those answers on ws with a second LF, which refuse source-unmeasurable (R022-READER-FINAL-LF); and ws's commit id
 * followed by a CR, with no LF after it and with one, as the HEAD^{commit} answer, which refuses source-unmeasurable
 * (R022-READER-COMMIT-CR). What it reads any other answer as is NOT CLAIMED.
 */
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
 * is not a string), none of which resolves by realpath, refuses malformed-request, as does a git that is a string; so do the
 * pairs GEN-CONFINE-ORDER plants: a git that is the string "git", undefined or a plain object beside a missing workspace, a
 * missing authorized root, a workspace outside the root, a subdirectory of a worktree or a worktree root; a workspace that is
 * a relative path, holds U+000A or is over 4096 UTF-8 bytes beside a missing authorized root; and an authorized root that is a
 * relative path, holds U+000A or is over 4096 UTF-8 bytes beside a missing workspace; a missing workspace or authorized root
 * refuses workspace-unresolvable; a workspace outside the root refuses workspace-outside-root, also when it is a subdirectory
 * of its own worktree; and a subdirectory of a worktree, or a reader that throws or answers with no Buffer at every call in a
 * form the suite plants (see SourceGitReader), refuses workspace-not-worktree-root. Which refusal answers any other call is NOT
 * CLAIMED, among them a path that is not absolute clean text yet resolves by realpath.
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
 * ws, none of which measures, and beside each failing clause GEN-MEASURE-ORDER plants (a root that is a subdirectory of its
 * worktree, a silent reader, a reader whose GIT_DIR names another repository, a HEAD commit answer that is no object id, an
 * assume-unchanged entry, an unanswered git status and a dirty base); each source-unmeasurable clause refuses when it is the
 * one that fails, and so do an unmerged entry that git status lists and a symlink alias of the worktree root whose declared
 * manifest resolves outside it; a git status record refuses dirty-base, also when the gate manifest is missing; and a manifest
 * the suite plants that does not measure refuses gate-manifest-unavailable. Which refusal answers any other call is NOT
 * CLAIMED, among them an absolute canonicalRoot that is not clean text.
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
 * EAT-R024: the host's writer leases, keyed by canonical root, in the forms the suite pins. acquire grants a root's lease while
 * no lease holds that root, for the roots the suite's cases acquire; while inv-a's lease holds a root, it answers undefined to
 * the suite's inv-b and inv-c and to the ids R024-HOLDER-ID-LEASES plants (inv-a itself, INV-A, Inv-A, inv-A, " inv-a",
 * "inv-a ", inv-a2, inv-aa and inv-), and what it answers any other invocation id while a lease holds the root is NOT
 * CLAIMED. The leases of the root pairs the suite plants
 * are independent: ws and its sibling ws2; ws and each of the two roots the suite plants inside it, sub and ignored/inner (at
 * admission, ws's committed submodule and a repository under its ignored directory); and ws and WS, whose paths differ only in
 * letter case (at admission, two directories on this file system). For each such pair, in either order: while inv-a's lease
 * holds one root, no lease holds the other and inv-b acquires it, holder answers inv-a and inv-b, and releasing inv-b's lease
 * leaves inv-a's held; and while inv-a writes on one root, inv-b's admission on the other dispatches, and when inv-b's write
 * ends inv-a's lease still holds the first. Of the three roots r1, r2 and r3, leased at once by inv-a, releasing r2's lease
 * frees r2 only.
 * Whether the leases of any other pair of roots are independent is NOT CLAIMED. release frees a root only for the very object
 * acquire returned while it still holds that root, so a released lease, or a copy naming the same root and invocation, frees
 * nothing. admitSourceWrite keys the lease by the canonical root it measured, never by the caller's spelling of the workspace.
 * Those forms are the registry's without a store (new WriterLeases()).
 *
 * EAT-R399, wb-yk1k (criterion 1 only, evidence tier V1; cut #1 and its respin, cut #2): new WriterLeases({ store }) keeps
 * the registry's leases in store, an existing directory the host configures, instead of in the registry. By its code:
 * acquire resolves the root it is given by realpath and links a fully written staged record to that canonical root's record
 * file in the store (see reservationPath), answering undefined when the link finds a record there; holder reads the record
 * of the root's realpath; and release removes the record for a lease this registry minted while the record still names that
 * lease's generation. The record's fields (the schema pi.writer-reservation/v1, the canonical root, the invocation, the
 * owner's pid, a random generation and the custody state held) are provisional until EAT-R398 ratifies the token. What
 * test/workbench-mii-cross-pid-reservation.test.ts pins of this form: two child processes over one store, each requesting ws
 * through one spelling of a pair of its direct, symlink and dot spellings, get one lease between them, naming the realpath,
 * and holder read through a third registry over the store names its invocation (R399-C1-STORE); run through
 * admitSourceWrite, one dispatch is entered and the other admission refuses writer-held (R399-C1-ADMISSION); the validation
 * the constructor's and acquire's comments state, in the forms R399-STORE-VALIDATION plants; and the record file names
 * reservationPath states, for the two roots R399-RECORD-NAMING plants. NOT CLAIMED by that suite: release in this form, a
 * fresh process reading the owner, generation or custody, a second registry in one process, restart, a store that fails,
 * more processes or spellings, and power loss.
 */
export class WriterLeases {
  readonly #held = new Map<string, WriterLease>();
  readonly #store: string | undefined;
  /** With a store: the generation of each lease this registry minted and has not released. */
  readonly #generations = new WeakMap<WriterLease, string>();

  /**
   * Throws a validation CapabilityError, "A writer reservation store names an absolute directory.", unless options, when
   * given, is a plain object whose store is absolute clean text. R399-STORE-VALIDATION pins the throw for the options null,
   * { store: "relative-store" }, { store: 7 } and a store whose absolute path is followed by U+000A, and the store cases of
   * that suite construct their registries with { store: <an absolute directory> } without a throw; what any other options
   * meet is NOT CLAIMED.
   */
  constructor(options?: WriterReservationStore) {
    if (options !== undefined && (!plainObject(options) || !absolutePath(options.store))) throw new CapabilityError("validation", "A writer reservation store names an absolute directory.");
    this.#store = options?.store;
  }

  /**
   * Throws a validation CapabilityError, "A writer lease names a canonical workspace root and an invocation.", unless
   * canonicalRoot is absolute clean text and invocationId is clean text, and, with a store, throws one with the message "A
   * writer reservation names a workspace root that resolves." when realpath does not resolve canonicalRoot; with a store,
   * either throw comes before any record is written. R024-VALIDATION pins the first throw without a store, in the forms it
   * plants. With a store,
   * R399-STORE-VALIDATION pins the first for the relative root "authorized/ws", an absolute root followed by U+000A and
   * the invocations "" and "text" U+000A "next", and the second for a missing directory and a symlink to it, the store
   * then holding no file; what any other root or invocation meets with a store is NOT CLAIMED.
   */
  acquire(canonicalRoot: string, invocationId: string): WriterLease | undefined {
    if (!absolutePath(canonicalRoot) || !cleanText(invocationId)) throw new CapabilityError("validation", "A writer lease names a canonical workspace root and an invocation.");
    if (this.#store !== undefined) return this.#reserve(this.#store, canonicalRoot, invocationId);
    if (this.#held.has(canonicalRoot)) return undefined;
    const lease: WriterLease = Object.freeze({ canonicalRoot, invocationId });
    this.#held.set(canonicalRoot, lease);
    return lease;
  }

  /** True when it freed the root. */
  release(lease: WriterLease): boolean {
    if (this.#store !== undefined) return this.#unreserve(this.#store, lease);
    if (this.#held.get(lease.canonicalRoot) !== lease) return false;
    this.#held.delete(lease.canonicalRoot);
    return true;
  }

  /** The invocation id of the lease that holds canonicalRoot, or undefined when no lease holds it, for the roots the suite asks about. */
  holder(canonicalRoot: string): string | undefined {
    if (this.#store !== undefined) {
      const canonical = realpathOf(canonicalRoot);
      const record = canonical === undefined ? undefined : readReservation(reservationPath(this.#store, canonical));
      return record !== undefined && record.canonicalRoot === canonical ? record.invocationId : undefined;
    }
    return this.#held.get(canonicalRoot)?.invocationId;
  }

  #reserve(store: string, root: string, invocationId: string): WriterLease | undefined {
    const canonicalRoot = realpathOf(root);
    if (canonicalRoot === undefined) throw new CapabilityError("validation", "A writer reservation names a workspace root that resolves.");
    const generation = randomBytes(16).toString("hex");
    const record: WriterReservationRecord = { schema: WRITER_RESERVATION_SCHEMA, canonicalRoot, invocationId, owner: { pid: process.pid }, generation, custody: "held" };
    const path = reservationPath(store, canonicalRoot);
    const staged = `${path}.${process.pid}.${generation}.staged`;
    const descriptor = openSync(staged, "wx", 0o600);
    try {
      writeRecord(descriptor, record);
      if (!linkExclusive(staged, path)) return undefined;
    } finally {
      discard(staged);
    }
    const lease: WriterLease = Object.freeze({ canonicalRoot, invocationId });
    this.#generations.set(lease, generation);
    return lease;
  }

  #unreserve(store: string, lease: WriterLease): boolean {
    const generation = this.#generations.get(lease);
    if (generation === undefined) return false;
    this.#generations.delete(lease);
    const path = reservationPath(store, lease.canonicalRoot);
    if (readReservation(path)?.generation !== generation) return false;
    try {
      unlinkSync(path);
      return true;
    } catch (error) {
      if (errnoCode(error) === "ENOENT") return false;
      throw error;
    }
  }
}

/** What a host passes new WriterLeases to keep the registry's leases in a reservation store (EAT-R399). */
export interface WriterReservationStore {
  /** The absolute path of the existing directory every participating registry on the machine is configured with. */
  readonly store: string;
}

/** The schema of a reservation record: this cut's provisional form, until EAT-R398 ratifies the token fields. */
const WRITER_RESERVATION_SCHEMA = "pi.writer-reservation/v1";

/** One reservation record: its canonical root, the holding invocation, the owning process, its generation and custody. */
interface WriterReservationRecord {
  readonly schema: typeof WRITER_RESERVATION_SCHEMA;
  readonly canonicalRoot: string;
  readonly invocationId: string;
  readonly owner: { readonly pid: number };
  readonly generation: string;
  readonly custody: "held";
}

/**
 * The record file of a canonical root in a store: the SHA-256 of the root's UTF-8 bytes in lowercase hex, then ".json".
 * R399-RECORD-NAMING pins these names for the two sibling roots it plants in one store (ra, acquired by its direct path,
 * and a directory whose name holds U+00E9, acquired through a symlink to it); the name of any other root's record is NOT
 * CLAIMED.
 */
function reservationPath(store: string, canonicalRoot: string): string {
  return join(store, `${createHash("sha256").update(canonicalRoot, "utf8").digest("hex")}.json`);
}

/** Writes the record's JSON line to the open staged file, flushes it to the file system and closes it. */
function writeRecord(descriptor: number, record: WriterReservationRecord): void {
  try {
    writeSync(descriptor, `${JSON.stringify(record)}\n`);
    fsyncSync(descriptor);
  } finally {
    closeSync(descriptor);
  }
}

/** Links staged to path: true when path did not exist, false when it did (EEXIST); any other failure throws. */
function linkExclusive(staged: string, path: string): boolean {
  try {
    linkSync(staged, path);
    return true;
  } catch (error) {
    if (errnoCode(error) === "EEXIST") return false;
    throw error;
  }
}

/** Removes a staged copy. A copy that stays behind holds no root: only a record file named "<digest>.json" does. */
function discard(path: string): void {
  try {
    unlinkSync(path);
  } catch {
    // Nothing to undo: the staged copy is not a reservation record.
  }
}

/** The record at path, when it reads as one; undefined when it is missing, unreadable or not a record. */
function readReservation(path: string): Pick<WriterReservationRecord, "canonicalRoot" | "invocationId" | "generation"> | undefined {
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return undefined;
  }
  if (!plainObject(parsed)) return undefined;
  const { schema, canonicalRoot, invocationId, generation } = parsed;
  if (schema !== WRITER_RESERVATION_SCHEMA || typeof canonicalRoot !== "string" || typeof invocationId !== "string" || typeof generation !== "string") return undefined;
  return { canonicalRoot, invocationId, generation };
}

/** The code of a Node.js system error, when error carries one. */
function errnoCode(error: unknown): string | undefined {
  if (typeof error !== "object" || error === null || !("code" in error)) return undefined;
  return typeof error.code === "string" ? error.code : undefined;
}

/**
 * The JSON policy asks for writes only when it is a plain object (see plainObject) with an own allowWrites data member whose
 * value is exactly true; an accessor is never called. It never authorizes them. The suite pins the policies that ask:
 * { allowWrites: true } and its null-prototype copy (R027-REQUESTED); and the plain and null-prototype objects whose own
 * allowWrites data member true has each of the eight combinations of the enumerable, writable and configurable attributes,
 * the frozen, sealed and non-extensible { allowWrites: true }, and { allowWrites: true, foo: 1 } (R027-REQUESTED-FORMS).
 * Whether any other plain object with an own allowWrites data member true asks is NOT CLAIMED.
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
