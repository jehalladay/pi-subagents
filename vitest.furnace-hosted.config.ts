import { defineConfig } from "vitest/config";
// A focused live row must FAIL this tier, never narrow it: vitest's allowOnly defaults to !process.env.CI and CI is unset
// under forge, so without this pin a focused row silently narrows this tier's run while it stays green (measured on a
// throwaway stub by the wb-3hc respin, row 508 U1). Pinned by test/workbench-furnace-hosted-retry-live-receipt.test.ts,
// which reads this module, never the tier's source text.
export default defineConfig({ test: { include: ["test/workbench-furnace-hosted-real.test.ts"], allowOnly: false, testTimeout: 150_000, hookTimeout: 90_000 } });
