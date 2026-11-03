/**
 * wb-km7q.7 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R19), a standing-posture census. Statement (bead title):
 * "Speculative model inference stays disabled in Pi by default: no Pi surface launches a model operation from
 * evidence/query/projection change alone, and any future opt-in to the rf/ReactiveInference speculative-inference seam (design
 * only; gated INF-RQ2) must carry an output contract, generation, model/version/settings, measured success/ROI and a budget; query
 * evidence is never a license." Acceptance (bead notes): "a hermetic census asserting no model-call site is reachable from
 * evidence/query/projection-change paths, plus the opt-in checklist (output contract, generation, exact model/version/settings,
 * measured ROI, budget) bound when the seam ships." Citations (bead notes; the ReactiveFiberCLI program file is cited, never read
 * here): docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md:19 and :37@52c9271ed485, the charter's
 * 'design only' at :3 and INF-RQ2 'query-view changes alone produce no network calls' at :39.
 *
 * wb-km7q.17, THE CARRIER CUT (the rule-19 exit child R-B334 filed at wb-km7q.7's refusal #3, gate run g10-gate-s186, made the
 * carrier by R-B353's dependency inversion at refusal #4, gate run g10-gate-s187; wb-km7q.7 is PARKED behind it). This cut lands
 * wb-km7q.7's census and roster as its cut #4 left them (commit 7dfc316d, census sha256/16 17401afdc874bf9a, roster
 * e1ada2f4f135a283) and pins the 25 members the two refusals measured surviving - refusal #3's 20 (its 18 counted members, and G05
 * and G06, which it did not count) and refusal #4's five - each with a named control or a planted walk that reds this census under
 * that member while the census reads clean on trunk. Refusal #3's members: U1, a class member under a modifier (G01
 * public, G02 async, G03 abstract, G04 declare, and G05 accessor and G06 override, which refusal #3 did not count), by B3's
 * publicMember, asyncMember, abstractMember, declareClass, declareMember, accessorMember and overrideMember controls and D1's
 * controls of the same names (readonlyMember in both rows and D1's privateMember, protectedMember and staticMember join the
 * controls that already kill refusal #3's G07, G08, G08b and G08c, and parameterProperty in both rows holds a public constructor
 * parameter property); U2, a listener name on a prototype as an
 * accessor or a non-function value (G21, G23), by B3's descriptorControl; U3, a name in an identifier position (G09 member access,
 * G10 parameter, G11 class field, G12 property assignment, G14 get accessor, G15 enum member, G16 type parameter), by B3's and
 * D1's memberAccessName, parameterName, classFieldName, propertyAssignmentName, getAccessorName, enumMemberName and
 * typeParameterName controls (setAccessorName beside them); U4, a method, a call or a construct signature outside an interface
 * (G24, G25, G26b) and a function type directly under a type alias (G26), by B3's typeLiteralMethodSignature,
 * typeLiteralCallSignature, typeLiteralConstructSignature and aliasedFunctionType controls (parameterConstructorType beside them);
 * U5, a type-only namespace import edge (G29), by B2's typeNamespaceClause edge form (typeDefaultClause, defaultWithNamed and
 * defaultWithNamespace beside it). Refusal #4's members, which R-B353 folded into wb-km7q.17: U1, D1's real reading reading only
 * each module's first 2000 characters (L2-D1a) or dropping the walk's last module (L2-D1b) or the seam (L2-D1c), and U2, A2's
 * real reading keeping at most three sites of a module (L2-A2a in sitesList, L2-A2b in factsOf), by D1's and A2's missedPlants,
 * which now read each planted walk through the walk's own reading (FALSIFIERS). The gate's edit strings for these 25 members,
 * applied to this cut's bytes, each red this census. Refusal #4's B3 call-site members L2-B3a and L2-B3b still keep it clean on
 * trunk; refusal #4's PREP did not count them, because its plant PB3 reds this census and both members alike (each corePlants
 * reading carries every core's real entries).
 *
 * CUT #4 OF wb-km7q.7, THE FAIL-CLOSED CORE (the FINAL cut that the rule-19 STRUCTURAL EXIT R-B334 binds at refusal #3; refused at
 * refusal #4 through the five members above): every claim of this census is one of its witnesses and nothing wider (the CLAIM
 * RULE below). That cut narrowed claim words only - no reader, control, plant or pin witness changed; the row labels, held to the
 * roster, narrowed with them - and named refusal #3's five families U1-U5 NOT CLAIMED and deferred them to wb-km7q.17. The carrier
 * cut keeps the CLAIM RULE and the row labels, changes the readers only where its pins need them (censusOf's reuse of a planted
 * walk's unchanged facts, and A2's and D1's missedPlants), and claims each family's forms on its pins only (NOT CLAIMED below).
 *
 * MEASURED AT BASE (measurements, not claims: 525939979d9e, the landing-856 ledger hop; src unchanged since 19024ab897c3, where
 * cut #2 measured the same): the walk reads 117 src modules. A2's site reading reads six sites in four modules -
 * createAgentSession from @earendil-works/pi-coding-agent (src/agent-runner.ts, src/mention-clone.ts), query from the Claude
 * Agent SDK (src/workbench/claude-host.ts) and three pi.sendMessage completion nudges carrying triggerTurn: true (src/index.ts).
 * B2's knowing reading reads 60 knowers and C1's reach reading 12 reaching modules; the two sets meet in exactly the four
 * model-side modules. B3's reading of the three cores reads no listener spelling, the callable type nodes EvidenceLoader.canLoad
 * and .load and the heritage clause EvidenceRefusal extends Error - all three in src/workbench/evidence-loader.ts, while
 * src/workbench/observation.ts and src/workbench/observe-query.ts read empty. D1's spelling reading reads no /specul/i spelling.
 *
 * PINNED READER SET (claim form 1): test/workbench-speculative-inference-census.test.ts, cases 'the judged set: the frozen shape,
 * the out-of-file roster and the cases agree', A1, A2, A3, B1, B2, B3, C1, C2, D1 and 'registration: every judged pin registered
 * once, ran in run mode, was not inverted and reached its witness'. Each judged case's assertion target is its witness in
 * test/fixtures/speculative-inference-roster.json, compared by toStrictEqual; at 525939979d9e every case matched (11 passed of
 * 11).
 * CLAIM RULE: this census claims exactly its witnesses, each held to that roster, and nothing wider:
 *  (1) REAL-TREE READINGS: each reading of the modules the walk reads, of the three cores, of the two real prototypes and of the
 *      installed packages, at the tree this census runs on, equals its witness - A1; A2's sites, topLevel and module floor; B1;
 *      B2's floors, cores and anchors; B3's listeners, callables, heritage, prototype floors and prototype listeners; C1; D1's
 *      vocabulary and warm starts. Their witness is their falsifier: a reading that differs from it reds its row.
 *  (2) NAMED PLANTS: each plant's reading of its own text, at the places it puts that text, equals its witness - A2 missedPlants,
 *      B2 knowingPlants, B3 corePlants and prototypePlants, C1 plantedMissing and D1 missedPlants (each stated in FALSIFIERS).
 *  (3) NAMED CONTROLS: each constructed control's reading of its own text, at the path it is read at, equals its witness - A3,
 *      the B2 controls, the B3 controls, vocabulary, prototypeControl and descriptorControl, C2, the D1 controls and
 *      warmStartControls. A control claims precisely its own text, never the syntax category it samples.
 * A sentence of this file that names a form, a position, an edge or a reading claims it only through one of these witnesses. A
 * form, position, modifier, descriptor, clause, edge, path, context or pairing that no witness holds is NOT CLAIMED by this
 * census, whatever a reader does with it today: the DEFINITIONS below describe the readers' algorithms and claim nothing beyond
 * (1)-(3).
 * FALSIFIERS (each positive claim's independent falsifier; nothing else is claimed to red this census). The plants of (2) turn
 * the real-tree readings of (1) red with a src text of exactly the plant's form at exactly the plant's places: A2 missedPlants
 * appends `import { query as ws05PlantQuery } from "@anthropic-ai/claude-agent-sdk";` to one module of the walk at a time and
 * reads that planted walk through the walk's own site reading (censusOf, reusing the facts of each unchanged module, then
 * sitesList): exactly the walk's sites plus one query site at that module - so that binding appended to any one module the walk
 * reads reds A2; C1 plantedMissing appends the same binding to every knower outside the model side at once and reads each of
 * them as a violation;
 * B2 knowingPlants appends a type-only named import of ObservationProjection (as KnowingPlant), by its relative .js path, to
 * every module of the walk at once and reads no module unknowing; B3 corePlants puts CORE_HEAD_PLANT before and CORE_PLANT after
 * one core's text at a time (each an exported class extending EventTarget with an on<Name> method taking a () => void listener)
 * and reads exactly the base entries plus those six, labeled by that core - so the two texts together, CORE_HEAD_PLANT's before a
 * core's text and CORE_PLANT's after it, red B3; B3 prototypePlants puts, in place of one real prototype at a time, a stand-in
 * holding onCorePlant first and subscribe last (function-valued configurable data properties) around a copy of that prototype's
 * own properties, reads exactly those two names of that class and holds that prototype's own names above its floor (copied); D1
 * missedPlants appends `export const ws05SpeculativeInference = true;` to one module of a second read of the walk at a time and
 * reads that planted walk through readingOf, the reading D1's vocabulary reads the walk by: exactly that vocabulary plus one
 * spelling at that module - so that binding appended to any one module the walk reads reds D1. A reader edit that stops reading a
 * plant's text at one of its places reds that plant's row (2), and a reader edit that changes a named control's reading reds
 * that control's row (3).
 *
 * DEFINITIONS (the readers' algorithms, each vocabulary read from src or from the installed packages and never typed in as a
 * module list; every reading is claimed only on the witnesses of the CLAIM RULE, and the forms each item names are the forms
 * those witnesses hold):
 *  THE WALK (srcSources): the .ts files below src/, read recursively by repo-relative posix path in a stable order and held above
 *    SRC_FLOOR (A2); which modules it reads is claimed only through that floor and the readings' witnesses.
 *  MODEL-CALL SITE (row A; readSites, on each module's AST; claimed on A2 and A3): (i) a value binding of a launch export of a
 *    model package (LAUNCH_EXPORTS, held to the roster and by A1 to the installed packages: the Claude Agent SDK's query, prewarm
 *    and startup; pi-coding-agent's session, session-runtime, session-services, model-runtime and run-mode exports; pi-ai's
 *    model-client, provider, stream and retry helpers), held by A3's controls in these forms, each with the export, package and
 *    local names its control spells (a control claims precisely its own text): a named, an aliased and a subpath import; a
 *    namespace import's literal member, literal-key member, destructured member and alias-destructured member, and its computed
 *    key, argument, spread and alias, each read as opaque (every export at once); a default import's member; an import-equals
 *    binding's member; a named, a star and a namespace re-export; a literal dynamic import()'s destructured, member, literal-key
 *    member, bound and opaque reads; a literal require's destructured read; and a literal createRequire binding's member; (ii) a
 *    value binding of a provider SDK (PROVIDER_PACKAGES: the four provider dependencies the installed pi-ai declares) or of
 *    pi-ai's api/ and providers/ subpaths, held by A3's default, named and subpath imports, each with the package its control
 *    spells (and by C2's selfProvider, a default import of openai); (iii) a host turn: sendUserMessage (pi's ExtensionAPI:
 *    "Always triggers a turn.") called as a member and through a literal key, and a triggerTurn property whose value is the
 *    literal true or a binding, its shorthand and its assignment of true; (iv) a model-runtime call (pi-coding-agent's
 *    ModelRuntime methods): completeSimple called as a member, fetchDeferred read as a member and destructured through a string
 *    key, streamSimple destructured, and of complete and stream - common data fields in src (log.stream, result.complete) -
 *    complete called as a member (runtimeCalled) and through .bind (runtimeViaBind) and stream called through an optional call
 *    (runtimeOptional) and through .call and .apply (runtimeViaCall, runtimeViaApply). A3's quiet rows read no site: a type-only
 *    clause, specifier and re-export (launch names imported as types included), non-launch exports, a namespace type query, a
 *    side-effect import, a local module's query, triggerTurn: false, a comment beside a quoted name, data fields, and an aliased
 *    runtime member (R-ALIASED-RUNTIME). A launch-site module holds at least one site.
 *  THE PLANE (row B; claimed on B1 and B2): three cores - src/workbench/observation.ts (ObservationProjection, the projection),
 *    src/workbench/observe-query.ts (observeInvocation, the query) and src/workbench/evidence-loader.ts (EvidenceStore, the
 *    evidence store) - and each module of the walk that KNOWS one: its closure over its knowing edges (factsOf's relative edges)
 *    reaches a core. B2's controls hold these knowing edge forms, each in its control's own text in src/workbench/a.ts, naming
 *    ./observation.js by a string specifier (the template forms by a no-substitution template): a type-only named clause, a
 *    type-only specifier, a type-only namespace and a type-only default clause, a named value import, a default import, a default
 *    import beside named and beside namespace bindings, a value namespace import and a side-effect import; a named, a
 *    type-only named, a star, a type-only star and a namespace re-export; a value and a type-only import-equals; an import type
 *    with a qualifier and with typeof; and a literal dynamic import(), require and createRequire load, each by a string and by a
 *    template (edgeForms); these specifier resolutions, each in a type-only named clause: the .js, .mjs and .cjs spellings
 *    (mapped to the .ts source), the .ts spelling, extensionless and a directory's index.ts (resolution); a knower by a type
 *    import, at a distance and by an import type, an unrelated module as unknowing, and four namings of a core outside the
 *    knowing edges as unknowing (unread, R-UNNAMED-PLANE). The B2 anchors are each module of the walk directly in src/workbench
 *    named in an ANCHOR FORM (ANCHOR_FORMS, by file name: *-observer.ts, *-evidence.ts, evidence-*.ts; held to the roster) and
 *    the inspector, the dialog (whose load-evidence continuation re-renders on a settled request) and the menu: each is a knower
 *    (missingAnchors) and each form holds at least its floor (ANCHOR_FLOORS, its count measured at 19024ab897c3); on a
 *    constructed graph the unknowing anchors are exactly each form's unknowing module, while its knowing module and each of its
 *    near-miss names (a plural, a missing dash, another directory, a subdirectory, the src root and a capitalized name) stay
 *    unlisted (unknowingAnchors). B3's reading of the cores (below) reads no listener spelling; that reading is the premise, not
 *    a proof, that a plane change is met only by code that holds a plane value or by a core's own callers.
 *  SUBSCRIPTION READING (row B3; subscriptionsOf over spellingsOf, isCallableType and the heritage clauses, and
 *    prototypeListenersOf; claimed on B3's real-tree readings, corePlants, prototypePlants and controls): (i) LISTENER SPELLINGS:
 *    a text spellingsOf keeps (an identifier, a private identifier read without its #, a string or template literal text) that is
 *    a listener-vocabulary name - on<Name> by LISTENER_PREFIX (/^on[A-Z]/, held to the roster) or one of LISTENER_NAMES
 *    (subscribe, unsubscribe, addListener, removeListener, addEventListener, removeEventListener, listen, watch, unwatch; held to
 *    the roster). B3's controls hold these spellings, each in its control's own text and with the names it spells: onChange and
 *    each LISTENER_NAMES member as class method names (vocabulary); onA through onZ and onX, onXy, onXY, onX1, onX_ and onX$ as
 *    identifiers in an array literal (prefixLetters, prefixTails); a class method name with no modifier (onChange, subscribe),
 *    with private (privateMember), protected (protectedMember), static (staticMember), public (publicMember), async
 *    (asyncMember) and override in a class with an extends clause (overrideMember), abstract in an abstract class
 *    (abstractMember), in a declare class (declareClass), of an anonymous default class (anonymousDefaultClass) and of a class
 *    expression (classExpression); a class property name with declare (declareMember), accessor (accessorMember) and readonly
 *    (readonlyMember), and a public constructor parameter property (parameterProperty); a name in a member access
 *    (memberAccessName), a parameter (parameterName), a class field (classFieldName), a property assignment
 *    (propertyAssignmentName), a get and a set accessor (getAccessorName, setAccessorName), an enum member (enumMemberName) and a
 *    type parameter (typeParameterName); a private-identifier and a string-literal method name
 *    (privateName, stringName); an object-literal method name (objectLiteral) and a no-substitution template computed key
 *    (templateName); a template head, middle and tail (templateSpans); a module function name (identifierName, moduleFunction,
 *    moduleOnChange) and a module const binding name (bindingName); a string literal type (typePosition) and a string call
 *    argument (argumentPosition); and a readonly optional property signature of an interface (callbackOption, listenerOption, and
 *    interfaceStringName by a string name) and of a type literal (typeAliasOption). Their near misses read quiet: a bare on, on
 *    followed by a lower-case letter, _, $ or a digit, On, OnChange, ONCHANGE and oNChange (prefixNearMisses); the case and affix
 *    variants namesNearMisses holds; and on, once, online, onset, listener, listening, subscriber, watcher, reasonText and emit
 *    as method names (nearMisses); and the line comment commentOnly holds reads quiet. (ii) CALLABLE TYPES: a function type,
 *    constructor type, method signature, call signature or construct signature node, or a type reference to a FUNCTION_TYPES name
 *    (Function, CallableFunction, NewableFunction; held to the roster), labeled by the declaration names that hold it. B3's
 *    controls hold, each in its own text, a function type as a parameter type (functionType, and the listener controls' callback
 *    parameters), as a return type (moduleFunction), as the type of an interface's or a type literal's property signature
 *    (callbackOption, listenerOption, typeAliasOption, interfaceStringName), directly under a type alias (aliasedFunctionType) and
 *    as a declared class property's type (declareMember); a constructor type under a type alias (constructorType) and as a
 *    parameter type (parameterConstructorType); a method, a call and a construct signature in an interface (methodSignature,
 *    callSignature, constructSignature) and in a type literal (typeLiteralMethodSignature, typeLiteralCallSignature,
 *    typeLiteralConstructSignature); and each FUNCTION_TYPES name as a parameter type (functionNames). (iii) HERITAGE: an extends
 *    or implements clause. B3's controls hold, each in its own text, a class's extends (classExtends, and emitterSubclass's
 *    EventEmitter), a class's implements (classImplements), an interface's extends (interfaceExtends) and a class expression's
 *    extends (classExpressionHeritage). (iv) PROTOTYPES: the own property names of the ObservationProjection and EvidenceStore
 *    prototypes this census imports, read after their modules evaluate by (i)'s vocabulary: each real prototype holds at least
 *    its floor (PROTOTYPE_FLOORS, about half its own property count at 19024ab897c3) and no listener name; the prototypePlants
 *    stand-in (FALSIFIERS) reads its two names; and PrototypeProbe, whose prototype gains onChange and each LISTENER_NAMES member
 *    as function-valued data properties (defineProperty's other attributes left false) when this module evaluates, reads those
 *    ten names (prototypeControl); and DescriptorProbe, whose prototype holds one listener name in each of eight descriptor forms
 *    when this module evaluates - a class-body method and getter, a defineProperty accessor with a getter, with a setter and with
 *    both, a data property holding a number and one holding an object, and a function-valued data property with every attribute
 *    true - reads those eight names (descriptorControl).
 *  REACH (row C; censusOf's value closure over factsOf's load edges, from each module of the walk; claimed on C1 and C2): a
 *    module reaches a model-call site when its value closure holds a launch-site module. C2's controls hold these load edges,
 *    each in its control's own constructed graph, from the plane module to a launch module: a named import (direct) and one
 *    through a middle module (transitive); a named and a star re-export through a relay (reexportNamed, reexportStar); a
 *    side-effect import (sideEffect); an import-equals (importEquals); a literal dynamic import()'s member and destructured reads
 *    (dynamic, dynamicDestructured); a literal createRequire load's destructured read (requireLiteral); an import of a const that
 *    is no pure literal (nonLiteralConst), of an array and an object holding a launch binding (mixedArray, mixedObject) and of a
 *    literal const beside a launch export (mixedLiteral); and a launching module that knows a core through a type import of a
 *    knower (atDistance). The plane module is itself a launch-site module with its own launch binding or provider default import
 *    (selfLaunch, selfProvider) and with an injected turn, trigger or runtime member read by name (injectedTurn, injectedTrigger,
 *    injectedRuntime). Two readings, both read from src: (1) THE SEAM: src/workbench/native-modules.ts is "the one dynamic-import
 *    seam for the native SDKs" (its header); its dynamic imports are followed per member - an importer of the seam reaches the
 *    modules behind each seam member it names (SEAM_MEMBERS, read from the seam's getters and methods over its dynamic-import
 *    bindings) and the seam's own static load edges, while the seam itself as a start reaches everything it loads - held by C1's
 *    seamMembers and seamImporters and by C2's seamLaunchMember (a value import of the seam), seamTypedMember (a type-only import
 *    of it), seamStaticEdge and seamReadMember (a member behind no launcher, quiet); (2) LITERAL CONSTANTS: an import whose value
 *    bindings each name an exported const bound to a pure literal carries no code and is no edge (workflow-dialog's SPINNER,
 *    workflow-menu's VIEWPORT_HEIGHT_PCT, collisions' SUBAGENT_TOOL_NAMES) - held by C2's literalConst (a string array),
 *    literalObject (an `as const` object of strings, a negative number, true and null, beside a number), literalParenthesized,
 *    literalSatisfies, literalTemplate and literalStringKey, each quiet. That reading's premise is A2's topLevel reading of the
 *    walk, held empty; C2's topLevel controls read, each in its own constructed graph, a call during evaluation of a launch
 *    binding, of an aliased dynamic and an aliased namespace launch binding, of a provider default class and a dynamically
 *    imported provider class, of a reaching import and of a host turn (callsLaunchBinding, callsAliasedDynamic,
 *    callsAliasedNamespace, callsProviderDefault, callsProviderDynamic, callsReachingImport, topLevelTurn), and none inside a
 *    function declaration's or an arrow's body (insideFunction). C2's typedHandles controls read a type-only import of a
 *    launcher's binding and a typeof import() of it as typed handles (typedLauncher, typedImportType) and a structural parameter
 *    type and a type from a module that reaches nothing as none (structural, typedQuiet). C2's other quiet rows: a type-only
 *    import of the launch module (typeOnlyEdge), a model-side launcher that imports the plane, which imports nothing of it
 *    (reverseDirection), and the RESIDUALS' rows.
 *  MODEL SIDE (C1): four knowers reach a model-call site by design and are pinned exactly - src/index.ts (the composition root,
 *    which holds the three triggerTurn nudges), src/workbench/claude-host.ts (the Claude Agent SDK adapter, the query site),
 *    src/workbench/hosts/local-detached.ts (the detached host, a static edge to claude-host) and src/workbench/native-modules.ts
 *    (the seam, a dynamic edge to claude-host); C1 holds each to being a launch-site module or a direct value importer of one.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; every witness is held to the roster):
 *  A1 the vocabulary resolves against the installed packages: each listed launch export is a function export of its package, each
 *    provider package is a dependency the installed pi-ai declares, the two subpaths are listed, and the installed declarations
 *    carry the host-turn and model-runtime members. A2 the walk reads at least SRC_FLOOR modules, their sites are the held
 *    multiset, their topLevel reading is empty, and the missedPlants binding, appended to one of them at a time, reads once there
 *    in the planted walk's site reading. A3 each named control's site count.
 *  B1 the three cores are exactly the projection class, the query function and the store class, each an exported declaration of
 *    its module and a function at run time. B2 the walk's knowers number at least KNOWER_FLOOR and include the cores; each anchor
 *    form holds at least its floor and each anchor is a knower; knowingPlants leaves no module unknowing; and THE PLANE's named
 *    controls read as held. B3 the cores' SUBSCRIPTION READING is exactly no listener spelling, the callable type nodes
 *    EvidenceLoader.canLoad and .load and the heritage clause EvidenceRefusal extends Error; each real prototype holds at least
 *    its floor and no listener name; and corePlants, prototypePlants, prototypeControl, descriptorControl, vocabulary and the
 *    SUBSCRIPTION READING's named controls read as held - its near misses, its comment and the R-UNNAMED-SUBSCRIPTION feeds
 *    quiet.
 *  C1 (acceptance) in the reach reading of the walk no knower outside the model side reaches a model-call site: violations empty,
 *    the knower-reach intersection exactly the model side, each model-side module justified, the reaching set, the site modules,
 *    the seam's member map and each seam importer's named members exact, and the typed handles exact - the type-only bindings a
 *    knower outside the model side imports from a reaching module (data types such as Theme and ClaudeCallIdentity, and the two
 *    launch-capable handles: the AgentManager src/workflow/host.ts runs workflow agent() calls through, and
 *    connectDetachedWorkflow in src/workbench/detached-control.ts) - and plantedMissing reads every knower outside the model side
 *    as a violation. C2 each named control of REACH and of the RESIDUALS reads its held count on its constructed graph.
 *  D1 the opt-in checklist waits for the seam: the checklist and the license clause are held to the roster; D1's spelling reading
 *    of the walk (readingOf over spellingsOf, which B3 shares, by SPECULATION /specul/i, held to the roster) reads no spelling,
 *    and the missedPlants binding, appended to one module at a time, reads once there in readingOf's reading of the planted walk;
 *    the walk's sites hold no site of a warm-start export (WARM_STARTS: prewarm, startup; held to the roster); D1's controls read
 *    a module const binding name (identifier), a string initializer (string), a private-identifier class field and its this-member
 *    read (privateName), a no-substitution template (noSubstitutionTemplate), a template head, middle and tail (templateSpans) and
 *    the bare stem in either case as const binding names (stem); a class field name with private, protected, static, public,
 *    accessor and readonly (privateMember, protectedMember, staticMember, publicMember, accessorMember, readonlyMember), a method
 *    name with async, abstract in an abstract class and override in a class with an extends clause (asyncMember, abstractMember,
 *    overrideMember), a property name in a declare class and with declare (declareClass, declareMember) and a public constructor
 *    parameter property (parameterProperty); a name in a member access, a parameter, a class field, a property assignment, a get
 *    and a set accessor, an enum member and a type parameter (memberAccessName, parameterName, classFieldName,
 *    propertyAssignmentName, getAccessorName, setAccessorName, enumMemberName, typeParameterName); and
 *    warmStartControls a named prewarm import and an aliased startup import; a line comment, a seam worded outside the vocabulary
 *    (R-VOCABULARY) and a query import (no warm start) read quiet. So the seam's first site or spelling reds this census (A2 or
 *    D1) until the checklist is bound when it is in a plant's form at the plant's places - A2's or D1's missedPlants binding
 *    appended to a module the walk reads.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the judged set - every row's id, label and
 * pins and every pin's witness - is held to the out-of-file roster test/fixtures/speculative-inference-roster.json, with the
 * vocabularies (the launch, provider, subpath, turn and runtime lists, LISTENER_NAMES, FUNCTION_TYPES and WARM_STARTS), the
 * readings' regular expressions (LISTENER_PREFIX, SPECULATION and ANCHOR_FORMS, source and flags), their floors (SRC_FLOOR,
 * KNOWER_FLOOR, ANCHOR_FLOORS, PROTOTYPE_FLOORS), the cores, the seam, the model side, the checklist and the test titles; the
 * package vocabularies are also held to the installed packages (A1) and the cores, the seam map and the reach sets to src (B1,
 * C1). The last case walks this file's vitest task tree against the roster's test list. The two acceptance requirements of C/D
 * also equal the filing's Acceptance clauses in the tracked .beads/issues.jsonl export: deleting D everywhere, including its
 * roster, still reds that anchor.
 * NOT CLAIMED: a causal/dynamic proof that model-side or injected calls are never driven by plane changes is NOT CLAIMED by this
 * census; C1 proves the module-closure reading, not dynamic effect reachability. An arbitrary future seam appearing without a
 * model binding or /specul/i vocabulary in a plant's form at the plant's places is NOT CLAIMED. D1 is an until-then tripwire, not
 * an implemented opt-in policy; no opt-in is offered by this cut. A module that observes the plane or loads evidence under a file
 * name outside the three anchor forms, or below a subdirectory of src/workbench, is NOT CLAIMED as a B2 anchor by this census
 * (its closure still makes it a knower). Which src modules the walk reads is NOT CLAIMED beyond SRC_FLOOR. A call during
 * evaluation that runs through a function the module itself calls at its top level (an immediately invoked function, a called
 * local function) is NOT CLAIMED by A2's topLevel reading, which reads top-level calls outside function bodies only. Refusal #3's
 * five families are claimed on the carrier cut's pins only (the forms above), and what each family holds beyond them is NOT
 * CLAIMED by this census:
 *  U1 a listener-vocabulary or /specul/i spelling on a class member in a modifier form no control holds: a combination of
 *    modifiers, a modifier on a class-expression member, and a modifier on a member kind its controls do not spell (B3 holds
 *    public, async, override, private, protected and static on a method, abstract on a method of an abstract class, declare on a
 *    class and on a property, accessor and readonly on a field and public on a parameter property; D1 holds private, protected,
 *    static, public, accessor and readonly on a field, async, abstract and override on a method, declare on a class and on a
 *    property and public on a parameter property).
 *  U2 a listener-vocabulary name on a prototype in a descriptor form or with attributes that no probe, stand-in or plant holds,
 *    and a name defined on a real core prototype object itself, which B3 reads only through its real-tree reading and the
 *    stand-in.
 *  U3 a spelling in an identifier position that no B3 or D1 control holds - a shorthand property, a destructured binding name, an
 *    import or export specifier name, a label, a catch-clause or loop variable, a declaration name other than those held, and each
 *    other position the SUBSCRIPTION READING and D1 do not name.
 *  U4 a callable type node in a position that no B3 control holds - one nested in a union, an intersection, an array, a tuple, a
 *    type argument, a conditional or a mapped type, and each other position (ii) does not name.
 *  U5 a knowing edge in a clause form or pairing that no B2 control holds - an edge form by a spelling other than .js, and a
 *    resolution in a clause other than the type-only named clause.
 * Beyond these, each reader's behavior on a form, position, path, context or pairing that no witness holds is NOT CLAIMED by this
 * census (CLAIM RULE), whether the reader reads it or not.
 * RESIDUALS (named, each with a pinned quiet row):
 *  R-MODEL-SIDE a change-triggered launch written inside a model-side module is unread: their own launches are explicit demand (a
 *    tool or command handler, a workflow agent() call, a detached launch, a completion nudge), and a module closure cannot tell a
 *    demand-driven launch from a change-driven one (src/index.ts runWorkflowTask both ingests Claude stream observations and runs
 *    the workflow). Backstops: their sites are part of A2's held multiset (A2's plant binding appended to one of them reds A2),
 *    and B3's reading of the cores reads no listener spelling for them to hang a launch on (within the SUBSCRIPTION READING;
 *    R-UNNAMED-SUBSCRIPTION). Quiet row: C2 modelSide.
 *  R-INJECTED a launch reached through a value the closure does not follow - a parameter, an option or callback field (the
 *    evidence loaders and deps the composer injects), a host object, a returned value, a global - is unread when its module names
 *    no site; this is how the Pi backend runs workflow agent() calls (src/workflow/host.ts calls the AgentManager it is handed),
 *    which is explicit workflow demand. Backstops: C1's typed handles are held exactly on src (C2 typedLauncher and
 *    typedImportType read their two forms), and host-turn and model-runtime members are read by name in the forms A3 and C2 hold
 *    (C2 injectedTurn, injectedTrigger, injectedRuntime). Quiet rows: C2 injected and injectedGlobal, and the structural
 *    typed-handle control.
 *  R-COMPOSED a module specifier or member assembled at run time (import(name), require(path), a computed member on a value that
 *    is not a model-package binding, a seam member spelled through a template) or a module loaded by a path string at run time (a
 *    Worker, a vm script) is unread; the computed key A3's namespaceComputed control spells on its namespace binding is read as
 *    opaque. Quiet rows: C2 composed, seamComposedMember and workerLoad.
 *  R-ALIASED-RUNTIME a complete or stream method reached through an alias, a destructured binding or Reflect.apply is unread (the
 *    two names are data fields across src); the four distinctive runtime members are read in A3's forms (MODEL-CALL SITE (iv)).
 *    Quiet rows: A3 aliasedRuntime and dataFields.
 *  R-UNNAMED-PLANE a module that handles plane values through a structural type, unknown or a parameter, with no import edge to a
 *    core, or that names a core only outside the knowing edges - a module augmentation (declare module), a triple-slash
 *    reference, a specifier composed at run time or a bare (non-relative) specifier - is no knower and is unjudged. Quiet rows:
 *    C2 unnamedPlane and B2 unread (augmentation, tripleSlash, composedSpecifier, bareSpecifier).
 *  R-NON-SDK-LAUNCH a model operation started outside the vocabulary - a spawned model CLI, a raw HTTP request to a model
 *    endpoint, an IPC request to a host process - is no site. Quiet rows: C2 cliLaunch, httpLaunch and ipcLaunch.
 *  R-UNNAMED-SUBSCRIPTION a change feed a core exposes with no listener spelling, no callable type node and no heritage clause in
 *    the core's own text - a callable typed through a type the core imports, through typeof or through a qualified name, an
 *    emitter or other subscribable instance built from a global (new EventTarget()), a promise or async iterator the caller
 *    awaits, a listener named outside the vocabulary (another verb such as notify or observe, or a non-ASCII letter after on), or
 *    a listener name assembled at run time outside the two real prototypes or set on them only later (in a constructor or a
 *    method) - is unread by B3 (C1's reach reading still covers each knower of the walk). Quiet rows: B3 importedCallable,
 *    typeofCallable, qualifiedCallable, globalEmitter, promiseFeed, iteratorFeed, unlistedNames, composedName and lateDefinition.
 *  R-VOCABULARY a speculative seam worded outside /specul/i, or spelled only in a comment, is not read by D1's vocabulary; its
 *    model call is still a site in A2's forms (A2). Quiet rows: D1 outsideVocabulary and comment.
 * SCOPE: hermetic - this census reads src text, the tracked bead export and the installed packages' exports, manifests and
 * declarations; it runs no binary, opens no network and launches no model. Pi vendors no ReactiveFiberCLI or ReactiveInference
 * source, so the seam's arrival is seen only as src gaining a site (A2) or the vocabulary (D1), in the forms those rows hold.
 */

