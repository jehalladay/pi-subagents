"""Independent Python consumer of the exported mw.evaluation.fixture.v1 report (collective-adaptation M3, slice B).

The TypeScript harness evaluates configurations on a hold-out seed split under one shared budget and pins the bytes
under `fixtures/evaluation-holdout-split.json`. This leg re-reads the same bytes in Python, without importing the
TypeScript implementation: it re-hashes the report to its own digest, recomputes the partition hash and each fixed
configuration hash, re-derives the uplift rule from every interval, recomputes the continuity arithmetic, and checks
that the report is a labelled fixture made of integers only.
"""
from __future__ import annotations

import json
import math
import re
import unittest
from fractions import Fraction
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURE = Path(__file__).parent / "fixtures" / "evaluation-holdout-split.json"
HASH = re.compile(r"^sha256:[0-9a-f]{64}$")
ENVIRONMENTS = ["landing-queue", "compaction-inheritance", "colony-resilience", "artifact-recovery", "quorum-evidence"]
MICRO = 1_000_000


def js_round(value: Fraction) -> int:
    """Math.round: halves go toward positive infinity."""
    return math.floor(value + Fraction(1, 2))


def only_integers(value: object) -> bool:
    if isinstance(value, bool) or value is None:
        return not (value is None)
    if isinstance(value, float):
        return False
    if isinstance(value, list):
        return all(only_integers(member) for member in value)
    if isinstance(value, dict):
        return all(only_integers(member) for member in value.values())
    return True


class EvaluationFixtureTests(unittest.TestCase):
    def setUp(self) -> None:
        self.raw = FIXTURE.read_text(encoding="utf-8")
        self.report = json.loads(self.raw)

    def test_committed_bytes_are_the_canonical_form_with_one_final_newline(self) -> None:
        self.assertEqual(self.raw, canonical_json(self.report) + "\n")

    def test_report_is_a_labelled_fixture_made_of_integers_with_no_null(self) -> None:
        self.assertEqual(self.report["schema"], "mw.evaluation.fixture.v1")
        self.assertEqual(self.report["mode"], "fixture")
        self.assertTrue(only_integers(self.report), "a float or a null reached the report")

    def test_report_digest_covers_everything_but_itself(self) -> None:
        body = {key: value for key, value in self.report.items() if key != "reportDigest"}
        self.assertRegex(self.report["reportDigest"], HASH)
        self.assertEqual(self.report["reportDigest"], digest(body))

    def test_partition_is_disjoint_and_its_hash_recomputes(self) -> None:
        partition = self.report["partition"]
        self.assertEqual(set(partition["train"]) & set(partition["holdOut"]), set())
        self.assertTrue(partition["holdOut"])
        self.assertEqual(partition["hash"], digest({"train": partition["train"], "holdOut": partition["holdOut"]}))
        for configuration in self.report["configurations"]:
            for environment in configuration["environments"]:
                self.assertEqual(environment["seeds"], partition["holdOut"])

    def test_fixed_configuration_hashes_recompute_from_their_policies(self) -> None:
        for configuration in self.report["configurations"]:
            self.assertEqual(configuration["kind"], "fixed")
            expected = digest({"id": configuration["id"], "revision": configuration["revision"], "kind": "fixed", "policies": configuration["policies"]})
            self.assertEqual(configuration["configHash"], expected)
            self.assertEqual([environment["environment"] for environment in configuration["environments"]], ENVIRONMENTS)

    def test_uplift_rule_holds_for_every_interval(self) -> None:
        reference = self.report["configurations"][0]["id"]
        self.assertTrue(self.report["comparisons"])
        for row in self.report["comparisons"]:
            self.assertEqual(row["reference"], reference)
            self.assertNotEqual(row["versus"], reference)
            self.assertLessEqual(row["ciLowMicro"], row["ciHighMicro"])
            claims = [name for name in ("uplift", "deficit", "upliftWithheld") if name in row]
            self.assertEqual(len(claims), 1, row)
            if row["n"] < 2:
                self.assertEqual(row["upliftWithheld"], "SINGLE_SEED")
            elif row["ciLowMicro"] > 0:
                self.assertEqual(row["uplift"], row["deltaMicro"])
            elif row["ciHighMicro"] < 0:
                self.assertEqual(row["deficit"], row["deltaMicro"])
            else:
                self.assertEqual(row["upliftWithheld"], "INTERVAL_CONTAINS_ZERO")

    def test_completion_groups_partition_the_seeds_and_intervals_bracket_the_mean(self) -> None:
        seeds = len(self.report["partition"]["holdOut"])
        for configuration in self.report["configurations"]:
            for environment in configuration["environments"]:
                groups = environment["groups"]
                self.assertEqual(groups["allSuccess"] + groups["allFail"] + groups["mixed"], seeds)
                completion = environment["validatedCompletion"]
                self.assertLessEqual(completion["ciLowMicro"], completion["ciHighMicro"])
                self.assertTrue(0 <= completion["meanMicro"] <= MICRO)
                self.assertEqual(environment["overBudget"], 0)

    def test_correlation_adjusted_calibration_is_a_quorum_only_micro_unit_or_unknown(self) -> None:
        for configuration in self.report["configurations"]:
            for environment in configuration["environments"]:
                metrics = environment["metrics"]
                if environment["environment"] != "quorum-evidence":
                    self.assertNotIn("correlationAdjustedCalibration", metrics)
                    continue
                value = metrics["correlationAdjustedCalibration"]
                # Unknown literal when no seed committed; otherwise one minus a mean gap that lies in [0, 1].
                self.assertTrue(value == "unknown" or (isinstance(value, int) and 0 <= value <= MICRO), value)

    def test_continuity_arithmetic_recomputes(self) -> None:
        for result in self.report["continuity"]:
            rows = result["seeds"]
            self.assertEqual([row["seed"] for row in rows], self.report["partition"]["holdOut"])
            for row in rows:
                self.assertEqual(row["treatmentMinusControlSteps"], row["treatmentSteps"] - row["controlSteps"])
                self.assertEqual(row["carriedFrom"], "a1")
                self.assertNotEqual(row["laterSeed"], row["seed"])
                self.assertIn(row["laterSeed"], self.report["partition"]["holdOut"])
                self.assertRegex(row["artifactDigest"], HASH)
            self.assertEqual(result["consumed"], len([row for row in rows if row["consumedBy"] != "none"]))
            mean = js_round(Fraction(sum(row["treatmentMinusControlSteps"] * MICRO for row in rows), len(rows)))
            self.assertEqual(result["meanTreatmentMinusControlStepsMicro"], mean)

    def test_the_checked_configuration_beats_the_baseline_on_aggregate_completion(self) -> None:
        baseline, checked = self.report["configurations"]
        self.assertGreater(checked["aggregateCompletionMicro"], baseline["aggregateCompletionMicro"])
        aggregate = [row for row in self.report["comparisons"] if row["environment"] == "aggregate"]
        self.assertEqual(len(aggregate), 1)
        # The delta rounds once over per-seed differences, the two means round separately: they may differ by one micro-unit.
        self.assertLessEqual(abs(aggregate[0]["deltaMicro"] - (checked["aggregateCompletionMicro"] - baseline["aggregateCompletionMicro"])), 1)


if __name__ == "__main__":
    unittest.main()
