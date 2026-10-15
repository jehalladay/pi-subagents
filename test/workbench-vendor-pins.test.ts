import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Offline falsifier for the vendored native SDK artifact pins (wb-x7m.2).
 * It pins artifact BYTES only: it makes no claim about native executables,
 * clean producer checkouts, or runtime compatibility. It only reports findings
 * and never rewrites vendor/ or package*.json.
 */

interface LockEntry {
  version?: string;
  resolved?: string;
  integrity?: string;
  inBundle?: boolean;
}

interface Manifest {
  dependencies?: Record<string, string>;
  bundledDependencies?: string[];
}

interface Lock {
  packages?: Record<string, LockEntry>;
}

interface PinInput {
  readmeRows: Record<string, string>;
  tarballDigests: Record<string, string>;
  manifest: Manifest;
  lock: Lock;
}

const VENDOR_PREFIX = "file:vendor/";
const INTEGRITY = /^sha(256|384|512)-[A-Za-z0-9+/]+={0,2}$/;
const FILENAME_VERSION = /-(\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)\.tgz$/;

function checkVendorPins(input: PinInput): string[] {
  const findings: string[] = [];
  const { readmeRows, tarballDigests, manifest, lock } = input;
  const dependencies = manifest.dependencies ?? {};
  const bundled = new Set(manifest.bundledDependencies ?? []);
  const vendorDeps = new Map<string, string>();
  for (const [name, spec] of Object.entries(dependencies)) {
    if (spec.startsWith(VENDOR_PREFIX)) vendorDeps.set(name, spec.slice(VENDOR_PREFIX.length));
  }
  const depFiles = new Set(vendorDeps.values());

  for (const [file, digest] of Object.entries(tarballDigests)) {
    const row = readmeRows[file];
    if (row === undefined) findings.push(`orphan tarball ${file}: no vendor/README.md row`);
    else if (row.toLowerCase() !== digest.toLowerCase()) {
      findings.push(`digest mismatch ${file}: README ${row} != bytes ${digest}`);
    }
    if (!depFiles.has(file)) findings.push(`orphan tarball ${file}: no package.json file:vendor dependency`);
  }
  for (const file of Object.keys(readmeRows)) {
    if (tarballDigests[file] === undefined) findings.push(`README row ${file} has no tarball in vendor/`);
  }

  for (const [name, file] of vendorDeps) {
    if (tarballDigests[file] === undefined) findings.push(`dependency ${name} points at missing vendor/${file}`);
    if (!bundled.has(name)) findings.push(`dependency ${name} is absent from bundledDependencies`);
    const entry = lock.packages?.[`node_modules/${name}`];
    if (entry === undefined) {
      findings.push(`package-lock has no node_modules/${name} entry`);
      continue;
    }
    if (entry.resolved !== `${VENDOR_PREFIX}${file}`) {
      findings.push(`lock ${name} resolved ${String(entry.resolved)} != ${VENDOR_PREFIX}${file}`);
    }
    if (entry.inBundle !== true) findings.push(`lock ${name} inBundle is not true`);
    if (typeof entry.integrity !== "string" || !INTEGRITY.test(entry.integrity)) {
      findings.push(`lock ${name} integrity is missing or malformed`);
    }
    const fileVersion = FILENAME_VERSION.exec(file)?.[1];
    if (fileVersion === undefined) findings.push(`cannot read a version from filename ${file}`);
    else if (entry.version !== fileVersion) {
      findings.push(`lock ${name} version ${String(entry.version)} != filename version ${fileVersion}`);
    }
  }
  return findings;
}

function parseReadmeRows(markdown: string): Record<string, string> {
  const rows: Record<string, string> = {};
  for (const line of markdown.split("\n")) {
    const match = /^\|\s*(\S+\.tgz)\s*\|\s*([0-9a-fA-F]{64})\s*\|\s*$/.exec(line);
    if (match?.[1] !== undefined && match[2] !== undefined) rows[match[1]] = match[2];
  }
  return rows;
}

const root = resolve(import.meta.dirname, "..");
const vendorDir = join(root, "vendor");
const guardedPaths = ["package.json", "package-lock.json", "vendor/README.md"];

function readBytes(relative: string): Buffer {
  return readFileSync(join(root, relative));
}

function snapshot(): Record<string, string> {
  const result: Record<string, string> = {};
  for (const file of readdirSync(vendorDir)) result[`vendor/${file}`] = sha256(readBytes(`vendor/${file}`));
  for (const path of guardedPaths) result[path] = sha256(readBytes(path));
  return result;
}

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function realInput(): PinInput {
  const tarballDigests: Record<string, string> = {};
  for (const file of readdirSync(vendorDir)) {
    if (file.endsWith(".tgz")) tarballDigests[file] = sha256(readBytes(`vendor/${file}`));
  }
  return {
    readmeRows: parseReadmeRows(readBytes("vendor/README.md").toString("utf8")),
    tarballDigests,
    manifest: JSON.parse(readBytes("package.json").toString("utf8")) as Manifest,
    lock: JSON.parse(readBytes("package-lock.json").toString("utf8")) as Lock,
  };
}

