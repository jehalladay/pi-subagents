"""Independent Python consumer of the per-actor credit fixture (GPC invariant: per-actor benefit derives from an intervention or counterfactual, never from a global team outcome alone).

Re-reads the committed `credit-landing-queue-seed7.json` without importing the TypeScript implementation: the bytes
are canonical, the digest recomputes, every credit row carries an intervention or counterfactual reference and an
actor some step names, and the uncredited sibling fixture carries no credit at all.
"""
from __future__ import annotations

import json
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURES = Path(__file__).parent / "fixtures"
CREDIT = FIXTURES / "credit-landing-queue-seed7.json"
BASE = FIXTURES / "training-landing-queue-seed7.json"
KINDS = {"intervention", "counterfactual"}


class TrainingCreditFixture(unittest.TestCase):
    def read(self, path: Path) -> dict:
        return json.loads(path.read_text())

    def test_bytes_are_canonical_and_digest_recomputes(self) -> None:
        raw = CREDIT.read_text()
        self.assertTrue(raw.endswith("\n"))
        record = json.loads(raw)
        self.assertEqual(canonical_json(record) + "\n", raw)
        body = {key: value for key, value in record.items() if key != "digest"}
        self.assertEqual(record["digest"], digest(body))

    def test_every_credit_derives_from_an_intervention_or_counterfactual(self) -> None:
        record = self.read(CREDIT)
        credits = record["credits"]
        self.assertGreaterEqual(len(credits), 1)
        actors = {step["actorId"] for step in record["steps"] if step["actorId"] != "unknown"}
        for row in credits:
            derivation = row["derivation"]
            self.assertIn(derivation["kind"], KINDS)
            self.assertIsInstance(derivation["reference"], str)
            self.assertGreater(len(derivation["reference"]), 0)
            self.assertIsInstance(row["valueMicro"], int)
            self.assertNotIsInstance(row["valueMicro"], bool)
            self.assertIn(row["actorId"], actors)

    def test_no_per_actor_credit_without_an_intervention_reference(self) -> None:
        base = self.read(BASE)
        self.assertNotIn("credits", base)
        self.assertNotIn("credits", BASE.read_text())

    def test_values_are_exact_safe_integers_and_no_secret_shape_survives(self) -> None:
        raw = CREDIT.read_text()
        record = json.loads(raw)
        for row in record["credits"]:
            self.assertIsInstance(row["valueMicro"], int)
            self.assertLessEqual(abs(row["valueMicro"]), 2**53 - 1)
        self.assertNotRegex(raw, r"sk-[A-Za-z0-9]{20,}")

    def test_credit_fixture_differs_from_base_only_in_credits_and_digest(self) -> None:
        credit = self.read(CREDIT)
        base = self.read(BASE)
        stripped = {key: value for key, value in credit.items() if key not in ("credits", "digest")}
        base_body = {key: value for key, value in base.items() if key != "digest"}
        self.assertEqual(stripped, base_body)
        self.assertNotEqual(credit["digest"], base["digest"])


if __name__ == "__main__":
    unittest.main()
