/**
 * wb-ksz implementation (W19/WB-022, owner): the environment handed to the two
 * interpreter launch seams is built by ALLOWLIST, never by subtraction.
 *
 * docs/workbench/12-security.md "Credential boundaries": "Pi operator
 * host/deployment owns credential sourcing ... no serialized clients/private
 * tokens across worker channel"; docs/workbench/17 "Runtime and host
 * requirements": "Credentials sourced from deployment/SDK supported mechanism;
 * no secret copied into script VM." The owner boundary (wb-ksz 16:19Z):
 * "scrubbed-env child (credential vars absent by allowlist)".
 *
 * Measured before the fix: src/workflow/runtime.ts constructed the interpreter
 * Worker with no env option (a copy of process.env by Node's default) and
 * src/workbench/hosts/local-detached.ts spawned the detached host with
 * {...process.env} minus only NODE_OPTIONS/NODE_PATH. Assertions and failure
 * messages name KEYS only, never values.
 */
import { describe, expect, it } from "vitest";
import { DETACHED_HOST_ENV_ALLOWLIST, scrubbedEnvironment } from "../src/workbench/process-env.js";

/** One fake credential-shaped name per family the allowlist must exclude (wb-ksz.3 E3). */
const CANARIES = [
  "W19_CANARY_ANTHROPIC_API_KEY",
  "W19_CANARY_AWS_SECRET_ACCESS_KEY",
  "W19_CANARY_CLAUDE_CODE_OAUTH_TOKEN",
  "W19_CANARY_GITHUB_TOKEN",
  "W19_CANARY_MIDWAY_COOKIE",
  "W19_CANARY_NPM_TOKEN",
];
const CANARY_VALUE = "W19_NOT_A_REAL_CREDENTIAL";

/** The credential-shaped name test wb-ksz.3 applies independently of the allowlist (E4). */
const CREDENTIAL_SHAPED = /TOKEN|SECRET|KEY|PASSWORD|PASSWD|CREDENTIAL|COOKIE|AUTH|SESSION|PRIVATE/i;

function hostile(): NodeJS.ProcessEnv {
  const source: NodeJS.ProcessEnv = {
    PATH: "/usr/bin",
    HOME: "/home/operator",
    TMPDIR: "/tmp/w19",
    LANG: "en_US.UTF-8",
    XDG_RUNTIME_DIR: "/run/user/1000",
    HTTPS_PROXY: "http://proxy.example:3128",
    no_proxy: "localhost",
    NODE_EXTRA_CA_CERTS: "/etc/pki/corp.pem",
    CLAUDE_CONFIG_DIR: "/home/operator/.claude",
    NODE_OPTIONS: "--require /tmp/evil.js",
    NODE_PATH: "/tmp/evil",
    ANTHROPIC_API_KEY: CANARY_VALUE,
    AWS_SECRET_ACCESS_KEY: CANARY_VALUE,
    GITHUB_TOKEN: CANARY_VALUE,
  };
  for (const name of CANARIES) source[name] = CANARY_VALUE;
  return source;
}

describe("scrubbedEnvironment (wb-ksz, W19 credential boundary)", () => {
  it("keeps only allowlisted names and carries none of the credential canaries", () => {
    const env = scrubbedEnvironment(hostile());
    const names = Object.keys(env).sort();
    for (const name of names) expect(DETACHED_HOST_ENV_ALLOWLIST, `${name} is not allowlisted`).toContain(name);
    for (const name of CANARIES) expect(names, `${name} reached the scrubbed environment`).not.toContain(name);
    for (const name of ["ANTHROPIC_API_KEY", "AWS_SECRET_ACCESS_KEY", "GITHUB_TOKEN", "NODE_OPTIONS", "NODE_PATH"]) {
      expect(names, `${name} reached the scrubbed environment`).not.toContain(name);
    }
    expect(names).toEqual(
      ["CLAUDE_CONFIG_DIR", "HOME", "HTTPS_PROXY", "LANG", "NODE_EXTRA_CA_CERTS", "PATH", "TMPDIR", "XDG_RUNTIME_DIR", "no_proxy"].sort(),
    );
  });

  it("copies values verbatim for the names it keeps", () => {
    const env = scrubbedEnvironment(hostile());
    expect(env.PATH).toBe("/usr/bin");
    expect(env.XDG_RUNTIME_DIR).toBe("/run/user/1000");
    expect(env.no_proxy).toBe("localhost");
  });

  it("drops a proxy URL that carries userinfo: a credential by content, not by name", () => {
    const env = scrubbedEnvironment({
      PATH: "/usr/bin",
      HTTPS_PROXY: "http://operator:hunter2@proxy.example:3128",
      https_proxy: "http://proxy.example:3128",
      HTTP_PROXY: "http://token@proxy.example:3128",
      NO_PROXY: "localhost",
    });
    const names = Object.keys(env).sort();
    expect(names).toEqual(["NO_PROXY", "PATH", "https_proxy"]);
    expect(env.https_proxy).toBe("http://proxy.example:3128");
  });

  it("never carries a value that is not a string (an undefined entry is not an empty variable)", () => {
    const env = scrubbedEnvironment({ PATH: undefined, HOME: "/home/operator" });
    expect(Object.keys(env)).toEqual(["HOME"]);
  });

  it("returns a fresh plain object with a null prototype, never the source", () => {
    const source = hostile();
    const env = scrubbedEnvironment(source);
    expect(env).not.toBe(source);
    expect(Object.getPrototypeOf(env)).toBeNull();
    env.PATH = "/changed";
    expect(source.PATH).toBe("/usr/bin");
  });

  it("allowlists no credential-shaped name (the wb-ksz.3 E4 check, applied to the constant itself)", () => {
    expect(DETACHED_HOST_ENV_ALLOWLIST.length).toBeGreaterThan(0);
    for (const name of DETACHED_HOST_ENV_ALLOWLIST) expect(name, `${name} is credential-shaped`).not.toMatch(CREDENTIAL_SHAPED);
    expect(DETACHED_HOST_ENV_ALLOWLIST).not.toContain("NODE_OPTIONS");
    expect(DETACHED_HOST_ENV_ALLOWLIST).not.toContain("NODE_PATH");
    expect(Object.isFrozen(DETACHED_HOST_ENV_ALLOWLIST)).toBe(true);
  });

  it("carries the operational names the detached host measurably needs", () => {
    for (const name of ["PATH", "HOME", "TMPDIR", "XDG_RUNTIME_DIR", "HTTPS_PROXY", "NO_PROXY", "NODE_EXTRA_CA_CERTS", "SSL_CERT_FILE", "CLAUDE_CONFIG_DIR"]) {
      expect(DETACHED_HOST_ENV_ALLOWLIST).toContain(name);
    }
  });
});
