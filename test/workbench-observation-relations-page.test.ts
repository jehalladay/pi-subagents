import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import {
	type NativeRef,
	type ObservationLimits,
	ObservationProjection,
	type ObservationScope,
	type Relation,
	type RelationKind,
	type RelationPage,
} from "../src/workbench/observation.js";

// wb-6ze.27: relationsPage() reports relation-page truncation beside a byte-identical relations().
const alice: ObservationScope = { workspace: "ws-1", principal: "alice" };
const bob: ObservationScope = { workspace: "ws-1", principal: "bob" };
const other: ObservationScope = { workspace: "ws-2", principal: "alice" };
const OBSERVED_AT = "2026-10-15T00:00:01Z";
const ref = (id: string): NativeRef => ({ provider: "forge", type: "run", id });
const keyOf = (scope: ObservationScope, id: string): string => JSON.stringify([scope.workspace, scope.principal, "forge", "run", "", id]);
const KINDS: readonly RelationKind[] = ["dependency", "causation", "ownership", "grouping", "hypothesis"];

const projection = (limits?: ObservationLimits): ObservationProjection => new ObservationProjection(limits);
/** relate() accepts ownership only from the owner's own provider with a native confirmation reference. */
const provenanceOf = (kind: RelationKind, source: string): Relation["provenance"] =>
	kind === "ownership" ? { source: "forge", observedAt: OBSERVED_AT, nativeConfirmationRef: `forge:owner:${source}` } : { source, observedAt: OBSERVED_AT };
const link = (view: ObservationProjection, scope: ObservationScope, from: string, to: string, kind: RelationKind = "dependency", source = "declared"): void =>
	view.relate({ scope, from: ref(from), to: ref(to), kind, provenance: provenanceOf(kind, source) });
const outsideScope = (scope: ObservationScope, key: string | undefined): boolean => {
	if (key === undefined) return false;
	const [workspace, principal] = JSON.parse(key) as string[];
	return workspace !== scope.workspace || principal !== scope.principal;
};

describe("A1 docs/workbench/09 § Experimental projection implementation: reported relation-page truncation", () => {
	// "Query indexes cover native references, invocation, typed relations, source basis, status kind, evidence, version and intervals."
	it("reports truncation only when a further matching edge exists past the page", () => {
		const three = projection({ maxQuery: 2 });
		for (const to of ["b1", "b2", "b3"]) link(three, alice, "a", to);
		const page = three.relationsPage({ scope: alice, from: keyOf(alice, "a"), limit: 100 });
		expect(page.relations).toHaveLength(2);
		expect(page.truncated).toBe(true);
		expect(page.limitApplied).toBe(2);

		const two = projection({ maxQuery: 2 });
		for (const to of ["b1", "b2"]) link(two, alice, "a", to);
		const exact = two.relationsPage({ scope: alice, from: keyOf(alice, "a"), limit: 100 });
		expect(exact.relations).toHaveLength(2);
		expect(exact.truncated).toBe(false);

		const wide = projection({ maxQuery: 100 });
		for (const to of ["b1", "b2", "b3"]) link(wide, alice, "a", to);
		const full = wide.relationsPage({ scope: alice, from: keyOf(alice, "a"), limit: 3 });
		expect(full.truncated).toBe(false);
		expect(full.limitApplied).toBe(3);
	});

	it("matches relations() byte for byte and reports truncation per the matching count over limits x edge counts x selectors", () => {
		for (let limit = 1; limit <= 5; limit++) {
			for (let edges = 0; edges <= 5; edges++) {
				for (const selector of ["from", "to", "scope"] as const) {
					const view = projection({ maxQuery: 100 });
					for (let i = 0; i < edges; i++) selector === "to" ? link(view, alice, `f${i}`, "hub") : link(view, alice, "hub", `t${i}`);
					link(view, alice, "noise", "other-noise");
					const input = selector === "from" ? { scope: alice, from: keyOf(alice, "hub"), limit } : selector === "to" ? { scope: alice, to: keyOf(alice, "hub"), limit } : { scope: alice, limit };
					const matching = selector === "scope" ? edges + 1 : edges;
					const page = view.relationsPage(input);
					expect(page.truncated).toBe(matching > page.relations.length);
					expect(page.relations).toHaveLength(Math.min(matching, limit));
					expect(page.limitApplied).toBe(limit);
					expect(view.relations(input)).toEqual(page.relations);
				}
			}
		}
	});

	it("under a clamping maxQuery the page reports the clamped limit and truncates only past the clamped page", () => {
		for (const maxQuery of [1, 2, 3]) {
			for (let limit = 1; limit <= 5; limit++) {
				for (let edges = 0; edges <= 5; edges++) {
					for (const selector of ["from", "to", "scope"] as const) {
						const view = projection({ maxQuery });
						for (let i = 0; i < edges; i++) selector === "to" ? link(view, alice, `f${i}`, "hub") : link(view, alice, "hub", `t${i}`);
						link(view, bob, "hub", "bob-only");
						const input = selector === "from" ? { scope: alice, from: keyOf(alice, "hub"), limit } : selector === "to" ? { scope: alice, to: keyOf(alice, "hub"), limit } : { scope: alice, limit };
						const applied = Math.min(limit, maxQuery);
						const page = view.relationsPage(input);
						expect(page.limitApplied).toBe(applied);
						expect(page.relations).toHaveLength(Math.min(edges, applied));
						expect(page.truncated).toBe(edges > applied);
						expect(page.examined).toBeGreaterThanOrEqual(page.relations.length + (page.truncated ? 1 : 0));
						expect(page.examined).toBeLessThanOrEqual(page.truncated ? applied + 1 : edges);
						expect(view.relations(input)).toEqual(page.relations);
						expect(view.relations({ ...input, limit: undefined })).toEqual(view.relationsPage({ ...input, limit: undefined }).relations);
					}
				}
			}
		}
	});

	it("rejects invalid limits like relations()", () => {
		const view = projection();
		for (const limit of [0, -1, 1.5, Number.NaN]) {
			expect(() => view.relationsPage({ scope: alice, limit })).toThrow(/Invalid relation query limit\./);
			expect(() => view.relations({ scope: alice, limit })).toThrow(/Invalid relation query limit\./);
		}
	});
});

