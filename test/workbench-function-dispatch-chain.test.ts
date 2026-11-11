/**
 * wb-2ukh [MNI-2026-11-09 P03]: function authority and writer source admission composed into ONE effectful dispatch chain,
 * src/workbench/function-dispatch-chain.ts. Requirements EAT-R227..EAT-R234 of
 * docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents
 * master 18b016b2 (packet P03 of docs/programs/mechanical-native-interoperability-2026-11-09/02-IMPLEMENTATION-PACKAGES.md at
 * master b085c34e; that tree is master-only). Evidence tier V1 only: red/green focused tests and adversarial mutants on named
 * fixtures (03-VERIFICATION-AND-RELEASE.md), never an installed runtime, a registered tool or a native provider.
 *
 * Every case drives dispatchFunctionChain on real Git repositories built in tracked scratch (test/helpers/scratch.ts), read
 * through the suite's SourceGitReader (real git with the repository-locating variables removed; the cases that say so wrap it
 * to rewrite chosen calls), with a real workflow_execute admission (decideExecute) of one digest-pinned function definition and
 * the fixture contract CONTRACT, which adoptFunctionActions binds to the TEST FIXTURE spelling fixture-fn:develop-write (src
 * adopts no spelling). The effect is the suite's `effect`, which calls the import, writer and Forge spies once each, in that
 * order, and the SDK query spy when its grant carries SDK rights, so "zero import, writer and Forge calls" reads as zero calls
 * to each spy. The installation barrier is the host's package.admit; the admission wait is the source host's admissionWait,
 * parked and released by the cases that say so. Every argument a case does not name is valid as chainFor builds it.
 *
 * CLAIMS (one line each; the census case CHAIN-CENSUS holds these lines to its REQUIREMENTS table and their ids to the module
 * header of src/workbench/function-dispatch-chain.ts):
 *   EAT-R227: the chain requires claude:invoke and one claude:tool:<name> right per host-configured tool in the host grant read at entry and again at the final boundary, independent of the function action, and forwards no other right.
 *   EAT-R228: the final boundary reads the host grants and the effective identity again after the admission wait and refuses a revoked action grant, a changed principal or session, or unknown permission data with zero effect calls.
 *   EAT-R229: the effect writes only a clean worktree root under the authorized root that asks for writes and is attested, and the listed sibling, escape, dirty, unmerged, submodule and no-write forms refuse with their bytes kept.
 *   EAT-R230: a reader whose Git directory, HEAD commit, HEAD tree, index entry or worktree root is not the workspace's own refuses with zero effect calls, and request text never changes the measured commit and tree.
 *   EAT-R231: the dispatched source basis binds the commit, the tree and the SHA-256 of the host gate manifest, and a HEAD move, a manifest byte change, a manifest path switch or a manifest removal during the wait refuses source-changed.
 *   EAT-R232: one canonical root admits one writer at a time through the chain, its symlink alias included, independent roots each admit one, and a settled or refused invocation frees the root.
 *   EAT-R233: only a host-minted attestation of the current root and identity passes, read again after the wait, and a replacement by another operator dispatches under that operator while the fresh identity check still governs.
 *   EAT-R234: after the installation barrier and the admission wait, one synchronous segment of fresh source, attestation, authority, SDK and package decisions invokes the single effect, whose outcome carries a P03 V1 component receipt.
 *
 * PINNED READER SET (case id: assertion target; observed at the cut: every case passing).
 * - EAT-R227 (host tools Read and Edit, so the rights claude:invoke, claude:tool:Read and claude:tool:Edit): R227-HELD, one
 *   dispatch whose grant carries exactly those three rights and one SDK query; R227-NO-SESSION, a host with no SDK edge
 *   dispatches with no right and no query; R227-MISSING, each right deleted from the host grants refuses sdk/entry
 *   missing-sdk-right before the installation barrier; R227-REVOKED-PARKED, each revoked during the wait refuses sdk/final
 *   missing-sdk-right and frees the root; R227-REQUEST-ONLY, the rights and two Forge rights named only by the caller policy and
 *   input refuse missing-sdk-right; R227-INDEPENDENT, the rights without the action grant refuse authority
 *   missing-function-action-grant and the action grant without claude:invoke refuses missing-sdk-right; R227-NOT-FORWARDED, a
 *   held claude:tool:Bash the configuration does not name (and the policy does) is not in the grant; R227-UNKNOWN-CONFIG, a
 *   tool configuration read that is undefined, a string, or a list holding a number or null refuses unknown-sdk-rights.
 * - EAT-R228: R228-UNCHANGED, parked with no change one dispatch on the host identity and exactly workbench:execute and the
 *   action, with the identity and grants each read twice in the order identity, grants, grants, identity; R228-PARKED-CHANGES,
 *   the action grant revoked, the principal changed, the session changed, a grant read holding Not A Grant and a grant read
 *   that is a string, each while parked, refuse authority/final (missing-function-action-grant, changed-effective-identity
 *   twice, unknown-permission-data twice) and free the root; R228-REQUEST-IDENTITY, a policy and input naming another
 *   principal, session, identity and extra grants leave the dispatched authority on the host's; R228-ENTRY-FIRST, a missing
 *   workbench:execute refuses authority/entry with zero admit, wait and Git calls.
 * - EAT-R229: R229-CLEAN, one dispatch whose source grant names ws, the HEAD commit and tree git reports and the operator;
 *   R229-SIBLING (a prefix-collision sibling) and R229-SYMLINK-ESCAPE (a symlink in the root to a repository outside it) refuse
 *   workspace-outside-root; R229-DIRTY, a tracked edit, a staged edit, an untracked file and a staged rename refuse dirty-base
 *   with counts 1/0/0, 0/1/0, 0/0/1 and 0/2/0; R229-UNMERGED refuses source-unmeasurable; R229-SUBMODULE, a committed submodule
 *   whose checkout moved refuses dirty-base 1/0/0; R229-NO-WRITE-POLICY, no policy, allowWrites false and allowWrites "true"
 *   refuse writes-not-requested. Each refusing case keeps the workspace bytes it reads before the call.
 * - EAT-R230: R230-GIT-DIR (GIT_DIR naming another repository), R230-HEAD-OBJECTS (a HEAD commit answer and a HEAD tree answer
 *   that are no object id) and R230-INDEX-ENTRY (an assume-unchanged entry, and an ls-files record tagged X) refuse
 *   source-unmeasurable; R230-TOPLEVEL, a reader reporting ws2 as the worktree root of ws refuses workspace-not-worktree-root;
 *   R230-FORGED-INPUT, a forged commit, tree and identity in the policy and input dispatch on the commit and tree git reports.
 * - EAT-R231: R231-BASIS, parked and unchanged, one dispatch whose identity holds the HEAD commit, tree and forge.toml with the
 *   SHA-256 of its bytes; R231-HEAD-MOVED, a new commit, an amend and a reset to the parent during the wait; R231-MANIFEST-BYTES,
 *   the ignored manifest gate.local.toml rewritten; R231-MANIFEST-PATH, the host manifest path switched from forge.toml to
 *   gate.local.toml; R231-MANIFEST-REMOVED, gate.local.toml removed; each refuses source-changed.
 * - EAT-R232: R232-SAME-ROOT and R232-ALIAS, while one chain holds ws through its wait a second on ws, or on a symlink alias of
 *   ws, refuses writer-held, and the effect runs once in all; R232-INDEPENDENT, a second chain on ws2 dispatches while the first
 *   waits, then the first dispatches; R232-RELEASED, after a dispatch settles, and after a final-boundary refusal, the next
 *   chain on ws dispatches; R232-UNCERTAIN-RELEASES, the residual row below.
 * - EAT-R233: R233-CURRENT, one dispatch under the attesting operator with the attestation read at entry and after the wait;
 *   R233-ENTRY-FORMS, none, an equal-shaped copy and another authority's attestation refuse attestation-absent, an attestation of
 *   ws2 attestation-other-workspace and one of an earlier identity of ws attestation-stale; R233-REQUEST-MINTED, a copy carried
 *   only by the policy and input refuses attestation-absent; R233-REPLACED-PARKED, the same five replacements made during the
 *   wait refuse the same codes (stale: an attestation of ws under another gate manifest); R233-OTHER-OPERATOR, a replacement
 *   by operator-2 during the wait dispatches under operator-2 on the host identity, and with the principal also changed
 *   refuses authority/final changed-effective-identity.
 * - EAT-R234: R234-ONE-DISPATCH, the whole read sequence of one parked dispatch and its frozen grant; R234-NO-AWAIT, a microtask
 *   the first post-wait Git read queues and a revocation the final grant read queues both land after the effect is invoked;
 *   R234-SINGLE-FAULTS, a missing action grant, an absent attestation, an unadmitted package, a package changed during the
 *   wait and a dirty base each refuse with zero calls; R234-PACKAGE, an admit that resolves undefined or the empty string or
 *   rejects refuses package/entry package-unadmitted with zero Git reads and no lease, and a current package read of undefined
 *   after the wait refuses package/final package-changed; R234-RECEIPT, the frozen receipt {packet P03, evidence V1, ...} whose
 *   JSON names no other tier; R234-UNADOPTED, under the shipped FUNCTION_ACTION_CONTRACT a host holding the proposed
 *   mechanical:develop-write refuses authority/entry function-action-unadopted with zero admit and wait calls;
 *   R234-FIXED-REASONS, each chain code's refusal carries FUNCTION_CHAIN_REASONS[code] and the invocation id.
 *
 * NOT CLAIMED (scope sentences; no residual semantics, no follow-up bead):
 * - The registered-path oracle PI-FUNCTION-REGISTERED (V3) is NOT CLAIMED by this census: no registered tool calls the chain
 *   until P04 (wb-4bxo), so each requirement's registered-path criterion is P04/P08's.
 * - An adopted action spelling is NOT CLAIMED by this census: P00 (wb-w8fk) rules it, and src keeps FUNCTION_ACTION_CONTRACT
 *   unadopted.
 * - Lease custody under an adopted protocol after an uncertain effect is NOT CLAIMED by this census (the lease owner is the P00
 *   ruling EAT-R207); its present form is the residual below.
 * - Cross-process writer exclusion is NOT CLAIMED by this census: one WriterLeases registry binds one host process.
 * - Detached placement is NOT CLAIMED by this census: every case is embedded.
 * - A native SDK session, an installed producer package (V2) and a native Forge gate (V4) are NOT CLAIMED by this census: the
 *   SDK query, the import, the writer and the Forge call are the suite's spies, and the package identity is the host's answer.
 * - Host reads that throw, requests other than decideExecute admissions of the fixture definition, and Git forms other than
 *   the listed ones are NOT CLAIMED by this census; test/workbench-mechanical-source-admission.test.ts pins the seam's own.
 *
 * RESIDUAL (named family + pinned quiet row, rule 19(d)):
 * - UNCERTAIN-EFFECT-LEASE: the chain releases the writer lease when the effect rejects, so an invocation whose effect outcome is
 *   unknown frees its root at once. Quiet row R232-UNCERTAIN-RELEASES reds the day the chain retains or reconciles custody there.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { decideExecute, EXECUTE_GRANT, type ExecuteAdmission } from "../src/workbench/execute.js";
import { adoptFunctionActions, FUNCTION_ACTION_CONTRACT, type FunctionActionContract, type FunctionIdentity } from "../src/workbench/function-authority.js";
import {
  dispatchFunctionChain,
  FUNCTION_CHAIN_REASONS,
  type FunctionChainCode,
  type FunctionChainGrant,
  type FunctionChainHost,
  type FunctionChainOutcome,
} from "../src/workbench/function-dispatch-chain.js";
import {
  measureSourceIdentity,
  type SourceAdmissionHost,
  type SourceDirtiness,
  type SourceGitReader,
  type SourceIdentity,
  type WriteBoundaryAttestation,
  WriteBoundaryAuthority,
  WriterLeases,
} from "../src/workbench/source-admission.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

/** Git-heavy cases (fixture commits plus two measurements per admission) get room under shared-host load. */
const CASE_MS = 60_000;
const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const OPERATOR = "operator-1";
const OTHER_OPERATOR = "operator-2";
const DIGEST = `sha256:${"ab".repeat(32)}`;
/** The fixture identity of the installed producer package, as the host answers it. */
const PACKAGE = `sha256:${"cd".repeat(32)}`;
const FUNCTION_ID = "mechanical.development.develop.v1";
const FUNCTION_SCHEMA = "mechanical-workflows/entrypoint/v1";
/** TEST FIXTURE spelling: representable as namespace:permission, never an adopted spelling. */
const ACTION = "fixture-fn:develop-write";
/** The proposed one-colon grant of the P00 ruling (02-IMPLEMENTATION-PACKAGES.md P00): not adopted. */
const PROPOSED = "mechanical:develop-write";
const INVOCATION = "fn_0123456789ab";
const HOST: FunctionIdentity = Object.freeze({ principal: "local-operator:1000:s1", sessionId: "s1" });
const TOOLS: readonly string[] = ["Read", "Edit"];
const SDK_RIGHTS: readonly string[] = ["claude:invoke", "claude:tool:Read", "claude:tool:Edit"];
const BASE_GRANTS: readonly string[] = [EXECUTE_GRANT, ACTION];
const SDK_GRANTS: readonly string[] = [...BASE_GRANTS, ...SDK_RIGHTS];
const CONTRACT: FunctionActionContract = adoptFunctionActions([{ definitionId: FUNCTION_ID, actionGrant: ACTION }]);
const WRITES: JsonValue = { allowWrites: true };
const TASK = { task: "t", workspaceId: "w", baseRevision: "r" };

