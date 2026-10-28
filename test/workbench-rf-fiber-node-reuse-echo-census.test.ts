/**
 * wb-csbt.2 (TSX-RESOURCE-EFFICIENCY-FRONTIER-R2, program-triage-2026-10-22), a conditional echo-posture census; gating artifact:
 * none. The bead's title (its statement) and its owner filing's acceptance clauses are read verbatim from the bead's row in the
 * tracked bead export (.beads/issues.jsonl) at run time rather than restated in this comment: this file and its roster are under
 * acceptance (a)'s own guard (every file below src/ and test/), so neither spells the producer's key path or the label (a) names.
 * Both are composed from parts (SEGMENTS, SKIP_WORDS and LABEL_NOUNS below), and the guard reads this file and the roster like any
 * other test file, with no exemption.
 *
 * THE STATEMENT, in substance: if any Pi surface ever reads the TSX SDK's render-report component-reuse counter through the rf
 * envelope, Pi echoes it under the producer's own key with the producer's meaning (the pinned ADR-0032 title: "`reused` = Fiber node
 * not re-rendered") and never re-labels it as a skip figure. The filing leaves open whether the field reaches the rf envelope and
 * notes that Pi's rf reader reads no components key. Citation (ReactiveFiberTSXSDK): docs/programs/resource-efficiency-frontier-
 * 2026-10-17/02-INCREMENTAL-ASSEMBLY-AND-REUSE.md:18@76bbbffd9d4a.
 *
 * MEASURED BY THE CUTTING SEAT (ws-03, g10-work-s47, 2026-10-23; every read below was read-only and none is re-read here, so the
 * census stays hermetic):
 * - At the pin, `git show 76bbbffd9d4a:<path>` on the local ReactiveFiberTSXSDK checkout: 02-INCREMENTAL-ASSEMBLY-AND-REUSE.md:18
 *   (blob deb9b069) reads the quote the export carries; 01-COST-MODEL-AND-INSTRUMENTATION.md:6 (blob fc91bbeb) counts component
 *   reuse "in the **ADR-0032 Fiber-node sense**"; README.md:8 (blob 841e6d04) reads "The framework's Fiber-node reuse is not
 *   evidence for whole-subtree skip."; the ADR-0032 title (blob e4aa3139) reads "`reused` = Fiber node not re-rendered"; and
 *   src/render/report.ts (blob 58f4afa4) declares the counter optional inside the report's components object (:347), sets
 *   COMPONENT_SKIP_ENABLED = false (:260) and so reports the counter as 0 (:543, :608-610).
 * - The installed rf (`rf --json --version` result.version 0.1.832): none of the 231 JSON schemas below its
 *   reactive_fiber_cli/schemas declares a property of the counter's name or of either render-report spelling; its
 *   context.render.schema.json (sha256 06ac92079d39) leaves result open to additive keys and closes every result.components row to
 *   five keys (component_id, component_instance_id, component_revision_id, source_unavailable, status); and rf's own component
 *   counter, result.work_metrics.reused_component_count, counts the distinct component instances whose sink outcome was a
 *   component-output cache hit (integrations/fiber.py:2820, PMO-07d): an instance-cache meaning, not the SDK's Fiber-node count.
 * - The captured rf result-key roster (test/fixtures/rf-result-keys.json, rf 0.1.784, receipt cmd_ab79e0c5d689, exhaustive in both
 *   directions under owner ruling R649 (3)) lists the second segment as a result key and no first-segment key.
 * So the field reaches no rf envelope Pi reads at either build, and every carrying fixture below is CONSTRUCTED: the full-shape
 * envelope of test/helpers/rf-render-fixture.ts (fullShapeRf) plus the producer object - the three segments nested, valued 0 (the
 * only value the pin reports) or 3 (a value a producer with COMPONENT_SKIP_ENABLED on could report) - under a result-level key
 * spelled the SDK's way (camel case) or rf's way (snake case).
 *
 * PI'S RF READERS, enumerated at run time (T1): every src module that imports providers/reactivefiber.js or
 * reactivefiber-observer.js, or spells the capability id reactivefiber.render.preview as a whole literal - six at base
 * (hosts/local-detached.ts, native-evidence.ts, native-modules.ts, providers/reactivefiber.ts, reactivefiber-observer.ts and
 * src/workflow/reconcile.ts). A reading reaches five surfaces: the registered reading of the injected-reader seam
 * (registerReactiveFiberRender), the native provider (registerNativeReactiveFiberRender, which spawns rf and validates the
 * envelope), the agent-visible capability_invoke reply (the real curated MCP server behind a real MCP client), the reader adapter's
 * topology (reactivefiberTopology) and the native-evidence projection (nativeEvidence).
 *
 * THE READINGS (their vocabularies are held to the roster):
 * - KEY, acceptance (a)'s grep widened: case-insensitively, over a text whose whitespace runs are removed, the first segment (its two
 *   camel parts joined by at most one character that is not a letter or digit, so rf's snake spelling too) followed by the second,
 *   or the second followed by the third, the two joined by any one character (the grep's dot), by a run of at most SEPARATOR
 *   characters that are neither letters nor digits (a dot, an optional chain, a bracket and a quote, a JSON colon and brace, an
 *   underscore) or by nothing. The bare third segment alone is never read.
 * - LABEL: a text splits into units at line breaks and at UNIT_BREAKS; a unit folds (a lower-to-upper camel boundary becomes a
 *   space, NFKC, lower case, every run outside [a-z0-9] one space); a label is a SKIP_WORDS word (the owner's own word in (a) and in
 *   the title) and a LABEL_NOUNS word, both whole folded words at most WINDOW words apart, in either order.
 * - FIGURE (acceptance (c)): a FIGURE_WORDS word anywhere in a string a projection surfaces, keys included.
 *
 * ROWS: T, the trigger, absent today (T1, T2), its label the export title's trigger (its opening condition and its closing
 * absent-today note); A, B and C, the owner's acceptance clauses (a), (b) and (c); every label held to the export verbatim and in
 * order. Each pin's case asserts its own outcome and returns a witness the roster holds:
 *  T1 Pi's rf readers read no key the producer object has: no property access, element-access key, binding or object-literal key
 *    equal to the first segment (either spelling) or the second, and no literal naming either, with the reader floor and two
 *    positive controls (the adapter reads result.observations; the provider names engine_metrics);
 *  T2 the rf capability roster stays the preview alone (native and injected registrations selected by id, permission and contract
 *    source, and RECONCILE_EVIDENCE_READS.reactivefiber), both descriptors carrying REACTIVE_FIBER_CONTRACT_SOURCE, whose verb is
 *    context.render --no-commit: no rf surface that could carry a render report (rf component test, context show) is registered;
 *  A1 every regular file below src/ and test/ (this file and its roster included; dot directories followed) reads no KEY pair and
 *    no LABEL, with floors (100 src and 450 test files), the four test extensions read, a depth-four path read, and the precision
 *    files read (the adapter spells the bare third segment; the fixture helper spells rf's own counters); and both readings
 *    consumed each file's whole content (wb-5618 cut #3, the gate's U1 class; respin #1's scannedWhole stays the judge of one
 *    text): each reading reports the text it consumed - KEY the output of its last replace pass over the text with its whitespace
 *    runs removed, LABEL every part it visited (each unit, and each break between units) appended in order - and a file counts as
 *    read only when LABEL's consumed text is the file's whole content as scannedWhole judges it against the file's own bytes, read
 *    again from disk (a strict UTF-8 decode decides lossiness, never the scanned text; a strict file counts only when the text's
 *    UTF-8 length is its size on disk and the text is that decode, a lossy file only when the text is the lossy decode of the
 *    whole file), and KEY's consumed text is that content with its whitespace runs removed (readingsWhole) - so a reading handed a
 *    blanked, cut-short or substituted text, or cutting its text before its own pass, reds, whichever reading it is and whatever
 *    character the text carries. Pinned beside the walk: the predicate's controls (a strict and a lossy sample, each whole, blank
 *    and cut short, with and without the replacement character, the strict one also substituted at its own length), the
 *    coupling's controls (both readings whole; KEY alone or LABEL alone cut short; both blank; KEY substituted at its own length;
 *    KEY's consumed text is its passes' output and LABEL's its parts), and, in makeScratch scratch and read through scanFile (the
 *    walk's own per-file reading), a lossy file, two end-of-file plants and one FAR PLANT per test extension (.json, .md, .mjs,
 *    .ts) whose KEY pair and LABEL sit past the size of the longest walked file - so a reading cut short of the longest walked
 *    file, or blanked for one of those extensions, also misses a far plant;
 *  A2 the outside anchors agree with the readings: the export title's backticked path is SEGMENTS joined by dots, the backticked
 *    targets of clause (a) are the two KEY pairs, KEY reads each target and not the bare word clause (a) names, LABEL reads clause
 *    (a)'s phrase, the title's phrase and the quoted program line, the title ends with the citation, and the captured rf roster
 *    lists the second segment and no first-segment key;
 *  A3 every planted spelling of KEY_CONTROLS and LABEL_CONTROLS is read, every precision and residual control of QUIET_CONTROLS
 *    reads quiet under both readings, and the walker row holds R-SYMLINK: in makeScratch scratch, a link to a file spelling a KEY
 *    pair is not followed while the same file walked where it lives is read;
 *  B1 the registered reading of each carrying fixture carries the source byte for byte, the producer object under its own key with
 *    its own value, and Pi adds only its contract and root: no number, no LABEL, no KEY pair;
 *  B2 the native provider admits each carrying fixture from a stand-in rf and returns it byte for byte in one spawn of the render
 *    argv;
 *  B3 the capability_invoke reply returns that reading as {kind: "returned", value}, its text spelling the producer object's key and
 *    value exactly, and Pi's strings only "returned", the contract and the root;
 *  B4 the adapter's topology of each carrying fixture, under both seams, equals its twin's without the object: no LABEL, no KEY
 *    pair, no FIGURE word; the twin really differs from the fixture, and the same comparison tells apart a divergent twin (the twin
 *    with its operation id changed, which every projection surfaces), so a self-compared leg reds (blindness);
 *  B5 the native-evidence projection of each carrying fixture equals its twin's, with no LABEL and no FIGURE word, under the same
 *    divergent-twin control;
 *  C1 the plain fixture (no render-report key) at every surface: no first-segment key at any depth, Pi adds none, and the topology
 *    and the evidence carry no FIGURE word;
 *  C2 rf's own instance counter at 3 with the key absent: every projection equals the zero-counter twin with no FIGURE word (the
 *    divergent-twin control again), and the readings carry the counter verbatim with no render-report key synthesized from it;
 *  C3 observation rows read freshness reused: the only reuse word any surfaced string carries is the adapter's observations note
 *    (the wb-973.9 freshness word), which names rows and no LABEL_NOUNS word, and no surfaced string carries a skip word.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal. OUTSIDE ANCHORS: the export row (labels, row
 * T's from the title's trigger, path, targets, quote, citation), the out-of-file roster (every row's id, label digest and pins,
 * every pin's witness, the vocabularies, placements, values, the bound record and the registered tests), the captured rf roster
 * and the src readers themselves. The last case walks this file's vitest task tree against the roster, so a member removed from
 * every literal of this file still reds there; a member removed from every literal of this file and of the roster together reds
 * at the bound case, whose anchors lie outside both.
 * BOUND (wb-5618, the R694 follow-up of the wb-csbt.2 gate's F1; respin #1 cures the wb-5618 gate's U2 and carries its riders
 * R1-R3): every pin of rows T and B is bound, one pin each, to an anchor outside this file and its roster (BINDINGS), and the
 * judged set holds rows T and B to as many pins as those anchors name. T's pins hold the terms of the export title's absent-today
 * note, the parenthetical split at its semicolon: T1 "Pi's rf reader reads no components key", T2 "whether the field reaches the
 * rf envelope is unknown today" (the one rf envelope Pi reads is the preview's). B's pins hold the reading surfaces src derives,
 * never restated (surfaceDerivation, one module at a time through moduleSurfaces), each keyed <module>#<name> by the name the
 * module exports it under. A name resolves as TypeScript resolves it inside the module (a one-file program: the module's own
 * scopes, its imports unresolved). The derivations read exactly these spellings, each alternative with a positive row of its own
 * in DERIVATION_CONTROLS (POSITIVE ROWS below; NOT CLAIMED (4) bounds their combinations):
 * (i) in a Pi rf reader, every property id - a plain, string or computed-literal name, or a shorthand - whose value is the preview
 *   id (the literal, or a const of the module holding it: its initializer the literal or, followed transitively, another such
 *   const - wb-23d1, the landing-431 gate's F4), wherever the object sits (inline in a register call, behind a type assertion or
 *   in a variable), keyed by the exported function it lies in - a function declaration, or a variable or export
 *   default holding a function value, exported by a modifier, an export list or export default - else (module) (B1 the injected
 *   registerReactiveFiberRender, B2 the native registerNativeReactiveFiberRender);
 * (ii) in a src module naming the agent SDK, every call of the SDK's tool helper - imported by name from the SDK itself (aliases
 *   included), a member (by name or by a string element access) of a namespace or default import of the SDK, or a variable of the
 *   module bound to either - or to another such variable, followed transitively - by its initializer (plain, or an object
 *   destructuring of a namespace or default import) or by an assignment whose target is the variable itself (=, ??=, ||= or &&=,
 *   anywhere in the module; cut #3, the gate's D1) - whose arguments, or the declarations of the module any name in them resolves
 *   to (followed transitively), call a member or a binding named invoke, keyed by the tool's name (a literal or a const of the
 *   module, read as (i) reads the id, else (unnamed)) (B3 capability_invoke);
 * (iii) in an ENVELOPE READER - a Pi rf reader whose syntax names the rf envelope schema constant, so it reads the envelope itself -
 *   every export (by a modifier, an export list with its aliases, or export default) of a function declaration or of a function
 *   value, held directly or through a name of the module by its initializer, that declares a parameter typed JsonValue - named
 *   directly, through an import alias of it, or through a type alias of the module naming it (directly or through another such
 *   alias), each inside any parentheses, at the parameter or in an alias's own type (cut #3, the gate's D4) (B4
 *   reactivefiberTopology, B5 nativeEvidence).
 * POSITIVE ROWS (wb-23d1, the R694 follow-up of the wb-5618 landing-431 gate's F1, owner reading (a); re-pinned by wb-esaw, the
 *   R694 follow-up of the wb-23d1 landing-525 gate's F1, in the terminal enumerate-the-resolvable form): each alternative the
 *   list above names, read on its own, has a positive row in DERIVATION_CONTROLS, and so does each interaction or quantifier
 *   spelling named here; each row added by wb-23d1 or wb-esaw reds the bound case under a census-only derivation mutant that
 *   drops its alternative. wb-23d1 added the landing-431 gate's four unpinned spellings (||= toolAssignedOrOr, &&=
 *   toolAssignedAndAnd, a string name registerStringName, a default-import destructuring toolDestructuredDefault), its alias inside
 *   parentheses (projectParenthesizedAlias) and its export default holder (registerDefaultExport), the other named alternatives
 *   that had no row (registerDefaultFunction, toolReboundMember, toolAssignedInModule, projectDefaultArrow,
 *   projectParenthesizedImportAlias), and the chains the derivations follow (registerConstChain, toolNameConstChain,
 *   toolReboundChain, projectTypeAliasChain). wb-esaw adds a row for each of the four interaction or quantifier spellings the
 *   landing-525 gate measured without one (its G-E01..G-E04), and for one sibling each of G-E01 and G-E04: parentheses inside
 *   parentheses, at the parameter (projectNestedParenthesized, G-E01) and in an alias's own type
 *   (projectNestedParenthesizedAlias); a string element access of a default import (toolDefaultImportElement, G-E02); an
 *   assignment in a function other than the variable's own scope, a module variable assigned inside an exported function
 *   (toolAssignedInFunction, G-E03); and an assignment binding the variable to a member of a namespace import (toolAssignedMember,
 *   G-E04) or to another such variable (toolAssignedChain).
 * The bound witness holds T1's reader floor, not an exact reader count, so a new rf reader adding no surface stays green as it does
 * at T1. Each binding is also proven as its case runs: reach() records the src function a B case called, by that function's own
 * name, or the agent tool it called, and the term a T case judged (T1 the components key it reads every rf reader for, T2 the rf
 * envelope whose capability roster it reads); the bound case requires each B pin to have reached the surface it is bound to and
 * each T pin's bound term to name what its case judged, so a swap of two B or two T bindings, roster included, reds. A coordinated
 * hollow of a T or B pin, or of row T, through this file and the roster leaves a term or a surface unjudged and reds the bound case
 * and the judged set; a term the title gains, or a surface src gains in a spelling (i)-(iii) read, reds them too, so such a new Pi
 * surface re-judges this census. A spelling (i)-(iii) do not read is not claimed: each one known is a named residual of the
 * derivations below, with its quiet row in DERIVATION_CONTROLS; the bound case is itself required by the registration case.
 * NOT CLAIMED (1), the scope of BOUND: the src routes that invoke the registry outside (i)-(iii) are not derived as surfaces -
 * workflow callNode in claude-host.ts and hosts/local-detached.ts, reconcile-tool.ts's workflow_reconcile (a Pi tool defined
 * through defineTool, which (ii) does not read - R-PI-TOOL; its evidence reply carries the read value as its snapshot),
 * evidence-wiring.ts's forge read and the registry's own dispatch. They receive the registered reading B1 and B2 pin byte for byte;
 * what they add of their own is not judged here.
 * NOT CLAIMED (2), the judge-rewrite class (an edit of a judge itself is not self-detectable by a witness census; the landing-303
 * gate's F5 and the wb-5618 gates' record-only rows): a reading's own matching rewritten to read less than the text it reports
 * consumed (its patterns, fold or window, or its per-unit iteration); the liveness re-pointed at a text the readings did not
 * consume (scannedWhole or readingsWhole handed the untouched read), where a reading cut keyed to a path the far plants do not
 * share - every file under the repository, or every file below test/ - then stays green; a reading's reported findings dropped
 * after it consumed the text (scanFile handing back no KEY pair or LABEL for a file both readings consumed whole, keyed to such a
 * path - the wb-5618 landing-431 gate's L2-DISC-TEST, L2-DISC-REPO and L2-DISC-TESTb, equal in effect to the archived H02: the
 * walk's own per-file reading rewritten, and no plant anchors it, since makeScratch scratch lies outside the repository and a
 * walked path carries no hit); a control's expected value edited, or a DERIVATION_CONTROLS row removed, in this file and the
 * roster together (the control set has no anchor outside the two: wb-esaw measured each of its seven rows, and the landed
 * toolAssignedOrOr and registerLetId rows, removed from both reading 0|16); and a derivation's reading weakened together with
 * its controls in both files (the wb-5618 gate's K-CTRL).
 * NOT CLAIMED (3): a spelling (i)-(iii) do not read, beyond the named residuals of the derivations, is not claimed.
 * NOT CLAIMED (4), the scope of POSITIVE ROWS (wb-esaw): a combination of two or more alternatives beyond the interaction rows
 *   POSITIVE ROWS names - for example a string element access, or a member of a default import, bound to a variable by its
 *   initializer or by an assignment - has no positive row of its own: the derivations are written to read it as their
 *   alternatives compose, but no row pins it, so a census-only mutant that drops that combination alone, every named row's
 *   spelling still read, is not claimed to red; nor is a reading of (iii)'s parentheses that takes them off to a fixed depth of
 *   two levels or more (the rows nest them one and two deep).
 * RESIDUALS (named, each with a pinned quiet row in A3's QUIET_CONTROLS unless named otherwise): R-FEATURE-WORDS skip, skips and
 * skipping beside the nouns are not read - they name ADR-0032's deferred skip feature (the wb-csbt.1 posture's subject), not a
 * figure Pi states as done (featureSkipping, featureSkipPredicate, featureWholeSubtree); R-VOCABULARY a synonym outside SKIP_WORDS
 * is not read (vocabularyBypassed, vocabularyElided, vocabularyOmitted); R-WINDOW a pair more than WINDOW words apart in one unit is
 * not read (windowFour); R-SPLIT a label split across units - by a line break, a quote, a colon, a comma or a bracket - is not
 * read, which keeps a producer grade list quiet (a JSON list naming one gate's grade and a component check's grade, as
 * test/fixtures/rf-evaluator-artifact-context-roster.json holds) (splitLine, splitJsonKey, gradeList); R-COMPOSED a key path
 * assembled at run time from parts that never meet in the text, as this file composes its own, is invisible to the text scan
 * (composedParts) - B1-B5 and C1-C3 are the runtime backstop, reading what each reached surface carries; R-ALIAS a reader holding
 * the second segment's object under another name and reading the third off the alias spells no pair (aliasRead) - T1 still reads
 * the second segment as a property name in any rf reader; R-SEPARATOR a pair joined by a run that holds a letter or digit beside
 * another character, or by more than SEPARATOR characters that are not letters or digits, is not read (longSeparator); R-TREES
 * qa/, docs/, examples/, .beads/ and the repository root are outside (a)'s trees (the clause names src and test; A1's witness pins
 * its roots) - at base they spell no KEY pair except the bead export (.beads/issues.jsonl), which A2 reads as the anchor; R-ESCAPE
 * (wb-5618, the gate's L09e) a pair whose joining character is spelled as a string escape (a backslash-u escape of the dot) reads
 * as escape text, not as its cooked value, so the text scan stays quiet (escapeSpelled) - T1 still reads a cooked literal naming
 * the second segment in any rf reader, and B1-B5 and C1-C3 read what each reached surface carries; R-SYMLINK (wb-5618, the gate's
 * L10) the walker does not follow a symbolic link, as git tracks the link and not its target: a link below src/ or test/ to a
 * file elsewhere is not read through, while the target is read wherever it lies inside the trees (A3's walker row).
 * RESIDUALS OF THE DERIVATIONS (wb-5618 respin #1; each with a pinned quiet row in DERIVATION_CONTROLS, named in parentheses):
 * R-COMPOSED-ID (the wb-5618 gate's P10, rider R2) a preview id composed at run time - joined, concatenated or templated with a
 * substitution - is not read by (i) (registerComposedId); R-IMPORTED-ID a preview id held by a const imported from another module
 * is not read by (i) (registerImportedId); R-OPTIONAL-READING (the gate's P08, rider R2) a reading parameter whose type
 * composes JsonValue rather than naming it - JsonValue | undefined or any other union, an intersection, an array or a generic
 * wrapper - is not read by (iii), the boundary that keeps native-evidence.ts's scalar helper reportedRelease outside the surfaces
 * (projectOptionalReading); R-MEMBER-PROJECTION a projection that is a method or a property of an exported
 * object or class is not read by (iii) (projectMember); R-REEXPORT a projection an envelope reader re-exports from another module
 * is read only where it is declared, and only when that module is an envelope reader itself (projectReexport); R-ENVELOPE-NAMING a
 * module that spells the envelope schema's literal rather than naming the constant is no envelope reader (projectSchemaLiteral);
 * R-PI-TOOL (rider R3) a tool defined through a helper other than the agent SDK's - Pi's own defineTool, as reconcile-tool.ts's
 * workflow_reconcile is - is not read by (ii) and stays NOT CLAIMED (toolPiDefineTool); R-SDK-REEXPORT the agent SDK's tool helper
 * reached through a module of Pi's that re-exports it, or through a dynamic import of the SDK, is not read by (ii)
 * (toolSdkReexport, toolDynamicImport); R-IMPORTED-HANDLER a handler, or anything it calls, imported from another module is not
 * followed by (ii), the module's imports staying unresolved (toolImportedHandler); R-INVOKE-SPELLING a handler that reaches the
 * registry other than by calling a member or a binding named invoke - through a member name composed at run time, or through
 * call, apply, bind or Reflect on the method - is not read by (ii) (toolInvokeComposed).
 * RESIDUALS OF THE DERIVATIONS, cut #3 (the wb-5618 gate's F4 list and the known members of the families beside D1 and D4; each
 * with a pinned quiet row in DERIVATION_CONTROLS, named in parentheses): R-DESCRIPTOR-SHAPE a preview id stated other than as a
 * property of an object literal - a class field of a descriptor class (the gate's D7) or a property assigned after the object is
 * created (D8) - is not read by (i) (registerClassField, registerAssignedId); R-COMPUTED-HELPER the tool helper reached by an
 * expression that computes it rather than names it - through Function.prototype.call, apply or bind (D2), or chosen by a
 * conditional or logical expression - is not read by (ii) (toolHelperCall, toolHelperChosen); R-ASSIGNED-PATTERN the helper bound
 * to a variable through a destructuring assignment, object or array, is not read by (ii) (toolDestructuringAssignment);
 * R-SDK-SUBPATH the helper imported from a subpath of the agent SDK rather than the SDK itself (D9) is not read by (ii)
 * (toolSdkSubpath); R-QUALIFIED-TYPE JsonValue named through a qualified name of a namespace import (D3) is not read by (iii)
 * (projectQualifiedType); R-CONTEXTUAL-READING a function value whose parameter carries no type of its own, typed only by its
 * holder's type (a module type alias naming a function type, D5), is not read by (iii) (projectContextualType);
 * R-ASSIGNED-FUNCTION a projection held by a variable through an assignment rather than its initializer is not read by (iii)
 * (projectAssignedValue).
 * RESIDUALS OF THE DERIVATIONS, wb-23d1 (the wb-5618 landing-431 gate's F3 list, each quiet there beside red controls; each with
 * a pinned quiet row in DERIVATION_CONTROLS, named in parentheses): R-COMPUTED-HELPER gains the comma operator - a variable
 * bound to (0, tool), or the helper called as (0, tool)(...) (toolHelperComma, toolHelperCallComma) - and the chained
 * assignment make = other = tool (toolHelperChained), each an expression that computes the helper rather than names it;
 * R-PARAMETER-HELPER the helper bound to a parameter by its default value, which is no variable of the module, is not read by
 * (ii) (toolHelperParameter); R-QUALIFIED-TYPE gains JsonValue named through an import type, the registry module's path then
 * .JsonValue (projectImportType); R-OPTIONAL-READING gains a type parameter constrained by JsonValue, the parameter typed by it
 * (projectTypeParameter); R-MUTABLE-ID a preview id held by a let or a var of the module rather than a const is not read by (i)
 * (registerLetId; the var member registerVarId, wb-esaw, the landing-525 gate's F2); R-DESCRIPTOR-SHAPE gains an accessor stating
 * the id, a getter named id returning it (registerGetterId).
 * PRECISION (not escapes): the bare third segment is never a needle - the adapter's observation-freshness note ("observations: <n>
 * rows, <r> ...", wb-973.9) and rf's own counters (reused_component_count, observation_reused_count) read quiet (bareWord,
 * rfInstanceCounter, rfObservationCounter), and A1 reads the adapter and the fixture helper that spell them.
 * THE TRIGGER, ABSENT TODAY: Pi reads no render-report key and registers no rf surface beyond the preview (T1, T2). The armed half -
 * a Pi surface that reads the counter and echoes it under the producer's key and meaning - waits for the field to reach an rf
 * envelope; a cut that starts reading it re-judges this census rather than editing a witness.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, the bead export and the rf roster are
 * only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, mkdirSync, readdirSync, readFileSync, statSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVE_FIBER_CLI_SCHEMA,
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberSeam, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf, readRfResultRoster } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };
/** The envelope the injected-reader seam hands on; it validates nothing, which is what B1, B3 and C1 read. */
type InjectedEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;

