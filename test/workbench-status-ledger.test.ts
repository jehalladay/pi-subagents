import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { ALLOWED_STATUSES, EXPECTED_HEADER, parseLedger, validateLedger } from "../qa/workbench/status-ledger.mjs";

interface Finding {
  rule: string;
  row?: string;
  detail: string;
}
interface Validation {
  integrity: Finding[];
  vocabulary: Finding[];
}

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const script = join(repo, "qa", "workbench", "status-ledger.mjs");
const roots: string[] = [];
function tempRoot(): string {
  const path = mkdtempSync(join(tmpdir(), "status-ledger-"));
  roots.push(path);
  return path;
}
afterEach(() => {
  for (const path of roots.splice(0)) rmSync(path, { recursive: true, force: true });
});

const HEADER = "| ID | Priority | Requirement | Implementation evidence | L1 shell | L2 client | L3 integration | L4 unit/fault | Live/native evidence | Status |";
const SEPARATOR = "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |";
const DASH = "—";

function row(id: string, fields: Partial<{ priority: string; evidence: string[]; status: string }> = {}): string {
  const evidence = fields.evidence ?? [DASH, DASH, DASH, DASH, DASH, DASH];
  return `| ${id} | ${fields.priority ?? "P0"} | Requirement text. | ${evidence.join(" | ")} | ${fields.status ?? "planned"} |`;
}
function doc(...lines: string[]): string {
  return ["# Ledger", "", "Intro prose.", "", HEADER, SEPARATOR, ...lines, ""].join("\n");
}
function fullIds(): string[] {
  return Array.from({ length: 50 }, (_, i) => `WB-${String(i + 1).padStart(3, "0")}`);
}
function validate(markdown: string, root: string, extra: { allowedStatuses?: readonly string[] } = {}): Validation {
  return validateLedger(parseLedger(markdown), { root, allowedStatuses: extra.allowedStatuses ?? ALLOWED_STATUSES }) as Validation;
}
function rules(findings: Finding[]): string[] {
  return findings.map((f) => f.rule);
}
/** A document whose every row other than the ones under test is a valid planned row so only targeted rules fire. */
function withCoverage(overrides: Record<string, string>): string {
  return doc(...fullIds().map((id) => overrides[id] ?? row(id)));
}

describe("status ledger L1 header and shape", () => {
  it("parses a two-row fixture with the exact ten-column header", () => {
    const parsed = parseLedger(doc(row("WB-001"), row("WB-002")));
    expect(parsed.header).toEqual([...EXPECTED_HEADER]);
    expect(parsed.rows).toHaveLength(2);
    for (const r of parsed.rows) expect(r.cells).toHaveLength(10);
    expect(parsed.rows[0].id).toBe("WB-001");
    expect(parsed.rows[0].status).toBe("planned");
  });

  it("reports a renamed Status column as a header integrity finding", () => {
    const markdown = doc(row("WB-001")).replace("| Status |", "| State |");
    const result = validate(markdown, tempRoot());
    expect(rules(result.integrity)).toContain("header");
  });

  it("CLI exits 2 when the header does not match", () => {
    const dir = tempRoot();
    const file = join(dir, "ledger.md");
    writeFileSync(file, doc(row("WB-001")).replace("| Status |", "| State |"));
    const run = spawnSync(process.execPath, [script, "--doc", file], { cwd: repo, encoding: "utf8" });
    expect(run.status).toBe(2);
    const receipt = JSON.parse(run.stdout);
    expect(receipt.pass).toBe(false);
    expect(receipt.integrity.some((f: Finding) => f.rule === "header")).toBe(true);
  });

  it("reports rows whose cell count differs from the header", () => {
    const result = validate(doc("| WB-001 | P0 | short row | — | planned |"), tempRoot());
    expect(rules(result.integrity)).toContain("row-shape");
  });
});

describe("status ledger L2 planned never means implemented", () => {
  it("flags a planned row that cites evidence and names the row", () => {
    const planned = row("WB-022", { priority: "P1", evidence: ["src/workbench/x.ts", DASH, DASH, DASH, DASH, DASH] });
    const result = validate(doc(planned), tempRoot());
    const finding = result.integrity.find((f) => f.rule === "planned-with-evidence");
    expect(finding?.row).toBe("WB-022");
  });

  it("accepts a planned row with an em dash in every evidence column", () => {
    const result = validate(doc(row("WB-022", { priority: "P1" })), tempRoot());
    expect(rules(result.integrity)).not.toContain("planned-with-evidence");
  });

  it("flags a non-planned row that cites neither a path nor a receipt", () => {
    const result = validate(doc(row("WB-001", { status: "fixture" })), tempRoot());
    expect(rules(result.integrity)).toContain("no-evidence");
  });

  it("accepts a non-planned row that cites only a receipt", () => {
    const result = validate(doc(row("WB-001", { status: "experimental", evidence: [DASH, DASH, DASH, DASH, DASH, "cmd_65b034a22fb5"] })), tempRoot());
    expect(rules(result.integrity)).not.toContain("no-evidence");
  });
});

