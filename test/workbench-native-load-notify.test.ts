/**
 * wb-72c (zo9 gate F-G2, owner-ordered): the native-load notify path in src/index.ts. When the native load rejects,
 * registerWorkbenchTools tells the operator why through ctx.ui.notify (interactive) or console.warn (headless). The reason is the
 * load error's own message, a producer string, so it is display text and takes the one helper's label layout at the 300 bound,
 * sanitizeWorkbenchText(message, 300, "label"), which redacts every reading of a gap before anything is stripped. Before wb-72c
 * the path composed the text itself (stripUnsafeText(message, " ").slice(0, 300)): it deleted unsafe units but never redacted,
 * so a credential the message carried was displayed, and a separator put in the middle of a keyword became a space that still
 * left its value readable.
 *
 * Respin after the gate's cmd_b06d1ef890f4 refusal (ORCH-REC-R595, R590-owner); the unmet items these rows cure:
 * - U1 mock-free: the load failure is the extension factory's injected loader (src/index.ts SubagentsExtensionInjection), so the
 *   real session_start -> registerWorkbenchTools -> catch runs unchanged. No module is replaced (no vi.mock, no vi.doMock); the
 *   driver is test/helpers/native-load-notify.ts.
 * - U3 GATE-STEER1: planted gap-split and literal [REDACTED] markers counted x2 and x3, the glue, separator, tie and mix classes,
 *   and a keyword split by a zero-width unit at the 300 bound (sibling shapes: pi-ingest-clamp :82, graph-view :738,
 *   claude-transcript-privacy :526).
 * - U6 names-only: a failure names the probe and its class, never the text or the planted secret.
 * - U7 the label layout and the exact 300 bound are pinned by rows that the text and terminal layouts and the 299 and 301 bounds
 *   each turn red.
 * - U8 each-liveness: the probe table's ids and per-row secret counts are frozen literals, every one registered its row, and
 *   every planted secret is in its own input, so emptying the table, dropping, renaming or hollowing a row turns it red.
 *
 * Every credential below is an obviously fake placeholder; the rows pin input hygiene only.
 */
import { describe, expect, it } from "vitest";
import { sanitizeWorkbenchText } from "../src/workbench/redaction.js";
import { NATIVE_LOAD_WARNING, nativeLoadNotifyDriver } from "./helpers/native-load-notify.js";
import { UNSAFE_DISPLAY } from "./helpers/unsafe-display.js";

const cp = (code: number): string => String.fromCodePoint(code);
const NUL = cp(0x00);
const BEL = cp(0x07);
const LF = cp(0x0a);
const ESC = cp(0x1b);
const ZWSP = cp(0x200b);
const RLO = cp(0x202e);
const BOM = cp(0xfeff);

/**
 * Instrument constant, not a behavioural bound: one row is one session_start on an extension that is already booted (a few
 * milliseconds alone); the first row of each surface also boots it. Sized for the shared, loaded gate host.
 */
const ROW_TIMEOUT = 60_000;

interface Probe {
  readonly id: string;
  readonly raw: string;
  readonly secrets: readonly string[];
}

/** The first cut's seven rows, kept: a credential the load error carries, plain and split by each gap class. */
const CARRIED: readonly Probe[] = [
  { id: "N1 bearer in the load error", raw: "Authorization: Bearer abc123", secrets: ["abc123"] },
  { id: "N2 BEL inside password", raw: `pass${BEL}word=hunter2`, secrets: ["hunter2"] },
  { id: "N3 ZWSP inside api_key", raw: `api${ZWSP}_key=xyz`, secrets: ["xyz"] },
  { id: "N4 RLO inside password", raw: `pass${RLO}word=hunter2`, secrets: ["hunter2"] },
  { id: "N5 LF between the keyword and its value", raw: `token: Bearer${LF}abc123`, secrets: ["abc123"] },
  { id: "N6 SGR around the scheme", raw: `Authorization: ${ESC}[1mBearer${ESC}[0m abc123`, secrets: ["abc123"] },
  { id: "N7 prefixed key", raw: "failed with sk-ant-fakefakefake0000", secrets: ["fakefakefake0000"] },
];

/**
 * U3, the steered-reading probes: producer text must never pick which reading of a gap wins. Marker text planted beside a glued
 * credential would steer a sanitizer that kept whichever reading redacted more; the one helper redacts under every reading at
 * once, so no count of markers, gap-split or literal, can steer it.
 */
