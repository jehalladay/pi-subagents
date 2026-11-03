/**
 * wb-pyel.11 EDC static-reach callee members census (the rule-19 carrier child of wb-pyel.9: ruling R-B312 filed it at wb-pyel.9's
 * structural exit carrying refusal #3's members, and ruling R-B336's dependency inversion folded refusal #4's members into its
 * notes). SUBJECT: the readers of test/helpers/edc-static-reach-readers.ts, read through moduleReading() over parseSource(), whose
 * code is wb-pyel.9's FINAL cut #4 unchanged (tip 7c192eae8cbd92ded6bde123dcc3bf87d6b42ccf; this cut lands the helper first and
 * changes only its header comment). The parent's census at that tip (test/workbench-edc-static-reach-readers-census.test.ts, with
 * its roster and the rc remote stream census's judgment of its loader) is not on trunk and is neither added nor edited here; the
 * parent stays parked until this lands, and its later re-cut can compose the landed helper.
 *
 * PINNED READER SET (this file, test/workbench-edc-static-reach-callee-members-census.test.ts; observed at the cut: every case
 * passes on the landed helper, and each carried member, applied as its gate's own edit to the helper, reds its own pin case and the
 * REPLAY CONTROL). A page is one in-memory module - an id and a text, the text copied byte for byte from its gate's archived real-tree
 * page (gate-prep-11's and gate-prep-8's leg2/realtree) under the gate's own id - read alone by one moduleReading call at the path
 * pages/<id>.ts; nothing is written. Its reading is the literal list of lines
 * moduleReading returns, in its order ('specifier <text>', 'load <label>', 'tracer <callee> <command>', 'named <callee> <command>',
 * 'union <callee> <command>', 'io <name>').
 * - 9 pin cases, one per carried member: each page the pin lists (its WITNESSES, then its HELD pages) reads exactly the lines
 *   written for that page here (toEqual over the whole list).
 * - 9 REPLAY cases, one per carried member: the member's edit (its gate's find and replace, copied from gate-prep-11's and
 *   gate-prep-8's archived member tables) occurs exactly once in the helper's source, and that source with the one edit applied,
 *   compiled by TypeScript's transpileModule and run in a fresh vm context whose require hands it this file's own typescript,
 *   reads exactly the pin's WITNESSES apart from the lines written for them and every other page of this file - its HELD pages
 *   among them - exactly as written.
 * - Case REPLAY CONTROL: the helper's source with no edit, compiled and run the same way, reads every page exactly as written.
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin as
 *   `${id}:${unmet}:${witnesses}:${held}` (the two page counts) and the page ids in page order, each held to a literal; every page
 *   is listed by a pin, every listed page is a page, no page is both a witness and a held page of one pin, each pin's witnesses
 *   stand in page order, and every page parses with no syntactic diagnostic.
 * - Case HEADER: the PIN ROSTER block below, read from this file, equals the lines the rows and pins compose.
 * - Case ANCHOR (the outside anchors, read at run time and never retyped as the expectation): from the tracked tracker export
 *   .beads/issues.jsonl, (1) wb-pyel.11's description's 'Unmet items (verbatim from the row):' list gives row R3's pins with their
 *   unmet items (the GP11 member ids each item names, in order); (2) wb-pyel.11's notes carry R-B336's fold, whose items give row
 *   R4's pins with their unmet items (the L2 member ids each item names, in order; the fold upper-cases an id's i); (3) wb-pyel.9's
 *   notes quote each pin's edit - the line it inserts, the line as it rewrites it, or the clause it adds, in single quotes - and on
 *   the first line of those notes holding that quote the last member id before the quote is the pin's own (refusal #3's and
 *   refusal #4's verdicts; a member id is a GP11-<two digits> or L2-<two digits> token, one trailing letter kept, with neither a
 *   word character nor '-' on either side); and from the helper's own source, (4) each pin's find occurs once, inside the helper
 *   function its roster line names (the innermost function declaration, or const-bound arrow, holding it). The case also holds two
 *   facts of each pin's own edit: its replace holds its quote while its find does not, and its kind names the edit's shape - 'an
 *   inserted line' when the replace is the find with one line inserted whose text, blanks at its ends aside, is the quote; 'a
 *   rewritten line' when exactly one line of the find changes and the new line's text, blanks at its ends aside, is the quote; 'an
 *   added clause' when exactly one line of the find changes and the new line is the old one with the quote inserted once.
 * - Case REGISTRATION (last): the vitest task tree holds exactly these cases in this order, every other one in run mode, not
 *   inverted and ran before it, and every pin case completed its compares, in row order.
 * PIN ROSTER
 *   R3 (wb-pyel.9's refusal #3 members (gate-prep-11, run g10-gate-s181), which wb-pyel.11's description carries): 3 pins
 *     GP11-01 (U1; calleeName, an inserted line 'if (ts.isExpressionWithTypeArguments(call.expression)) return undefined;'): witnesses w-gp11-01-callee-exec, w-gp11-02-callee-require, w-l2-01a-elem-inst-exec, w-l2-01b-template-inst-exec, w-l2-01c-elem-inst-require, w-l2-01d-elem-inst-label, w-l2-01e-escaped-inst-exec, w-l2-04a-held-elem-inst-optcall, t-l2-04-held-prop-inst-optcall; held t-gp11-01-callee-exec-paren, t-gp11-01b-callee-exec-plain, t-gp11-02-callee-require-paren
 *     GP11-02 (U1; isLoaderCall, a rewritten line 'const callee = (ts.isExpressionWithTypeArguments(node.expression) ? node.expression : unwrap(node.expression));'): witnesses w-gp11-03-factory-call, w-gp11-04-bound-loader, w-gp11-05-factory-label; held t-gp11-03-factory-call-paren, t-gp11-04-bound-loader-paren, t-gp11-05-factory-label-paren
 *     GP11-03 (U2; loaderLabel, a rewritten line 'const callee = (ts.isExpressionWithTypeArguments(call.expression) ? call.expression : unwrap(call.expression));'): witnesses w-gp11-05-factory-label; held t-gp11-05-factory-label-paren
 *   R4 (wb-pyel.9's refusal #4 members (gate-prep-8, run g10-gate-s187), which R-B336 folded into wb-pyel.11's notes): 6 pins
 *     L2-01i (U1; calleeName, an inserted line 'if (ts.isExpressionWithTypeArguments(call.expression) && ts.isElementAccessExpression(call.expression.expression)) return undefined;'): witnesses w-l2-01a-elem-inst-exec, w-l2-01b-template-inst-exec, w-l2-01c-elem-inst-require, w-l2-01d-elem-inst-label, w-l2-01e-escaped-inst-exec, w-l2-04a-held-elem-inst-optcall; held t-l2-01a-elem-inst-paren, t-l2-01b-template-inst-paren, t-l2-01c-elem-inst-require-paren, t-l2-01d-elem-inst-label-paren
 *     L2-02 (U2; calleeName, an inserted line 'if (call.questionDotToken !== undefined && ts.isElementAccessExpression(callee)) return undefined;'): witnesses w-l2-01a-elem-inst-exec, w-l2-01b-template-inst-exec, w-l2-01c-elem-inst-require, w-l2-01d-elem-inst-label, w-l2-01e-escaped-inst-exec, t-l2-01a-elem-inst-paren, t-l2-01b-template-inst-paren, t-l2-01c-elem-inst-require-paren, t-l2-01d-elem-inst-label-paren, w-l2-02a-elem-opt-exec, w-l2-02b-template-opt-exec, w-l2-02c-elem-opt-require, w-l2-02d-escaped-opt-exec, w-l2-02e-escaped-opt-require, w-l2-04a-held-elem-inst-optcall, w-l2-06a-held-elem-optcall, w-l2-06b-import-elem-optcall; held t-l2-02a-elem-plain-exec, t-l2-02c-elem-plain-require, t-l2-06-held-elem-call
 *     L2-03 (U3; calleeName, an inserted line 'if (call.typeArguments !== undefined && ts.isElementAccessExpression(callee)) return undefined;'): witnesses w-l2-03a-elem-targs-exec, w-l2-03b-template-targs-exec, w-l2-03c-elem-targs-require, w-l2-03d-escaped-targs-exec, w-l2-07a-held-elem-targs-call; held t-l2-02a-elem-plain-exec
 *     L2-04i (U4; consume, an inserted line 'if (isInstantiation(at) && ts.isElementAccessExpression(at.expression)) at = at.expression;'): witnesses w-l2-04a-held-elem-inst-optcall; held w-l2-04b-held-elem-inst-paren-call, t-l2-04-held-prop-inst-optcall
 *     L2-06 (U4; consume, an added clause '&& !(parent.questionDotToken !== undefined && ts.isElementAccessExpression(at))'): witnesses w-l2-06a-held-elem-optcall, w-l2-06b-import-elem-optcall; held t-l2-06-held-elem-call, t-l2-06b-import-elem-call, t-l2-06c-import-prop-optcall
 *     L2-07 (U4; consume, an added clause '&& !(parent.typeArguments !== undefined && ts.isElementAccessExpression(at))'): witnesses w-l2-07a-held-elem-targs-call; held t-l2-06-held-elem-call
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each page moduleReading returns exactly the lines written here: a helper edit that changes
 * one page's reading through this file's import of the helper reds every pin case listing that page, and one that changes it on
 * the replay's compile-and-run path reds the REPLAY CONTROL. (2) Each carried member reads exactly its
 * pin's WITNESSES apart and every other page as written: its REPLAY case applies the member's own edit, so a witness that stopped
 * reading apart, a held page or another page that started to, or a member edit that no longer applies exactly once, reds that
 * REPLAY case; the REPLAY CONTROL reds when the compile-and-run path reads any page otherwise than written here. (3) The rows,
 * pins, unmet items, page counts and page ids are frozen (SHAPE) and the roster above is the pins' (HEADER): a pin of either row
 * removed, swapped or relabelled in one literal, or a row deleted, reds SHAPE or HEADER (standing rule 16's CT1-CT4). (4) Row R3's
 * pins and unmet items are the ones wb-pyel.11's description records, row R4's the ones R-B336's fold records, each pin's quote is
 * the one wb-pyel.9's notes record for its member (on the first notes line holding the quote, the last member id before it is the
 * pin's own), each pin's kind names its edit's shape, and each find lies once in the helper function its pin names (ANCHOR): a
 * member removed, relabelled (its id, its unmet item, its kind or its helper function) or handed another member's recorded quote,
 * each in every literal together, or a row removed with its frozen-shape elements, reds ANCHOR (CT5, CT6); another member's
 * recorded quote is one whose first notes line names that member's id last before it.
 *
 * NOT CLAIMED. A reading on any input that is not one of these pages is NOT CLAIMED by this census - among them every other
 * spelling of a callee, a key, a type argument list or a call, and every reader route no page plants. The helper's exports other
 * than moduleReading and parseSource, read alone, are NOT CLAIMED by this census. How a gate member that this bead does not carry
 * reads these pages (refusal #4's measured neighbours L2-01, L2-04 and L2-05, and gate-prep-11's GP11-01L spelling) is NOT CLAIMED
 * by this census. Whether a reading equals what TypeScript's checker or Node makes of a page is NOT CLAIMED by this census. That a
 * page's bytes are its gate's archived page's, and that a member's find and replace are its gate's archived edit's beyond the quote
 * ANCHOR reads, are NOT CLAIMED by this census: the tracker records name each member, its unmet item and its quote, not those
 * bytes. That wb-pyel.9's notes name a pin's kind in this file's words is NOT CLAIMED by this census: the kind is read from the
 * pin's own edit. The gate seat and run a row's label names (gate-prep-11, run g10-gate-s181 for R3; gate-prep-8, run g10-gate-s187
 * for R4) are NOT CLAIMED by this census: no record is read for them. That a pin's held pages are the twins its gate named for its
 * member is NOT CLAIMED by this census: a held list is held only by SHAPE's counts and checks, HEADER's roster, and its pin and
 * REPLAY cases' readings. wb-pyel.9's census, claims and roster, and the helper's own comments, are NOT CLAIMED by this census.
 * An edit of this file's own code (a case, a check or a reader removed or rewritten) is NOT CLAIMED by this census. No residual is
 * claimed.
 *
 * Display paths added: none (test-only). No scratch is allocated; the helper's source, the tracker export and this file are only
 * read; no src, docs or receipt is edited.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { moduleReading, parseSource } from "./helpers/edc-static-reach-readers.js";

const SELF = fileURLToPath(import.meta.url);
const REPO = join(dirname(SELF), "..");
const EXPORT = ".beads/issues.jsonl";
const HELPER = "test/helpers/edc-static-reach-readers.ts";
const BEAD = "wb-pyel.11";
const PARENT = "wb-pyel.9";

/** The list in wb-pyel.11's description that carries refusal #3's unmet items, one '- U<n>-' line each, closed by a blank line. */
const UNMET_OPEN = "\nUnmet items (verbatim from the row):\n";
const UNMET_CLOSE = "\n\n";
/** The opening and close of R-B336's fold in wb-pyel.11's notes. */
const FOLD_OPEN = "RULE19 DEPENDENCY INVERSION R-B336 (ruling M:47859, refusal O:1782): members folded into wb-pyel.11\n";
const FOLD_CLOSE = "\nrule19-invert idem rule19-inversion-M47859-wb-pyel.9-wb-pyel.11";

