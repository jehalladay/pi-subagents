/**
 * wb-gs2.3 (W19 / docs-12): census falsifier for docs/workbench/12-security.md "Authorization design" (eight bullets)
 * and "Auditability" (three sentences), a census leg of the wb-nl8 census tier (vitest.census.config.ts, include
 * test/**\/*.census.ts) judged in wb-u62 REPORT MODE. It is a member of the sequenced census class (owner program ruling
 * 2026-10-16: one post-u62/post-nl8 adoption cut per census, report mode, no bare-text title scanning). It replaces the
 * refused executing-mode cut (a nested `vitest run` from inside the default gate, GATE-REFUSED, do-not-land).
 *
 * Every row binds one falsifiable sentence of the two sections to existing cases by file, VERBATIM title and tier, or
 * records it "unpinned" with a written reason that never counts as satisfied. The leg executes no pinned case and no
 * test run: judge() from the shared helper test/helpers/census.ts reads vitest's own JSON report of the default gate's
 * test step (DEFAULT_TIER_REPORT, written by `npm run test` before the census step runs), so a pin counts only when the
 * gate's own run collected it exactly once, recorded it passed, and its body asserts - the helper's three legs,
 * fail-closed. A renamed, deleted, duplicated, skipped, todo, inverted, excluded or unregistered pinned case therefore
 * reads red, naming the row, the file, the title and the cause, as far as the helper's resolvable-construct roster and
 * its named residuals reach (test/helpers/census.ts, receipts/wb-u62.md). This leg scans no test source for case calls
 * itself and spawns nothing: every title is located by the helper, from vitest's report.
 *
 * Tiers. Every pin is a default-gate case (tier DEFAULT_GATE_TIER); judge() refuses a pin of any other tier
 * (tier-mismatch). No pin carries a live or native label, so there is no presence-only live pin to record: a live SDK
 * pass would need its own tier leg inside that tier, and a default-gate presence check never reports one.
 *
 * What this leg does NOT prove. A passing pin is a presence, run and assertion check, not a proof that the case is a
 * strong test of its sentence. It does not probe the RPC/host boundary or the sandbox isolation child (that is the
 * wb-ksz slices; row A4b stays unpinned with wb-ksz.5 as its oracle). The two docs sections are read from the RENDERED
 * view (the helper's docsSection / sectionMatches): each must render as exactly its frozen blocks, so a dropped,
 * reworded or added bullet, a prose paragraph, a ### subsection, an HTML comment or an unpunctuated tail goes red. The
 * drift falsifiers run over a SYNTHETIC document built from the frozen blocks, never the live docs/12 text.
 *
 * FROZEN SHAPE (owner standing order 2026-10-18, rule 16): the table pins its own shape as literals in the same cut:
 * the row/pin-count list and one digest per row of its requirement and pin identities. Deleting a pin, shortening a
 * requirement, or swapping a pin for an unrelated passing case reds the census (AC1, falsified in-memory below).
 *
 * Landing-order rule (owner, 2026-10-16): once this lands, any later edit to docs/12 "Authorization design" or
 * "Auditability" reddens it by design, and the editing change updates this census in the same commit.
 *
 * This census binds cases only: no source, doc or other test file is edited; it leaves docs/12 "Security acceptance
 * tests" (wb-gs2.2) alone and never edits test/workbench-security-workflow.test.ts.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, docsSection, judge, type PinVerdict, type RenderedBlock, sectionMatches, sourceStructure } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SELF = "test/workbench-docs12-authorization.census.ts";
const DOCS_FILE = "docs/workbench/12-security.md";
const DOCS_PARENT = "12 — Trust model, authorization, isolation and sensitive data";

type Section = "authorization" | "auditability";
type Status = "pinned" | "unpinned";

interface Pin {
  readonly file: string;
  /** Verbatim case title, exactly as registered (an it.each pin: the literal template). */
  readonly title: string;
  /** it.each template pin: the table must register at least this many cases. */
  readonly minCases?: number;
  /** Exact enclosing describe path, outermost first: tells apart the per-adapter instances of one describe.each title. */
  readonly suite?: readonly string[];
}

interface Row {
  readonly id: string;
  readonly section: Section;
  /** The rendered docs/12 text this row binds: one bullet (Authorization design) or one sentence (Auditability). */
  readonly requirement: string;
  readonly status: Status;
  readonly pins: readonly Pin[];
  /** Unpinned rows: why no case exists. */
  readonly reason?: string;
  /** Pinned rows: a written limit on what the pins prove. */
  readonly gap?: string;
}

