/**
 * wb-dc0 (W04: structured output, usage, transcript, resume): the closure census of the feature matrix's four W04 rows,
 * judged in wb-u62 REPORT MODE over the gate's own test report.
 *
 * W04's bead reads "Schema-constrained results via supported SDK mechanism + host-side applySchema; token usage only as
 * reported; transcript persistence reference; agent({resume}) mapped to native SDK session resume; invalid/lost session
 * fails explicitly (never fresh-context masquerading as resume)", and its last note leaves the "Pi TUI session viewer and
 * privacy proof" open. docs/workbench/feature-matrix.md "## W04: Structured output, usage, transcript, resume" carries one
 * row per feature, each with an Evidence cell that quotes landed cases. This file is a census-tier leg
 * (vitest.census.config.ts, include test/**\/*.census.ts): it reads vitest's JSON report of the gate's test step
 * (DEFAULT_TIER_REPORT, written by `npm run test`) and the matrix, and runs no pinned case; the .census.ts suffix keeps it
 * out of the report it reads. The privacy proof landed as test/workbench-claude-transcript-privacy.test.ts (wb-dc0.1,
 * merge 17dfc23); the matrix's W04 transcript row still calls that file absent, a stale clause this census does not edit
 * and does not read (it reads the row's Feature cell and the quotes of its Evidence cell only).
 *
 * PINNED READER SET: the 35 pins of ROWS below (34 distinct cases; L4 "cumulative SDK usage on resume counts only the new
 * turn" is pinned under both the usage and the resume row), in 7 test files, every one a default-tier case observed
 * passed at cut time. Each census case, with the falsifiers measured red against it at cut time (one throwaway edit each,
 * restored byte-identical; the ids are the delivery note's, which carries the counts) and, marked "not measured", the
 * edits that turn it red by construction:
 * - W04-SHAPE (frozen shape): ROWS holds W04-SCHEMA:6, W04-USAGE:6, W04-RESUME:8 and W04-TRANSCRIPT:15, each row's pin
 *   ids frozen in order. Red under: a pin of a multi-pin row deleted (CT1), a pin of a second row deleted (CT1b), a row
 *   deleted (CT4).
 * - W04-ROWS (anchor outside this file's literals): the matrix's W04 section, read through the shared helper's
 *   sectionTables in the rendered binding, holds exactly one table whose header is Feature, Status, Evidence, Caveats
 *   and whose body rows' Feature cells are the four rows' features, in order. Red under: a feature label shortened (CT2),
 *   a row deleted with its frozen-shape elements (CT5) or from every literal (CT6, row member), the matrix's usage Feature
 *   cell reworded (K5); not measured: a matrix W04 row added, removed or reordered.
 * - W04-QUOTES (anchor outside this file's literals): in each row's Evidence cell every group of the form
 *   `test/<file>.test.ts ['<suite>'] (<text>)` (one space before the parenthesis, which holds no parenthesis) yields its
 *   single-quoted strings, and the yield of every group whose file is not NOT_DEFAULT_TIER equals the row's quote-bearing
 *   pins (file, suite quote, quote), in order; each quote names its pin's title (the title itself, the title after an
 *   "L<n>: " label, or for a quote with one " ... " elision a title opening with the part before it and closing with the
 *   part after it, the two parts not overlapping), and each suite quote is its pin's innermost describe. Red under: a quoted pin swapped for an
 *   unrelated passing case of its file (CT3), a quoted pin removed from every literal (CT6, quoted-pin member), a quote
 *   deleted from the matrix (K4); not measured: a quote added to the matrix in the group form.
 * - W04-PARSE: over a synthetic Evidence cell (never the live matrix) the group reader yields exactly the quotes of its
 *   test-file groups, in order: a src parenthetical, a qa probe's quote, a TRACEABILITY quote, an unquoted mention and a
 *   parenthetical holding a parenthesis yield nothing, and a live file's group still yields (W04-QUOTES sets it aside).
 *   Red under: the reader hollowed to no quotes (H1), the suite quote dropped from the reader (H2).
 * - W04-NAMES: the quote rule accepts a title itself, the title after an "L<n>: " label and a title around one " ... "
 *   elision whose two parts do not overlap (the parts joined by one space included), and refuses a longer unelided
 *   title, another label form, a missing label colon, a title whose two parts would overlap, a title opening elsewhere
 *   and a quote with two elisions. Red under: the rule hollowed to accept every title (H3), the overlap guard dropped
 *   (H4).
 * - W04-SUITES (anchor outside this file's literals): for each FULL_SUITES entry the report holds one file entry whose
 *   path ends with the file's, and the cases it lists under exactly that describe path are that suite's pins, in order,
 *   each with status passed. Red under: a suite pin removed from every literal (CT6, suite-pin member), a case added to a
 *   fully pinned suite (K1), a pinned case skipped (K3); not measured: a suite case removed, reordered or renamed.
 * - W04-ANCHORED: every pin carries a matrix quote or sits in a FULL_SUITES suite, every FULL_SUITES suite holds a pin,
 *   and pin ids are unique. Red under: the usage row deleted with its suite left declared (CT4, CT5); not measured: a pin
 *   added with neither anchor, a duplicated pin id.
 * - W04-JUDGE: judge() (test/helpers/census.ts) reads each pin under its describe path collected once, passed in the
 *   test tier's report and asserting (the helper's three legs). Red under: a pinned case renamed (K2), a pinned case
 *   skipped (K3), a pinned case given an empty body (K7); not measured: a pinned case excluded from the default tier.
 * - W04-LIVENESS: judge() reads one made-up title, "W04 no such pinned case", red, as absent, naming it: the judge is not
 *   accept-all (not measured: an accept-all judge).
 * - W04-NOT-DEFAULT-TIER: the report holds no entry for a NOT_DEFAULT_TIER file, so the quotes W04-QUOTES sets aside are
 *   quotes of a file the default report does not record. Red under: a report entry for the live file (K6).
 * - W04-TITLE: the describe title names the pinned set by its counts (pins, distinct cases, files) and its four row ids,
 *   recomputed from ROWS. Red under: the title hollowed (K8), the counts changed by CT1, CT1b, CT4 and CT5.
 *
 * NOT CLAIMED by this census: live native SDK behaviour - the claude-live tier (test/workbench-claude-pi-live.test.ts)
 * and the direct probes qa/workbench/live-claude.mjs and qa/workbench/live-resume.mjs the matrix cites, so native session
 * continuation over the real SDK is NOT CLAIMED by this census (the matrix and TRACEABILITY record a direct probe exit 0
 * that this file neither re-runs nor reads); the matrix's Status and Caveats cells and every Evidence mention that is
 * not a quoted case of a default-tier file (the src line citations, test/workbench-inspector.test.ts A11,
 * test/workbench-evidence-loader.test.ts, the TRACEABILITY and docs/13 quotes); Evidence quotes written outside the
 * group form W04-QUOTES reads; what each pinned case asserts (an edit
 * that keeps a case registered, passing and asserting while changing what it checks stays green here); any tier but the
 * default test tier; and every mode the shared helper names as its own residual (the NAMED RESIDUALS in
 * test/helpers/census.ts), which bounds each judge() reading here. No display path is added.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge, type PinVerdict, sectionTables } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
/** judge() reads each pinned file's import closure, and the report is the whole default tier's: a loaded gate host needs far more than vitest's 5000 ms default. */
const JUDGE_TIMEOUT = 240_000;

