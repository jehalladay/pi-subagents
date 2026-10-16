/**
 * The environment handed to an interpreter launch seam — built by ALLOWLIST,
 * never by subtraction.
 *
 * docs/workbench/12 "Credential boundaries": the Pi operator host owns
 * credential sourcing and no private token crosses the worker channel;
 * docs/workbench/17: credentials come from the deployment's or the SDK's
 * supported mechanism and no secret is copied into the script VM. Subtracting
 * known-bad names from `process.env` cannot deliver that — a credential the
 * list did not anticipate passes — so the two seams that launch an
 * interpreter (the embedded worker in src/workflow/runtime.ts and the detached
 * host in src/workbench/hosts/local-detached.ts) take only what is named here.
 * The wb-ksz.3 census pins both seams from the outside; this module is the
 * one place the names live.
 *
 * Every name is operational and none is credential-shaped: paths and locale
 * for a Node process, the runtime directory the detached socket base reads,
 * the proxy and CA variables the Claude SDK's CLI child needs to reach the
 * network, and the CLI's own config directory (its credential STORE lives
 * under HOME; the credential itself is never an environment variable here).
 */
export const DETACHED_HOST_ENV_ALLOWLIST: readonly string[] = Object.freeze([
  "PATH",
  "HOME",
  "TMPDIR",
  "TMP",
  "TEMP",
  "LANG",
  "LC_ALL",
  "LC_CTYPE",
  "TERM",
  "TZ",
  "PWD",
  "USER",
  "LOGNAME",
  "SHELL",
  "NODE_ENV",
  "CI",
  "XDG_RUNTIME_DIR",
  "XDG_CONFIG_HOME",
  "XDG_CACHE_HOME",
  "XDG_DATA_HOME",
  "XDG_STATE_HOME",
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "no_proxy",
  "NODE_EXTRA_CA_CERTS",
  "SSL_CERT_FILE",
  "SSL_CERT_DIR",
  "CLAUDE_CONFIG_DIR",
]);

/** Proxy variables: allowlisted by name, but a URL carrying userinfo is a credential by content. */
const PROXY_VARIABLES: ReadonlySet<string> = new Set(["HTTP_PROXY", "HTTPS_PROXY", "http_proxy", "https_proxy"]);

/** `scheme://user[:pass]@host` — the one place a proxy variable can smuggle a credential. */
const URL_USERINFO = /^[a-z][a-z0-9+.-]*:\/\/[^/?#]*@/i;

/**
 * Project `source` onto the allowlist: only allowlisted names, only string
 * values, and no proxy URL that embeds userinfo (dropped, not rewritten — a
 * rewritten URL would silently route through a proxy the operator configured
 * with a credential). The result is a fresh null-prototype object, so a
 * launch option built from it carries nothing the source did not name.
 */
export function scrubbedEnvironment(
  source: NodeJS.ProcessEnv,
  allowlist: readonly string[] = DETACHED_HOST_ENV_ALLOWLIST,
): Record<string, string> {
  const env: Record<string, string> = Object.create(null);
  for (const name of allowlist) {
    const value = source[name];
    if (typeof value !== "string") continue;
    if (PROXY_VARIABLES.has(name) && URL_USERINFO.test(value)) continue;
    env[name] = value;
  }
  return env;
}