describe("A2 docs/workbench/09 § Relationships are typed and provenanced and 10 § Four-view viewport increment: filter-aware, never fabricated", () => {
	// "Store edge provenance with timestamp and source; Graph view styles each differently. Missing edges do not imply independence."
	// "Missing edges, timestamps and evidence loaders are visible unknowns, never fabricated."
	it("never fabricates truncation from index bucket size when the exact filter excludes the surplus", () => {
		const view = projection();
		for (let i = 0; i < 5; i++) link(view, alice, "a", "c", "dependency", `s${i}`);
		link(view, alice, "a", "b");
		const page = view.relationsPage({ scope: alice, from: keyOf(alice, "a"), to: keyOf(alice, "b"), limit: 1 });
		expect(page.relations).toHaveLength(1);
		expect(page.relations[0]).toMatchObject({ from: keyOf(alice, "a"), to: keyOf(alice, "b"), kind: "dependency" });
		expect(page.truncated).toBe(false);
		expect(page.examined).toBeGreaterThanOrEqual(1);
		page.relations[0].provenance.source = "mutated";
		expect(view.relationsPage({ scope: alice, from: keyOf(alice, "a"), to: keyOf(alice, "b"), limit: 1 }).relations[0].provenance.source).toBe("declared");
	});

	it("every row carries its kind and a copied provenance, an ownership confirmation reference included", () => {
		const view = projection();
		link(view, alice, "owner", "child", "ownership", "o1");
		link(view, alice, "owner", "child");
		const input = { scope: alice, from: keyOf(alice, "owner"), to: keyOf(alice, "child") };
		const first = view.relationsPage(input);
		expect(first.relations).toEqual([
			{ from: keyOf(alice, "owner"), to: keyOf(alice, "child"), kind: "ownership", provenance: { source: "forge", observedAt: OBSERVED_AT, nativeConfirmationRef: "forge:owner:o1" } },
			{ from: keyOf(alice, "owner"), to: keyOf(alice, "child"), kind: "dependency", provenance: { source: "declared", observedAt: OBSERVED_AT } },
		]);
		expect(first.truncated).toBe(false);
		const before = JSON.stringify(first);
		for (const row of first.relations) {
			row.kind = "hypothesis";
			row.from = keyOf(alice, "elsewhere");
			row.provenance.source = "tampered";
			row.provenance.observedAt = "2026-10-16T00:00:00Z";
			row.provenance.nativeConfirmationRef = "tampered";
		}
		const later = view.relationsPage(input);
		expect(JSON.stringify(later)).toBe(before);
		expect(view.relations(input)).toEqual(later.relations);
	});
});

