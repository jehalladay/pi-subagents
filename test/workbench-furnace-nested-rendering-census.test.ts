/**
 * wb-aalz: the docs/09 rendered-section reader, not a string search, reads subject restatements
 * planted after the real Furnace paragraph in eight deep-nested placements. The pairs below pin
 * the one-level-shallower controls independently of the deep rows. The parent wb-s876 census
 * remains unlanded; this child claims these marked-renderer witnesses, not its entire reader.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { docsSection, type RenderedBlock } from "./helpers/census.js";
import { docs09Reading } from "./helpers/furnace-docs-reading.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOC = "docs/workbench/09-observation-and-provenance.md";
const HEADING = "Experimental projection implementation";
const TITLE = `09 ${String.fromCodePoint(0x2014)} Observation, telemetry, provenance and derived graph`;
const READS = "The external Furnace reader uses explicit bounded status/attempt/log-reference polling.";
const VERBS = "Pi attachment is read-only and does not create, resume or stop a Run.";
const RESTATEMENT = "The Furnace reader also follows each Run's event stream.";
const SUBJECT = /furnace(?:['\u2019]s)?[^\p{L}\p{N}]*read/iu;

interface Pair {
  readonly id: string;
  readonly deep: string;
  readonly shallow: string;
  readonly deepKind: string;
  readonly shallowKind: string;
}
const PAIRS: readonly Pair[] = [
  { id: "QQ-LIST", deep: `> > - ${RESTATEMENT}`, shallow: `> - ${RESTATEMENT}`, deepKind: "blockquote", shallowKind: "blockquote" },
  { id: "ITEM-Q-LIST", deep: `- note\n  > - ${RESTATEMENT}`, shallow: `- note\n  - ${RESTATEMENT}`, deepKind: "list item", shallowKind: "list item" },
  { id: "QQ-ORDERED", deep: `> > 1. ${RESTATEMENT}`, shallow: `> 1. ${RESTATEMENT}`, deepKind: "blockquote", shallowKind: "blockquote" },
  { id: "QQ-TASK", deep: `> > - [ ] ${RESTATEMENT}`, shallow: `> - [ ] ${RESTATEMENT}`, deepKind: "blockquote", shallowKind: "blockquote" },
  { id: "QQ-POSSESSIVE", deep: `> > - The Furnace's reader also follows each Run's event stream.`, shallow: `> - The Furnace's reader also follows each Run's event stream.`, deepKind: "blockquote", shallowKind: "blockquote" },
  { id: "QQ-VERBS", deep: `> > - Pi attachment may stop a Run. ${RESTATEMENT}`, shallow: `> - Pi attachment may stop a Run. ${RESTATEMENT}`, deepKind: "blockquote", shallowKind: "blockquote" },
  { id: "QQ-LIST-QUOTE", deep: `> > - > ${RESTATEMENT}`, shallow: `> - > ${RESTATEMENT}`, deepKind: "blockquote", shallowKind: "blockquote" },
  { id: "ITEM-Q-LIST-QUOTE", deep: `- note\n  > - > ${RESTATEMENT}`, shallow: `- note\n  - > ${RESTATEMENT}`, deepKind: "list item", shallowKind: "list item" },
];
const FROZEN_PAIRS: readonly string[] = ["QQ-LIST:blockquote:blockquote", "ITEM-Q-LIST:list item:list item", "QQ-ORDERED:blockquote:blockquote", "QQ-TASK:blockquote:blockquote", "QQ-POSSESSIVE:blockquote:blockquote", "QQ-VERBS:blockquote:blockquote", "QQ-LIST-QUOTE:blockquote:blockquote", "ITEM-Q-LIST-QUOTE:list item:list item"];
/** Two material placement families, with every member a registered, reached test below. */
const ROWS: readonly { readonly id: string; readonly label: string; readonly pins: readonly string[] }[] = [
  { id: "QQ", label: "blockquote nested in blockquote", pins: ["QQ-LIST", "QQ-ORDERED", "QQ-TASK", "QQ-POSSESSIVE", "QQ-VERBS", "QQ-LIST-QUOTE"] },
  { id: "ITEM", label: "blockquote nested in list item", pins: ["ITEM-Q-LIST", "ITEM-Q-LIST-QUOTE"] },
];
const FROZEN_SHAPE = ["QQ:6", "ITEM:2"] as const;
const UNMET = ["GM7-second-top-list-item", "HM1-second-nested-list-item", "HM2-second-quote-child", "GM1-digit-entity", "GM3-Cf-only", "GM4-bidi-isolates", "GM2-prototype-name"] as const;
const page = readFileSync(join(REPO, DOC), "utf8");
const paragraph = page.slice(page.indexOf(READS), page.indexOf(VERBS) + VERBS.length);

function planted(block: string): readonly RenderedBlock[] {
  expect(paragraph.startsWith(READS) && paragraph.endsWith(VERBS), "the real Furnace paragraph anchors each in-place plant").toBe(true);
  const section = docsSection(page.replace(paragraph, `${paragraph}\n\n${block}`), HEADING, 2, [TITLE]);
  expect(section.ok, section.why).toBe(true);
  expect(section.hasHtml).toBe(false);
  return section.blocks;
}
function subjects(blocks: readonly RenderedBlock[]): string[] {
  return blocks.flatMap(block => {
    if (block.kind === "list") return block.items.filter(item => SUBJECT.test(item.text)).map(() => "list item");
    return "text" in block && SUBJECT.test(block.text) ? [block.kind === "other" ? block.type : block.kind] : [];
  });
}

