/**
 * docs/14 "Matrix by subsystem" census falsifier (wb-cax.25, W22).
 *
 * docs/workbench/14-qa-and-benchmarks.md carries a thirteen-row table whose
 * cells promise a positive proof and a negative control per subsystem. This file
 * binds every one of the 26 cells to the existing case(s) that embody it, by
 * file, verbatim title and tier, so a rename, deletion or skip of an embodying
 * case goes red naming the row, the cell, the file and the title.
 *
 * Presence-only: the pinned cases are never executed here. A title's presence
 * is NOT a live, native or scale pass; the non-default tiers below run under
 * their own vitest configs and are bound by title only.
 *
 * Cells with no case are listed as unpinned with a reason and are never counted
 * as passed. Measured at origin/workbench/implementation-program 4fc7a9d.
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOC = "docs/workbench/14-qa-and-benchmarks.md";

type Tier = "default-gate" | "furnace-active-observe" | "native-read" | "rf-preview" | "bench-receipt";
interface Pin {
	readonly file: string;
	readonly title: string;
	readonly tier: Tier;
}
interface Cell {
	readonly quote: string;
	readonly status: "pinned" | "unpinned";
	readonly pins: readonly Pin[];
	/** Required when unpinned; on a pinned cell it names the part left unpinned. */
	readonly reason?: string;
}
interface Row {
	readonly subsystem: string;
	readonly positive: Cell;
	readonly negative: Cell;
}

const pin = (file: string, title: string, tier: Tier = "default-gate"): Pin => ({ file: `test/${file}`, title, tier });
const pinned = (quote: string, pins: readonly Pin[], reason?: string): Cell => ({
	quote,
	status: "pinned",
	pins,
	...(reason === undefined ? {} : { reason }),
});
const unpinned = (quote: string, reason: string): Cell => ({ quote, status: "unpinned", pins: [], reason });

const TIER_CONFIG: Readonly<Record<Exclude<Tier, "default-gate" | "bench-receipt">, string>> = {
	"furnace-active-observe": "vitest.furnace.config.ts",
	"native-read": "vitest.native.config.ts",
	"rf-preview": "vitest.rf.config.ts",
};

/** Cells deliberately without a case today; flipping one is a census edit, never silent. */
const EXPECTED_UNPINNED: readonly string[] = [
	"Legacy scripts / negative",
	"MechanicalWorkflows / positive",
	"MechanicalWorkflows / negative",
];

