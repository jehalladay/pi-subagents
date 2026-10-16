import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// wb-2t2 acceptance: "docs quote the receipt; no src change without an owner
// ruling; TRACEABILITY row cites wb-a2g.3." Scope (A): docs/15 + docs/10 state
// the measured behavior and the explicit cancel path. Scope (B) landed at
// 4c5744d (fleet-list inactive footer names the stop path); the docs state it.
//
// Pin recipe (docs-pin recipe in force): ONE rendered view (HTML comments and
// fenced blocks stripped) is used for BOTH the bound search and the extraction;
// a heading must be unique before its section is sliced; a section ends at the
// next level-1/2 heading or EOF. The v1 iteration data (iterations 3-5, f63fd79)
// is SUPERSEDED by wb-h7r and is never pinned; the v2 receipt of record is.

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
function read(path: string): string {
  return readFileSync(join(repo, path), "utf8");
}

const DOC_15 = "docs/workbench/15-implementation-program.md";
const DOC_10 = "docs/workbench/10-terminal-inspector.md";
const TRACE = "docs/workbench/TRACEABILITY.md";
const FLEET_LIST = "src/ui/fleet-list.ts";

const TRACE_2T2_HEADING = "## VC-1 measured gap: Ctrl-C does not stop a background workflow (wb-2t2)";
const TRACE_A2G3_HEADING = "## VC-1 residual: live terminal operator acceptance receipt (wb-a2g.3)";
const DOC_10_HEADING = "## Cancelling a background workflow";
const FOOTER = "esc to interrupt · ← for agents · ↓ to manage or stop a workflow";
const V2_RECEIPT_PATH = "qa/workbench/receipts/wb-a2g.3-operator-receipt.json";

/** The view a reader sees: HTML comments and fenced code blocks removed. */
function rendered(markdown: string): string {
  return markdown.replace(/<!--[\s\S]*?-->/g, "").replace(/^```[^\n]*\n[\s\S]*?^```[^\n]*$/gm, "");
}

function headingLineCount(view: string, heading: string): number {
  return view.split("\n").filter((line) => line === heading).length;
}

/** Slice a level-2 section from the rendered view; empty unless the heading is unique. */
function section(path: string, heading: string): string {
  const view = rendered(read(path));
  if (headingLineCount(view, heading) !== 1) return "";
  const lines = view.split("\n");
  const start = lines.indexOf(heading);
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#{1,2} /.test(lines[i] ?? "")) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
}

/** The VC-1 block of docs/15: the unique `**VC-1:` line to the next `**VC-` line or level-1/2 heading. */
function vc1Block(): string {
  const lines = rendered(read(DOC_15)).split("\n");
  const starts = lines.flatMap((line, index) => (line.startsWith("**VC-1:") ? [index] : []));
  if (starts.length !== 1) return "";
  const start = starts[0] ?? 0;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^\*\*VC-\d/.test(lines[i] ?? "") || /^#{1,2} /.test(lines[i] ?? "")) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n");
}

const V1_TOKENS = ["f63fd79", "22.8s", "iterations 3-5"];

function expectV2Receipt(body: string): void {
  expect(body).toContain("wb-a2g.3");
  expect(body).toContain("e07474a");
  expect(body).toContain("361ea747");
  expect(body).toContain(V2_RECEIPT_PATH);
  expect(body).toMatch(/ctrlCStoppedWorkflow: ?false/);
  expect(body).toContain("pi 1.2.0");
}

function expectNoV1Data(body: string): void {
  for (const token of V1_TOKENS) expect(body).not.toContain(token);
}

