/** THE SAME VIEW's frame reader (wb-rv3o): the reader the evidence-tier standing census's THE SAME VIEW route (3) and route (4)
 * readings (wb-b9ot) need, carried by the rule-19 child its rulings bound (R-B270 filed wb-rv3o at wb-b9ot's refusal #3 with that
 * refusal's GP9 members; R-B286, the dependency inversion at refusal #4, folded refusal #4's GP18-PAREN members into it). wb-b9ot's
 * cut #4 (tip 808d5245, not on trunk) placed a raising frame by the TEXT of its Error.stack line: its firstFrame() and callerOf()
 * matched the line with a regular expression (callerOf took the text after the line's last '(') and its pinnedModuleAt() compared
 * that text with the pinned modules' file: URLs, so a frame whose code labelled its own location (a //# sourceURL on code built by
 * new Function or eval, a vm.Script filename) read as a pinned module's frame or as the expected caller's by that label.
 *
 * This reader does not read Error.stack's text. raised() and raisedAsync() record the call sites V8 hands Error.prepareStackTrace
 * when the stack of what a call throws is first formatted (the formatter they install hands each error on to the one in place
 * before it, and they put that one back), and each frame is judged by its call site:
 * - the PACKAGE'S (packageModuleOf()): its code is not eval or new Function code (isEval() false), its file (getFileName()) is the
 *   own file: URL under SDK_DIST of one of the 27 PACKAGE_MODULES, and its source's sha256 (getScriptHash()) is that module's pin;
 * - a KNOWN SCRIPT'S (knownScriptOf()): not eval code, with the file and source sha256 of a Script read from one of that script's
 *   own frames (scriptCalling());
 * - a BUILT-IN'S (isBuiltIn()): it names no file and no line, has no script sha256 and is not eval code (Array.map, JSON.parse);
 * - OTHER CODE: every other frame, written (frameText()) by its kind ('eval' when isEval(), else 'script'), its function and the
 *   location its code names for itself (getScriptNameOrSourceURL(), else its eval origin) with its line and column, the
 *   repository root's path in that text written as <root>/ (rooted()).
 * framesOf() reads a raise as its frames from the first through the CALLER, the first frame that is neither the package's nor a
 * built-in's, each written by frameText(). What test/workbench-hyperunix-same-view-frames-census.test.ts pins of these rules is
 * what is claimed of them; this text claims nothing beyond that census. Display paths added: none (test-only). */
import {fileURLToPath} from 'node:url';
import type {ClaimBody, QueryResult} from '@hyperunix/sdk';
import type {CapabilityProvider, CapabilityRegistry, InvocationContext} from '../../src/workbench/capability-registry.js';
import type {HyperUnixReader} from '../../src/workbench/providers/hyperunix.js';

/** The 27 modules the installed @hyperunix/sdk ships (every .js file under its dist/ directory), by their paths from there, each with
 * the sha256 of its installed bytes at the cut (the census's SHAPE holds the listing and the bytes to them). A frame is the
 * package's only at one of them. */
