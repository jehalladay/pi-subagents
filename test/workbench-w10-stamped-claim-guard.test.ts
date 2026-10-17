/**
 * RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION R6 (wb-2j3.5): a hermetic default-gate guard over the W10 claim row of
 * docs/workbench/feature-matrix.md (the "node() RF noncommitted context preview capability" row). It fails while the row cites only
 * live RF receipts that carry no measured-producer-release stamp. Statement pinned: "the feature-matrix W10 row must cite at
 * least one RF receipt row stamped with the release measured during that run, and the stamped release must match the R2 carrier."
 *
 * Reads docs/workbench/receipts/ (the receipt convention, wb-xox) and never TRACEABILITY.md (frozen; its own census is
 * test/workbench-traceability-freeze.test.ts). The judge is a pure function over (row text, receipt reader, carrier); the live rows feed
 * it the real files and the falsifier rows feed it named in-memory mutants, including the row as it read at 9df9a03 (cited only the
 * 0.1.583-era unstamped receipts), so a weakened guard goes red naming the mutant. Spawns nothing; writes nothing.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { REACTIVE_FIBER_CONTRACT_SOURCE } from "../src/workbench/providers/reactivefiber.js";

const ROOT = process.cwd();
const MATRIX = "docs/workbench/feature-matrix.md";
const INDEX = "docs/workbench/receipts/INDEX.md";
const ROW_PREFIX = "| node() RF noncommitted context preview capability";
const CAPABILITY_TOKEN = "reactivefiber.render.preview/v1";
/** The 0.1.583-era receipts the row cited before the stamp: live runs that recorded no measured producer release. */
const LEGACY_UNSTAMPED_IDS = ["cmd_994da817d4cd", "cmd_7e50a487da08", "cmd_386a32a0323b"];
const STAMP_LINE_ALL = /RF_PREVIEW_RECEIPT (\{.*\})/g;
const CMD_ID_ALL = /cmd_[0-9a-f]{12}/g;
const RECEIPT_PATH_ALL = /receipts\/(wb-[0-9a-z.]+)\.md/g;
const RELEASE_TOKEN_ALL = /rf@([0-9]+(?:\.[0-9]+)*)/g;
/** The only sentence that may name a release other than the stamped one: the retirement of the old literal. */
const RETIREMENT_CLAUSE_ALL = /the earlier rf@[0-9]+(?:\.[0-9]+)* literal is retired/g;

/** The W10 row exactly as it read at 9df9a03: three live receipts, no measured-release stamp, contractSource rf@0.1.583. */
const ROW_AT_9DF9A03 = "| node() RF noncommitted context preview capability (reactivefiber.render.preview/v1) with graph provenance and zero durable writes | landed-gated | src/workbench/providers/reactivefiber.ts (reactivefiber.render.preview v1; contractSource rf@0.1.583 context.render --no-commit). Tests: test/workbench-native-rf-preview.test.ts, test/workbench-provider-envelope-audit.test.ts, test/workbench-ecosystem-native.test.ts, test/workbench-native-ecosystem.test.ts, test/workbench-provider-lifecycle.test.ts. TRACEABILITY 'Native ecosystem receipts': real RF noncommitted context cmd_994da817d4cd (initialized disposable workspace; output + graph provenance, no durable render ID); custody caps cmd_7e50a487da08 (malformed JSON, stdout/stderr caps, TERM/KILL cleanup); corrected envelope suite cmd_386a32a0323b (actual operation/workspace identity, zero noncommitted storage writes). Bead wb-x32 (open). | Bead wb-x32 open: 'Full interop contract remains open.' Preview deliberately yields null render/transaction IDs (no durable render); W10 acceptance is 'real render or honest blocker' - the landed slice is the noncommitted preview via the CLI envelope, not a committed render or production TS SDK interop. |";

type ReadReceipt = (name: string) => string | undefined;

function carrierRelease(carrier: string): string | undefined {
  return /^rf@([0-9]+(?:\.[0-9]+)*):/.exec(carrier)?.[1];
}

/** The release the NEWEST stamped line of a receipt file recorded (receipts are append-only: the newest line is the row of record). */
function stampedRelease(receiptText: string): string | undefined {
  const last = [...receiptText.matchAll(STAMP_LINE_ALL)].at(-1)?.[1];
  if (last === undefined) return undefined;
  let parsed: unknown;
  try {
    parsed = JSON.parse(last);
  } catch {
    return undefined;
  }
  if (parsed === null || typeof parsed !== "object") return undefined;
  const release = (parsed as { cli_version?: unknown }).cli_version;
  return typeof release === "string" && release !== "" ? release : undefined;
}