const SELF = fileURLToPath(import.meta.url);
const HERE = dirname(SELF);
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-fiber-node-reuse-echo-roster.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const ROOT = process.cwd();
const BEAD = "wb-csbt.2";
const STATEMENT = "TSX-RESOURCE-EFFICIENCY-FRONTIER-R2";
const PIN = "76bbbffd9d4a";
const RF_VERSION = "0.1.832";
const CITATION = "docs/programs/resource-efficiency-frontier-2026-10-17/02-INCREMENTAL-ASSEMBLY-AND-REUSE.md:18@76bbbffd9d4a";
/** The root every judged envelope names: a fixture root, never a host path. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_VERSION = "1.0.0";
const GRANTS = ["reactivefiber:render"];

/** The producer's key path - the render report, its components object and the counter - each segment spelled so that no line of
 * this file spells two of them together (this file is under its own (a) guard). */
const SEGMENTS: readonly [string, string, string] = [["render", "Report"].join(""), "components", ["re", "used"].join("")];
const [FIRST, SECOND, THIRD] = SEGMENTS;
/** A camel key in rf's own spelling (rf's envelope keys are snake case). */
function snake(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
}
/** The two result-level keys a carrying fixture places the producer object under: the SDK's spelling, then rf's. */
const PLACEMENTS: readonly string[] = [FIRST, snake(FIRST)];
const PLACEMENT_KINDS: readonly string[] = ["sdk", "rf"];
/** The values a carrying fixture states: 0, the only value the pin reports, and 3. */
const VALUES: readonly number[] = [0, 3];
/** KEY's bound on a joining run of characters that are neither letters nor digits. */
const SEPARATOR = 6;
/** LABEL's vocabulary: the owner's own word in clause (a) and in the title, the nouns it qualifies, and the word window. */
const SKIP_WORDS: readonly string[] = ["skipped"];
const LABEL_NOUNS: readonly string[] = ["subtree", "subtrees", "component", "components"];
const WINDOW = 3;
/** The characters that end a LABEL unit, beside a line break. */
const UNIT_BREAKS = ",;:\"'`()[]{}<>=|";
/** Words that state a reuse or a skip figure, read over every string a projection surfaces (acceptance (c)). */
const FIGURE_WORDS: readonly string[] = ["reuse", "reused", "reuses", "reusing", "skip", "skips", "skipped", "skipping"];
/** The modules every reader enumeration must hold: the provider, the reader adapter and the native-evidence projection. */
const CORE_READERS: readonly string[] = ["src/workbench/native-evidence.ts", "src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"];
/** The reader floor measured at base (six modules). */
const READER_FLOOR = 6;

const JOIN = `(?:[\\s\\S]|[\\W_]{0,${SEPARATOR}})`;
/** KEY's two pairs, each read on its own so the full path reads both: the first segment then the second, the second then the third. */
const KEY_PATTERNS: readonly RegExp[] = [
  new RegExp(`${FIRST.replace(/([a-z])([A-Z])/g, "$1[\\W_]?$2")}${JOIN}${SECOND}`, "gi"),
  new RegExp(`${SECOND}${JOIN}${THIRD}`, "gi"),
];
const UNIT_SPLIT = new RegExp(`[\\n\\r${UNIT_BREAKS.replace(/[\\\]^[-]/g, character => `\\${character}`)}]+`);

/** KEY over a text, with the text it consumed (wb-5618 cut #3, the gate's U1 class): its whitespace runs are removed, then each
 * pattern runs as a replace pass that records every pair it matches and leaves the text as it was, each pass handing its own output
 * to the next - so the consumed text is what the last pass returned, and a text cut, blanked or substituted before or between the
 * passes is the text the reading reports. */
