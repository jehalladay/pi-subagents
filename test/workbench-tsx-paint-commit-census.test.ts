/**
 * wb-if7q.3 (TSX-NATIVE-INTERFACES-AND-PORTABLE-TSX-R3), the absent-today leg. Statement (bead notes, full form): "If Pi ever
 * implements or embeds a TSX InterfaceHost/InterfaceEvaluation (gated TSX-IF-04 staged evaluation/commit host; unshipped at
 * 76bbbffd9d4a), the Pi host shall (a) never call a component during a paint callback nor run provider inference as an
 * incidental render effect and (b) commit host effects atomically per accepted evaluation generation, so an aborted, suspended
 * or failed evaluation commits neither host effects nor component state" (ReactiveFiberTSXSDK
 * docs/programs/native-interfaces-and-portable-tsx-2026-10-21/01-runtime-contracts.md:11@76bbbffd9d4a; merged pin :13, "Host
 * commit is atomic for one accepted evaluation generation."). Acceptance: "(a) absence pin: no Pi module implements or imports
 * InterfaceHost or InterfaceEvaluation at the pinned version; (b) armed, purity: N paint/frame callbacks over a mounted fixture
 * tree produce zero component invocations and zero provider/model calls (wb-021.5/wb-km7q.7 falsifier); (c) armed, atomicity:
 * abort/suspend/fail injected mid-evaluation yields zero host effects and a byte-identical pre-evaluation state snapshot; a
 * fault between two staged mutations of generation g+1 leaves g intact."
 *
 * Pi hosts no TSX UI today: rf renders TSX components for Pi (the rf-tsx tier), and no Pi module is an interface host or
 * evaluates for one. So the trigger has not fired, (a) holds by absence, and (b) and (c) wait for TSX-IF-04. Two rows:
 * A, the trigger and acceptance (a), absent today. A1 no walked module, parsed by the TypeScript compiler under its own script
 *   kind, names InterfaceHost or InterfaceEvaluation (exactly) where the compiler reads a name: an identifier in any position
 *   (an import or export specifier, a declaration, an implements or extends clause, a type reference or annotation, a
 *   qualified name, a property access, a JSX tag, a binding pattern; escapes decoded by the compiler); a string-named member
 *   or export (an element access, a computed name or an indexed access type that folds to the name, a string literal type
 *   passed as a type argument such as Pick's key, a quoted property, method, accessor or enum member name, a quoted import or
 *   export name); or, in a JS-family module, any name in its JSDoc (the types the program reads from a JS module). A2 no
 *   walked module loads a host or ui entry of the TSX SDK (the entries 02-implementation.md:4 designs; ENTRY_FAMILY: the
 *   package, an optional version, then a host or ui segment, bare or after npm:, jsr:, a URL or a node_modules path): by an
 *   import or export declaration, an import-equals require, an import type, an ambient module declaration, a dynamic import, a
 *   loader's specifier (require, require.resolve, any object's require member such as module.require or globalThis.require,
 *   import.meta.resolve, a created require or its resolve, or an identifier bound to one of them; called directly, through
 *   .call or .apply, or through Reflect.apply), a vitest module verb (VI_VERBS), new URL, Worker or SharedWorker, a
 *   triple-slash reference directive, the JSX import-source pragma, or a JSDoc import type in a JS-family module; and no
 *   manifest (MANIFEST) names one anywhere in its text. NO EXEMPTION: this file and its roster are walked and judged like
 *   every other file. They carry the two names and the entries as needles only (string and template literals, comments,
 *   regular expressions), in no position A1 or A2 reads, so a sibling census that needs the names as needles is judged and not
 *   refused.
 * B, acceptances (b) and (c), armed and gated on TSX-IF-04. B1 (b) waits for InterfaceHost: the roster's measured producer
 *   facts give its sites under docs/ only at the program pin and none under a file the package publishes, no src/ or python/
 *   file in the bead's name grep, no ./host or ./ui export at the pin or at the version installed rf maps, no host or ui key
 *   in that import map and no site at the mapped version, as the bead row's Gating line states; and no registered test or
 *   suite title in the walked tree (the literal or folded first argument of it, test, describe, suite or bench, through any
 *   modifier chain: concurrent, each, for, fails, sequential and the rest) names (b)'s purity vocabulary (PURITY_CLAIM). B2 is
 *   the same for (c): InterfaceEvaluation's facts, absent likewise, and (c)'s atomicity vocabulary (ATOMICITY_CLAIM). A cut that re-measures
 *   the roster and finds either gate open flips that pin red until the armed legs arrive with it.
 * THE WALK: every regular file below the repository root, at any depth, in name order; SKIPPED_ROOTS (git's data, the tracker
 * export, installed dependencies, build, coverage and Forge outputs) are skipped at the root only. It reads the working tree,
 * so an untracked plant is read; a symlink is refused, never followed; a failed read is a finding (a file gone between the
 * listing and the read is skipped). FLOORS sit below the counts measured at base febca35; WALK_ANCHORS, NAME_ANCHORS (one live
 * name per read position: an import binding, an implements clause, an indexed access type, a JS module's JSDoc), LOAD_ANCHORS
 * (a static import, a dynamic import, a vitest importActual) and TITLE_ANCHOR (the rf-tsx tier's success row) keep each reader
 * non-vacuous on the real tree, and the planted controls keep each position live; A1's planted tree carries a module at its
 * root (host.ts, beside the root symlink link.ts) as well as below it, so a walk that stops listing depth-0 modules reds.
 * CROSS-CHECK (wb-ril9 F3): listingOf, node's own recursive readdir (independent of walkTree's code, nothing below a symlink
 * kept), is taken just before and just after each walk. On the live tree every file both listings hold must have been walked
 * (a file written or removed during the walk is in at most one of them, so it is not judged); on each planted tree the walk
 * and the listing agree exactly. A1's planted tree also carries modules at depths 4 and 5, below a root-level and a nested
 * dot-directory, and as a root-level and a nested dot-file. So a walk that drops a depth, a dot-directory, a dot-file or any
 * other name a walked or planted tree holds reds; a walk that stops below depth 5 reads every tree the same today (no planted
 * file sits deeper, and the walked tree's deepest file sits at depth 4), so it is not claimed until a file sits there.
 * POLARITY (wb-ab0i F1, asserted in code on each pin's live witness before the roster compare): every planted control and
 * plant reads true unless a quiet row (QUIET) or a negative control (NEGATIVE_CONTROLS: the near misses each reader must leave
 * alone, and the gate's closed readings - the measured facts, a site added under docs/, and the armed reading over the
 * measured facts) names it, and those read false; B1's registrar titles are exactly REGISTRAR_TITLES; POLARITY_COUNTS pins
 * each pin's true/false counts, so a control dropped beside its reader reds. Each vocabulary alternative, each gate condition
 * and each side of an import-map entry carries a control of its own (wb-ab0i F1), and so does each member of the RESOLVABLE
 * CLASSES below (wb-ril9): a reader's predicate hollowed at one of those members, together with a roster regenerated from its
 * own witnesses and constants, reds in code - at that granularity and no finer.
 * RESOLVABLE CLASSES (wb-ril9, the R739 terminal enumerate-the-resolvable form at hop 3 of the wb-if7q.3 chain; this list is
 * the criterion, and it names the members the controls bind):
 *  (1) FLAG: the i flag of each scan pattern the roster holds by source and flags (PURITY_CLAIM, ATOMICITY_CLAIM,
 *      ENTRY_FAMILY, MANIFEST) - a cased control or plant each.
 *  (2) SEPARATOR: each position between two words of an armed vocabulary alternative (PURITY_WORDS, ATOMICITY_WORDS) reads
 *      each SEPARATORS member (a space, a hyphen, an underscore, none, a run of all three), and pre- and mid- read each
 *      OPTIONAL_HYPHEN member (the hyphen, none) - a control each, every word singular.
 *  (3) NARROWING: every other narrowing of one of those four patterns by one feature (an alternative dropped, an optional
 *      part made required or dropped, a * narrowed to + or ? or dropped, a member dropped from a character class) reds
 *      through the controls above, the alternative controls, an unversioned, an empty and a multi-character version
 *      (ENTRY_FAMILY), and one positive manifest per MANIFEST alternative, optional part and class member (one at the root,
 *      one cased). Two kinds read as the pattern does under every search and carry no control (equivalent): a change inside
 *      alternative 1's optional frame group (whatever it admits also matches the frame alternative) and an alternative's
 *      trailing optional plural dropped (its singular prefix matches). A widening - an anchor, a lookahead, or a member of a
 *      negated class or of a lookahead's class dropped - reads more and hides nothing: it is outside this class, and the
 *      negative controls pin their named near misses only.
 *  (4) DECODER: each escape form decodeEscapes decodes (a braced and a four-digit unicode escape, a two-digit hex escape, a
 *      hex and a decimal reference, a percent escape), read in a manifest's text - a control each (a form's own digit counts
 *      and optional semicolon are outside this class).
 *  (5) GATE CONDITION: both sides of the published-file clause (a docs/ site in a published file, and one below a published
 *      directory) and the docs/ prefix read whole (a site under docsite/ is no docs site) - a control each, beside the landed
 *      gate controls.
 *  (6) GATE INPUT: each producer fact the gate reads (the program pin's sites, files, exports and src/python files; the mapped
 *      version's sites, exports, src/python files and import map), planted alone on a copy of the measured facts and read
 *      through armedReading itself, plus one module titled in the leg's vocabulary planted for its claims - a control each,
 *      the measured facts reading closed.
 *  (7) WALK: the cross-check and the plants above.
 * MEASURED PRODUCER FACTS (roster `producer`, read-only, 2026-10-23): ReactiveFiberTSXSDK at the program pin 76bbbffd9d4a
 * (package 0.1.668; origin/main of the local clone at its last fetch): `git grep -n -E 'InterfaceHost|InterfaceEvaluation'`
 * gives three sites, all under docs/ and none in code (01-runtime-contracts.md:11 and :13, 02-implementation.md:13); `git grep -l -E
 * 'InterfaceHost|InterfaceEvaluation|SurfaceCapabilities' <sha> -- src python` gives no file; package.json exports ., the
 * jsx-runtime, jsx-dev-runtime, testing and embedding entries and ./package.json, and publishes dist,
 * docs/security/redaction-defaults.json, LICENSE and README.md. Installed rf 0.1.832 (`rf --json --version`) maps the SDK to
 * npm:@reactive-fiber/tsx@0.1.649 in its packaged integrations/tsx/import-map.json (four keys: the root, jsx-dev-runtime,
 * jsx-runtime and embedding), whose runtime-lock source is ReactiveFiberTSXSDK 5da03a7d49f4 (an ancestor of the pin): no
 * site of either name anywhere in that tree, no src/ or python/ file in the grep, the same six export keys. Pi vendors none of
 * these; a producer change is seen only when a cut re-measures the roster.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the rows, every pin's witness (each carries
 * its pin id), the scan constants, the residual families, the quiet rows and the registered test titles are held to the
 * out-of-file roster (test/fixtures/tsx-paint-commit-roster.json). OUTSIDE ANCHOR: the owner filing's row in the tracked
 * bead export (.beads/issues.jsonl, row wb-if7q.3): every acceptance clause and the title's trigger sit verbatim in exactly one
 * row label and every row carries one; its quote, citation and merged pin equal the roster's; and each pin answers, by
 * position, one atom the row itself yields - A1 and A2 the two absence facts of its Gating sentence, B1 and B2 the heads of its
 * armed clauses - so a row or a pin removed from every literal of this file and of the roster together still reds.
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run
 * mode, not inverted, ran; every pin's case reached its end (REACHED); no registered suite or test title of this file names
 * either armed vocabulary (the describe titles replace it), so a report holding these titles reads no armed claim.
 * RESIDUALS (named families, each with pinned quiet rows in QUIET, held to the roster): R-NEEDLE a name or an entry inside a
 * literal or a regular expression outside a read position (a census's needle, this file's own; a string literal type outside a
 * type argument; a bundler alias value); R-COMMENT a comment in a TS-family module, JSDoc included (TypeScript reads no type
 * from it), or a comment mentioning an entry; R-AFFIXED a longer identifier that contains a name (a factory or an options
 * type), a different identifier than the two types; R-CASED another casing of a name; R-LOOKALIKE a non-ASCII look-alike letter
 * or a joiner inside a name; R-COMPOSED a name or a specifier assembled at runtime from a variable, a call or a join;
 * R-REFLECTIVE a lookup through a call argument (Reflect.get); R-ALIASED-LOADER a loader reached through an object property, a
 * destructuring binding or a parameter; R-ROOT the SDK's root or another subpath (the rf TSX census, wb-o4h0.4, owns every SDK
 * load); R-HOST-PACKAGE a host implementation loaded from a separate host package (none is published at the pin, so no name is
 * known); R-NONMODULE a reference in a file that is no module (a page, a JSON fixture, an extensionless script); R-OUTSIDE a
 * file below a skipped root entry; R-OWN-HOST Pi's own render and write vocabulary (its TUI frames, its store's atomic rename),
 * which names no TSX host; R-COMPUTED-TITLE a title computed at runtime, or registered through another registrar (a test.extend
 * result, a node:test subtest's t.test), which no static reader reads.
 * NOT CLAIMED (wb-ab0i F2, the live verdicts): A1's references and A2's loads and manifest hits are aggregated over a clean
 * tree, and each armed leg's live reading is one armedReading call over the measured facts and the walked tree (armedLive),
 * so replacing one of those aggregations, or that call's result, by its clean value stays green - the planted controls run
 * the same readers over planted trees, and armedReading itself runs over planted producer facts and a planted titled tree
 * (wb-ril9 F4), but no canary reaches a live aggregation or the live call, so only a dirty tree or a re-measured producer
 * tells a hollowed one from a clean one. NOT CLAIMED either (this file's own literals and code): which control reads true is
 * this file's own literal, and so are the controls' texts, the tables they are built from and the cross-check's listing, so
 * a reader's predicate hollowed together with every polarity literal (its flipped controls moved into QUIET or
 * NEGATIVE_CONTROLS, POLARITY_COUNTS and REGISTRAR_TITLES rewritten to match), with the texts or tables that exercise it
 * rewritten to stop, or with the listing rewritten to follow the walk, and a regenerated roster, stays green.
 * Display paths added: none. Test-only: it spawns nothing; the controls plant files in makeScratch scratch only.
 */
