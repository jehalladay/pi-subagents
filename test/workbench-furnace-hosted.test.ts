import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { connect, type Socket } from "node:net";
import { dirname, join } from "node:path";
import { createInterface } from "node:readline";
import type { ExecutorCallback, ExecutorOptions, FurnaceOptions, RunStartRequest } from "@furnace/sdk";
import ts from "typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  FURNACE_HOSTED_CONTRACT,
  type FurnaceHostedClient,
  FurnaceHostedExecutor,
  type FurnaceHostedOptions,
  type FurnaceSdk,
  type HostedOutcome,
  type HostedReceipt,
  type HostedWorkflow,
  SHIPPED_FURNACE_SDK,
} from "../src/workbench/hosts/furnace-hosted.js";
import { chooseScratchBase, SOCKET_PATH_BOUND, scratchBaseBudget } from "./helpers/fixture-roots.js";
import { installScratchLeakGuard } from "./helpers/scratch.js";

installScratchLeakGuard();

type Line = Record<string, unknown>;
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** The driver side of one bridge: what Furnace's extension driver says over one connection. */
class Bridge {
  readonly lines: Line[] = [];
  private constructor(readonly socket: Socket) {
    createInterface({ input: socket }).on("line", (raw) => this.lines.push(JSON.parse(raw) as Line));
  }
  static async open(socketPath: string): Promise<Bridge> {
    const socket = connect(socketPath);
    await new Promise<void>((resolve, reject) => {
      socket.once("connect", resolve);
      socket.once("error", reject);
    });
    return new Bridge(socket);
  }
  send(line: Line): void {
    this.socket.write(`${JSON.stringify(line)}\n`);
  }
  async until(match: (line: Line) => boolean, timeoutMs = 4000): Promise<Line> {
    const deadline = Date.now() + timeoutMs;
    for (;;) {
      const found = this.lines.find(match);
      if (found) return found;
      if (Date.now() > deadline) throw new Error(`bridge saw no matching line: ${JSON.stringify(this.lines)}`);
      await sleep(5);
    }
  }
  end(): void {
    this.socket.destroy();
  }
}

const context = (attemptId: string, ordinal: number, workId = "bd-work-1") => ({
  context_version: 1,
  run: { furnace_run_id: "frn-run-fake", beads_run_id: "bd-run-fake", formula: "fixture" },
  work: { beads_work_id: workId, title: "fixture step", description: null, acceptance_criteria: null },
  attempt: { attempt_id: attemptId, ordinal, deadline: null },
  workspace: { root: "/tmp/fixture" },
});

async function hello(bridge: Bridge): Promise<Line> {
  bridge.send({ op: "hello", request_id: "h", input: { supported_protocol_versions: [1] } });
  return bridge.until((line) => line.op === "hello");
}
function execute(bridge: Bridge, executor: string, executionId: string, attemptId: string, ordinal: number): void {
  bridge.send({ op: "execute", protocol_version: 1, request_id: `e-${executionId}`, input: { execution_id: executionId, executor, context: context(attemptId, ordinal) } });
}
const terminalOf = (bridge: Bridge, executionId: string): Promise<Line> =>
  bridge.until((line) => {
    const event = line.event as { execution_id?: string; kind?: string } | undefined;
    return event?.execution_id === executionId && event.kind === "terminal";
  });
const resultOf = (terminal: Line): { status: string; summary?: string } => ((terminal.event as { payload: { result: { status: string; summary?: string } } }).payload.result);

/** One Attempt exactly as Furnace drives it: its own connection, hello, execute, terminal. */
async function driveAttempt(socketPath: string, executor: string, attemptId: string, ordinal: number, cancel?: { afterMs: number; reason: string }) {
  const bridge = await Bridge.open(socketPath);
  const helloReply = await hello(bridge);
  execute(bridge, executor, `ex-${attemptId}`, attemptId, ordinal);
  const accepted = await bridge.until((line) => line.op === "execute");
  if (cancel) {
    await bridge.until((line) => (line.event as { kind?: string } | undefined)?.kind === "started");
    await sleep(cancel.afterMs);
    bridge.send({ op: "cancel", protocol_version: 1, request_id: "c", input: { execution_id: `ex-${attemptId}`, reason: cancel.reason } });
  }
  const terminal = await terminalOf(bridge, `ex-${attemptId}`);
  bridge.end();
  return { helloReply, accepted, terminal, result: resultOf(terminal) };
}

const socketOf = (options: FurnaceOptions): string => {
  const text = readFileSync(options.config ?? "", "utf8");
  const args = /args = \[("[^"]*"), ("[^"]*")\]/.exec(text);
  if (!args?.[2]) throw new Error(`no bridge socket in config:\n${text}`);
  return JSON.parse(args[2]) as string;
};

interface Harness {
  readonly executor: FurnaceHostedExecutor;
  readonly clients: FurnaceOptions[];
  readonly starts: RunStartRequest[];
  readonly calls: Array<{ timeoutMs?: number | undefined }>;
  readonly configTexts: string[];
}
function harness(
  sdk: FurnaceSdk,
  workflow: HostedWorkflow,
  script: (socketPath: string, options: FurnaceOptions) => Promise<void>,
  overrides: Partial<FurnaceHostedOptions> = {},
): Harness {
  const clients: FurnaceOptions[] = [];
  const starts: RunStartRequest[] = [];
  const calls: Array<{ timeoutMs?: number | undefined }> = [];
  const configTexts: string[] = [];
  const createClient = (options: FurnaceOptions): FurnaceHostedClient => {
    clients.push(options);
    return {
      runs: {
        async start(request, call) {
          starts.push(request);
          calls.push({ timeoutMs: call?.timeoutMs });
          configTexts.push(readFileSync(options.config ?? "", "utf8"));
          await script(socketOf(options), options);
          return { record: { run_id: "frn-run-fake", beads_run_id: "bd-run-fake" }, requestId: "req-fake" };
        },
      },
    };
  };
  const executor = new FurnaceHostedExecutor({ executor: "pi-hosted", workflow, sdk, createClient, ...overrides });
  return { executor, clients, starts, calls, configTexts };
}

/**
 * wb-70b R1: the vendored EmbeddedHost places its bridge socket at <tmpdir()>/furnace-embedded-XXXXXX/host.sock and each
 * case points TMPDIR at its fixture root, so the root must not inherit the caller's TMPDIR depth. Base per the
 * shortScratchBase() rule: XDG_RUNTIME_DIR first, /tmp only as the recorded fallback, never the inherited TMPDIR.
 */
