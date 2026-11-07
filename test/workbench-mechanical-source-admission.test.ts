/**
 * wb-s8rm [MWI-source]: host-owned write admission against an immutable source identity. Program
 * mechanical-workflows-interop-2026-11-04, slice PI-1, bead B-source: requirements EAT-R022..EAT-R027 of
 * triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e, quoted below with their acceptance and adversarial
 * mutant. The program is design-only; this suite pins the Pi-local admission seam, src/workbench/source-admission.ts.
 *
 * Every case drives that module on real Git repositories built in tracked scratch (test/helpers/scratch.ts), read through the
 * suite's SourceGitReader: real git with the repository-locating variables removed (the fixture's own git calls remove them too);
 * the cases that say so wrap it to fail, record or rewrite chosen calls. The write-capable dispatch is the injected `dispatch`
 * callback, so "no write-capable host dispatch", "refusal before SDK dispatch" and "no child write capability" each read as zero
 * calls to it; a SourceWriteGrant is only ever what that callback receives. Every refusal is asserted whole: its code, the fixed
 * reason of that code (REASON below) and, on dirty-base only, the dirty counts. Every case that expects admitSourceWrite to
 * refuse also asserts zero dispatches.
 *
 * PINNED READER SET (case id: assertion target).
 * - EAT-R022 "Pi MUST refuse a dirty implementation base." Acceptance: "Set tracked, staged or untracked edits at admission;
 *   assert no write-capable host dispatch; clean committed tree passes." Mutant: "Use HEAD equality alone." R022-CLEAN: one
 *   dispatch whose grant names the HEAD commit and tree git reports. R022-TRACKED, R022-STAGED, R022-UNTRACKED: one edit each,
 *   refusal dirty-base with that edit in its own column. R022-COUNTS: a base whose git status lists " M", "MM", " D", "A " and
 *   three "??" records (two files of one new directory listed one by one) refuses dirty-base with tracked 3, staged 2, untracked
 *   3. R022-STATUS-COLUMNS: a "?M" record (read through a reader that rewrites status) counts as staged and as tracked, never as
 *   untracked. R022-RENAME: a staged rename counts as a staged deletion and a staged addition (tracked 0, staged 2).
 *   R022-ASSUME-UNCHANGED, R022-SKIP-WORKTREE, R022-UNMERGED: an index entry that git ls-files -v tags other than "H " refuses
 *   source-unmeasurable, also when git status lists it (UNMERGED); each case reads the tag first (h, S, M). R022-NO-HEAD: a
 *   repository whose HEAD names no commit refuses source-unmeasurable. R022-ROOT-ONLY: measureSourceIdentity on a subdirectory, a
 *   symlink alias and a dot spelling of the worktree root refuses source-unmeasurable. R022-TOPLEVEL-ALIAS: a reader that reports
 *   the worktree root through a symlink alias measures the canonical root. R022-MISDIRECTED-GIT: a reader whose GIT_DIR points
 *   git at another repository refuses source-unmeasurable. R022-REPOSITORY-FORMS: a linked worktree (the .git file git worktree
 *   add writes), a .git file naming a relative Git directory with an LF ending and with a CRLF ending, and a .git symlink to a
 *   Git directory each measure the HEAD commit git reports (the linked worktree also dispatches). R022-SHA256: a repository with
 *   64-hex object ids measures them. R022-READER-ARGV: the exact argv of every reader call a measurement and an admission make,
 *   in order, each opening with --no-optional-locks -c core.fsmonitor=false -c core.untrackedCache=false. R022-NO-INDEX-WRITE: a
 *   measurement leaves .git/index byte-identical where a plain git status rewrites it. R022-FSMONITOR: an edit that a configured
 *   fsmonitor hook hides from git status refuses dirty-base. R022-SUBMODULE: a moved submodule that ignore = all hides from git
 *   status refuses dirty-base. R022-READER-PARTIAL: a reader that does not answer exactly one call (or both git-dir calls) -
 *   undefined, a throw or a string - refuses source-unmeasurable for every call of the measurement, as does a HEAD answer that is
 *   no object id, is upper-cased or is one hex digit too long; over a tracked edit with status unanswered, and over an
 *   assume-unchanged edit with ls-files unanswered, the admission dispatches nothing. R022-IGNORED: an ignored build file is not
 *   an edit (one dispatch).
 * - EAT-R023 "Pi MUST confine the workspace to the authorized canonical root." Acceptance: "Supply wrong workspace,
 *   prefix-collision sibling and realpath escape; assert refusal before writing." Mutant: "Accept string startsWith root."
 *   R023-WRONG, R023-SIBLING, R023-ESCAPE: refusal workspace-outside-root although the operator attested that workspace (WRONG
 *   also for a subdirectory of the outside worktree). R023-PARENT: the authorized root's parent refuses workspace-outside-root.
 *   R023-SUBDIR: a subdirectory of a worktree refuses workspace-not-worktree-root. R023-RELATIVE: a relative path refuses
 *   malformed-request. R023-UNRESOLVABLE: a missing workspace (inside or outside the root) and a missing authorized root refuse
 *   workspace-unresolvable. R023-ALIAS-INSIDE: a symlink that resolves inside the root dispatches against the canonical root.
 *   R023-ROOT-ALIAS: an authorized root given as a symlink to the root dispatches. R023-SPACED-NAME: a workspace whose directory
 *   name holds a space, a non-ASCII letter and a trailing space dispatches against that canonical root. R023-CONFINE:
 *   confineWorkspace itself answers the sibling and the workspace.
 * - EAT-R024 "Pi MUST bind a single writer to each materialized workspace." Acceptance: "Admit two invocation IDs for the same
 *   canonical workspace; at most one writer lease is granted; cancellation releases only the lease it owns." Mutant: "Allocate
 *   lease by caller alias instead of canonical root." R024-ALIAS: while one invocation writes, a symlink alias and a dot spelling
 *   of the same workspace refuse writer-held. R024-CANCEL-OWN: a refused invocation's cancellation leaves the holder's lease; the
 *   holder's cancellation releases it. R024-STALE: a released lease never releases the next holder's lease. R024-FOREIGN: a copy
 *   naming the held root and invocation, and a released lease of the same invocation id after it acquired the root again, release
 *   nothing. R024-VALIDATION: acquire throws for a relative root and for a blank invocation.
 * - EAT-R025 "Pi MUST recheck the source basis after asynchronous admission." Acceptance: "Park admission, change commit/tree,
 *   gate manifest or tracked bytes, release; assert refusal before SDK dispatch." Mutant: "Check source only before await."
 *   R025-COMMIT (commit and tree), R025-AMEND (commit, same tree), R025-GATE (gate manifest bytes), R025-TRACKED (tracked bytes):
 *   refusal source-changed and the lease released. R025-CONTROL: a park with no change dispatches once.
 * - EAT-R026 "Pi MUST bind the gate manifest digest to source identity." Acceptance: "Hold commit and prompt constant while
 *   changing gate manifest bytes; assert identity changes and an old authorization is rejected." Mutant: "Drop gate digest from
 *   the source basis." R026-IDENTITY: same root, commit, tree and clean status, different gate digest (the SHA-256 of the bytes)
 *   and identity digest. R026-STALE: the attestation of the old identity refuses attestation-stale; one for the new identity
 *   dispatches. R026-MANIFEST-PATH: the same bytes under another manifest path are another identity, so its attestation refuses
 *   attestation-stale. R026-MANIFEST-ALIAS: a manifest declared through a symlink inside the workspace binds its target's path.
 *   R026-DIGEST: the digest is identityDigest(SOURCE_IDENTITY_DOMAIN, the five members). R026-FROZEN: the identity and its
 *   gateManifest member are frozen, and an assignment to the identity throws. R026-UNAVAILABLE: a missing manifest, an absolute
 *   path, a ../ path, a path that leaves the workspace and comes back through an outside symlink, a symlink out of it, a
 *   directory and an unreadable file refuse gate-manifest-unavailable. R026-NOT-REGULAR: a FIFO refuses
 *   gate-manifest-unavailable. R026-BOUND: a 1048576-byte manifest measures and a 1048577-byte one refuses
 *   gate-manifest-unavailable.
 * - EAT-R027 "Pi MUST require an operator-attested write boundary." Acceptance: "Launch with allowWrites:true but absent host
 *   attestation; assert no child write capability. An attestation for another workspace also refuses." Mutant: "Trust JSON policy
 *   as authorization." R027-ABSENT: allowWrites:true and no attestation refuses attestation-absent. R027-POLICY-COPY: an
 *   attestation copied into the JSON policy is not read. R027-FORGED: an equal-shaped copy in the host slot is not minted.
 *   R027-FOREIGN-AUTHORITY: another authority's attestation is not this host's. R027-OTHER-WORKSPACE: refusal
 *   attestation-other-workspace. R027-NOT-REQUESTED: no policy, allowWrites false, "true", 1, an array, an own accessor (never
 *   called), an inherited member and a class instance each refuse writes-not-requested. R027-REQUESTED: a plain and a
 *   null-prototype policy with own allowWrites true dispatch. R027-WITHDRAWN: an attestation withdrawn while admission waits
 *   refuses. R027-REATTESTED: an attestation replaced while admission waits is read again (the grant names the new operator).
 *   R027-UNMEASURED: the authority attests only an identity the host measured, by a clean operator id. R027-ATTESTED: the grant
 *   carries the operator and is frozen, and the outcome carries no grant. R027-ATTESTATION-FROZEN: a minted attestation is
 *   frozen, so it cannot be rewritten to name another workspace.
 * - General: GEN-PRE-ABORTED (admission-cancelled, no lease), GEN-WAIT-REFUSED (admission-refused, lease released),
 *   GEN-WAIT-CANCELLED (a wait that rejects because the signal aborted refuses admission-cancelled, lease released),
 *   GEN-DISPATCH-THROWS (the error propagates, lease released), GEN-MALFORMED (an invocation reference that is blank, holds a
 *   U+0000, U+000A, U+001F or U+007F, or exceeds 4096 UTF-8 bytes refuses malformed-request), GEN-CLEAN-TEXT (4096 UTF-8 bytes,
 *   ASCII and two-byte, dispatch), GEN-MALFORMED-SHAPES (a request that is not a plain object, a dispatch or reader that is not a
 *   function, a relative authorized root, an absolute workspace or root path holding U+000A or over 4096 UTF-8 bytes, and
 *   measureSourceIdentity's relative root, unclean manifest or non-function reader refuse malformed-request), GEN-READER-FAILS (a
 *   reader that throws or answers with no Buffer at its first call is a refusal, never a rejection), GEN-REASON-FIXED (the reason
 *   names neither the caller's workspace nor its invocation). Rule order, one case per adjacent pair, each failing both rules of
 *   its pair and no rule before them (the earlier code wins): GEN-ORDER-SHAPE-CANCEL, GEN-ORDER-CANCEL-REQUEST,
 *   GEN-ORDER-REQUEST-CONFINE, GEN-ORDER-CONFINE-MEASURE, GEN-ORDER-MEASURE-ATTEST, GEN-ORDER-STATUS-MANIFEST (within the
 *   measurement), GEN-ORDER-ATTEST-LEASE, GEN-ORDER-WAIT-REFUSED (a refusing wait before the fresh measurement),
 *   GEN-ORDER-WAIT-CANCEL (cancellation after the wait before the fresh measurement), GEN-ORDER-REMEASURE-REATTEST (the fresh
 *   measurement before the attestation is read again).
 *
 * NOT CLAIMED (scope sentences; each bounds what this suite proves):
 * - The function branch of workflow_execute is NOT CLAIMED by this suite: execute-tool.ts still refuses a function definition
 *   (unsupported-definition-kind) until the dispatch bead (EAT-R032..EAT-R035) composes this seam.
 * - Writer exclusivity across host processes is NOT CLAIMED by this suite: one WriterLeases registry binds one host's writers.
 * - An edit made outside Pi after the final measurement is NOT CLAIMED by this suite.
 * - A change made between two of the module's own reads (a file swapped, grown or replaced between a check and the read after it)
 *   is NOT CLAIMED by this suite.
 * - Ignored paths other than the gate manifest are NOT CLAIMED by this suite: dirtiness reads tracked, staged and untracked
 *   paths.
 * - Where a worktree's Git directory lives (inside or outside the authorized root) is NOT CLAIMED by this suite.
 * - What core.untrackedCache=false changes in a measurement is NOT CLAIMED by this suite: R022-READER-ARGV pins that every call
 *   carries it, and no untracked-cache state that hides a new file was realized on this host.
 * - The host's own git reader (its process and environment) is NOT CLAIMED by this suite: the module launches nothing, and the
 *   suite's reader stands in for the host's.
 * - Paths on a platform whose path separator is not "/" are NOT CLAIMED by this suite.
 */
