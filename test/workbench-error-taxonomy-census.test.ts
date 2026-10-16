/**
 * W05 / VC-2 (wb-6hb.7): docs/workbench/05 "Error taxonomy" census falsifier.
 *
 * docs/workbench/05 section "Error taxonomy" says: "Distinguish (a) syntax/validation error before
 * invocation, (b) capability unavailable, (c) permission denied, (d) transport/runtime failure, (e) producer
 * domain result unsuccessful, (f) uncertain external effect, (g) cancelled/aborted wait, (h) stale
 * observation. Expose typed diagnostics; do not silently return null for every failure." docs/workbench/14
 * section "Truth labels and release gates" requires that every major work package carries "a falsifier: a
 * negative test that would fail if a critical guarantee was quietly weakened".
 *
 * Cases embodying the categories exist, but nothing bound the eight categories or the never-silent-null
 * clause to them. This census does: a frozen table of nine rows, each pinned to landed cases by file and
 * verbatim title.
 *
 * Scanner (parse-aware, 00:31Z title-census rule and the 02:17Z floor reading): the pinned files are parsed
 * with the TypeScript compiler API, never matched as text. A pin holds only when the exact title is the
 * first argument of exactly one registration call that is reached unconditionally: the call is an it() or
 * test() whose modifiers are run-class only (concurrent, sequential, runIf(true), skipIf(false)), carries no
 * options object that skips, todos, fails or focuses it, never reads ctx.skip, and every enclosing function
 * is the callback of a describe() or suite() that is itself live. Comments, string and template decoys are
 * not calls and never count. A registration through an alias, a wrapper function, a branch, a loop or a
 * describe.each is refused as indirect rather than assumed to run. Disclosed limits: an identifier named
 * it/test/describe/suite is trusted to be the vitest binding unless the file imports it under another name;
 * a callback that shadows the first parameter name is not tracked; the scanner never executes a pinned case.
 *
 * Tier-truth: every pinned file must be run by the default gate, which means matched by the include globs and
 * absent from the exclude list of the SAME vitest config module the gate loads, so a pinned file parked in
 * the exclude list turns the census red even though the file is untouched. Docs-exactness: the whole
 * "## Error taxonomy" and "## Implemented node error boundary" section bodies are pinned line for line, so a
 * weakened qualifier or an added sentence turns the census red.
 *
 * Truth label: "fixture pass" only. The census reads the pinned files as text and parses them; it never
 * executes a pinned case and it adds no behaviour test for a category.
 */
import { readFileSync } from "node:fs";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import config from "../vitest.config.js";

type Tier = "default-gate";

interface Pin {
  readonly file: string;
  readonly title: string;
}

interface TaxonomyRow {
  readonly category: string;
  readonly label: string;
  /** The docs/05 fragment, verbatim. */
  readonly quote: string;
  readonly tier: Tier;
  readonly status: "pinned" | "unpinned";
  readonly reason?: string;
  readonly pins: readonly Pin[];
}

const DOC_05 = "docs/workbench/05-script-language-and-runtime.md";
const DOC_14 = "docs/workbench/14-qa-and-benchmarks.md";

const TAXONOMY_PARAGRAPH =
  "Distinguish (a) syntax/validation error before invocation, (b) capability unavailable, (c) permission denied, (d) transport/runtime failure, (e) producer domain result unsuccessful, (f) uncertain external effect, (g) cancelled/aborted wait, (h) stale observation. Expose typed diagnostics; do not silently return null for every failure.";

const BOUNDARY_SENTENCES: readonly string[] = [
  "The host now transports a typed `CapabilityError` with its category across worker RPC.",
  "fatal authorization, validation and uncertain-effect failures are not converted to ordinary null item failures by parallel composition.",
];

const FALSIFIER_SENTENCE =
  "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.";

const NODE_CONTRACT = "test/workbench-node-contract.test.ts";
const REGISTRY_AUTH = "test/workbench-registry-auth.test.ts";
const EFFECT_REPLAY = "test/workflow-effect-replay.test.ts";

const ROWS: readonly TaxonomyRow[] = Object.freeze([
  {
    category: "a",
    label: "syntax/validation error before invocation",
    quote: "(a) syntax/validation error before invocation",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: NODE_CONTRACT, title: "L4: malformed input and non-JSON payload fail before provider effects" },
      { file: REGISTRY_AUTH, title: "rejects impersonation options before dispatch" },
    ],
  },
  {
    category: "b",
    label: "capability unavailable",
    quote: "(b) capability unavailable",
    tier: "default-gate",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-registry-admission.test.ts",
        title: "reaches a workflow script as a typed unavailable CapabilityError while the provider sees only the slot holder",
      },
    ],
  },
  {
    category: "c",
    label: "permission denied",
    quote: "(c) permission denied",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-control.test.ts", title: "rule 4: the exact grant control:<provider>.<action> is required verbatim" },
      {
        file: "test/workbench-security-pi-tools.test.ts",
        title: "refuses the transcript read with a typed permission message when the grant is absent",
      },
    ],
  },
  {
    category: "d",
    label: "transport/runtime failure",
    quote: "(d) transport/runtime failure",
    tier: "default-gate",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-furnace-evidence.test.ts",
        title: "an abort while the native read is pending rejects as transport, and the abandoned read can never resolve the content",
      },
    ],
  },
  {
    category: "e",
    label: "producer domain result unsuccessful",
    quote: "(e) producer domain result unsuccessful",
    tier: "default-gate",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-forge-observer.test.ts",
        title: "F2: a current failed gate stays failed despite transport success, and current success is success",
      },
    ],
  },
  {
    category: "f",
    label: "uncertain external effect",
    quote: "(f) uncertain external effect",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: EFFECT_REPLAY, title: "neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect" },
      { file: NODE_CONTRACT, title: "L4: effectful invocation with lost response is reported uncertain, never automatically retried" },
    ],
  },
  {
    category: "g",
    label: "cancelled/aborted wait",
    quote: "(g) cancelled/aborted wait",
    tier: "default-gate",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-claude-cancel-faults.test.ts",
        title: "F3 the SDK ends the stream on abort: cancelled, never the missing-result failure",
      },
    ],
  },
  {
    category: "h",
    label: "stale observation",
    quote: "(h) stale observation",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: EFFECT_REPLAY, title: "marks a replayed read as stale, never fresh" },
      {
        file: "test/workbench-observation.test.ts",
        title: "disconnect invalidates known nodes; reconnect alone cannot restore current without snapshot",
      },
    ],
  },
  {
    category: "never-silent-null",
    label: "do not silently return null for every failure",
    quote: "Expose typed diagnostics; do not silently return null for every failure.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: REGISTRY_AUTH, title: "preserves category and instanceof CapabilityError in a real worker RPC" },
      { file: REGISTRY_AUTH, title: "reports typed terminal diagnostics and local validation is not swallowed by parallel" },
      { file: "test/workflow-runtime.test.ts", title: "does not let parallel fold a fatal nested error into a null" },
    ],
  },
]);