const SCRATCH_BASE_MAX_BYTES = scratchBaseBudget("/pi-furnace-hosted-test-XXXXXX/furnace-embedded-XXXXXX/host.sock");
const SCRATCH_BASE = chooseScratchBase(process.env, SCRATCH_BASE_MAX_BYTES);
let scratch: string;
const previousTmp = process.env.TMPDIR;
const SHA256 = /sha256:[0-9a-f]{64}/;
/** The two digests of the SDK as INSTALLED from vendor/furnace-sdk-0.1.0.tgz: the manifest's and the generated validators' provenance (wb-zby). */
function installedDigests(): { manifest: string; provenance: string } {
  const root = dirname(createRequire(import.meta.url).resolve("@furnace/sdk/package.json"));
  const manifest = SHA256.exec(readFileSync(join(root, "contract/manifest.json"), "utf8"))?.[0] ?? "<none>";
  const provenance = SHA256.exec(readFileSync(join(root, "dist/contract/furnace-executor-contract/provenance.js"), "utf8"))?.[0] ?? "<none>";
  return { manifest, provenance };
}
/** A context the generated validators accept; the same shape the wb-0kg.4 tier decodes. */
const CANONICAL_CONTEXT_DOCUMENT = {
  context_version: 1,
  run: { furnace_run_id: "frn-run-x", beads_run_id: "bd-run-x", formula: null },
  work: { beads_work_id: "bd-work-x", title: null, description: null, acceptance_criteria: null },
  attempt: { attempt_id: "frn-atm-x", ordinal: 1, deadline: null },
  workspace: { root: "/" },
};
beforeEach(() => {
  scratch = mkdtempSync(join(SCRATCH_BASE.path, "pi-furnace-hosted-test-"));
  process.env.TMPDIR = scratch;
});
afterEach(() => {
  if (previousTmp === undefined) delete process.env.TMPDIR;
  else process.env.TMPDIR = previousTmp;
  rmSync(scratch, { recursive: true, force: true });
});
const success: HostedWorkflow = async () => ({ status: "success", summary: "done" });

/**
 * wb-lrz.1 / wb-lrz.2 source census helpers. prose(): comment leaders stripped and whitespace collapsed, so a sentence
 * wrapped across lines reads as one. clausesOf(): split after a clause-ending . ; ! ? followed by whitespace, so
 * "retry.*" and "README.md" stay whole and a colon never separates a class name from its verb. RETRY_WORD: retry,
 * retries, retried, re-attempt(s|ed). NEGATED_RETRY: a retry word governed by never/not/no/nor (one adverb allowed),
 * capturing what it governs up to the clause end. These are bounded text censuses over one module, not a parser: they
 * pin the shapes named in each case.
 */
const HOSTED_SOURCE_URL = new URL("../src/workbench/hosts/furnace-hosted.ts", import.meta.url);
const prose = (text: string): string => text.replace(/^[ \t]*(?:\*|\/\/)[ \t]?/gm, "").replace(/\s+/g, " ").trim();
const clausesOf = (text: string): string[] => text.split(/(?<=[.;!?])\s+/).filter((clause) => clause !== "");
const RETRY_WORD = /\b(?:retr(?:y|ies|ied|ying)|re-?attempt(?:s|ed|ing)?)\b/i;
const NEGATED_RETRY = /\b(?:never|not|no|nor)\s+(?:\w+\s+)?(?:retr(?:y|ies|ied|ying)|re-?attempt(?:s|ed|ing)?)\b([^.;]*)/gi;
function moduleHeader(source: string): string {
  const end = source.indexOf("*/");
  if (!source.startsWith("/**") || end < 0) throw new Error("furnace-hosted.ts lost its leading module header");
  return prose(source.slice(3, end));
}

