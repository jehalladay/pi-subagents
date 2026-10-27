/**
 * wb-b9n.3 (FORGE-CAC-EVIDENCE-ASSURANCE-R7, program-triage-2026-10-18), the Forge CAC label census. Statement (bead title):
 * "No Pi surface shall mint or adopt a 'CAC verified' label: a guard pins today's absence (0 CAC hits in src/test/docs at
 * 758ec18), and when ForgeCACReceiptV0 ships (gating artifact: P3 exporter, 01-contract-qa.md:25@bc2c379f7802, not shipped) a
 * receipt lacking checker identity+version or source-version evidence renders FAIL/UNKNOWN with no label, a payload string
 * claiming it quoted as data, never Pi's own status." The cited Forge line (01-contract-qa.md:25@bc2c379f7802): 'Invalid/missing
 * evidence returns FAIL/UNKNOWN. No "CAC verified" label absent checker and source-version evidence.' Its section heading (:3)
 * reads 'Proposed read-only export (not shipped)'. This census echoes those words and claims nothing of Forge.
 *
 * ROWS (labels = the owner filing's acceptance clauses (a)-(c), read from the bead export; frozen shape ["A:3", "B:1", "C:4"]):
 * - A, clause (a), the MINT half: no caption/status path emits the label today.
 *   A1 the judge. LABEL is the title's quoted label. A text holds it when, after NFKC, the label's words occur in order,
 *     separated by any run of whitespace, hyphens or underscores (or by nothing), case-insensitively, with no letter or digit
 *     just before or just after. WORD is the label's first word under grep -w semantics: after NFKC, case-sensitive, with no
 *     ASCII letter, digit or underscore just before or just after (the filing's 0-hits reading). The module judge reads every
 *     string literal, no-substitution template and template head, middle and tail text (the cooked text) of a module through
 *     the TypeScript parser; comments and identifiers are not judged. A1's witness carries every planted text and module with
 *     its two readings, and the residual table is checked against them (each quiet row reads 0, each twin 1).
 *   A2 the source walk. The module judge reads every src/**\/*.ts module git lists (tracked or untracked, never ignored), and a
 *     planted label modules last: a small one, and one longer than every real module with the label in its last literal. The
 *     judged list must equal that listing plus the two plants, a filesystem walk must list the same modules, no symlink may
 *     sit under src, and the listing must hold at least SRC_FLOOR modules. Pinned: the only LABEL sites and the only WORD sites
 *     are the two plants', so the real modules hold 0 of each.
 *   A3 the rendered outputs. Today's Forge-facing caption/status renderers run over a fixed fixture family and every string
 *     and every object key of every output is judged. Pinned: 0 LABEL strings and 0 WORD strings. The renderers:
 *     forgeGateTopology, readForgeOperationEvidence and nativeEvidence over seven forge.gate.status/v1 readings;
 *     forgeOperationStartedSnapshot, forgeGateStepTopology (started, passed, failed) and forgeOperationTerminalSnapshot over
 *     decodeForgeOperationTerminal (success, error); layoutWorkflowCard over one node per reading. The witness tags every output
 *     it judged with its renderer and fixture and carries a sha-256 prefix of the fixture family; the walk's positive control is a planted object
 *     holding the label once as a key and once inside an array (it must read 2). Other renderers are covered by A2's literal walk only.
 * - B, clause (b), the RECEIPT half, NOT DUE. B1 is a trigger, not the duty. It reads the trigger as a name: while no src module
 *   (any text, comments included) spells the gating artifact (the title's ForgeCACReceiptV0), this census reads (b) as not due;
 *   the first module that spells it reds B1 until (b)'s fixtures replace this trigger. B1 does not test (b)'s rendering rules.
 *   The named planted reader rides last through the same src listing, once short and once longer than every real module: the
 *   scan must read exactly the listing plus both plants, and the only consumers it may find are the plants. The unnamed reader
 *   is its residual's quiet row.
 * - C, clause (c), the ADOPT half, for gate.status payloads only (the receipt half of (c) is not due, see B1). L is the label
 *   and N a neutral control word of the same byte length ("XQZ recorded"). A cell puts L or N in one field of one base reading.
 *   Base current: one package with authoritative_current true and last_result success, status success, verdict null, reason
 *   code FORGE_OK. Base historical: the same package with authoritative_current false and an unverified_reason.
 *   C1 forgeGateTopology. For each base and each of six producer text fields (source.status, source.envelope.verdict,
 *     source.envelope.reason_code, the package's ref, last_result and unverified_reason) the output with L equals the output
 *     with N after replacing N by L: every tone, coverage, basis, relation and diagnostic is the one the neutral word gets, and
 *     L shows exactly where N shows. The witness carries the planted field's path (read off the input) and each snapshot's id,
 *     title, tone, coverage, status text, evidence refs and basis, and the diagnostics, with L shown as {L}. In the current base the reason-code cell shows L beside Pi's own 'current gate
 *     passed' and the success tone; the neutral word gets both, so the package's current success earns them, not L.
 *   C2 fields the reader never reads. Label-bearing keys added at the source, envelope, data and package levels (the witness
 *     lists them, read off the input) leave the serialized output identical to the base's; a last_result_state whose freshness
 *     is L (outside Forge's closed set) serializes exactly as one whose freshness is N: basis UNKNOWN, L never shown.
 *   C3 readForgeOperationEvidence over the same cells: the same substitution law over its whole result, byte count included;
 *     the witness carries the planted path, freshness, status text and preview lines.
 *   C4 nativeEvidence keeps a status of L verbatim as domainStatus. layoutWorkflowCard draws a done node with that domainStatus
 *     (freshness current, one evidence ref) with the glyph N gets, never the tick a producer-stated "verified" gets, and quotes
 *     L as the node's outcome.
 * Each pin's witness carries its own inputs (planted texts and modules, the judged and scanned module lists, renderer:fixture
 * tags with the fixture digest, base and field keys, the planted keys and words) beside its readings, so serving one pin with another pin's case, or one planted
 * input with another's, changes the witness and reds the compare. A pin rewritten to return its roster witness as a constant
 * is not detected by the compare.
 *
 * OUTSIDE ANCHOR: the wb-b9n.3 row of the tracked bead export (.beads/issues.jsonl). The first "Acceptance: (a) ... . Not P0:"
 * span of its notes holds exactly the clauses (a)-(c), each equal to its row label, and every pin's quote is a substring of its
 * row label. LABEL and the gating artifact are parsed from its title. The census reads that row's title and that one span of
 * its notes, nothing else of it: a title whose quoted label or gating artifact changes, or a filing whose acceptance clauses
 * change, reds the judged set by design; appended notes and status writes do not.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, constants, residuals and every pin's
 * witness are held to the out-of-file roster test/fixtures/forge-cac-label-roster.json; the last case reads that every
 * registered pin ran to the compare with its roster witness.
 * RESIDUALS (named; each has a pinned quiet row and a live twin in the witness of the pin named):
 *   R-COMPOSED (A1) a label assembled at run time from pieces no single literal spells (quiet: "CA" + "C verified"; twin: one
 *     literal). A3 sees such a label only in the outputs of the renderers it drives.
 *   R-NAME (A1) a label spelled only by an identifier or property name a renderer might display (quiet: a CACVerified key read
 *     through Object.keys; twin: a "CAC verified" string key).
 *   R-LOOKALIKE (A1) confusable letters NFKC does not fold (quiet: Cyrillic ES, A, ES; twin: fullwidth C, A, C, which NFKC folds).
 *   R-PARAPHRASE (A1) another wording of the claim (quiet: "CAC certified", "verified by CAC"; twin: the title's label).
 *   R-EMBEDDED (A1) the label glued after a letter or digit (quiet: "isCACVerified"; twin: "CACVerified").
 *   R-UNNAMED-RECEIPT (B1) a receipt reader that never spells the gating artifact (quiet: a checker_identity reader; twin: a
 *     reader type named after the artifact).
 *
 * MEASURED AT THE CUT (base dc72a6d, read-only; seat records, not assertions): src and docs hold 0 'CAC' word hits; test held 6
 * files with word hits before this cut (MW-CAC-WORKFLOW-COMPOSITION requirement ids and the planted citation corpus of the
 * wb-kku9.2 census and its roster), so the title's parenthetical reading of src/test/docs at 758ec18 no longer holds for test
 * and is not claimed here. Forge origin/main bd977c74d939 spells ForgeCACReceiptV0 only in
 * docs/programs/cac-evidence-assurance-2026-10-18/01-contract-qa.md; the installed forge 0.2.1 (rev c0f93b3c5d18) spells it
 * nowhere. The word-level absence census over src, test, qa and docs/workbench is wb-zzb4's; this census judges the label in
 * caption material and in rendered outputs.
 *
 * Display paths added: none. Test-only: every fixture lives in memory (no scratch; the only spawn is git ls-files); src and
 * the bead export are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { layoutWorkflowCard, plainWorkflowCardLines } from "../src/ui/workflow-card.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { type ForgeEvidenceDeps, readForgeOperationEvidence } from "../src/workbench/forge-evidence.js";
import { forgeGateTopology } from "../src/workbench/forge-observer.js";
import {
  decodeForgeOperationTerminal,
  forgeGateStepTopology,
  forgeOperationStartedSnapshot,
  forgeOperationTerminalSnapshot,
} from "../src/workbench/forge-operation-observer.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import type { WorkflowNodeEntry } from "../src/workflow/progress.js";

interface Pin { readonly id: string; readonly quote: string }
interface Row { readonly id: string; readonly label: string; readonly pins: readonly Pin[] }
interface Constants { readonly label: string; readonly gating: string; readonly neutral: string }
interface Residual { readonly id: string; readonly quietPin: string; readonly quiet: readonly string[]; readonly twin: readonly string[] }
interface Roster {
  readonly bead: string;
  readonly constants: Constants;
  readonly residuals: readonly Residual[];
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: JsonValue })[] }[];
}
type Json = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_FILE = "test/fixtures/forge-cac-label-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-b9n.3";
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;
/** The neutral control word: two words, the label's byte length, in no decision vocabulary and read by neither judge. */
const NEUTRAL = "XQZ recorded";
/** A floor under the git listing: an emptied or misdirected listing reds; the judged set is every module git lists. */
const SRC_FLOOR = 100;

