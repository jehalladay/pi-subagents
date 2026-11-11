/** Transient local installer/loader for an exact SHA-256-pinned npm tarball. */
import { mkdtemp, copyFile, writeFile, realpath, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { DevelopmentOutcome } from "@mechanical/workflows-development";
import { assertArtifactFile, digestFile, invokePinnedDevelopment, type PinnedHostOptions } from "./entrypoint-host.js";

const exec = promisify(execFile);
/** No network, install scripts, or workspace source dependencies are permitted. */
export interface InstalledHostOptions extends Omit<PinnedHostOptions,"load"> {
  /** Trusted injection seam for the final module import (tests count it); defaults to the platform `import()`. */
  readonly importModule?: (url: string) => Promise<unknown>;
}
export async function invokeInstalledDevelopment(options: InstalledHostOptions, input: unknown): Promise<DevelopmentOutcome> {
  // Refuse symlinks, directories, FIFOs and unsafe paths before the copy below follows or blocks on them.
  await assertArtifactFile(options.artifactPath);
  const root = await mkdtemp(join(tmpdir(),"mw-installed-host-"));
  try {
    const artifact = join(root,"development.tgz");
    await copyFile(options.artifactPath,artifact);
    await writeFile(join(root,"package.json"),'{"name":"mw-host-install","private":true,"type":"module"}\n');
    return await invokePinnedDevelopment({
      artifactPath: artifact,
      artifactDigest: options.artifactDigest, descriptor: options.descriptor, entrypointId: options.entrypointId,
      contractVersion: options.contractVersion, services: options.services,
      load: async () => {
        // `npm` consumes the copied artifact after its digest has been checked.
        // Lock this installation to the local tarball and disable all lifecycle scripts.
        await exec("npm",["install","--ignore-scripts","--offline","--no-audit","--no-fund","--no-save",artifact],{
          cwd:root, timeout:120_000, maxBuffer:1024*1024, encoding:"utf8",
          env:{...process.env,npm_config_update_notifier:"false"},
        });
        // The install barrier is async: re-verify the bytes npm consumed before trusting anything it wrote.
        if (await digestFile(artifact) !== options.artifactDigest) throw new Error("ENTRYPOINT_ARTIFACT_MISMATCH: artifact bytes changed during installation");
        // A returned npm success is not proof it installed the expected package.
        const manifestText = await readFile(join(root,"node_modules","@mechanical","workflows-development","package.json"),"utf8");
        const manifest: unknown = JSON.parse(manifestText);
        if (manifest === null || typeof manifest !== "object" ||
            (manifest as Record<string,unknown>)["name"] !== "@mechanical/workflows-development") {
          throw new Error("ENTRYPOINT_INSTALLED_PACKAGE_MISMATCH: wrong package identity");
        }
        const base = await realpath(join(root,"node_modules","@mechanical","workflows-development"));
        // Compare resolved against resolved: a symlinked TMPDIR (macOS /var -> /private/var) must not read as an escape.
        const isolated = await realpath(root);
        if (!base.startsWith(isolated+sep)) throw new Error("ENTRYPOINT_INSTALL_OUTSIDE_ROOT: installed package escaped isolated directory");
        const url = pathToFileURL(join(base,"dist","index.js")).href;
        // Last check before the trusted import: the tarball must still hold the admitted bytes.
        if (await digestFile(artifact) !== options.artifactDigest) throw new Error("ENTRYPOINT_ARTIFACT_MISMATCH: artifact bytes changed before import");
        const installed: unknown = await (options.importModule ?? ((target: string) => import(target)))(url);
        const develop = installed !== null && typeof installed === "object" && "develop" in installed
          ? (installed as Record<string,unknown>)["develop"] : undefined;
        if (typeof develop !== "function") throw new Error("ENTRYPOINT_EXPORT_INVALID: artifact has no develop export");
        return {develop: develop as (services: PinnedHostOptions["services"], request: {task:string;workspaceId:string;baseRevision:string})=>Promise<unknown>};
      },
    },input);
  } finally {
    await rm(root,{recursive:true,force:true});
  }
}
