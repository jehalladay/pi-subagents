"""Every Python consumer leg serialises canonical JSON through one shared definition (collective-adaptation M1).

The TypeScript `canonicalJson` refuses NaN and both infinities with CANONICAL_JSON_UNSUPPORTED_VALUE. Each leg once
carried its own copy of `canonical_json`, and the copies drifted: the compaction and quorum legs omitted
`allow_nan=False`, so they rendered the bare literal NaN (not JSON) where the TypeScript leg refuses. This module pins
that every leg that defines or imports `canonical_json` refuses the same values, and that they all share the
`mw_canonical` definition so a later leg cannot reintroduce the drift.
"""
from __future__ import annotations

import re
import unittest
from pathlib import Path

import mw_canonical
import test_collective_event_fixture
import test_colony_resilience_fixture
import test_compaction_fixture
import test_coordination_fixture
import test_decision_replay_fixture
import test_elastic_landing_fixture
import test_episode_fixture
import test_evaluation_fixture
import test_exit_report_fixture
import test_quorum_fixture
import test_replay_fixture
import test_training_export

LEGS = {
    "collective_event": test_collective_event_fixture,
    "colony_resilience": test_colony_resilience_fixture,
    "compaction": test_compaction_fixture,
    "coordination": test_coordination_fixture,
    "decision_replay": test_decision_replay_fixture,
    "elastic_landing": test_elastic_landing_fixture,
    "episode": test_episode_fixture,
    "evaluation": test_evaluation_fixture,
    "exit_report": test_exit_report_fixture,
    "quorum": test_quorum_fixture,
    "replay": test_replay_fixture,
    "training_export": test_training_export,
}
NON_FINITE = (float("nan"), float("inf"), float("-inf"), {"score": float("nan")}, [1, [float("inf")]])


class SharedCanonicalJsonTests(unittest.TestCase):
    def test_every_leg_refuses_non_finite_numbers_at_any_depth_in_canonical_json_and_digest(self) -> None:
        for name, leg in LEGS.items():
            for value in NON_FINITE:
                with self.assertRaises(ValueError, msg=f"{name} canonical_json {value!r}"):
                    leg.canonical_json(value)
                with self.assertRaises(ValueError, msg=f"{name} digest {value!r}"):
                    leg.digest(value)

    def test_every_leg_uses_the_one_shared_definition(self) -> None:
        for name, leg in LEGS.items():
            self.assertIs(leg.canonical_json, mw_canonical.canonical_json, name)
            self.assertIs(leg.digest, mw_canonical.digest, name)

    def test_no_leg_file_binds_a_private_canonical_json_or_digest_definition(self) -> None:
        # A source scan, so a new leg that copies the helper fails here even before anyone adds it to LEGS.
        private = re.compile(r"^def (canonical_json|digest)\(", re.MULTILINE)
        offenders = sorted(
            path.name
            for path in Path(__file__).parent.glob("*.py")
            if path.name != "mw_canonical.py" and private.search(path.read_text(encoding="utf-8"))
        )
        self.assertEqual(offenders, [])

    def test_the_shared_definition_keeps_the_canonical_bytes_of_finite_values(self) -> None:
        self.assertEqual(mw_canonical.canonical_json({"b": 2, "a": [None, True, 1.5, "x"]}), '{"a":[null,true,1.5,"x"],"b":2}')
        self.assertEqual(mw_canonical.canonical_json({"é": "é"}), '{"é":"é"}')
        self.assertTrue(mw_canonical.digest({}).startswith("sha256:"))
        self.assertEqual(mw_canonical.digest({"a": 1, "b": 2}), mw_canonical.digest({"b": 2, "a": 1}))
