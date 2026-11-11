import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { invokePinnedDevelopment } from "../dist/entrypoint-host.js";
import { invokeInstalledDevelopment } from "../dist/installed-host.js";
import type { EntrypointDescriptor, PinnedHostOptions } from "../dist/entrypoint-host.js";
import type { Candidate, DevelopmentServices, SubjectBasis } from "@mechanical/workflows-development";

/**
 * Residual negative controls (MechanicalWorkflows-254je.3, EAT-R006 binding order, EAT-R008 installed no-develop export).
 * Existing mutants only lengthen the binding list; none permute or drop a name, so a set-equality weakening of the
 * index comparison stayed green. None builds an installed tarball without a callable develop export either.
 */
const descriptor = JSON.parse(readFileSync(new URL("../../../contracts/entrypoints/development.v1.json", import.meta.url), "utf8")) as EntrypointDescriptor;
const request = { task: "Check order", workspaceId: "repo-A", baseRevision: "base-1" };
const basis: SubjectBasis = { workspaceId: "repo-A", revision: "base-1" };
const candidate: Candidate = { parentBasis: basis, basis: { workspaceId: "repo-A", revision: "candidate-1" } };
const digest = (bytes: Buffer | string) => "sha256:" + createHash("sha256").update(bytes).digest("hex");
function services(seen: string[]): DevelopmentServices {
  return {
    discover: async () => { seen.push("discover"); return { basis, coverage: "complete" as const, files: ["src/a.ts"] }; },
    compileContext: async () => { seen.push("compileContext"); return { basis, text: "task context" }; },
    implement: async () => { seen.push("implement"); return candidate; },
    verify: async () => { seen.push("verify"); return { basis: candidate.basis, verdict: "passed" as const, evidence: { system: "forge", kind: "operation", id: "op-1" } }; },
  };
}
const goodOutcome = { kind: "verified_candidate", candidate, verification: { basis: candidate.basis, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-1" } } };

/** Each row replaces only `bindings`; the four names stay a subset of the committed list or duplicate one of them. */
const mutants: { name: string; bindings: string[] }[] = [
  { name: "swapped pair (implement before compileContext)", bindings: ["discover", "implement", "compileContext", "verify"] },
  { name: "reversed order", bindings: ["verify", "implement", "compileContext", "discover"] },
  { name: "three of four (verify dropped)", bindings: ["discover", "compileContext", "implement"] },
  { name: "duplicate entry replacing a name (same length)", bindings: ["discover", "compileContext", "implement", "implement"] },
  { name: "duplicate entry appended (all four plus one repeat)", bindings: ["discover", "compileContext", "implement", "verify", "verify"] },
];

function artifactFile(): { root: string; path: string; digest: string } {
  const root = mkdtempSync(join(tmpdir(), "mw-binding-order-"));
  const path = join(root, "artifact.tgz");
  writeFileSync(path, "immutable artifact bytes");
  return { root, path, digest: digest(readFileSync(path)) };
}

test("committed descriptor is the only positive row: the unmodified bindings reach the loader and develop once", async () => {
  const a = artifactFile();
  try {
    let loads = 0, calls = 0;
    const out = await invokePinnedDevelopment({
      artifactPath: a.path, artifactDigest: a.digest, descriptor, entrypointId: descriptor.id,
      contractVersion: descriptor.schema, services: services([]),
      load: async () => { loads++; return { develop: async () => { calls++; return goodOutcome; } }; },
    }, request);
    assert.equal(out.kind, "verified_candidate");
    assert.deepEqual([loads, calls], [1, 1]);
    assert.deepEqual([...descriptor.bindings], ["discover", "compileContext", "implement", "verify"]);
  } finally { rmSync(a.root, { recursive: true, force: true }); }
});

test("EAT-R006 pinned host: permuted, dropped or duplicated bindings refuse ENTRYPOINT_BINDING_INVALID with loads=0 and callbacks=0", async () => {
  const a = artifactFile();
  try {
    for (const m of mutants) {
      let loads = 0;
      const seen: string[] = [];
      const options: PinnedHostOptions = {
        artifactPath: a.path, artifactDigest: a.digest, descriptor: { ...descriptor, bindings: m.bindings },
        entrypointId: descriptor.id, contractVersion: descriptor.schema, services: services(seen),
        load: async () => { loads++; throw new Error("must not load"); },
      };
      await assert.rejects(() => invokePinnedDevelopment(options, request), /ENTRYPOINT_BINDING_INVALID/, m.name);
      assert.equal(loads, 0, m.name + ": loader never ran");
      assert.deepEqual(seen, [], m.name + ": no service callback");
    }
  } finally { rmSync(a.root, { recursive: true, force: true }); }
});

test("EAT-R006 installed host: the same binding mutants refuse ENTRYPOINT_BINDING_INVALID before any install or callback", async () => {
  const a = artifactFile();
  try {
    for (const m of mutants) {
      const seen: string[] = [];
      await assert.rejects(() => invokeInstalledDevelopment({
        artifactPath: a.path, artifactDigest: a.digest, descriptor: { ...descriptor, bindings: m.bindings },
        entrypointId: descriptor.id, contractVersion: descriptor.schema, services: services(seen),
      }, request), /ENTRYPOINT_BINDING_INVALID/, m.name);
      assert.deepEqual(seen, [], m.name + ": callbacks=0");
    }
  } finally { rmSync(a.root, { recursive: true, force: true }); }
});

/** Pack a real tarball named like the library whose dist/index.js is `source`; returns its path (inside `root`). */
function packMutant(root: string, label: string, source: string): string {
  const pkg = join(root, "pkg-" + label);
  mkdirSync(join(pkg, "dist"), { recursive: true });
  writeFileSync(join(pkg, "package.json"), JSON.stringify({
    name: "@mechanical/workflows-development", version: "0.0.0-" + label, type: "module",
    main: "./dist/index.js", exports: { ".": { default: "./dist/index.js" } }, files: ["dist"],
  }));
  writeFileSync(join(pkg, "dist", "index.js"), source);
  const out = join(root, "out-" + label);
  mkdirSync(out);
  const packed = spawnSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", out], { cwd: pkg, encoding: "utf8" });
  if (packed.status !== 0) throw new Error("MUTANT_PACK_FAILED: " + packed.stderr);
  const [first] = JSON.parse(packed.stdout) as { filename: string }[];
  if (!first) throw new Error("MUTANT_PACK_FAILED: npm pack reported nothing");
  return join(out, first.filename);
}
const mutantRoot = mkdtempSync(join(tmpdir(), "mw-no-develop-"));
after(() => rmSync(mutantRoot, { recursive: true, force: true }));

for (const arm of [
  { label: "missing", source: "export const other = 1;\n", what: "module exports no develop at all" },
  { label: "notcallable", source: 'export const develop = "not callable";\n', what: "develop export is a string" },
]) {
  test("EAT-R008 installed host: real mutant tarball whose " + arm.what + " refuses at the installed-path literal with callbacks=0", async () => {
    const tarball = packMutant(mutantRoot, arm.label, arm.source);
    const seen: string[] = [];
    await assert.rejects(() => invokeInstalledDevelopment({
      artifactPath: tarball, artifactDigest: digest(readFileSync(tarball)), descriptor,
      entrypointId: descriptor.id, contractVersion: descriptor.schema, services: services(seen),
    }, request), (error: unknown) => {
      assert.ok(error instanceof Error);
      // The installed-host literal, not the pinned-host fall-through "expected develop function".
      assert.match(error.message, /^ENTRYPOINT_EXPORT_INVALID: artifact has no develop export$/);
      assert.doesNotMatch(error.message, /expected develop function/);
      return true;
    });
    assert.deepEqual(seen, [], "no service effect: callbacks=0");
    assert.equal(dirname(tarball).startsWith(mutantRoot), true);
  });
}
