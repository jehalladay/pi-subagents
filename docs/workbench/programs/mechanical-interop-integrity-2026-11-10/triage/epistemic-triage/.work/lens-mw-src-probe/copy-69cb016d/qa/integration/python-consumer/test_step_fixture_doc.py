"""Doc check for the opt-in step-level fixture boundary criterion (TW-EAT-R014, MechanicalWorkflows-9om3).

The TrainingWorks program README must state the boundary criterion that distinguishes the step fixture from a
general RL gym — step surfaces exist only over sources with real step semantics, and no generic environment
registry, reward engine or scheduler is introduced — and the criterion must appear verbatim in the module's
refusal text, so the doc and the code cite one law. Read-only; imports nothing from the implementation.
"""
from __future__ import annotations

import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
README = ROOT / "docs" / "programs" / "trainingworks-2026-10-18" / "README.md"
MODULE = ROOT / "packages" / "coordination" / "src" / "step-fixture.ts"

CRITERION = "step surfaces exist only over sources with real step semantics"
NON_GOAL = "no generic environment registry, reward engine or scheduler is introduced"


class StepFixtureDocTests(unittest.TestCase):
    def setUp(self) -> None:
        self.readme = README.read_text(encoding="utf-8")
        self.module = MODULE.read_text(encoding="utf-8")

    def test_readme_states_the_boundary_criterion(self) -> None:
        self.assertIn(CRITERION, self.readme)
        self.assertIn(NON_GOAL, self.readme)
        self.assertTrue(re.search(r"not\*{0,2} a general RL gym", self.readme))

    def test_module_refusal_cites_the_same_criterion(self) -> None:
        self.assertIn("STEP_SEMANTICS_UNSUPPORTED", self.module)
        self.assertIn(CRITERION, self.module)

    def test_fixture_evidence_never_advertises_native_pass(self) -> None:
        self.assertIn("STEP_VERIFY_LABEL_FORBIDDEN", self.module)
        self.assertNotIn('"live-verified"', self.module.replace("STEP_VERIFY_LABEL_FORBIDDEN", ""))


if __name__ == "__main__":
    unittest.main()