function keyReading(text: string): { pairs: string[]; consumed: string } {
  const pairs: string[] = [];
  let consumed = text.replace(/\s+/g, "");
  for (const pattern of KEY_PATTERNS) {
    consumed = consumed.replace(pattern, match => {
      pairs.push(match);
      return match;
    });
  }
  return { pairs, consumed };
}
/** KEY: every pair the text spells once its whitespace runs are removed. */
function keyPairsOf(text: string): string[] {
  return keyReading(text).pairs;
}
/** A unit's folded words: a lower-to-upper camel boundary becomes a space, then NFKC, lower case and alphanumeric runs. */
function foldedWords(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .normalize("NFKC")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 0);
}
/** One unit's LABELs: every SKIP_WORDS word with a LABEL_NOUNS word at most WINDOW words away, as the folded span between. */
function unitLabels(unit: string): string[] {
  const found: string[] = [];
  const words = foldedWords(unit);
  words.forEach((word, at) => {
    if (!SKIP_WORDS.includes(word)) return;
    const start = Math.max(0, at - WINDOW);
    const near = words.slice(start, at + WINDOW + 1).findIndex((other, index) => start + index !== at && LABEL_NOUNS.includes(other));
    if (near >= 0) found.push(words.slice(Math.min(at, start + near), Math.max(at, start + near) + 1).join(" "));
  });
  return found;
}
/** LABEL's split with its breaks kept: a text's parts alternate unit, break, unit, so the parts join back into the text. */
const UNIT_PARTS = new RegExp(`(${UNIT_SPLIT.source})`);
/** LABEL over a text, with the text it consumed (wb-5618 cut #3, the gate's U1 class): the text splits into units with its breaks
 * kept as parts of their own, each unit's LABELs are read as it is visited, and every visited part is appended to the consumed text
 * in order - so a text cut, blanked or substituted before the split is the text the reading reports. */
