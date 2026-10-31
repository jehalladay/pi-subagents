/**
 * wb-rdlh.3: a markdown section's RAW source, read from the page's own text, beside what marked's top-level tokens carry of it.
 *
 * marked 18.0.11's Lexer.lex rewrites every CR and CRLF to LF before it tokenizes, and its blockTokens consumes a link reference
 * definition whose label repeats an earlier definition's without pushing a token (the one-newline space tokens around it are appended
 * to the previous token's raw). So the re-joined raws of a section's tokens can equal a section the page does not hold. This reader
 * takes the section's bounds from the lexer itself (the offset at which its top-level step for each token began, recorded by a block
 * extension that never returns a token) and slices the page's own text between them, CR and CRLF line endings and every definition
 * included, as the page spells them.
 */
import { createHash } from "node:crypto";
import { Marked, marked, type Token, type Tokens } from "marked";

/** The line endings marked 18.0.11's Lexer.lex rewrites to LF before it tokenizes (its carriageReturn rule). */
const LINE_ENDING = /\r\n|\r/g;

/** A top-level token of the section as marked carries it: its type and its raw's length (UTF-16 code units). */
export interface SectionToken {
  readonly type: string;
  readonly length: number;
}

export interface SectionSource {
  /** The section binds: marked's top-level tokens of the page hold exactly one level-2 heading whose rendered text is the heading. */
  readonly ok: boolean;
  /** Why the reading is refused (empty when it binds). */
  readonly why: string;
  /** The section's span in the page (UTF-16 offsets): from the first character the top-level lexer consumed for the heading token up
   * to the first character it consumed for the next top-level level-1 or level-2 heading token, or the page's end. */
  readonly start: number;
  readonly end: number;
  /** The page's own text over that span: CR and CRLF line endings and every link reference definition as the page spells them. */
  readonly source: string;
  /** The UTF-8 encoding of source: its length and its sha-256. */
  readonly bytes: number;
  readonly sha256: string;
  /** The CR characters in source. */
  readonly crs: number;
  /** The section's top-level tokens, the heading token first, as marked carries them. */
  readonly tokens: readonly SectionToken[];
  /** Those tokens' raws re-joined: what marked's top-level tokens carry of the section. */
  readonly tokenText: string;
  /** The page's top-level token raws, re-joined, are the page itself. */
  readonly tiled: boolean;
}

const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");

const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";

/** An inline token list's rendered text as the token view reads a heading: HTML renders none, markup renders its children's text. */
function renderedInline(tokens: readonly Token[]): string {
  return tokens
    .map(token => {
      if (token.type === "html") return "";
      const children: unknown = (token as { tokens?: unknown }).tokens;
      if (Array.isArray(children) && children.length > 0) return renderedInline(children as Token[]);
      const text: unknown = (token as { text?: unknown }).text;
      return typeof text === "string" ? text : "";
    })
    .join("");
}

/** For each normalized offset, the page offset of the character it was rewritten from (the last entry is the page's length). */
function pageOffsets(page: string): number[] {
  const offsets: number[] = [];
  for (let index = 0; index < page.length; index += 1) {
    offsets.push(index);
    if (page.charCodeAt(index) === 0x0d && page.charCodeAt(index + 1) === 0x0a) index += 1;
  }
  offsets.push(page.length);
  return offsets;
}

interface LexedPage {
  readonly tokens: readonly Token[];
  /** For each top-level token, the normalized offset at which the lexer's top-level step that pushed it began (-1 if unseen). */
  readonly starts: readonly number[];
  /** Every top-level step pushed at most one token. */
  readonly stepwise: boolean;
}

/** marked's top-level tokens of the page with the offset at which each one's own step began, taken from the lexer's block loop. */
function lexWithStarts(page: string): LexedPage {
  const steps: (readonly [number, number])[] = [];
  const instrumented = new Marked({
    extensions: [
      {
        name: "section-source-steps",
        level: "block",
        tokenizer(src, tokens) {
          if (tokens === this.lexer.tokens) steps.push([src.length, tokens.length]);
          return undefined;
        },
      },
    ],
  });
  const tokens = instrumented.lexer(page);
  const length = page.replace(LINE_ENDING, "\n").length;
  const starts = tokens.map(() => -1);
  let stepwise = true;
  steps.forEach(([remaining, count], index) => {
    const next = steps[index + 1]?.[1] ?? tokens.length;
    if (next === count + 1) starts[count] = length - remaining;
    else if (next !== count) stepwise = false;
  });
  return { tokens, starts, stepwise };
}

const refused = (why: string): SectionSource => ({ ok: false, why, start: 0, end: 0, source: "", bytes: 0, sha256: sha256(""), crs: 0, tokens: [], tokenText: "", tiled: false });

/**
 * The section under the level-2 heading given: marked's top-level tokens of the page must hold exactly one level-2 heading whose
 * rendered text (white space collapsed, trimmed) is the heading, and the section runs to the next top-level level-1 or level-2 heading
 * or the page's end. Refused, with an empty source, when no such heading or more than one exists, or when the instrumented lexer's
 * tokens are not marked.lexer's own or its steps do not account for every token.
 */
export function sectionSource(page: string, heading: string): SectionSource {
  const lexed = lexWithStarts(page);
  if (JSON.stringify(lexed.tokens) !== JSON.stringify(marked.lexer(page))) return refused("the instrumented lexer's tokens are not marked.lexer's");
  if (!lexed.stepwise || lexed.starts.some(start => start < 0)) return refused("the lexer's top-level steps do not account for every token");
  const matches = lexed.tokens.flatMap((token, index) =>
    isHeading(token) && token.depth === 2 && renderedInline(token.tokens).replace(/\s+/g, " ").trim() === heading ? [index] : [],
  );
  const first = matches[0];
  if (matches.length !== 1 || first === undefined) return refused(`marked's top-level tokens hold ${matches.length} level-2 headings "${heading}"; the section needs exactly one`);
  const after = lexed.tokens.findIndex((token, index) => index > first && isHeading(token) && token.depth <= 2);
  const last = after === -1 ? lexed.tokens.length : after;
  const offsets = pageOffsets(page);
  const start = offsets[lexed.starts[first] ?? 0] ?? 0;
  const end = after === -1 ? page.length : (offsets[lexed.starts[after] ?? 0] ?? page.length);
  const source = page.slice(start, end);
  const section = lexed.tokens.slice(first, last);
  return {
    ok: true,
    why: "",
    start,
    end,
    source,
    bytes: Buffer.byteLength(source, "utf8"),
    sha256: sha256(source),
    crs: source.split("\r").length - 1,
    tokens: section.map(token => ({ type: token.type, length: token.raw.length })),
    tokenText: section.map(token => token.raw).join(""),
    tiled: lexed.tokens.map(token => token.raw).join("") === page,
  };
}

/** The terms (in the order given) a text states: each spelled out, in any letter case, with every run of white space in the text (what
 * JavaScript's \s matches) read as one space. */
export function termsStated(text: string, terms: readonly string[]): string[] {
  const flat = text.replace(/\s+/g, " ").toLowerCase();
  return terms.filter(term => flat.includes(term.toLowerCase()));
}
