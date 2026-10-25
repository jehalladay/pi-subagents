/**
 * wb-o4h0.3 (RF-FEDERATED-WORKSPACES-R4): Pi treats the proposed rf workspace link|links|inspect|exports|read|subscribe|unlink|invoke
 * family as unregistered until the rf registry serves it (ReactiveFiberCLI docs/programs/federated-workspaces-2026-10-18/04-cli-api.md:3
 * @6a251bf73af5: "All syntax in this file is PROPOSED; it is not registered in the current rf command registry."). The bead's
 * acceptance, quoted:
 *  (a) "guard: rf --json --version result.leaves[] (path/served rows, not capabilities.leaves) serves no workspace.* leaf, flipping
 *      to re-triage when one appears"
 *  (b) "Pi wrappers map the exit-2 pending-leaf refusal to a typed unshipped result; no fixture fabricates a federation success
 *      envelope"
 *  (c) "process-tree: no daemon after a federated read"
 *  (d) "the subscribe wrapper owns a supervised foreground child, never a detached service"
 * and its rationale: "Not P0: family unregistered; Pi already types the exit-2 refusal - no live false claim."
 *
 * What this file pins (test-only; src is unchanged):
 *  (a) The LEAVES rows judge judgeFamilyLeaves (test/helpers/rf-workspace-family.ts). The live row reads the CAPTURED registry
 *      test/fixtures/rf-version-leaves.json (rf 0.1.832: 79 rows, 72 served, no workspace row) as absent. The flip itself is the
 *      rf-preview tier row in test/workbench-native-rf-preview.test.ts: it judges the INSTALLED rf at run time and goes red
 *      (re-triage) when that rf serves a workspace leaf or its registry cannot be read. A capture never flips by itself.
 *  (b) No Pi wrapper for the family exists. The SOURCES rows judge scanFamilySource, and the live rows find no family argv or
 *      literal in any src file and no registered native descriptor naming the family. The one rf wrapper Pi has (the context render
 *      preview) maps an exit-2 pending-leaf refusal (RF_USAGE_NOT_IMPLEMENTED) to a typed unavailable error, and refuses the
 *      captured unknown-leaf refusal of `rf --json workspace link` (exit 2, RF_USAGE_UNKNOWN_COMMAND, command null) as a typed
 *      transport error, each in exactly one spawn. The ENVELOPES rows judge the fabrication scan, and the live row finds no file
 *      under test/ or qa/ that fabricates a family success envelope.
 *  (c)/(d) No federated read and no subscribe wrapper exist; the (b) absence rows go red on the first one. The posture both
 *      require is pinned on every rf launch src makes today: the LAUNCHES rows judge scanRfLaunches, the live row finds no rf launch
 *      setting detached: true and no rf child unref'd, and the process-tree row shows the rf child of a settled read is gone.
 *
 * Walk anchors (wb-dbpa, the R694 follow-up of the landing-265 gate: F1 lead, F2 and F4 riders). Every whole-tree walk is held
 * three ways. (1) Exact set: the two src walks read their file list off their own scans and hold it to an independent recursive
 * listing of src/, so narrowing a walk, or filtering it between its listing and its scans, reds; the test/qa walk holds its
 * listing the same way and its read list to every .json and module file. (2) Root floors (WALK_FLOORS): under each root the files
 * a walk read number at least the root's floor (src 100, test 500, qa 50, each below the count measured at trunk c27bd4b: src
 * 115 of 115 read, test 572 of 598, qa 63 of 67) and include the root's anchor file, holding its token, so a root dropped from or
 * narrowed in a walk AND its exact-set anchor together still reds, and an additive change does not. (3) Content floors: the
 * preview's context render argv and its rf launch, the landed context render success envelopes and the captured version
 * envelope. The four slow live rows (both src walks, the descriptor load and the test/qa walk) register WALK_BUDGET_MS, never
 * vitest's 5000 ms default, and the roster row reads each row's timeout off vitest's task tree.
 *
 * Residual families, each named with a pinned quiet row: R-COMPUTED-LEAF and R-SEPARATED-LEAF (source scan), R-INDIRECT-LAUNCH
 * (launch scan), R-INDIRECT-ENVELOPE and R-UNREAD-KIND (fabrication scan: .md and .sh files are not read).
 *
 * Rule 16: the frozen-shape row pins every judged row as table/id:case count, and test/fixtures/rf-workspace-family-roster.json
 * (the hk9l/5jha/1xvp.4 roster pattern) is the out-of-file anchor: every judged row (table, id, label, SHA-256 of each case), the
 * residual families and every registered test title, judged by this file's last row in order and both ways. The family list is
 * anchored outside this file and its roster: the anchor row reads it from the owner filing's title in the tracked bead export
 * (.beads/issues.jsonl, row wb-o4h0.3), so a hollow that drops a leaf from every literal here and regenerates the roster reds.
 *
 * Display paths added: none. This file is test-only.
 */
import { chmodSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { nativeReactiveFiberPreview } from "../src/workbench/providers/reactivefiber.js";
import { srcFiles } from "./helpers/gp-fallback-census.js";
import {
  ENVELOPES,
  envelopeKind,
  judgeFamilyLeaves,
  LAUNCHES,
  LEAVES,
  RESIDUAL_FAMILIES,
  RF_WORKSPACE_FAMILY,
  ROWS,
  SOURCES,
  scanEnvelopeJson,
  scanEnvelopeModule,
  scanFamilySource,
  scanRfLaunches,
  spellsFamily,
} from "./helpers/rf-workspace-family.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const CAPTURE = "test/fixtures/rf-version-leaves.json";
const ROSTER = "test/fixtures/rf-workspace-family-roster.json";
const PREVIEW = "src/workbench/providers/reactivefiber.ts";
/** The fixture kinds the fabrication walk reads, by extension (envelopeKind's json and module kinds). */
const READ_KIND = /\.(?:json|[cm]?ts|[cm]?js)$/;
/** The tracked bead export and this census's row in it: the owner filing, an anchor outside this file and its roster. */
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-o4h0.3";
/** The owner filing's title names the family once, as `the proposed rf workspace <leaf>|...|<leaf> family`. */
const FILING_FAMILY = /\bthe proposed rf workspace ((?:[a-z]+\|)+[a-z]+) family\b/g;
/** The budget the slow live rows register (landing-265 gate F4: 1649 ms and 931 ms in-gate under the 5000 ms default, one PREP-measured timeout at load1 ~292). */
const WALK_BUDGET_MS = 60_000;
/**
 * Each walk root's floor: under the root, the files a walk read number at least `floor` and include `anchorFile`, whose text holds
 * `anchorToken`. Each floor sits below the count measured at trunk c27bd4b (src 115 read of 115 files, test 572 of 598, qa 63 of 67);
 * each anchor sits outside the subtrees that hold the content floors (src/workbench, test/fixtures), so a walk narrowed to one of
 * them loses its anchor even when its count floor is lowered with it.
 */
const WALK_FLOORS = {
  src: { floor: 100, anchorFile: "src/index.ts", anchorToken: "export default function" },
  test: { floor: 500, anchorFile: "test/source-hygiene.test.ts", anchorToken: "wb-era" },
  qa: { floor: 50, anchorFile: "qa/workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts" },
} as const;
/** The slow live rows, by title: the roster row holds them, and only them, to WALK_BUDGET_MS. */
const SRC_WALK = "live (b): no src file spells a family argv or literal; the walk is every regular file under src/ and reaches the preview's argv";
const DESCRIPTOR_WALK = "live (b): no registered native capability descriptor names the family";
const FIXTURE_WALK = "live (b): no file under test/ or qa/ fabricates a family success envelope; the walk reads every .json and module file there";
const LAUNCH_WALK = "live (c)/(d): no src rf launch sets detached: true and no rf child is unref'd; the walk is every regular file under src/ and reaches the preview's launch";

interface Capture {
  readonly source: string;
  readonly rfVersion: string;
  readonly envelope: { readonly result: { readonly leaves: readonly { readonly served: boolean }[] } };
  readonly unknownLeafRefusal: { readonly argv: readonly string[]; readonly exit: number; readonly stdout: unknown };
}
interface Roster {
  readonly rows: unknown;
  readonly tests: readonly string[];
  readonly residuals: unknown;
}
const readJson = <T>(rel: string): T => JSON.parse(readFileSync(join(ROOT, rel), "utf8")) as T;

/** Every regular file under ROOT/dir from a recursive readdir plus stat, listed independently of srcFiles: the walks' exact-set anchor. */
function listedFiles(dir: string): string[] {
  return readdirSync(join(ROOT, dir), { recursive: true, encoding: "utf8" })
    .map(name => `${dir}/${name.split("\\").join("/")}`)
    .filter(rel => statSync(join(ROOT, rel)).isFile())
    .sort();
}

/** Holds one root of a walk to its floor: the files read under the root meet the count floor and include the anchor file, holding its token. */
function expectWalkFloor(root: keyof typeof WALK_FLOORS, read: readonly string[]): void {
  const { floor, anchorFile, anchorToken } = WALK_FLOORS[root];
  const under = read.filter(rel => rel.startsWith(`${root}/`));
  expect(under.length >= floor, `${root}: ${under.length} files read, floor ${floor}`).toBe(true);
  expect(under.includes(anchorFile) && readFileSync(join(ROOT, anchorFile), "utf8").includes(anchorToken), `${root}: the walk read ${anchorFile}, holding ${anchorToken}`).toBe(true);
}

/** The title of this census's row in the tracked bead export; throws when the export holds no such row. */
function filingTitle(): string {
  for (const line of readFileSync(join(ROOT, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (row !== null && typeof row === "object" && "id" in row && row.id === BEAD && "title" in row && typeof row.title === "string") return row.title;
  }
  throw new Error(`the tracked bead export holds no ${BEAD} row`);
}

function envelopeCounts(file: string, text: string): { readonly family: number; readonly successes: number } {
  const kind = envelopeKind(file);
  if (kind === undefined) return { family: 0, successes: 0 };
  const scan = kind === "json" ? scanEnvelopeJson(file, text) : scanEnvelopeModule(file, text);
  return { family: scan.family.length, successes: scan.successes.length };
}

/** The pending-leaf refusal: exit 2, RF_USAGE_NOT_IMPLEMENTED, addressed to the wrapper's own command. */
const PENDING_REFUSAL = {
  schema: "reactive-fiber.cli/v1",
  ok: false,
  command: "context.render",
  operation_id: `rfo_${"b".repeat(26)}`,
  workspace: null,
  transaction_id: null,
  result: null,
  diagnostics: [{ code: "RF_USAGE_NOT_IMPLEMENTED", severity: "error", message: "planned leaf", hint: null, source: "host", metadata: {} }],
};

const ORIGINAL_PATH = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = ORIGINAL_PATH;
  removeScratch(...scratches.splice(0));
});

/** A fake rf first on PATH: records its pid and one JSON argv line per spawn, prints `stdout` as JSON and exits with `code`. */
function fakeRf(stdout: unknown, code: number): { readonly log: string; readonly pidFile: string } {
  const folder = makeScratch("rf-workspace-family-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const pidFile = join(folder, "pid");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    `#!/usr/bin/env node\nconst fs = require("node:fs");\nfs.writeFileSync(${JSON.stringify(pidFile)}, String(process.pid));\nfs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(${JSON.stringify(JSON.stringify(stdout))});\nprocess.exit(${code});\n`,
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${ORIGINAL_PATH ?? ""}`;
  return { log, pidFile };
}

function spawnedArgv(log: string): string[][] {
  return readFileSync(log, "utf8").trim().split("\n").map(line => JSON.parse(line) as string[]);
}

/** True when an argv holds workspace then a family leaf, or any element spelling a leaf. */
function namesFamily(argv: readonly string[]): boolean {
  const family = new Set<string>(RF_WORKSPACE_FAMILY);
  return argv.some((element, index) => (element === "workspace" && family.has(argv[index + 1] ?? "")) || spellsFamily(element));
}

describe("rf workspace family census (wb-o4h0.3, RF-FEDERATED-WORKSPACES-R4)", () => {
  for (const entry of LEAVES) {
    it(`LEAVES ${entry.id}`, () => {
      for (const item of entry.cases) {
        const verdict = judgeFamilyLeaves(item.stdout);
        expect({ verdict: verdict.verdict, served: verdict.served, planned: verdict.planned }, item.stdout.slice(0, 160)).toEqual(item.expect);
      }
    });
  }
  for (const entry of SOURCES) {
    it(`SOURCES ${entry.id}`, () => {
      for (const item of entry.cases) {
        const scan = scanFamilySource(item.file, item.text);
        expect({ argv: scan.argv.length, literals: scan.literals.length }, item.text).toEqual(item.expect);
      }
    });
  }
  for (const entry of LAUNCHES) {
    it(`LAUNCHES ${entry.id}`, () => {
      for (const item of entry.cases) {
        const scan = scanRfLaunches(item.file, item.text);
        expect({ launches: scan.launches.length, detached: scan.detached.length, unref: scan.unref.length }, item.text).toEqual(item.expect);
      }
    });
  }
  for (const entry of ENVELOPES) {
    it(`ENVELOPES ${entry.id}`, () => {
      for (const item of entry.cases) expect(envelopeCounts(item.file, item.text), `${item.file}: ${item.text}`).toEqual(item.expect);
    });
  }

  it("live (a): the captured rf registry (test/fixtures/rf-version-leaves.json, rf 0.1.832) reads absent over all of its rows", () => {
    const capture = readJson<Capture>(CAPTURE);
    const rows = capture.envelope.result.leaves;
    expect({ source: capture.source, rf: capture.rfVersion, rows: rows.length, served: rows.filter(row => row.served).length }).toEqual({ source: "captured", rf: "0.1.832", rows: 79, served: 72 });
    const verdict = judgeFamilyLeaves(JSON.stringify(capture.envelope));
    expect({ verdict: verdict.verdict, leaves: verdict.leaves, served: verdict.served, planned: verdict.planned }).toEqual({ verdict: "absent", leaves: 79, served: [], planned: [] });
  });

  it(SRC_WALK, { timeout: WALK_BUDGET_MS }, () => {
    const scans = srcFiles(ROOT).map(rel => ({ rel, ...scanFamilySource(rel, readFileSync(join(ROOT, rel), "utf8")) }));
    const read = scans.map(scan => scan.rel);
    expect([...read].sort(), "the walk scanned exactly an independent recursive listing of src/").toEqual(listedFiles("src"));
    expectWalkFloor("src", read);
    expect({ argv: scans.flatMap(scan => scan.argv), literals: scans.flatMap(scan => scan.literals) }).toEqual({ argv: [], literals: [] });
    expect(scans.flatMap(scan => scan.renderArgv).some(site => site.startsWith(`${PREVIEW}:`)), "the walk reached the preview's context render argv").toBe(true);
  });

  it(DESCRIPTOR_WALK, { timeout: WALK_BUDGET_MS }, async () => {
    const native = await loadWorkbenchNative();
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    expect(descriptors.filter(descriptor => descriptor.id.startsWith("reactivefiber.")).length).toBeGreaterThanOrEqual(1);
    expect(descriptors.filter(descriptor => spellsFamily(JSON.stringify(descriptor))).map(descriptor => descriptor.id)).toEqual([]);
    // Non-vacuity: the same reader finds a descriptor that names a leaf.
    expect(spellsFamily(JSON.stringify({ ...descriptors[0], id: "reactivefiber.workspace.read" }))).toBe(true);
  });

  it(FIXTURE_WALK, { timeout: WALK_BUDGET_MS }, () => {
    const files = [...srcFiles(ROOT, "test"), ...srcFiles(ROOT, "qa")];
    expect([...files].sort(), "the walk equals an independent recursive listing of test/ and qa/").toEqual([...listedFiles("test"), ...listedFiles("qa")].sort());
    const family: string[] = [];
    const successes: string[] = [];
    const read: string[] = [];
    for (const rel of files) {
      const kind = envelopeKind(rel);
      if (kind === undefined) continue;
      read.push(rel);
      const text = readFileSync(join(ROOT, rel), "utf8");
      const scan = kind === "json" ? scanEnvelopeJson(rel, text) : scanEnvelopeModule(rel, text);
      family.push(...scan.family);
      successes.push(...scan.successes);
    }
    expect(family).toEqual([]);
    expect(read, "every .json, .ts, .mts, .cts, .js, .mjs and .cjs file is read").toEqual(files.filter(rel => READ_KIND.test(rel)));
    // The floor: the walk reached the landed context render success envelopes in modules and the captured version envelope in JSON.
    expect(successes.some(entry => entry.endsWith(" context.render"))).toBe(true);
    expect(successes).toContain(`${CAPTURE}#/envelope version`);
    // The root floors: a root dropped from or narrowed in the walk and its exact-set anchor together reds here.
    expectWalkFloor("test", read);
    expectWalkFloor("qa", read);
  });

  it("live (b): the rf wrapper maps an exit-2 pending-leaf refusal to typed unavailable and the captured unknown-leaf refusal to typed transport, each in one spawn naming no family leaf", async () => {
    const pending = fakeRf(PENDING_REFUSAL, 2);
    await expect(nativeReactiveFiberPreview("model", "task", ROOT)).rejects.toMatchObject({ category: "unavailable", message: "RF render refused: RF_USAGE_NOT_IMPLEMENTED" });
    const capture = readJson<Capture>(CAPTURE).unknownLeafRefusal;
    expect({ argv: capture.argv, exit: capture.exit }).toEqual({ argv: ["--json", "workspace", "link"], exit: 2 });
    const unknown = fakeRf(capture.stdout, capture.exit);
    await expect(nativeReactiveFiberPreview("model", "task", ROOT)).rejects.toMatchObject({ category: "transport", message: "RF preview returned an unrecognized native envelope." });
    // Non-vacuity: the argv reader finds a family argv in either spelling.
    expect([namesFamily(["--json", "workspace", "read"]), namesFamily(["--json", "workspace.subscribe"])]).toEqual([true, true]);
    for (const log of [pending.log, unknown.log]) {
      const spawns = spawnedArgv(log);
      expect(spawns).toHaveLength(1);
      expect(spawns[0]).toContain("--no-commit");
      expect(namesFamily(spawns[0] ?? []), JSON.stringify(spawns[0])).toBe(false);
    }
  });

  it(LAUNCH_WALK, { timeout: WALK_BUDGET_MS }, () => {
    const scans = srcFiles(ROOT).map(rel => ({ rel, ...scanRfLaunches(rel, readFileSync(join(ROOT, rel), "utf8")) }));
    const read = scans.map(scan => scan.rel);
    expect([...read].sort(), "the launch walk scanned exactly an independent recursive listing of src/").toEqual(listedFiles("src"));
    expectWalkFloor("src", read);
    expect({ detached: scans.flatMap(scan => scan.detached), unref: scans.flatMap(scan => scan.unref) }).toEqual({ detached: [], unref: [] });
    expect(scans.flatMap(scan => scan.launches).some(site => site.startsWith(`${PREVIEW}:`)), "the walk reached the preview's rf launch").toBe(true);
  });

  it("live (c): the rf child of a settled read is gone: its pid answers ESRCH once the read settles", async () => {
    const { pidFile } = fakeRf(PENDING_REFUSAL, 2);
    await expect(nativeReactiveFiberPreview("model", "task", ROOT)).rejects.toMatchObject({ category: "unavailable" });
    const pid = Number(readFileSync(pidFile, "utf8"));
    expect(Number.isSafeInteger(pid) && pid > 0 && pid !== process.pid, String(pid)).toBe(true);
    let state = "alive";
    try {
      process.kill(pid, 0);
    } catch (error) {
      state = (error as NodeJS.ErrnoException).code ?? "unknown";
    }
    expect(state).toBe("ESRCH");
  });

  it("anchor: the family is the list the owner filing names, read from its row in the tracked bead export (.beads/issues.jsonl, wb-o4h0.3)", () => {
    const named = [...filingTitle().matchAll(FILING_FAMILY)].map(match => (match[1] ?? "").split("|"));
    expect(named, "the filing's title names the family exactly once").toHaveLength(1);
    expect(RF_WORKSPACE_FAMILY, "the census family equals the filing's list, leaf for leaf and in order").toEqual(named[0]);
  });

  it("rule 16: every judged row is frozen at its measured shape", () => {
    expect(ROWS.map(entry => `${entry.table}/${entry.id}:${entry.pins.length}`)).toEqual([
      "LEAVES/SERVED-LINK:2",
      "LEAVES/SERVED-LINKS:2",
      "LEAVES/SERVED-INSPECT:2",
      "LEAVES/SERVED-EXPORTS:2",
      "LEAVES/SERVED-READ:2",
      "LEAVES/SERVED-SUBSCRIBE:2",
      "LEAVES/SERVED-UNLINK:2",
      "LEAVES/SERVED-INVOKE:2",
      "LEAVES/SERVED-OTHER-SPELLINGS:4",
      "LEAVES/PLANNED-STAYS-ABSENT:3",
      "LEAVES/CAPABILITIES-NOT-READ:3",
      "LEAVES/NOT-A-VERSION-ENVELOPE:8",
      "LEAVES/NO-READABLE-ROWS:6",
      "LEAVES/NO-FAMILY-ROW:2",
      "SOURCES/ARGV-ADJACENT:5",
      "SOURCES/LITERAL-SPELLED:6",
      "SOURCES/CLEAN-SHAPES:5",
      "SOURCES/R-SEPARATED-LEAF:2",
      "SOURCES/R-COMPUTED-LEAF:3",
      "LAUNCHES/DETACHED-FOUND:5",
      "LAUNCHES/UNREF-FOUND:4",
      "LAUNCHES/FOREGROUND-CLEAN:4",
      "LAUNCHES/R-INDIRECT-LAUNCH:4",
      "ENVELOPES/MODULE-FABRICATION-FOUND:4",
      "ENVELOPES/JSON-FABRICATION-FOUND:2",
      "ENVELOPES/REFUSALS-AND-OTHERS-CLEAN:5",
      "ENVELOPES/R-INDIRECT-ENVELOPE:3",
      "ENVELOPES/R-UNREAD-KIND:2",
    ]);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([family, members]) => `${family}:${members.join(",")}`)).toEqual([
      "R-COMPUTED-LEAF:SOURCES R-COMPUTED-LEAF",
      "R-SEPARATED-LEAF:SOURCES R-SEPARATED-LEAF",
      "R-INDIRECT-LAUNCH:LAUNCHES R-INDIRECT-LAUNCH",
      "R-INDIRECT-ENVELOPE:ENVELOPES R-INDIRECT-ENVELOPE",
      "R-UNREAD-KIND:ENVELOPES R-UNREAD-KIND",
    ]);
    expect(RF_WORKSPACE_FAMILY).toEqual(["link", "links", "inspect", "exports", "read", "subscribe", "unlink", "invoke"]);
  });

  it("roster: the judged rows, the registered tests and the residual families equal test/fixtures/rf-workspace-family-roster.json, in order and both ways", ({ task }) => {
    const roster = readJson<Roster>(ROSTER);
    expect(ROWS, "the judged rows, read now, equal the roster rows exactly and in order").toEqual(roster.rows);
    expect(RESIDUAL_FAMILIES, "the named residual families equal the roster's").toEqual(roster.residuals);
    for (const member of Object.values(RESIDUAL_FAMILIES).flat()) expect(ROWS.some(entry => entry.test === member), `${member} is a judged row`).toBe(true);
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly timeout: number; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, timeout: child.timeout, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(roster.tests);
    expect(roster.tests.slice(0, ROWS.length), "each judged row registers its own test, in row order").toEqual(ROWS.map(entry => entry.test));
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    expect(
      walked.filter(entry => entry.timeout === WALK_BUDGET_MS).map(entry => entry.name),
      "the four slow live rows, and only they, register the walk budget (never vitest's 5000 ms default)",
    ).toEqual([SRC_WALK, DESCRIPTOR_WALK, FIXTURE_WALK, LAUNCH_WALK]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
