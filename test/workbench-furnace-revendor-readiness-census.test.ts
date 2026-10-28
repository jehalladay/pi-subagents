/**
 * wb-lrz.4 (FURNACE-FEEDBACK-RECONCILIATION-R4, program-triage-2026-10-17): the Furnace SDK re-vendor readiness census,
 * the until-then leg of a trigger-gated re-vendor. The bead's own row of the tracker export (.beads/issues.jsonl) is the
 * outside anchor. The clauses this census binds, verbatim from that row:
 *   statement: "until then no Pi change (the vendored 0.1.0 pin remains correct and today's fail-closed behaviour stands)";
 *   acceptance item 4: "Deep imports furnace-hosted.ts:37-38 re-measured: resolve against the new tarball, or switch to
 *   index re-exports if the regenerated SDK gains an exports map; version literals move in the same commit
 *   (furnace-observer.ts:24,108 sdk:'@furnace/sdk@<new>'; providers/furnace.ts:25,56 contractSource).";
 *   the notes' delta paragraph N5, clause (b): "the deep-import census includes `dist/src/durability.js`".
 * The trigger itself (a Furnace release commit whose acceptance register records A15, and the tarball packed there) lives
 * in Furnace's repository, which this census never reads: the gate is the tarball Pi vendors. When an owner commit
 * re-vendors, the U, V and D rows read the new tarball and red on whatever that commit leaves behind; until then they hold
 * the vendored state.
 *
 * MEASURED (read-only, by the cutting seat ws-06 of g10-work-s123, 2026-10-28T03:29Z, at this census's base f5589e0):
 * package.json resolves @furnace/sdk to file:vendor/furnace-sdk-0.1.0.tgz, whose own package.json names @furnace/sdk
 * 0.1.0 with main dist/src/index.js, types dist/src/index.d.ts and no exports field; neither index entry names EmbeddedHost
 * or ResidentSession; the tarball carries dist/src/embedded.js, dist/src/resident_session.js, dist/src/durability.js and
 * dist/src/executor.js, which derives a registration's profile through DurabilityProfile.fromDeclaration; its contract
 * manifest digest equals its generated provenance digest (sha256:2cf7c539f9f3...). vendor/README.md records the tarball as
 * wb-zby's repack from Furnace revision 9970621d8. src/ holds 116 scripts; three spell a versioned @furnace/sdk, five times
 * in all: the FurnaceReading source type's sdk member and the reading's sdk value (furnace-observer.ts), the legacy and
 * native furnace.run.inspect descriptors' contractSource (providers/furnace.ts) and the verified-protocol line of
 * furnace-hosted.ts's header. The only @furnace/sdk/<path> loads in src/ are furnace-hosted.ts's two deep imports.
 *
 * ROWS (each pin quotes the clause it binds, reads the real tree clean and reds each of its planted drifts):
 *  D, the deep imports (acceptance item 4, first half, and clause (b)): D1 every @furnace/sdk/<path> load in src/ (import and
 *   export declarations, import-equals, import types, import(), require() and *.resolve() calls, read through the TypeScript
 *   AST) is a DEEP row, read once, importing exactly the listed names; D2 each DEEP row resolves inside the vendored tarball
 *   to a regular entry whose declaration file exports the class; D3 no switch is owed: the tarball's package.json has no
 *   exports map and neither index entry (types, main) names a deep-imported class, so furnace-hosted.ts's header claim
 *   (HEADER_CLAIM) holds of the tarball; D4 the tarball still carries dist/src/durability.js and dist/src/executor.js still
 *   derives the profile from the declaration, every member false when none was - the module the hello-reply durability
 *   rows of wb-lrz.5 rest on.
 *  V, the version literals (acceptance item 4, second half): V1 every versioned @furnace/sdk spelling in src/ (the at form
 *   "@furnace/sdk@X.Y.Z", the space form "@furnace/sdk X.Y.Z" and the tarball form "furnace-sdk-X.Y.Z.tgz") belongs to a
 *   SITES row read its listed number of times, and each one names the vendored version; V2 the observer's sdk member and sdk
 *   value (AST) each name it, once; V3 both furnace.run.inspect contractSource literals (AST) begin with it.
 *  U, the until-then clause: U1 the vendored version is the clause's own 0.1.0, on package.json's spec and inside the
 *   tarball, and vendor/README.md still records the tarball as wb-zby's repack from Furnace revision 9970621d8 (the trigger
 *   has not fired); U2 the tarball's contract manifest digest equals its generated provenance digest, the condition the
 *   hosted adapter's decodeContextValue preflight admits (acceptance item 3); the refusal itself is the hosted suite's.
 *  Q, the residuals' pinned quiet rows (RESIDUALS below).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal.
 * OUTSIDE ANCHORS (their own registered case): acceptance item 4 is tiled in order by the quotes of D1, D2, D3, V1, V2 and V3,
 * and the statement's until-then parenthetical by U1 and U2, with nothing between two quotes but whitespace, comma,
 * semicolon, colon, period and parentheses; D4's quote is found in the notes. A pin removed from ROWS and the literal
 * together, or a quote shortened, leaves part of a clause untiled.
 * RESIDUALS (named, each with its pinned quiet row; every quiet row also runs a control spelled in a read form, so its plant
 * is shown to reach the judge): R-COMPUTED-VERSION a version spelling the raw text does not hold (joined at run time, or
 * escape-spelled) is not read by V1 (Q1); R-OTHER-SPELLING spellings outside V1's three forms ("v9.9.9", "furnace sdk 9.9.9",
 * "version 9.9.9") are not read (Q2); R-OUTSIDE-SRC V1 and D1 read src/ only - docs, test and qa files keep the versions
 * they measured, and a receipt never moves with a re-vendor (Q3); R-COMPUTED-SPECIFIER a load whose specifier is not one
 * string literal is not read by D1 (Q4).
 * NOT CLAIMED: what a re-vendor commit owes beyond these rows (acceptance items 1-3, 5 and 6: the vendor pins and the
 * dependency census pass on the new tarball, the live tiers re-run against a release-built binary, one re-vendor sequenced
 * with wb-zby); the hosted adapter's preflight refusal, which test/workbench-furnace-hosted.test.ts drives; a pin re-authored
 * together with its plants; a residual row removed from ROWS and the literal together (no outside anchor names the residual
 * families). A tarball entry stored under a pax or GNU long name reads as absent, so a row that needs it reds.
 * READS (contacts): package.json, vendor/README.md, the tarball package.json names (today vendor/furnace-sdk-0.1.0.tgz),
 * every script under src/, and the wb-lrz.4 row of .beads/issues.jsonl (its description, and its notes for clause (b): an
 * append to the notes is safe, a notes replace that drops the clause reds the anchor case).
 *
 * Display paths added: none (test-only; src/ is read, never edited). Scratch: none - every plant is an in-memory tree.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-lrz.4";
const EXPORT = ".beads/issues.jsonl";
const SDK = "@furnace/sdk";
const OBSERVER = "src/workbench/furnace-observer.ts";
const PROVIDER = "src/workbench/providers/furnace.ts";
const HOSTED = "src/workbench/hosts/furnace-hosted.ts";
/** The revision vendor/README.md records the vendored tarball as repacked from (wb-zby): the trigger has not fired. */
const ZBY_REVISION = "9970621d8";
/** furnace-hosted.ts's header claim about the vendored SDK, read with the comment leaders stripped. */
const HEADER_CLAIM = "The SDK exposes EmbeddedHost and ResidentSession only through deep imports (no index re-export, no exports map).";
const VERSION = String.raw`\d+\.\d+\.\d+(?:-[0-9A-Za-z][0-9A-Za-z.-]*)?`;
const SPEC = new RegExp(`^file:vendor/(furnace-sdk-(${VERSION})\\.tgz)$`);
const PROVENANCE = new RegExp(`(furnace-sdk-${VERSION}\\.tgz) was re-packaged on (\\d{4}-\\d{2}-\\d{2}) \\(wb-zby\\) from Furnace revision ([0-9a-f]{7,40})\\b`);
const SCRIPT = /\.(?:ts|tsx|mts|cts)$/;
const TRIGGERED = `the trigger has fired, and the re-vendor owes ${BEAD}'s acceptance on landing`;

