/**
 * wb-pyel.4 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R7, program-triage-2026-10-18), the until-then leg: the EDC shipped-claim census.
 * Statement (bead title): "Pi-subagents shall not adopt any EDC charter component API while the charter status is 'DESIGN, not a
 * new shipping component API', and no Pi claim surface shall describe EDC integration as shipped meanwhile; adoption requires the
 * named artifact: two clear independent use cases plus Forge-local and clean-installed-consumer acceptance
 * (docs/programs/evidence-directed-computation-2026-10-18.md:29@44b72145b175)."
 * Acceptance (owner filing, verbatim): "any adoption PR cites the two-use-case + acceptance artifact in TRACEABILITY; until then a
 * docs/TRACEABILITY census (wb-64x withdrawn-claim-census shape) finds no EDC-shipped claim anywhere in docs/workbench or
 * descriptors."
 * DELIVERED HERE: that until-then census, plus the title's adoption clause read where an adoption would have to show (the package
 * manifests and every src module). NOT DELIVERED: the adoption PR's TRACEABILITY citation - no adoption exists, and the charter
 * still reads "Status: DESIGN, not a new shipping component API" (ReactiveComponentsSDK docs/programs/
 * evidence-directed-computation-2026-10-18.md:3, at the pin 44b72145b175 and at origin/master 04e6146, read-only, 2026-10-26).
 * An adoption cut ends the until-then: it reds this census by design (its docs and descriptors name EDC) and re-measures it.
 *
 * MEASURED (read-only, by the cutting seat ws-04, run g10-work-s109, 2026-10-26, on trunk dc72a6d): no tracked file outside
 * .beads/ and test/ spells either stem (git grep over both spellings; its one hit, media/demo.mp4, is video bytes): 0 of the 76
 * claim pages, 0 of the 116 src modules, 0 of the 8 registered descriptors, 0 of package.json and the 372 package-lock.json
 * packages. RE-MEASURED at the wb-kv0y cut (seat ws-04, run g10-work-s141, 2026-10-29, on trunk 57cb1c0): 81 tracked claim pages, each
 * judged by both of B2's readings, and 117 tracked src modules (all .ts, so none of a JSX script kind), each judged by both of A2's,
 * with no mention.
 *
 * THE VOCABULARY: both stems are derived from the title's charter path (docs/programs/<slug>-<date>.md, slug
 * evidence-directed-computation): its INITIALS, the acronym the title spells (edc, read as a whole word or its plural "edcs"),
 * and its MODIFIER, the slug's words before the head noun joined (evidencedirected, read anywhere in the joined fold). Both folds
 * start from NFKC with format controls and combining marks removed (a zero-width space never splits a stem; full-width letters
 * fold). The WORD fold splits camel boundaries (EdcAssembler, parseEDC, EDCs) and every run outside a-z and 0-9; the JOINED fold
 * removes every character outside a-z and 0-9 (evidence-directed, evidence_directed, "evidence directed", EvidenceDirected,
 * a soft break between the words). OVER-READ (disclosed, the strict direction): every mention is read as a claim - a page that
 * says EDC is NOT shipped reds this census too, by design (the freeze-and-flip tripwire: re-measure, then judge the sentence);
 * the joined fold can join the modifier across punctuation; a camel-split identifier can produce the acronym by accident.
 *
 * THE READINGS (the wb-64x shape: the rendered model, never a raw-line scan):
 *  - CLAIM PAGES: every markdown page below docs/ (MARKDOWN_PAGE: a file name ending .md or .markdown, in any case - the landed
 *    wb-p46r form; so docs/workbench, its receipts and TRACEABILITY.md) plus README.md and CHANGELOG.md. The walk reads regular
 *    files only: every symlink below docs/ is recorded, never followed, and B1 holds that record empty. Each page is lexed once
 *    (marked 18.0.11, GFM) and every claim block is judged on its own: a heading, a paragraph, a text
 *    block, every table header and body cell, every list item at any depth, every blockquote paragraph, every code block, and
 *    every raw HTML block (its complete comments and tags removed). Inline text composes emphasis, strikethrough, code
 *    spans, escapes, numeric and common named character references and link TEXT, an inline tag or comment reading as a word
 *    break; link destinations and titles, images, link reference definitions, HTML attributes and complete comments are not
 *    claim text (the wb-64x reading).
 *  - DESCRIPTORS: every capability descriptor the native registration and the four injected-client registrations register,
 *    read whole - every key and every string at any depth (id, version, description, effectClass, permissions,
 *    supportedModes, contractSource, both schemas).
 *  - ADOPTION: package.json read whole (every key and string, parsed, and its raw text, so a shadowed duplicate key is read too)
 *    and package-lock.json's installed package paths and names (never its integrity hashes); every script module below src
 *    (.ts .mts .cts .tsx .js .mjs .cjs .jsx; 116 .ts modules at the cut) through its TypeScript AST: identifiers, private
 *    names, string, template and regular-expression literal texts (so every import, export and dynamic-import specifier) and
 *    JSX text, never a comment.
 *  - THE TRACKED LISTING (wb-0st4, restated by wb-kv0y): git's index (git ls-files -z) is the walks' independent anchor. The
 *    claim-page walk equals git's tracked claim pages, both ways (B1). The pages B2 judges and the src modules A2 judges each equal
 *    git's tracked paths of the same scope, both ways, and a reading records a file only through its judgment's own output
 *    (judgePage and judgeModule return the file, its count and its mentions from one parse), so a reading that leaves a file of its
 *    scope out of the judgment reds without waiting for a floor, as does an untracked page or module the walk would read. git's
 *    listing binds which files are judged, not what in them is judged: that is THE PLANTED READING's.
 *  - THE PLANTED READING (wb-kv0y): A2 and B2 each read their scope twice through one reading function (modulesReading,
 *    pagesReading), over the files' own texts and over each file's own text wrapped between the parts of a plant (PLANTED_MODULE,
 *    PLANTED_PAGE): a first part made of the reader's own controls (every SOURCE_CONTROLS module but the JSX one, whose JSX parses in
 *    the JSX script kinds only; every PAGE_CONTROLS page, each closed by a thematic break so no list, table or quote runs on) and a last
 *    part naming the modifier once. The plant's own reading is the planted reading of an empty text: each witness pins it with its
 *    count, and it must be exactly the controls' and the last part's own readings, in order (asControls). Every file of the scope
 *    must read, wrapped, exactly its own mentions plus the plant's (unjudged empty; compared as sorted kind-and-stem lists) and
 *    exactly its own count plus the plant's (unwrapped empty; the count is the judged texts or claim blocks, so the plant wraps a
 *    file's text and never stands in for it).
 *
 * The census pins two rows and the residuals' quiet rows:
 *  A, the adoption clause: A1 the manifests, A2 the src modules (both with their walk floors; the modules A2 judges also equal
 *    git's tracked script modules below src, both ways, and its planted reading judges each of them), A3 the manifest and source
 *    readers' own controls, each read exactly as pinned.
 *  B, the claim-surface clause, judged where the acceptance names it: B1 the claim-page set (the required pages present, the
 *    walk above its floor, nothing outside the scope, the walk equal to git's tracked claim pages both ways, no symlink below
 *    docs/, and the walk's own control WALK_CONTROL, walked through docsWalk itself, read exactly as pinned), B2 every claim page
 *    (surface docs/workbench; the pages judged equal to git's tracked claim pages both ways, and its planted reading judges each
 *    of them), B3 TRACEABILITY.md read on its own (surface TRACEABILITY, the census the acceptance names), B4 every registered
 *    descriptor (surface descriptors; each leg carries its fingerprint, its
 *    descriptors' ids and descriptions, so a leg read from the other registration reds), B5 the page and descriptor readers' own
 *    controls. B2-B4 also hold their reading floors, so a reader that reads nothing reds.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * ENUMERATION (wb-kv0y; hop 3 of the wb-pyel.4 chain - landing 546, then wb-0st4 at landing 612, then this carry - in R739's
 * terminal enumerate-the-resolvable form, the chain capped here). For the class the landing-612 gate's F1 names - a reading that
 * records a file as read apart from its stem judgment, so a reader judging only part of what it reads keeps every witness
 * unchanged - the census claims exactly these members, each red on today's stem-free tree for every selection that takes at least
 * one file of the scope, and nothing beyond them:
 *  K1 the module or page reading judges only part of its scope while still recording or counting every file (the named L2-SCAN-A2
 *     and L2-SCAN-B2): no file is recorded apart from its judgment (THE TRACKED LISTING), and THE PLANTED READING reds the skip;
 *  K2 the reading judges every file but drops the mentions of part of its scope;
 *  K3 the reading skips, for part of its scope, a form one of its controls carries a stem in (a SOURCE_CONTROLS module but the JSX
 *     one, a PAGE_CONTROLS page);
 *  K4 the reading skips the judgment of a file selected by its size, its content or its place in the scope's list, or judges a
 *     file only up to before its end or only from after its start.
 *  K1-K4 red A2 (the src modules) or B2 (the claim pages, TRACEABILITY.md among them; B3 reads it through the same function).
 * For the class the gate's F3 names - the walk's control bound to a function the real walk does not run through - it claims
 * exactly K5: docsWalk replaced by a walk that ignores its injected directory reader (the named L2-REALWALK, with its untracked
 * forms L2-REALWALK+G16 and +G27) reds B1, because WALK_CONTROL is walked through docsWalk itself. F2's sentence is THE TRACKED
 * LISTING's, restated above to the bound it measures. An escape found outside K1-K5 is a residual-list addition for the owner,
 * not a claim this census makes; NOT CLAIMED bounds the rest.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's witness, the constants, the controls, the plants, the residual families and every registered test title - is held to
 * the out-of-file roster (test/fixtures/edc-shipped-claim-roster.json). The labels of rows A and B are held both ways to the two
 * clauses of the bead's own title in the tracker export (.beads/issues.jsonl), the stems to the title's charter path, and the
 * surfaces of B2-B4 both ways to the acceptance's until-then sentence (the first one in the bead's notes, so later notes on the
 * bead do not move it). The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran
 * before it) and the pins that reached their witness.
 * NOT CLAIMED (edits of this file and the roster together below row level): a pin removed from ROWS, the literal, IMPL and the
 * roster where no surface of the acceptance anchors it (A1-A3, B1, B5, Q1-Q6, the last with its RESIDUALS entry); a control
 * removed from its list and the roster; a pin's case replaced by one that echoes its roster witness; git's listing replaced by the
 * walk it anchors, in this file, together with a narrowing of that walk (trackedPaths is the only reader of git's index). And, each
 * measured at the wb-kv0y cut: a reading function or docsWalk that branches on its injected reader, or a judgment that keys on the
 * plant's own text, so the planted or the synthetic-tree run takes another path than the real one; a judgment that skips some of a
 * file's own texts or blocks selected by their content or by their place strictly inside the file's own text (the plant stands in
 * for each control form and for a file's two ends, not for every text the file holds); a judged form no control carries a stem in
 * (a template middle or tail, a no-substitution template literal, an escape, a named character reference), skipped for part or
 * all of the scope, and JSX text, which no tracked src module holds at the cut; a case that drops part of its reading's mentions
 * after the reading returns them (the partial form of a case that echoes its witness; a dropped record reds through git's
 * listing); and the entry readers outside the two file loops - A1's manifest and lock readers, B4's descriptor reader - judging
 * only part of the entries or fields they count (they hold floors and fingerprints, not a judged record, and no plant wraps them:
 * A3 and B5 read them on their own synthetic controls only).
 * RESIDUALS (named, each with its pinned quiet row): R-VOCABULARY EDC described in other words (context assembly charter,
 * evidence-driven, demand-directed, E.D.C., evidence directing, QueryView judgments) names no stem (Q1); R-LOOKALIKE a stem
 * written with a look-alike letter of another script (Cyrillic ie, es) is not matched (Q2; each probe, repaired, names its stem);
 * R-NON-CLAIM text the readings do not count as a claim - a docs link destination or title, an image, a link reference
 * definition, a complete HTML comment, an HTML attribute, a src comment (Q3); R-COMPOSED a src string composed at run time from
 * parts that each name no stem is not read by the source scan, while the descriptor readers do read it once it is registered
 * (Q4); R-SCOPE markdown outside the claim pages (AGENTS.md, CONTRIBUTING.md, SECURITY.md, examples/, new-feedback/, .pi/,
 * .agents/, vendor/), files under docs/ whose name is no MARKDOWN_PAGE (OUT_OF_SCOPE_DOCS), and modules outside src (an
 * operator's local provider module, the vendored SDK dists) are not read (Q5); R-UNNAMED-ADOPTION an adoption spelled without
 * either stem (a context-block import, a QueryView input) is not read here (Q6) - whether Pi loads the ReactiveComponents
 * distribution at all is pinned by test/workbench-rc-remote-component-stream-census.test.ts.
 * SCOPE: a mention is judged, not the sentence's truth; the charter's own status is read by the cutting seat, never by this file
 * (it lives in another repository).
 *
 * Display paths added: none. Test-only: no scratch is allocated; docs, src, the manifests, .beads and git's index are only read.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Lexer, type Token, type Tokens } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type ForgeReadClient, registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { type FurnaceReadClient, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "edc-shipped-claim-roster.json");
const BEAD = "wb-pyel.4";
/** The stems and how each is read: the charter slug's initials as a word, its modifier in the joined fold. */
const STEMS: Readonly<Record<string, "word" | "joined">> = { edc: "word", evidencedirected: "joined" };
/** The top-level claim pages outside docs/. */
const TOP_PAGES = ["README.md", "CHANGELOG.md"] as const;
/** A claim page's file name below docs/: it ends .md or .markdown, in any case (the landed wb-p46r MARKDOWN_PAGE form). */
const MARKDOWN_PAGE = /\.(?:md|markdown)$/i;
/** The claim pages that must be present (a floor, never the exact set: receipts land every day). */
const REQUIRED_PAGES = [
  "CHANGELOG.md",
  "README.md",
  "docs/rpc.md",
  "docs/workbench/00-current-state-and-source-map.md",
  "docs/workbench/01-product-vision-and-user-journeys.md",
  "docs/workbench/02-atomic-requirements.md",
  "docs/workbench/03-architecture-and-ownership.md",
  "docs/workbench/04-claude-agent-sdk-executor.md",
  "docs/workbench/05-script-language-and-runtime.md",
  "docs/workbench/06-capability-registry.md",
  "docs/workbench/07-native-integrations.md",
  "docs/workbench/08-lifecycle-and-recovery.md",
  "docs/workbench/09-observation-and-provenance.md",
  "docs/workbench/10-terminal-inspector.md",
  "docs/workbench/11-designer-and-operator.md",
  "docs/workbench/12-security.md",
  "docs/workbench/13-contracts-and-config.md",
  "docs/workbench/14-qa-and-benchmarks.md",
  "docs/workbench/15-implementation-program.md",
  "docs/workbench/16-repository-refactor.md",
  "docs/workbench/17-packaging-and-operations.md",
  "docs/workbench/18-decisions-and-risks.md",
  "docs/workbench/19-worked-examples.md",
  "docs/workbench/20-evidence-loader-contract.md",
  "docs/workbench/IMPLEMENTATION_GUIDE.md",
  "docs/workbench/README.md",
  "docs/workbench/TRACEABILITY.md",
  "docs/workbench/feature-matrix.md",
  "docs/workflows.md",
] as const;
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
/** Walk and reading floors, each well below the cut-time measure (pages 76, blocks 7081, words 209208, modules 116, texts 100234,
 * packages 372, package.json keys and strings 120). */
