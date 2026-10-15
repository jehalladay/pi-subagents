// Module-resolution tracer for boot-import-census.mjs: runs on Node's hooks thread
// and posts every resolved module URL back to the census over the port it was
// registered with. Observation only; nothing is rewritten or loaded differently.
let port;
export function initialize(data) {
  port = data.port;
}
export async function resolve(specifier, context, nextResolve) {
  const resolved = await nextResolve(specifier, context);
  port?.postMessage(resolved.url);
  return resolved;
}