const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a hermetic guard proving no Pi caption/status path emits a CAC-verified label today",
    pins: [
      { id: "A1", quote: "a hermetic guard proving" },
      { id: "A2", quote: "no Pi caption/status path" },
      { id: "A3", quote: "emits a CAC-verified label today" },
    ],
  },
  {
    id: "B",
    label:
      "(b) on receipt consumption, fixtures with checker identity+version AND source-version evidence may surface the producer's label with those fields cited beside it, while fixtures missing either render FAIL/UNKNOWN with the label refused and a diagnostic naming the missing evidence",
    pins: [{ id: "B1", quote: "on receipt consumption" }],
  },
  {
    id: "C",
    label: "(c) a gate.status or receipt payload embedding the literal string renders it as quoted data only",
    pins: [
      { id: "C1", quote: "a gate.status" },
      { id: "C2", quote: "payload embedding the literal string" },
      { id: "C3", quote: "renders it as quoted data" },
      { id: "C4", quote: "quoted data only" },
    ],
  },
];

const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

// ------------------------------------------------------------------------------------------------------------- the bead row
interface BeadRow { readonly title: string; readonly notes: string }
function beadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (value === null || typeof value !== "object" || !("id" in value) || value.id !== BEAD) continue;
    const title = "title" in value && typeof value.title === "string" ? value.title : "";
    const notes = "notes" in value && typeof value.notes === "string" ? value.notes : "";
    return { title, notes };
  }
  throw new Error(`the bead export holds no ${BEAD} row`);
}
const acceptanceOf = (notes: string): string => /Acceptance: (\(a\) .*?)\. Not P0:/s.exec(notes)?.[1] ?? "";
const clausesOf = (notes: string): string[] => acceptanceOf(notes).split(/; (?=\([a-z]\) )/);
const labelOf = (title: string): string => /a '([^']+)' label/.exec(title)?.[1] ?? "";
const gatingOf = (title: string): string => /when (\S+) ships \(gating artifact/.exec(title)?.[1] ?? "";
const ROW = beadRow();
const LABEL = labelOf(ROW.title);
const GATING = gatingOf(ROW.title);

// --------------------------------------------------------------------------------------------------------------- the judge
const escaped = (word: string): string => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** The label family: the title's label words in order, any run of whitespace, hyphens or underscores (or none) between them. */
const LABEL_PATTERN = new RegExp(`(?<![\\p{L}\\p{N}])${LABEL.split(/\s+/).map(escaped).join("[\\s_-]*")}(?![\\p{L}\\p{N}])`, "iu");
/** The filing's 0-hits word: the label's first word under grep -w semantics (case-sensitive; underscore is a word character). */
const WORD_PATTERN = new RegExp(`(?<![A-Za-z0-9_])${escaped(LABEL.split(/\s+/)[0] ?? "")}(?![A-Za-z0-9_])`, "u");
const isLabel = (text: string): boolean => LABEL_PATTERN.test(text.normalize("NFKC"));
const isWord = (text: string): boolean => WORD_PATTERN.test(text.normalize("NFKC"));

/** Every string literal, no-substitution template and template head, middle and tail text of one module. */
function literalTexts(path: string, text: string): string[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const texts: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      texts.push(node.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return texts;
}
interface ModuleReading { readonly judged: string[]; readonly label: string[]; readonly word: string[] }
function judgeModules(modules: readonly { readonly path: string; readonly text: string }[]): ModuleReading {
  const judged: string[] = [];
  const label: string[] = [];
  const word: string[] = [];
  for (const module of modules) {
    judged.push(module.path);
    for (const literal of literalTexts(module.path, module.text)) {
      if (isLabel(literal)) label.push(`${module.path} ${JSON.stringify(literal)}`);
      if (isWord(literal)) word.push(`${module.path} ${JSON.stringify(literal)}`);
    }
  }
  return { judged, label, word };
}
/** Every string and every object key of a value, depth first. */
function stringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringsOf);
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => [key, ...stringsOf(item)]);
  return [];
}