const FLOORS = { pages: 60, blocks: 4000, words: 150000, modules: 100, texts: 60000, packages: 300, manifestTexts: 80 } as const;
/** The descriptor ids that must be registered (the native and the injected-client registrations each register these four). */
const REQUIRED_DESCRIPTORS = ["forge.gate.status", "furnace.run.inspect", "hyperunix.find", "reactivefiber.render.preview"] as const;
/** The acceptance's surfaces and the pin that judges each one. */
const SURFACES: Readonly<Record<string, string>> = { "docs/workbench": "B2", TRACEABILITY: "B3", descriptors: "B4" };

const ZWSP = String.fromCodePoint(0x200b);
const FULL_WIDTH_EDC = String.fromCodePoint(0xff25, 0xff24, 0xff23);
const CYRILLIC_IE = String.fromCodePoint(0x0435);
const CYRILLIC_ES = String.fromCodePoint(0x0421);

/** Synthetic pages the page reader must read exactly as pinned: every claim block kind, each carrying a stem once. */
const PAGE_CONTROLS: Readonly<Record<string, string>> = {
  heading: "# EDC adoption\n",
  paragraph: "Evidence-directed context assembly ships today.\n",
  "table-header": "| EDC | Status |\n| --- | --- |\n| assembly | shipped |\n",
  "table-cell": "| Feature | Status |\n| --- | --- |\n| EDC integration | shipped |\n",
  "list-item": "- EDC integration is supported\n",
  "nested-list": "- outer item\n  - evidence directed assembly\n",
  "loose-list": "- first\n\n- EDCs are wired\n",
  blockquote: "> The EDC path is available.\n",
  "fenced-code": "```ts\nimport { assemble } from './edc';\n```\n",
  codespan: "The `EvidenceDirected` reader ships.\n",
  "link-text": "[EDC integration](https://example.invalid/a)\n",
  "emphasis-split": "**Evidence**-*directed* assembly ships.\n",
  strikethrough: "~~EDC~~ shipped.\n",
  "numeric-reference": "E&#68;C integration ships.\n",
  "soft-break": "The evidence-\ndirected assembly ships.\n",
  "zero-width": `E${ZWSP}DC integration ships.\n`,
  "full-width": `${FULL_WIDTH_EDC} integration ships.\n`,
  camel: "The EdcAssembler ships.\n",
  "html-block": "<details>\n<summary>EDC integration</summary>\n</details>\n",
  "cross-word": "The named capability is used carefully.\n",
  "inside-word": "Reedcraft and credcheck ship.\n",
  "inline-tag": "| Feature | Status |\n| --- | --- |\n| EDC<br>shipped | yes |\n",
};
/** The page walk's own control: a synthetic tree below docs/, one entry per name of a directory (a trailing "/" a directory, a
 * trailing "@" a symlink), holding a page of every MARKDOWN_PAGE spelling, pages one and two directories down, a symlink named
 * like a page, a directory named like a page and files that are no pages. The walk must read exactly the pinned pages and
 * symlinks, so a walk that selects pages by another name test, skips a depth, follows or drops a symlink, or reads a directory as
 * a page reds. */
