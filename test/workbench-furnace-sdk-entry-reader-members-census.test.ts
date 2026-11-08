/**
 * wb-lrz.9 furnace-sdk entry-reader members census (FURNACE-FEEDBACK-RECONCILIATION-R4; the rule-19 dependency-inversion
 * child of wb-lrz.8: ruling R-B266 filed it with wb-lrz.8's refusal #3 members, ruling R-B305 folded refusal #4's members
 * into its notes). SUBJECT: the readers of test/helpers/furnace-sdk-entry-readers.ts - entryExposures() and entryTextNames()
 * (the d3 reading below), spellsDeep() and holdsDeep() (d1), renderedBlocks() (u1) and registerMethods() (d4) - moved byte
 * for byte from wb-lrz.8's FINAL cut #4 (tip 072fb965db9f4b93f66ecd1ef46187931c59cfe6). The parent's census at that tip
 * (test/workbench-furnace-sdk-entry-readers-census.test.ts) is not on trunk and is neither added nor edited here; the parent
 * stays parked until this lands, and its later re-cut can import the helper.
 *
 * PINNED READER SET (this file, test/workbench-furnace-sdk-entry-reader-members-census.test.ts; observed at the cut: every
 * case passes on the moved readers, and each named member, applied to a copy of the helper with its refusal gate's own edit
 * - gate-prep-4's LEG 2 table for refusal #3 and gate-prep-17's for refusal #4, find and replace verbatim - reds the pin case
 * named after it). A probe is one in-memory plant of the REAL tree (the entries of vendor/furnace-sdk-0.1.0.tgz and the text
 * of vendor/README.md, each read once; nothing is written): lines appended to one tarball module, a module added beside the
 * lines that star-export it, or a block appended to the README - except path-percent-73, which is one src/ script text read
 * alone. Each probe states its reading as a literal list of lines, read one of four ways: d3 (for the types entry
 * package/dist/src/index.d.ts and then the main entry package/dist/src/index.js, a 'text <entry> <class>' line per class
 * entryTextNames() names in the entry's text, then a 'walk <entry> <form> <classes> via <chain>' line per exposure
 * entryExposures() returns), d1 (a 'spells <file> <literal>' or else 'holds <file> <literal>' line per string literal or
 * template part of the script that spellsDeep() or else holdsDeep() reads true), u1 (a 'record <tarball> <date> <revision>'
 * line per re-packaging record a block of the README's renderedBlocks() states) and d4 (a 'register <name form>' line per
 * method registerMethods() returns from package/dist/src/executor.js). The DEEP rows are @furnace/sdk/dist/src/embedded.js
 * (EmbeddedHost) and @furnace/sdk/dist/src/resident_session.js (ResidentSession). The probes are the gates' paired witnesses
 * for these members, planted as the gates wrote them.
 * - Case REAL: the unplanted tree reads d3 [], u1 ['record furnace-sdk-0.1.0.tgz 2026-10-17 9970621d8'] and d4
 *   ['register identifier'].
 * - 25 pin cases, one per named member, each asserting (toEqual over the whole list) that every probe it lists reads exactly
 *   the lines written for that probe here. A pin's quote is its refusal's own parenthesis after the member id: it names what
 *   the member's edit does, not what the helper does. Row R3 holds refusal #3's 12 members (wb-lrz.9's description, 'Unmet
 *   items verbatim' U1-U7; U8 is its record-honesty item and names no member); row R4 holds refusal #4's 13 members (the
 *   R-B305 fold, U1-U6; U7 is its record-honesty item). The roster, which case HEADER holds to the pins byte for byte:
 * PIN ROSTER
 *   R3 (wb-lrz.8's refusal #3 members, which wb-lrz.9's description carries; record-honesty item U8): 12 pins
 *     G4-LI-AFTER-DEFAULT (U1; the member: the named specifiers read only when the clause has no default binding): li-default-named-types, li-default-named-main
 *     G4-LM-DEFAULT-BESIDE-NAMED (U1; the member: the default binding recorded only when the clause has no named specifiers): lm-default-beside-named
 *     G4-STAR-TYPEONLY (U2; the member: a type-only export * or export * as skipped): star-type-only, star-as-type-only
 *     G4-FOLLOW-STARAS-RELATIVE-ONLY (U3; the member: an export * as followed only when its specifier is relative): star-as-follow-own-name
 *     G4-STARAS-DEEP-RELATIVE-ONLY (U3; the member: an export * as of a DEEP module pushed only when its specifier is relative): star-as-deep-own-name
 *     G4-R-OTHER-MJS-CJS-EXACT-ONLY (U4; the member: a .mjs or .cjs naming module tries its exact path only): kind-mjs, kind-cjs
 *     G4-R-OTHER-JS-TS-ONLY (U4; the member: every naming module but a .js or .ts one tries its exact path only): kind-mjs, kind-cjs, kind-jsx, kind-tsx, kind-mts, kind-cts, kind-ts
 *     G4-G-NO-STATIC (U5; the member: a static method skipped): register-static
 *     G4-G-NO-ASYNC (U5; the member: an async method skipped): register-async
 *     G4-G-NO-GENERATOR (U5; the member: a generator method skipped): register-generator
 *     G4-T-CASE-FOLDED (U6; the member: the regex compiled with the i flag): text-case-folded, text-own-case
 *     G4-U-COLLAPSE-ASCII-ONLY (U7; the member: only ASCII tab, LF, FF, CR and space collapsed): render-no-break-space
 *   R4 (wb-lrz.8's refusal #4 members, which R-B305 folded into wb-lrz.9's notes; record-honesty item U7): 13 pins
 *     G17-N-UNALIASED-PAST-DTS-JS (U1; the member: past the entry an unaliased re-export read only in a .d.ts or a .js module): named-unaliased-ts, named-unaliased-mjs
 *     G17-N-STRING-PAST-JS (U1; the member: past the entry a string export name read only in a .js module): named-string-mjs
 *     G17-N-IDESC-PAST-DTS (U1; the member: past the entry an identifier escape read cooked only in a .d.ts module, its raw spelling read elsewhere): named-identifier-escape-ts
 *     G17-LI-TYPEDECL-DTS (U2; the member: a type-only import declaration read only in a .d.ts module): import-type-only-ts
 *     G17-LI-ALIASED-DTS-JS (U2; the member: an aliased import specifier read only in a .d.ts or a .js module): import-aliased-ts
 *     G17-LI-MEMBER2-DTS (U2; the member: an import clause's members after its first read only in a .d.ts module): import-second-member-ts
 *     G17-LI-NONDEEP-DTS (U2; the member: an import from a module that is not DEEP read only in a .d.ts module): import-not-deep-ts
 *     G17-LE-ALIAS-PAST-DTS (U2; the member: a local export aliased on export read past the entry only in a .d.ts module): export-aliased-ts
 *     G17-LM-BOTH-DTS (U3; the member: a default binding beside a namespace import read only in a .d.ts module): default-namespace-parent-path-ts, default-namespace-dts
 *     G17-T-NONASCII-LATIN1-ONLY (U4; the member: a letter above U+00FF read as a word character, Latin-1 letters still boundaries): text-after-greek, text-before-greek
 *     G17-P-PCT-ALNUM-KEPT (U5; the member: a %XX of an ASCII letter or digit kept encoded): path-percent-73
 *     G17-G-NESTED-CLASS-DECL (U6; the member: a class declaration below the top level not walked): register-nested-class
 *     G17-G-OBJECT-VAR-INIT-ONLY (U6; the member: an object literal walked only as a variable's initializer): register-returned-object
 *
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its unmet item and
 *   probe ids, the rows' pins in pin order and the probes in first-use order, each held to a literal.
 * - Case HEADER: the PIN ROSTER block above, read from this file, equals the lines the rows and pins compose.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl and never retyped
 *   as the expectation): (1) wb-lrz.9's description's 'Unmet items verbatim' list names, item by item, row R3's unmet items
 *   in order, each with its member count (the number before -FAIL-OPEN or -DEPARTURE in its ledger slug) and its G4 member
 *   ids in first-mention order, U8 with neither, and each row R3 pin's quote is its own item's parenthesis after its id;
 *   (2) wb-lrz.9's notes carry R-B305's fold, whose unmet slugs carry exactly row R4's unmet items with their member counts
 *   (U7 with none), and wb-lrz.8's notes carry refusal #4's verdict, whose UNMET list (after the first 'refusal #4 of
 *   wb-lrz.8, on the FINAL fail-closed-core cut #4') names, item by item, row R4's unmet items, member counts and G17 member
 *   ids in first-mention order, each row R4 pin's quote its own item's parenthesis after its id. Both records are in the
 *   export from trunk c820a4c (this cut's base) on.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe the reader named beside it returns exactly the literal lines written here: a
 * helper edit that changes one probe's reading reds the pin case holding it, and an edit that changes the unplanted tree's
 * reading reds REAL. (2) Each named member changes the reading of at least one probe of its own pin: the cutting seat applied
 * each member's own edit (its refusal gate's find and replace, verbatim, over a copy of the helper) and read the pin case named
 * after it red; a pin whose probes stopped holding its member's form would read green there. Observed at the cut (the seat's
 * probe-level run, one case per probe), each named member changes the reading of every probe of its own pin but kind-ts,
 * text-own-case and default-namespace-dts, and of no other probe; those three are the gates' controls and twins, which no named
 * member changes and which are held as written only. (3) The rows, pins, unmet items and probe ids are frozen (SHAPE) and the
 * roster above, quotes included, is the pins' (HEADER): a pin of either row removed, swapped or relabelled in one literal, or
 * a row deleted, reds SHAPE or HEADER (standing rule 16's CT1-CT4). (4) Row R3's unmet items, member counts, member ids and
 * quotes are the ones wb-lrz.9's tracker-export description records (ANCHOR (1)), and row R4's the ones R-B305's fold and
 * refusal #4's verdict record (ANCHOR (2)): a pin of either row removed or relabelled in every literal together, or a row
 * removed with its frozen-shape elements, reds ANCHOR (CT5, CT6).
 *
 * NOT CLAIMED. A reading on any input that is not one of these probes is NOT CLAIMED by this census - among them every
 * spelling, module kind, entry, position, nesting or README block that no probe plants. Whether a reading equals what
 * TypeScript, a module resolver or marked itself does with the planted tree is NOT CLAIMED by this census. The helper's
 * left-out ClaimPart texts, and wb-lrz.8's census header, SUBFORMS, cases and claim paragraphs, are NOT CLAIMED by this
 * census: refusal #3's U8 and refusal #4's U7 concern those claim paragraphs, and no claim paragraph is carried here. A probe
 * removed from, added to or swapped within a pin in every literal together (PINS, SHAPE's literal, the roster and PROBES) is
 * NOT CLAIMED by this census: the tracker export records the members, their counts and quotes, never this file's probe ids.
 * No residual is claimed.
 *
 * Display paths added: none (test-only). No scratch is allocated; the vendored tarball, the README, the tracker export and this
 * file are only read; no src, docs or receipt is edited.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type DeepRow, entryExposures, entryTextNames, holdsDeep, parsed, registerMethods, renderedBlocks, SDK, spellsDeep, type Tarball } from "./helpers/furnace-sdk-entry-readers.js";

const SELF = fileURLToPath(import.meta.url);
const REPO = join(dirname(SELF), "..");
const EXPORT = ".beads/issues.jsonl";
const DEEP: readonly DeepRow[] = [
  { specifier: `${SDK}/dist/src/embedded.js`, names: ["EmbeddedHost"] },
  { specifier: `${SDK}/dist/src/resident_session.js`, names: ["ResidentSession"] },
];
const TYPES = "package/dist/src/index.d.ts";
const MAIN = "package/dist/src/index.js";
const PROTOCOL_D = "package/dist/src/protocol.d.ts";
const PROTOCOL_J = "package/dist/src/protocol.js";
const EXECUTOR = "package/dist/src/executor.js";
const RECORD = /(furnace-sdk-\d+\.\d+\.\d+\.tgz) was re-packaged on (\d{4}-\d{2}-\d{2}) \(wb-zby\) from Furnace revision ([0-9a-f]{7,40})\b/g;
const NBSP = String.fromCodePoint(0xa0);
const OMEGA = String.fromCodePoint(0x3a9);

/** The opening and close of R-B305's fold in wb-lrz.9's notes, and of refusal #4's verdict and UNMET list in wb-lrz.8's. */
const FOLD_OPEN = "RULE19 DEPENDENCY INVERSION R-B305 (ruling M:46438, refusal O:1734): members folded into wb-lrz.9\n";
const FOLD_CLOSE = "\nrule19-invert idem rule19-inversion-M46438-wb-lrz.8-wb-lrz.9";
const REFUSAL_4 = "refusal #4 of wb-lrz.8, on the FINAL fail-closed-core cut #4";
const UNMET_4 = "\nUNMET (record.unmet verbatim; 7 items, each led by its ledger slug):\n";
/** The opening and close of the 'Unmet items verbatim' list in wb-lrz.9's description. */
const UNMET_3 = "Unmet items verbatim: ";
const UNMET_3_CLOSE = "\n\nAcceptance:";

