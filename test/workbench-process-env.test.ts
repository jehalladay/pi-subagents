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

/**
 * wb-973.6 / wb-973.7 (SCG-R6 / SCG-R7, one cut by owner grooming ruling): the swarm rf workspace
 * locators. docs/workbench/13 "Host boundary" names RF_WORKSPACE and SWARM_RF_WORKSPACE as the
 * documented channel a hosted agent reads its rf workspace from; the detached host's child receives
 * them by allowlist exactly as the embedded host's child inherits them (test/workbench-env-scrub-census
 * pins both seams). Both are directory paths: operational locators, not credentials.
 */
const WORKSPACE_LOCATORS = ["RF_WORKSPACE", "SWARM_RF_WORKSPACE"] as const;

/**
 * SCG-R7 frozen expectation: the allowlist of record at 9df9a03 (wb-ksz.8, 31 names), copied here so
 * that ANY later change to DETACHED_HOST_ENV_ALLOWLIST is a reviewed change to this list as well.
 */
const ALLOWLIST_AT_9DF9A03: readonly string[] = Object.freeze([
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

/** Invisible format characters for the lookalike rows, built from code points (never raw in source). */
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
const ZERO_WIDTH_JOINER = String.fromCodePoint(0x200d);

/**
 * SCG-R7 negative pin: names that must NOT be allowlisted. RF_ACTOR needs its own ruling (dossier R9);
 * the RF_SECRET_* rows are obviously fake placeholders of the credential-shaped family; the rest are
 * lookalikes of the two locators that exact-name membership refuses.
 */
const NOT_ALLOWLISTED: readonly string[] = [
  "RF_ACTOR",
  "RF_SECRET_TOKEN",
  "RF_SECRET_EXAMPLE_PLACEHOLDER",
  "SWARM_RF_SECRET_EXAMPLE_PLACEHOLDER",
  "RF_WORKSPACE_TOKEN",
  "RF_WORKSPACES",
  "rf_workspace",
  `RF_WORKSPACE${ZERO_WIDTH_SPACE}`,
  `SWARM_RF${ZERO_WIDTH_JOINER}_WORKSPACE`,
];

/** A name as printable ASCII: every code point outside the printable range is shown as U+XXXX. */
function printable(name: string): string {
  return [...name]
    .map(unit => {
      const point = unit.codePointAt(0) ?? 0;
      return point >= 0x20 && point <= 0x7e ? unit : `U+${point.toString(16).toUpperCase().padStart(4, "0")}`;
    })
    .join("");
}

describe("SCG-R6/R7: the swarm rf workspace locators (wb-973.6, wb-973.7)", () => {
  it("SCG-R6: carries RF_WORKSPACE and SWARM_RF_WORKSPACE verbatim beside the operational names", () => {
    const env = scrubbedEnvironment({
      RF_WORKSPACE: "/srv/swarm/rf",
      SWARM_RF_WORKSPACE: "/srv/swarm/rf",
      AWS_SECRET_ACCESS_KEY: CANARY_VALUE,
      PATH: "/bin",
    });
    const names = Object.keys(env).sort();
    expect(names, "AWS_SECRET_ACCESS_KEY reached the scrubbed environment").not.toContain("AWS_SECRET_ACCESS_KEY");
    expect(names).toEqual(["PATH", "RF_WORKSPACE", "SWARM_RF_WORKSPACE"]);
    expect(env.RF_WORKSPACE).toBe("/srv/swarm/rf");
    expect(env.SWARM_RF_WORKSPACE).toBe("/srv/swarm/rf");
    // Distinct values: each locator is copied from its own variable, never from the other one.
    const distinct = scrubbedEnvironment({ RF_WORKSPACE: "/srv/swarm/rf-own", SWARM_RF_WORKSPACE: "/srv/swarm/rf-swarm" });
    expect(distinct.RF_WORKSPACE).toBe("/srv/swarm/rf-own");
    expect(distinct.SWARM_RF_WORKSPACE).toBe("/srv/swarm/rf-swarm");
  });

  it("SCG-R6: the hostile environment plus both locators yields the operational names and both locators, no canary", () => {
    const names = Object.keys(
      scrubbedEnvironment({ ...hostile(), RF_WORKSPACE: "/srv/swarm/rf", SWARM_RF_WORKSPACE: "/srv/swarm/rf" }),
    ).sort();
    for (const name of CANARIES) expect(names, `${name} reached the scrubbed environment`).not.toContain(name);
    expect(names).toEqual(
      [
        "CLAUDE_CONFIG_DIR",
        "HOME",
        "HTTPS_PROXY",
        "LANG",
        "NODE_EXTRA_CA_CERTS",
        "PATH",
        "RF_WORKSPACE",
        "SWARM_RF_WORKSPACE",
        "TMPDIR",
        "XDG_RUNTIME_DIR",
        "no_proxy",
      ].sort(),
    );
  });

  it("SCG-R7: DETACHED_HOST_ENV_ALLOWLIST equals the 9df9a03 list plus exactly RF_WORKSPACE and SWARM_RF_WORKSPACE (set equality; any third addition is red)", () => {
    const expected = new Set<string>([...ALLOWLIST_AT_9DF9A03, ...WORKSPACE_LOCATORS]);
    const actual = new Set<string>(DETACHED_HOST_ENV_ALLOWLIST);
    expect(ALLOWLIST_AT_9DF9A03.length, "size of the frozen 9df9a03 expectation").toBe(31);
    expect(
      [...actual].filter(name => !expected.has(name)).map(printable).sort(),
      "names beyond the frozen expectation",
    ).toEqual([]);
    expect(
      [...expected].filter(name => !actual.has(name)).sort(),
      "names of the frozen expectation missing from the allowlist",
    ).toEqual([]);
    expect(DETACHED_HOST_ENV_ALLOWLIST.length, "entries (a duplicate would hide behind set equality)").toBe(expected.size);
  });

  it("SCG-R7 negative pin: RF_ACTOR, RF_SECRET_*-shaped names and lookalikes of the locators are not allowlisted and never pass", () => {
    for (const name of NOT_ALLOWLISTED) {
      expect(DETACHED_HOST_ENV_ALLOWLIST.includes(name), `${printable(name)} is allowlisted`).toBe(false);
    }
    expect(
      DETACHED_HOST_ENV_ALLOWLIST.filter(name => /^(SWARM_)?RF_/i.test(name)).sort(),
      "rf-family names on the allowlist",
    ).toEqual([...WORKSPACE_LOCATORS]);
    const source: NodeJS.ProcessEnv = { RF_WORKSPACE: "/srv/swarm/rf", SWARM_RF_WORKSPACE: "/srv/swarm/rf" };
    for (const name of NOT_ALLOWLISTED) source[name] = CANARY_VALUE;
    expect(Object.keys(scrubbedEnvironment(source)).map(printable).sort(), "names that passed").toEqual([...WORKSPACE_LOCATORS]);
  });
});
