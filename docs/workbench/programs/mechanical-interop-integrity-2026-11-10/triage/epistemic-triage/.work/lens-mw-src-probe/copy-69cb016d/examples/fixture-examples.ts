import { readFileSync } from "node:fs";
import {
  runLandingQueue, restackFirst, runCompactionInheritance, provenanceChecked, runColonyResilience, receiptChecked,
  runArtifactRecovery, resumeFromSnapshot, runQuorumEvidence, independentTestFirst, toEpisode, episodeBytes, digest,
} from "../packages/coordination/dist/index.js";
import type { EnvironmentEpisode } from "../packages/coordination/dist/index.js";

const fixtureDir = "qa/integration/python-consumer/fixtures";

/** One row per fixture environment: the committed seed, the committed exported episode, and the run that regenerates it. */
export const ENVIRONMENT_EXAMPLES: readonly { readonly environment: string; readonly seed: number; readonly committedFile: string; readonly regenerate: () => EnvironmentEpisode }[] = [
  { environment: "landing-queue", seed: 7, committedFile: "episode-landing-queue-seed7.json", regenerate: () => runLandingQueue({ candidates: 4, lanes: 1, steps: 12, seed: 7, policy: restackFirst }) },
  { environment: "compaction-inheritance", seed: 7, committedFile: "episode-compaction-inheritance-seed7.json", regenerate: () => runCompactionInheritance({ tasks: 8, seed: 7, policy: provenanceChecked }) },
  { environment: "colony-resilience", seed: 29, committedFile: "episode-colony-resilience-seed29.json", regenerate: () => runColonyResilience({ workers: 4, compute: 4, steps: 16, seed: 29, policy: receiptChecked }) },
  { environment: "artifact-recovery", seed: 7, committedFile: "episode-artifact-recovery-seed7.json", regenerate: () => runArtifactRecovery({ seed: 7, work: 10, steps: 14, arm: "treatment", policy: resumeFromSnapshot }) },
  { environment: "quorum-evidence", seed: 7, committedFile: "episode-quorum-evidence-independent-seed7.json", regenerate: () => runQuorumEvidence({ candidates: 6, reviewers: 5, steps: 30, budget: 24, seed: 7, gate: "authoritative", policy: independentTestFirst }) },
];

export type ExampleOutcome = { readonly ok: true; readonly line: string } | { readonly ok: false; readonly code: string; readonly message: string };

/** Regenerate one fixture environment from its committed seed and compare the exported episode bytes with the committed file; print the fixture-labelled digest only when they match. */
export function runFixtureExample(environment: string, committedBytes?: string): ExampleOutcome {
  const row = ENVIRONMENT_EXAMPLES.find(candidate => candidate.environment === environment);
  if (row === undefined) return { ok: false, code: "EXAMPLE_UNKNOWN_ENVIRONMENT", message: `no fixture example named ${environment}` };
  const episode = toEpisode(row.regenerate());
  const committed = committedBytes ?? readFileSync(`${fixtureDir}/${row.committedFile}`, "utf8");
  if (episodeBytes(episode) !== committed) return { ok: false, code: "EXAMPLE_DIGEST_MISMATCH", message: `${row.committedFile} differs from the regenerated seed ${row.seed} episode` };
  return { ok: true, line: `fixture ${row.environment} seed=${row.seed} episode-digest=${digest(episode)} committed=${row.committedFile} match=true` };
}

/** The live example never runs: it refuses without the opt-in flag, and refuses again with it because the witnessed live journey (CA-R3) does not exist. */
export function liveExample(env: Readonly<Record<string, string | undefined>>): { readonly code: string; readonly message: string } {
  if (env["MW_LIVE_FORGE_FLOW"] !== "1") return { code: "EXAMPLE_LIVE_NOT_ENABLED", message: "set MW_LIVE_FORGE_FLOW=1 to opt in to the live example" };
  return { code: "EXAMPLE_LIVE_NOT_WITNESSED", message: "no live journey has been witnessed (CA-R3); this example runs nothing and claims nothing" };
}