/** Every reason the W10 claim row fails the stamped-release rule; empty means the row is stamped and consistent with the carrier. */
function judgeW10Claim(row: string, readReceipt: ReadReceipt, carrier: string): string[] {
  const findings: string[] = [];
  const carried = carrierRelease(carrier);
  if (carried === undefined) findings.push(`carrier ${JSON.stringify(carrier)} is not rf@<release>:<schema>`);
  const cited = [...new Set([...row.matchAll(RECEIPT_PATH_ALL)].map(match => match[1] ?? ""))];
  if (cited.length === 0) findings.push("row cites no receipts/<bead>.md receipt file");
  const rowIds = new Set(row.match(CMD_ID_ALL) ?? []);
  let stamped = false;
  for (const name of cited) {
    const text = readReceipt(name);
    if (text === undefined) {
      findings.push(`row cites receipts/${name}.md but that receipt file does not exist`);
      continue;
    }
    const release = stampedRelease(text);
    if (release === undefined) {
      findings.push(`receipts/${name}.md carries no RF_PREVIEW_RECEIPT line with a string cli_version`);
      continue;
    }
    if (release !== carried) {
      findings.push(`receipts/${name}.md stamped release ${release} differs from the carrier release ${carried ?? "(none)"}`);
      continue;
    }
    const fileIds = new Set(text.match(CMD_ID_ALL) ?? []);
    const shared = [...rowIds].filter(id => fileIds.has(id) && !LEGACY_UNSTAMPED_IDS.includes(id));
    if (shared.length === 0) {
      findings.push(`row names no cmd_* receipt id that receipts/${name}.md carries (legacy unstamped ids do not count)`);
      continue;
    }
    if (!row.includes(`measured release ${release}`)) {
      findings.push(`row does not state "measured release ${release}" beside the stamped receipt`);
      continue;
    }
    stamped = true;
  }
  if (!stamped) findings.push("row cites no receipt row stamped with the measured release that matches the carrier");
  for (const id of LEGACY_UNSTAMPED_IDS) {
    if (!row.includes(id)) findings.push(`historical receipt id ${id} was edited out of the row (new receipts are added, history is never rewritten)`);
  }
  const outsideRetirement = row.replace(RETIREMENT_CLAUSE_ALL, "");
  for (const match of outsideRetirement.matchAll(RELEASE_TOKEN_ALL)) {
    if (match[1] !== carried) findings.push(`row names rf@${match[1] ?? ""} outside the retirement clause; only the carrier release ${carried ?? "(none)"} may stand`);
  }
  return findings;
}

function readText(rel: string): string {
  return readFileSync(join(ROOT, rel), "utf8");
}

function liveReceipt(name: string): string | undefined {
  const rel = `docs/workbench/receipts/${name}.md`;
  return existsSync(join(ROOT, rel)) ? readText(rel) : undefined;
}

function liveRows(): string[] {
  return readText(MATRIX)
    .split("\n")
    .filter(line => line.startsWith(ROW_PREFIX) && line.includes(CAPABILITY_TOKEN));
}

function liveRow(): string {
  const rows = liveRows();
  expect(rows, "exactly one W10 preview-capability claim row in feature-matrix.md").toHaveLength(1);
  return rows[0] ?? "";
}

