"""The shared Python canonical JSON spells every finite double the way the TypeScript `canonicalJson` does (TW-EAT-R004 follow-up).

`json.dumps` spells -1e-7 as -1e-07 and 5.0 as 5.0, while `JSON.stringify` (ECMAScript Number toString) spells them -1e-7 and 5.
A Python re-derivation of any fixture holding a finite double below 1e-6 in magnitude, at or above 1e21, or with an integral
float value therefore hashed apart from the TypeScript digest. The TypeScript spelling is the reference; the pinned table in
fixtures/canonical-number-spellings.json is read by this test and by packages/coordination/test/canonical-number-spellings.test.ts.
"""
from __future__ import annotations

import json
import unittest
from pathlib import Path

import mw_canonical

FIXTURES = Path(__file__).parent / "fixtures"
TABLE = json.loads((FIXTURES / "canonical-number-spellings.json").read_text(encoding="utf-8"))
CONTROL = FIXTURES / "synthetic-logprob-control-landing-queue-seed7.json"


class CanonicalNumberSpellingTests(unittest.TestCase):
    def test_the_pinned_table_has_the_edge_doubles(self) -> None:
        self.assertEqual(TABLE["schema"], "mw.canonical-number-spellings.v1")
        inputs = {row["input"] for row in TABLE["rows"]}
        for edge in ("1e-7", "1e21", "123456789012345680000", "-0.0", "5e-324", "1.7976931348623157e308"):
            self.assertIn(edge, inputs)

    def test_a_small_negative_exponent_drops_the_zero_padding(self) -> None:
        self.assertEqual(mw_canonical.canonical_json({"x": -1e-7}), '{"x":-1e-7}')

    def test_every_pinned_row_spells_like_the_typescript_reference(self) -> None:
        for row in TABLE["rows"]:
            with self.subTest(input=row["input"]):
                value = json.loads('{"x":' + row["input"] + "}")
                self.assertEqual(mw_canonical.canonical_json(value), '{"x":' + row["canonical"] + "}")

    def test_the_spelling_applies_at_any_depth_and_never_touches_strings_or_keys(self) -> None:
        value = {"1e-07": "1e-07 and 5.0", "a": [{"b": 1e-7, "c": [5.0, 1e21]}], "d": "say \"2.5e-07\""}
        self.assertEqual(
            mw_canonical.canonical_json(value),
            '{"1e-07":"1e-07 and 5.0","a":[{"b":1e-7,"c":[5,1e+21]}],"d":"say \\"2.5e-07\\""}',
        )

    def test_integers_booleans_and_null_keep_their_bytes(self) -> None:
        self.assertEqual(mw_canonical.canonical_json([0, -3, 10**15, True, False, None]), "[0,-3,1000000000000000,true,false,null]")

    def test_non_finite_numbers_still_refuse(self) -> None:
        for value in (float("nan"), float("inf"), float("-inf"), {"x": [float("nan")]}):
            with self.assertRaises(ValueError):
                mw_canonical.canonical_json(value)

    def test_the_synthetic_logprob_control_is_its_own_canonical_form_and_its_export_digest_re_derives(self) -> None:
        raw = CONTROL.read_text(encoding="utf-8")
        parsed = json.loads(raw)
        self.assertEqual(mw_canonical.canonical_json(parsed) + "\n", raw)
        recorded = parsed["export"]["digest"]
        body = {key: value for key, value in parsed["export"].items() if key != "digest"}
        self.assertEqual(mw_canonical.digest(body), recorded)
        self.assertTrue(any(isinstance(step["logProb"], float) for step in parsed["export"]["steps"]))


if __name__ == "__main__":
    unittest.main()