const WALK_CONTROL: Readonly<Record<string, readonly string[]>> = {
  docs: ["a.md", "b.markdown", "c.MD", "d.Markdown", "e.txt", "f.mdx", "g.md.bak", "link.md@", "nested/", "pages.md/"],
  "docs/nested": ["h.md", "i.json", "deeper/"],
  "docs/nested/deeper": ["j.MARKDOWN"],
  "docs/pages.md": ["k.md"],
};
/** Descriptor fields the descriptor reader must read: one planted descriptor with a stem in each field kind. */
const PLANTED_DESCRIPTOR: CapabilityDescriptor = {
  id: "planted.edc.read",
  version: "1.0.0",
  description: "Read one evidence-directed context block",
  inputSchema: { type: "object", properties: { edcBlock: { type: "string", description: "The EDC block id" } }, additionalProperties: false },
  effectClass: "read",
  permissions: ["planted:edc"],
  supportedModes: ["invoke"],
  contractSource: "evidence-directed@0.0.0",
};
/** Synthetic manifests the manifest reader must read exactly as pinned. */
const MANIFEST_CONTROLS: Readonly<Record<string, JsonObject>> = {
  dependency: { name: "x", dependencies: { "@example/edc": "1.0.0" } },
  description: { name: "x", description: "Evidence-directed context assembly" },
  "dev-dependency": { name: "x", devDependencies: { "evidence-directed-sdk": "1.0.0" } },
  clean: { name: "x", description: "A workflow workbench", dependencies: { "@example/blocks": "1.0.0" } },
};
const LOCK_CONTROLS: Readonly<Record<string, JsonObject>> = {
  "package-path": { packages: { "": { name: "x" }, "node_modules/edc-assembler": { version: "1.0.0" } } },
  "package-name": { packages: { "": { name: "x" }, "node_modules/alias": { name: "evidence_directed" } } },
  clean: { packages: { "": { name: "x" }, "node_modules/blocks": { version: "1.0.0" } } },
};
/** Synthetic modules the source reader must read exactly as pinned (each a module body; none is compiled or run). */
const SOURCE_CONTROLS: Readonly<Record<string, string>> = {
  identifier: "const EdcAssembler = 1;",
  string: `const label = "evidence-directed context";`,
  template: `const label = \`EDC \${name} ships\`;`,
  "import-specifier": `import { assemble } from "@example/edc";`,
  "dynamic-import": `await import("evidence_directed");`,
  regex: "const pattern = /EDC/;",
  "private-name": "class Host { #edcBlock = 1; }",
  "cross-word": "const namedCount = 1; usedCarefully(namedCount);",
  "jsx.tsx": "export const view = <span>EDC integration</span>;",
};
/** THE PLANTED READING's plants (wb-kv0y): each wraps a file's own text as `${first}${gap}${text}${gap}${last}`. The first part is
 * the reader's own controls and the last part names the modifier once. */
