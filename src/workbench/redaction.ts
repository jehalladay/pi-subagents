/** Bounded diagnostic hygiene, not a claim of universal secret detection. */
import type { JsonValue } from "./capability-registry.js";

export function redactWorkbenchText(value: string, maxTextLength = 2000): string {
  const redacted = value
    .replace(/\b(?:Bearer|Basic)\s+[^\s,;"']+/gi, "[REDACTED]")
    .replace(/\b(?:sk-ant-|sk-proj-|ghp_|github_pat_)[a-zA-Z0-9_-]+/g, "[REDACTED]")
    .replace(/((?:api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret|aws_secret_access_key|aws_session_token)["']?\s*[=:]\s*)(?:"[^"\n]*"|'[^'\n]*'|[^\s,;]+)/gi, "$1[REDACTED]");
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
 * Zero-width space, non-joiner, joiner, word joiner and BOM. Invisible and
 * carry no separation, so they are always removed rather than replaced: a
 * visible replacement would split a credential the redaction pass must see whole.
 */
const ZERO_WIDTH = /[\u200b-\u200d\u2060\ufeff]/g;

/**
 * Remove terminal escapes, control characters and bidi marks from untrusted
 * text. The one place that regex lives: the model-facing JSON sanitizer, the
 * terminal card and the observation projection all strip the same set.
 */
export function stripUnsafeText(value: string, replacement = ""): string {
  return value.replace(TERMINAL_SEQUENCES, replacement).replace(UNSAFE_TEXT, replacement).replace(ZERO_WIDTH, "");
}

function redactionCount(value: string): number {
  return value.split("[REDACTED]").length - 1;
}

/**
 * Strip first, then redact, so a credential interrupted by an escape sequence,
 * control character or zero-width character is recognized whole. Control
 * characters become `replacement` for layout, but when only the collapsed form
 * exposes a credential (an interrupter inside the secret) the collapsed,
 * redacted form wins: privacy over layout.
 */
export function redactStrippedText(value: string, replacement = "", maxTextLength = 2000): string {
  const spaced = redactWorkbenchText(stripUnsafeText(value, replacement), maxTextLength);
  if (replacement === "") return spaced;
  const collapsed = redactWorkbenchText(stripUnsafeText(value, ""), maxTextLength);
  return redactionCount(collapsed) > redactionCount(spaced) ? collapsed : spaced;
}

/** Author- or producer-controlled text bound for model display: stripped, then redacted. */
export function sanitizeWorkbenchText(value: string, maxTextLength = 2000): string {
  return redactStrippedText(value, "", maxTextLength);
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