// ---- the pages ----

interface Page {
  readonly text: string;
  /** The lines moduleReading returns for the page. */
  readonly reading: readonly string[];
}
/** Each gate's archived real-tree page under the gate's own id (gate-prep-11's for refusal #3, then gate-prep-8's for refusal #4), with
 * the lines moduleReading returns for it. */
const PAGES: Readonly<Record<string, Page>> = {
  "w-gp11-01-callee-exec": { text: "declare const api: { exec<T>(command: string, args: string[]): T };\napi.exec<void>?.(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "w-gp11-02-callee-require": { text: "declare const require: <T>(id: string) => T;\nconst cp = require<{ spawn(command: string, args: string[]): void }>?.(\"node:child_process\");\ncp.spawn(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf", "io require"] },
  "t-gp11-01-callee-exec-paren": { text: "declare const api: { exec<T>(command: string, args: string[]): T };\n(api.exec<void>)?.(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "t-gp11-01b-callee-exec-plain": { text: "declare const api: { exec<T>(command: string, args: string[]): T };\napi.exec<void>(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "t-gp11-02-callee-require-paren": { text: "declare const require: <T>(id: string) => T;\nconst cp = (require<{ spawn(command: string, args: string[]): void }>)?.(\"node:child_process\");\ncp.spawn(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf", "io require"] },
  "w-gp11-03-factory-call": { text: "declare function createRequire(url: string | URL): <T>(id: string) => T;\nconst cp = createRequire(import.meta.url)<{ spawn(command: string, args: string[]): void }>?.(\"node:child_process\");\ncp.spawn(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf"] },
  "w-gp11-04-bound-loader": { text: "declare function createRequire(url: string | URL): <T>(id: string) => T;\nconst load = createRequire(import.meta.url);\nconst cp = load<{ spawn(command: string, args: string[]): void }>?.(\"node:child_process\");\ncp.spawn(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf"] },
  "w-gp11-05-factory-label": { text: "declare function createRequire(url: string | URL): <T>(id: string) => T;\ndeclare const spec: string;\ncreateRequire(import.meta.url)<unknown>?.(spec);\n\nexport {};\n", reading: ["specifier <expression>", "load createRequire()()"] },
  "t-gp11-03-factory-call-paren": { text: "declare function createRequire(url: string | URL): <T>(id: string) => T;\nconst cp = (createRequire(import.meta.url)<{ spawn(command: string, args: string[]): void }>)?.(\"node:child_process\");\ncp.spawn(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf"] },
  "t-gp11-04-bound-loader-paren": { text: "declare function createRequire(url: string | URL): <T>(id: string) => T;\nconst load = createRequire(import.meta.url);\nconst cp = (load<{ spawn(command: string, args: string[]): void }>)?.(\"node:child_process\");\ncp.spawn(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf"] },
  "t-gp11-05-factory-label-paren": { text: "declare function createRequire(url: string | URL): <T>(id: string) => T;\ndeclare const spec: string;\n(createRequire(import.meta.url)<unknown>)?.(spec);\n\nexport {};\n", reading: ["specifier <expression>", "load createRequire()()"] },
  "w-l2-01a-elem-inst-exec": { text: "declare const api: { exec<T>(command: string, args: string[]): T };\napi[\"exec\"]<void>?.(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "w-l2-01b-template-inst-exec": { text: "declare const api: { exec<T>(command: string, args: string[]): T };\napi[`exec`]<void>?.(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "w-l2-01c-elem-inst-require": { text: "declare const host: { require<T>(id: string): T };\nconst cp = host[\"require\"]<{ spawn(command: string, args: string[]): void }>?.(\"node:child_process\");\ncp.spawn(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf"] },
  "w-l2-01d-elem-inst-label": { text: "declare const host: { require<T>(id: string): T };\ndeclare const spec: string;\nhost[\"require\"]<unknown>?.(spec);\n\nexport {};\n", reading: ["specifier <expression>", "load require()"] },
  "w-l2-01e-escaped-inst-exec": { text: "declare const api: { exec<T>(command: string, args: string[]): T };\napi[\"\\u0065xec\"]<void>?.(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "t-l2-01a-elem-inst-paren": { text: "declare const api: { exec<T>(command: string, args: string[]): T };\n(api[\"exec\"]<void>)?.(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "t-l2-01b-template-inst-paren": { text: "declare const api: { exec<T>(command: string, args: string[]): T };\n(api[`exec`]<void>)?.(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "t-l2-01c-elem-inst-require-paren": { text: "declare const host: { require<T>(id: string): T };\nconst cp = (host[\"require\"]<{ spawn(command: string, args: string[]): void }>)?.(\"node:child_process\");\ncp.spawn(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf"] },
  "t-l2-01d-elem-inst-label-paren": { text: "declare const host: { require<T>(id: string): T };\ndeclare const spec: string;\n(host[\"require\"]<unknown>)?.(spec);\n\nexport {};\n", reading: ["specifier <expression>", "load require()"] },
  "w-l2-02a-elem-opt-exec": { text: "declare const api: { exec(command: string, args: string[]): void };\napi[\"exec\"]?.(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "w-l2-02b-template-opt-exec": { text: "declare const api: { exec(command: string, args: string[]): void };\napi[`exec`]?.(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "w-l2-02c-elem-opt-require": { text: "declare const host: { require(id: string): unknown };\nhost[\"require\"]?.(\"node:child_process\");\n\nexport {};\n", reading: ["specifier node:child_process"] },
  "w-l2-02d-escaped-opt-exec": { text: "declare const api: { exec(command: string, args: string[]): void };\napi[\"\\u0065xec\"]?.(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "w-l2-02e-escaped-opt-require": { text: "declare const host: { require(id: string): unknown };\nhost[\"\\u0072equire\"]?.(\"node:child_process\");\n\nexport {};\n", reading: ["specifier node:child_process"] },
  "t-l2-02a-elem-plain-exec": { text: "declare const api: { exec(command: string, args: string[]): void };\napi[\"exec\"](\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "t-l2-02c-elem-plain-require": { text: "declare const host: { require(id: string): unknown };\nhost[\"require\"](\"node:child_process\");\n\nexport {};\n", reading: ["specifier node:child_process"] },
  "w-l2-03a-elem-targs-exec": { text: "declare const api: { exec<T>(command: string, args: string[]): T };\napi[\"exec\"]<void>(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "w-l2-03b-template-targs-exec": { text: "declare const api: { exec<T>(command: string, args: string[]): T };\napi[`exec`]<void>(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "w-l2-03c-elem-targs-require": { text: "declare const host: { require<T>(id: string): T };\nconst cp = host[\"require\"]<{ spawn(command: string, args: string[]): void }>(\"node:child_process\");\ncp.spawn(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf"] },
  "w-l2-03d-escaped-targs-exec": { text: "declare const api: { exec<T>(command: string, args: string[]): T };\napi[\"\\u0065xec\"]<void>(\"rf\", []);\n\nexport {};\n", reading: ["named exec rf", "union exec rf"] },
  "w-l2-04a-held-elem-inst-optcall": { text: "declare const require: <T>(id: string) => T;\nconst cp = require<{ spawn<T>(command: string, args: string[]): T }>(\"node:child_process\");\ncp[\"spawn\"]<void>?.(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf", "io require"] },
  "w-l2-04b-held-elem-inst-paren-call": { text: "declare const require: <T>(id: string) => T;\nconst cp = require<{ spawn<T>(command: string, args: string[]): T }>(\"node:child_process\");\n(cp[\"spawn\"]<void>)(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf", "io require"] },
  "t-l2-04-held-prop-inst-optcall": { text: "declare const require: <T>(id: string) => T;\nconst cp = require<{ spawn<T>(command: string, args: string[]): T }>(\"node:child_process\");\ncp.spawn<void>?.(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf", "io require"] },
  "w-l2-06a-held-elem-optcall": { text: "declare const require: <T>(id: string) => T;\nconst cp = require<{ spawn<T>(command: string, args: string[]): T }>(\"node:child_process\");\ncp[\"spawn\"]?.(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf", "io require"] },
  "w-l2-06b-import-elem-optcall": { text: "import * as cp from \"node:child_process\";\n\ncp[\"spawn\"]?.(\"rf\", []);\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf"] },
  "t-l2-06-held-elem-call": { text: "declare const require: <T>(id: string) => T;\nconst cp = require<{ spawn<T>(command: string, args: string[]): T }>(\"node:child_process\");\ncp[\"spawn\"](\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf", "io require"] },
  "t-l2-06b-import-elem-call": { text: "import * as cp from \"node:child_process\";\n\ncp[\"spawn\"](\"rf\", []);\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf"] },
  "t-l2-06c-import-prop-optcall": { text: "import * as cp from \"node:child_process\";\n\ncp.spawn?.(\"rf\", []);\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf"] },
  "w-l2-07a-held-elem-targs-call": { text: "declare const require: <T>(id: string) => T;\nconst cp = require<{ spawn<T>(command: string, args: string[]): T }>(\"node:child_process\");\ncp[\"spawn\"]<void>(\"rf\", []);\n\nexport {};\n", reading: ["specifier node:child_process", "tracer spawn rf", "named spawn rf", "union spawn rf", "io require"] },
};

