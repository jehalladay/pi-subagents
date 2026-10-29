/**
 * wb-tz2.9 (HX-ORIGINAL-GOALS-CLOSURE-R9, program-triage-2026-10-17), the HX licensed-complete witness census: the STANDING leg.
 * Statement (bead description, verbatim): "When a Pi-runnable fixture exists where SDK find returns licenses_absence:true from a
 * fresh hx (HXGC-EPI-002 DESIGN requirements.jsonl:6@6ed14cab8d; GC-D10 14-decisions-and-migration.md:16), Pi shall add one live
 * licensed-complete/known-empty witness to the native tier, asserted through the R1 invariant predicate; until then the
 * licensed-complete branch remains explicitly fixture-labelled."
 * Acceptance (description, verbatim): "Standing: tier labels stay explicit - the docs/14 HX row
 * (docs/workbench/14-qa-and-benchmarks.md:25@9df9a03) is bound by the wb-cax.25 census; fixture passes are never counted as native
 * evidence (TRACEABILITY.md:76)." and "On landing: a native-tier test drives the fixture workspace through nativeHyperUnixFind and
 * asserts the R1 predicate holds AND coverage reads complete/known-empty with the runtime licence present; the run lands as a NEW
 * TRACEABILITY receipt row (R13 discipline)." (The description's dash after "explicit" is an em dash; this comment writes a hyphen.)
 *
 * GATE: ABSENT at the cut. Measured read-only by the cutting seat (2026-10-28, recorded in the roster's gate block; this census
 * never launches hx and never reads HyperUnix-CLI): the installed hx (0.1.0, unstamped, binary sha-256 451221852d24...) answers
 * every live hx.fs find with coverage opportunistic, cause other:No_change_exclusion and no licence - over this workspace's src,
 * an empty src and a one-file src alike, through the SDK exactly as nativeHyperUnixFind calls it - and the strict policy exits 3
 * (HX-COVERAGE-INCOMPLETE); a pinned view is refused (--view git:HEAD: HX-VIEW-013, "hx find binds no view in this build").
 * HyperUnix-CLI 166963a04c src/hx_cli/cmd_observer.ml:385-390 states it as a constant of the build: every live listing reads
 * opportunistic, nothing licenses absence, and a Strict listing exits 3, until the RB-013 change-exclusion probe (hu-xt1.1)
 * establishes a witness. No Pi-runnable fixture licenses absence, so the "On landing" leg is NOT delivered and NOT claimed here:
 * no live witness, no fixture workspace and no receipt row. Re-measured at cut #2 (2026-10-29, the roster's gate.remeasured) on a
 * newly installed build of the same version string (binary sha-256 fa81093d2bb3...): unchanged - nativeHyperUnixFind reads
 * incomplete, opportunistic and unlicensed over an empty src, a one-file src and this checkout. At cut #3 the installed binary is
 * that same build (sha-256 fa81093d2bb3...), so no new probe was owed.
 *
 * ROWS (W, S, T and N: each label is one clause of the bead's own text, read back from the tracker export, and each pin's quote
 * tiles its label; Q: the residual families of the census's three readers, anchored in docs/14):
 *  W, the obligation, armed and pending. W1: the native-read tier (forge.toml native-read names vitest.native.config.ts) and its HX
 *    live set as the LIVE SET reader below reads it - the files that bind an HX entry in a MEMBERSHIP form - with each live file's
 *    HX cases and their registration chains, the HX cases whose body states a claim in a READ SET form (none today), every HX
 *    module mention and every HX reference the reader cannot place (FAIL CLOSED: both lists empty today), and the reading of every
 *    LIVE SET form. W2: the R1 route as the ROUTE reader below reads it - each live file's route chains, each chain's text and the
 *    case holding it, and the reading of every ROUTE form - and the predicate, fed through the registered provider path with every
 *    execution kind under both licence states (the EXCLUSIVITY matrix), licenses absence on exactly the runtime-licensed complete
 *    and complete-empty readings and on no other reading; the projection of the licensed complete-empty reading reads complete
 *    coverage and the known-empty text. The scanner's claim vocabulary is DERIVED there, from the predicate, the projection and the
 *    adapter's consumed-field list: the verdict field that flips, the licence field whose flip un-licenses, the kinds that license
 *    (the matrix's licensed column) and the projection's coverage and first status word.
 *  S, until then. S1: no file of the native-read tier states a licensed-complete claim in a READ SET form; the scanner flags every
 *    falsifier and every conservative row and no benign statement; and over docs/14's HX default-gate evidence cases (outside this
 *    file) it reads a claim in the body of each positive-half case and none in the negative-half case. S2: the docs/14 evidence
 *    table carries every HX row of the positive half (the licensed-complete branch: "complete query and bounded result") on the
 *    default-gate tier; the section carries no HTML, and its non-table blocks are exactly its lead paragraph as the roster pins it,
 *    rendered text and source markdown alike (slice equality: the paragraph holds the sentence that no row of the table is read as
 *    a live, native or scale pass, so any edit of that sentence, or a block added beside the table, reds S2).
 *  T, tier labels. T1: every HX evidence row's tier names the config that selects its file and the default config agrees
 *    (default-gate: vitest.config.ts selects it and the native-read config does not; native-read: the reverse), and its case is
 *    registered there by its verbatim title, through the registration chain the roster pins (REGISTRATION below). T2: the line its
 *    quote cites (git show 9df9a03, line 25) is the current HX row of the "Matrix by subsystem" table, cell for cell. T3: the
 *    complete gate runs a census step that resolves to vitest.census.config.ts, which selects exactly one file whose lead opens with
 *    the bead id its quote names (wb-cax.25: test/workbench-subsystem-matrix.census.ts), and that file carries the "Matrix by
 *    subsystem" heading as a string literal.
 *  N, never counted. N1: the one sentence of TRACEABILITY.md:76 that carries "do not count it as native evidence" is the roster's,
 *    verbatim; the default config selects no native-read file, and the native-read config selects no file of S2's fixture cases.
 *  Q, the residual families (RESIDUALS): each a pin whose every member reads quiet to its family's reader.
 *
 * LIVE SET (W1's reader; W2 reads the files it reads live). Active code only: comments are trivia. An HX MODULE is a module
 * specifier naming the provider module (a path ending in providers/hyperunix, bare or with a .js, .ts, .mjs, .cjs, .mts or .cts
 * extension) or the SDK package root (@hyperunix/sdk). An HX ENTRY is a function export of src/workbench/providers/hyperunix.ts or
 * the SDK's HyperUnix client (W1's entryPoints, read from both modules). An HX LOCAL is a name one of these MEMBERSHIP forms binds:
 *   M1 a static import of an entry by its exported name, from any module (named; a type-only import included);
 *   M2 the same under another local name (aliased);
 *   M3 a static namespace import of an HX module (namespace), and M4 its default import (default);
 *   M5 a dynamic import() of an HX module by a literal specifier, awaited or not: bound whole to a name (dynamic), destructured
 *      into entries (destructured), or used in place (inline: no local, the call itself is the reference);
 *   M6 an alias, to any depth: a variable declared from an HX local, from an entry member of an M3, M4 or M5 local, or
 *      destructured from such a local; or a name assigned so (=, ||=, &&=, ??=, anywhere, a case body included), a destructuring
 *      assignment from such a local included (alias); or a member store - an assignment of one to a member of a value, whose
 *      root name then reads as an HX local (store).
 * A file is LIVE when it binds an HX local or holds an M5 import. REGISTRATION: a CASE is a call whose callee is a test API - it or
 * test, bare or imported from vitest under any local name, or a variable declared from a test API - extended by any number of
 * vitest's case flags (CASE_FLAGS) and calls of its case methods (CASE_METHODS), in any order. Those two lists and the members that
 * register no case (NON_CASE_MEMBERS: the suite switch and the hooks) partition vitest's own test-API members (REGISTRATION_MEMBERS
 * of test/helpers/census.ts, pinned against the installed vitest there), and this file derives the same partition from vitest's
 * runtime objects. A case's title is its first argument (a literal; any other expression is recorded as computed), its body the
 * first function argument after it; its registration chain is the callee's text with the arguments beside the title and the body (an
 * options object, a timeout), whitespace removed. An HX CASE is a case whose body references an HX local or holds an M5 import. FAIL
 * CLOSED: a string literal naming an HX module that is neither a static import's specifier nor an M5 import()'s is UNRESOLVED (a
 * require, a vi.importActual, a held specifier, an export-from, an import.meta.resolve), and so is an M5 or M6 binding or assignment
 * pattern with an element the reader cannot name; a REFERENCE to an HX local (an identifier, type positions included; never a
 * binding site - the name a declaration, parameter or binding element introduces, or its property key) or an M5 import that lies
 * outside every case body and outside its own import, binding or assignment is OUTSIDE (a hook, a describe body, a helper or a named
 * function, a fixture, a table, an array or other value holding it, a registration through an unread form). W1 pins both lists
 * empty, so an HX entry driven in a native-read file in a form this reader does not read reds W1. FORMS: every membership,
 * registration and fail-closed form above has its own falsifier in LIVE_FORMS (each membership and registration falsifier reads live
 * with the HX cases it registers - one, or two for a form that carries the entry from one case into another - and nothing unresolved
 * or outside; each fail-closed falsifier reads something unresolved or outside), beside controls that read quiet (not live, no case,
 * nothing unresolved or outside): no HX import, a non-entry SDK import, a non-entry provider import, an entry named only in a
 * comment or a title, a side-effect import.
 * ROUTE (W2's reader). A ROUTE is a chain whose head is expect(...) or expect.soft(...) of a direct call of hxLiveInvariant (the bare
 * name: a verdict held in a variable or the predicate under another name is no route); the reader records the whole chain's text,
 * whitespace removed, and the title of the innermost case holding it (null outside every case). W2 pins one route per live file,
 * in its HX case, the same chain in both. Every ROUTE_FORMS hollowing (negated, bare, another matcher, another expected object,
 * soft, another subject, outside the case, twice, an aliased predicate, a held verdict) reads a route list other than the intact
 * form's, and the intact form reads the live files' chain.
 * EXCLUSIVITY (W2's matrix): every HYPERUNIX_EXECUTION_KINDS member, runtime-licensed and unlicensed, as an SDK document through the
 * registered provider path and then the predicate: its holds and absenceLicensed, pinned cell for cell.
 *
 * READ SET (S1's scanner, and W1's over a case body). Active code only: comments are trivia. UNWRAP: every value, key, subject and
 * path is read through parentheses, `as`, `satisfies`, the non-null `!` and a `<T>` assertion, any number of them in any order. A
 * VALUE is read only as a literal: true, false, a string literal or an untagged no-substitution template. A KEY is an identifier,
 * a string or numeric literal, or a computed key whose expression is a string value. A MEMBER is `.name`, or `['name']` with a
 * string value. A subject's LEAF is the last member of an access (optional chaining included) or a bare identifier. A CHAIN is a
 * head - `expect(...)` or `expect.soft(...)` - then any number of `.not`, `.resolves` and `.rejects` members, then a matcher member
 * called; it is NEGATED when it carries an odd number of `.not`. POLARITY: a literal inside a chain's head arguments or matcher
 * arguments takes that chain's own negation (a chain nested inside another chain is read on its own); inside the arguments of
 * `expect.<name>(...)` it keeps the enclosing polarity and inside `expect.not.<name>(...)` it flips it; anywhere else it is
 * positive. A PAIRING is the verdict or licence field with true (positive) or with false (negated), `kind` with a licensing kind
 * (positive) or `coverage` with the coverage word (positive). The claims:
 *   C1 a property whose key and value make a pairing, anywhere in active code: `key: value` in an object literal, `key = value`
 *      as a class field, or an assignment `<target>.key = value` (or `<target>['key'] = value`);
 *   C2 a toBe, toEqual or toStrictEqual chain whose subject's leaf and argument value make a pairing, either way round (the leaf
 *      on the subject and the value as the argument, or the leaf on the argument and the value as the subject);
 *   C3 a toBeTruthy chain (not negated) or a toBeFalsy chain (negated) whose subject's leaf is the verdict or licence field;
 *   C4 a toHaveProperty(path, value) chain whose path's last segment (a dotted string's last dot segment, or an array literal's last
 *      element) and value make a pairing;
 *   C5 a string literal, template part or regular-expression literal in a positive place whose text, lower-cased (for a regular
 *      expression, its pattern with every backslash removed), contains the known-empty word.
 * The vocabulary (verdict and licence fields, licensing kinds, coverage word, known-empty word) is derived from src (W2).
 * CONSERVATIVE READINGS, each a pinned row the scanner flags: prose is never parsed, so a positive literal carrying the word reds even
 * when its words deny it (a title, a message); a literal is read where it is written, never where a variable carries it; a chain
 * nested in another chain is read on its own polarity; only expect chains and asymmetric matchers negate; and a literal inside a
 * negated chain's head arguments takes that negation even inside a callback (a false verdict under not.toThrow reds).
 * RESIDUALS (named families a reader does not read, each member a pinned quiet row; outside this file, docs/14's table "HX
 * licensed-complete census residuals" holds every family, its quiet row and every member, both ways and in order). The scanner's: Q1
 * R-RUNTIME-VALUE (a value, a key or a subject's leaf computed or carried at run time rather than written: an operator, a call, a
 * binding, a shorthand property, a getter, a promise subject), Q2 R-HELPER (a claim made inside a helper defined outside the
 * native-read files), Q3 R-OTHER-API (a C2-C4 claim through another assertion API or name: assert, expect.poll, an aliased expect),
 * Q4 R-OTHER-MATCHER (a pairing through a matcher C2-C4 do not read: toSatisfy, toMatch, toContain, toBeOneOf, or the value as the
 * subject of toContain; C1 properties and C5 text stay read inside any matcher), Q5 R-UNCONSUMED-FIELD (a claim spelled only on a
 * field the vocabulary does not derive: the SDK's completeness, modes or certificate verdict, the projection's status tone) and Q6
 * R-TEXT-FRAGMENT (the known-empty word not whole in one literal: concatenated, cut short, or broken by pattern syntax). The LIVE
 * SET reader's: Q7 R-LIVE-INDIRECT (an hx drive through no HX module mention and no HX local: a helper's wrapper under another name,
 * the SDK's raw transport @hyperunix/sdk/raw, a computed import specifier, a capability invoked by its registered name, an entry
 * handed into a container inside one case and called from another; each member's "HX probe" case reads as no HX case, with nothing
 * unresolved or outside). The ROUTE reader's: Q8 R-ROUTE-RUNTIME (the route chain held verbatim in the HX case but not run over the
 * live read: on a path that never runs - under a false condition, after a return, in a function never called - or over a subject
 * rebound to another value; each member reads the intact route). They are the known unread forms, not an exhaustive list: a form
 * outside a reader's read set is not claimed caught.
 *
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS, each residual family's member count,
 * the falsifier roster (`${id}:${form}`), the benign and conservative rosters, the probe preamble, the claim vocabulary, the LIVE SET
 * forms (`${surface}:${id}`), the ROUTE forms and the registration partition as literals; the judged set (every row's id, label
 * and pins, every pin's quote, reading and witness, the residual members, the gate block and every registered test title) is held
 * to the out-of-file roster test/fixtures/hx-licensed-complete-roster.json.
 * ANCHORS OUTSIDE THIS FILE (their own registered cases): rows W, S, T and N are the bead's own description (the tracker export
 * .beads/issues.jsonl, the description only - never the notes, so a later park, delivery or gate note binds nothing): the
 * statement's two clauses and the standing item's two clauses, in order; row N's citation is the line N1 reads; the gate block's
 * condition, citations and on-landing text are the description's. Every citation and bead id a row label carries is carried by
 * exactly one pin quote of that row, no quote carries two, and the carrier's witness names it (T2 the docs/14 citation, T3
 * wb-cax.25), so merging an atom-carrying pin into a sibling reds. Row Q, each family's name and quiet row and every member are
 * docs/14's residual table. Every LIVE SET and ROUTE form, with its surface, is docs/14's table "HX licensed-complete census read
 * forms", both ways and in order; the registration partition is vitest's runtime test API's (a flag is a member that is itself the
 * whole chainable API, a member that registers no case is vitest's own describe or hook export, a method is any other member). The
 * claim vocabulary is src's, and each vocabulary form has a falsifier spelling its derived value that the scanner flags. The HX
 * evidence rows, S1's fixture cases and S2's lead paragraph are docs/14's; N1's sentence is TRACEABILITY.md's. So a row, a residual
 * family or member, a LIVE SET or ROUTE form, a registration flag or method, an atom-carrying pin, a kind or an HX row removed from
 * every literal of this file and the roster together still reds. SELF-ANCHORED (held only by the frozen-shape literal, the roster
 * and this file's own lists; a coordinated removal from all of them reads green, and that is NOT claimed): a falsifier of a
 * vocabulary form that keeps another flagged falsifier of it, each benign and each conservative member, the probe preamble, and the
 * split of the atom-free clauses into pins (W1 with W2, S1 with S2, and T1 into the citation-carrying T2: their quotes are held by
 * tiling only, so two of them merged into one re-tiling quote read green). The last case reads the vitest task tree (every
 * registered test, in roster order, in run mode, ran before it) and REACHED (every pin reached its witness compare, and each
 * compare's own result).
 * FLIP: when the gate artifact exists, the cut that adds the live witness sets the roster's gate state to present, re-measures W1,
 * W2 and S1 with it (one case witnessing the branch, through hxLiveInvariant) and moves the docs/14 rows; until then a
 * licensed-complete claim in a READ SET form in a native-read file reds S1 here, and an HX entry driven there in a form the LIVE SET
 * reader reads or fails closed on reds W1 here, although the complete gate never runs the native tier.
 * NOT CLAIMED: the On-landing leg; any hx behaviour (the native tier's receipt owns that); that the native tier ran (this census
 * reads sources, configs and docs) or how a case runs beyond its written registration chain (a skip decided inside the body, a
 * condition's run-time value); a claim, an hx drive or a route hollowing outside a reader's read set (RESIDUALS names the known
 * families); that prose is understood (CONSERVATIVE READINGS); the coordinated removal of a SELF-ANCHORED member.
 *
 * Display paths added: none. Test and docs only: no src change, no live case, no fixture workspace and no receipt; docs/14 carries
 * the read-forms and residual sections this census reads.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, matchesGlob } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { HyperUnix, resultFromJson } from "@hyperunix/sdk";
import ts from "typescript";
import * as vitestApi from "vitest";
import { describe, expect, it } from "vitest";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { HYPERUNIX_CONSUMED_FIELDS, HYPERUNIX_EXECUTION_KINDS, hxLiveInvariant, hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import * as hyperunixProvider from "../src/workbench/providers/hyperunix.js";
import censusConfig from "../vitest.census.config.js";
import defaultConfig from "../vitest.config.js";
import nativeConfig from "../vitest.native.config.js";
import { DEFAULT_GATE_TIER, docsSection, REGISTRATION_MEMBERS, resolveTier, sectionTables } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-tz2.9";
const REQUIREMENT = "HX-ORIGINAL-GOALS-CLOSURE-R9";
const SUITE = `hx licensed-complete witness census (${BEAD}, ${REQUIREMENT})`;
const ROSTER_PATH = "test/fixtures/hx-licensed-complete-roster.json";
const EXPORT = ".beads/issues.jsonl";
const EM_DASH = String.fromCodePoint(0x2014);
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";
const DOCS_PARENT = `14 ${EM_DASH} Test strategy, conformance suite, benchmark and adversarial controls`;
const MATRIX = "Matrix by subsystem";
const EVIDENCE = "Matrix by subsystem evidence";
const RESIDUAL_HEADING = "HX licensed-complete census residuals";
const RESIDUAL_COLUMNS: readonly string[] = ["Quiet row", "Residual family", "Member"];
/** The residual section's lead paragraph, verbatim (rendered text and markdown alike: it carries no inline markup). */
const RESIDUAL_LEAD =
  "Named residuals of test/workbench-hx-licensed-complete-census.test.ts, the until-then census of the HX licensed-complete branch (wb-tz2.9): one row per member of each family its claim scanner (Q1 to Q6), its live-set reader (Q7) or its route reader (Q8) names and does not read, so a claim, a live HX drive or a hollowed route spelled that way in a native-read file is not caught by it. Each row names the census quiet row that pins the family, the family's name and the member, a statement or module the census reads quiet. The census holds this table to its residual pins and members in both directions and in table order, so a family or member dropped, renamed, reordered or moved to another quiet row on either side reads red.";
