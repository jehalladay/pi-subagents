/** Bounded diagnostic hygiene, not a claim of universal secret detection. */
import type { JsonValue } from "./capability-registry.js";

/** The bound every sanitizer applies unless its caller names a tighter one. */
export const WORKBENCH_TEXT_LIMIT = 2000;
const REDACTED = "[REDACTED]";
/**
 * What BEARER and PREFIXED write until ASSIGNED has read the text (wb-3l3): a stand-in ASSIGNED never takes for a whole
 * value, so an assignment whose value they rewrote still loses its whole unquoted tail. It becomes REDACTED before output,
 * and so does a U+0001 the text already held (over-redaction only: sanitizeWorkbenchText never passes an unsafe unit here).
 */
const PENDING = "\x01";
/** The credential schemes, key prefixes and assignment keys, spelled once for the shapes below and the reading in cover. */
const SCHEMES = "Bearer|Basic";
const KEY_PREFIXES = "sk-ant-|sk-proj-|ghp_|github_pat_";
const ASSIGNMENT_KEYS = "api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret|aws_secret_access_key|aws_session_token";
/**
 * The three credential shapes, in the order redactWorkbenchText applies them. ASSIGNED first takes a marker an earlier
 * pass left as a whole value, but only before closing brackets and a value end, so a second pass keeps that marker and
 * any text glued to it is still read as the value (docs/20 ruling 2).
 */
const BEARER = new RegExp(String.raw`\b(?:${SCHEMES})\s+[^\s,;"']+`, "gi");
const PREFIXED = new RegExp(String.raw`\b(?:${KEY_PREFIXES})[a-zA-Z0-9_-]+`, "g");
const ASSIGNED = new RegExp(String.raw`((?:${ASSIGNMENT_KEYS})["']?\s*[=:]\s*)(?:\[REDACTED\](?=[}\]]*(?:$|[\s,;]))|"[^"\n]*"|'[^'\n]*'|[^\s,;]+)`, "gi");

function bounded(value: string, maxTextLength: number): string {
  return value.length > maxTextLength ? `${value.slice(0, Math.max(0, maxTextLength - 20))} [truncated]` : value;
}

export function redactWorkbenchText(value: string, maxTextLength = WORKBENCH_TEXT_LIMIT): string {
  const assigned = value.replace(BEARER, PENDING).replace(PREFIXED, PENDING).replace(ASSIGNED, `$1${REDACTED}`);
  return bounded(assigned.replaceAll(PENDING, REDACTED), maxTextLength);
}

/**
 * One unsafe code point: a C0 or C1 control, the line and paragraph separators, a bidi embedding, override or isolate, any
 * default-ignorable code point (zero-width characters, joiners, bidi marks, the BOM, the soft hyphen, variation selectors,
 * tags), a format control that hides or rearranges the text beside it although Unicode does not make it default-ignorable
 * (wb-rqd: the interlinear annotation controls U+FFF9-U+FFFB and the Egyptian hieroglyph format controls U+13430-U+1343F),
 * or a lone surrogate. The other format controls that are not default-ignorable, the prepended concatenation marks (Arabic
 * number signs and ayah ends, the Syriac abbreviation mark, the Kaithi number signs), are drawn with a visible glyph and
 * stay text.
 */
const UNSAFE_CODE_POINT = String.raw`[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}\u{202a}-\u{202e}\u{2066}-\u{2069}\u{d800}-\u{dfff}\u{fff9}-\u{fffb}\u{13430}-\u{1343f}]|\p{Default_Ignorable_Code_Point}`;
/** A terminated ANSI CSI or string sequence (OSC, DCS, SOS, PM, APC) as ESC introduces it in its 7-bit form. */
const SEVEN_BIT_SEQUENCE = String.raw`\x1b\[[0-?]*[ -/]*[@-~]|\x1b[\]P^X_][^\x07\x1b]*(?:\x07|\x1b\\)`;
/**
 * The same sequences with either form of introducer (wb-xbq): U+009B is CSI, and U+0090, U+0098, U+009D, U+009E and U+009F
 * are DCS, SOS, OSC, PM and APC, each the same control as its ESC form, so the bytes after one belong to its sequence
 * exactly as after ESC; a string sequence ends at BEL or at ST in either form, ESC \ or U+009C.
 */