import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, posix, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import * as claudeAgentSdk from "@anthropic-ai/claude-agent-sdk";
import * as piAi from "@earendil-works/pi-ai";
import * as piCodingAgent from "@earendil-works/pi-coding-agent";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { EvidenceStore } from "../src/workbench/evidence-loader.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import { observeInvocation } from "../src/workbench/observe-query.js";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type Sources = ReadonlyMap<string, string>;

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "speculative-inference-roster.json");

/** The launch exports of each model package: an export whose call starts a model operation or builds an object whose methods do. */
const LAUNCH_EXPORTS: Readonly<Record<string, readonly string[]>> = {
  "@anthropic-ai/claude-agent-sdk": ["prewarm", "query", "startup"],
  "@earendil-works/pi-ai": ["createModels", "createProvider", "lazyStream", "retryAssistantCall"],
  "@earendil-works/pi-coding-agent": [
    "AgentSession", "AgentSessionRuntime", "InteractiveMode", "ModelRuntime", "createAgentSession", "createAgentSessionFromServices",
    "createAgentSessionRuntime", "createAgentSessionServices", "main", "runPrintMode", "runRpcMode",
  ],
};
/** Provider SDKs: a value binding of one is a site (MODEL-CALL SITE (ii), claimed on A3's and C2's controls). */
const PROVIDER_PACKAGES: readonly string[] = ["@anthropic-ai/sdk", "@aws-sdk/client-bedrock-runtime", "@google/genai", "openai"];
/** pi-ai subpaths that hold the provider stream implementations: a value binding of one is a site (MODEL-CALL SITE (ii), claimed on
 * A3's controls). */
