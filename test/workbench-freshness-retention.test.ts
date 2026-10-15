import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Census falsifier for the docs/workbench/09 sections "Freshness and ambiguity"
 * and "Data retention and privacy" (wb-752.14, VC-4/W14).
 *
 * docs/workbench/14 "Truth labels and release gates": "Each major work package
 * must have a falsifier: a negative test that would fail if a critical guarantee
 * was quietly weakened."
 *
 * The eight docs/09 sentences are bound, as one frozen table, to the existing
 * cases that carry them: by repo-relative file and VERBATIM it()/test() title.
 * This file READS those suites as text; it never executes a pinned case and
 * claims no live, native or scale pass from a title being present. A rename, a
 * deletion or a skip/todo/fails/only modifier of a pinned case, or a docs edit
 * that drops or rewrites a sentence, turns it red naming sentence, file and title.
 * A sentence (or half) with no case is recorded unpinned or partial with its
 * reason and is never counted as passed.
 */

type Section = "Freshness and ambiguity" | "Data retention and privacy";
type Tier = "default-gate" | "bench-receipt";
type Status = "pinned" | "unpinned" | "partial";

interface Pin {
  readonly file: string;
  readonly title: string;
}

interface Row {
  readonly n: number;
  readonly section: Section;
  readonly quote: string;
  readonly tier: Tier;
  readonly status: Status;
  readonly pins: readonly Pin[];
  readonly reason?: string;
}

const DOC_09 = "docs/workbench/09-observation-and-provenance.md";
const DOC_14 = "docs/workbench/14-qa-and-benchmarks.md";
const FALSIFIER_QUOTE =
  "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";

const ROWS: readonly Row[] = Object.freeze([
  {
    n: 1,
    section: "Freshness and ambiguity",
    quote: "Each projection node includes lastConfirmedAt, observedAt, sourceConnectionState, sourceCursor and completeness label.",
    tier: "default-gate",
    status: "partial",
    pins: [
      { file: "test/workbench-observation.test.ts", title: "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot" },
      { file: "test/workbench-observation.test.ts", title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot" },
      { file: "test/workbench-detached-observer.test.ts", title: "carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference" },
    ],
    reason:
      "No single case names all five fields. Covered: freshness and lastConfirmedAt (observation :29), sourceConnectionState (observation :43), observedAt and the coverage/completeness value on a detached reading (detached-observer :49). sourceCursor on a projection node has no asserting case today (the only test mention is a forbidden-term list in the timeline suite), so the five-field claim stays partial.",
  },
  {
    n: 2,
    section: "Freshness and ambiguity",
    quote: "UI shows STALE/UNKNOWN visibly.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-inspector.test.ts", title: "a disconnected last-known running node is STALE/UNKNOWN, never drawn as live spinner" },
      { file: "test/workbench-attention.test.ts", title: "a disconnect raises stale and disconnected by the provider's node count and leaves waiting and unknown alone" },
    ],
  },
  {
    n: 3,
    section: "Freshness and ambiguity",
    quote: "A disconnected Furnace event stream must not make a previously RUNNING node permanently authoritative RUNNING; it becomes last-known-running + stale.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-furnace-observer.test.ts", title: "reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING" },
      { file: "test/workbench-observation.test.ts", title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot" },
    ],
  },
  {
    n: 4,
    section: "Freshness and ambiguity",
    quote: "Pi tool summaries must communicate that nuance.",
    tier: "default-gate",
    status: "unpinned",
    pins: [],
    reason:
      "wb-752.2 (observe-query builder) is in flight; the summary reaches a Pi tool only via the wiring beads wb-752.9 and wb-752.13. test/workbench-security-pi-tools.test.ts holds no stale-summary assertion at the census base. Flip this row to pinned in the same commit that lands the first case.",
  },
  {
    n: 5,
    section: "Data retention and privacy",
    quote: "Short hot window in memory (configurable); optional local/private disk cache for diagnostics and reattachment.",
    tier: "bench-receipt",
    status: "partial",
    pins: [
      { file: "test/workbench-observation-perf.test.ts", title: "retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history" },
      { file: "test/workbench-observation-recovery-receipt.test.ts", title: "keeps the only maxNodes literal inside the bench-only pass object, so the default pass never raises a cap" },
    ],
    reason:
      "The in-memory hot window is pinned. The optional local/private disk cache half is unpinned: optional, not implemented in src/workbench, so no case exists to bind.",
  },
  {
    n: 6,
    section: "Data retention and privacy",
    quote: "Avoid raw prompts/tool bodies by default; store reference/short redacted preview, encrypt where required by deployment.",
    tier: "default-gate",
    status: "partial",
    pins: [
      { file: "test/workbench-hyperunix-observer.test.ts", title: "H6: row, claim and certificate bodies never surface, and 40 certificates cap evidence at 32 references" },
      { file: "test/workbench-forge-evidence.test.ts", title: "C4: producer text is redacted and stripped, and no raw payload member is retained" },
      { file: "test/workbench-detached-observer.test.ts", title: "carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference" },
    ],
    reason:
      "Reference-not-body and redacted preview are pinned for the HyperUnix, Forge-evidence and detached readers. The Claude observer has no case asserting bodies are never retained, and the encrypt-where-required clause is deployment-owned with no case; both stay unpinned.",
  },
  {
    n: 7,
    section: "Data retention and privacy",
    quote: "Providers own transcript/artifact retention; UI fetches full text lazily subject to permission.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-evidence-loader.test.ts", title: "loads one ref lazily and idempotently while loading" },
      { file: "test/workbench-evidence-loader.test.ts", title: "claude: without the claude:transcript grant nothing is read and the ref refuses unauthorized, the same entry a revoked grant leaves" },
    ],
  },
  {
    n: 8,
    section: "Data retention and privacy",
    quote: "Tenant/workspace boundaries apply at correlation queries, not just at individual SDK calls.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-topology-slice.test.ts", title: "never reads another tenant's relations and refuses a focus key outside the caller scope" },
      { file: "test/workbench-security-capability.test.ts", title: "Furnace provider must not return a foreign workspace's Run record" },
      { file: "test/workbench-reconcile-decision.test.ts", title: "denies cross-scope with the observe tool's exact text for a missing task and a foreign scope alike" },
    ],
  },
]);

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readRepoFile(relative: string): string {
  return readFileSync(resolve(REPO_ROOT, relative), "utf8");
}

