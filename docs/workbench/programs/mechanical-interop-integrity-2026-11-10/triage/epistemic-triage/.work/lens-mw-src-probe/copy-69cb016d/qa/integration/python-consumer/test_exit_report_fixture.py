"""Independent Python consumer of the exported mw.exit-report.v1 record (collective-adaptation M3, slice C).

The TypeScript generator `exportExitReport` turns declared inputs into one canonical, digest-pinned record that carries
every field of the 05 exit report template and pins the bytes under `fixtures/exit-report-fixture-only.json`. This leg
re-reads those bytes in Python, without importing the TypeScript implementation: it re-hashes the record to its own
digest, re-derives the report mode as the lowest label present (a fixture is never raised), re-derives the milestone
status and reasons, cross-checks the embedded evaluation summary against the pinned evaluation fixture, and checks that
every absent value is the literal "unknown" in a record made of integers only.
"""
from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURES = Path(__file__).parent / "fixtures"
FIXTURE = FIXTURES / "exit-report-fixture-only.json"
EVALUATION = FIXTURES / "evaluation-holdout-split.json"
COMMIT = re.compile(r"[0-9a-f]{40}")
HASH = re.compile(r"^sha256:[0-9a-f]{64}$")
UNKNOWN = "unknown"
NO_COMMIT_RISK = "no commit provenance backs a fixture-only record: the commit is unknown"
RANK = {"fixture": 0, "replay": 1, "live": 2}
FIELDS = [
    "authorityCheck", "commit", "evaluation", "evidence", "failedCases", "liveWitness", "milestone", "mode", "models",
    "nativeRevisions", "profiler", "reportDigest", "residualRisks", "scenarios", "schema",
]


def only_integers(value: object) -> bool:
    if value is None or isinstance(value, float):
        return False
    if isinstance(value, list):
        return all(only_integers(member) for member in value)
    if isinstance(value, dict):
        return all(only_integers(member) for member in value.values())
    return True


def check_commit_rule(case: unittest.TestCase, report: dict) -> None:
    """A fixture record declares its commit unknown and says why; a replay or live record carries a 40-hex commit."""
    if report["mode"] == "fixture":
        case.assertEqual(report["commit"], UNKNOWN)
        case.assertIn(NO_COMMIT_RISK, report["residualRisks"])
    else:
        case.assertIsNotNone(COMMIT.fullmatch(report["commit"]), f"commit {report['commit']!r} is not exactly 40 lowercase hex")


