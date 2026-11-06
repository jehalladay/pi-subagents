/**
 * wb-s8rm [MWI-source]: host-owned write admission against an immutable source identity. Program
 * mechanical-workflows-interop-2026-11-04, slice PI-1, bead B-source: requirements EAT-R022..EAT-R027 of
 * triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e, quoted below with their acceptance and
 * adversarial mutant. The program is design-only; this suite pins the Pi-local admission seam, src/workbench/source-admission.ts.
 *
 * Every case drives that module on real Git repositories built in tracked scratch (test/helpers/scratch.ts), read through the
 * suite's SourceGitReader: real git with the repository-locating variables removed. The write-capable dispatch is the injected
 * `dispatch` callback, so "no write-capable host dispatch", "refusal before SDK dispatch" and "no child write capability" each read
 * as zero calls to it; a SourceWriteGrant is only ever what that callback receives.
 *
 * PINNED READER SET (case id: assertion target). Every refusal row also asserts zero dispatches.
 * - EAT-R022 "Pi MUST refuse a dirty implementation base." Acceptance: "Set tracked, staged or untracked edits at admission; assert
 *   no write-capable host dispatch; clean committed tree passes." Mutant: "Use HEAD equality alone."
 *   R022-CLEAN: one dispatch whose grant names the HEAD commit and tree git reports. R022-TRACKED, R022-STAGED, R022-UNTRACKED:
 *   refusal dirty-base with the edit counted in its own column. R022-ASSUME-UNCHANGED, R022-SKIP-WORKTREE: an edit hidden from git
 *   status by an index flag refuses source-unmeasurable. R022-MISDIRECTED-GIT: a reader that points git at another repository
 *   refuses source-unmeasurable. R022-IGNORED: an ignored build file is not an edit (one dispatch).
 * - EAT-R023 "Pi MUST confine the workspace to the authorized canonical root." Acceptance: "Supply wrong workspace, prefix-collision
 *   sibling and realpath escape; assert refusal before writing." Mutant: "Accept string startsWith root."
 *   R023-WRONG, R023-SIBLING, R023-ESCAPE: refusal workspace-outside-root although the operator attested that workspace.
 *   R023-SUBDIR: a subdirectory of a worktree refuses workspace-not-worktree-root. R023-RELATIVE: a relative path refuses
 *   malformed-request. R023-ALIAS-INSIDE: a symlink that resolves inside the root dispatches against the canonical root.
 *   R023-CONFINE: confineWorkspace itself answers the sibling and the workspace.
 * - EAT-R024 "Pi MUST bind a single writer to each materialized workspace." Acceptance: "Admit two invocation IDs for the same
 *   canonical workspace; at most one writer lease is granted; cancellation releases only the lease it owns." Mutant: "Allocate lease
 *   by caller alias instead of canonical root."
 *   R024-ALIAS: while one invocation writes, a symlink alias and a dot spelling of the same workspace refuse writer-held.
 *   R024-CANCEL-OWN: a refused invocation's cancellation leaves the holder's lease; the holder's cancellation releases it.
 *   R024-STALE: a released lease never releases the next holder's lease.
 * - EAT-R025 "Pi MUST recheck the source basis after asynchronous admission." Acceptance: "Park admission, change commit/tree, gate
 *   manifest or tracked bytes, release; assert refusal before SDK dispatch." Mutant: "Check source only before await."
 *   R025-COMMIT (commit and tree), R025-AMEND (commit, same tree), R025-GATE (gate manifest bytes), R025-TRACKED (tracked bytes):
 *   refusal source-changed and the lease released. R025-CONTROL: a park with no change dispatches once.
 * - EAT-R026 "Pi MUST bind the gate manifest digest to source identity." Acceptance: "Hold commit and prompt constant while changing
 *   gate manifest bytes; assert identity changes and an old authorization is rejected." Mutant: "Drop gate digest from the source
 *   basis."
 *   R026-IDENTITY: same root, commit, tree and clean status, different gate digest (the SHA-256 of the bytes) and identity digest.
 *   R026-STALE: the attestation of the old identity refuses attestation-stale; one for the new identity dispatches.
 *   R026-UNAVAILABLE: a missing manifest, a path out of the workspace and a symlink out of it refuse gate-manifest-unavailable.
 * - EAT-R027 "Pi MUST require an operator-attested write boundary." Acceptance: "Launch with allowWrites:true but absent host
 *   attestation; assert no child write capability. An attestation for another workspace also refuses." Mutant: "Trust JSON policy as
 *   authorization."
 *   R027-ABSENT: allowWrites:true and no attestation refuses attestation-absent. R027-POLICY-COPY: an attestation copied into the
 *   JSON policy is not read. R027-FORGED: an equal-shaped copy in the host slot is not minted. R027-FOREIGN-AUTHORITY: another
 *   authority's attestation is not this host's. R027-OTHER-WORKSPACE: refusal attestation-other-workspace. R027-NOT-REQUESTED: no
 *   write request, no write capability. R027-WITHDRAWN: an attestation withdrawn while admission waits refuses. R027-UNMEASURED:
 *   the authority attests only an identity the host measured. R027-ATTESTED: the grant carries the operator and is frozen.
 * - General: GEN-PRE-ABORTED (admission-cancelled, no lease), GEN-WAIT-REFUSED (admission-refused, lease released),
 *   GEN-DISPATCH-THROWS (the error propagates, lease released), GEN-MALFORMED (malformed-request), GEN-READER-FAILS (a reader that
 *   throws or answers with no Buffer is a refusal, never a rejection).
 *
 * NOT CLAIMED (scope sentences; each bounds what this suite proves):
 * - The function branch of workflow_execute is NOT CLAIMED by this suite: execute-tool.ts still refuses a function definition
 *   (unsupported-definition-kind) until the dispatch bead (EAT-R032..EAT-R035) composes this seam.
 * - Writer exclusivity across host processes is NOT CLAIMED by this suite: one WriterLeases registry binds one host's writers.
 * - An edit made outside Pi after the final measurement is NOT CLAIMED by this suite.
 * - Ignored paths other than the gate manifest are NOT CLAIMED by this suite: dirtiness reads tracked, staged and untracked paths.
 * - The location of a worktree's Git directory is NOT CLAIMED by this suite: confinement reads the working tree's canonical root.
 * - The host's own git reader (its process and environment) is NOT CLAIMED by this suite: the module launches nothing, and the
 *   suite's reader stands in for the host's.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import {
  admitSourceWrite,
  confineWorkspace,
  measureSourceIdentity,
  type SourceAdmissionHost,
  type SourceAdmissionOutcome,
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

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", [...FIXTURE_GIT, ...args], { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function sha256(bytes: string | Buffer): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

/** Variables that point git at another repository, index or object store than the directory it runs in. */
const LOCATING_ENV: readonly string[] = ["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_COMMON_DIR", "GIT_NAMESPACE"];

