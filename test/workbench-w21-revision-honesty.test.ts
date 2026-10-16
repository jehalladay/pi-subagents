/** W21 revision honesty (wb-oq3 member 4; the wb-9x5.14 gate F1, routed family-wide by the owner at the 9x5.14
 * landing): "every W21 bench takes its receipt revision from git rev-parse HEAD plus a dirty flag, with W21_REVISION
 * env only as an override". The shared stamp (qa/workbench/bench-revision.mjs) is exercised against REAL throwaway
 * repositories (clean, dirty, override, a nested directory that is not the toplevel, a directory outside any
 * repository), never a faked git. Each bench CLI's wiring is read through the TypeScript parser, so a commented-out,
 * string-quoted or unreachable call is not a call (the wb-9x5.6 M3/M10 comment-out class cannot pass these pins).
 *
 * Scope of record: the six landed W21 bench CLIs below. inspector-grouped-bench.mjs is NOT wired: its guarded test
 * (test/workbench-grouped-fixture.test.ts "keeps the CLI thin") pins an exact static-import list and forbids any
 * dynamic import, and the 14e78f1 two-arm rule forbids removing that line, so the bench cannot reach git without an
 * owner ruling; the delivery note carries the route. Benches not yet on trunk (wb-9x5.3, wb-9x5.6) join at landing.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { BENCH_CHECKOUT_ROOT, benchRevision, UNKNOWN_REVISION, withBenchRevision } from "../qa/workbench/bench-revision.mjs";
import { pinNonRepo } from "./helpers/non-repo-scratch.js";

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
  let scratch = "";
  let repo = "";
  let head = "";
  beforeAll(() => {
    scratch = realpathSync(mkdtempSync(join(tmpdir(), "w21-revision-")));
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
    if (scratch !== "") rmSync(scratch, { recursive: true, force: true });
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
    const outside = realpathSync(mkdtempSync(join(tmpdir(), "w21-revision-outside-")));
    const restore = pinNonRepo(outside);
    try {
      expect(UNKNOWN_REVISION).toBe("working-tree");
      expect(stampOf({ env: NO_OVERRIDE, root: outside })).toEqual({ revision: "working-tree", revisionSource: "unknown", dirty: null });
    } finally {
      restore();
      rmSync(outside, { recursive: true, force: true });
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
];

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
