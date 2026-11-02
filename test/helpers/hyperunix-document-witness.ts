/**
 * wb-byfw: the DOCUMENT WITNESS twin reader for the R-HIDDEN plant of the HyperUnix result-corpus census
 * (test/workbench-hyperunix-result-corpus-census.test.ts). wb-ulnv's cuts #3 and #4 (machine/flywheel/wb-ulnv tip
 * c53028b4b7d2cb828a15976fae48a5eeb7fa40ab) read the planted bindings census-side through documentChannels, whose channels read
 * more than the gate's walk changes they were named twins of: the prototype channel read any object prototype, the bytes channel
 * decoded JSON, and every channel read the plant after the census had called its functions (wb-ulnv refusals #3 and #4). Under the
 * rule-19 dependency inversion R-B313 the parent wb-ulnv is parked and waits on wb-byfw; its later re-cut can import twinWalk from
 * here.
 * Provenance: twinWalk is the census's walk (isRecord, dataValue, isPrimitive, carriers and exportedCarriers at trunk f5cb9129,
 * lines 263 and 500-535) copied with one parameter added, twin, and exportedCarriers's binding read split into bindingNames and
 * bindingValues; with no twin every twin test below is false. With a twin it carries exactly one of the gate's refusal #2 walk
 * changes (wb-ulnv refusal #2, gate-prep-15 leg2-table.json rows TV1-TOP-SYMBOL-KEYS-READ, TV2-TOP-NONENUM-READ,
 * TV3-WALK-READS-INHERITED, TV4-WALK-ENTERS-FUNCTIONS, TV5-WALK-DECODES-BYTES and TV6-TOP-ACCESSORS-READ), that change's text placed
 * behind its twin's test at the site the change edits. What a census holds this module to is its pinned readings
 * (test/workbench-hyperunix-document-witness-census.test.ts). Test-only: no src, docs or receipt is read or written here.
 */
import { types } from "node:util";

/** The representation the walk looks for, as the census spells it. */
const REPRESENTATION = "hyperunix.result/1";

/** The gate's refusal #2 walk changes, each one site of the census's walk: TV1 also reads a namespace's own enumerable
 * symbol-keyed data bindings, TV2 reads its data bindings through Object.getOwnPropertyNames (non-enumerable ones too), TV3 walks a
 * record prototype's own enumerable data properties, TV4 admits functions and walks their own enumerable data, TV5 reads a
 * Uint8Array as UTF-8 text, and TV6 reads a namespace's bindings through Reflect.get, which invokes an accessor binding. */
export type Twin = "TV1" | "TV2" | "TV3" | "TV4" | "TV5" | "TV6";
export const TWINS: readonly Twin[] = ["TV1", "TV2", "TV3", "TV4", "TV5", "TV6"];

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> => typeof value === "object" && value !== null && !Array.isArray(value);
/** A data property's value, or nothing for an accessor (never invoked) or an absent key. */
function dataValue(holder: object, key: string): readonly unknown[] {
  const property = Object.getOwnPropertyDescriptor(holder, key);
  return property !== undefined && "value" in property ? [property.value] : [];
}
/** A value that is neither an object nor a function (String() of it runs no code a release defines). */
const isPrimitive = (value: unknown): boolean => value === null || (typeof value !== "object" && typeof value !== "function");
/** The census's carriers: every path from a value to a string that spells the representation. A string carries it when it
 * includes it; an object's or an array's own enumerable string-keyed data properties are walked; a Map's keys and values are read
 * through Map.prototype.entries and a Set's members through Set.prototype.values, and the Map's or Set's own enumerable data
 * properties are walked too. An accessor is never invoked, no function is called, and a Proxy is thrown before any trap could
 * run. TV5 reads a Uint8Array's UTF-8 text, TV4 enters a function as an object, and TV3 adds a record prototype's own enumerable
 * data properties to the members walked; each at every depth. */
function carriers(value: unknown, path: string, seen: Set<object>, twin: Twin | undefined): string[] {
  if (typeof value === "string") return value.includes(REPRESENTATION) ? [path] : [];
  if (twin === "TV5" && types.isUint8Array(value)) return Buffer.from(value).toString("utf8").includes(REPRESENTATION) ? [path] : [];
  if ((typeof value !== "object" && !(twin === "TV4" && typeof value === "function")) || value === null || seen.has(value)) return [];
  if (types.isProxy(value)) throw new Error(`${path} is a Proxy, which the walk does not read`);
  seen.add(value);
  const members: (readonly [string, unknown])[] = [];
  if (types.isMap(value)) {
    const entries: (readonly [unknown, unknown])[] = [...Map.prototype.entries.call(value)];
    for (const [index, [key, member]] of entries.entries()) members.push([`<key ${index}>`, key], [isPrimitive(key) ? String(key) : `<value ${index}>`, member]);
  } else if (types.isSet(value)) {
    const items: unknown[] = [...Set.prototype.values.call(value)];
    for (const [index, member] of items.entries()) members.push([String(index), member]);
  }
  for (const key of Object.keys(value)) for (const member of dataValue(value, key)) members.push([key, member]);
  if (twin === "TV3") {
    const prototype: unknown = Object.getPrototypeOf(value);
    if (isRecord(prototype) && prototype !== Object.prototype) for (const key of Object.keys(prototype)) for (const member of dataValue(prototype, key)) members.push([key, member]);
  }
  return members.flatMap(([key, member]) => carriers(member, `${path}.${key}`, seen, twin));
}
/** The binding names the walk reads in a namespace: Object.keys, with TV1 its own enumerable symbol keys after them, with TV2
 * Object.getOwnPropertyNames. */
function bindingNames(namespace: object, twin: Twin | undefined): (string | symbol)[] {
  if (twin === "TV1") return [...Object.keys(namespace), ...Object.getOwnPropertySymbols(namespace).filter((symbol) => Object.getOwnPropertyDescriptor(namespace, symbol)?.enumerable === true)];
  if (twin === "TV2") return Object.getOwnPropertyNames(namespace);
  return Object.keys(namespace);
}
/** A binding's value as the walk reads it: a data property's value (an accessor never invoked), or with TV6 Reflect.get's. */
function bindingValues(namespace: object, name: string | symbol, twin: Twin | undefined): readonly unknown[] {
  if (twin === "TV6") return [Reflect.get(namespace, name)];
  const property = Object.getOwnPropertyDescriptor(namespace, name);
  return property !== undefined && "value" in property ? [property.value] : [];
}
/** The census's exportedCarriers with one walk change at most: every exported binding path (subpath:name, then .key per step)
 * that reaches a string spelling the representation, each binding walked from a fresh seen set, in sorted order. */
export function twinWalk(modules: Readonly<Record<string, object>>, twin?: Twin): string[] {
  return Object.entries(modules)
    .flatMap(([subpath, namespace]) =>
      bindingNames(namespace, twin).flatMap((name) => bindingValues(namespace, name, twin).flatMap((value) => carriers(value, `${subpath}:${String(name)}`, new Set(), twin))),
    )
    .sort();
}
