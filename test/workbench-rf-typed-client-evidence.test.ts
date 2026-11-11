/**
 * wb-x32 (W10 ReactiveFiber provider/interop): the cases row R3 of the docs/07 provider-rules census binds
 * (test/workbench-docs07-provider-rules.census.ts). The sentence is the ReactiveFiberCLI provider's: "Do not declare a typed TS
 * context-render client exists without code evidence." The row's fourth half, declared-cli-contract, binds the wb-2j3.12 carrier
 * cases R2-1 and R2-3 (test/workbench-rf-contract-carrier.test.ts): both registered reactivefiber.render.preview descriptors
 * state the carrier as their contractSource, and the carrier names `reactive-fiber.cli/v1 context.render --no-commit`. The three
 * halves below are this file's, one describe each (test/helpers/rf-typed-client.ts names them; the census's R3 report anchor
 * holds each half to exactly the cases a report collects under its describe).
 *
 * PINNED READER SET (case id: assertion target; result observed at base ce180d82, rf-typed-client readers of this cut):
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
 *   S4: thirteen in-memory edits (STATEMENT_EDITS): each statement reworded to name a client, deleted or duplicated, the docs/18 row
 *       and the README paragraph also hidden in an HTML comment, the provider comment also joined by a second leading comment;
 *       each reads exactly one finding, naming its statement's file; the three live texts read none.
 *  src-load-forms, the specifiers moduleLoads reads in its fifteen LOAD_FORMS from the tracked src script modules:
 *   L1: SRC_SCRIPT_MODULE admits exactly the eight script extensions (.ts .tsx .mts .cts .js .jsx .mjs .cjs); every tracked src
 *       module it admits (git ls-files) is read by moduleLoads and holds no RF package specifier, over at least 120 modules and 180
 *       specifiers, with @furnace/sdk read in src/workbench/native-modules.ts, node:child_process in the provider and the
 *       import.meta.resolve of @forge/sdk in src/workbench/hosts/local-detached.ts. Observed: 124 modules, 185 specifiers (171
 *       import, 7 dynamic-import, 7 import-meta-resolve), no RF package specifier.
 *   L2: the forty-two LOAD_PLANTS (every LOAD_FORMS form at least once; the gate's three realized plants among them: a triple-slash
 *       types reference, a string-named ambient module declaration with a typed render export, module.require in a .cts module;
 *       require.resolve, globalThis.require, import.meta.resolve, a reference path into node_modules (with backslash separators
 *       too), a JSDoc import type in a .js module and in the first of two JSDoc comments, a .jsx, a .tsx and a .js module with the
 *       load inside JSX, a relative specifier through node_modules, and the argument, callee and member-object wrappers) each read
 *       exactly one RF load, naming the module, the form and the specifier.
 *   L3: the near misses (relative paths to Pi's own files, a segment that only contains node_modules, react, fiber and reactive)
 *       read quiet, and so do the pinned quiet rows of the named residuals: R-COMPUTED (a specifier computed at run time),
 *       R-LOADER (a load through a loader function value: a createRequire loader, require held under another name),
 *       R-INDIRECT-CALLEE (require reached through another expression: a comma expression, require.call), R-EVALUATED (a load in
 *       text evaluated at run time: eval, new Function), R-COMMENT (an import written in a line or block comment, or in a JSDoc
 *       comment the parser attaches to no node), R-PRAGMA (a JSX import source pragma) and R-OTHER-NAME (an RF client published under
 *       a name whose fold holds no reactivefiber, such as @rf/sdk); each row's whole reading is pinned.
 *  manifest-texts, every key and string value of package.json, package-lock.json and vendor/dependency-lock.json:
 *   M1: jsonTexts reads every key and every string value at any depth and jsonStringTokens every string token of the raw text; for
 *       each manifest the two readings are the same size (no string JSON.parse drops) and no text is an RF package text, over at
 *       least 100 package.json texts and 6000 texts per lockfile, with the @forge/sdk dependency key, the pi extension path and the
 *       node_modules/@furnace/sdk install path read. Observed: 120 package.json texts, 6946 texts in each lockfile, no RF package text.
 *   M2: the twenty-four MANIFEST_PLANTS (the gate's overrides alias among them, with overrides keys at depth, yarn resolutions, the
 *       imports map, peerDependenciesMeta, pnpm overrides, a script, a deep array entry, a JSON-escaped key and a shadowed duplicate
 *       key, plain and JSON-escaped) and the eight LOCK_PLANTS (a legacy dependencies tree among them), the latter in both lockfiles, each read exactly one
 *       RF text, naming the manifest and the place.
 *   M3: the near misses (react, fiber and reactive; a react-fiber spelling; the three vendored SDK names; reactive and fiber as two
 *       texts) read quiet, and so does the pinned quiet row of the named residual R-OTHER-NAME; each row's whole reading is pinned.
 *
 * NOT CLAIMED by these cases: Pi prose outside the three statements (another docs page, README.md, a src comment other than the
 * provider's leading one, a capability description) is NOT CLAIMED; a module outside src (test, qa, examples) is NOT CLAIMED; an
 * untracked src file and a src file of another extension are NOT CLAIMED; a load form outside LOAD_FORMS is NOT CLAIMED beyond the
 * named residuals' pinned quiet rows; TypeScript and bundler configuration (tsconfig paths, types or jsxImportSource) is NOT
 * CLAIMED; a manifest other than the three (a nested package.json, .npmrc, yarn.lock, pnpm-lock.yaml) is NOT CLAIMED; an install
 * outside the lockfiles (an untracked node_modules entry) is NOT CLAIMED.
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
  jsonStringTokens,
  jsonTexts,
  LOAD_FORMS,
  LOCKFILES,
  type LoadForm,
  moduleLoads,
  PACKAGE_MANIFEST,
  RF_MANIFEST_SUITE,
  RF_SRC_LOAD_SUITE,
  RF_STATED_SURFACE_SUITE,
  rfLoads,
  rfManifestHits,
  SRC_SCRIPT_MODULE,
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
/** The README's one ReactiveFiberCLI paragraph, a single source line, with the blank line after it. */
const README_PARAGRAPH = /^ReactiveFiberCLI currently uses[^\n]*\n\n/m;
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

  it("S4: each statement reworded to name a client, deleted or duplicated, the docs/18 row and the README paragraph also hidden in an HTML comment and the provider comment also joined by a second leading comment, reads exactly one finding naming its statement, and the live texts read none", () => {
    const page = readRepo(RISK_PAGE);
    const readme = readRepo(README);
    const provider = readRepo(PROVIDER);
    const rowLine = `| ${RISK_ROW.join(" | ")} |`;
    expect(page.split(rowLine)).toHaveLength(2);
    expect(readme.split(README_SENTENCES[1] ?? "")).toHaveLength(2);
    expect(readme.match(new RegExp(README_PARAGRAPH.source, "gm"))).toHaveLength(1);
    expect(provider.startsWith(`${PROVIDER_COMMENT}\n`)).toBe(true);
    const STATEMENT_EDITS: readonly [string, string, () => string[], string][] = [
      ["the risk row reworded to name an SDK", RISK_PAGE, () => riskRowFindings(page.replace(rowLine, "| RF typed render SDK in pinned revision | weak integration | typed client |")), `0 rows read "${RISK_ROW[0]}"`],
      ["the risk row's mitigation reworded to name a client", RISK_PAGE, () => riskRowFindings(page.replace("explicit unavailable block, provider-owned SDK improvement |", "the typed TS client |")), "the row reads"],
      ["the risk row deleted", RISK_PAGE, () => riskRowFindings(page.replace(`${rowLine}\n`, "")), `0 rows read "${RISK_ROW[0]}"`],
      ["the risk row duplicated", RISK_PAGE, () => riskRowFindings(page.replace(rowLine, `${rowLine}\n${rowLine}`)), `2 rows read "${RISK_ROW[0]}"`],
      ["the risk row hidden in an HTML comment", RISK_PAGE, () => riskRowFindings(page.replace(rowLine, `<!-- ${rowLine} -->`)), "carries HTML"],
      ["the README sentence reworded to name a client", README, () => readmeFindings(readme.replace(README_SENTENCES[1] ?? "", "A verified TypeScript client is substituted.")), "the ReactiveFiberCLI paragraph opens"],
      ["the README paragraph deleted", README, () => readmeFindings(readme.replace(README_PARAGRAPH, "")), "0 paragraphs name ReactiveFiberCLI"],
      ["the README paragraph duplicated", README, () => readmeFindings(readme.replace(README_PARAGRAPH, match => `${match}${match}`)), "2 paragraphs name ReactiveFiberCLI"],
      ["the README paragraph hidden in an HTML comment", README, () => readmeFindings(readme.replace(README_SENTENCES[0] ?? "", `<!-- ${README_SENTENCES[0]} -->`)), "carries HTML"],
      ["the provider comment reworded to name a client", PROVIDER, () => providerCommentFindings(provider.replace("(no TS SDK published)", "(typed TS client)")), "the leading comment reads"],
      ["the provider comment deleted", PROVIDER, () => providerCommentFindings(provider.replace(`${PROVIDER_COMMENT}\n`, "")), "0 comments lead the module"],
      ["the provider comment duplicated", PROVIDER, () => providerCommentFindings(`${PROVIDER_COMMENT}\n${provider}`), "2 comments lead the module"],
      ["the provider comment joined by a second leading comment", PROVIDER, () => providerCommentFindings(`// typed TS client\n${provider}`), "2 comments lead the module"],
    ];
    expect(STATEMENT_EDITS.map(([name]) => name)).toEqual([
      "the risk row reworded to name an SDK",
      "the risk row's mitigation reworded to name a client",
      "the risk row deleted",
      "the risk row duplicated",
      "the risk row hidden in an HTML comment",
      "the README sentence reworded to name a client",
      "the README paragraph deleted",
      "the README paragraph duplicated",
      "the README paragraph hidden in an HTML comment",
      "the provider comment reworded to name a client",
      "the provider comment deleted",
      "the provider comment duplicated",
      "the provider comment joined by a second leading comment",
    ]);
    for (const [name, statement, read, expected] of STATEMENT_EDITS) {
      const findings = read();
      expect(findings, name).toHaveLength(1);
      expect(findings[0], name).toContain(expected);
      expect(findings[0]?.startsWith(`${statement}`), name).toBe(true);
    }
    expect([...riskRowFindings(page), ...readmeFindings(readme), ...providerCommentFindings(provider)]).toEqual([]);
  });
});

