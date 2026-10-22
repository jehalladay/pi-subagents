/**
 * wb-tz2.6 (HX-ORIGINAL-GOALS-CLOSURE-R6), STANDING leg only: HX evidence references stay reference-only.
 *
 * The bead: "until the artifact exists no HX evidence loader may be added — HX refs stay visibly unloadable", and its
 * standing acceptance: "the docs/20:24 no-loader fallback row holds (wb-6ze.40 census binds it); HX evidence refs remain
 * reference-only, never fabricated readers." The "On landing" leg (a loader conformance test over the GC-D05
 * dependency-token validation) waits for the GC-D05 artifact (accepted ADR + SDK validation exposure) and is NOT delivered
 * here: no HX loader is built, stubbed or wired anywhere in this file, and the scanner liveness row reads synthetic source
 * text only.
 *
 * The rows it holds: docs/workbench/20-evidence-loader-contract.md § Producer mapping (line 24) "| anything else | — |
 * `unavailable: no-loader`, a visible unknown | — |" and § Refusal and freshness rules "Unknown producer or ref kind:
 * no-loader, ref stays listed sanitized."
 *
 * Every HX reference here comes from ONE provider output: the value the registered hyperunix.find capability returns (the
 * real registration, src/workbench/providers/hyperunix.ts, over an injected reader) for an SDK result that supplies proof
 * handles (support ids and derivation handles) and a runtime-sourced, digest-shaped query digest. hxSources() drives it
 * through the two src paths that turn it into HX references, and through one host shape replicated here:
 *   native-evidence     nativeEvidence + nativeRefOf (src/workbench/native-evidence.ts, the stored proof handles; :60-63@9df9a03)
 *   host-native-node    the src/index.ts native.node ingestion shape (provider = the capability id prefix, type "operation",
 *                       refs sliced to 32: the onProgress workflow_node branch, :3163 at base 94ee0e0), REPLICATED in
 *                       hxSources(), not driven: this file imports no src/index.ts, so a change to that shape in src/index.ts
 *                       cannot red R0, S1 or S2 for this source
 *   hyperunix-observer  hyperunixTopology (src/workbench/hyperunix-observer.ts: the hx-binary and hx-coverage references)
 *
 * R0 the roster is frozen (rule 16): each source, its native ref shape and its exact references, so an HX projection that
 *    stopped yielding references could never let S1/S2 pass over an empty list.
 * S1 the host store (createWorkbenchEvidenceStore with every reader supplied, every loader grant and the HX read permission
 *    held, the real hyperunix.find registered) resolves every HX reference to exactly the typed unavailable no-loader entry
 *    and issues no read: no capability invocation, no HX reader call, no transcript or furnace call.
 * S2 the inspector details view keeps every HX reference listed and renders it as the visible unknown "unavailable:
 *    no-loader", never a loaded label or preview.
 * S3 the loader contract modules (evidence-loader.ts, evidence-producers.ts, evidence-wiring.ts) hold exactly the three
 *    docs/20 producer loaders (EVIDENCE_LOADER_ROWS order) and name no HX producer, reference, field or module in code: a
 *    fabricated HX loader or reader there is red, naming its file.
 * S4 native-evidence.ts carries the HX proof handles as references only: it imports no loader-contract, reader or HX module,
 *    holds no loader-shaped construct, and its HX projection states identity, domain status and references, never a basis.
 * F1 the source census is live: it names a loader-shaped literal, a loader-shaped class, an HX import and HX names in
 *    synthetic source, and reports nothing for a source without them.
 *
 * test/workbench-docs20-contract.census.ts (wb-6ze.40, extended by this cut) binds S1-S4 to the docs/20 rows they hold.
 *
 * NAMED RESIDUAL UNWIRED-MODULE: a module outside the read set (S3's three loader-contract modules and S4's
 * native-evidence.ts) that defines an HX reader but is imported by none of them is not read here; it loads nothing until a
 * loader-contract module wires it. That wiring reds S1 and S2 whenever the wired reader accepts an HX reference they request
 * (the store routes by provider, then canLoad, so the reference no longer resolves to the typed no-loader entry). S3 reds it
 * too only when the wiring names HX vocabulary in a loader-contract module's code: a neutral module specifier and binding
 * (the wb-tz2.6 gate's SM1 probe, ./proof-loader.js imported as proofLoader) leave S3 green.
 *
 * Display paths added: none (test-only). No scratch directory is allocated: WS is a string, never created or read.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { resultFromJson } from "@hyperunix/sdk";
import ts from "typescript";
import { describe, expect, it, vi } from "vitest";
import { type InspectorModel, initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { EVIDENCE_LOADER_ROWS } from "../src/workbench/evidence-producers.js";
import { createWorkbenchEvidenceStore } from "../src/workbench/evidence-wiring.js";
import { hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import { nativeEvidence, nativeRefOf } from "../src/workbench/native-evidence.js";
import { type NativeRef, type NativeSnapshot, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";

type Json = { [key: string]: JsonValue };

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");

const WS = "/workspace/wb-tz2.6";
const scope: ObservationScope = { workspace: WS, principal: "local-operator:wb-tz2.6" };
const NOW = "2026-10-19T19:30:00Z";
const INVOCATION = "wf-tz2.6";
const CAPABILITY = "hyperunix.find";
const TARGET = { kind: "hx.fs/regular-file", root: "src" };
/** The provider's runtime.binarySha256 shape: 64 lowercase hex characters. */
const BINARY = "5f".repeat(32);
const EXECUTION_ID = "hx-exec-tz2.6";
const SUPPORT_IDS = ["hx-support:s1", "hx-support:s2"];
const DERIVATION_HANDLES = ["hx-derivation:d1"];
const BATCHES = ["b1", "b2"];
/** Digest-shaped and runtime-sourced: the HX query digest is a query identity, never an immutable source basis. */
const QUERY_DIGEST = `sha256:${"ab".repeat(32)}`;

