/**
 * wb-nl8.4: the retry census's collected-read reporter. test/helpers/census.ts selects it on a collect-only run (a
 * never-matching --testNamePattern, so no case body or hook runs) as --reporter=<this file> with
 * --outputFile.retry=<frame>, the frame a fresh nonce per run, and reads what this writes to the run's stdout when the run
 * ends: ONE line, the frame then the JSON - per collected module its errors and, per case, the retry vitest resolved for it
 * at collection (TestCase.options.retry: the case's options merged with its suites' and its tags', or the runner config's).
 * Configured any other way, it writes nothing. Nothing here models the runner; it serializes what the runner answered.
 */
import type { Reporter, TestModule, Vitest } from "vitest/node";

const errorMessage = (error: { readonly message?: unknown }): string => String(error.message ?? "").slice(0, 400);

export default class RetryReporter implements Reporter {
  private frame: string | undefined;

  onInit(vitest: Vitest): void {
    const outputs = vitest.config.outputFile;
    this.frame = typeof outputs === "object" ? outputs.retry : undefined;
  }

  onTestRunEnd(modules: ReadonlyArray<TestModule>): void {
    if (this.frame === undefined) return;
    const read = modules.map(module => ({
      file: module.moduleId,
      errors: module.errors().map(errorMessage),
      cases: [...module.children.allTests()].map(test => ({ name: test.fullName, retry: test.options.retry ?? null })),
    }));
    process.stdout.write(`${this.frame}${JSON.stringify(read)}\n`);
  }
}