interface Plant {
  readonly first: string;
  readonly gap: string;
  readonly last: string;
}
/** The source controls a planted module carries: every SOURCE_CONTROLS module but the JSX one, which parses as no other script kind. */
const PLANT_SOURCE_CONTROLS: readonly (readonly [string, string])[] = Object.entries(SOURCE_CONTROLS).filter(([name]) => name !== "jsx.tsx");
const PLANTED_MODULE: Plant = {
  first: PLANT_SOURCE_CONTROLS.map(([, body]) => body).join("\n"),
  gap: "\n",
  last: "const evidenceDirectedPlant = 1;",
};
/** A planted page: every PAGE_CONTROLS page, each closed by a thematic break so no list, table or quote runs on into the next. */
const PLANTED_PAGE: Plant = { first: Object.values(PAGE_CONTROLS).join("\n---\n\n"), gap: "\n\n---\n\n", last: "# Evidence-directed plant\n" };
/** R-VOCABULARY's members: EDC in other words. */
const VOCABULARY_CONTROLS: readonly string[] = [
  "context assembly charter",
  "evidence-driven assembly",
  "demand-directed context",
  "E.D.C. integration",
  "evidence directing assembly",
  "QueryView judgments as context inputs",
];
/** R-LOOKALIKE's probes: one stem each, one letter replaced by its look-alike from another script, and the Latin letter. */
const LOOKALIKE_PROBES: readonly { readonly text: string; readonly lookalike: string; readonly latin: string }[] = [
  { text: `${CYRILLIC_IE}vidence-directed assembly`, lookalike: CYRILLIC_IE, latin: "e" },
  { text: `ED${CYRILLIC_ES} integration`, lookalike: CYRILLIC_ES, latin: "C" },
];
/** R-NON-CLAIM's probes: a stem only where the readings count no claim text. */
const NON_CLAIM_PAGES: Readonly<Record<string, string>> = {
  destination: "[context](https://example.invalid/evidence-directed-computation)\n",
  "link-title": '[context](https://example.invalid/a "EDC integration")\n',
  image: "![EDC](https://example.invalid/edc.png)\n",
  definition: "[ref]: https://example.invalid/edc\n",
  comment: "<!-- see the charter -> EDC integration ships -->\n",
  attribute: '<div title="EDC integration">context</div>\n',
};
const NON_CLAIM_SOURCE = "// EDC integration ships\n/* evidence-directed */\nconst value = 1;";
/** R-COMPOSED's probes: a string composed from parts that each name no stem, in a module and in a registered descriptor. */
const COMPOSED_SOURCE = `const label = "evidence-" + "directed";`;
const COMPOSED_PART = "evidence-";
/** R-SCOPE's probes: paths outside the claim pages and outside src. */
const OUT_OF_SCOPE_PAGES: readonly string[] = [
  "AGENTS.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "examples/agent-tool-description.md",
  "new-feedback/README.md",
  ".pi/agents/auditor.md",
  ".agents/skills/beads/SKILL.md",
  "vendor/README.md",
];
/** R-SCOPE's names below docs/ that are no markdown page (MARKDOWN_PAGE selects none of them). */
const OUT_OF_SCOPE_DOCS: readonly string[] = ["docs/workbench/plant.txt", "docs/workbench/plant.mdx", "docs/workbench/plant.md.bak", "docs/plant.html"];
/** R-UNNAMED-ADOPTION's probe: a context-assembly adoption that names neither stem. */
const UNNAMED_ADOPTION = `import { renderBlock } from "@example/context-blocks";
export const block = renderBlock({ queryView: { failures: 0, seal: null }, coverageProofRef: "ref" });`;
/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-VOCABULARY": ["Q1"],
  "R-LOOKALIKE": ["Q2"],
  "R-NON-CLAIM": ["Q3"],
  "R-COMPOSED": ["Q4"],
  "R-SCOPE": ["Q5"],
  "R-UNNAMED-ADOPTION": ["Q6"],
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A and B, to the bead title's two clauses. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "Pi-subagents shall not adopt any EDC charter component API while the charter status is 'DESIGN, not a new shipping component API'",
    pins: ["A1", "A2", "A3"],
  },
  { id: "B", label: "no Pi claim surface shall describe EDC integration as shipped meanwhile", pins: ["B1", "B2", "B3", "B4", "B5"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"] },
];

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly constants: JsonObject;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return [...value];
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || raw.bead !== BEAD || !isObject(raw.constants) || !Array.isArray(raw.rows)) {
    throw new Error(`roster must be an object for ${BEAD} with constants and rows`);
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      }
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return { constants: json(raw.constants) as JsonObject, tests: strings(raw.tests, "roster tests"), rows };
}

const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

// ---- the vocabulary ----

/** NFKC with format controls and combining marks removed. */
function normal(text: string): string {
  return text.normalize("NFKC").replace(/[\p{Cf}\p{Mn}\p{Me}]/gu, "");
}
/** The word fold: an acronym's plural s and camel boundaries split, lower-cased, split at every run outside a-z and 0-9. */
function wordsOf(text: string): string[] {
  return normal(text)
    .replace(/([A-Z]{2,})s(?![a-z])/g, "$1 s")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word !== "");
}
/** The joined fold: lower-cased with every character outside a-z and 0-9 removed. */
function joinedOf(text: string): string {
  return normal(text)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}
/** The stems a text names, in STEMS order: a word stem as a whole word or its plural, a joined stem anywhere. */
function stemsIn(text: string): string[] {
  const words = new Set(wordsOf(text));
  const joined = joinedOf(text);
  return Object.entries(STEMS)
    .filter(([stem, kind]) => (kind === "word" ? words.has(stem) || words.has(`${stem}s`) : joined.includes(stem)))
    .map(([stem]) => stem);
}
function wordCount(text: string): number {
  return wordsOf(text).length;
}

// ---- the claim pages ----

const REFERENCES: Readonly<Record<string, string>> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
/** Numeric and the common named character references decoded; an unknown name stays as written. */
function decode(text: string): string {
  return text.replace(/&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g, (whole: string, decimal?: string, hex?: string, name?: string) => {
    const point = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    if (point === undefined) return REFERENCES[name ?? ""] ?? whole;
    return point <= 0x10ffff ? String.fromCodePoint(point) : whole;
  });
}
/** A raw HTML block's visible text: complete comments and tags removed (each a word break), references decoded. */
function htmlText(raw: string): string {
  return decode(raw.replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]*>/g, " "));
}
function childTokens(token: Token): readonly Token[] | undefined {
  return "tokens" in token && Array.isArray(token.tokens) ? token.tokens : undefined;
}
/** Inline tokens as visible text: link TEXT, emphasis, strikethrough, code spans, escapes; an image reads none, and an inline tag
 * or comment reads as a word break (so `EDC<br>shipped` keeps its words apart). */
