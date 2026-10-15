/**
 * Release checklist item 8 (docs/workbench/17-packaging-and-operations.md, "Release checklist"):
 * "8. 80x24, 120x40 and resize/SSH terminal tests pass."
 *
 * Deterministic geometry conformance over the exported layout functions only. No timing claims
 * (the observation bench owns timing) and no pty (the live acceptance receipt owns the live check).
 * A width or row violation here is a finding against the layout, never a reason to change a fixture.
 */
import { visibleWidth } from '@earendil-works/pi-tui';
import { describe, expect, it } from 'vitest';
import { layoutWorkflowCard, plainWorkflowCardLines } from '../src/ui/workflow-card.js';
import { initialWorkflowDialogState, layoutWorkflowDialog, plainWorkflowDialogLines } from '../src/ui/workflow-dialog.js';
import { type InspectorModel, type InspectorState, type InspectorView, initialInspectorState, layoutInspector } from '../src/ui/workflow-inspector.js';
import { type NativeRef, ObservationProjection, type ObservationScope } from '../src/workbench/observation.js';
import type { WorkflowEntry } from '../src/workflow/progress.js';

interface Geometry { readonly width: number; readonly rows: number }
const SMALL: Geometry = { width: 80, rows: 24 };
const LARGE: Geometry = { width: 120, rows: 40 };
const GEOMETRIES: readonly Geometry[] = [SMALL, LARGE];
const VIEWS: readonly InspectorView[] = ['overview', 'graph', 'timeline', 'details'];

const scope: ObservationScope = { workspace: 'geometry', principal: 'reader' };
const observedAt = '2026-10-15T00:00:00Z';
const nativeRef = (provider: string, id: string): NativeRef => ({ provider, type: 'operation', id });

/** Hostile labels: CJK wide cells, combining marks, zero-width characters, ANSI/OSC, bidi and C0/C1 controls. */
const HOSTILE_LABELS: readonly string[] = [
  '漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字漢字',
  `e${'́'.repeat(40)}${'x'.repeat(130)}`,
  `zero${'​'.repeat(30)}width${'‍'.repeat(30)}${'y'.repeat(130)}`,
  '\x1b[2J\x1b[31mred\x1b[0m \x1b]0;pwned\x07 title \x1b]8;;https://example.invalid\x1b\\link\x1b]8;;\x1b\\',
  `bidi ‮evil‬ ⁦iso⁩ ctl\x00\x07\x08\x7f\x9b end ${'z'.repeat(140)}`,
  'plain short label',
];
/** No raw ESC, C0/C1 control, DEL or bidi override/isolate may survive in any rendered line. */
const UNSAFE_OUTPUT = /[\u0000-\u001f\u007f-\u009f‪-‮⁦-⁩]/;

/** The projection refuses C0/DEL at ingress, so its producer-supplied labels carry only what ingress admits (C1, bidi, zero-width, wide, combining). */
const INGRESS_ADMITTED = (label: string): string => label.replace(/[\x00-\x1f\x7f]/g, '');

function inspectorFixture(): InspectorModel {
  const projection = new ObservationProjection({ maxEvents: 64, maxNodes: 256, maxEdges: 256, maxQuery: 40 });
  HOSTILE_LABELS.map(INGRESS_ADMITTED).forEach((label, i) => {
    projection.refresh({
      source: nativeRef(i % 2 ? 'forge' : 'furnace', `node-${i}`), scope, capturedAt: observedAt, observedAt,
      node: { title: label, type: 'sdk-operation', statusText: label, statusTone: 'active' } as never,
      trace: { invocationId: 'geometry-1' }, coverage: 'partial',
      ...(i < 3 ? { interval: { startedAt: observedAt, endedAt: '2026-10-15T00:00:02Z' } } : {}),
    } as never);
  });
  for (let i = 0; i < 40; i++) {
    projection.refresh({
      source: nativeRef('forge', `bulk-${i}`), scope, capturedAt: observedAt, observedAt,
      node: { title: `Bulk operation ${i} 漢字`, type: 'sdk-operation', statusText: 'running', statusTone: 'active' } as never,
      trace: { invocationId: 'geometry-1' }, coverage: 'partial',
    } as never);
  }
  projection.relate({ scope, from: nativeRef('furnace', 'node-0'), to: nativeRef('forge', 'node-1'), kind: 'dependency', provenance: { source: 'furnace', observedAt } });
  return { projection, scope, invocationId: 'geometry-1', title: HOSTILE_LABELS[3], status: HOSTILE_LABELS[0] };
}

