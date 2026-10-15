/**
 * W22 (wb-cax.1): integrity validator for the docs/workbench/TRACEABILITY.md status ledger.
 *
 * Pure node: no src/ or dist/ import. Exports a parser and a validator and doubles as a CLI that prints a
 * `workbench.status-ledger/v1` receipt. Integrity findings are always enforced; status-vocabulary findings are
 * reported and only fail the run under --strict.
 *
 *   node qa/workbench/status-ledger.mjs [--strict] [--doc docs/workbench/TRACEABILITY.md]
 *
 * Exit 0: integrity empty (and, under --strict, vocabulary empty). Exit 1: findings. Exit 2: header mismatch
 * or an unreadable document.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const CONTRACT = 'workbench.status-ledger/v1';
export const EXPECTED_HEADER = Object.freeze(['ID', 'Priority', 'Requirement', 'Implementation evidence', 'L1 shell', 'L2 client', 'L3 integration', 'L4 unit/fault', 'Live/native evidence', 'Status']);
/** docs/workbench/02 NFR-08 and IMPLEMENTATION_GUIDE rule 10 words, plus the literals already in the ledger. */
export const ALLOWED_STATUSES = Object.freeze(['shipped', 'experimental', 'planned', 'blocked', 'fixture', 'gate-pass', 'live-sdk', 'source-retained']);
export const DEFAULT_DOC = 'docs/workbench/TRACEABILITY.md';
const PRIORITIES = new Set(['P0', 'P1', 'P2']);
const EVIDENCE_START = 3;
const EVIDENCE_END = 9; // exclusive; the Status cell follows
const EXPECTED_IDS = Array.from({ length: 50 }, (_, i) => `WB-${String(i + 1).padStart(3, '0')}`);
const PATH_RE = /(?<![A-Za-z0-9_./@-])((?:(?:src|test|qa|docs|examples|vendor)\/[A-Za-z0-9_.@/-]+)|package\.json|forge\.toml|LICENSE)(?::(\d+)(?:-(\d+))?)?/g;
const CMD_RE = /\bcmd_[A-Za-z0-9_]*/g;

function splitRow(line) {
  const trimmed = line.trim();
  const body = trimmed.slice(trimmed.startsWith('|') ? 1 : 0, trimmed.endsWith('|') ? -1 : undefined);
  return body.split('|').map((cell) => cell.trim());
}

/** Parses the first markdown table whose first header cell is `ID`. */
export function parseLedger(markdown) {
  const lines = markdown.split('\n');
  const cmdSites = [];
  const headerAt = lines.findIndex((line) => /^\|\s*ID\s*\|/.test(line));
  const header = headerAt < 0 ? [] : splitRow(lines[headerAt]);
  const rows = [];
  let tableEnd = headerAt;
  if (headerAt >= 0) {
    let at = headerAt + 1;
    if (at < lines.length && /^\|[\s:|-]+\|?\s*$/.test(lines[at])) at += 1;
    for (; at < lines.length && lines[at].trim().startsWith('|'); at += 1) {
      const cells = splitRow(lines[at]);
      rows.push({ line: at + 1, id: cells[0] ?? '', priority: cells[1] ?? '', evidence: cells.slice(EVIDENCE_START, EVIDENCE_END), status: cells.length === EXPECTED_HEADER.length ? cells[EXPECTED_HEADER.length - 1] : (cells[cells.length - 1] ?? ''), cells });
    }
    tableEnd = at;
  }
  lines.forEach((line, index) => {
    const inTable = headerAt >= 0 && index >= headerAt && index < tableEnd;
    const owner = inTable ? rows.find((r) => r.line === index + 1) : undefined;
    for (const match of line.matchAll(CMD_RE)) cmdSites.push({ token: match[0], row: owner?.id });
  });
  return { header, rows, cmdTokens: cmdSites.map((s) => s.token), cmdSites };
}

function citedPaths(cell) {
  const found = [];
  for (const match of cell.matchAll(PATH_RE)) {
    const path = match[1].replace(/\.+$/, '');
    if (path.length === 0) continue;
    found.push({ path, line: match[2] === undefined ? undefined : Number(match[2]), lineEnd: match[3] === undefined ? undefined : Number(match[3]) });
  }
  return found;
}

function lineCount(text) {
  const parts = text.split('\n');
  if (parts[parts.length - 1] === '') parts.pop();
  return parts.length;
}

function checkPath(cite, root) {
  const absolute = resolve(root, cite.path);
  const rel = relative(resolve(root), absolute);
  if (rel.startsWith('..') || isAbsolute(rel)) return { rule: 'missing-path', detail: `${cite.path} escapes the root` };
  let stat;
  try {
    stat = statSync(absolute);
  } catch {
    return { rule: 'missing-path', detail: `${cite.path} does not exist` };
  }
  if (cite.line === undefined || stat.isDirectory()) return undefined;
  const last = Math.max(cite.line, cite.lineEnd ?? cite.line);
  const count = lineCount(readFileSync(absolute, 'utf8'));
  if (cite.line < 1 || last > count) return { rule: 'line-out-of-range', detail: `${cite.path}:${cite.line}${cite.lineEnd === undefined ? '' : `-${cite.lineEnd}`} is outside 1..${count}` };
  return undefined;
}

