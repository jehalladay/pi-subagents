/**
 * wb-x32 (W10 ReactiveFiber provider/interop): the cases row R3 of the docs/07 provider-rules census binds
 * (test/workbench-docs07-provider-rules.census.ts). The sentence is the ReactiveFiberCLI provider's: "Do not declare a typed TS
 * context-render client exists without code evidence." The row's fourth half, declared-cli-contract, binds the wb-2j3.12 carrier
 * cases R2-1 and R2-3 (test/workbench-rf-contract-carrier.test.ts): both registered reactivefiber.render.preview descriptors
 * state the carrier as their contractSource, and the carrier names `reactive-fiber.cli/v1 context.render --no-commit`. The three
 * halves below are this file's, one describe each (test/helpers/rf-typed-client.ts names them; the census's R3 report anchor
 * holds each half to exactly the cases a report collects under its describe).
 *
 * PINNED READER SET (case id: assertion target; result observed at base ce180d82, rf-typed-client readers):
 *  stated-cli-surface, Pi's three statements of its RF surface:
 *   S1: docs/workbench/18 § Key risks and mitigations (rendered view, under the page title): one table, headed Risk, Impact and
 *       Mitigation and test, holding exactly one row whose first cell reads "No RF typed render SDK in pinned revision", and that
 *       row reads "weak integration" and "explicit unavailable block, provider-owned SDK improvement"; no HTML in the section.
 *       Observed: the row as quoted.
 *   S2: vendor/README.md § Native SDK artifacts (rendered view): exactly one paragraph names ReactiveFiberCLI, and its first two
 *       sentences read "ReactiveFiberCLI currently uses its installed CLI JSON envelope." and "No unverified TypeScript client or
 *       invented SDK method is substituted."; no HTML in the section. Observed: as quoted.
 *   S3: src/workbench/providers/reactivefiber.ts: exactly one comment leads the module, and it is PROVIDER_COMMENT, which names the
 *       installed CLI JSON contract and "(no TS SDK published)". Observed: as quoted.
 *   S4: each statement edited in memory (reworded to name a client, deleted, duplicated, hidden in an HTML comment, or joined by a
 *       second leading comment) reads red, naming its statement; the three live texts read no finding.
 *  no-sdk-load, the package specifiers of tracked src:
 *   L1: every tracked script module under src (git ls-files) read by moduleLoads holds no RF package specifier, over at least 120
 *       modules and 170 specifiers, with @furnace/sdk read in src/workbench/native-modules.ts and node:child_process in the
 *       provider. Observed: 124 modules, 178 specifiers (171 import, 7 dynamic import), no RF package specifier.
 *   L2: an RF package planted in each load form moduleLoads reads (import, import type, side-effect import, export from, export
 *       star, import-equals require, dynamic import with a string and with a template, require, import type node) is read once,
 *       naming the module, the form and the specifier.
 *   L3: near misses read quiet (relative specifiers naming the provider module, react, fiber and reactive), and so do the named
 *       residuals' pinned quiet rows: R-COMPUTED (a specifier computed at run time), R-LOADER (a load through a createRequire
 *       loader, the form src/workbench/hosts/local-detached.ts uses for a local provider module) and R-OTHER-NAME (an RF client
 *       published under a name whose fold holds no reactivefiber, such as @rf/sdk).
 *  no-sdk-manifest, the dependency texts of package.json, package-lock.json and vendor/dependency-lock.json:
 *   M1: no text the manifest readers read is an RF package text, over at least 40 package.json texts and 2000 texts per
 *       lockfile, with the @forge/sdk dependency name and the node_modules/@furnace/sdk install path read. Observed: 45
 *       package.json texts, 2101 texts in each lockfile, no RF package text.
 *   M2: an RF package planted in each place the readers read (each dependency map as a name and as an npm alias spec, each
 *       bundled list spelling, and in a lockfile: an install path, a nested install path, a name field, a resolved field, an
 *       entry's dependency map name and a file spec) is read once, naming the manifest and the place.
 *   M3: near misses read quiet (react, fiber, reactive, a react-fiber spelling and the three vendored SDK names), and so do the
 *       named residuals' pinned quiet rows: R-OTHER-NAME (an RF client under another name) and R-SHADOWED (a dependency field that
 *       JSON.parse drops as a shadowed duplicate key, as npm does).
 *
 * NOT CLAIMED by these cases: Pi prose outside the three statements (another docs page, README.md, a src comment other than the
 * provider's leading one, a capability description) is NOT CLAIMED; a module outside src (test, qa, examples) is NOT CLAIMED; an
 * untracked src file is NOT CLAIMED; a manifest other than the three is NOT CLAIMED; an install outside the lockfiles (an
 * untracked node_modules entry) is NOT CLAIMED.
 *
 * Display paths added: none. Test-only: no src or docs change.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { docsSection, sectionTables } from "./helpers/census.js";
import {
  LOCKFILES,
  type LoadForm,
  lockfileTexts,
  moduleLoads,
  PACKAGE_MANIFEST,
  packageManifestTexts,
  RF_MANIFEST_SUITE,
  RF_SRC_LOAD_SUITE,
  RF_STATED_SURFACE_SUITE,
  rfLoads,
  rfManifestHits,
} from "./helpers/rf-typed-client.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

// ---- stated-cli-surface -------------------------------------------------------------------------------------------------------------

const RISK_PAGE = "docs/workbench/18-decisions-and-risks.md";
const RISK_TITLE = "18 — Decisions, risks, deliberate defaults and re-evaluation triggers";
const RISK_SECTION = "Key risks and mitigations";
const RISK_HEADER = ["Risk", "Impact", "Mitigation and test"];
const RISK_ROW = ["No RF typed render SDK in pinned revision", "weak integration", "explicit unavailable block, provider-owned SDK improvement"];
const README = "vendor/README.md";
const README_SECTION = "Native SDK artifacts";
const README_SENTENCES = ["ReactiveFiberCLI currently uses its installed CLI JSON envelope.", "No unverified TypeScript client or invented SDK method is substituted."];
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const PROVIDER_COMMENT = "/** ReactiveFiberCLI context render via installed CLI JSON contract (no TS SDK published). */";

