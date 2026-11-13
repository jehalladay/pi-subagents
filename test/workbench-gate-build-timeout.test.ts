/**
 * wb-z0ib (owner-filed from the post-landing tier row M:79244): the complete gate's build step carries an explicit
 * timeout. The row records why: forge.toml declared the step as a bare key under [build.commands], so forge ran it under
 * its per-command default of 300 s; under host load that run was killed at 315 s (stepReds "build [step-timeout]"), and
 * with dist/ absent the dist-dependent tests red as a consequence. The cut declares the step as its own table with
 * timeout = 900, the sibling of the typing table (900) and the test table (3600), and moves the reader the bead names, the
 * retry census's admitted chain in the census helper (RETRY_ADMITTED_CHAINS), to the table spelling that resolveTier gives
 * a table step.
 *
 * B1, B2 and B3 read forge.toml as text lines: a header line is a line that starts with [, the [<name>] header line is
 * a line that is [<name>] verbatim, and the lines under a header line are the non-blank lines after it up to the next
 * header line. B4 reads forge.toml through resolveTier's parser.
 *
 * PINNED READER SET (list lines of the form * - [B<n>] <title>, by id and title in registration order; B0 holds these
 * list lines equal to the cases registered by a line of the form it(<quote>[B<n>] <title><quote>, () => { at two-space
 * indentation):
 * - [B0] the header's pinned reader set lists, in order, by id and title, exactly the cases registered by a line of the form it(<quote>[B<n>] <title><quote>, () => { at two-space indentation
 * - [B1] exactly one line of forge.toml is [build.commands.build] verbatim, it is the next header line after the [build.commands] header line, and the lines under it are exactly command = "npm run build" and timeout = 900
 * - [B2] the lines under the [build.commands] header line are exactly lint = "npm run lint", and no line of forge.toml starts with build followed by optional whitespace and =
 * - [B3] guards: the lines of forge.toml that start with `gate = ` are exactly the one line GATE_LINE (the seven steps in order), the lines under the [build.commands.typing] header line are exactly command = "npm run typecheck && npm run typecheck:test" and timeout = 900, and the lines under the [build.commands.test] header line are exactly command = "npm run test" and timeout = 3600
 * - [B4] resolveTier(ROOT, "build") spells the table chain through package.json scripts.build, and RETRY_ADMITTED_CHAINS holds that one chain and no other
 *
 * Falsifiers: B1 reds when no line or more than one line is [build.commands.build] verbatim, when another header line
 * comes between the [build.commands] header line and it, or when a line under it is changed, added or removed; B2 reds
 * when a line under the [build.commands] header line is changed, added or removed (the bare build key returning there
 * included), when no line or more than one line is [build.commands] verbatim, or when a line of forge.toml starts with
 * build followed by optional whitespace and =; B3 reds when a line that starts with `gate = ` differs from GATE_LINE,
 * is added or is removed, when a line under the typing or the test header line is changed, added or removed, or when no
 * line or more than one line is [build.commands.typing] or [build.commands.test] verbatim; B4 reds when the census
 * helper's admitted chain keeps the bare-key spelling, gains a second entry, or no longer matches package.json
 * scripts.build, and when a header line [ build.commands.build ] (TOML's spaced spelling of the same table) follows the
 * build table, since the parser resolveTier uses refuses a table declared twice and resolveTier then returns an empty
 * chain; B0 reds when it reads no registration, or when the list lines and the registrations it reads stop matching one
 * for one in order (a registration renamed, added, dropped or reordered without the same change to the list lines, or a
 * list line changed, added, dropped or reordered without the same change to the registrations).
 *
 * NOT CLAIMED: how forge enforces the timeout on the gate host is NOT CLAIMED by this file; the next post-landing tier row
 * on a trunk holding this cut is that record. That 900 s suffices at every host load is NOT CLAIMED by this file. The
 * retry census's whole reading of the build step (its kind) is NOT CLAIMED by this file; the landed tree row of
 * test/workbench-retry-census.test.ts reads it. That no other landed reader spells the bare build key is NOT CLAIMED by
 * this file. Sub-table headers of the build, typing and test tables ([build.commands.build.<x>],
 * [build.commands.typing.<x>], [build.commands.test.<x>]), which TOML reads as keys of those tables, are NOT CLAIMED by
 * this file: B1 and B3 read the lines under each header line, not the parsed tables. A repeat of the build table in any
 * spelling other than [build.commands.build] verbatim (B1) and [ build.commands.build ] after the table (B4) is NOT
 * CLAIMED by this file. A case registered in any other shape than the one B0 reads (through test(), at another
 * indentation such as inside a nested describe, with an async or parameterised body, with a title that lacks a [B<n>]
 * id, or with the title or the body opener on another line) is NOT CLAIMED by this file.
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

/** The non-blank lines under forge.toml's [<name>] header line, in order, up to the next line that starts with [, or undefined unless exactly one line is [<name>] verbatim. */
function tableLines(text: string, name: string): string[] | undefined {
  const lines = text.split("\n");
  const headers = lines.flatMap((line, index) => (line === `[${name}]` ? [index] : []));
  if (headers.length !== 1) return undefined;
  const start = (headers[0] ?? 0) + 1;
  const next = lines.findIndex((line, index) => index >= start && line.startsWith("["));
  return lines.slice(start, next === -1 ? lines.length : next).filter((line) => line.trim() !== "");
}

describe("wb-z0ib: the gate's build step is a [build.commands.build] table with timeout 900", () => {
  it("[B0] the header's pinned reader set lists, in order, by id and title, exactly the cases registered by a line of the form it(<quote>[B<n>] <title><quote>, () => { at two-space indentation", () => {
    const source = readFileSync(SELF, "utf8");
    const header = source.slice(0, source.indexOf("*/"));
    const listed = [...header.matchAll(/^ \* - (\[B\d+\] .+)$/gm)].map((match) => match[1]);
    const registered = [...source.matchAll(/^ {2}it\((["'])(\[B\d+\] .+?)\1, \(\) => \{$/gm)].map((match) => match[2]);
    expect(registered.length).toBeGreaterThan(0);
    expect(listed).toEqual(registered);
  });

  it('[B1] exactly one line of forge.toml is [build.commands.build] verbatim, it is the next header line after the [build.commands] header line, and the lines under it are exactly command = "npm run build" and timeout = 900', () => {
    expect(toml.match(/^\[build\.commands\.build\]$/gm)).toHaveLength(1);
    expect(tableLines(toml, "build.commands.build")).toEqual(['command = "npm run build"', "timeout = 900"]);
    const headers = toml.split("\n").filter((line) => line.startsWith("["));
    expect(headers.indexOf("[build.commands.build]")).toBe(headers.indexOf("[build.commands]") + 1);
  });

  it('[B2] the lines under the [build.commands] header line are exactly lint = "npm run lint", and no line of forge.toml starts with build followed by optional whitespace and =', () => {
    expect(tableLines(toml, "build.commands")).toEqual(['lint = "npm run lint"']);
    expect(toml).not.toMatch(/^build\s*=/m);
  });

  it('[B3] guards: the lines of forge.toml that start with `gate = ` are exactly the one line GATE_LINE (the seven steps in order), the lines under the [build.commands.typing] header line are exactly command = "npm run typecheck && npm run typecheck:test" and timeout = 900, and the lines under the [build.commands.test] header line are exactly command = "npm run test" and timeout = 3600', () => {
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