/** The eight "Authorization design" bullets as the markdown source says them (the A6 text carries inline code). */
const AUTH_MARKDOWN: readonly string[] = [
  "Caller identity and scope bound at workbench entry point; impersonation from script payload prohibited.",
  "Separate discover, inspect, observe, invoke and control grants.",
  "Node cap must be explicitly allowed in workflow and Claude agent role; never auto-share all registered providers.",
  "Policy enforced in privileged host *after* receiving RPC, not only by hiding tool names.",
  "Control decisions require native ownership/preconditions and, for destructive actions, operator confirmation.",
  'A control adapter executes only the decision object the decision core minted in this process: `isCoreMintedDecision` (src/workbench/control.ts) is an identity check against a module-private WeakSet, so a copy, a deserialized or audit/journal-replayed receipt and a hand-built look-alike are refused with the fixed text "decision was not minted by the decision core" however exact their shape, and structural vetting stays behind it as defense in depth.',
  "Treat unknown permission data as deny.",
  "Source/deployment pin must be checked before loading; malformed schema/unsupported contract fails closed.",
];
/** What a reader sees of each bullet: the markdown source without emphasis and code markers. */
const renderedOf = (markdown: string): string => markdown.replaceAll("*", "").replaceAll("`", "");
const AUTH_RENDERED: readonly string[] = AUTH_MARKDOWN.map(renderedOf);

/** The three "Auditability" sentences; the section renders as ONE paragraph of all three. */
const AUDIT_SENTENCES: readonly string[] = [
  "Record authorized principal, capability contract version, logical invocation, target native ref, reason/policy, request acknowledgment and producer outcome for control operations.",
  "Keep sensitive payload refs separate and access-controlled.",
  "Logs are not a source of entitlement.",
];
const AUDIT_PARAGRAPH = AUDIT_SENTENCES.join(" ");

const SECTION_HEADING: Readonly<Record<Section, string>> = { authorization: "Authorization design", auditability: "Auditability" };
const SECTION_ORDER: readonly Section[] = ["authorization", "auditability"];
const sectionBlocks = (section: Section): readonly RenderedBlock[] =>
  section === "authorization"
    ? [{ kind: "list", ordered: false, items: AUTH_MARKDOWN.map((markdown, index) => ({ text: AUTH_RENDERED[index] ?? "", markdown })) }]
    : [{ kind: "paragraph", text: AUDIT_PARAGRAPH, markdown: AUDIT_PARAGRAPH }];
const sectionText = (section: Section): string => (section === "authorization" ? AUTH_RENDERED.join("\n") : AUDIT_PARAGRAPH);

const CLAUDE_TOOLS = "test/workbench-claude-capability-tools.test.ts";
const CONTROL = "test/workbench-control.test.ts";
const FURNACE_CONTROL = "test/workbench-furnace-control.test.ts";
const PROVENANCE = "test/workbench-control-provenance.test.ts";
const PROVENANCE_DEPTH = "test/workbench-control-provenance-depth.test.ts";
const REGISTRY_SCHEMA = "test/workbench-registry-schema.test.ts";
const SECURITY_CAPABILITY = "test/workbench-security-capability.test.ts";
const SECURITY_WORKFLOW = "test/workbench-security-workflow.test.ts";

const pin = (file: string, title: string): Pin => ({ file, title });
const eachPin = (file: string, title: string, minCases: number): Pin => ({ file, title, minCases });

/**
 * The provenance file registers its adapter cases through describe.each(SUBJECTS): one title, three collected cases, told
 * apart only by the enclosing describe title the runner reports (the $adapter label, with the runner's own ellipsis).
 * A case pinned by title alone reads duplicated, so each adapter's instance is pinned by its exact suite path, which also
 * makes a dropped adapter row read red (its pin is then absent).
 */
const PROVENANCE_ADAPTER_SUITES: readonly string[] = [
  "'furnace (src/workbench/furnace-contro…' refuses a decision the core did not mint",
  "'claude-agent-sdk (src/workbench/claud…' refuses a decision the core did not mint",
  "'forge (src/workbench/forge-control.ts)' refuses a decision the core did not mint",
];
const perAdapter = (file: string, title: string): Pin[] => PROVENANCE_ADAPTER_SUITES.map(suite => ({ file, title, suite: [suite] }));

/** Freezes the table and everything it holds, so no row or pin can be edited at runtime. */
function freezeDeep<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) freezeDeep(child);
    Object.freeze(value);
  }
  return value;
}

function isDeepFrozen(value: unknown): boolean {
  if (value === null || typeof value !== "object") return true;
  return Object.isFrozen(value) && Object.values(value).every(isDeepFrozen);
}

const auth = (index: number): string => AUTH_RENDERED[index] ?? "";
const audit = (index: number): string => AUDIT_SENTENCES[index] ?? "";