const fromCodePoints = (...points: number[]): string => String.fromCodePoint(...points);
/** A1's planted texts: claims the judge must read, the named non-label forms, and each residual's quiet row and twin. */
const PLANTED_TEXTS: Readonly<Record<string, string>> = {
  title: LABEL,
  hyphen: "CAC-verified",
  underscore: "CAC_VERIFIED",
  lower: "cac verified",
  glued: "CACVerified",
  sentence: "Receipt status: CAC verified.",
  spaced: "CAC  -  verified",
  fullwidth: `${fromCodePoints(0xff23, 0xff21, 0xff23)} verified`,
  bareWord: "CAC",
  bareVerified: "verified",
  requirementId: "MW-CAC-WORKFLOW-COMPOSITION-R1",
  compositionName: "CACWorkflowCompositionV0",
  gatingName: GATING,
  efficacy: "efficacy verified",
  certified: "CAC certified",
  verifiedBy: "verified by CAC",
  cyrillic: `${fromCodePoints(0x421, 0x410, 0x421)} verified`,
  embedded: "isCACVerified",
};
const PLANTED_MODULES: Readonly<Record<string, string>> = {
  composed: 'export const shown = "CA" + "C verified";\n',
  composedTwin: 'export const shown = "CAC verified";\n',
  name: "export const LABELS = { CACVerified: true } as const;\nexport const shown = Object.keys(LABELS)[0];\n",
  nameTwin: 'export const LABELS = { "CAC verified": true } as const;\n',
  comment: "// a CAC verified label is never shown\nexport const shown = 1;\n",
  template: "export const shown = (state: string) => `CAC verified: $" + "{state}`;\n",
};
const PLANT = "src/workbench/forge-cac-label-plant.ts";
const PLANT_BIG = "src/workbench/forge-cac-label-plant-big.ts";
/** Each residual names its quiet planted inputs (read 0 by the label judge) and its live twins (read 1). */
const RESIDUALS: readonly Residual[] = [
  { id: "R-COMPOSED", quietPin: "A1", quiet: ["composed"], twin: ["composedTwin"] },
  { id: "R-NAME", quietPin: "A1", quiet: ["name"], twin: ["nameTwin"] },
  { id: "R-LOOKALIKE", quietPin: "A1", quiet: ["cyrillic"], twin: ["fullwidth"] },
  { id: "R-PARAPHRASE", quietPin: "A1", quiet: ["certified", "verifiedBy"], twin: ["title"] },
  { id: "R-EMBEDDED", quietPin: "A1", quiet: ["embedded"], twin: ["glued"] },
  { id: "R-UNNAMED-RECEIPT", quietPin: "B1", quiet: ["unnamed"], twin: ["named"] },
];
/** B1's planted modules: a receipt reader that never spells the gating artifact (quiet) and one that does (its twin). */
const PLANTED_CONSUMERS: Readonly<Record<string, string>> = {
  unnamed: "export const checkerOf = (receipt: { checker_identity?: string }) => receipt.checker_identity;\n",
  named: `export interface ${GATING}Reader { readonly checker_identity: string }\n`,
};
/** B1's scan: every module it read, and the ones whose text spells the gating artifact. */
function consumersOf(modules: readonly { readonly path: string; readonly text: string }[]): { scanned: string[]; consumers: string[] } {
  const scanned: string[] = [];
  const consumers: string[] = [];
  for (const module of modules) {
    scanned.push(module.path);
    if (module.text.includes(GATING)) consumers.push(module.path);
  }
  return { scanned, consumers };
}
/** A planted input as the witness carries it: ASCII only, every other code point as \u{hex}. */
const shownText = (text: string): string => [...text].map(unit => ((unit.codePointAt(0) ?? 0) < 0x80 ? unit : `\\u{${(unit.codePointAt(0) ?? 0).toString(16)}}`)).join("");
const plantedReading = (text: string): string => {
  const reading = judgeModules([{ path: PLANT, text }]);
  return `label=${reading.label.length} word=${reading.word.length}`;
};

