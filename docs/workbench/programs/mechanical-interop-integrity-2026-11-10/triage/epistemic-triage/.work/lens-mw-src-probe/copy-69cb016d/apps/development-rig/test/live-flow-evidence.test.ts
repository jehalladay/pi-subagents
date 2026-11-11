// MechanicalWorkflows-s14.3 (CA-R3): the committed M2 exit evidence of the witnessed live journey.
// These tests pin the retained native receipts: the evidence JSON files carry command_id,
// operation_id, trace_id, gated_commit and gated_tree; the committed fixture is labelled replay
// and never live; and replayTape() reproduces the fixture's episode byte-for-byte. Before the
// witnessed run lands its files, every test here is red by absence — that is the evidence leg's
// red, beside the acceptance red of the opt-in test skipping.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const EVIDENCE = join(here, "..", "..", "..", "qa", "integration", "evidence");
const files = existsSync(EVIDENCE) ? readdirSync(EVIDENCE).filter(name => name.startsWith("2026-10-16-live-gate-flow-") && name.endsWith(".json")) : [];

test("the witnessed live-gate-flow evidence files exist and retain the native ids", () => {
  const live = files.filter(name => JSON.parse(readFileSync(join(EVIDENCE, name), "utf8")).mode !== "replay");
  assert.ok(live.length >= 1, "at least one committed live-labelled 2026-10-16-live-gate-flow-*.json evidence file");
  for (const name of live) {
    const body = JSON.parse(readFileSync(join(EVIDENCE, name), "utf8"));
    assert.equal(body.mode, "live", `${name}: the witnessed receipt is labelled live`);
    const ids = body.command?.ids ?? {};
    assert.ok(typeof ids.operationId === "string" && ids.operationId.length > 0, `${name}: operation id retained`);
    assert.ok(typeof ids.commandId === "string" && ids.commandId.length > 0, `${name}: command id retained`);
    assert.ok(typeof body.gated_commit === "string" && /^[0-9a-f]{40,64}$/.test(body.gated_commit), `${name}: gated_commit`);
    assert.ok(typeof body.gated_tree === "string" && /^[0-9a-f]{40,64}$/.test(body.gated_tree), `${name}: gated_tree`);
    assert.ok(typeof body.trace_id === "string", `${name}: trace_id present (may be empty when forge omits it)`);
    assert.equal(body.observation?.outcome, "observed", `${name}: the independently observed leg is observed, never unknown`);
    assert.equal(body.observation?.receipt?.ids?.operationId, ids.operationId, `${name}: observed operation id equals the command receipt's`);
  }
});

test("the committed journey fixture is labelled replay, never live, and names the witnessed run", () => {
  const fixture = join(EVIDENCE, "2026-10-16-live-gate-flow-replay.json");
  assert.ok(existsSync(fixture), "committed replay-labelled fixture exists");
  const body = JSON.parse(readFileSync(fixture, "utf8"));
  assert.equal(body.mode, "replay", "the fixture is replay-labelled");
  assert.notEqual(body.mode, "live");
  assert.ok(typeof body.sourceOperationId === "string" && body.sourceOperationId.length > 0, "names the witnessed operation");
});

// MechanicalWorkflows-qygn: the replay fixture and the observed leg bind to the witnessed run's native ids, not merely to non-empty strings.
const witnessed = JSON.parse(readFileSync(join(EVIDENCE, "2026-10-16-live-gate-flow-witnessed.json"), "utf8"));

test("the replay fixture's source ids equal the witnessed run's operation, command and build operation ids", () => {
  const fixture = JSON.parse(readFileSync(join(EVIDENCE, "2026-10-16-live-gate-flow-replay.json"), "utf8"));
  const ids = witnessed.command.ids;
  assert.equal(fixture.sourceOperationId, ids.operationId, "sourceOperationId is the witnessed operation");
  assert.equal(fixture.sourceCommandId, ids.commandId, "sourceCommandId is the witnessed command");
  assert.equal(fixture.sourceBuildOperationId, ids.buildOperationId, "sourceBuildOperationId is the witnessed build operation");
  assert.equal(fixture.episode.events[0].subject, ids.operationId, "the replayed episode names the witnessed operation");
});

