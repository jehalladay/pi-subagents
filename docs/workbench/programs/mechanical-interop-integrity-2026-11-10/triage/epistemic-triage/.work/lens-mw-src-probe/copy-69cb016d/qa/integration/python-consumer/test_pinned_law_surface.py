"""The pinned law surface stays unmodified as the GP integration grows (GPC-EAT-R016, clause one).

The Policy and reconcile laws are exactly the committed coordination tests, and the Python consumer legs read the
committed fixtures. The GP integration may add new files beside them and must never edit or delete a pre-existing one.
`pinned-law-surface.json` records, at the base it names, the sha256 of every fixture file and the sorted declared
names of every column-zero test in every coordination test file. This leg re-reads the working tree and fails when a
pinned fixture changed or vanished, when a pinned test file vanished, or when a pinned test name left its file.
New files and new tests pass: the surface is additive-only, which is the claim.

The surface check is a function over a root path so a negative control can copy the tree, damage one pin and watch
the check name it. The five committed training exports are pinned by name here as well, so their digests keep
re-hashing in `test_training_export.py` against bytes that cannot drift unnoticed.
"""
from __future__ import annotations

import hashlib
import json
import re
import shutil
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2]
MANIFEST = HERE / "pinned-law-surface.json"
FIXTURES = Path("qa/integration/python-consumer/fixtures")
TESTS = Path("packages/coordination/test")
TEST_NAME = re.compile(r"^test\(\s*([\"'`])((?:\\.|(?!\1).)*)\1", re.MULTILINE)
TRAINING = [
    "training-landing-queue-seed7.json",
    "training-compaction-inheritance-seed7.json",
    "training-colony-resilience-seed29.json",
    "training-artifact-recovery-seed7.json",
    "training-quorum-evidence-independent-seed7.json",
]


def load_manifest() -> dict:
    return json.loads(MANIFEST.read_text(encoding="utf-8"))


def surface_breaks(root: Path, manifest: dict) -> list[str]:
    """Return one line per pinned fixture or test that the tree under `root` modified or removed."""
    breaks: list[str] = []
    for name, pinned in sorted(manifest["fixtures"].items()):
        path = root / FIXTURES / name
        if not path.is_file():
            breaks.append(f"fixture removed: {name}")
        elif hashlib.sha256(path.read_bytes()).hexdigest() != pinned:
            breaks.append(f"fixture modified: {name}")
    for file_name, names in sorted(manifest["tests"].items()):
        path = root / TESTS / file_name
        if not path.is_file():
            breaks.append(f"test file removed: {file_name}")
            continue
        declared = {match.group(2) for match in TEST_NAME.finditer(path.read_text(encoding="utf-8"))}
        for name in names:
            if name not in declared:
                breaks.append(f"test removed or renamed in {file_name}: {name}")
    return breaks


class PinnedLawSurfaceTests(unittest.TestCase):
    def test_the_pinned_surface_is_the_whole_committed_base_not_a_sample(self) -> None:
        manifest = load_manifest()
        self.assertEqual(manifest["schema"], "mw.pinned-law-surface.v1")
        self.assertRegex(manifest["base"], r"^[0-9a-f]{40}$")
        self.assertGreaterEqual(len(manifest["fixtures"]), 32)
        self.assertGreaterEqual(len(manifest["tests"]), 38)
        self.assertGreaterEqual(sum(len(names) for names in manifest["tests"].values()), 474)
        for name, digest in manifest["fixtures"].items():
            self.assertRegex(digest, r"^[0-9a-f]{64}$", name)
        for file_name, names in manifest["tests"].items():
            self.assertTrue(names, f"{file_name} pins no test")
            self.assertEqual(names, sorted(names), file_name)
            self.assertEqual(len(names), len(set(names)), f"{file_name} pins a name twice")

    def test_every_training_export_is_pinned_by_name_and_byte_digest(self) -> None:
        pinned = load_manifest()["fixtures"]
        for name in TRAINING:
            self.assertIn(name, pinned)
        committed = sorted(path.name for path in (REPO / FIXTURES).glob("training-*.json"))
        self.assertEqual(sorted(TRAINING), [name for name in committed if name in TRAINING])
        for name in committed:
            self.assertIn(name, pinned, f"{name} is a committed training export missing from the pinned surface")

    def test_no_pinned_fixture_or_law_test_is_modified_or_removed_in_the_working_tree(self) -> None:
        self.assertEqual(surface_breaks(REPO, load_manifest()), [])

    def test_negative_control_a_changed_removed_or_renamed_pin_is_named(self) -> None:
        manifest = load_manifest()
        with tempfile.TemporaryDirectory() as scratch:
            root = Path(scratch)
            (root / FIXTURES).mkdir(parents=True)
            (root / TESTS).mkdir(parents=True)
            for name in manifest["fixtures"]:
                shutil.copyfile(REPO / FIXTURES / name, root / FIXTURES / name)
            for file_name in manifest["tests"]:
                shutil.copyfile(REPO / TESTS / file_name, root / TESTS / file_name)
            self.assertEqual(surface_breaks(root, manifest), [])

            fixture = "training-landing-queue-seed7.json"
            with (root / FIXTURES / fixture).open("ab") as handle:
                handle.write(b" ")
            self.assertEqual(surface_breaks(root, manifest), [f"fixture modified: {fixture}"])
            (root / FIXTURES / fixture).unlink()
            self.assertEqual(surface_breaks(root, manifest), [f"fixture removed: {fixture}"])
            shutil.copyfile(REPO / FIXTURES / fixture, root / FIXTURES / fixture)

            law = "combinators.test.ts"
            victim = manifest["tests"][law][0]
            text = (root / TESTS / law).read_text(encoding="utf-8")
            (root / TESTS / law).write_text(text.replace(f'test("{victim}"', 'test("renamed"', 1), encoding="utf-8")
            self.assertEqual(surface_breaks(root, manifest), [f"test removed or renamed in {law}: {victim}"])
            (root / TESTS / law).unlink()
            self.assertEqual(surface_breaks(root, manifest), [f"test file removed: {law}"])

    def test_negative_control_new_files_and_new_tests_do_not_break_the_surface(self) -> None:
        manifest = load_manifest()
        with tempfile.TemporaryDirectory() as scratch:
            root = Path(scratch)
            (root / FIXTURES).mkdir(parents=True)
            (root / TESTS).mkdir(parents=True)
            for name in manifest["fixtures"]:
                shutil.copyfile(REPO / FIXTURES / name, root / FIXTURES / name)
            for file_name in manifest["tests"]:
                shutil.copyfile(REPO / TESTS / file_name, root / TESTS / file_name)
            (root / FIXTURES / "training-new-family-seed1.json").write_text("{}\n", encoding="utf-8")
            (root / TESTS / "added-later.test.ts").write_text('test("a new law", () => {});\n', encoding="utf-8")
            with (root / TESTS / "combinators.test.ts").open("a", encoding="utf-8") as handle:
                handle.write('\ntest("an appended law", () => {});\n')
            self.assertEqual(surface_breaks(root, manifest), [])


if __name__ == "__main__":
    unittest.main()
