/**
 * W15-E/VC-5 pure Claude transcript message evidence reader (wb-6ze.10): the docs/workbench/20 § Producer mapping
 * "claude-agent-sdk session" row. The bounded transcript read is an injected vi.fn seam shaped like
 * readClaudeTranscript, so no case needs the Claude Agent SDK, a session on disk, a TTY or the network. Every case
 * that expects a refusal also proves the seam was or was not reached, as the clause requires.
 */
import { afterEach, describe, expect, it, type Mock, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  CLAUDE_EVIDENCE_CONTRACT, type ClaudeEvidenceContent, type ClaudeEvidenceDeps, readClaudeMessageEvidence,
} from "../src/workbench/claude-evidence.js";
import type { ClaudeTranscriptRow } from "../src/workbench/claude-transcript.js";

type Read = (sessionId: string, cwd: string, limit: number) => Promise<readonly ClaudeTranscriptRow[]>;

const SESSION = "sess-claude-evidence-1";
const CWD = "/tmp/claude-evidence-ws";
const CLOCK = "2026-10-15T09:30:00.000Z";
const GRANT = "claude:transcript";
const MARKER = "[REDACTED]";
const uuid = (n: number): string => `00000000-0000-4000-8000-${n.toString(16).padStart(12, "0")}`;
const TARGET = uuid(7);
const refOf = (id: string): string => `claude-message:${id}`;
/** Terminal escapes, C0/C1 controls, bidi marks and the zero-width set the preview pass strips. */
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069\u200b\u200c\u2060\ufeff]|\u200d/;

const seams: Mock<Read>[] = [];
afterEach(() => {
  for (const seam of seams.splice(0)) expect(seam.mock.calls.length).toBeLessThanOrEqual(1);
});

function windowRows(count = 5): ClaudeTranscriptRow[] {
  return Array.from({ length: count }, (_, index) => ({
    type: index % 2 === 0 ? "user" as const : "assistant" as const, uuid: uuid(index + 100), text: `message body ${index + 100}`,
  }));
}
function seam(rows: readonly ClaudeTranscriptRow[] = [...windowRows(), { type: "assistant", uuid: TARGET, text: "target body" }]): Mock<Read> {
  const made = vi.fn<Read>(async () => rows);
  seams.push(made);
  return made;
}
function deps(read: Mock<Read>, overrides: Partial<ClaudeEvidenceDeps> = {}): ClaudeEvidenceDeps {
  return {
    grants: () => [GRANT],
    owningNode: { nativeRef: { provider: "claude-agent-sdk", type: "session", id: SESSION }, evidenceRefs: [refOf(TARGET)], freshness: "current" },
    readTranscript: read, cwd: CWD, maxMessages: 40, maxBytes: 4096, maxLines: 20,
    signal: new AbortController().signal, capturedAt: () => CLOCK, ...overrides,
  };
}
async function refusal(pending: Promise<unknown>): Promise<CapabilityError> {
  try {
    await pending;
  } catch (error) {
    if (error instanceof CapabilityError) return error;
    throw error;
  }
  throw new Error("expected a CapabilityError refusal, but the read resolved");
}
function keysOf(value: unknown, into: string[] = []): string[] {
  if (Array.isArray(value)) for (const item of value) keysOf(item, into);
  else if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      into.push(key);
      keysOf(child, into);
    }
  }
  return into;
}
async function previewOf(text: string, overrides: Partial<ClaudeEvidenceDeps> = {}): Promise<ClaudeEvidenceContent> {
  const read = seam([{ type: "assistant", uuid: TARGET, text }]);
  return readClaudeMessageEvidence(refOf(TARGET), deps(read, overrides));
}

