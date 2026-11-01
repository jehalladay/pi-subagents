/**
 * wb-v03p: the record judge, the read log, the run-output and compare readers and the heading reader of the wb-e9dy rf context
 * census, as wb-b4lg's FINAL cut #4 wrote them (machine/flywheel/wb-b4lg tip a6d757fecf2070de00d3d4f587dff55d46c0f5af, the wb-e9dy
 * census module that cut edits), moved here so that the wb-v03p readers census can hold their readings. Under the rule-19
 * dependency inversion R-B221 the parent wb-b4lg is parked and waits on wb-v03p; its later re-cut can import these readers.
 * The code of every declaration below the imports, from its first line to its closing line, is copied byte for byte from that tip:
 * lines 315, 364-365, 373, 378, 402-403, 405, 474-476, 608-616, 737-742, 783-785, 992-995, 1238-1242, 1244-1257, 1258-1263,
 * 1265-1273, 1274-1276, 1281-1283, 1284-1300, 1431-1432, 1465-1470, 1541-1551, 1559-1563, 1569-1600, 1609-1614, 1626-1631,
 * 1633-1635 and 1640-1646, in that order. The doc comments above those declarations are not copied: they spell the product
 * vocabulary that test/workbench-hx-gp-answer-invariance-census.test.ts B3 holds a test file outside its holder classes to, and
 * this module is in none. Only this comment, the imports, Z2_CALL_SITE (the parent's Z2 compare call, its line 1786, kept verbatim
 * inside it) and the export statements are added; the readings this module is held to are the readers census's pinned probes.
 * Test-only: nothing is read from disk or written here, and no src module is imported but the capability registry's JsonValue type.
 */
import { isDeepStrictEqual } from "node:util";
import type { Tokens } from "marked";
import type { JsonValue } from "../../src/workbench/capability-registry.js";
import { docsSection } from "./census.js";