const FORMS_HEADING = "HX licensed-complete census read forms";
const FORMS_COLUMNS: readonly string[] = ["Surface", "Form"];
/** The read-forms section's lead paragraph, verbatim (rendered text and markdown alike: it carries no inline markup). */
const FORMS_LEAD =
  "Read forms of test/workbench-hx-licensed-complete-census.test.ts, the until-then census of the HX licensed-complete branch (wb-tz2.9): one row per form its live-set reader reads (surfaces membership, registration and fail-closed, beside the quiet controls) and per form its route reader reads (surface route), each a falsifier module the census runs. A membership or registration form reads live with the HX cases it registers and nothing unresolved or outside, a fail-closed form reads something unresolved or outside, a control reads quiet, and every route form but the intact one reads a route list other than the intact one's. The census holds this table to its form lists in both directions and in table order, so a form dropped, renamed, reordered or moved to another surface on either side reads red.";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const TRACE_LINE = 76;
const NOT_NATIVE = "do not count it as native evidence";
const NATIVE_TIER = "native-read";
/** The docs/14 tier label of the default gate's report. */
const DEFAULT_GATE_LABEL = "default-gate";
const CENSUS_STEP = "census";
const DEFAULT_CONFIG = "vitest.config.ts";
/** Every case parses sources or docs; the explicit budget keeps a loaded host's slowness from reading as a finding. */
const BUDGET_MS = 60_000;

type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json };
type JsonRecord = { [key: string]: JsonValue };
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

const ROWS: readonly Row[] = [
  { id: "W", label: "Pi shall add one live licensed-complete/known-empty witness to the native tier, asserted through the R1 invariant predicate", pins: ["W1", "W2"] },
  { id: "S", label: "until then the licensed-complete branch remains explicitly fixture-labelled", pins: ["S1", "S2"] },
  { id: "T", label: `tier labels stay explicit ${EM_DASH} the docs/14 HX row (docs/workbench/14-qa-and-benchmarks.md:25@9df9a03) is bound by the wb-cax.25 census`, pins: ["T1", "T2", "T3"] },
  { id: "N", label: "fixture passes are never counted as native evidence", pins: ["N1"] },
  { id: "Q", label: "the census readers' named residual families, each member a pinned quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"] },
];
const QUOTES: Readonly<Record<string, string>> = {
  W1: "Pi shall add one live licensed-complete/known-empty witness to the native tier",
  W2: "asserted through the R1 invariant predicate",
  S1: "until then the licensed-complete branch remains",
  S2: "explicitly fixture-labelled",
  T1: "tier labels stay explicit",
  T2: "the docs/14 HX row (docs/workbench/14-qa-and-benchmarks.md:25@9df9a03)",
  T3: "is bound by the wb-cax.25 census",
  N1: "fixture passes are never counted as native evidence",
  Q1: "R-RUNTIME-VALUE",
  Q2: "R-HELPER",
  Q3: "R-OTHER-API",
  Q4: "R-OTHER-MATCHER",
  Q5: "R-UNCONSUMED-FIELD",
  Q6: "R-TEXT-FRAGMENT",
  Q7: "R-LIVE-INDIRECT",
  Q8: "R-ROUTE-RUNTIME",
};
/** What each pin measures, stated in its test title. */
const READING: Readonly<Record<string, string>> = {
  W1: "pending: the native-read tier's HX live set is its two files that bind an HX entry in a membership form, each with one HX case in a read registration chain; no HX case body states a claim in a read form, nothing reads unresolved or outside, and every LIVE SET form reads as the roster pins it",
  W2: "each live file's HX case holds the one route chain both share, every ROUTE form reads as the roster pins it, and over every execution kind under both licence states the provider path's predicate licenses absence on exactly the runtime-licensed complete and complete-empty readings",
  S1: "no native-read file states a licensed-complete claim in a read form, the scanner flags every falsifier and conservative row and no benign statement, and it reads each docs/14 positive HX fixture case and not the negative one",
  S2: "every HX row of the positive half in the docs/14 evidence table carries the default-gate tier, and the section's lead paragraph is pinned verbatim with no HTML",
  T1: "each HX evidence row's tier names the config that selects its file, and its case is registered there by its verbatim title",
  T2: "the line this quote cites at 9df9a03 is the current HX row of the docs/14 matrix, cell for cell",
  T3: "the complete gate's census step selects exactly one census whose lead opens with the bead this quote names, and it carries the docs/14 matrix heading",
  N1: "TRACEABILITY.md:76 keeps its never-count sentence verbatim, the default config selects no native-read file and the native-read config selects no licensed-complete fixture file",
  Q1: "quiet: the scanner reads values, keys and subject leaves only as written, never as computed or carried at run time",
  Q2: "quiet: the scanner follows no helper",
  Q3: "quiet: the scanner reads no assertion API or name but expect and expect.soft",
  Q4: "quiet: the scanner reads no pairing through a matcher C2-C4 do not read; C1 properties and C5 text stay read inside any matcher",
  Q5: "quiet: the scanner reads no field its vocabulary does not derive",
  Q6: "quiet: the scanner reads no known-empty word that is not whole in one literal",
  Q7: "quiet: the live-set reader reads no HX probe case whose hx drive reaches it through no HX module mention and no HX local",
  Q8: "quiet: the route reader reads a route chain held verbatim but not run over the live read as the intact route",
};

const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
/** A witness as plain JSON: the registry and the predicate hand back null-prototype or frozen trees. */
const plain = (value: unknown): Json => JSON.parse(JSON.stringify(value)) as Json;
const parse = (file: string, text: string): ts.SourceFile => ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const parseRepo = (file: string): ts.SourceFile => parse(file, textOf(file));

// ---- tiers: a config module selects a file when an include entry matches and no exclude entry does ----

interface ConfigShape {
  readonly test?: { readonly include?: readonly string[]; readonly exclude?: readonly string[] };
}
function selects(config: ConfigShape, file: string): boolean {
  const include = config.test?.include ?? [];
  const exclude = config.test?.exclude ?? [];
  return include.some(glob => matchesGlob(file, glob)) && !exclude.some(glob => matchesGlob(file, glob));
}
/** Every repository-relative .ts file under test/, sorted. */
function testFiles(): string[] {
  return readdirSync(join(ROOT, "test"), { encoding: "utf8", recursive: true })
    .filter(name => name.endsWith(".ts"))
    .map(name => `test/${name.split("\\").join("/")}`)
    .sort();
}
/** The config a forge tier's vitest argv loads: its --config value, or vitest.config.ts when it names none. */
function configOf(tier: string): string {
  const resolved = resolveTier(ROOT, tier);
  if (!resolved.ok) return `unresolved: ${resolved.why}`;
  const at = resolved.argv.indexOf("--config");
  return at < 0 ? DEFAULT_CONFIG : (resolved.argv[at + 1] ?? "--config without a value");
}
/** The native-read tier: the config forge.toml names for it and the files that config selects. */
function nativeTier(): { readonly config: string; readonly files: readonly string[] } {
  return { config: configOf(NATIVE_TIER), files: testFiles().filter(file => selects(nativeConfig, file)) };
}
/** The native-read files the LIVE SET reader reads live. */
const liveFiles = (): string[] => nativeTier().files.filter(file => liveReading(parseRepo(file)).live);

// ---- sources: the LIVE SET reader (membership, registration, fail closed), the ROUTE reader and vitest's registration partition ----

/** The HX entry points a live case drives: every function export of the provider module, and the SDK's client class. */
const HX_ENTRIES: readonly string[] = [
  ...Object.entries(hyperunixProvider)
    .filter(([, value]) => typeof value === "function")
    .map(([name]) => name),
  HyperUnix.name,
].sort();
/** An HX MODULE specifier: the provider module (bare or with any script extension) or the SDK package root. */
const HX_PROVIDER_PATH = /(?:^|\/)providers\/hyperunix(?:\.[cm]?[jt]s)?$/;
const isHxModule = (specifier: string): boolean => specifier === "@hyperunix/sdk" || HX_PROVIDER_PATH.test(specifier);
/** The test API's roots, and vitest's test-API members partitioned (REGISTRATION_MEMBERS.test; derived again at run time). */
const TEST_ROOTS: readonly string[] = ["it", "test"];
const CASE_FLAGS: readonly string[] = ["concurrent", "fails", "only", "sequential", "skip", "todo"];
const CASE_METHODS: readonly string[] = ["each", "extend", "for", "override", "runIf", "scoped", "skipIf"];
const NON_CASE_MEMBERS: readonly string[] = ["afterAll", "afterEach", "aroundAll", "aroundEach", "beforeAll", "beforeEach", "describe", "suite"];
/** The local-name forms whose member is an entry (M3, M4, M5 bound whole). */
const NAMESPACE_FORMS: readonly string[] = ["namespace", "default", "dynamic"];

/** Every node of a tree, the root first. */
function nodesOf(root: ts.Node): ts.Node[] {
  const out: ts.Node[] = [];
  const visit = (node: ts.Node): void => {
    out.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return out;
}
const lineOf = (sf: ts.SourceFile, node: ts.Node): number => sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
const within = (node: ts.Node, outer: ts.Node): boolean => outer.pos <= node.pos && node.end <= outer.end;
/** A node's source text with every whitespace character removed. */
const squeeze = (node: ts.Node, sf: ts.SourceFile): string => node.getText(sf).replace(/\s+/g, "");

/** Whether an expression is a test API: a test API local, a case flag of one, or a call of a case method of one. */
function isTestApi(node: ts.Expression, apis: ReadonlySet<string>): boolean {
  const value = unwrap(node);
  if (ts.isIdentifier(value)) return apis.has(value.text);
  if (ts.isCallExpression(value)) {
    const method = memberOf(value.expression);
    return method !== undefined && CASE_METHODS.includes(method.name) && isTestApi(method.base, apis);
  }
  const flag = memberOf(value);
  return flag !== undefined && CASE_FLAGS.includes(flag.name) && isTestApi(flag.base, apis);
}
/** A source's test API locals: it and test, their imports from vitest under any name, and variables declared from a test API. */
function testApis(sf: ts.SourceFile): Set<string> {
  const apis = new Set<string>(TEST_ROOTS);
  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== "vitest") continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings === undefined || !ts.isNamedImports(bindings)) continue;
    for (const element of bindings.elements) if (TEST_ROOTS.includes((element.propertyName ?? element.name).text)) apis.add(element.name.text);
  }
  const declarations = nodesOf(sf).filter(ts.isVariableDeclaration);
  for (let grown = true; grown; ) {
    grown = false;
    for (const declaration of declarations) {
      const { name, initializer } = declaration;
      if (!ts.isIdentifier(name) || apis.has(name.text) || initializer === undefined || !isTestApi(initializer, apis)) continue;
      apis.add(name.text);
      grown = true;
    }
  }
  return apis;
}
interface Case {
  readonly title: string;
  readonly registration: string;
  readonly body: ts.Node;
}
/** Every case of a source (REGISTRATION): a test API called with a function body; its title, registration chain and body. */
function casesOf(sf: ts.SourceFile): Case[] {
  const apis = testApis(sf);
  const out: Case[] = [];
  for (const node of nodesOf(sf)) {
    if (!ts.isCallExpression(node) || !isTestApi(node.expression, apis)) continue;
    const [title, ...rest] = node.arguments;
    const body = rest.find(argument => ts.isArrowFunction(argument) || ts.isFunctionExpression(argument));
    if (title === undefined || body === undefined) continue;
    const beside = rest.filter(argument => argument !== body).map(argument => squeeze(argument, sf));
    out.push({ title: stringOf(title) ?? `<computed: ${squeeze(title, sf)}>`, registration: [squeeze(node.expression, sf), ...beside].join(" "), body });
  }
  return out;
}
/** An M5 import: a dynamic import() of an HX module by a literal specifier. */
function isHxImport(node: ts.Node): node is ts.CallExpression {
  if (!ts.isCallExpression(node) || node.expression.kind !== ts.SyntaxKind.ImportKeyword) return false;
  const specifier = stringOf(node.arguments[0]);
  return specifier !== undefined && isHxModule(specifier);
}
/** The variable declaration an expression initializes, through parentheses, await and the type wrappers. */
function declarationOf(node: ts.Node): ts.VariableDeclaration | undefined {
  let current = node;
  while (
    ts.isParenthesizedExpression(current.parent) ||
    ts.isAwaitExpression(current.parent) ||
    ts.isAsExpression(current.parent) ||
    ts.isSatisfiesExpression(current.parent) ||
    ts.isNonNullExpression(current.parent) ||
    ts.isTypeAssertionExpression(current.parent)
  ) {
    current = current.parent;
  }
  return ts.isVariableDeclaration(current.parent) && current.parent.initializer === current ? current.parent : undefined;
}
/** The locals an object binding pattern takes from a namespace: one per entry (a rest element takes the namespace), or undefined
 * when an element cannot be named. */
