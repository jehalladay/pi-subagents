/**
 * EAT-R017 (bead loexn.9, M05): installed Pi-consumer conformance at tier L2.
 * An isolated external npm project whose fixture child runs on an explicitly resolved Node 24 binary (never the runner's own node) installs only the three packed tarballs, imports the host by its named
 * export and runs each adverse row in its own child process. Every refusal row must stay at zero trusted imports
 * (observed by a Node module-customization hook that counts loads under the host's install root) and zero
 * discover/context/implement(SDK)/verify(gate) callbacks; the paired positive control admits exactly once and proves
 * the import counter can move. L2 is fixture callbacks over real packed bytes: never native provider proof.
 */
import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { homedir, tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repo = fileURLToPath(new URL("../../..", import.meta.url));
const scratch = mkdtempSync(join(tmpdir(), "mw-pi-conformance-"));
after(() => rmSync(scratch, { recursive: true, force: true }));
const receiptDir = join(repo, "qa/integration/pi-native-interoperability-2026-11-09/m05");

// EAT-R017 binds the FIXTURE's node version, not the runner's: the chain gate may start this file under any engines-permitted
// node (>=22.18 <25). Resolve an explicit Node 24 binary for the fixture child and skip, with a stated reason, when none exists.
function pickNode24(candidates: readonly string[], versionOf: (binary: string) => string | undefined): { binary: string; version: string } | undefined {
  for (const binary of candidates) {
    const version = versionOf(binary);
    if (version !== undefined && /^v24\./.test(version)) return { binary, version };
  }
  return undefined;
}
function probeNodeVersion(binary: string): string | undefined {
  const probe = spawnSync(binary, ["--version"], { encoding: "utf8" });
  return probe.status === 0 ? probe.stdout.trim() : undefined;
}
function node24Candidates(): string[] {
  const candidates: string[] = [];
  const explicit = process.env["MW_FIXTURE_NODE24"];
  if (explicit !== undefined && explicit !== "") candidates.push(explicit);
  candidates.push(process.execPath);
  const where = spawnSync("mise", ["where", "node@24"], { encoding: "utf8" });
  if (where.status === 0 && where.stdout.trim() !== "") candidates.push(join(where.stdout.trim(), "bin", "node"));
  candidates.push(join(homedir(), ".local/share/mise/installs/node/24/bin/node"));
  for (const directory of (process.env["PATH"] ?? "").split(":")) if (directory !== "") candidates.push(join(directory, "node"));
  return candidates;
}
const fixtureNode = pickNode24(node24Candidates(), probeNodeVersion);
const fixtureSkip = fixtureNode === undefined ? "no Node 24 binary found for the fixture child (set MW_FIXTURE_NODE24 or install node@24 via mise); EAT-R017 cannot be exercised on this host" : false;
const fixtureTest = (name: string, body: () => void): void => { test(name, { skip: fixtureSkip }, body); };

interface Packed { readonly tarball: string; readonly files: readonly string[]; readonly sha256: string; readonly contentSha256: string }
// The tarball bytes carry each file's mode, and npm sets the executable bit on a bin target (dist/cli.js) only when a post-build `npm install` or
// `npm ci` links it, so the same tree packs to different tarball digests (MechanicalWorkflows-loexn.21 respin, HR-L21-D3). The coupling digest therefore
// covers what the tree determines: every packed path plus the sha256 of its extracted content, sorted, with modes and archive framing left out.
function contentDigest(tarball: string, files: readonly string[]): string {
  const extracted = mkdtempSync(join(scratch, "unpack-"));
  const unpack = spawnSync("tar", ["-xzf", tarball, "-C", extracted], { encoding: "utf8" });
  assert.equal(unpack.status, 0, unpack.stderr);
  const lines = files.map(path => path + "\0" + createHash("sha256").update(readFileSync(join(extracted, "package", path))).digest("hex") + "\n");
  return "sha256:" + createHash("sha256").update(lines.join("")).digest("hex");
}
function pack(relative: string): Packed {
  const destination = mkdtempSync(join(scratch, "pack-"));
  const run = spawnSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", destination], { cwd: join(repo, relative), encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
  const [first] = JSON.parse(run.stdout) as { filename: string; files: { path: string }[] }[];
  assert.ok(first, "npm pack reported nothing for " + relative);
  const tarball = join(destination, first.filename);
  const files = first.files.map(file => file.path).sort();
  return { tarball, files, sha256: "sha256:" + createHash("sha256").update(readFileSync(tarball)).digest("hex"), contentSha256: contentDigest(tarball, files) };
}
const library = pack("packages/development");
const coordination = pack("packages/coordination");
const rig = pack("apps/development-rig");
const tmpRoot = join(scratch, "tmp");
mkdirSync(tmpRoot);

function cleanEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env, npm_config_update_notifier: "false", TMPDIR: tmpRoot };
  delete env["NODE_PATH"];
  delete env["NODE_TEST_CONTEXT"];
  return env;
}
const project = mkdtempSync(join(scratch, "consumer-"));
writeFileSync(join(project, "package.json"), '{"name":"mw-pi-external-consumer","private":true,"type":"module"}\n');
const install = spawnSync("npm", ["install", "--ignore-scripts", "--offline", "--no-audit", "--no-fund", "--no-save", library.tarball, coordination.tarball, rig.tarball], { cwd: project, encoding: "utf8", env: cleanEnv() });
assert.equal(install.status, 0, install.stderr);