// ---- src-load-forms -----------------------------------------------------------------------------------------------------------------

/** The tracked src files SRC_SCRIPT_MODULE admits (git's index), each with its text. */
function trackedSrcModules(): { readonly module: string; readonly text: string }[] {
  const listed = execFileSync("git", ["ls-files", "-z", "--", "src"], { cwd: ROOT, encoding: "utf8" }).split("\0");
  return listed.filter(path => SRC_SCRIPT_MODULE.test(path)).map(module => ({ module, text: readRepo(module) }));
}

/**
 * The RF npm scope, its hyphen written as a JS escape: the TSX worker-lifecycle census
 * (test/workbench-rf-tsx-worker-lifecycle-census.test.ts) reads the scope spelled out as a raw-text needle of its clause grep over test/,
 * and only a census module or a census roster may hold one, so no line of this file spells it.
 */
const RF_SCOPE = "@reactive\u002dfiber";
/** The planted RF client package. */
const RF_SDK = `${RF_SCOPE}/sdk`;
/** Planted module paths, one per script kind the plants need. */
const TS = "src/workbench/zz-planted.ts";
const CTS = "src/workbench/zz-planted.cts";
const DTS = "src/workbench/zz-planted.d.ts";
const JS = "src/workbench/zz-planted.js";
const JSX = "src/workbench/zz-planted.jsx";
const TSX = "src/workbench/zz-planted.tsx";
/** One module per planted spelling: [name, module, text, the form read, the specifier read]; every LOAD_FORMS form appears. */
const LOAD_PLANTS: readonly [string, string, string, LoadForm, string][] = [
  ["import", TS, `import { render } from "${RF_SDK}";\n`, "import", RF_SDK],
  ["import type", TS, `import type { Render } from "${RF_SDK}";\n`, "import", RF_SDK],
  ["side-effect import", TS, 'import "reactivefiber";\n', "import", "reactivefiber"],
  ["export from", TS, `export { render } from "${RF_SDK}";\n`, "export", RF_SDK],
  ["export star", TS, 'export * from "reactive_fiber";\n', "export", "reactive_fiber"],
  ["import-equals require", TS, `import sdk = require("${RF_SDK}");\nexport { sdk };\n`, "import-equals", RF_SDK],
  ["dynamic import", TS, `export const load = () => import("${RF_SDK}");\n`, "dynamic-import", RF_SDK],
  ["dynamic import of a template", TS, `export const load = () => import(\`${RF_SDK}\`);\n`, "dynamic-import", RF_SDK],
  ["require", TS, `export const sdk = require("${RF_SCOPE}/client");\n`, "require", `${RF_SCOPE}/client`],
  ["module.require in a .cts module", CTS, `export const sdk = module.require("${RF_SDK}");\n`, "member-require", RF_SDK],
  ["globalThis.require", TS, `export const sdk = globalThis.require("${RF_SDK}");\n`, "member-require", RF_SDK],
  ["a member named require through an element", TS, `export const sdk = self["require"]("${RF_SDK}");\n`, "member-require", RF_SDK],
  ["require.resolve", TS, `export const where = require.resolve("${RF_SDK}");\n`, "require-resolve", RF_SDK],
  ["require.resolve on a member named require", CTS, `export const where = module.require.resolve("${RF_SDK}");\n`, "require-resolve", RF_SDK],
  ["require.resolve on an element named require", CTS, `export const where = module["require"].resolve("${RF_SDK}");\n`, "require-resolve", RF_SDK],
  ["require.resolve through an element", TS, `export const where = require["resolve"]("${RF_SDK}");\n`, "require-resolve", RF_SDK],
  ["a member object in parentheses", TS, `export const where = (require).resolve("${RF_SDK}");\n`, "require-resolve", RF_SDK],
  ["import.meta.resolve", TS, `export const where = import.meta.resolve("${RF_SDK}");\n`, "import-meta-resolve", RF_SDK],
  ["import.meta.resolve through an element", TS, `export const where = import.meta["resolve"]("${RF_SDK}");\n`, "import-meta-resolve", RF_SDK],
  ["import type node", TS, `export type Render = import("${RF_SDK}").Render;\n`, "import-type", RF_SDK],
  ["an ambient module declaration with a typed render export", DTS, `declare module "${RF_SDK}" {\n  export function render(task: string): Promise<string>;\n}\n`, "ambient-module", RF_SDK],
  ["a shorthand ambient module declaration", DTS, `declare module "${RF_SDK}";\n`, "ambient-module", RF_SDK],
  ["a triple-slash types reference", TS, `/// <reference types="${RF_SDK}" />\nexport {};\n`, "reference-types", RF_SDK],
  ["a triple-slash reference path into node_modules", TS, `/// <reference path="../../node_modules/${RF_SDK}/index.d.ts" />\nexport {};\n`, "reference-path", `../../node_modules/${RF_SDK}/index.d.ts`],
  ["a reference path with backslash separators", TS, `/// <reference path="..\\..\\node_modules\\${RF_SCOPE}\\sdk\\index.d.ts" />\nexport {};\n`, "reference-path", `..\\..\\node_modules\\${RF_SCOPE}\\sdk\\index.d.ts`],
  ["a triple-slash amd-dependency", TS, `/// <amd-dependency path="${RF_SDK}" />\nexport {};\n`, "amd-dependency", RF_SDK],
  ["a JSDoc import type in a .js module", JS, `/** @type {import("${RF_SDK}").Render} */\nexport let render;\n`, "jsdoc-import-type", RF_SDK],
  ["a JSDoc import type in a .ts module", TS, `/** @param {import("${RF_SDK}").Task} task */\nexport function run(task: string): string {\n  return task;\n}\n`, "jsdoc-import-type", RF_SDK],
  ["a JSDoc import type in the first of two JSDoc comments", JS, `/** @typedef {import("${RF_SDK}").Render} Render */\n/** @type {number} */\nexport const count = 1;\n`, "jsdoc-import-type", RF_SDK],
  ["a JSDoc @import tag", JS, `/** @import { Render } from "${RF_SDK}" */\nexport let render;\n`, "jsdoc-import-tag", RF_SDK],
  ["a relative specifier through node_modules", TS, `import { render } from "../../node_modules/${RF_SDK}/index.js";\nexport { render };\n`, "import", `../../node_modules/${RF_SDK}/index.js`],
  ["a .jsx module, the load inside a JSX attribute", JSX, `import { Render } from "./render.js";\nexport const view = <Render sdk={require("${RF_SDK}")} />;\n`, "require", RF_SDK],
  ["a .tsx module, the load inside a JSX child", TSX, `export const view = <div>{require("${RF_SDK}")}</div>;\n`, "require", RF_SDK],
  ["a .js module, the load inside JSX", JS, `export const view = <div>{import("${RF_SDK}")}</div>;\n`, "dynamic-import", RF_SDK],
  ["an argument in parentheses", TS, `export const sdk = require(("${RF_SDK}"));\n`, "require", RF_SDK],
  ["an argument cast with as", TS, `export const sdk = require("${RF_SDK}" as string);\n`, "require", RF_SDK],
  ["an argument cast with satisfies", TS, `export const sdk = require("${RF_SDK}" satisfies string);\n`, "require", RF_SDK],
  ["an argument in an angle-bracket type assertion", TS, `export const sdk = require(<string>"${RF_SDK}");\n`, "require", RF_SDK],
  ["an argument with a non-null assertion", TS, `export const sdk = require("${RF_SDK}"!);\n`, "require", RF_SDK],
  ["an argument in nested wrappers", TS, `export const load = () => import((("${RF_SDK}" as string)!));\n`, "dynamic-import", RF_SDK],
  ["a callee in parentheses", TS, `export const sdk = (require)("${RF_SDK}");\n`, "require", RF_SDK],
  ["a callee with a non-null assertion", TS, `export const sdk = module.require!("${RF_SDK}");\n`, "member-require", RF_SDK],
];
/** Near misses and the named residuals' pinned quiet rows: [name, module, text], modules whose RF package load moduleLoads does not read. */
const LOAD_QUIET: readonly [string, string, string][] = [
  ["a relative specifier naming the provider module", TS, 'import { REACTIVE_FIBER_CLI_SCHEMA } from "./providers/reactivefiber.js";\n'],
  ["a parent-relative specifier naming the provider module", TS, 'export * from "../workbench/providers/reactivefiber.js";\n'],
  ["a reference path to the provider module", TS, '/// <reference path="./providers/reactivefiber.ts" />\nexport {};\n'],
  ["a path segment that only contains node_modules", TS, 'import { r } from "../not_node_modules/reactivefiber/index.js";\nexport { r };\n'],
  ["react, fiber and reactive", TS, 'import React from "react";\nimport { f } from "fiber";\nimport { r } from "reactive";\nexport { React, f, r };\n'],
  ["R-COMPUTED: a specifier computed at run time", TS, `const name = ["${RF_SCOPE}", "sdk"].join("/");\nexport const load = () => import(name);\nexport const sdk = require("${RF_SCOPE}" + "/sdk");\nexport const other = import(\`\${name}\`);\n`],
  ["R-LOADER: a load through a loader function value", TS, `import { createRequire } from "node:module";\nexport const sdk = createRequire(import.meta.url)("${RF_SDK}");\nconst load = require;\nexport const again = load("${RF_SDK}");\n`],
  ["R-INDIRECT-CALLEE: require reached through another expression", TS, `export const sdk = (0, require)("${RF_SDK}");\nexport const again = require.call(undefined, "${RF_SDK}");\n`],
  ["R-EVALUATED: a load in text evaluated at run time", TS, `export const sdk = eval('require("${RF_SDK}")');\nexport const make = new Function('return import("${RF_SDK}")');\n`],
  ["R-COMMENT: an import written in a comment no JSDoc reading takes", TS, `// import("${RF_SDK}")\n/* require("${RF_SDK}") */\nexport const list = [/** @type {import("${RF_SDK}").Render} */ 1];\n`],
  ["R-PRAGMA: a JSX import source pragma", TSX, `/** @jsxImportSource ${RF_SDK} */\nexport const view = <div />;\n`],
  ["R-OTHER-NAME: an RF client under another name", TS, 'import { render } from "@rf/sdk";\nexport { render };\n'],
];

