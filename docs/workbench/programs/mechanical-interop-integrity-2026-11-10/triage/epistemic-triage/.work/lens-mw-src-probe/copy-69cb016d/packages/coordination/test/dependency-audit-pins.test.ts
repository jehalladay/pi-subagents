import { strict as assert } from "node:assert";
import { test } from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { OFFLINE_DETERMINISTIC_MODE, admitOfflineDeterministicRun, auditDependencies } from "../dist/index.js";
import type { DependencyAuditInput, OfflineDeterministicMode } from "../dist/index.js";

// Pins for the landed 4v6o.6 dependency audit and offline deterministic mode (follow-up 6hyf, test-only).
// Each case below names the behaviour of dist/dependency-audit.js it holds; no source change rides with it.

const here = dirname(fileURLToPath(import.meta.url));
const srcDir = join(here, "../src");

const fixtureInput = (overrides: Partial<DependencyAuditInput> = {}): DependencyAuditInput => ({
  workspacePackages: ["@w/core", "@w/rig"],
  toolchain: ["typescript"],
  registry: "https://registry.npmjs.org/",
  forbidden: ["library", "micro-policy"],
  manifests: [
    { path: "package.json", devDependencies: { typescript: "5.9.3" } },
    { path: "packages/core/package.json", name: "@w/core" },
    { path: "apps/rig/package.json", name: "@w/rig", dependencies: { "@w/core": "0.1.0" } },
  ],
  lock: [
    { path: "" },
    { path: "node_modules/@w/core", resolved: "packages/core", link: true },
    { path: "node_modules/typescript", resolved: "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz", dev: true },
  ],
  ...overrides,
});

const withCore = (core: Record<string, unknown>): DependencyAuditInput => fixtureInput({
  manifests: [
    { path: "package.json", devDependencies: { typescript: "5.9.3" } },
    { path: "packages/core/package.json", name: "@w/core", ...core },
    { path: "apps/rig/package.json", name: "@w/rig", dependencies: { "@w/core": "0.1.0" } },
  ],
});

const summary = (refusals: readonly { code: string; name: string }[]): string[] => refusals.map(r => `${r.code}:${r.name}`).sort();

/** Import scan, anchored on statement context so a quoted `from` property key never reads as a specifier: an
 * `import`/`export ... from` clause that starts a line or follows a `;`, `{` or `}` (single or double quotes, multi-line clauses
 * allowed), a side-effect `import "x"`, and a dynamic `import(...)`. */
