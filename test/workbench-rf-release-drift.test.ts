/**
 * SCG-R12 (wb-973.12), live-tier half. R12-1 pins the carrier's recorded release (CARRIER_RECORDED, re-pinned by
 * wb-973.17); the pure comparison rows R12-2..R12-10 pin typed drift failures against a sample recorded release
 * (RECORDED, the carrier's release before that re-pin), never the carrier; the carrier-to-receipt equality lives in
 * workbench-rf-contract-carrier.test.ts.
 * R12-11/R12-12 now parse TypeScript, never grep titles or parking words. They freeze the LIVE ROW's complete AST
 * (rule 16), its imports, and its direct describe/it placement. Comments and strings cannot register it. A changed
 * body (including early returns, context parameters/calls or recorded argument), options, modifiers, or an uncalled
 * wrapper is refused. W1-W9 independently reproduce the gate's U1 witnesses; FR1 checks harmless comment trivia.
 *
 * This proves SOURCE SHAPE, not a live pass or assertion reach in an executed tier. NAMED RESIDUALS: LIVE-RUN
 * (no native-tier report is read here); CONFIG (the rf tier's inclusion, hooks, runner and binary are not vouched
 * here); OTHER-CODE (code outside the pinned row/imports may affect runtime behaviour). The live tier's measured
 * receipt owns those claims. The live title and the frozen-shape describe title are the drift helper's exports (RF_LIVE_DRIFT_TITLE,
 * RF_LIVE_DRIFT_SHAPE_SUITE; wb-973.20), the anchors the docs07 census binds row R5 to; FROZEN_ROW keeps the title as its own
 * literal, so the helper's value is held to the native row. Carrier re-pin (wb-973.17): installed 0.1.768 vs recorded 0.1.723 was the live drift finding
 * the re-measure in receipts/wb-973.17.md cleared by re-pinning the carrier to 0.1.768; a later host move is a new live
 * finding, never a known-green claim. Spawns nothing and writes no fixture; launch the actual tier with forge run rf-preview.
 */
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { REACTIVE_FIBER_CONTRACT_SOURCE } from '../src/workbench/providers/reactivefiber.js';
import { judgeRfReleaseDrift, parseInstalledRfVersion, RF_LIVE_DRIFT_SHAPE_SUITE, RF_LIVE_DRIFT_TITLE, recordedRfRelease } from './helpers/rf-release-drift.js';

const PREVIEW_TEST = readFileSync(new URL('./workbench-native-rf-preview.test.ts', import.meta.url), 'utf8');
/** A sample recorded release for the pure comparison rows: the carrier's release before the wb-973.17 re-pin. */
const RECORDED = '0.1.723';
/** The carrier's recorded release since the wb-973.17 re-measure (receipts/wb-973.17.md, rf-preview at installed 0.1.768). */
const CARRIER_RECORDED = '0.1.768';

describe('SCG-R12 recorded release', () => {
  it('R12-1 the recorded release is the carrier release component, read from the carrier by identifier', () => {
    expect(recordedRfRelease()).toBe(CARRIER_RECORDED);
    expect(REACTIVE_FIBER_CONTRACT_SOURCE.startsWith(`rf@${recordedRfRelease()}:`)).toBe(true);
  });

  it('R12-2 a source that is not rf@<release>:<contract> is refused, never defaulted', () => {
    expect(recordedRfRelease('rf@1.2.3:reactive-fiber.cli/v1 context.render --no-commit')).toBe('1.2.3');
    for (const bad of ['', 'rf@:x', 'rf@abc:x', '0.1.723:x', 'rf@0.1.723', ' rf@0.1.723:x']) {
      expect(() => recordedRfRelease(bad), JSON.stringify(bad)).toThrow(/rf@<release>/);
    }
  });
});