/** One SDK result in its hyperunix.result/1 JSON form (the measured live read's shape), supplying proof handles. */
const HX_DOCUMENT: Json = {
  representation: "hyperunix.result/1",
  operation: "find",
  rows: [{ path: "src/index.ts" }],
  rows_retained: true,
  coverage: BATCHES.map(batch_id => ({
    mode: "opportunistic",
    cause: { cause: "other", detail: "No_change_exclusion" },
    scope: { path: [], scope: "fs-subtree" },
    target: { target: "relation-expansion" },
    provider: "hx.fs/builtin",
    stream: "hx-fs",
    batch_id,
    body: { mode: "opportunistic" },
  })),
  status: { exit_code: 0, signal: null, streams: [{ name: "hx-fs", frames: 4, ended: true, mode: "observation" }], terminal_reached: true, frames_total: 4 },
  execution_status: { kind: "incomplete", diagnostic_code: "HX-COVERAGE-INCOMPLETE" },
  diagnostics: [],
  view: null,
  cost: null,
  transport: { started_at: "2026-10-19T19:29:59.000Z", startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 100, stderr_bytes: 0, stderr_bytes_retained: 0, frames: 4 },
  workspace_root: WS,
  terminal: "complete",
  truth: null,
  coverage_summary: { modes: ["opportunistic"], completeness: "incomplete", licenses_absence: false, certificates_license_absence: false, incomplete_regions: [], result_coverage: null, answer_count: 1 },
  evidence: { support_ids: SUPPORT_IDS, evidence_classes: ["structural"], derivation_handles: DERIVATION_HANDLES, providers: ["hx.fs/builtin"], provider_versions: { "hx.fs/builtin": "0.1.0" } },
  digest: QUERY_DIGEST,
  digest_source: "runtime",
  execution_id: EXECUTION_ID,
  budget_dimension: null,
  extensions: {},
};