function labelReading(text: string): { labels: string[]; consumed: string } {
  const labels: string[] = [];
  let consumed = "";
  text.split(UNIT_PARTS).forEach((part, at) => {
    if (at % 2 === 0) labels.push(...unitLabels(part));
    consumed += part;
  });
  return { labels, consumed };
}
/** LABEL: every SKIP_WORDS word with a LABEL_NOUNS word at most WINDOW words away inside one unit, as the folded span between. */
function labelsOf(text: string): string[] {
  return labelReading(text).labels;
}
/** FIGURE: the FIGURE_WORDS words a list of surfaced strings carries. */
function figureWordsOf(texts: readonly string[]): string[] {
  return texts.flatMap(foldedWords).filter(word => FIGURE_WORDS.includes(word));
}
function digestOf(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

/** Spellings KEY must read: the producer's path or one of its pairs, spelled as code, JSON and prose. */
const KEY_CONTROLS: Readonly<Record<string, string>> = {
  dotPath: `report.${FIRST}.${SECOND}.${THIRD}`,
  optionalChain: `report?.${FIRST}?.${SECOND}?.${THIRD}`,
  bracketPath: `report[${JSON.stringify(FIRST)}][${JSON.stringify(SECOND)}][${JSON.stringify(THIRD)}]`,
  innerPair: `stats.${SECOND}.${THIRD} = 3;`,
  outerPair: `const part = result.${FIRST}.${SECOND};`,
  snakeOuter: `result.${snake(FIRST)}.${SECOND}`,
  jsonCompact: JSON.stringify({ [FIRST]: { [SECOND]: { [THIRD]: 3 } } }),
  jsonPretty: JSON.stringify({ [snake(FIRST)]: { [SECOND]: { [THIRD]: 3 } } }, null, 2),
  upperSnake: `${SECOND.toUpperCase()}_${THIRD.toUpperCase()}`,
  joinedCamel: `${SECOND}${THIRD.slice(0, 1).toUpperCase()}${THIRD.slice(1)}`,
  proseSpace: `the ${SECOND} ${THIRD} counter`,
  anyOneCharacter: `${SECOND}X${THIRD}`,
};
const SKIP = SKIP_WORDS[0] ?? "";
const SUBTREE = LABEL_NOUNS[0] ?? "";
const SUBTREES = LABEL_NOUNS[1] ?? "";
const COMPONENTS = LABEL_NOUNS[3] ?? "";
/** Labels LABEL must read: clause (a)'s phrase, the title's phrase, and code, JSON-key and prose spellings of either. */
const LABEL_CONTROLS: Readonly<Record<string, string>> = {
  ownerPhrase: `${SUBTREE} ${SKIP}`,
  titlePhrase: `${COMPONENTS} or ${SUBTREES} ${SKIP}`,
  countFirst: `3 ${COMPONENTS} ${SKIP}`,
  skipFirst: `${SKIP} 3 ${SUBTREES}`,
  camelKey: `stats.${SUBTREES}${SKIP.slice(0, 1).toUpperCase()}${SKIP.slice(1)}`,
  snakeKey: `${SUBTREES}_${SKIP}`,
  kebabKey: `${SUBTREE}-${SKIP}`,
  upperKey: `${COMPONENTS.toUpperCase()}_${SKIP.toUpperCase()}`,
  windowThree: `${COMPONENTS} were then ${SKIP}`,
  fullwidth: [...`${SUBTREE} ${SKIP}`].map(character => (character === " " ? character : String.fromCodePoint((character.codePointAt(0) ?? 0) + 0xfee0))).join(""),
};
/** Precision and residual controls: each must read quiet under KEY and LABEL both. */
const QUIET_CONTROLS: Readonly<Record<string, string>> = {
  bareWord: `observations: 2 rows, 2 ${THIRD}: partial`,
  rfInstanceCounter: `${THIRD}_component_count`,
  rfObservationCounter: `observation_${THIRD}_count`,
  secondAlone: `result.${SECOND} = []`,
  firstAlone: `the ${FIRST} object`,
  featureSkipping: `component-${SUBTREE} skipping`,
  featureSkipPredicate: "component skip predicate",
  featureWholeSubtree: `whole-${SUBTREE} skip`,
  vocabularyBypassed: `${SUBTREES} bypassed`,
  vocabularyElided: `${COMPONENTS} elided`,
  vocabularyOmitted: `${COMPONENTS} omitted`,
  windowFour: `${COMPONENTS} were then left ${SKIP}`,
  splitLine: `${SUBTREE}\n * ${SKIP}`,
  splitJsonKey: JSON.stringify({ [SKIP]: [SUBTREE] }),
  gradeList: JSON.stringify([`budget_gate:${SKIP}`, "component_revisions:passed"]),
  composedParts: `[${JSON.stringify(SECOND.slice(0, 5))} + ${JSON.stringify(SECOND.slice(5))}, ${JSON.stringify(THIRD)}].join(".")`,
  aliasRead: `const part = report.${SECOND};\nreturn part.${THIRD};`,
  longSeparator: `${SECOND} /* the inner key */ .${THIRD}`,
  // R-ESCAPE (wb-5618, the gate's L09e): the inner pair inside a string literal, its dot spelled as a backslash-u escape.
  escapeSpelled: `export const k = "${SECOND}\\u002e${THIRD}";`,
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const INNER_PAIR = `${SECOND}.${THIRD}`;
const OUTER_PAIR = `${FIRST}.${SECOND}`;
/** The judged rows: the trigger, then one row per owner acceptance clause; their shape is pinned and held to the roster and export. */
const ROWS: readonly Row[] = [
  {
    id: "T",
    label: `If any Pi surface ever reads \`${SEGMENTS.join(".")}\` through the rf envelope (whether the field reaches the rf envelope is unknown today; Pi's rf reader reads no components key)`,
    pins: ["T1", "T2"],
  },
  {
    id: "A",
    label: `(a) guard grep for ${INNER_PAIR}|${SUBTREE} ${SKIP} over Pi src and test = 0 (0 today at d75b68d); the guard targets \`${INNER_PAIR}\`/\`${OUTER_PAIR}\`, never the bare word ${THIRD}`,
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label: `(b) a fixture envelope carrying ${INNER_PAIR} renders the producer key name verbatim with no Pi-authored semantic label`,
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C",
    label: "(c) if the key is absent from the envelope Pi surfaces no reuse/skip figure at all (never synthesized)",
    pins: ["C1", "C2", "C3"],
  },
];
/** BOUND (wb-5618): each pin of rows T and B and the anchor outside this file and its roster it is held to - for T a term of the
 * export title's absent-today note, for B a reading surface src derives (surfaceDerivation), keyed `<module>#<symbol>`. */
const BINDINGS: Readonly<Record<string, string>> = {
  T1: "Pi's rf reader reads no components key",
  T2: "whether the field reaches the rf envelope is unknown today",
  B1: "src/workbench/providers/reactivefiber.ts#registerReactiveFiberRender",
  B2: "src/workbench/providers/reactivefiber.ts#registerNativeReactiveFiberRender",
  B3: "src/workbench/claude-capability-tools.ts#capability_invoke",
  B4: "src/workbench/reactivefiber-observer.ts#reactivefiberTopology",
  B5: "src/workbench/native-evidence.ts#nativeEvidence",
};
/** BOUND (wb-5618): the surfaces each pin's case reached as it ran - the src function it called, by that function's own name, or
 * the agent tool it called - so a B binding is proven at run time rather than only named. */
const REACHED = new Map<string, Set<string>>();
let runningPin = "";
function reach(symbol: string): void {
  if (runningPin === "") return;
  const symbols = REACHED.get(runningPin) ?? new Set<string>();
  symbols.add(symbol);
  REACHED.set(runningPin, symbols);
}
/** Runs one pin's case with reach() recording under that pin. */
async function runAs(pin: string, impl: () => Promise<JsonValue>): Promise<JsonValue> {
  runningPin = pin;
  try {
    return await impl();
  } finally {
    runningPin = "";
  }
}

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly labelDigest: string;
  readonly pins: readonly RosterPin[];
}
interface Vocabulary {
  readonly segments: readonly string[];
  readonly placements: readonly string[];
  readonly values: readonly number[];
  readonly separator: number;
  readonly skipWords: readonly string[];
  readonly labelNouns: readonly string[];
  readonly window: number;
  readonly unitBreaks: string;
  readonly figureWords: readonly string[];
  readonly coreReaders: readonly string[];
  readonly readerFloor: number;
}
interface Roster {
  readonly bead: string;
  readonly statement: string;
  readonly pin: string;
  readonly rfVersion: string;
  readonly citation: string;
  readonly vocabulary: Vocabulary;
  readonly rows: readonly RosterRow[];
  /** The bound case's witness (wb-5618). */
  readonly bound: JsonValue;
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function numbers(value: unknown, field: string): number[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "number")) throw new Error(`roster ${field} must be a number list`);
  return value;
}
function integer(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value)) throw new Error(`roster ${field} must be an integer`);
  return value;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) throw new Error(`roster ${field} must be a non-empty string`);
  return value;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. The segments are
 * stored split into parts (the roster is under (a)'s guard too) and joined here. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.vocabulary)) throw new Error("roster must be an object with rows and a vocabulary");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.labelDigest !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a labelDigest and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, labelDigest: row.labelDigest, pins };
  });
  const { vocabulary } = raw;
  if (!Array.isArray(vocabulary.segments) || !vocabulary.segments.every(parts => Array.isArray(parts))) throw new Error("roster vocabulary.segments must be a list of part lists");
  if (!isObject(raw.bound)) throw new Error("roster must hold the bound case's witness as an object");
  const segments = vocabulary.segments.map((parts: unknown, index: number) => strings(parts, `vocabulary.segments[${index}]`).join(""));
  return {
    bead: text(raw.bead, "bead"),
    statement: text(raw.statement, "statement"),
    pin: text(raw.pin, "pin"),
    rfVersion: text(raw.rfVersion, "rfVersion"),
    citation: text(raw.citation, "citation"),
    vocabulary: {
      segments,
      placements: strings(vocabulary.placements, "vocabulary.placements"),
      values: numbers(vocabulary.values, "vocabulary.values"),
      separator: integer(vocabulary.separator, "vocabulary.separator"),
      skipWords: strings(vocabulary.skipWords, "vocabulary.skipWords"),
      labelNouns: strings(vocabulary.labelNouns, "vocabulary.labelNouns"),
      window: integer(vocabulary.window, "vocabulary.window"),
      unitBreaks: text(vocabulary.unitBreaks, "vocabulary.unitBreaks"),
      figureWords: strings(vocabulary.figureWords, "vocabulary.figureWords"),
      coreReaders: strings(vocabulary.coreReaders, "vocabulary.coreReaders"),
      readerFloor: integer(vocabulary.readerFloor, "vocabulary.readerFloor"),
    },
    rows,
    bound: json(raw.bound),
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** The character a lossy UTF-8 decode puts in place of bytes it cannot read (A1's liveness, wb-5618). */
const REPLACEMENT = String.fromCodePoint(0xfffd);
/** A file's bytes as read from disk, or none when it cannot be read (A1's liveness, wb-5618 respin #1). */
function bytesOf(path: string): Uint8Array {
  try {
    return readFileSync(path);
  } catch {
    return new Uint8Array(0);
  }
}
/** The strict UTF-8 decode of a file's bytes, a byte order mark kept as readFileSync keeps it, or undefined when the bytes are not
 * valid UTF-8: lossiness is decided from the file's own bytes, never from the scanned text (respin #1, the gate's U1). */
function strictDecode(bytes: Uint8Array): string | undefined {
  try {
    return new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes);
  } catch {
    return undefined;
  }
}
/** A1's liveness: whether a scanned text is a file's whole content. A file whose bytes decode strictly counts only when the text's
 * UTF-8 length is the file's size on disk and the text is that decode; a lossy file only when the text is the lossy decode of the
 * whole file - so no blanked, cut-short or substituted text counts, whatever character it carries. */
function scannedWhole(content: string, bytes: Uint8Array, size: number): { lossy: boolean; whole: boolean } {
  const strict = strictDecode(bytes);
  if (strict !== undefined) return { lossy: false, whole: bytes.length === size && Buffer.byteLength(content) === size && content === strict };
  return { lossy: true, whole: bytes.length === size && content === new TextDecoder("utf-8", { ignoreBOM: true }).decode(bytes) };
}
/** A1's liveness over what the two readings consumed (wb-5618 cut #3, the gate's U1 class): LABEL's consumed text must be the
 * file's whole content as scannedWhole judges it against the file's own bytes, and KEY's consumed text that content with its
 * whitespace runs removed - so neither reading can run over less than the file while the file counts as read. */
function readingsWhole(keyConsumed: string, labelConsumed: string, bytes: Uint8Array, size: number): { lossy: boolean; whole: boolean } {
  const read = scannedWhole(labelConsumed, bytes, size);
  return { lossy: read.lossy, whole: read.whole && keyConsumed === labelConsumed.replace(/\s+/g, "") };
}
/** A1's reading of one file, the walk's own: its KEY pairs and LABELs, and whether the texts the two readings consumed are its
 * whole content (readingsWhole). */
function scanFile(path: string): { keyPairs: string[]; labels: string[]; lossy: boolean; whole: boolean } {
  const content = textOf(path);
  const key = keyReading(content);
  const label = labelReading(content);
  return { keyPairs: key.pairs, labels: label.labels, ...readingsWhole(key.consumed, label.consumed, bytesOf(path), statSync(path).size) };
}
/** The bead's row of the tracked bead export: its title and its notes. */
function exportRow(): { title: string; notes: string } {
  const rows: unknown[] = textOf(EXPORT_PATH)
    .split("\n")
    .filter(entry => entry.includes(`"id":"${BEAD}"`))
    .map(entry => JSON.parse(entry) as unknown);
  const row = rows.find(entry => isObject(entry) && entry.id === BEAD);
  if (!isObject(row) || typeof row.title !== "string") throw new Error(`the bead export holds no ${BEAD} row`);
  return { title: row.title, notes: typeof row.notes === "string" ? row.notes : "" };
}
/** The owner filing's acceptance clauses, read from the export row: "(a) ...", "(b) ...", "(c) ...". */
function ownerClauses(): string[] {
  const { notes } = exportRow();
  const start = notes.indexOf("Acceptance: ");
  const end = notes.indexOf(". Not P0:", start);
  if (start < 0 || end < 0) throw new Error(`the ${BEAD} export row states no acceptance sentence`);
  return notes.slice(start + "Acceptance: ".length, end).split(/; (?=\([a-z]\) )/);
}
/** The program line the filing quotes, read from the export row. */
function exportQuote(): string {
  const { notes } = exportRow();
  const start = notes.indexOf('Quote: "');
  const end = notes.indexOf(`" ${CITATION.split(":")[0]}`, start);
  if (start < 0 || end < 0) throw new Error(`the ${BEAD} export row quotes no program line`);
  return notes.slice(start + 'Quote: "'.length, end);
}
/** Row T's anchor (wb-5618), read from the export title: the trigger - its opening condition (after the statement id, up to the
 * first comma) and its closing absent-today note (the last parenthetical, just before the citation) - and the note's terms, split
 * at its semicolons. */
function exportTrigger(): { text: string; terms: string[] } {
  const { title } = exportRow();
  const opening = `[${STATEMENT}] `;
  const conditionEnd = title.indexOf(", ");
  const noteStart = title.lastIndexOf(" (");
  const noteEnd = title.lastIndexOf(`) - ${CITATION}`);
  if (!title.startsWith(opening) || conditionEnd < 0 || noteStart < conditionEnd || noteEnd < noteStart) throw new Error(`the ${BEAD} export title states no trigger`);
  const condition = title.slice(opening.length, conditionEnd);
  const note = title.slice(noteStart + " (".length, noteEnd);
  return { text: `${condition} (${note})`, terms: note.split("; ") };
}
function backticked(value: string): string[] {
  return [...value.matchAll(/`([^`]+)`/g)].map(match => match[1] ?? "");
}

/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** Every string a JSON value holds, keys included: what a surfaced value shows. */
function wordLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(wordLeaves);
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [key, ...wordLeaves(item)]);
  return [];
}
function numberLeaves(value: unknown): number[] {
  if (typeof value === "number") return [value];
  if (Array.isArray(value)) return value.flatMap(numberLeaves);
  if (isObject(value)) return Object.values(value).flatMap(numberLeaves);
  return [];
}
/** Every key at any depth of a JSON value. */
function keysAtAnyDepth(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(keysAtAnyDepth);
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [key, ...keysAtAnyDepth(item)]);
  return [];
}
/** The keys of a value that spell the first segment either way. */
function firstSegmentKeys(value: unknown): string[] {
  return keysAtAnyDepth(value).filter(key => PLACEMENTS.includes(key));
}

interface Fixture {
  readonly kind: string;
  readonly placement: string;
  readonly value: number;
  readonly envelope: JsonObject;
}
function resultOf(envelope: JsonObject): JsonObject {
  return objectOf(envelope.result, "envelope result");
}
/** The plain full-shape envelope: no render-report key anywhere. */
function plainEnvelope(root: string): JsonObject {
  return objectOf(json(fullShapeRf(root)), "full-shape envelope");
}
/** The CONSTRUCTED carrying fixtures, one per placement and value, each built fresh. */
function carryingFixtures(root: string): Fixture[] {
  return PLACEMENTS.flatMap((placement, at) =>
    VALUES.map(value => {
      const envelope = plainEnvelope(root);
      resultOf(envelope)[placement] = { [SECOND]: { [THIRD]: value } };
      return { kind: PLACEMENT_KINDS[at] ?? "unknown", placement, value, envelope };
    }),
  );
}
/** The producer object's counter as a reading's source states it, or null when the path is absent. */
function producerValue(source: JsonValue | undefined, placement: string): JsonValue {
  const result = isObject(source) ? source.result : undefined;
  const report = isObject(result) ? result[placement] : undefined;
  const part = isObject(report) ? report[SECOND] : undefined;
  return isObject(part) && Object.hasOwn(part, THIRD) ? json(part[THIRD]) : null;
}
/** The plain envelope with rf's own instance counter set, the render-report key still absent. */
function counterEnvelope(root: string, count: number): JsonObject {
  const envelope = plainEnvelope(root);
  objectOf(resultOf(envelope).work_metrics, "work_metrics").reused_component_count = count;
  return envelope;
}
/** One observation row in the pinned context.render shape (the observer suite's), observed and read from an earlier render. */
function reusedObservationRow(at: number): JsonObject {
  return {
    observation_id: `rfl_${String(at).padStart(22, "0")}`,
    lens_key: "beads.current",
    value_digest: `sha256:${"d4".repeat(32)}`,
    status: "observed",
    code: null,
    freshness: THIRD,
    replayed: true,
    required: true,
    degraded: false,
    persisted: true,
  };
}
function observationEnvelope(root: string): JsonObject {
  const envelope = plainEnvelope(root);
  resultOf(envelope).observations = [reusedObservationRow(1), reusedObservationRow(2)];
  return envelope;
}

/** Every regular file below a root; symlinks are not followed and dot directories are. */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
function repoPath(file: string): string {
  return relative(REPO, file).split(sep).join("/");
}

interface ReaderLexicon {
  readonly file: string;
  readonly keys: string[];
  readonly literals: string[];
  readonly specifiers: string[];
}
/** One module's lexicon: every key it reads or writes (property access, string element access, binding and object-literal keys),
 * every string and no-substitution template literal, and every static or dynamic import specifier. */
function lexiconOf(fileName: string, source: string): ReaderLexicon {
  const tree = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const keys: string[] = [];
  const literals: string[] = [];
  const specifiers: string[] = [];
  const named = (name: ts.Node | undefined): void => {
    if (name !== undefined && (ts.isIdentifier(name) || ts.isStringLiteralLike(name))) keys.push(name.text);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAccessExpression(node)) keys.push(node.name.text);
    else if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) keys.push(node.argumentExpression.text);
    else if (ts.isBindingElement(node)) named(node.propertyName ?? node.name);
    else if (ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) named(node.name);
    if (ts.isStringLiteralLike(node)) literals.push(node.text);
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier)) {
      specifiers.push(node.moduleSpecifier.text);
    }
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const [first] = node.arguments;
      if (first !== undefined && ts.isStringLiteralLike(first)) specifiers.push(first.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return { file: fileName, keys, literals, specifiers };
}
/** The four test extensions A1 requires its walk to read; each also carries one far plant (wb-5618 cut #3). */
const TEST_EXTENSIONS: readonly string[] = [".json", ".md", ".mjs", ".ts"];
const READER_SPECIFIER = /(?:^|\/)(?:providers\/reactivefiber|reactivefiber-observer)\.js$/;
let readerCache: ReaderLexicon[] | undefined;
/** Whether a module's lexicon makes it a Pi rf reader: it imports the provider or the adapter, or spells the capability id whole. */
function isRfReader(lexicon: ReaderLexicon): boolean {
  return lexicon.specifiers.some(specifier => READER_SPECIFIER.test(specifier)) || lexicon.literals.includes(PREVIEW_ID);
}
/** Pi's rf readers: every src .ts module importing the provider or the adapter, or spelling the capability id as a whole literal. */
function rfReaders(): ReaderLexicon[] {
  readerCache ??= filesBelow(join(REPO, "src"))
    .filter(file => file.endsWith(".ts"))
    .map(file => lexiconOf(repoPath(file), textOf(file)))
    .filter(isRfReader);
  return readerCache;
}
/** A key naming the first segment (either spelling) or the second, in any case. */
function namesObjectKey(key: string): boolean {
  return [FIRST, snake(FIRST), SECOND].some(entry => entry.toLowerCase() === key.toLowerCase());
}
/** A literal whose folded words name the second segment, or the first segment's two parts in order. */
function namesObjectLiteral(literal: string): boolean {
  const words = foldedWords(literal);
  const [head, tail] = foldedWords(FIRST);
  return words.includes(SECOND) || words.some((word, at) => word === head && words[at + 1] === tail);
}

/** Every node of a tree, depth first. */
function nodesOf(root: ts.Node): ts.Node[] {
  const found: ts.Node[] = [];
  const visit = (node: ts.Node): void => {
    found.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}
/** An expression with its parentheses, type assertions, satisfies clauses and non-null assertions taken off. */
function unwrapped(expression: ts.Expression): ts.Expression {
  let at = expression;
  while (ts.isParenthesizedExpression(at) || ts.isAsExpression(at) || ts.isSatisfiesExpression(at) || ts.isTypeAssertionExpression(at) || ts.isNonNullExpression(at)) at = at.expression;
  return at;
}
/** A src module's syntax with the checker of a one-file program over it (BOUND, respin #1): a name resolves to its declarations the
 * way TypeScript resolves it inside the module - its own scopes, no lib, its imports unresolved, so an imported binding resolves
 * to its import declaration. */
interface ModuleSyntax {
  readonly file: string;
  readonly tree: ts.SourceFile;
  readonly checker: ts.TypeChecker;
  readonly nodes: readonly ts.Node[];
}
function moduleSyntax(file: string, source: string): ModuleSyntax {
  const name = `/${file}`;
  const tree = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const options: ts.CompilerOptions = { noLib: true, noResolve: true, types: [], target: ts.ScriptTarget.Latest, module: ts.ModuleKind.ESNext };
  const host: ts.CompilerHost = {
    fileExists: path => path === name,
    readFile: path => (path === name ? source : undefined),
    getSourceFile: path => (path === name ? tree : undefined),
    getDefaultLibFileName: () => "/lib.d.ts",
    writeFile: () => undefined,
    getCurrentDirectory: () => "/",
    getCanonicalFileName: path => path,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
  };
  const checker = ts.createProgram({ rootNames: [name], options, host }).getTypeChecker();
  return { file, tree, checker, nodes: nodesOf(tree) };
}
/** The declarations of this module a name resolves to, a shorthand property's value included. */
function declarationsOf(syntax: ModuleSyntax, name: ts.Identifier): ts.Declaration[] {
  const symbol = ts.isShorthandPropertyAssignment(name.parent) && name.parent.name === name ? syntax.checker.getShorthandAssignmentValueSymbol(name.parent) : syntax.checker.getSymbolAtLocation(name);
  return (symbol?.declarations ?? []).filter(declaration => declaration.getSourceFile() === syntax.tree);
}
/** The module an import binding is imported from, or undefined for any other node. */
function importedFrom(node: ts.Node): string | undefined {
  for (let at: ts.Node | undefined = node; at !== undefined; at = at.parent) {
    if (ts.isImportDeclaration(at)) return ts.isStringLiteralLike(at.moduleSpecifier) ? at.moduleSpecifier.text : undefined;
  }
  return undefined;
}
interface ModuleExport {
  readonly name: string;
  readonly declarations: readonly ts.Node[];
}
/** Every name the module exports, with the declarations of this module it exports - by an export modifier, an export list (its
 * aliases included) or export default; a re-export from another module exports no declaration of this one. */
function exportsOf(syntax: ModuleSyntax): ModuleExport[] {
  const module = syntax.checker.getSymbolAtLocation(syntax.tree);
  if (module === undefined) return [];
  return syntax.checker.getExportsOfModule(module).map(symbol => {
    const target = (symbol.flags & ts.SymbolFlags.Alias) !== 0 ? syntax.checker.getAliasedSymbol(symbol) : symbol;
    const own = (symbol.declarations ?? []).filter(declaration => ts.isExportAssignment(declaration));
    return { name: symbol.name, declarations: [...new Set([...own, ...(target.declarations ?? [])])].filter(declaration => declaration.getSourceFile() === syntax.tree) };
  });
}
/** The function a declaration states: a function declaration, or a variable or export default holding a function value (directly,
 * or through a name of the module bound to one). */
function functionOf(syntax: ModuleSyntax, declaration: ts.Node, seen: Set<ts.Node> = new Set()): ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression | undefined {
  if (seen.has(declaration)) return undefined;
  seen.add(declaration);
  if (ts.isFunctionDeclaration(declaration)) return declaration;
  const value = ts.isVariableDeclaration(declaration) ? declaration.initializer : ts.isExportAssignment(declaration) ? declaration.expression : undefined;
  const held = value === undefined ? undefined : unwrapped(value);
  if (held === undefined) return undefined;
  if (ts.isArrowFunction(held) || ts.isFunctionExpression(held)) return held;
  if (!ts.isIdentifier(held)) return undefined;
  for (const bound of declarationsOf(syntax, held)) {
    const found = functionOf(syntax, bound, seen);
    if (found !== undefined) return found;
  }
  return undefined;
}
/** The node a function value is held by: the variable or export default holding it, or the function itself. */
function holderOf(fn: ts.Node): ts.Node {
  let at = fn;
  while (at.parent !== undefined && (ts.isParenthesizedExpression(at.parent) || ts.isAsExpression(at.parent) || ts.isSatisfiesExpression(at.parent) || ts.isTypeAssertionExpression(at.parent) || ts.isNonNullExpression(at.parent))) at = at.parent;
  return at.parent !== undefined && (ts.isVariableDeclaration(at.parent) || ts.isExportAssignment(at.parent)) ? at.parent : fn;
}
/** The names the exported function a node lies in is exported under, or (module) when it lies in none. */
function enclosingExport(exported: readonly ModuleExport[], node: ts.Node): string {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if (!ts.isFunctionDeclaration(at) && !ts.isArrowFunction(at) && !ts.isFunctionExpression(at)) continue;
    const holder = holderOf(at);
    const names = exported.filter(entry => entry.declarations.includes(holder)).map(entry => entry.name);
    if (names.length > 0) return names.sort().join(",");
  }
  return "(module)";
}
/** Whether a type names JsonValue: directly, through an import alias of it, or through a type alias of the module naming it, each
 * inside any parentheses (cut #3, the wb-5618 gate's D4). */
function namesJsonValue(syntax: ModuleSyntax, type: ts.TypeNode | undefined, seen: Set<ts.Node> = new Set()): boolean {
  if (type !== undefined && ts.isParenthesizedTypeNode(type)) return namesJsonValue(syntax, type.type, seen);
  if (type === undefined || !ts.isTypeReferenceNode(type) || !ts.isIdentifier(type.typeName)) return false;
  if (type.typeName.text === "JsonValue") return true;
  return declarationsOf(syntax, type.typeName).some(declaration => {
    if (seen.has(declaration)) return false;
    seen.add(declaration);
    if (ts.isImportSpecifier(declaration)) return (declaration.propertyName ?? declaration.name).text === "JsonValue";
    return ts.isTypeAliasDeclaration(declaration) && namesJsonValue(syntax, declaration.type, seen);
  });
}
/** A property's name as text: a plain or string name, or a computed name that is a string literal. */
function propertyNameText(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name)) return name.text;
  const computed = ts.isComputedPropertyName(name) ? unwrapped(name.expression) : undefined;
  return computed !== undefined && ts.isStringLiteralLike(computed) ? computed.text : undefined;
}
/** A string an expression states: a literal, or a const of the module holding one - its initializer a literal or, followed
 * transitively, another such const (wb-23d1, the wb-5618 landing-431 gate's F4: registerConstChain, toolNameConstChain). */
function stringOf(syntax: ModuleSyntax, expression: ts.Expression, seen: Set<ts.Node> = new Set()): string | undefined {
  const value = unwrapped(expression);
  if (ts.isStringLiteralLike(value)) return value.text;
  if (!ts.isIdentifier(value)) return undefined;
  for (const declaration of declarationsOf(syntax, value)) {
    if (seen.has(declaration) || !ts.isVariableDeclaration(declaration) || declaration.initializer === undefined || (ts.getCombinedNodeFlags(declaration) & ts.NodeFlags.Const) === 0) continue;
    seen.add(declaration);
    const held = stringOf(syntax, declaration.initializer, seen);
    if (held !== undefined) return held;
  }
  return undefined;
}
/** (i) A Pi rf reader's preview-id properties, keyed by the exported function each lies in. */
function registrationsOf(syntax: ModuleSyntax, exported: readonly ModuleExport[]): string[] {
  const found: string[] = [];
  for (const node of syntax.nodes) {
    const value = ts.isPropertyAssignment(node) && propertyNameText(node.name) === "id" ? node.initializer : ts.isShorthandPropertyAssignment(node) && node.name.text === "id" ? node.name : undefined;
    if (value === undefined || stringOf(syntax, value) !== PREVIEW_ID) continue;
    const key = `${syntax.file}#${enclosingExport(exported, node)}`;
    if (!found.includes(key)) found.push(key);
  }
  return found;
}
/** The member name an access spells: a property name, or an element access by a string literal. */
function memberName(access: ts.PropertyAccessExpression | ts.ElementAccessExpression): string | undefined {
  if (ts.isPropertyAccessExpression(access)) return access.name.text;
  const key = unwrapped(access.argumentExpression);
  return ts.isStringLiteralLike(key) ? key.text : undefined;
}
/** Whether a callee calls a member or a binding named invoke. */
function callsInvoke(expression: ts.Expression): boolean {
  const callee = unwrapped(expression);
  if (ts.isPropertyAccessExpression(callee) || ts.isElementAccessExpression(callee)) return memberName(callee) === "invoke";
  return ts.isIdentifier(callee) && callee.text === "invoke";
}
/** Whether nodes, or the declarations of the module any name in them resolves to (followed transitively), call invoke. */
function reachesInvoke(syntax: ModuleSyntax, roots: readonly ts.Node[]): boolean {
  const seen = new Set<ts.Node>();
  const pending = [...roots];
  for (let root = pending.pop(); root !== undefined; root = pending.pop()) {
    if (seen.has(root)) continue;
    seen.add(root);
    for (const node of nodesOf(root)) {
      if (ts.isCallExpression(node) && callsInvoke(node.expression)) return true;
      if (ts.isIdentifier(node)) pending.push(...declarationsOf(syntax, node).filter(declaration => !seen.has(declaration)));
    }
  }
  return false;
}
/** Whether a declaration binds the agent SDK module itself: a namespace or default import of it. */
function bindsAgentSdk(declaration: ts.Node): boolean {
  return (ts.isNamespaceImport(declaration) || ts.isImportClause(declaration)) && importedFrom(declaration) === AGENT_SDK;
}
/** The assignment operators that bind their right side to their target as an initializer does: =, ??=, ||= and &&=. */
const BINDING_ASSIGNMENTS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.EqualsToken,
  ts.SyntaxKind.QuestionQuestionEqualsToken,
  ts.SyntaxKind.BarBarEqualsToken,
  ts.SyntaxKind.AmpersandAmpersandEqualsToken,
]);
/** The values a variable of the module is bound to (cut #3, the wb-5618 gate's D1): its initializer, and the right side of every
 * assignment of the module whose target is the variable itself (=, ??=, ||= or &&=), wherever the assignment lies. */
