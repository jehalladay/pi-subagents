// wb-cax.19: pure receipt builder for the headless detached-host module-graph census.
//
// Input is the resolver trace the child recorded (every resolved edge: importing
// module url -> resolved url). Everything here is deterministic and side-effect
// free so test/workbench-headless-census.test.ts can drive it with fixture
// closures; headless-host-census.mjs is the only caller that measures anything.

export const CENSUS_SCHEMA = "workbench.headless-census/v1";

/**
 * Contract types (JSDoc that TypeScript callers read under allowJs; nothing here runs).
 *
 * @typedef {{readonly parent?: string | null, readonly url: string}} CensusEdge
 *   One resolved edge the child recorded: importing module url (null or absent for the entry itself) to resolved url.
 * @typedef {{readonly via: ReadonlyArray<string>, readonly through?: string, readonly caveat: string}} CensusPiClosureRow
 * @typedef {{
 *   readonly piClosure: Readonly<Record<string, CensusPiClosureRow>>,
 *   readonly piTransitive: ReadonlyArray<string>,
 *   readonly uiModules: ReadonlyArray<string>,
 * }} CensusAllowlist The shape of the frozen EXPECTED_PI_CLOSURE, EXPECTED_PI_TRANSITIVE and EXPECTED_UI_MODULES tables.
 * @typedef {{root: string, builtUtc: string | null, olderThanSrc: boolean | null, revisionDescribesDist: boolean}} CensusDistRecord
 *   The measured dist record headless-host-census.mjs passes in.
 * @typedef {{rule: string, module: string, chain: string[], detail: string}} CensusFinding
 * @typedef {{
 *   schema: string,
 *   utc: string,
 *   revision: string,
 *   node: string,
 *   worktreeClean: boolean | undefined,
 *   entry: string,
 *   closure: string[],
 *   packageChains: Record<string, string[]>,
 *   piPackages: Array<{name: string, direct: boolean, importers: string[], chain: string[]}>,
 *   uiModules: Array<{module: string, chain: string[]}>,
 *   ttyFree: boolean,
 *   measurementBound: string,
 *   dist: CensusDistRecord | null,
 *   warnings: string[],
 *   findings: CensusFinding[],
 *   pass: boolean,
 * }} CensusReceipt The receipt buildReceipt returns (schema CENSUS_SCHEMA): worktreeClean and dist are echoed as given.
 */

/** What this receipt does and does not measure (F8). module.registerHooks is per-thread, so the
 * trace covers one thread's static boot only. An unstated bound reads as a claim about everything. */
export const MEASUREMENT_BOUND =
  "registerHooks is per-thread: worker-thread module graphs and lazy imports made at run time while a workflow script executes are outside this receipt; it covers the import, construct and validateScript boot of the detached host in one thread.";

const PI_SCOPE = "@earendil-works/";

function deepFreeze(value) {
  for (const inner of Object.values(value)) {
    if (inner && typeof inner === "object" && !Object.isFrozen(inner)) deepFreeze(inner);
  }
  return Object.freeze(value);
}

/** Pi/TUI packages permitted in the headless closure today, keyed by package. `via` lists the
 * only first-party importers permitted (package-root-relative dist paths); an empty `via` with
 * `through` names a package reached only through another allowlisted Pi package; `caveat` records
 * why the package is there. Frozen: a new entry or importer goes red until this table is edited in
 * the same commit, and a row whose measurement disappears goes red until it is trimmed (stale-row rule).
 *
 * Empty since wb-nl8.3: the headless boot loads no @earendil-works package. The pi-coding-agent row
 * (getAgentDir via dist/memory.js and dist/workflow/saved.js) and the pi-tui row reached through it
 * were trimmed in the commit that gave src/memory.ts and src/workflow/saved.ts the local
 * src/agent-dir.ts getAgentDir, under this stale-row rule. */
export const EXPECTED_PI_CLOSURE = deepFreeze({});

/** Pi-family packages reached only THROUGH the allowlisted ones (no first-party importer), as measured.
 * Empty since wb-nl8.3: pi-agent-core, pi-ai, pi-codemode and pi-mcp were reached only through
 * pi-coding-agent and were trimmed with its row. */
export const EXPECTED_PI_TRANSITIVE = deepFreeze([]);

/** UI modules permitted in the headless closure. Empty: no src/ui/* and no src/index.js. */
export const EXPECTED_UI_MODULES = deepFreeze([]);

