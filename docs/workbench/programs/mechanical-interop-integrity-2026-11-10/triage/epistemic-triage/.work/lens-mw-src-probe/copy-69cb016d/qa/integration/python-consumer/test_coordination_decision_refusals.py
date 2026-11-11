"""Independent Python consumer of the committed mw.coordination-decision.v1 refusal fixture (MechanicalWorkflows-nd1p).

`fixtures/coordination-decision-refusals.json` holds one well-formed base record plus one negative case per refusal the
seat ruled (SIDECAR-VALIDATOR-REFUSAL-1): logProb above 0, blank string members, extra members at every level,
non-string and non-array members, a missing nested object and a non-object record. This leg applies each case and asserts
the committed JSON Schema refuses it for the named keyword, applies each accepted case (logProb 0 and below, the literal
unknown) and asserts the schema admits it, and never imports the TypeScript validator. The TypeScript leg
(coordination-decision-refusals.test.ts) reads the same file and asserts the validator refuses each case with the
named code, so both languages answer from one source.
"""
from __future__ import annotations

import copy
import json
import re
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
FIXTURES = HERE / "fixtures"
SCHEMA = HERE.parents[2] / "packages" / "coordination" / "schema" / "coordination-decision.v1.schema.json"


def is_number(value: object) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def violation(node: dict, value: object) -> str | None:
    """The smallest JSON Schema subset the sidecar schema uses; returns the first violated keyword or None."""
    if "oneOf" in node:
        inner = [violation(branch, value) for branch in node["oneOf"]]
        if any(keyword is None for keyword in inner):
            return None
        return next((keyword for keyword in inner if keyword != "type"), "type")  # the branch past the type check names the cause
    kind = node.get("type")
    checks = {
        "object": isinstance(value, dict),
        "array": isinstance(value, list),
        "string": isinstance(value, str),
        "number": is_number(value),
        "integer": isinstance(value, int) and not isinstance(value, bool),
    }
    if kind in checks and not checks[kind]:
        return "type"
    if "const" in node and value != node["const"]:
        return "const"
    if "enum" in node and value not in node["enum"]:
        return "enum"
    if isinstance(value, str):
        if len(value) < node.get("minLength", 0):
            return "minLength"
        if "pattern" in node and re.search(node["pattern"], value) is None:
            return "pattern"
    if is_number(value) and "maximum" in node and value > node["maximum"]:
        return "maximum"
    if isinstance(value, list):
        if len(value) < node.get("minItems", 0):
            return "minItems"
        if node.get("uniqueItems") is True and len({json.dumps(item, sort_keys=True) for item in value}) != len(value):
            return "uniqueItems"
        if "items" in node:
            for item in value:
                inner = violation(node["items"], item)
                if inner is not None:
                    return inner
    if isinstance(value, dict):
        for key in node.get("required", []):
            if key not in value:
                return "required"
        for key, member in value.items():
            child = node.get("properties", {}).get(key)
            if child is None:
                if node.get("additionalProperties") is False:
                    return "additionalProperties"
                continue
            inner = violation(child, member)
            if inner is not None:
                return inner
    return None


def apply(base: dict, change: dict) -> object:
    record = copy.deepcopy(base)
    if change["op"] == "keep":
        return record
    if not change["path"]:
        return copy.deepcopy(change["value"])
    cursor = record
    for key in change["path"][:-1]:
        cursor = cursor[key]
    if change["op"] == "delete":
        del cursor[change["path"][-1]]
    else:
        cursor[change["path"][-1]] = copy.deepcopy(change["value"])
    return record


class CoordinationDecisionRefusalTests(unittest.TestCase):
    def setUp(self) -> None:
        self.fixture = json.loads((FIXTURES / "coordination-decision-refusals.json").read_text(encoding="utf-8"))
        self.schema = json.loads(SCHEMA.read_text(encoding="utf-8"))

    def test_the_base_record_validates_against_the_schema(self) -> None:
        self.assertIsNone(violation(self.schema, self.fixture["base"]))

    def test_every_refusal_is_refused_by_the_schema_for_the_named_keyword(self) -> None:
        refusals = self.fixture["refusals"]
        self.assertGreaterEqual(len(refusals), 20)
        names = [change["name"] for change in refusals]
        self.assertEqual(len(names), len(set(names)), "case names are unique")
        for change in refusals:
            self.assertEqual(change["code"], "DECISION_SIDECAR_MALFORMED", change["name"])
            self.assertEqual(violation(self.schema, apply(self.fixture["base"], change)), change["schemaKeyword"], change["name"])

    def test_the_closed_logprob_interval_admits_zero_and_below_and_the_unknown_literal(self) -> None:
        accepted = self.fixture["accepted"]
        self.assertGreaterEqual(len(accepted), 4)
        for change in accepted:
            self.assertIsNone(violation(self.schema, apply(self.fixture["base"], change)), change["name"])

    def test_the_committed_landing_queue_records_still_validate(self) -> None:
        landed = json.loads((FIXTURES / "coordination-decisions-landing-queue-seed7.json").read_text(encoding="utf-8"))
        self.assertGreaterEqual(len(landed["decisions"]), 3)
        for record in landed["decisions"]:
            self.assertIsNone(violation(self.schema, record), record["decisionId"])

    def test_the_schema_declares_unique_items_on_vocabulary_and_support(self) -> None:
        self.assertIs(self.schema["properties"]["vocabulary"].get("uniqueItems"), True)
        self.assertIs(self.schema["properties"]["support"].get("uniqueItems"), True)
        unique = sorted(change["name"] for change in self.fixture["refusals"] if change["schemaKeyword"] == "uniqueItems")
        self.assertEqual(unique, ["duplicate-support-entry", "duplicate-vocabulary-entry"])

    def test_the_schema_pins_the_closed_logprob_interval(self) -> None:
        self.assertEqual(self.schema["properties"]["sampled"]["properties"]["logProb"]["oneOf"][0]["maximum"], 0)


if __name__ == "__main__":
    unittest.main()