type Form = "at" | "space" | "tarball";
const FORMS: readonly { readonly form: Form; readonly pattern: RegExp; readonly spell: (version: string) => string }[] = [
  { form: "at", pattern: new RegExp(`@furnace/sdk@(${VERSION})`, "g"), spell: (version) => `${SDK}@${version}` },
  { form: "space", pattern: new RegExp(`@furnace/sdk (${VERSION})(?![0-9A-Za-z])`, "g"), spell: (version) => `${SDK} ${version}` },
  { form: "tarball", pattern: new RegExp(`furnace-sdk-(${VERSION})\\.tgz`, "g"), spell: (version) => `furnace-sdk-${version}.tgz` },
];

/** A versioned @furnace/sdk spelling V1 holds to the vendored version: one file, one form, a fixed count. */
interface Site {
  readonly file: string;
  readonly form: Form;
  readonly count: number;
  readonly what: string;
}
const SITES: readonly Site[] = [
  { file: OBSERVER, form: "at", count: 2, what: "the FurnaceReading source type's sdk member and the reading's sdk value" },
  { file: PROVIDER, form: "at", count: 2, what: "the legacy and native furnace.run.inspect descriptors' contractSource" },
  { file: HOSTED, form: "space", count: 1, what: "the module header's verified-protocol line" },
];

/** A deep @furnace/sdk/<path> load D1 lists, with the names it imports. */
interface DeepImport {
  readonly file: string;
  readonly specifier: string;
  readonly names: readonly string[];
}
const DEEP: readonly DeepImport[] = [
  { file: HOSTED, specifier: `${SDK}/dist/src/embedded.js`, names: ["EmbeddedHost"] },
  { file: HOSTED, specifier: `${SDK}/dist/src/resident_session.js`, names: ["ResidentSession"] },
];

