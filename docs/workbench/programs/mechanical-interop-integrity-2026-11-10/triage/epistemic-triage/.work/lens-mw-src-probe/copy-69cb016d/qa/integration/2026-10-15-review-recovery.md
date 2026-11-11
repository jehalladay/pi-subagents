# Candidate review and native gate recovery

One real reviewer-gated `--live-develop --review` run committed candidate
`32cfa2a0359ed482bd8df307d590e602463adc3a` but the reviewer returned
`unknown`. The CLI exited 3 with `REVIEW_NOT_ESTABLISHED` and **did not run
Forge**. No agent task was retried blindly. A separate read-only Claude
review session then approved that same clean commit with native session id
`faffd988-9b12-4d89-aed1-f6fa2fb06045`. The pure
`verifyReviewedCandidate()` boundary admitted the approval and ran one
native Forge gate on the same commit. That gate passed at operation
`op-0254153b30c5425285447a92bebac8fa`.

This is a bounded recovery with distinct agent, review and Forge producer
identities. It does not relabel the first CLI run as a PASS, authorize an
unknown reviewer response, or implement automatic repair. The review
approval and gate recovery are recorded in separate raw JSON files under
`evidence/`.
