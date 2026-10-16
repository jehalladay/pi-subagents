/**
 * VC-5/W15 (wb-6ze.38): docs/workbench/10-terminal-inspector.md "Failure and deception defenses" census falsifier.
 *
 * The five docs/10 honesty sentences are each bound to landed fixture cases by file + verbatim title. The census
 * reads the pinned test files as TEXT at HEAD and never executes a pinned case, so it claims only the docs/14
 * truth label "fixture pass". A rename, deletion, duplicate or it.skip / it.todo / it.fails / it.only of any
 * pinned case turns the defense's row red by name, so the docs/10 claim cannot be quietly weakened. A row with
 * no landed case is recorded 'unpinned' with a reason and is never counted as passed.
 *
 * Scanner strength (wb-6ze.38 respin, 00:31Z title-census rule): pinned files are PARSED (TypeScript AST), never
 * regex-matched, so comments, strings and templates cannot forge or hide a declaration, and every skip route the
 * gate measured (comment-out, options-object skip/todo/only, describe-level skip/todo/only/skipIf/runIf chains,
 * context skip(), conditional declaration, stray sibling .only, case-level skipIf/runIf) turns the defense red BY
 * NAME. The tier label is read from the SAME vitest config module the gate loads, and both docs pins are
 * section-bounded and exact, never a document-wide substring.
 *
 * docs/14 "Truth labels and release gates": "Each major work package must have a falsifier: a negative test that
 * would fail if a critical guarantee was quietly weakened."
 */
import { existsSync, readFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import config from "../vitest.config.js";

interface Pin {
  readonly file: string;
  readonly title: string;
}

interface DefenseRow {
  readonly defense: string;
  readonly quote: string;
  readonly tier: "default-gate";
  readonly truthLabel: "fixture pass";
  readonly status: "pinned" | "unpinned";
  readonly reason?: string;
  readonly pins: readonly Pin[];
}

interface Verdict {
  readonly ok: boolean;
  readonly problems: readonly string[];
}

const repoFile = (path: string): string => new URL(`../${path}`, import.meta.url).pathname;
const readRepo = (path: string): string | undefined => (existsSync(repoFile(path)) ? readFileSync(repoFile(path), "utf8") : undefined);

const DOCS_10 = "docs/workbench/10-terminal-inspector.md";
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";

const DOCS_10_QUOTES: readonly string[] = [
  "STALLED vs WAITING vs STALE vs UNKNOWN must not be confused.",
  "Spinner should not imply work progressed.",
  "Node result with missing evidence is not marked verified merely because process exited 0.",
  "Cancel controls unavailable for observers without lifecycle authority.",
  "Historical reads with limited retention show missing details honestly.",
];

const DOCS_14_FALSIFIER =
  "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";

const DEFENSE_IDS: readonly string[] = [
  "D1 status axes never confused",
  "D2 spinner never implies progress",
  "D3 exit 0 never means verified",
  "D4 no cancel controls for observers",
  "D5 limited-retention reads honest",
];

// ---------------------------------------------------------------------------------------------------------------
// Parse-aware case scanner. Pinned files are parsed with the TypeScript compiler API; only real call expressions
// rooted at it/test/describe/suite count, so comments, strings and templates are inert by construction.
// ---------------------------------------------------------------------------------------------------------------
const CASE_ROOTS: ReadonlySet<string> = new Set(["it", "test"]);
const SUITE_ROOTS: ReadonlySet<string> = new Set(["describe", "suite"]);
const MODIFIER_NAMES: ReadonlySet<string> = new Set(["skip", "todo", "only", "fails", "skipIf", "runIf"]);
const SUITE_HAZARD_NAMES: ReadonlySet<string> = new Set(["skip", "todo", "only", "skipIf", "runIf"]);
const OPTION_KEYS: ReadonlySet<string> = new Set(["skip", "todo", "only", "fails"]);
const CONTEXT_NAMES: readonly string[] = ["ctx", "context", "t", "task"];

interface Chain {
  readonly root: string;
  readonly props: readonly string[];
  readonly viaCall: boolean;
}

interface CaseOccurrence {
  readonly title: string;
  readonly modifiers: readonly string[];
  readonly direct: boolean;
  readonly dynamicSkip: boolean;
}

interface FileScan {
  readonly cases: readonly CaseOccurrence[];
  readonly hazards: readonly string[];
}

const chainOf = (expression: ts.Expression): Chain | undefined => {
  const props: string[] = [];
  let viaCall = false;
  let current: ts.Expression = expression;
  for (;;) {
    if (ts.isParenthesizedExpression(current) || ts.isNonNullExpression(current) || ts.isAsExpression(current)) {
      current = current.expression;
    } else if (ts.isPropertyAccessExpression(current)) {
      props.unshift(current.name.text);
      current = current.expression;
    } else if (ts.isElementAccessExpression(current)) {
      const key = current.argumentExpression;
      props.unshift(ts.isStringLiteralLike(key) ? key.text : "<computed>");
      current = current.expression;
    } else if (ts.isCallExpression(current)) {
      viaCall = true;
      current = current.expression;
    } else if (ts.isIdentifier(current)) {
      return { root: current.text, props, viaCall };
    } else {
      return undefined;
    }
  }
};

const labelOf = (chain: Chain): string => `${chain.root}${chain.props.map((prop) => `.${prop}`).join("")}${chain.viaCall ? "(...)" : ""}`;

const isFunctionLike = (node: ts.Node): node is ts.ArrowFunction | ts.FunctionExpression => ts.isArrowFunction(node) || ts.isFunctionExpression(node);

/** The call whose callee this call is (it.skipIf(x) inside it.skipIf(x)("t")), so the outer call owns the title. */
const isCalleeOfCall = (call: ts.CallExpression): boolean => {
  let node: ts.Node = call;
  while (ts.isParenthesizedExpression(node.parent)) node = node.parent;
  return ts.isCallExpression(node.parent) && node.parent.expression === node;
};

const optionProblems = (options: ts.ObjectLiteralExpression): string[] => {
  const out: string[] = [];
  for (const property of options.properties) {
    if (ts.isSpreadAssignment(property)) {
      out.push("options spread");
    } else if (ts.isShorthandPropertyAssignment(property)) {
      if (OPTION_KEYS.has(property.name.text)) out.push(`options ${property.name.text}`);
    } else if (ts.isPropertyAssignment(property) || ts.isMethodDeclaration(property)) {
      const name = property.name;
      if (ts.isComputedPropertyName(name)) {
        out.push("options computed key");
        continue;
      }
      const key = ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name) ? name.text : "<unknown>";
      if (!OPTION_KEYS.has(key)) continue;
      if (ts.isPropertyAssignment(property) && property.initializer.kind === ts.SyntaxKind.FalseKeyword) continue;
      out.push(`options ${key}`);
    }
  }
  return out;
};