const MATRIX = "docs/workbench/feature-matrix.md";
const MATRIX_TITLE = "Workbench release feature matrix";
const W04_HEADING = "W04: Structured output, usage, transcript, resume";
const MATRIX_HEADER = ["Feature", "Status", "Evidence", "Caveats"];

const HOST = "test/workbench-host-contract.test.ts";
const HOST_SUITE = ["Workbench Claude execution host"];
const STREAMING = "test/workbench-pi-streaming.test.ts";
const STREAMING_SUITE = ["W02 Pi native streaming observations"];
const ADVERSE = "test/workbench-claude-adverse-faults.test.ts";
const MALFORMED_SUITE = ["N2/N3 malformed native output is never a success"];
const USAGE_SUITE = ["N5 usage is reported only when the SDK supplied it"];
const LOOKUP = "test/workbench-claude-resume-lookup.test.ts";
const LOOKUP_SUITE = ["W04 (wb-dc0) resume reads the SDK's persisted session store before any resumed query"];
const SECURITY = "test/workbench-security-pi-tools.test.ts";
const GRANT_SUITE_NAME = "claude:transcript grant on the inspector transcript path";
const GRANT_SUITE = [GRANT_SUITE_NAME];
const GRANTS = "test/workbench-grants-settings.test.ts";
const GRANTS_SUITE = ["Workbench explicit capability grants"];
const PRIVACY = "test/workbench-claude-transcript-privacy.test.ts";
const PRIVACY_SUITE = ["Claude transcript adapter privacy and bounds"];

