/**
 * W04 (wb-dc0): two cases of the Claude workflow host's resume path (src/workbench/claude-host.ts resumeAgent) over its
 * query and getSession fixture seams. R7 pins the one store lookup the host makes before a resumed query: its session id,
 * its dir and its order. R8 pins the refusal of each of eight store answers that are not a record of the recorded session.
 *
 * docs/workbench/04 "Proposed session tracker" keeps a "reference to transcript persistence; not an in-memory-only
 * assumption for resume", and "Resume behavior" says: "on mismatch, expiration or unavailable session, fail explicitly.
 * Never launch a new empty session and label it resumed." The SDK documents the lookup's dir option
 * (GetSessionInfoOptions.dir) as "When omitted, all project directories are searched for the session file".
 *
 * PINNED READER SET: the two cases below. Each drives the real createClaudeWorkflowHost through its query and getSession
 * options. The query is the fixture FakeClaudeSdk (test/helpers/claude-sdk-stream.ts), and getSession records every call
 * and answers from the case's table. Both cases were observed passed at cut time. The falsifiers named were each measured
 * red against their case at cut time, one src edit at a time with the file restored byte-identical after each (the
 * delivery note carries the counts):
 * - R7: the host's cwd HOST_CWD is this test file's own directory, and the case asserts that it is not the process cwd.
 *   The host makes exactly one lookup: of the recorded session id, with options { dir: HOST_CWD }, after the first query
 *   and before the second. Both queries carry options.cwd HOST_CWD. The second query resumes the recorded session, and
 *   the resume reports that session. Falsifiers: the lookup's dir dropped (M1), the process cwd as the dir (RL1), the
 *   parent of the host's cwd as the dir (K-DIR-PARENT), the lookup by the workflow agent id (M2), the queries run in the
 *   process cwd (K-QUERY-CWD), the lookup issued after the resumed query (K-ORDER), a second lookup (G4).
 * - R8: for each of the eight store answers in NOT_THE_RECORDED_SESSION, a fresh host refuses the resume with exactly
 *   "Claude SDK session <recorded id> is unavailable; refusing fresh-context resume.", not marked skipped, after one
 *   lookup of the recorded id and with no second query. The eight answers are no record, and a record whose session id
 *   is another id, the empty id, the recorded id extended, the recorded id cut short by one character, the recorded id
 *   upper-cased, or the recorded id with one leading or one trailing space. Falsifiers: the refusal reduced to a missing
 *   record (M3), the refusal only on a truthy mismatched id (RL7), a missing record let through (RL6), and the id
 *   compared by either prefix (K-PREFIX-STORED, K-PREFIX-RECORDED), by containment (K-CONTAINS), case-insensitively
 *   (K-CASE), trimmed (K-TRIM) or by length (K-LENGTH), and the refusal naming the stored record's id (RL2), carrying
 *   skipped: false (RL5) or a generic text (G7).
 *
 * NOT CLAIMED by this file: the real SDK store (getSessionInfo itself, its search, and how it derives a record's session
 * id); store answers outside NOT_THE_RECORDED_SESSION; a lookup that throws, never settles or is aborted; and every tier
 * but the default test tier.
 */
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { SDKSessionInfo } from "@anthropic-ai/claude-agent-sdk";
import { describe, expect, it } from "vitest";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import type { WorkflowSpawnRequest } from "../src/workflow/runtime.js";
import { FakeClaudeSdk, sdkSuccess } from "./helpers/claude-sdk-stream.js";

/** The host's cwd: this test file's own directory, an existing absolute directory that is not the process cwd (R7 asserts it). */
const HOST_CWD = dirname(fileURLToPath(import.meta.url));
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
    cwd: HOST_CWD,
    query: sdk.query,
    getSession: async (sessionId, options) => {
      lookups.push({ sessionId, options, queriesBefore: sdk.calls.length });
      return stored(sessionId);
    },
  });
  return { sdk, lookups, host };
}

const session = (sessionId: string): SDKSessionInfo => ({ sessionId, summary: "W04 resume-lookup fixture session", lastModified: 0 });

/** R8's store answers: none of them is a record whose session id is exactly RECORDED. */
const NOT_THE_RECORDED_SESSION: readonly (readonly [string, SDKSessionInfo | undefined])[] = [
  ["no record", undefined],
  ["another id", session(OTHER)],
  ["the empty id", session("")],
  ["the recorded id extended", session(`${RECORDED}-2`)],
  ["the recorded id cut short by one character", session(RECORDED.slice(0, -1))],
  ["the recorded id upper-cased", session(RECORDED.toUpperCase())],
  ["the recorded id with one leading space", session(` ${RECORDED}`)],
  ["the recorded id with one trailing space", session(`${RECORDED} `)],
];

describe("W04 (wb-dc0) resume reads the SDK's persisted session store before any resumed query", () => {
  it("the lookup asks for the recorded session id in the host's workspace directory, once, before the resumed query, which resumes that session", async () => {
    expect(HOST_CWD).not.toBe(process.cwd());
    const { sdk, lookups, host } = hostWith(() => session(RECORDED));
    const first = await host.spawnAgent(request());
    expect({ ok: first.ok, sessionId: first.sessionId, lookups: lookups.length, queries: sdk.calls.length }).toStrictEqual({ ok: true, sessionId: RECORDED, lookups: 0, queries: 1 });
    const resumed = await host.resumeAgent?.(AGENT, "second turn");
    expect({ ok: resumed?.ok, sessionId: resumed?.sessionId }).toStrictEqual({ ok: true, sessionId: RECORDED });
    expect(lookups).toStrictEqual([{ sessionId: RECORDED, options: { dir: HOST_CWD }, queriesBefore: 1 }]);
    expect(sdk.calls.map(call => ({ cwd: call.options.cwd, resume: call.options.resume }))).toStrictEqual([
      { cwd: HOST_CWD, resume: undefined },
      { cwd: HOST_CWD, resume: RECORDED },
    ]);
  });

  it("every store answer that is not a record of the recorded session (no record, another id, the empty id, the recorded id extended, cut short, upper-cased or space-padded) refuses the resume as unavailable and issues no second query", async () => {
    const outcomes: unknown[] = [];
    for (const [answer, stored] of NOT_THE_RECORDED_SESSION) {
      const { sdk, lookups, host } = hostWith(() => stored);
      const first = await host.spawnAgent(request());
      const resumed = await host.resumeAgent?.(AGENT, "second turn");
      outcomes.push({ answer, first: first.ok, ok: resumed?.ok, skipped: resumed?.skipped, error: resumed?.error, lookups: lookups.map(lookup => lookup.sessionId), queries: sdk.calls.length });
    }
    expect(outcomes).toStrictEqual(
      NOT_THE_RECORDED_SESSION.map(([answer]) => ({
        answer,
        first: true,
        ok: false,
        skipped: undefined,
        error: `Claude SDK session ${RECORDED} is unavailable; refusing fresh-context resume.`,
        lookups: [RECORDED],
        queries: 1,
      })),
    );
  });
});
