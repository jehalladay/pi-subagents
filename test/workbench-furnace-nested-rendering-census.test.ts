/**
 * wb-aalz cut #2 (the respin of refusal #1, O:1649): the docs/09 rendered-section reader - docs09Reading in
 * test/helpers/furnace-docs-reading.ts over test/helpers/census.ts's rendered view, not a string search - refuses the
 * read and verb claims for exactly the plants pinned below as REFUSED and reads STATED for exactly the plants pinned below
 * as STATED (the quiet rows). Each plant is written right after the real Furnace paragraph of
 * docs/workbench/09-observation-and-provenance.md, or, for W-GA15 and S-GA15-quote, is that paragraph re-homed. The parent
 * wb-s876 census remains unlanded; this child claims these witnesses, not the parent's whole reader.
 *
 * PINNED READER SET (three judged tables; every case named here is a registered test of this file):
 * - PAIRS, the cases "<pair>: in-place deep and one-level-shallower reader witness" (8 cases; frozen shape QQ:6 ITEM:2): a
 *   restatement as the only child of a blockquote nested in a blockquote (QQ) or in a list item (ITEM), in eight
 *   placements, each beside its one-level-shallower control, read by this file's block reader and by docs09Reading.
 *   Anchor, read in the case "SHAPE and independent tracker anchor: ...": the bead description's U1 and U2 clauses and
 *   its "8 of 8" count.
 * - INVERSION, the case "INVERSION: ..." (7 rows, one witness each): the seven reader members R-B206 folded into this
 *   bead, each by one in-place witness and its whole reading. Anchor: the member ids of the R-B206 fold line and the two
 *   lines after it at the head of this bead's notes.
 * - CLAIM WORDS, the cases "<member>: ..." (12 rows, 40 pins; frozen shape CLAIM_SHAPE) and "CLAIM WORDS: ..." (the
 *   table's shape and anchors): the twelve gate members of refusal #1, each row quoting the claim words the refusal names,
 *   which the helper sources still carry, and pinning each plant's whole reading; every row holds at least one plant whose
 *   reading the member's mutant as refusal #1 specifies it changes. The gate's own fifteen witnesses are planted as
 *   refusal #1 quotes or describes them. Anchor: refusal #1's UNMET block in this bead's notes (its member ids, its
 *   witness ids and plants, its quoted claim words).
 * Every anchor above is read from this bead's row of .beads/issues.jsonl: the description, and in the notes the FIRST
 * R-B206 fold line with the two lines after it and the FIRST UNMET block of a gate verdict, which later notes append after.
 * ROSTER, the case "ROSTER: ...": test/fixtures/furnace-nested-rendering-roster.json, the out-of-file anchor of all three
 * tables and the residuals (the hk9l/5jha/1xvp.4/o4h0.3 roster pattern), holds every PAIRS, INVERSION and CLAIM WORDS
 * case in census order with the SHA-256 of its case as written (the JSON of its plants and expected reading), the PAIRS
 * families with their pins, every CLAIM WORDS row's quoted claim words, and the residuals with their quiet rows.
 *
 * RESIDUALS (named families, each with pinned quiet rows among the CLAIM WORDS pins; each quiet row reds when its plant
 * starts to reach the reader):
 * - R1 TABLE-CHILD: a table among the block children of a blockquote (top-level or nested) or of a list item renders no
 *   text in the shared rendered view (test/helpers/census.ts blockText reads no table cells), so a restatement in its
 *   cells reads STATED. Quiet rows S-R1-QQ-TABLE and S-R1-ITEM-Q-TABLE (the two deep families) and S-R1-Q-TABLE and
 *   S-R1-ITEM-TABLE (one level shallower), in row GA2.
 * - R2 RAW-FEFF: a raw U+FEFF inside a subject word reaches the helper as a space, because the rendered view collapses
 *   JavaScript whitespace (which includes U+FEFF) before subjectText removes format characters, so the subject is not
 *   read. Quiet row S-R2-RAW-FEFF, in row GA8; its reference spelling S-GA8-feff-ref is read. U+FEFF is the only format
 *   or default-ignorable code point JavaScript whitespace includes (pinned by the engine's own tables).
 * - R3 RAW-VT: a raw U+000B reaches the helper as a space for the same reason, so controlCharacters never sees it.
 *   Quiet row S-R3-RAW-VT, in row GA9; its reference spelling, inside S-GA9-all, is refused. U+000B is the only \p{Cc}
 *   code point but the four structural ones JavaScript whitespace includes, and no \p{Bidi_Control} code point is
 *   JavaScript whitespace (both pinned by the engine's own tables).
 *
 * NOT CLAIMED (scope sentences): a restatement as the third or later block child of a nested blockquote is NOT CLAIMED by
 * this census; a heading or code block inside a nested blockquote, and HTML anywhere in the section, are NOT CLAIMED by
 * this census; a numeric reference to a code point no plant here spells, a reference spelled without its semicolon, a
 * compatibility character other than U+FF26, a format or default-ignorable code point other than U+FFF9, U+034F and
 * U+FEFF, and a subject spelling no plant here spells are NOT CLAIMED by this census.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { docsSection, type RenderedBlock } from "./helpers/census.js";
import { type Docs09Reading, docs09Reading } from "./helpers/furnace-docs-reading.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOC = "docs/workbench/09-observation-and-provenance.md";
const HEADING = "Experimental projection implementation";
const TITLE = `09 ${String.fromCodePoint(0x2014)} Observation, telemetry, provenance and derived graph`;
const READS = "The external Furnace reader uses explicit bounded status/attempt/log-reference polling.";
const VERBS = "Pi attachment is read-only and does not create, resume or stop a Run.";
const RESTATEMENT = "The Furnace reader also follows each Run's event stream.";
const SUBJECT = /furnace(?:['’]s)?[^\p{L}\p{N}]*read/iu;
const cp = (code: number): string => String.fromCodePoint(code);

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

/** The bound section's rendered blocks of a page text. */
function sectionOf(text: string): readonly RenderedBlock[] {
  const section = docsSection(text, HEADING, 2, [TITLE]);
  expect(section.ok, section.why).toBe(true);
  expect(section.hasHtml).toBe(false);
  return section.blocks;
}
function planted(block: string): readonly RenderedBlock[] {
  expect(paragraph.startsWith(READS) && paragraph.endsWith(VERBS), "the real Furnace paragraph anchors each in-place plant").toBe(true);
  return sectionOf(page.replace(paragraph, `${paragraph}\n\n${block}`));
}
function subjects(blocks: readonly RenderedBlock[]): string[] {
  return blocks.flatMap(block => {
    if (block.kind === "list") return block.items.filter(item => SUBJECT.test(item.text)).map(() => "list item");
    return "text" in block && SUBJECT.test(block.text) ? [block.kind === "other" ? block.type : block.kind] : [];
  });
}

