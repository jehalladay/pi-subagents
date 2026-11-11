import { existsSync, readFileSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, posix, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

// MechanicalWorkflows-loexn.3 (M00-C, EAT-R004, EAT-R034 graph half): the identifier mapping validator for the
// pi-native-interoperability-2026-11-09 program. The mapping document lists every pre-existing requirement identifier the four program
// documents reference, with a source path and a resolved status, and it records the serialization edges between the M02, M03 and M04
// packets. This check judges that document against the program documents and the tree. It is an L0 validator: a clean verdict says the
// mapping is complete and honest, never that any mapped requirement is delivered, and the CLI therefore never prints PASS.

export const PROGRAM_DIR = "docs/programs/pi-native-interoperability-2026-11-09";
export const MAPPING_DOC = `${PROGRAM_DIR}/04-IDENTIFIER-MAPPING.md`;
export const PROGRAM_DOCS = ["README.md", "01-AUDIT-AND-CONTRACT.md", "02-IMPLEMENTATION-PACKAGES.md", "03-VERIFICATION-AND-RELEASE.md"] as const;
export const ID_MAP_STATUSES = ["defined", "test-pinned", "external-unverified"] as const;
const RESOLVED_STATUSES: readonly string[] = ["defined", "test-pinned"];
const EXTERNAL_PREFIX = "pi:";
const REQUIRED_EDGES: ReadonlyArray<readonly [string, string]> = [["M03", "M02"], ["M04", "M02"]];
const FORBIDDEN_EDGE: readonly [string, string] = ["M01", "M02"];

export type IdMapCode =
  | "ID_MAP_TABLE_MISSING"
  | "ID_MAP_ROW_MALFORMED"
  | "ID_MAP_ID_UNMAPPED"
  | "ID_MAP_ID_DUPLICATE"
  | "ID_MAP_SUFFIX_COLLISION"
  | "ID_MAP_STATUS_UNKNOWN"
  | "ID_MAP_STATUS_NO_RECEIPT"
  | "ID_MAP_RECEIPT_ID_ABSENT"
  | "ID_MAP_RECEIPT_NOT_TEST"
  | "ID_MAP_RECEIPT_NOT_SOURCE"
  | "ID_MAP_RECEIPT_SELF_REFERENTIAL"
  | "ID_MAP_PATH_OUTSIDE_ROOT"
  | "ID_MAP_SOURCE_PATH_MISSING"
  | "ID_MAP_EDGE_MISSING"
  | "ID_MAP_EDGE_FORBIDDEN"
  | "ID_MAP_ROOT_MISSING";
export interface IdMapRefusal { readonly code: IdMapCode; readonly subject: string; readonly detail: string }
export interface IdMapVerdict { readonly ok: boolean; readonly refusals: readonly IdMapRefusal[] }
export interface MappingRow { id: string; family: string; source_path: string; status: string; receipt_path: string }
export interface MappingEdge { from: string; to: string; kind: string }
export interface ParsedMapping { rows: MappingRow[]; edges: MappingEdge[]; malformed: string[]; hasTable: boolean; hasEdges: boolean }
// readText returns the receipt file text, or null when the file cannot be read; exists alone cannot show that a receipt names the id.
// contained says whether a mapping path stays inside the repository root (after ../ segments and symlinks); the judge calls neither exists nor readText on a path it rejects.
export interface IdMapInput { readonly mapping: string; readonly docs: Readonly<Record<string, string>>; readonly exists: (path: string) => boolean; readonly readText: (path: string) => string | null; readonly contained: (path: string) => boolean;
  // Optional: the root-relative spelling of a mapping path with symlinks followed. When present, the self-referential receipt check also judges this form, so a committed alias of the mapping document or the validator test cannot pass the lexical comparison.
  readonly realPath?: (path: string) => string }

// Ranges expand first: "MW-R0..R8" and "MW-BM-01..05". Single ids follow the families the program documents cite.
function expandRanges(text: string): string[] {
  const ids: string[] = [];
  for (const m of text.matchAll(/\bMW-R(\d+)\.\.R(\d+)\b/g)) {
    for (let n = Number(m[1]); n <= Number(m[2]); n++) ids.push(`MW-R${n}`);
  }
  for (const m of text.matchAll(/\bMW-BM-(\d+)\.\.(\d+)\b/g)) {
    const width = m[1]!.length;
    for (let n = Number(m[1]); n <= Number(m[2]); n++) ids.push(`MW-BM-${String(n).padStart(width, "0")}`);
  }
  return ids;
}

const SINGLE_ID_PATTERNS: readonly RegExp[] = [/\bMW-R\d+\b/g, /\bMW-BM-\d+\b/g, /\bW\d+\b/g, /\bVC-\d+\b/g, /\bB-[a-z]+(?:-[a-z]+)*\b/g, /\bPI-BM\b/g];

export function extractReferencedIds(docs: Readonly<Record<string, string>>): string[] {
  const found = new Set<string>();
  for (const text of Object.values(docs)) {
    for (const id of expandRanges(text)) found.add(id);
    for (const pattern of SINGLE_ID_PATTERNS) for (const m of text.matchAll(pattern)) found.add(m[0]);
  }
  return [...found].sort();
}

function sectionLines(text: string, heading: string): string[] | null {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex(line => line.trim().toLowerCase() === `## ${heading}`.toLowerCase());
  if (start < 0) return null;
  const out: string[] = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#{1,2}\s/.test(lines[i]!)) break;
    out.push(lines[i]!);
  }
  return out;
}

