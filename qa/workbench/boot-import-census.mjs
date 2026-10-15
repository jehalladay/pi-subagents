#!/usr/bin/env node
/**
 * boot-import-census.mjs — what one `import()` of the built extension resolves (wb-cax.10).
 *
 * Spawns a child Node with a module-resolution tracer registered, imports the
 * given dist entry, and reports the resolved module count, the native SDK
 * packages the import graph reached, and the wall time of the import. Run it
 * against two builds to compare a before and an after; nothing here depends on
 * the extension's own code.
 *
 *   node qa/workbench/boot-import-census.mjs <path/to/dist/index.js> [--runs N]
 */
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const NATIVE_SDK_PACKAGES = ["@furnace/sdk", "@forge/sdk", "@hyperunix/sdk", "@anthropic-ai/claude-agent-sdk"];

const args = process.argv.slice(2);
const entry = args.find(arg => !arg.startsWith("--"));
if (!entry) {
  console.error("usage: boot-import-census.mjs <dist/index.js> [--runs N]");
  process.exit(2);
}
const runsFlag = args.indexOf("--runs");
const runs = runsFlag === -1 ? 5 : Math.max(1, Number.parseInt(args[runsFlag + 1] ?? "5", 10) || 5);
const entryPath = resolve(entry);
const entryUrl = pathToFileURL(entryPath).href;
const hookUrl = pathToFileURL(resolve(dirname(fileURLToPath(import.meta.url)), "boot-import-hook.mjs")).href;

const childSource = `
import { register } from "node:module";
import { MessageChannel } from "node:worker_threads";
const { port1, port2 } = new MessageChannel();
const urls = [];
port1.on("message", url => urls.push(url));
port1.unref();
register(${JSON.stringify(hookUrl)}, { parentURL: import.meta.url, data: { port: port2 }, transferList: [port2] });
const started = performance.now();
await import(${JSON.stringify(entryUrl)});
const importMs = performance.now() - started;
await new Promise(settle => setTimeout(settle, 250));
process.stdout.write(JSON.stringify({ importMs, urls }));
`;

function packageOf(url) {
  const match = /node_modules\/((?:@[^/]+\/)?[^/]+)\//.exec(url);
  return match ? match[1] : undefined;
}

const samples = [];
for (let run = 0; run < runs; run += 1) {
  const child = spawnSync(process.execPath, ["--input-type=module", "-e", childSource], {
    cwd: dirname(entryPath),
    encoding: "utf8",
    env: { ...process.env, PI_CODING_AGENT_DIR: process.env.PI_CODING_AGENT_DIR ?? "/nonexistent-pi-agent-dir" },
    maxBuffer: 64 * 1024 * 1024,
  });
  if (child.status !== 0) {
    console.error(child.stderr);
    process.exit(child.status ?? 1);
  }
  samples.push(JSON.parse(child.stdout));
}

const sorted = samples.map(sample => sample.importMs).sort((a, b) => a - b);
const median = sorted[Math.floor(sorted.length / 2)];
const urls = samples[0].urls;
const packages = new Set(urls.map(packageOf).filter(Boolean));
const nativeReached = NATIVE_SDK_PACKAGES.filter(name => packages.has(name));
const nativeModuleCount = urls.filter(url => NATIVE_SDK_PACKAGES.some(name => url.includes(`node_modules/${name}/`))).length;

process.stdout.write(`${JSON.stringify({
  entry: entryPath,
  runs,
  importMsMedian: Number(median.toFixed(1)),
  importMs: sorted.map(value => Number(value.toFixed(1))),
  modulesResolved: urls.length,
  packagesResolved: packages.size,
  nativeSdkPackagesReached: nativeReached,
  nativeSdkModulesResolved: nativeModuleCount,
}, null, 2)}\n`);