function destructured(pattern: ts.BindingName): string[] | undefined {
  if (!ts.isObjectBindingPattern(pattern)) return undefined;
  const locals: string[] = [];
  for (const element of pattern.elements) {
    if (!ts.isIdentifier(element.name)) return undefined;
    if (element.dotDotDotToken !== undefined) {
      locals.push(element.name.text);
      continue;
    }
    const key = element.propertyName === undefined ? element.name.text : keyOf(element.propertyName);
    if (key === undefined) return undefined;
    if (HX_ENTRIES.includes(key)) locals.push(element.name.text);
  }
  return locals;
}
/** The assignment operators an M6 alias may be written with. */
const ASSIGNMENTS: readonly ts.SyntaxKind[] = [ts.SyntaxKind.EqualsToken, ts.SyntaxKind.BarBarEqualsToken, ts.SyntaxKind.AmpersandAmpersandEqualsToken, ts.SyntaxKind.QuestionQuestionEqualsToken];
/** The identifier a member chain is rooted at (`root.a['b'].c`), read through UNWRAP. */
function rootOf(node: ts.Expression): ts.Identifier | undefined {
  let current = unwrap(node);
  for (let member = memberOf(current); member !== undefined; member = memberOf(current)) current = unwrap(member.base);
  return ts.isIdentifier(current) ? current : undefined;
}
/** The locals an object-literal assignment target takes from a namespace: one per entry, or undefined when one cannot be named. */
function assignedFrom(target: ts.ObjectLiteralExpression): string[] | undefined {
  const locals: string[] = [];
  for (const property of target.properties) {
    if (ts.isShorthandPropertyAssignment(property)) {
      if (HX_ENTRIES.includes(property.name.text)) locals.push(property.name.text);
      continue;
    }
    if (!ts.isPropertyAssignment(property)) return undefined;
    const key = keyOf(property.name);
    const value = unwrap(property.initializer);
    if (key === undefined || !ts.isIdentifier(value)) return undefined;
    if (HX_ENTRIES.includes(key)) locals.push(value.text);
  }
  return locals;
}
/** A binding site: the name a declaration, parameter or binding element introduces, or a binding element's property key. */
function isBindingSite(node: ts.Identifier): boolean {
  const { parent } = node;
  if (ts.isBindingElement(parent)) return parent.name === node || parent.propertyName === node;
  const named = ts.isVariableDeclaration(parent) || ts.isParameter(parent) || ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent) || ts.isClassDeclaration(parent) || ts.isClassExpression(parent);
  return named && parent.name === node;
}
interface LiveReading {
  readonly live: boolean;
  readonly entries: readonly string[];
  readonly cases: readonly { readonly title: string; readonly registration: string }[];
  readonly witnessing: readonly string[];
  readonly unresolved: readonly string[];
  readonly outside: readonly string[];
}
/** The LIVE SET reading of one source: its HX locals (`<form> <name>`), HX cases, witnessing cases, UNRESOLVED and OUTSIDE lists. */
function liveReading(sf: ts.SourceFile): LiveReading {
  const locals = new Map<string, string>();
  const declared: ts.Node[] = [];
  const unresolved: string[] = [];
  const bind = (name: string, form: string): void => {
    if (!locals.has(name)) locals.set(name, form);
  };
  const unread = (node: ts.Node): void => {
    unresolved.push(`${lineOf(sf, node)}: an unread binding: ${squeeze(node, sf)}`);
  };
  const specifiers = new Set<ts.Node>();
  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    declared.push(statement);
    specifiers.add(statement.moduleSpecifier);
    const hx = isHxModule(statement.moduleSpecifier.text);
    const clause = statement.importClause;
    if (hx && clause?.name !== undefined) bind(clause.name.text, "default");
    const bindings = clause?.namedBindings;
    if (bindings === undefined) continue;
    if (ts.isNamespaceImport(bindings)) {
      if (hx) bind(bindings.name.text, "namespace");
      continue;
    }
    for (const element of bindings.elements) {
      if (HX_ENTRIES.includes((element.propertyName ?? element.name).text)) bind(element.name.text, element.propertyName === undefined ? "named" : "aliased");
    }
  }
  const nodes = nodesOf(sf);
  const imports = nodes.filter(isHxImport);
  const inline = new Set<ts.Node>();
  for (const call of imports) {
    const [first] = call.arguments;
    if (first !== undefined) specifiers.add(unwrap(first));
    const declaration = declarationOf(call);
    if (declaration === undefined) {
      inline.add(call);
      continue;
    }
    declared.push(declaration);
    if (ts.isIdentifier(declaration.name)) bind(declaration.name.text, "dynamic");
    else {
      const names = destructured(declaration.name);
      if (names === undefined) unread(declaration);
      else for (const name of names) bind(name, "destructured");
    }
  }
  /** What an alias's source reads as: the form of a whole HX local, or "entry" for an entry member of a namespace-form local. */
  const sourceOf = (expression: ts.Expression): string | undefined => {
    const value = unwrap(expression);
    if (ts.isIdentifier(value)) return locals.get(value.text);
    const member = memberOf(value);
    const base = member === undefined ? undefined : unwrap(member.base);
    const from = base !== undefined && ts.isIdentifier(base) ? locals.get(base.text) : undefined;
    return member !== undefined && from !== undefined && NAMESPACE_FORMS.includes(from) && HX_ENTRIES.includes(member.name) ? "entry" : undefined;
  };
  const declarations = nodes.filter(ts.isVariableDeclaration);
  const assignments = nodes.filter((node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && ASSIGNMENTS.includes(node.operatorToken.kind));
  for (let grown = true; grown; ) {
    grown = false;
    for (const declaration of declarations) {
      if (declared.includes(declaration) || declaration.initializer === undefined) continue;
      const whole = sourceOf(declaration.initializer);
      if (whole === undefined) continue;
      declared.push(declaration);
      grown = true;
      if (ts.isIdentifier(declaration.name)) bind(declaration.name.text, "alias");
      else {
        const names = NAMESPACE_FORMS.includes(whole) ? destructured(declaration.name) : undefined;
        if (names === undefined) unread(declaration);
        else for (const name of names) bind(name, "alias");
      }
    }
    for (const assignment of assignments) {
      if (declared.includes(assignment)) continue;
      const whole = sourceOf(assignment.right);
      if (whole === undefined) continue;
      declared.push(assignment);
      grown = true;
      const target = unwrap(assignment.left);
      const root = memberOf(target) === undefined ? undefined : rootOf(target);
      if (ts.isIdentifier(target)) bind(target.text, "alias");
      else if (root !== undefined) bind(root.text, "store");
      else {
        const names = ts.isObjectLiteralExpression(target) && NAMESPACE_FORMS.includes(whole) ? assignedFrom(target) : undefined;
        if (names === undefined) unread(assignment);
        else for (const name of names) bind(name, "alias");
      }
    }
  }
  const cases = casesOf(sf);
  const isReference = (node: ts.Node): boolean => (ts.isIdentifier(node) && locals.has(node.text) && !isBindingSite(node)) || inline.has(node);
  const holds = (root: ts.Node): boolean => nodesOf(root).some(node => isReference(node) || isHxImport(node));
  const placed = (node: ts.Node): boolean => cases.some(entry => within(node, entry.body)) || declared.some(declaration => within(node, declaration));
  const outside = nodes.filter(node => isReference(node) && !placed(node)).map(node => `${lineOf(sf, node)}: ${squeeze(node, sf)}`);
  for (const node of nodes) {
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && isHxModule(node.text) && !specifiers.has(node)) unresolved.push(`${lineOf(sf, node)}: ${node.getText(sf)}`);
  }
  const hxCases = cases.filter(entry => holds(entry.body));
  return {
    live: locals.size > 0 || imports.length > 0,
    entries: [...locals].map(([name, form]) => `${form} ${name}`),
    cases: hxCases.map(entry => ({ title: entry.title, registration: entry.registration })),
    witnessing: hxCases.filter(entry => claimsIn(entry.body, sf, CLAIM_VOCABULARY).length > 0).map(entry => entry.title),
    unresolved,
    outside,
  };
}
/** A LIVE SET reading as a form's witness: whether it reads live, its HX cases (`<registration chain, its members space-separated>
 * :: <title>`) and its unresolved and outside counts. */
function liveSummary(source: string): Json {
  const reading = liveReading(parse("form.ts", source));
  return plain({
    live: reading.live,
    cases: reading.cases.map(entry => `${entry.registration.split(".").join(" ")} :: ${entry.title}`),
    unresolved: reading.unresolved.length,
    outside: reading.outside.length,
  });
}
/** Whether a call heads a ROUTE: expect(...) or expect.soft(...) of a direct hxLiveInvariant call. */
function isRouteHead(call: ts.CallExpression): boolean {
  const soft = memberOf(call.expression);
  const headed = isExpect(call.expression) || (soft !== undefined && HEADS.includes(soft.name) && isExpect(soft.base));
  const subject = call.arguments[0] === undefined ? undefined : unwrap(call.arguments[0]);
  return headed && subject !== undefined && ts.isCallExpression(subject) && ts.isIdentifier(subject.expression) && subject.expression.text === hxLiveInvariant.name;
}
/** Whether a node continues the chain it heads: a member read or a call of it. */
function continued(node: ts.Node): boolean {
  const { parent } = node;
  return (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent) || ts.isCallExpression(parent)) && parent.expression === node;
}
interface Route {
  readonly case: string | null;
  readonly chain: string;
}
/** The ROUTE reading of one source: each route's whole chain text and the title of the innermost case holding it. */
function routesOf(sf: ts.SourceFile): Route[] {
  const cases = casesOf(sf);
  return nodesOf(sf)
    .filter((node): node is ts.CallExpression => ts.isCallExpression(node) && isRouteHead(node))
    .map(head => {
      let chain: ts.Node = head;
      while (continued(chain)) chain = chain.parent;
      return { case: cases.filter(entry => within(head, entry.body)).at(-1)?.title ?? null, chain: squeeze(chain, sf) };
    });
}
/** vitest's own partition of its test-API members: a flag is the whole chainable API again, a non-case member is vitest's own
 * describe or hook export, a method is any other member. */
function registrationPartition(): { readonly flags: readonly string[]; readonly methods: readonly string[]; readonly other: readonly string[] } {
  const api = it as unknown as Readonly<Record<string, unknown>>;
  const exported = vitestApi as unknown as Readonly<Record<string, unknown>>;
  const membersOf = (value: unknown): string[] =>
    typeof value === "function"
      ? Object.getOwnPropertyNames(value)
          .filter(name => REGISTRATION_MEMBERS.test.includes(name))
          .sort()
      : [];
  const flags: string[] = [];
  const methods: string[] = [];
  const other: string[] = [];
  for (const name of REGISTRATION_MEMBERS.test) {
    const member = api[name];
    if (member === describe || (member !== undefined && member === exported[name])) other.push(name);
    else if (isDeepStrictEqual(membersOf(member), REGISTRATION_MEMBERS.test)) flags.push(name);
    else methods.push(name);
  }
  return { flags, methods, other };
}

// ---- the claim scanner: the READ SET of the header (C1-C5), active code only, literal values only ----

interface ClaimVocabulary {
  readonly verdictField: string;
  readonly licenceField: string;
  readonly completeKinds: readonly string[];
  readonly coverage: string;
  readonly knownEmpty: string;
}
const CLAIM_VOCABULARY: ClaimVocabulary = { verdictField: "absenceLicensed", licenceField: "licenses_absence", completeKinds: ["complete", "complete-empty"], coverage: "complete", knownEmpty: "known-empty" };
/** C2's matchers. */
const PINNING: readonly string[] = ["toBe", "toEqual", "toStrictEqual"];
/** The members a chain may carry between its head and its matcher. */
const MODIFIERS: readonly string[] = ["not", "resolves", "rejects"];
/** expect's members that head a chain rather than name an asymmetric matcher. */
const HEADS: readonly string[] = ["soft"];