/** This bead's row of .beads/issues.jsonl: the description and the notes the anchors read. */
function beadRow(): { readonly description: string; readonly notes: string } {
  const records: unknown[] = readFileSync(join(REPO, ".beads/issues.jsonl"), "utf8").trim().split("\n").map(line => JSON.parse(line) as unknown);
  const row = records.find(value => typeof value === "object" && value !== null && "id" in value && value.id === "wb-aalz");
  if (typeof row !== "object" || row === null || !("description" in row) || typeof row.description !== "string") throw new Error("wb-aalz description absent");
  if (!("notes" in row) || typeof row.notes !== "string") throw new Error("wb-aalz notes absent");
  return { description: row.description, notes: row.notes };
}

/** R-B206's fold line, the first line of this bead's notes; the two lines after it name the folded members. */
const FOLD_LINE = "RULE19 DEPENDENCY INVERSION R-B206 (ruling M:42036, refusal O:1578): members folded into wb-aalz";
/** The member ids R-B206 folded into this bead, in its order: the GM and HM ids of the two lines after the FIRST fold line. */
function foldedMembers(notes: string): string[] {
  const lines = notes.split("\n");
  const at = lines.indexOf(FOLD_LINE);
  if (at < 0) throw new Error("this bead's notes hold no R-B206 fold line");
  const folded = lines.slice(at + 1, at + 3);
  expect(folded.map(line => line.slice(0, 3)), "the fold's U1 and U2 lines follow it").toEqual(["U1-", "U2-"]);
  return folded.flatMap(line => line.match(/\b[GH]M\d+\b/g) ?? []);
}

