/**
 * W19 / docs-12 "Authorization design" and "Auditability" census (wb-gs2.3).
 *
 * docs/workbench/12-security.md states seven authorization bullets (A1-A7) and
 * three auditability sentences (D1-D3). This census binds each of those ten
 * rows to cases that ALREADY LAND in this repository, by file, verbatim case
 * title and tier, so that renaming, deleting, skipping or turning into an
 * expected failure any pinned case goes red naming the row.
 *
 * It is a census of landed cases only. It reads source text with sync fs reads;
 * it never calls the RPC or host boundary, never spawns a child and adds no src
 * seam. Rows with no landed case are listed as unpinned WITH a reason and are
 * asserted to stay unpinned (pin-flip pattern): promoting one without a title,
 * or leaving a pinned row without cases, fails. Property tests of the sandbox
 * RPC surface and the isolation child belong to wb-ksz, not here.
 *
 * Every rule is a pure function over file texts, so the mutation table proves
 * each rule goes red on an in-memory mutant.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_12 = "docs/workbench/12-security.md";

/** default-gate: a plain case that runs in the default gate. knownWidening: an it.fails case the row names as a known widening. */
type Tier = "default-gate" | "knownWidening";

interface Pin {
  readonly file: string;
  readonly title: string;
  readonly tier: Tier;
}

interface Row {
  readonly row: string;
  readonly section: "Authorization design" | "Auditability";
  /** Verbatim docs/12 text (one bullet, or one sentence). */
  readonly quote: string;
  readonly pins: readonly Pin[];
  /** Required, non-empty, exactly when pins is empty. */
  readonly unpinned?: string;
  /** Free-text note about a half of the row that no landed case covers yet. Never asserted beyond being non-empty when present. */
  readonly residual?: string;
}

const CLAUDE_TOOLS = "test/workbench-claude-capability-tools.test.ts";
const CONTROL = "test/workbench-control.test.ts";
const FURNACE_CONTROL = "test/workbench-furnace-control.test.ts";
const REGISTRY_SCHEMA = "test/workbench-registry-schema.test.ts";
const SECURITY_CAPABILITY = "test/workbench-security-capability.test.ts";

const gate = (file: string, title: string): Pin => ({ file, title, tier: "default-gate" });

