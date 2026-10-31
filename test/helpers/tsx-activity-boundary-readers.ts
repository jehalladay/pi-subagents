/**
 * wb-km7q.12 (SDK-REACTIVE-FIBER-R3, the rule-19 structural-exit child of wb-km7q.6; orchestrator rulings R-B120 and R-B150):
 * the readers of the activity-boundary census, moved out of it so their claimed surfaces are held by their own falsifiers in
 * test/workbench-tsx-activity-boundary-readers-census.test.ts. WORDS and the dependency-name reading (the ADOPTION row), the
 * page and module readings (the sentence cut and the house analog), and the local-specifier reading with its five candidates
 * (the house analog's closure). Each reader reads exactly as the census read it at wb-km7q.6 cut #5; two parameters are new,
 * both defaulted: WORDS takes the steps it applies (so each step is held by a name that needs it), and resolveLocal takes the
 * probe it asks (so every path it asks about is observed).
 * Cut #2 (refusal #1, O:1569): the code is unchanged; the claim block now holds each break step's class (U1.6), the steps
 * argument's order (U1.7) and the kinds the default probe is held over (U2.5), and names the O:1569 member each line answers.
 *
 * CLAIMS (one claim per line, each naming the census pins that hold it; the census holds every line byte for byte):
 * U1.1 [U1-STEPS U1-CLASSES] WORDS reads a text in five steps, in this order: nfkc (the text's NFKC form), lower-capital (a break between an ASCII lower-case letter and the ASCII capital after it), digit-capital (a break between an ASCII digit and the ASCII capital after it), capital-run (a break before the last capital of a run of two or more ASCII capitals that an ASCII lower-case letter follows), lower-case (String.prototype.toLowerCase); the words are then the runs of a-z and 0-9, and every other character separates them; each step is held by calibration names that read recorded with every step and unrecorded with that step alone left out, and each break step's class by U1.6 over the texts U1.6 holds, no other text claimed for the break steps (R-STEP-TEXT).
 * U1.2 [U1-NAMES] A package is recorded when its name, read by WORDS, holds the adjacent pair reactive fiber in that order; claimed for exactly the names U1-NAMES holds, recorded and unrecorded; no other name is claimed (R-DEPENDENCY-NAME).
 * U1.3 [U1-SEPARATORS] For every Unicode scalar value c (the surrogates excluded) the name reactive<c>fiber is read: the c that leave it unrecorded are exactly the code point ranges U1-SEPARATORS holds, and every other c separates the two words.
 * U1.4 [U1-FIELDS] A name is a key of the table of exactly four fields of the manifest, dependencies, devDependencies, optionalDependencies and peerDependencies (a field whose value is an array, a string or null holds no name); the never-read fields U1-FIELDS holds are not read, and no other field is claimed (R-DEPENDENCY-FIELD).
 * U1.5 [U1-TWICE] A name a manifest holds in two read fields is recorded once per field, and the recorded names are sorted by UTF-16 code unit.
 * U1.6 [U1-CLASSES] Each break step, applied alone before lower-case, breaks a text exactly where its class stands: lower-capital between the two characters of each of its 676 pairs (an ASCII lower-case letter, then an ASCII capital), digit-capital between the two characters of each of its 260 pairs (an ASCII digit, then an ASCII capital), capital-run between the first two characters of each of its 17576 triples (an ASCII capital, an ASCII capital, then an ASCII lower-case letter); held against the census's own statement of the three classes over every text of two or three characters drawn from the 128 ASCII characters and the scalar values outside them whose lower-case form holds an ASCII letter or digit (U+0130 and U+212A, as U1-CLASSES reads every scalar value), and over each class member twice in one text and each whole class in one text (so every break of a text is made); it answers the O:1569 members GM-W01, GM-W03, GM-W05, GM-W06, GM-W07, GM-W08, GM-W10, GM-W11, GM-W12 and GM-W13; no other text is claimed (R-STEP-TEXT).
 * U1.7 [U1-ORDERINGS] WORDS applies the steps a steps argument names in WORD_STEPS order whatever the argument's own order: held over every ordering of every subset of the five, each step named once (326 arguments), each reading every U1-STEPS calibration name as that subset in WORD_STEPS order reads it, and over reactiveFiber read with lower-case named before lower-capital (reactive fiber); it answers the O:1569 member GM-W17; an argument naming a step twice is NOT CLAIMED by this census.
 * U2.1 [U2-ALONE U2-ORDER] A specifier opening with "." is joined to its importer's directory (posix join, then posix normalize) and resolves to the first file of its candidates, five in this order: js-as-ts (the path with its final .js read as .ts, a .js specifier only), mjs-as-mts (the path with its final .mjs read as .mts, an .mjs specifier only), as-written (the path), plus-ts (the path plus .ts), index-ts (the path plus /index.ts).
 * U2.2 [U2-PROBES] No other candidate is tried: resolveLocal asks its probe about exactly those candidates, in that order, and stops at the first one the probe accepts; held over every importer and specifier of the U2-PROBES corpus and over ./zz.<e> for every suffix e of the U3 sweep, against the census's own statement of the five; a specifier outside them is not claimed (R-UNTRIED-CANDIDATE).
 * U2.3 [U2-NON] A module that only a candidate outside the five reaches reads unresolved: claimed for exactly the forms U2-NON holds; no other form is claimed (R-UNTRIED-CANDIDATE).
 * U2.4 [U2-ESCAPE] A candidate opening with ".." is never probed: a path outside the repository (a file there reads unresolved), and also an in-repository name opening with two dots (fail-closed).
 * U2.5 [U2-FILE] The default probe, isFileIn(base), accepts a path when join(base, path) names a regular file after symlinks are followed and refuses each other kind planted here: a file and a symlink to a file read accepted; a directory, a symlink to a directory, a dangling symlink, a missing path and a character device (/dev/null by its own path, and a symlink to it) read refused, each beside the kind the census reads its path as; it answers the O:1569 member GM-F01; a FIFO, a socket and a block device are NOT CLAIMED by this census.
 * U3.1 [U3-PAGE] A path is a page exactly when it ends in .md; held over every suffix of the sweep (each string of one to three ASCII letters or digits and each of four ASCII lower-case letters, after a dot and with no dot, at the root, below docs/ and below src/ui/) and the named paths U3-PAGE holds; no other path is claimed (R-PAGE-NAME).
 * U3.2 [U3-MODULE] A path is a module exactly when it ends in .ts, .tsx, .mts, .cts, .js, .mjs or .cjs (a .d.ts, .d.mts or .d.cts declaration file too); held over the same sweep and the named paths U3-MODULE holds; no other path is claimed (R-MODULE-NAME).
 * S.1 [SPEC-LOCAL] A specifier is local exactly when it opens with "." or "/"; held over every first code point of the Basic Multilingual Plane (the surrogates excluded) and the named forms SPEC-LOCAL holds; no other form is claimed (R-SPECIFIER-FORM).
 * S.2 [SPEC-ROOT SPEC-ABSOLUTE] A specifier opening with "/" forms no candidate, so resolveLocal never probes for it and reads it unresolved whatever file it names: the repository-root forms SPEC-ROOT holds (a root-relative bundler's reading) and the absolute forms naming a repository file SPEC-ABSOLUTE holds (Node's reading), each with the named file present.
 * R-STEP-TEXT [U1-CLASSES] A text outside U1.6's sweep, doubled members and whole classes is not claimed: a<U+FF22> (a, then the fullwidth capital B, a character outside the sweep) reads no lower-capital break beside its ASCII twin aB, and ABc1 (a capital-run member, then a fourth character) reads capital-run's break beside its three-character twin ABc.
 * R-DEPENDENCY-NAME [U1-NAMES] A name outside the names U1-NAMES holds is not claimed: a folded name (reactivefiber-zz) reads unrecorded beside its kebab twin, and an alias key whose spec names the package reads unrecorded beside the package's own key.
 * R-DEPENDENCY-FIELD [U1-FIELDS] A name in a field outside the four is not read: a nested pnpm.overrides table reads unrecorded beside its dependencies twin.
 * R-UNTRIED-CANDIDATE [U2-NON] A module only another candidate reaches is never read, and a specifier outside U2.2's corpus and sweep is not claimed: a directory whose package.json main names its module reads unresolved beside its index.ts twin, and ./zz.coffee is asked its three candidates beside the four of ./zz.js.
 * R-PAGE-NAME [U3-PAGE] A path outside the sweep and the named paths is not claimed: docs/zz.mdtxt reads no page beside docs/zz.md.
 * R-MODULE-NAME [U3-MODULE] A path outside the sweep and the named paths is not claimed: src/zz.typescript reads no module beside src/zz.ts.
 * R-SPECIFIER-FORM [SPEC-LOCAL] A specifier form outside the sweep and the named forms is not claimed: file:./zz.js reads not local beside ./zz.js.
 *
 * Display paths added: none. Test-only: these readers read text and stat paths joined to the base they are handed; they
 * write nothing and spawn nothing.
 */
