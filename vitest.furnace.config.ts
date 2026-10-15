import { defineConfig } from "vitest/config";
export default defineConfig({ test: { include: ["test/workbench-external-furnace.test.ts", "test/workbench-furnace-observer.test.ts", "test/workbench-pi-furnace-real-client.test.ts"] } });
