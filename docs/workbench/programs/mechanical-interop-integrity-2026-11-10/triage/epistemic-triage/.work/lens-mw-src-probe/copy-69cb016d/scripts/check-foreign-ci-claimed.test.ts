import test from "node:test";
import assert from "node:assert/strict";
import { accessSync, constants, readFileSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { delimiter, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** MechanicalWorkflows-kw0i (seat ruling 2026-10-20, follow-up to 697m.2): the test step runs the foreign-CI guard, so its
 * declared inputs must claim every path the guard inspects. Otherwise `forge build --impacted` prunes the guard while a
 * guarded path changes (FORGE_GATE_INPUTS_UNCLAIMED, COULD_NOT_JUDGE) and the full gate is the only thing that notices.
 * The guarded list derives from the guard module itself, never a hand copy. */
function guardedPaths(): string[] {
  const source = readFileSync(join(root, "scripts", "check-no-foreign-ci.test.ts"), "utf8");
  const declaration = /const FOREIGN_CI_PATHS = \[([^\]]*)\] as const;/.exec(source);
  assert.ok(declaration, "GUARD_LIST_UNREADABLE: FOREIGN_CI_PATHS declaration not found in scripts/check-no-foreign-ci.test.ts");
  return [...declaration![1]!.matchAll(/"([^"]+)"/g)].map(match => match[1]!);
}

/** Directory-like guard entries: a changed file lives under them, so the nested spelling is probed as well. */
const isDirectoryEntry = (path: string): boolean => !/\.ya?ml$/.test(path) && path !== "Jenkinsfile";
const NEGATIVE_CONTROL = "zzz-kw0i-unclaimed-root-file.txt";

const UNAVAILABLE_REASON = "FORGE_UNAVAILABLE_UNDER_HERMETIC";

/** MechanicalWorkflows-sd774 (SEAT RULING SD774-1): `forge build --hermetic env` hands the test step an environment with no
 * PATH entry for forge, so the bare-name spawn failed ENOENT on main itself. The guard now resolves the forge binary
 * explicitly, FORGE_BIN first, then a PATH lookup over the environment it was handed, and answers a DECLARED skip reason
 * when neither finds one. The plain build still resolves forge from PATH, executes the claims, and fails on any real defect. */
export type ForgeResolution = { readonly binary: string } | { readonly skip: typeof UNAVAILABLE_REASON };

export function isExecutableFile(candidate: string): boolean {
  try {
    if (!statSync(candidate).isFile()) return false;
    accessSync(candidate, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

export function resolveForge(env: Readonly<Record<string, string | undefined>>, executable: (candidate: string) => boolean = isExecutableFile): ForgeResolution {
  const declared = env.FORGE_BIN;
  if (declared !== undefined && declared !== "" && executable(declared)) return { binary: declared };
  for (const directory of (env.PATH ?? "").split(delimiter)) {
    if (directory === "") continue;
    const candidate = join(directory, "forge");
    if (executable(candidate)) return { binary: candidate };
  }
  return { skip: UNAVAILABLE_REASON };
}

function claims(binary: string, paths: readonly string[]): Map<string, string[]> {
  const argv = ["gate", "--path", root, "--list", "--impacted", "--json"];
  for (const path of paths) argv.push("--claim-path", path);
  const run = spawnSync(binary, argv, { cwd: root, encoding: "utf8", env: { ...process.env, FORGE_JSON: "1" }, maxBuffer: 64 * 1024 * 1024 });
  assert.equal(run.error, undefined, `FORGE_UNAVAILABLE: ${String(run.error)}`);
  const envelope = JSON.parse(run.stdout) as { data?: { gate_input_claims?: { paths?: { path: string; claimed_by: string[]; source: string }[] } } };
  const rows = envelope.data?.gate_input_claims?.paths;
  assert.ok(rows, `CLAIM_LISTING_MISSING: forge gate --list --impacted answered no gate_input_claims.paths (exit ${run.status})`);
  const answered = new Map<string, string[]>();
  for (const row of rows!) if (row.source === "explicit") answered.set(row.path, row.claimed_by);
  return answered;
}

const guarded = guardedPaths();
const probes = [...guarded, ...guarded.filter(isDirectoryEntry).map(path => `${path}/nested-ci-config.yml`), NEGATIVE_CONTROL];
const forge = resolveForge(process.env);
const skipReason = "skip" in forge ? `${forge.skip}: forge is not on this step's PATH and FORGE_BIN names no executable; the plain forge build runs the claim checks` : false;
const answered = "binary" in forge ? claims(forge.binary, probes) : new Map<string, string[]>();

test("the guard's own FOREIGN_CI_PATHS list was read, not an empty or truncated one", () => {
  assert.ok(guarded.length >= 10, `GUARD_LIST_SHORT: read ${guarded.length} entries`);
  for (const expected of [".github", ".gitlab-ci.yml", "Jenkinsfile", ".circleci"]) assert.ok(guarded.includes(expected), `GUARD_LIST_MISSING: ${expected}`);
  assert.equal(new Set(probes).size, probes.length, "PROBE_DUPLICATE: a claim-path probe repeats");
});

test("forge claims every path the foreign-CI guard inspects for the test step, so --impacted cannot prune the guard", { skip: skipReason }, () => {
  for (const path of probes.filter(probe => probe !== NEGATIVE_CONTROL)) {
    const claimedBy = answered.get(path);
    assert.ok(claimedBy, `CLAIM_ROW_MISSING: forge answered no explicit row for ${path}`);
    assert.ok(claimedBy!.includes("test"), `FOREIGN_CI_PATH_UNCLAIMED: ${path} claimed_by ${JSON.stringify(claimedBy)} lacks the test step`);
  }
});

test("negative control: a fresh root file outside every input glob stays unclaimed, so the listing discriminates", { skip: skipReason }, () => {
  assert.deepEqual(answered.get(NEGATIVE_CONTROL), []);
});

test("sd774: resolveForge prefers an executable FORGE_BIN, then the first PATH directory holding an executable forge", () => {
  const executable = (candidate: string): boolean => candidate === "/opt/forge/forge" || candidate === join("/usr/local/bin", "forge") || candidate === "/custom/forge";
  assert.deepEqual(resolveForge({ FORGE_BIN: "/custom/forge", PATH: "/opt/forge" }, executable), { binary: "/custom/forge" });
  assert.deepEqual(resolveForge({ PATH: `/nowhere${delimiter}${delimiter}/opt/forge${delimiter}/usr/local/bin` }, executable), { binary: "/opt/forge/forge" });
  assert.deepEqual(resolveForge({ FORGE_BIN: "/missing/forge", PATH: "/usr/local/bin" }, executable), { binary: join("/usr/local/bin", "forge") });
});

test("sd774: resolveForge answers the declared skip reason when the hermetic step environment carries no forge", () => {
  const none = (): boolean => false;
  assert.deepEqual(resolveForge({}, none), { skip: "FORGE_UNAVAILABLE_UNDER_HERMETIC" });
  assert.deepEqual(resolveForge({ PATH: "", FORGE_BIN: "" }, none), { skip: "FORGE_UNAVAILABLE_UNDER_HERMETIC" });
  assert.deepEqual(resolveForge({ PATH: "/usr/bin", FORGE_BIN: "/missing/forge" }, none), { skip: "FORGE_UNAVAILABLE_UNDER_HERMETIC" });
});

test("sd774: the real executable probe accepts an executable file and refuses a directory and a missing path", () => {
  assert.equal(isExecutableFile(process.execPath), true);
  assert.equal(isExecutableFile(root), false);
  assert.equal(isExecutableFile(join(root, "zzz-sd774-missing-forge")), false);
});
