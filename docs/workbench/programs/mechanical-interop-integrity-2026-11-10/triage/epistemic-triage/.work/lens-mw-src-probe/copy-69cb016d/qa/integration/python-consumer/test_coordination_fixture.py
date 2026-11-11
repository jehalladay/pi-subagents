"""Independent Python consumer of the landing-queue fixture episode (collective-adaptation M0).

The TypeScript package writes `fixtures/landing-queue-seed7.json` as canonical JSON (keys sorted at every depth,
no whitespace) and its own test pins the committed bytes against a regeneration. This leg recomputes the state
digest in Python from the same bytes and checks the invariants a training consumer would rely on, so the two
languages agree on one byte sequence and one hash without either importing the other.
"""
from __future__ import annotations

import json
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURE = Path(__file__).parent / "fixtures" / "landing-queue-seed7.json"
RECOVERY_FIXTURE = Path(__file__).parent / "fixtures" / "artifact-recovery-seed7.json"


class LandingQueueFixtureTests(unittest.TestCase):
    def setUp(self) -> None:
        self.raw = FIXTURE.read_text(encoding="utf-8")
        self.episode = json.loads(self.raw)

    def test_committed_bytes_are_canonical_and_the_final_hash_is_the_python_digest_of_the_final_state(self) -> None:
        self.assertEqual(self.raw.rstrip("\n"), canonical_json(self.episode))
        self.assertEqual(self.episode["finalHash"], digest(self.episode["final"]))
        for step in self.episode["steps"]:
            self.assertRegex(step["stateHash"], r"^sha256:[0-9a-f]{64}$")
        self.assertEqual(self.episode["steps"][-1]["stateHash"], self.episode["finalHash"])

    def test_episode_is_a_labelled_fixture_and_never_claims_live_verification(self) -> None:
        self.assertEqual(self.episode["schema"], "mw.landing-queue.fixture.v1")
        self.assertEqual(self.episode["mode"], "fixture")
        self.assertEqual(self.episode["final"]["mode"], "fixture")
        self.assertEqual(self.episode["seed"], 7)
        self.assertEqual(self.episode["policy"], {"id": "restack-first", "revision": "fixture-1"})

    def test_no_candidate_lands_twice_and_every_landing_event_names_a_landed_candidate(self) -> None:
        landed = self.episode["final"]["landed"]
        self.assertEqual(len(landed), len(set(landed)))
        self.assertEqual(sorted(landed), ["c1", "c2", "c3", "c4"])
        landed_events = [e["candidate"] for e in self.episode["final"]["events"] if e["kind"] == "landed"]
        self.assertEqual(landed_events, landed)

    def test_admitted_intents_in_one_step_never_share_a_write_scope(self) -> None:
        for step in self.episode["steps"]:
            scopes: list[str] = []
            for intent in step["resolution"]["admitted"]:
                for scope in intent["writeScopes"]:
                    self.assertNotIn(scope, scopes, f"step {step['step']} admitted two writers of {scope}")
                    scopes.append(scope)
            for rejection in step["resolution"]["rejected"]:
                self.assertIn(rejection["code"], {
                    "INTENT_BASIS_STALE", "INTENT_SCOPE_PROTECTED", "INTENT_WRITE_CONFLICT",
                    "INTENT_BUDGET_EXCEEDED", "INTENT_DUPLICATE", "INTENT_AUTHORITY_EXCEEDED", "INTENT_CLAIM_INVALID",
                })


class CanonicalJsonRefusalTests(unittest.TestCase):
    """The TypeScript leg refuses NaN and infinities (CANONICAL_JSON_UNSUPPORTED_VALUE); this leg must refuse them too.

    Python's json.dumps default allow_nan=True renders NaN as the bare literal NaN, which is not JSON and which the
    TypeScript leg would render as null, so the legs would disagree on the bytes. Refusing keeps one byte sequence
    for every accepted value.
    """

    def test_non_finite_numbers_are_refused_at_any_depth(self) -> None:
        for value in (float("nan"), float("inf"), float("-inf"), {"score": float("nan")}, [1, [float("inf")]]):
            with self.assertRaises(ValueError, msg=repr(value)):
                canonical_json(value)
            with self.assertRaises(ValueError, msg=repr(value)):
                digest(value)

    def test_finite_values_keep_their_canonical_bytes(self) -> None:
        self.assertEqual(canonical_json({"b": 2, "a": [None, True, 1.5, "x"]}), '{"a":[null,true,1.5,"x"],"b":2}')
        self.assertEqual(canonical_json({}), "{}")


class ArtifactRecoveryFixtureTests(unittest.TestCase):
    def setUp(self) -> None:
        self.raw = RECOVERY_FIXTURE.read_text(encoding="utf-8")
        self.episode = json.loads(self.raw)

    def test_committed_bytes_are_canonical_and_the_final_hash_is_the_python_digest_of_the_final_state(self) -> None:
        self.assertEqual(self.raw.rstrip("\n"), canonical_json(self.episode))
        self.assertEqual(self.episode["finalHash"], digest(self.episode["final"]))
        self.assertEqual(self.episode["steps"][-1]["stateHash"], self.episode["finalHash"])

    def test_episode_is_a_labelled_fixture_with_a_recorded_treatment_id(self) -> None:
        self.assertEqual(self.episode["schema"], "mw.artifact-recovery.fixture.v1")
        self.assertEqual(self.episode["mode"], "fixture")
        self.assertEqual(self.episode["final"]["mode"], "fixture")
        self.assertEqual(self.episode["intervention"], {"arm": "treatment", "id": "treatment:artifact-kept"})
        self.assertEqual(self.episode["policy"], {"id": "resume-from-snapshot", "revision": "fixture-1"})

    def test_artifact_provenance_digest_matches_and_the_successor_consumed_exactly_that_digest(self) -> None:
        final = self.episode["final"]
        artifact = final["artifact"]
        content = {"id": artifact["id"], "producer": artifact["producer"], "progress": artifact["progress"]}
        self.assertEqual(artifact["digest"], digest(content))
        producer, successor = final["attempts"]
        self.assertEqual((producer["outcome"], producer["parent"]), ("crashed", None))
        self.assertEqual(successor["parent"], producer["id"])
        self.assertEqual(successor["consumed"], [{"artifactId": artifact["id"], "digest": artifact["digest"]}])
        consumed = [e for e in final["events"] if e["kind"] == "artifact-consumed"]
        self.assertEqual(len(consumed), 1)
        self.assertIn(artifact["digest"], consumed[0]["detail"])

    def test_the_successor_completes_in_fewer_steps_than_the_full_task_because_the_artifact_was_kept(self) -> None:
        final = self.episode["final"]
        self.assertEqual(final["attempts"][1]["outcome"], "completed")
        self.assertEqual(final["completedAtStep"], 1 + final["work"] - final["artifact"]["progress"])
        self.assertLess(final["completedAtStep"], final["work"])
        self.assertEqual(final["attempts"][0]["progress"], final["crashStep"] - 1)


if __name__ == "__main__":
    unittest.main()