describe(RF_SRC_LOAD_SUITE, () => {
  it("L1: the specifiers moduleLoads reads in its fifteen load forms from every tracked src module of the eight script extensions name no RF package, over a reading of every module at its floor", () => {
    const admitted = ["a.ts", "a.tsx", "a.mts", "a.cts", "a.js", "a.jsx", "a.mjs", "a.cjs", "a.d.ts"];
    const refused = ["a.json", "a.md", "a.d.json", "a.ts.map", "a.vue", "a.tsx.snap"];
    expect(admitted.filter(path => SRC_SCRIPT_MODULE.test(path))).toEqual(admitted);
    expect(refused.filter(path => SRC_SCRIPT_MODULE.test(path))).toEqual([]);
    expect(LOAD_FORMS).toHaveLength(15);
    const modules = trackedSrcModules();
    const loads = modules.flatMap(entry => moduleLoads(entry.module, entry.text));
    expect(modules.length).toBeGreaterThanOrEqual(120);
    expect(loads.length).toBeGreaterThanOrEqual(180);
    expect(loads.some(load => load.module === "src/workbench/native-modules.ts" && load.specifier === "@furnace/sdk")).toBe(true);
    expect(loads.some(load => load.module === PROVIDER && load.form === "import" && load.specifier === "node:child_process")).toBe(true);
    expect(loads.some(load => load.module === "src/workbench/hosts/local-detached.ts" && load.form === "import-meta-resolve" && load.specifier === "@forge/sdk")).toBe(true);
    expect(rfLoads(loads)).toEqual([]);
  }, 60_000);

  it("L2: each of the forty-two LOAD_PLANTS, every load form among them, reads exactly one RF load, naming the module, the form and the specifier", () => {
    expect(LOAD_PLANTS.map(([name]) => name)).toEqual([
      "import",
      "import type",
      "side-effect import",
      "export from",
      "export star",
      "import-equals require",
      "dynamic import",
      "dynamic import of a template",
      "require",
      "module.require in a .cts module",
      "globalThis.require",
      "a member named require through an element",
      "require.resolve",
      "require.resolve on a member named require",
      "require.resolve on an element named require",
      "require.resolve through an element",
      "a member object in parentheses",
      "import.meta.resolve",
      "import.meta.resolve through an element",
      "import type node",
      "an ambient module declaration with a typed render export",
      "a shorthand ambient module declaration",
      "a triple-slash types reference",
      "a triple-slash reference path into node_modules",
      "a reference path with backslash separators",
      "a triple-slash amd-dependency",
      "a JSDoc import type in a .js module",
      "a JSDoc import type in a .ts module",
      "a JSDoc import type in the first of two JSDoc comments",
      "a JSDoc @import tag",
      "a relative specifier through node_modules",
      "a .jsx module, the load inside a JSX attribute",
      "a .tsx module, the load inside a JSX child",
      "a .js module, the load inside JSX",
      "an argument in parentheses",
      "an argument cast with as",
      "an argument cast with satisfies",
      "an argument in an angle-bracket type assertion",
      "an argument with a non-null assertion",
      "an argument in nested wrappers",
      "a callee in parentheses",
      "a callee with a non-null assertion",
    ]);
    expect(LOAD_FORMS.filter(form => !LOAD_PLANTS.some(([, , , planted]) => planted === form))).toEqual([]);
    for (const [name, module, text, form, specifier] of LOAD_PLANTS) expect(rfLoads(moduleLoads(module, text)), name).toEqual([{ module, form, specifier }]);
  });

  it("L3: relative paths to Pi's own files and near-miss names read quiet, and the named residuals R-COMPUTED, R-LOADER, R-INDIRECT-CALLEE, R-EVALUATED, R-COMMENT, R-PRAGMA and R-OTHER-NAME read their pinned quiet values", () => {
    expect(LOAD_QUIET.map(([name]) => name.split(":")[0])).toEqual([
      "a relative specifier naming the provider module",
      "a parent-relative specifier naming the provider module",
      "a reference path to the provider module",
      "a path segment that only contains node_modules",
      "react, fiber and reactive",
      "R-COMPUTED",
      "R-LOADER",
      "R-INDIRECT-CALLEE",
      "R-EVALUATED",
      "R-COMMENT",
      "R-PRAGMA",
      "R-OTHER-NAME",
    ]);
    for (const [name, module, text] of LOAD_QUIET) expect(rfLoads(moduleLoads(module, text)), name).toEqual([]);
    expect(LOAD_QUIET.map(([, module, text]) => moduleLoads(module, text).map(load => `${load.form}:${load.specifier}`))).toEqual([
      [],
      [],
      [],
      [],
      ["import:react", "import:fiber", "import:reactive"],
      [],
      ["import:node:module"],
      [],
      [],
      [],
      [],
      ["import:@rf/sdk"],
    ]);
  });
});