/** Evidence-cell files outside the default tier: their quotes are set aside, never claimed (the live tier). */
const NOT_DEFAULT_TIER: readonly string[] = ["test/workbench-claude-pi-live.test.ts"];

interface W04Pin {
  readonly id: string;
  readonly file: string;
  readonly suite: readonly string[];
  readonly title: string;
  /** The Evidence-cell quote this pin answers, verbatim from the matrix; absent for a pin anchored by its fully pinned suite alone. */
  readonly quote?: string;
  /** The single-quoted suite name the Evidence cell writes after the file path, verbatim. */
  readonly suiteQuote?: string;
}
interface W04Row {
  readonly id: string;
  /** The matrix row's Feature cell, verbatim. */
  readonly feature: string;
  readonly pins: readonly W04Pin[];
}

const ROWS: readonly W04Row[] = [
  {
    id: "W04-SCHEMA",
    feature: "Schema-constrained agent results via SDK outputFormat json_schema plus host-side schema check (object values returned to the script)",
    pins: [
      {
        id: "S1",
        file: HOST,
        suite: HOST_SUITE,
        title: "L3: parallel schema agents return object values from native SDK structured_output",
        quote: "L3: parallel schema agents return object values from native SDK structured_output",
      },
      {
        id: "S2",
        file: STREAMING,
        suite: STREAMING_SUITE,
        title: "returns parallel structured values under distinct native session identities through registered Pi tool",
        quote: "returns parallel structured values under distinct native session identities through registered Pi tool",
      },
      { id: "S3", file: ADVERSE, suite: MALFORMED_SUITE, title: "N2: a declared schema with structured_output undefined reports missing structured_output" },
      { id: "S4", file: ADVERSE, suite: MALFORMED_SUITE, title: "N3: a structured_output that fails schema.check reports did not match schema, with no text" },
      { id: "S5", file: ADVERSE, suite: MALFORMED_SUITE, title: "N3: an extra property is rejected too (additionalProperties:false), never coerced" },
      { id: "S6", file: ADVERSE, suite: MALFORMED_SUITE, title: "control: a conforming structured_output succeeds and the text is its JSON" },
    ],
  },
  {
    id: "W04-USAGE",
    feature: "Token usage reported only as the SDK reports it (per-turn delta on resume; no invented zeros)",
    pins: [
      {
        id: "U1",
        file: HOST,
        suite: HOST_SUITE,
        title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported",
        quote: "L3: unchanged script uses Claude SDK query ... session and usage are reported",
      },
      { id: "U2", file: HOST, suite: HOST_SUITE, title: "L4: cumulative SDK usage on resume counts only the new turn", quote: "cumulative SDK usage on resume counts only the new turn" },
      { id: "U3", file: ADVERSE, suite: USAGE_SUITE, title: "modelUsage absent: tokens and outputTokens are absent properties, not 0 and not null" },
      { id: "U4", file: ADVERSE, suite: USAGE_SUITE, title: "modelUsage {}: tokens and outputTokens are absent properties" },
      { id: "U5", file: ADVERSE, suite: USAGE_SUITE, title: "positive control: populated modelUsage sums input+output+cacheRead+cacheCreation across models" },
      { id: "U6", file: ADVERSE, suite: USAGE_SUITE, title: "a resume after an absent-usage turn takes no baseline: the later turn reports its full cumulative usage" },
    ],
  },
  {
    id: "W04-RESUME",
    feature:
      "Native Claude session resume for agent({resume}) with explicit refusal of unknown, lost or mismatched sessions (never fresh-context masquerading as resume)",
    pins: [
      {
        id: "R1",
        file: HOST,
        suite: HOST_SUITE,
        title: "L4: SDK resume returning a different session ID refuses fresh-context continuation",
        quote: "SDK resume returning a different session ID refuses fresh-context continuation",
      },
      { id: "R2", file: HOST, suite: HOST_SUITE, title: "L4: cumulative SDK usage on resume counts only the new turn", quote: "cumulative SDK usage on resume counts only the new turn" },
      { id: "R3", file: HOST, suite: HOST_SUITE, title: "L4: resumed role preserves the same system prompt and tools", quote: "resumed role preserves the same system prompt and tools" },
      { id: "R4", file: HOST, suite: HOST_SUITE, title: "L4: abort during persisted-session lookup prevents resumed query", quote: "abort during persisted-session lookup prevents resumed query" },
      {
        id: "R5",
        file: HOST,
        suite: HOST_SUITE,
        title: "L4: missing persisted SDK session blocks resumed query rather than creating a fresh context",
        quote: "missing persisted SDK session blocks resumed query rather than creating a fresh context",
      },
      { id: "R6", file: HOST, suite: HOST_SUITE, title: "L4: unknown resume session refuses without invoking a new query", quote: "unknown resume session refuses without invoking a new query" },
      {
        id: "R7",
        file: LOOKUP,
        suite: LOOKUP_SUITE,
        title: "the lookup asks for the recorded session id in the host's workspace directory, once, before the resumed query, which resumes that session",
      },
      { id: "R8", file: LOOKUP, suite: LOOKUP_SUITE, title: "a stored record of another session refuses the resume as unavailable and issues no second query" },
    ],
  },
  {
    id: "W04-TRANSCRIPT",
    feature: "Claude transcript viewer in the Pi inspector (bounded readClaudeTranscript rows) gated by the exact claude:transcript capability grant",
    pins: [
      {
        id: "T1",
        file: SECURITY,
        suite: GRANT_SUITE,
        title: "refuses the transcript read with a typed permission message when the grant is absent",
        quote: "refuses the transcript read with a typed permission message when the grant is absent",
        suiteQuote: GRANT_SUITE_NAME,
      },
      {
        id: "T2",
        file: SECURITY,
        suite: GRANT_SUITE,
        title: "reads and renders the transcript unchanged when the exact grant is present",
        quote: "reads and renders the transcript unchanged when the exact grant is present",
        suiteQuote: GRANT_SUITE_NAME,
      },
      {
        id: "T3",
        file: SECURITY,
        suite: GRANT_SUITE,
        title: "wb-idq: a row the adapter clipped at its bound renders with a visible marker line; an uncut row renders exactly as before",
      },
      {
        id: "T4",
        file: GRANTS,
        suite: GRANTS_SUITE,
        title: "accepts the exact claude:transcript grant the transcript path and evidence loader share",
        quote: "accepts the exact claude:transcript grant the transcript path and evidence loader share",
      },
      { id: "T5", file: PRIVACY, suite: PRIVACY_SUITE, title: "T1: tool bodies and thinking never enter rows, placeholders are exact" },
      { id: "T6", file: PRIVACY, suite: PRIVACY_SUITE, title: "T2: bounds are exported single-carrier constants with unchanged values" },
      {
        id: "T7",
        file: PRIVACY,
        suite: PRIVACY_SUITE,
        title: "T2e (wb-idq): the bounded window is the TAIL of the chain, where the rows hosts list as evidence live: a 45-message chain read at 40 keeps messages 5..44",
      },
      { id: "T8", file: PRIVACY, suite: PRIVACY_SUITE, title: "T2b: whole-text redaction precedes the clip, so a quoted secret straddling the row bound shows no fragment" },
      { id: "T9", file: PRIVACY, suite: PRIVACY_SUITE, title: "T2c: the row clip never splits a surrogate pair (gate O1: helper first, then a code-point-safe clip)" },
      { id: "T10", file: PRIVACY, suite: PRIVACY_SUITE, title: "T2d (wb-idq): a row the bound cut carries clipped: true and an uncut row carries no clipped key at all" },
      { id: "T11", file: PRIVACY, suite: PRIVACY_SUITE, title: "T3: no credential survives any separator shape, on string content and on a text part, through the helper itself" },
      { id: "T12", file: PRIVACY, suite: PRIVACY_SUITE, title: "T3b: P7 a credential split across two text parts is redacted" },
      { id: "T13", file: PRIVACY, suite: PRIVACY_SUITE, title: "T3c: line structure is preserved, parts join with LF, separators never fuse words (the lines layout)" },
      { id: "T14", file: PRIVACY, suite: PRIVACY_SUITE, title: "T3d: output is display-safe, exactly the helper output, idempotent, and redaction is a fixed point" },
      { id: "T15", file: PRIVACY, suite: PRIVACY_SUITE, title: "T4 and T5: uuid and type pass through in source order as plain {type, uuid, text} rows" },
    ],
  },
];