/** UNWRAP: parentheses, `as`, `satisfies`, the non-null `!` and a `<T>` assertion, any number in any order. */
function unwrap(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isNonNullExpression(current) || ts.isTypeAssertionExpression(current)) {
    current = current.expression;
  }
  return current;
}
/** A string VALUE: a string literal or a no-substitution template, read through UNWRAP. */
function stringOf(node: ts.Expression | undefined): string | undefined {
  const value = node === undefined ? undefined : unwrap(node);
  return value !== undefined && (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) ? value.text : undefined;
}
const isTrue = (node: ts.Expression | undefined): boolean => node !== undefined && unwrap(node).kind === ts.SyntaxKind.TrueKeyword;
const isFalse = (node: ts.Expression | undefined): boolean => node !== undefined && unwrap(node).kind === ts.SyntaxKind.FalseKeyword;
/** A KEY: an identifier, a string or numeric literal, or a computed key whose expression is a string value. */
function keyOf(name: ts.PropertyName): string | undefined {
  if (ts.isComputedPropertyName(name)) return stringOf(name.expression);
  return ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name) ? name.text : undefined;
}
/** A MEMBER: `.name`, or `['name']` with a string value. */
function memberOf(node: ts.Expression): { readonly base: ts.Expression; readonly name: string } | undefined {
  if (ts.isPropertyAccessExpression(node)) return { base: node.expression, name: node.name.text };
  if (!ts.isElementAccessExpression(node)) return undefined;
  const name = stringOf(node.argumentExpression);
  return name === undefined ? undefined : { base: node.expression, name };
}
/** A subject's LEAF: the last member of an access, or a bare identifier, read through UNWRAP. */
function leafOf(node: ts.Expression | undefined): string | undefined {
  if (node === undefined) return undefined;
  const value = unwrap(node);
  return ts.isIdentifier(value) ? value.text : memberOf(value)?.name;
}
/** The last segment of a toHaveProperty path: a dotted string's last dot segment, or an array literal's last element. */
function pathLeaf(node: ts.Expression | undefined): string | undefined {
  const dotted = stringOf(node);
  if (dotted !== undefined) return dotted.split(".").at(-1);
  const value = node === undefined ? undefined : unwrap(node);
  return value !== undefined && ts.isArrayLiteralExpression(value) ? stringOf(value.elements.at(-1)) : undefined;
}
const isExpect = (node: ts.Expression): boolean => ts.isIdentifier(node) && node.text === "expect";
interface Chain {
  readonly head: readonly ts.Expression[];
  readonly negated: boolean;
  readonly matcher: string;
  readonly args: readonly ts.Expression[];
}
/** A CHAIN: expect(...) or expect.soft(...), any .not/.resolves/.rejects members, then a matcher member called. */
function chainOf(call: ts.CallExpression): Chain | undefined {
  const matcher = memberOf(call.expression);
  if (matcher === undefined) return undefined;
  let target = matcher.base;
  let nots = 0;
  for (let member = memberOf(target); member !== undefined && MODIFIERS.includes(member.name); member = memberOf(target)) {
    if (member.name === "not") nots += 1;
    target = member.base;
  }
  if (!ts.isCallExpression(target)) return undefined;
  const soft = memberOf(target.expression);
  const headed = isExpect(target.expression) || (soft !== undefined && HEADS.includes(soft.name) && isExpect(soft.base));
  return headed ? { head: target.arguments, negated: nots % 2 === 1, matcher: matcher.name, args: call.arguments } : undefined;
}
/** expect.<name>(...) keeps the enclosing polarity (false), expect.not.<name>(...) flips it (true); anything else is no asymmetric matcher. */
function asymmetricOf(call: ts.CallExpression): boolean | undefined {
  const member = memberOf(call.expression);
  if (member === undefined || HEADS.includes(member.name)) return undefined;
  if (isExpect(member.base)) return false;
  const not = memberOf(member.base);
  return not !== undefined && not.name === "not" && isExpect(not.base) ? true : undefined;
}
/** C5's text: a string literal, a template part, or a regular expression's pattern with every backslash removed. */
function literalText(node: ts.Node): string | undefined {
  if (ts.isRegularExpressionLiteral(node)) return node.text.slice(1, node.text.lastIndexOf("/")).replaceAll("\\", "");
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) ? node.text : undefined;
}
/** Every licensed-complete claim under a node in a READ SET form, as `<line>: <form>`. */
function claimsIn(root: ts.Node, sf: ts.SourceFile, vocabulary: ClaimVocabulary): string[] {
  const out: string[] = [];
  const at = (node: ts.Node, form: string): void => {
    out.push(`${sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1}: ${form}`);
  };
  const licensing = [vocabulary.verdictField, vocabulary.licenceField];
  /** The PAIRING a leaf or key makes with a value under a polarity, if any. */
  const pairing = (leaf: string | undefined, value: ts.Expression | undefined, negated: boolean): string | undefined => {
    if (leaf === undefined || value === undefined) return undefined;
    if (licensing.includes(leaf)) return (negated ? isFalse(value) : isTrue(value)) ? `${leaf} ${negated ? "not false" : "true"}` : undefined;
    if (negated) return undefined;
    const text = stringOf(value);
    if (leaf === "kind" && text !== undefined && vocabulary.completeKinds.includes(text)) return `kind ${text}`;
    return leaf === "coverage" && text === vocabulary.coverage ? `coverage ${text}` : undefined;
  };
  const chainClaims = (node: ts.CallExpression, chain: Chain): void => {
    const [subject] = chain.head;
    const [argument, value] = chain.args;
    const found: (string | undefined)[] = [];
    if (PINNING.includes(chain.matcher)) found.push(pairing(leafOf(subject), argument, chain.negated), pairing(leafOf(argument), subject, chain.negated));
    const truthy = (chain.matcher === "toBeTruthy" && !chain.negated) || (chain.matcher === "toBeFalsy" && chain.negated);
    const leaf = leafOf(subject);
    if (truthy && leaf !== undefined && licensing.includes(leaf)) found.push(`${leaf} truthy`);
    if (chain.matcher === "toHaveProperty") found.push(pairing(pathLeaf(argument), value, chain.negated));
    for (const claim of found) if (claim !== undefined) at(node, `${chain.negated ? "not." : ""}${chain.matcher}: ${claim}`);
  };
  const visit = (node: ts.Node, negated: boolean): void => {
    if (ts.isCallExpression(node)) {
      const chain = chainOf(node);
      if (chain !== undefined) {
        chainClaims(node, chain);
        for (const argument of [...chain.head, ...chain.args]) visit(argument, chain.negated);
        return;
      }
      const flips = asymmetricOf(node);
      if (flips !== undefined) {
        for (const argument of node.arguments) visit(argument, flips !== negated);
        return;
      }
    }
    if (ts.isPropertyAssignment(node) || ts.isPropertyDeclaration(node)) {
      const claim = pairing(keyOf(node.name), node.initializer, negated);
      if (claim !== undefined) at(node, `property: ${claim}`);
    }
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      const claim = pairing(memberOf(unwrap(node.left))?.name, node.right, negated);
      if (claim !== undefined) at(node, `assignment: ${claim}`);
    }
    const text = literalText(node);
    if (!negated && text !== undefined && text.toLowerCase().includes(vocabulary.knownEmpty)) at(node, `text carrying ${vocabulary.knownEmpty}`);
    ts.forEachChild(node, child => visit(child, negated));
  };
  visit(root, false);
  return out;
}
const claimsOfSource = (file: string, text: string): string[] => {
  const sf = parse(file, text);
  return claimsIn(sf, sf, CLAIM_VOCABULARY);
};