import { type ChildProcess, execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, lstatSync, mkdirSync, readFileSync, realpathSync, renameSync, rmSync, symlinkSync, utimesSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { identityDigest } from "../src/workbench/identity.js";
import {
  admitSourceWrite,
  confineWorkspace,
  measureSourceIdentity,
  SOURCE_IDENTITY_DOMAIN,
  type SourceAdmissionCode,
  type SourceAdmissionHost,
  type SourceAdmissionOutcome,
  type SourceDirtiness,
  type SourceGitReader,
  type SourceIdentity,
  type SourceWriteGrant,
  type SourceWriteRequest,
  type WriteBoundaryAttestation,
  WriteBoundaryAuthority,
  WriterLeases,
} from "../src/workbench/source-admission.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

/** Git-heavy cases (fixture commits plus two measurements per admission) get room under shared-host load. */
const CASE_MS = 60_000;
const OPERATOR = "operator-1";
const FIXTURE_GIT: readonly string[] = [
  "-c",
  "user.name=Pi Source Fixture",
  "-c",
  "user.email=source-fixture@example.invalid",
  "-c",
  "commit.gpgsign=false",
  "-c",
  "core.hooksPath=/dev/null",
  "-c",
  "init.defaultBranch=main",
];

/** Variables that point git at another repository, index or object store than the directory it runs in. */
const LOCATING_ENV: readonly string[] = ["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_COMMON_DIR", "GIT_NAMESPACE"];

function envWith(extra: Readonly<Record<string, string>> = {}): NodeJS.ProcessEnv {
  return { ...Object.fromEntries(Object.entries(process.env).filter(([name]) => !LOCATING_ENV.includes(name))), ...extra };
}

const FIXTURE_ENV = envWith();

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", [...FIXTURE_GIT, ...args], { cwd, env: FIXTURE_ENV, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function sha256(bytes: string | Buffer): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

/** The suite's SourceGitReader: real git in the directory, the locating variables removed, then `extra` set. */
function readerWith(extra: Readonly<Record<string, string>> = {}): SourceGitReader {
  const env = envWith(extra);
  return (directory, args) => {
    try {
      return execFileSync("git", ["-C", directory, ...args], { env, encoding: "buffer", maxBuffer: 16 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"], timeout: 30_000 });
    } catch {
      return undefined;
    }
  };
}

const gitReader = readerWith();

/** The global options the module opens every reader call with. */
const OPTIONS: readonly string[] = ["--no-optional-locks", "-c", "core.fsmonitor=false", "-c", "core.untrackedCache=false"];

/** The fixed reason of each refusal code. */
const REASON: Readonly<Record<SourceAdmissionCode, string>> = {
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
};

/** The whole refusal: its code, the fixed reason of that code and, on dirty-base only, the dirty counts. */
function expectRefused(outcome: unknown, code: SourceAdmissionCode, dirty?: SourceDirtiness, label?: string): void {
  const expected = dirty === undefined ? { decision: "refused", code, reason: REASON[code] } : { decision: "refused", code, reason: REASON[code], dirty };
  expect(outcome, label).toStrictEqual(expected);
}

/** A clean repository: README.md, forge.toml and src/index.ts committed; gate.local.toml and ignored/ ignored. Canonical path. */
function fixtureRepo(path: string, objectFormat?: "sha256"): string {
  mkdirSync(path, { recursive: true });
  git(path, "init", "-q", ...(objectFormat !== undefined ? [`--object-format=${objectFormat}`] : []));
  writeFileSync(join(path, "README.md"), "# source fixture\n");
  writeFileSync(join(path, "forge.toml"), '[build]\ngate = ["test"]\n');
  writeFileSync(join(path, ".gitignore"), "gate.local.toml\nignored/\n");
  writeFileSync(join(path, "gate.local.toml"), '[gate]\nsteps = ["test"]\n');
  mkdirSync(join(path, "src"));
  writeFileSync(join(path, "src", "index.ts"), "export const fixture = 1;\n");
  git(path, "add", "README.md", "forge.toml", ".gitignore", "src/index.ts");
  git(path, "commit", "-q", "--no-verify", "-m", "fixture base");
  return realpathSync(path);
}

interface Deferred {
  readonly promise: Promise<void>;
  resolve(): void;
  reject(error: Error): void;
}

function deferred(): Deferred {
  let settle: { resolve(): void; reject(error: Error): void } = { resolve: () => {}, reject: () => {} };
  const promise = new Promise<void>((resolve, reject) => {
    settle = { resolve: () => resolve(), reject };
  });
  return { promise, resolve: () => settle.resolve(), reject: error => settle.reject(error) };
}

/** A host admission wait the test parks and releases; `entered` resolves once the admission is waiting. */
function parkedWait(): { readonly entered: Deferred; readonly gate: Deferred; wait(): Promise<void> } {
  const entered = deferred();
  const gate = deferred();
  return {
    entered,
    gate,
    wait: async () => {
      entered.resolve();
      await gate.promise;
    },
  };
}

/** The write-capable dispatch: it records every grant it receives and writes nothing. */
function recorder(): { readonly grants: SourceWriteGrant[]; dispatch(grant: SourceWriteGrant): Promise<string> } {
  const grants: SourceWriteGrant[] = [];
  return {
    grants,
    dispatch: async grant => {
      grants.push(grant);
      return "wrote";
    },
  };
}

/** A reader that records the directory and argv of every call it answers. */
function recording(): { readonly calls: [string, string[]][]; readonly reader: SourceGitReader } {
  const calls: [string, string[]][] = [];
  return {
    calls,
    reader: (directory, args) => {
      calls.push([directory, [...args]]);
      return gitReader(directory, args);
    },
  };
}

type Fault = "undefined" | "throws" | "string" | "junk" | "upper" | "long";

/** The suite's reader, except that the calls `matches` selects are answered with `fault`. */
function faulty(matches: (args: readonly string[]) => boolean, fault: Fault): SourceGitReader {
  return (directory, args) => {
    const output = gitReader(directory, args);
    if (!matches(args)) return output;
    if (fault === "throws") throw new Error("git cannot answer this call");
    if (fault === "string") return output === undefined ? undefined : (output.toString("utf8") as unknown as Buffer);
    if (fault === "junk") return Buffer.from("not-an-object-id\n");
    if (fault === "upper") return output === undefined ? undefined : Buffer.from(output.toString("utf8").toUpperCase());
    if (fault === "long") return output === undefined ? undefined : Buffer.from(`${output.toString("utf8").trimEnd()}a\n`);
    return undefined;
  };
}

/** Each call of a measurement, and the pair of git-dir calls, by its argv. */
const MEASUREMENT_CALLS: readonly (readonly [string, (args: readonly string[]) => boolean])[] = [
  ["rev-parse --show-toplevel", args => args.includes("--show-toplevel")],
  ["rev-parse --absolute-git-dir", args => args.includes("--absolute-git-dir") && !args.some(arg => arg.startsWith("--git-dir="))],
  ["--git-dir=<root>/.git rev-parse --absolute-git-dir", args => args.some(arg => arg.startsWith("--git-dir="))],
  ["both --absolute-git-dir calls", args => args.includes("--absolute-git-dir")],
  ["rev-parse HEAD^{commit}", args => args.includes("HEAD^{commit}")],
  ["rev-parse HEAD^{tree}", args => args.includes("HEAD^{tree}")],
  ["ls-files -v -z", args => args.includes("ls-files")],
  ["status", args => args.includes("status")],
];

async function settled(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null || child.signalCode !== null) return;
  await new Promise<void>(resolve => child.once("exit", () => resolve()));
}

let scratchDir: string;
let base: string;
let root: string;
let ws: string;
let authority: WriteBoundaryAuthority;
let leases: WriterLeases;

function identityOf(path: string, gateManifest = "forge.toml"): SourceIdentity {
  const measured = measureSourceIdentity(path, gateManifest, gitReader);
  if (measured.decision !== "measured") throw new Error(`fixture is not measurable: ${measured.code}`);
  return measured.identity;
}

function hostFor(attestation: WriteBoundaryAttestation | undefined, overrides: Partial<SourceAdmissionHost> = {}): SourceAdmissionHost {
  return { authorizedRoot: root, gateManifest: "forge.toml", git: gitReader, authority, leases, ...(attestation !== undefined ? { attestation } : {}), ...overrides };
}

function requestFor(workspace: string, invocationId = "inv-a", policy: SourceWriteRequest["policy"] = { allowWrites: true }): SourceWriteRequest {
  return { invocationId, workspace, ...(policy !== undefined ? { policy } : {}) };
}

beforeEach(() => {
  scratchDir = makeScratch("pi-mwi-source-");
  base = realpathSync(scratchDir);
  root = join(base, "authorized");
  mkdirSync(root);
  ws = fixtureRepo(join(root, "ws"));
  authority = new WriteBoundaryAuthority();
  leases = new WriterLeases();
});

afterEach(() => {
  removeScratch(scratchDir);
});

describe("EAT-R022: a dirty implementation base is refused before any write-capable dispatch", { timeout: CASE_MS }, () => {
  it("R022-CLEAN: a clean committed tree dispatches once against the HEAD commit and tree git reports", async () => {
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched", value: "wrote" });
    expect(grants).toHaveLength(1);
    const identity = grants[0]?.identity;
    expect(identity).toMatchObject({
      canonicalRoot: ws,
      commit: git(ws, "rev-parse", "HEAD"),
      tree: git(ws, "rev-parse", "HEAD^{tree}"),
      dirtiness: "clean",
      gateManifest: { path: "forge.toml", sha256: sha256(readFileSync(join(ws, "forge.toml"))) },
    });
    expect(outcome.decision === "dispatched" ? outcome.identity : undefined).toBe(identity);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R022-TRACKED: an unstaged edit to a tracked file refuses dirty-base", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "README.md"), "# edited, not staged\n");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 1, staged: 0, untracked: 0 });
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R022-STAGED: a staged edit refuses dirty-base", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 2;\n");
    git(ws, "add", "src/index.ts");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 0, staged: 1, untracked: 0 });
    expect(grants).toHaveLength(0);
  });

  it("R022-UNTRACKED: an untracked file refuses dirty-base", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "notes.txt"), "not added\n");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 0, staged: 0, untracked: 1 });
    expect(grants).toHaveLength(0);
  });

  it("R022-COUNTS: every git status record counts by its columns over a base with several edits", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "README.md"), "# tracked edit\n");
    writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 5;\n");
    git(ws, "add", "src/index.ts");
    writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 6;\n");
    rmSync(join(ws, "forge.toml"));
    writeFileSync(join(ws, "added.txt"), "a staged new file\n");
    git(ws, "add", "added.txt");
    writeFileSync(join(ws, "notes.txt"), "untracked\n");
    mkdirSync(join(ws, "fresh"));
    writeFileSync(join(ws, "fresh", "a.txt"), "untracked a\n");
    writeFileSync(join(ws, "fresh", "b.txt"), "untracked b\n");
    const listed = execFileSync("git", ["status", "--porcelain=v1", "--untracked-files=all"], { cwd: ws, env: FIXTURE_ENV, encoding: "utf8" });
    expect(listed.split("\n").filter(line => line !== "").sort()).toEqual([" D forge.toml", " M README.md", "?? fresh/a.txt", "?? fresh/b.txt", "?? notes.txt", "A  added.txt", "MM src/index.ts"]);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 3, staged: 2, untracked: 3 });
    expect(grants).toHaveLength(0);
  });

  it("R022-STATUS-COLUMNS: a status record whose index column is ? and whose worktree column is not counts as staged and tracked", () => {
    const crafted: SourceGitReader = (directory, args) => (args.includes("status") ? Buffer.from("?M crafted.txt\0") : gitReader(directory, args));
    expectRefused(measureSourceIdentity(ws, "forge.toml", crafted), "dirty-base", { tracked: 1, staged: 1, untracked: 0 });
  });

  it("R022-RENAME: a staged rename counts as a staged deletion and a staged addition", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    git(ws, "mv", "README.md", "README2.md");
    expect(git(ws, "status", "--porcelain")).toBe("R  README.md -> README2.md");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 0, staged: 2, untracked: 0 });
    expect(grants).toHaveLength(0);
  });

  it("R022-ASSUME-UNCHANGED: an edit hidden from git status by assume-unchanged refuses source-unmeasurable", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "README.md"), "# edited under assume-unchanged\n");
    git(ws, "update-index", "--assume-unchanged", "README.md");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expect(git(ws, "ls-files", "-v", "README.md")).toBe("h README.md");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "source-unmeasurable");
    expect(grants).toHaveLength(0);
  });

  it("R022-SKIP-WORKTREE: an edit hidden from git status by skip-worktree refuses source-unmeasurable", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 3;\n");
    git(ws, "update-index", "--skip-worktree", "src/index.ts");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expect(git(ws, "ls-files", "-v", "src/index.ts")).toBe("S src/index.ts");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "source-unmeasurable");
    expect(grants).toHaveLength(0);
  });

  it("R022-UNMERGED: an unmerged index entry refuses source-unmeasurable although git status lists it", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    git(ws, "checkout", "-q", "-b", "side");
    writeFileSync(join(ws, "README.md"), "# side\n");
    git(ws, "commit", "-q", "--no-verify", "-am", "side");
    git(ws, "checkout", "-q", "main");
    writeFileSync(join(ws, "README.md"), "# main\n");
    git(ws, "commit", "-q", "--no-verify", "-am", "main");
    expect(() => git(ws, "merge", "-q", "--no-edit", "side")).toThrow();
    expect(git(ws, "status", "--porcelain")).toBe("UU README.md");
    expect(git(ws, "ls-files", "-v", "README.md").split("\n")).toEqual(["M README.md", "M README.md", "M README.md"]);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "source-unmeasurable");
    expect(grants).toHaveLength(0);
  });

  it("R022-NO-HEAD: a repository whose HEAD names no commit refuses source-unmeasurable", () => {
    const unborn = join(root, "unborn");
    mkdirSync(unborn);
    git(unborn, "init", "-q");
    writeFileSync(join(unborn, "forge.toml"), '[build]\ngate = ["test"]\n');
    git(unborn, "add", "forge.toml");
    expect(() => git(unborn, "rev-parse", "--verify", "--quiet", "HEAD^{commit}")).toThrow();
    expectRefused(measureSourceIdentity(realpathSync(unborn), "forge.toml", gitReader), "source-unmeasurable");
  });

  it("R022-ROOT-ONLY: measureSourceIdentity refuses source-unmeasurable for a subdirectory and for a symlink alias of the worktree root", () => {
    const alias = join(root, "alias");
    symlinkSync(ws, alias);
    expectRefused(measureSourceIdentity(join(ws, "src"), "index.ts", gitReader), "source-unmeasurable");
    expectRefused(measureSourceIdentity(alias, "forge.toml", gitReader), "source-unmeasurable");
    expectRefused(measureSourceIdentity(`${ws}/.`, "forge.toml", gitReader), "source-unmeasurable");
  });

  it("R022-TOPLEVEL-ALIAS: a reader that reports the worktree root through a symlink alias measures the canonical root", () => {
    const alias = join(root, "alias");
    symlinkSync(ws, alias);
    const aliasing: SourceGitReader = (directory, args) => (args.includes("--show-toplevel") ? Buffer.from(`${alias}\n`) : gitReader(directory, args));
    expect(measureSourceIdentity(ws, "forge.toml", aliasing)).toMatchObject({ decision: "measured", identity: { canonicalRoot: ws } });
  });

  it("R022-MISDIRECTED-GIT: a reader that points git at another repository refuses source-unmeasurable", async () => {
    const other = fixtureRepo(join(root, "other"));
    writeFileSync(join(other, "README.md"), "# another history\n");
    git(other, "commit", "-q", "--no-verify", "-am", "another history");
    const misdirected = readerWith({ GIT_DIR: join(other, ".git") });
    expect(misdirected(ws, ["rev-parse", "--show-toplevel"])?.toString("utf8").trim()).toBe(ws);
    expectRefused(measureSourceIdentity(ws, "forge.toml", misdirected), "source-unmeasurable");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { git: misdirected }), dispatch);
    expectRefused(outcome, "source-unmeasurable");
    expect(grants).toHaveLength(0);
  });

  it("R022-REPOSITORY-FORMS: a linked worktree, a .git file naming a relative Git directory (LF and CRLF) and a .git symlink each measure", async () => {
    git(ws, "worktree", "add", "-q", "-b", "linked", join(root, "linked"));
    const linked = realpathSync(join(root, "linked"));
    expect(lstatSync(join(linked, ".git")).isFile()).toBe(true);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(linked), hostFor(authority.attest(OPERATOR, identityOf(linked))), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => [grant.identity.canonicalRoot, grant.identity.commit])).toEqual([[linked, git(linked, "rev-parse", "HEAD")]]);
    const moved = fixtureRepo(join(root, "moved"));
    renameSync(join(moved, ".git"), join(root, "moved.git"));
    for (const gitfile of ["gitdir: ../moved.git\n", "gitdir: ../moved.git\r\n"]) {
      writeFileSync(join(moved, ".git"), gitfile);
      expect(identityOf(moved).commit, JSON.stringify(gitfile)).toBe(git(moved, "rev-parse", "HEAD"));
    }
    const symlinked = fixtureRepo(join(root, "symlinked"));
    renameSync(join(symlinked, ".git"), join(root, "symlinked.git"));
    symlinkSync(join(root, "symlinked.git"), join(symlinked, ".git"));
    expect(lstatSync(join(symlinked, ".git")).isSymbolicLink()).toBe(true);
    expect(identityOf(symlinked).commit).toBe(git(symlinked, "rev-parse", "HEAD"));
  });

  it("R022-SHA256: a repository whose object ids are 64 hex digits measures them", () => {
    const wide = fixtureRepo(join(root, "wide"), "sha256");
    const identity = identityOf(wide);
    expect([identity.commit.length, identity.tree.length]).toEqual([64, 64]);
    expect([identity.commit, identity.tree]).toEqual([git(wide, "rev-parse", "HEAD"), git(wide, "rev-parse", "HEAD^{tree}")]);
  });

  it("R022-READER-ARGV: a measurement and an admission make exactly these reader calls, each opening with the global options", async () => {
    const measuring = recording();
    expect(measureSourceIdentity(ws, "forge.toml", measuring.reader)).toMatchObject({ decision: "measured" });
    const measurement: [string, string[]][] = [
      [ws, [...OPTIONS, "rev-parse", "--show-toplevel"]],
      [ws, [...OPTIONS, "rev-parse", "--absolute-git-dir"]],
      [ws, [...OPTIONS, `--git-dir=${join(ws, ".git")}`, "rev-parse", "--absolute-git-dir"]],
      [ws, [...OPTIONS, "rev-parse", "--verify", "--quiet", "HEAD^{commit}"]],
      [ws, [...OPTIONS, "rev-parse", "--verify", "--quiet", "HEAD^{tree}"]],
      [ws, [...OPTIONS, "ls-files", "-v", "-z"]],
      [ws, [...OPTIONS, "status", "--porcelain=v1", "-z", "--untracked-files=all", "--ignore-submodules=none", "--no-renames"]],
    ];
    expect(measuring.calls).toEqual(measurement);
    const admitting = recording();
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { git: admitting.reader }), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants).toHaveLength(1);
    expect(admitting.calls).toEqual([[ws, [...OPTIONS, "rev-parse", "--show-toplevel"]], ...measurement, ...measurement]);
  });

  it("R022-NO-INDEX-WRITE: a measurement leaves .git/index byte-identical where a plain git status rewrites it", () => {
    git(ws, "status", "--porcelain");
    const old = new Date("2020-01-01T00:00:00Z");
    utimesSync(join(ws, "README.md"), old, old);
    const index = join(ws, ".git", "index");
    const before = readFileSync(index);
    expect(measureSourceIdentity(ws, "forge.toml", gitReader)).toMatchObject({ decision: "measured" });
    expect(readFileSync(index).equals(before)).toBe(true);
    git(ws, "status", "--porcelain");
    expect(readFileSync(index).equals(before)).toBe(false);
  });

  it("R022-FSMONITOR: an edit that a configured fsmonitor hook hides from git status refuses dirty-base", async () => {
    const hook = join(base, "fsmonitor-lying.sh");
    writeFileSync(hook, "#!/bin/sh\nprintf 'tok-%s\\0' \"$(date +%s%N)\"\n");
    chmodSync(hook, 0o755);
    git(ws, "config", "core.fsmonitor", hook);
    git(ws, "config", "core.fsmonitorHookVersion", "2");
    git(ws, "status", "--porcelain");
    git(ws, "status", "--porcelain");
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "README.md"), "# an edit the hook hides\n");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expect(git(ws, "--no-optional-locks", "-c", "core.fsmonitor=false", "status", "--porcelain")).toBe("M README.md");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 1, staged: 0, untracked: 0 });
    expect(grants).toHaveLength(0);
  });

  it("R022-SUBMODULE: a moved submodule that ignore = all hides from git status refuses dirty-base", async () => {
    const source = fixtureRepo(join(base, "submodule-source"));
    git(ws, "-c", "protocol.file.allow=always", "submodule", "add", "-q", source, "sub");
    git(ws, "config", "-f", ".gitmodules", "submodule.sub.ignore", "all");
    git(ws, "add", ".gitmodules");
    git(ws, "commit", "-q", "--no-verify", "-m", "a submodule git status ignores");
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "sub", "README.md"), "# the submodule moves\n");
    git(join(ws, "sub"), "commit", "-q", "--no-verify", "-am", "the submodule moves");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expect(git(ws, "status", "--porcelain", "--ignore-submodules=none")).toBe("M sub");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 1, staged: 0, untracked: 0 });
    expect(grants).toHaveLength(0);
  });

  it("R022-READER-PARTIAL: a reader that does not answer one call of the measurement refuses source-unmeasurable", async () => {
    for (const [call, matches] of MEASUREMENT_CALLS) {
      for (const fault of ["undefined", "throws", "string"] as const) {
        expectRefused(measureSourceIdentity(ws, "forge.toml", faulty(matches, fault)), "source-unmeasurable", undefined, `${call}: ${fault}`);
      }
    }
    for (const [call, matches] of MEASUREMENT_CALLS.filter(([call]) => call.startsWith("rev-parse HEAD"))) {
      for (const fault of ["junk", "upper", "long"] as const) {
        expectRefused(measureSourceIdentity(ws, "forge.toml", faulty(matches, fault)), "source-unmeasurable", undefined, `${call}: ${fault}`);
      }
    }
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    writeFileSync(join(ws, "README.md"), "# a tracked edit the reader does not report\n");
    const noStatus = faulty(args => args.includes("status"), "undefined");
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { git: noStatus }), dispatch), "source-unmeasurable");
    git(ws, "checkout", "--", "README.md");
    writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 7;\n");
    git(ws, "update-index", "--assume-unchanged", "src/index.ts");
    expect(git(ws, "status", "--porcelain")).toBe("");
    const noIndex = faulty(args => args.includes("ls-files"), "undefined");
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { git: noIndex }), dispatch), "source-unmeasurable");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R022-IGNORED: an ignored build file is not an edit of the base", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    mkdirSync(join(ws, "ignored"));
    writeFileSync(join(ws, "ignored", "build.log"), "build output\n");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants).toHaveLength(1);
  });
});

