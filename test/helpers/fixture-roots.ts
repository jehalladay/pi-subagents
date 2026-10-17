/**
 * fixture-roots.ts: the shortScratchBase() rule for test fixture roots that hold a Unix socket (wb-70b R1).
 *
 * A fixture root built under the inherited TMPDIR inherits its depth, and a socket under it then exceeds the
 * 103-byte bound the hosts keep (Linux sun_path is 108 bytes with its NUL). Owner ruling (wb-0kg.4 F5,
 * 2026-10-15T22:15Z): the base follows the host rule, XDG_RUNTIME_DIR first and /tmp only as the RECORDED
 * fallback (Furnace's own tests' order), never /tmp first, and never the inherited TMPDIR.
 */
import { statSync } from "node:fs";
import { resolve } from "node:path";

/** The hosts' socket path bound (src/workbench/hosts/local-detached.ts DETACHED_SOCKET_PATH_LIMIT). */
export const SOCKET_PATH_BOUND = 103;
/** The recorded fallback only: never chosen while XDG_RUNTIME_DIR is usable. */
export const SCRATCH_FALLBACK_BASE = "/tmp";
export type ScratchSource = "xdg-runtime-dir" | "tmp-fallback";
export interface ScratchBase {
  readonly path: string;
  readonly source: ScratchSource;
  /** Why XDG_RUNTIME_DIR was not usable; present exactly when source is tmp-fallback. */
  readonly reason?: string;
}

function isDirectory(path: string): boolean {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

/**
 * XDG_RUNTIME_DIR when it is set, absolute, already normalized, a directory, and at most `maxBytes` long (the
 * room the caller's socket layout leaves under the bound); otherwise /tmp, with the reason recorded.
 */
export function chooseScratchBase(env: Readonly<Record<string, string | undefined>>, maxBytes: number, directory: (path: string) => boolean = isDirectory): ScratchBase {
  const fallback = (reason: string): ScratchBase => ({ path: SCRATCH_FALLBACK_BASE, source: "tmp-fallback", reason });
  const runtime = env.XDG_RUNTIME_DIR;
  if (runtime === undefined || runtime === "") return fallback("XDG_RUNTIME_DIR is unset");
  if (!runtime.startsWith("/") || resolve(runtime) !== runtime) return fallback("XDG_RUNTIME_DIR is not a normalized absolute path");
  if (Buffer.byteLength(runtime) > maxBytes) return fallback(`XDG_RUNTIME_DIR is longer than ${maxBytes} bytes`);
  if (!directory(runtime)) return fallback("XDG_RUNTIME_DIR is not a directory");
  return { path: runtime, source: "xdg-runtime-dir" };
}

/** The bytes a base may take when `suffix` (the caller's fixture and socket layout past the base) must fit the bound. */
export function scratchBaseBudget(suffix: string): number {
  return SOCKET_PATH_BOUND - Buffer.byteLength(suffix);
}
