// wb-cax.19: pure receipt builder for the headless detached-host module-graph census.
//
// Input is the resolver trace the child recorded (every resolved edge: importing
// module url -> resolved url). Everything here is deterministic and side-effect
// free so test/workbench-headless-census.test.ts can drive it with fixture
// closures; headless-host-census.mjs is the only caller that measures anything.

export const CENSUS_SCHEMA = "workbench.headless-census/v1";

const PI_SCOPE = "@earendil-works/";
const HEADLESS_CAVEAT =
  "A headless boot currently loads this Pi package as a library; that is a caveat to record, not a TUI launch (docs/workbench/16 Migration acceptance is about launching Pi's TUI process). Homing it out of the detached closure is owner-held W16 refactor work.";

function deepFreeze(value) {
  for (const inner of Object.values(value)) {
    if (inner && typeof inner === "object" && !Object.isFrozen(inner)) deepFreeze(inner);
  }
  return Object.freeze(value);
}

/** Pi/TUI packages permitted in the headless closure today, keyed by package. `via` lists the
 * only first-party importers permitted (package-root-relative dist paths); an empty `via` with
 * `through` names a package reached only through another allowlisted Pi package. Frozen: a new
 * entry or importer goes red until this table is edited in the same commit, and a row whose
 * measurement disappears goes red until it is trimmed (stale-row rule). */
export const EXPECTED_PI_CLOSURE = deepFreeze({
  "@earendil-works/pi-coding-agent": {
    via: ["dist/memory.js", "dist/workflow/saved.js"],
    caveat: `getAgentDir via src/workflow/saved.ts and src/memory.ts (saved.ts is reached from src/workbench/claude-host.ts). ${HEADLESS_CAVEAT}`,
  },
  "@earendil-works/pi-tui": {
    via: [],
    through: "@earendil-works/pi-coding-agent",
    caveat: `Not imported by any first-party module: pi-coding-agent's own import graph reaches it (the bead text attributed it to src/memory.ts, which imports pi-coding-agent). ${HEADLESS_CAVEAT}`,
  },
});

/** Pi-family packages reached only THROUGH the allowlisted ones (no first-party importer), as measured. */
export const EXPECTED_PI_TRANSITIVE = deepFreeze([
  "@earendil-works/pi-agent-core",
  "@earendil-works/pi-ai",
  "@earendil-works/pi-codemode",
  "@earendil-works/pi-mcp",
]);

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

export function buildReceipt({ edges, entryUrl, root, ttyFree, utc, revision, node, worktreeClean, allowlist = DEFAULT_ALLOWLIST }) {
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
    findings,
    pass: findings.length === 0,
  };
}

/** 0 pass, 1 findings (including an inactive tracer). */
export function exitCodeFor(receipt) {
  return receipt?.pass === true ? 0 : 1;
}