describe("wb-2t2 docs state the measured Ctrl-C behavior and the explicit cancel path", () => {
  it("docs/15 VC-1 says a Ctrl-C byte through the pty does not stop a background workflow", () => {
    const block = vc1Block();
    expect(block).not.toBe("");
    expect(block).toMatch(/Ctrl-C/);
    expect(block).toMatch(/does not stop|has no effect on|no effect on/i);
    expect(block).toMatch(/background workflow/i);
  });

  it("docs/15 VC-1 names Esc as the turn interrupt and the run as not tied to the turn", () => {
    const block = vc1Block();
    expect(block).toMatch(/\bEsc\b/);
    expect(block).toMatch(/not tied to the turn/i);
  });

  it("docs/15 VC-1 names the explicit cancel path: fleet list, workflow row, dialog x stop", () => {
    const block = vc1Block();
    expect(block).toMatch(/fleet list/i);
    expect(block).toMatch(/workflow row/i);
    expect(block).toMatch(/x stop/);
  });

  it("docs/15 VC-1 quotes the wb-h7r v2 receipt of record and never the superseded v1 data", () => {
    const block = vc1Block();
    expectV2Receipt(block);
    expectNoV1Data(block);
  });

  it("docs/15 keeps the original VC-1 sentence and states the landed 4c5744d footer, not an open design call", () => {
    const block = vc1Block();
    expect(block).toContain("Ctrl-C/cancel and invalid model/permission failures behave explicitly.");
    expect(block).toContain("4c5744d");
    expect(block).toContain(FOOTER);
    expect(block).not.toMatch(/open design call/i);
    expect(block).not.toMatch(/owner ruling/i);
  });

  it("docs/10 states the same behavior, the v2 receipt and the landed footer in a dedicated section", () => {
    const body = section(DOC_10, DOC_10_HEADING);
    expect(body).not.toBe("");
    expect(body).toMatch(/Ctrl-C/);
    expect(body).toMatch(/no effect|does not stop/i);
    expect(body).toMatch(/\bEsc\b/);
    expect(body).toMatch(/fleet list/i);
    expect(body).toMatch(/workflow row/i);
    expect(body).toMatch(/x stop/);
    expectV2Receipt(body);
    expectNoV1Data(body);
    expect(body).toContain("4c5744d");
    expect(body).toContain(FOOTER);
    expect(body).not.toMatch(/open design call/i);
  });

  it("TRACEABILITY carries a unique wb-2t2 section citing the v2 receipt and the landed footer", () => {
    const body = section(TRACE, TRACE_2T2_HEADING);
    expect(body).not.toBe("");
    expect(body).toContain("wb-2t2");
    expectV2Receipt(body);
    expectNoV1Data(body);
    expect(body).toMatch(/src\/ui\/workflow-dialog\.ts/);
    expect(body).toContain("4c5744d");
    expect(body).toContain(FOOTER);
    expect(body).not.toMatch(/open design call/i);
  });
});

describe("wb-2t2 the wb-h7r SUPERSEDED correction marker stays inside the wb-a2g.3 section", () => {
  it("the marker lies inside the unique wb-a2g.3 section after a blank separator", () => {
    const body = section(TRACE, TRACE_A2G3_HEADING);
    expect(body).not.toBe("");
    expect(body).toMatch(/\n\nSUPERSEDED \(wb-h7r\): the cancellation claims of this paragraph were unevidenced/);
  });

  it("the marker is not part of the wb-2t2 section and appears exactly once in the rendered file", () => {
    const body = section(TRACE, TRACE_2T2_HEADING);
    expect(body).not.toBe("");
    expect(body).not.toContain("SUPERSEDED");
    const view = rendered(read(TRACE));
    expect(view.split("SUPERSEDED (wb-h7r): the cancellation claims").length - 1).toBe(1);
  });
});

describe("wb-2t2 the documented cancel path exists in src", () => {
  it("the workflow dialog offers an x stop hint wired to a kill action", () => {
    const dialog = read("src/ui/workflow-dialog.ts");
    expect(dialog).toContain('hints.push("x stop")');
    expect(dialog).toContain('kind: "kill"');
  });

  it("the workflow menu announces the stop it performs", () => {
    expect(read("src/ui/workflow-menu.ts")).toContain("Stopped workflow");
  });

  it("the fleet-list inactive footer names the stop path while a workflow is live", () => {
    expect(read(FLEET_LIST)).toContain(FOOTER);
  });
});
