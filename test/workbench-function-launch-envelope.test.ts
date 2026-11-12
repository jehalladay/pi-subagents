/**
 * wb-ig6n cut #1, EAT-R441 criterion 1 only (the MII P04+ packet "Registered dispatch: route, effect-axis, refusal
 * envelope"; its description asks for one criterion per cut, with the EAT id in every receipt): the envelope of each reply
 * the registered workflow_execute gives to this file's function-definition requests, and the two members criterion 1
 * names on the pure reply builder.
 *
 * Requirement: docs/workbench/programs/mechanical-interop-integrity-2026-11-10/requirements/ATOMIC-REQUIREMENTS.md on
 * pi-subagents master 53ac7f35, EAT-R441 ("Keep the launch reply launch-only"). CRITERION_1 and STATEMENT below hold
 * criterion 1 and the row's Statement verbatim, and the receipt docs/workbench/receipts/wb-ig6n.md holds both again.
 *
 * ORACLE-REG (the same document's "Execution and evidence conventions"): the workflow_execute tool object as src/index.ts
 * registers it (pi.registerTool(createWorkflowExecuteTool(...))), driven through its execute member. The rows boot the
 * real extension under the claude workbench backend with test/helpers/boot-extension.ts and take the tool from that
 * registration, never from createWorkflowExecuteTool. A row's host grants are the sandbox settings file's
 * workbench.capabilityGrants, written before the row's call (the tool reads them from host context on every call).
 *
 * CLAIMED: the sentences of CLAIMS below, each by the cases its PINS entry names (C1 the ORACLE-REG rows E1-E8; C2 the
 * pure builder rows B1-B5; C3-C6 the source anchors A1-A4 and the settings refusal case N1; C7-C8 the controls K1-K2
 * that show the two readers can fail; C9 the judged-set case J1 and the records case R1). The receipt's "- CLAIM "
 * lines hold the same sentences.
 * NOT CLAIMED: the sentences of NOT_CLAIMED below (a successful function launch reply, which no base row reaches; other
 * definition kinds, requests, grants, host modes and outcomes; member values beyond the pinned types; criteria 2-4 of
 * EAT-R441; the two script-path suites criterion 1 names, which this cut leaves unedited; EAT-R412, R419, R426, R461 and
 * R465). The receipt's "- NOT CLAIMED " lines hold the same sentences.
 * NAMED RESIDUALS: none.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import ts from "typescript";
import { afterAll, beforeAll, beforeEach, describe, expect, it, type RunnerTask } from "vitest";
import subagentsExtension from "../src/index.js";
import { buildWorkflowExecuteReply, decideExecute, EXECUTE_CONTRACT_VERSION, EXECUTE_HOST_MODES, type LaunchOutcome } from "../src/workbench/execute.js";
import type { DefinitionRef } from "../src/workbench/identity.js";
import { ctx, type Hermetic, hermeticDir, makePi } from "./helpers/boot-extension.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const RECEIPT = "docs/workbench/receipts/wb-ig6n.md";
/** The receipt entry this cut adds; J1 reads the receipt lines of this entry only. */
const ENTRY_HEADING = "## 2026-11-11 receipt: EAT-R441 criterion 1 ";
/** The module that declares the envelope the model reads (WorkflowExecuteEnvelope) and the launch refusal codes. */
const ENVELOPE_MODULE = "src/workbench/execute-tool.ts";
/** The pure admission and reply builder module (WorkflowExecuteReply, ExecuteRefusalPolicy, LaunchStatus). */
const BUILDER_MODULE = "src/workbench/execute.ts";

/** EAT-R441 criterion 1, verbatim from the requirement file; the receipt's "- CRITERION 1 " line holds the same text. */
const CRITERION_1 =
  'Through ORACLE-REG the function-route reply parses as the pinned envelope plus additive versioned members: `contract === "workbench.tool-reply/v1"`, `tool === "workflow_execute"`, `next` absent; the script-path rows of workbench-surface-census.test.ts and workbench-execute-tool.test.ts stay green unedited. A unit assertion on the pure builder checks `contractVersion === "workbench.execute/v1"` and boolean `truncated`.';
/** EAT-R441's Statement, verbatim; the receipt's "- STATEMENT " line holds the same text. */
const STATEMENT =
  'The function launch reply MUST keep the registered tool\'s model-facing envelope as pinned — `contract: "workbench.tool-reply/v1"`, `tool: "workflow_execute"`, `ok`, `invoked`, `status`, `completion: "not-asserted"`, `nativeRefs` and the optional members `invocationId`, `definition`, `hostMode`, `nativeRefsOmitted`, `policy`, `provenance`, `error`, `truncated {reason, maxBytes}`, `truncation` — adding only versioned members; MUST NOT add the illustration member `next` or emit the bare string `tool-reply/v1`; MUST NOT emit `accepted` for the function route without a ratified meaning, and no launch, observation or UI surface MAY render SUCCESS/completed/verified from a launch result.';

/** The envelope members the Statement pins, in its order; A1 reads the same list from the Statement and from the source. */
const PINNED_MEMBERS = [
  "contract",
  "tool",
  "ok",
  "invoked",
  "status",
  "completion",
  "nativeRefs",
  "invocationId",
  "definition",
  "hostMode",
  "nativeRefsOmitted",
  "policy",
  "provenance",
  "error",
  "truncated",
  "truncation",
] as const;
/** The members the Statement names before "and the optional members", in its order. */
const REQUIRED_MEMBERS = ["contract", "tool", "ok", "invoked", "status", "completion", "nativeRefs"] as const;
type PinnedMember = (typeof PINNED_MEMBERS)[number];