describe("C1 docs/workbench/20 § Producer mapping (claude-agent-sdk session): select the row by uuid from the bounded read", () => {
  it("loads exactly the row whose uuid the ref names, from one bounded read keyed by the owning session id", async () => {
    const read = seam();
    const content = await readClaudeMessageEvidence(refOf(TARGET), deps(read));
    expect(content).toStrictEqual({
      contract: "workbench.claude-evidence/v1", kind: "claude.message", provider: "claude-agent-sdk",
      nativeRef: { provider: "claude-agent-sdk", type: "message", id: TARGET },
      capturedAt: CLOCK, bytes: 11, truncated: false, preview: ["target body"], freshness: "current",
    });
    expect(CLAUDE_EVIDENCE_CONTRACT).toBe("workbench.claude-evidence/v1");
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenCalledWith(SESSION, CWD, 40);
    // No other window row's text anywhere in the answer.
    expect(JSON.stringify(content)).not.toContain("message body");
  });

  it("a uuid outside the bounded window is a transport refusal that states the bound, with no preview and no fabricated row", async () => {
    const read = seam(windowRows());
    const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read)));
    expect(error.category).toBe("transport");
    expect(error.message).toContain("40");
    expect(error.message).not.toContain("message body");
    expect(read).toHaveBeenCalledTimes(1);
  });

  it("an empty window is the same transport refusal", async () => {
    const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(seam([]))));
    expect(error.category).toBe("transport");
  });

  it("never widens the window: a row the seam returned past maxMessages is not selectable", async () => {
    const rows = [...windowRows(3), { type: "assistant" as const, uuid: TARGET, text: "past the bound" }];
    const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(seam(rows), { maxMessages: 3 })));
    expect(error.category).toBe("transport");
    expect(error.message).toContain("3");
  });

  it("passes the caller's maxMessages bound to the seam unchanged and selects the last in-bound row", async () => {
    const rows = [...windowRows(2), { type: "user" as const, uuid: TARGET, text: "edge row" }];
    const read = seam(rows);
    const content = await readClaudeMessageEvidence(refOf(TARGET), deps(read, { maxMessages: 3 }));
    expect(content.preview).toStrictEqual(["edge row"]);
    expect(read).toHaveBeenCalledWith(SESSION, CWD, 3);
  });

  it("a throwing, rejecting or non-Error-rejecting seam is a transport refusal that never carries the raw error text", async () => {
    for (const failure of [
      () => { throw new Error("secret-token sk-ant-abc123 leaked"); },
      async () => { throw new Error("secret-token sk-ant-abc123 leaked"); },
      async () => { throw "secret-token sk-ant-abc123 leaked"; },
    ]) {
      const read = vi.fn<Read>(failure as Read);
      seams.push(read);
      const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read)));
      expect(error.category).toBe("transport");
      expect(error.message).not.toContain("sk-ant");
      expect(error.message).not.toContain("secret-token");
    }
  });

  it.each([
    ["not a ref", "hello"],
    ["wrong kind", `forge-operation:${TARGET}`],
    ["empty uuid", "claude-message:"],
    ["non-uuid", "claude-message:not-a-uuid"],
    ["uppercase scheme", `Claude-Message:${TARGET}`],
    ["trailing text", `${refOf(TARGET)} extra`],
    ["leading space", ` ${refOf(TARGET)}`],
    ["newline smuggle", `${refOf(TARGET)}\n`],
    ["path traversal", "claude-message:../../etc/passwd"],
    ["over-long", `claude-message:${"a".repeat(121)}`],
    ["uuid with extra group", `${refOf(TARGET)}-0000`],
  ])("a malformed ref (%s) is a validation refusal and the seam is never reached", async (_name, ref) => {
    const read = seam();
    const error = await refusal(readClaudeMessageEvidence(ref, deps(read)));
    expect(error.category).toBe("validation");
    expect(read).not.toHaveBeenCalled();
  });

  it("a non-string ref is a validation refusal", async () => {
    const read = seam();
    const error = await refusal(readClaudeMessageEvidence(undefined as unknown as string, deps(read)));
    expect(error.category).toBe("validation");
    expect(read).not.toHaveBeenCalled();
  });

  it.each([
    ["maxMessages 0", { maxMessages: 0 }],
    ["maxMessages 101", { maxMessages: 101 }],
    ["maxMessages fractional", { maxMessages: 1.5 }],
    ["maxBytes 0", { maxBytes: 0 }],
    ["maxBytes over", { maxBytes: 65_537 }],
    ["maxLines 0", { maxLines: 0 }],
    ["maxLines over", { maxLines: 201 }],
    ["empty cwd", { cwd: "" }],
    ["no seam", { readTranscript: undefined as unknown as Read }],
    ["no grants", { grants: undefined as unknown as () => readonly string[] }],
    ["no clock", { capturedAt: undefined as unknown as () => string }],
  ] satisfies [string, Partial<ClaudeEvidenceDeps>][])("an invalid request (%s) is a validation refusal before any read", async (_name, overrides) => {
    const read = seam();
    const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read, overrides)));
    expect(error.category).toBe("validation");
    expect(read).not.toHaveBeenCalled();
  });

  it("rejects a malformed seam answer as unavailable without fabricating a row", async () => {
    for (const answer of [null, "rows", [{ type: "assistant", uuid: TARGET, text: 42 }], [null]]) {
      const read = vi.fn<Read>(async () => answer as unknown as readonly ClaudeTranscriptRow[]);
      seams.push(read);
      const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read)));
      expect(error.category).toBe("unavailable");
    }
  });
});

