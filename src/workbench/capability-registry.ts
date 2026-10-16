/**
 * The trusted host boundary for deterministic workflow capabilities.
 * A descriptor is discoverable only under discovery grants; invocation always
 * checks grants again. Providers and credentials never enter the script worker.
 */
import { Check } from "typebox/value";
import { redactWorkbenchText } from "./redaction.js";

export type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

export interface CapabilityDescriptor {
  id: string;
  version: string;
  description: string;
  inputSchema: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
  effectClass: "read" | "write" | "external" | "unknown";
  permissions: readonly string[];
  supportedModes: readonly ("invoke" | "inspect" | "observe")[];
  contractSource?: string;
}

export interface InvocationContext {
  grants: readonly string[];
  signal: AbortSignal;
  invocationId?: string;
  callId?: string;
  /** Audit identity and workspace bound by the host, never by script options. */
  principal?: { readonly id: string; readonly role?: string };
  workspace?: string;
}

export interface CapabilityProvider {
  descriptor: CapabilityDescriptor;
  invoke(input: JsonValue, context: InvocationContext): Promise<JsonValue>;
  inspect?(ref: JsonValue, context: InvocationContext): Promise<JsonValue>;
}

export type CapabilityErrorCategory = "validation" | "authorization" | "unavailable" | "transport" | "uncertain-effect";

export interface CapabilityDiagnostic {
  name: "CapabilityError";
  category: CapabilityErrorCategory;
  message: string;
}

export class CapabilityError extends Error {
  constructor(
    readonly category: CapabilityErrorCategory,
    message: string,
  ) {
    super(message);
    this.name = "CapabilityError";
  }
}

const CAPABILITY_ID = /^[a-z][a-z0-9]*(?:[.-][a-z][a-z0-9]*)+$/;
export const CAPABILITY_MAX_BYTES = 256 * 1024;
export const CAPABILITY_MAX_DEPTH = 64;
export const CAPABILITY_DEADLINE_MS = 30_000;
/** One registry-wide bound on provider calls in flight, invoke and inspect alike. */
export const CAPABILITY_MAX_IN_FLIGHT = 32;

export interface CapabilityLimits {
  maxBytes?: number;
  maxDepth?: number;
  deadlineMs?: number;
  maxInFlight?: number;
}

/** Counts-only admission state for operations telemetry: no ids, provider names or payloads. */
export interface CapabilityAdmission {
  readonly maxInFlight: number;
  readonly inFlight: number;
  readonly peakInFlight: number;
  readonly admitted: number;
  readonly refused: number;
  readonly cancelledWhileQueued: number;
}
const SCHEMA_TYPES = new Set(["object", "array", "string", "number", "integer", "boolean", "null"]);
const SCHEMA_ANNOTATIONS = new Set(["title", "description", "$comment", "default", "examples", "deprecated", "readOnly", "writeOnly"]);
const SCHEMA_COUNTS = new Set(["minLength", "maxLength", "minItems", "maxItems", "minProperties", "maxProperties", "minContains", "maxContains"]);
const SCHEMA_NUMBERS = new Set(["minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum", "multipleOf"]);
const SCHEMA_MAPS = new Set(["properties", "patternProperties", "dependentSchemas"]);
const SCHEMA_CHILDREN = new Set(["items", "additionalProperties", "contains", "propertyNames", "not", "if", "then", "else", "unevaluatedProperties", "unevaluatedItems"]);
const SCHEMA_COMBINATORS = new Set(["allOf", "anyOf", "oneOf", "prefixItems"]);