/** The suites pinned whole: the report's cases under each describe path must be exactly its pins (W04-SUITES). */
const FULL_SUITES: readonly { readonly file: string; readonly suite: readonly string[] }[] = [
  { file: ADVERSE, suite: MALFORMED_SUITE },
  { file: ADVERSE, suite: USAGE_SUITE },
  { file: LOOKUP, suite: LOOKUP_SUITE },
  { file: SECURITY, suite: GRANT_SUITE },
  { file: PRIVACY, suite: PRIVACY_SUITE },
];

const ALL_PINS: readonly W04Pin[] = ROWS.flatMap(row => row.pins);
const caseKey = (file: string, suite: readonly string[], title: string): string => JSON.stringify([file, suite, title]);
/** The distinct cases, in first-pin order (one case may answer two rows). */
const CASES: readonly W04Pin[] = ALL_PINS.filter((pin, index) => ALL_PINS.findIndex(other => caseKey(other.file, other.suite, other.title) === caseKey(pin.file, pin.suite, pin.title)) === index);
const FILES: readonly string[] = [...new Set(ALL_PINS.map(pin => pin.file))];
const PINS: readonly CasePin[] = CASES.map(pin => ({ file: pin.file, title: pin.title, suite: pin.suite, tier: DEFAULT_GATE_TIER }));

