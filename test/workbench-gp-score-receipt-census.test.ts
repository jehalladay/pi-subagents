/**
 * wb-0lf.5 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R9): an armed, fixture-only
 * score/receipt/mapping contract. No Pi GP decision point is shipped here. The
 * producer's Furnace program at 0f791db is design-only; the vendored GP receipt
 * is real gp sample output, while the deterministic reply below is SYNTHETIC.
 * The five A-E rows are the owner's five Acceptance clauses, verbatim. T pins
 * the trigger's present absence; Q pins named, measured quiet boundaries.
 * No native action is issued in this suite: the control adapter seam is fake.
 * Display paths added: none.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type ControlDecision, decideControl, isCoreMintedDecision, type NativeControlRequest } from "../src/workbench/control.js";
import { executeFurnaceControl, type FurnaceControlClient, FurnaceControlRefusal } from "../src/workbench/furnace-control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-0lf.5";
const TAG = "FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R9";
const EXPORT = ".beads/issues.jsonl";
const RECEIPT_FILE = "test/fixtures/gp-sample-receipt.json";
const SNAPSHOT_FILE = "test/fixtures/gp-host-adapter-snapshot.json";
const ROSTER_FILE = "test/fixtures/gp-score-receipt-roster.json";
const PI_PIN = "758ec18187a5d66ba40b766caad38754b5313558";
const PROVIDER_PIN = "0f791db71b9d";
const BUDGET_MS = 120_000;
const read = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const git = (...args: readonly string[]): string => execFileSync("git", [...args], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 25 });
const hash = (bytes: string): string => createHash("sha256").update(bytes).digest("hex");
const own = (value: unknown, key: string): unknown => typeof value === "object" && value !== null ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
const record = (value: unknown): value is Readonly<Record<string, unknown>> => typeof value === "object" && value !== null && !Array.isArray(value);
const strings = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every(entry => typeof entry === "string");
const VENDORED: unknown = JSON.parse(read(RECEIPT_FILE));
const REPLY: unknown = own(VENDORED, "receipt");
const RAW = JSON.stringify(REPLY);
const SNAPSHOT = read(SNAPSHOT_FILE);
const SUPPORT: readonly string[] = strings(own(REPLY, "candidates")) ? own(REPLY, "candidates") as readonly string[] : [];
const CHOICE = String(own(own(REPLY, "sample"), "chosen_id"));
const SCORE_WORDS: readonly string[] = strings(own(REPLY, "scores")) ? own(REPLY, "scores") as readonly string[] : [];
const SCORE_KEYS = SUPPORT.map((candidate, index) => [candidate, SCORE_WORDS[index]] as const);
const SYNTHETIC_DETERMINISTIC = { kind: "synthetic-deterministic-scores", keyedScores: SCORE_KEYS } as const;
const WS = "/work/gp-score-receipt";
const SCOPE: ObservationScope = { workspace: WS, principal: "operator" };
const RUN: NativeRef = { provider: "furnace", type: "run", id: "frn-run-score-fixture", scope: WS };
const ATTEMPT: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-score-fixture", scope: WS };
const AT = "2026-10-28T00:00:00Z";
const REQUESTED = "2026-10-28T00:00:01Z";
const DECIDED = "2026-10-28T00:00:02Z";

interface Mapping { readonly proposal: string; readonly hostAction: "stop"; readonly target: NativeRef }
interface HostRecord {
  readonly outcome: "mapped" | "refused" | "scores-only";
  /** Producer bytes, never re-serialized in the host record. */
  readonly producerReceipt?: string;
  readonly keyedScores: readonly (readonly [string, string])[];
  readonly proposal?: string;
  readonly mappedAction?: Mapping;
  readonly field?: "support" | "receipt" | "provenance";
  readonly permit?: ControlDecision;
}
interface SourceReply { readonly raw?: string; readonly parsed?: unknown; readonly scores?: readonly (readonly [string, string])[] }
interface Shape { readonly resample?: boolean; readonly recompute?: boolean; readonly argmax?: boolean; readonly nearest?: boolean; readonly trustReplay?: boolean; readonly mutateScores?: boolean }
/** A pure fixture host. It is not a GP consumer; registration stays empty until a released seam exists. */
function host(source: SourceReply, offered: readonly string[], shape: Shape = {}): HostRecord {
  const parsed = source.parsed;
  const scores = source.scores ?? (strings(own(parsed, "scores")) ? offered.map((key, index) => [key, (own(parsed, "scores") as readonly string[])[index] ?? ""] as const) : []);
  const keyedScores = shape.mutateScores ? scores.map(([key, value]) => [key, value.toUpperCase()] as const) : scores.map(([key, value]) => [key, value] as const);
  if (source.raw === undefined) return { outcome: "scores-only", keyedScores };
  if (!record(parsed) || own(parsed, "schema") !== "graphpolicy.receipt.decision.v1" || own(parsed, "kind") !== "sampled-decision") {
    return { outcome: "refused", field: "receipt", keyedScores };
  }
  const producerSupport = own(parsed, "candidates");
  const sample = own(parsed, "sample");
  if (!strings(producerSupport) || typeof own(sample, "chosen_id") !== "string" || typeof own(sample, "log_probability") !== "string") {
    return { outcome: "refused", field: "receipt", keyedScores };
  }
  const maximum = SCORE_WORDS.reduce((best, value, index) => Number.parseInt(value, 16) > Number.parseInt(SCORE_WORDS[best] ?? "", 16) ? index : best, 0);
  const proposed = shape.resample ? producerSupport[1] ?? "" : shape.argmax ? producerSupport[maximum] ?? "" : String(own(sample, "chosen_id"));
  const candidate = shape.nearest && !offered.includes(proposed) ? offered[0] ?? "" : proposed;
  if (!shape.nearest && (!producerSupport.includes(candidate) || !offered.includes(candidate))) {
    return { outcome: "refused", field: "support", keyedScores, proposal: proposed, producerReceipt: source.raw };
  }
  if (!offered.includes(candidate)) return { outcome: "refused", field: "support", keyedScores, proposal: proposed, producerReceipt: source.raw };
  const projection = new ObservationProjection();
  for (const ref of [RUN, ATTEMPT]) projection.refresh({ source: ref, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: "furnace.snapshot",
    node: { title: "synthetic run", type: "workflow", statusText: "active", statusTone: "active" } });
  projection.relate({ scope: SCOPE, from: RUN, to: ATTEMPT, kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: "frn-req-score-fixture" } });
  const request: NativeControlRequest = { scope: SCOPE, principal: { id: SCOPE.principal, role: "local-operator" },
    grants: ["observe:furnace.run.inspect", "control:furnace.stop"], target: RUN, action: "stop", params: { confirmed: true },
    invocationId: `inv-score-${candidate}`, requestedAt: REQUESTED };
  const permit = decideControl(request, { projection, now: () => DECIDED });
  if (permit.decision !== "permitted") return { outcome: "refused", field: "provenance", keyedScores, proposal: proposed, producerReceipt: source.raw };
  const maybeReplay: ControlDecision = shape.trustReplay ? JSON.parse(JSON.stringify(permit)) as ControlDecision : permit;
  if (!isCoreMintedDecision(maybeReplay)) return { outcome: "refused", field: "provenance", keyedScores, proposal: proposed, producerReceipt: source.raw };
  const retained = shape.recompute ? JSON.stringify({ ...parsed, sample: { ...record(sample) ? sample : {}, log_probability: "00000000" } }) : source.raw;
  return { outcome: "mapped", keyedScores, proposal: proposed, mappedAction: { proposal: candidate, hostAction: "stop", target: RUN }, producerReceipt: retained, permit: maybeReplay };
}
const SOURCE = { raw: RAW, parsed: REPLY, scores: SCORE_KEYS };
const OK = host(SOURCE, SUPPORT);
const altered = (choice: string): SourceReply => ({ raw: RAW, parsed: { ...record(REPLY) ? REPLY : {}, sample: { ...record(own(REPLY, "sample")) ? own(REPLY, "sample") as Readonly<Record<string, unknown>> : {}, chosen_id: choice } }, scores: SCORE_KEYS });
const UNKNOWN = "exec-outside-export";
const REPLAY = host(SOURCE, SUPPORT, { trustReplay: true });
const WRONG = host(altered(UNKNOWN), SUPPORT);
const MUTANTS = {
  "M-RESAMPLE": host(SOURCE, SUPPORT, { resample: true }),
  "M-ARGMAX": host(altered(SUPPORT[1] ?? ""), SUPPORT, { argmax: true }),
  "M-RECOMPUTE": host(SOURCE, SUPPORT, { recompute: true }),
  "M-NEAREST": host(altered(UNKNOWN), SUPPORT, { nearest: true }),
  "M-REPLAY": REPLAY,
  "M-SCORES": host({ scores: SYNTHETIC_DETERMINISTIC.keyedScores }, SUPPORT, { mutateScores: true }),
} as const;

