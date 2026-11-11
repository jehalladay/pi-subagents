"""Installed Forge Python SDK one-shot integration: read native gate, never infer PASS."""
from __future__ import annotations

import asyncio
import json
import sys
from pathlib import Path
from typing import Any, Mapping

import forge_sdk

OFFER: Mapping[str, object] = {"protocol": {"major": 1, "min_minor": 0, "max_minor": 0}}


def native_pass(frame: Mapping[str, Any], commit: str) -> bool:
    """Transport completion alone never proves a native gate verdict."""
    nested = frame.get("forge_result")
    if not isinstance(nested, dict):
        return False
    data = nested.get("data")
    envelope = nested.get("envelope")
    if not isinstance(data, dict) or not isinstance(envelope, dict):
        return False
    gated = envelope.get("gated_commit")
    # The installed App Server currently omits inline commit basis: unknown is not PASS.
    return (
        nested.get("status") == "success"
        and data.get("gate_verdict") == "PASS"
        and envelope.get("disposition") == "SUCCEEDED"
        and gated == commit
        and frame.get("terminal_fact") == "completed"
    )


async def gate(root: Path) -> dict[str, object]:
    channel = forge_sdk.AsyncFrameChannel(forge_sdk.spawn_transport())
    async with forge_sdk.AsyncConnection(transport=channel) as connection:
        handshake = await channel.send_and_wait("initialize", OFFER, timeout_seconds=30.0)
        served = dict(handshake.result)
        result = await channel.send_and_wait(
            "gate.run", {"root": str(root), "require_complete": True}, timeout_seconds=180.0
        )
        frame = dict(result.result)
    return {"handshake": served, "frame": frame, "connection_state": connection.state.name}


def main() -> int:
    if len(sys.argv) != 3:
        raise SystemExit("usage: forge_sdk_probe.py CLEAN_FORGE_PACKAGE EXPECTED_COMMIT")
    root = Path(sys.argv[1]).resolve(strict=True)
    commit = sys.argv[2]
    result = asyncio.run(gate(root))
    frame = result["frame"]
    if not isinstance(frame, dict):
        raise RuntimeError("native gate returned no frame")
    output = {
        "mode": "installed-python-forge-sdk",
        "operation_id": frame.get("operation_id"),
        "terminal_fact": frame.get("terminal_fact"),
        "forge_status": frame.get("status"),
        "native_gate_verdict": (frame.get("forge_result") or {}).get("data", {}).get("gate_verdict"),
        "candidate_attributed": native_pass(frame, commit),
        "connection_state": result["connection_state"],
    }
    print(json.dumps(output, sort_keys=True))
    return 0 if output["candidate_attributed"] else 3


if __name__ == "__main__":
    raise SystemExit(main())