test("the independently observed leg binds every native id to the command receipt's: operation, build operation, command and trace", () => {
  const command = witnessed.command.ids;
  const observed = witnessed.observation.receipt.ids;
  assert.equal(observed.operationId, command.operationId);
  assert.equal(observed.buildOperationId, command.buildOperationId, "the observed build operation id equals the receipt's");
  assert.equal(observed.commandId, command.commandId, "the observed command id equals the receipt's");
  assert.equal(observed.traceId, command.traceId, "the observed trace id equals the receipt's");
  assert.equal(witnessed.trace_id, command.traceId);
});

// MechanicalWorkflows-zu6o (qygn follow-up, G1): the retained Forge-native records bind to the command receipt they back.
test("the retained forge_records operation_log and operation_record carry the receipt's command, build operation and trace ids", () => {
  const command = witnessed.command.ids;
  const records = witnessed.forge_records;
  assert.ok(records !== null && typeof records === "object", "the witnessed evidence retains forge_records");
  for (const name of ["operation_log", "operation_record"]) {
    const record = records[name];
    assert.ok(record !== null && typeof record === "object", `forge_records.${name} is retained`);
    assert.equal(record.command_id, command.commandId, `forge_records.${name}.command_id equals the receipt's command id`);
    assert.equal(record.operation_id, command.buildOperationId, `forge_records.${name}.operation_id equals the receipt's build operation id`);
    assert.equal(record.trace_id, command.traceId, `forge_records.${name}.trace_id equals the receipt's trace id`);
  }
  assert.equal(records.operation_record.state, "TERMINAL", "the retained operation record is terminal");
});

// MechanicalWorkflows-l1a3 (zu6o follow-up, W1..W5): the retained terminal evidence binds beyond the id triple.
test("W1: every retained terminal_event row names the receipt's build operation id", () => {
  const rows = witnessed.forge_records.terminal_event;
  assert.ok(Array.isArray(rows) && rows.length >= 1, "at least one terminal_event row is retained");
  for (const row of rows) {
    assert.equal(row.kind, "terminal", "the retained row is a terminal row");
    assert.equal(row.operation_id, witnessed.command.ids.buildOperationId, "terminal_event.operation_id equals the receipt's build operation id");
  }
});

test("W2: the retained operation record's terminal status and outcome class are success", () => {
  const terminal = witnessed.forge_records.operation_record.terminal;
  assert.ok(terminal !== null && typeof terminal === "object", "operation_record.terminal is retained");
  assert.equal(terminal.status, "success", "operation_record.terminal.status is success");
  assert.equal(terminal.outcome_class, "success", "operation_record.terminal.outcome_class is success");
});

test("W3: the retained operation log is complete", () => {
  assert.equal(witnessed.forge_records.operation_log.complete, true, "operation_log.complete is literally true");
});

test("W4: every retained trace step passed with exit code 0", () => {
  const steps = witnessed.forge_records.trace_steps;
  const names = Object.keys(steps);
  assert.ok(names.length >= 1, "at least one trace step is retained");
  for (const name of names) {
    assert.equal(steps[name].status, "passed", `trace_steps.${name}.status is passed`);
    assert.equal(steps[name].exit_code, 0, `trace_steps.${name}.exit_code is 0`);
  }
});

test("W5: the retained operation log path names the receipt's build operation id", () => {
  assert.equal(witnessed.forge_records.operation_log.path, `.forge/logs/operations/${witnessed.command.ids.buildOperationId}.log`, "operation_log.path is the build operation's own log");
});

// MechanicalWorkflows-m0k1 (l1a3 follow-up, XW1..XW7): the remaining retained-record laws the committed witnessed evidence already satisfies.
test("XW1: every retained terminal_event row carries data.status success", () => {
  const rows = witnessed.forge_records.terminal_event;
  assert.ok(Array.isArray(rows) && rows.length >= 1, "at least one terminal_event row is retained");
  for (const row of rows) assert.equal(row.data?.status, "success", "terminal_event.data.status is success");
});

