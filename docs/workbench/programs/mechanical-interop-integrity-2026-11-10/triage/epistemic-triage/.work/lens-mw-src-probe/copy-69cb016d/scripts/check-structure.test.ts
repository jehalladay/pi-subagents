import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, cpSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const source = resolve(import.meta.dirname, "..");
function fixture<T>(fn: (root: string) => T): T {
  const root = mkdtempSync(join(tmpdir(), "mw-structure-check-"));
  try {
    for (const file of [
      "forge.toml", "forge.workspace.toml", "package.json", "docs/README.md",
      "contracts/entrypoints/development.v1.json", "packages/development/forge.toml",
      "packages/development/package.json", "packages/coordination/forge.toml",
      "packages/coordination/package.json", "apps/development-rig/forge.toml",
      "apps/development-rig/package.json",
      "qa/integration/installed-consumer.sh", "qa/integration/installed-consumer.ts",
    ]) {
      const dest = join(root, file);
      mkdirSync(resolve(dest, ".."), { recursive: true });
      cpSync(join(source, file), dest);
    }
    cpSync(join(source, "scripts/check-structure.ts"), join(root, "check-structure.ts"));
    return fn(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
function check(root: string) { return spawnSync(process.execPath, [join(root, "check-structure.ts")], { cwd: root, encoding: "utf8", timeout: 30_000 }); }
test("structure gate rejects comments pretending to declare members", () => fixture(root => {
  writeFileSync(join(root, "forge.workspace.toml"), '# library:workflows-development\n# code:development-rig\nname="demo"\n');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /INVALID_WORKSPACE_MEMBERS: exactly three named non-root package members required/);
}));
test("structure gate rejects root registered as its own member", () => fixture(root => {
  const file = join(root, "forge.workspace.toml");
  writeFileSync(file, readFileSync(file, "utf8") + '\n[[packages]]\nref="code:self"\nsource_type="local"\npath="."\n');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /INVALID_WORKSPACE_MEMBERS: exactly three named non-root package members required/);
}));
test("structure gate rejects echo-only fake package test gates", () => fixture(root => {
  const file = join(root, "packages/development/package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  pkg.scripts.test = "echo PASS";
  writeFileSync(file, JSON.stringify(pkg));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /ECHO_ONLY_MEMBER_GATE: packages\/development\/package\.json test/);
}));
test("structure gate accepts the committed three-member workspace", () => fixture(root => {
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("structure gate refuses a string-literal import of an optional provider SDK in gate-typechecked sources", () => fixture(root => {
  mkdirSync(join(root, "qa/adversarial"), { recursive: true });
  writeFileSync(join(root, "qa/adversarial/probe.ts"), "const sdk = await import(\"./local.js\").catch(() => import(" + "\"@forge/sdk\"));\nexport default sdk;\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /OPTIONAL_SDK_LITERAL_IMPORT: .*qa\/adversarial\/probe\.ts:1/);
}));
test("structure gate accepts an optional provider SDK loaded through a non-literal specifier", () => fixture(root => {
  mkdirSync(join(root, "apps/development-rig/src"), { recursive: true });
  writeFileSync(join(root, "apps/development-rig/src/loader.ts"), 'const specifier: string = "@forge/sdk";\nexport const load = () => import(specifier);\n');
  mkdirSync(join(root, "apps/development-rig/node_modules/@forge/sdk"), { recursive: true });
  writeFileSync(join(root, "apps/development-rig/node_modules/@forge/sdk/index.ts"), "import " + "\"@forge/sdk\";\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("structure gate refuses a provider or tool SDK import inside the provider-neutral development library", () => fixture(root => {
  mkdirSync(join(root, "packages/development/src"), { recursive: true });
  writeFileSync(join(root, "packages/development/src/leak.ts"), "import { query } " + "from \"@anthropic-ai/claude-agent-sdk\";\nexport const q = query;\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/development\/src\/leak\.ts:1/);
}));
test("structure gate refuses a provider or tool SDK import inside the provider-neutral coordination library", () => fixture(root => {
  mkdirSync(join(root, "packages/coordination/src"), { recursive: true });
  writeFileSync(join(root, "packages/coordination/src/leak.ts"), "import { ServerConnection } " + "from \"@forge/sdk\";\nexport const c = ServerConnection;\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/coordination\/src\/leak\.ts:1/);
}));
// EAT-R020 / M029 (PIWBA MW-R1): the provider-neutral libraries stay free of the Pi module family
// (@earendil-works/pi-*, @tintinweb/pi-subagents, bare pi-subagents) in every import form the scan covers. The specifier
// strings are assembled from parts so this test file never carries a literal Pi import itself.
const piLeak = (specifier: string) => (root: string, dir: string, body: (spec: string) => string) => {
  mkdirSync(join(root, dir), { recursive: true });
  writeFileSync(join(root, dir, "leak.ts"), body(specifier));
  return check(root);
};
test("structure gate refuses a Pi module import inside the provider-neutral development library", () => {
  for (const specifier of ["@earendil-works/pi-" + "ai", "@earendil-works/pi-" + "coding-agent", "@earendil-works/pi-" + "tui"]) fixture(root => {
    const p = piLeak(specifier)(root, "packages/development/src", spec => "import { x } " + "from \"" + spec + "\";\nexport const y = x;\n");
    assert.notEqual(p.status, 0, specifier);
    assert.match(p.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/development\/src\/leak\.ts:1/, specifier);
  });
});
test("structure gate refuses a Pi subagents import inside the provider-neutral coordination library", () => {
  for (const specifier of ["@tintinweb/pi-" + "subagents", "pi-" + "subagents"]) fixture(root => {
    const p = piLeak(specifier)(root, "packages/coordination/src", spec => "import " + "\"" + spec + "\";\n");
    assert.notEqual(p.status, 0, specifier);
    assert.match(p.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/coordination\/src\/leak\.ts:1/, specifier);
  });
});
test("structure gate refuses a dynamic import() and a require() of a Pi module in the provider-neutral libraries", () => fixture(root => {
  const dynamic = piLeak("@earendil-works/pi-" + "coding-agent")(root, "packages/development/src", spec => "export const m = await import(" + "\"" + spec + "\");\n");
  assert.notEqual(dynamic.status, 0);
  assert.match(dynamic.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/development\/src\/leak\.ts:1/);
  rmSync(join(root, "packages/development/src/leak.ts"));
  const required = piLeak("@tintinweb/pi-" + "subagents")(root, "packages/coordination/src", spec => "const m = require(" + "\"" + spec + "\");\nexport default m;\n");
  assert.notEqual(required.status, 0);
  assert.match(required.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/coordination\/src\/leak\.ts:1/);
}));
test("structure gate accepts a Pi module import at the rig's provider edge", () => fixture(root => {
  mkdirSync(join(root, "apps/development-rig/src"), { recursive: true });
  writeFileSync(join(root, "apps/development-rig/src/pi-edge.ts"), "import " + "\"@earendil-works/pi-" + "tui\";\n");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("structure gate does not mistake an unrelated pi-prefixed package or a comment for a Pi module import", () => fixture(root => {
  mkdirSync(join(root, "packages/development/src"), { recursive: true });
  writeFileSync(join(root, "packages/development/src/near.ts"), "import { pi } " + "from \"pizza-pi-mono\";\nexport const n = pi;\n");
  const p = check(root);
  // The provider scan stays quiet; the closed development census (MechanicalWorkflows-fwexf.2) now names the bare package instead.
  assert.doesNotMatch(p.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN/);
  assert.match(p.stderr, /DEVELOPMENT_IO_IMPORT_FORBIDDEN: .*packages\/development\/src\/near\.ts:1 \(pizza-pi-mono\)/);
}));
// PIWBA MW-R7 EAT-R104: the coordination library is a pure package, so its whole src tree is census-checked against a
// closed specifier allowlist (relative modules plus node:crypto) and its manifest declares no runtime dependency scope.
// Each arm below mutates one fixture file; the control arms prove the committed tree and the sanctioned spellings stay green.
function coordinationLeak(root: string, body: string, name = "leak.ts") {
  mkdirSync(join(root, "packages/coordination/src"), { recursive: true });
  writeFileSync(join(root, "packages/coordination/src", name), body);
}
test("structure gate accepts the committed coordination source tree, node:crypto and relative specifiers (control arm)", () => fixture(root => {
  cpSync(join(source, "packages/coordination/src"), join(root, "packages/coordination/src"), { recursive: true });
  coordinationLeak(root, 'import { createHash } from "node:crypto";\nimport { x } from "./canonical.js";\nimport type { Y } from "../y.js";\nexport { z } from "./z.js";\nexport const h = createHash;\nexport const d = () => import("./lazy.js");\n', "ok.ts");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("structure gate refuses a node:fs import inside the pure coordination library by file and line", () => fixture(root => {
  coordinationLeak(root, 'import { readFileSync } from "node:fs";\nexport const r = readFileSync;\n');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /COORDINATION_IO_IMPORT_FORBIDDEN: .*packages\/coordination\/src\/leak\.ts:1 \(node:fs\)/);
}));
test("structure gate refuses every dynamic, require, re-export, side-effect and multi-line spelling of a Node builtin in the coordination library", () => {
  const spellings: Array<[string, string, string]> = [
    ['dynamic import', 'export const c = () => import("node:child_process");\n', "node:child_process"],
    ['dynamic import after a line', 'const a = 1;\nexport const c = async () => await import(\'node:net\');\nexport { a };\n', "node:net"],
    ["require", 'declare const require: (s: string) => unknown;\nexport const h = require("node:http");\n', "node:http"],
    ["re-export", 'export * from "node:https";\n', "node:https"],
    ["side-effect import", 'import "node:dgram";\n', "node:dgram"],
    ["multi-line named import", 'import {\n  tmpdir,\n} from "node:os";\nexport { tmpdir };\n', "node:os"],
    ["un-prefixed builtin", 'import fs from "fs";\nexport default fs;\n', "fs"],
    ["un-prefixed child_process", "import cp = require('child_process');\nexport default cp;\n", "child_process"],
    ["worker_threads", 'import { Worker } from "node:worker_threads";\nexport { Worker };\n', "node:worker_threads"],
    ["node:process", 'import process from "node:process";\nexport default process;\n', "node:process"],
    ["node:tls", 'import tls from "node:tls";\nexport default tls;\n', "node:tls"],
    ["bare package", 'import pad from "left-pad";\nexport default pad;\n', "left-pad"],
    ["node:crypto subpath variant", 'import { webcrypto } from "node:crypto/webcrypto";\nexport { webcrypto };\n', "node:crypto/webcrypto"],
  ];
  for (const [label, body, specifier] of spellings) fixture(root => {
    coordinationLeak(root, body);
    const p = check(root);
    assert.notEqual(p.status, 0, label);
    assert.match(p.stderr, new RegExp("COORDINATION_IO_IMPORT_FORBIDDEN: .*packages/coordination/src/leak\\.ts:\\d+ \\(" + specifier.replace(/[./]/g, "\\$&") + "\\)"), label);
  });
});
test("structure gate refuses a Node builtin whose specifier starts on a later line than its from, import( or require( keyword", () => {
  const spellings: Array<[string, string, string, number]> = [
    ["from then newline", 'import { readFileSync } from\n  "node:fs";\nexport const leak = readFileSync;\n', "node:fs", 2],
    ["from then blank line", 'import fs from\n\n  \'node:child_process\';\nexport default fs;\n', "node:child_process", 3],
    ["re-export from then newline", 'export * from\r\n"node:https";\n', "node:https", 2],
    ["side-effect import then newline", 'import\n"node:dgram";\n', "node:dgram", 2],
    ["dynamic import( then newline", 'export const c = () => import(\n  "node:net");\n', "node:net", 2],
    ["require( then newline", 'declare const require: (s: string) => unknown;\nexport const h = require(\n  "node:http");\n', "node:http", 3],
  ];
  for (const [label, body, specifier, line] of spellings) fixture(root => {
    coordinationLeak(root, body);
    const p = check(root);
    assert.notEqual(p.status, 0, label);
    assert.match(p.stderr, new RegExp("COORDINATION_IO_IMPORT_FORBIDDEN: .*packages/coordination/src/leak\\.ts:" + line + " \\(" + specifier.replace(/[./]/g, "\\$&") + "\\)"), label);
  });
});
test("structure gate refuses a non-literal dynamic import whose argument starts on a later line, and accepts a relative specifier split across lines (control arm)", () => {
  fixture(root => {
    coordinationLeak(root, 'export const c = (s: string) => import(\n  s);\n');
    const p = check(root);
    assert.notEqual(p.status, 0);
    assert.match(p.stderr, /COORDINATION_IO_IMPORT_FORBIDDEN: .*packages\/coordination\/src\/leak\.ts:1 \(non-literal specifier\)/);
  });
  fixture(root => {
    cpSync(join(source, "packages/coordination/src"), join(root, "packages/coordination/src"), { recursive: true });
    coordinationLeak(root, 'import { x } from\n  "./canonical.js";\nimport { createHash } from\n  "node:crypto";\nexport const lazy = () => import(\n  "./lazy.js");\nexport { x, createHash };\n', "split-ok.ts");
    const p = check(root);
    assert.equal(p.status, 0, p.stderr);
  });
});
test("structure gate refuses a dynamic import or require with a non-literal specifier inside the coordination library", () => {
  for (const body of ['export const c = (s: string) => import(s);\n', 'declare const require: (s: string) => unknown;\nexport const c = (s: string) => require(s);\n']) fixture(root => {
    coordinationLeak(root, body);
    const p = check(root);
    assert.notEqual(p.status, 0, body);
    assert.match(p.stderr, /COORDINATION_IO_IMPORT_FORBIDDEN: .*packages\/coordination\/src\/leak\.ts:\d+ \(non-literal specifier\)/);
  });
});
test("structure gate reads the coordination census past comments, in nested directories, and leaves a commented-out import alone", () => fixture(root => {
  mkdirSync(join(root, "packages/coordination/src/sub"), { recursive: true });
  writeFileSync(join(root, "packages/coordination/src/sub/nested.ts"), '// import { x } from "node:fs";\n/* import { y } from "node:net";\n   import "node:http"; */\nexport const n = 1;\n');
  assert.equal(check(root).status, 0, "comments must not read as imports");
  writeFileSync(join(root, "packages/coordination/src/sub/nested.ts"), '/* note */\nimport { z } from "node:zlib";\nexport { z };\n');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /COORDINATION_IO_IMPORT_FORBIDDEN: .*packages\/coordination\/src\/sub\/nested\.ts:2 \(node:zlib\)/);
}));
test("structure gate refuses a runtime dependency scope declared by the pure coordination package", () => {
  for (const scope of ["dependencies", "peerDependencies", "optionalDependencies"]) fixture(root => {
    const file = join(root, "packages/coordination/package.json");
    const pkg = JSON.parse(readFileSync(file, "utf8"));
    pkg[scope] = { "left-pad": "1.3.0" };
    writeFileSync(file, JSON.stringify(pkg));
    const p = check(root);
    assert.notEqual(p.status, 0, scope);
    assert.match(p.stderr, new RegExp("COORDINATION_RUNTIME_DEPENDENCY_FORBIDDEN: packages/coordination/package\\.json " + scope + " left-pad"), scope);
  });
});
test("structure gate lets the pure coordination package keep empty dependency scopes and a devDependencies entry", () => fixture(root => {
  const file = join(root, "packages/coordination/package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  pkg.dependencies = {};
  pkg.devDependencies = { typescript: "5.0.0" };
  writeFileSync(file, JSON.stringify(pkg));
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
// PIWBA cross-cutting EAT-R046 + EAT-R124 library leg (MechanicalWorkflows-fwexf.2): the development library carries the same
// whole-tree closed-specifier census as the pure coordination library, with an EMPTY allowlist (relative modules only), so a
// node:fs / node:child_process import (the only route by which a data-loss cleanup path could enter the library) cannot enter
// unnoticed. The census cannot see a Pi destructive-cleanup call by name; it removes the I/O capability it would need.
function developmentLeak(root: string, body: string, name = "leak.ts") {
  mkdirSync(join(root, "packages/development/src"), { recursive: true });
  writeFileSync(join(root, "packages/development/src", name), body);
}
const escapeSpecifier = (specifier: string) => specifier.replace(/[./]/g, "\\$&");
test("structure gate accepts the committed development source tree and relative or type-only specifiers (control arm)", () => fixture(root => {
  cpSync(join(source, "packages/development/src"), join(root, "packages/development/src"), { recursive: true });
  developmentLeak(root, 'import { x } from "./contracts.js";\nimport type { Y } from "../y.js";\nexport { z } from "./z.js";\nexport type { W } from "./w.js";\nexport const d = () => import("./lazy.js");\n', "ok.ts");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("structure gate refuses a node:fs import inside the development library by file, line and specifier", () => fixture(root => {
  developmentLeak(root, '// header\nimport { rmSync } from "node:fs";\nexport const r = rmSync;\n');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /DEVELOPMENT_IO_IMPORT_FORBIDDEN: .*packages\/development\/src\/leak\.ts:2 \(node:fs\)/);
}));
test("structure gate refuses every dynamic, require, re-export, side-effect, multi-line and bare spelling of a builtin or package in the development library", () => {
  const spellings: Array<[string, string, string]> = [
    ["dynamic import", 'export const c = () => import("node:child_process");\n', "node:child_process"],
    ["require", 'declare const require: (s: string) => unknown;\nexport const h = require(\'child_process\');\n', "child_process"],
    ["re-export", 'export * from "node:os";\n', "node:os"],
    ["side-effect import", 'import "node:dgram";\n', "node:dgram"],
    ["multi-line named import", 'import {\n  rm,\n} from "node:fs/promises";\nexport { rm };\n', "node:fs/promises"],
    ["un-prefixed builtin", 'import fs from "fs";\nexport default fs;\n', "fs"],
    ["node:crypto stays outside the empty allowlist", 'import { createHash } from "node:crypto";\nexport { createHash };\n', "node:crypto"],
    ["bare third-party package", 'import pad from "left-pad";\nexport default pad;\n', "left-pad"],
  ];
  for (const [label, body, specifier] of spellings) fixture(root => {
    developmentLeak(root, body);
    const p = check(root);
    assert.notEqual(p.status, 0, label);
    assert.match(p.stderr, new RegExp("DEVELOPMENT_IO_IMPORT_FORBIDDEN: .*packages/development/src/leak\\.ts:\\d+ \\(" + escapeSpecifier(specifier) + "\\)"), label);
  });
});
test("structure gate refuses a non-literal dynamic import or require in the development library and reads past comments and nesting", () => {
  for (const body of ['export const c = (s: string) => import(s);\n', 'declare const require: (s: string) => unknown;\nexport const c = (s: string) => require(s);\n']) fixture(root => {
    developmentLeak(root, body);
    const p = check(root);
    assert.notEqual(p.status, 0, body);
    assert.match(p.stderr, /DEVELOPMENT_IO_IMPORT_FORBIDDEN: .*packages\/development\/src\/leak\.ts:\d+ \(non-literal specifier\)/);
  });
  fixture(root => {
    mkdirSync(join(root, "packages/development/src/sub"), { recursive: true });
    writeFileSync(join(root, "packages/development/src/sub/nested.ts"), '// import { x } from "node:fs";\n/* import "node:net"; */\nexport const n = 1;\n');
    assert.equal(check(root).status, 0, "comments must not read as imports");
    writeFileSync(join(root, "packages/development/src/sub/nested.ts"), '/* note */\nimport { z } from "node:zlib";\nexport { z };\n');
    const p = check(root);
    assert.notEqual(p.status, 0);
    assert.match(p.stderr, /DEVELOPMENT_IO_IMPORT_FORBIDDEN: .*packages\/development\/src\/sub\/nested\.ts:2 \(node:zlib\)/);
  });
});
test("structure gate refuses a runtime dependency scope declared by the development library manifest", () => {
  for (const scope of ["dependencies", "peerDependencies", "optionalDependencies"]) fixture(root => {
    const file = join(root, "packages/development/package.json");
    const pkg = JSON.parse(readFileSync(file, "utf8"));
    pkg[scope] = { "left-pad": "1.3.0" };
    writeFileSync(file, JSON.stringify(pkg));
    const p = check(root);
    assert.notEqual(p.status, 0, scope);
    assert.match(p.stderr, new RegExp("DEVELOPMENT_RUNTIME_DEPENDENCY_FORBIDDEN: packages/development/package\\.json " + scope + " left-pad"), scope);
  });
});
test("structure gate lets the development library keep empty dependency scopes and a devDependencies entry", () => fixture(root => {
  const file = join(root, "packages/development/package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  pkg.dependencies = {};
  pkg.devDependencies = { typescript: "5.0.0" };
  writeFileSync(file, JSON.stringify(pkg));
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("structure gate keeps the coordination census output unchanged beside the development census", () => fixture(root => {
  coordinationLeak(root, 'import { readFileSync } from "node:fs";\nexport const r = readFileSync;\n');
  developmentLeak(root, 'import { rmSync } from "node:fs";\nexport const r = rmSync;\n');
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /COORDINATION_IO_IMPORT_FORBIDDEN: .*packages\/coordination\/src\/leak\.ts:1 \(node:fs\) \(the pure coordination library may import only relative modules and node:crypto\)/);
  assert.doesNotMatch(p.stderr, /DEVELOPMENT_IO_IMPORT_FORBIDDEN/);
}));
test("structure gate accepts a provider SDK import at the rig's provider edge", () => fixture(root => {
  mkdirSync(join(root, "apps/development-rig/src"), { recursive: true });
  writeFileSync(join(root, "apps/development-rig/src/edge.ts"), 'const specifier: string = "@anthropic-ai/claude-agent-sdk";\nexport const load = () => import(specifier);\n');
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));

// Refusal codes that guard MW-006/MW-007/MW-008: each control mutates one committed fixture file and pins the exact reason,
// so a fixture mishap that merely exits nonzero cannot pass for the intended refusal.
test("structure gate refuses a missing required file by name", () => fixture(root => {
  rmSync(join(root, "docs/README.md"));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /MISSING_REQUIRED_FILE: docs\/README\.md/);
}));
test("structure gate refuses a package member that lacks a build or test script", () => {
  for (const missing of ["build", "test"]) fixture(root => {
    const file = join(root, "apps/development-rig/package.json");
    const pkg = JSON.parse(readFileSync(file, "utf8"));
    delete pkg.scripts[missing];
    writeFileSync(file, JSON.stringify(pkg));
    const p = check(root);
    assert.notEqual(p.status, 0, missing);
    assert.match(p.stderr, /MISSING_MEMBER_GATE: apps\/development-rig\/package\.json/, missing);
  });
});
test("structure gate refuses Library as a declared dependency in every dependency scope", () => {
  for (const scope of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) fixture(root => {
    const file = join(root, "packages/development/package.json");
    const pkg = JSON.parse(readFileSync(file, "utf8"));
    pkg[scope] = { ...(pkg[scope] ?? {}), "@mechanical/library-client": "1.0.0" };
    writeFileSync(file, JSON.stringify(pkg));
    const p = check(root);
    assert.notEqual(p.status, 0, scope);
    assert.match(p.stderr, new RegExp(`LIBRARY_DEPENDENCY_FORBIDDEN: packages/development/package\\.json ${scope} @mechanical/library-client`), scope);
  });
});
test("structure gate refuses Library hidden in a dependency version specifier", () => fixture(root => {
  const file = join(root, "apps/development-rig/package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  pkg.dependencies = { ...(pkg.dependencies ?? {}), "innocuous-name": "file:../../Library" };
  writeFileSync(file, JSON.stringify(pkg));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /LIBRARY_DEPENDENCY_FORBIDDEN: apps\/development-rig\/package\.json dependencies innocuous-name/);
}));
test("structure gate refuses Library declared as a Forge manifest member or reference", () => {
  for (const [file, ref] of [["packages/development/forge.toml", "library"], ["apps/development-rig/forge.toml", "../library"]]) fixture(root => {
    const target = join(root, file as string);
    writeFileSync(target, readFileSync(target, "utf8") + `\n[[packages]]\nref = "${ref}"\nsource_type = "local"\n`);
    const p = check(root);
    assert.notEqual(p.status, 0, file);
    assert.match(p.stderr, new RegExp(`LIBRARY_MEMBER_FORBIDDEN: ${(file as string).replace(/[/.]/g, "\\$&")}`), file);
  });
});
for (const script of ["build", "test"] as const) {
  for (const name of ["@mechanical/workflows-development", "@mechanical/workflows-coordination", "@mechanical/development-rig"]) {
    test(`structure gate refuses a root ${script} script that drops the --workspace ${name} leg`, () => fixture(root => {
      const file = join(root, "package.json");
      const pkg = JSON.parse(readFileSync(file, "utf8"));
      const leg = `npm run ${script} --workspace ${name}`;
      const segments: string[] = pkg.scripts[script].split(" && ");
      assert.equal(segments.filter(segment => segment === leg).length, 1, `fixture precondition: root ${script} names ${name} exactly once`);
      pkg.scripts[script] = segments.filter(segment => segment !== leg).join(" && ");
      writeFileSync(file, JSON.stringify(pkg));
      const p = check(root);
      assert.notEqual(p.status, 0);
      assert.match(p.stderr, new RegExp(`MISSING_ROOT_WORKSPACE_LEG: package\\.json scripts\\.${script} lacks --workspace ${name.replace(/[/@.-]/g, "\\$&")}`));
    }));
  }
}
test("structure gate does not accept a workspace name that only prefixes another member's name", () => fixture(root => {
  const file = join(root, "package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  pkg.scripts.build = pkg.scripts.build.replace("--workspace @mechanical/development-rig", "--workspace @mechanical/development-rig-extra");
  writeFileSync(file, JSON.stringify(pkg));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /MISSING_ROOT_WORKSPACE_LEG: package\.json scripts\.build lacks --workspace @mechanical\/development-rig/);
}));
test("structure gate refuses a root test script that drops the node --test scripts leg", () => fixture(root => {
  const file = join(root, "package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  const leg = "node --test scripts/*.test.ts";
  const segments: string[] = pkg.scripts.test.split(" && ");
  assert.equal(segments.filter(segment => segment === leg).length, 1, "fixture precondition: root test names the scripts leg exactly once");
  pkg.scripts.test = segments.filter(segment => segment !== leg).join(" && ");
  writeFileSync(file, JSON.stringify(pkg));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /MISSING_ROOT_SCRIPTS_LEG: package\.json scripts\.test lacks node --test scripts\/\*\.test\.ts/);
}));
test("structure gate does not accept the scripts leg when it only appears inside another command", () => fixture(root => {
  const file = join(root, "package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  pkg.scripts.test = pkg.scripts.test.replace("node --test scripts/*.test.ts", "echo node --test scripts/*.test.ts");
  writeFileSync(file, JSON.stringify(pkg));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /MISSING_ROOT_SCRIPTS_LEG: package\.json scripts\.test lacks node --test scripts\/\*\.test\.ts/);
}));
test("structure gate refuses a root test script that drops the node scripts/check-tap-plan.ts leg", () => fixture(root => {
  const file = join(root, "package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  const leg = "node scripts/check-tap-plan.ts";
  const segments: string[] = pkg.scripts.test.split(" && ");
  assert.equal(segments.filter(segment => segment === leg).length, 1, "fixture precondition: root test names the TAP plan leg exactly once");
  pkg.scripts.test = segments.filter(segment => segment !== leg).join(" && ");
  writeFileSync(file, JSON.stringify(pkg));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /MISSING_ROOT_TAP_PLAN_LEG: package\.json scripts\.test lacks node scripts\/check-tap-plan\.ts/);
}));
test("structure gate does not accept the TAP plan leg when it only appears inside another command", () => fixture(root => {
  const file = join(root, "package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  pkg.scripts.test = pkg.scripts.test.replace("node scripts/check-tap-plan.ts", "echo node scripts/check-tap-plan.ts");
  writeFileSync(file, JSON.stringify(pkg));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /MISSING_ROOT_TAP_PLAN_LEG: package\.json scripts\.test lacks node scripts\/check-tap-plan\.ts/);
}));
const tapLeg = "node scripts/check-tap-plan.ts";
function editTestLegs(root: string, edit: (pkg: { scripts: Record<string, string> }, segments: string[]) => void) {
  const file = join(root, "package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  const segments: string[] = pkg.scripts.test.split(" && ");
  assert.equal(segments.filter(segment => segment === tapLeg).length, 1, "fixture precondition: root test names the TAP plan leg exactly once");
  edit(pkg, segments);
  writeFileSync(file, JSON.stringify(pkg));
}
test("structure gate refuses a TAP plan leg neutered by || true", () => fixture(root => {
  editTestLegs(root, (pkg, segments) => { pkg.scripts.test = segments.map(segment => segment === tapLeg ? `${tapLeg} || true` : segment).join(" && "); });
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /MISSING_ROOT_TAP_PLAN_LEG: package\.json scripts\.test lacks node scripts\/check-tap-plan\.ts/);
}));
test("structure gate refuses a TAP plan leg narrowed to one explicit test file", () => fixture(root => {
  editTestLegs(root, (pkg, segments) => { pkg.scripts.test = segments.map(segment => segment === tapLeg ? `${tapLeg} scripts/check-structure.test.ts` : segment).join(" && "); });
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /MISSING_ROOT_TAP_PLAN_LEG: package\.json scripts\.test lacks node scripts\/check-tap-plan\.ts/);
}));
test("structure gate refuses a TAP plan leg moved out of scripts.test into another root script", () => fixture(root => {
  editTestLegs(root, (pkg, segments) => { pkg.scripts.test = segments.filter(segment => segment !== tapLeg).join(" && "); pkg.scripts["tap-plan"] = tapLeg; });
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /MISSING_ROOT_TAP_PLAN_LEG: package\.json scripts\.test lacks node scripts\/check-tap-plan\.ts/);
}));
// MechanicalWorkflows-5p8u: the whole-segment rule above only asks whether the exact leg appears as SOME `&&`-separated
// segment, so a spelling that keeps `node scripts/check-tap-plan.ts` as its own segment passes while the shell never runs
// it (G5-G8) or never lets its exit status gate (G1-G4). Every segment of scripts.test must be a known leg.
const unknownSegmentSpellings: ReadonlyArray<readonly [string, string, (segments: string[]) => string]> = [
  ["G1 && true || true tail", "true || true", segments => `${segments.join(" && ")} && true || true`],
  ["G2 && true; true tail", "true; true", segments => `${segments.join(" && ")} && true; true`],
  ["G3 && true<newline>exit 0 tail", "true\nexit 0", segments => `${segments.join(" && ")} && true\nexit 0`],
  ["G4 && true & wait tail", "true & wait", segments => `${segments.join(" && ")} && true & wait`],
  ["G5 echo # comment segment", "echo #", segments => segments.map(segment => segment === tapLeg ? `echo # && ${tapLeg}` : segment).join(" && ")],
  ["G6 leg quoted inside echo", "echo 'x", segments => segments.map(segment => segment === tapLeg ? `echo 'x && ${tapLeg} && y'` : segment).join(" && ")],
  ["G7 node() { :; } function shadow", "node() { :; }", segments => segments.map(segment => segment === tapLeg ? `node() { :; } && ${tapLeg}` : segment).join(" && ")],
  ["G8 exit 0 head", "exit 0", segments => ["exit 0", ...segments].join(" && ")],
];
for (const [label, offending, build] of unknownSegmentSpellings) {
  test(`structure gate refuses a root test script with an unknown segment (${label})`, () => fixture(root => {
    editTestLegs(root, (pkg, segments) => { pkg.scripts.test = build(segments); });
    const p = check(root);
    assert.notEqual(p.status, 0);
    assert.ok(p.stderr.includes(`UNKNOWN_ROOT_TEST_SEGMENT: package.json scripts.test segment ${JSON.stringify(offending)} is not a known leg`), p.stderr);
  }));
}
test("structure gate still accepts the committed root test script (every segment a known leg)", () => fixture(root => {
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
for (const member of ["packages/development", "packages/coordination", "apps/development-rig"]) {
  for (const [label, edit] of [
    ["lacks a name", (pkg: Record<string, unknown>) => { delete pkg.name; }],
    ["names the package with the number 42", (pkg: Record<string, unknown>) => { pkg.name = 42; }],
    ["names the package with null", (pkg: Record<string, unknown>) => { pkg.name = null; }],
  ] as const) {
    test(`structure gate refuses ${member}/package.json that ${label} by MISSING_MEMBER_NAME with that member's exact path`, () => fixture(root => {
      const file = join(root, member, "package.json");
      const pkg = JSON.parse(readFileSync(file, "utf8"));
      assert.equal(typeof pkg.name, "string", "fixture precondition: the committed member names itself with a string");
      edit(pkg);
      writeFileSync(file, JSON.stringify(pkg));
      const p = check(root);
      assert.notEqual(p.status, 0);
      assert.match(p.stderr, new RegExp(`MISSING_MEMBER_NAME: ${member.replace(/[/.]/g, "\\$&")}/package\\.json`));
      // The fall-through refusal ("lacks --workspace undefined") must not stand in for the intended code.
      assert.doesNotMatch(p.stderr, /MISSING_ROOT_WORKSPACE_LEG/);
    }));
  }
}
test("structure gate refuses a Library member ref with a trailing slash or a subpath, in any case", () => fixture(root => {
  for (const ref of ["../library/", "../Library/", "../library/dist", "code:library", "local:../Library"]) {
    const file = join(root, "packages/coordination/forge.toml");
    const original = readFileSync(file, "utf8");
    writeFileSync(file, original + '\n[[packages]]\nref = "' + ref + '"\nsource_type = "local"\n');
    const p = check(root);
    assert.notEqual(p.status, 0, `ref ${ref} escaped the member ban`);
    assert.match(p.stderr, /LIBRARY_MEMBER_FORBIDDEN: packages\/coordination\/forge\.toml/);
    writeFileSync(file, original);
  }
}));
test("structure gate keeps accepting the library: ref scheme of the committed members and a non-library relative ref", () => fixture(root => {
  const file = join(root, "packages/coordination/forge.toml");
  writeFileSync(file, readFileSync(file, "utf8") + '\n[[packages]]\nref = "../development"\nsource_type = "local"\n');
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("structure gate refuses Library reached through npm overrides, resolutions and bundle(d)Dependencies", () => fixture(root => {
  const file = join(root, "packages/development/package.json");
  const original = readFileSync(file, "utf8");
  const shapes: ReadonlyArray<[string, Record<string, unknown>]> = [
    ["overrides file: value", { overrides: { "innocuous-name": "file:../../Library" } }],
    ["nested overrides value", { overrides: { outer: { ".": "file:../../library" } } }],
    ["resolutions value", { resolutions: { "innocuous-name": "link:../../Library" } }],
    ["bundledDependencies name", { bundledDependencies: ["workflows-library"] }],
    ["bundleDependencies name", { bundleDependencies: ["Library"] }],
    ["overrides key", { overrides: { Library: "1.0.0" } }],
    ["resolutions key", { resolutions: { "workflows-library": "1.0.0" } }],
  ];
  for (const [label, extra] of shapes) {
    const pkg = JSON.parse(original);
    Object.assign(pkg, extra);
    writeFileSync(file, JSON.stringify(pkg));
    const p = check(root);
    assert.notEqual(p.status, 0, `${label} escaped the dependency ban`);
    assert.match(p.stderr, /LIBRARY_DEPENDENCY_FORBIDDEN: packages\/development\/package\.json/);
    writeFileSync(file, original);
  }
}));
test("structure gate accepts overrides, resolutions and bundledDependencies that do not reach Library", () => fixture(root => {
  const file = join(root, "packages/development/package.json");
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  pkg.overrides = { "left-pad": "1.3.0", outer: { ".": "2.0.0" } };
  pkg.resolutions = { "left-pad": "1.3.0" };
  pkg.bundledDependencies = [];
  writeFileSync(file, JSON.stringify(pkg));
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));

// Per-member controls for the checker's list-membership refusals (MechanicalWorkflows-bntv). The cases above pin one
// member of each list, so a mutant that drops any other list entry kept every test green. Each row below mutates one
// committed fixture file and pins the exact refusal code AND that member's path.
const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const requiredFiles = [
  "forge.toml", "forge.workspace.toml", "package.json",
  "packages/development/forge.toml", "packages/development/package.json",
  "packages/coordination/forge.toml", "packages/coordination/package.json",
  "apps/development-rig/forge.toml", "apps/development-rig/package.json",
  "docs/README.md", "contracts/entrypoints/development.v1.json",
] as const;
const memberDirs = ["packages/development", "packages/coordination", "apps/development-rig"] as const;
const manifestFiles = [
  "forge.toml", "forge.workspace.toml",
  "packages/development/forge.toml", "packages/coordination/forge.toml", "apps/development-rig/forge.toml",
] as const;
for (const path of requiredFiles) {
  test(`structure gate refuses the missing required file ${path} by MISSING_REQUIRED_FILE naming that path`, () => fixture(root => {
    rmSync(join(root, path));
    const p = check(root);
    assert.notEqual(p.status, 0);
    assert.match(p.stderr, new RegExp(`MISSING_REQUIRED_FILE: ${escapeRegExp(path)}`));
  }));
}
for (const member of memberDirs) {
  for (const step of ["build", "test"] as const) {
    test(`structure gate refuses ${member}/package.json without a ${step} script by MISSING_MEMBER_GATE naming that member`, () => fixture(root => {
      const file = join(root, member, "package.json");
      const pkg = JSON.parse(readFileSync(file, "utf8"));
      assert.equal(typeof pkg.scripts[step], "string", `fixture precondition: ${member} declares a ${step} script`);
      delete pkg.scripts[step];
      writeFileSync(file, JSON.stringify(pkg));
      const p = check(root);
      assert.notEqual(p.status, 0);
      assert.match(p.stderr, new RegExp(`MISSING_MEMBER_GATE: ${escapeRegExp(member)}/package\\.json`));
    }));
    test(`structure gate refuses an echo-only ${step} script in ${member}/package.json by ECHO_ONLY_MEMBER_GATE naming that member and step`, () => fixture(root => {
      const file = join(root, member, "package.json");
      const pkg = JSON.parse(readFileSync(file, "utf8"));
      pkg.scripts[step] = "echo PASS";
      writeFileSync(file, JSON.stringify(pkg));
      const p = check(root);
      assert.notEqual(p.status, 0);
      assert.match(p.stderr, new RegExp(`ECHO_ONLY_MEMBER_GATE: ${escapeRegExp(member)}/package\\.json ${step}`));
    }));
  }
}
// Echo-only spellings beyond `echo` (MechanicalWorkflows-99n6, bntv follow-up). The checker refuses a member script that
// starts with echo, true, `:` or exit 0; the rows above write only `echo PASS`, so dropping the true, `:` or `exit 0`
// alternative kept every test green. Each spelling lands in a different member and step so a mutant that drops one
// alternative fails exactly its row, and a leading-whitespace twin pins the `^\s*` prefix.
const echoOnlySpellings = [
  { name: "true", member: "packages/coordination", step: "build" },
  { name: ":", member: "apps/development-rig", step: "test" },
  { name: "exit 0", member: "packages/development", step: "build" },
] as const;
for (const { name, member, step } of echoOnlySpellings) {
  for (const prefix of ["", "  "]) {
    const spelling = `${prefix}${name}`;
    test(`structure gate refuses the echo-only spelling ${JSON.stringify(spelling)} as ${member}/package.json ${step} by ECHO_ONLY_MEMBER_GATE naming that member and step`, () => fixture(root => {
      const file = join(root, member, "package.json");
      const pkg = JSON.parse(readFileSync(file, "utf8"));
      pkg.scripts[step] = spelling;
      writeFileSync(file, JSON.stringify(pkg));
      const p = check(root);
      assert.notEqual(p.status, 0);
      assert.match(p.stderr, new RegExp(`ECHO_ONLY_MEMBER_GATE: ${escapeRegExp(member)}/package\\.json ${step}`));
    }));
  }
}
for (const path of ["package.json", ...memberDirs.map(member => `${member}/package.json`)]) {
  test(`structure gate refuses a Library dependency in ${path} by LIBRARY_DEPENDENCY_FORBIDDEN naming that manifest`, () => fixture(root => {
    const file = join(root, path);
    const pkg = JSON.parse(readFileSync(file, "utf8"));
    pkg.dependencies = { ...(pkg.dependencies ?? {}), "@mechanical/library-client": "1.0.0" };
    writeFileSync(file, JSON.stringify(pkg));
    const p = check(root);
    assert.notEqual(p.status, 0);
    assert.match(p.stderr, new RegExp(`LIBRARY_DEPENDENCY_FORBIDDEN: ${escapeRegExp(path)} dependencies @mechanical/library-client`));
  }));
}
for (const path of manifestFiles) {
  // "../Library" controls the lower-casing of the path segment; an upper-case `REF` key controls the /i flag of the
  // ref matcher itself, which no lower-case spelling can reach.
  for (const [label, line] of [
    ["a capitalised ../Library value", 'ref = "../Library"'],
    ["an upper-case REF key", 'REF = "../library"'],
  ] as const) {
    test(`structure gate refuses ${label} appended to ${path} by LIBRARY_MEMBER_FORBIDDEN naming that manifest`, () => fixture(root => {
      const file = join(root, path);
      // A registry entry appended to a member manifest keeps the roster intact; the same entry appended to
      // forge.workspace.toml would be a fourth member (INVALID_WORKSPACE_MEMBERS, pinned below), so the
      // workspace manifest receives the key as a leading top-level line instead.
      const original = readFileSync(file, "utf8");
      writeFileSync(file, path === "forge.workspace.toml" ? `${line}\n${original}` : `${original}\n[[packages]]\n${line}\nsource_type = "local"\n`);
      const p = check(root);
      assert.notEqual(p.status, 0);
      assert.match(p.stderr, new RegExp(`LIBRARY_MEMBER_FORBIDDEN: ${escapeRegExp(path)} \\(ref \\.\\./[Ll]ibrary\\)`));
    }));
  }
}
// MechanicalWorkflows-lpcq: the Library member ban reads manifests as TEXT; python tomllib decodes each spelling
// below to the same refused shape (ref = "../library"). Each manifest line is appended under a registry-shaped
// `[[packages]]` header (the shape Forge reads for an edge), never a `[[dependencies]]` ref table.
const REFUSED_SPELLINGS: ReadonlyArray<[string, string]> = [
  ["single-quoted literal string", "ref = '../library'"],
  ["double-quoted key", '"ref" = "../library"'],
  ["single-quoted key", "'ref' = '../library'"],
  ["no spaces around the equals sign", 'ref="../library"'],
  ["basic-string \\u escape inside the path", 'ref = "../\\u006Cibrary"'],
  ["basic-string \\U escape inside the path", 'ref = "../\\U0000006Cibrary"'],
  ["escaped colon decoding to a code: scheme", 'ref = "code\\u003Alibrary"'],
  ["escaped capital A in an upper-case segment", 'ref = "../LIBR\\u0041RY/"'],
  ["escape spelling the key itself", '"r\\u0065f" = "../library"'],
  ["multi-line literal string", "ref = '''../library'''"],
  ["multi-line basic string", 'ref = """../library"""'],
  ["multi-line basic string with a leading newline", 'ref = """\n../library"""'],
  ["multi-line basic string with a line-ending backslash", 'ref = """../li\\\n   brary"""'],
  ["inline table inside a dependencies array", 'dependencies = [{ ref = "../library" }]'],
  // MechanicalWorkflows-ifpm: the seven spellings tomllib decodes to the refused shape that the landed lpcq checker let through.
  ["multi-line basic string, spaces between the line-ending backslash and the newline", 'ref = """../li\\  \n   brary"""'],
  ["multi-line basic string, a tab between the line-ending backslash and the newline", 'ref = """../li\\\t\n   brary"""'],
  ["TOML 1.1 \\xHH escape inside the path", 'ref = "../\\x6Cibrary"'],
  ["TOML 1.1 \\xHH escape spelling the key", '"r\\x65f" = "../library"'],
  ["comment ending in a key and an open basic string before the ref line", '# see = "\\\nref = "../library"'],
  ["comments opening and closing a multi-line literal string around the ref line", "# open = '''\nref = \"../library\"\n# close = '''"],
  ["comments opening and closing a multi-line basic string around the ref line", '# open = """\nref = "../library"\n# close = """'],
  // Neighbours of the comment-aware scan: a trailing comment never hides the pair, and a hash inside a string never starts a comment.
  ["trailing comment after the refused value", 'ref = "../library" # keep'],
  ["hash inside an earlier string of the same inline table", 'dependencies = [{ note = "#", ref = "../library" }]'],
];
test("structure gate refuses every TOML spelling of a Library member ref that tomllib decodes to the refused shape", () => fixture(root => {
  const file = join(root, "packages/coordination/forge.toml");
  const original = readFileSync(file, "utf8");
  for (const [label, line] of REFUSED_SPELLINGS) {
    writeFileSync(file, original + "\n[[packages]]\n" + line + '\nsource_type = "local"\n');
    const p = check(root);
    assert.notEqual(p.status, 0, `${label} escaped the member ban: ${JSON.stringify(line)}`);
    assert.match(p.stderr, /LIBRARY_MEMBER_FORBIDDEN: packages\/coordination\/forge\.toml/, label);
    writeFileSync(file, original);
  }
}));
test("structure gate keeps accepting non-library refs written in the same TOML spellings", () => fixture(root => {
  const file = join(root, "packages/coordination/forge.toml");
  const original = readFileSync(file, "utf8");
  const controls: ReadonlyArray<[string, string]> = [
    ["single-quoted literal string", "ref = '../development'"],
    ["double-quoted key", '"ref" = "../development"'],
    ["single-quoted key", "'ref' = '../development'"],
    ["basic-string \\u escape", 'ref = "../develop\\u006Dent"'],
    ["escape spelling the key itself", '"r\\u0065f" = "../development"'],
    ["multi-line literal string", "ref = '''../development'''"],
    ["multi-line basic string", 'ref = """../development"""'],
    ["library: scheme in a double-quoted key", '"ref" = "library:workflows-development"'],
    ["library: scheme with an escaped colon", 'ref = "library\\u003Aworkflows-development"'],
    ["escaped quote inside the value", 'ref = "../dev\\"elopment"'],
    ["a key that merely mentions the word", 'reference = "../library"'],
    // MechanicalWorkflows-ifpm: the new decodings and the comment-aware scan must not refuse a non-library ref.
    ["TOML 1.1 \\xHH escape inside a non-library path", 'ref = "../develop\\x6Dent"'],
    ["TOML 1.1 \\xHH escape spelling the key of a non-library ref", '"r\\x65f" = "../development"'],
    ["spaces after the line-ending backslash in a non-library path", 'ref = """../devel\\  \n   opment"""'],
    ["a commented-out library ref", '# ref = "../library"\nref = "../development"'],
    ["comment with an unbalanced basic-string opener", '# see = "\\\nref = "../development"'],
    ["comments around a multi-line literal string opener", "# open = '''\nref = \"../development\"\n# close = '''"],
    // MechanicalWorkflows-o4xlr: a TRAILING comment that carries library ref text is a comment, not a second pair (a strip that only handles a line-start comment reads it as a Library edge).
    ["a trailing comment carrying library ref text after a non-library value", 'ref = "../development" # ref = "../library"'],
    ["single-quoted non-library value with a trailing comment opening a literal string", "ref = '../development' # open = '''"],
  ];
  for (const [label, line] of controls) {
    writeFileSync(file, original + "\n[[packages]]\n" + line + '\nsource_type = "local"\n');
    const p = check(root);
    assert.equal(p.status, 0, `${label} wrongly refused: ${JSON.stringify(line)}\n${p.stderr}`);
    writeFileSync(file, original);
  }
}));

// MechanicalWorkflows-0079 (lpcq follow-up, test-only): nine decodeBasicString / string-form laws the landed rows leave
// unpinned. Each row below dies against a named dist mutant of scripts/check-structure.ts (M03, M04, M05, M08, M09, M10,
// M13, M15, M21) while every landed row stays green. A refusal row names the manifest key it must be refused under; an
// accepted-shape control restores the manifest and asserts exit 0 explicitly, because the checker keeps a spelling
// verbatim where TOML does not decode it (an escape python tomllib rejects stays readable text, never a crash).
const NEUTRAL_REF_LINE = 'ref = "code:neutral-kit"\n';
const DECODER_LAW_REFUSALS: ReadonlyArray<[string, string, RegExp]> = [
  // M21: a single-line basic string may contain an escaped quote; a string form that stops at the quote never sees the pair.
  ["M21 single-line basic string holding an escaped quote before the library segment", 'ref = "../li\\"x/library"', /LIBRARY_MEMBER_FORBIDDEN: packages\/coordination\/forge\.toml \(ref \.\.\/li"x\/library\)/],
  // M08: the line-ending backslash accepts a CRLF line ending.
  ["M08 multi-line basic string, line-ending backslash followed by CRLF", 'ref = """../li\\\r\n   brary"""', /LIBRARY_MEMBER_FORBIDDEN: packages\/coordination\/forge\.toml \(ref \.\.\/library\)/],
  // M13: the newline right after an opening triple quote is trimmed (LF and CRLF; basic and literal), so the value is the bare segment.
  ["M13 multi-line basic string, newline after the opening quotes, bare library segment", 'ref = """\nlibrary"""', /LIBRARY_MEMBER_FORBIDDEN: packages\/coordination\/forge\.toml \(ref library\)/],
  ["M13 multi-line basic string, CRLF after the opening quotes, bare library segment", 'ref = """\r\nlibrary"""', /LIBRARY_MEMBER_FORBIDDEN: packages\/coordination\/forge\.toml \(ref library\)/],
  ["M13 multi-line literal string, newline after the opening quotes, bare library segment", "ref = '''\nlibrary'''", /LIBRARY_MEMBER_FORBIDDEN: packages\/coordination\/forge\.toml \(ref library\)/],
  // M09: an escape above U+10FFFF stays verbatim (its backslash is a path separator); decoding it would throw a RangeError instead of the refusal.
  ["M09 path with an escape above U+10FFFF after the library segment", 'path = "library\\U00110000"', /LIBRARY_MEMBER_FORBIDDEN: packages\/coordination\/forge\.toml \(path library\\U00110000\)/],
  // M10: a surrogate escape stays verbatim; decoding it would fuse a lone surrogate onto the library segment and hide it.
  ["M10 path with a surrogate escape after the library segment", 'path = "library\\uD800"', /LIBRARY_MEMBER_FORBIDDEN: packages\/coordination\/forge\.toml \(path library\\uD800\)/],
  // MechanicalWorkflows-bk38x: the guard's top bound (U+DFFF) and the low-half floor (U+DC00) stay pinned, so a high-half-only guard cannot hide a low surrogate.
  ["M10 path with a low-surrogate escape at the top of the range", 'path = "library\\uDFFF"', /LIBRARY_MEMBER_FORBIDDEN: packages\/coordination\/forge\.toml \(path library\\uDFFF\)/],
  ["M10 path with the first low-surrogate escape", 'path = "library\\uDC00"', /LIBRARY_MEMBER_FORBIDDEN: packages\/coordination\/forge\.toml \(path library\\uDC00\)/],
];
test("structure gate refuses the decoder-law spellings of a Library member edge (MechanicalWorkflows-0079)", () => fixture(root => {
  const file = join(root, "packages/coordination/forge.toml");
  const original = readFileSync(file, "utf8");
  for (const [label, line, refusal] of DECODER_LAW_REFUSALS) {
    // A `path` row needs a ref that names no library, so the ban can only fire on the path value.
    const body = line.startsWith("path") ? NEUTRAL_REF_LINE + line : line;
    writeFileSync(file, original + "\n[[packages]]\n" + body + '\nsource_type = "local"\n');
    const p = check(root);
    assert.notEqual(p.status, 0, `${label} escaped the member ban: ${JSON.stringify(line)}`);
    assert.match(p.stderr, refusal, label);
    writeFileSync(file, original);
  }
}));
const DECODER_LAW_CONTROLS: ReadonlyArray<[string, string]> = [
  // M03: an escaped backslash is consumed once, so the u that follows it stays literal text and no `/` appears.
  ["M03 escaped backslash before a u sequence stays one backslash and literal text", 'ref = "..\\\\u002Flibrary"'],
  ["M03 escaped backslash before a U sequence stays one backslash and literal text", 'ref = "..\\\\U0000002Flibrary"'],
  // M04: an escaped quote decodes to a quote, so the segment is library" and not a bare library segment.
  ["M04 escaped quote after the library segment of a path value", 'path = "library\\""'],
  // M05: a line-ending backslash swallows the newline only in a multi-line basic string; a single-line string keeps it verbatim.
  ["M05 single-line basic string keeps a line-ending backslash and its newline", 'ref = "../li\\\n   brary"'],
  // M09 and M10 never reach the library segment through a decoded code point.
  ["M09 escape above U+10FFFF inside a non-library ref stays text, never a crash", 'ref = "../develop\\U00110000ment"'],
  ["M10 surrogate escape inside a non-library ref stays text", 'ref = "../develop\\uD800ment"'],
  // M15: a literal string is not escape-decoded (the key is a double-quoted `ref`, the value a literal or multi-line literal).
  ["M15 literal string carrying a \\u sequence is undecoded", "ref = '../\\u006Cibrary'"],
  ["M15 multi-line literal string carrying a \\u sequence is undecoded", "ref = '''../\\u006Cibrary'''"],
];
test("structure gate keeps accepting the decoder-law spellings that TOML leaves undecoded or unrefused (MechanicalWorkflows-0079)", () => fixture(root => {
  const file = join(root, "packages/coordination/forge.toml");
  const original = readFileSync(file, "utf8");
  for (const [label, line] of DECODER_LAW_CONTROLS) {
    const body = line.startsWith("path") ? NEUTRAL_REF_LINE + line : line;
    writeFileSync(file, original + "\n[[packages]]\n" + body + '\nsource_type = "local"\n');
    const p = check(root);
    assert.equal(p.status, 0, `${label} wrongly refused: ${JSON.stringify(line)}\n${p.stderr}`);
    writeFileSync(file, original);
  }
}));

// MechanicalWorkflows-hnz4: the checker must read the roster, the registry path values and the [dependencies]
// table keys the way Forge reads them, not only the column-0 `[[packages]]` header and `ref` values.
const LIBRARY_EDGE = 'ref = "library:shared-kit"\nsource_type = "local"\npath = "../library"\n';
test("structure gate counts a spaced, tabbed, indented, quoted or EOF [[packages]] header as a roster member", () => fixture(root => {
  const file = join(root, "forge.workspace.toml");
  const original = readFileSync(file, "utf8");
  for (const header of ["[[ packages ]]", "[[\tpackages\t]]", "  [[packages]]", '[[ "packages" ]]', "[['packages']]", "[[packages]] # trailing comment"]) {
    writeFileSync(file, original + "\n" + header + "\n" + LIBRARY_EDGE);
    const p = check(root);
    assert.notEqual(p.status, 0, `${JSON.stringify(header)} escaped the roster assert`);
    assert.match(p.stderr, /INVALID_WORKSPACE_MEMBERS: exactly three named non-root package members required/, header);
    writeFileSync(file, original);
  }
  writeFileSync(file, original + "\n[[ packages ]]");
  const eof = check(root);
  assert.notEqual(eof.status, 0, "a header at end of file with no newline escaped the roster assert");
  assert.match(eof.stderr, /INVALID_WORKSPACE_MEMBERS/);
}));
test("structure gate still accepts the three committed members when one header is spaced", () => fixture(root => {
  const file = join(root, "forge.workspace.toml");
  writeFileSync(file, readFileSync(file, "utf8").replace("[[packages]]", "[[ packages ]]"));
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
// MechanicalWorkflows-76a5: a quoted header key is a TOML basic string, so an escape inside it still names `packages`.
// Spelled with String.raw so each backslash reaches forge.workspace.toml verbatim (the checker, not this file, decodes it).
const FOURTH_MEMBER = 'ref = "code:fourth"\nsource_type = "local"\npath = "apps/fourth"\n';
const ESCAPED_PACKAGES_HEADERS: ReadonlyArray<readonly [string, string]> = [
  ["short escape", String.raw`[["pack\u0061ges"]]`],
  ["long escape", String.raw`[["pack\U00000061ges"]]`],
  ["spaced short escape", String.raw`[[ "pack\u0061ges" ]]`],
  ["tabbed short escape", "[[\t" + String.raw`"pack\u0061ges"` + "\t]]"],
  ["escape on the first letter", String.raw`[["\u0070ackages"]]`],
];
test("structure gate counts a [[packages]] header whose quoted key spells packages with a TOML escape as a roster member", () => fixture(root => {
  const file = join(root, "forge.workspace.toml");
  const original = readFileSync(file, "utf8");
  for (const [label, header] of ESCAPED_PACKAGES_HEADERS) {
    for (const eol of ["\n", "\r\n"]) {
      writeFileSync(file, original + "\n" + header + eol + FOURTH_MEMBER.replace(/\n/g, eol));
      const p = check(root);
      assert.notEqual(p.status, 0, `${label} (${JSON.stringify(eol)}) ${header} escaped the roster assert`);
      assert.match(p.stderr, /INVALID_WORKSPACE_MEMBERS: exactly three named non-root package members required/, label);
      writeFileSync(file, original);
    }
  }
}));
test("structure gate lets a foreign array-of-tables header end a member body without adding a member", () => fixture(root => {
  const file = join(root, "forge.workspace.toml");
  const original = readFileSync(file, "utf8");
  for (const header of ["[[extras]]", String.raw`[["pack\u0061gez"]]`, "[['packages2']]", "[[ other ]] # comment"]) {
    writeFileSync(file, original + "\n" + header + "\n" + FOURTH_MEMBER);
    const p = check(root);
    assert.equal(p.status, 0, `${JSON.stringify(header)} wrongly counted as a roster member\n${p.stderr}`);
    writeFileSync(file, original);
  }
  // A foreign header closes the previous body: the `path` under it belongs to the foreign table, so the last member
  // loses its path and the roster assert fires (a header that folded into the member would hand the path back).
  writeFileSync(file, original.replace(/\r?\npath = "packages\/coordination"\s*$/, '\n\n[[extras]]\npath = "packages/coordination"\n'));
  const between = check(root);
  assert.notEqual(between.status, 0, "a foreign header folded its path into the previous member");
  assert.match(between.stderr, /INVALID_WORKSPACE_MEMBERS/);
}));
const NEUTRAL_REF = 'ref = "code:neutral-kit"\nsource_type = "local"\n';
test("structure gate refuses a registry path value with a library segment even when the ref names no library", () => fixture(root => {
  for (const file of ["forge.toml", "packages/development/forge.toml", "packages/coordination/forge.toml", "apps/development-rig/forge.toml"]) {
    const target = join(root, file);
    const original = readFileSync(target, "utf8");
    for (const value of ["../library", "../Library/", "../x/library/y", "..\\\\library", "library"]) {
      writeFileSync(target, `${original}\n[[packages]]\n${NEUTRAL_REF}path = "${value}"\n`);
      const p = check(root);
      assert.notEqual(p.status, 0, `${file} path ${value} escaped the member ban`);
      assert.match(p.stderr, new RegExp(`LIBRARY_MEMBER_FORBIDDEN: ${escapeRegExp(file)} \\(path `), `${file} ${value}`);
      writeFileSync(target, original);
    }
  }
}));
test("structure gate refuses a library path value in forge.workspace.toml", () => fixture(root => {
  const file = join(root, "forge.workspace.toml");
  writeFileSync(file, `path = "../library"\n${readFileSync(file, "utf8")}`);
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /LIBRARY_MEMBER_FORBIDDEN: forge\.workspace\.toml \(path \.\.\/library\)/);
}));
test("structure gate keeps accepting path values with no library segment, including a key that merely begins with path", () => fixture(root => {
  const file = join(root, "packages/coordination/forge.toml");
  const original = readFileSync(file, "utf8");
  for (const value of ["../development", "./libraryish", "../my-library-kit/dist", "packages/development"]) {
    writeFileSync(file, `${original}\n[[packages]]\n${NEUTRAL_REF}path = "${value}"\n`);
    const p = check(root);
    assert.equal(p.status, 0, `path ${value} wrongly refused\n${p.stderr}`);
  }
  writeFileSync(file, `${original}\n[[packages]]\n${NEUTRAL_REF}pathology = "../library"\n`);
  const control = check(root);
  assert.equal(control.status, 0, control.stderr);
}));
test("structure gate refuses a non-member library: key in any [dependencies] spelling", () => fixture(root => {
  const spellings: ReadonlyArray<[string, string]> = [
    ["table key", '[dependencies]\n"library:shared-kit" = {}\n'],
    ["table key with a version table", '[dependencies]\n"library:shared-kit" = { version = "1.0.0" }\n'],
    ["single-quoted table key", "[dependencies]\n'library:shared-kit' = {}\n"],
    ["spaced table header", '[ dependencies ]\n"library:shared-kit" = {}\n'],
    ["dotted sub-table header", '[dependencies."library:shared-kit"]\nversion = "1.0.0"\n'],
    ["dotted key under the table", '[dependencies]\nlibrary.shared-kit = {}\n'],
    ["top-level dotted key", 'dependencies."library:shared-kit" = {}\n'],
    ["escaped colon in the key", '[dependencies]\n"library\\u003Ashared-kit" = {}\n'],
    ["library path segment in the key", '[dependencies]\n"code:../library/kit" = {}\n'],
    // MechanicalWorkflows-ylcr: the five spellings the nine rows above leave open (hnz4 lead W2-W5, W9).
    ["upper-case Library: scheme", '[dependencies]\n"Library:shared-kit" = {}\n'],
    ["backslash key path", '[dependencies]\n"code:..\\\\library\\\\kit" = {}\n'],
    ["upper-case Library path segment", '[dependencies]\n"code:../Library/kit" = {}\n'],
    ["indented table header", '  [dependencies]\n"library:shared-kit" = {}\n'],
    ["u-escaped scheme letter", '[dependencies]\n"\\u006Cibrary:shared-kit" = {}\n'],
  ];
  for (const file of ["packages/development/forge.toml", "packages/coordination/forge.toml", "apps/development-rig/forge.toml"]) {
    const target = join(root, file);
    const original = readFileSync(target, "utf8");
    for (const [label, text] of spellings) {
      writeFileSync(target, label === "top-level dotted key" ? `${text}${original}` : `${original}\n${text}`);
      const p = check(root);
      assert.notEqual(p.status, 0, `${file}: ${label} escaped the dependency ban`);
      assert.match(p.stderr, new RegExp(`LIBRARY_DEPENDENCY_FORBIDDEN: ${escapeRegExp(file)} \\[dependencies\\] `), `${file}: ${label}`);
      writeFileSync(target, original);
    }
  }
}));
// MechanicalWorkflows-ylcr (hnz4 lead W1): a workspace file saved with CRLF line endings still reads as its three members;
// the array-of-tables header must end at a CRLF the way it ends at a bare LF.
test("structure gate keeps reading the three workspace members when forge.workspace.toml uses CRLF line endings (MechanicalWorkflows-ylcr)", () => fixture(root => {
  const file = join(root, "forge.workspace.toml");
  const original = readFileSync(file, "utf8");
  assert.ok(!original.includes("\r"), "fixture workspace must start LF-only");
  writeFileSync(file, original.replace(/\n/g, "\r\n"));
  assert.ok(readFileSync(file, "utf8").includes("\r\n"));
  const p = check(root);
  assert.equal(p.status, 0, `CRLF workspace wrongly refused\n${p.stderr}`);
}));
test("structure gate keeps accepting the committed [dependencies] key and member-ref or non-library keys", () => fixture(root => {
  const file = join(root, "packages/coordination/forge.toml");
  const original = readFileSync(file, "utf8");
  for (const text of [
    '[dependencies]\n"library:workflows-development" = { version = "0.1.0" }\n',
    '[dependencies]\n"code:development-rig" = {}\n',
    '[dependencies]\n"code:neutral-kit" = {}\nleft-pad = {}\n',
    '[dependencies]\n# "library:shared-kit" = {}\n',
    '[build.env]\n"library:shared-kit" = "x"\n',
  ]) {
    writeFileSync(file, `${original}\n${text}`);
    const p = check(root);
    assert.equal(p.status, 0, `${JSON.stringify(text)} wrongly refused\n${p.stderr}`);
  }
}));

// CACWC-EAT-R016 (MechanicalWorkflows-r769): CAC metadata stays an optional view, so neither provider-neutral library may
// import a CAC checker module. Each control pins the exact refusal code so an unrelated nonzero exit cannot pass for it.
for (const [library, specifier] of [
  ["development", "./cac-checker.js"], ["coordination", "../cac/index.js"], ["development", "@mechanical/cac"], ["coordination", "cac-checker"],
] as const) {
  test(`structure gate refuses a CAC checker import (${specifier}) inside the ${library} library`, () => fixture(root => {
    mkdirSync(join(root, `packages/${library}/src`), { recursive: true });
    writeFileSync(join(root, `packages/${library}/src/optional-view.ts`), "import { check } " + `from "${specifier}";\nexport const c = check;\n`);
    const p = check(root);
    assert.notEqual(p.status, 0);
    assert.match(p.stderr, new RegExp(`CAC_CHECKER_IMPORT_FORBIDDEN: .*packages/${library}/src/optional-view\\.ts:1`));
  }));
}
test("structure gate accepts a library import whose name merely begins with cac", () => fixture(root => {
  mkdirSync(join(root, "packages/coordination/src"), { recursive: true });
  writeFileSync(join(root, "packages/coordination/src/cache-user.ts"), "import { warm } " + 'from "./cache.js";\nexport const w = warm;\n');
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("structure gate accepts a CAC checker import at the rig edge, outside the two libraries", () => fixture(root => {
  mkdirSync(join(root, "apps/development-rig/src"), { recursive: true });
  writeFileSync(join(root, "apps/development-rig/src/cac-edge.ts"), "import { check } " + 'from "./cac-checker.js";\nexport const c = check;\n');
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));

// EAT-R017 pre-condition (MechanicalWorkflows-bul9n): the external installed-consumer smoke must install one packed
// tarball per rig dependency plus the rig, and its dependency assertion must name the rig manifest's dependency keys.
// INSTALLED_CONSUMER_SMOKE_STALE fires when the tarball set or the .ts assertion list drifts from the manifest.
const SMOKE_SH = "qa/integration/installed-consumer.sh";
const SMOKE_TS = "qa/integration/installed-consumer.ts";
const COORDINATION_TARBALL = "mechanical-workflows-coordination-0.1.0.tgz";
function editFile(root: string, file: string, edit: (text: string) => string) {
  const path = join(root, file);
  const before = readFileSync(path, "utf8");
  const after = edit(before);
  assert.notEqual(after, before, `test edit must change ${file}`);
  writeFileSync(path, after);
}
test("structure gate accepts the committed three-member installed-consumer smoke", () => fixture(root => {
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("structure gate refuses a smoke script that never installs the coordination tarball", () => fixture(root => {
  editFile(root, SMOKE_SH, text => text.split(COORDINATION_TARBALL).join("mechanical-workflows-development-0.1.0.tgz"));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /INSTALLED_CONSUMER_SMOKE_STALE: .*installed-consumer\.sh.*mechanical-workflows-coordination-0\.1\.0\.tgz/);
}));
test("structure gate refuses a rig manifest dependency that has no tarball line in the smoke", () => fixture(root => {
  editFile(root, "apps/development-rig/package.json", text => {
    const pkg = JSON.parse(text);
    pkg.dependencies["@mechanical/x"] = "0.1.0";
    return JSON.stringify(pkg, null, 2);
  });
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /INSTALLED_CONSUMER_SMOKE_STALE: .*mechanical-x-0\.1\.0\.tgz/);
}));
test("structure gate refuses a smoke assertion list that drops the coordination dependency", () => fixture(root => {
  editFile(root, SMOKE_TS, text => text.replace('"@mechanical/workflows-coordination", ', ""));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /INSTALLED_CONSUMER_SMOKE_STALE: .*installed-consumer\.ts.*@mechanical\/workflows-coordination/);
}));
test("structure gate refuses the stale one-dependency smoke assertion list", () => fixture(root => {
  editFile(root, SMOKE_TS, text => text.replace(/EXPECTED_RIG_DEPENDENCIES = \[[^\]]*\]/, 'EXPECTED_RIG_DEPENDENCIES = ["@mechanical/workflows-development"]'));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /INSTALLED_CONSUMER_SMOKE_STALE: .*installed-consumer\.ts/);
}));
test("structure gate refuses a smoke script that lost its PACKAGE_TARBALLS_MISSING refusal", () => fixture(root => {
  editFile(root, SMOKE_SH, text => text.replaceAll("PACKAGE_TARBALLS_MISSING", "TARBALLS_GONE"));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /INSTALLED_CONSUMER_SMOKE_STALE: .*PACKAGE_TARBALLS_MISSING/);
}));
test("structure gate refuses a missing installed-consumer smoke file", () => fixture(root => {
  rmSync(join(root, SMOKE_TS));
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /INSTALLED_CONSUMER_SMOKE_STALE: .*installed-consumer\.ts/);
}));
test("installed-consumer smoke names every absent member tarball and exits 2 before any install", () => fixture(root => {
  const run = spawnSync("bash", [join(root, SMOKE_SH)], { cwd: root, encoding: "utf8" });
  assert.equal(run.status, 2, run.stderr);
  for (const name of [COORDINATION_TARBALL, "mechanical-workflows-development-0.1.0.tgz", "mechanical-development-rig-0.1.0.tgz"]) {
    assert.match(run.stderr, new RegExp(`PACKAGE_TARBALLS_MISSING: .*${name.replaceAll(".", "\\.")}`));
  }
}));

// EAT-R020 + EAT-R104 scanner leg (MechanicalWorkflows-71lui.2): the provider, CAC and optional-SDK import clauses read a
// specifier-normalised view of each source, so a specifier that starts on a later line than its from, import( or
// require( keyword, sits in a template literal, or follows a comment still refuses. The diagnostic keeps the line on which
// the import site begins (its keyword). Specifiers are assembled from parts so this file never carries a literal import of
// a provider or optional SDK (the same scan reads this file).
const sdk = (name: string) => name.replace("*", "");
function leakFile(root: string, path: string, lines: string[]) {
  mkdirSync(join(root, path, ".."), { recursive: true });
  writeFileSync(join(root, path), lines.join("\n") + "\n");
  return check(root);
}
test("structure gate refuses a from-newline provider import inside the development library", () => fixture(root => {
  const p = leakFile(root, "packages/development/src/leak.ts", ["import { query } from", `  "@anthropic-ai/${sdk("claude-agent-sdk")}";`, "export const q = query;"]);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/development\/src\/leak\.ts:1\b/);
}));
test("structure gate refuses a multi-line named import whose from clause leads the specifier by lines", () => fixture(root => {
  const p = leakFile(root, "packages/coordination/src/leak.ts", ["import {", "  a,", "  b,", "} from", `'@forge/${sdk("sdk")}';`]);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/coordination\/src\/leak\.ts:4\b/);
}));
test("structure gate refuses an export-from-newline provider specifier", () => fixture(root => {
  const p = leakFile(root, "packages/development/src/leak.ts", ["export { y } from", `"@openai/${sdk("sdk")}";`]);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/development\/src\/leak\.ts:1\b/);
}));
test("structure gate refuses a provider import whose specifier follows a comment", () => fixture(root => {
  for (const lines of [
    ["import { x } from /* provider */", `"@hyperunix/${sdk("sdk")}";`],
    ["import { x } from // provider", `"@hyperunix/${sdk("sdk")}";`],
    [`import { x } from/* provider */"@hyperunix/${sdk("sdk")}";`],
  ]) {
    const p = leakFile(root, "packages/development/src/leak.ts", lines);
    assert.notEqual(p.status, 0, lines.join("|"));
    assert.match(p.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/development\/src\/leak\.ts:1\b/, lines.join("|"));
  }
}));
test("structure gate refuses a provider import whose specifier is a template literal", () => fixture(root => {
  const p = leakFile(root, "packages/coordination/src/leak.ts", ["export const m = await import(", `  \`@furnace/${sdk("sdk")}\``, ");"]);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/coordination\/src\/leak\.ts:1\b/);
}));
test("structure gate refuses an import( on one line and a require( on one line when the optional SDK specifier follows", () => fixture(root => {
  const dynamic = leakFile(root, "qa/adversarial/probe.ts", ["export const m = await import(", `  "@forge/${sdk("sdk")}"`, ");"]);
  assert.notEqual(dynamic.status, 0);
  assert.match(dynamic.stderr, /OPTIONAL_SDK_LITERAL_IMPORT: .*qa\/adversarial\/probe\.ts:1\b/);
  rmSync(join(root, "qa/adversarial/probe.ts"));
  const required = leakFile(root, "qa/adversarial/probe.ts", ["const m = require(", `  "@hyperunix/${sdk("sdk")}"`, ");", "export default m;"]);
  assert.notEqual(required.status, 0);
  assert.match(required.stderr, /OPTIONAL_SDK_LITERAL_IMPORT: .*qa\/adversarial\/probe\.ts:1\b/);
}));
test("structure gate refuses a template-literal specifier of an optional SDK but accepts an interpolated one", () => fixture(root => {
  const literal = leakFile(root, "qa/adversarial/probe.ts", [`export const m = await import(\`@forge/${sdk("sdk")}\`);`]);
  assert.notEqual(literal.status, 0);
  assert.match(literal.stderr, /OPTIONAL_SDK_LITERAL_IMPORT: .*qa\/adversarial\/probe\.ts:1\b/);
  const interpolated = leakFile(root, "qa/adversarial/probe.ts", ["const name = \"" + sdk("sdk") + "\";", "export const m = await import(`@forge/${name}`);"]);
  assert.equal(interpolated.status, 0, interpolated.stderr);
}));
test("structure gate refuses an optional SDK import that sits in an apps or scripts source after a from-newline", () => fixture(root => {
  const p = leakFile(root, "apps/development-rig/src/loader.ts", ["import { c } from", `  '@anthropic-ai/${sdk("claude-agent-sdk")}';`, "export const x = c;"]);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /OPTIONAL_SDK_LITERAL_IMPORT: .*apps\/development-rig\/src\/loader\.ts:1\b/);
}));
test("structure gate refuses a from-newline CAC checker import inside the coordination library", () => fixture(root => {
  const p = leakFile(root, "packages/coordination/src/optional-view.ts", ["import { check } from", '  "./cac-checker.js";', "export const c = check;"]);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /CAC_CHECKER_IMPORT_FORBIDDEN: .*packages\/coordination\/src\/optional-view\.ts:1\b/);
}));
test("structure gate refuses a template-literal CAC checker import inside the development library", () => fixture(root => {
  const p = leakFile(root, "packages/development/src/optional-view.ts", ["export const c = await import(", "  `../cac/index.js`", ");"]);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /CAC_CHECKER_IMPORT_FORBIDDEN: .*packages\/development\/src\/optional-view\.ts:1\b/);
}));
test("structure gate accepts a multi-line import of a relative path, of an allowed builtin and a cac-prefixed name", () => fixture(root => {
  const lines = [
    "import { a } from", '  "./a.js";', "import {", "  b,", "} from", "  '../b.js';",
    "export const c = await import(", "  `./c.js`", ");", "export const k = require(", '  "./cache.js"', ");",
  ];
  const p = leakFile(root, "packages/development/src/multi.ts", lines);
  assert.equal(p.status, 0, p.stderr);
  const coordination = leakFile(root, "packages/coordination/src/multi.ts", ["import {", "  createHash,", "} from", '  "node:crypto";', "export const h = createHash;"]);
  assert.equal(coordination.status, 0, coordination.stderr);
}));
// EAT-R020 + EAT-R104 + EAT-R115 (MechanicalWorkflows-71lui.3): the import-clause gap must not backtrack exponentially. A keyword
// followed by many adjacent comments and no closing string used to double the work per extra comment, hanging the structure scan.

for (const [label, gap] of [
  ["40 adjacent block comments", "/**/".repeat(40)],
  ["40 line-comment openers on one line", "// ".repeat(40)],
  ["40 mixed block and line comments", "/* a */ // b ".repeat(40)],
] as const) {
  test(`structure gate finishes the import-clause scan over a keyword followed by ${label} with no string (no-hang)`, () => fixture(root => {
    for (const keyword of ["import(", "from ", "require("]) {
      const p = leakFile(root, "packages/development/src/hang.ts", [`export const x = ${keyword}${gap}`]);
      const started = Date.now();
      assert.equal(p.error, undefined, `${keyword} ${label}: ${p.error?.message}`);
      // A bare from keyword reads no specifier; an import( or require( keyword with no string reads as a non-literal load (MechanicalWorkflows-fwexf.2).
      if (keyword === "from ") assert.equal(p.status, 0, `${keyword} ${label}: ${p.stderr}`);
      else assert.match(p.stderr, /DEVELOPMENT_IO_IMPORT_FORBIDDEN: .*packages\/development\/src\/hang\.ts:1 \(non-literal specifier\)/, `${keyword} ${label}: ${p.stderr}`);
      assert.ok(Date.now() - started < 30_000, label);
    }
  }));
}
test("structure gate still refuses a provider specifier after many adjacent block and line comments (control arm, same comment body)", () => fixture(root => {
  const lines = [`export const a = await import(${"/**/".repeat(40)} "@forge/${sdk("sdk")}");`, `export const b = await import(${"// ".repeat(40)}`, `  "@anthropic-ai/${sdk("claude-agent-sdk")}");`];
  const p = leakFile(root, "packages/development/src/gapped.ts", lines);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/development\/src\/gapped\.ts:1\b/);
  assert.match(p.stderr, /LIBRARY_PROVIDER_IMPORT_FORBIDDEN: .*packages\/development\/src\/gapped\.ts:2\b/);
}));

// Symlinked directories under a typechecked root (EAT-R115, MechanicalWorkflows-869cl.3): the source walker never follows a
// symlink. A cycle multiplied the scanned set (41 paths for 1 real file at the node ELOOP depth) and a symlinked tree outside the
// workspace entered the scan as workspace source, so any symlink under a typechecked root (outside node_modules and dist) is
// refused with one typed diagnostic per link naming its path and target.
test("structure gate refuses a symlink cycle under a typechecked root with one typed diagnostic instead of scanning it", () => fixture(root => {
  mkdirSync(join(root, "qa/adversarial/loop"), { recursive: true });
  writeFileSync(join(root, "qa/adversarial/probe.ts"), "export const probe = 1;\n");
  symlinkSync("..", join(root, "qa/adversarial/loop/up"), "dir");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /STRUCTURE_SYMLINK_IN_TYPECHECKED_ROOT: qa\/adversarial\/loop\/up -> \.\./);
  assert.equal((p.stderr.match(/qa\/adversarial\/loop\/up -> /g) ?? []).length, 1, "the cycle link is named exactly once, not once per ELOOP level");
}));
test("structure gate refuses a symlink that admits a tree outside the workspace as source", () => fixture(root => {
  const foreign = mkdtempSync(join(tmpdir(), "mw-structure-foreign-"));
  try {
    writeFileSync(join(foreign, "vendored.ts"), "export const vendored = 1;\n");
    mkdirSync(join(root, "packages/development/src"), { recursive: true });
    symlinkSync(foreign, join(root, "packages/development/src/vendor-link"), "dir");
    const p = check(root);
    assert.notEqual(p.status, 0);
    assert.match(p.stderr, /STRUCTURE_SYMLINK_IN_TYPECHECKED_ROOT: packages\/development\/src\/vendor-link -> /);
  } finally { rmSync(foreign, { recursive: true, force: true }); }
}));
test("structure gate refuses a symlinked .ts file under a typechecked root", () => fixture(root => {
  mkdirSync(join(root, "qa/adversarial"), { recursive: true });
  writeFileSync(join(root, "qa/real.ts"), "export const real = 1;\n");
  symlinkSync("../real.ts", join(root, "qa/adversarial/alias.ts"), "file");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /STRUCTURE_SYMLINK_IN_TYPECHECKED_ROOT: qa\/adversarial\/alias\.ts -> \.\.\/real\.ts/);
}));
test("structure gate tolerates a symlinked node_modules and dist under a typechecked root", () => fixture(root => {
  mkdirSync(join(root, "qa/adversarial"), { recursive: true });
  mkdirSync(join(root, "qa/adversarial/other"), { recursive: true });
  symlinkSync("..", join(root, "qa/adversarial/node_modules"), "dir");
  symlinkSync("other", join(root, "qa/adversarial/dist"), "dir");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
}));
test("structure gate treats a directory named x.ts as a directory and scans the files inside it", () => fixture(root => {
  mkdirSync(join(root, "qa/adversarial/x.ts"), { recursive: true });
  writeFileSync(join(root, "qa/adversarial/x.ts/inner.ts"), "export const inner = 1;\n");
  const clean = check(root);
  assert.equal(clean.status, 0, clean.stderr);
  writeFileSync(join(root, "qa/adversarial/x.ts/probe.ts"), "const sdk = await import(" + "\"@forge/sdk\");\nexport default sdk;\n");
  const p = check(root);
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /OPTIONAL_SDK_LITERAL_IMPORT: .*qa\/adversarial\/x\.ts\/probe\.ts:1/);
}));