const TITLE =
  "wb-dc0 W04 acceptance census: 35 pins (34 distinct default-tier cases in 7 test files) for the feature matrix's four W04 rows W04-SCHEMA, W04-USAGE, W04-RESUME and W04-TRANSCRIPT, each collected once, passed and asserting in the gate's own test report";

interface ReportCase {
  readonly title?: string;
  readonly ancestorTitles?: readonly string[];
  readonly status?: string;
}
interface ReportFile {
  readonly name?: string;
  readonly assertionResults?: readonly ReportCase[];
}

let parsed: readonly ReportFile[] | undefined;
/** The report's file entries, parsed once for the cases that read the report directly. */
function reportFiles(): readonly ReportFile[] {
  parsed ??= (JSON.parse(readFileSync(REPORT, "utf8")) as { readonly testResults?: readonly ReportFile[] }).testResults ?? [];
  return parsed;
}
/** The report's records of one file: every file entry whose path ends with the file's. */
const recordsOf = (files: readonly ReportFile[], file: string): readonly ReportFile[] => files.filter(entry => (entry.name ?? "").endsWith(`/${file}`));
const samePath = (left: readonly string[], right: readonly string[]): boolean => JSON.stringify(left) === JSON.stringify(right);

/** The W04 table's body rows, through the shared helper's rendered binding of the section. */
function w04Table(): { readonly ok: boolean; readonly why: string; readonly tables: number; readonly header: readonly string[]; readonly body: readonly (readonly string[])[] } {
  const bound = sectionTables(readFileSync(join(ROOT, MATRIX), "utf8"), W04_HEADING, 2, [MATRIX_TITLE]);
  const [grid] = bound.grids;
  return { ok: bound.ok, why: bound.why, tables: bound.grids.length, header: grid?.[0] ?? [], body: grid?.slice(1) ?? [] };
}

