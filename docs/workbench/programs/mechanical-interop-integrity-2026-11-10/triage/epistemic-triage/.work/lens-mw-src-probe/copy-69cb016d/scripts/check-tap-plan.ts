import { spawn } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { availableParallelism } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Declared-vs-reported TAP plan check for the test step (MechanicalWorkflows-nuir). The node test runner counts the
// results a test file reports; a test whose report never arrives (a synchronous process.stdout.write stub swallowed it,
// the module threw before registering) is invisible to a failure count and the step stays green. This check runs every
// test file through the same runner with the TAP reporter and refuses when the plan it reports falls short of the
// top-level test()/it() declarations a static scan of the file finds. Loop- or block-generated tests report more than
// the scan counts, which is never a refusal: only under-reporting is.
//
// usage: node scripts/check-tap-plan.ts [--root DIR] [FILE...]   FILE paths are relative to DIR (default: repo root)

const args = process.argv.slice(2);
let root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const explicit: string[] = [];
for (let index = 0; index < args.length; index++) {
  const arg = args[index];
  if (arg === "--root") { root = resolve(args[++index] ?? "."); continue; }
  if (arg === undefined || arg.startsWith("--")) { console.error(`INPUT_INVALID: unknown argument ${String(arg)}`); process.exit(2); }
  explicit.push(arg);
}

