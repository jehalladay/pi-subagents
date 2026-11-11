import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// M00-D (MechanicalWorkflows-loexn.4; EAT-R028, EAT-R029, EAT-R030): representation errata for the owner-deposited
// pi-native-interoperability-2026-11-09 program documents. Every repair lands as an INSERT erratum block after the
// affected section; the pinned paragraphs stay byte-identical because the owner decides wording changes and the pin advance.
const program = resolve(import.meta.dirname, "..", "docs", "programs", "pi-native-interoperability-2026-11-09");
const read = (name: string): string => readFileSync(resolve(program, name), "utf8");
const README = read("README.md");
const AUDIT = read("01-AUDIT-AND-CONTRACT.md");
const VERIFY = read("03-VERIFICATION-AND-RELEASE.md");

/** Text of the section that starts at `heading` and ends before the next heading of the same or a higher level. */
function section(doc: string, heading: string): string {
  const start = doc.indexOf(`\n${heading}`);
  assert.ok(start >= 0, `heading not found: ${heading}`);
  const level = heading.match(/^#+/)![0].length;
  const rest = doc.slice(start + 1 + heading.length);
  const next = rest.search(new RegExp(`^#{1,${level}} `, "m"));
  return next < 0 ? rest : rest.slice(0, next);
}
/** Erratum blocks inside `text`: blockquote paragraphs whose first line opens with the erratum marker for `id`. */
function errata(text: string, id: string, topic?: string): string[] {
  const marker = new RegExp(`^> \\*\\*Erratum \\(${id}${topic ? `[^)]*${topic}` : ""}[^)]*\\)`);
  return text.split(/\n\n+/).filter(block => marker.test(block.trim()));
}
/** Remove every erratum block from the document so a phrase count can speak for the pinned text only. */
function outsideErrata(doc: string): string {
  return doc.split(/\n\n+/).filter(block => !/^> \*\*Erratum \(EAT-R0\d\d/.test(block.trim())).join("\n\n");
}
const count = (text: string, phrase: string): number => text.split(phrase).length - 1;

test("EAT-R028 README erratum follows the Audit baseline section and names Pi 59da7d84 and the per-agent race", () => {
  const baseline = section(README, "## Audit baseline and disposition (not live proof)");
  const blocks = errata(baseline, "EAT-R028");
  assert.equal(blocks.length, 1, "exactly one EAT-R028 erratum in the Audit baseline section");
  assert.match(blocks[0]!, /59da7d84/);
  assert.match(blocks[0]!, /2026-10-15/);
  assert.match(blocks[0]!, /per-agent skip\/retry race during the awaited beforeDispatch/);
  assert.match(blocks[0]!, /whole-run recheck predates/);
});

test("EAT-R028 doc 01 erratum follows the corrections table and names Pi 59da7d84", () => {
  const corrections = section(AUDIT, "### Corrected claims / residual risks");
  const blocks = errata(corrections, "EAT-R028");
  assert.equal(blocks.length, 1, "exactly one EAT-R028 erratum after the 01 corrections table");
  assert.match(blocks[0]!, /59da7d84/);
  assert.match(blocks[0]!, /per-agent skip\/retry race during the awaited beforeDispatch/);
  assert.ok(corrections.indexOf("| Pre-dispatch abort can start late SDK") < corrections.indexOf(blocks[0]!), "erratum sits after the table row it corrects");
});

test("EAT-R028 pinned corrections wording stays byte-identical (OWNER-DECISION: pin advance deferred)", () => {
  const phrase = "Pi Claude host rechecks abort after asynchronous before-dispatch";
  assert.equal(count(outsideErrata(README), phrase), 1, "owner decides when the pinned sentence is rewritten; M00-D inserts only");
  assert.equal(count(outsideErrata(AUDIT), "**Pi host rechecks whole-run abort**"), 1);
});

test("EAT-R029 README erratum states the narrowed packaged-host wording", () => {
  const baseline = section(README, "## Audit baseline and disposition (not live proof)");
  const blocks = errata(baseline, "EAT-R029");
  assert.equal(blocks.length, 1);
  assert.ok(
    blocks[0]!.replace(/\s+/g, " ").includes("the packed @mechanical/workflows-development library artifact is loaded by a local SHA-256-pinned test; the rig host itself is neither exported nor packaged"),
    "the exact narrowed sentence",
  );
});

test("EAT-R029 pinned table cell stays byte-identical (OWNER-DECISION: pin advance deferred)", () => {
  assert.equal(count(outsideErrata(README), "Turn proven packaged host into a stable explicit rig-host export"), 1);
});

test("EAT-R030 doc 03 carries the four scoping errata, each after its own section", () => {
  const intro = VERIFY.slice(0, VERIFY.indexOf("\n## Evidence ladder"));
  const falsifier = errata(intro, "EAT-R030", "falsifier");
  assert.equal(falsifier.length, 1);
  assert.match(falsifier[0]!, /C01 to C24/);
  assert.match(falsifier[0]!, /performance, agent-LX and packaging sections/);
  assert.match(falsifier[0]!, /without per-assertion falsifiers/);

  const ladder = errata(section(VERIFY, "## Evidence ladder: never promote a weaker witness"), "EAT-R030", "ladder");
  assert.equal(ladder.length, 1);
  assert.match(ladder[0]!, /L0-L6 ladder above supersedes/);
  assert.match(ladder[0]!, /docs\/08-qa-and-conformance\.md/, "docs/08 is referenced so a reader can find both ladders");

  const origin = errata(section(VERIFY, "## Four domain outcomes × host status"), "EAT-R030", "Core origin");
  assert.equal(origin.length, 1);
  assert.match(origin[0]!, /application rig/);
  assert.match(origin[0]!, /not Mechanical core/);
  assert.match(origin[0]!, /verification_failed/);

  const stage = errata(section(VERIFY, "## Agent LX and documentation verification"), "EAT-R030", "stage");
  assert.equal(stage.length, 1);
  assert.match(stage[0]!, /target/);
  assert.match(stage[0]!, /rig receipt/);
});

test("every erratum block carries the owner pin-advance marker and a dated header", () => {
  for (const [name, doc] of [["README.md", README], ["01", AUDIT], ["03", VERIFY]] as const) {
    const blocks = doc.split(/\n\n+/).filter(block => /^> \*\*Erratum \(EAT-R0\d\d/.test(block.trim()));
    assert.ok(blocks.length > 0, `${name} carries at least one erratum`);
    for (const block of blocks) {
      assert.match(block, /^> \*\*Erratum \(EAT-R0\d\d[^)]*2026-11-09[^)]*\)\.?\*\*/, `${name}: dated header`);
      assert.match(block, /pin advance (is )?(deferred|left) to the owner/, `${name}: owner marker`);
    }
  }
});