describe("A3 docs/workbench/14 § Matrix by subsystem (Observation): brute-force falsifier", () => {
	// Observation row: positive proof "snapshots, dedup, cursor resume, provenance", negative control "event loss -> stale and unknown".
	it("agrees with a brute-force reference over a seeded random edge set", () => {
		let seed = 0x9e3779b9;
		const rnd = (n: number): number => {
			seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
			return (seed >>> 8) % n;
		};
		const view = projection({ maxQuery: 7, maxEdges: 4_000 });
		const scopes = [alice, bob];
		const reference: Relation[] = [];
		const scopeIndex: ObservationScope[] = [];
		for (let i = 0; i < 400; i++) {
			const scope = scopes[rnd(2)];
			const from = `n${rnd(12)}`;
			const to = `n${rnd(12)}`;
			const kind = KINDS[rnd(KINDS.length)];
			const source = `s${rnd(3)}`;
			const before = view.stats().edges;
			link(view, scope, from, to, kind, source);
			if (view.stats().edges > before) {
				reference.push({ from: keyOf(scope, from), to: keyOf(scope, to), kind, provenance: provenanceOf(kind, source) });
				scopeIndex.push(scope);
			}
		}
		expect(reference.length).toBeGreaterThanOrEqual(200);
		expect(view.stats().edges).toBe(reference.length);
		expect(new Set(reference.map((edge) => edge.kind))).toEqual(new Set(KINDS));
		expect(new Set(scopeIndex)).toEqual(new Set(scopes));
		const pairs = new Map<string, number>();
		for (const edge of reference) pairs.set(JSON.stringify([edge.from, edge.to]), (pairs.get(JSON.stringify([edge.from, edge.to])) ?? 0) + 1);
		expect([...pairs.values()].filter((count) => count > 1).length).toBeGreaterThan(0);
		let truncatedSeen = 0;
		let exactFull = 0;
		let filteredSurplus = 0;
		let crossScoped = 0;
		for (let q = 0; q < 600; q++) {
			const scope = scopes[rnd(2)];
			const mode = rnd(4);
			const from = mode === 1 || mode === 3 ? keyOf(scopes[rnd(2)], `n${rnd(12)}`) : undefined;
			const to = mode === 2 || mode === 3 ? keyOf(scopes[rnd(2)], `n${rnd(12)}`) : undefined;
			const limit = 1 + rnd(10);
			const page = view.relationsPage({ scope, ...(from ? { from } : {}), ...(to ? { to } : {}), limit });
			const matches = reference.filter((_edge, i) => scopeIndex[i] === scope && (!from || reference[i].from === from) && (!to || reference[i].to === to));
			expect(page.limitApplied).toBe(Math.min(limit, 7));
			expect(page.relations.length).toBeLessThanOrEqual(page.limitApplied);
			expect(page.truncated).toBe(matches.length > page.relations.length);
			expect(page.relations).toHaveLength(Math.min(matches.length, page.limitApplied));
			for (const row of page.relations) expect(matches).toContainEqual(row);
			// The first limitApplied matching rows in index (insertion) order: the order relations() returned before this bead.
			expect(page.relations).toEqual(matches.slice(0, page.limitApplied));
			const crossScope = outsideScope(scope, from) || outsideScope(scope, to);
			if (crossScope) {
				expect(page).toEqual({ relations: [], examined: 0, truncated: false, limitApplied: page.limitApplied });
				crossScoped++;
			} else {
				// The index bucket the walk reads: outgoing for from, incoming for to, the scope's edges otherwise.
				const bucket = reference.filter((edge, i) => (from ? edge.from === from : to ? edge.to === to : scopeIndex[i] === scope));
				const positions = bucket.flatMap((edge, i) => ((!from || edge.from === from) && (!to || edge.to === to) ? [i + 1] : []));
				expect(positions).toHaveLength(matches.length);
				expect(page.examined).toBeGreaterThanOrEqual(page.relations.length + (page.truncated ? 1 : 0));
				expect(page.examined).toBeLessThanOrEqual(positions[page.limitApplied] ?? bucket.length);
				if (matches.length === page.limitApplied) exactFull++;
				if (from && to && bucket.length > page.limitApplied && matches.length <= page.limitApplied) filteredSurplus++;
			}
			expect(view.relations({ scope, ...(from ? { from } : {}), ...(to ? { to } : {}), limit })).toEqual(page.relations);
			if (page.truncated) truncatedSeen++;
		}
		expect(truncatedSeen).toBeGreaterThan(0);
		// Each falsifier boundary is exercised, so a green run is not vacuous.
		expect(exactFull).toBeGreaterThan(0);
		expect(filteredSurplus).toBeGreaterThan(0);
		expect(crossScoped).toBeGreaterThan(0);
	});
});

