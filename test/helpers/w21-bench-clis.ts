/**
 * w21-bench-clis.ts — the census of W21 bench CLIs on this tree (wb-oq3 re-cut, gate U1).
 *
 * A W21 bench CLI is a qa/workbench/*-bench.mjs whose first line opens a "// W21" header. The family-wide wb-oq3
 * members ("every landed W21 bench" takes the git revision stamp and has a known-duration case) read this list instead
 * of a hand-kept one, so a W21 bench that lands later reddens both suites by design until its lander adds it: the
 * second-lander obligation of known-conflicts entry 8, made mechanical rather than remembered.
 */

import { readdirSync, readFileSync } from "node:fs";

const QA_WORKBENCH = new URL("../../qa/workbench/", import.meta.url);
const W21_HEADER = /^\/\/ W21\b/;

/** Repository-relative paths of every W21 bench CLI on this tree, sorted. */
export function w21BenchClis(): string[] {
  return readdirSync(QA_WORKBENCH)
    .filter(name => name.endsWith("-bench.mjs"))
    .filter(name => W21_HEADER.test(readFileSync(new URL(name, QA_WORKBENCH), "utf8").split("\n", 1)[0] ?? ""))
    .map(name => `qa/workbench/${name}`)
    .sort();
}
