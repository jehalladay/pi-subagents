/**
 * wb-tz2.2 (HX-ORIGINAL-GOALS-CLOSURE-R2), one cut with wb-tz2.1 (R1): a hermetic default-gate census over the SOURCES of the two
 * live-binary HX tests. It never launches hx and never runs a live case; it reads the test files and the tier configuration as
 * text and parses them with the TypeScript compiler, so comments are trivia and never count as code.
 *
 * Bead statement (R2): "Pi-subagents shall never assert licenses_absence:false, kind:'incomplete', or the bare version literal
 * '0.1.0' as an expected value in a live-binary HX test; the rewrite shall keep the contract pin hyperunix.find/v1, the
 * representation pin hyperunix.result/1, the sha-256 identity check and the not.toContain('"verified":true') leak check, and shall
 * never promote the live tier into the default gate."
 * R1 (the rewrite this census pins): "The two live-binary HX tests shall assert the program-normative runtime-licence invariant
 * through one shared pure predicate ... instead of asserting any concrete verdict." The predicate is hxLiveInvariant
 * (src/workbench/hyperunix-observer.ts); its unit rows live in test/workbench-hyperunix-observer.test.ts.
 * R1 fold-in HXFS-PI-3 (bead notes): the live tests' describe/it titles and printed receipt line say "installed" only when the
 * version class is installed. Static titles cannot know the class, so no title says it, and neither does either file's leading
 * doc comment (the fold-in cites native-ecosystem:1 "against installed binaries"); the receipt line comes from
 * test/helpers/hx-live-receipt.ts.
 *
 * NON-REQUIREMENT NOTE (R2 acceptance 4): test/workbench-ecosystem-native.test.ts:15@9df9a03 lets HYPERUNIX_HX override the hx
 * binary the SDK opens and otherwise defaults it to a home-directory path. That env-overridable default is a REFUTED-row hygiene
 * option in the hx-original-goals-closure dossier; it is recorded here and deliberately NOT converted into a requirement - no
 * assertion below reads or pins it.
 *
 * HONEST LIMITS: the forbidden-value scan matches literal spellings in active code (object-literal properties, string literals,
 * matcher calls on a licenses_absence subject, toHaveProperty paths). A verdict value assembled at runtime, passed through a
 * variable or imported from another module is outside it; the predicate rows in the observer suite and the gate review own
 * semantic equivalence. Case liveness is structural (registration modifiers, options flags, enclosing suites, context skip calls); it
 * proves the HX cases are registered to run, never that the native tier ran them - the native receipt does that.
 */
import {readdirSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import {describe, expect, it} from 'vitest';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const NATIVE_ECOSYSTEM = 'test/workbench-native-ecosystem.test.ts';
const ECOSYSTEM_NATIVE = 'test/workbench-ecosystem-native.test.ts';
const LIVE = [NATIVE_ECOSYSTEM, ECOSYSTEM_NATIVE] as const;
const NATIVE_CONFIG = 'vitest.native.config.ts';

/** The three forms R2 acceptance 1 names, verbatim: native-ecosystem:10@9df9a03 carries the first and third, ecosystem-native:19
 * the first and second. Matched against the RAW source text, comments included, so even a commented-out pin is refused. */
const SPEC_FORBIDDEN: readonly RegExp[] = [/licenses_absence:\s*false/, /kind:\s*'incomplete'/, /version:\s*'0\.1\.0'/];
/** A bare SemVer version used as a literal: '0.1.0' today, and any later bare version a pinned live expectation would freeze. */
const BARE_SEMVER = /^\d+\.\d+\.\d+$/;
/** The registration modifiers and option flags that park a case, invert it or make it conditional. */
const PARKING = new Set(['skip', 'todo', 'only', 'fails', 'skipIf', 'runIf']);
/** Chain members that keep a registration running unchanged. */
const RUNNING = new Set(['each', 'for', 'concurrent', 'sequential']);
const OBJECT_MATCHERS = new Set(['toMatchObject', 'toStrictEqual', 'toEqual']);
const VALUE_MATCHERS = new Set(['toBe', 'toEqual', 'toStrictEqual']);
const HX_TITLE = /^HX\b/;
const SHA_REGEX = '/^[0-9a-f]{64}$/';
const LEAK = '"verified":true';

function readRepo(relative: string): string {
  return readFileSync(join(ROOT, relative), 'utf8');
}
function parse(name: string, text: string): ts.SourceFile {
  return ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function each(node: ts.Node, visit: (node: ts.Node) => void): void {
  visit(node);
  ts.forEachChild(node, child => each(child, visit));
}
function lineOf(sf: ts.SourceFile, node: ts.Node): number {
  return sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
}
/** A string literal's value: plain, or a template with no substitution. */
function literal(node: ts.Node | undefined): string | undefined {
  return node !== undefined && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
}
function keyOf(name: ts.PropertyName): string | undefined {
  return ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name) ? name.text : undefined;
}
/** The last member of an access chain: result.source.coverage_summary.licenses_absence -> licenses_absence. */
function leafName(node: ts.Expression | undefined): string | undefined {
  if (node === undefined) return undefined;
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node)) return literal(node.argumentExpression);
  if (ts.isParenthesizedExpression(node) || ts.isNonNullExpression(node) || ts.isAsExpression(node)) return leafName(node.expression);
  return undefined;
}