function cellsOf(line: string): string[] {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(cell => cell.trim().replace(/^`(.*)`$/, "$1"));
}

// The first table line is the header and the second is the separator; every later table line is a data row.
function dataRows(section: string[]): string[][] {
  return section.filter(line => line.trim().startsWith("|")).slice(2).map(cellsOf);
}

export function parseMapping(mapping: string): ParsedMapping {
  const rows: MappingRow[] = [];
  const edges: MappingEdge[] = [];
  const malformed: string[] = [];
  const table = sectionLines(mapping, "Mapping table");
  const edgeSection = sectionLines(mapping, "Serialization edges");
  for (const cells of table === null ? [] : dataRows(table)) {
    if (cells.length !== 5) { malformed.push(cells[0] ?? "(row)"); continue; }
    const [id, family, source_path, status, receipt_path] = cells as [string, string, string, string, string];
    rows.push({ id, family, source_path, status, receipt_path });
  }
  for (const cells of edgeSection === null ? [] : dataRows(edgeSection)) {
    if (cells.length !== 3) { malformed.push(cells[0] ?? "(edge)"); continue; }
    edges.push({ from: cells[0]!.toUpperCase(), to: cells[1]!.toUpperCase(), kind: cells[2]! });
  }
  return { rows, edges, malformed, hasTable: table !== null && dataRows(table).length > 0, hasEdges: edgeSection !== null };
}

const blank = (value: string): boolean => value.trim() === "" || value.trim() === "-";
// A numeric suffix collides only inside one family: "MW-R01" and "MW-R1" share family "MW-R" and suffix 1.
function suffixKey(id: string): string | null {
  const m = /^(.*?)-?(\d+)$/.exec(id);
  return m === null ? null : `${m[1]}#${Number(m[2])}`;
}

// The repo's test shapes: *.test.ts and *.test.py files, test_*.py pytest files, any file under a directory named exactly test or tests,
// and any .ts file under the top-level qa/ tree (the node --test files such as qa/performance-native.ts live there).
const TEST_FILE = /(?:\.test\.(?:ts|py)$)|(?:(?:^|\/)test_[^/]*\.py$)|(?:(?:^|\/)tests?\/)|(?:^qa\/.+\.ts$)/;
// A resolved receipt may never be a file that names many ids by construction: the mapping document itself or this validator's own test.
const SELF_RECEIPTS: readonly string[] = [MAPPING_DOC, "scripts/check-pi-native-id-mapping.test.ts"];
// Content markers of the two self-referential files: the mapping document carries its own table heading and the validator test carries the judge entry point. A byte copy of either, committed under another path, keeps the marker.
const SELF_CONTENT_MARKERS: readonly string[] = ["## Mapping table", "judgeIdMapping"];
// A receipt that names every resolved id proves none of them once the table holds at least this many resolved ids; below it a receipt may honestly name them all, and a single-id or two-id receipt always stays admissible.
const COVERAGE_GUARD_MIN_RESOLVED = 3;
const normalPath = (path: string): string => posix.normalize(path.trim());

// True when path, resolved against root with symlinks followed, stays at or under the real root. A path that does not exist yet is judged lexically.
export function pathContainedIn(root: string, path: string): boolean {
  let realRoot: string;
  try { realRoot = realpathSync(root); } catch { return false; }
  const absolute = resolve(realRoot, path);
  let real = absolute;
  try { real = realpathSync(absolute); } catch { /* a missing path is judged by its lexical form */ }
  const rel = relative(realRoot, real);
  return rel === "" || (rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel));
}

// Root-relative posix spelling of path with symlinks followed. A path that does not exist or cannot be resolved keeps its lexical form.
export function realRelativePath(root: string, path: string): string {
  try {
    const realRoot = realpathSync(root);
    return relative(realRoot, realpathSync(resolve(realRoot, path))).split(sep).join("/");
  } catch { return normalPath(path); }
}

