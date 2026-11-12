/**
 * mechanical-host-binding.ts — Pi's consumer of MechanicalWorkflows' PROPOSED application-host binding mechanical.pi-host/v1
 * (wb-w8fk, MWI B-contract-choice, slice PI-0; the P00 ruling packet of mechanical-native-interoperability-2026-11-09). Each
 * claim below names the cases of test/workbench-mechanical-host-binding.test.ts that pin it, and claims nothing those cases do
 * not plant.
 *
 * STANDING: PROPOSED, NOT ADOPTED (HB-STANDING). The producer committed this binding as a proposal, a closed JSON schema plus a
 * validator, with its joint ratification with Pi recorded as a condition it does not fabricate (MechanicalWorkflows 6c2873043ce4,
 * MechanicalWorkflows-loexn.2). This module is the consumer half of that proposal: it validates a binding against the
 * producer's committed shape and nothing more. Validating a binding authorizes nothing: no route, loader, dispatch or effect
 * reads this module, and the function action stays unadopted (function-authority.ts, FUNCTION_ACTION_CONTRACT). Adoption needs
 * what EAT-R151 names, a conformance run against a packed MechanicalWorkflows artifact and the recorded acceptance of both
 * owners, which this module does not claim.
 *
 * The producer's schema of record is MechanicalWorkflows contracts/schemas/mechanical-host-binding.v1.schema.json at 6c2873043ce4
 * (blob 1c20bc86f270, the same blob at MechanicalWorkflows main 69cb016dd293), vendored byte for byte as
 * test/fixtures/mechanical-host-binding.v1.schema.json (HB-SCHEMA-PIN). The member lists, literals, enumerations and patterns
 * below are each compared with that file (HB-SCHEMA-SHAPE), and every refusal the suite plants is also refused by the suite's
 * own reader of that schema.
 *
 * validateMechanicalHostBinding judges in this order and returns the first refusal, never throwing. A refusal is
 * {code: "mechanical-host-binding-refused", field, reason}, frozen, with field and reason from the closed lists below and no
 * other member, so it carries no member name, value or text from the binding (HB-DIAGNOSTIC).
 *  1. The binding is an object that is not a list (not-an-object at binding: HB-NOT-OBJECT binding, HB-R150-NOT-OBJECT-*).
 *  2. contract, judged before anything else (HB-R006-VERSION-FIRST): absent is member-missing, a value that is not a string is
 *     member-invalid, and a string other than mechanical.pi-host/v1 is version-unsupported (HB-LEAF contract *,
 *     HB-R006-VERSION-*, HB-R150-TOOL-REPLY-CONTRACT, HB-R150-DESCRIPTOR-CONTRACT, HB-R150-TOOL-REPLY-RECORD,
 *     HB-R150-DESCRIPTOR-RECORD).
 *  3. The member set, compared name for name with the schema's eight: each absent member is member-missing under its own
 *     name, the first in the schema's order (HB-MISSING *, HB-R005-*-INSTEAD, HB-R148-CONTEXT-NOT-DEFAULTED,
 *     HB-R149-RESULT-MODE-ONLY); then any other own member is member-unexpected at binding (HB-UNEXPECTED binding,
 *     HB-R006-UNKNOWN-MEMBER, HB-R005-*-BESIDE, HB-R148-HOSTMODE-MEMBER *, HB-R149-RESULT-MODE-BESIDE, HB-R150-BORROW-*,
 *     HB-R150-DIGEST-TO-TOP). No member is read for another: a profile is never defaulted or taken from another member.
 *  4. descriptorId names the reviewed entry of mechanical-descriptor.ts (MECHANICAL_REVIEWED_ENTRYPOINTS) by strict equality,
 *     else member-invalid (HB-LEAF descriptorId *, HB-R006-DEFINITION-*); an admitted binding resolves to that entry (HB-VALID).
 *  5. artifact, then source, then intent, each judged as the binding is in steps 1 and 3 (not-an-object, member-missing,
 *     member-unexpected at that object: HB-NOT-OBJECT, HB-MISSING, HB-UNEXPECTED, HB-R150-DIGEST-INTO-SOURCE,
 *     HB-R150-DESCRIPTOR-DIGEST-INTO-SOURCE), interleaved with the members between them in the schema's order: artifact.package
 *     and artifact.export equal the reviewed entry's package and export; artifact.sha256, artifact.descriptorSha256 and
 *     source.forgeManifestSha256 match the digest pattern; source.workspaceRealpath matches the realpath pattern;
 *     source.baseCommit and source.baseTree match the Git id pattern; invocationId and intent.task are non-empty strings;
 *     intent.writer is single; intent.allowedEffects is a list of non-empty strings; each else member-invalid (HB-LEAF *).
 *     evidenceProfile and contextProfile are each judged alone against their own enumeration, else profile-unknown (HB-LEAF
 *     evidenceProfile *, HB-LEAF contextProfile *, HB-R148-TRANSPORT-IN-*, HB-R148-SWAPPED-IN-*); all four pairs pass
 *     (HB-PROFILES).
 * An admitted binding is returned as a fresh copy, frozen at every object, equal to what was validated (HB-VALID).
 *
 * admitMechanicalHostBinding validates first and calls the host's loader only for an admitted binding, once, with the binding
 * and the reviewed entry, and hands back what the loader returned without calling it (HB-ADMIT-ONCE); a refused binding
 * reaches no loader and no provider (every refusal row); a loader's rejection propagates (HB-ADMIT-REJECT).
 *
 * NOT CLAIMED (explicitly partial; external MW-CONTRACT): adoption of the binding, its selectors or a grant (EAT-R151,
 * EAT-R204); the joint rulings of EAT-R203 to EAT-R206; a request-level selector stage joining the request's hostMode with a
 * binding, and any later refusal of a native profile; a projection of a producer result; any wiring into workflow_execute, a
 * route, a loader or an effect; values that are not plain JSON data (accessors, proxies, symbol keys, non-enumerable or
 * inherited members, sparse lists); and a length the schema counts in code points where this module counts UTF-16 units.
 */