function progressFixture(): WorkflowEntry[] {
  const entries: WorkflowEntry[] = [{ type: 'workflow_phase', index: 0, title: HOSTILE_LABELS[0] }];
  HOSTILE_LABELS.forEach((label, i) => {
    entries.push({ type: 'workflow_agent', index: i, label, phaseIndex: 0, phaseTitle: HOSTILE_LABELS[0], state: 'running', agentType: HOSTILE_LABELS[2], resultPreview: label, error: undefined });
    entries.push({ type: 'workflow_node', index: 100 + i, callId: i, capabilityId: 'record.read', label, state: 'done', phaseIndex: 0, phaseTitle: HOSTILE_LABELS[0], resultPreview: label, sourceBasis: label, evidenceRefs: [] });
  });
  entries.push({ type: 'workflow_log', index: 0, message: HOSTILE_LABELS[4] } as never);
  return entries;
}

const task = { status: 'running' as const, workflowName: HOSTILE_LABELS[3], summary: HOSTILE_LABELS[1], startTime: 1000 };

const cardLines = (geometry: Geometry, ascii: boolean): string[] =>
  plainWorkflowCardLines(layoutWorkflowCard({ task, progress: progressFixture(), width: geometry.width, ascii, now: 5000 }));
const dialogLines = (geometry: Geometry, ascii: boolean): string[] =>
  plainWorkflowDialogLines(layoutWorkflowDialog({ task, progress: progressFixture(), state: initialWorkflowDialogState(), width: geometry.width, terminalRows: geometry.rows, ascii, now: 5000 }));
const inspectorLines = (model: InspectorModel, state: InspectorState, geometry: Geometry, ascii: boolean): string[] =>
  layoutInspector(model, state, { width: geometry.width, rows: geometry.rows, ascii });

