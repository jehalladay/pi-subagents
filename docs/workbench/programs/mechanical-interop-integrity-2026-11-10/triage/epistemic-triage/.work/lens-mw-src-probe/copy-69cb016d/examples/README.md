# Fixture examples

Each `npm run example:<environment>` regenerates one fixture environment from its committed seed and compares the exported episode bytes with the committed file under `qa/integration/python-consumer/fixtures`. The line it prints begins with the label `fixture`: the episode comes from a seeded simulation, so it is never evidence of a real Forge, Furnace, agent or remote run.

| Command | Seed | Committed episode |
| --- | --- | --- |
| `npm run example:landing-queue` | 7 | `episode-landing-queue-seed7.json` |
| `npm run example:compaction-inheritance` | 7 | `episode-compaction-inheritance-seed7.json` |
| `npm run example:colony-resilience` | 29 | `episode-colony-resilience-seed29.json` |
| `npm run example:artifact-recovery` | 7 | `episode-artifact-recovery-seed7.json` |
| `npm run example:quorum-evidence` | 7 | `episode-quorum-evidence-independent-seed7.json` |

A byte difference exits 1 with `EXAMPLE_DIGEST_MISMATCH`. An unknown name exits 2 with `EXAMPLE_UNKNOWN_ENVIRONMENT`.

`npm run example:live` runs nothing. It exits 2 with `EXAMPLE_LIVE_NOT_ENABLED` unless `MW_LIVE_FORGE_FLOW=1` is set, and with the flag it still exits 2 with `EXAMPLE_LIVE_NOT_WITNESSED` because no live journey (CA-R3) has been witnessed here.
