/**
 * wb-a9l2.6 (RF-HARNESS2-FEDERATED-PEER-R6): no hidden rf evaluator artifact in agent-visible context. Statement (bead title):
 * "No Pi surface shall place an rf federation evaluator artifact (shadow-test diff, acceptance receipt grade, conformance
 * verdict) into agent-visible context as hidden or implicit evidence; any such artifact Pi surfaces is a declared, labelled
 * evidence ref quoted as the producer's data (release condition over RFCLI-H2-00..05, none with an artifact at the pin; Pi pins
 * today's absence)." Source: harness2-federated-peer-2026-10-20/README.md:51@6a251bf73af5, "no hidden evaluator artifact in
 * agent-visible context. Any missing implementation stays explicitly unshipped." Acceptance (bead notes): "(a) a hermetic
 * census asserts Pi's agent-context composers inject no string sourced from an rf graph shadow-test or federation receipt
 * except through a declared evidence ref labelled with its producer; (b) given a fixture shadow-test receipt, Pi surfaces its
 * grade words verbatim as rf data and emits no Pi-owned pass/fail label; (c) until an rf evaluator surface ships, a guard pins
 * today's absence."
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read-only git show by the cutting seat): `rf graph test --candidate C
 * --json` is served (src/reactive_fiber_cli/cli/registry.py:881-892, rfc-3fo4r.104) and writes the shadow validation receipt
 * of src/reactive_fiber_cli/schemas/cli/graph.test.schema.json (blob 8e95edd2): eight required result keys, one check per id
 * of a closed ten-id enum with status passed or skipped, valid const true, published_head_unchanged const true and
 * effects_authorized const false. SHADOW_RECEIPT is the result object of the producer's own valid fixture
 * schemas/fixtures/graph.test/valid/ok_shadow.json (blob 7442508d), transcribed byte for byte; the roster holds the sha256 of
 * its canonical JSON. The two regraded variants are the producer's invalid fixtures check_status_failed.json (blob 8e3f8785,
 * checks[0].status failed) and valid_false_on_success.json (blob 5939c3c6, valid false), each one field away from it. The H2-02
 * owner-revision, source-cut, cursor and authority acceptance receipts and the H2-05 conformance outcome have no producer shape
 * at the pin (README:34 and :37), so their two probes are CONSTRUCTED with obviously fake values.
 *
 * WHERE AN ARTIFACT COULD ENTER. Agent-visible context is the surface the Claude-agent host composes (bead note). The only
 * composers that can carry an rf reading are the call sites of a capability registry's invoke in src, which row A1 pins by an
 * AST scan: claude-capability-tools.ts (capability_invoke, the curated MCP tool createClaudeWorkflowHost hands a role as
 * mcpServers.workbench) and reconcile-tool.ts (the workflow_reconcile evidence reply) reach an agent; claude-host.ts and
 * hosts/local-detached.ts (callNode) hand a workflow script its node() value; evidence-wiring.ts reads forge.gate.status by
 * literal. Pi's one rf reader, the reactivefiber.render.preview provider, admits a context.render envelope with additive result
 * keys and refuses every other command, so an evaluator artifact reaches a composer only as an additive key of a render
 * envelope: the probes ride three such keys (CARRIERS) and one info diagnostic's metadata. The rf observer adapter
 * (reactivefiber-observer.ts, the designated workflow_observe feed) has no src caller today; row A5 pins its projection anyway.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the invoke-reference roster and its classes (every `invoke` member reference of src, called or not,
 *    by property access, string-literal element access, a destructuring key (a binding pattern, or an assignment pattern on the
 *    left of "=" or in a for-of or for-in head, at any depth: through object property values, array elements, array rest
 *    elements and defaults; keyed by a name, a string literal or a computed string literal) or a call handing the literal
 *    "invoke" as its second or later argument (Reflect.get, Object.getOwnPropertyDescriptor; conservative: any such call reads
 *    as a reference), each literal read through the wrappers that keep its value (parentheses, as, satisfies, a type assertion
 *    and a non-null assertion), each form with a positive control and the non-reference shapes with quiet controls, the roster
 *    holding every control's input digest, over a walk covering every src file git lists, a narrowed walk read as not
 *    covering), and the observer's 0 src callers. A2 capability_invoke over the
 *    native registration and a stand-in rf: the reply is Pi's frame (kind, contract, workspaceRoot, isError) plus the envelope
 *    the stand-in printed, verbatim, at value.source; the frame carries no planted string and is identical with or without the
 *    artifacts. A3 workflow_reconcile evidence: the snapshot quotes the envelope verbatim, the receipt names producer
 *    reactivefiber (capabilityId and nativeRef too) and states no domainStatus, and the frame (the result-identity digests aside)
 *    is identical with or without the artifacts and is pinned whole, its EVIDENCE_GUIDANCE lines included. A4 a workflow
 *    script's node() call returns the reading byte for byte. A5 the observer's topology and the workflow_observe reply over it
 *    are byte-identical with or without the artifacts. A6 no reply part outside content[0]: in every variant both replies hold
 *    exactly one content block, capability_invoke's reply has no key beside content (no structuredContent) and
 *    workflow_reconcile's details stay undefined.
 *  B, acceptance (b). B1 the transcription is the producer's fixture (digest, keys, the ten check ids, statuses, invariants) and
 *    the regrades are its two invalid fixtures. B2 every grade word reaches capability_invoke, workflow_reconcile and node()
 *    verbatim inside the rf envelope, for the printed receipt and both regrades. B3 Pi adds no pass/fail label: the two frames
 *    stay identical across all four variants, isError stays false, and no frame string matches the pass/fail lexicon outside
 *    workflow_reconcile's fixed EVIDENCE_GUIDANCE lines (A3 pins those lines). B4 the receipt's own graph.test envelope is
 *    refused by the command gate before anything is surfaced, neither reply carries a receipt string, and each refusal holds
 *    one content block.
 *  C, acceptance (c). C1 the host evidence store has no rf loader: every rf reference the observer mints renders
 *    unavailable no-loader, while a forge reference reaches its loader. C2 the native registration's rf capability is the
 *    invoke-only preview, read three ways (id namespace, permission namespace, contractSource producer or rf schema; each way
 *    exercised by a constructed descriptor that names rf that way alone), the native id set is pinned whole (a new native
 *    capability of any producer reds here until it is classified), and no descriptor spells the receipt vocabulary. C3 no src
 *    file spells it (floor, anchor and a walk covering every src file git lists). C4 src launches the rf binary from one site, the
 *    preview's spawn: every literal part (a string, a no-substitution template, and each head, middle and tail span of a
 *    template, a template part read both cooked and raw so a String.raw path counts) is found that names the binary as its
 *    leading word: rf, or a path whose final segment (after the last "/" or "\") is rf, optionally as rf.exe or rf.cmd, ended by
 *    whitespace, a quote, a backquote, a closing brace, a shell operator (; & | ) < >) or the part's end, either bare or inside
 *    one pair of single or double quotes that may hold whitespace (a quoted word in any case); that holds such a path anywhere,
 *    its final segment ended the same way, in any case (a path holding whitespace, quoted, escaped or not, closing a quote an
 *    earlier span opened, closing a command substitution or a parameter expansion, or after another word); or that is one token
 *    (a bare name or a path, never prose) naming it in any case (conservative: an rf-led prose part, or a prose part naming an rf
 *    path, reads as a site too, and so does a word the shell continues past a backquote or a closing brace), with positive and
 *    quiet controls whose input digests the roster holds.
 *  M, the matcher rows C2 and C3 read: M1-M20 the spellings they must catch (words joined directly or by whitespace, "_", ".",
 *    "-", ":" or "/"; every JS string escape is read as what it spells first, left to right: a unicode escape (four hex digits,
 *    or braced with any number of hex digits up to U+10FFFF), a hex or a legacy octal escape as its character, a
 *    single-character escape such as backslash-t as its control character, an identity escape such as backslash-underscore as
 *    the character escaped, and a line continuation as nothing); Q1-Q4 the pinned quiet rows of the residuals.
 *  S, the scan residual rows: Q5-Q11 the pinned quiet rows of the named residuals of A1's invoke scan and C4's launch scan.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the judged set (every row's id, label and
 * pins, every pin's witness, the input digest of every A1, C2 and C4 control, the vocabularies and the producer fixture facts)
 * is held to the out-of-file roster
 * test/fixtures/rf-evaluator-artifact-context-roster.json, so a pin deleted, relabelled, swapped for another passing case or
 * removed from every literal here at once still reds against it, and every witness is measured by its own case.
 * RESIDUALS (named, each with a pinned quiet row): R-INTERRUPTED a vocabulary spelling split by a zero-width code point (Q1) or
 * carrying a homoglyph letter (Q2) is not caught by C3; R-COMPOSED a token assembled at runtime from parts is invisible to any
 * text scan: a receipt term (Q3; C2 is the runtime backstop for served descriptor text only), an invoke key (Q6, A1's scan) or
 * the rf binary's name (Q9, C4's scan); R-SPLIT a separator inside one word of a term (sub_processes_spawned, Q4) is not caught:
 * a matcher admitting a separator between any two letters reads the landed observer text "view_contract s(atisfied)" in src as
 * view_contracts (measured at the wb-e9j2 cut), so the split stays a named residual. R-KEYED an invoke member reached through a
 * key A1 does not read at the access: held in a variable or a parameter (Q5), or computed by an expression that is not a
 * literal, such as a comma, a conditional or a call (Q10): reading every "invoke" literal as a key would read the twenty landed
 * capability-mode literals of eight src files (the supportedModes values, the mode unions, the mode tests,
 * dispatch("invoke", ...)) as sites. R-EMBEDDED rf launched by its bare name after another word of a literal part, a shell line
 * such as "cd /w && rf context render" or "npx rf ..." (Q7; an rf path after another word is read by its final segment):
 * reading rf as any delimited word reads the two landed rf-word messages of src/workbench/reactivefiber-observer.ts ("source
 * must be the strict eight-key rf envelope", "source.diagnostics holds a malformed rf diagnostic") as sites. R-CASE a
 * case-variant bare rf leading an unquoted command line such as "RF context render" (Q8): a case-blind reading of a part's
 * leading token reads the sixteen landed "RF ..." messages of src/workbench/providers/reactivefiber.ts and
 * src/workbench/reactivefiber-observer.ts as sites, so only a one-token part, a quoted leading word and a path's final segment
 * are read in any case. R-SHELL a program word the shell assembles where a literal scan reads no rf word: rf glued after a group
 * opener ("(rf ...)") or a backquote ("`rf`") or after a parameter expansion's default operator ("${RF_BIN:-rf}"), or spelled in
 * quoted or escaped pieces (r'f', "r"f, r\f) or in ANSI-C quotes ($'rf') (Q11): reading those is shell parsing, beyond a scan
 * of literal words; an rf path inside such a word, its final segment ended by one of C4's word ends (a closing backquote or
 * brace included: "`/opt/bin/rf`", "${RF_BIN:-/opt/bin/rf}"), is still read by its final segment. A launch whose command line
 * spells the receipt vocabulary ("rf graph test") is still caught by C3 under any of these residuals. (R-KEYED, R-EMBEDDED and
 * R-CASE measured at the wb-ofz4 cut; their narrowed forms and R-SHELL at the wb-sfo7 cut, whose added C4 and A1 readings read
 * no landed src part beyond the preview's spawn; R-SHELL's backquote and parameter-expansion members at the wb-0hkv cut, whose
 * added word ends read none either.)
 * FOLLOW-UP wb-e9j2 (the wb-a9l2.6 gate's PREP F1 (i)-(v) and F2): A6; A3's whole frame; C2's three readings and id set; C4; the
 * git-covering walks of A1, C3 and C4; A1's every-reference invoke scan; the ":" and "/" separators, the escape reading, M10-M14, Q4.
 * FOLLOW-UP wb-ofz4 (the wb-e9j2 gate's F1-F3, landing 353): C4's final-path-segment, template-span, extension and one-token case
 * readings with their controls (F1); A1's destructuring and reflective reads, its quiet control, R-KEYED (F2); the full JS
 * string-escape reading, M15-M18 and row M's label stating it (F3); row S, the quiet rows of the scan residuals.
 * FOLLOW-UP wb-sfo7 (the wb-ofz4 gate's F1-F6, landing 454): C4 reads a path's final segment anywhere in a part, whitespace
 * included, in any case (F1), a quoted leading word, a word ended by a quote or a shell operator, and a template part's raw
 * text (F2), each C4 reading pinned by a control only it reads; A1 reads a literal through its value-keeping wrappers (F3) and
 * climbs an array rest element (F4); a braced unicode escape takes any number of hex digits, M19 and M20 (F5); the roster holds
 * the input digest of every A1, C2 and C4 control (F6); the quiet rows Q10 (R-KEYED's expression keys) and Q11 (R-SHELL).
 * FOLLOW-UP wb-0hkv (the wb-sfo7 gate's F1, landing 562): C4's word ends read a backquote and a closing brace (WORD_END), so a
 * path closing a command substitution ("`/opt/bin/rf`") or a parameter expansion ("${RF_BIN:-/opt/bin/rf}") is a site; each of
 * RF_LEAD, RF_QUOTED and RF_SEGMENT is pinned with each new end by a control only it reads, and the conservative read of a word
 * the shell continues past one by two more; boundary quiet controls sit beside them inside backquotes and braces; R-SHELL names
 * its backquote and parameter-expansion-default members and Q11 pins them quiet.
 * SCOPE: a workflow script authors its own prompts; A4 pins that what it receives is the producer-labelled reading, and what it
 * then writes is the script's. result.view_contract (the served --view outcome the observer notes, wb-973.2) is a landed reader
 * of a served context.render field, not an H2 evaluator artifact, and stays with its own pins. The vocabularies are producer
 * facts at 6a251bf73af5; Pi vendors no rf schema, so a producer change is seen only when an rf pin-bump re-reads them.
 *
 * Display paths added: none. Test-only: the stand-in rf, the journal and every workspace root live in makeScratch scratch.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionToolContext } from "@earendil-works/pi-coding-agent";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { CLAUDE_TRANSCRIPT_GRANT, EVIDENCE_LOADER_ROWS, FORGE_INSPECT_GRANT, FURNACE_INSPECT_GRANT } from "../src/workbench/evidence-producers.js";
import { createWorkbenchEvidenceStore } from "../src/workbench/evidence-wiring.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { observeInvocation } from "../src/workbench/observe-query.js";
import { REACTIVE_FIBER_CLI_SCHEMA, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerNativeReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { EVIDENCE_GUIDANCE } from "../src/workbench/reconcile-decision.js";
import { createWorkflowReconcileTool } from "../src/workbench/reconcile-tool.js";
import { appendJournal } from "../src/workflow/journal.js";
import { runWorkflow } from "../src/workflow/runtime.js";
import { createWorkflowTask } from "../src/workflow/task.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-evaluator-artifact-context-roster.json");
const PREVIEW_ID = "reactivefiber.render.preview";
const RENDER_INPUT: JsonObject = { model: "m", task: "t" };

/** The result object of ReactiveFiberCLI schemas/fixtures/graph.test/valid/ok_shadow.json at 6a251bf73af5, byte for byte. */
const SHADOW_RECEIPT: JsonObject = {
  overlay: {
    overlay_id: "worker-a-1",
    overlay_revision: 3,
    overlay_digest: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
    base_bundle_revision: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    scope: "shared",
    scope_key: null,
  },
  valid: true,
  checks: [
    { id: "budget_gate", status: "skipped", detail: "no latency budget declared" },
    { id: "compilability", status: "passed", detail: "runtime compiler accepted the throwaway graph" },
    { id: "component_revisions", status: "passed", detail: "2 pinned revisions resolved" },
    { id: "graph_schema", status: "passed", detail: "swarm-context.bundle/v1 materialized; graph/v1 admitted" },
    { id: "lens_declarations", status: "passed", detail: null },
    { id: "optic_registry", status: "passed", detail: "beads.current_projection pinned to its revision digest" },
    { id: "redaction_gate", status: "passed", detail: null },
    { id: "shadow_render", status: "passed", detail: "1 view rendered over 4 captured observations" },
    { id: "trust_gate", status: "passed", detail: "no capability beyond the policy's grants" },
    { id: "view_contracts", status: "passed", detail: "swarm.worker: required keys present, 1024 bytes <= budget" },
  ],
  shadow: {
    evidence: "captured",
    subprocesses_spawned: 0,
    observations_reused: 4,
    renders: [{ view_id: "swarm.worker", output_digest: "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd" }],
  },
  comparisons: [
    {
      key: "beads.current",
      before: "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      after: "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      changed: false,
    },
    {
      key: "swarm.worker",
      before: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
      after: "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      changed: true,
    },
  ],
  published_head_unchanged: true,
  effects_authorized: false,
  validation_digest: "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
};