const SEQUENCE = String.raw`(?:\x1b\[|\x9b)[0-?]*[ -/]*[@-~]|(?:\x1b[\]P^X_]|[\x90\x98\x9d-\x9f])[^\x07\x1b\x9c]*(?:\x07|\x1b\\|\x9c)`;
/**
 * One unsafe unit: a terminated escape sequence, 7-bit or 8-bit, or one unsafe code point. An unterminated sequence prefix
 * is not one unit, but its introducer is, so no sequence survives either way. The one place this set lives.
 */
const UNSAFE_UNIT = new RegExp(`${SEQUENCE}|${UNSAFE_CODE_POINT}`, "gu");
const HAS_UNSAFE_UNIT = new RegExp(UNSAFE_UNIT.source, "u");
/**
 * The other reading of an 8-bit introducer or ST (wb-xbq): it is also one C1 control, which a reader may drop on its own and
 * so glue the bytes after it to the text before it. Here every C1 code point is its own unit and only ESC opens a sequence.
 * Sticky, for readingsOf, which takes one unit at a time.
 */
const LONE_C1_UNIT = new RegExp(`${SEVEN_BIT_SEQUENCE}|${UNSAFE_CODE_POINT}`, "uy");
/** The unit a reader that honours every 8-bit introducer takes at an offset: UNSAFE_UNIT, sticky. */
const WHOLE_UNIT = new RegExp(UNSAFE_UNIT.source, "uy");
/** An 8-bit introducer or ST: the two readings agree on every text without one. */
const EIGHT_BIT_CONTROL = /[\x90\x98\x9b-\x9f]/u;

/**
 * Replace every unsafe unit with `replacement`. A value equal to its stripped form carries none, which is how identity
 * checks use it. Display paths use sanitizeWorkbenchText, which strips only after redaction has seen every reading.
 */
export function stripUnsafeText(value: string, replacement = ""): string {
  return value.replace(UNSAFE_UNIT, () => replacement);
}

/**
 * The classes of unsafe unit a gap can hold besides whitespace. Whitespace (TAB, LF, VT, FF, CR, NEL, the line and
 * paragraph separators) always separates (12:10Z: "whitespace survives as separator"); any other gap may separate two
 * tokens or sit glued inside one, which redaction reads at every position (see cover). The classes only choose how a
 * display layout renders a gap.
 */
type GapClass = "quiet" | "control" | "escape" | "invisible";

/** A run of adjacent unsafe units between two visible stretches of text. */
interface Gap {
  whitespace: boolean;
  /** NUL or the BOM, the separators the 16:44Z policy names beside whitespace. */
  quiet: boolean;
  /** Any other C0 or C1 control, DEL, or a bidi embedding, override or isolate. */
  control: boolean;
  /** A terminated escape sequence (CSI or a string sequence). */
  escape: boolean;
  /** Any other default-ignorable code point, a format control that hides or rearranges the text beside it, or a lone surrogate. */
  invisible: boolean;
  /** Line breaks, a CRLF counting once. */
  breaks: number;
  carriage: boolean;
}
type Segment = string | Gap;
/** How a display layout renders a gap. */
type Rendering = (gap: Gap) => string;

