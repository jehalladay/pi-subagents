// Gate-budget guard (MechanicalWorkflows gate-budget bead): the repo's forge.toml must give the
// monorepo test step room to finish under the standing 16-agent pool (two serialized hermetic
// gates were killed at the 900s budget on 2026-10-19 while the suite itself was green), and the
// budget raise must never silently weaken the gate: the six-step gate list and the tier list are
// pinned here verbatim. All six steps still have to pass; only the per-step time budget moves.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const toml = readFileSync(join(here, "..", "..", "..", "forge.toml"), "utf8");

test("the [build] step timeout is at least 1800s: the 900s budget truncated two green-suite gates under mandated pool load", () => {
  const match = toml.match(/^timeout\s*=\s*(\d+)\s*$/m);
  assert.ok(match, "forge.toml declares an explicit [build] timeout");
  assert.ok(Number(match![1]) >= 1800, `timeout ${match![1]} is below the 1800s floor`);
});

test("the gate still runs all six steps and the tier list is unchanged: the budget raise never weakens the gate", () => {
  assert.match(toml, /^gate = \["structure", "typing", "test", "python-consumer", "evidence", "docs"\]\s*$/m, "six-step gate list verbatim");
  assert.match(toml, /^tiers = \["structure", "typing", "test", "docs"\]\s*$/m, "tier list verbatim");
});

test("no timeout key anywhere in forge.toml sits below 1800s: a step entry's own timeout overrides the [build] default and would restore the truncating budget", () => {
  const matches = [...toml.matchAll(/\btimeout\s*=\s*(\d+)/g)];
  assert.ok(matches.length >= 1, "forge.toml declares at least one timeout key");
  for (const m of matches) {
    assert.ok(Number(m[1]) >= 1800, `timeout ${m[1]} at offset ${m.index} is below the 1800s floor`);
  }
});

test("every timeout key in any TOML spelling is a bare decimal integer of at least 1800: a string, signed, quoted-key, float, exponent, hex or underscore spelling resolves to a sub-1800 budget in Forge while the digit-only scan above never sees it", () => {
  // Forge resolves a per-command timeout from int, float and numeric-string values, so the key
  // may appear bare, double-quoted, single-quoted or dotted, and the value in many spellings.
  // Capture every spelling and demand the trimmed value be a bare decimal integer.
  const matches = [...toml.matchAll(/(?:^|[\s{,.])["']?timeout["']?\s*=\s*([^,}\r\n]+)/gm)];
  assert.ok(matches.length >= 1, "forge.toml declares at least one timeout key");
  for (const m of matches) {
    const value = m[1]!.trim();
    assert.match(value, /^\d+$/, `timeout value ${JSON.stringify(value)} at offset ${m.index} is not a bare decimal integer`);
    assert.ok(Number(value) >= 1800, `timeout ${value} at offset ${m.index} is below the 1800s floor`);
  }
});