/** The same producer fixture's whole envelope: a graph.test command, which Pi's one rf reader never admits (row B4). */
const SHADOW_ENVELOPE: JsonObject = {
  schema: "reactive-fiber.cli/v1", ok: true, command: "graph.test", operation_id: "rfo_abcdefghijklmnopqrstuvwxyz",
  workspace: { id: "rfw_cccccccccccccccccccccccccc", root: "/abs/project" }, transaction_id: null, result: SHADOW_RECEIPT, diagnostics: [],
};

/** The graph.test check-id enum at the pin, in schema order (graph.test.schema.json $defs.check_id). */
const CHECK_IDS = [
  "graph_schema", "compilability", "component_revisions", "lens_declarations", "optic_registry",
  "trust_gate", "view_contracts", "redaction_gate", "budget_gate", "shadow_render",
];
/** The receipt's distinctive field vocabulary beside the check ids: the command and the keys only a receipt reader would name. */
const RECEIPT_FIELDS = [
  "graph.test", "published_head_unchanged", "effects_authorized", "validation_digest", "subprocesses_spawned",
  "observations_reused", "output_digest", "overlay_revision", "overlay_digest", "base_bundle_revision",
];
/** The H2 evaluator artifacts by the program's own names (README:34, :37, :51). */
const ARTIFACT_PHRASES = ["shadow test", "federation receipt", "conformance verdict", "evaluator artifact"];
const VOCABULARY = [...RECEIPT_FIELDS, ...CHECK_IDS, ...ARTIFACT_PHRASES];
/** Row C's matcher: each term's words in any case, joined directly or by any run of whitespace, "_", ".", "-", ":" or "/". */
const VOCAB_FAMILY = new RegExp(VOCABULARY.map(term => term.split(/[\s_.]+/).join(String.raw`[\s_.:/-]*`)).join("|"), "i");
/** The line separator and paragraph separator, the line terminators a line continuation may end in beside CR and LF. */
const LS_PS = String.fromCodePoint(0x2028, 0x2029);
/**
 * A JS string escape, read left to right so an escaped backslash never escapes the character after it: a backslash-u with four
 * hex digits or a braced code point (any number of hex digits, as JS reads it), a backslash-x with two hex digits, a line
 * continuation (a backslash before a line terminator), a legacy octal escape, or a backslash before any other character (a
 * single-character or an identity escape).
 */
const SOURCE_ESCAPE = new RegExp(
  String.raw`\\(?:u\{([0-9a-fA-F]+)\}|u([0-9a-fA-F]{4})|x([0-9a-fA-F]{2})|(\r\n|[\r\n${LS_PS}])|([0-3][0-7]{0,2}|[4-7][0-7]?)|([\s\S]))`,
  "g",
);
/** The single-character escapes that spell a control character, built from their code points. */
const CONTROL_ESCAPES: ReadonlyMap<string, string> = new Map([
  ["b", String.fromCodePoint(0x08)], ["f", String.fromCodePoint(0x0c)], ["n", String.fromCodePoint(0x0a)],
  ["r", String.fromCodePoint(0x0d)], ["t", String.fromCodePoint(0x09)], ["v", String.fromCodePoint(0x0b)],
]);
/** A text with each JS string escape read as what it spells (a line continuation as nothing; a code point beyond Unicode stays as written). */
function unescaped(text: string): string {
  return text.replace(
    SOURCE_ESCAPE,
    (whole: string, braced: string | undefined, four: string | undefined, two: string | undefined, terminator: string | undefined, octal: string | undefined, other: string | undefined): string => {
      if (terminator !== undefined) return "";
      if (octal !== undefined) return String.fromCodePoint(Number.parseInt(octal, 8));
      if (other !== undefined) return CONTROL_ESCAPES.get(other) ?? other;
      const code = Number.parseInt(braced ?? four ?? two ?? "", 16);
      return code <= 0x10ffff ? String.fromCodePoint(code) : whole;
    },
  );
}
/** Whether a text spells the receipt vocabulary: VOCAB_FAMILY over the text with its source escapes read (rows C2, C3 and M). */
function spelled(text: string): boolean {
  return VOCAB_FAMILY.test(unescaped(text));
}

