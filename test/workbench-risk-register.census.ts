/**
 * wb-cax.26 (W22/docs-18): census falsifier for docs/workbench/18-decisions-and-risks.md "Key risks and mitigations",
 * a census leg of the wb-nl8 census tier (vitest.census.config.ts, include test/**\/*.census.ts) judged in wb-u62 REPORT
 * MODE. It is a member of the sequenced census class (owner program ruling 2026-10-16 12:22Z; both blockers wb-u62 and
 * wb-nl8 landed): ONE post-nl8 adoption cut, judge(.forge/vitest-report.json, pins) from the shared helper
 * test/helpers/census.ts, never the executing mode at the default tier and no bare-text title scanning.
 *
 * The register is a thirteen-row table (Risk | Impact | Mitigation and test). docs/workbench/14 "Truth labels and release
 * gates" requires that each major work package carry a falsifier, a negative test that fails if a critical guarantee is
 * quietly weakened. This leg binds every row's mitigation clause to the existing case that embodies it, by file, verbatim
 * title and tier, or records the clause as UNPINNED with a reason. It executes no pinned case and no test run: judge()
 * reads vitest's own JSON report of the default gate's test step (DEFAULT_TIER_REPORT, written by `npm run test` before
 * the census step runs), so a pinned case counts only when the gate's own run collected it exactly once (under its bound
 * describe path where a row binds one), recorded it passed, and its body asserts: the helper's three legs, fail-closed. A
 * renamed, deleted, duplicated, skipped, todo, inverted, excluded or unregistered pinned case therefore reads red, naming
 * the row, the half, the file, the title and the cause, as far as the helper's resolvable-construct roster and its named
 * residuals reach (test/helpers/census.ts, receipts/wb-u62.md). This leg scans no test source for case calls itself.
 *
 * The docs pin reads the RENDERED view through the helper's docsSection / sectionMatches: the section under the unique
 * level-2 heading of the level-1 parent heading, bounded at the next level-1/2 heading or EOF, must render as exactly the
 * frozen table (header, every Risk, Impact and Mitigation cell). A dropped or reworded cell names its risk. The docs drift
 * falsifiers run over a SYNTHETIC document built from the frozen cells, never over the live docs/18 text, so a legitimate
 * edit of an unpinned section (deferred decisions, revisit criteria) can never redden a falsifier row.
 *
 * FROZEN SHAPE (owner standing order 2026-10-18T18:14:19Z, rule 16): the census pins its own row/half/pin shape as an
 * AC1 literal (FROZEN_SHAPE): per half, the pin count, a digest of every pinned (file, title) and the length of the
 * clause the half answers. Deleting a pin, swapping a pin for an unrelated passing case, renaming a pinned title in the
 * table or shortening a requirement clause therefore reds the census.
 *
 * Tiers: a half's tier names the report that vouches for it. The default report vouches for the default gate's test
 * tier only; judge() refuses a pin of any other tier (tier-mismatch, R2 = (i)), so this leg never reports a live, native
 * or scale pass from a title's presence. The one native-read case (risk 10, native-rf-preview, run from
 * vitest.rf.config.ts against a real initialized workspace) is RECORDED with its tier and checked at FILE level only. The
 * bench-receipt half of risk 7 (the reducer-selector-bench command) is RECORDED as unpinned: its receipt is a separate
 * forge.toml command that is not in the gate list, and no title's presence stands in for it. NAMED RESIDUAL NATIVE-TITLE:
 * whether the native-read case's title is still registered is judged by no report this leg reads, and the leg says so.
 *
 * Non-scope: no behaviour test for an unpinned half is added here; each is listed with its reason for groom follow-up.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

type Tier = "default-gate" | "native-read" | "bench-receipt";
interface Pin {
  readonly file: string;
  readonly title: string;
  /** The exact enclosing describe path, outermost first, where the row binds a describe as well as its case. */
  readonly suite?: readonly string[];
  /** An it.each template pin: the call site registers each table row exactly once, at least this many. */
  readonly each?: number;
}
interface Half {
  /** The part of the row's mitigation this half answers. */
  readonly id: string;
  /** The clause of the Mitigation and test cell this half answers, verbatim (an exact substring of the cell). */
  readonly clause: string;
  readonly tier: Tier;
  readonly pins: readonly Pin[];
  /** Why no landed case binds this half; an unpinned half is never counted as covered. */
  readonly reason?: string;
}
interface RegisterRow {
  readonly risk: string;
  readonly impact: string;
  readonly mitigation: string;
}
interface Row extends RegisterRow {
  readonly row: string;
  readonly halves: readonly Half[];
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-risk-register.census.ts";
const DOCS_FILE = "docs/workbench/18-decisions-and-risks.md";
const DOCS_PARENT = "18 — Decisions, risks, deliberate defaults and re-evaluation triggers";
const SECTION = "Key risks and mitigations";
const NATIVE_FILE = "test/workbench-native-rf-preview.test.ts";

/** The thirteen frozen docs/18 rows, cell by cell as the markdown source says them. */
const REGISTER: readonly RegisterRow[] = [
  { risk: "Claude Agent SDK versions/messages evolve", impact: "lost session/tool/usage semantics", mitigation: "pin SDK; explicit message discriminant conformance; diagnostic on unknown" },
  { risk: "Pi extension API diverges from upstream", impact: "runtime/UI breakage", mitigation: "snapshot versions, overlay/command tests, upstream sync gate" },
  { risk: "Claude script language and fork drift", impact: "existing workflows break", mitigation: "unchanged real golden fixtures and documented parity deviations" },
  { risk: "VM escape into host", impact: "credential/data exposure", mitigation: "separate process isolation for untrusted source; host-side authorization and no secret injection" },
  { risk: "Effectful node replay duplicates work", impact: "duplicate Furnace Run/edit", mitigation: "native reconciliation, uncertain effect, no blanket retries" },
  { risk: "Source graph conflated with trace", impact: "misleading causality", mitigation: "provenance labels and unknown edges, distinguish declared/observed/inferred" },
  { risk: "UI recomputes full logs at scale", impact: "terminal lag and CPU", mitigation: "incremental indexes, viewport, coalesced render and benchmark" },
  { risk: "Interpreting provider statuses uniformly", impact: "false verified candidate", mitigation: "source-specific types and evidence, negative test" },
  { risk: "Furnace nested work capacity deadlock", impact: "stalled swarms", mitigation: "native scheduling/await policy; admission test" },
  { risk: "No RF typed render SDK in pinned revision", impact: "weak integration", mitigation: "explicit unavailable block, provider-owned SDK improvement" },
  { risk: "Detached mode confused with durability", impact: "silent loss after crash", mitigation: "explicit host guarantees and tests" },
  { risk: "Cross-scope observation leak", impact: "secret/unowned operation data", mitigation: "scope-aware provider read ACL and payload redaction" },
  { risk: "Upstream fork history accidentally rewritten", impact: "licensing/maintenance loss", mitigation: "preserve fork history/MIT, deliberate small commits" },
];
const HEADER = ["Risk", "Impact", "Mitigation and test"] as const;

const T = (name: string): string => `test/workbench-${name}.test.ts`;
const pin = (file: string, title: string, extra: { readonly suite?: readonly string[]; readonly each?: number } = {}): Pin => ({ file, title, ...extra });
const wb = (name: string, title: string, extra: { readonly suite?: readonly string[]; readonly each?: number } = {}): Pin => pin(T(name), title, extra);
const gate = (id: string, clause: string, pins: readonly Pin[]): Half => ({ id, clause, tier: "default-gate", pins });
const unpinned = (id: string, clause: string, reason: string, tier: Tier = "default-gate"): Half => ({ id, clause, tier, pins: [], reason });

const SECURITY = "test/workbench-security-workflow.test.ts";
const BACKEND_SUITE = ["dual-backend golden equivalence (fixture pass, not live SDK)", "documented first-cut degradation (pin-flip oracle: wb-a2g.11)"] as const;

/** Freezes the table and everything it holds, so no row, half or pin can be edited at runtime. */
function freezeDeep<V>(value: V): V {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) freezeDeep(child);
    Object.freeze(value);
  }
  return value;
}