describe("C2 docs/workbench/20 § Refusal and freshness rules: missing or revoked exact grant is unauthorized", () => {
  it.each([
    ["empty set", []],
    ["unrelated grants", ["furnace:inspect", "forge:inspect", "discover:forge.gate.status"]],
    ["wildcard", ["claude:*"]],
    ["bare wildcard", ["*"]],
    ["prefix spelling", ["claude:transcrip"]],
    ["longer spelling", ["claude:transcript.read"]],
    ["namespace only", ["claude"]],
    ["case spelling", ["Claude:Transcript"]],
    ["padded spelling", [" claude:transcript"]],
    ["suffix spelling", ["claude:transcript "]],
  ])("a grant set with %s gets a typed authorization denial and the transcript seam is never invoked", async (_name, granted) => {
    const read = seam();
    const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read, { grants: () => granted })));
    expect(error.category).toBe("authorization");
    expect(read).not.toHaveBeenCalled();
  });

  it("loads when the exact grant is among others", async () => {
    const read = seam();
    const content = await readClaudeMessageEvidence(refOf(TARGET), deps(read, { grants: () => ["furnace:inspect", GRANT, "claude:*"] }));
    expect(content.preview).toStrictEqual(["target body"]);
  });

  it("a grants provider that throws or answers a non-array denies without reading", async () => {
    for (const grants of [() => { throw new Error("grant store down"); }, () => "claude:transcript", () => null]) {
      const read = seam();
      const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read, { grants: grants as unknown as () => readonly string[] })));
      expect(error.category).toBe("authorization");
      expect(read).not.toHaveBeenCalled();
    }
  });

  it("re-reads the live grant set: a revocation during the read refuses unauthorized and returns no preview", async () => {
    const answers: (readonly string[])[] = [[GRANT], []];
    const grants = vi.fn<() => readonly string[]>(() => answers.shift() ?? []);
    const read = seam();
    const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read, { grants })));
    expect(error.category).toBe("authorization");
    expect(grants.mock.calls.length).toBeGreaterThanOrEqual(2);
    expect(read).toHaveBeenCalledTimes(1);
  });

  it("a pre-init pi-workflow agent-call owning node is refused unauthorized and nothing is read", async () => {
    const read = seam();
    const owningNode = { nativeRef: { provider: "pi-workflow", type: "agent-call", id: "task-1:0" }, evidenceRefs: [refOf(TARGET)], freshness: "current" as const };
    const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read, { owningNode })));
    expect(error.category).toBe("authorization");
    expect(read).not.toHaveBeenCalled();
  });

  it.each([
    ["foreign provider", { provider: "furnace", type: "session", id: SESSION }],
    ["foreign type", { provider: "claude-agent-sdk", type: "run", id: SESSION }],
    ["empty session id", { provider: "claude-agent-sdk", type: "session", id: "" }],
  ])("an owning node with a %s is unauthorized and nothing is read", async (_name, nativeRef) => {
    const read = seam();
    const owningNode = { nativeRef, evidenceRefs: [refOf(TARGET)], freshness: "current" as const };
    const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read, { owningNode })));
    expect(error.category).toBe("authorization");
    expect(read).not.toHaveBeenCalled();
  });

  it("a ref the owning node does not list is unauthorized and nothing is read", async () => {
    const read = seam();
    const owningNode = { nativeRef: { provider: "claude-agent-sdk", type: "session", id: SESSION }, evidenceRefs: [refOf(uuid(99))], freshness: "current" as const };
    const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read, { owningNode })));
    expect(error.category).toBe("authorization");
    expect(read).not.toHaveBeenCalled();
  });
});

