/**
 * wb-12x1 ([MWI-docs], program mechanical-workflows-interop-2026-11-04, slice PI-0): the document-predicate census of
 * EAT-R094..EAT-R143 - the 50 REMEDIATION rows read on the six program and skill pages this cut lands on trunk.
 * Statement (the bead's tracker-export title, verbatim): "[MWI-docs] Land corrected program and audited triage through the
 * workbench machine". Each of the 50 requirements (ATOMIC-REQUIREMENTS.md@0b25e14e, blob e1282572e755) reads "Documentation
 * MUST apply the M<nnn> scoped correction for C<nnnn>", accepts on "Assert the corrected <page>:L<n> representation satisfies
 * <transform>: <the row's Repair> ... Preserve the original pin and status in the triage map" and names the adversarial
 * mutant "Restore the overstrong C<nnnn> wording or remove its required qualifier; the targeted document predicate fails" at
 * gate tier "forge build (default gate)" (TDD-MATRIX.md@0b25e14e, blob 18e7d22335f4). The rows are REMEDIATION.md@0b25e14e
 * (docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/epistemic-triage/REMEDIATION.md on master, blob
 * bb100eddbd40), 50 rows over doc@7c80c34346c2: ID, Claim, Status, Class, Where, Existing wording and Repair are copied into
 * ROWS verbatim (the table's escaped pipes read as pipes); the Why sufficient, Evidence and Tracker columns are not read.
 * SCOPE (owner specification ruling M:60615 on wb-12x1, option C adopted modified): this cut lands the six corrected pages;
 * the 457-file triage tree stays master-only at 0b25e14e as an evidence archive, so no row reads a triage file here, and
 * EAT-R004's reading is recorded in docs/workbench/receipts/wb-12x1.md.
 *
 * MEASURED (by the cutting seat ws-04 of g10-work-s228, 2026-11-06, at trunk c4e8f826): on the six pages as committed at
 * doc@7c80c34346c2 (blob-identical at 0b25e14e) every row's Existing wording stands exactly once, on the row's line, and no
 * Repair stands anywhere; this census then reads 47 failed rows and 3 passed (the ledger-only rows M011, M033 and M044,
 * whose pages stay unchanged). On the corrected pages every row's standing text stands exactly once on the row's line (line
 * counts unchanged: README 24, 01 66, 02 79, 03 61, 04 44, SKILL 35), and the row's Existing wording stands on its page
 * only inside that text. The corrections are 43 exact replacements: the three same-edit rows ride their host row's
 * Repair (M013 on M012, M026 on M025, M038 on M037), and M022's Repair, whose Existing wording sits inside M023's, stands in
 * the sentence that follows M023's Repair ("Those checks, read at MW `f7c0a943`, are <M022's Repair>."; the build token is
 * the version marking the rf historical claim census reads on 01:L55).
 *
 * THE PINNED SET (the claim form; test/workbench-mwi-docs-remediation-census.test.ts, cases in registration order):
 * - "the reading": the six pages are files git would commit (tracked or untracked, never ignored), each page key is named by
 *   at least one row, and every row's Where parses to one page and a line range inside it.
 * - "the row kinds": a row is ledger-only when its Repair starts "ledger only:", same-edit when it names "same edit as
 *   C<nnnn>" (the host is the row of that claim: an edit row on the same page and line), and an edit row otherwise; the
 *   kind decides the pins (edit and same-edit: stands and absent; ledger-only: stands), and the requirement id of M<nnn> is
 *   EAT-R<nnn + 93>.
 * - "frozen shape": ROWS pins requirement, id, claim, status, class, where, kind, pins and the sha256 (first 16 hex) of the
 *   Existing wording and of the Repair, one literal entry per row.
 * - "outside anchor": the tracked bead export's wb-12x1 row (.beads/issues.jsonl) - its title is the statement above, its
 *   ACCEPTANCE lists EAT-R004 and then exactly the 50 requirement ids of ROWS in order, and its SURFACES cite
 *   ATOMIC-REQUIREMENTS.md and TDD-MATRIX.md at the 0b25e14e pin this header names.
 * - "receipt anchor": the last dated entry of docs/workbench/receipts/wb-12x1.md holds one table with the columns Requirement,
 *   Row, Claim, Where, Kind, Pins, Existing sha-256 and Repair sha-256, and its rows equal ROWS in order (each wording by its
 *   full sha256, so the receipt spells none of the text this census judges).
 * - one case per row, titled "<requirement> <id> <claim> <class> <where>": the predicate over the live page. STANDS: the row's
 *   standing text (an edit row's Repair; a same-edit row's host Repair; a ledger-only row's Existing wording, the norm the
 *   ledger correction leaves in place) stands exactly once on its page, on a line of its Where. ABSENT (edit and same-edit
 *   rows): every occurrence of the row's Existing wording on its page lies wholly inside an occurrence of the standing text
 *   (the Existing wording of M002, M006, M024, M029, M034 and M046, and of the same-edit row M013, is part of it). Beside
 *   the live reading, the requirement's adversarial mutant runs in memory on the same page and each one reds the row with
 *   the findings it names: RESTORE (the standing text replaced by the overstrong wording: the row's Existing wording, or for
 *   a same-edit row its host's), NORM-EDIT (ledger-only: the norm deleted), SHORTEN (the standing text cut at its last
 *   space: a qualifier removed), MOVED (the standing text moved to a new last line), DUPLICATE (a second copy on a new last
 *   line) and ELSEWHERE (rows with ABSENT: the Existing wording added on a new last line).
 * - "R-PARAPHRASE quiet rows": the residual below, each member beside its twin control.
 * - "records": every row's case ran and reached its predicate.
 * Each positive claim's independent falsifier is the mutant set its case names, and for the table itself the frozen shape,
 * the export anchor and the receipt anchor (a row deleted, a pin deleted, a phrase shortened or a row swapped reds at least
 * one of them; a row deleted from every literal of this file reds both anchors).
 *
 * NOT CLAIMED (scope sentences): EAT-R004 - the landing of the corrected program and the triage on trunk, and its
 * qa/workbench/mechanical-docs-cut journey - is NOT CLAIMED by this census (owner ruling M:60615 (1): the triage half reads
 * as satisfied by the master landing and the s3 mirror; the receipt records that reading). The triage map (CLAIMS.jsonl and
 * the other triage files) and "Preserve the original pin and status in the triage map" are NOT CLAIMED by this census: the
 * triage is master-only and this cut writes none of it. Wording on any page outside the six, wording outside the 50 rows,
 * rendered text (the predicate reads raw source text), whether a Repair is true of the producer (the census pins the
 * wording the audit prescribes, not the audit's evidence), a hollow that edits this file and the receipt's table together
 * (the receipt is append-only under standing rule 15) and a hollow that edits this file's predicate and its mutant
 * expectations together are NOT CLAIMED by this census.
 * RESIDUAL (named family + pinned quiet row; rule 19(d)): R-PARAPHRASE - the predicate is the exact REMEDIATION wording, so
 * an overstrong claim restated in other words, split over two lines or broken by Markdown emphasis reads clean. Quiet rows:
 * "R-PARAPHRASE quiet rows" (M001 reworded, M050 split over two lines, M018 with emphasis), each beside a twin that adds the
 * exact Existing wording to the same page and reds.
 *
 * Display paths added: none. Test-only: no src change.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Lexer, type Tokens } from "marked";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-12x1";
const EXPORT = ".beads/issues.jsonl";
/** This cut's receipt: its last dated entry carries the rows' table by digest (append-only, standing rule 15). */
const RECEIPT = `docs/workbench/receipts/${BEAD}.md`;
const RECEIPT_COLUMNS = ["Requirement", "Row", "Claim", "Where", "Kind", "Pins", "Existing sha-256", "Repair sha-256"] as const;
const STATEMENT = "[MWI-docs] Land corrected program and audited triage through the workbench machine";
/** The master commit that holds the triage tree, REMEDIATION.md and the requirement set this census cites. */
const TRIAGE_PIN = "0b25e14e084a5b1d612e780bc12a927b3a80dd62";
const PROGRAM = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04";
/** The six pages, keyed as REMEDIATION's Where column names them. */
const PAGES = {
  README: `${PROGRAM}/README.md`,
  "01": `${PROGRAM}/01-audit-and-evidence.md`,
  "02": `${PROGRAM}/02-host-architecture-and-protocol.md`,
  "03": `${PROGRAM}/03-implementation-and-qa.md`,
  "04": `${PROGRAM}/04-agent-handoff.md`,
  SKILL: ".agents/skills/pi-mechanical-interop/SKILL.md",
} as const;
type PageKey = keyof typeof PAGES;
type Kind = "edit" | "same-edit" | "ledger-only";
type Pin = "stands" | "absent";
const PINS_OF: Readonly<Record<Kind, readonly Pin[]>> = { edit: ["stands", "absent"], "same-edit": ["stands", "absent"], "ledger-only": ["stands"] };

