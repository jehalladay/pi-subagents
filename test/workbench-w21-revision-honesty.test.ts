/** W21 revision honesty (wb-oq3 member 4; the wb-9x5.14 gate F1, routed family-wide by the owner at the 9x5.14
 * landing): "every W21 bench takes its receipt revision from git rev-parse HEAD plus a dirty flag, with W21_REVISION
 * env only as an override". The shared stamp (qa/workbench/bench-revision.mjs) is exercised against REAL throwaway
 * repositories (clean, dirty, override, a nested directory that is not the toplevel, a directory outside any
 * repository), never a faked git. Each bench CLI's wiring is read through the TypeScript parser, so a commented-out,
 * string-quoted or unreachable call is not a call (the wb-9x5.6 M3/M10 comment-out class cannot pass these pins).
 *
 * Scope of record at the wb-oq3 respin (trunk 4becba1): the ELEVEN W21 bench CLIs on the tree, enumerated by
 * test/helpers/w21-bench-clis.ts rather than kept by hand (the census below). TEN are wired (BENCHES): the six of the
 * first cut; topology-slice-grouped (wb-9x5.12), inspector-retained-memory (wb-9x5.3) and inspector-cap-saturation
 * (wb-9x5.6), which landed after it and joined at the re-cut (trunk 86425ea) as their second lander; and tool-reply
 * (wb-9x5.5), which landed after the re-cut (c4904e7) and joins at this respin as the second lander of known-conflicts
 * entry 8. The ELEVENTH, inspector-grouped-bench.mjs, was the named residual (RESIDUALS) because its guarded test
 * (test/workbench-grouped-fixture.test.ts "keeps the CLI thin") pins an exact static-import list under the 14e78f1
 * two-arm rule; owner bead wb-4jr wired it on 2026-10-17 (after the wb-vko stamp helper landed) and moved its row from
 * RESIDUALS to BENCHES in the same owner commit as the pin, so RESIDUALS is empty at this cut. A W21 bench CLI that
 * lands later reddens the census until its lander wires it: the entry-8 second-lander duty, mechanical rather than
 * remembered.
 * Override name: $W21_REVISION for the whole family, read by the stamp alone. inspector-cap-saturation's own
 * $CAP_BENCH_REVISION is RETIRED at this cut (pinned below), so one variable overrides every W21 receipt revision.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { BENCH_CHECKOUT_ROOT, benchRevision, UNKNOWN_REVISION, withBenchRevision } from "../qa/workbench/bench-revision.mjs";
import { nonRepoScratch } from "./helpers/non-repo-scratch.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";
import { w21BenchClis } from "./helpers/w21-bench-clis.js";

installScratchLeakGuard();

interface Stamp {
  revision: string;
  revisionSource: string;
  dirty: boolean | null;
}
const stampOf = benchRevision as (options?: { env?: Record<string, string | undefined>; root?: string }) => Stamp;
const stamped = withBenchRevision as (receipt: Record<string, unknown>, stamp: Stamp) => Record<string, unknown>;

const git = (cwd: string, ...args: string[]): string =>
  execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const NO_OVERRIDE: Record<string, string | undefined> = {};

describe("bench-revision stamp: git rev-parse HEAD plus a dirty flag, W21_REVISION only an override", () => {
  let scratchDir = "";
  let scratch = "";
  let repo = "";
  let head = "";
  beforeAll(() => {
    scratchDir = makeScratch("w21-revision-");
    scratch = realpathSync(scratchDir);
    repo = join(scratch, "checkout");
    mkdirSync(repo);
    git(repo, "init", "-q");
    git(repo, "config", "user.email", "bench@example.invalid");
    git(repo, "config", "user.name", "bench");
    git(repo, "config", "commit.gpgsign", "false");
    writeFileSync(join(repo, "tracked.txt"), "one\n");
    git(repo, "add", "tracked.txt");
    git(repo, "commit", "-q", "-m", "fixture");
    head = git(repo, "rev-parse", "HEAD");
  });
  afterAll(() => {
    removeScratch(scratchDir);
  });

  it("a clean toplevel checkout stamps its HEAD with dirty false and names git as the source", () => {
    expect(head).toMatch(/^[0-9a-f]{40,64}$/);
    expect(stampOf({ env: NO_OVERRIDE, root: repo })).toEqual({ revision: head, revisionSource: "git", dirty: false });
  });

  it("a modified tracked file and an untracked file each make the stamp dirty, revision still HEAD", () => {
    writeFileSync(join(repo, "tracked.txt"), "two\n");
    try {
      expect(stampOf({ env: NO_OVERRIDE, root: repo })).toEqual({ revision: head, revisionSource: "git", dirty: true });
    } finally {
      git(repo, "checkout", "--", "tracked.txt");
    }
    writeFileSync(join(repo, "untracked.txt"), "new\n");
    try {
      expect(stampOf({ env: NO_OVERRIDE, root: repo })).toEqual({ revision: head, revisionSource: "git", dirty: true });
    } finally {
      rmSync(join(repo, "untracked.txt"));
    }
    expect(stampOf({ env: NO_OVERRIDE, root: repo }).dirty).toBe(false);
  });

  it("W21_REVISION overrides the revision and is named as the source, but never hides a dirty tree", () => {
    expect(stampOf({ env: { W21_REVISION: "abc1234" }, root: repo })).toEqual({ revision: "abc1234", revisionSource: "env-override", dirty: false });
    writeFileSync(join(repo, "untracked.txt"), "new\n");
    try {
      expect(stampOf({ env: { W21_REVISION: "abc1234" }, root: repo })).toEqual({ revision: "abc1234", revisionSource: "env-override", dirty: true });
    } finally {
      rmSync(join(repo, "untracked.txt"));
    }
  });

  it("a blank W21_REVISION is no override", () => {
    for (const blank of ["", "   "]) {
      expect(stampOf({ env: { W21_REVISION: blank }, root: repo })).toEqual({ revision: head, revisionSource: "git", dirty: false });
    }
  });

  it("a directory nested inside a checkout is not its toplevel: no HEAD from the enclosing repository, dirty unknown", () => {
    const nested = join(repo, "nested");
    mkdirSync(nested, { recursive: true });
    expect(stampOf({ env: NO_OVERRIDE, root: nested })).toEqual({ revision: UNKNOWN_REVISION, revisionSource: "unknown", dirty: null });
    expect(stampOf({ env: { W21_REVISION: "abc1234" }, root: nested })).toEqual({ revision: "abc1234", revisionSource: "env-override", dirty: null });
  });

  it("a directory outside any repository stamps working-tree with dirty unknown", () => {
    const fixture = nonRepoScratch("w21-revision-outside-");
    const outside = realpathSync(fixture.dir);
    try {
      expect(UNKNOWN_REVISION).toBe("working-tree");
      expect(stampOf({ env: NO_OVERRIDE, root: outside })).toEqual({ revision: "working-tree", revisionSource: "unknown", dirty: null });
    } finally {
      fixture.dispose();
    }
  });

  it("the default root is this checkout's toplevel, so a bench run stamps the tree it runs from", () => {
    const top = realpathSync(git(BENCH_CHECKOUT_ROOT as string, "rev-parse", "--show-toplevel"));
    expect(realpathSync(BENCH_CHECKOUT_ROOT as string)).toBe(top);
    // The dirty flag's semantics are pinned on the throwaway checkout above; here it only has to be measured (a
    // parallel suite may touch this tree between two porcelain reads, so it is never compared to a second read).
    const stamp = stampOf({ env: NO_OVERRIDE });
    expect({ revision: stamp.revision, revisionSource: stamp.revisionSource }).toEqual({ revision: git(top, "rev-parse", "HEAD"), revisionSource: "git" });
    expect(typeof stamp.dirty).toBe("boolean");
  });

  it("withBenchRevision sets revision, revision source and dirty flag on a copy and keeps every other field", () => {
    const receipt = Object.freeze({ contract: "c/v1", revision: "test-revision", exitCode: 2, nested: { a: 1 } });
    const out = stamped(receipt, { revision: head, revisionSource: "git", dirty: true });
    expect(out).toEqual({ contract: "c/v1", revision: head, exitCode: 2, nested: { a: 1 }, revisionSource: "git", dirty: true });
    expect(receipt.revision).toBe("test-revision");
  });

  // Gate U3a (cmd_33628cade82b): the f38534c table recorded H7 (`dirty: stamp.dirty ?? false`) as killed, but no row
  // ever handed withBenchRevision an unknown dirty flag, so it survived 39/39. An unknown tree must stay null, never clean.
  it("withBenchRevision keeps an unknown dirty flag null, never clean: unit stamps and a non-toplevel checkout end to end", () => {
    const receipt = Object.freeze({ contract: "c/v1", revision: "test-revision" });
    expect(stamped(receipt, { revision: UNKNOWN_REVISION, revisionSource: "unknown", dirty: null }).dirty).toBeNull();
    expect(stamped(receipt, { revision: "abc1234", revisionSource: "env-override", dirty: null }).dirty).toBeNull();
    const nested = join(repo, "nested-unknown-dirty");
    mkdirSync(nested, { recursive: true });
    for (const env of [NO_OVERRIDE, { W21_REVISION: "abc1234" }]) {
      const out = stamped(receipt, stampOf({ env, root: nested }));
      expect(out.revisionSource).toBe(env === NO_OVERRIDE ? "unknown" : "env-override");
      expect(out.dirty).toBeNull();
    }
  });

  // Gate-2 IND-1 (g4-gate-r2, outbox row 369): `known ? (typeof porcelain === 'string' && ...) : null` stamps a FAILED
  // status read with a valid HEAD as dirty false, and no row reached that path (70/70). A corrupt index is the reachable
  // failure: HEAD resolves and the toplevel matches, git status exits nonzero, so the dirty flag is unknown, never clean.
  it("a failed status read with a valid HEAD (corrupt index) stamps dirty null, never clean, end to end through withBenchRevision", () => {
    const corrupt = join(scratch, "corrupt-index");
    mkdirSync(corrupt);
    git(corrupt, "init", "-q");
    git(corrupt, "config", "user.email", "bench@example.invalid");
    git(corrupt, "config", "user.name", "bench");
    git(corrupt, "config", "commit.gpgsign", "false");
    writeFileSync(join(corrupt, "tracked.txt"), "one\n");
    git(corrupt, "add", "tracked.txt");
    git(corrupt, "commit", "-q", "-m", "fixture");
    const corruptHead = git(corrupt, "rev-parse", "HEAD");
    writeFileSync(join(corrupt, ".git", "index"), "not a git index\n");
    // Reachability, measured rather than assumed: the toplevel and HEAD still resolve, the status read itself fails.
    expect(realpathSync(git(corrupt, "rev-parse", "--show-toplevel"))).toBe(corrupt);
    expect(git(corrupt, "rev-parse", "HEAD")).toBe(corruptHead);
    expect(spawnSync("git", ["status", "--porcelain"], { cwd: corrupt, stdio: "ignore" }).status).not.toBe(0);
    expect(stampOf({ env: NO_OVERRIDE, root: corrupt })).toEqual({ revision: corruptHead, revisionSource: "git", dirty: null });
    expect(stampOf({ env: { W21_REVISION: "abc1234" }, root: corrupt })).toEqual({ revision: "abc1234", revisionSource: "env-override", dirty: null });
    const receipt = Object.freeze({ contract: "c/v1", revision: "test-revision", exitCode: 0 });
    for (const env of [NO_OVERRIDE, { W21_REVISION: "abc1234" }]) {
      const out = stamped(receipt, stampOf({ env, root: corrupt }));
      expect(out).toEqual({
        contract: "c/v1",
        exitCode: 0,
        revision: env === NO_OVERRIDE ? corruptHead : "abc1234",
        revisionSource: env === NO_OVERRIDE ? "git" : "env-override",
        dirty: null,
      });
    }
  });
});

/** The parsed module: ESM JavaScript, so comments and string contents never reach the AST. */
const parse = (path: string): ts.SourceFile =>
  ts.createSourceFile(path, readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
const walk = (node: ts.Node, visit: (node: ts.Node) => void): void => {
  visit(node);
  ts.forEachChild(node, child => walk(child, visit));
};
const calleeName = (call: ts.CallExpression): string | undefined => (ts.isIdentifier(call.expression) ? call.expression.text : undefined);
const callsTo = (file: ts.SourceFile, name: string): ts.CallExpression[] => {
  const found: ts.CallExpression[] = [];
  walk(file, node => {
    if (ts.isCallExpression(node) && calleeName(node) === name) found.push(node);
  });
  return found;
};
/** `process.env.W21_REVISION` or `process.env["W21_REVISION"]`: the override must be read by the stamp alone. */
const overrideReads = (file: ts.SourceFile): number => {
  let reads = 0;
  walk(file, node => {
    const access = ts.isPropertyAccessExpression(node) ? node.name.text : ts.isElementAccessExpression(node) && ts.isStringLiteral(node.argumentExpression) ? node.argumentExpression.text : undefined;
    if (access !== "W21_REVISION") return;
    const target = (node as ts.PropertyAccessExpression | ts.ElementAccessExpression).expression;
    if (target.getText(file) === "process.env") reads++;
  });
  return reads;
};
const stringLiterals = (file: ts.SourceFile): string[] => {
  const found: string[] = [];
  walk(file, node => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) found.push(node.text);
  });
  return found;
};
const enclosingFunctionName = (node: ts.Node): string | undefined => {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if (ts.isFunctionDeclaration(at)) return at.name?.text;
    if (ts.isArrowFunction(at) || ts.isFunctionExpression(at)) return undefined;
  }
  return "<module>";
};