interface Quote {
  readonly file: string;
  readonly suiteQuote: string | null;
  readonly quote: string;
}
/** A test file path, an optional single-quoted suite name, then a parenthetical holding no parenthesis. */
const EVIDENCE_GROUP = /(test\/[A-Za-z0-9._/-]+\.test\.ts)(?: '([^']+)')? \(([^()]*)\)/g;
const QUOTED = /'([^']+)'/g;
/** Every quote of an Evidence cell, attributed to the test file whose parenthetical holds it, in cell order. */
function evidenceQuotes(cell: string): readonly Quote[] {
  return [...cell.matchAll(EVIDENCE_GROUP)].flatMap(group =>
    [...(group[3] ?? "").matchAll(QUOTED)].map(quoted => ({ file: group[1] ?? "", suiteQuote: group[2] ?? null, quote: quoted[1] ?? "" })),
  );
}
const LABEL = /^L\d+: /;
/** Whether a matrix quote names a case title: itself, after an "L<n>: " label, or around one " ... " elision whose two parts do not overlap. */
function names(quote: string, title: string): boolean {
  if (title === quote) return true;
  if (LABEL.test(title) && title.replace(LABEL, "") === quote) return true;
  const parts = quote.split(" ... ");
  const [before, after] = parts;
  return parts.length === 2 && before !== undefined && after !== undefined && title.length > before.length + after.length && title.startsWith(before) && title.endsWith(after);
}

/** Each verdict that is not ok, or not collected exactly once, with the title and the cause the judge names. */
function refusals(verdicts: readonly PinVerdict[]): string[] {
  return verdicts.filter(verdict => !verdict.ok || verdict.cases !== 1).map(verdict => `${verdict.pin.file} :: ${verdict.pin.title} [${verdict.code}, cases ${verdict.cases}]: ${verdict.why}`);
}