interface Row {
  readonly requirement: string;
  readonly id: string;
  readonly claim: string;
  readonly status: string;
  readonly transform: string;
  readonly where: string;
  readonly kind: Kind;
  readonly pins: readonly Pin[];
  readonly existing: string;
  readonly repair: string;
}

/** REMEDIATION.md@0b25e14e, rows M001..M050 in table order: ID, Claim, Status, Class, Where, Existing wording and Repair verbatim. */
const ROWS: readonly Row[] = [
  {
    requirement: "EAT-R094",
    id: "M001",
    claim: "C0114",
    status: "SUPPORTED / overclaims",
    transform: "NARROW_SCOPE",
    where: "01:L9",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "Source implemented, tests and receipts recorded",
    repair: "Source implemented, tests recorded; per-bead receipts under `docs/workbench/receipts/` reference the Claude host (no receipt is dedicated to the executor)",
  },
  {
    requirement: "EAT-R095",
    id: "M002",
    claim: "C0119",
    status: "SUPPORTED / overclaims",
    transform: "NARROW_SCOPE",
    where: "01:L10",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "nested functions",
    repair: "nested functions (one level; deeper nesting is refused)",
  },
  {
    requirement: "EAT-R096",
    id: "M003",
    claim: "C0139",
    status: "ESTABLISHED / overclaims",
    transform: "NARROW_SCOPE",
    where: "01:L13",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "candidate basis and producer verification evidence",
    repair: "candidate basis and a producer verification result (its `evidence` field is optional)",
  },
  {
    requirement: "EAT-R097",
    id: "M004",
    claim: "C0152",
    status: "SUPPORTED / overclaims",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L15",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "Recorded live producer receipts; not a Pi binding",
    repair: "Recorded live producer receipts (dated 2026-10-15, three weeks before the baseline); not a Pi binding",
  },
  {
    requirement: "EAT-R098",
    id: "M005",
    claim: "C0161",
    status: "SUPPORTED / overclaims",
    transform: "NARROW_SCOPE",
    where: "01:L17",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "None registered: no Mechanical SDK/host adapter;",
    repair: "None registered: no Mechanical SDK dependency and no Mechanical function-host adapter (the only Mechanical-specific module is the read-only `collective.event.v1` envelope boundary `src/workbench/collective-event.ts`);",
  },
  {
    requirement: "EAT-R099",
    id: "M006",
    claim: "C0163",
    status: "SUPPORTED / overclaims",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L17",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "W11 row of `feature-matrix.md`",
    repair: "W11 row of `feature-matrix.md` (status `planned`; the row's embedded grep sentence predates `collective-event.ts` and is stale)",
  },
  {
    requirement: "EAT-R100",
    id: "M007",
    claim: "C0167",
    status: "ESTABLISHED / overclaims",
    transform: "DOWNGRADE_MODALITY",
    where: "01:L23",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "force-removes the worktree",
    repair: "attempts to force-remove the worktree (`git worktree remove --force`, falling back to `git worktree prune`)",
  },
  {
    requirement: "EAT-R101",
    id: "M008",
    claim: "C0169",
    status: "SUPPORTED / overclaims",
    transform: "NARROW_SCOPE",
    where: "01:L23",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "The existing worktree tests explicitly exercise this outcome.",
    repair: "The existing worktree tests assert the `hasChanges:false` report on this path and describe the destruction in comments; none asserts the removal, and they lock the lossy behaviour in rather than guard against it.",
  },
  {
    requirement: "EAT-R102",
    id: "M009",
    claim: "C0182",
    status: "SUPPORTED / overclaims",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L27",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "W11 explicitly remains planned in the feature matrix.",
    repair: "W11 explicitly remains `planned` in the feature matrix (bead wb-04s blocked; the row's detection sentence is stale at the pin).",
  },
  {
    requirement: "EAT-R103",
    id: "M010",
    claim: "C0184",
    status: "SUPPORTED / overclaims",
    transform: "NARROW_SCOPE",
    where: "01:L27",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "accepts definition kind `function` in its model, but `src/workbench/execute-tool.ts:215-219` refuses all kinds except `script`.",
    repair: "models definition kind `function`, while `src/workbench/execute-tool.ts:217-218` deliberately refuses all kinds except `script` (typed refusal `unsupported-definition-kind`; both halves are tested).",
  },
  {
    requirement: "EAT-R104",
    id: "M011",
    claim: "C0188",
    status: "REFUTED",
    transform: "REMOVE_CLAIM",
    where: "01:L27",
    kind: "ledger-only",
    pins: ["stands"],
    existing: "do not use a shell-backed `node()`",
    repair: "ledger only: drop C0188 as an observation (the sentence is a prohibition on a remedy shape, not a description). Optional doc clarity: \"do not route dispatch through `node()` (a bounded capability call) or any shell wrapper\".",
  },
  {
    requirement: "EAT-R105",
    id: "M012",
    claim: "C0189",
    status: "REFUTED",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L31",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "declares input/output schema refs as `../schemas/development-request.v1.schema.json` and `../schemas/development-outcome.v1.schema.json`",
    repair: "declared (at MW `0c78e253`) input/output schema refs as `../schemas/development-request.v1.schema.json` and `../schemas/development-outcome.v1.schema.json`; MW `1f29daa7` (2026-11-05) rewrote them to the bare filenames",
  },
  {
    requirement: "EAT-R106",
    id: "M013",
    claim: "C0190",
    status: "REFUTED",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L31",
    kind: "same-edit",
    pins: ["stands", "absent"],
    existing: "and `../schemas/development-outcome.v1.schema.json`",
    repair: "same edit as C0189 (one sentence carries both refs)",
  },
  {
    requirement: "EAT-R107",
    id: "M014",
    claim: "C0193",
    status: "REFUTED",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L31",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "tests construct matching descriptors by hand rather than loading the committed JSON",
    repair: "tests constructed matching descriptors by hand at `0c78e253`; since `1f29daa7` three rig tests read the committed JSON and one drives both hosts from it over a packed tarball (not run here)",
  },
  {
    requirement: "EAT-R108",
    id: "M015",
    claim: "C0194",
    status: "REFUTED",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L31",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "The as-committed descriptor therefore fails the host's descriptor check.",
    repair: "At `0c78e253` the as-committed descriptor therefore failed the host's descriptor check; at `f7c0a943` the committed strings equal the host's strings.",
  },
  {
    requirement: "EAT-R109",
    id: "M016",
    claim: "C0195",
    status: "REFUTED",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L29",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "### P1: checked-in Mechanical descriptor conflicts with its own loader",
    repair: "### P1 (repaired upstream by MW `1f29daa7`): checked-in Mechanical descriptor conflicted with its own loader at `0c78e253`",
  },
  {
    requirement: "EAT-R110",
    id: "M017",
    claim: "C0196",
    status: "REFUTED",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L65",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "a descriptor built manually in tests does not establish compatibility with that file.",
    repair: "a descriptor built manually in tests does not establish compatibility with that file (the `0c78e253` tests did this; the `f7c0a943` tests read the committed file).",
  },
  {
    requirement: "EAT-R111",
    id: "M018",
    claim: "C0218",
    status: "ESTABLISHED / overclaims",
    transform: "NARROW_SCOPE",
    where: "01:L43",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "includes cwd/model/permissions/tools/roles/grants/principal",
    repair: "includes cwd/model/permissions/settings/tools/roles/grants/principal",
  },
  {
    requirement: "EAT-R112",
    id: "M019",
    claim: "C0229",
    status: "SUPPORTED / overclaims",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L47",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "with no general host-supplied AbortSignal in its public options",
    repair: "with (at `0c78e253`) no host-supplied AbortSignal in its public options; MW `f7c0a943` adds `signal?: AbortSignal` honoured only as a pre-dispatch barrier and not forwarded to the SDK, so mid-run cancellation is still absent",
  },
  {
    requirement: "EAT-R113",
    id: "M020",
    claim: "C0231",
    status: "SUPPORTED / overclaims",
    transform: "ADD_MISSING_PREMISE",
    where: "01:L47",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "Pi's `node()` default registry deadline is 30 seconds and cannot substitute for an async, observable function launch.",
    repair: "Pi's `node()` is a single bounded request/response capability call (default registry deadline 30 s, configurable) with no mid-run observation or control surface, so it cannot substitute for an async, observable function launch.",
  },
  {
    requirement: "EAT-R114",
    id: "M021",
    claim: "C0248",
    status: "ESTABLISHED / overclaims",
    transform: "NARROW_SCOPE",
    where: "01:L55",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "Mechanical `renderTaskContext` expects a nonempty committed `render_id`",
    repair: "Mechanical `renderTaskContext` expects a nonempty `render_id` (a committed render: its rf argv omits `--no-commit`)",
  },
  {
    requirement: "EAT-R115",
    id: "M022",
    claim: "C0251",
    status: "UNSUPPORTED",
    transform: "REPLACE_SOURCE",
    where: "01:L55",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "its documented proof contract",
    repair: "the rig adapter's enforced RF-context requirements (`apps/development-rig/src/rf-context.ts`: nonempty `render_id`, task/revision text, provenance/budget witness; receipt rule in MW `docs/07`)",
  },
  {
    requirement: "EAT-R116",
    id: "M023",
    claim: "C0252",
    status: "SUPPORTED / overclaims",
    transform: "NARROW_SCOPE",
    where: "01:L55",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "Reusing Pi's preview response as Mechanical's authoritative `compileContext` would break its documented proof contract.",
    repair: "Reusing Pi's preview response as the rig's `renderTaskContext`-backed `compileContext` would fail its RF-context checks (`RF_CONTEXT_UNESTABLISHED`: `render_id` null); the `develop()` `compileContext` port itself checks only basis equality.",
  },
  {
    requirement: "EAT-R117",
    id: "M024",
    claim: "C0261",
    status: "ESTABLISHED / overclaims",
    transform: "NARROW_SCOPE",
    where: "01:L59",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "`new Semaphore(options.concurrency ?? ...)` can otherwise accept zero",
    repair: "`new Semaphore(options.concurrency ?? ...)` can otherwise accept zero (no production caller passes `options.concurrency` and the default clamps to [1,16]; the exposure is programmatic/test-only)",
  },
  {
    requirement: "EAT-R118",
    id: "M025",
    claim: "C0264",
    status: "SUPPORTED / overclaims",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L59",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "Review recent `new-feedback/` findings on shared census edit conflicts, test deadline inflation, report-mode readers and prep bottlenecks",
    repair: "Review `new-feedback/` findings (2026-10-20 to 2026-11-03, one flywheel-seat lineage) on shared census edit conflicts, Vitest default-timeout reds (October files), report-mode census readers (October files) and prep bottlenecks",
  },
  {
    requirement: "EAT-R119",
    id: "M026",
    claim: "C0265",
    status: "SUPPORTED / overclaims",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L59",
    kind: "same-edit",
    pins: ["stands", "absent"],
    existing: "report-mode readers",
    repair: "report-mode census readers (October files) -- same edit as C0264",
  },
  {
    requirement: "EAT-R120",
    id: "M027",
    claim: "C0277",
    status: "ESTABLISHED / overclaims",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "01:L65",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "The Mechanical descriptor path discrepancy is independently checkable against the exact committed JSON and TypeScript host;",
    repair: "The Mechanical descriptor path discrepancy (present at `0c78e253`, repaired by `1f29daa7`) is independently checkable against the exact committed JSON and TypeScript host, and at `f7c0a943` the check yields a match;",
  },
  {
    requirement: "EAT-R121",
    id: "M028",
    claim: "C0521",
    status: "SUPPORTED / overclaims",
    transform: "NARROW_SCOPE",
    where: "02:L32",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "// from installed verified descriptor",
    repair: "// from the committed descriptor (`contracts/entrypoints/development.v1.json`, self-described `descriptor-only`; install flow verified in tests, not a standing installed artifact)",
  },
  {
    requirement: "EAT-R122",
    id: "M029",
    claim: "C0522",
    status: "NON-EPISTEMIC (set KG02-03 CONTESTED)",
    transform: "SURFACE_DISAGREEMENT",
    where: "02:L36-42",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "profile: \"git-census\" | \"native-task-scope\";",
    repair: "profile: \"git-census\" | \"native-task-scope\"; // MW counterpart doc (02-binding-and-packaging-contract.md:25) names this field `mode`; choose one name before implementation",
  },
  {
    requirement: "EAT-R123",
    id: "M030",
    claim: "C0530",
    status: "REFUTED",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "02:L48",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "Mechanical checks the descriptor schema names in `invokePinnedDevelopment` and ships relative schema paths.",
    repair: "Mechanical checks the descriptor schema names in `invokePinnedDevelopment`; at `0c78e253` it shipped relative (`../schemas/`) paths, repaired to bare filenames by `1f29daa7` (2026-11-05), so the canonical grammar below is partly adopted upstream.",
  },
  {
    requirement: "EAT-R124",
    id: "M031",
    claim: "C0534",
    status: "REFUTED",
    transform: "MARK_AS_DEFINITION",
    where: "02:L48",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "Pi consumes the canonical exported descriptor without hardcoded tests that substitute a hand-authored object.",
    repair: "Pi must consume the canonical exported descriptor and must not add tests that substitute a hand-authored object (the hand-authored descriptor tests were MechanicalWorkflows', made file-driven by `1f29daa7`; Pi has none).",
  },
  {
    requirement: "EAT-R125",
    id: "M032",
    claim: "C0305",
    status: "REFUTED",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "03:L7",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "Pin baseline, reconcile descriptor canonicalization and host ABI; signed-off audit inventory",
    repair: "Pin baseline; confirm the descriptor/host schema-ref reconciliation that landed upstream (MW `1f29daa7`) and adopt its grammar; signed-off audit inventory",
  },
  {
    requirement: "EAT-R126",
    id: "M033",
    claim: "C0312",
    status: "NON-EPISTEMIC / overclaims",
    transform: "ADD_MISSING_PREMISE",
    where: "03:L9",
    kind: "ledger-only",
    pins: ["stands"],
    existing: "Correct four callbacks",
    repair: "ledger only: depends_on C03111 (four outcome variants) -> C0547 (DevelopmentServices declares discover/compileContext/implement/verify) and the descriptor `bindings` array; doc wording unchanged",
  },
  {
    requirement: "EAT-R127",
    id: "M034",
    claim: "C0315",
    status: "SUPPORTED / overclaims",
    transform: "ADD_SOURCE",
    where: "03:L9",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "Versioned, independently importable `develop` host binding from its rig",
    repair: "Versioned, independently importable `develop` host binding from its rig (today `@mechanical/development-rig` exposes only a `bin`, no `main`/`exports`; tests deep-import `dist/`)",
  },
  {
    requirement: "EAT-R128",
    id: "M035",
    claim: "C0320",
    status: "REFUTED",
    transform: "ADD_MISSING_PREMISE",
    where: "03:L10",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "using explicit `git-census` profile",
    repair: "using the existing tracked-file census path of `developLive` (`discovery: \"git-tracked-files\"`), which this program labels `git-census` (no such selector ships at MW `f7c0a943`)",
  },
  {
    requirement: "EAT-R129",
    id: "M036",
    claim: "C0321",
    status: "UNDETERMINED / overclaims",
    transform: "PRESERVE_AS_UNDETERMINED",
    where: "03:L10",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "First actual Pi \u2192 Mechanical `develop`",
    repair: "First Pi \u2192 Mechanical `develop` witnessed in-repo (neither repository holds a receipt of any prior run; runs outside the repos were not checked)",
  },
  {
    requirement: "EAT-R130",
    id: "M037",
    claim: "C0336",
    status: "REFUTED",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "03:L18",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "1. Fix Mechanical checked-in descriptor versus `entrypoint-host.ts` comparison; test exactly checked-in descriptor and a packed tarball.",
    repair: "1. Confirm the MW repair of the checked-in descriptor versus `entrypoint-host.ts` (`1f29daa7`: bare filenames; tests now read the committed file and a packed tarball, not run here) and keep the file-driven tests.",
  },
  {
    requirement: "EAT-R131",
    id: "M038",
    claim: "C0338",
    status: "REFUTED",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "03:L18",
    kind: "same-edit",
    pins: ["stands", "absent"],
    existing: "test exactly checked-in descriptor and a packed tarball",
    repair: "same edit as C0336 (one unblocker line)",
  },
  {
    requirement: "EAT-R132",
    id: "M039",
    claim: "C0346",
    status: "SUPPORTED / overclaims",
    transform: "NARROW_SCOPE",
    where: "03:L21",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "4. Fix loss of modified worktrees in `cleanupWorktree`",
    repair: "4. Fix `cleanupWorktree`'s failure path, which force-removes a modified worktree and reports `hasChanges:false` when the preservation commit or branch step fails (the normal path commits and branches before removal)",
  },
  {
    requirement: "EAT-R133",
    id: "M040",
    claim: "C0353",
    status: "PLAUSIBLE / overclaims",
    transform: "NARROW_SCOPE",
    where: "03:L22",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "test skip/retry and workflow cancel while startup is parked",
    repair: "test per-agent skip/retry (the suspected gap: no controller exists during the await) and workflow cancel (already re-checked after the await and covered by fault test F10; keep as a control) while startup is parked",
  },
  {
    requirement: "EAT-R134",
    id: "M041",
    claim: "C0356",
    status: "SUPPORTED / overclaims",
    transform: "NARROW_SCOPE",
    where: "03:L23",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "current git-census mode",
    repair: "current tracked-file census mode of `developLive` (called `git-census` here; the separate `live-composition` root wires HX task scope)",
  },
  {
    requirement: "EAT-R135",
    id: "M042",
    claim: "C0368",
    status: "UNDETERMINED / overclaims",
    transform: "PRESERVE_AS_UNDETERMINED",
    where: "03:L33",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "transport 0 with failed gate",
    repair: "transport exit 0 with a failed gate (simulated mutant; whether native Forge ever produces this pairing is not established here)",
  },
  {
    requirement: "EAT-R136",
    id: "M043",
    claim: "C03106",
    status: "SUPPORTED / overclaims",
    transform: "DOWNGRADE_MODALITY",
    where: "03:L55",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "Working Pi *script* workflows do not regress",
    repair: "Existing Pi *script* workflows (source implemented, tests recorded; not run for this audit) do not regress",
  },
  {
    requirement: "EAT-R137",
    id: "M044",
    claim: "C03141",
    status: "UNSUPPORTED",
    transform: "REMOVE_CLAIM",
    where: "04:L38",
    kind: "ledger-only",
    pins: ["stands"],
    existing: "A README that calls a future invocation runnable or hides its missing grant/host implementation.",
    repair: "ledger only: drop C03141 as an existence observation; the line is a prohibited pattern. Doc unchanged. (Out of scope note: MW README:47 still states the descriptor mismatch in the present tense at mw@f7c0a943.)",
  },
  {
    requirement: "EAT-R138",
    id: "M045",
    claim: "C0402",
    status: "SUPPORTED / overclaims",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "README:L4",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "**Audit baseline (2026-11-04):**",
    repair: "**Audit baseline (2026-11-04 US-Pacific; Pi `f67b6665` committed 2026-11-05 05:57Z, MW `0c78e253` committed 2026-11-02 21:17Z):**",
  },
  {
    requirement: "EAT-R139",
    id: "M046",
    claim: "C0409",
    status: "SUPPORTED / overclaims",
    transform: "DOWNGRADE_MODALITY",
    where: "README:L7",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "no new test, live integration, Forge gate or benchmark ran in preparation for these docs",
    repair: "by the authors' account no new test, live integration, Forge gate or benchmark ran in preparation for these docs (the program commit is docs-only)",
  },
  {
    requirement: "EAT-R140",
    id: "M047",
    claim: "C0422",
    status: "NON-EPISTEMIC / overclaims",
    transform: "NARROW_SCOPE",
    where: "README:L24",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "No GitHub CI; use Forge for the primary gate",
    repair: "Do not add or rely on GitHub CI for this program (Pi's pre-existing `.github/workflows/ci.yml` is out of scope); use Forge for the primary gate",
  },
  {
    requirement: "EAT-R141",
    id: "M048",
    claim: "C0437",
    status: "REFUTED",
    transform: "ADD_TEMPORAL_QUALIFIER",
    where: "SKILL:L14",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "Mechanical's checked-in descriptor and its entrypoint host disagree about schema reference spelling. Test the checked-in file, not a constructed approximation.",
    repair: "Mechanical's checked-in descriptor and its entrypoint host disagreed about schema reference spelling at `0c78e253`; they agree since MW `1f29daa7` (bare filenames). Keep testing the checked-in file, not a constructed approximation.",
  },
  {
    requirement: "EAT-R142",
    id: "M049",
    claim: "C0443",
    status: "SUPPORTED / overclaims",
    transform: "NARROW_SCOPE",
    where: "SKILL:L16",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "The live Mechanical Git-census mode is real but not certified task-scoped HX.",
    repair: "Mechanical's `developLive` tracked-file census (called Git-census here; no selectable profile ships) is implemented, with 2026-10-15 rig receipts, but it is not certified task-scoped HX.",
  },
  {
    requirement: "EAT-R143",
    id: "M050",
    claim: "C0446",
    status: "SUPPORTED / overclaims",
    transform: "NARROW_SCOPE",
    where: "SKILL:L16",
    kind: "edit",
    pins: ["stands", "absent"],
    existing: "No Pi-to-Mechanical end-to-end acceptance has been witnessed.",
    repair: "No Pi-to-Mechanical end-to-end acceptance receipt exists in either repository.",
  },
];

