/**
 * function-dispatch-chain.ts — the ONE effectful dispatch chain of a function launch (wb-2ukh, packet P03 of the
 * mechanical-native-interoperability-2026-11-09 program: docs/programs/mechanical-native-interoperability-2026-11-09/
 * 02-IMPLEMENTATION-PACKAGES.md at pi-subagents master b085c34e, requirements EAT-R227..EAT-R234 of
 * docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/ATOMIC-REQUIREMENTS.md at 18b016b2).
 * It composes the two seams that already exist, function-authority.ts (wb-201v) and source-admission.ts (wb-s8rm), with the
 * rights of the native SDK edge and the identity of the installed producer package, into one chain whose FINAL boundary
 * takes every decision from fresh host reads in one synchronous segment that ends in the single effect call: no await, and
 * no code the request supplies, lies between the last decision and the dispatch (P03's no-await rule).
 *
 * dispatchFunctionChain(request, host, effect), in order:
 *  1. entry: decideFunctionAuthority on one host identity read (copied when read) and one host grant read, then the SDK
 *     rights of that same grant read; a refusal here comes before every wait, Git read and lease;
 *  2. the installation barrier: host.package.admit answers the identity of the installed package the host admitted (its
 *     admission rules are packet P02's, never this module's); a rejection, or an answer that is not a non-empty string,
 *     refuses package-unadmitted;
 *  3. admitSourceWrite (source-admission.ts rules 1 to 11: confinement, measurement, attestation, the writer lease, the
 *     host's admission wait, the fresh measurement and the attestation read again), whose one dispatch is this chain's
 *     FINAL boundary; the admission's own policy is the write request it judges;
 *  4. the FINAL boundary, synchronous: decideFunctionAuthority again on a fresh grant read and a fresh identity read, judged
 *     against the entry identity; the SDK rights of that fresh grant read; the installed package's identity read again,
 *     which must be the admitted one; then the one effect call, with a frozen grant.
 * A refusal at any step returns that layer's typed refusal and calls no effect. The lease admitSourceWrite takes is released
 * when the final boundary refuses and when the effect settles; an error the effect throws or rejects with propagates
 * unchanged; neither a rejection nor an undefined answer calls the effect again. Required SDK rights are claude:invoke and one
 * claude:tool:<name> right per tool the host configuration names, judged only against the host's grant reads, and the
 * effect's grant carries exactly those; a right the request names is never read. A refusal of the chain's own carries the
 * fixed reason of its code (FUNCTION_CHAIN_REASONS).
 *
 * The requirements this chain serves, each at evidence tier V1 only (focused red/green tests and adversarial mutants on
 * named fixtures, 03-VERIFICATION-AND-RELEASE.md), as test/workbench-function-dispatch-chain.test.ts pins them (the words
 * above hold for the cases that suite lists, and for no form it does not):
 *   EAT-R227  the SDK edge's rights, held in each host grant read, independent of the function action
 *   EAT-R228  the principal, the session and the grants read again at the final boundary
 *   EAT-R229  the effectful source confined to a clean canonical root
 *   EAT-R230  an unmeasurable raw Git identity refused
 *   EAT-R231  a fresh gate manifest bound to the source basis
 *   EAT-R232  one writer per canonical root
 *   EAT-R233  a host-minted current write attestation
 *   EAT-R234  one no-await final authority-to-dispatch chain and its P03 component receipt
 *
 * Wiring and adoption: the registered workflow_execute calls this chain only where a host composes function hosting (packet
 * P04, wb-4bxo: execute-tool.ts WorkflowExecuteDeps.functions; a Pi session composes none and still refuses a function
 * definition), and the registered-path (V3) claim of that branch rests on test/workbench-registered-function.test.ts, not on
 * this module's suite; no native (V4) claim rests on it; and no action spelling is adopted (FUNCTION_ACTION_CONTRACT stays
 * unadopted until the P00 joint ruling, wb-w8fk), so under the shipped contract the entry decision refuses with
 * decideFunctionAuthority's earliest failing rule: at the suite's listed hosts, function-action-unadopted where the identity
 * read and the grant read are well formed and hold workbench:execute, and missing-execute-grant, unknown-identity-data or
 * unknown-permission-data where an earlier rule fails.
 * Nor is this chain's final boundary the last check before a provider effect: EAT-R409 of the
 * mechanical-interop-integrity-2026-11-10 program (its ATOMIC-REQUIREMENTS.md at pi-subagents master 347d58ea) extends
 * EAT-R234 and has the composed producer revalidate authority, source and fence after its own asynchronous preparation,
 * which this module does not do.
 */