export const PACKAGE_MODULES: Readonly<Record<string, string>> = {
  'bounds.js': '35ebefcb288d264894b6934f6f2ad73d97616867011409c8fb949a3b215de2be',
  'client.js': '5fdf749906cc142f5a9f433fde1f6a1e49eb166cc68d71704fd186d6d389735a',
  'compatibility.js': '83aecc50279a7f79bb378048049374651d4caf12f7605f3b0791fdcd46b1eb26',
  'discovery.js': '7991fc11345a6f23c809ab2608605b95d8d968f835a13e50a90ea86db082f102',
  'errors.js': '3be2b35fa0db6997bdacb6b7fdef6d084f47387b0426151c20de26cd71b87961',
  'execution.js': 'f5cccf210a06c3b82a49928952d6c334203e15f25625bfa106ebcd0197087866',
  'ids.js': '3a257cb11f92a3836526f5401c44237ed19ada220c768e3fb57dc22f18c41714',
  'index.js': '14ea00c42a5145baa8abc5ddcc1b06f700308ac8ff93b1064f27aa89c7dc65c7',
  'mutation.js': 'ef75185fa9f1f221dbe159a51eff5323548fb0cd610d2fd9cbf8e520e27be281',
  'named_query.js': 'aa9382589e05d31538e8316b5064553489e42ebf0d573bd5fd2142b094e1f8aa',
  'plan-stream.js': '295f312d0b7c0961b85d3719bca3978c32f631ac02aa2e8e06c1c36bf1ac873e',
  'plan.js': '4044d0e2e2b0007e7c5547224685a76486f2235a0a16c5268cc0df8eb49f1f72',
  'predicate.js': 'a99562f10120cc6ea7c9635b01059445256081071ab6135e9c0bade9418462ab',
  'protocol.js': 'c90cf50543522b73b83b10bbd262ad70d3f99f452a2fb7682fb6827fec5220d3',
  'protocol/decoder.js': 'b6dacd7f97d27461c97dee041ce86e8084ba250894d144b6c4b3d2d0fa8861c6',
  'protocol/hxq.js': '77f84d8d9f68d6904f799758cf9fec66ae48510d5f0ea2ac8502fc7805e7969a',
  'protocol/mutation.js': '6944afeaeb2e675f5af42e50f41e387e802f6f59f2c90bd9f88dc300f896c6d4',
  'protocol/query.js': '9178b01aaced7ea41aaf58e80db1a8aaf076584c92fdc81d0a3b76283ee58809',
  'protocol/values.js': 'e6c443deac916094d7c32007409fd5df350dceb752baeb07e28ec086b121f13e',
  'provider.js': '827089fb9e254986526269049e78f54731cd353b1190ac617f9aa8d5e1ae88ba',
  'query.js': '9371dae1d62cb33ab32e39fda5ef0eab096f3a4e68c8006ffa8fa016a59ef667',
  'result.js': '0ff1edc8b7e69929736b171ee464a304220b6bf13e1c98335e8e7976a64428c3',
  'schema.js': '415f5050b7e07b1de033a7b194ac4e7e85b5fa463269900797dc578ac48fa14f',
  'structural-query.js': '1c405614e250b11fff16130fa6478f91d555684b4882c1d679b026a676f15f79',
  'transport/cli.js': '3828136894cdd38438f2583c76d0110bf72da69d1a73c5491d5ac3bea9a8b838',
  'view.js': '38ba35a3e278ae57adf1079a8e578dbaf53de435c1bbd9aa327db38ef47fefcb',
  'workspace.js': '9e81be3b3217d598eb8630c64f3fcb7416ff763dac8c55bd497142471626a641',
};
/** The dist/ directory Node resolves '@hyperunix/sdk' to from this helper's directory (test/helpers/). */
export const SDK_DIST = new URL('./', import.meta.resolve('@hyperunix/sdk'));
/** The repository root: the directory test/ sits in. */
export const ROOT = new URL('../../', import.meta.url);
const ROOT_PATH = fileURLToPath(ROOT);

/** A known script: a name, and the file and source sha256 V8 records for its code (read from one of its own frames). */
export type Script = {readonly name: string; readonly file: string; readonly hash: string};
/** What a call threw, with the call sites V8 handed the stack formatter for it, or none when it threw no Error or this reader saw
 * none; or that it returned. */
export type Raised = {readonly threw: true; readonly error: unknown; readonly sites: readonly NodeJS.CallSite[] | undefined} | {readonly threw: false};
type Formatter = (error: Error, sites: NodeJS.CallSite[]) => unknown;

/** Installs a stack formatter that records the call sites V8 hands it for each error it formats, then hands the error and its call
 * sites on to the formatter in place before it or, when none is, writes the error and its call sites one per line. Returns the
 * restore, which puts the formatter in place before it back. */