describe("C3 docs/workbench/09 § Data retention and privacy: bounded redacted preview, no raw retention", () => {
  it("redacts a bearer token and an api_key value from the preview and keeps neither anywhere in the answer", async () => {
    const content = await previewOf("Authorization: Bearer abc123xyz\napi_key=hunter2hunter2 then sk-ant-abcdef123456");
    expect(content.preview.join("\n")).toContain(MARKER);
    const serialized = JSON.stringify(content);
    for (const secret of ["abc123xyz", "hunter2hunter2", "sk-ant-abcdef123456"]) expect(serialized).not.toContain(secret);
  });

  it("strips terminal escapes, controls, bidi marks and zero-width characters from every line", async () => {
    const content = await previewOf("\u001b[31mred\u001b[0m\u0007\tbell\u202egnp\u200b\u200d\ufeffend\nnext\u0000line");
    for (const line of content.preview) expect(line).not.toMatch(UNSAFE);
    expect(content.preview.join("\n")).toContain("red");
    expect(content.preview.join("\n")).toContain("end");
  });

  it("a credential split by a zero-width character cannot reassemble past the redaction", async () => {
    const content = await previewOf("Bea\u200brer abc123secret and api\u200b_key=topsecretvalue1");
    const serialized = JSON.stringify(content);
    expect(serialized).not.toContain("abc123secret");
    expect(serialized).not.toContain("topsecretvalue1");
  });

  it("bounds the line count: lines past maxLines drop, truncated is true and a final marker line says so", async () => {
    const text = Array.from({ length: 30 }, (_, index) => `row-${index}`).join("\n");
    const content = await previewOf(text, { maxLines: 5 });
    expect(content.truncated).toBe(true);
    expect(content.preview.slice(0, 5)).toStrictEqual(["row-0", "row-1", "row-2", "row-3", "row-4"]);
    expect(content.preview.at(-1)).toMatch(/^… truncated/);
    expect(content.preview.length).toBeLessThanOrEqual(6);
    expect(JSON.stringify(content)).not.toContain("row-29");
  });

  it("bounds the line width: a very long line is clipped with an ellipsis and marks truncated", async () => {
    const content = await previewOf(`${"x".repeat(1000)}\nshort`);
    expect(content.truncated).toBe(true);
    expect(content.preview[0].length).toBeLessThanOrEqual(200);
    expect(content.preview[0].endsWith("…")).toBe(true);
    expect(content.preview[1]).toBe("short");
  });

  it("bounds the preview bytes by maxBytes (marker included) and reports the full row bytes for an over-budget row", async () => {
    const text = Array.from({ length: 50 }, (_, index) => `${String(index).padStart(2, "0")}-${"é".repeat(40)}`).join("\n");
    const content = await previewOf(text, { maxBytes: 300, maxLines: 200 });
    expect(content.truncated).toBe(true);
    const previewBytes = content.preview.reduce((sum, line) => sum + Buffer.byteLength(line, "utf8"), 0);
    expect(previewBytes).toBeLessThanOrEqual(300);
    expect(content.bytes).toBe(Buffer.byteLength(text, "utf8"));
    expect(content.preview.at(-1)).toMatch(/^… truncated/);
  });

  it("never splits a surrogate pair when clipping", async () => {
    const content = await previewOf("😀".repeat(400));
    for (const line of content.preview) expect(line).not.toMatch(/[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/);
  });

  it("reports bytes as the row's own UTF-8 size even when the row is within budget", async () => {
    const content = await previewOf("héllo");
    expect(content.bytes).toBe(6);
    expect(content.truncated).toBe(false);
  });

  it("a row far past the scan window still loads, bounded, and its tail never appears", async () => {
    const content = await previewOf(`${"a".repeat(10_000)}TAIL-SECRET-MARKER`);
    expect(content.truncated).toBe(true);
    expect(JSON.stringify(content)).not.toContain("TAIL-SECRET-MARKER");
  });

  it("an empty row loads with an empty-but-visible preview, never a blank answer", async () => {
    const content = await previewOf("");
    expect(content.bytes).toBe(0);
    expect(content.truncated).toBe(false);
    expect(content.preview).toStrictEqual([]);
  });

  it("holds no raw payload field: the answer's keys are the fixed contract set and nothing like text, raw, message or uuid-of-others", async () => {
    const content = await previewOf("plain message");
    expect(keysOf(content).sort()).toStrictEqual([
      "bytes", "capturedAt", "contract", "freshness", "id", "kind", "nativeRef", "preview", "provider", "provider", "truncated", "type",
    ].sort());
    expect(Array.isArray(content.preview)).toBe(true);
    expect(content.preview.every(line => typeof line === "string")).toBe(true);
    expect(content.preview).toStrictEqual(["plain message"]);
  });

  it("the raw row object the seam returned is not retained by reference", async () => {
    const row = { type: "assistant" as const, uuid: TARGET, text: "keep me out" };
    const read = seam([row]);
    const content = await readClaudeMessageEvidence(refOf(TARGET), deps(read));
    row.text = "mutated afterwards";
    expect(JSON.stringify(content)).not.toContain("mutated afterwards");
    expect(JSON.stringify(content)).toContain("keep me out");
  });
});

describe("C4 docs/workbench/20 § Refusal and freshness rules: no verification upgrade", () => {
  it("a failed agent message stays that message's own content and exposes no status, tone or verification field", async () => {
    const content = await previewOf("Agent failed: build exited 1; tests not run");
    expect(content.preview).toStrictEqual(["Agent failed: build exited 1; tests not run"]);
    const keys = keysOf(content).join(" ").toLowerCase();
    for (const forbidden of ["verified", "verification", "status", "tone", "success", "failure", "state", "upgrade"]) expect(keys).not.toContain(forbidden);
  });

  it("labels loaded evidence stale when the owning node is stale or unknown, and current only when it is current", async () => {
    const expectations: ["current" | "stale" | "unknown", string][] = [["current", "current"], ["stale", "stale"], ["unknown", "stale"]];
    for (const [owning, expected] of expectations) {
      const owningNode = { nativeRef: { provider: "claude-agent-sdk", type: "session", id: SESSION }, evidenceRefs: [refOf(TARGET)], freshness: owning };
      const content = await previewOf("body", { owningNode });
      expect(content.freshness).toBe(expected);
    }
  });

  it("an unrecognised owning freshness label cannot read as current", async () => {
    const owningNode = { nativeRef: { provider: "claude-agent-sdk", type: "session", id: SESSION }, evidenceRefs: [refOf(TARGET)], freshness: "fresh" as unknown as "current" };
    const content = await previewOf("body", { owningNode });
    expect(content.freshness).toBe("stale");
  });
});

describe("cancellation and the caller's clock", () => {
  it("an already-aborted signal is a transport refusal and the seam is never reached", async () => {
    const controller = new AbortController();
    controller.abort();
    const read = seam();
    const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read, { signal: controller.signal })));
    expect(error.category).toBe("transport");
    expect(read).not.toHaveBeenCalled();
  });

  it("an abort during the read settles as transport at once, even though the seam never answers", async () => {
    const controller = new AbortController();
    const read = vi.fn<Read>(() => new Promise<readonly ClaudeTranscriptRow[]>(() => undefined));
    seams.push(read);
    const pending = refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read, { signal: controller.signal })));
    await new Promise<void>(resolve => setTimeout(resolve, 0));
    controller.abort();
    const error = await pending;
    expect(error.category).toBe("transport");
  });

  it("a late failure of an abandoned read is absorbed, never an unhandled rejection", async () => {
    const controller = new AbortController();
    let fail: (reason: unknown) => void = () => undefined;
    const read = vi.fn<Read>(() => new Promise<readonly ClaudeTranscriptRow[]>((_resolve, reject) => { fail = reject; }));
    seams.push(read);
    const pending = refusal(readClaudeMessageEvidence(refOf(TARGET), deps(read, { signal: controller.signal })));
    await new Promise<void>(resolve => setTimeout(resolve, 0));
    controller.abort();
    await pending;
    const unhandled: unknown[] = [];
    const onUnhandled = (reason: unknown): void => { unhandled.push(reason); };
    process.on("unhandledRejection", onUnhandled);
    try {
      fail(new Error("late"));
      await new Promise<void>(resolve => setTimeout(resolve, 20));
    } finally {
      process.off("unhandledRejection", onUnhandled);
    }
    expect(unhandled).toStrictEqual([]);
  });

  it("reads the caller's clock once, after the read answers, and rejects a non-ISO reading", async () => {
    const read = seam();
    const clock = vi.fn(() => CLOCK);
    await readClaudeMessageEvidence(refOf(TARGET), deps(read, { capturedAt: clock }));
    expect(clock).toHaveBeenCalledTimes(1);
    for (const bad of ["yesterday", "", "2026-10-15", "x".repeat(100), 42 as unknown as string]) {
      const error = await refusal(readClaudeMessageEvidence(refOf(TARGET), deps(seam(), { capturedAt: () => bad })));
      expect(error.category).toBe("validation");
    }
  });
});

