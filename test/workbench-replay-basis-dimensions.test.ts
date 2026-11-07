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
 * Claimed here, each by its rows, and nothing wider (cut #8: the EAT-R162 comment-census words in the enumerate form
 * refusal #7 binds, every known unpinned mode a named residual with its quiet row; the EAT-R161 words read the page's
 * headings as a renderer reads them):
 *  - EAT-R161, the specification docs/workbench/replay-basis-dimensions.md, read line by line as written. The page is
 *    line feeds and printable ASCII (U+0020 to U+007E) alone. It holds no `<` (so no HTML comment, tag or autolink)
 *    and no line opening four spaces or a tab; no code fence (a line opening three backquotes or tildes), setext heading
 *    underline (a line of only `=` or only `-`) or link reference definition (a line opening `[...]:`), at a line's
 *    start or after its block-quote (`>`) and list-item (`-`, `+`, `*`, `1.` or `1)`) markers; and no line whose text
 *    after those markers opens with `#`. So its headings are its ATX lines, each opening with up to three spaces, and
 *    no heading line holds `*`, `_`, a backquote, `[`, `]`, `!`, `~`, `\` or `&` (no emphasis, code span, link,
 *    strikethrough, escape or character reference). Its one level-1 heading is its first line, and exactly one of its
 *    headings reads "Dimensions", in any case, and at level 2; a section runs from its heading to the next level-1 or
 *    level-2 heading or EOF. Every page line holding a `|` is a line of the one table in the Dimensions section, with a
 *    blank line before the table and a blank line or EOF after it. Exactly one page line holds "Statement:" and one
 *    "Conditions:", each a quote line opening `- Statement: "` or `- Conditions: "` and closing with `"`, inside the
 *    level-1 heading's section (RB-SPEC-VIEW).
 *    The table is written out: its header line, its delimiter row and each of its fourteen rows, every cell as written,
 *    its surrounding spaces trimmed, and the effect references row's status cell by its SHA-256 (it quotes EAT-R176, and
 *    a literal here spelling its words would red the content-state derivation of
 *    test/workbench-tsx-streaming-block-census.test.ts) (RB-SPEC-SHAPE). The two quote lines read exactly as this suite
 *    writes them out. Each dimension the statement quote's parenthesized list names is the dimension of exactly one row,
 *    each name the conditions quote gives MW's half is the dimension or the measurement source of exactly one row, and
 *    every row's dimension is one of those names (RB-SPEC-QUOTE). The rows marked as in the Claude host's basis are, in
 *    table order, the option keys a Claude host built with a distinct value for each of its eight policy options and
 *    with replay dependencies holds in its basis, in basis order, and as a set the same keys, so a marked row the basis
 *    does not hold, or a held key no row marks, reds (RB-SPEC-KEYS); built without replay dependencies the host holds
 *    the first eight marked keys alone (RB-SPEC-KEYS-LEGACY). Each marked row names its option key in its measurement
 *    source, a reading's row the module's reader function too, and every row names Pi or MW as its owner
 *    (RB-SPEC-CELLS). The effect references row is not marked and is deferred with a past date and a reason
 *    (RB-SPEC-DEFERRED); the MW half's two names are rows owned by MW, not marked, owed on wb-1zn2 (RB-SPEC-MW-HALF).
 *    The eight policy options this suite reads a basis element by, written out, are the page's first eight marked keys
 *    and the keys of the options it builds that host with (RB-POLICY-OPTIONS-SHAPE); the three readings' readers,
 *    written out, are its last three marked keys, each with the reader its measurement source names, and the keys of
 *    the readings it hands that host (RB-READING-READERS-SHAPE).
 *  - EAT-R162, the WorkflowHost.replayBasis comment of src/workflow/runtime.ts and the WorkflowJournalEntry.basis
 *    comment of src/workflow/journal.ts. Each member has one declaration in the TypeScript program over every src
 *    module (the modules RB-HOSTS reads, compiled as tsconfig.json says), the one in its interface in its module, and
 *    the documentation TypeScript's checker reads for the member over its declarations, its white space collapsed, is
 *    the comment's frozen text, as RB-DOC-TEXT-runtime and RB-DOC-TEXT-journal write it out
 *    (RB-DOC-DECLARATION-runtime, RB-DOC-DECLARATION-journal); over planted programs the reader adds a second
 *    declaration of the interface in the same module and an augmentation of it in another module, and reads the
 *    documentation of each declaration it adds (RB-DOC-DECLARATION-READER). Each comment is the one comment before that
 *    declaration, the one member of its name the module's top-level declarations of the interface hold. The hosts are
 *    the bindings src's TypeScript modules (every .ts, .mts, .cts or .tsx file below src, declaration files included, a
 *    directory reached through a symbolic link not walked) export, in any export form (a re-export read as the binding
 *    it names, and an export assignment, `export =`), whose call or construct signature returns, directly, as one
 *    member of a union or once awaited, a type TypeScript's checker finds assignable to WorkflowHost (any, unknown and
 *    never left out): the legacy, the Claude and the detached host constructors (RB-HOSTS); over planted modules the
 *    reader reads one host each through an export modifier, an export clause, a default export, an export assignment, a
 *    union, an awaited return and a construct signature, a re-export as the binding it names, and none through a return
 *    of never, unknown or any (RB-HOSTS-FORMS). The dimensions a host records are those this suite reads in its source
 *    text, and nothing wider (the RESIDUALS below): the Claude host's are the eleven its claude-host.ts literal holds,
 *    the array literal that is the one argument of the JSON.stringify call initializing the module's one variable,
 *    destructured binding or parameter named replayBasis (all three counted), each element read as a property read or a
 *    name, the left of `?? null`, or the named keys of the object literals in a spread's array literals, through
 *    parentheses and both arms of a conditional, and any other element, an empty object literal included, read as
 *    unread (RB-RECORDED-claude); the detached host's are the eight named keys of the object the identityDigest call
 *    digests in local-detached.ts's one object-literal member named replayBasis (an identifier, a string or a numeric
 *    literal name; a member of any kind counted), a property assignment (RB-RECORDED-detached); and the legacy host's
 *    are none. createWorkflowHost's body (host.ts's one createWorkflowHost function with a body), read through every
 *    nested block and statement and into no nested function or class, holds one return statement, and the object
 *    literal it returns has members, each read by its name (an identifier, a string or a numeric literal; a computed
 *    name, a spread, a `__proto__` member and any other member read as unread), that hold replaySafe, no replayBasis
 *    and nothing unread (RB-RECORDED-legacy); over planted bodies the reader reads a return in a nested block, a return
 *    of anything but an object literal as unread and no return of a nested function, and a member by its name, a
 *    string-literal name included, with a computed name, a spread and a `__proto__` member unread (RB-LEGACY-READER).
 *    The host createWorkflowHost builds from inert dependencies, as built and before any of its methods runs, carries
 *    replaySafe true and no replayBasis, own or inherited (RB-RECORDED-legacy-built). Each comment reads exactly as
 *    this suite writes it out (RB-DOC-TEXT-runtime, RB-DOC-TEXT-journal); names, host by host, exactly the dimensions
 *    this suite reads each host as recording, in that order, and the legacy host as recording none (RB-DOC-runtime,
 *    RB-DOC-journal); holds no phrase of the dimension table outside the names of its host lists, the lists'
 *    parenthesized notes included, nor anywhere one of the three dimensions EAT-R161 names that no host records here
 *    (RB-UNQUALIFIED-runtime, RB-UNQUALIFIED-journal); and the two comments name the same three lists (RB-DOC-MIRROR).
 *    The two comments this suite reads, written out by path, interface and member, are in the only src modules whose
 *    text names a host list, each comment holding every host list its module's text names (RB-COMMENTS-SHAPE). A host
 *    list is "host records:" or "host records none", in any case and whatever text comes before "host" (a one-word, a
 *    hyphenated or a two-word host name, or none), its words parted by white space as JavaScript's `\s` reads it, each
 *    line break and the `*` or `//` opening a comment line read as one space; over planted texts the scan reads one
 *    list in each of those spellings and none where another word parts or follows "host" and "records"
 *    (RB-HOSTLIST-SCAN). The three dimensions no host records, written out, are the page's rows not marked in the
 *    Claude host's basis (RB-UNRECORDED-SHAPE), and the dimension table, written out, is tied to the two hosts' source
 *    texts (RB-DIMENSIONS-SHAPE).
 * RESIDUALS (named, each with its pinned quiet row; the EAT-R162 words): R-LEGACY-LATE RB-Q-LEGACY-LATE, a replayBasis
 * the legacy host gains once built (a method of its returned object assigning one when the method runs);
 * R-CLAUDE-BEYOND-LITERAL RB-Q-CLAUDE-BEYOND-LITERAL, a replayBasis member of the Claude host holding more than its
 * literal (under an option value no row builds the host with); R-DETACHED-BEYOND-ASSIGNMENT
 * RB-Q-DETACHED-BEYOND-ASSIGNMENT, a replayBasis of the detached host that anything but that member sets (a member with
 * a computed name, in a spread); R-HOSTLIST-SPELLING RB-Q-HOSTLIST-SPELLING, a host list whose words something other
 * than white space, a line break and the `*` or `//` opening a comment line parts (a zero-width space, a soft hyphen, a
 * character reference, a block comment or a third slash), or that a string or template literal spells through an escape
 * sequence or an interpolation.
 * NOT CLAIMED by this suite: what the basis holds for a given option value
 * (test/workbench-claude-replay-dependencies.test.ts judges it); how a reading is measured
 * (test/workbench-replay-dependency-readers.test.ts and test/workbench-replay-dependencies-wiring.test.ts); the
 * detached host's basis values; a WorkflowHost built anywhere but those three functions, or one a method or a property
 * of an exported object, class or namespace returns; a function a global declaration or an ambient module declaration
 * (`declare module`) declares; a declaration of either member in a module outside src, and the comment of a member of
 * any other interface or type, one extending WorkflowHost or WorkflowJournalEntry included; a phrase of the dimension
 * table anywhere in either module but the member's comment; a change a module makes to a prototype the hosts inherit
 * from; a host list in a file below src that is not a TypeScript module; the page's prose outside its table and its two
 * quote lines, and the page as a renderer other than GitHub Flavored Markdown (CommonMark and its extensions) reads it;
 * that this suite's copies of the two quotes equal ATOMIC-REQUIREMENTS-DELTA.md, which is on pi-subagents master and
 * not on this branch; and a complete joint basis.
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
  it('RB-SPEC-VIEW: the page is line feeds and printable ASCII; it holds no `<`, code fence, line opening four spaces or a tab, setext underline, link reference definition or `#` behind a block-quote or list-item marker, and no heading line holds inline markup, an escape or a character reference; its one level-1 heading is its first line and one heading reads Dimensions, in any case, at level 2; every line holding a `|` is a line of the one table, set off by blank lines; one line holds "Statement:" and one "Conditions:", each a quote line under the level-1 heading', () => {
    const lines = specLines();
    expect(specText()).not.toContain("<");
    // Fences, setext underlines and link reference definitions are refused at a line's start and after its block-quote and
    // list-item markers alike: inside a container each still renders (a setext heading there would be a heading unread).
    expect(lines.filter(line => /^ {0,3}(?:(?:>|[-+*]|\d{1,9}[.)])[ \t]*)*(`{3,}|~{3,})/.test(line))).toEqual([]);
    expect(lines.filter(line => /^( {4}|\t)/.test(line))).toEqual([]);
    expect(lines.filter(line => /^ {0,3}(?:(?:>|[-+*]|\d{1,9}[.)])[ \t]*)*(=+|-+)[ \t]*$/.test(line))).toEqual([]);
    expect(lines.filter(line => /^ {0,3}(?:(?:>|[-+*]|\d{1,9}[.)])[ \t]*)*\[[^\]]*\]:/.test(line))).toEqual([]);
    // Line feeds and printable ASCII alone: no tab, invisible or look-alike character stands in a heading or a cell.
    expect([...specText()].filter(character => character !== "\n" && (character < " " || character > "~"))).toEqual([]);
    // No `#` after block-quote and list-item markers: a heading nested in a container is one specHeadings never reads.
    expect(lines.filter(line => /^ {0,3}(?:(?:>|[-+*]|\d{1,9}[.)])[ \t]*)+#/.test(line))).toEqual([]);
    const headings = specHeadings(lines);
    // A heading reads as written: no emphasis, code span, link, strikethrough, escape or character reference in its line.
    expect(headings.map(heading => lines[heading.index] ?? "").filter(line => /[*_`[\]!~\\&]/.test(line))).toEqual([]);
    expect(headings.filter(heading => heading.level === 1).map(heading => `${heading.index}|${heading.text}`)).toEqual([`0|${SPEC_TITLE}`]);
    expect(headings.filter(heading => heading.text === "Dimensions").map(heading => heading.level)).toEqual([2]);
    expect(headings.filter(heading => heading.text.toLowerCase() === "dimensions").map(heading => heading.level)).toEqual([2]);
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

/** A module's source file, from disk or from a planted text standing for it. */
function sourceFile(path: string, text = readFileSync(join(ROOT, path), "utf8")): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);
}
/** The syntax errors TypeScript reads in a module's text, each by its message. */
function syntaxErrors(text: string): string[] {
  const output = ts.transpileModule(text, { reportDiagnostics: true, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } });
  return (output.diagnostics ?? []).map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
}
/** A module's text from disk with its one `anchor` replaced by `replacement`: the anchor is found exactly once, and the planted text holds no syntax error, or the row reds. */
function plantText(path: string, anchor: string, replacement: string): string {
  const text = readFileSync(join(ROOT, path), "utf8");
  expect(text.split(anchor), `${path}: the plant's anchor`).toHaveLength(2);
  const planted = text.replace(anchor, () => replacement);
  expect(syntaxErrors(planted), `${path}: the planted text's syntax`).toEqual([]);
  return planted;
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
/**
 * The dimensions the claude-host.ts literal records (or a planted text's): the elements of the array literal that is the
 * one argument of the JSON.stringify call initializing the module's one variable, destructured binding or parameter
 * named replayBasis (all three counted).
 */
function claudeRecorded(text?: string): string[] {
  const declarations = nodesOf(
    sourceFile("src/workbench/claude-host.ts", text),
    (node): node is ts.VariableDeclaration | ts.BindingElement | ts.ParameterDeclaration =>
      (ts.isVariableDeclaration(node) || ts.isBindingElement(node) || ts.isParameter(node)) && ts.isIdentifier(node.name) && node.name.text === "replayBasis",
  );
  expect(declarations).toHaveLength(1);
  const declaration = declarations[0];
  const call = declaration !== undefined && ts.isVariableDeclaration(declaration) ? declaration.initializer : undefined;
  if (call === undefined || !ts.isCallExpression(call) || call.expression.getText() !== "JSON.stringify" || call.arguments.length !== 1) throw new Error("claude-host.ts: replayBasis is no one-argument JSON.stringify call");
  const array = call.arguments[0];
  if (array === undefined || !ts.isArrayLiteralExpression(array)) throw new Error("claude-host.ts: replayBasis stringifies no array literal");
  return array.elements.flatMap(dimensionsOf);
}
/**
 * The dimensions the detached host records (or a planted text's): the named keys of the object the identityDigest call
 * digests in the module's one object-literal member named replayBasis (nameText: an identifier, a string or a numeric
 * literal; any kind of member counted), a property assignment.
 */
function detachedRecorded(text?: string): string[] {
  const members = nodesOf(
    sourceFile("src/workbench/hosts/local-detached.ts", text),
    (node): node is ts.ObjectLiteralElementLike => ts.isObjectLiteralElementLike(node) && ts.isObjectLiteralExpression(node.parent) && node.name !== undefined && nameText(node.name) === "replayBasis",
  );
  expect(members).toHaveLength(1);
  const member = members[0];
  const call = member !== undefined && ts.isPropertyAssignment(member) ? member.initializer : undefined;
  if (call === undefined || !ts.isCallExpression(call) || call.expression.getText() !== "identityDigest") throw new Error("local-detached.ts: replayBasis is no identityDigest call");
  const object = call.arguments[1];
  if (object === undefined || !ts.isObjectLiteralExpression(object)) throw new Error("local-detached.ts: replayBasis digests no object literal");
  return namedKeys(object);
}
/** The return statements below `node`, through every nested block and statement and into no nested function or class. */
function returnStatementsBelow(node: ts.Node): ts.ReturnStatement[] {
  const found: ts.ReturnStatement[] = [];
  const visit = (child: ts.Node): void => {
    if (ts.isFunctionLike(child) || ts.isClassLike(child)) return;
    if (ts.isReturnStatement(child)) found.push(child);
    ts.forEachChild(child, visit);
  };
  ts.forEachChild(node, visit);
  return found;
}
/** A member's name as text: an identifier, a string or a numeric literal by its text; a computed or any other name has none. */
function nameText(name: ts.PropertyName): string | undefined {
  return ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name) ? name.text : undefined;
}
/** An object literal member by its name (nameText); a computed name, a spread, a `__proto__` member (it sets the prototype) and any other member read as unread. */
function memberName(property: ts.ObjectLiteralElementLike): string {
  const name = property.name === undefined ? undefined : nameText(property.name);
  return name === undefined || name === "__proto__" ? `unread ${property.getText()}` : name;
}
/**
 * The members of the object literal each return statement of createWorkflowHost's body returns (host.ts's one
 * createWorkflowHost function with a body, or a planted text's), each read by memberName, the body read through every
 * nested block and statement and into no nested function or class; a return of anything but an object literal is one
 * unread entry.
 */
function legacyReturned(text?: string): string[][] {
  const bodies = nodesOf(sourceFile("src/workflow/host.ts", text), (node): node is ts.FunctionDeclaration => ts.isFunctionDeclaration(node) && node.name?.text === "createWorkflowHost" && node.body !== undefined);
  const body = bodies[0]?.body;
  if (bodies.length !== 1 || body === undefined) throw new Error(`src/workflow/host.ts: ${bodies.length} createWorkflowHost bodies; exactly one is read`);
  return returnStatementsBelow(body).map(statement => (statement.expression !== undefined && ts.isObjectLiteralExpression(statement.expression) ? statement.expression.properties.map(memberName) : [`unread ${statement.getText()}`]));
}
/** Every TypeScript module below `dir` (declaration files included), by path from the root; a directory reached through a symbolic link is not walked. */
function srcModules(dir = "src"): string[] {
  return readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap(entry => {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) return srcModules(path);
    return /\.[cm]?tsx?$/.test(entry.name) ? [path] : [];
  });
}
/** tsconfig.json's compiler options, emitting nothing. */
function compilerOptions(): ts.CompilerOptions {
  const config = ts.readConfigFile(join(ROOT, "tsconfig.json"), ts.sys.readFile);
  return { ...ts.parseJsonConfigFileContent(config.config, ts.sys, ROOT).options, noEmit: true };
}
let builtSrcProgram: ts.Program | undefined;
/** One TypeScript program over every src module (srcModules), compiled as tsconfig.json says; built once, for every row that reads it. */
function srcProgram(): ts.Program {
  builtSrcProgram ??= ts.createProgram(
    srcModules().map(path => join(ROOT, path)),
    compilerOptions(),
  );
  return builtSrcProgram;
}
/** A program over planted module texts by path from the root, compiled as tsconfig.json says: each text stands for its path (a src module or a new one), and every module they import is read from disk. */
function plantedProgram(planted: Readonly<Record<string, string>>): ts.Program {
  const options = compilerOptions();
  const host = ts.createCompilerHost(options, true);
  const texts = new Map(Object.entries(planted).map(([path, text]) => [join(ROOT, path), text] as const));
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreate) => {
    const text = texts.get(fileName);
    return text === undefined ? getSourceFile(fileName, languageVersion, onError, shouldCreate) : ts.createSourceFile(fileName, text, languageVersion, true);
  };
  const fileExists = host.fileExists.bind(host);
  host.fileExists = fileName => texts.has(fileName) || fileExists(fileName);
  const readFile = host.readFile.bind(host);
  host.readFile = fileName => texts.get(fileName) ?? readFile(fileName);
  return ts.createProgram([...texts.keys()], options, host);
}
/**
 * Each binding a module of `modules` (src's, by default) exports, in any export form (an export modifier, an export
 * clause, a default export, a re-export read as the binding it names, and an export assignment, `export =`), whose type
 * has a call or construct signature returning, directly, as one member of a union or once awaited, a type the checker
 * finds assignable to WorkflowHost (any, unknown and never left out), by the path#name of the binding's declaration. One
 * program over every src module (srcProgram, by default), so an alias, an inferred return type or an assertion is read
 * as the type it is.
 */
function hostConstructors(program: ts.Program = srcProgram(), modules: readonly string[] = srcModules()): string[] {
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
  for (const path of modules.map(module => join(ROOT, module))) {
    const file = program.getSourceFile(path);
    const moduleSymbol = file === undefined ? undefined : checker.getSymbolAtLocation(file);
    if (moduleSymbol === undefined) continue;
    const assignment = moduleSymbol.exports?.get(ts.InternalSymbolName.ExportEquals);
    for (const exported of [...checker.getExportsOfModule(moduleSymbol), ...(assignment === undefined ? [] : [assignment])]) {
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
/** The one comment before an interface member, a doc comment, its lines joined: the leading `*` of each line and the delimiters dropped. The member is the one of that name (nameText) the module's top-level declarations of the interface hold; any other count throws. */
function memberComment(path: string, interfaceName: string, member: string): string {
  const file = sourceFile(path);
  const properties = file.statements
    .filter((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement) && statement.name.text === interfaceName)
    .flatMap(declaration => declaration.members.filter(candidate => candidate.name !== undefined && nameText(candidate.name) === member));
  const property = properties[0];
  if (properties.length !== 1 || property === undefined) throw new Error(`${path}: ${properties.length} declarations of ${interfaceName}.${member} at the module's top level; exactly one is read`);
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
/**
 * Through `program`'s checker: the declarations of interfaceName.member, each by the path of its module, the interface
 * holding it and the member (any other holder read as unread), and the documentation the checker reads for the member
 * over all of them, its white space collapsed to one space. The interface is the first the path's module declares at its
 * top level, so a second declaration of it in that module, or an augmentation of it in another, adds its member's
 * declaration here.
 */
function memberDeclarations(program: ts.Program, path: string, interfaceName: string, member: string): { readonly declarations: readonly string[]; readonly documentation: string } {
  const checker = program.getTypeChecker();
  const declaration = program
    .getSourceFile(join(ROOT, path))
    ?.statements.find((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement) && statement.name.text === interfaceName);
  if (declaration === undefined) throw new Error(`${path}: no ${interfaceName} interface`);
  const property = checker.getTypeAtLocation(declaration.name).getProperty(member);
  if (property === undefined) throw new Error(`${path}: no ${interfaceName}.${member}`);
  const declarations = (property.declarations ?? []).map(node => {
    const holder = ts.isInterfaceDeclaration(node.parent) ? node.parent.name.text : `unread ${ts.SyntaxKind[node.parent.kind]}`;
    return `${relative(ROOT, node.getSourceFile().fileName)}#${holder}.${member}`;
  });
  return { declarations, documentation: ts.displayPartsToString(property.getDocumentationComment(checker)).replace(/\s+/g, " ").trim() };
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
 * How many host lists a text names: "host records:" or "host records none", in any case and whatever text comes before
 * "host", its words parted by white space as JavaScript's `\s` reads it, each line break and the `*` or `//` opening a
 * comment line read as one space.
 */
function hostListCount(text: string): number {
  return [...text.replace(/\r?\n[ \t]*(?:\*(?!\/)|\/\/)?[ \t]*/g, " ").matchAll(/host\s+records(?:\s*:|\s+none\b)/gi)].length;
}
/** How many host lists (hostListCount) each src module's text names, by path; a module naming none is left out. */
function hostListPhrases(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const path of srcModules()) {
    const count = hostListCount(readFileSync(join(ROOT, path), "utf8"));
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

describe("wb-413a EAT-R162: the replayBasis comments name, host by host, the dimensions this suite reads each host's source text as recording", () => {
  it(
    "RB-HOSTS: every binding a src module exports, in any export form (an export assignment included), whose call or construct signature returns a type assignable to WorkflowHost (directly, in a union or awaited) is the legacy, the Claude or the detached host constructor",
    () => {
      expect(hostConstructors()).toEqual(["src/workbench/claude-host.ts#createClaudeWorkflowHost", "src/workbench/hosts/local-detached.ts#createDetachedWorkflowHost", "src/workflow/host.ts#createWorkflowHost"]);
    },
    PROGRAM_BUDGET,
  );

  it(
    "RB-HOSTS-FORMS: over planted modules, the host reader reads one host each through an export modifier, an export clause, a default export, an export assignment, a union, an awaited return and a construct signature, a re-export as the binding it names, and none through a return of never, unknown or any",
    () => {
      const imports = 'import type { WorkflowHost } from "./runtime.js";\n';
      const plants: Readonly<Record<string, string>> = {
        "src/workflow/rb-forms-modifier.ts": `${imports}export declare function rbFormsModifier(): WorkflowHost;\n`,
        "src/workflow/rb-forms-clause.ts": `${imports}declare function rbFormsClause(): WorkflowHost;\nexport { rbFormsClause as rbFormsClauseAlias };\n`,
        "src/workflow/rb-forms-default.ts": `${imports}export default function (): WorkflowHost {\n  throw new Error("planted");\n}\n`,
        "src/workflow/rb-forms-assignment.d.cts": `${imports}declare function rbFormsAssignment(): WorkflowHost;\nexport = rbFormsAssignment;\n`,
        "src/workflow/rb-forms-shapes.ts": `${imports}export declare function rbFormsUnion(): WorkflowHost | undefined;\nexport declare function rbFormsAwaited(): Promise<WorkflowHost>;\nexport declare const RbFormsConstruct: new () => WorkflowHost;\nexport declare function rbFormsNever(): never;\nexport declare function rbFormsUnknown(): unknown;\nexport declare function rbFormsLoose(): ReturnType<typeof JSON.parse>;\n`,
        "src/workflow/rb-forms-reexport.ts": 'export { rbFormsModifier as rbFormsRenamed } from "./rb-forms-modifier.js";\nexport * from "./rb-forms-clause.js";\n',
      };
      expect(hostConstructors(plantedProgram(plants), Object.keys(plants))).toEqual([
        "src/workflow/rb-forms-assignment.d.cts#rbFormsAssignment",
        "src/workflow/rb-forms-clause.ts#rbFormsClause",
        "src/workflow/rb-forms-default.ts#default",
        "src/workflow/rb-forms-modifier.ts#rbFormsModifier",
        "src/workflow/rb-forms-shapes.ts#RbFormsConstruct",
        "src/workflow/rb-forms-shapes.ts#rbFormsAwaited",
        "src/workflow/rb-forms-shapes.ts#rbFormsUnion",
      ]);
    },
    PROGRAM_BUDGET,
  );

  it("RB-RECORDED-claude: the dimensions this suite reads the Claude host as recording are those its claude-host.ts literal holds, the readings' three keys last", () => {
    expect(claudeRecorded()).toEqual(recordedBy("Claude"));
  }, BUDGET);

  it("RB-RECORDED-detached: the dimensions this suite reads the detached host as recording are the keys of the object the identityDigest call digests in local-detached.ts's one object-literal member named replayBasis", () => {
    expect(detachedRecorded()).toEqual(recordedBy("detached"));
  }, BUDGET);

  it("RB-RECORDED-legacy: createWorkflowHost's body, read into no nested function or class, holds one return statement, and the object literal it returns holds replaySafe, no replayBasis and no unread member", () => {
    const returned = legacyReturned();
    expect(returned).toHaveLength(1);
    expect(returned[0]).toContain("replaySafe");
    expect(returned[0]).not.toContain("replayBasis");
    // A spread or other unnamed member is read as unread: none may stand where a replayBasis could hide.
    expect(returned[0]?.filter(name => name.startsWith("unread "))).toEqual([]);
  }, BUDGET);

  it("RB-RECORDED-legacy-built: the host createWorkflowHost builds from inert dependencies, as built and before any of its methods runs, carries replaySafe true and no replayBasis, own or inherited", () => {
    const host = createWorkflowHost({ pi: {} as ExtensionAPI, ctx: {} as ExtensionContext, manager: {} as AgentManager });
    expect(host.replaySafe).toBe(true);
    expect(host.replayBasis).toBeUndefined();
    expect("replayBasis" in host).toBe(false);
  }, BUDGET);

  it("RB-LEGACY-READER: over planted createWorkflowHost bodies, the legacy reader reads a return in a nested block, a return of anything but an object literal as unread and no return of a nested function, and a member by its name, a string-literal name included, with a computed name, a spread and a __proto__ member unread", () => {
    const path = "src/workflow/host.ts";
    const head = "  const { pi, ctx, manager } = deps;\n";
    const object = "  return {\n    replaySafe: true,\n";
    const real = legacyReturned();
    expect(real).toHaveLength(1);
    expect(legacyReturned(plantText(path, head, `${head}  if (ctx.cwd === "/rb-legacy") {\n    return { replaySafe: true, replayBasis: "rb-legacy" };\n  }\n`))).toEqual([["replaySafe", "replayBasis"], ...real]);
    expect(legacyReturned(plantText(path, head, `${head}  if (ctx.cwd === "/rb-legacy") return createWorkflowHost({ ...deps, ctx: { ...ctx, cwd: "/" } });\n`))).toEqual([['unread return createWorkflowHost({ ...deps, ctx: { ...ctx, cwd: "/" } });'], ...real]);
    expect(legacyReturned(plantText(path, head, `${head}  const nested = (): { replayBasis: string } => {\n    return { replayBasis: "rb-legacy" };\n  };\n  void nested;\n`))).toEqual(real);
    expect(legacyReturned(plantText(path, object, `${object}    "replayBasis": "rb-legacy",\n`))[0]).toContain("replayBasis");
    const unread = (inserted: string): string[] => (legacyReturned(plantText(path, object, `${object}${inserted}`))[0] ?? []).filter(name => name.startsWith("unread "));
    expect(unread('    ["replay" + "Basis"]: "rb-legacy",\n')).toEqual(['unread ["replay" + "Basis"]: "rb-legacy"']);
    expect(unread('    ...{ replayBasis: "rb-legacy" },\n')).toEqual(['unread ...{ replayBasis: "rb-legacy" }']);
    expect(unread('    __proto__: { replayBasis: "rb-legacy" },\n')).toEqual(['unread __proto__: { replayBasis: "rb-legacy" }']);
  }, BUDGET);

  for (const [name, path, interfaceName, member, text] of COMMENTS) {
    it(`RB-DOC-TEXT-${name}: ${path}'s ${interfaceName}.${member} comment, written out (frozen text)`, () => {
      expect(memberComment(path, interfaceName, member)).toBe(text);
    }, BUDGET);

    it(`RB-DOC-DECLARATION-${name}: ${interfaceName}.${member} has one declaration in the program over every src module, the one in ${path}'s ${interfaceName}, and the documentation TypeScript's checker reads for it is the frozen text`, () => {
      const read = memberDeclarations(srcProgram(), path, interfaceName, member);
      expect(read.declarations).toEqual([`${path}#${interfaceName}.${member}`]);
      expect(read.documentation).toBe(text);
    }, PROGRAM_BUDGET);

    it(`RB-DOC-${name}: ${path}'s ${interfaceName}.${member} comment names, host by host, exactly the dimensions this suite reads each host as recording, and the legacy host as recording none`, () => {
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

  it("RB-DOC-DECLARATION-READER: over planted programs, the declaration reader reads the one declaration of WorkflowHost.replayBasis in runtime.ts, adds a second declaration of the interface in that module and an augmentation of it in another module, and reads the documentation of each declaration it adds", () => {
    const path = "src/workflow/runtime.ts";
    const text = readFileSync(join(ROOT, path), "utf8");
    const plantedInterface = (exported: boolean, origin: string): string =>
      `${exported ? "export " : ""}interface WorkflowHost {\n  /** Planted: ${origin} names provider manifest. */\n  readonly replayBasis?: string;\n}\n`;
    const one = memberDeclarations(plantedProgram({ [path]: text }), path, "WorkflowHost", "replayBasis");
    expect(one.declarations).toEqual([`${path}#WorkflowHost.replayBasis`]);
    expect(one.documentation).toBe(COMMENTS[0][4]);
    const merged = memberDeclarations(plantedProgram({ [path]: `${text}\n${plantedInterface(true, "a second declaration")}` }), path, "WorkflowHost", "replayBasis");
    expect(merged.declarations).toEqual([`${path}#WorkflowHost.replayBasis`, `${path}#WorkflowHost.replayBasis`]);
    expect(merged.documentation).toContain("Planted: a second declaration names provider manifest.");
    const augmentation = `export {};\ndeclare module "./runtime.js" {\n${plantedInterface(false, "an augmentation")}}\n`;
    const augmented = memberDeclarations(plantedProgram({ [path]: text, "src/workflow/rb-augment.ts": augmentation }), path, "WorkflowHost", "replayBasis");
    expect([...augmented.declarations].sort()).toEqual(["src/workflow/rb-augment.ts#WorkflowHost.replayBasis", `${path}#WorkflowHost.replayBasis`]);
    expect(augmented.documentation).toContain("Planted: an augmentation names provider manifest.");
  }, PROGRAM_BUDGET);

  it("RB-COMMENTS-SHAPE: the comments this suite reads, written out (frozen shape), are in the only src modules naming a host list (any host name before host records), each comment holding every host list its module names", () => {
    expect(COMMENTS.map(([name, path, interfaceName, member]) => `${name}|${path}|${interfaceName}|${member}`)).toEqual([
      "runtime|src/workflow/runtime.ts|WorkflowHost|replayBasis",
      "journal|src/workflow/journal.ts|WorkflowJournalEntry|basis",
    ]);
    // Anchored outside the literals above: the text of every src module.
    expect(hostListPhrases()).toEqual(Object.fromEntries(COMMENTS.map(([, path, interfaceName, member]) => [path, hostLists(memberComment(path, interfaceName, member)).lists.length])));
  }, BUDGET);

  it('RB-HOSTLIST-SCAN: over planted texts, the host-list scan reads one list whatever host name comes before "host" (one word, hyphenated, two words, none), in any case, across a tab, a line break and a `*` or `//` comment opener, and none where another word parts or follows "host" and "records"', () => {
    expect(hostListCount("the Claude host records: cwd.")).toBe(1);
    expect(hostListCount("the local-detached host records: contract.")).toBe(1);
    expect(hostListCount("the local detached host records none.")).toBe(1);
    expect(hostListCount("host records none.")).toBe(1);
    expect(hostListCount("THE LEGACY HOST RECORDS NONE.")).toBe(1);
    expect(hostListCount("the Claude host records : cwd.")).toBe(1);
    expect(hostListCount("the Claude host\trecords: cwd.")).toBe(1);
    expect(hostListCount("/**\n * the Claude host\n *   records: cwd.\n */")).toBe(1);
    expect(hostListCount("// the detached host\n//   records: contract.")).toBe(1);
    expect(hostListCount("a host that records none.")).toBe(0);
    expect(hostListCount("the Claude host recorded: cwd.")).toBe(0);
    expect(hostListCount("the Claude host records nothing.")).toBe(0);
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

describe("wb-413a EAT-R162 named residuals: each quiet row reds when its escape stops being quiet", () => {
  it("RB-Q-LEGACY-LATE (R-LEGACY-LATE): a replayBasis that a method of the legacy host's returned object assigns when the method runs is not read: the legacy reader reads the planted body as the real one", () => {
    const anchor = "    async spawnAgent(request) {\n";
    expect(legacyReturned(plantText("src/workflow/host.ts", anchor, `${anchor}      Object.assign(this, { replayBasis: "rb-q-late" });\n`))).toEqual(legacyReturned());
  }, BUDGET);

  it("RB-Q-CLAUDE-BEYOND-LITERAL (R-CLAUDE-BEYOND-LITERAL): a replayBasis member of the Claude host holding more than its literal, under an option value no row builds the host with, is not read: the literal reader reads the planted module as the real one", () => {
    const planted = plantText("src/workbench/claude-host.ts", "    replayBasis,\n", '    replayBasis: config.cwd === "/rb-q-claude" ? replayBasis + "|rb-q" : replayBasis,\n');
    expect(claudeRecorded(planted)).toEqual(claudeRecorded());
  }, BUDGET);

  it("RB-Q-DETACHED-BEYOND-ASSIGNMENT (R-DETACHED-BEYOND-ASSIGNMENT): a replayBasis of the detached host that a member with a computed name sets, in a spread, is not read: the digest-object reader reads the planted module as the real one", () => {
    const anchor = "      host: commonHost.replayBasis ?? null,\n    }),\n";
    const planted = plantText("src/workbench/hosts/local-detached.ts", anchor, `${anchor}    ...(request.cwd === "/rb-q-detached" ? { ["replay" + "Basis"]: "rb-q" } : {}),\n`);
    expect(detachedRecorded(planted)).toEqual(detachedRecorded());
  }, BUDGET);

  it("RB-Q-HOSTLIST-SPELLING (R-HOSTLIST-SPELLING): a host list whose words a zero-width space, a soft hyphen, a character reference, a block comment or a third slash parts, or that a string or template literal spells through an escape sequence or an interpolation, is not read, while the same list spelled plainly is", () => {
    const zeroWidthSpace = String.fromCodePoint(0x200b);
    const softHyphen = String.fromCodePoint(0xad);
    expect(hostListCount(`// the local host${zeroWidthSpace}records: contract.`)).toBe(0);
    expect(hostListCount(`// the local host${softHyphen}records none.`)).toBe(0);
    expect(hostListCount("// the local host&nbsp;records: contract.")).toBe(0);
    expect(hostListCount("/* the local host */ /* records: contract. */")).toBe(0);
    expect(hostListCount("// the local host\n/// records none.")).toBe(0);
    expect(hostListCount('const note = "the local host\\u0020records: contract.";')).toBe(0);
    // A template literal whose interpolation parts the words (assembled here so no string literal of this suite holds one).
    expect(hostListCount(["const note = `the local host ", "$", '{""}records: contract.`;'].join(""))).toBe(0);
    // Spelled plainly, each is one host list: the escape lies in the spelling alone.
    expect(hostListCount("// the local host records: contract.")).toBe(1);
    expect(hostListCount("// the local host records none.")).toBe(1);
    expect(hostListCount("/* the local host records: contract. */")).toBe(1);
    expect(hostListCount("// the local host\n// records none.")).toBe(1);
    expect(hostListCount('const note = "the local host records: contract.";')).toBe(1);
    expect(hostListCount("const note = `the local host records: contract.`;")).toBe(1);
  }, BUDGET);
});