const ROWS: readonly Row[] = [
  {
    row: "A1",
    section: "Authorization design",
    quote: "Caller identity and scope bound at workbench entry point; impersonation from script payload prohibited.",
    pins: [
      gate(CLAUDE_TOOLS, "rejects contract drift, malformed native payload, and impersonation before provider dispatch"),
      gate(CLAUDE_TOOLS, "does not accept SDK-stripped identity arguments as host authority"),
      gate(CONTROL, "rule 5: a target in another workspace or principal is an authorization failure even with a valid control grant"),
    ],
  },
  {
    row: "A2",
    section: "Authorization design",
    quote: "Separate discover, inspect, observe, invoke and control grants.",
    pins: [
      gate(CLAUDE_TOOLS, "registration and discovery never authorize invocation"),
      gate(CLAUDE_TOOLS, "discovery, contract and native inspect remain independently granted"),
      gate(CONTROL, "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing"),
    ],
  },
  {
    row: "A3",
    section: "Authorization design",
    quote: "Node cap must be explicitly allowed in workflow and Claude agent role; never auto-share all registered providers.",
    pins: [
      gate(CLAUDE_TOOLS, "requires BOTH role membership and exact invoke grant plus producer permission"),
      gate(CLAUDE_TOOLS, "discovery is finite and does not enumerate provider registrations outside the role"),
      gate(CLAUDE_TOOLS, "a role list never turns a registered write fixture into an executable operation"),
    ],
  },
  {
    row: "A4",
    section: "Authorization design",
    quote: "Policy enforced in privileged host *after* receiving RPC, not only by hiding tool names.",
    pins: [
      gate(SECURITY_CAPABILITY, "hostile caller-added outer identity/grants never reach provider; inner authority fields are refused"),
      gate(SECURITY_CAPABILITY, "registry also refuses extra authority fields and prototype keys before calling a strict provider"),
    ],
    residual:
      "The pinned cases cover the host MCP capability surface and the registry after a crafted call. A crafted raw call from the sandbox isolation child is not pinned here: that oracle is wb-ksz.5 and the wb-ksz slices (owner-reviewed).",
  },
  {
    row: "A5",
    section: "Authorization design",
    quote: "Control decisions require native ownership/preconditions and, for destructive actions, operator confirmation.",
    pins: [
      gate(CONTROL, "rule 6: causation, grouping, dependency and hypothesis never confer lifecycle ownership, and the owned child holds no owner rights"),
      gate(CONTROL, "rule 7: destructive actions need params.confirmed === true as an own data property, and a getter is never invoked"),
    ],
  },
  {
    row: "A6",
    section: "Authorization design",
    quote: "Treat unknown permission data as deny.",
    pins: [
      gate(CONTROL, "rule 1: unknown permission data (undefined, non-array, non-string entries, wildcards) is an authorization denial"),
      gate(CLAUDE_TOOLS, "validates finite host policy and refuses wildcard or incomplete authority"),
    ],
  },
  {
    row: "A7",
    section: "Authorization design",
    quote: "Source/deployment pin must be checked before loading; malformed schema/unsupported contract fails closed.",
    pins: [
      gate(CLAUDE_TOOLS, "rechecks the host deployment pin for each call and redacts unexpected pin errors"),
      gate(CLAUDE_TOOLS, "pins immutable host authorization despite later config mutation"),
      gate(REGISTRY_SCHEMA, "rejects malformed or unsupported schema %j without provider effects"),
      gate(REGISTRY_SCHEMA, "rejects malformed output contract before provider execution"),
    ],
  },
  {
    row: "D1",
    section: "Auditability",
    quote:
      "Record authorized principal, capability contract version, logical invocation, target native ref, reason/policy, request acknowledgment and producer outcome for control operations.",
    pins: [
      gate(CONTROL, "permits the confirmed owner and records principal, contract, invocation, target, grant, policy and the ownership confirmation"),
      gate(CONTROL, "requested, acknowledged and result are three distinct, ordered, frozen receipts that each carry their own timestamp"),
    ],
  },
  {
    row: "D2",
    section: "Auditability",
    quote: "Keep sensitive payload refs separate and access-controlled.",
    pins: [],
    unpinned:
      "No landed case asserts that sensitive payload refs are kept separate from the audit record or access-controlled. The nearest cases (control 'malformed envelope: every field copied into the audit receipt is bounded clean text', furnace-control 'parks every seam failure with a bounded native label') prove receipt field hygiene and message non-echo, a different property, so pinning them would overclaim. No oracle bead is in flight; routed to the owner for a keep/file decision.",
  },
  {
    row: "D3",
    section: "Auditability",
    quote: "Logs are not a source of entitlement.",
    pins: [
      gate(FURNACE_CONTROL, "refuses a raw request, a look-alike, a phase-advanced or a forged receipt as unvetted, before the seam and without reading accessors"),
    ],
    residual: "wb-pjj's in-process provenance case joins this row only after it lands (pin-flip naming wb-pjj).",
  },
];

/** The rows that must stay unpinned today. Promoting one means adding pins AND removing it here, in one reviewed change. */
const UNPINNED_ROW_IDS: readonly string[] = ["D2"];
const EXPECTED_ROW_IDS: readonly string[] = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "D1", "D2", "D3"];

type CaseKind = "plain" | "fails" | "skip" | "todo";

interface ScannedCase {
  readonly title: string;
  readonly kind: CaseKind;
}

/** Whitespace-normalize so wrapped markdown compares as one sentence. */
function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** Every it( / test( call with a double-quoted literal title, including it.each(...)( templates. */
function scanCases(source: string): readonly ScannedCase[] {
  const found: ScannedCase[] = [];
  const call = /(?<![\w.])(?:it|test)((?:\.(?:fails|skip|todo|only|concurrent|sequential|runIf\([^)]*\)|skipIf\([^)]*\)))*)(?:\.each\([^)]*\))?\(\s*("(?:[^"\\\n]|\\.)*")/g;
  for (const match of source.matchAll(call)) {
    const modifiers = match[1] ?? "";
    const literal = match[2];
    if (literal === undefined) continue;
    const title: unknown = JSON.parse(literal);
    if (typeof title !== "string") continue;
    const kind: CaseKind = /\.skip/.test(modifiers) ? "skip" : /\.todo/.test(modifiers) ? "todo" : /\.fails/.test(modifiers) ? "fails" : "plain";
    found.push({ title, kind });
  }
  return found;
}