/** Validate every keyword before Check(): the validator ignores malformed/unknown keywords. */
function assertSupportedSchema(schema: unknown, path: string): void {
  if (typeof schema === "boolean") return;
  if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
    throw new CapabilityError("validation", `Invalid capability schema at ${path}.`);
  }
  const shape = schema as Record<string, unknown>;
  function fail(keyword: string): never { throw new CapabilityError("validation", `Invalid or unsupported capability schema keyword ${path}.${keyword}.`); }
  function required(value: unknown, keyword: string): void {
    if (!Array.isArray(value) || value.some(item => typeof item !== "string") || new Set(value).size !== value.length) fail(keyword);
  }
  for (const [keyword, value] of Object.entries(shape)) {
    if (keyword === "type") {
      if (typeof value !== "string" || !SCHEMA_TYPES.has(value)) fail(keyword);
    } else if (SCHEMA_COUNTS.has(keyword)) {
      if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) fail(keyword);
    } else if (SCHEMA_NUMBERS.has(keyword)) {
      if (typeof value !== "number" || !Number.isFinite(value) || (keyword === "multipleOf" && value <= 0)) fail(keyword);
    } else if (keyword === "required") {
      required(value, keyword);
    } else if (keyword === "uniqueItems") {
      if (typeof value !== "boolean") fail(keyword);
    } else if (keyword === "enum") {
      if (!Array.isArray(value) || value.length === 0) fail(keyword);
      // Schema values have already passed strict JSON validation. Normalize key
      // ordering so structurally equal objects cannot appear twice in enum.
      const canonical = (item: unknown): string => {
        if (Array.isArray(item)) return `[${item.map(canonical).join(",")}]`;
        if (item !== null && typeof item === "object") return `{${Object.entries(item).sort(([a], [b]) => a.localeCompare(b)).map(([key, child]) => `${JSON.stringify(key)}:${canonical(child)}`).join(",")}}`;
        return JSON.stringify(item);
      };
      if (new Set(value.map(canonical)).size !== value.length) fail(keyword);
    } else if (keyword === "const") {
      // All JSON values are legal and have already been boundary-validated.
    } else if (keyword === "pattern") {
      if (typeof value !== "string") fail(keyword);
      try { new RegExp(value, "u"); } catch { fail(keyword); }
    } else if (SCHEMA_MAPS.has(keyword) || keyword === "dependentRequired") {
      if (!value || typeof value !== "object" || Array.isArray(value)) fail(keyword);
      for (const [name, child] of Object.entries(value)) {
        if (keyword === "patternProperties") {
          try { new RegExp(name, "u"); } catch { fail(keyword); }
        }
        if (keyword === "dependentRequired") required(child, `${keyword}.${name}`);
        else assertSupportedSchema(child, `${path}.${keyword}.${name}`);
      }
    } else if (SCHEMA_CHILDREN.has(keyword)) {
      assertSupportedSchema(value, `${path}.${keyword}`);
    } else if (SCHEMA_COMBINATORS.has(keyword)) {
      if (!Array.isArray(value) || value.length === 0) fail(keyword);
      value.forEach((child, index) => { assertSupportedSchema(child, `${path}.${keyword}[${index}]`); });
    } else if (SCHEMA_ANNOTATIONS.has(keyword)) {
      if (["title", "description", "$comment"].includes(keyword) && typeof value !== "string") fail(keyword);
      if (["deprecated", "readOnly", "writeOnly"].includes(keyword) && typeof value !== "boolean") fail(keyword);
      if (keyword === "examples" && !Array.isArray(value)) fail(keyword);
    } else {
      // References/dialects/custom formats require an explicit resolution and
      // validation contract. Never pretend an ignored keyword was enforced.
      fail(keyword);
    }
  }
}


/** Strict JSON walk checks bounds before serialization and never evaluates accessors. */
export function validatedCapabilityJson(value: unknown, path: string, maxDepth = CAPABILITY_MAX_DEPTH, maxBytes = CAPABILITY_MAX_BYTES): JsonValue {
  const seen = new Set<unknown>();
  let bytes = 0;
  function walk(current: unknown, depth: number): JsonValue {
    if (depth > maxDepth) throw new Error(`Payload exceeds maximum depth of ${maxDepth} at ${path}.`);
    if (current === null || typeof current === "boolean" || typeof current === "string" || (typeof current === "number" && Number.isFinite(current))) {
      bytes += Buffer.byteLength(JSON.stringify(current));
      if (bytes > maxBytes) throw new Error(`Payload exceeds ${maxBytes} bytes.`);
      return current as null | boolean | number | string;
    } else if (typeof current === "object") {
      if (seen.has(current)) throw new Error(`Circular JSON payload at ${path}.`);
      seen.add(current);
      const array = Array.isArray(current);
      const prototype = Object.getPrototypeOf(current);
      if (!array && prototype !== null && prototype !== Object.prototype) throw new Error(`Non-plain JSON object at ${path}.`);
      if (array && current.length > maxBytes) throw new Error(`Array exceeds payload limit at ${path}.`);
      const cloned: JsonValue[] | { [key: string]: JsonValue } = array ? [] : Object.create(null);
      const keys = Reflect.ownKeys(current);
      if (array && keys.length !== current.length + 1) throw new Error(`Sparse array or extra array properties at ${path}.`);
      bytes += 2;
      let entries = 0;
      for (const key of keys) {
        if (array && key === "length") continue;
        if (typeof key !== "string") throw new Error(`Symbol key at ${path}.`);
        if (key === "__proto__" || key === "constructor" || key === "prototype") throw new Error(`Prototype pollution key at ${path}.${key}.`);
        if (array && (!/^(0|[1-9][0-9]*)$/.test(key) || Number(key) >= current.length)) throw new Error(`Extra array property at ${path}.`);
        const property = Object.getOwnPropertyDescriptor(current, key);
        if (!property?.enumerable || !("value" in property)) throw new Error(`Accessor or hidden property at ${path}.${key}.`);
        bytes += (entries++ === 0 ? 0 : 1) + (array ? 0 : Buffer.byteLength(JSON.stringify(key)) + 1);
        const child = walk(property.value, depth + 1);
        if (Array.isArray(cloned)) cloned.push(child);
        else cloned[key] = child;
      }
      seen.delete(current);
      if (bytes > maxBytes) throw new Error(`Payload exceeds ${maxBytes} bytes.`);
      return cloned;
    } else {
      throw new Error(`Cannot pass ${typeof current} across the capability JSON boundary at ${path}.`);
    }
  }
  try {
    const cloned = walk(value, 0);
    const serialized = JSON.stringify(cloned);
    if (Buffer.byteLength(serialized) > maxBytes) throw new Error(`Payload exceeds ${maxBytes} bytes.`);
    return JSON.parse(serialized) as JsonValue;
  } catch (error) {
    throw new CapabilityError("validation", error instanceof Error ? error.message : String(error));
  }
}

