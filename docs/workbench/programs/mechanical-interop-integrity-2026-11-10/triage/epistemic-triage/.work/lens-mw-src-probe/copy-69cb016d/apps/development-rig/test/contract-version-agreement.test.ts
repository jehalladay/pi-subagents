import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

/** EAT-R010 (PIWBA MW-R0, L1): one version token across descriptor id, both schema filenames and both schema $id values, read from disk. */
const contracts = (path: string) => new URL("../../../contracts/" + path, import.meta.url);
const readJson = (path: string) => JSON.parse(readFileSync(contracts(path), "utf8")) as Record<string, unknown>;

interface Corpus { descriptor: Record<string, unknown>; request: Record<string, unknown>; outcome: Record<string, unknown> }
const SITES = ["descriptor.id", "descriptor.inputSchema", "descriptor.outputSchema", "request.$id", "outcome.$id"] as const;
type Site = (typeof SITES)[number];

function load(): Corpus {
  const descriptor = readJson("entrypoints/development.v1.json");
  return {
    descriptor,
    request: readJson("schemas/" + String(descriptor.inputSchema)),
    outcome: readJson("schemas/" + String(descriptor.outputSchema)),
  };
}
const lastVersionToken = (text: unknown, pattern: RegExp): string | undefined => pattern.exec(String(text))?.[1];
/** Extract the version token (vN) each site declares; undefined when a site carries none. */
function tokens(c: Corpus): Record<Site, string | undefined> {
  return {
    "descriptor.id": lastVersionToken(c.descriptor.id, /\.(v[0-9]+)$/),
    "descriptor.inputSchema": lastVersionToken(c.descriptor.inputSchema, /\.(v[0-9]+)\.schema\.json$/),
    "descriptor.outputSchema": lastVersionToken(c.descriptor.outputSchema, /\.(v[0-9]+)\.schema\.json$/),
    "request.$id": lastVersionToken(c.request.$id, /\.(v[0-9]+)\.schema\.json$/),
    "outcome.$id": lastVersionToken(c.outcome.$id, /\.(v[0-9]+)\.schema\.json$/),
  };
}
/** True only when every site declares a token and all tokens are identical. */
function agrees(c: Corpus): boolean {
  const values = Object.values(tokens(c));
  return values.every((v) => v !== undefined) && new Set(values).size === 1;
}
/** Bump exactly one site to vNEXT on a deep copy of the on-disk corpus. */
function bumpOne(site: Site): Corpus {
  const c = structuredClone(load());
  const bump = (text: unknown) => String(text).replace(/\.v([0-9]+)(\.schema\.json)?$/, (_m, n: string, tail?: string) => ".v" + (Number(n) + 1) + (tail ?? ""));
  if (site === "descriptor.id") c.descriptor.id = bump(c.descriptor.id);
  else if (site === "descriptor.inputSchema") c.descriptor.inputSchema = bump(c.descriptor.inputSchema);
  else if (site === "descriptor.outputSchema") c.descriptor.outputSchema = bump(c.descriptor.outputSchema);
  else if (site === "request.$id") c.request.$id = bump(c.request.$id);
  else c.outcome.$id = bump(c.outcome.$id);
  return c;
}

test("EAT-R010: committed descriptor, both schema filenames and both schema $id values agree on one version token read from contracts/ on disk", () => {
  const found = tokens(load());
  for (const site of SITES) assert.match(String(found[site]), /^v[0-9]+$/, site + " must declare a vN token");
  assert.equal(new Set(Object.values(found)).size, 1, "all five sites must carry the same token: " + JSON.stringify(found));
  assert.equal(agrees(load()), true);
});

for (const site of SITES) {
  test("EAT-R010 mutant: bumping only " + site + " breaks version agreement", () => {
    const mutant = bumpOne(site);
    const found = tokens(mutant);
    const base = tokens(load());
    for (const other of SITES) {
      if (other === site) assert.notEqual(found[other], base[other], site + " must differ from the committed token");
      else assert.equal(found[other], base[other], other + " must stay at the committed token");
    }
    assert.equal(agrees(mutant), false, "single-site bump of " + site + " must fail the agreement check");
  });
}

test("EAT-R010: a site that declares no version token fails the agreement check", () => {
  const c = structuredClone(load());
  c.request.$id = "https://example.invalid/mechanical-workflows/development-request.schema.json";
  assert.equal(agrees(c), false);
});