const ROWS: readonly Row[] = [
	{
		subsystem: "Claude SDK host",
		positive: pinned("SDK message/session reference observed, schema result validated", [
			pin("workbench-host-contract.test.ts", "L3: parallel schema agents return object values from native SDK structured_output"),
			pin("workbench-claude-adverse-faults.test.ts", "control: a conforming structured_output succeeds and the text is its JSON"),
		]),
		negative: pinned("Pi AgentManager not invoked for script agent()", [
			pin("workbench-host-contract.test.ts", "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported"),
			pin(
				"workbench-claude-cancel-faults.test.ts",
				"F8 a killed run aborts exactly its in-flight agents, spawns nothing after, and leaves a concurrent run on the same host untouched",
			),
		]),
	},
	{
		subsystem: "Legacy scripts",
		positive: pinned("unchanged script executes with same semantics", [
			pin("workflow-claude-code-compat.test.ts", "runs the canonical review-changes example"),
			pin("workflow-examples.test.ts", "ships at least the examples the guide links"),
		]),
		negative: unpinned(
			"unsupported option fails at call",
			"no call-time unsupported-option refusal title found at 4fc7a9d in workflow-runtime, workflow-tool or workbench suites; groom follow-up",
		),
	},
	{
		subsystem: "node()",
		positive: pinned("authorized native SDK operation produces evidence", [
			pin(
				"workbench-forge-observer.test.ts",
				"projects what readForgeGateStatus returns, carrying the native operation as a forge-operation evidence reference",
			),
		]),
		negative: pinned("missing/unauthorized provider refuses", [
			pin("workbench-node-limits.test.ts", "refuses oversized input before native provider is called"),
			pin(
				"workbench-control-degradation.test.ts",
				"a registry control-gated invocation refuses with a typed authorization error once the grant expires and never starts the provider",
			),
		]),
	},
	{
		subsystem: "MechanicalWorkflows",
		positive: unpinned(
			"actual develop() + actual bound services",
			"W11 wb-04s blocked, VC-3 wb-w12 blocked, no binding-host code on trunk (feature-matrix 'Hosted develop()' planned)",
		),
		negative: unpinned(
			"fixture success not called real execution",
			"W11 wb-04s blocked, VC-3 wb-w12 blocked, no binding-host code on trunk (feature-matrix 'Hosted develop()' planned)",
		),
	},
	{
		subsystem: "Furnace",
		positive: pinned(
			"attached externally started native Run status/events",
			[pin("workbench-external-furnace.test.ts", "attaches to the existing Run, retains native identities, and leaves both stores byte-identical", "furnace-active-observe")]),
		negative: pinned(
			"observer close issues no stop; ambiguous start no duplicate",
			[
				pin(
					"workbench-furnace-control.test.ts",
					"closing the observer of a shared client performs zero control calls, and only a permitted decision then reaches one verb",
				),
			],
			"ambiguous-start-no-duplicate half is unpinned: no Furnace invoke/start surface landed (W09 wb-s8a)",
		),
	},
	{
		subsystem: "Forge",
		positive: pinned("gate on exact candidate/basis with producer verdict", [
			pin("workbench-forge-observer.test.ts", "F2: a current failed gate stays failed despite transport success, and current success is success"),
		]),
		negative: pinned("source basis changed -> no PASS", [
			pin("workbench-forge-contract.test.ts", "preserves last_result as historical, not verified candidate"),
			pin("workbench-forge-evidence.test.ts", "C2: authoritative_current=false stays historical and indeterminate, never current verification"),
		]),
	},
	{
		subsystem: "HX",
		positive: pinned("complete query and bounded result", [
			pin("workbench-hyperunix-observer.test.ts", "H2: only a runtime-licensed complete-empty answer is known-empty, complete coverage and a success"),
			pin("workbench-native-ecosystem.test.ts", "HX typed query retains incomplete coverage and binary identity", "native-read"),
		]),
		negative: pinned("partial/unknown not known-empty", [
			pin("workbench-hyperunix-observer.test.ts", "H2: a 0-row incomplete answer that does not license absence stays partial and never reads as known-empty"),
			pin("workbench-ecosystem-native.test.ts", "HX partial coverage remains incomplete and does not license absence", "native-read"),
		]),
	},
	{
		subsystem: "RF",
		positive: pinned("genuine context render and provenance", [
			pin("workbench-native-rf-preview.test.ts", "returns noncommitted text and graph provenance with no durable render ID", "rf-preview"),
		]),
		negative: pinned("static substitute not misreported as render", [
			pin(
				"workbench-reactivefiber-observer.test.ts",
				"R2: an injected-fixture seam is labelled as such and is never reported as a live, complete or successful render",
			),
		]),
	},
	{
		subsystem: "Journal",
		positive: pinned("safe matching prefix semantics", [
			pin("workflow-journal.test.ts", "replays an identical run without spawning anything"),
			pin("workflow-journal.test.ts", "stops replaying after a changed call even when a later one still matches"),
		]),
		negative: pinned("effectful SDK node not blindly replayed", [
			pin(
				"workbench-local-detached-effects.test.ts",
				"neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect naming its producer",
			),
			pin("workflow-effect-replay.test.ts", "journals a non-read node as the effect it was, without a replayable payload"),
			pin("workflow-effect-replay.test.ts", "never re-runs a journaled write because the basis changed"),
		]),
	},
	{
		subsystem: "Observation",
		positive: pinned("snapshots, dedup, cursor resume, provenance", [
			pin("workbench-observation.test.ts", "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot"),
			pin("workbench-observation.test.ts", "uses provider-qualified native keys, preserves native failure and does not infer ownership"),
		]),
		negative: pinned("event loss -> stale and unknown", [
			pin("workbench-observation.test.ts", "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot"),
			pin("workbench-detached-observer.test.ts", "reports a host-lost reading as unknown and stale, never as a replayed terminal verdict"),
		]),
	},
	{
		subsystem: "Security",
		positive: pinned("authorized narrow provider tool used", [
			pin("workbench-claude-role-tools.test.ts", "adds only curated role MCP tools to actual SDK options without provider auto-grants"),
			pin("workbench-registry-auth.test.ts", "inspect is independently granted and preserves native unknown fields"),
		]),
		negative: pinned("script crafted RPC cannot escalate rights", [
			pin("workbench-registry-auth.test.ts", "closes the script-side raw RPC vehicle while host authorization stays typed"),
			pin("workbench-registry-auth.test.ts", "copies caller grants before asynchronous dispatch and never escalates another caller"),
			pin("workflow-meta.test.ts", "cannot reach host globals from the meta fragment"),
		]),
	},
	{
		subsystem: "UI",
		positive: pinned(
			"80x24/120x40/very narrow layouts",
			[pin("workbench-inspector.test.ts", "always reserves a visible Escape hint after 1000 rows at 80x24 and 32x18")],
			"partial: 120x40 geometry is unpinned until wb-cax.9 lands on trunk",
		),
		negative: pinned(
			"overflowing escape/wide glyph no corruption",
			[
				pin("workbench-evidence-loader.test.ts", "strips terminal escapes, bidi and zero-width characters from preview lines"),
				pin(
					"workbench-control-degradation.test.ts",
					"adversarial ANSI, bidi and control characters in provider, action, target and invocation never reach a denial reason",
				),
			],
			"partial: no wide-glyph case title found at 4fc7a9d; escape handling only",
		),
	},
	{
		subsystem: "Designer",
		positive: pinned("reproducible before/after with native references", [
			pin("workbench-designer.test.ts", "source changes are explicit independent variables, not config confounds"),
			pin("workbench-identity.test.ts", "separates definition, deployment, logical request, subject basis and native reference"),
		]),
		negative: pinned("changed model/basis flagged as confound", [
			pin("workbench-designer.test.ts", "names a mismatched subject basis (principal + workspace source) as a confound"),
			pin("workbench-designer.test.ts", "an unmeasured workspace source state is a named confound even when subject basis digests coincide"),
			pin("workbench-pi-designer.test.ts", "names an unmeasured workspace source state as a cohort confound through the real tool, never a matched basis"),
		]),
	},
];

