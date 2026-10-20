/**
 * wb-72c respin U2 (R2, BLOCKING under R590-owner): the F1 identity-ref closure of src/index.ts runWorkflowTask, the evidence
 * reference a Claude stream observation lists for the session's last message. An evidence reference is an identity, not display
 * text: docs/workbench/20 lists claude-message:<uuid> only when exact, so the id goes through the one helper as an identity check
 * (the gate's R2 default (a), the forge-evidence.ts operationIdOf shape): it is listed verbatim when
 * sanitizeWorkbenchText(id, 120, "label") leaves it unchanged, and withheld otherwise. Before the respin the closure repaired
 * the id instead (stripUnsafeText(id, " ").slice(0, 120)), so it listed a ref the session never reported: an unsafe unit became a
 * space, a credential-shaped id was listed as it came, and an over-long one was cut to a different id.
 *
 * The closure is exported from src/index.ts as claudeMessageEvidenceRef, so it is pinned red-first here. Its one call site, the
 * observer callback in runWorkflowTask, runs only under a live Claude SDK query, so the call site is a NAMED RESIDUAL (the zo9 R2
 * precedent: the shared closure is pinned, the live-tier-only call site is named), and so is the live tier's own mirror of the
 * old closure (test/workbench-claude-control-live.test.ts :311), which this cut leaves untouched.
 *
 * Every credential-shaped id below is an obviously fake placeholder; the rows pin input hygiene only. Failures name the row,
 * never the id (names only).
 */
import { describe, expect, it } from "vitest";
import { claudeMessageEvidenceRef } from "../src/index.js";

const cp = (code: number): string => String.fromCodePoint(code);
const NUL = cp(0x00);
const BEL = cp(0x07);
const LF = cp(0x0a);
const ESC = cp(0x1b);
const ZWSP = cp(0x200b);
const RLO = cp(0x202e);
const BOM = cp(0xfeff);

interface Row {
  readonly id: string;
  readonly value: string;
}

/** Ids the helper leaves unchanged: each is listed verbatim, as the session reported it. */
const LISTED: readonly Row[] = [
  { id: "L1 an RFC 4122 uuid, the SDK's message uuid", value: "0f8e7d6c-5b4a-4938-a7b6-c5d4e3f2a1b0" },
  { id: "L2 a short fixture id", value: "m-9" },
  { id: "L3 exactly 120 units", value: "m".repeat(120) },
];

/** Ids the helper would change in some way: each is withheld whole, never repaired into a different ref. */
const WITHHELD: readonly Row[] = [
  { id: "W1 ZWSP inside the id", value: `m${ZWSP}9` },
  { id: "W2 BEL inside the id", value: `m${BEL}9` },
  { id: "W3 SGR inside the id", value: `m-${ESC}[31m9` },
  { id: "W4 RLO inside the id", value: `m${RLO}9` },
  { id: "W5 LF inside the id", value: `m${LF}9` },
  { id: "W6 NUL inside the id", value: `m${NUL}9` },
  { id: "W7 BOM before the id", value: `${BOM}m-9` },
  { id: "W8 lone surrogate inside the id", value: `m-${cp(0xd800)}9` },
  { id: "W9 8-bit CSI inside the id", value: `m-${cp(0x9b)}31m9` },
  { id: "W10 a Bearer-shaped id", value: "Bearer FAKETOKENZERO" },
  { id: "W11 a key-prefixed id", value: "sk-ant-FAKEFAKEFAKE0000" },
  { id: "W12 an assignment-shaped id", value: "password=FAKEVALUE" },
  { id: "W13 a run of spaces inside the id (the label layout collapses it)", value: "m  9" },
  { id: "W14 a leading space (the label layout trims it)", value: " m-9" },
  { id: "W15 121 units, one past the 120 bound", value: "m".repeat(121) },
];

/** U8-style each-liveness for this file's tables: the rows at this cut, as literals. */
const FROZEN_LISTED: readonly string[] = ["L1 an RFC 4122 uuid, the SDK's message uuid", "L2 a short fixture id", "L3 exactly 120 units"];
const FROZEN_WITHHELD: readonly string[] = [
  "W1 ZWSP inside the id",
  "W2 BEL inside the id",
  "W3 SGR inside the id",
  "W4 RLO inside the id",
  "W5 LF inside the id",
  "W6 NUL inside the id",
  "W7 BOM before the id",
  "W8 lone surrogate inside the id",
  "W9 8-bit CSI inside the id",
  "W10 a Bearer-shaped id",
  "W11 a key-prefixed id",
  "W12 an assignment-shaped id",
  "W13 a run of spaces inside the id (the label layout collapses it)",
  "W14 a leading space (the label layout trims it)",
  "W15 121 units, one past the 120 bound",
];
const REGISTERED: string[] = [];

describe("wb-72c the F1 identity-ref closure: claude-message:<id> exact or withheld, through the one helper", () => {
  for (const row of LISTED) {
    REGISTERED.push(row.id);
    it(`${row.id}: listed verbatim`, () => {
      // Names only: a boolean, so a failure never prints the id.
      expect(claudeMessageEvidenceRef(row.value) === `claude-message:${row.value}`, `${row.id}: not listed verbatim`).toBe(true);
    });
  }

  for (const row of WITHHELD) {
    REGISTERED.push(row.id);
    it(`${row.id}: withheld, never repaired`, () => {
      expect(claudeMessageEvidenceRef(row.value) === undefined, `${row.id}: a ref was listed for an id the helper changes`).toBe(true);
    });
  }

  it("an absent or empty id lists nothing", () => {
    expect(claudeMessageEvidenceRef(undefined)).toBeUndefined();
    expect(claudeMessageEvidenceRef("")).toBeUndefined();
  });

  it("each-liveness: both tables are exactly the frozen ids, and every row registered", () => {
    expect(LISTED.map(row => row.id)).toEqual(FROZEN_LISTED);
    expect(WITHHELD.map(row => row.id)).toEqual(FROZEN_WITHHELD);
    expect(REGISTERED).toEqual([...FROZEN_LISTED, ...FROZEN_WITHHELD]);
  });
});