/** What the rows read: package.json's spec, the tarball it names (regular entries as text), the scripts and vendor/README.md. */
interface Tree {
  readonly spec: string | undefined;
  readonly tarball: ReadonlyMap<string, string>;
  readonly files: ReadonlyMap<string, string>;
  readonly readme: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const inSrc = (file: string): boolean => file.startsWith("src/") && SCRIPT.test(file);
const collapse = (text: string): string => text.replace(/\s+/g, " ").trim();

function scripts(dir: string): string[] {
  return readdirSync(join(REPO, dir), { withFileTypes: true })
    .flatMap((entry) => (entry.isDirectory() ? scripts(`${dir}/${entry.name}`) : entry.isFile() && SCRIPT.test(entry.name) ? [`${dir}/${entry.name}`] : []))
    .sort();
}

/** The regular-file entries of a gzip tar, by path, as UTF-8 text; every other entry kind is skipped. */
function tarEntries(gz: Buffer): Map<string, string> {
  const tar = gunzipSync(gz);
  const entries = new Map<string, string>();
  for (let at = 0; at + 512 <= tar.length; ) {
    const header = tar.subarray(at, at + 512);
    if (header.every((byte) => byte === 0)) break;
    const field = (start: number, end: number): string => {
      const raw = header.subarray(start, end);
      const nul = raw.indexOf(0);
      return raw.subarray(0, nul < 0 ? raw.length : nul).toString("utf8");
    };
    const size = Number.parseInt(field(124, 136).trim() || "0", 8);
    const type = field(156, 157);
    const name = field(0, 100);
    const prefix = field(345, 500);
    if (type === "0" || type === "") entries.set(prefix === "" ? name : `${prefix}/${name}`, tar.subarray(at + 512, at + 512 + size).toString("utf8"));
    at += 512 + Math.ceil(size / 512) * 512;
  }
  return entries;
}

function readTree(): Tree {
  const manifest: unknown = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
  const dependencies = isRecord(manifest) && isRecord(manifest.dependencies) ? manifest.dependencies : {};
  const raw = dependencies[SDK];
  const spec = typeof raw === "string" ? raw : undefined;
  const tarball = spec?.startsWith("file:") === true ? tarEntries(readFileSync(join(REPO, spec.slice("file:".length)))) : new Map<string, string>();
  return {
    spec,
    tarball,
    files: new Map(scripts("src").map((file) => [file, readFileSync(join(REPO, file), "utf8")])),
    readme: readFileSync(join(REPO, "vendor/README.md"), "utf8"),
  };
}

function jsonEntry(tree: Tree, path: string): Record<string, unknown> | undefined {
  const text = tree.tarball.get(path);
  if (text === undefined) return undefined;
  try {
    const value: unknown = JSON.parse(text);
    return isRecord(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

const PARSED = new Map<string, Map<string, ts.SourceFile>>();
function parsed(file: string, text: string): ts.SourceFile {
  let byText = PARSED.get(file);
  if (byText === undefined) {
    byText = new Map();
    PARSED.set(file, byText);
  }
  const hit = byText.get(text);
  if (hit !== undefined) return hit;
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  byText.set(text, source);
  return source;
}

function walk(node: ts.Node, visit: (node: ts.Node) => void): void {
  visit(node);
  ts.forEachChild(node, (child) => {
    walk(child, visit);
  });
}

const nameOf = (name: ts.PropertyName): string | undefined => (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name) ? name.text : undefined);

/** The module's leading JSDoc block, comment leaders stripped and whitespace collapsed. */
function moduleHeader(text: string): string {
  const block = /^\s*\/\*\*([\s\S]*?)\*\//.exec(text)?.[1] ?? "";
  return collapse(
    block
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, ""))
      .join(" "),
  );
}

/** The vendored identity: package.json's spec names furnace-sdk-<v>.tgz and the tarball's own package.json says @furnace/sdk <v>. */
function vendored(tree: Tree): { readonly version?: string; readonly tarballName?: string; readonly problems: readonly string[] } {
  const problems: string[] = [];
  const spec = tree.spec === undefined ? null : SPEC.exec(tree.spec);
  if (spec === null) problems.push(`package.json resolves ${SDK} to ${String(tree.spec)}, not a file:vendor/furnace-sdk-<version>.tgz tarball`);
  const pkg = jsonEntry(tree, "package/package.json");
  if (pkg?.name !== SDK) problems.push(`the vendored tarball's package.json names ${String(pkg?.name)}, not ${SDK}`);
  const version = typeof pkg?.version === "string" ? pkg.version : undefined;
  if (version === undefined) problems.push("the vendored tarball's package.json carries no version");
  else if (spec !== null && spec[2] !== version) problems.push(`the vendored tarball's package.json says ${version} where its file name says ${String(spec[2])}`);
  if (problems.length > 0 || version === undefined || spec === null) return { problems };
  return { version, tarballName: spec[1], problems };
}

/** One @furnace/sdk/<path> load: an import or export declaration, import-equals, import type, import(), require() or *.resolve(). */
function deepLoad(node: ts.Node): { readonly specifier: string; readonly names: readonly string[] } | undefined {
  const deep = (expression: ts.Node | undefined): string | undefined => (expression !== undefined && ts.isStringLiteralLike(expression) && expression.text.startsWith(`${SDK}/`) ? expression.text : undefined);
  if (ts.isImportDeclaration(node)) {
    const specifier = deep(node.moduleSpecifier);
    if (specifier === undefined) return undefined;
    const clause = node.importClause;
    const names: string[] = clause?.name === undefined ? [] : ["default"];
    const bindings = clause?.namedBindings;
    if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.push("*");
    if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) names.push((element.propertyName ?? element.name).text);
    return { specifier, names };
  }
  if (ts.isExportDeclaration(node)) {
    const specifier = deep(node.moduleSpecifier);
    if (specifier === undefined) return undefined;
    const clause = node.exportClause;
    return { specifier, names: clause !== undefined && ts.isNamedExports(clause) ? clause.elements.map((element) => (element.propertyName ?? element.name).text) : ["*"] };
  }
  if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
    const specifier = deep(node.moduleReference.expression);
    return specifier === undefined ? undefined : { specifier, names: ["*"] };
  }
  if (ts.isImportTypeNode(node)) {
    const argument = node.argument;
    const specifier = deep(ts.isLiteralTypeNode(argument) ? argument.literal : undefined);
    return specifier === undefined ? undefined : { specifier, names: ["type"] };
  }
  if (ts.isCallExpression(node)) {
    const callee = node.expression;
    const loads = callee.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(callee) && callee.text === "require") || (ts.isPropertyAccessExpression(callee) && callee.name.text === "resolve");
    const specifier = loads ? deep(node.arguments[0]) : undefined;
    return specifier === undefined ? undefined : { specifier, names: ["*"] };
  }
  return undefined;
}

const LOADS = new WeakMap<ts.SourceFile, readonly DeepImport[]>();
function deepLoads(tree: Tree): DeepImport[] {
  const found: DeepImport[] = [];
  for (const [file, text] of tree.files) {
    if (!inSrc(file)) continue;
    const source = parsed(file, text);
    let loads = LOADS.get(source);
    if (loads === undefined) {
      const read: DeepImport[] = [];
      walk(source, (node) => {
        const load = deepLoad(node);
        if (load !== undefined) read.push({ file, ...load });
      });
      loads = read;
      LOADS.set(source, loads);
    }
    found.push(...loads);
  }
  return found;
}

/** D1: every deep load in src/ is a DEEP row, read once, importing exactly the listed names. */
function deepImportSet(tree: Tree): string[] {
  const findings: string[] = [];
  const found = deepLoads(tree);
  const same = (a: DeepImport, b: DeepImport): boolean => a.file === b.file && a.specifier === b.specifier;
  for (const load of found) {
    const listed = DEEP.find((row) => same(row, load));
    if (listed === undefined) findings.push(`D1 unlisted deep import ${load.specifier} in ${load.file} (${load.names.join(", ")}): every ${SDK}/<path> load is re-measured on re-vendor, so list it`);
    else if (load.names.join(", ") !== listed.names.join(", ")) findings.push(`D1 ${load.file} imports ${load.names.join(", ")} from ${load.specifier}, listed ${listed.names.join(", ")}`);
  }
  for (const row of DEEP) {
    const read = found.filter((load) => same(row, load)).length;
    if (read !== 1) findings.push(`D1 listed deep import ${row.specifier} in ${row.file} is read ${read} times, not once`);
  }
  return findings;
}

