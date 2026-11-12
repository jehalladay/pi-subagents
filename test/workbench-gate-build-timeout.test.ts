/**
 * wb-z0ib (owner-filed from the post-landing tier row M:79244): the complete gate's build step carries an explicit
 * timeout. The row records why: forge.toml declared the step as a bare key under [build.commands], so forge ran it under
 * its per-command default of 300 s; under host load that run was killed at 315 s (stepReds "build [step-timeout]"), and
 * with dist/ absent the dist-dependent tests red as a consequence. The cut declares the step as its own table with
 * timeout = 900, the sibling of the typing table (900) and the test table (3600), and moves the reader the bead names, the
 * retry census's admitted chain in the census helper (RETRY_ADMITTED_CHAINS), to the table spelling that resolveTier gives
 * a table step.
 *
 * PINNED READER SET (every case this file registers, by id and title; B0 holds this list equal to the registered cases):
 * - [B0] the header's pinned reader set names exactly the cases this file registers, in order, by id and title
 * - [B1] forge.toml declares the build step as one [build.commands.build] table holding exactly command = "npm run build" and timeout = 900, with no table between it and the [build.commands] table
 * - [B2] the bare build key is gone: the [build.commands] table holds the lint key alone, and no line of forge.toml starts with build =
 * - [B3] guards: forge.toml keeps one gate line listing the seven steps in order, the typing table and the test table with their commands and timeouts
 * - [B4] resolveTier(ROOT, "build") spells the table chain through package.json scripts.build, and RETRY_ADMITTED_CHAINS holds that one chain and no other
 *
 * Falsifiers: B1 reds when the table is absent or repeated, when its command or timeout changes, when a key is added to it,
 * or when another table is placed between it and [build.commands]; B2 reds when the bare key returns or [build.commands]
 * gains a key; B3 reds when the gate line, the typing table or the test table changes; B4 reds when the census helper's
 * admitted chain keeps the bare-key spelling, gains a second entry, or no longer matches package.json scripts.build; B0
 * reds when a case is renamed or dropped without its line here, or a line here is hollowed.
 *
 * NOT CLAIMED: how forge enforces the timeout on the gate host is NOT CLAIMED by this file; the next post-landing tier row
 * on a trunk holding this cut is that record. That 900 s suffices at every host load is NOT CLAIMED by this file. The
 * retry census's whole reading of the build step (its kind) is NOT CLAIMED by this file; the landed tree row of
 * test/workbench-retry-census.test.ts reads it. That no other landed reader spells the bare build key is NOT CLAIMED by
 * this file.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { RETRY_ADMITTED_CHAINS, resolveTier } from "./helpers/census.js";

const SELF = fileURLToPath(import.meta.url);
const ROOT = join(dirname(SELF), "..");
const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
/** The one gate line (the gate list and its order are not this cut's to change). */
const GATE_LINE = 'gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]';

interface PackageJson {
  readonly scripts?: Readonly<Partial<Record<string, string>>>;
}

const toml = readRepo("forge.toml");

/** The non-blank lines of forge.toml's [<name>] table, in order, or undefined unless exactly one such header exists. */
function tableLines(text: string, name: string): string[] | undefined {
  const lines = text.split("\n");
  const headers = lines.flatMap((line, index) => (line === `[${name}]` ? [index] : []));
  if (headers.length !== 1) return undefined;
  const start = (headers[0] ?? 0) + 1;
  const next = lines.findIndex((line, index) => index >= start && line.startsWith("["));
  return lines.slice(start, next === -1 ? lines.length : next).filter((line) => line.trim() !== "");
}

describe("wb-z0ib: the gate's build step is a [build.commands.build] table with timeout 900", () => {
  it("[B0] the header's pinned reader set names exactly the cases this file registers, in order, by id and title", () => {
    const source = readFileSync(SELF, "utf8");
    const header = source.slice(0, source.indexOf("*/"));
    const listed = [...header.matchAll(/^ \* - (\[B\d+\] .+)$/gm)].map((match) => match[1]);
    const registered = [...source.matchAll(/^ {2}it\((["'])(\[B\d+\] .+?)\1, \(\) => \{$/gm)].map((match) => match[2]);
    expect(registered.length).toBeGreaterThan(0);
    expect(listed).toEqual(registered);
  });

  it('[B1] forge.toml declares the build step as one [build.commands.build] table holding exactly command = "npm run build" and timeout = 900, with no table between it and the [build.commands] table', () => {
    expect(toml.match(/^\[build\.commands\.build\]$/gm)).toHaveLength(1);
    expect(tableLines(toml, "build.commands.build")).toEqual(['command = "npm run build"', "timeout = 900"]);
    const headers = toml.split("\n").filter((line) => line.startsWith("["));
    expect(headers.indexOf("[build.commands.build]")).toBe(headers.indexOf("[build.commands]") + 1);
  });

  it("[B2] the bare build key is gone: the [build.commands] table holds the lint key alone, and no line of forge.toml starts with build =", () => {
    expect(tableLines(toml, "build.commands")).toEqual(['lint = "npm run lint"']);
    expect(toml).not.toMatch(/^build\s*=/m);
  });

  it("[B3] guards: forge.toml keeps one gate line listing the seven steps in order, the typing table and the test table with their commands and timeouts", () => {
    expect(toml.match(/^gate = .*$/gm)).toEqual([GATE_LINE]);
    expect(tableLines(toml, "build.commands.typing")).toEqual(['command = "npm run typecheck && npm run typecheck:test"', "timeout = 900"]);
    expect(tableLines(toml, "build.commands.test")).toEqual(['command = "npm run test"', "timeout = 3600"]);
  });

  it('[B4] resolveTier(ROOT, "build") spells the table chain through package.json scripts.build, and RETRY_ADMITTED_CHAINS holds that one chain and no other', () => {
    const scripts = (JSON.parse(readRepo("package.json")) as PackageJson).scripts ?? {};
    const build = scripts.build;
    expect(build).toBeDefined();
    const tier = resolveTier(ROOT, "build");
    expect(tier.chain).toEqual([`forge.toml [build.commands.build] command = ${JSON.stringify("npm run build")}`, `package.json scripts.build = ${JSON.stringify(build)}`]);
    expect(RETRY_ADMITTED_CHAINS.map((entry) => entry.chain)).toEqual([tier.chain]);
  });
});
