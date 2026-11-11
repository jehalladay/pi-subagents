import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import ts from "typescript";

/**
 * TW-EAT-R013 (MechanicalWorkflows-uq7o): with no explicit opt-in, adapter and exercise code paths perform zero native
 * process invocations. A child process wraps every node:child_process entry point in a counting shim, imports every
 * built rig module, then drives each opt-in entry point without its opt-in; the shim must record zero calls.
 */
const dist = new URL("../dist/", import.meta.url);
const distDir = dist.pathname;
const srcDir = new URL("../src/", import.meta.url).pathname;
const packagesDir = new URL("../../../packages/", import.meta.url).pathname;
/**
 * Import-time entrypoints, excluded by name: cli.js runs its main() at import (driven as a process in cli.test.ts) and
 * furnace-app.js awaits the optional @furnace/sdk at import (absent by design; furnace-app-wiring.ts carries its logic).
 */
const ENTRYPOINTS = ["cli.js", "furnace-app.js"] as const;
/** Any quoted or backtick-quoted node:child_process specifier, prefixed or bare: static from, side-effect import, dynamic import() and require all carry one, and a template literal without substitutions is a specifier too. */
const NATIVE_SPECIFIER = /["'`](?:node:)?child_process["'`]/;
const SHIMMED = ["exec", "execFile", "execFileSync", "execSync", "spawn", "spawnSync", "fork"] as const;
/** The 25 code points String.prototype.trim strips (WhiteSpace plus LineTerminator): the blank-root probe walks every one, alone and as one run, so no blank class missing a member passes. */
const TRIM_CODE_POINTS = [
  0x0009, 0x000a, 0x000b, 0x000c, 0x000d, 0x0020, 0x00a0, 0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006,
  0x2007, 0x2008, 0x2009, 0x200a, 0x2028, 0x2029, 0x202f, 0x205f, 0x3000, 0xfeff,
] as const;
const TRIM_POINTS = TRIM_CODE_POINTS.map(c => String.fromCodePoint(c));
/** The ten code points just outside that class (the C0 separators, NEL, the Mongolian vowel separator, the zero-width run and the word joiner): trim() keeps each one, so each stands as a root by itself. */
const OUTSIDE_TRIM_CODE_POINTS = [0x001c, 0x001d, 0x001e, 0x001f, 0x0085, 0x180e, 0x200b, 0x200c, 0x200d, 0x2060] as const;
const OUTSIDE_TRIM_POINTS = OUTSIDE_TRIM_CODE_POINTS.map(c => String.fromCodePoint(c));
/** Roots with real text that carry white space at an edge or inside: the precondition admits each one verbatim-valued, because only an all-blank root is refused. */
const SPACED_TEXT_ROOTS = ["   /scratch/root", "/scratch/root\t", "\n/scratch/root\r", "/scratch/my root", "\u3000/scratch/root\ufeff"] as const;
/** Roots a path normaliser or a length cap would rewrite: doubled, dot-segment and trailing separators, a bare double separator, and roots at the 1025, 4097 and 65537 unit lengths; the precondition hands each one on untouched. */
const PATH_SHAPED_ROOTS = [
  "/scratch//root", "/scratch/./root", "/scratch/root/", "//", "/", "/" + "r".repeat(1024), "/" + "r".repeat(4096), "/" + "r".repeat(65536),
] as const;
/** Runs and wraps of the ten outside points: each doubled, each wrapped in one space, each wrapped in two different trim() points, the ten as one run, and one outside point inside text. */
const OUTSIDE_RUN_AND_WRAP_ROOTS = [
  ...OUTSIDE_TRIM_POINTS.map(p => p + p),
  ...OUTSIDE_TRIM_POINTS.map(p => " " + p + " "),
  ...OUTSIDE_TRIM_POINTS.map(p => "\u3000" + p + "\ufeff"),
  OUTSIDE_TRIM_POINTS.join(""), OUTSIDE_TRIM_POINTS.join("") + OUTSIDE_TRIM_POINTS.join(""), "a\u200bb",
];
/** Multi-code-point roots a case fold, a normalisation form or a well-formed rewrite would change: upper-case letters, a combining sequence, a singleton with a canonical decomposition and two lone surrogates; the precondition hands each one on untouched. */
const REWRITABLE_TEXT_ROOTS = ["/Scratch/Root", "/SCRATCH/ROOT", "/scratch/cafe\u0301", "/scratch/\u212b", "/scratch/\ud800root", "/scratch/root\udfff"] as const;
/** Each of the ten outside points at the start of a root, at its end and between two letters: an edge or interior invisible-character strip would change every one. */
const OUTSIDE_EDGE_AND_INTERIOR_ROOTS = [
  ...OUTSIDE_TRIM_POINTS.map(p => p + "/scratch/root"),
  ...OUTSIDE_TRIM_POINTS.map(p => "/scratch/root" + p),
  ...OUTSIDE_TRIM_POINTS.map(p => "a" + p + "b"),
];
/** Roots a path resolver or expander would rewrite: parent and leading-dot segments, a trailing dot segment, backslash separators in drive and UNC form, and a tilde home; the precondition hands each one on untouched. */
const RESOLVABLE_PATH_ROOTS = ["/scratch/../root", "./root", "./scratch/root", "/scratch/root/.", "c:\\scratch\\root", "\\\\host\\share\\root", "~/scratch/root"] as const;

// Verbatim-law residual table (MechanicalWorkflows-bpat). One member per rewrite family the root hand-on must not perform; a later census adds a value to a family here, not a new row:
//   home expander    ~mw/scratch/root       (a ~user form beside the ~/ form in RESOLVABLE_PATH_ROOTS)
//   percent decoder  /scratch/r%6Fot        (decodes to /scratch/root)
//   path resolver    /scratch/root/..       (a trailing parent pair beside the interior /scratch/../root)
//   separator strip  c:\\scratch\\root\\ and \\\\host\\share\\root\\ (a trailing backslash in drive and UNC form)
//   well-formed rewrite  /scratch/<U+1F600>root (one well-formed astral pair inside a multi-code-point root, beside the two lone-surrogate roots)
//   variable expander    $HOME/scratch/root (a $HOME variable prefix, MechanicalWorkflows-vbpb)
//   quote strip          "/scratch/root" and '/scratch/root' (surrounding double and single quotes)
//   URL to path          file:///scratch/root (a file URL kept as a URL)
//   percent decoder      /scratch/my%20root and /scratch/r%6fot (a %20 space escape and a lower-case hex escape beside the upper-case %6F)
//   path resolver        ../scratch/root (a leading parent pair beside the interior and trailing ones)
//   home expander        ~\scratch\root (the Windows tilde-backslash home form beside the ~/ and ~mw/ forms)
const VERBATIM_RESIDUAL_FAMILIES = ["home expander", "percent decoder", "path resolver", "separator strip", "separator strip", "well-formed rewrite", "variable expander", "quote strip", "quote strip", "URL to path", "percent decoder", "percent decoder", "path resolver", "home expander"] as const;
const VERBATIM_RESIDUAL_ROOTS = ["~mw/scratch/root", "/scratch/r%6Fot", "/scratch/root/..", "c:\\scratch\\root\\", "\\\\host\\share\\root\\", "/scratch/\u{1F600}root", "$HOME/scratch/root", "\"/scratch/root\"", "'/scratch/root'", "file:///scratch/root", "/scratch/my%20root", "/scratch/r%6fot", "../scratch/root", "~\\scratch\\root"] as const;

const child = `
import cp from "node:child_process";
import { syncBuiltinESMExports } from "node:module";
import { readdirSync } from "node:fs";
const calls = [];
for (const name of ${JSON.stringify(SHIMMED)}) { const real = cp[name]; cp[name] = (...a) => { calls.push(name); return real(...a); }; }
syncBuiltinESMExports();
const dist = process.env.RIG_DIST_URL;
const files = readdirSync(new URL(dist)).filter(f => f.endsWith(".js") && !${JSON.stringify(ENTRYPOINTS)}.includes(f)).sort();
const imported = [];
for (const f of files) { await import(new URL(f, dist).href); imported.push(f); }
const afterImport = calls.length;
const obs = await import(new URL("live-observation.js", dist).href);
const flows = [undefined, "", "0", "true", "yes", " 1", "1 ", "01"].map(v => {
  const env = { MW_LIVE_FORGE_ROOT: "/scratch/root" };
  if (v !== undefined) env.MW_LIVE_FORGE_FLOW = v;
  const r = obs.liveFlowPreconditions(env, true);
  return { value: v ?? null, run: r.run, reason: r.record ? r.record.reason : null, status: r.record ? r.record.status : null, pass: r.record ? r.record.pass : null };
});
const enabled = obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: "/scratch/root" }, true);
const enabledNoRoot = obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1" }, true);
const enabledNoForge = obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: "/scratch/root" }, false);
const trimPoints = ${JSON.stringify(TRIM_CODE_POINTS)}.map(c => String.fromCodePoint(c));
const emptyRoots = ["", "   ", "\t", "\\n", "\\r", "\\u00a0", trimPoints.join(""), ...trimPoints].map(v => ({ value: v, ...obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: v }, true) }));
const enabledNeither = obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1" }, false);
const outsidePoints = ${JSON.stringify(OUTSIDE_TRIM_CODE_POINTS)}.map(c => String.fromCodePoint(c));
const outsideRoots = outsidePoints.map(v => ({ value: v, ...obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: v }, true) }));
const shape = (v, r) => ({ value: v.length > 64 ? null : v, length: v.length, run: r.run, rootLength: typeof r.root === "string" ? r.root.length : null, same: r.root === v, reason: r.record ? r.record.reason : null });
const pathRoots = ${JSON.stringify(PATH_SHAPED_ROOTS)}.map(v => shape(v, obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: v }, true)));
const runRoots = ${JSON.stringify(OUTSIDE_RUN_AND_WRAP_ROOTS)}.map(v => ({ value: v, ...shape(v, obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: v }, true)) }));
const rewritableRoots = ${JSON.stringify(REWRITABLE_TEXT_ROOTS)}.map(v => ({ value: v, ...shape(v, obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: v }, true)) }));
const edgeRoots = ${JSON.stringify(OUTSIDE_EDGE_AND_INTERIOR_ROOTS)}.map(v => ({ value: v, ...shape(v, obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: v }, true)) }));
const resolvableRoots = ${JSON.stringify(RESOLVABLE_PATH_ROOTS)}.map(v => ({ value: v, ...shape(v, obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: v }, true)) }));
const residualRoots = ${JSON.stringify(VERBATIM_RESIDUAL_ROOTS)}.map(v => ({ value: v, ...shape(v, obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: v }, true)) }));
const spacedRoots = ${JSON.stringify(SPACED_TEXT_ROOTS)}.map(v => ({ value: v, ...obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: v }, true) }));
const complement = { scanned: 0, blank: [], refused: [] };
for (let c = 0; c <= 0x10ffff; c++) {
  const v = String.fromCodePoint(c);
  complement.scanned++;
  if (v.trim() === "") { complement.blank.push(c); continue; }
  const r = obs.liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: v }, true);
  if (r.run !== true || r.root !== v) complement.refused.push(c);
}
const refusals = {};
const dev = await import(new URL("live-develop-cli.js", dist).href);
const sel = await import(new URL("live-select-cli.js", dist).href);
const attempt = async (key, fn) => { try { await fn(); refusals[key] = "RESOLVED"; } catch (e) { refusals[key] = String(e && e.message); } };
await attempt("develop-task", () => dev.developCli(["--workspace", "/ws", "--task", "t"]));
await attempt("develop-bead", () => dev.developCli(["--workspace", "/ws", "--bead", "b"]));
await attempt("develop-claim", () => dev.developCli(["--workspace", "/ws", "--bead", "b", "--claim-bead"]));
await attempt("develop-review", () => dev.developCli(["--workspace", "/ws", "--task", "t", "--review"]));
await attempt("select-task", () => sel.selectCli(["--workspace", "/ws", "--task", "t"]));
await attempt("select-integrate", () => sel.selectCli(["--workspace", "/ws", "--task", "t", "--integrate"]));
const beforeControl = calls.length;
cp.spawnSync(process.execPath, ["-e", "0"]);
process.stdout.write(JSON.stringify({ imported, afterImport, flows, enabled, enabledNoRoot, enabledNoForge, emptyRoots, enabledNeither, outsideRoots, pathRoots, runRoots, rewritableRoots, edgeRoots, resolvableRoots, residualRoots, spacedRoots, complement, refusals, beforeControl, afterControl: calls.length, calls }) + "\\n");
`;

interface RootShape { value: string | null; length: number; run: boolean; rootLength: number | null; same: boolean; reason: string | null }
interface ChildReport {
  imported: string[]; afterImport: number; beforeControl: number; afterControl: number; calls: string[];
  flows: { value: string | null; run: boolean; reason: string | null; status: string | null; pass: boolean | null }[];
  enabled: { run: boolean; root?: string }; enabledNoRoot: { run: boolean; record?: { reason: string } }; enabledNoForge: { run: boolean; record?: { reason: string } };
  emptyRoots: { value: string; run: boolean; record?: { reason: string } }[]; enabledNeither: { run: boolean; record?: { reason: string } };
  outsideRoots: { value: string; run: boolean; root?: string; record?: { reason: string } }[]; spacedRoots: { value: string; run: boolean; root?: string; record?: { reason: string } }[];
  pathRoots: RootShape[]; runRoots: (RootShape & { value: string })[];
  rewritableRoots: (RootShape & { value: string })[]; edgeRoots: (RootShape & { value: string })[]; resolvableRoots: (RootShape & { value: string })[]; residualRoots: (RootShape & { value: string })[];
  complement: { scanned: number; blank: number[]; refused: number[] };
  refusals: Record<string, string>;
}
function runChild(): ChildReport {
  const env: Record<string, string | undefined> = { ...process.env, RIG_DIST_URL: dist.href };
  for (const key of Object.keys(env)) if (key.startsWith("MW_LIVE_")) delete env[key];
  const out = spawnSync(process.execPath, ["--input-type=module", "-e", child], { encoding: "utf8", env: env as NodeJS.ProcessEnv });
  assert.equal(out.status, 0, `child failed: ${out.stderr}`);
  return JSON.parse(out.stdout) as ChildReport;
}

test("with no opt-in set, importing every rig module and driving each opt-in entry point records zero native process calls", () => {
  const report = runChild();
  const expected = readdirSync(distDir).filter(f => f.endsWith(".js") && !(ENTRYPOINTS as readonly string[]).includes(f)).sort();
  assert.ok(expected.length >= 20, "the scan is not vacuous");
  for (const name of ENTRYPOINTS) assert.ok(readdirSync(distDir).includes(name), `${name} exists, so its exclusion is deliberate`);
  assert.deepEqual(report.imported, expected, "every non-entrypoint built module was imported");
  assert.equal(report.afterImport, 0, "importing the modules invokes no native process");
  assert.deepEqual(report.calls.slice(0, report.beforeControl), [], "zero native calls before the control");
  assert.equal(report.beforeControl, 0);
});

test("the counting shim is live: a deliberate native call after the measured window is recorded", () => {
  const report = runChild();
  assert.equal(report.afterControl, 1);
  assert.deepEqual(report.calls, ["spawnSync"]);
});

test("the live Forge flow refuses with a typed UNKNOWN record for every value other than exactly 1", () => {
  const { flows } = runChild();
  assert.equal(flows.length, 8);
  for (const flow of flows) {
    assert.equal(flow.run, false, `value ${JSON.stringify(flow.value)} must not enable the flow`);
    assert.equal(flow.reason, "LIVE_FLOW_NOT_ENABLED");
    assert.equal(flow.status, "UNKNOWN");
    assert.equal(flow.pass, false);
  }
});

test("exactly 1 enables the live Forge flow: the opt-in has a positive control inside this file", () => {
  const { enabled, enabledNoRoot, enabledNoForge } = runChild();
  assert.deepEqual(enabled, { run: true, root: "/scratch/root" }, "exactly 1 with MW_LIVE_FORGE_ROOT set passes the precondition");
  assert.equal(enabledNoRoot.run, false);
  assert.equal(enabledNoRoot.record?.reason, "LIVE_FLOW_ROOT_UNSET", "1 passes the enable check and stops at the next precondition");
  assert.equal(enabledNoForge.run, false);
  assert.equal(enabledNoForge.record?.reason, "LIVE_FLOW_FORGE_ABSENT");
});

test("with the flag exactly 1, an empty or whitespace-only MW_LIVE_FORGE_ROOT stops at LIVE_FLOW_ROOT_UNSET, and the root precondition reports before the forge one", () => {
  const { emptyRoots, enabledNeither } = runChild();
  assert.deepEqual(emptyRoots.map(r => r.value), ["", "   ", "\t", "\n", "\r", "\u00a0", TRIM_POINTS.join(""), ...TRIM_POINTS], "empty, spaces, tab, newline, carriage return and no-break space are probed, then one root holding every code point String.prototype.trim strips, then each of the 25 alone");
  assert.equal(TRIM_CODE_POINTS.length, 25);
  assert.deepEqual(TRIM_POINTS.filter(c => c.trim() !== ""), [], "every probed code point is one String.prototype.trim strips");
  for (const r of emptyRoots) {
    assert.equal(r.run, false, `root ${JSON.stringify(r.value)} must not pass the precondition even with forge present`);
    assert.equal(r.record?.reason, "LIVE_FLOW_ROOT_UNSET", `root ${JSON.stringify(r.value)}`);
  }
  assert.equal(enabledNeither.run, false);
  assert.equal(enabledNeither.record?.reason, "LIVE_FLOW_ROOT_UNSET", "with neither root nor forge, the root is refused first, never LIVE_FLOW_FORGE_ABSENT");
});

test("with the flag exactly 1 and forge present, each of the ten code points just outside the trim() class passes the root precondition as a root by itself", () => {
  const { outsideRoots } = runChild();
  assert.deepEqual(outsideRoots.map(r => r.value), OUTSIDE_TRIM_POINTS, "the ten probed roots arrive in order, one code point each");
  assert.equal(OUTSIDE_TRIM_CODE_POINTS.length, 10);
  assert.deepEqual(OUTSIDE_TRIM_POINTS.filter(c => c.trim() === ""), [], "none of the ten is a code point String.prototype.trim strips, the mirror of the guard in the refuse test");
  assert.deepEqual(OUTSIDE_TRIM_POINTS.filter(c => TRIM_POINTS.includes(c)), [], "the ten stand disjoint from the 25 refused members");
  for (const r of outsideRoots) {
    assert.equal(r.run, true, `root ${JSON.stringify(r.value)} is not blank by trim(), so the root precondition admits it`);
    assert.equal(r.record, undefined, `root ${JSON.stringify(r.value)} stops at no precondition`);
    assert.equal(r.root, r.value, `root ${JSON.stringify(r.value)} is handed on verbatim, never trimmed, stripped or collapsed`);
  }
});

test("with the flag exactly 1 and forge present, every code point outside the 25-point trim() class passes alone as a root, handed on verbatim", () => {
  const { complement } = runChild();
  assert.equal(complement.scanned, 0x110000, "the walk covers every code point 0..0x10FFFF, surrogates included");
  assert.deepEqual(complement.blank, [...TRIM_CODE_POINTS], "the live trim() strips exactly the 25 named members, in code point order, so the complement is the rest");
  assert.deepEqual(complement.refused.map(c => "U+" + c.toString(16).toUpperCase().padStart(4, "0")), [], "no code point outside the trim() class is refused as a root or changed on the way through");
});

test("with the flag exactly 1 and forge present, a root with real text passes the precondition when white space sits at an edge or inside", () => {
  const { spacedRoots } = runChild();
  assert.deepEqual(spacedRoots.map(r => r.value), [...SPACED_TEXT_ROOTS], "the five spaced roots arrive in order");
  for (const r of spacedRoots) {
    assert.ok(r.value.trim().length > 0, `root ${JSON.stringify(r.value)} holds text`);
    assert.equal(r.run, true, `root ${JSON.stringify(r.value)} passes the root precondition`);
    assert.equal(r.record, undefined, `root ${JSON.stringify(r.value)} stops at no precondition`);
    assert.equal(r.root, r.value, `root ${JSON.stringify(r.value)} is handed on verbatim, as the SPACED_TEXT_ROOTS docstring states`);
  }
});

test("with the flag exactly 1 and forge present, a path-shaped or very long root is handed on verbatim: no separator collapse, dot-segment removal, trailing-separator strip or length cap", () => {
  const { pathRoots } = runChild();
  assert.deepEqual(pathRoots.map(r => r.length), PATH_SHAPED_ROOTS.map(v => v.length), "the eight roots arrive in order, at 1025, 4097 and 65537 units among them");
  assert.deepEqual(PATH_SHAPED_ROOTS.filter(v => v.trim() === ""), [], "none of the eight is blank by trim(), so no refusal can excuse a rewrite");
  for (const r of pathRoots) {
    const label = `root of ${r.length} units ${JSON.stringify(r.value)}`;
    assert.equal(r.run, true, `${label} passes the root precondition`);
    assert.equal(r.reason, null, `${label} stops at no precondition`);
    assert.equal(r.rootLength, r.length, `${label} keeps its length on the way through`);
    assert.equal(r.same, true, `${label} is handed on verbatim, never normalised or cut`);
  }
});

test("with the flag exactly 1 and forge present, runs and wraps of the outside-trim() points pass as roots and are handed on verbatim", () => {
  const { runRoots } = runChild();
  assert.deepEqual(runRoots.map(r => r.value), OUTSIDE_RUN_AND_WRAP_ROOTS, "the 33 roots arrive in order: ten doubled, ten wrapped in a space, ten wrapped in two trim() points, the ten as one run, the run twice, one point inside text");
  assert.equal(OUTSIDE_RUN_AND_WRAP_ROOTS.length, 33);
  assert.deepEqual(OUTSIDE_RUN_AND_WRAP_ROOTS.filter(v => v.trim() === ""), [], "none of the 33 is blank by trim(): the all-blank refusal cannot apply to a run or a wrap of outside points");
  for (const r of runRoots) {
    assert.equal(r.run, true, `root ${JSON.stringify(r.value)} is not blank by trim(), so the root precondition admits it`);
    assert.equal(r.reason, null, `root ${JSON.stringify(r.value)} stops at no precondition`);
    assert.equal(r.same, true, `root ${JSON.stringify(r.value)} is handed on verbatim`);
  }
});

test("with the flag exactly 1 and forge present, multi-code-point roots with upper-case letters, a combining sequence, a singleton and lone surrogates are handed on verbatim: no case fold, normalisation or well-formed rewrite", () => {
  const { rewritableRoots } = runChild();
  assert.deepEqual(rewritableRoots.map(r => r.value), [...REWRITABLE_TEXT_ROOTS], "the six roots arrive in order");
  assert.deepEqual(REWRITABLE_TEXT_ROOTS.filter(v => v.trim() === ""), [], "none of the six is blank by trim(), so no refusal can excuse a rewrite");
  assert.ok(REWRITABLE_TEXT_ROOTS.slice(0, 2).every(v => v.toLowerCase() !== v), "the two upper-case roots change under a case fold");
  assert.ok(REWRITABLE_TEXT_ROOTS.slice(2, 4).every(v => v.normalize("NFC") !== v), "the combining sequence and the singleton change under NFC");
  assert.ok(REWRITABLE_TEXT_ROOTS.slice(4).every(v => new TextDecoder().decode(new TextEncoder().encode(v)) !== v), "the two lone-surrogate roots change under a UTF-8 round trip, the rewrite toWellFormed performs");
  for (const r of rewritableRoots) {
    const label = `root of ${r.length} units ${JSON.stringify(r.value)}`;
    assert.equal(r.run, true, `${label} passes the root precondition`);
    assert.equal(r.reason, null, `${label} stops at no precondition`);
    assert.equal(r.rootLength, r.length, `${label} keeps its length on the way through`);
    assert.equal(r.same, true, `${label} is handed on verbatim`);
  }
});

test("with the flag exactly 1 and forge present, each outside-trim() point at the start of a root, at its end and between two letters is handed on verbatim: no edge or interior invisible-character strip", () => {
  const { edgeRoots } = runChild();
  assert.deepEqual(edgeRoots.map(r => r.value), OUTSIDE_EDGE_AND_INTERIOR_ROOTS, "the 30 roots arrive in order: ten leading, ten trailing, ten interior");
  assert.equal(OUTSIDE_EDGE_AND_INTERIOR_ROOTS.length, 30);
  assert.deepEqual(OUTSIDE_EDGE_AND_INTERIOR_ROOTS.filter(v => v.trim() !== v), [], "trim() changes none of the 30, so the outside points sit where only an invisible-character strip could touch them");
  for (const r of edgeRoots) {
    const label = `root of ${r.length} units ${JSON.stringify(r.value)}`;
    assert.equal(r.run, true, `${label} passes the root precondition`);
    assert.equal(r.reason, null, `${label} stops at no precondition`);
    assert.equal(r.rootLength, r.length, `${label} keeps its length on the way through`);
    assert.equal(r.same, true, `${label} is handed on verbatim`);
  }
});

test("with the flag exactly 1 and forge present, parent, leading-dot and trailing-dot segments, backslash roots and a tilde home are handed on verbatim: no path resolution, separator rewrite or home expansion", () => {
  const { resolvableRoots } = runChild();
  assert.deepEqual(resolvableRoots.map(r => r.value), [...RESOLVABLE_PATH_ROOTS], "the seven roots arrive in order");
  assert.deepEqual(RESOLVABLE_PATH_ROOTS.filter(v => v.trim() === ""), [], "none of the seven is blank by trim(), so no refusal can excuse a rewrite");
  for (const r of resolvableRoots) {
    const label = `root of ${r.length} units ${JSON.stringify(r.value)}`;
    assert.equal(r.run, true, `${label} passes the root precondition`);
    assert.equal(r.reason, null, `${label} stops at no precondition`);
    assert.equal(r.rootLength, r.length, `${label} keeps its length on the way through`);
    assert.equal(r.same, true, `${label} is handed on verbatim`);
  }
});

test("with the flag exactly 1 and forge present, a ~user home, a percent-escaped root, a trailing parent pair, trailing-backslash drive and UNC roots and a well-formed astral character, a $HOME variable, surrounding quotes, a file URL, %20 and lower-case hex percent escapes, a leading parent pair and a Windows tilde-backslash home are handed on verbatim: no home or variable expansion, quote strip, URL conversion, percent decoding, leading or trailing resolution, separator strip or well-formed rewrite", () => {
  const { residualRoots } = runChild();
  assert.deepEqual(residualRoots.map(r => r.value), [...VERBATIM_RESIDUAL_ROOTS], "the fourteen roots arrive in order");
  assert.equal(VERBATIM_RESIDUAL_ROOTS.length, VERBATIM_RESIDUAL_FAMILIES.length, "every root names the rewrite family it defeats");
  assert.deepEqual(VERBATIM_RESIDUAL_ROOTS.filter(v => v.trim() === ""), [], "none of the fourteen is blank by trim(), so no refusal can excuse a rewrite");
  assert.ok(VERBATIM_RESIDUAL_ROOTS[0].startsWith("~") && !VERBATIM_RESIDUAL_ROOTS[0].startsWith("~/"), "the first root is a ~user form, not the ~/ form");
  assert.notEqual(decodeURIComponent(VERBATIM_RESIDUAL_ROOTS[1]), VERBATIM_RESIDUAL_ROOTS[1], "the percent-escaped root changes under decoding");
  assert.ok(VERBATIM_RESIDUAL_ROOTS[2].endsWith("/.."), "the third root ends in a parent pair");
  assert.ok(VERBATIM_RESIDUAL_ROOTS.slice(3, 5).every(v => v.endsWith("\\") && v.length > 1), "the drive and UNC roots end in a backslash after other code points");
  assert.ok(new TextDecoder().decode(new TextEncoder().encode(VERBATIM_RESIDUAL_ROOTS[5])) === VERBATIM_RESIDUAL_ROOTS[5] && VERBATIM_RESIDUAL_ROOTS[5].length === [...VERBATIM_RESIDUAL_ROOTS[5]].length + 1, "the sixth root holds exactly one well-formed astral pair");
  assert.deepEqual(VERBATIM_RESIDUAL_ROOTS.slice(6), ["$HOME/scratch/root", "\"/scratch/root\"", "'/scratch/root'", "file:///scratch/root", "/scratch/my%20root", "/scratch/r%6fot", "../scratch/root", "~\\scratch\\root"], "the eight rewrite-family values follow the six, in order");
  assert.ok(VERBATIM_RESIDUAL_ROOTS[6].startsWith("$HOME/") && VERBATIM_RESIDUAL_ROOTS[7].startsWith("\"") && VERBATIM_RESIDUAL_ROOTS[7].endsWith("\"") && VERBATIM_RESIDUAL_ROOTS[8].startsWith("'") && VERBATIM_RESIDUAL_ROOTS[8].endsWith("'") && VERBATIM_RESIDUAL_ROOTS[9].startsWith("file:///") && VERBATIM_RESIDUAL_ROOTS[12].startsWith("../") && VERBATIM_RESIDUAL_ROOTS[13].startsWith("~\\"), "each appended root opens with the shape its family rewrites");
  assert.equal(decodeURIComponent(VERBATIM_RESIDUAL_ROOTS[10]), "/scratch/my root", "the %20 root decodes to a space");
  assert.equal(decodeURIComponent(VERBATIM_RESIDUAL_ROOTS[11]), "/scratch/root", "the lower-case hex root decodes to the plain root");
  for (const r of residualRoots) {
    const label = `root of ${r.length} units ${JSON.stringify(r.value)}`;
    assert.equal(r.run, true, `${label} passes the root precondition`);
    assert.equal(r.reason, null, `${label} stops at no precondition`);
    assert.equal(r.rootLength, r.length, `${label} keeps its length on the way through`);
    assert.equal(r.same, true, `${label} is handed on verbatim`);
  }
});

/** osxg: the verbatim-root tables above sample a rewrite family value by value, and every multi-character family (variable expansion, URL conversion, percent or form decoding, home expansion, parent-pair or prefix strip, drive case or separator rewrite) is infinite. This row reads the built module as a syntax tree instead: the root is a bare pass-through, so no rewrite fits between the environment and the returned root. */
test("the built liveFlowPreconditions binds root once from text(env[\"MW_LIVE_FORGE_ROOT\"]), compares it with null once, returns it once as a shorthand property and touches it nowhere else; text hands its parameter back as a bare identifier", () => {
  const code = readFileSync(new URL("live-observation.js", dist), "utf8");
  const source = ts.createSourceFile("live-observation.js", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const named = (name: string): ts.FunctionDeclaration[] => source.statements.filter((s): s is ts.FunctionDeclaration => ts.isFunctionDeclaration(s) && s.name?.text === name);
  const walk = (node: ts.Node, visit: (n: ts.Node) => void): void => { visit(node); ts.forEachChild(node, child => walk(child, visit)); };
  const preconditions = named("liveFlowPreconditions");
  assert.equal(preconditions.length, 1, "exactly one liveFlowPreconditions declaration in the built module");
  const body = preconditions[0]!;
  const roots: ts.Identifier[] = [];
  const declarations: ts.VariableDeclaration[] = [];
  const comparisons: ts.BinaryExpression[] = [];
  const returnedLiterals: ts.ObjectLiteralExpression[] = [];
  walk(body, n => {
    if (ts.isIdentifier(n) && n.text === "root") roots.push(n);
    if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.name.text === "root") declarations.push(n);
    if (ts.isBinaryExpression(n) && [n.left, n.right].some(side => ts.isIdentifier(side) && side.text === "root")) comparisons.push(n);
    if (ts.isReturnStatement(n) && n.expression !== undefined && ts.isObjectLiteralExpression(n.expression) && n.expression.properties.some(p => ts.isShorthandPropertyAssignment(p) && p.name.text === "root")) returnedLiterals.push(n.expression);
  });
  assert.deepEqual(roots.map(r => ts.SyntaxKind[r.parent.kind]), ["VariableDeclaration", "BinaryExpression", "ShorthandPropertyAssignment"], "the identifier root occurs exactly three times: the declaration name, one comparison operand, one shorthand property, and never as a property-access or call argument, assignment side or template part");
  assert.equal(declarations.length, 1, "exactly one declaration binds root");
  const init = declarations[0]!.initializer;
  assert.ok(init !== undefined && ts.isCallExpression(init) && ts.isIdentifier(init.expression) && init.expression.text === "text", "root is initialised by a call to the identifier text");
  const call = init as ts.CallExpression;
  assert.equal(call.arguments.length, 1, "the text call takes exactly one argument");
  const arg = call.arguments[0]!;
  assert.ok(ts.isElementAccessExpression(arg) && ts.isIdentifier(arg.expression) && arg.expression.text === "env" && ts.isStringLiteral(arg.argumentExpression) && arg.argumentExpression.text === "MW_LIVE_FORGE_ROOT", "the argument is env[\"MW_LIVE_FORGE_ROOT\"] and nothing more");
  assert.equal(comparisons.length, 1, "exactly one binary expression names root");
  const cmp = comparisons[0]!;
  assert.equal(cmp.operatorToken.kind, ts.SyntaxKind.EqualsEqualsEqualsToken, "root is compared with ===");
  assert.ok((ts.isIdentifier(cmp.left) && cmp.left.text === "root" && cmp.right.kind === ts.SyntaxKind.NullKeyword) || (ts.isIdentifier(cmp.right) && cmp.right.text === "root" && cmp.left.kind === ts.SyntaxKind.NullKeyword), "the comparison pairs root with null");
  assert.equal(returnedLiterals.length, 1, "exactly one returned object literal carries root");
  const props = returnedLiterals[0]!.properties;
  assert.equal(props.length, 2, "the returned literal has exactly two properties");
  const [run, shorthand] = props;
  assert.ok(ts.isPropertyAssignment(run!) && ts.isIdentifier(run.name) && run.name.text === "run" && run.initializer.kind === ts.SyntaxKind.TrueKeyword, "the first property is run: true");
  assert.ok(ts.isShorthandPropertyAssignment(shorthand!) && shorthand.name.text === "root" && shorthand.objectAssignmentInitializer === undefined, "the second property is the bare shorthand root");
  const texts = named("text");
  assert.equal(texts.length, 1, "exactly one text declaration in the built module");
  const helper = texts[0]!;
  assert.equal(helper.parameters.length, 1, "text takes exactly one parameter");
  const param = helper.parameters[0]!;
  assert.ok(ts.isIdentifier(param.name), "the text parameter is a plain identifier");
  const returns: ts.ReturnStatement[] = [];
  walk(helper, n => { if (ts.isReturnStatement(n)) returns.push(n); });
  assert.equal(returns.length, 1, "text has exactly one return");
  const result = returns[0]!.expression;
  assert.ok(result !== undefined && ts.isConditionalExpression(result), "text returns one conditional expression");
  const conditional = result as ts.ConditionalExpression;
  assert.ok(ts.isIdentifier(conditional.whenTrue) && conditional.whenTrue.text === (param.name as ts.Identifier).text, "the non-null branch of text is its parameter as a bare identifier");
  assert.equal(conditional.whenFalse.kind, ts.SyntaxKind.NullKeyword, "the other branch of text is null");
});

/** qyjw: the root census above watches the nodes that carry root; a rewrite placed on the environment before root is read (a rebound env parameter), or on the helper that reads it (a shadowed or rebound text), leaves those nodes alone. These two rows census the two inputs of the root declaration instead: the env identifier inside liveFlowPreconditions and the text binding across the whole built module. */
const builtLiveObservation = (): ts.SourceFile => ts.createSourceFile("live-observation.js", readFileSync(new URL("live-observation.js", dist), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
const identifiersNamed = (root: ts.Node, name: string): ts.Identifier[] => {
  const found: ts.Identifier[] = [];
  const visit = (node: ts.Node): void => { if (ts.isIdentifier(node) && node.text === name) found.push(node); ts.forEachChild(node, visit); };
  visit(root);
  return found;
};

test("qyjw Z01: inside the one built liveFlowPreconditions the identifier env is its first parameter and otherwise occurs exactly twice, each time as the object of an element access keyed by a string literal: no rebinding, copy, spread or hand-off of env", () => {
  const source = builtLiveObservation();
  const preconditions = source.statements.filter((s): s is ts.FunctionDeclaration => ts.isFunctionDeclaration(s) && s.name?.text === "liveFlowPreconditions");
  assert.equal(preconditions.length, 1, "exactly one liveFlowPreconditions declaration in the built module");
  const fn = preconditions[0]!;
  const first = fn.parameters[0];
  assert.ok(first !== undefined && ts.isIdentifier(first.name) && first.name.text === "env" && first.initializer === undefined && first.dotDotDotToken === undefined, "env is the first parameter, a plain identifier with no default and no rest");
  const occurrences = identifiersNamed(fn, "env").filter(id => id !== first!.name);
  assert.deepEqual(occurrences.map(id => ts.SyntaxKind[id.parent.kind]), ["ElementAccessExpression", "ElementAccessExpression"], "env occurs exactly twice besides its parameter name, each time inside an element access, and never as an assignment side, spread, shorthand property, initialiser or call argument");
  const keys = occurrences.map(id => {
    const access = id.parent as ts.ElementAccessExpression;
    assert.equal(access.expression, id, "env is the object of the element access, not its key");
    assert.ok(ts.isStringLiteral(access.argumentExpression), "the element access key is a string literal");
    assert.ok(!ts.isBinaryExpression(access.parent) || access.parent.left !== access || access.parent.operatorToken.kind !== ts.SyntaxKind.EqualsToken, "the element access is never an assignment target");
    return (access.argumentExpression as ts.StringLiteral).text;
  });
  assert.deepEqual(keys, ["MW_LIVE_FORGE_FLOW", "MW_LIVE_FORGE_ROOT"], "the two reads are the flow flag and the root, in that order");
});

test("qyjw Z03: across the whole built module the identifier text names exactly one top-level function declaration and every other occurrence is the callee of a call: no nested declaration, shadowing parameter or variable, rebinding or value use", () => {
  const source = builtLiveObservation();
  const all = identifiersNamed(source, "text");
  const declarations = all.filter(id => ts.isFunctionDeclaration(id.parent) && id.parent.name === id);
  assert.equal(declarations.length, 1, "exactly one declaration names text, whatever its kind");
  assert.ok(source.statements.includes(declarations[0]!.parent as ts.FunctionDeclaration), "that declaration is a top-level function declaration of the module");
  const others = all.filter(id => id !== declarations[0]);
  assert.ok(others.length > 0, "text is called somewhere, so the census is not vacuous");
  assert.deepEqual([...new Set(others.map(id => ts.SyntaxKind[id.parent.kind]))], ["CallExpression"], "every other occurrence sits in a call expression, never as a variable or parameter name, assignment side, argument or property");
  for (const id of others) assert.equal((id.parent as ts.CallExpression).expression, id, "text is the callee of its call, not an argument to it");
});

/** o7q65 (qyjw follow-up): five placements keep both qyjw censuses green. A rewrite of the text parameter before or inside its one return (H01, H02) and a module-level rebinding of the exported liveFlowPreconditions binding (L01) sit outside the env and text-binding censuses; a write through arguments[0] (K01) or a logical-assignment write on an env read (J01) reaches env without a second env identifier or an equals-token target. Y01 reads the built function by value with frozen inputs; Y02 censuses the helper body and the exported binding; Y03 censuses arguments, this and every write form on an env element access. */
const ASSIGNMENT_KINDS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.QuestionQuestionEqualsToken, ts.SyntaxKind.BarBarEqualsToken, ts.SyntaxKind.AmpersandAmpersandEqualsToken
]);
const isAssignmentOperator = (kind: ts.SyntaxKind): boolean => (kind >= ts.SyntaxKind.FirstAssignment && kind <= ts.SyntaxKind.LastAssignment) || ASSIGNMENT_KINDS.has(kind);
const isStepExpression = (node: ts.Node): boolean =>
  (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken);
const walkTree = (node: ts.Node, visit: (n: ts.Node) => void): void => { visit(node); ts.forEachChild(node, child => walkTree(child, visit)); };
const topLevelFunctions = (source: ts.SourceFile, name: string): ts.FunctionDeclaration[] =>
  source.statements.filter((s): s is ts.FunctionDeclaration => ts.isFunctionDeclaration(s) && s.name !== undefined && s.name.text === name);

test("o7q65 Y01: the built liveFlowPreconditions hands brace-home roots on verbatim from frozen inputs and refuses an env without the flag or without the root without any write", async () => {
  const built = await import(new URL("live-observation.js", dist).href) as { liveFlowPreconditions: (env: Readonly<Record<string, string | undefined>>, forgeFound: boolean) => { run: boolean; root?: string; record?: { reason: string } } };
  for (const root of ["${HOME}", "${HOME}/scratch/root"]) {
    const env = Object.freeze({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: root });
    assert.deepEqual(built.liveFlowPreconditions(env, true), { run: true, root }, "a brace-home root is handed on verbatim");
    assert.deepEqual(env, { MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: root }, "the frozen env is unchanged after the flag=1 path");
  }
  const off = Object.freeze({});
  const unflagged = built.liveFlowPreconditions(off, true);
  assert.equal(unflagged.run, false, "an env without the flag does not run");
  assert.equal(unflagged.record?.reason, "LIVE_FLOW_NOT_ENABLED", "an env without the flag refuses as not enabled");
  assert.deepEqual(off, {}, "the frozen env is unchanged after the unset-flag path");
  const flagOnly = Object.freeze({ MW_LIVE_FORGE_FLOW: "1" });
  const unrooted = built.liveFlowPreconditions(flagOnly, true);
  assert.equal(unrooted.run, false, "an env without the root does not run");
  assert.equal(unrooted.record?.reason, "LIVE_FLOW_ROOT_UNSET", "an env without the root refuses as unset");
  assert.deepEqual(flagOnly, { MW_LIVE_FORGE_FLOW: "1" }, "the frozen env is unchanged after the unset-root path");
});

test("o7q65 Y02: the built text body is its one return and never writes its parameter, and liveFlowPreconditions occurs once in the module, as its own declaration name", () => {
  const source = builtLiveObservation();
  const helpers = topLevelFunctions(source, "text");
  assert.equal(helpers.length, 1, "exactly one top-level text declaration");
  const helper = helpers[0]!;
  assert.ok(helper.body !== undefined, "text has a body");
  assert.equal(helper.body!.statements.length, 1, "the body of text is one statement");
  assert.ok(ts.isReturnStatement(helper.body!.statements[0]!), "that statement is the return");
  const first = helper.parameters[0];
  assert.ok(first !== undefined && ts.isIdentifier(first.name), "text takes a plain identifier parameter");
  const param = (first!.name as ts.Identifier).text;
  const writes: string[] = [];
  walkTree(helper.body!, n => {
    if (ts.isBinaryExpression(n) && isAssignmentOperator(n.operatorToken.kind) && ts.isIdentifier(n.left) && n.left.text === param) writes.push(n.getText(source).slice(0, 60));
    if (isStepExpression(n) && ts.isIdentifier((n as ts.PrefixUnaryExpression | ts.PostfixUnaryExpression).operand) && ((n as ts.PrefixUnaryExpression).operand as ts.Identifier).text === param) writes.push(n.getText(source).slice(0, 60));
  });
  assert.deepEqual(writes, [], "the parameter of text is never written");
  const uses = identifiersNamed(source, "liveFlowPreconditions").map(id => ts.SyntaxKind[id.parent.kind]);
  assert.deepEqual(uses, ["FunctionDeclaration"], "liveFlowPreconditions is never rebound, wrapped or passed on inside the module");
});

test("o7q65 Y03: inside the built liveFlowPreconditions neither arguments nor this occurs and no env element access is the target of an assignment operator, a delete or an increment", () => {
  const source = builtLiveObservation();
  const fns = topLevelFunctions(source, "liveFlowPreconditions");
  assert.equal(fns.length, 1, "exactly one top-level liveFlowPreconditions declaration");
  assert.ok(fns[0]!.body !== undefined, "liveFlowPreconditions has a body");
  const seen: string[] = [];
  walkTree(fns[0]!.body!, n => {
    if (ts.isIdentifier(n) && n.text === "arguments") seen.push("arguments");
    if (n.kind === ts.SyntaxKind.ThisKeyword) seen.push("this");
    if (ts.isElementAccessExpression(n) && ts.isIdentifier(n.expression) && n.expression.text === "env") {
      const p = n.parent;
      if (ts.isBinaryExpression(p) && p.left === n && isAssignmentOperator(p.operatorToken.kind)) seen.push("assigned");
      if (ts.isDeleteExpression(p)) seen.push("deleted");
      if (isStepExpression(p)) seen.push("stepped");
    }
  });
  assert.deepEqual(seen, [], "env is only ever read inside liveFlowPreconditions");
});

test("each write-capable CLI entry point refuses with WRITE_OPT_IN_REQUIRED before any native Beads, Forge or Git call", () => {
  const { refusals } = runChild();
  assert.deepEqual(Object.keys(refusals).sort(), ["develop-bead", "develop-claim", "develop-review", "develop-task", "select-integrate", "select-task"]);
  for (const [key, message] of Object.entries(refusals)) assert.match(message, /^WRITE_OPT_IN_REQUIRED: /, `${key} refused with ${message}`);
});

test("native process invocation stays confined to the named host modules; the libraries import none", () => {
  const importers = readdirSync(srcDir).filter(f => f.endsWith(".ts") && NATIVE_SPECIFIER.test(readFileSync(join(srcDir, f), "utf8"))).sort();
  assert.deepEqual(importers, [
    "beads-claim.ts", "beads-host.ts", "bounded-process.ts", "candidate-selection.ts", "git-source-publication.ts",
    "graph-policy-cli.ts", "graph-policy-rpc.ts", "inheritance-journey.ts", "installed-host.ts", "landing-journey.ts",
    "live-development.ts", "live-gate.ts", "rf-context.ts", "rf-provision.ts", "workspace-materialize.ts"
  ], "a new native-invoking module must be named here with its opt-in pinned in this file");
  for (const lib of ["coordination", "development"]) {
    const root = join(packagesDir, lib, "src");
    for (const f of readdirSync(root).filter(name => name.endsWith(".ts"))) {
      assert.doesNotMatch(readFileSync(join(root, f), "utf8"), /child_process/, `${lib}/src/${f} must not reach a native process API`);
    }
  }
});

test("the importer selector sees every form that reaches node:child_process, prefixed or bare, in double, single or backtick quotes, and nothing else", () => {
  const reaching = [
    'import { spawnSync } from "node:child_process";', "import { spawnSync } from 'node:child_process';", 'import { spawnSync } from "child_process";',
    'import "node:child_process";', 'import "child_process";', 'const cp = await import("node:child_process");', 'const cp = await import("child_process");',
    'const cp = require("node:child_process");', "const cp = require('child_process');",
    "const cp = await import(`node:child_process`);", "const cp = await import(`child_process`);"
  ];
  for (const line of reaching) assert.match(line, NATIVE_SPECIFIER, line);
  const unrelated = ['import { x } from "node:child_process_extra";', 'import { x } from "./child_process_shim.js";', "// a comment about child processes", 'const s = "child_processes";', "const t = `child_processes`;", "const u = `node:child_process_extra`;"];
  for (const line of unrelated) assert.doesNotMatch(line, NATIVE_SPECIFIER, line);
});

test("the shim list covers every process-spawning export of node:child_process", async () => {
  const cp = await import("node:child_process");
  const spawners = Object.keys(cp).filter(k => typeof (cp as Record<string, unknown>)[k] === "function" && /^(exec|spawn|fork)/.test(k)).sort();
  assert.deepEqual(spawners, [...SHIMMED].sort());
  assert.ok(pathToFileURL(distDir).href.endsWith("/"));
});
