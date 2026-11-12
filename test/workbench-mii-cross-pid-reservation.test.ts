/**
 * wb-yk1k (MII P03+ packet), cut #4 (the respin of cut #3 after refusal #3): EAT-R399 criterion 1 only, and two
 * in-process cases of the reservation-store form, R399-STORE-VALIDATION and R399-RECORD-NAMING, that pin forms the
 * comments of src/workbench/source-admission.ts state. Requirement text:
 * docs/workbench/programs/mechanical-interop-integrity-2026-11-10/requirements/ATOMIC-REQUIREMENTS.md at Pi master 347d58ea
 * (the program pages are master-only). The statement, line 254: "Admitted Mechanical function writers on one supported
 * machine MUST acquire ownership through one durable authoritative reservation store keyed by canonical root."
 * Criterion 1, line 259:
 *   "Start two independent Pi processes with the same configured authoritative store, simultaneously requesting one
 *   realpath through direct/symlink/dot aliases. Exactly one acquires the writer reservation; the other receives
 *   writer-held (or the ratified bounded queue state), with aggregate writer count one."
 * The negative mutant, line 262: "Replace the authoritative store with new WriterLeases per process; the dual-process
 * alias test must detect two writers." Line 263 names the planned evidence label G07-CROSS-PID-RESERVATION; this file is
 * that label's criterion 1 leg, at evidence tier V1 only.
 *
 * The trial. Every race runs two child Node processes (CHILD below, run with --experimental-transform-types and a resolve
 * hook that maps a relative ".js" import to its ".ts" source) that import the REAL src/workbench/source-admission.ts.
 * Each child builds its own registry - new WriterLeases({ store }) over the race's store directory, or new WriterLeases()
 * where a case says so - prints READY and waits on its stdin. Once both children are READY the parent writes GO to each
 * child's stdin, one after the other, so both are released together: the race reads reportsAtGo, for each GO the number
 * of reports (ENTERED or RESULT) the parent had received from either child when it wrote that GO, and every race case
 * asserts it is [0, 0]. Each child then makes its one request through its own spelling of ws, a committed Git repository
 * in tracked scratch: its direct path, the symlink ws-link beside it, or the dot spelling <authorized>/./ws. A child
 * reports what it got on stdout and holds it, releasing nothing, until the parent writes FINISH. Each race over a store
 * uses a fresh store directory. R399-C1-STORE and R399-C1-ADMISSION each run one race for
 * each unordered pair of the three spellings (ALIAS_PAIRS), the first spelling of a pair in the child that runs inv-a and
 * the second in the child that runs inv-b. R399-STORE-VALIDATION and R399-RECORD-NAMING run no race: each drives the
 * REAL module in this test process over a fresh store directory.
 *
 * PINNED READER SET (case id: reader, what it asserts):
 *   R399-C1-STORE: WriterLeases acquire, in the two children of a race over one store, released together (reportsAtGo
 *     [0, 0]), each on its spelling of ws: exactly one child gets a lease, equal to { canonicalRoot: the realpath of ws,
 *     invocationId: that child's invocation }, the other gets undefined, both children exit 0, and holder, read in the
 *     parent through a third registry over the same store, names the lease's invocation for each of the three spellings.
 *   R399-C1-ADMISSION: admitSourceWrite, in the two children of a race over one store, released together (reportsAtGo
 *     [0, 0]), each child admitting its own invocation on its spelling of ws under its own authority's attestation of
 *     ws's measured identity, with a dispatch that reports ENTERED with its grant's lease and then waits for FINISH:
 *     exactly one child enters its dispatch, with the lease { canonicalRoot: the realpath of ws, invocationId: that
 *     child's invocation }, the other admission returns the whole writer-held refusal and never enters, so ENTERED is
 *     reported once across the two children; after FINISH the entered admission returns { decision: "dispatched",
 *     value: "wrote" } and both children exit 0.
 *   R399-C1-DETECTOR: the R399-C1-ADMISSION race, released together (reportsAtGo [0, 0]), over one pair (direct, symlink)
 *     with new WriterLeases() in each child and no store, the per-process registry of the named mutant: both children
 *     enter their dispatch, each with the lease { canonicalRoot: the realpath of ws, invocationId: its own invocation },
 *     so the harness's ENTERED count reads 2 in a race where both processes write, and both admissions return
 *     { decision: "dispatched", value: "wrote" }.
 *   R399-C1-SHAPE: test/fixtures/mii-r399-requirement.json, the anchor outside this file's literals, vendors EAT-R399's
 *     lines 250-272 at 347d58ea: its id and line label are EAT-R399 and 250-272, its text is 23 lines, the first opening
 *     with "## EAT-R399 ", and the SHA-256 of those lines, each followed by a line feed, is VENDORED_LINES_SHA256, the
 *     digest of lines 250-272 of the page at 347d58ea that cut #2 recorded (git show 347d58ea:<page> | sed -n 250,272p).
 *     This header is this file's lines before its first import line (headerLines), read before any count below: its
 *     first and last lines are HEADER_EDGES, the comment opener alone and the comment close alone; every line between
 *     them is a space and an asterisk, alone or followed by a space, and holds no comment close; every line is printable
 *     ASCII (U+0020 to U+007E); and SECTION_WORDS matches the lower-case copies of exactly three of its lines, capturing,
 *     in order, "pinned reader set", "not claimed by this census:" and "residual:", the first of those lines being
 *     the heading PINNED_HEADING and the third RESIDUAL_LINE, the line right before the close. In this header's prose
 *     (headerProse: its lines between the first and the last, each without its comment prefix and trimmed, the empty
 *     ones dropped, joined by single spaces), QUOTE_LABEL matches exactly the three labels openingParagraph composes
 *     from the fixture, in order, one naming the statement, one criterion 1 and one the negative mutant, each with the
 *     line number the fixture gives that line; PAGE_WORDS and EVIDENCE_WORDS each match once; in the prose's upper-case
 *     copy and in its lower-case copy, QUOTE_LABEL, PAGE_WORDS and EVIDENCE_WORDS match 3, 1 and 1 times; and the
 *     vendored statement, criterion 1 and negative mutant each occur in the prose in double quotes once. Read after
 *     those counts, the prose
 *     before its first " The trial. " holds six double quote marks and equals the paragraph openingParagraph composes:
 *     SCOPE_SENTENCE, then the sentence naming the fixture's requirements.path and the first 8 hex digits of its commit,
 *     then each of the three vendored lines in double quotes right after its label, then the sentence giving the V-tier
 *     line's number and the evidence label that line names. ALIAS_KINDS equals the alias kinds the vendored criterion 1
 *     names (direct, symlink and dot); and ALIAS_PAIRS equals the frozen list direct+symlink, direct+dot, symlink+dot,
 *     which is each unordered pair of those kinds once.
 *   R399-STORE-VALIDATION: the REAL WriterLeases in this process, over a fresh store. The constructor throws a validation
 *     CapabilityError with the message "A writer reservation store names an absolute directory." for the options null,
 *     { store: "relative-store" }, { store: 7 } and { store: the store's path followed by U+000A }. A registry over the
 *     store throws, from acquire, a validation CapabilityError with the message "A writer lease names a canonical
 *     workspace root and an invocation." for the relative root "authorized/ws" with inv-a, ws followed by U+000A with
 *     inv-a, ws with the invocation "" and ws with the invocation "text" U+000A "next"; and one with the message "A writer
 *     reservation names a workspace root that resolves." for two absolute roots that realpath does not resolve, the
 *     missing directory <scratch>/missing and the symlink <scratch>/missing-link to it, each with inv-a. After each of
 *     those six acquires the store holds no file, and holder then answers undefined for ws.
 *   R399-RECORD-NAMING: the REAL WriterLeases in this process: one registry over a fresh store acquires the directory
 *     <scratch>/ra for inv-a and then, through the symlink <scratch>/rb-link, its sibling directory <scratch>/r<U+00E9>
 *     for inv-b. Each acquire returns { canonicalRoot: that directory's realpath, invocationId: its invocation }, holder
 *     answers inv-a for ra and inv-b for r<U+00E9>, and the store then holds exactly two files, each named by the lowercase
 *     hex SHA-256 of the UTF-8 bytes of one of the two realpaths followed by ".json".
 *   ROSTER: the tests this file registers are exactly the ROSTER titles, in order, each in run mode and none marked to fail,
 *     ROSTER registered last; the leading ids of their titles are exactly the ids that open this PINNED READER SET's
 *     bullets (pinnedLines: this header's lines after PINNED_HEADING and before the first that opens with
 *     NOT_CLAIMED_OPENER, none if either line is missing or that one comes first), each of those lines matching
 *     BULLET_ID, a bullet's first line (after the comment prefix, three spaces, a case id of capitals, digits and
 *     hyphens, a colon, a space and a non-space), or BULLET_NEXT, one of its next lines (after the comment prefix, five
 *     spaces and a non-space), and no other line of this header matches BULLET_ID; every R399 case id the source of
 *     src/workbench/source-admission.ts cites is one of those ids; each declaration line SRC_CITATIONS names occurs in
 *     that source once, as a whole line; and the R399 case ids the source cites, in source order, are exactly the ids
 *     SRC_CITATIONS lists, each declaration's ids cited, in order, by the JSDoc comment that ends on the line right before
 *     it (the comments of WriterLeases, its constructor, acquire and reservationPath).
 * NOT CLAIMED by this census: EAT-R399 criteria 2 and 3 (a fresh process reading the persisted owner, generation and
 * custody state; a second registry in one process; the receipt's store facts; restart; acquisition-store failure). When
 * and how a reservation is released (EAT-R400, EAT-R403) is NOT CLAIMED by this census. The bead's other rows (EAT-R400
 * to EAT-R411, EAT-R427, EAT-R464) are NOT CLAIMED by this census. A Pi session, an extension host or the registered
 * workflow_execute route (V3), and any fault trial (V5), are NOT CLAIMED by this census. More than two processes, any
 * spelling other than the three, letter-case, hard-link and bind-mount aliases, nested or overlapping roots, and any file
 * system other than the scratch directory's are NOT CLAIMED by this census. Which child wins a race, and how close
 * together the two requests run, are NOT CLAIMED by this census. Power-loss durability is NOT CLAIMED by this census.
 * Any options, store, root or invocation that R399-STORE-VALIDATION does not plant, and the name of the record file of
 * any root R399-RECORD-NAMING does not plant, are NOT CLAIMED by this census. Outside this header's opening paragraph,
 * any label that QUOTE_LABEL does not match, with any quote after it other than the vendored statement, criterion 1 and
 * negative mutant, and any page, commit or evidence label named in words that PAGE_WORDS and EVIDENCE_WORDS do not match,
 * are NOT CLAIMED by this census. This file's comments after this header are NOT CLAIMED by this census.
 * RESIDUAL: none claimed.
 */