function inlineText(tokens: readonly Token[]): string {
  let text = "";
  for (const token of tokens) {
    const children = childTokens(token);
    if (token.type === "image") continue;
    if (token.type === "br" || token.type === "html") text += " ";
    else if (token.type === "codespan" || token.type === "escape") text += String(token.text);
    else if (children !== undefined && children.length > 0) text += inlineText(children);
    else if ("text" in token && typeof token.text === "string") text += decode(token.text);
  }
  return text;
}
interface Block {
  readonly kind: string;
  readonly text: string;
}
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
const isList = (token: Token): token is Tokens.List => token.type === "list";
/** Every claim block of one page, in document order. */
function blocksOf(page: string): Block[] {
  const blocks: Block[] = [];
  const visit = (token: Token): void => {
    const children = childTokens(token);
    if (token.type === "heading" || token.type === "paragraph" || token.type === "text") {
      blocks.push({ kind: token.type, text: children !== undefined ? inlineText(children) : decode(String(token.text)) });
    } else if (isTable(token)) {
      for (const cell of token.header) blocks.push({ kind: "header-cell", text: inlineText(cell.tokens) });
      for (const cell of token.rows.flat()) blocks.push({ kind: "cell", text: inlineText(cell.tokens) });
    } else if (isList(token)) {
      for (const item of token.items) for (const child of item.tokens) visit(child);
    } else if (token.type === "blockquote" && children !== undefined) {
      for (const child of children) visit(child);
    } else if (token.type === "code") {
      blocks.push({ kind: "code", text: String(token.text) });
    } else if (token.type === "html") {
      blocks.push({ kind: "html", text: htmlText(String(token.raw)) });
    }
  };
  for (const token of new Lexer({ gfm: true }).lex(page)) visit(token);
  return blocks;
}
/** One file judged (wb-kv0y): the file, the count of what its judgment read (a module's judged texts, a page's claim blocks) and its
 * mentions, all from one parse. A reading records a file only through this output. */
interface Judged {
  readonly file: string;
  readonly count: number;
  readonly mentions: readonly string[];
}
/** One page judged, with its words. */
interface JudgedPage extends Judged {
  readonly words: number;
}
/** One page judged: its claim blocks lexed once, each mention `${location}|${kind}#${block index}|${stems}`. */
function judgePage(page: string, location: string): JudgedPage {
  const blocks = blocksOf(page);
  return {
    file: location,
    count: blocks.length,
    words: blocks.reduce((total, block) => total + wordCount(block.text), 0),
    mentions: blocks.flatMap((block, index) => {
      const stems = stemsIn(block.text);
      return stems.length > 0 ? [`${location}|${block.kind}#${index}|${stems.join("+")}`] : [];
    }),
  };
}
/** One page's mentions. */
function pageMentions(page: string, location: string): string[] {
  return [...judgePage(page, location).mentions];
}
function filesBelow(directory: string, extension: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...filesBelow(path, extension));
    else if (entry.isFile() && entry.name.endsWith(extension)) found.push(path);
  }
  return found;
}
function repoPath(path: string): string {
  return relative(REPO, path).split("\\").join("/");
}
/** A path is a claim page when it is a markdown page below docs/ (MARKDOWN_PAGE) or one of the top-level claim pages. */
function inClaimScope(path: string): boolean {
  return (path.startsWith("docs/") && MARKDOWN_PAGE.test(path)) || (TOP_PAGES as readonly string[]).includes(path);
}
/** A directory entry as the page walk reads it: its name and its kind (a symlink is never followed). */
interface WalkEntry {
  readonly name: string;
  isFile(): boolean;
  isDirectory(): boolean;
  isSymbolicLink(): boolean;
}
/** Lists the entries of one directory of a tree. */
type ReadDirectory = (directory: string) => readonly WalkEntry[];
const DISK: ReadDirectory = directory => readdirSync(directory, { withFileTypes: true });
/** WALK_CONTROL's directory reader: each entry's kind from its spelling. */
function treeReader(tree: Readonly<Record<string, readonly string[]>>): ReadDirectory {
  return directory =>
    (tree[directory] ?? []).map(spec => {
      const kind = spec.endsWith("/") ? "directory" : spec.endsWith("@") ? "symlink" : "file";
      const name = kind === "file" ? spec : spec.slice(0, -1);
      return { name, isFile: () => kind === "file", isDirectory: () => kind === "directory", isSymbolicLink: () => kind === "symlink" };
    });
}
/** The page walk below one directory of a tree: every regular file whose name is a MARKDOWN_PAGE, and every symlink (recorded,
 * never followed), each as its path from the tree root, the entries of each directory visited in name order. */
function pageWalk(read: ReadDirectory, root: string, directory: string): { pages: string[]; symlinks: string[] } {
  const pages: string[] = [];
  const symlinks: string[] = [];
  const visit = (at: string): void => {
    const entries = [...read(join(root, at))].sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      const path = `${at}/${entry.name}`;
      if (entry.isSymbolicLink()) symlinks.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && MARKDOWN_PAGE.test(entry.name)) pages.push(path);
    }
  };
  visit(directory);
  return { pages, symlinks };
}
/** The real page walk: the repository's docs/ tree through the injected directory reader. B1 walks WALK_CONTROL through this same
 * entry point (wb-kv0y), so the control binds the walk the claim pages come from. */
function docsWalk(read: ReadDirectory = DISK, root: string = REPO): { pages: string[]; symlinks: string[] } {
  return pageWalk(read, root, "docs");
}
function claimPages(): string[] {
  const top = TOP_PAGES.filter(page => existsSync(join(REPO, page)));
  return [...docsWalk().pages, ...top].sort();
}
/** git's tracked paths (its index, git ls-files -z, never quoted): the independent listing both walks and every read set are held
 * to, both ways. */
function trackedPaths(): string[] {
  return execFileSync("git", ["ls-files", "-z"], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
    .split("\0")
    .filter(path => path !== "");
}
/** git's tracked claim pages. */
function trackedClaimPages(): string[] {
  return trackedPaths()
    .filter(path => inClaimScope(path))
    .sort();
}
/** Reads a file's text by its repository path. */
type ReadText = (path: string) => string;
const DISK_TEXT: ReadText = path => readFileSync(join(REPO, path), "utf8");
/** The page reading (B2, B3): every page of the list judged, in list order; what it records is the judgments' own output. */
function pagesReading(pages: readonly string[], read: ReadText): JudgedPage[] {
  return pages.map(page => judgePage(read(page), page));
}
function controlPages(pages: Readonly<Record<string, string>>): JsonValue {
  return json(Object.fromEntries(Object.entries(pages).map(([name, page]) => [name, pageMentions(page, name)])));
}

// ---- the descriptors ----

/** Every key and string of a value at any depth, each with its path. */
function textsOf(value: unknown, path: string): { path: string; text: string }[] {
  if (typeof value === "string") return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => textsOf(item, `${path}[${index}]`));
  if (isObject(value)) {
    return Object.entries(value).flatMap(([key, child]) => [{ path: `${path}.${key}#key`, text: key }, ...textsOf(child, `${path}.${key}`)]);
  }
  return [];
}
function textMentions(value: unknown, location: string): string[] {
  return textsOf(value, location).flatMap(entry => {
    const stems = stemsIn(entry.text);
    return stems.length > 0 ? [`${entry.path}|${stems.join("+")}`] : [];
  });
}
/** Clients and readers that are never invoked: registration only stores the descriptor. */
const NEVER = (): never => {
  throw new Error("census: a registered capability is never invoked");
};
const FORGE_CLIENT: ForgeReadClient = { gate: { status: async () => NEVER() } };
const FURNACE_CLIENT: FurnaceReadClient = { runs: { get: () => ({ inspect: async () => NEVER() }) } };
const HX_READER: HyperUnixReader = { find: async () => NEVER(), runtime: async () => NEVER(), async close() {} };
const RF_INVOKE: Parameters<typeof registerReactiveFiberRender>[1] = async () => NEVER();

