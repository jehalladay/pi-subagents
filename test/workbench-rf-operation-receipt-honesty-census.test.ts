/**
 * wb-jwc.9 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R6): the rf operation-receipt reconcile honesty core's FULL-SURFACE READERS, the
 * rule-19 structural-exit child of wb-jwc.6 (orchestrator rulings R-B88 and R-B109: the dependency inversion, so wb-jwc.6's final
 * core re-cut is a mechanical restatement over this bead's landed readers). The readers and the probe vocabulary live in
 * test/helpers/rf-operation-receipt-honesty.ts; every claim below is restated, byte for byte, in the falsifier roster
 * test/fixtures/rf-operation-receipt-honesty-roster.json, which also names each falsifier (a src plant) and the pins it falsifies.
 *
 * OWNER FILING (the outside anchor): the tracked bead export .beads/issues.jsonl. Row wb-jwc.9's description gives its two items
 * (U2 the G registrars across run forms, U1 the failed read per category) and the R-B109 block of its notes the two folded members
 * (U1 the fresh-read shape, U2 the unprojected read); row wb-jwc.6's description gives the N and H words the honesty rows hold every
 * fed read to (statement.3 "the preview read shall never serve as commit evidence"; acceptance.3's first claim "a reconcile fed only
 * a preview envelope for a committed-effect journal row is asserted NOT producer-confirmed"). Rows, each pin generated from an
 * anchor outside this file:
 *   G (wb-jwc.9 U2), the registrations, read across run forms. G:literal - one pin per JUDGED src register call whose id is an rf
 *     capability id (every file under src/ is read, each module with its own script kind): its descriptor literal must spell
 *     effectClass as the whole token read and permissions as an array literal of the one whole token reactivefiber:render, so in
 *     every run that reaches it the call hands the registry that id read under reactivefiber:render, whatever the registrar's
 *     arguments, workspace root or environment; any other syntax there (a conditional such as plant R1's
 *     workspaceRoot===process.cwd() or plant R2's process.env test, a reference, a call, a spread or a computed key) is written into
 *     the witness instead of a word, so it fails closed. G:unjudged - every other src spelling of a member named register is listed
 *     by file, owner and syntax, so a registration through any other spelling moves the witness. G:runs - each src rf registrar
 *     is also RUN in each stated run form (the census workspace root; process.cwd() as the workspace root; the census root with
 *     every environment name src reads set to each effect class word src's CapabilityDescriptor declares but read) and what a fresh
 *     registry holds for rf ids when it returns is listed per form.
 *   F (R-B109 U1), the fresh reads, C (wb-jwc.9 U1), the failed reads, U (R-B109 U2), the unprojected reads: one pin per read of
 *     the helper's vocabulary, each run through src's own registration, the reconcile core's evidence action and mintEvidenceReceipt
 *     against the journaled {reactivefiber, operation, rfo_journaledcommit000000000}, then cited in one acknowledgement per member of
 *     src's EffectDetermination union and, after the effect-absent one, in an override with and without the risk accepted. Each pin
 *     claims, for exactly that read: no acknowledgement citing its receipt is producer-confirmed, and no override after its
 *     effect-absent acknowledgement carries duplicate risk none. The FED SET is exactly: five fresh reads, each carrying the fresh
 *     rfo_ (the bare output-text result, the smallest result the native preview admits and the full rf 0.1.845 result through the
 *     injectable registration; the latter two through the native registration from a stand-in rf too); one failed read per member
 *     of src's CapabilityErrorCategory (the injectable seam throws that category) plus the two failures the native registration
 *     mints from a stand-in's output (a line that is not JSON: transport; an rf refusal: unavailable); and six unprojected reads (a
 *     context.show envelope and a reactive-fiber.cli/v2 context.render envelope, each around the bare and the full result; no
 *     envelope at all; a v1 context.render envelope with no operation_id). A read pins only while it measures as its kind: fresh
 *     returns with the fresh rfo_, failed returns no result, unprojected returns with no native reference.
 *   R the NAMED RESIDUALS, NOT CLAIMED, each a pinned quiet row that exists while an outside anchor calls for it:
 *     R-FRESH-SHAPE (while F feeds a read): a fresh read in any other shape - another subset of the optional keys the native
 *       preview admits, observation rows, another release, digest, workspace or id value - is not probed; the fed reads' result
 *       keys and projections are listed.
 *     R-UNPROJECTED-FORM (while U feeds a read): a returned read projecting no native reference in any other form (another schema
 *       id or command, another malformed identity, another result, another workspace root) is not probed; the fed forms and their
 *       projections are listed.
 *     R-ECHO (while the preview's projection takes the envelope's own operation_id): an envelope echoing the journaled rfo_ binds
 *       journal-recorded and confirms, because Pi takes the envelope's operation_id as given; today's behaviour is pinned.
 *     R-RUN-FORM (while src holds an rf registrar): a registration is read through its descriptor literal (G:literal) and measured
 *       in the stated run forms (G:runs) only, so a rewrite of what the registry holds after a judged call (CapabilityRegistry.register's
 *       own body, or code reaching the descriptors the registry holds), a register member reached through a name src never spells,
 *       or an environment read src makes by a computed name or through a whole use of process.env, conditioned on another workspace
 *       root, environment value or argument, is not read; src's environment reads are listed by name, computed access and whole
 *       use, with the run forms.
 *     R-PROBE-CONTEXT (while the vocabulary feeds a read): every read of rows F, C and U is fed in one request context (one task,
 *       position, principal, session, workspace, grant set and clock) against one journaled row, so a binding conditioned on any
 *       other is not probed; the context and the row are listed.
 * FROZEN SHAPE (standing rule 16): the row shape `${row}:${clause}:${pins}` (SHAPE) and every pin's line
 *   `${id} | ${requirement} | ${witness}` (PIN_LINES, the witness measured from the subject) are literals, and the roster restates
 *   every row, clause and requirement; one case per pin runs against its line. EACH-LIVENESS: every row case and every pin case
 *   records its id as its last statement, and the case declared last walks the collected tasks, so an it.each argument emptied,
 *   filtered or sliced at its call site reds.
 * Not claimed: wb-jwc.6's other rows (its G:id/G:bin tripwire, S, H acceptance.3.2) and its PARKED duty; any read outside the fed
 *   set; a fresh read carrying any id but the fresh rfo_ (R-ECHO is the journaled one); how rf itself mints ids; the named residuals.
 *
 * Display paths added: none. Test-only: writes nothing but one tracked scratch directory per native read (test/helpers/scratch.ts,
 * removed after the read) holding the stand-in rf and its one output line, and starts no process but that stand-in, the only PATH
 * entry while the read runs (a POSIX shell script of shell builtins only); the workspace root is a string, never created. Reads the
 * bead export, the src tree and the two fixtures.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import type { CapabilityErrorCategory, CapabilityRegistry, JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import {
  COMMIT_ROW, ECHO_READ, FRESH, fullResult, HONESTY_WS, type HonestyRead, honestyOf, honestyReads, PREVIEW_ID, PREVIEW_PERMISSION, PROBE_CONTEXT, previewReceipt,
  registeredUnder, rfRegistrationLiterals, runForms, srcEnvironmentReads, srcTree, srcUnion,
} from "./helpers/rf-operation-receipt-honesty.js";
import { diffAgainstRoster, readRfResultRoster } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard } from "./helpers/scratch.js";

installScratchLeakGuard();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-jwc.9";
const PARENT = "wb-jwc.6";
const ROSTER = "test/fixtures/rf-operation-receipt-honesty-roster.json";
const CAPABILITY_REGISTRY_TS = "src/workbench/capability-registry.ts";
const RECONCILE_TS = "src/workflow/reconcile.ts";
/** The label of the parent's acceptance item that holds before the gate (the honesty core). */
const HONESTY_LABEL = "Negative guard (honesty core): ";
const EM_DASH = String.fromCodePoint(0x2014);
/** The R-B109 block of this bead's notes: from its ruling line to its acceptance line. */
const RULING = "ORCHESTRATOR RULING R-B109";