/** How the stamped receipt reaches the print: returned from main(), or bound (const or assignment) to `receipt` in a scope. */
type Flow = { kind: "return-from-main" } | { kind: "binds"; target: string; scope: "<module>" | "main" };
const BENCHES: ReadonlyArray<{ file: string; flow: Flow }> = [
  { file: "qa/workbench/inspector-evidence-retained-bench.mjs", flow: { kind: "return-from-main" } },
  { file: "qa/workbench/reducer-selector-bench.mjs", flow: { kind: "return-from-main" } },
  { file: "qa/workbench/line-diff-bench.mjs", flow: { kind: "return-from-main" } },
  { file: "qa/workbench/attention-grouped-bench.mjs", flow: { kind: "binds", target: "receipt", scope: "main" } },
  { file: "qa/workbench/timeline-grouped-bench.mjs", flow: { kind: "binds", target: "receipt", scope: "<module>" } },
  { file: "qa/workbench/observation-recovery-bench.mjs", flow: { kind: "binds", target: "receipt", scope: "<module>" } },
  // Second-lander rows (gate U1a): W21 benches that landed after the first wb-oq3 cut.
  { file: "qa/workbench/topology-slice-grouped-bench.mjs", flow: { kind: "binds", target: "receipt", scope: "main" } },
  { file: "qa/workbench/inspector-retained-memory-bench.mjs", flow: { kind: "binds", target: "receipt", scope: "<module>" } },
  { file: "qa/workbench/inspector-cap-saturation-bench.mjs", flow: { kind: "binds", target: "receipt", scope: "<module>" } },
  // Second-lander row of known-conflicts entry 8 (gate-2 U1, outbox row 369): wb-9x5.5 landed tool-reply-bench at c4904e7.
  { file: "qa/workbench/tool-reply-bench.mjs", flow: { kind: "return-from-main" } },
  // The former residual, wired by owner bead wb-4jr (2026-10-17) together with its guarded static-import pin in
  // test/workbench-grouped-fixture.test.ts: the receipt is assigned at module scope inside the CLI's try block.
  { file: "qa/workbench/inspector-grouped-bench.mjs", flow: { kind: "binds", target: "receipt", scope: "<module>" } },
];
/** W21 bench CLIs not wired yet, each with the bead that owns its wiring (owner ruling R2=(a), 2026-10-16T17:2xZ). None at this cut. */
const RESIDUALS: ReadonlyArray<{ file: string; bead: string }> = [];

