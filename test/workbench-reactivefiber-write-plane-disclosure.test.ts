/**
 * wb-2j3.3 (RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION-R4): the preview's code claim surfaces disclose writes
 * plane-scoped and truthfully.
 *
 * Spec lines pinned (bead acceptance):
 *  A1 "A unit test over both registered descriptors asserts description does NOT match
 *      /no durable write|zero durable writes|effect-?free|no effects/i AND does state the authoritative/journal scope plus
 *      possible disposable cache-plane writes."
 *  A2 "An observer test asserts the note formerly reading '0 storage writes' is scoped to the envelope counter
 *      (e.g. '0 authoritative storage writes (envelope storage_write_count)')."
 *  A3 "Envelope validation unchanged: work.storage_write_count !== 0 is still refused."
 *  A4 "The new wording does NOT claim the preview is effect-free: the disclosure is scoped to the storage planes, never to
 *      effect outcomes."
 *  and "effectClass 'read' is retained on the recorded Invariant-1 basis."
 */
import {describe, expect, it} from 'vitest';
import {CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import type {ObservationScope} from '../src/workbench/observation.js';
import {registerNativeReactiveFiberRender, registerReactiveFiberRender} from '../src/workbench/providers/reactivefiber.js';
import {type ReactiveFiberTopologyContext, reactivefiberTopology} from '../src/workbench/reactivefiber-observer.js';

const WS = '/tmp/reactivefiber-write-plane-ws';
const GRAPH = `sha256:${'a1'.repeat(32)}`;
const FORBIDDEN = /no durable write|zero durable writes|effect-?free|no effects/i;
const AUTHORITATIVE_SCOPE = /authoritative/i;
const JOURNAL_SCOPE = /journal/i;
const CACHE_PLANE = /cache-plane/i;
const DISPOSABLE = /disposable/i;

function descriptors(): {id: string; description: string; effectClass: string; via: string}[] {
  const found: {id: string; description: string; effectClass: string; via: string}[] = [];
  const injected = new CapabilityRegistry();
  registerReactiveFiberRender(injected, async () => { throw new Error('not invoked'); }, WS);
  const native = new CapabilityRegistry();
  registerNativeReactiveFiberRender(native, WS);
  for (const [via, registry] of [['registerReactiveFiberRender', injected], ['registerNativeReactiveFiberRender', native]] as const) {
    for (const {descriptor} of registry.catalogSnapshot()) {
      found.push({id: descriptor.id, description: descriptor.description, effectClass: descriptor.effectClass, via});
    }
  }
  return found;
}

describe('wb-2j3.3 reactivefiber preview write-plane disclosure', () => {
  it('A1: both registered preview descriptors never claim no durable write / effect-free and state the authoritative scope plus possible disposable cache-plane writes', () => {
    const all = descriptors();
    expect(all.map(item => item.via)).toStrictEqual(['registerReactiveFiberRender', 'registerNativeReactiveFiberRender']);
    for (const item of all) {
      expect(item.id).toBe('reactivefiber.render.preview');
      expect(item.description, item.via).not.toMatch(FORBIDDEN);
      expect(item.description, item.via).toMatch(AUTHORITATIVE_SCOPE);
      expect(item.description, item.via).toMatch(JOURNAL_SCOPE);
      expect(item.description, item.via).toMatch(CACHE_PLANE);
      expect(item.description, item.via).toMatch(DISPOSABLE);
    }
  });

  it('A4: the disclosure is scoped to the storage planes and never claims an effect outcome; effectClass read is retained', () => {
    for (const item of descriptors()) {
      expect(item.effectClass, item.via).toBe('read');
      expect(item.description, item.via).not.toMatch(/\b(pure|side-?effect|idempotent|nothing is written|no writes?)\b/i);
    }
  });

  const scope: ObservationScope = {workspace: WS, principal: 'local-operator:tester'};
  const context: ReactiveFiberTopologyContext = {scope, seam: 'rf-cli', capturedAt: '2026-10-15T10:00:00Z', observedAt: '2026-10-15T10:00:01Z'};
  const work = (count: number): JsonValue => ({source_capture_count: 3, fiber_signal_count: 5, component_render_count: 2, lens_resolution_count: 1,
    necessity_eval_count: 4, storage_write_count: count});
  const reading = (count: number): JsonValue => ({
    contract: 'reactivefiber.render.preview/v1', workspaceRoot: WS,
    source: {schema: 'reactive-fiber.cli/v1', ok: true, command: 'context.render', operation_id: 'rfo_0123456789abcdefghijkl',
      workspace: {id: 'rfw_0123456789abcdefghijkl', root: WS}, transaction_id: null, diagnostics: [],
      result: {ephemeral: true, render_id: null, output: {text: 'ctx'}, provenance: {graph_revision_id: GRAPH},
        budget: {formula_terms: {context_window: 8192, output_reserve: 1024, occupied_tokens: 900, overhead: 100, safety_margin: 200, available_context_tokens: 5968}},
        diagnostics_summary: {errors: 0, warnings: 0, has_errors: false, has_warnings: false}, work: work(count)}},
  });

  it('A2: the observer note scopes its counter to the envelope authoritative-store counter', () => {
    const [note] = reactivefiberTopology(reading(0), context).diagnostics;
    expect(note).toBe('ephemeral noncommitted preview: render_id null, transaction_id null, 0 authoritative storage writes (envelope storage_write_count)');
    expect(note).not.toMatch(/\b0 storage writes\b/);
    expect(note).not.toMatch(FORBIDDEN);
  });

  it('A3: a nonzero envelope storage_write_count is still refused', () => {
    expect(() => reactivefiberTopology(reading(1), context)).toThrow();
  });
});
