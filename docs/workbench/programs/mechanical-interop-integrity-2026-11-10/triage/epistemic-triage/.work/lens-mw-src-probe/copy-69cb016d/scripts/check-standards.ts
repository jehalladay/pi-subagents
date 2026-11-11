import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

// Mechanical code standards. Each rule enforces a convention the committed tree already follows;
// docs/15-code-standards-and-build-system.md states the conventions and why they hold.
let errors = 0;
function fail(message: string): void { console.error(message); errors++; }

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name === "node_modules" || item.name === "dist") continue;
      walk(path, out);
    } else out.push(path);
  }
  return out;
}

const SCAN_DIRS = ["packages", "apps", "qa", "examples", "scripts"];
const LIBRARY_DIRS = ["packages", "apps", "qa", "examples"]; // scripts hold checker fixtures with literal counter-examples
const tsFiles = SCAN_DIRS.flatMap(dir => walk(dir)).filter(path => path.endsWith(".ts"));

// R1: kebab-case TypeScript filenames (dot-separated suffixes such as .test and .v1 allowed).
const KEBAB = /^[a-z0-9]+(?:[-.][a-z0-9]+)*\.ts$/;
for (const path of tsFiles) {
  if (!KEBAB.test(basename(path))) fail(`NON_KEBAB_TS_FILENAME: ${path}`);
}