function isDeepFrozen(value: unknown): boolean {
  if (value === null || typeof value !== "object") return true;
  return Object.isFrozen(value) && Object.values(value).every(isDeepFrozen);
}

const register = (n: number): RegisterRow => REGISTER[n - 1] ?? { risk: "", impact: "", mitigation: "" };
const row = (n: number, halves: readonly Half[]): Row => ({ row: `K${String(n).padStart(2, "0")}`, ...register(n), halves });

const TABLE: readonly Row[] = freezeDeep<readonly Row[]>([
  row(1, [
    gate("discriminant-conformance-and-unknown-diagnostic", "explicit message discriminant conformance; diagnostic on unknown", [
      wb("claude-topology", "classifies a terminal or tool state outside the native vocabulary as unknown and quotes it sanitized"),
      wb("claude-observer", "partial stream %s is unknown observation lost, not successful terminal", { each: 2 }),
    ]),
    gate("pin-sdk", "pin SDK", [
      wb("dependency-census", "drift guard: the live tree matches the recorded census"),
      wb("dependency-census", "F2: bumping a package.json pin without regenerating the fixture names that row"),
    ]),
  ]),
  row(2, [
    gate("overlay-and-command-tests", "overlay/command tests", [
      wb("ui-contract", "shows the native operation in keyboard-navigable inspector with source basis"),
      pin("test/workflow-command.test.ts", "registers no top-level /workflows command"),
      wb("surface-census", "commands, flags and lifecycle handlers are identical across A-D and pinned"),
    ]),
    unpinned(
      "snapshot-versions-and-upstream-sync-gate",
      "snapshot versions, overlay/command tests, upstream sync gate",
      "No landed case snapshots Pi versions or runs an upstream sync gate: the registered Pi surface census (wb-cax.4, landed) counts registered tools, commands, flags and handlers and pins them across the modes, which is the overlay/command half pinned above, not a version snapshot and not a sync gate. A seat that lands such a case flips this half to a pin consciously.",
    ),
  ]),
  row(3, [
    gate("golden-fixtures", "unchanged real golden fixtures", [
      pin("test/workflow-claude-code-compat.test.ts", "runs the canonical review-changes example"),
      pin("test/workflow-claude-code-compat.test.ts", "runs the loop-until-budget and static-scaling patterns as written"),
      pin("test/workflow-examples.test.ts", "fan-out-audit returns one verified finding per discovered file"),
    ]),
    gate("documented-parity-deviations", "documented parity deviations", [
      pin("test/workflow-examples-claude-backend.test.ts", "gated-fix.js completes under the stub host but is refused at the call under the Claude host", { suite: BACKEND_SUITE }),
    ]),
  ]),
  row(4, [
    gate("realm-escape-probes", "VM escape into host", [
      pin(SECURITY, "caught Function escape probes are realm EvalErrors and never reveal the canary"),
      pin(SECURITY, "every injected callable, returned promise and caught error stays in the VM realm"),
    ]),
    gate("host-side-authorization", "host-side authorization", [
      pin(SECURITY, "node() refuses grant/identity options before dispatching to a host capability"),
      wb("security-capability", "hostile caller-added outer identity/grants never reach provider; inner authority fields are refused"),
      wb("sandbox-rpc-census", "R4 a crafted node RPC for a registered but UNGRANTED capability is denied host-side (policy after RPC, not tool-name hiding)"),
    ]),
    gate("no-secret-injection-worker-env", "no secret injection", [wb("env-scrub-census", "the Worker env option is an explicit plain object with ZERO names (owner seam rule 1)")]),
    unpinned(
      "host-closure-env-canary",
      "no secret injection",
      `The host-closure Function escape canary in ${SECURITY} is held as it.fails (a known widening, never a pin and never a pass), so no passing case proves a host closure cannot reveal an environment variable. The worker-env pin above measures the environment handed to the interpreter Worker only.`,
    ),
    unpinned(
      "separate-process-isolation",
      "separate process isolation for untrusted source",
      "WB-022 credential isolation is not complete: the interpreter runs on a worker thread, not in a separate OS process (the sandbox RPC census states the isolation tier), and the owner bead wb-ksz stays open. Not counted as passed.",
    ),
  ]),
  row(5, [
    gate("reconciliation-and-uncertain-effect", "native reconciliation, uncertain effect, no blanket retries", [
      pin("test/workflow-effect-replay.test.ts", "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect"),
      wb("furnace-hosted", "treats a timed-out or unreadable start as uncertain, closes the host, and refuses a blind second start"),
    ]),
  ]),
  row(6, [
    gate("provenance-labels-and-unknown-edges", "provenance labels and unknown edges, distinguish declared/observed/inferred", [
      wb("topology-slice", "separates declared dependency, observed causal, native-confirmed ownership, grouping and inferred hypothesis"),
      wb("topology-slice", "reports an unknown endpoint, an unknown relation kind and an unprovenanced edge as references with no invented fields"),
    ]),
  ]),
  row(7, [
    gate("incremental-indexes-and-viewport", "incremental indexes, viewport", [wb("observation-perf", "retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history")]),
    unpinned("coalesced-render", "coalesced render", "No landed case asserts coalesced rendering: no test names coalescing. Not counted as passed."),
    gate("benchmark-fixture-case", "benchmark", [wb("reducer-selector-bench", "records a full fold per redraw as a finding with exit 1, never tuned away")]),
    unpinned(
      "benchmark-receipt",
      "benchmark",
      "The pinned reducer-selector-bench case runs a fixture in the DEFAULT gate; the benchmark receipt is the separate forge.toml command reducer-selector-bench, which is not in the gate list. No receipt is claimed from a title being present. Not counted as passed.",
      "bench-receipt",
    ),
  ]),
  row(8, [
    gate("source-specific-types-and-negative-test", "source-specific types and evidence, negative test", [
      wb("forge-observer", "F2: a current failed gate stays failed despite transport success, and current success is success"),
      wb("hyperunix-observer", 'H2: across all 13 kinds x both licences success appears only with complete coverage and nothing claims "verified"'),
      wb("inspector", "status success and missing evidence does not become Verified"),
    ]),
  ]),
  row(9, [
    gate("registry-wide-admission", "admission test", [wb("registry-admission", "refuses unknown, unauthorized, invalid and pre-cancelled requests before admission, even while saturated")]),
    unpinned(
      "native-scheduling-await-policy",
      "native scheduling/await policy",
      "The pin is registry-wide admission, not Furnace slots with parents awaiting children. The native scheduling/await half has no deterministic case: W09/W18 scope. Not counted as passed.",
    ),
  ]),
  row(10, [
    gate("fixture-seam-is-not-a-render", "explicit unavailable block", [wb("reactivefiber-observer", "R2: an injected-fixture seam is labelled as such and is never reported as a live, complete or successful render")]),
    // Recorded, never judged: excluded from the default include, run from vitest.rf.config.ts against a real
    // initialized workspace (forge.toml rf-preview). This leg never reports it as passing.
    { id: "native-preview", clause: "explicit unavailable block", tier: "native-read", pins: [wb("native-rf-preview", "returns noncommitted text and graph provenance with no durable render ID")] },
    unpinned(
      "sdk-absent-unavailable-block",
      "explicit unavailable block",
      "No deterministic default-gate case asserts an explicit unavailable block when the typed render SDK is absent; the native-rf-preview case is an environment-gated native-read case about a noncommitted render and is recorded above, not judged. Not counted as passed.",
    ),
    unpinned("provider-owned-sdk-improvement", "provider-owned SDK improvement", "Provider-owned work in another repository, not a test in this one. Not counted as passed."),
  ]),
  row(11, [
    gate("host-guarantees", "explicit host guarantees and tests", [
      wb("furnace-hosted", "states the resident session's own observe word (unknown for a never-admitted id) and the missing durability honestly"),
      wb("furnace-hosted", "advertises exactly the nine DurabilityProfile members on the wire, every one false, beside the receipt's crashDurability none"),
      wb("detached-faults-receipt", "flags terminal completed or failed after a crash, or a result on an unknown, as fabricated-terminal"),
    ]),
  ]),
  row(12, [
    gate("scope-aware-read-acl-and-redaction", "scope-aware provider read ACL and payload redaction", [
      wb("observation", "bounds event, node and edge capacity, keeps payload references instead of bodies, and denies cross-scope queries"),
      wb("topology-slice", "never reads another tenant's relations and refuses a focus key outside the caller scope"),
      wb("evidence-loader", "refuses a cross-scope ref as unauthorized without invoking any loader"),
      wb("security-capability", "redacts key-named and JSON-quoted secrets through invoke, inspect and error results"),
    ]),
  ]),
  row(13, [
    gate("mit-and-fork-origin-records", "preserve fork history/MIT", [
      wb("license-origin", "passes against the committed tree"),
      wb("release-provenance", "LICENSE is byte-identical to the baseline commit's LICENSE"),
      wb("release-provenance", "the baseline commit's LICENSE is the pinned blob"),
    ]),
    unpinned(
      "deliberate-small-commits",
      "deliberate small commits",
      "A commit-size and review practice enforced by the code-review process, not a deterministic vitest case: no landed case measures commit size. Not counted as passed.",
    ),
  ]),
]);

