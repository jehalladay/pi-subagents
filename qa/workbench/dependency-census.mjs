#!/usr/bin/env node
/**
 * dependency-census.mjs -- measured dependency and SDK version census (wb-cax.20, W22).
 *
 * A MEASUREMENT receipt. It records which versions are pinned where: the node runtime (node --version at run),
 * package.json engines and both lockfiles' root engines, every package.json pin and its vendor/dependency-lock.json
 * resolution, both lockfiles' integrity, and each vendored SDK tarball against the integrity the lock records. It also
 * reads the owner-authored declaration table in docs/workbench/17-packaging-and-operations.md and binds every declared
 * value to the live row it describes. The table is the declaration and this census only measures against it: it states
 * no declaration of its own and changes no pin. Every row is measured-with-source or unknown-with-reason; a value is
 * never defaulted.
 *
 *   node qa/workbench/dependency-census.mjs --write [--root DIR] [--fixture FILE]   record the census (no line numbers)
 *   node qa/workbench/dependency-census.mjs --check [--root DIR] [--fixture FILE]   drift guard + docs/17 declaration check
 *   node qa/workbench/dependency-census.mjs --receipt [--root DIR]                  print the receipt with the git revision
 *
 * Exit codes: 0 ok; 1 drift from the recorded census, or a docs/17 declaration that does not hold; 2 usage, or a census
 * that could not be measured (missing or unreadable vendor lock, unreadable vendor dir, no tarballs, unreadable fixture).
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const CENSUS_CONTRACT = "workbench.dependency-census/v1";
export const MEASURED_AT_RUN = "measured-at-run";
export const DOCS_17 = "docs/workbench/17-packaging-and-operations.md";
export const PIN_SECTIONS = Object.freeze(["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]);
/** Fields that locate a measurement inside one version of a file. The receipt carries them; the fixture does not. */
export const VOLATILE_FIELDS = Object.freeze(["at"]);
const LOCKED_SECTIONS = Object.freeze(["dependencies", "devDependencies", "optionalDependencies"]);
const ROOT_LOCK = "package-lock.json";
const VENDOR_LOCK = "vendor/dependency-lock.json";
const TARBALL = /^(.+)-(\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)\.tgz$/;
const TABLE_HEADING = /^## Declared support matrix\b/;
const TABLE_HEADER = Object.freeze(["Component", "Declared", "Where declared / how measured"]);
/** docs/17 names a tool by its short name where the lockfile keys it by package name. */
const PACKAGE_ALIASES = new Map([["biome", "@biomejs/biome"]]);

export class CensusError extends Error {
  constructor(message) {
    super(message);
    this.name = "CensusError";
  }
}

const describeError = error => (error instanceof Error ? error.message : String(error));
const isRecord = value => value !== null && typeof value === "object" && !Array.isArray(value);
const own = (record, key) => (isRecord(record) && Object.hasOwn(record, key) ? record[key] : undefined);
const sha512 = bytes => `sha512-${createHash("sha512").update(bytes).digest("base64")}`;

function readRequired(root, file, what) {
  try {
    return readFileSync(join(root, file));
  } catch (error) {
    throw new CensusError(`${what} unreadable at ${join(root, file)}: ${describeError(error)}`);
  }
}

function parseRequired(bytes, root, file, what) {
  try {
    return JSON.parse(bytes.toString("utf8"));
  } catch (error) {
    throw new CensusError(`${what} at ${join(root, file)} is not valid JSON: ${describeError(error)}`);
  }
}

/** Bytes of an optional census input, or why it cannot be read. Reasons name relative paths only (host-free). */
function readOptional(root, file) {
  try {
    return { bytes: readFileSync(join(root, file)) };
  } catch (error) {
    const code = isRecord(error) && typeof error.code === "string" ? error.code : "EUNKNOWN";
    return { reason: code === "ENOENT" ? `${file} is absent at the census root` : `${file} is unreadable at the census root (${code})` };
  }
}

function parseOptional(read, file) {
  if (read.reason !== undefined) return { reason: read.reason };
  try {
    return { value: JSON.parse(read.bytes.toString("utf8")) };
  } catch {
    return { reason: `${file} is not valid JSON` };
  }
}

function unknownRow(id, kind, name, source, reason) {
  return { id, kind, name, status: "unknown", source, reason };
}

