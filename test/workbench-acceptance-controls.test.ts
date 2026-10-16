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

/**
 * Where a pinned case runs. "furnace-observe" is the forge command of that name
 * (vitest.furnace.config.ts), excluded from the default gate; "bench-receipt" is a non-vitest artifact.
 * Tier truth is verified against the configs in "tier truth" below, never trusted from the label.
 */
type Tier = "default-gate" | "furnace-observe" | "bench-receipt";

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
        tier: "furnace-observe",
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
      {
        file: "test/workbench-furnace-topology.test.ts",
        title: "A6: closing after projecting invokes zero Furnace control verbs and carries no raw log line or secret",
        tier: "default-gate",
      },
      {
        file: "test/workbench-furnace-control.test.ts",
        title: "closing the observer of a shared client performs zero control calls, and only a permitted decision then reaches one verb",
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
  /** How the modifier was spelled: it.skip(...) ("dot") or it(title, { skip: true }, fn) ("options"). */
  readonly via: "dot" | "options" | "none";
}

const CASE_CALL =
  /(?<![\w$.])(?:it|test)(?:\.(skip|todo|fails|only))?\(\s*(["'`])((?:\\.|(?!\2)[^\\])*)\2(?:\s*,\s*(\{[^{}]*\}))?/g;
const OPTION_MODIFIER = /\b(skip|todo|fails|only)\s*:\s*true\b/;
/** File-wide hazards: a stray .only skips every other case in the file; a suite-level skip hides cases. */
const FILE_HAZARD =
  /\b(?:describe|suite|it|test)\.only\b|\b(?:describe|suite)\.(?:skip|todo|skipIf|runIf)\b|\b(?:it|test)\.(?:skipIf|runIf)\b/;

function decodeEscapes(raw: string): string {
  return raw.replace(/\\(.)/g, (_all, ch: string) => ch);
}

/**
 * Blanks // and block comments outside string and template literals, keeping newlines, so a
 * commented-out case never counts as present. Known limits: template-literal ${...} expressions and
 * regex literals are not parsed (none sit in pinned case positions).
 */
function stripComments(source: string): string {
  let out = "";
  let quote = "";
  let i = 0;
  while (i < source.length) {
    const ch = source.charAt(i);
    const next = source.charAt(i + 1);
    if (quote !== "") {
      out += ch;
      if (ch === "\\") {
        out += next;
        i += 2;
        continue;
      }
      if (ch === quote) quote = "";
      i += 1;
      continue;
    }
    if (ch === "/" && next === "/") {
      while (i < source.length && source.charAt(i) !== "\n") i += 1;
      continue;
    }
    if (ch === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      const stop = end === -1 ? source.length : end + 2;
      out += source.slice(i, stop).replace(/[^\n]/g, " ");
      i = stop;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") quote = ch;
    out += ch;
    i += 1;
  }
  return out;
}

/** Lists every it()/test() occurrence with a literal title in a test source, comments excluded. */
function listCases(source: string): readonly CaseOccurrence[] {
  const found: CaseOccurrence[] = [];
  for (const match of stripComments(source).matchAll(CASE_CALL)) {
    const dot = match[1] ?? "";
    const optionName = OPTION_MODIFIER.exec(match[4] ?? "")?.[1] ?? "";
    const modifier = dot !== "" ? dot : optionName;
    const via = dot !== "" ? "dot" : optionName !== "" ? "options" : "none";
    found.push({ title: decodeEscapes(match[3] ?? ""), modifier, via });
  }
  return found;
}

/**
 * A pin is healthy when its exact title occurs exactly once as an active case AND the file carries
 * no file-wide hazard (.only anywhere, suite-level skip/todo/skipIf/runIf), fail-closed.
 */
function judgePin(source: string, title: string): { readonly ok: boolean; readonly why: string } {
  const hits = listCases(source).filter(c => c.title === title);
  if (hits.length === 0) return { ok: false, why: "absent" };
  if (hits.length > 1) return { ok: false, why: `duplicated x${hits.length}` };
  const [only] = hits;
  if (only !== undefined && only.modifier !== "") {
    return { ok: false, why: only.via === "options" ? `modifier { ${only.modifier}: true }` : `modifier .${only.modifier}` };
  }
  const hazard = FILE_HAZARD.exec(stripComments(source))?.[0];
  if (hazard !== undefined) return { ok: false, why: `file hazard ${hazard}` };
  return { ok: true, why: "present" };
}

/** Which config runs a tier's files, verified from the repository's own config text. */
function judgeTier(
  tier: Tier,
  file: string,
  configs: { readonly vitestConfig: string; readonly furnaceConfig: string; readonly forgeToml: string },
): { readonly ok: boolean; readonly why: string } {
  const excludeLine = configs.vitestConfig.split("\n").find(l => l.includes("exclude:")) ?? "";
  const excluded = excludeLine.includes(`"${file}"`);
  if (tier === "default-gate") {
    if (!/^test\/.+\.test\.ts$/.test(file)) return { ok: false, why: "outside the default include test/**/*.test.ts" };
    return excluded ? { ok: false, why: "excluded from vitest.config.ts" } : { ok: true, why: "runs in the default gate" };
  }
  if (tier === "furnace-observe") {
    if (!excluded) return { ok: false, why: "not excluded from the default gate, so not a furnace-observe-only case" };
    if (!configs.furnaceConfig.includes(`"${file}"`)) return { ok: false, why: "not included by vitest.furnace.config.ts" };
    const block = /\[build\.commands\.furnace-observe\][^[]*/.exec(configs.forgeToml)?.[0] ?? "";
    if (!block.includes("vitest.furnace.config.ts")) return { ok: false, why: "forge furnace-observe command no longer runs vitest.furnace.config.ts" };
    return { ok: true, why: "runs under forge furnace-observe" };
  }
  return { ok: true, why: "presence-only receipt" };
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
    const numbered = section.filter(l => /^\d+\. /.test(l));
    expect(numbered.length, "docs/09 carries an eleventh or removed control the table does not know").toBe(CONTROLS.length);
  });

  it("tier truth: every pin's tier label matches the config that actually runs its file", () => {
    const configs = {
      vitestConfig: readRepo("vitest.config.ts"),
      furnaceConfig: readRepo("vitest.furnace.config.ts"),
      forgeToml: readRepo("forge.toml"),
    };
    for (const row of CONTROLS) {
      for (const pin of row.pins) {
        const verdict = judgeTier(pin.tier, pin.file, configs);
        expect(verdict.ok, `control ${row.control} ${pin.file} labelled ${pin.tier}: ${verdict.why}`).toBe(true);
      }
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

  it("labels each pin's tier and requires a title for every case pin; a bench receipt is presence-only", () => {
    for (const row of CONTROLS) {
      for (const pin of row.pins) {
        if (pin.tier === "bench-receipt") expect(pin.title, `control ${row.control}: bench pins are presence-only`).toBeUndefined();
        else expect(pin.title, `control ${row.control}: ${pin.file} needs a title`).toBeDefined();
      }
    }
    const tiers = new Set(CONTROLS.flatMap(r => r.pins.map(p => p.tier)));
    expect([...tiers].sort()).toEqual(["bench-receipt", "default-gate", "furnace-observe"]);
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

  it("comment mutants: a // or block-commented case goes red as absent", () => {
    const lineMutant = SOURCE.replace('  it("keeps provider-qualified keys"', '  // it("keeps provider-qualified keys"');
    expect(judgePin(lineMutant, "keeps provider-qualified keys")).toEqual({ ok: false, why: "absent" });
    const blockMutant = SOURCE.replace('  it("keeps provider-qualified keys", () => {});', '  /* it("keeps provider-qualified keys", () => {});\n */');
    expect(judgePin(blockMutant, "keeps provider-qualified keys")).toEqual({ ok: false, why: "absent" });
  });

  it("comment markers inside string literals are not comments", () => {
    const source = `it("http://example keeps /* going */", () => {});`;
    expect(judgePin(source, "http://example keeps /* going */").ok).toBe(true);
  });

  it.each(["skip", "todo", "fails", "only"])("options mutant: it(title, { %s: true }, fn) goes red", modifier => {
    const mutant = SOURCE.replace('it("keeps provider-qualified keys", () => {})', `it("keeps provider-qualified keys", { ${modifier}: true }, () => {})`);
    expect(judgePin(mutant, "keeps provider-qualified keys")).toEqual({ ok: false, why: `modifier { ${modifier}: true }` });
  });

  it("an options object without a modifier stays healthy", () => {
    const source = `it("keeps keys", { timeout: 5000 }, () => {});`;
    expect(judgePin(source, "keeps keys").ok).toBe(true);
  });

  it("file-hazard mutants: a stray .only or a suite-level skip anywhere in the file fails every pin in it", () => {
    for (const hazard of ['it.only("other", () => {});', 'describe.skip("wrap", () => {});', 'describe.todo("wrap");', 'it.skipIf(true)("other", () => {});', 'describe.runIf(false)("w", () => {});']) {
      const verdict = judgePin(`${SOURCE}\n${hazard}`, "keeps provider-qualified keys");
      expect(verdict.ok, hazard).toBe(false);
      expect(verdict.why, hazard).toMatch(/^file hazard /);
    }
  });

  it("a commented-out hazard is not a hazard", () => {
    expect(judgePin(`${SOURCE}\n// it.only("x", () => {});`, "keeps provider-qualified keys").ok).toBe(true);
  });

  it("a RegExp .test(...) call or a call inside a string is not a case", () => {
    const source = `${SOURCE}\nconst ok = /x/.test("keeps provider-qualified keys");`;
    expect(judgePin(source, "keeps provider-qualified keys").ok).toBe(true);
  });

  it("drift mutant: an eleventh docs control is detected by the numbered-item count", () => {
    const section = ["1. a", "2. b", "11. extra"];
    expect(section.filter(l => /^\d+\. /.test(l)).length).not.toBe(2);
  });
});

describe("tier truth falsifiers", () => {
  const CONFIGS = {
    vitestConfig: 'exclude: ["test/workbench-external-furnace.test.ts"],',
    furnaceConfig: 'include: ["test/workbench-external-furnace.test.ts"]',
    forgeToml: '[build.commands.furnace-observe]\ncommand = "vitest run --config vitest.furnace.config.ts"\n\n[build.commands.other]\ncommand = "x"',
  };

  it("accepts the true labels", () => {
    expect(judgeTier("furnace-observe", "test/workbench-external-furnace.test.ts", CONFIGS).ok).toBe(true);
    expect(judgeTier("default-gate", "test/workbench-observation.test.ts", CONFIGS).ok).toBe(true);
  });

  it("a default-gate label on a file excluded from vitest.config.ts goes red (file excluded from the default gate)", () => {
    expect(judgeTier("default-gate", "test/workbench-external-furnace.test.ts", CONFIGS).ok).toBe(false);
  });

  it("a furnace-observe label on a file the furnace config dropped goes red", () => {
    const dropped = { ...CONFIGS, furnaceConfig: "include: []" };
    expect(judgeTier("furnace-observe", "test/workbench-external-furnace.test.ts", dropped)).toEqual({ ok: false, why: "not included by vitest.furnace.config.ts" });
  });

  it("a furnace-observe label goes red when the forge command stops running the furnace config", () => {
    const rewired = { ...CONFIGS, forgeToml: '[build.commands.furnace-observe]\ncommand = "vitest run"' };
    expect(judgeTier("furnace-observe", "test/workbench-external-furnace.test.ts", rewired).ok).toBe(false);
  });

  it("a furnace-observe label on a default-gate file goes red", () => {
    expect(judgeTier("furnace-observe", "test/workbench-observation.test.ts", CONFIGS).ok).toBe(false);
  });
});
