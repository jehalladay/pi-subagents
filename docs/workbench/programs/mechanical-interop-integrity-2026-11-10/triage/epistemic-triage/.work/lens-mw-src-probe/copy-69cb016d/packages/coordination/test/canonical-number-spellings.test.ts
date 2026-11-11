import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalJson, digest } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const tablePath = join(here, "../../../qa/integration/python-consumer/fixtures/canonical-number-spellings.json");

interface SpellingTable {
  readonly schema: string;
  readonly rows: readonly { readonly input: string; readonly canonical: string }[];
}
const table = JSON.parse(readFileSync(tablePath, "utf8")) as SpellingTable;

test("TW-EAT-R004 the pinned spelling table carries the edge doubles the Python leg must reproduce", () => {
  assert.equal(table.schema, "mw.canonical-number-spellings.v1");
  const inputs = new Set(table.rows.map(row => row.input));
  for (const edge of ["1e-7", "1e21", "123456789012345680000", "-0.0", "5e-324", "1.7976931348623157e308"]) assert.ok(inputs.has(edge), edge);
});

test("TW-EAT-R004 canonicalJson spells every pinned row as the ECMAScript Number toString reference (the table mw_canonical.py must match)", () => {
  for (const row of table.rows) {
    assert.equal(canonicalJson(JSON.parse(`{"x":${row.input}}`)), `{"x":${row.canonical}}`, row.input);
  }
});

test("TW-EAT-R004 the exponent form drops zero padding and keeps its sign, at the 1e-6 and 1e21 boundaries", () => {
  assert.equal(canonicalJson({ x: -1e-7 }), '{"x":-1e-7}');
  assert.equal(canonicalJson({ x: 1e-6 }), '{"x":0.000001}');
  assert.equal(canonicalJson({ x: 1e21 }), '{"x":1e+21}');
  assert.equal(canonicalJson({ x: 1e20 }), '{"x":100000000000000000000}');
  assert.equal(canonicalJson({ x: -0 }), '{"x":0}');
});

test("TW-EAT-R004 a digest over a sub-1e-6 double hashes the unpadded spelling", () => {
  assert.equal(digest({ x: -1e-7 }), digest(JSON.parse('{"x":-1e-7}')));
  assert.notEqual(digest({ x: -1e-7 }), digest({ x: 1e-7 }));
});
