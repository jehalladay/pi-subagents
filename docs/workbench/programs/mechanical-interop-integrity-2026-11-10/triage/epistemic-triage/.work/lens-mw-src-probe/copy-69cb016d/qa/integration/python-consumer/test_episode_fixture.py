"""Independent Python consumer of the exported mw.episode.v1 fixtures (collective-adaptation M1, slice E).

The TypeScript package converts each of the five environment episodes to the shared format and pins the bytes
under `fixtures/episode-*.json`. This leg re-reads the same bytes in Python: it re-hashes every committed file to
the canonical byte sequence, recomputes the policy configuration hash, the checkpoints, the verifier receipt and
the budget spend from the source episode it sits beside, and checks the explicit-unknown rule, without importing
the TypeScript implementation.
"""
from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURES = Path(__file__).parent / "fixtures"
SCHEMA = Path(__file__).parents[3] / "packages" / "coordination" / "schema" / "episode.v1.schema.json"
PAIRS = {
    "landing-queue": ("landing-queue-seed7.json", "episode-landing-queue-seed7.json"),
    "compaction-inheritance": ("compaction-inheritance-seed7.json", "episode-compaction-inheritance-seed7.json"),
    "colony-resilience": ("colony-resilience-seed29.json", "episode-colony-resilience-seed29.json"),
    "artifact-recovery": ("artifact-recovery-seed7.json", "episode-artifact-recovery-seed7.json"),
    "quorum-evidence": ("quorum-evidence-independent-seed7.json", "episode-quorum-evidence-independent-seed7.json"),
}
HASH = re.compile(r"^sha256:[0-9a-f]{64}$")


def contains_null(value: object) -> bool:
    if value is None:
        return True
    if isinstance(value, list):
        return any(contains_null(member) for member in value)
    if isinstance(value, dict):
        return any(contains_null(member) for member in value.values())
    return False


class EpisodeFixtureTests(unittest.TestCase):
    def pairs(self):
        for environment, (source_name, exported_name) in PAIRS.items():
            source = json.loads((FIXTURES / source_name).read_text(encoding="utf-8"))
            raw = (FIXTURES / exported_name).read_text(encoding="utf-8")
            yield environment, source, raw, json.loads(raw)

    def test_committed_bytes_are_the_canonical_form_with_one_final_newline(self) -> None:
        for environment, _source, raw, episode in self.pairs():
            self.assertEqual(raw, canonical_json(episode) + "\n", environment)

    def test_top_level_members_are_exactly_the_schema_required_members(self) -> None:
        schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
        for environment, _source, _raw, episode in self.pairs():
            self.assertEqual(sorted(episode), sorted(schema["required"]), environment)
            self.assertEqual(sorted(episode), sorted(schema["properties"]), environment)

    def test_every_episode_is_a_labelled_fixture_with_a_fixture_verifier_and_no_null(self) -> None:
        for environment, source, _raw, episode in self.pairs():
            self.assertEqual(episode["schema"], "mw.episode.v1", environment)
            self.assertEqual(episode["version"], 1, environment)
            self.assertEqual(episode["mode"], "fixture", environment)
            self.assertEqual(episode["environment"], environment)
            self.assertEqual(episode["source"], {"schema": source["schema"], "seed": source["seed"]}, environment)
            self.assertEqual(episode["verifier"]["label"], "fixture", environment)
            self.assertFalse(contains_null(episode), f"{environment}: an unknown value was serialised as null")
            self.assertEqual(episode["sanitize"], {"ran": True, "removed": []}, environment)

    def test_policy_hash_checkpoints_and_receipt_recompute_from_the_source_episode(self) -> None:
        for environment, source, _raw, episode in self.pairs():
            policy = source["policy"]
            self.assertEqual(episode["policy"]["configHash"], digest({"policies": [f"{policy['id']}@{policy['revision']}"]}), environment)
            self.assertEqual(episode["checkpoints"], [step["stateHash"] for step in source["steps"]], environment)
            for checkpoint in episode["checkpoints"]:
                self.assertRegex(checkpoint, HASH)
            self.assertEqual(episode["verifier"]["receiptDigest"], source["finalHash"], environment)
            self.assertEqual(source["finalHash"], digest(source["final"]), environment)

    def test_initial_checkpoint_equals_the_source_initial_hash(self) -> None:
        for environment, source, _raw, episode in self.pairs():
            self.assertRegex(source["initialHash"], HASH, environment)
            self.assertEqual(episode["initialCheckpoint"], source["initialHash"], environment)
            self.assertNotEqual(episode["initialCheckpoint"], episode["checkpoints"][0], environment)

    def test_cost_and_decisions_recompute_from_the_resolutions(self) -> None:
        for environment, source, _raw, episode in self.pairs():
            spent = {"compute": 0, "workers": 0, "queue": 0, "latencyMs": 0}
            for step in source["steps"]:
                for key in spent:
                    spent[key] += step["resolution"]["budgetUsed"][key]
            self.assertEqual(episode["cost"]["budgetSpent"], spent, environment)
            self.assertEqual(episode["cost"]["steps"], len(source["steps"]), environment)
            self.assertEqual(len(episode["decisions"]), len(source["steps"]), environment)
            for decision, step in zip(episode["decisions"], source["steps"]):
                self.assertEqual(decision["logProb"], "unknown", environment)
                self.assertEqual(decision["eligibility"]["admitted"], [i["intentId"] for i in step["resolution"]["admitted"]], environment)
                self.assertEqual(
                    decision["eligibility"]["rejected"],
                    [{"intentId": r["intent"]["intentId"], "code": r["code"]} for r in step["resolution"]["rejected"]],
                    environment,
                )

    def test_unknown_is_the_literal_wherever_the_environment_has_no_value(self) -> None:
        by_environment = {environment: episode for environment, _s, _r, episode in self.pairs()}
        self.assertEqual(by_environment["landing-queue"]["attempts"], "unknown")
        self.assertEqual(by_environment["landing-queue"]["artifacts"], {"created": "unknown", "consumed": "unknown"})
        self.assertEqual(by_environment["artifact-recovery"]["attempts"][0]["parent"], "unknown")
        self.assertIsInstance(by_environment["artifact-recovery"]["artifacts"]["created"], list)
        self.assertEqual(by_environment["colony-resilience"]["cost"]["environmentCost"] >= 0, True)


if __name__ == "__main__":
    unittest.main()