function measuredRow(id, kind, name, version, source) {
  return { id, kind, name, status: "measured", version, source };
}

/** 1-based package.json line of each `"key":` inside each top-level object, keyed by [section, key]. */
function objectKeyLines(manifestText) {
  const lines = new Map();
  let section;
  manifestText.split("\n").forEach((text, index) => {
    const open = /^ {2}"([^"]+)"\s*:\s*\{/.exec(text);
    if (open) {
      section = open[1];
      return;
    }
    if (/^ {2}\}/.test(text)) {
      section = undefined;
      return;
    }
    const key = section === undefined ? null : /^ {4}"([^"]+)"\s*:/.exec(text);
    if (key) lines.set(JSON.stringify([section, key[1]]), index + 1);
  });
  return lines;
}

/** One row per engines key; one unknown `node` row when the file declares no engines at all. */
function enginesRows(file, source, engines, absentReason, lines) {
  if (!isRecord(engines) || Object.keys(engines).length === 0) {
    return [unknownRow(`engines:${file}:node`, "engines", "node", `${source}["node"]`, absentReason)];
  }
  return Object.keys(engines)
    .sort()
    .map(key => {
      const id = `engines:${file}:${key}`;
      const rowSource = `${source}[${JSON.stringify(key)}]`;
      const value = engines[key];
      if (typeof value !== "string" || value.length === 0) return unknownRow(id, "engines", key, rowSource, `${rowSource} is not a non-empty string`);
      const row = measuredRow(id, "engines", key, value, rowSource);
      const line = lines?.get(JSON.stringify(["engines", key]));
      if (line !== undefined) row.at = `${file}:${line}`;
      return row;
    });
}

const backticks = text => [...text.matchAll(/`([^`]+)`/g)].map(match => match[1]);
const firstMatch = (text, pattern) => pattern.exec(text)?.[1];
const declaration = (id, name, value, expected, checks) => ({ id, name, value, expected, checks });

function exactPin(name, component) {
  return {
    key: name,
    component,
    read: ({ declared }) => [
      declaration(`declared:${name}`, name, backticks(declared)[0], "backticked version", [
        `equals pin:dependencies:${name}`,
        `equals lock:dependencies:${name}`,
      ]),
    ],
  };
}

function vendoredSdk(name) {
  return {
    key: name,
    component: name,
    read: ({ declared }) => {
      const tokens = backticks(declared);
      const spec = tokens.find(token => token.startsWith("file:vendor/"));
      const tarball = spec?.slice("file:vendor/".length);
      return [
        declaration(`declared:${name}`, name, tokens.find(token => !token.startsWith("file:")), "backticked version", [
          `equals lock:dependencies:${name}`,
          ...(tarball === undefined ? [] : [`equals vendor:${tarball}`]),
        ]),
        declaration(`declared:${name}:spec`, name, spec, "backticked file:vendor/ spec", [
          `equals pin:dependencies:${name}`,
          `integrity-matches-lock vendor:${tarball}`,
        ]),
      ];
    },
  };
}

function readPeers({ declared, where }) {
  const peers = [...declared.matchAll(/`([^`]+)`\s+(>=[^\s,;]+)/g)];
  if (peers.length === 0) return [declaration("declared:peer", "peer", undefined, "backticked peer package with a >= range", [])];
  const tested = firstMatch(where, /lockfile's (\d+\.\d+\.\d+)/);
  return peers.flatMap(([, name, range]) => [
    declaration(`declared:peer:${name}`, name, range, "backticked peer package with a >= range", [`equals pin:peerDependencies:${name}`]),
    declaration(`declared:peer:${name}:tested`, name, tested, "lockfile's X.Y.Z tested version", [`equals lock:devDependencies:${name}`]),
  ]);
}