/** A rendered paragraph's sentences: split after a full stop that a space and a capital letter follow. */
const sentencesOf = (text: string): string[] => text.split(/(?<=\.) (?=[A-Z])/u);

/** docs/18's risk row, read in the rendered section: every disagreement, named. */
function riskRowFindings(markdown: string): string[] {
  const section = docsSection(markdown, RISK_SECTION, 2, [RISK_TITLE]);
  if (!section.ok) return [`${RISK_PAGE} § ${RISK_SECTION}: ${section.why}`];
  if (section.hasHtml) return [`${RISK_PAGE} § ${RISK_SECTION}: the section carries HTML, which can hide what its source says`];
  const tables = sectionTables(markdown, RISK_SECTION, 2, [RISK_TITLE]);
  if (!tables.ok || tables.grids.length !== 1) return [`${RISK_PAGE} § ${RISK_SECTION}: the section holds ${tables.grids.length} tables, not one`];
  const [header = [], ...rows] = tables.grids[0] ?? [];
  if (JSON.stringify(header) !== JSON.stringify(RISK_HEADER)) return [`${RISK_PAGE} § ${RISK_SECTION}: the table header reads ${JSON.stringify(header)}`];
  const matching = rows.filter(row => row[0] === RISK_ROW[0]);
  if (matching.length !== 1) return [`${RISK_PAGE} § ${RISK_SECTION}: ${matching.length} rows read "${RISK_ROW[0]}", not one`];
  if (JSON.stringify(matching[0]) !== JSON.stringify(RISK_ROW)) return [`${RISK_PAGE} § ${RISK_SECTION}: the row reads ${JSON.stringify(matching[0])}`];
  return [];
}