// The counter: a module-customization hook that reports every load from the host's transient install root.
writeFileSync(join(project, "hooks.mjs"), `
let port;
export function initialize(data) { port = data.port; }
export async function load(url, context, next) {
  if (url.includes("/mw-installed-host-")) port.postMessage(url);
  return next(url, context);
}
`);
writeFileSync(join(project, "register.mjs"), `
import { register } from "node:module";
import { MessageChannel } from "node:worker_threads";
const { port1, port2 } = new MessageChannel();
globalThis.__mwImportLoads = [];
port1.on("message", url => globalThis.__mwImportLoads.push(url));
port1.unref();
register("./hooks.mjs", { parentURL: import.meta.url, data: { port: port2 }, transferList: [port2] });
`);
writeFileSync(join(project, "row.mjs"), `
import { createHash } from "node:crypto";
import { closeSync, copyFileSync, existsSync, ftruncateSync, mkdirSync, openSync, readdirSync, readFileSync, symlinkSync, writeFileSync, writeSync } from "node:fs";
import { join } from "node:path";
const [, , row, argsJson] = process.argv;
const args = JSON.parse(argsJson);
const host = await import("@mechanical/development-rig/host");
const digest = bytes => "sha256:" + createHash("sha256").update(bytes).digest("hex");
const counters = { discover: 0, context: 0, implement: 0, verify: 0, bindingLoad: 0, writer: 0 };
const request = { task: "Pi consumer conformance", workspaceId: "repo-A", baseRevision: "base-1" };
const basis = { workspaceId: "repo-A", revision: "base-1" };
const updated = { workspaceId: "repo-A", revision: "candidate-1" };
const services = () => ({
  discover: async () => { counters.discover++; return { basis, coverage: "complete", files: ["a.ts"] }; },
  compileContext: async () => { counters.context++; return { basis, text: "plain" }; },
  implement: async () => { counters.implement++; return { basis: updated, parentBasis: basis }; },
  verify: async () => { counters.verify++; return { basis: updated, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-conformance" } }; },
});
const descriptorBytes = readFileSync(args.descriptor);
const libraryBytes = readFileSync(args.library);
const work = args.work;
mkdirSync(work, { recursive: true });
const options = (artifactPath, extra = {}) => ({
  artifactPath, artifactDigest: digest(libraryBytes), descriptorBytes, descriptorDigest: digest(descriptorBytes), services: services(), ...extra,
});
const copyTarball = name => { const path = join(work, name); copyFileSync(args.library, path); return path; };
const flip = bytes => { const mutated = Buffer.from(bytes); mutated[mutated.length - 3] = mutated[mutated.length - 3] ^ 1; return mutated; };
const goodBinding = () => ({
  contract: "mechanical.pi-host/v1", descriptorId: "mechanical.development.develop.v1",
  artifact: { package: "@mechanical/workflows-development", export: "develop", sha256: digest(libraryBytes), descriptorSha256: digest(descriptorBytes) },
  source: { workspaceRealpath: "/srv/workspace", baseCommit: "a".repeat(40), baseTree: "b".repeat(40), forgeManifestSha256: digest("forge") },
  invocationId: "inv-1", evidenceProfile: "git-census-v1", contextProfile: "plain-v1",
  intent: { task: "conformance", writer: "single", allowedEffects: ["develop-write"] },
});
const record = {};
async function attempt(fn) {
  try { const value = await fn(); return { admitted: true, outcome: value && value.kind }; }
  catch (error) { return { admitted: false, name: error && error.name, code: error && error.code, field: error && error.field }; }
}
const bindingRow = async mutate => { const raw = goodBinding(); mutate(raw); return attempt(() => host.admitHostBinding(raw, async () => { counters.bindingLoad++; return "loaded"; })); };

switch (row) {
  case "positive-control":
    record.result = await attempt(() => host.invokeDevelopmentHost(options(copyTarball("good.tgz")), request));
    break;
  case "corrupt-descriptor":
    record.result = await attempt(() => host.invokeDevelopmentHost(options(copyTarball("good.tgz"), { descriptorBytes: flip(descriptorBytes) }), request));
    break;
  case "corrupt-tarball": {
    const path = join(work, "corrupt.tgz");
    writeFileSync(path, flip(libraryBytes));
    record.result = await attempt(() => host.invokeDevelopmentHost(options(path), request));
    break;
  }
  case "alternate-export": {
    const descriptor = JSON.parse(descriptorBytes.toString("utf8"));
    descriptor.implementation.export = "developAlternate";
    const bytes = Buffer.from(JSON.stringify(descriptor, null, 2) + "\\n");
    record.result = await attempt(() => host.invokeDevelopmentHost(options(copyTarball("good.tgz"), { descriptorBytes: bytes, descriptorDigest: digest(bytes) }), request));
    break;
  }
  case "swap-between-invocations": {
    const path = copyTarball("swap.tgz");
    record.first = await attempt(() => host.invokeDevelopmentHost(options(path), request));
    record.firstLoads = (await countLoads());
    for (const key of ["discover", "context", "implement", "verify"]) record["first_" + key] = counters[key];
    writeFileSync(path, readFileSync(args.coordination));
    record.result = await attempt(() => host.invokeDevelopmentHost(options(path), request));
    break;
  }
  case "swap-during-install": {
    const path = copyTarball("inflight.tgz");
    const swapBytes = readFileSync(args.coordination);
    let swaps = 0;
    const timer = setInterval(() => {
      try {
        for (const entry of readdirSync(args.tmp)) {
          if (!entry.startsWith("mw-installed-host-")) continue;
          if (!existsSync(join(args.tmp, entry, "node_modules", "@mechanical", "workflows-development", "package.json"))) continue;
          const target = join(args.tmp, entry, "development.tgz");
          const fd = openSync(target, "r+");
          ftruncateSync(fd, 0);
          writeSync(fd, swapBytes, 0, swapBytes.length, 0);
          closeSync(fd);
          swaps++;
        }
      } catch {}
    }, 1);
    record.result = await attempt(() => host.invokeDevelopmentHost(options(path), request));
    clearInterval(timer);
    record.swaps = swaps;
    break;
  }
  case "symlink-escape": {
    const link = join(work, "link.tgz");
    symlinkSync(args.library, link);
    record.result = await attempt(() => host.invokeDevelopmentHost(options(link), request));
    break;
  }
  case "path-traversal":
    record.result = await attempt(() => host.invokeDevelopmentHost(options(work + "/../escape.tgz"), request));
    break;
  case "missing-callback": {
    const partial = services(); delete partial.verify;
    record.result = await attempt(() => host.invokeDevelopmentHost(options(copyTarball("good.tgz"), { services: partial }), request));
    break;
  }
  case "non-function-callback": {
    const wrongType = { ...services(), verify: "not-a-function" };
    record.result = await attempt(() => host.invokeDevelopmentHost(options(copyTarball("good.tgz"), { services: wrongType }), request));
    break;
  }
  case "renamed-callback": {
    const renamed = services(); renamed.verifyy = renamed.verify; delete renamed.verify;
    record.result = await attempt(() => host.invokeDevelopmentHost(options(copyTarball("good.tgz"), { services: renamed }), request));
    break;
  }
  case "unauthorised-workspace":
    record.result = await bindingRow(raw => { raw.source.workspaceRealpath = "relative/workspace"; });
    break;
  case "unauthorised-write-grant":
    record.result = await attempt(() => host.dispatchWriteAtFinalBoundary([], () => [], async () => { counters.writer++; return "wrote"; }));
    break;
  case "concurrent-writer":
    record.result = await bindingRow(raw => { raw.intent.writer = "multiple"; });
    break;
  case "source-drift":
    record.result = await bindingRow(raw => { raw.source.baseCommit = "a".repeat(12); });
    break;
  default:
    throw new Error("unknown row " + row);
}
async function countLoads() { await new Promise(resolve => setTimeout(resolve, 150)); return globalThis.__mwImportLoads.length; }
record.row = row;
record.importLoads = await countLoads();
record.callbacks = { discover: counters.discover, context: counters.context, implement: counters.implement, verify: counters.verify };
record.bindingLoad = counters.bindingLoad;
record.writer = counters.writer;
record.node = process.version;
console.log(JSON.stringify(record));
`);

