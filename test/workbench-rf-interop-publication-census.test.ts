/**
 * wb-fb2z.2 (TSX-COMPONENT-ASSEMBLY-R2): the absent-today leg, not a shipped interop record or declared TSX data-output reader.
 * Source: RFCLI-INTEROP.md:12,14,15,17,25 and component-first-context-assembly README.md:16@76bbbffd9d4a.
 * The producer owns the proposed record and its value/error publications; Pi must not infer data from block text.
 * MEASURED read-only at ReactiveFiberTSXSDK 76bbbffd9d4a: 80 numbered ADRs ending 0082, no declared-data-output ADR,
 * no tests/audit/interop-field-census.test.ts; BEADS:67,69,73 keeps TSX-IO-03b ADOPT-gated. No reader is invented here.
 * The roster vendors the cited lines verbatim with SHA256 (UTF-8, no trailing newline); this hermetic test does not re-query upstream.
 *
 * A1 scans every tracked src TypeScript module (independent git listing held against a recursive filesystem walk), AST identifiers,
 * literals, constant string concatenations and templates for VOCABULARY; no unshipped record reader or publication consumer.
 * The scanner's owning controls include property access, destructuring, literal-key indexing, concatenated keys and imports.
 * A2 pins the only rf registration/reconcile read as preview/read and checks that absent optional keys stay absent through the
 * native process, injected registry, curated MCP reply and shared JSON sanitizer (the eight-key CLI envelope is not a publication).
 * B1 tests constructed additive records with null versus absence at every carrier; the topology holds both opaque and equal.
 * B2 carries UNKNOWN/PENDING/FAILED/completeness words verbatim; topology equals its paired no-record control, so it makes no
 * publication status claim. Shipped observation statuses unknown/pending/failed are separately partial/unknown, named as stated.
 * B3 the real provider's no-synthesis behavior is checked by the absent-field checker against deliberate fill mutations.
 * C1 a CONSTRUCTED record on an additive result key carries all five cited fields byte-identically through every existing carrier;
 * no producer schema is asserted. C2 an error-only record stays error-only (value absent) at each carrier and contributes no value
 * or success to topology/native evidence. C3 blocks-only input yields no consumed publication value: providers carry blocks opaque,
 * and projection/native evidence emit neither their text nor a value. C4 a standalone value without receipt is refused by the native
 * provider, adapter and curated MCP reply, not returned as a value. The additive twin is pinned opaque (R-OPAQUE), never consumed.
 * Every row/pin quotes a slice of its bead-export Acceptance clause. Ordered quotes tile each clause, leaving separator-only gaps:
 * deleting a row or pin from every census literal and its roster still reds against the owner's outside text (CT5/CT6).
 * CLAIMS (wb-jint F1, G-SWAPW): each roster pin carries claims, terms that tile its bead-anchored quote with separator-only gaps,
 * each naming the witness facts (top-level keys) that show it. A pin's live witness must show its claims: every term names a fact,
 * every fact sits under exactly one term and the witness holds nothing else. The claims bound case holds every pin's claims against
 * every other pin's live witness (9 x 8 ordered pairs, none accepted), so a case swap X := Y with X's roster witness rewritten to
 * match reds at X's claims, at claims bound and at records.
 * OWNER SUBJECTS (wb-jint F2, G-VOCDEEP): A1 reads the absent subjects of the owner's clause (a) from the bead export (the span
 * between "has no" and "at the pinned version", split on " or ") and requires a scanner hit on each.
 * OWNER WORDS (wb-jint refusal #1 U1, L2-NARROW-PUB/L2-NARROW-INTEROP): the words A1 holds are each subject's first word (split on
 * a space or hyphen: interop, publication). Spelled from the bead export in seven forms that cover every scanner path (a property
 * read, a destructured name, a literal key, a parenthesized concatenated key, a plain template key, a template key with a constant
 * span, an import specifier), each must scan as exactly that word, and every VOCABULARY word an owner subject contains must be
 * one of them. So dropping an owner word, or replacing it with any other word (narrower, as 'publicationconsumer' or
 * 'interoprecord', broader or substituted), in VOCABULARY, A1's controlHits expectation and the roster together reds A1, beside
 * any src reader of the owner word; A1 also judges a constructed narrowing (each owner word replaced by its whole folded subject)
 * through the same judge and requires every form to miss while the subject hit still passes.
 * The subjects' other words (record, reader, consumer) are not held: none is a VOCABULARY word, and a reader named by one alone
 * falls under R-PARAPHRASE (A1's ownerWords fact shows each quiet).
 * FROZEN SHAPE: A:2 B:3 C:4; claims (facts per term) A1:6+2 A2:5 B1:2 B2:2+2 B3:4 C1:1+3 C2:4 C3:2+2 C4:1+1; roster pins
 * labels/quotes/witnesses/claims, constants and every registered test's reached record.
 * RESIDUALS, with quiet pins: R-COMPUTED, R-PARAPHRASE and R-SYNONYM (A1), R-STATUS-PROJECTION (B2), R-OPAQUE (C4), R-REAUTHORED
 * (claims bound). R-SYNONYM: a VOCABULARY word that no owner-named subject contains (A1's synonyms fact lists them) is held by this
 * file alone; one dropped, or replaced by another word no owner subject contains (the substitution form on a synonym), in
 * VOCABULARY, A1's controlHits and that list together, census and roster, stays green.
 * R-REAUTHORED: a pin's case, claims and roster witness rewritten together, in whole or in part, are held by no anchor beyond the
 * term tiling; the quiet row re-authors C3 as one fact under one claim, which shows that claim and no registered pin's claims accept.
 * NOT CLAIMED: a case returning its roster witness unmeasured, and an edit of a judge (claimMisses, absentSubjects, ownerSpellings,
 * ownerWordMisses) with the roster.
 * ARMED HALF PENDING: a future native publication reader's null/absence projection, completeness status and receipt admission
 * (acceptance b/c) remain gated TSX-IO-ADR/01/03b; the present carrier is not such a reader. No fake future adapter is tested.
 * Display paths added: none. Test only; every stand-in process lives in makeScratch scratch, with its leak guard installed.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { REACTIVE_FIBER_CONTRACT_SOURCE, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { sanitizeWorkbenchJson, sanitizeWorkbenchJsonText } from "../src/workbench/redaction.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);
type Obj = { [key: string]: JsonValue };
interface Pin { readonly id: string; readonly quote: string }
interface Row { readonly id: string; readonly label: string; readonly pins: readonly Pin[] }
interface Claim { readonly term: string; readonly facts: readonly string[] }
interface RosterRow extends Omit<Row, "pins"> { readonly pins: readonly (Pin & { readonly witness: JsonValue; readonly claims: readonly Claim[] })[] }
interface Roster { readonly bead: string; readonly citation: string; readonly producer: { readonly pin: string; readonly gate: string; readonly adrCount: number; readonly latestAdr: string; readonly fieldCensusExists: boolean; readonly excerpts: readonly { readonly site: string; readonly textBase64: string; readonly sha256: string }[] }; readonly rows: readonly RosterRow[]; readonly vocabulary: readonly string[]; readonly residuals: readonly { readonly id: string; readonly quietPin: string }[]; readonly claimsBound: JsonValue }
const ROOT = process.cwd();
const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ID = "reactivefiber.render.preview";
const BEAD = "wb-fb2z.2";
const ROSTER = JSON.parse(readFileSync(new URL("./fixtures/rf-interop-publication-roster.json", import.meta.url), "utf8")) as Roster;
/* gated fixture; no proposed reader */ const VOCABULARY: readonly string[] = ["interop", "publication", "declaredoutput", "declareddataoutput", "dataoutput", "outputport", "valueedge", "rftsx", "graphv2", "componentproduceroverview"];
const ROWS: readonly Row[] = [
  {
    "id": "A",
    "label": "(a) absence pin: Pi has no interop-record reader or publication consumer at the pinned version (wb-pyel.1); absent stays absent (wb-2j3.2)",
    "pins": [
      {
        "id": "A1",
        "quote": "absence pin: Pi has no interop-record reader or publication consumer at the pinned version (wb-pyel.1)"
      },
      {
        "id": "A2",
        "quote": "absent stays absent (wb-2j3.2)"
      }
    ]
  },
  {
    "id": "B",
    "label": "(b) armed: {field: null} and {} project distinct states, completeness/unknown echoes as a status word never success, a mutant filling an absent field fails",
    "pins": [
      {
        "id": "B1",
        "quote": "armed: {field: null} and {} project distinct states"
      },
      {
        "id": "B2",
        "quote": "completeness/unknown echoes as a status word never success"
      },
      {
        "id": "B3",
        "quote": "a mutant filling an absent field fails"
      }
    ]
  },
  {
    "id": "C",
    "label": "(c) armed: a publication {value, producer digest, source provenance, error, sensitivity} round-trips byte-identical, an error never becomes a value, blocks-only input yields no value, a value without receipt is refused",
    "pins": [
      {
        "id": "C1",
        "quote": "armed: a publication {value, producer digest, source provenance, error, sensitivity} round-trips byte-identical"
      },
      {
        "id": "C2",
        "quote": "an error never becomes a value"
      },
      {
        "id": "C3",
        "quote": "blocks-only input yields no value"
      },
      {
        "id": "C4",
        "quote": "a value without receipt is refused"
      }
    ]
  }
];
const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => { process.env.PATH = oldPath; removeScratch(...scratches.splice(0)); });
function object(value: JsonValue | undefined): Obj {
  if (value === null || value === undefined || typeof value !== "object" || Array.isArray(value)) throw new Error("expected an object");
  return value;
}
function copy<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T; }
function strings(value: JsonValue): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  return value !== null && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
}
function reading(envelope: JsonValue): Obj { return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: envelope }; }
function render(additive: Obj = {}): Obj {
  const envelope = fullShapeRf(ROOT);
  const result = object(envelope.result);
  // One constructed included block/decision makes the fixture independent of the queued hs2j.1 inclusion leg.
  result.blocks = [{ final_index: 0, candidate_key: "fixture::body", component_id: "fixture", content: "block-only sentinel" }];
  result.necessity = [{ candidate_key: "fixture::body", include: true }];
  Object.assign(result, additive);
  return envelope;
}
function topology(envelope: JsonValue): JsonValue {
  return copy(reactivefiberTopology(reading(envelope), { scope: { workspace: ROOT, principal: "fixture" }, seam: "rf-cli", capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z" })) as unknown as JsonValue;
}
function injected(envelope: JsonValue): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  type Envelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;
  registerReactiveFiberRender(registry, async () => copy(envelope) as unknown as Envelope, ROOT);
  return registry;
}
function native(envelope: JsonValue): CapabilityRegistry {
  const scratch = makeScratch("rf-interop-opaque-");
  scratches.push(scratch);
  const executable = join(scratch, "rf");
  writeFileSync(executable, `#!/usr/bin/env node
process.stdout.write(${JSON.stringify(JSON.stringify(envelope))});
`);
  chmodSync(executable, 0o700);
  process.env.PATH = `${scratch}:${oldPath ?? ""}`;
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  return registry;
}
async function invoke(registry: CapabilityRegistry): Promise<JsonValue> {
  return registry.invoke(ID, { model: "fixture", task: "fixture" }, { grants: ["reactivefiber:render"], signal: new AbortController().signal });
}
async function toolReply(registry: CapabilityRegistry): Promise<{ isError: boolean; payload: Obj }> {
  const server = createCuratedTools({ registry, allowedCapabilities: [ID], grants: [`discover:${ID}`, `invoke:${ID}`, "reactivefiber:render"], principal: { id: "fixture", role: "fixture" }, workspace: ROOT, invocationId: "interop-fixture", signal: new AbortController().signal });
  const client = new Client({ name: "interop-fixture", version: "1.0.0" });
  const [ct, st] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(st);
  await client.connect(ct);
  try {
    const reply = await client.callTool({ name: "capability_invoke", arguments: { capabilityId: ID, capabilityVersion: "1.0.0", input: { model: "fixture", task: "fixture" } } });
    const content: unknown = reply.content;
    const first: unknown = Array.isArray(content) ? content[0] : undefined;
    if (typeof first !== "object" || first === null || !("text" in first) || typeof first.text !== "string") throw new Error("expected one text reply");
    return { isError: reply.isError === true, payload: object(JSON.parse(first.text) as JsonValue) };
  } finally { await client.close(); await server.instance.close(); }
}
/** Every EXISTING carrier, not a proposed publication consumer. The source bytes are taken before any invocation. */
async function carriers(envelope: JsonValue): Promise<{ sources: Obj[]; names: string[] }> {
  const expected = JSON.stringify(envelope);
  const n = await invoke(native(envelope));
  const i = await invoke(injected(envelope));
  const t = await toolReply(injected(envelope));
  expect(t.isError).toBe(false);
  expect(t.payload.kind).toBe("returned");
  const carried = [n, i, t.payload.value ?? null, sanitizeWorkbenchJson(reading(envelope)), JSON.parse(sanitizeWorkbenchJsonText(reading(envelope))) as JsonValue];
  const sources = carried.map(value => object(object(value).source));
  expect(sources.map(value => JSON.stringify(value) === expected)).toEqual([true, true, true, true, true]);
  return { sources, names: ["native", "injected", "curated-MCP", "shared-JSON", "shared-JSON-text"] };
}
const fold = (text: string): string => text.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
function constant(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return constant(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = constant(node.left); const right = constant(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let text = node.head.text;
    for (const span of node.templateSpans) { const value = constant(span.expression); if (value === undefined) return undefined; text += value + span.literal.text; }
    return text;
  }
  return undefined;
}
function scan(text: string, path = "fixture.ts", vocabulary: readonly string[] = VOCABULARY): string[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const hits = new Set<string>();
  const visit = (node: ts.Node): void => {
    const value = ts.isIdentifier(node) ? node.text : constant(node);
    if (value !== undefined) for (const word of vocabulary) if (fold(value).includes(word)) hits.add(word);
    ts.forEachChild(node, visit);
  };
  visit(source); return [...hits].sort();
}
function filesBelow(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? filesBelow(join(directory, entry.name)) : entry.isFile() && /\.tsx?$/.test(entry.name) ? [join(directory, entry.name)] : []);
}
/** A fill/drop/overwrite checker for the raw carrier (not a future reader). */
function differences(before: JsonValue, after: JsonValue, path = "$"): string[] {
  if (JSON.stringify(before) === JSON.stringify(after)) return [];
  if (before !== null && after !== null && typeof before === "object" && typeof after === "object" && !Array.isArray(before) && !Array.isArray(after)) {
    return [...new Set([...Object.keys(before), ...Object.keys(after)])].sort().flatMap(key =>
      !Object.hasOwn(before, key) || !Object.hasOwn(after, key) ? [`${path}.${key}: ${Object.hasOwn(before, key) ? "dropped" : "filled"}`] : differences(before[key] ?? null, after[key] ?? null, `${path}.${key}`));
  }
  return [`${path}: changed`];
}
const RECORD: Obj = { value: { overview: "constructed value sentinel" }, producer_digest: `sha256:${"3".repeat(64)}`, source_provenance: { revision: "constructed-revision" }, error: null, sensitivity: "internal" };
const REACHED = new Set<string>();
const LIVE = new Map<string, JsonValue>();
const CLAIMS_BOUND = "claims bound";
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const walked = filesBelow(join(REPO, "src")).map(path => relative(REPO, path)).sort();
    const tracked = execFileSync("git", ["ls-files", "src"], { cwd: REPO, encoding: "utf8" }).trim().split("\n").filter(path => /\.tsx?$/.test(path)).sort();
    expect(walked).toEqual(tracked); expect(walked.length).toBeGreaterThanOrEqual(100);
    for (const anchor of ["src/index.ts", "src/ui/workflow-inspector.ts", "src/workflow/runtime.ts", "src/workbench/providers/reactivefiber.ts"]) expect(walked).toContain(anchor);
    const findings = walked.flatMap(path => scan(readFileSync(join(REPO, path), "utf8"), path).map(word => `${path}:${word}`));
    expect(findings).toEqual([]);
/* gated fixture; no proposed reader */     const controls = ['return source.publication.value;', 'const { interop_record } = source;', 'source["declared_data_output"]', 'source["value" + "_edge"]', 'import x from "rftsx/interop";'];
    const controlHits = controls.map(text => scan(text));
/* gated fixture; no proposed reader */     expect(controlHits).toEqual([["publication"], ["interop"], ["dataoutput", "declareddataoutput"], ["valueedge"], ["interop", "rftsx"]]);
    const quiet = [scan('const key = "pub" + userSuffix; return source[key];'), scan('return source.payload.carrier;')];
    expect(quiet).toEqual([[], []]);
    // F2 (G-VOCDEEP): every absent subject the owner's clause (a) names is a scanner hit; the subjects come from the bead export.
    const subjects = absentSubjects(); const subjectHits = subjects.map(subject => scan(JSON.stringify(subject)));
    expect(subjects.length).toBeGreaterThan(0); expect(subjects.filter((_, index) => (subjectHits[index] ?? []).length === 0)).toEqual([]);
    const ownerSubjects: JsonValue = subjects.map((subject, index) => [subject, subjectHits[index] ?? []]);
    // Refusal #1 U1 (F2 class): each subject's first word is itself held in seven forms, and no other owner-contained word is scanned.
    const words = subjects.map(subject => subject.split(/[\s-]/)[0] ?? "");
    expect(ownerWordMisses(words, VOCABULARY)).toEqual([]);
    expect(VOCABULARY.filter(word => subjects.some(subject => fold(subject).includes(word))).sort()).toEqual(words.map(fold).sort());
    const owners = subjects.map((subject, index) => {
      const word = words[index] ?? ""; const narrowed = VOCABULARY.map(entry => entry === fold(word) ? fold(subject) : entry);
      // R-PARAPHRASE, quiet: the subject's other words are not VOCABULARY words, so a reader named by one alone escapes the scan.
      const tails = subject.split(/[\s-]/).slice(1).map((tail): [string, string[]] => [tail, scan(`return source.${tail}.value;`)]);
      // Liveness: the same judge refuses the owner word narrowed to its whole folded subject, which the subject hit alone accepts.
      return { word, hits: ownerSpellings(word).map(text => scan(text)), narrower: fold(subject), misses: ownerWordMisses([word], narrowed).length, subjectStillHit: scan(JSON.stringify(subject), "fixture.ts", narrowed).length > 0, tails };
    });
    expect(owners.map(owner => owner.misses === ownerSpellings(owner.word).length && owner.subjectStillHit)).toEqual(subjects.map(() => true));
    expect(owners.flatMap(owner => owner.tails.filter(([, hits]) => hits.length > 0))).toEqual([]);
    const ownerWords: JsonValue = owners;
    // R-SYNONYM, quiet: the VOCABULARY words that no owner-named subject contains are held by this file alone.
    const synonyms = VOCABULARY.filter(word => !subjects.some(subject => fold(subject).includes(word)));
    return { floorMet: true, pathsAgree: true, findings, controlHits, quiet, ownerSubjects, synonyms, ownerWords };
  },
  A2: async () => {
    const loaded = await loadWorkbenchNative(); const registry = new CapabilityRegistry(); loaded.registerNativeProviders(registry, ROOT);
    const selected = registry.catalogSnapshot().filter(entry => entry.descriptor.id.startsWith("reactivefiber."));
    expect(selected.map(entry => [entry.descriptor.id, entry.descriptor.effectClass, entry.descriptor.contractSource])).toEqual([[ID, "read", REACTIVE_FIBER_CONTRACT_SOURCE]]);
    expect(RECONCILE_EVIDENCE_READS.reactivefiber).toEqual([ID]);
    const envelope = render(); const result = object(envelope.result); delete object(result.provenance).cli_version; delete object(result.provenance).sdk_versions;
    const { sources, names } = await carriers(envelope);
/* gated fixture; no proposed reader */     const absent = sources.map(source => { const value = object(source.result); /* gated fixture */ return [Object.hasOwn(value, "interop_record"), Object.hasOwn(value, "publications"), Object.hasOwn(object(value.provenance), "cli_version"), Object.hasOwn(object(value.provenance), "sdk_versions")]; /* gated fixture */ });
    expect(absent).toEqual(names.map(() => [false, false, false, false]));
    const evidence = nativeEvidence(ID, reading(envelope)); expect(Object.hasOwn(evidence, "producerRelease")).toBe(false);
    return { roster: [ID], readOnly: true, names, absent, synthesizedRelease: false };
  },
  B1: async () => {
    const variants: Obj[] = [{}, { field: null }];
    const states: JsonValue[] = [];
/* gated fixture; no proposed reader */     for (const record of variants) {
      const envelope = render({ interop_record: record }); const carried = await carriers(envelope);
/* gated fixture; no proposed reader */       states.push(carried.sources.map(source => { const value = object(object(source.result).interop_record); /* gated fixture */ return { present: Object.hasOwn(value, "field"), serialized: JSON.stringify(value) }; /* gated fixture */ }));
      expect(topology(envelope)).toEqual(topology(render()));
    }
    expect(states[0]).not.toEqual(states[1]);
    return { states, opaqueProjectionEqual: true };
  },
  B2: async () => {
    const words = ["UNKNOWN", "PENDING", "FAILED"];
    const carriedWords: JsonValue[] = []; const observationWords: JsonValue[] = [];
/* gated fixture; no proposed reader */     for (const word of words) {
      const envelope = render({ interop_record: { completeness: word, unknown: word } }); const carried = await carriers(envelope);
/* gated fixture; no proposed reader */       carriedWords.push(carried.sources.map(source => object(object(source.result).interop_record).completeness ?? null));
      expect(topology(envelope)).toEqual(topology(render()));
      const observed = render({ observations: [{ status: word.toLowerCase(), freshness: "captured_at_render", replayed: false }] });
      const projected = object(topology(observed)); const snapshot = object((projected.snapshots as JsonValue[])[0]);
      expect(snapshot.coverage).toBe("partial"); expect(object(snapshot.node).statusTone).toBe("unknown");
      const note = strings(projected).find(text => text.startsWith("observations:")) ?? ""; expect(note).toContain(word.toLowerCase());
      observationWords.push({ word, coverage: snapshot.coverage ?? null, tone: object(snapshot.node).statusTone ?? null, note });
    }
    return { words, carriedWords, observationWords, opaqueProjectionEqual: true };
/* gated fixture; no proposed reader */   },
  B3: async () => {
    const before = render({ interop_record: { field: null } });
    const { sources } = await carriers(before);
    expect(sources.flatMap(source => differences(before, source))).toEqual([]);
    const mutants = ["value", "producer_digest", "source_provenance", "error", "sensitivity", "completeness"].map(field => {
/* gated fixture; no proposed reader */       const mutant = copy(before); /* gated fixture */ object(object(mutant.result).interop_record)[field] = "filled"; /* gated fixture */ return differences(before, mutant);
    });
/* gated fixture; no proposed reader */     expect(mutants).toEqual(["value", "producer_digest", "source_provenance", "error", "sensitivity", "completeness"].map(field => [`$.result.interop_record.${field}: filled`]));
/* gated fixture; no proposed reader */     const drop = copy(before); /* gated fixture */ delete object(object(drop.result).interop_record).field;
/* gated fixture; no proposed reader */     const overwrite = copy(before); /* gated fixture */ object(object(overwrite.result).interop_record).field = "filled";
/* gated fixture; no proposed reader */     expect(differences(before, drop)).toEqual(["$.result.interop_record.field: dropped"]);
/* gated fixture; no proposed reader */     expect(differences(before, overwrite)).toEqual(["$.result.interop_record.field: changed"]);
    return { carrierDifferences: [], mutants, dropped: differences(before, drop), changed: differences(before, overwrite) };
  },
  C1: async () => {
    const envelope = render({ publications: [copy(RECORD)] }); const carried = await carriers(envelope);
    const records = carried.sources.map(source => (object(source.result).publications as JsonValue[])[0] ?? null);
    expect(records.map(record => JSON.stringify(record))).toEqual(carried.names.map(() => JSON.stringify(RECORD)));
    expect(topology(envelope)).toEqual(topology(render()));
    return { fields: Object.keys(RECORD), names: carried.names, byteIdentical: records.map(record => JSON.stringify(record) === JSON.stringify(RECORD)), opaqueProjectionEqual: true };
  },
  C2: async () => {
    const record = copy(RECORD); delete record.value; record.error = { code: "CONSTRUCTED_FAILURE", message: "constructed failure sentinel" };
    const envelope = render({ publications: [record] }); const carried = await carriers(envelope);
    const noValues = carried.sources.map(source => !Object.hasOwn(object((object(source.result).publications as JsonValue[])[0]), "value"));
    expect(noValues).toEqual(carried.names.map(() => true));
    expect(topology(envelope)).toEqual(topology(render())); expect(nativeEvidence(ID, reading(envelope))).toEqual(nativeEvidence(ID, reading(render())));
    expect(strings(topology(envelope)).some(text => text.includes("constructed failure sentinel"))).toBe(false);
    return { noValues, opaqueProjectionEqual: true, evidenceEqual: true, errorTextSurfaced: false };
  },
  C3: async () => {
    const envelope = render(); const carried = await carriers(envelope);
    expect(carried.sources.map(source => Object.hasOwn(object(source.result), "publications"))).toEqual(carried.names.map(() => false));
    const projected = topology(envelope); const evidence = copy(nativeEvidence(ID, reading(envelope))) as JsonValue;
    expect([...strings(projected), ...strings(evidence)].some(text => text.includes("block-only sentinel"))).toBe(false);
    expect(Object.hasOwn(object(evidence), "value")).toBe(false);
    const noBlocks = render({ blocks: [], necessity: [] });
    // Only the queued inclusion leg may distinguish block counts; neither shape supplies a publication value.
    expect(Object.hasOwn(object(copy(nativeEvidence(ID, reading(noBlocks))) as JsonValue), "value")).toBe(false);
    return { publicationAbsent: carried.names.map(() => true), blockTextSurfaced: false, nativeEvidenceHasValue: false, blocksAreOpaque: true };
  },
  C4: async () => {
    const standalone: Obj = { value: "constructed standalone value", producer_digest: RECORD.producer_digest ?? null };
    let nativeCategory = ""; try { await invoke(native(standalone)); } catch (error) { if (!(error instanceof CapabilityError)) throw error; nativeCategory = error.category; }
    expect(nativeCategory).toBe("transport");
    let adapterCategory = ""; try { topology(standalone); } catch (error) { if (!(error instanceof CapabilityError)) throw error; adapterCategory = error.category; }
    expect(adapterCategory).toBe("validation");
    const reply = await toolReply(native(standalone)); expect(reply.isError).toBe(true); expect(reply.payload.kind).toBe("rejected"); expect(Object.hasOwn(reply.payload, "value")).toBe(false);
    const additive = render({ publications: [standalone] }); const carried = await carriers(additive);
    expect(carried.sources.map(source => (object(source.result).publications as JsonValue[])[0])).toEqual(carried.names.map(() => standalone));
    expect(topology(additive)).toEqual(topology(render()));
    return { standalone: { nativeCategory, adapterCategory, isError: reply.isError, kind: reply.payload.kind ?? null, valueAbsent: true }, additiveOpaque: true };
  },
};
function beadNotes(): string {
  for (const line of readFileSync(join(REPO, ".beads/issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const value: unknown = JSON.parse(line);
    if (value !== null && typeof value === "object" && "id" in value && value.id === BEAD && "notes" in value && typeof value.notes === "string") return value.notes;
  }
  throw new Error("bead export lacks the owner filing");
}
function tiled(body: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) { const found = body.indexOf(quote, at); if (found < 0 || !/^[\s,;:]*$/.test(body.slice(at, found))) return false; at = found + quote.length; }
  return /^[\s,;:]*$/.test(body.slice(at));
}
/** The owner's Acceptance clauses, read from the bead export (the outside anchor every row label equals). */
function acceptanceClauses(): string[] {
  const line = beadNotes().split("\n").find(text => text.startsWith("Acceptance: ")) ?? "";
  return line.slice(12).replace(/\.$/, "").split(/; (?=\([a-z]\) )/);
}
/** F2 outside anchor: the absent subjects clause (a) names, between "has no" and "at the pinned version", split on " or ". */
function absentSubjects(): string[] {
  const span = /\bhas no (.+?) at the pinned version\b/.exec(acceptanceClauses()[0] ?? "")?.[1] ?? "";
  return span.split(" or ").filter(subject => subject.length > 0);
}
/** Refusal #1 U1: an owner word in seven forms that cover every scanner path (property read, destructured name, literal key,
 * parenthesized concatenated key, plain template key, template key with a constant span, import specifier), built from the
 * bead-export word, never from a census literal. */
function ownerSpellings(word: string): string[] {
  const cut = Math.ceil(word.length / 2); const head = JSON.stringify(word.slice(0, cut)); const tail = word.slice(cut);
  return [`return source.${word}.value;`, `const { ${word} } = source;`, `source[${JSON.stringify(word)}]`, `source[(${head}) + ${JSON.stringify(tail)}]`, `source[\`${word}\`]`, `source[\`\${${head}}${tail}\`]`, `import x from ${JSON.stringify(`${word}/x`)};`];
}
/** Why the scanner, judging by a vocabulary, does not hold each owner word itself: every form that scans as anything but exactly that word. */
function ownerWordMisses(words: readonly string[], vocabulary: readonly string[]): string[] {
  return words.flatMap(word => ownerSpellings(word).filter(text => JSON.stringify(scan(text, "fixture.ts", vocabulary)) !== JSON.stringify([fold(word)])).map(text => `${word}: ${text}`));
}
/** F1 (G-SWAPW): why a witness fails to show a pin's claims - terms must tile the quote, each naming facts, the facts partitioning its keys. */
function claimMisses(quote: string, claims: readonly Claim[], witness: JsonValue): string[] {
  const misses = tiled(quote, claims.map(claim => claim.term)) ? [] : ["tiling"];
  for (const claim of claims) if (claim.facts.length === 0) misses.push(`idle: ${claim.term}`);
  const facts = claims.flatMap(claim => claim.facts);
  const keys = witness !== null && typeof witness === "object" && !Array.isArray(witness) ? Object.keys(witness) : [];
  for (const [index, fact] of facts.entries()) if (facts.indexOf(fact) !== index) misses.push(`twice: ${fact}`);
  for (const fact of facts) if (!keys.includes(fact)) misses.push(`absent: ${fact}`);
  for (const key of keys) if (!facts.includes(key)) misses.push(`unclaimed: ${key}`);
  return misses;
}
describe("wb-fb2z.2 absent interop publication census (TSX-COMPONENT-ASSEMBLY-R2, gated)", () => {
  it("judged set: frozen shape, roster, outside acceptance anchor and producer excerpts", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:3", "C:4"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id, quote }) => ({ id, quote })) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort());
    expect(ROSTER.bead).toBe(BEAD); expect(ROSTER.vocabulary).toEqual(VOCABULARY);
    const notes = beadNotes(); const clauses = acceptanceClauses();
    expect(ROWS.map(row => row.label)).toEqual(clauses);
    expect(clauses.map((clause, index) => tiled(clause.slice(4), ROWS[index]?.pins.map(pin => pin.quote) ?? []))).toEqual(clauses.map(() => true));
    expect(notes.includes(ROSTER.citation)).toBe(true); expect(ROSTER.citation.endsWith(`@${ROSTER.producer.pin.slice(0, 12)}`)).toBe(true);
    expect({ gate: ROSTER.producer.gate, adrCount: ROSTER.producer.adrCount, latestAdr: ROSTER.producer.latestAdr, fieldCensusExists: ROSTER.producer.fieldCensusExists }).toEqual({ gate: "ABSENT", adrCount: 80, latestAdr: "0082-incremental-performance-program-positions.md", fieldCensusExists: false });
    expect(ROSTER.producer.excerpts.map(excerpt => createHash("sha256").update(Buffer.from(excerpt.textBase64, "base64")).digest("hex"))).toEqual(ROSTER.producer.excerpts.map(excerpt => excerpt.sha256));
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(ROSTER.residuals.map(item => item.id)).toEqual(["R-OPAQUE", "R-COMPUTED", "R-PARAPHRASE", "R-STATUS-PROJECTION", "R-SYNONYM", "R-REAUTHORED"]);
    expect(ROSTER.residuals.every(item => [...pins, CLAIMS_BOUND].includes(item.quietPin))).toBe(true);
    const held = ROSTER.rows.flatMap(row => row.pins);
    expect(held.map(pin => `${pin.id}:${pin.claims.map(claim => claim.facts.length).join("+")}`)).toEqual(["A1:6+2", "A2:5", "B1:2", "B2:2+2", "B3:4", "C1:1+3", "C2:4", "C3:2+2", "C4:1+1"]);
    expect(held.filter(pin => !tiled(pin.quote, pin.claims.map(claim => claim.term))).map(pin => pin.id)).toEqual([]);
  });
  for (const row of ROWS) describe(`${row.id} ${row.label}`, () => { for (const pin of row.pins) it(pin.id, { timeout: 180_000 }, async () => {
    const impl = IMPL[pin.id]; expect(impl).toBeTypeOf("function");
    const witness = impl === undefined ? null : await impl();
    const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
    LIVE.set(pin.id, witness);
    expect(witness).toEqual(held?.witness); expect(claimMisses(pin.quote, held?.claims ?? [], witness)).toEqual([]); REACHED.add(pin.id);
  }); });
  it(`${CLAIMS_BOUND}: every pin's claims refuse every other pin's live witness, and a re-authored pin stays quiet (R-REAUTHORED)`, () => {
    const pins = ROSTER.rows.flatMap(row => row.pins);
    expect([...LIVE.keys()].sort()).toEqual(pins.map(pin => pin.id).sort());
    const accepted = pins.flatMap(pin => pins.filter(other => other.id !== pin.id && claimMisses(pin.quote, pin.claims, LIVE.get(other.id) ?? null).length === 0).map(other => `${pin.id} accepts ${other.id}`));
    // R-REAUTHORED, the quiet row: C3 re-authored as one fact under one claim shows that claim and no registered pin's claims accept it.
    const c3 = pins.find(pin => pin.id === "C3"); const fact = c3?.claims[0]?.facts[0] ?? ""; const reauthored: JsonValue = { [fact]: true };
    const shows = claimMisses(c3?.quote ?? "", [{ term: c3?.quote ?? "", facts: [fact] }], reauthored);
    const acceptedBy = pins.filter(pin => claimMisses(pin.quote, pin.claims, reauthored).length === 0).map(pin => pin.id);
    expect({ pairs: pins.length * (pins.length - 1), accepted, reauthored: { fact, shows, acceptedBy } }).toEqual(ROSTER.claimsBound); REACHED.add(CLAIMS_BOUND);
  });
  it("records: every registered pin ran and reached its witness, and the claims bound case ran", () => {
    expect([...REACHED].sort()).toEqual([...ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)), CLAIMS_BOUND].sort());
  });
});