const ROW_IDS: readonly string[] = ["K01", "K02", "K03", "K04", "K05", "K06", "K07", "K08", "K09", "K10", "K11", "K12", "K13"];
/** Every half that has no landed case, as "row/half"; a seat that lands a case flips the half consciously and edits this list. */
const UNPINNED_HALVES: readonly string[] = [
  "K02/snapshot-versions-and-upstream-sync-gate",
  "K04/host-closure-env-canary",
  "K04/separate-process-isolation",
  "K07/coalesced-render",
  "K07/benchmark-receipt",
  "K09/native-scheduling-await-policy",
  "K10/sdk-absent-unavailable-block",
  "K10/provider-owned-sdk-improvement",
  "K13/deliberate-small-commits",
];

/** The frozen docs/18 table, one cell run per row, as a reader sees it. */
const renderedTable = (rows: readonly RegisterRow[]): string => [...HEADER, ...rows.flatMap(entry => [entry.risk, entry.impact, entry.mitigation])].join(" ");
const sectionBlocks = (rows: readonly RegisterRow[]): readonly RenderedBlock[] => [{ kind: "other", type: "table", text: renderedTable(rows) }];

/** A digest of one pinned (file, title), so a swapped or renamed pin changes the frozen-shape literal. */
const pinDigest = (entry: Pin): string => createHash("sha256").update(`${entry.file}\n${entry.title}`).digest("hex").slice(0, 8);
/** One line per half: "row/half:pinCount:clauseLength:pinDigests", the AC1 frozen-shape literal's unit (rule 16). */
const shapeOf = (rows: readonly Row[]): string[] => rows.flatMap(entry => entry.halves.map(half => `${entry.row}/${half.id}:${half.pins.length}:${half.clause.length}:${half.pins.map(pinDigest).join(",")}`));