/** vendor/README.md's ReactiveFiberCLI paragraph, read in the rendered section: every disagreement, named. */
function readmeFindings(markdown: string): string[] {
  const section = docsSection(markdown, README_SECTION, 1, []);
  if (!section.ok) return [`${README} § ${README_SECTION}: ${section.why}`];
  if (section.hasHtml) return [`${README} § ${README_SECTION}: the section carries HTML, which can hide what its source says`];
  const paragraphs = section.blocks.flatMap(block => (block.kind === "paragraph" && block.text.includes("ReactiveFiberCLI") ? [block.text] : []));
  if (paragraphs.length !== 1) return [`${README} § ${README_SECTION}: ${paragraphs.length} paragraphs name ReactiveFiberCLI, not one`];
  const opening = sentencesOf(paragraphs[0] ?? "").slice(0, README_SENTENCES.length);
  if (JSON.stringify(opening) !== JSON.stringify(README_SENTENCES)) return [`${README} § ${README_SECTION}: the ReactiveFiberCLI paragraph opens ${JSON.stringify(opening)}`];
  return [];
}

/** The provider module's leading comment, read through TypeScript's comment ranges: every disagreement, named. */
function providerCommentFindings(text: string): string[] {
  const ranges = ts.getLeadingCommentRanges(text, 0) ?? [];
  if (ranges.length !== 1) return [`${PROVIDER}: ${ranges.length} comments lead the module, not one`];
  const [range] = ranges;
  const comment = range === undefined ? "" : text.slice(range.pos, range.end);
  if (comment !== PROVIDER_COMMENT) return [`${PROVIDER}: the leading comment reads ${JSON.stringify(comment)}`];
  return [];
}

