import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runCompactionInheritance, persistAll, provenanceChecked, oracleCompactionOutcome, compactionStateHash, labelCompactionEpisode, summaryProvenance, digest, canonicalJson } from "../dist/index.js";
import type { CompactionInheritanceEpisode, CompactionObservation, CompactionState, Intent, Policy } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(here, "../../../qa/integration/python-consumer/fixtures/compaction-inheritance-seed7.json");
const base = { tasks: 8 };

/** Mirror of the statement-anchored matcher exported by package-placement.test.ts (stripComments, IMPORT_CLAUSE, importsOf).
 * It is mirrored, not imported: importing a sibling *.test.ts re-registers that file's tests inside this one. */
const stripComments = (source: string): string => {
  let out = "";
  let i = 0;
  while (i < source.length) {
    const ch = source[i]!;
    const next = source[i + 1];
    if (ch === "/" && next === "/") {
      while (i < source.length && source[i] !== "\n") i++;
    } else if (ch === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      i = end === -1 ? source.length : end + 2;
      out += " ";
    } else if (ch === '"' || ch === "'" || ch === "`") {
      out += ch;
      i++;
      while (i < source.length && source[i] !== ch) {
        if (source[i] === "\\") { out += source[i]!; i++; }
        if (i < source.length) { out += source[i]!; i++; }
      }
      if (i < source.length) { out += ch; i++; }
    } else {
      out += ch;
      i++;
    }
  }
  return out;
};
const IMPORT_CLAUSE = /(?:^|[;{}])[ \t]*(?:import|export)\b[^;"'`]*?\bfrom\s*(["'])([^"'\n]+)\1|(?:^|[;{}])[ \t]*import\s*(["'])([^"'\n]+)\3|\bimport\s*\(\s*(["'])([^"'\n]+)\5/gm;
const importsOf = (source: string): string[] =>
  [...stripComments(source).matchAll(IMPORT_CLAUSE)].map(match => match[2] ?? match[4] ?? match[6]!);

/** Source fixtures for the statement-anchored import-specifier matcher: none of these names a module. */
const NON_SPECIFIER_FIXTURES: Readonly<Record<string, string>> = {
  "quoted from property key": 'const edge = { "from": "a", to: "b" };\nconst pair = ["from", "to"];\nconst x = edge["from"];\n',
  "from inside a line comment": '// copied from "elsewhere"\nconst x = 1;\n',
  "from inside a block comment": '/* import y from "elsewhere" */\nconst x = 1;\n',
  "from inside a string literal": 'const m = \'value came from "unknown"\';\nconst t = `read from "${m}"`;\n',
  "multi-line block comment whose inner line starts with an import": '/*\nimport y from "./elsewhere.js";\n*/\nconst x = 1;\n',
  "line comment naming a dynamic import": '// import("./elsewhere.js")\nconst x = 1;\n',
  "string literal holding a whole from-clause": 'const s = \'import y from "./elsewhere.js"\';\n',
  "string literal holding a side-effect import": 'const s = \'import "./elsewhere.js"\';\n'
};
/** Source fixtures that each name exactly ./a.js as a module specifier. */
const SPECIFIER_FIXTURES: Readonly<Record<string, string>> = {
  "static default import": 'import a from "./a.js";\n',
  "single-quoted import": "import a from './a.js';\n",
  "type-only import": 'import type { A } from "./a.js";\n',
  "export-from": 'export { a } from "./a.js";\n',
  "side-effect import": 'import "./a.js";\n',
  "dynamic import": 'const m = await import("./a.js");\n',
  "side-effect import after a string holding a url": 'const u = "http://x.test"; import "./a.js";\n',
  "type re-export after a closing brace": 'function f() { return 1 } export type { S } from "./a.js";\n',
  "value re-export after a closing brace": 'function f() { return 1 } export { a } from "./a.js";\n',
  "side-effect import after a closing brace": 'function f() { return 1 } import "./a.js";\n',
  "from-clause re-export after an opening brace in an ambient module body": 'declare module "m" { export * from "./a.js"; }\n',
  "side-effect import after an opening brace in an ambient module body": 'declare module "m" { import "./a.js"; }\n',
  "from-clause re-export after a semicolon on the same line": 'const a = 1; export { b } from "./a.js";\n',
  "from-clause default import after a semicolon on the same line": "const a = 1; import b from './a.js';\n"
};

function corruptedTasks(episode: CompactionInheritanceEpisode): string[] {
  return episode.final.events.filter(event => event.kind === "corrupted").map(event => event.summary as string);
}

test("the fixture is deterministic: one seed gives byte-identical episodes, state hashes and event histories; another seed or task count changes the hash", () => {
  const a = runCompactionInheritance({ ...base, seed: 7, policy: provenanceChecked });
  const b = runCompactionInheritance({ ...base, seed: 7, policy: provenanceChecked });
  assert.equal(canonicalJson(a), canonicalJson(b));
  assert.equal(a.finalHash, compactionStateHash(a.final));
  assert.match(a.finalHash, /^sha256:[0-9a-f]{64}$/);
  assert.notEqual(runCompactionInheritance({ ...base, seed: 8, policy: provenanceChecked }).finalHash, a.finalHash);
  assert.notEqual(runCompactionInheritance({ ...base, tasks: 9, seed: 7, policy: provenanceChecked }).finalHash, a.finalHash);
  assert.equal(a.mode, "fixture");
  assert.equal(a.schema, "mw.compaction-inheritance.fixture.v1");
});

test("a seeded corruption draw alters a summary so its recorded provenance no longer matches the digest of what it now holds; the world replaces a worker on every step", () => {
  const episode = runCompactionInheritance({ ...base, seed: 7, policy: persistAll });
  const bad = corruptedTasks(episode);
  assert.ok(bad.length >= 1 && bad.length < base.tasks, `seed 7 corrupted ${bad.length} of ${base.tasks}`);
  for (const summary of episode.final.summaries) {
    const valid = summaryProvenance(summary.source, summary.body) === summary.provenance;
    assert.equal(valid, !bad.includes(summary.id), `${summary.id} validity disagrees with the corruption events`);
  }
  assert.equal(episode.final.events.filter(event => event.kind === "replaced").length, base.tasks);
  assert.equal(episode.final.worker, base.tasks);
});

test("persistAll reproduces the corrupted-summary failure: a corrupted summary is persisted, consumed downstream, and the history carries a downstream-failed event naming the digest mismatch", () => {
  const episode = runCompactionInheritance({ ...base, seed: 7, policy: persistAll });
  const bad = corruptedTasks(episode);
  const failed = episode.final.events.filter(event => event.kind === "downstream-failed");
  assert.deepEqual(failed.map(event => event.summary), bad);
  for (const event of failed) assert.match(event.detail, /provenance mismatch: recorded sha256:[0-9a-f]{64} recomputed sha256:[0-9a-f]{64}/);
  assert.deepEqual(episode.final.outcomes.filter(outcome => outcome.status === "failed").map(outcome => outcome.summary), bad);
  assert.equal(episode.final.events.filter(event => event.kind === "omitted").length, 0);
});

test("provenanceChecked omits each corrupted summary with an omitted event carrying the digest mismatch, routes a rediscovery, and still completes every task", () => {
  const episode = runCompactionInheritance({ ...base, seed: 7, policy: provenanceChecked });
  const bad = corruptedTasks(episode);
  const omitted = episode.final.events.filter(event => event.kind === "omitted");
  assert.deepEqual(omitted.map(event => event.summary), bad);
  for (const event of omitted) assert.match(event.detail, /provenance mismatch: recorded sha256:[0-9a-f]{64} recomputed sha256:[0-9a-f]{64}/);
  assert.deepEqual(episode.final.events.filter(event => event.kind === "routed").map(event => event.summary), bad);
  assert.equal(episode.final.events.filter(event => event.kind === "downstream-failed").length, 0);
  assert.equal(episode.final.outcomes.length, base.tasks);
  assert.ok(episode.final.outcomes.every(outcome => outcome.status === "succeeded" || outcome.status === "rediscovered"));
  assert.deepEqual(episode.final.outcomes.filter(outcome => outcome.status === "rediscovered").map(outcome => outcome.summary), bad);
  assert.ok(episode.final.summaries.filter(summary => bad.includes(summary.id)).every(summary => summary.status === "omitted"));
});

test("the harness and the independent oracle agree on statuses, cost and score for both policies across several seeds, and provenanceChecked scores higher once any summary is corrupted", () => {
  for (const seed of [7, 11, 23, 99]) {
    for (const [policy, name] of [[persistAll, "persist-all"], [provenanceChecked, "provenance-checked"]] as const) {
      const episode = runCompactionInheritance({ ...base, seed, policy });
      const oracle = oracleCompactionOutcome({ ...base, seed, policy: name });
      assert.deepEqual(episode.final.outcomes.map(outcome => outcome.status), oracle.statuses, `${name} seed ${seed}`);
      assert.equal(episode.final.cost, oracle.cost, `${name} seed ${seed} cost`);
      assert.equal(episode.final.score, oracle.score, `${name} seed ${seed} score`);
    }
    const checked = oracleCompactionOutcome({ ...base, seed, policy: "provenance-checked" });
    const naive = oracleCompactionOutcome({ ...base, seed, policy: "persist-all" });
    if (naive.statuses.includes("failed")) assert.ok(checked.score > naive.score, `seed ${seed}`);
    else assert.equal(checked.score, naive.score);
  }
});

test("every policy step is pure: the same observation, memory and context give the same proposal, and a run never reads the clock, the filesystem or the environment", () => {
  const episode = runCompactionInheritance({ ...base, seed: 7, policy: provenanceChecked });
  const step = episode.steps[2]!;
  const observation: CompactionObservation = { basis: { workspaceId: "fixture:compaction-inheritance", revision: "step-2" }, step: 3, worker: 3, summary: episode.final.summaries[2]!, completed: 2 };
  const context = { episodeId: "e", actorId: "a", observationDigest: step.observationDigest, budget: { compute: 4, workers: 4, queue: 8, latencyMs: 1000 }, authority: "propose-only" as const, policyRevision: "fixture-1", seed: 7 };
  assert.equal(canonicalJson(provenanceChecked.propose(observation, 0, context)), canonicalJson(provenanceChecked.propose(observation, 0, context)));
  const source = readFileSync(join(here, "../src/compaction-inheritance.ts"), "utf8");
  assert.doesNotMatch(source, /Date\.now|new Date|Math\.random|from "node:fs"|from "node:child_process"|process\.env|fetch\(/);
});

test("compact re-derives a corrupted summary from its source and annotate records a note: both are typed intents, their events are recorded, and a repaired summary is persisted valid", () => {
  const repairing: Policy<CompactionObservation, Intent, number> = {
    id: "repairing", revision: "t-1",
    propose(observation, memory) {
      const summary = observation.summary;
      const intent = (effect: string): Intent => ({
        intentId: `repairing:${effect}:${summary.id}`, policyId: "repairing", target: { kind: "summary", uri: `sum:${summary.id}` },
        expectedRevision: observation.basis.revision, effect, claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
        evidenceRefs: [], writeScopes: [`sum:${summary.id}:${effect}`], readScopes: [],
      });
      return { intents: [intent("annotate"), intent("compact"), intent("persist")], memory: memory + 1, trace: [] };
    },
  };
  const episode = runCompactionInheritance({ ...base, seed: 7, policy: repairing });
  const bad = corruptedTasks(episode);
  assert.deepEqual(episode.final.events.filter(event => event.kind === "compacted").map(event => event.summary), bad);
  assert.equal(episode.final.events.filter(event => event.kind === "annotated").length, base.tasks);
  assert.equal(episode.final.events.filter(event => event.kind === "downstream-failed").length, 0);
  assert.ok(episode.final.summaries.every(summary => summaryProvenance(summary.source, summary.body) === summary.provenance));
  assert.equal(episode.final.cost, base.tasks + bad.length, "one persist per task plus one repair per corrupted summary");
});

test("an effect outside the compaction effects is refused with an event, and a policy that proposes nothing leaves the task unresolved at zero cost", () => {
  const odd: Policy<CompactionObservation, Intent, number> = {
    id: "odd", revision: "t-1",
    propose(observation, memory) {
      return { intents: [{
        intentId: "odd:x", policyId: "odd", target: { kind: "summary", uri: `sum:${observation.summary.id}` }, expectedRevision: observation.basis.revision,
        effect: "teleport", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: ["x"], readScopes: [],
      }], memory: memory + 1, trace: [] };
    },
  };
  const refused = runCompactionInheritance({ tasks: 2, seed: 7, policy: odd });
  assert.equal(refused.final.events.filter(event => event.kind === "refused" && /teleport/.test(event.detail)).length, 2);
  assert.deepEqual(refused.final.outcomes.map(outcome => outcome.status), ["unresolved", "unresolved"]);
  const silent: Policy<CompactionObservation, Intent, number> = { id: "silent", revision: "t-1", propose: (_o, memory) => ({ intents: [], memory, trace: [] }) };
  const quiet = runCompactionInheritance({ tasks: 3, seed: 7, policy: silent });
  assert.equal(quiet.final.cost, 0);
  assert.equal(quiet.final.score, 0);
  assert.deepEqual(quiet.final.outcomes.map(outcome => outcome.status), ["unresolved", "unresolved", "unresolved"]);
});

test("a compaction episode is labelled fixture and refuses any relabelling with EPISODE_MODE_UPGRADE_FORBIDDEN", () => {
  const episode = runCompactionInheritance({ ...base, seed: 7, policy: provenanceChecked });
  assert.equal(labelCompactionEpisode(episode, "fixture").mode, "fixture");
  for (const mode of ["live", "replay", "live-verified"]) {
    assert.throws(() => labelCompactionEpisode(episode, mode), new RegExp(`EPISODE_MODE_UPGRADE_FORBIDDEN: .*${mode}`));
  }
});

test("the committed cross-language fixture equals the regenerated seed-7 provenance-checked episode byte for byte, and its final hash is the digest of its final state", () => {
  const committed = readFileSync(fixturePath, "utf8");
  const regenerated = runCompactionInheritance({ ...base, seed: 7, policy: provenanceChecked });
  assert.equal(committed.trimEnd(), canonicalJson(regenerated));
  const parsed = JSON.parse(committed) as CompactionInheritanceEpisode;
  assert.equal(parsed.finalHash, digest(parsed.final as CompactionState));
});

test("pin c8 e1: only the first deciding intent settles a task; a second persist and a late route are each refused with an event", () => {
  const twice: Policy<CompactionObservation, Intent, number> = {
    id: "twice", revision: "t-1",
    propose(observation, memory) {
      const summary = observation.summary;
      const intent = (name: string, effect: string, kind: string, uri: string): Intent => ({
        intentId: `twice:${name}:${summary.id}`, policyId: "twice", target: { kind, uri },
        expectedRevision: observation.basis.revision, effect, claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
        evidenceRefs: [], writeScopes: [`${name}:${summary.id}`], readScopes: [],
      });
      return { intents: [intent("persist-a", "persist", "summary", `sum:${summary.id}`), intent("persist-b", "persist", "summary", `sum:${summary.id}`), intent("route", "route", "task", `task:${summary.task}`)], memory: memory + 1, trace: [] };
    },
  };
  const episode = runCompactionInheritance({ ...base, seed: 7, policy: twice });
  assert.equal(episode.final.outcomes.length, base.tasks);
  assert.equal(episode.final.events.filter(event => event.kind === "persisted").length, base.tasks);
  assert.equal(episode.final.events.filter(event => event.kind === "routed").length, 0);
  for (const summary of episode.final.summaries) {
    assert.equal(episode.final.events.filter(event => event.kind === "refused" && event.summary === summary.id && /\bpersist\b/.test(event.detail)).length, 1, summary.id);
  }
  assert.equal(episode.final.events.filter(event => event.kind === "refused" && event.summary === null && /\broute\b/.test(event.detail)).length, base.tasks);
});

test("pin c8 e2: an annotate event records whether the provenance it observed was valid", () => {
  const noting: Policy<CompactionObservation, Intent, number> = {
    id: "noting", revision: "t-1",
    propose(observation, memory) {
      const summary = observation.summary;
      const intent = (effect: string): Intent => ({
        intentId: `noting:${effect}:${summary.id}`, policyId: "noting", target: { kind: "summary", uri: `sum:${summary.id}` },
        expectedRevision: observation.basis.revision, effect, claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
        evidenceRefs: [], writeScopes: [`sum:${summary.id}:${effect}`], readScopes: [],
      });
      return { intents: [intent("annotate"), intent("persist")], memory: memory + 1, trace: [] };
    },
  };
  const episode = runCompactionInheritance({ ...base, seed: 7, policy: noting });
  const bad = corruptedTasks(episode);
  const annotated = episode.final.events.filter(event => event.kind === "annotated");
  assert.ok(bad.length >= 1);
  assert.equal(annotated.length, base.tasks);
  for (const event of annotated) assert.match(event.detail, bad.includes(event.summary as string) ? /with invalid provenance/ : /with valid provenance/, String(event.summary));
});

test("pin c8 e3: provenanceChecked's omit intent carries the recorded and recomputed digests as evidence", () => {
  const episode = runCompactionInheritance({ ...base, seed: 7, policy: provenanceChecked });
  const bad = corruptedTasks(episode);
  const omits = episode.steps.flatMap(step => step.resolution.admitted.filter(intent => intent.effect === "omit"));
  assert.deepEqual(omits.map(intent => intent.target.uri), bad.map(id => `sum:${id}`));
  for (const intent of omits) {
    const summary = episode.final.summaries.find(candidate => `sum:${candidate.id}` === intent.target.uri);
    assert.ok(summary);
    assert.deepEqual(intent.evidenceRefs, [`recorded:${summary.provenance}`, `recomputed:${summaryProvenance(summary.source, summary.body)}`]);
  }
});

test("pin c8 e4: within a step the replacement and any corruption are recorded before the policy's applied effects", () => {
  for (const policy of [persistAll, provenanceChecked]) {
    const episode = runCompactionInheritance({ ...base, seed: 7, policy });
    for (const step of episode.steps) {
      assert.equal(step.events[0]?.kind, "replaced", `${policy.id} step ${step.step}`);
      const corrupted = step.events.findIndex(event => event.kind === "corrupted");
      if (corrupted >= 0) assert.equal(corrupted, 1, `${policy.id} step ${step.step}`);
    }
  }
});

test("pin c8 e5: the purity scan also refuses bare node builtin specifiers and the performance clock", () => {
  const source = readFileSync(join(here, "../src/compaction-inheritance.ts"), "utf8");
  assert.doesNotMatch(source, /from "(node:)?(fs|child_process|net|http|https|os)"|require\(|performance\.now|Date\.now|new Date|Math\.random|process\.env|fetch\(/);
});

test("pin e5b: the purity scan refuses every non-relative import specifier in either quote style, subpath builtins, dynamic import and the hrtime clock", () => {
  const source = readFileSync(join(here, "../src/compaction-inheritance.ts"), "utf8");
  const specifiers = importsOf(source);
  assert.ok(specifiers.length > 0);
  for (const specifier of specifiers) assert.match(specifier, /^\.\.?\//, `non-relative import specifier ${specifier}`);
  assert.doesNotMatch(source, /\bimport\s*\(|\brequire\s*\(|process\.hrtime|performance\.now|process\.env/);
});

test("pin e5c matcher: no specifier for a quoted from key, a comment or a string literal, and ./a.js for every real import form", () => {
  for (const [name, source] of Object.entries(NON_SPECIFIER_FIXTURES)) assert.deepEqual(importsOf(source), [], name);
  for (const [name, source] of Object.entries(SPECIFIER_FIXTURES)) assert.deepEqual(importsOf(source), ["./a.js"], name);
});

test("pin W7 matcher drift: the mirrored stripComments, IMPORT_CLAUSE and importsOf equal the package-placement export line for line", () => {
  const matcherLines = (file: string): string[] => {
    const lines = readFileSync(join(here, file), "utf8").split("\n").map(line => line.replace(/^export /, "")).filter(line => line.trim() !== "" && !/^\s*(\/\*\*|\*|\/\/)/.test(line));
    const start = lines.findIndex(line => line.startsWith("const stripComments"));
    const end = lines.findIndex(line => line.startsWith("const importsOf"));
    assert.ok(start >= 0 && end > start, `matcher block not found in ${file}`);
    return lines.slice(start, end + 2);
  };
  assert.deepEqual(matcherLines("compaction-inheritance.test.ts"), matcherLines("package-placement.test.ts"));
});
