"""Independent Python consumer of the committed replay tape and its replay-labelled episode (M2 follow-on).

`fixtures/replay-tape-native-receipts.json` holds recorded native receipts (Forge gate results and a Furnace
envelope) copied from `qa/integration/evidence`. `fixtures/episode-replay-native-receipts.json` is the
`mw.episode.v1` episode the TypeScript replay adapter exports from it. This leg re-reads both files in Python,
re-hashes them to the canonical bytes, and recomputes the tape digest, the checkpoint chain, the events and the
verifier verdict from the tape alone, without importing the TypeScript implementation. Replay never reaches a
live label, and a recorded failure stays a failure.
"""
from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURES = Path(__file__).parent / "fixtures"
EVIDENCE = Path(__file__).parents[1] / "evidence"
TAPE = "replay-tape-native-receipts.json"
EPISODE = "episode-replay-native-receipts.json"
HASH = re.compile(r"^sha256:[0-9a-f]{64}$")
FORGE_VERDICT = {"passed": "PASS", "failed": "FAIL", "indeterminate": "COULD_NOT_JUDGE"}


def contains_null(value: object) -> bool:
    if value is None:
        return True
    if isinstance(value, list):
        return any(contains_null(member) for member in value)
    if isinstance(value, dict):
        return any(contains_null(member) for member in value.values())
    return False


def project(entry: dict) -> tuple[str, bool]:
    """Status and certified flag from the native receipt alone (forge and furnace are the systems the tape carries)."""
    native = entry["native"]
    if entry["system"] == "forge":
        status = FORGE_VERDICT[native["kind"]]
        return status, status == "PASS" and native["basis"]["clean"] is True
    if entry["system"] == "furnace":
        state = native["data"]["state"]
        return state, native["ok"] is True and state == "completed"
    raise AssertionError(f"unexpected system {entry['system']}")


def applied(tape: dict) -> list[dict]:
    """Apply entries in tape order, dropping a byte-identical repeat of an id already applied."""
    seen: dict[str, str] = {}
    out: list[dict] = []
    for entry in tape["entries"]:
        bytes_ = canonical_json(entry)
        if entry["id"] in seen:
            assert seen[entry["id"]] == bytes_, f"conflicting reuse of {entry['id']}"
            continue
        seen[entry["id"]] = bytes_
        out.append(entry)
    return out


class ReplayFixtureTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tape_raw = (FIXTURES / TAPE).read_text(encoding="utf-8")
        self.episode_raw = (FIXTURES / EPISODE).read_text(encoding="utf-8")
        self.tape = json.loads(self.tape_raw)
        self.episode = json.loads(self.episode_raw)

    def test_committed_bytes_are_the_canonical_form_with_one_final_newline(self) -> None:
        self.assertEqual(self.tape_raw, canonical_json(self.tape) + "\n")
        self.assertEqual(self.episode_raw, canonical_json(self.episode) + "\n")

    def test_tape_receipts_are_the_committed_evidence_receipts_verbatim(self) -> None:
        by_id = {entry["id"]: entry["native"] for entry in self.tape["entries"]}
        for entry_id, name in (("forge-verify-fail", "2026-10-15-live-verify-fail.json"), ("forge-verify-pass", "2026-10-15-live-verify-pass.json")):
            self.assertEqual(canonical_json(by_id[entry_id]), canonical_json(json.loads((EVIDENCE / name).read_text(encoding="utf-8"))["result"]), entry_id)
        first_line = (EVIDENCE / "2026-10-15-furnace-completed.json").read_text(encoding="utf-8").split("\n")[0]
        self.assertEqual(canonical_json(by_id["furnace-completed"]), canonical_json(json.loads(first_line)))

    def test_episode_is_labelled_replay_and_never_live_with_sanitize_run_and_no_null(self) -> None:
        episode = self.episode
        self.assertEqual(episode["schema"], "mw.episode.v1")
        self.assertEqual(episode["version"], 1)
        self.assertEqual(episode["mode"], "replay")
        self.assertEqual(episode["verifier"]["label"], "replay")
        self.assertEqual(episode["environment"], "native-replay")
        self.assertEqual(episode["sanitize"]["ran"], True)
        self.assertIsInstance(episode["sanitize"]["removed"], list)
        self.assertFalse(contains_null(episode), "an unknown value was serialised as null")
        for label in ("live", "live-verified"):
            self.assertNotIn(label, (episode["mode"], episode["verifier"]["label"]))
        self.assertEqual(episode["source"], {"schema": self.tape["schema"], "seed": self.tape["seed"]})
        self.assertEqual(episode["episodeId"], f"replay:native-replay:{self.tape['seed']}:{self.tape['tapeId']}")

    def test_receipt_digest_and_checkpoint_chain_recompute_from_the_tape(self) -> None:
        self.assertEqual(self.episode["verifier"]["receiptDigest"], digest(self.tape))
        chain = digest({"tape": self.tape["tapeId"]})
        expected = []
        for entry in applied(self.tape):
            chain = digest({"prev": chain, "entry": entry["id"], "native": digest(entry["native"])})
            expected.append(chain)
        self.assertEqual(self.episode["checkpoints"], expected)
        for checkpoint in self.episode["checkpoints"]:
            self.assertRegex(checkpoint, HASH)

    def test_events_verdict_and_cost_recompute_and_the_recorded_failure_stays_a_failure(self) -> None:
        entries = applied(self.tape)
        events = []
        statuses = {}
        for index, entry in enumerate(entries):
            status, certified = project(entry)
            statuses[entry["id"]] = (status, certified)
            events.append({
                "step": index,
                "kind": f"{entry['system']}.{entry['kind']}",
                "subject": entry["subject"],
                "detail": f"status={status} certified={'true' if certified else 'false'} native={digest(entry['native'])}",
            })
        self.assertEqual(self.episode["events"], events)
        self.assertEqual(self.episode["verifier"]["verdict"], f"applied={len(entries)},conflicts=0")
        self.assertEqual(self.episode["cost"]["steps"], len(entries))
        self.assertEqual(self.episode["cost"]["budgetSpent"], {"compute": 0, "workers": 0, "queue": 0, "latencyMs": 0})
        self.assertEqual(statuses["forge-verify-fail"], ("FAIL", False))
        self.assertEqual(statuses["forge-verify-pass"], ("PASS", True))
        self.assertEqual(statuses["furnace-completed"], ("completed", True))
        self.assertLess(len(entries), len(self.tape["entries"]), "the tape carries a byte-identical duplicate that replay drops")

    def test_unknown_is_the_literal_wherever_a_replay_has_no_value(self) -> None:
        self.assertEqual(self.episode["attempts"], "unknown")
        self.assertEqual(self.episode["artifacts"], {"created": "unknown", "consumed": "unknown"})
        self.assertEqual(self.episode["cost"]["environmentCost"], "unknown")
        self.assertEqual(self.episode["decisions"], [])


    def test_task_policy_and_roles_recompute_from_the_tape(self) -> None:
        basis = self.tape["basis"]
        self.assertEqual(self.episode["task"], {"basis": f"{basis['workspaceId']}@{basis['revision']}", "family": "native-replay"})
        self.assertEqual(self.episode["policy"], {"id": "replay-adapter", "revision": "1", "configHash": digest({"policies": ["replay-adapter@1"]})})
        self.assertEqual(self.episode["roles"], ["adapter"])

    def test_arms_are_the_unknown_literal_for_a_replay(self) -> None:
        self.assertEqual(self.episode["arms"], {"controlId": "unknown", "treatmentId": "unknown"})

    def test_episode_carries_exactly_the_mw_episode_v1_members(self) -> None:
        self.assertEqual(sorted(self.episode), ["arms", "artifacts", "attempts", "checkpoints", "cost", "decisions", "environment", "episodeId", "events", "initialCheckpoint", "mode", "policy", "roles", "sanitize", "schema", "source", "task", "verifier", "version"])

    def test_initial_checkpoint_is_the_explicit_unknown_because_a_tape_holds_no_initial_state(self) -> None:
        self.assertEqual(self.episode["initialCheckpoint"], "unknown")

    def test_verifier_carries_exactly_label_receipt_digest_and_verdict(self) -> None:
        self.assertEqual(sorted(self.episode["verifier"]), ["label", "receiptDigest", "verdict"])

    def test_cost_carries_exactly_budget_spent_environment_cost_and_steps(self) -> None:
        self.assertEqual(sorted(self.episode["cost"]), ["budgetSpent", "environmentCost", "steps"])


if __name__ == "__main__":
    unittest.main()