interface Matcher {
  readonly name: string;
  readonly negated: boolean;
  readonly subject: ts.Expression | undefined;
}
/** expect(subject)[.not|.resolves|.rejects]*.<name>(...), or undefined for any other call. */
function matcherOf(call: ts.CallExpression): Matcher | undefined {
  if (!ts.isPropertyAccessExpression(call.expression)) return undefined;
  let negated = false;
  let target: ts.Expression = call.expression.expression;
  while (ts.isPropertyAccessExpression(target) && ['not', 'resolves', 'rejects'].includes(target.name.text)) {
    if (target.name.text === 'not') negated = !negated;
    target = target.expression;
  }
  if (!ts.isCallExpression(target) || !ts.isIdentifier(target.expression) || target.expression.text !== 'expect') return undefined;
  return {name: call.expression.name.text, negated, subject: target.arguments[0]};
}

/**
 * Every place active code asserts one of today's verdict values (R2): a string literal whose whole value is the 'incomplete'
 * kind or a bare version, licenses_absence: false in an object literal, a matcher pinning a licenses_absence subject to false (toBe/toEqual/
 * toStrictEqual(false), toBeFalsy(), not.toBe(true), not.toBeTruthy()), and toHaveProperty(<...licenses_absence>, false).
 */
function forbiddenExpectations(sf: ts.SourceFile): string[] {
  const found: string[] = [];
  const at = (node: ts.Node, what: string): void => {
    found.push(`${sf.fileName}:${lineOf(sf, node)} ${what}`);
  };
  each(sf, node => {
    const text = literal(node);
    if (text !== undefined && (text === 'incomplete' || BARE_SEMVER.test(text))) at(node, `literal '${text}'`);
    if (ts.isPropertyAssignment(node) && keyOf(node.name) === 'licenses_absence' && node.initializer.kind === ts.SyntaxKind.FalseKeyword) {
      at(node, 'licenses_absence: false');
    }
    if (!ts.isCallExpression(node)) return;
    const matcher = matcherOf(node);
    if (matcher === undefined) return;
    const argument = node.arguments[0]?.kind;
    if (leafName(matcher.subject) === 'licenses_absence') {
      const pinsFalse = matcher.negated
        ? (VALUE_MATCHERS.has(matcher.name) && argument === ts.SyntaxKind.TrueKeyword) || matcher.name === 'toBeTruthy'
        : (VALUE_MATCHERS.has(matcher.name) && argument === ts.SyntaxKind.FalseKeyword) || matcher.name === 'toBeFalsy';
      if (pinsFalse) at(node, `expect(...licenses_absence).${matcher.negated ? 'not.' : ''}${matcher.name}`);
    }
    if (matcher.name === 'toHaveProperty' && !matcher.negated && node.arguments[1]?.kind === ts.SyntaxKind.FalseKeyword) {
      const path = node.arguments[0];
      const last = path !== undefined && ts.isArrayLiteralExpression(path) ? literal(path.elements.at(-1)) : literal(path)?.split('.').at(-1);
      if (last === 'licenses_absence') at(node, 'toHaveProperty(licenses_absence, false)');
    }
  });
  return found;
}

