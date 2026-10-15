/**
 * wb-752.10: docs/09 "Acceptance/negative controls" census falsifier.
 *
 * docs/workbench/14-qa-and-benchmarks.md "Truth labels and release gates": "Each major work
 * package must have a falsifier: a negative test that would fail if a critical guarantee was
 * quietly weakened." This file binds the ten docs/09 control sentences to existing cases by
 * file and verbatim title, statically. It never runs a pinned case and never reports a live,
 * native or scale pass from a title's presence (docs/14: "All docs and status tables must
 * distinguish "code present", "fixture pass", "live SDK pass", "adversarial pass", "scale
 * benchmark pass"."). Each pin carries the tier its case runs in.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_09 = "docs/workbench/09-observation-and-provenance.md";

type Tier = "default-gate" | "furnace-active-observe" | "native-read" | "bench-receipt";

interface CasePin {
  readonly file: string;
  /** Exact case title; omitted only for a presence-only pin of a non-vitest receipt artifact. */
  readonly title?: string;
  readonly tier: Tier;
}

interface ControlRow {
  readonly control: number;
  readonly quote: string;
  readonly status: "pinned" | "unpinned";
  readonly pins: readonly CasePin[];
  readonly reason?: string;
}

const CONTROLS: readonly ControlRow[] = [
  {
    control: 1,
    quote: "Attach by Furnace Run ID to independently created run without assuming parent ownership.",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-external-furnace.test.ts",
        title: "attaches to the existing Run, retains native identities, and leaves both stores byte-identical",
        tier: "furnace-active-observe",
      },
    ],
  },
  {
    control: 2,
    quote: "Replay duplicate/out-of-order events; no double count or status regression.",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-observation.test.ts",
        title: "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot",
        tier: "default-gate",
      },
    ],
  },
  {
    control: 3,
    quote: "Disconnect mid-stream; show freshness stale and reconcile through snapshot after reconnect.",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-observation.test.ts",
        title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
        tier: "default-gate",
      },
    ],
  },
  {
    control: 4,
    quote: "Two native sources reuse an identifier; provider-qualified keys do not collide.",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-observation.test.ts",
        title: "uses provider-qualified native keys, preserves native failure and does not infer ownership",
        tier: "default-gate",
      },
    ],
  },
  {
    control: 5,
    quote: "Simulated missing relation; no fabricated dependency edge or precise critical path.",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-attention.test.ts",
        title:
          "an open or missing interval anywhere in the observed dependency graph withholds the estimate; an unrelated open node does not",
        tier: "default-gate",
      },
      {
        file: "test/workbench-topology-slice.test.ts",
        title: "matches an independent brute-force computation on a seeded fixture: nothing listed that was not observed, nothing lost silently",
        tier: "default-gate",
      },
    ],
  },
  {
    control: 6,
    quote: 'Native "partial" HX coverage never becomes "known empty".',
    status: "pinned",
    pins: [
      {
        file: "test/workbench-hyperunix-observer.test.ts",
        title: "H2: a 0-row incomplete answer that does not license absence stays partial and never reads as known-empty",
        tier: "default-gate",
      },
    ],
  },
  {
    control: 7,
    quote: "A true Forge failed gate remains failed despite transport success.",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-forge-observer.test.ts",
        title: "F2: a current failed gate stays failed despite transport success, and current success is success",
        tier: "default-gate",
      },
    ],
  },
  {
    control: 8,
    quote: "Closing observer causes zero cancellation calls.",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-native-details.test.ts",
        title: "preserves selected node on resize and closes without invoking any runtime controls",
        tier: "default-gate",
      },
    ],
  },
  {
    control: 9,
    quote: "100k-event benchmark proves incremental projection/viewport, not full-fold in render.",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-observation-aggregates.test.ts",
        title: "A8: 100,000 status ingests over a 2,000-node 5-level tree visit only their ancestors and never rebuild",
        tier: "default-gate",
      },
      { file: "qa/workbench/inspector-bench.mjs", tier: "bench-receipt" },
    ],
  },
  {
    control: 10,
    quote: "Large/secret payload does not leak into Pi tool result or screen by default.",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-security-pi-tools.test.ts",
        title: "furnace_observe redacts native error fields and never echoes producer exceptions",
        tier: "default-gate",
      },
      {
        file: "test/workbench-security-pi-tools.test.ts",
        title: "workflow_validate must redact secret-bearing scriptPath values in its returned definition",
        tier: "default-gate",
      },
    ],
  },
];

interface CaseOccurrence {
  readonly title: string;
  /** "" for a plain case, otherwise the modifier (skip, todo, fails, only). */
  readonly modifier: string;
}