import { FUNCTION_ACTION_BLOCKER } from "./function-authority.js";
import { MECHANICAL_DIGEST_PATTERN, MECHANICAL_REVIEWED_ENTRYPOINTS, type MechanicalReviewedEntrypoint } from "./mechanical-descriptor.js";

/** The binding contract this consumer reads, compared by strict equality (step 2). */
export const MECHANICAL_HOST_BINDING_CONTRACT = "mechanical.pi-host/v1";
/** The binding's standing: a producer proposal, not a jointly adopted contract. */
export const MECHANICAL_HOST_BINDING_STANDING: Readonly<{ state: "proposed"; blockedOn: typeof FUNCTION_ACTION_BLOCKER }> = Object.freeze({
  state: "proposed",
  blockedOn: FUNCTION_ACTION_BLOCKER,
});
/** The producer's proposed evidence and context profiles, each its own closed enumeration (step 5). */
export const MECHANICAL_EVIDENCE_PROFILES = Object.freeze(["git-census-v1", "hx-task-scope-v1"] as const);
export const MECHANICAL_CONTEXT_PROFILES = Object.freeze(["plain-v1", "rf-committed-v1"] as const);
/** The one writer a binding may name (step 5). */
export const MECHANICAL_INTENT_WRITER = "single";
/** The member list of each object of the binding, in the producer schema's order (steps 3 and 5). */
export const MECHANICAL_HOST_BINDING_SHAPE = Object.freeze({
  binding: Object.freeze(["contract", "descriptorId", "artifact", "source", "invocationId", "evidenceProfile", "contextProfile", "intent"] as const),
  artifact: Object.freeze(["package", "export", "sha256", "descriptorSha256"] as const),
  source: Object.freeze(["workspaceRealpath", "baseCommit", "baseTree", "forgeManifestSha256"] as const),
  intent: Object.freeze(["task", "writer", "allowedEffects"] as const),
});
/** The patterns, spelled as the producer schema spells them; the digest is mechanical-descriptor.ts's own (step 5). */
export const MECHANICAL_HOST_BINDING_PATTERNS = Object.freeze({
  digest: MECHANICAL_DIGEST_PATTERN.source,
  realpath: "^/[^\\u0000]*$",
  gitId: "^[0-9a-f]{40}$",
});
/** Where a refusal sits: the binding as a whole or one of its members, by its dotted path. */
export const MECHANICAL_HOST_BINDING_FIELDS = Object.freeze([
  "binding",
  "contract",
  "descriptorId",
  "artifact",
  "artifact.package",
  "artifact.export",
  "artifact.sha256",
  "artifact.descriptorSha256",
  "source",
  "source.workspaceRealpath",
  "source.baseCommit",
  "source.baseTree",
  "source.forgeManifestSha256",
  "invocationId",
  "evidenceProfile",
  "contextProfile",
  "intent",
  "intent.task",
  "intent.writer",
  "intent.allowedEffects",
] as const);
export type MechanicalHostBindingField = (typeof MECHANICAL_HOST_BINDING_FIELDS)[number];
/** Why: the closed refusal vocabulary. */
export const MECHANICAL_HOST_BINDING_REASONS = Object.freeze(["not-an-object", "member-missing", "member-unexpected", "member-invalid", "version-unsupported", "profile-unknown"] as const);
export type MechanicalHostBindingReason = (typeof MECHANICAL_HOST_BINDING_REASONS)[number];
/** One refusal: closed vocabulary only, never a member name, a value or text from the binding. */
export interface MechanicalHostBindingDiagnostic {
  readonly code: "mechanical-host-binding-refused";
  readonly field: MechanicalHostBindingField;
  readonly reason: MechanicalHostBindingReason;
}
export type MechanicalEvidenceProfile = (typeof MECHANICAL_EVIDENCE_PROFILES)[number];
export type MechanicalContextProfile = (typeof MECHANICAL_CONTEXT_PROFILES)[number];
/** A binding as validated: the producer schema's members, with the evidence and context profiles narrowed to their enumerations. */
export interface MechanicalHostBindingV1 {
  readonly contract: typeof MECHANICAL_HOST_BINDING_CONTRACT;
  readonly descriptorId: string;
  readonly artifact: { readonly package: string; readonly export: string; readonly sha256: string; readonly descriptorSha256: string };
  readonly source: { readonly workspaceRealpath: string; readonly baseCommit: string; readonly baseTree: string; readonly forgeManifestSha256: string };
  readonly invocationId: string;
  readonly evidenceProfile: MechanicalEvidenceProfile;
  readonly contextProfile: MechanicalContextProfile;
  readonly intent: { readonly task: string; readonly writer: typeof MECHANICAL_INTENT_WRITER; readonly allowedEffects: readonly string[] };
}
export type MechanicalHostBindingVerdict =
  | { readonly ok: true; readonly binding: MechanicalHostBindingV1; readonly entry: MechanicalReviewedEntrypoint }
  | { readonly ok: false; readonly diagnostic: MechanicalHostBindingDiagnostic };