// ----------------------------------------------------------------------------------------------------------- the src walk
const inScope = (path: string): boolean => /^src\/.+\.ts$/.test(path);
/** What git would commit below src: tracked or untracked, never ignored. */
function gitModules(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(inScope))].sort(byName);
}
function walkModules(): { modules: string[]; links: string[] } {
  const modules: string[] = [];
  const links: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(join(REPO, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isSymbolicLink()) links.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && inScope(path)) modules.push(path);
    }
  };
  visit("src");
  return { modules: modules.sort(byName), links: links.sort(byName) };
}
const srcModules = (): { path: string; text: string }[] => gitModules().map(path => ({ path, text: readFileSync(join(REPO, path), "utf8") }));
/** A planted module longer than every real module, the planted text last: a reader that skips long modules misses it. */
function bigPlant(modules: readonly { readonly text: string }[], tail: string): { path: string; text: string } {
  const longest = Math.max(0, ...modules.map(module => module.text.length));
  const lines: string[] = [];
  let length = 0;
  for (let index = 0; length <= longest; index += 1) {
    const line = `export const filler${index} = "x${index}";\n`;
    lines.push(line);
    length += line.length;
  }
  return { path: PLANT_BIG, text: `${lines.join("")}${tail}` };
}

// ----------------------------------------------------------------------------------------------------------- the fixtures
const OPERATION = "op_b9n3";
const SCOPE = { workspace: "/b9n3-forge-ws", principal: "local-operator:b9n3" };
const CONTEXT = { scope: SCOPE, target: SCOPE.workspace, capturedAt: "2026-10-26T22:00:00Z", observedAt: "2026-10-26T22:00:01Z" };
const CAPTURED = "2026-10-26T22:00:02Z";
const DIGEST = "b".repeat(40);
const currentRow = (lastResult: string): Json => ({ ref: "code:b9n3", last_result: lastResult, authoritative_current: true, verification_ref: "cmd_b9n3" });
const HISTORICAL_ROW: Json = { ref: "code:b9n3", last_result: "success", authoritative_current: false, unverified_reason: "FORGE_CURRENT_STATE_UNVERIFIED" };
function reading(packages: JsonValue[], over: Json = {}, envelope: Json = { verdict: null, reason_code: "FORGE_OK" }): Json {
  return { contract: "forge.gate.status/v1", protocolMethod: "gate.status", source: { status: "success", operation_id: OPERATION, envelope, data: { packages }, ...over } };
}
const STATE = (freshness: string): Json => ({ freshness, invalidation_basis: { kind: "invalidation-basis/v2", derived_from: DIGEST } });
/** A3's fixture family: seven readings of the pinned forge.gate.status/v1 contract. */
const READINGS: Readonly<Record<string, Json>> = {
  historical: reading([HISTORICAL_ROW]),
  currentSuccess: reading([currentRow("success")]),
  currentFailure: reading([currentRow("failure")]),
  degraded: reading([currentRow("success")], { status: "partial" }, { verdict: "COULD_NOT_JUDGE", reason_code: "FORGE_DEGRADED" }),
  empty: reading([]),
  described: reading([{ ...currentRow("success"), last_result_state: STATE("CURRENT") }]),
  withheld: reading([{ ...currentRow("success"), last_result_state: STATE("BOGUS") }]),
};
const STEP_OUTCOMES: readonly (string | undefined)[] = [undefined, "passed", "failed"];
const REPLIES: readonly Json[] = [
  { operation_id: OPERATION, status: "success", terminal_disposition: "completed", data: { selection_accounting: { unit: "step", units: [{ selection: "selected" }], counts: { declared: 1, selected: 1 } }, selection: null } },
  { operation_id: OPERATION, status: "error", terminal_disposition: "completed" },
];
/** The fixture family as one digest, so a fixture edited in place changes A3's witness. */
const FIXTURE_DIGEST = createHash("sha256").update(JSON.stringify({ READINGS, STEP_OUTCOMES, REPLIES })).digest("hex").slice(0, 16);
function evidenceDeps(result: JsonValue): ForgeEvidenceDeps {
  return { grants: () => ["forge:inspect"], scope: SCOPE, target: SCOPE.workspace, read: async () => result, now: () => CAPTURED };
}
function nodeEntry(index: number, domainStatus: string | undefined, evidenceRefs: readonly string[]): WorkflowNodeEntry {
  return {
    type: "workflow_node", index, callId: index + 1, capabilityId: "forge.gate.status", label: `forge gate ${index}`, state: "done",
    freshness: "current", evidenceRefs: [...evidenceRefs], ...(domainStatus !== undefined ? { domainStatus } : {}),
  };
}
function cardLines(entries: readonly WorkflowNodeEntry[]): string[] {
  return plainWorkflowCardLines(layoutWorkflowCard({ progress: [...entries], task: { status: "completed", startTime: 0, endTime: 1_000 }, now: 1_000, width: 240, ascii: true }));
}
/** Every output A3 judges, keyed by renderer and fixture. */
async function renderedOutputs(): Promise<{ rendered: string[]; outputs: unknown[] }> {
  const rendered: string[] = [];
  const outputs: unknown[] = [];
  const add = (tag: string, output: unknown): void => {
    rendered.push(tag);
    outputs.push(output);
  };
  const entries: WorkflowNodeEntry[] = [];
  for (const [index, id] of Object.keys(READINGS).entries()) {
    const value = READINGS[id] ?? {};
    add(`forgeGateTopology:${id}`, forgeGateTopology(value, CONTEXT));
    add(`readForgeOperationEvidence:${id}`, await readForgeOperationEvidence(`forge-operation:${OPERATION}`, evidenceDeps(value)));
    const native = nativeEvidence("forge.gate.status", value);
    add(`nativeEvidence:${id}`, native);
    entries.push(nodeEntry(index, native.domainStatus, native.evidenceRefs ?? []));
  }
  const options = { scope: SCOPE };
  add("forgeOperationStartedSnapshot:started", forgeOperationStartedSnapshot({ operationId: OPERATION, observedAt: CAPTURED }, options));
  for (const outcome of STEP_OUTCOMES) {
    add(`forgeGateStepTopology:${outcome ?? "started"}`, forgeGateStepTopology({ operationId: OPERATION, step: "test", seq: 3, observedAt: CAPTURED, ...(outcome !== undefined ? { outcome } : {}) }, options));
  }
  for (const reply of REPLIES) {
    const terminal = decodeForgeOperationTerminal(reply, OPERATION, CAPTURED);
    if (terminal === undefined) throw new Error("a fixture gate.run reply did not decode");
    add(`forgeOperationTerminalSnapshot:${String(reply.status)}`, forgeOperationTerminalSnapshot(terminal, options));
  }
  add(`layoutWorkflowCard:${entries.length} nodes`, cardLines(entries));
  return { rendered, outputs };
}