function absorb(gap: Gap, unit: string): void {
  const code = unit.charCodeAt(0);
  if (unit.length > 1) {
    // An escape sequence (ESC or an 8-bit C1 introducer opens it), or an astral invisible (a surrogate pair: a
    // default-ignorable or an Egyptian hieroglyph format control).
    if (code === 0x1b || (code >= 0x80 && code <= 0x9f)) gap.escape = true;
    else gap.invisible = true;
    gap.carriage = false;
    return;
  }
  const lineBreak = code === 0x0a || code === 0x0d || code === 0x85 || code === 0x2028 || code === 0x2029;
  if (lineBreak || code === 0x09 || code === 0x0b || code === 0x0c) gap.whitespace = true;
  else if (code === 0x00 || code === 0xfeff) gap.quiet = true;
  else if (code <= 0x1f || (code >= 0x7f && code <= 0x9f) || (code >= 0x202a && code <= 0x202e) || (code >= 0x2066 && code <= 0x2069)) gap.control = true;
  else gap.invisible = true;
  if (lineBreak && !(code === 0x0a && gap.carriage)) gap.breaks += 1;
  gap.carriage = code === 0x0d;
}

/** One unsafe unit as a reading takes it: where it starts and its text. A RegExpExecArray from matchAll is one. */
interface UnitMatch {
  readonly index: number;
  readonly 0: string;
}

/** The input as visible stretches and the gaps between them, units as `units` takes them; nothing is dropped or rewritten yet. */
function segments(value: string, units: Iterable<UnitMatch> = value.matchAll(UNSAFE_UNIT)): Segment[] {
  const parts: Segment[] = [];
  let at = 0;
  let gap: Gap | undefined;
  for (const match of units) {
    if (match.index > at) {
      if (gap) parts.push(gap);
      gap = undefined;
      parts.push(value.slice(at, match.index));
    }
    gap ??= { whitespace: false, quiet: false, control: false, escape: false, invisible: false, breaks: 0, carriage: false };
    absorb(gap, match[0]);
    at = match.index + match[0].length;
  }
  if (gap) parts.push(gap);
  if (at < value.length) parts.push(value.slice(at));
  return parts;
}

/** One cell per visible character and one per gap. */
const cellCount = (parts: readonly Segment[]): number => parts.reduce((cells, part) => cells + (typeof part === "string" ? part.length : 1), 0);

/** A display renders a gap as a space when it holds whitespace or any of `classes`, and as nothing otherwise. */
const separates = (gap: Gap, classes: readonly GapClass[]): boolean => gap.whitespace || classes.some(name => gap[name]);

export type WorkbenchTextLayout = "text" | "terminal" | "label" | "lines";
const DISPLAY: Readonly<Record<WorkbenchTextLayout, Rendering>> = {
  text: gap => (gap.whitespace ? " " : ""),
  terminal: gap => (separates(gap, ["quiet", "control"]) ? " " : ""),
  label: gap => (separates(gap, ["quiet", "control", "escape"]) ? " " : ""),
  lines: gap => (gap.breaks > 0 ? "\n".repeat(gap.breaks) : gap.whitespace ? " " : ""),
};

