"""The committed replay-labelled receipt of the native multi-attempt inheritance journey (MechanicalWorkflows-s14.15, CA-R13, 08 T4).

A Python consumer re-reads the committed report, recomputes its digest from the canonical bytes, checks it is labelled replay
(never live) and names its live source, that the artifact's digest is the provenance law's digest and was retained by the
treatment arm, that both arms carry native Forge ids, and that the counterfactual delta is derived. Red by absence until the
witnessed run commits the file.
"""
import hashlib
import json
import re
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

HERE = Path(__file__).resolve().parent
RECEIPT = HERE.parent / "evidence" / "2026-10-20-native-inheritance-journey-replay.json"
HASH = re.compile(r"^sha256:[0-9a-f]{64}$")


class NativeInheritanceJourneyReceiptTest(unittest.TestCase):
    def setUp(self) -> None:
        self.assertTrue(RECEIPT.is_file(), f"committed replay-labelled inheritance receipt missing: {RECEIPT}")
        self.raw = RECEIPT.read_text(encoding="utf-8")
        self.report = json.loads(self.raw)

    def test_committed_bytes_are_the_canonical_form_with_one_final_newline(self) -> None:
        self.assertEqual(self.raw, canonical_json(self.report) + "\n")

    def test_report_is_replay_labelled_and_recomputes_its_digest(self) -> None:
        self.assertEqual(self.report["schema"], "mw.native-inheritance-journey.v1")
        self.assertEqual(self.report["mode"], "replay")
        self.assertRegex(self.report["sourceDigest"], HASH)
        rest = {key: value for key, value in self.report.items() if key != "reportDigest"}
        self.assertEqual(self.report["reportDigest"], digest(rest))

    def test_artifact_digest_is_the_provenance_law_and_was_retained_across_attempts(self) -> None:
        artifact = self.report["artifact"]
        law = digest({"id": artifact["id"], "producer": artifact["producer"], "progress": artifact["progress"]})
        self.assertEqual(artifact["digest"], law)
        self.assertEqual(self.report["arms"]["treatment"]["consumed"], [{"artifactId": artifact["id"], "digest": artifact["digest"]}])
        self.assertEqual(self.report["arms"]["control"]["consumed"], [])
        self.assertRegex(artifact["commit"], r"^[0-9a-f]{40}$")

    def test_both_arms_completed_with_native_ids_and_the_delta_is_derived(self) -> None:
        for arm in ("treatment", "control"):
            record = self.report["arms"][arm]
            self.assertEqual(record["outcome"], "completed")
            self.assertRegex(record["gate"]["ids"]["operationId"], r"^op-[0-9a-f]+$")
            self.assertRegex(record["gate"]["ids"]["commandId"], r"^cmd_[0-9a-f]+$")
            self.assertEqual(record["observation"]["outcome"], "observed")
        self.assertEqual(self.report["delta"]["mode"], "derived")
        self.assertEqual(self.report["delta"]["steps"], self.report["arms"]["treatment"]["steps"] - self.report["arms"]["control"]["steps"])
        self.assertLess(self.report["delta"]["steps"], 0)


if __name__ == "__main__":
    unittest.main()