/** Explicit grants are required for *both* discovery and invocation. */
export class CapabilityRegistry {
  private readonly providers = new Map<string, CapabilityProvider>();
  private readonly maxBytes: number;
  private readonly maxDepth: number;
  private readonly deadlineMs: number;
  private readonly maxInFlight: number;
  /** Requests waiting for a slot, oldest first; each starts its provider when handed one. */
  private readonly waiters = new Set<() => void>();
  private readonly counts = { inFlight: 0, peakInFlight: 0, admitted: 0, refused: 0, cancelledWhileQueued: 0 };

  constructor(limits: CapabilityLimits = {}) {
    this.maxBytes = limits.maxBytes ?? CAPABILITY_MAX_BYTES;
    this.maxDepth = limits.maxDepth ?? CAPABILITY_MAX_DEPTH;
    this.deadlineMs = limits.deadlineMs ?? CAPABILITY_DEADLINE_MS;
    this.maxInFlight = limits.maxInFlight ?? CAPABILITY_MAX_IN_FLIGHT;
    for (const [name, value] of Object.entries({ maxBytes: this.maxBytes, maxDepth: this.maxDepth, deadlineMs: this.deadlineMs, maxInFlight: this.maxInFlight })) {
      if (!Number.isSafeInteger(value) || value < 1 || (name === "deadlineMs" && value > 2_147_483_647)) {
        throw new CapabilityError("validation", `Invalid capability limit ${name}.`);
      }
    }
  }

  register(provider: CapabilityProvider): void {
    const { descriptor } = provider;
    if (!CAPABILITY_ID.test(descriptor.id) || !/^\d+\.\d+\.\d+$/.test(descriptor.version)) {
      throw new CapabilityError("validation", `Invalid capability id or version: ${descriptor.id}@${descriptor.version}.`);
    }
    if (this.providers.has(descriptor.id)) {
      throw new CapabilityError("validation", `Capability ${descriptor.id} is already registered (duplicate).`);
    }
    if (!Array.isArray(descriptor.permissions) || descriptor.permissions.some(permission =>
      typeof permission !== "string" || permission.trim() === "" || /^(discover|inspect|observe|control|reconcile):/.test(permission))) {
      throw new CapabilityError("validation", `Invalid invocation permission requirements for capability ${descriptor.id}.`);
    }
    if (descriptor.inputSchema.type !== "object") {
      throw new CapabilityError("validation", `Capability ${descriptor.id} requires an object input schema.`);
    }
    const copied: CapabilityDescriptor = {
      ...descriptor,
      inputSchema: validatedCapabilityJson(descriptor.inputSchema, `capability ${descriptor.id} inputSchema`) as Record<string, unknown>,
      ...(descriptor.outputSchema ? { outputSchema: validatedCapabilityJson(descriptor.outputSchema, `capability ${descriptor.id} outputSchema`) as Record<string, unknown> } : {}),
      permissions: Object.freeze([...descriptor.permissions]),
      supportedModes: Object.freeze([...descriptor.supportedModes]),
    };
    assertSupportedSchema(copied.inputSchema, `${descriptor.id}.input`);
    if (copied.outputSchema) assertSupportedSchema(copied.outputSchema, `${descriptor.id}.output`);
    try {
      Check(copied.inputSchema, {});
      if (copied.outputSchema) Check(copied.outputSchema, {});
    } catch (error) {
      throw new CapabilityError("validation", `Capability ${descriptor.id} has an invalid schema: ${error instanceof Error ? error.message : String(error)}`);
    }
    this.providers.set(descriptor.id, { descriptor: copied, invoke: provider.invoke.bind(provider), ...(provider.inspect ? { inspect: provider.inspect.bind(provider) } : {}) });
  }