interface Attempt { admitted: boolean; outcome?: string; name?: string; code?: string; field?: string }
interface RowRecord {
  row: string; result: Attempt; importLoads: number; callbacks: Record<"discover" | "context" | "implement" | "verify", number>;
  bindingLoad: number; writer: number; node: string; swaps?: number; first?: Attempt; firstLoads?: number;
}
const descriptorPath = join(repo, "contracts/entrypoints/development.v1.json");
function run(row: string): RowRecord {
  const work = mkdtempSync(join(scratch, "row-"));
  const argsJson = JSON.stringify({ library: library.tarball, coordination: coordination.tarball, descriptor: descriptorPath, work, tmp: tmpRoot });
  const child = spawnSync(fixtureNode?.binary ?? process.execPath, ["--import", "./register.mjs", "row.mjs", row, argsJson], { cwd: project, encoding: "utf8", env: cleanEnv() });
  assert.equal(child.status, 0, `row ${row} crashed: ${child.stderr}`);
  return JSON.parse(child.stdout.trim().split("\n").pop() ?? "") as RowRecord;
}
const observed: RowRecord[] = [];
function refusalRow(row: string, name: string, code: string, field?: string): RowRecord {
  const record = run(row);
  observed.push(record);
  assert.equal(record.result.admitted, false, row + " must refuse");
  assert.equal(record.result.name, name);
  assert.equal(record.result.code, code);
  if (field !== undefined) assert.equal(record.result.field, field);
  assert.equal(record.importLoads, 0, row + ": zero trusted imports");
  assert.deepEqual(record.callbacks, { discover: 0, context: 0, implement: 0, verify: 0 }, row + ": zero SDK and gate callbacks");
  assert.equal(record.bindingLoad, 0, row + ": zero loader calls");
  assert.equal(record.writer, 0, row + ": zero writer starts");
  return record;
}

