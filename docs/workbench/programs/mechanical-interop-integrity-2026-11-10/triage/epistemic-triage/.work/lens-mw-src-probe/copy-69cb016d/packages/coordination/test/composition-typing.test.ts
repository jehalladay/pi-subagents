import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// CAC-WC 01 (a): a composition validates type compatibility between composed steps. The prior art is
// combinator typing: the combinators' generics are the validator, and they run at composition time in
// tsc, not at runtime. These laws drive tsc over fixtures against the built declarations: compatible
// compositions type-check, and each incompatible one is refused with TS2345 at the composition site.

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..", "..");
const dist = join(here, "..", "dist", "index.js");
const tsc = join(repoRoot, "node_modules", ".bin", "tsc");

const preamble = `import { sequential, sequentialAccepted, parallel, guarded, guardedWithWitness, alternative, inhibit, repeated } from ${JSON.stringify(dist)};
import type { Policy, Intent, Guard, WitnessedGuard, Selector, SequentialObservation, AcceptedSequentialObservation, SequentialAcceptance, PolicyContext, RepeatedSpec } from ${JSON.stringify(dist)};
interface Obs { readonly note: string }
interface Other { readonly count: number }
interface NarrowIntent extends Intent { readonly effect: "narrow" }
interface WideIntent extends Intent { readonly effect: "wide" }
declare const p: Policy<Obs, Intent, null>;
declare const qSame: Policy<Obs, Intent, null>;
declare const qSeq: Policy<SequentialObservation<Obs, Intent, null>, Intent, null>;
declare const qAccepted: Policy<AcceptedSequentialObservation<Obs, Intent, null>, Intent, null>;
declare const qOther: Policy<Other, Intent, null>;
declare const guardNull: Guard<Intent, null>;
declare const guardNumber: Guard<Intent, number>;
declare const witnessNull: WitnessedGuard<Intent, null>;
declare const witnessNumber: WitnessedGuard<Intent, number>;
declare const qSeqNumber: Policy<SequentialObservation<Obs, Intent, number>, Intent, null>;
declare const qAcceptedNumber: Policy<AcceptedSequentialObservation<Obs, Intent, number>, Intent, null>;
declare const specNull: RepeatedSpec<Obs, Intent, null>;
declare const specNumber: RepeatedSpec<Obs, Intent, number>;
declare const specOther: RepeatedSpec<Other, Intent, null>;
declare const pNarrow: Policy<Obs, NarrowIntent, null>;
declare const qSeqWide: Policy<SequentialObservation<Obs, NarrowIntent, null>, WideIntent, null>;
declare const selectObs: Selector<Obs>;
declare const selectOther: Selector<Other>;
declare const acceptance: SequentialAcceptance;
declare const ctx: PolicyContext;
export {};
`;
const PREAMBLE_LINES = preamble.split("\n").length - 1;

const fixtures: Record<string, string> = {
  "ok.ts": [
    "sequential(p, qSeq);",
    "sequentialAccepted(p, qAccepted, acceptance);",
    "parallel(p, qSame);",
    "guarded(p, guardNull, qSame);",
    "guardedWithWitness(p, witnessNull, qSame);",
    "repeated(p, specNull);",
    "alternative(p, qSame, selectObs);",
    "inhibit(p, qSame);",
    "parallel(p, qSame).propose({ note: \"x\" }, [null, null], ctx);",
  ].join("\n") + "\n",
  "bad-sequential.ts": "sequential(p, qSame);\n",
  "bad-sequential-accepted.ts": "sequentialAccepted(p, qSame, acceptance);\n",
  "bad-parallel.ts": "parallel(p, qOther);\n",
  "bad-guarded.ts": "guarded(p, guardNumber, qSame);\n",
  "bad-guarded-witness.ts": "guardedWithWitness(p, witnessNumber, qSame);\n",
  "bad-sequential-memory.ts": "sequential(p, qSeqNumber);\n",
  "bad-sequential-accepted-memory.ts": "sequentialAccepted(p, qAcceptedNumber, acceptance);\n",
  "bad-repeated.ts": "repeated(p, specNumber);\n",
  "bad-alternative.ts": "alternative(p, qSame, selectOther);\n",
  "bad-memory.ts": "parallel(p, qSame).propose({ note: \"x\" }, [null], ctx);\n",
  "bad-guarded-observation.ts": "guarded(p, guardNull, qOther);\n",
  "bad-guarded-witness-observation.ts": "guardedWithWitness(p, witnessNull, qOther);\n",
  "bad-alternative-observation.ts": "alternative(p, qOther, selectObs);\n",
  "bad-inhibit.ts": "inhibit(p, qOther);\n",
  "bad-repeated-observation.ts": "repeated(p, specOther);\n",
  "bad-sequential-intent.ts": "sequential(pNarrow, qSeqWide);\n",
  "bad-sequential-composed-memory.ts": "sequential(p, qSeq).propose({ note: \"x\" }, [null], ctx);\n",
};

