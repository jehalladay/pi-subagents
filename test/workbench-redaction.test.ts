/** Native diagnostic previews never carry deployment credentials into Pi. */
import { describe, expect, it } from "vitest";
import { safeWorkflowTerminalText } from "../src/ui/workflow-card.js";
import { initialWorkflowDialogState, layoutWorkflowDialog, plainWorkflowDialogLines } from "../src/ui/workflow-dialog.js";
import { redactWorkbenchText, sanitizeWorkbenchJson, sanitizeWorkbenchJsonText, sanitizeWorkbenchText, stripUnsafeText } from "../src/workbench/redaction.js";

describe("Workbench credential redaction", () => {
  it.each([
    "Authorization: Bearer sk-ant-audit-fake-secret",
    "api_key=private-deployment-value",
    'password: "sensitive value with spaces"',
    "AWS_SECRET_ACCESS_KEY=private-aws-value",
    "access_token: token-value",
    '{"api_key":"private-deployment-value"}',
    '{"aws_secret_access_key":"private-aws-value"}',
  ])("removes sensitive diagnostic %s", raw => {
    const cleaned = redactWorkbenchText(raw);
    expect(cleaned).toContain("[REDACTED]");
    expect(cleaned).not.toMatch(/fake-secret|private-deployment|sensitive value|private-aws|token-value/);
  });
  it("retains actionable nonsecret native diagnostic codes", () => {
    expect(redactWorkbenchText("RF_WORKSPACE_NOT_FOUND: no initialized workspace")).toBe("RF_WORKSPACE_NOT_FOUND: no initialized workspace");
  });
  it("caps untrusted diagnostics before UI transport", () => {
    expect(redactWorkbenchText("x".repeat(100_000)).length).toBeLessThanOrEqual(2000);
  });
});

/** Assignment keys, separators and credential heads the gate's wb-3l3 corpora cross (cmd_94143fcf4555). */
const KEYS = ["api_key", "api-key", "apikey", "access_token", "refresh_token", "password", "secret", "aws_secret_access_key", "aws_session_token"];
const SEPARATORS = ["=", ":", " = ", ": ", '":', "'="];
const PREFIX_HEADS = ["sk-ant-api03-abc", "sk-proj-abc", "ghp_abc", "github_pat_abc"];
const SCHEME_HEADS = ["Bearer abc", "Basic abc"];
const LEAK = "LEAKZ9";
const every = (shape: (key: string, separator: string) => string[]): string[] => KEYS.flatMap(key => SEPARATORS.flatMap(separator => shape(key, separator)));

/** Each unquoted value tail past a key prefix's charset, and the quote tails past a scheme token, in four wrappers: 18,144 shapes. */
const PAST_THE_TOKEN = every((key, separator) =>
  [(text: string) => text, (text: string) => `{${text}}`, (text: string) => `(${text})`, (text: string) => `x ${text} y`].flatMap(wrap => [
    ...PREFIX_HEADS.flatMap(head => [..."./+=:@#%&*!~|^$()<>?"].map(tail => wrap(`${key}${separator}${head}${tail}${LEAK}`))),
    ...SCHEME_HEADS.flatMap(head => ['"', "'"].map(tail => wrap(`${key}${separator}${head}${tail}${LEAK}`))),
  ]),
);
/** Closing brackets that are all that is left of a value, before a value end or the end of the text: 6,480 shapes. */
const BRACKET_TAILS = every((key, separator) =>
  [(text: string) => text, (text: string) => `x ${text} y`, (text: string) => `${text}, next`, (text: string) => `a; ${text}`].flatMap(wrap =>
    [...PREFIX_HEADS, ...SCHEME_HEADS].flatMap(head => ["]", "}", "]]", "}]", "]}"].map(tail => wrap(`${key}${separator}${head}${tail}`))),
  ),
);
/** Text glued to a literal marker the input already carries: 324 shapes. */
const GLUED_TO_A_MARKER = every((key, separator) => ["", ".", "}", "]", '"', "'"].map(glue => `${key}${separator}[REDACTED]${glue}${LEAK}`));
/** Assignments in every value form and every context a second pass can meet them in: 27,648 shapes. */
const SECOND_PASS = every((key, separator) =>
  [(text: string) => text, (text: string) => `{"${text}`, (text: string) => `[{"${text}`, (text: string) => `cfg ${text}`].flatMap(wrap =>
    ['"opaque"', "'opaque'", "opaque", "sk-ant-api03-abc", "Bearer abc", '"sk-ant-abc"', '"Bearer abc"', "ghp_abc.x"].flatMap(value =>
      ["", "}", "]", ")", ".", '"', "'", "}}", "})", "} end", ",x", ";x", "}.", "]}", " end", "}\n"].map(after => wrap(`${key}${separator}${value}${after}`)),
    ),
  ),
);
/** The three entry points the gate measured the leak class through, each with the text it shows for a given redaction. */
type EntryPoint = [name: string, redact: (raw: string) => string, shown: (text: string) => string];
const ENTRY_POINTS: EntryPoint[] = [
  ["redactWorkbenchText", raw => redactWorkbenchText(raw), text => text],
  ["sanitizeWorkbenchText", raw => sanitizeWorkbenchText(raw), text => text],
  ["sanitizeWorkbenchJsonText", raw => sanitizeWorkbenchJsonText({ detail: raw }), text => JSON.stringify({ detail: text })],
];
/** Whether `part` is `whole` with some characters taken out. */
const within = (part: string, whole: string): boolean => {
  let at = 0;
  for (let index = 0; index < whole.length && at < part.length; index++) if (whole[index] === part[at]) at++;
  return at === part.length;
};
const visible = (text: string): string => text.split("[REDACTED]").join("");

