/**
 * VC-7 / W12 / W18 falsifier (wb-0kg.12): the docs/workbench/14 "Fault-injection
 * locations" census.
 *
 * docs/14 lists the boundaries a fault must be injected at. Nothing else binds
 * those locations to a landed case, so a rename, deletion or .skip of a fault
 * case would leave the docs list intact with every suite green, and a location
 * that has NO case today would be indistinguishable from a covered one. This
 * file is that binding: a frozen table of the fourteen locations, each tied to
 * its docs/14 truth label, to the exact case title that proves it (read from
 * the file at HEAD, exactly once, never disabled), or to an OPEN row naming the
 * tracking bead.
 *
 * It never executes a pinned case and never injects a fault: it reads source
 * text only. A landing that renames a pinned case updates this table in the
 * same commit (pin-flip style); a landing that closes an open row flips it to
 * pinned here.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const SECTION = "## Fault-injection locations";

type TruthLabel = "code present" | "fixture pass" | "live SDK pass" | "adversarial pass" | "scale benchmark pass" | "not started";
type Tier = "default-gate" | "detached-faults-receipt" | "live";
type RowStatus = "pinned" | "open";

interface Pin {
  file: string;
  title: string;
}

interface Row {
  location: string;
  quote: string;
  label: TruthLabel;
  tier: Tier;
  pins: Pin[];
  status: RowStatus;
  trackingBead?: string;
  reason?: string;
  receipt?: string;
}

const PASS_LABELS: readonly TruthLabel[] = ["fixture pass", "live SDK pass", "adversarial pass", "scale benchmark pass"];
const RECEIPT_LABELS: readonly TruthLabel[] = ["live SDK pass", "adversarial pass", "scale benchmark pass"];
const OPEN_LABELS: readonly TruthLabel[] = ["code present", "not started"];
const BANNED_MODIFIERS = ["skip", "todo", "fails", "only"];

const ROWS: readonly Row[] = [
  {
    location: "L1 before provider call",
    quote: "Before provider call",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      {
        file: "test/workbench-claude-cancel-faults.test.ts",
        title: "F10 a run abort during beforeDispatch stops the agent before query(): no SDK call, settled as workflow aborted",
      },
    ],
    status: "pinned",
  },
  {
    location: "L2 after provider side effect but before host result",
    quote: "after provider side effect but before host result",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      { file: "test/workbench-detached-faults-receipt.test.ts", title: "writes exactly one marker before the kill and nothing after it" },
      {
        file: "test/workflow-effect-replay.test.ts",
        title: "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect",
      },
    ],
    status: "pinned",
    reason: "detached-profile marker plus the uncertain-effect refusal on resume; the runtime.ts dispatched-row-before-call half is L3's open row",
  },
  {
    location: "L3 after result before journal append",
    quote: "after result before journal append",
    label: "code present",
    tier: "default-gate",
    pins: [],
    status: "open",
    trackingBead: "wb-5x0.1",
    reason: "runtime.ts journal gap: a non-read node leaves no journal row until it settles, so no case can inject here yet",
  },
  {
    location: "L4 before event persist",
    quote: "before event persist",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      {
        file: "test/workbench-observation.test.ts",
        title: "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot",
      },
    ],
    status: "pinned",
  },
  {
    location: "L5 after reconnect but before snapshot",
    quote: "after reconnect but before snapshot",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      {
        file: "test/workbench-observation.test.ts",
        title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
      },
    ],
    status: "pinned",
  },
  {
    location: "L6 before Claude SDK session ID first received",
    quote: "Before/after Claude SDK session ID first received",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      {
        file: "test/workbench-claude-cancel-faults.test.ts",
        title: "F1 cancel before the init message: skipped with no session id, and the stream saw its controller abort",
      },
    ],
    status: "pinned",
  },
  {
    location: "L7 after Claude SDK session ID first received",
    quote: "Before/after Claude SDK session ID first received",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      {
        file: "test/workbench-claude-cancel-faults.test.ts",
        title: "F2 cancel during tool execution: the cancelled result keeps the session id init reported",
      },
    ],
    status: "pinned",
  },
  {
    location: "L8 during tool execution",
    quote: "during tool execution",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      {
        file: "test/workbench-claude-cancel-faults.test.ts",
        title: "F2 cancel during tool execution: the cancelled result keeps the session id init reported",
      },
    ],
    status: "pinned",
  },
  {
    location: "L9 after output tokens streamed but before final",
    quote: "after output tokens streamed but before final",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      {
        file: "test/workbench-claude-cancel-faults.test.ts",
        title: "F3 the SDK ends the stream on abort: cancelled, never the missing-result failure",
      },
    ],
    status: "pinned",
  },
  {
    location: "L10 inside worktree after edits but before Forge gate",
    quote: "Inside worktree after edits but before Forge gate",
    label: "code present",
    tier: "default-gate",
    pins: [],
    status: "open",
    trackingBead: "wb-a2g.11",
    reason: "VC-1 worktree-isolation and gate-degradation conformance is in flight; pinned when it lands",
  },
  {
    location: "L11 after Forge evidence while workspace mutates",
    quote: "after Forge evidence while workspace mutates",
    label: "fixture pass",
    tier: "default-gate",
    pins: [
      {
        file: "test/workbench-forge-observer.test.ts",
        title: "reads Forge's own failed-gate status (error) as failure and never lets a mixed or undecided reading promote the workspace",
      },
    ],
    status: "pinned",
    reason: "observer half only; a forge-contract basis-change case is not yet landed",
  },
  {
    location: "L12 after isolated cleanup",
    quote: "after isolated cleanup",
    label: "code present",
    tier: "default-gate",
    pins: [],
    status: "open",
    trackingBead: "wb-a2g.11",
    reason: "VC-1 worktree-isolation and gate-degradation conformance is in flight; pinned when it lands",
  },
  {
    location: "L13 Furnace Work retry while child Run establishment is uncertain",
    quote: "Parent Furnace Work retry while child Run establishment is uncertain",
    label: "code present",
    tier: "default-gate",
    pins: [],
    status: "open",
    trackingBead: "wb-0kg.4",
    reason: "VC-7/W18-D Work-retry-while-establishment-uncertain conformance is in flight; pinned when it lands",
  },
  {
    location: "L14 concurrent readers with one shared child",
    quote: "Concurrent readers with one shared child; stopping one reader must not stop child without ownership",
    label: "code present",
    tier: "default-gate",
    pins: [
      {
        file: "test/workbench-control.test.ts",
        title: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing",
      },
    ],
    status: "open",
    trackingBead: "wb-0kg.7",
    reason: "ownership half is pinned; the multi-reader shared-child cancellation conformance is in flight, then this row flips to pinned",
  },
];

interface CaseOccurrence {
  title: string;
  modifiers: string[];
}

const CASE_CALL = /\b(?:it|test)((?:\.[A-Za-z]+)*)\(\s*(["'`])((?:\\.|(?!\2)[^\\])*)\2/g;

function scanCases(source: string): CaseOccurrence[] {
  const found: CaseOccurrence[] = [];
  for (const match of source.matchAll(CASE_CALL)) {
    found.push({
      title: (match[3] ?? "").replace(/\\(.)/g, "$1"),
      modifiers: (match[1] ?? "").split(".").filter((part) => part.length > 0),
    });
  }
  return found;
}

function pinProblem(source: string, title: string): string | undefined {
  const hits = scanCases(source).filter((found) => found.title === title);
  if (hits.length === 0) return "case title not found";
  if (hits.length > 1) return `case title occurs ${hits.length} times, not exactly once`;
  const banned = (hits[0]?.modifiers ?? []).filter((modifier) => BANNED_MODIFIERS.includes(modifier));
  if (banned.length > 0) return `case is disabled via .${banned.join(".")}`;
  return undefined;
}

type Reader = (file: string) => string;

const readHead: Reader = (file) => readFileSync(resolve(repo, file), "utf8");

function auditRow(row: Row, read: Reader): string[] {
  const problems: string[] = [];
  const fail = (detail: string): void => {
    problems.push(`${row.location}: ${detail}`);
  };
  for (const pin of row.pins) {
    const problem = pinProblem(read(pin.file), pin.title);
    if (problem !== undefined) fail(`${pin.file} "${pin.title}": ${problem}`);
  }
  if (row.status === "pinned") {
    if (row.pins.length === 0) fail("pinned row carries no pin");
    if (!PASS_LABELS.includes(row.label)) fail(`pinned row carries non-pass label "${row.label}"`);
  } else {
    if (row.trackingBead === undefined || !/^wb-[a-z0-9]+(\.[0-9]+)*$/.test(row.trackingBead)) fail("open row names no tracking bead");
    if (row.reason === undefined || row.reason.length === 0) fail("open row states no reason");
    if (!OPEN_LABELS.includes(row.label)) fail(`open row carries label "${row.label}"; it is never counted passed`);
  }
  if (row.label === "fixture pass" && (row.tier !== "default-gate" || row.pins.length === 0)) {
    fail("fixture pass requires a pinned default-gate case");
  }
  if (RECEIPT_LABELS.includes(row.label)) {
    if (row.receipt === undefined || !/^cmd_[0-9a-f]{12}$/.test(row.receipt)) fail(`${row.label} requires a cmd_ receipt id`);
    else if (!read(TRACEABILITY).includes(row.receipt)) fail(`receipt ${row.receipt} is not present in TRACEABILITY`);
  }
  return problems;
}

function auditAll(rows: readonly Row[], read: Reader): string[] {
  return rows.flatMap((row) => auditRow(row, read));
}

function faultSection(docs: string): string[] {
  const lines = docs.split("\n");
  const start = lines.findIndex((line) => line.trim() === SECTION);
  if (start < 0) return [];
  const bullets: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith("## ")) break;
    if (line.startsWith("- ")) bullets.push(line.slice(2).trim());
  }
  return bullets;
}

const BULLETS = [
  "Before provider call; after provider side effect but before host result; after result before journal append; before event persist; after reconnect but before snapshot.",
  "Before/after Claude SDK session ID first received; during tool execution; after output tokens streamed but before final.",
  "Inside worktree after edits but before Forge gate; after Forge evidence while workspace mutates; after isolated cleanup.",
  "Parent Furnace Work retry while child Run establishment is uncertain.",
  "Concurrent readers with one shared child; stopping one reader must not stop child without ownership.",
];

describe("docs/14 fault-injection locations census (wb-0kg.12)", () => {
  it("A1: docs/14 still lists exactly the five fault-injection bullets, verbatim", () => {
    expect(faultSection(readHead(DOCS_14))).toEqual(BULLETS);
  });

  it("A1: the table holds exactly fourteen distinct locations, each quoting its docs/14 fragment verbatim", () => {
    expect(ROWS.length).toBe(14);
    expect(new Set(ROWS.map((row) => row.location)).size).toBe(14);
    const docs = readHead(DOCS_14);
    for (const row of ROWS) {
      expect(row.quote.length, row.location).toBeGreaterThan(0);
      expect(docs.includes(row.quote), `${row.location}: quote is not verbatim in docs/14`).toBe(true);
    }
  });

  it("A1: every clause of every docs/14 bullet is covered by a row quote, so a new docs location goes red", () => {
    for (const bullet of BULLETS) {
      for (const clause of bullet.replace(/\.$/, "").split(";").map((part) => part.trim())) {
        const covered = ROWS.some((row) => row.quote.includes(clause));
        expect(covered, `docs/14 clause has no census row: "${clause}"`).toBe(true);
      }
    }
  });

  it("A2/A3: every row is pinned to a case that occurs exactly once and is enabled, or is an honest open row", () => {
    expect(auditAll(ROWS, readHead)).toEqual([]);
  });

  it("A3: no open row is counted passed, and every pinned row carries a pass label", () => {
    const open = ROWS.filter((row) => row.status === "open");
    const pinned = ROWS.filter((row) => row.status === "pinned");
    expect(open.length + pinned.length).toBe(ROWS.length);
    for (const row of open) expect(OPEN_LABELS).toContain(row.label);
    for (const row of pinned) expect(PASS_LABELS).toContain(row.label);
  });

  describe("scanner falsifiers: the census goes red, naming the location, when a pinned case is weakened", () => {
    const pinnedPairs = ROWS.flatMap((row) => row.pins.map((pin) => ({ row, pin })));

    it("covers at least one pinned case", () => {
      expect(pinnedPairs.length).toBeGreaterThan(0);
    });

    for (const { row, pin } of pinnedPairs) {
      const quoted = JSON.stringify(pin.title);
      const single = `'${pin.title.replace(/'/g, "\\'")}'`;
      const callPattern = new RegExp(`\\b(it|test)(\\(\\s*)(${escapeRegExp(quoted)}|${escapeRegExp(single)})`);
      const mutate = (source: string, build: (fn: string, open: string, original: string) => string): string =>
        source.replace(callPattern, (_whole, fn: string, open: string, original: string) => build(fn, open, original));
      const reader = (transform: (source: string) => string): Reader => {
        return (file) => (file === pin.file ? transform(readHead(file)) : readHead(file));
      };

      it(`${row.location}: renaming ${pin.file} "${pin.title.slice(0, 40)}" is detected`, () => {
        const renamed = reader((source) => mutate(source, (fn, open) => `${fn}${open}${JSON.stringify(`${pin.title} (renamed)`)}`));
        const problems = auditRow(row, renamed);
        expect(problems.length).toBeGreaterThan(0);
        expect(problems.join("\n")).toContain(row.location);
      });

      it(`${row.location}: deleting ${pin.file} "${pin.title.slice(0, 40)}" is detected`, () => {
        const deleted = reader((source) => mutate(source, (fn, open) => `${fn}${open}"a deleted case"`));
        expect(auditRow(row, deleted).join("\n")).toContain(row.location);
      });

      it(`${row.location}: skipping ${pin.file} "${pin.title.slice(0, 40)}" is detected`, () => {
        for (const modifier of BANNED_MODIFIERS) {
          const skipped = reader((source) => mutate(source, (fn, open, original) => `${fn}.${modifier}${open}${original}`));
          expect(skipped(pin.file) === readHead(pin.file), `${modifier} mutation did not change the source`).toBe(false);
          expect(auditRow(row, skipped).join("\n"), modifier).toContain(row.location);
        }
      });

      it(`${row.location}: a duplicate of ${pin.file} "${pin.title.slice(0, 40)}" is detected`, () => {
        const doubled = reader((source) => `${source}\nit(${quoted}, () => {});\n`);
        expect(auditRow(row, doubled).join("\n")).toContain(row.location);
      });
    }

    it("a pass label on an open row, a missing tracking bead and an unreceipted live label each fail naming the location", () => {
      const base: Row = {
        location: "LX synthetic",
        quote: "x",
        label: "code present",
        tier: "default-gate",
        pins: [],
        status: "open",
        trackingBead: "wb-0kg.12",
        reason: "synthetic",
      };
      expect(auditRow(base, readHead)).toEqual([]);
      expect(auditRow({ ...base, label: "fixture pass" }, readHead).join("\n")).toContain("LX synthetic");
      expect(auditRow({ ...base, trackingBead: undefined }, readHead).join("\n")).toContain("no tracking bead");
      expect(auditRow({ ...base, status: "pinned", label: "live SDK pass", tier: "live" }, readHead).join("\n")).toContain("cmd_ receipt");
      expect(auditRow({ ...base, status: "pinned", label: "live SDK pass", tier: "live", receipt: "cmd_000000000000", pins: [{ file: "test/workbench-control.test.ts", title: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing" }] }, readHead).join("\n")).toContain("not present in TRACEABILITY");
    });

    it("scanCases reads single, double and backtick titles with escapes and reports modifiers", () => {
      const found = scanCases(["it('a \\'q\\' b', () => {});", 'it.skip("c", () => {});', "test.only(`d`, () => {});"].join("\n"));
      expect(found).toEqual([
        { title: "a 'q' b", modifiers: [] },
        { title: "c", modifiers: ["skip"] },
        { title: "d", modifiers: ["only"] },
      ]);
    });
  });
});

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
