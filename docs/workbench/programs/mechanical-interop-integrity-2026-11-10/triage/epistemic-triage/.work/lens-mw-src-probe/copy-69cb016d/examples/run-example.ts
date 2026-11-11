import { ENVIRONMENT_EXAMPLES, liveExample, runFixtureExample } from "./fixture-examples.ts";

const name = process.argv[2] ?? "";
if (name === "live") {
  const refusal = liveExample(process.env);
  process.stderr.write(`${refusal.code}: ${refusal.message}\n`);
  process.exit(2);
}
const outcome = runFixtureExample(name);
if (outcome.ok) {
  process.stdout.write(`${outcome.line}\n`);
} else {
  process.stderr.write(`${outcome.code}: ${outcome.message} (known: ${ENVIRONMENT_EXAMPLES.map(row => row.environment).join(", ")}, live)\n`);
  process.exit(outcome.code === "EXAMPLE_UNKNOWN_ENVIRONMENT" ? 2 : 1);
}