class ExitReportFixtureTests(unittest.TestCase):
    def setUp(self) -> None:
        self.raw = FIXTURE.read_text(encoding="utf-8")
        self.report = json.loads(self.raw)
        self.evaluation = json.loads(EVALUATION.read_text(encoding="utf-8"))

    def test_committed_bytes_are_the_canonical_form_with_one_final_newline(self) -> None:
        self.assertEqual(self.raw, canonical_json(self.report) + "\n")

    def test_record_carries_every_template_field_made_of_integers_with_no_null(self) -> None:
        self.assertEqual(self.report["schema"], "mw.exit-report.v1")
        self.assertEqual(sorted(self.report), FIELDS)
        self.assertTrue(only_integers(self.report), "a float or a null reached the record")

    def test_report_digest_covers_everything_but_itself(self) -> None:
        body = {key: value for key, value in self.report.items() if key != "reportDigest"}
        self.assertRegex(self.report["reportDigest"], HASH)
        self.assertEqual(self.report["reportDigest"], digest(body))

    def test_absent_values_are_the_unknown_literal_never_omitted(self) -> None:
        self.assertEqual(self.report["profiler"], UNKNOWN)
        for model in self.report["models"]:
            self.assertIn("checkpoint", model)
            self.assertEqual(model["checkpoint"], UNKNOWN)
        self.assertEqual(self.report["liveWitness"], {"available": False, "reference": UNKNOWN})
        self.assertEqual(self.report["authorityCheck"], {"available": False, "reference": UNKNOWN})

    def test_commit_is_unknown_for_a_fixture_record_and_forty_hex_for_replay_or_live(self) -> None:
        self.assertEqual(self.report["mode"], "fixture")
        check_commit_rule(self, self.report)

    def test_commit_rule_accepts_a_forty_hex_commit_for_a_replay_or_live_record(self) -> None:
        for mode in ("replay", "live"):
            check_commit_rule(self, {"mode": mode, "commit": "0123456789abcdef0123456789abcdef01234567", "residualRisks": []})

    def test_commit_rule_refuses_the_unknown_literal_or_a_malformed_commit_for_a_replay_or_live_record(self) -> None:
        for mode in ("replay", "live"):
            for commit in (
                UNKNOWN,
                "0123456789abcdef0123456789abcdef0123456",
                "0123456789ABCDEF0123456789ABCDEF01234567",
                "",
                "0123456789abcdef0123456789abcdef01234567\n",
                "0123456789abcdef0123456789abcdef012345678",
                " 0123456789abcdef0123456789abcdef01234567",
                "\u0660123456789abcdef0123456789abcdef01234567",
                "0x0123456789abcdef0123456789abcdef012345",
                "0123456789abcdef0123456789abcdef0123456g",
                "+0123456789abcdef0123456789abcdef0123456",
            ):
                with self.assertRaises(AssertionError, msg=f"{mode} accepted commit {commit!r}"):
                    check_commit_rule(self, {"mode": mode, "commit": commit, "residualRisks": []})

    def test_commit_rule_refuses_a_forty_hex_commit_or_a_missing_risk_for_a_fixture_record(self) -> None:
        with self.assertRaises(AssertionError):
            check_commit_rule(self, {"mode": "fixture", "commit": "0123456789abcdef0123456789abcdef01234567", "residualRisks": [NO_COMMIT_RISK]})
        with self.assertRaises(AssertionError):
            check_commit_rule(self, {"mode": "fixture", "commit": UNKNOWN, "residualRisks": []})

    def test_mode_is_the_lowest_label_present_and_never_raised(self) -> None:
        modes = [row["mode"] for row in self.report["evidence"]] + [self.report["evaluation"]["mode"]]
        for mode in modes:
            self.assertIn(mode, RANK)
        self.assertEqual(self.report["mode"], min(modes, key=lambda mode: RANK[mode]))
        self.assertEqual(self.report["mode"], "fixture")

    def test_milestone_status_and_reasons_rederive_from_the_record(self) -> None:
        reasons = []
        if self.report["authorityCheck"] == UNKNOWN or not self.report["authorityCheck"]["available"]:
            reasons.append("AUTHORITY_CHECK_UNAVAILABLE")
        if self.report["evidence"] == UNKNOWN:
            reasons.append("EVIDENCE_UNKNOWN")
        if self.report["liveWitness"] == UNKNOWN or not self.report["liveWitness"]["available"]:
            reasons.append("LIVE_WITNESS_UNAVAILABLE")
        if self.report["mode"] != "live":
            reasons.append("MODE_NOT_LIVE")
        self.assertEqual(self.report["milestone"]["reasons"], reasons)
        self.assertEqual(self.report["milestone"]["status"], "incomplete" if reasons else "complete")
        self.assertEqual(self.report["milestone"]["status"], "incomplete", "a fixture-only record can never be a complete milestone")

    def test_embedded_evaluation_matches_the_pinned_evaluation_fixture(self) -> None:
        summary = self.report["evaluation"]
        self.assertEqual(summary["reportDigest"], self.evaluation["reportDigest"])
        self.assertEqual(summary["partitionHash"], self.evaluation["partition"]["hash"])
        self.assertEqual(summary["mode"], self.evaluation["mode"])
        self.assertEqual(summary["comparisons"], self.evaluation["comparisons"])
        self.assertEqual(
            summary["configurations"],
            [{key: configuration[key] for key in ("aggregateCompletionMicro", "configHash", "id", "kind", "revision")} for configuration in self.evaluation["configurations"]],
        )
        for row in summary["comparisons"]:
            self.assertLessEqual(row["ciLowMicro"], row["ciHighMicro"])

    def test_scenario_seeds_are_the_evaluation_hold_out_and_evidence_names_its_receipts(self) -> None:
        self.assertEqual(self.report["scenarios"][0]["seeds"], self.evaluation["partition"]["holdOut"])
        ids = [scenario["id"] for scenario in self.report["scenarios"]]
        self.assertEqual(len(ids), len(set(ids)))
        for row in self.report["evidence"]:
            self.assertTrue(isinstance(row["observed"], str) and row["observed"], row)
            self.assertTrue(row["receiptIds"], row)


if __name__ == "__main__":
    unittest.main()