describe("EAT-R023: the workspace is confined to the authorized canonical root", { timeout: CASE_MS }, () => {
  it("R023-WRONG: a workspace outside the authorized root refuses workspace-outside-root although it is attested", async () => {
    const elsewhere = fixtureRepo(join(base, "elsewhere"));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(elsewhere), hostFor(authority.attest(OPERATOR, identityOf(elsewhere))), dispatch);
    expectRefused(outcome, "workspace-outside-root");
    expectRefused(await admitSourceWrite(requestFor(join(elsewhere, "src")), hostFor(authority.attest(OPERATOR, identityOf(elsewhere))), dispatch), "workspace-outside-root");
    expect(grants).toHaveLength(0);
    expect(leases.holder(elsewhere)).toBeUndefined();
  });

  it("R023-SIBLING: a prefix-collision sibling of the authorized root refuses workspace-outside-root", async () => {
    const sibling = fixtureRepo(`${root}-sibling`);
    expect(sibling.startsWith(root)).toBe(true);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(sibling), hostFor(authority.attest(OPERATOR, identityOf(sibling))), dispatch);
    expectRefused(outcome, "workspace-outside-root");
    expect(grants).toHaveLength(0);
  });

  it("R023-ESCAPE: a symlink inside the root that resolves outside it refuses workspace-outside-root", async () => {
    const elsewhere = fixtureRepo(join(base, "elsewhere"));
    const escapeLink = join(root, "escape");
    symlinkSync(elsewhere, escapeLink);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(escapeLink), hostFor(authority.attest(OPERATOR, identityOf(elsewhere))), dispatch);
    expectRefused(outcome, "workspace-outside-root");
    expect(grants).toHaveLength(0);
  });

  it("R023-PARENT: the authorized root's parent refuses workspace-outside-root", async () => {
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(base), hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch), "workspace-outside-root");
    expectRefused(confineWorkspace(root, base, gitReader), "workspace-outside-root");
    expect(grants).toHaveLength(0);
  });

  it("R023-SUBDIR: a subdirectory of a worktree refuses workspace-not-worktree-root", async () => {
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(join(ws, "src")), hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch);
    expectRefused(outcome, "workspace-not-worktree-root");
    expect(grants).toHaveLength(0);
  });

  it("R023-RELATIVE: a relative workspace path refuses malformed-request", async () => {
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor("authorized/ws"), hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch);
    expectRefused(outcome, "malformed-request");
    expect(grants).toHaveLength(0);
  });

  it("R023-UNRESOLVABLE: a missing workspace or a missing authorized root refuses workspace-unresolvable", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    for (const workspace of [join(root, "missing"), join(base, "missing")]) {
      expectRefused(await admitSourceWrite(requestFor(workspace), hostFor(attestation), dispatch), "workspace-unresolvable", undefined, workspace);
    }
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { authorizedRoot: join(base, "no-root") }), dispatch), "workspace-unresolvable");
    expectRefused(confineWorkspace(join(base, "no-root"), ws, gitReader), "workspace-unresolvable");
    expect(grants).toHaveLength(0);
  });

  it("R023-ALIAS-INSIDE: a symlink that resolves inside the root dispatches against the canonical root", async () => {
    const alias = join(root, "alias");
    symlinkSync(ws, alias);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(alias), hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.identity.canonicalRoot)).toEqual([ws]);
  });

  it("R023-ROOT-ALIAS: an authorized root given as a symlink to the root dispatches against the canonical workspace", async () => {
    const rootAlias = join(base, "root-alias");
    symlinkSync(root, rootAlias);
    expect(confineWorkspace(rootAlias, ws, gitReader)).toEqual({ decision: "confined", canonicalRoot: ws });
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { authorizedRoot: rootAlias }), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.identity.canonicalRoot)).toEqual([ws]);
  });

  it("R023-SPACED-NAME: a workspace whose directory name holds a space, a non-ASCII letter and a trailing space dispatches", async () => {
    const spaced = fixtureRepo(join(root, `w ${String.fromCodePoint(0xe9)} `));
    expect(spaced.endsWith(" ")).toBe(true);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(spaced), hostFor(authority.attest(OPERATOR, identityOf(spaced))), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.identity.canonicalRoot)).toEqual([spaced]);
  });

  it("R023-CONFINE: confineWorkspace answers the sibling with a refusal and the workspace with its canonical root", () => {
    const sibling = fixtureRepo(`${root}-sibling`);
    expectRefused(confineWorkspace(root, sibling, gitReader), "workspace-outside-root");
    expect(confineWorkspace(root, `${ws}/.`, gitReader)).toEqual({ decision: "confined", canonicalRoot: ws });
  });
});