const ch = (point: number): string => String.fromCharCode(point);
const SOFT_HYPHEN = ch(0x00ad);
const ALM = ch(0x061c);
const LRM = ch(0x200e);
const RLM = ch(0x200f);
/** Every character the preview must never carry: controls, soft hyphen, ALM, zero-width, LRM/RLM, bidi marks. */
const HIDDEN = new RegExp(`[${["\\u0000-\\u001f", "\\u007f-\\u009f", "\\u00ad", "\\u061c", "\\u200b-\\u200f", "\\u202a-\\u202e", "\\u2060-\\u2064", "\\u2066-\\u2069", "\\ufeff"].join("")}]`);

describe("wb-6ze.10 respin U4(a) docs/workbench/09 § Data retention and privacy: redact the WHOLE row once before any line split", () => {
  const STRADDLES: readonly { label: string; text: string; secret: string }[] = [
    { label: "Bearer then LF", text: "Authorization: Bearer\nabc123secret", secret: "abc123secret" },
    { label: "Bearer then CRLF", text: "Authorization: Bearer\r\nabc123secret", secret: "abc123secret" },
    { label: "password colon then LF", text: "password:\nhunter2hunter2", secret: "hunter2hunter2" },
    { label: "api_key colon space then LF", text: "api_key: \nxyzsecretvalue", secret: "xyzsecretvalue" },
    { label: "Basic then CR", text: "Basic\rdXNlcjpwYXNzc2VjcmV0", secret: "dXNlcjpwYXNzc2VjcmV0" },
  ];
  for (const { label, text, secret } of STRADDLES) {
    it(`a credential straddling a line break does not leak its value (${label})`, async () => {
      const content = await previewOf(text);
      expect(JSON.stringify(content)).not.toContain(secret);
      expect(content.preview.join("\n")).toContain(MARKER);
    });
  }

  it("ordinary multi-line text still splits into the same lines (the whole-row pass is not a join)", async () => {
    const content = await previewOf("alpha\r\nbeta\rgamma\ndelta");
    expect(content.preview).toStrictEqual(["alpha", "beta", "gamma", "delta"]);
  });
});

