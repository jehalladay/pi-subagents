import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildInvocationIdentity, differingAxes, readSdkIdentity, type InvocationIdentityInput } from "../dist/invocation-identity.js";
import { runClaudeImplementation } from "../dist/claude-implement.js";

/**
 * EAT-R032 (MechanicalWorkflows-loexn.8): the receipt sdk field is a semver string equal to the resolved package.json
 * version at run time, never a literal from docs; a version that is not semver is refused before dispatch; the SDK
 * version is one identity axis, so changing only it changes the identity and names that axis.
 */
const SDK_NAME = "@anthropic-ai/claude-agent-sdk";
const manifest = (version: unknown): string => JSON.stringify({ name: SDK_NAME, version });
const ok = { type: "result", subtype: "success", session_id: "s-pin", result: "changed", num_turns: 1, total_cost_usd: 0.01 };
type Input = { prompt: string; options: Record<string, unknown> };
const loader = (seen?: Input[]) => async () => ({ query: (input: Input) => { seen?.push(input); return (async function* () { yield ok; })(); } });
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..", "..");

test("EAT-R032: the receipt sdk version equals the version in the manifest read at run time, for versions generated per run", async () => {
  const stamp = Date.now();
  const generated = ["0." + (stamp % 1000) + "." + (stamp % 97), (1 + (stamp % 9)) + ".0.0-rc." + (stamp % 13), "2.3.4+build." + (stamp % 1000)];
  for (const version of generated) {
    const out = await runClaudeImplementation("/r", "p", {}, loader(), async () => manifest(version));
    assert.deepEqual(out.replay?.sdk, { name: SDK_NAME, version });
    assert.match(out.replay?.sdk?.version ?? "", SEMVER, version);
  }
});

test("EAT-R032: a manifest version that is not a semantic version is refused before the query dispatches", async () => {
  const notSemver = ["latest", "1.2", "v1.2.3", "01.2.3", "1.2.3.4", "^1.2.3", "1.2.x", "1.2.3-", "1.2.3-01", "1.2.3+", " 1.2.3", "1.2.3 "];
  for (const version of notSemver) {
    const seen: Input[] = [];
    await assert.rejects(() => runClaudeImplementation("/r", "p", {}, loader(seen), async () => manifest(version)), /CLAUDE_AGENT_SDK_MANIFEST_INVALID/, JSON.stringify(version));
    assert.equal(seen.length, 0, "no query for " + JSON.stringify(version));
    assert.throws(() => readSdkIdentity(manifest(version)), /CLAUDE_AGENT_SDK_MANIFEST_INVALID/, JSON.stringify(version));
  }
  for (const version of ["0.0.1", "1.2.3", "10.20.30", "1.0.0-alpha.1", "1.0.0-0.3.7", "1.0.0+20130313144700", "1.0.0-beta+exp.sha.5114f85"]) {
    assert.deepEqual(readSdkIdentity(manifest(version)), { name: SDK_NAME, version }, version);
  }
});

test("EAT-R032: changing only the SDK version changes the sdk axis and the identity digest and no other axis", () => {
  const base: InvocationIdentityInput = {
    source: { commit: "a".repeat(40), tree: "b".repeat(40) },
    sdk: { name: SDK_NAME, version: "1.2.3" },
    promptSha256: "c".repeat(64), settingsSha256: "d".repeat(64), gateManifestSha256: "e".repeat(64), skills: [],
  };
  const one = buildInvocationIdentity(base);
  const patch = buildInvocationIdentity({ ...base, sdk: { name: SDK_NAME, version: "1.2.4" } });
  assert.notEqual(patch.identitySha256, one.identitySha256);
  assert.deepEqual(differingAxes(one, patch), ["sdk"]);
  const prerelease = buildInvocationIdentity({ ...base, sdk: { name: SDK_NAME, version: "1.2.3-rc.1" } });
  assert.deepEqual(differingAxes(one, prerelease), ["sdk"]);
});

test("EAT-R032: the SDK stays an unlisted runtime-resolved package and docs/10 records that peer-dependency decision", () => {
  const manifestOfRig = JSON.parse(readFileSync(join(repoRoot, "apps", "development-rig", "package.json"), "utf8")) as Record<string, Record<string, string> | undefined>;
  for (const field of ["dependencies", "peerDependencies", "optionalDependencies", "devDependencies"]) {
    assert.equal(Object.hasOwn(manifestOfRig[field] ?? {}, SDK_NAME), false, field + " must not list the SDK");
  }
  const docs = readFileSync(join(repoRoot, "docs", "10-current-state-and-gaps.md"), "utf8");
  assert.match(docs, /EAT-R032[^\n]*peer-dependency decision/);
  assert.match(docs, /resolved at run time/);
});
