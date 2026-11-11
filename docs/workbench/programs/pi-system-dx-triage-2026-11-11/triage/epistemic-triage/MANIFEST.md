# MANIFEST — system DX/UX/LX epistemic-adversarial-triage of Pi-subagents
Pinned: 2026-11-11T03:48:55Z

## Substrate (environment pin = audit target)
- Pi-subagents @tintinweb/pi-subagents v0.20.0 at workbench/implementation-program ce180d82f9385a315ff26bd8e7f9202cac19f5b3 (= L1088 hop; worktree pin-ce180d82). Master 0fb9067262532289104417d2b7f2f25704563a75 noted for drift.
- The "system" under audit: the full agent/operator-facing surface — every registered tool, command, agent type, setting, env var, the TUI inspector, the qa/ scripts, skills (.agents/skills), docs/workbench promises (feature matrix W01-W22, VC-1..7) — audited along DX / UX / LX (LLM-agent experience), QoL, friction, gaps, missing requirements, stubbed implementations.
- Instruments (user-ordered): the hx (HyperUnix) CLI for typed code/census queries; the rf (ReactiveFiberCLI) CLI where context tooling is concerned and as a probe target for the rf provider family. hx 0.1.0 and rf (89 leaves) verified on PATH.
- Audit-side execution evidence: build + tests run in the pinned worktree (never the live checkout).

## Question
Where does the system's experienced surface fall short of its promises and of good agent/operator experience — and what atomic requirements (EAT-R311+) cure that?

## Prior requirement lineage
EAT-R001-144 (mwi-11-04), R145-200 (audit-11-06), R201-310 (mni-11-09). This audit continues at EAT-R311.

## Durable location
Committed to Pi-subagents origin/master under docs/workbench/programs/pi-system-dx-triage-2026-11-11/{triage/epistemic-triage,requirements}/ (delivery = the push); beads in the ledger-in-repo store under a new epic. Scratch purged by host cleaner.

## Phase 9 gate — 2026-11-11T07:58:40Z
Gate script: .work/phase9-gate.py (python3 -I; fail-closed). Exit 0 (PASS).
Census: 267 rows graded (240 ESTABLISHED / 26 SUPPORTED / 1 PLAUSIBLE); anchored-missing 0, self-referential 0, string-shaped 0, duplicate-wording 0, absent-deliverable 0, unreadable 0. No arbitration entries -> no ARBITRATION file owed.
Note: first gate run failed 3 rows (C073/C074/C130) on an instrument defect — the gate regex's extension alternation matched '.js' as a prefix of '.json'; fixed in the gate (longest-first + word-boundary), all three evidence files verified on disk. Attribution: instrument, not subject.
Requirement roll-up: REQUIREMENTS-AUDIT verdict CONDITIONAL cured by requirements/REQUIREMENTS.md roll-up (F-01..F-15 executed; EAT-R471..R488 minted; R345 held A*(G-RULING) under the 2026-11-11 owner ruling; checkers rc=0).
