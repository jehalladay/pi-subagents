/** Native read-only Forge SDK operation binding. No CLI parsing or guessed PASS. */

import { realpathSync } from "node:fs";
import { isAbsolute } from "node:path";
import { type DecodedEnvelope, decodeResultEnvelope, EnvelopeDecodeError, ServerConnection } from "@forge/sdk";
import { CapabilityError, type CapabilityRegistry, type JsonValue } from "../capability-registry.js";

export interface ForgeReadClient {
  gate: {
    status(input: { readonly target: string }): Promise<{ protocolMethod: string; raw: JsonValue }>;
  };
}

const INPUT_SCHEMA: Record<string, unknown> = {
  type: "object",
  properties: { target: { type: "string", minLength: 1, maxLength: 4096 } },
  required: ["target"],
  additionalProperties: false,
};

/** One SDK facade call, one native result. `authoritative_current` remains native. */
export function registerForgeGateStatus(registry: CapabilityRegistry, client: ForgeReadClient, sdkVersion: string): void {
  registry.register({
    descriptor: {
      id: "forge.gate.status",
      version: "1.0.0",
      description: "Read Forge workspace gate status. Historical results are not current verification.",
      inputSchema: INPUT_SCHEMA,
      effectClass: "read",
      permissions: ["forge:inspect"],
      supportedModes: ["invoke"],
      contractSource: `@forge/sdk@${sdkVersion}:GateFacade.status`,
    },
    async invoke(input) {
      const { target } = input as { target: string };
      const native = await client.gate.status({ target });
      if (native.protocolMethod !== "gate.status") {
        throw new CapabilityError("transport", `Forge SDK returned wrong protocol method: ${native.protocolMethod}.`);
      }
      return { contract: "forge.gate.status/v1", protocolMethod: native.protocolMethod, source: native.raw };
    },
  });
}

function isWithinRoot(target: string, authorizedRoot: string): boolean {
  try {
    const root = realpathSync(authorizedRoot);
    const resolved = realpathSync(target);
    // Authorize the root itself, a package inside it, but never a sibling
    // that merely shares a string prefix or a symlink escaping the root.
    return resolved === root || resolved.startsWith(`${root}/`);
  } catch {
    return false;
  }
}

/** Add the installed native SDK as a read-only host capability. */
export function registerNativeForgeGateStatus(registry: CapabilityRegistry, authorizedRoot: string): void {
  registry.register({
    descriptor: {
      id: "forge.gate.status", version: "1.0.0",
      description: "Read current Forge workspace gate readiness; last_result is historical only.",
      inputSchema: INPUT_SCHEMA, effectClass: "read",
      permissions: ["forge:inspect"], supportedModes: ["invoke"],
      contractSource: "@forge/sdk@0.1.0:ServerConnection.request(gate.status)",
    },
    async invoke(input, context) {
      const { target } = input as { target: string };
      if (!isAbsolute(target) || !isWithinRoot(target, authorizedRoot)) {
        throw new CapabilityError("authorization", "Forge read denied outside the authorized workspace scope.");
      }
      return await readForgeGateStatus(target, context.signal);
    },
  });
}

/** Open a pinned native SDK connection for one read, then close the owned process. */
export async function readForgeGateStatus(target: string, signal?: AbortSignal): Promise<JsonValue> {
  if (signal?.aborted) throw new CapabilityError("transport", "Forge read cancelled before connection launch.");
  const connection = ServerConnection.spawn("forge");
  const onAbort = () => { void connection.close(); };
  signal?.addEventListener("abort", onAbort, { once: true });
  try {
    const verdict = await connection.initialize();
    if (verdict !== "compatible") {
      throw new CapabilityError("unavailable", `Forge protocol compatibility is ${verdict}; refusing unverified native response.`);
    }
    const capabilities = connection.capabilities;
    if (!capabilities) throw new CapabilityError("unavailable", "Forge SDK did not negotiate capability declarations.");
    if (capabilities.stateOf("gate.status") !== "supported") {
      throw new CapabilityError("unavailable", "Forge server did not explicitly declare gate.status supported.");
    }
    // @forge/sdk@0.1.0 GateFacade.status sends {target}, while the served
    // application operation requires {root}. Use the SDK's generic request
    // until the producer fixes the contract. Feedback filed in Forge.
    if (signal?.aborted) throw new CapabilityError("transport", "Forge read cancelled before request.");
    const result = await connection.request("gate.status", { root: target });
    if (signal?.aborted) throw new CapabilityError("transport", "Forge read cancelled during request.");
    // Negotiating a transport does not validate a result payload. The SDK
    // decoder pins contract_version, command status and diagnostic structure;
    // a failed/partial domain response is still a legitimate read result.
    let decoded: DecodedEnvelope;
    try {
      decoded = decodeResultEnvelope(result);
    } catch (error) {
      if (error instanceof EnvelopeDecodeError) {
        throw new CapabilityError("transport", `Forge gate.status returned an incompatible result envelope: ${error.message}.`);
      }
      throw error;
    }
    if (decoded.command !== "gate.status") {
      throw new CapabilityError("transport", `Forge gate.status returned a ${decoded.command} result.`);
    }
    const native = result as Record<string, JsonValue>;
    const envelope = native.envelope;
    if (!envelope || typeof envelope !== "object" || Array.isArray(envelope) ||
      typeof envelope.reason_code !== "string" ||
      !native.data || typeof native.data !== "object" || Array.isArray(native.data)) {
      throw new CapabilityError("transport", "Forge gate.status returned an unrecognized native envelope.");
    }
    return { contract: "forge.gate.status/v1", protocolMethod: "gate.status", source: JSON.parse(JSON.stringify(result)) as JsonValue };
  } finally {
    signal?.removeEventListener("abort", onAbort);
    await connection.close();
  }
}