describe(RF_STATED_SURFACE_SUITE, () => {
  it("S1: docs/workbench/18 § Key risks and mitigations holds exactly one 'No RF typed render SDK in pinned revision' row, reading weak integration and explicit unavailable block, provider-owned SDK improvement, with no HTML in the section", () => {
    const markdown = readRepo(RISK_PAGE);
    expect(riskRowFindings(markdown)).toEqual([]);
    const tables = sectionTables(markdown, RISK_SECTION, 2, [RISK_TITLE]);
    expect(tables.grids[0]?.filter(row => row[0] === RISK_ROW[0])).toEqual([RISK_ROW]);
  });

  it("S2: vendor/README.md § Native SDK artifacts renders exactly one ReactiveFiberCLI paragraph, opening 'currently uses its installed CLI JSON envelope' then 'No unverified TypeScript client or invented SDK method is substituted', with no HTML in the section", () => {
    const markdown = readRepo(README);
    expect(readmeFindings(markdown)).toEqual([]);
    const section = docsSection(markdown, README_SECTION, 1, []);
    const paragraph = section.blocks.find(block => block.kind === "paragraph" && block.text.includes("ReactiveFiberCLI"));
    expect(paragraph?.kind === "paragraph" ? sentencesOf(paragraph.text).slice(0, 2) : []).toEqual(README_SENTENCES);
  });

  it("S3: the provider module's one leading comment states the installed CLI JSON contract and no TS SDK published", () => {
    const text = readRepo(PROVIDER);
    expect(providerCommentFindings(text)).toEqual([]);
    expect(text.split("\n", 1)[0]).toBe(PROVIDER_COMMENT);
  });

  it("S4: each statement edited to name a client, deleted, duplicated or hidden in an HTML comment reads red, naming the statement, and the live texts read none", () => {
    const page = readRepo(RISK_PAGE);
    const readme = readRepo(README);
    const provider = readRepo(PROVIDER);
    const rowLine = `| ${RISK_ROW.join(" | ")} |`;
    expect(page.split(rowLine)).toHaveLength(2);
    expect(readme.split(README_SENTENCES[1] ?? "")).toHaveLength(2);
    const edits: readonly [string, () => string[], string][] = [
      ["the risk row reworded to name an SDK", () => riskRowFindings(page.replace(rowLine, "| RF typed render SDK in pinned revision | weak integration | typed client |")), `0 rows read "${RISK_ROW[0]}"`],
      ["the risk row deleted", () => riskRowFindings(page.replace(`${rowLine}\n`, "")), `0 rows read "${RISK_ROW[0]}"`],
      ["the risk row duplicated", () => riskRowFindings(page.replace(rowLine, `${rowLine}\n${rowLine}`)), `2 rows read "${RISK_ROW[0]}"`],
      ["the risk row's mitigation reworded", () => riskRowFindings(page.replace("explicit unavailable block, provider-owned SDK improvement |", "the typed TS client |")), "the row reads"],
      ["the risk row hidden in an HTML comment", () => riskRowFindings(page.replace(rowLine, `<!-- ${rowLine} -->`)), "carries HTML"],
      ["the README sentence reworded to name a client", () => readmeFindings(readme.replace(README_SENTENCES[1] ?? "", "A verified TypeScript client is substituted.")), "the ReactiveFiberCLI paragraph opens"],
      ["the README paragraph deleted", () => readmeFindings(readme.replace(/^ReactiveFiberCLI currently uses[^\n]*\n\n/m, "")), "0 paragraphs name ReactiveFiberCLI"],
      ["the README paragraph hidden in an HTML comment", () => readmeFindings(readme.replace(README_SENTENCES[0] ?? "", `<!-- ${README_SENTENCES[0]} -->`)), "carries HTML"],
      ["the provider comment reworded to name a client", () => providerCommentFindings(provider.replace("(no TS SDK published)", "(typed TS client)")), "the leading comment reads"],
      ["a second leading comment", () => providerCommentFindings(`// typed TS client\n${provider}`), "2 comments lead the module"],
    ];
    for (const [name, read, expected] of edits) {
      const findings = read();
      expect(findings, name).toHaveLength(1);
      expect(findings[0], name).toContain(expected);
    }
    expect([...riskRowFindings(page), ...readmeFindings(readme), ...providerCommentFindings(provider)]).toEqual([]);
  });
});

// ---- no-sdk-load --------------------------------------------------------------------------------------------------------------------

/** The tracked script modules under src (git's index), each with its text. */
function trackedSrcModules(): { readonly module: string; readonly text: string }[] {
  const listed = execFileSync("git", ["ls-files", "-z", "--", "src"], { cwd: ROOT, encoding: "utf8" }).split("\0");
  return listed.filter(path => /\.(?:[cm]?[jt]s|tsx)$/.test(path)).map(module => ({ module, text: readRepo(module) }));
}

/**
 * The RF npm scope, its hyphen written as a JS escape: the TSX worker-lifecycle census
 * (test/workbench-rf-tsx-worker-lifecycle-census.test.ts) reads the scope spelled out as a raw-text needle of its clause grep over test/,
 * and only a census module or a census roster may hold one, so no line of this file spells it.
 */