const FROZEN_SHAPE: readonly string[] = [
  "K01/discriminant-conformance-and-unknown-diagnostic:2:64:c64e656b,a174e46c",
  "K01/pin-sdk:2:7:1561b0d0,5e2390ce",
  "K02/overlay-and-command-tests:3:21:1569fb65,6c4b32b0,4276767c",
  "K02/snapshot-versions-and-upstream-sync-gate:0:60:",
  "K03/golden-fixtures:3:30:d5e34920,56442ad5,9c0c86e1",
  "K03/documented-parity-deviations:1:28:de43c509",
  "K04/realm-escape-probes:2:19:041ebf2b,047816ad",
  "K04/host-side-authorization:3:23:0654259d,3cb102fb,3e389789",
  "K04/no-secret-injection-worker-env:1:19:bffba62e",
  "K04/host-closure-env-canary:0:19:",
  "K04/separate-process-isolation:0:47:",
  "K05/reconciliation-and-uncertain-effect:2:59:ae8a4083,fe64267b",
  "K06/provenance-labels-and-unknown-edges:2:75:a762a415,4f8c2b2d",
  "K07/incremental-indexes-and-viewport:1:29:01423eb3",
  "K07/coalesced-render:0:16:",
  "K07/benchmark-fixture-case:1:9:d73c0691",
  "K07/benchmark-receipt:0:9:",
  "K08/source-specific-types-and-negative-test:3:49:cb03487b,0daa0f6a,260e5093",
  "K09/registry-wide-admission:1:14:51adf647",
  "K09/native-scheduling-await-policy:0:30:",
  "K10/fixture-seam-is-not-a-render:1:26:2e695e8c",
  "K10/native-preview:1:26:702a8802",
  "K10/sdk-absent-unavailable-block:0:26:",
  "K10/provider-owned-sdk-improvement:0:30:",
  "K11/host-guarantees:3:34:d2ab6e7c,f7414825,8832b705",
  "K12/scope-aware-read-acl-and-redaction:4:51:f30531db,fa762698,3ae4d054,e4e269ee",
  "K13/mit-and-fork-origin-records:3:25:4d70f65a,358d72a8,95ab3755",
  "K13/deliberate-small-commits:0:24:",
];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