/** A registration call: it/test or describe/suite, with every chain member after the root. */
interface Registration {
  readonly kind: 'case' | 'suite';
  readonly members: readonly string[];
  readonly call: ts.CallExpression;
}
function registrationOf(call: ts.CallExpression): Registration | undefined {
  const members: string[] = [];
  let callee: ts.Expression = call.expression;
  for (;;) {
    if (ts.isCallExpression(callee)) callee = callee.expression;
    else if (ts.isPropertyAccessExpression(callee)) {
      members.unshift(callee.name.text);
      callee = callee.expression;
    } else break;
  }
  if (!ts.isIdentifier(callee)) return undefined;
  const kind = callee.text === 'it' || callee.text === 'test' ? 'case' : callee.text === 'describe' || callee.text === 'suite' ? 'suite' : undefined;
  return kind === undefined ? undefined : {kind, members, call};
}
/** Why a registration would not run as written, or undefined when it runs: a parking or unknown modifier, or an options flag. */
function parkedBy(registration: Registration): string | undefined {
  for (const member of registration.members) {
    if (PARKING.has(member)) return `modifier .${member}`;
    if (!RUNNING.has(member)) return `unrecognised modifier .${member}`;
  }
  for (const argument of registration.call.arguments) {
    if (!ts.isObjectLiteralExpression(argument)) continue;
    for (const property of argument.properties) {
      if (ts.isSpreadAssignment(property)) return 'options spread';
      const name = property.name === undefined ? undefined : keyOf(property.name);
      if (name === undefined || !PARKING.has(name)) continue;
      if (ts.isPropertyAssignment(property) && property.initializer.kind === ts.SyntaxKind.FalseKeyword) continue;
      return `option ${name}`;
    }
  }
  return undefined;
}
function callbackOf(call: ts.CallExpression): ts.ArrowFunction | ts.FunctionExpression | undefined {
  return call.arguments.find((argument): argument is ts.ArrowFunction | ts.FunctionExpression =>
    ts.isArrowFunction(argument) || ts.isFunctionExpression(argument));
}

interface LiveCase {
  readonly title: string;
  readonly line: number;
  readonly body: ts.ArrowFunction | ts.FunctionExpression | undefined;
  /** Why the case would not run, or undefined. */
  readonly parked: string | undefined;
}
/** Every it/test registration with a literal title, judged together with its enclosing suites. */
function casesOf(sf: ts.SourceFile): LiveCase[] {
  const found: LiveCase[] = [];
  const walk = (node: ts.Node, suiteParked: string | undefined): void => {
    if (ts.isCallExpression(node)) {
      const registration = registrationOf(node);
      if (registration !== undefined) {
        const own = parkedBy(registration);
        const title = literal(node.arguments[0]);
        const body = callbackOf(node);
        if (registration.kind === 'case' && title !== undefined) {
          let skips = false;
          if (body !== undefined) {
            each(body.body, inner => {
              if (!ts.isCallExpression(inner)) return;
              const callee = inner.expression;
              if ((ts.isIdentifier(callee) && callee.text === 'skip') || (ts.isPropertyAccessExpression(callee) && callee.name.text === 'skip')) skips = true;
            });
          }
          found.push({title, line: lineOf(sf, node), body, parked: suiteParked ?? own ?? (skips ? 'context skip call in the callback' : undefined)});
        }
        const next = registration.kind === 'suite' ? suiteParked ?? (own === undefined ? undefined : `enclosing suite ${own}`) : suiteParked;
        ts.forEachChild(node, child => walk(child, next));
        return;
      }
    }
    ts.forEachChild(node, child => walk(child, suiteParked));
  };
  walk(sf, undefined);
  return found;
}
/** Every suite title with a literal title. */
function suiteTitles(sf: ts.SourceFile): string[] {
  const titles: string[] = [];
  each(sf, node => {
    if (!ts.isCallExpression(node)) return;
    const title = literal(node.arguments[0]);
    if (registrationOf(node)?.kind === 'suite' && title !== undefined) titles.push(title);
  });
  return titles;
}