  discover(context: Pick<InvocationContext, "grants">): CapabilityDescriptor[] {
    return [...this.providers.values()]
      .filter(({ descriptor }) => Array.isArray(context.grants) && context.grants.includes(`discover:${descriptor.id}`))
      .map(({ descriptor }) => ({
        ...descriptor,
        inputSchema: structuredClone(descriptor.inputSchema),
        ...(descriptor.outputSchema ? { outputSchema: structuredClone(descriptor.outputSchema) } : {}),
        permissions: [...descriptor.permissions],
        supportedModes: [...descriptor.supportedModes],
      }));
  }

  /**
   * A metadata-only snapshot for the read-only catalog and inspect replies: cloned descriptors plus whether the
   * provider implements `inspect`. It carries no provider function, so a caller cannot invoke or inspect through it.
   * Ungated, like effectClassOf: the reply builders apply the exact discover/inspect grants.
   */
  catalogSnapshot(): ReadonlyArray<{ readonly descriptor: CapabilityDescriptor; readonly inspectImplemented: boolean }> {
    return [...this.providers.values()].map(({ descriptor, inspect }) => ({
      descriptor: {
        ...descriptor,
        inputSchema: structuredClone(descriptor.inputSchema),
        ...(descriptor.outputSchema ? { outputSchema: structuredClone(descriptor.outputSchema) } : {}),
        permissions: [...descriptor.permissions],
        supportedModes: [...descriptor.supportedModes],
      },
      inspectImplemented: typeof inspect === "function",
    }));
  }

  /**
   * Policy metadata only: the declared effect class of a registered capability,
   * ungated — it exposes no payload, and no existence information beyond what
   * dispatch refusal text already names. The reconcile decision core uses it to
   * tell a replayable read from a refusing position.
   */
  effectClassOf(id: string): CapabilityDescriptor["effectClass"] | undefined {
    return this.providers.get(id)?.descriptor.effectClass;
  }

  /** A frozen counts-only snapshot of registry-wide admission. */
  admission(): CapabilityAdmission {
    return Object.freeze({ maxInFlight: this.maxInFlight, ...this.counts });
  }

  async invoke(id: string, input: unknown, context: InvocationContext): Promise<JsonValue> {
    return this.dispatch("invoke", id, input, context);
  }

  async inspect(id: string, ref: unknown, context: InvocationContext): Promise<JsonValue> {
    return this.dispatch("inspect", id, ref, context);
  }