function read(rel: string): string {
	return readFileSync(join(repo, rel), "utf8");
}

interface Found {
	readonly title: string;
	readonly modifier: string;
}

/** Every it(...)/test(...) call whose first argument is a string literal. */
function declaredCases(source: string): Found[] {
	const out: Found[] = [];
	const call = /\b(?:it|test)((?:\.[A-Za-z]+)*)\(\s*(["'`])((?:\\[\s\S]|(?!\2)[^\\])*)\2/g;
	for (let m = call.exec(source); m !== null; m = call.exec(source)) {
		out.push({ modifier: m[1] ?? "", title: (m[3] ?? "").replace(/\\(.)/g, "$1") });
	}
	return out;
}

function cellsOf(row: Row): ReadonlyArray<readonly ["positive" | "negative", Cell]> {
	return [
		["positive", row.positive],
		["negative", row.negative],
	];
}

function docRows(): string[][] {
	const doc = read(DOC);
	const start = doc.indexOf("## Matrix by subsystem");
	expect(start, `${DOC} lost its "Matrix by subsystem" heading`).toBeGreaterThanOrEqual(0);
	const rest = doc.slice(start + 1);
	const next = rest.indexOf("\n## ");
	const section = rest.slice(0, next < 0 ? rest.length : next);
	const lines = section.split("\n").filter((l) => l.trim().startsWith("|"));
	return lines.slice(2).map((l) =>
		l
			.trim()
			.replace(/^\|/, "")
			.replace(/\|$/, "")
			.split("|")
			.map((c) => c.trim()),
	);
}

describe("docs/14 matrix by subsystem census", () => {
	it("holds exactly thirteen rows and 26 classified cells", () => {
		expect(ROWS).toHaveLength(13);
		expect(ROWS.flatMap(cellsOf)).toHaveLength(26);
	});

	it("matches the docs/14 table verbatim, row by row and cell by cell", () => {
		const table = docRows();
		expect(table.length, `${DOC} matrix row count drifted from the census`).toBe(ROWS.length);
		ROWS.forEach((row, i) => {
			const [subsystem, positive, negative] = table[i] ?? [];
			expect(subsystem, `row ${i + 1} subsystem`).toBe(row.subsystem);
			expect(positive, `${row.subsystem} / positive proof text drifted in ${DOC}`).toBe(row.positive.quote);
			expect(negative, `${row.subsystem} / negative control text drifted in ${DOC}`).toBe(row.negative.quote);
		});
	});

	it("classifies every cell as pinned (with pins) or unpinned (with a reason, no pins)", () => {
		for (const row of ROWS) {
			for (const [which, cell] of cellsOf(row)) {
				const name = `${row.subsystem} / ${which}`;
				if (cell.status === "pinned") {
					expect(cell.pins.length, `${name}: a pinned cell needs at least one pin`).toBeGreaterThan(0);
				} else {
					expect(cell.pins, `${name}: an unpinned cell carries no pins`).toEqual([]);
					expect((cell.reason ?? "").length, `${name}: an unpinned cell needs a reason`).toBeGreaterThan(10);
				}
			}
		}
	});

	it("lists exactly the expected unpinned cells, so none is passed silently and none flips unseen", () => {
		const actual = ROWS.flatMap((row) =>
			cellsOf(row)
				.filter(([, cell]) => cell.status === "unpinned")
				.map(([which]) => `${row.subsystem} / ${which}`),
		);
		expect(actual).toEqual([...EXPECTED_UNPINNED]);
	});

	describe("every pinned cell is bound to an existing, live case", () => {
		for (const row of ROWS) {
			for (const [which, cell] of cellsOf(row)) {
				for (const p of cell.pins) {
					it(`${row.subsystem} / ${which}: ${p.file} "${p.title}"`, () => {
						const where = `${row.subsystem} / ${which} -> ${p.file} "${p.title}"`;
						const cases = declaredCases(read(p.file)).filter((c) => c.title === p.title);
						expect(cases.length, `${where}: expected exactly one it/test with this title`).toBe(1);
						expect(cases[0]?.modifier, `${where}: pinned case must not be skipped, todo, failing or focused`).toBe("");
						const exclude = read("vitest.config.ts");
						if (p.tier === "default-gate") {
							expect(exclude.includes(`"${p.file}"`), `${where}: tier default-gate but the file is excluded from vitest.config.ts`).toBe(false);
						} else if (p.tier !== "bench-receipt") {
							const config = TIER_CONFIG[p.tier];
							expect(exclude.includes(`"${p.file}"`), `${where}: tier ${p.tier} is excluded from the default config`).toBe(true);
							expect(read(config).includes(`"${p.file}"`), `${where}: tier ${p.tier} is not included by ${config}`).toBe(true);
						}
					});
				}
			}
		}
	});

	it("scans titles with modifiers, quote styles and escapes the way the pinned files use them", () => {
		const sample = [
			"it('a \\'quoted\\' title', () => {});",
			'it("double", () => {});',
			"it.skip(`ticks`, () => {});",
			"test.todo('later');",
		].join("\n");
		expect(declaredCases(sample)).toEqual([
			{ modifier: "", title: "a 'quoted' title" },
			{ modifier: "", title: "double" },
			{ modifier: ".skip", title: "ticks" },
			{ modifier: ".todo", title: "later" },
		]);
	});
});