/** A synthetic live source shaped like the native tier's HX case: the preamble statements, then the probe's own. */
const LIVE_PREAMBLE: readonly string[] = [
  'import {describe,expect,it} from "vitest";',
  'import {hxLiveInvariant} from "../src/workbench/hyperunix-observer.js";',
  'import {nativeHyperUnixFind} from "../src/workbench/providers/hyperunix.js";',
  'describe("probe", () => {',
  '  it("HX probe", async () => {',
  '    const result = await nativeHyperUnixFind(process.cwd(), "hx.fs/regular-file", "src");',
  "    const verdict = hxLiveInvariant(result);",
  "    expect(verdict).toMatchObject({holds: true, violations: []});",
];
/** A template placeholder's opening character, so a probe statement can spell a template literal with a substitution. */
const DOLLAR = "$";
const liveSource = (statements: readonly string[]): string => [...LIVE_PREAMBLE, ...statements.map(statement => `    ${statement}`), "  });", "});", ""].join("\n");
const probeClaims = (statements: readonly string[]): string[] => claimsOfSource("probe.ts", liveSource(statements));
/** Each falsifier spells one claim in a READ SET form; `form` names the vocabulary member whose derived value it spells. */
const FALSIFIERS: readonly { readonly id: string; readonly form: string; readonly statement: string }[] = [
  { id: "verdict-property", form: "verdictField", statement: "expect(verdict).toMatchObject({holds: true, absenceLicensed: true});" },
  { id: "verdict-tobe", form: "verdictField", statement: "expect(verdict.absenceLicensed).toBe(true);" },
  { id: "verdict-not-false", form: "verdictField", statement: "expect(verdict.absenceLicensed).not.toBe(false);" },
  { id: "verdict-truthy", form: "verdictField", statement: "expect(hxLiveInvariant(result).absenceLicensed).toBeTruthy();" },
  { id: "verdict-as-const", form: "verdictField", statement: "const licensed = hxLiveInvariant(result); expect(licensed).toMatchObject({holds: true, absenceLicensed: true as const});" },
  { id: "verdict-soft", form: "verdictField", statement: "expect.soft(hxLiveInvariant(result).absenceLicensed).toBe(true);" },
  { id: "verdict-paren", form: "verdictField", statement: "expect(verdict).toMatchObject({absenceLicensed: (true)});" },
  { id: "verdict-satisfies", form: "verdictField", statement: "expect(verdict).toMatchObject({absenceLicensed: true satisfies boolean});" },
  { id: "verdict-tobe-paren", form: "verdictField", statement: "expect(verdict.absenceLicensed).toBe((true));" },
  { id: "verdict-non-null", form: "verdictField", statement: "expect(verdict!.absenceLicensed!).toBe(true!);" },
  { id: "verdict-type-assertion", form: "verdictField", statement: "expect(verdict).toMatchObject({absenceLicensed: <const>true});" },
  { id: "verdict-computed-key", form: "verdictField", statement: "expect(verdict).toMatchObject({['absenceLicensed']: true});" },
  { id: "verdict-element-matcher", form: "verdictField", statement: "expect(verdict.absenceLicensed)['toBe'](true);" },
  { id: "verdict-reversed", form: "verdictField", statement: "expect(true).toBe(verdict.absenceLicensed);" },
  { id: "verdict-optional-chain", form: "verdictField", statement: "expect(verdict?.absenceLicensed).toStrictEqual(true);" },
  { id: "verdict-message", form: "verdictField", statement: "expect(verdict.absenceLicensed, 'licensed').toEqual(true);" },
  { id: "verdict-destructured", form: "verdictField", statement: "const {absenceLicensed} = verdict; expect(absenceLicensed).toBe(true);" },
  { id: "verdict-held-object", form: "verdictField", statement: "const expected = {absenceLicensed: true}; expect(verdict).toMatchObject(expected);" },
  { id: "verdict-object-containing", form: "verdictField", statement: "expect(verdict).toEqual(expect.objectContaining({absenceLicensed: true}));" },
  { id: "verdict-resolves-path", form: "verdictField", statement: "await expect(Promise.resolve(verdict)).resolves.toHaveProperty('absenceLicensed', true);" },
  { id: "verdict-rejects-path", form: "verdictField", statement: "await expect(Promise.reject(verdict)).rejects.toHaveProperty('absenceLicensed', true);" },
  { id: "verdict-not-property-false", form: "verdictField", statement: "expect(verdict).not.toMatchObject({absenceLicensed: false});" },
  { id: "verdict-asymmetric-not-false", form: "verdictField", statement: "expect(verdict).toEqual(expect.not.objectContaining({absenceLicensed: false}));" },
  { id: "verdict-nested-assertion", form: "verdictField", statement: "expect(() => expect(verdict.absenceLicensed).toBe(true)).not.toThrow();" },
  { id: "verdict-class-field", form: "verdictField", statement: "class Licensed { absenceLicensed = true; } expect(verdict).toMatchObject(new Licensed());" },
  { id: "licence-property", form: "licenceField", statement: "expect(result).toMatchObject({source: {coverage_summary: {licenses_absence: true}}});" },
  { id: "licence-quoted-key", form: "licenceField", statement: 'expect(result).toMatchObject({source: {coverage_summary: {"licenses_absence": true}}});' },
  { id: "licence-element", form: "licenceField", statement: "expect(result.source.coverage_summary['licenses_absence']).toStrictEqual(true);" },
  { id: "licence-not-falsy", form: "licenceField", statement: "expect(result.source.coverage_summary.licenses_absence).not.toBeFalsy();" },
  { id: "licence-dotted-path", form: "licenceField", statement: "expect(result).toHaveProperty('source.coverage_summary.licenses_absence', true);" },
  { id: "licence-array-path", form: "licenceField", statement: "expect(result).toHaveProperty(['source', 'coverage_summary', 'licenses_absence'], true);" },
  {
    id: "licence-resolves-path",
    form: "licenceField",
    statement: "await expect(nativeHyperUnixFind(process.cwd(), 'hx.fs/regular-file', 'src')).resolves.toHaveProperty('source.coverage_summary.licenses_absence', true);",
  },
  { id: "licence-as-const", form: "licenceField", statement: "expect(result).toMatchObject({source: {coverage_summary: {licenses_absence: true as const}}});" },
  { id: "licence-toequal-as", form: "licenceField", statement: "expect(result.source.coverage_summary.licenses_absence).toEqual(true as boolean);" },
  { id: "licence-path-paren", form: "licenceField", statement: "expect(result).toHaveProperty('source.coverage_summary.licenses_absence', (true));" },
  { id: "licence-soft-path", form: "licenceField", statement: "expect.soft(result).toHaveProperty('source.coverage_summary.licenses_absence', true);" },
  { id: "licence-not-path-false", form: "licenceField", statement: "expect(result).not.toHaveProperty('source.coverage_summary.licenses_absence', false);" },
  { id: "licence-template-key", form: "licenceField", statement: "expect(result).toMatchObject({source: {coverage_summary: {[`licenses_absence`]: true}}});" },
  { id: "licence-reversed-not", form: "licenceField", statement: "expect(false).not.toEqual(result.source.coverage_summary.licenses_absence);" },
  { id: "licence-member-assignment", form: "licenceField", statement: "const copy = structuredClone(result); copy.source.coverage_summary.licenses_absence = true; expect(result).toEqual(copy);" },
  { id: "kind-complete", form: "completeKinds:complete", statement: "expect(result).toMatchObject({source: {execution_status: {kind: 'complete'}}});" },
  { id: "kind-quoted-complete", form: "completeKinds:complete", statement: 'expect(result).toMatchObject({source: {execution_status: {"kind": "complete"}}});' },
  { id: "kind-resolves-path", form: "completeKinds:complete", statement: "await expect(Promise.resolve(result)).resolves.toHaveProperty('source.execution_status.kind', 'complete');" },
  { id: "kind-reversed", form: "completeKinds:complete", statement: "expect('complete').toBe(result.source.execution_status.kind);" },
  { id: "kind-element-assignment", form: "completeKinds:complete", statement: "const copy = structuredClone(result); copy.source.execution_status['kind'] = 'complete'; expect(result).toEqual(copy);" },
  { id: "kind-complete-empty", form: "completeKinds:complete-empty", statement: "expect(result).toMatchObject({source: {execution_status: {kind: 'complete-empty'}}});" },
  { id: "kind-matcher", form: "completeKinds:complete-empty", statement: "expect(result.source.execution_status.kind).toBe('complete-empty');" },
  { id: "kind-path", form: "completeKinds:complete-empty", statement: "expect(result).toHaveProperty('source.execution_status.kind', 'complete-empty');" },
  { id: "kind-as-const", form: "completeKinds:complete-empty", statement: "expect(result).toMatchObject({source: {execution_status: {kind: 'complete-empty' as const}}});" },
  { id: "kind-soft", form: "completeKinds:complete-empty", statement: "expect.soft(kind).toBe('complete-empty');" },
  { id: "kind-computed-key", form: "completeKinds:complete-empty", statement: "expect(result).toMatchObject({source: {execution_status: {['kind']: 'complete-empty'}}});" },
  { id: "kind-array-path", form: "completeKinds:complete-empty", statement: "expect(result).toHaveProperty(['source', 'execution_status', 'kind'], 'complete-empty');" },
  { id: "coverage-complete", form: "coverage", statement: "expect(snapshot).toMatchObject({coverage: 'complete'});" },
  { id: "coverage-as-const", form: "coverage", statement: "expect(snapshot).toMatchObject({coverage: 'complete' as const});" },
  { id: "coverage-paren", form: "coverage", statement: "expect(snapshot).toMatchObject({coverage: ('complete')});" },
  { id: "coverage-matcher", form: "coverage", statement: "expect(snapshot.coverage).toBe('complete');" },
  { id: "coverage-path", form: "coverage", statement: "expect(snapshot).toHaveProperty('coverage', 'complete');" },
  { id: "coverage-element-subject", form: "coverage", statement: "expect(snapshot['coverage']).toEqual('complete');" },
  { id: "known-empty-text", form: "knownEmpty", statement: "expect(snapshot.node.statusText).toContain('known-empty');" },
  { id: "known-empty-template", form: "knownEmpty", statement: `expect(snapshot.node.statusText).toBe(\`known-empty (runtime-licensed) rows ${DOLLAR}{0}\`);` },
  { id: "known-empty-title", form: "knownEmpty", statement: "it('HX known-empty witness', () => {});" },
  { id: "known-empty-regex", form: "knownEmpty", statement: "expect(hxLiveReceipt(result)).toMatch(/known-empty/);" },
  { id: "known-empty-regex-anchored", form: "knownEmpty", statement: "expect(snapshot.node.statusText).toMatch(/^known-empty/);" },
  { id: "known-empty-string-matching", form: "knownEmpty", statement: "expect(snapshot.node.statusText).toEqual(expect.stringMatching(/known-empty \\(runtime-licensed\\)/));" },
  { id: "known-empty-case", form: "knownEmpty", statement: "expect(snapshot.node.statusText).toMatch(/KNOWN-EMPTY/i);" },
  { id: "known-empty-escaped", form: "knownEmpty", statement: "expect(snapshot.node.statusText).toMatch(/known\\-empty/);" },
  { id: "known-empty-string-containing", form: "knownEmpty", statement: "expect(snapshot.node).toEqual(expect.objectContaining({statusText: expect.stringContaining('known-empty')}));" },
  { id: "known-empty-held", form: "knownEmpty", statement: "const word = 'known-empty'; expect(snapshot.node.statusText).toContain(word);" },
  { id: "known-empty-double-negation", form: "knownEmpty", statement: "expect(snapshot.node.statusText).not.toEqual(expect.not.stringContaining('known-empty'));" },
  { id: "known-empty-describe", form: "knownEmpty", statement: "describe('known-empty witness', () => {});" },
];
/** Today's live statements, the negative-native spellings (a negated matcher's literals are no claim) and a comment: none is a claim. */
const BENIGN: readonly string[] = [
  "expect(result).toMatchObject({contract: 'hyperunix.find/v1', source: {representation: 'hyperunix.result/1'}, runtime: {binarySha256: expect.stringMatching(/^[0-9a-f]{64}$/)}});",
  "expect(JSON.stringify(result)).not.toContain('\"verified\":true');",
  `process.stdout.write(\`${DOLLAR}{hxLiveReceipt(result)}\\n\`);`,
  "expect(result).toMatchObject({source: {execution_status: {kind: expect.any(String)}}});",
  "// a licensed known-empty witness lands here once the gate opens: comments are trivia",
  "expect(JSON.stringify(result)).not.toContain('known-empty');",
  "expect(hxLiveInvariant(result)).not.toMatchObject({absenceLicensed: true});",
  "expect(result).not.toMatchObject({source: {execution_status: {kind: 'complete-empty'}}});",
  "expect(snapshot).not.toMatchObject({coverage: 'complete'});",
  "expect(snapshot.node.statusText).not.toContain('known-empty');",
  "expect(JSON.stringify(snapshot)).not.toMatch(/known-empty|\"success\"/);",
  "expect(verdict.absenceLicensed).toBe(false);",
  "expect(result.source.coverage_summary.licenses_absence).not.toBe(true);",
  "expect(verdict).toEqual(expect.not.objectContaining({absenceLicensed: true}));",
  "expect(result).toHaveProperty('source.coverage_summary.licenses_absence', false);",
  "expect(result).not.toHaveProperty('source.execution_status.kind', 'complete');",
  "expect(snapshot.coverage).toBe('partial');",
  "expect(snapshot.coverage).not.toBe('complete');",
  "expect(verdict.absenceLicensed).toBeFalsy();",
  "expect(verdict.absenceLicensed).not.toBeTruthy();",
  "expect(snapshot.node.statusText).toEqual(expect.not.stringContaining('known-empty'));",
  "expect(false).toBe(verdict.absenceLicensed);",
];
/** The CONSERVATIVE READINGS: each a statement no claim in its words, which the scanner flags by design (header). */
const CONSERVATIVE: readonly { readonly id: string; readonly statement: string }[] = [
  { id: "prose-negated-title", statement: "it('HX partial coverage never reads known-empty', () => {});" },
  { id: "prose-negated-message", statement: "expect(snapshot.coverage, 'never known-empty').toBe('partial');" },
  { id: "held-then-negated", statement: "const expected = {absenceLicensed: true}; expect(verdict).not.toMatchObject(expected);" },
  { id: "nested-under-throw", statement: "expect(() => expect(verdict.absenceLicensed).toBe(true)).toThrow();" },
  { id: "other-api-negation", statement: "assert.notDeepEqual(verdict, {absenceLicensed: true});" },
  { id: "negated-head-false", statement: "expect(() => ({absenceLicensed: false})).not.toThrow();" },
];
/** The LIVE SET forms' building blocks: the provider specifier, the live call's arguments, its named import and the call itself. */
const PROVIDER_SPECIFIER = "../src/workbench/providers/hyperunix.js";
const FIND_ARGUMENTS = 'process.cwd(), "hx.fs/regular-file", "src"';
const NAMED_IMPORT = `import {nativeHyperUnixFind} from "${PROVIDER_SPECIFIER}";`;
const FIND = `await nativeHyperUnixFind(${FIND_ARGUMENTS});`;
/** A one-line module: its top-level statements, then one case registered through `register`, titled `title`, whose body is `body`. */
const moduleOf = (top: string, register: string, body: string, title = '"HX probe"'): string => `${top} ${register}(${title}, async () => { ${body} });`.trim();
/** The argument a case method takes before it returns the next registration function. */
const METHOD_ARGUMENT: Readonly<Record<string, string>> = { each: "[[1]]", extend: "{}", for: "[[1]]", override: "{}", runIf: "true", scoped: "{}", skipIf: "false" };
interface LiveForm {
  readonly id: string;
  readonly surface: "membership" | "registration" | "fail-closed" | "control";
  readonly source: string;
  /** The HX cases the form registers, when not one (a form that carries the entry from one case into another). */
  readonly cases?: number;
}
/** One falsifier per LIVE SET form (membership M1-M6, registration, fail closed) and the quiet controls (header: LIVE SET). */
const LIVE_FORMS: readonly LiveForm[] = [
  { id: "named", surface: "membership", source: moduleOf(NAMED_IMPORT, "it", FIND) },
  { id: "aliased", surface: "membership", source: moduleOf(`import {nativeHyperUnixFind as find} from "${PROVIDER_SPECIFIER}";`, "it", `await find(${FIND_ARGUMENTS});`) },
  { id: "named-elsewhere", surface: "membership", source: moduleOf('import {nativeHyperUnixFind} from "./helpers/hx-barrel.js";', "it", FIND) },
  { id: "type-only", surface: "membership", source: moduleOf('import type {HyperUnix} from "@hyperunix/sdk";', "it", "const open: typeof HyperUnix.open = async () => { throw new Error('none'); }; await open({workspace: process.cwd()});") },
  { id: "client", surface: "membership", source: moduleOf('import {HyperUnix} from "@hyperunix/sdk";', "it", "await HyperUnix.open({workspace: process.cwd()});") },
  { id: "namespace", surface: "membership", source: moduleOf(`import * as hxProvider from "${PROVIDER_SPECIFIER}";`, "it", `await hxProvider.nativeHyperUnixFind(${FIND_ARGUMENTS});`) },
  { id: "namespace-element", surface: "membership", source: moduleOf(`import * as hxProvider from "${PROVIDER_SPECIFIER}";`, "it", `await hxProvider["nativeHyperUnixFind"](${FIND_ARGUMENTS});`) },
  { id: "namespace-sdk", surface: "membership", source: moduleOf('import * as sdk from "@hyperunix/sdk";', "it", "await sdk.HyperUnix.open({workspace: process.cwd()});") },
  { id: "namespace-bare-path", surface: "membership", source: moduleOf('import * as hxProvider from "../src/workbench/providers/hyperunix";', "it", `await hxProvider.nativeHyperUnixFind(${FIND_ARGUMENTS});`) },
  { id: "default", surface: "membership", source: moduleOf(`import hxProvider from "${PROVIDER_SPECIFIER}";`, "it", `await hxProvider.nativeHyperUnixFind(${FIND_ARGUMENTS});`) },
  { id: "dynamic", surface: "membership", source: moduleOf("", "it", `const hxProvider = await import("${PROVIDER_SPECIFIER}"); await hxProvider.nativeHyperUnixFind(${FIND_ARGUMENTS});`) },
  { id: "dynamic-destructured", surface: "membership", source: moduleOf("", "it", `const {nativeHyperUnixFind: find} = await import("${PROVIDER_SPECIFIER}"); await find(${FIND_ARGUMENTS});`) },
  { id: "dynamic-inline", surface: "membership", source: moduleOf("", "it", `await (await import("${PROVIDER_SPECIFIER}")).nativeHyperUnixFind(${FIND_ARGUMENTS});`) },
  { id: "dynamic-module", surface: "membership", source: moduleOf(`const hxProvider = await import("${PROVIDER_SPECIFIER}");`, "it", `await hxProvider.nativeHyperUnixFind(${FIND_ARGUMENTS});`) },
  { id: "dynamic-unawaited", surface: "membership", source: moduleOf(`const loading = import("${PROVIDER_SPECIFIER}");`, "it", `await (await loading).nativeHyperUnixFind(${FIND_ARGUMENTS});`) },
  { id: "alias", surface: "membership", source: moduleOf(`${NAMED_IMPORT} const zzFind = nativeHyperUnixFind;`, "it", `await zzFind(${FIND_ARGUMENTS});`) },
  { id: "alias-member", surface: "membership", source: moduleOf(`import * as hxProvider from "${PROVIDER_SPECIFIER}"; const find = hxProvider.nativeHyperUnixFind;`, "it", `await find(${FIND_ARGUMENTS});`) },
  { id: "alias-destructured", surface: "membership", source: moduleOf(`import * as hxProvider from "${PROVIDER_SPECIFIER}"; const {nativeHyperUnixFind: find} = hxProvider;`, "it", `await find(${FIND_ARGUMENTS});`) },
  { id: "alias-chain", surface: "membership", source: moduleOf(`${NAMED_IMPORT} const first = nativeHyperUnixFind; const second = first;`, "it", `await second(${FIND_ARGUMENTS});`) },
  { id: "assigned", surface: "membership", source: moduleOf(`${NAMED_IMPORT} let find; find = nativeHyperUnixFind;`, "it", `await find(${FIND_ARGUMENTS});`) },
  { id: "assigned-in-case", surface: "membership", cases: 2, source: `${NAMED_IMPORT} let find; it("HX probe", async () => { await find(${FIND_ARGUMENTS}); }); test("setup", () => { find ??= nativeHyperUnixFind; });` },
  { id: "destructuring-assigned", surface: "membership", source: moduleOf(`import * as hxProvider from "${PROVIDER_SPECIFIER}"; let find; ({nativeHyperUnixFind: find} = hxProvider);`, "it", `await find(${FIND_ARGUMENTS});`) },
  { id: "stored", surface: "membership", source: moduleOf(`${NAMED_IMPORT} const holder = {find: undefined}; holder.find = nativeHyperUnixFind;`, "it", `await holder.find(${FIND_ARGUMENTS});`) },
  { id: "root-test", surface: "registration", source: moduleOf(NAMED_IMPORT, "test", FIND) },
  { id: "import-alias", surface: "registration", source: moduleOf(`import {it as liveIt} from "vitest"; ${NAMED_IMPORT}`, "liveIt", FIND) },
  { id: "const-alias", surface: "registration", source: moduleOf(`${NAMED_IMPORT} const liveIt = it;`, "liveIt", FIND) },
  ...CASE_FLAGS.map((flag): LiveForm => ({ id: `flag-${flag}`, surface: "registration", source: moduleOf(NAMED_IMPORT, `it.${flag}`, FIND) })),
  ...CASE_METHODS.map((method): LiveForm => ({ id: `method-${method}`, surface: "registration", source: moduleOf(NAMED_IMPORT, `it.${method}(${METHOD_ARGUMENT[method] ?? ""})`, FIND) })),
  { id: "flags-chained", surface: "registration", source: moduleOf(NAMED_IMPORT, `test.${CASE_FLAGS.join(".")}`, FIND) },
  { id: "method-after-flag", surface: "registration", source: moduleOf(NAMED_IMPORT, `it.${CASE_FLAGS[0] ?? ""}.${CASE_METHODS[0] ?? ""}(${METHOD_ARGUMENT[CASE_METHODS[0] ?? ""] ?? ""})`, FIND) },
  { id: "flag-after-method", surface: "registration", source: moduleOf(NAMED_IMPORT, `it.runIf(true).${CASE_FLAGS[0] ?? ""}`, FIND) },
  { id: "extended-alias", surface: "registration", source: moduleOf(`${NAMED_IMPORT} const liveIt = it.extend({});`, "liveIt", FIND) },
  { id: "options-position", surface: "registration", source: `${NAMED_IMPORT} it("HX probe", {timeout: 60000}, async () => { ${FIND} });` },
  { id: "timeout-position", surface: "registration", source: `${NAMED_IMPORT} it("HX probe", async () => { ${FIND} }, 60000);` },
  { id: "function-body", surface: "registration", source: `${NAMED_IMPORT} it("HX probe", async function () { ${FIND} });` },
  { id: "nested-describe", surface: "registration", source: `${NAMED_IMPORT} describe("outer", () => { describe("inner", () => { it("HX probe", async () => { ${FIND} }); }); });` },
  { id: "template-title", surface: "registration", source: moduleOf(NAMED_IMPORT, "it", FIND, "`HX probe`") },
  { id: "computed-title", surface: "registration", source: moduleOf(NAMED_IMPORT, "it", FIND, '"HX " + "probe"') },
  { id: "require", surface: "fail-closed", source: moduleOf(`const hxProvider = require("${PROVIDER_SPECIFIER}");`, "it", `await hxProvider.nativeHyperUnixFind(${FIND_ARGUMENTS});`) },
  { id: "import-actual", surface: "fail-closed", source: moduleOf("", "it", `const hxProvider = await vi.importActual("${PROVIDER_SPECIFIER}"); await hxProvider.nativeHyperUnixFind(${FIND_ARGUMENTS});`) },
  { id: "held-specifier", surface: "fail-closed", source: moduleOf(`const specifier = "${PROVIDER_SPECIFIER}";`, "it", `const hxProvider = await import(specifier); await hxProvider.nativeHyperUnixFind(${FIND_ARGUMENTS});`) },
  { id: "export-from", surface: "fail-closed", source: moduleOf(`export {nativeHyperUnixFind} from "${PROVIDER_SPECIFIER}";`, "it", "expect(1).toBe(1);") },
  { id: "meta-resolve", surface: "fail-closed", source: moduleOf(`const resolved = import.meta.resolve("${PROVIDER_SPECIFIER}");`, "it", "expect(resolved).toBeTruthy();") },
  { id: "unread-binding", surface: "fail-closed", source: moduleOf("", "it", `const {[key]: find} = await import("${PROVIDER_SPECIFIER}"); await find(${FIND_ARGUMENTS});`) },
  { id: "unread-alias-binding", surface: "fail-closed", source: moduleOf(`import * as hxProvider from "${PROVIDER_SPECIFIER}"; const {[key]: find} = hxProvider;`, "it", `await find(${FIND_ARGUMENTS});`) },
  { id: "unread-assignment-pattern", surface: "fail-closed", source: moduleOf(`import * as hxProvider from "${PROVIDER_SPECIFIER}"; let find; ({[key]: find} = hxProvider);`, "it", `await find(${FIND_ARGUMENTS});`) },
  { id: "array-held", surface: "fail-closed", source: moduleOf(`${NAMED_IMPORT} const [find] = [nativeHyperUnixFind];`, "it", `await find(${FIND_ARGUMENTS});`) },
  { id: "hook", surface: "fail-closed", source: moduleOf(`${NAMED_IMPORT} let result: unknown; beforeAll(async () => { result = ${FIND} });`, "it", "expect(result).toBeDefined();") },
  { id: "helper-function", surface: "fail-closed", source: moduleOf(`${NAMED_IMPORT} async function readHx() { return nativeHyperUnixFind(${FIND_ARGUMENTS}); }`, "it", "await readHx();") },
  { id: "named-body", surface: "fail-closed", source: `${NAMED_IMPORT} const hxCase = async () => { ${FIND} }; it("HX probe", hxCase);` },
  { id: "describe-body", surface: "fail-closed", source: `${NAMED_IMPORT} describe("probe", () => { const pending = nativeHyperUnixFind(${FIND_ARGUMENTS}); it("HX probe", async () => { await pending; }); });` },
  { id: "fixture", surface: "fail-closed", source: `${NAMED_IMPORT} const liveIt = it.extend({find: async ({}, use) => use(nativeHyperUnixFind)}); liveIt("HX probe", async ({find}) => { await find(${FIND_ARGUMENTS}); });` },
  { id: "table", surface: "fail-closed", source: `${NAMED_IMPORT} it.each([nativeHyperUnixFind])("HX probe", async find => { await find(${FIND_ARGUMENTS}); });` },
  { id: "bound", surface: "fail-closed", source: moduleOf(`${NAMED_IMPORT} const find = nativeHyperUnixFind.bind(undefined);`, "it", `await find(${FIND_ARGUMENTS});`) },
  { id: "object-api", surface: "fail-closed", source: `${NAMED_IMPORT} const api = {it}; api.it("HX probe", async () => { ${FIND} });` },
  { id: "dynamic-outside", surface: "fail-closed", source: moduleOf(`void import("${PROVIDER_SPECIFIER}");`, "it", "expect(1).toBe(1);") },
  { id: "no-hx", surface: "control", source: moduleOf("", "it", "expect(1).toBe(1);", '"probe"') },
  { id: "sdk-non-entry", surface: "control", source: moduleOf('import {resultFromJson} from "@hyperunix/sdk";', "it", 'expect(resultFromJson).toBeTypeOf("function");', '"probe"') },
  { id: "provider-non-entry", surface: "control", source: moduleOf(`import {HYPERUNIX_FIND_CONTRACT} from "${PROVIDER_SPECIFIER}";`, "it", 'expect(HYPERUNIX_FIND_CONTRACT).toBe("hyperunix.find/v1");', '"probe"') },
  { id: "comment", surface: "control", source: moduleOf("/* nativeHyperUnixFind lands here once the gate opens */", "it", "expect(1).toBe(1);", '"probe"') },
  { id: "title-text", surface: "control", source: moduleOf("", "it", "expect(1).toBe(1);", '"HX nativeHyperUnixFind probe"') },
  { id: "side-effect", surface: "control", source: moduleOf(`import "${PROVIDER_SPECIFIER}";`, "it", "expect(1).toBe(1);", '"probe"') },
];
/** The ROUTE forms: the intact route, then each hollowing (header: ROUTE). */
const ROUTE_CHAIN = "expect(hxLiveInvariant(result)).toMatchObject({holds: true, violations: []});";
const ROUTE_TOP = `import {hxLiveInvariant} from "../src/workbench/hyperunix-observer.js"; ${NAMED_IMPORT}`;
const routeModule = (body: string): string => moduleOf(ROUTE_TOP, "it", `const result = ${FIND} ${body}`);
const ROUTE_FORMS: readonly { readonly id: string; readonly source: string }[] = [
  { id: "intact", source: routeModule(ROUTE_CHAIN) },
  { id: "negated", source: routeModule("expect(hxLiveInvariant(result)).not.toMatchObject({holds: true, violations: []});") },
  { id: "bare", source: routeModule("expect(hxLiveInvariant(result));") },
  { id: "other-matcher", source: routeModule("expect(hxLiveInvariant(result)).toBeDefined();") },
  { id: "other-expected", source: routeModule("expect(hxLiveInvariant(result)).toMatchObject({holds: true});") },
  { id: "soft", source: routeModule("expect.soft(hxLiveInvariant(result)).toMatchObject({holds: true, violations: []});") },
  { id: "other-subject", source: routeModule("expect(hxLiveInvariant({})).toMatchObject({holds: true, violations: []});") },
  { id: "outside-case", source: `${ROUTE_TOP} describe("probe", () => { const result = {}; ${ROUTE_CHAIN} it("HX probe", async () => { ${FIND} }); });` },
  { id: "twice", source: routeModule(`${ROUTE_CHAIN} ${ROUTE_CHAIN}`) },
  {
    id: "aliased",
    source: moduleOf(`import {hxLiveInvariant as invariant} from "../src/workbench/hyperunix-observer.js"; ${NAMED_IMPORT}`, "it", `const result = ${FIND} expect(invariant(result)).toMatchObject({holds: true, violations: []});`),
  },
  { id: "held", source: routeModule("const verdict = hxLiveInvariant(result); expect(verdict).toMatchObject({holds: true, violations: []});") },
];
const routeReading = (source: string): Json => plain(routesOf(parse("route.ts", source)));
/** The named residual families (RESIDUALS in the header): every member is, in its words, a claim, a live HX drive or a hollowed route
 * that its family's reader reads quiet. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  Q1: [
    "expect(verdict).toMatchObject({absenceLicensed: !0});",
    "const yes = true; expect(verdict).toMatchObject({absenceLicensed: yes});",
    "expect(verdict).toMatchObject({['absence' + 'Licensed']: true});",
    "expect(verdict.absenceLicensed === true).toBe(true);",
    "expect(Boolean(result.source.coverage_summary.licenses_absence)).toBe(true);",
    "await expect(Promise.resolve(verdict.absenceLicensed)).resolves.toBe(true);",
    "const {absenceLicensed: ok} = verdict; expect(ok).toBe(true);",
    "expect(verdict).toMatchObject({get absenceLicensed() { return true; }});",
    "const absenceLicensed = true; expect(verdict).toMatchObject({absenceLicensed});",
  ],
  Q2: ["assertLicensedComplete(result);"],
  Q3: [
    "assert.isTrue(verdict.absenceLicensed);",
    "assert.strictEqual(verdict.absenceLicensed, true);",
    "await expect.poll(() => verdict.absenceLicensed).toBe(true);",
    "const check = expect; check(verdict.absenceLicensed).toBe(true);",
  ],
  Q4: [
    "expect(verdict.absenceLicensed).toSatisfy((value: boolean) => value);",
    "expect(result.source.execution_status.kind).toMatch(/^complete/);",
    "expect(snapshot.coverage).toContain('complete');",
    "expect(result.source.execution_status.kind).toBeOneOf(['complete', 'complete-empty']);",
    "expect(['complete', 'complete-empty']).toContain(result.source.execution_status.kind);",
  ],
  Q5: [
    "expect(result).toMatchObject({source: {coverage_summary: {completeness: 'complete'}}});",
    "expect(result.source.coverage_summary.modes).toContain('complete-within-scope');",
    "expect(result).toMatchObject({source: {coverage_summary: {certificates_license_absence: true}}});",
    "expect(snapshot.node.statusTone).toBe('success');",
  ],
  Q6: [
    "expect(snapshot.node.statusText).toContain('known' + '-empty');",
    "expect(snapshot.node.statusText).toMatch(/known.empty/);",
    "expect(snapshot.node.statusText).toMatch(/known[-]empty/);",
    "expect(snapshot.node.statusText).toContain('known-emp');",
  ],
  Q7: [
    'import {liveFind} from "./helpers/hx-live.js"; it("HX probe", async () => { await liveFind(); });',
    'import {runHx} from "@hyperunix/sdk/raw"; it("HX probe", async () => { await runHx(["find", "--kind", "hx.fs/regular-file", "src"]); });',
    `it("HX probe", async () => { const hxProvider = await import("../src/workbench/providers/" + "hyperunix.js"); await hxProvider.nativeHyperUnixFind(${FIND_ARGUMENTS}); });`,
    'import {registry} from "./helpers/live-registry.js"; it("HX probe", async () => { await registry.invoke("hyperunix.find", {kind: "hx.fs/regular-file", root: "src"}, {grants: ["hyperunix:read"]}); });',
    `${NAMED_IMPORT} const stash: (() => Promise<unknown>)[] = []; it("HX hand-off", () => { stash.push(() => nativeHyperUnixFind(${FIND_ARGUMENTS})); }); it("HX probe", async () => { await stash[0]?.(); });`,
  ],
  Q8: [
    routeModule(`if (Date.now() < 0) ${ROUTE_CHAIN}`),
    routeModule(`return; ${ROUTE_CHAIN}`),
    routeModule(`const never = () => ${ROUTE_CHAIN.slice(0, -1)};`),
    moduleOf(ROUTE_TOP, "it", `const live = ${FIND} { const result = {runtime: live}; ${ROUTE_CHAIN} }`),
  ],
};
/** Which reader each residual family names a blind spot of. */
const RESIDUAL_READER: Readonly<Record<string, string>> = { Q1: "scanner", Q2: "scanner", Q3: "scanner", Q4: "scanner", Q5: "scanner", Q6: "scanner", Q7: "live set", Q8: "route" };
const QUIET_LIVE: Json = plain({ live: false, cases: [], unresolved: 0, outside: 0 });
/** A residual member's reading by its family's reader: the scanner's claims, the LIVE SET summary or the ROUTE list. */
function memberReading(pin: string, member: string): Json {
  const reader = RESIDUAL_READER[pin];
  if (reader === "live set") return liveSummary(member);
  if (reader === "route") return routeReading(member);
  return plain(probeClaims([member]));
}
/** Quiet: the scanner reads no claim; the LIVE SET reader reads no HX case titled "HX probe" and nothing unresolved or outside; the
 * ROUTE reader reads the intact route. */
