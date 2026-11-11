"""Independent Python consumer of the elastic landing-queue fixture episode (collective-adaptation CA-R2).

The TypeScript package writes `fixtures/landing-queue-elastic-seed7.json` as canonical JSON and pins the committed
bytes against a regeneration. This leg recomputes the state digest, the gate-draw load bounds and the lane
invariants from the same bytes without importing the TypeScript code, so both languages agree on one byte sequence,
one hash and one Load-row verdict.
"""
from __future__ import annotations

import json
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURE = Path(__file__).parent / "fixtures" / "landing-queue-elastic-seed7.json"
MASK = 0xFFFFFFFF


def gate_stream_start(seed: int) -> int:
    """splitmix32 finaliser over the seed (golden-ratio increment, then the murmur3 fmix32 rounds), the zero state remapped to 1: the TypeScript gateStreamStart."""
    z = (seed + 0x9E3779B9) & MASK
    z = ((z ^ (z >> 16)) * 0x85EBCA6B) & MASK
    z = ((z ^ (z >> 13)) * 0xC2B2AE35) & MASK
    z = (z ^ (z >> 16)) & MASK
    return z or 1


def gate_draws(seed: int):
    """xorshift32 over the finalised seed, the same stream the TypeScript fixture draws its gate verdicts from."""
    x = gate_stream_start(seed)

    def draw() -> int:
        nonlocal x
        x ^= (x << 13) & MASK
        x ^= x >> 17
        x ^= (x << 5) & MASK
        return x

    return draw


def load_bounds(seed: int, candidates: int) -> tuple[int, int]:
    draw = gate_draws(seed)
    passes = attempts = 0
    while passes < candidates:
        attempts += 1
        if draw() % 4 != 0:
            passes += 1
    return attempts + max(0, candidates - 1), attempts + candidates * (candidates - 1) // 2


class ElasticLandingFixtureTests(unittest.TestCase):
    def setUp(self) -> None:
        self.raw = FIXTURE.read_text(encoding="utf-8")
        self.episode = json.loads(self.raw)

    def test_committed_bytes_are_canonical_and_the_final_hash_is_the_python_digest_of_the_final_state(self) -> None:
        self.assertEqual(self.raw.rstrip("\n"), canonical_json(self.episode))
        self.assertEqual(self.episode["finalHash"], digest(self.episode["final"]))
        self.assertEqual(self.episode["steps"][-1]["stateHash"], self.episode["finalHash"])

    def test_episode_is_a_labelled_fixture(self) -> None:
        self.assertEqual(self.episode["schema"], "mw.landing-queue.elastic.fixture.v1")
        self.assertEqual(self.episode["mode"], "fixture")
        self.assertEqual(self.episode["final"]["mode"], "fixture")
        self.assertEqual(self.episode["policy"], {"id": "elastic-lanes", "revision": "fixture-1"})

    def test_the_load_verdict_matches_bounds_recomputed_in_python_from_the_gate_draws(self) -> None:
        ideal, serial = load_bounds(self.episode["seed"], len(self.episode["final"]["candidates"]))
        load = self.episode["load"]
        self.assertEqual((load["idealSteps"], load["serialSteps"]), (ideal, serial))
        self.assertEqual(load["stepsGiven"], len(self.episode["steps"]))
        self.assertEqual(load["feasible"], load["stepsGiven"] >= ideal)
        self.assertIsNone(load["code"])
        self.assertEqual(load["starved"], [])
        self.assertFalse(load["policyFailure"])

    def test_no_starvation_and_a_bounded_queue(self) -> None:
        final = self.episode["final"]
        self.assertEqual(sorted(final["landed"]), sorted(c["id"] for c in final["candidates"]))
        self.assertEqual(len(final["landed"]), len(set(final["landed"])))
        total = len(final["candidates"])
        for step in self.episode["steps"]:
            landed_before = sum(1 for e in final["events"] if e["kind"] == "landed" and e["step"] < step["step"])
            self.assertEqual(step["queueLength"], total - landed_before)
            self.assertLessEqual(step["queueLength"], total)
        self.assertEqual(self.episode["load"]["maxQueue"], max(s["queueLength"] for s in self.episode["steps"]))

    def test_every_lane_change_is_an_event_with_a_step_and_a_reason_and_work_never_shares_a_lane_in_one_step(self) -> None:
        events = self.episode["final"]["events"]
        lane_events = [e for e in events if e["kind"].startswith("lane-")]
        self.assertTrue(lane_events)
        for event in lane_events:
            self.assertGreaterEqual(event["step"], 1)
            self.assertTrue(event["reason"])
            self.assertRegex(event["lane"], r"^l\d+$")
        self.assertEqual(len(self.episode["final"]["lanes"]), 1 + sum(1 for e in lane_events if e["kind"] == "lane-allocated"))
        used: set[tuple[int, str]] = set()
        for event in events:
            if event["kind"] in {"landed", "gate-failed", "restacked"}:
                key = (event["step"], event["lane"])
                self.assertNotIn(key, used, f"step {event['step']} ran two works on {event['lane']}")
                used.add(key)
        for step in self.episode["steps"]:
            self.assertGreaterEqual(step["activeLanes"], 1)
            for rejection in step["resolution"]["rejected"]:
                self.assertIn(rejection["code"], {
                    "INTENT_BASIS_STALE", "INTENT_SCOPE_PROTECTED", "INTENT_WRITE_CONFLICT",
                    "INTENT_BUDGET_EXCEEDED", "INTENT_DUPLICATE", "INTENT_AUTHORITY_EXCEEDED", "INTENT_CLAIM_INVALID",
                })


    def test_the_python_gate_stream_agrees_with_the_typescript_finaliser_draw_for_draw(self) -> None:
        # (seed, finalised start state, first draw) recorded from the TypeScript gateStreamStart/gateDraws; the last two seeds finalise to 0 and 1 and so share one stream.
        pinned = [
            (0, 2462723854, 844830715), (1, 2527132011, 3090573325), (2, 3024231355, 294978561), (3, 3984711379, 488729150),
            (4, 1486870344, 3970320403), (5, 1478832577, 1034991407), (6, 2058230478, 2265399445), (7, 588686121, 420276880),
            (0x61C88647, 1, 270369), (0x6F2A7A53, 1, 270369),
        ]
        for seed, start, first in pinned:
            self.assertEqual(gate_stream_start(seed), start, seed)
            self.assertEqual(gate_draws(seed)(), first, seed)


if __name__ == "__main__":
    unittest.main()
