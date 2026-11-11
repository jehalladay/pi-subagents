"""Independent Python consumer of the committed decision tape and its replay-labelled episode (CA-R9).

`fixtures/decision-tape-landing-queue-seed7.json` records the intent sequence the `restack-first` policy proposed
in the seed-7 landing-queue fixture, with the observation digest, admitted intent ids and state hash at every
step. `fixtures/episode-decision-replay-landing-queue-seed7.json` is the `mw.episode.v1` episode the TypeScript
`replayDecisions` exports after re-executing the environment from that tape alone. This leg re-reads the files in
Python and recomputes, from the independently committed seed-7 episode, what the tape must say, without importing
the TypeScript implementation. A replay never reaches a live label.
"""
from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURES = Path(__file__).parent / "fixtures"
HASH = re.compile(r"^sha256:[0-9a-f]{64}$")


def contains_null(value: object) -> bool:
    if value is None:
        return True
    if isinstance(value, list):
        return any(contains_null(member) for member in value)
    if isinstance(value, dict):
        return any(contains_null(member) for member in value.values())
    return False


class DecisionReplayFixtureTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tape_raw = (FIXTURES / "decision-tape-landing-queue-seed7.json").read_text(encoding="utf-8")
        self.episode_raw = (FIXTURES / "episode-decision-replay-landing-queue-seed7.json").read_text(encoding="utf-8")
        self.source = json.loads((FIXTURES / "landing-queue-seed7.json").read_text(encoding="utf-8"))
        self.tape = json.loads(self.tape_raw)
        self.episode = json.loads(self.episode_raw)

    def test_committed_bytes_are_the_canonical_form_with_one_final_newline(self) -> None:
        self.assertEqual(self.tape_raw, canonical_json(self.tape) + "\n")
        self.assertEqual(self.episode_raw, canonical_json(self.episode) + "\n")

    def test_tape_header_and_run_parameters_match_the_committed_seed_fixture(self) -> None:
        tape, source = self.tape, self.source
        self.assertEqual(tape["schema"], "mw.decision-tape.v1")
        self.assertEqual(tape["environment"], "landing-queue")
        self.assertEqual(tape["policy"], source["policy"])
        self.assertEqual(tape["run"], {
            "seed": source["seed"], "candidates": len(source["final"]["candidates"]),
            "lanes": source["final"]["lanes"], "steps": len(source["steps"]),
        })

    def test_recorded_intents_observations_admissions_and_hashes_recompute_from_the_seed_episode(self) -> None:
        tape_steps, source_steps = self.tape["steps"], self.source["steps"]
        self.assertEqual(len(tape_steps), len(source_steps))
        for recorded, step in zip(tape_steps, source_steps):
            label = f"step {step['step']}"
            self.assertEqual(recorded["step"], step["step"], label)
            self.assertEqual(recorded["observationDigest"], step["observationDigest"], label)
            self.assertEqual([intent["intentId"] for intent in recorded["intents"]], step["proposed"], label)
            self.assertEqual(recorded["admitted"], [intent["intentId"] for intent in step["resolution"]["admitted"]], label)
            self.assertEqual(recorded["stateHash"], step["stateHash"], label)
            everything = step["resolution"]["admitted"] + [rejection["intent"] for rejection in step["resolution"]["rejected"]]
            self.assertEqual(sorted(canonical_json(intent) for intent in recorded["intents"]), sorted(canonical_json(intent) for intent in everything), label)
        self.assertEqual(tape_steps[-1]["stateHash"], self.source["finalHash"])
        self.assertTrue(any(step["intents"] for step in tape_steps), "the tape records at least one decision")

    def test_episode_is_labelled_replay_never_live_and_carries_the_tape_digest(self) -> None:
        episode = self.episode
        self.assertEqual(episode["schema"], "mw.episode.v1")
        self.assertEqual(episode["mode"], "replay")
        self.assertEqual(episode["verifier"]["label"], "replay")
        self.assertEqual(episode["environment"], "landing-queue")
        self.assertEqual(episode["episodeId"], f"replay:landing-queue:{self.tape['run']['seed']}:{self.tape['policy']['id']}")
        self.assertEqual(episode["verifier"]["receiptDigest"], digest(self.tape))
        self.assertEqual(episode["verifier"]["verdict"], f"replayed={len(self.tape['steps'])},diverged=none")
        self.assertEqual(episode["sanitize"]["ran"], True)
        self.assertFalse(contains_null(episode), "an unknown value was serialised as null")
        for label in ("live", "live-verified"):
            self.assertNotIn(label, (episode["mode"], episode["verifier"]["label"]))

    def test_episode_checkpoints_equal_the_tape_and_the_seed_fixture_chain(self) -> None:
        self.assertEqual(self.episode["checkpoints"], [step["stateHash"] for step in self.tape["steps"]])
        self.assertEqual(self.episode["checkpoints"], [step["stateHash"] for step in self.source["steps"]])
        for checkpoint in self.episode["checkpoints"]:
            self.assertRegex(checkpoint, HASH)
        self.assertEqual([decision["proposed"] for decision in self.episode["decisions"]], [step["proposed"] for step in self.source["steps"]])

    def test_altering_one_recorded_intent_changes_the_tape_digest_the_episode_pins(self) -> None:
        altered = json.loads(self.tape_raw)
        first = next(step for step in altered["steps"] if step["intents"])
        first["intents"][0]["effect"] = "merge"
        self.assertNotEqual(digest(altered), self.episode["verifier"]["receiptDigest"])


if __name__ == "__main__":
    unittest.main()