const WHOLE_SUBPATHS: readonly string[] = ["@earendil-works/pi-ai/api/", "@earendil-works/pi-ai/providers/"];
const TURN_MEMBERS: readonly string[] = ["sendUserMessage", "triggerTurn"];
/** ModelRuntime's model-call methods: the first four are read as members and destructured, the last two only when called (MODEL-CALL
 * SITE (iv), claimed on A3's controls). */
const RUNTIME_ANY: readonly string[] = ["completeSimple", "fetchDeferred", "streamDeferred", "streamSimple"];
const RUNTIME_CALLED: readonly string[] = ["complete", "stream"];
const WARM_STARTS: readonly string[] = ["prewarm", "startup"];
const SPECULATION = /specul/i;
/** B3's listener vocabulary: on<Name> by LISTENER_PREFIX (a lower-case on, then an ASCII upper-case letter A-Z; held to the roster) and
 * these exact names. */
const LISTENER_PREFIX = /^on[A-Z]/;
/** The ASCII upper-case letters LISTENER_PREFIX claims after on, each read by B3's prefixLetters control. */
const ASCII_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LISTENER_NAMES: readonly string[] = [
  "addEventListener", "addListener", "listen", "removeEventListener", "removeListener", "subscribe", "unsubscribe", "unwatch", "watch",
];
/** Type names that are callable by declaration: a type reference to one is a callable type node (B3 (ii)). */
const FUNCTION_TYPES: readonly string[] = ["CallableFunction", "Function", "NewableFunction"];

const CORES: readonly string[] = ["src/workbench/evidence-loader.ts", "src/workbench/observation.ts", "src/workbench/observe-query.ts"];
const SEAM = "src/workbench/native-modules.ts";
const MODEL_SIDE: readonly string[] = [
  "src/index.ts", "src/workbench/claude-host.ts", "src/workbench/hosts/local-detached.ts", "src/workbench/native-modules.ts",
];
/** The plane's UI modules: the inspector, the dialog and the menu. */
const PLANE_UI: readonly string[] = ["src/ui/workflow-dialog.ts", "src/ui/workflow-inspector.ts", "src/ui/workflow-menu.ts"];
const OPT_IN_CHECKLIST: readonly string[] = ["output contract", "generation", "exact model/version/settings", "measured success/ROI", "budget"];
const LICENSE_CLAUSE = "query evidence is never a license";
/** Each floor sits below the count measured at base f63d38962c (117 src modules, 60 knowers), so a walk or a knowing reading that
 * reads fewer (an emptied walk among them) reds and an additive change does not. */
const SRC_FLOOR = 100;
const KNOWER_FLOOR = 50;
/** B2's anchor forms, by file name; each form's floor is its count measured at base 19024ab897c3, so an additive change keeps it. */
const ANCHOR_FORMS: Readonly<Record<string, RegExp>> = {
  evidence: /^src\/workbench\/[^/]*-evidence\.ts$/,
  evidencePrefix: /^src\/workbench\/evidence-[^/]*\.ts$/,
  observer: /^src\/workbench\/[^/]*-observer\.ts$/,
};
const ANCHOR_FLOORS: Readonly<Record<string, number>> = { evidence: 4, evidencePrefix: 3, observer: 8, planeUi: 3 };
/** Each real prototype's floor: about half its own property count at base 19024ab897c3 (9 and 40 names). */
const PROTOTYPE_FLOORS: Readonly<Record<string, number>> = { EvidenceStore: 5, ObservationProjection: 20 };

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
  readonly requirement?: string;
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "a model-call site is a launch export of a model package, a provider SDK binding, a host turn or a model-runtime call: the vocabulary resolves against the installed packages, the walk's sites are the held multiset with A2's planted binding read once in each module, and each named A3 control reads its held site count",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label: "the evidence/query/projection plane is three cores and the walk's modules whose knowing edges reach one (B2's floors and anchors, its planted type import known in every module, and its named edge-form, resolution and unread controls); B3's subscription reading of the cores is exactly no listener spelling, the callable type nodes EvidenceLoader.canLoad and .load and the heritage clause EvidenceRefusal extends Error, read at each core's head and tail (corePlants) and on each class's stand-in prototype (prototypePlants), with its named controls",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    requirement: "a hermetic census asserting no model-call site is reachable from evidence/query/projection-change paths",
    label: "(acceptance) no model-call site is reachable from evidence/query/projection-change paths: in C1's reach reading of the walk no knower outside the four model-side modules has a value closure holding a launch-site module, C1's planted launch binding makes every such knower a violation, and each named C2 control reads its held count",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    requirement: "the opt-in checklist (output contract, generation, exact model/version/settings, measured ROI, budget) bound when the seam ships",
    label: "the opt-in checklist (output contract, generation, exact model/version/settings, measured success/ROI, budget) waits for the seam: D1's spelling reading of the walk holds no /specul/i spelling with its planted binding read once in each module, the walk's sites hold no warm-start export site, and each named D1 control reads its held count, so a site or spelling in A2's or D1's planted form, appended to a module of the walk, reds this census until the checklist is bound",
    pins: ["D1"],
  },
];

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface RosterFloors {
  readonly src: number;
  readonly knowers: number;
  readonly anchors: Readonly<Record<string, number>>;
  readonly prototypes: Readonly<Record<string, number>>;
}
interface Roster {
  readonly launchExports: Readonly<Record<string, readonly string[]>>;
  readonly providerPackages: readonly string[];
  readonly wholeSubpaths: readonly string[];
  readonly turnMembers: readonly string[];
  readonly runtimeMembers: readonly string[];
  readonly cores: readonly string[];
  readonly seam: string;
  readonly modelSide: readonly string[];
  readonly optInChecklist: readonly string[];
  readonly licenseClause: string;
  readonly listenerNames: readonly string[];
  readonly functionTypes: readonly string[];
  readonly warmStarts: readonly string[];
  readonly listenerPrefix: string;
  readonly speculation: string;
  readonly anchorForms: Readonly<Record<string, string>>;
  readonly floors: RosterFloors;
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function stringRecord(value: unknown, field: string): Record<string, string> {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  const out: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry !== "string") throw new Error(`roster ${field}.${key} must be a string`);
    out[key] = entry;
  }
  return out;
}
function numberRecord(value: unknown, field: string): Record<string, number> {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  const out: Record<string, number> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry !== "number") throw new Error(`roster ${field}.${key} must be a number`);
    out[key] = entry;
  }
  return out;
}
/** Whether two string lists hold the same entries in the same order. */
function sameList(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((entry, index) => entry === right[index]);
}
/** A deep copy through JSON: nothing in it is shared with the value it was made from. */
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}

/** Parses the roster from disk, each call a fresh read; its shape checks are guards this census does not judge (NOT CLAIMED). */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.launchExports)) throw new Error("roster must be an object with rows and launchExports");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const launchExports: Record<string, readonly string[]> = {};
  for (const [name, exports] of Object.entries(raw.launchExports)) launchExports[name] = strings(exports, `launchExports.${name}`);
  if (typeof raw.seam !== "string" || typeof raw.licenseClause !== "string") throw new Error("roster needs a seam and a licenseClause");
  if (typeof raw.listenerPrefix !== "string" || typeof raw.speculation !== "string") throw new Error("roster needs a listenerPrefix and a speculation source");
  const floors = raw.floors;
  if (!isObject(floors) || typeof floors.src !== "number" || typeof floors.knowers !== "number") throw new Error("roster floors needs src and knowers numbers");
  return {
    launchExports,
    providerPackages: strings(raw.providerPackages, "providerPackages"),
    wholeSubpaths: strings(raw.wholeSubpaths, "wholeSubpaths"),
    turnMembers: strings(raw.turnMembers, "turnMembers"),
    runtimeMembers: strings(raw.runtimeMembers, "runtimeMembers"),
    cores: strings(raw.cores, "cores"),
    seam: raw.seam,
    modelSide: strings(raw.modelSide, "modelSide"),
    optInChecklist: strings(raw.optInChecklist, "optInChecklist"),
    licenseClause: raw.licenseClause,
    listenerNames: strings(raw.listenerNames, "listenerNames"),
    functionTypes: strings(raw.functionTypes, "functionTypes"),
    warmStarts: strings(raw.warmStarts, "warmStarts"),
    listenerPrefix: raw.listenerPrefix,
    speculation: raw.speculation,
    anchorForms: stringRecord(raw.anchorForms, "anchorForms"),
    floors: { src: floors.src, knowers: floors.knowers, anchors: numberRecord(floors.anchors, "floors.anchors"), prototypes: numberRecord(floors.prototypes, "floors.prototypes") },
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** THE WALK: the .ts files below src/, read recursively by repo-relative posix path in a stable order (held above SRC_FLOOR). */
function srcSources(): Map<string, string> {
  const out = new Map<string, string>();
  const walk = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = join(directory, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith(".ts")) out.set(relative(REPO, full).split(sep).join("/"), readFileSync(full, "utf8"));
    }
  };
  walk(join(REPO, "src"));
  return out;
}

function sourceOf(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

/** A relative specifier resolved to a module of the graph (the .js spelling src uses maps to its .ts source). */
function resolveRelative(from: string, specifier: string, sources: Sources): string | undefined {
  if (!specifier.startsWith(".")) return undefined;
  const joined = posix.normalize(posix.join(posix.dirname(from), specifier));
  const candidates = [joined.replace(/\.(?:js|mjs|cjs)$/, ".ts"), `${joined}.ts`, `${joined}/index.ts`, joined];
  return candidates.find(candidate => sources.has(candidate));
}

interface PackageRule {
  readonly name: string;
  /** "every": a value binding of the package is a site (claimed on A3's controls); otherwise only these exports are. */
  readonly launch: readonly string[] | "every";
}

/** The model-package rule a bare specifier falls under, if any (a subpath of a launch-export package keeps its exports). */
function packageRuleOf(specifier: string): PackageRule | undefined {
  for (const prefix of WHOLE_SUBPATHS) if (specifier.startsWith(prefix)) return { name: specifier, launch: "every" };
  for (const name of PROVIDER_PACKAGES) if (specifier === name || specifier.startsWith(`${name}/`)) return { name, launch: "every" };
  for (const [name, exports] of Object.entries(LAUNCH_EXPORTS)) if (specifier === name || specifier.startsWith(`${name}/`)) return { name, launch: exports };
  return undefined;
}
function isLaunchName(rule: PackageRule, name: string): boolean {
  return rule.launch === "every" || rule.launch.includes(name);
}

/** The literal module specifier of a dynamic import(), a require(...) or a createRequire(...)(...) call, if the node is one. */
function loadSpecifierOf(node: ts.Node): string | undefined {
  if (!ts.isCallExpression(node)) return undefined;
  const [first] = node.arguments;
  if (first === undefined || !ts.isStringLiteralLike(first)) return undefined;
  if (node.expression.kind === ts.SyntaxKind.ImportKeyword) return first.text;
  if (ts.isIdentifier(node.expression) && node.expression.text === "require") return first.text;
  if (ts.isCallExpression(node.expression) && ts.isIdentifier(node.expression.expression) && node.expression.expression.text === "createRequire") return first.text;
  return undefined;
}
function isDynamicImport(node: ts.Node): boolean {
  return ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword;
}

/** The node a loaded value lands in: past awaits and parentheses. */
function useSiteOf(node: ts.Node): ts.Node {
  let current: ts.Node = node;
  while (current.parent !== undefined && (ts.isAwaitExpression(current.parent) || ts.isParenthesizedExpression(current.parent))) current = current.parent;
  return current;
}
function bindingNames(pattern: ts.ObjectBindingPattern): (string | undefined)[] {
  // undefined marks an element the reader cannot name (a rest element or a computed key), read as opaque; no control holds either
  // (NOT CLAIMED).
  return pattern.elements.map(element => {
    if (element.dotDotDotToken !== undefined) return undefined;
    const key = element.propertyName ?? element.name;
    if (ts.isIdentifier(key) || ts.isStringLiteral(key)) return key.text;
    return undefined;
  });
}
function memberNameOf(node: ts.PropertyAccessExpression | ts.ElementAccessExpression): string | undefined {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  return ts.isStringLiteralLike(node.argumentExpression) ? node.argumentExpression.text : undefined;
}
function isDeclarationName(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (
    (ts.isImportClause(parent) && parent.name === node) ||
    ts.isNamespaceImport(parent) ||
    ts.isImportSpecifier(parent) ||
    (ts.isImportEqualsDeclaration(parent) && parent.name === node) ||
    (ts.isVariableDeclaration(parent) && parent.name === node)
  );
}

interface SiteHit {
  readonly label: string;
  /** True when the site runs during module evaluation: outside every function-like body (an import or export form never is). */
  readonly topLevel: boolean;
}
interface SiteReading {
  readonly hits: readonly SiteHit[];
  /** Local names bound to a launch export (or to anything of an every-binding package): a call of one is a launch. */
  readonly launchBindings: ReadonlySet<string>;
}

function isFunctionLike(node: ts.Node): boolean {
  return (
    ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node) || ts.isMethodDeclaration(node) ||
    ts.isConstructorDeclaration(node) || ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node)
  );
}
/** Whether a node runs during module evaluation: no function-like body and no type position (a type never evaluates) holds it. */
function evaluatesAtTopLevel(node: ts.Node): boolean {
  for (let current = node.parent; current !== undefined; current = current.parent) {
    if (isFunctionLike(current) || ts.isTypeNode(current) || ts.isInterfaceDeclaration(current) || ts.isTypeAliasDeclaration(current)) return false;
  }
  return true;
}

