import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dirs = ["docs", "packages", "apps", "contracts", "qa"];
const files = ["README.md", "AGENTS.md"];
function collect(dir: string): void {
  for (const item of readdirSync(resolve(root, dir), { withFileTypes: true })) {
    const path = `${dir}/${item.name}`;
    if (item.isDirectory()) collect(path);
    else if (extname(path) === ".md") files.push(path);
  }
}
for (const dir of dirs) collect(dir);
function stripCode(content: string): string {
  const kept: string[] = [];
  let fence: string | undefined;
  for (const line of content.split(/\r?\n/)) {
    const open = /^ {0,3}(`{3,}|~{3,})/.exec(line);
    if (fence === undefined) {
      if (open) fence = open[1] ?? "";
      else kept.push(line);
    } else {
      // A closing fence is one homogeneous run of the opening character, at least as long as the opener, with nothing after it.
      const close = /^ {0,3}(`{3,}|~{3,})[ \t]*$/.exec(line);
      if (close && (close[1] ?? "").startsWith(fence.charAt(0)) && (close[1] ?? "").length >= fence.length) fence = undefined;
    }
  }
  // A code span lives inside one paragraph: its body never crosses a blank line.
  return kept.join("\n").replace(/(?<!`)(`+)(?!`)(?:(?!\n[ \t]*\n)[\s\S])*?(?<!`)\1(?!`)/g, "");
}
let errors = 0;
for (const path of files) {
  const content = readFileSync(resolve(root, path), "utf8");
  // CommonMark ATX heading at offset 0: one to six '#' followed by a space or the end of the line.
  if (!content.trim() || !/^#{1,6}(?: |\t|$)/.test(content.split(/\r?\n/, 1)[0] ?? "")) {
    console.error(`DOC_EMPTY_OR_MISSING_HEADING: ${path}`); errors++;
  }
  // Fenced code blocks and inline code spans hold sample text, never links; strip them before any match.
  const scanned = stripCode(content);
  const destinations: string[] = [];
  for (const match of scanned.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) destinations.push(match[1] ?? "");
  // Reference-style definitions ('[label]: destination "title"') are checked like inline destinations.
  for (const match of scanned.matchAll(/^ {0,3}\[[^\]]+\]:[ \t]*(<[^>]*>|\S+)/gm)) destinations.push(match[1] ?? "");
  for (const destination of destinations) {
    // An angle-bracket destination '<...>' is unwrapped first; otherwise CommonMark allows an optional
    // link title after the destination, which is dropped before the fragment split.
    // Fragments are intentionally unvalidated: only the file part of a link is checked.
    const angle = /^<([^>]*)>/.exec(destination.trim());
    const bare = angle ? (angle[1] ?? "") : destination.replace(/\s+["'(].*$/s, "");
    const target = bare.split("#")[0];
    if (!target || /^[a-z]+:/i.test(target) || target.startsWith("mailto:")) continue;
    let decoded: string;
    try { decoded = decodeURIComponent(target); }
    catch { console.error(`DOC_MALFORMED_LINK_TARGET: ${path} -> ${target}`); errors++; continue; }
    if (!existsSync(resolve(root, dirname(path), decoded))) {
      console.error(`DOC_BROKEN_LOCAL_LINK: ${path} -> ${target}`); errors++;
    }
  }
}
if (errors) process.exit(1);
console.log(`docs: pass (${files.length} markdown files)`);
