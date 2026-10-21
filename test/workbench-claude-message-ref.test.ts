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
 * precedent: the shared closure is pinned, the live-tier-only call site is named). The live tier's own mirror of that callback
 * (test/workbench-claude-control-live.test.ts observerFor) still repaired the id after wb-72c (the 72c gate's F4); since wb-p2ef it
 * derives the ref through this closure on production's own line, and the F4 rows at the end of this file read both files as
 * text, so the case list here binds the mirror too. wb-p2ef F3: each row's value (the message id it tests) is frozen beside its
 * row name, as a digest (the 72c gate's H2 swapped W1's ZWSP id for W2's BEL id and stayed green).
 *
 * Every credential-shaped id below is an obviously fake placeholder; the rows pin input hygiene only. Failures name the row,
 * never the id (names only).
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
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
/**
 * wb-p2ef F3: the message id each frozen row tests (its value), LISTED then WITHHELD, in table order. The frozen row names pin
 * what a row is called, not the value it tests, so a value swapped for another with the same verdict kept every row green (the
 * 72c gate's H2: W1's ZWSP id swapped for W2's BEL id). Each digest is the first 16 hex digits of the sha256 of the row's JSON
 * text [value]: it repeats no credential-shaped text, and a mismatch is reported by row name alone (names only).
 */
const FROZEN_VALUE_DIGESTS: readonly string[] = [
  "4ff037335d7fb365",
  "6f9bd4e13a2dfd76",
  "3af01d066d98aedf",
  "b792e79b819d6821",
  "b8a753b5cde40b17",
  "f2543e520be765c7",
  "5c21f3ae263abbbd",
  "ea8ec15a69c7a915",
  "087ceeea0808a2a5",
  "946fac0ee80858c0",
  "79f30419c6c3a2e8",
  "d4b2cbed5d00c5d4",
  "bbad53fc385a1096",
  "5415b9838788e772",
  "ad0e6845fe362a95",
  "604fd8c229520934",
  "0d58d5d4b621a341",
  "ec832114c42d2571",
];
/** A row's value digest: its value as JSON text, sha256, the first 16 hex digits. */
const valueDigest = (row: Row): string => createHash("sha256").update(JSON.stringify([row.value])).digest("hex").slice(0, 16);
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

  it("wb-p2ef F3 content pin: every frozen row tests exactly its frozen message id, so a swap that keeps the row name and the verdict is red (names only)", () => {
    expect(FROZEN_VALUE_DIGESTS).toHaveLength(FROZEN_LISTED.length + FROZEN_WITHHELD.length);
    expect([...LISTED, ...WITHHELD].filter((row, index) => valueDigest(row) !== FROZEN_VALUE_DIGESTS[index]).map(row => row.id)).toEqual([]);
  });
});

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** A repository file as text: the live tier is read here, never run (it runs only from its own forge command). */
const readRepo = (relative: string): string => readFileSync(join(ROOT, relative), "utf8");
/** How often `part` occurs in `text`. */
const occurrences = (text: string, part: string): number => text.split(part).length - 1;
/** The credentialed live tier, excluded from the default gate: its observerFor mirrors runWorkflowTask's observer callback. */
const LIVE_SUITE = "test/workbench-claude-control-live.test.ts";
/** The line on which production's observer callback, and the live tier's mirror of it, derive the ref from this closure. */
const DERIVE_LINE = "const messageRef = claudeMessageEvidenceRef(snapshot.lastMessageId);";
/** How both hand the derived ref to the emitter: that ref alone, or nothing. */
const EMIT_SHAPE = "messageRef ? [messageRef] : undefined";
/** The live tier takes the closure from src/index.ts, the one definition, beside the extension it boots. */
const LIVE_IMPORT = 'import subagentsExtension, { claudeMessageEvidenceRef } from "../src/index.js";';

describe("wb-p2ef F4: the live tier's observer mirror derives the claude-message ref through this closure, so the case list above binds it", () => {
  const index = readRepo("src/index.ts");
  const live = readRepo(LIVE_SUITE);
  const lines = (source: string): string[] => source.split("\n").map(line => line.trim());

  it("production and the live mirror each carry the one shared derive line and the one emit shape (the ref alone, or nothing) exactly once", () => {
    expect(lines(index).filter(line => line === DERIVE_LINE).length, "src/index.ts derive line").toBe(1);
    expect(lines(live).filter(line => line === DERIVE_LINE).length, "live suite derive line").toBe(1);
    expect(occurrences(index, EMIT_SHAPE), "src/index.ts emit shape").toBe(1);
    expect(occurrences(live, EMIT_SHAPE), "live suite emit shape").toBe(1);
  });

  it("the live mirror imports the closure from src/index.ts and composes no ref of its own (the old repair, stripUnsafeText then a 120-unit cut, is gone)", () => {
    expect(lines(live).includes(LIVE_IMPORT), "live suite imports claudeMessageEvidenceRef from src/index.ts").toBe(true);
    expect(occurrences(live, "`claude-message:${"), "live suite composes a claude-message ref itself").toBe(0);
    expect(occurrences(live, "stripUnsafeText"), "live suite strips locally").toBe(0);
  });
});