function readsQuiet(pin: string, member: string): boolean {
  const reader = RESIDUAL_READER[pin];
  if (reader === "live set") {
    const read = liveReading(parse("member.ts", member));
    return !read.cases.some(entry => entry.title === "HX probe") && read.unresolved.length === 0 && read.outside.length === 0;
  }
  return isDeepStrictEqual(memberReading(pin, member), reader === "route" ? routeReading(ROUTE_FORMS[0]?.source ?? "") : plain([]));
}
const quietRow = (pin: string): Json => plain((RESIDUALS[pin] ?? []).map(member => memberReading(pin, member)));

// ---- the R1 predicate over the registered provider path, and the vocabulary it yields ----

const WS = "/census/hx-licensed-complete-ws";
const DIGEST = "0123456789abcdef".repeat(4);
const VERSION = "0.0.0-census";
/** One SDK hyperunix.result/1 document of the given kind and licence, in the SDK's own JSON representation. */
function sdkDocument(kind: string, licensed: boolean): JsonRecord {
  return {
    representation: "hyperunix.result/1",
    operation: "find",
    rows: [],
    rows_retained: true,
    coverage: [],
    status: { exit_code: 0, signal: null, streams: [{ name: "hx-fs", frames: 1, ended: true, mode: "observation" }], terminal_reached: true, frames_total: 1 },
    execution_status: { kind, diagnostic_code: null },
    diagnostics: [],
    view: null,
    cost: null,
    transport: { started_at: "2026-10-28T00:00:00.000Z", startup_latency_s: 0.01, process_duration_s: 0.1, stdout_bytes: 1, stderr_bytes: 0, stderr_bytes_retained: 0, frames: 1 },
    workspace_root: WS,
    terminal: "complete",
    truth: null,
    coverage_summary: {
      modes: [licensed ? "complete-within-scope" : "opportunistic"],
      completeness: licensed ? "complete" : "incomplete",
      licenses_absence: licensed,
      certificates_license_absence: licensed,
      incomplete_regions: [],
      result_coverage: null,
      answer_count: 0,
    },
    evidence: { support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {} },
    digest: null,
    digest_source: "absent",
    execution_id: null,
    budget_dimension: null,
    extensions: {},
  };
}
/** What the registered hyperunix.find provider returns for that document (registerHyperUnixFind over a reader stub). */
async function providerRead(document: JsonRecord): Promise<JsonValue> {
  const native = resultFromJson(document);
  const registry = new CapabilityRegistry();
  hyperunixProvider.registerHyperUnixFind(registry, { find: async () => native, runtime: async () => ({ version: VERSION, binarySha256: DIGEST }), close: async () => {} }, WS);
  return plain(await registry.invoke("hyperunix.find", { kind: "hx.fs/regular-file", root: "src" }, { grants: ["hyperunix:read"], signal: new AbortController().signal })) as JsonValue;
}
const getPath = (value: Json, path: string): Json | undefined =>
  path.split(".").reduce<Json | undefined>((at, key) => (at !== null && typeof at === "object" && !Array.isArray(at) ? (at as { readonly [key: string]: Json })[key] : undefined), value);
function setPath(value: Json, path: string, next: Json): JsonValue {
  const copy = JSON.parse(JSON.stringify(value)) as Record<string, unknown>;
  const keys = path.split(".");
  let at: Record<string, unknown> = copy;
  for (const key of keys.slice(0, -1)) {
    const child = at[key];
    if (!isRecord(child)) return copy as JsonValue;
    at = child;
  }
  at[keys.at(-1) ?? ""] = next;
  return copy as JsonValue;
}
/** One EXCLUSIVITY cell: the predicate's holds and absenceLicensed over the provider path's reading of a kind under a licence state. */
interface Cell {
  readonly holds: boolean;
  readonly absenceLicensed: boolean;
}
async function cellOf(kind: string, licence: boolean): Promise<Cell> {
  const verdict = hxLiveInvariant(await providerRead(sdkDocument(kind, licence)));
  return { holds: verdict.holds, absenceLicensed: verdict.absenceLicensed };
}
/** The armed verdicts, the EXCLUSIVITY matrix and the claim vocabulary they yield, read from src (the predicate, the projection,
 * the consumed fields). */
async function armed(): Promise<{ readonly vocabulary: ClaimVocabulary; readonly witness: Json }> {
  const licensedKind = "complete-empty";
  const licensed = plain(await providerRead(sdkDocument(licensedKind, true)));
  const unlicensed = plain(await providerRead(sdkDocument("incomplete", false)));
  const licensedVerdict = plain(hxLiveInvariant(licensed as JsonValue));
  const unlicensedVerdict = plain(hxLiveInvariant(unlicensed as JsonValue));
  const observed = HYPERUNIX_CONSUMED_FIELDS.filter(field => field.use === "observed" && !field.path.includes("[]")).map(field => field.path);
  const kindPath = observed.find(path => getPath(licensed, path) === licensedKind) ?? "";
  const licencePath =
    observed.find(path => {
      if (getPath(licensed, path) !== true) return false;
      const flipped = hxLiveInvariant(setPath(licensed, path, false));
      return flipped.holds && !flipped.absenceLicensed;
    }) ?? "";
  const matrix: { readonly kind: string; readonly licensed: Cell; readonly unlicensed: Cell }[] = [];
  for (const kind of HYPERUNIX_EXECUTION_KINDS) matrix.push({ kind, licensed: await cellOf(kind, true), unlicensed: await cellOf(kind, false) });
  const completeKinds = matrix.filter(row => row.licensed.absenceLicensed).map(row => row.kind);
  const flips = isRecord(licensedVerdict) && isRecord(unlicensedVerdict) ? Object.keys(licensedVerdict).filter(key => !isDeepStrictEqual(licensedVerdict[key], unlicensedVerdict[key])) : [];
  const context = { scope: { workspace: WS, principal: "local-operator:census" }, target: { kind: "hx.fs/regular-file", root: "src" }, capturedAt: "2026-10-28T00:00:00Z", observedAt: "2026-10-28T00:00:01Z" };
  const [snapshot] = hyperunixTopology(licensed as JsonValue, context).snapshots;
  const statusText = snapshot?.node.statusText ?? "";
  const vocabulary: ClaimVocabulary = {
    verdictField: flips.length === 1 ? (flips[0] ?? "") : `flips: ${flips.join(",")}`,
    licenceField: licencePath.split(".").at(-1) ?? "",
    completeKinds,
    coverage: snapshot?.coverage ?? "",
    knownEmpty: statusText.split(" ")[0] ?? "",
  };
  return {
    vocabulary,
    witness: plain({
      verdicts: { licensed: licensedVerdict, unlicensed: unlicensedVerdict },
      projection: { coverage: snapshot?.coverage, statusTone: snapshot?.node.statusTone, statusText },
      paths: { kind: kindPath, licence: licencePath },
      matrix,
      vocabulary,
    }),
  };
}

