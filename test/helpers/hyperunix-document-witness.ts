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
 * behind its twin's test at the site the change edits. What a census holds this module to is the readings
 * test/workbench-hyperunix-document-witness-census.test.ts pins; each comment below names the census cases that pin its words,
 * and a reading no case pins is NOT CLAIMED there; the census pins its W3 and W7 rows as its table literals spell them and its
 * cases run them (its header's SCOPE, wb-byfw cut #4), so a row changed at run time is NOT CLAIMED there or here. Test-only: no
 * src, docs or receipt is read or written here.
 */
import { types } from "node:util";

/** The representation the walk looks for, as the census spells it. */
const REPRESENTATION = "hyperunix.result/1";

/** The gate's refusal #2 walk changes, each at one site of the census's walk; the census's W3 rows, as its table literal spells
 * them, pin each one at the forms their ids name, and a form no row plants is NOT CLAIMED here: TV1 also reads the data values of
 * a namespace's own enumerable symbol-keyed bindings; TV2 reads the data values of its own string-keyed bindings
 * (Object.getOwnPropertyNames, non-enumerable ones too); TV3 also walks the own enumerable string-keyed data properties
 * (Object.keys) of a walked value's prototype when that prototype is a record other than Object.prototype; TV4 enters a function
 * as an object and walks its own enumerable string-keyed data properties (Object.keys); TV5 carries the path of a Uint8Array (a
 * Buffer is one) whose UTF-8 text includes the representation; TV6 reads a namespace's enumerable string-keyed bindings through
 * Reflect.get, which runs an accessor binding's getter. */
export type Twin = "TV1" | "TV2" | "TV3" | "TV4" | "TV5" | "TV6";
export const TWINS: readonly Twin[] = ["TV1", "TV2", "TV3", "TV4", "TV5", "TV6"];

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> => typeof value === "object" && value !== null && !Array.isArray(value);
/** A data property's value, or nothing for an accessor property or an absent key. */
function dataValue(holder: object, key: string): readonly unknown[] {
  const property = Object.getOwnPropertyDescriptor(holder, key);
  return property !== undefined && "value" in property ? [property.value] : [];
}
/** A value that is neither an object nor a function (String() of it runs no code a release defines). */
const isPrimitive = (value: unknown): boolean => value === null || (typeof value !== "object" && typeof value !== "function");
/** The census's carriers: the paths from a value to a string that includes the representation. A string carries it when it
 * includes it; an object's or an array's own enumerable string-keyed data properties are walked, and the enumerable string-keyed
 * accessor property below the top level that W3 plants is read by no walk; a function a W3 or W7 row plants is entered by TV4
 * only. Where a census W7 row plants a Proxy (the Proxy and the position its id names), the walks its throwBy names throw an
 * error saying it is a Proxy and the walks its readBy names read the planted document through it; how carriers reads a Proxy no
 * W7 row plants is NOT CLAIMED by the census. TV5's and TV3's additions apply at the top level and below it at the forms W3
 * plants. How carriers reads any other value form is NOT CLAIMED by the census. */
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
/** The binding names a walk lists in a namespace: Object.keys (its own enumerable string keys); TV1 adds its own enumerable symbol
 * keys (W3 pins one, and the second of two), and TV2 lists Object.getOwnPropertyNames instead (W3). */
function bindingNames(namespace: object, twin: Twin | undefined): (string | symbol)[] {
  if (twin === "TV1") return [...Object.keys(namespace), ...Object.getOwnPropertySymbols(namespace).filter((symbol) => Object.getOwnPropertyDescriptor(namespace, symbol)?.enumerable === true)];
  if (twin === "TV2") return Object.getOwnPropertyNames(namespace);
  return Object.keys(namespace);
}
/** A listed binding's value as a walk reads it: a data binding's value, nothing for an accessor binding, or with TV6 Reflect.get's,
 * which runs an accessor binding's getter (W3). */
function bindingValues(namespace: object, name: string | symbol, twin: Twin | undefined): readonly unknown[] {
  if (twin === "TV6") return [Reflect.get(namespace, name)];
  const property = Object.getOwnPropertyDescriptor(namespace, name);
  return property !== undefined && "value" in property ? [property.value] : [];
}
/** The census's exportedCarriers with one walk change at most: the exported binding paths (subpath:name, then .key per step)
 * that reach a string including the representation, in sorted order (the census's W0-W4, W6 and W7 pin these readings). */
export function twinWalk(modules: Readonly<Record<string, object>>, twin?: Twin): string[] {
  return Object.entries(modules)
    .flatMap(([subpath, namespace]) =>
      bindingNames(namespace, twin).flatMap((name) => bindingValues(namespace, name, twin).flatMap((value) => carriers(value, `${subpath}:${String(name)}`, new Set(), twin))),
    )
    .sort();
}
