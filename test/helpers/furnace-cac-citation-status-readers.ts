/**
 * wb-t8my: the four receipt-anchor readers of the wb-dqf.2 citation-status census, as wb-pnn8's FINAL cut #4 wrote them
 * (machine/flywheel/wb-pnn8 tip ad5195cdd19c0069dccec6d02dc09f1716613490, test/workbench-furnace-cac-citation-status-census.test.ts),
 * moved here so that a census can hold their readings (test/workbench-furnace-cac-citation-status-readers-census.test.ts). Under the
 * rule-19 dependency inversion R-B202 the parent wb-pnn8 is parked and waits on wb-t8my; its later re-cut can import these readers.
 * The declarations below are that tip's lines 421-424, 655-665, 693-706 and 1106-1141, their code byte for byte, plus three added
 * items: the reduced marked import (the tip's line 261 also imports Lexer and Links), the reduced ANCHOR (the parent's ANCHOR.rule,
 * the only member a reader reads) and the one export statement at the end. Changed: the closing words of the doc comments of
 * anchorTables, anchorProse and anchorRules - the tip's 'each pinned by its in-case control; no other reading is claimed' names the
 * in-case controls of wb-pnn8's cut #4 census, a version of that file trunk does not carry, so each now says that only the readers
 * census's probes hold a reading here. The doc comments are otherwise the parent's and name its census header ("THE READERS"); they
 * describe, and the readings this module is held to are the readers census's pinned probes. Test-only: no src, docs or receipt is
 * read or written here.
 */
import { marked, type Token, type Tokens } from "marked";

/** The parent census's ANCHOR.rule: the lead that opens the one block stating a receipt entry's witness rule. */
const ANCHOR = { rule: "Witness rule: " } as const;
/** The carrier view (the wb-3cql F3 reading): marked token types whose text no reader of the rendered page sees as a status. */
const UNSHOWN: readonly string[] = ["html", "image", "def", "del", "space", "hr"];
/** An html token opening or closing an element: an attribute or a style can hide the text between its tags, so its view is opaque. */
const ELEMENT = /^<\/?[A-Za-z]/;
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
function childrenOf(token: Token): readonly Token[] {
  if (isList(token)) return token.items.flatMap(item => item.tokens);
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
}
function textField(token: Token): string {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
}
/** What a reader sees of marked tokens as a carrier: unshown types and a link's destination and title show nothing. */
function shownText(tokens: readonly Token[], separator: string, view: { opaque: boolean }): string {
  return tokens
    .map(token => {
      if (token.type === "html" && ELEMENT.test(token.raw.trim())) view.opaque = true;
      if (UNSHOWN.includes(token.type)) return "";
      if (token.type === "br") return "\n";
      if (isList(token)) return token.items.map(item => shownText(item.tokens, "\n", view)).join("\n");
      if (isTable(token)) return [...token.header, ...token.rows.flat()].map(cell => shownText(cell.tokens, "", view)).join(" ");
      const children = childrenOf(token);
      return children.length > 0 ? shownText(children, token.type === "blockquote" ? "\n" : "", view) : textField(token);
    })
    .join(separator);
}
const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
/** The tables of a receipt's last entry, read through marked's tokens: THE READERS' Entries and Tables readings (header); here only the readers census's probes hold a reading. */
function anchorTables(text: string): string[][][] {
  const tokens = marked.lexer(text);
  const entries = tokens.flatMap((token, index) => (isHeading(token) && token.depth === 2 ? [index] : []));
  const last = entries.at(-1);
  if (last === undefined) return [];
  return tokens
    .slice(last + 1)
    .filter(isTable)
    .map(table => [table.header.map(cell => cell.text), ...table.rows.map(row => row.map(cell => cell.text))]);
}
/** The prose blocks of a receipt's last entry, read through marked's tokens by shownText, whitespace-squeezed and trimmed: THE READERS' Entries and Prose readings (header); here only the readers census's probes hold a reading. */
function anchorProse(text: string): string[] {
  const tokens = marked.lexer(text);
  const entries = tokens.flatMap((token, index) => (isHeading(token) && token.depth === 2 ? [index] : []));
  const last = entries.at(-1);
  if (last === undefined) return [];
  return tokens
    .slice(last + 1)
    .flatMap(token => (isList(token) ? token.items.map(item => item.tokens) : token.type === "paragraph" ? [[token]] : []))
    .flatMap(block => {
      const view = { opaque: false };
      const shown = shownText(block, " ", view).replace(/\s+/g, " ").trim();
      return view.opaque ? [] : [shown];
    });
}
/** The witness rules a receipt's last entry states: THE READERS' Rules readings (header); here only the readers census's probes hold a reading. */
function anchorRules(text: string): string[] {
  return anchorProse(text).flatMap(block => (block.startsWith(ANCHOR.rule) ? [block.slice(ANCHOR.rule.length).replace(/\.$/, "")] : []));
}
/** A source file's header as its reader sees it: the doc comment that opens the file at its first byte, to its first closing delimiter, each line's comment prefix (indentation, one '*', one space) removed, whitespace-squeezed; none otherwise. */
function headerOf(source: string): string {
  const end = source.startsWith("/**") ? source.indexOf("*/") : -1;
  return end < 0 ? "" : source.slice(3, end).replace(/^[ \t]*\* ?/gm, "").replace(/\s+/g, " ").trim();
}

export { ANCHOR, anchorProse, anchorRules, anchorTables, ELEMENT, headerOf, shownText, UNSHOWN };