// ---- docs/14: the evidence table, its lead paragraph, the matrix row and the residual table ----

interface EvidenceRow {
  readonly subsystem: string;
  readonly half: string;
  readonly tier: string;
  readonly file: string;
  readonly title: string;
}
function evidenceRows(): { readonly ok: boolean; readonly why: string; readonly rows: readonly EvidenceRow[] } {
  const tables = sectionTables(textOf(DOCS_14), EVIDENCE, 2, [DOCS_PARENT]);
  const rows = (tables.grids[0] ?? []).slice(1).map(cells => {
    const pinned = /^(test\/[\w./-]+\.ts): "(.+)"$/.exec(cells[3] ?? "");
    return { subsystem: cells[0] ?? "", half: cells[1] ?? "", tier: cells[2] ?? "", file: pinned?.[1] ?? "", title: pinned?.[2] ?? "" };
  });
  return { ok: tables.ok && tables.grids.length === 1, why: tables.why, rows };
}
const hxRows = (): readonly EvidenceRow[] => evidenceRows().rows.filter(row => row.subsystem === "HX");
/** The licensed-complete branch is the HX cell's positive half ("complete query and bounded result"). */
const licensedHalf = (): readonly EvidenceRow[] => hxRows().filter(row => row.half.startsWith("positive"));
/** docs/14's HX default-gate evidence cases (the fixture-labelled branch and its negative control) and whether S1's scanner reads a
 * claim in each case's body (null: the case is not registered by that title). */
function fixtureReads(): readonly { readonly half: string; readonly file: string; readonly title: string; readonly reads: boolean | null }[] {
  return hxRows()
    .filter(row => row.tier === DEFAULT_GATE_LABEL)
    .map(row => {
      const sf = parseRepo(row.file);
      const found = casesOf(sf).find(entry => entry.title === row.title);
      return { half: row.half, file: row.file, title: row.title, reads: found === undefined ? null : claimsIn(found.body, sf, CLAIM_VOCABULARY).length > 0 };
    });
}
/** A docs/14 census section: its binding, HTML, non-table blocks (a paragraph as its rendered text and markdown), columns and rows
 * (cells joined by ` | `, one code span unwrapped). */
function censusSection(heading: string): {
  readonly ok: boolean;
  readonly why: string;
  readonly html: boolean;
  readonly lead: readonly Json[];
  readonly columns: readonly string[];
  readonly rows: readonly string[];
} {
  const markdown = textOf(DOCS_14);
  const section = docsSection(markdown, heading, 2, [DOCS_PARENT]);
  const tables = sectionTables(markdown, heading, 2, [DOCS_PARENT]);
  const [grid, ...others] = tables.grids;
  const [header, ...body] = grid ?? [];
  return {
    ok: section.ok && tables.ok && grid !== undefined && others.length === 0,
    why: section.ok ? tables.why : section.why,
    html: section.hasHtml,
    lead: section.blocks
      .filter(block => block.kind !== "other" || block.type !== "table")
      .map((block): Json => (block.kind === "paragraph" ? { text: block.text, markdown: block.markdown } : `${block.kind} block`)),
    columns: header ?? [],
    rows: body.map(cells => cells.map(cell => /^`(.*)`$/.exec(cell)?.[1] ?? cell).join(" | ")),
  };
}
const cellsOf = (line: string): string[] =>
  line
    .split("|")
    .map(cell => cell.trim())
    .filter((cell, index, all) => !(cell === "" && (index === 0 || index === all.length - 1)));
/** The citation a quote carries: (path:line@sha). */
const citationOf = (quote: string): { readonly path: string; readonly line: number; readonly sha: string } | undefined => {
  const match = /\(([\w./-]+):(\d+)@([0-9a-f]{7,40})\)/.exec(quote);
  return match ? { path: match[1] ?? "", line: Number(match[2]), sha: match[3] ?? "" } : undefined;
};
/** The atoms a label or quote carries, in order: each parenthetical citation (path:line@sha) and each bead id. */
const atomsOf = (text: string): string[] => [...text.matchAll(/\(([\w./-]+:\d+@[0-9a-f]{7,40})\)|\b(wb-[a-z0-9]+(?:\.\d+)*)\b/g)].map(match => match[1] ?? match[2] ?? "");
/** The first line of a file's lead comment, without its `*`. */
function openingLine(file: string): string {
  const [first, second] = textOf(file).split("\n");
  return first?.trim() === "/**" ? (second ?? "").replace(/^\s*\*\s?/, "") : "";
}

// ---- the judged pins: each returns its witness ----

const IMPL: Readonly<Record<string, () => Json | Promise<Json>>> = {
  W1: () => {
    const tier = nativeTier();
    const readings = tier.files.map(file => ({ file, reading: liveReading(parseRepo(file)) }));
    return plain({
      config: tier.config,
      files: tier.files,
      entryPoints: HX_ENTRIES,
      live: readings
        .filter(({ reading }) => reading.live)
        .map(({ file, reading }) => ({ file, entries: reading.entries, cases: reading.cases, witnessing: reading.witnessing })),
      unresolved: readings.flatMap(({ file, reading }) => reading.unresolved.map(entry => `${file}:${entry}`)),
      outside: readings.flatMap(({ file, reading }) => reading.outside.map(entry => `${file}:${entry}`)),
      forms: Object.fromEntries(LIVE_FORMS.map(form => [form.id, liveSummary(form.source)])),
    });
  },
  W2: async () =>
    plain({
      route: liveFiles().map(file => ({ file, routes: routesOf(parseRepo(file)) })),
      routeForms: Object.fromEntries(ROUTE_FORMS.map(form => [form.id, routeReading(form.source)])),
      armed: (await armed()).witness,
    }),
  S1: () =>
    plain({
      files: Object.fromEntries(nativeTier().files.map(file => [file, claimsOfSource(file, textOf(file))])),
      falsifiers: Object.fromEntries(FALSIFIERS.map(entry => [entry.id, probeClaims([entry.statement]).length])),
      benign: probeClaims(BENIGN),
      conservative: Object.fromEntries(CONSERVATIVE.map(entry => [entry.id, probeClaims([entry.statement]).length])),
      fixtures: fixtureReads(),
    }),
  S2: () => {
    const evidence = evidenceRows();
    const section = docsSection(textOf(DOCS_14), EVIDENCE, 2, [DOCS_PARENT]);
    return plain({
      table: evidence.ok ? "one table" : `refused: ${evidence.why}`,
      licensedHalf: licensedHalf().map(row => ({ half: row.half, tier: row.tier, file: row.file, title: row.title })),
      section: section.ok ? "bound" : `refused: ${section.why}`,
      html: section.hasHtml,
      lead: section.blocks.filter(block => block.kind !== "other" || block.type !== "table"),
    });
  },
  T1: () => {
    const configs = { [DEFAULT_GATE_LABEL]: configOf(DEFAULT_GATE_TIER), [NATIVE_TIER]: configOf(NATIVE_TIER) };
    return plain({
      configs,
      rows: hxRows().map(row => ({
        half: row.half,
        tier: row.tier,
        file: row.file,
        selectedBy: { default: selects(defaultConfig, row.file), [NATIVE_TIER]: selects(nativeConfig, row.file) },
        registration: casesOf(parseRepo(row.file)).find(entry => entry.title === row.title)?.registration ?? null,
      })),
    });
  },
  T2: () => {
    const cited = citationOf(QUOTES.T2 ?? "");
    const shown = cited === undefined ? "" : execFileSync("git", ["show", `${cited.sha}:${cited.path}`], { cwd: ROOT, encoding: "utf8" });
    const line = shown.split("\n")[(cited?.line ?? 0) - 1] ?? "";
    const matrix = sectionTables(textOf(DOCS_14), MATRIX, 2, [DOCS_PARENT]);
    const current = (matrix.grids[0] ?? []).filter(cells => cells[0] === "HX");
    return plain({ atom: cited === undefined ? null : `${cited.path}:${cited.line}@${cited.sha}`, citation: cited ?? null, cited: cellsOf(line), current });
  },
  T3: () => {
    const [atom] = atomsOf(QUOTES.T3 ?? "");
    const gate = /^gate = \[([^\]]*)\]$/m.exec(textOf("forge.toml"))?.[1] ?? "";
    const steps = [...gate.matchAll(/"([^"]+)"/g)].map(match => match[1] ?? "");
    const binders = atom === undefined ? [] : testFiles().filter(file => selects(censusConfig, file) && openingLine(file).startsWith(`${atom} `));
    const [binder] = binders;
    let bindsSection = false;
    const visit = (node: ts.Node): void => {
      if (ts.isStringLiteral(node) && node.text === MATRIX) bindsSection = true;
      ts.forEachChild(node, visit);
    };
    if (binders.length === 1 && binder !== undefined) visit(parseRepo(binder));
    return plain({ atom: atom ?? null, gateRunsCensus: steps.includes(CENSUS_STEP), config: configOf(CENSUS_STEP), binders, bindsSection });
  },
  N1: () => {
    const fixtures = [...new Set(licensedHalf().map(row => row.file))];
    const line = textOf(TRACEABILITY).split("\n")[TRACE_LINE - 1] ?? "";
    return plain({
      sentences: line.split(/(?<=\.) (?=[A-Z])/).filter(sentence => sentence.includes(NOT_NATIVE)),
      nativeSelectedByDefault: nativeTier().files.filter(file => selects(defaultConfig, file)),
      fixtures: fixtures.map(file => ({ file, default: selects(defaultConfig, file), [NATIVE_TIER]: selects(nativeConfig, file) })),
    });
  },
  Q1: () => quietRow("Q1"),
  Q2: () => quietRow("Q2"),
  Q3: () => quietRow("Q3"),
  Q4: () => quietRow("Q4"),
  Q5: () => quietRow("Q5"),
  Q6: () => quietRow("Q6"),
  Q7: () => quietRow("Q7"),
  Q8: () => quietRow("Q8"),
};

// ---- the outside anchors' readers: the bead's own description in the tracker export ----

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly readings: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly witnesses: Readonly<Record<string, Json>>;
  readonly tests: readonly string[];
  readonly gate: { readonly state: string; readonly condition: string; readonly citations: readonly string[]; readonly onLanding: string; readonly measured: Json };
}
const ROSTER = JSON.parse(textOf(ROSTER_PATH)) as Roster;
const REACHED: { readonly pin: string; readonly same: boolean }[] = [];