import type { ExecuteAdmission } from "./execute.js";
import {
  decideFunctionAuthority,
  type FunctionActionContract,
  type FunctionAuthorityHost,
  type FunctionAuthorityRefused,
  type FunctionDispatchAuthority,
  type FunctionIdentity,
} from "./function-authority.js";
import type { DefinitionRef } from "./identity.js";
import { admitSourceWrite, type SourceAdmissionHost, type SourceAdmissionRefusal, type SourceWriteGrant } from "./source-admission.js";

/** The exact right a native Claude SDK session rests on: the spelling the detached launch's preflight checks. */
export const SDK_INVOKE_RIGHT = "claude:invoke";
/** One Claude tool's exact right is this prefix followed by the tool's name. */
const SDK_TOOL_PREFIX = "claude:tool:";

/** The refusals the chain itself decides, beside those of the two seams. */
export type FunctionChainCode = "unknown-sdk-rights" | "missing-sdk-right" | "package-unadmitted" | "package-changed";
/** One fixed reason per chain code: a refusal never carries request, host or producer text. */
export const FUNCTION_CHAIN_REASONS: Readonly<Record<FunctionChainCode, string>> = Object.freeze({
  "unknown-sdk-rights": "the host configuration's SDK tool list is not a list of tool names",
  "missing-sdk-right": "missing an exact SDK right the function's native session requires",
  "package-unadmitted": "the installed producer package was not admitted",
  "package-changed": "the installed producer package is not the one admitted",
});

export type FunctionChainStage = "entry" | "final";
export interface FunctionChainOwnRefusal {
  readonly code: FunctionChainCode;
  readonly reason: string;
  readonly invocationId: string;
}
export type FunctionChainRefused =
  | { readonly status: "refused"; readonly layer: "authority"; readonly stage: FunctionChainStage; readonly refusal: FunctionAuthorityRefused }
  | { readonly status: "refused"; readonly layer: "sdk" | "package"; readonly stage: FunctionChainStage; readonly refusal: FunctionChainOwnRefusal }
  | { readonly status: "refused"; readonly layer: "source"; readonly refusal: SourceAdmissionRefusal };

/** What the one effect receives: frozen, each member as the final boundary decided it. */
export interface FunctionChainGrant {
  readonly authority: FunctionDispatchAuthority;
  readonly source: SourceWriteGrant;
  /** claude:invoke, then the configured tools' rights in configuration order, when the host configures an SDK edge; else empty. */
  readonly sdkRights: readonly string[];
  readonly packageIdentity: string;
}
/** The P03 component receipt of one dispatch: seam evidence (V1) only, never a registered-path or native tier. */
export interface FunctionChainReceipt {
  readonly packet: "P03";
  readonly evidence: "V1";
  readonly invocationId: string;
  readonly definitionDigest: string;
  readonly sourceIdentity: string;
  readonly packageIdentity: string;
  readonly operatorId: string;
}
export interface FunctionChainDispatched<T> {
  readonly status: "dispatched";
  readonly value: T;
  readonly receipt: FunctionChainReceipt;
}
export type FunctionChainOutcome<T> = FunctionChainRefused | FunctionChainDispatched<T>;

/** The installed producer package, as the host admits and measures it. */
export interface FunctionPackageHost {
  /** The installation barrier: the identity of the installed package the host admitted for the definition. */
  admit(definition: Readonly<DefinitionRef>, signal: AbortSignal | undefined): Promise<string | undefined>;
  /** The identity of the installed package as the host measures it now. */
  current(definition: Readonly<DefinitionRef>): string | undefined;
}
/** The native SDK edge of the function's session, from host configuration only. */
export interface FunctionSdkHost {
  /** The Claude tools the host configuration gives the session. */
  tools(): readonly string[] | undefined;
}
export interface FunctionChainHost {
  readonly authority: FunctionAuthorityHost;
  readonly source: SourceAdmissionHost;
  readonly package: FunctionPackageHost;
  /** Set when the function runs a native Claude SDK session. */
  readonly sdk?: FunctionSdkHost;
}
export interface FunctionChainRequest {
  /** workflow_execute's admission of the digest-pinned function definition (decideExecute). */
  readonly admission: ExecuteAdmission;
  readonly contract: FunctionActionContract;
  /** The workspace the effect writes; admitSourceWrite confines it. */
  readonly workspace: string;
}

function plainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}
/** An own data property's value, read through its property descriptor, so a getter is never invoked. */
function own(record: Record<string, unknown>, key: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(record, key);
  return descriptor && Object.hasOwn(descriptor, "value") ? descriptor.value : undefined;
}
/** The entry identity, copied when read, so a host that later mutates the object it returned cannot move it. */
function identityRead(value: unknown): FunctionIdentity | undefined {
  if (!plainObject(value)) return undefined;
  const principal = own(value, "principal");
  const sessionId = own(value, "sessionId");
  return typeof principal === "string" && typeof sessionId === "string" ? Object.freeze({ principal, sessionId }) : undefined;
}
/** A grant read, copied when it is a list, so one read feeds both the authority decision and the SDK rights. */
function grantRead(value: unknown): unknown {
  if (!Array.isArray(value)) return value;
  const grants: readonly unknown[] = value;
  return Object.freeze(Array.from(grants));
}
/** The SDK rights the host configuration requires, when the grant read holds every one; else the refusal code. */
function sdkRights(sdk: FunctionSdkHost | undefined, grants: unknown): readonly string[] | FunctionChainCode {
  if (sdk === undefined) return Object.freeze([]);
  const read: unknown = sdk.tools();
  if (!Array.isArray(read)) return "unknown-sdk-rights";
  const listed: readonly unknown[] = read;
  const tools = listed.filter((tool): tool is string => typeof tool === "string");
  if (tools.length !== listed.length) return "unknown-sdk-rights";
  const required = [...new Set([SDK_INVOKE_RIGHT, ...tools.map(tool => `${SDK_TOOL_PREFIX}${tool}`)])];
  const held: readonly unknown[] = Array.isArray(grants) ? grants : [];
  return required.every(right => held.includes(right)) ? Object.freeze(required) : "missing-sdk-right";
}

function authorityRefused(stage: FunctionChainStage, refusal: FunctionAuthorityRefused): FunctionChainRefused {
  return Object.freeze({ status: "refused", layer: "authority", stage, refusal });
}
function ownRefused(layer: "sdk" | "package", stage: FunctionChainStage, code: FunctionChainCode, invocationId: string): FunctionChainRefused {
  return Object.freeze({ status: "refused", layer, stage, refusal: Object.freeze({ code, reason: FUNCTION_CHAIN_REASONS[code], invocationId }) });
}
function dispatched<T>(value: T, receipt: FunctionChainReceipt): FunctionChainDispatched<T> {
  return Object.freeze({ status: "dispatched", value, receipt });
}

/** Dispatches one admitted function through the chain the module comment lists. */
export async function dispatchFunctionChain<T>(request: FunctionChainRequest, host: FunctionChainHost, effect: (grant: FunctionChainGrant) => Promise<T>): Promise<FunctionChainOutcome<T>> {
  const { admission, contract, workspace } = request;
  const { invocationId, definition } = admission;
  const entered = identityRead(host.authority.identity());
  const entryGrants = grantRead(host.authority.grants());
  const entry = decideFunctionAuthority({ admission, contract, entered, current: { grants: entryGrants, identity: entered } });
  if (entry.decision === "refused") return authorityRefused("entry", entry);
  const entryRights = sdkRights(host.sdk, entryGrants);
  if (typeof entryRights === "string") return ownRefused("sdk", "entry", entryRights, invocationId);
  let admitted: string | undefined;
  try {
    admitted = await host.package.admit(definition, host.source.signal);
  } catch {
    admitted = undefined;
  }
  if (typeof admitted !== "string" || admitted === "") return ownRefused("package", "entry", "package-unadmitted", invocationId);
  const packageIdentity = admitted;
  const outcome = await admitSourceWrite(
    { invocationId, workspace, ...(admission.policy !== undefined ? { policy: admission.policy } : {}) },
    host.source,
    (source: SourceWriteGrant): Promise<FunctionChainOutcome<T>> => {
      // The FINAL boundary: synchronous from the first fresh read to the effect call.
      const grants = grantRead(host.authority.grants());
      const final = decideFunctionAuthority({ admission, contract, entered, current: { grants, identity: host.authority.identity() } });
      if (final.decision === "refused") return Promise.resolve(authorityRefused("final", final));
      const rights = sdkRights(host.sdk, grants);
      if (typeof rights === "string") return Promise.resolve(ownRefused("sdk", "final", rights, invocationId));
      if (host.package.current(definition) !== packageIdentity) return Promise.resolve(ownRefused("package", "final", "package-changed", invocationId));
      const grant: FunctionChainGrant = Object.freeze({ authority: final.authority, source, sdkRights: rights, packageIdentity });
      const receipt: FunctionChainReceipt = Object.freeze({
        packet: "P03",
        evidence: "V1",
        invocationId,
        definitionDigest: definition.artifactDigest,
        sourceIdentity: source.identity.digest,
        packageIdentity,
        operatorId: source.operatorId,
      });
      return effect(grant).then(value => dispatched(value, receipt));
    },
  );
  return outcome.decision === "refused" ? Object.freeze({ status: "refused", layer: "source", refusal: outcome }) : outcome.value;
}