fixtureTest("the external fixture runs on Node 24 and the installed tree resolves under its own node_modules", () => {
  assert.ok(fixtureNode !== undefined);
  const child = spawnSync(fixtureNode.binary, ["--version"], { encoding: "utf8" });
  assert.match(child.stdout.trim(), /^v24\./);
  assert.equal(child.stdout.trim(), fixtureNode.version);
});

test("the Node 24 resolver takes the first candidate that reports v24, ignores other majors and unprobeable binaries, and yields nothing when none qualifies", () => {
  const versions: Record<string, string | undefined> = { "/a/node22": "v22.23.2", "/b/broken": undefined, "/c/node24": "v24.20.0", "/d/node24b": "v24.1.0", "/e/node25": "v25.0.0" };
  const probe = (binary: string) => versions[binary];
  assert.deepEqual(pickNode24(["/a/node22", "/b/broken", "/c/node24", "/d/node24b"], probe), { binary: "/c/node24", version: "v24.20.0" });
  assert.equal(pickNode24(["/a/node22", "/b/broken", "/e/node25"], probe), undefined);
  assert.equal(pickNode24([], probe), undefined);
});

fixtureTest("positive control: the pinned descriptor and tarball admit once, each callback runs once, and the import counter moves", () => {
  const record = run("positive-control");
  observed.push(record);
  assert.equal(record.result.admitted, true);
  assert.equal(record.result.outcome, "verified_candidate");
  assert.deepEqual(record.callbacks, { discover: 1, context: 1, implement: 1, verify: 1 });
  assert.ok(record.importLoads > 0, "the hook must see the trusted import on the admitted path or a zero elsewhere proves nothing");
});

