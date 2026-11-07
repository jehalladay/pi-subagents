/**
 * wb-muip (MWI B-unknowns, slice PI-0, program mechanical-workflows-interop-2026-11-04; gate EVIDENCE-CENSUS): the evidence
 * census for EAT-R080 (prior-run census: a found witness or searched-scope absence over declared in-repo receipt stores and a
 * declared date range, the global reading UNDETERMINED unless a witness is found) and EAT-R081 (Forge transport probe: the
 * exit-zero failed-gate premise read from admitted native Forge transcripts only, recorded as a witnessed pairing, a scoped
 * non-observation or UNDETERMINED). The judges are test/helpers/mechanical-evidence-census.ts; the native transcripts are the
 * committed probe receipt qa/workbench/receipts/wb-muip-forge-transport-probe.json, written by qa/workbench/forge-transport-probe.mjs.
 *
 * THE REQUIREMENTS, never retyped: test/fixtures/mwi-unknowns-requirements-roster.json vendors each requirement block verbatim
 * (pi-subagents master 0b25e14e, triage/requirements/ATOMIC-REQUIREMENTS.md:1476-1484 and :1486-1494, read with read-only git
 * show by the cutting seat), each held to its SHA-256; ROWS' statements and each row's mutant-kill case are judged against it.
 * The row ids are judged against this bead's own row of the tracked export (.beads/issues.jsonl, wb-muip: "requirements
 * EAT-R080, EAT-R081"), the anchor outside this file.
 *
 * PINNED READER SET (case id: assertion target -> observed result at this cut; every case is in CASES below, judged by the
 * shape rows):
 * EAT-R080 (judgePriorRuns, joinComponentsOf, markdownEntries, jsonEntry, readStoreEntries)
 * - R080-NEVER-RAN-MUTANT: zero joined entries over a read scope -> verdict searched-scope-absence, global UNDETERMINED, the
 *   declared unread stores carried (kills the vendored mutant "Treat no in-repo filename hit as proof no external run occurred").
 * - R080-EMPTY-UNREAD: zero joined entries with NO store declared unread -> global still UNDETERMINED.
 * - R080-VOCABULARY: the verdict words are exactly found-witness and searched-scope-absence, the global readings exactly
 *   WITNESSED and UNDETERMINED (no universal never-ran word exists to return).
 * - R080-JOINED-WITNESS: one entry carrying all four join components -> found-witness, WITNESSED, that entry's ref.
 * - R080-NEEDS-PI-RUN / R080-NEEDS-OUTCOME / R080-NEEDS-OPERATION / R080-NEEDS-PIN: the same entry less exactly one component
 *   -> no witness, one partial naming exactly the other three.
 * - R080-OUTCOME-TOKENS: each of verified_candidate, verification_failed, needs_evidence completes the join.
 * - R080-RANGE-BOUNDS: full joins dated the day before `from` and the day after `to` are out of range (refs listed, not read);
 *   full joins dated exactly `from` and exactly `to` are read and found.
 * - R080-UNDATED-READ: an undated entry is read (counted undated) and its join found.
 * - R080-MARKDOWN-ENTRIES: a markdown receipt splits at its level-2 headings (the preamble entry 0), each dated by a leading
 *   YYYY-MM-DD; a join inside one entry is found at that entry's ref.
 * - R080-JSON-ENTRY: a JSON receipt is one entry dated by its top-level utc; no utc, a non-date utc or unparsable text is undated.
 * - R080-UNDECLARED-STORE: an entry from a store the scope does not declare is refused (throws).
 * - R080-LIVE-STORES: on the live tree every declared store reads at least one entry (the receipts store reads exactly the
 *   files qa/workbench/receipts-index.mjs lists); the record's verdict and global reading follow its witnesses and it carries the
 *   four declared unread stores. Measured at this cut: searched-scope absence, global UNDETERMINED (numbers in the receipt).
 * - R080-LIVE-PLANTED: a joined entry planted into each store's first live file is found by the same reader (not blind).
 * EAT-R081 (judgeTransportPairing, contractMismatches, readProbeReceipt)
 * - R081-FIXTURE-MUTANT: a synthetic fixture pairing exit 0 with FAIL -> excluded not-producer-evidence, verdict UNDETERMINED
 *   (kills the vendored mutant "Use a synthetic exit-zero FAIL fixture as a producer receipt").
 * - R081-ADAPTER-CONDITIONAL: an adapter-conditional item pairing exit 0 with FAIL -> excluded, UNDETERMINED.
 * - R081-PAIRING-WITNESSED: an admitted native transcript exiting 0 with gate verdict FAIL -> pairing-witnessed, its id.
 * - R081-SCOPED-NON-OBSERVATION: admitted native FAIL transcripts exiting nonzero -> scoped-non-observation, the scope naming
 *   each one's producer and argv.
 * - R081-NEEDS-PRODUCER / R081-NEEDS-OPERATION / R081-NEEDS-PAIRING-FIELDS: a native transcript without the forge identity, without
 *   a native operation id (op- plus 32 lowercase hex), or without an integer exit, a gate verdict or an argv -> excluded with
 *   that reason.
 * - R081-NO-FAILED-GATE: PASS-only admitted transcripts, or no evidence -> UNDETERMINED.
 * - R081-FIXTURE-NEVER-UPGRADES: a fixture exit-0 FAIL beside an admitted nonzero FAIL -> scoped-non-observation, never witnessed.
 * - R081-CONTRACT-CONSISTENCY: a transcript whose exit differs from the contract's code for its envelope status, or whose
 *   status the contract lacks, is named.
 * - R081-RECORDED-PROBE: the committed probe receipt is tied to the committed probe script's SHA-256; forge 0.2.1 rev
 *   f7d4a6a8ae17's recorded contract maps success alone to exit 0; the PASS control exits 0 with PASS; both failed gates exit 1
 *   with FAIL; every transcript agrees with the contract -> scoped-non-observation, no witness, the two failed gates in scope.
 *
 * NOT CLAIMED (scope sentences, no follow-up): global absence of a Pi -> Mechanical develop run is NOT CLAIMED by this census
 * (it never concludes one); stores outside PRIOR_RUN_SCOPE.read (the four declared unread stores, other docs, git history,
 * new-feedback/) are NOT CLAIMED; entries dated outside 2026-10-15..2026-11-06 are NOT CLAIMED (listed out of range); forge
 * verbs and flags other than the recorded argv, other forge builds, and the Forge source path from status to exit are NOT
 * CLAIMED; the B-outcomes guardrail EAT-R039 is NOT CLAIMED (it stays mandatory whatever this census records).
 *
 * RESIDUALS (rule 19(d): a named family plus a pinned quiet row, a case that reds when the quiet reading changes):
 * - R-OUTCOME-WORDS (QUIET-OUTCOME-WORDS): the fourth outcome docs/workbench/01 J03 names, indeterminate, is an ordinary word and
 *   is not read as a Mechanical outcome, so a run ending there reads as a partial (held to J03 by the J03 anchor row).
 * - R-PI-REFERENCE (QUIET-PI-REFERENCE): a Pi side named only by a session UUID is not read as a Pi run.
 * - R-SPELLING (QUIET-SPELLING): a component outside its one pattern (upper-case or short run ids and operation ids, camelCase or
 *   hyphenated outcome words, a 6-hex pin) is not read.
 * - R-SPLIT-JOIN (QUIET-SPLIT-JOIN): components split across entries never join.
 * - R-DECLARED-PROVENANCE (QUIET-DECLARED-PROVENANCE): provenance is read as declared, so a synthetic record that declares
 *   native-transcript with a full forge identity is admitted; the recorded receipt's tie is the probe script's SHA-256 only.
 * - R-VERDICT-SPELLING (QUIET-VERDICT-SPELLING): a failed gate spelled other than the native gate verdict FAIL (COULD_NOT_JUDGE,
 *   lower-case fail) is not read as failed.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { readReceiptsListing } from "../qa/workbench/receipts-index.mjs";
import {
  contractMismatches,
  GLOBAL_READINGS,
  JOIN_COMPONENTS,
  type JoinComponent,
  joinComponentsOf,
  jsonEntry,
  judgePriorRuns,
  judgeTransportPairing,
  markdownEntries,
  OUTCOME_TOKENS,
  PRIOR_RUN_SCOPE,
  PRIOR_RUN_VERDICTS,
  PROBE_RECEIPT,
  PROBE_SCHEMA,
  PROBE_SCRIPT,
  type PriorRunScope,
  readProbeReceipt,
  readStoreEntries,
  type StoreEntry,
  type TransportEvidence,
} from "./helpers/mechanical-evidence-census.js";

const REPO = fileURLToPath(new URL("../", import.meta.url));
const BEAD = "wb-muip";
const ROSTER = "test/fixtures/mwi-unknowns-requirements-roster.json";
const EXPORT = ".beads/issues.jsonl";
const J03_PAGE = "docs/workbench/01-product-vision-and-user-journeys.md";

type RowId = "EAT-R080" | "EAT-R081";

interface Case {
  readonly id: string;
  readonly row: RowId;
  readonly kind: "claim" | "quiet";
  readonly title: string;
  /** The vendored adversarial mutant this case kills, verbatim (exactly one claim case per row carries it). */
  readonly kills?: string;
  readonly run: () => void;
}