describe("Furnace-hosted execution adapter", () => {
  it("ships one artifact (wb-zby): the vendored SDK's manifest digest equals its generated provenance digest, and the shipped SDK decodes the canonical context", () => {
    const { manifest, provenance } = installedDigests();
    expect(manifest).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(provenance).toBe(manifest);
    expect(SHIPPED_FURNACE_SDK.decodeContextValue(CANONICAL_CONTEXT_DOCUMENT).context.attempt.attempt_id).toBe("frn-atm-x");
  });

  it("opens one embedded host per Run, writes the extension config, and forwards only a wisp start", async () => {
    const h = harness(SHIPPED_FURNACE_SDK, success, async () => undefined, { furnace: { cwd: "/tmp/ws", stateDir: "/tmp/ws/.state", timeoutMs: 30_000 }, startTimeoutMs: 20_000 });
    const started = await h.executor.start({ formula: "fixture", vars: { target: "x" } });
    expect(started).toMatchObject({ runId: "frn-run-fake", beadsRunId: "bd-run-fake", requestId: "req-fake" });
    expect(h.starts).toEqual([{ formula: "fixture", vars: { target: "x" } }]);
    expect(h.starts[0]).not.toHaveProperty("persistent");
    expect(h.calls).toEqual([{ timeoutMs: 20_000 }]);
    expect(h.clients[0]).toMatchObject({ cwd: "/tmp/ws", stateDir: "/tmp/ws/.state", timeoutMs: 30_000 });
    expect(h.configTexts[0]).toContain('executor = "pi-hosted"');
    expect(h.configTexts[0]).toContain("[executors.pi-hosted]");
    expect(h.configTexts[0]).toContain('driver = "extension"');
    await h.executor.close();
  });

  it("receipts each Attempt by its own admission receipt and names the admitting session: three connections give three sessions whose receipts each end /1", async () => {
    const seen: string[] = [];
    const seenReceipts: string[] = [];
    const workflow: HostedWorkflow = async ({ identity }) => {
      seen.push(identity.attemptId);
      seenReceipts.push(identity.admissionReceipt);
      return { status: "success", summary: `attempt ${identity.ordinal}` };
    };
    const results: Array<Awaited<ReturnType<typeof driveAttempt>>> = [];
    const h = harness(SHIPPED_FURNACE_SDK, workflow, async (socketPath) => {
      for (const [index, attemptId] of ["frn-atm-a1", "frn-atm-a2", "frn-atm-a3"].entries()) results.push(await driveAttempt(socketPath, "pi-hosted", attemptId, index + 1));
    });
    await h.executor.start({ formula: "fixture" });
    expect(seen).toEqual(["frn-atm-a1", "frn-atm-a2", "frn-atm-a3"]);
    expect(results.map((r) => r.result.status)).toEqual(["success", "success", "success"]);
    const receipt = h.executor.receipt();
    expect(receipt.contract).toBe(FURNACE_HOSTED_CONTRACT);
    expect(receipt.attempts.map((a) => [a.attemptId, a.ordinal, a.terminal])).toEqual([
      ["frn-atm-a1", 1, "success"],
      ["frn-atm-a2", 2, "success"],
      ["frn-atm-a3", 3, "success"],
    ]);
    const sessions = receipt.attempts.map((a) => a.sessionInstanceId);
    expect(new Set(sessions).size).toBe(3);
    for (const [index, result] of results.entries()) {
      const hostInstance = (result.helloReply.output as { host: { instance_id: string } }).host.instance_id;
      expect(hostInstance).toBe(sessions[index]);
      // The SDK mints receipts as <instance_id>/<process token>/<n> (ResidentSession.mintReceipt, @furnace/sdk at Furnace 9970621d8).
      expect((result.accepted.output as { receipt: string }).receipt).toMatch(new RegExp(`^${hostInstance}/[0-9a-f]{16}/1$`));
      expect(receipt.attempts[index]?.admissionReceipt).toBe((result.accepted.output as { receipt: string }).receipt);
    }
    const receipts = receipt.attempts.map((a) => a.admissionReceipt);
    expect(seenReceipts).toEqual(receipts);
    expect(receipt.sessions).toEqual(sessions.map((s, i) => ({ sessionInstanceId: s, admissionReceipts: [receipts[i]] })));
    expect(receipt.identityViolations).toEqual([]);
    await h.executor.close();
  });

  it("admits a Run's sequential Attempts on ONE kept connection: distinct admission receipts /1 and /2 on one session, no identity violation", async () => {
    const acks: Line[] = [];
    const h = harness(SHIPPED_FURNACE_SDK, success, async (socketPath) => {
      const bridge = await Bridge.open(socketPath);
      await hello(bridge);
      execute(bridge, "pi-hosted", "ex-1", "frn-atm-k1", 1);
      await terminalOf(bridge, "ex-1");
      execute(bridge, "pi-hosted", "ex-2", "frn-atm-k2", 2);
      await terminalOf(bridge, "ex-2");
      acks.push(await bridge.until((line) => line.op === "execute" && line.request_id === "e-ex-1"));
      acks.push(await bridge.until((line) => line.op === "execute" && line.request_id === "e-ex-2"));
      bridge.end();
    });
    await h.executor.start({ formula: "fixture" });
    const receipt = h.executor.receipt();
    expect(receipt.identityViolations).toEqual([]);
    expect(receipt.attempts).toHaveLength(2);
    const [first, second] = receipt.attempts;
    expect(first?.sessionInstanceId).toBe(second?.sessionInstanceId);
    const minted = acks.map((ack) => (ack.output as { receipt: string }).receipt);
    expect(first?.admissionReceipt).toBe(minted[0]);
    expect(second?.admissionReceipt).toBe(minted[1]);
    expect(first?.admissionReceipt).toMatch(/\/1$/);
    expect(second?.admissionReceipt).toMatch(/\/2$/);
    expect(second?.admissionReceipt).not.toBe(first?.admissionReceipt);
    expect(receipt.sessions).toEqual([{ sessionInstanceId: first?.sessionInstanceId, admissionReceipts: [minted[0], minted[1]] }]);
    await h.executor.close();
  });

  /**
   * wb-lrz.5 (FURNACE-PI-R1, FHFD-PI-1): the adapter registers its executor with no durability declaration, so the hello
   * reply its bridge host gives Furnace's extension driver advertises a DurabilityProfile whose every member is false: the
   * executor claims no resolve, reattach, checkpoint, restore, replay or cancel-continuity capability. Furnace sends a
   * durable operation only to an executor whose profile sets that member true and reads an absent profile as all-false
   * (Furnace:executor-protocol/registry/durability-profile-rules.json@8f20e9bb8; docs/durable-execution/
   * 00-scope-and-decisions.md:346 "An executor without `durability` claims nothing: every member reads false"). The
   * shipped SDK (SHIPPED_FURNACE_SDK, vendored from Furnace 9970621d8 since wb-zby) emits `durability` on EVERY hello
   * (dist/src/resident_session.js hello: `this.app.durability(name).toDocument()`), so these rows pin the WIRE claim read
   * from a captured hello reply, beside the receipt's own `limits.crashDurability: "none"`, rather than the absence of a
   * declaration in the source alone. The negative control drives the same assertion against an executor registered WITH
   * `{ durability: { checkpoint: true } }` and requires it to fail, proving the assertion reads the wire. The census pins
   * the registration's two-argument form so a copied `{ durability }` example or a re-vendored SDK (wb-lrz.4 re-runs
   * these rows) cannot turn the claim true unnoticed.
   */
  describe("advertises no durability claim on the wire (wb-lrz.5)", () => {
    /** The nine DurabilityProfile members of the vendored registry (contract/registry/durability-profile-rules.json), sorted. */
    const PROFILE_MEMBERS = [
      "cancel_after_controller_restart",
      "checkpoint",
      "checkpoint_survives_host_restart",
      "checkpoint_survives_machine_restart",
      "deduplicate_admission",
      "event_replay",
      "reattach_after_controller_restart",
      "resolve_by_execution_id",
      "restore",
    ];
    const isObject = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

    /** The descriptor a captured hello reply advertises for `executor`: exactly one entry must carry that name. */
    const advertised = (helloReply: Line, executor: string): Record<string, unknown> => {
      const output = helloReply.output;
      expect(isObject(output), "the hello reply carries an output object").toBe(true);
      const executors = isObject(output) ? output.executors : undefined;
      expect(Array.isArray(executors), "the hello output lists executors").toBe(true);
      const named = (Array.isArray(executors) ? executors : []).filter((entry): entry is Record<string, unknown> => isObject(entry) && entry.name === executor);
      expect(named, `the hello advertises exactly one executor named ${executor}`).toHaveLength(1);
      return named[0] ?? {};
    };

    /** The one assertion the wire row and the negative control share: exactly the nine members, every one false. */
    const expectNoDurabilityClaim = (helloReply: Line, executor: string): void => {
      const entry = advertised(helloReply, executor);
      expect(isObject(entry.durability), "the descriptor carries a durability object").toBe(true);
      const profile = isObject(entry.durability) ? entry.durability : {};
      expect(Object.keys(profile).sort()).toStrictEqual(PROFILE_MEMBERS);
      for (const member of PROFILE_MEMBERS) expect(profile[member], `durability.${member}`).toBe(false);
      expect(Array.isArray(entry.capabilities), "the descriptor lists capabilities").toBe(true);
      const capabilities = Array.isArray(entry.capabilities) ? entry.capabilities : [];
      expect(capabilities, "the capability list read is the real one").toContain("execute");
      for (const capability of capabilities) {
        expect(PROFILE_MEMBERS, `capability ${String(capability)} names no profile member`).not.toContain(capability);
        expect(String(capability), `capability ${String(capability)} carries no durability token`).not.toMatch(/durab/i);
      }
    };

    interface RegistrationCensus {
      readonly executorCalls: ReadonlyArray<{ readonly arguments: number; readonly spread: boolean }>;
      readonly registerCalls: number;
      readonly durabilityKeys: number;
    }
    const PINNED_REGISTRATION: RegistrationCensus = { executorCalls: [{ arguments: 2, spread: false }], registerCalls: 0, durabilityKeys: 0 };
    const parse = (source: string): ts.SourceFile => ts.createSourceFile("furnace-hosted.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const visitAll = (node: ts.Node, visit: (node: ts.Node) => void): void => {
      visit(node);
      ts.forEachChild(node, (child) => visitAll(child, visit));
    };
    /** Every `this.app.<method>(...)` call in the file, read from its syntax tree (a comment or a string is never a call). */
    const appCalls = (file: ts.SourceFile, method: "executor" | "register"): ts.CallExpression[] => {
      const calls: ts.CallExpression[] = [];
      visitAll(file, (node) => {
        if (!ts.isCallExpression(node) || !ts.isPropertyAccessExpression(node.expression) || node.expression.name.text !== method) return;
        const receiver = node.expression.expression;
        if (ts.isPropertyAccessExpression(receiver) && receiver.expression.kind === ts.SyntaxKind.ThisKeyword && receiver.name.text === "app") calls.push(node);
      });
      return calls;
    };
    const keyText = (name: ts.Node): string | undefined => {
      if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name)) return name.text;
      if (ts.isComputedPropertyName(name)) return keyText(name.expression);
      return undefined;
    };
    /** How the file registers executors: each `this.app.executor` call's shape, `this.app.register` calls, and `durability` keys in any object literal. */
    const registrationCensus = (source: string): RegistrationCensus => {
      const file = parse(source);
      let durabilityKeys = 0;
      visitAll(file, (node) => {
        if ((ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) && keyText(node.name) === "durability") durabilityKeys += 1;
      });
      return {
        executorCalls: appCalls(file, "executor").map((call) => ({ arguments: call.arguments.length, spread: call.arguments.some((argument) => ts.isSpreadElement(argument)) })),
        registerCalls: appCalls(file, "register").length,
        durabilityKeys,
      };
    };

    it("advertises exactly the nine DurabilityProfile members on the wire, every one false, beside the receipt's crashDurability none", async () => {
      let helloReply: Line | undefined;
      const h = harness(SHIPPED_FURNACE_SDK, success, async (socketPath) => {
        helloReply = (await driveAttempt(socketPath, "pi-hosted", "frn-atm-durability", 1)).helloReply;
      });
      await h.executor.start({ formula: "fixture" });
      expect(helloReply, "a hello reply was captured from the bridge").toBeDefined();
      expectNoDurabilityClaim(helloReply ?? {}, "pi-hosted");
      expect(h.executor.receipt().limits.crashDurability).toBe("none");
      await h.executor.close();
    });

    it("fails that same assertion for an executor registered with { durability: { checkpoint: true } }: it reads the wire, not a constant", async () => {
      const ShippedApp = SHIPPED_FURNACE_SDK.ExecutorApp;
      /** A fixture SDK that adds ONE durability claim to the adapter's own registration; nothing else differs from the shipped SDK. */
      class CheckpointClaimingApp extends ShippedApp {
        override executor(name: string, callback: ExecutorCallback, options: ExecutorOptions = {}): ExecutorCallback {
          return super.executor(name, callback, { ...options, durability: { checkpoint: true } });
        }
      }
      const claiming: FurnaceSdk = { ...SHIPPED_FURNACE_SDK, ExecutorApp: CheckpointClaimingApp };
      let helloReply: Line | undefined;
      const h = harness(claiming, success, async (socketPath) => {
        helloReply = (await driveAttempt(socketPath, "pi-hosted", "frn-atm-claims-checkpoint", 1)).helloReply;
      });
      await h.executor.start({ formula: "fixture" });
      expect(helloReply, "a hello reply was captured from the bridge").toBeDefined();
      const captured = helloReply ?? {};
      expect(() => expectNoDurabilityClaim(captured, "pi-hosted")).toThrow(/durability\.checkpoint/);
      // The failure is exactly that one claim: the same nine members travel and only checkpoint reads true.
      expect(advertised(captured, "pi-hosted").durability).toStrictEqual(Object.fromEntries(PROFILE_MEMBERS.map((member) => [member, member === "checkpoint"])));
      await h.executor.close();
    });

    it("registers through exactly one two-argument this.app.executor call and writes no durability option key (source census)", () => {
      const source = readFileSync(new URL("../src/workbench/hosts/furnace-hosted.ts", import.meta.url), "utf8");
      expect(registrationCensus(source)).toStrictEqual(PINNED_REGISTRATION);
      expect(source.split("this.app.executor(").length - 1, "exactly one this.app.executor( site").toBe(1);
      expect(source.match(/\bdurability\s*:/g) ?? [], "no durability: option key").toEqual([]);
      // Not a token ban: the file legitimately discloses crash durability (header and the receipt's limits).
      expect(source).toMatch(/crashDurability/);
      // Falsifiers: every registration shape that would carry a durability claim, or a second registration, moves the census.
      const [registration] = appCalls(parse(source), "executor");
      expect(registration, "the registration call was located").toBeDefined();
      const start = registration?.getStart() ?? 0;
      const end = registration?.getEnd() ?? 0;
      const site = source.slice(start, end);
      const args = (registration?.arguments ?? []).map((argument) => argument.getText());
      expect(args).toHaveLength(2);
      const mutants: ReadonlyArray<readonly [string, string]> = [
        ["inline declaration", `this.app.executor(${args.join(", ")}, { durability: { checkpoint: true } })`],
        ["shorthand declaration", `this.app.executor(${args.join(", ")}, { durability })`],
        ["computed key", `this.app.executor(${args.join(", ")}, { ["durability"]: { checkpoint: true } })`],
        ["options variable", `this.app.executor(${args.join(", ")}, registrationOptions)`],
        ["register alias", `this.app.register(${args.join(", ")}, { durability: { checkpoint: true } })`],
        ["spread arguments", `this.app.executor(...[${args.join(", ")}, { durability: { checkpoint: true } }])`],
        ["second registration", `${site};\n    this.app.executor("pi-shadow", ${args[1] ?? ""})`],
      ];
      for (const [name, replacement] of mutants) {
        const mutant = `${source.slice(0, start)}${replacement}${source.slice(end)}`;
        expect(mutant, name).not.toBe(source);
        expect(registrationCensus(mutant), name).not.toStrictEqual(PINNED_REGISTRATION);
      }
    });
  });

  it("flags a repeated Attempt identity whether it arrives on a new connection or on the kept one, never merging rows", async () => {
    const h = harness(SHIPPED_FURNACE_SDK, success, async (socketPath) => {
      const bridge = await Bridge.open(socketPath);
      await hello(bridge);
      execute(bridge, "pi-hosted", "ex-1", "frn-atm-s1", 1);
      await terminalOf(bridge, "ex-1");
      execute(bridge, "pi-hosted", "ex-2", "frn-atm-s2", 2);
      await terminalOf(bridge, "ex-2");
      // The kept-session repeat: the SAME Attempt identity under a NEW execution id. The SDK admits it (admission is
      // keyed on execution_id), so the repeated-Attempt rule must fire with no session rule beside it.
      execute(bridge, "pi-hosted", "ex-3", "frn-atm-s1", 1);
      await terminalOf(bridge, "ex-3");
      bridge.end();
      await driveAttempt(socketPath, "pi-hosted", "frn-atm-s1", 1);
    });
    await h.executor.start({ formula: "fixture" });
    const receipt = h.executor.receipt();
    expect(receipt.attempts).toHaveLength(4);
    expect(receipt.identityViolations).toEqual(["attempt frn-atm-s1 executed 2 times", "attempt frn-atm-s1 executed 3 times"]);
    expect(receipt.identityViolations.some((v) => /frn-atm-s1.* executed 2 times/.test(v))).toBe(true);
    const [first, , keptRepeat, freshRepeat] = receipt.attempts;
    expect(first?.admissionReceipt).toMatch(/\/1$/);
    expect(keptRepeat?.admissionReceipt).toMatch(/\/3$/);
    expect(freshRepeat?.admissionReceipt).toMatch(/\/1$/);
    expect(keptRepeat?.admissionReceipt).not.toBe(first?.admissionReceipt);
    expect(freshRepeat?.admissionReceipt).not.toBe(first?.admissionReceipt);
    await h.executor.close();
  });

  it("a same-execution-id resend on the kept session is refused by the SDK, never admitted twice", async () => {
    // Disclosure: same-execution dedup is the SDK's refusal, not an adapter rule — Pi advertises deduplicate_admission
    // false, so ResidentSession.repeated refuses the resend instead of acknowledging the first receipt.
    const refusals: Line[] = [];
    const h = harness(SHIPPED_FURNACE_SDK, success, async (socketPath) => {
      const bridge = await Bridge.open(socketPath);
      await hello(bridge);
      execute(bridge, "pi-hosted", "ex-dup", "frn-atm-dup", 1);
      await terminalOf(bridge, "ex-dup");
      execute(bridge, "pi-hosted", "ex-dup", "frn-atm-dup", 1);
      refusals.push(await bridge.until((line) => line.error !== undefined));
      bridge.end();
    });
    await h.executor.start({ formula: "fixture" });
    const refusal = refusals[0]?.error as { type: string; message: string };
    expect(refusal.type).toBe("ExecutorProtocolError");
    expect(refusal.message).toMatch(/declares no deduplicate_admission/);
    const receipt = h.executor.receipt();
    expect(receipt.attempts).toHaveLength(1);
    expect(receipt.attempts[0]?.admissionReceipt).toMatch(/\/1$/);
    expect(receipt.sessions).toEqual([{ sessionInstanceId: receipt.attempts[0]?.sessionInstanceId, admissionReceipts: [receipt.attempts[0]?.admissionReceipt] }]);
    expect(receipt.identityViolations).toEqual([]);
    await h.executor.close();
  });

  it("an Attempt outside a bridge session frame carries the unknown identity words and exactly one violation", async () => {
    const ShippedApp = SHIPPED_FURNACE_SDK.ExecutorApp;
    let registered: ExecutorCallback | undefined;
    /** A fixture SDK whose app hands back the adapter's registered callback so the case can run it with no bridge frame. */
    class CapturingApp extends ShippedApp {
      override executor(name: string, callback: ExecutorCallback, options?: ExecutorOptions): ExecutorCallback {
        registered = callback;
        return super.executor(name, callback, options);
      }
    }
    const sdk: FurnaceSdk = { ...SHIPPED_FURNACE_SDK, ExecutorApp: CapturingApp };
    const executor = new FurnaceHostedExecutor({ executor: "pi-hosted", workflow: success, sdk });
    if (registered === undefined) throw new Error("the adapter registered no executor callback");
    const naked = { ...SHIPPED_FURNACE_SDK.decodeContextValue(context("frn-atm-naked", 1)).context, cancellation: new AbortController().signal };
    const result = await registered(naked);
    expect(result.status).toBe("success");
    const receipt = executor.receipt();
    expect(receipt.attempts[0]).toMatchObject({ attemptId: "frn-atm-naked", sessionInstanceId: "unknown", executionId: "unknown", admissionReceipt: "unknown" });
    expect(receipt.identityViolations).toEqual(["attempt frn-atm-naked ran outside a bridge session frame"]);
    expect(receipt.sessions).toContainEqual({ sessionInstanceId: "unknown", admissionReceipts: ["unknown"] });
  });

  it("a framed admission with no admission receipt is a violation naming the session and the execution", async () => {
    const ShippedSession = SHIPPED_FURNACE_SDK.ResidentSession;
    /** A fixture session that admits but holds no receipt: receiptOf (public) answers undefined for every execution. */
    class ReceiptlessSession extends ShippedSession {
      override receiptOf(): string | undefined {
        return undefined;
      }
    }
    const sdk: FurnaceSdk = { ...SHIPPED_FURNACE_SDK, ResidentSession: ReceiptlessSession };
    const h = harness(sdk, success, async (socketPath) => {
      await driveAttempt(socketPath, "pi-hosted", "frn-atm-x", 1);
    });
    await h.executor.start({ formula: "fixture" });
    const receipt = h.executor.receipt();
    const attempt = receipt.attempts[0];
    expect(receipt.identityViolations).toEqual([`attempt frn-atm-x ran on session ${attempt?.sessionInstanceId} with no admission receipt for execution ex-frn-atm-x`]);
    expect(attempt).toMatchObject({ executionId: "ex-frn-atm-x", admissionReceipt: "unknown" });
    await h.executor.close();
  });

  it("a repeated admission receipt is a violation", async () => {
    const ShippedSession = SHIPPED_FURNACE_SDK.ResidentSession;
    /** A fixture session that answers one constant receipt, so a second admission collides with the first. */
    class ConstantReceiptSession extends ShippedSession {
      override receiptOf(): string | undefined {
        return "fixture-instance/0123456789abcdef/1";
      }
    }
    const sdk: FurnaceSdk = { ...SHIPPED_FURNACE_SDK, ResidentSession: ConstantReceiptSession };
    const h = harness(sdk, success, async (socketPath) => {
      await driveAttempt(socketPath, "pi-hosted", "frn-atm-c1", 1);
      await driveAttempt(socketPath, "pi-hosted", "frn-atm-c2", 2);
    });
    await h.executor.start({ formula: "fixture" });
    expect(h.executor.receipt().identityViolations.some((v) => /admission receipt .* recorded twice/.test(v))).toBe(true);
    await h.executor.close();
  });

  it("maps every workflow settlement onto the four-word result without reading failure_class", async () => {
    const outcomes: Array<[string, HostedWorkflow, string]> = [
      ["ok", async () => ({ status: "success", summary: "fine" }), "success"],
      ["fail", async () => ({ status: "failure", summary: "domain failed" }), "failure"],
      ["unsure", async () => ({ status: "indeterminate", summary: "cannot establish" }), "indeterminate"],
      ["thrown", async () => { throw new Error("boom"); }, "failure"],
      ["uncertain", async () => { throw new CapabilityError("uncertain-effect", "effect may have happened"); }, "indeterminate"],
      ["garbage", async () => ({ status: "done" }) as unknown as HostedOutcome, "indeterminate"],
      ["spurious-cancel", async () => ({ status: "cancelled", summary: "nobody asked" }), "indeterminate"],
    ];
    const got: string[] = [];
    for (const [name, workflow, expected] of outcomes) {
      const h = harness(SHIPPED_FURNACE_SDK, workflow, async (socketPath) => {
        got.push((await driveAttempt(socketPath, "pi-hosted", `frn-atm-${name}`, 1)).result.status);
      });
      await h.executor.start({ formula: "fixture" });
      expect(got.at(-1), name).toBe(expected);
      await h.executor.close();
    }
  });

  it("routes workflow text and thrown errors through the shared sanitizers", async () => {
    const workflow: HostedWorkflow = async () => {
      throw new Error("failed with Bearer SECRETTOKEN12345 \u001b[31mred\u001b[0m and a stack");
    };
    let terminal: Line | undefined;
    const h = harness(SHIPPED_FURNACE_SDK, workflow, async (socketPath) => {
      terminal = (await driveAttempt(socketPath, "pi-hosted", "frn-atm-sanitize", 1)).terminal;
    });
    await h.executor.start({ formula: "fixture" });
    const wire = JSON.stringify(terminal);
    const stored = JSON.stringify(h.executor.receipt());
    for (const text of [wire, stored]) {
      expect(text).not.toContain("SECRETTOKEN12345");
      expect(text).not.toContain("\\u001b");
    }
    expect(stored).toContain("[REDACTED]");
    await h.executor.close();
  });

  it("cancels cooperatively: the workflow stops, no effect follows the abort, and the terminal is cancelled", async () => {
    const effects: number[] = [];
    const workflow: HostedWorkflow = async ({ signal }) => {
      for (let step = 1; step <= 1000; step++) {
        if (signal.aborted) return { status: "cancelled", summary: `stopped before step ${step}` };
        effects.push(step);
        await sleep(5);
      }
      return { status: "success" };
    };
    let result: { status: string } | undefined;
    const h = harness(SHIPPED_FURNACE_SDK, workflow, async (socketPath) => {
      result = (await driveAttempt(socketPath, "pi-hosted", "frn-atm-cancel", 1, { afterMs: 40, reason: "operator_stop" })).result;
    });
    await h.executor.start({ formula: "fixture" });
    expect(result?.status).toBe("cancelled");
    const frozen = effects.length;
    expect(frozen).toBeGreaterThan(0);
    await sleep(80);
    expect(effects.length).toBe(frozen);
    const attempt = h.executor.receipt().attempts[0];
    expect(attempt).toMatchObject({ terminal: "cancelled", cancel: { requested: true, reason: "operator_stop" }, unsettledAfterCancel: false });
    await h.executor.close();
  });

  it("maps a workflow that throws its abort reason to cancelled, but the same throw without an abort to failure", async () => {
    const workflow: HostedWorkflow = ({ signal }) =>
      new Promise<HostedOutcome>((_, reject) => {
        signal.addEventListener("abort", () => reject(new Error("aborted by host")), { once: true });
      });
    let aborted: { status: string } | undefined;
    const h = harness(SHIPPED_FURNACE_SDK, workflow, async (socketPath) => {
      aborted = (await driveAttempt(socketPath, "pi-hosted", "frn-atm-throw-abort", 1, { afterMs: 10, reason: "operator_stop" })).result;
    });
    await h.executor.start({ formula: "fixture" });
    expect(aborted?.status).toBe("cancelled");
    await h.executor.close();
  });

  it("never claims cancelled for a workflow that ignores the abort: it reports indeterminate and records the late settlement", async () => {
    const workflow: HostedWorkflow = async () => {
      await sleep(250);
      return { status: "success", summary: "finished anyway" };
    };
    let result: { status: string } | undefined;
    const h = harness(
      SHIPPED_FURNACE_SDK,
      workflow,
      async (socketPath) => {
        result = (await driveAttempt(socketPath, "pi-hosted", "frn-atm-stubborn", 1, { afterMs: 10, reason: "attempt_timeout: 1s" })).result;
      },
      { cancelGraceMs: 30 },
    );
    await h.executor.start({ formula: "fixture" });
    expect(result?.status).toBe("indeterminate");
    expect(h.executor.receipt().attempts[0]).toMatchObject({ terminal: "indeterminate", unsettledAfterCancel: true, cancel: { requested: true } });
    await sleep(350);
    expect(h.executor.receipt().attempts[0]).toMatchObject({ lateSettlement: "success" });
    await h.executor.close();
  });

  it("states the resident session's own observe word (unknown for a never-admitted id) and the missing durability honestly", async () => {
    let observe: Line | undefined;
    const h = harness(SHIPPED_FURNACE_SDK, success, async (socketPath) => {
      const bridge = await Bridge.open(socketPath);
      await hello(bridge);
      bridge.send({ op: "observe", protocol_version: 1, request_id: "o", input: { execution_id: "ex-none" } });
      observe = await bridge.until((line) => line.op === "observe");
      bridge.end();
    });
    await h.executor.start({ formula: "fixture" });
    expect(observe?.output).toEqual({ status: "unknown" });
    // wb-lrz.1: Furnace re-attempts policy-admitted classes on its own (README.md §7 @15fd6f8ee: infrastructure_failure under
    // the default retry.* policy), so the receipt may not carry the universal negative it used to. The typed constant pins
    // the literal TYPE as well as the value: it does not compile against the retired literal type.
    const disclosed: HostedReceipt["limits"]["retry"] = "adapter-never-retries; furnace-auto-retries-by-recorded-retry-policy; work_failure-and-indeterminate-park";
    const limits = h.executor.receipt().limits;
    expect(limits.retry).not.toBe("furnace-parks-never-retries");
    expect(limits.retry).toBe(disclosed);
    expect(limits).toEqual({
      crashDurability: "none",
      observe: "session-word",
      identity: "per-attempt",
      replyBounds: "none",
      retry: "adapter-never-retries; furnace-auto-retries-by-recorded-retry-policy; work_failure-and-indeterminate-park",
    });
    await h.executor.close();
  });

  it("discloses that a hung workflow has no host-side reply bound and only cancellation or close ends it", async () => {
    const workflow: HostedWorkflow = ({ signal }) => new Promise<HostedOutcome>((resolve) => signal.addEventListener("abort", () => resolve({ status: "cancelled", summary: "closed" }), { once: true }));
    let bridge: Bridge | undefined;
    const h = harness(SHIPPED_FURNACE_SDK, workflow, async (socketPath) => {
      bridge = await Bridge.open(socketPath);
      await hello(bridge);
      execute(bridge, "pi-hosted", "ex-hung", "frn-atm-hung", 1);
      await bridge.until((line) => (line.event as { kind?: string } | undefined)?.kind === "started");
    });
    await h.executor.start({ formula: "fixture" });
    await sleep(120);
    expect(bridge?.lines.some((line) => (line.event as { kind?: string } | undefined)?.kind === "terminal")).toBe(false);
    expect(h.executor.receipt().attempts[0]).toMatchObject({ terminal: "pending" });
    const closing = h.executor.close();
    await bridge?.until((line) => (line.event as { kind?: string } | undefined)?.kind === "terminal");
    bridge?.end();
    await closing;
    expect(h.executor.receipt().attempts[0]).toMatchObject({ terminal: "cancelled", cancel: { requested: true, reason: "host_closed" } });
    expect(h.executor.receipt().identityViolations).toEqual([]);
  });

  it("bounds close() when a bridge connection never ends and records the unconfirmed release", async () => {
    let bridge: Bridge | undefined;
    const h = harness(
      SHIPPED_FURNACE_SDK,
      success,
      async (socketPath) => {
        bridge = await Bridge.open(socketPath);
        await hello(bridge);
      },
      { closeTimeoutMs: 40 },
    );
    await h.executor.start({ formula: "fixture" });
    await h.executor.close();
    expect(h.executor.receipt().state).toBe("closed");
    expect(h.executor.receipt().identityViolations.some((v) => /host close not confirmed within 40 ms/.test(v))).toBe(true);
    bridge?.end();
    await sleep(50);
    expect(readdirSync(scratch).filter((name) => name.startsWith("furnace-embedded-"))).toEqual([]);
  });

  it("treats a timed-out or unreadable start as uncertain, closes the host, and refuses a blind second start", async () => {
    let attempts = 0;
    const h = harness(SHIPPED_FURNACE_SDK, success, async () => {
      attempts += 1;
      throw Object.assign(new Error("run start exceeded 10 ms"), { kind: "request_timeout", timeoutMs: 10 });
    });
    await expect(h.executor.start({ formula: "fixture" })).rejects.toMatchObject({ category: "uncertain-effect" });
    expect(h.executor.receipt().state).toBe("start-uncertain");
    await expect(h.executor.start({ formula: "fixture" })).rejects.toMatchObject({ category: "uncertain-effect" });
    expect(attempts).toBe(1);
    expect(readdirSync(scratch).filter((name) => name.startsWith("furnace-embedded-"))).toEqual([]);
  });

  it("reports a Furnace command refusal as unavailable with a sanitized code and no stack", async () => {
    const h = harness(SHIPPED_FURNACE_SDK, success, async () => {
      throw Object.assign(new Error("refused Bearer SECRETTOKEN12345"), { kind: "command_error", code: "invalid_arguments" });
    });
    const failure = await h.executor.start({ formula: "fixture" }).catch((error: unknown) => error);
    expect(failure).toBeInstanceOf(CapabilityError);
    expect(failure).toMatchObject({ category: "unavailable" });
    expect(String((failure as Error).message)).not.toContain("SECRETTOKEN12345");
    expect(h.executor.receipt().state).toBe("failed");
  });

  it("owns the embedded host lifecycle: one Run per adapter, idempotent close, nothing left on disk", async () => {
    const h = harness(SHIPPED_FURNACE_SDK, success, async () => undefined);
    await h.executor.start({ formula: "fixture" });
    expect(readdirSync(scratch).filter((name) => name.startsWith("furnace-embedded-"))).toHaveLength(1);
    await expect(h.executor.start({ formula: "fixture" })).rejects.toMatchObject({ category: "validation" });
    await h.executor.close();
    await h.executor.close();
    expect(readdirSync(scratch).filter((name) => name.startsWith("furnace-embedded-"))).toEqual([]);
    expect(h.executor.receipt().state).toBe("closed");
    await expect(h.executor.start({ formula: "fixture" })).rejects.toMatchObject({ category: "validation" });
  });

  it("validates the request and executor name before opening anything", async () => {
    const h = harness(SHIPPED_FURNACE_SDK, success, async () => undefined);
    await expect(h.executor.start({ formula: "" })).rejects.toMatchObject({ category: "validation" });
    await expect(h.executor.start({ formula: "f", vars: { ok: 1 as unknown as string } })).rejects.toMatchObject({ category: "validation" });
    expect(() => new FurnaceHostedExecutor({ executor: "bad name", workflow: success, sdk: SHIPPED_FURNACE_SDK })).toThrow(CapabilityError);
    expect(readdirSync(scratch).filter((name) => name.startsWith("furnace-embedded-"))).toEqual([]);
  });

  it("refuses to start when the SDK cannot decode execution contexts, before any socket, client or Run exists", async () => {
    const broken: FurnaceSdk = {
      ...SHIPPED_FURNACE_SDK,
      decodeContextValue: () => {
        throw Object.assign(new Error("the shipped copy is not one artifact"), { name: "ContractUnavailableError" });
      },
    };
    let created = 0;
    const executor = new FurnaceHostedExecutor({ executor: "pi-hosted", workflow: success, sdk: broken, createClient: () => { created += 1; throw new Error("must not be built"); } });
    await expect(executor.start({ formula: "fixture" })).rejects.toMatchObject({ category: "unavailable", message: expect.stringContaining("cannot decode execution contexts") });
    expect(created).toBe(0);
    expect(executor.receipt().state).toBe("idle");
    expect(readdirSync(scratch).filter((name) => name.startsWith("furnace-embedded-"))).toEqual([]);
  });

  it("applies the same preflight to the SDK actually vendored in this repository", async () => {
    let created = 0;
    const executor = new FurnaceHostedExecutor({ executor: "pi-hosted", workflow: success, createClient: () => { created += 1; return { runs: { start: async () => ({ record: { run_id: "r", beads_run_id: "b" }, requestId: "q" }) } }; } });
    const outcome = await executor.start({ formula: "fixture" }).then(
      () => "started" as const,
      (error: unknown) => (error instanceof CapabilityError ? (`refused:${error.category}` as const) : ("other" as const)),
    );
    // The vendored SDK is one artifact since wb-zby, so the preflight admits it; a future digest drift reddens this row.
    expect(outcome).toBe("started");
    expect(created).toBe(1);
    await executor.close();
  });

  it("keeps the module's boundaries: no probes, no doctor, no persistent mode, no real Furnace in the default gate", () => {
    const source = readFileSync(new URL("../src/workbench/hosts/furnace-hosted.ts", import.meta.url), "utf8");
    expect(source).not.toMatch(/\.doctor\(/);
    expect(source).not.toMatch(/persistent\s*:/);
    expect(source).not.toMatch(/\bany\b\s*[;,)>\]]|:\s*any\b|as any/);
    expect(source).not.toMatch(/import\(/);
    expect(source).toContain("@furnace/sdk/dist/src/embedded.js");
    expect(existsSync(new URL("../src/workbench/hosts/furnace-hosted.ts", import.meta.url))).toBe(true);
  });

  it("discloses the verified retry semantics in its header: this adapter never retries, Furnace re-attempts only what the Run's recorded retry.* policy admits, work_failure and a resident host's indeterminate park (wb-lrz.1)", () => {
    const source = readFileSync(HOSTED_SOURCE_URL, "utf8");
    const header = moduleHeader(source);
    // The retired universal negative contradicted README.md §7 @15fd6f8ee (external_termination -> infrastructure_failure is re-attempted by default).
    expect(source).not.toContain("Furnace never retries an Attempt on its own");
    expect(header).toMatch(/\bwork_failure\b/);
    expect(header).toMatch(/\ba resident host's indeterminate\b/);
    expect(header).toMatch(/\bthe Run's recorded retry\.\* policy admits\b/);
    expect(header).toContain("README.md §5/§7 @15fd6f8ee");
    expect(header).toContain("This adapter never retries an Attempt.");
  });

  it("keeps the retry correction words-only and scoped: the no-scheduler sentence verbatim, Furnace's 'never' naming exactly work_failure and indeterminate, and no clause claiming Furnace retries either class (wb-lrz.2)", () => {
    const source = readFileSync(HOSTED_SOURCE_URL, "utf8");
    // The behaviour claim stays exactly as landed: the whole line, byte for byte.
    expect(source.split("\n")).toContain(" * admission receipt. This module adds no scheduler, no retry and no checkpoint.");
    // Every header clause that negates a retry is exactly one of three: the module's no-scheduler sentence, this adapter's
    // own posture, or Furnace's naming exactly the two parked classes (so no universal "Furnace never retries" survives).
    const negatedRetry = clausesOf(moduleHeader(source)).filter((clause) => /\b(?:never|not|no|nothing|neither|nor)\b/i.test(clause) && RETRY_WORD.test(clause));
    expect(negatedRetry).toHaveLength(3);
    const furnaceNever = negatedRetry.filter((clause) => /\bFurnace\b/.test(clause));
    expect(furnaceNever).toHaveLength(1);
    for (const clause of furnaceNever) {
      // What the negated retry GOVERNS, not merely the clause around it: exactly work_failure and indeterminate.
      const governed = [...clause.matchAll(NEGATED_RETRY)].map((match) => match[1] ?? "");
      expect(governed).toHaveLength(1);
      expect(governed[0]).toMatch(/\bwork_failure\b/);
      expect(governed[0]).toMatch(/\bindeterminate\b/);
      expect(governed[0]).not.toMatch(/\b(?:infrastructure_failure|timeout|executor_failure|protocol_failure|abandoned|cancelled)\b/);
    }
    for (const clause of negatedRetry.filter((candidate) => !/\bFurnace\b/.test(candidate))) expect(clause).toMatch(/\bthis (?:adapter|module)\b/i);
    // The opposite over-claim: nowhere in the module (header, comments, strings, the LIMITS literal) does a clause naming
    // work_failure or indeterminate keep a retry word once its negated retries are taken out.
    const overClaims = clausesOf(prose(source)).filter((clause) => /\b(?:work_failure|indeterminate)\b/.test(clause) && RETRY_WORD.test(clause.replace(NEGATED_RETRY, "")));
    expect(overClaims).toEqual([]);
  });

  it("states the kept-session identity model in its header: sequential Attempts share one kept bridge connection and each Attempt is identified by its own admission receipt (wb-zby.1)", () => {
    const header = moduleHeader(readFileSync(HOSTED_SOURCE_URL, "utf8"));
    expect(header).not.toMatch(/every Attempt is its own bridge connection/);
    expect(header).toMatch(/each Attempt is identified by its own admission receipt/);
  });

  it("roots every fixture under the short scratch base, never the inherited TMPDIR, so the bridge socket keeps the 103-byte bound (wb-70b R1)", async () => {
    expect(SCRATCH_BASE).toEqual(chooseScratchBase(process.env, SCRATCH_BASE_MAX_BYTES));
    expect(dirname(scratch)).toBe(SCRATCH_BASE.path);
    let socketPath = "";
    const h = harness(SHIPPED_FURNACE_SDK, success, async (path) => {
      socketPath = path;
    });
    await h.executor.start({ formula: "fixture" });
    expect(socketPath.startsWith(`${scratch}/furnace-embedded-`)).toBe(true);
    expect(Buffer.byteLength(socketPath)).toBeLessThanOrEqual(SOCKET_PATH_BOUND);
    await h.executor.close();
  });

  it("chooses the scratch base by the host rule: XDG_RUNTIME_DIR first, /tmp only as the recorded fallback, never first (wb-70b R1)", () => {
    const usable = () => true;
    const room = SCRATCH_BASE_MAX_BYTES;
    expect(room).toBe(SOCKET_PATH_BOUND - Buffer.byteLength("/pi-furnace-hosted-test-XXXXXX/furnace-embedded-XXXXXX/host.sock"));
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: "/run/user/1000" }, room, usable)).toEqual({ path: "/run/user/1000", source: "xdg-runtime-dir" });
    // Never /tmp first and never the inherited TMPDIR: a usable XDG_RUNTIME_DIR wins whatever TMPDIR says.
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: "/run/user/1000", TMPDIR: "/tmp" }, room, usable).source).toBe("xdg-runtime-dir");
    expect(chooseScratchBase({ TMPDIR: "/s" }, room, usable)).toEqual({ path: "/tmp", source: "tmp-fallback", reason: "XDG_RUNTIME_DIR is unset" });
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: "" }, room, usable)).toEqual({ path: "/tmp", source: "tmp-fallback", reason: "XDG_RUNTIME_DIR is unset" });
    for (const spelled of ["run/user/1000", "/run/user/1000/", "/run//user/1000"]) {
      expect(chooseScratchBase({ XDG_RUNTIME_DIR: spelled }, room, usable)).toEqual({ path: "/tmp", source: "tmp-fallback", reason: "XDG_RUNTIME_DIR is not a normalized absolute path" });
    }
    const atRoom = `/${"x".repeat(room - 1)}`;
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: atRoom }, room, usable)).toEqual({ path: atRoom, source: "xdg-runtime-dir" });
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: `${atRoom}x` }, room, usable)).toEqual({ path: "/tmp", source: "tmp-fallback", reason: `XDG_RUNTIME_DIR is longer than ${room} bytes` });
    expect(chooseScratchBase({ XDG_RUNTIME_DIR: "/run/user/1000" }, room, () => false)).toEqual({ path: "/tmp", source: "tmp-fallback", reason: "XDG_RUNTIME_DIR is not a directory" });
  });
});