// ------------------------------------------------------------------------------------------------------- the payload cells
type Field = "source.status" | "source.envelope.verdict" | "source.envelope.reason_code" | "package.ref" | "package.last_result" | "package.unverified_reason";
const FIELDS: readonly Field[] = ["source.status", "source.envelope.verdict", "source.envelope.reason_code", "package.ref", "package.last_result", "package.unverified_reason"];
const BASES: Readonly<Record<string, Json>> = { current: currentRow("success"), historical: HISTORICAL_ROW };
function cell(base: string, field: Field, word: string): Json {
  const row: Json = { ...(BASES[base] ?? {}) };
  const envelope: Json = { verdict: null, reason_code: "FORGE_OK" };
  const over: Json = {};
  if (field === "source.status") over.status = word;
  if (field === "source.envelope.verdict") envelope.verdict = word;
  if (field === "source.envelope.reason_code") envelope.reason_code = word;
  if (field === "package.ref") row.ref = word;
  if (field === "package.last_result") row.last_result = word;
  if (field === "package.unverified_reason") row.unverified_reason = word;
  return reading([row], over, envelope);
}
/** The substitution law: the output with L equals the output with N after replacing N by L. */
function substituted(withLabel: unknown, withNeutral: unknown): boolean {
  return JSON.stringify(withLabel) === JSON.stringify(withNeutral).split(NEUTRAL).join(LABEL);
}
const marked = (text: string): string => text.split(LABEL).join("{L}");
/** The paths of a value whose string is the label: a cell's planted field (or C2's planted keys), read off the input itself. */
function labelPaths(value: JsonValue, path: string): string[] {
  if (value === LABEL) return [path];
  if (Array.isArray(value)) return value.flatMap((item, index) => labelPaths(item, `${path}[${index}]`));
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => labelPaths(item, `${path}.${key}`));
  return [];
}
function topologyFacets(input: JsonValue, topology: ReturnType<typeof forgeGateTopology>): JsonValue {
  return {
    planted: labelPaths(input, "reading"),
    snapshots: topology.snapshots.map(snapshot => ({
      id: marked(snapshot.source.id), title: marked(snapshot.node.title),
      tone: snapshot.node.statusTone, ...(snapshot.coverage !== undefined ? { coverage: snapshot.coverage } : {}), text: marked(snapshot.node.statusText),
      refs: (snapshot.evidenceRefs ?? []).map(marked), ...(snapshot.subjectBasis !== undefined ? { basis: snapshot.subjectBasis } : {}),
    })),
    diagnostics: topology.diagnostics.map(marked),
  };
}

