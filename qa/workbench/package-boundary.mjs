// Packed npm artifact boundary: pure classification and receipt assembly.
// No dependencies, no I/O; qa/workbench/package-smoke.mjs measures, this module judges.

export const TOP_LEVEL_ALLOWLIST = Object.freeze([
  'LICENSE', 'README.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'SECURITY.md',
  'package.json', 'forge.toml', 'dist', 'src', 'docs', 'examples', 'qa', 'vendor', 'node_modules',
]);

export const DENIED_PREFIXES = Object.freeze([
  '.agents/', '.codex/', '.pi/', '.claude/', '.beads/', '.forge/', '.furnace/', '.hyperunix/',
  '.reactive-fiber/', '.github/', 'machines/', 'test/', 'tests/',
]);

export const DENIED_BASENAMES = Object.freeze(['AGENTS.md', 'CLAUDE.md', 'biome.json', 'tsconfig.json', 'tsconfig.test.json']);

export const DENIED_PATTERNS = Object.freeze([/\.jsonl$/, /^vitest\..*config\.ts$/, /\.test\.ts$/]);

// Positive presence pins: the packed file list must CONTAIN these, so a stray ignore rule cannot
// silently drop a shipping surface (the denylists above only prove absence of private state).
export const REQUIRED_PACKED_PATHS = Object.freeze([
  'LICENSE', 'package.json', 'src/index.ts', 'dist/workbench/claude-host.js',
  'vendor/forge-sdk-0.1.0.tgz', 'vendor/furnace-sdk-0.1.0.tgz', 'vendor/hyperunix-sdk-0.1.0.tgz',
  'vendor/dependency-lock.json',
  'node_modules/@forge/sdk/package.json', 'node_modules/@furnace/sdk/package.json',
  'node_modules/@hyperunix/sdk/package.json',
]);

// Directories that must ship at least one file (docs/ and qa/ ship deliberately).
export const REQUIRED_PACKED_PREFIXES = Object.freeze(['docs/', 'qa/', 'dist/']);

export const UNKNOWN_REVISION = 'unknown:not-a-git-checkout';

const NODE_MODULES = 'node_modules/';

function basename(path) {
  return path.slice(path.lastIndexOf('/') + 1);
}

// Lock-key style package path for a packed node_modules file: the segments through the last
// node_modules/(@scope/)?name, with the leading node_modules/ removed.
function packagePathOf(path) {
  const segments = path.split('/');
  let end = -1;
  for (let i = 0; i < segments.length; i += 1) {
    if (segments[i] !== 'node_modules' || segments[i + 1] === undefined) continue;
    end = segments[i + 1].startsWith('@') ? i + 2 : i + 1;
  }
  return end < 0 ? '' : segments.slice(1, end + 1).join('/');
}

function classifyOne(path, bundled) {
  if (DENIED_PREFIXES.some(prefix => path.startsWith(prefix))) return 'denied-prefix';
  const base = basename(path);
  if (DENIED_BASENAMES.includes(base)) return 'denied-basename';
  if (DENIED_PATTERNS.some(pattern => pattern.test(base))) return 'denied-pattern';
  if (path.startsWith(NODE_MODULES)) return bundled.has(packagePathOf(path)) ? undefined : 'unbundled-node-modules';
  const top = path.split('/')[0];
  if (!TOP_LEVEL_ALLOWLIST.includes(top)) return 'top-level-not-allowlisted';
  return undefined;
}

export function classifyPackedPaths(paths, { bundledLockEntries = [] } = {}) {
  const bundled = new Set(bundledLockEntries);
  const violations = [];
  for (const path of paths) {
    const rule = classifyOne(path, bundled);
    if (rule !== undefined) violations.push({ path, rule });
  }
  const topLevel = [...new Set(paths.map(path => path.split('/')[0]))].sort();
  return { violations, topLevel };
}

// Every required exact path or directory prefix that the packed listing does not contain.
export function missingRequiredPackedPaths(paths) {
  const present = new Set(paths);
  const missing = [];
  for (const path of REQUIRED_PACKED_PATHS) {
    if (!present.has(path)) missing.push({ path, rule: 'missing-required-path' });
  }
  for (const prefix of REQUIRED_PACKED_PREFIXES) {
    if (!paths.some(path => path.startsWith(prefix))) missing.push({ path: prefix, rule: 'missing-required-prefix' });
  }
  return missing;
}

// Lock `packages` keys whose entry has inBundle === true, with the leading node_modules/ removed.
export function bundledLockEntries(lock) {
  const names = [];
  for (const [key, entry] of Object.entries(lock?.packages ?? {})) {
    if (key.startsWith(NODE_MODULES) && entry?.inBundle === true) names.push(key.slice(NODE_MODULES.length));
  }
  return names.sort();
}

export function buildPackageReceipt(input) {
  const head = input.git?.head ?? null;
  const known = typeof head === 'string' && head.length > 0;
  return {
    contract: 'workbench.package-smoke/v2',
    fileCount: input.fileCount,
    sha: input.shasum,
    shasum: input.shasum,
    integrity: input.integrity,
    privateStateIncluded: false,
    revision: known ? head : UNKNOWN_REVISION,
    dirty: known && typeof input.git.porcelain === 'string' ? input.git.porcelain.trim().length > 0 : null,
    node: input.node,
    npm: input.npm,
    platform: input.platform,
    arch: input.arch,
    utc: input.utc,
    command: input.command,
    topLevel: [...input.topLevel].sort(),
    bundled: [...input.bundled].sort(),
    denied: [],
  };
}