/** File-level switches that silently remove cases from a run, whatever the titles say. */
function fileLevelHazards(source: string): readonly string[] {
  const hazards: string[] = [];
  for (const name of ["describe.skip", "describe.todo", "describe.only", "describe.skipIf", "it.only", "test.only", "it.skipIf", "test.skipIf", "describe.runIf"]) {
    if (source.includes(`${name}(`)) hazards.push(name);
  }
  return hazards;
}

function checkPin(row: Row, pin: Pin, source: string | undefined): readonly string[] {
  const where = `${row.row} (${row.section}) pin ${pin.file} :: "${pin.title}"`;
  if (source === undefined) return [`${where}: file is missing`];
  const matches = scanCases(source).filter(item => item.title === pin.title);
  if (matches.length === 0) return [`${where}: no case with this verbatim title (renamed or deleted)`];
  const problems: string[] = [];
  for (const item of matches) {
    if (item.kind === "skip" || item.kind === "todo") problems.push(`${where}: case is .${item.kind}`);
    else if (pin.tier === "default-gate" && item.kind === "fails") problems.push(`${where}: case is it.fails but the row does not name a known widening (tier default-gate)`);
    else if (pin.tier === "knownWidening" && item.kind !== "fails") problems.push(`${where}: tier knownWidening requires an it.fails case, found a plain case`);
  }
  for (const hazard of fileLevelHazards(source)) problems.push(`${where}: file uses ${hazard}, which can remove pinned cases from a run`);
  return problems;
}

function checkRowShape(row: Row): readonly string[] {
  const problems: string[] = [];
  if (row.pins.length === 0) {
    if (row.unpinned === undefined || row.unpinned.trim().length === 0) problems.push(`${row.row}: unpinned without a reason`);
  } else if (row.unpinned !== undefined) {
    problems.push(`${row.row}: carries pins and an unpinned reason`);
  }
  if (row.residual !== undefined && row.residual.trim().length === 0) problems.push(`${row.row}: empty residual note`);
  const seen = new Set<string>();
  for (const pin of row.pins) {
    if (pin.file.trim().length === 0 || pin.title.trim().length === 0) problems.push(`${row.row}: a pin has an empty file or title`);
    const key = `${pin.file}\u0000${pin.title}`;
    if (seen.has(key)) problems.push(`${row.row}: duplicate pin "${pin.title}"`);
    seen.add(key);
  }
  return problems;
}

function checkCensus(rows: readonly Row[], read: (file: string) => string | undefined, unpinnedIds: readonly string[], expectedIds: readonly string[]): readonly string[] {
  const problems: string[] = [];
  const ids = rows.map(row => row.row);
  if (ids.length !== expectedIds.length || ids.some((id, index) => id !== expectedIds[index])) {
    problems.push(`row set changed: expected ${expectedIds.join(",")} but found ${ids.join(",")}`);
  }
  const actualUnpinned = rows.filter(row => row.pins.length === 0).map(row => row.row);
  if (actualUnpinned.length !== unpinnedIds.length || actualUnpinned.some((id, index) => id !== unpinnedIds[index])) {
    problems.push(`unpinned set changed: expected ${unpinnedIds.join(",") || "none"} but found ${actualUnpinned.join(",") || "none"}`);
  }
  for (const row of rows) {
    problems.push(...checkRowShape(row));
    for (const pin of row.pins) problems.push(...checkPin(row, pin, read(pin.file)));
  }
  return problems;
}