/** D2: each DEEP row resolves to a regular tarball entry whose declaration file exports the imported class. */
function deepImportsResolve(tree: Tree): string[] {
  const findings: string[] = [];
  for (const row of DEEP) {
    const path = row.specifier.slice(`${SDK}/`.length);
    if (!tree.tarball.has(`package/${path}`)) {
      findings.push(`D2 ${row.specifier} does not resolve: the vendored tarball has no package/${path}`);
      continue;
    }
    const declarations = `package/${path.replace(/\.js$/, ".d.ts")}`;
    const text = tree.tarball.get(declarations) ?? "";
    for (const name of row.names) if (!new RegExp(`\\bexport\\s+declare\\s+class\\s+${name}\\b`).test(text)) findings.push(`D2 ${declarations} declares no exported class ${name}`);
  }
  return findings;
}

/** D3: no switch to index re-exports is owed - no exports map, no index entry naming a deep-imported class, the header claim standing. */
function noSwitchOwed(tree: Tree): string[] {
  const pkg = jsonEntry(tree, "package/package.json");
  if (pkg === undefined) return ["D3 the vendored tarball has no readable package/package.json"];
  const findings: string[] = [];
  if (Object.hasOwn(pkg, "exports")) findings.push("D3 the vendored SDK carries an exports map: switch the deep imports to index re-exports (acceptance 4)");
  for (const field of ["types", "main"] as const) {
    const entry = pkg[field];
    const text = typeof entry === "string" ? tree.tarball.get(`package/${entry}`) : undefined;
    if (text === undefined) {
      findings.push(`D3 the vendored SDK's ${field} entry ${String(entry)} is not in the tarball`);
      continue;
    }
    for (const name of DEEP.flatMap((row) => row.names)) {
      if (new RegExp(`\\b${name}\\b`).test(text)) findings.push(`D3 the vendored SDK's ${field} entry ${String(entry)} names ${name}: switch its deep import to the index re-export (acceptance 4)`);
    }
  }
  if (!moduleHeader(tree.files.get(HOSTED) ?? "").includes(HEADER_CLAIM)) findings.push(`D3 ${HOSTED}'s header no longer states the deep-import claim this row holds the vendored tarball to`);
  return findings;
}

/** D4: the durability module rides in the tarball and the executor derives an undeclared registration's profile as all-false. */
function durabilityModule(tree: Tree): string[] {
  const findings: string[] = [];
  for (const path of ["package/dist/src/durability.js", "package/dist/src/durability.d.ts"]) if (!tree.tarball.has(path)) findings.push(`D4 the vendored tarball has no ${path}`);
  const executor = tree.tarball.get("package/dist/src/executor.js") ?? "";
  for (const line of ["DurabilityProfile.fromDeclaration(options.durability)", "every member false when none was"]) {
    if (!executor.includes(line)) findings.push(`D4 package/dist/src/executor.js no longer reads ${JSON.stringify(line)}: re-run the hello-reply durability rows (wb-lrz.5) on the new tarball`);
  }
  return findings;
}

/** V1: every versioned spelling in src/ belongs to a SITES row read its listed number of times, each naming the vendored version. */
function versionLiterals(tree: Tree): string[] {
  const { version, problems } = vendored(tree);
  if (version === undefined) return problems.map((problem) => `V1 ${problem}`);
  const findings: string[] = [];
  const counts = new Map<string, number>();
  for (const [file, text] of tree.files) {
    if (!inSrc(file)) continue;
    for (const { form, pattern } of FORMS) {
      for (const match of text.matchAll(pattern)) {
        const key = `${file} (${form} form)`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
        if (match[1] !== version) findings.push(`V1 stale site ${key} names ${String(match[1])}; the vendored tarball is ${version}`);
      }
    }
  }
  for (const site of SITES) {
    const key = `${site.file} (${site.form} form)`;
    const read = counts.get(key) ?? 0;
    if (read !== site.count) findings.push(`V1 listed site ${key}, ${site.what}, is read ${read} times, listed ${site.count}`);
    counts.delete(key);
  }
  for (const [key, read] of counts) findings.push(`V1 unlisted site ${key}, read ${read} times: every versioned ${SDK} spelling in src/ moves with the vendored tarball, so list it`);
  return findings;
}

/** V2: the FurnaceReading source type's sdk member and the reading's sdk value each name the vendored version, once. */
function observerSdk(tree: Tree): string[] {
  const { version, problems } = vendored(tree);
  if (version === undefined) return problems.map((problem) => `V2 ${problem}`);
  const text = tree.files.get(OBSERVER);
  if (text === undefined) return [`V2 ${OBSERVER} is not listed`];
  const typed: string[] = [];
  const valued: string[] = [];
  walk(parsed(OBSERVER, text), (node) => {
    if (ts.isPropertySignature(node) && nameOf(node.name) === "sdk" && node.type !== undefined && ts.isLiteralTypeNode(node.type) && ts.isStringLiteralLike(node.type.literal)) typed.push(node.type.literal.text);
    if (ts.isPropertyAssignment(node) && nameOf(node.name) === "sdk" && ts.isStringLiteralLike(node.initializer)) valued.push(node.initializer.text);
  });
  const findings: string[] = [];
  for (const [what, values] of [
    ["the reading type's sdk member", typed],
    ["the reading's sdk value", valued],
  ] as const) {
    if (values.length !== 1) findings.push(`V2 ${OBSERVER} carries ${values.length} literals for ${what}, not one`);
    for (const value of values) if (value !== `${SDK}@${version}`) findings.push(`V2 ${what} is ${value}; the vendored tarball is ${version}`);
  }
  return findings;
}