type Json = Readonly<Record<string, unknown>>;
function plainRecord(value: unknown): value is Json {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** A plain object whose own members are exactly `required` plus any of `optional`. */
function exactMembers(value: unknown, required: readonly string[], optional: readonly string[] = []): value is Json {
  if (!plainRecord(value)) return false;
  const keys = Object.keys(value);
  return required.every(key => Object.hasOwn(value, key)) && keys.every(key => required.includes(key) || optional.includes(key));
}
const isString = (value: unknown): value is string => typeof value === "string";
const isNativeRef = (value: unknown): boolean =>
  exactMembers(value, ["provider", "type", "id"], ["scope"]) && isString(value.provider) && isString(value.type) && isString(value.id) && (value.scope === undefined || isString(value.scope));

/** The pinned type of each envelope member (WorkflowExecuteEnvelope, src/workbench/execute-tool.ts), as envelopeFindings checks it. */
const PINNED_TYPES: Readonly<Record<PinnedMember, { readonly type: string; readonly check: (value: unknown) => boolean }>> = {
  contract: { type: '"workbench.tool-reply/v1"', check: value => value === "workbench.tool-reply/v1" },
  tool: { type: '"workflow_execute"', check: value => value === "workflow_execute" },
  ok: { type: "boolean", check: value => typeof value === "boolean" },
  invoked: { type: "boolean", check: value => typeof value === "boolean" },
  status: { type: '"accepted" | "launched" | "refused"', check: value => value === "accepted" || value === "launched" || value === "refused" },
  completion: { type: '"not-asserted"', check: value => value === "not-asserted" },
  nativeRefs: { type: "NativeRef[]", check: value => Array.isArray(value) && value.every(isNativeRef) },
  invocationId: { type: "string", check: isString },
  definition: {
    type: "{kind, id, schemaVersion, artifactDigest}",
    check: value =>
      exactMembers(value, ["kind", "id", "schemaVersion", "artifactDigest"]) &&
      (value.kind === "script" || value.kind === "function" || value.kind === "furnace-formula") &&
      isString(value.id) &&
      isString(value.schemaVersion) &&
      isString(value.artifactDigest),
  },
  hostMode: { type: '"embedded" | "detached"', check: value => value === "embedded" || value === "detached" },
  nativeRefsOmitted: { type: "{count: number, reason: string}", check: value => exactMembers(value, ["count", "reason"]) && typeof value.count === "number" && isString(value.reason) },
  policy: { type: "JSON value", check: value => value !== undefined },
  provenance: {
    type: '{grant: "workbench:execute", admissionPolicy: "digest-pinned+exact-execute-grant", principalRole: "local-operator", workspace: string}',
    check: value =>
      exactMembers(value, ["grant", "admissionPolicy", "principalRole", "workspace"]) &&
      value.grant === "workbench:execute" &&
      value.admissionPolicy === "digest-pinned+exact-execute-grant" &&
      value.principalRole === "local-operator" &&
      isString(value.workspace),
  },
  error: { type: "{code: string, message: string}", check: value => exactMembers(value, ["code", "message"]) && isString(value.code) && isString(value.message) },
  truncated: { type: '{reason: "byte-cap", maxBytes: number}', check: value => exactMembers(value, ["reason", "maxBytes"]) && value.reason === "byte-cap" && typeof value.maxBytes === "number" },
  truncation: { type: "string", check: isString },
};
const pinned = (key: string): key is PinnedMember => (PINNED_MEMBERS as readonly string[]).includes(key);

/** The pinned-envelope reader: every finding that keeps `value` from parsing as WorkflowExecuteEnvelope, in a fixed order. */
function envelopeFindings(value: unknown): string[] {
  if (!plainRecord(value)) return ["not a JSON object"];
  const findings: string[] = [];
  for (const key of Object.keys(value)) if (!pinned(key)) findings.push(`unpinned member ${key}`);
  for (const key of REQUIRED_MEMBERS) if (!Object.hasOwn(value, key)) findings.push(`missing member ${key}`);
  for (const key of PINNED_MEMBERS) {
    if (Object.hasOwn(value, key) && !PINNED_TYPES[key].check(value[key])) findings.push(`member ${key} is not ${PINNED_TYPES[key].type}`);
  }
  return findings;
}
/** Each occurrence of tool-reply/v1 in `text` that is not the tail of the full contract value workbench.tool-reply/v1. */
function bareContractTokens(text: string): string[] {
  return [...text.matchAll(/(?<!workbench\.)tool-reply\/v1/g)].map(match => match[0]);
}

/** The reviewed embedded function the MII program names (mechanical.development.develop.v1 under its pinned entrypoint schema). */
const REVIEWED = Object.freeze({
  kind: "function",
  id: "mechanical.development.develop.v1",
  schemaVersion: "mechanical-workflows/entrypoint/v1",
  artifactDigest: `sha256:${"ab".repeat(32)}`,
} as const);
const EXECUTE = "workbench:execute";
const DETACH = "workbench:detach";
/** A workflow_execute request for the reviewed function, with request members and definitionRef members replaced or added. */
function request(over: Json = {}, definition: Json = {}): Json {
  return { definitionRef: { ...REVIEWED, ...definition }, input: { task: "t" }, hostMode: "embedded", ...over };
}
/** The members an admission refusal's envelope carries, and the members a host-boundary refusal's envelope carries. */
const ADMISSION_MEMBERS = ["contract", "tool", "ok", "invoked", "status", "completion", "nativeRefs", "error"] as const;
const BOUNDARY_MEMBERS = ["contract", "tool", "ok", "invoked", "status", "completion", "definition", "hostMode", "nativeRefs", "provenance", "error"] as const;

interface EnvelopeRow {
  readonly id: string;
  readonly label: string;
  readonly grants: readonly string[];
  readonly params: Json;
  readonly members: readonly string[];
  readonly code: string;
}
/** C1: the function-definition requests the registered tool answers at this base, each under its host grants. */
const ROWS: readonly EnvelopeRow[] = [
  {
    id: "E1",
    label: "the reviewed function mechanical.development.develop.v1 (hostMode embedded, JSON policy {note}) under [workbench:execute]",
    grants: [EXECUTE],
    params: request({ policy: { note: "fixture" } }),
    members: ["contract", "tool", "ok", "invoked", "status", "completion", "definition", "hostMode", "nativeRefs", "policy", "provenance", "error"],
    code: "unsupported-definition-kind",
  },
  { id: "E2", label: "the reviewed function (hostMode detached) under [workbench:execute, workbench:detach]", grants: [EXECUTE, DETACH], params: request({ hostMode: "detached" }), members: BOUNDARY_MEMBERS, code: "unsupported-definition-kind" },
  { id: "E3", label: "the reviewed function (hostMode detached) under [workbench:execute]", grants: [EXECUTE], params: request({ hostMode: "detached" }), members: BOUNDARY_MEMBERS, code: "missing-detach-grant" },
  { id: "E4", label: "the reviewed function (hostMode embedded) under no grant", grants: [], params: request(), members: ADMISSION_MEMBERS, code: "missing-execute-grant" },
  { id: "E5", label: "the reviewed function with artifactDigest main under [workbench:execute]", grants: [EXECUTE], params: request({}, { artifactDigest: "main" }), members: ADMISSION_MEMBERS, code: "non-digest-definition" },
  { id: "E6", label: "the reviewed function with hostMode remote under [workbench:execute]", grants: [EXECUTE], params: request({ hostMode: "remote" }), members: ADMISSION_MEMBERS, code: "unknown-host-mode" },
  { id: "E7", label: "the reviewed function with the JSON policy allow (a string) under [workbench:execute]", grants: [EXECUTE], params: request({ policy: "allow" }), members: ADMISSION_MEMBERS, code: "malformed-policy" },
  { id: "E8", label: "the reviewed function with an extra definitionRef member entry under [workbench:execute]", grants: [EXECUTE], params: request({}, { entry: "develop" }), members: ADMISSION_MEMBERS, code: "malformed-request" },
];
/**
 * The ExecuteErrorCode members no ROWS entry reaches, with the case that shows why. The kind refusal (execute-tool.ts,
 * unsupported-definition-kind) is decided before the saved source is resolved, so E1 and E2, whose definition id names no
 * saved source, answer unsupported-definition-kind; N1 shows the settings loader rejects an unreadable grant list first.
 */
const NOT_REACHED: Readonly<Record<string, string>> = {
  "unknown-permission-data": "N1: the settings loader rejects each UNREADABLE_GRANTS list before decideExecute reads permission data",
  "source-unavailable": "E1, E2: decided after the kind refusal, which answers these rows' function definitions first",
  "definition-digest-mismatch": "E1, E2: decided after the kind refusal, which answers these rows' function definitions first",
  "definition-schema-mismatch": "E1, E2: decided after the kind refusal, which answers these rows' function definitions first",
  "launch-failed": "E1, E2: decided after the kind refusal, which answers these rows' function definitions first",
};
/** N1: unreadable grant lists, each written as the sandbox settings file's workbench.capabilityGrants. */
const UNREADABLE_GRANTS: ReadonlyArray<readonly [string, unknown]> = [
  ["a grant without a namespace separator", ["workbench execute"]],
  ["a bare string instead of a list", "workbench:execute"],
  ["a number in the list", [7]],
];
const SETTINGS_ERROR = "workbench.capabilityGrants must be a finite array of explicit namespace:permission identifiers without wildcards.";

interface BuilderRow {
  readonly id: string;
  readonly label: string;
  readonly grants: readonly string[];
  readonly definition: Readonly<Partial<Pick<DefinitionRef, "id" | "schemaVersion">>>;
  readonly outcome: LaunchOutcome | undefined;
  readonly maxBytes: number | undefined;
  readonly status: string;
  readonly truncated: boolean;
}
const long = (fill: string): string => fill.repeat(256);
const LONG_REF = Object.freeze({ provider: long("p"), type: long("t"), id: long("x"), scope: long("w") });
/** C2: the pure builder over decideExecute's decision for the reviewed embedded function and each launch outcome kind. */
const BUILDER_ROWS: readonly BuilderRow[] = [
  { id: "B1", label: "the reviewed function admitted under [workbench:execute] and the outcome accepted", grants: [EXECUTE], definition: {}, outcome: { status: "accepted" }, maxBytes: undefined, status: "accepted", truncated: false },
  {
    id: "B2",
    label: "the reviewed function admitted under [workbench:execute] and the outcome launched with one native reference",
    grants: [EXECUTE],
    definition: {},
    outcome: { status: "launched", nativeRefs: [{ provider: "pi-workflow", type: "task", id: "wf_ig6nlaunched" }] },
    maxBytes: undefined,
    status: "launched",
    truncated: false,
  },
  { id: "B3", label: "the reviewed function admitted under [workbench:execute] and the outcome refused with a reason", grants: [EXECUTE], definition: {}, outcome: { status: "refused", reason: "launcher refused" }, maxBytes: undefined, status: "refused", truncated: false },
  { id: "B4", label: "the reviewed function refused under no grant, with no outcome", grants: [], definition: {}, outcome: undefined, maxBytes: undefined, status: "refused", truncated: false },
  {
    id: "B5",
    label: "the reviewed function with a 256-character id and schemaVersion admitted under [workbench:execute], the outcome launched with two 256-character native references, at maxBytes 2048",
    grants: [EXECUTE],
    definition: { id: long("i"), schemaVersion: long("s") },
    outcome: { status: "launched", nativeRefs: [LONG_REF, LONG_REF] },
    maxBytes: 2048,
    status: "launched",
    truncated: true,
  },
];

/** K1: the E1 reply with one edit each, and the one finding envelopeFindings must report for it. */
interface ParserControl {
  readonly id: string;
  readonly edit: (reply: Record<string, unknown>) => void;
  readonly finding: string;
}
const removing = (member: string) => (reply: Record<string, unknown>): void => {
  Reflect.deleteProperty(reply, member);
};
const setting = (member: string, value: unknown) => (reply: Record<string, unknown>): void => {
  reply[member] = value;
};
const PARSER_CONTROLS: readonly ParserControl[] = [
  { id: "P-next", edit: setting("next", "workflow_observe"), finding: "unpinned member next" },
  { id: "P-unpinned", edit: setting("version", "v2"), finding: "unpinned member version" },
  ...REQUIRED_MEMBERS.map(member => ({ id: `P-missing-${member}`, edit: removing(member), finding: `missing member ${member}` })),
  { id: "P-type-contract", edit: setting("contract", "tool-reply/v1"), finding: 'member contract is not "workbench.tool-reply/v1"' },
  { id: "P-type-tool", edit: setting("tool", "workflow_observe"), finding: 'member tool is not "workflow_execute"' },
  { id: "P-type-ok", edit: setting("ok", "false"), finding: "member ok is not boolean" },
  { id: "P-type-invoked", edit: setting("invoked", 0), finding: "member invoked is not boolean" },
  { id: "P-type-status", edit: setting("status", "settled"), finding: 'member status is not "accepted" | "launched" | "refused"' },
  { id: "P-type-completion", edit: setting("completion", "asserted"), finding: 'member completion is not "not-asserted"' },
  { id: "P-type-nativeRefs", edit: setting("nativeRefs", {}), finding: "member nativeRefs is not NativeRef[]" },
  { id: "P-type-invocationId", edit: setting("invocationId", 7), finding: "member invocationId is not string" },
  { id: "P-type-definition", edit: setting("definition", { kind: "function", id: "x", schemaVersion: "y" }), finding: "member definition is not {kind, id, schemaVersion, artifactDigest}" },
  { id: "P-type-hostMode", edit: setting("hostMode", "remote"), finding: 'member hostMode is not "embedded" | "detached"' },
  { id: "P-type-nativeRefsOmitted", edit: setting("nativeRefsOmitted", { count: "1", reason: "r" }), finding: "member nativeRefsOmitted is not {count: number, reason: string}" },
  {
    id: "P-type-provenance",
    edit: setting("provenance", { grant: "workbench:execute", admissionPolicy: "digest-pinned+exact-execute-grant", principalRole: "local-operator", workspace: "/w", extra: 1 }),
    finding: 'member provenance is not {grant: "workbench:execute", admissionPolicy: "digest-pinned+exact-execute-grant", principalRole: "local-operator", workspace: string}',
  },
  { id: "P-type-error", edit: setting("error", { code: 1, message: "m" }), finding: "member error is not {code: string, message: string}" },
  { id: "P-type-truncated", edit: setting("truncated", true), finding: 'member truncated is not {reason: "byte-cap", maxBytes: number}' },
  { id: "P-type-truncation", edit: setting("truncation", 5), finding: "member truncation is not string" },
];
/** K2: texts for bareContractTokens and the tokens it must report. */
const BARE_CONTROLS: ReadonlyArray<readonly [string, readonly string[]]> = [
  ['{"contract":"tool-reply/v1"}', ["tool-reply/v1"]],
  ['{"contract":"workbench.tool-reply/v1"}', []],
  ["tool-reply/v1 then workbench.tool-reply/v1 then tool-reply/v1", ["tool-reply/v1", "tool-reply/v1"]],
  ["workbench-tool-reply/v1", ["tool-reply/v1"]],
];

interface Claim {
  readonly id: string;
  readonly sentence: string;
  readonly pins: readonly string[];
}
/** The census header: each claim's sentence and the cases that pin it; the receipt's "- CLAIM " and "- PINS " lines hold the same. */
const CLAIMS: readonly Claim[] = [
  {
    id: "C1",
    sentence:
      "Each ROWS request E1-E8 for a kind function definition, sent to the workflow_execute tool src/index.ts registers under the row's host grants, is answered with one text part whose JSON object envelopeFindings accepts as the pinned WorkflowExecuteEnvelope, with contract workbench.tool-reply/v1, tool workflow_execute, no next member, no bare tool-reply/v1 in the text, the row's member set and the row's error code.",
    pins: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"],
  },
  {
    id: "C2",
    sentence:
      "For each BUILDER_ROWS row B1-B5, buildWorkflowExecuteReply over decideExecute's decision for the row's function request, the row's launch outcome and byte cap returns contractVersion workbench.execute/v1 and a boolean truncated equal to the row's, with the row's status.",
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C3",
    sentence:
      "PINNED_MEMBERS equals the members the WorkflowExecuteEnvelope interface of src/workbench/execute-tool.ts declares (TypeScript parse) and the members the EAT-R441 Statement names, REQUIRED_MEMBERS equals the interface's non-optional members and the Statement's members before its optional ones, and neither the interface nor PINNED_MEMBERS has a next member.",
    pins: ["A1"],
  },
  {
    id: "C4",
    sentence:
      "The WorkflowExecuteReply interface of src/workbench/execute.ts declares a required truncated of type boolean and a contractVersion typed by EXECUTE_CONTRACT_VERSION, whose declaration and runtime value are workbench.execute/v1.",
    pins: ["A2"],
  },
  {
    id: "C5",
    sentence:
      "The ROWS codes and the NOT_REACHED codes together equal, without overlap, the ExecuteRefusalPolicy and ExecuteLaunchRefusal members that make up ExecuteErrorCode (TypeScript parse), the unsupported-definition-kind rows carry every EXECUTE_HOST_MODES mode once, and under each UNREADABLE_GRANTS list the registered workflow_execute rejects with the settings loader's error instead of replying.",
    pins: ["A3", "N1"],
  },
  {
    id: "C6",
    sentence:
      "The untruncated admitted BUILDER_ROWS outcomes carry each LaunchStatus member of src/workbench/execute.ts once (TypeScript parse), BUILDER_ROWS holds one refused decision, and its truncated values are false and true.",
    pins: ["A4"],
  },
  {
    id: "C7",
    sentence:
      "envelopeFindings reports exactly each PARSER_CONTROLS control's one finding for a fresh E1 reply edited by that control alone, reports nothing for the unedited reply, and the controls remove each required member and mistype each pinned member but policy.",
    pins: ["K1"],
  },
  {
    id: "C8",
    sentence: "bareContractTokens reports each BARE_CONTROLS text's tool-reply/v1 occurrences outside workbench.tool-reply/v1 and none inside it.",
    pins: ["K2"],
  },
  {
    id: "C9",
    sentence:
      "ROWS, BUILDER_ROWS, CLAIMS and NOT_REACHED equal their frozen shapes; ROWS, BUILDER_ROWS, NOT_REACHED, PINNED_MEMBERS, REQUIRED_MEMBERS, CLAIMS with their pins, NOT_CLAIMED, CRITERION_1 and STATEMENT equal this receipt entry's lines; each claim's pins name its own cases and every case is pinned once; every test of this file is ROSTER's, registered once and in order, in run mode and not inverted; each case before R1 reached its end with its REACHED_SHAPE count, each ROWS and BUILDER_ROWS case left the MEASURED witness its row predicts, and R1 reached its end last.",
    pins: ["J1", "R1"],
  },
];
/** Scope sentences: what this census does not read; the receipt's "- NOT CLAIMED " lines hold the same. */
const NOT_CLAIMED = [
  "A successful function launch reply through the registered workflow_execute is NOT CLAIMED by this census: at base ce180d8 execute-tool.ts answers the admitted function definitions of rows E1 and E2 with the kind refusal, so no row reaches one.",
  "Script and furnace-formula definitions are NOT CLAIMED by this census.",
  "Requests, host grants, host modes, launch outcomes and byte caps other than the rows' are NOT CLAIMED by this census.",
  "Member values beyond the pinned types envelopeFindings checks, any value of policy, and the invocationId, nativeRefsOmitted, truncated and truncation members on a registered-tool reply (no row reaches them at the registered tool's 8192-byte cap) are NOT CLAIMED by this census.",
  "EAT-R441 criterion 2 (carried by wb-0ls3), criterion 3 (accepted, BLOCKED on G-RATIFY) and criterion 4 (needs a successful launch) are NOT CLAIMED by this census.",
  "That workbench-surface-census.test.ts and workbench-execute-tool.test.ts stay green unedited is NOT CLAIMED by this census: this cut leaves both files unedited and the receipt records their green run.",
  "EAT-R412, R419, R426, R461 and R465 are NOT CLAIMED by this census; the packet remainder stays owed.",
] as const;

/** RULE 16 frozen shapes, AC1-style. */
const ROWS_SHAPE = [
  "E1:unsupported-definition-kind:12",
  "E2:unsupported-definition-kind:11",
  "E3:missing-detach-grant:11",
  "E4:missing-execute-grant:8",
  "E5:non-digest-definition:8",
  "E6:unknown-host-mode:8",
  "E7:malformed-policy:8",
  "E8:malformed-request:8",
] as const;
const BUILDER_SHAPE = ["B1:accepted:false", "B2:launched:false", "B3:refused:false", "B4:refused:false", "B5:launched:true"] as const;
const CLAIMS_SHAPE = ["C1:8", "C2:5", "C3:1", "C4:1", "C5:2", "C6:1", "C7:1", "C8:1", "C9:2"] as const;
const NOT_REACHED_SHAPE = ["unknown-permission-data:N1", "source-unavailable:E1", "definition-digest-mismatch:E1", "definition-schema-mismatch:E1", "launch-failed:E1"] as const;

/** A row as the receipt's lines hold it: its id, then its request and expectation as JSON. */
const rowText = (row: EnvelopeRow): string => `${row.id} ${JSON.stringify({ grants: row.grants, params: row.params, members: row.members, code: row.code })}`;
/** A long run of one repeated character as the receipt spells it ("p x256"); every other value as JSON writes it. */
const compact = (_key: string, value: unknown): unknown => (typeof value === "string" && value.length > 64 && new Set(value).size === 1 ? `${value[0]} x${value.length}` : value);
const builderRowText = (row: BuilderRow): string =>
  `${row.id} ${JSON.stringify({ grants: row.grants, definition: row.definition, outcome: row.outcome ?? null, maxBytes: row.maxBytes ?? null, status: row.status, truncated: row.truncated }, compact)}`;

/** The string-literal members of the union type alias `name` that `sourceText` declares, in source order. */
function unionLiterals(sourceText: string, fileName: string, name: string): string[] {
  const source = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const alias = source.statements.find((statement): statement is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(statement) && statement.name.text === name);
  if (alias === undefined) throw new Error(`${fileName} declares no type alias ${name}`);
  const members = ts.isUnionTypeNode(alias.type) ? alias.type.types : [alias.type];
  return members.map(member => {
    if (!ts.isLiteralTypeNode(member) || !ts.isStringLiteral(member.literal)) throw new Error(`${name} has a member that is not a string literal: ${member.getText(source)}`);
    return member.literal.text;
  });
}
/** The type references the union type alias `name` is made of, in source order. */
function unionReferences(sourceText: string, fileName: string, name: string): string[] {
  const source = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const alias = source.statements.find((statement): statement is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(statement) && statement.name.text === name);
  if (alias === undefined) throw new Error(`${fileName} declares no type alias ${name}`);
  const members = ts.isUnionTypeNode(alias.type) ? alias.type.types : [alias.type];
  return members.map(member => member.getText(source));
}
interface InterfaceMember {
  readonly name: string;
  readonly optional: boolean;
  readonly type: string;
  readonly typeKind: ts.SyntaxKind | undefined;
}
/** The property members of interface `name` that `sourceText` declares, in source order. */
function interfaceMembers(sourceText: string, fileName: string, name: string): InterfaceMember[] {
  const source = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declaration = source.statements.find((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement) && statement.name.text === name);
  if (declaration === undefined) throw new Error(`${fileName} declares no interface ${name}`);
  return declaration.members.map(member => {
    if (!ts.isPropertySignature(member) || member.name === undefined || !ts.isIdentifier(member.name)) throw new Error(`${name} has a member that is not a named property: ${member.getText(source)}`);
    return { name: member.name.text, optional: member.questionToken !== undefined, type: member.type?.getText(source) ?? "", typeKind: member.type?.kind };
  });
}
/** The string initializer of the top-level const `name` that `sourceText` declares. */
function constString(sourceText: string, fileName: string, name: string): string {
  const source = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === name && declaration.initializer !== undefined && ts.isStringLiteral(declaration.initializer)) return declaration.initializer.text;
    }
  }
  throw new Error(`${fileName} declares no string const ${name}`);
}
/** The members the Statement names between "as pinned" and "adding only versioned members", in order, and the required ones. */
function statementMembers(): { readonly all: string[]; readonly required: string[] } {
  const span = STATEMENT.slice(STATEMENT.indexOf("as pinned"), STATEMENT.indexOf("adding only versioned members"));
  const names = (text: string): string[] => [...text.matchAll(/`([A-Za-z]+)/g)].map(match => match[1] ?? "");
  return { all: names(span), required: names(span.slice(0, span.indexOf("and the optional members"))) };
}
const read = (path: string): string => readFileSync(join(ROOT, path), "utf8");

interface ToolResult {
  readonly content: ReadonlyArray<{ readonly type: string; readonly text?: string }>;
}
interface RegisteredTool {
  execute(toolCallId: string, params: Json, signal: undefined, onUpdate: undefined, context: ExtensionContext): Promise<ToolResult>;
}
interface Booted {
  readonly sandbox: Hermetic;
  readonly tool: RegisteredTool;
  readonly context: ExtensionContext;
}
const settingsFor = (grants: unknown) => ({ workbench: { workflowAgentBackend: "claude", capabilityGrants: grants } });
/** Boots the real extension under the claude workbench backend and takes workflow_execute from its registration. */
async function bootRegistered(): Promise<Booted> {
  const sandbox = hermeticDir({ settings: settingsFor([]) });
  try {
    const booted = makePi();
    subagentsExtension(booted.pi);
    const context: ExtensionContext = ctx({ cwd: sandbox.dir });
    await booted.lifecycle.get("session_start")?.({}, context);
    const tool: RegisteredTool | undefined = booted.tools.get("workflow_execute");
    if (tool === undefined) throw new Error("workflow_execute is not registered under the claude workbench backend");
    return { sandbox, tool, context };
  } catch (error) {
    sandbox.restore();
    throw error;
  }
}
/** One registered-tool call under `grants`: the reply's text parts and its text. */
async function call(booted: Booted, id: string, grants: unknown, params: Json): Promise<{ readonly parts: string[]; readonly text: string }> {
  writeFileSync(join(booted.sandbox.dir, ".pi", "subagents.json"), JSON.stringify(settingsFor(grants)));
  const result = await booted.tool.execute(`wb-ig6n-${id}`, params, undefined, undefined, booted.context);
  return { parts: result.content.map(part => part.type), text: result.content[0]?.text ?? "" };
}
function recordOf(value: unknown, what: string): Record<string, unknown> {
  if (!plainRecord(value)) throw new Error(`${what} is not a JSON object: ${JSON.stringify(value)}`);
  return { ...value };
}
const sorted = (values: readonly string[]): string[] => [...values].sort();

const rowTitle = (row: EnvelopeRow): string =>
  `C1 ${row.id}: the registered workflow_execute answers ${row.label} with one text part that parses as the pinned envelope (contract workbench.tool-reply/v1, tool workflow_execute, no next, no bare tool-reply/v1), ${row.members.length} members, error ${row.code}`;
const builderTitle = (row: BuilderRow): string => `C2 ${row.id}: buildWorkflowExecuteReply over ${row.label} returns contractVersion workbench.execute/v1, truncated ${row.truncated} (boolean), status ${row.status}`;
const JUDGED_TITLE = "C9 J1: ROWS, BUILDER_ROWS, CLAIMS and NOT_REACHED equal their frozen shapes, each claim's pins name its own cases, the census text equals this receipt entry's lines, and every collected test is ROSTER's in run mode, not inverted";
const PARSER_TITLE = "C7 K1: envelopeFindings reports each PARSER_CONTROLS finding for a fresh E1 reply edited by that control alone, and nothing for the unedited reply";
const SETTINGS_TITLE = "C5 N1: under each UNREADABLE_GRANTS list the registered workflow_execute rejects with the settings loader's error instead of replying";
const BARE_TITLE = "C8 K2: bareContractTokens reports tool-reply/v1 outside workbench.tool-reply/v1 and nothing inside it";
const MEMBERS_TITLE = "C3 A1: PINNED_MEMBERS and REQUIRED_MEMBERS equal WorkflowExecuteEnvelope's members in src/workbench/execute-tool.ts and the Statement's, with no next member";
const BUILDER_ANCHOR_TITLE = "C4 A2: WorkflowExecuteReply in src/workbench/execute.ts declares a required boolean truncated and contractVersion typed by EXECUTE_CONTRACT_VERSION = workbench.execute/v1";
const CODES_TITLE = "C5 A3: the ROWS codes and NOT_REACHED equal ExecuteErrorCode's members without overlap, and the kind-refusal rows carry each EXECUTE_HOST_MODES mode once";
const STATUSES_TITLE = "C6 A4: the untruncated admitted BUILDER_ROWS outcomes carry each LaunchStatus member once, with one refused decision and both truncated values";
const RECORDS_TITLE = "C9 R1: every test of this file is ROSTER's, registered once in order, in run mode, not inverted, every case before this one reached its end with its pinned count, and each row case left its row's MEASURED witness";

/** Every test of this file, in registration order. */
const ROSTER = [
  "C9 J1: ROWS, BUILDER_ROWS, CLAIMS and NOT_REACHED equal their frozen shapes, each claim's pins name its own cases, the census text equals this receipt entry's lines, and every collected test is ROSTER's in run mode, not inverted",
  "C1 E1: the registered workflow_execute answers the reviewed function mechanical.development.develop.v1 (hostMode embedded, JSON policy {note}) under [workbench:execute] with one text part that parses as the pinned envelope (contract workbench.tool-reply/v1, tool workflow_execute, no next, no bare tool-reply/v1), 12 members, error unsupported-definition-kind",
  "C1 E2: the registered workflow_execute answers the reviewed function (hostMode detached) under [workbench:execute, workbench:detach] with one text part that parses as the pinned envelope (contract workbench.tool-reply/v1, tool workflow_execute, no next, no bare tool-reply/v1), 11 members, error unsupported-definition-kind",
  "C1 E3: the registered workflow_execute answers the reviewed function (hostMode detached) under [workbench:execute] with one text part that parses as the pinned envelope (contract workbench.tool-reply/v1, tool workflow_execute, no next, no bare tool-reply/v1), 11 members, error missing-detach-grant",
  "C1 E4: the registered workflow_execute answers the reviewed function (hostMode embedded) under no grant with one text part that parses as the pinned envelope (contract workbench.tool-reply/v1, tool workflow_execute, no next, no bare tool-reply/v1), 8 members, error missing-execute-grant",
  "C1 E5: the registered workflow_execute answers the reviewed function with artifactDigest main under [workbench:execute] with one text part that parses as the pinned envelope (contract workbench.tool-reply/v1, tool workflow_execute, no next, no bare tool-reply/v1), 8 members, error non-digest-definition",
  "C1 E6: the registered workflow_execute answers the reviewed function with hostMode remote under [workbench:execute] with one text part that parses as the pinned envelope (contract workbench.tool-reply/v1, tool workflow_execute, no next, no bare tool-reply/v1), 8 members, error unknown-host-mode",
  "C1 E7: the registered workflow_execute answers the reviewed function with the JSON policy allow (a string) under [workbench:execute] with one text part that parses as the pinned envelope (contract workbench.tool-reply/v1, tool workflow_execute, no next, no bare tool-reply/v1), 8 members, error malformed-policy",
  "C1 E8: the registered workflow_execute answers the reviewed function with an extra definitionRef member entry under [workbench:execute] with one text part that parses as the pinned envelope (contract workbench.tool-reply/v1, tool workflow_execute, no next, no bare tool-reply/v1), 8 members, error malformed-request",
  "C7 K1: envelopeFindings reports each PARSER_CONTROLS finding for a fresh E1 reply edited by that control alone, and nothing for the unedited reply",
  "C5 N1: under each UNREADABLE_GRANTS list the registered workflow_execute rejects with the settings loader's error instead of replying",
  "C2 B1: buildWorkflowExecuteReply over the reviewed function admitted under [workbench:execute] and the outcome accepted returns contractVersion workbench.execute/v1, truncated false (boolean), status accepted",
  "C2 B2: buildWorkflowExecuteReply over the reviewed function admitted under [workbench:execute] and the outcome launched with one native reference returns contractVersion workbench.execute/v1, truncated false (boolean), status launched",
  "C2 B3: buildWorkflowExecuteReply over the reviewed function admitted under [workbench:execute] and the outcome refused with a reason returns contractVersion workbench.execute/v1, truncated false (boolean), status refused",
  "C2 B4: buildWorkflowExecuteReply over the reviewed function refused under no grant, with no outcome returns contractVersion workbench.execute/v1, truncated false (boolean), status refused",
  "C2 B5: buildWorkflowExecuteReply over the reviewed function with a 256-character id and schemaVersion admitted under [workbench:execute], the outcome launched with two 256-character native references, at maxBytes 2048 returns contractVersion workbench.execute/v1, truncated true (boolean), status launched",
  "C8 K2: bareContractTokens reports tool-reply/v1 outside workbench.tool-reply/v1 and nothing inside it",
  "C3 A1: PINNED_MEMBERS and REQUIRED_MEMBERS equal WorkflowExecuteEnvelope's members in src/workbench/execute-tool.ts and the Statement's, with no next member",
  "C4 A2: WorkflowExecuteReply in src/workbench/execute.ts declares a required boolean truncated and contractVersion typed by EXECUTE_CONTRACT_VERSION = workbench.execute/v1",
  "C5 A3: the ROWS codes and NOT_REACHED equal ExecuteErrorCode's members without overlap, and the kind-refusal rows carry each EXECUTE_HOST_MODES mode once",
  "C6 A4: the untruncated admitted BUILDER_ROWS outcomes carry each LaunchStatus member once, with one refused decision and both truncated values",
  "C9 R1: every test of this file is ROSTER's, registered once in order, in run mode, not inverted, every case before this one reached its end with its pinned count, and each row case left its row's MEASURED witness",
] as const;
/** THE RECORD each case before the records case leaves, as `${id}:${assertions}` (vitest's tally of the case's assertions), in run order. */
const REACHED_SHAPE = [
  "J1:41",
  "E1:8",
  "E2:8",
  "E3:8",
  "E4:8",
  "E5:8",
  "E6:8",
  "E7:8",
  "E8:8",
  "K1:27",
  "N1:3",
  "B1:5",
  "B2:5",
  "B3:5",
  "B4:5",
  "B5:5",
  "K2:4",
  "A1:6",
  "A2:6",
  "A3:5",
  "A4:3",
] as const;
const RECORDS_END = "R1:6";

const REACHED: string[] = [];
/** Each row's witness as its case measured it; the records case compares it against the rows a second time. */
const MEASURED: Record<string, Json> = {};
const SELECTED: string[] = [];
/** A case's end as the record holds it: pushed only after the case's last assertion. */
const endOf = (id: string): string => `${id}:${expect.getState().assertionCalls}`;
interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every test a collected task tree holds, in registration order; self marks the case doing the reading. */
function registeredTests(tasks: readonly RunnerTask[], self?: RunnerTask): Registered[] {
  const walked: Registered[] = [];
  for (const child of tasks) {
    if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === self });
    else if (child.type === "suite") walked.push(...registeredTests(child.tasks, self));
  }
  return walked;
}
/** A registered test's title with its collected mode, "+fails" marking an inverted one. */
const modeLine = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""}`;
/** The witness each row's case must measure, written from the rows a second time. */
function expectedWitnesses(): Record<string, Json> {
  return Object.fromEntries([
    ...ROWS.map(row => [row.id, { findings: [], contract: "workbench.tool-reply/v1", tool: "workflow_execute", next: false, bare: [], members: sorted(row.members), code: row.code }] as const),
    ...BUILDER_ROWS.map(row => [row.id, { contractVersion: "workbench.execute/v1", truncatedType: "boolean", truncated: row.truncated, status: row.status }] as const),
  ]);
}

// The selection, read once from the collected tree before the first case runs (a test-name filter deselects the rest).
beforeEach(({ task }) => {
  if (SELECTED.length === 0) SELECTED.push(...registeredTests(task.file.tasks).filter(entry => entry.mode === "run").map(entry => entry.name));
});
// The file-end judge: a records case selected to run reached its own end, after every other case's, with its pinned count.
afterAll(() => {
  if (!SELECTED.includes(RECORDS_TITLE)) return;
  expect(REACHED, "every case of this file reached its end, the records case last").toEqual([...REACHED_SHAPE, RECORDS_END]);
});

describe("wb-ig6n EAT-R441 criterion 1: the envelope of the registered workflow_execute's function-route replies and the pure builder's contractVersion and truncated", () => {
  it(JUDGED_TITLE, { timeout: 60_000 }, ({ task }) => {
    // The collected cases, read before any other case runs: a records case deleted, renamed, skipped or inverted reds here.
    const collected = registeredTests(task.file.tasks, task);
    expect(collected.map(entry => entry.name), "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER]);
    expect(collected.findIndex(entry => entry.self), "this case finds itself by task identity, registered first").toBe(0);
    expect(collected.filter(entry => entry.mode !== "run" || entry.fails).map(modeLine), "every test is set to run and none is inverted").toEqual([]);
    expect(ROWS.map(row => `${row.id}:${row.code}:${row.members.length}`), "ROWS against its frozen shape").toEqual([...ROWS_SHAPE]);
    expect(BUILDER_ROWS.map(row => `${row.id}:${row.status}:${row.truncated}`), "BUILDER_ROWS against its frozen shape").toEqual([...BUILDER_SHAPE]);
    expect(CLAIMS.map(claim => `${claim.id}:${claim.pins.length}`), "CLAIMS against its frozen shape").toEqual([...CLAIMS_SHAPE]);
    expect(Object.entries(NOT_REACHED).map(([code, reason]) => `${code}:${reason.split(/[:,]/)[0]}`), "NOT_REACHED against its frozen shape").toEqual([...NOT_REACHED_SHAPE]);
    // Each claim's pins name cases of that claim: a pinned case's title opens with the claim id and the pin.
    for (const claim of CLAIMS) {
      for (const pin of claim.pins) expect(ROSTER.filter(title => title.startsWith(`${claim.id} ${pin}: `)), `${claim.id} pins ${pin}`).toHaveLength(1);
    }
    expect(sorted(CLAIMS.flatMap(claim => claim.pins)), "every case of the roster is pinned by exactly one claim").toEqual(sorted(ROSTER.map(title => title.split(" ")[1]?.replace(":", "") ?? "")));
    const all = read(RECEIPT).split("\n");
    expect(all.filter(line => line.startsWith(ENTRY_HEADING)), "the receipt holds this cut's entry heading once").toHaveLength(1);
    // This cut's entry only: from its heading to the next entry heading, so a later appended entry never joins the comparison.
    const start = all.findIndex(line => line.startsWith(ENTRY_HEADING));
    const next = all.findIndex((line, index) => index > start && line.startsWith("## "));
    const lines = all.slice(start, next < 0 ? undefined : next);
    const held = (prefix: string): string[] => lines.filter(line => line.startsWith(prefix)).map(line => line.slice(prefix.length));
    expect(held("- ROW "), "ROWS against the receipt, row by row").toEqual(ROWS.map(rowText));
    expect(held("- BUILDER_ROW "), "BUILDER_ROWS against the receipt, row by row").toEqual(BUILDER_ROWS.map(builderRowText));
    expect(held("- NOT_REACHED "), "NOT_REACHED against the receipt").toEqual(Object.entries(NOT_REACHED).map(([code, reason]) => `${code}: ${reason}`));
    expect(held("- PINNED_MEMBERS "), "PINNED_MEMBERS against the receipt").toEqual([PINNED_MEMBERS.join(", ")]);
    expect(held("- REQUIRED_MEMBERS "), "REQUIRED_MEMBERS against the receipt").toEqual([REQUIRED_MEMBERS.join(", ")]);
    expect(held("- CLAIM "), "CLAIMS against the receipt, sentence by sentence").toEqual(CLAIMS.map(claim => `${claim.id} ${claim.sentence}`));
    expect(held("- PINS "), "each claim's pins against the receipt").toEqual(CLAIMS.map(claim => `${claim.id}: ${claim.pins.join(", ")}`));
    expect(held("- NOT CLAIMED "), "NOT_CLAIMED against the receipt").toEqual([...NOT_CLAIMED]);
    expect(held("- CRITERION 1 "), "CRITERION_1 against the receipt").toEqual([CRITERION_1]);
    expect(held("- STATEMENT "), "STATEMENT against the receipt").toEqual([STATEMENT]);
    REACHED.push(endOf("J1"));
  });

  describe("C1 the function-definition rows through workflow_execute as src/index.ts registers it (ORACLE-REG)", () => {
    let booted: Booted | undefined;
    beforeAll(async () => {
      booted = await bootRegistered();
    }, 180_000);
    afterAll(() => {
      booted?.sandbox.restore();
      booted = undefined;
    });
    const registered = (): Booted => {
      if (booted === undefined) throw new Error("the registered workflow_execute was not booted");
      return booted;
    };
    for (const row of ROWS) {
      it(rowTitle(row), { timeout: 60_000 }, async () => {
        const { parts, text } = await call(registered(), row.id, row.grants, row.params);
        expect(parts, "the reply is one text part").toEqual(["text"]);
        const reply = recordOf(JSON.parse(text), "the reply text");
        expect(envelopeFindings(reply), "the reply parses as the pinned envelope").toEqual([]);
        expect(reply.contract, "contract").toBe("workbench.tool-reply/v1");
        expect(reply.tool, "tool").toBe("workflow_execute");
        expect(Object.hasOwn(reply, "next"), "no next member").toBe(false);
        expect(bareContractTokens(text), "no bare tool-reply/v1 in the reply text").toEqual([]);
        expect(sorted(Object.keys(reply)), "the reply's members").toEqual(sorted(row.members));
        expect(recordOf(reply.error, "the reply error").code, "error.code").toBe(row.code);
        MEASURED[row.id] = {
          findings: envelopeFindings(reply),
          contract: reply.contract,
          tool: reply.tool,
          next: Object.hasOwn(reply, "next"),
          bare: bareContractTokens(text),
          members: sorted(Object.keys(reply)),
          code: recordOf(reply.error, "the reply error").code,
        };
        REACHED.push(endOf(row.id));
      });
    }

    it(PARSER_TITLE, { timeout: 60_000 }, async () => {
      const first = ROWS[0];
      if (first === undefined) throw new Error("ROWS is empty");
      const { text } = await call(registered(), "K1", first.grants, first.params);
      const base = recordOf(JSON.parse(text), "the first row's reply");
      expect(envelopeFindings(base), "the unedited first-row reply").toEqual([]);
      for (const control of PARSER_CONTROLS) {
        const edited = recordOf(JSON.parse(text), "the first row's reply");
        control.edit(edited);
        expect(envelopeFindings(edited), control.id).toEqual([control.finding]);
      }
      const ids = PARSER_CONTROLS.map(control => control.id);
      expect(REQUIRED_MEMBERS.filter(member => !ids.includes(`P-missing-${member}`)), "a removal control for each required member").toEqual([]);
      expect(PINNED_MEMBERS.filter(member => member !== "policy" && !ids.includes(`P-type-${member}`)), "a type control for each pinned member but policy").toEqual([]);
      REACHED.push(endOf("K1"));
    });

    it(SETTINGS_TITLE, { timeout: 60_000 }, async () => {
      const first = ROWS[0];
      if (first === undefined) throw new Error("ROWS is empty");
      for (const [label, grants] of UNREADABLE_GRANTS) {
        await expect(call(registered(), "N1", grants, first.params), label).rejects.toThrow(SETTINGS_ERROR);
      }
      REACHED.push(endOf("N1"));
    });
  });

  describe("C2 the pure reply builder over the reviewed function's decision and each launch outcome (V1)", () => {
    for (const row of BUILDER_ROWS) {
      it(builderTitle(row), { timeout: 60_000 }, () => {
        const definitionRef: DefinitionRef = { ...REVIEWED, ...row.definition };
        const decision = decideExecute({ definitionRef, input: { task: "t" }, hostMode: "embedded" }, { grants: row.grants, invocationId: "wf_ig6nbuilder" });
        expect(decision.decision, "decideExecute's decision").toBe(row.outcome === undefined ? "refused" : "admitted");
        const reply = buildWorkflowExecuteReply(decision, row.outcome, row.maxBytes);
        expect(reply.contractVersion, "contractVersion").toBe("workbench.execute/v1");
        expect(typeof reply.truncated, "truncated is a boolean").toBe("boolean");
        expect(reply.truncated, "truncated").toBe(row.truncated);
        expect(reply.status, "status").toBe(row.status);
        MEASURED[row.id] = { contractVersion: reply.contractVersion, truncatedType: typeof reply.truncated, truncated: reply.truncated, status: reply.status };
        REACHED.push(endOf(row.id));
      });
    }
  });

  it(BARE_TITLE, { timeout: 60_000 }, () => {
    for (const [text, tokens] of BARE_CONTROLS) expect(bareContractTokens(text), text).toEqual([...tokens]);
    REACHED.push(endOf("K2"));
  });

  it(MEMBERS_TITLE, { timeout: 60_000 }, () => {
    const declared = interfaceMembers(read(ENVELOPE_MODULE), ENVELOPE_MODULE, "WorkflowExecuteEnvelope");
    expect(sorted(declared.map(member => member.name)), "WorkflowExecuteEnvelope's members").toEqual(sorted(PINNED_MEMBERS));
    expect(sorted(declared.filter(member => !member.optional).map(member => member.name)), "WorkflowExecuteEnvelope's non-optional members").toEqual(sorted(REQUIRED_MEMBERS));
    const named = statementMembers();
    expect(named.all, "the members the Statement names, in its order").toEqual([...PINNED_MEMBERS]);
    expect(named.required, "the Statement's members before its optional ones").toEqual([...REQUIRED_MEMBERS]);
    expect(declared.map(member => member.name), "WorkflowExecuteEnvelope declares no next member").not.toContain("next");
    expect(PINNED_MEMBERS, "PINNED_MEMBERS holds no next member").not.toContain("next");
    REACHED.push(endOf("A1"));
  });

  it(BUILDER_ANCHOR_TITLE, { timeout: 60_000 }, () => {
    const declared = interfaceMembers(read(BUILDER_MODULE), BUILDER_MODULE, "WorkflowExecuteReply");
    const truncated = declared.find(member => member.name === "truncated");
    expect(truncated?.optional, "truncated is required").toBe(false);
    expect(truncated?.typeKind, "truncated's type is the boolean keyword").toBe(ts.SyntaxKind.BooleanKeyword);
    const version = declared.find(member => member.name === "contractVersion");
    expect(version?.optional, "contractVersion is required").toBe(false);
    expect(version?.type, "contractVersion's type").toBe("typeof EXECUTE_CONTRACT_VERSION");
    expect(constString(read(BUILDER_MODULE), BUILDER_MODULE, "EXECUTE_CONTRACT_VERSION"), "EXECUTE_CONTRACT_VERSION as declared").toBe("workbench.execute/v1");
    expect(EXECUTE_CONTRACT_VERSION, "EXECUTE_CONTRACT_VERSION at run time").toBe("workbench.execute/v1");
    REACHED.push(endOf("A2"));
  });

  it(CODES_TITLE, { timeout: 60_000 }, () => {
    expect(unionReferences(read(ENVELOPE_MODULE), ENVELOPE_MODULE, "ExecuteErrorCode"), "ExecuteErrorCode's members").toEqual(["ExecuteRefusalPolicy", "ExecuteLaunchRefusal"]);
    const codes = [...unionLiterals(read(BUILDER_MODULE), BUILDER_MODULE, "ExecuteRefusalPolicy"), ...unionLiterals(read(ENVELOPE_MODULE), ENVELOPE_MODULE, "ExecuteLaunchRefusal")];
    const reached = [...new Set(ROWS.map(row => row.code))];
    const unreached = Object.keys(NOT_REACHED);
    expect(reached.filter(code => unreached.includes(code)), "no code is both reached and not reached").toEqual([]);
    expect(sorted([...reached, ...unreached]), "ROWS and NOT_REACHED cover ExecuteErrorCode exactly").toEqual(sorted(codes));
    const kindModes = ROWS.filter(row => row.code === "unsupported-definition-kind").map(row => String(row.params.hostMode));
    expect(sorted(kindModes), "the kind-refusal rows carry every EXECUTE_HOST_MODES mode once").toEqual(sorted(EXECUTE_HOST_MODES));
    expect(EXECUTE_HOST_MODES, "the unknown-host-mode row's mode is outside EXECUTE_HOST_MODES").not.toContain("remote");
    REACHED.push(endOf("A3"));
  });

  it(STATUSES_TITLE, { timeout: 60_000 }, () => {
    const statuses = unionLiterals(read(BUILDER_MODULE), BUILDER_MODULE, "LaunchStatus");
    const admitted = BUILDER_ROWS.filter(row => row.outcome !== undefined && !row.truncated).map(row => row.outcome?.status ?? "");
    expect(sorted(admitted), "the untruncated admitted rows carry each LaunchStatus member once").toEqual(sorted(statuses));
    expect(BUILDER_ROWS.filter(row => row.outcome === undefined).map(row => row.id), "a refused decision row").toHaveLength(1);
    expect(sorted(BUILDER_ROWS.map(row => String(row.truncated))).filter((value, index, all) => all.indexOf(value) === index), "both truncated values").toEqual(["false", "true"]);
    REACHED.push(endOf("A4"));
  });

  it(RECORDS_TITLE, { timeout: 60_000 }, ({ task }) => {
    const walked = registeredTests(task.file.tasks, task);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => `${modeLine(entry)} | ${entry.state ?? "no result"}`),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every case before this one reached its end, in run order, with its pinned assertion count").toEqual([...REACHED_SHAPE]);
    expect(MEASURED, "every row's measured witness, compared against the rows a second time").toStrictEqual(expectedWitnesses());
    REACHED.push(endOf("R1"));
  });
});
