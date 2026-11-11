"""Independent Python consumer of the pinned mw.evaluation.composition-tree.v1 record (collective-adaptation M3, CA-R6).

The TypeScript `treeConfiguration` hashes a typed composition tree over fixed policies and pins the record under
`fixtures/evaluation-composition-tree.json`. This leg re-reads the same bytes without importing the TypeScript
implementation: it recomputes every leaf configuration hash, re-checks the operator arity and the protected-reference
rule over the recorded tree, and recomputes the tree configuration hash from the canonical tree.
"""
from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURE = Path(__file__).parent / "fixtures" / "evaluation-composition-tree.json"
HASH = re.compile(r"^sha256:[0-9a-f]{64}$")
PROTECTED = re.compile(r"^(verifier:|verdict:|receipt:|protected:|authority:|graph:protected:|effect:verify$|effect:authorize$)")
CHILDREN = {
    "policy": [],
    "sequential": ["first", "then"],
    "parallel": ["left", "right"],
    "guarded": ["first", "then"],
    "alternative": ["left", "right"],
    "inhibit": ["control", "subject"],
}
DECLARED = {"guarded": "guard", "alternative": "selector"}
MAX_DEPTH = 16


def walk(node: dict, depth: int = 0):
    """Yield every node of the canonical tree, enforcing the operator set, the arity and the depth bound."""
    assert depth <= MAX_DEPTH, "tree nests deeper than the bound"
    assert node["op"] in CHILDREN, f"unknown operator {node['op']}"
    yield node
    for key in CHILDREN[node["op"]]:
        yield from walk(node[key], depth + 1)


class EvaluationCompositionTreeTests(unittest.TestCase):
    def setUp(self) -> None:
        self.raw = FIXTURE.read_text(encoding="utf-8")
        self.record = json.loads(self.raw)
        self.tree = self.record["provenance"]["tree"]

    def test_committed_bytes_are_the_canonical_form_with_one_final_newline(self) -> None:
        self.assertEqual(self.raw, canonical_json(self.record) + "\n")
        self.assertEqual(self.record["schema"], "mw.evaluation.composition-tree.v1")

    def test_leaf_configuration_hashes_recompute_from_their_policies(self) -> None:
        self.assertTrue(self.record["leaves"])
        for leaf in self.record["leaves"]:
            expected = digest({"id": leaf["id"], "revision": leaf["revision"], "kind": "fixed", "policies": leaf["policies"]})
            self.assertEqual(leaf["configHash"], expected)

    def test_every_tree_leaf_names_a_recorded_fixed_configuration(self) -> None:
        recorded = {leaf["configHash"] for leaf in self.record["leaves"]}
        leaves = [node for node in walk(self.tree) if node["op"] == "policy"]
        self.assertTrue(leaves)
        for node in leaves:
            self.assertRegex(node["configHash"], HASH)
            self.assertIn(node["configHash"], recorded)

    def test_the_tree_uses_the_known_operators_and_names_no_protected_reference(self) -> None:
        operators = {node["op"] for node in walk(self.tree)}
        self.assertEqual(operators, set(CHILDREN))
        for node in walk(self.tree):
            if node["op"] in DECLARED:
                declared = node[DECLARED[node["op"]]]
                self.assertTrue(declared["id"] and declared["revision"])
            if "references" in node:
                self.assertEqual(node["references"], sorted(set(node["references"])))
                for name in node["references"]:
                    self.assertIsNone(PROTECTED.match(name), name)

    def test_configuration_hash_is_the_digest_of_the_canonical_tree(self) -> None:
        self.assertRegex(self.record["configHash"], HASH)
        self.assertEqual(self.record["provenance"]["kind"], "composition")
        self.assertEqual(self.record["provenance"]["combinator"], "tree")
        expected = digest({"id": self.record["id"], "revision": self.record["revision"], "kind": "composition", "tree": self.tree})
        self.assertEqual(self.record["configHash"], expected)

    def test_a_changed_child_order_changes_the_hash(self) -> None:
        swapped = json.loads(json.dumps(self.tree))
        swapped["then"]["left"], swapped["then"]["right"] = swapped["then"]["right"], swapped["then"]["left"]
        changed = digest({"id": self.record["id"], "revision": self.record["revision"], "kind": "composition", "tree": swapped})
        self.assertNotEqual(changed, self.record["configHash"])


if __name__ == "__main__":
    unittest.main()