/** The suite's SourceGitReader: real git in the directory, the locating variables removed, then `extra` set. */
function readerWith(extra: Readonly<Record<string, string>> = {}): SourceGitReader {
  const env = { ...Object.fromEntries(Object.entries(process.env).filter(([name]) => !LOCATING_ENV.includes(name))), ...extra };
  return (directory, args) => {
    try {
      return execFileSync("git", ["-C", directory, ...args], { env, encoding: "buffer", maxBuffer: 16 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"], timeout: 30_000 });
    } catch {
      return undefined;
    }
  };
}

const gitReader = readerWith();

/** A clean repository: README.md, forge.toml and src/index.ts committed; gate.local.toml and ignored/ ignored. Canonical path. */
function fixtureRepo(path: string): string {
  mkdirSync(path, { recursive: true });
  git(path, "init", "-q");
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
    expect(outcome).toMatchObject({ decision: "refused", code: "dirty-base", dirty: { tracked: 1, staged: 0, untracked: 0 } });
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R022-STAGED: a staged edit refuses dirty-base", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 2;\n");
    git(ws, "add", "src/index.ts");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "dirty-base", dirty: { tracked: 0, staged: 1, untracked: 0 } });
    expect(grants).toHaveLength(0);
  });

  it("R022-UNTRACKED: an untracked file refuses dirty-base", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "notes.txt"), "not added\n");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "dirty-base", dirty: { tracked: 0, staged: 0, untracked: 1 } });
    expect(grants).toHaveLength(0);
  });

  it("R022-ASSUME-UNCHANGED: an edit hidden from git status by assume-unchanged refuses source-unmeasurable", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "README.md"), "# edited under assume-unchanged\n");
    git(ws, "update-index", "--assume-unchanged", "README.md");
    expect(git(ws, "status", "--porcelain")).toBe("");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "source-unmeasurable" });
    expect(grants).toHaveLength(0);
  });

  it("R022-SKIP-WORKTREE: an edit hidden from git status by skip-worktree refuses source-unmeasurable", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 3;\n");
    git(ws, "update-index", "--skip-worktree", "src/index.ts");
    expect(git(ws, "status", "--porcelain")).toBe("");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "source-unmeasurable" });
    expect(grants).toHaveLength(0);
  });

  it("R022-MISDIRECTED-GIT: a reader that points git at another repository refuses source-unmeasurable", async () => {
    const other = fixtureRepo(join(root, "other"));
    writeFileSync(join(other, "README.md"), "# another history\n");
    git(other, "commit", "-q", "--no-verify", "-am", "another history");
    const misdirected = readerWith({ GIT_DIR: join(other, ".git") });
    expect(misdirected(ws, ["rev-parse", "--show-toplevel"])?.toString("utf8").trim()).toBe(ws);
    expect(measureSourceIdentity(ws, "forge.toml", misdirected)).toMatchObject({ decision: "refused", code: "source-unmeasurable" });
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { git: misdirected }), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "source-unmeasurable" });
    expect(grants).toHaveLength(0);
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
    expect(outcome).toMatchObject({ decision: "refused", code: "workspace-outside-root" });
    expect(grants).toHaveLength(0);
    expect(leases.holder(elsewhere)).toBeUndefined();
  });

  it("R023-SIBLING: a prefix-collision sibling of the authorized root refuses workspace-outside-root", async () => {
    const sibling = fixtureRepo(`${root}-sibling`);
    expect(sibling.startsWith(root)).toBe(true);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(sibling), hostFor(authority.attest(OPERATOR, identityOf(sibling))), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "workspace-outside-root" });
    expect(grants).toHaveLength(0);
  });

  it("R023-ESCAPE: a symlink inside the root that resolves outside it refuses workspace-outside-root", async () => {
    const elsewhere = fixtureRepo(join(base, "elsewhere"));
    const escapeLink = join(root, "escape");
    symlinkSync(elsewhere, escapeLink);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(escapeLink), hostFor(authority.attest(OPERATOR, identityOf(elsewhere))), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "workspace-outside-root" });
    expect(grants).toHaveLength(0);
  });

  it("R023-SUBDIR: a subdirectory of a worktree refuses workspace-not-worktree-root", async () => {
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(join(ws, "src")), hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "workspace-not-worktree-root" });
    expect(grants).toHaveLength(0);
  });

  it("R023-RELATIVE: a relative workspace path refuses malformed-request", async () => {
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor("authorized/ws"), hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "malformed-request" });
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

  it("R023-CONFINE: confineWorkspace answers the sibling with a refusal and the workspace with its canonical root", () => {
    const sibling = fixtureRepo(`${root}-sibling`);
    expect(confineWorkspace(root, sibling, gitReader)).toMatchObject({ decision: "refused", code: "workspace-outside-root" });
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
    expect(viaAlias).toMatchObject({ decision: "refused", code: "writer-held" });
    expect(viaDot).toMatchObject({ decision: "refused", code: "writer-held" });
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
    await expect(refused).resolves.toMatchObject({ decision: "refused", code: "writer-held" });
    expect(leases.holder(ws)).toBe("inv-a");
    holderAbort.abort();
    park.gate.resolve();
    await expect(pending).resolves.toMatchObject({ decision: "refused", code: "admission-cancelled" });
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
    expect(outcome).toMatchObject({ decision: "refused", code: "source-changed" });
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
    expect(outcome).toMatchObject({ decision: "refused", code: "source-changed" });
    expect(grants).toHaveLength(0);
  });

  it("R025-GATE: gate manifest bytes changed while admission is parked refuse source-changed", async () => {
    const { outcome, grants } = await parkAndChange(() => {
      writeFileSync(join(ws, "gate.local.toml"), '[gate]\nsteps = ["lint", "test"]\n');
    }, "gate.local.toml");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expect(outcome).toMatchObject({ decision: "refused", code: "source-changed" });
    expect(grants).toHaveLength(0);
  });

  it("R025-TRACKED: tracked bytes changed while admission is parked refuse source-changed", async () => {
    const { outcome, grants } = await parkAndChange(() => {
      writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 4;\n");
    });
    expect(outcome).toMatchObject({ decision: "refused", code: "source-changed" });
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
    expect(stale).toMatchObject({ decision: "refused", code: "attestation-stale" });
    expect(grants).toHaveLength(0);
    const fresh = authority.attest(OPERATOR, identityOf(ws, "gate.local.toml"));
    const admitted = await admitSourceWrite(requestFor(ws), hostFor(fresh, { gateManifest: "gate.local.toml" }), dispatch);
    expect(admitted).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.identity.gateManifest.sha256)).toEqual([sha256(edited)]);
  });

  it("R026-UNAVAILABLE: a missing manifest, a path out of the workspace and a symlink out of it refuse gate-manifest-unavailable", () => {
    writeFileSync(join(root, "outside.toml"), '[gate]\nsteps = ["test"]\n');
    mkdirSync(join(ws, "ignored"));
    symlinkSync(join(root, "outside.toml"), join(ws, "ignored", "gate.toml"));
    expect(git(ws, "status", "--porcelain")).toBe("");
    for (const manifest of ["absent.toml", "../outside.toml", "ignored/gate.toml"]) {
      expect(measureSourceIdentity(ws, manifest, gitReader), manifest).toMatchObject({ decision: "refused", code: "gate-manifest-unavailable" });
    }
  });
});