/** The model-call sites of one module, as `<package> <export>`, `turn <member>` or `runtime <member>` labels (a multiset). */
function readSites(path: string, text: string): SiteReading {
  const source = sourceOf(path, text);
  const hits: SiteHit[] = [];
  const launchBindings = new Set<string>();
  const hit = (label: string, at: ts.Node | undefined): void => {
    hits.push({ label, topLevel: at !== undefined && evaluatesAtTopLevel(at) });
  };
  /** Bindings that hold a whole module of a launch-export package: their members are read below. */
  const namespaces = new Map<string, PackageRule>();
  /** Records each launch name (an unnamed element is opaque: every export); `at` is where a member read evaluates. */
  const recordNames = (rule: PackageRule, names: readonly (string | undefined)[], at: ts.Node | undefined): void => {
    for (const name of names) {
      if (name === undefined) hit(`${rule.name} *`, at);
      else if (isLaunchName(rule, name)) hit(`${rule.name} ${name}`, at);
    }
  };
  const bindLocals = (rule: PackageRule, pattern: ts.ObjectBindingPattern): void => {
    for (const element of pattern.elements) {
      const key = element.propertyName ?? element.name;
      const imported = ts.isIdentifier(key) || ts.isStringLiteral(key) ? key.text : undefined;
      if (ts.isIdentifier(element.name) && (imported === undefined || isLaunchName(rule, imported))) launchBindings.add(element.name.text);
    }
  };
  /** A loaded module value: named by destructuring, read through a member, bound whole, or opaque. */
  const readLoaded = (rule: PackageRule, load: ts.Node): void => {
    const site = useSiteOf(load);
    const parent = site.parent;
    if (parent !== undefined && ts.isVariableDeclaration(parent) && parent.initializer === site) {
      if (ts.isObjectBindingPattern(parent.name)) {
        bindLocals(rule, parent.name);
        recordNames(rule, bindingNames(parent.name), undefined);
        return;
      }
      if (ts.isIdentifier(parent.name)) {
        if (rule.launch === "every") {
          launchBindings.add(parent.name.text);
          hit(`${rule.name} *`, undefined);
        } else namespaces.set(parent.name.text, rule);
        return;
      }
    }
    if (parent !== undefined && (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === site) {
      recordNames(rule, [memberNameOf(parent)], parent);
      return;
    }
    hit(`${rule.name} *`, load);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const rule = packageRuleOf(node.moduleSpecifier.text);
      const clause = node.importClause;
      if (rule !== undefined && clause !== undefined && !clause.isTypeOnly) {
        if (clause.name !== undefined) {
          if (rule.launch === "every") {
            hit(`${rule.name} default`, undefined);
            launchBindings.add(clause.name.text);
          } else namespaces.set(clause.name.text, rule);
        }
        const bindings = clause.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) {
          if (rule.launch === "every") {
            hit(`${rule.name} *`, undefined);
            launchBindings.add(bindings.name.text);
          } else namespaces.set(bindings.name.text, rule);
        } else if (bindings !== undefined) {
          for (const element of bindings.elements) {
            if (element.isTypeOnly) continue;
            const imported = (element.propertyName ?? element.name).text;
            if (!isLaunchName(rule, imported)) continue;
            hit(`${rule.name} ${imported}`, undefined);
            launchBindings.add(element.name.text);
          }
        }
      }
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier) && !node.isTypeOnly) {
      const rule = packageRuleOf(node.moduleSpecifier.text);
      if (rule !== undefined) {
        const clause = node.exportClause;
        if (clause === undefined || ts.isNamespaceExport(clause)) hit(`${rule.name} *`, undefined);
        else recordNames(rule, clause.elements.filter(element => !element.isTypeOnly).map(element => (element.propertyName ?? element.name).text), undefined);
      }
    } else if (ts.isImportEqualsDeclaration(node) && !node.isTypeOnly && ts.isExternalModuleReference(node.moduleReference)) {
      const expression = node.moduleReference.expression;
      const rule = ts.isStringLiteral(expression) ? packageRuleOf(expression.text) : undefined;
      if (rule !== undefined) {
        if (rule.launch === "every") {
          hit(`${rule.name} *`, undefined);
          launchBindings.add(node.name.text);
        } else namespaces.set(node.name.text, rule);
      }
    } else {
      const specifier = loadSpecifierOf(node);
      const rule = specifier === undefined ? undefined : packageRuleOf(specifier);
      if (rule !== undefined) readLoaded(rule, node);
    }
    // Host turns and model-runtime members are read by name, not by the value's origin (an injected pi, context or runtime; claimed on
    // A3's and C2's controls).
    if (ts.isIdentifier(node) && node.text === "sendUserMessage") hit("turn sendUserMessage", node);
    if (ts.isStringLiteralLike(node) && node.text === "sendUserMessage" && ts.isElementAccessExpression(node.parent)) hit("turn sendUserMessage", node);
    if (ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) && node.name.text === "triggerTurn") {
      if (node.initializer.kind !== ts.SyntaxKind.FalseKeyword) hit("turn triggerTurn", node);
    }
    if (ts.isShorthandPropertyAssignment(node) && node.name.text === "triggerTurn") hit("turn triggerTurn", node);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && (ts.isPropertyAccessExpression(node.left) || ts.isElementAccessExpression(node.left))) {
      if (memberNameOf(node.left) === "triggerTurn" && node.right.kind !== ts.SyntaxKind.FalseKeyword) hit("turn triggerTurn", node);
    }
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const name = memberNameOf(node);
      if (name !== undefined && RUNTIME_ANY.includes(name)) hit(`runtime ${name}`, node);
      if (name !== undefined && RUNTIME_CALLED.includes(name)) {
        const parent = node.parent;
        const called = ts.isCallExpression(parent) && parent.expression === node;
        const viaCall = ts.isPropertyAccessExpression(parent) && parent.expression === node && ["call", "apply", "bind"].includes(parent.name.text);
        if (called || viaCall) hit(`runtime ${name}`, node);
      }
    }
    if (ts.isBindingElement(node) && node.dotDotDotToken === undefined) {
      const key = node.propertyName ?? node.name;
      if ((ts.isIdentifier(key) || ts.isStringLiteral(key)) && RUNTIME_ANY.includes(key.text)) hit(`runtime ${key.text}`, node);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  // Members of whole-module bindings: a literal member is read by name, and the other uses A3's controls hold read as opaque (every
  // export at once).
  const readNamespaceUse = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && namespaces.has(node.text) && !isDeclarationName(node)) {
      const rule = namespaces.get(node.text);
      const parent = node.parent;
      if (rule !== undefined && !ts.isTypeQueryNode(parent) && !ts.isQualifiedName(parent)) {
        if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === node) recordNames(rule, [memberNameOf(parent)], parent);
        else if (ts.isVariableDeclaration(parent) && parent.initializer === node && ts.isObjectBindingPattern(parent.name)) {
          bindLocals(rule, parent.name);
          recordNames(rule, bindingNames(parent.name), undefined);
        } else recordNames(rule, [undefined], node);
      }
    }
    ts.forEachChild(node, readNamespaceUse);
  };
  readNamespaceUse(source);
  return { hits, launchBindings };
}
function sitesOf(path: string, text: string): string[] {
  return readSites(path, text).hits.map(entry => entry.label);
}

function isPureLiteral(node: ts.Expression): boolean {
  let expression = node;
  while (ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression) || ts.isParenthesizedExpression(expression)) expression = expression.expression;
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression) || ts.isNumericLiteral(expression)) return true;
  if ([ts.SyntaxKind.TrueKeyword, ts.SyntaxKind.FalseKeyword, ts.SyntaxKind.NullKeyword].includes(expression.kind)) return true;
  if (ts.isPrefixUnaryExpression(expression) && ts.isNumericLiteral(expression.operand)) return true;
  if (ts.isArrayLiteralExpression(expression)) return expression.elements.every(isPureLiteral);
  if (ts.isObjectLiteralExpression(expression)) {
    return expression.properties.every(property => ts.isPropertyAssignment(property) && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) && isPureLiteral(property.initializer));
  }
  return false;
}

interface ValueEdge {
  readonly target: string;
  /** The value names the edge binds; undefined for a whole-module edge (a side-effect import, a re-export, an opaque load). */
  readonly names: readonly string[] | undefined;
  readonly dynamic: boolean;
}

interface ModuleFacts {
  readonly path: string;
  /** The module text these facts were read from (a planted walk reuses a module's facts only for the same text). */
  readonly text: string;
  readonly sites: readonly string[];
  /** The relative import edges the knower reading keeps, type-only forms and import types included. */
  readonly anyEdges: readonly string[];
  readonly valueEdges: readonly ValueEdge[];
  /** The identifiers the module spells: the seam member reading. */
  readonly names: ReadonlySet<string>;
  /** Exported consts bound to pure literals. */
  readonly literalConsts: ReadonlySet<string>;
  /** Value-import bindings by local name, with the module each comes from. */
  readonly bindings: ReadonlyMap<string, string>;
  /** Type-only import bindings of relative modules, as [target, imported name]. */
  readonly typeImports: readonly (readonly [string, string])[];
  /** Callees called in top-level code (outside function-like bodies), by root identifier. */
  readonly topLevelCallees: readonly string[];
  readonly hits: readonly SiteHit[];
  readonly launchBindings: ReadonlySet<string>;
}

function rootIdentifier(node: ts.Expression): string | undefined {
  let current = node;
  while (ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current) || ts.isNonNullExpression(current) || ts.isParenthesizedExpression(current)) current = current.expression;
  return ts.isIdentifier(current) ? current.text : undefined;
}

function factsOf(path: string, text: string, sources: Sources): ModuleFacts {
  const source = sourceOf(path, text);
  const anyEdges = new Set<string>();
  const valueEdges: ValueEdge[] = [];
  const names = new Set<string>();
  const literalConsts = new Set<string>();
  const bindings = new Map<string, string>();
  const typeImports: [string, string][] = [];
  const addValue = (specifier: string, edgeNames: readonly string[] | undefined, dynamic: boolean): void => {
    const target = resolveRelative(path, specifier, sources);
    if (target === undefined) return;
    anyEdges.add(target);
    valueEdges.push({ target, names: edgeNames, dynamic });
  };
  const addAny = (specifier: string): void => {
    const target = resolveRelative(path, specifier, sources);
    if (target !== undefined) anyEdges.add(target);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) names.add(node.text);
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const specifier = node.moduleSpecifier.text;
      const clause = node.importClause;
      addAny(specifier);
      const typeTarget = resolveRelative(path, specifier, sources);
      if (clause !== undefined && typeTarget !== undefined) {
        const named = clause.namedBindings;
        if (clause.isTypeOnly && clause.name !== undefined) typeImports.push([typeTarget, "default"]);
        if (clause.isTypeOnly && named !== undefined && ts.isNamespaceImport(named)) typeImports.push([typeTarget, "*"]);
        if (named !== undefined && ts.isNamedImports(named)) {
          for (const element of named.elements) if (clause.isTypeOnly || element.isTypeOnly) typeImports.push([typeTarget, (element.propertyName ?? element.name).text]);
        }
      }
      if (clause === undefined) addValue(specifier, undefined, false);
      else if (!clause.isTypeOnly) {
        const bound: string[] = [];
        const target = resolveRelative(path, specifier, sources);
        if (clause.name !== undefined) {
          bound.push("default");
          if (target !== undefined) bindings.set(clause.name.text, target);
        }
        const named = clause.namedBindings;
        if (named !== undefined && ts.isNamespaceImport(named)) {
          bound.push("*");
          if (target !== undefined) bindings.set(named.name.text, target);
        } else if (named !== undefined) {
          for (const element of named.elements) {
            if (element.isTypeOnly) continue;
            bound.push((element.propertyName ?? element.name).text);
            if (target !== undefined) bindings.set(element.name.text, target);
          }
        }
        if (bound.length > 0) addValue(specifier, bound, false);
      }
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
      addAny(node.moduleSpecifier.text);
      if (!node.isTypeOnly) addValue(node.moduleSpecifier.text, undefined, false);
    } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression)) {
      addAny(node.moduleReference.expression.text);
      if (!node.isTypeOnly) addValue(node.moduleReference.expression.text, undefined, false);
    } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteral(node.argument.literal)) {
      addAny(node.argument.literal.text);
      const typeTarget = resolveRelative(path, node.argument.literal.text, sources);
      if (typeTarget !== undefined) typeImports.push([typeTarget, node.qualifier === undefined ? "import()" : node.qualifier.getText(source)]);
    } else {
      const specifier = loadSpecifierOf(node);
      if (specifier !== undefined) {
        const site = useSiteOf(node);
        const parent = site.parent;
        const destructured = parent !== undefined && ts.isVariableDeclaration(parent) && parent.initializer === site && ts.isObjectBindingPattern(parent.name) ? bindingNames(parent.name) : undefined;
        const named = (name: string | undefined): name is string => name !== undefined;
        const edgeNames = destructured?.every(named) ? destructured.filter(named) : undefined;
        addValue(specifier, edgeNames, isDynamicImport(node));
      }
    }
    if (ts.isVariableStatement(node) && node.parent === source && (node.declarationList.flags & ts.NodeFlags.Const) !== 0 && node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const declaration of node.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.initializer !== undefined && isPureLiteral(declaration.initializer)) literalConsts.add(declaration.name.text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  // Top-level code: the statements outside function-like bodies and type positions.
  const topLevelCallees: string[] = [];
  const topLevel = (node: ts.Node): void => {
    if (isFunctionLike(node) || ts.isTypeNode(node) || ts.isImportDeclaration(node) || ts.isExportDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) return;
    if (ts.isCallExpression(node) || ts.isNewExpression(node) || ts.isTaggedTemplateExpression(node)) {
      const callee = ts.isTaggedTemplateExpression(node) ? node.tag : node.expression;
      const root = rootIdentifier(callee);
      if (root !== undefined) topLevelCallees.push(root);
    }
    ts.forEachChild(node, topLevel);
  };
  for (const statement of source.statements) topLevel(statement);
  const reading = readSites(path, text);
  return {
    path, sites: reading.hits.map(entry => entry.label), anyEdges: [...anyEdges].sort(), valueEdges, names, literalConsts, bindings, typeImports, topLevelCallees,
    hits: reading.hits, launchBindings: reading.launchBindings, text,
  };
}

/** The seam's member map: each getter or method of its object literals, to the modules behind the dynamic-import bindings it reads. */
function seamMembersOf(text: string, sources: Sources, seam: string): Map<string, string[]> {
  const source = sourceOf(seam, text);
  const loaded = new Map<string, string>();
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) {
      const load = ts.isAwaitExpression(node.initializer) ? node.initializer.expression : node.initializer;
      if (isDynamicImport(load) && ts.isCallExpression(load)) {
        const [first] = load.arguments;
        if (first !== undefined && ts.isStringLiteralLike(first)) loaded.set(node.name.text, resolveRelative(seam, first.text, sources) ?? first.text);
      }
    }
    ts.forEachChild(node, collect);
  };
  collect(source);
  const members = new Map<string, string[]>();
  const read = (node: ts.Node): void => {
    if ((ts.isGetAccessorDeclaration(node) || ts.isMethodDeclaration(node)) && ts.isObjectLiteralExpression(node.parent) && ts.isIdentifier(node.name) && node.body !== undefined) {
      const used = new Set<string>();
      const uses = (inner: ts.Node): void => {
        if (ts.isIdentifier(inner)) {
          const target = loaded.get(inner.text);
          if (target !== undefined) used.add(target);
        }
        ts.forEachChild(inner, uses);
      };
      uses(node.body);
      members.set(node.name.text, [...used].sort());
    }
    ts.forEachChild(node, read);
  };
  read(source);
  return members;
}

interface Census {
  readonly facts: ReadonlyMap<string, ModuleFacts>;
  readonly siteModules: readonly string[];
  readonly knowers: readonly string[];
  readonly reaching: ReadonlyMap<string, readonly string[]>;
  readonly seamMembers: ReadonlyMap<string, readonly string[]>;
  readonly seamImporters: ReadonlyMap<string, readonly string[]>;
  readonly violations: readonly string[];
  /** Type-only bindings a knower outside the model side imports from a reaching module: the typed handles of R-INJECTED. */
  readonly typedHandles: readonly string[];
  readonly topLevel: readonly string[];
}

