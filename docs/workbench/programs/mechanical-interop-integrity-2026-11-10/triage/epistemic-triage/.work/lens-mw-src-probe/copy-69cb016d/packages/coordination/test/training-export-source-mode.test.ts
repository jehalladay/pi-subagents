import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { toEpisode, exportEpisodeForTraining, labelTrainingMode } from "../dist/index.js";
import type { EnvironmentEpisode, TrainingExport } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const laneExport = (): TrainingExport =>
  exportEpisodeForTraining(toEpisode(JSON.parse(readFileSync(join(fixtureDir, "landing-queue-seed7.json"), "utf8")) as EnvironmentEpisode));

/** An export a typed caller cannot hold: its own mode label sits outside the closed enum (a hand-built or deserialised value). */
const withOwnMode = (mode: string): TrainingExport => ({ ...laneExport(), mode: mode as TrainingExport["mode"] });

test("MechanicalWorkflows-oud2: an own mode that differs from an enum key only by case or padding is refused for every requested label, never normalised onto an enum key", () => {
  for (const own of ["Live", "LIVE", " live", "live ", "live\n", "\tfixture", "Fixture", "REPLAY", "replay\r\n"]) {
    for (const requested of ["live", "replay", "fixture", own]) {
      assert.throws(
        () => labelTrainingMode(withOwnMode(own), requested),
        (error: Error) => error.constructor === Error && error.message === `EPISODE_MODE_UPGRADE_FORBIDDEN: a training export labelled ${own} cannot be labelled ${requested}`,
        `own ${JSON.stringify(own)} -> ${JSON.stringify(requested)}`,
      );
    }
  }
  assert.equal(labelTrainingMode({ ...laneExport(), mode: "live" }, "replay").mode, "replay", "the enum control still lowers");
});
