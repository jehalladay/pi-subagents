/**
 * wb-5ltg.3 (RC-NATIVE-INTERFACE-COMPONENT-CONTRACT-R3, program-triage-2026-10-22): the absent-today leg, with the adoption
 * contract armed. Statement (bead notes, full form): "If Pi ever consumes a remote component stream (gated RC-IF-04
 * installed-host condition + RC-IF-01 crosswalk; unshipped at 640a3b579a95), Pi resolves component identities and actions only
 * against its own registry (unknown IDs refused), refuses any executable callback in the stream (never deserialized, executed or
 * rendered), and applies strict schema-version checks preserving `null` semantics and key ordering, surfacing error cases as
 * typed refusals" (ReactiveComponentsSDK docs/programs/native-interface-component-contract-2026-10-21/README.md:15@640a3b579a95).
 * Acceptance (owner filing, verbatim; the labels of rows B, C, D and A): "(a) adoption fixture: an unknown component or action id
 * is refused, never rendered or executed; resolution reads only Pi's registry, never a stream-supplied resolver; (b) an
 * executable/callback field is refused typed, nothing evaluated, forwarded or rendered; (c) unknown/mismatched schema version
 * refused typed, null kept as null, key order kept on round-trip; mutants accepting an unknown schema version, coercing null, or
 * deserializing a callback fail; (d) today: zero remote-stream consumer sites in Pi."
 *
 * Pi consumes no remote component output today, and nothing could reach it: the producer mode (RC-IF-04, README.md:24) waits for
 * installed Web/TUI hosts, none exists, and the Element/RftsxElement crosswalk (RC-IF-01, README.md:21) is not shipped. The only
 * ReactiveComponents material Pi reads arrives inside an rf context.render envelope (the reactivefiber provider), as context, not
 * as components. So the trigger has not fired and (d) holds by absence; (a) to (c) cannot be proved on a consumer that does not
 * exist, so they are ARMED: a test-side reference adoption, built only from Pi's own seams (two CapabilityRegistry instances, one
 * for component identities and one for action ids, resolved separately as README.md:15 says; validatedCapabilityJson, the JSON
 * boundary every registered capability output crosses), runs a constructed stream over a judge, and the judge refuses each named
 * mutant of it. A future consumer is the thing that must pass the same judge; this file pins the judge, not a consumer.
 *  A, the trigger and acceptance (d). A1 no judged module (identifiers and regular expressions always; string and template
 *    literals cooked by the compiler, constant-folded literals and JSX text when NAME-LIKE, no white space once trimmed;
 *    comments never), no judged JSON file (keys always, name-like string values; a file that does not parse is read token by
 *    token) and no carrier (CARRIERS, read token by token) names REMOTE_FAMILY - a remote component, element, producer or
 *    stream, a component stream, an RftsxElement, a crosswalk or a callback serialization - and the walk reaches its floors (the
 *    whole tree, the modules of src, test, qa and examples, the carriers, and every root entry of ROOT_FLOORS) and anchors,
 *    equals an independent listing of the same tree, skips only root entries anchored outside this file (SKIP ANCHOR), meets no
 *    symlink (refused, never followed) and no unreadable directory or file (a file gone between the listing and the read holds
 *    nothing); every site found is printed with its file and line. A2 no judged module loads or runs the ReactiveComponents
 *    distribution (RC_FAMILY: vibranium-reactive-components under every spelling pip installs it by (PEP 503) or its
 *    reactive_components module, through an import or export declaration, an import-equals require, an import type, the first
 *    argument of any call or new expression, or the module after a `-m` in an array literal, each position read through BOUND
 *    VALUES), the loader calls whose specifier is not complete are exactly COMPUTED_LOADS, and no manifest (MANIFEST), no carrier
 *    line and no JSON command line outside the instruments (a string value with white space inside; a JSON file that does not
 *    parse is read line by line) names it. A3 the nearest readers Pi has (its own registry, the rf preview carrier and observer,
 *    its own TUI card) are reached and quiet, and the instrument rule is
 *    load-bearing: this file and its roster are census instruments (CENSUS_INSTRUMENT), they spell the family, and every name
 *    found inside an instrument sits in an instrument, as does every JSON command line, and the roster spells command lines too,
 *    so the command routing is load-bearing as well. A4 the gating artifact is measured unshipped: the roster's producer facts
 *    (two shas of the local ReactiveComponentsSDK checkout) agree with the bead row's Gating and Shipped sentences.
 *  B, acceptance (a). B1 the reference adoption over Pi's registries: known frames are admitted and rendered once; an unknown
 *    component id, an unknown action id, an action id in the component slot, a component id in the action slot and a frame
 *    carrying its own resolver are each refused typed, nothing rendered or executed; the adoption's unknown-id refusal is the
 *    registry's own (CapabilityRegistry.invoke refuses the same id with the same category and message before any provider runs).
 *    B2 the judge passes the reference and fails M-RENDER-UNKNOWN, M-STREAM-RESOLVER, M-EXECUTE-ACTION, M-UNTYPED,
 *    M-BIND-UNKNOWN-ACTION, M-BARE-REFUSAL, M-RENDER-FIRST and M-MISCATEGORIZE, and every branch of the judge is live (JUDGE
 *    LIVENESS).
 *  C, acceptance (b). C1 an in-process function (refused typed by validatedCapabilityJson), an undeclared field and an undeclared
 *    prop carrying callback source text, and a callback-tagged object in a typed prop are each refused typed: no callback runs,
 *    nothing is rendered and no refused frame is forwarded. C2 the judge fails M-FORWARD-UNDECLARED, M-FUNCTION-PASS,
 *    M-CALLBACK-REVIVE and M-EVALUATE-CALLBACK.
 *  D, acceptance (c). D1 a schema version that is unknown, a string, missing or null is refused typed; a null in a nullable prop
 *    is kept as null and a null in a non-nullable prop is refused, never coerced; every admitted frame re-encodes to its input
 *    bytes; an integer-like key is refused typed, because a JS object cannot keep its order (measured: validatedCapabilityJson and
 *    JSON.parse both move it first); a frame that is not JSON is refused typed. D2 the judge fails the three mutants the filing
 *    names (BEAD_MUTANTS, read from clause (c)) and M-SORTED-KEYS.
 * THE WALK: every regular file below the repository root, at any depth, in name order; the root entries SKIPPED_ROOTS (git's data,
 * the tracker export - bead rows quote the statement -, installed dependencies, build, coverage and Forge outputs) are skipped at
 * the root only. Modules (MODULE_EXTENSIONS), JSON files (JSON_EXTENSIONS) and carriers are judged; prose (PROSE_EXTENSIONS) and
 * binaries (BINARY_EXTENSIONS) are walked and never judged. It reads the working tree, so an untracked plant is read. The listing
 * the walk must equal is fs.readdirSync's own recursive mode over each root entry, a second traversal, so a walk that skips a
 * root, a directory or a file is a red, not a lower count above a floor. The walk's two reads (a directory's entries, a file's
 * bytes) go through one Io, so a control makes each fail (wb-yfzf F4: more than one failure each): a directory whose entries
 * cannot be read is recorded whatever the failure (EACCES, EIO); a file whose bytes cannot be read is recorded unless the
 * failure is an fs Error with code ENOENT, a file gone between the listing and the read, which holds nothing - another code
 * (EACCES, EIO), an Error without a code and a thrown value that is no Error (even one carrying an ENOENT code) are each
 * recorded.
 * SKIP ANCHOR (wb-yfzf F3): the listing shares SKIPPED_ROOTS with the walk, so each skipped entry is anchored outside this
 * file and its roster: git's own data (GIT_DATA), the tracker export's root entry (BEAD_EXPORT's first segment), or a root
 * entry the repository's IGNORE_FILE ignores by name (a pattern with no glob, negation or inner "/"; a leading or trailing "/"
 * allowed). A skip added to the census and the roster together is a red, not a lower count above a floor. Every root entry
 * the walk reached at base carries a floor in ROOT_FLOORS.
 * CARRIERS (wb-wxhu F2): every file that is no module, no JSON file, no prose and no binary - a shell or Python script, a TOML,
 * YAML or HTML file, an extensionless file, any type the walk has not met before - is a carrier: judged by default, never skipped
 * by default. A1 reads its tokens; A2 reads its lines, and a line naming RC_FAMILY anywhere (a `python3 -m`, a `pip install`, an
 * import, a comment) is a hit.
 * PEP 503 (wb-yfzf F1): pip compares distribution names with letters in any case and every run of "-", "_" and "." read as one
 * "-", so RC_FAMILY reads the distribution in any case with its three words joined by any such run
 * (vibranium_reactive_components, vibranium.reactive.components, Vibranium__Reactive-.Components), also when a "-" and its
 * version follow it (an artifact name: a wheel or an sdist). The module stays reactive_components (or reactive-components).
 * The reading is the landed one widened, never narrowed: every text the landed RC_FAMILY matched, it matches. The words run
 * together with no separator, or the name continued by another word (vibranium-reactive-components-extra), are another
 * distribution and are not read.
 * BOUND VALUES (wb-wxhu F1): a load position reads every value its expression can take - a literal or a folded one; a name,
 * through every binding of that name in the module (a const, let or var initializer, a parameter's or a destructured name's
 * default, an assignment, the right side of a compound assignment, the elements of a for-of over an array literal), followed
 * through the names those bind in turn; a parenthesized expression and an `as`, `satisfies`, non-null or angle-bracket
 * assertion; both branches of a conditional and both sides of `??` and `||`; a `+` concatenation or a template, over every
 * combination of its parts' values, an unknown part read as empty so the known text around it is still judged. A value is
 * complete when nothing in it is unknown: a name bound any other way (a parameter, an import, a destructured or caught name, a
 * compound or destructuring assignment, a for-of or for-in over anything else) or not bound at all, a call's result, a member
 * read, a cycle. A loader call (import(), require(), require.resolve(), import.meta.resolve(), createRequire()() and
 * createRequire().resolve() called in place, module.require()) whose specifier is not complete is a computed load, printed
 * `<file>: <loader> <specifier text>`. Bindings are read by name, not by scope (an over-read, A2 boundElsewhere).
 * JUDGE LIVENESS (wb-wxhu F3): each branch of the judge emits its own kind of finding (FINDING_KINDS), every kind is produced by
 * at least one named mutant, and no other kind is ever emitted, so a judge branch no mutant reaches is a red.
 * MEASURED PRODUCER FACTS (roster `producer`; read-only git show, ls-tree and grep -l -i -E over src/ at two shas of the local
 * ReactiveComponentsSDK checkout, no fetch, 2026-10-23): the program pin 640a3b579a95 (56 src files) and origin/master 01187eb645a5
 * (65, 21 commits later) carry the same README blob ea960adb38e0 and the same distribution name; at both, src/ spells no remote
 * stream, no remote component, no RftsxElement and no callback serialization. Other senses, recorded: `callback` is the host's
 * in-process declassifier (data_output.py) and a comment (render_context.py), `resolver` a lazy-value or transaction resolver
 * (fakes.py, renderer_conformance.py, snapshot_identity.py), schema_version the shipped ContextDocument's literal (assembly.py:273,
 * :281 at master). DRIFT, recorded: at master `crosswalk` is spelled by 3 files, the RC-UI-01-a portable-block crosswalk
 * (schema reactive-components/portable-block/v1: the ContextBlock JSON versus fiber-native codec table), not RC-IF-01's Element
 * versus RftsxElement crosswalk. Neither ReactiveWebInterfaceSDK nor ReactiveTUIInterfaceSDK has a checkout. The roster reader
 * refuses a producer object whose keys differ from the measured set, so a re-measure under a misspelled key never reads as 0.
 * OVER-READ (disclosed): an identifier or a name-like literal using a family word in another sense - an rf TSX error code such
 * as RFTSX_ELEMENT_INVALID_KEY (a queued sibling census's roster quotes these), or a crosswalk table of some other pair - is
 * read as a finding; none exists outside the instruments today, and such a finding is re-judged, never silenced. So is a carrier
 * or JSON command line naming the distribution in a comment or a note, a load through a name bound elsewhere (BOUND VALUES),
 * and a name followed by "-" and a digit, read as an artifact name (a distribution literally named
 * vibranium-reactive-components-2 would be read as this one).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness, the scan constants, the residual families, the mutant assignment and the registered test titles are held to the
 * out-of-file roster (test/fixtures/rc-remote-component-stream-roster.json). OUTSIDE ANCHOR: the owner filing's row in the
 * tracked bead export (.beads/issues.jsonl, row wb-5ltg.3): every acceptance clause sits verbatim in exactly one row label and the
 * trigger in row A's, every row carries one, the quote and citation equal the roster's, A4 reads its Gating, Shipped and
 * Authority sentences, and D2 reads its mutant list from clause (c), so a row or a named mutant removed from every literal of this
 * file and the roster still reds. Not claimed: a pin removed from ROWS, the literal, IMPL and the roster together (the bead row
 * anchors rows, clauses and the named mutants, not pins); a ROOT_FLOORS floor removed together with its roster copy (no outside
 * source lists the root entries without running git; the removal drops no read by itself: the walk still equals the listing
 * and every skip stays anchored); a skipped root entry the ignore file ignores that still holds files (added past the ignore
 * file) - the SKIP ANCHOR trusts the ignore file, which no read here can check without running git; and the armed rows prove
 * the judge, not a Pi consumer (none exists).
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode,
 * not inverted, ran; every pin's case reached its end (REACHED); no registered test or suite title spells the family (describe
 * titles mask it).
 * RESIDUALS (named families, each with pinned quiet rows in the controls): R-COMPOSED a name or a specifier assembled at runtime
 * (A1 composed; A2 composedSpecifier, composedAppend and composedCommand, while a loader call records it as computed instead,
 * composedComputed and computedAppend), and its carrier members (wb-yfzf F2): a distribution or module name the shell
 * assembles in a carrier - from a parameter, from adjacent quoted parts or across a backslash line continuation - since a
 * carrier is read line by line as written (A2 composedCarrier, composedQuotedCarrier, composedContinuedCarrier); R-RENAMED a
 * consumer bound under names outside the family (A1 renamed); R-PROSE prose
 * files (PROSE_EXTENSIONS), comments and literals or JSON values with white space inside (A1 comment, proseLiteral, jsonProse, the
 * planted docs/notes.md; A2 the planted docs/rc.md); R-INSTRUMENT census instruments, walked and load-judged but never
 * name-judged, their JSON never judged for command lines (A1 the planted test/x-census.test.ts and test/fixtures/x-roster.json; A2
 * the planted test/fixtures/x-roster.json); R-OUTSIDE a file below a skipped root entry (A1 planted node_modules/, dist/, .beads/,
 * .forge/, build/ and coverage/); R-LOOKALIKE a non-ASCII look-alike letter (A1 lookalike); R-COMMAND-STRING a distribution run
 * carried inside a shell command string that is not a call's first argument (A2 shellArgument); R-BINARY a binary file
 * (BINARY_EXTENSIONS), walked and never judged (A1 the planted media/x.png; A2 the planted media/rc.png); R-JSON-NAME a JSON key
 * or name-like JSON value naming the distribution outside a manifest (an sdk_versions echo), read for names only (A2 the planted
 * test/fixtures/sdk.json); R-UNRESOLVED a command outside a loader call that reaches its call through a member read, a call's
 * result or an import, which reads no value (A2 memberCommand, callCommand, importedCommand); R-ALIASED-LOADER a computed
 * specifier handed to a loader under another name (a require bound to a name other than require, a Worker entry point), which
 * is not recorded as computed (A2 aliasedLoader, workerLoader).
 * HARDENING (wb-wxhu, the R694 follow-up of landing 323, gate cmd_43323dc31e7f): F1 BOUND VALUES and COMPUTED_LOADS; F2 CARRIERS
 * and JSON command lines; F3 JUDGE LIVENESS, four new B2 mutants and one new C2 mutant; F4 the independent listing, ROOT_FLOORS
 * and the examples module floor; F5 the Io failure controls.
 * HARDENING (wb-yfzf, the R694 follow-up of landing 413, gate cmd_445161abda19): F1 PEP 503 - RC_FAMILY reads every spelling pip
 * installs the distribution by, pinned in a carrier, a manifest, a JSON command line and a command string; F2 R-COMPOSED's three
 * carrier members, named with quiet rows; F3 SKIP ANCHOR and a floor for each of the four root entries that had none; F4 a second
 * failure for each Io control (EIO for a directory; EIO, an Error without a code and a value that is no Error for a file).
 * Display paths added: none. Test-only: it spawns nothing; the controls plant files in makeScratch scratch only.
 */
