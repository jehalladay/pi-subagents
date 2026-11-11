"""Independent Python consumer of the colony-resilience fixture episode (collective-adaptation M1, family 5).

The TypeScript package writes `fixtures/colony-resilience-seed29.json` as canonical JSON and pins the committed
bytes against a regeneration. This leg recomputes the state digest in Python and re-derives the safety facts a
training consumer relies on from the event history alone: the episode is a labelled fixture, no accepted worker
rested on unverified evidence, resolver refusals stayed visible, and Trail and Quorum stayed explicitly absent.
"""
from __future__ import annotations

import json
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURE = Path(__file__).parent / "fixtures" / "colony-resilience-seed29.json"


class ColonyResilienceFixtureTests(unittest.TestCase):
    def setUp(self) -> None:
        self.raw = FIXTURE.read_text(encoding="utf-8")
        self.episode = json.loads(self.raw)
        self.final = self.episode["final"]

    def test_committed_bytes_are_canonical_and_the_final_hash_is_the_python_digest_of_the_final_state(self) -> None:
        self.assertEqual(self.raw.rstrip("\n"), canonical_json(self.episode))
        self.assertEqual(self.episode["finalHash"], digest(self.final))
        self.assertEqual(self.episode["steps"][-1]["stateHash"], self.episode["finalHash"])

    def test_episode_is_a_labelled_fixture_with_trail_and_quorum_explicitly_absent(self) -> None:
        self.assertEqual(self.episode["schema"], "mw.colony-resilience.fixture.v1")
        self.assertEqual(self.episode["mode"], "fixture")
        self.assertEqual(self.final["mode"], "fixture")
        self.assertEqual(self.final["fakes"], {"trail": "absent", "quorum": "absent"})
        self.assertEqual(self.episode["policy"], {"id": "receipt-checked", "revision": "fixture-1"})

    def test_no_accepted_worker_rested_on_a_nonauthoritative_signal_or_stale_receipt(self) -> None:
        self.assertFalse([e for e in self.final["events"] if e["kind"] == "unsafe-effect"])
        for worker in self.final["workers"]:
            self.assertFalse(worker["unsafe"], worker["id"])
            if worker["acceptedVia"] == "evidence":
                self.assertEqual(worker["signal"]["authority"], "authoritative")
                self.assertEqual(worker["receipt"]["basis"], self.final["head"])

    def test_every_resolver_refusal_and_the_halt_stay_visible_in_the_event_history(self) -> None:
        refused = [e["detail"].split(":", 1)[0] for e in self.final["events"] if e["kind"] == "refused"]
        rejected = [r["code"] for step in self.episode["steps"] for r in step["resolution"]["rejected"]]
        self.assertEqual(sorted(refused), sorted(rejected))
        self.assertIn("INTENT_SCOPE_PROTECTED", rejected)
        self.assertIn("INTENT_BUDGET_EXCEEDED", rejected)
        self.assertTrue(self.final["halted"])
        self.assertEqual(len([e for e in self.final["events"] if e["kind"] == "halted"]), 1)

    def test_killed_workers_are_recovered_or_the_episode_halted_and_spend_stays_within_budget(self) -> None:
        for worker in self.final["workers"]:
            if worker["initiallyKilled"]:
                self.assertTrue(worker["status"] == "recovered" or self.final["halted"], worker["id"])
        self.assertGreaterEqual(self.final["computeLeft"], 0)
        self.assertLessEqual(self.final["computeStart"] - self.final["computeLeft"], self.final["computeStart"])


if __name__ == "__main__":
    unittest.main()