describe('SCG-R12 drift verdict', () => {
  it('R12-3 installed and preview both equal to the recorded release is ok with no failures', () => {
    expect(judgeRfReleaseDrift({ recorded: RECORDED, installed: RECORDED, previewCliVersion: RECORDED })).toStrictEqual({ ok: true, failures: [] });
  });

  it('R12-4 an installed release that differs fails with one typed failure naming recorded vs installed', () => {
    const verdict = judgeRfReleaseDrift({ recorded: RECORDED, installed: '0.1.768', previewCliVersion: RECORDED });
    expect(verdict.ok).toBe(false);
    expect(verdict.failures).toStrictEqual(['installed rf --version result.version drifted: recorded 0.1.723 vs installed 0.1.768']);
  });

  it('R12-4b a release that merely starts with the recorded one still drifts (no prefix match)', () => {
    for (const prefixed of ['0.1.7231', '0.1.723.1', '0.1.723-rc1']) {
      const verdict = judgeRfReleaseDrift({ recorded: RECORDED, installed: prefixed, previewCliVersion: RECORDED });
      expect(verdict.failures, prefixed).toStrictEqual([`installed rf --version result.version drifted: recorded 0.1.723 vs installed ${prefixed}`]);
    }
  });

  it('R12-5 a preview provenance.cli_version that differs fails with one typed failure naming recorded vs preview', () => {
    const verdict = judgeRfReleaseDrift({ recorded: RECORDED, installed: RECORDED, previewCliVersion: '0.1.722' });
    expect(verdict.ok).toBe(false);
    expect(verdict.failures).toStrictEqual(['preview result.provenance.cli_version drifted: recorded 0.1.723 vs preview 0.1.722']);
  });

  it('R12-6 both differing fail twice, installed first', () => {
    const verdict = judgeRfReleaseDrift({ recorded: RECORDED, installed: '0.1.768', previewCliVersion: '0.1.769' });
    expect(verdict.failures).toHaveLength(2);
    expect(verdict.failures[0]).toContain('installed');
    expect(verdict.failures[1]).toContain('preview');
  });

  it('R12-7 an unreadable value is a failure, never a skip: undefined, null, number, empty string, object', () => {
    for (const unreadable of [undefined, null, 723, '', {}]) {
      const installed = judgeRfReleaseDrift({ recorded: RECORDED, installed: unreadable, previewCliVersion: RECORDED });
      expect(installed.ok, `installed ${JSON.stringify(unreadable)}`).toBe(false);
      expect(installed.failures).toStrictEqual(['installed rf --version result.version is not a non-empty string']);
      const preview = judgeRfReleaseDrift({ recorded: RECORDED, installed: RECORDED, previewCliVersion: unreadable });
      expect(preview.ok, `preview ${JSON.stringify(unreadable)}`).toBe(false);
      expect(preview.failures).toStrictEqual(['preview result.provenance.cli_version is not a non-empty string']);
    }
  });

  it('R12-8 a hostile value is named, never echoed (control characters, bidi marks, overlong text)', () => {
    const hostile = [`0.1.768${String.fromCodePoint(0x0a)}forged`, `0.1.768${String.fromCodePoint(0x202e)}`, 'x'.repeat(200)];
    for (const value of hostile) {
      const verdict = judgeRfReleaseDrift({ recorded: RECORDED, installed: value, previewCliVersion: RECORDED });
      expect(verdict.failures).toStrictEqual([`installed rf --version result.version drifted: recorded 0.1.723 vs installed <unrecognized>`]);
    }
  });

  it('R12-9 changing the recorded value without the installed one is red (negative control)', () => {
    expect(judgeRfReleaseDrift({ recorded: '0.1.724', installed: RECORDED, previewCliVersion: RECORDED }).ok).toBe(false);
  });
});

describe('SCG-R12 installed version reader', () => {
  it('R12-10 reads result.version from the envelope, or version from a bare body; anything else is undefined', () => {
    expect(parseInstalledRfVersion(JSON.stringify({ schema: 'reactive-fiber.cli/v1', ok: true, result: { version: '0.1.768' } }))).toBe('0.1.768');
    expect(parseInstalledRfVersion(JSON.stringify({ version: '0.1.768' }))).toBe('0.1.768');
    for (const bad of ['', 'not json', '[]', 'null', JSON.stringify({ result: {} }), JSON.stringify({ result: { version: 768 } })]) {
      expect(parseInstalledRfVersion(bad), JSON.stringify(bad)).toBeUndefined();
    }
  });
});