describe("redactWorkbenchText idempotence (wb-3l3)", () => {
  // docs/20 ruling 2: "A second pass is idempotent or over-redacts only, never a leak."
  it.each([
    '{"password":"opaque"}',
    '{"api_key":"private-deployment-value"}',
    '{"aws_secret_access_key":"private-aws-value","note":"kept"}',
    '{"a":{"secret":"x"},"b":1}',
    "{'access_token': 'token-value'}",
    "password: opaque",
    "api_key=private-deployment-value; next=1",
    "Authorization: Bearer sk-ant-audit-fake-secret",
    "RF_WORKSPACE_NOT_FOUND: no initialized workspace",
    // The value ends a kept marker stands before: whitespace, a semicolon, a closing square bracket.
    'config {"password":"x"} end',
    'cfg={"password":"x"}; next',
    '[{"password":"opaque"}]',
  ])("redact(redact(x)) equals redact(x) for %s", raw => {
    const once = redactWorkbenchText(raw);
    expect(redactWorkbenchText(once)).toBe(once);
  });
  it("keeps the closing brace of a JSON-embedded secret on the second pass", () => {
    const once = redactWorkbenchText('{"password":"opaque"}');
    expect(once).toBe('{"password":[REDACTED]}');
    expect(redactWorkbenchText(once)).toBe('{"password":[REDACTED]}');
  });
  it("still redacts a raw value that merely follows an already-redacted marker field", () => {
    expect(redactWorkbenchText('password=[REDACTED] secret=leaky')).toBe("password=[REDACTED] secret=[REDACTED]");
  });
  it("only over-redacts where a second pass still changes the text", () => {
    // The residual ruling 2 names: a marker followed by more than closing brackets and a value end is read as an unquoted
    // value again, so the second pass hides that text as well and never shows any.
    const once = redactWorkbenchText('password: "x").');
    expect(once).toBe("password: [REDACTED]).");
    expect(redactWorkbenchText(once)).toBe("password: [REDACTED]");
    expect(SECOND_PASS).toHaveLength(27_648);
    const shown = SECOND_PASS.filter(raw => {
      const first = redactWorkbenchText(raw);
      const second = redactWorkbenchText(first);
      return second.length > first.length || !within(visible(second), visible(first));
    });
    expect(shown.length, shown.slice(0, 3).join(" | ")).toBe(0);
  });
  it("reads a raw U+0001 already in the text as one of its own markers: over-redaction only", () => {
    const control = String.fromCharCode(1);
    expect(redactWorkbenchText(`a${control}b`)).toBe("a[REDACTED]b");
    // The display helper never hands the plain redactor an unsafe unit, so it still only drops the control.
    expect(sanitizeWorkbenchText(`a${control}b`)).toBe("ab");
  });
});

describe("a marker never cuts an assignment's value short (wb-3l3 leak class)", () => {
  // Gate cmd_94143fcf4555 U2 (CONFIRMED HIGH): with the marker as a bare value alternative, BEARER and PREFIXED wrote their
  // marker first and ASSIGNED took it as the whole value, so the rest of an unquoted value stayed visible.
  it.each(ENTRY_POINTS)("redacts the whole unquoted value after a key prefix through %s", (_name, redact, shown) => {
    expect(redact("api_key=sk-ant-api03-abc.LEAKZ9")).toBe(shown("api_key=[REDACTED]"));
  });
  it.each(ENTRY_POINTS)("never shows a value's closing brackets after the marker through %s", (_name, redact, shown) => {
    expect(redact("api_key=sk-ant-api03-abc]}")).toBe(shown("api_key=[REDACTED]"));
  });
  it.each(ENTRY_POINTS)("never keeps text glued to a literal marker already in the input through %s", (_name, redact, shown) => {
    expect(redact("password=[REDACTED]hunter2-LEAKZ9")).toBe(shown("password=[REDACTED]"));
  });
  it.each(ENTRY_POINTS)("holds over every generated shape of the class through %s", (_name, redact) => {
    expect(PAST_THE_TOKEN).toHaveLength(18_144);
    expect(BRACKET_TAILS).toHaveLength(6_480);
    expect(GLUED_TO_A_MARKER).toHaveLength(324);
    const tails = PAST_THE_TOKEN.filter(raw => redact(raw).includes(LEAK));
    expect(tails.length, tails.slice(0, 3).join(" | ")).toBe(0);
    const brackets = BRACKET_TAILS.filter(raw => /\[REDACTED\][\]}]/.test(redact(raw)));
    expect(brackets.length, brackets.slice(0, 3).join(" | ")).toBe(0);
    const glued = GLUED_TO_A_MARKER.filter(raw => redact(raw).includes(LEAK));
    expect(glued.length, glued.slice(0, 3).join(" | ")).toBe(0);
  });
  it("never lets the stand-in it writes for a marker reach its output", () => {
    const control = String.fromCharCode(1);
    const kept = [...PAST_THE_TOKEN, ...BRACKET_TAILS, ...SECOND_PASS].filter(raw => redactWorkbenchText(raw).includes(control));
    expect(kept.length, kept.slice(0, 3).join(" | ")).toBe(0);
  });
});

