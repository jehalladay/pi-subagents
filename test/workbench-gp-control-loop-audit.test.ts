/**
 * wb-1xvp.3 (RF-GRAPH-POLICY-MACHINE-CONTROL-R2): Pi wires no gp into a decision loop before its control-loop audit.
 *
 * Bead statement (title, trimmed by bd): "If Pi ever wires gp into a decision loop (gated: deliverables 1 and 9, audit and
 * docs, unshipped in Pi and GraphPolicyCLI), Pi docs shall first carry the control-loop audit (each 11-stage-lifecycle
 * decision point: policy, inputs, authority, outcomes, current fixed rule) before behaviour changes, each gp call site
 * naming its audited decision point, and document entrypoints, deps (gp version verbatim), config keys, fallback and an
 * implemented-vs-proposed inventory" - ReactiveFiberCLI docs/programs/graph-policy-machine-control-2026-10-21/README.md:85
 * @6a251bf73af5 ("Before changing behavior, determine how the machine currently operates."; stages :89-99; fields :101,
 * :103; documentation :488; deliverables 1 and 9 at :504 and :512).
 *
 * The gating artifact is unshipped and Pi carries no gp call site, so this suite PINS TODAY'S ABSENCE (the live rows) and
 * ARMS THE PRECONDITION (the judge in test/helpers/gp-control-loop-audit.ts, exercised on synthetic inputs):
 * - (a) a src gp call site with no docs/workbench/control-loop-audit.md, a call site naming no gp-decision-point, or one
 *   citing an id the audit's Decision points table lacks, is a finding; the table must cover all eleven stages and give
 *   every decision point its five fields;
 * - (b) each documented entrypoint resolves to an export of an existing module; the documented gp version equals the
 *   measured `gp --version` line verbatim; the documented config keys equal the settings schema keys (the dotted keys of
 *   the SubagentsSettings interface tree in src/settings.ts - read as the whole schema, in both directions);
 * - (c) every inventory row's status is implemented or proposed; the Fallback table names a fallback function for every
 *   annotated call site (keyed <file>#<decision point id>; the name is checked for shape, not resolved).
 * The detector reads gp's MEASURED vocabulary (gp 0.1.0 on this host: `gp --version` names protocol graphpolicy.rpc.v1,
 * `gp inspect errors --json` answers schema graphpolicy.cli.v1 with GP_E_ registry codes, and `gp rpc --stdio` replies
 * gp.rpc.reply/v1 with gp.rpc.error/v1 and GP_RPC_ codes). The binary shape reads gp in a command line at the
 * enumerated boundaries: before it the start, whitespace, / or \, ; & | ( ` " ' or =, after it the end, whitespace, \,
 * ; & | ) < > ` " ', in any letter case, with or without .exe, .cmd or .ps1 (respin #1: refusal U2 and finding F3).
 * The audit document is judged in its RENDERED view through the landed census binding (docsSection and sectionTables
 * of test/helpers/census.ts): a section renders once under the level-1 AUDIT_TITLE and ends at the next level-1 or
 * level-2 heading, carries no HTML, and renders exactly one table, so a table hidden in an HTML comment or a code
 * block (nested fences included) or moved under another level-1 heading is a finding (respin #1: refusal U1). A cell's
 * value is read as the cell renders on its own, so a value written as a reference-style link (its definition lies
 * outside the cell) reads as its source and matches nothing: fail-closed. A field is empty when its rendered text, on
 * its own or in the document (reference-style links resolved through the document's link reference definitions, as
 * the binding's own lex renders the cell), shows no letter, number, punctuation or symbol (BLANK_FILLERS aside), so an
 * empty reference-style link or image is empty (wb-66f7: gate F1 K01-K04 and review P2 of wb-1xvp.3 cut #2).
 * A gp-decision-point comment inside a nested block, or trailing a later statement on the literal's line,
 * annotates that block or statement, not the call site (respin #1: finding F6). Every comment is read wherever it
 * stands between tokens, so a marker after a comma, a parenthesis, the = of a declaration, a property's colon or a
 * keyword is placed by the same rule (wb-rdv6: gate F5, the B06 over-refusal); one that trails code on the line above
 * the statement - a previous statement, or the opening of the enclosing function, block or literal - annotates that
 * code, never the statement below it (gate A03).
 * Residuals (named, each pinned by a quiet row in RESIDUALS): a gp binary named only at run time (configuration or
 * environment), a binary name built by concatenation, the caller of a local gp wrapper (the wrapper's own literal
 * is the call site), a gp name the shell assembles from quoted or escaped parts, and shell grammar outside the
 * enumerated boundary sets (wb-66f7, gate E11-E18: a parameter expansion's default or assigned value, a case pattern's
 * closing parenthesis, an IFS expansion, a brace expansion, a PowerShell script block, the caret escape of cmd.exe, a
 * gp.bat shim) are not detected. Attribution residuals (ONE named mechanism-level family, each measured member pinned
 * by a row in MISATTRIBUTED that reads today's credit; wb-66f7, gate B01-B03; wb-lx6m, wb-rdv6 gate F1 and F7; wb-2xd5,
 * wb-lx6m gate F1-F3): the rule (decisionPointsOf in test/helpers/gp-control-loop-audit.ts) credits the call site with
 * every marker in a comment that starts at or after the full start of the UNIT that holds the literal (its leading
 * comments included) and on or above the literal's own line, except a comment inside a MEMBER HOLDER nested in the
 * unit, one on the line where the unit's full start lies when that line holds text before the comment and the unit's
 * first token is on a later line (gate A03), and one past the unit's end other than the unit's own trailing comment
 * (gate A02) - whatever expression or sub-statement the marker annotates. The member holders are exactly (holdsMembers)
 * a source file, block, module block, case clause, default clause, class-like node (declaration or expression), object
 * literal, interface, type literal and enum. A nested holder's span runs from its first token to its end, so a nested
 * class expression is excluded whole, its head (class keyword, name, type parameters, heritage clause) included, while
 * a switch's case block is no holder, so in a unit that holds the switch a marker between the case block's opening
 * brace and its first clause is credited. The unit is the child of the literal's nearest member holder on the path to
 * the literal: a statement (of a source file, block, module block, case or default clause), a case clause's label, a
 * member of a class, object literal, interface, type literal or enum, or a class's decorator, type parameter or heritage
 * clause, or an interface's type parameter or heritage clause. So a marker annotating ANOTHER expression or
 * sub-statement of that unit, before the literal or after it on its line, is credited to the call site. The measured
 * members, as examples (the list is not closed; each pinned member has its own row): an expression-bodied arrow's
 * body, a nested call's or array literal's argument or element, a preceding argument's comma, operator, keyword (as,
 * new, typeof, await, satisfies, void, delete, yield) or type syntax, a nested arrow's or function's parameter list or
 * return type, an earlier declarator, a ternary's first branch, an if statement's blockless then branch, a do
 * statement's body, a loop's header or condition, a computed property key, a class member's decorator call, a switch's
 * case block before its first clause, an earlier part of an enum, interface or type-literal member, and a comment after
 * the statement's end that annotates a later statement on its line. wb-rdv6 reads the comments after punctuation and
 * keywords too, which made most of these members visible; RES-13..18 pin six, RES-19..43 the rest of the wb-rdv6 gate's
 * PREP LEG 2 corpus verbatim (every probe of it that reads a misattribution and is credited), RES-44..58 seat-found
 * kinds (RES-57 and RES-58 at a class member and an object property), RES-59..62 the case-block region and the enum,
 * interface and type-literal member units (the wb-lx6m gate's G-B05 and G-B08 verbatim, RES-61 and RES-62 seat-found),
 * RES-63..79 the wb-lx6m gate's PREP LEG 2 G-C probes verbatim (its G-C14, whose marker stands before the blockless body
 * that holds the literal, is a correct credit and is pinned in ANNOTATED). UNANNOTATED pins the family's boundary:
 * wb-lx6m's rows at a nested type literal and class body, wb-2xd5's at a nested class expression's head (gate G-B01,
 * G-B02, G-B03, G-B07), a case and a default clause of the switch that holds the literal (G-B04, G-B06), a nested object
 * literal (G-A02) and a module block, and at a unit that is a class's heritage clause, a case clause's label, or an
 * interface or enum member, which a marker above the class, clause, interface or enum does not reach.
 * Rule 16: the judged tables live in test/helpers/gp-control-loop-audit-cases.ts; the frozen-shape row pins every row's
 * table/id:pin count, and the out-of-file anchor test/fixtures/gp-control-loop-audit-roster.json (the hk9l/5jha roster
 * pattern) carries every judged row (table, id, label, the SHA-256 of each pin), the residual families and every
 * registered test title, judged by the last row of this file in order and both ways.
 * The day a cut ships the audit, the two absence rows below flip by design (the document exists, and gp is measured).
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  AUDIT_DOC,
  AUDIT_TITLE,
  type AuditInputs,
  auditFindings,
  BLANK_FILLERS,
  callSites,
  DECISION_POINT_FIELDS,
  exportedNames,
  FINDING_CLASSES,
  firstLine,
  INVENTORY_STATUSES,
  LIFECYCLE_STAGES,
  SECTION_COLUMNS,
  settingsKeys,
} from "./helpers/gp-control-loop-audit.js";
import {
  ANNOTATED,
  CALL_SITES,
  FALSIFIERS,
  type Fixture,
  HEADERS,
  type JudgedRow,
  MEASURED,
  MISATTRIBUTED,
  MODULE,
  NOT_CALL_SITES,
  RESIDUALS,
  ROWS,
  renderDoc,
  SECTION_NAMES,
  SETTINGS,
  SOURCE,
  STAGES,
  UNANNOTATED,
  VALID,
  withRows,
} from "./helpers/gp-control-loop-audit-cases.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

/** Every module under `tree` (repo-relative, e.g. "src"), keyed by repo-relative path. */
function readTree(tree: string): Map<string, string> {
  const files = new Map<string, string>();
  for (const entry of readdirSync(join(ROOT, tree), { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !/\.(?:[cm]?[jt]s|[jt]sx)$/.test(entry.name)) continue;
    const path = join(entry.parentPath, entry.name);
    files.set(relative(ROOT, path).split("\\").join("/"), readFileSync(path, "utf8"));
  }
  return files;
}

/** `gp --version` on this host. The live judge reaches it only once the audit carries a well-formed Dependencies table. */
const gpVersion = (): string => execFileSync("gp", ["--version"], { encoding: "utf8", timeout: 30_000 });

/** The live judge's inputs: the real src tree, the real audit path, and `measure` for the gp version line. */
function liveInputs(tree: ReadonlyMap<string, string>, measure: () => string): AuditInputs {
  const docPath = join(ROOT, AUDIT_DOC);
  return {
    callSites: callSites(tree),
    doc: existsSync(docPath) ? readFileSync(docPath, "utf8") : undefined,
    exportsOf: (module) => {
      const text = tree.get(module);
      return text === undefined ? undefined : exportedNames(text, module);
    },
    measuredGpVersion: () => firstLine(measure()),
    settingsKeys: () => settingsKeys(tree.get("src/settings.ts") ?? ""),
  };
}

const sitesOf = (text: string): string[] => callSites(new Map([["src/x.ts", text]])).map((site) => `${site.line}:${site.shape}:${site.text}`);
const pointsOf = (text: string): (readonly string[])[] => callSites(new Map([["src/x.ts", text]])).map((site) => site.decisionPoints);

describe("today's absence (wb-1xvp.3: the gating artifact is unshipped and Pi pins it)", () => {
  const tree = readTree("src");

  it("src/ carries no gp call site: the census over every src module is empty", () => {
    expect(tree.size).toBeGreaterThan(50);
    expect(tree.has("src/settings.ts")).toBe(true);
    expect(callSites(tree)).toEqual([]);
  });

  it("the census is not blind: the real rf spawn site, read as a gp spawn, is found at its own line and names no decision point", () => {
    const file = "src/workbench/providers/reactivefiber.ts";
    const text = tree.get(file) ?? "";
    const spawns = [...text.matchAll(/spawn\(\s*"rf"\s*,/g)];
    expect(spawns.length, `${file} no longer spawns "rf" by a literal; point this instrument at another real spawn site`).toBeGreaterThan(0);
    const lines = spawns.map((match) => text.slice(0, match.index).split("\n").length);
    const sites = callSites(new Map([[file, text.replace(/spawn\(\s*"rf"\s*,/g, 'spawn("gp",')]]));
    expect(sites).toEqual(lines.map((line) => ({ file, line, shape: "binary", text: "gp", decisionPoints: [] })));
  });

  it("the census reads string text only: the src modules that spell the word gp outside any string (today the general-purpose agent in src/agent-types.ts) hold no call site", () => {
    const spelled = [...tree].filter(([, text]) => /\bgp\b/.test(text));
    expect(spelled.map(([file]) => file)).toContain("src/agent-types.ts");
    expect(callSites(new Map(spelled))).toEqual([]);
  });

  it("docs/workbench/control-loop-audit.md does not exist yet: the machine audit and its documentation are unshipped", () => {
    expect(AUDIT_DOC).toBe("docs/workbench/control-loop-audit.md");
    expect(existsSync(join(ROOT, AUDIT_DOC))).toBe(false);
  });

  it("the live judge reads no finding, and with no audit document it never measures gp", () => {
    let measured = 0;
    const findings = auditFindings(
      liveInputs(tree, () => {
        measured++;
        return gpVersion();
      }),
    );
    expect(findings).toEqual([]);
    expect(measured).toBe(0);
  });
});

describe("what counts as a gp call site (acceptance (a): string text through the TypeScript parser)", () => {
  it.each(CALL_SITES)("%s is a call site", (_name, text, expected) => {
    expect(sitesOf(text)).toEqual(expected);
  });

  it.each(NOT_CALL_SITES)("%s is not a call site", (_name, text) => {
    expect(sitesOf(text)).toEqual([]);
  });

  it.each(RESIDUALS)("residual %s stays quiet (named, not detected)", (_name, text) => {
    expect(sitesOf(text)).toEqual([]);
  });

  it("orders sites by file, then line, keys each by its path, and reads .tsx modules as TSX (JSX text with an apostrophe is no string)", () => {
    const files = new Map([
      ["src/b.ts", 'spawn("gp", []);'],
      ["src/a.ts", '\n\nconst p = "graphpolicy.rpc.v1";'],
      ["src/c.tsx", "export const View = () => <p>don't {run(\"gp\")}</p>;"],
      // Read as TS, the apostrophe would open a string holding " gp "; read as TSX it is JSX text, no string.
      ["src/d.tsx", "export const Hint = () => <p>don't run gp here</p>;"],
    ]);
    expect(callSites(files).map((site) => `${site.file}:${site.line}:${site.shape}`)).toEqual(["src/a.ts:3:named", "src/b.ts:1:binary", "src/c.tsx:1:binary"]);
  });
});

describe("each gp call site names its audited decision point (gp-decision-point comments)", () => {
  it.each(ANNOTATED)("%s names it", (_name, text, expected) => {
    expect(pointsOf(text)).toEqual(expected);
  });

  it.each(UNANNOTATED)("%s does not name one", (_name, text) => {
    expect(pointsOf(text)).toEqual([[]]);
  });

  it.each(MISATTRIBUTED)("residual %s (named, not cured: today's credit is pinned)", (_name, text, expected) => {
    expect(pointsOf(text)).toEqual(expected);
  });

  it("reads each module's own comments: the unannotated module read first lends none of its comments to the next (wb-rdv6)", () => {
    const files = new Map([
      ["src/a.ts", 'spawn("gp", []);'],
      ["src/b.ts", '// gp-decision-point: DP-01\nspawn("gp", []);'],
    ]);
    expect(callSites(files).map((site) => `${site.file}:${site.decisionPoints.join(",")}`)).toEqual(["src/a.ts:", "src/b.ts:DP-01"]);
  });
});

function judge(fixture: Fixture = {}): string[] {
  const files = new Map([[MODULE, fixture.source ?? SOURCE]]);
  return auditFindings({
    callSites: callSites(files),
    doc: "doc" in fixture ? fixture.doc : renderDoc(),
    exportsOf: (module) => {
      const text = files.get(module);
      return text === undefined ? undefined : exportedNames(text, module);
    },
    measuredGpVersion: () => MEASURED,
    settingsKeys: () => fixture.settings ?? SETTINGS,
  });
}
describe("the audit judge (acceptance (a)-(c)): the control is clean and each falsifier reads exactly its findings", () => {
  it("control: an audit covering all eleven stages, with an annotated call site, an exported entrypoint, the measured gp version, the schema's keys, a fallback and a two-status inventory, reads no finding", () => {
    const sites = callSites(new Map([[MODULE, SOURCE]]));
    expect(sites).toEqual([{ file: MODULE, line: 3, shape: "binary", text: "gp", decisionPoints: ["DP-02"] }]);
    expect(judge()).toEqual([]);
  });

  it("an audit beside a tree with no call site is still judged: the control reads clean, and a defect in it is a finding before any wiring", () => {
    const quiet = "export const selectWork = (): undefined => undefined;\n";
    expect(judge({ source: quiet })).toEqual([]);
    const planned = withRows("Inventory", [["adaptive concurrency", "planned"]]);
    expect(judge({ source: quiet, doc: planned })).toEqual(["inventory-status-invalid: adaptive concurrency -> planned"]);
  });

  it("with no audit document and no call site there is nothing to read: no finding, and neither gp nor the settings schema is read", () => {
    const inputs: AuditInputs = {
      callSites: [],
      doc: undefined,
      exportsOf: () => undefined,
      measuredGpVersion: () => {
        throw new Error("measured");
      },
      settingsKeys: () => {
        throw new Error("read");
      },
    };
    expect(auditFindings(inputs)).toEqual([]);
  });

  it.each(FALSIFIERS)("%s", (_name, fixture, expected) => {
    expect(judge(fixture)).toEqual(expected);
  });

  it("the falsifiers cover every finding class the judge declares, and every finding they read is of a declared class", () => {
    const read = FALSIFIERS.flatMap(([, fixture]) => judge(fixture)).map((finding) => finding.split(":", 1)[0]);
    expect([...new Set(read)].sort()).toEqual([...FINDING_CLASSES].sort());
    expect(new Set(FINDING_CLASSES).size).toBe(FINDING_CLASSES.length);
  });
});

describe("the eleven lifecycle stages (README.md:89-99@6a251bf73af5): every stage needs a decision point", () => {
  it.each(STAGES)("README.md:%i stage %i (%s) uncovered is a finding", (_line, stage, text) => {
    const rows = VALID["Decision points"].filter((_row, index) => index !== stage - 1);
    // The fixture's call site cites DP-02; when stage 2 is the one dropped, it cites DP-01 instead.
    const source = stage === 2 ? SOURCE.replace("DP-02", "DP-01") : SOURCE;
    const doc = withRows("Decision points", rows);
    expect(judge({ source, doc: stage === 2 ? doc.replace(`${MODULE}#DP-02`, `${MODULE}#DP-01`) : doc })).toEqual([`stage-uncovered: ${stage} ${text}`]);
  });

  it("the helper's stage list is the README's eleven stages, verbatim and in order", () => {
    expect(LIFECYCLE_STAGES).toEqual(STAGES.map(([, , text]) => text));
  });
});

describe("the audit contract's frozen shape (the document a gp-wiring cut must ship first)", () => {
  it("names the title, the sections, their columns, the five decision-point fields, the two inventory statuses and the blank fillers by value", () => {
    expect(AUDIT_TITLE).toBe("Pi control-loop audit");
    expect(renderDoc().split("\n", 1)).toEqual([`# ${AUDIT_TITLE}`]);
    expect(BLANK_FILLERS).toEqual([0x115f, 0x1160, 0x3164, 0xffa0, 0x2800]);
    expect(SECTION_COLUMNS).toEqual(SECTION_NAMES.map((name) => [name, HEADERS[name]]));
    expect(DECISION_POINT_FIELDS).toEqual(["policy", "inputs", "authority", "outcomes", "current fixed rule"]);
    expect(INVENTORY_STATUSES).toEqual(["implemented", "proposed"]);
  });

  it("each-liveness: every it.each table holds its pinned rows under distinct names, so none can empty or thin unseen", () => {
    const tables: ReadonlyArray<readonly [string, readonly (readonly unknown[])[], number]> = [
      ["CALL_SITES", CALL_SITES, 32],
      ["NOT_CALL_SITES", NOT_CALL_SITES, 9],
      ["RESIDUALS", RESIDUALS, 12],
      ["ANNOTATED", ANNOTATED, 16],
      ["UNANNOTATED", UNANNOTATED, 26],
      ["MISATTRIBUTED", MISATTRIBUTED, 67],
      ["FALSIFIERS", FALSIFIERS, 55],
      ["STAGES", STAGES, 11],
    ];
    for (const [name, rows, size] of tables) {
      expect(rows, name).toHaveLength(size);
      expect(new Set(rows.map((row) => String(row[0]))).size, name).toBe(size);
    }
  });

  it("rule 16: every judged table is frozen at its measured row and pin shape (table/id:pin count)", () => {
    expect(ROWS.map((entry) => `${entry.table}/${entry.id}:${entry.pins.length}`)).toEqual([
      "CALL_SITES/CALL_SITES-01:2", "CALL_SITES/CALL_SITES-02:2", "CALL_SITES/CALL_SITES-03:2", "CALL_SITES/CALL_SITES-04:2", "CALL_SITES/CALL_SITES-05:2", "CALL_SITES/CALL_SITES-06:2", "CALL_SITES/CALL_SITES-07:2", "CALL_SITES/CALL_SITES-08:2", "CALL_SITES/CALL_SITES-09:2", "CALL_SITES/CALL_SITES-10:2", "CALL_SITES/CALL_SITES-11:2", "CALL_SITES/CALL_SITES-12:2", "CALL_SITES/CALL_SITES-13:2", "CALL_SITES/CALL_SITES-14:2", "CALL_SITES/CALL_SITES-15:2", "CALL_SITES/CALL_SITES-16:2", "CALL_SITES/CALL_SITES-17:2", "CALL_SITES/CALL_SITES-18:3", "CALL_SITES/CALL_SITES-19:2", "CALL_SITES/CALL_SITES-20:2", "CALL_SITES/CALL_SITES-21:2", "CALL_SITES/CALL_SITES-22:2", "CALL_SITES/CALL_SITES-23:2", "CALL_SITES/CALL_SITES-24:2", "CALL_SITES/CALL_SITES-25:2", "CALL_SITES/CALL_SITES-26:2", "CALL_SITES/CALL_SITES-27:2", "CALL_SITES/CALL_SITES-28:9", "CALL_SITES/CALL_SITES-29:2", "CALL_SITES/CALL_SITES-30:2", "CALL_SITES/CALL_SITES-31:3", "CALL_SITES/CALL_SITES-32:3",
      "NOT_CALL_SITES/NOT_CALL_SITES-01:1", "NOT_CALL_SITES/NOT_CALL_SITES-02:1", "NOT_CALL_SITES/NOT_CALL_SITES-03:1", "NOT_CALL_SITES/NOT_CALL_SITES-04:1", "NOT_CALL_SITES/NOT_CALL_SITES-05:1", "NOT_CALL_SITES/NOT_CALL_SITES-06:1", "NOT_CALL_SITES/NOT_CALL_SITES-07:1", "NOT_CALL_SITES/NOT_CALL_SITES-08:1", "NOT_CALL_SITES/NOT_CALL_SITES-09:1",
      "RESIDUALS/RESIDUALS-01:1", "RESIDUALS/RESIDUALS-02:1", "RESIDUALS/RESIDUALS-03:1", "RESIDUALS/RESIDUALS-04:1", "RESIDUALS/RESIDUALS-05:1", "RESIDUALS/RESIDUALS-06:1", "RESIDUALS/RESIDUALS-07:1", "RESIDUALS/RESIDUALS-08:1", "RESIDUALS/RESIDUALS-09:1", "RESIDUALS/RESIDUALS-10:1", "RESIDUALS/RESIDUALS-11:1", "RESIDUALS/RESIDUALS-12:1",
      "ANNOTATED/ANNOTATED-01:2", "ANNOTATED/ANNOTATED-02:2", "ANNOTATED/ANNOTATED-03:2", "ANNOTATED/ANNOTATED-04:2", "ANNOTATED/ANNOTATED-05:2", "ANNOTATED/ANNOTATED-06:2", "ANNOTATED/ANNOTATED-07:2", "ANNOTATED/ANNOTATED-08:2", "ANNOTATED/ANNOTATED-09:2", "ANNOTATED/ANNOTATED-10:2", "ANNOTATED/ANNOTATED-11:2", "ANNOTATED/ANNOTATED-12:2", "ANNOTATED/ANNOTATED-13:2", "ANNOTATED/ANNOTATED-14:2", "ANNOTATED/ANNOTATED-15:2", "ANNOTATED/ANNOTATED-16:2",
      "UNANNOTATED/UNANNOTATED-01:1", "UNANNOTATED/UNANNOTATED-02:1", "UNANNOTATED/UNANNOTATED-03:1", "UNANNOTATED/UNANNOTATED-04:1", "UNANNOTATED/UNANNOTATED-05:1", "UNANNOTATED/UNANNOTATED-06:1", "UNANNOTATED/UNANNOTATED-07:1", "UNANNOTATED/UNANNOTATED-08:1", "UNANNOTATED/UNANNOTATED-09:1", "UNANNOTATED/UNANNOTATED-10:1", "UNANNOTATED/UNANNOTATED-11:1", "UNANNOTATED/UNANNOTATED-12:1", "UNANNOTATED/UNANNOTATED-13:1", "UNANNOTATED/UNANNOTATED-14:1", "UNANNOTATED/UNANNOTATED-15:1", "UNANNOTATED/UNANNOTATED-16:1", "UNANNOTATED/UNANNOTATED-17:1", "UNANNOTATED/UNANNOTATED-18:1", "UNANNOTATED/UNANNOTATED-19:1", "UNANNOTATED/UNANNOTATED-20:1", "UNANNOTATED/UNANNOTATED-21:1", "UNANNOTATED/UNANNOTATED-22:1", "UNANNOTATED/UNANNOTATED-23:1", "UNANNOTATED/UNANNOTATED-24:1", "UNANNOTATED/UNANNOTATED-25:1", "UNANNOTATED/UNANNOTATED-26:1",
      "MISATTRIBUTED/MISATTRIBUTED-01:2", "MISATTRIBUTED/MISATTRIBUTED-02:2", "MISATTRIBUTED/MISATTRIBUTED-03:2", "MISATTRIBUTED/MISATTRIBUTED-04:2", "MISATTRIBUTED/MISATTRIBUTED-05:2", "MISATTRIBUTED/MISATTRIBUTED-06:2", "MISATTRIBUTED/MISATTRIBUTED-07:2", "MISATTRIBUTED/MISATTRIBUTED-08:2", "MISATTRIBUTED/MISATTRIBUTED-09:2", "MISATTRIBUTED/MISATTRIBUTED-10:2", "MISATTRIBUTED/MISATTRIBUTED-11:2", "MISATTRIBUTED/MISATTRIBUTED-12:2", "MISATTRIBUTED/MISATTRIBUTED-13:2", "MISATTRIBUTED/MISATTRIBUTED-14:2", "MISATTRIBUTED/MISATTRIBUTED-15:2", "MISATTRIBUTED/MISATTRIBUTED-16:2", "MISATTRIBUTED/MISATTRIBUTED-17:2", "MISATTRIBUTED/MISATTRIBUTED-18:2", "MISATTRIBUTED/MISATTRIBUTED-19:2", "MISATTRIBUTED/MISATTRIBUTED-20:2", "MISATTRIBUTED/MISATTRIBUTED-21:2", "MISATTRIBUTED/MISATTRIBUTED-22:2", "MISATTRIBUTED/MISATTRIBUTED-23:2", "MISATTRIBUTED/MISATTRIBUTED-24:2", "MISATTRIBUTED/MISATTRIBUTED-25:2", "MISATTRIBUTED/MISATTRIBUTED-26:2", "MISATTRIBUTED/MISATTRIBUTED-27:2", "MISATTRIBUTED/MISATTRIBUTED-28:2", "MISATTRIBUTED/MISATTRIBUTED-29:2", "MISATTRIBUTED/MISATTRIBUTED-30:2", "MISATTRIBUTED/MISATTRIBUTED-31:2", "MISATTRIBUTED/MISATTRIBUTED-32:2", "MISATTRIBUTED/MISATTRIBUTED-33:2", "MISATTRIBUTED/MISATTRIBUTED-34:2", "MISATTRIBUTED/MISATTRIBUTED-35:2", "MISATTRIBUTED/MISATTRIBUTED-36:2", "MISATTRIBUTED/MISATTRIBUTED-37:2", "MISATTRIBUTED/MISATTRIBUTED-38:2", "MISATTRIBUTED/MISATTRIBUTED-39:2", "MISATTRIBUTED/MISATTRIBUTED-40:2", "MISATTRIBUTED/MISATTRIBUTED-41:2", "MISATTRIBUTED/MISATTRIBUTED-42:2", "MISATTRIBUTED/MISATTRIBUTED-43:2", "MISATTRIBUTED/MISATTRIBUTED-44:2", "MISATTRIBUTED/MISATTRIBUTED-45:2", "MISATTRIBUTED/MISATTRIBUTED-46:2", "MISATTRIBUTED/MISATTRIBUTED-47:2", "MISATTRIBUTED/MISATTRIBUTED-48:2", "MISATTRIBUTED/MISATTRIBUTED-49:2", "MISATTRIBUTED/MISATTRIBUTED-50:2", "MISATTRIBUTED/MISATTRIBUTED-51:2", "MISATTRIBUTED/MISATTRIBUTED-52:2", "MISATTRIBUTED/MISATTRIBUTED-53:2", "MISATTRIBUTED/MISATTRIBUTED-54:2", "MISATTRIBUTED/MISATTRIBUTED-55:2", "MISATTRIBUTED/MISATTRIBUTED-56:2", "MISATTRIBUTED/MISATTRIBUTED-57:2", "MISATTRIBUTED/MISATTRIBUTED-58:2", "MISATTRIBUTED/MISATTRIBUTED-59:2", "MISATTRIBUTED/MISATTRIBUTED-60:2", "MISATTRIBUTED/MISATTRIBUTED-61:2", "MISATTRIBUTED/MISATTRIBUTED-62:2", "MISATTRIBUTED/MISATTRIBUTED-63:2", "MISATTRIBUTED/MISATTRIBUTED-64:2", "MISATTRIBUTED/MISATTRIBUTED-65:2", "MISATTRIBUTED/MISATTRIBUTED-66:2", "MISATTRIBUTED/MISATTRIBUTED-67:2",
      "FALSIFIERS/FALSIFIERS-01:2", "FALSIFIERS/FALSIFIERS-02:2", "FALSIFIERS/FALSIFIERS-03:3", "FALSIFIERS/FALSIFIERS-04:3", "FALSIFIERS/FALSIFIERS-05:3", "FALSIFIERS/FALSIFIERS-06:3", "FALSIFIERS/FALSIFIERS-07:2", "FALSIFIERS/FALSIFIERS-08:3", "FALSIFIERS/FALSIFIERS-09:3", "FALSIFIERS/FALSIFIERS-10:2", "FALSIFIERS/FALSIFIERS-11:3", "FALSIFIERS/FALSIFIERS-12:2", "FALSIFIERS/FALSIFIERS-13:2", "FALSIFIERS/FALSIFIERS-14:2", "FALSIFIERS/FALSIFIERS-15:2", "FALSIFIERS/FALSIFIERS-16:2", "FALSIFIERS/FALSIFIERS-17:2", "FALSIFIERS/FALSIFIERS-18:2", "FALSIFIERS/FALSIFIERS-19:2", "FALSIFIERS/FALSIFIERS-20:2", "FALSIFIERS/FALSIFIERS-21:2", "FALSIFIERS/FALSIFIERS-22:2", "FALSIFIERS/FALSIFIERS-23:2", "FALSIFIERS/FALSIFIERS-24:2", "FALSIFIERS/FALSIFIERS-25:2", "FALSIFIERS/FALSIFIERS-26:2", "FALSIFIERS/FALSIFIERS-27:2", "FALSIFIERS/FALSIFIERS-28:2", "FALSIFIERS/FALSIFIERS-29:2", "FALSIFIERS/FALSIFIERS-30:3", "FALSIFIERS/FALSIFIERS-31:3", "FALSIFIERS/FALSIFIERS-32:3", "FALSIFIERS/FALSIFIERS-33:2", "FALSIFIERS/FALSIFIERS-34:2", "FALSIFIERS/FALSIFIERS-35:2", "FALSIFIERS/FALSIFIERS-36:3", "FALSIFIERS/FALSIFIERS-37:2", "FALSIFIERS/FALSIFIERS-38:3", "FALSIFIERS/FALSIFIERS-39:3", "FALSIFIERS/FALSIFIERS-40:3", "FALSIFIERS/FALSIFIERS-41:3", "FALSIFIERS/FALSIFIERS-42:1", "FALSIFIERS/FALSIFIERS-43:3", "FALSIFIERS/FALSIFIERS-44:1", "FALSIFIERS/FALSIFIERS-45:1", "FALSIFIERS/FALSIFIERS-46:3", "FALSIFIERS/FALSIFIERS-47:3", "FALSIFIERS/FALSIFIERS-48:3", "FALSIFIERS/FALSIFIERS-49:3", "FALSIFIERS/FALSIFIERS-50:3", "FALSIFIERS/FALSIFIERS-51:3", "FALSIFIERS/FALSIFIERS-52:1", "FALSIFIERS/FALSIFIERS-53:1", "FALSIFIERS/FALSIFIERS-54:2", "FALSIFIERS/FALSIFIERS-55:2",
      "STAGES/STAGES-01:1", "STAGES/STAGES-02:1", "STAGES/STAGES-03:1", "STAGES/STAGES-04:1", "STAGES/STAGES-05:1", "STAGES/STAGES-06:1", "STAGES/STAGES-07:1", "STAGES/STAGES-08:1", "STAGES/STAGES-09:1", "STAGES/STAGES-10:1", "STAGES/STAGES-11:1",
    ]);
  });
});

describe("the live readers the judge uses once the audit exists (pinned on today's tree)", () => {
  const settings = readFileSync(join(ROOT, "src/settings.ts"), "utf8");

  it("exportedNames reads src/settings.ts's own export surface: loadSettings is an export, the module-private sanitize is not", () => {
    const names = exportedNames(settings, "src/settings.ts");
    for (const name of ["loadSettings", "saveSettings", "applySettings", "SubagentsSettings", "WorkbenchSettings"]) expect(names.has(name), name).toBe(true);
    expect(names.has("sanitize")).toBe(false);
    expect(settings).toContain("function sanitize(");
  });

  it("exportedNames covers export lists, renames and default, and does not follow export-star", () => {
    const text = 'const a = 1;\nconst b = 2;\nexport { a, b as c };\nexport default a;\nexport * from "./other.js";\nexport enum E { X }\nexport type T = string;\n';
    expect([...exportedNames(text, "src/m.ts")].sort()).toEqual(["E", "T", "a", "c", "default"]);
  });

  it("settingsKeys reads the SubagentsSettings interface tree of src/settings.ts as dotted keys", () => {
    const keys = settingsKeys(settings);
    for (const key of ["maxConcurrent", "maxConcurrentForeground", "defaultMaxTurns", "workbench.model", "workbench.capabilityGrants", "workbench.roles"]) expect(keys, key).toContain(key);
    expect(keys).not.toContain("workbench");
    expect(keys.some((key) => key.startsWith("workbench.roles."))).toBe(false);
    expect(new Set(keys).size).toBe(keys.length);
    expect(keys.length).toBeGreaterThan(20);
  });

  it("settingsKeys expands a property typed by a local interface, follows extends, and keeps any other type as one leaf", () => {
    const text = [
      "interface Base { shared?: boolean }",
      "interface Inner { mode?: 'a' | 'b'; depth?: number }",
      "export interface SubagentsSettings extends Base { inner?: Inner; table?: Record<string, Inner>; plain?: string }",
    ].join("\n");
    expect(settingsKeys(text)).toEqual(["shared", "inner.mode", "inner.depth", "table", "plain"]);
    expect(() => settingsKeys("interface Other {}")).toThrowError("settings module declares no SubagentsSettings interface");
  });

  it("firstLine echoes the producer's version line verbatim, trimmed of its newline", () => {
    expect(firstLine(`${MEASURED}\n`)).toBe(MEASURED);
    expect(firstLine("gp 0.2.0\nextra\n")).toBe("gp 0.2.0");
    expect(firstLine("gp 0.2.0 \r\nextra\r\n")).toBe("gp 0.2.0");
  });
});

interface Roster {
  readonly rows: readonly JudgedRow[];
  readonly residuals: readonly string[];
  readonly tests: readonly string[];
}
const ROSTER = "test/fixtures/gp-control-loop-audit-roster.json";
const readRoster = (): Roster => JSON.parse(readFileSync(join(ROOT, ROSTER), "utf8")) as Roster;

describe("the roster (the out-of-file anchor test/fixtures/gp-control-loop-audit-roster.json)", () => {
  it("roster: the judged rows, the residual families and every registered test equal the roster, in order and both ways", ({ task }) => {
    const roster = readRoster();
    expect(ROWS, "the judged rows, read now, equal the roster rows exactly and in order").toEqual(roster.rows);
    expect([...RESIDUALS, ...MISATTRIBUTED].map(([name]) => name), "the named residual families equal the roster's").toEqual(roster.residuals);
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map((entry) => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(roster.tests);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
    ).toEqual([]);
    const here = walked.findIndex((entry) => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const unrun = walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state)));
    expect(
      unrun.map((entry) => `${entry.name} | ${entry.mode} | ${entry.state ?? "no result"}`),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
  });
});
