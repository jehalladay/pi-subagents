/**
 * W04 (wb-dc0): two cases of the Claude workflow host's resume path (src/workbench/claude-host.ts resumeAgent) over its
 * query and getSession fixture seams. Every host here runs agent wf-agent-0, whose first query records the session
 * sdk-w04-recorded. R7 pins, on each of the two hosts in HOSTS (cwd test/, this file's own directory, and cwd /, the root
 * directory), the one store lookup the resume makes before its second query: its session id, its dir and its order. R8
 * pins, on a fresh host at test/, the refusal of each of the 17 store answers in NOT_THE_RECORDED_SESSION.
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
 * - R7: HOSTS holds exactly two cwds, test/ (this file's own directory) and / (the root directory), and the case asserts
 *   that neither is the process cwd. On a host at each, the resume of wf-agent-0 makes exactly one lookup: of
 *   sdk-w04-recorded, with options { dir: <that cwd> }, after the first query and before the second. Both queries carry
 *   options.cwd <that cwd>. The second query resumes sdk-w04-recorded, and the resume reports that session. Falsifiers:
 *   the lookup's dir dropped (M1), the process cwd as the dir (RL1), the parent of the host's cwd as the dir
 *   (K-DIR-PARENT), the host's cwd with a slash appended as the dir (GM-DIR-TRAIL), / as the dir (G6), the host's cwd as
 *   the dir only when it lies under the process cwd and the process cwd otherwise (GM-DIR-UNDER-CWD), <process cwd>/test
 *   as the dir (GM-DIR-FIXTURE), the lookup by the workflow agent id (M2), the queries run in the process cwd
 *   (K-QUERY-CWD), the lookup issued after the resumed query (K-ORDER), a second lookup (G4).
 * - R8: for each of the 17 store answers in NOT_THE_RECORDED_SESSION, a fresh host at test/ refuses the resume with
 *   exactly "Claude SDK session sdk-w04-recorded is unavailable; refusing fresh-context resume.", not marked skipped,
 *   after one lookup of sdk-w04-recorded and with no second query. The case also asserts that the table holds 17
 *   distinct answers, none of them a record of sdk-w04-recorded itself. The 17 answers are no record, and a record whose
 *   session id is sdk-w04-other, the empty id, or sdk-w04-recorded with "-2" appended, with "x" appended, with "x" in
 *   front, cut short by one, two or three characters, upper-cased, capitalized, with every character in its fullwidth
 *   form, with one leading space, one trailing space, one space on each side, two leading spaces or one leading tab.
 *   Falsifiers: the refusal reduced to a missing record (M3), the refusal only on a truthy mismatched id (RL7), a missing
 *   record let through (RL6), and the id compared by either prefix (K-PREFIX-STORED, K-PREFIX-RECORDED), by containment
 *   (K-CONTAINS), case-insensitively (K-CASE), trimmed (K-TRIM), by length (K-LENGTH) or after NFKC normalization
 *   (GM-NFKC); a capitalized id let through (GM-UPPER-PART); an id with one character appended let through (GM-EXT1), or
 *   one character other than a space (GM-EXT1b); an id with one character other than a space in front let through
 *   (GM-EXT-FRONT); an id led by one tab let through (GM-TAB); an id cut short by two or more characters let through
 *   (GM-CUT2); an id with one space on each side or with two leading spaces let through (GM-PAD-BOTH, GM-PAD-TWO); and
 *   the refusal naming the stored record's id (RL2), carrying skipped: false (RL5) or skipped: true (G5), or a generic
 *   text (G7).
 *
 * NOT CLAIMED by this file: the real SDK store (getSessionInfo itself, its search, and how it derives a record's session
 * id); every store answer outside NOT_THE_RECORDED_SESSION (two trailing spaces or a trailing tab, for example); hosts
 * at any cwd outside HOSTS, agents other than wf-agent-0 and recorded sessions other than sdk-w04-recorded; a second
 * resume of the same agent; a lookup that throws, never settles or is aborted; and every tier but the default test tier.
 */
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { SDKSessionInfo } from "@anthropic-ai/claude-agent-sdk";
import { describe, expect, it } from "vitest";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import type { WorkflowSpawnRequest } from "../src/workflow/runtime.js";
import { FakeClaudeSdk, sdkSuccess } from "./helpers/claude-sdk-stream.js";

/** This test file's own directory, test/: an existing absolute directory that is not the process cwd (R7 asserts it). */
const HOST_CWD = dirname(fileURLToPath(import.meta.url));
/** R7's two host cwds: test/ and the root directory /, neither of them the process cwd (R7 asserts both facts). */
const HOSTS: readonly string[] = [HOST_CWD, "/"];
const RECORDED = "sdk-w04-recorded";
const OTHER = "sdk-w04-other";
const AGENT = "wf-agent-0";
const TAB = String.fromCodePoint(9);
/** The distance from an ASCII printable (U+0021..U+007E) to its fullwidth form (U+FF01..U+FF5E). */
const FULLWIDTH_OFFSET = 0xfee0;
/** An id of ASCII printables with every character replaced by its fullwidth form. */
const fullwidth = (id: string): string => [...id].map(char => String.fromCodePoint((char.codePointAt(0) ?? 0) + FULLWIDTH_OFFSET)).join("");

const request = (): WorkflowSpawnRequest => ({ agentId: AGENT, index: 0, prompt: "first turn", label: "memory", agentType: "general-purpose" });