describe("EAT-R024: one writer lease per canonical workspace", { timeout: CASE_MS }, () => {
  it("R024-ALIAS: while one invocation writes, an alias and a dot spelling of the same workspace refuse writer-held", async () => {
    const alias = join(root, "alias");
    symlinkSync(ws, alias);
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const writing = deferred();
    const held: SourceWriteGrant[] = [];
    const pending = admitSourceWrite(requestFor(ws, "inv-a"), hostFor(attestation), async grant => {
      held.push(grant);
      await writing.promise;
      return "a";
    });
    expect(held).toHaveLength(1);
    expect(leases.holder(ws)).toBe("inv-a");
    const { grants, dispatch } = recorder();
    const viaAlias = await admitSourceWrite(requestFor(alias, "inv-b"), hostFor(attestation), dispatch);
    const viaDot = await admitSourceWrite(requestFor(`${ws}/.`, "inv-c"), hostFor(attestation), dispatch);
    expectRefused(viaAlias, "writer-held");
    expectRefused(viaDot, "writer-held");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBe("inv-a");
    writing.resolve();
    await expect(pending).resolves.toMatchObject({ decision: "dispatched", value: "a" });
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R024-CANCEL-OWN: a refused invocation's cancellation keeps the holder's lease; the holder's cancellation releases its own", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const park = parkedWait();
    const holderAbort = new AbortController();
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws, "inv-a"), hostFor(attestation, { admissionWait: park.wait, signal: holderAbort.signal }), dispatch);
    await park.entered.promise;
    expect(leases.holder(ws)).toBe("inv-a");
    const otherAbort = new AbortController();
    const refused = admitSourceWrite(requestFor(ws, "inv-b"), hostFor(attestation, { signal: otherAbort.signal }), dispatch);
    otherAbort.abort();
    expectRefused(await refused, "writer-held");
    expect(leases.holder(ws)).toBe("inv-a");
    holderAbort.abort();
    park.gate.resolve();
    expectRefused(await pending, "admission-cancelled");
    expect(leases.holder(ws)).toBeUndefined();
    expect(grants).toHaveLength(0);
    await expect(admitSourceWrite(requestFor(ws, "inv-c"), hostFor(attestation), dispatch)).resolves.toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.invocationId)).toEqual(["inv-c"]);
  });

  it("R024-STALE: a released lease never releases the next holder's lease", () => {
    const first = leases.acquire(ws, "inv-a");
    expect(first).toMatchObject({ canonicalRoot: ws, invocationId: "inv-a" });
    expect(leases.acquire(ws, "inv-b")).toBeUndefined();
    if (first === undefined) return;
    expect(leases.release(first)).toBe(true);
    const next = leases.acquire(ws, "inv-c");
    expect(next).toMatchObject({ invocationId: "inv-c" });
    expect(leases.release(first)).toBe(false);
    expect(leases.holder(ws)).toBe("inv-c");
  });

  it("R024-FOREIGN: a copy of the held lease, and a released lease of the same invocation after it acquired again, release nothing", () => {
    const held = leases.acquire(ws, "inv-a");
    expect(held).toBeDefined();
    expect(leases.release({ canonicalRoot: ws, invocationId: "inv-a" })).toBe(false);
    expect(leases.holder(ws)).toBe("inv-a");
    if (held === undefined) return;
    expect(leases.release(held)).toBe(true);
    const again = leases.acquire(ws, "inv-a");
    expect(again).toMatchObject({ canonicalRoot: ws, invocationId: "inv-a" });
    expect(again).not.toBe(held);
    expect(leases.release(held)).toBe(false);
    expect(leases.holder(ws)).toBe("inv-a");
  });

  it("R024-VALIDATION: acquire throws for a relative root and for a blank invocation, and takes no lease", () => {
    expect(() => leases.acquire("authorized/ws", "inv-a")).toThrow(CapabilityError);
    expect(() => leases.acquire(ws, " ")).toThrow(CapabilityError);
    expect(leases.holder(ws)).toBeUndefined();
    expect(leases.holder("authorized/ws")).toBeUndefined();
  });
});