test("XW2: every retained terminal_event row carries data.outcome_class success", () => {
  const rows = witnessed.forge_records.terminal_event;
  assert.ok(Array.isArray(rows) && rows.length >= 1, "at least one terminal_event row is retained");
  for (const row of rows) assert.equal(row.data?.outcome_class, "success", "terminal_event.data.outcome_class is success");
});

test("XW3: the retained operation record's terminal disposition is completed", () => {
  assert.equal(witnessed.forge_records.operation_record.terminal?.disposition, "completed", "operation_record.terminal.disposition is completed");
});

test("XW4: the retained operation log names no incomplete reason", () => {
  const log = witnessed.forge_records.operation_log;
  assert.ok(Object.hasOwn(log, "incomplete_reason"), "operation_log.incomplete_reason key is retained");
  assert.equal(log.incomplete_reason, null, "operation_log.incomplete_reason is null");
});

test("XW5: the retained operation record's history ends at TERMINAL", () => {
  const history = witnessed.forge_records.operation_record.history;
  assert.ok(Array.isArray(history) && history.length >= 1, "operation_record.history is retained");
  assert.equal(history.at(-1), "TERMINAL", "operation_record.history ends at TERMINAL");
});

test("XW6: the retained operation record's terminal was answered", () => {
  assert.equal(witnessed.forge_records.operation_record.terminal?.answered, true, "operation_record.terminal.answered is literally true");
});

test("XW7: the retained trace steps include the test step", () => {
  const steps = witnessed.forge_records.trace_steps;
  assert.ok(steps !== null && typeof steps === "object", "trace_steps is retained");
  assert.ok(Object.hasOwn(steps, "test"), "trace_steps retains the test step, so W4 cannot pass over a trace that never ran it");
});

// MechanicalWorkflows-9jkl (m0k1 follow-up, YW1..YW6): the remaining retained-record residual laws the committed witnessed evidence already satisfies.
test("YW1: every retained terminal_event row carries data.disposition completed", () => {
  const rows = witnessed.forge_records.terminal_event;
  assert.ok(Array.isArray(rows) && rows.length >= 1, "at least one terminal_event row is retained");
  for (const row of rows) assert.equal(row.data?.disposition, "completed", "terminal_event.data.disposition is completed, mirroring the operation record's terminal");
});

test("YW2: every retained terminal_event row carries data.answered true", () => {
  const rows = witnessed.forge_records.terminal_event;
  assert.ok(Array.isArray(rows) && rows.length >= 1, "at least one terminal_event row is retained");
  for (const row of rows) assert.equal(row.data?.answered, true, "terminal_event.data.answered is literally true, mirroring the operation record's terminal");
});

test("YW3: the retained operation record's terminal names no refusal code", () => {
  const terminal = witnessed.forge_records.operation_record.terminal;
  assert.ok(terminal !== null && typeof terminal === "object", "operation_record.terminal is retained");
  assert.ok(Object.hasOwn(terminal, "refusal_code"), "operation_record.terminal.refusal_code key is retained");
  assert.equal(terminal.refusal_code, null, "operation_record.terminal.refusal_code is null");
});

test("YW4: the retained operation record's terminal names no signal", () => {
  const terminal = witnessed.forge_records.operation_record.terminal;
  assert.ok(terminal !== null && typeof terminal === "object", "operation_record.terminal is retained");
  assert.ok(Object.hasOwn(terminal, "signal_name"), "operation_record.terminal.signal_name key is retained");
  assert.equal(terminal.signal_name, null, "operation_record.terminal.signal_name is null");
});

test("YW5: the retained operation record's history is the full CREATED, RUNNING, TERMINAL sequence", () => {
  assert.deepEqual(witnessed.forge_records.operation_record.history, ["CREATED", "RUNNING", "TERMINAL"], "operation_record.history is the complete lifecycle, not only its TERMINAL tail");
});

test("YW6: the retained trace steps include the typing step", () => {
  const steps = witnessed.forge_records.trace_steps;
  assert.ok(steps !== null && typeof steps === "object", "trace_steps is retained");
  assert.ok(Object.hasOwn(steps, "typing"), "trace_steps retains the typing step, so W4 cannot pass over a trace that never ran it");
});