const earlyExit = (node: ts.Node): boolean => {
  if (ts.isReturnStatement(node) || ts.isThrowStatement(node)) return true;
  if (isFunctionLike(node) || ts.isFunctionDeclaration(node) || ts.isClassLike(node)) return false;
  return ts.forEachChild(node, (child) => (earlyExit(child) ? true : undefined)) === true;
};

const isDirectDeclaration = (call: ts.CallExpression): boolean => {
  const statement = call.parent;
  if (!ts.isExpressionStatement(statement)) return false;
  const container = statement.parent;
  if (ts.isSourceFile(container)) return true;
  if (!ts.isBlock(container) || !isFunctionLike(container.parent)) return false;
  const holder = container.parent.parent;
  if (!ts.isCallExpression(holder)) return false;
  const chain = chainOf(holder.expression);
  return chain !== undefined && SUITE_ROOTS.has(chain.root);
};

const bodySkips = (fn: ts.ArrowFunction | ts.FunctionExpression): boolean => {
  const names = new Set<string>(CONTEXT_NAMES);
  let skips = false;
  for (const parameter of fn.parameters) {
    if (ts.isIdentifier(parameter.name)) names.add(parameter.name.text);
    else skips = skips || bindingHasSkip(parameter.name);
  }
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const chain = chainOf(node.expression);
      if (chain !== undefined) {
        if (chain.props.length === 0 && chain.root === "skip") skips = true;
        if (names.has(chain.root) && chain.props[0] === "skip") skips = true;
      }
    }
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name) && bindingHasSkip(node.name)) skips = true;
    ts.forEachChild(node, visit);
  };
  if (fn.body) visit(fn.body);
  return skips;
};

const bindingHasSkip = (pattern: ts.BindingName): boolean => {
  if (!ts.isObjectBindingPattern(pattern)) return false;
  return pattern.elements.some((element) => {
    if (element.dotDotDotToken !== undefined) return true;
    const key = element.propertyName ?? element.name;
    return (ts.isIdentifier(key) || ts.isStringLiteralLike(key)) && key.text === "skip";
  });
};

const scanSource = (source: string): FileScan => {
  const file = ts.createSourceFile("pinned.test.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const cases: CaseOccurrence[] = [];
  const hazards: string[] = [];
  const lineOf = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;

  const inspect = (call: ts.CallExpression): void => {
    const chain = chainOf(call.expression);
    if (chain === undefined || isCalleeOfCall(call)) return;
    const isCase = CASE_ROOTS.has(chain.root);
    const isSuite = SUITE_ROOTS.has(chain.root);
    if (!isCase && !isSuite) return;
    const label = labelOf(chain);
    const chainModifiers = chain.props.filter((prop) => MODIFIER_NAMES.has(prop));
    const optionHits = call.arguments.slice(1).flatMap((argument) => (ts.isObjectLiteralExpression(argument) ? optionProblems(argument) : []));
    if (chain.props.includes("only") || optionHits.includes("options only")) hazards.push(`a focused .only (${label}) at line ${lineOf(call)}`);
    if (isSuite) {
      if (chain.props.some((prop) => SUITE_HAZARD_NAMES.has(prop))) hazards.push(`${label} at line ${lineOf(call)}`);
      for (const hit of optionHits) hazards.push(`${label} with ${hit} at line ${lineOf(call)}`);
      const callback = call.arguments.find(isFunctionLike);
      if (callback !== undefined && callback.body !== undefined && ts.isBlock(callback.body) && earlyExit(callback.body)) {
        hazards.push(`${label} callback with an early return/throw at line ${lineOf(call)}`);
      }
      return;
    }
    const first = call.arguments[0];
    if (first === undefined || !ts.isStringLiteralLike(first)) return;
    const modifiers: string[] = [];
    if (chain.props.length > 0 || chain.viaCall) modifiers.push(chainModifiers.length > 0 ? label : `${label} (non-plain declaration)`);
    modifiers.push(...optionHits);
    for (const argument of call.arguments.slice(1)) {
      if (isFunctionLike(argument) || ts.isObjectLiteralExpression(argument) || ts.isNumericLiteral(argument)) continue;
      modifiers.push("opaque argument");
    }
    const callback = call.arguments.find(isFunctionLike);
    cases.push({ title: first.text, modifiers, direct: isDirectDeclaration(call), dynamicSkip: callback !== undefined && bodySkips(callback) });
  };

  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) inspect(node);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { cases, hazards };
};