fixtureTest("a corrupt descriptor byte refuses HOST_DESCRIPTOR_DIGEST_MISMATCH before any import", () => {
  refusalRow("corrupt-descriptor", "HostAdmissionError", "HOST_DESCRIPTOR_DIGEST_MISMATCH");
});
fixtureTest("a corrupt tarball byte refuses ENTRYPOINT_ARTIFACT_MISMATCH before any import", () => {
  refusalRow("corrupt-tarball", "HostAdmissionError", "ENTRYPOINT_ARTIFACT_MISMATCH");
});
fixtureTest("an alternate export name in a re-digested descriptor refuses ENTRYPOINT_CONTRACT_INVALID before any import", () => {
  refusalRow("alternate-export", "HostAdmissionError", "ENTRYPOINT_CONTRACT_INVALID");
});
fixtureTest("a tarball path swapped after a first admission refuses the second invocation with zero imports for it", () => {
  const record = run("swap-between-invocations");
  observed.push(record);
  assert.equal(record.first?.admitted, true, "the first invocation admits");
  assert.ok((record.firstLoads ?? 0) > 0);
  assert.equal(record.result.admitted, false);
  assert.equal(record.result.code, "ENTRYPOINT_ARTIFACT_MISMATCH");
  assert.equal(record.importLoads, record.firstLoads, "no additional trusted import after the swap");
  assert.deepEqual(record.callbacks, { discover: 1, context: 1, implement: 1, verify: 1 }, "no callback beyond the first run");
});
fixtureTest("the host's own tarball overwritten while npm installs refuses ENTRYPOINT_ARTIFACT_MISMATCH with zero imports", () => {
  const record = refusalRow("swap-during-install", "HostAdmissionError", "ENTRYPOINT_ARTIFACT_MISMATCH");
  assert.ok((record.swaps ?? 0) >= 1, "the in-flight swap must have landed at least once");
});
fixtureTest("a symlinked artifact path refuses ENTRYPOINT_ARTIFACT_INVALID before any copy or import", () => {
  refusalRow("symlink-escape", "HostAdmissionError", "ENTRYPOINT_ARTIFACT_INVALID");
});
fixtureTest("a dot-dot artifact path refuses ENTRYPOINT_ARTIFACT_PATH_INVALID before any read or import", () => {
  refusalRow("path-traversal", "HostAdmissionError", "ENTRYPOINT_ARTIFACT_PATH_INVALID");
});
fixtureTest("a services object without the verify callback refuses ENTRYPOINT_BINDING_INVALID before any import", () => {
  refusalRow("missing-callback", "HostAdmissionError", "ENTRYPOINT_BINDING_INVALID");
});
fixtureTest("a four-key services object whose verify is not a function refuses ENTRYPOINT_BINDING_INVALID before any import (the key count passes, so only the per-key function check can refuse it)", () => {
  refusalRow("non-function-callback", "HostAdmissionError", "ENTRYPOINT_BINDING_INVALID");
});
fixtureTest("a four-key services object whose verify key is renamed refuses ENTRYPOINT_BINDING_INVALID before any import (the key count passes, so only the per-key function check can refuse it)", () => {
  refusalRow("renamed-callback", "HostAdmissionError", "ENTRYPOINT_BINDING_INVALID");
});
fixtureTest("a binding that names a non-absolute workspace refuses HOST_BINDING_FIELD_INVALID with zero loader calls", () => {
  refusalRow("unauthorised-workspace", "HostBindingError", "HOST_BINDING_FIELD_INVALID", "source.workspaceRealpath");
});
fixtureTest("a write dispatched without the exact grant refuses WRITE_GRANT_ABSENT and never starts the writer", () => {
  refusalRow("unauthorised-write-grant", "HostBindingError", "WRITE_GRANT_ABSENT", "mechanical:develop-write");
});
fixtureTest("a binding that asks for more than one writer refuses HOST_BINDING_FIELD_INVALID with zero loader calls", () => {
  refusalRow("concurrent-writer", "HostBindingError", "HOST_BINDING_FIELD_INVALID", "intent.writer");
});
fixtureTest("a binding whose base commit is an abbreviation refuses HOST_BINDING_FIELD_INVALID with zero loader calls", () => {
  refusalRow("source-drift", "HostBindingError", "HOST_BINDING_FIELD_INVALID", "source.baseCommit");
});