const IMPORT_CLAUSE = /(?:^|[;{}])[ \t]*(?:import|export)\b[^;"'`]*?\bfrom\s*(["'])([^"'\n]+)\1|(?:^|[;{}])[ \t]*import\s*(["'])([^"'\n]+)\3|\bimport\s*\(\s*(["'])([^"'\n]+)\5/gm;
const importSpecifiers = (source: string): string[] =>
  [...source.matchAll(IMPORT_CLAUSE)].map(match => match[2] ?? match[4] ?? match[6]!);

test("the import scan reads both quote styles, side-effect and dynamic imports and re-exports, and the real core still has only node:crypto as a host module", () => {
  assert.deepEqual(importSpecifiers(`import { a } from "node:fs";`), ["node:fs"]);
  assert.deepEqual(importSpecifiers(`import { a } from 'node:fs';`), ["node:fs"]);
  assert.deepEqual(importSpecifiers(`import "node:os";`), ["node:os"]);
  assert.deepEqual(importSpecifiers(`const f = (): Promise<unknown> => import("node:fs");`), ["node:fs"]);
  assert.deepEqual(importSpecifiers(`export { a } from 'node:net';\nexport * from "./local.js";`), ["node:net", "./local.js"]);
  assert.deepEqual(importSpecifiers(`const text = "no module here";`), []);
  // A quoted `from` property key is not an import clause (6hyf repair: the scan once read ["from", "to"] and edge["from"] as specifiers).
  assert.deepEqual(importSpecifiers(`const keys = ["from", "to"];`), []);
  assert.deepEqual(importSpecifiers(`const ok = !ids.has(edge["from"]) || !ids.has(edge["to"]);`), []);
  assert.deepEqual(importSpecifiers(`const t = \`\${edge["from"]} -> \${edge["to"]}\`;`), []);
  assert.deepEqual(importSpecifiers(`import {\n  a,\n  b\n} from "./multi.js";\nconst keys = ["from", "to"];`), ["./multi.js"]);
  assert.deepEqual(importSpecifiers(`function f() { return 1 } export type { S } from "node:fs";`), ["node:fs"]);
  assert.deepEqual(importSpecifiers(`function f() { return 1 } import "node:fs";`), ["node:fs"]);
  // fwxn: the opening-brace half of the statement anchor is pinned too, in both the from-clause and the side-effect alternatives.
  assert.deepEqual(importSpecifiers(`declare module "m" { export * from "node:fs"; }`), ["node:fs"]);
  assert.deepEqual(importSpecifiers(`declare module "m" { import "node:fs"; }`), ["node:fs"]);
  // 10kv (fwxn follow-up): the semicolon half of the statement anchor is pinned too, in both the from-clause and the side-effect alternatives.
  assert.deepEqual(importSpecifiers(`const a = 1; export { b } from "node:fs";`), ["node:fs"]);
  assert.deepEqual(importSpecifiers(`const a = 1; import "node:fs";`), ["node:fs"]);

  const specifiers = new Set<string>();
  for (const file of readdirSync(srcDir).filter(name => name.endsWith(".ts"))) {
    for (const specifier of importSpecifiers(readFileSync(join(srcDir, file), "utf8"))) if (!specifier.startsWith(".")) specifiers.add(specifier);
  }
  assert.deepEqual([...specifiers].sort(), ["node:crypto"]);
});

test("a bundled dependency is refused in every spelling: an array names each member, true names the wildcard, bundledDependencies counts, false admits, and bundleDependencies wins when both are present", () => {
  const array = auditDependencies(withCore({ bundleDependencies: ["alpha", "beta"] }));
  assert.equal(array.ok, false);
  assert.deepEqual(summary(array.refusals), ["DEPENDENCY_KIND_UNSUPPORTED:alpha", "DEPENDENCY_KIND_UNSUPPORTED:beta"]);
  assert.ok(array.refusals.every(r => r.site === "packages/core/package.json" && r.detail.includes("bundled dependency")));

  const wildcard = auditDependencies(withCore({ bundleDependencies: true }));
  assert.deepEqual(summary(wildcard.refusals), ["DEPENDENCY_KIND_UNSUPPORTED:*"]);

  const spelled = auditDependencies(withCore({ bundledDependencies: ["gamma"] }));
  assert.deepEqual(summary(spelled.refusals), ["DEPENDENCY_KIND_UNSUPPORTED:gamma"]);
  const spelledTrue = auditDependencies(withCore({ bundledDependencies: true }));
  assert.deepEqual(summary(spelledTrue.refusals), ["DEPENDENCY_KIND_UNSUPPORTED:*"]);

  assert.equal(auditDependencies(withCore({ bundleDependencies: false })).ok, true);
  assert.equal(auditDependencies(withCore({ bundledDependencies: false })).ok, true);
  assert.equal(auditDependencies(withCore({ bundleDependencies: false, bundledDependencies: ["delta"] })).ok, true);
  assert.deepEqual(summary(auditDependencies(withCore({ bundleDependencies: ["first"], bundledDependencies: ["second"] })).refusals), ["DEPENDENCY_KIND_UNSUPPORTED:first"]);
});

test("a peer or optional dependency that also carries a forbidden fragment is refused twice, once as forbidden and once as an unsupported kind", () => {
  const peer = auditDependencies(withCore({ peerDependencies: { "micro-policy-peer": "1" } }));
  assert.deepEqual(summary(peer.refusals), ["DEPENDENCY_KIND_UNSUPPORTED:micro-policy-peer", "DEPENDENCY_LIBRARY_FORBIDDEN:micro-policy-peer"]);
  const optional = auditDependencies(withCore({ optionalDependencies: { "library-extra": "1" } }));
  assert.deepEqual(summary(optional.refusals), ["DEPENDENCY_KIND_UNSUPPORTED:library-extra", "DEPENDENCY_LIBRARY_FORBIDDEN:library-extra"]);
  assert.match(peer.refusals.find(r => r.code === "DEPENDENCY_LIBRARY_FORBIDDEN")!.detail, /forbidden fragment "micro-policy"/);
});

test("forbidden names match case-insensitively in both directions, and an empty fragment in the list refuses nothing", () => {
  const upperName = auditDependencies(withCore({ peerDependencies: { "Some-LIBRARY-Kit": "1" } }));
  assert.deepEqual(summary(upperName.refusals), ["DEPENDENCY_KIND_UNSUPPORTED:Some-LIBRARY-Kit", "DEPENDENCY_LIBRARY_FORBIDDEN:Some-LIBRARY-Kit"]);
  const upperFragment = auditDependencies({ ...withCore({ optionalDependencies: { "some-library": "1" } }), forbidden: ["LIBRARY"] });
  assert.ok(summary(upperFragment.refusals).includes("DEPENDENCY_LIBRARY_FORBIDDEN:some-library"));

  const empty = auditDependencies(fixtureInput({ forbidden: [""] }));
  assert.deepEqual(empty.refusals, []);
  assert.equal(empty.ok, true);
  const emptyAmongReal = auditDependencies({ ...withCore({ peerDependencies: { clean: "1" } }), forbidden: ["", "library"] });
  assert.deepEqual(summary(emptyAmongReal.refusals), ["DEPENDENCY_KIND_UNSUPPORTED:clean"]);
});

test("a one-character forbidden fragment is native operator semantics: [\"q\"] refuses jquery and the detail names the fragment, while the empty fragment still refuses nothing (SEAT-RULING-W3-ONE-CHAR-FRAGMENT-1)", () => {
  const oneChar = auditDependencies({ ...withCore({ peerDependencies: { jquery: "3" } }), forbidden: ["q"] });
  const forbidden = oneChar.refusals.filter(r => r.code === "DEPENDENCY_LIBRARY_FORBIDDEN");
  assert.deepEqual(summary(forbidden), ["DEPENDENCY_LIBRARY_FORBIDDEN:jquery"]);
  assert.equal(oneChar.ok, false);
  assert.match(forbidden[0]!.detail, /matches the forbidden fragment "q"/);
  // The length > 0 guard stays pinned beside it: the empty fragment never matches (see the case-insensitivity test above).
  const emptyOnly = auditDependencies({ ...withCore({ peerDependencies: { jquery: "3" } }), forbidden: [""] });
  assert.deepEqual(summary(emptyOnly.refusals.filter(r => r.code === "DEPENDENCY_LIBRARY_FORBIDDEN")), []);
});

test("lock entries: a node_modules entry without a resolved source is untrusted without throwing, the registry must be a prefix, a link needs no source, and a path outside node_modules is not audited", () => {
  const unresolved = auditDependencies(fixtureInput({
    lock: [{ path: "node_modules/ghost", dev: true }],
  }));
  assert.deepEqual(summary(unresolved.refusals), ["DEPENDENCY_LOCK_SOURCE_UNTRUSTED:ghost"]);
  assert.match(unresolved.refusals[0]!.detail, /resolves to nothing rather than the registry/);

  const embedded = auditDependencies(fixtureInput({
    lock: [{ path: "node_modules/sneaky", resolved: "https://evil.example/mirror/https://registry.npmjs.org/sneaky.tgz", dev: true }],
  }));
  assert.deepEqual(summary(embedded.refusals), ["DEPENDENCY_LOCK_SOURCE_UNTRUSTED:sneaky"]);

  const linkNoSource = auditDependencies(fixtureInput({
    lock: [{ path: "node_modules/@w/core", link: true }],
  }));
  assert.deepEqual(linkNoSource.refusals, []);

  const outside = auditDependencies(fixtureInput({
    lock: [{ path: "packages/core" }, { path: "" }, { path: "vendor/thing", resolved: "file:../thing" }],
  }));
  assert.deepEqual(outside.refusals, []);
});

test("a nested lock key names the innermost package, scoped or not", () => {
  const audit = auditDependencies(fixtureInput({
    lock: [
      { path: "node_modules/outer/node_modules/inner", resolved: "git+ssh://host/inner.git", dev: true },
      { path: "node_modules/outer/node_modules/@scope/deep", resolved: "git+ssh://host/deep.git", dev: true },
    ],
  }));
  assert.deepEqual(summary(audit.refusals), ["DEPENDENCY_LOCK_SOURCE_UNTRUSTED:@scope/deep", "DEPENDENCY_LOCK_SOURCE_UNTRUSTED:inner"]);
  assert.deepEqual(audit.refusals.map(r => r.site).sort(), ["node_modules/outer/node_modules/@scope/deep", "node_modules/outer/node_modules/inner"]);
});

test("u0r3 W1: a workspace-nested lock key (not rooted at node_modules/) is audited and names the innermost package", () => {
  const audit = auditDependencies(fixtureInput({
    lock: [{ path: "packages/core/node_modules/left-pad", resolved: "git+https://github.com/x/left-pad.git#abc", dev: true }],
  }));
  assert.deepEqual(summary(audit.refusals), ["DEPENDENCY_LOCK_SOURCE_UNTRUSTED:left-pad"]);
  assert.equal(audit.refusals[0]!.site, "packages/core/node_modules/left-pad");
  assert.equal(audit.ok, false);
  // Control: the same package from the registry as a dev install under the nested key is admitted, so the refusal above comes from the source and not the key shape.
  const clean = auditDependencies(fixtureInput({
    lock: [{ path: "packages/core/node_modules/left-pad", resolved: "https://registry.npmjs.org/left-pad/-/left-pad-1.3.0.tgz", dev: true }],
  }));
  assert.deepEqual(clean.refusals, []);
});

test("0t8j K1: a non-dev registry install under a workspace-nested lock key refuses DEPENDENCY_LOCK_RUNTIME_EXTERNAL at its own site", () => {
  const nested = auditDependencies(fixtureInput({
    lock: [{ path: "packages/core/node_modules/left-pad", resolved: "https://registry.npmjs.org/left-pad/-/left-pad-1.3.0.tgz" }],
  }));
  assert.deepEqual(summary(nested.refusals), ["DEPENDENCY_LOCK_RUNTIME_EXTERNAL:left-pad"]);
  assert.equal(nested.refusals[0]!.site, "packages/core/node_modules/left-pad");
  assert.match(nested.refusals[0]!.detail, /installed for runtime and is not a workspace link/);
  assert.equal(nested.ok, false);
  // Control: the root-rooted key refuses the same way, so the nested refusal above holds the law and not a key-shape quirk.
  const rooted = auditDependencies(fixtureInput({
    lock: [{ path: "node_modules/left-pad", resolved: "https://registry.npmjs.org/left-pad/-/left-pad-1.3.0.tgz" }],
  }));
  assert.deepEqual(summary(rooted.refusals), ["DEPENDENCY_LOCK_RUNTIME_EXTERNAL:left-pad"]);
  // Control: the same nested install flagged dev is admitted, so only the runtime flag drives the refusal.
  const dev = auditDependencies(fixtureInput({
    lock: [{ path: "packages/core/node_modules/left-pad", resolved: "https://registry.npmjs.org/left-pad/-/left-pad-1.3.0.tgz", dev: true }],
  }));
  assert.deepEqual(dev.refusals, []);
});

test("0t8j K2: a workspace link under a workspace-nested lock key is skipped like a rooted link, even with a non-registry source", () => {
  const nestedLink = auditDependencies(fixtureInput({
    lock: [{ path: "packages/core/node_modules/@w/rig", resolved: "apps/rig", link: true }],
  }));
  assert.deepEqual(nestedLink.refusals, []);
  assert.equal(nestedLink.ok, true);
  // Control: the same row without the link flag refuses both the source and the runtime install, so the skip above comes from the link flag.
  const notLink = auditDependencies(fixtureInput({
    lock: [{ path: "packages/core/node_modules/@w/rig", resolved: "apps/rig" }],
  }));
  assert.deepEqual(summary(notLink.refusals), ["DEPENDENCY_LOCK_RUNTIME_EXTERNAL:@w/rig", "DEPENDENCY_LOCK_SOURCE_UNTRUSTED:@w/rig"]);
});

test("u0r3 W2: a custom mode refuses only its own list, so a capability the default list refuses reads as unknown under it", () => {
  const custom: OfflineDeterministicMode = {
    schema: "mw.offline-deterministic-mode.v0",
    requires: ["digest"],
    refuses: ["network"],
    hostModules: [],
  };
  const declaration = { runId: "c:w2", capabilities: ["digest", "clock", "network"], imports: [] };
  const custody = admitOfflineDeterministicRun(declaration, custom);
  assert.deepEqual(custody.refusals.map(r => `${r.code}:${r.subject}`).sort(), ["OFFLINE_CAPABILITY_REFUSED:network", "OFFLINE_CAPABILITY_UNKNOWN:clock"]);
  assert.equal(custody.admitted, false);
  // Control: the default mode refuses clock outright, so the divergence above proves the custom list drives the decision.
  const standard = admitOfflineDeterministicRun({ ...declaration, capabilities: ["pinned-observations", "recorded-effects", "digest", "clock"] });
  assert.deepEqual(standard.refusals.map(r => `${r.code}:${r.subject}`), ["OFFLINE_CAPABILITY_REFUSED:clock"]);
});

test("a custom mode is honoured over the default, and the default mode is frozen at every level", () => {
  const custom: OfflineDeterministicMode = {
    schema: "mw.offline-deterministic-mode.v0",
    requires: ["digest"],
    refuses: ["network"],
    hostModules: ["node:fs"],
  };
  const admitted = admitOfflineDeterministicRun({ runId: "c:1", capabilities: ["digest"], imports: [{ file: "a.ts", specifier: "node:fs" }] }, custom);
  assert.deepEqual(admitted.refusals, []);
  assert.equal(admitted.admitted, true);

  const defaultCapability = admitOfflineDeterministicRun({ runId: "c:2", capabilities: ["digest", "pinned-observations"], imports: [{ file: "a.ts", specifier: "node:crypto" }] }, custom);
  assert.deepEqual(defaultCapability.refusals.map(r => `${r.code}:${r.subject}`).sort(), ["OFFLINE_CAPABILITY_UNKNOWN:pinned-observations", "OFFLINE_HOST_MODULE_OUTSIDE_MODE:a.ts:node:crypto"]);

  const missingCustom = admitOfflineDeterministicRun({ runId: "c:3", capabilities: [], imports: [] }, custom);
  assert.deepEqual(missingCustom.refusals.map(r => `${r.code}:${r.subject}`), ["OFFLINE_CAPABILITY_MISSING:digest"]);

  assert.ok(Object.isFrozen(OFFLINE_DETERMINISTIC_MODE.requires), "requires is frozen");
  assert.ok(Object.isFrozen(OFFLINE_DETERMINISTIC_MODE.refuses), "refuses is frozen");
  assert.ok(Object.isFrozen(OFFLINE_DETERMINISTIC_MODE.hostModules), "hostModules is frozen");
});

test("0gmv W1: a DEPENDENCY_LOCK_RUNTIME_EXTERNAL refusal detail names the dependency, for a rooted, a scoped and a workspace-nested lock key", () => {
  // The registry URL below carries no package name in the detail, so the name can only come from the detail template itself.
  const registryUrl = (name: string): string => `https://registry.npmjs.org/${name}/-/pkg-1.0.0.tgz`;
  const cases: readonly { path: string; name: string }[] = [
    { path: "node_modules/left-pad", name: "left-pad" },
    { path: "node_modules/@scope/deep", name: "@scope/deep" },
    { path: "packages/core/node_modules/right-pad", name: "right-pad" },
  ];
  for (const { path, name } of cases) {
    const audit = auditDependencies(fixtureInput({ lock: [{ path, resolved: registryUrl(name) }] }));
    assert.deepEqual(summary(audit.refusals), [`DEPENDENCY_LOCK_RUNTIME_EXTERNAL:${name}`], path);
    const detail = audit.refusals[0]!.detail;
    assert.ok(detail.startsWith(`${name} `), `${path}: the detail leads with the dependency name, got ${JSON.stringify(detail)}`);
    assert.match(detail, /installed for runtime and is not a workspace link/);
  }
});

test("0gmv W2: a DEPENDENCY_LOCK_SOURCE_UNTRUSTED refusal detail names the dependency, for an unresolved and a non-registry source under a rooted and a nested key", () => {
  const cases: readonly { path: string; name: string; resolved?: string; shows: RegExp }[] = [
    { path: "node_modules/ghost", name: "ghost", shows: /resolves to nothing rather than the registry/ },
    { path: "node_modules/@scope/phantom", name: "@scope/phantom", resolved: "git+ssh://host/x.git", shows: /resolves to git\+ssh:\/\/host\/x\.git rather than the registry/ },
    { path: "packages/core/node_modules/sneaky", name: "sneaky", resolved: "git+ssh://host/y.git", shows: /resolves to git\+ssh:\/\/host\/y\.git rather than the registry/ },
  ];
  for (const { path, name, resolved, shows } of cases) {
    const audit = auditDependencies(fixtureInput({ lock: [{ path, dev: true, ...(resolved === undefined ? {} : { resolved }) }] }));
    assert.deepEqual(summary(audit.refusals), [`DEPENDENCY_LOCK_SOURCE_UNTRUSTED:${name}`], path);
    const detail = audit.refusals[0]!.detail;
    assert.ok(detail.startsWith(`${name} `), `${path}: the detail leads with the dependency name, got ${JSON.stringify(detail)}`);
    assert.match(detail, shows);
  }
});

test("ufbz WB1: a DEPENDENCY_LOCK_RUNTIME_EXTERNAL refusal detail leads with the innermost name under a lock key nested inside node_modules, scoped or not", () => {
  for (const { path, name } of [
    { path: "node_modules/outer/node_modules/inner", name: "inner" },
    { path: "node_modules/outer/node_modules/@scope/deep", name: "@scope/deep" },
  ]) {
    const audit = auditDependencies(fixtureInput({ lock: [{ path, resolved: `https://registry.npmjs.org/${name}/-/pkg-1.0.0.tgz` }] }));
    assert.deepEqual(summary(audit.refusals), [`DEPENDENCY_LOCK_RUNTIME_EXTERNAL:${name}`], path);
    const detail = audit.refusals[0]!.detail;
    assert.ok(detail.startsWith(`${name} `), `${path}: the detail leads with the innermost name, got ${JSON.stringify(detail)}`);
    assert.match(detail, /installed for runtime and is not a workspace link/);
  }
});

test("ufbz WB2: a DEPENDENCY_LOCK_SOURCE_UNTRUSTED refusal detail leads with the innermost name under a lock key nested inside node_modules, scoped or not", () => {
  for (const { path, name } of [
    { path: "node_modules/outer/node_modules/inner", name: "inner" },
    { path: "node_modules/outer/node_modules/@scope/deep", name: "@scope/deep" },
  ]) {
    const audit = auditDependencies(fixtureInput({ lock: [{ path, resolved: "git+ssh://host/z.git", dev: true }] }));
    assert.deepEqual(summary(audit.refusals), [`DEPENDENCY_LOCK_SOURCE_UNTRUSTED:${name}`], path);
    const detail = audit.refusals[0]!.detail;
    assert.ok(detail.startsWith(`${name} `), `${path}: the detail leads with the innermost name, got ${JSON.stringify(detail)}`);
    assert.match(detail, /resolves to git\+ssh:\/\/host\/z\.git rather than the registry/);
  }
});

test("pin W7 matcher drift: the IMPORT_CLAUSE regex equals the package-placement export line for line", () => {
  const clauseLine = (file: string): string | undefined =>
    readFileSync(join(here, file), "utf8").split("\n").map(line => line.replace(/^export /, "")).find(line => line.startsWith("const IMPORT_CLAUSE ="));
  assert.ok(clauseLine("package-placement.test.ts") !== undefined);
  assert.equal(clauseLine("dependency-audit-pins.test.ts"), clauseLine("package-placement.test.ts"));
});