function readDevToolchain({ declared }) {
  const tools = [...declared.matchAll(/([A-Za-z][\w.-]*) `([^`]+)`/g)];
  if (tools.length === 0) return [declaration("declared:dev", "dev", undefined, "tool name with a backticked version", [])];
  return tools.map(([, tool, version]) => {
    const name = PACKAGE_ALIASES.get(tool) ?? tool;
    return declaration(`declared:dev:${name}`, name, version, "backticked version", [`equals lock:devDependencies:${name}`]);
  });
}

/**
 * One binding per docs/17 table component: the declared values the census reads from the row and the live row each
 * must agree with. A table row with no binding, and a binding with no table row, are both divergences.
 */
const BINDINGS = Object.freeze([
  {
    key: "node",
    component: "Node.js runtime",
    read: ({ declared }) => [
      declaration("declared:node:floor", "node", firstMatch(declared, /declared floor `([^`]+)`/), "declared floor in backticks", [
        "equals engines:package.json:node",
        "equals engines:package-lock.json:node",
        "equals engines:vendor/dependency-lock.json:node",
        "floor-of node:runtime",
      ]),
      // The tested-on version names the host the owner's gate ran on. It is recorded, so a table edit drifts against the
      // fixture, but it is not compared with this run's runtime: docs/17 says "the floor is the only declaration".
      declaration("declared:node:tested", "node", firstMatch(declared, /tested on (v\d+\.\d+\.\d+)/), "tested-on vX.Y.Z version", []),
    ],
  },
  exactPin("typescript", "TypeScript"),
  exactPin("@anthropic-ai/claude-agent-sdk", "@anthropic-ai/claude-agent-sdk"),
  vendoredSdk("@forge/sdk"),
  vendoredSdk("@furnace/sdk"),
  vendoredSdk("@hyperunix/sdk"),
  { key: "peer", component: "Pi host packages (peer)", read: readPeers },
  { key: "dev", component: "Test and lint toolchain (dev)", read: readDevToolchain },
]);

/** The docs/17 declaration table's data rows (cells + 1-based line), or why the table cannot be read. */
function readDeclarationTable(root) {
  const read = readOptional(root, DOCS_17);
  if (read.reason !== undefined) return { reason: read.reason };
  const lines = read.bytes.toString("utf8").split("\n");
  const start = lines.findIndex(line => TABLE_HEADING.test(line));
  if (start === -1) return { reason: `${DOCS_17} has no "## Declared support matrix" heading` };
  const rows = [];
  let header;
  for (let index = start + 1; index < lines.length && !lines[index].startsWith("## "); index++) {
    const line = lines[index].trimEnd();
    if (!line.startsWith("|")) continue;
    const cells = line
      .split("|")
      .slice(1, -1)
      .map(cell => cell.trim());
    if (header === undefined) {
      header = cells;
      continue;
    }
    if (cells.length > 0 && cells.every(cell => /^:?-{3,}:?$/.test(cell))) continue;
    rows.push({ cells, line: index + 1 });
  }
  if (header === undefined) return { reason: `${DOCS_17} declaration table has no header row` };
  if (JSON.stringify(header) !== JSON.stringify(TABLE_HEADER)) {
    return { reason: `${DOCS_17} declaration table header is not "${TABLE_HEADER.join(" | ")}"` };
  }
  return { rows };
}

const tableSource = component => `${DOCS_17} table row ${JSON.stringify(component)}`;

