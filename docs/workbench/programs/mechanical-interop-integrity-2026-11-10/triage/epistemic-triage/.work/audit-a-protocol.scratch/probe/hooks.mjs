// Resolve hook for a READ-ONLY probe: maps relative "./x.js" specifiers to the sibling "./x.ts" source of the pinned
// worktree and stubs the one external package the admission modules import (typebox/value), which the probes never call.
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
const STUB = new URL("./typebox-value-stub.mjs", import.meta.url).href;
export async function resolve(specifier, context, nextResolve) {
  if (specifier === "typebox/value" || specifier === "typebox") return { url: STUB, shortCircuit: true };
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && specifier.endsWith(".js") && context.parentURL?.startsWith("file:")) {
    const candidate = new URL(specifier.replace(/\.js$/, ".ts"), context.parentURL);
    if (existsSync(fileURLToPath(candidate))) return { url: candidate.href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
