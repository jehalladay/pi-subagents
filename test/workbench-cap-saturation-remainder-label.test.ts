/** wb-j0b (sibling of wb-ea1, owner R473 R2(a)): the cap-saturation --strict arm must count the inspector's counted remainder
 * line ("N nodes not shown: projection cap M"), not the frame header's " · capped" suffix.
 *
 * Gate mutants of record on wb-ea1 234c21c (outbox row 473): GM2 dropped the header suffix and kept the remainder line, and
 * --strict went red although every overflowing frame carried the line; GM3 dropped the remainder line and kept the header, and
 * --strict stayed green.
 *
 * One real run of the real plan feeds every row (respin of gate row 512 U2: five full runs, one per inspector, took 243-256 s
 * against the default gate's 300 s test step). Each mutant is a wrapper over the REAL layoutInspector, judged by the bench's own
 * surfaceOf over the projections that run built, in the state the run judged them; the verdicts come from the bench's own
 * assessor. Only a pass's surface is re-judged; no other receipt field is rewritten and nothing is mocked. Test-only judge: no
 * src, no production cap moves. */
import { beforeAll, describe, expect, it } from "vitest";
import { assessCapSaturationReceipt, PASS_IDS, runCapSaturationBench, surfaceOf } from "../qa/workbench/cap-saturation.mjs";
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
interface Surface {
  rowsBySize: Record<string, number>;
  inspectorLabelsOverflow: boolean;
  inspectorNamesOfferedTotal: boolean;
  windowTotal: number;
}
interface Pass {
  offered: { nodes: number };
  overflow: { occurred: boolean };
  surface: Surface;
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
/** The bench's own surface judge: the frames of every view and size it draws for one pass, and whether any names the drop. */
const judgeSurface = surfaceOf as (projection: ObservationProjection, inspector: Inspector, offered: { nodes: number }) => Surface;
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

/** Every projection the run builds, in construction order: the untimed warm-up first, then one per pass in PASS_IDS order. */
const built: ObservationProjection[] = [];
class KeptProjection extends ObservationProjection {
  constructor(...args: ConstructorParameters<typeof ObservationProjection>) {
    super(...args);
    built.push(this);
  }
}

type Lines = ReturnType<typeof layoutInspector>;
/** The real inspector with only its drawn lines rewritten, so the mutation is the only thing that differs. */
const mutated = (rewrite: (lines: Lines) => Lines): Inspector => ({
  initialInspectorState,
  reduceInspectorKey,
  layoutInspector: (...args) => rewrite(layoutInspector(...args)),
});
const REMAINDER_LINE = / not shown: projection/;
const HEADER_SUFFIX = / [·|] capped\b/;
const IN_ROW_PHRASE = " row: 5 nodes not shown: projection cap 9";
/** GM3: the counted remainder line is dropped, the header suffix is kept. */
const dropRemainder = mutated(lines => lines.filter(line => !REMAINDER_LINE.test(line)));
/** GM2: the header suffix is dropped, the counted remainder line is kept. */
const dropHeaderSuffix = mutated(lines => lines.map(line => line.replace(HEADER_SUFFIX, "")));
/** Both labels dropped: the control that proves the wrappers can silence the detector at all. */
const dropBoth = mutated(lines => lines.filter(line => !REMAINDER_LINE.test(line)).map(line => line.replace(HEADER_SUFFIX, "")));
/** The remainder line is dropped and its phrase is appended to every other drawn line: the words are present, no whole line is one. */
const inRowMutant = mutated(lines => lines.filter(line => !REMAINDER_LINE.test(line)).map(line => `${line}${IN_ROW_PHRASE}`));
const realInspector: Inspector = { initialInspectorState, layoutInspector, reduceInspectorKey };

/** The seven passes the plan drives past a cap; the other three offer no more than they hold (F2: the count is pinned). */
const OVERFLOWING = ["production-default", "cap-1000-just-past", "cap-1000-past", "cap-2000-just-past", "cap-2000-past", "cap-4000-past", "cap-8000-past"];

const passOf = (receipt: Receipt, id: string): Pass => {
  const pass = receipt.passes[id];
  if (!pass) throw new Error(`no pass ${id}`);
  return pass;
};
const overflowingIds = (receipt: Receipt): string[] => PASS_IDS.filter(id => passOf(receipt, id).overflow.occurred);
const labelledIds = (receipt: Receipt): string[] => overflowingIds(receipt).filter(id => passOf(receipt, id).surface.inspectorLabelsOverflow);
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

interface Judged {
  receipt: Receipt;
  frames: Map<string, string[][]>;
}
let real: Receipt;
/** The run's receipt with every pass's surface judged again by surfaceOf over the projection that pass built, drawn through
 * `inspector`, keeping each frame the judge drew; nothing else in the receipt changes. */
const judged = (inspector: Inspector): Judged => {
  const receipt = structuredClone(real);
  const frames = new Map<string, string[][]>();
  for (const [at, id] of PASS_IDS.entries()) {
    const projection = built[at + 1];
    if (!projection) throw new Error(`no projection kept for ${id}`);
    const drawn: string[][] = [];
    const recording: Inspector = {
      ...inspector,
      layoutInspector: (...args) => {
        const lines = inspector.layoutInspector(...args);
        drawn.push([...lines]);
        return lines;
      },
    };
    const pass = passOf(receipt, id);
    pass.surface = judgeSurface(projection, recording, pass.offered);
    frames.set(id, drawn);
  }
  return { receipt, frames };
};
/** Whether any line of any frame the judge drew for `id` matches `pattern`. */
const drew = (result: Judged, id: string, pattern: RegExp): boolean =>
  (result.frames.get(id) ?? []).some(lines => lines.some(line => pattern.test(line)));

let control: Judged;
let gm2: Judged;
let gm3: Judged;
let both: Judged;
let inRow: Judged;
beforeAll(() => {
  real = run({
    Projection: KeptProjection,
    inspector: realInspector,
    fixture: buildFixture(),
    host: HOST,
    sampling: { blocks: 1, keypressesPerBlock: 30, resizeSamples: 8 },
  });
  control = judged(realInspector);
  gm2 = judged(dropHeaderSuffix);
  gm3 = judged(dropRemainder);
  both = judged(dropBoth);
  inRow = judged(inRowMutant);
}, 600_000);

describe("wb-j0b: the --strict arm counts the remainder line, not the header suffix", () => {
  it("control: the real run labels exactly its seven overflowing passes and --strict exits 0 (plain stays 0)", () => {
    expect(overflowingIds(real)).toEqual(OVERFLOWING);
    expect(labelledIds(real)).toEqual(OVERFLOWING);
    expect(real.findings.map(finding => finding.id)).not.toContain("unlabeled-product-overflow");
    const plain = assess({ ...strictCalm(real), strict: false });
    expect(plain).toMatchObject({ realised: true, exitCode: 0, verdict: "within-budget" });
    const strict = assess(strictCalm(real));
    expect(strict).toMatchObject({ realised: true, exitCode: 0, verdict: "within-budget" });
    expect(strict.strictFindings ?? []).toEqual([]);
  });

  it("control: surfaceOf over the run's own projections with the real inspector reproduces every pass's surface, labels drawn", () => {
    expect(built).toHaveLength(PASS_IDS.length + 1);
    for (const id of PASS_IDS) expect(passOf(control.receipt, id).surface).toEqual(passOf(real, id).surface);
    for (const id of OVERFLOWING) {
      expect(drew(control, id, REMAINDER_LINE)).toBe(true);
      expect(drew(control, id, HEADER_SUFFIX)).toBe(true);
    }
  });

  it("GM3 (remainder line dropped, header suffix kept): no overflowing pass is labelled and --strict exits 1 as unlabeled-product-overflow", () => {
    for (const id of OVERFLOWING) {
      expect(drew(gm3, id, REMAINDER_LINE)).toBe(false);
      expect(drew(gm3, id, HEADER_SUFFIX)).toBe(true);
    }
    expect(labelledIds(gm3.receipt)).toEqual([]);
    const strict = assess(strictCalm(gm3.receipt));
    expect(strict).toMatchObject({ realised: true, exitCode: 1, verdict: "unlabeled-product-overflow" });
    expect(strict.strictFindings?.map(finding => finding.id)).toEqual(["unlabeled-product-overflow"]);
  });

  it("GM2 (header suffix dropped, remainder line kept): the remainder line alone labels all seven overflowing passes, --strict exits 0", () => {
    for (const id of OVERFLOWING) {
      expect(drew(gm2, id, HEADER_SUFFIX)).toBe(false);
      expect(drew(gm2, id, REMAINDER_LINE)).toBe(true);
    }
    expect(labelledIds(gm2.receipt)).toEqual(OVERFLOWING);
    const strict = assess(strictCalm(gm2.receipt));
    expect(strict).toMatchObject({ realised: true, exitCode: 0, verdict: "within-budget" });
    expect(strict.strictFindings ?? []).toEqual([]);
  });

  it("control: dropping both labels silences the detector, so the wrappers can reach it (--strict exits 1)", () => {
    for (const id of OVERFLOWING) {
      expect(drew(both, id, REMAINDER_LINE)).toBe(false);
      expect(drew(both, id, HEADER_SUFFIX)).toBe(false);
    }
    expect(labelledIds(both.receipt)).toEqual([]);
    expect(assess(strictCalm(both.receipt))).toMatchObject({ exitCode: 1, verdict: "unlabeled-product-overflow" });
  });

  it("a remainder phrase inside another drawn line is not a label (the line must be the whole counted remainder)", () => {
    for (const id of OVERFLOWING) {
      expect(drew(inRow, id, REMAINDER_LINE)).toBe(true);
      expect((inRow.frames.get(id) ?? []).every(lines => lines.every(line => line.endsWith(IN_ROW_PHRASE)))).toBe(true);
    }
    expect(labelledIds(inRow.receipt)).toEqual([]);
    expect(assess(strictCalm(inRow.receipt))).toMatchObject({ exitCode: 1, verdict: "unlabeled-product-overflow" });
  });
});