const FIXTURE_GIT: readonly string[] = [
  "-c",
  "user.name=Pi Chain Fixture",
  "-c",
  "user.email=chain-fixture@example.invalid",
  "-c",
  "commit.gpgsign=false",
  "-c",
  "core.hooksPath=/dev/null",
  "-c",
  "init.defaultBranch=main",
  "-c",
  "protocol.file.allow=always",
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

/** A clean repository: README.md, forge.toml and src/index.ts committed; gate.local.toml and ignored/ ignored. Canonical path. */
function fixtureRepo(path: string): string {
  mkdirSync(path, { recursive: true });
  git(path, "init", "-q");
  writeFileSync(join(path, "README.md"), "# chain fixture\n");
  writeFileSync(join(path, "forge.toml"), '[build]\ngate = ["test"]\n');
  writeFileSync(join(path, ".gitignore"), "gate.local.toml\nignored/\n");
  writeFileSync(join(path, "gate.local.toml"), '[gate]\nsteps = ["test"]\n');
  mkdirSync(join(path, "src"));
  writeFileSync(join(path, "src", "index.ts"), "export const fixture = 1;\n");
  git(path, "add", "README.md", "forge.toml", ".gitignore", "src/index.ts");
  git(path, "commit", "-q", "--no-verify", "-m", "fixture base");
  return realpathSync(path);
}

/** Every file under dir outside .git, with the SHA-256 of its bytes, by path. */
function treeBytes(dir: string): readonly (readonly [string, string])[] {
  const found: [string, string][] = [];
  const walk = (current: string): void => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (entry.name === ".git") continue;
      const path = join(current, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) found.push([relative(dir, path), sha256(readFileSync(path))]);
    }
  };
  walk(dir);
  return found.sort((a, b) => a[0].localeCompare(b[0]));
}

let scratchDir: string;
let base: string;
let root: string;
let ws: string;
let authority: WriteBoundaryAuthority;
let leases: WriterLeases;