/** One frozen-shape entry per row: what the row judges and the sha256 (first 16 hex) of its two wordings. */
const digest = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex").slice(0, 16);
const shapeOf = (row: Row): string => [row.requirement, row.id, row.claim, row.status, row.transform, row.where, row.kind, row.pins.join("+"), digest(row.existing), digest(row.repair)].join("|");

interface Place {
  readonly page: PageKey;
  readonly first: number;
  readonly last: number;
}
const isPageKey = (key: string): key is PageKey => Object.hasOwn(PAGES, key);
/** A Where cell (01:L9, 02:L36-42, README:L4) as its page and line range. */
function placeOf(row: Row): Place {
  const match = /^(README|SKILL|0[1-4]):L(\d+)(?:-(\d+))?$/.exec(row.where);
  if (match === null) throw new Error(`${row.id}: unreadable Where ${row.where}`);
  const [, key = "", first = "", last] = match;
  if (!isPageKey(key)) throw new Error(`${row.id}: unknown page ${key}`);
  return { page: key, first: Number(first), last: Number(last ?? first) };
}
const byId = new Map(ROWS.map(row => [row.id, row] as const));
const byClaim = new Map(ROWS.map(row => [row.claim, row] as const));
/** The kind REMEDIATION's own words give a row: "ledger only:" leads a ledger-only Repair, "same edit as C<nnnn>" names a host. */
function kindOfWords(row: Row): Kind {
  if (row.repair.startsWith("ledger only:")) return "ledger-only";
  return /same edit as C\d+/.test(row.repair) ? "same-edit" : "edit";
}
function hostOf(row: Row): Row {
  const claim = /same edit as (C\d+)/.exec(row.repair)?.[1];
  const host = claim === undefined ? undefined : byClaim.get(claim);
  if (host === undefined) throw new Error(`${row.id}: no host row for ${claim ?? "its same edit"}`);
  return host;
}
/** The text that must stand on the row's line: the Repair, the host's Repair, or (ledger-only) the norm left in place. */
function standingOf(row: Row): string {
  if (row.kind === "ledger-only") return row.existing;
  return row.kind === "same-edit" ? hostOf(row).repair : row.repair;
}
/** The overstrong wording a restore puts back: the row's Existing wording, or a same-edit row's host's. */
const restoredOf = (row: Row): string => (row.kind === "same-edit" ? hostOf(row).existing : row.existing);