/** The real hyperunix.find registration over a spy reader, so every HX read any path issues is counted. */
function hxRegistry() {
  const find = vi.fn(async () => resultFromJson(HX_DOCUMENT));
  const runtime = vi.fn(async () => ({ version: "0.1.0", binarySha256: BINARY }));
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, { find, runtime, close: async () => {} }, WS);
  const permissions = registry.catalogSnapshot().find(entry => entry.descriptor.id === CAPABILITY)?.descriptor.permissions ?? [];
  return { registry, find, runtime, permissions };
}

interface HxSource {
  readonly id: string;
  readonly snapshot: NativeSnapshot;
}

/** The node an HX projection's references are listed on, as the projection refreshes it. */
const hxNode = (source: NativeRef, evidenceRefs: readonly string[], title: string): NativeSnapshot => ({
  source,
  scope,
  capturedAt: NOW,
  observedAt: NOW,
  node: { title, type: "sdk-operation", statusText: "incomplete", statusTone: "unknown" },
  trace: { invocationId: INVOCATION },
  evidenceRefs,
});

/** What the registered hyperunix.find returns, projected by each src path that turns it into HX evidence references. */
async function hxSources(): Promise<readonly HxSource[]> {
  const { registry, permissions } = hxRegistry();
  const reading = await registry.invoke(CAPABILITY, TARGET, { grants: permissions, signal: new AbortController().signal });
  const evidence = nativeEvidence(CAPABILITY, reading);
  const executionRef = nativeRefOf(evidence);
  const [observed] = hyperunixTopology(reading, { scope, target: TARGET, capturedAt: NOW, observedAt: NOW, invocationId: INVOCATION }).snapshots;
  if (executionRef === undefined || evidence.nativeId === undefined || observed === undefined) throw new Error("an HX source projected no node");
  const handles = evidence.evidenceRefs ?? [];
  return [
    { id: "native-evidence", snapshot: hxNode(executionRef, handles, "HX find (native evidence)") },
    // src/index.ts native.node: `{ provider: entry.capabilityId.split(".")[0], type: "operation", id: entry.nativeId }`, refs sliced to 32.
    { id: "host-native-node", snapshot: hxNode({ provider: "hyperunix", type: "operation", id: evidence.nativeId }, handles.slice(0, 32), "HX find (host node)") },
    { id: "hyperunix-observer", snapshot: observed },
  ];
}

const refsOf = (source: HxSource): readonly string[] => source.snapshot.evidenceRefs ?? [];

function projectionOf(sources: readonly HxSource[]): ObservationProjection {
  const projection = new ObservationProjection({ maxEvents: 16, maxNodes: 16, maxEdges: 16, maxQuery: 8 });
  for (const source of sources) expect(projection.refresh(source.snapshot), source.id).toBe("applied");
  return projection;
}

/** The host's own store construction with every dependency supplied; each read seam is a spy that must never be called. */
function hostStore(projection: ObservationProjection) {
  const hx = hxRegistry();
  const invoke = vi.spyOn(hx.registry, "invoke");
  const claudeRead = vi.fn(async (): Promise<never> => {
    throw new Error("no transcript read is expected for an HX reference");
  });
  const furnaceClient = vi.fn((): never => {
    throw new Error("no furnace client is expected for an HX reference");
  });
  const grants = [...EVIDENCE_LOADER_ROWS.map(row => row.requiredGrant), ...hx.permissions];
  const store = createWorkbenchEvidenceStore({
    grants: () => [...grants],
    scope: () => scope,
    projection,
    cwd: () => WS,
    registry: () => hx.registry,
    claudeRead,
    furnaceClient,
    now: () => new Date(NOW),
  });
  return { store, grants, reads: [invoke, hx.find, hx.runtime, claudeRead, furnaceClient] as const };
}

const NO_LOADER = { state: "unavailable", reason: "no-loader" } as const;

