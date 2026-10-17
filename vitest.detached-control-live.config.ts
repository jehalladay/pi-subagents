import { defineConfig } from "vitest/config";
export default defineConfig({ test: { include: ["test/workbench-detached-control-live.test.ts"], testTimeout: 180_000, hookTimeout: 90_000 } });