const CASE_CALL = /\b(?:it|test)(?:\.(skip|todo|fails|only))?\(\s*(["'`])((?:\\.|(?!\2)[^\\])*)\2/g;

function decodeEscapes(raw: string): string {
  return raw.replace(/\\(.)/g, (_all, ch: string) => ch);
}

/** Lists every it()/test() occurrence with a literal title in a test source. */
function listCases(source: string): readonly CaseOccurrence[] {
  const found: CaseOccurrence[] = [];
  for (const match of source.matchAll(CASE_CALL)) {
    found.push({ title: decodeEscapes(match[3] ?? ""), modifier: match[1] ?? "" });
  }
  return found;
}

/** A pin is healthy when its exact title occurs exactly once and is an active case. */
function judgePin(source: string, title: string): { readonly ok: boolean; readonly why: string } {
  const hits = listCases(source).filter(c => c.title === title);
  if (hits.length === 0) return { ok: false, why: "absent" };
  if (hits.length > 1) return { ok: false, why: `duplicated x${hits.length}` };
  const [only] = hits;
  if (only !== undefined && only.modifier !== "") return { ok: false, why: `modifier .${only.modifier}` };
  return { ok: true, why: "present" };
}

function readRepo(relative: string): string {
  return readFileSync(join(ROOT, relative), "utf8");
}

describe("docs/09 acceptance controls census (wb-752.10)", () => {
  it("the table carries exactly the ten controls, numbered 1..10, each pinned or reasoned", () => {
    expect(CONTROLS.map(c => c.control)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    for (const row of CONTROLS) {
      if (row.status === "pinned") expect(row.pins.length, `control ${row.control}`).toBeGreaterThan(0);
      else expect(row.reason ?? "", `control ${row.control} unpinned needs a reason`).not.toBe("");
    }
  });

  it("docs/09 still carries each control sentence verbatim as its numbered item (docs drift guard)", () => {
    const lines = readRepo(DOCS_09).split("\n");
    const start = lines.findIndex(l => l.trim() === "## Acceptance/negative controls");
    expect(start, "docs/09 section heading").toBeGreaterThanOrEqual(0);
    const section: string[] = [];
    for (const line of lines.slice(start + 1)) {
      if (line.startsWith("## ")) break;
      section.push(line);
    }
    for (const row of CONTROLS) {
      expect(section, `control ${row.control} sentence drifted: ${row.quote}`).toContain(`${row.control}. ${row.quote}`);
    }
  });

  for (const row of CONTROLS) {
    if (row.status !== "pinned") continue;
    it(`control ${row.control}: every pinned case exists exactly once and is not skipped (${row.quote})`, () => {
      for (const pin of row.pins) {
        const where = `control ${row.control} [${pin.tier}] ${pin.file}`;
        expect(existsSync(join(ROOT, pin.file)), `${where} is missing`).toBe(true);
        if (pin.title === undefined) continue;
        const verdict = judgePin(readRepo(pin.file), pin.title);
        expect(verdict.ok, `${where}: "${pin.title}" is ${verdict.why} (control: ${row.quote})`).toBe(true);
      }
    });
  }

  it("never claims a live, native or scale pass from presence: only fixture-tier titles run in the default gate", () => {
    for (const row of CONTROLS) {
      for (const pin of row.pins) {
        if (pin.tier === "bench-receipt") expect(pin.title, `control ${row.control}: bench pins are presence-only`).toBeUndefined();
        else expect(pin.title, `control ${row.control}: ${pin.file} needs a title`).toBeDefined();
      }
    }
    const tiers = new Set(CONTROLS.flatMap(r => r.pins.map(p => p.tier)));
    expect([...tiers].sort()).toEqual(["bench-receipt", "default-gate", "furnace-active-observe"]);
  });
});

describe("pin scanner falsifiers (one mutant per failure mode)", () => {
  const SOURCE = [
    `describe("x", () => {`,
    `  it("keeps provider-qualified keys", () => {});`,
    `  it('single quoted "inner" title', () => {});`,
    `  test("a test() form", () => {});`,
    `});`,
  ].join("\n");

  it("accepts a present active case in either quote style and in test()", () => {
    expect(judgePin(SOURCE, "keeps provider-qualified keys").ok).toBe(true);
    expect(judgePin(SOURCE, 'single quoted "inner" title').ok).toBe(true);
    expect(judgePin(SOURCE, "a test() form").ok).toBe(true);
  });

  it("rename mutant: the old title goes red as absent", () => {
    const mutant = SOURCE.replace("keeps provider-qualified keys", "keeps keys");
    expect(judgePin(mutant, "keeps provider-qualified keys")).toEqual({ ok: false, why: "absent" });
  });

  it("delete mutant: a removed case goes red as absent", () => {
    const mutant = SOURCE.replace(/ {2}it\("keeps provider-qualified keys".*\n/, "");
    expect(judgePin(mutant, "keeps provider-qualified keys").ok).toBe(false);
  });

  it.each(["skip", "todo", "fails", "only"])("modifier mutant: it.%s goes red naming the modifier", modifier => {
    const mutant = SOURCE.replace('it("keeps provider-qualified keys"', `it.${modifier}("keeps provider-qualified keys"`);
    expect(judgePin(mutant, "keeps provider-qualified keys")).toEqual({ ok: false, why: `modifier .${modifier}` });
  });

  it("duplicate mutant: a second identical title goes red", () => {
    const mutant = `${SOURCE}\nit("keeps provider-qualified keys", () => {});`;
    expect(judgePin(mutant, "keeps provider-qualified keys")).toEqual({ ok: false, why: "duplicated x2" });
  });

  it("drift mutant: an edited docs sentence is not equal to the pinned quote", () => {
    const row = CONTROLS[7];
    expect(row?.quote).toBe("Closing observer causes zero cancellation calls.");
    expect("8. Closing observer causes one cancellation call.").not.toBe(`8. ${row?.quote}`);
  });
});