import { type Dirent, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-tsx-paint-commit-census.test.ts";
const ROSTER_FILE = "test/fixtures/tsx-paint-commit-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-if7q.3";
/** The two host-boundary types acceptance (a) names, as the program doc spells them (01-runtime-contracts.md:11 and :13),
 * composed so no code line of this file spells either name whole (a sentence-reading census sees them in marked prose only). */
const HOST_TYPE = ["Interface", "Host"].join("");
const EVALUATION_TYPE = ["Interface", "Evaluation"].join("");
const FAMILY: readonly string[] = [HOST_TYPE, EVALUATION_TYPE];
/** The TSX SDK (installed rf's packaged import map) and the host and ui entries the program designs (02-implementation.md:4). */
const SDK = "@reactive-fiber/tsx";
const HOST_ENTRY = `${SDK}/host`;
const UI_ENTRY = `${SDK}/ui`;
/** A host or ui entry of the TSX SDK as any text names it: the package, an optional version, then a host or ui segment that
 * ends the name or a path part (bare, after npm:, jsr:, a URL or a node_modules path). */
const ENTRY_FAMILY = /@reactive-fiber\/tsx(?:@[^/\s"'`]*)?\/(?:host|ui)(?![\w-])/i;
/** The export keys of those entries (the bead row's "no ./host or ./ui export"). */
const ENTRY_KEYS: readonly string[] = ["./host", "./ui"];
/** The implementation step both armed legs wait for (02-implementation.md:12-13). */
const GATE_STEP = ["TSX", "IF", "04"].join("-");
/** What a registered title claiming (b) would have to name: the acceptance's purity vocabulary. */
const PURITY_CLAIM =
  /paint(?:[\s/_-]*frame)?[\s_-]*callbacks?|frame[\s_-]*callbacks?|component[\s_-]*invocations?|mounted[\s_-]*fixture[\s_-]*trees?|incidental[\s_-]*render[\s_-]*effects?/i;
/** What a registered title claiming (c) would have to name: the acceptance's atomicity vocabulary. */
const ATOMICITY_CLAIM = /evaluation[\s_-]*generations?|staged[\s_-]*(?:commit|mutation)s?|pre-?evaluation|accepted[\s_-]*evaluation|mid-?evaluation/i;
/** Each armed vocabulary's alternatives as their words, singular and in match order (wb-ril9 F1): one separator position sits
 * between each two words, and SEPARATORS names what each position reads. */
const PURITY_WORDS: readonly (readonly string[])[] = [
  ["paint", "callback"],
  ["frame", "callback"],
  ["component", "invocation"],
  ["mounted", "fixture", "tree"],
  ["incidental", "render", "effect"],
];
const ATOMICITY_WORDS: readonly (readonly string[])[] = [
  ["evaluation", "generation"],
  ["staged", "commit"],
  ["staged", "mutation"],
  ["accepted", "evaluation"],
];
/** The separator members a position reads: a space, a hyphen, an underscore, none, and a run of all three. */
const SEPARATORS: Readonly<Record<string, string>> = { space: " ", hyphen: "-", underscore: "_", none: "", run: " -_ " };
/** The atomicity vocabulary's two prefixes whose hyphen is optional, and the two members their position reads. */
const HYPHEN_OPTIONAL: readonly (readonly string[])[] = [
  ["pre", "evaluation"],
  ["mid", "evaluation"],
];
const OPTIONAL_HYPHEN: Readonly<Record<string, string>> = { hyphen: "-", none: "" };
/** The registration roots a title is read from, through any modifier chain (concurrent, each, for, fails, sequential...). */
const REGISTRARS: readonly string[] = ["it", "test", "describe", "suite", "bench"];
/** vitest's module verbs: each names a module by its first argument. */
const VI_VERBS: readonly string[] = ["mock", "doMock", "unmock", "doUnmock", "importActual", "importMock"];
/** The constructors that take a module or script specifier first. */
const CONSTRUCTED_LOADERS: readonly string[] = ["URL", "Worker", "SharedWorker"];
/** The JSX import-source pragma tag, composed so this file's text never carries it whole (the landed rf TSX census reads it raw). */
const PRAGMA = ["@jsx", "ImportSource"].join("");
const PRAGMA_PATTERN = new RegExp(`${PRAGMA}\\s+([^\\s*]+)`, "g");
const MODULE_EXTENSIONS: readonly string[] = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
const JS_EXTENSIONS: readonly string[] = [".js", ".mjs", ".cjs", ".jsx"];
const MANIFEST = /(?:^|\/)(?:package(?:-lock)?\.json|npm-shrinkwrap\.json|deno\.jsonc?|import[-_]map\.json|[tj]sconfig[^/]*\.json)$/i;
const SKIPPED_ROOTS: readonly string[] = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge"];
/** No exemption: this census judges its own file and roster like any other file (header, NO EXEMPTION). */
const EXEMPT: readonly string[] = [];
/** Each floor sits below the count measured at base febca35 (824 walked files; src 115, test 442, qa 62 modules; 73 JS-family
 * modules; 4 manifests; 9297 registration titles read by this reader). */
const FLOORS = { files: 750, modules: { src: 100, test: 400, qa: 55 }, jsModules: 60, manifests: 4, titles: 8000 };
/** Files the walk must reach, each with a token its bytes carry: a root page, a src module, a qa script, an example and a binary. */
const WALK_ANCHORS: readonly (readonly [string, string])[] = [
  ["README.md", "pi-subagents"],
  ["src/workbench/providers/reactivefiber.ts", "RF render refused"],
  ["qa/workbench/receipts-index.mjs", "docs/workbench/receipts"],
  ["examples/workflows/compose.js", "export"],
  ["media/screenshot.png", "PNG"],
];
type NameKind = "identifier" | "heritage" | "imported" | "member" | "jsdoc";
/** One live name per read position, each where the tree carries it today. */
const NAME_ANCHORS: readonly (readonly [string, NameKind, string])[] = [
  ["src/workbench/providers/reactivefiber.ts", "imported", "spawn"],
  ["src/ui/conversation-viewer.ts", "heritage", "Component"],
  ["src/agent-runner.ts", "member", "modelRegistry"],
  ["qa/workbench/cap-saturation.mjs", "jsdoc", "CapProjection"],
];
/** One live load per kind: a static import, a dynamic import and a vitest importActual. */
const LOAD_ANCHORS: readonly (readonly [string, string])[] = [
  ["src/workbench/providers/reactivefiber.ts", "node:child_process"],
  ["src/index.ts", "./ui/conversation-viewer.js"],
  ["test/agent-mention-wiring.test.ts", "../src/agent-runner.js"],
];
/** A live registration title: the rf-tsx tier's success row. */
const TITLE_ANCHOR: readonly [string, string] = [
  "test/workbench-native-rf-tsx-preview.test.ts",
  "success row: an ephemeral TSX-era preview with a worker spawn and engine identity",
];
const RESIDUAL_FAMILIES: readonly string[] = [
  "R-NEEDLE",
  "R-COMMENT",
  "R-AFFIXED",
  "R-CASED",
  "R-LOOKALIKE",
  "R-COMPOSED",
  "R-REFLECTIVE",
  "R-ALIASED-LOADER",
  "R-ROOT",
  "R-HOST-PACKAGE",
  "R-NONMODULE",
  "R-OUTSIDE",
  "R-OWN-HOST",
  "R-COMPUTED-TITLE",
];
/** Each residual's pinned quiet rows: `<pin>:<control>` or `<pin>:plant:<path>`, each read as false in the roster witness. */
const QUIET: Readonly<Record<string, readonly string[]>> = {
  "R-NEEDLE": ["A1:needle", "A1:regexNeedle", "A1:literalType", "A1:callArgument", "A2:specifierNeedle", "A2:matcherArgument", "A2:bundlerAlias"],
  "R-COMMENT": ["A1:lineComment", "A1:jsdocInTs", "A2:commentMention", "A2:jsdocImportTypeInTs"],
  "R-AFFIXED": ["A1:affixed"],
  "R-CASED": ["A1:cased"],
  "R-LOOKALIKE": ["A1:lookalike", "A1:joiner"],
  "R-COMPOSED": ["A1:composedVariable", "A1:composedJoin", "A2:composedSpecifier"],
  "R-REFLECTIVE": ["A1:reflective"],
  "R-ALIASED-LOADER": ["A2:aliasedLoader", "A2:destructuredLoader", "A2:parameterLoader"],
  "R-ROOT": ["A2:rootEntry", "A2:otherSubpath", "A2:manifestRoot", "A2:plant:app/import_map.json"],
  "R-HOST-PACKAGE": ["A2:hostPackage"],
  "R-NONMODULE": ["A1:plant:docs/host.md", "A1:plant:fixtures/host.json", "A2:plant:docs/host.md", "A2:plant:bin/run-host"],
  "R-OUTSIDE": [
    "A1:plant:node_modules/pkg/host.ts",
    "A1:plant:dist/host.ts",
    "A1:plant:build/host.ts",
    "A1:plant:coverage/host.ts",
    "A1:plant:.forge/host.ts",
    "A1:plant:.beads/host.ts",
    "A2:plant:node_modules/pkg/index.js",
    "A2:plant:dist/host.mjs",
  ],
  "R-OWN-HOST": ["B1:ownFrame", "B1:ownPaint", "B1:ownWidget", "B2:ownAtomicWrite", "B2:ownGeneration"],
  "R-COMPUTED-TITLE": ["B1:computedTitle", "B1:aliasedRegistrar", "B1:subtestRegistrar"],
};
const CYRILLIC_IE = String.fromCodePoint(0x0435);
const ZERO_WIDTH_JOINER = String.fromCodePoint(0x200d);
/** Modifier and verb words composed at runtime, so this file's text carries no focus, skip or mock marker. */
const SKIP_WORD = ["sk", "ip"].join("");
const VI_MOCK = ["vi", "mock"].join(".");
/** The Gating sentence's lead-in before the bead row's absence facts. */
const SHIPPED_NO = "Shipped: no - ";
/** The controls that read false and name no residual (wb-ab0i F1): the near misses each reader must leave alone, and the
 * gate's closed readings (the measured facts, and a site added under docs/). Every other planted control and plant reads true. */
const NEGATIVE_CONTROLS: readonly string[] = [
  "A1:nearMiss",
  "A2:otherPackage",
  "B1:measured",
  "B1:docsSiteAdded",
  "B1:armedMeasured",
  "B2:measured",
  "B2:docsSiteAdded",
  "B2:armedMeasured",
];
/** The titles B1's registrar snippet registers, in order: one per t-line, none for an n-line. */
const REGISTRAR_TITLES: readonly string[] = ["t1", "t2", "t3", "t4 %s", "t5", "t6", "t7", "t8", "t9", "t10", "t11", "t12", "t13", "t14", "t15"];
/** Each pin's planted controls and plants by polarity, `<reading true>/<reading false>` (B1's registrar titles aside). */
const POLARITY_COUNTS: Readonly<Record<string, string>> = { A1: "46/22", A2: "59/19", B1: "63/9", B2: "54/5" };

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
      "(trigger, absent today) If Pi ever implements or embeds a TSX InterfaceHost/InterfaceEvaluation: (a) absence pin: no Pi module implements or imports InterfaceHost or InterfaceEvaluation at the pinned version - no walked module names either type where the TypeScript compiler reads a name, and none loads a host or ui entry of the TSX SDK",
    pins: ["A1", "A2"],
  },
  {
    id: "B",
    label:
      "(b) armed, purity: N paint/frame callbacks over a mounted fixture tree produce zero component invocations and zero provider/model calls (wb-021.5/wb-km7q.7 falsifier); (c) armed, atomicity: abort/suspend/fail injected mid-evaluation yields zero host effects and a byte-identical pre-evaluation state snapshot; a fault between two staged mutations of generation g+1 leaves g intact: both gated on TSX-IF-04 - the measured producer has neither type outside docs and no host or ui entry, and no Pi test title claims either leg",
    pins: ["B1", "B2"],
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
interface PinFacts {
  readonly repo: string;
  readonly sha: string;
  readonly version: string;
  readonly exports: readonly string[];
  readonly files: readonly string[];
  readonly srcPythonFiles: readonly string[];
  readonly sites: { readonly [symbol: string]: readonly string[] };
}
interface MappedFacts {
  readonly rfVersion: string;
  readonly importMap: { readonly [key: string]: string };
  readonly distribution: { readonly name: string; readonly version: string; readonly source: string };
  readonly exports: readonly string[];
  readonly srcPythonFiles: readonly string[];
  readonly sites: { readonly [symbol: string]: readonly string[] };
}
interface Producer {
  readonly programPin: PinFacts;
  readonly mapped: MappedFacts;
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly merged: { readonly quote: string; readonly citation: string };
  readonly family: readonly string[];
  readonly sdk: string;
  readonly scan: JsonObject;
  readonly residuals: readonly string[];
  readonly quiet: { readonly [family: string]: readonly string[] };
  readonly producer: Producer;
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
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function objectOf(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return value;
}
function stringMap(value: unknown, field: string): { [key: string]: string } {
  return Object.fromEntries(Object.entries(objectOf(value, field)).map(([key, entry]) => [key, text(entry, `${field}.${key}`)]));
}
function listMap(value: unknown, field: string): { [key: string]: string[] } {
  return Object.fromEntries(Object.entries(objectOf(value, field)).map(([key, entry]) => [key, strings(entry, `${field}.${key}`)]));
}
function pinFactsOf(value: unknown): PinFacts {
  const facts = objectOf(value, "producer.programPin");
  return {
    repo: text(facts.repo, "producer.programPin.repo"),
    sha: text(facts.sha, "producer.programPin.sha"),
    version: text(facts.version, "producer.programPin.version"),
    exports: strings(facts.exports, "producer.programPin.exports"),
    files: strings(facts.files, "producer.programPin.files"),
    srcPythonFiles: strings(facts.srcPythonFiles, "producer.programPin.srcPythonFiles"),
    sites: listMap(facts.sites, "producer.programPin.sites"),
  };
}
function mappedFactsOf(value: unknown): MappedFacts {
  const facts = objectOf(value, "producer.mapped");
  const distribution = objectOf(facts.distribution, "producer.mapped.distribution");
  return {
    rfVersion: text(facts.rfVersion, "producer.mapped.rfVersion"),
    importMap: stringMap(facts.importMap, "producer.mapped.importMap"),
    distribution: {
      name: text(distribution.name, "producer.mapped.distribution.name"),
      version: text(distribution.version, "producer.mapped.distribution.version"),
      source: text(distribution.source, "producer.mapped.distribution.source"),
    },
    exports: strings(facts.exports, "producer.mapped.exports"),
    srcPythonFiles: strings(facts.srcPythonFiles, "producer.mapped.srcPythonFiles"),
    sites: listMap(facts.sites, "producer.mapped.sites"),
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw = objectOf(JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")), "root");
  if (!Array.isArray(raw.rows)) throw new Error("roster rows must be a list");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const scan = json(objectOf(raw.scan, "scan"));
  const merged = objectOf(raw.merged, "merged");
  const producer = objectOf(raw.producer, "producer");
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    merged: { quote: text(merged.quote, "merged.quote"), citation: text(merged.citation, "merged.citation") },
    family: strings(raw.family, "family"),
    sdk: text(raw.sdk, "sdk"),
    scan: isObject(scan) ? (scan as JsonObject) : {},
    residuals: strings(raw.residuals, "residuals"),
    quiet: listMap(raw.quiet, "quiet"),
    producer: { programPin: pinFactsOf(producer.programPin), mapped: mappedFactsOf(producer.mapped) },
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

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
let beadRow: BeadRow | undefined;
/** The owner filing's row in the tracked bead export, found by id on a line that parses; read once. */
function readBeadRow(): BeadRow {
  if (beadRow !== undefined) return beadRow;
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") {
      beadRow = { title: row.title, notes: row.notes };
      return beadRow;
    }
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
}
/** The first line of the filing's notes that starts with `prefix`. */
function noteLine(notes: string, prefix: string): string {
  const line = notes.split("\n").find(entry => entry.startsWith(prefix));
  if (line === undefined) throw new Error(`${BEAD} notes carry no ${prefix.trim()} line`);
  return line;
}
/** The filing's acceptance clauses: its first "Acceptance: " line, split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  return noteLine(notes, "Acceptance: ")
    .slice("Acceptance: ".length)
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}
/** The Gating sentence's absence facts: its text after "Shipped: no - ", split at ", ". */
function gatingFacts(notes: string): string[] {
  const line = noteLine(notes, "Gating: ");
  const at = line.indexOf(SHIPPED_NO);
  if (at < 0) throw new Error(`${BEAD} Gating line states no absence facts`);
  return line
    .slice(at + SHIPPED_NO.length)
    .replace(/\.$/, "")
    .split(", ");
}
/** The pin atoms the bead row yields, in pin order: the Gating sentence's absence facts, then each armed clause's head. */
function pinAtoms(bead: BeadRow): string[] {
  const armed = acceptanceClauses(bead.notes)
    .filter(clause => /^\([a-z]\) armed, /.test(clause))
    .map(clause => clause.slice(0, clause.indexOf(":")));
  return [...gatingFacts(bead.notes), ...armed];
}
/** The atom a pin answers: the bead row's atom at the pin's position in row order. */
function anchorOf(pin: string): string {
  return pinAtoms(readBeadRow())[ROWS.flatMap(row => row.pins).indexOf(pin)] ?? "";
}

const posix = (path: string): string => path.split(sep).join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));
const isJsModule = (path: string): boolean => JS_EXTENSIONS.includes(extensionOf(path));
function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}

/** Replaces each JS escape, HTML numeric reference and percent escape by the character it encodes (an out-of-range one by nothing). */
function decodeEscapes(value: string): string {
  const char = (digits: string, radix: number): string => {
    const code = Number.parseInt(digits, radix);
    return code <= 0x10ffff ? String.fromCodePoint(code) : "";
  };
  return value
    .replace(/\\u\{([0-9a-f]{1,6})\}/gi, (_, hex: string) => char(hex, 16))
    .replace(/\\u([0-9a-f]{4})/gi, (_, hex: string) => char(hex, 16))
    .replace(/\\x([0-9a-f]{2})/gi, (_, hex: string) => char(hex, 16))
    .replace(/&#x([0-9a-f]{1,6});?/gi, (_, hex: string) => char(hex, 16))
    .replace(/&#([0-9]{1,7});?/g, (_, decimal: string) => char(decimal, 10))
    .replace(/%([0-9a-f]{2})/gi, (_, hex: string) => char(hex, 16));
}
/** Does a specifier or a manifest's text name a host or ui entry, raw or decoded? */
const namesEntry = (value: string): boolean => ENTRY_FAMILY.test(value) || ENTRY_FAMILY.test(decodeEscapes(value));

/** A string literal, a wrapped one (parentheses, as, satisfies, !), a `+` concatenation of foldable parts or a template whose every span folds. */
function fold(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node)) return fold(node.expression);
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
/** An expression without its parentheses, as, satisfies, ! and type-assertion wrappers. */
function unwrap(node: ts.Expression): ts.Expression {
  return ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node)
    ? unwrap(node.expression)
    : node;
}
/** Is `node` a loader: require, require.resolve, any object's require member (module.require, globalThis.require),
 * import.meta.resolve, a createRequire(...) result or its resolve, or an identifier this module binds to one of them? */
function isLoader(node: ts.Expression, aliases: ReadonlySet<string>): boolean {
  const expression = unwrap(node);
  if (ts.isIdentifier(expression)) return expression.text === "require" || aliases.has(expression.text);
  if (ts.isCallExpression(expression)) {
    const callee = unwrap(expression.expression);
    return (ts.isIdentifier(callee) && callee.text === "createRequire") || (ts.isPropertyAccessExpression(callee) && callee.name.text === "createRequire");
  }
  if (!ts.isPropertyAccessExpression(expression)) return false;
  const target = unwrap(expression.expression);
  if (expression.name.text === "resolve") return isLoader(target, aliases) || (ts.isMetaProperty(target) && target.keywordToken === ts.SyntaxKind.ImportKeyword);
  return expression.name.text === "require";
}
/** The identifiers a module binds to a loader, by declaration or assignment (read twice, so an alias of an alias is read in any order). */
function loaderAliases(file: ts.SourceFile): Set<string> {
  const aliases = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && isLoader(node.initializer, aliases)) aliases.add(node.name.text);
    else if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isIdentifier(node.left) && isLoader(node.right, aliases)) aliases.add(node.left.text);
    ts.forEachChild(node, visit);
  };
  visit(file);
  visit(file);
  return aliases;
}
/** The root identifier of a registration callee, through property accesses, calls, element accesses and tagged templates. */
function registrarOf(node: ts.Expression): string | undefined {
  const expression = unwrap(node);
  if (ts.isIdentifier(expression)) return expression.text;
  if (ts.isPropertyAccessExpression(expression) || ts.isCallExpression(expression) || ts.isElementAccessExpression(expression)) return registrarOf(expression.expression);
  if (ts.isTaggedTemplateExpression(expression)) return registrarOf(expression.tag);
  return undefined;
}
/** A property, method, accessor or enum member's quoted name. */
function quotedName(node: ts.Node): ts.StringLiteral | undefined {
  if (
    ts.isPropertyAssignment(node) ||
    ts.isPropertySignature(node) ||
    ts.isPropertyDeclaration(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isMethodSignature(node) ||
    ts.isGetAccessorDeclaration(node) ||
    ts.isSetAccessorDeclaration(node) ||
    ts.isEnumMember(node)
  ) {
    return ts.isStringLiteral(node.name) ? node.name : undefined;
  }
  return undefined;
}
/** Is `node` a string literal type passed as a type argument (Pick's key, Omit's, Extract's)? */
function typeArgumentKey(node: ts.Node): ts.StringLiteral | undefined {
  if (!ts.isLiteralTypeNode(node) || !ts.isStringLiteral(node.literal)) return undefined;
  const parent = node.parent;
  return (ts.isTypeReferenceNode(parent) || ts.isExpressionWithTypeArguments(parent)) && parent.typeArguments?.includes(node) === true ? node.literal : undefined;
}
/** Does an identifier bind or name an import or export (a specifier, a default or namespace import, an import-equals name)? */
function isImportBinding(node: ts.Identifier): boolean {
  const parent = node.parent;
  return ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent) || ts.isNamespaceExport(parent) || (ts.isImportEqualsDeclaration(parent) && parent.name === node);
}

