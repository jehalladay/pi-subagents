import { defineConfig } from "vitest/config";
// wb-nl8 census tier: census legs (test/**/*.census.ts) judge the gate's OWN report at
// .forge/vitest-report.json (written by the test step) and never re-execute it. The .census.ts
// suffix keeps them outside the default include test/**/*.test.ts, so the default report can
// never record a judging file (u62 p-in-run, census.ts judge()).
export default defineConfig({ test: { include: ["test/**/*.census.ts"], allowOnly: false } });