const verifyPin = (source: string | undefined, pin: Pin): Verdict => {
  if (source === undefined) return { ok: false, problems: [`${pin.file}: file is missing`] };
  const scan = scanSource(source);
  const hits = scan.cases.filter((c) => c.title === pin.title);
  const problems: string[] = [];
  if (hits.length === 0) problems.push(`${pin.file}: case ${JSON.stringify(pin.title)} not found (renamed or deleted)`);
  if (hits.length > 1) problems.push(`${pin.file}: case ${JSON.stringify(pin.title)} occurs ${hits.length} times, expected exactly once`);
  for (const hit of hits) {
    for (const modifier of hit.modifiers) problems.push(`${pin.file}: case ${JSON.stringify(pin.title)} is declared with modifier ${modifier}`);
    if (!hit.direct) problems.push(`${pin.file}: case ${JSON.stringify(pin.title)} is conditionally declared (not a direct statement of its describe callback)`);
    if (hit.dynamicSkip) problems.push(`${pin.file}: case ${JSON.stringify(pin.title)} can skip itself at run time (context skip() in its body)`);
  }
  if (hits.length > 0) {
    for (const hazard of scan.hazards) problems.push(`${pin.file}: case ${JSON.stringify(pin.title)} sits in a file with ${hazard}`);
  }
  return { ok: problems.length === 0, problems };
};

// ---------------------------------------------------------------------------------------------------------------
// Tier truth: a 'default-gate' pin must be matched by test.include and absent from test.exclude of the SAME config
// module the gate loads (the test/workbench-gate-allow-only.test.ts pattern), never by a constant on the row.
// ---------------------------------------------------------------------------------------------------------------
const globToRegExp = (glob: string): RegExp | undefined => {
  if (/[?[\](){}!+@]/.test(glob)) return undefined;
  let out = "";
  for (let index = 0; index < glob.length; index += 1) {
    if (glob.startsWith("**/", index)) {
      out += "(?:.*/)?";
      index += 2;
    } else if (glob[index] === "*") {
      out += "[^/]*";
    } else {
      out += (glob[index] ?? "").replace(/[.\\^$|]/g, "\\$&");
    }
  }
  return new RegExp(`^${out}$`);
};

const stringList = (value: unknown): readonly string[] | undefined =>
  Array.isArray(value) && value.every((entry) => typeof entry === "string") ? (value as readonly string[]) : undefined;

const tierProblems = (loaded: unknown, files: readonly string[]): readonly string[] => {
  const test = (loaded as { test?: Record<string, unknown> } | undefined)?.test;
  if (test === undefined || typeof test !== "object") return ["vitest config has no test section: the gate tier cannot be read"];
  const problems: string[] = [];
  for (const unsupported of ["projects", "workspace", "dir", "root"]) {
    if (test[unsupported] !== undefined) problems.push(`vitest config sets test.${unsupported}: the census cannot read the gate tier`);
  }
  const include = stringList(test.include);
  const exclude = test.exclude === undefined ? [] : stringList(test.exclude);
  if (include === undefined || include.length === 0) problems.push("vitest config test.include is missing or not a string list");
  if (exclude === undefined) problems.push("vitest config test.exclude is not a string list");
  if (problems.length > 0 || include === undefined || exclude === undefined) return problems;
  const matchers = (globs: readonly string[], kind: string): readonly RegExp[] =>
    globs.flatMap((glob) => {
      const matcher = globToRegExp(glob);
      if (matcher === undefined) problems.push(`vitest config test.${kind} glob ${JSON.stringify(glob)} is outside the census glob subset`);
      return matcher === undefined ? [] : [matcher];
    });
  const included = matchers(include, "include");
  const excluded = matchers(exclude, "exclude");
  for (const file of files) {
    if (!included.some((m) => m.test(file))) problems.push(`${file}: not matched by vitest test.include, so it is not in the default gate`);
    if (excluded.some((m) => m.test(file))) problems.push(`${file}: matched by vitest test.exclude, so it left the default gate`);
  }
  return problems;
};

