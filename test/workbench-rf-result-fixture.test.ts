/** wb-973.11 (SCG-R11): the offline RF result fixture carries every result key the pinned rf emits on a --no-commit render, so
 * additive-key admission and the exact pins (eight envelope keys, six work keys, fourteen work_metrics keys) are proven in the
 * default gate against the real pinned shape. The roster lives in test/fixtures/rf-result-keys.json with its rf version, source
 * kind and capture receipt recorded beside it, and is itself pinned here to a literal roster authored independently from the
 * ReactiveFiberCLI emitter (first read at 8a8b83e4d for the 0.1.716 pin; re-read for the 0.1.768 pin by wb-973.17 at the
 * installed reactivefibercli 0.1.768 distribution, the delta being retry_work and the four ruling R-53 work_metrics
 * counters; re-read unchanged for the 0.1.784 pin by wb-c7ku at the installed 0.1.784 distribution), so an emptied, shrunken
 * or renamed roster cannot hold the census green. The fixture home
 * is test/helpers/rf-render-fixture.ts (owner ruling R1 (b'), row 481): validRf()/result() in the envelope-audit and observer
 * suites stay the minimal cli_version-free pins. Provider rows run a scripted rf stand-in HERMETICALLY: an absolute node shebang
 * (process.execPath) and PATH restricted to the stand-in's own directory, so the provider can resolve no other rf and a stand-in
 * fault refuses as a launch failure, never as a render by a host rf; each refusal row pins its cause (category and message). The
 * live drift diff of a real capture against the same roster is the rf-preview tier's row (test/workbench-native-rf-preview.test.ts).
 * wb-973.20: the captured roster is exhaustive in both directions (owner ruling R649 (3)), so a result key beyond it fails the diff
 * (R649 row), and U6 holds the roster to its capture receipt of record, an anchor outside the JSON, the literal and the fixture.
 * wb-91yt: U9 holds every provenance key the builder carries, by name and in emission order, to the emitted listings of
 * receipts/wb-91yt.md (read off each release's own emitter), and U6-U9 read their receipts as a reader sees them, every
 * complete HTML comment removed before any line filter. */
