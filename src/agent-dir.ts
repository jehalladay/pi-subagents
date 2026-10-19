/**
 * The agent config directory without importing "@earendil-works/pi-coding-agent" (wb-nl8.3).
 *
 * src/workflow/saved.ts and src/memory.ts need only this path, and importing it from the package loaded the package's
 * whole 21 MB entry (and the pi-ai copy nested under it) into every module graph that reached them. This module is
 * the local copy: it imports Node built-ins only, so loading saved.ts or memory.ts loads no Pi package at all.
 *
 * It mirrors @earendil-works/pi-coding-agent 1.1.0 for the stock-branded host:
 *  - dist/config.js getAgentDir: PI_CODING_AGENT_DIR, when non-empty, through expandTildePath; otherwise
 *    join(homedir(), ".pi", "agent");
 *  - dist/config.js expandTildePath is normalizePath(path) with its default options;
 *  - dist/utils/paths.js normalizePath: on win32 a Git Bash, MSYS, Cygwin or WSL drive path ("/c/x", "/mnt/c/x",
 *    "/cygdrive/c/x") is rewritten to "C:\x"; "~" and "~/..." (and "~\..." on win32) resolve against homedir();
 *    a "file://" URL goes through fileURLToPath; anything else is returned as given (no trim).
 * The environment, the home directory and the platform are read at call time, as the package reads them.
 *
 * Bound: the package derives the variable name and the config directory from its own package.json piConfig
 * (name "pi", configDir ".pi"). A host that re-brands them (PI_PACKAGE_DIR or a compiled binary carrying its own
 * piConfig) resolves its own directory, while this copy keeps "PI_CODING_AGENT_DIR" and ".pi".
 * test/agent-dir.test.ts pins value equality with the package's own getAgentDir.
 */
import { homedir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const AGENT_DIR_ENV = "PI_CODING_AGENT_DIR";
const CONFIG_DIR_NAME = ".pi";
const WINDOWS_SHELL_DRIVE = /^\/(?:mnt\/|cygdrive\/)?([a-z])(?:\/(.*))?$/i;

/** normalizeWindowsShellPath: "/c/Users/x" -> "C:\Users\x"; a UNC path or a path holding a backslash is left alone. */
function windowsShellPath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return path;
  const match = WINDOWS_SHELL_DRIVE.exec(path);
  if (!match) return path;
  return `${match[1].toUpperCase()}:\\${match[2]?.replaceAll("/", "\\") ?? ""}`;
}

/** expandTildePath / normalizePath with the package's default options, in the package's order. */
function expandAgentDir(path: string): string {
  const windows = process.platform === "win32";
  const normalized = windows ? windowsShellPath(path) : path;
  const home = homedir();
  if (normalized === "~") return home;
  if (normalized.startsWith("~/") || (windows && normalized.startsWith("~\\"))) return join(home, normalized.slice(2));
  if (/^file:\/\//.test(normalized)) return fileURLToPath(normalized);
  return normalized;
}

/** The agent config directory: $PI_CODING_AGENT_DIR when set and non-empty, otherwise ~/.pi/agent. */
export function getAgentDir(): string {
  const fromEnvironment = process.env[AGENT_DIR_ENV];
  if (fromEnvironment) return expandAgentDir(fromEnvironment);
  return join(homedir(), CONFIG_DIR_NAME, "agent");
}
