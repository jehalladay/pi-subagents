# Recorded fetch — CAC and CVIC sources (CACWC-EAT-R005, MechanicalWorkflows-eymu)

Fetched 2026-10-19 (~20:14Z) via isolated blob-filtered authenticated clone of
https://github.com/jehalladay/research (the 2026-10-18 unreachability was unauthenticated access;
authenticated `git ls-remote` returns rc 0). Revision pinned: origin/main HEAD
`0e0b10ac7894cb18bfb99fdcc62085b056bd2946`. The CACWC README L7 link pin
`130e21b7a8f736263643967cf6f4eb579dcb1258` is an ancestor of this revision
(`git merge-base --is-ancestor` rc 0), so the reading citation and this fetch cohere.
CAC 0.1–0.3 remain hand-derived drafts (readable copy: jehalladay/Library
docs/theory/compositional-autonomous-computation @ff9a8e1 — a reading citation only; MW-004 forbids
any Library code dependency, and none is introduced).

Per-document record at `0e0b10ac7894cb18bfb99fdcc62085b056bd2946` (sha256 of file bytes):

| path | sha256 |
| --- | --- |
| programs/compositional-autonomous-computation/00-charter.md | 265e7f8c09508b03ce69b9e8901413502ea5a1f154c75f051ae40aa7834b1b54 |
| programs/compositional-autonomous-computation/01-semantics.md (CAC capability contract; 'Contractual sequential composition' carries the CAC 0.1–0.3 fragment, L24 names CAC 0.3 theorem A1) | 7b73adc0e5c3f5044d7c90d2116ec423bb879ccc7a6f04b8d1d3e7adac9db331 |
| lean/ResearchFormal/CVIC/Quotient.lean (CVIC) | c8637b88a615f60b2c3c4a191bf308c23666dbf1c20cee21d3abf8d1e8ed6ad9 |
| lean/ResearchFormal/CVIC/TraceQuotient.lean (CVIC) | 3bc8007f67e5be67f9598c41aabd48fd332b61fcaaa942750c1c5a558b37b1b8 |
| lean/ResearchFormal/CVIC/Verification.lean (CVIC) | 9d58e7c86372a95f56a0894298357ce84971f84998e4e4a2df20b110a0530d2e |
| docs/formalization/THEOREM_REGISTER.md (CVIC theorem rows) | 7794af41b9602b77a86cf9d1269a3ee1ea9c59819fb9637fb822e01bde5fa843 |

The guard test packages/coordination/test/cacwc-doc-pins.test.ts pins this record's shape.