import { createHash } from 'node:crypto';
import { chmodSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { CapabilityError, type JsonValue } from '../src/workbench/capability-registry.js';
import { ObservationProjection, type ObservationScope } from '../src/workbench/observation.js';
import { nativeReactiveFiberPreview } from '../src/workbench/providers/reactivefiber.js';
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from '../src/workbench/reactivefiber-observer.js';
import {
  diffAgainstRoster, fullShapeRf, fullShapeWork, fullShapeWorkMetrics, type Json, RF_FIXTURE_GRAPH_REVISION, RF_FIXTURE_OPERATION_ID,
  RF_FIXTURE_RELEASE, RF_FIXTURE_TEXT, RF_FIXTURE_WORKSPACE_ID, type RfResultRoster, readRfResultRoster,
} from './helpers/rf-render-fixture.js';
import { installScratchLeakGuard, makeScratch, removeScratch } from './helpers/scratch.js';

installScratchLeakGuard();

/* The roster authored independently of test/fixtures/rf-result-keys.json (U5): read off the ReactiveFiberCLI emitter at
 * 8a8b83e4d, in the dossier's listing order, never from the JSON. A key is listed only when every finished --no-commit legacy
 * render carries it; view_id, effective_scopes and view_contract are conditional (render_service.py:1515-1526). necessity is NOT
 * conditional: step L always runs, so every finished --no-commit render emits it (render_service.py:1527-1532 and its comment). */
/** result: render_service.py:1494-1513 (output .. observations), :1533-1539 (attempts, superseded_transaction_ids,
 * fiber_transaction_refs), render.py:3569-3580 (the step-P ephemeral keys render_id, ephemeral, commit_seq, effects, plan) and
 * render_service.py:1527-1532 (necessity) and :1549 (session_id), all at 8a8b83e4d; retry_work at the installed 0.1.784
 * distribution, reactive_fiber_cli/application/render_service.py:1539-1541 (:1524-1526 at 0.1.768; PMO-13-a: assigned on
 * every render, beside the superseded ids, before fiber_transaction_refs). */
const PINNED_RESULT_KEYS = [
  'output', 'budget', 'diagnostics_summary', 'blocks', 'components', 'provenance', 'work_metrics', 'work',
  'engine_metrics', 'scope', 'audience', 'bundle_revision_id', 'observations', 'necessity', 'attempts',
  'superseded_transaction_ids', 'retry_work', 'fiber_transaction_refs',
  'ephemeral', 'render_id', 'commit_seq', 'session_id', 'effects', 'plan',
];
/** result.provenance, at least: context_show.py:313-339 at 8a8b83e4d, where render_provenance emitted seven keys (these three are
 * the dossier's floor). At the installed 0.1.784 distribution it emits eight (context_show.py:451-462: the seven
 * PROVENANCE_KEYS record fields, then the storage block), seven at 0.1.768; U9 holds the builder to all eight by name. */
const PINNED_PROVENANCE_KEYS = ['graph_revision_id', 'cli_version', 'sdk_versions'];
/** result.work: rendering.py:2606-2613 (WORK_KEYS, emission order). */
const PINNED_WORK_KEYS = [
  'source_capture_count', 'fiber_signal_count', 'component_render_count', 'lens_resolution_count', 'necessity_eval_count', 'storage_write_count',
];
/** result.work_metrics: integrations/fiber.py:2474-2485 at 8a8b83e4d (the ten legacy keys), widened once by ruling R-53: at the
 * installed 0.1.768 and 0.1.784 distributions reactive_fiber_cli/integrations/fiber.py:2719-2751, the same lines in both
 * (WORK_METRICS_KEYS = the ten LEGACY_WORK_METRICS_KEYS, never removed or renamed, then the four R53_WORK_METRICS_KEYS). */
const PINNED_WORK_METRICS_KEYS = [
  'source_capture_count', 'fiber_signal_count', 'fiber_transaction_count', 'invalidated_component_count', 'rendered_component_count',
  'state_read_count', 'state_write_count', 'journal_records_scanned', 'blob_bytes_written', 'history_rows_materialized',
  'reused_component_count', 'observation_executed_count', 'observation_reused_count', 'publish_conflict_count',
];

/** The roster's capture receipt of record (receipts/wb-c7ku.md, the 0.1.784 re-pin; receipts/wb-973.17.md keeps the 0.1.768 capture), read by U6. */
const ROSTER_RECEIPT = 'docs/workbench/receipts/wb-c7ku.md';
/** How the receipt spells a small count. */
const COUNT_WORDS: readonly string[] = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
/** Every key of the captured roster, listed in an append-only receipt entry (receipts/wb-c7ku.md since the 0.1.784 re-capture;
 * receipts/wb-j032.md keeps the 0.1.768 listing), read by U7. */
const ROSTER_KEYS_RECEIPT = 'docs/workbench/receipts/wb-c7ku.md';
/** The key lists that entry states, in its order: one line each, `- <label> keys (<count>): <key>, <key>, ... <key>.` */
const ROSTER_KEY_LIST_LABELS: readonly string[] = ['Result', 'Provenance', 'Work', 'Work metrics'];
/** The emitted provenance listings (wb-91yt, the wb-c7ku gate's F2 under ruling R691): every result.provenance key the pinned rf
 * and the pin before it emit, in emission order, and the pinned rf's storage block keys, each read off that release's own
 * emitter (never from the builder, the roster or the receipt of record) into an append-only receipt entry, read by U9. */
const PROVENANCE_LISTING_RECEIPT = 'docs/workbench/receipts/wb-91yt.md';
/** The listing lines that entry states, one per release: `- Emitted provenance keys at rf <release> (<count>): <key>, ... <key>.` */
const EMITTED_PROVENANCE_LIST = /^- Emitted provenance keys at rf (\d+\.\d+\.\d+) \((\d+)\): ([a-z_]+(?:, [a-z_]+)*)\.$/;
/** And the pinned release's storage block keys: `- Storage block keys at rf <release> (<count>): <key>, <key>.` */
const STORAGE_BLOCK_LIST = /^- Storage block keys at rf (\d+\.\d+\.\d+) \((\d+)\): ([a-z_]+(?:, [a-z_]+)*)\.$/;
/** How the receipt of record spells a key's position. */
const ORDINAL_WORDS: readonly string[] = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];

const roster = readRfResultRoster();

type Obj = { [key: string]: Json };
const asObject = (value: Json | undefined): Obj => {
  if (value === null || value === undefined || typeof value !== 'object' || Array.isArray(value)) throw new Error('expected an object');
  return value;
};
const resultOf = (envelope: Obj): Obj => asObject(envelope.result);
const without = (value: Obj, key: string): Obj => Object.fromEntries(Object.entries(value).filter(([name]) => name !== key));
const withResult = (envelope: Obj, over: Obj): Obj => ({ ...envelope, result: { ...resultOf(envelope), ...over } });
const digestOf = (text: string): string => createHash('sha256').update(text).digest('hex');

/** A complete HTML comment as CommonMark defines one: `<!-->`, `<!--->`, or `<!--` through the first `-->`. */
const COMPLETE_COMMENT = /<!--(?:-?>|[\s\S]*?-->)/g;
/** A receipt as a reader sees it (wb-91yt, the wb-c7ku gate's F3): every complete HTML comment is removed before any line filter
 * reads the file, so a claim wrapped in a comment is absent rather than binding, and an opener left without its close, which
 * would hide the rest of the page from a reader, is refused. */