const STEER: readonly Probe[] = [
  { id: "S1 GATE-STEER1 count-steered x2: gap-split markers after a ZWSP-glued Bearer token", raw: `Bearer${ZWSP}NLSTEERTWOSPLIT [REDAC${ZWSP}TED] [REDAC${ZWSP}TED]`, secrets: ["NLSTEERTWOSPLIT"] },
  { id: "S2 GATE-STEER1 count-steered x3: gap-split markers after a ZWSP-glued Bearer token", raw: `Bearer${ZWSP}NLSTEERTHREESPLIT [REDAC${ZWSP}TED] [REDAC${ZWSP}TED] [REDAC${ZWSP}TED]`, secrets: ["NLSTEERTHREESPLIT"] },
  { id: "S3 GATE-STEER1 count-steered x2: literal markers before a ZWSP-glued Bearer token", raw: `[REDACTED] [REDACTED] Bearer${ZWSP}NLSTEERTWOLITERAL`, secrets: ["NLSTEERTWOLITERAL"] },
  { id: "S4 GATE-STEER1 count-steered x3: literal markers before an in-token scheme", raw: `[REDACTED] [REDACTED] [REDACTED] x${ZWSP}Bea${ZWSP}rer NLSTEERTHREELITERAL`, secrets: ["NLSTEERTHREELITERAL"] },
  { id: "S5 glue: BEL inside the scheme keyword", raw: `Bea${BEL}rer NLGLUEBEL`, secrets: ["NLGLUEBEL"] },
  { id: "S6 glue: SGR inside the password keyword", raw: `pass${ESC}[0mword=NLGLUESGR`, secrets: ["NLGLUESGR"] },
  { id: "S7 separator: NUL as the space after Bearer", raw: `Authorization: Bearer${NUL}NLSEPNUL`, secrets: ["NLSEPNUL"] },
  { id: "S8 separator: BOM as the boundary before sk-ant-", raw: `key${BOM}sk-ant-NLSEPBOM`, secrets: ["NLSEPBOM"] },
  { id: "S9 tie: ZWSP inside an sk-ant- key", raw: `sk-ant-aaaa${ZWSP}NLTIETAIL`, secrets: ["NLTIETAIL"] },
  { id: "S10 mix: tie key plus in-token scheme", raw: `sk-ant-AAA${ZWSP}NLMIXTAIL x${ZWSP}Bea${ZWSP}rer NLMIXBEARER`, secrets: ["NLMIXTAIL", "NLMIXBEARER"] },
  // The value ends at unit 291, inside a 300-unit slice; the text runs on to 321 units, so the 300 bound cuts the warning.
  { id: "S11 keyword split by ZWSP at the 300 bound", raw: `${"x".repeat(270)} pass${ZWSP}word=NLBOUNDHEAD ${"q".repeat(30)}`, secrets: ["NLBOUNDHEAD"] },
];

const PROBES: readonly Probe[] = [...CARRIED, ...STEER];
/** U8 each-liveness: the table at this cut, as a literal. Dropping, renaming or emptying a row turns the liveness row red. */
const FROZEN_IDS: readonly string[] = [
  "N1 bearer in the load error",
  "N2 BEL inside password",
  "N3 ZWSP inside api_key",
  "N4 RLO inside password",
  "N5 LF between the keyword and its value",
  "N6 SGR around the scheme",
  "N7 prefixed key",
  "S1 GATE-STEER1 count-steered x2: gap-split markers after a ZWSP-glued Bearer token",
  "S2 GATE-STEER1 count-steered x3: gap-split markers after a ZWSP-glued Bearer token",
  "S3 GATE-STEER1 count-steered x2: literal markers before a ZWSP-glued Bearer token",
  "S4 GATE-STEER1 count-steered x3: literal markers before an in-token scheme",
  "S5 glue: BEL inside the scheme keyword",
  "S6 glue: SGR inside the password keyword",
  "S7 separator: NUL as the space after Bearer",
  "S8 separator: BOM as the boundary before sk-ant-",
  "S9 tie: ZWSP inside an sk-ant- key",
  "S10 mix: tie key plus in-token scheme",
  "S11 keyword split by ZWSP at the 300 bound",
];
/** How many secrets each frozen row plants, in table order (S10 plants two). */
const FROZEN_SECRET_COUNTS: readonly number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1];
/** Every probe id a row was registered for, in registration order. */
const REGISTERED: string[] = [];

/** The warning the operator is shown for a load that failed with `raw`, as the one helper's label layout at 300 makes it. */
const expected = (raw: string): string => `${NATIVE_LOAD_WARNING}${sanitizeWorkbenchText(raw, 300, "label")}).`;

