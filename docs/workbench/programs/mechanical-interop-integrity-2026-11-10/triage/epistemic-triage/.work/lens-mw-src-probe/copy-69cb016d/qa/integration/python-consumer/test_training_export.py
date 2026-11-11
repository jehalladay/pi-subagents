"""Independent Python consumer of the exported mw.training-export.v1 fixtures (collective-adaptation M3, slice A).

The TypeScript package exports each of the five environment episodes for off-policy training and pins the bytes
under `fixtures/training-*.json`. This leg re-reads those bytes in Python: it re-hashes every committed file to
the canonical byte sequence, recomputes the export digest, and recomputes the per-step eligibility mask, the
checkpoints and the sampling support from the exported mw.episode.v1 fixture and the source episode it sits
beside, without importing the TypeScript implementation.
"""
from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURES = Path(__file__).parent / "fixtures"
TRIPLES = {
    "landing-queue": ("landing-queue-seed7.json", "episode-landing-queue-seed7.json", "training-landing-queue-seed7.json"),
    "compaction-inheritance": ("compaction-inheritance-seed7.json", "episode-compaction-inheritance-seed7.json", "training-compaction-inheritance-seed7.json"),
    "colony-resilience": ("colony-resilience-seed29.json", "episode-colony-resilience-seed29.json", "training-colony-resilience-seed29.json"),
    "artifact-recovery": ("artifact-recovery-seed7.json", "episode-artifact-recovery-seed7.json", "training-artifact-recovery-seed7.json"),
    "quorum-evidence": ("quorum-evidence-independent-seed7.json", "episode-quorum-evidence-independent-seed7.json", "training-quorum-evidence-independent-seed7.json"),
}
EXPORT_MEMBERS = ["digest", "environment", "episodeId", "lineage", "mode", "sanitize", "schema", "steps", "verifier", "version"]
STEP_MEMBERS = ["actorId", "checkpoint", "logProb", "mask", "observationDigest", "provenance", "sampled", "step", "support"]
HASH = re.compile(r"^sha256:[0-9a-f]{64}$")


def contains_null(value: object) -> bool:
    if value is None:
        return True
    if isinstance(value, list):
        return any(contains_null(member) for member in value)
    if isinstance(value, dict):
        return any(contains_null(member) for member in value.values())
    return False


class TrainingExportFixtureTests(unittest.TestCase):
    def triples(self):
        for environment, (source_name, episode_name, training_name) in TRIPLES.items():
            source = json.loads((FIXTURES / source_name).read_text(encoding="utf-8"))
            episode = json.loads((FIXTURES / episode_name).read_text(encoding="utf-8"))
            raw = (FIXTURES / training_name).read_text(encoding="utf-8")
            yield environment, source, episode, raw, json.loads(raw)

    def test_committed_bytes_are_the_canonical_form_with_one_final_newline(self) -> None:
        for environment, _source, _episode, raw, exported in self.triples():
            self.assertEqual(raw, canonical_json(exported) + "\n", environment)

    def test_digest_covers_every_other_member_and_members_are_exact(self) -> None:
        for environment, _source, _episode, _raw, exported in self.triples():
            self.assertEqual(sorted(exported), EXPORT_MEMBERS, environment)
            body = {key: value for key, value in exported.items() if key != "digest"}
            self.assertEqual(exported["digest"], digest(body), environment)
            for step in exported["steps"]:
                self.assertEqual(sorted(step), STEP_MEMBERS, environment)

    def test_every_export_is_a_labelled_fixture_with_no_null_and_a_recorded_sanitiser(self) -> None:
        for environment, _source, episode, _raw, exported in self.triples():
            self.assertEqual(exported["schema"], "mw.training-export.v1", environment)
            self.assertEqual(exported["version"], 1, environment)
            self.assertEqual(exported["mode"], "fixture", environment)
            self.assertEqual(exported["environment"], environment)
            self.assertEqual(exported["episodeId"], episode["episodeId"], environment)
            self.assertEqual(exported["verifier"], episode["verifier"], environment)
            self.assertEqual(exported["verifier"]["label"], "fixture", environment)
            self.assertFalse(contains_null(exported), f"{environment}: an unknown value was serialised as null")
            self.assertEqual(exported["sanitize"], {"ran": True, "removed": [], "inherited": episode["sanitize"]["removed"]}, environment)

    def test_mask_is_the_admitted_set_of_the_recorded_resolution_not_the_proposed_set(self) -> None:
        narrowed = 0
        for environment, source, _episode, _raw, exported in self.triples():
            self.assertEqual(len(exported["steps"]), len(source["steps"]), environment)
            for step, recorded in zip(exported["steps"], source["steps"]):
                resolution = recorded["resolution"]
                self.assertEqual(step["mask"]["admitted"], [i["intentId"] for i in resolution["admitted"]], environment)
                self.assertEqual(
                    step["mask"]["rejected"],
                    [{"intentId": r["intent"]["intentId"], "code": r["code"]} for r in resolution["rejected"]],
                    environment,
                )
                self.assertEqual(step["sampled"], recorded["proposed"], environment)
                self.assertEqual(step["observationDigest"], recorded["observationDigest"], environment)
                if len(step["mask"]["admitted"]) < len(step["sampled"]):
                    narrowed += 1
        self.assertGreaterEqual(narrowed, 1, "at least one environment rejects a proposed intent")

    def test_checkpoints_support_and_unknown_log_probability_recompute(self) -> None:
        for environment, source, _episode, _raw, exported in self.triples():
            policy = source["policy"]
            config_hash = digest({"policies": [f"{policy['id']}@{policy['revision']}"]})
            hashes = [step["stateHash"] for step in source["steps"]]
            for index, step in enumerate(exported["steps"]):
                self.assertEqual(step["checkpoint"]["after"], hashes[index], environment)
                self.assertEqual(step["checkpoint"]["before"], source["initialHash"] if index == 0 else hashes[index - 1], environment)
                if index == 0:
                    self.assertRegex(step["checkpoint"]["before"], HASH, environment)
                self.assertRegex(step["checkpoint"]["after"], HASH)
                self.assertEqual(step["support"], {"policyId": policy["id"], "revision": policy["revision"], "configHash": config_hash}, environment)
                self.assertEqual(step["logProb"], "unknown", environment)

    def test_actor_id_is_the_single_role_or_the_explicit_unknown(self) -> None:
        for environment, _source, episode, _raw, exported in self.triples():
            expected = episode["roles"][0] if len(episode["roles"]) == 1 else "unknown"
            for step in exported["steps"]:
                self.assertEqual(step["actorId"], expected, environment)


if __name__ == "__main__":
    unittest.main()