/** The host's loader: it receives the validated binding and the reviewed entry, never a string the binding alone spelled. */
export type MechanicalHostBindingLoader<T> = (binding: MechanicalHostBindingV1, entry: MechanicalReviewedEntrypoint) => Promise<T>;
export type MechanicalHostBindingAdmission<T> =
  | { readonly ok: true; readonly binding: MechanicalHostBindingV1; readonly entry: MechanicalReviewedEntrypoint; readonly loaded: T }
  | { readonly ok: false; readonly diagnostic: MechanicalHostBindingDiagnostic };

type Refusal = { readonly ok: false; readonly diagnostic: MechanicalHostBindingDiagnostic };
type Members = Readonly<Record<string, unknown>>;
type ObjectField = "binding" | "artifact" | "source" | "intent";

const DIGEST = new RegExp(MECHANICAL_HOST_BINDING_PATTERNS.digest);
const REALPATH = new RegExp(MECHANICAL_HOST_BINDING_PATTERNS.realpath);
const GIT_ID = new RegExp(MECHANICAL_HOST_BINDING_PATTERNS.gitId);

const refuse = (field: MechanicalHostBindingField, reason: MechanicalHostBindingReason): Refusal =>
  Object.freeze({ ok: false as const, diagnostic: Object.freeze({ code: "mechanical-host-binding-refused" as const, field, reason }) });
const isRefusal = (value: unknown): value is Refusal => typeof value === "object" && value !== null && Object.hasOwn(value, "diagnostic");
const membersOf = (value: unknown): Members | undefined => (typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Members) : undefined);
const pathOf = (object: ObjectField, member: string): MechanicalHostBindingField => {
  const path = object === "binding" ? member : `${object}.${member}`;
  const field = MECHANICAL_HOST_BINDING_FIELDS.find(known => known === path);
  if (field === undefined) throw new Error(`no refusal field for ${path}`);
  return field;
};

/** Steps 1, 3 and 5: an object that is not a list, holding exactly its listed members as its own. */
function closed(value: unknown, object: ObjectField): Members | Refusal {
  const members = membersOf(value);
  if (members === undefined) return refuse(object, "not-an-object");
  const listed: readonly string[] = MECHANICAL_HOST_BINDING_SHAPE[object];
  for (const member of listed) if (!Object.hasOwn(members, member)) return refuse(pathOf(object, member), "member-missing");
  for (const key of Reflect.ownKeys(members)) if (typeof key !== "string" || !listed.includes(key)) return refuse(object, "member-unexpected");
  return members;
}
const text = (value: unknown, pattern?: RegExp): value is string => typeof value === "string" && value.length > 0 && (pattern === undefined || pattern.test(value));
const oneOf = <T extends string>(value: unknown, allowed: readonly T[]): value is T => typeof value === "string" && allowed.some(member => member === value);