const FORGE = "forge-sdk-0.1.0.tgz";
const DIGEST = "a".repeat(64);
const INTEGRITY_OK = `sha512-${"A".repeat(86)}==`;

function cleanFixture(): PinInput {
  return {
    readmeRows: { [FORGE]: DIGEST },
    tarballDigests: { [FORGE]: DIGEST },
    manifest: {
      dependencies: { "@forge/sdk": `${VENDOR_PREFIX}${FORGE}` },
      bundledDependencies: ["@forge/sdk"],
    },
    lock: {
      packages: {
        "node_modules/@forge/sdk": {
          version: "0.1.0",
          resolved: `${VENDOR_PREFIX}${FORGE}`,
          integrity: INTEGRITY_OK,
          inBundle: true,
        },
      },
    },
  };
}

describe("vendored native SDK artifact byte pins (offline)", () => {
  it("the real tree pins forge, furnace and hyperunix SDK tarball bytes consistently", () => {
    const input = realInput();
    expect(Object.keys(input.tarballDigests).sort()).toEqual([
      "forge-sdk-0.1.0.tgz",
      "furnace-sdk-0.1.0.tgz",
      "hyperunix-sdk-0.1.0.tgz",
    ]);
    expect(checkVendorPins(input)).toEqual([]);
  });

  it("only reports findings: vendor/ and package*.json bytes are unchanged by the check", () => {
    const before = snapshot();
    checkVendorPins(realInput());
    expect(snapshot()).toEqual(before);
  });

  it("accepts a clean in-memory fixture", () => {
    expect(checkVendorPins(cleanFixture())).toEqual([]);
  });

  it("names the file and both digests when a README digest differs by one hex digit", () => {
    const input = cleanFixture();
    const changed = `b${DIGEST.slice(1)}`;
    input.readmeRows[FORGE] = changed;
    const findings = checkVendorPins(input);
    expect(findings).toHaveLength(1);
    expect(findings[0]).toContain(FORGE);
    expect(findings[0]).toContain(changed);
    expect(findings[0]).toContain(DIGEST);
  });

  it("flags a file:vendor dependency absent from bundledDependencies", () => {
    const input = cleanFixture();
    input.manifest.bundledDependencies = [];
    expect(checkVendorPins(input).join("\n")).toContain("@forge/sdk is absent from bundledDependencies");
  });

  it("flags a lock entry with inBundle false", () => {
    const input = cleanFixture();
    const entry = input.lock.packages?.["node_modules/@forge/sdk"];
    if (entry === undefined) throw new Error("fixture lock entry missing");
    entry.inBundle = false;
    expect(checkVendorPins(input).join("\n")).toContain("inBundle is not true");
  });

  it("flags a lock entry whose resolved is not file:vendor/<file>", () => {
    const input = cleanFixture();
    const entry = input.lock.packages?.["node_modules/@forge/sdk"];
    if (entry === undefined) throw new Error("fixture lock entry missing");
    entry.resolved = "https://registry.npmjs.org/@forge/sdk/-/sdk-0.1.0.tgz";
    expect(checkVendorPins(input).join("\n")).toContain("resolved");
  });

  it("flags a missing or malformed lock integrity", () => {
    const input = cleanFixture();
    const entry = input.lock.packages?.["node_modules/@forge/sdk"];
    if (entry === undefined) throw new Error("fixture lock entry missing");
    entry.integrity = "md5-nope";
    expect(checkVendorPins(input).join("\n")).toContain("integrity");
  });

  it("flags a lock version that differs from the filename version", () => {
    const input = cleanFixture();
    const entry = input.lock.packages?.["node_modules/@forge/sdk"];
    if (entry === undefined) throw new Error("fixture lock entry missing");
    entry.version = "0.2.0";
    const text = checkVendorPins(input).join("\n");
    expect(text).toContain("0.2.0");
    expect(text).toContain("0.1.0");
  });

  it("flags a tarball with no README row as an orphan", () => {
    const input = cleanFixture();
    input.readmeRows = {};
    expect(checkVendorPins(input).join("\n")).toContain(`orphan tarball ${FORGE}: no vendor/README.md row`);
  });

  it("flags a tarball with no package.json dependency as an orphan", () => {
    const input = cleanFixture();
    input.tarballDigests["extra-sdk-1.0.0.tgz"] = "c".repeat(64);
    input.readmeRows["extra-sdk-1.0.0.tgz"] = "c".repeat(64);
    expect(checkVendorPins(input).join("\n")).toContain(
      "orphan tarball extra-sdk-1.0.0.tgz: no package.json file:vendor dependency",
    );
  });
});