import { statSync } from "node:fs";
import { join, posix } from "node:path";

/** Two words, in order. */
export type Pair = readonly [string, string];

/** The WORDS steps, in the order a text passes through them. */
export const WORD_STEPS = ["nfkc", "lower-capital", "digit-capital", "capital-run", "lower-case"] as const;
export type WordStep = (typeof WORD_STEPS)[number];
const STEP: Readonly<Record<WordStep, (text: string) => string>> = {
  nfkc: text => text.normalize("NFKC"),
  "lower-capital": text => text.replace(/([a-z])([A-Z])/g, "$1 $2"),
  "digit-capital": text => text.replace(/([0-9])([A-Z])/g, "$1 $2"),
  "capital-run": text => text.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2"),
  "lower-case": text => text.toLowerCase(),
};
/** The words of a text (U1.1): each step in `steps` applied in WORD_STEPS order, then the runs of a-z and 0-9. */
export function words(text: string, steps: readonly WordStep[] = WORD_STEPS): string[] {
  let read = text;
  for (const step of WORD_STEPS) if (steps.includes(step)) read = STEP[step](read);
  return read.split(/[^a-z0-9]+/).filter(word => word !== "");
}
/** Whether the words hold one of the pairs as two adjacent words, in order. */
export const hasPair = (tokens: readonly string[], pairs: readonly Pair[]): boolean => tokens.some((word, index) => pairs.some(([first, second]) => word === first && tokens[index + 1] === second));
/** The order the recorded names are sorted in: by UTF-16 code unit. */
export const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