// ---- manifest-texts -----------------------------------------------------------------------------------------------------------------

/** A jsonTexts place: the key and index chain from the root. */
const at = (...steps: readonly (string | number)[]): string => steps.map(step => (typeof step === "number" ? `[${step}]` : `[${JSON.stringify(step)}]`)).join("");
/** A package.json text with one planted RF text, and the place the reader must name for it: [name, text, place]. */
const MANIFEST_PLANTS: readonly [string, string, string][] = [
  ["a dependencies name", JSON.stringify({ dependencies: { [RF_SDK]: "1.0.0" } }), `${at("dependencies", RF_SDK)} key: ${RF_SDK}`],
  ["a devDependencies name", JSON.stringify({ devDependencies: { [RF_SDK]: "1.0.0" } }), `${at("devDependencies", RF_SDK)} key: ${RF_SDK}`],
  ["an optionalDependencies name", JSON.stringify({ optionalDependencies: { [RF_SDK]: "1.0.0" } }), `${at("optionalDependencies", RF_SDK)} key: ${RF_SDK}`],
  ["a peerDependencies name", JSON.stringify({ peerDependencies: { [RF_SDK]: "1.0.0" } }), `${at("peerDependencies", RF_SDK)} key: ${RF_SDK}`],
  ["a dependencies npm alias spec", JSON.stringify({ dependencies: { client: `npm:${RF_SDK}@1.0.0` } }), `${at("dependencies", "client")} value: npm:${RF_SDK}@1.0.0`],
  ["a devDependencies npm alias spec", JSON.stringify({ devDependencies: { client: `npm:${RF_SDK}@1.0.0` } }), `${at("devDependencies", "client")} value: npm:${RF_SDK}@1.0.0`],
  ["an optionalDependencies npm alias spec", JSON.stringify({ optionalDependencies: { client: `npm:${RF_SDK}@1.0.0` } }), `${at("optionalDependencies", "client")} value: npm:${RF_SDK}@1.0.0`],
  ["a peerDependencies npm alias spec", JSON.stringify({ peerDependencies: { client: `npm:${RF_SDK}@1.0.0` } }), `${at("peerDependencies", "client")} value: npm:${RF_SDK}@1.0.0`],
  ["a bundledDependencies entry", JSON.stringify({ bundledDependencies: ["reactivefiber"] }), `${at("bundledDependencies", 0)} value: reactivefiber`],
  ["a bundleDependencies entry", JSON.stringify({ bundleDependencies: ["reactivefiber"] }), `${at("bundleDependencies", 0)} value: reactivefiber`],
  ["an overrides npm alias spec", JSON.stringify({ overrides: { client: `npm:${RF_SDK}@1.0.0` } }), `${at("overrides", "client")} value: npm:${RF_SDK}@1.0.0`],
  ["an overrides key naming the package", JSON.stringify({ overrides: { [RF_SDK]: "1.0.0" } }), `${at("overrides", RF_SDK)} key: ${RF_SDK}`],
  ["a nested overrides key", JSON.stringify({ overrides: { client: { [RF_SDK]: "1.0.0" } } }), `${at("overrides", "client", RF_SDK)} key: ${RF_SDK}`],
  ["a yarn resolutions key", JSON.stringify({ resolutions: { [`**/${RF_SDK}`]: "1.0.0" } }), `${at("resolutions", `**/${RF_SDK}`)} key: **/${RF_SDK}`],
  ["a yarn resolutions value", JSON.stringify({ resolutions: { client: `npm:${RF_SDK}@1.0.0` } }), `${at("resolutions", "client")} value: npm:${RF_SDK}@1.0.0`],
  ["an imports map target", JSON.stringify({ imports: { "#rf": RF_SDK } }), `${at("imports", "#rf")} value: ${RF_SDK}`],
  ["an imports map condition target", JSON.stringify({ imports: { "#rf": { node: RF_SDK, default: "./rf.js" } } }), `${at("imports", "#rf", "node")} value: ${RF_SDK}`],
  ["a peerDependenciesMeta key", JSON.stringify({ peerDependenciesMeta: { [RF_SDK]: { optional: true } } }), `${at("peerDependenciesMeta", RF_SDK)} key: ${RF_SDK}`],
  ["a pnpm overrides key", JSON.stringify({ pnpm: { overrides: { [RF_SDK]: "1.0.0" } } }), `${at("pnpm", "overrides", RF_SDK)} key: ${RF_SDK}`],
  ["a script naming the package", JSON.stringify({ scripts: { render: `npx ${RF_SDK} render` } }), `${at("scripts", "render")} value: npx ${RF_SDK} render`],
  ["an array entry at depth", JSON.stringify({ workspaces: { packages: ["packages/reactive-fiber"] } }), `${at("workspaces", "packages", 0)} value: packages/reactive-fiber`],
  ["a key spelled with a JSON escape", '{"dependencies": {"@reactive\\u002dfiber/sdk": "1.0.0"}}', `${at("dependencies", RF_SDK)} key: ${RF_SDK}`],
  ["a shadowed duplicate key", `{"dependencies": {"${RF_SDK}": "1.0.0"}, "dependencies": {"react": "19.0.0"}}`, `a string JSON.parse drops (a shadowed duplicate key or its value): ${RF_SDK}`],
  ["a shadowed duplicate key spelled with a JSON escape", '{"dependencies": {"@reactive\\u002dfiber/sdk": "1.0.0"}, "dependencies": {"react": "19.0.0"}}', `a string JSON.parse drops (a shadowed duplicate key or its value): ${RF_SDK}`],
];
/** A lockfile text with one planted RF text, and the place the reader must name for it: [name, text, place]. */
const LOCK_PLANTS: readonly [string, string, string][] = [
  ["an install path", JSON.stringify({ lockfileVersion: 3, packages: { [`node_modules/${RF_SDK}`]: { version: "1.0.0" } } }), `${at("packages", `node_modules/${RF_SDK}`)} key: node_modules/${RF_SDK}`],
  ["a nested install path", JSON.stringify({ lockfileVersion: 3, packages: { "node_modules/a/node_modules/reactivefiber": { version: "1.0.0" } } }), `${at("packages", "node_modules/a/node_modules/reactivefiber")} key: node_modules/a/node_modules/reactivefiber`],
  ["a name field", JSON.stringify({ lockfileVersion: 3, packages: { "node_modules/client": { name: RF_SDK, version: "1.0.0" } } }), `${at("packages", "node_modules/client", "name")} value: ${RF_SDK}`],
  ["a resolved field", JSON.stringify({ lockfileVersion: 3, packages: { "node_modules/client": { resolved: `https://registry.npmjs.org/${RF_SDK}/-/sdk-1.0.0.tgz` } } }), `${at("packages", "node_modules/client", "resolved")} value: https://registry.npmjs.org/${RF_SDK}/-/sdk-1.0.0.tgz`],
  ["an entry's dependency map name", JSON.stringify({ lockfileVersion: 3, packages: { "node_modules/a": { dependencies: { reactivefiber: "^1.0.0" } } } }), `${at("packages", "node_modules/a", "dependencies", "reactivefiber")} key: reactivefiber`],
  ["a file spec", JSON.stringify({ lockfileVersion: 3, packages: { "": { dependencies: { client: "file:vendor/reactive-fiber-sdk-0.1.0.tgz" } } } }), `${at("packages", "", "dependencies", "client")} value: file:vendor/reactive-fiber-sdk-0.1.0.tgz`],
  ["an entry's peerDependenciesMeta key", JSON.stringify({ lockfileVersion: 3, packages: { "node_modules/a": { peerDependenciesMeta: { [RF_SDK]: { optional: true } } } } }), `${at("packages", "node_modules/a", "peerDependenciesMeta", RF_SDK)} key: ${RF_SDK}`],
  ["a legacy dependencies tree entry", JSON.stringify({ lockfileVersion: 2, packages: {}, dependencies: { [RF_SDK]: { version: "1.0.0" } } }), `${at("dependencies", RF_SDK)} key: ${RF_SDK}`],
];
/** Near misses and the named residual's pinned quiet row: [name, text], manifests whose RF package the readers do not read. */
const MANIFEST_QUIET: readonly [string, string][] = [
  ["react, fiber and reactive", JSON.stringify({ dependencies: { react: "19.0.0", fiber: "1.0.0", reactive: "1.0.0" } })],
  ["a react-fiber spelling", JSON.stringify({ devDependencies: { "react-fiber-reconciler": "1.0.0" } })],
  ["the three vendored SDK names", JSON.stringify({ dependencies: { "@forge/sdk": "file:vendor/forge-sdk-0.1.0.tgz", "@furnace/sdk": "file:vendor/furnace-sdk-0.1.0.tgz", "@hyperunix/sdk": "file:vendor/hyperunix-sdk-0.1.0.tgz" } })],
  ["reactive and fiber as two texts", JSON.stringify({ keywords: ["reactive", "fiber"] })],
  ["R-OTHER-NAME: an RF client under another name", JSON.stringify({ dependencies: { "@rf/sdk": "1.0.0" }, packages: { "node_modules/@rf/sdk": { name: "@rf/sdk" } } })],
];