const ROWS: readonly Row[] = freezeDeep<readonly Row[]>([
  {
    id: "A1",
    section: "authorization",
    requirement: auth(0),
    status: "pinned",
    gap: "security-workflow 'node() refuses grant/identity options before dispatching' evidences THIS row (a script payload carrying grants, principal, workspace or scope is refused before any host call), not A4: it asserts refusal BEFORE dispatch, the opposite half of 'enforced in the host after receiving the RPC'.",
    pins: [
      pin(CLAUDE_TOOLS, "rejects contract drift, malformed native payload, and impersonation before provider dispatch"),
      pin(CLAUDE_TOOLS, "does not accept SDK-stripped identity arguments as host authority"),
      pin(CONTROL, "rule 5: a target in another workspace or principal is an authorization failure even with a valid control grant"),
      pin(SECURITY_WORKFLOW, "node() refuses grant/identity options before dispatching to a host capability"),
    ],
  },
  {
    id: "A2",
    section: "authorization",
    requirement: auth(1),
    status: "pinned",
    pins: [
      pin(CLAUDE_TOOLS, "registration and discovery never authorize invocation"),
      pin(CLAUDE_TOOLS, "discovery, contract and native inspect remain independently granted"),
      pin(CONTROL, "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing"),
    ],
  },
  {
    id: "A3",
    section: "authorization",
    requirement: auth(2),
    status: "pinned",
    pins: [
      pin(CLAUDE_TOOLS, "requires BOTH role membership and exact invoke grant plus producer permission"),
      pin(CLAUDE_TOOLS, "discovery is finite and does not enumerate provider registrations outside the role"),
      pin(CLAUDE_TOOLS, "a role list never turns a registered write fixture into an executable operation"),
    ],
  },
  {
    id: "A4a",
    section: "authorization",
    requirement: auth(3),
    status: "pinned",
    gap: "COVERED HALF of A4: the host MCP capability surface and the registry refuse a crafted call after receiving it. The other half is A4b.",
    pins: [
      pin(SECURITY_CAPABILITY, "hostile caller-added outer identity/grants never reach provider; inner authority fields are refused"),
      pin(SECURITY_CAPABILITY, "registry also refuses extra authority fields and prototype keys before calling a strict provider"),
    ],
  },
  {
    id: "A4b",
    section: "authorization",
    requirement: auth(3),
    status: "unpinned",
    reason:
      "UNCOVERED HALF of A4: a crafted raw RPC call sent from the sandbox isolation child into the privileged host. No landed case sends one; the nearest case, security-workflow 'node() refuses grant/identity options before dispatching', refuses BEFORE dispatch (it asserts the host capability is never called), so it is the A1 half, not host-side enforcement after receipt. Oracle: wb-ksz.5 (owner-reviewed). Promoting this row means adding pins and flipping its status in one reviewed change.",
    pins: [],
  },
  {
    id: "A5",
    section: "authorization",
    requirement: auth(4),
    status: "pinned",
    pins: [
      pin(CONTROL, "rule 6: causation, grouping, dependency and hypothesis never confer lifecycle ownership, and the owned child holds no owner rights"),
      pin(CONTROL, "rule 7: destructive actions need params.confirmed === true as an own data property, and a getter is never invoked"),
    ],
  },
  {
    id: "A6",
    section: "authorization",
    requirement: auth(5),
    status: "pinned",
    gap: "The eighth bullet wb-pjj added (landed 37d0bcb): the provenance cases prove a copy, a structural look-alike and a JSON round-trip of a permitted decision are refused with the fixed text before any native verb.",
    pins: [
      pin(PROVENANCE, "refuses every copy: structural, JSON and structuredClone copies, re-wraps, inheritors, proxies and later receipt phases"),
      ...perAdapter(PROVENANCE, "refuses every structurally exact look-alike of a genuine permit with the fixed text, before any native verb"),
      ...perAdapter(PROVENANCE, "refuses a JSON round-trip of a permitted decision exactly as the audit or the journal would hand it back"),
      pin(PROVENANCE_DEPTH, "a minted permit executes; every structurally exact forgery of it is refused with the fixed provenance text first"),
    ],
  },
  {
    id: "A7",
    section: "authorization",
    requirement: auth(6),
    status: "pinned",
    pins: [
      pin(CONTROL, "rule 1: unknown permission data (undefined, non-array, non-string entries, wildcards) is an authorization denial"),
      pin(CLAUDE_TOOLS, "validates finite host policy and refuses wildcard or incomplete authority"),
    ],
  },
  {
    id: "A8",
    section: "authorization",
    requirement: auth(7),
    status: "pinned",
    gap: "The it.each schema template is pinned as a template: its table must register at least 28 cases, each passing, so a hollowed table reads red as each-empty or a short count, never as green.",
    pins: [
      pin(CLAUDE_TOOLS, "rechecks the host deployment pin for each call and redacts unexpected pin errors"),
      pin(CLAUDE_TOOLS, "pins immutable host authorization despite later config mutation"),
      eachPin(REGISTRY_SCHEMA, "rejects malformed or unsupported schema %j without provider effects", 28),
      pin(REGISTRY_SCHEMA, "rejects malformed output contract before provider execution"),
    ],
  },
  {
    id: "D1",
    section: "auditability",
    requirement: audit(0),
    status: "pinned",
    pins: [
      pin(CONTROL, "permits the confirmed owner and records principal, contract, invocation, target, grant, policy and the ownership confirmation"),
      pin(CONTROL, "requested, acknowledged and result are three distinct, ordered, frozen receipts that each carry their own timestamp"),
    ],
  },
  {
    id: "D2",
    section: "auditability",
    requirement: audit(1),
    status: "unpinned",
    reason:
      "No landed case asserts this for control operations. The payload-reference cases that exist are all on the OBSERVATION side and prove a different property: reactivefiber-observer 'rf-output:sha256' digest ref and claude-topology 'no nativePayloadRef on a snapshot' assert how an observation snapshot is shaped, grouped-fixture 'carries transcript payload references, never bodies' asserts fixture input fields, and observation 'keeps payload references instead of bodies' asserts projection capacity bounds with cross-scope query denial. None of them records or inspects a control-operation audit receipt, so none shows that a control audit receipt keeps sensitive payload refs separate or access-controlled; pinning them would overclaim. The nearest control-side cases (control 'malformed envelope: every field copied into the audit receipt is bounded clean text', furnace-control 'parks every seam failure with a bounded native label') prove receipt field hygiene and message non-echo. No oracle bead is in flight; the owner default is keep-unpinned-with-reason.",
    pins: [],
  },
  {
    id: "D3",
    section: "auditability",
    requirement: audit(2),
    status: "pinned",
    gap: "wb-pjj landed: the provenance case that hands back a permitted decision exactly as the audit or journal would is refused is the direct evidence that a logged copy never entitles execution (pin-flip executed at the re-cut).",
    pins: [
      pin(FURNACE_CONTROL, "refuses a raw request, a look-alike, a phase-advanced or a forged receipt as unvetted, before the seam and without reading accessors"),
      ...perAdapter(PROVENANCE, "refuses a JSON round-trip of a permitted decision exactly as the audit or the journal would hand it back"),
    ],
  },
]);