type RowId = "G" | "F" | "C" | "U" | "R";
interface PinBody {
  readonly requirement: string;
  readonly witness: () => Promise<string>;
}
interface Pin extends PinBody {
  readonly id: string;
}
interface Row {
  readonly id: RowId;
  readonly clause: string;
  readonly pins: readonly Pin[];
}
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

/** A bead's row in the tracker export. */
function exportRow(bead: string): Record<string, unknown> {
  for (const line of readFileSync(join(ROOT, ".beads/issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(`"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isRecord(row) && row.id === bead) return row;
  }
  throw new Error(`${bead} is not in the tracker export`);
}
const textOf = (row: Record<string, unknown>, field: string): string => (typeof row[field] === "string" ? row[field] : "");
/** The items a text lists as `- <key> <title>: ...` lines (description) or `- <key> (<title>): ...` lines (the R-B109 block), by key. */
function items(text: string, pattern: RegExp): Map<string, string> {
  return new Map([...text.matchAll(pattern)].map(match => [match[1] ?? "", match[2] ?? ""]));
}
const OWN = exportRow(BEAD);
const OWN_ITEMS = items(textOf(OWN, "description"), /^- (U\d) ([^:\n]+): /gm);
const RULING_BLOCK = ((): string => {
  const notes = textOf(OWN, "notes");
  const start = notes.indexOf(RULING);
  const end = start < 0 ? -1 : notes.indexOf("\nAcceptance:", start);
  return start < 0 || end < 0 ? "" : notes.slice(start, end);
})();
const FOLDED_ITEMS = items(RULING_BLOCK, /^- (U\d) \(([^)\n]+)\): /gm);
/** The parent's N and H words: its statement's never clause and its honesty-core acceptance item's first claim. */
const PARENT_WORDS = ((): { readonly n: string; readonly h: string } => {
  const description = textOf(exportRow(PARENT), "description");
  const never = /^STATEMENT: When .+?\), Pi shall .+?; (.+?)\.$/m.exec(description)?.[1] ?? "<statement.3 missing>";
  const accepted = [...(/^ACCEPTANCE: \[(.+)\]$/m.exec(description)?.[1] ?? "").matchAll(/(["'])(.*?)\1(?=, ["']|$)/g)].map(match => match[2] ?? "");
  const honesty = accepted.find(item => item.startsWith(HONESTY_LABEL)) ?? "";
  return { n: never, h: honesty.slice(HONESTY_LABEL.length).split(` ${EM_DASH} `)[0] ?? "<acceptance.3 claim 1 missing>" };
})();

const CATEGORIES = srcUnion(ROOT, CAPABILITY_REGISTRY_TS, "CapabilityErrorCategory") as CapabilityErrorCategory[];
const DETERMINATIONS = srcUnion(ROOT, RECONCILE_TS, "EffectDetermination");
const EFFECT_CLASSES = srcUnion(ROOT, CAPABILITY_REGISTRY_TS, "CapabilityDescriptor", "effectClass");
const READS = honestyReads(CATEGORIES);
const REGISTRATIONS = rfRegistrationLiterals(ROOT);
const ENVIRONMENT = srcEnvironmentReads(ROOT);
const RUN_FORMS = runForms(ENVIRONMENT.names, EFFECT_CLASSES);
const UNPARSED = srcTree(ROOT).unparsed;
const PREVIEW_WORDS = { effectClass: "read", permissions: `[${PREVIEW_PERMISSION}]` };
/** The src rf registrars this census runs, by function name: each registers with a fresh registry and a run form's workspace root. */
const REGISTRARS: Readonly<Record<string, (registry: CapabilityRegistry, workspaceRoot: string) => void>> = {
  registerReactiveFiberRender: (registry, workspaceRoot) => registerReactiveFiberRender(registry, async () => {
    throw new Error("the census registers this registrar only: its seam is never invoked");
  }, workspaceRoot),
  registerNativeReactiveFiberRender: (registry, workspaceRoot) => registerNativeReactiveFiberRender(registry, workspaceRoot),
};

/** What a read measures as: its kind when its receipt is the kind's, else <what it is>. */
async function measuredKind(read: HonestyRead): Promise<string> {
  const receipt = await previewReceipt(read);
  if (receipt.outcome === "returned" && receipt.nativeRef?.id === FRESH) return "fresh";
  if (receipt.outcome !== "returned") return "failed";
  return receipt.nativeRef === undefined ? "unprojected" : `<returned ${receipt.binding} ref=${receipt.nativeRef.id}>`;
}
const measured = new Map<string, string>();
async function kindOf(read: HonestyRead): Promise<string> {
  let kind = measured.get(read.key);
  if (kind === undefined) {
    kind = await measuredKind(read);
    measured.set(read.key, kind);
  }
  return kind;
}
/** The served envelope of a read that answers one (the seam's envelope, or the stand-in's line parsed), else undefined. */
function servedEnvelope(read: HonestyRead): JsonValue | undefined {
  if (read.serve.answer === "envelope") return read.serve.envelope;
  if (read.serve.answer !== "print") return undefined;
  try {
    return JSON.parse(read.serve.stdout) as JsonValue;
  } catch {
    return undefined;
  }
}
/** What nativeEvidence projects of a served envelope, wrapped as the preview registration wraps it. */
function projectionOf(envelope: JsonValue | undefined): string {
  const evidence = nativeEvidence(PREVIEW_ID, { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: HONESTY_WS, source: envelope ?? null });
  return `provider=${evidence.provider ?? "none"} nativeId=${evidence.nativeId ?? "none"} sourceBasis=${evidence.sourceBasis === undefined ? "none" : "set"} producerRelease=${evidence.producerRelease ?? "none"}`;
}
const resultKeys = (envelope: JsonValue | undefined): string[] => (isRecord(envelope) && isRecord(envelope.result) ? Object.keys(envelope.result) : []);

const HONESTY_CLAIM = "no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none";
/** One honesty pin per read of a kind: the requirement names exactly that read; the witness is its measured honesty. */
function honestyPins(kind: HonestyRead["kind"]): Record<string, PinBody> {
  return Object.fromEntries(READS.filter(read => read.kind === kind).map((read): [string, PinBody] => [read.key, {
    requirement: `${read.label}: ${HONESTY_CLAIM}`,
    witness: async () => {
      const text = await honestyOf(read, DETERMINATIONS);
      expect(text, "a preview-only reconcile is never producer-confirmed").not.toContain("producer-confirmed");
      expect(text, "a preview-only effect-absent never overrides at duplicate risk none").not.toContain("override:none");
      return text;
    },
  }]));
}

/** G: one pin per judged src rf register call's descriptor literal, the unjudged spellings, and the run-form measurement. */
const G_PINS: Readonly<Record<string, PinBody>> = {
  ...Object.fromEntries(REGISTRATIONS.rf.map((literal): [string, PinBody] => [`literal:${literal.owner}`, {
    requirement: `the judged register call in ${literal.owner} names an rf capability id, and its descriptor literal spells effectClass as the whole token read and permissions as an array literal of the one whole token reactivefiber:render, so in every run that reaches it the call hands the registry that id read under reactivefiber:render whatever the registrar's arguments, workspace root or environment; any other syntax there is written into the witness instead of a word, so it fails closed`,
    witness: async () => {
      expect({ effectClass: literal.effectClass, permissions: literal.permissions }, `${literal.owner}'s descriptor literal`).toStrictEqual(PREVIEW_WORDS);
      return `${literal.file}#${literal.owner}: id=${literal.id} effectClass=${literal.effectClass} permissions=${literal.permissions}`;
    },
  }])),
  unjudged: {
    requirement: "every other src spelling of a member named register is listed by file, owner and syntax, so a registration made through any other spelling moves the witness",
    witness: async () => `unparsed src files=${UNPARSED.join(",") || "none"}; unjudged register spellings=${REGISTRATIONS.unjudged.join("; ")}`,
  },
  ...(REGISTRATIONS.rf.length > 0 ? {
    runs: {
      requirement: "each src rf registrar, run with a fresh registry in each stated run form (the census workspace root; process.cwd() as the workspace root; the census root with every environment name src reads set to each effect class word src's CapabilityDescriptor declares but read), leaves the registry holding its rf id read under reactivefiber:render: what the registry holds for rf ids when it returns is listed per run form",
      witness: async () => {
        expect(Object.keys(REGISTRARS), "every src rf registrar is run here").toStrictEqual(REGISTRATIONS.rf.map(literal => literal.owner));
        const runs = RUN_FORMS.flatMap(form => Object.entries(REGISTRARS).map(([owner, register]) => `${form.name} ${owner}: ${registeredUnder(form, register)}`));
        for (const run of runs) expect(run, "each run registers the preview read under reactivefiber:render").toMatch(new RegExp(`: ${PREVIEW_ID.replaceAll(".", "\\.")}=read/\\[${PREVIEW_PERMISSION}\\]$`));
        return runs.join("; ");
      },
    },
  } : {}),
};
const FRESH_READS = READS.filter(read => read.kind === "fresh");
const UNPROJECTED_READS = READS.filter(read => read.kind === "unprojected");
/** Whether the preview's projection takes the envelope's own operation_id as nativeId (R-ECHO's row exists while it does). */
const echoBinds = (): boolean => projectionOf(servedEnvelope(ECHO_READ)).includes(`nativeId=${servedEnvelopeId(ECHO_READ)}`);
function servedEnvelopeId(read: HonestyRead): string {
  const envelope = servedEnvelope(read);
  return isRecord(envelope) && typeof envelope.operation_id === "string" ? envelope.operation_id : "<none>";
}
/** A fed envelope's result keys: the roster's full key set named as such, else each key. */
function keysOf(envelope: JsonValue | undefined, rosterKeys: readonly string[]): string {
  const keys = resultKeys(envelope);
  const isRoster = keys.length === rosterKeys.length && rosterKeys.every(key => keys.includes(key));
  return isRoster ? `every roster result key (${keys.length})` : `[${keys.join(",")}]`;
}

/** R: the named residuals, each a pinned quiet row while its anchor calls for it. */
const R_PINS: Readonly<Record<string, PinBody>> = {
  ...(FRESH_READS.length > 0 ? {
    "fresh-shape": {
      requirement: "NAMED RESIDUAL R-FRESH-SHAPE, not claimed: row F probes exactly the fresh reads it lists, each carrying the fresh rfo_, so a fresh read in any other shape (another subset of the optional result keys the native preview admits, observation rows, another release, digest, workspace or id value) is not probed; each fed read's result keys and projection are listed, and the full result is held to the rf result-key roster",
      witness: async () => {
        const roster = readRfResultRoster();
        const full = fullResult();
        const failures = isRecord(full) ? diffAgainstRoster(roster, full).failures : ["<no full result>"];
        const fed = FRESH_READS.map(read => `${read.key} keys=${keysOf(servedEnvelope(read), roster.resultKeys)} ${projectionOf(servedEnvelope(read))}`);
        return `${fed.join("; ")}; full result against rf ${roster.rfVersion} roster: diff failures ${failures.join(",") || "none"}`;
      },
    },
  } : {}),
  ...(UNPROJECTED_READS.length > 0 ? {
    "unprojected-form": {
      requirement: "NAMED RESIDUAL R-UNPROJECTED-FORM, not claimed: row U probes exactly the unprojected reads it lists, so a returned read projecting no native reference in any other form (another schema id or command, another malformed identity, another result, another workspace root) is not probed; each fed form's schema, command, operation_id and projection are listed",
      witness: async () => UNPROJECTED_READS.map(read => {
        const envelope = servedEnvelope(read);
        const field = (key: string): string => (isRecord(envelope) && typeof envelope[key] === "string" ? String(envelope[key]) : "<none>");
        return `${read.key} schema=${field("schema")} command=${field("command")} operation_id=${field("operation_id")} ${projectionOf(envelope)}`;
      }).join("; "),
    },
  } : {}),
  ...(echoBinds() ? {
    echo: {
      requirement: "NAMED RESIDUAL R-ECHO, not claimed: an envelope under the preview contract that echoes the journaled rfo_ binds journal-recorded and confirms, because Pi takes the envelope's operation_id as given and never checks it is fresh; today's behaviour is pinned",
      witness: async () => honestyOf(ECHO_READ, DETERMINATIONS),
    },
  } : {}),
  ...(REGISTRATIONS.rf.length > 0 ? {
    "run-form": {
      requirement: "NAMED RESIDUAL R-RUN-FORM, not claimed: a registration is read through its descriptor literal (G:literal) and measured in the stated run forms (G:runs) only, so a rewrite of what the registry holds after a judged call (CapabilityRegistry.register's own body, or code reaching the descriptors the registry holds), a register member reached through a name src never spells, or an environment read src makes by a computed name or through a whole use of process.env, conditioned on another workspace root, environment value or argument, is not read; src's environment reads are listed by name, computed access and whole use, with the run forms",
      witness: async () => {
        const forms = RUN_FORMS.map(form => `${form.name}(${form.workspaceRoot === HONESTY_WS ? "census root" : "process.cwd()"}, ${Object.keys(form.environment).length} variables${Object.keys(form.environment).length > 0 ? ` = ${[...new Set(Object.values(form.environment))].join(",")}` : ""})`);
        return `run forms=${forms.join(" ")}; environment names src reads=${ENVIRONMENT.names.join(",") || "none"}; computed=${ENVIRONMENT.computed.join(",") || "none"}; whole uses=${ENVIRONMENT.whole.join(",") || "none"}`;
      },
    },
  } : {}),
  ...(READS.length > 0 ? {
    "probe-context": {
      requirement: "NAMED RESIDUAL R-PROBE-CONTEXT, not claimed: every read of rows F, C and U is fed in one request context against one journaled row, so a binding conditioned on any other task, position, principal, session, workspace, grant set, clock or journaled row is not probed; the context and the row are listed",
      witness: async () => {
        const refs = (COMMIT_ROW.nativeRefs ?? []).map(ref => `${ref.provider}/${ref.type}/${ref.id}`).join(",");
        return `task=${PROBE_CONTEXT.taskId} position=${PROBE_CONTEXT.position} principal=${PROBE_CONTEXT.principal} session=${PROBE_CONTEXT.session} workspace=${PROBE_CONTEXT.workspace} observedAt=${PROBE_CONTEXT.observedAt} grants=${PROBE_CONTEXT.grants.join(",")}; journaled row index=${COMMIT_ROW.index} kind=${COMMIT_ROW.kind ?? "agent"} capability=${COMMIT_ROW.capabilityId ?? "none"} effectClass=${COMMIT_ROW.effectClass ?? "none"} nativeRefs=${refs}`;
      },
    },
  } : {}),
};

function row(id: RowId, clause: string, pins: Readonly<Record<string, PinBody>>): Row {
  return { id, clause, pins: Object.entries(pins).map(([key, body]) => ({ id: `${id}:${key}`, ...body })) };
}
const ROWS: readonly Row[] = [
  row("G", `${BEAD} U2`, G_PINS),
  row("F", "R-B109 U1", honestyPins("fresh")),
  row("C", `${BEAD} U1`, honestyPins("failed")),
  row("U", "R-B109 U2", honestyPins("unprojected")),
  row("R", "residual", R_PINS),
];
/** The row each filing item takes: wb-jwc.9's U2 is G and U1 is C; R-B109's folded U1 is F and U2 is U. */
const CLAUSE_ROWS: Readonly<Record<string, RowId>> = {
  [`${BEAD} U2`]: "G",
  [`${BEAD} U1`]: "C",
  "R-B109 U1": "F",
  "R-B109 U2": "U",
};
/** Each row's pin ids as its outside anchor generates them: src for G and C's categories, the measured reads for F, C and U. */
const GENERATED: Readonly<Record<RowId, () => Promise<string[]>>> = {
  G: async () => {
    const rf = rfRegistrationLiterals(ROOT).rf;
    return [...rf.map(literal => `G:literal:${literal.owner}`), "G:unjudged", ...(rf.length > 0 ? ["G:runs"] : [])];
  },
  F: async () => (await measuredReads("fresh")).map(read => `F:${read.key}`),
  C: async () => [
    ...srcUnion(ROOT, CAPABILITY_REGISTRY_TS, "CapabilityErrorCategory").map(category => `C:injectable:${category}`),
    ...(await measuredReads("failed")).filter(read => read.route === "native").map(read => `C:${read.key}`),
  ],
  U: async () => (await measuredReads("unprojected")).map(read => `U:${read.key}`),
  R: async () => [
    ...((await measuredReads("fresh")).length > 0 ? ["R:fresh-shape"] : []),
    ...((await measuredReads("unprojected")).length > 0 ? ["R:unprojected-form"] : []),
    ...(echoBinds() ? ["R:echo"] : []),
    ...(rfRegistrationLiterals(ROOT).rf.length > 0 ? ["R:run-form"] : []),
    ...(honestyReads(srcUnion(ROOT, CAPABILITY_REGISTRY_TS, "CapabilityErrorCategory") as CapabilityErrorCategory[]).length > 0 ? ["R:probe-context"] : []),
  ],
};
/** The vocabulary's reads of a kind that measure as that kind through src. */
async function measuredReads(kind: HonestyRead["kind"]): Promise<HonestyRead[]> {
  const found: HonestyRead[] = [];
  for (const read of READS) if (read.kind === kind && (await kindOf(read)) === kind) found.push(read);
  return found;
}
/** The residual rows the anchors call for: row R while any residual pin is generated. */
const residualRowsCalledFor = async (): Promise<RowId[]> => ((await GENERATED.R()).length > 0 ? ["R"] : []);

interface RosterPin {
  readonly id: string;
  readonly requirement: string;
}
interface RosterRow {
  readonly id: string;
  readonly clause: string;
  readonly pins: readonly RosterPin[];
}
/** One src edit a falsifier makes: the occurrence (1-based, in file order) of `anchor` it replaces with `plant`. */
interface FalsifierEdit {
  readonly anchor: string;
  readonly occurrence: number;
  readonly plant: string;
}
interface Falsifier {
  readonly id: string;
  readonly file: string;
  readonly edits: readonly FalsifierEdit[];
  readonly falsifies: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly rows: readonly RosterRow[];
  readonly falsifiers: readonly Falsifier[];
  readonly residuals: readonly { readonly id: string; readonly quietPin: string }[];
}
const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every(item => typeof item === "string");
/** The falsifier roster, shape-checked: every row, pin, falsifier and residual it holds, else a throw naming what is malformed. */
function readRoster(): Roster {
  const parsed: unknown = JSON.parse(readFileSync(join(ROOT, ROSTER), "utf8"));
  if (!isRecord(parsed) || typeof parsed.bead !== "string" || !Array.isArray(parsed.rows) || !Array.isArray(parsed.falsifiers) || !Array.isArray(parsed.residuals)) throw new Error(`${ROSTER}: malformed roster`);
  const rows = parsed.rows.map((entry: unknown): RosterRow => {
    if (!isRecord(entry) || typeof entry.id !== "string" || typeof entry.clause !== "string" || !Array.isArray(entry.pins)) throw new Error(`${ROSTER}: malformed row`);
    return { id: entry.id, clause: entry.clause, pins: entry.pins.map((pin: unknown): RosterPin => {
      if (!isRecord(pin) || typeof pin.id !== "string" || typeof pin.requirement !== "string") throw new Error(`${ROSTER}: malformed pin in row ${String(entry.id)}`);
      return { id: pin.id, requirement: pin.requirement };
    }) };
  });
  const falsifiers = parsed.falsifiers.map((entry: unknown): Falsifier => {
    if (!isRecord(entry) || typeof entry.id !== "string" || typeof entry.origin !== "string" || typeof entry.file !== "string" || !Array.isArray(entry.edits) || !strings(entry.falsifies)) throw new Error(`${ROSTER}: malformed falsifier`);
    const edits = entry.edits.map((edit: unknown): FalsifierEdit => {
      if (!isRecord(edit) || typeof edit.anchor !== "string" || typeof edit.occurrence !== "number" || typeof edit.plant !== "string") throw new Error(`${ROSTER}: malformed edit in falsifier ${String(entry.id)}`);
      return { anchor: edit.anchor, occurrence: edit.occurrence, plant: edit.plant };
    });
    return { id: entry.id, file: entry.file, edits, falsifies: entry.falsifies };
  });
  const residuals = parsed.residuals.map((entry: unknown) => {
    if (!isRecord(entry) || typeof entry.id !== "string" || typeof entry.quietPin !== "string") throw new Error(`${ROSTER}: malformed residual`);
    return { id: entry.id, quietPin: entry.quietPin };
  });
  return { bead: parsed.bead, rows, falsifiers, residuals };
}

const SHAPE: readonly string[] = ["G:wb-jwc.9 U2:4", "F:R-B109 U1:5", "C:wb-jwc.9 U1:7", "U:R-B109 U2:6", "R:residual:5"];
const PIN_LINES: Readonly<Record<string, string>> = {
  "G:literal:registerReactiveFiberRender":
    "G:literal:registerReactiveFiberRender | the judged register call in registerReactiveFiberRender names an rf capability id, and its descriptor literal spells effectClass as the whole token read and permissions as an array literal of the one whole token reactivefiber:render, so in every run that reaches it the call hands the registry that id read under reactivefiber:render whatever the registrar's arguments, workspace root or environment; any other syntax there is written into the witness instead of a word, so it fails closed | src/workbench/providers/reactivefiber.ts#registerReactiveFiberRender: id=reactivefiber.render.preview effectClass=read permissions=[reactivefiber:render]",
  "G:literal:registerNativeReactiveFiberRender":
    "G:literal:registerNativeReactiveFiberRender | the judged register call in registerNativeReactiveFiberRender names an rf capability id, and its descriptor literal spells effectClass as the whole token read and permissions as an array literal of the one whole token reactivefiber:render, so in every run that reaches it the call hands the registry that id read under reactivefiber:render whatever the registrar's arguments, workspace root or environment; any other syntax there is written into the witness instead of a word, so it fails closed | src/workbench/providers/reactivefiber.ts#registerNativeReactiveFiberRender: id=reactivefiber.render.preview effectClass=read permissions=[reactivefiber:render]",
  "G:unjudged":
    "G:unjudged | every other src spelling of a member named register is listed by file, owner and syntax, so a registration made through any other spelling moves the witness | unparsed src files=none; unjudged register spellings=src/workbench/capability-registry.ts#CapabilityRegistry: MethodDeclaration; src/workbench/hosts/local-detached.ts#registryFor: PropertySignature; src/workbench/hosts/local-detached.ts#registryFor: TypeOfExpression; src/workbench/hosts/local-detached.ts#registryFor: VariableDeclaration; src/workbench/hosts/local-detached.ts#registryFor: PropertyAccessExpression; src/workbench/hosts/local-detached.ts#registryFor: BinaryExpression; src/workbench/hosts/local-detached.ts#registryFor: CallExpression; src/workbench/hosts/local-detached.ts#registryFor: register call, provider Identifier",
  "G:runs":
    "G:runs | each src rf registrar, run with a fresh registry in each stated run form (the census workspace root; process.cwd() as the workspace root; the census root with every environment name src reads set to each effect class word src's CapabilityDescriptor declares but read), leaves the registry holding its rf id read under reactivefiber:render: what the registry holds for rf ids when it returns is listed per run form | census-root registerReactiveFiberRender: reactivefiber.render.preview=read/[reactivefiber:render]; census-root registerNativeReactiveFiberRender: reactivefiber.render.preview=read/[reactivefiber:render]; cwd-root registerReactiveFiberRender: reactivefiber.render.preview=read/[reactivefiber:render]; cwd-root registerNativeReactiveFiberRender: reactivefiber.render.preview=read/[reactivefiber:render]; env-write registerReactiveFiberRender: reactivefiber.render.preview=read/[reactivefiber:render]; env-write registerNativeReactiveFiberRender: reactivefiber.render.preview=read/[reactivefiber:render]; env-external registerReactiveFiberRender: reactivefiber.render.preview=read/[reactivefiber:render]; env-external registerNativeReactiveFiberRender: reactivefiber.render.preview=read/[reactivefiber:render]; env-unknown registerReactiveFiberRender: reactivefiber.render.preview=read/[reactivefiber:render]; env-unknown registerNativeReactiveFiberRender: reactivefiber.render.preview=read/[reactivefiber:render]",
  "F:injectable:bare":
    "F:injectable:bare | a fresh read through the injectable registration: a reactive-fiber.cli/v1 context.render envelope carrying the fresh rfo_ around the bare result (output text alone): no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt returned/unbound ref=rfo_freshpreview0000000000; effect-confirmed=deny:evidence-identity-mismatch effect-absent=deny:evidence-identity-mismatch indeterminate=deny:evidence-identity-mismatch; no acknowledgement to override",
  "F:injectable:minimal":
    "F:injectable:minimal | a fresh read through the injectable registration: a reactive-fiber.cli/v1 context.render envelope carrying the fresh rfo_ around the smallest result the native preview admits (exactly the keys isPreviewEnvelope requires): no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt returned/unbound ref=rfo_freshpreview0000000000; effect-confirmed=deny:evidence-identity-mismatch effect-absent=deny:evidence-identity-mismatch indeterminate=deny:evidence-identity-mismatch; no acknowledgement to override",
  "F:injectable:full":
    "F:injectable:full | a fresh read through the injectable registration: a reactive-fiber.cli/v1 context.render envelope carrying the fresh rfo_ around the full rf 0.1.845 result (every key of test/fixtures/rf-result-keys.json): no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt returned/unbound ref=rfo_freshpreview0000000000; effect-confirmed=deny:evidence-identity-mismatch effect-absent=deny:evidence-identity-mismatch indeterminate=deny:evidence-identity-mismatch; no acknowledgement to override",
  "F:native:minimal":
    "F:native:minimal | a fresh read through the native registration: a stand-in rf printing a reactive-fiber.cli/v1 context.render envelope carrying the fresh rfo_ around the smallest result the native preview admits (exactly the keys isPreviewEnvelope requires), exit 0: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt returned/unbound ref=rfo_freshpreview0000000000; effect-confirmed=deny:evidence-identity-mismatch effect-absent=deny:evidence-identity-mismatch indeterminate=deny:evidence-identity-mismatch; no acknowledgement to override",
  "F:native:full":
    "F:native:full | a fresh read through the native registration: a stand-in rf printing a reactive-fiber.cli/v1 context.render envelope carrying the fresh rfo_ around the full rf 0.1.845 result (every key of test/fixtures/rf-result-keys.json), exit 0: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt returned/unbound ref=rfo_freshpreview0000000000; effect-confirmed=deny:evidence-identity-mismatch effect-absent=deny:evidence-identity-mismatch indeterminate=deny:evidence-identity-mismatch; no acknowledgement to override",
  "C:injectable:validation":
    "C:injectable:validation | a read failed with validation: the injectable seam throws a CapabilityError of category validation: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt validation/operator-asserted ref=none; effect-confirmed=deny:effect-confirmed-without-evidence effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "C:injectable:authorization":
    "C:injectable:authorization | a read failed with authorization: the injectable seam throws a CapabilityError of category authorization: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt authorization/operator-asserted ref=none; effect-confirmed=deny:effect-confirmed-without-evidence effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "C:injectable:unavailable":
    "C:injectable:unavailable | a read failed with unavailable: the injectable seam throws a CapabilityError of category unavailable: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt unavailable/operator-asserted ref=none; effect-confirmed=deny:effect-confirmed-without-evidence effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "C:injectable:transport":
    "C:injectable:transport | a read failed with transport: the injectable seam throws a CapabilityError of category transport: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt transport/operator-asserted ref=none; effect-confirmed=deny:effect-confirmed-without-evidence effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "C:injectable:uncertain-effect":
    "C:injectable:uncertain-effect | a read failed with uncertain-effect: the injectable seam throws a CapabilityError of category uncertain-effect: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt uncertain-effect/operator-asserted ref=none; effect-confirmed=deny:effect-confirmed-without-evidence effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "C:native:malformed":
    "C:native:malformed | a read failed through the native registration: a stand-in rf printing a line that is not JSON, exit 0: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt transport/operator-asserted ref=none; effect-confirmed=deny:effect-confirmed-without-evidence effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "C:native:refused":
    "C:native:refused | a read failed through the native registration: a stand-in rf printing an rf refusal (ok false, one RF_ error diagnostic, result null), exit 1: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt unavailable/operator-asserted ref=none; effect-confirmed=deny:effect-confirmed-without-evidence effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "U:injectable:show-bare":
    "U:injectable:show-bare | an unprojected read through the injectable registration: a context.show envelope around the bare result: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt returned/operator-asserted ref=none; effect-confirmed=ack:operator-asserted effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "U:injectable:show-full":
    "U:injectable:show-full | an unprojected read through the injectable registration: a context.show envelope around the full rf 0.1.845 result: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt returned/operator-asserted ref=none; effect-confirmed=ack:operator-asserted effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "U:injectable:drift-bare":
    "U:injectable:drift-bare | an unprojected read through the injectable registration: a context.render envelope under schema reactive-fiber.cli/v2 around the bare result: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt returned/operator-asserted ref=none; effect-confirmed=ack:operator-asserted effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "U:injectable:drift-full":
    "U:injectable:drift-full | an unprojected read through the injectable registration: a context.render envelope under schema reactive-fiber.cli/v2 around the full rf 0.1.845 result: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt returned/operator-asserted ref=none; effect-confirmed=ack:operator-asserted effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "U:injectable:no-source":
    "U:injectable:no-source | an unprojected read through the injectable registration: no envelope at all (the seam answers null): no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt returned/operator-asserted ref=none; effect-confirmed=ack:operator-asserted effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "U:injectable:no-identity":
    "U:injectable:no-identity | an unprojected read through the injectable registration: a reactive-fiber.cli/v1 context.render envelope around the full rf 0.1.845 result with no operation_id: no acknowledgement citing its receipt is producer-confirmed for any member of src's EffectDetermination, and no override after its effect-absent acknowledgement carries duplicate risk none | receipt returned/operator-asserted ref=none; effect-confirmed=ack:operator-asserted effect-absent=ack:operator-asserted indeterminate=ack:operator-asserted; override unaccepted=deny:duplicate-risk-unaccepted accepted=override:possible-duplicate",
  "R:fresh-shape":
    "R:fresh-shape | NAMED RESIDUAL R-FRESH-SHAPE, not claimed: row F probes exactly the fresh reads it lists, each carrying the fresh rfo_, so a fresh read in any other shape (another subset of the optional result keys the native preview admits, observation rows, another release, digest, workspace or id value) is not probed; each fed read's result keys and projection are listed, and the full result is held to the rf result-key roster | injectable:bare keys=[output] provider=reactivefiber nativeId=rfo_freshpreview0000000000 sourceBasis=none producerRelease=none; injectable:minimal keys=[output,provenance,budget,diagnostics_summary,work,ephemeral,render_id] provider=reactivefiber nativeId=rfo_freshpreview0000000000 sourceBasis=set producerRelease=none; injectable:full keys=every roster result key (27) provider=reactivefiber nativeId=rfo_freshpreview0000000000 sourceBasis=set producerRelease=0.1.845; native:minimal keys=[output,provenance,budget,diagnostics_summary,work,ephemeral,render_id] provider=reactivefiber nativeId=rfo_freshpreview0000000000 sourceBasis=set producerRelease=none; native:full keys=every roster result key (27) provider=reactivefiber nativeId=rfo_freshpreview0000000000 sourceBasis=set producerRelease=0.1.845; full result against rf 0.1.845 roster: diff failures none",
  "R:unprojected-form":
    "R:unprojected-form | NAMED RESIDUAL R-UNPROJECTED-FORM, not claimed: row U probes exactly the unprojected reads it lists, so a returned read projecting no native reference in any other form (another schema id or command, another malformed identity, another result, another workspace root) is not probed; each fed form's schema, command, operation_id and projection are listed | injectable:show-bare schema=reactive-fiber.cli/v1 command=context.show operation_id=rfo_freshpreview0000000000 provider=none nativeId=none sourceBasis=none producerRelease=none; injectable:show-full schema=reactive-fiber.cli/v1 command=context.show operation_id=rfo_freshpreview0000000000 provider=none nativeId=none sourceBasis=none producerRelease=none; injectable:drift-bare schema=reactive-fiber.cli/v2 command=context.render operation_id=rfo_freshpreview0000000000 provider=none nativeId=none sourceBasis=none producerRelease=none; injectable:drift-full schema=reactive-fiber.cli/v2 command=context.render operation_id=rfo_freshpreview0000000000 provider=none nativeId=none sourceBasis=none producerRelease=none; injectable:no-source schema=<none> command=<none> operation_id=<none> provider=none nativeId=none sourceBasis=none producerRelease=none; injectable:no-identity schema=reactive-fiber.cli/v1 command=context.render operation_id=<none> provider=reactivefiber nativeId=none sourceBasis=set producerRelease=0.1.845",
  "R:echo":
    "R:echo | NAMED RESIDUAL R-ECHO, not claimed: an envelope under the preview contract that echoes the journaled rfo_ binds journal-recorded and confirms, because Pi takes the envelope's operation_id as given and never checks it is fresh; today's behaviour is pinned | receipt returned/journal-recorded ref=rfo_journaledcommit000000000; effect-confirmed=ack:producer-confirmed effect-absent=ack:producer-confirmed indeterminate=ack:producer-confirmed; override unaccepted=override:none accepted=override:none",
  "R:run-form":
    "R:run-form | NAMED RESIDUAL R-RUN-FORM, not claimed: a registration is read through its descriptor literal (G:literal) and measured in the stated run forms (G:runs) only, so a rewrite of what the registry holds after a judged call (CapabilityRegistry.register's own body, or code reaching the descriptors the registry holds), a register member reached through a name src never spells, or an environment read src makes by a computed name or through a whole use of process.env, conditioned on another workspace root, environment value or argument, is not read; src's environment reads are listed by name, computed access and whole use, with the run forms | run forms=census-root(census root, 0 variables) cwd-root(process.cwd(), 0 variables) env-write(census root, 1 variables = write) env-external(census root, 1 variables = external) env-unknown(census root, 1 variables = unknown); environment names src reads=PI_CODING_AGENT_SESSION_DIR; computed=src/agent-dir.ts#getAgentDir: Identifier; whole uses=src/workbench/hosts/local-detached.ts#resolveDetachedSocket: BinaryExpression,src/workbench/hosts/local-detached.ts#launchDetachedWorkflow: CallExpression,src/workbench/providers/reactivefiber.ts#nativeReactiveFiberRender: CallExpression",
  "R:probe-context":
    "R:probe-context | NAMED RESIDUAL R-PROBE-CONTEXT, not claimed: every read of rows F, C and U is fed in one request context against one journaled row, so a binding conditioned on any other task, position, principal, session, workspace, grant set, clock or journaled row is not probed; the context and the row are listed | task=wf_rfhonesty-census position=0 principal=local-operator:1:s1 session=s1 workspace=/workspace/rf-operation-receipt-honesty observedAt=2026-10-30T06:00:00Z grants=workbench:observe,reactivefiber:render,reconcile:reactivefiber.acknowledge,reconcile:reactivefiber.override; journaled row index=0 kind=node capability=reactivefiber.render.commit effectClass=write nativeRefs=reactivefiber/operation/rfo_journaledcommit000000000",
};
const PINS = ROWS.flatMap(entry => entry.pins);
/** EACH-LIVENESS: the ids the row cases and the pin cases recorded as their last statement this run, in run order. */
const REACHED: { readonly rows: string[]; readonly pins: string[] } = { rows: [], pins: [] };
const ROW_CASE = "row %s carries exactly the pins its outside anchor generates";
const PIN_CASE = "pin %s";

describe("wb-jwc.9 the rf operation-receipt reconcile honesty core: full-surface readers for the G registrations and the N/H reads", () => {
  it("reads the owner filings: wb-jwc.9's two items, R-B109's two folded members and wb-jwc.6's N and H words", () => {
    expect([...OWN_ITEMS]).toStrictEqual([["U2", "G registrars measured across RUNS"], ["U1", "N/H failed-read variants per CATEGORY"]]);
    expect([...FOLDED_ITEMS]).toStrictEqual([["U1", "census over-claim, N/H honesty probes"], ["U2", "unprojected read"]]);
    expect(PARENT_WORDS).toStrictEqual({
      n: "the preview read shall never serve as commit evidence",
      h: "a reconcile fed only a preview envelope for a committed-effect journal row is asserted NOT producer-confirmed",
    });
  });

  it("maps every filing item to its row, and the rows no item maps to are the residual rows an anchor calls for", async () => {
    expect(Object.keys(CLAUSE_ROWS)).toStrictEqual([...[...OWN_ITEMS.keys()].map(key => `${BEAD} ${key}`), ...[...FOLDED_ITEMS.keys()].map(key => `R-B109 ${key}`)]);
    for (const [clause, target] of Object.entries(CLAUSE_ROWS)) expect(ROWS.find(entry => entry.id === target)?.clause, `row ${target} judges ${clause}`).toBe(clause);
    expect(Object.keys(GENERATED), "every generated row is a judged row").toStrictEqual(ROWS.map(entry => entry.id));
    const mapped: readonly string[] = Object.values(CLAUSE_ROWS);
    expect(ROWS.map(entry => entry.id).filter(id => !mapped.includes(id))).toStrictEqual(await residualRowsCalledFor());
  });

  it("holds the frozen row shape (standing rule 16)", () => {
    expect(ROWS.map(entry => `${entry.id}:${entry.clause}:${entry.pins.length}`)).toStrictEqual(SHAPE);
  });

  it("agrees byte for byte with the falsifier roster: every row, clause and requirement, every falsified pin and every residual's quiet row", () => {
    const roster = readRoster();
    expect(roster.bead).toBe(BEAD);
    expect(roster.rows).toStrictEqual(ROWS.map(entry => ({ id: entry.id, clause: entry.clause, pins: entry.pins.map(pin => ({ id: pin.id, requirement: pin.requirement })) })));
    const ids = PINS.map(pin => pin.id);
    for (const falsifier of roster.falsifiers) {
      expect(falsifier.falsifies.length, `falsifier ${falsifier.id} names the pins it falsifies`).toBeGreaterThan(0);
      for (const id of falsifier.falsifies) expect(ids, `falsifier ${falsifier.id} falsifies pin ${id}`).toContain(id);
      expect(falsifier.file.startsWith("src/"), `falsifier ${falsifier.id} plants in src`).toBe(true);
      expect(falsifier.edits.length, `falsifier ${falsifier.id} makes at least one edit`).toBeGreaterThan(0);
    }
    expect(roster.residuals.map(residual => residual.quietPin)).toStrictEqual(ROWS.find(entry => entry.id === "R")?.pins.map(pin => pin.id));
  });

  it.each(ROWS.map(entry => entry.id))(ROW_CASE, async rowId => {
    expect(ROWS.find(entry => entry.id === rowId)?.pins.map(pin => pin.id)).toStrictEqual(await GENERATED[rowId]());
    REACHED.rows.push(rowId);
  }, 60_000);

  it("holds exactly one frozen line per pin", () => {
    expect(Object.keys(PIN_LINES)).toStrictEqual(PINS.map(pin => pin.id));
  });

  it.each(PINS.map(pin => pin.id))(PIN_CASE, async id => {
    const pin = PINS.find(entry => entry.id === id);
    if (pin === undefined) throw new Error(`no pin ${id}`);
    const line = `${pin.id} | ${pin.requirement} | ${await pin.witness()}`;
    expect(line).toBe(PIN_LINES[id]);
    REACHED.pins.push(id);
  }, 60_000);

  it("each-liveness (standing rule 16): both it.each sites registered one run-mode case per frozen row and per frozen pin line, in order, and every one reached its last statement", ({ task }) => {
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "suite") walk(child.tasks);
        else if (child.type === "test" && /^(?:row|pin) /.test(child.name)) registered.push(`${child.name}|${child.mode}`);
      }
    };
    walk(task.file.tasks);
    const rowIds = SHAPE.map(entry => entry.slice(0, entry.indexOf(":")));
    const pinIds = Object.keys(PIN_LINES);
    expect(registered, "the run-mode cases the two it.each sites registered").toStrictEqual([...rowIds.map(id => `${ROW_CASE.replace("%s", id)}|run`), ...pinIds.map(id => `${PIN_CASE.replace("%s", id)}|run`)]);
    expect(REACHED.rows, "the row cases that reached their last statement this run").toStrictEqual(rowIds);
    expect(REACHED.pins, "the pin cases that reached their last statement this run").toStrictEqual(pinIds);
  });
});