function descriptorsOf(registry: CapabilityRegistry): CapabilityDescriptor[] {
  return registry.catalogSnapshot().map(entry => entry.descriptor);
}
let native: Promise<CapabilityRegistry> | undefined;
/** The registry the native registration fills (loaded once per file). */
function nativeRegistry(): Promise<CapabilityRegistry> {
  native ??= loadWorkbenchNative().then(modules => {
    const registry = new CapabilityRegistry();
    modules.registerNativeProviders(registry, REPO);
    return registry;
  });
  return native;
}
/** The registry the four injected-client registrations fill. */
function injectedRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerForgeGateStatus(registry, FORGE_CLIENT, "0.1.0");
  registerHyperUnixFind(registry, HX_READER, REPO);
  registerFurnaceRunInspect(registry, FURNACE_CLIENT, REPO);
  registerReactiveFiberRender(registry, RF_INVOKE, REPO);
  return registry;
}
function plantedRegistry(descriptor: CapabilityDescriptor): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registry.register({ descriptor, invoke: async () => NEVER() });
  return registry;
}
/** A registry's reading: the required ids missing, the strings read, the mentions, and its fingerprint - each descriptor's id and
 * description, in id order (the native and the injected registrations describe each capability in their own words, so one leg read
 * from the other registration reds). */
function registryReading(registry: CapabilityRegistry): { missing: string[]; texts: number; mentions: string[]; descriptions: string[] } {
  const descriptors = descriptorsOf(registry);
  const ids = new Set(descriptors.map(descriptor => descriptor.id));
  return {
    missing: REQUIRED_DESCRIPTORS.filter(id => !ids.has(id)),
    texts: descriptors.reduce((total, descriptor) => total + textsOf(descriptor, descriptor.id).length, 0),
    mentions: descriptors.flatMap(descriptor => textMentions(descriptor, descriptor.id)),
    descriptions: descriptors.map(descriptor => `${descriptor.id}: ${descriptor.description}`).sort(),
  };
}

// ---- the adoption surfaces ----

/** package-lock.json's installed package paths and their name fields. */
function lockMentions(lock: unknown): { packages: number; mentions: string[] } {
  const packages = isObject(lock) && isObject(lock.packages) ? lock.packages : {};
  const mentions = Object.entries(packages).flatMap(([path, entry]) => {
    const named = isObject(entry) && typeof entry.name === "string" ? [path, entry.name] : [path];
    const stems = [...new Set(named.flatMap(text => stemsIn(text)))];
    return stems.length > 0 ? [`packages[${path}]|${stems.join("+")}`] : [];
  });
  return { packages: Object.keys(packages).length, mentions };
}
/** A node's judged text and its kind: identifiers and private names, string and template literal texts, regular-expression
 * literals as written and JSX text; any other node reads none. */
function judgedText(node: ts.Node): { kind: string; text: string } | undefined {
  if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) return { kind: "identifier", text: node.text };
  if (ts.isStringLiteralLike(node)) return { kind: "string", text: node.text };
  if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) return { kind: "template", text: node.text };
  if (ts.isRegularExpressionLiteral(node)) return { kind: "regex", text: node.text };
  if (ts.isJsxText(node)) return { kind: "jsx", text: node.text };
  return undefined;
}
/** Every script module kind below src, by extension, and the TypeScript script kind each one is parsed as. */
const SCRIPT_KINDS: Readonly<Record<string, ts.ScriptKind>> = {
  ".ts": ts.ScriptKind.TS,
  ".mts": ts.ScriptKind.TS,
  ".cts": ts.ScriptKind.TS,
  ".tsx": ts.ScriptKind.TSX,
  ".js": ts.ScriptKind.JS,
  ".mjs": ts.ScriptKind.JS,
  ".cjs": ts.ScriptKind.JS,
  ".jsx": ts.ScriptKind.JSX,
};
function scriptKind(module: string): ts.ScriptKind {
  return SCRIPT_KINDS[module.slice(module.lastIndexOf("."))] ?? ts.ScriptKind.TS;
}
/** One module's judged texts, in source order, each with its line. */
function sourceTexts(text: string, module: string): { line: number; kind: string; text: string }[] {
  const source = ts.createSourceFile(module, text, ts.ScriptTarget.Latest, true, scriptKind(module));
  const texts: { line: number; kind: string; text: string }[] = [];
  const visit = (node: ts.Node): void => {
    const judged = judgedText(node);
    if (judged !== undefined) texts.push({ line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1, ...judged });
    ts.forEachChild(node, visit);
  };
  visit(source);
  return texts;
}
/** One module judged: its texts parsed once, each mention `${module}:${line}|${kind}|${stems}`. */
function judgeModule(text: string, module: string): Judged {
  const texts = sourceTexts(text, module);
  return {
    file: module,
    count: texts.length,
    mentions: texts.flatMap(entry => {
      const stems = stemsIn(entry.text);
      return stems.length > 0 ? [`${module}:${entry.line}|${entry.kind}|${stems.join("+")}`] : [];
    }),
  };
}
function sourceMentions(text: string, module: string): string[] {
  return [...judgeModule(text, module).mentions];
}
function srcModules(): string[] {
  return Object.keys(SCRIPT_KINDS)
    .flatMap(extension => filesBelow(join(REPO, "src"), extension))
    .map(repoPath)
    .sort();
}
/** git's tracked script modules below src. */
function trackedModules(): string[] {
  return trackedPaths()
    .filter(path => path.startsWith("src/") && Object.keys(SCRIPT_KINDS).some(extension => path.endsWith(extension)))
    .sort();
}
/** The module reading (A2): every module of the list judged, in list order; what it records is the judgments' own output. */
function modulesReading(modules: readonly string[], read: ReadText): Judged[] {
  return modules.map(module => judgeModule(read(module), module));
}
function readJson(path: string): unknown {
  return JSON.parse(readFileSync(join(REPO, path), "utf8"));
}

// ---- the planted reading ----