type JsonObject = { [key: string]: JsonValue };
const MENTION = /graph[^\p{L}\p{N}]*(?:policy|data[^\p{L}\p{N}]*ir)/giu;
const MENTION_ONE = new RegExp(MENTION.source, "iu");
const ABBREVIATION = "gp";
const FIELD_WORDS: readonly string[] = ["score", "ranking", "embedding", "receipt"];
const READER_KINDS = ["topology", "evidence"] as const;
type ReaderKind = (typeof READER_KINDS)[number];
const HEADING_PROBE = "probe";
const LEAK_TEXT = "SECRET-GP-";
const LEAK_SCORE = 0.918273645;
const LEAK_EMBEDDING: readonly number[] = [0.123456789, 0.987654321];
function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  if (value === null || typeof value === "boolean" || typeof value === "number" || typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(json);
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([key, member]) => [key, json(member)]));
  throw new Error(`not a JSON value: ${typeof value}`);
}
function wordsOf(term: string): string[] {
  return term
    .split(/[^\p{L}\p{N}]+/u)
    .flatMap(part => part.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g) ?? [])
    .map(word => word.toLowerCase());
}
function mentions(text: string): boolean {
  return MENTION_ONE.test(text);
}
function renderedHeading(heading: Tokens.Heading): string {
  const block = docsSection(`## ${HEADING_PROBE}\n\n###### ${heading.text.replace(/\n/g, " ")}\n`, HEADING_PROBE, 2, []).blocks[0];
  return block?.kind === "heading" ? block.text : "";
}
interface RecordItem {
  readonly at: string;
  readonly key: string | null;
  readonly value: string | null;
}
function recordItems(prefix: string, value: JsonValue, path: string, out: RecordItem[]): RecordItem[] {
  if (typeof value === "string") out.push({ at: `${prefix}${path}`, key: null, value });
  else if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) recordItems(prefix, item, `${path}[${index}]`, out);
  }
  else if (value !== null && typeof value === "object") {
    for (const [key, member] of Object.entries(value)) {
      const at = path === "" ? key : `${path}.${key}`;
      out.push({ at: `${prefix}${at}`, key, value: null });
      recordItems(prefix, member, at, out);
    }
  }
  return out;
}
interface KeyLists {
  readonly resultKeys: readonly string[];
  readonly provenanceKeys: readonly string[];
  readonly workKeys: readonly string[];
  readonly workMetricsKeys: readonly string[];
}
function rosterItems(prefix: string, lists: KeyLists): RecordItem[] {
  const at: readonly [readonly string[], string][] = [
    [lists.resultKeys, "result"],
    [lists.provenanceKeys, "result.provenance"],
    [lists.workKeys, "result.work"],
    [lists.workMetricsKeys, "result.work_metrics"],
  ];
  return at.flatMap(([keys, base]) => keys.map(key => ({ at: `${prefix}${base}.${key}`, key, value: null })));
}
function isField(key: string): boolean {
  return wordsOf(key).some(word => FIELD_WORDS.includes(word) || (word.endsWith("s") && FIELD_WORDS.includes(word.slice(0, -1))));
}
function isAbbreviated(term: string): boolean {
  return wordsOf(term).includes(ABBREVIATION);
}
interface RecordVerdict {
  readonly vocabulary: readonly string[];
  readonly fields: readonly string[];
}
function judgeRecord(items: readonly RecordItem[]): RecordVerdict {
  return {
    // Each item is read in its one form, a key or a string value, by both vocabulary readings (wb-b4lg F1: the value side too),
    // claimed on F1's planted items only (the unplanted roster list cells: F1, NOT CLAIMED).
    vocabulary: items
      .filter(item => {
        const term = item.key ?? item.value ?? "";
        return mentions(term) || isAbbreviated(term);
      })
      .map(item => item.at),
    fields: items.filter(item => item.key !== null && isField(item.key)).map(item => item.at),
  };
}
const VARIANTS = ["clean", "flagged", "overBudget", "notObserved", "fixtureSeam"] as const;
type Variant = (typeof VARIANTS)[number];
function plantFields(object: JsonObject, path: string): void {
  object.score = LEAK_SCORE;
  object.ranking = [`${LEAK_TEXT}RANK`];
  object.embedding = [...LEAK_EMBEDDING];
  object.receipt = { id: `${LEAK_TEXT}RECEIPT-${path}`, digest: `sha256:${"9".repeat(64)}` };
}
function carriesPlants(object: JsonObject): boolean {
  const receipt = object.receipt;
  return (
    object.score === LEAK_SCORE &&
    isDeepStrictEqual(object.ranking, [`${LEAK_TEXT}RANK`]) &&
    isDeepStrictEqual(object.embedding, [...LEAK_EMBEDDING]) &&
    isObject(receipt) &&
    typeof receipt.id === "string" &&
    receipt.id.startsWith(`${LEAK_TEXT}RECEIPT`)
  );
}
interface ReadLog {
  live: boolean;
  readonly read: Set<string>;
  readonly wrapped: WeakMap<object, JsonValue>;
}
function logged(value: JsonValue, path: string, log: ReadLog): JsonValue {
  if (value === null || typeof value !== "object") return value;
  const held = log.wrapped.get(value);
  if (held !== undefined) return held;
  const planted = isObject(value) && carriesPlants(value as JsonObject);
  const note = (): void => {
    if (log.live && planted) log.read.add(path);
  };
  const proxy: JsonValue = new Proxy(value, {
    get(target, key, receiver) {
      note();
      const inner: unknown = Reflect.get(target, key, receiver);
      const own = typeof key === "string" ? Object.getOwnPropertyDescriptor(target, key) : undefined;
      if (typeof key !== "string" || own === undefined || (own.configurable === false && own.writable === false)) return inner;
      return logged(inner as JsonValue, Array.isArray(target) ? `${path}[${key}]` : `${path}.${key}`, log);
    },
    has(target, key) {
      note();
      return Reflect.has(target, key);
    },
    ownKeys(target) {
      note();
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(target, key) {
      note();
      return Reflect.getOwnPropertyDescriptor(target, key);
    },
  });
  log.wrapped.set(value, proxy);
  return proxy;
}
interface PlantedRun {
  readonly output: JsonValue;
  readonly planted: readonly string[];
  readonly read: readonly string[];
  readonly presence: JsonValue;
}
interface ReaderOutputs {
  readonly topology: JsonValue;
  readonly evidence: JsonValue;
  /** Each reader's plant-presence control, read off that reader's own envelope (wb-b4lg U2, cut #3). */
  readonly presence: Readonly<Record<ReaderKind, JsonValue>>;
}
function outputsOf(runs: Readonly<Record<ReaderKind, PlantedRun>>): ReaderOutputs {
  return { topology: runs.topology.output, evidence: runs.evidence.output, presence: { topology: runs.topology.presence, evidence: runs.evidence.presence } };
}
function compareReaders(plain: ReaderOutputs, planted: ReaderOutputs): JsonValue {
  return {
    topology: isDeepStrictEqual(planted.topology, plain.topology),
    evidence: isDeepStrictEqual(planted.evidence, plain.evidence),
    presence: Object.fromEntries(READER_KINDS.map(reader => [reader, isDeepStrictEqual(planted.presence[reader], plain.presence[reader])])),
  };
}
/** wb-v03p: Z2's compare call site, moved with its line kept verbatim (the parent's IMPL.Z2 at tip a6d757fe, line 1786, inside its
 * loop over the render variants): for each render variant, its plain outputs compared with its planted outputs by compareReaders,
 * the result kept as JSON under the variant's name. The parent builds both outputs inside that loop (readersOn on the variant's
 * render, outputsOf over the variant's planted runs); here the caller hands both per variant, so a census can hand planted outputs
 * whose src slots differ from the plain ones. The object nests the line as deep as the parent's IMPL object nests Z2's loop. */
const Z2_CALL_SITE = {
  compare(outputs: (variant: Variant) => { readonly plain: ReaderOutputs; readonly planted: ReaderOutputs }): JsonObject {
    const readersUnchanged: JsonObject = {};
    for (const variant of VARIANTS) {
      const { plain, planted } = outputs(variant);
      readersUnchanged[variant] = json(compareReaders(plain, planted));
    }
    return readersUnchanged;
  },
};

export type { JsonObject, KeyLists, PlantedRun, ReaderKind, ReaderOutputs, ReadLog, RecordItem, RecordVerdict, Variant };
export {
  ABBREVIATION,
  carriesPlants,
  compareReaders,
  FIELD_WORDS,
  HEADING_PROBE,
  isAbbreviated,
  isField,
  json,
  judgeRecord,
  LEAK_EMBEDDING,
  LEAK_SCORE,
  LEAK_TEXT,
  logged,
  mentions,
  outputsOf,
  plantFields,
  READER_KINDS,
  recordItems,
  renderedHeading,
  rosterItems,
  VARIANTS,
  wordsOf,
  Z2_CALL_SITE,
};