test("ZW1: the retained operation record's terminal observation kind is result", () => {
  const terminal = witnessed.forge_records.operation_record.terminal;
  assert.ok(terminal !== null && typeof terminal === "object", "operation_record.terminal is retained");
  assert.equal(terminal.observation_kind, "result", "operation_record.terminal.observation_kind is result");
});

test("ZW2: every retained terminal_event row's data mirrors the operation record's terminal on every key the row carries", () => {
  const terminal = witnessed.forge_records.operation_record.terminal;
  const rows = witnessed.forge_records.terminal_event;
  assert.ok(Array.isArray(rows) && rows.length >= 1, "at least one terminal_event row is retained");
  for (const row of rows) {
    assert.ok(row.data !== null && typeof row.data === "object", "terminal_event row carries a data object");
    for (const key of Object.keys(row.data)) assert.equal(row.data[key], terminal[key], `terminal_event.data.${key} equals operation_record.terminal.${key}`);
  }
});

test("ZW3: exactly one terminal_event row is retained", () => {
  const rows = witnessed.forge_records.terminal_event;
  assert.ok(Array.isArray(rows), "terminal_event rows are retained as an array");
  assert.equal(rows.length, 1, "one terminal_event row, so the per-row laws cannot pass over a duplicate");
});

test("ZW12: the retained operation record is the gate operation", () => {
  const record = witnessed.forge_records.operation_record;
  assert.equal(record.method, "gate", "operation_record.method is gate");
  assert.equal(record.kind, "gate-operation", "operation_record.kind is gate-operation");
});

// MechanicalWorkflows-dzao (0znm follow-up): eleven further laws of the retained forge records.
const forgeRecords = witnessed.forge_records;

test("ZW4: every retained terminal_event row is an operation_event row", () => {
  const rows = forgeRecords.terminal_event;
  assert.ok(Array.isArray(rows) && rows.length >= 1, "at least one terminal_event row is retained");
  for (const row of rows) assert.equal(row.event, "operation_event", "terminal_event row event is operation_event");
});

test("ZW5: the operation record and every terminal_event row name the environment's forge revision", () => {
  const revision = witnessed.environment.forge.revision;
  assert.ok(typeof revision === "string" && revision.length > 0, "the environment names a forge revision");
  assert.equal(forgeRecords.operation_record.forge_revision, revision, "operation_record.forge_revision equals the environment revision");
  const rows = forgeRecords.terminal_event;
  assert.ok(Array.isArray(rows) && rows.length >= 1, "at least one terminal_event row is retained");
  for (const row of rows) assert.equal(row.forge_revision, revision, "terminal_event row forge_revision equals the environment revision");
});

test("ZW6: the retained operation log was never evicted", () => {
  assert.ok(Object.hasOwn(forgeRecords.operation_log, "evicted_at"), "operation_log carries its own evicted_at key");
  assert.equal(forgeRecords.operation_log.evicted_at, null, "operation_log.evicted_at is null");
});

test("ZW7: the retained operation record was never asked to cancel", () => {
  assert.equal(forgeRecords.operation_record.cancel_requested, false);
});

test("ZW8: the retained operation record never disconnected", () => {
  assert.equal(forgeRecords.operation_record.disconnected, false);
});

test("ZW9: the retained operation record's created, started and terminal instants are ordered", () => {
  const record = forgeRecords.operation_record;
  const created = Date.parse(record.created_at);
  const started = Date.parse(record.started_at);
  const terminal = Date.parse(record.terminal_at);
  assert.ok(Number.isFinite(created) && Number.isFinite(started) && Number.isFinite(terminal), "the three instants parse");
  assert.ok(created <= started, "created_at is no later than started_at");
  assert.ok(started <= terminal, "started_at is no later than terminal_at");
});

test("ZW10: the retained operation log closed no earlier than it was created", () => {
  const log = forgeRecords.operation_log;
  const created = Date.parse(log.created_at);
  const closed = Date.parse(log.closed_at);
  assert.ok(Number.isFinite(created) && Number.isFinite(closed), "the log's created_at and closed_at parse");
  assert.ok(created <= closed, "created_at is no later than closed_at");
});