function recordSites(recorded: WeakMap<object, readonly NodeJS.CallSite[]>): () => void {
  const prior: Formatter | undefined = Error.prepareStackTrace;
  Error.prepareStackTrace = (error: Error, sites: NodeJS.CallSite[]): unknown => {
    recorded.set(error, sites);
    return prior === undefined ? `${String(error)}${sites.map(site => `\n    at ${String(site)}`).join('')}` : prior(error, sites);
  };
  return () => {
    if (prior === undefined) Reflect.deleteProperty(Error, 'prepareStackTrace');
    else Error.prepareStackTrace = prior;
  };
}
/** The call sites recorded for what a call threw: its stack is read here first if the call did not read it (the first formatting
 * hands them over). */
function sitesOf(error: unknown, recorded: WeakMap<object, readonly NodeJS.CallSite[]>): readonly NodeJS.CallSite[] | undefined {
  if (!(error instanceof Error) || typeof error.stack !== 'string') return undefined;
  return recorded.get(error);
}
/** Runs a call, recording the call sites of what it throws. */
export function raised(call: () => unknown): Raised {
  const recorded = new WeakMap<object, readonly NodeJS.CallSite[]>();
  const restore = recordSites(recorded);
  try {
    call();
    return {threw: false};
  } catch (error) {
    return {threw: true, error, sites: sitesOf(error, recorded)};
  } finally {
    restore();
  }
}
/** Runs an asynchronous call, recording the call sites of what it rejects with (the formatter stays installed until it settles). */
export async function raisedAsync(call: () => Promise<unknown>): Promise<Raised> {
  const recorded = new WeakMap<object, readonly NodeJS.CallSite[]>();
  const restore = recordSites(recorded);
  try {
    await call();
    return {threw: false};
  } catch (error) {
    return {threw: true, error, sites: sitesOf(error, recorded)};
  } finally {
    restore();
  }
}
/** The script of the frame that calls fn (Error.captureStackTrace leaves out fn's call and every frame above it), named. A frame of
 * code built by eval or new Function names no file a script can be held to, so it reads as the file 'eval'. */
export function scriptCalling(fn: (...args: never[]) => unknown, name: string): Script {
  const recorded = new WeakMap<object, readonly NodeJS.CallSite[]>();
  const holder: {stack?: string} = {};
  const restore = recordSites(recorded);
  try {
    Error.captureStackTrace(holder, fn);
    if (typeof holder.stack !== 'string') return {name, file: 'no stack', hash: ''};
  } finally {
    restore();
  }
  const site = recorded.get(holder)?.[0];
  if (site === undefined) return {name, file: 'no frame', hash: ''};
  return {name, file: site.isEval() ? 'eval' : (site.getFileName() ?? 'no file'), hash: site.getScriptHash()};
}

/** The pinned module a frame's code is, by its path from SDK_DIST: the code is not eval code (isEval() false), its file is that
 * module's own file: URL under SDK_DIST and its source sha256 is that module's PACKAGE_MODULES pin; else none. */
export function packageModuleOf(site: NodeJS.CallSite): string | undefined {
  if (site.isEval()) return undefined;
  const file = site.getFileName();
  const hash = site.getScriptHash();
  return Object.keys(PACKAGE_MODULES).find(module => new URL(module, SDK_DIST).href === file && PACKAGE_MODULES[module] === hash);
}
/** A built-in's frame: it names no file and no line, has no script and is not eval code. */
export const isBuiltIn = (site: NodeJS.CallSite): boolean =>
  site.getFileName() === null && site.getLineNumber() === null && site.getScriptHash() === '' && !site.isEval();
/** The known script a frame's code is: the code is not eval code (isEval() false), and its file and source sha256 are that script's. */
export const knownScriptOf = (site: NodeJS.CallSite, scripts: readonly Script[]): Script | undefined =>
  site.isEval() ? undefined : scripts.find(script => script.file === site.getFileName() && script.hash === site.getScriptHash());
