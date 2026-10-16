/**
 * wb-u62: the census reporter. test/helpers/census.ts appends --reporter=<this file> to the tier's REAL
 * entrypoint (the forge.toml step, through its npm script) - through a per-run subclass it generates, which passes
 * the report path to this constructor, so the path travels on the run's command line and never through the
 * environment the judged code reads (J1-J3) - and reads what this writes there when the run ends: the files the run
 * scheduled, and the reported-task surface every reporter receives (TestModule, TestSuite, TestCase - name, suite
 * path, mode, fails, each, location) together with each case's EXECUTION result under that entrypoint. Nothing here
 * models the runner; it serializes what the runner answered.
 */
import { writeFileSync } from "node:fs";
import type { Reporter, SerializedError, TestCase, TestModule, TestSpecification, TestSuite } from "vitest/node";
import type { RunCase, RunModule, RunReport, RunSuite } from "./census.js";

function suitePath(entity: TestCase | TestSuite): string[] {
  const path: string[] = [];
  let parent = entity.parent;
  while (parent.type === "suite") {
    path.unshift(parent.name);
    parent = parent.parent;
  }
  return path;
}

const message = (error: { readonly message?: unknown }): string => String(error.message ?? "").slice(0, 800);

function serialize(module: TestModule): RunModule {
  const suites: RunSuite[] = [];
  const errors = module.errors().map(message);
  for (const suite of module.children.allSuites()) {
    suites.push({ name: suite.name, suitePath: suitePath(suite), mode: suite.options.mode, line: suite.location?.line ?? 0, column: suite.location?.column ?? 0 });
    for (const error of suite.errors()) errors.push(message(error));
  }
  const tests: RunCase[] = [];
  for (const test of module.children.allTests()) {
    const result = test.result();
    tests.push({
      name: test.name,
      suitePath: suitePath(test),
      mode: test.options.mode,
      fails: test.options.fails === true,
      each: test.options.each === true,
      line: test.location?.line ?? 0,
      column: test.location?.column ?? 0,
      state: result.state,
      errors: result.state === "failed" ? result.errors.map(message) : [],
    });
  }
  return { file: module.moduleId, state: module.state(), errors, tests, suites };
}

export default class CensusReporter implements Reporter {
  private scheduled: readonly string[] = [];
  private readonly out: string | undefined;

  /** The per-run subclass passes the report path; anything else (vitest's own reporter options) writes nothing. */
  constructor(out?: unknown) {
    this.out = typeof out === "string" && out !== "" ? out : undefined;
  }

  onTestRunStart(specifications: ReadonlyArray<TestSpecification>): void {
    this.scheduled = specifications.map(specification => specification.moduleId);
  }

  onTestRunEnd(modules: ReadonlyArray<TestModule>, unhandledErrors: ReadonlyArray<SerializedError>): void {
    if (this.out === undefined) return;
    const report: RunReport = { complete: true, scheduled: this.scheduled, modules: modules.map(serialize), unhandledErrors: unhandledErrors.map(message) };
    writeFileSync(this.out, JSON.stringify(report));
  }
}