/** AC1 literal 1 (rule 16): the row order and the pin count of every row, frozen at the cut's base. */
const FROZEN_SHAPE: readonly string[] = ["A1:4", "A2:3", "A3:3", "A4a:2", "A4b:0", "A5:2", "A6:8", "A7:2", "A8:4", "D1:2", "D2:0", "D3:4"];
/** AC1 literal 2 (rule 16): one digest per row of its section, requirement and every pin's file, title and minimum, so a swap, a shortened requirement or a re-titled pin reddens the row it sits in. */
const FROZEN_DIGESTS: readonly string[] = [
  "A1:6e98ff9ecab8",
  "A2:8fc29a3e0c39",
  "A3:8f2e2bcad3a7",
  "A4a:12cfa524f462",
  "A4b:2afa9e7c02ae",
  "A5:e8e294356a83",
  "A6:f03c96aa82b9",
  "A7:4c536e87217b",
  "A8:db9a5a6600de",
  "D1:915189d59af7",
  "D2:7183bbdc6d75",
  "D3:778a0913ba42",
];

const shapeOf = (rows: readonly Row[]): string[] => rows.map(row => `${row.id}:${row.pins.length}`);
const digestOf = (row: Row): string =>
  `${row.id}:${createHash("sha256")
    .update(JSON.stringify([row.section, row.requirement, row.pins.map(entry => [entry.file, entry.title, entry.minCases ?? 0, entry.suite ?? []])]))
    .digest("hex")
    .slice(0, 12)}`;
const digestsOf = (rows: readonly Row[]): string[] => rows.map(digestOf);

const UNPINNED_IDS: readonly string[] = ["A4b", "D2"];
const PINNED_IDS: readonly string[] = ["A1", "A2", "A3", "A4a", "A5", "A6", "A7", "A8", "D1", "D3"];

const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const casePin = (entry: Pin): CasePin => ({ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER, ...(entry.suite === undefined ? {} : { suite: entry.suite }), ...(entry.minCases === undefined ? {} : { each: { minCases: entry.minCases } }) });
const JUDGED = ROWS.filter(row => row.pins.length > 0);

/** One line per pin that is not ok, naming the row; the helper's why names the file, title, tier and cause. */
const failures = (row: Row, verdicts: readonly PinVerdict[]): string[] => verdicts.filter(verdict => !verdict.ok).map(verdict => `row ${row.id}: ${verdict.code}: ${verdict.why}`);

/**
 * Every docs drift, each naming the row or the section it breaks. The per-row requirement checks read the section's
 * rendered text and run independently of the exactness check, so a dropped or reworded clause names its row.
 */
function docsFailures(markdown: string, rows: readonly Row[] = ROWS): string[] {
  const out: string[] = [];
  for (const section of SECTION_ORDER) {
    const heading = SECTION_HEADING[section];
    const found = docsSection(markdown, heading, 2, [DOCS_PARENT]);
    if (!found.ok) {
      out.push(`${DOCS_FILE} § ${heading}: the section is refused: ${found.why}`);
      continue;
    }
    const rendered = found.blocks
      .map(block => {
        if (block.kind === "paragraph") return block.text;
        if (block.kind === "list") return block.items.map(item => item.text).join("\n");
        return "";
      })
      .join("\n");
    for (const row of rows) {
      if (row.section === section && !rendered.includes(row.requirement)) out.push(`row ${row.id}: its clause "${row.requirement}" no longer renders in ${DOCS_FILE} § ${heading}`);
    }
    const exact = sectionMatches(found, sectionBlocks(section));
    if (!exact.ok) out.push(`${DOCS_FILE} § ${heading} is not exactly its frozen blocks: ${exact.why}`);
  }
  return out;
}

