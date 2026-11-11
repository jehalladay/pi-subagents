# 08 — MicroPolicyCLI adapter and training boundary

## Current source status
MicroPolicyCli README at 9d51a8c6ed08 (2026-10-19T00:41Z; local checkout commit, not yet on the public remote, whose main is 69cdf79577a9 of 2026-10-18T13:49Z) reports M0 categorical linear-softmax policy, deterministic seeded sampling, behavior log-prob, REINFORCE; M1a portable artifacts and local worker; M1b scalar circuit and feedback; M1c opt-in pinned Handwired lowering/checkpoint lifecycle. It does not claim full Handwired test or live multi-agent credit. This document uses only public installed methods once verified, and labels other shapes TARGET.

## Workflow
Feature encoder maps versioned evidence to finite numerical vector and explicit missingness masks. LegalActionProjection computes pre-sampling support with revision. MP evaluates/samples and returns immutable decision with model checkpoint, per-action probabilities and eligible support (selection.choices entries carry action, eligible and an exact probability bit word; decision-receipt.v1 at 9d51a8c6ed08 records no raw pre-softmax score vector), sample seed/stream and behavior log probability. MW adapter maps symbolic choice to Intent with target/revision/claim/evidence. Existing reconcile rejects duplicate, authority, stale, protected, conflicting and over-budget intents only; at 19ca8d4 it admits NaN/negative claims and checks no effect/target vocabulary, evidenceRefs or read rights — those are adapter/host TARGET obligations. Native host executes. Finalized outcome collector produces MP training examples after eligibility assessment.

## Sidecar (target)
mw.coordination-decision.v1 records graph/actor/node IDs, observation and read witness, policy program/checkpoint, action vocabulary, legal action IDs, sampled ID/logProb, RNG, private prestate/memory revision, intent ID and native outcome correlation. Store as explicit typed immutable sidecar, not JSON escaped in TraceEvent.detail. Existing mw.episode.v1 and training-export.v1 remain backward-compatible; the existing 'admitted/rejected mask' is *not* behavior-support.

## Two execution modes
Direct in-process MP function where available. For subprocess Python/Node or external model, precompute fixed decision outside pure Policy.propose and inject it as a value. Synchronous policy never awaits arbitrary worker or opens resource. Reject basis/checkpoint mismatch rather than silently resampling. A basis/checkpoint mismatch is a refusal and never carries decisionSource fallback; the deterministic fallback is defined once at 04 L16 (decisionSource fallback with a pre-declared fallbackPolicy id@revision) and applies only to evaluator unavailability.

## Learning
Initial one-step on-policy actor with fixed prestate; host computes reward from the verified outcome, and the baseline must not depend on the sampled action (caller-owned, unverified precondition; MP README L12, ADR-011); the host asks MP for update; gradients belong to MP. Later delayed multi-policy objectives require explicit actor-specific likelihood and causal evidence; the MP core must remain independently reusable. Distinguish post-rejection coordination reward from executed native reward.

## QA
Deterministic fixture parity against MW existing policies, rejection and stale input, empty/invalid action support, shared-sample versus resample, exact two-policy claim probabilities/gradients, checkpoint pin, input-range/nonfinite rejection, M1c opt-in Handwired conformance. Do not mislabel synthetic outcome as Forge PASS.