/** Reads one module graph: sites, knowers, the value closure with the seam and literal-constant readings, and the violations. A
 * planted walk (A2's missedPlants) passes the census of the walk it was planted in as `reuse`: when both hold the same module paths,
 * a module whose text is unchanged keeps the facts that census read (factsOf reads only a module's own text and the graph's module
 * paths), and every other module is read here. */
function censusOf(sources: Sources, cores: readonly string[], seam: string, modelSide: readonly string[], reuse?: Census): Census {
  const facts = new Map<string, ModuleFacts>();
  const samePaths = reuse !== undefined && reuse.facts.size === sources.size && [...sources.keys()].every(path => reuse.facts.has(path));
  for (const [path, text] of sources) {
    const known = samePaths ? reuse?.facts.get(path) : undefined;
    facts.set(path, known !== undefined && known.text === text ? known : factsOf(path, text, sources));
  }
  const siteModules = [...facts.values()].filter(fact => fact.sites.length > 0).map(fact => fact.path).sort();
  const siteSet = new Set(siteModules);
  const seamText = sources.get(seam);
  const seamMembers = seamText === undefined ? new Map<string, string[]>() : seamMembersOf(seamText, sources, seam);
  const seamImporters = new Map<string, string[]>();
  for (const fact of facts.values()) {
    if (fact.path !== seam && fact.anyEdges.includes(seam)) seamImporters.set(fact.path, [...seamMembers.keys()].filter(member => fact.names.has(member)).sort());
  }
  const edgesFrom = (path: string, start: boolean): string[] => {
    const fact = facts.get(path);
    if (fact === undefined) return [];
    const out = new Set<string>();
    for (const edge of fact.valueEdges) {
      if (path === seam && !start && edge.dynamic) continue;
      const target = facts.get(edge.target);
      if (edge.names !== undefined && target !== undefined && edge.names.length > 0 && edge.names.every(name => target.literalConsts.has(name))) continue;
      out.add(edge.target);
    }
    for (const member of seamImporters.get(path) ?? []) for (const target of seamMembers.get(member) ?? []) if (facts.has(target)) out.add(target);
    return [...out].sort();
  };
  /** The first path from a module to a launch-site module over load edges, or undefined. */
  const pathOf = (from: string): string[] | undefined => {
    if (siteSet.has(from)) return [from];
    const seen = new Set<string>([from]);
    const queue: string[][] = [[from]];
    while (queue.length > 0) {
      const trail = queue.shift() ?? [];
      const last = trail.at(-1) ?? from;
      for (const next of edgesFrom(last, last === from)) {
        if (seen.has(next)) continue;
        seen.add(next);
        const extended = [...trail, next];
        if (siteSet.has(next)) return extended;
        queue.push(extended);
      }
    }
    return undefined;
  };
  const reaching = new Map<string, string[]>();
  for (const path of [...facts.keys()].sort()) {
    const found = pathOf(path);
    if (found !== undefined) reaching.set(path, found);
  }
  // Knowers: the modules whose closure over their relative import edges reaches a core.
  const coreSet = new Set(cores.filter(core => facts.has(core)));
  const knows = (from: string): boolean => {
    const seen = new Set<string>();
    const stack = [from];
    while (stack.length > 0) {
      const current = stack.pop() ?? from;
      if (coreSet.has(current)) return true;
      if (seen.has(current)) continue;
      seen.add(current);
      stack.push(...(facts.get(current)?.anyEdges ?? []));
    }
    return false;
  };
  const knowers = [...facts.keys()].filter(knows).sort();
  const side = new Set(modelSide);
  const violations = knowers.filter(path => !side.has(path) && reaching.has(path)).map(path => (reaching.get(path) ?? [path]).join(" -> "));
  const typedHandles = knowers
    .filter(path => !side.has(path))
    .flatMap(path => (facts.get(path)?.typeImports ?? []).filter(([target]) => reaching.has(target) || siteSet.has(target)).map(([target, name]) => `${path} <- ${target}: ${name}`))
    .sort();
  // Top-level code must call no launch-site binding and no binding imported from a reaching module (the literal-constant rule's premise).
  const topLevel: string[] = [];
  for (const fact of facts.values()) {
    for (const entry of fact.hits) if (entry.topLevel) topLevel.push(`${fact.path}: ${entry.label}`);
    for (const callee of fact.topLevelCallees) {
      const from = fact.bindings.get(callee);
      if (fact.launchBindings.has(callee)) topLevel.push(`${fact.path}: ${callee} (launch binding)`);
      else if (from !== undefined && (reaching.has(from) || siteSet.has(from))) topLevel.push(`${fact.path}: ${callee} from ${from}`);
    }
  }
  return { facts, siteModules, knowers, reaching, seamMembers, seamImporters, violations, typedHandles, topLevel: topLevel.sort() };
}

let srcCensus: Census | undefined;
function srcCensusOf(): Census {
  srcCensus ??= censusOf(srcSources(), CORES, SEAM, MODEL_SIDE);
  return srcCensus;
}

function sitesList(census: Census): string[] {
  return [...census.facts.values()].flatMap(fact => fact.sites.map(site => `${fact.path}: ${site}`)).sort();
}

/** A constructed graph: a stub of each core, a launch module, a seam and the control's own modules. */
const STUBS: Readonly<Record<string, string>> = {
  "src/workbench/observation.ts": "export class ObservationProjection { refresh(snapshot: unknown): unknown { return snapshot; } }",
  "src/workbench/observe-query.ts": 'import type { ObservationProjection } from "./observation.js";\nexport function observeInvocation(reader: ObservationProjection): unknown { return reader; }',
  "src/workbench/evidence-loader.ts": "export class EvidenceStore { request(): Promise<void> { return Promise.resolve(); } }",
  "src/launch.ts": 'import { createAgentSession } from "@earendil-works/pi-coding-agent";\nexport function runL(): unknown { return createAgentSession({}); }\nexport const SPIN = ["a", "b"];',
  "src/quiet.ts": "export function quietly(): number { return 1; }",
  "src/workbench/claude-host.ts": 'import { query } from "@anthropic-ai/claude-agent-sdk";\nexport function createClaudeWorkflowHost(): unknown { return query; }',
  "src/workbench/claude-transcript.ts": "export function readClaudeTranscript(): string { return \"\"; }",
  "src/workbench/native-modules.ts": [
    "async function importAll(): Promise<unknown> {",
    '  const claudeHost = await import("./claude-host.js");',
    '  const claudeTranscript = await import("./claude-transcript.js");',
    "  return { get createClaudeWorkflowHost() { return claudeHost.createClaudeWorkflowHost; }, get readClaudeTranscript() { return claudeTranscript.readClaudeTranscript; } };",
    "}",
    "export function loadWorkbenchNative(): Promise<unknown> { return importAll(); }",
  ].join("\n"),
};
const PLANE_MODULE = "src/workbench/plane.ts";
const KNOWS = 'import type { ObservationProjection } from "./observation.js";\n';

/** The census of a constructed graph whose plane module holds `text`, beside the stubs and `extra` modules. */
function graphCensus(text: string, extra: Readonly<Record<string, string>> = {}, modelSide: readonly string[] = []): Census {
  return censusOf(new Map<string, string>(Object.entries({ ...STUBS, ...extra, [PLANE_MODULE]: text })), CORES, SEAM, modelSide);
}
function graphViolations(text: string, extra: Readonly<Record<string, string>> = {}, modelSide: readonly string[] = []): number {
  return graphCensus(text, extra, modelSide).violations.length;
}
/** The sites one constructed module holds. */
function siteCount(text: string): number {
  return sitesOf("src/control.ts", text).length;
}
/** Whether `text`, as src/workbench/a.ts beside the stubs and `extra`, is a knower of its constructed graph (B2's knowing controls). */
function knowsIn(text: string, extra: Readonly<Record<string, string>> = {}): boolean {
  return censusOf(new Map(Object.entries({ ...STUBS, ...extra, "src/workbench/a.ts": text })), CORES, SEAM, []).knowers.includes("src/workbench/a.ts");
}

/** The spelled texts of one module's AST that B3 and D1 read: identifiers, private identifiers without their #, and string or template
 * literal texts (a string, a no-substitution template, a template head, middle or tail). B3 and D1 share it; it is claimed only on
 * their witnesses (header CLAIM RULE). */
function spellingsOf(path: string, text: string): string[] {
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isPrivateIdentifier(node)) out.push(node.text.slice(1));
    else if (ts.isIdentifier(node) || ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) out.push(node.text);
    ts.forEachChild(node, visit);
  };
  visit(sourceOf(path, text));
  return out;
}
function isListenerName(name: string): boolean {
  return LISTENER_PREFIX.test(name) || LISTENER_NAMES.includes(name);
}
/** B3 (ii): a function, constructor, method, call or construct signature type node, or a type reference to a FUNCTION_TYPES name
 * (claimed on B3's witnesses). */
function isCallableType(node: ts.Node): boolean {
  if (ts.isTypeReferenceNode(node)) return ts.isIdentifier(node.typeName) && FUNCTION_TYPES.includes(node.typeName.text);
  return ts.isFunctionTypeNode(node) || ts.isConstructorTypeNode(node) || ts.isMethodSignature(node) || ts.isCallSignatureDeclaration(node) || ts.isConstructSignatureDeclaration(node);
}
/** The declaration names that hold a node, outermost first, joined by dots (an unnamed holder adds nothing). */
function ownerOf(node: ts.Node): string {
  const names: string[] = [];
  for (let at: ts.Node | undefined = node; at !== undefined && !ts.isSourceFile(at); at = at.parent) {
    const name = ts.getNameOfDeclaration(at as ts.Declaration);
    if (name !== undefined && (ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteralLike(name))) names.unshift(name.text);
  }
  return names.join(".");
}

interface SubscriptionReading {
  readonly listeners: readonly string[];
  readonly callables: readonly string[];
  readonly heritage: readonly string[];
}
/** B3's SUBSCRIPTION READING (i)-(iii) of module texts, each entry labeled by its module. */
function subscriptionsOf(texts: Readonly<Record<string, string>>): SubscriptionReading {
  const listeners: string[] = [];
  const callables: string[] = [];
  const heritage: string[] = [];
  for (const [path, text] of Object.entries(texts)) {
    for (const spelled of spellingsOf(path, text)) if (isListenerName(spelled)) listeners.push(`${path}: ${spelled}`);
    const visit = (node: ts.Node): void => {
      if (isCallableType(node)) callables.push(`${path}: ${ownerOf(node)}`);
      if (ts.isHeritageClause(node)) heritage.push(`${path}: ${ownerOf(node)} ${node.getText()}`);
      ts.forEachChild(node, visit);
    };
    visit(sourceOf(path, text));
  }
  return { listeners: listeners.sort(), callables: callables.sort(), heritage: heritage.sort() };
}
/** B3 (iv): the own property names of each prototype that are listener-vocabulary names, as `<class>.<name>` (claimed on B3's
 * prototype witnesses). */
function prototypeListenersOf(prototypes: Readonly<Record<string, object>>): string[] {
  return Object.entries(prototypes)
    .flatMap(([name, prototype]) => Object.getOwnPropertyNames(prototype).filter(isListenerName).map(member => `${name}.${member}`))
    .sort();
}
/** B3's reading of the three cores in one module map: each core's whole text (the real reading and each per-core plant share it). */
function coreSubscriptionsOf(sources: Sources): SubscriptionReading {
  return subscriptionsOf(Object.fromEntries(CORES.map(core => [core, sources.get(core) ?? ""])));
}
/** B3's per-core plants, one before and one after each core's text: each holds one listener spelling, one callable type node and
 * one heritage clause (onCoreHead, CoreHeadFeed.onCoreHead.listener and CoreHeadFeed extends EventTarget at the head; the
 * CorePlant names at the tail); each planted reading is witnessed whole in the roster. */
const CORE_HEAD_PLANT = "export class CoreHeadFeed extends EventTarget { onCoreHead(listener: () => void): void { void listener; } }";
const CORE_PLANT = "export class CorePlantFeed extends EventTarget { onCorePlant(listener: () => void): void { void listener; } }";
/** B3 (iv)'s per-class plant: an on<Name> first and a LISTENER_NAMES name last, around a stand-in of one real prototype. */
const PROTOTYPE_PLANT = ["onCorePlant", "subscribe"] as const;
/** A stand-in of a prototype: PROTOTYPE_PLANT's first name, then the prototype's own properties (descriptors copied as configurable,
 * nothing invoked), then PROTOTYPE_PLANT's last name - one planted name at each end of the own-name order. */
function plantedPrototype(prototype: object): object {
  const standIn: object = {};
  const planted = { value: (): number => 0, configurable: true };
  Object.defineProperty(standIn, PROTOTYPE_PLANT[0], planted);
  for (const [name, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(prototype))) Object.defineProperty(standIn, name, { ...descriptor, configurable: true });
  Object.defineProperty(standIn, PROTOTYPE_PLANT[1], planted);
  return standIn;
}
/** The real core classes' prototypes B3 (iv) reads. */
const PROTOTYPES: Readonly<Record<string, object>> = { EvidenceStore: EvidenceStore.prototype, ObservationProjection: ObservationProjection.prototype };
/** B3 (iv)'s run-time control names: onChange and every LISTENER_NAMES member, spelled here (refusal #2's U2: the names form). */
const PROBE_LISTENERS: readonly string[] = [
  "addEventListener", "addListener", "listen", "onChange", "removeEventListener", "removeListener", "subscribe", "unsubscribe", "unwatch", "watch",
];
/** B3 (iv)'s run-time control: a class whose prototype gains every PROBE_LISTENERS name when this module evaluates. */
class PrototypeProbe {
  refresh(): number {
    return 1;
  }
}
for (const name of PROBE_LISTENERS) Object.defineProperty(PrototypeProbe.prototype, name, { value: (): number => 0 });
/** B3 (iv)'s descriptor control (the carrier cut, refusal #3's U2): a class whose prototype holds one listener name in each of
 * these descriptor forms when this module evaluates - a class-body method (onBody) and getter (onBodyGetter), an accessor defined
 * with a getter (onGetter), a setter (onSetter) and both (onAccessor), a data property holding a number (onValue) and one holding
 * an object (watch), and a function-valued data property with every attribute true (subscribe). */
class DescriptorProbe {
  onBody(): number {
    return 1;
  }
  get onBodyGetter(): number {
    return 1;
  }
}
Object.defineProperty(DescriptorProbe.prototype, "onGetter", { get: (): number => 0 });
Object.defineProperty(DescriptorProbe.prototype, "onSetter", { set: (value: number): void => void value });
Object.defineProperty(DescriptorProbe.prototype, "onAccessor", { get: (): number => 0, set: (value: number): void => void value });
Object.defineProperty(DescriptorProbe.prototype, "onValue", { value: 0 });
Object.defineProperty(DescriptorProbe.prototype, "watch", { value: { quiet: true } });
Object.defineProperty(DescriptorProbe.prototype, "subscribe", { value: (): number => 0, writable: true, enumerable: true, configurable: true });

/** B2's anchors of a module graph, by form: the graph's modules each anchor form names, and the plane UI modules. */
function anchorsOf(paths: Iterable<string>): Record<string, string[]> {
  const sorted = [...paths].sort();
  const anchors: Record<string, string[]> = { planeUi: [...PLANE_UI] };
  for (const [form, pattern] of Object.entries(ANCHOR_FORMS)) anchors[form] = sorted.filter(path => pattern.test(path));
  return anchors;
}
/** The anchors of a graph that are no knower of it. */
function unknowingAnchorsOf(census: Census): string[] {
  const knowers = new Set(census.knowers);
  return Object.values(anchorsOf(census.facts.keys())).flat().filter(path => !knowers.has(path)).sort();
}
/** D1's warm-start reading: the sites of a WARM_STARTS export. */
function warmStartsOf(sites: readonly string[]): string[] {
  return sites.filter(site => WARM_STARTS.some(name => site.endsWith(` ${name}`)));
}