/** The reason inside a warning line, or undefined when the line does not have the warning's shape. */
function reasonOf(line: string): string | undefined {
  const at = line.indexOf(NATIVE_LOAD_WARNING);
  return at < 0 || !line.endsWith(").") ? undefined : line.slice(at + NATIVE_LOAD_WARNING.length, -2);
}

/** Names only (U6): what is wrong with the line a probe produced, as the probe id and a class. The text is never reported. */
function problems(probe: Probe, line: string): string[] {
  const found: string[] = [];
  if (reasonOf(line) === undefined) found.push(`${probe.id}: not the warning shape`);
  if (probe.secrets.some(secret => line.includes(secret))) found.push(`${probe.id}: leaked a planted secret`);
  if (UNSAFE_DISPLAY.test(line)) found.push(`${probe.id}: kept an unsafe code point`);
  if (line.includes(LF)) found.push(`${probe.id}: more than one line`);
  return found;
}

describe("wb-72c native-load notify path routes through the one helper (interactive surface, ctx.ui.notify)", () => {
  const warning = nativeLoadNotifyDriver("interactive");
  const lineFor = async (raw: string): Promise<string> => (await warning(raw))[0] ?? "";

  for (const probe of PROBES) {
    REGISTERED.push(probe.id);
    it(`${probe.id}: no planted secret and no unsafe unit in the warning`, { timeout: ROW_TIMEOUT }, async () => {
      expect(problems(probe, await lineFor(probe.raw))).toEqual([]);
    });
  }

  it("U8 each-liveness: the probe table is exactly the frozen rows, every one registered its row, and every planted secret is in its input", () => {
    expect(PROBES).toHaveLength(18);
    expect(PROBES.map(probe => probe.id)).toEqual(FROZEN_IDS);
    expect(PROBES.map(probe => probe.secrets.length)).toEqual(FROZEN_SECRET_COUNTS);
    expect(REGISTERED).toEqual(FROZEN_IDS);
    // Non-vacuous: a row whose input does not carry its planted secret would pass however the warning is made (names only).
    expect(PROBES.filter(probe => !probe.secrets.every(secret => probe.raw.includes(secret))).map(probe => probe.id)).toEqual([]);
  });

  it("routing pin: every probe's warning is the one helper's label layout at the 300 bound, exactly (names only)", { timeout: ROW_TIMEOUT }, async () => {
    const off: string[] = [];
    for (const probe of PROBES) if ((await lineFor(probe.raw)) !== expected(probe.raw)) off.push(probe.id);
    expect(off).toEqual([]);
  });

  it("U7 label layout: runs of whitespace collapse to one space (the text and terminal layouts keep them)", { timeout: ROW_TIMEOUT }, async () => {
    expect(reasonOf(await lineFor("obviously  fake   spaced reason"))).toBe("obviously fake spaced reason");
  });

  it("U7 label layout: a control and an escape sequence each show as one space (text deletes both, terminal deletes the sequence)", { timeout: ROW_TIMEOUT }, async () => {
    expect(reasonOf(await lineFor(`gap${BEL}between${ESC}[0mwords`))).toBe("gap between words");
  });

  it("U7 bound: a 300-unit reason is shown whole (a 299 bound would cut it)", { timeout: ROW_TIMEOUT }, async () => {
    const raw = `obviously fake ${"y".repeat(285)}`;
    expect(raw).toHaveLength(300);
    expect(reasonOf(await lineFor(raw))).toBe(raw);
  });

  it("U7 bound: a 301-unit reason keeps its first 280 units and the marker (a 301 bound, or a bare slice, would show 300 or more)", { timeout: ROW_TIMEOUT }, async () => {
    const raw = `obviously fake ${"z".repeat(286)}`;
    expect(raw).toHaveLength(301);
    expect(reasonOf(await lineFor(raw))).toBe(`${raw.slice(0, 280)} [truncated]`);
  });

  it("a plain load failure is still said, in full, on one line", { timeout: ROW_TIMEOUT }, async () => {
    const plain = "obviously fake optional install missing";
    expect(await lineFor(plain)).toBe(`${NATIVE_LOAD_WARNING}${plain}).`);
  });
});

describe("wb-72c native-load notify path on the headless surface (console.warn)", () => {
  const warning = nativeLoadNotifyDriver("headless");

  it("a headless session is warned on console.warn with the same helper-made message, prefixed (names only)", { timeout: ROW_TIMEOUT }, async () => {
    const probe = CARRIED[0];
    const [line = ""] = await warning(probe.raw);
    expect(problems(probe, line)).toEqual([]);
    expect(line === `[pi-subagents] ${expected(probe.raw)}`, `${probe.id}: the headless line is not the prefixed helper-made message`).toBe(true);
  });
});