/** V3: the legacy and native furnace.run.inspect descriptors' contractSource literals begin with the vendored version. */
function providerContractSource(tree: Tree): string[] {
  const { version, problems } = vendored(tree);
  if (version === undefined) return problems.map((problem) => `V3 ${problem}`);
  const text = tree.files.get(PROVIDER);
  if (text === undefined) return [`V3 ${PROVIDER} is not listed`];
  const values: string[] = [];
  walk(parsed(PROVIDER, text), (node) => {
    if (ts.isPropertyAssignment(node) && nameOf(node.name) === "contractSource" && ts.isStringLiteralLike(node.initializer)) values.push(node.initializer.text);
  });
  const findings: string[] = [];
  if (values.length !== 2) findings.push(`V3 ${PROVIDER} carries ${values.length} contractSource literals, not the two (legacy and native) registrations`);
  for (const value of values) if (!value.startsWith(`${SDK}@${version}:`)) findings.push(`V3 a furnace.run.inspect contractSource is ${value}; the vendored tarball is ${version}`);
  return findings;
}

const U1_QUOTE = "the vendored 0.1.0 pin remains correct";

/** U1: the vendored version is the clause's own, and vendor/README.md still records the tarball as wb-zby's repack. */
function untilThenPin(tree: Tree): string[] {
  const { version, tarballName, problems } = vendored(tree);
  if (version === undefined) return problems.map((problem) => `U1 ${problem}`);
  const findings: string[] = [];
  const clause = /\b(\d+\.\d+\.\d+)\b/.exec(U1_QUOTE)?.[1];
  if (version !== clause) findings.push(`U1 the vendored ${SDK} is ${version}, not the until-then ${String(clause)}: ${TRIGGERED}`);
  const recorded = PROVENANCE.exec(collapse(tree.readme));
  if (recorded === null) findings.push(`U1 vendor/README.md no longer records the vendored tarball as wb-zby's repack from Furnace revision ${ZBY_REVISION}: ${TRIGGERED}`);
  else {
    if (recorded[1] !== tarballName) findings.push(`U1 vendor/README.md records ${String(recorded[1])} as wb-zby's repack, not the vendored ${String(tarballName)}`);
    if (recorded[3] !== ZBY_REVISION) findings.push(`U1 vendor/README.md records the repack from Furnace revision ${String(recorded[3])}, not ${ZBY_REVISION}`);
  }
  return findings;
}

/** U2: the tarball's contract manifest digest equals its generated provenance digest (what the decodeContextValue preflight admits). */
function oneArtifact(tree: Tree): string[] {
  const manifest = jsonEntry(tree, "package/contract/manifest.json");
  const declared = typeof manifest?.smithy_model_digest === "string" ? manifest.smithy_model_digest : undefined;
  const generated = /sha256:[0-9a-f]{64}/.exec(tree.tarball.get("package/dist/contract/furnace-executor-contract/provenance.js") ?? "")?.[0];
  if (declared === undefined || generated === undefined) return [`U2 the vendored tarball carries no readable contract digest pair (manifest ${String(declared)}, provenance ${String(generated)})`];
  if (declared === generated) return [];
  return [`U2 the vendored tarball's manifest digest ${declared} differs from its generated provenance digest ${generated}: the decodeContextValue preflight fails closed on it (acceptance 3, the wb-zby failure mode)`];
}

