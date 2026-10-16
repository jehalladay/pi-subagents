/** wb-69g.2 (W16-C): pure bounded workflow_catalog / workflow_inspect reply builders. No registry call, provider, RPC or TTY. */
import { describe, expect, it, vi } from "vitest";
import { type CapabilityDescriptor, type CapabilityProvider, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { stripUnsafeText } from "../src/workbench/redaction.js";
import {
  buildWorkflowCatalogReply,
  buildWorkflowInspectReply,
  type CapabilityCatalogEntry,
  capabilityCatalogEntries,
  TOOL_REPLY_CONTRACT_VERSION,
  TOOL_REPLY_DEFAULT_MAX_BYTES,
  TOOL_REPLY_MAX_LIMIT,
} from "../src/workbench/tool-replies.js";

function descriptor(id: string, extra: Partial<CapabilityDescriptor> = {}): CapabilityDescriptor {
  return {
    id,
    version: "1.0.0",
    description: `Describes ${id}.`,
    inputSchema: { type: "object", properties: { q: { type: "string" } } },
    effectClass: "read",
    permissions: [],
    supportedModes: ["invoke"],
    ...extra,
  };
}

function entry(id: string, extra: Partial<CapabilityDescriptor> = {}, inspectImplemented = false): CapabilityCatalogEntry {
  return { descriptor: descriptor(id, extra), inspectImplemented };
}

const IDS = ["forge.build", "forge.test", "furnace.run", "furnace.stop", "hx.find"];
const SNAPSHOT = IDS.map(id => entry(id));
const ALL_DISCOVER = IDS.map(id => `discover:${id}`);

function ok<T extends { ok: boolean }>(reply: T): Extract<T, { ok: true }> {
  expect(reply.ok).toBe(true);
  return reply as Extract<T, { ok: true }>;
}

describe("buildWorkflowCatalogReply ACL (A2/A4)", () => {
  it("an empty or missing grant set yields zero rows, never an error row", () => {
    for (const grants of [[], undefined, "discover:forge.build" as unknown as string[]]) {
      const reply = ok(buildWorkflowCatalogReply(SNAPSHOT, grants, {}));
      expect(reply.rows).toEqual([]);
      expect(reply.offered).toBe(0);
      expect(reply.returned).toBe(0);
    }
  });

  it("lists only exact discover:<id> grants; invoke/inspect/prefix/case variants do not discover", () => {
    const grants = ["discover:forge.build", "invoke:forge.test", "inspect:furnace.run", "discover:furnace", "discover:*", "discover:HX.find", " discover:hx.find"];
    const reply = ok(buildWorkflowCatalogReply(SNAPSHOT, grants, {}));
    expect(reply.rows.map(row => row.id)).toEqual(["forge.build"]);
  });

  it("a capability without a grant is absent and the counts never mention it", () => {
    const reply = ok(buildWorkflowCatalogReply(SNAPSHOT, ["discover:hx.find"], {}));
    expect(JSON.stringify(reply)).not.toContain("forge.build");
    expect(reply.offered).toBe(1);
  });

  it("discovery never implies invocation: the reply states invoked false and carries no invoke path", () => {
    const reply = ok(buildWorkflowCatalogReply(SNAPSHOT, ALL_DISCOVER, {}));
    expect(reply.invoked).toBe(false);
    expect(reply.tool).toBe("workflow_catalog");
    expect(reply.contract).toBe(TOOL_REPLY_CONTRACT_VERSION);
  });

  it("never calls provider invoke or inspect while building", () => {
    const invoke = vi.fn(async () => null);
    const inspect = vi.fn(async () => null);
    const provider: CapabilityProvider = { descriptor: descriptor("forge.build", { supportedModes: ["invoke", "inspect"] }), invoke, inspect };
    const registry = new CapabilityRegistry();
    registry.register(provider);
    const entries = capabilityCatalogEntries([provider]);
    ok(buildWorkflowCatalogReply(entries, ["discover:forge.build", "inspect:forge.build"], {}));
    buildWorkflowInspectReply(entries, ["discover:forge.build", "inspect:forge.build"], "forge.build");
    expect(invoke).not.toHaveBeenCalled();
    expect(inspect).not.toHaveBeenCalled();
  });
});

describe("buildWorkflowCatalogReply filter and pagination (A1/A4)", () => {
  it("filters case-insensitively over id and description", () => {
    const snapshot = [entry("forge.build"), entry("hx.find", { description: "Typed FIND over files." })];
    const grants = ["discover:forge.build", "discover:hx.find"];
    expect(ok(buildWorkflowCatalogReply(snapshot, grants, { filter: "FORGE" })).rows.map(row => row.id)).toEqual(["forge.build"]);
    expect(ok(buildWorkflowCatalogReply(snapshot, grants, { filter: "typed find" })).rows.map(row => row.id)).toEqual(["hx.find"]);
    expect(ok(buildWorkflowCatalogReply(snapshot, grants, { filter: "nomatch" })).rows).toEqual([]);
  });

  it("sorts rows by id regardless of snapshot order", () => {
    const reversed = [...SNAPSHOT].reverse();
    expect(ok(buildWorkflowCatalogReply(reversed, ALL_DISCOVER, {})).rows.map(row => row.id)).toEqual(IDS);
  });

  it("pages with a stable cursor and covers every row exactly once", () => {
    const seen: string[] = [];
    let cursor: string | undefined;
    let pages = 0;
    do {
      const reply = ok(buildWorkflowCatalogReply(SNAPSHOT, ALL_DISCOVER, { limit: 2, ...(cursor ? { cursor } : {}) }));
      expect(reply.rows.length).toBeLessThanOrEqual(2);
      seen.push(...reply.rows.map(row => row.id));
      cursor = reply.nextCursor;
      pages += 1;
    } while (cursor && pages < 10);
    expect(seen).toEqual(IDS);
    expect(pages).toBe(3);
  });

  it("a cursor survives an insertion before it and a removal of its anchor row", () => {
    const first = ok(buildWorkflowCatalogReply(SNAPSHOT, ALL_DISCOVER, { limit: 2 }));
    const grown = [...SNAPSHOT, entry("aaa.first")];
    const grants = [...ALL_DISCOVER, "discover:aaa.first"];
    const next = ok(buildWorkflowCatalogReply(grown, grants, { limit: 2, cursor: first.nextCursor }));
    expect(next.rows.map(row => row.id)).toEqual(["furnace.run", "furnace.stop"]);
    const shrunk = SNAPSHOT.filter(item => item.descriptor.id !== "forge.test");
    const after = ok(buildWorkflowCatalogReply(shrunk, ALL_DISCOVER, { limit: 2, cursor: first.nextCursor }));
    expect(after.rows.map(row => row.id)).toEqual(["furnace.run", "furnace.stop"]);
  });

  it("the cursor is opaque and does not leak ids the grant set cannot discover", () => {
    const reply = ok(buildWorkflowCatalogReply(SNAPSHOT, ["discover:forge.build", "discover:forge.test"], { limit: 1 }));
    expect(reply.nextCursor).toBeDefined();
    const second = ok(buildWorkflowCatalogReply(SNAPSHOT, ["discover:forge.build", "discover:forge.test"], { limit: 1, cursor: reply.nextCursor }));
    expect(second.rows.map(row => row.id)).toEqual(["forge.test"]);
    expect(second.nextCursor).toBeUndefined();
  });

  it("a cursor past the end returns an empty page, not an error", () => {
    const last = ok(buildWorkflowCatalogReply(SNAPSHOT, ALL_DISCOVER, { limit: 5 }));
    expect(last.nextCursor).toBeUndefined();
    const everyRow = ok(buildWorkflowCatalogReply(SNAPSHOT, ALL_DISCOVER, { limit: 4 }));
    const tail = ok(buildWorkflowCatalogReply(SNAPSHOT, ALL_DISCOVER, { limit: 4, cursor: everyRow.nextCursor }));
    expect(tail.rows.map(row => row.id)).toEqual(["hx.find"]);
    const beyond = ok(buildWorkflowCatalogReply(SNAPSHOT, ALL_DISCOVER, { cursor: Buffer.from("zzz.after-everything").toString("base64url") }));
    expect(beyond.rows).toEqual([]);
    expect(beyond.offered).toBe(0);
    expect(beyond.nextCursor).toBeUndefined();
  });

  it("limit defaults, clamps to the maximum, and rejects non-positive or non-integer values with a typed error", () => {
    const many = Array.from({ length: 150 }, (_, i) => entry(`cap.n${String(i).padStart(3, "0")}`.replace(/\d/g, d => "abcdefghij"[Number(d)] ?? d)));
    const grants = many.map(item => `discover:${item.descriptor.id}`);
    expect(ok(buildWorkflowCatalogReply(many, grants, {})).returned).toBe(20);
    const clamped = ok(buildWorkflowCatalogReply(many, grants, { limit: 100_000 }));
    expect(clamped.limit).toBe(TOOL_REPLY_MAX_LIMIT);
    expect(clamped.returned).toBeLessThanOrEqual(TOOL_REPLY_MAX_LIMIT);
    for (const limit of [0, -1, 1.5, Number.NaN, "5" as unknown as number]) {
      const reply = buildWorkflowCatalogReply(many, grants, { limit });
      expect(reply.ok).toBe(false);
      if (!reply.ok) expect(reply.error.code).toBe("invalid-limit");
    }
  });

  it("a malformed cursor or filter is a typed error, not a guess", () => {
    const badCursor = buildWorkflowCatalogReply(SNAPSHOT, ALL_DISCOVER, { cursor: "%%%not-a-cursor" });
    expect(badCursor.ok).toBe(false);
    if (!badCursor.ok) expect(badCursor.error.code).toBe("invalid-cursor");
    const badFilter = buildWorkflowCatalogReply(SNAPSHOT, ALL_DISCOVER, { filter: 5 as unknown as string });
    expect(badFilter.ok).toBe(false);
    if (!badFilter.ok) expect(badFilter.error.code).toBe("invalid-filter");
  });
});

describe("buildWorkflowCatalogReply byte cap (A1/A4)", () => {
  const big = Array.from({ length: 60 }, (_, i) => entry(`bulk.cap${"abcdefghijklmnopqrstuvwxyz"[i % 26]}${"abcdefghij"[Math.floor(i / 26)]}`, { description: "x".repeat(180) }));
  const bigGrants = big.map(item => `discover:${item.descriptor.id}`);

  it("truncates to the byte cap with a visible marker and offered-vs-returned counts", () => {
    const reply = ok(buildWorkflowCatalogReply(big, bigGrants, { limit: 100 }, { maxBytes: 2048 }));
    expect(Buffer.byteLength(JSON.stringify(reply), "utf8")).toBeLessThanOrEqual(2048);
    expect(reply.truncated).toEqual({ reason: "byte-cap", maxBytes: 2048 });
    expect(reply.offered).toBe(60);
    expect(reply.returned).toBeLessThan(60);
    expect(reply.returned).toBe(reply.rows.length);
    expect(reply.returned).toBeGreaterThan(0);
    expect(reply.nextCursor).toBeDefined();
  });

  it("continuing from the truncation cursor eventually returns every row exactly once", () => {
    const seen: string[] = [];
    let cursor: string | undefined;
    for (let page = 0; page < 60; page += 1) {
      const reply = ok(buildWorkflowCatalogReply(big, bigGrants, { limit: 100, ...(cursor ? { cursor } : {}) }, { maxBytes: 2048 }));
      seen.push(...reply.rows.map(row => row.id));
      cursor = reply.nextCursor;
      if (!cursor) break;
    }
    expect(seen).toEqual(big.map(item => item.descriptor.id).sort());
  });

  it("an untruncated reply carries no marker and the default cap bounds a huge snapshot", () => {
    expect(ok(buildWorkflowCatalogReply(SNAPSHOT, ALL_DISCOVER, {})).truncated).toBeUndefined();
    const huge = Array.from({ length: 400 }, (_, i) => entry(`mass.cap${String(i).split("").map(d => "abcdefghij"[Number(d)]).join("")}`, { description: "y".repeat(500) }));
    const grants = huge.map(item => `discover:${item.descriptor.id}`);
    const reply = ok(buildWorkflowCatalogReply(huge, grants, { limit: 100 }));
    expect(Buffer.byteLength(JSON.stringify(reply), "utf8")).toBeLessThanOrEqual(TOOL_REPLY_DEFAULT_MAX_BYTES);
    expect(reply.truncated?.reason).toBe("byte-cap");
    expect(reply.offered).toBe(400);
  });

  it("clamps a host cap below the floor and above the default instead of trusting it", () => {
    const tiny = ok(buildWorkflowCatalogReply(big, bigGrants, { limit: 100 }, { maxBytes: 1 }));
    expect(Buffer.byteLength(JSON.stringify(tiny), "utf8")).toBeLessThanOrEqual(1024);
    expect(tiny.returned).toBeGreaterThan(0);
    const wide = ok(buildWorkflowCatalogReply(big, bigGrants, { limit: 100 }, { maxBytes: 10 ** 9 }));
    expect(Buffer.byteLength(JSON.stringify(wide), "utf8")).toBeLessThanOrEqual(TOOL_REPLY_DEFAULT_MAX_BYTES);
  });
});

describe("sanitization (A4)", () => {
  it("strips ESC and control characters from titles and descriptions and redacts credentials", () => {
    const hostile = entry("evil.cap", { description: "\u001b[31mred\u001b]0;pwned\u0007 Bearer abc123token end\u0000\u202E", contractSource: "docs/\u001bx" });
    const reply = ok(buildWorkflowCatalogReply([hostile], ["discover:evil.cap"], {}));
    const text = JSON.stringify(reply);
    for (const row of reply.rows) for (const value of [row.id, row.description, row.contractSource ?? ""]) expect(stripUnsafeText(value)).toBe(value);
    expect(text).not.toContain("abc123token");
    expect(reply.rows[0]?.description).toContain("red");
  });

  it("sanitizes the echoed filter and bounds description length", () => {
    const reply = ok(buildWorkflowCatalogReply([entry("long.cap", { description: "z".repeat(5000) })], ["discover:long.cap"], { filter: "\u001b[2Jlong" }));
    expect(reply.filter).toBe("long");
    expect(reply.rows[0]?.description.length).toBeLessThanOrEqual(240);
  });
});

describe("buildWorkflowInspectReply (A2/A3)", () => {
  const inspectable = entry("forge.build", { supportedModes: ["invoke", "inspect"], permissions: ["forge:build"], contractSource: "docs/workbench/07", outputSchema: { type: "object" } }, true);
  const snapshot = [inspectable, entry("hx.find", { supportedModes: ["invoke"] }, false), entry("adv.only", { supportedModes: ["invoke", "inspect"] }, false), entry("impl.only", { supportedModes: ["invoke"] }, true)];
  const grants = ["inspect:forge.build", "inspect:hx.find", "inspect:adv.only", "inspect:impl.only"];

  it("returns the definition view by default for an inspect-granted advertised and implemented capability", () => {
    const reply = ok(buildWorkflowInspectReply(snapshot, grants, "forge.build"));
    expect(reply.tool).toBe("workflow_inspect");
    expect(reply.view).toBe("definition");
    expect(reply.invoked).toBe(false);
    expect(reply.target).toBe("forge.build");
    expect(reply.data).toMatchObject({ id: "forge.build", version: "1.0.0", effectClass: "read", supportedModes: ["invoke", "inspect"], contractSource: "docs/workbench/07" });
  });

  it("schema and operations views are bounded projections of the descriptor", () => {
    const schema = ok(buildWorkflowInspectReply(snapshot, grants, "forge.build", "schema"));
    expect(schema.data).toMatchObject({ id: "forge.build", inputSchema: { type: "object" }, outputSchema: { type: "object" } });
    const ops = ok(buildWorkflowInspectReply(snapshot, grants, "forge.build", "operations"));
    expect(ops.data).toMatchObject({ id: "forge.build", effectClass: "read", supportedModes: ["invoke", "inspect"], invokeRequires: ["forge:build"], inspectGrant: "inspect:forge.build" });
  });

  it("operations lists the exact invoke grant when a descriptor has no producer permissions", () => {
    const withoutPermissions = entry("plain.cap", { supportedModes: ["invoke", "inspect"] }, true);
    const ops = ok(buildWorkflowInspectReply([withoutPermissions], ["inspect:plain.cap"], "plain.cap", "operations"));
    expect(ops.data).toMatchObject({ invokeRequires: ["invoke:plain.cap"] });
  });

  it("denies without the exact inspect grant, even with discover and invoke grants, as a typed unavailable", () => {
    for (const held of [[], ["discover:forge.build"], ["invoke:forge.build", "forge:build"], ["inspect:forge"], ["inspect:*"]]) {
      const reply = buildWorkflowInspectReply(snapshot, held, "forge.build");
      expect(reply.ok).toBe(false);
      if (!reply.ok) {
        expect(reply.error.code).toBe("unavailable");
        expect(reply.error.reason).toBe("not-granted");
      }
    }
    const missing = buildWorkflowInspectReply(snapshot, undefined, "forge.build");
    expect(missing.ok).toBe(false);
  });

  it("an ungranted known target and an ungranted unknown target are indistinguishable", () => {
    const known = buildWorkflowInspectReply(snapshot, [], "forge.build");
    const unknown = buildWorkflowInspectReply(snapshot, [], "no.such");
    expect(known.ok).toBe(false);
    expect(unknown.ok).toBe(false);
    if (!known.ok && !unknown.ok) expect({ ...known.error, target: "" }).toEqual({ ...unknown.error, target: "" });
  });

  it("a granted unknown target is a typed unknown-target error", () => {
    const reply = buildWorkflowInspectReply(snapshot, ["inspect:no.such"], "no.such");
    expect(reply.ok).toBe(false);
    if (!reply.ok) expect(reply.error.code).toBe("unknown-target");
  });

  it("requires an advertised AND implemented inspect mode, else explicit unavailable with the reason", () => {
    const notAdvertised = buildWorkflowInspectReply(snapshot, grants, "hx.find");
    const notImplemented = buildWorkflowInspectReply(snapshot, grants, "adv.only");
    const implementedUnadvertised = buildWorkflowInspectReply(snapshot, grants, "impl.only");
    for (const [reply, reason] of [[notAdvertised, "inspect-not-advertised"], [notImplemented, "inspect-not-implemented"], [implementedUnadvertised, "inspect-not-advertised"]] as const) {
      expect(reply.ok).toBe(false);
      if (!reply.ok) {
        expect(reply.error.code).toBe("unavailable");
        expect(reply.error.reason).toBe(reason);
      }
    }
  });

  it("an unknown or malformed view is a typed error and never a guess", () => {
    for (const view of ["source", "", "DEFINITION", 7 as unknown as string]) {
      const reply = buildWorkflowInspectReply(snapshot, grants, "forge.build", view);
      expect(reply.ok).toBe(false);
      if (!reply.ok) expect(reply.error.code).toBe("unknown-view");
    }
  });

  it("a malformed target is a typed invalid-target error", () => {
    for (const target of ["", 5 as unknown as string, undefined as unknown as string]) {
      const reply = buildWorkflowInspectReply(snapshot, grants, target);
      expect(reply.ok).toBe(false);
      if (!reply.ok) expect(reply.error.code).toBe("invalid-target");
    }
  });

  it("sanitizes schema content and truncates an oversized schema with a visible marker", () => {
    const hostile = entry("evil.cap", {
      supportedModes: ["invoke", "inspect"],
      description: "\u001b[31mbad",
      inputSchema: { type: "object", properties: { "\u001bkey": { type: "string", description: "Bearer topsecrettoken" } } },
    }, true);
    const reply = ok(buildWorkflowInspectReply([hostile], ["inspect:evil.cap"], "evil.cap", "schema"));
    const text = JSON.stringify(reply);
    const data = reply.data as { inputSchema: { properties: Record<string, unknown> } };
    expect(Object.keys(data.inputSchema.properties)).toEqual(["key"]);
    expect(text).not.toContain("u001b");
    expect(text).not.toContain("topsecrettoken");

    const properties = Object.fromEntries(Array.from({ length: 400 }, (_, i) => [`p${i}`, { type: "string", description: "d".repeat(150) }]));
    const oversized = entry("big.cap", { supportedModes: ["invoke", "inspect"], inputSchema: { type: "object", properties } }, true);
    const capped = ok(buildWorkflowInspectReply([oversized], ["inspect:big.cap"], "big.cap", "schema", { maxBytes: 4096 }));
    expect(Buffer.byteLength(JSON.stringify(capped), "utf8")).toBeLessThanOrEqual(4096);
    expect(capped.truncated).toMatchObject({ reason: "byte-cap" });
    expect(capped.data).toMatchObject({ id: "big.cap" });
  });
});

describe("capabilityCatalogEntries", () => {
  it("derives inspectImplemented from the provider and copies descriptors defensively", () => {
    const withInspect: CapabilityProvider = { descriptor: descriptor("a.with", { supportedModes: ["invoke", "inspect"] }), invoke: async () => null, inspect: async () => null };
    const without: CapabilityProvider = { descriptor: descriptor("a.without"), invoke: async () => null };
    const entries = capabilityCatalogEntries([withInspect, without]);
    expect(entries.map(item => [item.descriptor.id, item.inspectImplemented])).toEqual([["a.with", true], ["a.without", false]]);
    expect(entries[0]?.descriptor).not.toBe(withInspect.descriptor);
    expect(entries[0]?.descriptor.inputSchema).not.toBe(withInspect.descriptor.inputSchema);
  });
});
