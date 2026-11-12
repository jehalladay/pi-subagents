/**
 * wb-5uh (W08 Forge provider): the live current-verification proof, and the immutable source digest a Forge verdict is bound
 * to, measured against the installed forge app server on disposable committed fixture packages.
 *
 * Every row drives the production modules a Pi host composes for forge_gate_run and forge.gate.status, never a fake:
 * openForgeOperationConnection and readForgeGateStatus (src/workbench/providers/forge.ts), observeForgeGateRun with the host
 * head seam observedPackageHead (src/workbench/forge-operation-observer.ts, src/index.ts; wb-4ap.17) and forgeGateTopology
 * (src/workbench/forge-observer.ts). The connection is wrapped only to keep a copy of the reply the observer settles on.
 *
 * Spec lines measured here:
 * - bead wb-5uh: "Acceptance: real typed gate/verification read with evidence." and its notes: "Remaining immutable source digest
 *   and current verification proof".
 * - docs/workbench/07 § Forge provider: "A successful RPC or shell exit does **not** equal verified Forge PASS." and "A Forge
 *   verdict or verification reference warrants only its exact acceptance predicate at its declared source basis".
 * - docs/workbench/14 § Matrix by subsystem, Forge: "gate on exact candidate/basis with producer verdict" and "source basis
 *   changed -> no PASS".
 * - docs/workbench/19 Example H: "Forge gate reports partial/unknown evidence after change of candidate basis. Pi must show
 *   "verification indeterminate", not success, even if host RPC returned normally".
 *
 * Runs ONLY from its own forge command (vitest.forge-verify-live.config.ts), excluded from the default gate. An absent forge
 * binary or SDK is honest unavailability: the suite fails naming it, never skips. The receipt line this run writes to stdout
 * (FORGE_VERIFY_LIVE_RECEIPT) records what each row measured; no row judges it.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { observedPackageHead } from "../src/index.js";
import { retainForgeOperation } from "../src/workbench/forge-control-retention.js";
import { forgeGateTopology } from "../src/workbench/forge-observer.js";
import {
  type ForgeObservedHead,
  type ForgeOperationConnection,
  type ForgeOperationSettlement,
  forgeOperationRef,
  observeForgeGateRun,
} from "../src/workbench/forge-operation-observer.js";
import { ObservationProjection, type ObservationScope, type ObservedNode } from "../src/workbench/observation.js";
import { openForgeOperationConnection, readForgeGateStatus } from "../src/workbench/providers/forge.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const CONTRACT = "workbench.forge-verify-live/v1";
const RECEIPT_PREFIX = "FORGE_VERIFY_LIVE_RECEIPT ";
const ROW_TIMEOUT_MS = 120_000;

/** A two-step gate Forge counts as complete (a typing and a test step), both reading the one declared input. */
const FIXTURE_MANIFEST = [
  "[package]", 'name = "w08-verify-fixture"', 'type = "code"', 'version = "0.0.1"', 'language = "python"', "",
  "[build]", 'backend = "python"', 'gate = ["typing", "test"]', "",
  "[build.commands.typing]", 'command = "true"', 'inputs = ["README.md"]', "timeout = 60", "",
  "[build.commands.test]", 'command = "test -f README.md"', 'inputs = ["README.md"]', "timeout = 60", "",
].join("\n");

type Json = Record<string, unknown>;
const isRecord = (value: unknown): value is Json => value !== null && typeof value === "object" && !Array.isArray(value);
const scalar = (value: unknown): string | boolean | null => (typeof value === "string" || typeof value === "boolean" ? value : null);
const nowIso = (): string => new Date().toISOString();
const scopeOf = (root: string): ObservationScope => ({ workspace: root, principal: "local-operator:live:w08" });