function receiptText(path: string): string {
  const text = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8').replace(COMPLETE_COMMENT, '');
  if (text.includes('<!--')) throw new Error(`${path} holds an HTML comment opener without its close`);
  return text;
}
const receiptLines = (path: string): string[] => receiptText(path).split('\n');
/** The release, stated count and keys of every `pattern` list line among `lines`, in file order. */
function keyLists(lines: readonly string[], pattern: RegExp): { release: string; stated: number; keys: string[] }[] {
  return lines.flatMap(line => {
    const match = pattern.exec(line);
    return match === null ? [] : [{ release: match[1] ?? '', stated: Number(match[2]), keys: (match[3] ?? '').split(', ') }];
  });
}

/** The diff a fixture whose result drops `key` must produce: that key, plus every roster key of a subtree it takes with it. */
function droppedFailures(key: string): string[] {
  const subtree = (name: string, keys: readonly string[]): string[] => [`missing result.${name}`, ...keys.map(child => `missing result.${name}.${child}`)];
  if (key === 'provenance') return subtree('provenance', PINNED_PROVENANCE_KEYS);
  if (key === 'work') return subtree('work', PINNED_WORK_KEYS);
  if (key === 'work_metrics') return subtree('work_metrics', PINNED_WORK_METRICS_KEYS);
  return [`missing result.${key}`];
}

const originalPath = process.env.PATH;
const standIns: string[] = [];
afterEach(() => {
  if (originalPath === undefined) Reflect.deleteProperty(process.env, 'PATH');
  else process.env.PATH = originalPath;
  removeScratch(...standIns.splice(0));
});
/** A hermetic rf stand-in that prints `reply` and exits 0: an absolute node shebang, and PATH holding only its own directory for
 * the call, so the provider's spawn("rf") resolves this file or nothing. `mode` 0o600 leaves it unexecutable (the hermeticity row). */
function standIn(reply: unknown, mode = 0o700): void {
  const dir = makeScratch('rf-result-fixture-');
  standIns.push(dir);
  const binary = join(dir, 'rf');
  writeFileSync(binary, `#!${process.execPath}\nprocess.stdout.write(${JSON.stringify(JSON.stringify(reply))});\n`);
  chmodSync(binary, mode);
  process.env.PATH = dir;
}

/** The error a synchronous observer call throws; fails the row when it returns instead. */
function thrownBy(fn: () => unknown): unknown {
  try {
    fn();
  } catch (error) {
    return error;
  }
  throw new Error('expected the observer to refuse');
}

const ws = process.cwd();
const scope: ObservationScope = { workspace: ws, principal: 'local-operator:tester' };
const context: ReactiveFiberTopologyContext = { scope, seam: 'rf-cli', capturedAt: '2026-10-17T10:00:00Z', observedAt: '2026-10-17T10:00:01Z' };
const reading = (source: Obj): Json => ({ contract: 'reactivefiber.render.preview/v1', workspaceRoot: ws, source });
const UNRECOGNIZED = 'RF preview returned an unrecognized native envelope.';
const CONTRADICTORY = 'RF preview returned an unrecognized or contradictory envelope.';

/* The two Acceptance 3 refusal tables are named so each carries a length pin: an it.each over an unpinned literal registers
 * whatever rows it holds, so a dropped row (provider 5 -> 4, observer 3 -> 2) would leave every remaining case green. */
const OBSERVER_REFUSAL_ROWS = [
  ['ninth envelope key', (): Obj => ({ ...fullShapeRf(ws), extra: 1 }), 'source must be the strict eight-key rf envelope'],
  ['work with an extra key', (): Obj => withResult(fullShapeRf(ws), { work: { ...fullShapeWork(), extra: 1 } }), 'result.work needs exactly the six non-negative integer counters'],
  ['schema other', (): Obj => ({ ...fullShapeRf(ws), schema: 'reactive-fiber.cli/v2' }), 'source must be a reactive-fiber.cli/v1 context.render envelope'],
] as const;
const PROVIDER_REFUSAL_ROWS = [
  ['extra top-level key', (e: Obj): Obj => ({ ...e, error: 'pretend success' }), UNRECOGNIZED],
  ['claimed ephemeral storage write', (e: Obj): Obj => withResult(e, { work: { ...fullShapeWork(), storage_write_count: 1 } }), CONTRADICTORY],
  ['seventh result.work key', (e: Obj): Obj => withResult(e, { work: { ...fullShapeWork(), seventh_count: 0 } }), CONTRADICTORY],
  ['non-null ephemeral render id', (e: Obj): Obj => withResult(e, { render_id: 'rfr_aaaaaaaaaaaaaaaaaaaaaa' }), CONTRADICTORY],
  ['non-null ephemeral commit sequence', (e: Obj): Obj => withResult(e, { commit_seq: 1 }), CONTRADICTORY],
] as const;