const IMPL: Record<string, () => JsonValue | Promise<JsonValue>> = {
  A1: () => {
    const installed: Record<string, Record<string, unknown>> = {
      "@anthropic-ai/claude-agent-sdk": claudeAgentSdk,
      "@earendil-works/pi-ai": piAi,
      "@earendil-works/pi-coding-agent": piCodingAgent,
    };
    const launchExports: Record<string, string[]> = {};
    for (const [name, exports] of Object.entries(LAUNCH_EXPORTS)) {
      const namespace = installed[name] ?? {};
      launchExports[name] = exports.filter(entry => typeof namespace[entry] === "function");
    }
    const piAiManifest: unknown = JSON.parse(readFileSync(join(REPO, "node_modules", "@earendil-works", "pi-ai", "package.json"), "utf8"));
    const declared = isObject(piAiManifest) && isObject(piAiManifest.dependencies) ? Object.keys(piAiManifest.dependencies) : [];
    const types = readFileSync(join(REPO, "node_modules", "@earendil-works", "pi-coding-agent", "dist", "core", "extensions", "types.d.ts"), "utf8");
    const runtime = readFileSync(join(REPO, "node_modules", "@earendil-works", "pi-coding-agent", "dist", "core", "model-runtime.d.ts"), "utf8");
    return {
      launchExports,
      providers: PROVIDER_PACKAGES.filter(name => declared.includes(name)),
      wholeSubpaths: [...WHOLE_SUBPATHS],
      turns: {
        sendUserMessage: types.includes("Always triggers a turn.") && types.includes("sendUserMessage("),
        triggerTurn: types.includes("triggerTurn?: boolean;"),
      },
      runtimeMembers: [...RUNTIME_ANY, ...RUNTIME_CALLED].filter(name => new RegExp(`\\b${name}(?:<[^>]*>)?\\(`).test(runtime)).sort(),
    };
  },
  A2: () => {
    const census = srcCensusOf();
    const sources = srcSources();
    const plant = 'import { query as ws05PlantQuery } from "@anthropic-ai/claude-agent-sdk";\n';
    const sites = sitesList(census);
    // The carrier cut (refusal #4's U2, R-B353): each walked file is planted alone, and its planted walk is read through the walk's own
    // site reading (censusOf, then sitesList, reusing the facts of every unchanged module): it reads exactly the walk's sites plus that
    // one query site there, so a reading that drops a module, or a site past some count in one, misses this extra binding.
    const missedPlants = [...sources].filter(([path, text]) => {
      const planted = sitesList(censusOf(new Map(sources).set(path, `${text}\n${plant}`), CORES, SEAM, MODEL_SIDE, census));
      return !sameList(planted, [...sites, `${path}: @anthropic-ai/claude-agent-sdk query`].sort());
    }).map(([path]) => path);
    return { modulesAboveFloor: census.facts.size >= SRC_FLOOR, sites, topLevel: [...census.topLevel], missedPlants };
  },
  A3: () => ({
    // Kill controls: each form reads its sites.
    named: siteCount('import { createAgentSession } from "@earendil-works/pi-coding-agent";'),
    aliased: siteCount('import { query as sdkQuery } from "@anthropic-ai/claude-agent-sdk";'),
    subpath: siteCount('import { createAgentSession } from "@earendil-works/pi-coding-agent/dist/index.js";'),
    namespaceMember: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nsdk.query({ prompt: "x" });'),
    namespaceLiteralKey: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nsdk["prewarm"]();'),
    namespaceComputed: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nconst key = "query";\nsdk[key]({ prompt: "x" });'),
    namespaceArgument: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nhold(sdk);'),
    namespaceDestructured: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nconst { startup } = sdk;'),
    namespaceSpread: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nconst copy = { ...sdk };'),
    namespaceAlias: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nconst alias = sdk;'),
    defaultMember: siteCount('import agent from "@earendil-works/pi-coding-agent";\nagent.createAgentSession({});'),
    importEquals: siteCount('import sdk = require("@anthropic-ai/claude-agent-sdk");\nsdk.query({ prompt: "x" });'),
    reexportNamed: siteCount('export { query } from "@anthropic-ai/claude-agent-sdk";'),
    reexportStar: siteCount('export * from "@anthropic-ai/claude-agent-sdk";'),
    reexportNamespace: siteCount('export * as sdk from "@anthropic-ai/claude-agent-sdk";'),
    dynamicDestructured: siteCount('export async function go(): Promise<void> { const { createAgentSession } = await import("@earendil-works/pi-coding-agent"); }'),
    dynamicMember: siteCount('export async function go(): Promise<void> { (await import("@anthropic-ai/claude-agent-sdk")).query({ prompt: "x" }); }'),
    dynamicBound: siteCount('export async function go(): Promise<void> { const sdk = await import("@anthropic-ai/claude-agent-sdk");\nsdk.query({ prompt: "x" }); }'),
    dynamicOpaque: siteCount('hold(import("@anthropic-ai/claude-agent-sdk"));'),
    requireLiteral: siteCount('const { query } = require("@anthropic-ai/claude-agent-sdk");'),
    createRequireLiteral: siteCount('const sdk = createRequire(import.meta.url)("@anthropic-ai/claude-agent-sdk");\nsdk.startup();'),
    providerDefault: siteCount('import Anthropic from "@anthropic-ai/sdk";'),
    providerNamed: siteCount('import { GoogleGenAI } from "@google/genai";'),
    providerSubpath: siteCount('import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime/dist-cjs/index.js";'),
    piAiProvider: siteCount('import { streamAnthropic } from "@earendil-works/pi-ai/providers/anthropic";'),
    piAiApi: siteCount('import { stream } from "@earendil-works/pi-ai/api/openai-completions";'),
    piAiClient: siteCount('import { createModels } from "@earendil-works/pi-ai";'),
    turnUser: siteCount('pi.sendUserMessage("go");'),
    turnUserLiteralKey: siteCount('pi["sendUserMessage"]("go");'),
    turnTrigger: siteCount('pi.sendMessage(message, { deliverAs: "followUp", triggerTurn: true });'),
    turnTriggerComputed: siteCount("pi.sendMessage(message, { triggerTurn: wanted });"),
    turnShorthand: siteCount("const triggerTurn = true;\npi.sendMessage(message, { triggerTurn });"),
    turnAssigned: siteCount("options.triggerTurn = true;"),
    runtimeSimple: siteCount("runtime.completeSimple(model, context);"),
    runtimeDeferredRead: siteCount("const fetch = runtime.fetchDeferred;"),
    runtimeDestructured: siteCount("const { streamSimple } = runtime;"),
    runtimeCalled: siteCount("runtime.complete(model, context);"),
    runtimeOptional: siteCount("runtime?.stream(model, context);"),
    runtimeViaCall: siteCount("runtime.stream.call(runtime, model, context);"),
    runtimeViaApply: siteCount("runtime.stream.apply(runtime, [model, context]);"),
    runtimeViaBind: siteCount("runtime.complete.bind(runtime);"),
    runtimeDestructuredAlias: siteCount('const { "fetchDeferred": fetch } = runtime;'),
    namespaceAliasedDestructured: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nconst { query: launch } = sdk;'),
    dynamicLiteralMember: siteCount('(await import("@anthropic-ai/claude-agent-sdk"))["query"]({});'),
    // Quiet rows: none reads a site.
    typeOnlyImport: siteCount('import type { Options, Query } from "@anthropic-ai/claude-agent-sdk";'),
    typeOnlySpecifier: siteCount('import { type SDKMessage, getSessionMessages } from "@anthropic-ai/claude-agent-sdk";'),
    typeOnlyReexport: siteCount('export type { Options } from "@anthropic-ai/claude-agent-sdk";'),
    typeOnlyLaunchSpecifier: siteCount('import { type AgentSession, type ModelRuntime, getAgentDir } from "@earendil-works/pi-coding-agent";'),
    typeOnlyLaunchClause: siteCount('import type { AgentSession, createAgentSession } from "@earendil-works/pi-coding-agent";'),
    nonLaunchExports: siteCount('import { createSdkMcpServer, forkSession, getSessionInfo, tool } from "@anthropic-ai/claude-agent-sdk";\nimport { getAgentDir, SessionManager } from "@earendil-works/pi-coding-agent";'),
    namespaceTypeQuery: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\ntype Q = typeof sdk;'),
    sideEffectImport: siteCount('import "@anthropic-ai/claude-agent-sdk";'),
    localQuery: siteCount('import { query } from "./workbench/local-query.js";\nquery();'),
    triggerTurnFalse: siteCount("pi.sendMessage(message, { deliverAs: \"nextTurn\", triggerTurn: false });"),
    turnInComment: siteCount("// pi.sendUserMessage would trigger a turn here; this module never calls it.\nconst text = \"sendUserMessage\";"),
    dataFields: siteCount("const busy = log.stream === \"stdout\" && result.complete;\nconst { stream, complete } = history;"),
    // R-ALIASED-RUNTIME quiet row: a generic runtime member reached through an alias or Reflect.apply.
    aliasedRuntime: siteCount("const run = runtime.complete;\nrun(model, context);\nReflect.apply(runtime.stream, runtime, [model, context]);"),
  }),
  B1: () => {
    const census = srcCensusOf();
    const sources = srcSources();
    const surfaces: string[] = [];
    for (const core of CORES) {
      const text = sources.get(core) ?? "";
      const source = sourceOf(core, text);
      for (const statement of source.statements) {
        const exported = ts.canHaveModifiers(statement) && ts.getModifiers(statement)?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) === true;
        if (!exported) continue;
        if (ts.isClassDeclaration(statement) && statement.name !== undefined && ["EvidenceStore", "ObservationProjection"].includes(statement.name.text)) surfaces.push(`${core}: class ${statement.name.text}`);
        if (ts.isFunctionDeclaration(statement) && statement.name?.text === "observeInvocation") surfaces.push(`${core}: function ${statement.name.text}`);
      }
    }
    return {
      cores: CORES.filter(core => census.facts.has(core)),
      surfaces: surfaces.sort(),
      runtime: [typeof EvidenceStore, typeof ObservationProjection, typeof observeInvocation],
    };
  },
  B2: () => {
    const census = srcCensusOf();
    const knowers = new Set(census.knowers);
    const anchors = anchorsOf(census.facts.keys());
    // A constructed graph: the plane UI modules know a core; one unknowing module of each anchor form, a knowing one, and each
    // form's near-miss names (a plural, a missing dash, another directory, a subdirectory, the src root, a capitalized name)
    // that no anchor form names.
    const anchorGraph = censusOf(new Map(Object.entries({
      ...STUBS,
      ...Object.fromEntries(PLANE_UI.map(path => [path, 'import type { ObservationProjection } from "../workbench/observation.js";\n'])),
      "src/workbench/Gp-14_plant-observer.ts": "export const plant = 1;",
      "src/workbench/Gp-14_plant-evidence.ts": "export const plant = 2;",
      "src/workbench/evidence-Gp-14_plant.ts": "export const plant = 3;",
      "src/workbench/knowing-observer.ts": KNOWS,
      "src/workbench/plant-observers.ts": "export const plant = 4;",
      "src/workbench/plantevidence.ts": "export const plant = 5;",
      "src/ui/plant-observer.ts": "export const plant = 6;",
      "src/ui/evidence-plant.ts": "export const plant = 8;",
      "src/workbench/sub/plant-evidence.ts": "export const plant = 7;",
      // Cut #3: the rest of each form's near-miss names.
      "src/workbench/plantobserver.ts": "export const plant = 9;",
      "src/workbench/sub/plant-observer.ts": "export const plant = 10;",
      "src/plant-observer.ts": "export const plant = 11;",
      "src/workbench/plant-Observer.ts": "export const plant = 12;",
      "src/workbench/plant-evidences.ts": "export const plant = 13;",
      "src/ui/plant-evidence.ts": "export const plant = 14;",
      "src/plant-evidence.ts": "export const plant = 15;",
      "src/workbench/plant-Evidence.ts": "export const plant = 16;",
      "src/workbench/evidences-plant.ts": "export const plant = 17;",
      "src/workbench/evidenceplant.ts": "export const plant = 18;",
      "src/workbench/sub/evidence-plant.ts": "export const plant = 19;",
      "src/evidence-plant.ts": "export const plant = 20;",
      "src/workbench/Evidence-plant.ts": "export const plant = 21;",
    })), CORES, SEAM, []);
    // Cut #3: the knowing of each module of the walk is live (the A2/D1 missedPlants form over the knower reading) - with a type
    // import of a core planted into every module at once, no module is left unknowing.
    const plantedSources = srcSources();
    for (const [path, text] of plantedSources) {
      const target = posix.relative(posix.dirname(path), "src/workbench/observation.js");
      plantedSources.set(path, `${text}\nimport type { ObservationProjection as KnowingPlant } from "${target.startsWith(".") ? target : `./${target}`}";\n`);
    }
    const plantedKnowers = new Set(censusOf(plantedSources, CORES, SEAM, MODEL_SIDE).knowers);
    return {
      knowersAboveFloor: census.knowers.length >= KNOWER_FLOOR,
      coresKnown: CORES.every(core => knowers.has(core)),
      knowingPlants: [...plantedSources.keys()].filter(path => !plantedKnowers.has(path)).sort(),
      anchorFloors: Object.fromEntries(Object.entries(anchors).map(([form, paths]) => [form, paths.length >= (ANCHOR_FLOORS[form] ?? Number.POSITIVE_INFINITY)])),
      missingAnchors: unknowingAnchorsOf(census),
      controls: {
        byTypeImport: censusOf(new Map(Object.entries({ ...STUBS, "src/workbench/a.ts": KNOWS })), CORES, SEAM, []).knowers.includes("src/workbench/a.ts"),
        atDistance: censusOf(new Map(Object.entries({ ...STUBS, "src/workbench/a.ts": KNOWS, "src/b.ts": 'import type { X } from "./workbench/a.js";' })), CORES, SEAM, []).knowers.includes("src/b.ts"),
        byImportType: censusOf(new Map(Object.entries({ ...STUBS, "src/a.ts": 'type P = import("./workbench/observation.js").ObservationProjection;' })), CORES, SEAM, []).knowers.includes("src/a.ts"),
        unrelated: censusOf(new Map(Object.entries({ ...STUBS, "src/a.ts": 'import { quietly } from "./quiet.js";' })), CORES, SEAM, []).knowers.includes("src/a.ts"),
        unknowingAnchors: unknowingAnchorsOf(anchorGraph),
        // Cut #3 (U4): the knowing edge forms THE PLANE names, one constructed module apiece (the type-only re-exports among them).
        edgeForms: {
          typeClause: knowsIn('import type { ObservationProjection } from "./observation.js";'),
          typeSpecifier: knowsIn('import { type ObservationProjection } from "./observation.js";'),
          valueImport: knowsIn('import { ObservationProjection } from "./observation.js";'),
          defaultImport: knowsIn('import observation from "./observation.js";'),
          namespaceImport: knowsIn('import * as observation from "./observation.js";'),
          sideEffectImport: knowsIn('import "./observation.js";'),
          namedReexport: knowsIn('export { ObservationProjection } from "./observation.js";'),
          typeReexport: knowsIn('export type { ObservationProjection } from "./observation.js";'),
          starReexport: knowsIn('export * from "./observation.js";'),
          typeStarReexport: knowsIn('export type * from "./observation.js";'),
          namespaceReexport: knowsIn('export * as observation from "./observation.js";'),
          importEquals: knowsIn('import observation = require("./observation.js");'),
          typeImportEquals: knowsIn('import type observation = require("./observation.js");'),
          importType: knowsIn('export type P = import("./observation.js").ObservationProjection;'),
          typeofImportType: knowsIn('export type P = typeof import("./observation.js");'),
          dynamicImport: knowsIn('export async function load(): Promise<unknown> { return import("./observation.js"); }'),
          dynamicTemplate: knowsIn("export async function load(): Promise<unknown> { return import(`./observation.js`); }"),
          requireLoad: knowsIn('export const observation: unknown = require("./observation.js");'),
          requireTemplate: knowsIn("export const observation: unknown = require(`./observation.js`);"),
          createRequireLoad: knowsIn('export const observation: unknown = createRequire(import.meta.url)("./observation.js");'),
          createRequireTemplate: knowsIn("export const observation: unknown = createRequire(import.meta.url)(`./observation.js`);"),
          // The carrier cut (refusal #3's U5): a type-only namespace and a type-only default clause, and a default clause beside named and
          // beside namespace bindings.
          typeNamespaceClause: knowsIn('import type * as observation from "./observation.js";'),
          typeDefaultClause: knowsIn('import type observation from "./observation.js";'),
          defaultWithNamed: knowsIn('import observation, { ObservationProjection } from "./observation.js";'),
          defaultWithNamespace: knowsIn('import observation, * as all from "./observation.js";'),
        },
        // The specifier resolutions THE PLANE names: the .js, .mjs and .cjs spellings, the .ts spelling, extensionless and a
        // directory's index.ts.
        resolution: {
          js: knowsIn('import type { ObservationProjection } from "./observation.js";'),
          mjs: knowsIn('import type { ObservationProjection } from "./observation.mjs";'),
          cjs: knowsIn('import type { ObservationProjection } from "./observation.cjs";'),
          ts: knowsIn('import type { ObservationProjection } from "./observation.ts";'),
          extensionless: knowsIn('import type { ObservationProjection } from "./observation";'),
          directoryIndex: knowsIn('import type { Indexed } from "./indexed";', {
            "src/workbench/indexed/index.ts": 'import type { ObservationProjection } from "../observation.js";\nexport type Indexed = ObservationProjection;',
          }),
        },
        // R-UNNAMED-PLANE quiet rows: these four namings of a core outside the knowing edges make no knower.
        unread: {
          augmentation: knowsIn('declare module "./observation.js" {\n  interface ObservationProjection { readonly extra: number }\n}\nexport {};'),
          tripleSlash: knowsIn('/// <reference path="./observation.ts" />\nexport const plain = 1;'),
          composedSpecifier: knowsIn(`export async function load(name: string): Promise<unknown> { return import(\`./\${name}.js\`); }`),
          bareSpecifier: knowsIn('import type { ObservationProjection } from "src/workbench/observation.js";'),
        },
      },
    };
  },
  B3: () => {
    const sources = srcSources();
    const cores = coreSubscriptionsOf(sources);
    // Cut #3 (U1): each core's reading is live in the A2/D1 missedPlants form - with CORE_HEAD_PLANT before and CORE_PLANT after one
    // core's text at a time, the cores' whole reading is witnessed: the base entries plus that core's six planted entries.
    const corePlants = Object.fromEntries(CORES.map(core => {
      const planted = new Map(sources);
      planted.set(core, `${CORE_HEAD_PLANT}\n${sources.get(core) ?? ""}\n${CORE_PLANT}\n`);
      const reading = coreSubscriptionsOf(planted);
      return [core, { listeners: [...reading.listeners], callables: [...reading.callables], heritage: [...reading.heritage] }];
    }));
    // Cut #3: each class's prototype reading is live - with one real prototype at a time replaced by a stand-in carrying
    // PROTOTYPE_PLANT's names around its own properties, the prototypes' whole reading is witnessed, and so is the copy.
    const prototypePlants = Object.fromEntries(Object.entries(PROTOTYPES).map(([name, prototype]) => {
      const standIn = plantedPrototype(prototype);
      return [name, {
        listeners: prototypeListenersOf({ ...PROTOTYPES, [name]: standIn }),
        copied: Object.getOwnPropertyNames(standIn).length >= (PROTOTYPE_FLOORS[name] ?? Number.POSITIVE_INFINITY) + PROTOTYPE_PLANT.length,
      }];
    }));
    const control = (text: string): { listeners: number; callables: number; heritage: number } => {
      const reading = subscriptionsOf({ "src/workbench/observation.ts": text });
      return { listeners: reading.listeners.length, callables: reading.callables.length, heritage: reading.heritage.length };
    };
    const vocabulary = subscriptionsOf({
      "src/workbench/observation.ts":
        "export class Feed { onChange(): void {} subscribe(): void {} unsubscribe(): void {} addListener(): void {} removeListener(): void {} addEventListener(): void {} removeEventListener(): void {} listen(): void {} watch(): void {} unwatch(): void {} }",
    });
    return {
      listeners: [...cores.listeners],
      callables: [...cores.callables],
      heritage: [...cores.heritage],
      corePlants,
      prototypeFloors: Object.fromEntries(Object.entries(PROTOTYPES).map(([name, prototype]) => [name, Object.getOwnPropertyNames(prototype).length >= (PROTOTYPE_FLOORS[name] ?? Number.POSITIVE_INFINITY)])),
      prototypeListeners: prototypeListenersOf(PROTOTYPES),
      prototypePlants,
      prototypeControl: prototypeListenersOf({ PrototypeProbe: PrototypeProbe.prototype }),
      // The carrier cut (refusal #3's U2): one listener name in each descriptor form DescriptorProbe holds.
      descriptorControl: prototypeListenersOf({ DescriptorProbe: DescriptorProbe.prototype }),
      // Every vocabulary name, each read once (a name dropped from the vocabulary drops out of this list).
      vocabulary: vocabulary.listeners.map(label => label.slice(label.indexOf(": ") + 2)),
      controls: {
        // Cut #1's controls (a callback type reads as a callable type).
        onChange: control("export class ObservationProjection { onChange(listener: () => void): void { void listener; } }"),
        subscribe: control("export class EvidenceStore { subscribe(listener: () => void): void { void listener; } }"),
        callbackOption: control("export interface EvidenceStoreOptions { readonly maxEntries: number; readonly onSettled?: () => void }"),
        listenerOption: control("export interface ObservationLimits { readonly addListener?: (event: string) => void }"),
        quietMethod: control("export class ObservationProjection { refresh(snapshot: unknown): unknown { return snapshot; } }"),
        // A private method name is read (privateMember); the near-miss names nearMisses holds read quiet.
        privateMember: control("export class ObservationProjection { private onInternal(): void {} }"),
        nearMisses: control("export class Feed { on(): void {} once(): void {} online(): void {} onset(): void {} listener(): void {} listening(): void {} subscriber(): void {} watcher(): void {} reasonText(): void {} emit(): void {} }"),
        // Cut #3 (U3): on with each ASCII upper-case letter A-Z and the six tails prefixTails holds; the near misses prefixNearMisses
        // holds read quiet.
        prefixLetters: control(`export const letters = [${[...ASCII_UPPER].map(letter => `on${letter}`).join(", ")}];`),
        prefixTails: control("export const tails = [onX, onXy, onXY, onX1, onX_, onX$];"),
        prefixNearMisses: control("export const near = [on, ona, onz, on_x, on$x, on1x, On, OnChange, ONCHANGE, oNChange];"),
        // LISTENER_NAMES match exactly: the case and affix variants namesNearMisses holds read quiet.
        namesNearMisses: control("export const near = [Subscribe, SUBSCRIBE, Watch, Listen, AddListener, addlistener, resubscribe, subscribed, rewatch, unlisten];"),
        // Each spelling kind.
        identifierName: control("export function subscribe(target: unknown): void { void target; }"),
        privateName: control("export class Feed { #onChange(): void {} }"),
        stringName: control('export class Feed { "subscribe"(): void {} }'),
        templateName: control("export const feed = { [`watch`]: 1 };"),
        templateSpans: control(`export const names = (a: string, b: string): string[] => [\`listen\${a}\`, \`\${a}listen\${b}\`, \`\${b}listen\`];`),
        // Positions: a module-level binding, a string literal type and a call argument.
        bindingName: control("export const onRefresh = 1;"),
        typePosition: control('export type Mode = "subscribe" | "quiet";'),
        argumentPosition: control('register("watch");'),
        // The member forms refusal #1 named: FO1-FO6, then RB06, RB11, RB13 and RB08 (RB07 is stringName).
        moduleFunction: control("export function subscribe(listener: (projection: ObservationProjection) => void): () => void { void listener; return () => undefined; }"),
        moduleOnChange: control("export function onProjectionChange(listener: (projection: ObservationProjection) => void): void { void listener; }"),
        objectLiteral: control("export const projectionChanges = { subscribe(listener: () => void): void { void listener; } };"),
        emitterSubclass: control('import { EventEmitter } from "node:events";\nexport class ProjectionFeed extends EventEmitter {}'),
        typeAliasOption: control("export type EvidenceStoreHooks = { readonly onSettled?: () => void };"),
        anonymousDefaultClass: control("export default class { onSettled(listener: () => void): void { void listener; } }"),
        classExpression: control("export const Feed = class FeedImpl { onChange(): void {} };"),
        protectedMember: control("export class Feed { protected onChange(): void {} }"),
        staticMember: control("export class Feed { static onChange(): void {} }"),
        interfaceStringName: control('export interface Hooks { readonly "onSettled"?: () => void }'),
        // Each callable kind in the positions these controls hold (the carrier cut's type-literal, aliased and parameter positions are
        // below; other positions are NOT CLAIMED: U4).
        functionType: control("export function follow(handler: () => void): void { void handler; }"),
        constructorType: control("export type Make = new () => object;"),
        methodSignature: control("export interface Hooks { settled(): void }"),
        callSignature: control("export interface Hook { (): void }"),
        constructSignature: control("export interface Make { new (): object }"),
        functionNames: control("export function follow(a: Function, b: CallableFunction, c: NewableFunction): void { void [a, b, c]; }"),
        // The four heritage forms these controls hold.
        classExtends: control("export class Feed extends EventTarget {}"),
        classImplements: control("export class Feed implements Hooks {}"),
        interfaceExtends: control("export interface Hooks extends EventTarget {}"),
        classExpressionHeritage: control("export const Feed = class extends EventTarget {};"),
        // Quiet: the line comment commentOnly holds is not read.
        commentOnly: control("// subscribe(listener) would hang a change feed here; this module holds none.\nexport const quiet = 1;"),
        // R-UNNAMED-SUBSCRIPTION quiet rows: feeds with no listener spelling, callable type node or heritage clause.
        importedCallable: control('import type { Handler } from "./handler.js";\nexport function follow(handler: Handler): void { void handler; }'),
        typeofCallable: control("function noop(): void {}\nexport function follow(handler: typeof noop): void { void handler; }"),
        qualifiedCallable: control("export function follow(handler: globalThis.Function): void { void handler; }"),
        globalEmitter: control("export const changes = new EventTarget();"),
        promiseFeed: control("export class Feed { settled(): Promise<void> { return Promise.resolve(); } }"),
        iteratorFeed: control("export async function* changes(): AsyncGenerator<number> { yield 1; }"),
        unlistedNames: control(`export class Feed { notify(): void {} observe(): void {} on${String.fromCodePoint(0xc9)}vent(): void {} }`),
        composedName: control(`export function wire(target: Record<string, unknown>, name: string): void { target[\`on\${name}\`] = true; }`),
        lateDefinition: control('export class Feed { constructor() { Object.defineProperty(Feed.prototype, ["on", "Change"].join(""), { value: (): number => 0 }); } }'),
        // The carrier cut (refusal #3's U1): a listener name on a class member under each modifier, and a parameter property.
        publicMember: control("export class Feed { public onChange(): void {} }"),
        asyncMember: control("export class Feed { async onChange(): Promise<void> {} }"),
        abstractMember: control("export abstract class Feed { abstract onChange(): void; }"),
        declareClass: control("export declare class Feed { onChange(): void; }"),
        declareMember: control("export class Feed { declare onChange: () => void; }"),
        overrideMember: control("export class Feed extends Base { override onChange(): void {} }"),
        accessorMember: control("export class Feed { accessor onChange = 1; }"),
        readonlyMember: control("export class Feed { readonly onChange = 1; }"),
        parameterProperty: control("export class Feed { constructor(public onChange: number) {} }"),
        // The carrier cut (refusal #3's U3): a listener name in each identifier position.
        memberAccessName: control("export const handle = (globalThis as unknown as Record<string, unknown>).addEventListener;"),
        parameterName: control("export function relay(onChange: number): void {}"),
        classFieldName: control("export class Holder { onChange = 1; }"),
        propertyAssignmentName: control("export const hooks = { onChange: 1 };"),
        getAccessorName: control("export class Feed { get onChange(): number { return 1; } }"),
        setAccessorName: control("export class Feed { set onChange(value: number) { void value; } }"),
        enumMemberName: control("export enum Mode { onChange = 1 }"),
        typeParameterName: control("export type Box<onChange> = number;"),
        // The carrier cut (refusal #3's U4): each signature kind in a type literal, a function type directly under a type alias and a
        // constructor type as a parameter type.
        typeLiteralMethodSignature: control("export type Hooks = { settled(): void };"),
        typeLiteralCallSignature: control("export type Hook = { (): void };"),
        typeLiteralConstructSignature: control("export type Make = { new (): object };"),
        aliasedFunctionType: control("export type Follow = (value: number) => void;"),
        parameterConstructorType: control("export function build(make: new () => object): object { return new make(); }"),
      },
    };
  },
  C1: () => {
    const census = srcCensusOf();
    const knowers = new Set(census.knowers);
    const siteSet = new Set(census.siteModules);
    const justified = MODEL_SIDE.map(path => {
      if (siteSet.has(path)) return `${path}: site`;
      const direct = census.facts.get(path)?.valueEdges.map(edge => edge.target).find(target => siteSet.has(target));
      return direct === undefined ? `${path}: unjustified` : `${path} -> ${direct}`;
    });
    return {
      violations: [...census.violations],
      typedHandles: [...census.typedHandles],
      knowersReaching: [...census.reaching.keys()].filter(path => knowers.has(path)).sort(),
      justified,
      reaching: [...census.reaching.keys()].sort(),
      siteModules: [...census.siteModules],
      seamMembers: Object.fromEntries([...census.seamMembers].map(([member, targets]) => [member, [...targets]])),
      seamImporters: Object.fromEntries([...census.seamImporters].map(([path, members]) => [path, [...members]])),
      plantedMissing: (() => {
        const outside = census.knowers.filter(path => !MODEL_SIDE.includes(path));
        const sources = srcSources();
        for (const path of outside) sources.set(path, `${sources.get(path) ?? ""}\nimport { query as ws05PlantQuery } from "@anthropic-ai/claude-agent-sdk";\n`);
        const planted = censusOf(sources, CORES, SEAM, MODEL_SIDE);
        return outside.filter(path => !planted.violations.includes(path));
      })(),
    };
  },
  C2: () => ({
    topLevel: {
      // Kill controls: these module evaluations call a launch binding, a reaching import or a host turn (the literal-constant premise
      // breaks).
      callsLaunchBinding: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": 'import { createAgentSession } from "@earendil-works/pi-coding-agent";\nexport const SESSION = createAgentSession({});' }).topLevel.length,
      callsAliasedDynamic: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": 'const { query: launch } = await import("@anthropic-ai/claude-agent-sdk");\nlaunch({});' }).topLevel.length,
      callsAliasedNamespace: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": 'import * as sdk from "@anthropic-ai/claude-agent-sdk";\nconst { query: launch } = sdk;\nlaunch({});' }).topLevel.length,
      callsProviderDefault: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": 'import Client from "@anthropic-ai/sdk";\nnew Client();' }).topLevel.length,
      callsProviderDynamic: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": 'const Client = await import("@anthropic-ai/sdk");\nnew Client();' }).topLevel.length,
      callsReachingImport: graphCensus(`${KNOWS}import { SPIN } from "./frames.js";\nexport const frames = SPIN;`, { "src/workbench/frames.ts": 'import { runL } from "../launch.js";\nexport const SPIN = ["a"];\nrunL();' }).topLevel.length,
      topLevelTurn: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": "declare const pi: { sendUserMessage(text: string): void };\npi.sendUserMessage(\"boot\");" }).topLevel.length,
      // Quiet row: the same calls inside a function declaration's and an arrow's body, neither called during evaluation, read none.
      insideFunction: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": 'import { createAgentSession } from "@earendil-works/pi-coding-agent";\nexport function start(): unknown { return createAgentSession({}); }\nexport const later = (): unknown => createAgentSession({});' }).topLevel.length,
    },
    typedHandles: {
      // Kill controls: these two type-only bindings of a knower from a reaching module are typed handles.
      typedLauncher: graphCensus(`${KNOWS}import type { runL } from "../launch.js";\nexport function onRefresh(run: typeof runL): unknown { return run(); }`).typedHandles.length,
      typedImportType: graphCensus(`${KNOWS}export function onRefresh(run: typeof import("../launch.js").runL): unknown { return run(); }`).typedHandles.length,
      // Quiet rows: a structural handle (R-INJECTED) and a type from a module that reaches nothing.
      structural: graphCensus(`${KNOWS}export function onRefresh(run: () => unknown): unknown { return run(); }`).typedHandles.length,
      typedQuiet: graphCensus(`${KNOWS}import type { quietly } from "../quiet.js";\nexport type Q = typeof quietly;`).typedHandles.length,
    },
    // Kill controls: each plane module reaches a launch site once.
    direct: graphViolations(`${KNOWS}import { runL } from "../launch.js";\nexport function onRefresh(): unknown { return runL(); }`),
    transitive: graphViolations(`${KNOWS}import { middle } from "./middle.js";\nmiddle();`, { "src/workbench/middle.ts": 'import { runL } from "../launch.js";\nexport function middle(): unknown { return runL(); }' }),
    reexportNamed: graphViolations(`${KNOWS}import { runL } from "./relay.js";\nrunL();`, { "src/workbench/relay.ts": 'export { runL } from "../launch.js";' }),
    reexportStar: graphViolations(`${KNOWS}import { runL } from "./relay.js";\nrunL();`, { "src/workbench/relay.ts": 'export * from "../launch.js";' }),
    sideEffect: graphViolations(`${KNOWS}import "../launch.js";`),
    importEquals: graphViolations(`${KNOWS}import launch = require("../launch.js");\nlaunch.runL();`),
    dynamic: graphViolations(`${KNOWS}export async function onRefresh(): Promise<unknown> { return (await import("../launch.js")).runL(); }`),
    dynamicDestructured: graphViolations(`${KNOWS}export async function onRefresh(): Promise<unknown> { const { runL } = await import("../launch.js"); return runL(); }`),
    requireLiteral: graphViolations(`${KNOWS}const { runL } = createRequire(import.meta.url)("../launch.js");\nexport const go = (): unknown => runL();`),
    selfLaunch: graphViolations(`${KNOWS}import { query } from "@anthropic-ai/claude-agent-sdk";\nexport const go = (): unknown => query({ prompt: "x" });`),
    selfProvider: graphViolations(`${KNOWS}import OpenAI from "openai";\nexport const client = (): unknown => new OpenAI();`),
    injectedTurn: graphViolations(`${KNOWS}export function onRefresh(pi: { sendUserMessage(text: string): void }): void { pi.sendUserMessage("refresh"); }`),
    injectedTrigger: graphViolations(`${KNOWS}export function onRefresh(pi: { sendMessage(m: unknown, o: unknown): void }): void { pi.sendMessage({}, { triggerTurn: true }); }`),
    injectedRuntime: graphViolations(`${KNOWS}export function onRefresh(runtime: { completeSimple(m: unknown, c: unknown): unknown }): unknown { return runtime.completeSimple({}, {}); }`),
    seamLaunchMember: graphViolations(`${KNOWS}import { loadWorkbenchNative } from "./native-modules.js";\nexport async function go(): Promise<unknown> { const native = (await loadWorkbenchNative()) as { createClaudeWorkflowHost(): unknown }; return native.createClaudeWorkflowHost(); }`),
    seamTypedMember: graphViolations(`${KNOWS}import type { loadWorkbenchNative } from "./native-modules.js";\nexport function go(native: { createClaudeWorkflowHost(): unknown }, load: typeof loadWorkbenchNative): unknown { void load; return native.createClaudeWorkflowHost(); }`),
    nonLiteralConst: graphViolations(`${KNOWS}import { RUN } from "./holder.js";\nRUN();`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const RUN = (): unknown => runL();' }),
    seamStaticEdge: graphViolations(`${KNOWS}import { loadWorkbenchNative } from "./native-modules.js";\nexport async function read(): Promise<unknown> { const native = (await loadWorkbenchNative()) as { readClaudeTranscript(): string }; return native.readClaudeTranscript(); }`, {
      "src/workbench/native-modules.ts": `import { runL } from "../launch.js";\n${STUBS["src/workbench/native-modules.ts"] ?? ""}\nexport const warm = (): unknown => runL();`,
    }),
    mixedLiteral: graphViolations(`${KNOWS}import { SPIN, runL } from "../launch.js";\nexport const go = (): unknown => [SPIN, runL()];`),
    atDistance: graphViolations('import { runL } from "../launch.js";\nimport type { Middle } from "./middle.js";\nexport const go = (m: Middle): unknown => [m, runL()];', { "src/workbench/middle.ts": `${KNOWS}export type Middle = ObservationProjection;` }),
    // Quiet rows, except mixedArray and mixedObject: none of these reaches a launch site (a launch binding inside an array or an
    // object const is code, so those two read as edges).
    typeOnlyEdge: graphViolations(`${KNOWS}import type { runL } from "../launch.js";\nexport type R = typeof runL;`),
    literalConst: graphViolations(`${KNOWS}import { SPIN } from "../launch.js";\nexport const frames = SPIN;`),
    mixedArray: graphViolations(`${KNOWS}import { VALUE } from "./holder.js";`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const VALUE = ["quiet", runL];' }),
    mixedObject: graphViolations(`${KNOWS}import { VALUE } from "./holder.js";`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const VALUE = { quiet: "quiet", launch: runL };' }),
    literalParenthesized: graphViolations(`${KNOWS}import { VALUE } from "./holder.js";`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const VALUE = ("quiet");' }),
    literalSatisfies: graphViolations(`${KNOWS}import { VALUE } from "./holder.js";`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const VALUE = "quiet" satisfies string;' }),
    literalTemplate: graphViolations(`${KNOWS}import { VALUE } from "./holder.js";`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const VALUE = `quiet`;' }),
    literalStringKey: graphViolations(`${KNOWS}import { VALUE } from "./holder.js";`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const VALUE = { "quiet-key": "quiet" };' }),
    literalObject: graphViolations(`${KNOWS}import { NAMES, PCT } from "./names.js";\nexport const both = [NAMES, PCT];`, {
      "src/workbench/names.ts": 'import { runL } from "../launch.js";\nexport const NAMES = { AGENT: "Agent", STEER: "steer", depth: -1, on: true, none: null } as const;\nexport const PCT = 70;\nexport function later(): unknown { return runL(); }',
    }),
    seamReadMember: graphViolations(`${KNOWS}import { loadWorkbenchNative } from "./native-modules.js";\nexport async function read(): Promise<unknown> { const native = (await loadWorkbenchNative()) as { readClaudeTranscript(): string }; return native.readClaudeTranscript(); }`),
    reverseDirection: graphViolations(`${KNOWS}export const plain = 1;`, { "src/feeder.ts": 'import { runL } from "./launch.js";\nimport type { ObservationProjection } from "./workbench/observation.js";\nexport function feed(p: ObservationProjection): unknown { return [p, runL()]; }' }, ["src/feeder.ts"]),
    // R-MODEL-SIDE quiet row: a model-side module that knows the plane and launches is exempt by construction.
    modelSide: graphViolations(`${KNOWS}import { runL } from "../launch.js";\nexport function onRefresh(): unknown { return runL(); }`, {}, [PLANE_MODULE]),
    // R-INJECTED quiet rows: a launcher handed in as a parameter, and one left on a global.
    injected: graphViolations(`${KNOWS}export function onRefresh(launch: () => unknown): unknown { return launch(); }`),
    injectedGlobal: graphViolations(`${KNOWS}export function onRefresh(): unknown { return (globalThis as { launch?: () => unknown }).launch?.(); }`),
    // R-COMPOSED quiet rows: a specifier assembled at run time, and a module loaded by a path string.
    composed: graphViolations(`${KNOWS}export async function onRefresh(name: string): Promise<unknown> { const target = "../" + name + ".js"; return import(target); }`),
    workerLoad: graphViolations(`${KNOWS}import { Worker } from "node:worker_threads";\nexport function onRefresh(): unknown { return new Worker(new URL("../launch.js", import.meta.url)); }`),
    // R-UNNAMED-PLANE quiet row: a structural projection with no import edge to a core.
    unnamedPlane: graphViolations('import { runL } from "../launch.js";\nexport function onRefresh(p: { refresh(s: unknown): unknown }, s: unknown): unknown { p.refresh(s); return runL(); }'),
    // R-NON-SDK-LAUNCH quiet row: a spawned model CLI.
    cliLaunch: graphViolations(`${KNOWS}import { spawn } from "node:child_process";\nexport function onRefresh(): unknown { return spawn("claude", ["-p", "summarize the change"]); }`),
    // R-NON-SDK-LAUNCH quiet rows: a raw HTTP request to a model endpoint, and an IPC request to a host process.
    ipcLaunch: graphViolations(`${KNOWS}import { connect } from "node:net";\nexport function onRefresh(path: string): unknown { return connect(path).write(JSON.stringify({ verb: "launch" })); }`),
    httpLaunch: graphViolations(`${KNOWS}export function onRefresh(): Promise<unknown> { return fetch("https://model.invalid/v1/messages", { method: "POST", body: "{}" }); }`),
    // R-COMPOSED quiet row: a seam member assembled at run time.
    seamComposedMember: graphViolations(`${KNOWS}import { loadWorkbenchNative } from "./native-modules.js";\nexport async function go(part: string): Promise<unknown> { const native = (await loadWorkbenchNative()) as Record<string, () => unknown>; return native[\`createClaude\${part}\`]?.(); }`),
  }),
  D1: () => {
    const census = srcCensusOf();
    // Each (path, text) is read once: a planted walk re-reads only its planted module (the reading is a function of both alone).
    const read = new Map<string, Map<string, readonly string[]>>();
    const vocabulary = (path: string, text: string): string[] => {
      const byText = read.get(path) ?? new Map<string, readonly string[]>();
      const entries = byText.get(text) ?? spellingsOf(path, text).filter(spelled => SPECULATION.test(spelled)).map(spelled => `${path}: ${spelled}`);
      read.set(path, byText.set(text, entries));
      return [...entries];
    };
    /** D1's spelling reading of a walk: the real reading reads the walk through it, and missedPlants reads each planted walk. */
    const readingOf = (sources: Sources): { readonly vocabulary: string[] } => ({
      vocabulary: [...sources].flatMap(([path, text]) => vocabulary(path, text)).sort(),
    });
    const real = readingOf(srcSources());
    const walk = srcSources();
    const plant = "export const ws05SpeculativeInference = true;\n";
    const control = (text: string): number => vocabulary("src/control.ts", text).length;
    const warmControl = (text: string): number => warmStartsOf(sitesOf("src/control.ts", text)).length;
    return {
      checklist: [...OPT_IN_CHECKLIST],
      licenseClause: LICENSE_CLAUSE,
      vocabulary: real.vocabulary,
      warmStarts: warmStartsOf(sitesList(census)),
      // The carrier cut (refusal #4's U1, R-B353): each module of a second read of the walk is planted alone and its planted walk is read
      // through readingOf: it reads exactly the real reading plus that one spelling there, so a reading that drops a module, or the tail
      // of one, misses it.
      missedPlants: [...walk].filter(([path, text]) => !sameList(readingOf(new Map(walk).set(path, `${text}\n${plant}`)).vocabulary, [...real.vocabulary, `${path}: ws05SpeculativeInference`].sort())).map(([path]) => path),
      controls: {
        identifier: control("export const speculativeInference = { enabled: true };"),
        string: control('export const MODE = "speculation";'),
        comment: control("// Speculative inference stays off: this module never warms a model.\nexport const MODE = 1;"),
        // R-VOCABULARY quiet row: a seam worded outside the vocabulary.
        outsideVocabulary: control("export const prewarmedInference = { enabled: true };"),
        // Cut #2: each remaining token kind (a private identifier, read twice here; a no-substitution template; a head, middle and tail).
        privateName: control("export class Holder { #speculativeDepth = 0; depth(): number { return this.#speculativeDepth; } }"),
        noSubstitutionTemplate: control("export const MODE = `speculation`;"),
        templateSpans: control(`export const label = (a: string, b: string): string => \`speculative-\${a}-speculative-\${b}-speculative\`;`),
        // Cut #3: the bare stem in either case (SPECULATION is held to the roster; a narrowed or case-sensitive stem misses these).
        stem: control("export const specul = 1;\nexport const SPECUL = 2;"),
        // The carrier cut (refusal #3's U1): a /specul/i name on a class member under each modifier, and a parameter property.
        privateMember: control("export class Holder { private speculativeDepth = 0; }"),
        protectedMember: control("export class Holder { protected speculativeDepth = 0; }"),
        staticMember: control("export class Holder { static speculativeDepth = 0; }"),
        publicMember: control("export class Holder { public speculativeDepth = 0; }"),
        asyncMember: control("export class Holder { async speculativeStep(): Promise<number> { return 1; } }"),
        abstractMember: control("export abstract class Holder { abstract speculativeStep(): number; }"),
        declareClass: control("export declare class Holder { speculativeDepth: number; }"),
        declareMember: control("export class Holder { declare speculativeDepth: number; }"),
        overrideMember: control("export class Holder extends Base { override speculativeStep(): number { return 1; } }"),
        accessorMember: control("export class Holder { accessor speculativeDepth = 0; }"),
        readonlyMember: control("export class Holder { readonly speculativeDepth = 0; }"),
        parameterProperty: control("export class Holder { constructor(public speculativeDepth: number) {} }"),
        // The carrier cut (refusal #3's U3): a /specul/i name in each identifier position.
        memberAccessName: control("export const mode = (globalThis as unknown as Record<string, unknown>).speculativeMode;"),
        parameterName: control("export function step(speculativeDepth: number): void {}"),
        classFieldName: control("export class Holder { speculativeDepth = 0; }"),
        propertyAssignmentName: control("export const options = { speculativeDepth: 0 };"),
        getAccessorName: control("export class Holder { get speculativeDepth(): number { return 0; } }"),
        setAccessorName: control("export class Holder { set speculativeDepth(value: number) { void value; } }"),
        enumMemberName: control("export enum Mode { speculative = 1 }"),
        typeParameterName: control("export type Box<Speculative> = number;"),
      },
      warmStartControls: {
        prewarm: warmControl('import { prewarm } from "@anthropic-ai/claude-agent-sdk";'),
        startup: warmControl('import { startup as warm } from "@anthropic-ai/claude-agent-sdk";'),
        // Quiet: a launch export that is no warm start.
        query: warmControl('import { query } from "@anthropic-ai/claude-agent-sdk";'),
      },
    };
  },
};

/** The judged pins whose case reached its witness assertion; the last case reads it. */
const REACHED = new Set<string>();

describe("wb-km7q.7 A1-D1 model-binding, plane-closure and opt-in-checklist census", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:3", "C:2", "D:1"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    // An external requirement anchor: coordinated row/roster deletion must not delete the filing's acceptance clause.
    const filing = readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")
      .filter(line => line.includes('"id":"wb-km7q.7"'))
      .map((line): unknown => JSON.parse(line))
      .find(entry => isObject(entry) && entry.id === "wb-km7q.7");
    expect(isObject(filing) && typeof filing.notes === "string").toBe(true);
    const notes = isObject(filing) && typeof filing.notes === "string" ? filing.notes : "";
    const acceptance = /Acceptance: ([^\n]+)\./.exec(notes)?.[1] ?? "";
    expect(acceptance.length).toBeGreaterThan(0);
    expect(ROWS.flatMap(row => row.requirement === undefined ? [] : [row.requirement]))
      .toEqual(acceptance.split(", plus "));

    expect({
      launchExports: LAUNCH_EXPORTS, providerPackages: PROVIDER_PACKAGES, wholeSubpaths: WHOLE_SUBPATHS, turnMembers: TURN_MEMBERS,
      runtimeMembers: [...RUNTIME_ANY, ...RUNTIME_CALLED], cores: CORES, seam: SEAM, modelSide: MODEL_SIDE,
      optInChecklist: OPT_IN_CHECKLIST, licenseClause: LICENSE_CLAUSE,
      listenerNames: LISTENER_NAMES, functionTypes: FUNCTION_TYPES, warmStarts: WARM_STARTS,
      // Cut #3: the readings' regular expressions (source and flags; U3 holds LISTENER_PREFIX's letter range) and their floors.
      listenerPrefix: String(LISTENER_PREFIX), speculation: String(SPECULATION),
      anchorForms: Object.fromEntries(Object.entries(ANCHOR_FORMS).map(([form, pattern]) => [form, String(pattern)])),
      floors: { src: SRC_FLOOR, knowers: KNOWER_FLOOR, anchors: ANCHOR_FLOORS, prototypes: PROTOTYPE_FLOORS },
    }).toStrictEqual({
      launchExports: ROSTER.launchExports, providerPackages: ROSTER.providerPackages, wholeSubpaths: ROSTER.wholeSubpaths,
      turnMembers: ROSTER.turnMembers, runtimeMembers: ROSTER.runtimeMembers, cores: ROSTER.cores, seam: ROSTER.seam,
      modelSide: ROSTER.modelSide, optInChecklist: ROSTER.optInChecklist, licenseClause: ROSTER.licenseClause,
      listenerNames: ROSTER.listenerNames, functionTypes: ROSTER.functionTypes, warmStarts: ROSTER.warmStarts,
      listenerPrefix: ROSTER.listenerPrefix, speculation: ROSTER.speculation, anchorForms: ROSTER.anchorForms, floors: ROSTER.floors,
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.add(pin);
        });
      }
    });
  }

  it("registration: every judged pin registered once, ran in run mode, was not inverted and reached its witness", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file, exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name), "every other test ran in run mode, not inverted").toEqual([]);
    expect([...REACHED].sort(), "every judged pin reached its witness assertion").toEqual(ROWS.flatMap(row => row.pins).sort());
  });
});