/** The synthetic document the drift falsifiers run over: the frozen bodies under the real heading shape, never the live text. */
const bodyOf = (section: Section): string => (section === "authorization" ? AUTH_MARKDOWN.map(item => `- ${item}`).join("\n") : AUDIT_PARAGRAPH);
const synthetic = (edit: (section: Section, body: string) => string = (_section, body) => body, tail = ""): string => {
  const first = `## ${SECTION_HEADING.authorization}\n\n${edit("authorization", bodyOf("authorization"))}\n`;
  const second = `## ${SECTION_HEADING.auditability}\n\n${edit("auditability", bodyOf("auditability"))}\n`;
  return `# ${DOCS_PARENT}\n\n## Threat categories\n\nOther text.\n\n${first}\n## Credential boundaries\n\nOther text.\n\n${second}\n## Security acceptance tests\n\nOther text.\n${tail}`;
};
const editSection = (section: Section, from: string, to: string) => (current: Section, body: string): string => (current === section ? body.replace(from, to) : body);
const named = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith("row ")).map(line => line.slice(0, line.indexOf(":")));

describe("wb-gs2.3 docs/12 authorization-and-auditability census (report mode): the table and the requirement text", () => {
  it("AC1: the table holds the twelve frozen rows (nine Authorization design incl. the A4 split, three Auditability), deeply frozen, with unique ids", () => {
    expect(isDeepFrozen(ROWS)).toBe(true);
    expect(ROWS).toHaveLength(12);
    expect(new Set(ROWS.map(row => row.id)).size).toBe(12);
    expect(ROWS.filter(row => row.section === "authorization")).toHaveLength(9);
    expect(ROWS.filter(row => row.section === "auditability")).toHaveLength(3);
    expect(AUTH_MARKDOWN).toHaveLength(8);
    expect(AUDIT_SENTENCES).toHaveLength(3);
  });

  it("AC1 frozen shape (rule 16): the row order and every row's pin count equal the literal frozen at the base", () => {
    expect(shapeOf(ROWS)).toEqual(FROZEN_SHAPE);
  });

  it("AC1 frozen shape (rule 16): every row's section, requirement and pin identities equal the digest frozen at the base", () => {
    expect(digestsOf(ROWS)).toEqual(FROZEN_DIGESTS);
  });

  it("AC1: every authorization requirement is exactly its rendered docs bullet and every auditability requirement exactly one of the three sentences", () => {
    const expected: Readonly<Record<string, string>> = {
      A1: auth(0),
      A2: auth(1),
      A3: auth(2),
      A4a: auth(3),
      A4b: auth(3),
      A5: auth(4),
      A6: auth(5),
      A7: auth(6),
      A8: auth(7),
      D1: audit(0),
      D2: audit(1),
      D3: audit(2),
    };
    for (const row of ROWS) expect(row.requirement, `row ${row.id}`).toBe(expected[row.id]);
  });

  it("AC1: the two sections render exactly their frozen blocks (HTML-free, whole-section equality) and every row's clause renders in its own section", () => {
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
    for (const section of SECTION_ORDER) {
      expect(sectionMatches(docsSection(readRepo(DOCS_FILE), SECTION_HEADING[section], 2, [DOCS_PARENT]), sectionBlocks(section)), section).toEqual({ ok: true, why: "" });
    }
  });

  it("AC3: a pinned row holds pins and no reason, an unpinned row holds a reason and no pins, and every pin is a default-gate case", () => {
    for (const row of ROWS) {
      if (row.status === "pinned") {
        expect(row.pins.length, `row ${row.id}: a pinned row has pins`).toBeGreaterThan(0);
        expect(row.reason, `row ${row.id}: a pinned row carries no unpinned reason`).toBeUndefined();
      } else {
        expect(row.pins, `row ${row.id}: an unpinned row carries no pins`).toEqual([]);
        expect((row.reason ?? "").trim().length, `row ${row.id}: an unpinned row needs a written reason`).toBeGreaterThan(40);
      }
      for (const entry of row.pins) expect(casePin(entry).tier, `row ${row.id}: ${entry.title}`).toBe(DEFAULT_GATE_TIER);
    }
  });

  it("AC3: the pinned and unpinned rows are exactly the expected lists, so no unpinned row is ever counted as passed", () => {
    expect(ROWS.filter(row => row.status === "pinned").map(row => row.id)).toEqual(PINNED_IDS);
    expect(ROWS.filter(row => row.status === "unpinned").map(row => row.id)).toEqual(UNPINNED_IDS);
    expect(JUDGED.map(row => row.id)).toEqual(PINNED_IDS);
    const reasons = Object.fromEntries(ROWS.filter(row => row.status === "unpinned").map(row => [row.id, row.reason ?? ""]));
    expect(reasons.A4b).toContain("wb-ksz.5");
    expect(reasons.A4b).toContain("BEFORE dispatch");
    expect(reasons.D2).toContain("OBSERVATION side");
    expect(reasons.D2).toContain("keep-unpinned-with-reason");
  });

  it("AC3: the half-coverage limits are written on their rows: A1 owns the before-dispatch case, A4a is the covered half, A8 pins its table, D3 names the provenance flip", () => {
    const gap = (id: string): string => ROWS.find(row => row.id === id)?.gap ?? "";
    expect(gap("A1")).toContain("BEFORE dispatch");
    expect(gap("A4a")).toContain("COVERED HALF");
    expect(gap("A8")).toContain("at least 28 cases");
    expect(gap("D3")).toContain("wb-pjj landed");
    expect(gap("A6")).toContain("wb-pjj");
  });

  it("AC3: only the A8 schema template carries an it.each minimum, and it is the real 28-case table", () => {
    const eaches = ROWS.flatMap(row => row.pins.filter(entry => entry.minCases !== undefined).map(entry => [row.id, entry.minCases]));
    expect(eaches).toEqual([["A8", 28]]);
  });

  it("AC3: no row pins a case from another bead's census, and none pins this file", () => {
    const pinnedFiles = ROWS.flatMap(row => row.pins.map(entry => entry.file));
    expect(pinnedFiles.filter(file => file.includes("census"))).toEqual([]);
    expect(pinnedFiles.some(file => file.endsWith(".census.ts"))).toBe(false);
  });

  it.each(JUDGED)("AC2 row $id: every pinned case is collected once, passed and asserting in the default gate's own report", row => {
    const verdicts = judge(
      REPORT,
      row.pins.map(entry => casePin(entry)),
    );
    expect(verdicts).toHaveLength(row.pins.length);
    expect(failures(row, verdicts)).toEqual([]);
    expect(verdicts.map(verdict => verdict.code)).toEqual(row.pins.map(() => "ok"));
  });

  it("AC4: the leg judges the gate's own report and executes nothing: it imports judge, never judgePins, and loads no module at runtime", () => {
    const own = sourceStructure(ROOT, SELF);
    expect(own.ok, own.why).toBe(true);
    const helper = own.imports.filter(entry => entry.module === "./helpers/census.js").flatMap(entry => entry.names);
    expect(helper).toContain("judge");
    expect(helper).not.toContain("judgePins");
    expect(own.imports.filter(entry => entry.kind === "dynamic" || entry.kind === "require")).toEqual([]);
    expect(own.imports.map(entry => entry.module).filter(module => module.includes("child_process") || module.includes("worker_threads"))).toEqual([]);
  });

  it("AC4: the leg is a census-tier file, outside the default include whose report it judges", () => {
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(SELF)).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
    expect(readRepo("vitest.census.config.ts")).toContain('include: ["test/**/*.census.ts"]');
  });
});

