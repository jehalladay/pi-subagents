import { defineConfig } from "vitest/config";

export default defineConfig({
  // The print-mode e2e suite (test/subagents-print-mode-e2e.test.ts) drives REAL
  // faux-model turns through pi-coding-agent + pi-agent-core. That requires ONE
  // shared @earendil-works/pi-ai instance so the faux provider the test registers
  // lands in the same api-registry the session streams through. npm physically
  // duplicates pi-ai (a top-level copy and one nested under pi-coding-agent), which
  // otherwise yields two registries and "No API provider registered" errors.
  // Inlining the @earendil-works packages routes them through Vite's resolver so
  // dedupe can collapse pi-ai to a single instance — for the parent AND for every
  // subagent session the extension spawns. dedupe alone is insufficient (it only
  // affects modules Vite resolves; without inline the runtime stays externalized).
  test: {
    // Native SDK probes depend on an installed Forge binary and are run from
    // their explicit Forge live tier, not by the portable package test gate.
    include: ["test/**/*.test.ts"],
    // A stray `.only` must FAIL the gate, never narrow it: vitest's default is
    // `!process.env.CI`, and CI is unset under forge, so without this pin one
    // focused test silently shrank the whole run while the gate stayed green
    // (measured by the wb-752.10 gate seat; pinned by test/workbench-gate-allow-only.test.ts).
    allowOnly: false,
    exclude: ["test/workbench-native-client.test.ts", "test/workbench-pi-node-client.test.ts", "test/workbench-ecosystem-native.test.ts", "test/workbench-native-ecosystem.test.ts", "test/workbench-native-rf-preview.test.ts", "test/workbench-external-furnace.test.ts", "test/workbench-furnace-real-active.test.ts", "test/workbench-pi-furnace-real-client.test.ts", "test/workbench-claude-pi-live.test.ts", "test/workbench-furnace-hosted-real.test.ts", "test/workbench-native-rf-tsx-preview.test.ts", "test/workbench-forge-control-live.test.ts"],
    server: { deps: { inline: [/@earendil-works\/pi-/] } },
    // Local reporting only — deliberately no `thresholds`, and not wired into
    // CI. src/index.ts is mostly the /agents wizard, which is TUI flow with
    // almost no logic and is not worth a fake-TUI harness; any global floor
    // would therefore either sit below what the rest of the suite achieves
    // (and ratchet down as tests are deleted) or force exactly that harness.
    // Coverage here measures lines touched, not behavior pinned.
    //
    // `istanbul`, NOT the `v8` default. v8 under-reports badly on this suite:
    // `src/env.ts` came out at 54.54% for the full run but 90.9% for
    // `vitest run --coverage test/env.test.ts` — coverage cannot fall as more
    // tests run. Bisecting pins it on test/subagents-print-mode-e2e.test.ts,
    // which boots a REAL pi session; pi's own resource loader re-loads the
    // extension and its imports, so the same source file appears to v8 twice —
    // once executed, once barely — and the merge takes the wrong one rather
    // than the union. The damage was not confined to env.ts: v8 also reported
    // module-level `const` declarations in src/settings.ts as uncovered, which
    // is impossible since they run on import.
    //
    // istanbul instruments at transform time and accumulates per source path,
    // so a second load adds to the same counters instead of shadowing them.
    // Same suite, same run: v8 68.6% vs istanbul 76.5% statements, and the
    // per-file numbers now match what a single-file run reports. If you switch
    // this back to v8, re-check env.ts against `--coverage test/env.test.ts`
    // before trusting anything the table says.
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html"],
      include: ["src/**/*.ts"],
    },
  },
  resolve: { dedupe: ["@earendil-works/pi-ai"] },
});