function valuesOf(syntax: ModuleSyntax, declaration: ts.VariableDeclaration): ts.Expression[] {
  const assigned = syntax.nodes.flatMap(node => {
    if (!ts.isBinaryExpression(node) || !BINDING_ASSIGNMENTS.has(node.operatorToken.kind)) return [];
    const target = unwrapped(node.left);
    return ts.isIdentifier(target) && declarationsOf(syntax, target).includes(declaration) ? [node.right] : [];
  });
  return declaration.initializer === undefined ? assigned : [declaration.initializer, ...assigned];
}
/** Whether a callee is the agent SDK's tool helper: imported by name from the SDK itself (aliases included), a member (by name or by
 * a string element access) of a namespace or default import of the SDK, or a variable of the module bound to either by its
 * initializer (plain, or an object destructuring of a namespace or default import) or by an assignment to the variable itself. */
function isToolHelper(syntax: ModuleSyntax, expression: ts.Expression, seen: Set<ts.Node> = new Set()): boolean {
  const callee = unwrapped(expression);
  if (ts.isPropertyAccessExpression(callee) || ts.isElementAccessExpression(callee)) {
    const owner = unwrapped(callee.expression);
    return memberName(callee) === "tool" && ts.isIdentifier(owner) && declarationsOf(syntax, owner).some(bindsAgentSdk);
  }
  if (!ts.isIdentifier(callee)) return false;
  return declarationsOf(syntax, callee).some(declaration => {
    if (seen.has(declaration)) return false;
    seen.add(declaration);
    if (ts.isImportSpecifier(declaration)) return importedFrom(declaration) === AGENT_SDK && (declaration.propertyName ?? declaration.name).text === "tool";
    if (ts.isVariableDeclaration(declaration)) return valuesOf(syntax, declaration).some(value => isToolHelper(syntax, value, seen));
    if (!ts.isBindingElement(declaration) || !ts.isObjectBindingPattern(declaration.parent) || !ts.isVariableDeclaration(declaration.parent.parent)) return false;
    const key = declaration.propertyName ?? declaration.name;
    const source = declaration.parent.parent.initializer === undefined ? undefined : unwrapped(declaration.parent.parent.initializer);
    return !ts.isObjectBindingPattern(key) && !ts.isArrayBindingPattern(key) && propertyNameText(key) === "tool" && source !== undefined && ts.isIdentifier(source) && declarationsOf(syntax, source).some(bindsAgentSdk);
  });
}
/** (ii) A module's agent-SDK tools whose handler invokes the registry, keyed by the tool's name (else (unnamed)). */
function toolsOf(syntax: ModuleSyntax): string[] {
  const found: string[] = [];
  for (const node of syntax.nodes) {
    if (!ts.isCallExpression(node) || !isToolHelper(syntax, node.expression)) continue;
    const [name, ...rest] = node.arguments;
    if (!reachesInvoke(syntax, rest)) continue;
    found.push(`${syntax.file}#${(name === undefined ? undefined : stringOf(syntax, name)) ?? "(unnamed)"}`);
  }
  return found;
}
/** (iii) An envelope reader's exports that are reading functions, keyed by the name each is exported under. */
function projectionsOf(syntax: ModuleSyntax, exported: readonly ModuleExport[]): string[] {
  return exported
    .filter(entry => entry.declarations.some(declaration => (functionOf(syntax, declaration)?.parameters ?? []).some(parameter => namesJsonValue(syntax, parameter.type))))
    .map(entry => `${syntax.file}#${entry.name}`);
}
/** The rf envelope's schema constant: a Pi rf reader whose syntax names it reads the envelope itself (an ENVELOPE READER). */
const ENVELOPE_SCHEMA_CONSTANT = "REACTIVE_FIBER_CLI_SCHEMA";
/** The agent SDK whose tool helper defines the curated agent server's tools. */
const AGENT_SDK = "@anthropic-ai/claude-agent-sdk";
interface ModuleSurfaces {
  readonly file: string;
  readonly reader: boolean;
  readonly envelopeReader: boolean;
  readonly registrations: readonly string[];
  readonly tools: readonly string[];
  readonly projections: readonly string[];
}
/** BOUND: the reading surfaces one src module states, read from its own source - (i) if it is a Pi rf reader, (iii) if it is an
 * envelope reader, (ii) if it names the agent SDK. */
function moduleSurfaces(file: string, source: string): ModuleSurfaces {
  const reader = isRfReader(lexiconOf(file, source));
  const namesAgentSdk = source.includes(AGENT_SDK);
  if (!reader && !namesAgentSdk) return { file, reader, envelopeReader: false, registrations: [], tools: [], projections: [] };
  const syntax = moduleSyntax(file, source);
  const exported = exportsOf(syntax);
  const envelopeReader = reader && syntax.nodes.some(node => ts.isIdentifier(node) && node.text === ENVELOPE_SCHEMA_CONSTANT);
  return {
    file,
    reader,
    envelopeReader,
    registrations: reader ? registrationsOf(syntax, exported) : [],
    tools: namesAgentSdk ? toolsOf(syntax) : [],
    projections: envelopeReader ? projectionsOf(syntax, exported) : [],
  };
}
interface SurfaceDerivation {
  readonly readers: number;
  readonly envelopeReaders: readonly string[];
  readonly registrations: readonly string[];
  readonly tools: readonly string[];
  readonly projections: readonly string[];
}
let derivationCache: SurfaceDerivation | undefined;
/** BOUND (wb-5618): the reading surfaces src states, derived one module at a time and never restated, each keyed
 * `<module>#<name>` - (i) registrations, (ii) tools, (iii) projections, in the spellings the header lists. */
function surfaceDerivation(): SurfaceDerivation {
  if (derivationCache !== undefined) return derivationCache;
  const modules = filesBelow(join(REPO, "src"))
    .filter(entry => entry.endsWith(".ts"))
    .map(path => moduleSurfaces(repoPath(path), textOf(path)));
  derivationCache = {
    readers: modules.filter(entry => entry.reader).length,
    envelopeReaders: modules.filter(entry => entry.envelopeReader).map(entry => entry.file),
    registrations: modules.flatMap(entry => entry.registrations).sort(),
    tools: modules.flatMap(entry => entry.tools).sort(),
    projections: modules.flatMap(entry => entry.projections).sort(),
  };
  return derivationCache;
}
/** Every reading surface src derives, sorted. */
function derivedSurfaces(): string[] {
  const derivation = surfaceDerivation();
  return [...derivation.registrations, ...derivation.tools, ...derivation.projections].sort();
}
/** The module path the derivation controls are read as (no such src module exists). */
const CONTROL_MODULE = "src/workbench/derivation-control.ts";
const REGISTRAR = 'import type { CapabilityRegistry } from "./capability-registry.js";\nimport { REACTIVE_FIBER_CONTRACT_SOURCE } from "./providers/reactivefiber.js";\n';
const registers = (id: string): string => `registry.register({ descriptor: { id: ${id}, contractSource: REACTIVE_FIBER_CONTRACT_SOURCE } } as never);`;
const PREVIEW = JSON.stringify(PREVIEW_ID);
const toolModule = (helper: string, body: string): string =>
  `${helper}\nimport type { CapabilityRegistry } from "./capability-registry.js";\nexport function probeTools(registry: CapabilityRegistry) {\n${body}\n}\n`;
const NAMED_TOOL = `import { tool } from "${AGENT_SDK}";`;
const INVOKING = 'async () => registry.invoke("x", {}, {} as never)';
const READER_HEAD = `import type { JsonValue } from "./capability-registry.js";\nimport { ${ENVELOPE_SCHEMA_CONSTANT} } from "./providers/reactivefiber.js";\nexport const schema = ${ENVELOPE_SCHEMA_CONSTANT};\n`;
const PROJECTING = "{\n  return JSON.stringify(value);\n}";
/** BOUND (respin #1, cut #3, wb-23d1, wb-esaw): the derivation's own controls, each a module source read through moduleSurfaces
 * as CONTROL_MODULE - a positive row for every alternative (i)-(iii) read, on its own, and for each interaction or quantifier
 * spelling POSITIVE ROWS names (cut #3 adds toolAssigned, toolAssignedLogical and projectParenthesized; wb-23d1 and wb-esaw
 * add the rows POSITIVE ROWS names for each), precision rows for what they must not read, and one quiet row per named residual
 * of the derivations (registerComposedId, registerImportedId, registerLetId, registerVarId, registerClassField,
 * registerAssignedId, registerGetterId, toolPiDefineTool, toolSdkReexport, toolDynamicImport,
 * toolImportedHandler, toolInvokeComposed, toolDestructuringAssignment, toolHelperCall, toolHelperChosen, toolHelperComma,
 * toolHelperCallComma, toolHelperChained, toolHelperParameter, toolSdkSubpath, projectOptionalReading, projectTypeParameter,
 * projectMember, projectReexport, projectSchemaLiteral, projectQualifiedType, projectImportType, projectContextualType,
 * projectAssignedValue). The bound witness holds what each derives. */