/** A text wrapped between a plant's parts. */
function plantText(plant: Plant, text: string): string {
  return [plant.first, text, plant.last].join(plant.gap);
}
/** A text reader that reads each file as its own text wrapped between a plant's parts. */
function plantedReader(read: ReadText, plant: Plant): ReadText {
  return path => plantText(plant, read(path));
}
/** Each mention's kind and stems, its location and position removed: `${kind}|${stems}`. */
function shapes(mentions: readonly string[]): string[] {
  return mentions.map(mention => {
    const [, kind = "", stems = ""] = mention.split("|");
    return `${kind.split("#")[0] ?? ""}|${stems}`;
  });
}
/** THE PLANTED READING's verdict over one scope: the plant's own reading (the planted reading of an empty text) and its count,
 * whether that reading is exactly the controls' and the last part's own readings in order, and the files of the scope whose planted
 * reading is not exactly their own reading plus the plant's - in mentions (unjudged; sorted kind-and-stem lists) or in count
 * (unwrapped). */
function plantedVerdict(files: readonly string[], own: readonly Judged[], planted: readonly Judged[], plant: Judged, controls: readonly string[]): JsonValue {
  const ownOf = new Map(own.map((entry): [string, Judged] => [entry.file, entry]));
  const plantedOf = new Map(planted.map((entry): [string, Judged] => [entry.file, entry]));
  const sorted = (list: readonly string[]): string => JSON.stringify([...list].sort());
  const plantShapes = shapes(plant.mentions);
  return json({
    plant: plantShapes,
    count: plant.count,
    asControls: JSON.stringify(plantShapes) === JSON.stringify(controls),
    unjudged: files.filter(file => {
      const mine = ownOf.get(file);
      const read = plantedOf.get(file);
      return mine === undefined || read === undefined || sorted(shapes(read.mentions)) !== sorted([...plantShapes, ...shapes(mine.mentions)]);
    }),
    unwrapped: files.filter(file => {
      const mine = ownOf.get(file);
      const read = plantedOf.get(file);
      return mine === undefined || read === undefined || read.count !== mine.count + plant.count;
    }),
  });
}

// ---- the bead's own text ----

function exportRow(): { title: string; notes: string } {
  for (const line of readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  return { title: "", notes: "" };
}
/** The title's clauses: the statement after its requirement tag, up to its first semicolon, split at its one ", and ". */
function titleClauses(title: string): string[] {
  const statement = title.replace(/^\[[^\]]+\] /, "");
  const end = statement.indexOf(";");
  return end === -1 ? [] : statement.slice(0, end).split(", and ");
}
/** The stems the title's charter path derives: the slug's initials, and the slug's words before its head noun, joined. */
function charterStems(title: string): string[] {
  const slug = /docs\/programs\/([a-z]+(?:-[a-z]+)+)-\d{4}-\d{2}-\d{2}\.md/.exec(title)?.[1];
  if (slug === undefined) return [];
  const words = slug.split("-");
  return [words.map(word => word[0] ?? "").join(""), words.slice(0, -1).join("")];
}
interface UntilThen {
  readonly census: string;
  readonly claim: string;
  readonly surfaces: readonly string[];
}
/** The acceptance's until-then sentence (the first in the notes): the census it names, the claim class and the surfaces. */
function untilThen(notes: string): UntilThen | undefined {
  const match = /until then a (\S+) census \([^)]*\) finds no (\S+) claim anywhere in ([^.]+)\./.exec(notes);
  if (match === null) return undefined;
  return { census: match[1] ?? "", claim: match[2] ?? "", surfaces: (match[3] ?? "").split(" or ") };
}

// ---- the cases ----