interface ReceiptRow {
  readonly row: string;
  readonly operationId: string;
  readonly settlement: string;
  readonly gateVerdict: string | boolean | null;
  readonly gatedCommit: string | boolean | null;
  readonly gatedTree: string | boolean | null;
  readonly sourceSnapshotId: string | boolean | null;
  readonly pinnedHead: ForgeObservedHead;
  /** The head the observer compared the pin with when the reply settled; null when the seam read none. */
  readonly headAtRead: ForgeObservedHead | null;
  readonly statusText: string | null;
  readonly statusTone: string | null;
  readonly subjectBasis: string | null;
}
const receipt = {
  contract: CONTRACT,
  revision: ((): string => {
    try { return execFileSync("git", ["rev-parse", "--short=7", "HEAD"], { encoding: "utf8" }).trim(); } catch { return "unknown"; }
  })(),
  dirty: ((): boolean | null => {
    try { return execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" }).trim().length > 0; } catch { return null; }
  })(),
  toolchain: `node ${process.version}`,
  forgeBinary: ((): { path: string; sha256: string } => {
    try {
      const path = realpathSync(execFileSync("sh", ["-c", "command -v forge"], { encoding: "utf8" }).trim());
      return { path, sha256: createHash("sha256").update(readFileSync(path)).digest("hex") };
    } catch { return { path: "unknown", sha256: "unknown" }; }
  })(),
  forgeProvenance: null as Json | null,
  rows: [] as ReceiptRow[],
};
afterAll(() => {
  process.stdout.write(`\n${RECEIPT_PREFIX}${JSON.stringify(receipt)}\n`);
});

interface Fixture {
  /** The path makeScratch returned, which removeScratch takes back. */
  readonly dir: string;
  /** Its realpath: the package root gate.run and gate.status are given. */
  readonly root: string;
  /** The committed candidate: `git rev-parse HEAD` and `HEAD^{tree}` right after the fixture commit. */
  readonly head: ForgeObservedHead;
}
function git(root: string, ...args: string[]): string {
  return execFileSync("git", ["-C", root, "-c", "user.email=w08@example.invalid", "-c", "user.name=w08-fixture", "-c", "commit.gpgsign=false", ...args], {
    encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 10_000,
  }).trim();
}
/** A disposable package that is its own repository, committed clean: the candidate a gate.run pins at run start. */
function committedFixture(): Fixture {
  const dir = makeScratch("w08-verify-");
  const root = realpathSync(dir);
  writeFileSync(join(root, "forge.toml"), FIXTURE_MANIFEST);
  writeFileSync(join(root, "README.md"), "w08 fixture\n");
  git(root, "init", "-q");
  git(root, "add", "-A");
  git(root, "commit", "-q", "-m", "w08 fixture");
  return { dir, root, head: { commit: git(root, "rev-parse", "HEAD"), tree: git(root, "rev-parse", "HEAD^{tree}") } };
}

interface LiveRun {
  readonly operationId: string;
  readonly settlement: ForgeOperationSettlement;
  /** The gate.run reply exactly as the observer received it. */
  readonly reply: unknown;
  /** The operation node the observer settled into its projection. */
  readonly node: ObservedNode | undefined;
  /** What the head seam returned when the reply settled. */
  readonly headAtRead: ForgeObservedHead | undefined;
}
/** One gate.run through the production observer over a production connection, the reply kept by a pass-through tap. */
async function observedRun(root: string, observedHead: () => ForgeObservedHead | undefined): Promise<LiveRun> {
  const connection = await openForgeOperationConnection();
  const replies: unknown[] = [];
  const tapped: ForgeOperationConnection = {
    get capabilities() { return connection.capabilities; },
    operations: connection.operations,
    onNotification: sink => connection.onNotification(sink),
    request: async (method, params) => {
      const reply = await connection.request(method, params);
      replies.push(reply);
      return reply;
    },
    close: () => connection.close(),
  };
  let headAtRead: ForgeObservedHead | undefined;
  const scope = scopeOf(root);
  const projection = new ObservationProjection();
  let observer: Awaited<ReturnType<typeof observeForgeGateRun>>;
  try {
    observer = await observeForgeGateRun(tapped, {
      root, projection, scope, now: nowIso, timeoutMs: 30_000,
      // As forge_gate_run passes it (src/index.ts): the issuing connection is retained under the server's operation id.
      retain: (operationId, issuing) => retainForgeOperation(operationId, { operations: issuing.operations, connection: issuing, workspaceRoot: root }),
      observedHead: () => {
        headAtRead = observedHead();
        return headAtRead;
      },
    });
  } catch (error) {
    await connection.close();
    throw error;
  }
  try {
    const settlement = await observer.settled;
    const node = projection.query({ scope, ref: forgeOperationRef(observer.operationId), limit: 1 }).nodes[0];
    return { operationId: observer.operationId, settlement, reply: replies[0], node, headAtRead };
  } finally {
    await observer.dispose();
  }
}
function dataOf(reply: unknown): Json {
  const data = isRecord(reply) ? reply.data : undefined;
  if (!isRecord(data)) throw new Error("the gate.run reply carries no data object");
  return data;
}
function record(row: string, run: LiveRun, pinnedHead: ForgeObservedHead): void {
  const data = dataOf(run.reply);
  const envelope = isRecord(run.reply) && isRecord(run.reply.envelope) ? run.reply.envelope : {};
  if (receipt.forgeProvenance === null && isRecord(envelope.provenance)) receipt.forgeProvenance = envelope.provenance;
  receipt.rows.push({
    row, operationId: run.operationId, settlement: run.settlement,
    gateVerdict: scalar(data.gate_verdict), gatedCommit: scalar(data.gated_commit), gatedTree: scalar(data.gated_tree),
    sourceSnapshotId: scalar(data.source_snapshot_id), pinnedHead, headAtRead: run.headAtRead ?? null,
    statusText: run.node?.presentation.statusText ?? null, statusTone: run.node?.presentation.statusTone ?? null,
    subjectBasis: run.node?.subjectBasis ?? null,
  });
}

describe("live Forge current verification proof (wb-5uh, W08)", () => {
  it("V1 current verification: a real gate.run on a clean committed package settles success at basis current - the producer's own PASS, its run-start pin equal to the package HEAD commit and tree, that commit as subjectBasis", async () => {
    const fixture = committedFixture();
    try {
      const run = await observedRun(fixture.root, () => observedPackageHead(fixture.root));
      record("V1", run, fixture.head);
      const data = dataOf(run.reply);
      expect(run.settlement).toBe("settled");
      expect(data.gate_verdict).toBe("PASS");
      // The immutable source digest of the verdict: the producer's run-start pin names the committed candidate, commit and tree.
      expect(data.gated_commit).toBe(fixture.head.commit);
      expect(data.gated_tree).toBe(fixture.head.tree);
      expect(data.source_snapshot_id).toBe(fixture.head.tree);
      expect(run.node?.presentation.statusTone).toBe("success");
      expect(run.node?.presentation.statusText).toMatch(/ · basis current$/);
      expect(run.node?.subjectBasis).toBe(fixture.head.commit);
    } finally {
      removeScratch(fixture.dir);
    }
  }, ROW_TIMEOUT_MS);

  it("V2 source basis changed: the same real PASS read after the package HEAD moves on settles basis stale and never success, its subjectBasis still the commit the run pinned", async () => {
    const fixture = committedFixture();
    try {
      let moved: ForgeObservedHead | undefined;
      // The candidate moves on after the run pinned it and before the host reads its head: the seam commits, then reads.
      const run = await observedRun(fixture.root, () => {
        writeFileSync(join(fixture.root, "README.md"), "w08 fixture, next candidate\n");
        git(fixture.root, "commit", "-q", "-am", "w08 next candidate");
        moved = observedPackageHead(fixture.root);
        return moved;
      });
      record("V2", run, fixture.head);
      const data = dataOf(run.reply);
      expect(run.settlement).toBe("settled");
      expect(data.gate_verdict).toBe("PASS");
      expect(data.gated_commit).toBe(fixture.head.commit);
      expect(moved, "the host head seam ran when the reply settled").toBeDefined();
      expect(moved?.commit).toMatch(/^[0-9a-f]{40,64}$/);
      expect(moved?.commit).not.toBe(fixture.head.commit);
      expect(run.node?.presentation.statusTone).toBe("unknown");
      expect(run.node?.presentation.statusText).toMatch(/ · basis stale$/);
      expect(run.node?.subjectBasis).toBe(fixture.head.commit);
    } finally {
      removeScratch(fixture.dir);
    }
  }, ROW_TIMEOUT_MS);

  it("V3 dirty candidate: a real PASS over an uncommitted edit is the producer's dirty-tree verdict - gated_tree empty, a dirty-tree/v1 source snapshot over the HEAD tree - and settles basis stale, never success", async () => {
    const fixture = committedFixture();
    try {
      writeFileSync(join(fixture.root, "README.md"), "w08 fixture, uncommitted edit\n");
      const run = await observedRun(fixture.root, () => observedPackageHead(fixture.root));
      record("V3", run, fixture.head);
      const data = dataOf(run.reply);
      expect(run.settlement).toBe("settled");
      expect(data.gate_verdict).toBe("PASS");
      expect(data.gated_commit).toBe(fixture.head.commit);
      expect(data.gated_tree).toBe("");
      expect(data.source_snapshot_id).toMatch(new RegExp(`^dirty-tree/v1:${fixture.head.tree}:sha256:[0-9a-f]{64}$`));
      expect(run.node?.presentation.statusTone).toBe("unknown");
      expect(run.node?.presentation.statusText).toMatch(/ · basis stale$/);
    } finally {
      removeScratch(fixture.dir);
    }
  }, ROW_TIMEOUT_MS);

  it("V4 a read is never current verification: gate.status after a real PASS reports authoritative_current false with FORGE_CURRENT_STATE_UNVERIFIED, the package reads historical, unknown and partial, the workspace verification indeterminate, and the producer's source_digest never becomes a basis", async () => {
    const fixture = committedFixture();
    try {
      const run = await observedRun(fixture.root, () => observedPackageHead(fixture.root));
      record("V4", run, fixture.head);
      expect(dataOf(run.reply).gate_verdict).toBe("PASS");
      const reading = await readForgeGateStatus(fixture.root);
      const source = isRecord(reading) ? reading.source : undefined;
      const data = isRecord(source) ? source.data : undefined;
      const packages = isRecord(data) && Array.isArray(data.packages) ? data.packages : [];
      expect(packages).toHaveLength(1);
      const pkg: unknown = packages[0];
      if (!isRecord(pkg)) throw new Error("gate.status package row is not an object");
      expect(pkg.last_result).toBe("success");
      expect(pkg.authoritative_current).toBe(false);
      expect(pkg.unverified_reason).toBe("FORGE_CURRENT_STATE_UNVERIFIED");
      const basis = isRecord(pkg.last_result_state) && isRecord(pkg.last_result_state.invalidation_basis) ? pkg.last_result_state.invalidation_basis : {};
      // The producer's digest of the source it reads now: present, so the no-basis-from-it assertion below is not vacuous.
      const sourceDigest = basis.source_digest;
      expect(sourceDigest).toMatch(/^sha256:[0-9a-f]{64}$/);
      const at = nowIso();
      const topology = forgeGateTopology(reading, { scope: scopeOf(fixture.root), target: fixture.root, capturedAt: at, observedAt: at });
      const [workspace, row] = topology.snapshots;
      expect(workspace?.node.statusTone).toBe("unknown");
      expect(workspace?.node.statusText).toMatch(/verification indeterminate$/);
      expect(row?.node.statusTone).toBe("unknown");
      expect(row?.coverage).toBe("partial");
      expect(row?.node.statusText.startsWith("success (historical; authoritative_current=false; FORGE_CURRENT_STATE_UNVERIFIED)")).toBe(true);
      // A package basis is only ever the producer's own derived_from, never a digest of the source it reads now.
      expect(row?.subjectBasis).toBe(typeof basis.derived_from === "string" ? basis.derived_from : undefined);
      expect(JSON.stringify(topology.snapshots)).not.toContain(String(sourceDigest));
    } finally {
      removeScratch(fixture.dir);
    }
  }, ROW_TIMEOUT_MS);
});