beforeEach(() => {
  scratchDir = makeScratch("pi-mni-chain-");
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

function identityOf(path: string, gateManifest = "forge.toml"): SourceIdentity {
  const measured = measureSourceIdentity(path, gateManifest, gitReader);
  if (measured.decision !== "measured") throw new Error(`fixture is not measurable: ${measured.code}`);
  return measured.identity;
}

/** A real workflow_execute admission of the digest-pinned fixture function definition; a null policy means the request carries none. */
function admissionFor(policy: JsonValue = WRITES, input: JsonValue = TASK, invocationId = INVOCATION): ExecuteAdmission {
  const decision = decideExecute(
    { definitionRef: { kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST }, input, hostMode: "embedded", ...(policy !== null ? { policy } : {}) },
    { grants: [EXECUTE_GRANT], invocationId },
  );
  if (decision.decision !== "admitted") throw new Error(`fixture admission refused: ${decision.policy}`);
  return decision.admission;
}

/** The host's admission wait: it pends until the case calls release(); `entered` resolves once the chain waits. */
interface Parked {
  readonly wait: (signal: AbortSignal | undefined) => Promise<void>;
  readonly entered: Promise<void>;
  calls(): number;
  release(): void;
}
function parked(): Parked {
  let calls = 0;
  let markEntered: () => void = () => undefined;
  let open: () => void = () => undefined;
  const entered = new Promise<void>(resolve => {
    markEntered = resolve;
  });
  const gate = new Promise<void>(resolve => {
    open = resolve;
  });
  return {
    wait: async () => {
      calls += 1;
      markEntered();
      await gate;
    },
    entered,
    calls: () => calls,
    release: () => open(),
  };
}

/** What the host reads answer, mutable by a case while the chain waits. */
interface ChainState {
  grants: unknown;
  identity: unknown;
  tools: unknown;
  installed: string | undefined;
  manifest: string;
  attestation: WriteBoundaryAttestation | undefined;
}
interface ChainOptions {
  readonly workspace?: string;
  /** The host's attestation; null for none; by default the operator's attestation of ws under the host manifest. */
  readonly attestation?: WriteBoundaryAttestation | null;
  readonly grants?: unknown;
  readonly sdk?: boolean;
  readonly park?: boolean;
  readonly git?: SourceGitReader;
  readonly manifest?: string;
  readonly admit?: () => Promise<string | undefined>;
  readonly effect?: (grant: FunctionChainGrant) => Promise<string>;
  /** Called after each logged host read with the read's event name. */
  readonly onRead?: (event: string, state: ChainState, events: string[]) => void;
}

/**
 * One chain world: the host's mutable reads (state), the event log of every host read ("identity", "grants", "tools",
 * "admit", "package", "git", "attestation", "wait") and of the effect ("effect"), and the effect's spies.
 */
function chainFor(options: ChainOptions = {}) {
  const sdk = options.sdk ?? false;
  const events: string[] = [];
  const manifest = options.manifest ?? "forge.toml";
  const state: ChainState = {
    grants: options.grants ?? (sdk ? SDK_GRANTS : BASE_GRANTS),
    identity: HOST,
    tools: TOOLS,
    installed: PACKAGE,
    manifest,
    attestation: options.attestation === null ? undefined : (options.attestation ?? authority.attest(OPERATOR, identityOf(ws, manifest))),
  };
  const log = (event: string): void => {
    events.push(event);
    options.onRead?.(event, state, events);
  };
  const reader = options.git ?? gitReader;
  const park = options.park ? parked() : undefined;
  const source: SourceAdmissionHost = {
    authorizedRoot: root,
    get gateManifest() {
      return state.manifest;
    },
    git: (directory, args) => {
      log("git");
      return reader(directory, args);
    },
    authority,
    get attestation() {
      log("attestation");
      return state.attestation;
    },
    set attestation(value: WriteBoundaryAttestation | undefined) {
      state.attestation = value;
    },
    leases,
    ...(park !== undefined
      ? {
          admissionWait: (signal: AbortSignal | undefined) => {
            log("wait");
            return park.wait(signal);
          },
        }
      : {}),
  };
  const admit = vi.fn(options.admit ?? (async () => PACKAGE));
  const spies = { import: vi.fn(), writer: vi.fn(), forge: vi.fn(), sdkQuery: vi.fn() };
  const granted: FunctionChainGrant[] = [];
  const effect =
    options.effect ??
    (async (grant: FunctionChainGrant) => {
      events.push("effect");
      granted.push(grant);
      spies.import(grant.authority.definition);
      spies.writer(grant.source);
      spies.forge(grant.source.identity.gateManifest);
      if (grant.sdkRights.length > 0) spies.sdkQuery(grant.sdkRights);
      return "ran";
    });
  const host: FunctionChainHost = {
    authority: {
      grants: () => {
        log("grants");
        return state.grants as readonly string[] | undefined;
      },
      identity: () => {
        log("identity");
        return state.identity as FunctionIdentity;
      },
    },
    source,
    package: {
      admit: () => {
        log("admit");
        return admit();
      },
      current: () => {
        log("package");
        return state.installed;
      },
    },
    ...(sdk
      ? {
          sdk: {
            tools: () => {
              log("tools");
              return state.tools as readonly string[] | undefined;
            },
          },
        }
      : {}),
  };
  const run = (admission: ExecuteAdmission = admissionFor(), workspace: string = options.workspace ?? ws, contract: FunctionActionContract = CONTRACT) =>
    dispatchFunctionChain({ admission, contract, workspace }, host, effect);
  return { state, events, host, park, admit, spies, granted, run };
}
type ChainWorld = ReturnType<typeof chainFor>;

function parkOf(chain: ChainWorld): Parked {
  if (chain.park === undefined) throw new Error("this chain has no admission wait");
  return chain.park;
}

/** The import, writer, Forge and SDK query spy call counts of one chain's effect. */
function effectCalls(chain: ChainWorld): readonly number[] {
  return [chain.spies.import, chain.spies.writer, chain.spies.forge, chain.spies.sdkQuery].map(spy => spy.mock.calls.length);
}

/** An outcome as the cases read it: the dispatch's value, or the refusal's layer, stage (when it has one) and code. */
function readingOf(outcome: FunctionChainOutcome<string>): Record<string, unknown> {
  if (outcome.status === "dispatched") return { status: "dispatched", value: outcome.value };
  if (outcome.layer === "source") return { layer: "source", code: outcome.refusal.code, ...(outcome.refusal.dirty !== undefined ? { dirty: outcome.refusal.dirty } : {}) };
  if (outcome.layer === "authority") return { layer: "authority", stage: outcome.stage, code: outcome.refusal.policy };
  return { layer: outcome.layer, stage: outcome.stage, code: outcome.refusal.code };
}

/** Runs a parked chain: starts it, waits for the admission wait, applies `during`, releases the wait and returns the outcome. */
async function parkedRun(chain: ChainWorld, during: () => void, admission?: ExecuteAdmission, workspace?: string): Promise<FunctionChainOutcome<string>> {
  const pending = chain.run(admission, workspace);
  await parkOf(chain).entered;
  during();
  parkOf(chain).release();
  return pending;
}

const DISPATCHED = { status: "dispatched", value: "ran" };

describe("EAT-R227: the SDK edge's rights, independent of the function action (wb-2ukh)", { timeout: CASE_MS }, () => {
  it("R227-HELD: with the host's SDK edge configured for Read and Edit and each right held, the one effect carries exactly claude:invoke, claude:tool:Read and claude:tool:Edit and runs one SDK query", async () => {
    const chain = chainFor({ sdk: true });
    expect(readingOf(await chain.run())).toEqual(DISPATCHED);
    expect(chain.granted.map(grant => grant.sdkRights)).toEqual([SDK_RIGHTS]);
    expect(effectCalls(chain)).toEqual([1, 1, 1, 1]);
  });

  it("R227-NO-SESSION: a host that configures no SDK edge requires no SDK right, and its one effect carries none and runs no SDK query", async () => {
    const chain = chainFor();
    expect(readingOf(await chain.run())).toEqual(DISPATCHED);
    expect(chain.granted.map(grant => grant.sdkRights)).toEqual([[]]);
    expect(effectCalls(chain)).toEqual([1, 1, 1, 0]);
  });

  it("R227-MISSING: each SDK right deleted from the host grants refuses missing-sdk-right at entry, before the installation barrier, with zero effect calls", async () => {
    for (const right of SDK_RIGHTS) {
      const chain = chainFor({ sdk: true, grants: SDK_GRANTS.filter(grant => grant !== right) });
      expect(readingOf(await chain.run()), right).toEqual({ layer: "sdk", stage: "entry", code: "missing-sdk-right" });
      expect(effectCalls(chain), right).toEqual([0, 0, 0, 0]);
      expect(chain.admit, right).not.toHaveBeenCalled();
    }
  });

  it("R227-REVOKED-PARKED: each SDK right revoked while the admission waits refuses missing-sdk-right at the final boundary with zero effect calls and frees the root", async () => {
    for (const right of SDK_RIGHTS) {
      const chain = chainFor({ sdk: true, park: true });
      const outcome = await parkedRun(chain, () => {
        chain.state.grants = SDK_GRANTS.filter(grant => grant !== right);
      });
      expect(readingOf(outcome), right).toEqual({ layer: "sdk", stage: "final", code: "missing-sdk-right" });
      expect(effectCalls(chain), right).toEqual([0, 0, 0, 0]);
      expect(leases.holder(ws), right).toBeUndefined();
    }
  });

  it("R227-REQUEST-ONLY: SDK and Forge rights named only by the caller policy and input, never held by the host, refuse missing-sdk-right with zero effect calls", async () => {
    const named = [...SDK_RIGHTS, "forge:gate", "forge:inspect"];
    const chain = chainFor({ sdk: true, grants: BASE_GRANTS });
    const admission = admissionFor({ allowWrites: true, grants: named, permissions: named, sdkRights: named }, { ...TASK, grants: named });
    expect(readingOf(await chain.run(admission))).toEqual({ layer: "sdk", stage: "entry", code: "missing-sdk-right" });
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
  });

  it("R227-INDEPENDENT: the SDK rights without the action grant refuse missing-function-action-grant, and the action grant without claude:invoke refuses missing-sdk-right, each with zero effect calls", async () => {
    const withoutAction = chainFor({ sdk: true, grants: [EXECUTE_GRANT, ...SDK_RIGHTS] });
    expect(readingOf(await withoutAction.run())).toEqual({ layer: "authority", stage: "entry", code: "missing-function-action-grant" });
    const withoutInvoke = chainFor({ sdk: true, grants: [...BASE_GRANTS, "claude:tool:Read", "claude:tool:Edit"] });
    expect(readingOf(await withoutInvoke.run())).toEqual({ layer: "sdk", stage: "entry", code: "missing-sdk-right" });
    expect([...effectCalls(withoutAction), ...effectCalls(withoutInvoke)]).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it("R227-NOT-FORWARDED: a held claude:tool:Bash right that the host configuration does not name, named by the caller policy, is not in the effect's grant", async () => {
    const chain = chainFor({ sdk: true, grants: [...SDK_GRANTS, "claude:tool:Bash"] });
    expect(readingOf(await chain.run(admissionFor({ allowWrites: true, tools: ["Bash"], grants: ["claude:tool:Bash"] })))).toEqual(DISPATCHED);
    expect(chain.granted.map(grant => grant.sdkRights)).toEqual([SDK_RIGHTS]);
  });

  it("R227-UNKNOWN-CONFIG: an SDK tool configuration read that is undefined, a string, or a list holding a number or null refuses unknown-sdk-rights with zero effect calls", async () => {
    const reads: readonly (readonly [string, unknown])[] = [
      ["undefined", undefined],
      ["a string", "Read"],
      ["a number entry", [1]],
      ["a null entry", ["Read", null]],
    ];
    for (const [label, tools] of reads) {
      const chain = chainFor({ sdk: true });
      chain.state.tools = tools;
      expect(readingOf(await chain.run()), label).toEqual({ layer: "sdk", stage: "entry", code: "unknown-sdk-rights" });
      expect(effectCalls(chain), label).toEqual([0, 0, 0, 0]);
    }
  });
});

describe("EAT-R228: the principal, session and grants read again at the final boundary (wb-2ukh)", { timeout: CASE_MS }, () => {
  it("R228-UNCHANGED: parked with nothing changed, the one effect rests on the host identity and exactly workbench:execute and the action, each read again at the final boundary", async () => {
    const chain = chainFor({ park: true });
    expect(readingOf(await parkedRun(chain, () => undefined))).toEqual(DISPATCHED);
    expect(chain.granted.map(grant => [grant.authority.grants, grant.authority.identity])).toEqual([[[EXECUTE_GRANT, ACTION], HOST]]);
    expect(chain.events.filter(event => event === "grants" || event === "identity")).toEqual(["identity", "grants", "grants", "identity"]);
    expect(effectCalls(chain)).toEqual([1, 1, 1, 0]);
  });

  it("R228-PARKED-CHANGES: each listed change while the admission waits refuses at the final boundary with zero effect calls and frees the root", async () => {
    const changes: readonly (readonly [string, (state: ChainState) => void, string])[] = [
      [
        "the action grant revoked",
        state => {
          state.grants = [EXECUTE_GRANT];
        },
        "missing-function-action-grant",
      ],
      [
        "a changed principal",
        state => {
          state.identity = { ...HOST, principal: "local-operator:1001:s1" };
        },
        "changed-effective-identity",
      ],
      [
        "a changed session",
        state => {
          state.identity = { ...HOST, sessionId: "s2" };
        },
        "changed-effective-identity",
      ],
      [
        "a grant read holding Not A Grant",
        state => {
          state.grants = [...BASE_GRANTS, "Not A Grant"];
        },
        "unknown-permission-data",
      ],
      [
        "a grant read that is a string",
        state => {
          state.grants = EXECUTE_GRANT;
        },
        "unknown-permission-data",
      ],
    ];
    for (const [label, change, code] of changes) {
      const chain = chainFor({ park: true });
      const outcome = await parkedRun(chain, () => change(chain.state));
      expect(readingOf(outcome), label).toEqual({ layer: "authority", stage: "final", code });
      expect(effectCalls(chain), label).toEqual([0, 0, 0, 0]);
      expect(leases.holder(ws), label).toBeUndefined();
    }
  });

  it("R228-REQUEST-IDENTITY: a caller policy and input naming another principal, session, identity and extra grants leave the one effect resting on the host identity and exactly workbench:execute and the action", async () => {
    const forged = { principal: "local-operator:0:root", sessionId: "s-forged", identity: { principal: "local-operator:0:root", sessionId: "s-forged" }, grants: [EXECUTE_GRANT, ACTION, "workbench:detach"] };
    const chain = chainFor({ park: true });
    expect(readingOf(await parkedRun(chain, () => undefined, admissionFor({ allowWrites: true, ...forged }, { ...TASK, ...forged })))).toEqual(DISPATCHED);
    expect(chain.granted.map(grant => [grant.authority.identity, grant.authority.grants])).toEqual([[HOST, [EXECUTE_GRANT, ACTION]]]);
  });

  it("R228-ENTRY-FIRST: a request without workbench:execute refuses at entry, before the installation barrier and the admission wait, with zero admit, wait, Git and effect calls", async () => {
    const chain = chainFor({ park: true, grants: [ACTION] });
    expect(readingOf(await chain.run())).toEqual({ layer: "authority", stage: "entry", code: "missing-execute-grant" });
    expect([chain.admit.mock.calls.length, parkOf(chain).calls(), chain.events.filter(event => event === "git").length]).toEqual([0, 0, 0]);
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
  });
});

describe("EAT-R229: the effectful source confined to a clean canonical root (wb-2ukh)", { timeout: CASE_MS }, () => {
  it("R229-CLEAN: a clean worktree root under the authorized root that asks for writes and is attested dispatches once against the commit and tree git reports", async () => {
    const chain = chainFor();
    expect(readingOf(await chain.run())).toEqual(DISPATCHED);
    expect(chain.granted.map(grant => [grant.source.identity.canonicalRoot, grant.source.identity.commit, grant.source.identity.tree, grant.source.operatorId])).toEqual([
      [ws, git(ws, "rev-parse", "HEAD"), git(ws, "rev-parse", "HEAD^{tree}"), OPERATOR],
    ]);
  });

  it("R229-SIBLING: a prefix-collision sibling of the authorized root refuses workspace-outside-root although attested, with zero effect calls and its bytes kept", async () => {
    const sibling = fixtureRepo(join(base, "authorized-sibling"));
    const before = treeBytes(sibling);
    const chain = chainFor({ workspace: sibling, attestation: authority.attest(OPERATOR, identityOf(sibling)) });
    expect(readingOf(await chain.run())).toEqual({ layer: "source", code: "workspace-outside-root" });
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
    expect(treeBytes(sibling)).toEqual(before);
  });

  it("R229-SYMLINK-ESCAPE: a symlink inside the authorized root that resolves to a repository outside it refuses workspace-outside-root with zero effect calls and its bytes kept", async () => {
    const outside = fixtureRepo(join(base, "outside"));
    symlinkSync(outside, join(root, "escape"));
    const before = treeBytes(outside);
    const chain = chainFor({ workspace: join(root, "escape"), attestation: authority.attest(OPERATOR, identityOf(outside)) });
    expect(readingOf(await chain.run())).toEqual({ layer: "source", code: "workspace-outside-root" });
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
    expect(treeBytes(outside)).toEqual(before);
  });

  it("R229-DIRTY: a tracked edit, a staged edit, an untracked file and a staged rename each refuse dirty-base with their counts, with zero effect calls and the edited bytes kept", async () => {
    const forms: readonly (readonly [string, (dir: string) => void, SourceDirtiness])[] = [
      ["tracked", dir => writeFileSync(join(dir, "README.md"), "# edited\n"), { tracked: 1, staged: 0, untracked: 0 }],
      [
        "staged",
        dir => {
          writeFileSync(join(dir, "README.md"), "# staged\n");
          git(dir, "add", "README.md");
        },
        { tracked: 0, staged: 1, untracked: 0 },
      ],
      ["untracked", dir => writeFileSync(join(dir, "notes.txt"), "new\n"), { tracked: 0, staged: 0, untracked: 1 }],
      ["renamed", dir => git(dir, "mv", "README.md", "READ.md"), { tracked: 0, staged: 2, untracked: 0 }],
    ];
    for (const [label, edit, dirty] of forms) {
      const dir = fixtureRepo(join(root, `dirty-${label}`));
      const attestation = authority.attest(OPERATOR, identityOf(dir));
      edit(dir);
      const before = treeBytes(dir);
      const chain = chainFor({ workspace: dir, attestation });
      expect(readingOf(await chain.run()), label).toEqual({ layer: "source", code: "dirty-base", dirty });
      expect(effectCalls(chain), label).toEqual([0, 0, 0, 0]);
      expect(treeBytes(dir), label).toEqual(before);
    }
  });

  it("R229-UNMERGED: an unmerged index entry refuses source-unmeasurable with zero effect calls and its bytes kept", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    git(ws, "checkout", "-q", "-b", "side");
    writeFileSync(join(ws, "README.md"), "# side\n");
    git(ws, "commit", "-q", "--no-verify", "-am", "side");
    git(ws, "checkout", "-q", "main");
    writeFileSync(join(ws, "README.md"), "# main\n");
    git(ws, "commit", "-q", "--no-verify", "-am", "main");
    expect(() => git(ws, "merge", "-q", "--no-edit", "side")).toThrow();
    expect(git(ws, "status", "--porcelain")).toBe("UU README.md");
    const before = treeBytes(ws);
    const chain = chainFor({ attestation });
    expect(readingOf(await chain.run())).toEqual({ layer: "source", code: "source-unmeasurable" });
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
    expect(treeBytes(ws)).toEqual(before);
  });

  it("R229-SUBMODULE: a committed submodule whose checkout moved refuses dirty-base with tracked 1, with zero effect calls and its bytes kept", async () => {
    const upstream = fixtureRepo(join(base, "submodule-source"));
    git(ws, "submodule", "add", "-q", upstream, "sub");
    git(ws, "commit", "-q", "--no-verify", "-m", "a submodule");
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "sub", "README.md"), "# the submodule moves\n");
    git(join(ws, "sub"), "commit", "-q", "--no-verify", "-am", "the submodule moves");
    const before = treeBytes(ws);
    const chain = chainFor({ attestation });
    expect(readingOf(await chain.run())).toEqual({ layer: "source", code: "dirty-base", dirty: { tracked: 1, staged: 0, untracked: 0 } });
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
    expect(treeBytes(ws)).toEqual(before);
  });

  it("R229-NO-WRITE-POLICY: a request with no policy, with allowWrites false and with allowWrites the string true refuses writes-not-requested with zero effect calls", async () => {
    const policies: readonly (readonly [string, JsonValue])[] = [
      ["no policy", null],
      ["allowWrites false", { allowWrites: false }],
      ["allowWrites the string true", { allowWrites: "true" }],
    ];
    for (const [label, policy] of policies) {
      const chain = chainFor();
      expect(readingOf(await chain.run(admissionFor(policy))), label).toEqual({ layer: "source", code: "writes-not-requested" });
      expect(effectCalls(chain), label).toEqual([0, 0, 0, 0]);
    }
  });
});

describe("EAT-R230: an unmeasurable raw Git identity refused (wb-2ukh)", { timeout: CASE_MS }, () => {
  it("R230-GIT-DIR: a reader whose GIT_DIR names another repository refuses source-unmeasurable with zero effect calls", async () => {
    const other = fixtureRepo(join(root, "other"));
    writeFileSync(join(other, "README.md"), "# another history\n");
    git(other, "commit", "-q", "--no-verify", "-am", "another history");
    const chain = chainFor({ git: readerWith({ GIT_DIR: join(other, ".git") }) });
    expect(readingOf(await chain.run())).toEqual({ layer: "source", code: "source-unmeasurable" });
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
  });

  it("R230-HEAD-OBJECTS: a HEAD commit answer and a HEAD tree answer that are no object id each refuse source-unmeasurable with zero effect calls", async () => {
    for (const object of ["HEAD^{commit}", "HEAD^{tree}"]) {
      const junk: SourceGitReader = (directory, args) => (args.includes(object) ? Buffer.from("not-an-object-id\n") : gitReader(directory, args));
      const chain = chainFor({ git: junk });
      expect(readingOf(await chain.run()), object).toEqual({ layer: "source", code: "source-unmeasurable" });
      expect(effectCalls(chain), object).toEqual([0, 0, 0, 0]);
    }
  });

  it("R230-INDEX-ENTRY: an assume-unchanged index entry, and an ls-files record tagged X, each refuse source-unmeasurable with zero effect calls", async () => {
    const tagged: SourceGitReader = (directory, args) => (args.includes("ls-files") ? Buffer.from("X README.md\0") : gitReader(directory, args));
    const rewritten = chainFor({ git: tagged });
    expect(readingOf(await rewritten.run())).toEqual({ layer: "source", code: "source-unmeasurable" });
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "README.md"), "# edited under assume-unchanged\n");
    git(ws, "update-index", "--assume-unchanged", "README.md");
    const hidden = chainFor({ attestation });
    expect(readingOf(await hidden.run())).toEqual({ layer: "source", code: "source-unmeasurable" });
    expect([...effectCalls(rewritten), ...effectCalls(hidden)]).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it("R230-TOPLEVEL: a reader that reports another repository as the worktree root of ws refuses workspace-not-worktree-root with zero effect calls", async () => {
    const ws2 = fixtureRepo(join(root, "ws2"));
    const misdirected: SourceGitReader = (directory, args) => (args.includes("--show-toplevel") ? Buffer.from(`${ws2}\n`) : gitReader(directory, args));
    const chain = chainFor({ git: misdirected });
    expect(readingOf(await chain.run())).toEqual({ layer: "source", code: "workspace-not-worktree-root" });
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
  });

  it("R230-FORGED-INPUT: a forged commit, tree and source identity in the caller policy and input leave the one dispatch on the commit and tree git reports", async () => {
    const forged = { commit: "f".repeat(40), tree: "e".repeat(40), sourceIdentity: `sha256:${"0".repeat(64)}` };
    const chain = chainFor();
    expect(readingOf(await chain.run(admissionFor({ allowWrites: true, ...forged }, { ...TASK, ...forged })))).toEqual(DISPATCHED);
    expect(chain.granted.map(grant => [grant.source.identity.commit, grant.source.identity.tree])).toEqual([[git(ws, "rev-parse", "HEAD"), git(ws, "rev-parse", "HEAD^{tree}")]]);
  });
});

describe("EAT-R231: a fresh gate manifest bound to the source basis (wb-2ukh)", { timeout: CASE_MS }, () => {
  it("R231-BASIS: parked and unchanged, the one dispatch's source identity holds the HEAD commit, the tree and forge.toml with the SHA-256 of its bytes", async () => {
    const chain = chainFor({ park: true });
    expect(readingOf(await parkedRun(chain, () => undefined))).toEqual(DISPATCHED);
    expect(chain.granted.map(grant => [grant.source.identity.commit, grant.source.identity.tree, grant.source.identity.gateManifest])).toEqual([
      [git(ws, "rev-parse", "HEAD"), git(ws, "rev-parse", "HEAD^{tree}"), { path: "forge.toml", sha256: sha256(readFileSync(join(ws, "forge.toml"))) }],
    ]);
  });

  it("R231-HEAD-MOVED: a new commit, an amend and a reset to the parent during the admission wait each refuse source-changed with zero effect calls", async () => {
    const moves: readonly (readonly [string, () => void])[] = [
      [
        "a new commit",
        () => {
          writeFileSync(join(ws, "later.txt"), "later\n");
          git(ws, "add", "later.txt");
          git(ws, "commit", "-q", "--no-verify", "-m", "later");
        },
      ],
      [
        "an amend",
        () => {
          writeFileSync(join(ws, "README.md"), "# amended\n");
          git(ws, "commit", "-q", "--no-verify", "--amend", "-am", "amended");
        },
      ],
      ["a reset to the parent", () => git(ws, "reset", "-q", "--hard", "HEAD~1")],
    ];
    for (const [label, move] of moves) {
      const chain = chainFor({ park: true });
      expect(readingOf(await parkedRun(chain, move)), label).toEqual({ layer: "source", code: "source-changed" });
      expect(effectCalls(chain), label).toEqual([0, 0, 0, 0]);
    }
  });

  it("R231-MANIFEST-BYTES: the ignored host gate manifest gate.local.toml rewritten during the admission wait refuses source-changed with zero effect calls", async () => {
    const chain = chainFor({ park: true, manifest: "gate.local.toml" });
    const outcome = await parkedRun(chain, () => writeFileSync(join(ws, "gate.local.toml"), '[gate]\nsteps = ["lint"]\n'));
    expect(readingOf(outcome)).toEqual({ layer: "source", code: "source-changed" });
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
  });

  it("R231-MANIFEST-PATH: the host gate manifest path switched from forge.toml to gate.local.toml during the admission wait refuses source-changed with zero effect calls", async () => {
    const chain = chainFor({ park: true });
    const outcome = await parkedRun(chain, () => {
      chain.state.manifest = "gate.local.toml";
    });
    expect(readingOf(outcome)).toEqual({ layer: "source", code: "source-changed" });
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
  });

  it("R231-MANIFEST-REMOVED: the ignored host gate manifest removed during the admission wait refuses source-changed with zero effect calls", async () => {
    const chain = chainFor({ park: true, manifest: "gate.local.toml" });
    const outcome = await parkedRun(chain, () => rmSync(join(ws, "gate.local.toml")));
    expect(readingOf(outcome)).toEqual({ layer: "source", code: "source-changed" });
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
  });
});

describe("EAT-R232: one writer per canonical root through the chain (wb-2ukh)", { timeout: CASE_MS }, () => {
  it("R232-SAME-ROOT: while one chain holds ws through its admission wait, a second chain on ws refuses writer-held, and the effect runs once in all", async () => {
    const first = chainFor({ park: true });
    const second = chainFor();
    const pending = first.run(admissionFor(WRITES, TASK, "fn_00000000000a"));
    await parkOf(first).entered;
    expect(leases.holder(ws)).toBe("fn_00000000000a");
    expect(readingOf(await second.run(admissionFor(WRITES, TASK, "fn_00000000000b")))).toEqual({ layer: "source", code: "writer-held" });
    parkOf(first).release();
    expect(readingOf(await pending)).toEqual(DISPATCHED);
    expect([...effectCalls(first), ...effectCalls(second)]).toEqual([1, 1, 1, 0, 0, 0, 0, 0]);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R232-ALIAS: while one chain holds ws through its admission wait, a second chain on a symlink alias of ws inside the root refuses writer-held, and the effect runs once in all", async () => {
    const alias = join(root, "ws-alias");
    symlinkSync(ws, alias);
    const first = chainFor({ park: true });
    const second = chainFor({ workspace: alias });
    const pending = first.run(admissionFor(WRITES, TASK, "fn_00000000000a"));
    await parkOf(first).entered;
    expect(readingOf(await second.run(admissionFor(WRITES, TASK, "fn_00000000000b")))).toEqual({ layer: "source", code: "writer-held" });
    parkOf(first).release();
    expect(readingOf(await pending)).toEqual(DISPATCHED);
    expect([...effectCalls(first), ...effectCalls(second)]).toEqual([1, 1, 1, 0, 0, 0, 0, 0]);
  });

  it("R232-INDEPENDENT: while one chain holds ws through its admission wait, a chain on the independent root ws2 dispatches, and then the first dispatches", async () => {
    const ws2 = fixtureRepo(join(root, "ws2"));
    const first = chainFor({ park: true });
    const second = chainFor({ workspace: ws2, attestation: authority.attest(OPERATOR, identityOf(ws2)) });
    const pending = first.run(admissionFor(WRITES, TASK, "fn_00000000000a"));
    await parkOf(first).entered;
    expect(readingOf(await second.run(admissionFor(WRITES, TASK, "fn_00000000000b")))).toEqual(DISPATCHED);
    expect(leases.holder(ws)).toBe("fn_00000000000a");
    parkOf(first).release();
    expect(readingOf(await pending)).toEqual(DISPATCHED);
    expect([...first.granted, ...second.granted].map(grant => grant.source.identity.canonicalRoot)).toEqual([ws, ws2]);
  });

  it("R232-RELEASED: after a dispatch settles, and after a refusal at the final boundary, the next chain on ws dispatches", async () => {
    const settled = chainFor();
    expect(readingOf(await settled.run())).toEqual(DISPATCHED);
    const refused = chainFor({ park: true });
    const outcome = await parkedRun(refused, () => {
      refused.state.grants = [EXECUTE_GRANT];
    });
    expect(readingOf(outcome)).toEqual({ layer: "authority", stage: "final", code: "missing-function-action-grant" });
    const next = chainFor();
    expect(readingOf(await next.run())).toEqual(DISPATCHED);
    expect([settled.granted.length, refused.granted.length, next.granted.length]).toEqual([1, 0, 1]);
  });

  it("R232-UNCERTAIN-RELEASES: an effect that rejects makes the chain reject with that very error, and the root is free at once (residual UNCERTAIN-EFFECT-LEASE)", async () => {
    const failure = new Error("the effect's outcome is unknown");
    const chain = chainFor({
      effect: async () => {
        throw failure;
      },
    });
    await expect(chain.run()).rejects.toBe(failure);
    expect(leases.holder(ws)).toBeUndefined();
  });
});

describe("EAT-R233: a host-minted current write attestation (wb-2ukh)", { timeout: CASE_MS }, () => {
  it("R233-CURRENT: the host's attestation of ws's current identity passes once, read at entry and again after the admission wait, and the effect runs under its operator", async () => {
    const chain = chainFor({ park: true });
    expect(readingOf(await parkedRun(chain, () => undefined))).toEqual(DISPATCHED);
    expect(chain.granted.map(grant => grant.source.operatorId)).toEqual([OPERATOR]);
    expect(chain.events.filter(event => event === "attestation" || event === "wait")).toEqual(["attestation", "wait", "attestation"]);
  });

  it("R233-ENTRY-FORMS: no attestation, an equal-shaped copy and another authority's attestation refuse attestation-absent, an attestation of ws2 attestation-other-workspace and one of an earlier identity of ws attestation-stale", async () => {
    const ws2 = fixtureRepo(join(root, "ws2"));
    const current = authority.attest(OPERATOR, identityOf(ws));
    const earlier = authority.attest(OPERATOR, identityOf(ws));
    const forms: readonly (readonly [string, () => WriteBoundaryAttestation | null, string])[] = [
      ["none", () => null, "attestation-absent"],
      ["an equal-shaped copy", () => ({ ...current }), "attestation-absent"],
      ["another authority's", () => new WriteBoundaryAuthority().attest(OPERATOR, identityOf(ws)), "attestation-absent"],
      ["of ws2", () => authority.attest(OPERATOR, identityOf(ws2)), "attestation-other-workspace"],
      [
        "of an earlier identity",
        () => {
          writeFileSync(join(ws, "later.txt"), "later\n");
          git(ws, "add", "later.txt");
          git(ws, "commit", "-q", "--no-verify", "-m", "later");
          return earlier;
        },
        "attestation-stale",
      ],
    ];
    for (const [label, attestation, code] of forms) {
      const chain = chainFor({ attestation: attestation() });
      expect(readingOf(await chain.run()), label).toEqual({ layer: "source", code });
      expect(effectCalls(chain), label).toEqual([0, 0, 0, 0]);
    }
  });

  it("R233-REQUEST-MINTED: an attestation copy carried only by the caller policy and input refuses attestation-absent with zero effect calls", async () => {
    const copy = { ...authority.attest(OPERATOR, identityOf(ws)) };
    const chain = chainFor({ attestation: null });
    expect(readingOf(await chain.run(admissionFor({ allowWrites: true, attestation: copy }, { ...TASK, attestation: copy })))).toEqual({ layer: "source", code: "attestation-absent" });
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
  });

  it("R233-REPLACED-PARKED: the attestation removed, or replaced by an equal-shaped copy, another authority's, one of ws2 or one under another gate manifest during the admission wait, refuses with that code and zero effect calls", async () => {
    const ws2 = fixtureRepo(join(root, "ws2"));
    const replacements: readonly (readonly [string, () => WriteBoundaryAttestation | undefined, string])[] = [
      ["removed", () => undefined, "attestation-absent"],
      ["an equal-shaped copy", () => ({ ...authority.attest(OPERATOR, identityOf(ws)) }), "attestation-absent"],
      ["another authority's", () => new WriteBoundaryAuthority().attest(OPERATOR, identityOf(ws)), "attestation-absent"],
      ["of ws2", () => authority.attest(OPERATOR, identityOf(ws2)), "attestation-other-workspace"],
      ["under another gate manifest", () => authority.attest(OPERATOR, identityOf(ws, "gate.local.toml")), "attestation-stale"],
    ];
    for (const [label, replacement, code] of replacements) {
      const chain = chainFor({ park: true });
      const outcome = await parkedRun(chain, () => {
        chain.state.attestation = replacement();
      });
      expect(readingOf(outcome), label).toEqual({ layer: "source", code });
      expect(effectCalls(chain), label).toEqual([0, 0, 0, 0]);
    }
  });

  it("R233-OTHER-OPERATOR: an attestation of the same identity by operator-2 made during the admission wait dispatches under operator-2 on the host identity, and with the principal also changed refuses changed-effective-identity", async () => {
    const replaced = chainFor({ park: true });
    expect(
      readingOf(
        await parkedRun(replaced, () => {
          replaced.state.attestation = authority.attest(OTHER_OPERATOR, identityOf(ws));
        }),
      ),
    ).toEqual(DISPATCHED);
    expect(replaced.granted.map(grant => [grant.source.operatorId, grant.authority.identity])).toEqual([[OTHER_OPERATOR, HOST]]);
    const moved = chainFor({ park: true });
    const outcome = await parkedRun(moved, () => {
      moved.state.attestation = authority.attest(OTHER_OPERATOR, identityOf(ws));
      moved.state.identity = { ...HOST, principal: "local-operator:1002:s1" };
    });
    expect(readingOf(outcome)).toEqual({ layer: "authority", stage: "final", code: "changed-effective-identity" });
    expect(effectCalls(moved)).toEqual([0, 0, 0, 0]);
  });
});

describe("EAT-R234: one no-await final authority-to-dispatch chain and its P03 component receipt (wb-2ukh)", { timeout: CASE_MS }, () => {
  it("R234-ONE-DISPATCH: one parked dispatch reads the host in exactly this order and calls the import, writer and Forge spies once each, in order, with one frozen grant", async () => {
    const chain = chainFor({ park: true });
    expect(readingOf(await parkedRun(chain, () => undefined))).toEqual(DISPATCHED);
    const measure = Array.from({ length: 7 }, () => "git");
    expect(chain.events).toEqual(["identity", "grants", "admit", "git", ...measure, "attestation", "wait", ...measure, "attestation", "grants", "identity", "package", "effect"]);
    expect(effectCalls(chain)).toEqual([1, 1, 1, 0]);
    const order = [chain.spies.import, chain.spies.writer, chain.spies.forge].map(spy => spy.mock.invocationCallOrder[0] ?? 0);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    const [grant] = chain.granted;
    expect(grant?.packageIdentity).toBe(PACKAGE);
    expect(grant?.source.identity).toEqual(identityOf(ws));
    expect(grant?.authority.definition).toEqual({ kind: "function", id: FUNCTION_ID, schemaVersion: FUNCTION_SCHEMA, artifactDigest: DIGEST });
    expect([Object.isFrozen(grant), Object.isFrozen(grant?.authority), Object.isFrozen(grant?.source), Object.isFrozen(grant?.sdkRights)]).toEqual([true, true, true, true]);
  });

  it("R234-NO-AWAIT: a microtask that the first Git read after the wait queues, and a revocation that the final grant read queues, both land after the effect is invoked", async () => {
    let released = false;
    let first = true;
    const chain = chainFor({
      park: true,
      sdk: true,
      onRead: (event, state, events) => {
        if (!released) return;
        if (event === "git" && first) {
          first = false;
          queueMicrotask(() => events.push("microtask"));
        }
        if (event === "grants") {
          queueMicrotask(() => {
            state.grants = [EXECUTE_GRANT];
            events.push("revoked");
          });
        }
      },
    });
    const outcome = await parkedRun(chain, () => {
      chain.events.push("released");
      released = true;
    });
    expect(readingOf(outcome)).toEqual(DISPATCHED);
    const measure = Array.from({ length: 7 }, () => "git");
    expect(chain.events.slice(chain.events.indexOf("released") + 1)).toEqual([...measure, "attestation", "grants", "identity", "tools", "package", "effect", "microtask", "revoked"]);
    expect(chain.granted.map(grant => grant.authority.grants)).toEqual([[EXECUTE_GRANT, ACTION]]);
  });

  it("R234-SINGLE-FAULTS: a missing action grant, an absent attestation, an unadmitted package, a package changed during the wait and a dirty base each refuse with zero import, writer and Forge calls", async () => {
    const permission = chainFor({ grants: [EXECUTE_GRANT] });
    expect(readingOf(await permission.run())).toEqual({ layer: "authority", stage: "entry", code: "missing-function-action-grant" });
    const attestation = chainFor({ attestation: null });
    expect(readingOf(await attestation.run())).toEqual({ layer: "source", code: "attestation-absent" });
    const unadmitted = chainFor({ admit: async () => undefined });
    expect(readingOf(await unadmitted.run())).toEqual({ layer: "package", stage: "entry", code: "package-unadmitted" });
    const changed = chainFor({ park: true });
    const outcome = await parkedRun(changed, () => {
      changed.state.installed = `sha256:${"ef".repeat(32)}`;
    });
    expect(readingOf(outcome)).toEqual({ layer: "package", stage: "final", code: "package-changed" });
    const attested = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "README.md"), "# edited\n");
    const source = chainFor({ attestation: attested });
    expect(readingOf(await source.run())).toEqual({ layer: "source", code: "dirty-base", dirty: { tracked: 1, staged: 0, untracked: 0 } });
    expect([permission, attestation, unadmitted, changed, source].map(chain => effectCalls(chain).slice(0, 3))).toEqual(Array.from({ length: 5 }, () => [0, 0, 0]));
  });

  it("R234-PACKAGE: an admit that resolves undefined or the empty string, or rejects, refuses package-unadmitted at entry with zero Git reads and no lease, and a current package read of undefined after the wait refuses package-changed", async () => {
    const admits: readonly (readonly [string, () => Promise<string | undefined>])[] = [
      ["undefined", async () => undefined],
      ["the empty string", async () => ""],
      [
        "a rejection",
        async () => {
          throw new Error("the package is not admitted");
        },
      ],
    ];
    for (const [label, admit] of admits) {
      const chain = chainFor({ admit });
      expect(readingOf(await chain.run()), label).toEqual({ layer: "package", stage: "entry", code: "package-unadmitted" });
      expect([chain.events.filter(event => event === "git").length, leases.holder(ws)], label).toEqual([0, undefined]);
      expect(effectCalls(chain), label).toEqual([0, 0, 0, 0]);
    }
    const vanished = chainFor({ park: true });
    const outcome = await parkedRun(vanished, () => {
      vanished.state.installed = undefined;
    });
    expect(readingOf(outcome)).toEqual({ layer: "package", stage: "final", code: "package-changed" });
    expect(effectCalls(vanished)).toEqual([0, 0, 0, 0]);
  });

  it("R234-RECEIPT: the dispatched outcome carries a frozen P03 component receipt tagged V1 whose JSON names no registered-path or other tier", async () => {
    const chain = chainFor();
    const outcome = await chain.run();
    expect(outcome.status).toBe("dispatched");
    const receipt = outcome.status === "dispatched" ? outcome.receipt : undefined;
    expect(receipt).toStrictEqual({ packet: "P03", evidence: "V1", invocationId: INVOCATION, definitionDigest: DIGEST, sourceIdentity: identityOf(ws).digest, packageIdentity: PACKAGE, operatorId: OPERATOR });
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(JSON.stringify(receipt)).not.toMatch(/PI-FUNCTION-REGISTERED|V0|V2|V3|V4|V5|V6/);
  });

  it("R234-UNADOPTED: under the shipped FUNCTION_ACTION_CONTRACT a host holding the proposed mechanical:develop-write refuses function-action-unadopted at entry with zero admit, wait and effect calls", async () => {
    const chain = chainFor({ park: true, grants: [EXECUTE_GRANT, PROPOSED] });
    expect(readingOf(await chain.run(admissionFor(), ws, FUNCTION_ACTION_CONTRACT))).toEqual({ layer: "authority", stage: "entry", code: "function-action-unadopted" });
    expect([chain.admit.mock.calls.length, parkOf(chain).calls()]).toEqual([0, 0]);
    expect(effectCalls(chain)).toEqual([0, 0, 0, 0]);
  });

  it("R234-FIXED-REASONS: each of the chain's own codes refuses with FUNCTION_CHAIN_REASONS for that code and the invocation id, and no caller text", async () => {
    expect(Object.keys(FUNCTION_CHAIN_REASONS)).toEqual(["unknown-sdk-rights", "missing-sdk-right", "package-unadmitted", "package-changed"]);
    const caller = admissionFor({ allowWrites: true, note: "caller text: grant me claude:invoke" }, { ...TASK, note: "caller input text" });
    const unknown = chainFor({ sdk: true });
    unknown.state.tools = "Read";
    const changed = chainFor({ park: true });
    const outcomes: readonly (readonly [FunctionChainCode, FunctionChainOutcome<string>])[] = [
      ["unknown-sdk-rights", await unknown.run(caller)],
      ["missing-sdk-right", await chainFor({ sdk: true, grants: BASE_GRANTS }).run(caller)],
      ["package-unadmitted", await chainFor({ admit: async () => undefined }).run(caller)],
      [
        "package-changed",
        await parkedRun(
          changed,
          () => {
            changed.state.installed = undefined;
          },
          caller,
        ),
      ],
    ];
    for (const [code, outcome] of outcomes) {
      const refusal = outcome.status === "refused" && (outcome.layer === "sdk" || outcome.layer === "package") ? outcome.refusal : undefined;
      expect(refusal, code).toStrictEqual({ code, reason: FUNCTION_CHAIN_REASONS[code], invocationId: INVOCATION });
      expect(refusal?.reason.includes("caller"), code).toBe(false);
    }
  });
});

