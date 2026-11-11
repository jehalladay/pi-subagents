"""Independent Python consumer of the quorum-evidence fixture episodes (collective-adaptation M1).

The TypeScript package writes two canonical-JSON episodes under `fixtures/` (majority-vote with the gate ablated,
independent-test-first with the gate authoritative) and its own test pins the committed bytes against a
regeneration. This leg recomputes the state digests and the outcome counts in Python from the same bytes, so both
languages agree on one byte sequence, one hash and one set of counts without either importing the other.
"""
from __future__ import annotations

import json
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURES = Path(__file__).parent / "fixtures"
MAJORITY = FIXTURES / "quorum-evidence-majority-ablated-seed0.json"
INDEPENDENT = FIXTURES / "quorum-evidence-independent-seed7.json"
FALSE_POSITIVE_PENALTY = 10
UNCALIBRATED_PENALTY = 2


class QuorumEvidenceFixtureTests(unittest.TestCase):
    def load(self, path: Path) -> tuple[str, dict]:
        raw = path.read_text(encoding="utf-8")
        return raw, json.loads(raw)

    def test_committed_bytes_are_canonical_and_every_hash_is_the_python_digest(self) -> None:
        for path in (MAJORITY, INDEPENDENT):
            raw, episode = self.load(path)
            self.assertEqual(raw.rstrip("\n"), canonical_json(episode), path.name)
            self.assertEqual(episode["finalHash"], digest(episode["final"]), path.name)
            self.assertEqual(episode["steps"][-1]["stateHash"], episode["finalHash"], path.name)

    def test_episodes_are_labelled_fixtures_and_never_claim_live_verification(self) -> None:
        for path, gate, policy in ((MAJORITY, "ablated", "majority-vote"), (INDEPENDENT, "authoritative", "independent-test-first")):
            _, episode = self.load(path)
            self.assertEqual(episode["schema"], "mw.quorum-evidence.fixture.v1")
            self.assertEqual(episode["mode"], "fixture")
            self.assertEqual(episode["final"]["mode"], "fixture")
            self.assertEqual(episode["gate"], gate)
            self.assertEqual(episode["policy"]["id"], policy)

    def test_correlated_votes_make_the_ablated_majority_commit_bad_patches(self) -> None:
        _, episode = self.load(MAJORITY)
        committed_bad = [c for c in episode["final"]["candidates"] if c["decision"] == "committed" and c["quality"] == "bad"]
        self.assertEqual(len(committed_bad), episode["final"]["falsePositives"])
        self.assertGreaterEqual(len(committed_bad), 1)
        self.assertTrue(any(c["correlated"] and all(v == "approve" for v in c["votes"]) for c in committed_bad))
        uncalibrated = episode["final"]["uncalibrated"]
        self.assertEqual(episode["final"]["penalty"], FALSE_POSITIVE_PENALTY * len(committed_bad) + UNCALIBRATED_PENALTY * uncalibrated)

    def test_the_authoritative_gate_commits_only_receipted_good_patches_within_budget(self) -> None:
        _, episode = self.load(INDEPENDENT)
        final = episode["final"]
        self.assertEqual(final["falsePositives"], 0)
        self.assertLessEqual(final["spent"], final["budget"])
        for candidate in final["candidates"]:
            if candidate["decision"] == "committed":
                self.assertTrue(candidate["receipt"], candidate["id"])
                self.assertEqual(candidate["quality"], "good", candidate["id"])
                self.assertEqual(candidate["tested"], "pass", candidate["id"])
        for step in episode["steps"]:
            for rejection in step["resolution"]["rejected"]:
                self.assertIn(rejection["code"], {"INTENT_SCOPE_PROTECTED", "INTENT_BUDGET_EXCEEDED"})


if __name__ == "__main__":
    unittest.main()