describe("every wired W21 bench CLI stamps its receipt from bench-revision.mjs (parse-aware)", () => {
  for (const { file, flow } of BENCHES) {
    describe(file, () => {
      const source = parse(file);

      it("imports benchRevision and withBenchRevision from ./bench-revision.mjs", () => {
        const names = source.statements
          .filter(ts.isImportDeclaration)
          .filter(declaration => ts.isStringLiteral(declaration.moduleSpecifier) && declaration.moduleSpecifier.text === "./bench-revision.mjs")
          .flatMap(declaration => {
            const bindings = declaration.importClause?.namedBindings;
            return bindings !== undefined && ts.isNamedImports(bindings) ? bindings.elements.map(element => element.name.text) : [];
          });
        expect(names.sort()).toEqual(["benchRevision", "withBenchRevision"]);
      });

      it("takes exactly one stamp, with the default root and environment, bound to one name", () => {
        const stamps = callsTo(source, "benchRevision");
        expect(stamps).toHaveLength(1);
        expect(stamps[0].arguments).toHaveLength(0);
        expect(ts.isVariableDeclaration(stamps[0].parent)).toBe(true);
      });

      it("the receipt it prints is the withBenchRevision result over that stamp", () => {
        const stamp = callsTo(source, "benchRevision")[0];
        const stampName = ts.isVariableDeclaration(stamp.parent) && ts.isIdentifier(stamp.parent.name) ? stamp.parent.name.text : "<none>";
        const applied = callsTo(source, "withBenchRevision");
        expect(applied).toHaveLength(1);
        const [call] = applied;
        expect(call.arguments).toHaveLength(2);
        expect(call.arguments[1].getText(source)).toBe(stampName);
        if (flow.kind === "return-from-main") {
          expect(ts.isReturnStatement(call.parent)).toBe(true);
          expect(enclosingFunctionName(call)).toBe("main");
        } else {
          const parent = call.parent;
          const bound = ts.isVariableDeclaration(parent)
            ? parent.name.getText(source)
            : ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.EqualsToken
              ? parent.left.getText(source)
              : "<not bound>";
          expect(bound).toBe(flow.target);
          expect(enclosingFunctionName(call)).toBe(flow.scope);
        }
      });

      it("hands the stamp's revision to the receipt builder and keeps no env-only revision of its own", () => {
        const stamp = callsTo(source, "benchRevision")[0];
        const stampName = ts.isVariableDeclaration(stamp.parent) && ts.isIdentifier(stamp.parent.name) ? stamp.parent.name.text : "<none>";
        const revisionValues: string[] = [];
        walk(source, node => {
          if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === "revision") revisionValues.push(node.initializer.getText(source));
        });
        // One CLI hand-off from the stamp; any other revision field is the run function copying its host.
        expect(revisionValues.filter(value => value === `${stampName}.revision`)).toHaveLength(1);
        expect(revisionValues.filter(value => value !== `${stampName}.revision` && value !== "host.revision")).toEqual([]);
        expect(overrideReads(source)).toBe(0);
        expect(stringLiterals(source)).not.toContain("working-tree");
      });

      it("states the honest revision source in its header", () => {
        const text = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
        const header = text.slice(0, text.search(/^import /m));
        expect(header).toMatch(/git rev-parse HEAD/);
        expect(header).toMatch(/dirty flag/);
        expect(header).toMatch(/bench-revision\.mjs/);
        expect(header).not.toMatch(/\(else "working-tree"\)/);
      });
    });
  }

  it("the stamp module reaches only node built-ins: its import closure is pinned", () => {
    const source = parse("qa/workbench/bench-revision.mjs");
    const specifiers = source.statements
      .filter(ts.isImportDeclaration)
      .map(declaration => (ts.isStringLiteral(declaration.moduleSpecifier) ? declaration.moduleSpecifier.text : "<computed>"))
      .sort();
    expect(specifiers).toEqual(["node:child_process", "node:fs", "node:url"]);
    let dynamic = 0;
    walk(source, node => {
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) dynamic++;
    });
    expect(dynamic).toBe(0);
  });
});