const sha256 = (bytes: string | Buffer): string => createHash("sha256").update(bytes).digest("hex");
const repoText = (path: string): string => readFileSync(join(REPO, path), "utf8");

// The planted join components: each matches exactly its one pattern and no other (no hex run of 7+ outside the pin).
const PI_RUN = "wf_0123456789ab";
const OUTCOME = "verified_candidate";
const OPERATION = `op-${"0123456789abcdef".repeat(2)}`;
const PIN = "0123456789abcdef0123456789abcdef01234567";
const PARTS: Readonly<Record<JoinComponent, string>> = {
  "pi-run": `Pi run ${PI_RUN}`,
  "mechanical-outcome": `settled ${OUTCOME}`,
  "forge-operation": `Forge ${OPERATION}`,
  "source-pin": `at ${PIN}`,
};
const textWithout = (missing: JoinComponent | null): string =>
  JOIN_COMPONENTS.filter((component) => component !== missing)
    .map((component) => PARTS[component])
    .join("; ");
const JOINED = textWithout(null);

const SCOPE: PriorRunScope = {
  from: "2026-10-15",
  to: "2026-11-06",
  read: [
    { id: "store-a", path: "a", shape: "markdown-entries" },
    { id: "store-b", path: "b", shape: "json-files" },
  ],
  unread: [{ id: "external-x", reason: "not authorized" }],
};
const entry = (ref: string, text: string, date: string | null = "2026-10-20", store = "store-a"): StoreEntry => ({ store, ref, date, text });

const FORGE = { name: "forge", version: "0.2.1", revision: "f7d4a6a8ae17" } as const;
const native = (id: string, processExit: number, gateVerdict: string, extra: Partial<TransportEvidence> = {}): TransportEvidence => ({
  id,
  source: "native-transcript",
  producer: FORGE,
  argv: ["forge", "build", "--json"],
  processExit,
  gateVerdict,
  operationId: OPERATION,
  ...extra,
});