/** The tracker export's title and description for a bead (the notes are never read). */
function beadRow(bead: string): { readonly title: string; readonly description: string } | undefined {
  for (const line of textOf(EXPORT).split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (!isRecord(row) || row.id !== bead) continue;
    const { title, description } = row;
    if (typeof title === "string" && typeof description === "string") return { title, description };
  }
  return undefined;
}
/** The STATEMENT line: its condition, the condition's citations, the obligation and the until-then clause. */
function statementOf(description: string): { readonly condition: string; readonly citations: string; readonly obligation: string; readonly until: string } | undefined {
  const match = /^STATEMENT: When (.+) \(([^()]+)\), (Pi shall .+?); (until then .+)\.$/m.exec(description);
  return match ? { condition: match[1] ?? "", citations: match[2] ?? "", obligation: match[3] ?? "", until: match[4] ?? "" } : undefined;
}
/** The description's ACCEPTANCE list: each element of its one-line bracket, single- or double-quoted. */
function acceptanceItems(description: string): string[] {
  const body = /^ACCEPTANCE: \[(.*)\]$/m.exec(description)?.[1] ?? "";
  return [...body.matchAll(/(["'])(.*?)\1(?=, |$)/g)].map(match => match[2] ?? "");
}
/** A clause without a trailing parenthetical citation (path:line, optionally @sha). */
function uncited(clause: string): { readonly label: string; readonly citation?: string } {
  const cited = /^(.*) \(([\w./-]+:\d+(?:@[0-9a-f]{7,40})?)\)$/.exec(clause);
  return cited ? { label: cited[1] ?? "", citation: cited[2] ?? "" } : { label: clause };
}
/** The quotes tile the label in order, with nothing but separators (whitespace, punctuation, an em dash) between. */
function tiles(label: string, quotes: readonly string[]): boolean {
  const separators = new RegExp(`^[\\s,;:()${EM_DASH}]*$`);
  let at = 0;
  for (const quote of quotes) {
    const found = label.indexOf(quote, at);
    if (found < 0 || !separators.test(label.slice(at, found))) return false;
    at = found + quote.length;
  }
  return separators.test(label.slice(at));
}

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""} - ${READING[pin] ?? ""}`, { timeout: BUDGET_MS }, async () => {
        const implementation = IMPL[pin];
        const witness = implementation === undefined ? null : await implementation();
        expect(witness, `${pin} has a case`).not.toBeNull();
        const expected = ROSTER.witnesses[pin];
        REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
        expect(witness, `${pin}'s witness equals the roster's`).toStrictEqual(expected);
      });
    }
  }

  it("rule 16: the rows, the residual families and their readers, the falsifier, benign and conservative rosters, the probe preamble, the claim vocabulary, the LIVE SET and ROUTE forms and the registration partition are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["W:2", "S:2", "T:3", "N:1", "Q:8"]);
    expect(Object.entries(RESIDUALS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:9", "Q2:1", "Q3:4", "Q4:5", "Q5:4", "Q6:4", "Q7:5", "Q8:4"]);
    expect(RESIDUAL_READER).toEqual({ Q1: "scanner", Q2: "scanner", Q3: "scanner", Q4: "scanner", Q5: "scanner", Q6: "scanner", Q7: "live set", Q8: "route" });
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(READING), "one reading per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(IMPL), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(FALSIFIERS.map(entry => `${entry.id}:${entry.form}`)).toEqual([
      "verdict-property:verdictField",
      "verdict-tobe:verdictField",
      "verdict-not-false:verdictField",
      "verdict-truthy:verdictField",
      "verdict-as-const:verdictField",
      "verdict-soft:verdictField",
      "verdict-paren:verdictField",
      "verdict-satisfies:verdictField",
      "verdict-tobe-paren:verdictField",
      "verdict-non-null:verdictField",
      "verdict-type-assertion:verdictField",
      "verdict-computed-key:verdictField",
      "verdict-element-matcher:verdictField",
      "verdict-reversed:verdictField",
      "verdict-optional-chain:verdictField",
      "verdict-message:verdictField",
      "verdict-destructured:verdictField",
      "verdict-held-object:verdictField",
      "verdict-object-containing:verdictField",
      "verdict-resolves-path:verdictField",
      "verdict-rejects-path:verdictField",
      "verdict-not-property-false:verdictField",
      "verdict-asymmetric-not-false:verdictField",
      "verdict-nested-assertion:verdictField",
      "verdict-class-field:verdictField",
      "licence-property:licenceField",
      "licence-quoted-key:licenceField",
      "licence-element:licenceField",
      "licence-not-falsy:licenceField",
      "licence-dotted-path:licenceField",
      "licence-array-path:licenceField",
      "licence-resolves-path:licenceField",
      "licence-as-const:licenceField",
      "licence-toequal-as:licenceField",
      "licence-path-paren:licenceField",
      "licence-soft-path:licenceField",
      "licence-not-path-false:licenceField",
      "licence-template-key:licenceField",
      "licence-reversed-not:licenceField",
      "licence-member-assignment:licenceField",
      "kind-complete:completeKinds:complete",
      "kind-quoted-complete:completeKinds:complete",
      "kind-resolves-path:completeKinds:complete",
      "kind-reversed:completeKinds:complete",
      "kind-element-assignment:completeKinds:complete",
      "kind-complete-empty:completeKinds:complete-empty",
      "kind-matcher:completeKinds:complete-empty",
      "kind-path:completeKinds:complete-empty",
      "kind-as-const:completeKinds:complete-empty",
      "kind-soft:completeKinds:complete-empty",
      "kind-computed-key:completeKinds:complete-empty",
      "kind-array-path:completeKinds:complete-empty",
      "coverage-complete:coverage",
      "coverage-as-const:coverage",
      "coverage-paren:coverage",
      "coverage-matcher:coverage",
      "coverage-path:coverage",
      "coverage-element-subject:coverage",
      "known-empty-text:knownEmpty",
      "known-empty-template:knownEmpty",
      "known-empty-title:knownEmpty",
      "known-empty-regex:knownEmpty",
      "known-empty-regex-anchored:knownEmpty",
      "known-empty-string-matching:knownEmpty",
      "known-empty-case:knownEmpty",
      "known-empty-escaped:knownEmpty",
      "known-empty-string-containing:knownEmpty",
      "known-empty-held:knownEmpty",
      "known-empty-double-negation:knownEmpty",
      "known-empty-describe:knownEmpty",
    ]);
    expect(BENIGN).toHaveLength(22);
    expect(CONSERVATIVE.map(entry => entry.id)).toEqual(["prose-negated-title", "prose-negated-message", "held-then-negated", "nested-under-throw", "other-api-negation", "negated-head-false"]);
    expect(LIVE_PREAMBLE).toHaveLength(8);
    expect(CLAIM_VOCABULARY).toEqual({ verdictField: "absenceLicensed", licenceField: "licenses_absence", completeKinds: ["complete", "complete-empty"], coverage: "complete", knownEmpty: "known-empty" });
    expect(LIVE_FORMS.map(form => `${form.surface}:${form.id}`)).toEqual([
      "membership:named",
      "membership:aliased",
      "membership:named-elsewhere",
      "membership:type-only",
      "membership:client",
      "membership:namespace",
      "membership:namespace-element",
      "membership:namespace-sdk",
      "membership:namespace-bare-path",
      "membership:default",
      "membership:dynamic",
      "membership:dynamic-destructured",
      "membership:dynamic-inline",
      "membership:dynamic-module",
      "membership:dynamic-unawaited",
      "membership:alias",
      "membership:alias-member",
      "membership:alias-destructured",
      "membership:alias-chain",
      "membership:assigned",
      "membership:assigned-in-case",
      "membership:destructuring-assigned",
      "membership:stored",
      "registration:root-test",
      "registration:import-alias",
      "registration:const-alias",
      "registration:flag-concurrent",
      "registration:flag-fails",
      "registration:flag-only",
      "registration:flag-sequential",
      "registration:flag-skip",
      "registration:flag-todo",
      "registration:method-each",
      "registration:method-extend",
      "registration:method-for",
      "registration:method-override",
      "registration:method-runIf",
      "registration:method-scoped",
      "registration:method-skipIf",
      "registration:flags-chained",
      "registration:method-after-flag",
      "registration:flag-after-method",
      "registration:extended-alias",
      "registration:options-position",
      "registration:timeout-position",
      "registration:function-body",
      "registration:nested-describe",
      "registration:template-title",
      "registration:computed-title",
      "fail-closed:require",
      "fail-closed:import-actual",
      "fail-closed:held-specifier",
      "fail-closed:export-from",
      "fail-closed:meta-resolve",
      "fail-closed:unread-binding",
      "fail-closed:unread-alias-binding",
      "fail-closed:unread-assignment-pattern",
      "fail-closed:array-held",
      "fail-closed:hook",
      "fail-closed:helper-function",
      "fail-closed:named-body",
      "fail-closed:describe-body",
      "fail-closed:fixture",
      "fail-closed:table",
      "fail-closed:bound",
      "fail-closed:object-api",
      "fail-closed:dynamic-outside",
      "control:no-hx",
      "control:sdk-non-entry",
      "control:provider-non-entry",
      "control:comment",
      "control:title-text",
      "control:side-effect",
    ]);
    expect(ROUTE_FORMS.map(form => form.id)).toEqual(["intact", "negated", "bare", "other-matcher", "other-expected", "soft", "other-subject", "outside-case", "twice", "aliased", "held"]);
    expect({ roots: TEST_ROOTS, flags: CASE_FLAGS, methods: CASE_METHODS, other: NON_CASE_MEMBERS }).toEqual({
      roots: ["it", "test"],
      flags: ["concurrent", "fails", "only", "sequential", "skip", "todo"],
      methods: ["each", "extend", "for", "override", "runIf", "scoped", "skipIf"],
      other: ["afterAll", "afterEach", "aroundAll", "aroundEach", "beforeAll", "beforeEach", "describe", "suite"],
    });
  });

  it("the description anchors: the bead's own description binds the rows, row N's citation, every label atom's carrier pin and the gate block", { timeout: BUDGET_MS }, async () => {
    const row = beadRow(BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    expect(row?.title.startsWith(`[${REQUIREMENT}] `), "the title opens with the requirement id").toBe(true);
    const statement = statementOf(row?.description ?? "");
    expect(statement, "the description carries one STATEMENT line of the conditional form").toBeDefined();
    const items = acceptanceItems(row?.description ?? "");
    expect(items.map(item => item.split(": ")[0]), "the acceptance holds a standing item and an on-landing item").toEqual(["Standing", "On landing"]);
    const standing = (/^Standing: (.*)\.$/.exec(items[0] ?? "")?.[1] ?? "").split("; ").map(uncited);
    const clauses = [statement?.obligation, statement?.until, ...standing.map(clause => clause.label)];
    expect(clauses, "the statement's two clauses and the standing item's two clauses are rows W, S, T and N, in order").toEqual(["W", "S", "T", "N"].map(id => ROWS.find(entry => entry.id === id)?.label));
    for (const entry of ROWS.filter(candidate => candidate.id !== "Q")) {
      expect(tiles(entry.label, entry.pins.map(pin => QUOTES[pin] ?? "")), `row ${entry.id}'s pin quotes tile its label`).toBe(true);
      for (const pin of entry.pins) expect(atomsOf(QUOTES[pin] ?? "").length, `${pin}'s quote carries at most one atom`).toBeLessThanOrEqual(1);
      for (const atom of atomsOf(entry.label)) {
        const carriers = entry.pins.filter(pin => atomsOf(QUOTES[pin] ?? "").includes(atom));
        expect(carriers, `row ${entry.id}'s atom ${atom} is carried by exactly one pin quote`).toHaveLength(1);
        const [carrier] = carriers;
        const witness = carrier === undefined ? null : await IMPL[carrier]?.();
        expect(isRecord(witness) ? witness.atom : undefined, `and ${carrier}'s witness names it`).toBe(atom);
      }
    }
    expect(
      ROWS.filter(entry => entry.id !== "Q").flatMap(entry => atomsOf(entry.label)),
      "the label atoms: row T's docs/14 citation and binder bead",
    ).toEqual(["docs/workbench/14-qa-and-benchmarks.md:25@9df9a03", "wb-cax.25"]);
    expect(standing.map(clause => clause.citation), "row N's clause cites the TRACEABILITY line N1 reads; row T's citation stays in its label").toEqual([undefined, `${basename(TRACEABILITY)}:${TRACE_LINE}`]);
    expect(ROSTER.gate.state, "the gate artifact is absent: the on-landing leg is not delivered").toBe("absent");
    expect(ROSTER.gate.condition, "the gate block's condition is the statement's").toBe(statement?.condition);
    expect(ROSTER.gate.citations, "and its citations").toEqual(statement?.citations.split("; "));
    expect(ROSTER.gate.onLanding, "and the on-landing item, verbatim").toBe(/^On landing: (.*)\.$/.exec(items[1] ?? "")?.[1]);
  });

  it("the docs and src anchors: docs/14's residual table binds row Q and every member, src binds the claim vocabulary and every falsifier form, and docs/14's HX fixture cases bind the scanner's sense", { timeout: BUDGET_MS }, async () => {
    const docs = censusSection(RESIDUAL_HEADING);
    expect(docs.ok, `docs/14 holds one '${RESIDUAL_HEADING}' section under its parent heading, with one table: ${docs.why}`).toBe(true);
    expect(docs.html, "the residual section carries no HTML").toBe(false);
    expect(docs.lead, "its lead paragraph, verbatim in rendered text and markdown, is its only other block").toEqual([{ text: RESIDUAL_LEAD, markdown: RESIDUAL_LEAD }]);
    expect(docs.columns, "the residual table's columns").toEqual(RESIDUAL_COLUMNS);
    const quiet = ROWS.find(entry => entry.id === "Q")?.pins ?? [];
    expect(docs.rows, "row Q: every residual family, its quiet row and every member, both ways and in table order").toEqual(
      quiet.flatMap(pin => (RESIDUALS[pin] ?? []).map(member => `${pin} | ${QUOTES[pin] ?? ""} | ${member}`)),
    );
    expect(
      Object.entries(RESIDUALS).flatMap(([pin, members]) => members.filter(member => !readsQuiet(pin, member)).map(member => `${pin}: ${member}`)),
      "every residual member reads quiet to its family's reader",
    ).toEqual([]);
    const derived = (await armed()).vocabulary;
    expect(CLAIM_VOCABULARY, "the scanner's vocabulary is the one the predicate, the projection and the consumed fields yield").toEqual(derived);
    const spelledValue = (form: string): string => (form.startsWith("completeKinds:") ? form.slice("completeKinds:".length) : String(derived[form as keyof ClaimVocabulary]));
    const forms = ["verdictField", "licenceField", ...derived.completeKinds.map(kind => `completeKinds:${kind}`), "coverage", "knownEmpty"];
    for (const form of forms) {
      const spelled = FALSIFIERS.filter(entry => entry.form === form && entry.statement.includes(spelledValue(form)) && probeClaims([entry.statement]).length > 0);
      expect(spelled.length, `the derived form ${form} has a falsifier spelling its value that the scanner flags`).toBeGreaterThan(0);
    }
    expect([...new Set(FALSIFIERS.map(entry => entry.form))], "and no falsifier names a form the derivation lacks").toEqual(forms);
    expect(
      FALSIFIERS.filter(entry => probeClaims([entry.statement]).length === 0).map(entry => entry.id),
      "every falsifier flags",
    ).toEqual([]);
    expect(probeClaims(BENIGN), "no benign statement flags").toEqual([]);
    expect(
      CONSERVATIVE.filter(entry => probeClaims([entry.statement]).length === 0).map(entry => entry.id),
      "every conservative row flags",
    ).toEqual([]);
    const fixtures = fixtureReads();
    expect(
      fixtures.map(entry => `${entry.half}:${entry.reads}`),
      "the scanner reads a claim in each docs/14 positive HX default-gate case body and none in the negative one",
    ).toEqual(fixtures.map(entry => `${entry.half}:${entry.half.startsWith("positive")}`));
    expect(
      fixtures.map(entry => entry.half),
      "docs/14 holds both halves",
    ).toEqual(expect.arrayContaining(["positive", "negative"]));
  });

  it("the live-set anchors: docs/14's read-forms table binds every LIVE SET and ROUTE form, vitest's own test API binds the registration partition, every form reads as its surface requires, and the intact route is the live files' chain", { timeout: BUDGET_MS }, () => {
    const docs = censusSection(FORMS_HEADING);
    expect(docs.ok, `docs/14 holds one '${FORMS_HEADING}' section under its parent heading, with one table: ${docs.why}`).toBe(true);
    expect(docs.html, "the read-forms section carries no HTML").toBe(false);
    expect(docs.lead, "its lead paragraph, verbatim in rendered text and markdown, is its only other block").toEqual([{ text: FORMS_LEAD, markdown: FORMS_LEAD }]);
    expect(docs.columns, "the read-forms table's columns").toEqual(FORMS_COLUMNS);
    expect(docs.rows, "every LIVE SET form and every ROUTE form with its surface, both ways and in table order").toEqual([
      ...LIVE_FORMS.map(form => `${form.surface} | ${form.id}`),
      ...ROUTE_FORMS.map(form => `route | ${form.id}`),
    ]);
    expect(registrationPartition(), "vitest's runtime test API: its case flags, its case methods and the members that register no case").toEqual({
      flags: CASE_FLAGS,
      methods: CASE_METHODS,
      other: NON_CASE_MEMBERS,
    });
    expect([...CASE_FLAGS, ...CASE_METHODS, ...NON_CASE_MEMBERS].sort(), "the three lists are the shared helper's REGISTRATION_MEMBERS.test").toEqual(REGISTRATION_MEMBERS.test);
    const reading = (form: LiveForm): LiveReading => liveReading(parse(`${form.id}.ts`, form.source));
    const placed = (form: LiveForm): boolean => {
      const read = reading(form);
      return read.live && read.cases.length === (form.cases ?? 1) && read.unresolved.length === 0 && read.outside.length === 0;
    };
    expect(
      LIVE_FORMS.filter(form => (form.surface === "membership" || form.surface === "registration") && !placed(form)).map(form => form.id),
      "every membership and registration form reads live with the HX cases it registers and nothing unresolved or outside",
    ).toEqual([]);
    expect(
      LIVE_FORMS.filter(form => form.surface === "fail-closed" && reading(form).unresolved.length + reading(form).outside.length === 0).map(form => form.id),
      "every fail-closed form reads something unresolved or outside",
    ).toEqual([]);
    expect(
      LIVE_FORMS.filter(form => form.surface === "control" && !isDeepStrictEqual(liveSummary(form.source), QUIET_LIVE)).map(form => form.id),
      "every control reads quiet",
    ).toEqual([]);
    const chainOfForm = (id: string): string => reading(LIVE_FORMS.find(form => form.id === id) ?? { id, surface: "registration", source: "" }).cases[0]?.registration ?? "";
    expect(
      [...CASE_FLAGS.map(flag => ["flag", flag]), ...CASE_METHODS.map(method => ["method", method])].filter(([kind, member]) => !chainOfForm(`${kind}-${member}`).startsWith(`it.${member}`)).map(([kind, member]) => `${kind}-${member}`),
      "every case flag and case method has its registration form, read through that member",
    ).toEqual([]);
    const intact = routeReading(ROUTE_FORMS[0]?.source ?? "");
    const [chain] = routesOf(parse("intact.ts", ROUTE_FORMS[0]?.source ?? "")).map(route => route.chain);
    expect(intact, "the intact ROUTE form reads one route, in its HX case").toEqual([{ case: "HX probe", chain }]);
    expect(
      liveFiles().map(file => routesOf(parseRepo(file)).map(route => route.chain)),
      "each live file holds exactly the intact form's chain, once",
    ).toEqual(liveFiles().map(() => [chain]));
    expect(
      ROUTE_FORMS.slice(1)
        .filter(form => isDeepStrictEqual(routeReading(form.source), intact))
        .map(form => form.id),
      "every other ROUTE form reads a route list other than the intact one's",
    ).toEqual([]);
  });

  it("roster: the judged rows, the quotes, the readings, the residual members and the registered tests equal test/fixtures/hx-licensed-complete-roster.json, in order and both ways; every pin reached its witness compare", ({ task }) => {
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
    expect(READING, "the pin readings equal the roster's").toEqual(ROSTER.readings);
    expect(RESIDUALS, "the residual members equal the roster's").toEqual(ROSTER.residuals);
    expect(Object.keys(ROSTER.witnesses), "one roster witness per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(
      REACHED.map(entry => entry.pin),
      "every pin reached its witness compare, in row order",
    ).toEqual(ROWS.flatMap(row => row.pins));
    expect(
      REACHED.filter(entry => !entry.same).map(entry => entry.pin),
      "and each compare held",
    ).toEqual([]);
  });
});