describe("status ledger L3 cited evidence must exist", () => {
  function rootWithFile(): string {
    const dir = tempRoot();
    mkdirSync(join(dir, "src"), { recursive: true });
    writeFileSync(join(dir, "src", "present.ts"), "1\n2\n3\n4\n5\n");
    return dir;
  }
  function cited(token: string): string {
    return row("WB-001", { status: "fixture", evidence: [token, DASH, DASH, DASH, DASH, DASH] });
  }

  it("accepts an existing path with an in-range line", () => {
    const result = validate(doc(cited("src/present.ts:3")), rootWithFile());
    expect(result.integrity.filter((f) => f.row === "WB-001")).toEqual([]);
  });

  it("flags a path that does not exist", () => {
    const result = validate(doc(cited("src/absent.ts")), rootWithFile());
    expect(result.integrity.find((f) => f.rule === "missing-path")?.row).toBe("WB-001");
  });

  it("flags a line beyond the file's line count", () => {
    const result = validate(doc(cited("src/present.ts:9")), rootWithFile());
    expect(result.integrity.find((f) => f.rule === "line-out-of-range")?.row).toBe("WB-001");
  });

  it("accepts the last line and rejects line zero", () => {
    const root = rootWithFile();
    expect(rules(validate(doc(cited("src/present.ts:5")), root).integrity)).not.toContain("line-out-of-range");
    expect(rules(validate(doc(cited("src/present.ts:0")), root).integrity)).toContain("line-out-of-range");
  });

  it("does not let a parent-directory segment escape the root", () => {
    const result = validate(doc(cited("src/../../outside.ts")), rootWithFile());
    expect(rules(result.integrity)).toContain("missing-path");
  });

  it("recognises the root files package.json, forge.toml and LICENSE", () => {
    const root = rootWithFile();
    writeFileSync(join(root, "package.json"), "{}\n");
    writeFileSync(join(root, "forge.toml"), "a\nb\n");
    writeFileSync(join(root, "LICENSE"), "x\n");
    const row1 = row("WB-001", { status: "fixture", evidence: ["package.json", "forge.toml:2", "LICENSE:1", DASH, DASH, DASH] });
    expect(validate(doc(row1), root).integrity.filter((f) => f.row === "WB-001")).toEqual([]);
    const row2 = row("WB-001", { status: "fixture", evidence: ["forge.toml:3", DASH, DASH, DASH, DASH, DASH] });
    expect(rules(validate(doc(row2), root).integrity)).toContain("line-out-of-range");
  });

  it("flags a malformed receipt token and accepts a well-formed one", () => {
    const root = rootWithFile();
    const bad = row("WB-001", { status: "experimental", evidence: ["src/present.ts", DASH, DASH, DASH, DASH, "cmd_12345"] });
    const good = row("WB-001", { status: "experimental", evidence: ["src/present.ts", DASH, DASH, DASH, DASH, "cmd_65b034a22fb5"] });
    expect(rules(validate(doc(bad), root).integrity)).toContain("receipt-format");
    expect(rules(validate(doc(good), root).integrity)).not.toContain("receipt-format");
  });

  it("checks cmd_ tokens in prose outside the table and lists them in the parse", () => {
    const markdown = `${doc(row("WB-001"))}\nProse with \`cmd_abcdef012345\` and cmd_ZZZ.\n`;
    const parsed = parseLedger(markdown);
    expect(parsed.cmdTokens).toEqual(["cmd_abcdef012345", "cmd_ZZZ"]);
    const result = validate(markdown, tempRoot());
    expect(result.integrity.filter((f) => f.rule === "receipt-format")).toHaveLength(1);
  });

  it("flags bad IDs, duplicates, bad priority and missing coverage", () => {
    const markdown = doc(row("WB-001"), row("WB-001"), row("WB-7"), row("WB-002", { priority: "P9" }));
    const found = rules(validate(markdown, tempRoot()).integrity);
    expect(found).toContain("id-format");
    expect(found).toContain("id-duplicate");
    expect(found).toContain("priority");
    expect(found).toContain("id-coverage");
  });

  it("reports full 50-row coverage as clean", () => {
    expect(validate(withCoverage({}), tempRoot()).integrity).toEqual([]);
  });
});