interface Tree {
  readonly tarball: Tarball;
  readonly readme: string;
}
function tarEntries(gz: Buffer): Map<string, string> {
  const tar = gunzipSync(gz);
  const entries = new Map<string, string>();
  for (let at = 0; at + 512 <= tar.length; ) {
    const header = tar.subarray(at, at + 512);
    if (header.every(byte => byte === 0)) break;
    const field = (start: number, end: number): string => {
      const raw = header.subarray(start, end);
      const nul = raw.indexOf(0);
      return raw.subarray(0, nul < 0 ? raw.length : nul).toString("utf8");
    };
    const size = Number.parseInt(field(124, 136).trim() || "0", 8);
    const type = field(156, 157);
    const name = field(0, 100);
    const prefix = field(345, 500);
    if (type === "0" || type === "") entries.set(prefix === "" ? name : `${prefix}/${name}`, tar.subarray(at + 512, at + 512 + size).toString("utf8"));
    at += 512 + Math.ceil(size / 512) * 512;
  }
  return entries;
}
const REAL: Tree = {
  tarball: tarEntries(readFileSync(join(REPO, "vendor/furnace-sdk-0.1.0.tgz"))),
  readme: readFileSync(join(REPO, "vendor/README.md"), "utf8"),
};

const short = (path: string): string => path.replace(/^package\//, "");
function d3(tree: Tree): string[] {
  const lines: string[] = [];
  for (const [field, entry] of [
    ["types", TYPES],
    ["main", MAIN],
  ] as const) {
    const text = tree.tarball.get(entry) ?? "";
    for (const name of entryTextNames(text, DEEP)) lines.push(`text ${field} ${name}`);
    for (const exposure of entryExposures(tree.tarball, entry, DEEP)) lines.push(`walk ${field} ${exposure.form} ${exposure.names.join(",")} via ${exposure.chain.map(short).join(" -> ")}`);
  }
  return lines;
}
const u1 = (tree: Tree): string[] => renderedBlocks(tree.readme).flatMap(block => [...block.matchAll(RECORD)].map(match => `record ${match[1]} ${match[2]} ${match[3]}`));
function d4(tree: Tree): string[] {
  const text = tree.tarball.get(EXECUTOR);
  return text === undefined ? ["missing executor"] : registerMethods(parsed(EXECUTOR, text)).map(method => `register ${method.name}`);
}
function d1(file: string, text: string): string[] {
  const lines: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      if (spellsDeep(node.text)) lines.push(`spells ${file} ${JSON.stringify(node.text)}`);
      else if (holdsDeep(node.text)) lines.push(`holds ${file} ${JSON.stringify(node.text)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(parsed(file, text));
  return lines;
}

/** One in-memory edit of the REAL tree: lines appended to a tarball module, a module added, or a block appended to the README. */
type Plant = { readonly append: string; readonly lines: readonly string[] } | { readonly add: string; readonly lines: readonly string[] } | { readonly readme: string };
function planted(plants: readonly Plant[]): Tree {
  const tarball = new Map(REAL.tarball);
  let readme = REAL.readme;
  for (const plant of plants) {
    if ("readme" in plant) {
      readme = `${readme}\n${plant.readme}\n`;
    } else if ("append" in plant) {
      const text = tarball.get(plant.append);
      if (text === undefined) throw new Error(`no ${plant.append}`);
      tarball.set(plant.append, `${text}\n${plant.lines.join("\n")}\n`);
    } else {
      if (tarball.has(plant.add)) throw new Error(`${plant.add} exists`);
      tarball.set(plant.add, `${plant.lines.join("\n")}\n`);
    }
  }
  return { tarball, readme };
}

type TreeReading = "d3" | "u1" | "d4";
const TREE_READINGS: Readonly<Record<TreeReading, (tree: Tree) => string[]>> = { d3, u1, d4 };
interface TreeProbe {
  readonly id: string;
  readonly reader: TreeReading;
  readonly plants: readonly Plant[];
  readonly reading: readonly string[];
}
interface ScriptProbe {
  readonly id: string;
  readonly reader: "d1";
  readonly file: string;
  readonly text: string;
  readonly reading: readonly string[];
}
type Probe = TreeProbe | ScriptProbe;
const readingOf = (probe: Probe): string[] => (probe.reader === "d1" ? d1(probe.file, probe.text) : TREE_READINGS[probe.reader](planted(probe.plants)));

/** The main entry star-exports ./<file> (its exact path), which holds an extensionless export * of ./embedded. */
const kind = (id: string, file: string): Probe => ({
  id,
  reader: "d3",
  plants: [
    { add: `package/dist/src/${file}`, lines: ['export * from "./embedded";'] },
    { append: MAIN, lines: [`export * from "./${file}";`] },
  ],
  reading: [`walk main star EmbeddedHost via dist/src/index.js -> dist/src/${file} -> dist/src/embedded.js`],
});
/** `entry` star-exports `specifier`, which names the added module `module` holding `lines`. */
const starred = (entry: string, specifier: string, module: string, lines: readonly string[]): Plant[] => [
  { add: `package/dist/src/${module}`, lines },
  { append: entry, lines: [`export * from "${specifier}";`] },
];
const shim = (member: string): string => `class ShimApp {\n  ${member} {\n    return this;\n  }\n}`;
const TWO_REGISTERS = ["register identifier", "register identifier"];

const PROBES: readonly Probe[] = [
  {
    id: "li-default-named-types",
    reader: "d3",
    plants: [{ append: PROTOCOL_D, lines: ['import Host, { EmbeddedHost } from "./embedded.js";', "export { EmbeddedHost };"] }],
    reading: ["walk types local-import EmbeddedHost via dist/src/index.d.ts -> dist/src/protocol.d.ts"],
  },
  {
    id: "li-default-named-main",
    reader: "d3",
    plants: [{ append: PROTOCOL_J, lines: ['import Session, { ResidentSession } from "./resident_session.js";', "export { ResidentSession };"] }],
    reading: ["walk main local-import ResidentSession via dist/src/index.js -> dist/src/protocol.js"],
  },
  {
    id: "lm-default-beside-named",
    reader: "d3",
    plants: [{ append: PROTOCOL_D, lines: ['import Host, { zzOther } from "./embedded.js";', "export { Host };"] }],
    reading: ["walk types local-module EmbeddedHost via dist/src/index.d.ts -> dist/src/protocol.d.ts"],
  },
  {
    id: "star-type-only",
    reader: "d3",
    plants: [{ append: TYPES, lines: ['export type * from "./embedded.js";'] }],
    reading: ["walk types star EmbeddedHost via dist/src/index.d.ts -> dist/src/embedded.d.ts"],
  },
  {
    id: "star-as-type-only",
    reader: "d3",
    plants: [{ append: TYPES, lines: ['export type * as zzns from "./resident_session.js";'] }],
    reading: ["walk types star ResidentSession via dist/src/index.d.ts -> dist/src/resident_session.d.ts"],
  },
  {
    id: "star-as-follow-own-name",
    reader: "d3",
    plants: [
      { add: "package/dist/src/zzas.d.ts", lines: ['export * from "./embedded.js";'] },
      { append: TYPES, lines: [`export * as zzns from "${SDK}/dist/src/zzas.js";`] },
    ],
    reading: ["walk types star EmbeddedHost via dist/src/index.d.ts -> dist/src/zzas.d.ts -> dist/src/embedded.d.ts"],
  },
  {
    id: "star-as-deep-own-name",
    reader: "d3",
    plants: [{ append: TYPES, lines: [`export * as zzns from "${SDK}/dist/src/embedded.js";`] }],
    reading: ["walk types star EmbeddedHost via dist/src/index.d.ts -> dist/src/embedded.d.ts"],
  },
  kind("kind-mjs", "zzk.mjs"),
  kind("kind-cjs", "zzk.cjs"),
  kind("kind-jsx", "zzk.jsx"),
  kind("kind-tsx", "zzk.tsx"),
  kind("kind-mts", "zzk.mts"),
  kind("kind-cts", "zzk.cts"),
  kind("kind-ts", "zzk.ts"),
  { id: "register-static", reader: "d4", plants: [{ append: EXECUTOR, lines: [shim("static register()")] }], reading: TWO_REGISTERS },
  { id: "register-async", reader: "d4", plants: [{ append: EXECUTOR, lines: [shim("async register()")] }], reading: TWO_REGISTERS },
  { id: "register-generator", reader: "d4", plants: [{ append: EXECUTOR, lines: [shim("*register()")] }], reading: TWO_REGISTERS },
  { id: "text-case-folded", reader: "d3", plants: [{ append: TYPES, lines: ["// embeddedhost stays a deep import"] }], reading: [] },
  { id: "text-own-case", reader: "d3", plants: [{ append: TYPES, lines: ["// EmbeddedHost stays a deep import"] }], reading: ["text types EmbeddedHost"] },
  {
    id: "render-no-break-space",
    reader: "u1",
    plants: [{ readme: `furnace-sdk-0.2.0.tgz was re-packaged${NBSP}on 2026-11-01 (wb-zby) from Furnace revision abcdef0123` }],
    reading: ["record furnace-sdk-0.1.0.tgz 2026-10-17 9970621d8", "record furnace-sdk-0.2.0.tgz 2026-11-01 abcdef0123"],
  },
  {
    id: "named-unaliased-ts",
    reader: "d3",
    plants: starred(TYPES, "./zzn.js", "zzn.ts", ['export { EmbeddedHost } from "./embedded.js";']),
    reading: ["walk types named EmbeddedHost via dist/src/index.d.ts -> dist/src/zzn.ts"],
  },
  {
    id: "named-unaliased-mjs",
    reader: "d3",
    plants: starred(MAIN, "./zzn.mjs", "zzn.mjs", ['export { ResidentSession } from "./resident_session.js";']),
    reading: ["walk main named ResidentSession via dist/src/index.js -> dist/src/zzn.mjs"],
  },
  {
    id: "named-string-mjs",
    reader: "d3",
    plants: starred(MAIN, "./zzq.mjs", "zzq.mjs", ['export { "ResidentSession" as Session } from "./resident_session.js";']),
    reading: ["walk main named ResidentSession via dist/src/index.js -> dist/src/zzq.mjs"],
  },
  {
    id: "named-identifier-escape-ts",
    reader: "d3",
    plants: starred(TYPES, "./zze.js", "zze.ts", ['export { \\u0045mbeddedHost as Host } from "./embedded.js";']),
    reading: ["walk types named EmbeddedHost via dist/src/index.d.ts -> dist/src/zze.ts"],
  },
  {
    id: "import-type-only-ts",
    reader: "d3",
    plants: starred(TYPES, "./zzt.js", "zzt.ts", ['import type { EmbeddedHost } from "./embedded.js";', "export type { EmbeddedHost };"]),
    reading: ["walk types local-import EmbeddedHost via dist/src/index.d.ts -> dist/src/zzt.ts"],
  },
  {
    id: "import-aliased-ts",
    reader: "d3",
    plants: starred(TYPES, "./zza.js", "zza.ts", ['import { EmbeddedHost as Embedded } from "./embedded.js";', "export { Embedded };"]),
    reading: ["walk types local-import EmbeddedHost via dist/src/index.d.ts -> dist/src/zza.ts"],
  },
  {
    id: "import-second-member-ts",
    reader: "d3",
    plants: starred(TYPES, "./zzm.js", "zzm.ts", ['import { ExecutionResult, EmbeddedHost } from "./embedded.js";', "export { EmbeddedHost };"]),
    reading: ["walk types local-import EmbeddedHost via dist/src/index.d.ts -> dist/src/zzm.ts"],
  },
  {
    id: "import-not-deep-ts",
    reader: "d3",
    plants: starred(TYPES, "./zzd.js", "zzd.ts", ['import { ResidentSession } from "./models.js";', "export { ResidentSession };"]),
    reading: ["walk types local-import ResidentSession via dist/src/index.d.ts -> dist/src/zzd.ts"],
  },
  {
    id: "export-aliased-ts",
    reader: "d3",
    plants: starred(TYPES, "./zzx.js", "zzx.ts", ['import { EmbeddedHost } from "./embedded.js";', "export { EmbeddedHost as Host };"]),
    reading: ["walk types local-import EmbeddedHost via dist/src/index.d.ts -> dist/src/zzx.ts"],
  },
  {
    id: "default-namespace-parent-path-ts",
    reader: "d3",
    plants: starred(TYPES, "./zzsub/zzb.js", "zzsub/zzb.ts", ['import Host, * as hosting from "../embedded.js";', "export { Host };"]),
    reading: ["walk types local-module EmbeddedHost via dist/src/index.d.ts -> dist/src/zzsub/zzb.ts"],
  },
  {
    id: "default-namespace-dts",
    reader: "d3",
    plants: [{ append: PROTOCOL_D, lines: ['import Host, * as hosting from "./embedded.js";', "export { Host };"] }],
    reading: ["walk types local-module EmbeddedHost via dist/src/index.d.ts -> dist/src/protocol.d.ts"],
  },
  { id: "text-after-greek", reader: "d3", plants: [{ append: TYPES, lines: [`export declare const ${OMEGA}EmbeddedHost: unique symbol;`] }], reading: ["text types EmbeddedHost"] },
  { id: "text-before-greek", reader: "d3", plants: [{ append: TYPES, lines: [`export declare const EmbeddedHost${OMEGA}: unique symbol;`] }], reading: ["text types EmbeddedHost"] },
  {
    id: "path-percent-73",
    reader: "d1",
    file: "src/workbench/plant-d1-gp17.ts",
    text: 'export const loaded: unknown = await import("@furnace/%73dk/dist/src/host_client.js");\n',
    reading: ['spells src/workbench/plant-d1-gp17.ts "@furnace/%73dk/dist/src/host_client.js"'],
  },
  {
    id: "register-nested-class",
    reader: "d4",
    plants: [{ append: EXECUTOR, lines: ["export function makeInner() {\n  class Inner {\n    register() {\n      return this;\n    }\n  }\n  return Inner;\n}"] }],
    reading: TWO_REGISTERS,
  },
  {
    id: "register-returned-object",
    reader: "d4",
    plants: [{ append: EXECUTOR, lines: ["export function makeTable() {\n  return {\n    register() {\n      return 1;\n    },\n  };\n}"] }],
    reading: TWO_REGISTERS,
  },
];

interface Pin {
  readonly id: string;
  /** The pin's unmet item in its refusal. */
  readonly unmet: string;
  /** The refusal's own parenthesis after the member id: what the member's edit does. */
  readonly quote: string;
  readonly probes: readonly string[];
}
interface Row {
  readonly id: "R3" | "R4";
  readonly label: string;
  /** The refusal's record-honesty unmet item, which names no member. */
  readonly record: string;
  readonly pins: readonly string[];
}

const PINS: readonly Pin[] = [
  { id: "G4-LI-AFTER-DEFAULT", unmet: "U1", quote: "the named specifiers read only when the clause has no default binding", probes: ["li-default-named-types", "li-default-named-main"] },
  { id: "G4-LM-DEFAULT-BESIDE-NAMED", unmet: "U1", quote: "the default binding recorded only when the clause has no named specifiers", probes: ["lm-default-beside-named"] },
  { id: "G4-STAR-TYPEONLY", unmet: "U2", quote: "a type-only export * or export * as skipped", probes: ["star-type-only", "star-as-type-only"] },
  { id: "G4-FOLLOW-STARAS-RELATIVE-ONLY", unmet: "U3", quote: "an export * as followed only when its specifier is relative", probes: ["star-as-follow-own-name"] },
  { id: "G4-STARAS-DEEP-RELATIVE-ONLY", unmet: "U3", quote: "an export * as of a DEEP module pushed only when its specifier is relative", probes: ["star-as-deep-own-name"] },
  { id: "G4-R-OTHER-MJS-CJS-EXACT-ONLY", unmet: "U4", quote: "a .mjs or .cjs naming module tries its exact path only", probes: ["kind-mjs", "kind-cjs"] },
  {
    id: "G4-R-OTHER-JS-TS-ONLY",
    unmet: "U4",
    quote: "every naming module but a .js or .ts one tries its exact path only",
    probes: ["kind-mjs", "kind-cjs", "kind-jsx", "kind-tsx", "kind-mts", "kind-cts", "kind-ts"],
  },
  { id: "G4-G-NO-STATIC", unmet: "U5", quote: "a static method skipped", probes: ["register-static"] },
  { id: "G4-G-NO-ASYNC", unmet: "U5", quote: "an async method skipped", probes: ["register-async"] },
  { id: "G4-G-NO-GENERATOR", unmet: "U5", quote: "a generator method skipped", probes: ["register-generator"] },
  { id: "G4-T-CASE-FOLDED", unmet: "U6", quote: "the regex compiled with the i flag", probes: ["text-case-folded", "text-own-case"] },
  { id: "G4-U-COLLAPSE-ASCII-ONLY", unmet: "U7", quote: "only ASCII tab, LF, FF, CR and space collapsed", probes: ["render-no-break-space"] },
  {
    id: "G17-N-UNALIASED-PAST-DTS-JS",
    unmet: "U1",
    quote: "past the entry an unaliased re-export read only in a .d.ts or a .js module",
    probes: ["named-unaliased-ts", "named-unaliased-mjs"],
  },
  { id: "G17-N-STRING-PAST-JS", unmet: "U1", quote: "past the entry a string export name read only in a .js module", probes: ["named-string-mjs"] },
  {
    id: "G17-N-IDESC-PAST-DTS",
    unmet: "U1",
    quote: "past the entry an identifier escape read cooked only in a .d.ts module, its raw spelling read elsewhere",
    probes: ["named-identifier-escape-ts"],
  },
  { id: "G17-LI-TYPEDECL-DTS", unmet: "U2", quote: "a type-only import declaration read only in a .d.ts module", probes: ["import-type-only-ts"] },
  { id: "G17-LI-ALIASED-DTS-JS", unmet: "U2", quote: "an aliased import specifier read only in a .d.ts or a .js module", probes: ["import-aliased-ts"] },
  { id: "G17-LI-MEMBER2-DTS", unmet: "U2", quote: "an import clause's members after its first read only in a .d.ts module", probes: ["import-second-member-ts"] },
  { id: "G17-LI-NONDEEP-DTS", unmet: "U2", quote: "an import from a module that is not DEEP read only in a .d.ts module", probes: ["import-not-deep-ts"] },
  { id: "G17-LE-ALIAS-PAST-DTS", unmet: "U2", quote: "a local export aliased on export read past the entry only in a .d.ts module", probes: ["export-aliased-ts"] },
  {
    id: "G17-LM-BOTH-DTS",
    unmet: "U3",
    quote: "a default binding beside a namespace import read only in a .d.ts module",
    probes: ["default-namespace-parent-path-ts", "default-namespace-dts"],
  },
  {
    id: "G17-T-NONASCII-LATIN1-ONLY",
    unmet: "U4",
    quote: "a letter above U+00FF read as a word character, Latin-1 letters still boundaries",
    probes: ["text-after-greek", "text-before-greek"],
  },
  { id: "G17-P-PCT-ALNUM-KEPT", unmet: "U5", quote: "a %XX of an ASCII letter or digit kept encoded", probes: ["path-percent-73"] },
  { id: "G17-G-NESTED-CLASS-DECL", unmet: "U6", quote: "a class declaration below the top level not walked", probes: ["register-nested-class"] },
  { id: "G17-G-OBJECT-VAR-INIT-ONLY", unmet: "U6", quote: "an object literal walked only as a variable's initializer", probes: ["register-returned-object"] },
];

const ROWS: readonly Row[] = [
  {
    id: "R3",
    label: "wb-lrz.8's refusal #3 members, which wb-lrz.9's description carries",
    record: "U8",
    pins: [
      "G4-LI-AFTER-DEFAULT",
      "G4-LM-DEFAULT-BESIDE-NAMED",
      "G4-STAR-TYPEONLY",
      "G4-FOLLOW-STARAS-RELATIVE-ONLY",
      "G4-STARAS-DEEP-RELATIVE-ONLY",
      "G4-R-OTHER-MJS-CJS-EXACT-ONLY",
      "G4-R-OTHER-JS-TS-ONLY",
      "G4-G-NO-STATIC",
      "G4-G-NO-ASYNC",
      "G4-G-NO-GENERATOR",
      "G4-T-CASE-FOLDED",
      "G4-U-COLLAPSE-ASCII-ONLY",
    ],
  },
  {
    id: "R4",
    label: "wb-lrz.8's refusal #4 members, which R-B305 folded into wb-lrz.9's notes",
    record: "U7",
    pins: [
      "G17-N-UNALIASED-PAST-DTS-JS",
      "G17-N-STRING-PAST-JS",
      "G17-N-IDESC-PAST-DTS",
      "G17-LI-TYPEDECL-DTS",
      "G17-LI-ALIASED-DTS-JS",
      "G17-LI-MEMBER2-DTS",
      "G17-LI-NONDEEP-DTS",
      "G17-LE-ALIAS-PAST-DTS",
      "G17-LM-BOTH-DTS",
      "G17-T-NONASCII-LATIN1-ONLY",
      "G17-P-PCT-ALNUM-KEPT",
      "G17-G-NESTED-CLASS-DECL",
      "G17-G-OBJECT-VAR-INIT-ONLY",
    ],
  },
];

function pinOf(id: string): Pin {
  const pin = PINS.find(candidate => candidate.id === id);
  if (pin === undefined) throw new Error(`${id}: no such pin`);
  return pin;
}
function probeOf(id: string): Probe {
  const probe = PROBES.find(candidate => candidate.id === id);
  if (probe === undefined) throw new Error(`${id}: no such probe`);
  return probe;
}
function rowOf(pin: Pin): Row {
  const row = ROWS.find(candidate => candidate.pins.includes(pin.id));
  if (row === undefined) throw new Error(`${pin.id}: in no row`);
  return row;
}
/** A row's pins grouped by unmet item, in order, as '<unmet>:<member count>:<member ids>', its record-honesty item last. */
function rowItems(row: Row): string[] {
  const items: { readonly unmet: string; readonly members: string[] }[] = [];
  for (const id of row.pins) {
    const pin = pinOf(id);
    const last = items.at(-1);
    if (last?.unmet === pin.unmet) last.members.push(pin.id);
    else items.push({ unmet: pin.unmet, members: [pin.id] });
  }
  return [...items.map(item => `${item.unmet}:${item.members.length}:${item.members.join(",")}`), `${row.record}:-:`];
}
/** A bead's description and notes, read from its row in the tracked tracker export. */
function exportRow(bead: string): { readonly description: string; readonly notes: string } {
  for (const line of trackerExportText(join(REPO, EXPORT)).split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (typeof value !== "object" || value === null || !("id" in value) || value.id !== bead) continue;
    const description = "description" in value && typeof value.description === "string" ? value.description : "";
    const notes = "notes" in value && typeof value.notes === "string" ? value.notes : "";
    return { description, notes };
  }
  throw new Error(`${bead}: no row in ${EXPORT}`);
}
/** The text from the first occurrence of open up to the first occurrence of close after it (to the end when close is absent;
 * empty when open is absent). */
function sectionOf(text: string, open: string, close: string): string {
  const start = text.indexOf(open);
  if (start < 0) return "";
  const end = text.indexOf(close, start + open.length);
  return end < 0 ? text.slice(start) : text.slice(start, end);
}
/** An unmet item: its id (U<n>), its ledger slug and its text. */
interface UnmetItem {
  readonly unmet: string;
  readonly slug: string;
  readonly text: string;
}
const unmetItem = (text: string): UnmetItem => {
  const match = /^(U\d+): (U\d+-\S+?)\. /.exec(text);
  return { unmet: match?.[1] ?? "", slug: match?.[2] ?? "", text };
};
/** The member count a ledger slug carries (the number before -FAIL-OPEN or -DEPARTURE), or '-' when it carries none. */
const countOf = (slug: string): string => /-(\d+)-(?:FAIL-OPEN|DEPARTURE)-0of254$/.exec(slug)?.[1] ?? "-";
/** The member ids an item's text names, in first-mention order. */
const membersOf = (text: string, prefix: string): string[] => [...new Set(text.match(new RegExp(`\\b${prefix}-[A-Z0-9]+(?:-[A-Z0-9]+)*`, "g")) ?? [])];
const itemLine = (item: UnmetItem, prefix: string): string => `${item.unmet}:${countOf(item.slug)}:${membersOf(item.text, prefix).join(",")}`;
const escaped = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Whether an item's text holds '<id> (<quote>)', the quote optionally after a ':<line>, ' reference. */
const quotes = (text: string, pin: Pin): boolean => new RegExp(`${escaped(pin.id)} \\((?::\\d+, )?${escaped(pin.quote)}\\)`).test(text);
const rosterLines = (): string[] =>
  ROWS.flatMap(row => [
    ` *   ${row.id} (${row.label}; record-honesty item ${row.record}): ${row.pins.length} pins`,
    ...row.pins.map(id => {
      const pin = pinOf(id);
      return ` *     ${pin.id} (${pin.unmet}; the member: ${pin.quote}): ${pin.probes.join(", ")}`;
    }),
  ]);

describe("wb-lrz.9 furnace-sdk entry-reader members census (test/helpers/furnace-sdk-entry-readers.ts): REAL plus 25 pin cases, each holding the literal d3, d1, u1 or d4 readings of the paired probes of one named wb-lrz.8 refusal #3 or #4 gate member, with SHAPE, HEADER and ANCHOR", () => {
  it("REAL: the unplanted tree reads d3 [], u1 [the 0.1.0 record] and d4 [one identifier register]", () => {
    expect(d3(REAL)).toEqual([]);
    expect(u1(REAL)).toEqual(["record furnace-sdk-0.1.0.tgz 2026-10-17 9970621d8"]);
    expect(d4(REAL)).toEqual(["register identifier"]);
  });

  it("SHAPE: the rows, their pins, each pin's unmet item and probe ids, and the probes stay frozen", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["R3:12", "R4:13"]);
    expect(PINS.map(pin => `${pin.id}:${pin.unmet}:${pin.probes.join(",")}`)).toEqual([
      "G4-LI-AFTER-DEFAULT:U1:li-default-named-types,li-default-named-main",
      "G4-LM-DEFAULT-BESIDE-NAMED:U1:lm-default-beside-named",
      "G4-STAR-TYPEONLY:U2:star-type-only,star-as-type-only",
      "G4-FOLLOW-STARAS-RELATIVE-ONLY:U3:star-as-follow-own-name",
      "G4-STARAS-DEEP-RELATIVE-ONLY:U3:star-as-deep-own-name",
      "G4-R-OTHER-MJS-CJS-EXACT-ONLY:U4:kind-mjs,kind-cjs",
      "G4-R-OTHER-JS-TS-ONLY:U4:kind-mjs,kind-cjs,kind-jsx,kind-tsx,kind-mts,kind-cts,kind-ts",
      "G4-G-NO-STATIC:U5:register-static",
      "G4-G-NO-ASYNC:U5:register-async",
      "G4-G-NO-GENERATOR:U5:register-generator",
      "G4-T-CASE-FOLDED:U6:text-case-folded,text-own-case",
      "G4-U-COLLAPSE-ASCII-ONLY:U7:render-no-break-space",
      "G17-N-UNALIASED-PAST-DTS-JS:U1:named-unaliased-ts,named-unaliased-mjs",
      "G17-N-STRING-PAST-JS:U1:named-string-mjs",
      "G17-N-IDESC-PAST-DTS:U1:named-identifier-escape-ts",
      "G17-LI-TYPEDECL-DTS:U2:import-type-only-ts",
      "G17-LI-ALIASED-DTS-JS:U2:import-aliased-ts",
      "G17-LI-MEMBER2-DTS:U2:import-second-member-ts",
      "G17-LI-NONDEEP-DTS:U2:import-not-deep-ts",
      "G17-LE-ALIAS-PAST-DTS:U2:export-aliased-ts",
      "G17-LM-BOTH-DTS:U3:default-namespace-parent-path-ts,default-namespace-dts",
      "G17-T-NONASCII-LATIN1-ONLY:U4:text-after-greek,text-before-greek",
      "G17-P-PCT-ALNUM-KEPT:U5:path-percent-73",
      "G17-G-NESTED-CLASS-DECL:U6:register-nested-class",
      "G17-G-OBJECT-VAR-INIT-ONLY:U6:register-returned-object",
    ]);
    expect(
      ROWS.flatMap(row => row.pins),
      "the rows hold every pin once, in pin order",
    ).toEqual(PINS.map(pin => pin.id));
    expect(
      PROBES.map(probe => probe.id),
      "the probes are the pins' probes, each once, in first-use order",
    ).toEqual([...new Set(PINS.flatMap(pin => pin.probes))]);
  });

  it("HEADER: this file's PIN ROSTER block is the rows' and pins' roster, byte for byte", () => {
    const lines = readFileSync(SELF, "utf8").split("\n");
    const start = lines.indexOf(" * PIN ROSTER");
    const end = lines.indexOf(" *", start);
    expect(start > 0 && end > start, "the header holds a PIN ROSTER block closed by a blank comment line").toBe(true);
    expect(lines.slice(start + 1, end)).toEqual(rosterLines());
  });

  it("ANCHOR: row R3's unmet items, member counts, member ids and quotes are wb-lrz.9's description's, and row R4's are R-B305's fold's and refusal #4's verdict's", () => {
    const child = exportRow("wb-lrz.9");
    const parent = exportRow("wb-lrz.8");
    // Refusal #3's gate member ids begin G4-, refusal #4's G17-; a row the census lost lists nothing.
    const r3 = ROWS.find(row => row.id === "R3");
    const r4 = ROWS.find(row => row.id === "R4");
    const listed = sectionOf(child.description, UNMET_3, UNMET_3_CLOSE).slice(UNMET_3.length);
    const parsedList: unknown = listed === "" ? [] : JSON.parse(listed);
    const items3 = (Array.isArray(parsedList) ? parsedList : []).filter((item): item is string => typeof item === "string").map(unmetItem);
    expect(
      items3.map(item => itemLine(item, "G4")),
      "wb-lrz.9's description lists exactly row R3's unmet items, member counts and members, in order",
    ).toEqual(r3 === undefined ? [] : rowItems(r3));
    for (const id of r3?.pins ?? []) {
      const pin = pinOf(id);
      const item = items3.find(candidate => candidate.unmet === pin.unmet);
      expect(item !== undefined && quotes(item.text, pin), `${pin.id}: its quote is ${pin.unmet}'s parenthesis after its id`).toBe(true);
    }

    const fold = sectionOf(child.notes, FOLD_OPEN, FOLD_CLOSE);
    const verdict = sectionOf(sectionOf(parent.notes, REFUSAL_4, "\n\nLOOP CAP"), UNMET_4, "\n\n");
    expect(fold !== "", "wb-lrz.9's notes carry R-B305's fold").toBe(true);
    expect(verdict !== "", "wb-lrz.8's notes carry refusal #4's UNMET list").toBe(true);
    const slugs = fold
      .slice(FOLD_OPEN.length)
      .split("\n")
      .filter(line => line !== "");
    expect(
      slugs.map(slug => `${slug.split("-")[0]}:${countOf(slug)}`),
      "R-B305's fold carries exactly row R4's unmet items and member counts, in order",
    ).toEqual(r4 === undefined ? [] : rowItems(r4).map(line => line.split(":").slice(0, 2).join(":")));
    const items4 = verdict
      .slice(UNMET_4.length)
      .split("\n")
      .filter(line => line.startsWith("- "))
      .map(line => unmetItem(line.slice(2)));
    expect(
      items4.map(item => itemLine(item, "G17")),
      "refusal #4's UNMET list names exactly row R4's unmet items, member counts and members, in order",
    ).toEqual(r4 === undefined ? [] : rowItems(r4));
    for (const id of r4?.pins ?? []) {
      const pin = pinOf(id);
      const item = items4.find(candidate => candidate.unmet === pin.unmet);
      expect(item !== undefined && quotes(item.text, pin), `${pin.id}: its quote is ${pin.unmet}'s parenthesis after its id`).toBe(true);
    }
  });

  for (const pin of PINS) {
    it(`${pin.id} (${rowOf(pin).id} ${pin.unmet}; the member: ${pin.quote}): probes ${pin.probes.join(", ")} read as written`, () => {
      for (const id of pin.probes) {
        const probe = probeOf(id);
        expect(readingOf(probe), `${pin.id} / ${probe.id}: ${probe.reader} reads the probe exactly as written here`).toEqual(probe.reading);
      }
    });
  }
});

import { trackerExportText } from "../qa/workbench/tracker-export.mjs";
