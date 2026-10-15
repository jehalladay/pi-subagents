import { defineConfig } from 'vitest/config';
export default defineConfig({test:{include:['test/workbench-claude-pi-live.test.ts'],server:{deps:{inline:[/@earendil-works\/pi-/]}}},resolve:{dedupe:['@earendil-works/pi-ai']}});
