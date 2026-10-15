/** Bounded diagnostic hygiene, not a claim of universal secret detection. */
export function redactWorkbenchText(value: string): string {
  const redacted = value
    .replace(/\b(?:Bearer|Basic)\s+[^\s,;"']+/gi, "[REDACTED]")
    .replace(/\b(?:sk-ant-|sk-proj-|ghp_|github_pat_)[a-zA-Z0-9_-]+/g, "[REDACTED]")
    .replace(/((?:api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret|aws_secret_access_key|aws_session_token)["']?\s*[=:]\s*)(?:"[^"\n]*"|'[^'\n]*'|[^\s,;]+)/gi, "$1[REDACTED]");
  return redacted.length > 2000 ? `${redacted.slice(0, 1980)} [truncated]` : redacted;
}
