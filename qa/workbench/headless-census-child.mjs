#!/usr/bin/env node
/**
 * headless-census-child.mjs — runs INSIDE the TTY-less child of headless-host-census.mjs (wb-cax.19).
 *
 *   node headless-census-child.mjs <dist-root>
 *
 * Installs a synchronous resolve hook (module.registerHooks: it sees import AND require),
 * then imports the built detached host, constructs the deterministic host with an empty
 * registry and no grants, validates a trivial script and prints the recorded edges as one
 * JSON object. ttyFree is measured here, on this process's own descriptors. It never opens
 * a socket, never starts a detached host process and never creates a Pi session.
 */
import { registerHooks } from "node:module";
import { isatty } from "node:tty";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const distRoot = process.argv[2];
if (!distRoot) {
  console.error("usage: headless-census-child.mjs <dist-root>");
  process.exit(2);
}

const ttyFree = [0, 1, 2].every(fd => !isatty(fd));
const seen = new Set();
const edges = [];
registerHooks({
  resolve(specifier, context, nextResolve) {
    const resolved = nextResolve(specifier, context);
    const parent = context.parentURL ?? null;
    const key = `${parent}\n${resolved.url}`;
    if (!seen.has(key)) {
      seen.add(key);
      edges.push({ parent, url: resolved.url });
    }
    return resolved;
  },
});

const distUrl = path => pathToFileURL(join(distRoot, "dist", path)).href;
const entryUrl = distUrl("workbench/hosts/local-detached.js");
const detached = await import(entryUrl);
const runtime = await import(distUrl("workflow/runtime.js"));
const registryModule = await import(distUrl("workbench/capability-registry.js"));

const host = detached.createDetachedWorkflowHost({
  request: { backend: "deterministic", cwd: distRoot, invocationId: "headless-census", providers: [], grants: [] },
  registry: new registryModule.CapabilityRegistry(),
  principal: { id: "headless-census", role: "local-operator" },
  signal: new AbortController().signal,
  beforeDispatch() {},
});
const validation = runtime.validateScript('export const meta = { name: "headless-census", description: "census probe" };\nreturn 1;\n');
if (typeof host.callNode !== "function" || validation.meta.name !== "headless-census") {
  console.error("headless census: host construction or script validation did not behave");
  process.exit(3);
}

process.stdout.write(JSON.stringify({ ttyFree, entryUrl, edges }), () => process.exit(0));