/** Judge a binding against the producer's proposed v1 shape, in the order the header lists; never loads anything. */
export function validateMechanicalHostBinding(raw: unknown): MechanicalHostBindingVerdict {
  const top = membersOf(raw);
  if (top === undefined) return refuse("binding", "not-an-object");
  if (!Object.hasOwn(top, "contract")) return refuse("contract", "member-missing");
  if (typeof top.contract !== "string") return refuse("contract", "member-invalid");
  if (top.contract !== MECHANICAL_HOST_BINDING_CONTRACT) return refuse("contract", "version-unsupported");
  const binding = closed(top, "binding");
  if (isRefusal(binding)) return binding;
  const entry = MECHANICAL_REVIEWED_ENTRYPOINTS.find(reviewed => reviewed.id === binding.descriptorId);
  if (entry === undefined) return refuse("descriptorId", "member-invalid");
  const artifact = closed(binding.artifact, "artifact");
  if (isRefusal(artifact)) return artifact;
  if (artifact.package !== entry.package) return refuse("artifact.package", "member-invalid");
  if (artifact.export !== entry.export) return refuse("artifact.export", "member-invalid");
  if (!text(artifact.sha256, DIGEST)) return refuse("artifact.sha256", "member-invalid");
  if (!text(artifact.descriptorSha256, DIGEST)) return refuse("artifact.descriptorSha256", "member-invalid");
  const source = closed(binding.source, "source");
  if (isRefusal(source)) return source;
  if (!text(source.workspaceRealpath, REALPATH)) return refuse("source.workspaceRealpath", "member-invalid");
  if (!text(source.baseCommit, GIT_ID)) return refuse("source.baseCommit", "member-invalid");
  if (!text(source.baseTree, GIT_ID)) return refuse("source.baseTree", "member-invalid");
  if (!text(source.forgeManifestSha256, DIGEST)) return refuse("source.forgeManifestSha256", "member-invalid");
  if (!text(binding.invocationId)) return refuse("invocationId", "member-invalid");
  if (!oneOf(binding.evidenceProfile, MECHANICAL_EVIDENCE_PROFILES)) return refuse("evidenceProfile", "profile-unknown");
  if (!oneOf(binding.contextProfile, MECHANICAL_CONTEXT_PROFILES)) return refuse("contextProfile", "profile-unknown");
  const intent = closed(binding.intent, "intent");
  if (isRefusal(intent)) return intent;
  if (!text(intent.task)) return refuse("intent.task", "member-invalid");
  if (intent.writer !== MECHANICAL_INTENT_WRITER) return refuse("intent.writer", "member-invalid");
  if (!Array.isArray(intent.allowedEffects)) return refuse("intent.allowedEffects", "member-invalid");
  const effects: readonly unknown[] = intent.allowedEffects;
  const allowedEffects: string[] = [];
  for (let at = 0; at < effects.length; at += 1) {
    const effect = effects[at];
    if (!text(effect)) return refuse("intent.allowedEffects", "member-invalid");
    allowedEffects.push(effect);
  }
  const validated: MechanicalHostBindingV1 = Object.freeze({
    contract: MECHANICAL_HOST_BINDING_CONTRACT,
    descriptorId: entry.id,
    artifact: Object.freeze({ package: entry.package, export: entry.export, sha256: artifact.sha256, descriptorSha256: artifact.descriptorSha256 }),
    source: Object.freeze({ workspaceRealpath: source.workspaceRealpath, baseCommit: source.baseCommit, baseTree: source.baseTree, forgeManifestSha256: source.forgeManifestSha256 }),
    invocationId: binding.invocationId,
    evidenceProfile: binding.evidenceProfile,
    contextProfile: binding.contextProfile,
    intent: Object.freeze({ task: intent.task, writer: MECHANICAL_INTENT_WRITER, allowedEffects: Object.freeze(allowedEffects) }),
  });
  return Object.freeze({ ok: true as const, binding: validated, entry });
}

/** Validate first; the host's loader runs once, and only for an admitted binding, so a refused binding reaches no loader or provider. */
export async function admitMechanicalHostBinding<T>(raw: unknown, load: MechanicalHostBindingLoader<T>): Promise<MechanicalHostBindingAdmission<T>> {
  const verdict = validateMechanicalHostBinding(raw);
  if (!verdict.ok) return verdict;
  const loaded = await load(verdict.binding, verdict.entry);
  return Object.freeze({ ok: true as const, binding: verdict.binding, entry: verdict.entry, loaded });
}
