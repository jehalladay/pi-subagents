/**
 * wb-w4si: the normalized-view reader of the wb-grmo.1 speculative-context docs census, as wb-eu94's FINAL cut #4 wrote it
 * (machine/flywheel/wb-eu94 tip 785870aaf640d64ae3885c5af5001d56c5d9cb22, test/workbench-rf-speculative-context-census.test.ts),
 * moved here so that a census can hold its readings (test/workbench-rf-speculative-normalized-view-census.test.ts). Under the
 * rule-19 dependency inversion R-B223 the parent wb-eu94 is parked and waits on wb-w4si; its later re-cut can import this reader.
 * The code of every declaration below (its lines outside its doc comment, within the tip's lines 188-259 and 476-691) is copied
 * byte for byte and in the tip's order; only the export statement at the end is added. The doc comments are new: each names the
 * tip lines its code comes from, and no reading of any declaration is claimed by this module beyond the readers census's pinned
 * probes, which normalized()'s comment lists. The parent's own doc comments are not carried: they name its READ_FORMS, M and Q
 * pins and its deferred families D1-D4, and none of those pins is on this tree. Test-only: nothing is read or written here.
 */
/** The parent's DASHES (tip census :188). */
const DASHES = [0x2010, 0x2011, 0x2012, 0x2013, 0x2014, 0x2015, 0x2212, 0xfe58, 0xfe63, 0xff0d].map(code => String.fromCodePoint(code)).join("");
/** The parent's SEP (tip census :190). */
const SEP = `[\\s_.\\\\*\`~${DASHES}-]*`;
/** The parent's JOINT (tip census :192). */
const JOINT = `[_.\\\\*\`~${DASHES}-]*`;
/** The parent's SPECULATIVE_TERM (tip census :195-205). */
const SPECULATIVE_TERM = new RegExp(
  [
    "\\bspeculat\\w*",
    `\\bwhat${JOINT}if\\b`,
    "\\bhypothetical\\w*",
    "\\bcounterfactual\\w*",
    "(?<![\\w-])--scenario\\b",
    `\\bscenario${SEP}(?:overlays?|results?|renders?|rendering|views?|branch(?:es)?|context)\\b`,
  ].join("|"),
  "i",
);
/** The parent's SERVED_TERM (tip census :208). */
const SERVED_TERM = /\b(?:serv(?:e|es|ed|ing)|admit(?:s|ted|ting)?|available|supported|enabled|expos(?:e|es|ed|ing)|offer(?:s|ed|ing)?|provid(?:e|es|ed|ing)|deliver(?:s|ed|ing)?)\b/i;
/** The parent's SENTENCE_BREAK (tip census :210). */
const SENTENCE_BREAK = /(?<=[.!?])\s+|\n\s*\n|\n(?=\s*(?:[-*+]\s|\d+[.)]\s|#|\||>))/;
/** The parent's NAMED_REFERENCE_LIST (tip census :219-253). */
const NAMED_REFERENCE_LIST: readonly string[] = [
  "AMP=0026", "Afr=1D504", "Aopf=1D538", "ApplyFunction=2061", "Ascr=1D49C", "Bernoullis=212C", "Bfr=1D505", "Bopf=1D539", "Breve=02D8", "Bscr=212C",
  "CapitalDifferentialD=2145", "Cayleys=212D", "Cedilla=00B8", "Cfr=212D", "Copf=2102", "Cscr=1D49E", "DD=2145", "Dfr=1D507", "DiacriticalAcute=00B4",
  "DiacriticalDot=02D9", "DiacriticalDoubleAcute=02DD", "DiacriticalGrave=0060", "DiacriticalTilde=02DC", "DifferentialD=2146", "Dopf=1D53B",
  "Dot=00A8", "DoubleDot=00A8", "Dscr=1D49F", "Efr=1D508", "Eopf=1D53C", "Escr=2130", "ExponentialE=2147", "Ffr=1D509", "Fopf=1D53D",
  "Fouriertrf=2131", "Fscr=2131", "GT=003E", "Gfr=1D50A", "Gopf=1D53E", "Gscr=1D4A2", "Hfr=210C", "HilbertSpace=210B", "Hopf=210D", "Hscr=210B",
  "IJlig=0132", "Ifr=2111", "Im=2111", "ImaginaryI=2148", "InvisibleComma=2063", "InvisibleTimes=2062", "Iopf=1D540", "Iscr=2110", "Jfr=1D50D",
  "Jopf=1D541", "Jscr=1D4A5", "Kfr=1D50E", "Kopf=1D542", "Kscr=1D4A6", "LT=003C", "Laplacetrf=2112", "Lfr=1D50F", "Lmidot=013F", "Lopf=1D543",
  "Lscr=2112", "MediumSpace=205F", "Mellintrf=2133", "Mfr=1D510", "Mopf=1D544", "Mscr=2133", "NegativeMediumSpace=200B", "NegativeThickSpace=200B",
  "NegativeThinSpace=200B", "NegativeVeryThinSpace=200B", "NewLine=000A", "Nfr=1D511", "NoBreak=2060", "NonBreakingSpace=00A0", "Nopf=2115",
  "Nscr=1D4A9", "Ofr=1D512", "Oopf=1D546", "Oscr=1D4AA", "OverBar=203E", "Pfr=1D513", "Poincareplane=210C", "Popf=2119", "Pscr=1D4AB", "QUOT=0022",
  "Qfr=1D514", "Qopf=211A", "Qscr=1D4AC", "Re=211C", "Rfr=211C", "Ropf=211D", "Rscr=211B", "Sfr=1D516", "Sopf=1D54A", "Sscr=1D4AE", "TRADE=2122",
  "Tab=0009", "Tfr=1D517", "ThickSpace=205F 200A", "ThinSpace=2009", "Topf=1D54B", "Tscr=1D4AF", "Ufr=1D518", "UnderBar=005F", "Uopf=1D54C",
  "Uscr=1D4B0", "VeryThinSpace=200A", "Vfr=1D519", "Vopf=1D54D", "Vscr=1D4B1", "Wfr=1D51A", "Wopf=1D54E", "Wscr=1D4B2", "Xfr=1D51B", "Xopf=1D54F",
  "Xscr=1D4B3", "Yfr=1D51C", "Yopf=1D550", "Yscr=1D4B4", "ZeroWidthSpace=200B", "Zfr=2128", "Zopf=2124", "Zscr=1D4B5", "acute=00B4", "af=2061",
  "afr=1D51E", "amp=0026", "aopf=1D552", "apos=0027", "ascr=1D4B6", "ast=002A", "bernou=212C", "bfr=1D51F", "bopf=1D553", "breve=02D8", "bscr=1D4B7",
  "bsol=005C", "cedil=00B8", "cfr=1D520", "circledS=24C8", "colon=003A", "complexes=2102", "copf=1D554", "cscr=1D4B8", "dash=2010", "dblac=02DD",
  "dd=2146", "dfr=1D521", "die=00A8", "dopf=1D555", "dot=02D9", "dscr=1D4B9", "ee=2147", "efr=1D522", "ell=2113", "emsp=2003", "emsp13=2004",
  "emsp14=2005", "ensp=2002", "eopf=1D556", "escr=212F", "excl=0021", "expectation=2130", "exponentiale=2147", "ffilig=FB03", "fflig=FB00",
  "ffllig=FB04", "ffr=1D523", "filig=FB01", "fjlig=0066 006A", "fllig=FB02", "fopf=1D557", "frac12=00BD", "frac13=2153", "frac14=00BC", "frac15=2155",
  "frac16=2159", "frac18=215B", "frac23=2154", "frac25=2156", "frac34=00BE", "frac35=2157", "frac38=215C", "frac45=2158", "frac56=215A",
  "frac58=215D", "frac78=215E", "fscr=1D4BB", "gfr=1D524", "gopf=1D558", "grave=0060", "gscr=210A", "gt=003E", "hairsp=200A", "half=00BD",
  "hamilt=210B", "hellip=2026", "hfr=1D525", "hopf=1D559", "horbar=2015", "hscr=1D4BD", "hyphen=2010", "ic=2063", "ifr=1D526", "ii=2148",
  "ijlig=0133", "image=2111", "imagline=2110", "imagpart=2111", "incare=2105", "integers=2124", "iopf=1D55A", "iscr=1D4BE", "it=2062", "jfr=1D527",
  "jopf=1D55B", "jscr=1D4BF", "kfr=1D528", "kopf=1D55C", "kscr=1D4C0", "lagran=2112", "lfr=1D529", "lmidot=0140", "lopf=1D55D", "lowbar=005F",
  "lrm=200E", "lscr=1D4C1", "lt=003C", "macr=00AF", "mdash=2014", "mfr=1D52A", "midast=002A", "minus=2212", "mldr=2026", "mopf=1D55E", "mscr=1D4C2",
  "napos=0149", "naturals=2115", "nbsp=00A0", "ndash=2013", "nfr=1D52B", "nldr=2025", "nopf=1D55F", "nscr=1D4C3", "numero=2116", "numsp=2007",
  "oS=24C8", "ofr=1D52C", "ogon=02DB", "oline=203E", "oopf=1D560", "order=2134", "orderof=2134", "ordf=00AA", "ordm=00BA", "oscr=2134", "period=002E",
  "pfr=1D52D", "phmmat=2133", "planckh=210E", "popf=1D561", "primes=2119", "pscr=1D4C5", "puncsp=2008", "qfr=1D52E", "qopf=1D562", "qscr=1D4C6",
  "quaternions=210D", "quest=003F", "quot=0022", "rationals=211A", "real=211C", "realine=211B", "realpart=211C", "reals=211D", "rfr=1D52F",
  "ring=02DA", "rlm=200F", "ropf=1D563", "rscr=1D4C7", "sfr=1D530", "shy=00AD", "sopf=1D564", "sscr=1D4C8", "strns=00AF", "sup1=00B9", "sup2=00B2",
  "sup3=00B3", "tfr=1D531", "thinsp=2009", "tilde=02DC", "topf=1D565", "trade=2122", "tscr=1D4C9", "ufr=1D532", "uml=00A8", "uopf=1D566",
  "uscr=1D4CA", "vfr=1D533", "vopf=1D567", "vscr=1D4CB", "wfr=1D534", "wopf=1D568", "wscr=1D4CC", "xfr=1D535", "xopf=1D569", "xscr=1D4CD",
  "yfr=1D536", "yopf=1D56A", "yscr=1D4CE", "zeetrf=2128", "zfr=1D537", "zopf=1D56B", "zscr=1D4CF", "zwj=200D", "zwnj=200C",
];
/** The parent's namedReference and NAMED_REFERENCES (tip census :255-259). */
function namedReference(entry: string): [string, string] {
  const at = entry.indexOf("=");
  return [entry.slice(0, at), entry.slice(at + 1).split(" ").map(hex => String.fromCodePoint(Number.parseInt(hex, 16))).join("")];
}
const NAMED_REFERENCES: ReadonlyMap<string, string> = new Map(NAMED_REFERENCE_LIST.map(namedReference));
/** The parent's HTML_COMMENT (tip census :476). */
const HTML_COMMENT = /<!--(?:-?>|[\s\S]*?--!?>)/y;
/** The parent's BOGUS_COMMENT (tip census :487). */
const BOGUS_COMMENT = /<(?:[!?]|\/(?![A-Za-z]))[^>]*>/y;
/** The parent's TAG_SPACE (tip census :490). */
const TAG_SPACE: ReadonlySet<string> = new Set(["\t", "\n", "\f", "\r", " "]);
/** The parent's TagState (tip census :492). */
type TagState = "tagName" | "beforeName" | "attrName" | "afterName" | "beforeValue" | "doubleQuoted" | "singleQuoted" | "unquoted" | "afterQuoted" | "selfClosing";
/** The parent's tagEnd (tip census :504-553). */
function tagEnd(text: string, start: number): number {
  let state: TagState = "tagName";
  for (let at = start + (text[start + 1] === "/" ? 2 : 1); at < text.length; at += 1) {
    const char = text[at] ?? "";
    const space = TAG_SPACE.has(char);
    if (char === ">" && state !== "doubleQuoted" && state !== "singleQuoted") return at + 1;
    switch (state) {
      case "tagName":
        if (space) state = "beforeName";
        else if (char === "/") state = "selfClosing";
        break;
      case "beforeName":
      case "selfClosing":
        if (char === "/") state = "selfClosing";
        else if (!space) state = "attrName";
        else state = "beforeName";
        break;
      case "attrName":
        if (space) state = "afterName";
        else if (char === "/") state = "selfClosing";
        else if (char === "=") state = "beforeValue";
        break;
      case "afterName":
        if (char === "/") state = "selfClosing";
        else if (char === "=") state = "beforeValue";
        else if (!space) state = "attrName";
        break;
      case "beforeValue":
        if (char === '"') state = "doubleQuoted";
        else if (char === "'") state = "singleQuoted";
        else if (!space) state = "unquoted";
        break;
      case "doubleQuoted":
        if (char === '"') state = "afterQuoted";
        break;
      case "singleQuoted":
        if (char === "'") state = "afterQuoted";
        break;
      case "unquoted":
        if (space) state = "beforeName";
        break;
      case "afterQuoted":
        if (space) state = "beforeName";
        else if (char === "/") state = "selfClosing";
        else state = "attrName";
        break;
    }
  }
  return -1;
}
/** The parent's markupEnd (tip census :562-569). */
function markupEnd(text: string, start: number): number {
  for (const markup of [HTML_COMMENT, BOGUS_COMMENT]) {
    markup.lastIndex = start;
    const match = markup.exec(text);
    if (match !== null) return start + match[0].length;
  }
  return /^<\/?[A-Za-z]/.test(text.slice(start, start + 3)) ? tagEnd(text, start) : -1;
}
/** The parent's withoutMarkup (tip census :576-587). */
function withoutMarkup(text: string): string {
  let kept = "";
  let from = 0;
  for (let at = text.indexOf("<"); at >= 0; at = text.indexOf("<", at + 1)) {
    const end = markupEnd(text, at);
    if (end < 0) continue;
    kept += text.slice(from, at);
    from = end;
    at = end - 1;
  }
  return kept + text.slice(from);
}
/** The parent's CODE_SPAN (tip census :594). */
const CODE_SPAN = /(?<!`)(?<!(?<!\\)\\(?:\\\\)*)(`+)(?!`)([^`\n]|[^`\n][^\n]*?[^`\n])\1(?!`)/g;
/** The parent's codeSpanText (tip census :597-599). */
function codeSpanText(content: string): string {
  return content.startsWith(" ") && content.endsWith(" ") && /[^ ]/.test(content) ? content.slice(1, -1) : content;
}
/** The parent's INLINE_MARKS (tip census :611). */
const INLINE_MARKS = /[*~`]+(?=[\p{L}\p{N}])|(?<=[\p{L}\p{N}])[*~`]+/gu;
/** The parent's NUMERIC_REFERENCE (tip census :616). */
const NUMERIC_REFERENCE = /&#(?:([0-9]+)|[xX]([0-9A-Fa-f]+));?/g;
/** The parent's C1_REFERENCES (tip census :627-632). */
const C1_REFERENCES: ReadonlyMap<number, number> = new Map([
  [0x80, 0x20ac], [0x82, 0x201a], [0x83, 0x0192], [0x84, 0x201e], [0x85, 0x2026], [0x86, 0x2020], [0x87, 0x2021], [0x88, 0x02c6],
  [0x89, 0x2030], [0x8a, 0x0160], [0x8b, 0x2039], [0x8c, 0x0152], [0x8e, 0x017d], [0x91, 0x2018], [0x92, 0x2019], [0x93, 0x201c],
  [0x94, 0x201d], [0x95, 0x2022], [0x96, 0x2013], [0x97, 0x2014], [0x98, 0x02dc], [0x99, 0x2122], [0x9a, 0x0161], [0x9b, 0x203a],
  [0x9c, 0x0153], [0x9e, 0x017e], [0x9f, 0x0178],
]);
/** The parent's codePoint (tip census :637-640). */
function codePoint(code: number): string {
  if (!Number.isSafeInteger(code) || code === 0 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) return String.fromCodePoint(0xfffd);
  return String.fromCodePoint(C1_REFERENCES.get(code) ?? code);
}
/** The parent's INVISIBLE (tip census :648). */
const INVISIBLE = /[\p{Cf}\p{Default_Ignorable_Code_Point}]/gu;
/**
 * The parent's normalized() (tip census :669-678). The readings claimed for it are exactly the proven subset the readers census
 * pins. On each probe of its pin cases normalized() returns the literal view written there and docsVerdict() the literal
 * { c1, c2 } written there, which is the page's verdict (marked 18.0.11 and parse5 7.1.2 read the probe as a page; the census
 * header names the oracle). The pin cases' rows: D1, the INLINE_MARKS runs its probes put beside modifier letters (Lm), letter
 * numbers (Nl) and the other letter (Lo) U+00AA; D2, the "</" its probes put before a letter outside ASCII; D3, the "<" its probes
 * put before a letter outside ASCII, a fullwidth one included; D4, the backslash its probes put before "#", ">", "|", "+", "*" or
 * "-" at a line start, or between a line start's digit and "." or ")"; U1, the INLINE_MARKS cells its probes hold (refusal #4's
 * IM05, IM33, IM35, IM37, IM45, IM46 and IM47); and U2, the carriage returns its probes put inside a bogus comment and inside a
 * comment (refusal #4's BC19 and HC08). On the probe of each of the
 * census's three residual cases (R-BLOCK-MARKS, R-TILDES-AROUND-EMPHASIS and R-CR-QUOTE-BREAK) the view returns the literal
 * readings written there, whose verdict is not the page's: named over-reads. Every other reading of the view - each of these steps
 * at any input that is not a probe, and every other step - is NOT CLAIMED by this module or by the readers census.
 */
function normalized(body: string): string {
  return withoutMarkup(body)
    .replace(CODE_SPAN, (_match, _run: string, content: string) => codeSpanText(content))
    .replace(INLINE_MARKS, "")
    .replace(NUMERIC_REFERENCE, (_match, decimal: string | undefined, hex: string | undefined) => codePoint(decimal === undefined ? Number.parseInt(hex ?? "", 16) : Number(decimal)))
    .replace(/&([A-Za-z][A-Za-z0-9]*);/g, (match, name: string) => NAMED_REFERENCES.get(name) ?? match)
    .replace(/\\([!-/:-@[-`{-~])/g, "$1")
    .replace(INVISIBLE, "")
    .normalize("NFKC");
}
/** The parent's sentencesOf (tip census :680-684). */
function sentencesOf(body: string): { view: string; sentence: string }[] {
  const split = (view: string, source: string): { view: string; sentence: string }[] =>
    source.split(SENTENCE_BREAK).map(sentence => sentence.replace(/\s+/g, " ").trim()).filter(sentence => sentence.length > 0).map(sentence => ({ view, sentence }));
  return [...split("raw", body), ...split("normalized", normalized(body))];
}
/** The parent's presentsServed (tip census :686). */
const presentsServed = (sentence: string): boolean => SPECULATIVE_TERM.test(sentence) && SERVED_TERM.test(sentence);
/** The parent's docsVerdict (tip census :688-691). */
function docsVerdict(body: string): { c1: boolean; c2: boolean } {
  const units = sentencesOf(body);
  return { c1: units.some(entry => presentsServed(entry.sentence)), c2: units.some(entry => SPECULATIVE_TERM.test(entry.sentence)) };
}

export {
  BOGUS_COMMENT,
  C1_REFERENCES,
  CODE_SPAN,
  codePoint,
  codeSpanText,
  DASHES,
  docsVerdict,
  HTML_COMMENT,
  INLINE_MARKS,
  INVISIBLE,
  JOINT,
  markupEnd,
  NAMED_REFERENCE_LIST,
  NAMED_REFERENCES,
  NUMERIC_REFERENCE,
  normalized,
  presentsServed,
  SENTENCE_BREAK,
  SEP,
  SERVED_TERM,
  SPECULATIVE_TERM,
  sentencesOf,
  TAG_SPACE,
  tagEnd,
  withoutMarkup,
};