/** Static import specifiers of a parsed module, in source order. */
const importsOf = (file: ts.SourceFile): string[] =>
  file.statements.filter(ts.isImportDeclaration).map(declaration => (ts.isStringLiteral(declaration.moduleSpecifier) ? declaration.moduleSpecifier.text : "<computed>"));
/** `process.env.NAME` or `process.env["NAME"]` reads of one variable. */
const envReads = (file: ts.SourceFile, name: string): number => {
  let reads = 0;
  walk(file, node => {
    const access = ts.isPropertyAccessExpression(node) ? node.name.text : ts.isElementAccessExpression(node) && ts.isStringLiteral(node.argumentExpression) ? node.argumentExpression.text : undefined;
    if (access === name && (node as ts.PropertyAccessExpression | ts.ElementAccessExpression).expression.getText(file) === "process.env") reads++;
  });
  return reads;
};
/** Real `process.exitCode = ...` assignments: a commented-out or string-quoted one never reaches the AST. */
const exitCodeAssignments = (file: ts.SourceFile): ts.BinaryExpression[] => {
  const found: ts.BinaryExpression[] = [];
  walk(file, node => {
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && node.left.getText(file) === "process.exitCode") found.push(node);
  });
  return found;
};
const within = (node: ts.Node, container: ts.Node): boolean => node.getStart() >= container.getStart() && node.end <= container.end;