// ---------------------------------------------------------------------------------------------------------------
// Docs exactness: section-bounded, never a document-wide substring.
// ---------------------------------------------------------------------------------------------------------------
const sectionBody = (doc: string | undefined, heading: string): { readonly body?: string; readonly problems: readonly string[] } => {
  if (doc === undefined) return { problems: ["file is missing"] };
  const lines = doc.split("\n");
  const starts: number[] = [];
  let fenced = false;
  const headingIndexes: number[] = [];
  lines.forEach((line, index) => {
    if (line.startsWith("```")) fenced = !fenced;
    if (fenced) return;
    if (/^#{1,6}\s/.test(line)) headingIndexes.push(index);
    if (line === heading) starts.push(index);
  });
  if (starts.length !== 1) return { problems: [`heading ${JSON.stringify(heading)} occurs ${starts.length} times as an exact line, expected exactly once`] };
  const start = starts[0] ?? 0;
  const next = headingIndexes.find((index) => index > start);
  return { body: lines.slice(start + 1, next ?? lines.length).join("\n"), problems: [] };
};

const docs10Problems = (doc: string | undefined): readonly string[] => {
  const section = sectionBody(doc, "## Failure and deception defenses");
  if (section.body === undefined) return section.problems.map((p) => `${DOCS_10}: ${p}`);
  return section.body.trim() === DOCS_10_QUOTES.join(" ")
    ? []
    : [`${DOCS_10}: section "## Failure and deception defenses" is not exactly the five defense sentences (extra, missing, qualified or moved text)`];
};

const WEAKENING_VOCABULARY = /\b(advisory|optional|may be omitted|may be skipped|non-binding|not required|waived?|best[- ]effort)\b/i;

const docs14Problems = (doc: string | undefined): readonly string[] => {
  const section = sectionBody(doc, "## Truth labels and release gates");
  if (section.body === undefined) return section.problems.map((p) => `${DOCS_14}: ${p}`);
  const body = section.body.trim();
  const at = body.indexOf(DOCS_14_FALSIFIER);
  if (at < 0) return [`${DOCS_14}: falsifier sentence is missing from section "## Truth labels and release gates"`];
  const problems: string[] = [];
  if (body.indexOf(DOCS_14_FALSIFIER, at + 1) >= 0) problems.push(`${DOCS_14}: falsifier sentence occurs more than once in its section`);
  if (!/(^|[.!?]\s+)$/.test(body.slice(0, at))) problems.push(`${DOCS_14}: falsifier sentence is qualified by text before it in its section`);
  const rest = body.slice(at + DOCS_14_FALSIFIER.length);
  if (!rest.startsWith("\n\n") && rest.trim() !== "") problems.push(`${DOCS_14}: text follows the falsifier sentence in its own paragraph (the sentence must close its paragraph)`);
  const weakening = WEAKENING_VOCABULARY.exec(`${body.slice(0, at)} ${rest}`);
  if (weakening !== null) problems.push(`${DOCS_14}: section carries weakening wording ${JSON.stringify(weakening[0])} beside the falsifier sentence`);
  return problems;
};

const evaluateRow = (row: DefenseRow, read: (path: string) => string | undefined, loadedConfig: unknown = config): Verdict => {
  const problems: string[] = [];
  if (row.status === "pinned") {
    if (row.pins.length === 0) problems.push(`${row.defense}: pinned row has zero pins`);
    for (const problem of tierProblems(loadedConfig, [...new Set(row.pins.map((pin) => pin.file))])) problems.push(`${row.defense}: ${problem}`);
    for (const pin of row.pins) {
      for (const problem of verifyPin(read(pin.file), pin).problems) problems.push(`${row.defense}: ${problem}`);
    }
  } else {
    if (row.reason === undefined || row.reason.trim() === "") problems.push(`${row.defense}: unpinned row has no reason`);
    if (row.pins.length > 0) problems.push(`${row.defense}: unpinned row carries pins`);
  }
  return { ok: problems.length === 0, problems };
};

const ROWS: readonly DefenseRow[] = [
  {
    defense: DEFENSE_IDS[0] ?? "",
    quote: DOCS_10_QUOTES[0] ?? "",
    tier: "default-gate",
    truthLabel: "fixture pass",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-attention.test.ts",
        title: "a disconnect raises stale and disconnected by the provider's node count and leaves waiting and unknown alone",
      },
      {
        file: "test/workbench-claude-topology.test.ts",
        title: "A5: tool states keep their literal native text; observation_lost and cancelled are UNKNOWN, never success or failure",
      },
    ],
  },
  {
    defense: DEFENSE_IDS[1] ?? "",
    quote: DOCS_10_QUOTES[1] ?? "",
    tier: "default-gate",
    truthLabel: "fixture pass",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-claude-topology.test.ts",
        title: "A5: a started tool in a settled or lost call is last-known, never a spinner; a live call whose stream is unknown is not active",
      },
      {
        file: "test/workbench-inspector.test.ts",
        title: "a disconnected last-known running node is STALE/UNKNOWN, never drawn as live spinner",
      },
    ],
  },
  {
    defense: DEFENSE_IDS[2] ?? "",
    quote: DOCS_10_QUOTES[2] ?? "",
    tier: "default-gate",
    truthLabel: "fixture pass",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-forge-observer.test.ts",
        title: "withholds workspace success that the read status or a declared verdict does not support, and says so",
      },
      {
        file: "test/workbench-forge-observer.test.ts",
        title: "F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone",
      },
    ],
  },
  {
    defense: DEFENSE_IDS[3] ?? "",
    quote: DOCS_10_QUOTES[3] ?? "",
    tier: "default-gate",
    truthLabel: "fixture pass",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-control.test.ts",
        title: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing",
      },
      {
        file: "test/workbench-native-details.test.ts",
        title: "preserves selected node on resize and closes without invoking any runtime controls",
      },
    ],
  },
  {
    defense: DEFENSE_IDS[4] ?? "",
    quote: DOCS_10_QUOTES[4] ?? "",
    tier: "default-gate",
    truthLabel: "fixture pass",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-observation.test.ts",
        title: "requires provider-qualified hot cursor and reports evicted prefix as a gap, not an empty history",
      },
      {
        file: "test/workbench-furnace-evidence.test.ts",
        title: "an empty incomplete read still says it is truncated rather than presenting an empty log",
      },
    ],
  },
];

