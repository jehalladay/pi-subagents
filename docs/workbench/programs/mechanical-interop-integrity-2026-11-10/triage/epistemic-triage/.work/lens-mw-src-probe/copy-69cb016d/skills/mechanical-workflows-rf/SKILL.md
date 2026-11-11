---
name: mechanical-workflows-rf
description: Use optional Reactive Fiber context in MechanicalWorkflows without confusing host authority and durable receipts.
---

# MechanicalWorkflows — RF adoption

Use when an agentic workflow needs scoped context, inspectable prompt evidence or a handoff to another worker. Begin with `AGENTS.md` and `docs/06-sdk-integration-and-hosts.md`. RF is optional; inspect actual installation and `MECHANICAL_RF_BINARY`. `renderTaskContext` spawns that binary; a missing executable fails as `RF_UNAVAILABLE`, a producer refusal as `RF_RENDER_UNESTABLISHED` with its real `exitCode` and `diagnosticCode`. Each render carries an `--idempotency-key` (`RenderOptions.idempotencyKey`, else minted): a lost reply is re-issued under the same key only and ends as `RF_TRANSPORT_UNACKNOWLEDGED`; the projection reports `acknowledgement` `committed` or `replayed` plus `replayOfOperationId`. Never render again under a fresh key after a transport failure. With `RenderOptions.sessionId` (`developLive` `rfSessionId`) the render first consults `rf context history` and `explain` and reuses a digest-exact recorded render through `context show` (`source` `reused`); hand a second worker `contextHandoff` (render id and session id) and resolve it with `resolveRenderHandoff`, never trust carried text. The installed `--live-develop --context-mode rf` journey exposes the same knobs as `--rf-actor`, `--rf-session`, `--rf-history-limit` (1..500) and `--render-idempotency-key`, and refuses them under plain context (`RF_OPTION_REQUIRES_RF_MODE`).

Keep worker task and Beads identity separate from RF workspace/actor/render IDs. Ask for a minimal text projection when the agent only needs model input; use explain/replay for causal evidence. Never mistake a missed command response for proof no effect committed. Forge validates code, Beads owns work, Furnace supervises runs, RF owns context; none authorizes another's operations.

Use existing installed adapters only; the program in `docs/programs/rfcli-feedback-adoption-2026-11-04/` is proposed. Qualify both real-installed and dependency-missing journeys, record exact versions and failed/positive controls before reporting adoption.

Treat a redacted rf projection as disclosing the task label while it carries an unkeyed `task_digest` (sha256 of the task text, so a predictable label such as `Task: <bead title>` can be recovered by guess-and-check). Before a projection reaches a report, evidence file, handoff or docs surface, run it through `projectForUntrustedSurface` (`apps/development-rig/src/rf-projection.ts`), which drops every `task_digest` and `task_blob_digest` member and lists the removed paths, and use `assertRedactedProjection` to fail closed when a payload labelled redacted still carries one. Do not put sensitive task phrases into untrusted surfaces until the producer redaction fix lands.

`renderTaskContext` returns an `RfContext` that carries, beside the render id, model, graph revision and output digest, the native RF workspace id (`rfWorkspaceId`, from `result.workspace_id`, `rfw_...`), the recorded `actor` and the installed CLI provenance (`cli.version`, `cli.sdkVersions`, read through the same executor from `rf --json --version`). Pass the actor explicitly (`options.actor`, or `rfActor` on `developLive`); it reaches rf as one `--actor`, a render whose `result.actor` differs is refused, and with no actor supplied only a nonblank `RF_ACTOR` passes through and no actor is invented. The handoff keeps the bounded text projection and these identities, never the raw render envelope. A fixture executor never proves a real RFCLI version; record native evidence separately.


## Machine field journeys (2026-11-07)

Open [bead-machine-field-idioms.md](bead-machine-field-idioms.md) for the observed Camshaft resident-pool retirement, cross-repository landing custody, RF committed-context requirements and the negative registered-Pi-function-hosting case. This is field evidence and proposed acceptance, not proof the native Pi function vertical has shipped.