/** Declared rows in binding order, then every table row the census cannot bind (unbound, repeated or malformed). */
function declaredRows(root) {
  const table = readDeclarationTable(root);
  if (table.reason !== undefined) {
    return BINDINGS.map(binding =>
      unknownRow(`declared:${binding.key}`, "declared", binding.key, tableSource(binding.component), `the docs/17 declaration table cannot be read: ${table.reason}`),
    );
  }
  const used = new Set();
  const uniqueId = (id, line) => {
    const free = used.has(id) ? `${id}:line-${line}` : id;
    used.add(free);
    return free;
  };
  const bound = new Set(BINDINGS.map(binding => binding.component));
  const byComponent = new Map();
  const unbound = [];
  const unbind = (entry, reason) => {
    const component = entry.cells[0] ?? "";
    const slug = component.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || `line-${entry.line}`;
    const row = unknownRow(uniqueId(`declared:unbound:${slug}`, entry.line), "declared", component || slug, tableSource(component), reason);
    unbound.push({ ...row, at: `${DOCS_17}:${entry.line}` });
  };
  for (const entry of table.rows) {
    const component = entry.cells[0] ?? "";
    if (entry.cells.length !== TABLE_HEADER.length) unbind(entry, `the docs/17 declaration table row has ${entry.cells.length} cells, not ${TABLE_HEADER.length}`);
    else if (byComponent.has(component)) unbind(entry, `the docs/17 declaration table repeats component ${JSON.stringify(component)}`);
    else if (!bound.has(component)) {
      unbind(entry, `the docs/17 declaration table declares ${JSON.stringify(component)}, which this census has no binding for (extend qa/workbench/dependency-census.mjs)`);
    } else byComponent.set(component, entry);
  }
  const rows = [];
  for (const binding of BINDINGS) {
    const entry = byComponent.get(binding.component);
    if (entry === undefined) {
      rows.push(
        unknownRow(uniqueId(`declared:${binding.key}`, 0), "declared", binding.key, tableSource(binding.component), `the docs/17 declaration table has no row for component ${JSON.stringify(binding.component)}`),
      );
      continue;
    }
    const [, declared, where] = entry.cells;
    for (const item of binding.read({ declared, where })) {
      const id = uniqueId(item.id, entry.line);
      const at = `${DOCS_17}:${entry.line}`;
      const source = tableSource(binding.component);
      if (id !== item.id) rows.push({ ...unknownRow(id, "declared", item.name, source, `the docs/17 declaration table declares ${item.id} twice`), at });
      else if (item.value === undefined) {
        rows.push({ ...unknownRow(id, "declared", item.name, source, `the docs/17 declaration table row ${JSON.stringify(binding.component)} carries no ${item.expected}`), at });
      } else rows.push({ id, kind: "declared", name: item.name, status: "measured", version: item.value, checks: [...item.checks], source, at });
    }
  }
  return [...rows, ...unbound];
}