describe('SCG-R11: full-shape offline RF result fixture', () => {
  // U5 (independent oracle): the roster file equals the independently authored literal, key for key and in order, at the
  // pinned lengths (24 result / 3 provenance / 6 work / 14 work_metrics at the 0.1.784 pin, unchanged from the 0.1.768 pin;
  // 23 / 3 / 6 / 10 at the 0.1.716 pin),
  // so an emptied, shrunken or renamed roster is red here.
  it('the frozen roster equals the independently authored literal roster: 24 result, 3 provenance, 6 work and 14 work_metrics keys', () => {
    expect([PINNED_RESULT_KEYS.length, PINNED_PROVENANCE_KEYS.length, PINNED_WORK_KEYS.length, PINNED_WORK_METRICS_KEYS.length]).toStrictEqual([24, 3, 6, 14]);
    expect(roster.resultKeys).toStrictEqual(PINNED_RESULT_KEYS);
    expect(roster.provenanceKeys).toStrictEqual(PINNED_PROVENANCE_KEYS);
    expect(roster.workKeys).toStrictEqual(PINNED_WORK_KEYS);
    expect(roster.workMetricsKeys).toStrictEqual(PINNED_WORK_METRICS_KEYS);
  });

  // U6 (wb-973.20, gate F5): an anchor OUTSIDE the roster, the literal and the fixture. The roster's capture receipt of record
  // (rule 13 receipts route; a receipt is append-only, so its statements hold still) names the capture id and states the
  // measured counts and the keys the roster gained over its 0.1.716 first read (the 0.1.768 delta, re-read unchanged at the 0.1.784
  // pin, receipts/wb-c7ku.md). A coordinated hollow of one key across the JSON roster, the literal above
  // and fullShapeRf changes a stated count, and a coordinated swap of a key the delta names drops that key, so either is red
  // here; a count-preserving swap of any other key keeps every stated count and is not red here (U7 below holds every key).
  it('U6: the captured roster agrees with its receipt of record: the capture id, the four stated counts and every key the delta names', () => {
    const receipt = receiptText(ROSTER_RECEIPT);
    expect([roster.source, roster.receipt]).toStrictEqual(['captured', 'cmd_ab79e0c5d689']);
    expect(receipt).toContain(`(receipt of record ${roster.receipt})`);
    expect(receipt).toContain(`is promoted to source ${roster.source} with receipt ${roster.receipt}.`);
    const delta = receipt.split('\n').filter(line => line.startsWith(`- Delta read at the installed reactivefibercli ${roster.rfVersion} distribution: `));
    expect(delta).toHaveLength(1);
    const line = delta[0] ?? '';
    const stated = (pattern: RegExp): string => pattern.exec(line)?.[1] ?? '<absent>';
    expect([
      stated(/so it joins the result roster \((\d+) keys\)/), stated(/; (\d+) keys\); result\.work is unchanged/),
      stated(/result\.work is unchanged \((\d+) keys\)/), stated(/provenance carries the (\w+) roster keys/),
    ]).toStrictEqual([
      String(roster.resultKeys.length), String(roster.workMetricsKeys.length), String(roster.workKeys.length), COUNT_WORDS[roster.provenanceKeys.length],
    ]);
    const addedResult = [...line.matchAll(/result\.([a-z_]+) is assigned on every render/g)].map(match => match[1] ?? '');
    const addedMetrics = stated(/to the ten legacy keys plus (.+?) \(/).split(/, | and /);
    expect([addedResult.length, addedMetrics.length]).toStrictEqual([1, 4]);
    expect(addedResult.filter(key => !roster.resultKeys.includes(key))).toStrictEqual([]);
    expect(addedMetrics.filter(key => !roster.workMetricsKeys.includes(key))).toStrictEqual([]);
    expect(roster.workMetricsKeys.length - addedMetrics.length).toBe(10);
  });

  // U7 (wb-j032, the wb-973.20 gate's F1): U6 anchors the roster to its receipt only by the four stated counts and the delta-named
  // keys, so a count-preserving swap of any other key made in step across the JSON roster, the literal above and the fullShape*
  // builders kept the default tier green (gate G1 audience -> audience_kind, G2 state_read_count -> state_reads_count). This anchor
  // lists EVERY key in an append-only receipt entry outside the three files, one plain-text list item per key list (no inline markup,
  // so each item renders exactly its text after the '- ' marker). The listing is read whole, so a missing, repeated, renamed or extra
  // list line is red, and each file is held to it: the roster and the literal key for key in roster order, the builders as key sets
  // (result, work and work_metrics exactly; provenance as the three-key floor the roster states, since the builder's carries eight at
  // the 0.1.784 pin). The title states that reach (wb-c7ku, the wb-j032 delivery gate's F1 under ruling R681 (2)).
  it('U7: the JSON roster and the literal roster equal the key lists of their receipt of record key for key in order; the full-shape builders carry exactly its result, work and work_metrics key sets and at least its provenance keys', () => {
    const lines = receiptLines(ROSTER_KEYS_RECEIPT);
    expect(lines.filter(line => line.startsWith('- Roster of record: ')))
      .toStrictEqual([`- Roster of record: rf ${roster.rfVersion}, source ${roster.source}, capture receipt ${roster.receipt} (${ROSTER_RECEIPT}).`]);
    const listing = lines.flatMap(line => {
      const match = /^- ([A-Z][a-z]+(?: [a-z]+)*) keys \((\d+)\): ([a-z_]+(?:, [a-z_]+)*)\.$/.exec(line);
      return match === null ? [] : [{ label: match[1] ?? '', stated: Number(match[2]), keys: (match[3] ?? '').split(', ') }];
    });
    expect(listing.map(list => list.label)).toStrictEqual(ROSTER_KEY_LIST_LABELS);
    expect(listing.map(list => list.keys.length)).toStrictEqual(listing.map(list => list.stated));
    const [result = [], provenance = [], work = [], workMetrics = []] = listing.map(list => list.keys);
    const listed = { result, provenance, work, workMetrics };
    expect({ result: roster.resultKeys, provenance: roster.provenanceKeys, work: roster.workKeys, workMetrics: roster.workMetricsKeys }).toStrictEqual(listed);
    expect({ result: PINNED_RESULT_KEYS, provenance: PINNED_PROVENANCE_KEYS, work: PINNED_WORK_KEYS, workMetrics: PINNED_WORK_METRICS_KEYS }).toStrictEqual(listed);
    const fixture = resultOf(fullShapeRf(ws));
    const keySet = (keys: readonly string[]): string[] => [...keys].sort();
    expect({ result: keySet(Object.keys(fixture)), work: keySet(Object.keys(asObject(fixture.work))), workMetrics: keySet(Object.keys(asObject(fixture.work_metrics))) })
      .toStrictEqual({ result: keySet(result), work: keySet(work), workMetrics: keySet(workMetrics) });
    expect(provenance.filter(key => !Object.hasOwn(asObject(fixture.provenance), key))).toStrictEqual([]);
  });

  // U8 (wb-c7ku, the 0.1.784 pin): rf 0.1.784 emits an eighth provenance key, the storage block, beyond the roster's three-key
  // floor. The full-shape builder carries it, so the provider round-trip and observer rows below admit it in the default gate;
  // this row holds the builder's provenance key count and that key to the delta line of the receipt of record, an anchor outside
  // the builder, so dropping the block or any other provenance key is red here. A count-preserving rename of an unlisted
  // provenance key stays outside this row and U7 (the provenance floor U7's title states); U9 below holds every key by name.
  it('U8: the full-shape builder carries the provenance key count its receipt of record states, including the key that receipt names as new', () => {
    const receipt = receiptText(ROSTER_RECEIPT);
    const delta = receipt.split('\n').filter(line => line.startsWith(`- Delta read at the installed reactivefibercli ${roster.rfVersion} distribution: `));
    expect(delta).toHaveLength(1);
    const stated = /provenance carries the \w+ roster keys among its (\w+), the \w+ new since the [0-9.]+ pin: ([a-z_]+),/.exec(delta[0] ?? '');
    const provenance = asObject(resultOf(fullShapeRf(ws)).provenance);
    expect([stated?.[1], Object.hasOwn(provenance, stated?.[2] ?? '<absent>')]).toStrictEqual([COUNT_WORDS[Object.keys(provenance).length], true]);
    expect(roster.provenanceKeys).not.toContain(stated?.[2]);
  });

  // U9 (wb-91yt, the wb-c7ku gate's F2 under ruling R691: the two residuals U8 left prose-only). U8 holds the builder's provenance
  // key count and the one key the delta line names, so a count-preserving rename of any other provenance key in the builder
  // (L2-B3: created_at -> created_utc) and a delta line naming another builder key as the new one (L2-R2: created_at for storage)
  // kept the default tier green. This anchor names every key outside the builder, the roster and the receipt of record:
  // receipts/wb-91yt.md lists the provenance keys each release emits, read off that release's own emitter, one plain-text list
  // item per release, and the pinned release's storage block keys. The builder is held to the pinned release's listing key for
  // key in emission order, the roster's keys to their places in it, and the delta line's count, ordinal, previous pin, new key and
  // storage block keys to the listings, so either residual is red here. FROZEN SHAPE (rule 16): 8 keys at the pin, 7 at the
  // previous pin, and 2 storage block keys, in that line order; the entry's own Source line states how many lists it carries, an
  // anchor outside this file, so deleting one list from this row and from the literal together is still red.
  it('U9: the full-shape builder carries exactly the provenance keys, in emission order, and the storage block keys its emitted listing states for the pinned rf, and the delta line of the receipt of record names the one key that listing adds over the previous pin', () => {
    const entry = receiptLines(PROVENANCE_LISTING_RECEIPT);
    const lists = [...keyLists(entry, EMITTED_PROVENANCE_LIST), ...keyLists(entry, STORAGE_BLOCK_LIST)];
    expect(entry.filter(line => line.startsWith('- Source of the ')).map(line => /^- Source of the (\w+) lists: /.exec(line)?.[1])).toStrictEqual([COUNT_WORDS[lists.length]]);
    const delta = receiptLines(ROSTER_RECEIPT).filter(line => line.startsWith(`- Delta read at the installed reactivefibercli ${roster.rfVersion} distribution: `));
    expect(delta).toHaveLength(1);
    const named = /provenance carries the \w+ roster keys among its (\w+), the (\w+) new since the ([0-9.]+) pin: ([a-z_]+), the [^{]* block \{([a-z_]+(?:, [a-z_]+)*)\}/.exec(delta[0] ?? '');
    expect(lists.map(list => list.release)).toStrictEqual([roster.rfVersion, named?.[3], roster.rfVersion]);
    expect(lists.map(list => list.keys.length)).toStrictEqual(lists.map(list => list.stated));
    expect(lists.map(list => list.keys.length)).toStrictEqual([8, 7, 2]);
    const [pinned = [], previous = [], storage = []] = lists.map(list => list.keys);
    const provenance = asObject(resultOf(fullShapeRf(ws)).provenance);
    expect(Object.keys(provenance)).toStrictEqual(pinned);
    expect(Object.keys(asObject(provenance.storage))).toStrictEqual(storage);
    expect(pinned.filter(key => roster.provenanceKeys.includes(key))).toStrictEqual(roster.provenanceKeys);
    expect(pinned.filter(key => previous.includes(key))).toStrictEqual(previous);
    const added = pinned.filter(key => !previous.includes(key));
    expect(added).toStrictEqual([named?.[4]]);
    expect([named?.[1], named?.[2], named?.[5]?.split(', ')]).toStrictEqual([COUNT_WORDS[pinned.length], ORDINAL_WORDS[pinned.indexOf(added[0] ?? '<absent>')], storage]);
  });

  // Acceptance 1 (census-grade): the fixture's result keys are a superset of the frozen roster, provenance carries the three
  // named keys, work has exactly 6 keys and work_metrics exactly 14, beside the eight envelope keys.
  it('SCG-R11: the offline RF result fixture carries every key the pinned rf emits', () => {
    const fixture = fullShapeRf(ws);
    const result = resultOf(fixture);
    const provenance = asObject(result.provenance);
    expect(roster.resultKeys.filter(key => !Object.keys(result).includes(key))).toStrictEqual([]);
    expect(['graph_revision_id', 'cli_version', 'sdk_versions'].filter(key => !Object.hasOwn(provenance, key))).toStrictEqual([]);
    expect(Object.keys(asObject(result.work))).toHaveLength(6);
    expect(Object.keys(asObject(result.work_metrics))).toHaveLength(14);
    expect(diffAgainstRoster(roster, result)).toStrictEqual({ failures: [], extraResultKeys: [] });
    expect(Object.keys(fixture)).toHaveLength(8);
    expect(provenance.cli_version).toBe(roster.rfVersion);
  });

  // Acceptance 4: the mirrored rf version, the source kind and the receipt; 'captured' only with a cmd_ receipt, else null.
  it('records the mirrored rf version, source kind and capture receipt beside the roster', () => {
    expect(roster.rfVersion).toBe('0.1.784');
    expect(['captured', 'constructed']).toContain(roster.source);
    if (roster.source === 'captured') expect(roster.receipt).toMatch(/^cmd_[0-9a-f]{12}$/);
    else expect(roster.receipt).toBeNull();
    expect(roster.basis).toContain('8a8b83e4d');
  });

  // Falsifiers over the literal roster (each table registers its cases whatever the JSON holds): the census names the drift.
  it.each(PINNED_RESULT_KEYS)('the census names a fixture that drops result.%s', key => {
    expect(diffAgainstRoster(roster, without(resultOf(fullShapeRf(ws)), key))).toStrictEqual({ failures: droppedFailures(key), extraResultKeys: [] });
  });
  it.each(PINNED_PROVENANCE_KEYS)('the census names a fixture whose provenance drops %s', key => {
    const result = resultOf(fullShapeRf(ws));
    expect(diffAgainstRoster(roster, { ...result, provenance: without(asObject(result.provenance), key) }).failures).toStrictEqual([`missing result.provenance.${key}`]);
  });
  it.each(PINNED_WORK_KEYS)('the census names a fixture whose work drops %s', key => {
    expect(diffAgainstRoster(roster, { ...resultOf(fullShapeRf(ws)), work: without(fullShapeWork(), key) }).failures).toStrictEqual([`missing result.work.${key}`]);
  });
  it.each(PINNED_WORK_METRICS_KEYS)('the census names a fixture whose work_metrics drops %s', key => {
    expect(diffAgainstRoster(roster, { ...resultOf(fullShapeRf(ws)), work_metrics: without(fullShapeWorkMetrics(), key) }).failures)
      .toStrictEqual([`missing result.work_metrics.${key}`]);
  });
  it('the census names a work or work_metrics key beyond the roster, and a constructed roster records an extra result key without failing on it', () => {
    const result = resultOf(fullShapeRf(ws));
    expect(diffAgainstRoster(roster, { ...result, work: { ...fullShapeWork(), seventh_count: 0 } }).failures).toStrictEqual(['unexpected result.work.seventh_count']);
    expect(diffAgainstRoster(roster, { ...result, work_metrics: { ...fullShapeWorkMetrics(), eleventh_count: 0 } }).failures)
      .toStrictEqual(['unexpected result.work_metrics.eleventh_count']);
    // A conditional key rides beside the roster: view_id is stated only by a --view render (render_service.py:1518-1523 at the
    // 0.1.784 pin, :1503-1508 at 0.1.768). retry_work (an extra key at 0.1.723) and necessity are roster members since their pins. Beside a constructed
    // roster (a floor read off the emitter, before a capture promotes it) the extra key is recorded, never failed; beside the
    // captured roster it fails by name (owner ruling R649 (3), the R649 row below).
    const constructed: RfResultRoster = { ...roster, source: 'constructed', receipt: null };
    expect(diffAgainstRoster(constructed, { ...result, view_id: 'view.demo' }))
      .toStrictEqual({ failures: [], extraResultKeys: ['view_id'] });
  });

  // wb-973.20 (owner ruling R649 (3)): the captured pinned roster is exhaustive in BOTH directions. A result key beyond it is the
  // rf surface drift the pin exists to catch, so the diff fails on it by name (and still records it); the legitimate path for a
  // new key is the gated rf-pin-bump cut that re-captures the roster (the wb-973.17 route rule), never a silent pass.
  it('R649: a result held to the captured pinned roster fails on every result key beyond it, naming each, and still records them', () => {
    expect(roster.source).toBe('captured');
    const result = resultOf(fullShapeRf(ws));
    expect(diffAgainstRoster(roster, { ...result, view_id: 'view.demo' })).toStrictEqual({ failures: ['unexpected result.view_id'], extraResultKeys: ['view_id'] });
    expect(diffAgainstRoster(roster, { ...result, zeta_count: 0, alpha_count: 0 }))
      .toStrictEqual({ failures: ['unexpected result.alpha_count', 'unexpected result.zeta_count'], extraResultKeys: ['alpha_count', 'zeta_count'] });
    expect(diffAgainstRoster(roster, { ...without(result, 'retry_work'), view_id: 'view.demo' }).failures).toStrictEqual(['missing result.retry_work', 'unexpected result.view_id']);
  });

  // Acceptance 2: nativeReactiveFiberPreview round-trips the full-shape fixture (extends the envelope-audit admission row).
  // Positive protection (gate F4): these full-shape rows are the guard of additive-key admission; keep them.
  it('admits the full-shape envelope: additive result keys survive the provider round-trip unchanged', async () => {
    const fixture = fullShapeRf(ws);
    standIn(fixture);
    expect(await nativeReactiveFiberPreview('model', 'task', ws)).toStrictEqual({ contract: 'reactivefiber.render.preview/v1', workspaceRoot: ws, source: fixture });
  });

  // Acceptance 2 (observer), at the landed R1 row's strength: the full-shape provider reading projects one clean snapshot,
  // toStrictEqual, with the stated release as the distinct rf-cli reference and never as sourceVersion (owner ruling G-A).
  // wb-973.8 (SCG-R8): the fixture's result.bundle_revision_id rides as the rf-bundle reference and owns sourceVersion.
  it('R1 on the full shape: the observer projects the provider reading as one clean snapshot with the rf-cli release reference', async () => {
    const bundle = resultOf(fullShapeRf(ws)).bundle_revision_id;
    if (typeof bundle !== 'string') throw new Error('the full-shape fixture must state a string bundle_revision_id');
    standIn(fullShapeRf(ws));
    const topology = reactivefiberTopology((await nativeReactiveFiberPreview('model', 'task', ws)) as JsonValue, { ...context, invocationId: 'wf_rf_1' });
    expect(topology.snapshots).toHaveLength(1);
    const snapshot = topology.snapshots[0];
    expect(snapshot).toStrictEqual({
      source: { provider: 'reactivefiber', type: 'context-preview', id: RF_FIXTURE_OPERATION_ID, scope: ws }, scope,
      capturedAt: context.capturedAt, observedAt: context.observedAt, coverage: 'complete',
      node: { title: `RF context preview ${RF_FIXTURE_OPERATION_ID}`, type: 'sdk-operation', statusTone: 'success',
        statusText: 'noncommitted preview (rf-cli) · 989760 of 1000000 context tokens available · necessity evals 0 · 0 errors, 0 warnings' },
      kind: 'reactivefiber.render.preview.snapshot',
      evidenceRefs: [`rf-graph:${RF_FIXTURE_GRAPH_REVISION}`, `rf-workspace:${RF_FIXTURE_WORKSPACE_ID}`, `rf-bundle:${bundle}`, `rf-cli:${RF_FIXTURE_RELEASE}`],
      sourceVersion: bundle, sourceRevision: RF_FIXTURE_GRAPH_REVISION, nativePayloadRef: `rf-output:sha256:${digestOf(RF_FIXTURE_TEXT)}`,
      trace: { invocationId: 'wf_rf_1' },
    });
    expect(snapshot.sourceVersion).not.toBe(RF_FIXTURE_RELEASE);
    expect(topology.relations).toStrictEqual([]);
    expect(topology.diagnostics).toContain(`producer release from result.provenance.cli_version: rf@${RF_FIXTURE_RELEASE}`);
    expect(topology.diagnostics.join('\n')).toContain('noncommitted');
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    expect(projection.query({ scope, limit: 10, evidence: `rf-cli:${RF_FIXTURE_RELEASE}` }).nodes.map(node => node.nativeRef.id)).toStrictEqual([RF_FIXTURE_OPERATION_ID]);
    expect(projection.query({ scope, limit: 10, version: RF_FIXTURE_RELEASE }).nodes).toStrictEqual([]);
    expect(projection.query({ scope, limit: 10, version: bundle }).nodes.map(node => node.nativeRef.id)).toStrictEqual([RF_FIXTURE_OPERATION_ID]);
  });

  // Acceptance 3 (observer): the named refusal rows replayed on the full shape, each for its own cause.
  it('the observer refusal table keeps its 3 rows', () => {
    expect(OBSERVER_REFUSAL_ROWS).toHaveLength(3);
  });
  it.each(OBSERVER_REFUSAL_ROWS)('the observer still refuses %s on the full shape', (_label, source, cause) => {
    const error = thrownBy(() => reactivefiberTopology(reading(source()) as JsonValue, context));
    expect(error).toBeInstanceOf(CapabilityError);
    expect(error).toMatchObject({ category: 'validation', message: `ReactiveFiber topology refused: ${cause}.` });
  });

  // Acceptance 3 (provider): strictness is not loosened by the additive keys, and each row refuses for its own cause.
  it('the provider refusal table keeps its 5 rows', () => {
    expect(PROVIDER_REFUSAL_ROWS).toHaveLength(5);
  });
  it.each(PROVIDER_REFUSAL_ROWS)('still refuses %s on the full shape, for that cause', async (_label, mutate, message) => {
    standIn(mutate(fullShapeRf(ws)));
    const refusal = nativeReactiveFiberPreview('model', 'task', ws);
    await expect(refusal).rejects.toBeInstanceOf(CapabilityError);
    await expect(refusal).rejects.toMatchObject({ category: 'transport', message });
  });

  // Hermeticity: with PATH restricted to the stand-in's directory, a stand-in that cannot execute is a launch failure; it can
  // never fall through to a host rf (which would refuse 'unavailable' for its own workspace instead).
  it('the stand-in is hermetic: one that cannot execute refuses as a launch failure and never reaches a host rf', async () => {
    standIn(fullShapeRf(ws), 0o600);
    await expect(nativeReactiveFiberPreview('model', 'task', ws)).rejects.toMatchObject({ category: 'transport', message: 'RF preview could not launch the installed binary.' });
  });
});
