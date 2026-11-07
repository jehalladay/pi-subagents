/**
 * wb-413a [MWI-replay], the Phase 10 delta (the bead's amendment of 2026-11-07T07:06Z; program
 * mechanical-interoperability-audit-2026-11-06, slice PI-4): the replay basis dimensions, EAT-R161 and EAT-R162 as
 * docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md
 * writes them at pi-subagents master b8cd53aa. The acceptance lines this suite pins, verbatim:
 *  - EAT-R161 "The specification (path named in the receipt) lists each dimension with its measurement source and owner;
 *    a test enumerates the Claude host's recorded basis keys and asserts set-equality with the specification's Pi-side
 *    list; a dimension present in the specification but absent from the recorded basis fails; 'effect references' is
 *    either recorded or explicitly deferred with a dated reason in the specification." (adversarial mutant: "Drop
 *    'effect references' from the recorded basis while the specification lists it; the set-equality assertion fails.")
 *  - EAT-R162 "A census test tokenizes the runtime.ts (and journal.ts) replayBasis doc-comment dimension list and the
 *    recorded dimensions of each registered host (the claude-host.ts literal; the local-detached.ts identityDigest keys)
 *    and asserts: every unqualified comment dimension is recorded by every host, every host-specific dimension carries
 *    its host name, and every Claude-host dimension is named; at the pin the test is red ('provider manifest' unqualified
 *    while the Claude host records no provider version; `settings` and `principal` unnamed); after EAT-R017-R019 the
 *    lists grow together." (adversarial mutant: "Keep 'provider manifest' unqualified while the Claude host records no
 *    provider version (or drop `settings` from the comment); the census fails.")
 *
 * Claimed here, each by its rows, and nothing wider:
 *  - EAT-R161, the specification docs/workbench/replay-basis-dimensions.md, read line by line as written. The page holds
 *    no `<` (so no HTML comment, tag or autolink), no code fence (a line opening three backquotes or tildes), no line
 *    opening four spaces or a tab, no setext heading underline (a line of only `=` or only `-`) and no link reference
 *    definition (a line opening `[...]:`). Its one level-1 heading is its first line, and exactly one of its headings
 *    reads "Dimensions", at level 2; a section runs from its heading to the next level-1 or level-2 heading or EOF. Every
 *    page line holding a `|` is a line of the one table in the Dimensions section, with a blank line before the table and
 *    a blank line or EOF after it. Exactly one page line holds "Statement:" and one "Conditions:", each a quote line
 *    opening `- Statement: "` or `- Conditions: "` and closing with `"`, inside the level-1 heading's section
 *    (RB-SPEC-VIEW). The table is written out: its header line, its delimiter row and each of its fourteen rows, every
 *    cell as written, its surrounding spaces trimmed, and the effect references row's status cell by its SHA-256 (it
 *    quotes EAT-R176, and a literal here spelling its words would red the content-state derivation of
 *    test/workbench-tsx-streaming-block-census.test.ts) (RB-SPEC-SHAPE). The two quote lines read exactly as this suite writes them out. Each dimension the statement
 *    quote's parenthesized list names is the dimension of exactly one row, each name the conditions quote gives MW's
 *    half is the dimension or the measurement source of exactly one row, and every row's dimension is one of those names
 *    (RB-SPEC-QUOTE). The rows marked as in the Claude host's basis are, in table order, the option keys a Claude host
 *    built with a distinct value for each of its eight policy options and with replay dependencies holds in its basis,
 *    in basis order, and as a set the same keys, so a marked row the basis does not hold, or a held key no row marks,
 *    reds (RB-SPEC-KEYS); built without replay dependencies the host holds the first eight marked keys alone
 *    (RB-SPEC-KEYS-LEGACY). Each marked row names its option key in its measurement source, a reading's row the module's
 *    reader function too, and every row names Pi or MW as its owner (RB-SPEC-CELLS). The effect references row is not
 *    marked and is deferred with a past date and a reason (RB-SPEC-DEFERRED); the MW half's two names are rows owned by
 *    MW, not marked, owed on wb-1zn2 (RB-SPEC-MW-HALF). The eight policy options this suite reads a basis element by,
 *    written out, are the page's first eight marked keys and the keys of the options it builds that host with
 *    (RB-POLICY-OPTIONS-SHAPE); the three readings' readers, written out, are its last three marked keys, each with the
 *    reader its measurement source names, and the keys of the readings it hands that host (RB-READING-READERS-SHAPE).
 *  - EAT-R162, the WorkflowHost.replayBasis comment of src/workflow/runtime.ts and the WorkflowJournalEntry.basis comment
 *    of src/workflow/journal.ts, each the one comment before its member. The hosts are the bindings src's TypeScript
 *    modules (every .ts, .mts, .cts or .tsx file below src, declaration files included, a directory reached through a
 *    symbolic link not walked) export, in any export form (a re-export read as the binding it names), whose call or
 *    construct signature
 *    returns, directly, as one member of a union or once awaited, a type TypeScript's checker finds assignable to
 *    WorkflowHost (any, unknown and never left out): the legacy, the Claude and the detached host constructors
 *    (RB-HOSTS). The Claude host records the eleven dimensions its claude-host.ts literal holds, each element read as a
 *    property read or a name, the left of `?? null`, or the named keys of the object literals in a spread's array
 *    literals, through parentheses and both arms of a conditional, and any other element, an empty object literal
 *    included, read as unread (RB-RECORDED-claude); the detached host the eight named keys of its local-detached.ts identityDigest object
 *    (RB-RECORDED-detached). The one object createWorkflowHost returns holds replaySafe, no replayBasis and no spread or
 *    other unnamed member (RB-RECORDED-legacy), and the host it builds from inert dependencies carries replaySafe true and
 *    no replayBasis, own or inherited (RB-RECORDED-legacy-built). Each comment reads exactly as this suite writes it out
 *    (RB-DOC-TEXT-runtime, RB-DOC-TEXT-journal); names, host by host, exactly those dimensions in that order, and the
 *    legacy host as recording none (RB-DOC-runtime, RB-DOC-journal); holds no phrase of the dimension table outside the
 *    names of its host lists, the lists' parenthesized notes included, nor anywhere one of the three dimensions EAT-R161
 *    names that no host records here (RB-UNQUALIFIED-runtime, RB-UNQUALIFIED-journal); and the two comments name the
 *    same three lists (RB-DOC-MIRROR). The two comments this suite reads, written out by path, interface and member, are
 *    in the only src modules whose text names a host list ("the <host> host records:" or "the <host> host records none",
 *    in any case, a line break and the `*` or `//` opening a comment line read as a space), each comment holding every
 *    host list its module's text names (RB-COMMENTS-SHAPE). The three dimensions no host records, written out,
 *    are the page's rows not marked in the Claude host's basis (RB-UNRECORDED-SHAPE), and the dimension table, written
 *    out, is tied to the two hosts' source texts (RB-DIMENSIONS-SHAPE).
 * NOT CLAIMED by this suite: what the basis holds for a given option value (test/workbench-claude-replay-dependencies.test.ts
 * judges it); how a reading is measured (test/workbench-replay-dependency-readers.test.ts and
 * test/workbench-replay-dependencies-wiring.test.ts); the detached host's basis values; a WorkflowHost built anywhere but
 * those three functions, or one a method or a property of an exported object, class or namespace returns; the page's
 * prose outside its table and its two quote lines; that this suite's copies of the two quotes equal
 * ATOMIC-REQUIREMENTS-DELTA.md, which is on pi-subagents master and not on this branch; and a complete joint basis.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import type { AgentManager } from "../src/agent-manager.js";
import { type ClaudeWorkflowHostOptions, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { type ClaudeReplayDependencies, instructionDependency, providerDependency, sourceDependency } from "../src/workbench/replay-dependencies.js";
import { createWorkflowHost } from "../src/workflow/host.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SPEC = "docs/workbench/replay-basis-dimensions.md";
/** The page's one level-1 heading: the section it opens holds the two quote lines. */
const SPEC_TITLE = "Replay basis dimensions: Pi's half of the joint replay-basis specification";
/** Every row here reads files or parses source text; each declares its own time budget (EAT-R168's form). */
const BUDGET = 30_000;
/** RB-HOSTS builds one TypeScript program over src and asks its checker; its own, wider budget. */
const PROGRAM_BUDGET = 120_000;

