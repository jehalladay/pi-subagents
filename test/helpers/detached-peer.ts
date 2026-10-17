/**
 * detached-peer.ts: drives the workflow_detached launch/inspect catch in src/index.ts with arbitrary refusal text, for
 * the DIRECT-CALLER SITES row of test/workbench-sanitizer-corpus.test.ts (bound onto wb-70b at the wb-71q landing).
 *
 * The real extension boots once and its workflow_detached inspect action runs the real client: it reads the private
 * receipt and connects to the socket the receipt records. A same-uid peer stands in for the detached host on that
 * socket and answers each inspect with an authorization refusal carrying the probe text. The client rethrows a
 * refusal (a denial is never evidence of a dead host), so the tool's catch hands it to the one helper, exactly as it
 * does the typed relaunch refusal on launch. Nothing is mocked: the frames are the host's own codec and every privacy
 * check the client makes passes against real files.
 */
import { chmodSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer, type Server } from "node:net";
import { join } from "node:path";
import { afterAll } from "vitest";
import subagentsExtension from "../../src/index.js";
import { DETACHED_CONTRACT, DetachedFrameDecoder, type DetachedReceipt, detachedFrame, localOperator } from "../../src/workbench/hosts/local-detached.js";
import { ctx, makePi } from "./boot-extension.js";
import { chooseScratchBase, scratchBaseBudget } from "./fixture-roots.js";

const INVOCATION = "corpus-catch";
const SETTINGS = { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["workbench:detach", "workbench:observe"] } };

interface Peer {
  readonly root: string;
  readonly agentDir: string;
  readonly server: Server;
  readonly inspect: () => Promise<string>;
  diagnostic: string;
}

function privateDir(path: string): string {
  mkdirSync(path, { mode: 0o700 });
  chmodSync(path, 0o700);
  return path;
}

/** Run `work` with PI_CODING_AGENT_DIR (the tool's detached root lives under it) pointing at the peer's agent dir. */
async function withAgentDir<T>(agentDir: string, work: () => Promise<T>): Promise<T> {
  const previous = process.env.PI_CODING_AGENT_DIR;
  process.env.PI_CODING_AGENT_DIR = agentDir;
  try {
    return await work();
  } finally {
    if (previous === undefined) delete process.env.PI_CODING_AGENT_DIR;
    else process.env.PI_CODING_AGENT_DIR = previous;
  }
}

async function start(): Promise<Peer> {
  const uid = localOperator().uid;
  const name = `${"0".repeat(16)}.sock`;
  const base = chooseScratchBase(process.env, scratchBaseBudget(`/wb-dpeer-XXXXXX/pw-${uid}/${name}`));
  const root = mkdtempSync(join(base.path, "wb-dpeer-"));
  chmodSync(root, 0o700);
  const agentDir = privateDir(join(root, "agent"));
  const workspace = privateDir(join(root, "ws"));
  privateDir(join(workspace, ".pi"));
  writeFileSync(join(workspace, ".pi", "subagents.json"), JSON.stringify(SETTINGS));
  const invocationDirectory = privateDir(join(privateDir(join(agentDir, "workbench-detached")), INVOCATION));
  const socketPath = join(privateDir(join(root, `pw-${uid}`)), name);
  const receipt: DetachedReceipt = {
    contract: DETACHED_CONTRACT, invocationId: INVOCATION, hostInstanceId: "a1".repeat(24), pid: process.pid, sessionId: process.pid, processStartTicks: "0",
    owner: localOperator(), invocationDirectory, socketPath, socketBase: root, launchedAt: new Date(0).toISOString(), deploymentDigest: "peer", inputDigest: "peer",
    scriptDigest: "peer", snapshotDigest: "peer", permissions: ["inspect"], security: "same-machine-os-dac-only", lifetime: "survives-client-disconnect-not-host-crash",
    nativeRuntimeIdentity: "unsupported", evidenceClass: "local-computation",
  };
  writeFileSync(join(invocationDirectory, "receipt.json"), JSON.stringify(receipt), { mode: 0o600, flag: "wx" });
  const peer = { root, agentDir, diagnostic: "" } as Peer;
  const server = createServer(socket => {
    const decoder = new DetachedFrameDecoder();
    socket.on("error", () => socket.destroy());
    socket.on("data", chunk => {
      if (decoder.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk).length > 0) socket.end(detachedFrame({ ok: false, category: "authorization", diagnostic: peer.diagnostic }));
    });
  });
  await new Promise<void>((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(socketPath, () => resolveListen());
  });
  chmodSync(socketPath, 0o600);
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: workspace });
  await withAgentDir(agentDir, async () => pi.lifecycle.get("session_start")?.({}, context));
  const tool = pi.tools.get("workflow_detached");
  const inspect = async (): Promise<string> =>
    withAgentDir(agentDir, async () => (await tool.execute("inspect", { action: "inspect", invocationId: INVOCATION }, undefined, undefined, context)).content[0].text as string);
  return Object.assign(peer, { server, inspect });
}

/**
 * The corpus driver: each call puts `raw` in the peer's refusal and returns the reply the model receives. Calls run one
 * at a time. `register` (vitest's afterAll by default) closes the peer and removes its files after the suite.
 */
export function detachedCatchDriver(register: (hook: () => void) => void = afterAll): (raw: string) => Promise<string[]> {
  let peer: Promise<Peer> | undefined;
  let queue: Promise<unknown> = Promise.resolve();
  register(() => {
    void peer?.then(({ server, root }) => {
      server.close();
      rmSync(root, { recursive: true, force: true });
    });
  });
  return raw => {
    const reply = queue.then(async () => {
      peer ??= start();
      const live = await peer;
      live.diagnostic = raw;
      return [await live.inspect()];
    });
    queue = reply.catch(() => undefined);
    return reply;
  };
}