describe(TITLE, () => {
  it("W04-SHAPE frozen shape: four rows, each with its pin ids in order", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["W04-SCHEMA:6", "W04-USAGE:6", "W04-RESUME:8", "W04-TRANSCRIPT:15"]);
    expect(ROWS.map(row => [row.id, row.pins.map(pin => pin.id)])).toEqual([
      ["W04-SCHEMA", ["S1", "S2", "S3", "S4", "S5", "S6"]],
      ["W04-USAGE", ["U1", "U2", "U3", "U4", "U5", "U6"]],
      ["W04-RESUME", ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"]],
      ["W04-TRANSCRIPT", ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12", "T13", "T14", "T15"]],
    ]);
  });

  it("W04-ROWS the matrix's W04 section holds one table whose body rows' Feature cells are the four rows' features, in order", () => {
    const table = w04Table();
    expect({ ok: table.ok, why: table.why, tables: table.tables, header: table.header, features: table.body.map(cells => cells[0]) }).toStrictEqual({
      ok: true,
      why: "",
      tables: 1,
      header: MATRIX_HEADER,
      features: ROWS.map(row => row.feature),
    });
  });

  it("W04-QUOTES each row's Evidence cell quotes exactly the row's quote-bearing pins of default-tier files, in order, and each quote names its pin", () => {
    const table = w04Table();
    const evidence = MATRIX_HEADER.indexOf("Evidence");
    const read = ROWS.map((row, index) => ({
      row: row.id,
      quotes: evidenceQuotes(table.body[index]?.[evidence] ?? "").filter(quote => !NOT_DEFAULT_TIER.includes(quote.file)),
      unnamed: row.pins.filter(pin => pin.quote !== undefined && !names(pin.quote, pin.title)).map(pin => pin.id),
      suiteMismatch: row.pins.filter(pin => pin.suiteQuote !== undefined && pin.suiteQuote !== pin.suite[pin.suite.length - 1]).map(pin => pin.id),
    }));
    expect(read).toStrictEqual(
      ROWS.map(row => ({
        row: row.id,
        quotes: row.pins.flatMap(pin => (pin.quote === undefined ? [] : [{ file: pin.file, suiteQuote: pin.suiteQuote ?? null, quote: pin.quote }])),
        unnamed: [],
        suiteMismatch: [],
      })),
    );
  });

  it("W04-PARSE over a synthetic Evidence cell the group reader yields exactly the quotes of its test-file groups, in order, and nothing else", () => {
    const cell = [
      "src/workbench/x.ts:12 (a src parenthetical 'not a case').",
      "test/workbench-a.test.ts ('first quote', 'second quote'), test/workbench-b.test.ts 'Suite B' ('third quote'; landed 0000000).",
      "Live: test/workbench-c.test.ts (live tier; TRACEABILITY 'a live heading' cmd_0).",
      "qa/workbench/d.mjs probe ('a qa quote'). TRACEABILITY WB-000 ('a traceability quote');",
      "test/workbench-e.test.ts A11 and test/workbench-f.test.ts (no quoted case), test/workbench-g.test.ts ('nested (paren) quote').",
    ].join(" ");
    expect(evidenceQuotes(cell)).toStrictEqual([
      { file: "test/workbench-a.test.ts", suiteQuote: null, quote: "first quote" },
      { file: "test/workbench-a.test.ts", suiteQuote: null, quote: "second quote" },
      { file: "test/workbench-b.test.ts", suiteQuote: "Suite B", quote: "third quote" },
      { file: "test/workbench-c.test.ts", suiteQuote: null, quote: "a live heading" },
    ]);
  });

  it("W04-NAMES the quote rule accepts a title itself, the title after an L<n>: label and one elision's title with unoverlapped parts, and nothing else", () => {
    const accepted: readonly (readonly [string, string])[] = [
      ["refuses the read", "refuses the read"],
      ["refuses the read", "L4: refuses the read"],
      ["L3: opens ... and closes", "L3: opens the stream and closes"],
      ["opens ... closes", "opens closes"],
    ];
    const refused: readonly (readonly [string, string])[] = [
      ["refuses the read", "refuses the read again"],
      ["refuses the read", "X4: refuses the read"],
      ["refuses the read", "L4 refuses the read"],
      ["abc ... cde", "abcde"],
      ["opens ... closes", "reopens the stream and closes"],
      ["opens ... and ... closes", "opens a and b closes"],
    ];
    expect({ accepted: accepted.map(([quote, title]) => names(quote, title)), refused: refused.map(([quote, title]) => names(quote, title)) }).toStrictEqual({
      accepted: accepted.map(() => true),
      refused: refused.map(() => false),
    });
  });

  it("W04-SUITES each fully pinned suite's cases in the report are exactly its pins, in order, each passed", { timeout: JUDGE_TIMEOUT }, () => {
    const files = reportFiles();
    const read = FULL_SUITES.map(({ file, suite }) => {
      const records = recordsOf(files, file);
      const cases = (records[0]?.assertionResults ?? []).filter(entry => samePath(entry.ancestorTitles ?? [], suite));
      return { file, suite, recorded: records.length, titles: cases.map(entry => entry.title ?? "<untitled>"), statuses: cases.map(entry => entry.status ?? "<no status>") };
    });
    expect(read).toStrictEqual(
      FULL_SUITES.map(({ file, suite }) => {
        const pinned = CASES.filter(pin => pin.file === file && samePath(pin.suite, suite));
        return { file, suite, recorded: 1, titles: pinned.map(pin => pin.title), statuses: pinned.map(() => "passed") };
      }),
    );
  });

  it("W04-ANCHORED every pin carries a matrix quote or sits in a fully pinned suite, every fully pinned suite holds a pin, and pin ids are unique", () => {
    const inFullSuite = (pin: W04Pin): boolean => FULL_SUITES.some(({ file, suite }) => pin.file === file && samePath(pin.suite, suite));
    expect({
      unanchored: ALL_PINS.filter(pin => pin.quote === undefined && !inFullSuite(pin)).map(pin => pin.id),
      emptySuites: FULL_SUITES.filter(({ file, suite }) => !ALL_PINS.some(pin => pin.file === file && samePath(pin.suite, suite))).map(({ suite }) => suite.join(" > ")),
      duplicateIds: ALL_PINS.map(pin => pin.id).filter((id, index, ids) => ids.indexOf(id) !== index),
    }).toStrictEqual({ unanchored: [], emptySuites: [], duplicateIds: [] });
  });

  it("W04-JUDGE judge() reads each pinned case under its describe path collected once, passed in the test tier's report and asserting", { timeout: JUDGE_TIMEOUT }, () => {
    const verdicts = judge(REPORT, PINS);
    expect({ judged: verdicts.length, refused: refusals(verdicts), codes: verdicts.map(verdict => `${verdict.code}:${verdict.cases}`) }).toStrictEqual({
      judged: PINS.length,
      refused: [],
      codes: PINS.map(() => "ok:1"),
    });
  });

  it("W04-LIVENESS judge() reads a made-up title red, as absent, naming it (an accept-all judge cannot pass here)", { timeout: JUDGE_TIMEOUT }, () => {
    const [verdict] = judge(REPORT, [{ file: LOOKUP, title: "W04 no such pinned case", suite: LOOKUP_SUITE, tier: DEFAULT_GATE_TIER }]);
    expect({ ok: verdict?.ok, code: verdict?.code, named: verdict?.why.includes("W04 no such pinned case") }).toStrictEqual({ ok: false, code: "absent", named: true });
  });

  it("W04-NOT-DEFAULT-TIER the report holds no entry for a file whose Evidence quotes are set aside", { timeout: JUDGE_TIMEOUT }, () => {
    const files = reportFiles();
    expect(NOT_DEFAULT_TIER.map(file => [file, recordsOf(files, file).length])).toStrictEqual(NOT_DEFAULT_TIER.map(file => [file, 0]));
  });

  it("W04-TITLE the describe title names the pinned set by its counts and its four row ids", () => {
    const counts = `${ALL_PINS.length} pins (${CASES.length} distinct default-tier cases in ${FILES.length} test files)`;
    expect({ counts: TITLE.includes(counts), rows: ROWS.filter(row => !TITLE.includes(row.id)).map(row => row.id) }).toStrictEqual({ counts: true, rows: [] });
  });
});