/** Every docs/20 loader-contract module the store, its producers and the host wiring live in. */
const LOADER_CONTRACT = ["src/workbench/evidence-loader.ts", "src/workbench/evidence-producers.ts", "src/workbench/evidence-wiring.ts"] as const;
const NATIVE_EVIDENCE = "src/workbench/native-evidence.ts";
/** HX producer vocabulary in code: the provider and SDK name and the proof-handle fields, in any case. */
const HX_WORDS = /hyperunix|support_?ids|derivation_?handles/i;
/** An hx word in a token: hx-prefixed (hx-binary:, hx.fs/, hxLoader, HX_ROW, a bare hx) or a camel-case part (readHx, toHXRef). */
const HX_TOKEN = /(?:^|[^A-Za-z0-9])(?:hx|Hx|HX)(?:[A-Z_.:/-]|$)|[a-z](?:Hx|HX)(?:[A-Z_]|$)/;
/** A specifier of a loader-contract module or an evidence reader module (claude-, forge-, furnace- or any other -evidence). */
const LOADER_OR_READER = /evidence-(?:loader|producers|wiring)\.js$|-evidence\.js$/;

interface SourceCensus {
  /** One "file|provider" per loader-shaped construct: an object literal or class with both a canLoad and a load member. */
  readonly loaders: readonly string[];
  /** Every module specifier: import and export-from declarations, import() calls and types, require() calls. */
  readonly imports: readonly string[];
  /** Every string literal, template text or identifier that names HX vocabulary, as "file:line text"; comments are not code. */
  readonly hxNames: readonly string[];
}

const memberName = (name: ts.PropertyName | undefined): string | undefined =>
  name !== undefined && (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) ? name.text : undefined;

/** The source text of a loader-shaped construct's provider member: the literal itself, or the expression in angle brackets. */
function providerOf(members: readonly ts.Node[], sf: ts.SourceFile): string {
  for (const member of members) {
    if ((ts.isPropertyAssignment(member) || ts.isPropertyDeclaration(member)) && memberName(member.name) === "provider") {
      const value = member.initializer;
      if (value === undefined) return "<declared>";
      return ts.isStringLiteralLike(value) ? value.text : `<${value.getText(sf)}>`;
    }
    if (ts.isShorthandPropertyAssignment(member) && member.name.text === "provider") return "<provider>";
    if (ts.isGetAccessorDeclaration(member) && memberName(member.name) === "provider") return "<getter>";
  }
  return "<none>";
}

/** Reads one module's code tokens from its AST (never its comments): loader-shaped constructs, specifiers and HX names. */
function sourceCensus(file: string, text: string): SourceCensus {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const loaders: string[] = [];
  const imports: string[] = [];
  const hxNames: string[] = [];
  const line = (node: ts.Node): number => sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
  const visit = (node: ts.Node): void => {
    const members: readonly (ts.ObjectLiteralElementLike | ts.ClassElement)[] | undefined = ts.isObjectLiteralExpression(node) ? node.properties : ts.isClassLike(node) ? node.members : undefined;
    if (members !== undefined) {
      const names = new Set(members.map(member => memberName(member.name)));
      if (names.has("canLoad") && names.has("load")) loaders.push(`${file}|${providerOf(members, sf)}`);
    }
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
      imports.push(node.moduleSpecifier.text);
    }
    if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) {
      const first = node.arguments[0];
      if (first !== undefined && ts.isStringLiteralLike(first)) imports.push(first.text);
    }
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteral(node.argument.literal)) imports.push(node.argument.literal.text);
    const token = ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isIdentifier(node) ? node.text : undefined;
    if (token !== undefined && (HX_WORDS.test(token) || HX_TOKEN.test(token))) hxNames.push(`${file}:${line(node)} ${token}`);
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { loaders, imports, hxNames };
}

