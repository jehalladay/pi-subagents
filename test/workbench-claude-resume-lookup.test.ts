/**
 * W04 (wb-dc0): agent({resume}) consults the Claude Agent SDK's persisted session store before it issues a resumed
 * query, scoped to this host's own workspace, and refuses a stored record that is not the recorded session.
 *
 * docs/workbench/04 "Proposed session tracker" keeps a "reference to transcript persistence; not an in-memory-only
 * assumption for resume", and "Resume behavior" says: "on mismatch, expiration or unavailable session, fail explicitly.
 * Never launch a new empty session and label it resumed." The landed host reads the store through
 * getSessionInfo(previous.sessionId, { dir: config.cwd }) and refuses when the store has no record or a record of
 * another session (src/workbench/claude-host.ts resumeAgent). The SDK's own contract for that lookup
 * (GetSessionInfoOptions.dir): "When omitted, all project directories are searched for the session file", so the dir
 * is what keeps a resume inside the workspace the session ran in.
 *
 * Every fixture lookup elsewhere in the suite ignores its arguments or answers with whatever id it is asked for, so
 * before this file no case read the dir the lookup passes and no case handed the host a stored record of another session
 * (measured at cut time: the dir-dropping and the identity-unchecking mutants of resumeAgent each survived the 62 Claude-host
 * test files). The cases drive the real createClaudeWorkflowHost through its two documented fixture seams (query and getSession); the
 * SDK module is never mocked, nothing is spawned and nothing is written. The host's cwd is this repository's root, an
 * existing absolute directory the fixture query never writes to.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { SDKSessionInfo } from "@anthropic-ai/claude-agent-sdk";
import { describe, expect, it } from "vitest";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import type { WorkflowSpawnRequest } from "../src/workflow/runtime.js";
import { FakeClaudeSdk, sdkSuccess } from "./helpers/claude-sdk-stream.js";

const CWD = join(dirname(fileURLToPath(import.meta.url)), "..");
const RECORDED = "sdk-w04-recorded";
const OTHER = "sdk-w04-other";
const AGENT = "wf-agent-0";

const request = (): WorkflowSpawnRequest => ({ agentId: AGENT, index: 0, prompt: "first turn", label: "memory", agentType: "general-purpose" });

/** One lookup the host made: the session id it asked for, the options it passed, and how many queries had run by then. */
interface Lookup {
  readonly sessionId: string;
  readonly options: unknown;
  readonly queriesBefore: number;
}

/** A host over the fixture SDK whose store answers every lookup with `stored` (or nothing), recording each lookup. */
function hostWith(stored: (asked: string) => SDKSessionInfo | undefined) {
  const sdk = new FakeClaudeSdk({
    script: call => {
      call.push(...sdkSuccess(call.options.resume ?? RECORDED, `answer ${call.index}`));
      call.end();
    },
  });
  const lookups: Lookup[] = [];
  const host = createClaudeWorkflowHost({
    cwd: CWD,
    query: sdk.query,
    getSession: async (sessionId, options) => {
      lookups.push({ sessionId, options, queriesBefore: sdk.calls.length });
      return stored(sessionId);
    },
  });
  return { sdk, lookups, host };
}

const session = (sessionId: string): SDKSessionInfo => ({ sessionId, summary: "W04 resume-lookup fixture session", lastModified: 0 });

describe("W04 (wb-dc0) resume reads the SDK's persisted session store before any resumed query", () => {
  it("the lookup asks for the recorded session id in the host's workspace directory, once, before the resumed query, which resumes that session", async () => {
    const { sdk, lookups, host } = hostWith(() => session(RECORDED));
    const first = await host.spawnAgent(request());
    expect({ ok: first.ok, sessionId: first.sessionId, lookups: lookups.length, queries: sdk.calls.length }).toStrictEqual({ ok: true, sessionId: RECORDED, lookups: 0, queries: 1 });
    const resumed = await host.resumeAgent?.(AGENT, "second turn");
    expect({ ok: resumed?.ok, sessionId: resumed?.sessionId }).toStrictEqual({ ok: true, sessionId: RECORDED });
    expect(lookups).toStrictEqual([{ sessionId: RECORDED, options: { dir: CWD }, queriesBefore: 1 }]);
    expect(sdk.calls.map(call => call.options.resume)).toStrictEqual([undefined, RECORDED]);
  });

  it("a stored record of another session refuses the resume as unavailable and issues no second query", async () => {
    const { sdk, lookups, host } = hostWith(() => session(OTHER));
    expect((await host.spawnAgent(request())).ok).toBe(true);
    const resumed = await host.resumeAgent?.(AGENT, "second turn");
    expect({ ok: resumed?.ok, skipped: resumed?.skipped, error: resumed?.error }).toStrictEqual({
      ok: false,
      skipped: undefined,
      error: `Claude SDK session ${RECORDED} is unavailable; refusing fresh-context resume.`,
    });
    expect(lookups.map(lookup => lookup.sessionId)).toStrictEqual([RECORDED]);
    expect(sdk.calls).toHaveLength(1);
  });
});
