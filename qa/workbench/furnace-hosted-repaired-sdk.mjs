// wb-0kg.4 (VC-7 / W18-D): the REPAIRED @furnace/sdk copy for the FIXTURE-tier retry-fault receipt, loadable by
// plain node. The recipe is test/helpers/furnace-sdk-repaired.ts's (wb-zmd): copy the INSTALLED package into a temp
// directory and rewrite ONLY contract/manifest.json's smithy_model_digest to the generated validators' provenance
// digest, so the vendored 0.1.0 drift (manifest b044... beside validators e599...) stops refusing every context decode.
// It is plain ESM because the receipt runner cannot load a TypeScript helper with runtime imports (wb-g5o gives that
// helper ./scratch.js, which imports vitest and src). The default-gate tier pins this copy to the helper's recipe: the
// same repaired and shipped digests, and both decode the context the shipped SDK refuses
// (test/workbench-furnace-hosted-retry-fault.test.ts). Production code never uses either; the adapter's preflight
// refuses the shipped drift instead.
import {cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname, join} from 'node:path';
import {pathToFileURL} from 'node:url';

const DIGEST = /sha256:[0-9a-f]{64}/;
const MANIFEST_DIGEST = /"smithy_model_digest":\s*"(sha256:[0-9a-f]{64})"/;

/**
 * Copy the installed @furnace/sdk under a fresh directory in tempRoot and load its index, embedded host and resident
 * session from the copy. Returns {sdk, root, repairedDigest, shippedManifestDigest, dispose}; dispose() removes the copy.
 */
export async function loadRepairedSdkCopy(tempRoot) {
  if (typeof tempRoot !== 'string' || !tempRoot.startsWith('/')) throw new Error('loadRepairedSdkCopy: tempRoot must be an absolute path.');
  const require = createRequire(import.meta.url);
  const source = dirname(require.resolve('@furnace/sdk/package.json'));
  const holder = mkdtempSync(join(tempRoot, 'pi-furnace-sdk-repaired-'));
  const dispose = () => rmSync(holder, {recursive: true, force: true});
  try {
    const root = join(holder, 'sdk');
    cpSync(source, root, {recursive: true});
    const provenance = readFileSync(join(root, 'dist/contract/furnace-executor-contract/provenance.js'), 'utf8');
    const repairedDigest = DIGEST.exec(provenance)?.[0];
    if (repairedDigest === undefined) throw new Error('generated contract provenance names no model digest');
    const manifestPath = join(root, 'contract/manifest.json');
    const manifest = readFileSync(manifestPath, 'utf8');
    const shippedManifestDigest = MANIFEST_DIGEST.exec(manifest)?.[1];
    if (shippedManifestDigest === undefined) throw new Error('manifest names no smithy_model_digest');
    writeFileSync(manifestPath, manifest.replace(shippedManifestDigest, repairedDigest));
    const load = path => import(pathToFileURL(join(root, path)).href);
    const index = await load('dist/src/index.js');
    const embedded = await load('dist/src/embedded.js');
    const resident = await load('dist/src/resident_session.js');
    const sdk = {
      ExecutorApp: index.ExecutorApp,
      ExecutionResult: index.ExecutionResult,
      Furnace: index.Furnace,
      decodeContextValue: index.decodeContextValue,
      EmbeddedHost: embedded.EmbeddedHost,
      ResidentSession: resident.ResidentSession,
    };
    return {sdk, root, repairedDigest, shippedManifestDigest, dispose};
  } catch (error) {
    dispose();
    throw error;
  }
}
