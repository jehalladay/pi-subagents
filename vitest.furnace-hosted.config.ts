import { defineConfig } from "vitest/config";
export default defineConfig({ test: { include: ["test/workbench-furnace-hosted-real.test.ts"], testTimeout: 150_000, hookTimeout: 90_000 } });
