import { createHash } from "node:crypto";

/** A JSON value as `canonicalJson` understands it. */
export type JsonValue = null | boolean | number | string | readonly JsonValue[] | { readonly [key: string]: JsonValue };

function canonical(value: unknown): JsonValue {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError(`CANONICAL_JSON_UNSUPPORTED_VALUE: number ${String(value)}`);
    return value;
  }
  if (value === null || typeof value === "boolean" || typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(canonical);
  if (typeof value === "object") {
    const prototype: unknown = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      const name = (prototype as { constructor?: { name?: unknown } }).constructor?.name;
      throw new TypeError(`CANONICAL_JSON_UNSUPPORTED_VALUE: object ${typeof name === "string" && name !== "" ? name : "non-plain"}`);
    }
    // Members are defined, never assigned: JSON.parse makes "__proto__" an ordinary own data member, and `out[key] = ...`
    // would run the Object.prototype setter and silently drop it, so two JSON texts differing only by that member would
    // share a digest while mw_canonical.py (which keeps every key) hashed them apart. The output stays a plain object.
    const out: Record<string, JsonValue> = {};
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      const member = (value as Record<string, unknown>)[key];
      if (member !== undefined) Object.defineProperty(out, key, { value: canonical(member), enumerable: true, writable: true, configurable: true });
    }
    return out;
  }
  throw new TypeError(`CANONICAL_JSON_UNSUPPORTED_VALUE: ${typeof value}`);
}

/** JSON with object keys sorted at every depth and `undefined` members dropped: one byte sequence per value. Refuses NaN, infinities and non-plain objects (Date, Map, Set, class instances) rather than collapsing them. */
export function canonicalJson(value: unknown): string {
  return JSON.stringify(canonical(value));
}

/** `sha256:<hex>` over the canonical JSON bytes; equal values give equal digests whatever their key order. */
export function digest(value: unknown): string {
  return "sha256:" + createHash("sha256").update(canonicalJson(value)).digest("hex");
}
