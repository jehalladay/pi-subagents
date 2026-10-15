import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// wb-2t2 acceptance: "docs quote the receipt; no src change without an owner
// ruling; TRACEABILITY row cites wb-a2g.3." Scope (A): docs/15 + docs/10 state
// the measured behavior and the explicit cancel path verbatim.

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
function read(path: string): string {
  return readFileSync(join(repo, path), "utf8");
}

const DOC_15 = "docs/workbench/15-implementation-program.md";
const DOC_10 = "docs/workbench/10-terminal-inspector.md";
const TRACE = "docs/workbench/TRACEABILITY.md";

function section(markdown: string, heading: string): string {
  const start = markdown.indexOf(heading);
  if (start < 0) return "";
  const rest = markdown.slice(start);
  const next = rest.slice(heading.length).search(/\n## /);
  return next < 0 ? rest : rest.slice(0, heading.length + next);
}

/** The VC-1 block of docs/15, from its heading line to the next VC heading. */
function vc1Block(): string {
  const markdown = read(DOC_15);
  const start = markdown.indexOf("**VC-1:");
  const end = markdown.indexOf("**VC-2:");
  return start < 0 || end < 0 ? "" : markdown.slice(start, end);
}

describe("wb-2t2 docs state the measured Ctrl-C behavior and the explicit cancel path", () => {
  it("docs/15 VC-1 says a Ctrl-C byte through the pty does not stop a background workflow", () => {
    const block = vc1Block();
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

  it("docs/15 VC-1 quotes the wb-a2g.3 receipt measurements", () => {
    const block = vc1Block();
    expect(block).toContain("wb-a2g.3");
    expect(block).toContain("22.8");
    expect(block).toContain("ctrlCStoppedWorkflow:false");
    expect(block).toContain("pi 1.2.0");
    expect(block).toContain("f63fd79");
  });

  it("docs/15 keeps the original VC-1 sentence and marks the keybinding or hint as an undecided design call", () => {
    const block = vc1Block();
    expect(block).toContain("Ctrl-C/cancel and invalid model/permission failures behave explicitly.");
    expect(block).toMatch(/owner ruling/i);
  });

  it("docs/10 states the same behavior and cancel path in a dedicated section", () => {
    const body = section(read(DOC_10), "## Cancelling a background workflow");
    expect(body).not.toBe("");
    expect(body).toMatch(/Ctrl-C/);
    expect(body).toMatch(/no effect|does not stop/i);
    expect(body).toMatch(/\bEsc\b/);
    expect(body).toMatch(/fleet list/i);
    expect(body).toMatch(/workflow row/i);
    expect(body).toMatch(/x stop/);
    expect(body).toContain("wb-a2g.3");
  });

  it("TRACEABILITY carries a section citing wb-a2g.3 and wb-2t2 for the measured gap", () => {
    const body = section(read(TRACE), "## VC-1 measured gap: Ctrl-C does not stop a background workflow (wb-2t2)");
    expect(body).not.toBe("");
    expect(body).toContain("wb-a2g.3");
    expect(body).toContain("wb-2t2");
    expect(body).toMatch(/src\/ui\/workflow-dialog\.ts/);
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
});
