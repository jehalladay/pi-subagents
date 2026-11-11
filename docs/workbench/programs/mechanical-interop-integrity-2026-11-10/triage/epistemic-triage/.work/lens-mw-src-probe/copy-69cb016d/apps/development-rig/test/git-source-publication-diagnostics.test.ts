// MechanicalWorkflows-hn5b: diagnostic coverage ratchet pins for GitBlobPublicationSource.
// Each test drives one refusal literal through the class surface so the code ships pinned.
import test from "node:test";
import assert from "node:assert/strict";
import { chmodSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { GitBlobPublicationSource } from "../dist/git-source-publication.js";
import { publicationSemanticKey } from "@mechanical/workflows-coordination";
import type { CertifiedArtifactProposal, PublicationCandidate } from "@mechanical/workflows-coordination";

const run = (directory: string, args: string[]): string =>
  execFileSync("git", ["-C", directory, ...args], { encoding: "utf8" }).trim();
function repository(objectFormat?: "sha256"): string {
  const directory = mkdtempSync(join(tmpdir(), "mw-cpp10-diag-"));
  run(directory, ["init", "-b", "main", ...(objectFormat ? ["--object-format=" + objectFormat] : [])]);
  run(directory, ["config", "user.name", "CPP fixture"]);
  run(directory, ["config", "user.email", "fixture@example.org"]);
  writeFileSync(join(directory, "a.txt"), "verified Git bytes\n");
  run(directory, ["add", "a.txt"]); run(directory, ["commit", "-m", "base"]);
  return directory;
}
// MechanicalWorkflows-bkh3: mode bits on objects/ alone stop only the creation of new objects/<xx>
// fan-out directories; a loose object whose prefix already exists still lands. Seal every write path
// (the store and each existing fan-out directory) and return the restore function.
function sealObjectStore(directory: string): () => void {
  const objects = join(directory, ".git", "objects");
  const sealed = [objects];
  sealed.push(...readdirSync(objects).filter(name => /^[0-9a-f]{2}$/.test(name)).map(name => join(objects, name)));
  for (const path of sealed) chmodSync(path, 0o555);
  return () => { for (const path of sealed.reverse()) chmodSync(path, 0o755); };
}
// Pre-create all 256 fan-out directories so every object id has an existing, writable prefix.
function precreateEveryFanout(directory: string): void {
  for (let n = 0; n < 256; n++) mkdirSync(join(directory, ".git", "objects", n.toString(16).padStart(2, "0")), { recursive: true });
}
async function fixture(directory: string) {
  const source = new GitBlobPublicationSource({ repository: directory, workspaceId: "git:local" });
  const basis = await source.readBasis(), oid = run(directory, ["rev-parse", "HEAD:a.txt"]);
  const bytes = execFileSync("git", ["-C", directory, "cat-file", "blob", oid]);
  const artifact: CertifiedArtifactProposal = {
    id: "a", revision: basis.revision, digest: "sha256:" + createHash("sha256").update(bytes).digest("hex"),
    receiptRef: "gitblob:" + oid, consumerContract: "git-blob-content-v1", dependencies: [], dischargedEffectIds: [],
  };
  const candidate = (over: Partial<PublicationCandidate> = {}, artifacts: readonly CertifiedArtifactProposal[] = [artifact]): PublicationCandidate => {
    const shaped: PublicationCandidate = {
      schema: "mw.cpp10.publication-candidate.v1", idempotencyKey: "", basis,
      consumerContract: "git-blob-content-v1", artifacts, requiredIds: artifacts.map(a => a.id),
      admittedIntentIds: artifacts.map(a => "intent:" + a.id), ...over,
    };
    return { ...shaped, idempotencyKey: over.idempotencyKey ?? publicationSemanticKey(shaped.basis, shaped.consumerContract, shaped.artifacts, shaped.requiredIds) };
  };
  return { source, basis, artifact, candidate };
}
const rejectedWith = async (p: Promise<{ status: string; reason?: string }>, reason: string) => {
  const outcome = await p;
  assert.deepEqual(outcome, { status: "rejected", reason });
};

test("GIT_CPP: the constructor refuses a blank repository or workspace and invalid or identical refs", () => {
  assert.throws(() => new GitBlobPublicationSource({ repository: "", workspaceId: "git:local" }), /GIT_CPP: workspace\/repository required/);
  assert.throws(() => new GitBlobPublicationSource({ repository: "/tmp", workspaceId: "  " }), /GIT_CPP: workspace\/repository required/);
  assert.throws(() => new GitBlobPublicationSource({ repository: "/tmp", workspaceId: "w", sourceRef: "refs/evil/..", }), /GIT_CPP: invalid or identical refs/);
  assert.throws(() => new GitBlobPublicationSource({ repository: "/tmp", workspaceId: "w", sourceRef: "refs/heads/main", publicationRef: "refs/heads/main" }), /GIT_CPP: invalid or identical refs/);
});

test("GIT_CPP: a repository whose source ref is absent refuses readBasis", async () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-cpp10-noref-"));
  try {
    run(dir, ["init", "-b", "main"]);
    const source = new GitBlobPublicationSource({ repository: dir, workspaceId: "git:local" });
    await assert.rejects(() => source.readBasis(), /GIT_CPP: missing source ref/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("UNSUPPORTED_GIT_CONTRACT: a wrong consumer contract or workspace is rejected", async () => {
  const dir = repository();
  try {
    const { source, candidate } = await fixture(dir);
    await rejectedWith(source.commitAtomically(candidate({ consumerContract: "other-contract" })), "UNSUPPORTED_GIT_CONTRACT");
    await rejectedWith(source.commitAtomically({ ...candidate(), basis: { workspaceId: "git:other", revision: candidate().basis.revision } }), "UNSUPPORTED_GIT_CONTRACT");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("IDEMPOTENCY_FINGERPRINT_INVALID: a caller-supplied key that does not recompute is rejected", async () => {
  const dir = repository();
  try {
    const { source, candidate } = await fixture(dir);
    await rejectedWith(source.commitAtomically(candidate({ idempotencyKey: "sha256:" + "0".repeat(64) })), "IDEMPOTENCY_FINGERPRINT_INVALID");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("EMPTY_PUBLICATION: zero artifacts or zero required ids are rejected", async () => {
  const dir = repository();
  try {
    const { source, candidate } = await fixture(dir);
    await rejectedWith(source.commitAtomically(candidate({}, [])), "EMPTY_PUBLICATION");
    await rejectedWith(source.commitAtomically(candidate({ requiredIds: [] })), "EMPTY_PUBLICATION");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("BAD_COVERAGE: duplicate artifact ids and unknown required ids are rejected", async () => {
  const dir = repository();
  try {
    const { source, artifact, candidate } = await fixture(dir);
    await rejectedWith(source.commitAtomically(candidate({}, [artifact, artifact])), "BAD_COVERAGE");
    await rejectedWith(source.commitAtomically(candidate({ requiredIds: ["ghost"] })), "BAD_COVERAGE");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

// MechanicalWorkflows-gq7g: the duplicate-artifact-id clause (byId.size) decides alone only when the
// required ids are distinct; the [artifact, artifact] case above is also caught by the duplicate-requiredIds clause.
test("BAD_COVERAGE: a duplicate artifact id is rejected even when requiredIds are distinct", async () => {
  const dir = repository();
  try {
    const { source, artifact, candidate } = await fixture(dir);
    await rejectedWith(source.commitAtomically(candidate({ requiredIds: ["a"] }, [artifact, artifact])), "BAD_COVERAGE");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("BAD_DEPENDENCIES: a dependency cycle inside the candidate is rejected", async () => {
  const dir = repository();
  try {
    const { source, artifact, candidate } = await fixture(dir);
    const a = { ...artifact, id: "a", dependencies: ["b"] };
    const b = { ...artifact, id: "b", dependencies: ["a"] };
    await rejectedWith(source.commitAtomically(candidate({}, [a, b])), "BAD_DEPENDENCIES");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

// MechanicalWorkflows-u2pj: six nativeCheck seam laws the hn5b pins left unpinned. Each case reaches
// commitAtomically directly, so a caller that bypasses staging still meets the native recheck.
test("UNSUPPORTED_GIT_CONTRACT: a candidate with a foreign schema string is rejected", async () => {
  const dir = repository();
  try {
    const { source, candidate } = await fixture(dir);
    await rejectedWith(source.commitAtomically(candidate({ schema: "other" as PublicationCandidate["schema"] })), "UNSUPPORTED_GIT_CONTRACT");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("UNSUPPORTED_GIT_CONTRACT: a basis revision that is not an object id is rejected before any git read", async () => {
  const dir = repository();
  try {
    const { source, candidate } = await fixture(dir);
    // The fixture recomputes the idempotency key over this basis, so only the revision shape can refuse it.
    await rejectedWith(source.commitAtomically(candidate({ basis: { workspaceId: "git:local", revision: "not-an-oid" } })), "UNSUPPORTED_GIT_CONTRACT");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("BAD_COVERAGE: an artifact that lists the same dependency twice is rejected", async () => {
  const dir = repository();
  try {
    const { source, artifact, candidate } = await fixture(dir);
    const b = { ...artifact, id: "b", dependencies: ["a", "a"] };
    await rejectedWith(source.commitAtomically(candidate({}, [artifact, b])), "BAD_COVERAGE");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("BAD_COVERAGE: a blank artifact id is rejected", async () => {
  const dir = repository();
  try {
    const { source, artifact, candidate } = await fixture(dir);
    const blank = { ...artifact, id: " " };
    await rejectedWith(source.commitAtomically(candidate({ requiredIds: ["a"] }, [artifact, blank])), "BAD_COVERAGE");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("BAD_DEPENDENCIES: a dependency naming no artifact in the candidate is rejected, not reported as a validation failure", async () => {
  const dir = repository();
  try {
    const { source, artifact, candidate } = await fixture(dir);
    await rejectedWith(source.commitAtomically(candidate({}, [{ ...artifact, dependencies: ["ghost"] }])), "BAD_DEPENDENCIES");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("BAD_COVERAGE: duplicate required ids are rejected", async () => {
  const dir = repository();
  try {
    const { source, candidate } = await fixture(dir);
    await rejectedWith(source.commitAtomically(candidate({ requiredIds: ["a", "a"] })), "BAD_COVERAGE");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("INVALID_BLOB_DIGEST is the named reason when the tree blob's bytes do not match the certified digest", async () => {
  const dir = repository();
  try {
    const { source, artifact, candidate } = await fixture(dir);
    await rejectedWith(source.commitAtomically(candidate({}, [{ ...artifact, digest: "sha256:" + "0".repeat(64) }])), "INVALID_BLOB_DIGEST");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("GIT_OBJECT_VALIDATION_FAILED: a well-formed basis revision absent from the repository fails closed", async () => {
  const dir = repository();
  try {
    const { source, artifact, candidate } = await fixture(dir);
    const ghost = "f".repeat(40);
    const shaped = candidate({ basis: { workspaceId: "git:local", revision: ghost } }, [{ ...artifact, revision: ghost }]);
    await rejectedWith(source.commitAtomically(shaped), "GIT_OBJECT_VALIDATION_FAILED");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("GIT_OBJECT_WRITE_FAILED: an unwritable object store rejects instead of publishing", async () => {
  const dir = repository();
  try {
    const { source, candidate } = await fixture(dir);
    const restore = sealObjectStore(dir);
    try {
      await rejectedWith(source.commitAtomically(candidate()), "GIT_OBJECT_WRITE_FAILED");
    } finally { restore(); }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("GIT_OBJECT_WRITE_FAILED: an unwritable object store rejects even when every fan-out prefix already exists", async () => {
  const dir = repository();
  try {
    const { source, candidate } = await fixture(dir);
    precreateEveryFanout(dir);
    const restore = sealObjectStore(dir);
    try {
      await rejectedWith(source.commitAtomically(candidate()), "GIT_OBJECT_WRITE_FAILED");
    } finally { restore(); }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("GIT_OBJECT_ID_INVALID: a hash-object result that is not an object id is rejected at the seam", async () => {
  const dir = repository();
  try {
    const { source, candidate } = await fixture(dir);
    const internal = source as unknown as { run(args: string[], input?: string): string };
    const original = internal.run.bind(source);
    internal.run = (args: string[], input?: string) =>
      args[0] === "hash-object" ? "not-an-object-id" : original(args, input);
    await rejectedWith(source.commitAtomically(candidate()), "GIT_OBJECT_ID_INVALID");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("CONCURRENT_REF_UPDATE_OR_GIT_LOCK_ERROR: a held ref lock with an unchanged source names the conflict", async () => {
  const dir = repository();
  try {
    const { source, candidate } = await fixture(dir);
    mkdirSync(join(dir, ".git", "refs", "cpp10"), { recursive: true });
    writeFileSync(join(dir, ".git", "refs", "cpp10", "publication.lock"), "held\n");
    try {
      await rejectedWith(source.commitAtomically(candidate()), "CONCURRENT_REF_UPDATE_OR_GIT_LOCK_ERROR");
    } finally { rmSync(join(dir, ".git", "refs", "cpp10", "publication.lock"), { force: true }); }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

// MechanicalWorkflows-gq7g: the 64-hex OID arm of /^[a-f0-9]{40}(?:[a-f0-9]{24})?$/ is reachable only
// through a SHA-256 object-format repository; maybeRef, nativeCheck and the ref-lock zero id all rely on it.
test("SHA-256 object-format repository: readBasis returns a 64-hex revision and a valid one-artifact candidate publishes", async t => {
  let dir: string;
  try { dir = repository("sha256"); }
  catch (error) { t.skip("host git cannot init --object-format=sha256: " + (error as Error).message.split("\n")[0]); return; }
  try {
    const { source, basis, candidate } = await fixture(dir);
    assert.match(basis.revision, /^[a-f0-9]{64}$/);
    const outcome = await source.commitAtomically(candidate());
    assert.equal(outcome.status, "committed");
    if (outcome.status !== "committed") return;
    assert.equal(outcome.revision, basis.revision);
    assert.match(outcome.snapshotId, /^[a-f0-9]{64}$/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
