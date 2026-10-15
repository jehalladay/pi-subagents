import { describe, expect, it } from "vitest";
import {
	type NativeRef,
	type ObservationLimits,
	ObservationProjection,
	type ObservationScope,
	type Relation,
	type RelationKind,
} from "../src/workbench/observation.js";

const alice: ObservationScope = { workspace: "ws-1", principal: "alice" };
const bob: ObservationScope = { workspace: "ws-1", principal: "bob" };
const other: ObservationScope = { workspace: "ws-2", principal: "alice" };
const ref = (id: string): NativeRef => ({ provider: "forge", type: "run", id });
const keyOf = (scope: ObservationScope, id: string): string => JSON.stringify([scope.workspace, scope.principal, "forge", "run", "", id]);
const KINDS: readonly RelationKind[] = ["dependency", "causation", "grouping", "hypothesis"];

const projection = (limits?: ObservationLimits): ObservationProjection => new ObservationProjection(limits);
const link = (view: ObservationProjection, scope: ObservationScope, from: string, to: string, kind: RelationKind = "dependency", source = "declared"): void =>
	view.relate({ scope, from: ref(from), to: ref(to), kind, provenance: { source, observedAt: "2026-10-15T00:00:01Z" } });

describe("ObservationProjection.relationsPage truncation reporting", () => {
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

	it("stops the walk at the first matching edge past the limit", () => {
		const view = projection({ maxQuery: 3 });
		for (let i = 0; i < 20; i++) link(view, alice, "a", `t${i}`);
		const page = view.relationsPage({ scope: alice, from: keyOf(alice, "a"), limit: 3 });
		expect(page.truncated).toBe(true);
		expect(page.examined).toBe(4);
		const empty = projection();
		expect(empty.relationsPage({ scope: alice })).toEqual({ relations: [], examined: 0, truncated: false, limitApplied: 100 });
	});

	it("rejects invalid limits like relations()", () => {
		const view = projection();
		for (const limit of [0, -1, 1.5, Number.NaN]) {
			expect(() => view.relationsPage({ scope: alice, limit })).toThrow(/Invalid relation query limit\./);
			expect(() => view.relations({ scope: alice, limit })).toThrow(/Invalid relation query limit\./);
		}
	});

	it("is read-only: revisions, stats and subsequent reads are unchanged", () => {
		const view = projection({ maxQuery: 2 });
		for (const to of ["b1", "b2", "b3"]) link(view, alice, "a", to);
		view.ingest({
			projectionEventId: "e1", source: ref("a"), scope: alice, sourceSequence: 1, observedAt: "2026-10-15T00:00:01Z", kind: "native.status",
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
				reference.push({ from: keyOf(scope, from), to: keyOf(scope, to), kind, provenance: { source, observedAt: "2026-10-15T00:00:01Z" } });
				scopeIndex.push(scope);
			}
		}
		expect(reference.length).toBeGreaterThanOrEqual(200);
		let truncatedSeen = 0;
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
			expect(view.relations({ scope, ...(from ? { from } : {}), ...(to ? { to } : {}), limit })).toEqual(page.relations);
			if (page.truncated) truncatedSeen++;
		}
		expect(truncatedSeen).toBeGreaterThan(0);
	});
});