describe("EAT-R025: the source basis is measured again after the asynchronous admission wait", { timeout: CASE_MS }, () => {
  async function parkAndChange(change: () => void, gateManifest = "forge.toml"): Promise<{ outcome: SourceAdmissionOutcome<string>; grants: SourceWriteGrant[] }> {
    const attestation = authority.attest(OPERATOR, identityOf(ws, gateManifest));
    const park = parkedWait();
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), hostFor(attestation, { gateManifest, admissionWait: park.wait }), dispatch);
    await park.entered.promise;
    change();
    park.gate.resolve();
    return { outcome: await pending, grants };
  }

  it("R025-CONTROL: a park with no change dispatches once", async () => {
    const { outcome, grants } = await parkAndChange(() => {});
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants).toHaveLength(1);
  });

  it("R025-COMMIT: a commit made while admission is parked (commit and tree change) refuses source-changed", async () => {
    const before = git(ws, "rev-parse", "HEAD^{tree}");
    const { outcome, grants } = await parkAndChange(() => {
      writeFileSync(join(ws, "README.md"), "# committed while parked\n");
      git(ws, "commit", "-q", "--no-verify", "-am", "parked change");
    });
    expect(git(ws, "rev-parse", "HEAD^{tree}")).not.toBe(before);
    expectRefused(outcome, "source-changed");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R025-AMEND: an amended commit with the same tree refuses source-changed", async () => {
    const tree = git(ws, "rev-parse", "HEAD^{tree}");
    const commit = git(ws, "rev-parse", "HEAD");
    const { outcome, grants } = await parkAndChange(() => {
      git(ws, "commit", "-q", "--no-verify", "--amend", "-m", "amended while parked");
    });
    expect(git(ws, "rev-parse", "HEAD^{tree}")).toBe(tree);
    expect(git(ws, "rev-parse", "HEAD")).not.toBe(commit);
    expectRefused(outcome, "source-changed");
    expect(grants).toHaveLength(0);
  });

  it("R025-GATE: gate manifest bytes changed while admission is parked refuse source-changed", async () => {
    const { outcome, grants } = await parkAndChange(() => {
      writeFileSync(join(ws, "gate.local.toml"), '[gate]\nsteps = ["lint", "test"]\n');
    }, "gate.local.toml");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expectRefused(outcome, "source-changed");
    expect(grants).toHaveLength(0);
  });

  it("R025-TRACKED: tracked bytes changed while admission is parked refuse source-changed", async () => {
    const { outcome, grants } = await parkAndChange(() => {
      writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 4;\n");
    });
    expectRefused(outcome, "source-changed");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });
});

