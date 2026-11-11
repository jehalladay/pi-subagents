"""Independent Python consumer of the committed mw.coordination-decision.v1 sidecar fixture (GPC-EAT-R008, MechanicalWorkflows-rjmg).

`fixtures/coordination-decisions-landing-queue-seed7.json` holds one fixture-mode sidecar record per decision of the
seed-7 landing-queue decision tape plus the digest of the record list. This leg re-reads the file, recomputes that
digest, pins every record's member set to the committed JSON Schema, and asserts the feedback law without importing
the TypeScript implementation: status is the closed enum {unknown, pending, final}, a numeric reward appears only on
a final record (every other record carries the literal 'unknown'), and no fixture record is labelled replay or live.
"""
from __future__ import annotations

import json
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

HERE = Path(__file__).resolve().parent
FIXTURES = HERE / "fixtures"
SCHEMA = HERE.parents[2] / "packages" / "coordination" / "schema" / "coordination-decision.v1.schema.json"
STATUSES = {"unknown", "pending", "final"}


def contains_null(value: object) -> bool:
    if value is None:
        return True
    if isinstance(value, list):
        return any(contains_null(member) for member in value)
    if isinstance(value, dict):
        return any(contains_null(member) for member in value.values())
    return False


class CoordinationDecisionFixtureTests(unittest.TestCase):
    def setUp(self) -> None:
        self.raw = (FIXTURES / "coordination-decisions-landing-queue-seed7.json").read_text(encoding="utf-8")
        self.fixture = json.loads(self.raw)
        self.decisions = self.fixture["decisions"]
        self.tape = json.loads((FIXTURES / "decision-tape-landing-queue-seed7.json").read_text(encoding="utf-8"))
        self.schema = json.loads(SCHEMA.read_text(encoding="utf-8"))

    def test_committed_bytes_are_the_canonical_form_with_one_final_newline(self) -> None:
        self.assertEqual(self.raw, canonical_json(self.fixture) + "\n")

    def test_digest_recomputes_over_the_record_list(self) -> None:
        self.assertEqual(self.fixture["digest"], digest(self.decisions))
        altered = json.loads(self.raw)["decisions"]
        altered[0]["feedback"]["status"] = "final"
        self.assertNotEqual(digest(altered), self.fixture["digest"])

    def test_every_record_matches_the_schema_required_set_and_its_closed_enums(self) -> None:
        required = set(self.schema["required"])
        self.assertIn("feedback", required)
        self.assertIn("mode", required)
        self.assertEqual(set(self.schema["properties"]["feedback"]["properties"]["status"]["enum"]), STATUSES)
        self.assertGreaterEqual(len(self.decisions), 3)
        for record in self.decisions:
            label = record["decisionId"]
            self.assertEqual(set(record), required, label)
            self.assertEqual(record["schema"], "mw.coordination-decision.v1", label)
            self.assertEqual(record["version"], 1, label)
            self.assertIn(record["mode"], self.schema["properties"]["mode"]["enum"], label)
            self.assertEqual(set(record["feedback"]), {"status", "reward"}, label)
            self.assertIn(record["feedback"]["status"], STATUSES, label)
            self.assertIn(record["sampled"]["id"], record["support"], label)
            self.assertTrue(set(record["support"]) <= set(record["vocabulary"]), label)

    def test_a_numeric_reward_appears_only_on_final_records(self) -> None:
        finals = [record for record in self.decisions if record["feedback"]["status"] == "final"]
        others = [record for record in self.decisions if record["feedback"]["status"] != "final"]
        self.assertTrue(finals and others, "the fixture exercises both final and non-final records")
        for record in others:
            self.assertEqual(record["feedback"]["reward"], "unknown", record["decisionId"])
        self.assertTrue(any(isinstance(record["feedback"]["reward"], (int, float)) and not isinstance(record["feedback"]["reward"], bool) for record in finals))
        for record in finals:
            reward = record["feedback"]["reward"]
            self.assertTrue(reward == "unknown" or (isinstance(reward, (int, float)) and not isinstance(reward, bool)), record["decisionId"])

    def test_records_recompute_from_the_committed_decision_tape(self) -> None:
        steps = [step for step in self.tape["steps"] if step["intents"]]
        self.assertEqual(len(self.decisions), len(steps))
        for record, step in zip(self.decisions, steps):
            label = f"step {step['step']}"
            self.assertEqual(record["decisionId"], f"fixture:landing-queue:{self.tape['run']['seed']}:{step['step']}", label)
            self.assertEqual(record["intentId"], step["intents"][0]["intentId"], label)
            self.assertEqual(record["observationDigest"], step["observationDigest"], label)
            self.assertEqual(record["sampled"]["id"], step["intents"][0]["effect"], label)
            self.assertEqual(record["sampled"]["logProb"], "unknown", label)

    def test_no_record_is_labelled_replay_or_live_and_nothing_is_null(self) -> None:
        self.assertFalse(contains_null(self.fixture), "an unknown value was serialised as null")
        for record in self.decisions:
            self.assertEqual(record["mode"], "fixture", record["decisionId"])


if __name__ == "__main__":
    unittest.main()
