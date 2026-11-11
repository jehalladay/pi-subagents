/**
 * EAT-R005/R006 (bead loexn.5, M01): the stable host facade and its admission guards.
 * Tier L1/L2: fixture services against the real npm-packed library tarball; never a native or live proof.
 */
import test, { after } from "node:test";
import assert from "node:assert/strict";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import * as host from "../dist/host.js";
import { HostAdmissionError, HOST_API_VERSION, invokeDevelopmentHost } from "../dist/host.js";
import { invokeInstalledDevelopment } from "../dist/installed-host.js";
import type { EntrypointDescriptor } from "../dist/entrypoint-host.js";
import type { DevelopmentServices, SubjectBasis } from "@mechanical/workflows-development";

function packLibrary(): string {
  const library = fileURLToPath(new URL("../../../packages/development", import.meta.url));
  const destination = mkdtempSync(join(tmpdir(), "mw-pack-"));
  const packed = spawnSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", destination], { cwd: library, encoding: "utf8" });
  if (packed.status !== 0) throw new Error("LIBRARY_PACK_FAILED: " + packed.stderr);
  const [first] = JSON.parse(packed.stdout) as { filename: string }[];
  if (!first) throw new Error("LIBRARY_PACK_FAILED: npm pack reported nothing");
  return join(destination, first.filename);
}
const packedLibrary = packLibrary();
after(() => rmSync(dirname(packedLibrary), { recursive: true, force: true }));