import { type ChildProcess, execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { WriterLeases, type WriterReservationStore } from "../src/workbench/source-admission.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

vi.setConfig({ testTimeout: 240_000 });

const THIS_FILE = fileURLToPath(import.meta.url);
const ROOT = realpathSync(resolve(dirname(THIS_FILE), ".."));
const MODULE = join(ROOT, "src", "workbench", "source-admission.ts");
const NODE_FLAGS = ["--experimental-transform-types", "--disable-warning=ExperimentalWarning", "--input-type=module", "-e"];
/** How long one child may take to report an event before the race fails with its stderr. */
const EVENT_MS = 180_000;
const INVOCATIONS = ["inv-a", "inv-b"] as const;
/** EAT-R399's section of the program's ATOMIC-REQUIREMENTS.md, vendored line by line with its commit and blob. */
interface RequirementFixture {
  readonly commit: string;
  readonly requirements: { readonly path: string };
  readonly requirement: { readonly id: string; readonly lines: string; readonly text: readonly string[] };
}
const REQUIREMENT = JSON.parse(readFileSync(join(ROOT, "test", "fixtures", "mii-r399-requirement.json"), "utf8")) as RequirementFixture;
const WRITER_HELD = { decision: "refused", code: "writer-held", reason: "the writer lease of this canonical workspace is held" } as const;
const DISPATCHED = { decision: "dispatched", value: "wrote" } as const;
/** The tags of a child's report after GO: ENTERED for an admission whose dispatch was entered, RESULT for what it got. */
const REPORTS: readonly string[] = ["ENTERED", "RESULT"];
/** The messages of the validation CapabilityErrors WriterLeases throws with a store (src/workbench/source-admission.ts). */
const STORE_VALIDATION = "A writer reservation store names an absolute directory.";
const LEASE_VALIDATION = "A writer lease names a canonical workspace root and an invocation.";
const ROOT_VALIDATION = "A writer reservation names a workspace root that resolves.";
/** R399-C1-SHAPE's view of this header: its first and last lines, the comment opener alone and the comment close alone. */
const HEADER_EDGES = ["/**", " */"] as const;
/** The line of this header that heads its PINNED READER SET (R399-C1-SHAPE, pinnedLines). */
const PINNED_HEADING = " * PINNED READER SET (case id: reader, what it asserts):";
/** What the line that opens this header's NOT CLAIMED paragraph opens with (pinnedLines). */
const NOT_CLAIMED_OPENER = " * NOT CLAIMED by this census:";
/** This header's line right before its close (R399-C1-SHAPE). */
const RESIDUAL_LINE = " * RESIDUAL: none claimed.";
/** The words that open a section of this header, after the comment prefix and any spaces, read in a line's lower-case copy. */
const SECTION_WORDS = /^ \* +(pinned reader set|not claimed by this census:|residual:)/;
/** A bullet's first line in this header's PINNED READER SET: three spaces, its case id, a colon, a space and a non-space. */
const BULLET_ID = /^ \* {3}([A-Z0-9-]+): \S/;
/** One of a bullet's next lines in this header's PINNED READER SET: five spaces and a non-space. */
const BULLET_NEXT = /^ \* {5}\S/;
/**
 * The SHA-256 of lines 250-272 of the vendored page at the vendored commit, each line followed by a line feed, recorded by
 * wb-yk1k cut #2 from git show 347d58ea914bdcbdb979a162dcbcd224225ef072:<requirements.path> | sed -n 250,272p.
 */
const VENDORED_LINES_SHA256 = "e8d65ac05b6bafa4dbc508e8e59110d00db1d50310b14963b862b96748f42d89";
/** This header's first sentence: R399-C1-SHAPE composes the header's opening paragraph from it and the fixture. */
const SCOPE_SENTENCE =
  "wb-yk1k (MII P03+ packet), cut #4 (the respin of cut #3 after refusal #3): EAT-R399 criterion 1 only, and two in-process cases of the reservation-store form, R399-STORE-VALIDATION and R399-RECORD-NAMING, that pin forms the comments of src/workbench/source-admission.ts state.";
/**
 * R399-C1-SHAPE's label form: the statement, criterion <n> or the negative mutant, then a comma, the word line, a number and a
 * colon, in any letter case. The opening paragraph quotes each vendored line right after one such label.
 */
const QUOTE_LABEL = /(?:the statement|criterion \d+|the negative mutant), line \d+:/gi;
/** R399-C1-SHAPE's opening words of the page-and-commit sentence, in any letter case. */
const PAGE_WORDS = /requirement text:/gi;
/** R399-C1-SHAPE's words of the evidence-label sentence, in any letter case. */
const EVIDENCE_WORDS = /names the planned evidence label/gi;
/** An R399 case id as src/workbench/source-admission.ts cites one. */
const R399_CASE_ID = /(?<![\w-])R399-[A-Z0-9]+(?:-[A-Z0-9]+)*/g;
/**
 * The R399 case ids src/workbench/source-admission.ts cites, in source order: each declaration line, and the ids the JSDoc
 * comment that ends right before it cites, in order (ROSTER).
 */
const SRC_CITATIONS: readonly (readonly [string, readonly string[]])[] = [
  ["export class WriterLeases {", ["R399-C1-STORE", "R399-C1-ADMISSION", "R399-STORE-VALIDATION", "R399-RECORD-NAMING"]],
  ["  constructor(options?: WriterReservationStore) {", ["R399-STORE-VALIDATION"]],
  ["  acquire(canonicalRoot: string, invocationId: string): WriterLease | undefined {", ["R399-STORE-VALIDATION"]],
  ["function reservationPath(store: string, canonicalRoot: string): string {", ["R399-RECORD-NAMING"]],
];

/** The criterion's alias kinds, each spelled for ws by spellingOf. */
const ALIAS_KINDS = ["direct", "symlink", "dot"] as const;
type AliasKind = (typeof ALIAS_KINDS)[number];
/** Each unordered pair of the alias kinds once: the first runs in inv-a's child, the second in inv-b's. */
const ALIAS_PAIRS: readonly (readonly [AliasKind, AliasKind])[] = [
  ["direct", "symlink"],
  ["direct", "dot"],
  ["symlink", "dot"],
];

/** Every test this file registers, in registration order (the ROSTER case reads vitest's task tree against it). */
const ROSTER = [
  "R399-C1-STORE two children over one store, released together, acquire ws through each pair of its direct, symlink and dot spellings: exactly one gets a lease naming the realpath and its own invocation, the other gets undefined, and holder read in the parent names that invocation through every spelling",
  "R399-C1-ADMISSION two children running admitSourceWrite over one store, released together, on each pair of ws's spellings: exactly one enters its dispatch with a lease naming the realpath, the other refuses writer-held without entering, and the entered write then dispatches",
  "R399-C1-DETECTOR the same admission race, released together, with new WriterLeases() in each child, the named mutant's per-process registry, enters both dispatches, so the race reads two writers when two exist",
  "R399-C1-SHAPE the fixture's lines hash to the digest recorded from EAT-R399's lines 250-272 at 347d58ea; this header, the file's lines before its first import line, is one comment of printable ASCII lines in which the section words open its PINNED READER SET heading, its NOT CLAIMED paragraph and RESIDUAL_LINE, the line before its close, once each and in that order; in its prose QUOTE_LABEL matches only the three labels composed from the fixture, PAGE_WORDS and EVIDENCE_WORDS match once each, also in its upper- and lower-case copies, the three vendored quotes occur once each, and the opening paragraph holds six double quote marks and equals openingParagraph's; ALIAS_KINDS are criterion 1's alias kinds and ALIAS_PAIRS their frozen unordered pairs",
  "R399-STORE-VALIDATION with a store, the constructor and acquire throw their validation CapabilityErrors with their exact messages for the options, roots and invocations this case plants, and the store then holds no file",
  "R399-RECORD-NAMING one registry over one store acquires two sibling roots, one through a symlink: each lease names its realpath, holder names each invocation, and the store holds exactly the two record files named by the SHA-256 of each realpath",
  "ROSTER the registered tests of this file are exactly these, in order, each run and none marked to fail, ROSTER last, their leading ids are the ids of this header's PINNED READER SET bullets, every line of that section a bullet's first line or one of its next lines and no other header line a bullet's first, and the R399 case ids src/workbench/source-admission.ts cites are among them and, in source order, exactly those SRC_CITATIONS lists, each cited by the JSDoc comment right before the declaration it is listed with",
] as const;

/** The child: the real source-admission.ts module, one request on GO, held until FINISH. */
const CHILD = `
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import { createInterface } from "node:readline";
import { fileURLToPath, pathToFileURL } from "node:url";
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && specifier.endsWith(".js") && context.parentURL?.startsWith("file:")) {
      const source = new URL(specifier.slice(0, -3) + ".ts", context.parentURL);
      if (existsSync(fileURLToPath(source))) return { url: source.href, format: "module-typescript", shortCircuit: true };
    }
    const result = nextResolve(specifier, context);
    return result.url.startsWith("file:") && result.url.endsWith(".ts") ? { ...result, format: "module-typescript" } : result;
  },
});
const plan = JSON.parse(process.env.R399_PLAN);
const { WriteBoundaryAuthority, WriterLeases, admitSourceWrite, measureSourceIdentity } = await import(pathToFileURL(plan.module).href);
const say = (tag, value) => process.stdout.write(tag + " " + JSON.stringify(value === undefined ? null : value) + "\\n");
const lines = createInterface({ input: process.stdin })[Symbol.asyncIterator]();
const line = async () => (await lines.next()).value;
const git = (directory, args) => {
  try {
    return execFileSync("git", ["-C", directory, ...args], { encoding: "buffer", stdio: ["ignore", "pipe", "ignore"], timeout: 60000 });
  } catch {
    return undefined;
  }
};
const leases = plan.store === null ? new WriterLeases() : new WriterLeases({ store: plan.store });
let host;
if (plan.mode === "admission") {
  const authority = new WriteBoundaryAuthority();
  const measured = measureSourceIdentity(plan.canonical, "forge.toml", git);
  if (measured.decision !== "measured") {
    say("SETUP", measured.code);
    process.exit(3);
  }
  host = { authorizedRoot: plan.authorized, gateManifest: "forge.toml", git, authority, attestation: authority.attest("operator-1", measured.identity), leases };
}
say("READY", process.pid);
if ((await line()) !== "GO") process.exit(4);
if (plan.mode === "store") {
  say("RESULT", leases.acquire(plan.spelling, plan.invocationId));
  await line();
} else {
  const outcome = await admitSourceWrite({ invocationId: plan.invocationId, workspace: plan.spelling, policy: { allowWrites: true } }, host, async grant => {
    say("ENTERED", { canonicalRoot: grant.lease.canonicalRoot, invocationId: grant.lease.invocationId });
    await line();
    return "wrote";
  });
  say("RESULT", outcome.decision === "dispatched" ? { decision: outcome.decision, value: outcome.value } : outcome);
  if (outcome.decision !== "dispatched") await line();
}
process.exit(0);
`;

const FIXTURE_GIT: readonly string[] = ["-c", "user.name=Pi Reservation Fixture", "-c", "user.email=reservation-fixture@example.invalid", "-c", "commit.gpgsign=false", "-c", "core.hooksPath=/dev/null", "-c", "init.defaultBranch=main"];
/** Variables that point git at another repository, index or object store than the directory it runs in. */
const LOCATING_ENV: readonly string[] = ["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_COMMON_DIR", "GIT_NAMESPACE"];
const CLEAN_ENV: NodeJS.ProcessEnv = Object.fromEntries(Object.entries(process.env).filter(([name]) => !LOCATING_ENV.includes(name)));

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", [...FIXTURE_GIT, ...args], { cwd, env: CLEAN_ENV, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

/** A committed repository holding README.md and the gate manifest forge.toml; its realpath. */
function fixtureRepo(path: string): string {
  mkdirSync(path, { recursive: true });
  git(path, "init", "-q");
  writeFileSync(join(path, "README.md"), "# reservation fixture\n");
  writeFileSync(join(path, "forge.toml"), '[build]\ngate = ["test"]\n');
  git(path, "add", "README.md", "forge.toml");
  git(path, "commit", "-q", "--no-verify", "-m", "fixture base");
  return realpathSync(path);
}

interface ChildEvent {
  readonly tag: string;
  readonly value: unknown;
}
interface ChildExit {
  readonly code: number | null;
  readonly signal: NodeJS.Signals | null;
}
interface RaceChild {
  readonly events: ChildEvent[];
  /** The first event at or after index `from` whose tag is one of `tags`. */
  next(tags: readonly string[], from: number): Promise<{ readonly event: ChildEvent; readonly index: number }>;
  send(line: string): void;
  readonly exited: Promise<ChildExit>;
  stop(): void;
}

interface ChildPlan {
  readonly mode: "store" | "admission";
  readonly store: string | null;
  readonly spelling: string;
  readonly invocationId: string;
}

let scratchDir: string;
let base: string;
let authorized: string;
let ws: string;
let races = 0;

function spellingOf(kind: AliasKind): string {
  if (kind === "direct") return ws;
  if (kind === "symlink") return join(authorized, "ws-link");
  return `${authorized}/./ws`;
}

function freshStore(): string {
  races += 1;
  const store = join(base, `store-${races}`);
  mkdirSync(store);
  return store;
}

/** One stdout line of a child: "<TAG> <json>"; a line that does not parse is kept whole as an UNPARSED event. */
function eventOf(text: string): ChildEvent {
  const space = text.indexOf(" ");
  if (space < 0) return { tag: text, value: null };
  try {
    return { tag: text.slice(0, space), value: JSON.parse(text.slice(space + 1)) };
  } catch {
    return { tag: "UNPARSED", value: text };
  }
}

function start(plan: ChildPlan): RaceChild {
  const payload = JSON.stringify({ module: MODULE, authorized, canonical: ws, ...plan });
  const child: ChildProcess = spawn(process.execPath, [...NODE_FLAGS, CHILD], { cwd: ROOT, env: { ...CLEAN_ENV, R399_PLAN: payload }, stdio: ["pipe", "pipe", "pipe"] });
  const events: ChildEvent[] = [];
  const waiters: Array<() => void> = [];
  let stdout = "";
  let stderr = "";
  let ended = false;
  const wake = (): void => {
    for (const waiter of waiters.splice(0)) waiter();
  };
  child.stdout?.setEncoding("utf8");
  child.stdout?.on("data", (chunk: string) => {
    stdout += chunk;
    let newline = stdout.indexOf("\n");
    while (newline >= 0) {
      const text = stdout.slice(0, newline);
      stdout = stdout.slice(newline + 1);
      events.push(eventOf(text));
      newline = stdout.indexOf("\n");
    }
    wake();
  });
  child.stderr?.setEncoding("utf8");
  child.stderr?.on("data", (chunk: string) => {
    stderr += chunk;
  });
  const exited = new Promise<ChildExit>(settle => {
    child.once("exit", (code, signal) => {
      ended = true;
      wake();
      settle({ code, signal });
    });
  });
  const next = (tags: readonly string[], from: number): Promise<{ readonly event: ChildEvent; readonly index: number }> =>
    new Promise((settle, fail) => {
      const timer = setTimeout(() => fail(new Error(`${plan.invocationId}: no ${tags.join("/")} within ${EVENT_MS} ms; events ${JSON.stringify(events)}; stderr ${stderr}`)), EVENT_MS);
      const check = (): void => {
        const index = events.findIndex((event, at) => at >= from && tags.includes(event.tag));
        const found = events[index];
        if (found !== undefined) {
          clearTimeout(timer);
          settle({ event: found, index });
        } else if (ended) {
          clearTimeout(timer);
          fail(new Error(`${plan.invocationId}: exited before ${tags.join("/")}; events ${JSON.stringify(events)}; stderr ${stderr}`));
        } else {
          waiters.push(check);
        }
      };
      check();
    });
  return {
    events,
    next,
    send: line => {
      child.stdin?.write(`${line}\n`);
    },
    exited,
    stop: () => {
      if (!ended) child.kill("SIGKILL");
    },
  };
}

interface RaceReading {
  /** For each GO, in the order written: the reports (REPORTS) the parent had received from either child when it wrote it. */
  readonly reportsAtGo: readonly number[];
  /** Each child's first event after GO: RESULT, or ENTERED for an admission whose dispatch was entered. */
  readonly first: readonly ChildEvent[];
  /** Each child's events, read once it exited. */
  readonly events: readonly (readonly ChildEvent[])[];
  readonly exits: readonly ChildExit[];
}

/** One race: both children READY, GO to each, each child's first report, then FINISH to each and both exits. */
async function race(mode: "store" | "admission", store: string | null, pair: readonly [AliasKind, AliasKind]): Promise<RaceReading> {
  const children = pair.map((kind, index) => start({ mode, store, spelling: spellingOf(kind), invocationId: INVOCATIONS[index] ?? "inv-x" }));
  try {
    const ready = await Promise.all(children.map(child => child.next(["READY"], 0)));
    const reportsAtGo = children.map(child => {
      child.send("GO");
      return children.flatMap(other => other.events).filter(event => REPORTS.includes(event.tag)).length;
    });
    const first = await Promise.all(children.map((child, index) => child.next(REPORTS, (ready[index]?.index ?? 0) + 1)));
    for (const child of children) child.send("FINISH");
    const exits = await Promise.all(children.map(child => child.exited));
    return { reportsAtGo, first: first.map(found => found.event), events: children.map(child => [...child.events]), exits };
  } finally {
    for (const child of children) child.stop();
  }
}

function lastResult(events: readonly ChildEvent[]): unknown {
  return events.filter(event => event.tag === "RESULT").at(-1)?.value;
}

function enteredCount(reading: RaceReading): number {
  return reading.events.flat().filter(event => event.tag === "ENTERED").length;
}

/** This header as R399-C1-SHAPE and ROSTER read it: this file's lines before its first import line, as written. */
function headerLines(): string[] {
  const source = readFileSync(THIS_FILE, "utf8");
  return source.slice(0, source.indexOf("\nimport ")).split("\n");
}

/** This header's PINNED READER SET lines: its lines after PINNED_HEADING and before the first that opens with NOT_CLAIMED_OPENER, none if either is missing or that one comes first. */
function pinnedLines(): string[] {
  const lines = headerLines();
  const from = lines.indexOf(PINNED_HEADING);
  const to = lines.findIndex(line => line.startsWith(NOT_CLAIMED_OPENER));
  return from < 0 || to < from ? [] : lines.slice(from + 1, to);
}

/** The case ids that open this header's PINNED READER SET bullets, in order. */
function headerIds(): string[] {
  return pinnedLines().flatMap(line => BULLET_ID.exec(line)?.[1] ?? []);
}

/** This header as prose: its lines between the first and the last, each without its comment prefix and trimmed, the empty ones dropped, joined by single spaces. */
function headerProse(): string {
  return headerLines()
    .slice(1, -1)
    .map(line => line.replace(/^\s*\/?\*+\s?/, "").trim())
    .filter(line => line !== "")
    .join(" ");
}

/** How many times needle occurs in text. */
function occurrences(text: string, needle: string): number {
  return text.split(needle).length - 1;
}

/** The fixture's vendored line that starts with prefix: the page line number the fixture gives it, and its text after prefix. */
function vendoredLine(prefix: string): { readonly line: number; readonly text: string } {
  const { lines, text } = REQUIREMENT.requirement;
  const at = text.findIndex(entry => entry.startsWith(prefix));
  return { line: Number(lines.split("-")[0]) + at, text: at < 0 ? "" : (text[at] ?? "").slice(prefix.length) };
}

/**
 * The opening paragraph of this header as R399-C1-SHAPE composes it from SCOPE_SENTENCE and the fixture: SCOPE_SENTENCE; the
 * sentence naming the fixture's page and the first 8 hex digits of its commit; the vendored statement, criterion 1 and
 * negative mutant, each in double quotes right after its label, which names it and the line number the fixture gives that
 * line; and the sentence giving the V-tier line's number and the evidence label that line names. Its labels and quotes too.
 */
function openingParagraph(): { readonly text: string; readonly labels: readonly string[]; readonly quotes: readonly string[] } {
  const quoted = [
    ["The statement", vendoredLine("- Statement: ")],
    ["Criterion 1", vendoredLine("  1. ")],
    ["The negative mutant", vendoredLine("- Negative mutant: ")],
  ] as const;
  const vTier = vendoredLine("- V-tier: ");
  const evidenceLabel = /`([A-Z0-9-]+)`/.exec(vTier.text)?.[1] ?? "";
  const paragraph = [
    SCOPE_SENTENCE,
    `Requirement text: ${REQUIREMENT.requirements.path} at Pi master ${REQUIREMENT.commit.slice(0, 8)} (the program pages are master-only).`,
    ...quoted.map(([role, { line, text }]) => `${role}, line ${line}: "${text}"`),
    `Line ${vTier.line} names the planned evidence label ${evidenceLabel}; this file is that label's criterion 1 leg, at evidence tier V1 only.`,
  ].join(" ");
  return { text: paragraph, labels: quoted.map(([role, { line }]) => `${role}, line ${line}:`), quotes: quoted.map(([, { text }]) => text) };
}

/** The R399 case ids, in order, cited by the JSDoc comment of source that ends on the line right before declaration's line. */
function citationsBefore(source: string, declaration: string): string[] {
  const end = source.indexOf(`*/\n${declaration}\n`);
  if (end < 0) return [];
  return source.slice(source.lastIndexOf("/**", end), end).match(R399_CASE_ID) ?? [];
}

function titleId(title: string): string {
  return title.split(" ")[0] ?? "";
}

/** What call throws: [category, message] for a CapabilityError, else the thrown value as text; "no throw" when it returns. */
function thrownBy(call: () => unknown): unknown {
  try {
    call();
  } catch (error) {
    return error instanceof CapabilityError ? [error.category, error.message] : String(error);
  }
  return "no throw";
}

/** The lowercase hex SHA-256 of text's UTF-8 bytes. */
function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

beforeEach(() => {
  scratchDir = makeScratch("pi-mii-r399-");
  base = realpathSync(scratchDir);
  authorized = join(base, "authorized");
  mkdirSync(authorized);
  ws = fixtureRepo(join(authorized, "ws"));
  symlinkSync(ws, join(authorized, "ws-link"));
});

afterEach(() => {
  removeScratch(scratchDir);
});

describe("EAT-R399 criterion 1: two processes over one configured store hold one writer reservation of one realpath", () => {
  it(ROSTER[0], async () => {
    for (const pair of ALIAS_PAIRS) {
      const label = pair.join("+");
      const store = freshStore();
      const reading = await race("store", store, pair);
      expect(reading.reportsAtGo, label).toEqual([0, 0]);
      expect(reading.exits, label).toEqual([
        { code: 0, signal: null },
        { code: 0, signal: null },
      ]);
      expect(
        reading.first.map(event => event.tag),
        label,
      ).toEqual(["RESULT", "RESULT"]);
      const leases = reading.first.map((event, index) => ({ invocationId: INVOCATIONS[index], value: event.value })).filter(entry => entry.value !== null);
      expect(leases, label).toHaveLength(1);
      const [won] = leases;
      expect(won?.value, label).toStrictEqual({ canonicalRoot: ws, invocationId: won?.invocationId });
      const reader = new WriterLeases({ store });
      expect(
        ALIAS_KINDS.map(kind => reader.holder(spellingOf(kind))),
        label,
      ).toEqual(ALIAS_KINDS.map(() => won?.invocationId));
    }
  });

  it(ROSTER[1], async () => {
    for (const pair of ALIAS_PAIRS) {
      const label = pair.join("+");
      const reading = await race("admission", freshStore(), pair);
      expect(reading.reportsAtGo, label).toEqual([0, 0]);
      expect(reading.exits, label).toEqual([
        { code: 0, signal: null },
        { code: 0, signal: null },
      ]);
      const entered = reading.first.map((event, index) => ({ invocationId: INVOCATIONS[index], event, index })).filter(entry => entry.event.tag === "ENTERED");
      expect(entered, label).toHaveLength(1);
      const [winner] = entered;
      expect(winner?.event.value, label).toStrictEqual({ canonicalRoot: ws, invocationId: winner?.invocationId });
      const loser = reading.first.findIndex(event => event.tag !== "ENTERED");
      expect(reading.first[loser], label).toStrictEqual({ tag: "RESULT", value: WRITER_HELD });
      expect(reading.events[loser]?.some(event => event.tag === "ENTERED"), label).toBe(false);
      expect(enteredCount(reading), label).toBe(1);
      expect(lastResult(reading.events[winner?.index ?? -1] ?? []), label).toStrictEqual(DISPATCHED);
    }
  });

  it(ROSTER[2], async () => {
    const reading = await race("admission", null, ["direct", "symlink"]);
    expect(reading.reportsAtGo).toEqual([0, 0]);
    expect(reading.exits).toEqual([
      { code: 0, signal: null },
      { code: 0, signal: null },
    ]);
    expect(reading.first).toStrictEqual([
      { tag: "ENTERED", value: { canonicalRoot: ws, invocationId: "inv-a" } },
      { tag: "ENTERED", value: { canonicalRoot: ws, invocationId: "inv-b" } },
    ]);
    expect(enteredCount(reading)).toBe(2);
    expect(reading.events.map(lastResult)).toStrictEqual([DISPATCHED, DISPATCHED]);
  });

  it(ROSTER[3], () => {
    const { id, lines, text } = REQUIREMENT.requirement;
    expect(sha256(text.map(line => `${line}\n`).join(""))).toBe(VENDORED_LINES_SHA256);
    expect([id, lines, text.length, text[0]?.startsWith(`## ${id} `)]).toEqual(["EAT-R399", "250-272", 23, true]);
    const opening = openingParagraph();
    for (const quote of opening.quotes) expect(quote.length, quote).toBeGreaterThan(40);
    const view = headerLines();
    expect([view[0], view.at(-1)]).toEqual([...HEADER_EDGES]);
    expect(view.slice(1, -1).filter(line => !(line === " *" || line.startsWith(" * ")) || line.includes("*/"))).toEqual([]);
    expect(view.filter(line => !/^[\x20-\x7e]*$/.test(line))).toEqual([]);
    expect(view.flatMap(line => SECTION_WORDS.exec(line.toLowerCase())?.[1] ?? [])).toEqual(["pinned reader set", "not claimed by this census:", "residual:"]);
    expect([view.indexOf(PINNED_HEADING) > 0, view.at(-2)]).toEqual([true, RESIDUAL_LINE]);
    const header = headerProse();
    expect([...header.matchAll(QUOTE_LABEL)].map(match => match[0])).toEqual(opening.labels);
    expect([header.match(PAGE_WORDS), header.match(EVIDENCE_WORDS)]).toEqual([["Requirement text:"], ["names the planned evidence label"]]);
    expect([header.toUpperCase(), header.toLowerCase()].map(copy => [QUOTE_LABEL, PAGE_WORDS, EVIDENCE_WORDS].map(pattern => copy.match(pattern)?.length ?? 0))).toEqual([
      [3, 1, 1],
      [3, 1, 1],
    ]);
    expect(opening.quotes.map(quote => occurrences(header, `"${quote}"`))).toEqual([1, 1, 1]);
    const paragraph = header.slice(0, header.indexOf(" The trial. "));
    expect(occurrences(paragraph, '"')).toBe(6);
    expect(paragraph).toBe(opening.text);
    const [, criterion = ""] = opening.quotes;
    const kinds = /through ([a-z]+(?:\/[a-z]+)+) aliases/.exec(criterion)?.[1]?.split("/") ?? [];
    expect([...ALIAS_KINDS]).toEqual(kinds);
    const pairs = ALIAS_PAIRS.map(pair => pair.join("+"));
    expect(pairs).toEqual(["direct+symlink", "direct+dot", "symlink+dot"]);
    expect(pairs).toEqual(kinds.flatMap((first, at) => kinds.slice(at + 1).map(second => `${first}+${second}`)));
  });
});

describe("EAT-R399 reservation-store forms in this process: the validation and record naming src/workbench/source-admission.ts states", () => {
  it(ROSTER[4], () => {
    const store = freshStore();
    const construct = (options: unknown): unknown => thrownBy(() => new WriterLeases(options as WriterReservationStore));
    expect(construct(null), "null").toEqual(["validation", STORE_VALIDATION]);
    expect(construct({ store: "relative-store" }), "relative store").toEqual(["validation", STORE_VALIDATION]);
    expect(construct({ store: 7 }), "a store that is not a string").toEqual(["validation", STORE_VALIDATION]);
    expect(construct({ store: `${store}\n` }), "a store followed by U+000A").toEqual(["validation", STORE_VALIDATION]);
    const leases = new WriterLeases({ store });
    const missing = join(base, "missing");
    symlinkSync(missing, join(base, "missing-link"));
    const refused = (root: string, invocationId: string): unknown => [thrownBy(() => leases.acquire(root, invocationId)), readdirSync(store)];
    expect(refused("authorized/ws", "inv-a"), "relative root").toEqual([["validation", LEASE_VALIDATION], []]);
    expect(refused(`${ws}\n`, "inv-a"), "ws followed by U+000A").toEqual([["validation", LEASE_VALIDATION], []]);
    expect(refused(ws, ""), "empty invocation").toEqual([["validation", LEASE_VALIDATION], []]);
    expect(refused(ws, "text\nnext"), "invocation holding U+000A").toEqual([["validation", LEASE_VALIDATION], []]);
    expect(refused(missing, "inv-a"), "missing directory").toEqual([["validation", ROOT_VALIDATION], []]);
    expect(refused(join(base, "missing-link"), "inv-a"), "symlink to the missing directory").toEqual([["validation", ROOT_VALIDATION], []]);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it(ROSTER[5], () => {
    const store = freshStore();
    const ra = join(base, "ra");
    const rb = join(base, `r${String.fromCodePoint(0xe9)}`);
    mkdirSync(ra);
    mkdirSync(rb);
    symlinkSync(rb, join(base, "rb-link"));
    const leases = new WriterLeases({ store });
    expect(leases.acquire(ra, "inv-a")).toStrictEqual({ canonicalRoot: realpathSync(ra), invocationId: "inv-a" });
    expect(leases.acquire(join(base, "rb-link"), "inv-b")).toStrictEqual({ canonicalRoot: realpathSync(rb), invocationId: "inv-b" });
    expect([leases.holder(ra), leases.holder(rb)]).toEqual(["inv-a", "inv-b"]);
    expect(readdirSync(store).sort()).toEqual([`${sha256(realpathSync(ra))}.json`, `${sha256(realpathSync(rb))}.json`].sort());
  });
});

it(ROSTER[6], ({ task }) => {
  const registered: Array<{ name: string; mode: string; fails: boolean; self: boolean }> = [];
  const walk = (tasks: typeof task.file.tasks): void => {
    for (const child of tasks) {
      if (child.type === "test") registered.push({ name: child.name, mode: child.mode, fails: child.fails === true, self: child === task });
      else if (child.type === "suite") walk(child.tasks);
    }
  };
  walk(task.file.tasks);
  expect(registered.map(entry => entry.name)).toEqual([...ROSTER]);
  expect(registered.filter(entry => entry.mode !== "run" || entry.fails).map(entry => entry.name)).toEqual([]);
  expect(registered.findIndex(entry => entry.self)).toBe(registered.length - 1);
  expect(pinnedLines().filter(line => !(BULLET_ID.test(line) || BULLET_NEXT.test(line)))).toEqual([]);
  expect(headerLines().filter(line => BULLET_ID.test(line))).toEqual(pinnedLines().filter(line => BULLET_ID.test(line)));
  expect(registered.map(entry => titleId(entry.name))).toEqual(headerIds());
  const source = readFileSync(MODULE, "utf8");
  const cited = source.match(R399_CASE_ID) ?? [];
  expect(cited.filter(caseId => !headerIds().includes(caseId))).toEqual([]);
  expect(SRC_CITATIONS.map(([declaration]) => occurrences(source, `\n${declaration}\n`))).toEqual(SRC_CITATIONS.map(() => 1));
  expect(SRC_CITATIONS.map(([declaration]) => citationsBefore(source, declaration))).toEqual(SRC_CITATIONS.map(([, ids]) => ids));
  expect(cited).toEqual(SRC_CITATIONS.flatMap(([, ids]) => ids));
});