/** A property `key: <value literal>` inside the object argument of an expect(...) object matcher. */
function pinsProperty(body: ts.Node, key: string, value: string): boolean {
  let hit = false;
  each(body, node => {
    if (!ts.isCallExpression(node)) return;
    const matcher = matcherOf(node);
    if (matcher === undefined || matcher.negated || !OBJECT_MATCHERS.has(matcher.name)) return;
    for (const argument of node.arguments) {
      each(argument, inner => {
        if (ts.isPropertyAssignment(inner) && keyOf(inner.name) === key && literal(inner.initializer) === value) hit = true;
      });
    }
  });
  return hit;
}
/** An expect(...) matcher whose subtree names binarySha256 and carries the 64-hex regex literal: the sha-256 identity check. */
function pinsDigest(body: ts.Node): boolean {
  let hit = false;
  each(body, node => {
    if (!ts.isCallExpression(node) || matcherOf(node) === undefined || matcherOf(node)?.negated) return;
    let names = false;
    let regex = false;
    each(node, inner => {
      if ((ts.isIdentifier(inner) || ts.isStringLiteral(inner)) && inner.text === 'binarySha256') names = true;
      if (ts.isRegularExpressionLiteral(inner) && inner.text === SHA_REGEX) regex = true;
    });
    if (names && regex) hit = true;
  });
  return hit;
}
/** expect(JSON.stringify(...)).not.toContain('"verified":true'): the leak check. */
function pinsLeakCheck(body: ts.Node): boolean {
  let hit = false;
  each(body, node => {
    if (!ts.isCallExpression(node)) return;
    const matcher = matcherOf(node);
    if (matcher === undefined || !matcher.negated || matcher.name !== 'toContain' || literal(node.arguments[0]) !== LEAK) return;
    const subject = matcher.subject;
    if (subject !== undefined && ts.isCallExpression(subject) && ts.isPropertyAccessExpression(subject.expression) &&
      ts.isIdentifier(subject.expression.expression) && subject.expression.expression.text === 'JSON' && subject.expression.name.text === 'stringify') hit = true;
  });
  return hit;
}
const callsNamed = (node: ts.Node, name: string): boolean => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === name;
/** The case computes hxLiveInvariant(...) (directly or through a const) and asserts the verdict holds: an object matcher with holds: true. */
function assertsInvariant(body: ts.Node): boolean {
  const bound = new Set<string>();
  each(body, node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && callsNamed(node.initializer, 'hxLiveInvariant')) bound.add(node.name.text);
  });
  let hit = false;
  each(body, node => {
    if (!ts.isCallExpression(node)) return;
    const matcher = matcherOf(node);
    if (matcher === undefined || matcher.negated || !OBJECT_MATCHERS.has(matcher.name) || matcher.subject === undefined) return;
    const subject = matcher.subject;
    if (!callsNamed(subject, 'hxLiveInvariant') && !(ts.isIdentifier(subject) && bound.has(subject.text))) return;
    const shape = node.arguments[0];
    if (shape !== undefined && ts.isObjectLiteralExpression(shape) && shape.properties.some(property =>
      ts.isPropertyAssignment(property) && keyOf(property.name) === 'holds' && property.initializer.kind === ts.SyntaxKind.TrueKeyword)) hit = true;
  });
  return hit;
}
/** The case prints the receipt line through the shared helper (fold-in HXFS-PI-3). */
function printsReceipt(body: ts.Node): boolean {
  let hit = false;
  each(body, node => {
    if (callsNamed(node, 'hxLiveReceipt')) hit = true;
  });
  return hit;
}

interface Pins {
  readonly cases: number;
  readonly parked: string[];
  readonly contract: boolean;
  readonly representation: boolean;
  readonly digest: boolean;
  readonly leak: boolean;
  readonly invariantInEveryCase: boolean;
  readonly receiptInEveryCase: boolean;
}
/** The kept pins of one live source: each must sit in a running HX case; the predicate and the receipt in every HX case. */
function pinsOf(name: string, text: string): Pins {
  const hx = casesOf(parse(name, text)).filter(item => HX_TITLE.test(item.title));
  const running = hx.filter(item => item.parked === undefined && item.body !== undefined);
  const someRunning = (judge: (body: ts.Node) => boolean): boolean => running.some(item => item.body !== undefined && judge(item.body));
  const every = (judge: (body: ts.Node) => boolean): boolean => hx.length > 0 && hx.every(item => item.parked === undefined && item.body !== undefined && judge(item.body));
  return {
    cases: hx.length,
    parked: hx.filter(item => item.parked !== undefined).map(item => `${name}:${item.line} '${item.title}' ${item.parked}`),
    contract: someRunning(body => pinsProperty(body, 'contract', 'hyperunix.find/v1')),
    representation: someRunning(body => pinsProperty(body, 'representation', 'hyperunix.result/1')),
    digest: someRunning(pinsDigest),
    leak: someRunning(pinsLeakCheck),
    invariantInEveryCase: every(assertsInvariant),
    receiptInEveryCase: every(printsReceipt),
  };
}