describe("native detail diagnostic hygiene", () => {
  it("does not render a producer credential in a selected error row", () => {
    const state = { ...initialWorkflowDialogState(), level: "node" as const, selectedNode: 0 };
    const layout = layoutWorkflowDialog({
      task: { status: "failed", workflowName: "secrets", startTime: 1, endTime: 2 },
      progress: [{ type: "workflow_node", index: 0, callId: 1, capabilityId: "forge.gate.status", label: "inspect", state: "error", error: "Authorization: Bearer sk-ant-audit-fake-secret" }],
      state, ascii: true, width: 100, now: 2, bodyRows: 16,
    });
    expect(plainWorkflowDialogLines(layout).join("\n")).not.toContain("sk-ant-audit-fake-secret");
  });
});

/**
 * wb-952 probe corpus: six credentials each interrupted by an invisible
 * character. Redaction must see the reassembled secret, so strip runs first.
 * `leak` is the tail fragment that must never reach any display path.
 */
const ESC = String.fromCharCode(27);
const BEL = String.fromCharCode(7);
const PROBE_CORPUS: ReadonlyArray<{ name: string; raw: string; leak: string }> = [
  { name: "anthropic key split by CSI", raw: `sk-ant-aaaa${ESC}[0mTAILONE1234`, leak: "TAILONE1234" },
  { name: "bearer token split by ZWSP", raw: "Authorization: Bearer abc\u200bdefTAILTWO99", leak: "TAILTWO99" },
  { name: "github token split by BOM", raw: "ghp_aaaa\ufeffTAILTHREE33", leak: "TAILTHREE33" },
  { name: "keyword assignment split by ZWJ in value", raw: "api_key=abcd\u200dTAILFOUR44", leak: "TAILFOUR44" },
  { name: "password split by OSC", raw: `password=abcd${ESC}]0;title${BEL}TAILFIVE555`, leak: "TAILFIVE555" },
  { name: "fine-grained pat split by word joiner", raw: "github_pat_aaaa\u2060TAILSIX6666", leak: "TAILSIX6666" },
];

describe("wb-952 sanitizer drift: split credentials", () => {
  it.each(PROBE_CORPUS)("safeWorkflowTerminalText removes $name", ({ raw, leak }) => {
    const out = safeWorkflowTerminalText(raw);
    expect(out).toContain("[REDACTED]");
    expect(out).not.toContain(leak);
  });
  it.each(PROBE_CORPUS)("sanitizeWorkbenchText removes $name", ({ raw, leak }) => {
    const out = sanitizeWorkbenchText(raw);
    expect(out).toContain("[REDACTED]");
    expect(out).not.toContain(leak);
  });
  it.each(PROBE_CORPUS)("sanitizeWorkbenchJson / JsonText remove $name", ({ raw, leak }) => {
    expect(JSON.stringify(sanitizeWorkbenchJson({ note: [raw] }))).not.toContain(leak);
    expect(sanitizeWorkbenchJsonText({ note: raw })).not.toContain(leak);
  });
  // 16:44Z separator policy: a zero-width character is a separator before any deletion, so a visible replacement is kept.
  it("stripUnsafeText maps zero-width characters to the replacement like every other unsafe unit", () => {
    expect(stripUnsafeText("a\u200bb\u200cc\u200dd\ufeffe\u2060f", " ")).toBe("a b c d e f");
    expect(stripUnsafeText("a\u200bb\u200cc\u200dd\ufeffe\u2060f")).toBe("abcdef");
  });
  it("keeps layout separators for control characters that carry no credential", () => {
    expect(safeWorkflowTerminalText("alpha\nbeta\tgamma")).toBe("alpha beta gamma");
  });
  it("does not regress the redact-after-strip order the store pipeline uses", () => {
    for (const { raw, leak } of PROBE_CORPUS) {
      expect(redactWorkbenchText(stripUnsafeText(raw))).not.toContain(leak);
    }
  });
});
