/**
 * wb-u62: the census reporter. test/helpers/census.ts appends --reporter=<this file> and --outputFile.census=<frame>
 * to the tier's REAL entrypoint (the forge.toml step, through its npm script) - the frame a fresh nonce per run, so it
 * travels on the run's command line and never through the environment the judged code reads (J1-J3), and no file is
 * written anywhere (standing rule 11: no scratch) - and reads what this writes to the run's stdout when the run ends,
 * ONE line, the frame then the JSON: the files the run scheduled, and the reported-task surface every reporter receives
 * (TestModule, TestSuite, TestCase - name, suite path, mode, fails, each, location) together with each case's EXECUTION
 * result under that entrypoint. Nothing here models the runner; it serializes what the runner answered.
 */
import type { Reporter, SerializedError, TestCase, TestModule, TestSpecification, TestSuite, Vitest } from "vitest/node";
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
  private frame: string | undefined;

  /**
   * The census run names its frame as --outputFile.census=<frame>; configured any other way, this reporter writes
   * nothing (row x-u62r4-reporter-unselected, with its selected control).
   */
  onInit(vitest: Vitest): void {
    const outputs = vitest.config.outputFile;
    const frame = typeof outputs === "object" ? outputs.census : undefined;
    this.frame = typeof frame === "string" && frame !== "" ? frame : undefined;
  }

  onTestRunStart(specifications: ReadonlyArray<TestSpecification>): void {
    this.scheduled = specifications.map(specification => specification.moduleId);
  }

  onTestRunEnd(modules: ReadonlyArray<TestModule>, unhandledErrors: ReadonlyArray<SerializedError>): void {
    if (this.frame === undefined) return;
    const report: RunReport = { complete: true, scheduled: this.scheduled, modules: modules.map(serialize), unhandledErrors: unhandledErrors.map(message) };
    process.stdout.write(`\n${this.frame}${JSON.stringify(report)}\n`);
  }
}