import { type Dirent, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { CapabilityError, type CapabilityErrorCategory, CapabilityRegistry, validatedCapabilityJson } from "../src/workbench/capability-registry.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-rc-remote-component-stream-census.test.ts";
const ROSTER_FILE = "test/fixtures/rc-remote-component-stream-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-5ltg.3";
/** A1: what a remote-output consumer names (README.md:15, :21, :24), read over a token's words (wordsOf). */
const REMOTE_FAMILY = /\b(?:remote (?:components?|elements?|producers?|streams?)|components? streams?|rftsx elements?|crosswalks?|callback seriali[sz]ations?)\b/;
/** A2: the ReactiveComponents distribution and its Python module, in any load or `-m` position; the distribution under every
 * spelling pip installs it by (PEP 503: any case, the words joined by any run of "-", "_" or "."), also as an artifact name
 * followed by "-" and its version. */
const RC_DISTRIBUTION = "vibranium-reactive-components";
const RC_MODULE = "reactive_components";
const RC_FAMILY = /(?<![\w-])(?:vibranium[-_.]+reactive[-_.]+components|reactive[_-]components)(?!\w|-(?!\d))/i;
/** Census instruments: walked and judged for module loads (A2), never for names (A1) or JSON command lines - a census's needles
 * are not consumption. */
const CENSUS_INSTRUMENT = /^test\/(?:[^/]+-census\.test\.ts|fixtures\/[^/]+-roster\.json)$/;
/** A mask for describe titles, so a report holding this file's titles stays quiet. */
const REMOTE_TEXT = /remote[\s_.-]*(?:components?|elements?|producers?|streams?)|components?[\s_.-]*streams?|rftsx[\s_.-]*elements?|crosswalks?|callback[\s_.-]*seriali[sz]ations?/gi;
const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
const JSON_EXTENSIONS = [".json"];
const MANIFEST =
  /(?:^|\/)(?:package(?:-lock)?\.json|npm-shrinkwrap\.json|deno\.jsonc?|import[-_]map\.json|[tj]sconfig[^/]*\.json|pyproject\.toml|requirements[^/]*\.txt)$/i;
const SKIPPED_ROOTS = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge"];
/** SKIP ANCHOR (wb-yfzf F3): what anchors a skipped root entry outside this file - git's own data, the tracker export's root
 * entry, or a root entry the repository's ignore file ignores by name. */
const GIT_DATA = ".git";
const IGNORE_FILE = ".gitignore";
/** Walked, never judged (THE WALK): prose (R-PROSE) and binaries (R-BINARY). Every other file is a module, a JSON file or a carrier. */
const PROSE_EXTENSIONS = [".md"];
const BINARY_EXTENSIONS = [".png", ".mp4", ".tgz"];
/** Each floor sits below the count measured at base f8afbef (967 files; src 115, test 510, qa 62, examples 6 modules; 121 JSON;
 * 12 carriers; 4 manifests; root entries . 27, .github 2, docs 73, examples 7, media 2, qa 67, src 115, test 649, vendor 5 files). */
const FLOORS = { files: 860, modules: { src: 100, test: 450, qa: 55, examples: 5 }, json: 100, carriers: 10, manifests: 4 };
/** The root entries every walk reaches, each with a floor of files below it (a file at the root counts under "."). wb-yfzf F3: at
 * base fced7bf the walk reached 13 root entries (. 27, .agents 2, .codex 2, .github 2, .pi 1, docs 74, examples 7, media 2,
 * new-feedback 18, qa 67, src 116, test 664, vendor 5 files); the four that had no floor (.agents, .codex, .pi, new-feedback)
 * floor at 1, each floor at or below its count. */
const ROOT_FLOORS: Readonly<Record<string, number>> = {
  ".": 20,
  ".agents": 1,
  ".codex": 1,
  ".github": 1,
  ".pi": 1,
  docs: 60,
  examples: 6,
  media: 2,
  "new-feedback": 1,
  qa: 60,
  src: 100,
  test: 560,
  vendor: 3,
};
/** Every computed load at base f8afbef (BOUND VALUES), each judged by hand: Pi's own dist modules (the headless census child, the
 * live operator receipt); the detached host's trusted local provider (a digest-pinned module path from the reviewed launch
 * manifest) and its dependency pinner (each relative source literal of that provider, checked just before it is resolved); a
 * module beside an installed package (the isolated-provider e2e); a scratch module the git-stamp test writes. None is the
 * distribution. A new one is a red until it is judged and added here and to the roster. */
const COMPUTED_LOADS = [
  "qa/workbench/headless-census-child.mjs: import() entryUrl",
  'qa/workbench/headless-census-child.mjs: import() distUrl("workflow/runtime.js")',
  'qa/workbench/headless-census-child.mjs: import() distUrl("workbench/capability-registry.js")',
  'qa/workbench/live-operator-receipt.mjs: import() join(repoRoot, "dist", "workbench", "claude-host.js")',
  'qa/workbench/live-operator-receipt.mjs: import() join(repoRoot, "dist", "workflow", "runtime.js")',
  "src/workbench/hosts/local-detached.ts: createRequire().resolve() specifier.text",
  "src/workbench/hosts/local-detached.ts: createRequire()() request.localProvider.modulePath",
  "test/e2e/isolated-provider.e2e.test.ts: import() mrUrl",
  "test/workbench-git-stamp.test.ts: import() pathToFileURL(file).href",
  "test/workbench-git-stamp.test.ts: import() pathToFileURL(file).href",
];
/** Files the walk must reach, each with a token its bytes carry: a root page, Pi's registry, a qa script, the manifest, a binary. */
const WALK_ANCHORS: readonly (readonly [string, string])[] = [
  ["README.md", "pi-subagents"],
  ["src/workbench/capability-registry.ts", "CapabilityRegistry"],
  ["qa/workbench/receipts-index.mjs", "marked"],
  ["package.json", "@tintinweb/pi-subagents"],
  ["media/screenshot.png", "PNG"],
];
/** The nearest readers Pi has, each with the identifier the reader must find in it. */
const NEAREST_READERS: readonly (readonly [string, string])[] = [
  ["src/workbench/capability-registry.ts", "CapabilityRegistry"],
  ["src/workbench/providers/reactivefiber.ts", "REACTIVE_FIBER_CONTRACT_SOURCE"],
  ["src/workbench/reactivefiber-observer.ts", "reactivefiberTopology"],
  ["src/ui/workflow-card.ts", "UNICODE_GLYPHS"],
];
const RESIDUAL_FAMILIES = [
  "R-COMPOSED",
  "R-RENAMED",
  "R-PROSE",
  "R-INSTRUMENT",
  "R-OUTSIDE",
  "R-LOOKALIKE",
  "R-COMMAND-STRING",
  "R-BINARY",
  "R-JSON-NAME",
  "R-UNRESOLVED",
  "R-ALIASED-LOADER",
];
const CYRILLIC_O = String.fromCodePoint(0x043e);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);

/** The adoption fixture: Pi-owned component and action registries, the frame fields README.md:18 lists, one accepted version. */
const ACCEPTED_SCHEMA_VERSION = 1;
const FRAME_FIELDS = ["schema_version", "component", "key", "props", "actions", "bindings"];
type PropType = "string" | "number" | "boolean" | "string?";
const KNOWN_COMPONENTS: Readonly<Record<string, Readonly<Record<string, PropType>>>> = {
  "fixture.card": { title: "string", count: "number", note: "string?" },
  "fixture.list": { label: "string", open: "boolean" },
};
const KNOWN_ACTIONS = ["fixture.select", "fixture.open"];
const CATEGORIES: readonly CapabilityErrorCategory[] = ["validation", "authorization", "unavailable", "transport", "uncertain-effect"];
const MUTANTS = [
  "M-RENDER-UNKNOWN",
  "M-STREAM-RESOLVER",
  "M-EXECUTE-ACTION",
  "M-UNTYPED",
  "M-BIND-UNKNOWN-ACTION",
  "M-BARE-REFUSAL",
  "M-RENDER-FIRST",
  "M-MISCATEGORIZE",
  "M-FORWARD-UNDECLARED",
  "M-FUNCTION-PASS",
  "M-CALLBACK-REVIVE",
  "M-EVALUATE-CALLBACK",
  "M-ANY-VERSION",
  "M-NULL-COERCE",
  "M-SORTED-KEYS",
] as const;
type Mutant = (typeof MUTANTS)[number];
/** Which pin fails which mutants; every mutant is failed by at least one pin. */
const MUTANTS_BY_PIN: Readonly<Record<string, readonly Mutant[]>> = {
  B2: ["M-RENDER-UNKNOWN", "M-STREAM-RESOLVER", "M-EXECUTE-ACTION", "M-UNTYPED", "M-BIND-UNKNOWN-ACTION", "M-BARE-REFUSAL", "M-RENDER-FIRST", "M-MISCATEGORIZE"],
  C2: ["M-FORWARD-UNDECLARED", "M-FUNCTION-PASS", "M-CALLBACK-REVIVE", "M-EVALUATE-CALLBACK"],
  D2: ["M-ANY-VERSION", "M-NULL-COERCE", "M-CALLBACK-REVIVE", "M-SORTED-KEYS"],
};
/** Every kind of finding the judge emits, one per branch (JUDGE LIVENESS); each is produced by a named mutant. */
const FINDING_KINDS = [
  "executed-action",
  "evaluated-callback",
  "untyped-refusal",
  "bare-refusal",
  "wrong-refusal",
  "rendered-before-refusal",
  "admitted",
  "rendered-refused",
  "deserialized-callback",
  "forwarded-undeclared",
  "resolved-unknown-component",
  "resolved-through-stream",
  "accepted-unknown-schema-version",
  "bound-unknown-action",
  "coerced-null",
  "round-trip-changed",
  "rendered-mismatch",
];
/** The mutants clause (c) names, by its own phrases. */
const BEAD_MUTANTS: Readonly<Record<string, Mutant>> = {
  "accepting an unknown schema version": "M-ANY-VERSION",
  "coercing null": "M-NULL-COERCE",
  "deserializing a callback": "M-CALLBACK-REVIVE",
};