/** Compute the census rows for the tree at `root`. Throws CensusError when the census cannot be measured. */
export function computeCensus({ root, nodeVersion = process.version }) {
  const manifestBytes = readRequired(root, "package.json", "package.json");
  const manifestText = manifestBytes.toString("utf8");
  const manifest = parseRequired(manifestBytes, root, "package.json", "package.json");
  const vendorLockBytes = readRequired(root, VENDOR_LOCK, VENDOR_LOCK);
  const vendorLock = parseRequired(vendorLockBytes, root, VENDOR_LOCK, VENDOR_LOCK);
  const lockPackages = own(vendorLock, "packages");
  if (!isRecord(lockPackages)) throw new CensusError(`${VENDOR_LOCK} at ${join(root, VENDOR_LOCK)} has no packages table`);
  let vendorEntries;
  try {
    vendorEntries = readdirSync(join(root, "vendor"));
  } catch (error) {
    throw new CensusError(`vendor dir unreadable at ${join(root, "vendor")}: ${describeError(error)}`);
  }
  const tarballs = vendorEntries.filter(name => name.endsWith(".tgz")).sort();
  if (tarballs.length === 0) throw new CensusError(`no vendored tarball (*.tgz) found under ${join(root, "vendor")}`);
  const rootLockRead = readOptional(root, ROOT_LOCK);
  const rootLock = parseOptional(rootLockRead, ROOT_LOCK);
  const lines = objectKeyLines(manifestText);

  const rows = [];
  rows.push({
    id: "node:runtime",
    kind: "node-runtime",
    name: "node",
    status: "measured",
    version: nodeVersion,
    source: "node --version (process.version of the executing runtime)",
    label: MEASURED_AT_RUN,
  });

  rows.push(...enginesRows("package.json", "package.json engines", own(manifest, "engines"), "package.json declares no engines", lines));
  if (rootLock.reason !== undefined) {
    rows.push(unknownRow(`engines:${ROOT_LOCK}:node`, "engines", "node", `${ROOT_LOCK} packages[""].engines["node"]`, rootLock.reason));
  } else {
    const engines = own(own(own(rootLock.value, "packages"), ""), "engines");
    rows.push(...enginesRows(ROOT_LOCK, `${ROOT_LOCK} packages[""].engines`, engines, `${ROOT_LOCK} packages[""] declares no engines`));
  }
  const vendorEngines = own(own(lockPackages, ""), "engines");
  rows.push(...enginesRows(VENDOR_LOCK, `${VENDOR_LOCK} packages[""].engines`, vendorEngines, `${VENDOR_LOCK} packages[""] declares no engines`));

  for (const section of PIN_SECTIONS) {
    const pins = own(manifest, section);
    if (!isRecord(pins)) continue;
    for (const name of Object.keys(pins).sort()) {
      const id = `pin:${section}:${name}`;
      const source = `package.json ${section}[${JSON.stringify(name)}]`;
      const value = pins[name];
      if (typeof value !== "string" || value.length === 0) {
        rows.push(unknownRow(id, "package-pin", name, source, `${source} is not a non-empty string`));
        continue;
      }
      const row = measuredRow(id, "package-pin", name, value, source);
      const line = lines.get(JSON.stringify([section, name]));
      if (line !== undefined) row.at = `package.json:${line}`;
      rows.push(row);
    }
  }

  for (const section of LOCKED_SECTIONS) {
    const pins = own(manifest, section);
    if (!isRecord(pins)) continue;
    for (const name of Object.keys(pins).sort()) {
      const id = `lock:${section}:${name}`;
      const key = `node_modules/${name}`;
      const source = `${VENDOR_LOCK} packages[${JSON.stringify(key)}]`;
      const entry = own(lockPackages, key);
      const version = own(entry, "version");
      if (typeof version !== "string" || version.length === 0) {
        rows.push(unknownRow(id, "lock-resolution", name, source, `${VENDOR_LOCK} has no resolved version for ${key}`));
        continue;
      }
      const row = measuredRow(id, "lock-resolution", name, version, source);
      const integrity = own(entry, "integrity");
      if (typeof integrity === "string") row.integrity = integrity;
      rows.push(row);
    }
  }

  if (rootLock.reason !== undefined) {
    rows.push(unknownRow(`lockfile:${ROOT_LOCK}`, "lockfile", ROOT_LOCK, ROOT_LOCK, rootLock.reason));
  } else {
    rows.push(lockfileRow(ROOT_LOCK, rootLockRead.bytes, rootLock.value, { matchesVendorLock: rootLockRead.bytes.equals(vendorLockBytes) }));
  }
  rows.push(lockfileRow(VENDOR_LOCK, vendorLockBytes, vendorLock, {}));

  for (const file of tarballs) {
    const id = `vendor:${file}`;
    const source = `vendor/${file}`;
    const match = TARBALL.exec(file);
    const integrity = sha512(readRequired(root, source, "vendored tarball"));
    if (!match) {
      rows.push({ ...unknownRow(id, "vendor-tarball", file, source, `tarball filename ${file} carries no name-version.tgz version`), integrity });
      continue;
    }
    const lockEntry = Object.values(lockPackages).find(entry => own(entry, "resolved") === `file:vendor/${file}`);
    const lockIntegrity = own(lockEntry, "integrity");
    if (typeof lockIntegrity !== "string") {
      rows.push({ ...unknownRow(id, "vendor-tarball", match[1], source, `${VENDOR_LOCK} has no integrity for file:vendor/${file}`), integrity });
      continue;
    }
    rows.push({
      ...measuredRow(id, "vendor-tarball", match[1], match[2], source),
      integrity,
      lockIntegrity,
      integrityMatchesLock: integrity === lockIntegrity,
    });
  }

  rows.push(...declaredRows(root));
  return { contract: CENSUS_CONTRACT, rows };
}

function lockfileRow(file, bytes, lock, extra) {
  const integrity = sha512(bytes);
  const lockfileVersion = own(lock, "lockfileVersion");
  if (typeof lockfileVersion !== "number") {
    return { ...unknownRow(`lockfile:${file}`, "lockfile", file, file, `${file} carries no numeric lockfileVersion`), integrity, ...extra };
  }
  return { ...measuredRow(`lockfile:${file}`, "lockfile", file, `lockfileVersion ${lockfileVersion}`, file), integrity, ...extra };
}

/** The recorded form of a census: every row without its volatile fields (line numbers). */
export function recordCensus(census) {
  return { contract: census.contract, rows: census.rows.map(recordable) };
}

function recordable(row) {
  return Object.fromEntries(Object.entries(row).filter(([field]) => !VOLATILE_FIELDS.includes(field)));
}

/**
 * Compare a recorded census with a live one. Returns [] when no recorded row diverges; otherwise one entry per divergent
 * field, each naming the row id. Rows labeled measured-at-run are observations of this run, not pins, and are skipped;
 * volatile fields (line numbers) never take part, so a pin that only moved to another line is not a divergence.
 */