const pageText = (key: PageKey): string => readFileSync(join(ROOT, PAGES[key]), "utf8");
const lineAt = (text: string, index: number): number => text.slice(0, index).split("\n").length;
/** Every start index of `needle` in `text`, overlapping occurrences included. */
function occurrences(text: string, needle: string): number[] {
  const at: number[] = [];
  for (let index = text.indexOf(needle); index !== -1; index = text.indexOf(needle, index + 1)) at.push(index);
  return at;
}

/** The predicate: no findings means the row's correction stands on its page. */
function findingsOf(row: Row, text: string): string[] {
  const place = placeOf(row);
  const findings: string[] = [];
  const standing = standingOf(row);
  if (row.pins.includes("stands")) {
    const at = occurrences(text, standing);
    if (at.length !== 1) findings.push(`${row.id} stands ${at.length} times`);
    else {
      const line = lineAt(text, at[0] ?? 0);
      if (line < place.first || line > place.last) findings.push(`${row.id} stands at ${place.page}:L${line}`);
    }
  }
  if (row.pins.includes("absent")) {
    // An occurrence of the Existing wording counts unless it lies wholly inside an occurrence of the standing text.
    const spans = occurrences(text, standing).map(start => [start, start + standing.length] as const);
    const outside = occurrences(text, row.existing).find(start => !spans.some(([from, to]) => start >= from && start + row.existing.length <= to));
    if (outside !== undefined) findings.push(`${row.id} overstrong wording stands at ${place.page}:L${lineAt(text, outside)}`);
  }
  return findings;
}

