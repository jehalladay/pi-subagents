# Repair attempt withheld pending review evidence

A real agent repaired a disposable clean rejected candidate by committing
`6332475f122086e30ae65ce039b2a895289d8e05` on top of
`7142990`. The opt-in one-shot repair policy refused to claim success
because its read-only reviewer returned `unknown` without an attributable
approval. A second separate read-only review of the same clean commit also
returned `unknown`. No Forge gate was run as part of this repair admission;
the agent was not restarted after either uncertain review. The first
candidate's rejection was a test input with a synthetic review id, so this
attempt is **not** an end-to-end rejected-review → repair → native PASS
journey.

What this establishes: one real candidate repair effect can produce a
changed clean commit, and the review gate fails closed when the provider
returns no structured approval. What remains: a real rejected original
review, a real subsequent approval on the repaired commit, a matching Forge
gate, and a task-quality check. The Beads work package stays open.