/** Refusal #1's UNMET block: the notes from the FIRST "UNMET (record.unmet verbatim" line of four items to the next PREP REASON line. */
function refusalUnmet(notes: string): string {
  const start = notes.indexOf("\nUNMET (record.unmet verbatim, one bullet per item, 4 items");
  const end = start < 0 ? -1 : notes.indexOf("\nPREP REASON (record.reason verbatim):", start);
  if (start < 0 || end < 0) throw new Error("this bead's notes hold no refusal #1 UNMET block");
  return notes.slice(start + 1, end);
}
/** The gate members refusal #1's four UNMET tag lines name, in order. */
function unmetMembers(block: string): string[] {
  const tags = block.split("\n").filter(line => /^- U\d+-[A-Z0-9-]+\.$/.test(line));
  expect(
    tags.map(tag => tag.slice(0, 5)),
    "refusal #1's four UNMET tag lines",
  ).toEqual(["- U1-", "- U2-", "- U3-", "- U4-"]);
  return tags.flatMap(tag => tag.match(/\bGA\d+\b/g) ?? []);
}
/** The gate witnesses refusal #1's UNMET block names, in order of first mention. */
const unmetWitnesses = (block: string): string[] => [...new Set(block.match(/\bW-GA\d+[a-z]?\b/g) ?? [])];
/** A gate witness's plant as refusal #1 quotes it (lines joined at "' / '", each <U+XXXX ...> written as its code point); undefined when the block only describes it. */
function quotedPlant(block: string, id: string): string | undefined {
  const quoted = new RegExp(`(?<![\\w-])${id}:? '(.+?\\.)'(?=[ .]|$)`, "m").exec(block);
  if (quoted === null) return undefined;
  return (quoted[1] ?? "")
    .split("' / '")
    .join("\n")
    .replace(/<U\+([0-9A-F]{4,6})(?: [^>]*)?>/g, (_whole, hex: string) => cp(Number.parseInt(hex, 16)));
}
/** The helper sources' text, comment line breaks read as spaces: the files the claim words and residual names live in. */
function claimSources(): string {
  return ["test/helpers/furnace-docs-reading.ts", "test/helpers/census.ts"]
    .map(file => readFileSync(join(REPO, file), "utf8"))
    .join("\n")
    .replace(/\s*\n\s*(?:\*(?!\/)\s*|\/\/\s*)?/g, " ");
}
/** A quoted claim as a pattern: refusal #1's elision " ... " stands for any text within one sentence. */
const claimPattern = (claim: string): RegExp =>
  new RegExp(
    claim
      .split(" ... ")
      .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join(" [^.]+? "),
  );

type SubjectWord = "Furnace read" | "poll" | "attach";
/** One plant and its whole expected reading (fields left out read as on the unplanted page). */
interface Witness {
  readonly id: string;
  readonly member: string;
  /** after: written after the real Furnace paragraph; rehome: that paragraph rewritten as `${plant}${paragraph}`. */
  readonly placement: "after" | "rehome";
  readonly plant: string;
  readonly stated: boolean;
  readonly subjects?: { readonly [word in SubjectWord]?: readonly string[] };
  readonly controls?: readonly string[];
  readonly undecoded?: readonly string[];
  /** The subject kinds this file's block reader finds (the rendered-view plants of row GA2). */
  readonly blocks?: readonly string[];
  /** Set when refusal #1 describes this gate witness instead of quoting it. */
  readonly described?: string;
}
const PARAGRAPH_SUBJECTS: Readonly<Record<SubjectWord, readonly string[]>> = { "Furnace read": ["paragraph"], poll: ["paragraph"], attach: ["paragraph"] };
const pageWith = (witness: Witness): string => page.replace(paragraph, () => (witness.placement === "after" ? `${paragraph}\n\n${witness.plant}` : `${witness.plant}${paragraph}`));
const projection = (reading: Docs09Reading) => ({
  binds: reading.binds,
  html: reading.html,
  undecoded: reading.undecoded,
  controls: reading.controls,
  subjects: reading.subjects,
  readsClauses: reading.readsClauses,
  verbsClauses: reading.verbsClauses,
  reads: reading.reads,
  verbs: reading.verbs,
});
const expectedOf = (witness: Witness) => ({
  binds: true,
  html: false,
  undecoded: witness.undecoded ?? [],
  controls: witness.controls ?? [],
  subjects: { ...PARAGRAPH_SUBJECTS, ...witness.subjects },
  readsClauses: ["status/attempt/log-reference"],
  verbsClauses: ["create, resume or stop"],
  reads: witness.stated ? ["status", "attempt", "log-reference"] : [],
  verbs: witness.stated ? ["create", "resume", "stop"] : [],
});
/** A plant's whole docs09Reading against its expected one, and, for a rendered-view plant, this file's block reader too. */
function judgeWitness(witness: Witness): void {
  const text = pageWith(witness);
  expect(projection(docs09Reading(text)), witness.id).toEqual(expectedOf(witness));
  if (witness.blocks !== undefined) expect(subjects(sectionOf(text)), `${witness.id} block reader`).toEqual(witness.blocks);
}