const SKIP_MODIFIERS = /^(skip|todo|fails|only|skipIf|runIf)$/u;
const MODIFIER_TAIL = /\b(?:it|test)((?:\.[A-Za-z]+)*)\s*\(\s*$/u;

/**
 * Returns a problem string for one pinned title in one source text, or
 * undefined when the title is registered exactly once as a plain it()/test().
 */
function auditPin(source: string, title: string): string | undefined {
  const calls: string[] = [];
  for (const quote of ["'", '"', "`"]) {
    const needle = `${quote}${title}${quote}`;
    let from = 0;
    for (;;) {
      const at = source.indexOf(needle, from);
      if (at < 0) break;
      from = at + needle.length;
      const head = MODIFIER_TAIL.exec(source.slice(Math.max(0, at - 40), at));
      if (head) calls.push(head[1] ?? "");
    }
  }
  if (calls.length === 0) return "title is not registered by an it()/test() call (renamed or deleted)";
  if (calls.length > 1) return `title is registered ${calls.length} times, expected exactly once`;
  const modifiers = (calls[0] ?? "").split(".").filter((part) => part.length > 0);
  const blocked = modifiers.filter((part) => SKIP_MODIFIERS.test(part));
  if (blocked.length > 0) return `case is disabled by .${blocked.join(".")}`;
  return undefined;
}

/** File-level modifiers that would silently disable or narrow every case in a pinned suite. */
function auditSuiteModifiers(source: string): string | undefined {
  const found = /\b(?:describe|it|test)\.(?:only|skip|todo|fails)\b/u.exec(source);
  return found ? `suite carries ${found[0]}` : undefined;
}

/** True when the quote opens a paragraph or follows a sentence boundary, so a prefixed rewrite does not pass. */
function hasSentence(body: string, quote: string): boolean {
  return body.split(/\n\s*\n/u).some((paragraph) => {
    const text = paragraph.trim();
    return text.startsWith(quote) || text.includes(`. ${quote}`);
  });
}

function sectionBody(doc: string, heading: Section): string {
  const marker = `## ${heading}`;
  const start = doc.indexOf(marker);
  if (start < 0) return "";
  const rest = doc.slice(start + marker.length);
  const next = rest.search(/\n## /u);
  return next < 0 ? rest : rest.slice(0, next);
}

describe("docs/09 freshness-and-retention census (wb-752.14)", () => {
  it("freezes exactly eight rows numbered 1..8 in docs order, two sections, valid tier and status", () => {
    expect(Object.isFrozen(ROWS)).toBe(true);
    expect(ROWS.map((row) => row.n)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(ROWS.filter((row) => row.section === "Freshness and ambiguity").map((row) => row.n)).toStrictEqual([1, 2, 3, 4]);
    expect(ROWS.filter((row) => row.section === "Data retention and privacy").map((row) => row.n)).toStrictEqual([5, 6, 7, 8]);
    for (const row of ROWS) {
      expect(["default-gate", "bench-receipt"], `sentence ${row.n} tier`).toContain(row.tier);
      expect(["pinned", "unpinned", "partial"], `sentence ${row.n} status`).toContain(row.status);
    }
  });

  it("classifies honestly: pinned rows carry pins and no reason, partial rows carry both, unpinned rows carry a reason and no pin", () => {
    for (const row of ROWS) {
      if (row.status === "pinned") {
        expect(row.pins.length, `sentence ${row.n} is pinned and needs at least one pin`).toBeGreaterThan(0);
        expect(row.reason, `sentence ${row.n} is pinned and must not carry a reason`).toBeUndefined();
      } else if (row.status === "partial") {
        expect(row.pins.length, `sentence ${row.n} is partial and needs at least one pin`).toBeGreaterThan(0);
        expect((row.reason ?? "").length, `sentence ${row.n} is partial and needs a reason`).toBeGreaterThan(40);
      } else {
        expect(row.pins, `sentence ${row.n} is unpinned and must carry no pin`).toStrictEqual([]);
        expect((row.reason ?? "").length, `sentence ${row.n} is unpinned and needs a reason`).toBeGreaterThan(40);
      }
    }
    expect(ROWS.filter((row) => row.status !== "pinned").map((row) => row.n)).toStrictEqual([1, 4, 5, 6]);
  });

  for (const row of ROWS) {
    it(`docs/09 carries sentence ${row.n} verbatim under "${row.section}"`, () => {
      const body = sectionBody(readRepoFile(DOC_09), row.section);
      expect(body.length, `${DOC_09} section "${row.section}" is missing`).toBeGreaterThan(0);
      expect(hasSentence(body, row.quote), `sentence ${row.n} no longer appears verbatim in ${DOC_09} section "${row.section}": ${row.quote}`).toBe(true);
    });
  }

  it("docs/14 still states the per-work-package falsifier rule this census answers", () => {
    expect(readRepoFile(DOC_14).includes(FALSIFIER_QUOTE), `${DOC_14} no longer carries the falsifier sentence`).toBe(true);
  });

  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`sentence ${row.n} (${row.tier}, ${row.status}): ${pin.file} registers one live case "${pin.title}"`, () => {
        const source = readRepoFile(pin.file);
        const problem = auditPin(source, pin.title);
        expect(problem, `sentence ${row.n}: ${pin.file} :: ${pin.title}: ${problem ?? ""}`).toBeUndefined();
      });
    }
  }

  it("no pinned suite carries a file-level only/skip/todo/fails modifier", () => {
    const files = [...new Set(ROWS.flatMap((row) => row.pins.map((pin) => pin.file)))].sort();
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const problem = auditSuiteModifiers(readRepoFile(file));
      expect(problem, `${file}: ${problem ?? ""}`).toBeUndefined();
    }
  });

  describe("the scanner itself is falsifiable (in-memory mutants of a pinned suite)", () => {
    const title = "retains only a hot window and nothing else";
    const base = `describe("x", () => {\n  it("${title}", () => {});\n});\n`;

    it("accepts the intact case", () => {
      expect(auditPin(base, title)).toBeUndefined();
      expect(auditSuiteModifiers(base)).toBeUndefined();
    });

    it("rejects a rename", () => {
      expect(auditPin(base.replace("hot window", "warm window"), title)).toMatch(/renamed or deleted/u);
    });

    it("rejects a deletion", () => {
      expect(auditPin("describe(\"x\", () => {});\n", title)).toMatch(/renamed or deleted/u);
    });

    it("rejects a title that survives only in a comment or a string that is not a case", () => {
      expect(auditPin(`// "${title}"\nconst s = "${title}";\n`, title)).toMatch(/renamed or deleted/u);
    });

    for (const modifier of ["skip", "todo", "fails", "only"]) {
      it(`rejects it.${modifier}`, () => {
        expect(auditPin(base.replace("it(", `it.${modifier}(`), title)).toBe(`case is disabled by .${modifier}`);
      });
    }

    it("rejects test.skip the same way", () => {
      expect(auditPin(base.replace("it(", "test.skip("), title)).toBe("case is disabled by .skip");
    });

    it("rejects a duplicated title", () => {
      expect(auditPin(`${base}${base}`, title)).toMatch(/registered 2 times/u);
    });

    it("rejects a suite-level describe.skip or describe.only", () => {
      expect(auditSuiteModifiers(base.replace("describe(", "describe.skip("))).toBe("suite carries describe.skip");
      expect(auditSuiteModifiers(base.replace("describe(", "describe.only("))).toBe("suite carries describe.only");
    });
  });
});