describe("status ledger L4 vocabulary is reported, not invented", () => {
  it("flags an unknown status as a vocabulary finding only", () => {
    const unknown = row("WB-001", { status: "verified", evidence: [DASH, DASH, DASH, DASH, DASH, "cmd_65b034a22fb5"] });
    const result = validate(withCoverage({ "WB-001": unknown }), tempRoot());
    expect(result.integrity).toEqual([]);
    expect(result.vocabulary.map((f) => f.row)).toEqual(["WB-001"]);
  });

  it("allows every documented and current status word", () => {
    for (const status of ["experimental", "fixture", "planned", "gate-pass", "live-sdk", "source-retained", "shipped", "blocked"]) {
      const evidence = status === "planned" ? undefined : [DASH, DASH, DASH, DASH, DASH, "cmd_65b034a22fb5"];
      const result = validate(doc(row("WB-001", { status, evidence })), tempRoot());
      expect(result.vocabulary).toEqual([]);
    }
  });

  it("CLI exits 0 without --strict and 1 with --strict for an unknown status", () => {
    const dir = tempRoot();
    const unknown = row("WB-001", { status: "verified", evidence: [DASH, DASH, DASH, DASH, DASH, "cmd_65b034a22fb5"] });
    const file = join(dir, "ledger.md");
    writeFileSync(file, withCoverage({ "WB-001": unknown }));
    const lax = spawnSync(process.execPath, [script, "--doc", file], { cwd: repo, encoding: "utf8" });
    expect(lax.status).toBe(0);
    expect(JSON.parse(lax.stdout).vocabulary).toHaveLength(1);
    const strict = spawnSync(process.execPath, [script, "--strict", "--doc", file], { cwd: repo, encoding: "utf8" });
    expect(strict.status).toBe(1);
    expect(JSON.parse(strict.stdout).strict).toBe(true);
  });

  it("CLI exits 1 when integrity findings exist", () => {
    const dir = tempRoot();
    const file = join(dir, "ledger.md");
    writeFileSync(file, doc(row("WB-001")));
    const run = spawnSync(process.execPath, [script, "--doc", file], { cwd: repo, encoding: "utf8" });
    expect(run.status).toBe(1);
  });
});

describe("status ledger L5 live document", () => {
  it("TRACEABILITY.md has 50 rows, no integrity findings and consistent status counts", () => {
    const markdown = readFileSync(join(repo, "docs", "workbench", "TRACEABILITY.md"), "utf8");
    const parsed = parseLedger(markdown);
    expect(parsed.rows).toHaveLength(50);
    expect(parsed.rows.map((r: { id: string }) => r.id)).toEqual(fullIds());
    const result = validateLedger(parsed, { root: repo, allowedStatuses: ALLOWED_STATUSES }) as Validation;
    expect(result.integrity).toEqual([]);
    const counts = new Map<string, number>();
    for (const r of parsed.rows as { status: string }[]) counts.set(r.status, (counts.get(r.status) ?? 0) + 1);
    expect([...counts.values()].reduce((a, b) => a + b, 0)).toBe(50);
  });
});

describe("status ledger L6 receipt and gate placement", () => {
  it("the CLI receipt carries the v1 contract fields and honours W22_LEDGER_RECEIPT", () => {
    const dir = tempRoot();
    const out = join(dir, "receipt.json");
    const run = spawnSync(process.execPath, [script], { cwd: repo, encoding: "utf8", env: { ...process.env, W22_LEDGER_RECEIPT: out } });
    expect(run.status).toBe(0);
    const receipt = JSON.parse(run.stdout);
    expect(Object.keys(receipt).sort()).toEqual(["contract", "integrity", "pass", "revision", "rows", "statusCounts", "strict", "utc", "vocabulary"].sort());
    expect(receipt.contract).toBe("workbench.status-ledger/v1");
    expect(receipt.rows).toBe(50);
    expect(receipt.pass).toBe(true);
    expect(Object.values(receipt.statusCounts as Record<string, number>).reduce((a, b) => a + b, 0)).toBe(50);
    expect(Number.isNaN(Date.parse(receipt.utc))).toBe(false);
    expect(typeof receipt.revision).toBe("string");
    expect(JSON.parse(readFileSync(out, "utf8"))).toEqual(receipt);
  });

  it("forge.toml has exactly one status-ledger command and leaves the default gate list unchanged", () => {
    const toml = readFileSync(join(repo, "forge.toml"), "utf8");
    expect(toml.match(/^\[build\.commands\.status-ledger\]$/gm)).toHaveLength(1);
    expect(toml).toMatch(/\[build\.commands\.status-ledger\]\ncommand = "node qa\/workbench\/status-ledger\.mjs"\ntimeout = 60\n/);
    expect(toml).toContain('gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]');
    const gateLine = toml.split("\n").find((line) => line.startsWith("gate ="));
    expect(gateLine).not.toContain("status-ledger");
  });

  it("the script imports nothing from src/ or dist/", () => {
    const text = readFileSync(script, "utf8");
    const specifiers = [...text.matchAll(/(?:from\s+|import\s*\()\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
    for (const spec of specifiers) {
      expect(spec.startsWith("node:")).toBe(true);
    }
  });
});
