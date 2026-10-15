/** L1/L2: a separate Node process consumes the read model without Pi or native SDK mocks. */
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("external observation client", () => {
  it("imports the public source contract and distinguishes stale historical state from refreshed native truth", () => {
    const client = `
      import assert from 'node:assert/strict';
      import { ObservationProjection } from './src/workbench/observation.ts';
      const view = new ObservationProjection({maxEvents:4,maxNodes:4,maxEdges:4});
      const ref = {provider:'furnace',type:'run',id:'r1'};
      const scope = {workspace:'ws-1',principal:'alice'};
      view.reconnect('furnace');
      view.refresh({source:ref,scope,capturedAt:'2026-10-15T00:00:00Z',observedAt:'2026-10-15T00:00:01Z',sequence:1,node:{title:'Native run',type:'sdk-operation',statusText:'RUNNING',statusTone:'active'}});
      view.disconnect('furnace');
      assert.equal(view.query({scope,ref,limit:2}).nodes[0].freshness,'stale');
      assert.equal(view.query({scope:{workspace:'ws-2',principal:'alice'},ref,limit:2}).nodes.length,0);
      view.reconnect('furnace');
      view.refresh({source:ref,scope,capturedAt:'2026-10-15T00:00:03Z',observedAt:'2026-10-15T00:00:04Z',sequence:3,node:{title:'Native run',type:'sdk-operation',statusText:'FAILED',statusTone:'failure'}});
      assert.equal(view.query({scope,ref,limit:2}).nodes[0].presentation.statusTone,'failure');
      assert.equal(view.query({scope,ref,limit:2}).nodes[0].freshness,'current');
      console.log(JSON.stringify(view.query({scope,ref,limit:2})));
    `;
    const child = spawnSync(process.execPath, ["--disable-warning=ExperimentalWarning", "--experimental-strip-types", "--input-type=module", "-e", client], { cwd: process.cwd(), encoding: "utf8", timeout: 10_000 });
    expect(child.status, child.stderr).toBe(0);
    expect(JSON.parse(child.stdout).nodes[0].presentation.statusText).toBe("FAILED");
  });
});