describe("wb-6ze.10 respin U4(b) wb-952 shape: strip default-ignorables and bidi marks BEFORE the single redaction", () => {
  const PREFIXED: readonly { label: string; text: string; secret: string }[] = [
    { label: "U+00AD inside Bearer", text: `Bea${SOFT_HYPHEN}rer abc123secret`, secret: "abc123secret" },
    { label: "U+200E inside sk-ant-", text: `sk-ant-${LRM}api03-abcdef123456`, secret: "api03-abcdef123456" },
    { label: "U+200F inside sk-ant-", text: `sk-ant-${RLM}api03-abcdef123456`, secret: "api03-abcdef123456" },
    { label: "U+061C inside sk-ant-", text: `sk-ant-${ALM}api03-abcdef123456`, secret: "api03-abcdef123456" },
  ];
  for (const { label, text, secret } of PREFIXED) {
    it(`a credential split by an invisible mark does not leak (${label})`, async () => {
      const content = await previewOf(text);
      const serialized = JSON.stringify(content);
      expect(serialized).not.toContain(secret);
      expect(content.preview.join("\n")).toContain(MARKER);
      for (const line of content.preview) expect(line).not.toMatch(HIDDEN);
    });
  }

  it("no preview line carries any hidden or bidi character after a mixed corpus", async () => {
    const content = await previewOf(`a${SOFT_HYPHEN}b${ALM}c${LRM}d${RLM}e\nf${ch(0x200b)}g${ch(0x202e)}h${ch(0xfeff)}i`);
    for (const line of content.preview) expect(line).not.toMatch(HIDDEN);
    expect(content.preview).toStrictEqual(["abcde", "fghi"]);
  });
});