describe("docs/10 failure-and-deception defenses census (VC-5/W15, wb-6ze.38)", () => {
  it("docs/10 still carries the five defense sentences verbatim as one paragraph", () => {
    const docs = readRepo(DOCS_10);
    expect(docs).toBeDefined();
    expect(docs).toContain("## Failure and deception defenses");
    expect(docs).toContain(DOCS_10_QUOTES.join(" "));
  });

  it("docs/10 section 'Failure and deception defenses' carries exactly the five sentences and nothing else", () => {
    expect(docs10Problems(readRepo(DOCS_10))).toEqual([]);
  });

  it("docs/14 still carries the falsifier requirement verbatim", () => {
    expect(readRepo(DOCS_14)).toContain(DOCS_14_FALSIFIER);
  });

  it("docs/14 'Truth labels and release gates' carries the falsifier sentence exactly, closing its section", () => {
    expect(docs14Problems(readRepo(DOCS_14))).toEqual([]);
  });

  it("holds exactly five rows, one per docs/10 sentence, in order", () => {
    expect(ROWS.map((r) => r.defense)).toEqual([...DEFENSE_IDS]);
    expect(ROWS.map((r) => r.quote)).toEqual([...DOCS_10_QUOTES]);
  });

  it("every row is default-gate tier and claims only the fixture-pass truth label", () => {
    for (const row of ROWS) {
      expect(row.tier, row.defense).toBe("default-gate");
      expect(row.truthLabel, row.defense).toBe("fixture pass");
    }
  });

  it("every default-gate pin file is in the gate the loaded vitest config runs (not a constant on the row)", () => {
    for (const row of ROWS) {
      expect(tierProblems(config, row.pins.map((pin) => pin.file)), row.defense).toEqual([]);
    }
  });

  it("no unpinned row is counted as passed: the pinned count equals the rows that carry pins", () => {
    const pinned = ROWS.filter((r) => r.status === "pinned");
    expect(pinned.every((r) => r.pins.length > 0)).toBe(true);
    expect(ROWS.filter((r) => r.status === "unpinned").every((r) => r.pins.length === 0)).toBe(true);
  });

  describe("every row's pins are present exactly once and live", () => {
    for (const row of ROWS) {
      it(`${row.defense}`, () => {
        const verdict = evaluateRow(row, readRepo);
        expect(verdict.problems).toEqual([]);
      });
    }
  });

  describe("falsifier: a quietly weakened pin turns its own defense red by name", () => {
    for (const row of ROWS.filter((r) => r.status === "pinned")) {
      for (const pin of row.pins) {
        const source = readRepo(pin.file) ?? "";
        const quoted = (q: string): string => `${q}${pin.title}${q}`;
        const declared = ["\"", "'", "`"].map(quoted).find((candidate) => source.includes(candidate)) ?? quoted("\"");
        const escaped = declared.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const mutants: ReadonlyArray<readonly [string, string]> = [
          ["rename", source.split(declared).join(`${declared.slice(0, -1)} (renamed)${declared.slice(-1)}`)],
          ["delete", source.split("\n").filter((line) => !line.includes(declared)).join("\n")],
          ["skip", source.replace(new RegExp(`\\b(it|test)(\\s*\\(\\s*)${escaped}`), (_m, fn: string, open: string) => `${fn}.skip${open}${declared}`)],
          ["duplicate", `${source}\nit(${declared}, () => {});\n`],
        ];
        for (const [kind, mutated] of mutants) {
          it(`${row.defense}: ${kind} of ${JSON.stringify(pin.title.slice(0, 48))} is red`, () => {
            const verdict = evaluateRow(row, (path) => (path === pin.file ? mutated : readRepo(path)));
            expect(verdict.ok).toBe(false);
            expect(verdict.problems.join("\n")).toContain(row.defense);
          });
        }
      }
    }
  });

  describe("scanner and row evaluation reject every weakening on synthetic sources", () => {
    const pin: Pin = { file: "test/x.test.ts", title: "a case's title" };
    const row = (over: Partial<DefenseRow>): DefenseRow => ({
      defense: "Dx",
      quote: "q",
      tier: "default-gate",
      truthLabel: "fixture pass",
      status: "pinned",
      pins: [pin],
      ...over,
    });
    const readWith = (source: string | undefined) => (path: string) => (path === pin.file ? source : undefined);

    it("accepts a single plain declaration in any quote style", () => {
      expect(evaluateRow(row({}), readWith(`it("a case's title", () => {});`)).ok).toBe(true);
      expect(evaluateRow(row({}), readWith(`test('a case\\'s title', () => {});`)).ok).toBe(true);
    });

    it.each([
      ["a missing file", undefined],
      ["a deleted case", `it("another title", () => {});`],
      ["a renamed case", `it("a case's title renamed", () => {});`],
      ["a skipped case", `it.skip("a case's title", () => {});`],
      ["a todo case", `it.todo("a case's title");`],
      ["a fails case", `it.fails("a case's title", () => {});`],
      ["an only case", `test.only("a case's title", () => {});`],
      ["a duplicate", `it("a case's title", () => {});\nit("a case's title", () => {});`],
    ])("rejects %s", (_label, source) => {
      const verdict = evaluateRow(row({}), readWith(source));
      expect(verdict.ok).toBe(false);
      expect(verdict.problems.join("\n")).toContain("Dx");
    });

    it("rejects a pinned row with zero pins and an unpinned row without a reason or with pins", () => {
      expect(evaluateRow(row({ pins: [] }), readWith("")).ok).toBe(false);
      expect(evaluateRow(row({ status: "unpinned", pins: [] }), readWith("")).ok).toBe(false);
      expect(evaluateRow(row({ status: "unpinned", pins: [], reason: "  " }), readWith("")).ok).toBe(false);
      expect(evaluateRow(row({ status: "unpinned", pins: [pin], reason: "r" }), readWith("")).ok).toBe(false);
      expect(evaluateRow(row({ status: "unpinned", pins: [], reason: "no landed case" }), readWith("")).ok).toBe(true);
    });
  });

  describe("U1 skip-mode falsifiers: every census-silent route is red naming defense, file and title", () => {
    const pin: Pin = { file: "test/x.test.ts", title: "a case's title" };
    const row: DefenseRow = { defense: "Dx", quote: "q", tier: "default-gate", truthLabel: "fixture pass", status: "pinned", pins: [pin] };
    const decl = `"a case's title"`;
    const readWith = (source: string) => (path: string) => (path === pin.file ? source : undefined);

    const MODES: ReadonlyArray<readonly [string, string, RegExp]> = [
      ["S1 line comment", `// it(${decl}, () => {});`, /not found/],
      ["S2 block comment", `/* it(${decl}, () => {}); */`, /not found/],
      ["S4 options skip", `it(${decl}, { skip: true }, () => {});`, /options skip/],
      ["S4 options skip after the callback", `it(${decl}, () => {}, { skip: true });`, /options skip/],
      ["S4t options todo", `it(${decl}, { todo: true }, () => {});`, /options todo/],
      ["S4 options fails", `it(${decl}, { fails: true }, () => {});`, /options fails/],
      ["S4 options only", `it(${decl}, { only: true }, () => {});`, /options only/],
      ["S4 string-keyed options skip", `it(${decl}, { "skip": true }, () => {});`, /options skip/],
      ["S4 shorthand options skip", `const skip = true;\nit(${decl}, { skip }, () => {});`, /options skip/],
      ["S4 options spread", `it(${decl}, { ...opts }, () => {});`, /options spread/],
      ["S4 computed options key", `it(${decl}, { [key]: true }, () => {});`, /options computed key/],
      ["S4 opaque options argument", `it(${decl}, opts, () => {});`, /opaque argument/],
      ["S10 describe options skip", `describe("g", { skip: true }, () => {\n  it(${decl}, () => {});\n});`, /describe with options skip/],
      ["S10 describe options skip after the callback", `describe("g", () => {\n  it(${decl}, () => {});\n}, { skip: true });`, /describe with options skip/],
      ["G11 describe.skip", `describe.skip("g", () => {\n  it(${decl}, () => {});\n});`, /describe\.skip/],
      ["G11t describe.todo", `describe.todo("g", () => {\n  it(${decl}, () => {});\n});`, /describe\.todo/],
      ["G11 suite.skip", `suite.skip("g", () => {\n  it(${decl}, () => {});\n});`, /suite\.skip/],
      ["S3 describe.skipIf", `describe.skipIf(true)("g", () => {\n  it(${decl}, () => {});\n});`, /describe\.skipIf\(\.\.\.\)/],
      ["S3r describe.runIf", `describe.runIf(false)("g", () => {\n  it(${decl}, () => {});\n});`, /describe\.runIf\(\.\.\.\)/],
      ["G11 concurrent chain describe.concurrent.skip", `describe.concurrent.skip("g", () => {\n  it(${decl}, () => {});\n});`, /describe\.concurrent\.skip/],
      ["G11 sequential chain describe.sequential.skipIf", `describe.sequential.skipIf(true)("g", () => {\n  it(${decl}, () => {});\n});`, /describe\.sequential\.skipIf/],
      ["S5 ctx.skip()", `it(${decl}, (ctx) => {\n  ctx.skip();\n  expect(1).toBe(1);\n});`, /skip itself/],
      ["S5 context.skip()", `it(${decl}, (context) => {\n  context.skip("nope");\n});`, /skip itself/],
      ["S5 t.skip()", `it(${decl}, (t) => {\n  t.skip();\n});`, /skip itself/],
      ["S5 destructured parameter skip()", `it(${decl}, ({ skip }) => {\n  skip();\n});`, /skip itself/],
      ["S5 body destructure of skip", `it(${decl}, (ctx) => {\n  const { skip } = ctx;\n  skip();\n});`, /skip itself/],
      ["COND if (env flag)", `if (process.env.WB_GATE_NEVER_SET_FLAG) {\n  it(${decl}, () => {});\n}`, /conditionally declared/],
      ["COND ternary", `process.env.WB_GATE_NEVER_SET_FLAG ? it(${decl}, () => {}) : undefined;`, /conditionally declared/],
      ["COND logical and", `process.env.WB_GATE_NEVER_SET_FLAG && it(${decl}, () => {});`, /conditionally declared/],
      ["COND loop", `for (const n of []) {\n  it(${decl}, () => {});\n}`, /conditionally declared/],
      ["COND if inside a describe", `describe("g", () => {\n  if (process.env.WB_GATE_NEVER_SET_FLAG) {\n    it(${decl}, () => {});\n  }\n});`, /conditionally declared/],
      ["COND early return in a describe", `describe("g", () => {\n  if (process.env.WB_GATE_NEVER_SET_FLAG) return;\n  it(${decl}, () => {});\n});`, /early return\/throw/],
      ["G12 stray sibling it.only", `it(${decl}, () => {});\nit.only("another case", () => {});`, /focused \.only/],
      ["G12 stray sibling describe.only", `it(${decl}, () => {});\ndescribe.only("g", () => {});`, /focused \.only/],
      ["S6 case-level it.skipIf", `it.skipIf(true)(${decl}, () => {});`, /modifier it\.skipIf\(\.\.\.\)/],
      ["S6r case-level it.runIf", `it.runIf(false)(${decl}, () => {});`, /modifier it\.runIf\(\.\.\.\)/],
      ["R3 it.skip", `it.skip(${decl}, () => {});`, /modifier it\.skip/],
      ["it.todo", `it.todo(${decl});`, /modifier it\.todo/],
      ["it.fails", `it.fails(${decl}, () => {});`, /modifier it\.fails/],
      ["test.only", `test.only(${decl}, () => {});`, /modifier test\.only/],
      ["it.each table", `it.each([1])(${decl}, () => {});`, /non-plain declaration/],
      ["it.concurrent", `it.concurrent(${decl}, () => {});`, /non-plain declaration/],
    ];

    it.each(MODES)("%s", (_label, source, reason) => {
      const verdict = evaluateRow(row, readWith(source));
      expect(verdict.ok).toBe(false);
      const text = verdict.problems.join("\n");
      expect(text).toContain("Dx");
      expect(text).toContain(pin.file);
      expect(text).toContain(JSON.stringify(pin.title));
      expect(text).toMatch(reason);
    });

    it("S6 case-level skipIf names its true reason, never 'not found (renamed or deleted)'", () => {
      expect(evaluateRow(row, readWith(`it.skipIf(true)(${decl}, () => {});`)).problems.join("\n")).not.toContain("not found");
    });

    it.each([
      ["a plain declaration in a describe", `describe("g", () => {\n  it(${decl}, () => {\n    expect(1).toBe(1);\n  });\n});`],
      ["a top-level declaration", `it(${decl}, () => {});`],
      ["an options object with skip: false and a timeout", `it(${decl}, { skip: false, timeout: 5 }, () => {});`],
      ["a numeric timeout", `it(${decl}, () => {}, 5000);`],
      ["a comment that mentions a skipped copy beside the real declaration", `// it.skip(${decl}, () => {});\nit(${decl}, () => {});`],
      ["a string literal that spells a declaration beside the real one", `const sample = 'it(${decl}, () => {})';\nit(${decl}, () => {});`],
      ["a plain concurrent suite", `describe.concurrent("g", () => {\n  it(${decl}, () => {});\n});`],
      ["a skipped OTHER case in the same file", `it(${decl}, () => {});\nit.skip("another case", () => {});`],
      ["a context parameter that never skips", `it(${decl}, (ctx) => {\n  expect(ctx.task.name).toBeDefined();\n});`],
    ])("control: %s is accepted", (_label, source) => {
      expect(evaluateRow(row, readWith(source)).problems).toEqual([]);
    });
  });

  describe("U2 tier-truth falsifiers: the tier is read from the loaded vitest config, not a constant", () => {
    const pinnedRows = ROWS.filter((r) => r.status === "pinned");
    const allFiles = [...new Set(pinnedRows.flatMap((r) => r.pins.map((p) => p.file)))];
    const include = ["test/**/*.test.ts"];
    const verdictFor = (defenseRow: DefenseRow, synthetic: unknown): Verdict => evaluateRow(defenseRow, readRepo, synthetic);
    const d4 = ROWS[3] as DefenseRow;

    it("the real loaded vitest config keeps all pinned files in the default gate", () => {
      expect(allFiles.length).toBe(8);
      expect(tierProblems(config, allFiles)).toEqual([]);
    });

    it("T1: excluding one pinned file (the D4 security pin's file) turns D4 red naming the file while other rows stay green", () => {
      const synthetic = { test: { include, exclude: ["test/workbench-control.test.ts"] } };
      const verdict = verdictFor(d4, synthetic);
      expect(verdict.ok).toBe(false);
      expect(verdict.problems.join("\n")).toContain(d4.defense);
      expect(verdict.problems.join("\n")).toContain("test/workbench-control.test.ts");
      expect(verdictFor(ROWS[0] as DefenseRow, synthetic).ok).toBe(true);
    });

    it("T1all: excluding all eight pinned files turns every pinned row red by name", () => {
      const synthetic = { test: { include, exclude: allFiles } };
      for (const defenseRow of pinnedRows) {
        const verdict = verdictFor(defenseRow, synthetic);
        expect(verdict.ok, defenseRow.defense).toBe(false);
        expect(verdict.problems.join("\n")).toContain(defenseRow.defense);
      }
    });

    it("a narrowed include, a wildcard exclude, an unsupported glob and an unsupported project layout are all red", () => {
      expect(tierProblems({ test: { include: ["test/other/**/*.test.ts"], exclude: [] } }, allFiles).length).toBe(allFiles.length);
      expect(tierProblems({ test: { include, exclude: ["test/workbench-*.test.ts"] } }, allFiles).length).toBe(allFiles.length);
      expect(tierProblems({ test: { include, exclude: ["test/{a,b}.test.ts"] } }, allFiles).join("\n")).toContain("outside the census glob subset");
      expect(tierProblems({ test: { include, projects: [] } }, allFiles).join("\n")).toContain("test.projects");
      expect(tierProblems({}, allFiles)).not.toEqual([]);
      expect(tierProblems({ test: { include: [] } }, allFiles)).not.toEqual([]);
    });

    it("control: excluding an unrelated file, or none, keeps every pinned row green", () => {
      for (const exclude of [["test/workbench-native-client.test.ts"], undefined]) {
        for (const defenseRow of pinnedRows) expect(verdictFor(defenseRow, { test: { include, exclude } }).problems, defenseRow.defense).toEqual([]);
      }
    });
  });

  describe("U3 docs-exactness falsifiers: both docs pins are section-bounded and exact", () => {
    const docs10 = readRepo(DOCS_10) ?? "";
    const docs14 = readRepo(DOCS_14) ?? "";
    const paragraph = DOCS_10_QUOTES.join(" ");
    const mutate = (doc: string, from: string, to: string): string => {
      expect(doc.includes(from)).toBe(true);
      const out = doc.replace(from, () => to);
      expect(out).not.toBe(doc);
      return out;
    };

    it("the real docs satisfy both pins", () => {
      expect(docs10Problems(docs10)).toEqual([]);
      expect(docs14Problems(docs14)).toEqual([]);
    });

    it.each([
      ["D1 a sixth weakening sentence appended to the paragraph", mutate(docs10, paragraph, `${paragraph} These defenses are advisory.`)],
      ["D2 a qualifying prefix", mutate(docs10, paragraph, `Advisory only, never enforced: ${paragraph}`)],
      ["D3 the paragraph moved under a superseded heading", mutate(docs10, `## Failure and deception defenses\n`, `## Failure and deception defenses\n\n## Superseded notes\n`)],
      ["D6 the heading suffixed", mutate(docs10, "## Failure and deception defenses", "## Failure and deception defenses (draft, non-binding)")],
      ["D5ctl a sentence weakened (must -> should)", mutate(docs10, "must not be confused", "should not be confused")],
      ["D6ctl the heading renamed", mutate(docs10, "## Failure and deception defenses", "## Failure and deception notes")],
      ["a duplicated heading", `${docs10}\n## Failure and deception defenses\n\nelsewhere\n`],
      ["a sentence deleted", mutate(docs10, " Spinner should not imply work progressed.", "")],
      ["a missing file", undefined],
    ])("docs/10 %s is red", (_label, mutated) => {
      expect(docs10Problems(mutated)).not.toEqual([]);
    });

    it.each([
      ["D4 a weakening sentence appended to the section", `${docs14.trimEnd()} Falsifiers are advisory and may be omitted.\n`],
      ["D4 a weakening sentence appended on a new line", `${docs14.trimEnd()}\n\nFalsifiers are advisory and may be omitted.\n`],
      ["a qualifying prefix", mutate(docs14, DOCS_14_FALSIFIER, `Advisory only: ${DOCS_14_FALSIFIER}`)],
      ["the sentence deleted", mutate(docs14, DOCS_14_FALSIFIER, "")],
      ["the sentence reworded", mutate(docs14, "must have a falsifier", "should have a falsifier")],
      ["the sentence duplicated", `${docs14.trimEnd()} ${DOCS_14_FALSIFIER}\n`],
      ["the sentence followed by a weakening clause in its own paragraph", mutate(docs14, DOCS_14_FALSIFIER, `${DOCS_14_FALSIFIER} Exceptions may be waived by the owner.`)],
      ["the heading renamed", mutate(docs14, "## Truth labels and release gates", "## Truth labels")],
      ["the sentence moved under a new heading", mutate(docs14, "Each major work package must have a falsifier", "## Notes\n\nEach major work package must have a falsifier")],
      ["a missing file", undefined],
    ])("docs/14 %s is red", (_label, mutated) => {
      expect(docs14Problems(mutated)).not.toEqual([]);
    });

    it("control: an unrelated new section after either pinned section, or an unrelated edit elsewhere, stays green", () => {
      expect(docs10Problems(`${docs10.trimEnd()}\n\n## Unrelated addition\n\nSomething else entirely.\n`)).toEqual([]);
      expect(docs10Problems(mutate(docs10, "## Implemented experimental native details at 2026-10-15", "## Implemented experimental native details at 2026-10-15 (edited)"))).toEqual([]);
      expect(docs14Problems(`${docs14.trimEnd()}\n\n## Unrelated addition\n\nSomething else entirely.\n`)).toEqual([]);
    });
  });
});