const DECLARATION = /^(?:void\s+)?(?:test|it)\s*\(/gm;
const PLAN = /^1\.\.(\d+)$/m;
const RESULT = /^(?:not )?ok \d+/gm;

function testFiles(dir: string): string[] {
  const absolute = join(root, dir);
  if (!existsSync(absolute)) return [];
  return readdirSync(absolute).filter(name => name.endsWith(".test.ts")).map(name => join(dir, name)).sort();
}
function memberDirs(parent: string): string[] {
  const absolute = join(root, parent);
  if (!existsSync(absolute)) return [];
  // Members are real directories (MechanicalWorkflows-869cl.2): a Dirent classifies without following, so a symlink (to a directory,
  // a cycle or nothing at all) is excluded deterministically instead of being followed or throwing ENOENT.
  return readdirSync(absolute, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name).sort().map(name => join(parent, name, "test"));
}
const files = explicit.length > 0
  ? explicit.map(path => path.replace(/\\/g, "/"))
  : ["scripts", ...memberDirs("packages"), ...memberDirs("apps")].flatMap(testFiles);

function nearestPackageDir(file: string): string {
  let dir = dirname(resolve(root, file));
  while (dir !== root && dir !== dirname(dir) && !existsSync(join(dir, "package.json"))) dir = dirname(dir);
  return dir;
}

interface FileReport { readonly file: string; readonly declared: number; readonly reported: number; readonly status: number | null; readonly planFound: boolean; readonly failingTap: string; readonly stderrTail: string }

// Bounds on the evidence a failing child contributes (MechanicalWorkflows-ah29): the last 20 stderr lines within 4 KiB, and
// at most 60 failing-TAP lines within 8 KiB, so one noisy file cannot flood the step log.
const STDERR_TAIL_LINES = 20;
const STDERR_TAIL_BYTES = 4096;
const FAILING_TAP_LINES = 60;
const FAILING_TAP_BYTES = 8192;
const STDERR_CAPTURE_BYTES = 65536;

function tailWithin(text: string, maxLines: number, maxBytes: number): string {
  const lines = text.split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  const joined = lines.slice(-maxLines).join("\n");
  return Buffer.byteLength(joined) > maxBytes ? Buffer.from(joined).subarray(-maxBytes).toString("utf8") : joined;
}
function headWithin(lines: readonly string[], maxLines: number, maxBytes: number): string[] {
  const kept: string[] = [];
  let bytes = 0;
  for (const line of lines) {
    bytes += Buffer.byteLength(line) + 1;
    if (kept.length >= maxLines || bytes > maxBytes) break;
    kept.push(line);
  }
  return kept;
}
// The node TAP reporter relays what a test file writes outside any test (a module that fails to load, console output) as "# "
// comment lines on stdout, so the loader error lives there rather than on the child's stderr; the run summary counters and
// the "# Subtest:" headers are structure, not evidence.
function tapDiagnostics(out: string): string {
  return out.split("\n")
    .filter(line => line.startsWith("# ") && !/^# (?:Subtest:|(?:tests|suites|pass|fail|cancelled|skipped|todo|duration_ms)\b)/.test(line))
    .map(line => line.slice(2))
    .join("\n");
}
// The failing "not ok" lines of a TAP stream, each with its indented YAML diagnostic block (--- ... ...).
function failingTap(out: string): string {
  const lines = out.split("\n");
  const picked: string[] = [];
  for (let index = 0; index < lines.length; index++) {
    const match = /^(\s*)not ok \d+/.exec(lines[index]!);
    if (match === null) continue;
    const indent = match[1]!.length;
    picked.push(lines[index]!);
    while (index + 1 < lines.length) {
      // A blank line inside a YAML block (an assertion message with an empty line) belongs to it while a deeper line follows.
      let probe = index + 1;
      while (probe < lines.length && lines[probe]!.trim() === "") probe++;
      const next = lines[probe];
      if (next === undefined || next.length - next.trimStart().length <= indent) break;
      picked.push(...lines.slice(index + 1, probe + 1));
      index = probe;
    }
  }
  return headWithin(picked, FAILING_TAP_LINES, FAILING_TAP_BYTES).join("\n");
}

function run(file: string): Promise<FileReport> {
  const declared = (readFileSync(resolve(root, file), "utf8").match(DECLARATION) ?? []).length;
  return new Promise(done => {
    // A checker invoked from inside another node --test run inherits NODE_TEST_CONTEXT, which would turn the child runner
    // into a serialized-report child instead of a TAP-printing parent; the child must be a fresh top-level runner.
    const env = { ...process.env };
    delete env.NODE_TEST_CONTEXT;
    const child = spawn(process.execPath, ["--test", "--test-reporter=tap", resolve(root, file)], { cwd: nearestPackageDir(file), env, stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", chunk => { out += chunk; });
    let err = "";
    child.stderr.setEncoding("utf8");
    // Keep only the newest bytes: the tail is what explains a failure and an unbounded buffer would grow with a noisy child.
    child.stderr.on("data", chunk => { err = (err + chunk).slice(-STDERR_CAPTURE_BYTES); });
    child.on("close", status => {
      const plan = PLAN.exec(out);
      const results = (out.match(RESULT) ?? []).length;
      // The plan is what the runner committed to; result lines corroborate it and the smaller of the two is the truth a reader can rely on.
      const reported = plan === null ? results : Math.min(Number(plan[1]), results);
      const failed = status !== 0;
      done({ file, declared, reported, status, planFound: plan !== null, failingTap: failed ? failingTap(out) : "", stderrTail: failed ? tailWithin([tapDiagnostics(out), err].filter(part => part !== "").join("\n"), STDERR_TAIL_LINES, STDERR_TAIL_BYTES) : "" });
    });
  });
}

async function pool<T>(items: readonly string[], width: number, work: (item: string) => Promise<T>): Promise<T[]> {
  const results: T[] = new Array(items.length);
  let next = 0;
  async function worker(): Promise<void> {
    while (next < items.length) { const index = next++; results[index] = await work(items[index]!); }
  }
  await Promise.all(Array.from({ length: Math.min(width, items.length) }, worker));
  return results;
}

const reports = await pool(files, Math.max(1, Math.min(8, availableParallelism() - 1)), run);
let errors = 0;
for (const report of reports) {
  const name = relative(root, resolve(root, report.file)).replace(/\\/g, "/");
  if (report.reported < report.declared) { console.error(`TEST_PLAN_UNDERREPORTED: ${name} declared=${report.declared} reported=${report.reported}${report.planFound ? "" : " (no TAP plan line)"}`); errors++; }
  if (report.status !== 0) {
    console.error(`TEST_FILE_FAILED: ${name} status=${String(report.status)}`);
    if (report.failingTap !== "") console.error(`${report.failingTap.split("\n").map(line => `  ${line}`).join("\n")}`);
    if (report.stderrTail !== "") console.error(`  child stderr and TAP diagnostics tail (last ${STDERR_TAIL_LINES} lines, ${STDERR_TAIL_BYTES} bytes max):\n${report.stderrTail.split("\n").map(line => `    ${line}`).join("\n")}`);
    errors++;
  }
}
const declared = reports.reduce((sum, report) => sum + report.declared, 0);
const reported = reports.reduce((sum, report) => sum + report.reported, 0);
console.log(`tap-plan: ${errors === 0 ? "pass" : "fail"} (${reports.length} files, declared ${declared}, reported ${reported})`);
process.exit(errors === 0 ? 0 : 1);
