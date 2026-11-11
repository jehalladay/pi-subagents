/**
 * Stable, narrow application-host facade `@mechanical/development-rig/host` (EAT-R005, EAT-R006).
 * It exports one versioned function, one typed admission error and the host-binding guards; every other rig module
 * stays unreachable through the package `exports` map. The caller supplies the committed descriptor bytes and the
 * packed library tarball with their SHA-256 digests; nothing is imported before both are admitted.
 */
import { createHash } from "node:crypto";
import type { DevelopmentOutcome, DevelopmentServices } from "@mechanical/workflows-development";
import type { EntrypointDescriptor } from "./entrypoint-host.js";
import { invokeInstalledDevelopment } from "./installed-host.js";
import { HOST_BINDING_CONTRACT } from "./host-binding.js";

export { HostBindingError, WRITE_GRANT, admitHostBinding, dispatchWriteAtFinalBoundary, validateHostBinding } from "./host-binding.js";
export type { MechanicalHostBindingV1 } from "./host-binding.js";
export type { DevelopmentOutcome, DevelopmentServices } from "@mechanical/workflows-development";

/** The ratified host contract version this facade implements (mechanical.pi-host/v1). */
export const HOST_API_VERSION = HOST_BINDING_CONTRACT;

/** Typed refusal raised before any trusted import or callback. `code` is the stable name; `detail` is the human text. */
export class HostAdmissionError extends Error {
  readonly code: string;
  readonly detail: string;
  constructor(code: string, detail: string) {
    super(code + ": " + detail);
    this.name = "HostAdmissionError";
    this.code = code;
    this.detail = detail;
  }
}

export interface DevelopmentHostOptions {
  /** Absolute path of the packed @mechanical/workflows-development tarball: a regular file, no symlink. */
  readonly artifactPath: string;
  /** `sha256:<64 hex>` of the tarball bytes. */
  readonly artifactDigest: string;
  /** The committed entrypoint descriptor bytes (contracts/entrypoints/development.v1.json). */
  readonly descriptorBytes: Uint8Array;
  /** `sha256:<64 hex>` of `descriptorBytes`. */
  readonly descriptorDigest: string;
  /** Exactly the four application callbacks; an extra key refuses. */
  readonly services: DevelopmentServices;
}

const ENTRYPOINT_ERROR = /^(ENTRYPOINT_[A-Z0-9_]+): ([\s\S]*)$/;

/**
 * Admit the descriptor bytes and the exact artifact by SHA-256, then run `develop` once through the installed host.
 * A returned outcome is the producer's validated domain result; an ENTRYPOINT_* refusal becomes a HostAdmissionError,
 * and any error the caller's own callbacks throw passes through unchanged.
 */
export async function invokeDevelopmentHost(options: DevelopmentHostOptions, input: unknown): Promise<DevelopmentOutcome> {
  const actual = "sha256:" + createHash("sha256").update(options.descriptorBytes).digest("hex");
  if (actual !== options.descriptorDigest) throw new HostAdmissionError("HOST_DESCRIPTOR_DIGEST_MISMATCH", "descriptor bytes differ from the pinned digest");
  let descriptor: EntrypointDescriptor;
  try {
    descriptor = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(options.descriptorBytes)) as EntrypointDescriptor;
  } catch {
    throw new HostAdmissionError("HOST_DESCRIPTOR_INVALID", "descriptor bytes are not UTF-8 JSON");
  }
  try {
    return await invokeInstalledDevelopment({
      artifactPath: options.artifactPath, artifactDigest: options.artifactDigest, descriptor,
      entrypointId: descriptor.id, contractVersion: descriptor.schema, services: options.services,
    }, input);
  } catch (error) {
    const match = error instanceof Error ? ENTRYPOINT_ERROR.exec(error.message) : null;
    if (match?.[1] !== undefined && match[2] !== undefined) throw new HostAdmissionError(match[1], match[2]);
    throw error;
  }
}
