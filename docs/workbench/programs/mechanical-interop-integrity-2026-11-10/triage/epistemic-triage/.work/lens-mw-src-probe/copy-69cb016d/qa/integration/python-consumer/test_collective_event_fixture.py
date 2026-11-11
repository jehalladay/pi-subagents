"""Independent Python consumer of the pinned collective.event.v1 projections (collective-adaptation CA-R10).

The TypeScript package projects each exported mw.episode.v1 record to one collective.event.v1 envelope per episode
event and pins the bytes under `fixtures/collective-events-*.json`. This leg re-reads the same bytes in Python:
it re-hashes every committed file to the canonical byte sequence, re-derives every envelope from the
`episode-*.json` export it sits beside (event ids, actor, producer revision, subject, causal parents, evidence
references), and validates each envelope against the committed JSON Schema, without importing the TypeScript
implementation.
"""
from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

from mw_canonical import canonical_json, digest

FIXTURES = Path(__file__).parent / "fixtures"
SCHEMA = Path(__file__).parents[3] / "packages" / "coordination" / "schema" / "collective.event.v1.schema.json"
NAMES = [
    "landing-queue-seed7",
    "compaction-inheritance-seed7",
    "colony-resilience-seed29",
    "artifact-recovery-seed7",
    "quorum-evidence-independent-seed7",
    "replay-native-receipts",
]


def violations(value: object, node: dict, path: str = "") -> list[str]:
    """The keywords collective.event.v1.schema.json uses: const, type, pattern, minLength, required, properties, additionalProperties, items."""
    out: list[str] = []
    if "const" in node and value != node["const"]:
        out.append(f"{path or '/'}: expected const {node['const']!r}")
    kind = node.get("type")
    if kind == "string":
        if not isinstance(value, str):
            return out + [f"{path or '/'}: expected string"]
        if len(value) < node.get("minLength", 0):
            out.append(f"{path}: too short")
        if "pattern" in node and not re.fullmatch(node["pattern"], value):
            out.append(f"{path}: pattern")
    elif kind == "array":
        if not isinstance(value, list):
            return out + [f"{path or '/'}: expected array"]
        for index, member in enumerate(value):
            out.extend(violations(member, node["items"], f"{path}/{index}"))
    elif kind == "object":
        if not isinstance(value, dict):
            return out + [f"{path or '/'}: expected object"]
        for key in node.get("required", []):
            if key not in value:
                out.append(f"{path}/{key}: required member missing")
        for key, member in value.items():
            child = node.get("properties", {}).get(key)
            if child is None:
                if node.get("additionalProperties") is False:
                    out.append(f"{path}/{key}: unexpected member")
                continue
            out.extend(violations(member, child, f"{path}/{key}"))
    return out


class CollectiveEventFixtureTests(unittest.TestCase):
    def pairs(self):
        for name in NAMES:
            episode = json.loads((FIXTURES / f"episode-{name}.json").read_text(encoding="utf-8"))
            raw = (FIXTURES / f"collective-events-{name}.json").read_text(encoding="utf-8")
            yield name, episode, raw, json.loads(raw)

    def test_committed_bytes_are_the_canonical_form_with_one_final_newline(self) -> None:
        for name, _episode, raw, events in self.pairs():
            self.assertEqual(raw, canonical_json(events) + "\n", name)

    def test_every_envelope_validates_against_the_committed_schema(self) -> None:
        schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
        self.assertEqual(sorted(schema["required"]), sorted(schema["properties"]))
        for name, _episode, _raw, events in self.pairs():
            self.assertTrue(events, name)
            for event in events:
                self.assertEqual(violations(event, schema), [], f"{name} {event.get('event_id')}")
        good = json.loads((FIXTURES / "collective-events-landing-queue-seed7.json").read_text(encoding="utf-8"))[0]
        self.assertTrue(violations({**good, "extra": 1}, schema))
        self.assertTrue(violations({**good, "authority": "authoritative"}, schema))
        self.assertTrue(violations({**good, "producer_revision": "sha256:xyz"}, schema))
        self.assertTrue(violations({**good, "causal_parents": None}, schema))

    def test_a_newline_suffixed_identity_member_is_refused_as_the_typescript_validator_refuses_it(self) -> None:
        # Python's `$` matches before a trailing newline, so a bare re.search accepts "id\n"; the validator must match the whole string.
        schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
        good = json.loads((FIXTURES / "collective-events-landing-queue-seed7.json").read_text(encoding="utf-8"))[0]
        self.assertEqual(violations(good, schema), [])
        for member in ("episode_id", "event_id", "actor_id", "producer_revision"):
            with self.subTest(member=member):
                self.assertEqual(violations({**good, member: good[member] + "\n"}, schema), [f"/{member}: pattern"])
        self.assertEqual(violations({**good, "causal_parents": [good["event_id"] + "\n"]}, schema), ["/causal_parents/0: pattern"])

    def test_one_envelope_per_episode_event_with_the_derived_identity_members(self) -> None:
        for name, episode, _raw, events in self.pairs():
            self.assertEqual(len(events), len(episode["events"]), name)
            record = {
                "module": "@mechanical/workflows-coordination/collective-event",
                "episodeSchema": episode["schema"],
                "episodeVersion": episode["version"],
                "policy": f"{episode['policy']['id']}@{episode['policy']['revision']}",
                "configHash": episode["policy"]["configHash"],
            }
            for index, (event, source) in enumerate(zip(events, episode["events"]), start=1):
                self.assertEqual(event["schema"], "collective.event.v1", name)
                self.assertEqual(event["episode_id"], episode["episodeId"], name)
                self.assertEqual(event["event_id"], f"{episode['episodeId']}/event:{index}", name)
                self.assertEqual(event["actor_id"], f"policy:{episode['policy']['id']}@{episode['policy']['revision']}", name)
                self.assertEqual(event["producer_revision"], digest(record), name)
                self.assertEqual(event["status"], "observed", name)
                self.assertEqual(event["authority"], "observation-only", name)
                self.assertEqual(event["subject"]["revision"], episode["task"]["basis"], name)
                expected_uri = "unknown" if source["subject"] == "unknown" else f"mw:{episode['environment']}/{source['subject']}"
                self.assertEqual(event["subject"]["uri"], expected_uri, name)
                self.assertTrue(event["episode_id"].startswith(episode["mode"] + ":"), name)

    def test_native_receipts_are_retained_in_every_envelope(self) -> None:
        for name, episode, _raw, events in self.pairs():
            for event, source in zip(events, episode["events"]):
                cited = [ref for decision in episode["decisions"] if decision["step"] == source["step"] for ref in decision["provenance"]]
                expected = sorted({episode["verifier"]["receiptDigest"], *cited})
                self.assertEqual(event["evidence_refs"], expected, f"{name} {event['event_id']}")

    def test_causal_parents_are_the_previous_event_on_the_same_known_subject(self) -> None:
        for name, episode, _raw, events in self.pairs():
            last: dict[str, str] = {}
            for event, source in zip(events, episode["events"]):
                subject = source["subject"]
                expected = [last[subject]] if subject != "unknown" and subject in last else []
                self.assertEqual(event["causal_parents"], expected, f"{name} {event['event_id']}")
                if subject != "unknown":
                    last[subject] = event["event_id"]


if __name__ == "__main__":
    unittest.main()
