# W20 CAPTURE (HELD for the owner's W20 lane): bd ready lists OPEN beads that still carry an assignee; two consumers read it opposite ways
captured 2026-10-15T15:05:49Z (system UTC) by flywheel orchestrator; store /workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/PrimaryInstallation/src/Pi-subagents

## bd --version
```
bd version 1.1.0-rc.1 (2d9e4321c) db-schema-max=v59
```

## exact argv and output: bd -C <store> ready --json (entry for one reopened respin, wb-752.4; status open, assignee flywheel)
```
[
 {
  "id": "wb-752.4",
  "title": "W16-F/VC-4: pure bounded workflow_control reply builder over the landed decision core (requested/acknowledged/result kept distinct with native echo, typed sanitized refusal replies for denied decisions, destructive-confirmation state carried never minted, byte-capped compact JSON through shared sanitizers, transport success never domain verification); Pi tool registration and provider adapters excluded",
  "description": "Gap: docs/workbench/11-designer-and-operator.md section \"First public Pi tools (proposed)\" specifies \"workflow_control(ref,action,params?): explicit native action after permission/preconditions; returns requested/acknowledged/result distinct.\" The decision module landed as wb-69g.1 (src/workbench/control.ts, closed) and the Furnace adapter is wb-69g.3 (open), but no bounded sanitized REPLY surface exists to shape a control decision plus adapter phase receipts into the compact structured tool reply the spec requires. workflow_catalog/inspect (wb-69g.2), workflow_observe (wb-752.2) and workflow_execute (wb-69g.5) all have reply builders; control does not.\n\nScope (atomic, pure, hot-file free; red-first):\n- src/workbench/control-reply.ts (new): buildControlReply over inputs {decision from the landed control.ts core, phase receipts requested/acknowledged/result, native echo, byte budget}. Pure: never invokes adapters or SDK clients, never registers a Pi tool.\n- test/workbench-control-reply.test.ts (new): red first.\n\nBehavior:\n- Denied decision (missing per-verb grant control:<provider>.<action>, observer-only scope, unconfirmed ownership, guessed action) renders a typed sanitized refusal reply; no phase receipt is fabricated.\n- requested/acknowledged/result stay distinct fields, never collapsed; result-absent renders acknowledged-only and never reads as completion.\n- Native echo is carried observed-not-verified; transport success is never labeled domain verification.\n- Destructive-action confirmation state comes from the decision core and is carried, never bypassed or minted by the builder.\n- Reply is byte-capped compact JSON with an honest truncated flag; every string routes through the shared sanitizers in src/workbench/redaction.ts (standing invariant), including adversarial ANSI/control characters in echo text.\n\nExcluded: Pi tool registration (src/index.ts is hot and held until release), provider adapters (wb-69g.3; blocked Claude interrupt gap wb-69g.4 stays untouched), src/ui/workflow
...total ready rows: 11 | rows with a non-empty assignee: 3
(stderr during the call: 'bd ready examined database "wb" only (cwd-scoped; does not union across rigs)')
```

## exact argv and output: bd -C <store> ready (plain), lines mentioning wb-752.4 / wb-6ze.10 / wb-9x5.7 / wb-a2g.1
```
○ wb-a2g.1 ● P1 VC-1/W02-A: live adverse-journey tier for the Claude SDK host (mid-stream cancel after native session ID, pre-start abort, invalid model) with requested/acknowledged/terminal receipt; 
○ wb-752.4 ● P2 W16-F/VC-4: pure bounded workflow_control reply builder over the landed decision core (requested/acknowledged/result kept distinct with native echo, typed sanitized refusal replies for
○ wb-6ze.10 ● P2 W15-E/VC-5: pure Claude transcript message evidence reader for the docs/20 'claude-agent-sdk session' EvidenceLoader row (claude-message uuid selected from the bounded transcript read
```

## the two readings inside one machine (g2-work-r2, 2026-10-15 13:56Z-14:30Z)
- groom seats: "wb-752.4 ... reopened respin, assignee=flywheel (open but ASSIGNED; respin pipeline owns it); appears in bd ready since 14:17Z" -> filtered OUT of pick lists as taken (outbox row 152 skipped[]).
- worker seats (WORK_STEPS rule "REQUIRE status open and no assignee"): returned {delivered:false, idle:true, reason:"... already assigned to flywheel"} and never claimed them.
- realized cost: 94 idle returns + 8 claim-failed + 3 blocked of 116 worker agents in one 120-agent round; the run exhausted its budget at ~14:30Z and the work lane was dark ~32 minutes (journal wf_34288835-f9c; outbox rows 147-153).
- the busy-wait (no time backoff on idle) was the machine prompt's defect, fixed in g2-work.js (backoff + exempt idle cap + reopened-respin rule). The AMBIGUITY is bd's surface: `bd ready` neither excludes assigned-open rows nor marks them; two reasonable consumers disagreed.
- suggested shape: `bd ready` prints the assignee column (or a flag/field such as assigned:true) and documents whether an assigned OPEN bead is "ready"; optionally `--unassigned` / `--include-assigned` filters.
- prior-art check deferred to filing time (read at the fetched ref per the agentic-feedback rule).
