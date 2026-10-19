/**
 * wb-72c (zo9 gate F-G2, owner-ordered): the native-load notify path in src/index.ts. When loadWorkbenchNative() rejects,
 * registerWorkbenchTools tells the operator why through ctx.ui.notify (interactive) or console.warn (headless). The reason is
 * the load error's own message -- a producer string -- so it is display text and takes the one helper's label layout, which
 * redacts every reading of a gap before anything is stripped. Before wb-72c the path composed the text itself
 * (stripUnsafeText(message, " ")): it deleted unsafe units but never redacted, so a credential the message carried was
 * displayed, and a separator put in the middle of a keyword became a space that still left its value readable.
 *
 * DIRECT-CALLER row (display-path rule): the one caller of the path is the session_start handler, so the rows boot the real
 * extension and read the text the operator is shown. The load failure is a per-probe rejection of loadWorkbenchNative (a
 * factory that makes an SDK import throw reaches the path wrapped in vitest's own mocking message, so it cannot carry a probe);
 * the rest of native-modules.ts is the real module, and nothing else is replaced.
 *
 * Every credential below is an obviously fake placeholder; the rows pin input hygiene only.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import type * as NativeModules from "../src/workbench/native-modules.js";
import { ctx, type Hermetic, hermeticDir, makePi } from "./helpers/boot-extension.js";

const cp = (code: number): string => String.fromCodePoint(code);
const BEL = cp(0x07);
const LF = cp(0x0a);
const ESC = cp(0x1b);
const ZWSP = cp(0x200b);
const RLO = cp(0x202e);

const UNSAFE_DISPLAY = /[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}\u{fff9}-\u{fffb}\u{13430}-\u{1343f}]|\p{Default_Ignorable_Code_Point}|[\u{d800}-\u{dfff}]/u;

interface Probe {
  readonly id: string;
  readonly raw: string;
  readonly secrets: readonly string[];
}

const PROBES: readonly Probe[] = [
  { id: "N1 bearer in the load error", raw: "Authorization: Bearer abc123", secrets: ["abc123"] },
  { id: "N2 BEL inside password", raw: `pass${BEL}word=hunter2`, secrets: ["hunter2"] },
  { id: "N3 ZWSP inside api_key", raw: `api${ZWSP}_key=xyz`, secrets: ["xyz"] },
  { id: "N4 RLO inside password", raw: `pass${RLO}word=hunter2`, secrets: ["hunter2"] },
  { id: "N5 LF between the keyword and its value", raw: `token: Bearer${LF}abc123`, secrets: ["abc123"] },
  { id: "N6 SGR around the scheme", raw: `Authorization: ${ESC}[1mBearer${ESC}[0m abc123`, secrets: ["abc123"] },
  { id: "N7 prefixed key", raw: "failed with sk-ant-fakefakefake0000", secrets: ["fakefakefake0000"] },
];

let hermetic: Hermetic | undefined;
afterEach(() => {
  hermetic?.restore();
  hermetic = undefined;
  vi.restoreAllMocks();
  vi.doUnmock("../src/workbench/native-modules.js");
  vi.resetModules();
});

/** Boots a fresh extension whose native load rejects with `raw` and returns the headless warning the operator would read. */
async function warningFor(raw: string): Promise<string> {
  hermetic = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude" } } });
  vi.resetModules();
  vi.doMock("../src/workbench/native-modules.js", async importOriginal => {
    const original = await importOriginal<typeof NativeModules>();
    return { ...original, loadWorkbenchNative: () => Promise.reject(new Error(raw)) };
  });
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const { default: extension } = await import("../src/index.js");
  const pi = makePi();
  extension(pi.pi);
  await pi.lifecycle.get("session_start")?.({}, ctx({ cwd: hermetic.dir }));
  const lines = warn.mock.calls.map(call => String(call[0])).filter(line => line.includes("Workbench tools not registered"));
  expect(lines).toHaveLength(1);
  return lines[0] ?? "";
}

describe("wb-72c native-load notify path routes through the one helper", () => {
  it.each(PROBES)("$id: no secret, no unsafe unit in the warning", { timeout: 60_000 }, async probe => {
    const shown = await warningFor(probe.raw);
    expect(shown).toContain("Workbench tools not registered: native modules failed to load (");
    for (const secret of probe.secrets) expect(shown).not.toContain(secret);
    expect(UNSAFE_DISPLAY.test(shown)).toBe(false);
  });

  it("a plain load failure is still said, in full, on one line", { timeout: 60_000 }, async () => {
    const plain = "obviously fake optional install missing";
    const shown = await warningFor(plain);
    expect(shown).toContain(plain);
    expect(shown.endsWith(").")).toBe(true);
    expect(shown).not.toContain("\n");
  });

  it("the reason is bounded at 300 code units", { timeout: 60_000 }, async () => {
    const shown = await warningFor(`obviously fake ${"x".repeat(900)}`);
    const reason = shown.slice(shown.indexOf("(") + 1, shown.lastIndexOf(")"));
    expect(reason.length).toBeLessThanOrEqual(300);
  });
});