describe("A4 docs/workbench/09 § Data retention and privacy: scope boundary", () => {
	// "Tenant/workspace boundaries apply at correlation queries, not just at individual SDK calls."
	it("keeps cross-scope keys empty with examined 0 and never counts another scope's edges", () => {
		const view = projection({ maxQuery: 2 });
		for (const to of ["b1", "b2", "b3"]) link(view, bob, "a", to);
		link(view, alice, "a", "b1");
		for (const scope of [bob, other]) {
			const cross = view.relationsPage({ scope: alice, from: keyOf(scope, "a"), limit: 5 });
			expect(cross).toEqual({ relations: [], examined: 0, truncated: false, limitApplied: 2 });
			expect(view.relations({ scope: alice, from: keyOf(scope, "a"), limit: 5 })).toEqual([]);
			expect(view.relationsPage({ scope: alice, to: keyOf(scope, "b1") })).toMatchObject({ relations: [], examined: 0, truncated: false });
		}
		const wide = view.relationsPage({ scope: alice, limit: 2 });
		expect(wide.relations).toHaveLength(1);
		expect(wide.truncated).toBe(false);
		expect(wide.relations.every((r) => r.from.startsWith('["ws-1","alice",'))).toBe(true);
	});

	it("never counts another scope's ownership edge toward truncation, in either direction", () => {
		const view = projection({ maxQuery: 3 });
		link(view, bob, "owner", "child", "ownership", "o1");
		link(view, bob, "owner", "c2");
		link(view, bob, "owner", "c3");
		for (const to of ["child", "c2", "c3"]) link(view, alice, "owner", to);
		const page: RelationPage = view.relationsPage({ scope: alice, limit: 3 });
		expect(page.truncated).toBe(false);
		expect(page.relations.map((row) => row.from)).toEqual(Array(3).fill(keyOf(alice, "owner")));
		expect(page.relations.map((row) => row.kind)).not.toContain("ownership");
		expect(view.relationsPage({ scope: alice, from: keyOf(alice, "owner"), limit: 3 }).truncated).toBe(false);
		expect(view.relationsPage({ scope: alice, to: keyOf(alice, "child") })).toMatchObject({ truncated: false, relations: [{ kind: "dependency" }] });
		const bobPage = view.relationsPage({ scope: bob, limit: 2 });
		expect(bobPage.truncated).toBe(true);
		expect(bobPage.relations[0].kind).toBe("ownership");
		expect(bobPage.relations.every((row) => row.from === keyOf(bob, "owner"))).toBe(true);
		expect(view.relationsPage({ scope: bob, limit: 3 })).toMatchObject({ truncated: false });
		for (const key of [{ from: keyOf(bob, "owner") }, { to: keyOf(bob, "child") }]) {
			expect(view.relationsPage({ scope: alice, ...key })).toEqual({ relations: [], examined: 0, truncated: false, limitApplied: 3 });
			expect(view.relations({ scope: alice, ...key })).toEqual([]);
		}
	});
});