// The id counts only as a whole token: an id-character neighbour (letter, digit, underscore, hyphen) means a longer identifier.
function namesIdAsToken(text: string, id: string): boolean {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![A-Za-z0-9_-])${escaped}(?![A-Za-z0-9_-])`).test(text);
}

export function judgeIdMapping(input: IdMapInput): IdMapVerdict {
  const refusals: IdMapRefusal[] = [];
  const refuse = (code: IdMapCode, subject: string, detail: string): void => { refusals.push({ code, subject, detail }); };
  const parsed = parseMapping(input.mapping);
  if (!parsed.hasTable) refuse("ID_MAP_TABLE_MISSING", "mapping", 'the document has no "## Mapping table" section with data rows');
  if (!parsed.hasEdges) refuse("ID_MAP_TABLE_MISSING", "edges", 'the document has no "## Serialization edges" section');
  for (const subject of parsed.malformed) refuse("ID_MAP_ROW_MALFORMED", subject, "the row does not carry the expected number of cells");

  const seen = new Map<string, number>();
  for (const row of parsed.rows) seen.set(row.id, (seen.get(row.id) ?? 0) + 1);
  for (const [id, count] of seen) if (count > 1) refuse("ID_MAP_ID_DUPLICATE", id, `the id appears in ${count} rows; each id needs exactly one`);
  const bySuffix = new Map<string, string[]>();
  for (const id of seen.keys()) {
    const key = suffixKey(id);
    if (key !== null) bySuffix.set(key, [...(bySuffix.get(key) ?? []), id]);
  }
  for (const ids of bySuffix.values()) if (ids.length > 1) for (const id of ids) refuse("ID_MAP_SUFFIX_COLLISION", id, `the id shares its numeric suffix with ${ids.filter(other => other !== id).join(", ")} in one family`);

  if (parsed.hasTable) {
    for (const id of extractReferencedIds(input.docs)) if (!seen.has(id)) refuse("ID_MAP_ID_UNMAPPED", id, "a program document references the id and the mapping holds no row for it");
  }

  const known: readonly string[] = ID_MAP_STATUSES;
  const resolvedIds = [...new Set(parsed.rows.filter(row => RESOLVED_STATUSES.includes(row.status)).map(row => row.id))];
  for (const row of parsed.rows) {
    if (!known.includes(row.status)) {
      refuse("ID_MAP_STATUS_UNKNOWN", row.id, `status must be one of ${ID_MAP_STATUSES.join(", ")}; found ${JSON.stringify(row.status)}`);
      continue;
    }
    if (RESOLVED_STATUSES.includes(row.status)) {
      if (blank(row.source_path)) refuse("ID_MAP_SOURCE_PATH_MISSING", row.id, "an in-repo source path must exist at the pin");
      else if (!input.contained(row.source_path)) refuse("ID_MAP_PATH_OUTSIDE_ROOT", row.id, `the source path ${row.source_path} resolves outside the repository root`);
      else if (!input.exists(row.source_path)) refuse("ID_MAP_SOURCE_PATH_MISSING", row.id, "an in-repo source path must exist at the pin");
      if (blank(row.receipt_path)) refuse("ID_MAP_STATUS_NO_RECEIPT", row.id, `status "${row.status}" needs an existing in-repo receipt path`);
      else if (!input.contained(row.receipt_path)) refuse("ID_MAP_PATH_OUTSIDE_ROOT", row.id, `the receipt path ${row.receipt_path} resolves outside the repository root`);
      else {
        const receipt = normalPath(row.receipt_path);
        const resolvedReceipt = input.realPath === undefined ? receipt : normalPath(input.realPath(row.receipt_path));
        if (SELF_RECEIPTS.includes(receipt) || SELF_RECEIPTS.includes(resolvedReceipt)) refuse("ID_MAP_RECEIPT_SELF_REFERENTIAL", row.id, `the receipt ${row.receipt_path} names many ids by construction and proves none of them`);
        if (row.status === "defined" && receipt !== normalPath(row.source_path)) refuse("ID_MAP_RECEIPT_NOT_SOURCE", row.id, `status "defined" needs the receipt to be the source path ${row.source_path}; found ${row.receipt_path}`);
        if (!input.exists(row.receipt_path)) refuse("ID_MAP_STATUS_NO_RECEIPT", row.id, `status "${row.status}" needs an existing in-repo receipt path`);
        else {
          const text = input.readText(row.receipt_path);
          if (text === null || !namesIdAsToken(text, row.id)) refuse("ID_MAP_RECEIPT_ID_ABSENT", row.id, `the receipt ${row.receipt_path} ${text === null ? "cannot be read" : "never names the id as a whole token"}`);
          const selfByPath = SELF_RECEIPTS.includes(receipt) || SELF_RECEIPTS.includes(resolvedReceipt);
          if (!selfByPath && text !== null) {
            if ((input.mapping !== "" && text === input.mapping) || SELF_CONTENT_MARKERS.some(marker => text.includes(marker))) refuse("ID_MAP_RECEIPT_SELF_REFERENTIAL", row.id, `the receipt ${row.receipt_path} carries the content of the mapping document or the validator test, so it names many ids by construction and proves none of them`);
            // A partial copy of the table (rows without the heading, or the heading in another case) carries no marker and is not byte-equal, yet it names every resolved id.
            else if (resolvedIds.length >= COVERAGE_GUARD_MIN_RESOLVED && resolvedIds.every(id => namesIdAsToken(text, id))) refuse("ID_MAP_RECEIPT_SELF_REFERENTIAL", row.id, `the receipt ${row.receipt_path} names all ${resolvedIds.length} resolved ids of the table, so it proves none of them`);
          }
        }
        if (row.status === "test-pinned" && !TEST_FILE.test(receipt)) refuse("ID_MAP_RECEIPT_NOT_TEST", row.id, `status "test-pinned" needs a test file receipt (*.test.ts, *.test.py, test_*.py, a .ts file under qa/, or under a test/ directory); found ${row.receipt_path}`);
      }
    } else if (!row.source_path.startsWith(EXTERNAL_PREFIX) || row.source_path.length === EXTERNAL_PREFIX.length) {
      refuse("ID_MAP_SOURCE_PATH_MISSING", row.id, `an external-unverified row must name its source as "${EXTERNAL_PREFIX}<path in the Pi repository>"`);
    }
  }

  const has = (from: string, to: string, kind?: string): boolean => parsed.edges.some(edge => edge.from === from && edge.to === to && (kind === undefined || edge.kind === kind));
  if (parsed.hasEdges) {
    for (const [from, to] of REQUIRED_EDGES) if (!has(from, to, "blocked-by")) refuse("ID_MAP_EDGE_MISSING", `${from}->${to}`, `the serialization edges lack ${from} blocked-by ${to}`);
  }
  if (has(FORBIDDEN_EDGE[0], FORBIDDEN_EDGE[1])) refuse("ID_MAP_EDGE_FORBIDDEN", `${FORBIDDEN_EDGE[0]}->${FORBIDDEN_EDGE[1]}`, "M01 runs in parallel with M02, so no edge may join them");
  return { ok: refusals.length === 0, refusals };
}

// An absent or non-directory --root is a root error; read() would otherwise swallow ENOENT and the operator would see a table refusal.
export function judgeRoot(root: string): IdMapVerdict {
  const refusals: IdMapRefusal[] = [];
  const refuse = (code: IdMapCode, subject: string, detail: string): void => { refusals.push({ code, subject, detail }); };
  let isDirectory = false;
  try { isDirectory = statSync(root).isDirectory(); } catch { /* a missing root stays false */ }
  if (!isDirectory) refuse("ID_MAP_ROOT_MISSING", root, "the repository root does not exist or is not a directory");
  return { ok: refusals.length === 0, refusals };
}

function main(argv: readonly string[]): number {
  let root = resolve(fileURLToPath(import.meta.url), "..", "..");
  for (let i = 0; i < argv.length; i++) if (argv[i] === "--root") root = resolve(argv[++i] ?? ".");
  const rootVerdict = judgeRoot(root);
  if (!rootVerdict.ok) {
    console.log(`${MAPPING_DOC}: refused (${rootVerdict.refusals.length})`);
    for (const r of rootVerdict.refusals) console.error(`${MAPPING_DOC}: ${r.code}: ${r.subject} - ${r.detail}`);
    return 2;
  }
  const read = (path: string): string => { try { return readFileSync(resolve(root, path), "utf8"); } catch { return ""; } };
  const docs: Record<string, string> = {};
  for (const name of PROGRAM_DOCS) docs[name] = read(`${PROGRAM_DIR}/${name}`);
  const readReceipt = (path: string): string | null => { try { return readFileSync(resolve(root, path), "utf8"); } catch { return null; } };
  const verdict = judgeIdMapping({ mapping: read(MAPPING_DOC), docs, exists: path => existsSync(resolve(root, path)), readText: readReceipt, contained: path => pathContainedIn(root, path), realPath: path => realRelativePath(root, path) });
  if (verdict.ok) { console.log(`${MAPPING_DOC}: no refusals (${extractReferencedIds(docs).length} referenced ids)`); return 0; }
  console.log(`${MAPPING_DOC}: refused (${verdict.refusals.length})`);
  for (const r of verdict.refusals) console.error(`${MAPPING_DOC}: ${r.code}: ${r.subject} - ${r.detail}`);
  return 2;
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main(process.argv.slice(2)));