/** The forge.toml command whose own run must vouch for a half; a native-read label names no report this leg reads. */
const tierCommand = (tier: Tier): string => (tier === "default-gate" ? DEFAULT_GATE_TIER : tier);
const casePin = (half: Half, entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: tierCommand(half.tier), ...(entry.suite === undefined ? {} : { suite: entry.suite }), ...(entry.each === undefined ? {} : { each: { minCases: entry.each } }) });

/** The default-gate halves that hold pins, in table order, for the row-level judging. */
const JUDGED = TABLE.flatMap(entry => entry.halves.filter(half => half.tier === "default-gate" && half.pins.length > 0).map(half => ({ row: entry, half })));
const NATIVE = TABLE.flatMap(entry => entry.halves.filter(half => half.tier === "native-read").map(half => ({ row: entry, half })));

/** One line per pin that is not ok, naming the row and the half; the helper's why names the file, title, tier and cause. */
const failures = (entry: Row, half: Half, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${entry.row}/${half.id}: ${verdict.code}: ${verdict.why}`);

/**
 * Every docs drift, each naming the risk or the section it breaks. The per-row checks read the section's rendered text and
 * run independently of the exactness check, so a dropped or reworded cell names its risk.
 */
function docsFailures(markdown: string, rows: readonly RegisterRow[] = REGISTER): string[] {
  const section = docsSection(markdown, SECTION, 2, [DOCS_PARENT]);
  if (!section.ok) return [`${DOCS_FILE} § ${SECTION}: the section is refused: ${section.why}`];
  const out: string[] = [];
  const text = section.blocks.map(block => (block.kind === "other" ? block.text : "")).join(" ");
  for (const [index, entry] of rows.entries()) {
    if (!text.includes(`${entry.risk} ${entry.impact} ${entry.mitigation}`)) out.push(`risk ${index + 1} (${entry.risk}): its row no longer renders in ${DOCS_FILE} § ${SECTION}`);
  }
  const exact = sectionMatches(section, sectionBlocks(rows));
  if (!exact.ok) out.push(`${DOCS_FILE} § ${SECTION} is not exactly its frozen table: ${exact.why}`);
  return out;
}

const tableMarkdown = (rows: readonly RegisterRow[]): string => `| ${HEADER.join(" | ")} |\n| --- | --- | --- |\n${rows.map(entry => `| ${entry.risk} | ${entry.impact} | ${entry.mitigation} |`).join("\n")}\n`;
/** The synthetic document the drift falsifiers run over: the frozen cells under the real heading shape, never the live text. */
const synthetic = (rows: readonly RegisterRow[] = REGISTER, after = ""): string =>
  `# ${DOCS_PARENT}\n\n## Adopted target decisions\n\nDecisions.\n\n## ${SECTION}\n\n${tableMarkdown(rows)}${after}\n## Decisions deferred, with recommended starting defaults\n\nDefaults.\n\n## Revisit criteria\n\nCriteria.\n`;
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("risk ")).map(line => line.slice(0, line.indexOf(" (")));
const edited = (index: number, field: keyof RegisterRow, from: string, to: string): readonly RegisterRow[] => REGISTER.map((entry, at) => (at === index ? { ...entry, [field]: entry[field].replace(from, to) } : entry));

