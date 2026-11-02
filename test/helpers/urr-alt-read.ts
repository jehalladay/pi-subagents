/**
 * wb-gmj9: the inline reader of the portable Fiber core gate census's rendered leg, THE ALT READ's image branch among its lines, as
 * wb-nnm7's FINAL cut #4 wrote it (machine/flywheel/wb-nnm7 tip 7284444eba4cdf243c1a77bfd150b6a5c00004ba,
 * test/workbench-urr-core-gate-census.test.ts), moved here so that a census can hold its readings
 * (test/workbench-urr-alt-read-census.test.ts). Under the rule-19 dependency inversion R-B259 the parent wb-nnm7 is parked and waits
 * on wb-gmj9; its later re-cut can import this reader. The code of every declaration below (its lines outside doc comments, within
 * the tip's lines 697-726 and 1231-1545) is copied byte for byte and in the tip's order; only the import statement below and the
 * export statement at the end are added. The doc comments are new: each names the tip lines its code comes from, and no reading of
 * any declaration is claimed by this module beyond the census's pinned probes, which the census's header lists. The parent's own doc
 * comments are not carried: they state the parent census's claims (its ALT_FORMS forms, D1 controls and roster witnesses among
 * them), which are not on this tree and which this module does not make. Trunk's census keeps its own rendered leg (it differs from
 * this one: wb-2wiv.4's cuts changed it after the tip's base) and is neither read nor edited here. Test-only: nothing is read or
 * written here.
 */
import { Parser, TextRenderer, type Token, type Tokens } from "marked";