/** Every scan constant, as the roster holds it. */
const SCAN = {
  remoteFamily: `${REMOTE_FAMILY.source}/${REMOTE_FAMILY.flags}`,
  rcFamily: `${RC_FAMILY.source}/${RC_FAMILY.flags}`,
  rcDistribution: RC_DISTRIBUTION,
  rcModule: RC_MODULE,
  censusInstrument: `${CENSUS_INSTRUMENT.source}/${CENSUS_INSTRUMENT.flags}`,
  manifest: `${MANIFEST.source}/${MANIFEST.flags}`,
  moduleExtensions: MODULE_EXTENSIONS,
  jsonExtensions: JSON_EXTENSIONS,
  skippedRoots: SKIPPED_ROOTS,
  gitData: GIT_DATA,
  ignoreFile: IGNORE_FILE,
  proseExtensions: PROSE_EXTENSIONS,
  binaryExtensions: BINARY_EXTENSIONS,
  floors: FLOORS,
  rootFloors: { ...ROOT_FLOORS },
  computedLoads: COMPUTED_LOADS,
  walkAnchors: WALK_ANCHORS.map(([path, token]) => `${path}:${token}`),
  nearestReaders: NEAREST_READERS.map(([path, token]) => `${path}:${token}`),
  acceptedSchemaVersion: ACCEPTED_SCHEMA_VERSION,
  frameFields: FRAME_FIELDS,
  knownComponents: Object.keys(KNOWN_COMPONENTS),
  knownActions: KNOWN_ACTIONS,
  mutants: [...MUTANTS],
  mutantsByPin: Object.fromEntries(Object.entries(MUTANTS_BY_PIN).map(([pin, list]) => [pin, [...list]])),
  beadMutants: { ...BEAD_MUTANTS },
  findingKinds: FINDING_KINDS,
};
const FROZEN_TITLE = "the judged set: the frozen shape, the out-of-file roster and the bead row agree";
const RECORDS_TITLE = "records: every registered test ran once in run mode in roster order, every pin reached its end, and no title spells the judged family";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(trigger, absent today) If Pi ever consumes a remote component stream: no judged module, JSON file or carrier names the remote-output family, nothing loads or runs the ReactiveComponents distribution, the nearest readers are reached and quiet, the instrument rule is load-bearing and the gating artifact is measured unshipped, so (d) today: zero remote-stream consumer sites in Pi",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(a) adoption fixture: an unknown component or action id is refused, never rendered or executed; resolution reads only Pi's registry, never a stream-supplied resolver: armed on a reference adoption over Pi's two registries, whose judge fails each resolution mutant",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(b) an executable/callback field is refused typed, nothing evaluated, forwarded or rendered: armed through Pi's JSON boundary and the strict frame and prop fields, whose judge fails each callback mutant",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label:
      "(c) unknown/mismatched schema version refused typed, null kept as null, key order kept on round-trip; mutants accepting an unknown schema version, coercing null, or deserializing a callback fail: armed on the same judge, integer-like keys refused because a JS object cannot keep their order",
    pins: ["D1", "D2"],
  },
];

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface OtherSense {
  readonly callback: readonly string[];
  readonly resolver: readonly string[];
  readonly schemaVersion: readonly string[];
  readonly crosswalk: readonly string[];
}
interface ProducerPin {
  readonly label: string;
  readonly sha: string;
  readonly distribution: string;
  readonly srcFiles: number;
  readonly absent: { readonly [name: string]: number };
  readonly otherSense: OtherSense;
  readonly crosswalkSchema: string | null;
}
interface Producer {
  readonly repo: string;
  readonly measuredUtc: string;
  readonly measure: string;
  readonly readme: { readonly path: string; readonly blob: string; readonly lines: { readonly [line: string]: string } };
  readonly absentPatterns: { readonly [name: string]: string };
  readonly hostCheckouts: { readonly absent: readonly string[]; readonly present: readonly string[] };
  readonly pins: readonly ProducerPin[];
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly scan: JsonObject;
  readonly producer: Producer;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function count(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) throw new Error(`roster ${field} must be a count`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function objectOf(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return value;
}
/** Refuses an object whose keys differ from `keys`, so a re-measure written under a renamed or misspelled key never reads as 0. */
function exactKeys(value: { [key: string]: unknown }, keys: readonly string[], field: string): void {
  const found = Object.keys(value).sort();
  if (JSON.stringify(found) !== JSON.stringify([...keys].sort())) throw new Error(`roster ${field} keys must be exactly ${keys.join(", ")}; found ${found.join(", ")}`);
}
function stringMap(value: unknown, field: string): { [key: string]: string } {
  const map = objectOf(value, field);
  if (!Object.values(map).every(item => typeof item === "string")) throw new Error(`roster ${field} must map strings to strings`);
  return Object.fromEntries(Object.entries(map).map(([key, item]) => [key, String(item)]));
}
function producerPinOf(value: unknown, absentNames: readonly string[], field: string): ProducerPin {
  const pin = objectOf(value, field);
  exactKeys(pin, ["label", "sha", "distribution", "srcFiles", "absent", "otherSense", "crosswalkSchema"], field);
  const absent = objectOf(pin.absent, `${field}.absent`);
  exactKeys(absent, absentNames, `${field}.absent`);
  const otherSense = objectOf(pin.otherSense, `${field}.otherSense`);
  exactKeys(otherSense, ["callback", "resolver", "schemaVersion", "crosswalk"], `${field}.otherSense`);
  if (pin.crosswalkSchema !== null && typeof pin.crosswalkSchema !== "string") throw new Error(`roster ${field}.crosswalkSchema must be a string or null`);
  return {
    label: text(pin.label, `${field}.label`),
    sha: text(pin.sha, `${field}.sha`),
    distribution: text(pin.distribution, `${field}.distribution`),
    srcFiles: count(pin.srcFiles, `${field}.srcFiles`),
    absent: Object.fromEntries(absentNames.map(name => [name, count(absent[name], `${field}.absent.${name}`)])),
    otherSense: {
      callback: strings(otherSense.callback, `${field}.otherSense.callback`),
      resolver: strings(otherSense.resolver, `${field}.otherSense.resolver`),
      schemaVersion: strings(otherSense.schemaVersion, `${field}.otherSense.schemaVersion`),
      crosswalk: strings(otherSense.crosswalk, `${field}.otherSense.crosswalk`),
    },
    crosswalkSchema: pin.crosswalkSchema,
  };
}

function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.producer) || !isObject(raw.scan)) throw new Error("roster needs rows, producer and scan objects");
  exactKeys(raw, ["bead", "quote", "citation", "scan", "producer", "residuals", "rows", "tests"], "top level");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const producer = raw.producer;
  exactKeys(producer, ["repo", "measuredUtc", "measure", "readme", "absentPatterns", "hostCheckouts", "pins"], "producer");
  const readme = objectOf(producer.readme, "producer.readme");
  exactKeys(readme, ["path", "blob", "lines"], "producer.readme");
  const absentPatterns = stringMap(producer.absentPatterns, "producer.absentPatterns");
  const hostCheckouts = objectOf(producer.hostCheckouts, "producer.hostCheckouts");
  exactKeys(hostCheckouts, ["absent", "present"], "producer.hostCheckouts");
  if (!Array.isArray(producer.pins)) throw new Error("roster producer.pins must be a list");
  const absentNames = Object.keys(absentPatterns);
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    scan: scan as JsonObject,
    producer: {
      repo: text(producer.repo, "producer.repo"),
      measuredUtc: text(producer.measuredUtc, "producer.measuredUtc"),
      measure: text(producer.measure, "producer.measure"),
      readme: { path: text(readme.path, "producer.readme.path"), blob: text(readme.blob, "producer.readme.blob"), lines: stringMap(readme.lines, "producer.readme.lines") },
      absentPatterns,
      hostCheckouts: { absent: strings(hostCheckouts.absent, "producer.hostCheckouts.absent"), present: strings(hostCheckouts.present, "producer.hostCheckouts.present") },
      pins: producer.pins.map((pin: unknown, index: number) => producerPinOf(pin, absentNames, `producer.pins[${index}]`)),
    },
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function producerPin(label: string): ProducerPin {
  const found = ROSTER.producer.pins.find(pin => pin.label === label);
  if (found === undefined) throw new Error(`the roster holds no producer pin ${label}`);
  return found;
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The owner filing's row in the tracked bead export, found by id on a line that parses. */
function readBeadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
}
/** The filing's acceptance clauses: its first "Acceptance: " line, split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  const line = notes.split("\n").find(entry => entry.startsWith("Acceptance: "));
  if (line === undefined) throw new Error(`${BEAD} notes carry no Acceptance line`);
  return line
    .slice("Acceptance: ".length)
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}
/** The filing's quote and citation: the first line that opens with a quoted sentence followed by its pin and a Merged note. */
function quoteOf(notes: string): { quote: string | undefined; citation: string | undefined } {
  const match = /^'(.+)' (\S+)\. Merged: /m.exec(notes);
  return { quote: match?.[1], citation: match?.[2] };
}
interface Gating {
  readonly hostQuote: string;
  readonly hostLine: string;
  readonly sha: string;
  readonly names: string[];
  readonly schemaSite: string;
}
/** The filing's Gating line: RC-IF-04's quoted condition and line, then its "Shipped: no" sentence. */
function gatingOf(notes: string): Gating | undefined {
  const match =
    /^Gating: RC-IF-04 '([^']+)' \(README\.md:(\d+)\) \+ RC-IF-01\. Shipped: no - at ([0-9a-f]+) no (.+) code in src \(only schema_version literal: ([^,]+), the shipped ContextDocument\)\.$/m.exec(
      notes,
    );
  if (match === null) return undefined;
  return { hostQuote: match[1] ?? "", hostLine: match[2] ?? "", sha: match[3] ?? "", names: (match[4] ?? "").split(/, | or /), schemaSite: match[5] ?? "" };
}
/** The filing's Authority line: the quoted RC-IF-01 sentence's head and tail around its ellipsis, and the line it cites. */
function authorityOf(notes: string): { head: string; tail: string; line: string } | undefined {
  const match = /^Authority: '(.+?) \.\.\. (.+?)' \(README\.md:(\d+)\)/m.exec(notes);
  return match === null ? undefined : { head: match[1] ?? "", tail: match[2] ?? "", line: match[3] ?? "" };
}
/** The mutants clause (c) names: the phrases between "mutants " and " fail". */
function namedMutants(clause: string): string[] {
  const match = /mutants (.+) fail$/.exec(clause);
  return match === null ? [] : (match[1] ?? "").split(/, or |, /);
}

const posix = (path: string): string => path.split(sep).join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));
const isJson = (path: string): boolean => JSON_EXTENSIONS.includes(extensionOf(path));
const isProse = (path: string): boolean => PROSE_EXTENSIONS.includes(extensionOf(path));
const isBinary = (path: string): boolean => BINARY_EXTENSIONS.includes(extensionOf(path));
/** CARRIERS: every file that is no module, no JSON file, no prose and no binary. */
const isCarrier = (path: string): boolean => !isModule(path) && !isJson(path) && !isProse(path) && !isBinary(path);

/** A text as lowercase words: camelCase and PascalCase humps split, acronym runs kept, every other character a separator. */
function wordsOf(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}
/** A name-like text: no white space once trimmed. A consumer names a stream or an element this way; prose never is. */
const isNameLike = (value: string): boolean => value.trim().length > 0 && !/\s/.test(value.trim());

interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** The walk's two reads (THE WALK), so a control can make each fail; the census itself always reads the disk. */
interface Io {
  readonly list: (directory: string) => Dirent[];
  readonly read: (path: string) => Buffer;
}
const DISK: Io = { list: directory => readdirSync(directory, { withFileTypes: true }), read: path => readFileSync(path) };
/** Every regular file below `root`, in name order, root-relative with "/" separators; SKIPPED_ROOTS are skipped at the root only. */
function walkTree(root: string, io: Io = DISK): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string, depth: number): void => {
    let entries: Dirent[];
    try {
      entries = io.list(directory);
    } catch {
      unreadable.push(posix(relative(root, directory)));
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      if (depth === 0 && SKIPPED_ROOTS.includes(entry.name)) continue;
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) symlinks.push(posix(relative(root, path)));
      else if (entry.isDirectory()) visit(path, depth + 1);
      else if (entry.isFile()) files.push(posix(relative(root, path)));
    }
  };
  visit(root, 0);
  return { files, symlinks, unreadable };
}
/** The same tree listed a second way (fs.readdirSync's own recursive mode over each root entry, not the walk's recursion), sorted. */
function listingOf(root: string): string[] {
  const listed: string[] = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (SKIPPED_ROOTS.includes(entry.name)) continue;
    if (entry.isFile()) listed.push(entry.name);
    else if (entry.isDirectory())
      for (const inner of readdirSync(join(root, entry.name), { withFileTypes: true, recursive: true }))
        if (inner.isFile()) listed.push(posix(relative(root, join(inner.parentPath, inner.name))));
  }
  return listed.sort();
}
/** A file's root entry: its first path segment, or "." for a file at the root. */
const rootOf = (file: string): string => (file.includes("/") ? file.slice(0, file.indexOf("/")) : ".");
/** SKIP ANCHOR: the names an ignore file ignores at the root - every pattern with no glob, negation, comment or inner "/" (a
 * leading "/" or a trailing "/" allowed). */
