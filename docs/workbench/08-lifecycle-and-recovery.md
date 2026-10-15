# 08 — Execution identity, lifecycle, side effects, replay and recovery

## Separate four identities

1. Definition: source package/export or workflow script path, schema version.
2. Deployment: immutable digest of artifact, dependencies, configuration and compatible host ABI.
3. Logical invocation: caller-created unique identity stable across retry of same request; distinct from identical intentional second request.
4. Native execution: Claude SDK session ID, Forge operation, Furnace Run/Work/Attempt, HX query, RF render. These are not interchangeable.

Trace IDs and UI node IDs are correlation aids. A trace span is not proof of native Run existence. Workspace/source basis is separately required for verification correctness.

## Lifetimes

Embedded Pi-hosted script: Pi host and worker own local interpreter; process loss terminates its JS stack. Detached service: independent process survives Pi client disconnect but does not guarantee service crash recovery. Furnace-hosted function: Furnace may retry an Attempt; ordinary JS locals and external effects are not magically checkpointed. Claude session resume uses only supported SDK session semantics. RCP future integration may enhance compatible runtime continuity, not assumed.

## State/event semantics

Workbench **observation states**: observed-started, observed-running, observed-terminal, stale, unknown. These are projections with observedAt and source. Do not create a universal authoritative execution status enum. A producer domain outcome "verification_failed" differs from a transport failure and from a Furnace Attempt outcome; retain all axes.

An observed timeout or disconnect is *not* evidence that side effect never happened. Cancellation request != accepted cancellation != terminal cancellation.

## Safe and unsafe replay

| Operation | Default | Reuse/retry only when |
| --- | --- | --- |
| Pure local computation | recompute | input/version stable |
| Read-only HX query | may refresh | producer freshness/basis verified |
| Claude agent result | no generic replay | matching source+model+tools+context and journal contract; session continuity separately tested |
| Forge build/verification | inspect/reconcile | Forge native evidence matches candidate basis; never fake PASS |
| Furnace Run establishment | no blind retry | native ensure/reconcile contract is shipped and authoritative |
| Mutable file/workspace edit | uncertain after lost result | exact workspace/basis inspection and explicit policy |
| External publish/remote write | uncertain after lost result | native idempotency/reconciliation with stable logical key |

Legacy workflow JSONL prefix cache is optimized for settled *agent* answers; not for arbitrary SDK node side effects. Disable SDK-node auto-replay until effect contract is defined and tested per provider. A node's retry must not reuse a previous outcome under changed definition, input, workspace or permission basis.

## Cancellation and ownership

Track distinct relationships: caused-by, depends-on, observed-by, lifecycle-owned-by, charged-to. Causality != ownership. Multi-reader shared child MUST NOT be stopped merely because one reader closed Pi or stopped waiting. Child cancellation depends on explicit native owner rights and native API semantics.

## Long-running nested work

Do not occupy limited Furnace executor capacity synchronously waiting for children that require those same scarce slots if it creates deadlock. Use native accepted await/detach/dependency patterns where available, with explicit status; do not implement a hidden second run scheduler in Workbench.

## Run recovery and journal design

Record an append-only *diagnostic* event stream in the workbench if useful, plus immutable source/digest and native refs. On recovery:
- Read source snapshot, identify known native refs; obtain authoritative provider snapshot.
- Detect event cursor discontinuity, lost sessions, stale data.
- Reattach if permitted; otherwise mark terminal/unknown according to actual evidence.
- Never "complete" a workflow solely because local journal has a success-like last row.
- Don't rerun arbitrary JS stack unless interpreter explicitly supports checkpoint/reconstruction with fault tests.
- Do not silently migrate a running invocation to new source/registry version.

## Adversarial test matrix

Kill after Furnace side effect before returned Run ID; kill after workspace edit before recorded result; reconnect a stream with missing events; restart Pi while detached executor continues; change source digest under same logical key; issue control as observer-only; cancel a wait on shared child; exhaust Furnace slots with parents awaiting child; change candidate source basis after Forge verify. Required outcomes: reconciliation/uncertainty/conflict; no duplicate effects, no invented PASS, no implicit mass cancellation.
## Experimental immutable receipt

`src/workbench/identity.ts` distinguishes script definition, deployment digest, logical invocation and producer-native references. It hashes actual script and host implementation files, the package manifest/lock and verified local SDK artifacts, effective configuration, host ABI and provider contract declarations. Principal and independently measured workspace source basis remain explicit inputs. Re-observing changed bytes/configuration/contracts under the same invocation refuses rather than silently upgrading it.

These receipts are not durable JavaScript checkpoints, signed remote authorization or proof of native resource ownership. Installed artifacts carry a validated dependency lock under `vendor/` because npm excludes the root lockfile from packed distributions. Host entrypoint integration and native source-basis authority must be verified separately.

The identity audit also pins explicitly resolved loaded SDK JavaScript files, rather than assuming a lockfile/archive proves the installed bytes. Native executable identity remains a producer-specific observation. A model alias, mutable PATH or SDK default executable must not be advertised as an immutable native deployment merely because the JavaScript client is pinned. Git candidate surveys cover their bounded Git-visible source universe and label non-Git or unmeasurable workspaces unknown; they do not freeze filesystem state or include arbitrary ignored data.

## Optional local detached profile

The optional local detached profile launches a separate Node session with a private per-invocation directory and Unix socket. It uses stable local OS-user authority rather than the Pi viewer session. Closing or exiting Pi disconnects the client, not the execution host. Inspection after host loss reports unknown with producer reconciliation guidance; it does not replay a saved terminal verdict or rerun JavaScript. The profile is same-machine OS discretionary-access control only, not remote authentication or hostile-same-user protection.

Reviewed local provider manifests have explicit version, digest and capability allowlists and cannot masquerade as native SDK or model evidence. Native factories remain producer-specific. Furnace-hosted durability and native executable identity are separate, unestablished release obligations. The local host is not a second durable Work scheduler.

## Side-effect replay policy on resume

Journal entries for `node()` now carry the capability id, the producer-declared effect class and the recording host's replay basis. On resume, a recorded non-read effect is never re-executed and never silently replayed: the run fails with a typed uncertain-effect error naming the owning producer and position, and the entry is carried forward so retrying the resume stays protected. A recorded read replays only when the current host vouches for the same effect class, basis and key, and the replayed row is marked stale rather than fresh. Effect answers are stored only for reads, so a write's answer can never be silently replayed. Entries recorded without effect metadata re-run live, which is the pre-policy contract; hosts that execute effectful nodes must declare effect metadata to arm the tripwire. The Claude host now stamps effect classes from the registry descriptor and regained settled-agent prefix replay under an explicit host basis.