interface RosterRequirement {
  readonly id: string;
  readonly lines: string;
  readonly sha256: string;
  readonly text: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly source: { readonly branch: string; readonly commit: string; readonly path: string; readonly blob: string; readonly fileSha256: string };
  readonly requirements: readonly RosterRequirement[];
}
const roster = (): Roster => JSON.parse(repoText(ROSTER)) as Roster;
const field = (requirement: RosterRequirement, label: string): string => {
  const prefix = `- ${label}: `;
  const lines = requirement.text.filter((line) => line.startsWith(prefix));
  expect(lines, `${requirement.id} carries exactly one ${label} line`).toHaveLength(1);
  return (lines[0] ?? "").slice(prefix.length);
};
const MUTANT_R080 = "Treat no in-repo filename hit as proof no external run occurred.";
const MUTANT_R081 = "Use a synthetic exit-zero FAIL fixture as a producer receipt.";

const CASES: readonly Case[] = [
  {
    id: "R080-NEVER-RAN-MUTANT",
    row: "EAT-R080",
    kind: "claim",
    title: "zero joined entries read as searched-scope absence with the global reading UNDETERMINED and the unread stores carried",
    kills: MUTANT_R080,
    run: () => {
      const record = judgePriorRuns(SCOPE, [entry("a.md#1", "a receipt that names no Mechanical run"), entry("b.json", "{}", "2026-10-21", "store-b")]);
      expect(record.verdict).toBe("searched-scope-absence");
      expect(record.global).toBe("UNDETERMINED");
      expect(record.witnesses).toEqual([]);
      expect(record.unread).toEqual(SCOPE.unread);
      expect(record.read).toEqual([
        { store: "store-a", entries: 1 },
        { store: "store-b", entries: 1 },
      ]);
    },
  },
  {
    id: "R080-EMPTY-UNREAD",
    row: "EAT-R080",
    kind: "claim",
    title: "with no store declared unread, zero joined entries still leave the global reading UNDETERMINED",
    run: () => {
      const record = judgePriorRuns({ ...SCOPE, unread: [] }, [entry("a.md#1", textWithout("forge-operation"))]);
      expect(record.verdict).toBe("searched-scope-absence");
      expect(record.global).toBe("UNDETERMINED");
      expect(record.unread).toEqual([]);
    },
  },
  {
    id: "R080-VOCABULARY",
    row: "EAT-R080",
    kind: "claim",
    title: "the verdict and global vocabularies hold no universal-absence word",
    run: () => {
      expect([...PRIOR_RUN_VERDICTS]).toEqual(["found-witness", "searched-scope-absence"]);
      expect([...GLOBAL_READINGS]).toEqual(["WITNESSED", "UNDETERMINED"]);
    },
  },
  {
    id: "R080-JOINED-WITNESS",
    row: "EAT-R080",
    kind: "claim",
    title: "one entry carrying all four join components is a found witness and the global reading WITNESSED",
    run: () => {
      expect(joinComponentsOf(JOINED)).toEqual([...JOIN_COMPONENTS]);
      const record = judgePriorRuns(SCOPE, [entry("a.md#1", "unrelated"), entry("a.md#2", JOINED)]);
      expect(record.verdict).toBe("found-witness");
      expect(record.global).toBe("WITNESSED");
      expect(record.witnesses).toEqual(["a.md#2"]);
      expect(record.partials).toEqual([]);
    },
  },
  ...JOIN_COMPONENTS.map(
    (missing): Case => ({
      id: `R080-NEEDS-${{ "pi-run": "PI-RUN", "mechanical-outcome": "OUTCOME", "forge-operation": "OPERATION", "source-pin": "PIN" }[missing]}`,
      row: "EAT-R080",
      kind: "claim",
      title: `an entry without the ${missing} component is a partial, never a witness`,
      run: () => {
        const present = JOIN_COMPONENTS.filter((component) => component !== missing);
        expect(joinComponentsOf(textWithout(missing))).toEqual(present);
        const record = judgePriorRuns(SCOPE, [entry("a.md#3", textWithout(missing))]);
        expect(record.verdict).toBe("searched-scope-absence");
        expect(record.witnesses).toEqual([]);
        expect(record.partials).toEqual([{ ref: "a.md#3", store: "store-a", date: "2026-10-20", components: present }]);
      },
    }),
  ),
  {
    id: "R080-OUTCOME-TOKENS",
    row: "EAT-R080",
    kind: "claim",
    title: "each of the three snake_case domain outcome tokens completes the join",
    run: () => {
      expect([...OUTCOME_TOKENS]).toEqual(["verified_candidate", "verification_failed", "needs_evidence"]);
      for (const token of OUTCOME_TOKENS) {
        const record = judgePriorRuns(SCOPE, [entry("a.md#1", JOINED.replace(OUTCOME, token))]);
        expect(record.witnesses, token).toEqual(["a.md#1"]);
      }
    },
  },
  {
    id: "R080-RANGE-BOUNDS",
    row: "EAT-R080",
    kind: "claim",
    title: "entries dated outside the declared range are listed out of range and not read; the bounds themselves are read",
    run: () => {
      const record = judgePriorRuns(SCOPE, [
        entry("a.md#1", JOINED, "2026-10-14"),
        entry("a.md#2", JOINED, "2026-11-07"),
        entry("a.md#3", JOINED, "2026-10-15"),
        entry("a.md#4", JOINED, "2026-11-06"),
      ]);
      expect(record.range).toEqual({ from: "2026-10-15", to: "2026-11-06" });
      expect(record.outOfRange).toEqual(["a.md#1", "a.md#2"]);
      expect(record.witnesses).toEqual(["a.md#3", "a.md#4"]);
      expect(record.read).toEqual([
        { store: "store-a", entries: 2 },
        { store: "store-b", entries: 0 },
      ]);
      const outside = judgePriorRuns(SCOPE, [entry("a.md#1", JOINED, "2026-10-14")]);
      expect(outside.verdict).toBe("searched-scope-absence");
      expect(outside.global).toBe("UNDETERMINED");
    },
  },
  {
    id: "R080-UNDATED-READ",
    row: "EAT-R080",
    kind: "claim",
    title: "an undated entry is read, counted undated, and its join found",
    run: () => {
      const record = judgePriorRuns(SCOPE, [entry("a.md#0", JOINED, null)]);
      expect(record.undated).toBe(1);
      expect(record.witnesses).toEqual(["a.md#0"]);
      expect(record.outOfRange).toEqual([]);
    },
  },
  {
    id: "R080-MARKDOWN-ENTRIES",
    row: "EAT-R080",
    kind: "claim",
    title: "a markdown receipt splits at its level-2 headings, each dated by a leading YYYY-MM-DD, and a join is found in its own entry",
    run: () => {
      const text = ["# wb-x: a title", "", "## 2026-10-20 receipt: first", "", "body one", "", "### 2026-10-21 a level-3 heading stays inside", "", "## an undated heading", "", JOINED, "", "## 2026-10-22T08:00Z second", "tail"].join("\n");
      const entries = markdownEntries("store-a", "r.md", text);
      expect(entries.map((item) => [item.ref, item.date])).toEqual([
        ["r.md#0", null],
        ["r.md#1", "2026-10-20"],
        ["r.md#2", null],
        ["r.md#3", "2026-10-22"],
      ]);
      expect(entries[1]?.text).toContain("### 2026-10-21 a level-3 heading stays inside");
      expect(entries.every((item) => item.store === "store-a")).toBe(true);
      expect(entries.map((item) => item.text).join("\n")).toBe(text);
      expect(judgePriorRuns(SCOPE, entries).witnesses).toEqual(["r.md#2"]);
    },
  },
  {
    id: "R080-JSON-ENTRY",
    row: "EAT-R080",
    kind: "claim",
    title: "a JSON receipt is one entry dated by its top-level utc; no utc, a non-date utc or unparsable text is undated",
    run: () => {
      const dated = jsonEntry("store-b", "b.json", JSON.stringify({ utc: "2026-10-15T22:35:49.543Z", note: JOINED }));
      expect(dated).toEqual({ store: "store-b", ref: "b.json", date: "2026-10-15", text: JSON.stringify({ utc: "2026-10-15T22:35:49.543Z", note: JOINED }) });
      expect(jsonEntry("store-b", "b.json", JSON.stringify({ note: JOINED })).date).toBeNull();
      expect(jsonEntry("store-b", "b.json", JSON.stringify({ utc: "yesterday" })).date).toBeNull();
      expect(jsonEntry("store-b", "b.json", JSON.stringify({ nested: { utc: "2026-10-15T00:00:00Z" } })).date).toBeNull();
      expect(jsonEntry("store-b", "b.json", "{ not json").date).toBeNull();
      expect(judgePriorRuns(SCOPE, [dated]).witnesses).toEqual(["b.json"]);
    },
  },
  {
    id: "R080-UNDECLARED-STORE",
    row: "EAT-R080",
    kind: "claim",
    title: "an entry from a store the scope does not declare is refused",
    run: () => {
      expect(() => judgePriorRuns(SCOPE, [entry("z.md#1", JOINED, "2026-10-20", "store-z")])).toThrow(/store-z/);
    },
  },
  {
    id: "R080-LIVE-STORES",
    row: "EAT-R080",
    kind: "claim",
    title: "on the live tree every declared store reads entries, and the record follows its witnesses and carries the four unread stores",
    run: () => {
      const byStore = new Map(PRIOR_RUN_SCOPE.read.map((store) => [store.id, readStoreEntries(REPO, store)]));
      const files = (id: string): string[] => [...new Set((byStore.get(id) ?? []).map((item) => item.ref.replace(/#\d+$/, "")))];
      const listed = readReceiptsListing(join(REPO, "docs/workbench/receipts")).entries.filter((item: { file: boolean }) => item.file);
      expect(files("pi-receipts")).toEqual(listed.map((item: { name: string }) => `docs/workbench/receipts/${item.name}`).sort());
      expect(files("pi-traceability")).toEqual(["docs/workbench/TRACEABILITY.md"]);
      expect(files("pi-qa-receipts")).toEqual(expect.arrayContaining(["qa/workbench/receipts/wb-a2g.3-operator-receipt.json", PROBE_RECEIPT]));
      expect(files("pi-qa-receipts").every((path) => path.endsWith(".json"))).toBe(true);
      for (const store of PRIOR_RUN_SCOPE.read) expect((byStore.get(store.id) ?? []).length, store.id).toBeGreaterThan(0);
      const record = judgePriorRuns(PRIOR_RUN_SCOPE, [...byStore.values()].flat());
      expect(record.verdict).toBe(record.witnesses.length > 0 ? "found-witness" : "searched-scope-absence");
      expect(record.global).toBe(record.witnesses.length > 0 ? "WITNESSED" : "UNDETERMINED");
      expect(record.unread.map((store) => store.id)).toEqual(["mechanical-workflows-repository", "shared-artifact-store", "claude-session-journals", "workbench-machine-ledger"]);
      expect(record.read.map((store) => store.store)).toEqual(["pi-receipts", "pi-traceability", "pi-qa-receipts"]);
      for (const store of record.read) expect(store.entries, store.store).toBeGreaterThan(0);
    },
  },
  {
    id: "R080-LIVE-PLANTED",
    row: "EAT-R080",
    kind: "claim",
    title: "a joined entry planted into each store's first live file is found by the same reader",
    run: () => {
      for (const store of PRIOR_RUN_SCOPE.read) {
        const first = readStoreEntries(REPO, store)[0];
        expect(first, store.id).toBeDefined();
        const path = (first?.ref ?? "").replace(/#\d+$/, "");
        const live = repoText(path);
        const planted =
          store.shape === "markdown-entries"
            ? markdownEntries(store.id, path, `${live}\n## 2026-11-01 planted\n\n${JOINED}\n`)
            : [jsonEntry(store.id, path, JSON.stringify({ ...(JSON.parse(live) as Record<string, unknown>), planted: JOINED }))];
        const record = judgePriorRuns(PRIOR_RUN_SCOPE, planted);
        expect(record.verdict, store.id).toBe("found-witness");
        expect(record.witnesses.length, store.id).toBeGreaterThan(0);
      }
    },
  },
  {
    id: "R081-FIXTURE-MUTANT",
    row: "EAT-R081",
    kind: "claim",
    title: "a synthetic fixture pairing exit 0 with FAIL is excluded as not producer evidence and the verdict stays UNDETERMINED",
    kills: MUTANT_R081,
    run: () => {
      const record = judgeTransportPairing([native("synthetic", 0, "FAIL", { source: "fixture" })]);
      expect(record.verdict).toBe("UNDETERMINED");
      expect(record.excluded).toEqual([{ id: "synthetic", reason: "not-producer-evidence" }]);
      expect(record.admitted).toEqual([]);
      expect(record.witnesses).toEqual([]);
    },
  },
  {
    id: "R081-ADAPTER-CONDITIONAL",
    row: "EAT-R081",
    kind: "claim",
    title: "an adapter conditional pairing exit 0 with FAIL is excluded and the verdict stays UNDETERMINED",
    run: () => {
      const record = judgeTransportPairing([native("live-gate.ts:210", 0, "FAIL", { source: "adapter-conditional" })]);
      expect(record.verdict).toBe("UNDETERMINED");
      expect(record.excluded).toEqual([{ id: "live-gate.ts:210", reason: "not-producer-evidence" }]);
    },
  },
  {
    id: "R081-PAIRING-WITNESSED",
    row: "EAT-R081",
    kind: "claim",
    title: "an admitted native transcript exiting 0 with gate verdict FAIL is a witnessed pairing",
    run: () => {
      const record = judgeTransportPairing([native("zero-fail", 0, "FAIL"), native("one-fail", 1, "FAIL")]);
      expect(record.verdict).toBe("pairing-witnessed");
      expect(record.witnesses).toEqual(["zero-fail"]);
      expect(record.admitted).toEqual(["zero-fail", "one-fail"]);
    },
  },
  {
    id: "R081-SCOPED-NON-OBSERVATION",
    row: "EAT-R081",
    kind: "claim",
    title: "admitted native FAIL transcripts exiting nonzero are a scoped non-observation naming each producer and argv",
    run: () => {
      const record = judgeTransportPairing([native("pass", 0, "PASS"), native("fail", 1, "FAIL"), native("kg", 1, "FAIL", { argv: ["forge", "build", "--keep-going", "--json"] })]);
      expect(record.verdict).toBe("scoped-non-observation");
      expect(record.witnesses).toEqual([]);
      expect(record.scope).toEqual([
        { id: "fail", producer: "forge 0.2.1 (rev f7d4a6a8ae17)", argv: "forge build --json" },
        { id: "kg", producer: "forge 0.2.1 (rev f7d4a6a8ae17)", argv: "forge build --keep-going --json" },
      ]);
    },
  },
  {
    id: "R081-NEEDS-PRODUCER",
    row: "EAT-R081",
    kind: "claim",
    title: "a native transcript without the forge name, version or revision is excluded",
    run: () => {
      const record = judgeTransportPairing([
        native("no-producer", 0, "FAIL", { producer: undefined }),
        native("other-name", 0, "FAIL", { producer: { ...FORGE, name: "furnace" } }),
        native("no-version", 0, "FAIL", { producer: { ...FORGE, version: "" } }),
        native("no-revision", 0, "FAIL", { producer: { ...FORGE, revision: null } }),
      ]);
      expect(record.verdict).toBe("UNDETERMINED");
      expect(record.excluded.map((item) => item.reason)).toEqual(Array(4).fill("producer-identity-missing"));
    },
  },
  {
    id: "R081-NEEDS-OPERATION",
    row: "EAT-R081",
    kind: "claim",
    title: "a native transcript without a native operation id is excluded",
    run: () => {
      const record = judgeTransportPairing([
        native("none", 0, "FAIL", { operationId: null }),
        native("upper", 0, "FAIL", { operationId: OPERATION.toUpperCase() }),
        native("short", 0, "FAIL", { operationId: OPERATION.slice(0, -1) }),
        native("bare", 0, "FAIL", { operationId: OPERATION.slice(3) }),
      ]);
      expect(record.verdict).toBe("UNDETERMINED");
      expect(record.excluded.map((item) => item.reason)).toEqual(Array(4).fill("operation-id-missing"));
    },
  },
  {
    id: "R081-NEEDS-PAIRING-FIELDS",
    row: "EAT-R081",
    kind: "claim",
    title: "a native transcript without an integer exit, a gate verdict or an argv is excluded",
    run: () => {
      const record = judgeTransportPairing([
        native("signalled", 0, "FAIL", { processExit: null }),
        native("fractional", 0, "FAIL", { processExit: 0.5 }),
        native("no-verdict", 0, "FAIL", { gateVerdict: null }),
        native("empty-verdict", 0, "FAIL", { gateVerdict: "" }),
        native("no-argv", 0, "FAIL", { argv: [] }),
      ]);
      expect(record.verdict).toBe("UNDETERMINED");
      expect(record.excluded.map((item) => item.reason)).toEqual(Array(5).fill("pairing-fields-missing"));
    },
  },
  {
    id: "R081-NO-FAILED-GATE",
    row: "EAT-R081",
    kind: "claim",
    title: "PASS-only admitted transcripts, or no evidence at all, leave the verdict UNDETERMINED",
    run: () => {
      const passing = judgeTransportPairing([native("pass", 0, "PASS")]);
      expect(passing.verdict).toBe("UNDETERMINED");
      expect(passing.admitted).toEqual(["pass"]);
      expect(judgeTransportPairing([]).verdict).toBe("UNDETERMINED");
    },
  },
  {
    id: "R081-FIXTURE-NEVER-UPGRADES",
    row: "EAT-R081",
    kind: "claim",
    title: "a fixture exit-0 FAIL beside an admitted nonzero FAIL leaves a scoped non-observation",
    run: () => {
      const record = judgeTransportPairing([native("synthetic", 0, "FAIL", { source: "fixture" }), native("fail", 1, "FAIL")]);
      expect(record.verdict).toBe("scoped-non-observation");
      expect(record.witnesses).toEqual([]);
      expect(record.scope.map((item) => item.id)).toEqual(["fail"]);
    },
  },
  {
    id: "R081-CONTRACT-CONSISTENCY",
    row: "EAT-R081",
    kind: "claim",
    title: "a transcript whose exit differs from the contract's code for its status, or whose status the contract lacks, is named",
    run: () => {
      const exitCodes = { success: 0, error: 1, partial: 3 };
      expect(
        contractMismatches(exitCodes, [
          { id: "ok-pass", envelopeStatus: "success", processExit: 0 },
          { id: "ok-fail", envelopeStatus: "error", processExit: 1 },
          { id: "zero-error", envelopeStatus: "error", processExit: 0 },
          { id: "unknown-status", envelopeStatus: "mystery", processExit: 0 },
          { id: "no-status", envelopeStatus: null, processExit: 1 },
        ]),
      ).toEqual(["zero-error", "unknown-status", "no-status"]);
    },
  },
  {
    id: "R081-RECORDED-PROBE",
    row: "EAT-R081",
    kind: "claim",
    title: "the committed probe receipt, tied to the probe script's bytes, records a scoped non-observation over two failed gates",
    run: () => {
      const receipt = readProbeReceipt(repoText(PROBE_RECEIPT));
      expect([receipt.schema, receipt.bead, receipt.requirement]).toEqual([PROBE_SCHEMA, BEAD, "EAT-R081"]);
      expect(receipt.probe).toEqual({ script: PROBE_SCRIPT, scriptSha256: sha256(readFileSync(join(REPO, PROBE_SCRIPT))) });
      expect([receipt.producer.name, receipt.producer.version, receipt.producer.revision]).toEqual(["forge", "0.2.1", "f7d4a6a8ae17"]);
      expect(receipt.producer.executableSha256).toMatch(/^[0-9a-f]{64}$/);
      expect(receipt.exitCodeContract.argv).toEqual(["forge", "codes", "--json"]);
      expect(receipt.exitCodeContract.processExit).toBe(0);
      expect(Object.entries(receipt.exitCodeContract.exitCodes).filter(([, code]) => code === 0)).toEqual([["success", 0]]);
      expect(receipt.exitCodeContract.exitCodes.error).toBe(1);
      expect(contractMismatches(receipt.exitCodeContract.exitCodes, receipt.transcripts)).toEqual([]);
      expect(receipt.transcripts.map((item) => [item.id, item.source, item.processExit, item.envelopeStatus, item.gateVerdict])).toEqual([
        ["pass-control", "native-transcript", 0, "success", "PASS"],
        ["fail", "native-transcript", 1, "error", "FAIL"],
        ["fail-keep-going", "native-transcript", 1, "error", "FAIL"],
      ]);
      const record = judgeTransportPairing(receipt.transcripts);
      expect(record.verdict).toBe("scoped-non-observation");
      expect(record.witnesses).toEqual([]);
      expect(record.excluded).toEqual([]);
      expect(record.admitted).toEqual(["pass-control", "fail", "fail-keep-going"]);
      expect(record.scope).toEqual([
        { id: "fail", producer: "forge 0.2.1 (rev f7d4a6a8ae17)", argv: "forge build --json" },
        { id: "fail-keep-going", producer: "forge 0.2.1 (rev f7d4a6a8ae17)", argv: "forge build --keep-going --no-replay --json" },
      ]);
    },
  },
  {
    id: "QUIET-OUTCOME-WORDS",
    row: "EAT-R080",
    kind: "quiet",
    title: "R-OUTCOME-WORDS: a run that ends on the plain word indeterminate reads as a partial, never a witness",
    run: () => {
      const record = judgePriorRuns(SCOPE, [entry("a.md#1", JOINED.replace(OUTCOME, "indeterminate"))]);
      expect(record.witnesses).toEqual([]);
      expect(record.partials.map((item) => item.components)).toEqual([["pi-run", "forge-operation", "source-pin"]]);
    },
  },
  {
    id: "QUIET-PI-REFERENCE",
    row: "EAT-R080",
    kind: "quiet",
    title: "R-PI-REFERENCE: a Pi side named only by a session UUID is not read as a Pi run",
    run: () => {
      const record = judgePriorRuns(SCOPE, [entry("a.md#1", JOINED.replace(PI_RUN, "00000000-0000-4000-8000-000000000000"))]);
      expect(record.witnesses).toEqual([]);
      expect(record.partials.map((item) => item.components)).toEqual([["mechanical-outcome", "forge-operation", "source-pin"]]);
    },
  },
  {
    id: "QUIET-SPELLING",
    row: "EAT-R080",
    kind: "quiet",
    title: "R-SPELLING: a component written outside its one pattern is not read",
    run: () => {
      const spellings: readonly (readonly [JoinComponent, string, string])[] = [
        ["pi-run", PI_RUN, PI_RUN.toUpperCase()],
        ["pi-run", PI_RUN, "wf_01234"],
        ["mechanical-outcome", OUTCOME, "verifiedCandidate"],
        ["mechanical-outcome", OUTCOME, "verified-candidate"],
        ["forge-operation", OPERATION, `op-${"0123456789ABCDEF".repeat(2)}`],
        ["forge-operation", OPERATION, "op-0123456789abcdef"],
        ["source-pin", PIN, "abc123"],
      ];
      for (const [component, standard, spelling] of spellings) {
        const components = joinComponentsOf(JOINED.replace(standard, spelling));
        expect(components, spelling).toEqual(JOIN_COMPONENTS.filter((item) => item !== component));
      }
    },
  },
  {
    id: "QUIET-SPLIT-JOIN",
    row: "EAT-R080",
    kind: "quiet",
    title: "R-SPLIT-JOIN: components split across two entries of one receipt never join",
    run: () => {
      const text = ["# wb-x: a title", "## 2026-10-20 one", `${PARTS["pi-run"]}; ${PARTS["mechanical-outcome"]}`, "## 2026-10-21 two", `${PARTS["forge-operation"]}; ${PARTS["source-pin"]}`].join("\n");
      const record = judgePriorRuns(SCOPE, markdownEntries("store-a", "r.md", text));
      expect(record.witnesses).toEqual([]);
      expect(record.partials.map((item) => item.ref)).toEqual(["r.md#1", "r.md#2"]);
    },
  },
  {
    id: "QUIET-DECLARED-PROVENANCE",
    row: "EAT-R081",
    kind: "quiet",
    title: "R-DECLARED-PROVENANCE: a synthetic record that declares native-transcript with a full forge identity is admitted",
    run: () => {
      const record = judgeTransportPairing([native("relabelled", 0, "FAIL", { producer: { name: "forge", version: "0.0.0-synthetic", revision: "000000000000" } })]);
      expect(record.verdict).toBe("pairing-witnessed");
      expect(record.admitted).toEqual(["relabelled"]);
    },
  },
  {
    id: "QUIET-VERDICT-SPELLING",
    row: "EAT-R081",
    kind: "quiet",
    title: "R-VERDICT-SPELLING: a failed gate spelled other than the native FAIL verdict is not read as failed",
    run: () => {
      const record = judgeTransportPairing([native("cnj", 0, "COULD_NOT_JUDGE"), native("lower", 0, "fail")]);
      expect(record.verdict).toBe("UNDETERMINED");
      expect(record.admitted).toEqual(["cnj", "lower"]);
      expect(record.witnesses).toEqual([]);
    },
  },
];

/** The census rows: each requirement's statement (held to the roster) and the claim cases that pin it. */
const ROWS: readonly { readonly id: RowId; readonly statement: string; readonly pins: readonly string[] }[] = [
  {
    id: "EAT-R080",
    statement: "The prior-run census MUST distinguish repository absence from global absence.",
    pins: [
      "R080-NEVER-RAN-MUTANT",
      "R080-EMPTY-UNREAD",
      "R080-VOCABULARY",
      "R080-JOINED-WITNESS",
      "R080-NEEDS-PI-RUN",
      "R080-NEEDS-OUTCOME",
      "R080-NEEDS-OPERATION",
      "R080-NEEDS-PIN",
      "R080-OUTCOME-TOKENS",
      "R080-RANGE-BOUNDS",
      "R080-UNDATED-READ",
      "R080-MARKDOWN-ENTRIES",
      "R080-JSON-ENTRY",
      "R080-UNDECLARED-STORE",
      "R080-LIVE-STORES",
      "R080-LIVE-PLANTED",
    ],
  },
  {
    id: "EAT-R081",
    statement: "The Forge transport probe MUST settle the exit-zero failed-gate premise from producer evidence.",
    pins: [
      "R081-FIXTURE-MUTANT",
      "R081-ADAPTER-CONDITIONAL",
      "R081-PAIRING-WITNESSED",
      "R081-SCOPED-NON-OBSERVATION",
      "R081-NEEDS-PRODUCER",
      "R081-NEEDS-OPERATION",
      "R081-NEEDS-PAIRING-FIELDS",
      "R081-NO-FAILED-GATE",
      "R081-FIXTURE-NEVER-UPGRADES",
      "R081-CONTRACT-CONSISTENCY",
      "R081-RECORDED-PROBE",
    ],
  },
];

/** The named residual families, each with its row and its pinned quiet case. */
const RESIDUALS: readonly { readonly id: string; readonly row: RowId; readonly quiet: string; readonly members?: readonly string[] }[] = [
  { id: "R-OUTCOME-WORDS", row: "EAT-R080", quiet: "QUIET-OUTCOME-WORDS", members: ["indeterminate"] },
  { id: "R-PI-REFERENCE", row: "EAT-R080", quiet: "QUIET-PI-REFERENCE" },
  { id: "R-SPELLING", row: "EAT-R080", quiet: "QUIET-SPELLING" },
  { id: "R-SPLIT-JOIN", row: "EAT-R080", quiet: "QUIET-SPLIT-JOIN" },
  { id: "R-DECLARED-PROVENANCE", row: "EAT-R081", quiet: "QUIET-DECLARED-PROVENANCE" },
  { id: "R-VERDICT-SPELLING", row: "EAT-R081", quiet: "QUIET-VERDICT-SPELLING" },
];

describe("wb-muip evidence census: EAT-R080 prior-run census and EAT-R081 Forge transport probe (MWI B-unknowns)", () => {
  for (const item of CASES) it(`${item.id} [${item.row}] ${item.title}`, item.run);

  it("frozen shape (rule 16): the rows, their pin counts and the residual families are exactly the cut's", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(["EAT-R080:16", "EAT-R081:11"]);
    expect(RESIDUALS.map((residual) => `${residual.id}:${residual.row}:${residual.quiet}`)).toEqual([
      "R-OUTCOME-WORDS:EAT-R080:QUIET-OUTCOME-WORDS",
      "R-PI-REFERENCE:EAT-R080:QUIET-PI-REFERENCE",
      "R-SPELLING:EAT-R080:QUIET-SPELLING",
      "R-SPLIT-JOIN:EAT-R080:QUIET-SPLIT-JOIN",
      "R-DECLARED-PROVENANCE:EAT-R081:QUIET-DECLARED-PROVENANCE",
      "R-VERDICT-SPELLING:EAT-R081:QUIET-VERDICT-SPELLING",
    ]);
  });

  it("the rows and residuals tile the cases: each case is pinned once, by a row or residual of its own requirement and kind", () => {
    const ids = CASES.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    const placed = [...ROWS.flatMap((row) => row.pins.map((pin) => [pin, row.id, "claim"] as const)), ...RESIDUALS.map((residual) => [residual.quiet, residual.row, "quiet"] as const)];
    expect(placed.map(([id]) => id).sort()).toEqual([...ids].sort());
    for (const [id, row, kind] of placed) {
      const pinned = CASES.find((item) => item.id === id);
      expect(pinned?.row, id).toBe(row);
      expect(pinned?.kind, id).toBe(kind);
    }
  });

  it("the roster vendors each requirement block under its SHA-256, and the rows' statements and mutant kills are its text", () => {
    const vendored = roster();
    expect(vendored.bead).toBe(BEAD);
    expect(vendored.source.commit).toMatch(/^[0-9a-f]{40}$/);
    expect(vendored.source.path).toBe("docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md");
    expect(vendored.requirements.map((requirement) => requirement.id)).toEqual(ROWS.map((row) => row.id));
    for (const requirement of vendored.requirements) {
      expect(sha256(requirement.text.join("\n")), requirement.id).toBe(requirement.sha256);
      expect(requirement.text[0]?.startsWith(`### ${requirement.id} `), requirement.id).toBe(true);
      const row = ROWS.find((candidate) => candidate.id === requirement.id);
      expect(field(requirement, "Statement"), requirement.id).toBe(row?.statement);
      const kills = CASES.filter((item) => item.row === requirement.id && item.kills !== undefined);
      expect(
        kills.map((item) => [item.kind, item.kills]),
        requirement.id,
      ).toEqual([["claim", field(requirement, "Adversarial mutant")]]);
      expect(field(requirement, "Acceptance").length, requirement.id).toBeGreaterThan(0);
    }
  });

  it("outside anchor: this bead's row of the tracked export names exactly the census rows' requirement ids, in order", () => {
    const rows = repoText(EXPORT)
      .split("\n")
      .filter((line) => line.includes(`"id":"${BEAD}"`))
      .map((line) => JSON.parse(line) as { readonly id?: unknown; readonly description?: unknown })
      .filter((record) => record.id === BEAD);
    expect(rows).toHaveLength(1);
    const description = rows[0]?.description;
    expect(typeof description).toBe("string");
    expect(String(description).match(/EAT-R\d{3}/g)).toEqual(ROWS.map((row) => row.id));
  });

  it("outside anchor: docs/workbench/01 J03's outcome list is the reader's outcome tokens followed by R-OUTCOME-WORDS' members", () => {
    const lines = repoText(J03_PAGE)
      .split("\n")
      .filter((line) => line.startsWith("J03 "));
    expect(lines).toHaveLength(1);
    const list = (lines[0] ?? "").match(/[a-z_]+(?: \/ [a-z_]+)+/);
    expect(list).not.toBeNull();
    const members = RESIDUALS.find((residual) => residual.id === "R-OUTCOME-WORDS")?.members ?? [];
    expect((list?.[0] ?? "").split(" / ")).toEqual([...OUTCOME_TOKENS, ...members]);
  });

  it("the declared live scope names a bounded range and only stores whose paths exist in the tree", () => {
    expect(PRIOR_RUN_SCOPE.from <= PRIOR_RUN_SCOPE.to).toBe(true);
    expect([PRIOR_RUN_SCOPE.from, PRIOR_RUN_SCOPE.to].every((day) => /^\d{4}-\d{2}-\d{2}$/.test(day))).toBe(true);
    for (const store of PRIOR_RUN_SCOPE.read) {
      const parent = store.path.includes("/") ? store.path.slice(0, store.path.lastIndexOf("/")) : ".";
      const name = store.path.slice(store.path.lastIndexOf("/") + 1);
      expect(readdirSync(join(REPO, parent)), store.path).toContain(name);
    }
    expect(PRIOR_RUN_SCOPE.unread.every((store) => store.reason.length > 0)).toBe(true);
  });
});