// ---- the rows and pins ----

interface Pin {
  readonly id: string;
  /** The unmet item of its refusal that names the member. */
  readonly unmet: string;
  /** The helper function whose code the member's edit changes. */
  readonly at: string;
  /** The shape of the member's edit, read from its find and replace (ANCHOR): an inserted line, a rewritten line or an added clause. */
  readonly kind: string;
  /** The line the edit inserts, the line as it rewrites it, or the clause it adds, as the refusal's verdict quotes it. */
  readonly quote: string;
  /** The member's edit as this census applies it, a find and its replace (copied from its gate's archived member table; that copy is
   * NOT CLAIMED beyond the quote ANCHOR reads). */
  readonly find: string;
  readonly repl: string;
  /** Every page the member's edit reads apart, in page order. */
  readonly witnesses: readonly string[];
  /** Pages its pin case reads beside its witnesses, each reading as written under the member (its REPLAY case checks it); that
   * they are the twins its gate named is NOT CLAIMED. */
  readonly held: readonly string[];
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}
const ROWS: readonly Row[] = [
  {
    id: "R3",
    label: "wb-pyel.9's refusal #3 members (gate-prep-11, run g10-gate-s181), which wb-pyel.11's description carries",
    pins: [
      {
        id: "GP11-01",
        unmet: "U1",
        at: "calleeName",
        kind: "an inserted line",
        quote: "  if (ts.isExpressionWithTypeArguments(call.expression)) return undefined;",
        find: "export function calleeName(call: ts.CallExpression): string | undefined {\n  const callee = unwrap(call.expression);\n",
        repl: "export function calleeName(call: ts.CallExpression): string | undefined {\n  const callee = unwrap(call.expression);\n  if (ts.isExpressionWithTypeArguments(call.expression)) return undefined;\n",
        witnesses: ["w-gp11-01-callee-exec", "w-gp11-02-callee-require", "w-l2-01a-elem-inst-exec", "w-l2-01b-template-inst-exec", "w-l2-01c-elem-inst-require", "w-l2-01d-elem-inst-label", "w-l2-01e-escaped-inst-exec", "w-l2-04a-held-elem-inst-optcall", "t-l2-04-held-prop-inst-optcall"],
        held: ["t-gp11-01-callee-exec-paren", "t-gp11-01b-callee-exec-plain", "t-gp11-02-callee-require-paren"],
      },
      {
        id: "GP11-02",
        unmet: "U1",
        at: "isLoaderCall",
        kind: "a rewritten line",
        quote: "const callee = (ts.isExpressionWithTypeArguments(node.expression) ? node.expression : unwrap(node.expression));",
        find: "  const callee = unwrap(node.expression);\n  return (ts.isCallExpression(callee) && LOADER_FACTORIES.includes(calleeName(callee) ?? \"\")) || (ts.isIdentifier(callee) && loaderNames(source).has(callee.text));",
        repl: "  const callee = (ts.isExpressionWithTypeArguments(node.expression) ? node.expression : unwrap(node.expression));\n  return (ts.isCallExpression(callee) && LOADER_FACTORIES.includes(calleeName(callee) ?? \"\")) || (ts.isIdentifier(callee) && loaderNames(source).has(callee.text));",
        witnesses: ["w-gp11-03-factory-call", "w-gp11-04-bound-loader", "w-gp11-05-factory-label"],
        held: ["t-gp11-03-factory-call-paren", "t-gp11-04-bound-loader-paren", "t-gp11-05-factory-label-paren"],
      },
      {
        id: "GP11-03",
        unmet: "U2",
        at: "loaderLabel",
        kind: "a rewritten line",
        quote: "const callee = (ts.isExpressionWithTypeArguments(call.expression) ? call.expression : unwrap(call.expression));",
        find: "  if (call.expression.kind === ts.SyntaxKind.ImportKeyword) return \"import()\";\n  const callee = unwrap(call.expression);\n  return ts.isCallExpression(callee)",
        repl: "  if (call.expression.kind === ts.SyntaxKind.ImportKeyword) return \"import()\";\n  const callee = (ts.isExpressionWithTypeArguments(call.expression) ? call.expression : unwrap(call.expression));\n  return ts.isCallExpression(callee)",
        witnesses: ["w-gp11-05-factory-label"],
        held: ["t-gp11-05-factory-label-paren"],
      },
    ],
  },
  {
    id: "R4",
    label: "wb-pyel.9's refusal #4 members (gate-prep-8, run g10-gate-s187), which R-B336 folded into wb-pyel.11's notes",
    pins: [
      {
        id: "L2-01i",
        unmet: "U1",
        at: "calleeName",
        kind: "an inserted line",
        quote: "  if (ts.isExpressionWithTypeArguments(call.expression) && ts.isElementAccessExpression(call.expression.expression)) return undefined;",
        find: "export function calleeName(call: ts.CallExpression): string | undefined {\n  const callee = unwrap(call.expression);\n",
        repl: "export function calleeName(call: ts.CallExpression): string | undefined {\n  const callee = unwrap(call.expression);\n  if (ts.isExpressionWithTypeArguments(call.expression) && ts.isElementAccessExpression(call.expression.expression)) return undefined;\n",
        witnesses: ["w-l2-01a-elem-inst-exec", "w-l2-01b-template-inst-exec", "w-l2-01c-elem-inst-require", "w-l2-01d-elem-inst-label", "w-l2-01e-escaped-inst-exec", "w-l2-04a-held-elem-inst-optcall"],
        held: ["t-l2-01a-elem-inst-paren", "t-l2-01b-template-inst-paren", "t-l2-01c-elem-inst-require-paren", "t-l2-01d-elem-inst-label-paren"],
      },
      {
        id: "L2-02",
        unmet: "U2",
        at: "calleeName",
        kind: "an inserted line",
        quote: "  if (call.questionDotToken !== undefined && ts.isElementAccessExpression(callee)) return undefined;",
        find: "export function calleeName(call: ts.CallExpression): string | undefined {\n  const callee = unwrap(call.expression);\n",
        repl: "export function calleeName(call: ts.CallExpression): string | undefined {\n  const callee = unwrap(call.expression);\n  if (call.questionDotToken !== undefined && ts.isElementAccessExpression(callee)) return undefined;\n",
        witnesses: ["w-l2-01a-elem-inst-exec", "w-l2-01b-template-inst-exec", "w-l2-01c-elem-inst-require", "w-l2-01d-elem-inst-label", "w-l2-01e-escaped-inst-exec", "t-l2-01a-elem-inst-paren", "t-l2-01b-template-inst-paren", "t-l2-01c-elem-inst-require-paren", "t-l2-01d-elem-inst-label-paren", "w-l2-02a-elem-opt-exec", "w-l2-02b-template-opt-exec", "w-l2-02c-elem-opt-require", "w-l2-02d-escaped-opt-exec", "w-l2-02e-escaped-opt-require", "w-l2-04a-held-elem-inst-optcall", "w-l2-06a-held-elem-optcall", "w-l2-06b-import-elem-optcall"],
        held: ["t-l2-02a-elem-plain-exec", "t-l2-02c-elem-plain-require", "t-l2-06-held-elem-call"],
      },
      {
        id: "L2-03",
        unmet: "U3",
        at: "calleeName",
        kind: "an inserted line",
        quote: "  if (call.typeArguments !== undefined && ts.isElementAccessExpression(callee)) return undefined;",
        find: "export function calleeName(call: ts.CallExpression): string | undefined {\n  const callee = unwrap(call.expression);\n",
        repl: "export function calleeName(call: ts.CallExpression): string | undefined {\n  const callee = unwrap(call.expression);\n  if (call.typeArguments !== undefined && ts.isElementAccessExpression(callee)) return undefined;\n",
        witnesses: ["w-l2-03a-elem-targs-exec", "w-l2-03b-template-targs-exec", "w-l2-03c-elem-targs-require", "w-l2-03d-escaped-targs-exec", "w-l2-07a-held-elem-targs-call"],
        held: ["t-l2-02a-elem-plain-exec"],
      },
      {
        id: "L2-04i",
        unmet: "U4",
        at: "consume",
        kind: "an inserted line",
        quote: "if (isInstantiation(at) && ts.isElementAccessExpression(at.expression)) at = at.expression;",
        find: "    for (let wrapper = at.parent; (isWrapper(wrapper) || ts.isAwaitExpression(wrapper)) && wrapper.expression === at; wrapper = at.parent) at = wrapper;\n    const parent = at.parent;\n",
        repl: "    for (let wrapper = at.parent; (isWrapper(wrapper) || ts.isAwaitExpression(wrapper)) && wrapper.expression === at; wrapper = at.parent) at = wrapper;\n    if (isInstantiation(at) && ts.isElementAccessExpression(at.expression)) at = at.expression;\n    const parent = at.parent;\n",
        witnesses: ["w-l2-04a-held-elem-inst-optcall"],
        held: ["w-l2-04b-held-elem-inst-paren-call", "t-l2-04-held-prop-inst-optcall"],
      },
      {
        id: "L2-06",
        unmet: "U4",
        at: "consume",
        kind: "an added clause",
        quote: " && !(parent.questionDotToken !== undefined && ts.isElementAccessExpression(at))",
        find: "    } else if (ts.isCallExpression(parent) && parent.expression === at) {\n      const member = path.length === 1 ? path[0] : undefined;",
        repl: "    } else if (ts.isCallExpression(parent) && parent.expression === at && !(parent.questionDotToken !== undefined && ts.isElementAccessExpression(at))) {\n      const member = path.length === 1 ? path[0] : undefined;",
        witnesses: ["w-l2-06a-held-elem-optcall", "w-l2-06b-import-elem-optcall"],
        held: ["t-l2-06-held-elem-call", "t-l2-06b-import-elem-call", "t-l2-06c-import-prop-optcall"],
      },
      {
        id: "L2-07",
        unmet: "U4",
        at: "consume",
        kind: "an added clause",
        quote: " && !(parent.typeArguments !== undefined && ts.isElementAccessExpression(at))",
        find: "    } else if (ts.isCallExpression(parent) && parent.expression === at) {\n      const member = path.length === 1 ? path[0] : undefined;",
        repl: "    } else if (ts.isCallExpression(parent) && parent.expression === at && !(parent.typeArguments !== undefined && ts.isElementAccessExpression(at))) {\n      const member = path.length === 1 ? path[0] : undefined;",
        witnesses: ["w-l2-07a-held-elem-targs-call"],
        held: ["t-l2-06-held-elem-call"],
      },
    ],
  },
];
const PINS: readonly Pin[] = ROWS.flatMap(row => row.pins);