describe("wb-aalz docs/09 nested rendered subject census: eight deep/shallow in-place pairs", () => {
  it("SHAPE and independent tracker anchor: both material child duties and eight placements remain named", () => {
    expect(PAIRS.map(pair => `${pair.id}:${pair.deepKind}:${pair.shallowKind}`)).toEqual(FROZEN_PAIRS);
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(FROZEN_SHAPE);
    expect(ROWS.flatMap(row => row.pins).sort()).toEqual(PAIRS.map(pair => pair.id).sort());
    const records: unknown[] = readFileSync(join(REPO, ".beads/issues.jsonl"), "utf8").trim().split("\n").map(line => JSON.parse(line) as unknown);
    const row = records.find(value => typeof value === "object" && value !== null && "id" in value && value.id === "wb-aalz");
    expect(row).toBeDefined();
    if (typeof row !== "object" || row === null || !("description" in row) || typeof row.description !== "string") throw new Error("wb-aalz description absent");
    expect(row.description).toContain("- U1 (material) deep-nested placements (blockquote-in-blockquote and blockquote-in-list-item holding a list)");
    expect(ROWS.map(entry => entry.label)).toEqual(["blockquote nested in blockquote", "blockquote nested in list item"]);
    expect(row.description).toContain(ROWS[0]?.label.replace(" nested in ", "-in-") ?? "<missing>");
    expect(row.description).toContain(ROWS[1]?.label.replace(" nested in ", "-in-").replace("list item", "list-item") ?? "<missing>");
    expect(row.description).toContain("- U2 (material) the one-level-shallower control divergence");
    const count = /Counts from the record: (\d+) of (\d+) plants STATED in memory/.exec(row.description);
    expect(count?.slice(1), "the outside filed record anchors the number of deep in-place plants").toEqual(["8", "8"]);
    expect(PAIRS).toHaveLength(Number(count?.[1]));
    expect(PAIRS.filter(pair => pair.id.startsWith("QQ-")).length).toBe(6);
    expect(PAIRS.filter(pair => pair.id.startsWith("ITEM-")).length).toBe(2);
    expect(UNMET).toEqual(["GM7-second-top-list-item", "HM1-second-nested-list-item", "HM2-second-quote-child", "GM1-digit-entity", "GM3-Cf-only", "GM4-bidi-isolates", "GM2-prototype-name"]);
    const preview = docs09Reading(page);
    expect(preview.reads).toEqual(["status", "attempt", "log-reference"]);
    expect(preview.verbs).toEqual(["create", "resume", "stop"]);
  });

  it("INVERSION: the seven reader mutants folded into the child have independent in-place witnesses", () => {
    const witnesses = [
      { id: UNMET[0], plant: `- note\n- ${RESTATEMENT}`, field: "Furnace read", kind: "list item" },
      { id: UNMET[1], plant: `> - note\n> - ${RESTATEMENT}`, field: "Furnace read", kind: "blockquote" },
      { id: UNMET[2], plant: `> note\n>\n> ${RESTATEMENT}`, field: "Furnace read", kind: "blockquote" },
      { id: UNMET[3], plant: "> The Furnace&emsp13;reader also follows each Run's event stream.", field: "undecoded", kind: "&emsp13;" },
      { id: UNMET[4], plant: `> Pi keeps po${String.fromCodePoint(0xfff9)}lling each Run.`, field: "poll", kind: "blockquote" },
      { id: UNMET[5], plant: `> Pi${String.fromCodePoint(0x2067)}docs.`, field: "controls", kind: "U+2067" },
      { id: UNMET[6], plant: "> Pi&constructor;docs.", field: "undecoded", kind: "&constructor;" },
    ] as const;
    expect(witnesses.map(witness => witness.id)).toEqual(UNMET);
    for (const witness of witnesses) {
      const reading = docs09Reading(page.replace(paragraph, `${paragraph}\n\n${witness.plant}`));
      expect(reading.binds, `${witness.id} binds the real docs section`).toBe(true);
      expect(reading.reads, `${witness.id} refuses the original read claim`).toEqual([]);
      expect(reading.verbs, `${witness.id} refuses the original verb claim`).toEqual([]);
      if (witness.field === "undecoded") expect(reading.undecoded, witness.id).toContain(witness.kind);
      else if (witness.field === "controls") expect(reading.controls, witness.id).toContain(witness.kind);
      else expect(reading.subjects[witness.field], witness.id).toContain(witness.kind);
    }
  });

  for (const pair of PAIRS) {
    it(`${pair.id}: in-place deep and one-level-shallower reader witness`, () => {
      const deep = subjects(planted(pair.deep));
      const shallow = subjects(planted(pair.shallow));
      expect(deep, `${pair.id} deep restatement must reach the subject reader`).toEqual(["paragraph", pair.deepKind]);
      expect(shallow, `${pair.id} control must reach the same subject reader`).toEqual(["paragraph", pair.shallowKind]);
      const deepReading = docs09Reading(page.replace(paragraph, `${paragraph}\n\n${pair.deep}`));
      const shallowReading = docs09Reading(page.replace(paragraph, `${paragraph}\n\n${pair.shallow}`));
      for (const [reading, kind] of [[deepReading, pair.deepKind], [shallowReading, pair.shallowKind]] as const) {
        expect(reading.binds, `${pair.id} remains in the bound section`).toBe(true);
        expect(reading.reads, `${pair.id} restatement refuses the bounded read claim`).toEqual([]);
        expect(reading.verbs, `${pair.id} restatement refuses the verb claim`).toEqual([]);
        expect(reading.subjects["Furnace read"], `${pair.id} preserves both real and restated subject locations`).toEqual(["paragraph", kind]);
      }
    });
  }
});