const DERIVATION_CONTROLS: Readonly<Record<string, string>> = {
  registerLiteral: `${REGISTRAR}export function registerProbe(registry: CapabilityRegistry): void {\n  ${registers(PREVIEW)}\n}\n`,
  registerModuleConst: `${REGISTRAR}const PREVIEW = ${PREVIEW};\nexport function registerProbe(registry: CapabilityRegistry): void {\n  ${registers("PREVIEW")}\n}\n`,
  registerConstChain: `${REGISTRAR}const BASE_ID = ${PREVIEW};\nconst PREVIEW = BASE_ID;\nexport function registerProbe(registry: CapabilityRegistry): void {\n  ${registers("PREVIEW")}\n}\n`,
  registerHeldDescriptor: `${REGISTRAR}export function registerProbe(registry: CapabilityRegistry): void {\n  const descriptor = { id: ${PREVIEW} } as const;\n  registry.register({ descriptor } as never);\n}\n`,
  registerShorthand: `${REGISTRAR}const id = ${PREVIEW};\nexport function registerProbe(registry: CapabilityRegistry): void {\n  registry.register({ descriptor: { id } } as never);\n}\n`,
  registerComputedName: `${REGISTRAR}export function registerProbe(registry: CapabilityRegistry): void {\n  registry.register({ descriptor: { ["id"]: ${PREVIEW} } } as never);\n}\n`,
  registerStringName: `${REGISTRAR}export function registerProbe(registry: CapabilityRegistry): void {\n  registry.register({ descriptor: { "id": ${PREVIEW} } } as never);\n}\n`,
  registerArrow: `${REGISTRAR}export const registerProbe = (registry: CapabilityRegistry): void => {\n  ${registers(PREVIEW)}\n};\n`,
  registerDefaultExport: `${REGISTRAR}export default (registry: CapabilityRegistry): void => {\n  ${registers(PREVIEW)}\n};\n`,
  registerDefaultFunction: `${REGISTRAR}export default function registerProbe(registry: CapabilityRegistry): void {\n  ${registers(PREVIEW)}\n}\n`,
  registerListed: `${REGISTRAR}function register(registry: CapabilityRegistry): void {\n  ${registers(PREVIEW)}\n}\nexport { register as registerProbe };\n`,
  registerInModule: `${REGISTRAR}function register(registry: CapabilityRegistry): void {\n  ${registers(PREVIEW)}\n}\nexport const registered = register.name;\n`,
  registerComposedId: `${REGISTRAR}export function registerProbe(registry: CapabilityRegistry): void {\n  ${registers(`${JSON.stringify(PREVIEW_ID.split("."))}.join(".")`)}\n}\n`,
  registerImportedId: `${REGISTRAR}import { PREVIEW } from "./preview-id.js";\nexport function registerProbe(registry: CapabilityRegistry): void {\n  ${registers("PREVIEW")}\n}\n`,
  registerLetId: `${REGISTRAR}let preview = ${PREVIEW};\nexport function registerProbe(registry: CapabilityRegistry): void {\n  ${registers("preview")}\n}\nexport function trimProbe(): void {\n  preview = preview.trim();\n}\n`,
  registerVarId: `${REGISTRAR}var preview = ${PREVIEW};\nexport function registerProbe(registry: CapabilityRegistry): void {\n  ${registers("preview")}\n}\nexport function trimProbe(): void {\n  preview = preview.trim();\n}\n`,
  registerClassField: `${REGISTRAR}class Descriptor {\n  id = ${PREVIEW};\n}\nexport function registerProbe(registry: CapabilityRegistry): void {\n  registry.register({ descriptor: new Descriptor() } as never);\n}\n`,
  registerAssignedId: `${REGISTRAR}export function registerProbe(registry: CapabilityRegistry): void {\n  const descriptor: Record<string, unknown> = {};\n  descriptor.id = ${PREVIEW};\n  registry.register({ descriptor } as never);\n}\n`,
  registerGetterId: `${REGISTRAR}export function registerProbe(registry: CapabilityRegistry): void {\n  registry.register({ descriptor: { get id() {\n    return ${PREVIEW};\n  } } } as never);\n}\n`,
  toolNamed: toolModule(NAMED_TOOL, `  return [tool("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolAliased: toolModule(`import { tool as defineTool } from "${AGENT_SDK}";`, `  return [defineTool("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolNamespace: toolModule(`import * as sdk from "${AGENT_SDK}";`, `  return [sdk.tool("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolDefaultImport: toolModule(`import sdk from "${AGENT_SDK}";`, `  return [sdk.tool("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolRebound: toolModule(NAMED_TOOL, `  const make = tool;\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolReboundMember: toolModule(`import * as sdk from "${AGENT_SDK}";`, `  const make = sdk.tool;\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolReboundChain: toolModule(NAMED_TOOL, `  const other = tool;\n  const make = other;\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolDestructured: toolModule(`import * as sdk from "${AGENT_SDK}";`, `  const { tool: make } = sdk;\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolDestructuredDefault: toolModule(`import sdk from "${AGENT_SDK}";`, `  const { tool: make } = sdk;\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolAssigned: toolModule(NAMED_TOOL, `  let make: typeof tool | undefined;\n  make = tool;\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolAssignedLogical: toolModule(NAMED_TOOL, `  let make: typeof tool | undefined;\n  make ??= tool;\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolAssignedOrOr: toolModule(NAMED_TOOL, `  let make: typeof tool | undefined;\n  make ||= tool;\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolAssignedAndAnd: toolModule(NAMED_TOOL, `  let make: typeof tool | undefined;\n  make &&= tool;\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolAssignedInModule: toolModule(`${NAMED_TOOL}\nlet make: typeof tool | undefined;\nmake = tool;`, `  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolAssignedInFunction: toolModule(`${NAMED_TOOL}\nlet make: typeof tool | undefined;\nexport function initProbe(): void {\n  make = tool;\n}`, `  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolAssignedMember: toolModule(`import * as sdk from "${AGENT_SDK}";`, `  let make: typeof sdk.tool | undefined;\n  make = sdk.tool;\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolAssignedChain: toolModule(NAMED_TOOL, `  const other = tool;\n  let make: typeof tool | undefined;\n  make = other;\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolNamespaceElement: toolModule(`import * as sdk from "${AGENT_SDK}";`, `  return [sdk["tool"]("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolDefaultImportElement: toolModule(`import sdk from "${AGENT_SDK}";`, `  return [sdk["tool"]("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolHandlerReference: toolModule(NAMED_TOOL, `  const handler = ${INVOKING};\n  return [tool("probe_invoke", "probe", {}, handler as never)];`),
  toolHandlerFunction: toolModule(NAMED_TOOL, '  async function handler() {\n    return registry.invoke("x", {}, {} as never);\n  }\n  return [tool("probe_invoke", "probe", {}, handler)];'),
  toolHandlerIndirect: toolModule(NAMED_TOOL, `  const read = ${INVOKING};\n  const handler = async () => read();\n  return [tool("probe_invoke", "probe", {}, handler)];`),
  toolHandlerMember: toolModule(NAMED_TOOL, `  const handlers = { read: ${INVOKING} };\n  return [tool("probe_invoke", "probe", {}, handlers.read)];`),
  toolNameConst: toolModule(NAMED_TOOL, `  const name = "probe_invoke";\n  return [tool(name, "probe", {}, ${INVOKING})];`),
  toolNameConstChain: toolModule(NAMED_TOOL, `  const base = "probe_invoke";\n  const name = base;\n  return [tool(name, "probe", {}, ${INVOKING})];`),
  toolNameComposed: toolModule(NAMED_TOOL, `  return [tool(["probe", "invoke"].join("_"), "probe", {}, ${INVOKING})];`),
  toolInvokeElement: toolModule(NAMED_TOOL, '  return [tool("probe_invoke", "probe", {}, async () => registry["invoke"]("x", {}, {} as never))];'),
  toolInvokeBinding: toolModule(NAMED_TOOL, '  const { invoke } = registry;\n  return [tool("probe_invoke", "probe", {}, async () => invoke("x", {}, {} as never))];'),
  toolInspectOnly: toolModule(NAMED_TOOL, '  return [tool("probe_inspect", "probe", {}, async () => registry.inspect("x", {}, {} as never))];'),
  toolPiDefineTool: toolModule('import { defineTool } from "@earendil-works/pi-coding-agent";', `  return defineTool({ name: "probe_invoke", execute: ${INVOKING} } as never);`),
  toolSdkReexport: toolModule('import { tool } from "./agent-sdk.js";', `  return [tool("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolDynamicImport: toolModule("", `  return import("${AGENT_SDK}").then(sdk => [sdk.tool("probe_invoke", "probe", {}, ${INVOKING})]);`),
  toolImportedHandler: toolModule(`${NAMED_TOOL}\nimport { handler } from "./probe-handlers.js";`, '  return [tool("probe_invoke", "probe", {}, handler)];'),
  toolInvokeComposed: toolModule(NAMED_TOOL, '  return [tool("probe_invoke", "probe", {}, async () => registry[["inv", "oke"].join("") as "invoke"]("x", {}, {} as never))];'),
  toolDestructuringAssignment: toolModule(`import * as sdk from "${AGENT_SDK}";`, `  let make: typeof sdk.tool | undefined;\n  ({ tool: make } = sdk);\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolHelperCall: toolModule(NAMED_TOOL, `  return [tool.call(undefined, "probe_invoke", "probe", {}, ${INVOKING})];`),
  toolHelperChosen: toolModule(NAMED_TOOL, `  const make = registry === undefined ? undefined : tool;\n  return [make?.("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolHelperComma: toolModule(NAMED_TOOL, `  let make: typeof tool | undefined;\n  make = (0, tool);\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolHelperCallComma: toolModule(NAMED_TOOL, `  return [(0, tool)("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolHelperChained: toolModule(NAMED_TOOL, `  let other: typeof tool | undefined;\n  let make: typeof tool | undefined;\n  make = other = tool;\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];`),
  toolHelperParameter: toolModule(`${NAMED_TOOL}\nfunction build(registry: CapabilityRegistry, make = tool) {\n  return [make("probe_invoke", "probe", {}, ${INVOKING})];\n}`, "  return build(registry);"),
  toolSdkSubpath: toolModule(`import { tool } from "${AGENT_SDK}/sdk.mjs";`, `  return [tool("probe_invoke", "probe", {}, ${INVOKING})];`),
  projectModifier: `${READER_HEAD}export function project(value: JsonValue): string ${PROJECTING}\n`,
  projectConstValue: `${READER_HEAD}export const project = (value: JsonValue): string => JSON.stringify(value);\n`,
  projectListed: `${READER_HEAD}function project(value: JsonValue): string ${PROJECTING}\nexport { project };\n`,
  projectListedAlias: `${READER_HEAD}function project(value: JsonValue): string ${PROJECTING}\nexport { project as projectAlias };\n`,
  projectDefault: `${READER_HEAD}export default function project(value: JsonValue): string ${PROJECTING}\n`,
  projectDefaultValue: `${READER_HEAD}const project = (value: JsonValue): string => JSON.stringify(value);\nexport default project;\n`,
  projectDefaultArrow: `${READER_HEAD}export default (value: JsonValue): string => JSON.stringify(value);\n`,
  projectRebound: `${READER_HEAD}function project(value: JsonValue): string ${PROJECTING}\nexport const used = project;\n`,
  projectImportAlias: `import type { JsonValue as Reading } from "./capability-registry.js";\nimport { ${ENVELOPE_SCHEMA_CONSTANT} } from "./providers/reactivefiber.js";\nexport const schema = ${ENVELOPE_SCHEMA_CONSTANT};\nexport function project(value: Reading): string ${PROJECTING}\n`,
  projectTypeAlias: `${READER_HEAD}type Reading = JsonValue;\nexport function project(value: Reading): string ${PROJECTING}\n`,
  projectTypeAliasChain: `${READER_HEAD}type Base = JsonValue;\ntype Reading = Base;\nexport function project(value: Reading): string ${PROJECTING}\n`,
  projectParenthesized: `${READER_HEAD}export function project(value: (JsonValue)): string ${PROJECTING}\n`,
  projectParenthesizedAlias: `${READER_HEAD}type Reading = (JsonValue);\nexport function project(value: Reading): string ${PROJECTING}\n`,
  projectParenthesizedImportAlias: `import type { JsonValue as Reading } from "./capability-registry.js";\nimport { ${ENVELOPE_SCHEMA_CONSTANT} } from "./providers/reactivefiber.js";\nexport const schema = ${ENVELOPE_SCHEMA_CONSTANT};\nexport function project(value: (Reading)): string ${PROJECTING}\n`,
  projectNestedParenthesized: `${READER_HEAD}export function project(value: ((JsonValue))): string ${PROJECTING}\n`,
  projectNestedParenthesizedAlias: `${READER_HEAD}type Reading = ((JsonValue));\nexport function project(value: Reading): string ${PROJECTING}\n`,
  projectUnexported: `${READER_HEAD}function project(value: JsonValue): string ${PROJECTING}\nexport const projected = project({});\n`,
  projectScalar: `${READER_HEAD}export function project(value: string): string ${PROJECTING}\n`,
  projectOptionalReading: `${READER_HEAD}export function project(value: JsonValue | undefined): string ${PROJECTING}\n`,
  projectTypeParameter: `${READER_HEAD}export function project<T extends JsonValue>(value: T): string ${PROJECTING}\n`,
  projectMember: `${READER_HEAD}export const projections = {\n  project(value: JsonValue): string ${PROJECTING},\n};\n`,
  projectReexport: `${READER_HEAD}export { project } from "./projections.js";\n`,
  projectSchemaLiteral: `import type { JsonValue } from "./capability-registry.js";\nimport { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "./providers/reactivefiber.js";\nexport const contract = REACTIVEFIBER_RENDER_PREVIEW_CONTRACT;\nexport const schema = ${JSON.stringify(REACTIVE_FIBER_CLI_SCHEMA)};\nexport function project(value: JsonValue): string ${PROJECTING}\n`,
  projectQualifiedType: `import type * as registry from "./capability-registry.js";\nimport { ${ENVELOPE_SCHEMA_CONSTANT} } from "./providers/reactivefiber.js";\nexport const schema = ${ENVELOPE_SCHEMA_CONSTANT};\nexport function project(value: registry.JsonValue): string ${PROJECTING}\n`,
  projectImportType: `import { ${ENVELOPE_SCHEMA_CONSTANT} } from "./providers/reactivefiber.js";\nexport const schema = ${ENVELOPE_SCHEMA_CONSTANT};\nexport function project(value: import("./capability-registry.js").JsonValue): string ${PROJECTING}\n`,
  projectContextualType: `${READER_HEAD}type Projection = (value: JsonValue) => string;\nexport const project: Projection = value => JSON.stringify(value);\n`,
  projectAssignedValue: `${READER_HEAD}let project: ((value: JsonValue) => string) | undefined;\nproject = (value: JsonValue): string => JSON.stringify(value);\nexport { project };\n`,
};
/** What each derivation control derives, its surfaces keyed `#<name>` (the control module's path taken off). */
function derivationControls(): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(DERIVATION_CONTROLS).map(([name, source]) => {
      const surfaces = moduleSurfaces(CONTROL_MODULE, source);
      return [name, [...surfaces.registrations, ...surfaces.tools, ...surfaces.projections].map(key => key.slice(CONTROL_MODULE.length)).sort()];
    }),
  );
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
const closers: (() => Promise<void>)[] = [];
afterEach(async () => {
  process.env.PATH = oldPath;
  for (const close of closers.splice(0)) await close();
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `answer` and exits 0. */
function standInRf(answer: JsonValue): string {
  const folder = makeScratch("rf-fiber-node-reuse-echo-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(answer))});`,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log)
    .trim()
    .split("\n")
    .filter(Boolean)
    .map(line => JSON.parse(line) as string[]);
}
function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}

/** One registry invocation of the INJECTED preview whose reader answers a deep copy of the envelope. */
async function registeredReading(envelope: JsonObject): Promise<{ reading: JsonObject; calls: number }> {
  const handed = json(envelope);
  let calls = 0;
  const registry = new CapabilityRegistry();
  reach(registerReactiveFiberRender.name);
  registerReactiveFiberRender(
    registry,
    async () => {
      calls += 1;
      return handed as unknown as InjectedEnvelope;
    },
    FIXTURE_ROOT,
  );
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext()), "reading");
  return { reading, calls };
}
/** One registry invocation of the NATIVE preview against a stand-in rf printing the envelope. */
async function nativeReading(envelope: JsonObject): Promise<{ reading: JsonObject; spawns: string[][] }> {
  const log = standInRf(envelope);
  const registry = new CapabilityRegistry();
  reach(registerNativeReactiveFiberRender.name);
  registerNativeReactiveFiberRender(registry, ROOT);
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext()), "native reading");
  return { reading, spawns: spawnsOf(log) };
}
/** The agent-visible reply of capability_invoke: the real curated MCP server behind a real MCP client, exposing only the injected
 * preview whose reader answers a deep copy of the envelope. */
async function toolReply(envelope: JsonObject): Promise<{ isError: boolean; text: string; payload: JsonObject }> {
  const handed = json(envelope);
  const registry = new CapabilityRegistry();
  reach(registerReactiveFiberRender.name);
  registerReactiveFiberRender(registry, async () => handed as unknown as InjectedEnvelope, FIXTURE_ROOT);
  const server = createCuratedTools({
    registry,
    allowedCapabilities: [PREVIEW_ID],
    grants: [`discover:${PREVIEW_ID}`, `inspect:${PREVIEW_ID}`, `invoke:${PREVIEW_ID}`, ...GRANTS],
    principal: { id: "census-user", role: "reviewer" },
    workspace: FIXTURE_ROOT,
    invocationId: "rf-fiber-node-reuse-echo-1",
    signal: new AbortController().signal,
  });
  const client = new Client({ name: "rf-fiber-node-reuse-echo-census", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  closers.push(async () => {
    await client.close();
    await server.instance.close();
  });
  const tool = "capability_invoke";
  reach(tool);
  const result = await client.callTool({ name: tool, arguments: { capabilityId: PREVIEW_ID, capabilityVersion: PREVIEW_VERSION, input: { model: "m", task: "t" } } });
  const content: unknown = result.content;
  const first: unknown = Array.isArray(content) ? content[0] : undefined;
  if (!isObject(first) || first.type !== "text" || typeof first.text !== "string") throw new Error("expected one text content block");
  return { isError: result.isError === true, text: first.text, payload: objectOf(json(JSON.parse(first.text)), "capability_invoke reply") };
}

function contextFor(seam: ReactiveFiberSeam): ReactiveFiberTopologyContext {
  return { scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" }, seam, capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z" };
}
const SEAMS: readonly ReactiveFiberSeam[] = ["rf-cli", "injected-fixture"];
function topologyOf(envelope: JsonObject, seam: ReactiveFiberSeam): JsonValue {
  reach(reactivefiberTopology.name);
  return json(reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: envelope }, contextFor(seam)));
}
function evidenceOf(envelope: JsonObject): JsonValue {
  reach(nativeEvidence.name);
  return json(nativeEvidence(PREVIEW_ID, { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: envelope }));
}
/** What a projection surfaces, judged: its LABELs, its KEY pairs and its FIGURE words. */
function surfaced(value: JsonValue): { labels: string[]; keyPairs: number; figureWords: string[] } {
  const shown = wordLeaves(value);
  return { labels: shown.flatMap(labelsOf), keyPairs: keyPairsOf(JSON.stringify(value)).length, figureWords: figureWordsOf(shown) };
}
function coverageOf(topology: JsonValue): JsonValue {
  const snapshots = isObject(topology) ? topology.snapshots : undefined;
  const [snapshot] = Array.isArray(snapshots) ? snapshots : [];
  return isObject(snapshot) ? json(snapshot.coverage) : null;
}
/** The divergent twin's operation id: a valid rf operation id other than the fixture's, which every projection surfaces. */
const DIVERGENT_OPERATION_ID = `rfo_${"b".repeat(22)}`;
/** A blind leg's reading (wb-5618, the gate's F3), one comparison for all three: blind - the projection of the fixture equals its
 * twin's; diverges - the twin really differs from the fixture; seesDivergence - the same comparison tells apart a divergent twin
 * (the twin with its operation id changed), so a self-compared leg, or a twin that is the fixture itself, reds. */
function blindness(project: (envelope: JsonObject) => JsonValue, fixture: JsonObject, twin: JsonObject): { blind: boolean; diverges: boolean; seesDivergence: boolean } {
  const sameAs = (other: JsonObject): boolean => JSON.stringify(project(fixture)) === JSON.stringify(project(other));
  const divergent = objectOf(json(twin), "divergent twin");
  divergent.operation_id = DIVERGENT_OPERATION_ID;
  return { blind: sameAs(twin), diverges: JSON.stringify(fixture) !== JSON.stringify(twin), seesDivergence: !sameAs(divergent) };
}

let nativeCatalog: Promise<CapabilityDescriptor[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  nativeCatalog ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeCatalog;
}
/** The rf descriptors of a catalog, by any of three selectors: id prefix, permission family or contract source. */
function rfDescriptors(descriptors: readonly CapabilityDescriptor[]): CapabilityDescriptor[] {
  return descriptors.filter(
    descriptor =>
      descriptor.id.startsWith("reactivefiber.") ||
      descriptor.id.startsWith("rf.") ||
      descriptor.permissions.some(permission => permission.startsWith("reactivefiber:")) ||
      (descriptor.contractSource ?? "").includes("reactive-fiber.cli"),
  );
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  T1: async () => {
    const readers = rfReaders();
    const names = readers.map(reader => reader.file).sort();
    const floor = { core: CORE_READERS.every(file => names.includes(file)), count: names.length >= READER_FLOOR };
    const keyHits = readers.flatMap(reader => reader.keys.filter(namesObjectKey).map(key => `${reader.file}: ${key}`));
    // BOUND (respin #1, rider R1): the term this case judges, recorded as it runs - the components key it reads every rf reader for.
    reach(`${SECOND} key`);
    const literalHits = readers.flatMap(reader => reader.literals.filter(namesObjectLiteral).map(literal => `${reader.file}: ${literal.slice(0, 120)}`));
    const controls = {
      adapterReadsObservations: readers.some(reader => reader.file === "src/workbench/reactivefiber-observer.ts" && reader.keys.includes("observations")),
      providerNamesEngineMetrics: readers.some(reader => reader.file === "src/workbench/providers/reactivefiber.ts" && reader.literals.includes("engine_metrics")),
      keyRuleReadsSecond: namesObjectKey(SECOND) && namesObjectKey(snake(FIRST)),
      literalRuleReadsSpaced: namesObjectLiteral(`the ${foldedWords(FIRST).join(" ")} object`),
    };
    expect(floor, `readers: ${names.join(", ")}`).toStrictEqual({ core: true, count: true });
    expect(controls).toStrictEqual({ adapterReadsObservations: true, providerNamesEngineMetrics: true, keyRuleReadsSecond: true, literalRuleReadsSpaced: true });
    expect({ keyHits, literalHits }, "a Pi rf reader reading or naming the producer object").toStrictEqual({ keyHits: [], literalHits: [] });
    return { floor, controls, keyHits, literalHits };
  },
  T2: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const native = rfDescriptors(await nativeDescriptors()).map(descriptor => descriptor.id);
    const injectedIds = rfDescriptors(injected.catalogSnapshot().map(entry => entry.descriptor)).map(descriptor => descriptor.id);
    // BOUND (respin #1, rider R1): the term this case judges, recorded as it runs - the rf envelope whose capability roster it reads.
    reach("rf envelope");
    const carriers = [...rfDescriptors(await nativeDescriptors()), ...rfDescriptors(injected.catalogSnapshot().map(entry => entry.descriptor))].map(
      descriptor => descriptor.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE,
    );
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const verb = REACTIVE_FIBER_CONTRACT_SOURCE.endsWith(" context.render --no-commit");
    expect({ native, injected: injectedIds, reconcile }).toStrictEqual({ native: [PREVIEW_ID], injected: [PREVIEW_ID], reconcile: [PREVIEW_ID] });
    expect(carriers).toEqual([true, true]);
    expect(verb).toBe(true);
    return { native, injected: injectedIds, reconcile, carriers, verb };
  },
  A1: async () => {
    const roots = ["src", "test"];
    const files = roots.flatMap(root => filesBelow(join(REPO, root)));
    const paths = files.map(repoPath);
    const keyHits: string[] = [];
    const labelHits: string[] = [];
    const scanned = new Set<string>();
    files.forEach((file, index) => {
      const scan = scanFile(file);
      for (const pair of scan.keyPairs) keyHits.push(`${paths[index]}: ${pair}`);
      for (const label of scan.labels) labelHits.push(`${paths[index]}: ${label}`);
      // Liveness (wb-5618, the gate's F2; respin #1 and cut #3, the gate's U1): the texts the two readings consumed are the file's
      // whole content, judged against the file's own bytes read again from disk (readingsWhole, scannedWhole).
      if (scan.whole) scanned.add(file);
    });
    const unscanned = files.filter(file => !scanned.has(file)).map(repoPath);
    const testExtensions = new Set(paths.filter(path => path.startsWith("test/")).map(path => extname(path)));
    const floors = { src: paths.filter(path => path.startsWith("src/")).length >= 100, test: paths.filter(path => path.startsWith("test/")).length >= 450 };
    const adapter = "src/workbench/reactivefiber-observer.ts";
    const helper = "test/helpers/rf-render-fixture.ts";
    const reads = {
      self: paths.includes(repoPath(SELF)),
      roster: paths.includes(repoPath(ROSTER_PATH)),
      adapterBareWord: paths.includes(adapter) && foldedWords(textOf(join(REPO, adapter))).includes(THIRD),
      helperCounters: paths.includes(helper) && textOf(join(REPO, helper)).includes(`${THIRD}_component_count`),
      dotDirectory: paths.some(path => path.split("/").some(part => part.startsWith("."))),
      depthFour: paths.some(path => path.split("/").length >= 5),
      testExtensions: TEST_EXTENSIONS.every(extension => testExtensions.has(extension)),
    };
    // The liveness predicate's own controls (respin #1): each way a scanned text can fall short of a file, for a sample that decodes
    // strictly and for a lossy one; and, in makeScratch scratch, a lossy file, two end-of-file plants and (cut #3) the far plants read
    // through scanFile, the walk's own per-file reading.
    const sample = `export const pad = ${JSON.stringify("x".repeat(96))};\n`;
    const strictBytes = Buffer.from(sample);
    const lossyBytes = Buffer.concat([strictBytes, Buffer.from([0xff, 0xfe]), strictBytes]);
    const lossyText = new TextDecoder("utf-8", { ignoreBOM: true }).decode(lossyBytes);
    // A strict file may carry the replacement character itself (valid UTF-8): its lossiness is still read from its bytes.
    const carrying = `${sample.slice(0, 64)}${REPLACEMENT}`;
    const carryingBytes = Buffer.from(carrying);
    const whole = (content: string, bytes: Uint8Array): boolean => scannedWhole(content, bytes, bytes.length).whole;
    const folder = makeScratch("rf-fiber-node-reuse-echo-scan-");
    scratches.push(folder);
    const lossyFile = join(folder, "lossy.bin");
    writeFileSync(lossyFile, lossyBytes);
    const keyPlant = join(folder, "key-plant.ts");
    writeFileSync(keyPlant, `${sample}// ${KEY_CONTROLS.innerPair ?? ""}\n`);
    const labelPlant = join(folder, "label-plant.ts");
    writeFileSync(labelPlant, `${sample}// ${LABEL_CONTROLS.ownerPhrase ?? ""}\n`);
    const onDisk = scanFile(lossyFile);
    // The coupling's own controls (cut #3, the gate's U1 class): the liveness judges what each reading consumed, so either reading
    // handed a cut, blank or substituted text fails it while the other reads whole.
    const coupled = (keyText: string, labelText: string, bytes: Uint8Array): boolean =>
      readingsWhole(keyReading(keyText).consumed, labelReading(labelText).consumed, bytes, bytes.length).whole;
    // The far plants (cut #3): in the same scratch, one file per test extension whose KEY pair and LABEL sit past the size of the
    // longest walked file, read through scanFile - a reading cut short of the longest walked file misses them.
    const longest = Math.max(0, ...files.map(file => statSync(file).size));
    const farPlants = Object.fromEntries(
      TEST_EXTENSIONS.map(extension => {
        const plant = join(folder, `far-plant${extension}`);
        writeFileSync(plant, `${"x".repeat(longest)}\n// ${KEY_CONTROLS.innerPair ?? ""}\n// ${LABEL_CONTROLS.ownerPhrase ?? ""}\n`);
        const scan = scanFile(plant);
        return [extension, { keyPairs: scan.keyPairs.length, labels: scan.labels.length, whole: scan.whole }];
      }),
    );
    const liveness = {
      strict: {
        whole: whole(sample, strictBytes),
        empty: whole("", new Uint8Array(0)),
        blank: whole("", strictBytes),
        oneShort: whole(sample.slice(0, -1), strictBytes),
        cutShort: whole(sample.slice(0, 64), strictBytes),
        cutWithReplacement: whole(`${sample.slice(0, 64)}${REPLACEMENT}`, strictBytes),
        substituted: whole("y".repeat(strictBytes.length), strictBytes),
        decidedLossy: scannedWhole(sample, strictBytes, strictBytes.length).lossy,
        carryingWhole: whole(carrying, carryingBytes),
        carryingDecidedLossy: scannedWhole(carrying, carryingBytes, carryingBytes.length).lossy,
      },
      lossy: {
        whole: whole(lossyText, lossyBytes),
        blank: whole("", lossyBytes),
        cutShort: whole(lossyText.slice(0, 64), lossyBytes),
        cutWithReplacement: whole(`${lossyText.slice(0, 64)}${REPLACEMENT}`, lossyBytes),
        decidedLossy: scannedWhole(lossyText, lossyBytes, lossyBytes.length).lossy,
      },
      consumed: {
        whole: coupled(sample, sample, strictBytes),
        keyCut: coupled(sample.slice(0, 64), sample, strictBytes),
        labelCut: coupled(sample, sample.slice(0, 64), strictBytes),
        bothBlank: coupled("", "", strictBytes),
        keySubstituted: coupled("y".repeat(sample.length), sample, strictBytes),
        keyIsItsPasses: keyReading(sample).consumed === sample.replace(/\s+/g, ""),
        labelIsItsParts: labelReading(sample).consumed === sample,
      },
      disk: {
        lossyFile: { lossy: onDisk.lossy, whole: onDisk.whole },
        keyPlant: scanFile(keyPlant).keyPairs.length,
        labelPlant: scanFile(labelPlant).labels.length,
        farPlants,
      },
    };
    expect(floors, `src and test files read: ${paths.length}`).toStrictEqual({ src: true, test: true });
    expect(reads).toStrictEqual({ self: true, roster: true, adapterBareWord: true, helperCounters: true, dotDirectory: true, depthFour: true, testExtensions: true });
    expect({ keyHits, labelHits }, "a KEY pair or a LABEL below src/ or test/").toStrictEqual({ keyHits: [], labelHits: [] });
    expect(unscanned.slice(0, 10), `files the readings did not scan as read from disk (${unscanned.length} of ${files.length})`).toEqual([]);
    expect(liveness, "A1's liveness predicate and the walk's own reading, on their controls").toStrictEqual({
      strict: {
        whole: true,
        empty: true,
        blank: false,
        oneShort: false,
        cutShort: false,
        cutWithReplacement: false,
        substituted: false,
        decidedLossy: false,
        carryingWhole: true,
        carryingDecidedLossy: false,
      },
      lossy: { whole: true, blank: false, cutShort: false, cutWithReplacement: false, decidedLossy: true },
      consumed: { whole: true, keyCut: false, labelCut: false, bothBlank: false, keySubstituted: false, keyIsItsPasses: true, labelIsItsParts: true },
      disk: {
        lossyFile: { lossy: true, whole: true },
        keyPlant: 1,
        labelPlant: 1,
        farPlants: { ".json": { keyPairs: 1, labels: 1, whole: true }, ".md": { keyPairs: 1, labels: 1, whole: true }, ".mjs": { keyPairs: 1, labels: 1, whole: true }, ".ts": { keyPairs: 1, labels: 1, whole: true } },
      },
    });
    return { roots, floors, reads, keyHits, labelHits, unscanned, liveness };
  },
  A2: async () => {
    const { title } = exportRow();
    const clauses = ownerClauses();
    const clauseA = clauses[0] ?? "";
    const targets = backticked(clauseA);
    const quote = exportQuote();
    const phrase = clauseA.slice(clauseA.indexOf("|") + 1, clauseA.indexOf(" over Pi src"));
    const bareWord = clauseA.slice(clauseA.lastIndexOf(" ") + 1);
    const resultKeys = readRfResultRoster().resultKeys;
    const anchors = {
      titlePath: backticked(title).filter(span => span.split(".").length === 3),
      targets,
      targetsAreThePairs: JSON.stringify(targets) === JSON.stringify([INNER_PAIR, OUTER_PAIR]),
      keyReadsEachTarget: targets.map(target => keyPairsOf(target).length),
      keyReadsTheQuote: keyPairsOf(quote).length,
      bareWordQuiet: bareWord === THIRD && keyPairsOf(bareWord).length === 0,
      labelReadsPhrase: labelsOf(phrase).length,
      labelReadsTitle: labelsOf(title).length,
      labelReadsQuote: labelsOf(quote).length,
      citation: title.endsWith(CITATION) && CITATION.endsWith(`@${PIN}`),
      rfRosterListsSecond: resultKeys.includes(SECOND),
      rfRosterFirstKeys: resultKeys.filter(key => PLACEMENTS.includes(key)).length,
    };
    expect(anchors.titlePath).toStrictEqual([SEGMENTS.join(".")]);
    expect(anchors.targetsAreThePairs).toBe(true);
    expect(anchors.keyReadsEachTarget).toEqual([1, 1]);
    expect(anchors.keyReadsTheQuote).toBeGreaterThanOrEqual(2);
    expect([anchors.bareWordQuiet, anchors.citation, anchors.rfRosterListsSecond]).toEqual([true, true, true]);
    expect([anchors.labelReadsPhrase, anchors.labelReadsTitle >= 1, anchors.labelReadsQuote >= 1]).toEqual([1, true, true]);
    expect(anchors.rfRosterFirstKeys).toBe(0);
    return { ...anchors, titlePath: anchors.titlePath.length, targets: targets.length };
  },
  A3: async () => {
    const key = Object.fromEntries(Object.entries(KEY_CONTROLS).map(([name, sample]) => [name, keyPairsOf(sample).length > 0]));
    const label = Object.fromEntries(Object.entries(LABEL_CONTROLS).map(([name, sample]) => [name, labelsOf(sample).length > 0]));
    const quiet = Object.fromEntries(Object.entries(QUIET_CONTROLS).map(([name, sample]) => [name, keyPairsOf(sample).length + labelsOf(sample).length]));
    expect(Object.entries(key).filter(([, read]) => !read), "a KEY control read quiet").toEqual([]);
    expect(Object.entries(label).filter(([, read]) => !read), "a LABEL control read quiet").toEqual([]);
    expect(Object.entries(quiet).filter(([, hits]) => hits !== 0), "a quiet control read a hit").toEqual([]);
    // R-SYMLINK (wb-5618, the gate's L10): in scratch, a link to a file spelling a KEY pair is not followed by the walker, while the
    // same file walked where it lies is read.
    const folder = makeScratch("rf-fiber-node-reuse-echo-walk-");
    scratches.push(folder);
    mkdirSync(join(folder, "elsewhere"));
    mkdirSync(join(folder, "tree"));
    const target = join(folder, "elsewhere", "target.ts");
    writeFileSync(target, KEY_CONTROLS.innerPair ?? "");
    symlinkSync(target, join(folder, "tree", "link.ts"));
    const walker = {
      linkRead: filesBelow(join(folder, "tree")).length,
      targetHits: filesBelow(join(folder, "elsewhere")).flatMap(file => keyPairsOf(textOf(file))).length,
    };
    expect(walker, "R-SYMLINK: the link is not followed; its target, walked where it lies, is read").toStrictEqual({ linkRead: 0, targetHits: 1 });
    return { key, label, quiet, walker };
  },
  B1: async () => {
    const rows: JsonValue[] = [];
    for (const fixture of carryingFixtures(FIXTURE_ROOT)) {
      const { reading, calls } = await registeredReading(fixture.envelope);
      const piPart = { ...reading, source: null };
      const row = {
        kind: fixture.kind,
        value: producerValue(reading.source, fixture.placement),
        verbatim: JSON.stringify(reading.source) === JSON.stringify(carryingFixtures(FIXTURE_ROOT).find(entry => entry.kind === fixture.kind && entry.value === fixture.value)?.envelope),
        calls,
        piStrings: stringLeaves(piPart),
        piNumbers: numberLeaves(piPart),
        piLabels: wordLeaves(piPart).flatMap(labelsOf),
        piKeyPairs: keyPairsOf(JSON.stringify(piPart)).length,
      };
      expect(row).toStrictEqual({ ...row, value: fixture.value, verbatim: true, calls: 1, piStrings: [REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, FIXTURE_ROOT], piNumbers: [], piLabels: [], piKeyPairs: 0 });
      rows.push(row);
    }
    return { fixtures: rows.length, rows };
  },
  B2: async () => {
    const rows: JsonValue[] = [];
    for (const fixture of carryingFixtures(ROOT)) {
      const { reading, spawns } = await nativeReading(fixture.envelope);
      const [argv = []] = spawns;
      const row = {
        kind: fixture.kind,
        value: producerValue(reading.source, fixture.placement),
        verbatim: JSON.stringify(reading.source) === JSON.stringify(fixture.envelope),
        piKeys: Object.keys(reading).sort(),
        contract: reading.contract === REACTIVEFIBER_RENDER_PREVIEW_CONTRACT && reading.workspaceRoot === ROOT,
        spawns: spawns.length,
        verb: argv.slice(2, 4),
        tail: argv.slice(-3),
      };
      expect(row).toStrictEqual({
        ...row,
        value: fixture.value,
        verbatim: true,
        piKeys: ["contract", "source", "workspaceRoot"],
        contract: true,
        spawns: 1,
        verb: ["context", "render"],
        tail: ["--no-commit", "--no-input", "--json"],
      });
      rows.push(row);
    }
    return { fixtures: rows.length, rows };
  },
  B3: async () => {
    const rows: JsonValue[] = [];
    for (const fixture of carryingFixtures(FIXTURE_ROOT)) {
      const reply = await toolReply(fixture.envelope);
      const value = objectOf(reply.payload.value, "capability_invoke reply value");
      const expected = JSON.stringify({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: fixture.envelope });
      const spelled = `${JSON.stringify(fixture.placement)}:${JSON.stringify({ [SECOND]: { [THIRD]: fixture.value } })}`;
      const piPart = { ...reply.payload, value: { ...value, source: null } };
      const row = {
        kind: fixture.kind,
        isError: reply.isError,
        replyKind: json(reply.payload.kind),
        verbatim: JSON.stringify(value) === expected,
        keySpelledVerbatim: reply.text.includes(spelled),
        piStrings: stringLeaves(piPart),
        piLabels: wordLeaves(piPart).flatMap(labelsOf),
        replyLabels: labelsOf(reply.text).length,
      };
      expect(row).toStrictEqual({
        ...row,
        isError: false,
        replyKind: "returned",
        verbatim: true,
        keySpelledVerbatim: true,
        piStrings: ["returned", REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, FIXTURE_ROOT],
        piLabels: [],
        replyLabels: 0,
      });
      rows.push(row);
    }
    return { fixtures: rows.length, rows };
  },
  B4: async () => {
    const twin = plainEnvelope(FIXTURE_ROOT);
    const rows: JsonValue[] = [];
    for (const fixture of carryingFixtures(FIXTURE_ROOT)) {
      for (const seam of SEAMS) {
        const topology = topologyOf(fixture.envelope, seam);
        const row = { kind: fixture.kind, value: fixture.value, seam, ...blindness(envelope => topologyOf(envelope, seam), fixture.envelope, twin), coverage: coverageOf(topology), ...surfaced(topology) };
        expect(row).toStrictEqual({ ...row, blind: true, diverges: true, seesDivergence: true, labels: [], keyPairs: 0, figureWords: [] });
        rows.push(row);
      }
    }
    return { cases: rows.length, rows };
  },
  B5: async () => {
    const twin = plainEnvelope(FIXTURE_ROOT);
    const rows: JsonValue[] = [];
    for (const fixture of carryingFixtures(FIXTURE_ROOT)) {
      const evidence = evidenceOf(fixture.envelope);
      const row = { kind: fixture.kind, value: fixture.value, ...blindness(evidenceOf, fixture.envelope, twin), keys: Object.keys(objectOf(evidence, "evidence")).sort(), ...surfaced(evidence) };
      expect(row).toStrictEqual({ ...row, blind: true, diverges: true, seesDivergence: true, labels: [], keyPairs: 0, figureWords: [] });
      rows.push(row);
    }
    return { cases: rows.length, rows };
  },
  C1: async () => {
    const plain = plainEnvelope(FIXTURE_ROOT);
    const registered = await registeredReading(plain);
    const native = await nativeReading(plainEnvelope(ROOT));
    const reply = await toolReply(plain);
    const witness = {
      registered: { firstKeys: firstSegmentKeys(registered.reading).length, verbatim: JSON.stringify(registered.reading.source) === JSON.stringify(plain), keyPairs: keyPairsOf(JSON.stringify(registered.reading)).length },
      native: { firstKeys: firstSegmentKeys(native.reading).length, verbatim: JSON.stringify(native.reading.source) === JSON.stringify(plainEnvelope(ROOT)), spawns: native.spawns.length },
      reply: { firstKeys: firstSegmentKeys(reply.payload).length, keyPairs: keyPairsOf(reply.text).length, isError: reply.isError },
      topology: SEAMS.map(seam => ({ seam, ...surfaced(topologyOf(plain, seam)) })),
      evidence: surfaced(evidenceOf(plain)),
    };
    expect(witness.registered).toStrictEqual({ firstKeys: 0, verbatim: true, keyPairs: 0 });
    expect(witness.native).toStrictEqual({ firstKeys: 0, verbatim: true, spawns: 1 });
    expect(witness.reply).toStrictEqual({ firstKeys: 0, keyPairs: 0, isError: false });
    expect(witness.topology.map(({ labels, keyPairs, figureWords }) => ({ labels, keyPairs, figureWords }))).toStrictEqual(SEAMS.map(() => ({ labels: [], keyPairs: 0, figureWords: [] })));
    expect(witness.evidence).toStrictEqual({ labels: [], keyPairs: 0, figureWords: [] });
    return witness;
  },
  C2: async () => {
    const zero = counterEnvelope(FIXTURE_ROOT, 0);
    const counted = counterEnvelope(FIXTURE_ROOT, 3);
    const registered = await registeredReading(counted);
    const reply = await toolReply(counted);
    const counterOf = (source: JsonValue | undefined): JsonValue => {
      const result = isObject(source) ? source.result : undefined;
      const metrics = isObject(result) ? result.work_metrics : undefined;
      return isObject(metrics) ? json(metrics.reused_component_count) : null;
    };
    const witness = {
      topology: SEAMS.map(seam => ({ seam, ...blindness(envelope => topologyOf(envelope, seam), counted, zero), ...surfaced(topologyOf(counted, seam)) })),
      evidence: { ...blindness(evidenceOf, counted, zero), ...surfaced(evidenceOf(counted)) },
      registered: { counter: counterOf(registered.reading.source), firstKeys: firstSegmentKeys(registered.reading).length, verbatim: JSON.stringify(registered.reading.source) === JSON.stringify(counted) },
      reply: { counter: counterOf(objectOf(reply.payload.value, "reply value").source), firstKeys: firstSegmentKeys(reply.payload).length, keyPairs: keyPairsOf(reply.text).length },
    };
    expect(
      witness.topology.map(({ blind, diverges, seesDivergence, labels, keyPairs, figureWords }) => ({ blind, diverges, seesDivergence, labels, keyPairs, figureWords })),
    ).toStrictEqual(SEAMS.map(() => ({ blind: true, diverges: true, seesDivergence: true, labels: [], keyPairs: 0, figureWords: [] })));
    expect(witness.evidence).toStrictEqual({ blind: true, diverges: true, seesDivergence: true, labels: [], keyPairs: 0, figureWords: [] });
    expect(witness.registered).toStrictEqual({ counter: 3, firstKeys: 0, verbatim: true });
    expect(witness.reply).toStrictEqual({ counter: 3, firstKeys: 0, keyPairs: 0 });
    return witness;
  },
  C3: async () => {
    const observed = observationEnvelope(FIXTURE_ROOT);
    const seams = SEAMS.map(seam => {
      const topology = topologyOf(observed, seam);
      const shown = wordLeaves(topology);
      const reuseStrings = shown.filter(entry => figureWordsOf([entry]).some(word => word.startsWith("reus")));
      return {
        seam,
        coverage: coverageOf(topology),
        reuseStrings,
        nounsInReuseStrings: reuseStrings.flatMap(foldedWords).filter(word => LABEL_NOUNS.includes(word)).length,
        skipWords: figureWordsOf(shown).filter(word => word.startsWith("skip")).length,
        labels: shown.flatMap(labelsOf),
      };
    });
    const evidence = surfaced(evidenceOf(observed));
    for (const entry of seams) {
      expect(entry.reuseStrings.length, `${entry.seam}: the adapter's observations note`).toBeGreaterThanOrEqual(1);
      expect(entry.reuseStrings.every(note => note.startsWith("observations: "))).toBe(true);
      expect({ nouns: entry.nounsInReuseStrings, skip: entry.skipWords, labels: entry.labels }).toStrictEqual({ nouns: 0, skip: 0, labels: [] });
    }
    expect(evidence).toStrictEqual({ labels: [], keyPairs: 0, figureWords: [] });
    return { seams, evidence };
  },
};

/** The bound case's title: the roster's tests must register it (respin #1), so the bound case cannot leave with its roster entry. */
const BOUND_TITLE = "bound: every pin of rows T and B holds one term of the export title's absent-today note or one reading surface src derives";

describe("wb-csbt.2 rf render-report component-reuse echo census (TSX-RESOURCE-EFFICIENCY-FRONTIER-R2)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the owner's acceptance clauses and the cases agree", { timeout: 120_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:2", "A:3", "B:5", "C:3"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, labelDigest: digestOf(label), pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, labelDigest, pins }) => ({ id, labelDigest, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    // BOUND (respin #1): rows T and B hold as many pins as their outside anchors name - the export title's absent-today terms and
    // the reading surfaces src derives - so a pin hollowed through this file and the roster together reds here too.
    expect(ROWS.filter(row => row.id === "T" || row.id === "B").map(row => `${row.id}:${row.pins.length}`)).toEqual([`T:${exportTrigger().terms.length}`, `B:${derivedSurfaces().length}`]);
    // The owner's acceptance clauses in the tracked bead export are exactly the labels of rows A, B and C, in order.
    expect(ownerClauses()).toEqual(ROWS.filter(row => row.id !== "T").map(row => row.label));
    // And row T's label is the export title's trigger (wb-5618): every judged label is held to the export, the trigger first.
    expect(ROWS.map(row => row.label)).toEqual([exportTrigger().text, ...ownerClauses()]);
    expect({
      bead: BEAD,
      statement: STATEMENT,
      pin: PIN,
      rfVersion: RF_VERSION,
      citation: CITATION,
      vocabulary: {
        segments: [...SEGMENTS],
        placements: [...PLACEMENTS],
        values: [...VALUES],
        separator: SEPARATOR,
        skipWords: [...SKIP_WORDS],
        labelNouns: [...LABEL_NOUNS],
        window: WINDOW,
        unitBreaks: UNIT_BREAKS,
        figureWords: [...FIGURE_WORDS],
        coreReaders: [...CORE_READERS],
        readerFloor: READER_FLOOR,
      },
    }).toStrictEqual({
      bead: ROSTER.bead,
      statement: ROSTER.statement,
      pin: ROSTER.pin,
      rfVersion: ROSTER.rfVersion,
      citation: ROSTER.citation,
      vocabulary: { ...ROSTER.vocabulary, segments: [...ROSTER.vocabulary.segments], placements: [...ROSTER.vocabulary.placements] },
    });
    // The export row names this bead's statement id and the citation; the controls are the ones the roster's A3 witness names.
    expect(exportRow().title.startsWith(`[${STATEMENT}] `)).toBe(true);
    const a3 = rosterWitness("A3");
    expect(isObject(a3) ? [Object.keys(objectOf(a3.key, "A3 key")), Object.keys(objectOf(a3.label, "A3 label")), Object.keys(objectOf(a3.quiet, "A3 quiet"))] : null).toStrictEqual([
      Object.keys(KEY_CONTROLS),
      Object.keys(LABEL_CONTROLS),
      Object.keys(QUIET_CONTROLS),
    ]);
    // And the derivation controls are the ones the roster's bound witness names (respin #1).
    expect(Object.keys(objectOf(objectOf(ROSTER.bound, "roster bound").controls, "roster bound controls"))).toStrictEqual(Object.keys(DERIVATION_CONTROLS));
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await runAs(pin, impl);
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it(BOUND_TITLE, { timeout: 120_000 }, () => {
    const trigger = exportTrigger();
    const derivation = surfaceDerivation();
    const surfaces = derivedSurfaces();
    const pinsOf = (id: string): string[] => [...(ROWS.find(row => row.id === id)?.pins ?? [])];
    const tPins = pinsOf("T");
    const bPins = pinsOf("B");
    const holders = (anchor: string, pins: readonly string[]): string[] => pins.filter(pin => BINDINGS[pin] === anchor);
    const witness = {
      trigger: trigger.terms.map(term => ({ term, pins: holders(term, tPins) })),
      surfaces: surfaces.map(surface => ({ surface, pins: holders(surface, bPins) })),
      derivation: {
        // T1's reader floor, not an exact count: a new Pi rf reader that adds no surface keeps this census green, as T1 does.
        readersAtFloor: derivation.readers >= READER_FLOOR,
        envelopeReaders: [...derivation.envelopeReaders],
        kinds: { registrations: derivation.registrations.length, tools: derivation.tools.length, projections: derivation.projections.length },
      },
      unbound: [...tPins.filter(pin => !trigger.terms.includes(BINDINGS[pin] ?? "")), ...bPins.filter(pin => !surfaces.includes(BINDINGS[pin] ?? ""))],
      stale: Object.keys(BINDINGS).filter(pin => !tPins.includes(pin) && !bPins.includes(pin)),
      // Each T and B case ran before this one (the registration case holds the order): what it reached, recorded by reach().
      reached: [...tPins, ...bPins].map(pin => ({ pin, symbols: [...(REACHED.get(pin) ?? [])].sort() })),
      // The derivation's own controls (respin #1): what each control module derives.
      controls: derivationControls(),
    };
    const symbolOf = (binding: string): string => binding.slice(binding.indexOf("#") + 1);
    expect(
      bPins.filter(pin => !(REACHED.get(pin)?.has(symbolOf(BINDINGS[pin] ?? "")) ?? false)),
      "a B pin whose case did not reach, as it ran, the surface it is bound to",
    ).toEqual([]);
    expect(
      tPins.filter(pin => ![...(REACHED.get(pin) ?? [])].some(term => (BINDINGS[pin] ?? "").includes(term))),
      "a T pin whose bound term does not name what its case judged, as it ran",
    ).toEqual([]);
    expect(witness.trigger.map(({ pins }) => pins.length), "each term of the export title's absent-today note is held by exactly one T pin").toEqual(trigger.terms.map(() => 1));
    expect(witness.surfaces.map(({ pins }) => pins.length), "each reading surface src derives is held by exactly one B pin").toEqual(surfaces.map(() => 1));
    expect({ unbound: witness.unbound, stale: witness.stale }, "a T or B pin bound to no anchor, or a binding naming no pin").toStrictEqual({ unbound: [], stale: [] });
    expect(Object.values(witness.derivation.kinds).every(count => count >= 1), "each derivation kind finds a surface (positive control)").toBe(true);
    expect(witness).toStrictEqual(ROSTER.bound);
  });

  it("registration: every case of this file is registered once, in roster order, in run mode, and ran before this one", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles, "the bound case is registered (its witness is the roster's bound record)").toContain(BOUND_TITLE);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
  });
});