fixtureTest("negative control for the counter: a trusted import under a host root would register, so a zero is a measured zero", () => {
  const positive = observed.find(record => record.row === "positive-control");
  assert.ok(positive && positive.importLoads > 0);
  for (const record of observed) assert.equal(record.node, fixtureNode?.version, record.row + ": the row's node comes from the fixture child, not the runner");
});

fixtureTest("receipt output: with MW_M05_OBSERVATIONS_OUT set the observed rows, tarball digests and pack lists are written for the committed receipt", () => {
  const out = process.env["MW_M05_OBSERVATIONS_OUT"];
  if (out === undefined || out === "") return;
  const node = fixtureNode?.version ?? "";
  const npm = spawnSync("npm", ["--version"], { encoding: "utf8" }).stdout.trim();
  const packs = (value: Packed) => ({ sha256: value.sha256, content_sha256: value.contentSha256, files: value.files });
  writeFileSync(out, JSON.stringify({ node, npm, packs: { "@mechanical/workflows-development": packs(library), "@mechanical/workflows-coordination": packs(coordination), "@mechanical/development-rig": packs(rig) }, rows: observed }, null, 2) + "\n");
});

test("the committed M05 receipt, when present, is an L2 MW-INSTALLED-HOST record with every adverse row and never a native proof", () => {
  let text: string;
  try { text = readFileSync(join(receiptDir, "installed-pi-consumer-l2-receipt.json"), "utf8"); } catch { assert.fail("the committed M05 receipt is missing"); }
  const receipt = JSON.parse(text) as { schema: string; packet: string; mechanical_base_sha: string; label: string; evidence_tier: string; status: string; node_version: string; native_provider_proof: boolean; tarballs: Record<string, { sha256: string; content_sha256: string; files: string[] }>; rows: { id: string; status: string; import_loads: number; callbacks_total: number }[] };
  assert.equal(receipt.schema, "mw.pi-interop-receipt.v1");
  assert.equal(receipt.packet, "M05");
  assert.equal(receipt.label, "MW-INSTALLED-HOST");
  assert.equal(receipt.evidence_tier, "L2");
  assert.equal(receipt.native_provider_proof, false);
  assert.match(receipt.node_version, /^v24\./);
  assert.match(receipt.mechanical_base_sha, /^[0-9a-f]{40}$/, "the receipt names the full 40-hex mechanical base sha");
  // The receipt is tree-coupled (MechanicalWorkflows-loexn.21): each package's content digest must equal the one this very run computed from the tarball
  // it packed from the tree under test, so a receipt measured at an older tree cannot certify a changed one. The whole-tarball `sha256` stays in the
  // receipt as the measured record but is not asserted, because file modes move it without any content change. Regenerate with MW_M05_OBSERVATIONS_OUT.
  const packedFresh: Record<string, Packed> = { "@mechanical/workflows-development": library, "@mechanical/workflows-coordination": coordination, "@mechanical/development-rig": rig };
  for (const name of Object.keys(packedFresh)) {
    const entry = receipt.tarballs[name];
    assert.ok(entry && /^sha256:[0-9a-f]{64}$/.test(entry.sha256) && /^sha256:[0-9a-f]{64}$/.test(entry.content_sha256) && entry.files.length > 0, name + " needs a sha256, a content_sha256 and a file list");
    assert.deepEqual(entry.files, packedFresh[name]?.files, name + ": the committed receipt file list is stale against the tarball packed from this tree (regenerate with MW_M05_OBSERVATIONS_OUT)");
    assert.equal(entry.content_sha256, packedFresh[name]?.contentSha256, name + ": the committed receipt content digest is stale against the tarball packed from this tree (regenerate with MW_M05_OBSERVATIONS_OUT)");
  }
  const ids = receipt.rows.map(row => row.id).sort();
  for (const required of ["positive-control", "corrupt-descriptor", "corrupt-tarball", "alternate-export", "swap-between-invocations", "swap-during-install", "symlink-escape", "path-traversal", "missing-callback", "non-function-callback", "renamed-callback", "unauthorised-workspace", "unauthorised-write-grant", "concurrent-writer", "source-drift"]) assert.ok(ids.includes(required), "receipt lacks row " + required);
  for (const row of receipt.rows) {
    assert.ok(row.status === "pass" || row.status === "fail");
    if (row.id !== "positive-control" && row.id !== "swap-between-invocations") assert.equal(row.import_loads + row.callbacks_total, 0, row.id);
  }
});
