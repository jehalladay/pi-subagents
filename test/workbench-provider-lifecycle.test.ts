/** Provider-boundary regression tests: native custody, typed grants, and bounded CLI output. */
import { chmodSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { HyperUnix, type Workspace } from "@hyperunix/sdk";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { nativeFurnaceRunInspect, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { nativeHyperUnixFind, registerNativeHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { nativeReactiveFiberPreview } from "../src/workbench/providers/reactivefiber.js";

const furnaceMocks = vi.hoisted(() => ({ version: vi.fn(), inspect: vi.fn(), constructor: vi.fn() }));
vi.mock("@furnace/sdk", () => ({
  Furnace: class {
    constructor(options: unknown) { furnaceMocks.constructor(options); }
    version = furnaceMocks.version;
    runs = { get: (_id: string) => ({ inspect: furnaceMocks.inspect }) };
  },
}));

const folders: string[] = [];
const oldPath = process.env.PATH;
const oldHx = process.env.HYPERUNIX_HX;
afterEach(() => {
  vi.restoreAllMocks();
  furnaceMocks.version.mockReset();
  furnaceMocks.inspect.mockReset();
  furnaceMocks.constructor.mockReset();
  process.env.PATH = oldPath;
  if (oldHx === undefined) delete process.env.HYPERUNIX_HX;
  else process.env.HYPERUNIX_HX = oldHx;
  for (const folder of folders.splice(0)) rmSync(folder, { recursive: true, force: true });
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(done => { resolve = done; });
  return { promise, resolve };
}

function fakeRf(body: string): void {
  const folder = mkdtempSync(join(tmpdir(), "workbench-rf-lifecycle-"));
  folders.push(folder);
  const script = join(folder, "rf");
  writeFileSync(script, `#!${process.execPath}\n${body}\n`);
  chmodSync(script, 0o700);
  process.env.PATH = folder;
}

describe("HyperUnix SDK custody", () => {
  it("delegates binary selection to SDK PATH discovery and enforces read grants", async () => {
    delete process.env.HYPERUNIX_HX;
    const client = {
      find: vi.fn().mockResolvedValue({ rows: [], coverage: [], streams: [], diagnostics: [], status: { exitCode: 3, signal: null, terminalReached: true, framesTotal: 0, diagnosticCode: "HX-COVERAGE-INCOMPLETE", kind: "incomplete" }, transport: {}, coverageSummary: { certificates: [], modes: [], completeness: "incomplete", licensesAbsence: false, certificatesLicenseAbsence: false, incompleteRegions: [] }, evidence: { supportIds: [], evidenceClasses: [], derivationHandles: [], providers: [], providerVersions: {} } }), runtime: vi.fn().mockResolvedValue({ version: "0.1.0", binarySha256: "abc" }),
      dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined),
    };
    const open = vi.spyOn(HyperUnix, "open").mockReturnValue({client,find:client.find} as unknown as Workspace);
    const registry = new CapabilityRegistry();
    registerNativeHyperUnixFind(registry, process.cwd());
    await expect(registry.invoke("hyperunix.find", { kind: "hx.fs/regular-file" }, { grants: [], signal: new AbortController().signal })).rejects.toMatchObject({ category: "authorization" });
    expect(open).not.toHaveBeenCalled();
    await nativeHyperUnixFind(process.cwd(), "hx.fs/regular-file");
    expect(open).toHaveBeenCalledWith(process.cwd());
    expect(client.close).toHaveBeenCalledOnce();
  });

  it("preserves incomplete native coverage instead of inventing absence", async () => {
    const native = { rows: [], coverage: [], streams: [], diagnostics: [], status: { exitCode: 3, signal: null, terminalReached: true, framesTotal: 0, diagnosticCode: "HX-COVERAGE-INCOMPLETE", kind: "incomplete" }, transport: {}, coverageSummary: { certificates: [], modes: [], completeness: "incomplete", licensesAbsence: false, certificatesLicenseAbsence: false, incompleteRegions: [] }, evidence: { supportIds: [], evidenceClasses: [], derivationHandles: [], providers: [], providerVersions: {} } };
    const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: "0.1.0", binarySha256: "abc" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };
    vi.spyOn(HyperUnix, "open").mockReturnValue({client,find:client.find} as unknown as Workspace);
    const result = await nativeHyperUnixFind(process.cwd(), "hx.fs/regular-file");
    expect(result).toMatchObject({source:{status:{exit_code:3},coverage_summary:{licenses_absence:false,completeness:"incomplete"}}});
  });

  it("closes an SDK client when abort fires during asynchronous open, before find", async () => {
    const pending = deferred<{version:string;binarySha256:string}>();
    const client = { find: vi.fn(), runtime: vi.fn().mockReturnValue(pending.promise), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };
    vi.spyOn(HyperUnix, "open").mockReturnValue({client,find:client.find} as unknown as Workspace);
    const abort = new AbortController();
    const result = nativeHyperUnixFind(process.cwd(), "hx.fs/regular-file", "src", abort.signal);
    abort.abort();
    expect(client.dispose).toHaveBeenCalledOnce();
    pending.resolve({version:"0.1.0",binarySha256:"abc"});
    await expect(result).rejects.toMatchObject({ category: "transport" });
    expect(client.find).not.toHaveBeenCalled();
    expect(client.dispose).toHaveBeenCalledOnce();
    expect(client.close).toHaveBeenCalledOnce();
  });
});

describe("Furnace SDK read ownership", () => {
  it("refuses an unauthorized request before any native read and preserves native envelope", async () => {
    const registry = new CapabilityRegistry();
    // A real RunDto always records its workspace; the provider refuses a record it cannot attribute to the authorized root.
    const inspect = vi.fn().mockResolvedValue({ kind: "run", data: { run_id: "frn-1", state: "active", workspace: process.cwd() }, requestId: "req-1", exit: { code: 0, signal: null } });
    registerFurnaceRunInspect(registry, { runs: { get: () => ({ inspect }) } }, process.cwd());
    await expect(registry.invoke("furnace.run.inspect", { runId: "frn-1" }, { grants: [], signal: new AbortController().signal })).rejects.toMatchObject({ category: "authorization" });
    expect(inspect).not.toHaveBeenCalled();
    const returned = await registry.invoke("furnace.run.inspect", { runId: "frn-1" }, { grants: ["furnace:inspect"], signal: new AbortController().signal });
    expect(returned).toMatchObject({ source: { kind: "run", data: { run_id: "frn-1" }, requestId: "req-1", exit: { code: 0 } } });
  });

  it("honors cancellation before native launch without creating a Furnace client", async () => {
    const controller = new AbortController(); controller.abort();
    await expect(nativeFurnaceRunInspect(process.cwd(), "frn-1", controller.signal)).rejects.toMatchObject({ category: "transport" });
    expect(furnaceMocks.constructor).not.toHaveBeenCalled();
  });

  it("waits for a bounded native read to settle then reports a mid-flight cancellation", async () => {
    const pending = deferred<{ kind: string; data: { run_id: string } }>();
    furnaceMocks.version.mockResolvedValue({ data: { version: "0.1.0" } });
    furnaceMocks.inspect.mockReturnValue(pending.promise);
    const controller = new AbortController();
    const read = nativeFurnaceRunInspect(process.cwd(), "frn-1", controller.signal);
    await vi.waitFor(() => expect(furnaceMocks.inspect).toHaveBeenCalledOnce());
    controller.abort();
    pending.resolve({ kind: "run", data: { run_id: "frn-1" } });
    await expect(read).rejects.toMatchObject({ category: "transport" });
    expect(furnaceMocks.constructor).toHaveBeenCalledWith(expect.objectContaining({ timeoutMs: 30_000 }));
  });
});

describe("RF stand-in hermeticity (wb-n0z: a refusal row never goes green through the host rf)", () => {
  it("the stand-in is the only PATH entry, so no host rf can ever be resolved behind it", () => {
    fakeRf('process.stdout.write("{}");');
    expect(process.env.PATH?.split(delimiter)).toHaveLength(1);
  });

  it("a stand-in that cannot be executed refuses as could-not-launch, never through the host rf", async () => {
    fakeRf('process.stdout.write("{}");');
    chmodSync(join(process.env.PATH ?? "", "rf"), 0o600);
    await expect(nativeReactiveFiberPreview("model", "task", process.cwd())).rejects.toMatchObject({ category: "transport", message: "RF preview could not launch the installed binary." });
  });

  it("the stand-in interpreter is the absolute node of this run, not a PATH lookup", () => {
    fakeRf('process.stdout.write("{}");');
    expect(readFileSync(join(process.env.PATH ?? "", "rf"), "utf8").split("\n")[0]).toBe(`#!${process.execPath}`);
  });
});

describe("RF CLI process custody", () => {
  it("turns malformed JSON into a typed transport error without echoing untrusted bytes", async () => {
    fakeRf('process.stdout.write("{private-key:secret-token");');
    await expect(nativeReactiveFiberPreview("model", "task", process.cwd())).rejects.toMatchObject({ category: "transport", message: "RF preview returned malformed JSON." });
    await expect(nativeReactiveFiberPreview("model", "task", process.cwd())).rejects.not.toThrow(/secret-token/);
  });

  it("rejects a forged success envelope that cannot prove ephemeral provenance", async () => {
    fakeRf('process.stdout.write(JSON.stringify({schema:"reactive-fiber.cli/v1",ok:true,command:"context.render",transaction_id:"txn",result:{ephemeral:false,render_id:"committed",provenance:{graph_revision_id:"x"}},diagnostics:[]}));');
    await expect(nativeReactiveFiberPreview("model", "task", process.cwd())).rejects.toMatchObject({category:"transport", message: "RF preview returned an unrecognized native envelope."});
  });

  it("caps stderr independently even when the child ignores SIGTERM", async () => {
    fakeRf('process.on("SIGTERM",()=>{}); process.stderr.write("x".repeat(300000)); setInterval(()=>{},1000);');
    const start = Date.now();
    await expect(nativeReactiveFiberPreview("model", "task", process.cwd())).rejects.toThrow(/stderr|output size/i);
    expect(Date.now()-start).toBeLessThan(5000);
  }, 10_000);

  it("keeps the preview reading to exactly {contract, workspaceRoot, source} when rf writes perf-counter JSON to stderr (wb-2j3.8 R9)", async () => {
    // ACCEPTANCE (1): nativeReactiveFiberPreview carries exactly {contract, workspaceRoot, source} and no stderr-derived field.
    // ACCEPTANCE (2): stderr is byte-counted only; sub-cap stderr content never reaches the reading.
    const id = "a".repeat(22);
    const envelope = {
      schema: "reactive-fiber.cli/v1", ok: true, command: "context.render",
      operation_id: `rfo_${id}`, workspace: { id: `rfw_${id}`, root: process.cwd() },
      transaction_id: null,
      result: {
        ephemeral: true, render_id: null, output: { text: "context" },
        provenance: { graph_revision_id: `sha256:${"a".repeat(64)}` },
        budget: { formula_terms: { context_window: 1000000, output_reserve: 8192, occupied_tokens: 0, overhead: 0, safety_margin: 2048, available_context_tokens: 989760 } },
        diagnostics_summary: { errors: 0, warnings: 0, has_errors: false, has_warnings: false },
        work: { source_capture_count: 0, fiber_signal_count: 0, component_render_count: 0, lens_resolution_count: 0, necessity_eval_count: 0, storage_write_count: 0 },
      },
      diagnostics: [],
    };
    const perfRecord = JSON.stringify({ perf_counters: { wall_ms: 12, graph_nodes: 7 }, debug_event: "stderr-canary-wb-2j3-8" });
    fakeRf(`process.stderr.write(${JSON.stringify(`${perfRecord}\n${"d".repeat(100000)}`)}); process.stdout.write(${JSON.stringify(JSON.stringify(envelope))});`);
    const reading = await nativeReactiveFiberPreview("model", "task", process.cwd());
    expect(Object.keys(reading as Record<string, unknown>).sort()).toEqual(["contract", "source", "workspaceRoot"]);
    expect(reading).toEqual({ contract: "reactivefiber.render.preview/v1", workspaceRoot: process.cwd(), source: envelope });
    const serialized = JSON.stringify(reading);
    expect(serialized).not.toContain("stderr-canary-wb-2j3-8");
    expect(serialized).not.toContain("perf_counters");
  }, 10_000);

  it("caps stdout independently and reaps a child that ignores SIGTERM", async () => {
    fakeRf('process.on("SIGTERM",()=>{}); process.stdout.write("x".repeat(300000)); setInterval(()=>{},1000);');
    const start = Date.now();
    await expect(nativeReactiveFiberPreview("model", "task", process.cwd())).rejects.toThrow(/stdout output size/);
    expect(Date.now()-start).toBeLessThan(5000);
  }, 10_000);

  it("rejects an aborted request before creating an RF process", async () => {
    const controller = new AbortController(); controller.abort();
    const folder = mkdtempSync(join(tmpdir(), "workbench-rf-no-start-"));
    folders.push(folder);
    const marker = join(folder, "started");
    fakeRf(`require("node:fs").writeFileSync(${JSON.stringify(marker)},"started")`);
    await expect(nativeReactiveFiberPreview("model", "task", process.cwd(), controller.signal)).rejects.toMatchObject({category:"transport", message: "RF preview cancelled before launch."});
    expect(existsSync(marker)).toBe(false);
  });

  it("returns a typed error when rf cannot be spawned", async () => {
    const folder = mkdtempSync(join(tmpdir(), "workbench-rf-absent-"));
    folders.push(folder);
    process.env.PATH = folder;
    await expect(nativeReactiveFiberPreview("model", "task", process.cwd())).rejects.toMatchObject({category:"transport", message: "RF preview could not launch the installed binary."});
  });

  it("escalates aborted noncooperative children to SIGKILL within a deadline", async () => {
    const folder = mkdtempSync(join(tmpdir(), "workbench-rf-ready-"));
    folders.push(folder);
    const marker = join(folder, "ready");
    fakeRf(`const fs=require("node:fs"); process.on("SIGTERM",()=>{}); fs.writeFileSync(${JSON.stringify(marker)},"ready"); setInterval(()=>{},1000);`);
    const controller = new AbortController();
    const result = nativeReactiveFiberPreview("model", "task", process.cwd(), controller.signal);
    await vi.waitFor(() => expect(existsSync(marker)).toBe(true));
    const start = Date.now(); controller.abort();
    await expect(result).rejects.toMatchObject({ category: "transport" });
    expect(Date.now()-start).toBeLessThan(5000);
  }, 10_000);
});