describe("wb-gs2.3 liveness: the adopted judge is not accept-all (the real report, no fabricated verdict)", () => {
  const rowOf = (id: string): Row => {
    const row = ROWS.find(candidate => candidate.id === id);
    if (row === undefined) throw new Error(`no row ${id}`);
    return row;
  };
  const firstPin = (id: string): { row: Row; entry: Pin } => {
    const row = rowOf(id);
    const entry = row.pins[0];
    if (entry === undefined) throw new Error(`row ${id} holds no pin`);
    return { row, entry };
  };

  it("M1: a pinned title altered by one character is absent from the report and red, naming the row, the file and the title", () => {
    const { row, entry } = firstPin("A2");
    const wrong = { ...entry, title: entry.title.replace("never authorize", "never authorizE") };
    const verdicts = judge(REPORT, [casePin(wrong)]);
    expect(verdicts[0]?.code).toBe("absent");
    const [line] = failures(row, verdicts);
    expect(line).toContain("row A2");
    expect(line).toContain(entry.file);
    expect(line).toContain(wrong.title);
  });

  it("M2: a row removed from the table fails the frozen shape, naming no stale pass (a missing unpinned row too)", () => {
    expect(shapeOf(ROWS.filter(row => row.id !== "A5"))).not.toEqual(FROZEN_SHAPE);
    expect(shapeOf(ROWS.filter(row => row.id !== "D2"))).not.toEqual(FROZEN_SHAPE);
    expect(digestsOf(ROWS.filter(row => row.id !== "A5"))).not.toEqual(FROZEN_DIGESTS);
  });

  it("M3: a pin promoted without a title is red (the judge finds no such case)", () => {
    const { entry } = firstPin("A3");
    const [verdict] = judge(REPORT, [casePin({ ...entry, title: "" })]);
    expect(verdict?.ok).toBe(false);
  });

  it("M4: a pin pointed at a file the default gate never ran is red, not collected", () => {
    const { entry } = firstPin("D1");
    const [verdict] = judge(REPORT, [casePin({ ...entry, file: "test/workbench-no-such-file.test.ts" })]);
    expect(verdict?.ok).toBe(false);
    expect(["unreadable", "not-collected", "unmapped-location", "absent"]).toContain(verdict?.code);
  });

  it("M5: a pin relabelled to a non-default tier is refused by the default report, never carried from a title's presence", () => {
    const { entry } = firstPin("A7");
    const [verdict] = judge(REPORT, [{ file: entry.file, title: entry.title, tier: "native-read" }]);
    expect(verdict?.code).toBe("tier-mismatch");
  });

  it("M6: a row's pins judged against a report that does not hold them are all red (an empty report cannot pass)", () => {
    const row = rowOf("A6");
    const verdicts = judge(
      join(ROOT, ".forge", "no-such-report.json"),
      row.pins.map(entry => casePin(entry)),
    );
    expect(verdicts).toHaveLength(row.pins.length);
    expect(verdicts.every(verdict => !verdict.ok)).toBe(true);
  });

  it("M7: the A8 it.each template pin is not satisfied by a table shorter than its minimum (29 and 1000 cases are red)", () => {
    const entry = rowOf("A8").pins.find(candidate => candidate.minCases !== undefined);
    if (entry === undefined) throw new Error("A8 holds no it.each pin");
    expect(judge(REPORT, [casePin({ ...entry, minCases: 28 })])[0]?.ok).toBe(true);
    for (const minCases of [29, 1000]) {
      const [verdict] = judge(REPORT, [casePin({ ...entry, minCases })]);
      expect(verdict?.ok, `minCases ${minCases}`).toBe(false);
    }
  });

  it("M8: the A8 template pin judged as a plain case is red (its title is a template, never one case)", () => {
    const entry = rowOf("A8").pins.find(candidate => candidate.minCases !== undefined);
    if (entry === undefined) throw new Error("A8 holds no it.each pin");
    expect(judge(REPORT, [{ file: entry.file, title: entry.title, tier: DEFAULT_GATE_TIER }])[0]?.ok).toBe(false);
  });
});

