// wb-0kg.4 (VC-7 / W18-D): Furnace Work retry while child Run establishment is uncertain -- FIXTURE-tier receipt runner.
// Measures the five journeys of test/helpers/furnace-hosted-retry-journeys.ts (the same journeys the default gate
// asserts in test/workbench-furnace-hosted-retry-fault.test.ts) through the BUILT wb-zmd adapter (dist) and the SHIPPED
// vendored @furnace/sdk that adapter loads (its SHIPPED_FURNACE_SDK; wb-zby.2: no copy, no manifest rewrite). The
// receipt's sdk record is the journeys helper's shippedSdkRecord(): copy "shipped" with the installed package's manifest
// and provenance digests, the record the default-gate tier hands the same judge. The journeys helper is erasable
// TypeScript with type-only project imports, which node loads through its built-in type stripping (engines.node >= 24).
// Every retry is the scripted operator path; no Furnace binary, no live Run, no Furnace verb, no furnace doctor or probe.
// The host socket lives under chooseScratchBase(): XDG_RUNTIME_DIR first, /tmp only as the recorded fallback.
// Exit 0 = realised and clean, 1 = realised with findings, 2 = not realised, 3 = the receipt was printed but could not
// be written to $FURNACE_HOSTED_RETRY_FAULT_RECEIPT. The receipt is ONE JSON line on stdout, printed BEFORE any write.
// Bind it to a commit by running from a clean committed tree after `npm run build` (revision and revisionClean say so).
import {execFileSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {buildRetryFaultReceipt, exitCodeFor, RETRY_FAULT_JOURNEYS} from './furnace-hosted-retry-fault-receipt.mjs';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const diagnostics = [];
const journeys = {};
let sdk = null;
let scratch = null;
const message = error => (error instanceof Error ? error.message : String(error));

function git(args) {
  return execFileSync('git', args, {cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim();
}
function revision() {
  try {
    const head = git(['rev-parse', 'HEAD']);
    return /^[0-9a-f]{7,64}$/.test(head) ? head : 'working-tree';
  } catch {
    return 'working-tree';
  }
}
function revisionClean() {
  try {
    return git(['status', '--porcelain']) === '';
  } catch {
    return null;
  }
}

function emit() {
  const receipt = buildRetryFaultReceipt({
    utc: new Date().toISOString(),
    revision: revision(),
    revisionClean: revisionClean(),
    node: process.version,
    arch: process.arch,
    platform: process.platform,
    sdk,
    scratch,
    journeys,
    diagnostics,
  });
  const line = JSON.stringify(receipt);
  console.log(line);
  const target = process.env.FURNACE_HOSTED_RETRY_FAULT_RECEIPT;
  if (target) {
    try {
      writeFileSync(target, `${line}\n`);
    } catch (error) {
      console.error(`furnace-hosted-retry-fault: the receipt is printed above; writing it to $FURNACE_HOSTED_RETRY_FAULT_RECEIPT failed: ${message(error)}`);
      return 3;
    }
  }
  return exitCodeFor(receipt);
}

let adapter;
let registry;
let journeyModule;
try {
  adapter = await import('../../dist/workbench/hosts/furnace-hosted.js');
  registry = await import('../../dist/workbench/capability-registry.js');
  journeyModule = await import('../../test/helpers/furnace-hosted-retry-journeys.ts');
} catch (error) {
  diagnostics.push(`not realised: ${message(error)} (run npm run build first; node >= 24 strips the journeys helper's types)`);
}
if (!journeyModule) process.exit(emit());

let code = 2;
try {
  scratch = journeyModule.chooseScratchBase(process.env);
  sdk = journeyModule.shippedSdkRecord();
  const env = {Executor: adapter.FurnaceHostedExecutor, CapabilityError: registry.CapabilityError, sdk: adapter.SHIPPED_FURNACE_SDK, scratchBase: scratch.path};
  for (const name of RETRY_FAULT_JOURNEYS) {
    const run = journeyModule.RETRY_FAULT_JOURNEY_RUNNERS[name];
    if (typeof run !== 'function') {
      diagnostics.push(`${name}: the journeys helper has no runner for it`);
      continue;
    }
    try {
      journeys[name] = await run(env);
    } catch (error) {
      diagnostics.push(`${name}: measurement error: ${message(error)}`);
    }
  }
} catch (error) {
  diagnostics.push(`measurement error: ${message(error)}`);
} finally {
  code = emit();
}
process.exit(code);
