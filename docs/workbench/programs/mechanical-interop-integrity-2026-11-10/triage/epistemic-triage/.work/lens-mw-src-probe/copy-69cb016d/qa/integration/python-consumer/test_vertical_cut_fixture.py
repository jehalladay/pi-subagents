"""Independent Python consumer of the committed vertical-cut report (GPC-EAT-R009, MechanicalWorkflows-trys).

`fixtures/vertical-cut-seed7.json` is the executed synthetic vertical cut: one mw.graph-family-evaluation.v1
report (the per-family successor of mw.evaluation.v1) over the pinned tiny landing-queue and DAG instances,
extended additively with mode 'fixture' and a provenance block (instance sizes, the regret definition fixed
before the run, the oracle witnesses and the learned arm's graph-policy-host configuration). This leg re-reads
the file without importing the TypeScript implementation: it recomputes and asserts the report digest, asserts
canonical-byte identity across languages, pins the four canonical arms per family with every GPC-EAT-R010
metric, asserts the exact-oracle arm's regret is 0 on every instance (n is 1 per family per arm, so the block
row IS the instance), and asserts no arm or report is labelled live or certified.
"""
from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

HERE = Path(__file__).resolve().parent
FIXTURES = HERE / "fixtures"
ARMS = ["exact-oracle", "fifo", "gp-scorer", "restack"]
METRICS = ["constraintViolations", "invalidProposals", "throughputMicro", "p95WallClockMicro", "meanStepsMicro"]


def contains_null(value: object) -> bool:
    if value is None:
        return True
    if isinstance(value, list):
        return any(contains_null(member) for member in value)
    if isinstance(value, dict):
        return any(contains_null(member) for member in value.values())
    return False


def walk(value: object):
    yield value
    if isinstance(value, list):
        for member in value:
            yield from walk(member)
    if isinstance(value, dict):
        for key, member in value.items():
            yield key
            yield from walk(member)


class VerticalCutFixtureTests(unittest.TestCase):
    def setUp(self) -> None:
        self.raw = (FIXTURES / "vertical-cut-seed7.json").read_text(encoding="utf-8")
        self.report = json.loads(self.raw)

    def test_digest_and_canonical_bytes_reverify(self) -> None:
        body = {key: value for key, value in self.report.items() if key != "reportDigest"}
        self.assertEqual(digest(body), self.report["reportDigest"], "reportDigest covers the body")
        self.assertEqual(canonical_json(self.report) + "\n", self.raw, "same canonical bytes in either language")
        self.assertFalse(contains_null(self.report), "no nulls anywhere")

    def test_schema_mode_and_certification(self) -> None:
        self.assertEqual(self.report["schema"], "mw.graph-family-evaluation.v1")
        self.assertEqual(self.report["mode"], "fixture")
        self.assertIs(self.report["certified"], False)
        for block in self.report["families"]:
            self.assertIs(block["certified"], False, block["family"])
            for arm in block["arms"]:
                self.assertIs(arm["certified"], False, f"{block['family']}/{arm['armId']}")
        for value in walk(self.report):
            self.assertNotEqual(value, "live", "no arm, mode or label anywhere reads live")
            self.assertIsNot(value, True, "no boolean true anywhere in the fixture report")
        self.assertNotIn('"certified":true', self.raw.replace(" ", ""), "no certified:true bytes")

    def test_families_arms_and_metrics(self) -> None:
        self.assertEqual([block["family"] for block in self.report["families"]], ["dag-assignment", "landing-queue"])
        for block in self.report["families"]:
            self.assertEqual([arm["armId"] for arm in block["arms"]], ARMS, block["family"])
            for arm in block["arms"]:
                self.assertEqual(arm["n"], 1, "one pinned instance per family per arm")
                self.assertIsInstance(arm["regretMicro"], int, f"{block['family']}/{arm['armId']} regret is measured here")
                for metric in METRICS:
                    self.assertIsInstance(arm[metric], int, metric)
                    self.assertGreaterEqual(arm[metric], 0, metric)

    def test_oracle_regret_is_zero_on_every_instance_and_no_arm_beats_it(self) -> None:
        self.assertEqual(self.report["oracleArm"], "exact-oracle")
        for block in self.report["families"]:
            rows = {arm["armId"]: arm for arm in block["arms"]}
            self.assertEqual(rows["exact-oracle"]["regretMicro"], 0, block["family"])
            for arm_id, row in rows.items():
                self.assertGreaterEqual(row["regretMicro"], 0, f"{block['family']}/{arm_id}: the oracle is the reference")

    def test_provenance_pins_the_run(self) -> None:
        provenance = self.report["provenance"]
        self.assertEqual(provenance["arms"], ARMS)
        self.assertIn("minimal step count", provenance["regretDefinition"], "the regret definition is fixed before the run")
        self.assertEqual(provenance["wallClockMicroPerStep"], 1000)
        self.assertEqual(provenance["instances"]["landing"], {"seed": 7, "candidates": 4, "lanes": 1, "stepsCap": 12})
        self.assertEqual(provenance["instances"]["dag"], {"seed": 7, "stepsCap": 8})
        self.assertEqual(provenance["oracle"]["dag"]["steps"], 3, "equals the ceil(5 tasks / 2 workers) lower bound")
        self.assertIsNotNone(re.fullmatch(r"[01]+", provenance["oracle"]["landing"]["script"]))
        self.assertEqual(provenance["oracle"]["landing"]["steps"], len(provenance["oracle"]["landing"]["script"]))
        self.assertEqual(provenance["learnedArm"]["mechanism"], "graph-policy-host")
        self.assertEqual(provenance["learnedArm"]["landing"]["graphPolicy"], "configured")
        self.assertEqual(provenance["learnedArm"]["dag"]["graphPolicy"], "configured")


if __name__ == "__main__":
    unittest.main()