const INVERSION: readonly Witness[] = [
  { id: UNMET[0], member: "INVERSION", placement: "after", plant: `- note\n- ${RESTATEMENT}`, stated: false, subjects: { "Furnace read": ["paragraph", "list item"] } },
  { id: UNMET[1], member: "INVERSION", placement: "after", plant: `> - note\n> - ${RESTATEMENT}`, stated: false, subjects: { "Furnace read": ["paragraph", "blockquote"] } },
  { id: UNMET[2], member: "INVERSION", placement: "after", plant: `> note\n>\n> ${RESTATEMENT}`, stated: false, subjects: { "Furnace read": ["paragraph", "blockquote"] } },
  { id: UNMET[3], member: "INVERSION", placement: "after", plant: "> The Furnace&emsp13;reader also follows each Run's event stream.", stated: false, undecoded: ["&emsp13;"] },
  { id: UNMET[4], member: "INVERSION", placement: "after", plant: `> Pi keeps po${cp(0xfff9)}lling each Run.`, stated: false, subjects: { poll: ["paragraph", "blockquote"] } },
  { id: UNMET[5], member: "INVERSION", placement: "after", plant: `> Pi${cp(0x2066)}${cp(0x2067)}${cp(0x2068)}${cp(0x2069)}docs.`, stated: false, controls: ["U+2066", "U+2067", "U+2068", "U+2069"] },
  { id: UNMET[6], member: "INVERSION", placement: "after", plant: "> Pi&constructor;docs.", stated: false, undecoded: ["&constructor;"] },
];

