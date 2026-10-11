# 13 — Low-level contracts, type sketches and configuration

**All code here is a design contract, not a claim that the interfaces exist.** Validate exact SDK type names against pinned releases before wiring implementations.

## Workbench core types

    type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

    interface DefinitionRef {
      kind: "script" | "function" | "furnace-formula";
      id: string;
      schemaVersion: string;
      artifactDigest: string;
    }

    interface InvocationIdentity {
      logicalInvocationId: string;
      definition: DefinitionRef;
      deploymentDigest: string;
      parentInvocationId?: string;
      subjectBasis?: string;
    }

    interface NativeRef {
      provider: string;
      type: string;
      id: string;
      scope?: string;
    }

    interface NodeCall {
      callId: string;
      capabilityId: string;
      capabilityVersion: string;
      input: Json;
      invocation: InvocationIdentity;
      requestedEffectKey?: string;
    }

    type NodeCallResult =
      | { kind: "returned"; value: Json; nativeRefs: NativeRef[]; evidenceRefs: string[] }
      | { kind: "rejected"; category: "validation" | "authorization" | "unavailable"; diagnostic: string }
      | { kind: "transport-error"; diagnostic: string; nativeRefs?: NativeRef[] }
      | { kind: "uncertain-effect"; nativeRefs?: NativeRef[]; reconcileHint: string };

A provider may return an *unsuccessful domain outcome* inside kind:"returned". Never map every unsuccessful native domain result to a transport-error or generic false.

## Agent execution contracts

    interface ClaudeAgentRequest {
      agentCallId: string;
      workflowInvocationId: string;
      prompt: string;
      role: string;
      model?: string;
      effort?: string;
      schema?: Json;
      workspaceBasis?: string;
      isolation?: "worktree";
      gate?: string;
      resumeSessionRef?: NativeRef;
      allowedCapabilities: string[];
    }

    interface ClaudeAgentResult {
      callId: string;
      nativeSession?: NativeRef;
      terminal: "completed" | "failed" | "cancelled" | "unknown";
      finalText?: string;
      structuredValue?: Json;
      usage?: {
        inputTokens?: number;
        outputTokens?: number;
        cost?: number;
      };
      nativeEvidenceRefs: string[];
      diagnostic?: string;
    }

Adapt these to the existing WorkflowHost spawnAgent/WorkflowSpawnResult while retaining richer result in observer. If the installed SDK lacks a field, omit it; no invented zeros or fake IDs.

## Observation projection

    interface ObservedNode {
      key: string;
      definitionRef?: DefinitionRef;
      nativeRef?: NativeRef;
      sourceKind: "declared" | "observed" | "inferred";
      lastConfirmedAt?: string;
      observedAt: string;
      freshness: "current" | "stale" | "unknown";
      presentation: {
        title: string;
        type: "workflow" | "agent" | "sdk-operation" | "group";
        statusText: string;
        statusTone: "active" | "success" | "failure" | "waiting" | "unknown";
      };
      metricRefs?: string[];
      evidenceRefs?: string[];
    }

    interface Relation {
      from: string;
      to: string;
      kind: "dependency" | "causation" | "ownership" | "grouping" | "hypothesis";
      provenance: { source: string; observedAt?: string };
    }

Do not replace native status with presentation.statusTone. This is a read model only. Timing intervals and detailed producer payloads belong in separate keyed indexes.

## Representative config (proposed, not installed)

    {
      "workbench": {
        "enabled": true,
        "workflowAgentBackend": "claude",
        "claude": {
          "model": "sonnet",
          "permissionProfile": "scoped",
          "settingSources": ["project"]
        },
        "providers": {
          "mechanical": { "enabled": false },
          "forge": { "enabled": false },
          "furnace": { "enabled": false },
          "hyperunix": { "enabled": false },
          "reactivefiber": { "enabled": false }
        },
        "observation": {
          "hotEventLimit": 20000,
          "maxToolEvents": 200,
          "snapshotThrottleMs": 250
        },
        "tui": {
          "theme": "auto",
          "ascii": false,
          "maxRefreshHz": 4
        }
      }
    }

No provider should be silently enabled with broad write permissions. Configuration must be validated on load, with errors and version migration. Model/backend defaults are policies, not a guess from Pi's current model.

## Host boundary

    interface WorkbenchHost {
      executeWorkflow(request: InvocationIdentity & { input: Json }): Promise<HostLaunchReceipt>;
      getSnapshot(ref: NativeRef): Promise<NativeSnapshot>;
      observe(ref: NativeRef, cursor?: string): AsyncIterable<ObservationEnvelope>;
      inspectCapability(id: string): Promise<CapabilityDescriptor>;
      callCapability(req: NodeCall): Promise<NodeCallResult>;
      requestControl(req: NativeControlRequest): Promise<NativeControlReceipt>;
    }

Local implementation may be in-process services; detached hosting needs explicit authenticated transport but should not require changes to MechanicalWorkflows direct-function usage.

## Key validations

Contract hashes and source digests must be pinned in execution receipt; typed payload validated at boundary; no arbitrary code from descriptor field; compare controlled vs observed state; unrecognized SDK message version => diagnostic rather than silent success. All date/timestamp strings have timezone and are not used as total global event order.