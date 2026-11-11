/**
 * Version-aware capability check for the Claude Agent SDK abort control (EAT-R014, MechanicalWorkflows-loexn.8).
 * The host forwards a cancellation through options.abortController; whether the installed SDK declares that
 * option is read from its own shipped type declarations, never inferred from a version number, so an abort test
 * against an SDK without the control skips with a stated reason instead of passing.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { CLAUDE_AGENT_SDK_NAME, readSdkIdentity, type SdkIdentity } from "./invocation-identity.js";

export interface SdkAbortControlSupport {
  readonly supported: boolean;
  /** The resolved SDK version the verdict is about; null when no manifest could be read. */
  readonly version: string | null;
  /** Why the control is not usable; null exactly when supported. */
  readonly reason: string | null;
}

const MAX_DECLARATION_FILES = 64;
const MAX_DECLARATION_DEPTH = 4;
const MAX_DECLARATION_BYTES = 4_000_000;
/** The Options type (interface or type alias) whose body is searched; a declaration elsewhere is not the SDK option. */
const OPTIONS_DECLARATION = /\b(?:interface|type)\s+Options\b/g;
/** A property declaration `abortController?: ...` or `abortController: ...` at the top level of the Options body. */
const ABORT_CONTROL_MEMBER = /(^|[\s;,])abortController\s*\??\s*:/;

/** Removes block and line comments so a mention inside one never reads as a declaration. */
function stripComments(text: string): string {
  return text.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
}

/** True when the declaration text has a top-level `abortController` member in an `Options` interface or type. */
function declaresOptionsAbortController(declarationText: string): boolean {
  const text = stripComments(declarationText);
  for (const match of text.matchAll(OPTIONS_DECLARATION)) {
    const open = text.indexOf("{", match.index + match[0].length);
    if (open < 0) continue;
    let depth = 0;
    let top = "";
    for (let i = open; i < text.length; i++) {
      const ch = text.charAt(i);
      if (ch === "{") { depth++; if (depth > 1) top += " "; continue; }
      if (ch === "}") { depth--; if (depth === 0) break; continue; }
      top += depth === 1 ? ch : " ";
    }
    if (ABORT_CONTROL_MEMBER.test(top)) return true;
  }
  return false;
}

/** Pure verdict from the resolved SDK identity and the text of its shipped declarations. */
export function sdkAbortControlSupport(identity: SdkIdentity | null, declarationText: string | null): SdkAbortControlSupport {
  if (identity === null) {
    return { supported: false, version: null, reason: "SDK_ABORT_CONTROL_UNVERIFIED: no installed " + CLAUDE_AGENT_SDK_NAME + " manifest could be read, so the abort control is not shown to exist" };
  }
  if (declarationText === null) {
    return { supported: false, version: identity.version, reason: "SDK_ABORT_CONTROL_UNVERIFIED: no declaration files could be read for " + identity.name + " " + identity.version + ", so the abort control is not shown to exist" };
  }
  if (!declaresOptionsAbortController(declarationText)) {
    return { supported: false, version: identity.version, reason: "SDK_ABORT_CONTROL_UNAVAILABLE: " + identity.name + " " + identity.version + " declares no abortController option in its Options type" };
  }
  return { supported: true, version: identity.version, reason: null };
}

/** Joined text of the bounded .d.ts files under a package directory; null when the directory holds none. */
export function readSdkDeclarations(packageDir: string): string | null {
  const parts: string[] = [];
  let bytes = 0;
  const walk = (dir: string, depth: number): void => {
    if (depth > MAX_DECLARATION_DEPTH || parts.length >= MAX_DECLARATION_FILES) return;
    let names: string[];
    try { names = readdirSync(dir).sort(); } catch { return; }
    for (const name of names) {
      if (parts.length >= MAX_DECLARATION_FILES || name === "node_modules") continue;
      const path = join(dir, name);
      try {
        const info = statSync(path);
        if (info.isDirectory()) walk(path, depth + 1);
        else if (name.endsWith(".d.ts") && bytes + info.size <= MAX_DECLARATION_BYTES) { parts.push(readFileSync(path, "utf8")); bytes += info.size; }
      } catch { /* an unreadable entry contributes nothing */ }
    }
  };
  walk(packageDir, 0);
  return parts.length === 0 ? null : parts.join("\n");
}

/** Locates the installed SDK package directory by its manifest; null when it is not installed. */
function locateInstalledSdk(): { readonly dir: string; readonly manifest: string } | null {
  const require = createRequire(import.meta.url);
  try {
    const manifestPath = require.resolve(CLAUDE_AGENT_SDK_NAME + "/package.json");
    return { dir: dirname(manifestPath), manifest: readFileSync(manifestPath, "utf8") };
  } catch { /* exports map may hide it, or the package is absent */ }
  try {
    let dir = dirname(require.resolve(CLAUDE_AGENT_SDK_NAME));
    for (let depth = 0; depth < 8; depth++) {
      try {
        const manifest = readFileSync(join(dir, "package.json"), "utf8");
        if ((JSON.parse(manifest) as { name?: unknown }).name === CLAUDE_AGENT_SDK_NAME) return { dir, manifest };
      } catch { /* keep walking up */ }
      const up = dirname(dir);
      if (up === dir) break;
      dir = up;
    }
  } catch { /* not installed */ }
  return null;
}

/** The verdict for the SDK actually installed beside this app; unverified when it is absent or unreadable. */
export async function readInstalledSdkAbortSupport(): Promise<SdkAbortControlSupport> {
  const installed = locateInstalledSdk();
  if (installed === null) return sdkAbortControlSupport(null, null);
  let identity: SdkIdentity;
  try { identity = readSdkIdentity(installed.manifest); } catch { return sdkAbortControlSupport(null, null); }
  return sdkAbortControlSupport(identity, readSdkDeclarations(installed.dir));
}
