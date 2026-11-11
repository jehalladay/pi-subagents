"""Independent Python consumer of the compaction-inheritance fixture episode (collective-adaptation M1, MWCOL-003).

The TypeScript package writes `fixtures/compaction-inheritance-seed7.json` as canonical JSON and its own test pins
the committed bytes against a regeneration. This leg recomputes every summary's provenance digest and the
episode's state hash in Python from the same bytes, replays the cost accounting with a plain loop, and checks the
corrupted-summary invariants a training consumer would rely on, without importing the TypeScript package.
"""
from __future__ import annotations

import json
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURE = Path(__file__).parent / "fixtures" / "compaction-inheritance-seed7.json"
COST = {"succeeded": 1, "rediscovered": 2, "failed": 4, "unresolved": 0}


def provenance(summary: dict) -> str:
    return digest({"source": summary["source"], "body": summary["body"]})


class CompactionFixtureTests(unittest.TestCase):
    def setUp(self) -> None:
        self.raw = FIXTURE.read_text(encoding="utf-8")
        self.episode = json.loads(self.raw)
        self.final = self.episode["final"]

    def test_committed_bytes_are_canonical_and_the_final_hash_is_the_python_digest_of_the_final_state(self) -> None:
        self.assertEqual(self.raw.rstrip("\n"), canonical_json(self.episode))
        self.assertEqual(self.episode["finalHash"], digest(self.final))
        for step in self.episode["steps"]:
            self.assertRegex(step["stateHash"], r"^sha256:[0-9a-f]{64}$")
        self.assertEqual(self.episode["steps"][-1]["stateHash"], self.episode["finalHash"])

    def test_episode_is_a_labelled_fixture_and_never_claims_live_verification(self) -> None:
        self.assertEqual(self.episode["schema"], "mw.compaction-inheritance.fixture.v1")
        self.assertEqual(self.episode["mode"], "fixture")
        self.assertEqual(self.final["mode"], "fixture")
        self.assertEqual(self.episode["seed"], 7)
        self.assertEqual(self.episode["policy"], {"id": "provenance-checked", "revision": "fixture-1"})

    def test_a_summary_is_invalid_exactly_when_the_history_says_it_was_corrupted(self) -> None:
        corrupted = [e["summary"] for e in self.final["events"] if e["kind"] == "corrupted"]
        self.assertGreaterEqual(len(corrupted), 1)
        for summary in self.final["summaries"]:
            self.assertEqual(provenance(summary) == summary["provenance"], summary["id"] not in corrupted, summary["id"])

    def test_every_omitted_summary_fails_the_python_digest_check_and_every_persisted_one_passes_it(self) -> None:
        omitted = {e["summary"] for e in self.final["events"] if e["kind"] == "omitted"}
        self.assertEqual(omitted, {e["summary"] for e in self.final["events"] if e["kind"] == "corrupted"})
        for summary in self.final["summaries"]:
            if summary["status"] == "omitted":
                self.assertNotEqual(provenance(summary), summary["provenance"])
                self.assertIn(summary["id"], omitted)
            else:
                self.assertEqual(summary["status"], "persisted")
                self.assertEqual(provenance(summary), summary["provenance"])
        self.assertFalse([e for e in self.final["events"] if e["kind"] == "downstream-failed"])

    def test_cost_and_score_replay_from_the_outcomes_with_a_plain_loop(self) -> None:
        statuses = [o["status"] for o in self.final["outcomes"]]
        self.assertEqual(len(statuses), len(self.final["summaries"]))
        self.assertEqual(self.final["cost"], sum(COST[s] for s in statuses))
        self.assertEqual([o["cost"] for o in self.final["outcomes"]], [COST[s] for s in statuses])
        completed = sum(1 for s in statuses if s in ("succeeded", "rediscovered"))
        self.assertEqual(self.final["score"], 3 * completed - self.final["cost"])


if __name__ == "__main__":
    unittest.main()