/** A scheme, a key prefix or an assignment key wherever it occurs; cover decides the boundary before each itself. */
const SCHEME = new RegExp(SCHEMES, "gi");
const KEY_PREFIX = new RegExp(KEY_PREFIXES, "g");
const ASSIGNMENT_KEY = new RegExp(`(?=(${ASSIGNMENT_KEYS}))`, "gi");
/** The ASCII word characters of a \b in BEARER and PREFIXED (neither carries the u flag). */
const WORD = /[A-Za-z0-9_]/;
const SPACE = /\s/;
/** What ends a BEARER token, what continues a prefixed key, and what ends an unquoted assignment value. */
const TOKEN_END = /[\s,;"']/;
const KEY_CHARACTER = /[a-zA-Z0-9_-]/;
const VALUE_END = /[\s,;]/;

/**
 * Redaction, position-aware (17:32Z): every gap but whitespace may separate two tokens or sit glued inside one, chosen
 * independently at every position, and a cell is covered when redactWorkbenchText would hide it under ANY such choice.
 * One linear pass over the view that glues every such gap gets there, because under every choice
 * - a scheme or key prefix starts where it starts here; its \b is a separating gap just before it, a non-word character
 *   or the start; a scheme's space is a separating gap just after it or whitespace; and its token, glued wherever a gap
 *   sits inside it, reaches at least as far here;
 * - an assignment's key is one of its occurrences here, and its value reaches no further than here, where the space of a
 *   scheme match counts as part of the value, as the redactor's marker makes it.
 * Every start is read on its own, so one input may carry a unit between two tokens and the same unit inside a token.
 */
function cover(parts: readonly Segment[], covered: Uint8Array): void {
  // The view: visible text, a whitespace gap as one space or one line break (a quoted value never crosses a line, as in
  // plain text), every other gap glued. before[i] is the glued gap just before view character i (i = length: after the
  // last one), else -1.
  let text = "";
  const owner: number[] = [];
  const before: number[] = [];
  let cell = 0;
  let pending = -1;
  for (const part of parts) {
    if (typeof part === "string") {
      for (let index = 0; index < part.length; index++) {
        before.push(index === 0 ? pending : -1);
        owner.push(cell + index);
      }
      text += part;
      cell += part.length;
      pending = -1;
    } else if (part.whitespace) {
      before.push(-1);
      owner.push(cell);
      text += part.breaks > 0 ? "\n" : " ";
      cell += 1;
    } else {
      pending = cell;
      cell += 1;
    }
  }
  before.push(pending);
  const length = text.length;
  const reached = new Int32Array(length + 1);
  const schemes = new Int32Array(length + 1);
  const reach = (spans: Int32Array, start: number, end: number): void => {
    spans[start] += 1;
    spans[end] -= 1;
  };
  // Where a BEARER token and a prefixed key starting at each offset end, so no start rescans its token.
  const tokenEnd = new Int32Array(length + 1).fill(length);
  const keyEnd = new Int32Array(length + 1).fill(length);
  for (let index = length - 1; index >= 0; index--) {
    tokenEnd[index] = TOKEN_END.test(text[index]) ? index : tokenEnd[index + 1];
    keyEnd[index] = KEY_CHARACTER.test(text[index]) ? keyEnd[index + 1] : index;
  }
  /** A \b can hold at a start: the text begins there, a glued gap there may separate, or a non-word character precedes it. */
  const atBoundary = (at: number): boolean => at === 0 || before[at] >= 0 || !WORD.test(text[at - 1]);
  for (const match of text.matchAll(SCHEME)) {
    const end = match.index + match[0].length;
    let token = end;
    while (token < length && SPACE.test(text[token])) token++;
    const spaced = token > end || before[end] >= 0;
    if (atBoundary(match.index) && spaced && token < length && tokenEnd[token] > token) {
      reach(reached, match.index, tokenEnd[token]);
      reach(schemes, match.index, tokenEnd[token]);
    }
  }
  for (const match of text.matchAll(KEY_PREFIX)) {
    const end = match.index + match[0].length;
    if (atBoundary(match.index) && keyEnd[end] > end) reach(reached, match.index, keyEnd[end]);
  }
  // An unquoted value ends at whitespace, a comma or a semicolon, but not at the space inside a scheme match: the redactor
  // replaced that match with its marker before it reads assignments. A quoted value ends at its closing quote unless a
  // line break comes first.
  let inScheme = 0;
  const valueEnd = new Int32Array(length + 1).fill(length);
  for (let index = 0; index < length; index++) {
    inScheme += schemes[index];
    if (VALUE_END.test(text[index]) && !(inScheme > 0 && SPACE.test(text[index]))) valueEnd[index] = index;
  }
  const closing = { '"': new Int32Array(length + 1).fill(length), "'": new Int32Array(length + 1).fill(length) };
  for (let index = length - 1; index >= 0; index--) {
    if (valueEnd[index] !== index) valueEnd[index] = valueEnd[index + 1];
    for (const quote of ['"', "'"] as const) closing[quote][index] = text[index] === quote || text[index] === "\n" ? index : closing[quote][index + 1];
  }
  for (const match of text.matchAll(ASSIGNMENT_KEY)) {
    let at = match.index + match[1].length;
    if (text[at] === '"' || text[at] === "'") at++;
    while (at < length && SPACE.test(text[at])) at++;
    if (text[at] !== "=" && text[at] !== ":") continue;
    at++;
    while (at < length && SPACE.test(text[at])) at++;
    const quote = text[at];
    if ((quote === '"' || quote === "'") && text[closing[quote][at + 1]] === quote) reach(reached, at, closing[quote][at + 1] + 1);
    else if (at < length && valueEnd[at] > at) reach(reached, at, valueEnd[at]);
  }
  let open = 0;
  let inside = false;
  for (let index = 0; index < length; index++) {
    open += reached[index];
    const now = open > 0;
    if (now) {
      covered[owner[index]] = 1;
      if (inside && before[index] >= 0) covered[before[index]] = 1;
    }
    inside = now;
  }
}

/** The cell of every offset as segments numbers them with `units`: a visible character's own, or its gap's for a unit. */
function cellsOf(value: string, units: Iterable<UnitMatch>): Int32Array {
  const cellOf = new Int32Array(value.length);
  let cell = 0;
  let at = 0;
  let gap = -1;
  for (const match of units) {
    if (match.index > at || gap < 0) {
      for (; at < match.index; at++) cellOf[at] = cell++;
      gap = cell++;
    }
    for (const end = match.index + match[0].length; at < end; at++) cellOf[at] = gap;
  }
  for (; at < value.length; at++) cellOf[at] = cell++;
  return cellOf;
}

/**
 * The raw text as the plain redactor reads it, every unsafe unit in place: whatever plain redaction hides stays hidden
 * (a U+0085 inside a token, say, which JavaScript's \s does not hold). Same-length placeholders keep every offset.
 */
function coverRaw(value: string, covered: Uint8Array): void {
  const cellOf = cellsOf(value, value.matchAll(UNSAFE_UNIT));
  const conceal = (offset: number, match: string, kept = ""): string => {
    for (let index = offset + kept.length; index < offset + match.length; index++) covered[cellOf[index]] = 1;
    return kept + "\x01".repeat(match.length - kept.length);
  };
  value
    .replace(BEARER, (match: string, offset: number) => conceal(offset, match))
    .replace(PREFIXED, (match: string, offset: number) => conceal(offset, match))
    .replace(ASSIGNED, (match: string, key: string, offset: number) => conceal(offset, match, key));
}

/** The most readings of one cluster of 8-bit introducers and ST a text is covered under; a cluster with more hides the text whole. */
const MAX_READINGS = 1024;
/**
 * Introducers no more than this many kept code units apart form one cluster, read in every combination (wb-mrg). A kept
 * code unit lies inside no unit any reading may take, so every reading keeps it as text: a unit with one reading (a 7-bit
 * sequence, a run of default-ignorables) puts no distance between two introducers, however long it is. Introducers farther
 * apart are combined only in the two uniform readings, so a credential that only a reading choosing differently on the two
 * sides of a longer stretch of kept text exposes is not covered. Clusters suffice where two premises hold, each with its
 * limit: the keyword of a detection (a scheme, a key prefix or an assignment key) and the start of its value fit inside
 * this distance unless whitespace stands between them (an assignment key more than this many spaces before its '='); and
 * an introducer in a token's tail, read whole, lets the token reach at least as far as reading it alone would, except for
 * a closing quote that only the lone reading shows.
 */
const CLUSTER_GAP = 32;
/**
 * The most work (readings listed times code units of text) one text is covered under, checked as the readings are listed
 * and once more after the last; a text that needs more is hidden whole.
 */
const MAX_READING_WORK = 2 ** 23;
/** Where a unit may start under either reading: at an unsafe code point, and nowhere else. */
const UNIT_START = new RegExp(UNSAFE_CODE_POINT, "gu");

/** The first index of `sorted` whose value is at least `value`. */
function lowerBound(sorted: readonly number[], value: number): number {
  let low = 0;
  let high = sorted.length;
  while (low < high) {
    const middle = (low + high) >> 1;
    if (sorted[middle] < value) low = middle + 1;
    else high = middle;
  }
  return low;
}

/**
 * The readings of the text's 8-bit introducers and ST that redaction covers (wb-xbq, wb-mrg), each a list of the units it
 * takes in order. An introducer is either the start of the sequence it opens (U+009B is CSI, U+0090/0098/009D/009E/009F
 * open the string sequences) or one C1 control a reader drops on its own, and ST in the same way ends a string or is one
 * control; a reader decides at EACH one. The readings listed, and no others:
 * - the all-whole reading, every introducer opening its sequence (UNSAFE_UNIT), first;
 * - for each cluster (CLUSTER_GAP), every combination of the choices inside it, with every introducer outside it whole;
 * - the all-alone reading, every introducer one control (LONE_C1_UNIT), when there are two clusters or more (with one, it
 *   is one of that cluster's combinations).
 * So both uniform readings are always members. A cluster with more combinations than MAX_READINGS, or a text whose readings
 * times its code units exceed MAX_READING_WORK, has none to list: `undefined`, which callers answer by hiding the whole
 * text, never by guessing at the readings left out.
 */
function readingsOf(value: string): UnitMatch[][] | undefined {
  // The ends the unit at each offset may take, the whole sequence first; offsets in no unit are visible text.
  const ends = new Map<number, number[]>();
  const units: number[] = [];
  for (const { index: at } of value.matchAll(UNIT_START)) {
    WHOLE_UNIT.lastIndex = at;
    LONE_C1_UNIT.lastIndex = at;
    const taken = [WHOLE_UNIT.exec(value), LONE_C1_UNIT.exec(value)].flatMap(match => (match ? [at + match[0].length] : []));
    if (taken.length === 0) continue;
    ends.set(at, [...new Set(taken)]);
    units.push(at);
  }
  // kept[i]: how many of the first i code units are kept, inside no unit any reading may take.
  const kept = new Int32Array(value.length + 1);
  let removedTo = 0;
  for (let index = 0, slot = 0; index < value.length; index++) {
    for (; slot < units.length && units[slot] === index; slot++) removedTo = Math.max(removedTo, ...(ends.get(index) ?? []));
    kept[index + 1] = kept[index] + (index < removedTo ? 0 : 1);
  }
  // Each cluster of offsets where the readings differ, as the first offset and the last offset a reading may reach; the
  // distance from the farthest reach so far to the next such offset counts kept code units only.
  const clusters: { first: number; last: number }[] = [];
  let reach = 0;
  for (const at of units) {
    const options = ends.get(at) ?? [];
    if (options.length < 2) continue;
    const last = Math.max(...options);
    const open = clusters[clusters.length - 1];
    if (open && kept[at] - kept[reach] <= CLUSTER_GAP) open.last = Math.max(open.last, last);
    else clusters.push({ first: at, last });
    reach = Math.max(reach, last);
  }
  const unitAt = (at: number, end: number): UnitMatch => ({ index: at, 0: value.slice(at, end) });
  /** Up to `limit` readings in which the introducers in [first, last] choose freely and every other follows the whole sequence. */
  const within = (first: number, last: number, limit: number): UnitMatch[][] | undefined => {
    const found: UnitMatch[][] = [];
    const walk = (from: number, prior: readonly UnitMatch[]): boolean => {
      const taken = [...prior];
      let slot = lowerBound(units, from);
      while (slot < units.length) {
        const at = units[slot];
        const options = ends.get(at) ?? [];
        if (options.length > 1 && at >= first && at <= last) {
          for (const end of options) if (!walk(end, [...taken, unitAt(at, end)])) return false;
          return true;
        }
        taken.push(unitAt(at, options[0]));
        slot = lowerBound(units, options[0]);
      }
      found.push(taken);
      return found.length <= limit;
    };
    return walk(0, []) ? found : undefined;
  };
  /** The all-alone reading: every introducer and ST one control, the units LONE_C1_UNIT takes. */
  const allAlone = (): UnitMatch[] => {
    const taken: UnitMatch[] = [];
    for (let slot = 0; slot < units.length; ) {
      const options = ends.get(units[slot]) ?? [];
      const end = options[options.length - 1];
      taken.push(unitAt(units[slot], end));
      slot = lowerBound(units, end);
    }
    return taken;
  };
  const readings = within(1, 0, 1);
  if (!readings || clusters.length === 0) return readings;
  // The most readings MAX_READING_WORK lets this text list; a cluster's first reading is the all-whole one again.
  const room = Math.floor(MAX_READING_WORK / value.length);
  for (const { first, last } of clusters) {
    const found = within(first, last, Math.min(MAX_READINGS, room - readings.length + 1));
    if (!found) return undefined;
    readings.push(...found.slice(1));
  }
  if (clusters.length > 1) readings.push(allAlone());
  return readings.length > room ? undefined : readings;
}

/** The text with the units of one reading removed. */
function withoutUnits(value: string, units: readonly UnitMatch[]): string {
  let kept = "";
  let at = 0;
  for (const unit of units) {
    kept += value.slice(at, unit.index);
    at = unit.index + unit[0].length;
  }
  return kept + value.slice(at);
}

/**
 * The text read under every reading of its 8-bit introducers and ST that readingsOf lists, each reading covered as cover
 * reads any text, and every offset it covers then covered in the cells displayed (wb-xbq, wb-mrg): reading the introducers
 * as the sequences they open never uncovers what reading some as single controls would hide, such as a keyword whose next
 * letter is the final byte of a CSI, and a text whose introducers are read differently from one another is covered as each
 * listed reading covers it. A text readingsOf lists no readings for has every cell covered.
 */
function coverMixed(value: string, covered: Uint8Array): void {
  const readings = readingsOf(value);
  if (!readings) {
    covered.fill(1);
    return;
  }
  const cell = cellsOf(value, value.matchAll(UNSAFE_UNIT));
  // The first reading takes every introducer whole, the one cover has already read.
  for (const reading of readings.slice(1)) {
    const parts = segments(value, reading);
    const read = new Uint8Array(cellCount(parts));
    cover(parts, read);
    const own = cellsOf(value, reading);
    for (let index = 0; index < value.length; index++) if (read[own[index]] === 1) covered[cell[index]] = 1;
  }
}

/** Visible text and gaps as the layout displays them, every covered run as one [REDACTED]. */
function render(parts: readonly Segment[], covered: Uint8Array, display: Rendering): string {
  let out = "";
  let cell = 0;
  let redacting = false;
  for (const part of parts) {
    const units = typeof part === "string" ? part.length : 1;
    for (let index = 0; index < units; index++, cell++) {
      if (covered[cell] === 1) {
        if (!redacting) out += REDACTED;
        redacting = true;
        continue;
      }
      const shown = typeof part === "string" ? part[index] : display(part);
      // A gap that displays as nothing sits inside a covered run without splitting its marker.
      if (shown === "") continue;
      out += shown;
      redacting = false;
    }
  }
  return out;
}

const collapse = (text: string): string => text.replace(/\s+/g, " ").trim();

/**
 * Untrusted text bound for display, the ONE helper every display path uses: normalize once, redact once, strip once.
 * Redaction sees every reading of the gaps the unsafe units leave: whitespace always separates; NUL and the BOM (the
 * 16:44Z policy), controls, escape sequences and invisibles may each separate two tokens or sit glued inside one,
 * independently at every position (see cover), and the raw text is read as the plain redactor reads it (see coverRaw).
 * A credential any such reading exposes is redacted, so an invisible can neither split a keyword nor glue a key to the
 * text before it, and deletion never precedes redaction. An 8-bit introducer or ST opens or ends the sequence its 7-bit
 * form would and is read as one control as well, under the readings readingsOf lists: both uniform readings, and every
 * combination of choices inside a cluster of introducers (see coverMixed); a text past its bounds is hidden whole. Only
 * then are the gaps rendered:
 * - "text": model-facing text. Whitespace controls become one space; every other unsafe unit vanishes.
 * - "terminal": the terminal card. Escape sequences vanish as its terminal parser removes them; controls and separators
 *   become a space; invisibles vanish; no trim.
 * - "label": single-line display labels. Escape sequences, controls and separators become a space, invisibles vanish,
 *   then whitespace collapses to one space and the ends are trimmed.
 * - "lines": transcript-class bodies. Whole-text redaction first, then LF row structure preserved (CRLF, CR, NEL, LS and
 *   PS each become one LF), other whitespace one space, every other unsafe unit deleted. Newline collapse is for
 *   single-line labels only.
 * Text without any unsafe unit is exactly redactWorkbenchText's output (after the label collapse).
 */
export function sanitizeWorkbenchText(value: string, maxTextLength = WORKBENCH_TEXT_LIMIT, layout: WorkbenchTextLayout = "text"): string {
  if (!HAS_UNSAFE_UNIT.test(value)) return redactWorkbenchText(layout === "label" ? collapse(value) : value, maxTextLength);
  const parts = segments(value);
  const display = DISPLAY[layout];
  const covered = new Uint8Array(cellCount(parts));
  cover(parts, covered);
  coverRaw(value, covered);
  if (EIGHT_BIT_CONTROL.test(value)) coverMixed(value, covered);
  const shown = render(parts, covered, display);
  return bounded(layout === "label" ? collapse(shown) : shown, maxTextLength);
}

const SECRET_FIELD = /^(?:authorization|api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret|aws_secret_access_key|aws_session_token)$/i;
/**
 * A key naming a native secret field once its unsafe units are gone, under any reading of its 8-bit introducers that
 * readingsOf lists (wb-xbq, wb-mrg); a key it lists no readings for is one.
 */
function isSecretField(key: string): boolean {
  if (SECRET_FIELD.test(stripUnsafeText(key))) return true;
  if (!EIGHT_BIT_CONTROL.test(key)) return false;
  const readings = readingsOf(key);
  return !readings || readings.some(reading => SECRET_FIELD.test(withoutUnits(key, reading)));
}

/** All strings (including keys) are data, sanitized for bounded model display. */
export function sanitizeWorkbenchJson(value: JsonValue, maxTextLength = WORKBENCH_TEXT_LIMIT): JsonValue {
  if (typeof value === "string") return sanitizeWorkbenchText(value, maxTextLength);
  if (Array.isArray(value)) return value.map(child => sanitizeWorkbenchJson(child, maxTextLength));
  if (value && typeof value === "object") {
    const result: Record<string, JsonValue> = Object.create(null);
    for (const [key, child] of Object.entries(value)) {
      // Native secret fields require redaction even when their value alone has no recognizable credential prefix
      // (e.g. { password: "opaque" }), and an invisible inside the key name does not hide the field.
      result[sanitizeWorkbenchText(key, maxTextLength)] = isSecretField(key) ? REDACTED : sanitizeWorkbenchJson(child, maxTextLength);
    }
    return result;
  }
  return value;
}

/**
 * Serialize a tool result for the model after sanitizing every string in it.
 * The JSON round trip drops `undefined` members and class identity so the
 * sanitizer only ever sees plain JSON.
 */
export function sanitizeWorkbenchJsonText(value: unknown, maxTextLength = WORKBENCH_TEXT_LIMIT): string {
  return JSON.stringify(sanitizeWorkbenchJson(JSON.parse(JSON.stringify(value ?? null)) as JsonValue, maxTextLength));
}