/* --- EAT-R161: the specification's table ---------------------------------------------------------------------- */

/** One row of the specification's Dimensions table: its cells as written, and each by its column (a basis key's backquotes dropped). */
interface SpecRow {
  readonly cells: readonly string[];
  readonly dimension: string;
  readonly key: string;
  readonly inBasis: string;
  readonly source: string;
  readonly owner: string;
  readonly status: string;
}
/** The Dimensions table: its header line, its delimiter row, its rows, and the page lines it spans, [start, end). */
interface SpecTable {
  readonly start: number;
  readonly end: number;
  readonly header: string;
  readonly rule: string;
  readonly rows: readonly SpecRow[];
}
/** An ATX heading of the page: its line, its level and its text, a closing run of `#` dropped. */
interface Heading {
  readonly index: number;
  readonly level: number;
  readonly text: string;
}
function specText(): string {
  return readFileSync(join(ROOT, SPEC), "utf8");
}
function specLines(): string[] {
  return specText().split("\n");
}
function specHeadings(lines: readonly string[]): Heading[] {
  return lines.flatMap((line, index) => {
    const match = /^ {0,3}(#{1,6})(?:[ \t]+(.*?))?[ \t]*$/.exec(line);
    if (match === null) return [];
    return [{ index, level: (match[1] ?? "").length, text: (match[2] ?? "").replace(/(^|[ \t]+)#+$/, "").trim() }];
  });
}
/**
 * The page lines of the section the one heading reading `title` opens, [start, end): from that heading to the next
 * level-1 or level-2 heading, or EOF. Exactly one heading of the page may read `title`, and at `level`; anything else
 * throws, so every row reading the section reds (the heading is unique before the section is read).
 */
function sectionBounds(lines: readonly string[], title: string, level: number): { readonly start: number; readonly end: number } {
  const headings = specHeadings(lines);
  const own = headings.filter(heading => heading.text === title);
  const heading = own[0];
  if (own.length !== 1 || heading === undefined || heading.level !== level) {
    throw new Error(`${SPEC}: ${own.length} headings read "${title}"; exactly one, at level ${level}, is read`);
  }
  return { start: heading.index, end: headings.find(next => next.index > heading.index && next.level <= 2)?.index ?? lines.length };
}
/** The table in the Dimensions section: its first line opening `| Dimension |`, its delimiter row, and every line after them opening `|`, inside the section. */
function specTable(): SpecTable {
  const lines = specLines();
  const section = sectionBounds(lines, "Dimensions", 2);
  const start = lines.findIndex((line, index) => index > section.start && index < section.end && line.startsWith("| Dimension |"));
  if (start === -1) throw new Error(`${SPEC}: no table in the Dimensions section`);
  const rows: SpecRow[] = [];
  let end = start + 2;
  for (; end < section.end && (lines[end] ?? "").startsWith("|"); end += 1) {
    const cells = (lines[end] ?? "")
      .slice(1, -1)
      .split("|")
      .map(cell => cell.trim());
    const [dimension = "", key = "", inBasis = "", source = "", owner = "", status = ""] = cells;
    rows.push({ cells, dimension, key: key.replace(/^`|`$/g, ""), inBasis, source, owner, status });
  }
  return { start, end, header: lines[start] ?? "", rule: lines[start + 1] ?? "", rows };
}
function specRows(): readonly SpecRow[] {
  return specTable().rows;
}
/** The quoted text of the one line opening `- <label>: "` inside the level-1 heading's section, its closing quotation mark dropped. */
function quoteOf(label: "Statement" | "Conditions"): string {
  const lines = specLines();
  const section = sectionBounds(lines, SPEC_TITLE, 1);
  const opening = `- ${label}: "`;
  const quoted = lines.slice(section.start + 1, section.end).filter(line => line.startsWith(opening));
  const line = quoted[0];
  if (quoted.length !== 1 || line === undefined || !line.endsWith('"')) throw new Error(`${SPEC}: ${quoted.length} quote lines open ${opening} in the level-1 heading's section`);
  return line.slice(opening.length, -1);
}
/** The dimensions the statement quote names: its parenthesized list, split at its semicolons and the existing ones' commas. */
function statementDimensions(): string[] {
  const list = /enumerating every bound dimension \(([^)]*)\)/.exec(quoteOf("Statement"))?.[1] ?? "";
  return list.split("; ").flatMap(part => (part.startsWith("and the existing ") ? part.slice("and the existing ".length).split(", ") : [part]));
}
/** The names of the MW half the conditions quote gives, before its semicolon. */
function mwHalf(): string[] {
  return (/MW's app-local half \(([^;]*);/.exec(quoteOf("Conditions"))?.[1] ?? "").split(", ").filter(name => name !== "");
}
/** The SHA-256 of a text, hex. */
function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}
/** The page line indices from `start` up to `end`. */
function lineRange(start: number, end: number): number[] {
  return Array.from({ length: Math.max(0, end - start) }, (_, offset) => start + offset);
}

/** The Claude host's eight policy options, in the order its basis holds them. */
const POLICY_OPTIONS = ["cwd", "model", "permissionMode", "settingSources", "tools", "roles", "grants", "principal"] as const;
/** A distinct value for each policy option, so each element of the basis matches one option alone. */
const DISTINCT: ClaudeWorkflowHostOptions = {
  cwd: "/rb-spec/cwd",
  model: "rb-spec-model",
  permissionMode: "acceptEdits",
  settingSources: ["local"],
  tools: ["RbSpecTool"],
  roles: { "rb-spec-role": { prompt: "rb spec role" } },
  grants: ["rb-spec:grant"],
  principal: { id: "rb-spec-principal" },
};
const measured = (seed: string) => ({ state: "measured" as const, digest: `sha256:${seed.repeat(64).slice(0, 64)}` });
const READINGS: ClaudeReplayDependencies = { source: measured("a"), instructions: measured("b"), provider: measured("c") };
/** The reader of each reading the replay dependencies carry (src/workbench/replay-dependencies.ts). */
const READING_READERS: Readonly<Record<string, { readonly name: string }>> = {
  "replayDependencies.source": sourceDependency,
  "replayDependencies.instructions": instructionDependency,
  "replayDependencies.provider": providerDependency,
};

/**
 * The option key each element of a Claude host's basis holds, in basis order: a policy element by the option whose value
 * it equals, and the readings element by each of its keys whose reading equals the one handed. Anything else, an object
 * with no key included, is read as unmatched, so it never equals a key the table marks.
 */
function heldKeys(options: ClaudeWorkflowHostOptions): string[] {
  const basis = JSON.parse(createClaudeWorkflowHost(options).replayBasis ?? "[]") as unknown[];
  const readings: Record<string, unknown> = { ...options.replayDependencies };
  return basis.flatMap(element => {
    const option = POLICY_OPTIONS.find(key => options[key] !== undefined && JSON.stringify(options[key]) === JSON.stringify(element));
    if (option !== undefined) return [option];
    if (element !== null && typeof element === "object" && !Array.isArray(element) && Object.keys(element).length > 0) {
      return Object.entries(element).map(([key, value]) => (JSON.stringify(value) === JSON.stringify(readings[key]) ? `replayDependencies.${key}` : `unmatched ${key}`));
    }
    return [`unmatched ${JSON.stringify(element)}`];
  });
}

describe("wb-413a EAT-R161: the Pi-side replay basis dimension list", () => {
  it('RB-SPEC-VIEW: the page holds no `<`, code fence, line opening four spaces or a tab, setext underline or link reference definition; its one level-1 heading is its first line and one heading reads Dimensions, at level 2; every line holding a `|` is a line of the one table, set off by blank lines; one line holds "Statement:" and one "Conditions:", each a quote line under the level-1 heading', () => {
    const lines = specLines();
    expect(specText()).not.toContain("<");
    expect(lines.filter(line => /^ {0,3}(`{3,}|~{3,})/.test(line))).toEqual([]);
    expect(lines.filter(line => /^( {4}|\t)/.test(line))).toEqual([]);
    expect(lines.filter(line => /^ {0,3}(=+|-+)[ \t]*$/.test(line))).toEqual([]);
    expect(lines.filter(line => /^ {0,3}\[[^\]]*\]:/.test(line))).toEqual([]);
    const headings = specHeadings(lines);
    expect(headings.filter(heading => heading.level === 1).map(heading => `${heading.index}|${heading.text}`)).toEqual([`0|${SPEC_TITLE}`]);
    expect(headings.filter(heading => heading.text === "Dimensions").map(heading => heading.level)).toEqual([2]);
    const table = specTable();
    expect(lines.flatMap((line, index) => (line.includes("|") ? [index] : []))).toEqual(lineRange(table.start, table.end));
    expect(lines[table.start - 1]).toBe("");
    expect(lines[table.end] ?? "").toBe("");
    for (const label of ["Statement", "Conditions"] as const) {
      expect(lines.filter(line => line.includes(`${label}:`)), label).toHaveLength(1);
      expect(quoteOf(label), label).not.toBe("");
    }
  }, BUDGET);

  it("RB-SPEC-SHAPE: the specification's table, written out (frozen shape): its header line, its delimiter row and every cell of each row as written, the effect references status by its SHA-256", () => {
    const table = specTable();
    expect(table.header).toBe("| Dimension | Basis key | In the Claude host's basis | Measurement source | Owner | Status |");
    expect(table.rule).toBe("| --- | --- | --- | --- | --- | --- |");
    // The effect references row's status quotes EAT-R176; a literal here spelling its words would red the content-state
    // derivation of test/workbench-tsx-streaming-block-census.test.ts, so that one cell is written out by its SHA-256.
    const written = (row: SpecRow): string => row.cells.map((cell, column) => (row.dimension === "effect references" && column === 5 ? `sha256:${sha256(cell)}` : cell)).join("|");
    expect(table.rows.map(written)).toEqual([
      "cwd|`cwd`|yes|the host option `cwd`|Pi|recorded",
      "model|`model`|yes|the host option `model`|Pi|recorded",
      "permissionMode|`permissionMode`|yes|the host option `permissionMode`|Pi|recorded",
      "settings|`settingSources`|yes|the host option `settingSources`|Pi|recorded",
      "tools|`tools`|yes|the host option `tools`|Pi|recorded",
      "roles|`roles`|yes|the host option `roles`|Pi|recorded",
      "grants|`grants`|yes|the host option `grants`|Pi|recorded",
      "principal|`principal`|yes|the host option `principal`|Pi|recorded",
      "source commit/tree and dirty-file digest|`replayDependencies.source`|yes|`sourceDependency` (src/workbench/replay-dependencies.ts), handed in as the host option `replayDependencies.source`|Pi|recorded",
      "skill/system-instruction bytes|`replayDependencies.instructions`|yes|`instructionDependency` (src/workbench/replay-dependencies.ts), handed in as the host option `replayDependencies.instructions`|Pi|recorded",
      "effective provider/SDK versions and settings|`replayDependencies.provider`|yes|`providerDependency` (src/workbench/replay-dependencies.ts), handed in as the host option `replayDependencies.provider`|Pi|recorded",
      "effect references|none|no|none at this cut|Pi|sha256:b4874af4e9eebca62ff6ff19f153b98cb5ba47c921082a78b553bc010c65dc96",
      "gate-manifest digest|none|no|MW's app-local Forge-manifest digest (EAT-R176 clause (c))|MW|owed on wb-1zn2 (EAT-R176 clause (c), MW-R3)",
      "prompt/config digest|none|no|MW's app-local prompt/config digest (EAT-R176 clause (c))|MW|owed on wb-1zn2 (EAT-R176 clause (c), MW-R3)",
    ]);
  }, BUDGET);

  it("RB-SPEC-QUOTE: the page's two quote lines, written out; each dimension the statement quote names is one row's dimension, each name the conditions quote gives MW's half one row's dimension or measurement source, and every row's dimension one of those names", () => {
    expect(quoteOf("Statement")).toBe(
      "Before any cut claims a complete replay basis for Pi-hosted Mechanical functions, Pi and MW MUST publish one joint replay-basis specification enumerating every bound dimension (source commit/tree and dirty-file digest; skill/system-instruction bytes; effective provider/SDK versions and settings; gate-manifest digest; effect references; and the existing cwd, model, permissionMode, settings, tools, roles, grants, principal) (the rule that an unmeasurable dimension blocks replay is EAT-R020 and is not re-owed); Pi's fingerprint tests MUST reference the specification's dimension list.",
    );
    expect(quoteOf("Conditions")).toBe(
      "Pi publishes the Pi-side dimension list first (landable with wb-413a); 'complete' is claimed only once MW's app-local half (prompt/config digest, Forge-manifest digest; EAT-R176 clause (c), MW-R3) is attached on wb-1zn2; the unlanded wb-413a branch 2f0fedd3 already rebinds the basis and was not inspected or run (K110).",
    );
    const rows = specRows();
    const statement = statementDimensions();
    expect(statement).toEqual([
      "source commit/tree and dirty-file digest",
      "skill/system-instruction bytes",
      "effective provider/SDK versions and settings",
      "gate-manifest digest",
      "effect references",
      "cwd",
      "model",
      "permissionMode",
      "settings",
      "tools",
      "roles",
      "grants",
      "principal",
    ]);
    expect(mwHalf()).toEqual(["prompt/config digest", "Forge-manifest digest"]);
    for (const dimension of statement) expect(rows.filter(row => row.dimension === dimension), dimension).toHaveLength(1);
    // A name of the MW half is its row's dimension or is named by its row's measurement source.
    for (const name of mwHalf()) expect(rows.filter(row => row.dimension === name || row.source.includes(name)), name).toHaveLength(1);
    for (const row of rows) expect(statement.includes(row.dimension) || mwHalf().includes(row.dimension), row.dimension).toBe(true);
  }, BUDGET);

  it("RB-SPEC-KEYS: the rows marked in the Claude host's basis are, in table order and as a set, the keys a host built with distinct policy values and replay dependencies holds in its basis", () => {
    const marked = specRows().filter(row => row.inBasis === "yes").map(row => row.key);
    const held = heldKeys({ ...DISTINCT, replayDependencies: READINGS });
    expect(marked).toEqual(held);
    expect(new Set(marked)).toEqual(new Set(held));
    // Every row is marked yes or no: no third value hides a row from the comparison.
    for (const row of specRows()) expect(["yes", "no"], row.dimension).toContain(row.inBasis);
  }, BUDGET);

  it("RB-SPEC-KEYS-LEGACY: built without replay dependencies, the host's basis holds the first eight marked keys alone", () => {
    const marked = specRows().filter(row => row.inBasis === "yes").map(row => row.key);
    expect(heldKeys(DISTINCT)).toEqual(marked.slice(0, 8));
    expect(marked.slice(8)).toEqual(Object.keys(READING_READERS));
  }, BUDGET);

  it("RB-SPEC-CELLS: each marked row names its option key as a host option in its measurement source, a reading's row its reader, and every row names its owner", () => {
    for (const row of specRows()) {
      expect(row.source, row.dimension).not.toBe("");
      expect(["Pi", "MW"], row.dimension).toContain(row.owner);
      if (row.inBasis !== "yes") continue;
      expect(row.source, row.dimension).toContain(`the host option \`${row.key}\``);
      const reader = READING_READERS[row.key];
      if (reader !== undefined) expect(row.source.startsWith(`\`${reader.name}\` `), `${row.dimension}: ${reader.name}`).toBe(true);
    }
  }, BUDGET);

  it("RB-SPEC-DEFERRED: effect references are not marked in the Claude host's basis and are deferred with a past date and a reason", () => {
    const rows = specRows().filter(row => row.dimension === "effect references");
    expect(rows).toHaveLength(1);
    expect(rows[0]?.inBasis).toBe("no");
    const deferred = /^deferred (\d{4}-\d{2}-\d{2}): (\S.*)$/.exec(rows[0]?.status ?? "");
    expect(deferred, rows[0]?.status).not.toBeNull();
    const date = Date.parse(`${deferred?.[1]}T00:00:00Z`);
    expect(Number.isFinite(date) && date <= Date.now(), deferred?.[1]).toBe(true);
  }, BUDGET);

  it("RB-SPEC-MW-HALF: each name of the quoted MW half is a row owned by MW, not marked in the Claude host's basis, and owed on wb-1zn2", () => {
    expect(mwHalf()).toHaveLength(2);
    for (const name of mwHalf()) {
      const rows = specRows().filter(row => row.dimension === name || row.source.includes(name));
      expect(rows, name).toHaveLength(1);
      expect(rows[0], name).toMatchObject({ owner: "MW", inBasis: "no" });
      expect(rows[0]?.status, name).toMatch(/^owed on wb-1zn2 /);
    }
  }, BUDGET);

  it("RB-POLICY-OPTIONS-SHAPE: the eight policy options, written out (frozen shape), are the page's first eight marked keys and the keys of the options the host is built with", () => {
    expect([...POLICY_OPTIONS]).toEqual(["cwd", "model", "permissionMode", "settingSources", "tools", "roles", "grants", "principal"]);
    // Anchored outside the literals above: the specification's table.
    expect([...POLICY_OPTIONS]).toEqual(
      specRows()
        .filter(row => row.inBasis === "yes")
        .map(row => row.key)
        .slice(0, 8),
    );
    expect(Object.keys(DISTINCT)).toEqual([...POLICY_OPTIONS]);
  }, BUDGET);

  it("RB-READING-READERS-SHAPE: the three readings' readers, written out (frozen shape), are the page's last three marked keys, each with the reader its measurement source names, and the keys of the readings the host is handed", () => {
    const readers = Object.entries(READING_READERS).map(([key, reader]) => `${key}|${reader.name}`);
    expect(readers).toEqual(["replayDependencies.source|sourceDependency", "replayDependencies.instructions|instructionDependency", "replayDependencies.provider|providerDependency"]);
    // Anchored outside the literals above: the specification's table.
    expect(
      specRows()
        .filter(row => row.inBasis === "yes")
        .slice(8)
        .map(row => `${row.key}|${/^`(\w+)` /.exec(row.source)?.[1] ?? ""}`),
    ).toEqual(readers);
    expect(Object.keys(READINGS).map(key => `replayDependencies.${key}`)).toEqual(Object.keys(READING_READERS));
  }, BUDGET);
});

/* --- EAT-R162: the replayBasis comments and the hosts' recorded dimensions -------------------------------------- */

type Host = "Claude" | "detached";
/** [host, the dimension as its source text records it, the phrase the comments name it by]. */
const DIMENSIONS: readonly (readonly [Host, string, string])[] = [
  ["Claude", "cwd", "cwd"],
  ["Claude", "model", "model pin"],
  ["Claude", "permissionMode", "permission mode"],
  ["Claude", "settings", "setting sources"],
  ["Claude", "tools", "tools"],
  ["Claude", "roles", "roles"],
  ["Claude", "grants", "grants"],
  ["Claude", "principal", "principal"],
  ["Claude", "source", "source reading"],
  ["Claude", "instructions", "instruction reading"],
  ["Claude", "provider", "provider reading"],
  ["detached", "contract", "contract"],
  ["detached", "backend", "backend"],
  ["detached", "workspace", "workspace"],
  ["detached", "principal", "principal"],
  ["detached", "grants", "grants"],
  ["detached", "manifest", "provider manifest"],
  ["detached", "localProvider", "local provider"],
  ["detached", "host", "inner host basis"],
];
/** Three dimensions EAT-R161 names that no host records here: a comment naming one would claim a dimension no host has. */
const UNRECORDED = ["effect references", "gate-manifest digest", "prompt/config digest"] as const;
const recordedBy = (host: Host): string[] => DIMENSIONS.filter(([owner]) => owner === host).map(([, recorded]) => recorded);
const phrasesOf = (host: Host): string[] => DIMENSIONS.filter(([owner]) => owner === host).map(([, , phrase]) => phrase);

function sourceFile(path: string): ts.SourceFile {
  return ts.createSourceFile(path, readFileSync(join(ROOT, path), "utf8"), ts.ScriptTarget.Latest, true);
}
function nodesOf<T extends ts.Node>(root: ts.Node, test: (node: ts.Node) => node is T): T[] {
  const found: T[] = [];
  const visit = (node: ts.Node): void => {
    if (test(node)) found.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}
/** An object literal's named keys: each property assignment or shorthand by its name; a spread, a method, an accessor or a computed name is unread. */
function namedKeys(object: ts.ObjectLiteralExpression): string[] {
  return object.properties.map(property =>
    (ts.isPropertyAssignment(property) || ts.isShorthandPropertyAssignment(property)) && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) ? property.name.text : `unread ${property.getText()}`,
  );
}
/** A spread's dimensions: through parentheses and both arms of a conditional, the named keys of each object literal with members an array literal holds; anything else, an empty object literal included, is unread. */
function spreadDimensions(expression: ts.Expression): string[] {
  if (ts.isParenthesizedExpression(expression)) return spreadDimensions(expression.expression);
  if (ts.isConditionalExpression(expression)) return [...spreadDimensions(expression.whenTrue), ...spreadDimensions(expression.whenFalse)];
  if (ts.isArrayLiteralExpression(expression)) {
    return expression.elements.flatMap(element => (ts.isObjectLiteralExpression(element) && element.properties.length > 0 ? namedKeys(element) : [`unread ${element.getText()}`]));
  }
  return [`unread ${expression.getText()}`];
}
/** A basis element's dimensions: a property read or a name by itself, the left of `?? null`, a spread's as spreadDimensions reads them; anything else is unread. */
function dimensionsOf(element: ts.Expression): string[] {
  if (ts.isSpreadElement(element)) return spreadDimensions(element.expression);
  if (ts.isBinaryExpression(element) && element.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken && element.right.kind === ts.SyntaxKind.NullKeyword) return dimensionsOf(element.left);
  if (ts.isPropertyAccessExpression(element)) return [element.name.text];
  if (ts.isIdentifier(element)) return [element.text];
  return [`unread ${element.getText()}`];
}
/** The dimensions the claude-host.ts literal records: the elements of the array its replayBasis JSON.stringify call writes. */
function claudeRecorded(): string[] {
  const declarations = nodesOf(sourceFile("src/workbench/claude-host.ts"), (node): node is ts.VariableDeclaration => ts.isVariableDeclaration(node) && node.name.getText() === "replayBasis");
  expect(declarations).toHaveLength(1);
  const call = declarations[0]?.initializer;
  if (call === undefined || !ts.isCallExpression(call) || call.expression.getText() !== "JSON.stringify") throw new Error("claude-host.ts: replayBasis is no JSON.stringify call");
  const array = call.arguments[0];
  if (array === undefined || !ts.isArrayLiteralExpression(array)) throw new Error("claude-host.ts: replayBasis stringifies no array literal");
  return array.elements.flatMap(dimensionsOf);
}
/** The dimensions the detached host records: the named keys of the object its replayBasis identityDigest call digests. */
function detachedRecorded(): string[] {
  const assignments = nodesOf(sourceFile("src/workbench/hosts/local-detached.ts"), (node): node is ts.PropertyAssignment => ts.isPropertyAssignment(node) && node.name.getText() === "replayBasis");
  expect(assignments).toHaveLength(1);
  const call = assignments[0]?.initializer;
  if (call === undefined || !ts.isCallExpression(call) || call.expression.getText() !== "identityDigest") throw new Error("local-detached.ts: replayBasis is no identityDigest call");
  const object = call.arguments[1];
  if (object === undefined || !ts.isObjectLiteralExpression(object)) throw new Error("local-detached.ts: replayBasis digests no object literal");
  return namedKeys(object);
}
/** The member names of each object literal createWorkflowHost's body returns directly, a spread or other unnamed member read as unread. */
function legacyReturned(): string[][] {
  const declaration = nodesOf(sourceFile("src/workflow/host.ts"), (node): node is ts.FunctionDeclaration => ts.isFunctionDeclaration(node) && node.name?.text === "createWorkflowHost")[0];
  const statements: readonly ts.Statement[] = declaration?.body?.statements ?? [];
  return statements
    .filter((statement): statement is ts.ReturnStatement => ts.isReturnStatement(statement))
    .flatMap(statement => (statement.expression !== undefined && ts.isObjectLiteralExpression(statement.expression) ? [statement.expression] : []))
    .map(object => object.properties.map(property => property.name?.getText() ?? `unread ${property.getText()}`));
}
/** Every TypeScript module below `dir` (declaration files included), by path from the root; a directory reached through a symbolic link is not walked. */
function srcModules(dir = "src"): string[] {
  return readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap(entry => {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) return srcModules(path);
    return /\.[cm]?tsx?$/.test(entry.name) ? [path] : [];
  });
}
/**
 * Each binding a src module exports, in any export form (an export modifier, an export clause, a default export, a
 * re-export read as the binding it names), whose type has a call or construct signature returning, directly, as one
 * member of a union or once awaited, a type the checker finds assignable to WorkflowHost (any, unknown and never left
 * out), by the path#name of the binding's declaration. One program over every src module, compiled as tsconfig.json
 * says, so an alias, an inferred return type or an assertion is read as the type it is.
 */
function hostConstructors(): string[] {
  const config = ts.readConfigFile(join(ROOT, "tsconfig.json"), ts.sys.readFile);
  const options = ts.parseJsonConfigFileContent(config.config, ts.sys, ROOT).options;
  const modules = srcModules().map(path => join(ROOT, path));
  const program = ts.createProgram(modules, { ...options, noEmit: true });
  const checker = program.getTypeChecker();
  const interfaceDeclaration = program
    .getSourceFile(join(ROOT, "src/workflow/runtime.ts"))
    ?.statements.find((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement) && statement.name.text === "WorkflowHost");
  if (interfaceDeclaration === undefined) throw new Error("src/workflow/runtime.ts: no WorkflowHost interface");
  const workflowHost = checker.getTypeAtLocation(interfaceDeclaration.name);
  const leftOut = ts.TypeFlags.Any | ts.TypeFlags.Unknown | ts.TypeFlags.Never;
  const members = (type: ts.Type): readonly ts.Type[] => (type.isUnion() ? type.types : [type]);
  const returnsHost = (type: ts.Type): boolean =>
    members(type)
      .flatMap(member => members(checker.getAwaitedType(member) ?? member))
      .some(candidate => (candidate.flags & leftOut) === 0 && checker.isTypeAssignableTo(candidate, workflowHost));
  const found = new Set<string>();
  for (const path of modules) {
    const file = program.getSourceFile(path);
    const moduleSymbol = file === undefined ? undefined : checker.getSymbolAtLocation(file);
    if (moduleSymbol === undefined) continue;
    for (const exported of checker.getExportsOfModule(moduleSymbol)) {
      const binding = (exported.flags & ts.SymbolFlags.Alias) !== 0 ? checker.getAliasedSymbol(exported) : exported;
      const declaration = binding.valueDeclaration ?? binding.declarations?.[0];
      if ((binding.flags & ts.SymbolFlags.Value) === 0 || declaration === undefined) continue;
      const type = checker.getTypeOfSymbol(binding);
      if ([...type.getCallSignatures(), ...type.getConstructSignatures()].some(signature => returnsHost(signature.getReturnType()))) {
        found.add(`${relative(ROOT, declaration.getSourceFile().fileName)}#${binding.name}`);
      }
    }
  }
  return [...found].sort();
}
/** The one comment before an interface member, a doc comment, its lines joined: the leading `*` of each line and the delimiters dropped. */
function memberComment(path: string, interfaceName: string, member: string): string {
  const file = sourceFile(path);
  const declaration = nodesOf(file, (node): node is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(node) && node.name.text === interfaceName)[0];
  const property = declaration?.members.find(candidate => candidate.name?.getText() === member);
  if (property === undefined) throw new Error(`${path}: no ${interfaceName}.${member}`);
  const ranges = ts.getLeadingCommentRanges(file.text, property.getFullStart()) ?? [];
  const range = ranges[0];
  if (ranges.length !== 1 || range === undefined) throw new Error(`${path}: ${interfaceName}.${member} has ${ranges.length} comments before it; exactly one is read`);
  return file.text
    .slice(range.pos, range.end)
    .replace(/^\/\*\*|\*\/$/g, "")
    .split("\n")
    .map(line => line.replace(/^\s*\* ?/, ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
/** One host's list in a comment: the host's name, the dimensions it names (none for "records none") and its parenthesized notes. */
interface HostList {
  readonly host: string;
  readonly named: readonly string[];
  readonly notes: readonly string[];
}
/**
 * A comment's host lists, each "the <host> host records: <list>;" (or "." at its end), its parenthesized notes set
 * apart and its list split at commas, or "the <host> host records none;", and the comment's text outside the lists'
 * names: the text around the lists, and each list's notes.
 */
function hostLists(comment: string): { lists: HostList[]; outside: string } {
  const lists: HostList[] = [];
  const outside = comment.replace(/the (\w+) host records(?:: ([^;.]*)| none)[;.]/g, (_whole, host: string, list: string | undefined) => {
    const notes = [...(list ?? "").matchAll(/\(([^)]*)\)/g)].map(note => note[1] ?? "");
    lists.push({
      host,
      named: (list ?? "")
        .replace(/\([^)]*\)/g, "")
        .split(",")
        .map(name => name.trim())
        .filter(name => name !== ""),
      notes,
    });
    return ` ${notes.join(" ")} `;
  });
  return { lists, outside };
}
/**
 * How many host lists ("the <host> host records:" or "the <host> host records none", any case) each src module's text
 * names, its line breaks and the `*` or `//` opening a comment line read as one space, by path; a module naming none is
 * left out.
 */
function hostListPhrases(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const path of srcModules()) {
    const text = readFileSync(join(ROOT, path), "utf8").replace(/\r?\n[ \t]*(?:\*(?!\/)|\/\/)?[ \t]*/g, " ");
    const count = [...text.matchAll(/\bthe\s+\w+\s+host\s+records(?:\s*:|\s+none\b)/gi)].length;
    if (count > 0) counts[path] = count;
  }
  return counts;
}
/** [name, path, interface, member, the member's comment as memberComment reads it]. */
const COMMENTS: readonly (readonly [string, string, string, string, string])[] = [
  [
    "runtime",
    "src/workflow/runtime.ts",
    "WorkflowHost",
    "replayBasis",
    "Opaque text naming the host policy an agent result or node read depends on beyond its own call payload. Each host records its own dimensions, and no dimension is common to every host (wb-413a, EAT-R162): - the Claude host records: cwd, model pin, permission mode, setting sources, tools, roles, grants, principal, source reading, instruction reading, provider reading (the last three only when the embedding host hands replay dependencies); - the detached host records: contract, backend, workspace, principal, grants, provider manifest, local provider, inner host basis; - the legacy host records none. Recorded on every entry this run writes, agent and node alike, and required to match on replay, so a resume under a changed policy declines the cache instead of handing back answers produced under another policy. A host that records none (the legacy host) matches entries that carry none, byte-for-byte as before.",
  ],
  [
    "journal",
    "src/workflow/journal.ts",
    "WorkflowJournalEntry",
    "basis",
    "The host's replay policy basis at record time (`WorkflowHost.replayBasis`). A resume only reuses an agent entry, or replays a node read, recorded under the SAME basis, which is how a changed host policy declines the cache. Each host records its own dimensions, as `WorkflowHost.replayBasis` names them: - the Claude host records: cwd, model pin, permission mode, setting sources, tools, roles, grants, principal, source reading, instruction reading, provider reading (the last three only when the embedding host hands replay dependencies); - the detached host records: contract, backend, workspace, principal, grants, provider manifest, local provider, inner host basis; - the legacy host records none. The legacy host matches entries that carry none, so its journals stay byte-identical.",
  ],
];

describe("wb-413a EAT-R162: the replayBasis comments name only what each host records, host by host", () => {
  it(
    "RB-HOSTS: every binding a src module exports, in any export form, whose call or construct signature returns a type assignable to WorkflowHost (directly, in a union or awaited) is the legacy, the Claude or the detached host constructor",
    () => {
      expect(hostConstructors()).toEqual(["src/workbench/claude-host.ts#createClaudeWorkflowHost", "src/workbench/hosts/local-detached.ts#createDetachedWorkflowHost", "src/workflow/host.ts#createWorkflowHost"]);
    },
    PROGRAM_BUDGET,
  );

  it("RB-RECORDED-claude: the Claude host records the dimensions its claude-host.ts literal holds, the readings' three keys last", () => {
    expect(claudeRecorded()).toEqual(recordedBy("Claude"));
  }, BUDGET);

  it("RB-RECORDED-detached: the detached host records the keys of the object its local-detached.ts identityDigest call digests", () => {
    expect(detachedRecorded()).toEqual(recordedBy("detached"));
  }, BUDGET);

  it("RB-RECORDED-legacy: the one object createWorkflowHost returns holds replaySafe and no replayBasis", () => {
    const returned = legacyReturned();
    expect(returned).toHaveLength(1);
    expect(returned[0]).toContain("replaySafe");
    expect(returned[0]).not.toContain("replayBasis");
    // A spread or other unnamed member is read as unread: none may stand where a replayBasis could hide.
    expect(returned[0]?.filter(name => name.startsWith("unread "))).toEqual([]);
  }, BUDGET);

  it("RB-RECORDED-legacy-built: the host createWorkflowHost builds from inert dependencies carries replaySafe true and no replayBasis, own or inherited", () => {
    const host = createWorkflowHost({ pi: {} as ExtensionAPI, ctx: {} as ExtensionContext, manager: {} as AgentManager });
    expect(host.replaySafe).toBe(true);
    expect(host.replayBasis).toBeUndefined();
    expect("replayBasis" in host).toBe(false);
  }, BUDGET);

  for (const [name, path, interfaceName, member, text] of COMMENTS) {
    it(`RB-DOC-TEXT-${name}: ${path}'s ${interfaceName}.${member} comment, written out (frozen text)`, () => {
      expect(memberComment(path, interfaceName, member)).toBe(text);
    }, BUDGET);

    it(`RB-DOC-${name}: ${path}'s ${interfaceName}.${member} comment names, host by host, exactly the dimensions each host records, and the legacy host as recording none`, () => {
      const { lists } = hostLists(memberComment(path, interfaceName, member));
      expect(lists.map(list => list.host)).toEqual(["Claude", "detached", "legacy"]);
      expect(lists[0]?.named).toEqual(phrasesOf("Claude"));
      expect(lists[1]?.named).toEqual(phrasesOf("detached"));
      expect(lists[2]?.named).toEqual([]);
    }, BUDGET);

    it(`RB-UNQUALIFIED-${name}: ${path}'s ${interfaceName}.${member} comment holds no phrase of the dimension table outside its host lists' names (their notes included), and nowhere one of the three EAT-R161 dimensions no host records`, () => {
      const comment = memberComment(path, interfaceName, member);
      const outside = hostLists(comment).outside.toLowerCase();
      const phrases = [...new Set(DIMENSIONS.map(([, , phrase]) => phrase))];
      expect(phrases.filter(phrase => new RegExp(`(^|[^a-z])${phrase}([^a-z]|$)`).test(outside))).toEqual([]);
      expect(UNRECORDED.filter(phrase => comment.toLowerCase().includes(phrase))).toEqual([]);
    }, BUDGET);
  }

  it("RB-DOC-MIRROR: the journal.ts comment names the same three host lists as the runtime.ts comment", () => {
    const [runtime, journal] = COMMENTS.map(([, path, interfaceName, member]) => hostLists(memberComment(path, interfaceName, member)).lists);
    expect(runtime).toHaveLength(3);
    expect(journal).toEqual(runtime);
  }, BUDGET);

  it("RB-COMMENTS-SHAPE: the comments this suite reads, written out (frozen shape), are in the only src modules naming a host list, each comment holding every host list its module names", () => {
    expect(COMMENTS.map(([name, path, interfaceName, member]) => `${name}|${path}|${interfaceName}|${member}`)).toEqual([
      "runtime|src/workflow/runtime.ts|WorkflowHost|replayBasis",
      "journal|src/workflow/journal.ts|WorkflowJournalEntry|basis",
    ]);
    // Anchored outside the literals above: the text of every src module.
    expect(hostListPhrases()).toEqual(Object.fromEntries(COMMENTS.map(([, path, interfaceName, member]) => [path, hostLists(memberComment(path, interfaceName, member)).lists.length])));
  }, BUDGET);

  it("RB-UNRECORDED-SHAPE: the three dimensions no host records, written out (frozen shape), are the page's rows not marked in the Claude host's basis", () => {
    expect([...UNRECORDED]).toEqual(["effect references", "gate-manifest digest", "prompt/config digest"]);
    // Anchored outside the literals above: the specification's table.
    expect([...UNRECORDED]).toEqual(specRows().filter(row => row.inBasis === "no").map(row => row.dimension));
  }, BUDGET);

  it("RB-DIMENSIONS-SHAPE: the dimension table, written out (frozen shape), is each host's recorded dimensions as its source text holds them, each with its phrase", () => {
    expect(DIMENSIONS.map(([host, recorded, phrase]) => `${host}|${recorded}|${phrase}`)).toEqual([
      "Claude|cwd|cwd",
      "Claude|model|model pin",
      "Claude|permissionMode|permission mode",
      "Claude|settings|setting sources",
      "Claude|tools|tools",
      "Claude|roles|roles",
      "Claude|grants|grants",
      "Claude|principal|principal",
      "Claude|source|source reading",
      "Claude|instructions|instruction reading",
      "Claude|provider|provider reading",
      "detached|contract|contract",
      "detached|backend|backend",
      "detached|workspace|workspace",
      "detached|principal|principal",
      "detached|grants|grants",
      "detached|manifest|provider manifest",
      "detached|localProvider|local provider",
      "detached|host|inner host basis",
    ]);
    // Anchored outside the literal above: the two hosts' source texts.
    expect(recordedBy("Claude")).toEqual(claudeRecorded());
    expect(recordedBy("detached")).toEqual(detachedRecorded());
  }, BUDGET);
});