describe("EAT-R026: the gate manifest digest is part of the source identity", { timeout: CASE_MS }, () => {
  it("R026-IDENTITY: changed gate manifest bytes change the identity while root, commit, tree and clean status hold", () => {
    const before = identityOf(ws, "gate.local.toml");
    const original = readFileSync(join(ws, "gate.local.toml"));
    const edited = '[gate]\nsteps = ["lint"]\n';
    writeFileSync(join(ws, "gate.local.toml"), edited);
    const after = identityOf(ws, "gate.local.toml");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expect([after.canonicalRoot, after.commit, after.tree, after.dirtiness]).toEqual([before.canonicalRoot, before.commit, before.tree, before.dirtiness]);
    expect(before.gateManifest).toEqual({ path: "gate.local.toml", sha256: sha256(original) });
    expect(after.gateManifest).toEqual({ path: "gate.local.toml", sha256: sha256(edited) });
    expect(after.digest).not.toBe(before.digest);
  });

  it("R026-STALE: the attestation of the old identity refuses attestation-stale; one for the new identity dispatches", async () => {
    const old = authority.attest(OPERATOR, identityOf(ws, "gate.local.toml"));
    const edited = '[gate]\nsteps = ["typing"]\n';
    writeFileSync(join(ws, "gate.local.toml"), edited);
    const { grants, dispatch } = recorder();
    const stale = await admitSourceWrite(requestFor(ws), hostFor(old, { gateManifest: "gate.local.toml" }), dispatch);
    expectRefused(stale, "attestation-stale");
    expect(grants).toHaveLength(0);
    const fresh = authority.attest(OPERATOR, identityOf(ws, "gate.local.toml"));
    const admitted = await admitSourceWrite(requestFor(ws), hostFor(fresh, { gateManifest: "gate.local.toml" }), dispatch);
    expect(admitted).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.identity.gateManifest.sha256)).toEqual([sha256(edited)]);
  });

  it("R026-MANIFEST-PATH: the same bytes under another manifest path are another identity, so its attestation refuses attestation-stale", async () => {
    mkdirSync(join(ws, "ignored"));
    writeFileSync(join(ws, "ignored", "gate.toml"), readFileSync(join(ws, "forge.toml")));
    const viaForge = identityOf(ws, "forge.toml");
    const viaIgnored = identityOf(ws, "ignored/gate.toml");
    expect(viaIgnored.gateManifest).toEqual({ path: "ignored/gate.toml", sha256: viaForge.gateManifest.sha256 });
    expect(viaIgnored.digest).not.toBe(viaForge.digest);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, viaForge), { gateManifest: "ignored/gate.toml" }), dispatch);
    expectRefused(outcome, "attestation-stale");
    expect(grants).toHaveLength(0);
  });

  it("R026-MANIFEST-ALIAS: a manifest declared through a symlink inside the workspace binds its target's path", () => {
    mkdirSync(join(ws, "ignored"));
    symlinkSync(join(ws, "forge.toml"), join(ws, "ignored", "alias.toml"));
    const direct = identityOf(ws, "forge.toml");
    const viaAlias = identityOf(ws, "ignored/alias.toml");
    expect(viaAlias.gateManifest).toEqual({ path: "forge.toml", sha256: direct.gateManifest.sha256 });
    expect(viaAlias.digest).toBe(direct.digest);
  });

  it("R026-DIGEST: the identity digest is identityDigest(SOURCE_IDENTITY_DOMAIN, the five members)", () => {
    const identity = identityOf(ws, "gate.local.toml");
    const { canonicalRoot, commit, tree, dirtiness, gateManifest } = identity;
    expect(identity.digest).toBe(identityDigest(SOURCE_IDENTITY_DOMAIN, { canonicalRoot, commit, tree, dirtiness, gateManifest }));
    expect(Object.keys(identity).sort()).toEqual(["canonicalRoot", "commit", "digest", "dirtiness", "gateManifest", "tree"]);
  });

  it("R026-FROZEN: the identity and its gateManifest member are frozen, and an assignment to the identity throws", () => {
    const identity = identityOf(ws);
    expect(Object.isFrozen(identity)).toBe(true);
    expect(Object.isFrozen(identity.gateManifest)).toBe(true);
    const other = fixtureRepo(join(root, "other"));
    expect(() => Object.assign(identity, { canonicalRoot: other })).toThrow(TypeError);
    expect(identity.canonicalRoot).toBe(ws);
    expect(authority.attest(OPERATOR, identity).workspace).toBe(ws);
  });

  it("R026-UNAVAILABLE: a missing, absolute, escaping or non-file manifest refuses gate-manifest-unavailable", () => {
    writeFileSync(join(root, "outside.toml"), '[gate]\nsteps = ["test"]\n');
    mkdirSync(join(ws, "ignored"));
    symlinkSync(join(root, "outside.toml"), join(ws, "ignored", "gate.toml"));
    symlinkSync(ws, join(root, "ws-alias"));
    writeFileSync(join(ws, "ignored", "locked.toml"), '[gate]\nsteps = ["test"]\n');
    chmodSync(join(ws, "ignored", "locked.toml"), 0o000);
    expect(() => readFileSync(join(ws, "ignored", "locked.toml"))).toThrow();
    expect(git(ws, "status", "--porcelain")).toBe("");
    for (const manifest of ["absent.toml", join(ws, "forge.toml"), "../outside.toml", "../ws-alias/forge.toml", "ignored/gate.toml", "src", "ignored/locked.toml"]) {
      expectRefused(measureSourceIdentity(ws, manifest, gitReader), "gate-manifest-unavailable", undefined, manifest);
    }
  });

  it("R026-NOT-REGULAR: a FIFO gate manifest refuses gate-manifest-unavailable", async () => {
    mkdirSync(join(ws, "ignored"));
    const fifo = join(ws, "ignored", "gate.fifo");
    execFileSync("mkfifo", [fifo]);
    // A writer that unblocks any reader that opens the FIFO, so a module that reads it answers instead of hanging.
    const writer = spawn("sh", ["-c", 'printf "[gate]\\n" > "$1"', "sh", fifo], { stdio: "ignore" });
    try {
      expectRefused(measureSourceIdentity(ws, "ignored/gate.fifo", gitReader), "gate-manifest-unavailable");
    } finally {
      writer.kill("SIGKILL");
      await settled(writer);
    }
  });

  it("R026-BOUND: a 1048576-byte gate manifest measures and a 1048577-byte one refuses gate-manifest-unavailable", () => {
    mkdirSync(join(ws, "ignored"));
    const most = Buffer.alloc(1048576, 0x61);
    writeFileSync(join(ws, "ignored", "most.toml"), most);
    writeFileSync(join(ws, "ignored", "over.toml"), Buffer.alloc(1048577, 0x61));
    expect(identityOf(ws, "ignored/most.toml").gateManifest).toEqual({ path: "ignored/most.toml", sha256: sha256(most) });
    expectRefused(measureSourceIdentity(ws, "ignored/over.toml", gitReader), "gate-manifest-unavailable");
  });
});