function ignoredRootsOf(source: string): string[] {
  return source.split("\n").flatMap(line => {
    const name = /^\/?([^\s/*?[\]!#\\][^\s/*?[\]\\]*)\/?$/.exec(line.trim())?.[1];
    return name === undefined ? [] : [name];
  });
}
/** SKIP ANCHOR: the skipped root entries no outside source anchors - neither git's own data, nor the tracker export's root entry,
 * nor a root entry the ignore file ignores. */
function unanchoredSkips(skipped: readonly string[], ignored: readonly string[]): string[] {
  return skipped.filter(entry => entry !== GIT_DATA && entry !== rootOf(BEAD_EXPORT) && !ignored.includes(entry));
}

function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}
/** A string literal, a parenthesized one, a `+` concatenation of foldable parts or a template whose every span folds. */
function fold(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return fold(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = fold(node.left);
    const right = fold(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let folded = node.head.text;
    for (const span of node.templateSpans) {
      const value = fold(span.expression);
      if (value === undefined) return undefined;
      folded += value + span.literal.text;
    }
    return folded;
  }
  return undefined;
}

/** BOUND VALUES: a binding of a name is the expression it was given, or unknown. */
type Binding = ts.Expression | "unknown";
interface Values {
  readonly values: readonly string[];
  /** Nothing in the expression is unknown, so its values are every value it can take. */
  readonly complete: boolean;
}
const NO_VALUE: Values = { values: [], complete: false };
/** The names an assignment target writes: a name, or every name inside an array or object destructuring pattern. */
function targetsOf(node: ts.Node): ts.Identifier[] {
  if (ts.isIdentifier(node)) return [node];
  if (ts.isParenthesizedExpression(node) || ts.isSpreadElement(node)) return targetsOf(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) return targetsOf(node.left);
  if (ts.isArrayLiteralExpression(node)) return node.elements.flatMap(element => targetsOf(element));
  if (ts.isObjectLiteralExpression(node))
    return node.properties.flatMap(property => {
      if (ts.isShorthandPropertyAssignment(property)) return [property.name];
      if (ts.isPropertyAssignment(property)) return targetsOf(property.initializer);
      if (ts.isSpreadAssignment(property)) return targetsOf(property.expression);
      return [];
    });
  return [];
}
const isAssignmentOperator = (kind: ts.SyntaxKind): boolean => kind >= ts.SyntaxKind.FirstAssignment && kind <= ts.SyntaxKind.LastAssignment;
/** The bindings one node makes, added to a module's bindings by name and not by scope (BOUND VALUES): a const, let or var
 * initializer, a parameter's or a destructured name's default, an assignment, the right side of a compound assignment, the
 * elements of a for-of over an array literal - and "unknown" for every other way a name is bound. */
function bindingsAt(node: ts.Node, bindings: Map<string, Binding[]>): void {
  const bind = (name: ts.Node, value: Binding): void => {
    if (!ts.isIdentifier(name)) return;
    const list = bindings.get(name.text);
    if (list === undefined) bindings.set(name.text, [value]);
    else list.push(value);
  };
  if (ts.isForOfStatement(node) || ts.isForInStatement(node)) {
    const literal = ts.isForOfStatement(node) && ts.isArrayLiteralExpression(node.expression) ? node.expression : undefined;
    const targets = ts.isVariableDeclarationList(node.initializer) ? node.initializer.declarations.map(declaration => declaration.name) : targetsOf(node.initializer);
    for (const target of targets)
      if (literal !== undefined && ts.isVariableDeclarationList(node.initializer)) for (const element of literal.elements) bind(target, element);
      else bind(target, "unknown");
  } else if (ts.isVariableDeclaration(node) && node.initializer !== undefined) {
    bind(node.name, node.initializer);
  } else if (ts.isParameter(node) || ts.isBindingElement(node)) {
    bind(node.name, "unknown");
    if (node.initializer !== undefined) bind(node.name, node.initializer);
  } else if (ts.isImportClause(node) || ts.isImportSpecifier(node) || ts.isNamespaceImport(node) || ts.isImportEqualsDeclaration(node)) {
    if (node.name !== undefined) bind(node.name, "unknown");
  } else if (ts.isCatchClause(node) && node.variableDeclaration !== undefined) {
    bind(node.variableDeclaration.name, "unknown");
  } else if (ts.isBinaryExpression(node) && isAssignmentOperator(node.operatorToken.kind)) {
    if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isIdentifier(node.left)) bind(node.left, node.right);
    else
      for (const target of targetsOf(node.left)) {
        bind(target, "unknown");
        if (node.operatorToken.kind !== ts.SyntaxKind.EqualsToken) bind(target, node.right);
      }
  }
}
/** Every value of the heads followed by every value of `part` (an unknown part also read as empty) and then `tail`. */
function combine(heads: readonly string[], part: Values, tail: string): string[] {
  const parts = part.complete ? part.values : [...part.values, ""];
  return heads.flatMap(head => parts.map(value => head + value + tail));
}
/** A name's values read from no other name (seen empty), kept per module so each name is resolved once. */
const RESOLVED = new WeakMap<ReadonlyMap<string, readonly Binding[]>, Map<string, Values>>();
/** The values a load position's expression can take, and whether that list is complete (BOUND VALUES). */
function valuesOf(node: ts.Node, bindings: ReadonlyMap<string, readonly Binding[]>, seen: ReadonlySet<string> = new Set()): Values {
  const folded = fold(node);
  if (folded !== undefined) return { values: [folded], complete: true };
  const union = (parts: readonly Values[]): Values => ({ values: parts.flatMap(part => part.values), complete: parts.every(part => part.complete) });
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node))
    return valuesOf(node.expression, bindings, seen);
  if (ts.isIdentifier(node)) {
    const bound = bindings.get(node.text);
    if (bound === undefined || seen.has(node.text)) return NO_VALUE;
    const cache = seen.size === 0 ? RESOLVED.get(bindings) : undefined;
    const known = cache?.get(node.text);
    if (known !== undefined) return known;
    const inner = new Set(seen).add(node.text);
    const resolved = union(bound.map(value => (value === "unknown" ? NO_VALUE : valuesOf(value, bindings, inner))));
    if (seen.size === 0) RESOLVED.set(bindings, (cache ?? new Map()).set(node.text, resolved));
    return resolved;
  }
  if (ts.isConditionalExpression(node)) return union([valuesOf(node.whenTrue, bindings, seen), valuesOf(node.whenFalse, bindings, seen)]);
  if (ts.isBinaryExpression(node) && (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken || node.operatorToken.kind === ts.SyntaxKind.BarBarToken))
    return union([valuesOf(node.left, bindings, seen), valuesOf(node.right, bindings, seen)]);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = valuesOf(node.left, bindings, seen);
    const right = valuesOf(node.right, bindings, seen);
    return { values: combine(combine([""], left, ""), right, ""), complete: left.complete && right.complete };
  }
  if (ts.isTemplateExpression(node)) {
    let values = [node.head.text];
    let complete = true;
    for (const span of node.templateSpans) {
      const part = valuesOf(span.expression, bindings, seen);
      values = combine(values, part, span.literal.text);
      complete &&= part.complete;
    }
    return { values, complete };
  }
  return NO_VALUE;
}
/** The loader a call is (import(), require(), require.resolve(), import.meta.resolve(), createRequire()() and
 * createRequire().resolve() called in place, module.require()), or undefined for any other call. */
function loaderOf(call: ts.CallExpression): string | undefined {
  const callee = call.expression;
  if (callee.kind === ts.SyntaxKind.ImportKeyword) return "import()";
  if (ts.isIdentifier(callee) && callee.text === "require") return "require()";
  if (ts.isCallExpression(callee) && ts.isIdentifier(callee.expression) && callee.expression.text === "createRequire") return "createRequire()()";
  if (!ts.isPropertyAccessExpression(callee)) return undefined;
  const target = callee.expression;
  if (callee.name.text === "resolve" && ts.isIdentifier(target) && target.text === "require") return "require.resolve()";
  if (callee.name.text === "resolve" && ts.isMetaProperty(target) && target.keywordToken === ts.SyntaxKind.ImportKeyword) return "import.meta.resolve()";
  if (callee.name.text === "resolve" && ts.isCallExpression(target) && ts.isIdentifier(target.expression) && target.expression.text === "createRequire") return "createRequire().resolve()";
  if (callee.name.text === "require" && ts.isIdentifier(target) && target.text === "module") return "module.require()";
  return undefined;
}

interface ModuleReading {
  readonly names: string[];
  readonly specifiers: string[];
  readonly loads: string[];
  /** Loader calls whose specifier is not complete (BOUND VALUES), each `<file>: <loader> <specifier text>`. */
  readonly computed: string[];
  readonly identifiers: Set<string>;
}
/** One module, parsed under its own script kind: its family names (A1), its load specifiers and `-m` modules read through BOUND
 * VALUES, the distribution loads among them and its computed loads (A2). Comments are never read. */
function readModule(path: string, source: string): ModuleReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  // One walk collects the names, the bindings and the load positions; the positions are read once every binding is known.
  const bindings = new Map<string, Binding[]>();
  const positions: ({ readonly load: ts.Node } | { readonly flag: ts.Node; readonly next: ts.Node } | { readonly loader: string; readonly call: ts.CallExpression })[] = [];
  const names: string[] = [];
  const specifiers: string[] = [];
  const computed: string[] = [];
  const identifiers = new Set<string>();
  const line = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  // An identifier or a regex is always judged, a literal only when it is name-like.
  const judge = (node: ts.Node, kind: string, value: string): void => {
    if (!(kind === "identifier" || kind === "regex" || isNameLike(value))) return;
    if (REMOTE_FAMILY.test(wordsOf(value))) names.push(`${path}:${line(node)} ${kind}: ${value}`);
  };
  const load = (node: ts.Node | undefined): void => {
    if (node !== undefined) positions.push({ load: node });
  };
  const visit = (node: ts.Node): void => {
    bindingsAt(node, bindings);
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      identifiers.add(node.text);
      judge(node, "identifier", node.text);
    } else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      judge(node, "literal", node.text);
    } else if (ts.isJsxText(node)) {
      judge(node, "jsx-text", node.text);
    } else if (ts.isRegularExpressionLiteral(node)) {
      judge(node, "regex", node.text);
    }
    if ((ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) || ts.isTemplateExpression(node)) {
      const folded = fold(node);
      if (folded !== undefined) judge(node, "folded", folded);
    }
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) load(node.moduleSpecifier);
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) load(node.moduleReference.expression);
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) load(node.argument.literal);
    // Any call or new expression's first argument: a dynamic import, require, require.resolve, a command, new URL.
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) load(node.arguments?.[0]);
    // A loader call whose specifier is not complete is a computed load (BOUND VALUES).
    if (ts.isCallExpression(node)) {
      const loader = loaderOf(node);
      if (loader !== undefined) positions.push({ loader, call: node });
    }
    // A module run as `-m <module>` in an argument list.
    if (ts.isArrayLiteralExpression(node))
      for (const [index, element] of node.elements.entries()) {
        const next = node.elements[index + 1];
        if (next !== undefined) positions.push({ flag: element, next });
      }
    ts.forEachChild(node, visit);
  };
  visit(file);
  for (const position of positions) {
    if ("load" in position) specifiers.push(...valuesOf(position.load, bindings).values);
    else if ("flag" in position) {
      if (valuesOf(position.flag, bindings).values.includes("-m")) specifiers.push(...valuesOf(position.next, bindings).values);
    } else {
      const first = position.call.arguments[0];
      if (first === undefined || !valuesOf(first, bindings).complete)
        computed.push(`${path}: ${position.loader} ${first === undefined ? "" : first.getText(file).replace(/\s+/g, " ")}`.trimEnd());
    }
  }
  return { names, specifiers, loads: specifiers.filter(specifier => RC_FAMILY.test(specifier)).map(specifier => `${path}: ${specifier}`), computed, identifiers };
}

/** One JSON file: every key and every name-like string value read as words (A1), and its command lines - string values with white
 * space inside that name the distribution - for A2; a file that does not parse is read token by token and line by line. */
function readJson(path: string, source: string): { names: string[]; commands: string[] } {
  const names: string[] = [];
  const commands: string[] = [];
  const judge = (kind: string, value: string): void => {
    if (REMOTE_FAMILY.test(wordsOf(value))) names.push(kind === "text" ? `${path}: text: ${value}` : `${path}: ${kind}: ${value}`);
  };
  const visit = (value: unknown): void => {
    if (typeof value === "string") {
      if (isNameLike(value)) judge("value", value);
      else if (RC_FAMILY.test(value)) commands.push(`${path}: command: ${value.trim()}`);
    } else if (Array.isArray(value)) for (const item of value) visit(item);
    else if (isObject(value))
      for (const [key, item] of Object.entries(value)) {
        judge("key", key);
        visit(item);
      }
  };
  let value: unknown;
  try {
    value = JSON.parse(source);
  } catch {
    for (const token of source.split(/\s+/)) if (token.length > 0) judge("text", token);
    for (const [index, line] of source.split("\n").entries()) if (RC_FAMILY.test(line)) commands.push(`${path}:${index + 1} ${line.trim()}`);
    return { names, commands };
  }
  visit(value);
  return { names, commands };
}
/** One carrier (CARRIERS): its tokens judged for the family (A1) and its lines for the distribution (A2), each with its line. */
function readCarrier(path: string, source: string): { names: string[]; hits: string[] } {
  const names: string[] = [];
  const hits: string[] = [];
  for (const [index, line] of source.split("\n").entries()) {
    for (const token of line.split(/\s+/)) if (token.length > 0 && REMOTE_FAMILY.test(wordsOf(token))) names.push(`${path}:${index + 1} token: ${token}`);
    if (RC_FAMILY.test(line)) hits.push(`${path}:${index + 1} ${line.trim()}`);
  }
  return { names, hits };
}

interface TreeReading {
  readonly walk: Walk;
  readonly modules: Map<string, ModuleReading>;
  readonly jsonFiles: number;
  readonly carriers: number;
  /** Family names outside the census instruments (A1). */
  readonly names: string[];
  /** Family names inside the census instruments (A3). */
  readonly instrumentNames: string[];
  readonly loads: string[];
  readonly computed: string[];
  readonly carrierHits: string[];
  readonly jsonCommands: string[];
  /** JSON command lines inside the census instruments (A3): needles, never consumption. */
  readonly instrumentCommands: string[];
  readonly manifests: string[];
  readonly manifestHits: string[];
  readonly anchorsWalked: boolean;
}
/** The walk of `root` and every judge over it. */
function readTree(root: string, io: Io = DISK): TreeReading {
  const walk = walkTree(root, io);
  const modules = new Map<string, ModuleReading>();
  let jsonFiles = 0;
  let carriers = 0;
  const names: string[] = [];
  const instrumentNames: string[] = [];
  const loads: string[] = [];
  const computed: string[] = [];
  const carrierHits: string[] = [];
  const jsonCommands: string[] = [];
  const instrumentCommands: string[] = [];
  const manifests: string[] = [];
  const manifestHits: string[] = [];
  const anchors = new Map<string, boolean>();
  for (const file of walk.files) {
    let buffer: Buffer;
    try {
      buffer = io.read(join(root, file));
    } catch (error) {
      // A file gone between the listing and the read holds nothing; any other read failure is a finding.
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) walk.unreadable.push(file);
      continue;
    }
    const utf8 = buffer.toString("utf8");
    const found: string[] = [];
    if (isModule(file)) {
      const reading = readModule(file, utf8);
      modules.set(file, reading);
      found.push(...reading.names);
      loads.push(...reading.loads);
      computed.push(...reading.computed);
    } else if (isJson(file)) {
      jsonFiles += 1;
      const reading = readJson(file, utf8);
      found.push(...reading.names);
      (CENSUS_INSTRUMENT.test(file) ? instrumentCommands : jsonCommands).push(...reading.commands);
    } else if (isCarrier(file)) {
      carriers += 1;
      const reading = readCarrier(file, utf8);
      found.push(...reading.names);
      carrierHits.push(...reading.hits);
    }
    (CENSUS_INSTRUMENT.test(file) ? instrumentNames : names).push(...found);
    if (MANIFEST.test(file)) {
      manifests.push(file);
      if (RC_FAMILY.test(utf8)) manifestHits.push(file);
    }
    const anchor = WALK_ANCHORS.find(([path]) => path === file);
    if (anchor !== undefined) anchors.set(file, buffer.includes(anchor[1]));
  }
  const anchorsWalked = WALK_ANCHORS.every(([path]) => anchors.get(path) === true);
  return { walk, modules, jsonFiles, carriers, names, instrumentNames, loads, computed, carrierHits, jsonCommands, instrumentCommands, manifests, manifestHits, anchorsWalked };
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once. */
function liveTree(): TreeReading {
  live ??= readTree(REPO);
  return live;
}
const modulesBelow = (tree: TreeReading, root: string): number => [...tree.modules.keys()].filter(file => file.startsWith(`${root}/`)).length;
function floorsOf(tree: TreeReading): {
  files: boolean;
  src: boolean;
  test: boolean;
  qa: boolean;
  examples: boolean;
  json: boolean;
  carriers: boolean;
  manifests: boolean;
} {
  return {
    files: tree.walk.files.length >= FLOORS.files,
    src: modulesBelow(tree, "src") >= FLOORS.modules.src,
    test: modulesBelow(tree, "test") >= FLOORS.modules.test,
    qa: modulesBelow(tree, "qa") >= FLOORS.modules.qa,
    examples: modulesBelow(tree, "examples") >= FLOORS.modules.examples,
    json: tree.jsonFiles >= FLOORS.json,
    carriers: tree.carriers >= FLOORS.carriers,
    manifests: tree.manifests.length >= FLOORS.manifests,
  };
}
/** Plants `files` in a fresh scratch root (a null content is a symlink to the root's first file) and reads that tree through `io`. */
function plantedTree(files: Readonly<Record<string, string | null>>, io: Io = DISK): TreeReading {
  const root = makeScratch("rc-remote-component-stream-");
  try {
    for (const [path, content] of Object.entries(files)) {
      const target = join(root, path);
      mkdirSync(dirname(target), { recursive: true });
      if (content === null) symlinkSync(join(root, Object.keys(files)[0] ?? ""), target);
      else writeFileSync(target, content);
    }
    return readTree(root, io);
  } finally {
    removeScratch(root);
  }
}
/** The judges over one snippet read as `path`, or one JSON text. */
const namesIn = (path: string, source: string): boolean => readModule(path, source).names.length > 0;
const loadsIn = (path: string, source: string): boolean => readModule(path, source).loads.length > 0;
/** A2's computed-load reading over one snippet read as `path` (BOUND VALUES). */
const computedIn = (path: string, source: string): boolean => readModule(path, source).computed.length > 0;
const jsonNames = (source: string): boolean => readJson("c.json", source).names.length > 0;
/** A2's judge over one manifest text (the path comes first, so no literal naming the distribution sits in a load position). */
const manifestNames = (path: string, source: string): boolean => MANIFEST.test(path) && RC_FAMILY.test(source);
/** A2's carrier judge over one carrier text read as `path` (CARRIERS). */
const carrierHitsIn = (path: string, source: string): boolean => readCarrier(path, source).hits.length > 0;
/** A2's JSON command-line judge over one JSON text read as `path` (the path comes first, as for manifestNames). */
const jsonCommandsIn = (path: string, source: string): boolean => readJson(path, source).commands.length > 0;