describe("the W21 bench CLI census: every W21 bench CLI on the tree is wired or a named residual (gate U1)", () => {
  it("BENCHES plus RESIDUALS is exactly the W21 bench CLIs on this tree: eleven wired, none residual", () => {
    const wired = BENCHES.map(bench => bench.file);
    const residual = RESIDUALS.map(entry => entry.file);
    expect(new Set([...wired, ...residual]).size).toBe(wired.length + residual.length);
    expect([...wired, ...residual].sort()).toEqual(w21BenchClis());
    expect({ wired: wired.length, residual: residual.length }).toEqual({ wired: 11, residual: 0 });
  });

  it("a residual is still unwired, so wiring it moves its row from RESIDUALS to BENCHES in the same commit", () => {
    let checked = 0;
    for (const { file, bead } of RESIDUALS) {
      const source = parse(file);
      expect(bead).toMatch(/^wb-[0-9a-z.]+$/);
      expect(importsOf(source)).not.toContain("./bench-revision.mjs");
      expect(callsTo(source, "benchRevision")).toHaveLength(0);
      checked += 1;
    }
    // wb-nl8 (--expect.requireAssertions, R1 default): with no residual on the tree the loop asserts nothing; this states what
    // the case proves either way - every RESIDUALS row was read and judged (the row above pins the table at residual: 0).
    expect(checked).toBe(RESIDUALS.length);
  });
});