/** A string array property of the `test` object of `export default defineConfig({...})` in a vitest config. */
function vitestArray(name: string, text: string, key: 'include' | 'exclude'): string[] | undefined {
  const sf = parse(name, text);
  for (const statement of sf.statements) {
    if (!ts.isExportAssignment(statement) || !ts.isCallExpression(statement.expression)) continue;
    const config = statement.expression.arguments[0];
    if (config === undefined || !ts.isObjectLiteralExpression(config)) continue;
    const testBlock = config.properties.find((property): property is ts.PropertyAssignment => ts.isPropertyAssignment(property) && keyOf(property.name) === 'test');
    if (testBlock === undefined || !ts.isObjectLiteralExpression(testBlock.initializer)) return undefined;
    const array = testBlock.initializer.properties.find((property): property is ts.PropertyAssignment => ts.isPropertyAssignment(property) && keyOf(property.name) === key);
    if (array === undefined || !ts.isArrayLiteralExpression(array.initializer)) return undefined;
    const values = array.initializer.elements.map(element => literal(element));
    return values.every((value): value is string => value !== undefined) ? values : undefined;
  }
  return undefined;
}
/** forge.toml split into [section] -> body text, in file order. */
function tomlSections(text: string): Map<string, string> {
  const sections = new Map<string, string>();
  let current = '';
  for (const line of text.split('\n')) {
    const header = /^\s*\[([^\]]+)\]\s*$/.exec(line);
    if (header !== null) {
      current = header[1]?.trim() ?? '';
      sections.set(current, '');
      continue;
    }
    sections.set(current, `${sections.get(current) ?? ''}${line}\n`);
  }
  return sections;
}
function gateSteps(sections: ReadonlyMap<string, string>): string[] {
  const line = /^\s*gate\s*=\s*\[([^\]]*)\]/m.exec(sections.get('build') ?? '');
  return line === null ? [] : [...(line[1] ?? '').matchAll(/"([^"]+)"/g)].map(match => match[1] ?? '');
}

describe('wb-tz2.2 census: the two live-binary HX test sources', () => {
  const sources = LIVE.map(file => [file, readRepo(file)] as const);

  it.each(LIVE.flatMap(file => SPEC_FORBIDDEN.map((form, index) => [file, String(form), index] as const)))(
    'R2: %s never spells %s (raw text, comments included)', (file, _form, index) => {
      expect(readRepo(file)).not.toMatch(SPEC_FORBIDDEN[index]);
    });

  it.each(LIVE)('R2: %s asserts no verdict value in active code (no incomplete kind, bare version or unlicensed licence)', file => {
    expect(forbiddenExpectations(parse(file, readRepo(file)))).toStrictEqual([]);
  });

  it.each(LIVE)('R2: %s keeps the contract, representation and sha-256 pins inside a running HX case', file => {
    const pins = pinsOf(file, readRepo(file));
    expect(pins.cases).toBeGreaterThan(0);
    expect(pins.parked).toStrictEqual([]);
    expect({contract: pins.contract, representation: pins.representation, digest: pins.digest})
      .toStrictEqual({contract: true, representation: true, digest: true});
  });

  it('R2: test/workbench-ecosystem-native.test.ts keeps the not.toContain(\'"verified":true\') leak check inside a running HX case', () => {
    expect(pinsOf(ECOSYSTEM_NATIVE, readRepo(ECOSYSTEM_NATIVE)).leak).toBe(true);
  });

  it.each(LIVE)('R1: every HX case in %s asserts the shared hxLiveInvariant verdict holds', file => {
    expect(pinsOf(file, readRepo(file)).invariantInEveryCase).toBe(true);
  });

  it.each(LIVE)('R1 fold-in HXFS-PI-3: every HX case in %s prints its receipt line through hxLiveReceipt', file => {
    expect(pinsOf(file, readRepo(file)).receiptInEveryCase).toBe(true);
  });

  it.each(LIVE)('R1 fold-in HXFS-PI-3: no describe or it title in %s claims an installed binary', file => {
    const sf = parse(file, readRepo(file));
    const titles = [...suiteTitles(sf), ...casesOf(sf).map(item => item.title)];
    expect(titles.length).toBeGreaterThan(0);
    expect(titles.filter(title => /installed/i.test(title))).toStrictEqual([]);
  });

  it.each(LIVE)('R1 fold-in HXFS-PI-3: the leading doc comment of %s claims no installed binary either', file => {
    const text = readRepo(file);
    const leading = (ts.getLeadingCommentRanges(text, 0) ?? []).map(range => text.slice(range.pos, range.end)).join('\n');
    expect(leading.length).toBeGreaterThan(0);
    expect(leading).not.toMatch(/installed/i);
  });

  it('reads both live sources from disk, non-empty, each with at least one HX case', () => {
    for (const [file, text] of sources) {
      expect(text.length, file).toBeGreaterThan(0);
      expect(pinsOf(file, text).cases, file).toBeGreaterThan(0);
    }
  });
});

