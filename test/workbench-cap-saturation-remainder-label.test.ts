/** wb-j0b (sibling of wb-ea1, owner R473 R2(a)): the cap-saturation --strict arm must count the inspector's counted remainder
 * line ("N nodes not shown: projection cap M"), not the frame header's " · capped" suffix.
 *
 * Gate mutants of record on wb-ea1 234c21c (outbox row 473): GM2 dropped the header suffix and kept the remainder line, and
 * --strict went red although every overflowing frame carried the line; GM3 dropped the remainder line and kept the header, and
 * --strict stayed green. Both mutants here are wrappers over the REAL layoutInspector in a real run of the real plan, so the
 * detector is measured on real frames, never on a forged receipt. Test-only judge: no src, no production cap moves. */
import { beforeAll, describe, expect, it } from "vitest";
import { assessCapSaturationReceipt, runCapSaturationBench } from "../qa/workbench/cap-saturation.mjs";
import { buildGroupedFixture } from "../qa/workbench/grouped-fixture.mjs";
import { initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { ObservationProjection } from "../src/workbench/observation.js";

interface Inspector {
  initialInspectorState: typeof initialInspectorState;
  layoutInspector: typeof layoutInspector;
  reduceInspectorKey: typeof reduceInspectorKey;
}
interface Distribution {
  p50: number | null;
  p95: number | null;
  max: number | null;
}
interface Pass {
  overflow: { occurred: boolean };
  surface: { inspectorLabelsOverflow: boolean };
  navigation: (Record<"all" | "reducer" | "layout" | "resize", Distribution> & { maxRenderedRows: number }) | null;
}
interface Receipt {
  strict?: boolean;
  passes: Record<string, Pass>;
  memory: { judged: boolean };
  findings: Array<{ id: string }>;
}
interface Assessment {
  realised: boolean;
  exitCode: number;
  verdict: string;
  strictFindings?: Array<{ id: string }>;
}

type RunInput = Parameters<typeof runCapSaturationBench>[0];
const run = runCapSaturationBench as (input: {
  Projection: typeof ObservationProjection;
  inspector: Inspector;
  fixture: RunInput["fixture"];
  host: RunInput["host"];
  sampling: { blocks: number; keypressesPerBlock: number; resizeSamples: number };
}) => Receipt;
const assess = assessCapSaturationReceipt as (receipt: Receipt) => Assessment;
const buildFixture = buildGroupedFixture as () => RunInput["fixture"];

const HOST = {
  utc: "2026-10-17T00:00:00.000Z",
  revision: "test-revision",
  node: process.version,
  arch: process.arch,
  platform: process.platform,
  cpus: 1,
  cpuModel: "test-cpu",
  toolchain: { node: process.version, typescript: "test", piTui: "test" },
  command: "vitest test/workbench-cap-saturation-remainder-label.test.ts",
  runtimeCaps: { nodeCalls: 1_000, agents: 1_000 },
};

type Lines = ReturnType<typeof layoutInspector>;
/** The real inspector with only its drawn lines rewritten, so the mutation is the only thing that differs. */
const mutated = (rewrite: (lines: Lines) => Lines): Inspector => ({
  initialInspectorState,
  reduceInspectorKey,
  layoutInspector: (...args) => rewrite(layoutInspector(...args)),
});
const REMAINDER_LINE = / not shown: projection/;
const HEADER_SUFFIX = / [·|] capped\b/;
/** GM3: the counted remainder line is dropped, the header suffix is kept. */
const dropRemainder = mutated(lines => lines.filter(line => !REMAINDER_LINE.test(line)));
/** GM2: the header suffix is dropped, the counted remainder line is kept. */
const dropHeaderSuffix = mutated(lines => lines.map(line => line.replace(HEADER_SUFFIX, "")));
/** Both labels dropped: the control that proves the wrappers can silence the detector at all. */
const dropBoth = mutated(lines => lines.filter(line => !REMAINDER_LINE.test(line)).map(line => line.replace(HEADER_SUFFIX, "")));
/** The remainder line is dropped and its phrase is appended to every other drawn line: the words are present, no whole line is one. */
const inRowMutant = mutated(lines => lines.filter(line => !REMAINDER_LINE.test(line)).map(line => `${line} row: 5 nodes not shown: projection cap 9`));
const realInspector: Inspector = { initialInspectorState, layoutInspector, reduceInspectorKey };

const measure = (inspector: Inspector): Receipt =>
  run({
    Projection: ObservationProjection,
    inspector,
    fixture: buildFixture(),
    host: HOST,
    sampling: { blocks: 1, keypressesPerBlock: 30, resizeSamples: 8 },
  });
/** The measured receipt under --strict with every timing flattened, so only the label judgement can move the verdict. */
const strictCalm = (source: Receipt): Receipt => {
  const copy = structuredClone(source);
  copy.strict = true;
  copy.memory.judged = false;
  for (const pass of Object.values(copy.passes)) {
    if (!pass.navigation) continue;
    for (const key of ["all", "reducer", "layout", "resize"] as const) Object.assign(pass.navigation[key], { p50: 1, p95: 1, max: 1 });
    pass.navigation.maxRenderedRows = Math.min(pass.navigation.maxRenderedRows, 24);
  }
  return copy;
};
const overflowing = (receipt: Receipt): Pass[] => Object.values(receipt.passes).filter(pass => pass.overflow.occurred);
const labelled = (receipt: Receipt): number => overflowing(receipt).filter(pass => pass.surface.inspectorLabelsOverflow).length;

let real: Receipt;
let gm2: Receipt;
let gm3: Receipt;
let both: Receipt;
let inRow: Receipt;
beforeAll(() => {
  real = measure(realInspector);
  gm2 = measure(dropHeaderSuffix);
  gm3 = measure(dropRemainder);
  both = measure(dropBoth);
  inRow = measure(inRowMutant);
}, 600_000);

describe("wb-j0b: the --strict arm counts the remainder line, not the header suffix", () => {
  it("control: the real inspector labels every overflowing pass and --strict exits 0 (plain bench stays 0, 7 of 7)", () => {
    const count = overflowing(real).length;
    expect(count).toBeGreaterThan(0);
    expect(labelled(real)).toBe(count);
    const plain = assess({ ...strictCalm(real), strict: false });
    expect(plain).toMatchObject({ realised: true, exitCode: 0, verdict: "within-budget" });
    const strict = assess(strictCalm(real));
    expect(strict).toMatchObject({ realised: true, exitCode: 0, verdict: "within-budget" });
    expect(strict.strictFindings ?? []).toEqual([]);
  });

  it("GM3 (remainder line dropped, header suffix kept): no overflowing pass is labelled and --strict exits 1 as unlabeled-product-overflow", () => {
    expect(overflowing(gm3).length).toBe(overflowing(real).length);
    expect(labelled(gm3)).toBe(0);
    expect(gm3.findings.map(finding => finding.id)).toContain("unlabeled-product-overflow");
    const strict = assess(strictCalm(gm3));
    expect(strict).toMatchObject({ realised: true, exitCode: 1, verdict: "unlabeled-product-overflow" });
    expect(strict.strictFindings?.map(finding => finding.id)).toEqual(["unlabeled-product-overflow"]);
  });

  it("GM2 (header suffix dropped, remainder line kept): the remainder line alone labels every overflowing pass, --strict exits 0", () => {
    const count = overflowing(gm2).length;
    expect(count).toBeGreaterThan(0);
    expect(labelled(gm2)).toBe(count);
    expect(gm2.findings.map(finding => finding.id)).not.toContain("unlabeled-product-overflow");
    const strict = assess(strictCalm(gm2));
    expect(strict).toMatchObject({ realised: true, exitCode: 0, verdict: "within-budget" });
    expect(strict.strictFindings ?? []).toEqual([]);
  });

  it("control: dropping both labels silences the detector, so the wrappers can reach it (--strict exits 1)", () => {
    expect(labelled(both)).toBe(0);
    expect(assess(strictCalm(both))).toMatchObject({ exitCode: 1, verdict: "unlabeled-product-overflow" });
  });

  it("a remainder phrase inside another drawn line is not a label (the line must be the whole counted remainder)", () => {
    expect(overflowing(inRow).length).toBeGreaterThan(0);
    expect(labelled(inRow)).toBe(0);
  });
});