// ------------------------------------------------------------------------------------------------------------- the pins
const REACHED = new Set<string>();
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const labelReading = (id: string): number | undefined => {
      const text = PLANTED_TEXTS[id];
      if (text !== undefined) return isLabel(text) ? 1 : 0;
      const module = PLANTED_MODULES[id];
      return module === undefined ? undefined : judgeModules([{ path: PLANT, text: module }]).label.length;
    };
    for (const residual of RESIDUALS.filter(entry => entry.quietPin === "A1")) {
      const loud = residual.quiet.filter(id => labelReading(id) !== 0);
      const silent = residual.twin.filter(id => labelReading(id) !== 1);
      if (loud.length > 0 || silent.length > 0) throw new Error(`${residual.id}: quiet rows read loud (${loud.join(", ")}) or twins read silent (${silent.join(", ")})`);
    }
    const texts = Object.fromEntries(Object.entries(PLANTED_TEXTS).map(([id, text]) => [id, `label=${isLabel(text) ? 1 : 0} word=${isWord(text) ? 1 : 0} ${shownText(text)}`]));
    const modules = Object.fromEntries(Object.entries(PLANTED_MODULES).map(([id, text]) => [id, `${plantedReading(text)} ${shownText(text)}`]));
    return { texts, modules };
  },
  A2: async () => {
    const listed = gitModules();
    const walked = walkModules();
    const modules = srcModules();
    const big = bigPlant(modules, PLANTED_MODULES.composedTwin ?? "");
    // The two planted controls ride last through the same judge: the real modules must add no site of their own.
    const reading = judgeModules([...modules, { path: PLANT, text: PLANTED_MODULES.composedTwin ?? "" }, big]);
    return {
      judgedEqualsListedPlusPlants: JSON.stringify(reading.judged) === JSON.stringify([...listed, PLANT, PLANT_BIG]),
      bigPlantLongest: big.text.length > Math.max(0, ...modules.map(module => module.text.length)),
      gitEqualsWalk: JSON.stringify(listed) === JSON.stringify(walked.modules), links: walked.links, floorMet: listed.length >= SRC_FLOOR,
      label: reading.label, word: reading.word,
    };
  },
  A3: async () => {
    const { rendered, outputs } = await renderedOutputs();
    const strings = outputs.flatMap(stringsOf);
    // The control holds the label once as a key and once inside an array, so the walk must read both to count 2.
    const control = stringsOf({ [LABEL]: [`${NEUTRAL} · ${LABEL}`] });
    return {
      rendered, fixtureDigest: FIXTURE_DIGEST, walked: strings.length > 0,
      label: strings.filter(isLabel), word: strings.filter(isWord),
      control: { label: control.filter(isLabel).length, word: control.filter(isWord).length },
    };
  },
  B1: async () => {
    const reads = (id: string): number => consumersOf([{ path: PLANT, text: PLANTED_CONSUMERS[id] ?? "" }]).consumers.length;
    for (const residual of RESIDUALS.filter(entry => entry.quietPin === "B1")) {
      if (residual.quiet.some(id => reads(id) !== 0) || residual.twin.some(id => reads(id) !== 1)) throw new Error(`${residual.id}: a quiet row reads a consumer or a twin reads none`);
    }
    const planted = Object.fromEntries(Object.entries(PLANTED_CONSUMERS).map(([id, text]) => [id, `consumers=${reads(id)} ${shownText(text)}`]));
    // The named twin rides last through the same listing, short and longer than every real module: the scan must read the
    // listing plus both plants, and the only consumers it may find are the plants.
    const modules = srcModules();
    const scan = consumersOf([...modules, { path: PLANT, text: PLANTED_CONSUMERS.named ?? "" }, bigPlant(modules, PLANTED_CONSUMERS.named ?? "")]);
    return { scannedEqualsListedPlusPlants: JSON.stringify(scan.scanned) === JSON.stringify([...gitModules(), PLANT, PLANT_BIG]), consumers: scan.consumers, planted };
  },
  C1: async () => {
    const cells: Json = {};
    for (const base of Object.keys(BASES)) {
      for (const field of FIELDS) {
        const input = cell(base, field, LABEL);
        const withLabel = forgeGateTopology(input, CONTEXT);
        const withNeutral = forgeGateTopology(cell(base, field, NEUTRAL), CONTEXT);
        if (!substituted(withLabel, withNeutral)) throw new Error(`${base}/${field}: the topology with the label is not the neutral topology with the word replaced`);
        cells[`${base}/${field}`] = topologyFacets(input, withLabel);
      }
    }
    return cells;
  },
  C2: async () => {
    const base = reading([currentRow("success")]);
    const extra: Json = {
      contract: "forge.gate.status/v1", protocolMethod: "gate.status",
      source: {
        status: "success", operation_id: OPERATION, label: LABEL, envelope: { verdict: null, reason_code: "FORGE_OK", label: LABEL },
        data: { label: LABEL, packages: [{ ...currentRow("success"), label: LABEL, cac_status: LABEL }] },
      },
    };
    const plain = forgeGateTopology(base, CONTEXT);
    const added = forgeGateTopology(extra, CONTEXT);
    const words = [LABEL, NEUTRAL];
    const [freshLabel, freshNeutral] = words.map(word => forgeGateTopology(reading([{ ...currentRow("success"), last_result_state: STATE(word) }]), CONTEXT));
    return {
      unknownKeys: { planted: labelPaths(extra, "reading"), identical: JSON.stringify(added) === JSON.stringify(plain), shown: stringsOf(added).filter(isLabel).length },
      freshness: {
        words: words.map(marked), identical: JSON.stringify(freshLabel) === JSON.stringify(freshNeutral), shown: stringsOf(freshLabel).filter(isLabel).length,
        packageText: freshLabel?.snapshots[1]?.node.statusText ?? "",
      },
    };
  },
  C3: async () => {
    const cells: Json = {};
    for (const base of Object.keys(BASES)) {
      for (const field of FIELDS) {
        const ref = `forge-operation:${OPERATION}`;
        const input = cell(base, field, LABEL);
        const withLabel = await readForgeOperationEvidence(ref, evidenceDeps(input));
        const withNeutral = await readForgeOperationEvidence(ref, evidenceDeps(cell(base, field, NEUTRAL)));
        if (!substituted(withLabel, withNeutral)) throw new Error(`${base}/${field}: the evidence with the label is not the neutral evidence with the word replaced`);
        cells[`${base}/${field}`] = { planted: labelPaths(input, "reading"), freshness: withLabel.freshness, statusText: marked(withLabel.statusText), preview: withLabel.preview.map(marked) };
      }
    }
    return cells;
  },
  C4: async () => {
    const native = nativeEvidence("forge.gate.status", cell("current", "source.status", LABEL));
    const neutral = nativeEvidence("forge.gate.status", cell("current", "source.status", NEUTRAL));
    const refs = native.evidenceRefs ?? [];
    const [labelLine = "", neutralLine = "", verifiedLine = ""] = cardLines([nodeEntry(0, native.domainStatus, refs), nodeEntry(1, neutral.domainStatus, refs), nodeEntry(2, "verified", refs)]).filter(line => line.includes(" · forge.gate.status · "));
    const glyph = (line: string): string => line.trim().split(" ")[0] ?? "";
    return {
      domainStatus: marked(native.domainStatus ?? ""), refs,
      glyphs: { label: shownText(glyph(labelLine)), neutral: shownText(glyph(neutralLine)), verified: shownText(glyph(verifiedLine)) },
      outcome: marked(labelLine.trim()), neutralOutcome: neutralLine.trim(),
    };
  },
};