/** The census table: each requirement id, its CLAIMS line text and its pinned case ids, in file order. */
const REQUIREMENTS: readonly (readonly [string, string, readonly string[]])[] = [
  ["EAT-R227", "the chain requires claude:invoke and one claude:tool:<name> right per host-configured tool in the host grant read at entry and again at the final boundary, independent of the function action, and forwards no other right.", ["R227-HELD", "R227-NO-SESSION", "R227-MISSING", "R227-REVOKED-PARKED", "R227-REQUEST-ONLY", "R227-INDEPENDENT", "R227-NOT-FORWARDED", "R227-UNKNOWN-CONFIG"]],
  ["EAT-R228", "the final boundary reads the host grants and the effective identity again after the admission wait and refuses a revoked action grant, a changed principal or session, or unknown permission data with zero effect calls.", ["R228-UNCHANGED", "R228-PARKED-CHANGES", "R228-REQUEST-IDENTITY", "R228-ENTRY-FIRST"]],
  ["EAT-R229", "the effect writes only a clean worktree root under the authorized root that asks for writes and is attested, and the listed sibling, escape, dirty, unmerged, submodule and no-write forms refuse with their bytes kept.", ["R229-CLEAN", "R229-SIBLING", "R229-SYMLINK-ESCAPE", "R229-DIRTY", "R229-UNMERGED", "R229-SUBMODULE", "R229-NO-WRITE-POLICY"]],
  ["EAT-R230", "a reader whose Git directory, HEAD commit, HEAD tree, index entry or worktree root is not the workspace's own refuses with zero effect calls, and request text never changes the measured commit and tree.", ["R230-GIT-DIR", "R230-HEAD-OBJECTS", "R230-INDEX-ENTRY", "R230-TOPLEVEL", "R230-FORGED-INPUT"]],
  ["EAT-R231", "the dispatched source basis binds the commit, the tree and the SHA-256 of the host gate manifest, and a HEAD move, a manifest byte change, a manifest path switch or a manifest removal during the wait refuses source-changed.", ["R231-BASIS", "R231-HEAD-MOVED", "R231-MANIFEST-BYTES", "R231-MANIFEST-PATH", "R231-MANIFEST-REMOVED"]],
  ["EAT-R232", "one canonical root admits one writer at a time through the chain, its symlink alias included, independent roots each admit one, and a settled or refused invocation frees the root.", ["R232-SAME-ROOT", "R232-ALIAS", "R232-INDEPENDENT", "R232-RELEASED", "R232-UNCERTAIN-RELEASES"]],
  ["EAT-R233", "only a host-minted attestation of the current root and identity passes, read again after the wait, and a replacement by another operator dispatches under that operator while the fresh identity check still governs.", ["R233-CURRENT", "R233-ENTRY-FORMS", "R233-REQUEST-MINTED", "R233-REPLACED-PARKED", "R233-OTHER-OPERATOR"]],
  ["EAT-R234", "after the installation barrier and the admission wait, one synchronous segment of fresh source, attestation, authority, SDK and package decisions invokes the single effect, whose outcome carries a P03 V1 component receipt.", ["R234-ONE-DISPATCH", "R234-NO-AWAIT", "R234-SINGLE-FAULTS", "R234-PACKAGE", "R234-RECEIPT", "R234-UNADOPTED", "R234-FIXED-REASONS"]],
];

