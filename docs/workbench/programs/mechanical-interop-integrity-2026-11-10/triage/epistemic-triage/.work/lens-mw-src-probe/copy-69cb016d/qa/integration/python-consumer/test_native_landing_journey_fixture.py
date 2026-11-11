"""The committed replay-labelled receipt of the native landing-queue journey (MechanicalWorkflows-s14.14, CA-R12, 08 T3).

A Python consumer re-reads the committed journey report, recomputes its digest from the canonical bytes, and checks
that it is labelled replay (never live), names the live report it came from, and that every landing retained a
native Forge operation id and command id. Red by absence until the witnessed run commits the file.
"""
import json
import re
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

HERE = Path(__file__).resolve().parent
RECEIPT = HERE.parent / "evidence" / "2026-10-20-native-landing-journey-replay.json"
HASH = re.compile(r"^sha256:[0-9a-f]{64}$")


class NativeLandingJourneyReceiptTest(unittest.TestCase):
    def setUp(self) -> None:
        self.assertTrue(RECEIPT.is_file(), f"committed replay-labelled journey receipt missing: {RECEIPT}")
        self.raw = RECEIPT.read_text(encoding="utf-8")
        self.report = json.loads(self.raw)

    def test_committed_bytes_are_the_canonical_form_with_one_final_newline(self) -> None:
        self.assertEqual(self.raw, canonical_json(self.report) + "\n")

    def test_report_is_replay_labelled_and_names_its_live_source(self) -> None:
        self.assertEqual(self.report["schema"], "mw.native-landing-journey.v1")
        self.assertEqual(self.report["mode"], "replay")
        self.assertNotEqual(self.report["mode"], "live")
        self.assertRegex(self.report["sourceDigest"], HASH)

    def test_report_digest_recomputes_from_every_other_field(self) -> None:
        rest = {key: value for key, value in self.report.items() if key != "reportDigest"}
        self.assertEqual(self.report["reportDigest"], digest(rest))

    def test_every_landing_retained_native_ids_and_the_final_head_is_a_commit(self) -> None:
        self.assertGreaterEqual(len(self.report["landed"]), 1)
        for landing in self.report["landed"]:
            self.assertRegex(landing["commit"], r"^[0-9a-f]{40}$")
            ids = landing["receipt"]["ids"]
            self.assertRegex(ids["operationId"], r"^op-[0-9a-f]+$")
            self.assertRegex(ids["commandId"], r"^cmd_[0-9a-f]+$")
            self.assertEqual(landing["observation"]["outcome"], "observed")
        self.assertRegex(self.report["final"]["head"], r"^[0-9a-f]{40}$")
        self.assertEqual(self.report["final"]["remaining"], [])


if __name__ == "__main__":
    unittest.main()