/** Docs rows: the seven bullets of "Authorization design" and the sentences of "Auditability". */
function docsRows(docs: string): { readonly bullets: readonly string[]; readonly sentences: readonly string[] } {
  const section = (heading: string): string => {
    const start = docs.indexOf(`\n## ${heading}\n`);
    if (start < 0) return "";
    const body = docs.slice(start + heading.length + 5);
    const next = body.search(/\n## /);
    return next < 0 ? body : body.slice(0, next);
  };
  const bullets = section("Authorization design")
    .split("\n")
    .filter(line => line.startsWith("- "))
    .map(line => normalize(line.slice(2)));
  const sentences = (normalize(section("Auditability")).match(/[^.]+\./g) ?? []).map(sentence => sentence.trim());
  return { bullets, sentences };
}

const readFromDisk = (file: string): string | undefined => {
  try {
    return readFileSync(join(ROOT, file), "utf8");
  } catch {
    return undefined;
  }
};

describe("docs/12 Authorization design and Auditability census", () => {
  it("quotes every docs/12 bullet and sentence verbatim, in order, with no row added or dropped", () => {
    const docs = readFileSync(join(ROOT, DOCS_12), "utf8");
    const { bullets, sentences } = docsRows(docs);
    expect(bullets).toHaveLength(7);
    expect(sentences).toHaveLength(3);
    const authorization = ROWS.filter(row => row.section === "Authorization design").map(row => normalize(row.quote));
    const auditability = ROWS.filter(row => row.section === "Auditability").map(row => normalize(row.quote));
    expect(authorization).toStrictEqual(bullets);
    expect(auditability).toStrictEqual(sentences);
  });

  it("holds exactly the ten frozen rows A1-A7 and D1-D3", () => {
    expect(ROWS.map(row => row.row)).toStrictEqual(EXPECTED_ROW_IDS);
  });

  it("every pinned case exists verbatim, runs in its tier, and every unpinned row states its reason", () => {
    const problems = checkCensus(ROWS, readFromDisk, UNPINNED_ROW_IDS, EXPECTED_ROW_IDS);
    expect(problems).toStrictEqual([]);
  });

  it("pins a landed case for every row except the explicitly unpinned ones", () => {
    const pinned = ROWS.filter(row => row.pins.length > 0).map(row => row.row);
    expect(pinned).toStrictEqual(EXPECTED_ROW_IDS.filter(id => !UNPINNED_ROW_IDS.includes(id)));
  });

  it("is a source-text census: it imports no host, provider or child-process module", () => {
    const self = readFileSync(fileURLToPath(import.meta.url), "utf8");
    const imports = [...self.matchAll(/^import .* from "([^"]+)";$/gm)].map(match => match[1]);
    expect(imports).toStrictEqual(["node:fs", "node:path", "node:url", "vitest"]);
    expect(self.match(/\bimport\(/g) ?? []).toHaveLength(0);
  });
});

describe("census mutation table: each mutant goes red naming its row", () => {
  const pinOf = (rowId: string, index = 0): Pin => {
    const pin = ROWS.find(row => row.row === rowId)?.pins[index];
    if (pin === undefined) throw new Error(`no pin ${index} on ${rowId}`);
    return pin;
  };
  const sourceOf = (pin: Pin): string => {
    const text = readFromDisk(pin.file);
    if (text === undefined) throw new Error(`missing ${pin.file}`);
    return text;
  };
  const rowOf = (rowId: string): Row => {
    const row = ROWS.find(item => item.row === rowId);
    if (row === undefined) throw new Error(`no row ${rowId}`);
    return row;
  };
  const withSource = (pin: Pin, mutated: string) => (file: string): string | undefined => (file === pin.file ? mutated : readFromDisk(file));
  const literal = (pin: Pin): string => JSON.stringify(pin.title);

  it("M1 a pinned title altered by one character is red and names the row", () => {
    const pin = pinOf("A2", 0);
    const mutated = sourceOf(pin).replace(literal(pin), JSON.stringify(`${pin.title}x`));
    expect(mutated).not.toBe(sourceOf(pin));
    const problems = checkCensus(ROWS, withSource(pin, mutated), UNPINNED_ROW_IDS, EXPECTED_ROW_IDS);
    expect(problems.some(problem => problem.startsWith("A2 ") && problem.includes("no case with this verbatim title"))).toBe(true);
  });

  it("M1b a deleted pinned case and a missing file are red", () => {
    const pin = pinOf("A5", 1);
    const deleted = sourceOf(pin).replace(literal(pin), JSON.stringify("some other case"));
    expect(checkPin(rowOf("A5"), pin, deleted)).not.toStrictEqual([]);
    expect(checkPin(rowOf("A5"), pin, undefined)).toStrictEqual([expect.stringContaining("file is missing")]);
  });

  it("M1c a .skip, .todo or file-level skip on a pinned case is red", () => {
    const pin = pinOf("A1", 2);
    const source = sourceOf(pin);
    const callSite = new RegExp(`\\bit\\(${literal(pin).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
    expect(callSite.test(source)).toBe(true);
    for (const modifier of ["skip", "todo"]) {
      const mutated = source.replace(callSite, `it.${modifier}(${literal(pin)}`);
      expect(checkPin(rowOf("A1"), pin, mutated).some(problem => problem.includes(`case is .${modifier}`))).toBe(true);
    }
    const hazard = `${source}\ndescribe.skip("x", () => {});\n`;
    expect(checkPin(rowOf("A1"), pin, hazard).some(problem => problem.includes("describe.skip"))).toBe(true);
  });

  it("M2 a removed or reordered row fails the row-count pin", () => {
    const missing = ROWS.filter(row => row.row !== "A3");
    const problems = checkCensus(missing, readFromDisk, UNPINNED_ROW_IDS, EXPECTED_ROW_IDS);
    expect(problems.some(problem => problem.startsWith("row set changed"))).toBe(true);
    const swapped = [ROWS[1], ROWS[0], ...ROWS.slice(2)].filter((row): row is Row => row !== undefined);
    expect(checkCensus(swapped, readFromDisk, UNPINNED_ROW_IDS, EXPECTED_ROW_IDS).some(problem => problem.startsWith("row set changed"))).toBe(true);
  });

  it("M3 an unpinned row silently promoted without a title, or stripped of its reason, fails", () => {
    const promoted: Row = { ...rowOf("D2"), unpinned: undefined, pins: [{ file: CONTROL, title: "", tier: "default-gate" }] };
    const rows = ROWS.map(row => (row.row === "D2" ? promoted : row));
    const problems = checkCensus(rows, readFromDisk, UNPINNED_ROW_IDS, EXPECTED_ROW_IDS);
    expect(problems.some(problem => problem.startsWith("D2") && problem.includes("empty file or title"))).toBe(true);
    expect(problems.some(problem => problem.startsWith("unpinned set changed"))).toBe(true);
    const noReason: Row = { ...rowOf("D2"), unpinned: "  " };
    const withoutReason = ROWS.map(row => (row.row === "D2" ? noReason : row));
    expect(checkCensus(withoutReason, readFromDisk, UNPINNED_ROW_IDS, EXPECTED_ROW_IDS)).toContain("D2: unpinned without a reason");
    const emptied: Row = { ...rowOf("D3"), pins: [], unpinned: "no longer pinned" };
    const dropped = ROWS.map(row => (row.row === "D3" ? emptied : row));
    expect(checkCensus(dropped, readFromDisk, UNPINNED_ROW_IDS, EXPECTED_ROW_IDS).some(problem => problem.startsWith("unpinned set changed"))).toBe(true);
  });

  it("M4 a pin pointing at an it.fails case the row does not name as a known widening is red, and the reverse tier is red too", () => {
    const pin = pinOf("A6", 0);
    const source = sourceOf(pin);
    const callSite = new RegExp(`\\bit\\(${literal(pin).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
    const failing = source.replace(callSite, `it.fails(${literal(pin)}`);
    expect(failing).not.toBe(source);
    expect(checkPin(rowOf("A6"), pin, failing).some(problem => problem.includes("it.fails but the row does not name a known widening"))).toBe(true);
    const widening: Pin = { ...pin, tier: "knownWidening" };
    expect(checkPin(rowOf("A6"), widening, source).some(problem => problem.includes("tier knownWidening requires an it.fails case"))).toBe(true);
    expect(checkPin(rowOf("A6"), widening, failing)).toStrictEqual([]);
  });

  it("a docs bullet added, removed or reworded is detected by the docs scan", () => {
    const docs = readFileSync(join(ROOT, DOCS_12), "utf8");
    const base = docsRows(docs);
    const added = docsRows(docs.replace("\n## Credential boundaries\n", "- A new unbound bullet.\n\n## Credential boundaries\n"));
    expect(added.bullets).toHaveLength(base.bullets.length + 1);
    const reworded = docsRows(docs.replace("Treat unknown permission data as deny.", "Treat unknown permission data as allow."));
    expect(reworded.bullets).not.toStrictEqual(base.bullets);
  });
});