const DEFAULT_ALLOWLIST = Object.freeze({
  piClosure: EXPECTED_PI_CLOSURE,
  piTransitive: EXPECTED_PI_TRANSITIVE,
  uiModules: EXPECTED_UI_MODULES,
});

const UI_PREFIX = "dist/ui/";
const UI_ENTRY = "dist/index.js";

function classify(url, root) {
  if (url.startsWith("node:")) return { name: url, kind: "builtin" };
  const marker = url.lastIndexOf("/node_modules/");
  if (marker !== -1) {
    const rest = url.slice(marker + "/node_modules/".length).split("/");
    const name = rest[0]?.startsWith("@") ? `${rest[0]}/${rest[1] ?? ""}` : (rest[0] ?? url);
    return { name, kind: "package" };
  }
  if (url.startsWith(root)) return { name: url.slice(root.length), kind: "first-party" };
  return { name: url, kind: "external" };
}

function isUiModule(name) {
  return name.startsWith(UI_PREFIX) || name === UI_ENTRY;
}

/** Breadth-first closure over the recorded edges from the entry, with deterministic parents. */
export function buildClosure({ edges, entryUrl, root }) {
  const entry = classify(entryUrl, root);
  const kinds = new Map([[entry.name, entry.kind]]);
  const children = new Map();
  for (const edge of edges) {
    if (edge.parent === null || edge.parent === undefined) continue;
    const from = classify(edge.parent, root);
    const to = classify(edge.url, root);
    kinds.set(from.name, from.kind);
    kinds.set(to.name, to.kind);
    if (from.name === to.name) continue;
    if (!children.has(from.name)) children.set(from.name, new Set());
    children.get(from.name).add(to.name);
  }
  const parentOf = new Map([[entry.name, null]]);
  const queue = [entry.name];
  for (let index = 0; index < queue.length; index += 1) {
    const current = queue[index];
    for (const next of [...(children.get(current) ?? [])].sort()) {
      if (parentOf.has(next)) continue;
      parentOf.set(next, current);
      queue.push(next);
    }
  }
  const chainTo = name => {
    const chain = [];
    for (let at = name; at !== null && at !== undefined; at = parentOf.get(at)) chain.unshift(at);
    return chain;
  };
  const importersOf = name => {
    const found = [];
    for (const [from, tos] of children) {
      if (parentOf.has(from) && kinds.get(from) === "first-party" && tos.has(name)) found.push(from);
    }
    return found.sort();
  };
  return { entry: entry.name, names: [...parentOf.keys()].sort(), kinds, chainTo, importersOf };
}

function traceActive(edges, entryUrl) {
  return edges.some(edge => edge.parent === entryUrl);
}

/**
 * The census receipt over one recorded closure. Pure: the same input always builds the same receipt.
 *
 * @param {object} input
 * @param {ReadonlyArray<CensusEdge>} input.edges every resolved edge the child recorded
 * @param {string} input.entryUrl the detached host entry url the closure is walked from
 * @param {string} input.root the package-root file url that makes first-party paths relative
 * @param {boolean} input.ttyFree whether the child measured no TTY on stdin, stdout and stderr
 * @param {string} input.utc
 * @param {string} input.revision
 * @param {string} input.node
 * @param {boolean} [input.worktreeClean] the runner's clean-HEAD flag, echoed as given; a fixture caller that stamps
 *   no checkout omits it
 * @param {CensusAllowlist} [input.allowlist] defaults to the frozen EXPECTED_* tables
 * @param {CensusDistRecord | null} [input.dist] the measured dist record; defaults to null
 * @returns {CensusReceipt}
 */