describe("wb-tz2.6 standing leg: HX evidence refs stay reference-only (docs/20 no-loader fallback)", () => {
  it("R0: one hyperunix.find provider output yields HX references on all three HX sources (frozen roster shape)", async () => {
    const sources = await hxSources();
    expect(sources.map(source => `${source.id}|${source.snapshot.source.provider}:${source.snapshot.source.type}|${refsOf(source).join(",")}`)).toEqual([
      "native-evidence|hyperunix:execution|hx-support:s1,hx-support:s2,hx-derivation:d1",
      "host-native-node|hyperunix:operation|hx-support:s1,hx-support:s2,hx-derivation:d1",
      `hyperunix-observer|hyperunix:query|hx-binary:sha256:${BINARY},hx-coverage:b1,hx-coverage:b2`,
    ]);
  });

  it("S1: the host store resolves every HX reference from each HX source to the typed unavailable no-loader entry and issues no read", async () => {
    const sources = await hxSources();
    const { store, grants, reads } = hostStore(projectionOf(sources));
    // Every loader grant and the HX read permission are held, so no refusal here can come from a missing grant.
    expect(grants).toEqual(["claude:transcript", "furnace:inspect", "forge:inspect", "hyperunix:read"]);
    let requested = 0;
    for (const source of sources) {
      for (const ref of refsOf(source)) {
        expect(store.get(scope, source.snapshot.source, ref), `${source.id} ${ref} before the request`).toEqual({ state: "not-requested" });
        await store.request(scope, source.snapshot.source, ref);
        const entry = store.get(scope, source.snapshot.source, ref);
        expect(entry, `${source.id} ${ref}`).toEqual(NO_LOADER);
        expect(entry.state, `${source.id} ${ref} is never loaded`).not.toBe("loaded");
        requested++;
      }
    }
    expect(requested).toBe(9);
    for (const read of reads) expect(read).not.toHaveBeenCalled();
  });

  it("S2: the details view keeps every HX reference listed as the visible unavailable: no-loader unknown, never a loaded label", async () => {
    let checked = 0;
    for (const source of await hxSources()) {
      const projection = projectionOf([source]);
      const { store } = hostStore(projection);
      const model: InspectorModel = { projection, scope, invocationId: INVOCATION, title: "HX evidence", status: "running", evidence: store };
      let state = reduceInspectorKey("j", initialInspectorState(), model)?.state ?? initialInspectorState();
      state = reduceInspectorKey("k", state, model)?.state ?? state;
      state = reduceInspectorKey("s", state, model)?.state ?? state;
      expect(state.view, source.id).toBe("details");
      const refs = refsOf(source);
      // Each reference's own row in both glyph tiers (the ascii tier draws the separator as "?"): "<pointer> <ref> <sep> <label>".
      const labels = (ascii: boolean): string[] => {
        const rows = layoutInspector(model, state, { width: 200, rows: 60, ascii });
        return refs.map(ref => {
          const own = rows.filter(row => row.includes(` ${ref} `));
          expect(own, `${source.id} ${ref} ascii=${ascii}: the reference stays listed on exactly one row`).toHaveLength(1);
          return (own[0] ?? "").slice((own[0] ?? "").indexOf(` ${ref} `) + ref.length + 2);
        });
      };
      for (const ascii of [true, false]) expect(labels(ascii), `${source.id} before the request`).toEqual(refs.map(() => `${ascii ? "?" : "·"} not loaded (Enter)`));
      for (const ref of refs) await store.request(scope, source.snapshot.source, ref);
      for (const ascii of [true, false]) {
        expect(labels(ascii), `${source.id} ascii=${ascii}`).toEqual(refs.map(() => `${ascii ? "?" : "·"} unavailable: no-loader`));
        const rendered = layoutInspector(model, state, { width: 200, rows: 60, ascii });
        expect(rendered.filter(row => /loaded [·?] \d+ bytes|not loaded \(Enter\)|verified/.test(row)), `${source.id} ascii=${ascii}`).toEqual([]);
      }
      checked += refs.length;
    }
    expect(checked).toBe(9);
  });

  it("S3: the loader contract modules hold exactly the three docs/20 producer loaders and name no HX producer, reference or module", () => {
    const census = LOADER_CONTRACT.map(file => sourceCensus(file, readRepo(file)));
    const loaders = census.flatMap(entry => entry.loaders);
    expect(loaders).toEqual(["src/workbench/evidence-producers.ts|claude-agent-sdk", "src/workbench/evidence-producers.ts|furnace", "src/workbench/evidence-producers.ts|forge"]);
    expect(loaders.map(entry => entry.slice(entry.indexOf("|") + 1))).toEqual(EVIDENCE_LOADER_ROWS.map(row => row.provider));
    expect(census.flatMap(entry => entry.hxNames)).toEqual([]);
    // The read set is real code: the store, the producers and the wiring each import something and the wiring builds the store.
    for (const [index, entry] of census.entries()) expect(entry.imports.length, LOADER_CONTRACT[index]).toBeGreaterThan(0);
    expect(census[2]?.imports).toContain("./evidence-producers.js");
  });

  it("S4: native-evidence.ts carries HX proof handles as references only: no loader, reader or HX import, and no basis claim", async () => {
    const own = sourceCensus(NATIVE_EVIDENCE, readRepo(NATIVE_EVIDENCE));
    expect(own.imports.length).toBeGreaterThan(0);
    expect(own.imports.filter(specifier => LOADER_OR_READER.test(specifier) || HX_WORDS.test(specifier) || HX_TOKEN.test(specifier))).toEqual([]);
    expect(own.loaders).toEqual([]);
    // The module does name HX: its hyperunix.find branch is the projection this row reads, so the scan is not blind to it.
    expect(own.hxNames.length).toBeGreaterThan(0);
    const { registry, permissions } = hxRegistry();
    const reading = await registry.invoke(CAPABILITY, TARGET, { grants: permissions, signal: new AbortController().signal });
    const evidence = nativeEvidence(CAPABILITY, reading);
    // Identity, domain status and the supplied handles, as supplied; the digest-shaped runtime query digest is never a basis.
    expect(evidence).toEqual({ provider: "hyperunix", nativeId: EXECUTION_ID, domainStatus: "incomplete", evidenceRefs: [...SUPPORT_IDS, ...DERIVATION_HANDLES] });
    expect(Object.keys(evidence).sort()).toEqual(["domainStatus", "evidenceRefs", "nativeId", "provider"]);
    expect(JSON.stringify(evidence)).not.toContain(QUERY_DIGEST);
    expect(nativeRefOf(evidence)).toEqual({ provider: "hyperunix", type: "execution", id: EXECUTION_ID });
  });

  it("F1: the source census names a loader-shaped literal and class, an HX import and HX names, and nothing in a clean source", () => {
    const fabricated = [
      'import { readHx } from "./hyperunix-evidence.js";',
      'const loader = { provider: "hyperunix", requiredGrant: "hyperunix:read", canLoad: (ref: string) => ref.startsWith("hx-derivation:"), load: async () => readHx() };',
      "class HxLoader { readonly provider = PROVIDER; canLoad() { return true; } async load() { return readHx(); } }",
      "export const parts = [loader, HxLoader];",
    ].join("\n");
    const found = sourceCensus("synthetic.ts", fabricated);
    expect(found.loaders).toEqual(["synthetic.ts|hyperunix", "synthetic.ts|<PROVIDER>"]);
    expect(found.imports).toEqual(["./hyperunix-evidence.js"]);
    expect(found.imports.filter(specifier => LOADER_OR_READER.test(specifier))).toEqual(["./hyperunix-evidence.js"]);
    expect(found.hxNames).toEqual([
      "synthetic.ts:1 readHx",
      "synthetic.ts:1 ./hyperunix-evidence.js",
      "synthetic.ts:2 hyperunix",
      "synthetic.ts:2 hyperunix:read",
      "synthetic.ts:2 hx-derivation:",
      "synthetic.ts:2 readHx",
      "synthetic.ts:3 HxLoader",
      "synthetic.ts:3 readHx",
      "synthetic.ts:4 HxLoader",
    ]);
    // A comment is not code: it may name HX freely and is never reported.
    expect(sourceCensus("clean.ts", '// hyperunix and hx-binary refs stay unloadable\nimport { a } from "./a.js";\nexport const b = { canLoad: a };\n')).toEqual({ loaders: [], imports: ["./a.js"], hxNames: [] });
  });
});