/** CONSTRUCTED probes (no producer shape at the pin): an H2-02 acceptance receipt and an H2-05 conformance outcome. */
const ACCEPTANCE_PROBE: JsonObject = {
  receipt_kind: "owner-revision", owner_revision: "probe-owner-revision-0007", source_cut: "probe-source-cut-0003",
  cursor: "probe-cursor-0009", authority: "probe-authority-fixture", grade: "probe-grade-admitted",
};
const CONFORMANCE_PROBE: JsonObject = { verdict: "probe-verdict-conformant", fixture: "probe-installed-journey-fixture", milestone: "RFCLI-H2-05" };
/** The additive context.render result keys the planted artifacts ride; no shipped rf schema names them (constructed). */
const CARRIERS = { receipt: "shadow_test_receipt", acceptance: "acceptance_receipts", conformance: "conformance_outcome" } as const;
const NOTE_CODE = "RF_FIXTURE_EVALUATOR_NOTE";
const NOTE_MESSAGE = "probe-note: shadow test receipt attached (constructed)";

type Variant = "absent" | "printed" | "check-failed" | "valid-false";
const VARIANTS: readonly Variant[] = ["absent", "printed", "check-failed", "valid-false"];
const PLANTED: readonly Variant[] = ["printed", "check-failed", "valid-false"];

/** Words Pi would use if it graded the artifact itself; none may appear in a Pi-owned string. */
const LABEL_LEXICON = /\b(?:pass(?:ed|es|ing)?|fail(?:ed|s|ing|ure)?|success(?:ful)?|verified|conformant|approved)\b/i;

/** The modules of src that reference a registry or provider `invoke` member, and what each one reaches (row A1). */
const SITE_CLASSES: Readonly<Record<string, "agent" | "script" | "fixed" | "registry">> = {
  "src/workbench/capability-registry.ts": "registry",
  "src/workbench/claude-capability-tools.ts": "agent",
  "src/workbench/reconcile-tool.ts": "agent",
  "src/workbench/claude-host.ts": "script",
  "src/workbench/hosts/local-detached.ts": "script",
  "src/workbench/evidence-wiring.ts": "fixed",
};
const OBSERVER_MODULE = "src/workbench/reactivefiber-observer.ts";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) Pi's agent-context composers carry an rf evaluator artifact only inside the producer-labelled reading (contract reactivefiber.render.preview/v1 over a reactive-fiber.cli/v1 source), never as a Pi-authored string",
    pins: ["A1", "A2", "A3", "A4", "A5", "A6"],
  },
  {
    id: "B",
    label: "(b) the producer's shadow-test receipt (ok_shadow.json at the pin) reaches the agent with its grade words verbatim as rf data, and Pi adds no pass/fail label of its own",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) until an rf evaluator surface ships (RFCLI-H2-00..05, none at the pin), Pi pins its absence: no rf evidence loader, no rf evaluator capability and no src spelling of the receipt vocabulary",
    pins: ["C1", "C2", "C3", "C4"],
  },
  {
    id: "M",
    label: "the C2 and C3 matcher catches each receipt vocabulary term in any case, its words joined directly or by any run of whitespace, '_', '.', '-', ':' or '/', also behind any JS string escape (a unicode, hex, legacy octal, single-character or identity escape, or a line continuation), and its named residuals stay pinned quiet",
    pins: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12", "M13", "M14", "M15", "M16", "M17", "M18", "M19", "M20", "Q1", "Q2", "Q3", "Q4"],
  },
  {
    id: "S",
    label: "the A1 invoke scan and the C4 launch scan leave each named residual pinned quiet: an invoke key held in a variable or computed by a non-literal expression (R-KEYED), rf by its bare name after another word of a literal (R-EMBEDDED), a case-variant bare rf leading an unquoted command line (R-CASE), a program word the shell assembles from glued, quoted or escaped pieces (R-SHELL), and an invoke key or the rf binary's name assembled at runtime (R-COMPOSED)",
    pins: ["Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11"],
  },
];

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface ProducerFixture {
  readonly path: string;
  readonly blob: string;
}
interface Roster {
  readonly checkIds: readonly string[];
  readonly receiptFields: readonly string[];
  readonly artifactPhrases: readonly string[];
  readonly carriers: readonly string[];
  readonly receiptSha256: string;
  readonly producerFixtures: readonly ProducerFixture[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function objectOf(value: Json | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
function listOf(value: Json | undefined, field: string): Json[] {
  if (!Array.isArray(value)) throw new Error(`${field} must be a list`);
  return value;
}
function clone(value: Json): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.producerFixtures) || typeof raw.receiptSha256 !== "string") {
    throw new Error("roster must be an object with rows, producerFixtures and receiptSha256");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: JSON.parse(JSON.stringify(pin.witness)) as Json };
    });
    return { id: row.id, label: row.label, pins };
  });
  const producerFixtures = raw.producerFixtures.map((fixture: unknown, index: number): ProducerFixture => {
    if (!isObject(fixture) || typeof fixture.path !== "string" || typeof fixture.blob !== "string") throw new Error(`roster producerFixtures[${index}] needs a path and a blob`);
    return { path: fixture.path, blob: fixture.blob };
  });
  return {
    checkIds: strings(raw.checkIds, "checkIds"),
    receiptFields: strings(raw.receiptFields, "receiptFields"),
    artifactPhrases: strings(raw.artifactPhrases, "artifactPhrases"),
    carriers: strings(raw.carriers, "carriers"),
    receiptSha256: raw.receiptSha256,
    producerFixtures,
    rows,
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing tracked. */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}

/** Every string value below a JSON value (keys excluded). */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** A JSON value with every occurrence of `from` inside its strings replaced by `to`. */
function replacing(value: Json, from: string, to: string): Json {
  if (typeof value === "string") return value.replaceAll(from, to);
  if (Array.isArray(value)) return value.map(item => replacing(item, from, to));
  if (value !== null && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, replacing(item, from, to)]));
  return value;
}
const sha256 = (text: string): string => createHash("sha256").update(text).digest("hex");
/** A control input's digest as the roster holds it (the M and S row form): the first 16 hex digits of its sha256. */
const digestOf = (text: string): string => sha256(text).slice(0, 16);

/** The receipt a variant plants: the producer's printed receipt or one of its two invalid fixtures; none for the twin. */
function receiptOf(variant: Variant): JsonObject | undefined {
  if (variant === "absent") return undefined;
  const receipt = objectOf(clone(SHADOW_RECEIPT), "receipt");
  if (variant === "check-failed") objectOf(listOf(receipt.checks, "receipt.checks")[0], "receipt.checks[0]").status = "failed";
  if (variant === "valid-false") receipt.valid = false;
  return receipt;
}
/** Every string a variant plants into the envelope: the receipt, both probes and the note's message. */
function plantedStrings(variant: Variant): string[] {
  const receipt = receiptOf(variant);
  return receipt === undefined ? [] : [...new Set([...stringLeaves([receipt, ACCEPTANCE_PROBE, CONFORMANCE_PROBE]), NOTE_MESSAGE])];
}
/** The full-shape render envelope with a variant's artifacts on the three carriers and in one info diagnostic's metadata. */
function envelopeOf(variant: Variant, root: string): JsonObject {
  const envelope = fullShapeRf(root);
  const receipt = receiptOf(variant);
  if (receipt === undefined) return envelope;
  return {
    ...envelope,
    result: {
      ...objectOf(envelope.result, "fullShapeRf result"),
      [CARRIERS.receipt]: receipt, [CARRIERS.acceptance]: [ACCEPTANCE_PROBE], [CARRIERS.conformance]: CONFORMANCE_PROBE,
    },
    diagnostics: [{ code: NOTE_CODE, severity: "info", message: NOTE_MESSAGE, hint: null, source: null, metadata: { [CARRIERS.receipt]: receipt } }],
  };
}