/** The manifest fields a dependency name is read in (U1.4). */
export const DEPENDENCY_FIELDS = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"] as const;
/** The pair a recorded name holds: the two words of the producer's package scope. */
export const DEPENDENCY_PAIR: Pair = ["reactive", "fiber"];
/** Every name of a package.json's read fields whose words hold the pair (U1.2), once per field, sorted (U1.5). */
export function dependencyNames(manifest: string, steps: readonly WordStep[] = WORD_STEPS): string[] {
  const parsed = JSON.parse(manifest) as Record<string, unknown>;
  return DEPENDENCY_FIELDS.flatMap(field => {
    const table = parsed[field];
    return table !== null && typeof table === "object" ? Object.keys(table).filter(name => hasPair(words(name, steps), [DEPENDENCY_PAIR])) : [];
  }).sort(byName);
}

/** The one suffix a page path ends in (U3.1). */
export const PAGE_SUFFIX = ".md";
/** The suffixes a module path ends in (U3.2). */
export const MODULE_SUFFIXES = [".ts", ".tsx", ".mts", ".cts", ".js", ".mjs", ".cjs"] as const;
/** A .md page: the sentence cut reads its table rows, headings and list items. */
export const isPage = (path: string): boolean => path.endsWith(PAGE_SUFFIX);
/** A module: the house analog reads its value imports. */
export const isModule = (path: string): boolean => MODULE_SUFFIXES.some(suffix => path.endsWith(suffix));

/** A local specifier (S.1): one opening with "." or "/". */
export const isLocal = (specifier: string): boolean => specifier.startsWith(".") || specifier.startsWith("/");
/** The candidates a "." specifier resolves through (U2.1), in order. */
export const CANDIDATE_RULES = ["js-as-ts", "mjs-as-mts", "as-written", "plus-ts", "index-ts"] as const;
export type CandidateRule = (typeof CANDIDATE_RULES)[number];
const CANDIDATE: Readonly<Record<CandidateRule, (joined: string) => string | undefined>> = {
  "js-as-ts": joined => (joined.endsWith(".js") ? `${joined.slice(0, -".js".length)}.ts` : undefined),
  "mjs-as-mts": joined => (joined.endsWith(".mjs") ? `${joined.slice(0, -".mjs".length)}.mts` : undefined),
  "as-written": joined => joined,
  "plus-ts": joined => `${joined}.ts`,
  "index-ts": joined => `${joined}/index.ts`,
};
/** The candidates of one specifier from one importer, in order: none for a specifier that does not open with "." (S.2),
 * and none that opens with ".." (U2.4). */
export function candidatesOf(from: string, specifier: string): string[] {
  if (!specifier.startsWith(".")) return [];
  const joined = posix.normalize(posix.join(posix.dirname(from), specifier));
  return CANDIDATE_RULES.flatMap(rule => {
    const candidate = CANDIDATE[rule](joined);
    return candidate === undefined || candidate.startsWith("..") ? [] : [candidate];
  });
}
/** The default probe (U2.5): whether join(base, path) names a regular file, symlinks followed. */
export const isFileIn =
  (base: string) =>
  (path: string): boolean => {
    try {
      return statSync(join(base, path)).isFile();
    } catch {
      return false;
    }
  };
/** A local specifier's module (U2.1, U2.2): the first candidate the probe accepts, or undefined (unresolved). */
export function resolveLocal(base: string, from: string, specifier: string, probe: (path: string) => boolean = isFileIn(base)): string | undefined {
  return candidatesOf(from, specifier).find(candidate => probe(candidate));
}