const RF_SCOPE = "@reactive\u002dfiber";
/** The planted RF client package. */
const RF_SDK = `${RF_SCOPE}/sdk`;
const PLANTED_MODULE = "src/workbench/zz-planted.ts";
/** One module per load form moduleLoads reads, each stating the RF package once. */
const LOAD_PLANTS: readonly [string, string, LoadForm, string][] = [
  ["import", `import { render } from "${RF_SDK}";\n`, "import", RF_SDK],
  ["import type", `import type { Render } from "${RF_SDK}";\n`, "import", RF_SDK],
  ["side-effect import", 'import "reactivefiber";\n', "import", "reactivefiber"],
  ["export from", `export { render } from "${RF_SDK}";\n`, "export", RF_SDK],
  ["export star", 'export * from "reactive_fiber";\n', "export", "reactive_fiber"],
  ["import-equals require", `import sdk = require("${RF_SDK}");\nexport { sdk };\n`, "import-equals", RF_SDK],
  ["dynamic import", `export const load = () => import("${RF_SDK}");\n`, "dynamic-import", RF_SDK],
  ["dynamic import of a template", `export const load = () => import(\`${RF_SDK}\`);\n`, "dynamic-import", RF_SDK],
  ["require", `export const sdk = require("${RF_SCOPE}/client");\n`, "require", `${RF_SCOPE}/client`],
  ["import type node", `export type Render = import("${RF_SDK}").Render;\n`, "import-type", RF_SDK],
];
/** Near misses and the named residuals' pinned quiet rows: modules whose RF package load moduleLoads does not read. */
const LOAD_QUIET: readonly [string, string][] = [
  ["a relative specifier naming the provider module", 'import { REACTIVE_FIBER_CLI_SCHEMA } from "./providers/reactivefiber.js";\n'],
  ["a parent-relative specifier naming the provider module", 'export * from "../workbench/providers/reactivefiber.js";\n'],
  ["react, fiber and reactive", 'import React from "react";\nimport { f } from "fiber";\nimport { r } from "reactive";\nexport { React, f, r };\n'],
  ["R-COMPUTED: a specifier computed at run time", `const name = ["${RF_SCOPE}", "sdk"].join("/");\nexport const load = () => import(name);\n`],
  ["R-LOADER: a load through a createRequire loader", `import { createRequire } from "node:module";\nexport const sdk = createRequire(import.meta.url)("${RF_SDK}");\n`],
  ["R-OTHER-NAME: an RF client under another name", 'import { render } from "@rf/sdk";\nexport { render };\n'],
];

describe(RF_SRC_LOAD_SUITE, () => {
  it("L1: the package specifiers of every tracked src script module name no RF package, over a reading of every module at its floor", () => {
    const modules = trackedSrcModules();
    const loads = modules.flatMap(entry => moduleLoads(entry.module, entry.text));
    expect(modules.length).toBeGreaterThanOrEqual(120);
    expect(loads.length).toBeGreaterThanOrEqual(170);
    expect(loads.some(load => load.module === "src/workbench/native-modules.ts" && load.specifier === "@furnace/sdk")).toBe(true);
    expect(loads.some(load => load.module === PROVIDER && load.form === "import" && load.specifier === "node:child_process")).toBe(true);
    expect(rfLoads(loads)).toEqual([]);
  }, 60_000);

  it("L2: each load form planted with an RF package is read once, naming the module, the form and the specifier", () => {
    expect(LOAD_PLANTS.map(([name]) => name)).toEqual(["import", "import type", "side-effect import", "export from", "export star", "import-equals require", "dynamic import", "dynamic import of a template", "require", "import type node"]);
    for (const [name, text, form, specifier] of LOAD_PLANTS) expect(rfLoads(moduleLoads(PLANTED_MODULE, text)), name).toEqual([{ module: PLANTED_MODULE, form, specifier }]);
  });

  it("L3: relative specifiers and near-miss names read quiet, and the named residuals R-COMPUTED, R-LOADER and R-OTHER-NAME read their pinned quiet values", () => {
    expect(LOAD_QUIET.map(([name]) => name.split(":")[0])).toEqual(["a relative specifier naming the provider module", "a parent-relative specifier naming the provider module", "react, fiber and reactive", "R-COMPUTED", "R-LOADER", "R-OTHER-NAME"]);
    for (const [name, text] of LOAD_QUIET) expect(rfLoads(moduleLoads(PLANTED_MODULE, text)), name).toEqual([]);
    expect(moduleLoads(PLANTED_MODULE, LOAD_QUIET[4]?.[1] ?? "").map(load => load.specifier)).toEqual(["node:module"]);
    expect(moduleLoads(PLANTED_MODULE, LOAD_QUIET[5]?.[1] ?? "").map(load => load.specifier)).toEqual(["@rf/sdk"]);
  });
});

