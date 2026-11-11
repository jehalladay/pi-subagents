/**
 * One `gp rpc --stdio` session (graphpolicy.rpc.v1): hello once, then many correlated `evaluate`
 * calls over the same worker, so an experiment pays Node start-up once instead of per decision.
 * The wire is the real protocol only — `{id, method, params}` per line, `gp.rpc.reply/v1` back;
 * nothing numerical happens here. The transport is injectable so tests drive the client without a
 * process; the default spawns the built entry with this Node.
 */
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";

export interface RpcTransport { readonly write: (line: string) => void; readonly lines: AsyncIterable<string>; readonly end: () => void }
export type RpcTransportFactory = () => RpcTransport;
export interface RpcReply { readonly id: string; readonly ok: boolean; readonly result?: Record<string, unknown>; readonly error?: Record<string, unknown> }
const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);

export function spawnGpRpc(entry: string): RpcTransportFactory {
  return () => {
    const child = spawn(process.execPath, [entry, "rpc", "--stdio"], { stdio: ["pipe", "pipe", "pipe"] });
    child.stderr.setEncoding("utf8"); child.stderr.on("data", () => undefined);
    const lines = createInterface({ input: child.stdout, crlfDelay: Number.POSITIVE_INFINITY });
    return { write: line => { child.stdin.write(line + "\n"); }, lines, end: () => { child.stdin.end(); } };
  };
}
export const HELLO_PARAMS = { protocol: "graphpolicy.rpc.v1", dataSchemaMajors: [1], functionSchemaMajors: [1], numericalProfiles: ["graphpolicy.numeric.binary32.v1"], maxMessageBytes: 1_048_576, backends: ["reference"], ops: ["compile", "evaluate", "validateGraph", "inspect"] } as const;

/** A correlated request/reply session; replies may arrive in any order and are matched by id. */
export class GpRpcSession {
  private readonly transport: RpcTransport;
  private readonly pending = new Map<string, { resolve: (reply: RpcReply) => void; reject: (error: Error) => void }>();
  private seq = 0;
  private closed = false;
  private readonly reader: Promise<void>;
  constructor(factory: RpcTransportFactory) {
    this.transport = factory();
    this.reader = this.pump();
  }
  private async pump(): Promise<void> {
    try {
      for await (const line of this.transport.lines) {
        if (!line.trim()) continue;
        let parsed: unknown;
        try { parsed = JSON.parse(line); } catch { continue; }
        if (!isRecord(parsed) || typeof parsed["id"] !== "string") continue;
        const waiter = this.pending.get(parsed["id"]);
        if (!waiter) continue;
        this.pending.delete(parsed["id"]);
        waiter.resolve({ id: parsed["id"], ok: parsed["ok"] === true, ...(isRecord(parsed["result"]) ? { result: parsed["result"] } : {}), ...(isRecord(parsed["error"]) ? { error: parsed["error"] } : {}) });
      }
    } finally {
      this.closed = true;
      for (const [id, waiter] of this.pending) { this.pending.delete(id); waiter.reject(new Error("GP_RPC_SESSION_CLOSED: no reply for " + id)); }
    }
  }
  call(method: string, params: Record<string, unknown>): Promise<RpcReply> {
    if (this.closed) return Promise.reject(new Error("GP_RPC_SESSION_CLOSED: session is closed"));
    const id = method + "-" + (++this.seq);
    return new Promise<RpcReply>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.transport.write(JSON.stringify({ id, method, params }));
    });
  }
  async hello(): Promise<RpcReply> {
    const reply = await this.call("hello", { ...HELLO_PARAMS, dataSchemaMajors: [...HELLO_PARAMS.dataSchemaMajors], functionSchemaMajors: [...HELLO_PARAMS.functionSchemaMajors], numericalProfiles: [...HELLO_PARAMS.numericalProfiles], backends: [...HELLO_PARAMS.backends], ops: [...HELLO_PARAMS.ops] });
    if (!reply.ok) throw new Error("GP_RPC_HELLO_REFUSED: " + JSON.stringify(reply.error ?? {}).slice(0, 300));
    return reply;
  }
  /** One evaluation: the program, the bare theta words map, a snapshot and the candidates document; returns the port rows as [id, score]. */
  async evaluate(params: { readonly program: unknown; readonly theta: Record<string, readonly number[]>; readonly graph: unknown; readonly candidates: unknown }, port: string): Promise<{ readonly rows: readonly { readonly id: string; readonly score: number }[]; readonly durationMs: number }> {
    const reply = await this.call("evaluate", params as Record<string, unknown>);
    if (!reply.ok || !reply.result || reply.result["valid"] !== true) throw new Error("GP_RPC_EVALUATE_REFUSED: " + JSON.stringify(reply.error ?? reply.result ?? {}).slice(0, 300));
    const y = isRecord(reply.result["Y"]) ? reply.result["Y"][port] : null;
    const rows = isRecord(y) && Array.isArray(y["rows"]) ? y["rows"] : null;
    if (!rows || !rows.every(row => Array.isArray(row) && typeof row[0] === "string" && Array.isArray(row[1]) && typeof row[1][0] === "number")) throw new Error("GP_RPC_EVALUATE_MALFORMED: no " + port + " rows");
    const receipt = isRecord(reply.result["receipt"]) ? reply.result["receipt"] : {};
    return { rows: (rows as [string, [number]][]).map(([id, [score]]) => ({ id, score })), durationMs: typeof receipt["duration_ms"] === "number" ? receipt["duration_ms"] : -1 };
  }
  async close(): Promise<void> {
    if (!this.closed) { try { await this.call("close", {}); } catch { /* the worker may close first */ } }
    this.transport.end();
    await this.reader;
  }
}