/* ---------------------------------------------------------------------------------------------------------------------------
 * The armed adoption: Pi-owned registries, a reference adoption, its named mutants and the judge.
 * ------------------------------------------------------------------------------------------------------------------------- */

interface Host {
  readonly components: CapabilityRegistry;
  readonly actions: CapabilityRegistry;
  readonly rendered: string[];
  readonly executed: string[];
  readonly render: (component: string, props: Readonly<Record<string, unknown>>) => string;
  readonly execute: (action: string) => void;
}
/** Two of Pi's own registries, one per identity kind, each holding the fixture's known ids; every provider counts any run. */
function makeHost(): Host {
  const components = new CapabilityRegistry();
  const actions = new CapabilityRegistry();
  const rendered: string[] = [];
  const executed: string[] = [];
  const provider = (id: string) => ({
    descriptor: {
      id,
      version: "1.0.0",
      description: `fixture ${id}`,
      inputSchema: { type: "object" },
      effectClass: "read" as const,
      permissions: [`fixture:${id}`],
      supportedModes: ["invoke" as const],
    },
    invoke: async () => {
      executed.push(id);
      return null;
    },
  });
  for (const id of Object.keys(KNOWN_COMPONENTS)) components.register(provider(id));
  for (const id of KNOWN_ACTIONS) actions.register(provider(id));
  return {
    components,
    actions,
    rendered,
    executed,
    render: (component, props) => {
      const shown = `${component}(${Object.entries(props)
        .map(([name, value]) => `${name}=${typeof value === "function" ? "<function>" : JSON.stringify(value)}`)
        .join(",")})`;
      rendered.push(shown);
      return shown;
    },
    execute: action => {
      executed.push(action);
    },
  };
}
const CONTEXT = { grants: [] as string[], signal: new AbortController().signal };

interface Refusal {
  readonly refused: true;
  readonly category: CapabilityErrorCategory;
  readonly field: string;
  readonly reason: string;
}
interface Admission {
  readonly refused: false;
  readonly frame: Readonly<Record<string, unknown>>;
  readonly rendered: string;
  readonly actions: readonly string[];
}
type Outcome = Refusal | Admission;
const refuse = (category: CapabilityErrorCategory, field: string, reason: string): Refusal => ({ refused: true, category, field, reason });
const INTEGER_KEY = /^(?:0|[1-9][0-9]*)$/;
const CALLBACK_SHAPE = /=>|\bfunction\b/;
const isRecord = (value: unknown): value is Record<string, unknown> => isObject(value);
/** The first object key below `value` that is integer-like (JS enumerates such keys first, whatever the input order). */
function integerKeyPath(value: unknown, path: string): string | undefined {
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      const found = integerKeyPath(item, `${path}[${index}]`);
      if (found !== undefined) return found;
    }
  } else if (isRecord(value))
    for (const [key, item] of Object.entries(value)) {
      const here = path === "" ? key : `${path}.${key}`;
      if (INTEGER_KEY.test(key)) return here;
      const found = integerKeyPath(item, here);
      if (found !== undefined) return found;
    }
  return undefined;
}
function sortedKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortedKeys);
  if (isRecord(value))
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map(key => [key, sortedKeys(value[key])]),
    );
  return value;
}
function containsFunction(value: unknown): boolean {
  if (typeof value === "function") return true;
  if (Array.isArray(value)) return value.some(containsFunction);
  if (isRecord(value)) return Object.values(value).some(containsFunction);
  return false;
}
const isCallbackShaped = (value: unknown): boolean => (typeof value === "string" && CALLBACK_SHAPE.test(value)) || (isRecord(value) && Object.hasOwn(value, "$fn"));
/** M-EVALUATE-CALLBACK's step: every function inside an in-process frame is called once. */
function evaluateCallbacks(value: unknown): void {
  if (typeof value === "function") (value as () => unknown)();
  else if (Array.isArray(value)) for (const item of value) evaluateCallbacks(item);
  else if (isRecord(value)) for (const item of Object.values(value)) evaluateCallbacks(item);
}
/** M-BARE-REFUSAL's refusal of an unknown id, untyped three ways: a category outside CATEGORIES (an action id in the component
 * slot), an empty reason (any other unknown component) and an empty field (an unknown action id). */
function bareRefusal(field: string, id: string): Refusal {
  const reason = `Unknown or unavailable capability: ${id}.`;
  if (field === "component" && KNOWN_ACTIONS.includes(id)) return { refused: true, category: "denied" as string as CapabilityErrorCategory, field, reason };
  if (field === "component") return { refused: true, category: "unavailable", field, reason: "" };
  return { refused: true, category: "unavailable", field: "", reason };
}

/**
 * The reference adoption of one stream frame (JSON text, or an in-process value), built from Pi's seams only, and each named
 * mutant of it (one branch changed). Order: the JSON boundary, integer-like keys, the schema version, the frame's fields, the
 * component identity, its declared props, the action ids, the bindings; then the frame is rendered once and its actions bound,
 * never run.
 */
function adopt(input: unknown, host: Host, mutant?: Mutant): Outcome {
  let frame: Record<string, unknown>;
  let parsed: unknown = input;
  if (typeof input === "string") {
    try {
      parsed = JSON.parse(input);
    } catch {
      return refuse("validation", "$", "the frame is not JSON");
    }
  }
  if (mutant === "M-EVALUATE-CALLBACK") evaluateCallbacks(parsed);
  if (mutant === "M-FUNCTION-PASS" && typeof input !== "string" && isRecord(parsed)) frame = { ...parsed };
  else {
    let checked: unknown;
    try {
      checked = validatedCapabilityJson(parsed, "frame");
    } catch (error) {
      if (error instanceof CapabilityError) return refuse(error.category, "frame", error.message);
      throw error;
    }
    if (!isRecord(checked)) return refuse("validation", "$", "the frame is not an object");
    frame = checked;
  }
  const integerKey = integerKeyPath(frame, "");
  if (integerKey !== undefined) return refuse("validation", integerKey, "an integer-like key, whose order a JS object cannot keep");
  if (mutant !== "M-ANY-VERSION" && Object.hasOwn(frame, "schema_version")) {
    const version = frame.schema_version;
    if (typeof version !== "number") return refuse("validation", "schema_version", `the schema version must be the number ${ACCEPTED_SCHEMA_VERSION}`);
    if (version !== ACCEPTED_SCHEMA_VERSION) return refuse("validation", "schema_version", `an unknown schema version ${version}`);
  }
  const allowed = mutant === "M-STREAM-RESOLVER" ? [...FRAME_FIELDS, "resolver"] : FRAME_FIELDS;
  const undeclared = Object.keys(frame).find(key => !allowed.includes(key));
  if (undeclared !== undefined && mutant !== "M-FORWARD-UNDECLARED") return refuse("validation", undeclared, "an undeclared field");
  const missing = FRAME_FIELDS.find(field => !Object.hasOwn(frame, field));
  if (missing !== undefined) return refuse("validation", missing, "a missing field");
  const unavailable = (field: string, id: string): Refusal => {
    if (mutant === "M-UNTYPED") throw new Error(`unknown ${id}`);
    if (mutant === "M-BARE-REFUSAL") return bareRefusal(field, id);
    return refuse(mutant === "M-MISCATEGORIZE" ? "validation" : "unavailable", field, `Unknown or unavailable capability: ${id}.`);
  };
  const component = frame.component;
  if (typeof component !== "string") return refuse("validation", "component", "a component id must be a string");
  let renderAs = component;
  if (host.components.effectClassOf(component) === undefined) {
    const resolver = frame.resolver;
    const mapped = mutant === "M-STREAM-RESOLVER" && isRecord(resolver) ? resolver[component] : undefined;
    if (typeof mapped === "string" && host.components.effectClassOf(mapped) !== undefined) renderAs = mapped;
    else if (mutant !== "M-RENDER-UNKNOWN") return unavailable("component", component);
  }
  const props = frame.props;
  if (!isRecord(props)) return refuse("validation", "props", "props must be an object");
  const declared = KNOWN_COMPONENTS[renderAs];
  if (declared !== undefined) {
    for (const [name, value] of Object.entries(props)) {
      const type = declared[name];
      if (mutant === "M-CALLBACK-REVIVE" && isCallbackShaped(value)) {
        props[name] = () => value;
        continue;
      }
      if (type === undefined) {
        if (mutant === "M-FORWARD-UNDECLARED") continue;
        return refuse("validation", `props.${name}`, "an undeclared prop");
      }
      if (value === null && mutant === "M-NULL-COERCE") {
        props[name] = type === "number" ? 0 : type === "boolean" ? false : "";
        continue;
      }
      if (value === null) {
        if (type === "string?") continue;
        return refuse("validation", `props.${name}`, "null for a non-nullable prop");
      }
      if (typeof value !== (type === "string?" ? "string" : type)) return refuse("validation", `props.${name}`, `a ${type} prop`);
    }
    const absent = Object.keys(declared).find(name => !Object.hasOwn(props, name));
    if (absent !== undefined) return refuse("validation", `props.${absent}`, "a missing prop");
  }
  // M-RENDER-FIRST renders once its props pass, before its action ids resolve (and does not render again).
  const early = mutant === "M-RENDER-FIRST" ? host.render(renderAs, props) : undefined;
  const actions = frame.actions;
  if (!Array.isArray(actions)) return refuse("validation", "actions", "actions must be a list of declared action ids");
  const bound: string[] = [];
  for (const [index, action] of actions.entries()) {
    if (typeof action !== "string") return refuse("validation", `actions[${index}]`, "an action id must be a string");
    if (host.actions.effectClassOf(action) === undefined && mutant !== "M-BIND-UNKNOWN-ACTION") return unavailable(`actions[${index}]`, action);
    bound.push(action);
  }
  const bindings = frame.bindings;
  if (!isRecord(bindings) || !Object.values(bindings).every(value => typeof value === "string")) return refuse("validation", "bindings", "bindings must map names to resource ids");
  if (mutant === "M-EXECUTE-ACTION") for (const action of bound) host.execute(action);
  const admitted = mutant === "M-SORTED-KEYS" ? sortedKeys(frame) : frame;
  return { refused: false, frame: isRecord(admitted) ? admitted : frame, rendered: early ?? host.render(renderAs, props), actions: bound };
}