describe("wb-b9n.3 Forge CAC label census (FORGE-CAC-EVIDENCE-ASSURANCE-R7)", () => {
  it("judged set: frozen shape, roster, the owner filing's acceptance and the title's label and gating artifact", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:1", "C:4"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id, quote }) => ({ id, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.constants).toEqual({ label: LABEL, gating: GATING, neutral: NEUTRAL });
    // Outside anchor: the filing's acceptance clauses are exactly the row labels, and each pin quotes a span of its row.
    const clauses = clausesOf(ROW.notes);
    expect(clauses).toHaveLength(3);
    expect(ROWS.map(row => row.label)).toEqual(clauses);
    expect(ROWS.flatMap(row => row.pins.filter(pin => !row.label.includes(pin.quote)).map(pin => pin.id))).toEqual([]);
    // The title's own label is a claim and its gating artifact is not, so neither reading is vacuous.
    expect([isLabel(ROW.title), isLabel(GATING), GATING.length > 0, LABEL.length > 0]).toEqual([true, false, true, true]);
    expect(isLabel(NEUTRAL) || isWord(NEUTRAL)).toBe(false);
    expect(RESIDUALS.map(residual => residual.id)).toEqual(["R-COMPOSED", "R-NAME", "R-LOOKALIKE", "R-PARAPHRASE", "R-EMBEDDED", "R-UNNAMED-RECEIPT"]);
    expect(ROSTER.residuals).toEqual(RESIDUALS);
    // Each residual's quiet rows and twins are planted inputs of the pin that reads them.
    const plantedOf: Readonly<Record<string, readonly string[]>> = { A1: [...Object.keys(PLANTED_TEXTS), ...Object.keys(PLANTED_MODULES)], B1: Object.keys(PLANTED_CONSUMERS) };
    expect(RESIDUALS.flatMap(residual => [...residual.quiet, ...residual.twin].filter(id => !(plantedOf[residual.quietPin] ?? []).includes(id)).map(id => `${residual.id}:${id}`))).toEqual([]);
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          REACHED.add(pin.id);
        });
      }
    });
  }
  it("records: every registered pin ran to the compare with its roster witness", () => {
    expect([...REACHED].sort(byName)).toEqual(ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
  });
});