  private async dispatch(mode: "invoke" | "inspect", id: string, input: unknown, context: InvocationContext): Promise<JsonValue> {
    const provider = this.providers.get(id);
    if (!provider) throw new CapabilityError("unavailable", `Unknown or unavailable capability: ${id}.`);
    const { descriptor } = provider;
    const grants = Array.isArray(context.grants) ? [...context.grants] : [];
    const permitted = mode === "inspect" ? grants.includes(`inspect:${id}`)
      : descriptor.permissions.length === 0 ? grants.includes(`invoke:${id}`)
      : descriptor.permissions.every(grant => grants.includes(grant));
    if (!permitted) throw new CapabilityError("authorization", `Permission denied for capability ${id} (${mode}).`);
    if (!descriptor.supportedModes.includes(mode) || (mode === "inspect" && !provider.inspect)) {
      throw new CapabilityError("unavailable", `Capability ${id} does not support ${mode}.`);
    }
    const value = validatedCapabilityJson(input, `${mode}(${id}) input`, this.maxDepth, this.maxBytes);
    if (mode === "invoke" && !Check(descriptor.inputSchema, value)) {
      throw new CapabilityError("validation", `Invalid input schema for capability ${id}.`);
    }
    if (context.signal.aborted) throw new CapabilityError("transport", `Capability ${id} was cancelled before invocation.`);
    const controller = new AbortController();
    const pinnedContext: InvocationContext = {
      ...context, grants: Object.freeze(grants), signal: controller.signal,
      ...(context.principal ? { principal: Object.freeze({ ...context.principal }) } : {}),
    };
    const effectful = mode === "invoke" && descriptor.effectClass !== "read";
    let timer: ReturnType<typeof setTimeout> | undefined;
    let abort: () => void = () => {};
    // Set while this request waits for admission: until a slot starts it, no provider was called.
    let queued: (() => void) | undefined;
    let started = false;
    try {
      // One deadline and one caller signal bound the admission wait and the provider wait alike.
      const interrupted = new Promise<never>((_resolve, reject) => {
        abort = () => {
          if (queued !== undefined && this.waiters.delete(queued)) {
            this.counts.cancelledWhileQueued++;
            reject(new CapabilityError("transport", `Capability ${id} was cancelled while waiting for admission.`));
            return;
          }
          controller.abort(); reject(new CapabilityError("transport", `Capability ${id} wait was cancelled.`));
        };
        context.signal.addEventListener("abort", abort, { once: true });
        timer = setTimeout(() => {
          if (queued !== undefined && this.waiters.delete(queued)) {
            this.counts.refused++;
            reject(new CapabilityError("unavailable", `Capability ${id} admission exhausted: ${this.maxInFlight} in flight after ${this.deadlineMs}ms.`));
            return;
          }
          controller.abort();
          reject(new CapabilityError("transport", `Capability ${id} exceeded its deadline of ${this.deadlineMs}ms.`));
        }, this.deadlineMs);
      });
      // The provider starts once. Timing out stops the wait, not proof of rollback.
      const admission = this.admit(() => {
        started = true;
        return mode === "invoke" ? provider.invoke(value, pinnedContext) : provider.inspect!(value, pinnedContext);
      });
      queued = admission.queued;
      const output = await Promise.race([admission.call, interrupted]);
      if (controller.signal.aborted) throw new CapabilityError("transport", `Capability ${id} wait was cancelled.`);
      const result = validatedCapabilityJson(output, `${mode}(${id}) output`, this.maxDepth, this.maxBytes);
      if (mode === "invoke" && descriptor.outputSchema && !Check(descriptor.outputSchema, result)) {
        throw new CapabilityError("validation", `Invalid output schema for capability ${id}.`);
      }
      return result;
    } catch (error) {
      const detail = redactWorkbenchText(error instanceof Error ? error.message : String(error));
      // Refused or cancelled while queued, the provider never ran: no effect to be uncertain about.
      if (effectful && started) throw new CapabilityError("uncertain-effect", `Capability ${id} has an uncertain external effect: ${detail}. Reconcile with the producer before retrying.`);
      if (error instanceof CapabilityError) throw new CapabilityError(error.category, detail);
      throw new CapabilityError("transport", `Capability ${id} failed: ${detail}`);
    } finally {
      clearTimeout(timer);
      context.signal.removeEventListener("abort", abort);
    }
  }

  /**
   * Starts a provider call under one in-flight slot, or queues it FIFO while the
   * bound is saturated. The slot is held until the provider's promise settles,
   * not until its caller is answered, so a hung provider stays counted.
   */
  private admit(start: () => Promise<JsonValue>): { call: Promise<JsonValue>; queued?: () => void } {
    const run = (): Promise<JsonValue> => {
      this.counts.admitted++;
      let call: Promise<JsonValue>;
      try {
        call = Promise.resolve(start());
      } catch (error) {
        call = Promise.reject(error);
      }
      call.then(() => this.release(), () => this.release());
      return call;
    };
    if (this.waiters.size === 0 && this.counts.inFlight < this.maxInFlight) {
      this.counts.inFlight++;
      this.counts.peakInFlight = Math.max(this.counts.peakInFlight, this.counts.inFlight);
      return { call: run() };
    }
    let handOver: (call: Promise<JsonValue>) => void = () => {};
    const call = new Promise<JsonValue>(resolve => { handOver = resolve; });
    const queued = (): void => { handOver(run()); };
    this.waiters.add(queued);
    return { call, queued };
  }

  /** A settled provider's slot passes to the oldest waiter, or frees. */
  private release(): void {
    const [next] = this.waiters;
    if (next === undefined) {
      this.counts.inFlight--;
      return;
    }
    this.waiters.delete(next);
    next();
  }
}