const REACHED: string[] = [];

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const manifest = readJson("package.json");
    const lock = lockMentions(readJson("package-lock.json"));
    return json({
      manifestBelowFloor: textsOf(manifest, "package.json").length < FLOORS.manifestTexts,
      packageJson: textMentions(manifest, "package.json"),
      packageJsonText: stemsIn(readFileSync(join(REPO, "package.json"), "utf8")),
      lockBelowFloor: lock.packages < FLOORS.packages,
      lock: lock.mentions,
    });
  },
  A2: async () => {
    const modules = srcModules();
    const tracked = trackedModules();
    const judged = modulesReading(modules, DISK_TEXT);
    const read = judged.map(entry => entry.file);
    const controls = [...PLANT_SOURCE_CONTROLS.flatMap(([name, body]) => shapes(sourceMentions(body, name))), ...shapes(sourceMentions(PLANTED_MODULE.last, "last"))];
    return json({
      modulesBelowFloor: modules.length < FLOORS.modules,
      textsBelowFloor: judged.reduce((total, entry) => total + entry.count, 0) < FLOORS.texts,
      outsideSrc: modules.filter(module => !module.startsWith("src/")),
      untracked: read.filter(module => !tracked.includes(module)),
      unread: tracked.filter(module => !read.includes(module)),
      mentions: judged.flatMap(entry => entry.mentions),
      planted: plantedVerdict(modules, judged, modulesReading(modules, plantedReader(DISK_TEXT, PLANTED_MODULE)), judgeModule(plantText(PLANTED_MODULE, ""), "plant"), controls),
    });
  },
  A3: async () =>
    json({
      manifests: Object.fromEntries(Object.entries(MANIFEST_CONTROLS).map(([name, manifest]) => [name, textMentions(manifest, name)])),
      locks: Object.fromEntries(Object.entries(LOCK_CONTROLS).map(([name, lock]) => [name, lockMentions(lock).mentions])),
      sources: Object.fromEntries(Object.entries(SOURCE_CONTROLS).map(([name, text]) => [name, sourceMentions(text, name)])),
    }),
  B1: async () => {
    const pages = claimPages();
    const tracked = trackedClaimPages();
    const control = docsWalk(treeReader(WALK_CONTROL), "");
    return json({
      missing: REQUIRED_PAGES.filter(page => !pages.includes(page)),
      belowFloor: pages.length < FLOORS.pages,
      outsideScope: pages.filter(page => !inClaimScope(page)),
      untracked: pages.filter(page => !tracked.includes(page)),
      unwalked: tracked.filter(page => !pages.includes(page)),
      symlinks: docsWalk().symlinks,
      walkControl: { ...control, outsideScope: control.pages.filter(page => !inClaimScope(page)) },
    });
  },
  B2: async () => {
    const pages = claimPages();
    const tracked = trackedClaimPages();
    const judged = pagesReading(pages, DISK_TEXT);
    const read = judged.map(entry => entry.file);
    const controls = [...Object.entries(PAGE_CONTROLS).flatMap(([name, page]) => shapes(pageMentions(page, name))), ...shapes(pageMentions(PLANTED_PAGE.last, "last"))];
    return json({
      surface: "docs/workbench",
      empty: judged.filter(entry => entry.count === 0).map(entry => entry.file),
      blocksBelowFloor: judged.reduce((total, entry) => total + entry.count, 0) < FLOORS.blocks,
      wordsBelowFloor: judged.reduce((total, entry) => total + entry.words, 0) < FLOORS.words,
      untracked: read.filter(page => !tracked.includes(page)),
      unread: tracked.filter(page => !read.includes(page)),
      mentions: judged.flatMap(entry => entry.mentions),
      planted: plantedVerdict(pages, judged, pagesReading(pages, plantedReader(DISK_TEXT, PLANTED_PAGE)), judgePage(plantText(PLANTED_PAGE, ""), "plant"), controls),
    });
  },
  B3: async () => {
    const judged = pagesReading([TRACEABILITY], DISK_TEXT);
    return json({
      surface: "TRACEABILITY",
      inClaimPages: claimPages().includes(TRACEABILITY),
      empty: judged.filter(entry => entry.count === 0).map(entry => entry.file),
      mentions: judged.flatMap(entry => entry.mentions),
    });
  },
  B4: async () => {
    const nativeReading = registryReading(await nativeRegistry());
    const injectedReading = registryReading(injectedRegistry());
    return json({
      surface: "descriptors",
      native: { missing: nativeReading.missing, read: nativeReading.texts > 0, descriptions: nativeReading.descriptions, mentions: nativeReading.mentions },
      injected: { missing: injectedReading.missing, read: injectedReading.texts > 0, descriptions: injectedReading.descriptions, mentions: injectedReading.mentions },
    });
  },
  B5: async () =>
    json({
      pages: controlPages(PAGE_CONTROLS),
      descriptor: registryReading(plantedRegistry(PLANTED_DESCRIPTOR)).mentions,
    }),
  Q1: async () => json(VOCABULARY_CONTROLS.map(text => stemsIn(text).length)),
  Q2: async () => {
    expect(
      LOOKALIKE_PROBES.filter(probe => !probe.text.includes(probe.lookalike)).map(probe => probe.text),
      "each probe carries its look-alike",
    ).toStrictEqual([]);
    return json({
      lookalike: LOOKALIKE_PROBES.map(probe => stemsIn(probe.text)),
      repaired: LOOKALIKE_PROBES.map(probe => stemsIn(probe.text.split(probe.lookalike).join(probe.latin))),
    });
  },
  Q3: async () =>
    json({
      pages: controlPages(NON_CLAIM_PAGES),
      source: sourceMentions(NON_CLAIM_SOURCE, "comment"),
      raw: Object.values(NON_CLAIM_PAGES).map(page => stemsIn(page).length > 0),
    }),
  Q4: async () => {
    const composed = `${COMPOSED_PART}directed`;
    return json({
      source: sourceMentions(COMPOSED_SOURCE, "composed"),
      parts: [COMPOSED_PART, "directed"].map(part => stemsIn(part).length),
      registered: registryReading(plantedRegistry({ ...PLANTED_DESCRIPTOR, id: "planted.composed.read", description: composed, permissions: ["planted:read"], inputSchema: { type: "object" }, contractSource: "planted@0.0.0" })).mentions,
    });
  },
  Q5: async () => {
    const pages = claimPages();
    return json({
      readDirectly: pageMentions("EDC integration ships.\n", OUT_OF_SCOPE_PAGES[0] ?? ""),
      inScope: OUT_OF_SCOPE_PAGES.filter(page => inClaimScope(page)),
      read: OUT_OF_SCOPE_PAGES.filter(page => pages.includes(page)),
      docsNonPages: OUT_OF_SCOPE_DOCS.filter(path => inClaimScope(path)),
      modulesOutsideSrc: srcModules().filter(module => !module.startsWith("src/")).length,
    });
  },
  Q6: async () => json({ source: sourceMentions(UNNAMED_ADOPTION, "unnamed"), page: pageMentions(`\`\`\`ts\n${UNNAMED_ADOPTION}\n\`\`\`\n`, "unnamed") }),
};

describe("wb-pyel.4 EDC shipped-claim census (SDK-EVIDENCE-DIRECTED-COMPUTATION-R7, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's title and acceptance and the cases agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:5", "Q:6"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(
      json({
        stems: STEMS,
        topPages: TOP_PAGES,
        markdownPage: `/${MARKDOWN_PAGE.source}/${MARKDOWN_PAGE.flags}`,
        requiredPages: REQUIRED_PAGES,
        traceability: TRACEABILITY,
        floors: FLOORS,
        scriptKinds: Object.keys(SCRIPT_KINDS),
        requiredDescriptors: REQUIRED_DESCRIPTORS,
        surfaces: SURFACES,
        pageControls: PAGE_CONTROLS,
        walkControl: WALK_CONTROL,
        planted: PLANTED_DESCRIPTOR,
        manifestControls: MANIFEST_CONTROLS,
        lockControls: LOCK_CONTROLS,
        sourceControls: SOURCE_CONTROLS,
        plantedModule: PLANTED_MODULE,
        plantedPage: PLANTED_PAGE,
        vocabulary: VOCABULARY_CONTROLS,
        lookalike: LOOKALIKE_PROBES,
        nonClaimPages: NON_CLAIM_PAGES,
        nonClaimSource: NON_CLAIM_SOURCE,
        composed: [COMPOSED_SOURCE, COMPOSED_PART],
        outOfScope: OUT_OF_SCOPE_PAGES,
        outOfScopeDocs: OUT_OF_SCOPE_DOCS,
        unnamedAdoption: UNNAMED_ADOPTION,
        residuals: RESIDUALS,
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) {
      for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a quiet-row pin`).toContain(member);
    }
    const { title, notes } = exportRow();
    expect(title.length, `${BEAD}'s title was read from the tracker export`).toBeGreaterThan(0);
    const clauses = titleClauses(title);
    expect(clauses, "the title states two clauses before its adoption sentence").toHaveLength(2);
    const judgedRows = ROWS.filter(row => row.id !== "Q");
    for (const row of judgedRows) expect(clauses.filter(clause => clause === row.label), `row ${row.id} quotes exactly one title clause`).toHaveLength(1);
    for (const clause of clauses) expect(judgedRows.filter(row => row.label === clause), `"${clause}" is quoted by exactly one row`).toHaveLength(1);
    expect(charterStems(title), "the stems are the title's charter-path initials and modifier").toStrictEqual(Object.keys(STEMS));
    const sentence = untilThen(notes);
    expect(sentence, "the acceptance states its until-then census").toBeDefined();
    const census = sentence?.census.split("/") ?? [];
    expect(census[census.length - 1], "the census the acceptance names reads TRACEABILITY").toBe("TRACEABILITY");
    expect(census[0], "the census the acceptance names reads docs").toBe(TRACEABILITY.split("/")[0]);
    expect(stemsIn(sentence?.claim ?? ""), "the claim class names a stem").toHaveLength(1);
    expect(Object.keys(SURFACES).sort(), "the judged surfaces are the acceptance's, both ways").toEqual([...(sentence?.surfaces ?? []), census[census.length - 1] ?? ""].sort());
    for (const [surface, pin] of Object.entries(SURFACES)) {
      expect(ROWS.find(row => row.id === "B")?.pins, `${surface} is judged by a row B pin`).toContain(pin);
      const witness = rosterWitness(pin);
      expect(isObject(witness) ? witness.surface : undefined, `${pin}'s roster witness judges ${surface}`).toBe(surface);
    }
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string =>
      `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