describe("EAT-R027: writes need an operator attestation the host minted for this workspace and identity", { timeout: CASE_MS }, () => {
  it("R027-ABSENT: allowWrites:true without a host attestation grants no write capability", async () => {
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(undefined), dispatch);
    expectRefused(outcome, "attestation-absent");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R027-POLICY-COPY: an attestation copied into the JSON policy is not authority", async () => {
    const copy: JsonValue = JSON.parse(JSON.stringify(authority.attest(OPERATOR, identityOf(ws))));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws, "inv-a", { allowWrites: true, attestation: copy }), hostFor(undefined), dispatch);
    expectRefused(outcome, "attestation-absent");
    expect(grants).toHaveLength(0);
  });

  it("R027-FORGED: an equal-shaped copy in the host's attestation slot was not minted and refuses attestation-absent", async () => {
    const minted = authority.attest(OPERATOR, identityOf(ws));
    const forged: WriteBoundaryAttestation = { ...minted };
    expect(forged).toEqual(minted);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(forged), dispatch);
    expectRefused(outcome, "attestation-absent");
    expect(grants).toHaveLength(0);
  });

  it("R027-FOREIGN-AUTHORITY: another authority's attestation is not this host's", async () => {
    const foreign = new WriteBoundaryAuthority().attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(foreign), dispatch);
    expectRefused(outcome, "attestation-absent");
    expect(grants).toHaveLength(0);
  });

  it("R027-OTHER-WORKSPACE: an attestation for another workspace refuses attestation-other-workspace", async () => {
    const other = fixtureRepo(join(root, "other"));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(other))), dispatch);
    expectRefused(outcome, "attestation-other-workspace");
    expect(grants).toHaveLength(0);
  });

  it("R027-NOT-REQUESTED: without an own allowWrites data member exactly true no write capability is granted, attested or not", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    let accessorCalls = 0;
    const accessor: JsonValue = {};
    Object.defineProperty(accessor, "allowWrites", {
      enumerable: true,
      get: () => {
        accessorCalls += 1;
        return true;
      },
    });
    class PolicyObject {
      readonly allowWrites = true;
    }
    const inherited: JsonValue = Object.create({ allowWrites: true });
    const requests: readonly SourceWriteRequest[] = [
      { invocationId: "inv-a", workspace: ws },
      { invocationId: "inv-a", workspace: ws, policy: { allowWrites: false } },
      { invocationId: "inv-a", workspace: ws, policy: { allowWrites: "true" } },
      { invocationId: "inv-a", workspace: ws, policy: { allowWrites: 1 } },
      { invocationId: "inv-a", workspace: ws, policy: [{ allowWrites: true }] },
      { invocationId: "inv-a", workspace: ws, policy: accessor },
      { invocationId: "inv-a", workspace: ws, policy: inherited },
      { invocationId: "inv-a", workspace: ws, policy: new PolicyObject() as unknown as JsonValue },
    ];
    for (const [index, request] of requests.entries()) {
      expectRefused(await admitSourceWrite(request, hostFor(attestation), dispatch), "writes-not-requested", undefined, `request ${index}`);
    }
    expect(accessorCalls).toBe(0);
    expect(grants).toHaveLength(0);
  });

  it("R027-REQUESTED: a plain and a null-prototype policy with an own allowWrites data member true dispatch", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    const nullPrototype: JsonValue = Object.assign(Object.create(null), { allowWrites: true });
    for (const policy of [{ allowWrites: true }, nullPrototype]) {
      await expect(admitSourceWrite(requestFor(ws, "inv-a", policy), hostFor(attestation), dispatch)).resolves.toMatchObject({ decision: "dispatched" });
    }
    expect(grants).toHaveLength(2);
  });

  it("R027-WITHDRAWN: an attestation the host withdraws while admission waits refuses attestation-absent", async () => {
    const park = parkedWait();
    const host = { ...hostFor(authority.attest(OPERATOR, identityOf(ws))), admissionWait: park.wait };
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), host, dispatch);
    await park.entered.promise;
    host.attestation = undefined;
    park.gate.resolve();
    expectRefused(await pending, "attestation-absent");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R027-REATTESTED: an attestation the host replaces while admission waits is read again, so the grant names the new operator", async () => {
    const identity = identityOf(ws);
    const park = parkedWait();
    const host = { ...hostFor(authority.attest(OPERATOR, identity)), admissionWait: park.wait };
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), host, dispatch);
    await park.entered.promise;
    host.attestation = authority.attest("operator-2", identity);
    park.gate.resolve();
    await expect(pending).resolves.toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.operatorId)).toEqual(["operator-2"]);
  });

  it("R027-UNMEASURED: the authority attests only a source identity the host measured, by a clean operator id", () => {
    const measured = identityOf(ws);
    const lookalike: SourceIdentity = { ...measured, gateManifest: { ...measured.gateManifest } };
    expect(() => authority.attest(OPERATOR, lookalike)).toThrow(/measured/);
    for (const operatorId of ["", " ", "operator\nnext"]) {
      expect(() => authority.attest(operatorId, measured), JSON.stringify(operatorId)).toThrow(/operator/);
    }
  });

  it("R027-ATTESTED: a minted attestation for this identity dispatches a frozen grant naming its operator", async () => {
    const identity = identityOf(ws);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identity)), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(Object.keys(outcome).sort()).toEqual(["decision", "identity", "value"]);
    expect(grants).toHaveLength(1);
    const grant = grants[0];
    expect(grant).toMatchObject({ invocationId: "inv-a", operatorId: OPERATOR, lease: { canonicalRoot: ws, invocationId: "inv-a" } });
    expect(grant?.identity.digest).toBe(identity.digest);
    expect(Object.isFrozen(grant)).toBe(true);
  });

  it("R027-ATTESTATION-FROZEN: a minted attestation is frozen, so it cannot be rewritten to name another workspace", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    expect(Object.isFrozen(attestation)).toBe(true);
    const other = identityOf(fixtureRepo(join(root, "other")));
    expect(() => Object.assign(attestation, { workspace: other.canonicalRoot, sourceIdentity: other.digest })).toThrow(TypeError);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(other.canonicalRoot), hostFor(attestation), dispatch);
    expectRefused(outcome, "attestation-other-workspace");
    expect(grants).toHaveLength(0);
  });
});