describe(RF_MANIFEST_SUITE, () => {
  it("M1: no key or string value of package.json or of either lockfile, at any depth, is an RF package text, and no string of their raw text is one JSON.parse drops, over a reading of each manifest at its floor", () => {
    const manifestText = readRepo(PACKAGE_MANIFEST);
    const manifest = jsonTexts(manifestText);
    expect(manifest.length).toBeGreaterThanOrEqual(100);
    expect(manifest).toContainEqual({ where: `${at("dependencies", "@forge/sdk")} key`, text: "@forge/sdk" });
    expect(manifest).toContainEqual({ where: `${at("pi", "extensions", 0)} value`, text: "./src/index.ts" });
    expect(jsonStringTokens(manifestText)).toHaveLength(manifest.length);
    expect(rfManifestHits(PACKAGE_MANIFEST, manifestText)).toEqual([]);
    expect(LOCKFILES).toEqual(["package-lock.json", "vendor/dependency-lock.json"]);
    for (const lockfile of LOCKFILES) {
      const text = readRepo(lockfile);
      const texts = jsonTexts(text);
      expect(texts.length, lockfile).toBeGreaterThanOrEqual(6000);
      expect(texts, lockfile).toContainEqual({ where: `${at("packages", "node_modules/@furnace/sdk")} key`, text: "node_modules/@furnace/sdk" });
      expect(jsonStringTokens(text), lockfile).toHaveLength(texts.length);
      expect(rfManifestHits(lockfile, text), lockfile).toEqual([]);
    }
  });

  it("M2: each of the twenty-four MANIFEST_PLANTS and, in both lockfiles, each of the eight LOCK_PLANTS reads exactly one RF text, naming the manifest and the place", () => {
    expect(MANIFEST_PLANTS.map(([name]) => name)).toEqual([
      "a dependencies name",
      "a devDependencies name",
      "an optionalDependencies name",
      "a peerDependencies name",
      "a dependencies npm alias spec",
      "a devDependencies npm alias spec",
      "an optionalDependencies npm alias spec",
      "a peerDependencies npm alias spec",
      "a bundledDependencies entry",
      "a bundleDependencies entry",
      "an overrides npm alias spec",
      "an overrides key naming the package",
      "a nested overrides key",
      "a yarn resolutions key",
      "a yarn resolutions value",
      "an imports map target",
      "an imports map condition target",
      "a peerDependenciesMeta key",
      "a pnpm overrides key",
      "a script naming the package",
      "an array entry at depth",
      "a key spelled with a JSON escape",
      "a shadowed duplicate key",
      "a shadowed duplicate key spelled with a JSON escape",
    ]);
    for (const [name, text, place] of MANIFEST_PLANTS) expect(rfManifestHits(PACKAGE_MANIFEST, text), name).toEqual([`${PACKAGE_MANIFEST}: ${place}`]);
    expect(LOCK_PLANTS.map(([name]) => name)).toEqual([
      "an install path",
      "a nested install path",
      "a name field",
      "a resolved field",
      "an entry's dependency map name",
      "a file spec",
      "an entry's peerDependenciesMeta key",
      "a legacy dependencies tree entry",
    ]);
    for (const [name, text, place] of LOCK_PLANTS) {
      for (const lockfile of LOCKFILES) expect(rfManifestHits(lockfile, text), `${name} in ${lockfile}`).toEqual([`${lockfile}: ${place}`]);
    }
  });

  it("M3: near-miss names and reactive and fiber as two texts read quiet, and the named residual R-OTHER-NAME reads its pinned quiet value", () => {
    expect(MANIFEST_QUIET.map(([name]) => name.split(":")[0])).toEqual(["react, fiber and reactive", "a react-fiber spelling", "the three vendored SDK names", "reactive and fiber as two texts", "R-OTHER-NAME"]);
    for (const [name, text] of MANIFEST_QUIET) expect(rfManifestHits(PACKAGE_MANIFEST, text), name).toEqual([]);
    expect(MANIFEST_QUIET.map(([, text]) => jsonTexts(text).map(entry => entry.text))).toEqual([
      ["dependencies", "react", "19.0.0", "fiber", "1.0.0", "reactive", "1.0.0"],
      ["devDependencies", "react-fiber-reconciler", "1.0.0"],
      ["dependencies", "@forge/sdk", "file:vendor/forge-sdk-0.1.0.tgz", "@furnace/sdk", "file:vendor/furnace-sdk-0.1.0.tgz", "@hyperunix/sdk", "file:vendor/hyperunix-sdk-0.1.0.tgz"],
      ["keywords", "reactive", "fiber"],
      ["dependencies", "@rf/sdk", "1.0.0", "packages", "node_modules/@rf/sdk", "name", "@rf/sdk"],
    ]);
  });
});
