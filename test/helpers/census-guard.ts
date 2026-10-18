/**
 * wb-u62 respin-5: the census guard - the runtime half of the roster rows options.inherited and context.inherited
 * (test/helpers/census.ts). A tier a census judges loads this module as its FIRST setup file; the census vouches for
 * that statically from the tier's config (the first setup file's sha256 is CENSUS_GUARD_SHA256, with
 * sequence.setupFiles "list" when there is more than one) and never by executing anything.
 *
 * Why: vitest 4.1.10's task() builds each registration's options as a fresh object literal and reads two of them
 * through the prototype chain - fails (the inversion) and fixtures (the registry whose auto fixtures run with the
 * case's context) - so either key placed on Object.prototype by code a census does not read (a package, a setup file,
 * a relative module that never touches vitest) reaches every case that does not set it itself: a failing case is
 * reported passed (u62 gate-3 r4 P1-P7; respin-5 F1, both modes). This module puts a non-configurable accessor for
 * each key on the realm's Object.prototype before any test module loads: reading the key through the chain yields
 * undefined, assigning it to an ordinary object still defines that object's OWN property (so obj.fails = x keeps its
 * meaning), and any later attempt to place it on Object.prototype itself throws at collection, so the runner reports
 * the file failed instead of inverted. Object.prototype already carrying either key when this runs - code that ran
 * before the guard - is refused the same way. Any other key stays free to come and go (measured: Object.prototype
 * made non-extensible instead breaks six existing cases that add and remove a key of their own).
 */

const GUARDED = ["fails", "fixtures"] as const;
/** Marks this module's own getters, so a realm that loads it again (isolate: false) recognises the guard already there. */
const MARK = Symbol.for("wb-u62.census-guard");
const prototypeOfObjects: object = Object.getPrototypeOf({});

/** The guarded key's setter: an ordinary receiver gets its own data property; Object.prototype itself is refused. */
function ownOnly(key: string): (this: unknown, value: unknown) => void {
  return function (this: unknown, value: unknown): void {
    if (this === prototypeOfObjects) throw new TypeError(`census guard: Object.prototype.${key} is refused - an inherited ${key} would reach every vitest registration`);
    if ((typeof this !== "object" && typeof this !== "function") || this === null) throw new TypeError(`census guard: cannot create the property ${key} on ${String(this)}`);
    Object.defineProperty(this, key, { value, writable: true, enumerable: true, configurable: true });
  };
}

for (const key of GUARDED) {
  const present = Object.getOwnPropertyDescriptor(prototypeOfObjects, key);
  if (present !== undefined) {
    const getter = present.get;
    if (present.configurable === false && getter !== undefined && Object.getOwnPropertyDescriptor(getter, MARK)?.value === true) continue;
    throw new TypeError(`census guard: Object.prototype already carries ${key} before the guard ran, so every vitest registration would inherit it`);
  }
  const get = (): undefined => undefined;
  Object.defineProperty(get, MARK, { value: true });
  Object.defineProperty(prototypeOfObjects, key, { configurable: false, enumerable: false, get, set: ownOnly(key) });
}

export {};