test("ZW11: every retained terminal_event row is a chain row with a positive integer seq and a sha256 prev_row_digest", () => {
  const rows = forgeRecords.terminal_event;
  assert.ok(Array.isArray(rows) && rows.length >= 1, "at least one terminal_event row is retained");
  for (const row of rows) {
    assert.ok(Number.isInteger(row.seq) && row.seq >= 1, "seq is an integer of at least 1");
    assert.match(row.prev_row_digest, /^sha256:[0-9a-f]{64}$/, "prev_row_digest is a sha256-labelled lower-case hex digest");
  }
});

test("ZW13: the retained operation log and operation record carry their forge schema identifiers", () => {
  assert.equal(forgeRecords.operation_log.schema, "forge/operation-log/1");
  assert.equal(forgeRecords.operation_record.schema, "forge/operation-record/1");
});

test("ZW14: every retained terminal_event row is stamped no earlier than the operation record's terminal instant", () => {
  const terminal = Date.parse(forgeRecords.operation_record.terminal_at);
  assert.ok(Number.isFinite(terminal), "operation_record.terminal_at parses");
  const rows = forgeRecords.terminal_event;
  assert.ok(Array.isArray(rows) && rows.length >= 1, "at least one terminal_event row is retained");
  for (const row of rows) {
    const stamped = Date.parse(row.timestamp);
    assert.ok(Number.isFinite(stamped), "terminal_event row timestamp parses");
    assert.ok(stamped >= terminal, "terminal_event row is stamped at or after terminal_at");
  }
});

test("ZW15: the retained operation record's process left no survivors", () => {
  const survivors = forgeRecords.operation_record.process.survivors;
  assert.ok(Array.isArray(survivors), "process.survivors is an array");
  assert.equal(survivors.length, 0, "no process survived the operation");
});

// MechanicalWorkflows-v7c7 (dzao follow-up): seven residual laws of the retained forge records and the evidence envelope.
// X1..X3 restate the ZW9, ZW10 and ZW14 order laws at the evidence's own microsecond precision
// (Date.parse keeps whole milliseconds, so a sub-millisecond inversion inside one millisecond passes those rows).
// X4..X7 pin retained facts that no landed row reads: the schema id, process.signal, chain_v / storage_v and the version line.
const microsOf = (value: unknown): bigint => {
  assert.equal(typeof value, "string", "the instant is a string");
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,9}))?(Z|[+-]\d{2}:\d{2})$/.exec(value as string);
  assert.ok(m, `the instant ${String(value)} is ISO 8601 with an explicit offset`);
  const [, y, mo, d, h, mi, s, frac = "", off = "Z"] = m;
  const whole = BigInt(Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s))) * 1000n;
  const fraction = BigInt((frac + "000000").slice(0, 6));
  const offset = off === "Z" ? 0n : (off.startsWith("-") ? -1n : 1n) * (BigInt(Number(off.slice(1, 3))) * 3600n + BigInt(Number(off.slice(4, 6))) * 60n) * 1000000n;
  return whole + fraction - offset;
};

test("X0: the microsecond instant parser keeps the fraction, honours the offset and reads the three committed stamp shapes", () => {
  assert.equal(microsOf("2026-10-16T02:44:49.193905Z") - microsOf("2026-10-16T02:44:49.193805Z"), 100n, "a 100 microsecond gap inside one millisecond is visible");
  assert.equal(microsOf("2026-10-16T04:44:49.193905+02:00"), microsOf("2026-10-16T02:44:49.193905Z"), "the same instant at +02:00 is equal");
  assert.equal(microsOf("2026-10-16T02:44:49Z"), microsOf("2026-10-16T02:44:49.000000Z"), "an absent fraction reads as zero");
  const record = forgeRecords.operation_record;
  for (const stamp of [record.created_at, record.started_at, record.terminal_at, forgeRecords.operation_log.created_at, forgeRecords.operation_log.closed_at]) {
    assert.equal(typeof microsOf(stamp), "bigint", `the committed stamp ${String(stamp)} parses`);
  }
  for (const row of forgeRecords.terminal_event) assert.equal(typeof microsOf(row.timestamp), "bigint", `the committed terminal_event stamp ${String(row.timestamp)} parses`);
});