// R2: named exports only in shipped and QA code; a default export loses its name at every import site.
// R3: relative import specifiers carry an explicit extension; Node ESM resolves no bare "./name".
const RELATIVE_SPECIFIER = /(?:from|import)\s*\(?\s*(["'])(\.{1,2}\/[^"']+)\1/g;
for (const path of tsFiles) {
  const lines = readFileSync(path, "utf8").split("\n");
  const inLibrary = LIBRARY_DIRS.some(dir => path === dir || path.startsWith(`${dir}/`) || path.startsWith(`${dir}\\`));
  lines.forEach((line, index) => {
    if (inLibrary && /^\s*export\s+default\b/.test(line)) {
      fail(`DEFAULT_EXPORT_FORBIDDEN: ${path}:${index + 1}`);
    }
    for (const match of line.matchAll(RELATIVE_SPECIFIER)) {
      const specifier = match[2] ?? "";
      if (!/\.(?:js|ts|json)$/.test(specifier)) {
        fail(`RELATIVE_IMPORT_WITHOUT_EXTENSION: ${path}:${index + 1} -> ${specifier}`);
      }
    }
  });
}

// R4: every [build.commands] leg in every forge manifest declares inputs, so `forge gate --impacted`
// can prune it; a leg without inputs is always selected and silently defeats incremental selection.
const manifests = ["forge.toml"];
if (existsSync("forge.workspace.toml")) {
  const workspace = readFileSync("forge.workspace.toml", "utf8").replace(/^\s*#.*$/gm, "");
  for (const match of workspace.matchAll(/^\s*path\s*=\s*"([^"]+)"/gm)) {
    const manifest = join(match[1] ?? "", "forge.toml");
    if (existsSync(manifest)) manifests.push(manifest);
  }
}
// A leg is either a key of the flat [build.commands] table or its own [build.commands.LEG] sub-table;
// both forms are legal TOML and a manifest may use either or neither header. TOML also permits indentation
// before a header, spaces inside the brackets and around the dots, and a trailing comment, so recognition
// tolerates all of them (a leg R4 cannot see escapes the inputs contract and `forge gate --impacted` pruning).
const ws = "[^\\S\\r\\n]*"; // horizontal whitespace only
const headerTail = `${ws}\\]${ws}(?:#[^\\r\\n]*)?`;
// a header line opens with a bracket and closes with one, so a quoted key holding `]` still reads as a header
const headerLine = new RegExp(`^${ws}\\[\\[?[^\\r\\n]*\\]\\]?${ws}(?:#[^\\r\\n]*)?$`);
const flatHeader = new RegExp(`^${ws}\\[${ws}build${ws}\\.${ws}commands${headerTail}$`);
const subHeader = new RegExp(`^${ws}\\[${ws}build${ws}\\.${ws}commands${ws}\\.${ws}["']?([A-Za-z0-9_-]+)["']?${headerTail}$`);
interface TomlSection { header: string; body: string[] }
// Split TOML into tables. A bracket-only line is a header only outside a multi-line array or string: an array
// element row such as `  ["a", "b"]` (or a lone `["a"]`) looks like a header but belongs to the value above it.
function tomlSections(content: string): TomlSection[] {
  const sections: TomlSection[] = [];
  let depth = 0;
  let multiline = "";
  for (const raw of content.split("\n")) {
    const line = raw.replace(/\r$/, "");
    if (depth === 0 && multiline === "" && headerLine.test(line)) {
      sections.push({ header: line, body: [] });
      continue;
    }
    sections[sections.length - 1]?.body.push(line);
    for (let i = 0; i < line.length; i++) {
      const rest = line.slice(i);
      if (multiline !== "") {
        if (rest.startsWith(multiline)) { i += 2; multiline = ""; }
        else if (multiline === '"""' && line[i] === "\\") i++;
      } else if (rest.startsWith('"""') || rest.startsWith("'''")) {
        multiline = rest.slice(0, 3);
        i += 2;
      } else if (line[i] === '"') {
        i++;
        while (i < line.length && line[i] !== '"') { if (line[i] === "\\") i++; i++; }
      } else if (line[i] === "'") {
        i++;
        while (i < line.length && line[i] !== "'") i++;
      } else if (line[i] === "#") break;
      else if (line[i] === "[") depth++;
      else if (line[i] === "]" && depth > 0) depth--;
    }
  }
  return sections;
}
// Key-aware test for a flat inline-table leg: true only when the table's own top level holds an `inputs` key.
// Text inside a string value, an array or a nested inline table never counts (`command = "echo inputs = none"`).
function inlineTableHasInputs(value: string): boolean {
  let i = 0;
  const skipSpace = () => { while (i < value.length && /[ \t]/.test(value[i] ?? "")) i++; };
  const skipString = () => {
    const quote = value[i];
    i++;
    while (i < value.length && value[i] !== quote) { if (quote === '"' && value[i] === "\\") i++; i++; }
    i++;
  };
  skipSpace();
  if (value[i] !== "{") return false;
  i++;
  let depth = 1; // braces and brackets opened inside the leg's own table; 1 means the table's top level
  let atKey = true;
  while (i < value.length && depth > 0) {
    if (atKey) { // set only at the table's own top level (the opening brace or a depth-1 comma)
      skipSpace();
      const start = i;
      const quoted = value[i] === '"' || value[i] === "'";
      if (quoted) skipString();
      else while (i < value.length && /[A-Za-z0-9_-]/.test(value[i] ?? "")) i++;
      const key = quoted ? value.slice(start + 1, i - 1) : value.slice(start, i);
      skipSpace();
      if (key === "inputs" && value[i] === "=") return true;
      atKey = false;
      continue;
    }
    const ch = value[i] ?? "";
    if (ch === '"' || ch === "'") { skipString(); continue; }
    if (ch === "#") break;
    if (ch === "{" || ch === "[") depth++;
    else if (ch === "}" || ch === "]") depth--;
    else if (ch === "," && depth === 1) atKey = true;
    i++;
  }
  return false;
}
function forgeLegs(content: string): Array<{ name: string; hasInputs: boolean }> {
  const legs: Array<{ name: string; hasInputs: boolean }> = [];
  const sections = tomlSections(content);
  const flat = sections.find(section => flatHeader.test(section.header));
  // A flat leg is `LEG = { ... }` or a run of dotted keys (`LEG.command = ...`, `LEG.inputs = ...`) grouped by leg name.
  const flatLegs = new Map<string, boolean>();
  for (const line of flat?.body ?? []) {
    const leg = line.match(/^\s*([A-Za-z0-9_-]+)((?:\s*\.\s*[A-Za-z0-9_-]+)*)\s*=\s*(.*)$/);
    if (!leg || line.trim().startsWith("#")) continue;
    const name = leg[1] ?? "";
    const subKeys = (leg[2] ?? "").split(".").map(key => key.trim()).filter(key => key !== "");
    const hasInputs = subKeys.length === 0 ? inlineTableHasInputs(leg[3] ?? "") : subKeys.length === 1 && subKeys[0] === "inputs";
    flatLegs.set(name, (flatLegs.get(name) ?? false) || hasInputs);
  }
  for (const [name, hasInputs] of flatLegs) legs.push({ name, hasInputs });
  for (const section of sections) {
    const sub = section.header.match(subHeader);
    if (!sub) continue;
    const body = section.body.filter(line => !line.trim().startsWith("#")).join("\n");
    legs.push({ name: sub[1] ?? "", hasInputs: /^\s*inputs\s*=/m.test(body) });
  }
  return legs;
}
for (const manifest of manifests) {
  for (const leg of forgeLegs(readFileSync(manifest, "utf8"))) {
    if (!leg.hasInputs) fail(`FORGE_LEG_WITHOUT_INPUTS: ${manifest} ${leg.name}`);
  }
}

// R5: top-level docs stay in the numbered NN-kebab series; unnumbered notes hide from the reading order.
if (existsSync("docs")) {
  for (const item of readdirSync("docs", { withFileTypes: true })) {
    if (!item.isFile() || !item.name.endsWith(".md")) continue;
    if (item.name === "README.md") continue;
    if (!/^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(item.name)) {
      fail(`DOC_FILENAME_NOT_NUMBERED_KEBAB: docs/${item.name}`);
    }
  }
}

if (errors) process.exit(1);
console.log(`standards: pass (${tsFiles.length} TypeScript files, ${manifests.length} forge manifests)`);
