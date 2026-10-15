/** Bounded diagnostic hygiene, not a claim of universal secret detection. */
import type { JsonValue } from "./capability-registry.js";

export function redactWorkbenchText(value: string, maxTextLength = 2000): string {
  const redacted = value
    .replace(/\b(?:Bearer|Basic)\s+[^\s,;"']+/gi, "[REDACTED]")
    .replace(/\b(?:sk-ant-|sk-proj-|ghp_|github_pat_)[a-zA-Z0-9_-]+/g, "[REDACTED]")
    .replace(/((?:api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret|aws_secret_access_key|aws_session_token)["']?\s*[=:]\s*)(?:\[REDACTED\]|"[^"\n]*"|'[^'\n]*'|[^\s,;]+)/gi, "$1[REDACTED]");
  return redacted.length > maxTextLength ? `${redacted.slice(0, Math.max(0, maxTextLength - 20))} [truncated]` : redacted;
}

/**
 * Terminated ANSI CSI and OSC sequences. An unterminated prefix is not matched
 * here; its escape byte still falls to the character strip below, so no
 * sequence survives either way.
 */
const TERMINAL_SEQUENCES = /\u001b\[[0-?]*[ -/]*[@-~]|\u001b\][^\u0007\u001b]*(?:\u0007|\u001b\\)/g;
/** C0/C1 control characters plus the Unicode bidi embedding, override and isolate marks. */
const UNSAFE_TEXT = /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g;

/**
 * Remove terminal escapes, control characters and bidi marks from untrusted
 * text. The one place that regex lives: the model-facing JSON sanitizer, the
 * terminal card and the observation projection all strip the same set.
 */
export function stripUnsafeText(value: string, replacement = ""): string {
  return value.replace(TERMINAL_SEQUENCES, replacement).replace(UNSAFE_TEXT, replacement);
}

/** Author- or producer-controlled text bound for model display: redacted, then stripped. */
export function sanitizeWorkbenchText(value: string, maxTextLength = 2000): string {
  return stripUnsafeText(redactWorkbenchText(value, maxTextLength));
}

const SECRET_FIELD = /^(?:authorization|api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret|aws_secret_access_key|aws_session_token)$/i;

/** All strings (including keys) are data, sanitized for bounded model display. */
export function sanitizeWorkbenchJson(value: JsonValue, maxTextLength = 2000): JsonValue {
  if (typeof value === "string") return sanitizeWorkbenchText(value, maxTextLength);
  if (Array.isArray(value)) return value.map(child => sanitizeWorkbenchJson(child, maxTextLength));
  if (value && typeof value === "object") {
    const result: Record<string, JsonValue> = Object.create(null);
    for (const [key, child] of Object.entries(value)) {
      // Native secret fields require redaction even when their value alone has
      // no recognizable credential prefix (e.g. { password: "opaque" }).
      result[sanitizeWorkbenchText(key, maxTextLength)] = SECRET_FIELD.test(key) ? "[REDACTED]" : sanitizeWorkbenchJson(child, maxTextLength);
    }
    return result;
  }
  return value;
}

/**
 * Serialize a tool result for the model after sanitizing every string in it.
 * The JSON round trip drops `undefined` members and class identity so the
 * sanitizer only ever sees plain JSON.
 */
export function sanitizeWorkbenchJsonText(value: unknown, maxTextLength = 2000): string {
  return JSON.stringify(sanitizeWorkbenchJson(JSON.parse(JSON.stringify(value ?? null)) as JsonValue, maxTextLength));
}
