/**
 * wb-6hb.11 (VC-2/W07): docs/workbench/07-native-integrations.md provider-rules census.
 *
 * Spec: the 'Forge provider', 'Furnace provider', 'HyperUnix provider', 'ReactiveFiberCLI provider',
 * 'Beads provider' and 'Shared integration requirements' sections of
 * docs/workbench/07-native-integrations.md. Each falsifiable sentence below is quoted verbatim
 * (and checked to sit inside its named section) and bound to existing cases by file, verbatim
 * title and tier.
 *
 * What this census proves: every pinned title still exists verbatim inside an it(/test( call in its
 * file and is not .skip/.todo/.fails (a named knownWidening pin excepted); each pin's recorded tier
 * agrees with whether the file is excluded from the default vitest include. A rename, deletion or
 * .skip of a pinned case goes red naming the row and the pin.
 *
 * What it does NOT prove: it never runs a pinned case, so it asserts nothing about a pinned case's
 * pass state, and a native-read or live pin is presence-only: this file NEVER reports a live PASS
 * from presence. It binds titles, not assertion bodies.
 *
 * Rows with no landed case are listed with a reason, asserted to stay unpinned (a seat that lands
 * a case must flip the row consciously), and never pass or warn silently.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(import.meta.dirname, "..");
const DOC = "docs/workbench/07-native-integrations.md";

type Tier = "default-gate" | "native-read" | "live" | "knownWidening";

interface Pin {
	file: string;
	title: string;
	tier: Tier;
}

interface Gap {
	item: string;
	reason: string;
}

interface PendingPin {
	file: string;
	oracleBead: string;
	note: string;
}

interface Row {
	row: string;
	section: string;
	quote: string;
	pins: Pin[];
	/** Set only when pins is empty: why no landed case binds the sentence. */
	unpinnedReason?: string;
	/** Parts of a pinned sentence that still have no landed case, each with a reason. */
	gaps?: Gap[];
	/** A case that is named but not landed: the census asserts the file is still absent. */
	pending?: PendingPin[];
}

const T = (file: string): string => `test/workbench-${file}.test.ts`;