/** A stand-in `rf` in fresh scratch: it appends one JSON argv line per spawn to `log`, prints `envelope` and exits 0. */
function standInRf(envelope: Json): { dir: string; log: string } {
  const dir = realpathSync(makeScratch("rf-evaluator-standin-"));
  const log = join(dir, "spawns.jsonl");
  const script = join(dir, "rf");
  writeFileSync(script, [
    `#!${process.execPath}`,
    `require("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
    `process.stdout.write(${JSON.stringify(JSON.stringify(envelope))});`,
    "",
  ].join("\n"));
  chmodSync(script, 0o700);
  return { dir, log };
}
function spawnCount(log: string): number {
  return textOf(log).split("\n").filter(Boolean).length;
}

/** A tool reply's parts beside its first text block: its content block count, its top-level keys and the keys holding a value. */
type ReplyShape = { blocks: number; keys: string[]; defined: string[] };
function shapeOf(reply: object): ReplyShape {
  const content: unknown = Reflect.get(reply, "content");
  const keys = Object.keys(reply).sort();
  return { blocks: Array.isArray(content) ? content.length : -1, keys, defined: keys.filter(key => Reflect.get(reply, key) !== undefined) };
}

interface ToolReply {
  readonly isError: boolean;
  readonly payload: Json;
  readonly shape: ReplyShape;
}

/** capability_invoke through the real curated MCP server and a real MCP client, exposing the native rf capability only. */
async function curatedReply(root: string): Promise<ToolReply> {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, root);
  const server = createCuratedTools({
    registry, allowedCapabilities: [PREVIEW_ID], grants: [`discover:${PREVIEW_ID}`, `invoke:${PREVIEW_ID}`, "reactivefiber:render"],
    principal: { id: "host-user", role: "reviewer" }, workspace: root, invocationId: "rf-evaluator-agent-1", signal: new AbortController().signal,
  });
  const client = new Client({ name: "rf-evaluator-census-client", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  try {
    const result = await client.callTool({ name: "capability_invoke", arguments: { capabilityId: PREVIEW_ID, capabilityVersion: "1.0.0", input: RENDER_INPUT } });
    const content: unknown = result.content;
    const first: unknown = Array.isArray(content) ? content[0] : undefined;
    if (!isObject(first) || first.type !== "text" || typeof first.text !== "string") throw new Error("expected one text content block");
    return { isError: result.isError === true, payload: JSON.parse(first.text) as Json, shape: shapeOf(result) };
  } finally {
    await client.close();
    await server.instance.close();
  }
}

const PRINCIPAL = "local-operator:tester";
const SESSION = "session-rf-evaluator";
const TASK_ID = "wf_rfevaluator01";
const NOW = "2026-10-22T00:00:00Z";
/** CONSTRUCTED: a journaled rf non-read effect, so a reconcile evidence read of the rf producer is admitted (reconcile.ts:67). */
const JOURNALED_EFFECT = "reactivefiber.fixture.effect";

/** One workflow_reconcile evidence action over the native rf read, from a journal holding one non-read rf node row. */
async function reconcileReply(root: string): Promise<{ body: Json; shape: ReplyShape }> {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, root);
  const journalPath = join(root, "journal.jsonl");
  appendJournal(journalPath, { index: 0, key: "rf-effect-0", ok: true, kind: "node", capabilityId: JOURNALED_EFFECT, effectClass: "write" });
  const task = createWorkflowTask({ id: TASK_ID, script: "return 0;", journalPath });
  task.observationScope = { sessionId: SESSION, workspace: root, principal: PRINCIPAL };
  const tool = createWorkflowReconcileTool({
    tasks: new Map([[TASK_ID, task]]), registryFor: () => registry, grants: () => ["workbench:observe", "reactivefiber:render"],
    observerScope: () => ({ workspace: root, principal: PRINCIPAL }), localPrincipal: () => PRINCIPAL, sessionIdOf: () => SESSION, now: () => NOW,
  });
  const ctx = { cwd: root } as unknown as ExtensionToolContext;
  const result = await tool.execute("rf-evaluator-reconcile", { taskId: TASK_ID, action: "evidence", position: 0, evidence: { capabilityId: PREVIEW_ID, input: RENDER_INPUT } }, undefined, undefined, ctx);
  const first = result.content[0];
  if (first?.type !== "text") throw new Error("expected one text content block");
  return { body: JSON.parse(first.text) as Json, shape: shapeOf(result) };
}

const SCRIPT = `export const meta = { name: "rf-evaluator-context", description: "wb-a9l2.6 node() bridge" };\nreturn await node(${JSON.stringify(PREVIEW_ID)}, ${JSON.stringify(RENDER_INPUT)});`;

/** A workflow script's node() call through the Claude host's callNode bridge over the native rf registration. */
async function nodeOutcome(root: string): Promise<{ status: string; value: Json }> {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, root);
  const host = createClaudeWorkflowHost({ cwd: root, capabilities: registry, grants: ["reactivefiber:render"], principal: { id: "host-principal", role: "host-role" }, invocationId: "rf-evaluator-invocation" });
  const result = await runWorkflow({ script: SCRIPT, host });
  return { status: result.status, value: clone((result.value ?? null) as Json) };
}

interface Readings {
  readonly root: string;
  readonly envelope: JsonObject;
  readonly curated: ToolReply;
  readonly reconcile: Json;
  readonly reconcileShape: ReplyShape;
  readonly node: { status: string; value: Json };
  readonly spawns: number;
}

const originalPath = process.env.PATH;
const readingsMemo = new Map<Variant, Promise<Readings>>();

/** The three composers' answers for one variant, measured once: one fresh root and one stand-in rf, the only PATH entry. */
function readings(variant: Variant): Promise<Readings> {
  let pending = readingsMemo.get(variant);
  if (pending === undefined) {
    pending = (async () => {
      const root = realpathSync(makeScratch("rf-evaluator-root-"));
      const envelope = envelopeOf(variant, root);
      const standIn = standInRf(envelope);
      process.env.PATH = standIn.dir;
      try {
        const curated = await curatedReply(root);
        const reconciled = await reconcileReply(root);
        const node = await nodeOutcome(root);
        return { root, envelope, curated, reconcile: reconciled.body, reconcileShape: reconciled.shape, node, spawns: spawnCount(standIn.log) };
      } finally {
        process.env.PATH = originalPath;
        removeScratch(root, standIn.dir);
      }
    })();
    readingsMemo.set(variant, pending);
  }
  return pending;
}

const SOURCE_MARK = "<rf-envelope>";
const ROOT_MARK = "<root>";
const IDENTITY_MARK = "<result-identity>";

/** Pi's own part of a capability_invoke reply: everything but the quoted envelope, the root normalized. */
function curatedFrame(found: Readings): Json {
  const payload = objectOf(found.curated.payload, "capability_invoke payload");
  const value = objectOf(payload.value, "capability_invoke value");
  return replacing({ isError: found.curated.isError, ...payload, value: { ...value, source: SOURCE_MARK } }, found.root, ROOT_MARK);
}
/** Pi's own part of a workflow_reconcile evidence reply: everything but the quoted envelope and the two digests of the result. */
function reconcileFrame(found: Readings): Json {
  const body = objectOf(found.reconcile, "workflow_reconcile reply");
  const receipt = objectOf(body.receipt, "workflow_reconcile receipt");
  const snapshot = objectOf(body.snapshot, "workflow_reconcile snapshot");
  return replacing({ ...body, receipt: { ...receipt, receiptId: IDENTITY_MARK, resultDigest: IDENTITY_MARK }, snapshot: { ...snapshot, source: SOURCE_MARK } }, found.root, ROOT_MARK);
}
/** Frame strings that carry a planted string; workflow_reconcile's fixed guidance lines are host text, pinned separately. */
function leaks(frame: Json, planted: readonly string[]): string[] {
  const shown = stringLeaves(isObject(frame) ? { ...frame, guidance: [] } : frame);
  return shown.filter(text => planted.some(item => text.includes(item)));
}
function lexiconHits(frame: Json): string[] {
  return stringLeaves(isObject(frame) ? { ...frame, guidance: [] } : frame).filter(text => LABEL_LEXICON.test(text));
}
/** The carried receipt read back out of a reply's quoted envelope. */
function carriedReceipt(source: Json | undefined, field: string): JsonObject {
  return objectOf(objectOf(objectOf(source, `${field} source`).result, `${field} result`)[CARRIERS.receipt], `${field} carried receipt`);
}
function gradeWords(receipt: JsonObject): string[] {
  return listOf(receipt.checks, "checks").map(check => {
    const row = objectOf(check, "check");
    return `${String(row.id)}:${String(row.status)}`;
  });
}

const OBSERVER_ROOT = "/fixture/rf-evaluator-root";
const OBSERVER_SCOPE: ObservationScope = { workspace: OBSERVER_ROOT, principal: PRINCIPAL };
const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: OBSERVER_SCOPE, seam: "rf-cli", capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z", invocationId: TASK_ID,
};
function observerReading(variant: Variant): Json {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: OBSERVER_ROOT, source: envelopeOf(variant, OBSERVER_ROOT) };
}
/** The observer's topology and the workflow_observe reply over a fresh projection it alone refreshed. */
function observed(variant: Variant): { topology: Json; reply: Json } {
  const topology = reactivefiberTopology(observerReading(variant), OBSERVER_CONTEXT);
  const projection = new ObservationProjection();
  for (const snapshot of topology.snapshots) expect(projection.refresh(snapshot)).toBe("applied");
  const reply = observeInvocation(projection, { scope: OBSERVER_SCOPE, invocationId: TASK_ID });
  return { topology: clone(topology as unknown as Json), reply: clone(reply as unknown as Json) };
}

interface NativeDescriptors {
  readonly ids: string[];
  readonly modes: string[][];
  readonly texts: string[];
  readonly permissions: string[][];
  readonly contracts: string[];
}
let nativeMemo: Promise<NativeDescriptors> | undefined;
/** The native registration's descriptors, loaded once: the ids, each one's modes, JSON text, permissions and contractSource. */
function nativeDescriptors(): Promise<NativeDescriptors> {
  nativeMemo ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, REPO);
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    return {
      ids: descriptors.map(item => item.id), modes: descriptors.map(item => [...item.supportedModes]), texts: descriptors.map(item => JSON.stringify(item)),
      permissions: descriptors.map(item => [...item.permissions]), contracts: descriptors.map(item => item.contractSource ?? ""),
    };
  });
  return nativeMemo;
}

/** An expression without the wrappers that keep its value: parentheses, as, satisfies, a type assertion and a non-null assertion. */
function unwrapped(node: ts.Expression): ts.Expression {
  let inner = node;
  while (ts.isParenthesizedExpression(inner) || ts.isAsExpression(inner) || ts.isSatisfiesExpression(inner) || ts.isTypeAssertionExpression(inner) || ts.isNonNullExpression(inner)) {
    inner = inner.expression;
  }
  return inner;
}
/** Whether an expression is the literal "invoke", read through the wrappers that keep its value. */
function isInvokeLiteral(node: ts.Expression): boolean {
  const inner = unwrapped(node);
  return ts.isStringLiteralLike(inner) && inner.text === "invoke";
}
/** A property key's text when it is written as a name, a string literal or a computed string literal, wrapped or not (else undefined). */
function keyText(name: ts.PropertyName | ts.BindingName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name)) return name.text;
  if (!ts.isComputedPropertyName(name)) return undefined;
  const key = unwrapped(name.expression);
  return ts.isStringLiteralLike(key) ? key.text : undefined;
}
/**
 * Whether an object or array literal is a destructuring assignment target: the left of "=", a for-of or for-in head, or nested in
 * one through an object property value, an array element or an array rest element.
 */
function assignmentTarget(node: ts.Node): boolean {
  const parent = node.parent;
  if (ts.isArrayLiteralExpression(parent) || ts.isSpreadElement(parent)) return assignmentTarget(parent);
  if (ts.isPropertyAssignment(parent) && parent.initializer === node) return assignmentTarget(parent.parent);
  if (ts.isBinaryExpression(parent)) return parent.left === node && parent.operatorToken.kind === ts.SyntaxKind.EqualsToken;
  return (ts.isForOfStatement(parent) || ts.isForInStatement(parent)) && parent.initializer === node;
}
/**
 * Every reference to an `invoke` member in a TS text, called or not: a property access, a string-literal element access, a
 * destructuring key (a binding element of an object binding pattern, or a property of an object assignment pattern) or a call
 * handing the literal "invoke" as its second or later argument (a reflective read; conservative: any such call reads as one), each
 * literal read through the wrappers that keep its value. A reference that is called is tagged by the call's literal first
 * argument (else "computed"); one that is not called (a bind, an alias, a destructured binding) is tagged "reference".
 */
function invokeReferences(label: string, text: string): string[] {
  const source = ts.createSourceFile(label, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    const member =
      (ts.isPropertyAccessExpression(node) && node.name.text === "invoke") || (ts.isElementAccessExpression(node) && isInvokeLiteral(node.argumentExpression));
    const destructured =
      (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent) && keyText(node.propertyName ?? node.name) === "invoke") ||
      ((ts.isShorthandPropertyAssignment(node) || ts.isPropertyAssignment(node)) && keyText(node.name) === "invoke" && assignmentTarget(node.parent));
    const reflective = ts.isCallExpression(node) && node.arguments.slice(1).some(argument => isInvokeLiteral(argument));
    if (member || destructured || reflective) {
      const call = ts.isCallExpression(node.parent) && node.parent.expression === node ? node.parent : undefined;
      const first = call?.arguments[0];
      const tag = call === undefined ? "reference" : first !== undefined && ts.isStringLiteralLike(first) ? first.text : "computed";
      sites.push(`${label}:${tag}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}
/** The invoke references of src files, repo-relative and sorted (row A1). */
function invokeSites(files: readonly string[]): string[] {
  return files.flatMap(file => invokeReferences(relative(REPO, file), textOf(file))).sort();
}
let listedMemo: string[] | undefined;
/** The src paths git lists (tracked, and untracked ones git does not ignore) that exist on disk, repo-relative and sorted. */
function listedSrc(): string[] {
  listedMemo ??= [
    ...new Set(
      execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: REPO, encoding: "utf8", env: { ...process.env, PATH: originalPath } }).split("\0"),
    ),
  ]
    .filter(path => path !== "" && existsSync(join(REPO, path)))
    .sort();
  return listedMemo;
}
/** Whether a walk read every src path git lists (`.ts` only when asked), so no directory can drop out of it unseen. */
function walkCoversGit(files: readonly string[], tsOnly: boolean): boolean {
  const walked = new Set(files.map(file => relative(REPO, file)));
  const listed = listedSrc().filter(path => !tsOnly || path.endsWith(".ts"));
  return listed.length > 0 && listed.every(path => walked.has(path));
}
/** A backquote, built from its code point: a C4 word end (WORD_END), and the template delimiter the controls spell. */
const TICK = String.fromCodePoint(0x60);
/**
 * Row C4's readings of a literal part, each with a control only it reads. RF_LEAD: its leading word is rf, optionally as rf.exe
 * or rf.cmd (the command-line form; conservative: an "rf ..." prose part reads the same). RF_QUOTED: that word inside one pair of
 * single or double quotes, in any case. RF_SEGMENT: a path whose final segment (after the last "/" or "\") is rf, rf.exe or
 * rf.cmd, anywhere in the part and in any case (a leading path; a path holding whitespace, quoted, escaped or not; one closing a
 * quote an earlier span opened; one after another word; one closing a command substitution or a parameter expansion). Each ends
 * at one of C4's word ends (WORD_END) and at no other character: whitespace, a quote (' or "), a backquote, a closing brace, a
 * shell operator (; & | ) < >) or the part's end (conservative, as for a quote and ")": a backquote or a closing brace reads as
 * an end wherever it stands, so a word the shell continues past one, such as ${RF_HOME:-/opt/rf}/bin/tool or /opt/bin/rf`date`,
 * reads as a site too). RF_TOKEN: a one-token part that is the bare name, in any case.
 */