export function validateLedger(parsed, { root, allowedStatuses = ALLOWED_STATUSES }) {
  const integrity = [];
  const vocabulary = [];
  const add = (rule, detail, row) => integrity.push(row === undefined ? { rule, detail } : { rule, row, detail });
  if (parsed.header.length !== EXPECTED_HEADER.length || parsed.header.some((cell, i) => cell !== EXPECTED_HEADER[i])) {
    add('header', `expected "${EXPECTED_HEADER.join(' | ')}" but found "${parsed.header.join(' | ')}"`);
  }
  const seen = new Set();
  for (const row of parsed.rows) {
    const label = row.id || `line ${row.line}`;
    if (!/^WB-\d{3}$/.test(row.id)) add('id-format', `${JSON.stringify(row.id)} is not WB-NNN`, label);
    else if (seen.has(row.id)) add('id-duplicate', `${row.id} appears more than once`, row.id);
    else seen.add(row.id);
    if (row.cells.length !== EXPECTED_HEADER.length) {
      add('row-shape', `${row.cells.length} cells, expected ${EXPECTED_HEADER.length}`, label);
      continue;
    }
    if (!PRIORITIES.has(row.priority)) add('priority', `${JSON.stringify(row.priority)} is not P0|P1|P2`, label);
    const planned = row.status === 'planned';
    const citesAny = row.evidence.some((cell) => citedPaths(cell).length > 0 || cell.match(CMD_RE) !== null);
    if (planned) {
      const filled = row.evidence.filter((cell) => cell !== '—').length;
      if (filled > 0) add('planned-with-evidence', `planned row has ${filled} evidence cell(s) other than "—"`, label);
    } else if (!citesAny) {
      add('no-evidence', `${row.status || '(empty status)'} row cites no path or receipt`, label);
    }
    for (const cell of row.evidence) {
      for (const cite of citedPaths(cell)) {
        const finding = checkPath(cite, root);
        if (finding) add(finding.rule, finding.detail, label);
      }
    }
    if (!allowedStatuses.includes(row.status)) vocabulary.push({ rule: 'status-vocabulary', row: label, detail: `status ${JSON.stringify(row.status)} is not in [${allowedStatuses.join(', ')}]` });
  }
  const missing = EXPECTED_IDS.filter((id) => !seen.has(id));
  const unexpected = [...seen].filter((id) => !EXPECTED_IDS.includes(id));
  if (missing.length > 0 || unexpected.length > 0) {
    add('id-coverage', `missing: ${missing.length === 0 ? 'none' : missing.join(', ')}; outside WB-001..WB-050: ${unexpected.length === 0 ? 'none' : unexpected.join(', ')}`);
  }
  for (const site of parsed.cmdSites ?? parsed.cmdTokens.map((token) => ({ token }))) {
    if (!/^cmd_[0-9a-f]{12}$/.test(site.token)) add('receipt-format', `${site.token} is not cmd_ plus 12 lowercase hex digits`, site.row);
  }
  return { integrity, vocabulary };
}

function revisionOf(root) {
  const run = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' });
  const out = run.status === 0 ? String(run.stdout).trim() : '';
  return /^[0-9a-f]{7,64}$/.test(out) ? out : 'working-tree';
}

export function runCli(argv, env, root) {
  const strict = argv.includes('--strict');
  const docAt = argv.indexOf('--doc');
  const docPath = docAt >= 0 && argv[docAt + 1] ? argv[docAt + 1] : DEFAULT_DOC;
  let markdown;
  try {
    markdown = readFileSync(resolve(root, docPath), 'utf8');
  } catch (error) {
    process.stderr.write(`status-ledger: cannot read ${docPath}: ${error instanceof Error ? error.message : String(error)}\n`);
    return 2;
  }
  const parsed = parseLedger(markdown);
  const { integrity, vocabulary } = validateLedger(parsed, { root, allowedStatuses: ALLOWED_STATUSES });
  const statusCounts = {};
  for (const row of parsed.rows) statusCounts[row.status] = (statusCounts[row.status] ?? 0) + 1;
  const headerBad = integrity.some((finding) => finding.rule === 'header');
  const code = headerBad ? 2 : integrity.length > 0 || (strict && vocabulary.length > 0) ? 1 : 0;
  const receipt = { contract: CONTRACT, utc: new Date().toISOString(), revision: revisionOf(root), rows: parsed.rows.length, statusCounts, integrity, vocabulary, strict, pass: code === 0 };
  const text = `${JSON.stringify(receipt, null, 2)}\n`;
  process.stdout.write(text);
  if (env.W22_LEDGER_RECEIPT) writeFileSync(env.W22_LEDGER_RECEIPT, text);
  return code;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = runCli(process.argv.slice(2), process.env, join(dirname(fileURLToPath(import.meta.url)), '..', '..'));
}