interface ModuleReading {
  /** The sites that name either host-boundary type where the compiler reads a name (A1). */
  readonly references: string[];
  /** Every name read, by position, for the live anchors. */
  readonly names: Readonly<Record<NameKind, ReadonlySet<string>>>;
  /** Every load specifier read, for the live anchors. */
  readonly loads: ReadonlySet<string>;
  /** The loads that name a host or ui entry (A2). */
  readonly hostLoads: string[];
  /** The registration titles read (B1, B2). */
  readonly titles: string[];
}
/** One module, parsed under its own script kind: its name sites (A1), its loads (A2) and its registration titles (B1, B2). */
function readModule(path: string, source: string): ModuleReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const aliases = loaderAliases(file);
  const js = isJsModule(path);
  const references = new Set<string>();
  const hostLoads = new Set<string>();
  const loads = new Set<string>();
  const titles: string[] = [];
  const names: Record<NameKind, Set<string>> = { identifier: new Set(), heritage: new Set(), imported: new Set(), member: new Set(), jsdoc: new Set() };
  const docs = new Set<ts.JSDoc>();
  const lineAt = (position: number): number => file.getLineAndCharacterOfPosition(position).line + 1;
  const name = (node: ts.Node, kind: NameKind, value: string): void => {
    names[kind].add(value);
    if (FAMILY.includes(value)) references.add(`${path}:${lineAt(node.getStart(file))} ${kind}: ${value}`);
  };
  const member = (node: ts.Node, kind: NameKind): void => {
    const value = fold(node);
    if (value !== undefined) name(node, kind, value);
  };
  const addLoad = (value: string, kind: string, position: number): void => {
    loads.add(value);
    if (namesEntry(value)) hostLoads.add(`${path}:${lineAt(position)} ${kind}: ${value}`);
  };
  const load = (node: ts.Node | undefined, kind: string): void => {
    const value = node === undefined ? undefined : fold(node);
    if (node !== undefined && value !== undefined) addLoad(value, kind, node.getStart(file));
  };
  const loadFirst = (node: ts.Node | undefined, kind: string): void => {
    if (node !== undefined && ts.isArrayLiteralExpression(node)) load(node.elements[0], kind);
  };
  const call = (node: ts.CallExpression): void => {
    const callee = unwrap(node.expression);
    if (node.expression.kind === ts.SyntaxKind.ImportKeyword) load(node.arguments[0], "dynamic import");
    else if (isLoader(callee, aliases)) load(node.arguments[0], "loader");
    else if (ts.isPropertyAccessExpression(callee) && callee.name.text === "call" && isLoader(callee.expression, aliases)) load(node.arguments[1], "loader call");
    else if (ts.isPropertyAccessExpression(callee) && callee.name.text === "apply" && isLoader(callee.expression, aliases)) loadFirst(node.arguments[1], "loader apply");
    else if (ts.isPropertyAccessExpression(callee) && callee.name.text === "apply" && ts.isIdentifier(callee.expression) && callee.expression.text === "Reflect" && node.arguments[0] !== undefined && isLoader(node.arguments[0], aliases)) {
      loadFirst(node.arguments[2], "Reflect.apply");
    } else if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) && callee.expression.text === "vi" && VI_VERBS.includes(callee.name.text)) {
      load(node.arguments[0], `vitest ${callee.name.text}`);
    }
    const registrar = registrarOf(node.expression);
    const first = node.arguments[0];
    if (registrar !== undefined && REGISTRARS.includes(registrar) && first !== undefined) {
      const title = fold(first);
      if (title !== undefined) titles.push(title);
    }
  };
  const visit = (node: ts.Node, heritage: boolean): void => {
    if (ts.isIdentifier(node)) name(node, heritage ? "heritage" : isImportBinding(node) ? "imported" : "identifier", node.text);
    else if (ts.isElementAccessExpression(node)) member(node.argumentExpression, "member");
    else if (ts.isComputedPropertyName(node)) member(node.expression, "member");
    else if (ts.isIndexedAccessTypeNode(node) && ts.isLiteralTypeNode(node.indexType)) member(node.indexType.literal, "member");
    else if (ts.isBindingElement(node) && node.propertyName !== undefined && ts.isStringLiteral(node.propertyName)) member(node.propertyName, "member");
    else if (typeArgumentKey(node) !== undefined) member(typeArgumentKey(node) ?? node, "member");
    else if (ts.isImportSpecifier(node) || ts.isExportSpecifier(node)) {
      for (const part of [node.propertyName, node.name]) if (part !== undefined && ts.isStringLiteral(part)) name(part, "imported", part.text);
    }
    const quoted = quotedName(node);
    if (quoted !== undefined) member(quoted, "member");
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) load(node.moduleSpecifier, "import");
    else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) load(node.moduleReference.expression, "import-equals");
    else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) load(node.argument.literal, "import type");
    else if (ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name)) load(node.name, "ambient module");
    else if (ts.isCallExpression(node)) call(node);
    else if (ts.isNewExpression(node)) {
      const callee = unwrap(node.expression);
      if (ts.isIdentifier(callee) && CONSTRUCTED_LOADERS.includes(callee.text)) load(node.arguments?.[0], `new ${callee.text}`);
    }
    if (js) for (const doc of ts.getJSDocCommentsAndTags(node)) if (ts.isJSDoc(doc)) docs.add(doc);
    const inHeritage = heritage || ts.isHeritageClause(node);
    ts.forEachChild(node, child => visit(child, inHeritage));
  };
  visit(file, false);
  // A JS-family module's JSDoc: the program reads its types (TypeScript reads none from a TS module's comments, R-COMMENT).
  const visitDoc = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) name(node, "jsdoc", node.text);
    else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) load(node.argument.literal, "JSDoc import type");
    else if (ts.isIndexedAccessTypeNode(node) && ts.isLiteralTypeNode(node.indexType)) member(node.indexType.literal, "jsdoc");
    else if (typeArgumentKey(node) !== undefined) member(typeArgumentKey(node) ?? node, "jsdoc");
    ts.forEachChild(node, visitDoc);
  };
  for (const doc of docs) visitDoc(doc);
  for (const reference of [...file.typeReferenceDirectives, ...file.referencedFiles]) addLoad(reference.fileName, "reference directive", reference.pos);
  for (const match of source.matchAll(PRAGMA_PATTERN)) addLoad(match[1] ?? "", "pragma", match.index ?? 0);
  return { references: [...references], names, loads, hostLoads: [...hostLoads], titles };
}

interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every regular file below `root`, in name order, root-relative with "/" separators; SKIPPED_ROOTS are skipped at the root only. */
function walkTree(root: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string, depth: number): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
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
/** The walk's cross-check (wb-ril9 F3): node's own recursive readdir below `root`, independent of walkTree's code, as
 * root-relative `file:` and `symlink:` entries. SKIPPED_ROOTS are dropped at the root; readdir follows a symlinked directory,
 * so nothing below a symlink is kept; a root directory gone before its listing holds nothing. */
function listingOf(root: string): Set<string> {
  const held = new Set<string>();
  for (const top of readdirSync(root, { withFileTypes: true })) {
    if (SKIPPED_ROOTS.includes(top.name)) continue;
    let entries: Dirent[] = [top];
    if (top.isDirectory()) {
      try {
        entries = [top, ...readdirSync(join(root, top.name), { recursive: true, withFileTypes: true })];
      } catch (error) {
        if (error instanceof Error && "code" in error && error.code === "ENOENT") continue;
        throw error;
      }
    }
    const pathOf = (entry: Dirent): string => posix(relative(root, join(entry.parentPath, entry.name)));
    const links = entries.filter(entry => entry.isSymbolicLink()).map(pathOf);
    for (const entry of entries) {
      const path = pathOf(entry);
      if (links.some(link => path.startsWith(`${link}/`))) continue;
      if (entry.isSymbolicLink()) held.add(`symlink:${path}`);
      else if (entry.isFile()) held.add(`file:${path}`);
    }
  }
  return held;
}