const label = (code: number): string => `U+${code.toString(16).toUpperCase().padStart(4, "0")}`;
/** Every \p{Cc} code point but tab, line feed, form feed and carriage return, by the engine's own Unicode table. */
const CONTROLS = Array.from({ length: 0xa0 }, (_unused, code) => code).filter(code => /\p{Cc}/u.test(cp(code)) && ![0x09, 0x0a, 0x0c, 0x0d].includes(code));
/** The twelve \p{Bidi_Control} code points. */
const BIDI_CONTROLS = [0x061c, 0x200e, 0x200f, 0x202a, 0x202b, 0x202c, 0x202d, 0x202e, 0x2066, 0x2067, 0x2068, 0x2069];
const REFUSED_FURNACE = { "Furnace read": ["paragraph", "blockquote"] } as const;
const WITNESSES: readonly Witness[] = [
  { id: "W-GA2a", member: "GA2", placement: "after", plant: `> > note\n> >\n> > - ${RESTATEMENT}`, stated: false, subjects: REFUSED_FURNACE, blocks: ["paragraph", "blockquote"] },
  { id: "W-GA2b", member: "GA2", placement: "after", plant: `- note\n  > note\n  >\n  > - ${RESTATEMENT}`, stated: false, subjects: { "Furnace read": ["paragraph", "list item"] }, blocks: ["paragraph", "list item"] },
  { id: "W-GA2c", member: "GA2", placement: "after", plant: `> > note\n> >\n> > ${RESTATEMENT}`, stated: false, subjects: REFUSED_FURNACE, blocks: ["paragraph", "blockquote"] },
  { id: "S-GA2a-first", member: "GA2", placement: "after", plant: `> > - ${RESTATEMENT}\n> >\n> > note`, stated: false, subjects: REFUSED_FURNACE, blocks: ["paragraph", "blockquote"] },
  { id: "S-GA2b-first", member: "GA2", placement: "after", plant: `- note\n  > - ${RESTATEMENT}\n  >\n  > note`, stated: false, subjects: { "Furnace read": ["paragraph", "list item"] }, blocks: ["paragraph", "list item"] },
  { id: "S-GA2c-first", member: "GA2", placement: "after", plant: `> > ${RESTATEMENT}\n> >\n> > note`, stated: false, subjects: REFUSED_FURNACE, blocks: ["paragraph", "blockquote"] },
  { id: "S-GA2-QQQ", member: "GA2", placement: "after", plant: `> > > - ${RESTATEMENT}`, stated: false, subjects: REFUSED_FURNACE, blocks: ["paragraph", "blockquote"] },
  { id: "S-R1-QQ-TABLE", member: "GA2", placement: "after", plant: `> > | a |\n> > | --- |\n> > | ${RESTATEMENT} |`, stated: true, blocks: ["paragraph"] },
  { id: "S-R1-ITEM-Q-TABLE", member: "GA2", placement: "after", plant: `- note\n  > | a |\n  > | --- |\n  > | ${RESTATEMENT} |`, stated: true, blocks: ["paragraph"] },
  { id: "S-R1-Q-TABLE", member: "GA2", placement: "after", plant: `> | a |\n> | --- |\n> | ${RESTATEMENT} |`, stated: true, blocks: ["paragraph"] },
  { id: "S-R1-ITEM-TABLE", member: "GA2", placement: "after", plant: `- note\n\n  | a |\n  | --- |\n  | ${RESTATEMENT} |`, stated: true, blocks: ["paragraph"] },
  { id: "W-GA7", member: "GA7", placement: "after", plant: `> The ${cp(0xff26)}urnace reader also follows each Run's event stream.`, stated: false, subjects: REFUSED_FURNACE },
  { id: "S-GA7-ref", member: "GA7", placement: "after", plant: "> The &#xFF26;urnace reader also follows each Run's event stream.", stated: false, subjects: REFUSED_FURNACE },
  { id: "W-GA8", member: "GA8", placement: "after", plant: `> The Furnace re${cp(0x34f)}ader also follows each Run's event stream.`, stated: false, subjects: REFUSED_FURNACE },
  { id: "S-GA8-ref", member: "GA8", placement: "after", plant: "> The Furnace re&#x34F;ader also follows each Run's event stream.", stated: false, subjects: REFUSED_FURNACE },
  { id: "S-GA8-feff-ref", member: "GA8", placement: "after", plant: "> The Furnace re&#xFEFF;ader also follows each Run's event stream.", stated: false, subjects: REFUSED_FURNACE },
  { id: "S-R2-RAW-FEFF", member: "GA8", placement: "after", plant: `> The Furnace re${cp(0xfeff)}ader also follows each Run's event stream.`, stated: true },
  { id: "W-GA14", member: "GA14", placement: "after", plant: "> Pi reattachment is read-only.", stated: false, subjects: { attach: ["paragraph", "blockquote"] } },
  { id: "W-GA9a", member: "GA9", placement: "after", plant: `> Pi${cp(0x01)}docs.`, stated: false, controls: ["U+0001"] },
  { id: "W-GA9b", member: "GA9", placement: "after", plant: "> Pi&#1;docs.", stated: false, controls: ["U+0001"] },
  { id: "S-GA9-all", member: "GA9", placement: "after", plant: `> Pi${CONTROLS.map(code => `&#${code};`).join("")}docs.`, stated: false, controls: CONTROLS.map(label) },
  { id: "S-GA9-whitespace", member: "GA9", placement: "after", plant: "> Pi&#9;&#10;&#12;&#13;docs.", stated: true },
  { id: "S-R3-RAW-VT", member: "GA9", placement: "after", plant: `> Pi${cp(0x0b)}docs.`, stated: true },
  { id: "W-GA10", member: "GA10", placement: "after", plant: "> Pi&#146;docs.", stated: false, controls: ["U+0092"] },
  { id: "S-GA10-above-max", member: "GA10", placement: "after", plant: "> Pi&#x110000;docs.", stated: true },
  { id: "W-GA11", member: "GA11", placement: "after", plant: `> Pi${cp(0x061c)}docs.`, stated: false, controls: ["U+061C"] },
  { id: "S-GA11-all", member: "GA11", placement: "after", plant: `> Pi${BIDI_CONTROLS.map(cp).join("")}docs.`, stated: false, controls: BIDI_CONTROLS.map(label) },
  { id: "W-GA12", member: "GA12", placement: "after", plant: `> The Furnace${cp(0x2019)}s reader also follows each Run's event stream.`, stated: false, subjects: REFUSED_FURNACE, described: "the possessive spelled with U+2019" },
  { id: "S-GA12-case", member: "GA12", placement: "after", plant: "> The FURNACE READER also follows each Run's event stream.", stated: false, subjects: REFUSED_FURNACE },
  { id: "S-GA12-sep", member: "GA12", placement: "after", plant: "> The Furnace - reader also follows each Run's event stream.", stated: false, subjects: REFUSED_FURNACE },
  { id: "S-GA12-poll", member: "GA12", placement: "after", plant: "> Pi polls each Run.", stated: false, subjects: { poll: ["paragraph", "blockquote"] } },
  { id: "S-GA12-attach", member: "GA12", placement: "after", plant: "> Pi attaches to each Run.", stated: false, subjects: { attach: ["paragraph", "blockquote"] } },
  { id: "W-GA13", member: "GA13", placement: "after", plant: "> The Furnace readiness probe also follows each Run's event stream.", stated: false, subjects: REFUSED_FURNACE },
  { id: "W-GA15", member: "GA15", placement: "rehome", plant: "- ", stated: false, subjects: { "Furnace read": ["list item"], poll: ["list item"], attach: ["list item"] }, described: "the real paragraph re-homed as a list item" },
  { id: "S-GA15-quote", member: "GA15", placement: "rehome", plant: "> ", stated: false, subjects: { "Furnace read": ["blockquote"], poll: ["blockquote"], attach: ["blockquote"] } },
  { id: "W-GA4", member: "GA4", placement: "after", plant: "> Pi &AMP; docs.", stated: true },
  { id: "S-GA4-upper", member: "GA4", placement: "after", plant: "> Pi &AMP; &LT; &GT; &QUOT; &APOS; &NBSP; docs.", stated: true },
  { id: "S-GA4-mixed", member: "GA4", placement: "after", plant: "> Pi &Amp; &lT; &gT; &QuOt; &aPoS; &NbSp; docs.", stated: true },
  { id: "W-GA5", member: "GA5", placement: "after", plant: "> The Furnace&#146;s reader also follows each Run's event stream.", stated: false, subjects: REFUSED_FURNACE, controls: ["U+0092"] },
  { id: "S-GA5-hex", member: "GA5", placement: "after", plant: "> The Furnace&#x92;s reader also follows each Run's event stream.", stated: false, subjects: REFUSED_FURNACE, controls: ["U+0092"] },
];
/** One row per gate member of refusal #1: the claim words it quotes for that member, and the plants pinning them. */
interface ClaimRow {
  readonly id: string;
  readonly claims: readonly string[];
  readonly pins: readonly string[];
}
const CLAIM_ROWS: readonly ClaimRow[] = [
  {
    id: "GA2",
    claims: ["Nested blockquotes recursively carry their lists and subsequent children after wb-aalz", "A nested quote owns block children, not just inline tokens"],
    pins: ["W-GA2a", "W-GA2b", "W-GA2c", "S-GA2a-first", "S-GA2b-first", "S-GA2c-first", "S-GA2-QQQ", "S-R1-QQ-TABLE", "S-R1-ITEM-Q-TABLE", "S-R1-Q-TABLE", "S-R1-ITEM-TABLE"],
  },
  { id: "GA7", claims: ["fold compatibility characters"], pins: ["W-GA7", "S-GA7-ref"] },
  { id: "GA8", claims: ["remove format/default-ignorable characters before matching"], pins: ["W-GA8", "S-GA8-ref", "S-GA8-feff-ref", "S-R2-RAW-FEFF"] },
  { id: "GA14", claims: ["including the documented readiness and reattachment over-reads"], pins: ["W-GA14"] },
  { id: "GA9", claims: ["a control character", "any other \\p{Cc} code point"], pins: ["W-GA9a", "W-GA9b", "S-GA9-all", "S-GA9-whitespace", "S-R3-RAW-VT"] },
  { id: "GA10", claims: ["decoded either way", "either numeric-reference decoding"], pins: ["W-GA10", "S-GA10-above-max"] },
  { id: "GA11", claims: ["a bidi control"], pins: ["W-GA11", "S-GA11-all"] },
  { id: "GA12", claims: ["The parent wb-s876 subject-word forms"], pins: ["W-GA12", "S-GA12-case", "S-GA12-sep", "S-GA12-poll", "S-GA12-attach"] },
  { id: "GA13", claims: ["readiness ... over-reads"], pins: ["W-GA13"] },
  { id: "GA15", claims: ["occur once each in paragraphs"], pins: ["W-GA15", "S-GA15-quote"] },
  { id: "GA4", claims: ["(any case)"], pins: ["W-GA4", "S-GA4-upper", "S-GA4-mixed"] },
  { id: "GA5", claims: ["&#146; and &#x92; to U+2019"], pins: ["W-GA5", "S-GA5-hex"] },
];
const CLAIM_SHAPE = ["GA2:11", "GA7:2", "GA8:4", "GA14:1", "GA9:5", "GA10:2", "GA11:2", "GA12:5", "GA13:1", "GA15:2", "GA4:3", "GA5:2"] as const;
/** The named residual families of the header, each with its quiet rows among one member's pins. */
const RESIDUALS = [
  { id: "R1", family: "TABLE-CHILD", member: "GA2", quiet: ["S-R1-QQ-TABLE", "S-R1-ITEM-Q-TABLE", "S-R1-Q-TABLE", "S-R1-ITEM-TABLE"] },
  { id: "R2", family: "RAW-FEFF", member: "GA8", quiet: ["S-R2-RAW-FEFF"] },
  { id: "R3", family: "RAW-VT", member: "GA9", quiet: ["S-R3-RAW-VT"] },
] as const;
const GATE_WITNESS = /^W-GA\d+[a-z]?$/;
/** The out-of-file roster: every judged row and pin of the three tables and the residuals (the CT5/CT6 anchor). */
const ROSTER = "test/fixtures/furnace-nested-rendering-roster.json";
function witnessOf(id: string): Witness {
  const witness = WITNESSES.find(candidate => candidate.id === id);
  if (witness === undefined) throw new Error(`no witness ${id}`);
  return witness;
}

/** The SHA-256 of a case as written: the JSON of its plant and its expected reading. */
const caseHash = (value: unknown): string => createHash("sha256").update(JSON.stringify(value)).digest("hex");
/** Every judged row and pin of the three tables and the residuals, in census order, as the roster holds them. */
const liveRoster = () => ({
  pairs: PAIRS.map(pair => ({ id: pair.id, sha256: caseHash(pair) })),
  rows: ROWS.map(row => ({ id: row.id, label: row.label, pins: row.pins })),
  inversion: INVERSION.map(witness => ({ id: witness.id, sha256: caseHash(witness) })),
  claimWords: CLAIM_ROWS.map(row => ({ id: row.id, claims: row.claims, pins: row.pins.map(id => ({ id, sha256: caseHash(witnessOf(id)) })) })),
  residuals: RESIDUALS.map(residual => ({ id: residual.id, family: residual.family, member: residual.member, quiet: residual.quiet })),
});

describe("wb-aalz docs/09 nested rendered subject census: eight deep/shallow in-place pairs", () => {
  it("SHAPE and independent tracker anchor: both material child duties and eight placements remain named", () => {
    expect(PAIRS.map(pair => `${pair.id}:${pair.deepKind}:${pair.shallowKind}`)).toEqual(FROZEN_PAIRS);
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(FROZEN_SHAPE);
    expect(ROWS.flatMap(row => row.pins).sort()).toEqual(PAIRS.map(pair => pair.id).sort());
    const row = beadRow();
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

  it("INVERSION: the seven reader members folded into the child have independent in-place witnesses", () => {
    expect(INVERSION.map(witness => witness.id)).toEqual(UNMET);
    expect(
      UNMET.map(member => member.slice(0, member.indexOf("-"))),
      "the member ids R-B206's fold lines name, in their order",
    ).toEqual(foldedMembers(beadRow().notes));
    for (const witness of INVERSION) judgeWitness(witness);
  });

  it("CLAIM WORDS: refusal #1's members, witnesses and quoted claim words anchor the table; its frozen shape and residuals hold", () => {
    const unmet = refusalUnmet(beadRow().notes);
    expect(CLAIM_ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(CLAIM_SHAPE);
    expect(
      CLAIM_ROWS.map(row => row.id),
      "the members refusal #1's UNMET tag lines name, in order",
    ).toEqual(unmetMembers(unmet));
    expect(
      CLAIM_ROWS.flatMap(row => row.pins),
      "every witness pinned once, in table order",
    ).toEqual(WITNESSES.map(witness => witness.id));
    for (const row of CLAIM_ROWS) for (const id of row.pins) expect(witnessOf(id).member, `${id} is a ${row.id} witness`).toBe(row.id);
    const gate = WITNESSES.filter(witness => GATE_WITNESS.test(witness.id));
    expect(
      gate.map(witness => witness.id),
      "the witnesses refusal #1's UNMET block names, in order",
    ).toEqual(unmetWitnesses(unmet));
    for (const witness of gate) {
      if (witness.described === undefined) {
        expect(witness.plant, `${witness.id} as refusal #1 quotes it`).toBe(quotedPlant(unmet, witness.id));
        continue;
      }
      expect(quotedPlant(unmet, witness.id), `${witness.id} is described, not quoted`).toBeUndefined();
      expect(unmet.includes(`${witness.id} (${witness.described})`), `${witness.id} as refusal #1 describes it`).toBe(true);
    }
    expect(witnessOf("W-GA12").plant, "W-GA12: W-GA5's possessive spelled with U+2019").toBe(quotedPlant(unmet, "W-GA5")?.replace("&#146;", cp(0x2019)));
    expect([witnessOf("W-GA15").placement, witnessOf("W-GA15").plant], "W-GA15: the real paragraph re-homed as a list item").toEqual(["rehome", "- "]);
    const sources = claimSources();
    for (const row of CLAIM_ROWS) {
      for (const claim of row.claims) {
        expect(unmet.includes(`'${claim}'`), `${row.id} quotes refusal #1: '${claim}'`).toBe(true);
        expect(claimPattern(claim).test(sources), `${row.id}'s claim words are still carried: '${claim}'`).toBe(true);
      }
    }
    expect(CONTROLS, "the \\p{Cc} code points but the four structural whitespace ones").toHaveLength(61);
    const plane = Array.from({ length: 0x10000 }, (_unused, code) => code);
    expect(BIDI_CONTROLS, "the engine's own \\p{Bidi_Control} table").toEqual(plane.filter(code => /\p{Bidi_Control}/u.test(cp(code))));
    const whitespace = plane.filter(code => /\s/.test(cp(code)));
    expect(
      whitespace.filter(code => /[\p{Cf}\p{Default_Ignorable_Code_Point}]/u.test(cp(code))).map(label),
      "R2's family: the format or default-ignorable code points JavaScript whitespace includes",
    ).toEqual(["U+FEFF"]);
    expect(
      whitespace.filter(code => CONTROLS.includes(code)).map(label),
      "R3's family: the refused controls JavaScript whitespace includes",
    ).toEqual(["U+000B"]);
    expect(
      whitespace.filter(code => BIDI_CONTROLS.includes(code)),
      "no bidi control is JavaScript whitespace",
    ).toEqual([]);
    const header = readFileSync(fileURLToPath(import.meta.url), "utf8");
    for (const residual of RESIDUALS) {
      expect(header.includes(`- ${residual.id} ${residual.family}:`), `${residual.id} named in this header`).toBe(true);
      expect(sources.includes(`RESIDUAL ${residual.id} ${residual.family}`), `${residual.id} stated beside the claim it narrows`).toBe(true);
      for (const id of residual.quiet) expect([witnessOf(id).member, witnessOf(id).stated], `${id}: a quiet row of ${residual.member}`).toEqual([residual.member, true]);
    }
    expect(
      RESIDUALS.flatMap(residual => residual.quiet),
      "every S-R pin is a named residual's quiet row",
    ).toEqual(WITNESSES.filter(witness => witness.id.startsWith("S-R")).map(witness => witness.id));
  });

  it("ROSTER: every judged row and pin of the three tables and the residuals matches the out-of-file roster", () => {
    const roster: unknown = JSON.parse(readFileSync(join(REPO, ROSTER), "utf8"));
    if (typeof roster !== "object" || roster === null || !("comment" in roster)) throw new Error(`${ROSTER} holds no roster`);
    expect(Object.fromEntries(Object.entries(roster).filter(([key]) => key !== "comment"))).toEqual(liveRoster());
  });

  for (const row of CLAIM_ROWS) {
    it(`${row.id}: refusal #1's claim words for this member are pinned by plants its mutant reads differently`, () => {
      for (const id of row.pins) judgeWitness(witnessOf(id));
    });
  }

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
