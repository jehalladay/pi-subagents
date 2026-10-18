/**
 * w21-bench-clis.ts — the census of W21 bench CLIs on this tree (wb-oq3 re-cut, gate U1).
 *
 * A W21 bench CLI is a qa/workbench/*-bench.mjs whose first line opens a "// W21" header. The family-wide wb-oq3
 * members ("every landed W21 bench" takes the git revision stamp and has a known-duration case) read this list instead
 * of a hand-kept one, so a W21 bench that lands later reddens both suites by design until its lander adds it: the
 * second-lander obligation of known-conflicts entry 8, made mechanical rather than remembered.
 *
 * The first-line rule itself is exported (wb-oq3 F4): W21_HEADER is the single source of the definition and
 * isW21BenchHeader applies it to a CLI's source, so the header census in workbench-w21-known-duration.test.ts and this
 * enumeration can never drift apart, and docs/workbench/14-qa-and-benchmarks.md states the same rule under a pin there.
 */

import { readdirSync, readFileSync } from "node:fs";

const QA_WORKBENCH = new URL("../../qa/workbench/", import.meta.url);

/** The single source of the W21 first-line definition: a W21 bench CLI's FIRST line opens a "// W21" comment. */
export const W21_HEADER = /^\/\/ W21\b/;

/** True iff `source` opens with the W21 header on its first line (the whole membership rule, applied to one CLI). */
export function isW21BenchHeader(source: string): boolean {
  return W21_HEADER.test(source.split("\n", 1)[0] ?? "");
}

/** Repository-relative paths of every W21 bench CLI on this tree, sorted. */
export function w21BenchClis(): string[] {
  return readdirSync(QA_WORKBENCH)
    .filter(name => name.endsWith("-bench.mjs"))
    .filter(name => isW21BenchHeader(readFileSync(new URL(name, QA_WORKBENCH), "utf8")))
    .map(name => `qa/workbench/${name}`)
    .sort();
}