interface Row { readonly id: string; readonly label: string; readonly pins: readonly string[] }
const QUOTES: Readonly<Record<string, string>> = {
  T1: "When Pi consumes GP scores",
  A1: "a fixture stochastic reply round-trips through the host with support order and log probability byte-identical in the receipt",
  A2: "(no renormalization, no re-sampling, no host-side argmax over scores)",
  B1: "a deterministic reply records keyed scores verbatim",
  C1: "the mapped host action is recorded as a separate field beside the symbolic proposal",
  D1: "a proposal naming an action outside the exported support is refused, never mapped by nearest match",
  E1: "a receipt replayed from the audit never issues a verb (wb-pjj look-alike test pattern)",
  Q1: "R-OTHER-REPLY",
  Q2: "R-MISSING-SEAM",
};
const ROWS: readonly Row[] = [
  { id: "T", label: "When Pi consumes GP scores", pins: ["T1"] },
  { id: "A", label: "a fixture stochastic reply round-trips through the host with support order and log probability byte-identical in the receipt (no renormalization, no re-sampling, no host-side argmax over scores)", pins: ["A1", "A2"] },
  { id: "B", label: "a deterministic reply records keyed scores verbatim", pins: ["B1"] },
  { id: "C", label: "the mapped host action is recorded as a separate field beside the symbolic proposal", pins: ["C1"] },
  { id: "D", label: "a proposal naming an action outside the exported support is refused, never mapped by nearest match", pins: ["D1"] },
  { id: "E", label: "a receipt replayed from the audit never issues a verb (wb-pjj look-alike test pattern)", pins: ["E1"] },
  { id: "Q", label: "named residual quiet boundaries", pins: ["Q1", "Q2"] },
];
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  Q1: ["gp eval output has no sampled-decision receipt and the synthetic deterministic scores are not gp output"],
  Q2: ["no Pi GP decision point or production mapping exists; this census arms a fixture-only contract"],
};
const GP_TOKENS = ["GraphPolicyCLI", "GraphDataIR", "graphpolicy.receipt.decision.v1", "sampled-decision", "log_probabilities", "log_probability", "chosen_id"] as const;
const token = (word: string): RegExp => new RegExp(`(?<![A-Za-z0-9_$])${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![A-Za-z0-9_$])`);
const named = (text: string): string[] => GP_TOKENS.filter(word => token(word).test(text));
const SRC_BINDINGS: readonly string[] = [];
function sources(): readonly string[] {
  return [...new Set(git("ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src").split("\0").filter(path => path !== "" && existsSync(join(ROOT, path))))].sort();
}
/** A fake with an observable call count; malformed replay must refuse before it sees client methods. */
function fakeClient(): { readonly client: FurnaceControlClient; readonly calls: () => number } {
  let calls = 0;
  const answer = async (): Promise<never> => { calls += 1; throw Error("fake effect was issued"); };
  const client = { runs: { pause: answer, stop: answer, resume: answer }, attempts: { stop: answer } } as unknown as FurnaceControlClient;
  return { client, calls: () => calls };
}
const CASES: Readonly<Record<string, () => unknown>> = {
  T1: () => {
    const paths = sources();
    const hits = paths.flatMap(path => { const names = named(read(path)); return names.length ? [`${path}: ${names.join(", ")}`] : []; });
    const control = named(`// GraphPolicyCLI GraphDataIR ${GP_TOKENS.slice(2).join(" ")}`);
    const quiet = named("// graphpolicycli graphdatair log_probability_value chosen_ids");
    expect(paths.length).toBeGreaterThan(100);
    expect(hits).toEqual(SRC_BINDINGS);
    expect(control).toEqual([...GP_TOKENS]);
    expect(quiet).toEqual([]);
    return { hits, bound: SRC_BINDINGS, countFloor: paths.length >= 100, control, quiet };
  },
  A1: () => {
    const after: unknown = JSON.parse(OK.producerReceipt ?? "null");
    expect(OK.producerReceipt).toBe(RAW);
    expect(own(after, "candidates")).toStrictEqual(SUPPORT);
    expect(own(after, "support_order")).toBe(own(REPLY, "support_order"));
    expect(own(own(after, "sample"), "log_probability")).toBe(own(own(REPLY, "sample"), "log_probability"));
    expect(own(after, "probabilities")).toStrictEqual(own(REPLY, "probabilities"));
    return { rawSame: OK.producerReceipt === RAW, support: own(after, "candidates"), supportOrder: own(after, "support_order"), logProbability: own(own(after, "sample"), "log_probability") };
  },
  A2: () => {
    const kinds = ["M-RESAMPLE", "M-ARGMAX", "M-RECOMPUTE"] as const;
    const changed = kinds.map(kind => ({ kind, same: MUTANTS[kind].producerReceipt === RAW, proposal: MUTANTS[kind].proposal }));
    expect(OK.proposal).toBe(CHOICE);
    expect(changed.find(item => item.kind === "M-RESAMPLE")?.proposal).not.toBe(CHOICE);
    expect(changed.find(item => item.kind === "M-ARGMAX")?.proposal).not.toBe(SUPPORT[1]);
    expect(changed.find(item => item.kind === "M-RECOMPUTE")?.same).toBe(false);
    return { original: OK.proposal, changed };
  },
  B1: () => {
    const result = host({ scores: SYNTHETIC_DETERMINISTIC.keyedScores }, SUPPORT);
    expect(result).toStrictEqual({ outcome: "scores-only", keyedScores: SCORE_KEYS });
    expect(MUTANTS["M-SCORES"].keyedScores).not.toStrictEqual(SCORE_KEYS);
    return { kind: SYNTHETIC_DETERMINISTIC.kind, result, mutated: MUTANTS["M-SCORES"].keyedScores };
  },
  C1: () => {
    expect(OK.outcome).toBe("mapped");
    expect(OK.proposal).toBe(CHOICE);
    expect(OK.mappedAction).toStrictEqual({ proposal: CHOICE, hostAction: "stop", target: RUN });
    expect(OK.permit !== undefined && isCoreMintedDecision(OK.permit)).toBe(true);
    return { proposal: OK.proposal, mappedAction: OK.mappedAction, permit: OK.permit?.decision };
  },
  D1: () => {
    expect(WRONG.outcome).toBe("refused");
    expect(WRONG.field).toBe("support");
    expect(WRONG.mappedAction).toBeUndefined();
    expect(MUTANTS["M-NEAREST"].outcome).toBe("mapped");
    return { wrong: { outcome: WRONG.outcome, field: WRONG.field, proposal: WRONG.proposal }, nearest: MUTANTS["M-NEAREST"].mappedAction };
  },
  E1: async () => {
    const original = OK.permit;
    expect(original !== undefined && isCoreMintedDecision(original)).toBe(true);
    const copy: ControlDecision = JSON.parse(JSON.stringify(original)) as ControlDecision;
    expect(isCoreMintedDecision(copy)).toBe(false);
    const fake = fakeClient();
    let refusal: string | undefined;
    try {
      await executeFurnaceControl(copy, { client: fake.client, workspaceRoot: WS, now: () => AT, timeoutMs: 1000 });
    } catch (error) {
      expect(error).toBeInstanceOf(FurnaceControlRefusal);
      refusal = error instanceof FurnaceControlRefusal ? error.refusal : undefined;
    }
    expect(refusal).toBe("unvetted-decision");
    expect(fake.calls()).toBe(0);
    expect(REPLAY.outcome).toBe("refused");
    return { minted: false, refusal, issued: fake.calls(), replay: REPLAY.outcome };
  },
  Q1: () => {
    const deterministic = host({ scores: SCORE_KEYS }, SUPPORT);
    expect(deterministic.outcome).toBe("scores-only");
    expect(deterministic.producerReceipt).toBeUndefined();
    return { deterministic: deterministic.outcome, receipt: deterministic.producerReceipt ?? null };
  },
  Q2: () => {
    const names = sources().flatMap(path => named(read(path)));
    expect(names).toEqual([]);
    expect(SRC_BINDINGS).toEqual([]);
    return { sourceNames: names, bound: SRC_BINDINGS };
  },
};
interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly witnesses: Readonly<Record<string, unknown>>;
  readonly tests: readonly string[];
}
const ROSTER = JSON.parse(read(ROSTER_FILE)) as Roster;
const REACHED: { readonly pin: string; readonly same: boolean }[] = [];
function trackerRow(): { readonly title: string; readonly notes: string } | undefined {
  for (const line of read(EXPORT).split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const parsed: unknown = JSON.parse(line);
    if (own(parsed, "id") === BEAD && typeof own(parsed, "title") === "string") {
      return { title: String(own(parsed, "title")), notes: String(own(parsed, "notes") ?? "") };
    }
  }
  return undefined;
}
/** Only the original filing line counts: later bead notes may not redefine the requirement. */
const filing = (notes: string): string => notes.split("\n").find(line => line.startsWith("Citation: ")) ?? "";
const clauses = (line: string): string[] => {
  const found = /(?:^|\. )Acceptance: (.*?)\. Consolidation candidate/.exec(line)?.[1] ?? "";
  return found === "" ? [] : found.split("; ");
};
const suite = `GP score receipt census (${BEAD})`;
describe(suite, () => {
  for (const row of ROWS) for (const pin of row.pins) {
    it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: BUDGET_MS }, async () => {
      const witness = await CASES[pin]?.();
      expect(witness, `${pin} has an executable case`).toBeDefined();
      const expected = ROSTER.witnesses[pin];
      REACHED.push({ pin, same: JSON.stringify(witness) === JSON.stringify(expected) });
      expect(witness, `${pin}'s witness matches the roster`).toStrictEqual(expected);
    });
  }
  it("rule 16: rows, quotes, residuals, source bindings and mutant names have the frozen measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:1", "A:2", "B:1", "C:1", "D:1", "E:1", "Q:2"]);
    expect(Object.keys(QUOTES)).toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(CASES)).toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.entries(RESIDUALS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:1", "Q2:1"]);
    expect(Object.keys(MUTANTS)).toEqual(["M-RESAMPLE", "M-ARGMAX", "M-RECOMPUTE", "M-NEAREST", "M-REPLAY", "M-SCORES"]);
    expect(SRC_BINDINGS).toEqual([]);
    expect(GP_TOKENS).toEqual(["GraphPolicyCLI", "GraphDataIR", "graphpolicy.receipt.decision.v1", "sampled-decision", "log_probabilities", "log_probability", "chosen_id"]);
  });
  it("outside anchors: owner filing, producer receipt, snapshot and control pin bind every acceptance row", () => {
    const row = trackerRow();
    expect(row).toBeDefined();
    const title = row?.title ?? "";
    const prefix = `[${TAG}] ${ROWS[0]?.label ?? ""} (artifact:`;
    expect(title.startsWith(prefix)).toBe(true);
    const citation = filing(row?.notes ?? "");
    expect(clauses(citation)).toEqual(ROWS.filter(entry => "ABCDE".includes(entry.id)).map(entry => entry.label));
    expect(filing(`${row?.notes ?? ""}\nCitation: forgery. Acceptance: no.`)).toBe(citation);
    expect(citation).toContain(`decisions:8@${PROVIDER_PIN}`);
    expect(citation).toContain(`README.md:11,:25@${PROVIDER_PIN}`);
    expect(citation).toContain("Design-only; no Pi surface named");
    for (const judged of ROWS.filter(entry => entry.id !== "Q")) {
      const quotes = judged.pins.map(pin => QUOTES[pin] ?? "");
      expect(quotes.join(judged.id === "A" ? " " : ""), `${judged.id} has its exact filing words`).toBe(judged.label);
    }
    expect(git("show", `${PI_PIN}:src/workbench/control.ts`).split("\n")[16]).toContain("exact-grant+confirmed-owner+operator-confirmed");
    expect(git("show", `${PI_PIN}:src/workbench/control.ts`).split("\n")[209]).toContain("export function decideControl(");
    expect(git("show", `${PI_PIN}:src/workbench/control.ts`).split("\n")[254]).toContain("export function isCoreMintedDecision(");
    expect(hash(SNAPSHOT)).toBe(String(own(REPLY, "graph_digest")).replace(/^sha256:/, ""));
    expect(own(REPLY, "schema")).toBe("graphpolicy.receipt.decision.v1");
    expect(own(REPLY, "kind")).toBe("sampled-decision");
    expect(SCORE_WORDS.length).toBe(SUPPORT.length);
    expect(SUPPORT.includes(CHOICE)).toBe(true);
    const generator = own(VENDORED, "generator");
    expect(own(generator, "sourceSha")).toBe("3f7d52cd17397d8ed22e2c768714a057fe098b62");
    expect(own(own(VENDORED, "validation"), "valid")).toBe(true);
    expect(own(own(REPLY, "sample"), "log_probability"), "sample log probability is the producer validation word").toBe(own(own(own(VENDORED, "validation"), "recompute"), "recorded"));
    expect(read("src/workbench/control.ts").includes(`export const CONTROL_PERMIT_POLICY = "${git("show", `${PI_PIN}:src/workbench/control.ts`).split("\n")[16]?.split("\"")[1] ?? ""}";`), "the exact-grant policy at the Pi pin remains in the control core").toBe(true);
  });
  it("roster: every judged pin and registered test ran, and every witness was compared", ({ task }) => {
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROWS).toStrictEqual(ROSTER.rows);
    expect(QUOTES).toStrictEqual(ROSTER.quotes);
    expect(RESIDUALS).toStrictEqual(ROSTER.residuals);
    expect(Object.keys(ROSTER.witnesses)).toEqual(ROWS.flatMap(row => row.pins));
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(walked.map(entry => entry.name)).toEqual(ROSTER.tests);
    expect(walked.findIndex(entry => entry.self)).toBe(walked.length - 1);
    expect(walked.filter(entry => !entry.self && (entry.mode !== "run" || entry.fails || !["pass", "fail"].includes(entry.state ?? "")))).toEqual([]);
    expect(REACHED.map(entry => entry.pin)).toEqual(ROWS.flatMap(row => row.pins));
    expect(REACHED.filter(entry => !entry.same)).toEqual([]);
  });
});
