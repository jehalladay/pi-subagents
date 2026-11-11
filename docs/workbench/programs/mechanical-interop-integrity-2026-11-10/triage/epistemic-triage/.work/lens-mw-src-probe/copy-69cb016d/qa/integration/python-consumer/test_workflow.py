"""Independent Python consumer: ordinary callbacks, native Forge SDK kept at edge."""
from __future__ import annotations

import unittest
from dataclasses import dataclass
from typing import Awaitable, Callable, Literal

Coverage = Literal["complete", "partial", "unknown"]
Verdict = Literal["passed", "failed", "unknown"]


@dataclass(frozen=True)
class Basis:
    workspace_id: str
    revision: str


@dataclass(frozen=True)
class Scope:
    basis: Basis
    coverage: Coverage


@dataclass(frozen=True)
class Candidate:
    parent: Basis
    basis: Basis


@dataclass(frozen=True)
class Verification:
    basis: Basis
    verdict: Verdict
    operation_id: str | None


@dataclass(frozen=True)
class Services:
    discover: Callable[[Basis], Awaitable[Scope]]
    implement: Callable[[Scope], Awaitable[Candidate]]
    verify: Callable[[Candidate], Awaitable[Verification]]


async def develop(services: Services, basis: Basis) -> Literal["verified", "needs_evidence", "indeterminate"]:
    """A small independent Python use of injected native adapters, not TS parity."""
    if not basis.workspace_id.strip() or not basis.revision.strip():
        raise ValueError("source basis is required")
    scope = await services.discover(basis)
    if scope.basis != basis or scope.coverage != "complete":
        return "needs_evidence"
    candidate = await services.implement(scope)
    if candidate.parent != basis or candidate.basis == basis:
        return "indeterminate"
    verification = await services.verify(candidate)
    if verification.basis != candidate.basis or verification.verdict != "passed" or not verification.operation_id:
        return "indeterminate"
    return "verified"


class PythonConsumerTests(unittest.IsolatedAsyncioTestCase):
    async def test_native_result_with_matching_candidate_can_pass(self) -> None:
        basis = Basis("/repo", "base-1")
        candidate = Candidate(basis, Basis("/repo", "next-1"))

        async def discover(_basis: Basis) -> Scope:
            return Scope(basis, "complete")

        async def implement(_scope: Scope) -> Candidate:
            return candidate

        async def verify(_candidate: Candidate) -> Verification:
            return Verification(candidate.basis, "passed", "op-native")

        self.assertEqual(await develop(Services(discover, implement, verify), basis), "verified")

    async def test_partial_scope_never_invokes_implementer(self) -> None:
        basis = Basis("/repo", "base-1")

        async def discover(_basis: Basis) -> Scope:
            return Scope(basis, "partial")

        async def forbidden(_scope: Scope) -> Candidate:
            self.fail("partial scope invoked implementer")

        async def unused(_candidate: Candidate) -> Verification:
            self.fail("partial scope invoked verifier")

        self.assertEqual(await develop(Services(discover, forbidden, unused), basis), "needs_evidence")

    async def test_native_pass_without_reference_is_indeterminate(self) -> None:
        basis = Basis("/repo", "base-1")
        candidate = Candidate(basis, Basis("/repo", "next-1"))

        async def discover(_basis: Basis) -> Scope:
            return Scope(basis, "complete")

        async def implement(_scope: Scope) -> Candidate:
            return candidate

        async def verify(_candidate: Candidate) -> Verification:
            return Verification(candidate.basis, "passed", None)

        self.assertEqual(await develop(Services(discover, implement, verify), basis), "indeterminate")