const ROWS: Row[] = [
	{
		row: "F1",
		section: "Forge provider",
		quote: "A successful RPC or shell exit does **not** equal verified Forge PASS.",
		pins: [
			{ file: T("forge-observer"), title: "F2: a current failed gate stays failed despite transport success, and current success is success", tier: "default-gate" },
			{ file: T("forge-observer"), title: "reads Forge's own failed-gate status (error) as failure and never lets a mixed or undecided reading promote the workspace", tier: "default-gate" },
			{ file: T("forge-contract"), title: "server partial outcome remains a partial domain value", tier: "default-gate" },
		],
	},
	{
		row: "F2",
		section: "Forge provider",
		quote: "Preserve actual source basis, full verdict axes, reason codes, reuse/cache evidence and partial/unknown states.",
		pins: [
			{ file: T("forge-observer"), title: "F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone", tier: "default-gate" },
			{ file: T("forge-observer"), title: "F3: a partial envelope with no packages is indeterminate, never an empty success", tier: "default-gate" },
			{ file: T("forge-observer"), title: "F5: states only forge-observer grouping edges and never invents lifecycle, timing or a basis", tier: "default-gate" },
		],
	},
	{
		row: "F3",
		section: "Forge provider",
		quote: "Workspace Families and global cache designs must be probed for actual shipped availability before calling child creation or cache APIs.",
		pins: [],
		unpinnedReason:
			"no landed case probes Workspace Families or global cache availability: a repo-wide search of test/ and src/ for those terms returns nothing, so the sentence has no falsifier today and is never reported as covered",
	},
	{
		row: "U1",
		section: "Furnace provider",
		quote: "Ambiguous runs.start timeout -> uncertain/reconcile; do not issue second start blindly.",
		pins: [
			{ file: T("furnace-hosted"), title: "treats a timed-out or unreadable start as uncertain, closes the host, and refuses a blind second start", tier: "default-gate" },
			{ file: T("provider-lifecycle"), title: "honors cancellation before native launch without creating a Furnace client", tier: "default-gate" },
		],
	},
	{
		row: "U2",
		section: "Furnace provider",
		quote: "Native Run/Work/Attempt and supervision semantics remain Furnace's.",
		pins: [
			{ file: T("furnace-observer"), title: "rejects invalid polling budgets, and never describes an Attempt output stream as a Run lifecycle stream", tier: "default-gate" },
			{ file: T("furnace-topology"), title: "emits ownership only on the producer page confirmation: a foreign Attempt or a missing page request ID refuses", tier: "default-gate" },
		],
	},
	{
		row: "U3",
		section: "Furnace provider",
		quote: "(only status is read; failure_class and data are not)",
		pins: [{ file: T("furnace-hosted"), title: "maps every workflow settlement onto the four-word result without reading failure_class", tier: "default-gate" }],
	},
	{
		row: "U4",
		section: "Furnace provider",
		quote: "failure and indeterminate park the Run rather than retrying",
		pins: [
			{ file: T("furnace-hosted"), title: "never claims cancelled for a workflow that ignores the abort: it reports indeterminate and records the late settlement", tier: "default-gate" },
			{ file: T("furnace-control"), title: "parks rather than throws when the core refuses to mint a later phase after the verb was issued", tier: "default-gate" },
		],
	},
	{
		row: "U5",
		section: "Furnace provider",
		quote: "cancellation is a cooperative AbortSignal",
		pins: [{ file: T("furnace-hosted"), title: "cancels cooperatively: the workflow stops, no effect follows the abort, and the terminal is cancelled", tier: "default-gate" }],
	},
	{
		row: "U6",
		section: "Furnace provider",
		quote: "transport success is never domain verification",
		pins: [
			{ file: T("furnace-control"), title: "parks an answer that is transport success without the native echo: never acknowledged without the request echo, never settled without the terminal echo", tier: "default-gate" },
			{ file: T("forge-observer"), title: "F2: a current failed gate stays failed despite transport success, and current success is success", tier: "default-gate" },
		],
	},
	{
		row: "H1",
		section: "HyperUnix provider",
		quote: 'Incomplete query cannot silently authorize "nothing to do" or produce false success.',
		pins: [
			{ file: T("hyperunix-observer"), title: "H2: a 0-row incomplete answer that does not license absence stays partial and never reads as known-empty", tier: "default-gate" },
			{ file: T("hyperunix-observer"), title: 'H2: across all 13 kinds x both licences success appears only with complete coverage and nothing claims "verified"', tier: "default-gate" },
			{ file: T("provider-lifecycle"), title: "preserves incomplete native coverage instead of inventing absence", tier: "default-gate" },
		],
	},
	{
		row: "H2",
		section: "HyperUnix provider",
		quote: "preserve source basis, coverage classification, bounds, known-empty vs incomplete/unknown and evidence",
		pins: [
			{ file: T("hyperunix-observer"), title: "H2: only a runtime-licensed complete-empty answer is known-empty, complete coverage and a success", tier: "default-gate" },
			{ file: T("hyperunix-observer"), title: "H6: row, claim and certificate bodies never surface, and 40 certificates cap evidence at 32 references", tier: "default-gate" },
		],
	},
	{
		row: "R1",
		section: "ReactiveFiberCLI provider",
		quote: "Fixture text is never reported as real generated context.",
		pins: [
			{ file: T("reactivefiber-observer"), title: "R2: an injected-fixture seam is labelled as such and is never reported as a live, complete or successful render", tier: "default-gate" },
			{ file: T("provider-lifecycle"), title: "rejects a forged success envelope that cannot prove ephemeral provenance", tier: "default-gate" },
		],
	},
	{
		row: "R2",
		section: "ReactiveFiberCLI provider",
		quote: "Return actual context text, producer/render reference, model/input/source basis, necessity/budget result and partial/refused status.",
		pins: [
			{ file: T("reactivefiber-observer"), title: "R1: a clean noncommitted preview projects one snapshot keyed by operation_id with the graph digest as sourceRevision and a payload reference", tier: "default-gate" },
			{ file: T("reactivefiber-observer"), title: "R4: ok:true with diagnostics_summary.has_errors projects partial and never clean success", tier: "default-gate" },
			{ file: T("reactivefiber-observer"), title: "R4: a render that exceeds its context budget is partial and says how far over", tier: "default-gate" },
			// Presence only: excluded from the default include and run from vitest.rf.config.ts against a
			// real initialized workspace. The census never reports that case as passing.
			{ file: T("native-rf-preview"), title: "returns noncommitted text and graph provenance with no durable render ID", tier: "native-read" },
		],
	},
	{
		row: "R3",
		section: "ReactiveFiberCLI provider",
		quote: "Do not declare a typed TS context-render client exists without code evidence.",
		pins: [],
		unpinnedReason:
			"no landed case asserts that no typed TS context-render client is claimed: the only CLI-facing case (native-rf-preview, native-read tier) asserts the preview envelope shape, not the absence of a TS client, so binding it here would overstate coverage",
	},
	{
		row: "B1",
		section: "Beads provider",
		quote: "it does not store an authoritative second readiness DAG",
		pins: [
			{ file: T("beads-observer"), title: "C4: no ownership or hypothesis edge is ever minted and the projection accepts every edge", tier: "default-gate" },
			{ file: T("beads-observer"), title: "snapshot shape: sdk-operation, epic -> group, coverage from completeness, nothing invented", tier: "default-gate" },
		],
	},
	{
		row: "B2",
		section: "Beads provider",
		quote: "Workbench may inspect supported scopes and surface linked work",
		pins: [
			{ file: T("beads-observer"), title: "F6: dependencies beyond maxDependencies are cut, counts are honest and completeness is partial", tier: "default-gate" },
			{ file: T("beads-observer"), title: "F7: scope.workspace that differs from workspaceRoot is authorization and bd is never called", tier: "default-gate" },
		],
	},
	{
		row: "S1",
		section: "Shared integration requirements",
		quote: "Every live adapter records: SDK package + revision, native operation IDs, owner/basis, observed evidence, error taxonomy, trace correlation, cancellation/timeout semantics, and cleanup ownership.",
		pins: [
			{ file: T("vendor-pins"), title: "the real tree pins forge, furnace and hyperunix SDK tarball bytes consistently", tier: "default-gate" },
			{ file: T("forge-observer"), title: "projects what readForgeGateStatus returns, carrying the native operation as a forge-operation evidence reference", tier: "default-gate" },
			{ file: T("provider-lifecycle"), title: "turns malformed JSON into a typed transport error without echoing untrusted bytes", tier: "default-gate" },
			{ file: T("provider-lifecycle"), title: "waits for a bounded native read to settle then reports a mid-flight cancellation", tier: "default-gate" },
			{ file: T("provider-lifecycle"), title: "escalates aborted noncooperative children to SIGKILL within a deadline", tier: "default-gate" },
		],
		gaps: [
			{ item: "owner/basis", reason: "basis handling is pinned per provider on F2, H2 and R2; no landed case asserts a single adapter-record shape that carries owner and basis together" },
			{ item: "observed evidence", reason: "evidence handling is pinned per provider on H2 and R2; no landed case asserts the shared adapter-record field" },
			{ item: "trace correlation", reason: "only Furnace control carries a request id (furnace-control 'carries the core's request id to Furnace unchanged'); no landed case asserts trace correlation across adapters, so none is bound" },
		],
	},
	{
		row: "S2",
		section: "Shared integration requirements",
		quote: "Avoid quietly writing a private reimplementation of an upstream feature.",
		pins: [{ file: T("furnace-control"), title: "refuses a permitted decision for which no measured Furnace verb exists, even under a polluted Object.prototype", tier: "default-gate" }],
		pending: [
			{
				file: T("forge-control"),
				oracleBead: "wb-69g.9",
				note: "the forge capability-unavailable case joins this row only after wb-69g.9 lands; when that file appears this census goes red until the pin is flipped consciously",
			},
		],
	},
];