describe("wb-gs2.3 frozen-shape hollowing mutants (rule 16): each in-memory copy of the table reds the shape or the digest literal", () => {
  const without = (rows: readonly Row[], id: string, drop: (entry: Pin, index: number) => boolean): Row[] =>
    rows.map(row => (row.id === id ? { ...row, pins: row.pins.filter((entry, index) => !drop(entry, index)) } : row));
  const reds = (rows: readonly Row[]): { shape: boolean; digest: boolean } => ({
    shape: JSON.stringify(shapeOf(rows)) !== JSON.stringify(FROZEN_SHAPE),
    digest: JSON.stringify(digestsOf(rows)) !== JSON.stringify(FROZEN_DIGESTS),
  });

  it("the unmutated table is green on both literals (control)", () => {
    expect(reds(ROWS)).toEqual({ shape: false, digest: false });
  });

  it("CT1: deleting one pin of a multi-pin row (A1) reds the shape literal and the row digest", () => {
    const mutant = without(ROWS, "A1", (_entry, index) => index === 3);
    expect(reds(mutant)).toEqual({ shape: true, digest: true });
    expect(shapeOf(mutant)).toContain("A1:3");
  });

  it("CT1b: deleting a pin of a second row (A6) reds the shape literal and the row digest", () => {
    const mutant = without(ROWS, "A6", (_entry, index) => index === 0);
    expect(reds(mutant)).toEqual({ shape: true, digest: true });
    expect(shapeOf(mutant)).toContain("A6:7");
  });

  it("CT2: shortening a requirement phrase keeps every pin count but reds the digest naming its row", () => {
    const mutant = ROWS.map(row => (row.id === "A5" ? { ...row, requirement: row.requirement.replace(", for destructive actions, operator confirmation", "") } : row));
    expect(reds(mutant)).toEqual({ shape: false, digest: true });
    const changed = digestsOf(mutant).filter((line, index) => line !== FROZEN_DIGESTS[index]);
    expect(changed.map(line => line.slice(0, line.indexOf(":")))).toEqual(["A5"]);
  });

  it("CT3: swapping a pin for an unrelated passing case keeps every pin count but reds the digest naming its row", () => {
    const unrelated = pin("test/source-hygiene.test.ts", "an unrelated passing case");
    const mutant = ROWS.map(row => (row.id === "A7" ? { ...row, pins: [row.pins[0] ?? unrelated, unrelated] } : row));
    expect(reds(mutant)).toEqual({ shape: false, digest: true });
    const changed = digestsOf(mutant).filter((line, index) => line !== FROZEN_DIGESTS[index]);
    expect(changed.map(line => line.slice(0, line.indexOf(":")))).toEqual(["A7"]);
  });

  it("CT4: a re-titled pin of an unpinned row's neighbour, an it.each minimum lowered, and a row moved all red the digest literal", () => {
    const lowered = ROWS.map(row => ({ ...row, pins: row.pins.map(entry => (entry.minCases === undefined ? entry : { ...entry, minCases: 1 })) }));
    expect(reds(lowered).digest).toBe(true);
    const moved = [...ROWS.slice(1), ...ROWS.slice(0, 1)];
    expect(reds(moved)).toEqual({ shape: true, digest: true });
  });
});