/** One lookup the host made: the session id it asked for, the options it passed, and how many queries had run by then. */
interface Lookup {
  readonly sessionId: string;
  readonly options: unknown;
  readonly queriesBefore: number;
}

/** A host at `cwd` over the fixture SDK whose store answers every lookup with `stored` (or nothing), recording each lookup. */
function hostWith(stored: (asked: string) => SDKSessionInfo | undefined, cwd: string = HOST_CWD) {
  const sdk = new FakeClaudeSdk({
    script: call => {
      call.push(...sdkSuccess(call.options.resume ?? RECORDED, `answer ${call.index}`));
      call.end();
    },
  });
  const lookups: Lookup[] = [];
  const host = createClaudeWorkflowHost({
    cwd,
    query: sdk.query,
    getSession: async (sessionId, options) => {
      lookups.push({ sessionId, options, queriesBefore: sdk.calls.length });
      return stored(sessionId);
    },
  });
  return { sdk, lookups, host };
}

const session = (sessionId: string): SDKSessionInfo => ({ sessionId, summary: "W04 resume-lookup fixture session", lastModified: 0 });

/** R8's 17 store answers: no record, then records whose session id is never exactly RECORDED (R8 asserts it). */
const NOT_THE_RECORDED_SESSION: readonly (readonly [string, SDKSessionInfo | undefined])[] = [
  ["no record", undefined],
  ["a record of sdk-w04-other", session(OTHER)],
  ["a record of the empty id", session("")],
  ["the recorded id with -2 appended", session(`${RECORDED}-2`)],
  ["the recorded id with x appended", session(`${RECORDED}x`)],
  ["the recorded id with x in front", session(`x${RECORDED}`)],
  ["the recorded id cut short by one character", session(RECORDED.slice(0, -1))],
  ["the recorded id cut short by two characters", session(RECORDED.slice(0, -2))],
  ["the recorded id cut short by three characters", session(RECORDED.slice(0, -3))],
  ["the recorded id upper-cased", session(RECORDED.toUpperCase())],
  ["the recorded id capitalized", session(`${RECORDED.charAt(0).toUpperCase()}${RECORDED.slice(1)}`)],
  ["the recorded id with every character in its fullwidth form", session(fullwidth(RECORDED))],
  ["the recorded id with one leading space", session(` ${RECORDED}`)],
  ["the recorded id with one trailing space", session(`${RECORDED} `)],
  ["the recorded id with one space on each side", session(` ${RECORDED} `)],
  ["the recorded id with two leading spaces", session(`  ${RECORDED}`)],
  ["the recorded id with one leading tab", session(`${TAB}${RECORDED}`)],
];

describe("W04 (wb-dc0) resume lookup cases R7 and R8 over this file's fixture hosts", () => {
  it("on each of the two hosts in HOSTS (cwd test/, this file's own directory, and cwd /, the root directory; neither is the process cwd), the resume of agent wf-agent-0 makes one lookup, of its recorded session sdk-w04-recorded with options { dir: that cwd }, after the first query and before the second; both queries run in that cwd and the second resumes sdk-w04-recorded", async () => {
    expect(HOSTS).toStrictEqual([HOST_CWD, "/"]);
    const outcomes: unknown[] = [];
    for (const cwd of HOSTS) {
      const { sdk, lookups, host } = hostWith(() => session(RECORDED), cwd);
      const first = await host.spawnAgent(request());
      const afterFirst = { ok: first.ok, sessionId: first.sessionId, lookups: lookups.length, queries: sdk.calls.length };
      const resumed = await host.resumeAgent?.(AGENT, "second turn");
      outcomes.push({
        cwd,
        processCwd: cwd === process.cwd(),
        afterFirst,
        resumed: { ok: resumed?.ok, sessionId: resumed?.sessionId },
        lookups,
        calls: sdk.calls.map(call => ({ cwd: call.options.cwd, resume: call.options.resume })),
      });
    }
    expect(outcomes).toStrictEqual(
      [HOST_CWD, "/"].map(cwd => ({
        cwd,
        processCwd: false,
        afterFirst: { ok: true, sessionId: RECORDED, lookups: 0, queries: 1 },
        resumed: { ok: true, sessionId: RECORDED },
        lookups: [{ sessionId: RECORDED, options: { dir: cwd }, queriesBefore: 1 }],
        calls: [
          { cwd, resume: undefined },
          { cwd, resume: RECORDED },
        ],
      })),
    );
  });

  it("on a fresh host at test/, each of the 17 store answers in NOT_THE_RECORDED_SESSION (no record, or a record of sdk-w04-other, of the empty id, or of sdk-w04-recorded with -2 or x appended, with x in front, cut short by one, two or three characters, upper-cased, capitalized, with every character in its fullwidth form, with one leading space, one trailing space, one space on each side, two leading spaces or one leading tab) refuses the resume of sdk-w04-recorded as unavailable after one lookup of that id and issues no second query", async () => {
    expect({
      answers: NOT_THE_RECORDED_SESSION.length,
      distinct: new Set(NOT_THE_RECORDED_SESSION.map(([, stored]) => (stored === undefined ? null : stored.sessionId))).size,
      recorded: NOT_THE_RECORDED_SESSION.filter(([, stored]) => stored?.sessionId === RECORDED).map(([answer]) => answer),
    }).toStrictEqual({ answers: 17, distinct: 17, recorded: [] });
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