const WORD_END = String.raw`(?=[\s'";&|)<>}${TICK}]|$)`;
const RF_LEAD = new RegExp(String.raw`^rf(?:\.(?:exe|cmd))?${WORD_END}`);
const RF_QUOTED = new RegExp(String.raw`^(['"])rf(?:\.(?:exe|cmd))?\1${WORD_END}`, "i");
const RF_SEGMENT = new RegExp(String.raw`[\\/]rf(?:\.(?:exe|cmd))?${WORD_END}`, "i");
const RF_TOKEN = /^rf(?:\.(?:exe|cmd))?$/i;
/** Whether a literal part's text names the rf binary by any row C4 reading. */
function namesRf(text: string): boolean {
  return RF_LEAD.test(text) || RF_QUOTED.test(text) || RF_SEGMENT.test(text) || RF_TOKEN.test(text);
}
/** A string literal, a no-substitution template, or a template's head, middle or tail span. */
type LiteralPart = ts.StringLiteral | ts.NoSubstitutionTemplateLiteral | ts.TemplateHead | ts.TemplateMiddle | ts.TemplateTail;
function literalPart(node: ts.Node): node is LiteralPart {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node);
}
/**
 * Every literal part of a TS text that names the rf binary, a template part read both cooked and raw (a String.raw template hands
 * its raw text on), tagged by the callee its literal is handed to (else its holder's kind).
 */