const LIVE_TITLE = RF_LIVE_DRIFT_TITLE;
const LIVE_HEAD = `it('${LIVE_TITLE}',async()=>{`;
const LIVE_GUARD = "if(!workspace) throw Error('WORKBENCH_RF_FIXTURE must name an initialized test workspace');";
const LIVE_START = PREVIEW_TEST.indexOf(LIVE_HEAD);
const LIVE_END = PREVIEW_TEST.indexOf('},60_000);', LIVE_START) + '},60_000);'.length;
const LIVE_ROW = PREVIEW_TEST.slice(LIVE_START, LIVE_END);

/** Literal frozen at base b01c197 plus the kept original cut 736415d; never derived from PREVIEW_TEST. */
const FROZEN_ROW = `it('SCG-R12 live drift guard: the installed rf version and the preview cli_version equal the release recorded in the contractSource carrier',async()=>{
  const workspace=process.env.WORKBENCH_RF_FIXTURE;
  if(!workspace) throw Error('WORKBENCH_RF_FIXTURE must name an initialized test workspace');
  const run=spawnSync('rf',['--json','--version'],{encoding:'utf8',timeout:10_000});
  const installed=run.error||run.status!==0?undefined:parseInstalledRfVersion(run.stdout);
  const reading=await nativeReactiveFiberPreview('claude-opus-5','Summarize workbench integration',workspace);
  const source=record(reading)?reading.source:undefined;
  const captured=record(source)&&record(source.result)?source.result:undefined;
  const provenance=captured!==undefined&&record(captured.provenance)?captured.provenance:{};
  const verdict=judgeRfReleaseDrift({recorded:recordedRfRelease(),installed,previewCliVersion:provenance.cli_version});
  process.stdout.write(\`\\nRF_RELEASE_DRIFT \${JSON.stringify({recorded:recordedRfRelease(),installed:stamp(installed),preview:stamp(provenance.cli_version),failures:verdict.failures.length})}\\n\`);
  expect(verdict.failures).toStrictEqual([]);
},60_000);`;
const FROZEN_IMPORTS = `import {spawnSync} from 'node:child_process';
import {describe,expect,it} from 'vitest';
import {nativeReactiveFiberPreview} from '../src/workbench/providers/reactivefiber.js';
import {judgeRfReleaseDrift,parseInstalledRfVersion,recordedRfRelease} from './helpers/rf-release-drift.js';`;