describe('wb-tz2.2 census: the live tier stays separate from the default gate', () => {
  it('R2: vitest.config.ts includes test/**/*.test.ts yet excludes both live files, so the default gate never runs them', () => {
    const text = readRepo('vitest.config.ts');
    expect(vitestArray('vitest.config.ts', text, 'include')).toContain('test/**/*.test.ts');
    const exclude = vitestArray('vitest.config.ts', text, 'exclude') ?? [];
    for (const file of LIVE) expect(exclude).toContain(file);
  });

  it('R2: vitest.native.config.ts still includes both live files', () => {
    const include = vitestArray(NATIVE_CONFIG, readRepo(NATIVE_CONFIG), 'include') ?? [];
    for (const file of LIVE) expect(include).toContain(file);
  });

  it('R2: no other vitest config so much as names either live file', () => {
    const others = readdirSync(ROOT).filter(name => /^vitest\.[\w.-]+\.config\.ts$/.test(name) && name !== NATIVE_CONFIG);
    expect(others.length).toBeGreaterThan(0);
    for (const name of others) {
      for (const file of LIVE) expect(readRepo(name), name).not.toContain(file);
    }
  });

  it('R2: the live tier remains only forge.toml [build.commands.native-read], and the default gate never lists it', () => {
    const sections = tomlSections(readRepo('forge.toml'));
    const runners = [...sections].filter(([, body]) => body.includes(NATIVE_CONFIG)).map(([name]) => name);
    expect(runners).toStrictEqual(['build.commands.native-read']);
    expect(sections.get('build.commands.native-read')).toMatch(/^command = "\.\/node_modules\/\.bin\/vitest run --config vitest\.native\.config\.ts"$/m);
    const steps = gateSteps(sections);
    expect(steps).toContain('test');
    expect(steps).not.toContain('native-read');
    const pkg: unknown = JSON.parse(readRepo('package.json'));
    const script = typeof pkg === 'object' && pkg !== null && 'scripts' in pkg && typeof pkg.scripts === 'object' && pkg.scripts !== null &&
      'test' in pkg.scripts ? pkg.scripts.test : undefined;
    expect(script).toBe('vitest run --reporter=default --reporter=json --outputFile=.forge/vitest-report.json --includeTaskLocation --expect.requireAssertions');
  });
});

/** The rewritten live HX case body, statement for statement. */
const WELL_FORMED: readonly string[] = [
  'const result = await read();',
  "expect(result).toMatchObject({contract: 'hyperunix.find/v1', source: {representation: 'hyperunix.result/1'}, runtime: {binarySha256: expect.stringMatching(/^[0-9a-f]{64}$/)}});",
  'const verdict = hxLiveInvariant(result);',
  'expect(verdict).toMatchObject({holds: true, violations: []});',
  "expect(JSON.stringify(result)).not.toContain('\"verified\":true');",
  'console.log(hxLiveReceipt(result, verdict));',
];
/** Builds a live HX case source for the falsifier rows; modifiers are spliced at runtime so this file spells none of them. */
function liveSource(options: {member?: string; option?: string; suiteMember?: string; param?: string; statements?: readonly string[]; title?: string} = {}): string {
  const caseCallee = options.member === undefined ? 'it' : ['it', options.member].join('.');
  const suiteCallee = options.suiteMember === undefined ? 'describe' : ['describe', options.suiteMember].join('.');
  const opts = options.option === undefined ? '' : `{${options.option}: true}, `;
  const statements = options.statements ?? WELL_FORMED;
  return [
    "import {describe, expect, it} from 'vitest';",
    `${suiteCallee}('suite', () => {`,
    `  ${caseCallee}('${options.title ?? 'HX probe'}', ${opts}async (${options.param ?? ''}) => {`,
    ...statements.map(line => `    ${line}`),
    '  });',
    '});',
    '',
  ].join('\n');
}

