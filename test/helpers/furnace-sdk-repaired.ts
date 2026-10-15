/**
 * furnace-sdk-repaired.ts: a test-only copy of the vendored @furnace/sdk whose
 * contract manifest digest is aligned with the generated validators.
 *
 * The vendored furnace-sdk-0.1.0.tgz ships generated validators from model
 * sha256:e599... beside a manifest naming sha256:b044..., so loadContract()
 * refuses and every context decode throws ContractUnavailableError. That makes
 * ResidentSession (and therefore EmbeddedHost) unable to admit any execute.
 * This helper copies the installed package into a temp directory and rewrites
 * ONLY the manifest digest line, so the adapter's session, cancel and identity
 * behaviour can be proven against the real SDK code. Production code never
 * uses this; the adapter's preflight refuses the shipped drift instead.
 */
import { cpSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import type { FurnaceSdk } from "../../src/workbench/hosts/furnace-hosted.js";

const DIGEST = /sha256:[0-9a-f]{64}/;

export interface RepairedSdk {
  readonly sdk: FurnaceSdk;
  readonly root: string;
  readonly repairedDigest: string;
  readonly shippedManifestDigest: string;
}

export async function loadRepairedFurnaceSdk(): Promise<RepairedSdk> {
  const require = createRequire(import.meta.url);
  const source = dirname(require.resolve("@furnace/sdk/package.json"));
  const root = join(mkdtempSync(join(tmpdir(), "pi-furnace-sdk-repaired-")), "sdk");
  cpSync(source, root, { recursive: true });
  const provenance = readFileSync(join(root, "dist/contract/furnace-executor-contract/provenance.js"), "utf8");
  const generated = DIGEST.exec(provenance)?.[0];
  if (generated === undefined) throw new Error("generated contract provenance names no model digest");
  const manifestPath = join(root, "contract/manifest.json");
  const manifest = readFileSync(manifestPath, "utf8");
  const shipped = /"smithy_model_digest":\s*"(sha256:[0-9a-f]{64})"/.exec(manifest)?.[1];
  if (shipped === undefined) throw new Error("manifest names no smithy_model_digest");
  writeFileSync(manifestPath, manifest.replace(shipped, generated));
  const load = async (path: string): Promise<Record<string, unknown>> => (await import(pathToFileURL(join(root, path)).href)) as Record<string, unknown>;
  const index = (await load("dist/src/index.js")) as unknown as Pick<FurnaceSdk, "ExecutorApp" | "ExecutionResult" | "Furnace" | "decodeContextValue">;
  const embedded = (await load("dist/src/embedded.js")) as unknown as Pick<FurnaceSdk, "EmbeddedHost">;
  const resident = (await load("dist/src/resident_session.js")) as unknown as Pick<FurnaceSdk, "ResidentSession">;
  return { sdk: { ...index, ...embedded, ...resident }, root, repairedDigest: generated, shippedManifestDigest: shipped };
}