interface Mutant {
  readonly name: string;
  readonly text: string;
  readonly findings: readonly string[];
}
/** The requirement's adversarial mutant, applied in memory to the live page, with the findings each must produce. */
function mutantsOf(row: Row, text: string): Mutant[] {
  const place = placeOf(row);
  const standing = standingOf(row);
  const index = text.indexOf(standing);
  const line = lineAt(text, index);
  const newLast = text.split("\n").length;
  const appended = (extra: string): string => `${text}${extra}\n`;
  const mutants: Mutant[] = [];
  if (row.kind === "ledger-only") mutants.push({ name: "NORM-EDIT", text: text.replace(standing, ""), findings: [`${row.id} stands 0 times`] });
  else mutants.push({ name: "RESTORE", text: text.replace(standing, restoredOf(row)), findings: [`${row.id} stands 0 times`, `${row.id} overstrong wording stands at ${place.page}:L${line}`] });
  const shortened = standing.slice(0, standing.lastIndexOf(" "));
  const short = text.replace(standing, shortened);
  const shortFindings = [`${row.id} stands 0 times`];
  if (row.pins.includes("absent") && short.includes(row.existing)) shortFindings.push(`${row.id} overstrong wording stands at ${place.page}:L${line}`);
  mutants.push({ name: "SHORTEN", text: short, findings: shortFindings });
  mutants.push({ name: "MOVED", text: appended(standing).replace(standing, ""), findings: [`${row.id} stands at ${place.page}:L${newLast}`] });
  mutants.push({ name: "DUPLICATE", text: appended(standing), findings: [`${row.id} stands 2 times`] });
  if (row.pins.includes("absent")) mutants.push({ name: "ELSEWHERE", text: appended(row.existing), findings: [`${row.id} overstrong wording stands at ${place.page}:L${newLast}`] });
  return mutants;
}