interface Case {
  readonly id: string;
  /** The frame as the stream carries it, or an in-process frame built around `call` (counts any callback run). */
  readonly input: string | ((call: () => void) => unknown);
  readonly expect: "admit" | { readonly category: CapabilityErrorCategory; readonly field: string };
  /** An admitted frame's one rendering. */
  readonly render?: string;
  /** Declared props the frame carries as null. */
  readonly nulls?: readonly string[];
}
const CARD_HEAD = '{"schema_version":1,"component":"fixture.card","key":"k1"';
const CARD_PROPS = '"props":{"title":"Build","count":2,"note":"ok"}';
const CARD_TAIL = '"actions":["fixture.select","fixture.open"],"bindings":{"source":"res-1"}}';
const card = (props = CARD_PROPS, tail = CARD_TAIL, head = CARD_HEAD): string => `${head},${props},${tail}`;
const refused = (category: CapabilityErrorCategory, field: string) => ({ category, field });
/** The constructed stream: every frame shape the three clauses name, keys deliberately out of sorted order. */
const CASES: readonly Case[] = [
  { id: "K1", input: card(), expect: "admit", render: 'fixture.card(title="Build",count=2,note="ok")' },
  { id: "K2", input: card('"props":{"title":"Build","count":2,"note":null}'), expect: "admit", render: 'fixture.card(title="Build",count=2,note=null)', nulls: ["note"] },
  {
    id: "K3",
    input: '{"schema_version":1,"component":"fixture.list","key":"k3","props":{"label":"Runs","open":true},"actions":[],"bindings":{}}',
    expect: "admit",
    render: 'fixture.list(label="Runs",open=true)',
  },
  { id: "U1", input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":1,"component":"fixture.banner","key":"k1"'), expect: refused("unavailable", "component") },
  { id: "U2", input: card(CARD_PROPS, '"actions":["fixture.select","fixture.share"],"bindings":{"source":"res-1"}}'), expect: refused("unavailable", "actions[1]") },
  {
    id: "U3",
    input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":1,"component":"fixture.banner","resolver":{"fixture.banner":"fixture.card"},"key":"k1"'),
    expect: refused("validation", "resolver"),
  },
  { id: "U4", input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":1,"component":"fixture.select","key":"k1"'), expect: refused("unavailable", "component") },
  { id: "U5", input: card(CARD_PROPS, '"actions":["fixture.card"],"bindings":{"source":"res-1"}}'), expect: refused("unavailable", "actions[0]") },
  {
    id: "F1",
    input: call => ({
      schema_version: 1,
      component: "fixture.card",
      key: "k1",
      props: {
        title: () => {
          call();
          return "Build";
        },
        count: 2,
        note: "ok",
      },
      actions: ["fixture.select"],
      bindings: { source: "res-1" },
    }),
    expect: refused("validation", "frame"),
  },
  { id: "F2", input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":1,"component":"fixture.card","key":"k1","onSelect":"() => 1"'), expect: refused("validation", "onSelect") },
  { id: "F3", input: card('"props":{"title":"Build","count":2,"note":"ok","onSelect":"() => 1"}'), expect: refused("validation", "props.onSelect") },
  { id: "F4", input: card('"props":{"title":{"$fn":"() => 1"},"count":2,"note":"ok"}'), expect: refused("validation", "props.title") },
  { id: "S1", input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":2,"component":"fixture.card","key":"k1"'), expect: refused("validation", "schema_version") },
  { id: "S2", input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":"1","component":"fixture.card","key":"k1"'), expect: refused("validation", "schema_version") },
  { id: "S3", input: card(CARD_PROPS, CARD_TAIL, '{"component":"fixture.card","key":"k1"'), expect: refused("validation", "schema_version") },
  { id: "S4", input: card(CARD_PROPS, CARD_TAIL, '{"schema_version":null,"component":"fixture.card","key":"k1"'), expect: refused("validation", "schema_version") },
  { id: "N1", input: card('"props":{"title":"Build","count":null,"note":"ok"}'), expect: refused("validation", "props.count"), nulls: ["count"] },
  { id: "O1", input: card('"props":{"title":"Build","count":2,"note":"ok","2":"x"}'), expect: refused("validation", "props.2") },
  { id: "E1", input: '{"schema_version":1,"component":', expect: refused("validation", "$") },
];
const caseOf = (id: string): Case => {
  const found = CASES.find(entry => entry.id === id);
  if (found === undefined) throw new Error(`no case ${id}`);
  return found;
};

interface Run {
  readonly outcome: Outcome | "threw";
  readonly rendered: readonly string[];
  readonly executed: readonly string[];
  readonly calls: number;
}
function runCase(entry: Case, mutant?: Mutant): Run {
  const host = makeHost();
  let calls = 0;
  const input =
    typeof entry.input === "string"
      ? entry.input
      : entry.input(() => {
          calls += 1;
        });
  let outcome: Outcome | "threw";
  try {
    outcome = adopt(input, host, mutant);
  } catch {
    outcome = "threw";
  }
  return { outcome, rendered: [...host.rendered], executed: [...host.executed], calls };
}
/** One run, as a witness reads it. */
function shown(run: Run): string {
  if (run.outcome === "threw") return "threw";
  return run.outcome.refused ? `refused ${run.outcome.category} ${run.outcome.field}` : "admitted";
}
/** A typed refusal: a category of CATEGORIES, a field and a reason (each conjunct reached by M-BARE-REFUSAL). */
const isTypedRefusal = (outcome: Refusal): boolean => CATEGORIES.includes(outcome.category) && outcome.field.length > 0 && outcome.reason.length > 0;
/** What the judge finds in one case's run: each finding names the case and the property the run broke. */
function findingsOf(entry: Case, run: Run): string[] {
  const found: string[] = [];
  const add = (kind: string): void => {
    found.push(`${entry.id}:${kind}`);
  };
  if (run.executed.length > 0) add("executed-action");
  if (run.calls > 0) add("evaluated-callback");
  const outcome = run.outcome;
  if (outcome === "threw") {
    add("untyped-refusal");
    return found;
  }
  if (outcome.refused) {
    if (!isTypedRefusal(outcome)) add("bare-refusal");
    if (entry.expect === "admit" || outcome.category !== entry.expect.category || outcome.field !== entry.expect.field) add("wrong-refusal");
    if (run.rendered.length > 0) add("rendered-before-refusal");
    return found;
  }
  if (entry.expect !== "admit") {
    add("admitted");
    if (run.rendered.length > 0) add("rendered-refused");
  }
  const frame = outcome.frame;
  const props = isRecord(frame.props) ? frame.props : {};
  const component = frame.component;
  const declared = typeof component === "string" ? KNOWN_COMPONENTS[component] : undefined;
  if (containsFunction(frame)) add("deserialized-callback");
  if (Object.keys(frame).some(key => !FRAME_FIELDS.includes(key)) || (declared !== undefined && Object.keys(props).some(name => !Object.hasOwn(declared, name)))) add("forwarded-undeclared");
  if (declared === undefined) add("resolved-unknown-component");
  if (!run.rendered.every(text => text.startsWith(`${String(component)}(`))) add("resolved-through-stream");
  if (frame.schema_version !== ACCEPTED_SCHEMA_VERSION) add("accepted-unknown-schema-version");
  if (!outcome.actions.every(action => KNOWN_ACTIONS.includes(action))) add("bound-unknown-action");
  if ((entry.nulls ?? []).some(name => !Object.hasOwn(props, name) || props[name] !== null)) add("coerced-null");
  if (entry.expect === "admit") {
    if (typeof entry.input !== "string" || JSON.stringify(outcome.frame) !== entry.input) add("round-trip-changed");
    if (JSON.stringify(run.rendered) !== JSON.stringify([entry.render])) add("rendered-mismatch");
  }
  return found;
}
/** The judge: every case of the constructed stream through `mutant` (the reference when absent); the findings, in case order. */
function judge(mutant?: Mutant): string[] {
  return CASES.flatMap(entry => findingsOf(entry, runCase(entry, mutant)));
}
/** A pin over the judge: the reference is clean and each of the pin's mutants fails it with the findings its witness pins. */
function mutantWitness(pin: string): { reference: string[]; mutants: Record<string, string[]> } {
  const reference = judge();
  expect(reference, "the reference adoption passes its own judge").toStrictEqual([]);
  const mutants = Object.fromEntries((MUTANTS_BY_PIN[pin] ?? []).map(mutant => [mutant, judge(mutant)]));
  expect(
    Object.entries(mutants)
      .filter(([, findings]) => findings.length === 0)
      .map(([mutant]) => mutant),
    `${pin}: every mutant fails the judge`,
  ).toStrictEqual([]);
  return { reference, mutants };
}

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(pin);
  return { pin, ...witness };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json | Promise<Json>>> = {
  A1: () => {
    const tree = liveTree();
    const floors = floorsOf(tree);
    expect(
      floors,
      `files ${tree.walk.files.length}; modules src ${modulesBelow(tree, "src")}, test ${modulesBelow(tree, "test")}, qa ${modulesBelow(tree, "qa")}, examples ${modulesBelow(tree, "examples")}; JSON ${tree.jsonFiles}; carriers ${tree.carriers}`,
    ).toStrictEqual({ files: true, src: true, test: true, qa: true, examples: true, json: true, carriers: true, manifests: true });
    const rootCounts = Object.fromEntries(Object.keys(ROOT_FLOORS).map(entry => [entry, tree.walk.files.filter(file => rootOf(file) === entry).length]));
    const rootFloors = Object.fromEntries(Object.entries(ROOT_FLOORS).map(([entry, floor]) => [entry, (rootCounts[entry] ?? 0) >= floor]));
    expect(rootFloors, `files below each root entry: ${JSON.stringify(rootCounts)}`).toStrictEqual(Object.fromEntries(Object.keys(ROOT_FLOORS).map(entry => [entry, true])));
    expect([...tree.walk.files].sort(), "the walk equals an independent listing of the same tree").toStrictEqual(listingOf(REPO));
    // SKIP ANCHOR (F3): the listing shares SKIPPED_ROOTS, so every skip is anchored outside this file and its roster; a skip of
    // a root entry nothing outside anchors (the gate's .agents plant, .pi with only an inner ignore pattern, new-feedback) reads.
    const ignored = ignoredRootsOf(readFileSync(join(REPO, IGNORE_FILE), "utf8"));
    const skipAnchor = {
      unanchored: unanchoredSkips(SKIPPED_ROOTS, ignored),
      planted: unanchoredSkips([".agents", ".pi", "new-feedback"], ignored),
    };
    expect(skipAnchor.unanchored, "every skipped root entry is git's data, the tracker export's root entry or ignored by the ignore file").toStrictEqual([]);
    expect(tree.anchorsWalked, "every walk anchor was reached with its token").toBe(true);
    expect({ symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, "the walk meets no symlink and no unreadable file").toStrictEqual({ symlinks: [], unreadable: [] });
    expect(tree.names, "remote-output names outside the census instruments, each with its file and line (the trigger's inventory)").toStrictEqual([]);
    const head = "remote";
    const controls = {
      typeName: namesIn("c.ts", "export interface RemoteComponent { id: string }\n"),
      camelIdentifier: namesIn("c.ts", "const remoteStream = open();\n"),
      snakeLiteral: namesIn("c.mjs", 'const kind = "remote_element";\n'),
      kebabLiteral: namesIn("c.js", 'const kind = "remote-producer";\n'),
      componentStream: namesIn("c.ts", "export type ComponentStream = AsyncIterable<unknown>;\n"),
      elementType: namesIn("c.ts", 'import type { RftsxElement } from "./x.js";\n'),
      crosswalk: namesIn("c.ts", "export const crosswalkRows: string[] = [];\n"),
      callbackSerialization: namesIn("c.ts", 'const mode = "callbackSerialization";\n'),
      folded: namesIn("c.ts", `const word = "${head}" + "Stream";\n`),
      regex: namesIn("c.ts", "const reader = /remote[-_]?stream/;\n"),
      escaped: namesIn("c.ts", 'const word = "\\u0072emoteStream";\n'),
      invisible: namesIn("c.ts", `const word = "remote${ZERO_WIDTH_SPACE}Stream";\n`),
      jsxText: namesIn("c.tsx", "export const view = <b>RemoteComponent</b>;\n"),
      jsonKey: jsonNames('{"remoteStream":true}'),
      jsonValue: jsonNames('{"kind":"remote-component"}'),
      jsonUnparsed: jsonNames('{"kind": "RemoteElement",}'),
      comment: namesIn("c.ts", "// reads a remote stream\nexport {};\n"),
      proseLiteral: namesIn("c.ts", 'const note = "a remote stream is not read here";\n'),
      jsonProse: jsonNames('{"note":"a remote component stream"}'),
      composed: namesIn("c.ts", 'const word = ["remote", "Stream"].join("");\n'),
      renamed: namesIn("c.ts", "const feed = connect(url);\nfor await (const frame of feed) show(frame);\n"),
      lookalike: namesIn("c.ts", `const remoteC${CYRILLIC_O}mponent = 1;\n`),
      gitRemote: namesIn("c.ts", 'const remoteUrl = git.remote("origin");\n'),
      fileStream: namesIn("c.ts", "const stream = createReadStream(path);\n"),
      registryComponent: namesIn("c.ts", "const component = registry.get(id);\n"),
    };
    const consumer = "export interface RemoteComponent { id: string }\n";
    const planted = plantedTree({
      "src/consumer.ts": consumer,
      "src/link.ts": null,
      "test/x.test.ts": consumer,
      "test/x-census.test.ts": consumer,
      "test/fixtures/x-roster.json": '{"remoteStream":1}',
      "docs/notes.md": "RemoteComponent\n",
      "node_modules/pkg/index.ts": consumer,
      "dist/index.js": consumer,
      ".beads/issues.jsonl": '{"remoteStream":1}\n',
      ".forge/run.json": '{"remoteStream":1}',
      "build/index.js": consumer,
      "coverage/run.json": '{"remoteStream":1}',
      "media/x.png": "RemoteComponent\n",
      "qa/run.sh": "exec serve --remote-stream\n",
    });
    // F5: each failing read has a positive control - an unreadable directory and file are recorded, a vanished file is not.
    // wb-yfzf F4: more than one failure each - a directory under EACCES and EIO; a file under EACCES, EIO, an Error without a
    // code and a thrown value that is no Error (it carries an ENOENT code, and is still no vanished file).
    const failure = (code: string): Error => Object.assign(new Error(`${code}: a planted read failure`), { code });
    const failing: Io = {
      list: directory => {
        if (posix(directory).endsWith("/src/sealed")) throw failure("EACCES");
        if (posix(directory).endsWith("/src/faulted")) throw failure("EIO");
        return DISK.list(directory);
      },
      read: path => {
        if (posix(path).endsWith("/src/locked.ts")) throw failure("EACCES");
        if (posix(path).endsWith("/src/gone.ts")) throw failure("ENOENT");
        if (posix(path).endsWith("/src/faulty.ts")) throw failure("EIO");
        if (posix(path).endsWith("/src/uncoded.ts")) throw new Error("a planted read failure without a code");
        if (posix(path).endsWith("/src/foreign.ts")) throw { code: "ENOENT" };
        return DISK.read(path);
      },
    };
    const sealed = plantedTree(
      {
        "src/faulted/inner.ts": "export {};\n",
        "src/faulty.ts": "export {};\n",
        "src/foreign.ts": "export {};\n",
        "src/gone.ts": "export {};\n",
        "src/locked.ts": "export {};\n",
        "src/open.ts": "export {};\n",
        "src/sealed/inner.ts": "export {};\n",
        "src/uncoded.ts": "export {};\n",
      },
      failing,
    );
    return done("A1", {
      floors,
      rootFloors,
      skipAnchor,
      anchorsWalked: tree.anchorsWalked,
      names: tree.names,
      controls,
      planted: { names: planted.names, instrumentNames: planted.instrumentNames, symlinks: planted.walk.symlinks, files: planted.walk.files },
      unreadable: { unreadable: sealed.walk.unreadable, read: [...sealed.modules.keys()] },
    });
  },
  A2: () => {
    const tree = liveTree();
    expect(
      { loads: tree.loads, manifestHits: tree.manifestHits, carrierHits: tree.carrierHits, jsonCommands: tree.jsonCommands },
      "modules loading or running the ReactiveComponents distribution, and manifests, carrier lines and JSON command lines naming it",
    ).toStrictEqual({ loads: [], manifestHits: [], carrierHits: [], jsonCommands: [] });
    expect(tree.computed, "loader calls whose specifier is not complete, each judged by hand: exactly COMPUTED_LOADS").toStrictEqual(COMPUTED_LOADS);
    const controls = {
      importDistribution: loadsIn("c.ts", 'import { Element } from "vibranium-reactive-components";\n'),
      importModule: loadsIn("c.ts", 'import rc from "reactive_components";\n'),
      subpath: loadsIn("c.ts", 'export * from "vibranium-reactive-components/remote";\n'),
      dynamicImport: loadsIn("c.mjs", 'const rc = await import("vibranium-reactive-components");\n'),
      require: loadsIn("c.cjs", 'const rc = require("reactive-components");\n'),
      importEquals: loadsIn("c.ts", 'import rc = require("reactive_components");\n'),
      importType: loadsIn("c.ts", 'type T = import("vibranium-reactive-components").Element;\n'),
      npmSpecifier: loadsIn("c.ts", 'const rc = await import("npm:vibranium-reactive-components@1");\n'),
      folded: loadsIn("c.ts", 'const rc = require("vibranium-" + "reactive-components");\n'),
      commandFirst: loadsIn("c.ts", 'execSync("python3 -m reactive_components serve");\n'),
      pythonModule: loadsIn("c.ts", 'spawn("python3", ["-m", "reactive_components", "serve"]);\n'),
      moduleSubpath: loadsIn("c.ts", 'execFileSync("uv", ["run", "python", "-m", "reactive_components.remote"]);\n'),
      packageJson: manifestNames("package.json", '{"dependencies":{"vibranium-reactive-components":"1"}}'),
      pyproject: manifestNames("pyproject.toml", 'dependencies = ["vibranium-reactive-components"]\n'),
      nearMiss: loadsIn("c.ts", 'import x from "reactive-componentsx";\n'),
      sdkVersionsEcho: loadsIn("c.ts", 'const echo = { sdk_versions: { reactive_components: "0.1.1" } };\n'),
      mentionOnly: loadsIn("c.ts", 'const name = "vibranium-reactive-components";\n'),
      composedSpecifier: loadsIn("c.ts", 'const rc = require(["vibranium", "reactive", "components"].join("-"));\n'),
      shellArgument: loadsIn("c.ts", 'spawn("sh", ["-c", "python3 -m reactive_components"]);\n'),
      otherModule: loadsIn("c.ts", 'spawn("python3", ["-m", "http.server"]);\n'),
      proseManifest: manifestNames("docs/notes.md", "vibranium-reactive-components\n"),
      // BOUND VALUES (F1): the gate's const-bound plant first, then one control per binding, expression and position arm.
      boundConst: loadsIn("c.ts", 'const spec = "vibranium-reactive-components";\nexport const load = () => import(spec);\n'),
      boundLet: loadsIn("c.ts", 'let spec = "vibranium-reactive-components";\nexport const load = () => require(spec);\n'),
      boundVar: loadsIn("c.js", 'var spec = "reactive_components";\nmodule.exports = () => require(spec);\n'),
      boundDefault: loadsIn("c.ts", 'export const load = (spec = "vibranium-reactive-components") => import(spec);\n'),
      boundDestructuredDefault: loadsIn("c.ts", 'export const load = ({ spec = "vibranium-reactive-components" }: { spec?: string }) => import(spec);\n'),
      boundAssigned: loadsIn("c.ts", 'let spec = "node:fs";\nspec = "vibranium-reactive-components";\nexport const load = () => import(spec);\n'),
      boundCompound: loadsIn("c.ts", 'let command = "python3";\ncommand += " -m reactive_components";\nexecSync(command);\n'),
      boundNullishAssigned: loadsIn("c.ts", 'let spec: string | undefined;\nspec ??= "vibranium-reactive-components";\nexport const load = () => import(spec);\n'),
      boundLoop: loadsIn("c.ts", 'for (const spec of ["node:fs", "vibranium-reactive-components"]) void import(spec);\n'),
      boundChain: loadsIn("c.ts", 'const name = "vibranium-reactive-components";\nconst spec = name;\nexport const load = () => import(spec);\n'),
      boundParenthesized: loadsIn("c.ts", 'const spec = "vibranium-reactive-components";\nexport const load = () => import((spec));\n'),
      boundAsserted: loadsIn("c.ts", 'const spec: unknown = "vibranium-reactive-components";\nexport const load = () => import(spec as string);\n'),
      boundSatisfies: loadsIn("c.ts", 'const spec = "vibranium-reactive-components";\nexport const load = () => import(spec satisfies string);\n'),
      boundNonNull: loadsIn("c.ts", 'const spec: string | undefined = "vibranium-reactive-components";\nexport const load = () => import(spec!);\n'),
      boundAngle: loadsIn("c.ts", 'const spec: unknown = "vibranium-reactive-components";\nexport const load = () => import(<string>spec);\n'),
      boundConditional: loadsIn("c.ts", 'const spec = process.env.CI ? "node:fs" : "vibranium-reactive-components";\nexport const load = () => import(spec);\n'),
      boundNullish: loadsIn("c.ts", 'export const load = (spec?: string) => import(spec ?? "vibranium-reactive-components");\n'),
      boundOr: loadsIn("c.ts", 'export const load = (spec: string) => import(spec || "vibranium-reactive-components");\n'),
      boundConcatenated: loadsIn("c.ts", 'const scope = "vibranium";\nexport const load = () => import(scope + "-reactive-components");\n'),
      boundTemplate: loadsIn("c.ts", `const scope = "vibranium";\nexport const load = () => import(\`\${scope}-reactive-components\`);\n`),
      partialCommand: loadsIn("c.ts", 'execSync("python3 -m reactive_components " + flags);\n'),
      partialTemplate: loadsIn("c.ts", `execSync(\`python3 -m reactive_components \${flags}\`);\n`),
      boundCommand: loadsIn("c.ts", 'const command = "python3 -m reactive_components serve";\nexecSync(command);\n'),
      boundModuleFlag: loadsIn("c.ts", 'const module = "reactive_components";\nspawn("python3", ["-m", module]);\n'),
      boundFlag: loadsIn("c.ts", 'const flag = "-m";\nspawn("python3", [flag, "reactive_components"]);\n'),
      boundElsewhere: loadsIn("c.ts", 'function name() {\n  const spec = "vibranium-reactive-components";\n  return spec;\n}\nexport const load = (spec: string) => import(spec);\n'),
      boundOther: loadsIn("c.ts", 'const spec = "node:fs";\nexport const load = () => import(spec);\n'),
      // Computed loads (F1): one control per loader and per way a name is not complete, then the quiet rows.
      computedImport: computedIn("c.ts", "export const load = (name: string) => import(name);\n"),
      computedRequire: computedIn("c.cjs", "module.exports = name => require(name);\n"),
      computedRequireResolve: computedIn("c.cjs", "module.exports = name => require.resolve(name);\n"),
      computedMetaResolve: computedIn("c.mjs", "export const where = name => import.meta.resolve(name);\n"),
      computedCreateRequire: computedIn("c.mjs", 'import { createRequire } from "node:module";\nexport const get = name => createRequire(import.meta.url)(name);\n'),
      computedCreateResolve: computedIn("c.mjs", 'import { createRequire } from "node:module";\nexport const where = name => createRequire(import.meta.url).resolve(name);\n'),
      computedModuleRequire: computedIn("c.cjs", "exports.get = name => module.require(name);\n"),
      computedParameter: computedIn("c.ts", 'const spec = "node:fs";\nexport const load = (spec: string) => import(spec);\n'),
      computedDestructured: computedIn("c.ts", 'const spec = "node:fs";\nexport const load = ({ spec }: { spec: string }) => import(spec);\n'),
      computedCaught: computedIn("c.ts", 'const spec = "node:fs";\ntry {\n  run();\n} catch (spec) {\n  void import(spec as string);\n}\n'),
      computedImported: computedIn("c.ts", 'import { spec } from "./names.js";\nconst local = () => {\n  const spec = "node:fs";\n  return spec;\n};\nexport const load = () => import(spec);\n'),
      computedDefaultImport: computedIn("c.ts", 'import spec from "./names.js";\nconst local = () => {\n  const spec = "node:fs";\n  return spec;\n};\nexport const load = () => import(spec);\n'),
      computedNamespaceImport: computedIn("c.ts", 'import * as spec from "./names.js";\nconst local = () => {\n  const spec = "node:fs";\n  return spec;\n};\nexport const load = () => import(spec);\n'),
      computedImportEquals: computedIn("c.ts", 'import spec = require("./names.js");\nconst local = () => {\n  const spec = "node:fs";\n  return spec;\n};\nexport const load = () => import(spec);\n'),
      computedLoopOther: computedIn("c.ts", 'const spec = "node:fs";\nfor (const spec of names) void import(spec);\n'),
      computedForIn: computedIn("c.ts", 'const spec = "node:fs";\nfor (const spec in table) void import(spec);\n'),
      computedLoopTarget: computedIn("c.ts", 'let spec = "node:fs";\nfor (spec of names) void import(spec);\n'),
      computedAppend: computedIn("c.ts", 'let spec = "vibranium-reactive";\nspec += "-components";\nexport const load = () => import(spec);\n'),
      computedDestructuringAssigned: computedIn("c.ts", 'let spec = "node:fs";\n[spec] = names;\nexport const load = () => import(spec);\n'),
      computedPartial: computedIn("c.ts", 'let spec = "node:fs";\nspec = pick();\nexport const load = () => import(spec);\n'),
      computedMember: computedIn("c.ts", "export const load = () => import(config.spec);\n"),
      computedUnbound: computedIn("c.ts", "export const load = () => import(spec);\n"),
      computedCycle: computedIn("c.ts", "let a = b;\nlet b = a;\nexport const load = () => import(a);\n"),
      composedComputed: computedIn("c.ts", 'const rc = require(["vibranium", "reactive", "components"].join("-"));\n'),
      computedLiteral: computedIn("c.ts", 'export const load = () => import("node:fs");\n'),
      computedBound: computedIn("c.ts", 'const spec = "node:fs";\nexport const load = () => import(spec);\n'),
      computedLoop: computedIn("c.ts", 'for (const spec of ["node:fs", "node:path"]) void import(spec);\n'),
      computedOtherCall: computedIn("c.ts", "export const show = (name: string) => console.log(name);\n"),
      aliasedLoader: computedIn("c.mjs", 'import { createRequire } from "node:module";\nconst load = createRequire(import.meta.url);\nexport const get = name => load(name);\n'),
      workerLoader: computedIn("c.mjs", 'import { Worker } from "node:worker_threads";\nexport const start = name => new Worker(name);\n'),
      // Quiet rows of R-COMPOSED and R-UNRESOLVED.
      composedAppend: loadsIn("c.ts", 'let command = "python3 -m reactive";\ncommand += "_components";\nexecSync(command);\n'),
      composedCommand: loadsIn("c.ts", 'execSync(["python3 -m", "reactive_components", "serve"].join(" "));\n'),
      memberCommand: loadsIn("c.ts", 'const config = { command: "python3 -m reactive_components serve" };\nexecSync(config.command);\n'),
      callCommand: loadsIn("c.ts", 'const commandFor = (verb: string) => ["python3 -m", "reactive_components", verb].join(" ");\nexecSync(commandFor("serve"));\n'),
      importedCommand: loadsIn("c.ts", 'import { COMMAND } from "./commands.js";\nexecSync(COMMAND);\n'),
      // PEP 503 (wb-yfzf F1): pip reads the distribution's name in any case with its words joined by any run of "-", "_" or ".",
      // so each spelling is a hit in each A2 position - the gate's carrier and requirements plants first; an artifact name with
      // its version is one too; the words run together, or the name continued by another word, are another distribution.
      pep503Carrier: carrierHitsIn(".github/workflows/gate-pep503.yml", "      - run: pip install vibranium_reactive_components\n"),
      pep503Requirements: manifestNames("qa/requirements-gate.txt", "vibranium.reactive.components==0.1.1\n"),
      pep503Case: manifestNames("pyproject.toml", 'dependencies = ["Vibranium-Reactive-Components>=0.1"]\n'),
      pep503Runs: carrierHitsIn("qa/install.sh", "pip install vibranium__reactive--components\n"),
      pep503MixedRun: carrierHitsIn("qa/install.sh", "pip install vibranium_-reactive._components\n"),
      pep503JsonCommand: jsonCommandsIn("c.json", '{"command":"pip install vibranium_reactive_components"}'),
      pep503CommandString: loadsIn("c.ts", 'execSync("pip install vibranium.reactive.components");\n'),
      artifactWheel: carrierHitsIn("qa/install.sh", "pip install ./vibranium_reactive_components-0.1.1-py3-none-any.whl\n"),
      artifactSdist: carrierHitsIn("qa/install.sh", "pip install vibranium-reactive-components-0.1.1.tar.gz\n"),
      pep503Joined: carrierHitsIn("qa/install.sh", "pip install vibraniumreactivecomponents\n"),
      pep503OtherDistribution: carrierHitsIn("qa/install.sh", "pip install vibranium-reactive-components-extra\n"),
      // R-COMPOSED's carrier members (wb-yfzf F2), quiet rows: a carrier is read line by line as written, so a name the shell
      // assembles from a parameter (the gate's plant), from adjacent quoted parts or across a line continuation is not read.
      composedCarrier: carrierHitsIn("qa/workbench/gate-compose.sh", `M=reactive_\nexec python3 -m "\${M}components" serve\n`),
      composedQuotedCarrier: carrierHitsIn("qa/workbench/gate-compose.sh", 'exec python3 -m "reactive_""components" serve\n'),
      composedContinuedCarrier: carrierHitsIn("qa/workbench/gate-compose.sh", "exec python3 -m reactive_\\\ncomponents serve\n"),
    };
    // CARRIERS (F2): the gate's five carrier plants, an extensionless script and a JSON hook command are hits; prose, a binary and a
    // JSON sdk_versions echo stay quiet (R-PROSE, R-BINARY, R-JSON-NAME). wb-yfzf: the gate's two PEP 503 plants (a workflow
    // carrier, a requirements manifest that is a carrier too) are hits end to end; its composed carrier stays quiet (R-COMPOSED).
    const carriers = plantedTree({
      ".codex/hooks.json": '{"hooks":[{"command":"python3 -m reactive_components serve"}]}\n',
      ".github/workflows/gate-pep503.yml": "jobs:\n  gate:\n    steps:\n      - run: pip install vibranium_reactive_components\n",
      ".github/workflows/rc.yml": "jobs:\n  rc:\n    steps:\n      - run: pip install vibranium-reactive-components\n",
      "bin/rc": "#!/bin/sh\nexec python3 -m reactive_components\n",
      "docs/rc.md": "python3 -m reactive_components\n",
      "examples/rc.html": '<script type="module">import { Element } from "vibranium-reactive-components";</script>\n',
      "forge.toml": '[tasks.rc]\ncommand = "python3 -m reactive_components serve"\n',
      "media/rc.png": "vibranium-reactive-components\n",
      "qa/requirements-gate.txt": "vibranium.reactive.components==0.1.1\n",
      "qa/tools/rc.py": "import reactive_components\n",
      "qa/workbench/gate-compose.sh": `#!/bin/sh\nM=reactive_\nexec python3 -m "\${M}components" serve\n`,
      "qa/workbench/rc.sh": "#!/bin/sh\npython3 -m reactive_components serve --remote-stream\n",
      "test/fixtures/broken.json": '{"command": "python3 -m reactive_components",}\n',
      "test/fixtures/sdk.json": '{"sdk_versions":{"reactive_components":"0.1.1"}}\n',
      "test/fixtures/x-roster.json": '{"note":"python3 -m reactive_components"}\n',
    });
    return done("A2", {
      loads: tree.loads,
      manifestHits: tree.manifestHits,
      carrierHits: tree.carrierHits,
      jsonCommands: tree.jsonCommands,
      computed: tree.computed,
      manifests: tree.manifests,
      controls,
      carriers: { hits: carriers.carrierHits, jsonCommands: carriers.jsonCommands, instrumentCommands: carriers.instrumentCommands, manifestHits: carriers.manifestHits },
    });
  },
  A3: () => {
    const tree = liveTree();
    const readers = NEAREST_READERS.map(([path, token]) => {
      const reading = tree.modules.get(path);
      return { path, reached: reading?.identifiers.has(token) === true, quiet: reading !== undefined && reading.names.length === 0 && reading.loads.length === 0 };
    });
    expect(
      readers.filter(reader => !reader.reached || !reader.quiet),
      "the nearest readers are reached, carry their identifier and are quiet",
    ).toStrictEqual([]);
    const pathOf = (hit: string): string => hit.slice(0, hit.indexOf(":"));
    const own = [SELF, ROSTER_FILE].map(path => ({
      path,
      instrument: CENSUS_INSTRUMENT.test(path),
      walked: tree.walk.files.includes(path),
      spellsFamily: tree.instrumentNames.some(hit => pathOf(hit) === path),
    }));
    expect(
      own.filter(entry => !(entry.instrument && entry.walked && entry.spellsFamily)),
      "this file and its roster are walked instruments that spell the family, so the instrument rule is load-bearing",
    ).toStrictEqual([]);
    expect(
      tree.instrumentNames.filter(hit => !CENSUS_INSTRUMENT.test(pathOf(hit))),
      "every name read inside an instrument sits in an instrument",
    ).toStrictEqual([]);
    const rosterCommands = tree.instrumentCommands.some(hit => pathOf(hit) === ROSTER_FILE);
    expect(
      { outside: tree.instrumentCommands.filter(hit => !CENSUS_INSTRUMENT.test(pathOf(hit))), rosterCommands },
      "every JSON command line read inside an instrument sits in an instrument, and the roster spells command lines",
    ).toStrictEqual({ outside: [], rosterCommands: true });
    return done("A3", { readers, own, instrumentsOnly: true, rosterCommands });
  },
  A4: () => {
    const bead = readBeadRow();
    const gating = gatingOf(bead.notes);
    const authority = authorityOf(bead.notes);
    expect(gating, "the filing's Gating line parses").toBeDefined();
    expect(authority, "the filing's Authority line parses").toBeDefined();
    const { readme, pins, absentPatterns, hostCheckouts } = ROSTER.producer;
    const program = producerPin("program");
    const master = producerPin("origin-master");
    const named = gating?.names ?? [];
    const remoteNames = named.filter(name => name !== "crosswalk");
    const facts = {
      beadNamesMeasured: JSON.stringify(named) === JSON.stringify(Object.keys(absentPatterns)),
      beadShaIsProgramPin: gating !== undefined && gating.sha.length >= 12 && program.sha.startsWith(gating.sha),
      programAbsent: named.every(name => program.absent[name] === 0),
      schemaSiteAgrees: program.otherSense.schemaVersion.map(site => site.slice(site.lastIndexOf("/") + 1)).join() === gating?.schemaSite,
      hostConditionQuoted: gating !== undefined && (readme.lines[gating.hostLine] ?? "").includes(gating.hostQuote),
      authorityQuoted:
        authority !== undefined && (readme.lines[authority.line] ?? "").startsWith(authority.head) && (readme.lines[authority.line] ?? "").endsWith(authority.tail),
      quoteOnItsLine: (readme.lines["15"] ?? "").includes(ROSTER.quote),
      remoteProducerShipped: pins.some(pin => remoteNames.some(name => (pin.absent[name] ?? 0) > 0)),
      elementCrosswalkShipped: pins.some(pin => (pin.absent.RftsxElement ?? 0) > 0),
      crosswalkDrift: pins.filter(pin => (pin.absent.crosswalk ?? 0) > 0).map(pin => `${pin.label}:${pin.otherSense.crosswalk.length}:${pin.crosswalkSchema ?? "none"}`),
      sameDistribution: pins.every(pin => pin.distribution === RC_DISTRIBUTION),
      interfaceHostsInstalled: hostCheckouts.present.length > 0,
      masterIsLater: master.sha !== program.sha,
    };
    expect(facts, "the measured producer agrees with the filing: RC-IF-04 and RC-IF-01 unshipped, the drift recorded").toStrictEqual({
      beadNamesMeasured: true,
      beadShaIsProgramPin: true,
      programAbsent: true,
      schemaSiteAgrees: true,
      hostConditionQuoted: true,
      authorityQuoted: true,
      quoteOnItsLine: true,
      remoteProducerShipped: false,
      elementCrosswalkShipped: false,
      crosswalkDrift: facts.crosswalkDrift,
      sameDistribution: true,
      interfaceHostsInstalled: false,
      masterIsLater: true,
    });
    return done("A4", facts);
  },
  B1: async () => {
    const ids = ["K1", "K2", "K3", "U1", "U2", "U3", "U4", "U5"];
    const runs = Object.fromEntries(ids.map(id => [id, runCase(caseOf(id))]));
    const outcomes = Object.fromEntries(Object.entries(runs).map(([id, run]) => [id, shown(run)]));
    const rendered = Object.fromEntries(Object.entries(runs).map(([id, run]) => [id, run.rendered.length]));
    const executed = Object.values(runs).reduce((total, run) => total + run.executed.length, 0);
    expect(executed, "no action id is ever run by the adoption").toBe(0);
    const u1 = runs.U1?.outcome;
    const host = makeHost();
    const error: unknown = await host.components.invoke("fixture.banner", {}, CONTEXT).then(
      () => undefined,
      (caught: unknown) => caught,
    );
    expect(error, "Pi's own registry refuses the unknown id").toBeInstanceOf(CapabilityError);
    const registryRefusal = error instanceof CapabilityError ? { category: error.category, message: error.message } : null;
    const adoptionRefusal = u1 !== undefined && u1 !== "threw" && u1.refused ? { category: u1.category, message: u1.reason } : null;
    expect(adoptionRefusal, "the adoption's unknown-id refusal is the registry's own").toStrictEqual(registryRefusal);
    expect(host.executed, "the registry refused before any provider ran").toStrictEqual([]);
    return done("B1", { outcomes, rendered, executed, registryRefusal });
  },
  B2: () => {
    const witness = mutantWitness("B2");
    // JUDGE LIVENESS (F3): every branch of the judge is reached by a named mutant, and no other kind is emitted.
    const runs = Object.fromEntries(MUTANTS.map(mutant => [mutant, judge(mutant)]));
    const kindOf = (finding: string): string => finding.slice(finding.indexOf(":") + 1);
    const reached = Object.fromEntries(FINDING_KINDS.map(kind => [kind, MUTANTS.filter(mutant => (runs[mutant] ?? []).some(finding => kindOf(finding) === kind))]));
    expect(
      FINDING_KINDS.filter(kind => (reached[kind] ?? []).length === 0),
      "every branch of the judge is reached by a named mutant",
    ).toStrictEqual([]);
    expect(
      [...new Set(Object.values(runs).flat().map(kindOf))].filter(kind => !FINDING_KINDS.includes(kind)),
      "the judge emits no kind outside FINDING_KINDS",
    ).toStrictEqual([]);
    return done("B2", { ...witness, reached });
  },
  C1: () => {
    const ids = ["F1", "F2", "F3", "F4"];
    const runs = Object.fromEntries(ids.map(id => [id, runCase(caseOf(id))]));
    const outcomes = Object.fromEntries(Object.entries(runs).map(([id, run]) => [id, shown(run)]));
    const calls = Object.values(runs).reduce((total, run) => total + run.calls, 0);
    const rendered = Object.values(runs).reduce((total, run) => total + run.rendered.length, 0);
    const admitted = Object.values(runs).filter(run => run.outcome !== "threw" && !run.outcome.refused).length;
    expect({ calls, rendered, admitted }, "no callback runs, nothing is rendered and no refused frame is forwarded").toStrictEqual({ calls: 0, rendered: 0, admitted: 0 });
    const f1 = runs.F1?.outcome;
    const boundary = f1 !== undefined && f1 !== "threw" && f1.refused ? f1.reason : null;
    return done("C1", { outcomes, calls, rendered, admitted, boundary });
  },
  C2: () => done("C2", mutantWitness("C2")),
  D1: () => {
    const ids = ["S1", "S2", "S3", "S4", "N1", "O1", "E1"];
    const outcomes = Object.fromEntries(ids.map(id => [id, shown(runCase(caseOf(id)))]));
    const roundTrip = Object.fromEntries(
      ["K1", "K2", "K3"].map(id => {
        const entry = caseOf(id);
        const run = runCase(entry);
        return [id, run.outcome !== "threw" && !run.outcome.refused && JSON.stringify(run.outcome.frame) === entry.input];
      }),
    );
    const k2 = runCase(caseOf("K2")).outcome;
    const nullKept = k2 !== "threw" && !k2.refused && isRecord(k2.frame.props) && Object.hasOwn(k2.frame.props, "note") && k2.frame.props.note === null;
    expect({ roundTrip, nullKept }, "every admitted frame re-encodes to its input bytes, and a nullable null stays null").toStrictEqual({
      roundTrip: { K1: true, K2: true, K3: true },
      nullKept: true,
    });
    // Why integer-like keys are refused: Pi's JSON boundary and JSON.parse both move them first.
    const ordered = '{"title":"t","2":"x"}';
    const boundaryOrder = Object.keys(validatedCapabilityJson(JSON.parse(ordered), "probe") as JsonObject);
    const parseOrder = Object.keys(JSON.parse(ordered) as JsonObject);
    return done("D1", { outcomes, roundTrip, nullKept, boundaryOrder, parseOrder });
  },
  D2: () => {
    const clauses = acceptanceClauses(readBeadRow().notes);
    const phrases = namedMutants(clauses.find(clause => clause.startsWith("(c) ")) ?? "");
    expect(phrases, "clause (c) names exactly the mutants BEAD_MUTANTS reads").toStrictEqual(Object.keys(BEAD_MUTANTS));
    expect(
      phrases.filter(phrase => {
        const mutant = BEAD_MUTANTS[phrase];
        return mutant === undefined || !(MUTANTS_BY_PIN.D2 ?? []).includes(mutant);
      }),
      "every named mutant is one this pin fails",
    ).toStrictEqual([]);
    return done("D2", { phrases, ...mutantWitness("D2") });
  },
};

/** A describe title: the label with the family masked, so a report holding this file's titles stays quiet. */
const titleOf = (row: Row): string => `${row.id} ${row.label.replace(REMOTE_TEXT, "<remote-output name>")}`;

describe("wb-5ltg.3 gated ReactiveComponents remote-output consumer census (RC-NATIVE-INTERFACE-COMPONENT-CONTRACT-R3: absent today, adoption contract armed)", () => {
  it(FROZEN_TITLE, { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:2", "C:2", "D:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const constants = { bead: BEAD, scan: SCAN, residuals: RESIDUAL_FAMILIES };
    expect(constants, JSON.stringify(constants)).toStrictEqual({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] });
    expect([...new Set(Object.values(MUTANTS_BY_PIN).flat())].sort(), "every mutant is failed by a pin").toStrictEqual([...MUTANTS].sort());
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^\[[^\]]+\] (If Pi ever [^,(]+?) \(/.exec(bead.title)?.[1] ?? "";
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a) to (d)").toEqual(["(a) ", "(b) ", "(c) ", "(d) "]);
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["B"], ["C"], ["D"], ["A"], ["A"]]);
    expect(clauses[3], "acceptance (d) counts consumer sites").toContain("zero remote-stream consumer sites in Pi");
    expect(quoteOf(bead.notes), "the filing's quote and citation").toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${producerPin("program").sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness, JSON.stringify(witness)).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it(RECORDS_TITLE, { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const suites: string[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") {
          suites.push(child.name);
          visit(child.tasks);
        }
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(
      [...suites, ...titles].filter(name => REMOTE_FAMILY.test(wordsOf(name))),
      "registered titles spelling the judged family",
    ).toEqual([]);
  });
});
