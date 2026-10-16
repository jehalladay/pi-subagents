/**
 * docs/14 "Matrix by subsystem" census falsifier (wb-cax.25, W22; respin of gate-3 U1-U7).
 *
 * docs/workbench/14-qa-and-benchmarks.md carries a thirteen-row table whose cells promise a
 * positive proof and a negative control per subsystem. This file binds every cell (or, where a
 * cell holds two claims, every claim) to the existing case(s) that embody it, by file, verbatim
 * title and tier, so a rename, deletion or skip of an embodying case goes red naming the row,
 * the cell, the file, the title and the skip MODE.
 *
 * How it decides a pinned case is live (U1): the pinned file is parsed with the TypeScript
 * compiler API and the case is a registration call whose callee root is a vitest import binding.
 * Comments and string decoys are not registrations. A case is refused when its callee chain
 * carries skip, todo, fails, only, a literal-true skipIf or literal-false runIf, when an options
 * object sets skip/todo/fails/only, when any enclosing suite is so marked or reached through an
 * alias, when the body calls a context skip, or when the registration sits under a conditional,
 * a function that is not a suite callback, or any other indirection. Run-class modifiers
 * (concurrent, sequential, runIf(true), skipIf(false)) count as running.
 *
 * Tiers (U3): a non-default tier label is a claim about forge.toml, so each is checked against
 * its [build.commands.<tier>] command AND the vitest config module that command names, loaded as
 * a module (include and exclude resolved with path.matchesGlob), never by text inclusion.
 *
 * Docs (U4): the whole "## Matrix by subsystem" section is slice-equal to the census (heading
 * exact and unique at level 2, header row, separator, 13 rows, nothing else, three columns).
 *
 * Presence-only: the pinned cases are never executed here. A title's presence is NOT a live,
 * native or scale pass; the non-default tiers run under their own vitest configs and are bound
 * by title only. Parts with no case are unpinned with a reason and are never counted as passed.
 * Re-measured at origin/workbench/implementation-program 37d0bcb.
 */