interface TreeReading {
  readonly walk: Walk;
  /** What both listings, taken just before and just after the walk, hold and the walk did not list (wb-ril9 F3). */
  readonly unlisted: string[];
  /** What the walk listed and neither listing holds. */
  readonly unheld: string[];
  readonly judged: string[];
  readonly modules: Map<string, ModuleReading>;
  readonly manifests: string[];
  readonly manifestHits: string[];
  readonly anchorsWalked: boolean;
}
/** The walk of `root` and every reader over it: each module, each manifest and each walk anchor is read (EXEMPT is empty). */
function readTree(root: string): TreeReading {
  const before = listingOf(root);
  const walk = walkTree(root);
  const after = listingOf(root);
  const walked = new Set([...walk.files.map(file => `file:${file}`), ...walk.symlinks.map(link => `symlink:${link}`)]);
  const unlisted = [...before].filter(entry => after.has(entry) && !walked.has(entry)).sort();
  const unheld = [...walked].filter(entry => !before.has(entry) && !after.has(entry)).sort();
  const judged = walk.files.filter(file => !EXEMPT.includes(file));
  const modules = new Map<string, ModuleReading>();
  const manifests: string[] = [];
  const manifestHits: string[] = [];
  const anchors = new Map<string, boolean>();
  for (const file of judged) {
    const anchor = WALK_ANCHORS.find(([path]) => path === file);
    const manifest = MANIFEST.test(file);
    if (!isModule(file) && !manifest && anchor === undefined) continue;
    let buffer: Buffer;
    try {
      buffer = readFileSync(join(root, file));
    } catch (error) {
      // A file gone between the listing and the read holds nothing; any other read failure is a finding.
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) walk.unreadable.push(file);
      continue;
    }
    const utf8 = buffer.toString("utf8");
    if (isModule(file)) modules.set(file, readModule(file, utf8));
    if (manifest) {
      manifests.push(file);
      if (namesEntry(utf8)) manifestHits.push(file);
    }
    if (anchor !== undefined) anchors.set(file, buffer.includes(anchor[1]));
  }
  const anchorsWalked = WALK_ANCHORS.every(([path]) => anchors.get(path) === true);
  return { walk, unlisted, unheld, judged, modules, manifests, manifestHits, anchorsWalked };
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once. */
function liveTree(): TreeReading {
  live ??= readTree(REPO);
  return live;
}
const modulesBelow = (tree: TreeReading, root: string): number => [...tree.modules.keys()].filter(file => file.startsWith(`${root}/`)).length;

/** Plants `files` in a fresh scratch root (a null content is a symlink to the root's first file) and reads that tree. */
function plantedTree(files: Readonly<Record<string, string | null>>): TreeReading {
  const root = makeScratch("tsx-paint-commit-");
  try {
    for (const [path, content] of Object.entries(files)) {
      const target = join(root, path);
      mkdirSync(dirname(target), { recursive: true });
      if (content === null) symlinkSync(join(root, Object.keys(files)[0] ?? ""), target);
      else writeFileSync(target, content);
    }
    return readTree(root);
  } finally {
    removeScratch(root);
  }
}

interface GateFacts {
  readonly pinSites: readonly string[];
  readonly mappedSites: readonly string[];
  readonly files: readonly string[];
  readonly exports: readonly string[];
  readonly importMap: { readonly [key: string]: string };
  readonly srcPython: readonly string[];
}
/** One type's measured facts: its sites at the program pin and at the mapped version, and the package's shape at both. */
function factsOf(producer: Producer, symbol: string): GateFacts {
  return {
    pinSites: producer.programPin.sites[symbol] ?? [],
    mappedSites: producer.mapped.sites[symbol] ?? [],
    files: producer.programPin.files,
    exports: [...producer.programPin.exports, ...producer.mapped.exports],
    importMap: producer.mapped.importMap,
    srcPython: [...producer.programPin.srcPythonFiles, ...producer.mapped.srcPythonFiles],
  };
}
interface Gate {
  readonly open: boolean;
  readonly docsOnly: boolean;
  readonly sitesInPackage: string[];
  readonly entryExported: boolean;
  readonly entryMapped: boolean;
}
/** A type's gate is open when the producer carries it anywhere but docs/, publishes a file that carries it, exports or maps a
 * host or ui entry, finds a src/ or python/ file in the name grep, or carries it at the mapped version. */
function gateOf(facts: GateFacts): Gate {
  const docsOnly = facts.pinSites.length > 0 && facts.pinSites.every(site => site.startsWith("docs/"));
  const sitesInPackage = facts.pinSites.filter(site => facts.files.some(entry => site.startsWith(`${entry}/`) || site.startsWith(`${entry}:`)));
  const entryExported = facts.exports.some(key => ENTRY_KEYS.includes(key));
  const entryMapped = Object.entries(facts.importMap).some(([key, value]) => namesEntry(key) || namesEntry(value));
  const open = facts.pinSites.some(site => !site.startsWith("docs/")) || sitesInPackage.length > 0 || entryExported || entryMapped || facts.srcPython.length > 0 || facts.mappedSites.length > 0;
  return { open, docsOnly, sitesInPackage, entryExported, entryMapped };
}
/** The gate's controls: the measured facts read closed, and each opening change, on its own, reads open. */
function gateControls(symbol: string): JsonObject {
  const base = factsOf(ROSTER.producer, symbol);
  const opens = (change: Partial<GateFacts>): boolean => gateOf({ ...base, ...change }).open;
  return {
    measured: opens({}),
    docsSiteAdded: opens({ pinSites: [...base.pinSites, "docs/programs/host-notes.md:3"] }),
    srcSite: opens({ pinSites: [...base.pinSites, "src/host/interface-host.ts:12"] }),
    publishedSite: opens({ pinSites: [...base.pinSites, "dist/index.d.ts:40"] }),
    hostExport: opens({ exports: [...base.exports, "./host"] }),
    uiExport: opens({ exports: [...base.exports, "./ui"] }),
    mappedEntry: opens({ importMap: { ...base.importMap, [HOST_ENTRY]: `npm:${SDK}@0.1.669/host` } }),
    srcPythonFile: opens({ srcPython: ["python/reactive_fiber/host.py"] }),
    mappedSite: opens({ mappedSites: ["dist/host.js:1"] }),
    publishedDocsSite: opens({ pinSites: [...base.pinSites, "docs/published.md:3"], files: [...base.files, "docs/published.md"] }),
    mappedKey: opens({ importMap: { ...base.importMap, [HOST_ENTRY]: "./vendor/host.js" } }),
    mappedValue: opens({ importMap: { ...base.importMap, "#ui": `npm:${SDK}@0.1.669/ui` } }),
    // wb-ril9 F2: the published-file clause's directory side (a docs/ site below a published directory), and the docs/
    // prefix read whole (a site under docsite/ is no docs site).
    publishedDirSite: opens({ pinSites: [...base.pinSites, "docs/api/host.md:3"], files: [...base.files, "docs/api"] }),
    docsLikeSite: opens({ pinSites: [...base.pinSites, "docsite/host.md:3"] }),
  };
}
/** One armed leg's reading: the type's gate from the producer facts, the bead row's Gating sentence and the tree's claims. */
interface ArmedWitness {
  readonly anchor: string;
  readonly symbol: string;
  readonly gateOpen: boolean;
  readonly docsOnly: boolean;
  readonly pinSites: string[];
  readonly sitesInPackage: string[];
  readonly entryExported: boolean;
  readonly entryMapped: boolean;
  readonly srcPython: string[];
  readonly mappedSites: string[];
  readonly mappedVersion: boolean;
  readonly beadSaysAbsent: boolean;
  readonly titlesFloorMet: boolean;
  readonly titleAnchorRead: boolean;
  readonly claims: string[];
}
/** Pins B1 and B2 share this reading over `producer` (the roster's measured facts, or a control's planted ones) and `tree` (the
 * walked tree, or a control's planted one): the type's gate from the producer facts, the bead row's Gating sentence, and the
 * tree's registration titles against the leg's vocabulary. It asserts nothing; armedLive asserts the live reading. */
function armedReading(pin: string, symbol: string, vocabulary: RegExp, producer: Producer, tree: TreeReading): { readonly titlesRead: number; readonly witness: ArmedWitness } {
  const facts = factsOf(producer, symbol);
  const gate = gateOf(facts);
  const gating = noteLine(readBeadRow().notes, "Gating: ");
  const beadSaysAbsent = gating.includes(symbol) && gating.includes(GATE_STEP) && gating.includes(SHIPPED_NO);
  const titles = [...tree.modules].flatMap(([path, reading]) => reading.titles.map(title => ({ path, title })));
  const claims = titles.filter(({ title }) => vocabulary.test(title)).map(({ path, title }) => `${path}: ${title}`);
  const titlesFloorMet = titles.length >= FLOORS.titles;
  const titleAnchorRead = tree.modules.get(TITLE_ANCHOR[0])?.titles.includes(TITLE_ANCHOR[1]) === true;
  const mapped = producer.mapped;
  const mappedVersion = mapped.importMap[SDK] === `npm:${SDK}@${mapped.distribution.version}`;
  return {
    titlesRead: titles.length,
    witness: {
      anchor: anchorOf(pin),
      symbol,
      gateOpen: gate.open,
      docsOnly: gate.docsOnly,
      pinSites: [...facts.pinSites],
      sitesInPackage: gate.sitesInPackage,
      entryExported: gate.entryExported,
      entryMapped: gate.entryMapped,
      srcPython: [...facts.srcPython],
      mappedSites: [...facts.mappedSites],
      mappedVersion,
      beadSaysAbsent,
      titlesFloorMet,
      titleAnchorRead,
      claims,
    },
  };
}
/** The armed leg's live reading - the roster's measured facts over the walked tree - asserted closed and unclaimed. */
function armedLive(pin: string, symbol: string, vocabulary: RegExp): ArmedWitness {
  const { titlesRead, witness } = armedReading(pin, symbol, vocabulary, ROSTER.producer, liveTree());
  const { beadSaysAbsent, titlesFloorMet, titleAnchorRead, gateOpen, claims } = witness;
  expect(beadSaysAbsent, `the bead row ${BEAD} names ${symbol} in its Gating sentence with ${GATE_STEP} and the absence facts`).toBe(true);
  expect({ titlesFloorMet, titleAnchorRead }, `registration titles read: ${titlesRead}`).toStrictEqual({ titlesFloorMet: true, titleAnchorRead: true });
  expect(gateOpen, `${symbol}'s gate is open: ${pin}'s armed leg is owed with this re-measure (${BEAD})`).toBe(false);
  expect(claims, `registered titles naming ${pin}'s armed vocabulary while its gate is closed`).toEqual([]);
  return witness;
}
/** The armed reading's own controls (wb-ril9 F4): each producer fact the gate reads, planted alone on a copy of the measured
 * facts and read through armedReading itself (factsOf, then gateOf), and one module titled with the leg's vocabulary planted
 * for its claims; the measured facts read closed. */
function armedControls(pin: string, symbol: string, vocabulary: RegExp, title: string): JsonObject {
  const measured = ROSTER.producer;
  const tree = liveTree();
  const opens = (programPin: Partial<PinFacts>, mapped: Partial<MappedFacts>): boolean =>
    armedReading(pin, symbol, vocabulary, { programPin: { ...measured.programPin, ...programPin }, mapped: { ...measured.mapped, ...mapped } }, tree).witness.gateOpen;
  const pinSites = measured.programPin.sites[symbol] ?? [];
  const titled = plantedTree({ "test/armed.test.ts": `it(${JSON.stringify(title)}, () => {});\n` });
  return {
    armedMeasured: opens({}, {}),
    armedPinSite: opens({ sites: { ...measured.programPin.sites, [symbol]: [...pinSites, "src/host/interface.ts:3"] } }, {}),
    armedPinPublished: opens({ files: [...measured.programPin.files, "docs/programs"] }, {}),
    armedPinExport: opens({ exports: [...measured.programPin.exports, "./host"] }, {}),
    armedPinSrcPython: opens({ srcPythonFiles: ["src/host/interface.ts"] }, {}),
    armedMappedExport: opens({}, { exports: [...measured.mapped.exports, "./ui"] }),
    armedMappedSrcPython: opens({}, { srcPythonFiles: ["python/reactive_fiber/host.py"] }),
    armedMappedEntry: opens({}, { importMap: { ...measured.mapped.importMap, [HOST_ENTRY]: `npm:${SDK}@${measured.mapped.distribution.version}/host` } }),
    armedMappedSite: opens({}, { sites: { ...measured.mapped.sites, [symbol]: ["dist/host.js:1"] } }),
    armedClaim: armedReading(pin, symbol, vocabulary, measured, titled).witness.claims.length > 0,
  };
}
/** A vocabulary's separator controls (wb-ril9 F1): for each alternative's words and each position between two of them, each
 * member at that position (a space at every other position), read by the vocabulary; keyed `<words>@<position>:<member>`. */