// ---- the readers: the landed helper, and a helper source compiled the replay's way ----

interface Readers {
  readonly moduleReading: typeof moduleReading;
  readonly parseSource: typeof parseSource;
}
const LANDED: Readers = { moduleReading, parseSource };
function pageOf(id: string): Page {
  const page = PAGES[id];
  if (page === undefined) throw new Error(`${id}: no such page`);
  return page;
}
/** The lines a readers module reads for a page, copied into this realm's array. */
function readingOf(readers: Readers, id: string): string[] {
  const path = `pages/${id}.ts`;
  return Array.from(readers.moduleReading(path, readers.parseSource(path, pageOf(id).text)), line => String(line));
}
/** The pages a readers module reads apart from the lines written for them, in page order. */
function apartUnder(readers: Readers): string[] {
  return Object.keys(PAGES).filter(id => JSON.stringify(readingOf(readers, id)) !== JSON.stringify(pageOf(id).reading));
}
const helperSource = (): string => readFileSync(join(REPO, HELPER), "utf8");
/** The readers a helper source compiles to: CommonJS from transpileModule, run in a fresh vm context whose require hands it this
 * file's own typescript. */
function compiled(source: string): Readers {
  const output = ts.transpileModule(source, { fileName: HELPER, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const requireOf = (specifier: string): unknown => {
    if (specifier !== "typescript") throw new Error(`the helper imports ${specifier}, which the replay does not hand it`);
    return ts;
  };
  const exported: Record<string, unknown> = {};
  runInNewContext(output, { exports: exported, require: requireOf, module: { exports: exported } }, { filename: `${HELPER}.replay.js`, timeout: 10_000 });
  const read = exported.moduleReading;
  const parse = exported.parseSource;
  if (typeof read !== "function" || typeof parse !== "function") throw new Error("the compiled helper exports no moduleReading or no parseSource");
  return { moduleReading: read as typeof moduleReading, parseSource: parse as typeof parseSource };
}
function occurrences(text: string, part: string): number {
  return text.split(part).length - 1;
}
/** The name of the innermost function holding a span of a source: a function declaration's name, or the const an arrow or function
 * expression initializes ("<module>" outside every function). */
function holderOf(source: ts.SourceFile, start: number, end: number): string {
  let name = "<module>";
  const climb = (node: ts.Node): void => {
    if (node.getStart(source) > start || node.getEnd() < end) return;
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) name = node.name.text;
    else if ((ts.isArrowFunction(node) || ts.isFunctionExpression(node)) && ts.isVariableDeclaration(node.parent) && ts.isIdentifier(node.parent.name)) name = node.parent.name.text;
    ts.forEachChild(node, climb);
  };
  climb(source);
  return name;
}
/** The syntactic diagnostics TypeScript reports for a module text, as TS codes. */
function syntaxErrors(text: string): string[] {
  const diagnostics = ts.transpileModule(text, { reportDiagnostics: true, compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).diagnostics ?? [];
  return diagnostics.map(diagnostic => `TS${diagnostic.code}`);
}

// ---- the tracker export ----

/** Beads' descriptions and notes in the tracker export, read once (a line is parsed only when it holds the bead's id field). */
function exportRows(ids: readonly string[]): Map<string, { description: string; notes: string }> {
  const found = new Map<string, { description: string; notes: string }>();
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    const id = ids.find(entry => line.includes(`"id":${JSON.stringify(entry)}`));
    if (id === undefined) continue;
    const row: unknown = JSON.parse(line);
    if (typeof row === "object" && row !== null && "id" in row && row.id === id && !found.has(id)) {
      const description = "description" in row && typeof row.description === "string" ? row.description : "";
      const notes = "notes" in row && typeof row.notes === "string" ? row.notes : "";
      found.set(id, { description, notes });
    }
  }
  for (const id of ids) if (!found.has(id)) throw new Error(`the tracker export holds no row ${id}`);
  return found;
}
/** The text between an opening and the first close after it ("" when either is absent). */
function between(text: string, open: string, close: string): string {
  const start = text.indexOf(open);
  if (start < 0) return "";
  const end = text.indexOf(close, start + open.length);
  return end < 0 ? "" : text.slice(start + open.length, end);
}
/** Each member id the item lines name, in order, led by its line's unmet item ('U<n> <id>'; an id's trailing I read as i). */
function namedIn(lines: readonly string[], ids: RegExp): string[] {
  return lines.flatMap(line => (line.match(ids) ?? []).map(id => `${/U\d+/.exec(line)?.[0] ?? "<none>"} ${id.replace(/I$/, "i")}`));
}
/** A member id in the tracker records: GP11-<two digits> or L2-<two digits>, one trailing letter kept, with neither a word
 * character nor '-' on either side. */
const MEMBER_ID = /(?<![\w-])(?:GP11|L2)-\d\d[A-Za-z]?(?![\w-])/g;
/** The last member id a line names before an offset ("<none>" when it names none there). */
function lastMemberIdBefore(line: string, end: number): string {
  let last = "<none>";
  for (const match of line.slice(0, Math.max(0, end)).matchAll(MEMBER_ID)) last = match[0];
  return last;
}
/** The shape of a pin's edit, read from its find and replace: "an inserted line" when the replace is the find with one line
 * inserted whose text, blanks at its ends aside, is the quote; "a rewritten line" when exactly one line of the find changes and
 * the new line's text, blanks at its ends aside, is the quote; "an added clause" when exactly one line of the find changes and the
 * new line is the old one with the quote inserted once; "<other>" for any other edit. */
function editShape(pin: Pin): string {
  const before = pin.find.split("\n");
  const after = pin.repl.split("\n");
  if (after.length === before.length + 1) {
    const at = after.findIndex((line, index) => line !== before[index]);
    if (at < 0) return "<other>";
    const kept = [...after.slice(0, at), ...after.slice(at + 1)].join("\n");
    return kept === pin.find && after[at].trim() === pin.quote.trim() ? "an inserted line" : "<other>";
  }
  if (after.length !== before.length) return "<other>";
  const changed = after.flatMap((line, index) => (line === before[index] ? [] : [index]));
  if (changed.length !== 1) return "<other>";
  const now = after[changed[0]];
  const was = before[changed[0]];
  if (now.trim() === pin.quote.trim()) return "a rewritten line";
  const cut = now.indexOf(pin.quote);
  return cut >= 0 && occurrences(now, pin.quote) === 1 && now.slice(0, cut) + now.slice(cut + pin.quote.length) === was ? "an added clause" : "<other>";
}

// ---- the cases ----

const TITLES = {
  shape: "SHAPE: the rows, the pins with their unmet items and page counts, and the page ids are the frozen literals; every page is listed by a pin and parses with no syntactic diagnostic",
  header: "HEADER: the PIN ROSTER block of this file's header equals the lines the rows and pins compose",
  anchor: "ANCHOR: row R3's pins are wb-pyel.11's description's, row R4's R-B336's fold's, each pin's quote the one wb-pyel.9's notes record with its own member id the last before it, each pin's kind its edit's shape, and each find lies once in the helper function its pin names",
  control: "REPLAY CONTROL: the helper's own source, compiled and run the replay's way, reads every page exactly as written",
  registration: "REGISTRATION: the registered tests are these cases in this order, each ran in run mode before this one, and every pin case completed its compares",
} as const;
const pinTitle = (pin: Pin): string => `${pin.id} (${pin.unmet}): its ${pin.witnesses.length} witnesses and ${pin.held.length} held pages each read exactly the lines written for them`;
const replayTitle = (pin: Pin): string => `${pin.id} REPLAY: its edit occurs once in the helper's source and, applied, reads exactly its ${pin.witnesses.length} witnesses apart and every other page as written`;
const REACHED: string[] = [];

describe("wb-pyel.11 EDC static-reach callee members census (test/helpers/edc-static-reach-readers.ts): 9 pin cases holding the literal moduleReading of each carried wb-pyel.9 refusal #3 or #4 member's witness and held pages, and 9 REPLAY cases reading exactly each member's witnesses apart, with SHAPE, HEADER, ANCHOR, REPLAY CONTROL and REGISTRATION", () => {
  it(TITLES.shape, { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["R3:3", "R4:6"]);
    expect(PINS.map(pin => `${pin.id}:${pin.unmet}:${pin.witnesses.length}:${pin.held.length}`)).toEqual(["GP11-01:U1:9:3", "GP11-02:U1:3:3", "GP11-03:U2:1:1", "L2-01i:U1:6:4", "L2-02:U2:17:3", "L2-03:U3:5:1", "L2-04i:U4:1:2", "L2-06:U4:2:3", "L2-07:U4:1:1"]);
    expect(Object.keys(PAGES)).toEqual(["w-gp11-01-callee-exec", "w-gp11-02-callee-require", "t-gp11-01-callee-exec-paren", "t-gp11-01b-callee-exec-plain", "t-gp11-02-callee-require-paren", "w-gp11-03-factory-call", "w-gp11-04-bound-loader", "w-gp11-05-factory-label", "t-gp11-03-factory-call-paren", "t-gp11-04-bound-loader-paren", "t-gp11-05-factory-label-paren", "w-l2-01a-elem-inst-exec", "w-l2-01b-template-inst-exec", "w-l2-01c-elem-inst-require", "w-l2-01d-elem-inst-label", "w-l2-01e-escaped-inst-exec", "t-l2-01a-elem-inst-paren", "t-l2-01b-template-inst-paren", "t-l2-01c-elem-inst-require-paren", "t-l2-01d-elem-inst-label-paren", "w-l2-02a-elem-opt-exec", "w-l2-02b-template-opt-exec", "w-l2-02c-elem-opt-require", "w-l2-02d-escaped-opt-exec", "w-l2-02e-escaped-opt-require", "t-l2-02a-elem-plain-exec", "t-l2-02c-elem-plain-require", "w-l2-03a-elem-targs-exec", "w-l2-03b-template-targs-exec", "w-l2-03c-elem-targs-require", "w-l2-03d-escaped-targs-exec", "w-l2-04a-held-elem-inst-optcall", "w-l2-04b-held-elem-inst-paren-call", "t-l2-04-held-prop-inst-optcall", "w-l2-06a-held-elem-optcall", "w-l2-06b-import-elem-optcall", "t-l2-06-held-elem-call", "t-l2-06b-import-elem-call", "t-l2-06c-import-prop-optcall", "w-l2-07a-held-elem-targs-call"]);
    const listed = new Set(PINS.flatMap(pin => [...pin.witnesses, ...pin.held]));
    expect(Object.keys(PAGES).filter(id => !listed.has(id)), "every page is listed by a pin").toEqual([]);
    expect([...listed].filter(id => PAGES[id] === undefined), "every listed page is a page").toEqual([]);
    for (const pin of PINS) {
      expect(pin.witnesses.filter(id => pin.held.includes(id)), `${pin.id}: no page is both its witness and its held page`).toEqual([]);
      expect(pin.witnesses, `${pin.id}: its witnesses stand in page order`).toEqual(Object.keys(PAGES).filter(id => pin.witnesses.includes(id)));
    }
    for (const [id, page] of Object.entries(PAGES)) expect(syntaxErrors(page.text), `${id} parses with no syntactic diagnostic`).toEqual([]);
  });

  it(TITLES.header, () => {
    const lines = readFileSync(SELF, "utf8").split("\n");
    const start = lines.indexOf(" * PIN ROSTER");
    expect(start, "the header holds a PIN ROSTER block").toBeGreaterThan(0);
    const end = lines.findIndex((line, index) => index > start && line === " *");
    const composed = ROWS.flatMap(row => [
      ` *   ${row.id} (${row.label}): ${row.pins.length} pins`,
      ...row.pins.map(pin => ` *     ${pin.id} (${pin.unmet}; ${pin.at}, ${pin.kind} '${pin.quote.trim()}'): witnesses ${pin.witnesses.join(", ")}; held ${pin.held.join(", ")}`),
    ]);
    expect(lines.slice(start + 1, end), "the PIN ROSTER block is the rows' and pins' lines").toEqual(composed);
  });

  it(TITLES.anchor, { timeout: 60_000 }, () => {
    const rows = exportRows([BEAD, PARENT]);
    const own = rows.get(BEAD) ?? { description: "", notes: "" };
    const parent = rows.get(PARENT) ?? { description: "", notes: "" };
    const r3 = between(own.description, UNMET_OPEN, UNMET_CLOSE)
      .split("\n")
      .filter(line => /^- U\d+-/.test(line));
    const r4 = between(own.notes, FOLD_OPEN, FOLD_CLOSE)
      .split("\n")
      .filter(line => /^U\d+-/.test(line));
    expect([r3.length > 0, r4.length > 0], "wb-pyel.11's description lists refusal #3's unmet items and its notes carry R-B336's fold").toEqual([true, true]);
    const pinsOf = (row: string): string[] => (ROWS.find(entry => entry.id === row)?.pins ?? []).map(pin => `${pin.unmet} ${pin.id}`);
    expect(pinsOf("R3"), "row R3's pins and unmet items are the ones wb-pyel.11's description lists").toEqual(namedIn(r3, /\bGP11-\d\d\b/g));
    expect(pinsOf("R4"), "row R4's pins and unmet items are the ones R-B336's fold lists").toEqual(namedIn(r4, /\bL2-\d\dI?\b/g));
    const parentLines = parent.notes.split("\n");
    const helper = helperSource();
    const source = ts.createSourceFile(HELPER, helper, ts.ScriptTarget.Latest, true);
    for (const pin of PINS) {
      const quoted = `'${pin.quote}'`;
      const line = parentLines.find(entry => entry.includes(quoted)) ?? "";
      expect(lastMemberIdBefore(line, line.indexOf(quoted)), `${pin.id}: the first line of wb-pyel.9's notes quoting its edit names it as the last member id before the quote`).toBe(pin.id);
      expect([pin.repl.includes(pin.quote), pin.find.includes(pin.quote)], `${pin.id}: its replace holds its quote and its find does not`).toEqual([true, false]);
      expect(editShape(pin), `${pin.id}: its kind names its edit's shape`).toBe(pin.kind);
      expect(occurrences(helper, pin.find), `${pin.id}: its find occurs once in the helper's source`).toBe(1);
      const at = helper.indexOf(pin.find);
      expect(holderOf(source, at, at + pin.find.length), `${pin.id}: its find lies in the helper's ${pin.at}`).toBe(pin.at);
    }
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pinTitle(pin), () => {
          for (const id of [...pin.witnesses, ...pin.held]) expect(readingOf(LANDED, id), `${pin.id}: page ${id}`).toEqual([...pageOf(id).reading]);
          REACHED.push(pin.id);
        });
      }
    });
  }

  it(TITLES.control, { timeout: 60_000 }, () => {
    expect(apartUnder(compiled(helperSource())), "the pages the unedited source reads apart").toEqual([]);
  });

  for (const pin of PINS) {
    it(replayTitle(pin), { timeout: 60_000 }, () => {
      const source = helperSource();
      expect(occurrences(source, pin.find), `${pin.id}: its find occurs once in the helper's source`).toBe(1);
      const apart = apartUnder(compiled(source.replace(pin.find, () => pin.repl)));
      expect(apart, `${pin.id}: the pages its edit reads apart`).toEqual([...pin.witnesses]);
      expect(
        pin.held.filter(id => apart.includes(id)),
        `${pin.id}: its held pages read as written under its edit`,
      ).toEqual([]);
    });
  }

  it(TITLES.registration, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walkTasks = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walkTasks(child.tasks);
      }
    };
    walkTasks(task.file.tasks);
    const expected = [TITLES.shape, TITLES.header, TITLES.anchor, ...PINS.map(pinTitle), TITLES.control, ...PINS.map(replayTitle), TITLES.registration];
    expect(
      walked.map(entry => entry.name),
      "every registered test of this file (the vitest task tree), exactly and in order",
    ).toEqual(expected);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin case completed its compares, in row order").toEqual(PINS.map(pin => pin.id));
  });
});