describe("wb-cax.26 docs/workbench/18 key-risks census (report mode)", () => {
  it("AC1: the table holds the thirteen frozen rows in order, deeply frozen, each cell verbatim in the docs section", () => {
    expect(isDeepFrozen(TABLE)).toBe(true);
    expect(TABLE.map(entry => entry.row)).toEqual(ROW_IDS);
    expect(TABLE).toHaveLength(13);
    expect(TABLE.map(entry => entry.risk)).toEqual(REGISTER.map(entry => entry.risk));
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
  });

  it("AC1: the frozen shape holds: per half the pin count, the clause length and a digest of every pinned file and title (rule 16)", () => {
    expect(shapeOf(TABLE)).toEqual(FROZEN_SHAPE);
  });

  it("AC1: every clause is a verbatim part of its row's Risk or Mitigation and test cell", () => {
    for (const entry of TABLE) {
      for (const half of entry.halves) expect(entry.mitigation.includes(half.clause) || entry.risk.includes(half.clause), `row ${entry.row}/${half.id}: the clause "${half.clause}" is in neither "${entry.risk}" nor "${entry.mitigation}"`).toBe(true);
    }
  });

  it("AC1: the live section renders exactly the frozen table (whole-section equality, HTML-free)", () => {
    const section = docsSection(readRepo(DOCS_FILE), SECTION, 2, [DOCS_PARENT]);
    expect(sectionMatches(section, sectionBlocks(REGISTER)), SECTION).toEqual({ ok: true, why: "" });
  });

  it("AC1: every pinned half carries pins, every unpinned half carries a reason and no pins, and a half's tier is one of the three", () => {
    for (const entry of TABLE) {
      expect(entry.halves.length, `row ${entry.row}: a row holds at least one half`).toBeGreaterThan(0);
      for (const half of entry.halves) {
        expect(["default-gate", "native-read", "bench-receipt"], `row ${entry.row}/${half.id}: tier`).toContain(half.tier);
        if (half.reason === undefined) expect(half.pins.length, `row ${entry.row}/${half.id}: a pinned half has no pins`).toBeGreaterThan(0);
        else {
          expect(half.pins, `row ${entry.row}/${half.id}: an unpinned half carries no pins`).toEqual([]);
          expect(half.reason.trim().length, `row ${entry.row}/${half.id}: an unpinned half needs a reason`).toBeGreaterThan(40);
        }
      }
    }
  });

  it("AC3: the unpinned halves are listed so none is ever counted as passed, each naming its reason and owner where one exists", () => {
    const listed = TABLE.flatMap(entry => entry.halves.filter(half => half.reason !== undefined).map(half => `${entry.row}/${half.id}`));
    expect(listed).toEqual(UNPINNED_HALVES);
    const reasons = Object.fromEntries(TABLE.flatMap(entry => entry.halves.filter(half => half.reason !== undefined).map(half => [`${entry.row}/${half.id}`, half.reason ?? ""])));
    expect(reasons["K02/snapshot-versions-and-upstream-sync-gate"]).toContain("wb-cax.4");
    expect(reasons["K04/host-closure-env-canary"]).toContain("it.fails");
    expect(reasons["K04/separate-process-isolation"]).toContain("wb-ksz");
    expect(reasons["K07/benchmark-receipt"]).toContain("reducer-selector-bench");
    expect(reasons["K09/native-scheduling-await-policy"]).toContain("W09/W18");
    expect(reasons["K10/sdk-absent-unavailable-block"]).toContain("native-rf-preview");
  });

  it("AC3: the env canary held as it.fails is never a pin, in any row", () => {
    const pinnedTitles = TABLE.flatMap(entry => entry.halves.flatMap(half => half.pins.map(entry2 => entry2.title)));
    expect(pinnedTitles).not.toContain("host-closure Function escape must not reveal even a local canary env variable");
  });

  it.each(JUDGED)("AC2 row $row.row/$half.id: every pinned case is collected once, passed and asserting in the default gate's own report", ({ row: entry, half }) => {
    const verdicts = judge(
      REPORT,
      half.pins.map(candidate => casePin(half, candidate)),
    );
    expect(verdicts).toHaveLength(half.pins.length);
    expect(failures(entry, half, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(half.pins.map(() => "ok"));
  });

  it("AC4: the native-read case is recorded with its tier and judged by no report this leg reads: the default judge refuses it, the default report does not hold its file", () => {
    expect(NATIVE.map(({ row: entry, half }) => `${entry.row}/${half.id}`)).toEqual(["K10/native-preview"]);
    const native = NATIVE[0];
    const entry = native?.half.pins[0];
    expect(native !== undefined && entry !== undefined).toBe(true);
    if (native === undefined || entry === undefined) return;
    expect(entry.file).toBe(NATIVE_FILE);
    expect(existsSync(join(ROOT, entry.file)), `${entry.file} is the native tier's file`).toBe(true);
    const [asNative] = judge(REPORT, [casePin(native.half, entry)]);
    expect(asNative?.code, "a native-read pin is never carried by the default report").toBe("tier-mismatch");
    const [asDefault] = judge(REPORT, [{ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER }]);
    expect(asDefault?.code, "the native file is not in the default gate's report").toBe("not-collected");
  });

  it("AC4: the bench-receipt half is recorded as unpinned: the command exists in forge.toml and is not in the gate list", () => {
    const forge = readRepo("forge.toml");
    expect(forge).toContain("[build.commands.reducer-selector-bench]");
    const gateLine = forge.split("\n").find(line => line.startsWith("gate = "));
    expect(gateLine).toBeDefined();
    expect(gateLine ?? "").not.toContain("reducer-selector-bench");
    const half = TABLE.find(entry => entry.row === "K07")?.halves.find(candidate => candidate.id === "benchmark-receipt");
    expect(half?.tier).toBe("bench-receipt");
    expect(half?.pins).toEqual([]);
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(candidate => candidate.module === "./helpers/census.js").flatMap(candidate => candidate.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(candidate => candidate.kind === "dynamic" || candidate.kind === "require")).toEqual([]);
    const pinnedFiles = TABLE.flatMap(entry => entry.halves.flatMap(half => half.pins.map(candidate => candidate.file.replace(/^test\//u, "").replace(/\.test\.ts$/u, ""))));
    expect(own.imports.filter(candidate => pinnedFiles.some(name => candidate.module.includes(name)))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-cax.26 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const firstJudged = (id: string): { entry: Row; half: Half; first: Pin } => {
    const found = JUDGED.find(({ row: candidate }) => candidate.row === id);
    const first = found?.half.pins[0];
    if (found === undefined || first === undefined) throw new Error(`row ${id} holds no judged pin`);
    return { entry: found.row, half: found.half, first };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", () => {
    const { entry, half, first } = firstJudged("K05");
    const wrong = { ...first, title: first.title.replace("journaled", "journaleD") };
    const verdicts = judge(REPORT, [casePin(half, wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(entry, half, verdicts);
    expect(line).toContain("row K05/reconciliation-and-uncertain-effect");
    expect(line).toContain(first.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a row removed from the table fails the row-set pin (the frozen ids no longer match)", () => {
    expect(TABLE.filter(entry => entry.row !== "K09").map(entry => entry.row)).not.toEqual(ROW_IDS);
  });

  it("M3: an unpinned half promoted to a pin without a title is red (the judge finds no such case)", () => {
    const { half } = firstJudged("K08");
    const [verdict] = judge(REPORT, [casePin(half, { file: T("forge-observer"), title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("the describe-bound pin binds its describe: the same case under a renamed describe path is absent", () => {
    const { half, first } = firstJudged("K03");
    const bound = TABLE.find(entry => entry.row === "K03")?.halves.find(candidate => candidate.id === "documented-parity-deviations");
    const entry = bound?.pins[0];
    expect(entry?.suite).toBeDefined();
    if (entry === undefined || bound === undefined) return;
    const [renamed] = judge(REPORT, [casePin(bound, { ...entry, suite: ["dual-backend golden equivalence (fixture pass, not live SDK) (renamed)", "documented first-cut degradation (pin-flip oracle: wb-a2g.11)"] })]);
    expect(renamed?.code).toBe("absent");
    expect(half.pins.includes(first)).toBe(true);
  });

  it("a file the default config excludes is never in the default report: a pin there is red, not collected", () => {
    const [verdict] = judge(REPORT, [{ file: NATIVE_FILE, title: "any title", tier: DEFAULT_GATE_TIER }]);
    expect(verdict?.code).toBe("not-collected");
  });

  it("a half relabelled native-read is refused by the default report, never carried from a title's presence", () => {
    const { half, first } = firstJudged("K11");
    const [verdict] = judge(REPORT, [casePin({ ...half, tier: "native-read" }, first)]);
    expect(verdict?.code).toBe("tier-mismatch");
  });
});

describe("wb-cax.26 frozen-shape hollowing falsifiers (the shape literal reds on each hollowing of the table)", () => {
  const without = (id: string, half: string, index: number): readonly Row[] =>
    TABLE.map(entry => (entry.row === id ? { ...entry, halves: entry.halves.map(candidate => (candidate.id === half ? { ...candidate, pins: candidate.pins.filter((_pin, at) => at !== index) } : candidate)) } : entry));

  it("CT1: deleting one pin of a multi-pin row reds the shape", () => {
    expect(shapeOf(without("K12", "scope-aware-read-acl-and-redaction", 1))).not.toEqual(FROZEN_SHAPE);
  });

  it("CT1b: deleting a pin of a second row reds the shape", () => {
    expect(shapeOf(without("K04", "host-side-authorization", 2))).not.toEqual(FROZEN_SHAPE);
  });

  it("CT2: shortening a requirement clause reds the shape", () => {
    const shortened = TABLE.map(entry => (entry.row === "K05" ? { ...entry, halves: entry.halves.map(half => ({ ...half, clause: half.clause.replace(", no blanket retries", "") })) } : entry));
    expect(shapeOf(shortened)).not.toEqual(FROZEN_SHAPE);
  });

  it("CT3: swapping a pin for an unrelated passing case reds the shape", () => {
    const swapped = TABLE.map(entry =>
      entry.row === "K06"
        ? { ...entry, halves: entry.halves.map(half => ({ ...half, pins: half.pins.map((candidate, at) => (at === 0 ? wb("forge-observer", "F2: a current failed gate stays failed despite transport success, and current success is success") : candidate)) })) }
        : entry,
    );
    expect(shapeOf(swapped)).not.toEqual(FROZEN_SHAPE);
  });

  it("CT4: renaming a pinned title in the table by one character reds the shape", () => {
    const renamed = TABLE.map(entry => (entry.row === "K08" ? { ...entry, halves: entry.halves.map(half => ({ ...half, pins: half.pins.map((candidate, at) => (at === 2 ? { ...candidate, title: `${candidate.title}.` } : candidate)) })) } : entry));
    expect(shapeOf(renamed)).not.toEqual(FROZEN_SHAPE);
  });
});

describe("wb-cax.26 docs drift names the risk or the section (synthetic document, rendered view)", () => {
  it("accepts the thirteen rows exactly as written, at EOF and bounded by a following level-2 heading", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(`# ${DOCS_PARENT}\n\n## ${SECTION}\n\n${tableMarkdown(REGISTER)}`)).toEqual([]);
  });

  it("K1 names risk 4 (and only it) when its Impact cell is weakened", () => {
    const rows = edited(3, "impact", "credential/data exposure", "minor exposure");
    expect(named(docsFailures(synthetic(rows)))).toEqual(["risk 4"]);
  });

  it("K2 names risk 5 (and only it) when its mitigation is reworded", () => {
    const rows = edited(4, "mitigation", "no blanket retries", "blanket retries allowed");
    expect(named(docsFailures(synthetic(rows)))).toEqual(["risk 5"]);
  });

  it("K3 names risk 13 (and only it) when its Risk cell is reworded", () => {
    const rows = edited(12, "risk", "accidentally rewritten", "sometimes rewritten");
    const lines = docsFailures(synthetic(rows));
    expect(named(lines)).toEqual(["risk 13"]);
    expect(lines.some(line => line.includes("not exactly its frozen table"))).toBe(true);
  });

  it("K4 names the row that was deleted from the table", () => {
    const lines = docsFailures(synthetic(REGISTER.filter((_entry, at) => at !== 8)));
    expect(named(lines)).toEqual(["risk 9"]);
  });

  it("D1 goes red on the section, naming no risk, when a weakening paragraph is appended inside it", () => {
    const lines = docsFailures(synthetic(REGISTER, "\nA risk is optional when a team says so.\n"));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("not exactly its frozen table");
  });

  it("D2 goes red when the section heading is renamed away", () => {
    const lines = docsFailures(synthetic().replace(`## ${SECTION}`, "## Key risks"));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section is refused");
  });

  it("D3 goes red when the heading is demoted to a level-3 heading (no level-2 heading is left)", () => {
    const lines = docsFailures(synthetic().replace(`## ${SECTION}`, `### ${SECTION}`));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section is refused");
  });

  it("D4 (FOLD-1) goes red when a weakening ### subsection is appended inside the section", () => {
    const lines = docsFailures(synthetic(REGISTER, "\n### Status\n\nEvery row is advisory.\n"));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.includes("not exactly its frozen table"))).toBe(true);
  });

  it("D5 goes red when the table is moved out of the section to EOF", () => {
    const lines = docsFailures(`${synthetic(REGISTER.slice(0, 0)).replace(tableMarkdown([]), "")}\n${tableMarkdown(REGISTER)}`);
    expect(lines.length).toBeGreaterThan(0);
  });

  it("D6 names risk 7 when its row is hidden in an HTML comment, and the section refuses the HTML", () => {
    const row = REGISTER[6];
    const markdown = synthetic().replace(`| ${row?.risk} | ${row?.impact} | ${row?.mitigation} |`, `<!-- | ${row?.risk} | ${row?.impact} | ${row?.mitigation} | -->`);
    const lines = docsFailures(markdown);
    expect(named(lines)).toContain("risk 7");
    expect(lines.some(line => line.includes("not exactly its frozen table"))).toBe(true);
  });

  it("D9: an unrelated table in a later section never reddens the register (no false red from the row count)", () => {
    const markdown = synthetic().replace("Defaults.\n", `Defaults.\n\n| Option | Default |\n| --- | --- |\n| a | b |\n| c | d |\n`);
    expect(docsFailures(markdown)).toEqual([]);
  });

  it("an edit of an unpinned section never reddens a row: the deferred decisions and revisit criteria are free to change", () => {
    expect(docsFailures(synthetic().replace("Defaults.", "Defaults, changed.").replace("Criteria.", "Other criteria."))).toEqual([]);
  });
});