export function buildReceipt({ edges, entryUrl, root, ttyFree, utc, revision, node, worktreeClean, allowlist = DEFAULT_ALLOWLIST, dist = null }) {
  const graph = buildClosure({ edges, entryUrl, root });
  const findings = [];
  const present = new Set(graph.names);

  if (!traceActive(edges, entryUrl)) {
    findings.push({ rule: "tracer-not-active", module: graph.entry, chain: [graph.entry], detail: "tracer not active: the resolver hook recorded no import made by the detached host entry" });
  }
  if (ttyFree !== true) {
    findings.push({ rule: "tty-attached", module: graph.entry, chain: [graph.entry], detail: "the child measured a TTY on stdin, stdout or stderr" });
  }

  const packageChains = {};
  for (const name of graph.names) {
    if (graph.kinds.get(name) === "package") packageChains[name] = graph.chainTo(name);
  }

  const piPackages = graph.names
    .filter(name => graph.kinds.get(name) === "package" && name.startsWith(PI_SCOPE))
    .map(name => {
      const importers = graph.importersOf(name);
      return { name, direct: importers.length > 0, importers, chain: graph.chainTo(name) };
    });

  for (const entry of piPackages) {
    const listed = allowlist.piClosure[entry.name];
    if (entry.direct) {
      if (!listed) {
        findings.push({ rule: "unlisted-pi-package", module: entry.name, chain: entry.chain, detail: `${entry.name} is imported by ${entry.importers.join(", ")} and is not in EXPECTED_PI_CLOSURE` });
        continue;
      }
      for (const importer of entry.importers) {
        if (listed.via.includes(importer)) continue;
        findings.push({ rule: "unlisted-pi-importer", module: entry.name, chain: [...graph.chainTo(importer), entry.name], detail: `${importer} is not a permitted importer of ${entry.name}` });
      }
    } else if (!listed && !allowlist.piTransitive.includes(entry.name)) {
      findings.push({ rule: "unlisted-pi-package", module: entry.name, chain: entry.chain, detail: `${entry.name} is reached transitively and is in neither EXPECTED_PI_CLOSURE nor EXPECTED_PI_TRANSITIVE` });
    }
  }

  const piByName = new Map(piPackages.map(entry => [entry.name, entry]));
  for (const [name, listed] of Object.entries(allowlist.piClosure)) {
    const measured = piByName.get(name);
    if (!measured) {
      findings.push({ rule: "stale-allowlist-row", module: name, chain: [], detail: `${name} is allowlisted in EXPECTED_PI_CLOSURE but no longer in the closure; trim the row in this commit` });
      continue;
    }
    for (const via of listed.via) {
      if (!measured.importers.includes(via)) {
        findings.push({ rule: "stale-allowlist-row", module: name, chain: measured.chain, detail: `${via} no longer imports ${name}; trim the row in this commit` });
      }
    }
    // F5: a row that names `through` is only valid while the measured first chain passes through it.
    if (listed.through && !measured.chain.slice(0, -1).includes(listed.through)) {
      findings.push({ rule: "through-chain-mismatch", module: name, chain: measured.chain, detail: `${name} is allowlisted as reached through ${listed.through} but the measured chain does not pass through it` });
    }
  }
  for (const name of allowlist.piTransitive) {
    if (!present.has(name)) {
      findings.push({ rule: "stale-allowlist-row", module: name, chain: [], detail: `${name} is allowlisted in EXPECTED_PI_TRANSITIVE but no longer in the closure; trim the row in this commit` });
    }
  }

  const uiModules = graph.names
    .filter(name => graph.kinds.get(name) === "first-party" && isUiModule(name))
    .map(name => ({ module: name, chain: graph.chainTo(name) }));
  for (const entry of uiModules) {
    if (!allowlist.uiModules.includes(entry.module)) {
      findings.push({ rule: "ui-module", module: entry.module, chain: entry.chain, detail: `${entry.module} is a UI module in the headless closure` });
    }
  }
  for (const name of allowlist.uiModules) {
    if (!present.has(name)) {
      findings.push({ rule: "stale-allowlist-row", module: name, chain: [], detail: `${name} is allowlisted in EXPECTED_UI_MODULES but no longer in the closure; trim the row in this commit` });
    }
  }

  const warnings = [];
  if (dist?.olderThanSrc === true) {
    warnings.push(`dist-older-than-src: the measured dist at ${dist.root} predates the newest src file; rebuild before relying on this receipt`);
  }

  return {
    schema: CENSUS_SCHEMA,
    utc,
    revision,
    node,
    worktreeClean,
    entry: graph.entry,
    closure: graph.names,
    packageChains,
    piPackages,
    uiModules,
    ttyFree: ttyFree === true,
    measurementBound: MEASUREMENT_BOUND,
    dist,
    warnings,
    findings,
    pass: findings.length === 0,
  };
}

/** 0 pass, 1 findings (including an inactive tracer). */
export function exitCodeFor(receipt) {
  return receipt?.pass === true ? 0 : 1;
}