function separatorControls(vocabulary: RegExp, alternatives: readonly (readonly string[])[], members: Readonly<Record<string, string>>): JsonObject {
  const controls: JsonObject = {};
  for (const words of alternatives) {
    for (let at = 1; at < words.length; at += 1) {
      for (const [member, separator] of Object.entries(members)) {
        const text = words.map((word, index) => (index === 0 ? "" : index === at ? separator : " ") + word).join("");
        controls[`${words.join("-")}@${at}:${member}`] = vocabulary.test(text);
      }
    }
  }
  return controls;
}

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(pin);
  return { pin, ...witness };
}
/** A1's judge over one snippet read as `path`: does it name either type where the compiler reads a name? */
const named = (path: string, source: string): boolean => readModule(path, source).references.length > 0;
/** A2's judge over one snippet read as `path`: does it load a host or ui entry? */
const loadsEntry = (path: string, source: string): boolean => readModule(path, source).hostLoads.length > 0;

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const tree = liveTree();
    const references = [...tree.modules.values()].flatMap(reading => reading.references);
    const filesFloorMet = tree.walk.files.length >= FLOORS.files;
    const modulesFloorMet = modulesBelow(tree, "src") >= FLOORS.modules.src && modulesBelow(tree, "test") >= FLOORS.modules.test && modulesBelow(tree, "qa") >= FLOORS.modules.qa;
    const jsModulesFloorMet = [...tree.modules.keys()].filter(isJsModule).length >= FLOORS.jsModules;
    const namesRead = NAME_ANCHORS.every(([path, kind, value]) => tree.modules.get(path)?.names[kind].has(value) === true);
    const noExemption = EXEMPT.length === 0 && tree.modules.has(SELF) && tree.judged.includes(ROSTER_FILE);
    const selfText = readFileSync(join(REPO, SELF), "utf8");
    const rosterText = readFileSync(join(REPO, ROSTER_FILE), "utf8");
    const needlesCarried = FAMILY.every(type => selfText.includes(type) && rosterText.includes(type));
    expect(filesFloorMet, `files walked: ${tree.walk.files.length}`).toBe(true);
    expect(tree.anchorsWalked, "every walk anchor was reached with its token").toBe(true);
    expect(modulesFloorMet, `modules: src ${modulesBelow(tree, "src")}, test ${modulesBelow(tree, "test")}, qa ${modulesBelow(tree, "qa")}`).toBe(true);
    expect(jsModulesFloorMet, "JS-family modules read").toBe(true);
    expect(namesRead, "each read position finds its live anchor").toBe(true);
    expect({ noExemption, needlesCarried }, "this file and its roster are judged, and carry the two names as needles").toStrictEqual({ noExemption: true, needlesCarried: true });
    expect({ references, symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, "modules naming either type where the compiler reads a name").toStrictEqual({
      references: [],
      symlinks: [],
      unreadable: [],
    });
    // wb-ril9 F3: every file both independent listings hold around the live walk was walked (a file written or removed during
    // the walk is in at most one of them, so it is not judged here).
    const walkListed = tree.unlisted.length === 0;
    expect(tree.unlisted, "files below the root node's recursive readdir lists that the walk did not").toEqual([]);
    const controls = {
      namedImport: named("c.ts", `import { ${HOST_TYPE} } from "${SDK}";\n`),
      aliasImport: named("c.ts", `import { ${HOST_TYPE} as Host } from "${HOST_ENTRY}";\n`),
      typeOnlyImport: named("c.ts", `import type { ${EVALUATION_TYPE} } from "${SDK}";\n`),
      exportFrom: named("c.ts", `export { ${HOST_TYPE} } from "${SDK}";\n`),
      quotedImportName: named("c.ts", `import { "${HOST_TYPE}" as Host } from "${SDK}";\n`),
      implementsClause: named("c.ts", `class PiHost implements ${HOST_TYPE} {}\n`),
      qualifiedImplements: named("c.ts", `import * as tsx from "${SDK}";\nclass PiHost implements tsx.${HOST_TYPE} {}\n`),
      extendsClause: named("c.ts", `interface PiEvaluation extends ${EVALUATION_TYPE} {}\n`),
      declaredInterface: named("c.ts", `export interface ${HOST_TYPE} { mount(): void }\n`),
      declaredClass: named("c.mts", `export class ${EVALUATION_TYPE} {}\n`),
      typeAlias: named("c.cts", `type ${HOST_TYPE} = { mount(): void };\n`),
      annotation: named("c.ts", `const host: ${HOST_TYPE} = create();\n`),
      satisfiesClause: named("c.ts", `const evaluation = create() satisfies ${EVALUATION_TYPE};\n`),
      asCast: named("c.ts", `const host = create() as ${HOST_TYPE};\n`),
      typeArgument: named("c.ts", `const hosts: Array<${HOST_TYPE}> = [];\n`),
      typeQuery: named("c.ts", `type H = typeof ${HOST_TYPE};\n`),
      importTypeQualifier: named("c.ts", `type H = import("${SDK}").${HOST_TYPE};\n`),
      construction: named("c.js", `const host = new tsx.${HOST_TYPE}();\n`),
      destructuredImport: named("c.mjs", `const { ${EVALUATION_TYPE} } = await import("${SDK}");\n`),
      requireDestructure: named("c.cjs", `const { ${HOST_TYPE}: Host } = require("${SDK}");\n`),
      shorthand: named("c.js", `export default { ${HOST_TYPE} };\n`),
      elementAccess: named("c.ts", `const Host = tsx["${HOST_TYPE}"];\n`),
      foldedElementAccess: named("c.ts", 'const Host = tsx["Interface" + "Host"];\n'),
      templateElementAccess: named("c.ts", `const Host = tsx[\`Interface${"$"}{"Host"}\`];\n`),
      computedBinding: named("c.ts", `const { ["${EVALUATION_TYPE}"]: Evaluation } = tsx;\n`),
      quotedMember: named("c.ts", `const registry = { "${HOST_TYPE}": impl };\n`),
      indexedAccessType: named("c.ts", `type H = (typeof tsx)["${HOST_TYPE}"];\n`),
      typeArgumentKey: named("c.ts", `type H = Pick<typeof tsx, "${HOST_TYPE}">;\n`),
      jsxTag: named("c.tsx", `export const C = () => <${HOST_TYPE} />;\n`),
      escapedIdentifier: named("c.ts", "const Host = tsx.Interface\\u0048ost;\n"),
      jsdocTypeInJs: named("c.mjs", `/** @type {import("${SDK}").${HOST_TYPE}} */\nexport let host;\n`),
      jsdocImplementsInJs: named("c.js", `/** @implements {${EVALUATION_TYPE}} */\nexport class E {}\n`),
      jsdocLinkInJs: named("c.cjs", `/** See {@link ${HOST_TYPE}}. */\nexports.x = 1;\n`),
      needle: named("c.ts", `const needle = "${HOST_TYPE}";\n`),
      regexNeedle: named("c.ts", `const pattern = /${HOST_TYPE}|${EVALUATION_TYPE}/;\n`),
      literalType: named("c.ts", `type Name = "${HOST_TYPE}" | "${EVALUATION_TYPE}";\n`),
      callArgument: named("c.ts", `expect(text).toContain("${EVALUATION_TYPE}");\n`),
      lineComment: named("c.ts", `// ${HOST_TYPE}\nexport {};\n`),
      jsdocInTs: named("c.ts", `/** @type {${HOST_TYPE}} See {@link ${EVALUATION_TYPE}}. */\nexport const host = create();\n`),
      affixed: named("c.ts", `const host = create${HOST_TYPE}();\ntype Options = ${HOST_TYPE}Options;\n`),
      cased: named("c.ts", `const ${"interface"}Host = 1;\nconst INTERFACE_HOST = 2;\nconst interface_evaluation = 3;\n`),
      lookalike: named("c.ts", `const Host = tsx.Interfac${CYRILLIC_IE}Host;\n`),
      joiner: named("c.ts", `const Host = tsx.Interface${ZERO_WIDTH_JOINER}Host;\n`),
      composedVariable: named("c.ts", `const name = "${HOST_TYPE}";\nconst Host = tsx[name];\n`),
      composedJoin: named("c.ts", 'const Host = tsx[["Interface", "Host"].join("")];\n'),
      reflective: named("c.ts", `const Host = Reflect.get(tsx, "${HOST_TYPE}");\n`),
      nearMiss: named("c.ts", "interface Host {}\nclass Evaluation {}\nconst surface = { host: 1, evaluation: 2 };\n"),
    };
    const plant = `import * as host from "${HOST_ENTRY}";\nexport class PiHost implements host.${HOST_TYPE} {}\n`;
    const planted = plantedTree({
      "src/host.ts": plant,
      "test/fixtures/deep/host.mts": plant,
      "examples/app/host.cjs": `exports.Host = require("${SDK}").${HOST_TYPE};\n`,
      "qa/host.mjs": `/** @implements {${EVALUATION_TYPE}} */\nexport class E {}\n`,
      "nested/dist/host.ts": plant,
      "link.ts": null,
      "host.ts": plant,
      "docs/host.md": plant,
      "fixtures/host.json": JSON.stringify({ source: plant }),
      "node_modules/pkg/host.ts": plant,
      "dist/host.ts": plant,
      "build/host.ts": plant,
      "coverage/host.ts": plant,
      ".forge/host.ts": plant,
      ".beads/host.ts": plant,
      "deep/a/b/c/host.ts": plant,
      "deep/a/b/c/d/host.ts": plant,
      ".agents/host.ts": plant,
      "test/.pi/host.mts": plant,
      ".host.ts": plant,
      "src/.host.ts": plant,
    });
    // wb-ril9 F3: on the planted tree the walk and the listing agree exactly (nothing else writes there).
    const plantedListed = planted.unlisted.length === 0 && planted.unheld.length === 0;
    expect({ unlisted: planted.unlisted, unheld: planted.unheld }, "the planted tree's walk against node's recursive readdir").toStrictEqual({ unlisted: [], unheld: [] });
    const flagged = (path: string): boolean => (planted.modules.get(path)?.references.length ?? 0) > 0 || planted.walk.symlinks.includes(path);
    const plants = Object.fromEntries(
      [
        "src/host.ts",
        "test/fixtures/deep/host.mts",
        "examples/app/host.cjs",
        "qa/host.mjs",
        "nested/dist/host.ts",
        "link.ts",
        "host.ts",
        "docs/host.md",
        "fixtures/host.json",
        "node_modules/pkg/host.ts",
        "dist/host.ts",
        "build/host.ts",
        "coverage/host.ts",
        ".forge/host.ts",
        ".beads/host.ts",
        "deep/a/b/c/host.ts",
        "deep/a/b/c/d/host.ts",
        ".agents/host.ts",
        "test/.pi/host.mts",
        ".host.ts",
        "src/.host.ts",
      ].map(path => [path, flagged(path)]),
    );
    return done("A1", {
      anchor: anchorOf("A1"),
      filesFloorMet,
      anchorsWalked: tree.anchorsWalked,
      modulesFloorMet,
      jsModulesFloorMet,
      namesRead,
      noExemption,
      needlesCarried,
      references,
      symlinks: tree.walk.symlinks,
      unreadable: tree.walk.unreadable,
      walkListed,
      plantedListed,
      controls,
      plants,
    });
  },
  A2: () => {
    const tree = liveTree();
    const hostLoads = [...tree.modules.values()].flatMap(reading => reading.hostLoads);
    const loadsRead = LOAD_ANCHORS.every(([path, specifier]) => tree.modules.get(path)?.loads.has(specifier) === true);
    const manifestsFloorMet = tree.manifests.length >= FLOORS.manifests && tree.manifests.includes("package.json") && tree.manifests.includes("package-lock.json");
    expect(loadsRead, "each load kind finds its live anchor").toBe(true);
    expect(manifestsFloorMet, `manifests read: ${tree.manifests.join(", ")}`).toBe(true);
    expect({ hostLoads, manifestHits: tree.manifestHits }, "modules loading, and manifests naming, a host or ui entry of the TSX SDK").toStrictEqual({ hostLoads: [], manifestHits: [] });
    const controls = {
      staticImport: loadsEntry("c.ts", `import { mount } from "${HOST_ENTRY}";\n`),
      uiEntry: loadsEntry("c.ts", `import { Panel } from "${UI_ENTRY}";\n`),
      namespaceImport: loadsEntry("c.ts", `import * as host from "${HOST_ENTRY}";\n`),
      typeOnly: loadsEntry("c.ts", `import type { Target } from "${HOST_ENTRY}";\n`),
      exportStar: loadsEntry("c.ts", `export * from "${UI_ENTRY}";\n`),
      sideEffectImport: loadsEntry("c.mjs", `import "${HOST_ENTRY}";\n`),
      deepSubpath: loadsEntry("c.ts", `import { dom } from "${HOST_ENTRY}/dom";\n`),
      npmSpecifier: loadsEntry("c.ts", `import { mount } from "npm:${SDK}@0.1.668/host";\n`),
      jsrSpecifier: loadsEntry("c.ts", `import { mount } from "jsr:${SDK}@0.1.668/ui";\n`),
      urlSpecifier: loadsEntry("c.ts", `import { mount } from "https://esm.sh/${SDK}@0.1.668/host";\n`),
      escapedSpecifier: loadsEntry("c.ts", `import { mount } from "${SDK}/\\u0068ost";\n`),
      percentSpecifier: loadsEntry("c.ts", `import { mount } from "https://esm.sh/${SDK}%2Fhost";\n`),
      foldedSpecifier: loadsEntry("c.mjs", 'const host = await import("@reactive-fiber/" + "tsx/host");\n'),
      dynamicImport: loadsEntry("c.mjs", `const host = await import("${HOST_ENTRY}");\n`),
      importEquals: loadsEntry("c.ts", `import host = require("${HOST_ENTRY}");\n`),
      importType: loadsEntry("c.ts", `type Target = import("${HOST_ENTRY}").Target;\n`),
      ambientModule: loadsEntry("c.ts", `declare module "${HOST_ENTRY}" { export const mount: () => void; }\n`),
      require: loadsEntry("c.cjs", `const host = require("${HOST_ENTRY}");\n`),
      requireResolve: loadsEntry("c.cjs", `const where = require.resolve("${UI_ENTRY}");\n`),
      moduleRequire: loadsEntry("c.cjs", `const host = module.require("${HOST_ENTRY}");\n`),
      globalRequire: loadsEntry("c.cjs", `const host = globalThis.require("${HOST_ENTRY}");\n`),
      importMetaResolve: loadsEntry("c.mjs", `const where = import.meta.resolve("${HOST_ENTRY}");\n`),
      createdRequire: loadsEntry("c.mjs", `const host = createRequire(import.meta.url)("${HOST_ENTRY}");\n`),
      createdResolve: loadsEntry("c.mjs", `const where = createRequire(import.meta.url).resolve("${HOST_ENTRY}");\n`),
      boundRequire: loadsEntry("c.mjs", `const load = createRequire(import.meta.url);\nconst host = load("${HOST_ENTRY}");\n`),
      requireAlias: loadsEntry("c.cjs", `const host = again("${HOST_ENTRY}");\nconst again = load;\nconst load = require;\n`),
      callForm: loadsEntry("c.mjs", `const host = createRequire(import.meta.url).call(null, "${HOST_ENTRY}");\n`),
      applyForm: loadsEntry("c.cjs", `const host = require.apply(null, ["${HOST_ENTRY}"]);\n`),
      reflectApply: loadsEntry("c.cjs", `const host = Reflect.apply(require, null, ["${HOST_ENTRY}"]);\n`),
      viVerb: loadsEntry("c.test.ts", `${VI_MOCK}("${HOST_ENTRY}", () => ({}));\n`),
      viImportActual: loadsEntry("c.test.ts", `const host = await vi.importActual("${UI_ENTRY}");\n`),
      newUrl: loadsEntry("c.mjs", `const where = new URL("npm:${SDK}@0.1.668/host", import.meta.url);\n`),
      worker: loadsEntry("c.mjs", `const worker = new Worker("npm:${SDK}@0.1.668/host");\n`),
      tripleSlashTypes: loadsEntry("c.ts", `/// <reference types="${HOST_ENTRY}" />\nexport {};\n`),
      tripleSlashPath: loadsEntry("c.ts", `/// <reference path="../node_modules/${HOST_ENTRY}/index.d.ts" />\nexport {};\n`),
      jsxPragma: loadsEntry("c.tsx", `/** ${PRAGMA} ${UI_ENTRY} */\nexport const C = () => <div />;\n`),
      jsdocImportTypeInJs: loadsEntry("c.mjs", `/** @type {import("${HOST_ENTRY}").Target} */\nexport let target;\n`),
      manifestEntry: namesEntry(`{"imports":{"#host":"${HOST_ENTRY}"}}`),
      manifestMapped: namesEntry(`{"imports":{"${UI_ENTRY}":"npm:${SDK}@0.1.668/ui"}}`),
      casedEntry: loadsEntry("c.ts", 'import { mount } from "@Reactive-Fiber/TSX/Host";\n'),
      emptyVersion: loadsEntry("c.ts", `import { mount } from "npm:${SDK}@/host";\n`),
      bracedUnicodeEscape: namesEntry(`{"imports":{"#host":"${SDK}/\\u{68}ost"}}`),
      unicodeEscape: namesEntry(`{"imports":{"#host":"${SDK}/\\u0068ost"}}`),
      hexEscape: namesEntry(`{"imports":{"#host":"${SDK}/\\x68ost"}}`),
      hexReference: namesEntry(`{"imports":{"#host":"${SDK}/&#x68;ost"}}`),
      decimalReference: namesEntry(`{"imports":{"#host":"${SDK}/&#104;ost"}}`),
      percentEscape: namesEntry(`{"imports":{"#host":"${SDK}/%68ost"}}`),
      rootEntry: loadsEntry("c.ts", `import { render } from "${SDK}";\n`),
      otherSubpath: loadsEntry("c.ts", `import { jsx } from "${SDK}/jsx-runtime";\nimport { embed } from "${SDK}/embedding";\n`),
      otherPackage: loadsEntry("c.ts", `import { mount } from "${SDK}-host";\nimport { x } from "${SDK}/hosts";\n`),
      specifierNeedle: loadsEntry("c.ts", `const entry = "${HOST_ENTRY}";\n`),
      matcherArgument: loadsEntry("c.ts", `expect(entry).toBe("${HOST_ENTRY}");\n`),
      bundlerAlias: loadsEntry("c.ts", `export default { resolve: { alias: { "#host": "${HOST_ENTRY}" } } };\n`),
      commentMention: loadsEntry("c.ts", `// loads ${HOST_ENTRY}\nexport {};\n`),
      jsdocImportTypeInTs: loadsEntry("c.ts", `/** @type {import("${HOST_ENTRY}").Target} */\nexport const target = 1;\n`),
      composedSpecifier: loadsEntry("c.mjs", `const segment = "host";\nconst host = await import(\`${SDK}/${"$"}{segment}\`);\n`),
      aliasedLoader: loadsEntry("c.cjs", `const loaders = { load: require };\nconst host = loaders.load("${HOST_ENTRY}");\n`),
      destructuredLoader: loadsEntry("c.cjs", `const { resolve } = require;\nconst where = resolve("${HOST_ENTRY}");\n`),
      parameterLoader: loadsEntry("c.cjs", `const use = load => load("${HOST_ENTRY}");\nuse(require);\n`),
      hostPackage: loadsEntry("c.ts", 'import { mount } from "native-terminal-host-kit";\n'),
      manifestRoot: namesEntry(`{"dependencies":{"${SDK}":"0.1.668"}}`),
    };
    // wb-ril9 F1: one positive manifest per MANIFEST alternative, optional part and class member, one at the root, one cased.
    const manifest = `{"imports":{"#host":"${HOST_ENTRY}"}}\n`;
    const manifests = [
      "lock/package-lock.json",
      "lock/npm-shrinkwrap.json",
      "deno/deno.json",
      "deno/deno.jsonc",
      "map/import-map.json",
      "map/import_map.json",
      "tsconfig.json",
      "web/jsconfig.json",
      "web/tsconfig.base.json",
      "cased/Package.JSON",
    ];
    const planted = plantedTree({
      "src/host.ts": `import * as host from "${HOST_ENTRY}";\nexport { host };\n`,
      "app/package.json": `{"name":"app","imports":{"#host":"${HOST_ENTRY}"}}\n`,
      "app/import_map.json": `{"imports":{"${SDK}/":"npm:${SDK}@0.1.668/"}}\n`,
      "docs/host.md": `import * as host from "${HOST_ENTRY}";\n`,
      "node_modules/pkg/index.js": `require("${HOST_ENTRY}");\n`,
      "dist/host.mjs": `import "${HOST_ENTRY}";\n`,
      "bin/run-host": `#!/usr/bin/env node\nrequire("${HOST_ENTRY}");\n`,
      ...Object.fromEntries(manifests.map(path => [path, manifest])),
    });
    const flagged = (path: string): boolean => (planted.modules.get(path)?.hostLoads.length ?? 0) > 0 || planted.manifestHits.includes(path);
    const plants = Object.fromEntries(
      ["src/host.ts", "app/package.json", "app/import_map.json", "docs/host.md", "node_modules/pkg/index.js", "dist/host.mjs", "bin/run-host", ...manifests].map(path => [path, flagged(path)]),
    );
    return done("A2", { anchor: anchorOf("A2"), loadsRead, manifestsFloorMet, hostLoads, manifestHits: tree.manifestHits, controls, plants });
  },
  B1: () => {
    const reading = armedLive("B1", HOST_TYPE, PURITY_CLAIM);
    const titles = readModule(
      "c.test.ts",
      [
        'it("t1", () => {});',
        'test("t2", () => {});',
        'it.concurrent("t3", () => {});',
        'it.each([1])("t4 %s", () => {});',
        'test.each`row`("t5", () => {});',
        'describe("t6", () => {});',
        'suite("t7", () => {});',
        'bench("t8", () => {});',
        `it.${SKIP_WORD}("t9", () => {});`,
        'it.fails("t10", () => {});',
        'test.sequential("t11", () => {});',
        'it("t" + "12", () => {});',
        "it(`t13`, () => {});",
        'it.for([1])("t14", () => {});',
        'describe.each([1])("t15", () => {});',
        'check("n1");',
        'expect("n2").toBe("n2");',
        'runner.it("n3");',
      ].join("\n"),
    ).titles;
    const clause = acceptanceClauses(readBeadRow().notes)[1] ?? "";
    const controls = {
      ...gateControls(HOST_TYPE),
      titles,
      computedTitle: readModule("c.test.ts", `const label = "paint callback";\nit(label, () => {});\nit(\`${"$"}{label} 2\`, () => {});\n`).titles.length > 0,
      aliasedRegistrar: readModule("c.test.ts", 'const myTest = test.extend({});\nmyTest("paint callback", () => {});\n').titles.length > 0,
      subtestRegistrar: readModule("c.test.ts", 'test("outer", t => {\n  t.test("paint callback", () => {});\n});\n').titles.includes("paint callback"),
      purityClause: PURITY_CLAIM.test(clause),
      frameCallback: PURITY_CLAIM.test("frame callbacks run no component"),
      componentInvocation: PURITY_CLAIM.test("zero component invocations per paint"),
      paintCallback: PURITY_CLAIM.test("a paint callback"),
      mountedFixtureTree: PURITY_CLAIM.test("a mounted fixture tree"),
      incidentalRenderEffect: PURITY_CLAIM.test("an incidental render effect"),
      ownFrame: PURITY_CLAIM.test("a rendered frame touches no filesystem"),
      ownPaint: PURITY_CLAIM.test("emits zero diff bytes for an identical frame and the whole frame for a cold paint"),
      ownWidget: PURITY_CLAIM.test("AgentWidget.render (per TUI frame)"),
      // wb-ril9 F1: the i flag, and each separator member at each position of each alternative.
      casedVocabulary: PURITY_CLAIM.test("Paint Callback"),
      ...separatorControls(PURITY_CLAIM, PURITY_WORDS, SEPARATORS),
      ...armedControls("B1", HOST_TYPE, PURITY_CLAIM, "N paint callbacks run no component"),
    };
    return done("B1", { ...reading, controls });
  },
  B2: () => {
    const reading = armedLive("B2", EVALUATION_TYPE, ATOMICITY_CLAIM);
    const clause = acceptanceClauses(readBeadRow().notes)[2] ?? "";
    const controls = {
      ...gateControls(EVALUATION_TYPE),
      atomicityClause: ATOMICITY_CLAIM.test(clause),
      stagedMutation: ATOMICITY_CLAIM.test("a fault between two staged mutations leaves the last generation"),
      evaluationGeneration: ATOMICITY_CLAIM.test("commits once per accepted evaluation generation"),
      evaluationGenerationOnly: ATOMICITY_CLAIM.test("one evaluation generation"),
      stagedCommit: ATOMICITY_CLAIM.test("staged commits"),
      preEvaluation: ATOMICITY_CLAIM.test("a pre-evaluation snapshot"),
      acceptedEvaluation: ATOMICITY_CLAIM.test("an accepted evaluation"),
      midEvaluation: ATOMICITY_CLAIM.test("injected mid-evaluation"),
      ownAtomicWrite: ATOMICITY_CLAIM.test("uses atomic temp+rename: write produces final file, no .tmp leftover"),
      ownGeneration: ATOMICITY_CLAIM.test("blocks code generation from strings"),
      // wb-ril9 F1: the i flag, each separator member at each position, and pre- and mid- with and without their hyphen.
      casedVocabulary: ATOMICITY_CLAIM.test("Evaluation Generation"),
      ...separatorControls(ATOMICITY_CLAIM, ATOMICITY_WORDS, SEPARATORS),
      ...separatorControls(ATOMICITY_CLAIM, HYPHEN_OPTIONAL, OPTIONAL_HYPHEN),
      ...armedControls("B2", EVALUATION_TYPE, ATOMICITY_CLAIM, "commits once per accepted evaluation generation"),
    };
    return done("B2", { ...reading, controls });
  },
};