describe('wb-tz2.2 census: the scanner itself is falsifiable', () => {
  it('a well-formed live source passes every pin and carries no forbidden expectation', () => {
    const pins = pinsOf('probe.ts', liveSource());
    expect(pins).toStrictEqual({cases: 1, parked: [], contract: true, representation: true, digest: true, leak: true, invariantInEveryCase: true, receiptInEveryCase: true});
    expect(forbiddenExpectations(parse('probe.ts', liveSource()))).toStrictEqual([]);
  });

  const forbidden: [string, string, number][] = [
    ['the pre-rewrite native-ecosystem:10 statement', "expect(result).toMatchObject({contract:'hyperunix.find/v1',source:{representation:'hyperunix.result/1',coverage_summary:{licenses_absence:false}},runtime:{version:'0.1.0'}});", 2],
    ['the pre-rewrite ecosystem-native:19 statement', "expect(result).toMatchObject({contract:'hyperunix.find/v1',source:{execution_status:{kind:'incomplete'},coverage_summary:{licenses_absence:false}}});", 2],
    ['a quoted licenses_absence key', 'expect(result).toMatchObject({source: {coverage_summary: {"licenses_absence": false}}});', 1],
    ['toBe(false) on the licence', 'expect(result.source.coverage_summary.licenses_absence).toBe(false);', 1],
    ['toStrictEqual(false) on an element-accessed licence', "expect(result.source.coverage_summary['licenses_absence']).toStrictEqual(false);", 1],
    ['toBeFalsy() on the licence', 'expect(result.source.coverage_summary.licenses_absence).toBeFalsy();', 1],
    ['not.toBe(true) on the licence', 'expect(result.source.coverage_summary.licenses_absence).not.toBe(true);', 1],
    ['not.toBeTruthy() on the licence', 'expect(result.source.coverage_summary.licenses_absence).not.toBeTruthy();', 1],
    ['toHaveProperty with a dotted licence path', "expect(result).toHaveProperty('source.coverage_summary.licenses_absence', false);", 1],
    ['toHaveProperty with an array licence path', "expect(result).toHaveProperty(['source', 'coverage_summary', 'licenses_absence'], false);", 1],
    ['the incomplete kind in double quotes', 'expect(result).toMatchObject({source: {execution_status: {kind: "incomplete"}}});', 1],
    ['the incomplete kind through toBe', "expect(result.source.execution_status.kind).toBe('incomplete');", 1],
    ['the bare version through toBe', "expect(result.runtime.version).toBe('0.1.0');", 1],
    ['a later bare version in a template literal', 'expect(result.runtime.version).toBe(`0.2.0`);', 1],
  ];
  it.each(forbidden)('flags %s', (_name, statement, count) => {
    expect(forbiddenExpectations(parse('probe.ts', liveSource({statements: [statement]})))).toHaveLength(count);
  });

  it('never flags titles or messages that merely contain the words, or a licence asserted true', () => {
    const benign = ["expect(result).toMatchObject({source: {coverage_summary: {licenses_absence: true}}});", "const note = 'coverage stays incomplete in 0.1.0 builds';",
      'expect(result.source.coverage_summary.licenses_absence).toBe(true);', "expect(result).toHaveProperty('source.coverage_summary.licenses_absence', true);"];
    expect(forbiddenExpectations(parse('probe.ts', liveSource({statements: benign, title: 'HX coverage stays incomplete under 0.1.0'})))).toStrictEqual([]);
  });

  it('refuses a commented-out pin: comments are trivia, never code', () => {
    const commented = liveSource({statements: [
      "// expect(result).toMatchObject({contract: 'hyperunix.find/v1', source: {representation: 'hyperunix.result/1'}, runtime: {binarySha256: expect.stringMatching(/^[0-9a-f]{64}$/)}});",
      '/* const verdict = hxLiveInvariant(result); expect(verdict).toMatchObject({holds: true}); */',
      "// expect(JSON.stringify(result)).not.toContain('\"verified\":true');",
      '// console.log(hxLiveReceipt(result, verdict));',
    ]});
    expect(pinsOf('probe.ts', commented)).toMatchObject({cases: 1, contract: false, representation: false, digest: false, leak: false, invariantInEveryCase: false, receiptInEveryCase: false});
  });

  it.each(['skip', 'todo', 'only', 'fails', 'skipIf(true)', 'runIf(false)', 'unknownModifier'])('a case registered through it.%s is parked and pins nothing', member => {
    const pins = pinsOf('probe.ts', liveSource({member}));
    expect(pins.parked).toHaveLength(1);
    expect(pins).toMatchObject({contract: false, representation: false, digest: false, leak: false, invariantInEveryCase: false, receiptInEveryCase: false});
  });

  it.each(['skip', 'todo', 'only', 'fails'])('a case carrying the options flag %s: true is parked', option => {
    expect(pinsOf('probe.ts', liveSource({option})).parked).toHaveLength(1);
  });

  it.each(['skip', 'todo', 'skipIf(true)', 'runIf(false)'])('a case inside describe.%s is parked', suiteMember => {
    expect(pinsOf('probe.ts', liveSource({suiteMember})).parked).toHaveLength(1);
  });

  it('a case whose callback calls the context skip is parked', () => {
    const source = liveSource({param: 'ctx', statements: [`${['ctx', 'skip'].join('.')}();`, ...WELL_FORMED]});
    expect(pinsOf('probe.ts', source).parked).toStrictEqual(["probe.ts:3 'HX probe' context skip call in the callback"]);
  });

  it('the predicate pin needs a holds: true assertion on the hxLiveInvariant verdict, not just the call', () => {
    const computedOnly = ['const verdict = hxLiveInvariant(await read());', 'expect(verdict).toBeDefined();'];
    expect(pinsOf('probe.ts', liveSource({statements: computedOnly})).invariantInEveryCase).toBe(false);
    const negated = ['const verdict = hxLiveInvariant(await read());', 'expect(verdict).not.toMatchObject({holds: true});'];
    expect(pinsOf('probe.ts', liveSource({statements: negated})).invariantInEveryCase).toBe(false);
    const direct = ['expect(hxLiveInvariant(await read())).toMatchObject({holds: true, violations: []});'];
    expect(pinsOf('probe.ts', liveSource({statements: direct})).invariantInEveryCase).toBe(true);
  });

  it('the digest pin needs the 64-hex regex applied to binarySha256 in one assertion', () => {
    const elsewhere = ["const hex = /^[0-9a-f]{64}$/;", "expect(result.runtime.binarySha256).toBeTypeOf('string');"];
    expect(pinsOf('probe.ts', liveSource({statements: elsewhere})).digest).toBe(false);
    const looser = ['expect(result.runtime.binarySha256).toMatch(/^[0-9a-f]+$/);'];
    expect(pinsOf('probe.ts', liveSource({statements: looser})).digest).toBe(false);
    const direct = ['expect(result.runtime.binarySha256).toMatch(/^[0-9a-f]{64}$/);'];
    expect(pinsOf('probe.ts', liveSource({statements: direct})).digest).toBe(true);
  });

  it('the leak pin must be the negated toContain over JSON.stringify of the result', () => {
    const positive = ["expect(JSON.stringify(result)).toContain('\"verified\":true');"];
    expect(pinsOf('probe.ts', liveSource({statements: positive})).leak).toBe(false);
    const otherSubject = ["expect(String(result)).not.toContain('\"verified\":true');"];
    expect(pinsOf('probe.ts', liveSource({statements: otherSubject})).leak).toBe(false);
  });

  it('the tier readers parse the real config shapes and refuse a moved array', () => {
    expect(vitestArray('x.ts', 'export default defineConfig({test:{include:["a.test.ts"]},coverage:{include:["src/**"]}});', 'include')).toStrictEqual(['a.test.ts']);
    expect(vitestArray('x.ts', 'export default defineConfig({coverage:{include:["src/**"]}});', 'include')).toBeUndefined();
    expect(vitestArray('x.ts', 'export default defineConfig({test:{include:["a", name]}});', 'include')).toBeUndefined();
    const sections = tomlSections('[build]\ngate = ["lint", "test"]\n\n[build.commands.native-read]\ncommand = "x"\n');
    expect(gateSteps(sections)).toStrictEqual(['lint', 'test']);
    expect(sections.get('build.commands.native-read')).toMatch(/^command = "x"$/m);
  });
});