/** A text with the repository root's path in it written as <root>/ (a file: URL keeps its scheme: file://<root>/...). */
export const rooted = (text: string): string => text.split(ROOT_PATH).join('<root>/');
/** A frame's function as V8 names it, after its receiver's type when it is called as a method (StreamChecker.fail). */
function functionOf(site: NodeJS.CallSite): string {
  const name = site.getFunctionName() ?? '<anonymous>';
  const type = site.getTypeName();
  return type !== null && site.getMethodName() !== null ? `${type}.${name}` : name;
}
/** A frame as this reader writes it: the package's as its function and module:line:column; a built-in's as its function and
 * 'built-in'; a known script's as that script's name; other code as its kind (eval or script), its function and the location its
 * code names for itself (rooted()) with its line and column. */
export function frameText(site: NodeJS.CallSite, scripts: readonly Script[]): string {
  const module = packageModuleOf(site);
  if (module !== undefined) return `${functionOf(site)} ${module}:${site.getLineNumber()}:${site.getColumnNumber()}`;
  if (isBuiltIn(site)) return `${functionOf(site)} built-in`;
  const known = knownScriptOf(site, scripts);
  if (known !== undefined) return known.name;
  const location = site.getScriptNameOrSourceURL() ?? site.getEvalOrigin() ?? 'no location';
  return `${site.isEval() ? 'eval' : 'script'} ${functionOf(site)} ${rooted(location)}:${site.getLineNumber()}:${site.getColumnNumber()}`;
}
/** A raise as this reader reads it: its frames (frameText) from the first through the caller, the first frame that is neither the
 * package's nor a built-in's; 'no caller frame' after them when every frame is one of those. 'no call sites' when the call threw no
 * Error or no call sites were recorded for it, and 'no throw' when it returned. */
export function framesOf(raise: Raised, scripts: readonly Script[]): string[] {
  if (!raise.threw) return ['no throw'];
  if (raise.sites === undefined || raise.sites.length === 0) return ['no call sites'];
  const frames: string[] = [];
  for (const site of raise.sites) {
    frames.push(frameText(site, scripts));
    if (packageModuleOf(site) === undefined && !isBuiltIn(site)) return frames;
  }
  return [...frames, 'no caller frame'];
}

/** The reader a stand-in hands a hyperunix.find registration: its find resolves to null (no result), so the provider's invoke hands
 * null to what it calls next. */
const NULL_READER: HyperUnixReader = {find: async () => null as unknown as QueryResult<ClaimBody>,
  runtime: async () => ({version: '0.1.0', binarySha256: '0'.repeat(64)}), close: async () => {}};
/** A hyperunix.find registration: the provider's registerHyperUnixFind, or a stand-in of its form. */
export type RegisterFind = (registry: CapabilityRegistry, reader: HyperUnixReader, workspaceRoot: string) => void;
/** A registration read under a registry stand-in that keeps what is registered: the script of the frame that calls the stand-in's
 * register (the registration's own code, named), how many providers it registers, and how its one provider's invoke raises when its
 * reader hands it a null result (framesOf over the given scripts and that script). The registry is a stand-in because a real one
 * reports a provider's failure as its own. */
export async function registrationRead(register: RegisterFind, name: string, scripts: readonly Script[]):
  Promise<{readonly script: Script; readonly registered: number; readonly frames: string[]}> {
  const registered: CapabilityProvider[] = [];
  let script: Script = {name, file: 'not registered', hash: ''};
  const capture = {register(provider: CapabilityProvider): void {
    registered.push(provider);
    script = scriptCalling(capture.register, name);
  }};
  register(capture as unknown as CapabilityRegistry, NULL_READER, '/srv/hx-same-view-ws');
  const context: InvocationContext = {grants: ['hyperunix:read'], signal: new AbortController().signal};
  const provider = registered[0];
  const frames = registered.length !== 1 || provider === undefined ? [`registered ${registered.length}`]
    : framesOf(await raisedAsync(() => provider.invoke({kind: 'hx.fs/regular-file', root: 'src'}, context)), [...scripts, script]);
  return {script, registered: registered.length, frames};
}