describe("W10 stamped-release claim guard (wb-2j3.5, R6)", () => {
  it("L1: the live W10 row cites a receipt row stamped with the measured release, and that release matches the R2 carrier", () => {
    expect(judgeW10Claim(liveRow(), liveReceipt, REACTIVE_FIBER_CONTRACT_SOURCE)).toEqual([]);
  });

  it("L2: the stamped receipt the row cites is listed in the receipts INDEX (the one-line append convention)", () => {
    const names = [...liveRow().matchAll(RECEIPT_PATH_ALL)].map(match => match[1] ?? "");
    expect(names.length).toBeGreaterThan(0);
    const index = readText(INDEX);
    for (const name of names) expect(index, `INDEX.md links ${name}.md`).toContain(`](${name}.md)`);
  });

  it("L3: the row text carries the measured release as a whole token the receipt file also records", () => {
    const row = liveRow();
    const release = carrierRelease(REACTIVE_FIBER_CONTRACT_SOURCE);
    expect(release).toBeDefined();
    expect(row).toContain(`measured release ${release ?? ""}`);
    expect(row).toContain(`rf@${release ?? ""}:`);
  });

  describe("falsifiers: each named mutant must be judged unstamped (the guard fails while the claim is weakened)", () => {
    const row = (): string => liveRow();
    const carrier = REACTIVE_FIBER_CONTRACT_SOURCE;
    const release = carrierRelease(carrier) ?? "";
    const stampedSentence = /\s*Stamped receipt row \(R6\/R8, 2026-10-17\):[^|]*?\(wb-2j3\.12\)\./;

    it("F1 (acceptance 1): the row as it read at 9df9a03, three unstamped 0.1.583-era receipts and no stamped one, FAILS", () => {
      const findings = judgeW10Claim(ROW_AT_9DF9A03, liveReceipt, carrier);
      expect(findings.length).toBeGreaterThan(0);
      expect(findings.join("\n")).toContain("cites no receipts/<bead>.md receipt file");
      expect(findings.join("\n")).toContain("row names rf@0.1.583 outside the retirement clause");
    });

    it("F2: the stamped sentence removed from the live row (only the legacy ids remain) FAILS", () => {
      const text = row();
      expect(text).toMatch(stampedSentence);
      const findings = judgeW10Claim(text.replace(stampedSentence, ""), liveReceipt, carrier);
      expect(findings.join("\n")).toContain("cites no receipt row stamped with the measured release");
    });

    it("F3: the row states a different measured release (0.1.716) than the receipt and carrier stamp FAILS", () => {
      const findings = judgeW10Claim(row().replaceAll(`measured release ${release}`, "measured release 0.1.716"), liveReceipt, carrier);
      expect(findings.join("\n")).toContain(`does not state "measured release ${release}"`);
    });

    it("F4: the row names a cmd_* id the receipt file does not carry FAILS", () => {
      const findings = judgeW10Claim(row().replaceAll("cmd_c8fa1da3d9c4", "cmd_000000000000"), liveReceipt, carrier);
      expect(findings.join("\n")).toContain("names no cmd_* receipt id");
    });

    it("F5: the only shared receipt id is a legacy unstamped one (stamp id swapped for cmd_994da817d4cd in both row and receipt) FAILS", () => {
      const swapped: ReadReceipt = name => liveReceipt(name)?.replaceAll("cmd_c8fa1da3d9c4", "cmd_994da817d4cd");
      const findings = judgeW10Claim(row().replaceAll("cmd_c8fa1da3d9c4", "cmd_994da817d4cd"), swapped, carrier);
      expect(findings.join("\n")).toContain("legacy unstamped ids do not count");
    });

    it("F6: the cited receipt file carries no RF_PREVIEW_RECEIPT stamp line FAILS", () => {
      const stripped: ReadReceipt = name => liveReceipt(name)?.replaceAll("RF_PREVIEW_RECEIPT", "RF_PREVIEW_NOTE");
      expect(judgeW10Claim(row(), stripped, carrier).join("\n")).toContain("carries no RF_PREVIEW_RECEIPT line");
    });

    it("F7: the receipt stamp has no string cli_version (numeric, empty, or unparsable JSON) FAILS", () => {
      for (const replacement of ['"cli_version":0.1', '"cli_version":""', "RF_PREVIEW_RECEIPT {not json"]) {
        const broken: ReadReceipt = name => {
          const text = liveReceipt(name);
          if (text === undefined) return undefined;
          return replacement.startsWith("RF_PREVIEW_RECEIPT") ? text.replace(/RF_PREVIEW_RECEIPT \{/, replacement) : text.replace(`"cli_version":"${release}"`, replacement);
        };
        expect(judgeW10Claim(row(), broken, carrier).join("\n"), replacement).toContain("carries no RF_PREVIEW_RECEIPT line");
      }
    });

    it("F8: the newest stamped line of the receipt disagrees with the carrier (older line matches, newest does not) FAILS", () => {
      const appended: ReadReceipt = name => {
        const text = liveReceipt(name);
        return text === undefined ? undefined : `${text}\nRF_PREVIEW_RECEIPT {"cli_version":"0.1.583"}\n`;
      };
      expect(judgeW10Claim(row(), appended, carrier).join("\n")).toContain("differs from the carrier release");
    });

    it("F9: the carrier is re-pinned away from the stamped release FAILS", () => {
      const findings = judgeW10Claim(row(), liveReceipt, "rf@0.1.583:reactive-fiber.cli/v1 context.render --no-commit");
      expect(findings.join("\n")).toContain("differs from the carrier release 0.1.583");
    });

    it("F10: a carrier that is not rf@<release>:<schema> FAILS", () => {
      expect(judgeW10Claim(row(), liveReceipt, "rf-latest").join("\n")).toContain("is not rf@<release>:<schema>");
    });

    it("F11: the cited receipt file is missing FAILS", () => {
      expect(judgeW10Claim(row(), () => undefined, carrier).join("\n")).toContain("receipt file does not exist");
    });

    it("F12: a legacy unstamped receipt id is edited out of the row (history rewritten) FAILS", () => {
      for (const id of LEGACY_UNSTAMPED_IDS) {
        expect(judgeW10Claim(row().replaceAll(id, "cmd_ffffffffffff"), liveReceipt, carrier).join("\n"), id).toContain(`historical receipt id ${id} was edited out`);
      }
    });

    it("F13: a stale rf@ literal re-enters the row outside the retirement clause FAILS, while the retirement clause itself is tolerated", () => {
      expect(judgeW10Claim(`${row()} contractSource rf@0.1.583 context.render`, liveReceipt, carrier).join("\n")).toContain("outside the retirement clause");
      expect(judgeW10Claim(row(), liveReceipt, carrier)).toEqual([]);
    });

    it("F14: the stale literal the retirement clause quotes is itself changed to a non-clause form FAILS", () => {
      const findings = judgeW10Claim(row().replace("the earlier rf@0.1.583 literal is retired", "the earlier rf@0.1.583 literal is kept"), liveReceipt, carrier);
      expect(findings.join("\n")).toContain("outside the retirement clause");
    });
  });
});