const readRepoText = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

interface CaseScan {
  /** Registrations of the exact title that are plain, unconditional and run. */
  readonly live: number;
  /** Registrations that are disabled or indirect, each named by what disables it (".skip", "describe.todo", ...). */
  readonly disabled: readonly string[];
}

const CASE_ROOTS: ReadonlySet<string> = new Set(["it", "test"]);
const SUITE_ROOTS: ReadonlySet<string> = new Set(["describe", "suite"]);
/** Option keys that stop a case or suite from running as a plain pass. */
const DISABLING_OPTION_KEYS: ReadonlySet<string> = new Set(["skip", "todo", "fails", "only"]);

const parseSource = (source: string): ts.SourceFile =>
  ts.createSourceFile("pinned.test.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

interface Modifier {
  readonly name: string;
  /** Present for a call modifier such as skipIf(cond); absent for a property modifier such as skip. */
  readonly args: readonly ts.Expression[] | undefined;
}

interface Callee {
  readonly root: string;
  readonly modifiers: readonly Modifier[];
}

/** Break `it.skipIf(cond).concurrent` style callees into a root identifier and its modifier chain; null when not that shape. */
const unwrapCallee = (expression: ts.Expression): Callee | null => {
  const modifiers: Modifier[] = [];
  let node: ts.Expression = expression;
  for (;;) {
    if (ts.isCallExpression(node)) {
      if (!ts.isPropertyAccessExpression(node.expression)) return null;
      modifiers.unshift({ name: node.expression.name.text, args: [...node.arguments] });
      node = node.expression.expression;
    } else if (ts.isPropertyAccessExpression(node)) {
      modifiers.unshift({ name: node.name.text, args: undefined });
      node = node.expression;
    } else if (ts.isIdentifier(node)) {
      return { root: node.text, modifiers };
    } else {
      return null;
    }
  }
};

/** Local name -> vitest name for `import { it as alias } from "vitest"`, so an honest alias import is still recognised. */
const vitestAliases = (sourceFile: ts.SourceFile): ReadonlyMap<string, string> => {
  const aliases = new Map<string, string>();
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    if (statement.moduleSpecifier.text !== "vitest") continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings === undefined || !ts.isNamedImports(bindings)) continue;
    for (const element of bindings.elements) aliases.set(element.name.text, element.propertyName?.text ?? element.name.text);
  }
  return aliases;
};

const modifiersText = (modifiers: readonly Modifier[], sourceFile: ts.SourceFile): string =>
  modifiers
    .map(modifier =>
      modifier.args === undefined ? `.${modifier.name}` : `.${modifier.name}(${modifier.args.map(arg => arg.getText(sourceFile)).join(", ")})`,
    )
    .join("");

/** Run-class modifiers keep a case running; everything else (skip, todo, fails, only, each, unknown) disables or redirects it. */
const modifierDisables = (modifier: Modifier): boolean => {
  if (modifier.name === "concurrent" || modifier.name === "sequential" || modifier.name === "shuffle") return modifier.args !== undefined;
  const only = modifier.args?.length === 1 ? modifier.args[0] : undefined;
  if (modifier.name === "runIf") return only?.kind !== ts.SyntaxKind.TrueKeyword;
  if (modifier.name === "skipIf") return only?.kind !== ts.SyntaxKind.FalseKeyword;
  return true;
};

/** Option-object keys that disable a registration; a computed key or a spread cannot be vouched for and also counts. */
const optionDisables = (call: ts.CallExpression): readonly string[] => {
  const found: string[] = [];
  for (const argument of call.arguments) {
    if (!ts.isObjectLiteralExpression(argument)) continue;
    for (const property of argument.properties) {
      if (ts.isSpreadAssignment(property)) {
        found.push("{...spread}");
        continue;
      }
      const name = property.name;
      if (name === undefined || ts.isComputedPropertyName(name)) {
        found.push("{computed}");
        continue;
      }
      const key = ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : "";
      if (!DISABLING_OPTION_KEYS.has(key)) continue;
      const falseValue = ts.isPropertyAssignment(property) && property.initializer.kind === ts.SyntaxKind.FalseKeyword;
      if (!falseValue) found.push(`{${key}}`);
    }
  }
  return found;
};

const isFunctionLike = (node: ts.Node): node is ts.ArrowFunction | ts.FunctionExpression => ts.isArrowFunction(node) || ts.isFunctionExpression(node);