/** A quiet row's value in the roster: `<pin>:<control>` reads the witness's controls, `<pin>:plant:<path>` its plants. */
function quietValue(id: string): unknown {
  const [pin = "", ...rest] = id.split(":");
  const witness = rosterWitness(pin);
  if (!isObject(witness)) return undefined;
  const plants = witness.plants;
  const controls = witness.controls;
  if (rest[0] === "plant") return isObject(plants) ? plants[rest.slice(1).join(":")] : undefined;
  return isObject(controls) ? controls[rest.join(":")] : undefined;
}
/** A roster witness's anchor, or undefined. */
function rosterAnchor(pin: string): unknown {
  const witness = rosterWitness(pin);
  return isObject(witness) ? witness.anchor : undefined;
}
/** The list-valued controls, each read whole. */
const LIST_CONTROLS: ReadonlyMap<string, readonly string[]> = new Map([["B1:titles", REGISTRAR_TITLES]]);
/** A pin's planted controls and plants read against their polarity in code (wb-ab0i F1): a quiet row (QUIET) or a negative
 * control (NEGATIVE_CONTROLS) reads false, every other control and plant reads true, and a list-valued control reads its list
 * whole. Returns the misses (`<id> reads <value>`, or `<id> absent` for a named control the witness lacks) and the counts
 * POLARITY_COUNTS pins. */