describe("one override name for the family: inspector-cap-saturation's $CAP_BENCH_REVISION is retired (wb-oq3 re-cut decision)", () => {
  it("reads no $CAP_BENCH_REVISION and names no such variable in code, and its header states the retirement", () => {
    const file = "qa/workbench/inspector-cap-saturation-bench.mjs";
    const source = parse(file);
    expect(envReads(source, "CAP_BENCH_REVISION")).toBe(0);
    expect(stringLiterals(source)).not.toContain("CAP_BENCH_REVISION");
    expect(envReads(source, "W21_REVISION")).toBe(0);
    const text = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    const header = text.slice(0, text.search(/^import /m));
    expect(header).toMatch(/\$CAP_BENCH_REVISION is retired/);
    expect(header).toMatch(/\$W21_REVISION/);
  });
});

describe("every W21 bench CLI sets its exit code in one real statement (parse-aware; the gate's CLI-G6 comment-out class)", () => {
  for (const file of [...BENCHES.map(bench => bench.file), ...RESIDUALS.map(entry => entry.file)]) {
    it(`${file}: exactly one process.exitCode assignment, as a statement of its own`, () => {
      const assignments = exitCodeAssignments(parse(file));
      expect(assignments).toHaveLength(1);
      expect(ts.isExpressionStatement(assignments[0].parent)).toBe(true);
    });
  }
});

describe("inspector-cap-saturation-bench publishes and takes --strict through real statements (wb-9x5.6 O1 M3/M10; gate CLI-G6, CLI-M3)", () => {
  const source = parse("qa/workbench/inspector-cap-saturation-bench.mjs");

  it("sets the exit code at module level, after the measuring try, from publishReceipt over the stamped receipt and the real writers", () => {
    const [assignment] = exitCodeAssignments(source);
    const statement = assignment.parent;
    expect(ts.isExpressionStatement(statement) && statement.parent === source).toBe(true);
    expect(statement.getText(source)).toBe(
      "process.exitCode = publishReceipt(receipt, {path: process.env.CAP_BENCH_RECEIPT, log: console.log, logError: console.error, writeFile: writeFileSync});",
    );
    const measuring = source.statements.filter(ts.isTryStatement);
    expect(measuring).toHaveLength(1);
    expect(source.statements.indexOf(statement as ts.Statement)).toBeGreaterThan(source.statements.indexOf(measuring[0]));
    const applied = callsTo(source, "withBenchRevision");
    expect(applied).toHaveLength(1);
    expect(within(applied[0], measuring[0].tryBlock)).toBe(true);
    expect(callsTo(source, "publishReceipt")).toHaveLength(1);
  });

  it("hands runCapSaturationBench strict: process.argv.includes('--strict') as a real property, never a constant", () => {
    const runs = callsTo(source, "runCapSaturationBench");
    expect(runs).toHaveLength(1);
    const [options] = runs[0].arguments;
    if (options === undefined || !ts.isObjectLiteralExpression(options)) throw new Error("runCapSaturationBench takes no options object");
    const strict = options.properties.filter((property): property is ts.PropertyAssignment => ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === "strict");
    expect(strict).toHaveLength(1);
    expect(strict[0].initializer.getText(source)).toBe("process.argv.includes('--strict')");
  });
});
