"""Independent Python consumer of the exported mw.evaluation.v1 mixed-mode report (collective-adaptation CA-R4).

The TypeScript harness scores batches of mode-labelled mw.episode.v1 episodes under one budget and a pinned
agent/version/seed, and pins the bytes under `fixtures/evaluation-mixed-mode.json`. This leg re-reads the bytes in
Python, without importing the TypeScript implementation: it re-hashes the report, recomputes every per-mode block and
every comparison from the per-episode refs, re-checks that the batches are matched, that the modes are a closed set,
that nothing certifies and that the report is integers only. A live-labelled episode in the pinned fixture is a test
construct: the harness trusts each episode's own mode and certifies nothing in any mode.
"""
from __future__ import annotations

import json
import math
import re
import unittest
from fractions import Fraction
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURE = Path(__file__).parent / "fixtures" / "evaluation-mixed-mode.json"
HASH = re.compile(r"^sha256:[0-9a-f]{64}$")
MODES = ["fixture", "replay", "live"]
MICRO = 1_000_000


def js_round(value: Fraction) -> int:
    """Math.round: halves go toward positive infinity."""
    return math.floor(value + Fraction(1, 2))


def mean_micro(values: list[int]) -> int:
    return js_round(Fraction(sum(values), max(1, len(values))))


def only_integers(value: object) -> bool:
    if value is None or isinstance(value, float):
        return False
    if isinstance(value, list):
        return all(only_integers(member) for member in value)
    if isinstance(value, dict):
        return all(only_integers(member) for member in value.values())
    return True


class EvaluationMixedModeTests(unittest.TestCase):
    def setUp(self) -> None:
        self.raw = FIXTURE.read_text(encoding="utf-8")
        self.report = json.loads(self.raw)

    def test_committed_bytes_are_the_canonical_form_with_one_final_newline(self) -> None:
        self.assertEqual(self.raw, canonical_json(self.report) + "\n")

    def test_report_is_integers_only_with_the_closed_mode_set_and_nothing_certifies(self) -> None:
        self.assertEqual(self.report["schema"], "mw.evaluation.v1")
        self.assertTrue(only_integers(self.report), "a float or a null reached the report")
        self.assertIs(self.report["certified"], False)
        self.assertEqual(self.report["modes"], MODES)
        for batch in self.report["batches"]:
            for block in batch["modes"]:
                self.assertIs(block["certified"], False)
        for row in self.report["comparisons"]:
            self.assertIs(row["certified"], False)

    def test_report_digest_covers_everything_but_itself(self) -> None:
        body = {key: value for key, value in self.report.items() if key != "reportDigest"}
        self.assertRegex(self.report["reportDigest"], HASH)
        self.assertEqual(self.report["reportDigest"], digest(body))

    def test_batches_are_matched_on_family_modes_budget_and_pin(self) -> None:
        reference, *others = self.report["batches"]
        self.assertTrue(others)
        for batch in others:
            self.assertEqual(batch["families"], reference["families"])
            self.assertEqual([block["mode"] for block in batch["modes"]], [block["mode"] for block in reference["modes"]])
            self.assertEqual(batch["budget"], reference["budget"])
            self.assertEqual(batch["pin"], reference["pin"])
            self.assertRegex(batch["configHash"], HASH)

    def test_mode_blocks_recompute_from_the_per_episode_refs(self) -> None:
        for batch in self.report["batches"]:
            budget = batch["budget"]
            for ref in batch["episodes"]:
                within = ref["steps"] <= budget["steps"] and ref["compute"] <= budget["units"]
                self.assertEqual(ref["withinBudget"], 1 if within else 0)
                self.assertIn(ref["mode"], MODES)
            self.assertEqual(batch["families"], sorted({ref["family"] for ref in batch["episodes"]}))
            for block in batch["modes"]:
                own = [ref for ref in batch["episodes"] if ref["mode"] == block["mode"]]
                self.assertEqual(block["n"], len(own))
                self.assertEqual(block["withinBudgetMicro"], mean_micro([ref["withinBudget"] * MICRO for ref in own]))
                self.assertEqual(block["meanStepsMicro"], mean_micro([ref["steps"] * MICRO for ref in own]))
                self.assertEqual(block["meanComputeMicro"], mean_micro([ref["compute"] * MICRO for ref in own]))
                steps = sorted(ref["steps"] for ref in own)
                self.assertEqual(block["p95Steps"], steps[max(0, math.ceil(0.95 * len(steps)) - 1)])
            self.assertEqual(sum(block["n"] for block in batch["modes"]), len(batch["episodes"]))

    def test_comparisons_recompute_per_mode_against_the_first_batch(self) -> None:
        reference, *others = self.report["batches"]
        expected = []
        for batch in others:
            for block in reference["modes"]:
                twin = next(candidate for candidate in batch["modes"] if candidate["mode"] == block["mode"])
                expected.append({
                    "reference": reference["id"], "versus": batch["id"], "mode": block["mode"], "nReference": block["n"], "nVersus": twin["n"],
                    "deltaWithinBudgetMicro": twin["withinBudgetMicro"] - block["withinBudgetMicro"],
                    "deltaMeanStepsMicro": twin["meanStepsMicro"] - block["meanStepsMicro"], "certified": False,
                })
        self.assertEqual(self.report["comparisons"], expected)
        self.assertTrue(any(row["deltaWithinBudgetMicro"] != 0 for row in expected), "the pinned fixture must separate the batches")


if __name__ == "__main__":
    unittest.main()
