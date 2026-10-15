import { defineConfig } from "vitest/config";
export default defineConfig({test:{include:["test/workbench-native-client.test.ts","test/workbench-pi-node-client.test.ts","test/workbench-ecosystem-native.test.ts","test/workbench-native-ecosystem.test.ts"],server:{deps:{inline:[/@earendil-works\/pi-/]}}},resolve:{dedupe:["@earendil-works/pi-ai"]}});