/** AST kinds retain operators/modifiers; literal values retain requirements, but comments/spacing/quote style do not. */
function shape(node: ts.Node): string {
  const children: string[] = [];
  ts.forEachChild(node, child => { children.push(shape(child)); });
  const value = ts.isIdentifier(node) || ts.isStringLiteralLike(node) || ts.isNumericLiteral(node) || ts.isRegularExpressionLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)
    ? node.text : '';
  const typeOnly = (ts.isImportClause(node) || ts.isImportSpecifier(node)) && node.isTypeOnly;
  return JSON.stringify([node.kind, value, typeOnly, children]);
}
function parse(text: string): ts.SourceFile {
  return ts.createSourceFile('rf-preview.ts', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
const EXPECTED_ROW = parse(FROZEN_ROW).statements[0];
const EXPECTED_IMPORTS = parse(FROZEN_IMPORTS).statements.map(shape);

/** A narrow closed AST roster: direct imported describe/title/zero-parameter block, direct it/title/frozen row. */
function judgePreviewShape(text: string): boolean {
  const sf = parse(text);
  // Compiler parse diagnostics refuse recovered malformed source; the compiler stores them on SourceFile.
  if ((sf as ts.SourceFile & { parseDiagnostics: readonly ts.Diagnostic[] }).parseDiagnostics.length !== 0) return false;
  const imports = sf.statements.filter(ts.isImportDeclaration).map(shape);
  if (!EXPECTED_IMPORTS.every(expected => imports.filter(actual => actual === expected).length === 1)) return false;
  const matches: ts.ExpressionStatement[] = [];
  for (const statement of sf.statements) {
    if (!ts.isExpressionStatement(statement) || !ts.isCallExpression(statement.expression)) continue;
    const suite = statement.expression;
    if (!ts.isIdentifier(suite.expression) || suite.expression.text !== 'describe' || suite.arguments.length !== 2) continue;
    const [title, callback] = suite.arguments;
    if (title === undefined || !ts.isStringLiteral(title) || title.text !== 'RF native context producer' || callback === undefined ||
      !ts.isArrowFunction(callback) || callback.parameters.length !== 0 || callback.modifiers !== undefined || !ts.isBlock(callback.body)) continue;
    for (const child of callback.body.statements) {
      if (!ts.isExpressionStatement(child) || !ts.isCallExpression(child.expression)) continue;
      const row = child.expression;
      const name = row.arguments[0];
      if (!ts.isIdentifier(row.expression) || row.expression.text !== 'it' || name === undefined ||
        !ts.isStringLiteral(name) || name.text !== LIVE_TITLE) continue;
      matches.push(child);
    }
  }
  return EXPECTED_ROW !== undefined && matches.length === 1 && matches[0] !== undefined && shape(matches[0]) === shape(EXPECTED_ROW);
}

describe(RF_LIVE_DRIFT_SHAPE_SUITE, () => {
  it('R12-11 the row and imports match the independent frozen AST at direct describe/it placement', () => {
    expect(judgePreviewShape(PREVIEW_TEST)).toBe(true);
  });
  it('R12-12 a missing workspace guard, renamed row, or commented string cannot satisfy the frozen AST', () => {
    expect(judgePreviewShape(PREVIEW_TEST.replace(LIVE_TITLE, 'changed title'))).toBe(false);
    expect(judgePreviewShape(PREVIEW_TEST.replace(LIVE_ROW, LIVE_ROW.replace(LIVE_GUARD, '')))).toBe(false);
    expect(judgePreviewShape(`const text = ${JSON.stringify(PREVIEW_TEST)};`)).toBe(false);
  });
});

/** Each refusal witness is constructed independently on an in-memory copy; no live binary, fixture or file write. */
const WITNESSES = [
  { id: 'W1', source: PREVIEW_TEST.replace(LIVE_HEAD, `it('${LIVE_TITLE}',{skip:true},async()=>{`) },
  { id: 'W2', source: PREVIEW_TEST.replace(LIVE_HEAD, `${LIVE_HEAD}return;`) },
  { id: 'W3', source: PREVIEW_TEST.replace(LIVE_ROW, `/*${LIVE_ROW}*/`) },
  { id: 'W4', source: PREVIEW_TEST.replace(LIVE_HEAD, `it('${LIVE_TITLE}',async({skip})=>{skip();`) },
  { id: 'W5', source: PREVIEW_TEST.replace(LIVE_HEAD, `it${'.'}${'fails'}('${LIVE_TITLE}',async()=>{`) },
  { id: 'W6', source: PREVIEW_TEST.replace('recorded:recordedRfRelease(),installed,', 'recorded:String(installed),installed,') },
  { id: 'W7', source: PREVIEW_TEST.replace(LIVE_ROW, `function uncalled(){${LIVE_ROW}}`) },
  { id: 'W8', source: PREVIEW_TEST.replace("describe('RF native context producer',()=>{", "describe('RF native context producer',{skip:true},()=>{") },
  { id: 'W9', source: PREVIEW_TEST.replace(LIVE_ROW, LIVE_ROW.replace(LIVE_GUARD, `if(!workspace) return;\n${LIVE_GUARD}`)) },
] as const;

describe('SCG-R12 gate-refusal wiring witnesses (U1-U3)', () => {
  it('R12-13 W1-W9 are nine distinct changes to the real source, not missing or identity transforms', () => {
    expect(WITNESSES.map(w => w.id)).toStrictEqual(['W1','W2','W3','W4','W5','W6','W7','W8','W9']);
    expect(LIVE_START).toBeGreaterThan(0);
    expect(LIVE_END).toBeGreaterThan(LIVE_START);
    expect(new Set(WITNESSES.map(w => w.source)).size).toBe(9);
    for (const witness of WITNESSES) expect(witness.source, witness.id).not.toBe(PREVIEW_TEST);
  });
  for (const witness of WITNESSES) {
    it(`R12-14 ${witness.id} altered registration, guard or recorded argument is refused`, () => {
      expect(judgePreviewShape(witness.source), witness.id).toBe(false);
    });
  }
  it('R12-15 FR1 a harmless comment mentioning the parking member is not a false red', () => {
    expect(judgePreviewShape(`${PREVIEW_TEST}\n// harmless documentation mentions ${'.'}${'skip'}\n`)).toBe(true);
  });
});

/** Rule 16 CT1/CT1b/CT2/CT3: complete row AST, including requirement/receipt labels, not merely the row count. */
describe('SCG-R12 frozen shape hollowing controls', () => {
  it('R12-16 CT1 deleting the drift assertion is refused', () => {
    expect(judgePreviewShape(PREVIEW_TEST.replace('expect(verdict.failures).toStrictEqual([]);', ''))).toBe(false);
  });
  it('R12-17 CT1b deleting the independent installed-version read is refused', () => {
    expect(judgePreviewShape(PREVIEW_TEST.replace(LIVE_ROW, LIVE_ROW.replace("const installed=run.error||run.status!==0?undefined:parseInstalledRfVersion(run.stdout);", 'const installed=undefined;')))).toBe(false);
  });
  it('R12-18 CT2 shortening a frozen requirement/receipt label is refused', () => {
    expect(judgePreviewShape(PREVIEW_TEST.replace('RF_RELEASE_DRIFT ', 'RF_ '))).toBe(false);
    expect(judgePreviewShape(PREVIEW_TEST.replace(LIVE_ROW, LIVE_ROW.replace('WORKBENCH_RF_FIXTURE must name an initialized test workspace', 'workspace')))).toBe(false);
  });
  it('R12-19 CT3 swapping the verdict assertion for an unrelated passing assertion is refused', () => {
    expect(judgePreviewShape(PREVIEW_TEST.replace('expect(verdict.failures).toStrictEqual([]);', 'expect([]).toStrictEqual([]);'))).toBe(false);
  });
});


describe('SCG-R12 closed AST roster controls', () => {
  it('R12-20 malformed source and duplicate registered copies are refused', () => {
    expect(judgePreviewShape(`${PREVIEW_TEST}\nconst broken = ;`)).toBe(false);
    expect(judgePreviewShape(PREVIEW_TEST.replace(LIVE_ROW, `${LIVE_ROW}\n${LIVE_ROW}`))).toBe(false);
  });
  it('R12-21 import bindings and module provenance are frozen, not just callee spellings', () => {
    expect(judgePreviewShape(PREVIEW_TEST.replace("from './helpers/rf-release-drift.js'", "from './helpers/unrelated.js'"))).toBe(false);
    expect(judgePreviewShape(PREVIEW_TEST.replace('import {describe,expect,it}', 'import type {describe,expect,it}'))).toBe(false);
    expect(judgePreviewShape(PREVIEW_TEST.replace('import {describe,expect,it}', 'import {describe,expect,test as it}'))).toBe(false);
  });
  it('R12-22 parking modifiers and context aliases are refused without scanning comments', () => {
    for (const member of ['skip','only','todo','fails','skipIf','runIf']) {
      expect(judgePreviewShape(PREVIEW_TEST.replace(LIVE_HEAD, `it${'.'}${member}('${LIVE_TITLE}',async()=>{`)), member).toBe(false);
      expect(judgePreviewShape(PREVIEW_TEST.replace("describe('RF native context producer',", `describe${'.'}${member}('RF native context producer',`)), member).toBe(false);
    }
    expect(judgePreviewShape(PREVIEW_TEST.replace(LIVE_HEAD, `it('${LIVE_TITLE}',async(ctx)=>{ctx['skip']();`))).toBe(false);
    expect(judgePreviewShape(PREVIEW_TEST.replace(LIVE_HEAD, `it('${LIVE_TITLE}',async({skip:park})=>{park();`))).toBe(false);
  });
});