/** The case callback reads its context's skip: ctx.skip(), a destructured skip, or `const { skip } = ctx`. */
const callbackSkips = (callback: ts.ArrowFunction | ts.FunctionExpression): boolean => {
  const parameter = callback.parameters[0]?.name;
  if (parameter === undefined) return false;
  if (ts.isObjectBindingPattern(parameter)) {
    return parameter.elements.some(element => (element.propertyName ?? element.name).getText() === "skip");
  }
  if (!ts.isIdentifier(parameter)) return false;
  let skips = false;
  const visit = (node: ts.Node): void => {
    if (skips) return;
    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === parameter.text && node.name.text === "skip") {
      skips = true;
      return;
    }
    if (
      ts.isVariableDeclaration(node) &&
      ts.isObjectBindingPattern(node.name) &&
      node.initializer !== undefined &&
      ts.isIdentifier(node.initializer) &&
      node.initializer.text === parameter.text &&
      node.name.elements.some(element => (element.propertyName ?? element.name).getText() === "skip")
    ) {
      skips = true;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(callback.body);
  return skips;
};

const stringArgument = (call: ts.CallExpression): string | undefined => {
  const first = call.arguments[0];
  return first !== undefined && (ts.isStringLiteral(first) || ts.isNoSubstitutionTemplateLiteral(first)) ? first.text : undefined;
};

/** Reasons the registration is not a plain, running case; empty means the call registers a case that runs. */
const caseDisables = (call: ts.CallExpression, sourceFile: ts.SourceFile, aliases: ReadonlyMap<string, string>): readonly string[] => {
  const callee = unwrapCallee(call.expression);
  const root = callee === null ? undefined : (aliases.get(callee.root) ?? callee.root);
  if (callee === null || root === undefined || !CASE_ROOTS.has(root)) {
    return [`indirect registration (${call.expression.getText(sourceFile)})`];
  }
  const reasons: string[] = [];
  const disabling = callee.modifiers.filter(modifierDisables);
  if (disabling.length > 0) reasons.push(`${root}${modifiersText(disabling, sourceFile)}`);
  reasons.push(...optionDisables(call).map(key => `${root} options ${key}`));
  const callback = call.arguments.find(isFunctionLike);
  if (callback !== undefined && callbackSkips(callback)) reasons.push(`${root} ctx.skip`);
  return reasons;
};

/** Walk up from the case: only suite callbacks and plain statements are allowed between the case and the file. */
const enclosureDisables = (call: ts.CallExpression, sourceFile: ts.SourceFile, aliases: ReadonlyMap<string, string>): readonly string[] => {
  const reasons: string[] = [];
  let current: ts.Node = call.parent;
  while (!ts.isSourceFile(current)) {
    if (ts.isExpressionStatement(current) || ts.isBlock(current)) {
      current = current.parent;
      continue;
    }
    if (isFunctionLike(current)) {
      const owner: ts.Node = current.parent;
      const callee = ts.isCallExpression(owner) && owner.arguments.some(argument => argument === current) ? unwrapCallee(owner.expression) : null;
      const root = callee === null ? undefined : (aliases.get(callee.root) ?? callee.root);
      if (!ts.isCallExpression(owner) || callee === null || root === undefined || !SUITE_ROOTS.has(root)) {
        reasons.push("indirect registration (enclosed by a function that is not a describe/suite callback)");
        break;
      }
      const disabling = callee.modifiers.filter(modifierDisables);
      if (disabling.length > 0) reasons.push(`${root}${modifiersText(disabling, sourceFile)}`);
      reasons.push(...optionDisables(owner).map(key => `${root} options ${key}`));
      current = owner.parent;
      continue;
    }
    reasons.push(`conditional or indirect registration (${ts.SyntaxKind[current.kind]})`);
    break;
  }
  return reasons;
};

/**
 * Count the registrations of one exact case title in a test file. A registration is a call whose first argument is
 * the title as a complete string literal and which carries a callback. Everything the call is, and everything it
 * sits in, is read from the syntax tree.
 */
const scanCases = (source: string, title: string): CaseScan => {
  const sourceFile = parseSource(source);
  const aliases = vitestAliases(sourceFile);
  let live = 0;
  const disabled: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && stringArgument(node) === title && node.arguments.some(isFunctionLike)) {
      const reasons = [...caseDisables(node, sourceFile, aliases), ...enclosureDisables(node, sourceFile, aliases)];
      if (reasons.length === 0) live += 1;
      else disabled.push(reasons.join(", "));
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return { live, disabled };
};

const tag = (row: Pick<TaxonomyRow, "category" | "label">): string => `docs/05 category (${row.category}) "${row.label}"`;

const scanProblem = (scan: CaseScan): string | null => {
  const total = scan.live + scan.disabled.length;
  if (scan.disabled.length > 0) return `is disabled (${scan.disabled.join(", ")})`;
  if (total === 0) return "occurs 0 times (renamed, deleted or commented out)";
  if (total > 1) return `occurs ${total} times, expected exactly once`;
  return null;
};

/** Every problem the row has against the files the reader returns; empty means the row holds. */
const auditRow = (row: TaxonomyRow, read: (path: string) => string): readonly string[] => {
  const problems: string[] = [];
  const name = tag(row);
  if (row.tier !== "default-gate") problems.push(`${name}: tier must be default-gate`);
  if (row.status === "pinned" && row.pins.length === 0) problems.push(`${name}: a pinned row has zero pins`);
  if (row.status === "unpinned") {
    if (row.pins.length > 0) problems.push(`${name}: an unpinned row must carry no pins`);
    if (row.reason === undefined || row.reason.trim() === "") problems.push(`${name}: an unpinned row must name its reason`);
  }
  for (const pin of row.pins) {
    let source: string;
    try {
      source = read(pin.file);
    } catch {
      problems.push(`${name}: pinned file ${pin.file} cannot be read`);
      continue;
    }
    const problem = scanProblem(scanCases(source, pin.title));
    if (problem !== null) problems.push(`${name}: ${pin.file} :: "${pin.title}" ${problem}`);
  }
  return problems;
};

/** Rows that hold. An unpinned row is never counted as passed. */
const passedCategories = (rows: readonly TaxonomyRow[], read: (path: string) => string): readonly string[] =>
  rows.filter(row => row.status === "pinned" && auditRow(row, read).length === 0).map(row => row.category);

/** Quote problems against a docs text; each names the category whose fragment is missing. */
const auditQuotes = (rows: readonly TaxonomyRow[], doc: string): readonly string[] =>
  rows.filter(row => !doc.includes(row.quote)).map(row => `${tag(row)}: quote is not verbatim in ${DOC_05}`);

const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

describe("docs/05 Error taxonomy census: drift guard", () => {
  const doc05 = readRepoText(DOC_05);

  it("holds the Error taxonomy paragraph verbatim", () => {
    expect(doc05.includes(TAXONOMY_PARAGRAPH), "docs/05 'Error taxonomy' paragraph changed; re-pin the census").toBe(true);
  });

  it("holds both 'Implemented node error boundary' sentences verbatim", () => {
    for (const sentence of BOUNDARY_SENTENCES) {
      expect(doc05.includes(sentence), `docs/05 sentence changed: ${sentence}`).toBe(true);
    }
  });

  it("holds the docs/14 falsifier requirement verbatim", () => {
    expect(readRepoText(DOC_14).includes(FALSIFIER_SENTENCE)).toBe(true);
  });

  it("has exactly nine rows: categories a-h in order, then the never-silent-null clause", () => {
    expect(ROWS.map(row => row.category)).toEqual(["a", "b", "c", "d", "e", "f", "g", "h", "never-silent-null"]);
  });

  it("quotes every row verbatim from docs/05, in taxonomy order", () => {
    expect(auditQuotes(ROWS, doc05)).toEqual([]);
    const paragraph = TAXONOMY_PARAGRAPH;
    let cursor = -1;
    for (const row of ROWS) {
      const at = paragraph.indexOf(row.quote);
      expect(at, `${tag(row)}: quote is not inside the taxonomy paragraph`).toBeGreaterThan(cursor);
      cursor = at;
    }
  });

  it("goes red naming the category when a quote is paraphrased", () => {
    const paraphrased = doc05.replace("(c) permission denied", "(c) access refused");
    const problems = auditQuotes(ROWS, paraphrased);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('category (c) "permission denied"');
  });
});

describe("docs/05 Error taxonomy census: every row is pinned to landed cases", () => {
  for (const row of ROWS) {
    it(`${tag(row)} holds at HEAD`, () => {
      expect(row.status, `${tag(row)} is unpinned (${row.reason ?? "no reason"}); an unpinned row is never counted passed`).toBe("pinned");
      expect(auditRow(row, readRepoText), `${tag(row)} lost a pinned case`).toEqual([]);
    });
  }

  it("counts all nine rows as passed at HEAD", () => {
    expect(passedCategories(ROWS, readRepoText)).toEqual(ROWS.map(row => row.category));
  });
});

describe("docs/05 Error taxonomy census: real-file mutants go red naming the category", () => {
  const mutants: readonly {
    readonly kind: string;
    readonly mutate: (source: string, pin: Pin) => string;
  }[] = [
    { kind: "rename", mutate: (source, pin) => source.split(pin.title).join(`${pin.title} (renamed)`) },
    { kind: "delete", mutate: (source, pin) => source.split(pin.title).join("") },
    {
      kind: ".skip",
      mutate: (source, pin) =>
        source.replace(new RegExp(`\\b(it|test)(\\(\\s*["'\`]${escapeRegExp(pin.title)})`), "$1.skip$2"),
    },
    {
      kind: ".todo",
      mutate: (source, pin) =>
        source.replace(new RegExp(`\\b(it|test)(\\(\\s*["'\`]${escapeRegExp(pin.title)})`), "$1.todo$2"),
    },
  ];

  for (const row of ROWS) {
    for (const pin of row.pins) {
      for (const mutant of mutants) {
        it(`${tag(row)}: ${mutant.kind} of "${pin.title}"`, () => {
          const original = readRepoText(pin.file);
          const mutated = mutant.mutate(original, pin);
          expect(mutated, "the mutant must change the pinned file").not.toBe(original);
          const problems = auditRow(row, path => (path === pin.file ? mutated : readRepoText(path)));
          expect(problems.length).toBeGreaterThan(0);
          expect(problems[0]).toContain(`category (${row.category})`);
        });
      }
    }
  }
});

describe("docs/05 Error taxonomy census: scanner and row rules on synthetic sources", () => {
  const TITLE = "marks a replayed read as stale";
  const wrap = (body: string): string => `describe("suite", () => {\n${body}\n});\n`;
  const caseAt = (header: string, title: string = TITLE): string => `  ${header}("${title}", () => {\n    expect(1).toBe(1);\n  });`;
  const demo: TaxonomyRow = {
    category: "x",
    label: "demo",
    quote: "(x) demo",
    tier: "default-gate",
    status: "pinned",
    pins: [{ file: "fake.test.ts", title: TITLE }],
  };
  const auditSource = (source: string): readonly string[] => auditRow(demo, () => source);

  it("accepts it, test, single quotes, backticks and a formatter-wrapped call", () => {
    expect(auditSource(wrap(caseAt("it")))).toEqual([]);
    expect(auditSource(wrap(caseAt("test")))).toEqual([]);
    expect(auditSource(wrap(`  it('${TITLE}', () => {});`))).toEqual([]);
    expect(auditSource(wrap(`  it(\`${TITLE}\`, () => {});`))).toEqual([]);
    expect(auditSource(wrap(`  it(\n    "${TITLE}",\n    () => {},\n  );`))).toEqual([]);
  });

  it("goes red naming the category for a rename, a deletion, a prefix-only title and a comment", () => {
    for (const source of [
      wrap(caseAt("it", `${TITLE} now`)),
      wrap(caseAt("it", "something else")),
      wrap(""),
      wrap(`  // it("${TITLE}", () => {});`),
      wrap(`  /*\n  it("${TITLE}", () => {});\n  */`),
    ]) {
      const problems = auditSource(source);
      expect(problems).toHaveLength(1);
      expect(problems[0]).toContain('category (x) "demo"');
    }
  });

  it("goes red for every disabling modifier on the case", () => {
    for (const header of ["it.skip", "it.todo", "it.fails", "it.only", "it.skipIf(true)", "it.runIf(false)", "test.skip", "test.only"]) {
      const problems = auditSource(wrap(caseAt(header)));
      expect(problems, header).toHaveLength(1);
      expect(problems[0]).toContain("is disabled");
    }
  });

  it("goes red for an enclosing disabled describe but not for a disabled sibling", () => {
    const enclosed = `describe.skip("suite", () => {\n${caseAt("it")}\n});\n`;
    expect(auditSource(enclosed)[0]).toContain("is disabled (describe.skip)");
    const nested = `describe("outer", () => {\n  describe.todo("inner", () => {\n  ${caseAt("it")}\n  });\n});\n`;
    expect(auditSource(nested)[0]).toContain("is disabled (describe.todo)");
    const sibling = `describe.skip("other", () => {\n  it("unrelated", () => {});\n});\n${wrap(caseAt("it"))}`;
    expect(auditSource(sibling)).toEqual([]);
  });

  it("goes red when the title occurs twice", () => {
    const problems = auditSource(wrap(`${caseAt("it")}\n${caseAt("it")}`));
    expect(problems[0]).toContain("occurs 2 times, expected exactly once");
  });

  it("goes red when the pinned file cannot be read", () => {
    const problems = auditRow(demo, () => {
      throw new Error("ENOENT");
    });
    expect(problems[0]).toContain("cannot be read");
  });

  it("goes red for a pinned row with zero pins and for an unpinned row without a reason", () => {
    expect(auditRow({ ...demo, pins: [] }, () => "")[0]).toContain("a pinned row has zero pins");
    expect(auditRow({ ...demo, status: "unpinned", pins: [] }, () => "")[0]).toContain("must name its reason");
    expect(auditRow({ ...demo, status: "unpinned", reason: "no typed case yet", pins: [] }, () => "")).toEqual([]);
  });

  it("never counts an unpinned row as passed", () => {
    const unpinned: TaxonomyRow = { ...demo, category: "y", status: "unpinned", reason: "no typed case yet", pins: [] };
    const read = () => wrap(caseAt("it"));
    expect(passedCategories([demo, unpinned], read)).toEqual(["x"]);
  });
});

/** Where one pinned case sits in a real file, found from the syntax tree, for building mutants of that file. */
interface CaseSite {
  readonly statementStart: number;
  readonly statementEnd: number;
  readonly statementText: string;
  readonly indent: string;
  readonly callbackStart: number;
  readonly callbackEnd: number;
  readonly callbackText: string;
  readonly titleEnd: number;
}

const locateCase = (source: string, title: string): CaseSite => {
  const sourceFile = parseSource(source);
  let site: CaseSite | undefined;
  const visit = (node: ts.Node): void => {
    if (site === undefined && ts.isCallExpression(node) && stringArgument(node) === title && ts.isExpressionStatement(node.parent)) {
      const callback = node.arguments.find(isFunctionLike);
      const first = node.arguments[0];
      if (callback !== undefined && first !== undefined) {
        const statementStart = node.parent.getStart(sourceFile);
        const lineStart = source.lastIndexOf("\n", statementStart - 1) + 1;
        site = {
          statementStart,
          statementEnd: node.parent.getEnd(),
          statementText: node.parent.getText(sourceFile),
          indent: source.slice(lineStart, statementStart),
          callbackStart: callback.getStart(sourceFile),
          callbackEnd: callback.getEnd(),
          callbackText: callback.getText(sourceFile),
          titleEnd: first.getEnd(),
        };
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  if (site === undefined) throw new Error(`no statement-level registration of "${title}"`);
  return site;
};

const replaceStatement = (source: string, site: CaseSite, replacement: string): string =>
  `${source.slice(0, site.statementStart)}${replacement}${source.slice(site.statementEnd)}`;

const withCallbackReplaced = (source: string, site: CaseSite, callback: string): string =>
  replaceStatement(source, site, `${site.statementText.slice(0, site.callbackStart - site.statementStart)}${callback}${site.statementText.slice(site.callbackEnd - site.statementStart)}`);

const withOption = (source: string, site: CaseSite, option: string): string =>
  replaceStatement(
    source,
    site,
    `${site.statementText.slice(0, site.titleEnd - site.statementStart)}, ${option}${site.statementText.slice(site.titleEnd - site.statementStart)}`,
  );

const wrapInSuite = (source: string, site: CaseSite, opening: string): string =>
  replaceStatement(source, site, `${opening}\n${site.indent}  ${site.statementText}\n${site.indent}});`);

const retarget = (text: string, head: string): string => text.replace(/^(it|test)\(/, head);

interface SkipMode {
  readonly id: string;
  readonly mode: string;
  readonly mutate: (source: string, site: CaseSite) => string;
}

/** A disabled case must turn the census red. Controls C1-C6 are the delivered text-scanner kills; S1-S13 are the gate-measured silent modes. */
const DISABLE_MODES: readonly SkipMode[] = [
  { id: "C1", mode: "it.skip", mutate: (source, site) => replaceStatement(source, site, retarget(site.statementText, "$1.skip(")) },
  { id: "C3", mode: "line comment-out", mutate: (source, site) => replaceStatement(source, site, site.statementText.split("\n").map(line => `// ${line}`).join("\n")) },
  { id: "C4", mode: "line-start block comment", mutate: (source, site) => replaceStatement(source, site, `/*\n${site.statementText}\n*/`) },
  { id: "C5", mode: "describe.skip wrapper", mutate: (source, site) => wrapInSuite(source, site, `describe.skip("wrapper", () => {`) },
  { id: "C6", mode: "it.skipIf(true)", mutate: (source, site) => replaceStatement(source, site, retarget(site.statementText, "$1.skipIf(true)(")) },
  { id: "S1", mode: "block comment opened mid-line", mutate: (source, site) => replaceStatement(source, site, `void 0; /* ${site.statementText} */`) },
  { id: "S2", mode: "options {skip: true}", mutate: (source, site) => withOption(source, site, "{ skip: true }") },
  { id: "S3", mode: "options {todo: true}", mutate: (source, site) => withOption(source, site, "{ todo: true }") },
  { id: "S4", mode: "options {fails: true}", mutate: (source, site) => withOption(source, site, "{ fails: true }") },
  { id: "S5", mode: "describe options {skip: true}", mutate: (source, site) => wrapInSuite(source, site, `describe("wrapper", { skip: true }, () => {`) },
  { id: "S6", mode: "suite.skip alias", mutate: (source, site) => wrapInSuite(source, site, `suite.skip("wrapper", () => {`) },
  {
    id: "S7",
    mode: "aliased describe",
    mutate: (source, site) => wrapInSuite(source, site, `const parked = describe.skip;\n${site.indent}parked("wrapper", () => {`),
  },
  {
    id: "S8",
    mode: "ctx.skip()",
    mutate: (source, site) => withCallbackReplaced(source, site, `(ctx: { skip: () => void }) => {\n    ctx.skip();\n    return (${site.callbackText})();\n  }`),
  },
  {
    id: "S9",
    mode: "destructured skip()",
    mutate: (source, site) => withCallbackReplaced(source, site, `({ skip }: { skip: () => void }) => {\n    skip();\n    return (${site.callbackText})();\n  }`),
  },
  { id: "S10", mode: "conditional registration", mutate: (source, site) => replaceStatement(source, site, `if (process.env.TAXONOMY_CENSUS_NEVER === "1") {\n${site.indent}  ${site.statementText}\n${site.indent}}`) },
  { id: "S11", mode: "never-called wrapper", mutate: (source, site) => replaceStatement(source, site, `const neverCalled = () => {\n${site.indent}  ${site.statementText}\n${site.indent}};\n${site.indent}void neverCalled;`) },
  {
    id: "S12",
    mode: "case deleted, title kept as a template-literal decoy",
    mutate: (source, site) => replaceStatement(source, site, `const decoy = \`it("${site.statementText.slice(site.statementText.indexOf("(") + 2, site.titleEnd - site.statementStart - 1)}", () => {})\`;\n${site.indent}void decoy;`),
  },
  {
    id: "S13",
    mode: "same-indent describe.skip wrapper",
    mutate: (source, site) => replaceStatement(source, site, `describe.skip("wrapper", () => {\n${site.indent}${site.statementText}\n${site.indent}});`),
  },
  {
    id: "S14",
    mode: "const { skip } = ctx",
    mutate: (source, site) =>
      withCallbackReplaced(source, site, `(ctx: { skip: () => void }) => {\n    const { skip } = ctx;\n    skip();\n    return (${site.callbackText})();\n  }`),
  },
  { id: "S15", mode: "it.each indirection", mutate: (source, site) => replaceStatement(source, site, retarget(site.statementText, "$1.each([1])(")) },
  { id: "S16", mode: "loop registration", mutate: (source, site) => replaceStatement(source, site, `for (const once of [1]) {\n${site.indent}  void once;\n${site.indent}  ${site.statementText}\n${site.indent}}`) },
];

/** Run-class modifiers still run the case, so the census must stay green for them (precision, safe direction). */
const RUN_MODES: readonly SkipMode[] = [
  { id: "P1", mode: "it.runIf(true)", mutate: (source, site) => replaceStatement(source, site, retarget(site.statementText, "$1.runIf(true)(")) },
  { id: "P2", mode: "it.concurrent", mutate: (source, site) => replaceStatement(source, site, retarget(site.statementText, "$1.concurrent(")) },
];

describe("docs/05 Error taxonomy census: every census-silent skip mode goes red on the real pinned files", () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      for (const mode of DISABLE_MODES) {
        it(`${tag(row)}: ${mode.id} ${mode.mode} of "${pin.title}"`, () => {
          const original = readRepoText(pin.file);
          const mutated = mode.mutate(original, locateCase(original, pin.title));
          expect(mutated, "the mutant must change the pinned file").not.toBe(original);
          const problems = auditRow(row, path => (path === pin.file ? mutated : readRepoText(path)));
          expect(problems.length, `${mode.id} ${mode.mode} was census-silent`).toBeGreaterThan(0);
          expect(problems[0]).toContain(`category (${row.category})`);
        });
      }
      for (const mode of RUN_MODES) {
        it(`${tag(row)}: ${mode.id} ${mode.mode} still runs, so the row holds for "${pin.title}"`, () => {
          const original = readRepoText(pin.file);
          const mutated = mode.mutate(original, locateCase(original, pin.title));
          expect(mutated).not.toBe(original);
          expect(auditRow(row, path => (path === pin.file ? mutated : readRepoText(path)))).toEqual([]);
        });
      }
    }
  }
});

/** The default-gate tier, read from the vitest config module the gate itself loads. */
interface GateConfigShape {
  readonly test?: { readonly include?: readonly string[]; readonly exclude?: readonly string[] };
}

const globToRegExp = (glob: string): RegExp => {
  let pattern = "";
  for (let index = 0; index < glob.length; index += 1) {
    const char = glob[index] ?? "";
    if (glob.startsWith("**/", index)) {
      pattern += "(?:.*/)?";
      index += 2;
    } else if (glob.startsWith("**", index)) {
      pattern += ".*";
      index += 1;
    } else if (char === "*") pattern += "[^/]*";
    else if (char === "?") pattern += "[^/]";
    else pattern += escapeRegExp(char);
  }
  return new RegExp(`^${pattern}$`);
};

const matchesAny = (globs: readonly string[], file: string): boolean => globs.some(glob => globToRegExp(glob).test(file));

/** Problems proving each default-gate pinned file is run by the config: matched by include, absent from exclude. */
const auditTier = (rows: readonly TaxonomyRow[], gate: GateConfigShape): readonly string[] => {
  const include = gate.test?.include ?? [];
  const exclude = gate.test?.exclude ?? [];
  const problems: string[] = [];
  for (const row of rows) {
    for (const file of new Set(row.pins.map(pin => pin.file))) {
      if (!matchesAny(include, file)) problems.push(`${tag(row)}: ${file} is not matched by the vitest include globs, so the default gate never runs it`);
      if (matchesAny(exclude, file)) problems.push(`${tag(row)}: ${file} is in the vitest exclude list, so the default gate never runs it`);
    }
  }
  return problems;
};

describe("docs/05 Error taxonomy census: tier-truth against the vitest config the gate loads", () => {
  const gate = config as unknown as GateConfigShape;

  it("runs every default-gate pinned file and the census file itself under the real config", () => {
    expect(auditTier(ROWS, gate)).toEqual([]);
    expect(matchesAny(gate.test?.include ?? [], "test/workbench-error-taxonomy-census.test.ts")).toBe(true);
    expect(matchesAny(gate.test?.exclude ?? [], "test/workbench-error-taxonomy-census.test.ts")).toBe(false);
  });

  it("goes red naming the category when a pinned file is parked in the exclude list", () => {
    const control = ROWS.find(row => row.category === "c");
    expect(control).toBeDefined();
    const parked: GateConfigShape = { test: { include: gate.test?.include, exclude: [...(gate.test?.exclude ?? []), "test/workbench-control.test.ts"] } };
    const problems = auditTier(ROWS, parked);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('category (c) "permission denied"');
    expect(problems[0]).toContain("exclude list");
  });

  it("goes red when a glob in the exclude list covers a pinned file, and when include no longer matches it", () => {
    const globbed: GateConfigShape = { test: { include: gate.test?.include, exclude: ["test/workbench-control*.test.ts"] } };
    expect(auditTier(ROWS, globbed).some(problem => problem.includes("category (c)"))).toBe(true);
    const narrowed: GateConfigShape = { test: { include: ["test/workflow-*.test.ts"], exclude: [] } };
    expect(auditTier(ROWS, narrowed).some(problem => problem.includes("not matched by the vitest include"))).toBe(true);
  });

  it("reads the real exclude list as exact files, so the glob matcher agrees with the config", () => {
    for (const excluded of gate.test?.exclude ?? []) expect(matchesAny(gate.test?.include ?? [], excluded)).toBe(true);
    expect(matchesAny(["test/**/*.test.ts"], "test/a/b.test.ts")).toBe(true);
    expect(matchesAny(["test/**/*.test.ts"], "src/a.test.ts")).toBe(false);
  });
});

const sectionBody = (doc: string, heading: string): readonly string[] | null => {
  const lines = doc.split("\n");
  const at = lines.indexOf(heading);
  if (at === -1) return null;
  const body: string[] = [];
  for (const line of lines.slice(at + 1)) {
    if (line.startsWith("## ")) break;
    if (line.trim() !== "") body.push(line);
  }
  return body;
};

const TAXONOMY_HEADING = "## Error taxonomy";
const BOUNDARY_HEADING = "## Implemented node error boundary";

const TAXONOMY_SECTION: readonly string[] = [`${TAXONOMY_PARAGRAPH} Legacy agent() null failure semantics may remain at script boundary, with full detail in observer.`];

const BOUNDARY_SECTION: readonly string[] = [
  "The host now transports a typed `CapabilityError` with its category across worker RPC. Trusted scripts may identify that error in their own realm; fatal authorization, validation and uncertain-effect failures are not converted to ordinary null item failures by parallel composition. Native domain outcomes remain returned JSON values. Node options remain display `label` and `phase`; provider deadlines are host policy, not arbitrary script overrides.",
];

/** Section-bounded slice equality: heading exact and present once, body lines equal to the frozen lines. */
const auditSection = (doc: string, heading: string, expected: readonly string[]): readonly string[] => {
  const occurrences = doc.split("\n").filter(line => line === heading).length;
  if (occurrences !== 1) return [`docs/05 heading "${heading}" occurs ${occurrences} times, expected exactly once`];
  const body = sectionBody(doc, heading) ?? [];
  if (body.length === expected.length && body.every((line, index) => line === expected[index])) return [];
  return [`docs/05 section "${heading}" body changed; re-pin the census`];
};

describe("docs/05 Error taxonomy census: section-bounded docs exactness", () => {
  const doc05 = readRepoText(DOC_05);

  it("holds both section bodies exactly, heading included", () => {
    expect(auditSection(doc05, TAXONOMY_HEADING, TAXONOMY_SECTION)).toEqual([]);
    expect(auditSection(doc05, BOUNDARY_HEADING, BOUNDARY_SECTION)).toEqual([]);
  });

  const mutants: readonly { readonly id: string; readonly heading: string; readonly expected: readonly string[]; readonly mutate: (doc: string) => string }[] = [
    {
      id: "D1 ninth category sentence appended after the clause",
      heading: TAXONOMY_HEADING,
      expected: TAXONOMY_SECTION,
      mutate: doc => doc.replace("do not silently return null for every failure.", "do not silently return null for every failure. (i) partial result."),
    },
    {
      id: "D2 trailing legacy-agent qualifier weakened",
      heading: TAXONOMY_HEADING,
      expected: TAXONOMY_SECTION,
      mutate: doc => doc.replace("may remain at script boundary", "may remain at every boundary"),
    },
    {
      id: "D3 new paragraph inside the section",
      heading: TAXONOMY_HEADING,
      expected: TAXONOMY_SECTION,
      mutate: doc => doc.replace(`${TAXONOMY_SECTION[0] ?? ""}\n`, `${TAXONOMY_SECTION[0] ?? ""}\n\nNulls are fine for most failures.\n`),
    },
    {
      id: "D4 new bullet inside the section",
      heading: TAXONOMY_HEADING,
      expected: TAXONOMY_SECTION,
      mutate: doc => doc.replace(`${TAXONOMY_SECTION[0] ?? ""}\n`, `${TAXONOMY_SECTION[0] ?? ""}\n\n- null is acceptable for stale reads\n`),
    },
    {
      id: "D5 heading retitled",
      heading: TAXONOMY_HEADING,
      expected: TAXONOMY_SECTION,
      mutate: doc => doc.replace(TAXONOMY_HEADING, "## Error taxonomy (superseded)"),
    },
    {
      id: "D6 boundary section weakened",
      heading: BOUNDARY_HEADING,
      expected: BOUNDARY_SECTION,
      mutate: doc => doc.replace("are not converted to ordinary null item failures", "may be converted to ordinary null item failures"),
    },
  ];

  for (const mutant of mutants) {
    it(`goes red for ${mutant.id}`, () => {
      const mutated = mutant.mutate(doc05);
      expect(mutated, "the mutant must change docs/05").not.toBe(doc05);
      const problems = auditSection(mutated, mutant.heading, mutant.expected);
      expect(problems).toHaveLength(1);
      expect(problems[0]).toContain(mutant.heading);
    });
  }

  it("is bounded by the next level-two heading, so a change in a neighbouring section does not move the pin", () => {
    const neighbour = doc05.replace("node:vm is a language convenience", "node:vm is a language convenience (edited)");
    expect(neighbour).not.toBe(doc05);
    expect(auditSection(neighbour, TAXONOMY_HEADING, TAXONOMY_SECTION)).toEqual([]);
  });
});

describe("docs/05 Error taxonomy census: parse-aware scanner on synthetic sources", () => {
  const TITLE = "marks a replayed read as stale";
  const body = "() => {\n    expect(1).toBe(1);\n  }";
  const demo: TaxonomyRow = {
    category: "x",
    label: "demo",
    quote: "(x) demo",
    tier: "default-gate",
    status: "pinned",
    pins: [{ file: "fake.test.ts", title: TITLE }],
  };
  const audit = (source: string): readonly string[] => auditRow(demo, () => source);
  const suite = (inner: string, header = 'describe("suite", () => {'): string => `${header}\n${inner}\n});\n`;

  it("counts a registration that reads like ordinary code and is reached unconditionally", () => {
    expect(audit(suite(`  it("${TITLE}", ${body});`))).toEqual([]);
    expect(audit(suite(`  it.concurrent("${TITLE}", ${body});`))).toEqual([]);
    expect(audit(suite(`  it.runIf(true)("${TITLE}", ${body});`))).toEqual([]);
    expect(audit(suite(`  it.skipIf(false)("${TITLE}", ${body});`))).toEqual([]);
    expect(audit(suite(`  it("${TITLE}", { skip: false }, ${body});`))).toEqual([]);
    expect(audit(suite(`  it("${TITLE}", async ({ expect }) => {\n    expect(1).toBe(1);\n  });`))).toEqual([]);
    expect(audit(suite(`  it("${TITLE}", ${body});`, 'describe.concurrent("suite", () => {'))).toEqual([]);
    expect(audit(`import { it as spec, describe as group } from "vitest";\ngroup("s", () => {\n  spec("${TITLE}", ${body});\n});\n`)).toEqual([]);
  });

  it("is not fooled by strings, template literals, comments and a title used as an ordinary argument", () => {
    for (const decoy of [
      `const decoy = \`it("${TITLE}", () => {})\`;`,
      `const decoy = 'it("${TITLE}", () => {})';`,
      `expect(titles).toContain("${TITLE}");`,
      `/* it("${TITLE}", () => {}); */ void 0;`,
      `void 0; /* it("${TITLE}", () => {});\n*/`,
      `// it("${TITLE}", () => {});`,
    ]) {
      const problems = audit(suite(`  ${decoy}`));
      expect(problems, decoy).toHaveLength(1);
      expect(problems[0], decoy).toContain("occurs 0 times");
    }
  });

  it("refuses every disabling option, ctx.skip form, alias and conditional or indirect registration", () => {
    const refused: readonly string[] = [
      suite(`  it("${TITLE}", { skip: true }, ${body});`),
      suite(`  it("${TITLE}", { todo: true }, ${body});`),
      suite(`  it("${TITLE}", { fails: true }, ${body});`),
      suite(`  it("${TITLE}", { only: true }, ${body});`),
      suite(`  it("${TITLE}", { ...flags }, ${body});`),
      suite(`  it("${TITLE}", { ["skip"]: true }, ${body});`),
      suite(`  it("${TITLE}", ${body}, { skip: true });`),
      suite(`  it("${TITLE}", (ctx) => {\n    ctx.skip();\n  });`),
      suite(`  it("${TITLE}", (ctx) => {\n    const { skip } = ctx;\n    skip();\n  });`),
      suite(`  it("${TITLE}", ({ skip }) => {\n    skip();\n  });`),
      suite(`  it.skipIf(process.env.CI)("${TITLE}", ${body});`),
      suite(`  it.runIf(process.env.RUN)("${TITLE}", ${body});`),
      suite(`  it.each([1])("${TITLE}", ${body});`),
      suite(`  it("${TITLE}", ${body});`, 'describe("suite", { skip: true }, () => {'),
      suite(`  it("${TITLE}", ${body});`, "suite.skip('suite', () => {"),
      suite(`  it("${TITLE}", ${body});`, "describe.skipIf(true)('suite', () => {"),
      suite(`  it("${TITLE}", ${body});`, "describe.each([1])('suite', () => {"),
      `const parked = describe.skip;\nparked("suite", () => {\n  it("${TITLE}", ${body});\n});\n`,
      `const parked = it.skip;\nparked("${TITLE}", ${body});\n`,
      `const never = () => {\n  it("${TITLE}", ${body});\n};\nvoid never;\n`,
      `if (process.env.X) {\n  it("${TITLE}", ${body});\n}\n`,
      `for (const once of [1]) {\n  void once;\n  it("${TITLE}", ${body});\n}\n`,
      `[1].forEach(() => {\n  it("${TITLE}", ${body});\n});\n`,
      `describe.skip("suite", () => {\nit("${TITLE}", ${body});\n});\n`,
      `describe.skip("suite", () => {\n  it("${TITLE}", ${body});\n});\n`,
      `void 0 && it("${TITLE}", ${body});\n`,
    ];
    for (const source of refused) {
      const problems = audit(source);
      expect(problems, source).toHaveLength(1);
      expect(problems[0], source).toContain('category (x) "demo"');
    }
  });
});