describe("the census of this file's pinned reader set (wb-2ukh, rule 16)", () => {
  it("CHAIN-CENSUS: the header's CLAIMS lines equal REQUIREMENTS, the file's cases are its pins in order, its frozen shape holds, and the module header serves exactly its requirement ids", () => {
    const text = readFileSync(fileURLToPath(import.meta.url), "utf8");
    const header = text.slice(0, text.indexOf("*/"));
    expect([...header.matchAll(/^ \* {3}(EAT-R\d{3}): (.+)$/gm)].map(match => [match[1], match[2]])).toEqual(REQUIREMENTS.map(([id, sentence]) => [id, sentence]));
    expect([...text.matchAll(/^ {2}it\("([A-Z][A-Z0-9-]*):/gm)].map(match => match[1])).toEqual([...REQUIREMENTS.flatMap(([, , cases]) => cases), "CHAIN-CENSUS"]);
    expect(REQUIREMENTS.map(([id, , cases]) => `${id}:${cases.length}`)).toEqual(["EAT-R227:8", "EAT-R228:4", "EAT-R229:7", "EAT-R230:5", "EAT-R231:5", "EAT-R232:5", "EAT-R233:5", "EAT-R234:7"]);
    const module = readFileSync(join(REPO, "src", "workbench", "function-dispatch-chain.ts"), "utf8");
    const moduleHeader = module.slice(0, module.indexOf("*/"));
    expect([...moduleHeader.matchAll(/^ \* {3}(EAT-R\d{3}) {2}/gm)].map(match => match[1])).toEqual(REQUIREMENTS.map(([id]) => id));
  });
});