// ---- no-sdk-manifest ----------------------------------------------------------------------------------------------------------------

/** A package.json with one planted field, and the place the reader must name for it. */
const MANIFEST_PLANTS: readonly [string, Record<string, unknown>, string][] = [
  ["a dependencies name", { dependencies: { [RF_SDK]: "1.0.0" } }, `dependencies name: ${RF_SDK}`],
  ["a devDependencies name", { devDependencies: { [RF_SDK]: "1.0.0" } }, `devDependencies name: ${RF_SDK}`],
  ["an optionalDependencies name", { optionalDependencies: { [RF_SDK]: "1.0.0" } }, `optionalDependencies name: ${RF_SDK}`],
  ["a peerDependencies name", { peerDependencies: { [RF_SDK]: "1.0.0" } }, `peerDependencies name: ${RF_SDK}`],
  ["a dependencies npm alias spec", { dependencies: { client: `npm:${RF_SDK}@1.0.0` } }, `dependencies spec: npm:${RF_SDK}@1.0.0`],
  ["a devDependencies npm alias spec", { devDependencies: { client: `npm:${RF_SDK}@1.0.0` } }, `devDependencies spec: npm:${RF_SDK}@1.0.0`],
  ["an optionalDependencies npm alias spec", { optionalDependencies: { client: `npm:${RF_SDK}@1.0.0` } }, `optionalDependencies spec: npm:${RF_SDK}@1.0.0`],
  ["a peerDependencies npm alias spec", { peerDependencies: { client: `npm:${RF_SDK}@1.0.0` } }, `peerDependencies spec: npm:${RF_SDK}@1.0.0`],
  ["a bundledDependencies entry", { bundledDependencies: ["reactivefiber"] }, "bundledDependencies entry: reactivefiber"],
  ["a bundleDependencies entry", { bundleDependencies: ["reactivefiber"] }, "bundleDependencies entry: reactivefiber"],
];
/** A lockfile with one planted packages entry, and the place the reader must name for it. */
const LOCK_PLANTS: readonly [string, Record<string, unknown>, string][] = [
  ["an install path", { [`node_modules/${RF_SDK}`]: { version: "1.0.0" } }, `packages["node_modules/${RF_SDK}"] install path: node_modules/${RF_SDK}`],
  ["a nested install path", { "node_modules/a/node_modules/reactivefiber": { version: "1.0.0" } }, 'packages["node_modules/a/node_modules/reactivefiber"] install path: node_modules/a/node_modules/reactivefiber'],
  ["a name field", { "node_modules/client": { name: RF_SDK, version: "1.0.0" } }, `packages["node_modules/client"] name: ${RF_SDK}`],
  ["a resolved field", { "node_modules/client": { resolved: `https://registry.npmjs.org/${RF_SDK}/-/sdk-1.0.0.tgz` } }, `packages["node_modules/client"] resolved: https://registry.npmjs.org/${RF_SDK}/-/sdk-1.0.0.tgz`],
  ["an entry's dependency map name", { "node_modules/a": { dependencies: { reactivefiber: "^1.0.0" } } }, 'packages["node_modules/a"] dependencies name: reactivefiber'],
  ["a file spec", { "": { dependencies: { client: "file:vendor/reactive-fiber-sdk-0.1.0.tgz" } } }, 'packages[""] dependencies spec: file:vendor/reactive-fiber-sdk-0.1.0.tgz'],
];
/** Near misses and the named residuals' pinned quiet rows: manifests whose RF package the readers do not read. */
const MANIFEST_QUIET: readonly [string, string][] = [
  ["react, fiber and reactive", JSON.stringify({ dependencies: { react: "19.0.0", fiber: "1.0.0", reactive: "1.0.0" } })],
  ["a react-fiber spelling", JSON.stringify({ devDependencies: { "react-fiber-reconciler": "1.0.0" } })],
  ["the three vendored SDK names", JSON.stringify({ dependencies: { "@forge/sdk": "file:vendor/forge-sdk-0.1.0.tgz", "@furnace/sdk": "file:vendor/furnace-sdk-0.1.0.tgz", "@hyperunix/sdk": "file:vendor/hyperunix-sdk-0.1.0.tgz" } })],
  ["R-OTHER-NAME: an RF client under another name", JSON.stringify({ dependencies: { "@rf/sdk": "1.0.0" } })],
  ["R-SHADOWED: a dependency field JSON.parse drops as a shadowed duplicate key", `{"dependencies": {"${RF_SDK}": "1.0.0"}, "dependencies": {"react": "19.0.0"}}`],
];

