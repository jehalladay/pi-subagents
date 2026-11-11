import { readdirSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

// Stale present-tense claim denylist (EAT-R026, EAT-R057 phrase family; MechanicalWorkflows-t32qk; state-matrix staleness family MechanicalWorkflows-5lz6q: an undated "Not wired |" cell, "no live execution witnessed", "host not run"). The documentation set
// must not carry wording the Pi workbench interoperability audit refuted. The scan is a shrink-only ratchet: a committed
// baseline names each live site, any hit outside the baseline fails (DOC_STALE_CLAIM), and any baseline entry whose site
// no longer appears fails (DOC_STALE_BASELINE_ENTRY) so the rewriting cut deletes the entry. An empty baseline is the
// zero-hit end state. Closed literal set, closed error codes; the scan reads RAW markdown (a literal inside a fence or a
// code span still counts), ignores case, and treats a line wrap between the words of a literal as a space.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const baselinePath = resolve(dirname(fileURLToPath(import.meta.url)), "check-docs-stale-claims.baseline.json");
const LITERALS = [
  "does not currently match",
  "historical metadata",
  "historical descriptor metadata",
  "measured ingredients",
  "already measured",
  "concrete, measured",
  "actual Pi `workflow_execute` function branch",
  "actual Pi workflow_execute function branch",
  "companion lives at",
  "no live execution witnessed",
  "host not run",
  "Not wired |",
] as const;
const FRAGMENT_CONTEXT = 60;

const files: string[] = [];
for (const file of ["README.md", "AGENTS.md"]) if (existsSync(resolve(root, file))) files.push(file);
function collect(dir: string, accept: (name: string) => boolean): void {
  if (!existsSync(resolve(root, dir))) return;
  for (const item of readdirSync(resolve(root, dir), { withFileTypes: true })) {
    const path = `${dir}/${item.name}`;
    if (item.isDirectory()) collect(path, accept);
    else if (accept(item.name)) files.push(path);
  }
}
collect("docs", name => extname(name) === ".md");
collect(".agents/skills", name => basename(name) === "SKILL.md");

function loadBaseline(): string[] | undefined {
  try {
    const parsed: unknown = JSON.parse(readFileSync(baselinePath, "utf8"));
    if (Array.isArray(parsed) && parsed.every(entry => typeof entry === "string")) return parsed as string[];
  } catch { /* fall through to the closed refusal below */ }
  return undefined;
}
const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const patterns = LITERALS.map(literal => ({ literal, regex: new RegExp(literal.split(" ").map(escapeRegExp).join("\\s+"), "gi") }));

interface Hit { path: string; line: number; literal: string; entry: string }
function scan(path: string): Hit[] {
  const text = readFileSync(resolve(root, path), "utf8");
  const found: { index: number; length: number; literal: string; matched: string }[] = [];
  for (const { literal, regex } of patterns) for (const match of text.matchAll(regex)) found.push({ index: match.index ?? 0, length: match[0].length, literal, matched: match[0] });
  found.sort((a, b) => a.index - b.index || b.length - a.length);
  const hits: Hit[] = [];
  let reached = 0;
  for (const item of found) {
    if (item.index < reached) continue; // an overlapping literal reports once, at its earliest start
    reached = item.index + item.length;
    const lineStart = text.lastIndexOf("\n", item.index - 1) + 1;
    const newline = text.indexOf("\n", reached);
    const span = text.slice(lineStart, newline === -1 ? text.length : newline).replace(/\s+/g, " ");
    const before = text.slice(lineStart, item.index).replace(/\s+/g, " ").length;
    const after = before + item.matched.replace(/\s+/g, " ").length;
    const fragment = span.slice(Math.max(0, before - FRAGMENT_CONTEXT), Math.min(span.length, after + FRAGMENT_CONTEXT)).trim();
    hits.push({ path, line: text.slice(0, item.index).split("\n").length, literal: item.literal, entry: `${path}|${fragment}` });
  }
  return hits;
}

let errors = 0;
const baseline = loadBaseline();
if (baseline === undefined) {
  console.error(`DOC_STALE_BASELINE_MALFORMED: ${basename(baselinePath)} must be a JSON array of "path|fragment" strings`); errors++;
}
// Each baseline entry covers exactly one occurrence, so a repeated identical site needs a repeated entry.
const remaining = new Map<string, number>();
for (const entry of baseline ?? []) remaining.set(entry, (remaining.get(entry) ?? 0) + 1);
if (baseline !== undefined) {
  for (const path of files) {
    for (const hit of scan(path)) {
      const left = remaining.get(hit.entry) ?? 0;
      if (left > 0) { remaining.set(hit.entry, left - 1); continue; }
      console.error(`DOC_STALE_CLAIM: ${hit.path}:${hit.line} (${hit.literal})`); errors++;
    }
  }
  for (const [entry, left] of remaining) for (let i = 0; i < left; i++) { console.error(`DOC_STALE_BASELINE_ENTRY: ${entry}`); errors++; }
}
if (errors) process.exit(1);
console.log(`docs-stale-claims: pass (${files.length} markdown files, ${baseline?.length ?? 0} baselined)`);