export function compareCensus(recorded, live) {
  const drifts = [];
  const liveById = new Map(live.rows.map(row => [row.id, row]));
  const recordedIds = new Set();
  for (const was of recorded.rows) {
    recordedIds.add(was.id);
    if (was.label === MEASURED_AT_RUN) continue;
    const now = liveById.get(was.id);
    if (now === undefined) {
      drifts.push({ row: was.id, field: "row", recorded: "present", live: "absent" });
      continue;
    }
    const before = recordable(was);
    const after = recordable(now);
    for (const field of [...new Set([...Object.keys(before), ...Object.keys(after)])].sort()) {
      if (JSON.stringify(before[field]) !== JSON.stringify(after[field])) drifts.push({ row: was.id, field, recorded: before[field], live: after[field] });
    }
  }
  for (const now of live.rows) {
    if (now.label === MEASURED_AT_RUN || recordedIds.has(now.id)) continue;
    drifts.push({ row: now.id, field: "row", recorded: "absent", live: "present" });
  }
  return drifts;
}

/** `>=A[.B[.C]]` floor against a `vX.Y.Z` runtime version. */
function floorOf(declared, bound) {
  const floor = /^>=\s*v?(\d+)(?:\.(\d+))?(?:\.(\d+))?$/.exec(declared.version);
  const actual = /^v?(\d+)\.(\d+)\.(\d+)/.exec(bound.version);
  if (!floor) return { live: bound.version, holds: false, reason: `declared floor ${declared.version} is not a single >= bound this census evaluates` };
  if (!actual) return { live: bound.version, holds: false, reason: `runtime version ${bound.version} is not vX.Y.Z` };
  for (let part = 1; part <= 3; part++) {
    const want = Number(floor[part] ?? 0);
    const have = Number(actual[part]);
    if (have !== want) return { live: bound.version, holds: have > want };
  }
  return { live: bound.version, holds: true };
}

const RELATIONS = new Map([
  ["equals", (declared, bound) => ({ live: bound.version, holds: bound.version === declared.version })],
  ["floor-of", floorOf],
  ["integrity-matches-lock", (_declared, bound) => ({ live: String(bound.integrityMatchesLock), holds: bound.integrityMatchesLock === true })],
]);

/** Every docs/17 declaration check: the declared row, the live row it binds, both values and whether it holds. */
export function evaluateDeclarations(census) {
  const byId = new Map(census.rows.map(row => [row.id, row]));
  const results = [];
  for (const entry of census.rows) {
    if (entry.kind !== "declared") continue;
    if (entry.status !== "measured") {
      results.push({ row: entry.id, check: "declared", holds: false, reason: entry.reason });
      continue;
    }
    for (const check of entry.checks) {
      const space = check.indexOf(" ");
      const relation = RELATIONS.get(check.slice(0, space));
      const target = check.slice(space + 1);
      const bound = byId.get(target);
      const result = { row: entry.id, check, declared: entry.version };
      if (relation === undefined) results.push({ ...result, holds: false, reason: `no relation ${check.slice(0, space)}` });
      else if (bound === undefined) results.push({ ...result, holds: false, reason: `bound row ${target} is absent from the census` });
      else if (bound.status !== "measured") results.push({ ...result, holds: false, reason: `bound row ${target} is unknown: ${bound.reason}` });
      else results.push({ ...result, ...relation(entry, bound) });
    }
  }
  return results;
}

/** The docs/17 declaration checks that do not hold (each names the declared row and the live row it binds). */
export function compareDeclarations(census) {
  return evaluateDeclarations(census).filter(result => !result.holds);
}

export function formatDrift(drifts) {
  if (drifts.length === 0) return "no drift: live pins match the recorded census";
  return [
    `dependency census drift in ${drifts.length} place(s); regenerate with: node qa/workbench/dependency-census.mjs --write`,
    ...drifts.map(d => `  row ${d.row}: ${d.field} recorded=${JSON.stringify(d.recorded)} live=${JSON.stringify(d.live)}`),
  ].join("\n");
}

