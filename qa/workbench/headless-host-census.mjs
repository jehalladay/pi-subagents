#!/usr/bin/env node
/**
 * headless-host-census.mjs — module-graph census of the headless detached host (wb-cax.19).
 *
 * Spawns headless-census-child.mjs with stdin/stdout/stderr piped (no TTY), which records
 * every module the built dist/workbench/hosts/local-detached.js transitively loads while it
 * is imported, constructed (deterministic backend, empty registry, no grants) and asked to
 * validate a trivial script. Prints a `workbench.headless-census/v1` receipt and exits
 * 0 (pass), 1 (findings, including an inactive tracer) or 2 (could not measure).
 *
 *   node qa/workbench/headless-host-census.mjs [--dist-root <dir containing dist/>] [--out <file>]
 *
 * Measurement only: no Pi session, no socket, no detached host process (that lives in
 * qa/workbench/local-detached-client.mjs). Needs a built dist (`npm run build`).
 */
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { revisionOf } from "./git-stamp.mjs";
import { buildReceipt, exitCodeFor } from "./headless-census-receipt.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(here, "../..");
const args = process.argv.slice(2);

function option(name) {
  const at = args.indexOf(name);
  return at === -1 ? undefined : args[at + 1];
}

const requestedRoot = resolve(option("--dist-root") ?? packageRoot);
const out = option("--out");
if (!existsSync(requestedRoot)) {
  console.error(`headless census: ${requestedRoot} not found`);
  process.exit(2);
}
// Node resolves imports through symlinks, so the trace reports real paths; classify against the real root (F3).
const distRoot = realpathSync(requestedRoot);
const entry = join(distRoot, "dist/workbench/hosts/local-detached.js");
if (!existsSync(entry)) {
  console.error(`headless census: ${entry} not found; run \`npm run build\` first`);
  process.exit(2);
}

const child = spawnSync(process.execPath, [join(here, "headless-census-child.mjs"), distRoot], {
  cwd: distRoot,
  input: "",
  encoding: "utf8",
  stdio: ["pipe", "pipe", "pipe"],
  maxBuffer: 256 * 1024 * 1024,
  env: { ...process.env, PI_CODING_AGENT_DIR: process.env.PI_CODING_AGENT_DIR ?? "/nonexistent-pi-agent-dir" },
});
if (child.status !== 0) {
  console.error(child.stderr || `headless census child exited ${child.status ?? child.signal}`);
  process.exit(2);
}
let measured;
try {
  measured = JSON.parse(child.stdout);
} catch {
  console.error("headless census: child output was not JSON");
  process.exit(2);
}

function newestSrcMtimeMs() {
  const srcDir = join(packageRoot, "src");
  if (!existsSync(srcDir)) return undefined;
  let newest = 0;
  for (const dirent of readdirSync(srcDir, { recursive: true, withFileTypes: true })) {
    if (dirent.isFile()) newest = Math.max(newest, statSync(join(dirent.parentPath, dirent.name)).mtimeMs);
  }
  return newest === 0 ? undefined : newest;
}

// F4: bind the receipt to the dist it measured. `revision` describes the runner's repository, so
// it describes the measured dist only when the dist root is that repository.
const entryMtimeMs = statSync(entry).mtimeMs;
const srcMtimeMs = newestSrcMtimeMs();
const dist = {
  root: distRoot,
  builtUtc: new Date(entryMtimeMs).toISOString().replace(/\.\d+Z$/, "Z"),
  olderThanSrc: srcMtimeMs === undefined ? null : entryMtimeMs < srcMtimeMs,
  revisionDescribesDist: distRoot === realpathSync(packageRoot),
};

// wb-vko (16:26Z gate U3, cax.19 F3): the one canonical stamp (./git-stamp.mjs) - HEAD, HEAD-dirty, or working-tree when
// packageRoot is not its repository toplevel or its status cannot be read - so the receipt never carries an
// enclosing checkout's HEAD or cleanliness; worktreeClean holds only for a bare (clean) HEAD.
const revision = revisionOf(packageRoot);
const receipt = buildReceipt({
  dist,
  edges: measured.edges,
  entryUrl: measured.entryUrl,
  root: pathToFileURL(`${distRoot}/`).href,
  ttyFree: measured.ttyFree,
  utc: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
  revision,
  node: process.version,
  worktreeClean: revision !== "working-tree" && !revision.endsWith("-dirty"),
});
const text = `${JSON.stringify(receipt, null, 2)}\n`;
if (out) writeFileSync(resolve(out), text);
process.stdout.write(text);
for (const warning of receipt.warnings) console.error(`warning: ${warning}`);
for (const finding of receipt.findings) {
  console.error(`${finding.rule}: ${finding.module}${finding.chain.length > 0 ? ` <- ${[...finding.chain].reverse().slice(1).join(" <- ")}` : ""}${finding.detail ? ` (${finding.detail})` : ""}`);
}
process.exit(exitCodeFor(receipt));