describe("wb-gs2.3 docs drift names the row or the section (synthetic document, rendered view)", () => {
  it("accepts the two sections exactly as written, bounded by a following level-2 heading and at EOF", () => {
    expect(docsFailures(synthetic())).toEqual([]);
    expect(docsFailures(synthetic(undefined, "\n## Next\n\nOther text.\n"))).toEqual([]);
  });

  it("K1 names row A7 (and only it) when the unknown-permission bullet is dropped", () => {
    const lines = docsFailures(synthetic(editSection("authorization", "- Treat unknown permission data as deny.\n", "")));
    expect(named(lines)).toEqual(["row A7"]);
    expect(lines.some(line => line.includes("not exactly its frozen blocks"))).toBe(true);
  });

  it("K2 names row A5 (and only it) when the operator-confirmation clause is weakened", () => {
    expect(named(docsFailures(synthetic(editSection("authorization", ", for destructive actions, operator confirmation", ""))))).toEqual(["row A5"]);
  });

  it("K3 names row D3 (and only it) when the entitlement sentence is reworded", () => {
    expect(named(docsFailures(synthetic(editSection("auditability", "Logs are not a source of entitlement.", "Logs are a source of entitlement."))))).toEqual(["row D3"]);
  });

  it("K4 goes red on the section, naming no row, when a ninth bullet is added (the wb-pjj eighth-bullet class)", () => {
    const lines = docsFailures(synthetic(editSection("authorization", "- Treat unknown permission data as deny.", "- Treat unknown permission data as deny.\n- A ninth bullet a later change adds.")));
    expect(named(lines)).toEqual([]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("Authorization design is not exactly its frozen blocks");
  });

  it("D1 goes red on the section when a weakening qualifier is appended as a lazy continuation of a bullet", () => {
    const lines = docsFailures(synthetic(editSection("authorization", "Treat unknown permission data as deny.", "Treat unknown permission data as deny.\n  unless the workflow script supplies its own grant list.")));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.includes("Authorization design is not exactly its frozen blocks"))).toBe(true);
  });

  it("D2 goes red on the section when a weakening prose paragraph is appended inside Authorization design", () => {
    const lines = docsFailures(synthetic(editSection("authorization", "fails closed.", "fails closed.\n\nThese rules are advisory: a trusted local workflow script may bypass any of them.")));
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("the section has 2 blocks; the census pins 1");
  });

  it("D3 goes red when a weakening ### subsection is appended inside a section (it belongs to the section)", () => {
    const lines = docsFailures(synthetic(editSection("authorization", "fails closed.", "fails closed.\n\n### Exceptions\n\nA host may skip these rules.")));
    expect(lines.length).toBeGreaterThan(0);
  });

  it("D4 goes red on the whole Auditability paragraph when an unpunctuated weakening tail follows the last sentence", () => {
    const lines = docsFailures(synthetic(editSection("auditability", "Logs are not a source of entitlement.", "Logs are not a source of entitlement. unless a host trusts them")));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some(line => line.includes("Auditability is not exactly its frozen blocks"))).toBe(true);
  });

  it("D5 goes red when a section heading is renamed away, and when a duplicate heading is appended", () => {
    const renamed = docsFailures(synthetic().replace("## Auditability", "## Auditing"));
    expect(renamed).toHaveLength(1);
    expect(renamed[0]).toContain("Auditability: the section is refused");
    const duplicated = docsFailures(synthetic(undefined, "\n## Authorization design\n\n- Treat unknown permission data as allow.\n"));
    expect(duplicated.some(line => line.includes("Authorization design: the section is refused"))).toBe(true);
  });

  it("D9 goes red when a level-1 heading inserted above re-homes a section", () => {
    const lines = docsFailures(synthetic().replace("## Auditability", "# Appendix\n\n## Auditability"));
    expect(lines.some(line => line.includes("Auditability: the section is refused"))).toBe(true);
  });

  it("D10 names the clause row when its bullet is hidden in an HTML comment, and the section refuses the HTML", () => {
    const lines = docsFailures(synthetic(editSection("authorization", "- Treat unknown permission data as deny.", "<!-- Treat unknown permission data as deny. -->")));
    expect(named(lines)).toContain("row A7");
    expect(lines.some(line => line.includes("carries HTML"))).toBe(true);
  });

  it("D11 (same-view): a verbatim archived copy of the section inside an HTML comment cannot stand in for the real section once its bullet is dropped", () => {
    const hidden = `<!--\n## Authorization design\n\n${bodyOf("authorization")}\n-->\n`;
    const weakened = synthetic(editSection("authorization", "- Treat unknown permission data as deny.\n", "")).replace("## Authorization design", `${hidden}\n## Authorization design`);
    expect(named(docsFailures(weakened))).toEqual(["row A7"]);
    expect(docsFailures(synthetic().replace("## Authorization design", `${hidden}\n## Authorization design`))).toEqual([]);
  });

  it("an edit of an unpinned section never reddens a row: Threat categories, Credential boundaries and Security acceptance tests are free to change", () => {
    expect(docsFailures(synthetic().replaceAll("Other text.", "Changed text."))).toEqual([]);
  });

  it("the sections' frozen text equals what the rows carry: every sentence of the Auditability paragraph is exactly one row's requirement", () => {
    expect(sectionText("auditability")).toBe(ROWS.filter(row => row.section === "auditability").map(row => row.requirement).join(" "));
    expect(ROWS.filter(row => row.section === "authorization" && row.id !== "A4b").map(row => row.requirement)).toEqual(AUTH_RENDERED);
  });
});