describe("admission lifecycle: cancellation, a refusing wait, a throwing dispatch and malformed input", { timeout: CASE_MS }, () => {
  it("GEN-PRE-ABORTED: an invocation cancelled before admission refuses admission-cancelled and takes no lease", async () => {
    const abort = new AbortController();
    abort.abort();
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { signal: abort.signal }), dispatch);
    expectRefused(outcome, "admission-cancelled");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-WAIT-REFUSED: a host admission wait that rejects refuses admission-refused and releases the lease", async () => {
    const park = parkedWait();
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { admissionWait: park.wait }), dispatch);
    await park.entered.promise;
    expect(leases.holder(ws)).toBe("inv-a");
    park.gate.reject(new Error("host budget closed"));
    expectRefused(await pending, "admission-refused");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-WAIT-CANCELLED: a wait that rejects because the signal aborted refuses admission-cancelled and releases the lease", async () => {
    const abort = new AbortController();
    const entered = deferred();
    const wait = (signal: AbortSignal | undefined): Promise<void> =>
      new Promise<void>((_, reject) => {
        signal?.addEventListener("abort", () => reject(new Error("wait cancelled")));
        entered.resolve();
      });
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { signal: abort.signal, admissionWait: wait }), dispatch);
    await entered.promise;
    expect(leases.holder(ws)).toBe("inv-a");
    abort.abort();
    expectRefused(await pending, "admission-cancelled");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-DISPATCH-THROWS: a dispatch that throws propagates its error and releases the lease", async () => {
    const failure = new Error("implement failed");
    const outcome = admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws))), async () => {
      throw failure;
    });
    await expect(outcome).rejects.toBe(failure);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-MALFORMED: a request without a clean invocation reference refuses malformed-request", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    const twoByte = String.fromCodePoint(0xe9);
    const invocationIds = ["", " ", "inv\nnext", `inv${String.fromCodePoint(0)}x`, `inv${String.fromCodePoint(0x1f)}x`, `inv${String.fromCodePoint(0x7f)}x`, "a".repeat(4097), twoByte.repeat(2049)];
    for (const invocationId of invocationIds) {
      expectRefused(await admitSourceWrite(requestFor(ws, invocationId), hostFor(attestation), dispatch), "malformed-request", undefined, `${invocationId.length} units`);
    }
    expect(grants).toHaveLength(0);
  });

  it("GEN-CLEAN-TEXT: an invocation reference of exactly 4096 UTF-8 bytes, ASCII or two-byte, dispatches", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    for (const invocationId of ["a".repeat(4096), String.fromCodePoint(0xe9).repeat(2048)]) {
      expect(Buffer.byteLength(invocationId)).toBe(4096);
      await expect(admitSourceWrite(requestFor(ws, invocationId), hostFor(attestation), dispatch)).resolves.toMatchObject({ decision: "dispatched" });
    }
    expect(grants).toHaveLength(2);
  });

  it("GEN-MALFORMED-SHAPES: a request that is not a plain object, a dispatch or reader that is not a function, or a relative root refuses malformed-request", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    class RequestObject {
      readonly invocationId = "inv-a";
      readonly workspace = ws;
      readonly policy = { allowWrites: true };
    }
    const shapes: readonly unknown[] = [null, "inv-a", [requestFor(ws)], new RequestObject()];
    for (const [index, shape] of shapes.entries()) {
      expectRefused(await admitSourceWrite(shape as SourceWriteRequest, hostFor(attestation), dispatch), "malformed-request", undefined, `shape ${index}`);
    }
    const notDispatch = "dispatch" as unknown as typeof dispatch;
    const notReader = "git" as unknown as SourceGitReader;
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation), notDispatch), "malformed-request");
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { authorizedRoot: "authorized" }), dispatch), "malformed-request");
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { git: notReader }), dispatch), "malformed-request");
    expectRefused(confineWorkspace("authorized", ws, gitReader), "malformed-request");
    for (const workspace of [join(root, "ws\nnext"), `/${"a".repeat(4096)}`]) {
      expectRefused(await admitSourceWrite(requestFor(workspace), hostFor(attestation), dispatch), "malformed-request", undefined, `${workspace.length} units`);
    }
    expectRefused(confineWorkspace(`${root}\n`, ws, gitReader), "malformed-request");
    expectRefused(measureSourceIdentity("authorized/ws", "forge.toml", gitReader), "malformed-request");
    for (const manifest of ["", " ", "forge\n.toml"]) {
      expectRefused(measureSourceIdentity(ws, manifest, gitReader), "malformed-request", undefined, JSON.stringify(manifest));
    }
    expectRefused(measureSourceIdentity(ws, "forge.toml", notReader), "malformed-request");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-READER-FAILS: a reader that throws or answers with no Buffer is a refusal, never a rejection", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const throwing: SourceGitReader = () => {
      throw new Error("git is not installed");
    };
    const textual: SourceGitReader = (directory, args) => {
      const output = gitReader(directory, args);
      return output === undefined ? undefined : (output.toString("utf8") as unknown as Buffer);
    };
    const { grants, dispatch } = recorder();
    for (const reader of [throwing, textual]) {
      expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { git: reader }), dispatch), "workspace-not-worktree-root");
      expectRefused(measureSourceIdentity(ws, "forge.toml", reader), "source-unmeasurable");
    }
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-REASON-FIXED: a refusal's reason names neither the caller's workspace nor its invocation", async () => {
    const elsewhere = fixtureRepo(join(base, "elsewhere-distinct-name"));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(elsewhere, "inv-distinct-token"), hostFor(authority.attest(OPERATOR, identityOf(elsewhere))), dispatch);
    expectRefused(outcome, "workspace-outside-root");
    expect(JSON.stringify(outcome)).not.toContain("elsewhere-distinct-name");
    expect(JSON.stringify(outcome)).not.toContain("inv-distinct-token");
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-SHAPE-CANCEL: a malformed request that is also cancelled refuses malformed-request", async () => {
    const abort = new AbortController();
    abort.abort();
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws, ""), hostFor(authority.attest(OPERATOR, identityOf(ws)), { signal: abort.signal }), dispatch), "malformed-request");
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-CANCEL-REQUEST: a cancelled request that asks for no writes refuses admission-cancelled", async () => {
    const abort = new AbortController();
    abort.abort();
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws, "inv-a", {}), hostFor(authority.attest(OPERATOR, identityOf(ws)), { signal: abort.signal }), dispatch), "admission-cancelled");
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-REQUEST-CONFINE: a request that asks for no writes against an outside workspace refuses writes-not-requested", async () => {
    const elsewhere = fixtureRepo(join(base, "elsewhere"));
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(elsewhere, "inv-a", {}), hostFor(authority.attest(OPERATOR, identityOf(elsewhere))), dispatch), "writes-not-requested");
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-CONFINE-MEASURE: a dirty workspace outside the root refuses workspace-outside-root", async () => {
    const elsewhere = fixtureRepo(join(base, "elsewhere"));
    const attestation = authority.attest(OPERATOR, identityOf(elsewhere));
    writeFileSync(join(elsewhere, "notes.txt"), "untracked\n");
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(elsewhere), hostFor(attestation), dispatch), "workspace-outside-root");
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-MEASURE-ATTEST: a dirty base without an attestation refuses dirty-base", async () => {
    writeFileSync(join(ws, "notes.txt"), "untracked\n");
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(undefined), dispatch), "dirty-base", { tracked: 0, staged: 0, untracked: 1 });
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-STATUS-MANIFEST: a dirty base whose gate manifest is missing refuses dirty-base", async () => {
    writeFileSync(join(ws, "README.md"), "# tracked edit\n");
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(undefined, { gateManifest: "absent.toml" }), dispatch), "dirty-base", { tracked: 1, staged: 0, untracked: 0 });
    expectRefused(measureSourceIdentity(ws, "absent.toml", gitReader), "dirty-base", { tracked: 1, staged: 0, untracked: 0 });
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-ATTEST-LEASE: an unattested request while another invocation holds the lease refuses attestation-absent", async () => {
    expect(leases.acquire(ws, "inv-a")).toBeDefined();
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws, "inv-b"), hostFor(undefined), dispatch), "attestation-absent");
    expect(leases.holder(ws)).toBe("inv-a");
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-WAIT-REFUSED: a refusing wait while the source changed refuses admission-refused", async () => {
    const park = parkedWait();
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { admissionWait: park.wait }), dispatch);
    await park.entered.promise;
    writeFileSync(join(ws, "README.md"), "# changed while the wait refuses\n");
    park.gate.reject(new Error("host budget closed"));
    expectRefused(await pending, "admission-refused");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-ORDER-WAIT-CANCEL: cancellation during the wait while the source changed refuses admission-cancelled", async () => {
    const park = parkedWait();
    const abort = new AbortController();
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { admissionWait: park.wait, signal: abort.signal }), dispatch);
    await park.entered.promise;
    writeFileSync(join(ws, "README.md"), "# changed while cancelled\n");
    abort.abort();
    park.gate.resolve();
    expectRefused(await pending, "admission-cancelled");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-ORDER-REMEASURE-REATTEST: a source change and a withdrawn attestation during the wait refuse source-changed", async () => {
    const park = parkedWait();
    const host = { ...hostFor(authority.attest(OPERATOR, identityOf(ws))), admissionWait: park.wait };
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), host, dispatch);
    await park.entered.promise;
    writeFileSync(join(ws, "README.md"), "# changed while withdrawn\n");
    host.attestation = undefined;
    park.gate.resolve();
    expectRefused(await pending, "source-changed");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });
});