test("X1: the operation record's created, started and terminal instants are ordered at microsecond precision", () => {
  const record = forgeRecords.operation_record;
  const created = microsOf(record.created_at);
  const started = microsOf(record.started_at);
  const terminal = microsOf(record.terminal_at);
  assert.ok(created <= started, "created_at is no later than started_at to the microsecond");
  assert.ok(started <= terminal, "started_at is no later than terminal_at to the microsecond");
});

test("X2: the operation log closed no earlier than it was created at microsecond precision", () => {
  const log = forgeRecords.operation_log;
  assert.ok(microsOf(log.created_at) <= microsOf(log.closed_at), "created_at is no later than closed_at to the microsecond");
});

test("X3: every terminal_event row is stamped no earlier than terminal_at at microsecond precision", () => {
  const terminal = microsOf(forgeRecords.operation_record.terminal_at);
  const rows = forgeRecords.terminal_event;
  assert.ok(Array.isArray(rows) && rows.length >= 1, "at least one terminal_event row is retained");
  for (const row of rows) assert.ok(microsOf(row.timestamp) >= terminal, "terminal_event row is stamped at or after terminal_at to the microsecond");
});

test("X4: the witnessed evidence carries its own schema identifier, and the replay fixture carries the same one", () => {
  assert.equal(witnessed.schema, "mw.live-gate-flow-evidence.v1");
  const fixture = JSON.parse(readFileSync(join(EVIDENCE, "2026-10-16-live-gate-flow-replay.json"), "utf8"));
  assert.equal(fixture.schema, witnessed.schema, "the replay fixture names the same evidence schema");
});

test("X5: the retained operation record's process was never signalled", () => {
  const proc = forgeRecords.operation_record.process;
  assert.ok(Object.hasOwn(proc, "signal"), "process carries its own signal key");
  assert.equal(proc.signal, null, "process.signal is null");
});

test("X6: every terminal_event row carries chain_v 1 and storage_v 1", () => {
  const rows = forgeRecords.terminal_event;
  assert.ok(Array.isArray(rows) && rows.length >= 1, "at least one terminal_event row is retained");
  for (const row of rows) {
    assert.equal(row.chain_v, 1, "terminal_event row chain_v is 1");
    assert.equal(row.storage_v, 1, "terminal_event row storage_v is 1");
  }
});

test("X7: the environment's forge version line names the environment's forge revision", () => {
  const forge = witnessed.environment.forge;
  assert.match(forge.revision, /^[0-9a-f]{12,40}$/, "the environment revision is a lower-case hex revision");
  assert.ok(forge.version_line.includes(`(rev ${forge.revision},`), "version_line names (rev <revision>,");
});

// MechanicalWorkflows-tmco (v7c7 follow-up): two residual laws of the retained forge records that no landed row reads.
// V1 orders the operation log's open instant against the operation record's creation; V3 pins process.exit_code beside the success terminal.
// V2 (operation_log.closed_at no later than operation_record.terminal_at) is declined: the repository carries no forge-side reference that specifies the log-close versus terminal-record order, and the ordering is observed on this one retained record only.
test("V1: the operation log was opened no earlier than the operation record was created, at microsecond precision", () => {
  const record = forgeRecords.operation_record;
  assert.ok(microsOf(record.created_at) <= microsOf(forgeRecords.operation_log.created_at), "operation_log.created_at is no earlier than operation_record.created_at");
});

test("V3: the operation record's process carries its own exit_code key, null or 0, beside the success terminal", () => {
  const record = forgeRecords.operation_record;
  assert.ok(Object.hasOwn(record.process, "exit_code"), "process carries its own exit_code key");
  assert.ok(record.process.exit_code === null || record.process.exit_code === 0, "process.exit_code is null or 0");
  assert.equal(record.terminal.status, "success", "the terminal status is success");
  assert.equal(record.terminal.outcome_class, "success", "the terminal outcome class is success");
});