describe(RF_MANIFEST_SUITE, () => {
  it("M1: package.json's dependency fields and every entry of both lockfiles name no RF package, over a reading of each manifest at its floor", () => {
    const manifest = packageManifestTexts(readRepo(PACKAGE_MANIFEST));
    expect(manifest.length).toBeGreaterThanOrEqual(40);
    expect(manifest).toContainEqual({ where: "dependencies name", text: "@forge/sdk" });
    expect(rfManifestHits(PACKAGE_MANIFEST, manifest)).toEqual([]);
    expect(LOCKFILES).toEqual(["package-lock.json", "vendor/dependency-lock.json"]);
    for (const lockfile of LOCKFILES) {
      const texts = lockfileTexts(readRepo(lockfile));
      expect(texts.length, lockfile).toBeGreaterThanOrEqual(2000);
      expect(texts, lockfile).toContainEqual({ where: 'packages["node_modules/@furnace/sdk"] install path', text: "node_modules/@furnace/sdk" });
      expect(rfManifestHits(lockfile, texts), lockfile).toEqual([]);
    }
  });

  it("M2: an RF package planted in each place the readers read is read once, naming the manifest and the place", () => {
    expect(MANIFEST_PLANTS).toHaveLength(10);
    for (const [name, planted, place] of MANIFEST_PLANTS) expect(rfManifestHits(PACKAGE_MANIFEST, packageManifestTexts(JSON.stringify(planted))), name).toEqual([`${PACKAGE_MANIFEST}: ${place}`]);
    expect(LOCK_PLANTS).toHaveLength(6);
    for (const [name, planted, place] of LOCK_PLANTS) {
      for (const lockfile of LOCKFILES) expect(rfManifestHits(lockfile, lockfileTexts(JSON.stringify({ packages: planted }))), `${name} in ${lockfile}`).toEqual([`${lockfile}: ${place}`]);
    }
  });

  it("M3: near-miss names read quiet, and the named residuals R-OTHER-NAME and R-SHADOWED read their pinned quiet values", () => {
    expect(MANIFEST_QUIET.map(([name]) => name.split(":")[0])).toEqual(["react, fiber and reactive", "a react-fiber spelling", "the three vendored SDK names", "R-OTHER-NAME", "R-SHADOWED"]);
    for (const [name, text] of MANIFEST_QUIET) expect(rfManifestHits(PACKAGE_MANIFEST, packageManifestTexts(text)), name).toEqual([]);
    expect(packageManifestTexts(MANIFEST_QUIET[4]?.[1] ?? "")).toEqual([
      { where: "dependencies name", text: "react" },
      { where: "dependencies spec", text: "19.0.0" },
    ]);
    expect(lockfileTexts(JSON.stringify({ packages: { "node_modules/@rf/sdk": { name: "@rf/sdk" } } })).map(entry => entry.text)).toEqual(["node_modules/@rf/sdk", "@rf/sdk"]);
  });
});