describe("EAT-R027: writes need an operator attestation the host minted for this workspace and identity", { timeout: CASE_MS }, () => {
  it("R027-ABSENT: allowWrites:true without a host attestation grants no write capability", async () => {
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(undefined), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "attestation-absent" });
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R027-POLICY-COPY: an attestation copied into the JSON policy is not authority", async () => {
    const copy: JsonValue = JSON.parse(JSON.stringify(authority.attest(OPERATOR, identityOf(ws))));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws, "inv-a", { allowWrites: true, attestation: copy }), hostFor(undefined), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "attestation-absent" });
    expect(grants).toHaveLength(0);
  });

  it("R027-FORGED: an equal-shaped copy in the host's attestation slot was not minted and refuses attestation-absent", async () => {
    const minted = authority.attest(OPERATOR, identityOf(ws));
    const forged: WriteBoundaryAttestation = { ...minted };
    expect(forged).toEqual(minted);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(forged), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "attestation-absent" });
    expect(grants).toHaveLength(0);
  });

  it("R027-FOREIGN-AUTHORITY: another authority's attestation is not this host's", async () => {
    const foreign = new WriteBoundaryAuthority().attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(foreign), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "attestation-absent" });
    expect(grants).toHaveLength(0);
  });

  it("R027-OTHER-WORKSPACE: an attestation for another workspace refuses attestation-other-workspace", async () => {
    const other = fixtureRepo(join(root, "other"));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(other))), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "attestation-other-workspace" });
    expect(grants).toHaveLength(0);
  });

  it("R027-NOT-REQUESTED: without allowWrites:true no write capability is granted, attested or not", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    const requests: readonly SourceWriteRequest[] = [
      { invocationId: "inv-a", workspace: ws },
      { invocationId: "inv-a", workspace: ws, policy: { allowWrites: false } },
      { invocationId: "inv-a", workspace: ws, policy: { allowWrites: "true" } },
      { invocationId: "inv-a", workspace: ws, policy: [{ allowWrites: true }] },
    ];
    for (const request of requests) {
      const outcome = await admitSourceWrite(request, hostFor(attestation), dispatch);
      expect(outcome, JSON.stringify(request.policy ?? null)).toMatchObject({ decision: "refused", code: "writes-not-requested" });
    }
    expect(grants).toHaveLength(0);
  });

  it("R027-WITHDRAWN: an attestation the host withdraws while admission waits refuses attestation-absent", async () => {
    const park = parkedWait();
    const host = { ...hostFor(authority.attest(OPERATOR, identityOf(ws))), admissionWait: park.wait };
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), host, dispatch);
    await park.entered.promise;
    host.attestation = undefined;
    park.gate.resolve();
    await expect(pending).resolves.toMatchObject({ decision: "refused", code: "attestation-absent" });
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R027-UNMEASURED: the authority attests only a source identity the host measured", () => {
    const measured = identityOf(ws);
    const lookalike: SourceIdentity = { ...measured, gateManifest: { ...measured.gateManifest } };
    expect(() => authority.attest(OPERATOR, lookalike)).toThrow(/measured/);
    expect(() => authority.attest("", measured)).toThrow(/operator/);
  });

  it("R027-ATTESTED: a minted attestation for this identity dispatches a frozen grant naming its operator", async () => {
    const identity = identityOf(ws);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identity)), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants).toHaveLength(1);
    const grant = grants[0];
    expect(grant).toMatchObject({ invocationId: "inv-a", operatorId: OPERATOR, lease: { canonicalRoot: ws, invocationId: "inv-a" } });
    expect(grant?.identity.digest).toBe(identity.digest);
    expect(Object.isFrozen(grant)).toBe(true);
  });
});

describe("admission lifecycle: cancellation, a refusing wait, a throwing dispatch and malformed input", { timeout: CASE_MS }, () => {
  it("GEN-PRE-ABORTED: an invocation cancelled before admission refuses admission-cancelled and takes no lease", async () => {
    const abort = new AbortController();
    abort.abort();
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { signal: abort.signal }), dispatch);
    expect(outcome).toMatchObject({ decision: "refused", code: "admission-cancelled" });
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
    await expect(pending).resolves.toMatchObject({ decision: "refused", code: "admission-refused" });
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
    for (const invocationId of ["", " ", "inv\nnext"]) {
      const outcome = await admitSourceWrite(requestFor(ws, invocationId), hostFor(attestation), dispatch);
      expect(outcome, JSON.stringify(invocationId)).toMatchObject({ decision: "refused", code: "malformed-request" });
    }
    expect(grants).toHaveLength(0);
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
      await expect(admitSourceWrite(requestFor(ws), hostFor(attestation, { git: reader }), dispatch)).resolves.toMatchObject({ decision: "refused", code: "workspace-not-worktree-root" });
      expect(measureSourceIdentity(ws, "forge.toml", reader)).toMatchObject({ decision: "refused", code: "source-unmeasurable" });
    }
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });
});