/** The parent's at (tip census :697). */
const at = (code: number): string => String.fromCodePoint(code);
/** The parent's NAMED_REFERENCES (tip census :699-726). */
const NAMED_REFERENCES: Readonly<Record<string, string>> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: at(0xa0),
  ensp: at(0x2002),
  emsp: at(0x2003),
  thinsp: at(0x2009),
  hairsp: at(0x200a),
  shy: at(0xad),
  ZeroWidthSpace: at(0x200b),
  zwnj: at(0x200c),
  zwj: at(0x200d),
  NoBreak: at(0x2060),
  hyphen: at(0x2010),
  dash: at(0x2010),
  ndash: at(0x2013),
  mdash: at(0x2014),
  minus: at(0x2212),
  period: ".",
  excl: "!",
  quest: "?",
  comma: ",",
  colon: ":",
  semi: ";",
};
/** The parent's REFERENCE (tip census :1231). */
const REFERENCE = /&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g;
/** The parent's HTML_SPACE, HTML_NAME, HTML_ATTRIBUTE_NAME and HTML_VALUE (tip census :1242-1245). */
const HTML_SPACE = "[\\t\\n\\f\\r ]";
const HTML_NAME = "[A-Za-z][A-Za-z0-9-]*";
const HTML_ATTRIBUTE_NAME = "[A-Za-z_:][A-Za-z0-9_.:-]*";
const HTML_VALUE = `[^\\t\\n\\f\\r "'=<>\`]+|'[^']*'|"[^"]*"`;
/** The parent's HTML_ATTRIBUTE (tip census :1247). */
const HTML_ATTRIBUTE = new RegExp(`${HTML_SPACE}+(${HTML_ATTRIBUTE_NAME})(?:${HTML_SPACE}*=${HTML_SPACE}*(${HTML_VALUE}))?`, "g");
/** The parent's HTML_TAG (tip census :1249-1252). */
const HTML_TAG = new RegExp(
  `<(${HTML_NAME})((?:${HTML_SPACE}+${HTML_ATTRIBUTE_NAME}(?:${HTML_SPACE}*=${HTML_SPACE}*(?:${HTML_VALUE}))?)*)${HTML_SPACE}*\\/?>|<\\/(${HTML_NAME})${HTML_SPACE}*>`,
  "y",
);
/** The parent's REFUSED_ELEMENTS (tip census :1262-1300). */
const REFUSED_ELEMENTS = [
  "applet",
  "audio",
  "bdo",
  "body",
  "canvas",
  "datalist",
  "details",
  "dialog",
  "fencedframe",
  "frameset",
  "iframe",
  "input",
  "link",
  "marquee",
  "math",
  "meter",
  "noembed",
  "noframes",
  "noscript",
  "object",
  "optgroup",
  "option",
  "plaintext",
  "progress",
  "rp",
  "rt",
  "rtc",
  "script",
  "select",
  "style",
  "svg",
  "table",
  "template",
  "textarea",
  "title",
  "video",
  "xmp",
] as const;
/** The parent's REFUSED_ATTRIBUTES (tip census :1302). */
const REFUSED_ATTRIBUTES = ["color", "dir", "hidden", "popover", "style"] as const;
/** The parent's ALT_ATTRIBUTE (tip census :1304). */
const ALT_ATTRIBUTE = "alt";
/** The parent's RAW_STATE (tip census :1319). */
const RAW_STATE = "raw-state text";
/** The parent's IMAGE_ALT (tip census :1332). */
const IMAGE_ALT = "image alt";
/** The parent's inRawState (tip census :1341-1343). */
function inRawState(token: Token): boolean {
  return token.type === "text" && (token as Tokens.Text).escaped === true;
}
/** The parent's Piece (tip census :1349). */
type Piece = string | { readonly first: string; readonly other: string };
/** The parent's writtenForm (tip census :1351-1354). */
function writtenForm(markup: string): string {
  const shown = markup.replace(/\s+/g, " ").trim();
  return shown.length > 40 ? `${shown.slice(0, 40)}...` : shown;
}
/** The parent's unquoted (tip census :1356-1358). */
function unquoted(value: string): string {
  return value.startsWith('"') || value.startsWith("'") ? value.slice(1, -1) : value;
}
/** The parent's HtmlRead (tip census :1359-1364; its two member doc comments, tip :1360 and :1362, are new). */
interface HtmlRead {
  /** The parent's HtmlRead.pieces (tip census :1361). */
  readonly pieces: readonly Piece[];
  /** The parent's HtmlRead.values (tip census :1363). */
  readonly values: readonly string[];
}
/** The parent's htmlRead (tip census :1374-1421). */
function htmlRead(raw: string, unknown: string[]): HtmlRead {
  const pieces: Piece[] = [];
  const values: string[] = [];
  const refusedElements: readonly string[] = REFUSED_ELEMENTS;
  const refusedAttributes: readonly string[] = REFUSED_ATTRIBUTES;
  let at = 0;
  while (at < raw.length) {
    const open = raw.indexOf("<", at);
    pieces.push(raw.slice(at, open === -1 ? raw.length : open));
    if (open === -1) break;
    if (raw.startsWith("<!--", open)) {
      if (raw.startsWith("<!-->", open) || raw.startsWith("<!--->", open)) {
        const end = raw.indexOf(">", open) + 1;
        unknown.push(writtenForm(raw.slice(open, end)));
        at = end;
        continue;
      }
      const close = raw.indexOf("-->", open + 4);
      if (close === -1) {
        unknown.push(writtenForm(raw.slice(open)));
        break;
      }
      const bang = raw.indexOf("--!>", open + 4);
      if (bang !== -1 && bang < close) unknown.push(writtenForm(raw.slice(open, bang + 4)));
      at = close + 3;
      continue;
    }
    HTML_TAG.lastIndex = open;
    const tag = HTML_TAG.exec(raw);
    if (tag !== null) {
      const name = (tag[1] ?? "").toLowerCase();
      const attributes = [...(tag[2] ?? "").matchAll(HTML_ATTRIBUTE)].map(match => ({ name: (match[1] ?? "").toLowerCase(), value: unquoted(match[2] ?? "") }));
      if (refusedElements.includes(name) || attributes.some(attribute => refusedAttributes.includes(attribute.name))) unknown.push(writtenForm(tag[0]));
      for (const attribute of attributes) if (attribute.value.length > 0) values.push(destinationText(attribute.value));
      const alt = attributes.find(attribute => attribute.name === ALT_ATTRIBUTE);
      if (alt !== undefined) pieces.push({ first: "", other: alt.value });
      at = open + tag[0].length;
      continue;
    }
    if (/^<[A-Za-z/!?]/.test(raw.slice(open, open + 2))) {
      const end = raw.indexOf(">", open);
      unknown.push(writtenForm(raw.slice(open, end === -1 ? raw.length : end + 1)));
    }
    pieces.push("<");
    at = open + 1;
  }
  return { pieces, values };
}
/** The parent's destinationText (tip census :1431-1437). */
function destinationText(href: string): string {
  try {
    return decodeURIComponent(href);
  } catch {
    return href;
  }
}
/** The parent's decodeReferences (tip census :1439-1447). */
function decodeReferences(text: string, unknown: string[]): string {
  return text.replace(REFERENCE, (whole: string, decimal?: string, hex?: string, name?: string) => {
    const code = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    if (code !== undefined) return code <= 0x10ffff ? at(code) : whole;
    const value = name === undefined ? undefined : NAMED_REFERENCES[name];
    if (value === undefined) unknown.push(whole);
    return value ?? whole;
  });
}
/** The parent's tokenText (tip census :1452-1455). */
function tokenText(token: Token): string {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
}
/** The parent's tokenChildren (tip census :1456-1459). */
function tokenChildren(token: Token): readonly Token[] {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
}
/** The parent's writtenAlt (tip census :1469-1471). */
function writtenAlt(image: Tokens.Image): string {
  return new Parser({}).parseInline(image.tokens, new TextRenderer());
}
/** The parent's spaced (tip census :1473-1475). */
function spaced(text: string): string {
  return text.replace(/\s+/g, " ");
}
/** The parent's unrecorded (tip census :1488-1495). */
function unrecorded(found: readonly string[], recorded: readonly string[]): string[] {
  const left = [...recorded];
  return found.filter(reference => {
    const index = left.indexOf(reference);
    if (index !== -1) left.splice(index, 1);
    return index === -1;
  });
}
/** The parent's inlineRendered (tip census :1510-1541). */
function inlineRendered(tokens: readonly Token[], unknown: string[], extras: string[]): Piece[] {
  const out: Piece[] = [];
  for (const token of tokens) {
    if (token.type === "html") {
      const read = htmlRead(token.raw, unknown);
      extras.push(...read.values);
      out.push(...read.pieces.filter(piece => typeof piece !== "string").map(piece => ({ first: piece.first, other: decodeReferences(piece.other, []) })));
    }
    if (token.type === "link" || token.type === "image") {
      const { href, title } = token as Tokens.Link | Tokens.Image;
      extras.push(destinationText(href), ...(typeof title === "string" && title.length > 0 ? [title] : []));
    }
    if (token.type === "html" || token.type === "checkbox") continue;
    if (token.type === "br") out.push("\n");
    else if (token.type === "codespan" || token.type === "escape") out.push(tokenText(token));
    else if (token.type === "image") {
      const recorded: string[] = [];
      const read = runText(tokenChildren(token).length > 0 ? inlineRendered(tokenChildren(token), recorded, extras) : [decodeReferences(tokenText(token), recorded)]);
      const found: string[] = [];
      const written = decodeReferences(writtenAlt(token as Tokens.Image), found);
      unknown.push(...recorded, ...unrecorded(found, recorded));
      if (spaced(written) !== spaced(read)) unknown.push(`${IMAGE_ALT} "${writtenForm(written)}"`);
      out.push({ first: read, other: "" });
    }
    else if (tokenChildren(token).length > 0) out.push(...inlineRendered(tokenChildren(token), unknown, extras));
    else {
      if (inRawState(token)) unknown.push(`${RAW_STATE} "${writtenForm(tokenText(token))}"`);
      out.push(decodeReferences(tokenText(token), unknown));
    }
  }
  return out;
}
/** The parent's runText (tip census :1543-1545). */
function runText(pieces: readonly Piece[]): string {
  return pieces.map(piece => (typeof piece === "string" ? piece : piece.first)).join("");
}

export { inlineRendered, type Piece };