/** What git would commit: tracked or untracked, never ignored, and still on disk. */
function committable(paths: readonly string[]): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...paths], { cwd: ROOT, encoding: "utf8" });
  return [...new Set(out.split("\0").filter(path => path !== "" && existsSync(join(ROOT, path))))].sort();
}

interface ExportRow {
  readonly title: string;
  readonly description: string;
}
function exportRow(): ExportRow {
  for (const line of readFileSync(join(ROOT, EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row = JSON.parse(line) as { id?: unknown; title?: unknown; description?: unknown };
    if (row.id === BEAD && typeof row.title === "string" && typeof row.description === "string") return { title: row.title, description: row.description };
  }
  throw new Error(`${EXPORT} holds no ${BEAD} row`);
}
/** A " | "-separated segment of the export description, by its leading label. */
function segment(description: string, label: string): string {
  const found = description.split(" | ").find(part => part.startsWith(`${label}: `));
  if (found === undefined) throw new Error(`the ${BEAD} export description has no ${label} segment`);
  return found.slice(label.length + 2);
}

const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");
/** The receipt's table as cell texts: the one table with RECEIPT_COLUMNS after the receipt's last dated entry heading. */
function receiptTable(): string[][] {
  const tokens = new Lexer({ gfm: true }).lex(readFileSync(join(ROOT, RECEIPT), "utf8"));
  let last = -1;
  tokens.forEach((token, index) => {
    if (token.type === "heading" && (token as Tokens.Heading).depth === 2 && /^\d{4}-\d{2}-\d{2}(?: |$)/.test((token as Tokens.Heading).text)) last = index;
  });
  if (last === -1) throw new Error(`${RECEIPT} has no dated entry`);
  const tables = tokens.slice(last + 1).filter((token): token is Tokens.Table => token.type === "table" && (token as Tokens.Table).header.map(cell => cell.text).join("|") === RECEIPT_COLUMNS.join("|"));
  if (tables.length !== 1) throw new Error(`${RECEIPT}'s last entry holds ${tables.length} tables with the census columns`);
  return (tables[0]?.rows ?? []).map(row => row.map(cell => cell.text));
}
const receiptRowOf = (row: Row): string[] => [row.requirement, row.id, row.claim, row.where, row.kind, row.pins.join(", "), sha256(row.existing), sha256(row.repair)];

const REACHED = new Set<string>();

describe("wb-12x1 MWI docs remediation census (EAT-R094..EAT-R143): the 50 REMEDIATION rows on the six landed program and skill pages, each by its stands pin (and its absent pin on the 47 edit and same-edit rows), red under the requirement's adversarial mutants", () => {
  it("the reading: the six pages are files git would commit, every page key is a row's, and every Where is a line range on its page", () => {
    const paths = Object.values(PAGES);
    expect(committable(paths)).toEqual([...paths].sort());
    expect([...new Set(ROWS.map(row => placeOf(row).page))].sort()).toEqual(Object.keys(PAGES).sort());
    const outside = ROWS.filter(row => {
      const place = placeOf(row);
      return place.first < 1 || place.last < place.first || place.last > pageText(place.page).split("\n").length;
    });
    expect(outside.map(row => row.id)).toEqual([]);
  });

  it("the row kinds: REMEDIATION's own words give each row's kind, the kind gives its pins, a same-edit host is an edit row on the same line, and M<nnn> is EAT-R<nnn + 93>", () => {
    expect(ROWS.filter(row => kindOfWords(row) !== row.kind).map(row => row.id)).toEqual([]);
    expect(ROWS.filter(row => row.pins.join("+") !== PINS_OF[row.kind].join("+")).map(row => row.id)).toEqual([]);
    const sameEdit = ROWS.filter(row => row.kind === "same-edit");
    expect(sameEdit.map(row => `${row.id}>${hostOf(row).id}`)).toEqual(["M013>M012", "M026>M025", "M038>M037"]);
    expect(sameEdit.filter(row => hostOf(row).kind !== "edit" || placeOf(hostOf(row)).page !== placeOf(row).page || placeOf(hostOf(row)).first !== placeOf(row).first).map(row => row.id)).toEqual([]);
    expect(ROWS.filter(row => row.kind === "ledger-only").map(row => row.id)).toEqual(["M011", "M033", "M044"]);
    expect(ROWS.filter(row => row.requirement !== `EAT-R${String(Number(row.id.slice(1)) + 93).padStart(3, "0")}`).map(row => row.id)).toEqual([]);
    expect(ROWS.map(row => row.id)).toEqual(Array.from({ length: 50 }, (_, index) => `M${String(index + 1).padStart(3, "0")}`));
    expect(byId.size).toBe(ROWS.length);
  });

  it("frozen shape (standing rule 16): every row's requirement, id, claim, status, class, where, kind, pins and wording digests", () => {
    expect(ROWS.map(shapeOf)).toEqual([
    "EAT-R094|M001|C0114|SUPPORTED / overclaims|NARROW_SCOPE|01:L9|edit|stands+absent|b064fa37e489f99b|eccea81d1260b205",
    "EAT-R095|M002|C0119|SUPPORTED / overclaims|NARROW_SCOPE|01:L10|edit|stands+absent|7500dd06f1a7c834|b741578bf26bc8b0",
    "EAT-R096|M003|C0139|ESTABLISHED / overclaims|NARROW_SCOPE|01:L13|edit|stands+absent|056a2f3351029adb|2d95ace733da26fe",
    "EAT-R097|M004|C0152|SUPPORTED / overclaims|ADD_TEMPORAL_QUALIFIER|01:L15|edit|stands+absent|d4c5dd0ceeb9a9ef|ef13b0da548af9b7",
    "EAT-R098|M005|C0161|SUPPORTED / overclaims|NARROW_SCOPE|01:L17|edit|stands+absent|a67f93a2a04b9cbe|b67cf10023ec7ee7",
    "EAT-R099|M006|C0163|SUPPORTED / overclaims|ADD_TEMPORAL_QUALIFIER|01:L17|edit|stands+absent|2c3d8a02113fc980|74967de10f2822eb",
    "EAT-R100|M007|C0167|ESTABLISHED / overclaims|DOWNGRADE_MODALITY|01:L23|edit|stands+absent|cd90d9b2955f561c|05b29f9cc9b9ab5d",
    "EAT-R101|M008|C0169|SUPPORTED / overclaims|NARROW_SCOPE|01:L23|edit|stands+absent|97ef7fd240440bed|f0b1017af7a80f89",
    "EAT-R102|M009|C0182|SUPPORTED / overclaims|ADD_TEMPORAL_QUALIFIER|01:L27|edit|stands+absent|de34e759c7a7565b|7eb539ae745afa23",
    "EAT-R103|M010|C0184|SUPPORTED / overclaims|NARROW_SCOPE|01:L27|edit|stands+absent|eb46b130b63d5f65|98e587bbcc27dc13",
    "EAT-R104|M011|C0188|REFUTED|REMOVE_CLAIM|01:L27|ledger-only|stands|14cb205678061e27|abb2fd11917b0293",
    "EAT-R105|M012|C0189|REFUTED|ADD_TEMPORAL_QUALIFIER|01:L31|edit|stands+absent|2c1883b1027d6526|80cef93f6a75d302",
    "EAT-R106|M013|C0190|REFUTED|ADD_TEMPORAL_QUALIFIER|01:L31|same-edit|stands+absent|8a6c12fe2fc6786b|c226a6ed21b4da79",
    "EAT-R107|M014|C0193|REFUTED|ADD_TEMPORAL_QUALIFIER|01:L31|edit|stands+absent|759d392a1c436178|f9462f69341e8742",
    "EAT-R108|M015|C0194|REFUTED|ADD_TEMPORAL_QUALIFIER|01:L31|edit|stands+absent|963606acaf09dbf3|67817d69102fe6bf",
    "EAT-R109|M016|C0195|REFUTED|ADD_TEMPORAL_QUALIFIER|01:L29|edit|stands+absent|6a9cd91db7130fe2|dec522dc330f8cc9",
    "EAT-R110|M017|C0196|REFUTED|ADD_TEMPORAL_QUALIFIER|01:L65|edit|stands+absent|78b3f69becb0cbf9|e682eb3bb3431627",
    "EAT-R111|M018|C0218|ESTABLISHED / overclaims|NARROW_SCOPE|01:L43|edit|stands+absent|1ebb42625b0cb425|6098e37241b1aca7",
    "EAT-R112|M019|C0229|SUPPORTED / overclaims|ADD_TEMPORAL_QUALIFIER|01:L47|edit|stands+absent|0d2d552a260df54d|2d697bac170bb669",
    "EAT-R113|M020|C0231|SUPPORTED / overclaims|ADD_MISSING_PREMISE|01:L47|edit|stands+absent|14c8898e785c1a23|8c8b2accba15cca0",
    "EAT-R114|M021|C0248|ESTABLISHED / overclaims|NARROW_SCOPE|01:L55|edit|stands+absent|a049e640a5c572b5|c2a523c4df849517",
    "EAT-R115|M022|C0251|UNSUPPORTED|REPLACE_SOURCE|01:L55|edit|stands+absent|3e3e8d53a69bace4|45f6484fcb148d22",
    "EAT-R116|M023|C0252|SUPPORTED / overclaims|NARROW_SCOPE|01:L55|edit|stands+absent|56dc0440e57e9bb5|732611026ff42f55",
    "EAT-R117|M024|C0261|ESTABLISHED / overclaims|NARROW_SCOPE|01:L59|edit|stands+absent|78d942e22c63af0e|2c3398126965169f",
    "EAT-R118|M025|C0264|SUPPORTED / overclaims|ADD_TEMPORAL_QUALIFIER|01:L59|edit|stands+absent|6ba9e86d6cb35654|4b70d4750c9fb608",
    "EAT-R119|M026|C0265|SUPPORTED / overclaims|ADD_TEMPORAL_QUALIFIER|01:L59|same-edit|stands+absent|afc0db887706fa8e|921396b64151b947",
    "EAT-R120|M027|C0277|ESTABLISHED / overclaims|ADD_TEMPORAL_QUALIFIER|01:L65|edit|stands+absent|66c20925ab264638|74fb19ac9165e9c6",
    "EAT-R121|M028|C0521|SUPPORTED / overclaims|NARROW_SCOPE|02:L32|edit|stands+absent|925f908e0b41e1cf|47ebf947b4b08381",
    "EAT-R122|M029|C0522|NON-EPISTEMIC (set KG02-03 CONTESTED)|SURFACE_DISAGREEMENT|02:L36-42|edit|stands+absent|0c66b42e8842b206|9abd7a9757f12748",
    "EAT-R123|M030|C0530|REFUTED|ADD_TEMPORAL_QUALIFIER|02:L48|edit|stands+absent|933e5d26f24f822d|dd78f97e863663af",
    "EAT-R124|M031|C0534|REFUTED|MARK_AS_DEFINITION|02:L48|edit|stands+absent|1cabf48fbc75fb2a|e3d3b9a856dc62c8",
    "EAT-R125|M032|C0305|REFUTED|ADD_TEMPORAL_QUALIFIER|03:L7|edit|stands+absent|e263ae1a65a848ef|80fb9d6f2e3b42a2",
    "EAT-R126|M033|C0312|NON-EPISTEMIC / overclaims|ADD_MISSING_PREMISE|03:L9|ledger-only|stands|8fb23d8017a71081|5d2ac5d4048be209",
    "EAT-R127|M034|C0315|SUPPORTED / overclaims|ADD_SOURCE|03:L9|edit|stands+absent|87e8d59ef6af28e0|8abe7873cdfc654f",
    "EAT-R128|M035|C0320|REFUTED|ADD_MISSING_PREMISE|03:L10|edit|stands+absent|f5be4ea4edad8b02|671a0a61435adaf6",
    "EAT-R129|M036|C0321|UNDETERMINED / overclaims|PRESERVE_AS_UNDETERMINED|03:L10|edit|stands+absent|855ee8d10c8b1d67|3dba4cb2650424e0",
    "EAT-R130|M037|C0336|REFUTED|ADD_TEMPORAL_QUALIFIER|03:L18|edit|stands+absent|b22070ab2467cc61|178473c24e86e785",
    "EAT-R131|M038|C0338|REFUTED|ADD_TEMPORAL_QUALIFIER|03:L18|same-edit|stands+absent|dfb04c8a5029e28c|3974752034e86ed6",
    "EAT-R132|M039|C0346|SUPPORTED / overclaims|NARROW_SCOPE|03:L21|edit|stands+absent|6baaa4a23c9bd0e4|f661fe4410302bb5",
    "EAT-R133|M040|C0353|PLAUSIBLE / overclaims|NARROW_SCOPE|03:L22|edit|stands+absent|6948300c48514d7e|a9953d90ec5af618",
    "EAT-R134|M041|C0356|SUPPORTED / overclaims|NARROW_SCOPE|03:L23|edit|stands+absent|d083bfc6e1d7084c|9aa7137a05fb3f1c",
    "EAT-R135|M042|C0368|UNDETERMINED / overclaims|PRESERVE_AS_UNDETERMINED|03:L33|edit|stands+absent|1c8efab82c5501ed|12fbebde0b4d46f2",
    "EAT-R136|M043|C03106|SUPPORTED / overclaims|DOWNGRADE_MODALITY|03:L55|edit|stands+absent|8fec8c3863a5dd77|b1f6a044029d3da8",
    "EAT-R137|M044|C03141|UNSUPPORTED|REMOVE_CLAIM|04:L38|ledger-only|stands|388e033d3196565a|6cb2552d3d713916",
    "EAT-R138|M045|C0402|SUPPORTED / overclaims|ADD_TEMPORAL_QUALIFIER|README:L4|edit|stands+absent|41e8e72f29573554|5f392382b0db46d5",
    "EAT-R139|M046|C0409|SUPPORTED / overclaims|DOWNGRADE_MODALITY|README:L7|edit|stands+absent|fbf151b60e68ac04|7651acc5c60235df",
    "EAT-R140|M047|C0422|NON-EPISTEMIC / overclaims|NARROW_SCOPE|README:L24|edit|stands+absent|dea30cf87279539d|33e2bf06ac14c4e9",
    "EAT-R141|M048|C0437|REFUTED|ADD_TEMPORAL_QUALIFIER|SKILL:L14|edit|stands+absent|ac9e407c1b707907|e7ae05bc607962bb",
    "EAT-R142|M049|C0443|SUPPORTED / overclaims|NARROW_SCOPE|SKILL:L16|edit|stands+absent|76dab28c081a1ee6|fdafa9cc21231eda",
    "EAT-R143|M050|C0446|SUPPORTED / overclaims|NARROW_SCOPE|SKILL:L16|edit|stands+absent|b7d479173cb73eb1|54552e27ddbd2254",
    ]);
  });

  it("outside anchor: the tracked bead export's wb-12x1 row names the statement, lists EAT-R004 then exactly these 50 requirements, and cites the 0b25e14e pin", () => {
    const row = exportRow();
    expect(row.title).toBe(STATEMENT);
    const acceptance = segment(row.description, "ACCEPTANCE");
    const listed = /^requirements ((?:EAT-R\d{3}, )*EAT-R\d{3}) - each per its ATOMIC-REQUIREMENTS\.md entry/.exec(acceptance)?.[1]?.split(", ") ?? [];
    expect(listed).toEqual(["EAT-R004", ...ROWS.map(entry => entry.requirement)]);
    const surfaces = segment(row.description, "SURFACES");
    expect(surfaces.split("; ")).toEqual([`${PROGRAM}/triage/requirements/ATOMIC-REQUIREMENTS.md@${TRIAGE_PIN}`, `${PROGRAM}/triage/requirements/TDD-MATRIX.md@${TRIAGE_PIN}`]);
  }, 60_000);

  it("receipt anchor: the last dated entry of docs/workbench/receipts/wb-12x1.md holds these rows' table, by digest, in order and both ways", () => {
    expect(receiptTable()).toEqual(ROWS.map(receiptRowOf));
  });

  describe("ROWS: a row's standing text stands once on a line of its Where, and (edit and same-edit rows) its Existing wording stands on its page only inside that text", () => {
    it.each(ROWS.map((row): [string, Row] => [`${row.requirement} ${row.id} ${row.claim} ${row.transform} ${row.where}`, row]))("%s", (_title, row) => {
      const text = pageText(placeOf(row).page);
      expect(findingsOf(row, text), "the live page").toEqual([]);
      const mutants = mutantsOf(row, text);
      expect(mutants.map(mutant => mutant.name)).toEqual(row.kind === "ledger-only" ? ["NORM-EDIT", "SHORTEN", "MOVED", "DUPLICATE"] : ["RESTORE", "SHORTEN", "MOVED", "DUPLICATE", "ELSEWHERE"]);
      for (const mutant of mutants) expect(findingsOf(row, mutant.text), mutant.name).toEqual(mutant.findings);
      REACHED.add(row.id);
    });
  });

  it("R-PARAPHRASE quiet rows: an overstrong claim reworded, split over two lines or broken by emphasis reads clean, while its exact wording on the same page reds", () => {
    const quiet = [
      { id: "M001", added: "Source implemented, tests and receipts were recorded." },
      { id: "M050", added: "No Pi-to-Mechanical end-to-end acceptance has\nbeen witnessed." },
      { id: "M018", added: "It includes cwd/model/permissions/**tools**/roles/grants/principal." },
    ];
    for (const { id, added } of quiet) {
      const row = byId.get(id);
      expect(row, id).toBeDefined();
      if (row === undefined) continue;
      const text = pageText(placeOf(row).page);
      const last = text.split("\n").length;
      expect(findingsOf(row, `${text}${added}\n`), `${id} quiet`).toEqual([]);
      expect(findingsOf(row, `${text}${row.existing}\n`), `${id} twin`).toEqual([`${id} overstrong wording stands at ${placeOf(row).page}:L${last}`]);
    }
  });

  it("records: every row's case ran and reached its predicate", () => {
    expect([...REACHED].sort()).toEqual(ROWS.map(row => row.id).sort());
  });
});