describe("A5 docs/workbench/10 § Rendering pipeline: bounded walk", () => {
	// "Avoid O(allHistory) collapse per frame; maintain by-node last projection and ancestor aggregates incrementally."
	it("stops the walk at the first matching edge past the limit", () => {
		const view = projection({ maxQuery: 3 });
		for (let i = 0; i < 20; i++) link(view, alice, "a", `t${i}`);
		const page = view.relationsPage({ scope: alice, from: keyOf(alice, "a"), limit: 3 });
		expect(page.truncated).toBe(true);
		expect(page.examined).toBe(4);
		const empty = projection();
		expect(empty.relationsPage({ scope: alice })).toEqual({ relations: [], examined: 0, truncated: false, limitApplied: 100 });
	});

	it("bounds examined by the index bucket and the first matching edge past the page, never by edges.size", () => {
		const view = projection();
		for (let i = 0; i < 40; i++) link(view, alice, `noise${i}`, "b");
		for (let i = 0; i < 25; i++) link(view, bob, "a", "b", "dependency", `bob${i}`);
		// Key a's bucket interleaves filtered a->x rows with matching a->b rows at bucket positions 2, 4, 6 and 8.
		for (let i = 0; i < 4; i++) {
			link(view, alice, "a", `x${i}`);
			link(view, alice, "a", "b", "dependency", `s${i}`);
		}
		expect(view.stats().edges).toBe(40 + 25 + 8);
		const bucket = view.relationsPage({ scope: alice, from: keyOf(alice, "a") });
		expect(bucket).toMatchObject({ examined: 8, truncated: false });
		expect(bucket.relations).toHaveLength(8);
		const page = view.relationsPage({ scope: alice, from: keyOf(alice, "a"), to: keyOf(alice, "b"), limit: 2 });
		expect(page.relations.map((row) => row.provenance.source)).toEqual(["s0", "s1"]);
		expect(page.truncated).toBe(true);
		expect(page.examined).toBeGreaterThanOrEqual(3);
		expect(page.examined).toBeLessThanOrEqual(6);
		const whole = view.relationsPage({ scope: alice, from: keyOf(alice, "a"), to: keyOf(alice, "b"), limit: 4 });
		expect(whole.relations).toHaveLength(4);
		expect(whole.truncated).toBe(false);
		expect(whole.examined).toBeLessThanOrEqual(8);
		const incoming = view.relationsPage({ scope: alice, to: keyOf(alice, "b"), limit: 3 });
		expect(incoming.relations.map((row) => row.from)).toEqual([keyOf(alice, "noise0"), keyOf(alice, "noise1"), keyOf(alice, "noise2")]);
		expect(incoming.truncated).toBe(true);
		expect(incoming.examined).toBe(4);
		for (const read of [bucket, page, whole, incoming]) expect(read.examined).toBeLessThan(view.stats().edges);
	});
});

