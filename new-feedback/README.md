# pi-subagents operational feedback

This directory accumulates feedback on **operating pi-subagents' workbench program as a tool**: its
gate shape (`forge.toml`, the complete-gate spelling, receipts), its closure and landing conventions,
and the experience of driving it from an automated orchestrator. It is feedback about the tool
surface, not about the workbench beads themselves, which live in the store.

Conventions follow the sibling `Forge`, `beads` and `Furnace` repos' `new-feedback/` directories:
one file per finding or per session theme, named `YYYY-MM-DD-<the-finding-as-a-claim>.md`, each
opening with a title that states the finding as a claim, then a metadata block (From, Date,
Revision, Method, Scope), a summary with numbers that carry their scope, graded findings
(CONFIRMED, PLAUSIBLE, UNDETERMINED; re-checks carry STILL-TRUE, FIXED, CHANGED, NEVER-TRUE),
evidence quoted or cited at `file:line`, fixes cheapest first, positives worth protecting, and what
was not established. Append-only: correct another file with a new file that names it, never by
editing it. The directory listing is the index; do not maintain a contents table.

Delivery is a one-file commit pushed to a branch the program owner lands; this repository's
protected branches are not pushed to directly by feedback writers. Docs-only commits disclose any
gate waiver in their body.