const digest = (bytes: Buffer | Uint8Array | string) => "sha256:" + createHash("sha256").update(bytes).digest("hex");
const descriptorBytes = readFileSync(new URL("../../../contracts/entrypoints/development.v1.json", import.meta.url));
const descriptor = JSON.parse(descriptorBytes.toString("utf8")) as EntrypointDescriptor;
const request = { task: "Facade admission run", workspaceId: "repo-A", baseRevision: "base-1" };
const basis: SubjectBasis = { workspaceId: request.workspaceId, revision: request.baseRevision };
const updated: SubjectBasis = { workspaceId: request.workspaceId, revision: "candidate-1" };
function services(seen: string[] = []): DevelopmentServices {
  return {
    discover: async () => { seen.push("discover"); return { basis, coverage: "complete" as const, files: ["src/a.ts"] }; },
    compileContext: async () => { seen.push("context"); return { basis, text: "plain test" }; },
    implement: async () => { seen.push("implement"); return { basis: updated, parentBasis: basis }; },
    verify: async () => { seen.push("verify"); return { basis: updated, verdict: "passed" as const, evidence: { system: "forge", kind: "operation", id: "op-facade" } }; },
  };
}
async function fixture<T>(fn: (root: string, tarball: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mw-host-facade-"));
  try {
    const tarball = join(root, "mechanical-workflows-development-0.1.0.tgz");
    writeFileSync(tarball, readFileSync(packedLibrary));
    return await fn(root, tarball);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}
const opts = (tarball: string, seen: string[], extra: Record<string, unknown> = {}) => ({
  artifactPath: tarball, artifactDigest: "artifactDigest" in extra ? "" : digest(readFileSync(tarball)), descriptorBytes, descriptorDigest: digest(descriptorBytes),
  services: services(seen), ...extra,
});

test("the facade exports a versioned host function, the typed admission error and the binding guards, and nothing else callable", () => {
  assert.equal(HOST_API_VERSION, "mechanical.pi-host/v1");
  assert.equal(typeof invokeDevelopmentHost, "function");
  assert.deepEqual(Object.keys(host).sort(), [
    "HOST_API_VERSION", "HostAdmissionError", "HostBindingError", "WRITE_GRANT", "admitHostBinding",
    "dispatchWriteAtFinalBoundary", "invokeDevelopmentHost", "validateHostBinding",
  ]);
});

test("positive control: committed descriptor bytes plus the exact tarball admit and run each callback once", () => fixture(async (_root, tarball) => {
  const seen: string[] = [];
  const out = await invokeDevelopmentHost(opts(tarball, seen), request);
  assert.equal(out.kind, "verified_candidate");
  assert.deepEqual(seen, ["discover", "context", "implement", "verify"]);
}));

test("one changed descriptor byte refuses with HOST_DESCRIPTOR_DIGEST_MISMATCH and zero callbacks", () => fixture(async (_root, tarball) => {
  const seen: string[] = [];
  const mutated = Buffer.from(descriptorBytes); mutated[mutated.length - 3] = mutated[mutated.length - 3]! ^ 1;
  await assert.rejects(() => invokeDevelopmentHost(opts(tarball, seen, { descriptorBytes: mutated }), request),
    (error: unknown) => error instanceof HostAdmissionError && error.code === "HOST_DESCRIPTOR_DIGEST_MISMATCH");
  assert.deepEqual(seen, []);
}));

test("bytes that hash correctly but are not a JSON descriptor refuse with HOST_DESCRIPTOR_INVALID", () => fixture(async (_root, tarball) => {
  const seen: string[] = [];
  const junk = Buffer.from("not json {");
  await assert.rejects(() => invokeDevelopmentHost(opts(tarball, seen, { descriptorBytes: junk, descriptorDigest: digest(junk) }), request),
    (error: unknown) => error instanceof HostAdmissionError && error.code === "HOST_DESCRIPTOR_INVALID");
  assert.deepEqual(seen, []);
}));

test("a wrong artifact digest surfaces as a typed ENTRYPOINT_ARTIFACT_MISMATCH admission error", () => fixture(async (_root, tarball) => {
  const seen: string[] = [];
  await assert.rejects(() => invokeDevelopmentHost(opts(tarball, seen, { artifactDigest: "sha256:" + "0".repeat(64) }), request),
    (error: unknown) => error instanceof HostAdmissionError && error.code === "ENTRYPOINT_ARTIFACT_MISMATCH");
  assert.deepEqual(seen, []);
}));

test("a service failure is the caller's own error, never relabelled as an admission refusal", () => fixture(async (_root, tarball) => {
  const bad: DevelopmentServices = { ...services(), discover: async () => { throw new RangeError("provider exploded"); } };
  await assert.rejects(() => invokeDevelopmentHost(opts(tarball, [], { services: bad }), request),
    (error: unknown) => error instanceof RangeError && !(error instanceof HostAdmissionError));
}));

test("an extra callback beyond the four descriptor bindings refuses before install", () => fixture(async (_root, tarball) => {
  const seen: string[] = [];
  const extra = { ...services(seen), exfiltrate: async () => "never" } as unknown as DevelopmentServices;
  await assert.rejects(() => invokeDevelopmentHost(opts(tarball, seen, { services: extra }), request),
    (error: unknown) => error instanceof HostAdmissionError && error.code === "ENTRYPOINT_BINDING_INVALID");
  assert.deepEqual(seen, []);
}));

test("a symlinked artifact refuses with ENTRYPOINT_ARTIFACT_INVALID even when the target digest matches", () => fixture(async (root, tarball) => {
  const link = join(root, "linked.tgz"); symlinkSync(tarball, link);
  const seen: string[] = [];
  await assert.rejects(() => invokeDevelopmentHost(opts(link, seen, { artifactDigest: digest(readFileSync(tarball)) }), request),
    (error: unknown) => error instanceof HostAdmissionError && error.code === "ENTRYPOINT_ARTIFACT_INVALID");
  assert.deepEqual(seen, []);
}));

test("a directory standing in for the artifact refuses with ENTRYPOINT_ARTIFACT_INVALID", () => fixture(async (root, tarball) => {
  const dir = join(root, "dir.tgz"); mkdirSync(dir);
  const seen: string[] = [];
  await assert.rejects(() => invokeDevelopmentHost(opts(dir, seen, { artifactDigest: digest(readFileSync(tarball)) }), request),
    (error: unknown) => error instanceof HostAdmissionError && error.code === "ENTRYPOINT_ARTIFACT_INVALID");
  assert.deepEqual(seen, []);
}));

test("a FIFO standing in for the artifact refuses without blocking", () => fixture(async (root, tarball) => {
  const fifo = join(root, "pipe.tgz");
  assert.equal(spawnSync("mkfifo", [fifo]).status, 0);
  const seen: string[] = [];
  await assert.rejects(() => invokeDevelopmentHost(opts(fifo, seen, { artifactDigest: digest(readFileSync(tarball)) }), request),
    (error: unknown) => error instanceof HostAdmissionError && error.code === "ENTRYPOINT_ARTIFACT_INVALID");
  assert.deepEqual(seen, []);
}));

for (const [label, build] of [
  ["a dot-dot traversal segment", (root: string) => root + "/sub/../mechanical-workflows-development-0.1.0.tgz"],
  ["a control character", (root: string) => join(root, "bad\nname.tgz")],
] as const) {
  test(`${label} in the artifact path refuses with ENTRYPOINT_ARTIFACT_PATH_INVALID before any file access`, () => fixture(async (root, tarball) => {
    const seen: string[] = [];
    await assert.rejects(() => invokeDevelopmentHost(opts(build(root), seen, { artifactDigest: digest(readFileSync(tarball)) }), request),
      (error: unknown) => error instanceof HostAdmissionError && error.code === "ENTRYPOINT_ARTIFACT_PATH_INVALID");
    assert.deepEqual(seen, []);
  }));
}

/** A PATH shim named `npm` that runs the real npm, then optionally appends one byte to the tarball argument. */
function npmShim(root: string, mutate: boolean): string {
  const realNpm = spawnSync("sh", ["-c", "command -v npm"], { encoding: "utf8" }).stdout.trim();
  const bin = join(root, "shim-bin"); mkdirSync(bin);
  const script = join(bin, "npm");
  writeFileSync(script, `#!/bin/sh\n"${realNpm}" "$@"\nstatus=$?\n${mutate ? 'for last; do :; done\nprintf x >> "$last"\n' : ""}exit $status\n`);
  chmodSync(script, 0o755);
  return bin;
}
async function withShim<T>(bin: string, fn: () => Promise<T>): Promise<T> {
  const before = process.env["PATH"];
  process.env["PATH"] = bin + ":" + (before ?? "");
  try { return await fn(); } finally { process.env["PATH"] = before; }
}
const installedOptions = (tarball: string, seen: string[]) => ({
  artifactPath: tarball, artifactDigest: digest(readFileSync(tarball)), descriptor, entrypointId: descriptor.id,
  contractVersion: descriptor.schema, services: services(seen),
});

test("positive control for the swap mutant: an untouched tarball is imported exactly once", () => fixture(async (root, tarball) => {
  const bin = npmShim(root, false);
  let imports = 0;
  const out = await withShim(bin, () => invokeInstalledDevelopment({
    ...installedOptions(tarball, []),
    importModule: async (url: string) => { imports += 1; return import(url); },
  }, request));
  assert.equal(out.kind, "verified_candidate");
  assert.equal(imports, 1);
}));

test("negative mutant: one byte swapped into the tarball after the initial digest fails admission with the import counter at 0", () => fixture(async (root, tarball) => {
  const bin = npmShim(root, true);
  let imports = 0;
  const seen: string[] = [];
  await assert.rejects(() => withShim(bin, () => invokeInstalledDevelopment({
    ...installedOptions(tarball, seen),
    importModule: async (url: string) => { imports += 1; return import(url); },
  }, request)), /ENTRYPOINT_ARTIFACT_MISMATCH/);
  assert.equal(imports, 0);
  assert.deepEqual(seen, []);
}));

/**
 * A PATH shim named `npm` that runs the real npm and then turns the installed package manifest into a FIFO. The host blocks reading it only
 * after its post-install digest check has passed, so a background writer that opens the FIFO (which returns only once the host reads) can
 * append one byte to the tarball inside the window between the post-install check and the last check before the trusted import.
 */
function npmWindowShim(root: string): string {
  const realNpm = spawnSync("sh", ["-c", "command -v npm"], { encoding: "utf8" }).stdout.trim();
  const bin = join(root, "window-shim-bin"); mkdirSync(bin);
  const script = join(bin, "npm");
  writeFileSync(script, [
    "#!/bin/sh",
    `"${realNpm}" "$@"`,
    "status=$?",
    'for last; do :; done',
    '[ "$status" -eq 0 ] || exit $status',
    'manifest="$PWD/node_modules/@mechanical/workflows-development/package.json"',
    'cp "$manifest" "$manifest.real"',
    'rm "$manifest"',
    'mkfifo "$manifest"',
    // The writer restores a regular manifest BEFORE it closes the FIFO, so the reader's EOF never precedes a readable package.json.
    '( exec 3>"$manifest"; printf x >> "$last"; cat "$manifest.real" >&3; rm "$manifest"; mv "$manifest.real" "$manifest"; exec 3>&- ) >/dev/null 2>&1 </dev/null &',
    "exit 0",
    "",
  ].join("\n"));
  chmodSync(script, 0o755);
  return bin;
}

test("negative mutant: one byte swapped after the post-install digest and before the import fails the last re-check with the import counter at 0", () => fixture(async (root, tarball) => {
  const bin = npmWindowShim(root);
  let imports = 0;
  const seen: string[] = [];
  await assert.rejects(() => withShim(bin, () => invokeInstalledDevelopment({
    ...installedOptions(tarball, seen),
    importModule: async (url: string) => { imports += 1; return import(url); },
  }, request)), /ENTRYPOINT_ARTIFACT_MISMATCH: artifact bytes changed before import/);
  assert.equal(imports, 0);
  assert.deepEqual(seen, []);
}));