export function formatDeclarationDrift(failures) {
  if (failures.length === 0) return `every ${DOCS_17} declaration holds against the live tree`;
  return [
    `docs/17 declaration divergence in ${failures.length} place(s); ${DOCS_17} and the live tree must move together`,
    ...failures.map(
      f => `  row ${f.row}: ${f.check} declared=${JSON.stringify(f.declared)} live=${JSON.stringify(f.live)}${f.reason === undefined ? "" : ` (${f.reason})`}`,
    ),
  ].join("\n");
}

export function buildReceipt({ root, revision, nodeVersion = process.version }) {
  const census = computeCensus({ root, nodeVersion });
  return { contract: census.contract, revision, rows: census.rows, declarationChecks: evaluateDeclarations(census) };
}

function git(root, args) {
  const run = spawnSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  return run.status === 0 && typeof run.stdout === "string" ? run.stdout : undefined;
}

function sameDir(a, b) {
  try {
    return realpathSync(a) === realpathSync(b);
  } catch {
    return false;
  }
}

/**
 * HEAD of `root`, suffixed -dirty when the tree has changes, only when root IS the repository toplevel; otherwise
 * working-tree, so a receipt never carries an enclosing checkout's HEAD (the wb-7uq/wb-vko git-discovery rule). A failed
 * status read is never reported as a clean HEAD.
 */
export function revisionOf(root) {
  const top = git(root, ["rev-parse", "--show-toplevel"]);
  if (top === undefined || !sameDir(top.trim(), root)) return "working-tree";
  const head = (git(root, ["rev-parse", "HEAD"]) ?? "").trim();
  if (!/^[0-9a-f]{7,64}$/.test(head)) return "working-tree";
  const porcelain = git(root, ["status", "--porcelain"]);
  if (porcelain === undefined) return "working-tree";
  return porcelain.trim().length > 0 ? `${head}-dirty` : head;
}

function readFixture(fixture) {
  let recorded;
  try {
    recorded = JSON.parse(readFileSync(fixture, "utf8"));
  } catch (error) {
    throw new CensusError(`census fixture unreadable at ${fixture}: ${describeError(error)}`);
  }
  const rows = own(recorded, "rows");
  if (own(recorded, "contract") !== CENSUS_CONTRACT || !Array.isArray(rows) || !rows.every(row => typeof own(row, "id") === "string")) {
    throw new CensusError(`census fixture ${fixture} is not a ${CENSUS_CONTRACT} document`);
  }
  return recorded;
}

function main(argv) {
  const here = dirname(fileURLToPath(import.meta.url));
  const flag = name => {
    const at = argv.indexOf(name);
    return at === -1 ? undefined : argv[at + 1];
  };
  const root = resolve(flag("--root") ?? join(here, "..", ".."));
  const fixture = resolve(flag("--fixture") ?? join(root, "test", "fixtures", "workbench-dependency-census.json"));
  const mode = ["--write", "--check", "--receipt"].find(name => argv.includes(name));
  if (mode === undefined) {
    console.error("usage: dependency-census.mjs --write|--check|--receipt [--root DIR] [--fixture FILE]");
    return 2;
  }
  try {
    if (mode === "--receipt") {
      process.stdout.write(`${JSON.stringify(buildReceipt({ root, revision: revisionOf(root) }), null, 2)}\n`);
      return 0;
    }
    const live = computeCensus({ root });
    const failures = compareDeclarations(live);
    if (mode === "--write") {
      writeFileSync(fixture, `${JSON.stringify(recordCensus(live), null, 2)}\n`);
      console.log(`recorded ${live.rows.length} rows to ${fixture}`);
      if (failures.length > 0) console.error(`note: --check stays red until the table and the tree agree\n${formatDeclarationDrift(failures)}`);
      return 0;
    }
    const drifts = compareCensus(readFixture(fixture), live);
    if (drifts.length > 0) console.error(formatDrift(drifts));
    if (failures.length > 0) console.error(formatDeclarationDrift(failures));
    if (drifts.length > 0 || failures.length > 0) return 1;
    console.log(`${formatDrift(drifts)}; ${formatDeclarationDrift(failures)}`);
    return 0;
  } catch (error) {
    console.error(error instanceof CensusError ? `census error: ${error.message}` : String(error));
    return 2;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  process.exitCode = main(process.argv.slice(2));
}