function polarity(pin: string, witness: Json): { readonly misses: string[]; readonly counts: string } {
  const own = (id: string): boolean => id.startsWith(`${pin}:`);
  const quiet = new Set([...Object.values(QUIET).flat(), ...NEGATIVE_CONTROLS].filter(own));
  const record = isObject(witness) ? witness : {};
  const misses: string[] = [];
  const read = new Set<string>();
  const counts = { true: 0, false: 0 };
  for (const [group, prefix] of [["controls", ""], ["plants", "plant:"]] as const) {
    const entries = record[group];
    if (!isObject(entries)) continue;
    for (const [key, value] of Object.entries(entries)) {
      const id = `${pin}:${prefix}${key}`;
      read.add(id);
      const list = LIST_CONTROLS.get(id);
      if (list !== undefined) {
        if (JSON.stringify(value) !== JSON.stringify(list)) misses.push(`${id} reads ${JSON.stringify(value)}`);
      } else if (typeof value === "boolean" && value === !quiet.has(id)) counts[value ? "true" : "false"] += 1;
      else misses.push(`${id} reads ${JSON.stringify(value)}`);
    }
  }
  for (const id of [...quiet, ...[...LIST_CONTROLS.keys()].filter(own)]) if (!read.has(id)) misses.push(`${id} absent`);
  return { misses, counts: `${counts.true}/${counts.false}` };
}
/** The constants the roster holds: the bead, the two types, the SDK, every scan constant, the residuals and their quiet rows. */
function scanConstants(): Json {
  return json({
    bead: BEAD,
    family: FAMILY,
    sdk: SDK,
    scan: {
      entryFamily: `${ENTRY_FAMILY.source}/${ENTRY_FAMILY.flags}`,
      entryKeys: ENTRY_KEYS,
      gateStep: GATE_STEP,
      purityClaim: `${PURITY_CLAIM.source}/${PURITY_CLAIM.flags}`,
      atomicityClaim: `${ATOMICITY_CLAIM.source}/${ATOMICITY_CLAIM.flags}`,
      purityWords: PURITY_WORDS,
      atomicityWords: ATOMICITY_WORDS,
      separators: SEPARATORS,
      hyphenOptional: HYPHEN_OPTIONAL,
      optionalHyphen: OPTIONAL_HYPHEN,
      registrars: REGISTRARS,
      viVerbs: VI_VERBS,
      constructedLoaders: CONSTRUCTED_LOADERS,
      pragma: PRAGMA,
      moduleExtensions: MODULE_EXTENSIONS,
      jsExtensions: JS_EXTENSIONS,
      manifest: `${MANIFEST.source}/${MANIFEST.flags}`,
      skippedRoots: SKIPPED_ROOTS,
      exempt: EXEMPT,
      floors: FLOORS,
      walkAnchors: WALK_ANCHORS.map(([path, token]) => `${path}:${token}`),
      nameAnchors: NAME_ANCHORS.map(([path, kind, value]) => `${path}:${kind}:${value}`),
      loadAnchors: LOAD_ANCHORS.map(([path, specifier]) => `${path}:${specifier}`),
      titleAnchor: TITLE_ANCHOR.join(":"),
      negativeControls: NEGATIVE_CONTROLS,
    },
    residuals: RESIDUAL_FAMILIES,
    quiet: QUIET,
  });
}

/** A describe title: the label, each armed vocabulary replaced, so a report holding this file's titles reads no armed claim. */
const titleOf = (row: Row): string =>
  `${row.id} ${row.label.replace(new RegExp(PURITY_CLAIM.source, "gi"), "<purity vocabulary>").replace(new RegExp(ATOMICITY_CLAIM.source, "gi"), "<atomicity vocabulary>")}`;

describe("wb-if7q.3 TSX host paint and commit census (TSX-NATIVE-INTERFACES-AND-PORTABLE-TSX-R3, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(scanConstants()).toStrictEqual(json({ bead: ROSTER.bead, family: ROSTER.family, sdk: ROSTER.sdk, scan: ROSTER.scan, residuals: ROSTER.residuals, quiet: ROSTER.quiet }));
    // Every residual has pinned quiet rows, and every quiet row reads false in the roster witnesses.
    expect(Object.keys(QUIET), "each residual family has its quiet rows").toEqual([...RESIDUAL_FAMILIES]);
    expect(Object.values(QUIET).flatMap(ids => (ids.length === 0 ? ["(none)"] : ids.filter(id => quietValue(id) !== false))), "quiet rows that are missing or not false").toEqual([]);
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^\[[^\]]+\] (If Pi ever [^(]+?) \(/.exec(bead.title)?.[1] ?? "";
    const quote = /^Quote: '(.+)' (\S+)\. Merged pin \(same dir\): (\S+) \('(.+)'\)\.$/m.exec(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b) and (c)").toEqual(["(a) ", "(b) ", "(c) "]);
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["A"], ["B"], ["B"], ["A"]]);
    expect(FAMILY.every(type => clauses[0]?.includes(type) === true), "acceptance (a) names both types").toBe(true);
    expect({ quote: quote?.[1], citation: quote?.[2], merged: { citation: quote?.[3], quote: quote?.[4] } }).toStrictEqual({
      quote: ROSTER.quote,
      citation: ROSTER.citation,
      merged: { citation: ROSTER.merged.citation, quote: ROSTER.merged.quote },
    });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.programPin.sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
    // Each pin answers, by position, one atom the bead row yields.
    expect(ROWS.flatMap(row => row.pins).map(rosterAnchor), "each pin's anchor is the bead row's atom at its position").toEqual(pinAtoms(bead));
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(polarity(pin, witness), `${pin}: every planted control against its polarity, in code`).toStrictEqual({ misses: [], counts: POLARITY_COUNTS[pin] });
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order, every pin reached its end, and no title names an armed vocabulary", { timeout: 60_000 }, ({ task }) => {
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
    expect([...suites, ...titles].filter(name => PURITY_CLAIM.test(name) || ATOMICITY_CLAIM.test(name)), "registered titles naming an armed vocabulary").toEqual([]);
  });
});