describe('release checklist item 8: deterministic terminal geometry', () => {
  describe.each(GEOMETRIES)('$width x $rows', geometry => {
    it.each([false, true])('workflow card lines fit the column budget and carry no raw control bytes, ascii=%s', ascii => {
      const lines = cardLines(geometry, ascii);
      expect(lines.length).toBeGreaterThan(0);
      for (const line of lines) {
        expect(visibleWidth(line)).toBeLessThanOrEqual(geometry.width);
        expect(line).not.toMatch(UNSAFE_OUTPUT);
      }
    });

    it.each([false, true])('workflow dialog lines fit the column budget and the viewport rows, ascii=%s', ascii => {
      const lines = dialogLines(geometry, ascii);
      expect(lines.length).toBeGreaterThan(0);
      expect(lines.length).toBeLessThanOrEqual(geometry.rows);
      for (const line of lines) {
        expect(visibleWidth(line)).toBeLessThanOrEqual(geometry.width);
        expect(line).not.toMatch(UNSAFE_OUTPUT);
      }
    });

    it.each(VIEWS.flatMap(view => [false, true].map(ascii => [view, ascii] as const)))('inspector %s view fits width and rows, ascii=%s', (view, ascii) => {
      const lines = inspectorLines(inspectorFixture(), { ...initialInspectorState(), view }, geometry, ascii);
      expect(lines.length).toBeGreaterThan(0);
      expect(lines.length).toBeLessThanOrEqual(geometry.rows);
      for (const line of lines) {
        expect(visibleWidth(line)).toBeLessThanOrEqual(geometry.width);
        expect(line).not.toMatch(UNSAFE_OUTPUT);
      }
    });

    it('inspector truncation is explicit: a page larger than the viewport names its remainder', () => {
      const lines = inspectorLines(inspectorFixture(), initialInspectorState(), geometry, false).join('\n');
      expect(lines).toMatch(/more row|more reference|viewport|row budget/);
    });
  });

  describe('mid-session resize reflow', () => {
    it.each(VIEWS)('inspector %s: 120x40 -> 80x24 -> 120x40 leaves no stale rows and is idempotent', view => {
      const model = inspectorFixture();
      const state: InspectorState = { ...initialInspectorState(), view };
      const frozen = JSON.stringify(state);
      const first = inspectorLines(model, state, LARGE, false);
      const shrunk = inspectorLines(model, state, SMALL, false);
      const restored = inspectorLines(model, state, LARGE, false);
      expect(JSON.stringify(state)).toBe(frozen);
      expect(restored).toEqual(first);
      expect(inspectorLines(model, state, SMALL, false)).toEqual(shrunk);
      expect(shrunk.length).toBeLessThanOrEqual(SMALL.rows);
      for (const line of shrunk) expect(visibleWidth(line)).toBeLessThanOrEqual(SMALL.width);
      // Nothing from the wide frame survives into the narrow one as an over-wide leftover row.
      expect(Math.max(...shrunk.map(visibleWidth))).toBeLessThanOrEqual(SMALL.width);
    });

    it('inspector selection stays valid across the resize sequence', () => {
      const model = inspectorFixture();
      const selected = model.projection.window({ scope, invocationId: 'geometry-1', offset: 2, limit: 1 }).nodes[0];
      const state: InspectorState = { ...initialInspectorState(), selected: selected.key, index: 2 };
      for (const geometry of [LARGE, SMALL, LARGE]) {
        const lines = inspectorLines(model, state, geometry, false);
        expect(lines.some(line => /(❯|>)/.test(line))).toBe(true);
        expect(lines.join('\n')).toContain('3/');
      }
    });

    it('card and dialog re-render identically for an unchanged model after a resize round trip', () => {
      expect(cardLines(LARGE, false)).toEqual(cardLines(LARGE, false));
      const before = dialogLines(LARGE, false);
      dialogLines(SMALL, false);
      expect(dialogLines(LARGE, false)).toEqual(before);
      const cardBefore = cardLines(LARGE, false);
      cardLines(SMALL, false);
      expect(cardLines(LARGE, false)).toEqual(cardBefore);
    });
  });

  describe('SSH / TERM=dumb tier (ascii glyph set)', () => {
    it('inspector, dialog and card emit only printable ASCII-safe cells for hostile input', () => {
      const model = inspectorFixture();
      const rendered = [
        ...VIEWS.flatMap(view => inspectorLines(model, { ...initialInspectorState(), view }, SMALL, true)),
        ...cardLines(SMALL, true),
        ...dialogLines(SMALL, true),
      ];
      expect(rendered.length).toBeGreaterThan(0);
      for (const line of rendered) {
        expect(line).not.toContain('\x1b');
        expect(line).not.toMatch(UNSAFE_OUTPUT);
      }
      for (const line of VIEWS.flatMap(view => inspectorLines(model, { ...initialInspectorState(), view }, SMALL, true))) {
        expect(line).toMatch(/^[\x20-\x7e]*$/);
      }
    });

    it('stays readable: the ASCII inspector still names its view, count and selection hint', () => {
      const text = inspectorLines(inspectorFixture(), initialInspectorState(), SMALL, true).join('\n');
      expect(text).toContain('OVERVIEW');
      expect(text).toMatch(/observed operations?/);
    });
  });

  describe('sanitizer routing', () => {
    it('adversarial OSC/CSI payloads never reach any surface verbatim', () => {
      const model = inspectorFixture();
      const all = [
        ...cardLines(SMALL, false), ...dialogLines(LARGE, false),
        ...VIEWS.flatMap(view => inspectorLines(model, { ...initialInspectorState(), view }, LARGE, false)),
      ].join('\n');
      expect(all).not.toContain('\x1b');
      expect(all).not.toContain('pwned\x07');
      expect(all).not.toContain('‮');
    });
  });
});