interface Diagnostic { readonly file: string; readonly line: number; readonly code: string }

function typecheck(): readonly Diagnostic[] {
  const dir = mkdtempSync(join(tmpdir(), "mechanical-composition-typing-"));
  try {
    writeFileSync(join(dir, "package.json"), JSON.stringify({ type: "module" }));
    writeFileSync(join(dir, "tsconfig.json"), JSON.stringify({
      extends: join(repoRoot, "tsconfig.base.json"),
      compilerOptions: { noEmit: true, types: [], rootDir: "." },
      include: ["*.ts"],
    }));
    for (const [name, body] of Object.entries(fixtures)) writeFileSync(join(dir, name), preamble + body);
    const run = spawnSync(tsc, ["-p", join(dir, "tsconfig.json"), "--pretty", "false"], { encoding: "utf8", cwd: dir });
    assert.ok(run.status === 0 || run.status === 2, `tsc exited ${run.status}: ${run.stderr}`);
    const diagnostics: Diagnostic[] = [];
    for (const line of run.stdout.split("\n")) {
      const match = /^(?:.*[\\/])?([\w.-]+\.ts)\((\d+),\d+\): error (TS\d+):/.exec(line);
      if (match) diagnostics.push({ file: match[1]!, line: Number(match[2]), code: match[3]! });
    }
    return diagnostics;
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

const diagnostics = typecheck();
const errorsIn = (file: string): readonly Diagnostic[] => diagnostics.filter(d => d.file === file);

test("compatible compositions type-check: a successor whose input follows from its predecessor's output, same-observation parallel/guarded/alternative, and a matching memory tuple", () => {
  assert.deepEqual(errorsIn("ok.ts"), []);
  assert.ok(diagnostics.length > 0, "the negative controls must produce diagnostics; a silent tsc run proves nothing");
});

test("sequential refuses a successor that observes the predecessor's observation instead of its output", () => {
  assert.deepEqual(errorsIn("bad-sequential.ts").map(d => [d.code, d.line]), [["TS2345", PREAMBLE_LINES + 1]]);
});

test("sequentialAccepted refuses a successor that does not observe the accepted output", () => {
  assert.deepEqual(errorsIn("bad-sequential-accepted.ts").map(d => [d.code, d.line]), [["TS2345", PREAMBLE_LINES + 1]]);
});

test("parallel refuses two policies over different observation types", () => {
  assert.deepEqual(errorsIn("bad-parallel.ts").map(d => [d.code, d.line]), [["TS2345", PREAMBLE_LINES + 1]]);
});

test("the predecessor's memory type is the contract even when it is null: a guard, witnessed guard, successor or repeat spec typed over another memory is refused", () => {
  // tsc drops a `null` inference candidate when another candidate exists, so without NoInfer at the
  // consuming positions the guard or successor would silently decide the memory type instead of P.
  for (const file of ["bad-guarded.ts", "bad-guarded-witness.ts", "bad-sequential-memory.ts", "bad-sequential-accepted-memory.ts", "bad-repeated.ts"]) {
    assert.deepEqual(errorsIn(file).map(d => [d.code, d.line]), [["TS2345", PREAMBLE_LINES + 1]], file);
  }
});

test("alternative refuses a selector over an observation type the alternatives do not share", () => {
  assert.deepEqual(errorsIn("bad-alternative.ts").map(d => [d.code, d.line]), [["TS2345", PREAMBLE_LINES + 1]]);
});

test("the composed memory shape is part of the contract: a one-element memory for a two-policy composition is refused", () => {
  assert.deepEqual(errorsIn("bad-memory.ts").map(d => [d.code, d.line]), [["TS2345", PREAMBLE_LINES + 1]]);
  for (const d of diagnostics) assert.ok(d.file in fixtures, `diagnostic outside the fixtures: ${JSON.stringify(d)}`);
});

test("the shared observation type binds the second policy of guarded, guardedWithWitness, alternative and inhibit and the repeat spec: an unrelated observation type is refused", () => {
  // A declaration that widened the second policy's observation (to unknown, say) would admit these
  // compositions silently; each fixture is the one composition that the widening would let through.
  for (const file of ["bad-guarded-observation.ts", "bad-guarded-witness-observation.ts", "bad-alternative-observation.ts", "bad-inhibit.ts", "bad-repeated-observation.ts"]) {
    assert.deepEqual(errorsIn(file).map(d => [d.code, d.line]), [["TS2345", PREAMBLE_LINES + 1]], file);
  }
});

test("sequential binds one intent type across both steps: a successor that proposes a wider intent than its predecessor is refused", () => {
  assert.deepEqual(errorsIn("bad-sequential-intent.ts").map(d => [d.code, d.line]), [["TS2345", PREAMBLE_LINES + 1]]);
});

test("the sequential composed memory is a required two-element tuple: a one-element memory is refused", () => {
  assert.deepEqual(errorsIn("bad-sequential-composed-memory.ts").map(d => [d.code, d.line]), [["TS2345", PREAMBLE_LINES + 1]]);
});