function rfLaunchSites(file: string, text: string): string[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    if (literalPart(node) && (namesRf(node.text) || (!ts.isStringLiteral(node) && node.rawText !== undefined && namesRf(node.rawText)))) {
      let holder: ts.Node = ts.isTemplateHead(node) ? node.parent : ts.isTemplateMiddle(node) || ts.isTemplateTail(node) ? node.parent.parent : node;
      while (ts.isParenthesizedExpression(holder.parent) || ts.isAsExpression(holder.parent)) holder = holder.parent;
      const parent = holder.parent;
      sites.push(`${file}:${ts.isCallExpression(parent) || ts.isNewExpression(parent) ? parent.expression.getText(source) : ts.SyntaxKind[parent.kind]}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}
/** The producer words naming ReactiveFiberCLI, read off a descriptor's id, a permission or its contractSource (row C2). */
const RF_WORDS: ReadonlySet<string> = new Set(["reactivefiber", "rf"]);
const leadWord = (text: string): string => (text.replace(/^@/, "").split(/[.:/@_-]/)[0] ?? "").toLowerCase();
/** The descriptor facts row C2 reads rf off. */
interface DescriptorFacts {
  readonly id: string;
  readonly permissions: readonly string[];
  readonly contract: string;
}
/** The descriptors that name rf by id namespace, by a permission namespace, and by contractSource (producer word or rf schema). */
function rfReadings(descriptors: readonly DescriptorFacts[]): { id: string[]; permission: string[]; contractSource: string[] } {
  return {
    id: descriptors.filter(item => RF_WORDS.has(leadWord(item.id))).map(item => item.id),
    permission: descriptors.filter(item => item.permissions.some(permission => RF_WORDS.has(leadWord(permission)))).map(item => item.id),
    contractSource: descriptors.filter(item => RF_WORDS.has(leadWord(item.contract)) || item.contract.includes(REACTIVE_FIBER_CLI_SCHEMA)).map(item => item.id),
  };
}
/** CONSTRUCTED descriptors, each naming rf one way only (the last names it no way), so every reading of rfReadings is exercised. */
const PLANTED_DESCRIPTORS: readonly DescriptorFacts[] = [
  { id: "rf.overlay.evaluate", permissions: ["workbench:observe"], contract: "" },
  { id: "overlay.evaluate", permissions: ["reactivefiber:render"], contract: "" },
  { id: "overlay.score", permissions: ["workbench:observe"], contract: "rf@0.1.784:graph.test --json" },
  { id: "overlay.check", permissions: [], contract: "cli:reactive-fiber.cli/v1 graph.test" },
  { id: "overlay.sdk", permissions: [], contract: "@reactivefiber/sdk@1.0.0:Rf.evaluate" },
  { id: "forge.gate.run", permissions: ["forge:inspect"], contract: "@forge/sdk@0.1.0:ServerConnection.request(gate.run)" },
];
/** The src modules other than the observer's own that name reactivefiberTopology (an import, a call or a re-export). */
function observerCallers(files: readonly string[]): string[] {
  return files
    .filter(file => relative(REPO, file) !== OBSERVER_MODULE)
    .filter(file => {
      let named = false;
      const visit = (node: ts.Node): void => {
        if (ts.isIdentifier(node) && node.text === "reactivefiberTopology") named = true;
        ts.forEachChild(node, visit);
      };
      visit(ts.createSourceFile(file, textOf(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS));
      return named;
    })
    .map(file => relative(REPO, file));
}

interface Spelling {
  readonly pin: string;
  readonly text: string;
  readonly hit: boolean;
}
/** A backslash, built from its code point so no escape sequence is typed here (M12-M18 spell source escapes). */
const BACKSLASH = String.fromCodePoint(0x5c);
/** A line feed, built from its code point (M16 spells a line continuation inside a word). */
const LINE_FEED = String.fromCodePoint(0x0a);
/** M1-M20 must hit; Q1 and Q2 are R-INTERRUPTED, Q3 is R-COMPOSED (a runtime composition's source text), Q4 is R-SPLIT. */
const SPELLINGS: readonly Spelling[] = [
  { pin: "M1", text: "validation_digest", hit: true },
  { pin: "M2", text: "validationDigest", hit: true },
  { pin: "M3", text: "ValidationDigest", hit: true },
  { pin: "M4", text: "validation-digest", hit: true },
  { pin: "M5", text: "a validation digest field", hit: true },
  { pin: "M6", text: "VALIDATION_DIGEST", hit: true },
  { pin: "M7", text: 'command === "graph.test"', hit: true },
  { pin: "M8", text: "isGraphTest", hit: true },
  { pin: "M9", text: 'case "effects_authorized":', hit: true },
  { pin: "M10", text: 'const grant = "reactivefiber:graph:test";', hit: true },
  { pin: "M11", text: "schemas/graph/test", hit: true },
  { pin: "M12", text: `"validation${BACKSLASH}u005fdigest"`, hit: true },
  { pin: "M13", text: `"validation${BACKSLASH}u{5f}digest"`, hit: true },
  { pin: "M14", text: `"budget${BACKSLASH}x5fgate"`, hit: true },
  { pin: "M15", text: `"validation${BACKSLASH}_digest"`, hit: true },
  { pin: "M16", text: `"valida${BACKSLASH}${LINE_FEED}tion_digest"`, hit: true },
  { pin: "M17", text: `"validation${BACKSLASH}tdigest"`, hit: true },
  { pin: "M18", text: `"validation${BACKSLASH}137digest"`, hit: true },
  { pin: "M19", text: `"validation${BACKSLASH}u{000005f}digest"`, hit: true },
  { pin: "M20", text: `"validation${BACKSLASH}u{0000000000000000000000000000005f}digest"`, hit: true },
  { pin: "Q1", text: `validation${String.fromCodePoint(0x200b)}_digest`, hit: false },
  { pin: "Q2", text: `v${String.fromCodePoint(0x0430)}lidation_digest`, hit: false },
  { pin: "Q3", text: '["validation", "digest"].join("_")', hit: false },
  { pin: "Q4", text: "export const sub_processes_spawned = 0;", hit: false },
];

/** Row S: a pinned quiet row for each named residual of A1's invoke scan and C4's launch scan; each probe stays unread, by design. */
interface ScanResidual {
  readonly pin: string;
  readonly residual: string;
  readonly scan: "invoke" | "launch";
  readonly text: string;
}
const SCAN_RESIDUALS: readonly ScanResidual[] = [
  { pin: "Q5", residual: "R-KEYED", scan: "invoke", text: 'const key = "invoke"; registry[key]("probe.id", input); Reflect.get(registry, key);' },
  { pin: "Q6", residual: "R-COMPOSED", scan: "invoke", text: 'registry["inv" + "oke"]("probe.id", input);' },
  { pin: "Q7", residual: "R-EMBEDDED", scan: "launch", text: 'execSync("cd /w && rf context render --json"); execSync("npx rf context render --json");' },
  { pin: "Q8", residual: "R-CASE", scan: "launch", text: 'execSync("RF context render --json");' },
  { pin: "Q9", residual: "R-COMPOSED", scan: "launch", text: 'spawn("r" + "f", argv);' },
  {
    pin: "Q10",
    residual: "R-KEYED",
    scan: "invoke",
    text: 'registry[(0, "invoke")]("probe.id", input); registry[ready ? "invoke" : "inspect"]("probe.id", input); Reflect.get(registry, String("invoke"));',
  },
  {
    pin: "Q11",
    residual: "R-SHELL",
    scan: "launch",
    text: `execSync("(rf context render --json)"); execSync("r'f' context render --json"); execSync('"r"f context render --json'); execSync("r${BACKSLASH}${BACKSLASH}f context render --json"); execSync("${"$"}'rf' context render --json"); execSync("${TICK}rf${TICK} --version"); execSync("${"$"}{RF_BIN:-rf} context render --json");`,
  },
];

/**
 * Row A1's controls. INVOKE_CONTROLS holds one probe per reference form, each read as one reference (the expected tags are in
 * the case); INVOKE_QUIET the landed non-reference shapes; INVOKE_BOUNDARY_QUIET the shapes beside the wb-sfo7 readings that stay
 * non-references (a wrapped literal off an access, a spread outside a pattern, the literal as a first argument).
 */
const INVOKE_CONTROLS: readonly string[] = [
  'registry.invoke("probe.id", input, context);', "const call = registry.invoke.bind(registry);",
  'registry["invoke"]("probe.id", input, context);', "registry.invoke(id, input);",
  'const { invoke } = registry; invoke("probe.id", input);', "const { invoke: run } = registry;", 'const { "invoke": run } = registry;',
  'const { ["invoke"]: run } = registry;', "({ invoke } = registry);", "({ invoke: run } = registry);", "[{ invoke }] = registries;",
  "({ inner: { invoke } } = holder);", 'for ({ invoke } of registries) invoke("probe.id", input);',
  'Reflect.get(registry, "invoke").call(registry, "probe.id", input);', 'Object.getOwnPropertyDescriptor(Object.getPrototypeOf(registry), "invoke");',
  'registry[("invoke")]("probe.id", input);', 'registry["invoke" as const]("probe.id", input);', 'registry["invoke" satisfies string]("probe.id", input);',
  'registry[<const>"invoke"]("probe.id", input);', 'registry["invoke"!]("probe.id", input);', 'Reflect.get(registry, ("invoke"));',
  'Object.getOwnPropertyDescriptor(registry, "invoke" as const);', 'const { [("invoke")]: run } = registry;', '({ ["invoke" as const]: run } = registry);',
  "[...[{ invoke }]] = registries;", "[...{ invoke }] = registries;",
];
const INVOKE_QUIET =
  'this.dispatch("invoke", id, input, context); capabilityInputPath("invoke", id); const provider = { invoke: run, inspect }; registry.register({ descriptor, async invoke(value, context) { return value; } });';
const INVOKE_BOUNDARY_QUIET = 'const mode = ("invoke" as const); run(...[{ invoke }]); const copy = [...[{ invoke }]]; registry.dispatch(("invoke"), id);';
/**
 * Row C4's controls. LAUNCH_CONTROLS and LAUNCH_QUIET are the landed bare-name controls; PATH_CONTROLS holds one probe per path,
 * quoting, word-end, case and raw-text reading, each read as one site (the eight before the last are the wb-0hkv backquote and
 * closing-brace word ends: the gate's two path shapes, RF_LEAD and RF_QUOTED with each closer, and the two conservative reads;
 * the last, one call per remaining shell operator, as four); PATH_QUIET the landed path shapes that are no site;
 * LAUNCH_BOUNDARY_QUIET the shapes beside the wb-sfo7 and wb-0hkv readings that stay no site, each with no word end after rf
 * (another final segment or extension, an rf directory, a quoted other word, a word that continues past rf, a shell function
 * named rf; the last four inside backquotes or braces).
 */
const LAUNCH_CONTROLS: readonly string[] = [
  'spawn("rf", ["--workspace", "/w", "graph", "test", "--json"]);',
  'execSync("rf graph test --candidate c --json");',
  `run(${TICK}rf graph test --candidate ${"$"}{candidate}${TICK});`,
  'const binary = ("rf" as string);',
];
const LAUNCH_QUIET = 'spawn("rf-graph", []); const id = "rfo_planted"; const word = "rfc"; const flag = " rf";';
const PATH_CONTROLS: readonly string[] = [
  'spawn("/usr/local/bin/rf", ["context", "render"]);', `spawn(${TICK}${"$"}{dir}/rf${TICK}, argv);`,
  `execSync(${TICK}${"$"}{dir}/rf graph test --candidate ${"$"}{candidate}${TICK});`, `execFile("C:${BACKSLASH}${BACKSLASH}tools${BACKSLASH}${BACKSLASH}rf", argv);`,
  'spawn("rf.exe", argv);', 'spawn("rf.cmd", argv);', 'spawn("/opt/bin/RF", argv);',
  `spawn("C:${BACKSLASH}${BACKSLASH}Program Files${BACKSLASH}${BACKSLASH}Tools${BACKSLASH}${BACKSLASH}rf.exe", argv);`, 'spawn("/Volumes/Tool Kit/bin/rf", argv);',
  `spawn("C:${BACKSLASH}${BACKSLASH}PROGRAM FILES${BACKSLASH}${BACKSLASH}TOOLS${BACKSLASH}${BACKSLASH}RF.EXE", argv);`,
  `execSync("'/opt/bin/rf' context render --json");`, `execSync('"/opt/bin/rf" context render --json');`,
  `execSync(${TICK}"${"$"}{dir}/rf" context render --json${TICK});`, `execSync('"/Volumes/Tool Kit/bin/rf" context render --json');`,
  `execSync("'rf' context render --json");`, `execSync("'RF' context render --json");`,
  `execSync("/Volumes/Tool${BACKSLASH}${BACKSLASH} Kit/bin/rf context render --json");`, 'execSync("cd /w && /opt/bin/rf context render --json");',
  'execSync("rf&&echo done");', 'execSync("/opt/bin/rf;echo done");', `execSync(${TICK}'${"$"}{prefix}rf' context render${TICK});`,
  `spawn(String.raw${TICK}C:${BACKSLASH}Program Files${BACKSLASH}Tools${BACKSLASH}rf.exe${TICK}, argv);`,
  'spawn("Rf.exe", argv);', 'execSync("rf.cmd context render --json");', `execSync("'rf.exe' context render --json");`,
  `execSync("${TICK}/opt/bin/rf${TICK}");`, `execSync("${"$"}{RF_BIN:-/opt/bin/rf} context render --json");`,
  `execSync(${TICK}${BACKSLASH}${TICK}${"$"}{prefix}rf${BACKSLASH}${TICK} --version${TICK});`, `execSync(${TICK}${BACKSLASH}${"$"}{RF_BIN:-${"$"}{prefix}rf} context render${TICK});`,
  `execSync(${TICK}${BACKSLASH}${TICK}${"$"}{prefix}'rf'${BACKSLASH}${TICK} --version${TICK});`, `execSync(${TICK}${BACKSLASH}${"$"}{RF_BIN:-${"$"}{prefix}'rf'} context render${TICK});`,
  `execSync("${"$"}{RF_HOME:-/opt/rf}/bin/tool --json");`, `execSync("/opt/bin/rf${TICK}date${TICK} --json");`,
  'execSync("rf|jq .result"); execSync("rf<request.json"); execSync("/opt/bin/rf>out.json"); execSync("(cd /w && /opt/bin/rf)");',
];
const PATH_QUIET = 'spawn("/usr/local/bin/rf-graph", argv); spawn("./surf", argv); const lib = "/opt/rf/lib"; const message = "RF preview cancelled.";';
const LAUNCH_BOUNDARY_QUIET = `execSync("'rfc' context render"); spawn("/opt/bin/rf.bat", argv); const doc = "see /docs/rfc"; const path = "C:${BACKSLASH}${BACKSLASH}Program Files${BACKSLASH}${BACKSLASH}rf${BACKSLASH}${BACKSLASH}lib"; execSync("'/opt/rf/bin/tool' --json"); const note = "rf-graph|jq"; execSync("'rf'x context render"); execSync("rf() { :; }"); execSync("${TICK}/opt/bin/rfc${TICK} --json"); execSync("${"$"}{RF_BIN:-/opt/bin/rf.bat} --json"); execSync("${TICK}/opt/rf/bin/tool${TICK} --json"); const home = "${"$"}{RF_HOME:-/opt/rf/lib}";`;

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    const srcFloorMet = files.length >= 100;
    const walkCovers = walkCoversGit(files, true);
    const narrowedWalkCaught = !walkCoversGit(files.slice(1), true);
    const sites = invokeSites(files);
    const controls = INVOKE_CONTROLS.map(text => invokeReferences("probe.ts", text));
    const quiet = invokeReferences("probe.ts", INVOKE_QUIET);
    const boundaryQuiet = invokeReferences("probe.ts", INVOKE_BOUNDARY_QUIET);
    const unclassified = sites.map(site => site.slice(0, site.lastIndexOf(":"))).filter(file => SITE_CLASSES[file] === undefined);
    const callers = observerCallers(files);
    const observerDefined = textOf(join(REPO, OBSERVER_MODULE)).includes("export function reactivefiberTopology(");
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(walkCovers, "the A1 walk must read every src module git lists").toBe(true);
    expect(narrowedWalkCaught, "a walk missing one listed module must read as unequal").toBe(true);
    expect(controls).toEqual([
      ["probe.ts:probe.id"], ["probe.ts:reference"], ["probe.ts:probe.id"], ["probe.ts:computed"],
      ...Array.from({ length: 11 }, () => ["probe.ts:reference"]),
      ...Array.from({ length: 5 }, () => ["probe.ts:probe.id"]),
      ...Array.from({ length: 6 }, () => ["probe.ts:reference"]),
    ]);
    expect(quiet, "a capability-mode argument, a provider's own invoke and a method definition are not references").toEqual([]);
    expect(boundaryQuiet, "a wrapped literal off an access, a spread outside a pattern and a first-argument literal are not references").toEqual([]);
    expect(unclassified, "a new registry invoke site needs a class and, when it reaches an agent, a behavioral pin here").toEqual([]);
    expect(callers, "a src caller of the rf observer makes workflow_observe an rf composer: re-measure row A").toEqual([]);
    expect(observerDefined).toBe(true);
    const classes = Object.fromEntries((["agent", "script", "fixed", "registry"] as const).map(name => [name, Object.keys(SITE_CLASSES).filter(file => SITE_CLASSES[file] === name).sort()]));
    return {
      srcFloorMet, walkCoversGit: walkCovers, narrowedWalkCaught, sites, controls, quiet, classes, observerCallers: callers, observerDefined,
      boundaryQuiet, controlDigests: INVOKE_CONTROLS.map(digestOf), quietDigest: digestOf(INVOKE_QUIET), boundaryQuietDigest: digestOf(INVOKE_BOUNDARY_QUIET),
    };
  },
  A2: async () => {
    const twin = await readings("absent");
    const twinFrame = curatedFrame(twin);
    const verbatim: boolean[] = [];
    const frameLeaks: string[] = [];
    for (const variant of PLANTED) {
      const found = await readings(variant);
      const value = objectOf(objectOf(found.curated.payload, "payload").value, "value");
      verbatim.push(JSON.stringify(value.source) === JSON.stringify(found.envelope));
      frameLeaks.push(...leaks(curatedFrame(found), plantedStrings(variant)));
      expect(curatedFrame(found)).toStrictEqual(twinFrame);
    }
    const control = leaks({ note: `see ${String(stringLeaves(SHADOW_RECEIPT)[0])}` }, plantedStrings("printed"));
    expect(verbatim).toEqual([true, true, true]);
    expect(frameLeaks).toEqual([]);
    expect(control).toHaveLength(1);
    const twinValue = objectOf(objectOf(twin.curated.payload, "payload").value, "value");
    return {
      frame: replacing(twinFrame, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, "<contract>"), contract: String(twinValue.contract),
      sourceSchema: String(objectOf(twinValue.source, "source").schema), verbatim, frameLeaks, controlCaught: control.length === 1, spawns: twin.spawns,
    };
  },
  A3: async () => {
    const twin = await readings("absent");
    const twinFrame = reconcileFrame(twin);
    const verbatim: boolean[] = [];
    const frameLeaks: string[] = [];
    for (const variant of PLANTED) {
      const found = await readings(variant);
      const snapshot = objectOf(objectOf(found.reconcile, "reply").snapshot, "snapshot");
      verbatim.push(JSON.stringify(snapshot.source) === JSON.stringify(found.envelope));
      frameLeaks.push(...leaks(reconcileFrame(found), plantedStrings(variant)));
      expect(reconcileFrame(found)).toStrictEqual(twinFrame);
    }
    const receipt = objectOf(objectOf(twin.reconcile, "reply").receipt, "receipt");
    const nativeRef = objectOf(receipt.nativeRef, "receipt nativeRef");
    expect(verbatim).toEqual([true, true, true]);
    expect(frameLeaks).toEqual([]);
    expect(Object.hasOwn(receipt, "domainStatus"), "an rf receipt states no domain status").toBe(false);
    return {
      frame: twinFrame, producer: String(receipt.producer), capabilityId: String(receipt.capabilityId), nativeRefProvider: String(nativeRef.provider),
      outcome: String(receipt.outcome), domainStatus: Object.hasOwn(receipt, "domainStatus"), receiptKeys: Object.keys(receipt),
      replyKeys: Object.keys(objectOf(twin.reconcile, "reply")), verbatim, frameLeaks,
    };
  },
  A4: async () => {
    const verbatim: boolean[] = [];
    const statuses: string[] = [];
    for (const variant of VARIANTS) {
      const found = await readings(variant);
      statuses.push(found.node.status);
      verbatim.push(JSON.stringify(found.node.value) === JSON.stringify({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: found.root, source: found.envelope }));
    }
    expect(statuses).toEqual(["completed", "completed", "completed", "completed"]);
    expect(verbatim).toEqual([true, true, true, true]);
    const value = objectOf((await readings("printed")).node.value, "node value");
    return { statuses, verbatim, valueKeys: Object.keys(value) };
  },
  A5: async () => {
    const twin = observed("absent");
    const surfaced: string[] = [];
    let invariant = 0;
    for (const variant of PLANTED) {
      const found = observed(variant);
      expect(found).toStrictEqual(twin);
      if (JSON.stringify(found) === JSON.stringify(twin)) invariant += 1;
      surfaced.push(...stringLeaves(found).filter(text => plantedStrings(variant).some(item => text.includes(item))));
    }
    const snapshot = objectOf(listOf(objectOf(twin.topology, "topology").snapshots, "snapshots")[0], "snapshot");
    const node = objectOf(snapshot.node, "snapshot node");
    const strings = stringLeaves(twin).length;
    expect(surfaced).toEqual([]);
    expect(strings).toBeGreaterThanOrEqual(10);
    return { invariant, surfaced, tone: String(node.statusTone), coverage: String(snapshot.coverage), stringsRead: strings >= 10 };
  },
  A6: async () => {
    const curated: ReplyShape[] = [];
    const reconcile: ReplyShape[] = [];
    for (const variant of VARIANTS) {
      const found = await readings(variant);
      curated.push(found.curated.shape);
      reconcile.push(found.reconcileShape);
    }
    const control = shapeOf({ content: [{ type: "text", text: "reading" }, { type: "text", text: "rf shadow test: PASS" }], structuredContent: { label: "PASS" }, details: undefined });
    expect(curated, "capability_invoke answers with its one text block and no other key").toStrictEqual(VARIANTS.map(() => ({ blocks: 1, keys: ["content"], defined: ["content"] })));
    expect(reconcile, "workflow_reconcile answers with its one text block and undefined details").toStrictEqual(VARIANTS.map(() => ({ blocks: 1, keys: ["content", "details"], defined: ["content"] })));
    expect(control).toStrictEqual({ blocks: 2, keys: ["content", "details", "structuredContent"], defined: ["content", "structuredContent"] });
    return { curated, reconcile, control };
  },
  B1: async () => {
    const digest = sha256(JSON.stringify(SHADOW_RECEIPT));
    const checks = listOf(SHADOW_RECEIPT.checks, "checks").map(check => objectOf(check, "check"));
    const statuses = [...new Set(checks.map(check => String(check.status)))].sort();
    const ids = checks.map(check => String(check.id));
    const diffOf = (variant: Variant): string[] => {
      const receipt = receiptOf(variant);
      if (receipt === undefined) return [];
      const changed: string[] = [];
      if (receipt.valid !== SHADOW_RECEIPT.valid) changed.push(`valid: ${String(SHADOW_RECEIPT.valid)} -> ${String(receipt.valid)}`);
      gradeWords(receipt).forEach((word, index) => {
        const printed = gradeWords(SHADOW_RECEIPT)[index];
        if (word !== printed) changed.push(`checks[${index}]: ${String(printed)} -> ${word}`);
      });
      return changed;
    };
    expect(digest).toBe(ROSTER.receiptSha256);
    expect([...ids].sort()).toEqual([...CHECK_IDS].sort());
    expect(statuses.every(status => status === "passed" || status === "skipped")).toBe(true);
    return {
      resultKeys: Object.keys(SHADOW_RECEIPT), checkIds: ids, statuses, valid: SHADOW_RECEIPT.valid ?? null,
      invariants: { published_head_unchanged: SHADOW_RECEIPT.published_head_unchanged ?? null, effects_authorized: SHADOW_RECEIPT.effects_authorized ?? null },
      regrades: { "check-failed": diffOf("check-failed"), "valid-false": diffOf("valid-false") },
    };
  },
  B2: async () => {
    const surfaced: Record<string, Json> = {};
    for (const variant of PLANTED) {
      const found = await readings(variant);
      const planted = receiptOf(variant);
      const fromCurated = carriedReceipt(objectOf(objectOf(found.curated.payload, "payload").value, "value").source, "capability_invoke");
      const fromReconcile = carriedReceipt(objectOf(objectOf(found.reconcile, "reply").snapshot, "snapshot").source, "workflow_reconcile");
      const fromNode = carriedReceipt(objectOf(found.node.value, "node value").source, "node()");
      expect(fromCurated).toStrictEqual(planted);
      expect(fromReconcile).toStrictEqual(planted);
      expect(fromNode).toStrictEqual(planted);
      surfaced[variant] = { grades: gradeWords(fromCurated), valid: fromCurated.valid ?? null, sameInAllThree: JSON.stringify([fromReconcile, fromNode]) === JSON.stringify([fromCurated, fromCurated]) };
    }
    return surfaced;
  },
  B3: async () => {
    const curated = new Set<string>();
    const reconcile = new Set<string>();
    const isError: boolean[] = [];
    const hits: string[] = [];
    const guidance: boolean[] = [];
    for (const variant of VARIANTS) {
      const found = await readings(variant);
      curated.add(JSON.stringify(curatedFrame(found)));
      reconcile.add(JSON.stringify(reconcileFrame(found)));
      isError.push(found.curated.isError);
      hits.push(...lexiconHits(curatedFrame(found)), ...lexiconHits(reconcileFrame(found)));
      guidance.push(JSON.stringify(objectOf(found.reconcile, "reply").guidance) === JSON.stringify(EVIDENCE_GUIDANCE));
    }
    const control = lexiconHits({ label: "rf shadow test: PASS" });
    expect(curated.size).toBe(1);
    expect(reconcile.size).toBe(1);
    expect(hits).toEqual([]);
    expect(control).toHaveLength(1);
    return { curatedFrames: curated.size, reconcileFrames: reconcile.size, isError, lexiconHits: hits, controlCaught: control.length === 1, guidanceFixed: guidance };
  },
  B4: async () => {
    const replyTo = async (envelope: JsonObject): Promise<{ curated: ToolReply; reconcile: Json; reconcileShape: ReplyShape; spawns: number }> => {
      const root = realpathSync(makeScratch("rf-evaluator-root-"));
      const standIn = standInRf(envelope);
      process.env.PATH = standIn.dir;
      try {
        const curated = await curatedReply(root);
        const reconciled = await reconcileReply(root);
        return { curated, reconcile: reconciled.body, reconcileShape: reconciled.shape, spawns: spawnCount(standIn.log) };
      } finally {
        process.env.PATH = originalPath;
        removeScratch(root, standIn.dir);
      }
    };
    const refused = await replyTo(SHADOW_ENVELOPE);
    const control = await replyTo({ ...SHADOW_ENVELOPE, command: "context.render" });
    const receiptStrings = stringLeaves(SHADOW_RECEIPT);
    const surfaced = [...stringLeaves(refused.curated.payload), ...stringLeaves(refused.reconcile)].filter(text => receiptStrings.some(item => text.includes(item)));
    const body = objectOf(refused.reconcile, "reply");
    const receipt = objectOf(body.receipt, "receipt");
    expect(refused.curated.isError).toBe(true);
    expect(surfaced).toEqual([]);
    expect(Object.hasOwn(body, "snapshot")).toBe(false);
    expect(refused.curated.shape).toStrictEqual({ blocks: 1, keys: ["content", "isError"], defined: ["content", "isError"] });
    expect(refused.reconcileShape).toStrictEqual({ blocks: 1, keys: ["content", "details"], defined: ["content"] });
    return {
      curated: refused.curated.payload, isError: refused.curated.isError, reconcileOutcome: String(receipt.outcome), reconcileSnapshot: Object.hasOwn(body, "snapshot"),
      surfaced, spawns: refused.spawns, controlDiagnostic: String(objectOf(control.curated.payload, "control payload").diagnostic),
      curatedShape: refused.curated.shape, reconcileShape: refused.reconcileShape,
    };
  },
  C1: async () => {
    const registry = new CapabilityRegistry();
    registerNativeReactiveFiberRender(registry, OBSERVER_ROOT);
    const store = createWorkbenchEvidenceStore({
      grants: () => [CLAUDE_TRANSCRIPT_GRANT, FURNACE_INSPECT_GRANT, FORGE_INSPECT_GRANT, "reactivefiber:render", "workbench:observe"],
      scope: () => OBSERVER_SCOPE, projection: new ObservationProjection(), cwd: () => OBSERVER_ROOT, registry: () => registry,
      claudeRead: async () => [], furnaceClient: () => ({ logs: { read: async () => { throw new Error("the furnace reader is never reached here"); } } }),
      now: () => new Date(NOW),
    });
    const snapshot = reactivefiberTopology(observerReading("printed"), OBSERVER_CONTEXT).snapshots[0];
    if (snapshot === undefined) throw new Error("the observer projected no snapshot");
    const refs = [...(snapshot.evidenceRefs ?? []), ...(snapshot.nativePayloadRef !== undefined ? [snapshot.nativePayloadRef] : [])];
    const entries: string[] = [];
    for (const ref of refs) {
      await store.request(OBSERVER_SCOPE, snapshot.source, ref);
      const entry = store.get(OBSERVER_SCOPE, snapshot.source, ref);
      entries.push(entry.state === "unavailable" ? entry.reason : entry.state);
    }
    const forgeNode: NativeRef = { provider: "forge", type: "operation", id: "op_fixture", scope: OBSERVER_ROOT };
    await store.request(OBSERVER_SCOPE, forgeNode, "forge-operation:op_fixture");
    const control = store.get(OBSERVER_SCOPE, forgeNode, "forge-operation:op_fixture");
    const rows = EVIDENCE_LOADER_ROWS.map(row => row.provider);
    expect(rows).not.toContain("reactivefiber");
    expect(refs.length).toBeGreaterThanOrEqual(3);
    expect([...new Set(entries)]).toEqual(["no-loader"]);
    expect(control).not.toStrictEqual({ state: "unavailable", reason: "no-loader" });
    return {
      loaderRows: rows, rfRefKinds: refs.map(ref => ref.slice(0, ref.indexOf(":"))), rfEntries: [...new Set(entries)],
      forgeControl: control.state === "unavailable" ? control.reason : control.state,
    };
  },
  C2: async () => {
    const { ids, modes, texts, permissions, contracts } = await nativeDescriptors();
    const rfBy = rfReadings(ids.map((id, index) => ({ id, permissions: permissions[index] ?? [], contract: contracts[index] ?? "" })));
    const rfIds = [...new Set([...rfBy.id, ...rfBy.permission, ...rfBy.contractSource])].sort();
    const rfModes = ids.flatMap((id, index) => (rfIds.includes(id) ? (modes[index] ?? []) : []));
    const hits = ids.filter((_, index) => spelled(texts[index] ?? ""));
    const descriptorFloorMet = ids.length >= 4;
    const controls = rfReadings(PLANTED_DESCRIPTORS);
    expect(descriptorFloorMet, `native descriptors: ${ids.join(", ")}`).toBe(true);
    expect(rfBy, "each rf reading of the native descriptors finds the preview alone").toStrictEqual({ id: [PREVIEW_ID], permission: [PREVIEW_ID], contractSource: [PREVIEW_ID] });
    expect(rfIds).toEqual([PREVIEW_ID]);
    expect(rfModes).toEqual(["invoke"]);
    expect(hits).toEqual([]);
    expect(controls, "each rf reading finds the planted descriptor that names rf its way").toStrictEqual({
      id: ["rf.overlay.evaluate"], permission: ["overlay.evaluate"], contractSource: ["overlay.score", "overlay.check", "overlay.sdk"],
    });
    return { nativeIds: [...ids].sort(), rfIds, rfBy, rfModes, descriptorFloorMet, hits, controls, controlDigests: PLANTED_DESCRIPTORS.map(item => digestOf(JSON.stringify(item))) };
  },
  C3: async () => {
    const base = join(REPO, "src");
    const files = filesBelow(base);
    const floorMet = files.length >= 100;
    const walkCovers = walkCoversGit(files, false);
    const hits = files.filter(file => spelled(textOf(file))).map(file => relative(REPO, file));
    const anchorFile = "workbench/providers/reactivefiber.ts";
    const anchorToken = "REACTIVEFIBER_RENDER_PREVIEW_CONTRACT";
    const anchorRead = files.includes(join(base, anchorFile)) && textOf(join(base, anchorFile)).includes(anchorToken);
    expect(floorMet, `src: ${files.length} files walked, floor 100`).toBe(true);
    expect(walkCovers, "the C3 walk must read every src file git lists").toBe(true);
    expect(anchorRead, `src: the anchor ${anchorFile} was not read with ${anchorToken}`).toBe(true);
    expect(hits, "src files spelling the rf shadow-test receipt vocabulary").toEqual([]);
    return { root: "src", floor: 100, anchorFile, anchorToken, floorMet, walkCoversGit: walkCovers, anchorRead, hits };
  },
  C4: async () => {
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    const walkCovers = walkCoversGit(files, true);
    const sites = files.flatMap(file => rfLaunchSites(relative(REPO, file), textOf(file))).sort();
    const controls = LAUNCH_CONTROLS.map(text => rfLaunchSites("probe.ts", text));
    const quiet = rfLaunchSites("probe.ts", LAUNCH_QUIET);
    const pathControls = PATH_CONTROLS.map(text => rfLaunchSites("probe.ts", text));
    const pathQuiet = rfLaunchSites("probe.ts", PATH_QUIET);
    const boundaryQuiet = rfLaunchSites("probe.ts", LAUNCH_BOUNDARY_QUIET);
    expect(walkCovers, "the C4 walk must read every src module git lists").toBe(true);
    expect(sites, "a second literal naming rf is a second path to rf (or an rf-led prose string): classify it and re-measure rows A-C").toEqual(["src/workbench/providers/reactivefiber.ts:spawn"]);
    expect(controls.map(found => found.length)).toEqual([1, 1, 1, 1]);
    expect(quiet).toEqual([]);
    expect(pathControls, "a path-qualified, template-span, extension, one-token case, whitespace-bearing, quoted, quote-, operator-, backquote- or brace-ended or raw spelling of the binary is a site").toEqual([
      ["probe.ts:spawn"], ["probe.ts:spawn"], ["probe.ts:execSync"], ["probe.ts:execFile"], ["probe.ts:spawn"], ["probe.ts:spawn"], ["probe.ts:spawn"],
      ["probe.ts:spawn"], ["probe.ts:spawn"], ["probe.ts:spawn"],
      ...Array.from({ length: 11 }, () => ["probe.ts:execSync"]),
      ["probe.ts:TaggedTemplateExpression"],
      ["probe.ts:spawn"], ["probe.ts:execSync"], ["probe.ts:execSync"],
      ...Array.from({ length: 8 }, () => ["probe.ts:execSync"]),
      ["probe.ts:execSync", "probe.ts:execSync", "probe.ts:execSync", "probe.ts:execSync"],
    ]);
    expect(pathQuiet, "another final segment, an rf directory with no word end after rf and a case-variant prose line are not sites").toEqual([]);
    expect(boundaryQuiet, "a quoted other word, another extension, an rf directory, a word continuing past rf and a shell function named rf, each with no word end after rf, are not sites, inside backquotes or braces too").toEqual([]);
    return {
      walkCoversGit: walkCovers, sites, controls, quiet, pathControls, pathQuiet, boundaryQuiet,
      controlDigests: LAUNCH_CONTROLS.map(digestOf), quietDigest: digestOf(LAUNCH_QUIET), pathControlDigests: PATH_CONTROLS.map(digestOf),
      pathQuietDigest: digestOf(PATH_QUIET), boundaryQuietDigest: digestOf(LAUNCH_BOUNDARY_QUIET),
    };
  },
  ...Object.fromEntries(
    SPELLINGS.map(spelling => [
      spelling.pin,
      async () => {
        const hit = spelled(spelling.text);
        expect(hit).toBe(spelling.hit);
        return { digest: sha256(spelling.text).slice(0, 16), hit };
      },
    ]),
  ),
  ...Object.fromEntries(
    SCAN_RESIDUALS.map(row => [
      row.pin,
      async () => {
        const sites = row.scan === "invoke" ? invokeReferences("probe.ts", row.text) : rfLaunchSites("probe.ts", row.text);
        expect(sites, `${row.residual} stays a named residual of the ${row.scan} scan: re-measure row S once the scan reads it`).toEqual([]);
        return { residual: row.residual, scan: row.scan, digest: sha256(row.text).slice(0, 16), sites };
      },
    ]),
  ),
};

describe("wb-a9l2.6 rf evaluator artifact context census (RF-HARNESS2-FEDERATED-PEER-R6)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:6", "B:4", "C:4", "M:24", "S:7"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ checkIds: CHECK_IDS, receiptFields: RECEIPT_FIELDS, artifactPhrases: ARTIFACT_PHRASES, carriers: Object.values(CARRIERS) }).toStrictEqual({
      checkIds: [...ROSTER.checkIds], receiptFields: [...ROSTER.receiptFields], artifactPhrases: [...ROSTER.artifactPhrases], carriers: [...ROSTER.carriers],
    });
    expect(ROSTER.producerFixtures.map(fixture => fixture.path)).toEqual([
      "src/reactive_fiber_cli/schemas/cli/graph.test.schema.json", "schemas/fixtures/graph.test/valid/ok_shadow.json",
      "schemas/fixtures/graph.test/invalid/check_status_failed.json", "schemas/fixtures/graph.test/invalid/valid_false_on_success.json",
    ]);
    expect(REACTIVE_FIBER_CLI_SCHEMA).toBe(String(SHADOW_ENVELOPE.schema));
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }
});