// Plant builders: each returns a new tree and refuses a plant that changes nothing, so no plant is hollow.
function withFile(tree: Tree, file: string, text: string): Tree {
  return { ...tree, files: new Map([...tree.files, [file, text]]) };
}
function editFile(tree: Tree, file: string, edit: (text: string) => string): Tree {
  const text = tree.files.get(file);
  if (text === undefined) throw new Error(`a plant edits ${file}, which the tree does not list`);
  const next = edit(text);
  if (next === text) throw new Error(`a plant leaves ${file} unchanged`);
  return withFile(tree, file, next);
}
function editEntry(tree: Tree, path: string, edit: (text: string) => string | undefined): Tree {
  const text = tree.tarball.get(path);
  if (text === undefined) throw new Error(`a plant edits ${path}, which the tarball does not carry`);
  const next = edit(text);
  if (next === text) throw new Error(`a plant leaves ${path} unchanged`);
  const tarball = new Map(tree.tarball);
  if (next === undefined) tarball.delete(path);
  else tarball.set(path, next);
  return { ...tree, tarball };
}
function editReadme(tree: Tree, edit: (text: string) => string): Tree {
  const readme = edit(tree.readme);
  if (readme === tree.readme) throw new Error("a plant leaves vendor/README.md unchanged");
  return { ...tree, readme };
}
/** An owner re-vendor to `version`: package.json's spec and the tarball's own package.json move together. */
function revendor(tree: Tree, version: string): Tree {
  const moved = editEntry(tree, "package/package.json", (text) => text.replace(/"version": "[^"]+"/, `"version": "${version}"`));
  return { ...moved, spec: `file:vendor/furnace-sdk-${version}.tgz` };
}
/** Moves every versioned spelling in `files` to `version`. */
function bump(tree: Tree, version: string, ...files: readonly string[]): Tree {
  return files.reduce((next, file) => editFile(next, file, (text) => FORMS.reduce((moved, { pattern, spell }) => moved.replace(pattern, () => spell(version)), text)), tree);
}

type Judge = (tree: Tree) => string[];
type Source = "acceptance-4" | "statement" | "note-b";
interface Plant {
  readonly name: string;
  readonly tree: (real: Tree) => Tree;
  readonly findings: readonly string[];
}
interface JudgedPin {
  readonly kind: "judged";
  readonly id: string;
  readonly source: Source;
  readonly quote: string;
  readonly judge: Judge;
  readonly plants: readonly Plant[];
}
interface QuietPin {
  readonly kind: "quiet";
  readonly id: string;
  readonly residual: string;
  readonly judge: Judge;
  readonly quiet: (real: Tree) => Tree;
  readonly control: (real: Tree) => Tree;
}
type Pin = JudgedPin | QuietPin;
interface Row {
  readonly id: string;
  readonly pins: readonly Pin[];
}

const REAL = readTree();
// Warm the parse cache at collection, so no case pays for parsing every script under its timeout.
deepLoads(REAL);

const NEXT = "0.2.0";
const NEXT_SOURCE = `${SDK}@0.1.0:Furnace.runs.get().inspect`;
const REAL_DIGEST = (tree: Tree): string => String(jsonEntry(tree, "package/contract/manifest.json")?.smithy_model_digest);
const STALE_DIGEST = `sha256:${"e5995480".padEnd(64, "0")}`;

const ROWS: readonly Row[] = [
  {
    id: "D",
    pins: [
      {
        kind: "judged",
        id: "D1",
        source: "acceptance-4",
        quote: "Deep imports furnace-hosted.ts:37-38 re-measured",
        judge: deepImportSet,
        plants: [
          {
            name: "a new deep load in src/",
            tree: (real) => withFile(real, "src/workbench/plant-d1.ts", 'import { HostClient } from "@furnace/sdk/dist/src/host_client.js";\nexport const PLANTED = HostClient;\n'),
            findings: [`D1 unlisted deep import ${SDK}/dist/src/host_client.js in src/workbench/plant-d1.ts (HostClient): every ${SDK}/<path> load is re-measured on re-vendor, so list it`],
          },
          {
            name: "the embedded host taken from the index instead",
            tree: (real) => editFile(real, HOSTED, (text) => text.replace('import { EmbeddedHost } from "@furnace/sdk/dist/src/embedded.js";', 'import { EmbeddedHost } from "@furnace/sdk";')),
            findings: [`D1 listed deep import ${SDK}/dist/src/embedded.js in ${HOSTED} is read 0 times, not once`],
          },
          {
            name: "a second name through a listed path",
            tree: (real) => editFile(real, HOSTED, (text) => text.replace("import { ResidentSession } from", "import { ResidentSession, type ResidentSessionOptions } from")),
            findings: [`D1 ${HOSTED} imports ResidentSession, ResidentSessionOptions from ${SDK}/dist/src/resident_session.js, listed ResidentSession`],
          },
        ],
      },
      {
        kind: "judged",
        id: "D2",
        source: "acceptance-4",
        quote: "resolve against the new tarball",
        judge: deepImportsResolve,
        plants: [
          {
            name: "a tarball without the embedded host module",
            tree: (real) => editEntry(real, "package/dist/src/embedded.js", () => undefined),
            findings: [`D2 ${SDK}/dist/src/embedded.js does not resolve: the vendored tarball has no package/dist/src/embedded.js`],
          },
          {
            name: "a tarball whose resident session class is renamed",
            tree: (real) => editEntry(real, "package/dist/src/resident_session.d.ts", (text) => text.replace("export declare class ResidentSession", "export declare class ResidentChannel")),
            findings: ["D2 package/dist/src/resident_session.d.ts declares no exported class ResidentSession"],
          },
        ],
      },
      {
        kind: "judged",
        id: "D3",
        source: "acceptance-4",
        quote: "or switch to index re-exports if the regenerated SDK gains an exports map",
        judge: noSwitchOwed,
        plants: [
          {
            name: "a tarball that gains an exports map",
            tree: (real) => editEntry(real, "package/package.json", (text) => text.replace('"main": "dist/src/index.js",', '"main": "dist/src/index.js",\n  "exports": { ".": "./dist/src/index.js" },')),
            findings: ["D3 the vendored SDK carries an exports map: switch the deep imports to index re-exports (acceptance 4)"],
          },
          {
            name: "a tarball whose index re-exports the embedded host",
            tree: (real) => editEntry(real, "package/dist/src/index.d.ts", (text) => `${text}export { EmbeddedHost } from "./embedded.js";\n`),
            findings: ["D3 the vendored SDK's types entry dist/src/index.d.ts names EmbeddedHost: switch its deep import to the index re-export (acceptance 4)"],
          },
          {
            name: "the header claim dropped",
            tree: (real) => editFile(real, HOSTED, (text) => text.replace("(no index re-export, no exports map).", "(see the SDK index).")),
            findings: [`D3 ${HOSTED}'s header no longer states the deep-import claim this row holds the vendored tarball to`],
          },
        ],
      },
      {
        kind: "judged",
        id: "D4",
        source: "note-b",
        quote: "the deep-import census includes `dist/src/durability.js`",
        judge: durabilityModule,
        plants: [
          {
            name: "a tarball without the durability module",
            tree: (real) => editEntry(real, "package/dist/src/durability.js", () => undefined),
            findings: ["D4 the vendored tarball has no package/dist/src/durability.js"],
          },
          {
            name: "an executor that claims by default",
            tree: (real) => editEntry(real, "package/dist/src/executor.js", (text) => text.replaceAll("DurabilityProfile.fromDeclaration(options.durability)", "DurabilityProfile.fromDeclaration(options.durability ?? CLAIM_ALL)")),
            findings: ['D4 package/dist/src/executor.js no longer reads "DurabilityProfile.fromDeclaration(options.durability)": re-run the hello-reply durability rows (wb-lrz.5) on the new tarball'],
          },
        ],
      },
    ],
  },
  {
    id: "V",
    pins: [
      {
        kind: "judged",
        id: "V1",
        source: "acceptance-4",
        quote: "version literals move in the same commit",
        judge: versionLiterals,
        plants: [
          {
            name: "a re-vendor that leaves the hosted header behind",
            tree: (real) => bump(revendor(real, NEXT), NEXT, OBSERVER, PROVIDER),
            findings: [`V1 stale site ${HOSTED} (space form) names 0.1.0; the vendored tarball is ${NEXT}`],
          },
          {
            name: "an unlisted versioned spelling",
            tree: (real) => withFile(real, "src/workbench/plant-v1.ts", 'export const PINNED = "@furnace/sdk@0.1.0";\n'),
            findings: [`V1 unlisted site src/workbench/plant-v1.ts (at form), read 1 times: every versioned ${SDK} spelling in src/ moves with the vendored tarball, so list it`],
          },
          {
            name: "a listed site that stops spelling the version",
            tree: (real) => editFile(real, HOSTED, (text) => text.replace("(@furnace/sdk 0.1.0, furnace.executor.v1)", "(furnace.executor.v1)")),
            findings: [`V1 listed site ${HOSTED} (space form), the module header's verified-protocol line, is read 0 times, listed 1`],
          },
          {
            name: "a tarball whose own version disagrees with its file name",
            tree: (real) => editEntry(real, "package/package.json", (text) => text.replace(/"version": "[^"]+"/, `"version": "${NEXT}"`)),
            findings: [`V1 the vendored tarball's package.json says ${NEXT} where its file name says 0.1.0`],
          },
          {
            name: "a clean re-vendor (every site moved)",
            tree: (real) => bump(revendor(real, NEXT), NEXT, OBSERVER, PROVIDER, HOSTED),
            findings: [],
          },
        ],
      },
      {
        kind: "judged",
        id: "V2",
        source: "acceptance-4",
        quote: "furnace-observer.ts:24,108 sdk:'@furnace/sdk@<new>'",
        judge: observerSdk,
        plants: [
          {
            name: "a re-vendor that leaves the observer behind",
            tree: (real) => bump(revendor(real, NEXT), NEXT, PROVIDER, HOSTED),
            findings: [`V2 the reading type's sdk member is ${SDK}@0.1.0; the vendored tarball is ${NEXT}`, `V2 the reading's sdk value is ${SDK}@0.1.0; the vendored tarball is ${NEXT}`],
          },
          {
            name: "the reading's sdk value taken from a constant",
            tree: (real) => editFile(real, OBSERVER, (text) => text.replace("sdk:'@furnace/sdk@0.1.0',producerVersion", "sdk:OBSERVED_SDK,producerVersion")),
            findings: [`V2 ${OBSERVER} carries 0 literals for the reading's sdk value, not one`],
          },
        ],
      },
      {
        kind: "judged",
        id: "V3",
        source: "acceptance-4",
        quote: "providers/furnace.ts:25,56 contractSource",
        judge: providerContractSource,
        plants: [
          {
            name: "a re-vendor that leaves the provider behind",
            tree: (real) => bump(revendor(real, NEXT), NEXT, OBSERVER, HOSTED),
            findings: [`V3 a furnace.run.inspect contractSource is ${NEXT_SOURCE}; the vendored tarball is ${NEXT}`, `V3 a furnace.run.inspect contractSource is ${NEXT_SOURCE}; the vendored tarball is ${NEXT}`],
          },
          {
            name: "one registration's contractSource taken from a constant",
            tree: (real) => editFile(real, PROVIDER, (text) => text.replace(`contractSource:"${NEXT_SOURCE}"`, "contractSource:INSPECT_SOURCE")),
            findings: [`V3 ${PROVIDER} carries 1 contractSource literals, not the two (legacy and native) registrations`],
          },
        ],
      },
    ],
  },
  {
    id: "U",
    pins: [
      {
        kind: "judged",
        id: "U1",
        source: "statement",
        quote: U1_QUOTE,
        judge: untilThenPin,
        plants: [
          {
            name: "the trigger fires: a re-vendor to 0.2.0 with every site moved",
            tree: (real) => bump(revendor(real, NEXT), NEXT, OBSERVER, PROVIDER, HOSTED),
            findings: [`U1 the vendored ${SDK} is ${NEXT}, not the until-then 0.1.0: ${TRIGGERED}`, `U1 vendor/README.md records furnace-sdk-0.1.0.tgz as wb-zby's repack, not the vendored furnace-sdk-${NEXT}.tgz`],
          },
          {
            name: "the README records another provenance",
            tree: (real) => editReadme(real, (text) => text.replace("was re-packaged on 2026-10-17 (wb-zby) from Furnace revision 9970621d8", "was packed at a Furnace release commit")),
            findings: [`U1 vendor/README.md no longer records the vendored tarball as wb-zby's repack from Furnace revision ${ZBY_REVISION}: ${TRIGGERED}`],
          },
          {
            name: "the README names another revision",
            tree: (real) => editReadme(real, (text) => text.replace("Furnace revision 9970621d8", "Furnace revision 0123456789")),
            findings: [`U1 vendor/README.md records the repack from Furnace revision 0123456789, not ${ZBY_REVISION}`],
          },
        ],
      },
      {
        kind: "judged",
        id: "U2",
        source: "statement",
        quote: "and today's fail-closed behaviour stands",
        judge: oneArtifact,
        plants: [
          {
            name: "the wb-zby failure mode: generated validators from another model",
            tree: (real) => editEntry(real, "package/dist/contract/furnace-executor-contract/provenance.js", (text) => text.replace(/sha256:[0-9a-f]{64}/g, STALE_DIGEST)),
            findings: [`U2 the vendored tarball's manifest digest ${REAL_DIGEST(REAL)} differs from its generated provenance digest ${STALE_DIGEST}: the decodeContextValue preflight fails closed on it (acceptance 3, the wb-zby failure mode)`],
          },
          {
            name: "a tarball without its contract manifest",
            tree: (real) => editEntry(real, "package/contract/manifest.json", () => undefined),
            findings: [`U2 the vendored tarball carries no readable contract digest pair (manifest undefined, provenance ${REAL_DIGEST(REAL)})`],
          },
        ],
      },
    ],
  },
  {
    id: "Q",
    pins: [
      {
        kind: "quiet",
        id: "Q1",
        residual: "R-COMPUTED-VERSION",
        judge: versionLiterals,
        quiet: (real) => withFile(real, "src/workbench/plant-q1.ts", 'export const JOINED = "@furnace/sdk@" + "9.9.9";\nexport const ESCAPED = "\\u0040furnace/sdk@9.9.9";\n'),
        control: (real) => withFile(real, "src/workbench/plant-q1.ts", 'export const SPELLED = "@furnace/sdk@9.9.9";\n'),
      },
      {
        kind: "quiet",
        id: "Q2",
        residual: "R-OTHER-SPELLING",
        judge: versionLiterals,
        quiet: (real) => withFile(real, "src/workbench/plant-q2.ts", "// @furnace/sdk v9.9.9, furnace sdk 9.9.9, @furnace/sdk version 9.9.9\nexport {};\n"),
        control: (real) => withFile(real, "src/workbench/plant-q2.ts", "// @furnace/sdk 9.9.9\nexport {};\n"),
      },
      {
        kind: "quiet",
        id: "Q3",
        residual: "R-OUTSIDE-SRC",
        judge: (tree) => [...versionLiterals(tree), ...deepImportSet(tree)],
        quiet: (real) => withFile(withFile(real, "docs/workbench/plant-q3.md", "@furnace/sdk@9.9.9\n"), "test/plant-q3.test.ts", 'import "@furnace/sdk/dist/src/client.js";\n'),
        control: (real) => withFile(real, "src/workbench/plant-q3.ts", 'import "@furnace/sdk/dist/src/client.js";\nexport const PINNED = "@furnace/sdk@9.9.9";\n'),
      },
      {
        kind: "quiet",
        id: "Q4",
        residual: "R-COMPUTED-SPECIFIER",
        judge: deepImportSet,
        quiet: (real) => withFile(real, "src/workbench/plant-q4.ts", 'const BASE = "@furnace/sdk/dist/src/";\nexport const load = (): Promise<unknown> => import(BASE + "client.js");\n'),
        control: (real) => withFile(real, "src/workbench/plant-q4.ts", 'export const load = (): Promise<unknown> => import("@furnace/sdk/dist/src/client.js");\n'),
      },
    ],
  },
];

const PINS = ROWS.flatMap((row) => row.pins);
const JUDGED = PINS.filter((pin): pin is JudgedPin => pin.kind === "judged");
const QUIET = PINS.filter((pin): pin is QuietPin => pin.kind === "quiet");
const quotesOf = (source: Source): string[] => JUDGED.filter((pin) => pin.source === source).map((pin) => pin.quote);

/** The bead's own row of the tracker export: its description and notes. */
function beadRow(): { readonly description: string; readonly notes: string } {
  const text = readFileSync(join(REPO, EXPORT), "utf8");
  const key = `"id":"${BEAD}"`;
  const at = text.indexOf(key);
  if (at < 0 || text.indexOf(key, at + key.length) >= 0) throw new Error(`${EXPORT} must hold exactly one ${BEAD} row`);
  const end = text.indexOf("\n", at);
  const row: unknown = JSON.parse(text.slice(text.lastIndexOf("\n", at) + 1, end < 0 ? text.length : end));
  if (!isRecord(row) || row.id !== BEAD || typeof row.description !== "string") throw new Error(`${EXPORT}'s ${BEAD} row carries no description`);
  return { description: row.description, notes: typeof row.notes === "string" ? row.notes : "" };
}

/** The str literals of the description's one-line Python list ACCEPTANCE: ['...', "...", ...]. */
function acceptanceItems(description: string): string[] {
  const line = description.split("\n").find((candidate) => candidate.startsWith("ACCEPTANCE: ["));
  if (line === undefined) return [];
  const items: string[] = [];
  let at = "ACCEPTANCE: [".length;
  for (;;) {
    while (at < line.length && /[\s,]/.test(line.charAt(at))) at += 1;
    const quote = line.charAt(at);
    if (quote !== "'" && quote !== '"') break;
    let value = "";
    for (at += 1; at < line.length && line.charAt(at) !== quote; at += 1) {
      if (line.charAt(at) === "\\") at += 1;
      value += line.charAt(at);
    }
    items.push(value);
    at += 1;
  }
  return items;
}

/** The statement's until-then parenthetical, without its parentheses. */
function untilThen(description: string): string {
  const line = description.split("\n").find((candidate) => candidate.startsWith("STATEMENT: ")) ?? "";
  const open = "until then no Pi change (";
  const start = line.indexOf(open);
  const end = start < 0 ? -1 : line.indexOf(")", start + open.length);
  return end < 0 ? "" : line.slice(start + open.length, end);
}

const BETWEEN = /^[\s,;:.()]*/;
/** Problems tiling `text` with `quotes` in order, nothing between two quotes but whitespace and , ; : . ( ). */
function tile(text: string, quotes: readonly string[]): string[] {
  let rest = text;
  for (const quote of quotes) {
    rest = rest.replace(BETWEEN, "");
    if (!rest.startsWith(quote)) return [`the next clause reads ${JSON.stringify(rest.slice(0, 80))}, not ${JSON.stringify(quote)}`];
    rest = rest.slice(quote.length);
  }
  return rest.replace(BETWEEN, "") === "" ? [] : [`untiled tail ${JSON.stringify(rest)}`];
}

describe("wb-lrz.4 Furnace SDK re-vendor readiness census", () => {
  it("FROZEN SHAPE (standing rule 16): ROWS pins every row's id and pin count", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(["D:4", "V:3", "U:2", "Q:4"]);
  });

  it("OUTSIDE ANCHORS: wb-lrz.4's acceptance item 4 and its statement's until-then clause are tiled by the pins' quotes in ROWS order, and its notes hold D4's quote", () => {
    const row = beadRow();
    const acceptance = acceptanceItems(row.description);
    expect(acceptance).toHaveLength(6);
    expect(tile(acceptance[3] ?? "", quotesOf("acceptance-4"))).toEqual([]);
    expect(tile(untilThen(row.description), quotesOf("statement"))).toEqual([]);
    const notes = quotesOf("note-b");
    expect(notes).toHaveLength(1);
    for (const quote of notes) expect(row.notes.includes(quote), quote).toBe(true);
    expect(new Set(PINS.map((pin) => pin.id)).size).toBe(PINS.length);
    for (const row of ROWS) for (const pin of row.pins) expect(pin.id.startsWith(row.id), pin.id).toBe(true);
  });

  it.each(JUDGED)("$id reads the real tree clean: $quote", (pin) => {
    expect(pin.judge(REAL)).toEqual([]);
  });

  it.each(JUDGED)("$id reds each planted drift: $quote", (pin) => {
    expect(pin.plants.some((plant) => plant.findings.length > 0)).toBe(true);
    for (const plant of pin.plants) expect(pin.judge(plant.tree(REAL)), plant.name).toEqual(plant.findings);
  });

  it.each(QUIET)("$id is residual $residual's pinned quiet row: the plant reads as nothing, its read-form control as a finding", (pin) => {
    expect(pin.judge(REAL)).toEqual([]);
    expect(pin.judge(pin.quiet(REAL))).toEqual([]);
    expect(pin.judge(pin.control(REAL)).length).toBeGreaterThan(0);
  });
});