import { readFileSync } from "node:fs";
import { dirname, join, matchesGlob, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import defaultConfig from "../vitest.config.js";
import furnaceConfig from "../vitest.furnace.config.js";
import nativeConfig from "../vitest.native.config.js";
import rfConfig from "../vitest.rf.config.js";

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOC = "docs/workbench/14-qa-and-benchmarks.md";

type Tier = "default-gate" | "furnace-observe" | "native-read" | "rf-preview";
type Which = "positive" | "negative";

interface Pin {
	readonly file: string;
	readonly title: string;
	readonly tier: Tier;
}
interface Part {
	/** The claim text. A cell with one claim has claim === quote. */
	readonly claim: string;
	readonly status: "pinned" | "unpinned";
	readonly pins: readonly Pin[];
	/** Required on an unpinned part. */
	readonly reason?: string;
}
interface Cell {
	/** The docs/14 cell text verbatim. Parts joined with "; " must equal it. */
	readonly quote: string;
	readonly parts: readonly Part[];
}
interface Row {
	readonly subsystem: string;
	readonly positive: Cell;
	readonly negative: Cell;
}

const pin = (file: string, title: string, tier: Tier = "default-gate"): Pin => ({ file: `test/${file}`, title, tier });
const whole = (quote: string, pins: readonly Pin[]): Cell => ({ quote, parts: [{ claim: quote, status: "pinned", pins }] });
const missing = (quote: string, reason: string): Cell => ({ quote, parts: [{ claim: quote, status: "unpinned", pins: [], reason }] });
const pinnedPart = (claim: string, pins: readonly Pin[]): Part => ({ claim, status: "pinned", pins });
const unpinnedPart = (claim: string, reason: string): Part => ({ claim, status: "unpinned", pins: [], reason });

const W11_REASON = "W11 wb-04s blocked, VC-3 wb-w12 blocked, no binding-host code on trunk (feature-matrix 'Hosted develop()' planned)";

/** Unpinned parts, each with the reason text it must carry. A flip is a census edit, never silent. */
const EXPECTED_UNPINNED: ReadonlyArray<{ readonly name: string; readonly reasonIncludes: string }> = [
	{ name: "MechanicalWorkflows / positive / actual develop() + actual bound services", reasonIncludes: "wb-04s" },
	{ name: "MechanicalWorkflows / negative / fixture success not called real execution", reasonIncludes: "wb-w12" },
	{ name: "Furnace / negative / ambiguous start no duplicate", reasonIncludes: "wb-s8a" },
];

const ROWS: readonly Row[] = [
	{
		subsystem: "Claude SDK host",
		positive: whole("SDK message/session reference observed, schema result validated", [
			pin("workbench-host-contract.test.ts", "L3: parallel schema agents return object values from native SDK structured_output"),
			pin("workbench-claude-adverse-faults.test.ts", "control: a conforming structured_output succeeds and the text is its JSON"),
		]),
		negative: whole("Pi AgentManager not invoked for script agent()", [
			pin("workbench-host-contract.test.ts", "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported"),
			pin(
				"workbench-claude-cancel-faults.test.ts",
				"F8 a killed run aborts exactly its in-flight agents, spawns nothing after, and leaves a concurrent run on the same host untouched",
			),
		]),
	},
	{
		subsystem: "Legacy scripts",
		positive: whole("unchanged script executes with same semantics", [
			pin("workflow-claude-code-compat.test.ts", "runs the canonical review-changes example"),
			pin("workflow-examples.test.ts", "ships at least the examples the guide links"),
		]),
		negative: whole("unsupported option fails at call", [pin("workflow-runtime.test.ts", "names a misspelt option rather than ignoring it")]),
	},
	{
		subsystem: "node()",
		positive: whole("authorized native SDK operation produces evidence", [
			pin(
				"workbench-forge-observer.test.ts",
				"projects what readForgeGateStatus returns, carrying the native operation as a forge-operation evidence reference",
			),
		]),
		negative: whole("missing/unauthorized provider refuses", [
			pin("workbench-node-contract.test.ts", "L4: unknown capability and duplicate descriptor fail explicitly"),
			pin("workbench-node-contract.test.ts", "L4: unauthorized invocation denied at host even with known capability id"),
			pin("workbench-node-limits.test.ts", "refuses oversized input before native provider is called"),
			pin(
				"workbench-control-degradation.test.ts",
				"a registry control-gated invocation refuses with a typed authorization error once the grant expires and never starts the provider",
			),
		]),
	},
	{
		subsystem: "MechanicalWorkflows",
		positive: missing("actual develop() + actual bound services", W11_REASON),
		negative: missing("fixture success not called real execution", W11_REASON),
	},
	{
		subsystem: "Furnace",
		positive: whole("attached externally started native Run status/events", [
			pin("workbench-external-furnace.test.ts", "attaches to the existing Run, retains native identities, and leaves both stores byte-identical", "furnace-observe"),
		]),
		negative: {
			quote: "observer close issues no stop; ambiguous start no duplicate",
			parts: [
				pinnedPart("observer close issues no stop", [
					pin(
						"workbench-furnace-control.test.ts",
						"closing the observer of a shared client performs zero control calls, and only a permitted decision then reaches one verb",
					),
				]),
				unpinnedPart("ambiguous start no duplicate", "no Furnace invoke/start surface landed (W09 wb-s8a), so there is no start to make ambiguous"),
			],
		},
	},
	{
		subsystem: "Forge",
		positive: whole("gate on exact candidate/basis with producer verdict", [
			pin("workbench-forge-observer.test.ts", "F2: a current failed gate stays failed despite transport success, and current success is success"),
		]),
		negative: whole("source basis changed -> no PASS", [
			pin("workbench-forge-contract.test.ts", "preserves last_result as historical, not verified candidate"),
			pin("workbench-forge-evidence.test.ts", "C2: authoritative_current=false stays historical and indeterminate, never current verification"),
		]),
	},
	{
		subsystem: "HX",
		positive: whole("complete query and bounded result", [
			pin("workbench-hyperunix-observer.test.ts", "H2: only a runtime-licensed complete-empty answer is known-empty, complete coverage and a success"),
			pin(
				"workbench-hyperunix-observer.test.ts",
				"keeps a provider-failed result failed and reads a runtime-licensed complete-empty result as the one known-empty success",
			),
		]),
		negative: whole("partial/unknown not known-empty", [
			pin("workbench-hyperunix-observer.test.ts", "H2: a 0-row incomplete answer that does not license absence stays partial and never reads as known-empty"),
			pin("workbench-ecosystem-native.test.ts", "HX partial coverage remains incomplete and does not license absence", "native-read"),
			pin("workbench-native-ecosystem.test.ts", "HX typed query retains incomplete coverage and binary identity", "native-read"),
		]),
	},
	{
		subsystem: "RF",
		positive: whole("genuine context render and provenance", [
			pin("workbench-native-rf-preview.test.ts", "returns noncommitted text and graph provenance with no durable render ID", "rf-preview"),
		]),
		negative: whole("static substitute not misreported as render", [
			pin(
				"workbench-reactivefiber-observer.test.ts",
				"R2: an injected-fixture seam is labelled as such and is never reported as a live, complete or successful render",
			),
		]),
	},
	{
		subsystem: "Journal",
		positive: whole("safe matching prefix semantics", [
			pin("workflow-journal.test.ts", "replays an identical run without spawning anything"),
			pin("workflow-journal.test.ts", "stops replaying after a changed call even when a later one still matches"),
		]),
		negative: whole("effectful SDK node not blindly replayed", [
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
		positive: whole("snapshots, dedup, cursor resume, provenance", [
			pin("workbench-observation.test.ts", "deduplicates IDs, rejects old sequence updates, and treats a cursor gap as stale until snapshot"),
			pin("workbench-observation.test.ts", "uses provider-qualified native keys, preserves native failure and does not infer ownership"),
		]),
		negative: whole("event loss -> stale and unknown", [
			pin("workbench-observation.test.ts", "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot"),
			pin("workbench-detached-observer.test.ts", "reports a host-lost reading as unknown and stale, never as a replayed terminal verdict"),
		]),
	},
	{
		subsystem: "Security",
		positive: whole("authorized narrow provider tool used", [
			pin("workbench-claude-role-tools.test.ts", "adds only curated role MCP tools to actual SDK options without provider auto-grants"),
			pin("workbench-registry-auth.test.ts", "inspect is independently granted and preserves native unknown fields"),
		]),
		negative: whole("script crafted RPC cannot escalate rights", [
			pin("workbench-registry-auth.test.ts", "closes the script-side raw RPC vehicle while host authorization stays typed"),
			pin("workbench-registry-auth.test.ts", "copies caller grants before asynchronous dispatch and never escalates another caller"),
			pin("workflow-meta.test.ts", "cannot reach host globals from the meta fragment"),
		]),
	},
	{
		subsystem: "UI",
		positive: whole("80x24/120x40/very narrow layouts", [
			pin("workbench-inspector.test.ts", "always reserves a visible Escape hint after 1000 rows at 80x24 and 32x18"),
			pin("workbench-terminal-geometry.test.ts", "inspector truncation is explicit: a page larger than the viewport names its remainder"),
		]),
		negative: whole("overflowing escape/wide glyph no corruption", [
			pin("workbench-evidence-loader.test.ts", "strips terminal escapes, bidi and zero-width characters from preview lines"),
			pin(
				"workbench-control-degradation.test.ts",
				"adversarial ANSI, bidi and control characters in provider, action, target and invocation never reach a denial reason",
			),
			pin("workflow-dialog.test.ts", "counts wide characters rather than code points"),
			pin(
				"workbench-timeline.test.ts",
				"keeps a credential glued to an escape redacted, never splits a surrogate pair and falls back to the reference for invisible text",
			),
			pin("workbench-inspector.test.ts", "caps viewport, terminal width and unsafe text, ASCII=%s"),
		]),
	},
	{
		subsystem: "Designer",
		positive: whole("reproducible before/after with native references", [
			pin("workbench-designer.test.ts", "source changes are explicit independent variables, not config confounds"),
			pin("workbench-identity.test.ts", "separates definition, deployment, logical request, subject basis and native reference"),
		]),
		negative: whole("changed model/basis flagged as confound", [
			pin("workbench-designer.test.ts", "names a mismatched subject basis (principal + workspace source) as a confound"),
			pin("workbench-designer.test.ts", "an unmeasured workspace source state is a named confound even when subject basis digests coincide"),
			pin("workbench-pi-designer.test.ts", "names an unmeasured workspace source state as a cohort confound through the real tool, never a matched basis"),
		]),
	},
];

function read(rel: string): string {
	return readFileSync(join(repo, rel), "utf8");
}

function cellsOf(row: Row): ReadonlyArray<readonly [Which, Cell]> {
	return [
		["positive", row.positive],
		["negative", row.negative],
	];
}

function allPins(rows: readonly Row[]): ReadonlyArray<{ readonly row: Row; readonly which: Which; readonly pin: Pin }> {
	return rows.flatMap((row) => cellsOf(row).flatMap(([which, cell]) => cell.parts.flatMap((part) => part.pins.map((p) => ({ row, which, pin: p })))));
}

/** The number of pin bindings in the census, stated in the delivery record and asserted below. */
const PIN_COUNT = 50;

// ---------------------------------------------------------------------------------------------
// U1: parse-aware liveness of a pinned case
// ---------------------------------------------------------------------------------------------

type Mode =
	| "missing"
	| "duplicate"
	| "skipped"
	| "todo"
	| "fails"
	| "only"
	| "skip-if-true"
	| "run-if-false"
	| "undecidable-condition"
	| "option-flag"
	| "enclosing-suite"
	| "unrecognised-registration"
	| "context-skip"
	| "conditional-registration"
	| "indirect-registration";

type Verdict = { readonly ok: true } | { readonly ok: false; readonly mode: Mode; readonly detail: string };

const LIVE: Verdict = { ok: true };
const refuse = (mode: Mode, detail: string): Verdict => ({ ok: false, mode, detail });

interface Segment {
	readonly name: string;
	readonly args: readonly ts.Expression[] | undefined;
}

/** Callee chain, root first: `it.skipIf(true)` -> [it, skipIf(true)]. */
function chainOf(expr: ts.Expression): Segment[] | undefined {
	if (ts.isIdentifier(expr)) return [{ name: expr.text, args: undefined }];
	if (ts.isPropertyAccessExpression(expr)) {
		const base = chainOf(expr.expression);
		return base === undefined ? undefined : [...base, { name: expr.name.text, args: undefined }];
	}
	if (ts.isCallExpression(expr)) {
		const base = chainOf(expr.expression);
		const last = base?.at(-1);
		if (base === undefined || last === undefined) return undefined;
		return [...base.slice(0, -1), { name: last.name, args: expr.arguments }];
	}
	return undefined;
}

type Kind = "case" | "suite";

/** vitest import bindings: local name -> imported name. */
function vitestBindings(sf: ts.SourceFile): Map<string, string> {
	const out = new Map<string, string>();
	for (const stmt of sf.statements) {
		if (!ts.isImportDeclaration(stmt) || !ts.isStringLiteral(stmt.moduleSpecifier) || stmt.moduleSpecifier.text !== "vitest") continue;
		const named = stmt.importClause?.namedBindings;
		if (named === undefined || !ts.isNamedImports(named)) continue;
		for (const el of named.elements) out.set(el.name.text, (el.propertyName ?? el.name).text);
	}
	return out;
}

function kindOf(chain: readonly Segment[], bindings: ReadonlyMap<string, string>): Kind | undefined {
	const root = chain[0];
	const imported = root === undefined ? undefined : bindings.get(root.name);
	if (imported === "it" || imported === "test") return "case";
	if (imported === "describe" || imported === "suite") return "suite";
	return undefined;
}

const RUN_CLASS = new Set(["concurrent", "sequential", "each", "for", "shuffle"]);

/** Modifier chain after the root: anything that parks, inverts or conditions the registration. */
function chainProblem(chain: readonly Segment[]): Verdict {
	for (const seg of chain.slice(1)) {
		if (RUN_CLASS.has(seg.name)) continue;
		if (seg.name === "skip") return refuse("skipped", "carries .skip");
		if (seg.name === "todo") return refuse("todo", "carries .todo");
		if (seg.name === "fails") return refuse("fails", "carries .fails (polarity inverted)");
		if (seg.name === "only") return refuse("only", "carries .only");
		if (seg.name === "skipIf" || seg.name === "runIf") {
			const arg = seg.args?.[0];
			const kind = arg?.kind;
			const isTrue = kind === ts.SyntaxKind.TrueKeyword;
			const isFalse = kind === ts.SyntaxKind.FalseKeyword;
			if (!isTrue && !isFalse) return refuse("undecidable-condition", `${seg.name}(...) condition is not a literal`);
			if (seg.name === "skipIf" && isTrue) return refuse("skip-if-true", "skipIf(true) parks the case");
			if (seg.name === "runIf" && isFalse) return refuse("run-if-false", "runIf(false) parks the case");
			continue;
		}
		return refuse("unrecognised-registration", `unrecognised modifier .${seg.name}`);
	}
	return LIVE;
}

const FLAG_OPTIONS = new Set(["skip", "todo", "fails", "only"]);

/** Options objects among the call arguments may not set skip/todo/fails/only (nor be opaque). */
function optionsProblem(call: ts.CallExpression): Verdict {
	for (const arg of call.arguments) {
		if (!ts.isObjectLiteralExpression(arg)) continue;
		for (const prop of arg.properties) {
			if (ts.isSpreadAssignment(prop)) return refuse("option-flag", "options object spreads an opaque value");
			const name = prop.name !== undefined && (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) ? prop.name.text : undefined;
			if (name === undefined || !FLAG_OPTIONS.has(name)) continue;
			if (ts.isPropertyAssignment(prop) && prop.initializer.kind === ts.SyntaxKind.FalseKeyword) continue;
			return refuse("option-flag", `options object sets ${name}`);
		}
	}
	return LIVE;
}

const titleOf = (call: ts.CallExpression): string | undefined => {
	const first = call.arguments[0];
	return first !== undefined && (ts.isStringLiteral(first) || ts.isNoSubstitutionTemplateLiteral(first)) ? first.text : undefined;
};

function walk(node: ts.Node, visit: (n: ts.Node) => void): void {
	visit(node);
	ts.forEachChild(node, (child) => walk(child, visit));
}

function cases(sf: ts.SourceFile, bindings: ReadonlyMap<string, string>, title: string): ts.CallExpression[] {
	const found: ts.CallExpression[] = [];
	walk(sf, (n) => {
		if (!ts.isCallExpression(n) || titleOf(n) !== title) return;
		const chain = chainOf(n.expression);
		if (chain !== undefined && kindOf(chain, bindings) === "case") found.push(n);
	});
	return found;
}

function callbackSkips(call: ts.CallExpression): boolean {
	let skips = false;
	for (const arg of call.arguments) {
		if (!ts.isArrowFunction(arg) && !ts.isFunctionExpression(arg)) continue;
		walk(arg.body, (n) => {
			if (!ts.isCallExpression(n)) return;
			const callee = n.expression;
			if ((ts.isIdentifier(callee) && callee.text === "skip") || (ts.isPropertyAccessExpression(callee) && callee.name.text === "skip")) skips = true;
		});
	}
	return skips;
}

/** Walk from a registration up to the module: only vitest suite callbacks may sit between. */
function ancestry(call: ts.CallExpression, bindings: ReadonlyMap<string, string>): Verdict {
	let node: ts.Node = call;
	for (;;) {
		const parent: ts.Node | undefined = node.parent;
		if (parent === undefined) return LIVE;
		if (ts.isSourceFile(parent)) return LIVE;
		if (ts.isExpressionStatement(parent) || ts.isBlock(parent)) {
			node = parent;
			continue;
		}
		if (ts.isArrowFunction(parent) || ts.isFunctionExpression(parent)) {
			const owner: ts.Node | undefined = parent.parent;
			if (owner === undefined || !ts.isCallExpression(owner) || !owner.arguments.some((a) => a === parent)) {
				return refuse("indirect-registration", "registered inside a function that is not a suite callback (it may never be called)");
			}
			const chain = chainOf(owner.expression);
			if (chain === undefined) return refuse("unrecognised-registration", "enclosing call has an unreadable callee");
			const kind = kindOf(chain, bindings);
			if (kind === undefined) {
				return refuse("unrecognised-registration", `enclosing call ${chain.map((s) => s.name).join(".")}(...) is not a vitest registration (alias or wrapper)`);
			}
			if (kind === "case") return refuse("indirect-registration", "registered inside another case");
			const problem = chainProblem(chain);
			if (!problem.ok) return refuse("enclosing-suite", `enclosing suite ${problem.detail}`);
			const opts = optionsProblem(owner);
			if (!opts.ok) return refuse("enclosing-suite", `enclosing suite ${opts.detail}`);
			node = owner;
			continue;
		}
		if (ts.isIfStatement(parent) || ts.isConditionalExpression(parent) || ts.isSwitchStatement(parent) || ts.isCaseClause(parent) || ts.isBinaryExpression(parent)) {
			return refuse("conditional-registration", "registered under a conditional");
		}
		return refuse("indirect-registration", `registered under ${ts.SyntaxKind[parent.kind]}`);
	}
}

/** Is exactly one live registration of `title` present in `source`? */
function assessPin(source: string, title: string): Verdict {
	const sf = ts.createSourceFile("pinned.test.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
	const bindings = vitestBindings(sf);
	const found = cases(sf, bindings, title);
	if (found.length === 0) return refuse("missing", "no registration call with this exact title");
	if (found.length > 1) return refuse("duplicate", `${found.length} registrations share this title`);
	const call = found[0];
	if (call === undefined) return refuse("missing", "no registration call with this exact title");
	const chain = chainOf(call.expression);
	if (chain === undefined) return refuse("unrecognised-registration", "unreadable callee");
	const own = chainProblem(chain);
	if (!own.ok) return own;
	const opts = optionsProblem(call);
	if (!opts.ok) return opts;
	if (callbackSkips(call)) return refuse("context-skip", "the case body calls skip()");
	return ancestry(call, bindings);
}

const failureMessage = (row: string, which: Which, p: Pin, v: Exclude<Verdict, { ok: true }>): string =>
	`${row} / ${which} -> ${p.file} "${p.title}": [${v.mode}] ${v.detail}`;

// ---------------------------------------------------------------------------------------------
// U3: tier truth against forge.toml and the vitest config modules
// ---------------------------------------------------------------------------------------------

interface VitestSelection {
	readonly test?: { readonly include?: readonly string[]; readonly exclude?: readonly string[] };
}
const selection = (config: unknown): VitestSelection => config as VitestSelection;

/** Would this vitest config module run `file`? include must match and no exclude may. */
function selects(config: unknown, file: string): boolean {
	const test = selection(config).test;
	const include = test?.include ?? [];
	const exclude = test?.exclude ?? [];
	return include.some((g) => matchesGlob(file, g)) && !exclude.some((g) => matchesGlob(file, g));
}

type TierName = Exclude<Tier, "default-gate">;
interface TierEnv {
	readonly defaultConfig: unknown;
	readonly tierConfigs: Readonly<Record<TierName, unknown>>;
	readonly forgeToml: string;
}
/** Tier label -> the vitest config file its forge.toml command must name. */
const TIER_CONFIG_FILE: Readonly<Record<TierName, string>> = {
	"furnace-observe": "vitest.furnace.config.ts",
	"native-read": "vitest.native.config.ts",
	"rf-preview": "vitest.rf.config.ts",
};

function forgeCommand(toml: string, name: string): string | undefined {
	const lines = toml.split("\n");
	const at = lines.indexOf(`[build.commands.${name}]`);
	if (at < 0) return undefined;
	for (const line of lines.slice(at + 1)) {
		if (line.startsWith("[")) return undefined;
		const m = /^command\s*=\s*"([^"]*)"/.exec(line);
		if (m !== null) return m[1];
	}
	return undefined;
}

/** Returns a problem text, or undefined when the label is true for `file`. */
function tierProblem(tier: Tier, file: string, env: TierEnv): string | undefined {
	if (tier === "default-gate") {
		return selects(env.defaultConfig, file) ? undefined : "tier default-gate but vitest.config.ts does not select the file (excluded or not included)";
	}
	const configFile = TIER_CONFIG_FILE[tier];
	if (configFile === undefined) return `tier ${String(tier)} is not a known forge.toml command`;
	const command = forgeCommand(env.forgeToml, tier);
	if (command === undefined) return `forge.toml has no [build.commands.${tier}] command`;
	if (!command.includes(`--config ${configFile}`)) return `forge.toml [build.commands.${tier}] runs "${command}", not --config ${configFile}`;
	if (!selects(env.tierConfigs[tier], file)) return `${configFile} does not select the file`;
	if (selects(env.defaultConfig, file)) return "the default config also selects the file, so the label does not describe where it runs";
	return undefined;
}

const realEnv = (): TierEnv => ({
	defaultConfig,
	tierConfigs: { "furnace-observe": furnaceConfig, "native-read": nativeConfig, "rf-preview": rfConfig },
	forgeToml: read("forge.toml"),
});

// ---------------------------------------------------------------------------------------------
// U4: the whole docs/14 section, slice-equal
// ---------------------------------------------------------------------------------------------

const MATRIX_HEADING = "## Matrix by subsystem";
const MATRIX_HEADER = "| Subsystem | Positive proof | Negative control |";
const MATRIX_SEPARATOR = "| --- | --- | --- |";
const FALSIFIER_HEADING = "## Truth labels and release gates";
const FALSIFIER_SENTENCE = "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";

function sectionLines(doc: string, heading: string): string[] | undefined {
	const lines = doc.split("\n");
	const at = lines.indexOf(heading);
	if (at < 0) return undefined;
	const end = lines.findIndex((l, i) => i > at && /^#{1,2}\s/.test(l));
	return lines.slice(at + 1, end < 0 ? lines.length : end);
}

/** Problems with the docs matrix section against the census rows; [] when slice-equal. */
function matrixProblems(doc: string, rows: readonly Row[]): string[] {
	const headings = doc.split("\n").filter((l) => /^#{1,6}\s+Matrix by subsystem/.test(l));
	if (headings.length !== 1 || headings[0] !== MATRIX_HEADING) {
		return [`heading must be exactly one level-2 "${MATRIX_HEADING}" line, found ${JSON.stringify(headings)}`];
	}
	const body = (sectionLines(doc, MATRIX_HEADING) ?? []).filter((l) => l.trim() !== "");
	const expected = [MATRIX_HEADER, MATRIX_SEPARATOR, ...rows.map((r) => `| ${r.subsystem} | ${r.positive.quote} | ${r.negative.quote} |`)];
	const problems: string[] = [];
	if (body.length !== expected.length) problems.push(`section holds ${body.length} non-blank lines, census expects ${expected.length}`);
	expected.forEach((line, i) => {
		const got = body[i];
		if (got !== line) problems.push(`line ${i + 1}: expected ${JSON.stringify(line)}, found ${JSON.stringify(got)}`);
	});
	for (const [i, line] of body.entries()) {
		const columns = line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").length;
		if (!line.trim().startsWith("|") || columns !== 3) problems.push(`line ${i + 1} is not a three-column table row`);
	}
	return problems;
}

function falsifierProblems(doc: string): string[] {
	const body = sectionLines(doc, FALSIFIER_HEADING);
	if (body === undefined) return [`${DOC} lost "${FALSIFIER_HEADING}"`];
	return body.join("\n").includes(FALSIFIER_SENTENCE) ? [] : [`"${FALSIFIER_HEADING}" no longer carries the spec-quoted falsifier sentence`];
}

// ---------------------------------------------------------------------------------------------
// Census self-consistency
// ---------------------------------------------------------------------------------------------

function censusProblems(rows: readonly Row[]): string[] {
	const problems: string[] = [];
	const unpinned: Array<{ name: string; reason: string }> = [];
	if (rows.length !== 13) problems.push(`census holds ${rows.length} rows, docs/14 has thirteen`);
	for (const row of rows) {
		for (const [which, cell] of cellsOf(row)) {
			const cellName = `${row.subsystem} / ${which}`;
			if (cell.parts.map((p) => p.claim).join("; ") !== cell.quote) problems.push(`${cellName}: parts do not rebuild the quoted cell`);
			for (const part of cell.parts) {
				const name = `${cellName} / ${part.claim}`;
				if (part.status === "pinned") {
					if (part.pins.length === 0) problems.push(`${name}: pinned with no pins`);
					if (part.reason !== undefined) problems.push(`${name}: a pinned part carries no reason`);
				} else {
					if (part.pins.length > 0) problems.push(`${name}: unpinned parts carry no pins`);
					unpinned.push({ name, reason: part.reason ?? "" });
				}
			}
		}
	}
	for (const u of unpinned) {
		if (u.reason.length <= 10) problems.push(`${u.name}: an unpinned part needs a stated reason`);
		const expected = EXPECTED_UNPINNED.find((e) => e.name === u.name);
		if (expected === undefined) problems.push(`${u.name}: unexpected unpinned part (a census edit must name it in EXPECTED_UNPINNED)`);
		else if (!u.reason.includes(expected.reasonIncludes)) problems.push(`${u.name}: reason lost "${expected.reasonIncludes}"`);
	}
	for (const e of EXPECTED_UNPINNED) {
		if (!unpinned.some((u) => u.name === e.name)) problems.push(`${e.name}: expected unpinned but is now classified otherwise`);
	}
	return problems;
}

// ---------------------------------------------------------------------------------------------
// Real-file mutation helpers (scratch strings only; no file is ever written)
// ---------------------------------------------------------------------------------------------

interface CaseSite {
	readonly sf: ts.SourceFile;
	readonly call: ts.CallExpression;
	/** The enclosing statement: the unit a mutant replaces. */
	readonly start: number;
	readonly end: number;
	readonly text: string;
}

function site(source: string, title: string): CaseSite {
	const sf = ts.createSourceFile("pinned.test.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
	const found = cases(sf, vitestBindings(sf), title);
	const call = found[0];
	if (found.length !== 1 || call === undefined) throw new Error(`mutation base: expected exactly one case titled ${JSON.stringify(title)}, found ${found.length}`);
	const stmt = ts.isExpressionStatement(call.parent) ? call.parent : call;
	const start = stmt.getStart(sf);
	return { sf, call, start, end: stmt.end, text: source.slice(start, stmt.end) };
}

const edit = (source: string, s: CaseSite, replacement: string): string => source.slice(0, s.start) + replacement + source.slice(s.end);
const rel = (s: CaseSite, pos: number): number => pos - s.start;
const insertInto = (s: CaseSite, pos: number, text: string): string => s.text.slice(0, rel(s, pos)) + text + s.text.slice(rel(s, pos));

function rootIdentifier(expr: ts.Expression): ts.Identifier {
	let cur: ts.Expression = expr;
	while (!ts.isIdentifier(cur)) {
		if (ts.isPropertyAccessExpression(cur) || ts.isCallExpression(cur)) cur = cur.expression;
		else throw new Error("mutation base: callee has no identifier root");
	}
	return cur;
}

function enclosingSuite(s: CaseSite): ts.CallExpression {
	const bindings = vitestBindings(s.sf);
	for (let n: ts.Node | undefined = s.call.parent; n !== undefined; n = n.parent) {
		if (!ts.isCallExpression(n)) continue;
		const chain = chainOf(n.expression);
		if (chain !== undefined && kindOf(chain, bindings) === "suite") return n;
	}
	throw new Error("mutation base: case has no enclosing suite");
}

function callbackOf(call: ts.CallExpression): ts.ArrowFunction | ts.FunctionExpression {
	for (const arg of call.arguments) if (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) return arg;
	throw new Error("mutation base: case has no callback");
}

function guardBlockComment(text: string): string {
	if (text.includes("*/")) throw new Error("mutation base: case text already holds a block-comment terminator");
	return text;
}

const rename = (source: string, title: string): string => {
	const s = site(source, title);
	const first = s.call.arguments[0];
	if (first === undefined) throw new Error("mutation base: no title argument");
	return edit(source, s, s.text.slice(0, rel(s, first.getStart(s.sf))) + JSON.stringify(`${title} (renamed)`) + s.text.slice(rel(s, first.end)));
};
const remove = (source: string, title: string): string => edit(source, site(source, title), "");
const skipCase = (source: string, title: string): string => {
	const s = site(source, title);
	return edit(source, s, insertInto(s, rootIdentifier(s.call.expression).end, ".skip"));
};

interface Mutant {
	readonly id: string;
	readonly mode: Mode;
	readonly apply: (source: string, title: string) => string;
}

const withTitleOption = (flag: string) => (source: string, title: string): string => {
	const s = site(source, title);
	const first = s.call.arguments[0];
	if (first === undefined) throw new Error("mutation base: no title argument");
	return edit(source, s, insertInto(s, first.end, `, { ${flag}: true }`));
};
const modifier = (suffix: string) => (source: string, title: string): string => {
	const s = site(source, title);
	return edit(source, s, insertInto(s, rootIdentifier(s.call.expression).end, suffix));
};
const wrap = (head: string, tail = "\n});") => (source: string, title: string): string => {
	const s = site(source, title);
	return edit(source, s, `${head}\n${s.text}${tail}`);
};
const withContext = (param: string, stmt: string) => (source: string, title: string): string => {
	const s = site(source, title);
	const fn = callbackOf(s.call);
	const bodyStart = fn.body.getStart(s.sf);
	const params = fn.parameters.length === 0 ? { from: fn.getStart(s.sf), to: bodyStart } : undefined;
	if (params === undefined) throw new Error("mutation base: callback already takes parameters");
	const head = s.text.slice(0, rel(s, params.from));
	const sig = s.text.slice(rel(s, params.from), rel(s, params.to)).replace(/\(\s*\)/, param);
	const body = s.text.slice(rel(s, bodyStart));
	return edit(source, s, `${head}${sig}${body.replace("{", `{ ${stmt}`)}`);
};
const prependLine = (line: string, inner: (source: string, title: string) => string) => (source: string, title: string): string => `${line}\n${inner(source, title)}`;

/** U2: one falsifier per skip mode, applied to real pinned source. */
const SKIP_MODES: readonly Mutant[] = [
	{ id: "S1 line comment-out", mode: "missing", apply: (src, t) => { const s = site(src, t); return edit(src, s, s.text.split("\n").map((l) => `// ${l}`).join("\n")); } },
	{ id: "S2 block comment at line start", mode: "missing", apply: (src, t) => { const s = site(src, t); return edit(src, s, `/*\n${guardBlockComment(s.text)}\n*/`); } },
	{
		id: "S3 block comment opened mid-line on the previous line",
		mode: "missing",
		apply: (src, t) => {
			const s = site(src, t);
			return `${src.slice(0, s.start).replace(/\n([ \t]*)$/, " /* parked\n$1")}${guardBlockComment(s.text)} */${src.slice(s.end)}`;
		},
	},
	{ id: "S4 options {skip:true}", mode: "option-flag", apply: withTitleOption("skip") },
	{ id: "S5 options {todo:true}", mode: "option-flag", apply: withTitleOption("todo") },
	{ id: "S6 options {fails:true}", mode: "option-flag", apply: withTitleOption("fails") },
	{
		id: "S7 enclosing describe.skip",
		mode: "enclosing-suite",
		apply: (src, t) => {
			const suite = enclosingSuite(site(src, t));
			return `${src.slice(0, suite.expression.end)}.skip${src.slice(suite.expression.end)}`;
		},
	},
	{
		id: "S8 describe options {skip:true}",
		mode: "enclosing-suite",
		apply: (src, t) => {
			const first = enclosingSuite(site(src, t)).arguments[0];
			if (first === undefined) throw new Error("mutation base: suite has no title");
			return `${src.slice(0, first.end)}, { skip: true }${src.slice(first.end)}`;
		},
	},
	{ id: "S9 suite.skip alias", mode: "enclosing-suite", apply: prependLine('import { suite } from "vitest";', wrap('suite.skip("parked", () => {')) },
	{ id: "S10 aliased describe (const parkedSuite = describe.skip)", mode: "unrecognised-registration", apply: prependLine("const parkedSuite = describe.skip;", wrap('parkedSuite("parked", () => {')) },
	{ id: "S11 ctx.skip()", mode: "context-skip", apply: withContext("(ctx)", "ctx.skip();") },
	{ id: "S12 destructured skip()", mode: "context-skip", apply: withContext("({ skip })", "skip();") },
	{ id: "S13 conditional registration", mode: "conditional-registration", apply: wrap('if (process.env.WB_CAX25_PARKED === "1") {', "\n}") },
	{ id: "S14 never-called wrapper", mode: "indirect-registration", apply: wrap("function parkedCases(): void {", "\n}") },
	{ id: "S15 case deleted, title kept as a string decoy", mode: "missing", apply: (src, t) => edit(src, site(src, t), `const decoy: string = ${JSON.stringify(`expected: ${t}`)};`) },
	{ id: "S16 same-indent describe.skip wrapper", mode: "enclosing-suite", apply: wrap('describe.skip("parked", () => {') },
];

/** C1-C8: the classic single-edit mutants. */
const CLASSIC: readonly Mutant[] = [
	{ id: "C1 it.skip", mode: "skipped", apply: modifier(".skip") },
	{ id: "C2 rename", mode: "missing", apply: rename },
	{ id: "C3 delete", mode: "missing", apply: remove },
	{ id: "C4 it.todo", mode: "todo", apply: modifier(".todo") },
	{ id: "C5 it.only", mode: "only", apply: modifier(".only") },
	{ id: "C6 it.fails", mode: "fails", apply: modifier(".fails") },
	{ id: "C7 it.skipIf(true)", mode: "skip-if-true", apply: modifier(".skipIf(true)") },
	{ id: "C8 duplicate", mode: "duplicate", apply: (src, t) => { const s = site(src, t); return edit(src, s, `${s.text}\n${s.text}`); } },
	{ id: "C9 it.runIf(false)", mode: "run-if-false", apply: modifier(".runIf(false)") },
	{ id: "C10 it.skipIf(variable)", mode: "undecidable-condition", apply: modifier(".skipIf(process.env.WB_CAX25_PARKED)") },
];

/** P1-P3: run-class modifiers still run, so they stay green. */
const RUN_CLASS_CONTROLS: readonly { readonly id: string; readonly apply: (source: string, title: string) => string }[] = [
	{ id: "P1 it.concurrent", apply: modifier(".concurrent") },
	{ id: "P2 it.runIf(true)", apply: modifier(".runIf(true)") },
	{ id: "P3 it.skipIf(false)", apply: modifier(".skipIf(false)") },
];

const SECURITY_FILE = "test/workbench-registry-auth.test.ts";
const SECURITY_TITLE = "closes the script-side raw RPC vehicle while host authorization stays typed";

function expectRed(v: Verdict, mode: Mode, name: string, p: Pin): void {
	expect(v.ok, `${name}: the mutant must go red`).toBe(false);
	if (v.ok) return;
	expect(v.mode, `${name}: wrong mode`).toBe(mode);
	const message = failureMessage("Security", "negative", p, v);
	expect(message).toContain("Security / negative");
	expect(message).toContain(p.file);
	expect(message).toContain(p.title);
	expect(message).toContain(`[${mode}]`);
}

describe("docs/14 matrix by subsystem census", () => {
	it("holds exactly thirteen rows, 26 cells and the declared pin count", () => {
		expect(ROWS).toHaveLength(13);
		expect(ROWS.flatMap(cellsOf)).toHaveLength(26);
		expect(allPins(ROWS)).toHaveLength(PIN_COUNT);
	});

	it("is self-consistent: parts rebuild each quoted cell, pinned parts have pins, unpinned parts carry the expected reasons", () => {
		expect(censusProblems(ROWS)).toEqual([]);
	});

	it("keeps the whole docs/14 matrix section slice-equal to the census, and the falsifier sentence in place", () => {
		const doc = read(DOC);
		expect(matrixProblems(doc, ROWS), `${DOC} matrix section drifted from the census`).toEqual([]);
		expect(falsifierProblems(doc), `${DOC} falsifier sentence drifted`).toEqual([]);
	});

	describe("every pinned case is live, truthfully tiered, and its mutants go red", () => {
		const env = realEnv();
		for (const { row, which, pin: p } of allPins(ROWS)) {
			it(`${row.subsystem} / ${which}: ${p.file} "${p.title}" [${p.tier}]`, () => {
				const source = read(p.file);
				const verdict = assessPin(source, p.title);
				expect(verdict.ok ? "live" : failureMessage(row.subsystem, which, p, verdict)).toBe("live");
				expect(tierProblem(p.tier, p.file, env), `${row.subsystem} / ${which} -> ${p.file}: tier ${p.tier}`).toBeUndefined();
				for (const [id, mutated] of [
					["rename", rename(source, p.title)],
					["delete", remove(source, p.title)],
					["skip", skipCase(source, p.title)],
				] as const) {
					const after = assessPin(mutated, p.title);
					expect(after.ok, `${row.subsystem} / ${which} -> ${p.file} "${p.title}": ${id} mutant stayed green`).toBe(false);
				}
			});
		}
	});

	describe("U2: every skip mode and classic mutant on the Security/negative pin is red, naming row, cell, file, title and mode", () => {
		const p = pin("workbench-registry-auth.test.ts", SECURITY_TITLE);
		const source = read(SECURITY_FILE);
		it("the unmutated pin is live", () => {
			expect(assessPin(source, SECURITY_TITLE)).toEqual({ ok: true });
		});
		for (const m of [...CLASSIC, ...SKIP_MODES]) {
			it(`${m.id} -> ${m.mode}`, () => {
				expectRed(assessPin(m.apply(source, SECURITY_TITLE), SECURITY_TITLE), m.mode, m.id, p);
			});
		}
		for (const c of RUN_CLASS_CONTROLS) {
			it(`${c.id} still runs, so it stays green`, () => {
				expect(assessPin(c.apply(source, SECURITY_TITLE), SECURITY_TITLE)).toEqual({ ok: true });
			});
		}
		it("a title that is not a registration call cannot be satisfied by a string, a comment or a template with substitutions", () => {
			const sample = ['import { it } from "vitest";', "// it('ghost', () => {});", "const label = \"it('ghost', () => {})\";", "it(`ghost $" + "{label}`, () => {});"].join("\n");
			expect(assessPin(sample, "ghost")).toMatchObject({ ok: false, mode: "missing" });
		});
	});

	describe("U3: tier labels are checked against forge.toml and the vitest config modules", () => {
		const env = realEnv();
		const rfFile = "test/workbench-native-rf-preview.test.ts";
		const furnaceFile = "test/workbench-external-furnace.test.ts";
		const withDefault = (patch: { include?: readonly string[]; exclude?: readonly string[] }): TierEnv => ({
			...env,
			defaultConfig: { test: { ...selection(defaultConfig).test, ...patch } },
		});
		it("holds for the real tree", () => {
			expect(tierProblem("default-gate", SECURITY_FILE, env)).toBeUndefined();
			expect(tierProblem("furnace-observe", furnaceFile, env)).toBeUndefined();
			expect(tierProblem("rf-preview", rfFile, env)).toBeUndefined();
			expect(tierProblem("native-read", "test/workbench-native-ecosystem.test.ts", env)).toBeUndefined();
		});
		it("T1 a glob exclude of the pinned file goes red", () => {
			const exclude = [...(selection(defaultConfig).test?.exclude ?? []), "test/workbench-registry-*.test.ts"];
			expect(tierProblem("default-gate", SECURITY_FILE, withDefault({ exclude }))).toMatch(/does not select/);
		});
		it("T2 a single-quoted exclude entry is the same exclude (modules, not text)", () => {
			const exclude = [...(selection(defaultConfig).test?.exclude ?? []), SECURITY_FILE];
			expect(tierProblem("default-gate", SECURITY_FILE, withDefault({ exclude }))).toMatch(/does not select/);
		});
		it("T3 an include narrowed so the pinned file is not selected goes red", () => {
			expect(tierProblem("default-gate", SECURITY_FILE, withDefault({ include: ["test/workflow-*.test.ts"] }))).toMatch(/does not select/);
		});
		it("T4 the rf-preview pin moved from the rf include into its exclude goes red", () => {
			const moved: TierEnv = { ...env, tierConfigs: { ...env.tierConfigs, "rf-preview": { test: { include: [], exclude: [rfFile] } } } };
			expect(tierProblem("rf-preview", rfFile, moved)).toMatch(/does not select/);
		});
		it("T5 a forge.toml command that names another config makes the label false", () => {
			const forgeToml = env.forgeToml.replace(/(\[build\.commands\.furnace-observe\]\ncommand = "[^"]*)vitest\.furnace\.config\.ts/, "$1vitest.furnace-active.config.ts");
			expect(forgeToml).not.toBe(env.forgeToml);
			expect(tierProblem("furnace-observe", furnaceFile, { ...env, forgeToml })).toMatch(/not --config vitest\.furnace\.config\.ts/);
		});
		it("T6 the furnace-active-observe label is false for the external-furnace file", () => {
			expect(tierProblem("furnace-active-observe" as unknown as Tier, furnaceFile, env)).toMatch(/not a known forge\.toml command/);
		});
		it("T7 a tier whose file the default gate also runs is mislabelled", () => {
			expect(tierProblem("rf-preview", SECURITY_FILE, { ...env, tierConfigs: { ...env.tierConfigs, "rf-preview": { test: { include: [SECURITY_FILE] } } } })).toMatch(/default config also selects/);
		});
	});

	describe("U4: the docs section is bounded, not scanned", () => {
		const doc = read(DOC);
		const line = (needle: string): string => {
			const found = doc.split("\n").find((l) => l.startsWith(needle));
			if (found === undefined) throw new Error(`docs base: no line starting ${needle}`);
			return found;
		};
		const mutants: ReadonlyArray<readonly [string, string]> = [
			["D1 header 'Negative control' renamed", doc.replace(MATRIX_HEADER, "| Subsystem | Positive proof | Negative controls |")],
			["D2 a fourth 'waived' column", doc.replace(MATRIX_HEADER, "| Subsystem | Positive proof | Negative control | Waived |")],
			["D3 a weakening paragraph in the section", doc.replace(line("| Designer |"), `${line("| Designer |")}\n\nThis matrix is advisory only.`)],
			["D4 heading retitled with a suffix", doc.replace(MATRIX_HEADING, `${MATRIX_HEADING} (waived)`)],
			["D5 heading demoted under a new level-2 heading", doc.replace(MATRIX_HEADING, "## Notes\n\n### Matrix by subsystem")],
			["DC1 cell paraphrase", doc.replace("partial/unknown not known-empty", "partial or unknown not known-empty")],
			["DC2 row delete", doc.replace(`${line("| HX |")}\n`, "")],
			["DC3 row swap", doc.replace(line("| HX |"), "@@HX@@").replace(line("| RF |"), line("| HX |")).replace("@@HX@@", line("| RF |"))],
		];
		it("the real section is slice-equal", () => {
			expect(matrixProblems(doc, ROWS)).toEqual([]);
		});
		for (const [id, mutated] of mutants) {
			it(`${id} goes red`, () => {
				expect(mutated).not.toBe(doc);
				expect(matrixProblems(mutated, ROWS).length, id).toBeGreaterThan(0);
			});
		}
		it("D6 a weakened falsifier sentence goes red", () => {
			const weak = doc.replace("must have a falsifier", "should have a falsifier");
			expect(weak).not.toBe(doc);
			expect(falsifierProblems(weak).length).toBeGreaterThan(0);
		});
	});

	describe("U5: unpinned and split parts are asserted, never passed", () => {
		const swap = (name: string, patch: (r: Row) => Row): readonly Row[] => ROWS.map((r) => (r.subsystem === name ? patch(r) : r));
		const furnaceNegative = (r: Row, parts: readonly Part[]): Row => ({ ...r, negative: { ...r.negative, parts } });
		it("H1 deleting the Furnace unpinned reason goes red", () => {
			const rows = swap("Furnace", (r) => furnaceNegative(r, r.negative.parts.map((p) => (p.status === "unpinned" ? { ...p, reason: "" } : p))));
			expect(censusProblems(rows).join("\n")).toMatch(/Furnace \/ negative \/ ambiguous start no duplicate: an unpinned part needs a stated reason/);
		});
		it("H2 a reason that lost its tracked bead goes red", () => {
			const rows = swap("MechanicalWorkflows", (r) => ({ ...r, positive: { ...r.positive, parts: r.positive.parts.map((p) => ({ ...p, reason: "blocked for unspecified reasons" })) } }));
			expect(censusProblems(rows).join("\n")).toMatch(/reason lost "wb-04s"/);
		});
		it("H3 silently pinning an expected-unpinned part goes red", () => {
			const rows = swap("Furnace", (r) =>
				furnaceNegative(
					r,
					r.negative.parts.map((p) => (p.status === "unpinned" ? pinnedPart(p.claim, [pin("workbench-furnace-control.test.ts", "x")]) : p)),
				),
			);
			expect(censusProblems(rows).join("\n")).toMatch(/expected unpinned but is now classified otherwise/);
		});
		it("H4 silently unpinning a pinned part goes red", () => {
			const rows = swap("Forge", (r) => ({ ...r, positive: { ...r.positive, parts: r.positive.parts.map((p) => unpinnedPart(p.claim, "parked without a tracked reason")) } }));
			expect(censusProblems(rows).join("\n")).toMatch(/unexpected unpinned part/);
		});
		it("H5 parts that no longer rebuild the quoted cell go red", () => {
			const rows = swap("Furnace", (r) => furnaceNegative(r, r.negative.parts.slice(0, 1)));
			expect(censusProblems(rows).join("\n")).toMatch(/parts do not rebuild the quoted cell/);
		});
		it("H6 a deleted row goes red", () => {
			expect(censusProblems(ROWS.slice(1)).join("\n")).toMatch(/census holds 12 rows/);
		});
		it("lists exactly the three unpinned parts, each with its reason", () => {
			const names = ROWS.flatMap((row) => cellsOf(row).flatMap(([which, cell]) => cell.parts.filter((p) => p.status === "unpinned").map((p) => `${row.subsystem} / ${which} / ${p.claim}`)));
			expect(names).toEqual(EXPECTED_UNPINNED.map((e) => e.name));
		});
	});
});
