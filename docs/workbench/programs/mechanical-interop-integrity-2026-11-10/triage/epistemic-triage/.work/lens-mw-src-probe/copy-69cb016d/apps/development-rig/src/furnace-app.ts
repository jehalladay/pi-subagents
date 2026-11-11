/**
 * Real optional Furnace ExecutorApp definition.
 * Usage after installing both @furnace/sdk and @forge/sdk into this app:
 *   furnace host extension ... (configure driver and this module per Furnace SDK docs)
 * or: node /path/to/Furnace/sdk/typescript/dist/src/host.js
 *   --app ./apps/development-rig/dist/furnace-app.js --executor mechanical.forge-gate
 *
 * Furnace's own host decodes ExecutionContext and owns Work/Attempt semantics.
 * This module exports exactly one ExecutorApp; no home-grown executor runtime.
 */
import { verifyExistingCandidate } from "./live-gate.js";
import { projectGateIntoFurnace } from "./furnace-gate.js";
import { assertFurnaceSdk, forgeGateCallback } from "./furnace-app-wiring.js";

const moduleName: string = "@furnace/sdk";
const installed = assertFurnaceSdk(await import(moduleName));

export const app = new installed.ExecutorApp();
app.executor("mechanical.forge-gate", forgeGateCallback(installed, process.env, verifyExistingCandidate, projectGateIntoFurnace));