describe("A6 docs/workbench/09 § Two-layer storage model item 2: read-only", () => {
	// "Workbench materializes a bounded, rebuildable read projection for UI and Pi tool queries. It can cache snapshots/events
	// with source/provenance, but is not a second authoritative Run/Work/Attempt or a global DB mandatory for execution."
	it("is read-only: revisions, stats and subsequent reads are unchanged", () => {
		const view = projection({ maxQuery: 2 });
		for (const to of ["b1", "b2", "b3"]) link(view, alice, "a", to);
		view.ingest({
			projectionEventId: "e1",
			source: ref("a"),
			scope: alice,
			sourceSequence: 1,
			observedAt: "2026-10-15T00:00:01Z",
			kind: "native.status",
			node: { presentation: { title: "Native run", type: "sdk-operation", statusText: "RUNNING", statusTone: "active" } },
		});
		const input = { scope: alice, from: keyOf(alice, "a"), limit: 5 };
		const revisionOf = (): number | undefined => view.aggregate({ scope: alice, key: keyOf(alice, "a") })?.revision;
		const before = { stats: view.stats(), rev: view.relationRevision(), rev2: revisionOf(), page: JSON.stringify(view.relationsPage(input)) };
		for (let i = 0; i < 5; i++) {
			view.relationsPage(input);
			view.relations(input);
		}
		expect(view.stats()).toEqual(before.stats);
		expect(view.relationRevision()).toBe(before.rev);
		expect(revisionOf()).toBe(before.rev2);
		expect(before.rev2).toBeGreaterThan(0);
		expect(JSON.stringify(view.relationsPage(input))).toBe(before.page);
	});

	it("leaves the window, aggregate, query and event reads byte-identical after any number of pages", () => {
		const view = projection({ maxQuery: 2 });
		link(view, alice, "a", "b1", "grouping");
		link(view, alice, "a", "b2", "ownership", "o1");
		link(view, alice, "a", "b3");
		view.ingest({
			projectionEventId: "e1",
			source: ref("a"),
			scope: alice,
			sourceSequence: 1,
			observedAt: "2026-10-15T00:00:01Z",
			kind: "native.status",
			trace: { invocationId: "inv-1" },
			node: { presentation: { title: "Native run", type: "sdk-operation", statusText: "RUNNING", statusTone: "active" } },
		});
		const reads = (): string =>
			JSON.stringify({
				window: view.window({ scope: alice, invocationId: "inv-1", offset: 0, limit: 10 }),
				aggregate: view.aggregate({ scope: alice, key: keyOf(alice, "a") }),
				query: view.query({ scope: alice, limit: 10 }),
				events: view.events({ scope: alice, limit: 10 }),
				stats: view.stats(),
				aggregateStats: view.aggregateStats(),
				topology: view.relationRevision(),
			});
		const before = reads();
		expect(JSON.parse(before).window.revision).toBeGreaterThan(0);
		const inputs = [{ scope: alice }, { scope: alice, from: keyOf(alice, "a"), limit: 1 }, { scope: alice, to: keyOf(alice, "b1") }, { scope: bob, from: keyOf(alice, "a") }];
		for (let i = 0; i < 3; i++) {
			for (const input of inputs) {
				const page = JSON.stringify(view.relationsPage(input));
				view.relations(input);
				expect(JSON.stringify(view.relationsPage(input))).toBe(page);
			}
		}
		expect(reads()).toBe(before);
	});

	it("keeps each read a single call on the projection surface, as the control purity check observes it", () => {
		// test/workbench-control.test.ts spies every ObservationProjection.prototype method and requires a control decision
		// to touch only query and relations; a shared walk on the prototype would surface there as a third call.
		const view = projection({ maxQuery: 2 });
		for (const to of ["b1", "b2", "b3"]) link(view, alice, "a", to);
		const methods = Object.getOwnPropertyNames(ObservationProjection.prototype).filter((name) => name !== "constructor");
		for (const read of ["relations", "relationsPage"]) expect(methods).toContain(read);
		const surface = view as unknown as Record<string, (...args: unknown[]) => unknown>;
		const reads: [string, () => unknown][] = [
			["relationsPage", () => view.relationsPage({ scope: alice, from: keyOf(alice, "a"), limit: 2 })],
			["relations", () => view.relations({ scope: alice, from: keyOf(alice, "a"), limit: 2 })],
			["relationsPage", () => view.relationsPage({ scope: alice, from: keyOf(bob, "a") })],
		];
		for (const [read, call] of reads) {
			const spies = methods.map((name) => [name, vi.spyOn(surface, name)] as const);
			try {
				call();
				expect(spies.filter(([, spy]) => spy.mock.calls.length > 0).map(([name]) => name)).toStrictEqual([read]);
			} finally {
				vi.restoreAllMocks();
			}
		}
	});

	it("keeps the shared walk out of the ingest/refresh/relate/markStale/disconnect/reconnect mutation surface", () => {
		const source = readFileSync(new URL("../src/workbench/observation.ts", import.meta.url), "utf8");
		const mutationStart = source.indexOf("  private updateIndexes(");
		const readStart = source.indexOf("  relations(input:");
		const readEnd = source.indexOf("  private viewportGroup(");
		const walkStart = source.indexOf("\nfunction walkRelations(");
		const walkEnd = source.indexOf("\n}\n", walkStart);
		expect(mutationStart).toBeGreaterThan(0);
		expect(readStart).toBeGreaterThan(mutationStart);
		expect(readEnd).toBeGreaterThan(readStart);
		expect(walkStart).toBeGreaterThan(0);
		expect(walkEnd).toBeGreaterThan(walkStart);
		const mutationSurface = source.slice(mutationStart, readStart);
		for (const method of ["ingest(event", "refresh(snapshot", "relate(input", "markStale(input", "disconnect(provider", "reconnect(provider"]) expect(mutationSurface).toContain(`  ${method}`);
		expect(mutationSurface).not.toMatch(/relationsPage|walkRelations/);
		// The two public reads delegate to the one module-level walk, which never sees the projection itself.
		const readSurface = source.slice(readStart, readEnd);
		expect(readSurface).toMatch(/relationsPage\(input/);
		expect(readSurface.match(/walkRelations\(/g)).toHaveLength(2);
		expect(source.match(/walkRelations\(/g)).toHaveLength(3);
		const walk = source.slice(walkStart, walkEnd);
		expect(walk).not.toMatch(/\bthis\b/);
		expect(walk).not.toMatch(/\.(?:set|delete|add|clear|splice)\(/);
		expect(readSurface).not.toMatch(/this\.(?:ingest|refresh|relate|markStale|disconnect|reconnect|store|discard|removeEdge|nest|unnest|rebuildAggregate|rebuildAround|adjustAncestors|updateIndexes|setViewport|removeViewport)\(/);
		expect(readSurface).not.toMatch(/this\.[A-Za-z]+(?:\.[A-Za-z]+)*\s*(?:\+\+|--|[-+*/]?=(?!=))/);
		expect(readSurface).not.toMatch(/this\.[A-Za-z]+\.(?:set|delete|add|clear|splice|push)\(/);
	});
});