const EXPECTED_ROW_IDS = ["F1", "F2", "F3", "U1", "U2", "U3", "U4", "U5", "U6", "H1", "H2", "R1", "R2", "R3", "B1", "B2", "S1", "S2"];
const EXPECTED_UNPINNED = ["F3", "R3"];

/* ---------------------------------------------------------------- scan */

interface Case {
	title: string;
	modifiers: string[];
}

const CASE_CALL = /\b(it|test)((?:\.[A-Za-z]+)*)\(\s*(["'`])((?:\\.|(?!\3)[^\\])*)\3/g;

function unescapeLiteral(raw: string): string {
	return raw.replace(/\\(u\{[0-9A-Fa-f]+\}|u[0-9A-Fa-f]{4}|x[0-9A-Fa-f]{2}|[\s\S])/g, (_m, esc: string) => {
		if (esc.startsWith("u{")) return String.fromCodePoint(Number.parseInt(esc.slice(2, -1), 16));
		if (esc.startsWith("u")) return String.fromCharCode(Number.parseInt(esc.slice(1), 16));
		if (esc.startsWith("x")) return String.fromCharCode(Number.parseInt(esc.slice(1), 16));
		if (esc === "n") return "\n";
		if (esc === "t") return "\t";
		return esc;
	});
}

/** Every it(/test( call with a literal title, including it.skip/it.todo/it.each/it.fails forms. */
function findCases(source: string): Case[] {
	const cases: Case[] = [];
	for (const m of source.matchAll(CASE_CALL)) {
		const modifiers = m[2] ? m[2].slice(1).split(".") : [];
		cases.push({ title: unescapeLiteral(m[4] ?? ""), modifiers });
	}
	// it.each(table)('title', fn): the title is in the second call.
	for (const m of source.matchAll(/\b(?:it|test)\.each\([\s\S]*?\)\(\s*(["'`])((?:\\.|(?!\1)[^\\])*)\1/g)) {
		cases.push({ title: unescapeLiteral(m[2] ?? ""), modifiers: ["each"] });
	}
	return cases;
}

const DISABLING = new Set(["skip", "todo", "fails", "skipIf"]);

function excludedFromDefaultInclude(configSource: string): string[] {
	const block = /exclude:\s*\[([\s\S]*?)\]/.exec(configSource);
	if (!block) return [];
	return [...(block[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1] ?? "");
}

function docSection(doc: string, name: string): string {
	const start = doc.indexOf(`## ${name}\n`);
	if (start < 0) return "";
	const next = doc.indexOf("\n## ", start + 1);
	return doc.slice(start, next < 0 ? undefined : next);
}

interface Env {
	read(path: string): string | undefined;
}

/** Returns one finding per violation; each names the row (and the pin where one applies). */
function census(rows: Row[], env: Env): string[] {
	const findings: string[] = [];
	const doc = env.read(DOC) ?? "";
	const exclude = excludedFromDefaultInclude(env.read("vitest.config.ts") ?? "");
	const ids = rows.map((r) => r.row);
	if (JSON.stringify(ids) !== JSON.stringify(EXPECTED_ROW_IDS)) {
		findings.push(`row set drifted: expected ${EXPECTED_ROW_IDS.join(",")} but the table holds ${ids.join(",")}`);
	}
	for (const r of rows) {
		const section = docSection(doc, r.section);
		if (!section) findings.push(`${r.row}: section '${r.section}' not found in ${DOC}`);
		else if (!section.includes(r.quote)) findings.push(`${r.row}: quote is not verbatim in '${r.section}': ${r.quote}`);
		if (r.pins.length === 0) {
			if (!r.unpinnedReason || r.unpinnedReason.trim().length < 20) findings.push(`${r.row}: unpinned row carries no reason`);
		} else if (r.unpinnedReason !== undefined) {
			findings.push(`${r.row}: a pinned row must not also claim to be unpinned`);
		}
		for (const g of r.gaps ?? []) {
			if (g.reason.trim().length < 20) findings.push(`${r.row}: gap '${g.item}' carries no reason`);
		}
		for (const p of r.pins) {
			const source = env.read(p.file);
			if (source === undefined) {
				findings.push(`${r.row}: pinned file is missing: ${p.file}`);
				continue;
			}
			if (!p.title.trim()) {
				findings.push(`${r.row}: a pin in ${p.file} has an empty title`);
				continue;
			}
			const matches = findCases(source).filter((c) => c.title === p.title);
			if (matches.length === 0) {
				findings.push(`${r.row}: title not found verbatim in ${p.file}: ${p.title}`);
				continue;
			}
			const live = matches.filter((c) => !c.modifiers.some((m) => DISABLING.has(m)));
			if (live.length === 0 && p.tier !== "knownWidening") {
				findings.push(`${r.row}: pinned case is disabled (${matches[0]?.modifiers.join(".")}) in ${p.file}: ${p.title}`);
			}
			const excluded = exclude.includes(p.file);
			if (p.tier === "default-gate" && excluded) findings.push(`${r.row}: ${p.file} is excluded from the default include but pinned as default-gate`);
			if ((p.tier === "native-read" || p.tier === "live") && !excluded) {
				findings.push(`${r.row}: ${p.file} runs in the default include but is pinned as ${p.tier}`);
			}
		}
		for (const pend of r.pending ?? []) {
			if (env.read(pend.file) !== undefined) {
				findings.push(`${r.row}: ${pend.file} (${pend.oracleBead}) has landed: flip it from pending to a pin in the same commit`);
			}
		}
	}
	const unpinned = rows.filter((r) => r.pins.length === 0).map((r) => r.row);
	if (JSON.stringify(unpinned) !== JSON.stringify(EXPECTED_UNPINNED)) {
		findings.push(`unpinned set drifted: expected ${EXPECTED_UNPINNED.join(",")} but found ${unpinned.join(",")}`);
	}
	return findings;
}

const realEnv: Env = {
	read(path) {
		const abs = join(ROOT, path);
		return existsSync(abs) ? readFileSync(abs, "utf8") : undefined;
	},
};

/** An env whose file contents are rewritten by `edit`, used to model drift without touching disk. */
function mutated(edit: (path: string, source: string) => string): Env {
	return {
		read(path) {
			const source = realEnv.read(path);
			return source === undefined ? undefined : edit(path, source);
		},
	};
}

function clone(rows: Row[]): Row[] {
	return structuredClone(rows);
}

/* --------------------------------------------------------------- tests */

describe("docs/07 native-provider rules census (wb-6hb.11)", () => {
	it("holds exactly the eighteen frozen rows, F1-F3, U1-U6, H1-H2, R1-R3, B1-B2, S1-S2", () => {
		expect(ROWS).toHaveLength(18);
		expect(ROWS.map((r) => r.row)).toEqual(EXPECTED_ROW_IDS);
	});

	it("binds every row to its verbatim docs/07 sentence inside the named section, and every pin to a live case", () => {
		expect(census(ROWS, realEnv)).toEqual([]);
	});

	it("lists the unpinned rows explicitly, each with a reason, and keeps them unpinned", () => {
		const unpinned = ROWS.filter((r) => r.pins.length === 0);
		expect(unpinned.map((r) => r.row)).toEqual(EXPECTED_UNPINNED);
		for (const r of unpinned) expect(r.unpinnedReason?.length ?? 0, r.row).toBeGreaterThan(40);
	});

	it("keeps the S1 partial gaps and the S2 pending forge-control pin visible rather than silent", () => {
		const s1 = ROWS.find((r) => r.row === "S1");
		expect(s1?.gaps?.map((g) => g.item)).toEqual(["owner/basis", "observed evidence", "trace correlation"]);
		const s2 = ROWS.find((r) => r.row === "S2");
		expect(s2?.pending?.map((p) => `${p.file}@${p.oracleBead}`)).toEqual([`${T("forge-control")}@wb-69g.9`]);
	});

	it("records the tier of every pin and presence-pins the one case outside the default gate", () => {
		const outside = ROWS.flatMap((r) => r.pins.filter((p) => p.tier !== "default-gate").map((p) => `${r.row}:${p.tier}:${p.file}`));
		expect(outside).toEqual([`R2:native-read:${T("native-rf-preview")}`]);
	});

	describe("falsifiers: the census goes red on each kind of drift", () => {
		it("M1: a pinned title altered by one character goes red naming the row", () => {
			const rows = clone(ROWS);
			const u6 = rows.find((r) => r.row === "U6");
			if (!u6?.pins[0]) throw new Error("U6 pin missing from the table");
			u6.pins[0].title = u6.pins[0].title.replace("transport success", "transport sucess");
			const findings = census(rows, realEnv);
			expect(findings).toHaveLength(1);
			expect(findings[0]).toMatch(/^U6: title not found verbatim in test\/workbench-furnace-control\.test\.ts/);
		});

		it("M1b: renaming a pinned case in its file goes red naming the row", () => {
			const env = mutated((path, source) =>
				path === T("furnace-hosted") ? source.replace("cancels cooperatively: the workflow stops", "cancels politely: the workflow stops") : source,
			);
			expect(census(ROWS, env).map((f) => f.split(":")[0])).toEqual(["U5"]);
		});

		it("M1c: deleting a pinned case goes red naming the row", () => {
			const title = "server partial outcome remains a partial domain value";
			const env = mutated((path, source) => (path === T("forge-contract") ? source.replace(title, "") : source));
			const findings = census(ROWS, env);
			expect(findings).toHaveLength(1);
			expect(findings[0]).toContain("F1: ");
		});

		it("M1d: a .skip, .todo or .fails on a pinned case goes red naming the row", () => {
			for (const modifier of ["skip", "todo", "fails"]) {
				const env = mutated((path, source) =>
					path === T("beads-observer")
						? source.replace("it('F7: scope.workspace that differs", `it.${modifier}('F7: scope.workspace that differs`)
						: source,
				);
				const findings = census(ROWS, env);
				expect(findings, modifier).toHaveLength(1);
				expect(findings[0], modifier).toMatch(new RegExp(`^B2: pinned case is disabled \\(${modifier}\\)`));
			}
		});

		it("M1e: a knownWidening pin may be disabled, a default-gate pin may not", () => {
			const rows = clone(ROWS);
			const u5 = rows.find((r) => r.row === "U5");
			if (!u5?.pins[0]) throw new Error("U5 pin missing from the table");
			u5.pins[0].tier = "knownWidening";
			const env = mutated((path, source) =>
				path === T("furnace-hosted") ? source.replace('it("cancels cooperatively', 'it.skip("cancels cooperatively') : source,
			);
			expect(census(rows, env)).toEqual([]);
			expect(census(ROWS, env).map((f) => f.split(":")[0])).toEqual(["U5"]);
		});

		it("M2: removing a row from the table fails the row-set pin", () => {
			const rows = clone(ROWS).filter((r) => r.row !== "H2");
			const findings = census(rows, realEnv);
			expect(findings[0]).toMatch(/^row set drifted: expected .* but the table holds /);
		});

		it("M3: an unpinned row silently promoted to pinned without a title goes red", () => {
			const rows = clone(ROWS);
			const f3 = rows.find((r) => r.row === "F3");
			if (!f3) throw new Error("F3 row missing from the table");
			f3.pins = [{ file: T("forge-observer"), title: "", tier: "default-gate" }];
			const findings = census(rows, realEnv);
			expect(findings.some((f) => f.startsWith("F3: a pin in test/workbench-forge-observer.test.ts has an empty title"))).toBe(true);
			expect(findings.some((f) => f.startsWith("unpinned set drifted"))).toBe(true);
		});

		it("M4: an unpinned row without a reason goes red", () => {
			const rows = clone(ROWS);
			const r3 = rows.find((r) => r.row === "R3");
			if (!r3) throw new Error("R3 row missing from the table");
			delete r3.unpinnedReason;
			expect(census(rows, realEnv)).toContain("R3: unpinned row carries no reason");
		});

		it("M5: a quote that is not verbatim in its named section, or sits in another section, goes red", () => {
			const rows = clone(ROWS);
			const h1 = rows.find((r) => r.row === "H1");
			const b1 = rows.find((r) => r.row === "B1");
			if (!h1 || !b1) throw new Error("rows missing from the table");
			h1.quote = h1.quote.replace("silently", "quietly");
			b1.section = "Forge provider";
			const findings = census(rows, realEnv).map((f) => f.split(":")[0]);
			expect(findings).toEqual(["H1", "B1"]);
		});

		it("M6: a tier that disagrees with the default include goes red in both directions", () => {
			const rows = clone(ROWS);
			const r2 = rows.find((r) => r.row === "R2");
			const u5 = rows.find((r) => r.row === "U5");
			const nativePin = r2?.pins.find((p) => p.file === T("native-rf-preview"));
			if (!nativePin || !u5?.pins[0]) throw new Error("pins missing from the table");
			nativePin.tier = "default-gate";
			u5.pins[0].tier = "live";
			const findings = census(rows, realEnv);
			expect(findings.some((f) => f.startsWith("R2: ") && f.includes("excluded from the default include but pinned as default-gate"))).toBe(true);
			expect(findings.some((f) => f.startsWith("U5: ") && f.includes("runs in the default include but is pinned as live"))).toBe(true);
		});

		it("M7: a landed forge-control file demands a conscious pin-flip on S2", () => {
			const env: Env = { read: (path) => (path === T("forge-control") ? "" : realEnv.read(path)) };
			const findings = census(ROWS, env);
			expect(findings).toHaveLength(1);
			expect(findings[0]).toMatch(/^S2: test\/workbench-forge-control\.test\.ts \(wb-69g\.9\) has landed/);
		});

		it("M8: a pinned file that disappears goes red naming the row", () => {
			const env: Env = { read: (path) => (path === T("hyperunix-observer") ? undefined : realEnv.read(path)) };
			const findings = census(ROWS, env);
			expect(findings.every((f) => f.startsWith("H1: ") || f.startsWith("H2: "))).toBe(true);
			expect(findings.some((f) => f.startsWith("H1: pinned file is missing"))).toBe(true);
		});
	});

	describe("scan: the case finder reads real call shapes", () => {
		it("reads quote styles, escapes, modifiers and it.each tables", () => {
			const source = [
				"it('plain', () => {});",
				'it("double with \\"inner\\" quotes", async () => {});',
				"it(`template`, () => {});",
				"it.skip('skipped', () => {});",
				"test.todo('todo');",
				"it.each(rows)('each %s', () => {});",
				"it('it\\'s escaped', () => {});",
			].join("\n");
			const found = findCases(source);
			expect(found.map((c) => c.title)).toEqual(["plain", 'double with "inner" quotes', "template", "skipped", "todo", "it's escaped", "each %s"]);
			expect(found.find((c) => c.title === "skipped")?.modifiers).toEqual(["skip"]);
			expect(found.find((c) => c.title === "todo")?.modifiers).toEqual(["todo"]);
		});
	});
});
