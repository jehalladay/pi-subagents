/**
 * wb-grmo.1 (RF-PREDICTIVE-WORLD-MODEL-CONTEXT-R1), the until-then leg. Statement (bead title): "When RFCLI ships speculative
 * rendering (RF-WM-007; rendered_speculative_view), Pi's preview arms shall refuse a speculative-marked result as 'validation'
 * (never to node(), capability_invoke or the projection), and speculative renders shall exist only behind a distinct capability
 * id under a new explicit grant, label kept verbatim; until then Pi claims nothing. Artifact: the RFCLI marker schema."
 * Until-then acceptance (bead notes): "until then a docs census asserts no docs/workbench sentence presents what-if or
 * speculative RF context as served, and the SCG-R11 roster diff gains a freeze-and-flip tripwire that fails when a captured
 * envelope names rendered_speculative_view, a scenario key or a speculative label before those cases exist." Sources
 * (ReactiveFiberCLI, read only): 01-semantics.md:9@82bd879eee52 (RF-WM-007), 02-architecture.md:3 and :9@82bd879eee52 (a distinctly
 * marked WhatIf view; ScenarioResult.rendered_speculative_view), README.md:2@82bd879eee52 (DESIGN ONLY at filing).
 *
 * MEASURED (seat ws-02, run g10-work-s110, 2026-10-26; every read read-only, none re-read by this census, the values live in the
 * roster test/fixtures/rf-speculative-context-roster.json): RFCLI first serves `rf context render --scenario PATH` at
 * 8bd35ecd4651 ("[RF-WM-R3-e] --scenario served on rf context render for cli", 2026-10-24, VERSION 0.1.844). Its
 * context.render.schema.json states nine result members "present exactly on a `rf context render --scenario PATH` render ... and
 * absent on a legacy or --view render" (speculative, notice, labels, exclusion_stages, counts_by_stage, suppressions,
 * lens_snapshots, rendered_output, effects_denied) and the block and notice metadata markers rf.scenario_id and
 * rf.epistemic_status; application/scenario_view.py names the notice block key rf.whatif_notice and the notice line that opens a
 * WhatIf document's output.text ("WHAT-IF VIEW of scenario <id>: ..."). The installed rf 0.1.845 states the same nine members
 * (RFCLI origin/main c83fbd59ec1c too). Two REAL captures in a disposable /tmp workspace at the installed rf 0.1.845 (the roster's
 * basis names the recipe): Pi's own legacy argv (--no-commit) renders a result naming none of the nine members and no marker,
 * while `context render --scenario` (audience cli) renders all nine, the two metadata markers on its one block and output.text
 * opening with the notice line; the roster's scenarioSample and scenarioBlock are that capture's nine members and block, and the
 * notice sits in result.notice only, never in result.blocks. At this cut's base dc72a6d Pi's pin (the SCG-R11 roster
 * test/fixtures/rf-result-keys.json and the contractSource carrier) is rf 0.1.784 (RFCLI 403389a94, 2026-10-21), whose schema
 * carries none of the nine members and no marker at any depth; the queued re-pin wb-jwc.4 moves it to 0.1.845, which serves
 * --scenario. The claim here holds at either pin: Pi's legacy and --view arms never request --scenario, rf states the nine
 * members absent on those renders, so no speculative render reaches Pi's projection, node() or capability_invoke today, and the
 * SCG-R11 tripwire fails any tier whose result names a marker. The armed acceptance (both readers refuse a speculative-marked
 * result as 'validation'; a speculative render behind its own capability id and grant) is the bead's other half, owed once the
 * marker ships at Pi's pin (wb-jwc.4's landing); this census claims only the until-then half and pins nothing that a re-pin moves.
 *
 * wb-dkru (R694 follow-up from the wb-grmo.1 landing 545 gate cmd_c44799b3bdfd; its F3 leads, its F4 rides): the normalized view
 * reads the rendered text of an inline mark inside a word (marked 18.0.11 renders spec*ul*ative, spec**ul**ative, spec~~ul~~ative
 * and spec`ul`ative as one word under emphasis, strikethrough or a code span) and decodes every HTML5 named reference a pattern
 * here can read (NAMED_REFERENCE_LIST), so the gate's P-D16 to P-D19 read in C1 and C2 (M5's positive controls); A2, C1 and C2
 * each judge a planted unit after the real ones, so the gate's hollowing mutants G09, G12, G13 and G14 red (PLANTED LEGS).
 *
 * wb-eu94 (R694 follow-up from the wb-dkru landing 613 gate cmd_dc3281ed8867, hop 3 of the wb-grmo.1 chain, cut in the R739
 * TERMINAL enumerate-the-resolvable form; its F1 leads, its F3 rides): the normalized view claims exactly the forms READ_FORMS
 * enumerates (M6) beside M5's marks and references. It reads a code span on one line as marked renders it (its backtick strings
 * dropped, one padding space stripped at each end: spec` ul `ative), a numeric reference with or without its ";" as an HTML5
 * parser decodes it (spe&#99ulative inside an HTML block; the 0x80-0x9F Windows-1252 table: what&#150;if), a comment (the empty
 * <!--> and <!---> and the "--!>" close included), a processing instruction, a declaration, a CDATA section or a "</" before
 * anything but a letter dropped as a browser drops a bogus comment (to its first ">"), a tag dropped through the ">" an HTML5
 * tokenizer closes it at (a ">" inside a quoted attribute value does not: spec<span title="a>b">ul</span>ative), and a
 * default-ignorable code point dropped. Its joined rows are one word on the page and C1 and C2 read them, its split rows are
 * split on the page and stay split, and its over-read rows are shown as written by marked yet joined by the view, the over-reads
 * that can only join. Every form it does not read is a named residual with a pinned quiet row (R-LEGACY-REFERENCE reworded,
 * R-MULTILINE-CODE-SPAN, R-HIDDEN-CONTENT, R-ESCAPED-MARKUP), so the normalized() doc comment is true over exactly that
 * enumeration.
 *
 * ROWS (each pin's witness is held to the roster):
 *  A, the trigger as it reaches Pi. A1 the contractSource carrier states the --no-commit render contract, names no --scenario and
 *    pins the SCG-R11 roster's own release, beside the roster's measured first --scenario release (whatever the pinned release);
 *    A2 no src module literal spells the scenario flag or a speculative marker (a walk anchored to git's listing).
 *  B, the SCG-R11 roster diff's freeze-and-flip tripwire (test/helpers/rf-render-fixture.ts diffAgainstRoster, the one diff the
 *    default fixture census and the live rf-preview row both use). B1 the helper's marker vocabulary equals the roster's measured
 *    one; B2 the clean full-shape fixture stays quiet under the captured and the constructed roster; B3 each of the nine members
 *    alone trips the diff under the captured roster, under a re-captured roster that lists it (the pin-bump path that would adopt
 *    it as a roster key) and under a constructed roster; B4 the whole --scenario result shape trips with every marker at its path;
 *    B5 the any-depth marker keys trip wherever they sit; B6 the labels trip (the exact notice key anywhere, the notice line
 *    opening output.text); B7 both tiers route through the tripwire (the live row holds its failures to [] and its tier config
 *    and forge command select it).
 *  C, the docs census. C1 no sentence of docs/workbench, raw or normalized, names a what-if or speculative term (SPECULATIVE_TERM)
 *    together with a served term (SERVED_TERM); C2 the forward guard: no sentence names a SPECULATIVE_TERM outside the roster's
 *    allowlist docsSpeculativeSentences, held to the frozen DOCS_SPECULATIVE_SENTENCES (the three sentences of docs/18's "RF
 *    speculation boundary:" paragraph, wb-km7q.9, on rf's passive speculation-policy default, each in the raw view and in the
 *    normalized view, whose INLINE_MARKS step drops the label's opening "**" and whose CODE_SPAN step drops the code spans'
 *    backticks; C1 judges all six quiet), and every allowlisted sentence is a unit the walk reads (an entry no sentence matches
 *    is stale), so the first docs sentence about speculative RF context is added there and C1 judges it. C1 reads
 *    co-occurrence, not polarity: a refusal sentence names its refusal ('refuses'), never a served word.
 *  M, the matchers rows A to C read: M1-M6 the spellings each must catch and pass (M5 the rendered text of inline marks and named
 *    references: the gate's P-D16 to P-D19 and their class read, a mark or a reference a reader sees shown stays, and the decoded
 *    table's size and digest; M6 every READ_FORMS row read as the page shows it, wb-eu94); Q1-Q13 the pinned quiet rows.
 *  PLANTED LEGS (wb-dkru F4): A2, C1 and C2 each run their own judge (srcHits, servedHits, speculativeHits) over the real units and
 *    then over the real units with a planted one after them, and hold the planted run's hits to exactly the plant's, so a judge
 *    forced quiet, a literal reader emptied or C2's allowlist read inverted reds although the real tree is clean. C2's stale-entry
 *    judge (staleAllowed, wb-km7q.9) runs over the real units with the plant's allowed sentence added to the allowlist but not
 *    planted, and holds its stale hits to exactly that sentence.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the judged set - every row's id, label and
 * pins, every pin's witness and reached assertion count, the citations, the measured releases and the registered test titles - is
 * held to the out-of-file roster, whose measured vocabulary also anchors the helper's (B1). A pin deleted, relabelled, swapped for
 * another passing case, or removed from every literal here at once still reds against the roster. Not claimed: an edit of this
 * file and the roster together.
 * RESIDUALS (named, each with a pinned quiet row): R-EPISTEMIC the bare epistemic_status word on the envelope (RF-WM-001, outside
 * every scenario member) is wb-grmo.2's tripwire, not this one (Q1); R-PARAPHRASE a served claim worded without a
 * SPECULATIVE_TERM, a spaced "what if" included, is not read (Q2); R-SPLIT-SENTENCE a claim split across two sentences escapes C1
 * and is caught by C2 alone (Q3); R-COMPOSED-FLAG a scenario flag built from split or computed parts is invisible to A2 (Q4);
 * R-FREE-TEXT the tripwire reads keys anywhere and labels only where rf places them, so a marker word or the notice line inside
 * free text is not read (Q5); R-KEY-SPELLING-AND-PLACEMENT a respelled marker key, or one of the nine generic-named members below
 * the top level, is not read (Q6); R-SCOPE test/, .beads/, README.md, AGENTS.md, CHANGELOG.md and docs outside docs/workbench
 * (docs/rpc.md, docs/workflows.md) are outside every
 * scanned root, and this census's own roster spells every marker (Q7); R-HOMOGLYPH a SPECULATIVE_TERM spelled with a look-alike
 * letter NFKC does not fold escapes C1 and C2 (Q8); R-INTRAWORD-LINK a link or an image inside a word, its text or alt between the
 * brackets (spec[ul](./notes.md)ative), is not resolved, so a term it splits escapes C1 and C2 (Q9); R-LEGACY-REFERENCE a legacy
 * name written without its ";" (spec&shyulative) is read as written, while a browser decodes it inside an HTML block and wherever
 * marked passes it through (a ";" closing the run of letters, digits or "_" it opens: spec&shyulative;), so a term it splits
 * there escapes C1 and C2 (Q10); R-MULTILINE-CODE-SPAN a code span whose content crosses a line ending is not read as one, so the
 * line endings marked strips as its padding (spec`\nul\n`ative) still split a word (Q11); R-HIDDEN-CONTENT the content of an
 * element a browser does not show (the hidden attribute, <template>) is read as text, so a hidden part inside a word splits it
 * (Q12); R-ESCAPED-MARKUP a tag-like run marked shows as written (outside its raw-HTML grammar) is still removed as markup, so a
 * term inside it that a code span or a reference splits (<b spec` ul `ative >) escapes C1 and C2 (Q13).
 * SCOPE: the marker names are producer facts read off the installed rf and RFCLI; Pi vendors no rf schema, so a marker rf adds
 * later is seen only when a re-measure re-reads them into the roster. No speculative reader, refusal or capability is added or
 * faked here; the cut that adds them flips this census (the FLIP of the freeze-and-flip).
 *
 * Display paths added: none. Test-only: no scratch is allocated; src, docs and the two tier files are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { type Dirent, lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { REACTIVE_FIBER_CONTRACT_SOURCE } from "../src/workbench/providers/reactivefiber.js";
import { recordedRfRelease } from "./helpers/rf-release-drift.js";
import * as rfFixture from "./helpers/rf-render-fixture.js";

type Json = rfFixture.Json;
type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-speculative-context-roster.json");
/** The full-shape fixture's workspace root, a label only: no file is read or written there. */
const WORKSPACE = "/fixture/rf-workspace";
/** The first rf release serving `context render --scenario` (RFCLI 8bd35ecd4651, VERSION 0.1.844), held to the roster. */
const FIRST_SERVING_RELEASE = "0.1.844";
/** The carrier's contract after its `rf@<release>:` prefix: the --no-commit render Pi's arms request, at any pinned release. */
const CONTRACT = "reactive-fiber.cli/v1 context.render --no-commit";
const CITATIONS = [
  "docs/programs/predictive-world-model-context-2026-10-18/01-semantics.md:9@82bd879eee52",
  "docs/programs/predictive-world-model-context-2026-10-18/02-architecture.md:3@82bd879eee52",
  "docs/programs/predictive-world-model-context-2026-10-18/02-architecture.md:9@82bd879eee52",
  "docs/programs/predictive-world-model-context-2026-10-18/README.md:2@82bd879eee52",
  "src/reactive_fiber_cli/schemas/cli/context.render.schema.json $defs/result@8bd35ecd4651",
  "src/reactive_fiber_cli/application/scenario_view.py NOTICE_BLOCK_KEY, WhatIfNotice.text@8bd35ecd4651",
  "src/reactive_fiber_cli/domain/scenario.py SCENARIO_ID_MARKER_KEY, EPISTEMIC_STATUS_MARKER_KEY@8bd35ecd4651",
];

/** The dash look-alikes of "-": U+2010-U+2015 hyphens and dashes, U+2212 minus sign, U+FE58 small em dash, U+FE63 small
 * hyphen-minus and U+FF0D fullwidth hyphen-minus, built from their code points so none sits raw in this file. */
const DASHES = [0x2010, 0x2011, 0x2012, 0x2013, 0x2014, 0x2015, 0x2212, 0xfe58, 0xfe63, 0xff0d].map(code => String.fromCodePoint(code)).join("");
/** The separator between two words of a spelling: whitespace, "_", ".", "-" or a dash look-alike, a backslash, emphasis or code. */
const SEP = `[\\s_.\\\\*\`~${DASHES}-]*`;
/** The joint inside "what-if": the same marks without whitespace, so the ordinary English "what if" is not read (R-PARAPHRASE). */
const JOINT = `[_.\\\\*\`~${DASHES}-]*`;
/** (C) a what-if or speculative term: speculative (speculatively, speculation), what-if joined or marked (whatif, WhatIf, what_if,
 * WHAT-IF), hypothetical, counterfactual, the rf --scenario flag, or a scenario overlay, result, render, view, branch or context. */
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
/** (C) a served term: a context that is served, admitted, available, supported, enabled, exposed, offered, provided or
 * delivered. Render and return are left out: a refusal sentence names what is rendered or returned. */
const SERVED_TERM = /\b(?:serv(?:e|es|ed|ing)|admit(?:s|ted|ting)?|available|supported|enabled|expos(?:e|es|ed|ing)|offer(?:s|ed|ing)?|provid(?:e|es|ed|ing)|deliver(?:s|ed|ing)?)\b/i;
/** Sentence units: a sentence end before whitespace, a blank line, or a line opening a list item, heading, table row or quote. */
const SENTENCE_BREAK = /(?<=[.!?])\s+|\n\s*\n|\n(?=\s*(?:[-*+]\s|\d+[.)]\s|#|\||>))/;
/** The named character references the normalized view decodes beside every numeric one, as name=code points (hex): every HTML5
 * name written with its ";" whose value, its format characters removed and NFKC applied, is empty or holds an ASCII letter, digit or
 * "_", white space, or a mark SEP, JOINT or SENTENCE_BREAK reads ("." "!" "?" "\" "*" "`" "~" "-" or a dash look-alike) - 309 of the
 * table's 2125 such names - then the 10 names of the markup characters & < > " ' and ":". Read off Python 3.12.15
 * html.entities.html5 by the cutting seat (the roster's basis; M5 pins the list's size and digest); the census does not re-read the
 * HTML5 table. No HTML5 name spells a SPECULATIVE_TERM or a SERVED_TERM, and every other name's value, so folded, holds only
 * characters none of these patterns reads, so the view reads any other name as written and still makes every hit its decoded value
 * would make. */
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
/** One NAMED_REFERENCE_LIST entry as [name, value]. */
function namedReference(entry: string): [string, string] {
  const at = entry.indexOf("=");
  return [entry.slice(0, at), entry.slice(at + 1).split(" ").map(hex => String.fromCodePoint(Number.parseInt(hex, 16))).join("")];
}
const NAMED_REFERENCES: ReadonlyMap<string, string> = new Map(NAMED_REFERENCE_LIST.map(namedReference));
/** A2's needles: the scenario flag and the distinctive marker spellings, read inside any literal; the generic key words read only
 * as a whole literal (a src string is free to say "scenario" in a longer sentence). */
const SRC_CONTAINED = ["--scenario", "rendered_speculative_view", "rf.scenario_id", "rf.epistemic_status", "rf.whatif_notice", "WHAT-IF VIEW"];
const SRC_EXACT = ["speculative", "scenario_id", "scenario"];
/** The src walk A2 reads: 116 .ts modules at base dc72a6d (floor 100); its anchor is the carrier's contract literal. */
const SRC_ROOT = { root: "src", floor: 100, anchorFile: "src/workbench/providers/reactivefiber.ts", anchorToken: "context.render --no-commit" };
/** The docs walk C reads: 72 markdown pages and 5919 raw sentence units at base dc72a6d (floors 60 and 4000). Its anchor is the
 * frozen TRACEABILITY page (rule 13), whose "served-model journey" sentence keeps C1's served half live on today's docs. */
const DOCS_ROOT = { root: "docs/workbench", floor: 60, sentenceFloor: 4000, anchorFile: "docs/workbench/TRACEABILITY.md", anchorToken: "served-model journey" };
/** C2's allowlist, frozen (wb-km7q.9): the three sentences of docs/18's "RF speculation boundary:" paragraph that name rf's
 * speculation policy - its passive default, the RF_ADAPTIVE seat no Pi-launched rf receives, and the tighten-only rule for a
 * future Pi declaration - each as the C walk reads it, first in the raw view, then in the normalized view (INLINE_MARKS drops the
 * label's opening "**", the closing one follows a colon and stays, and every code span's backticks). None names a SERVED_TERM,
 * so C1 judges each quiet; none is about speculative RF context. */
const DOCS_SPECULATIVE_SENTENCES: readonly string[] = [
  "**RF speculation boundary:** rf's local default speculation policy stays passive/disabled and Pi documents no other default.",
  "rf 0.1.845 ships `ResourceBrokerLimits` and `SpeculationBoundary` as values its host resource broker reads, with no CLI surface, and the one way an rf process opts into its speculative policy is the process-scoped `RF_ADAPTIVE` seat, which no rf child Pi launches receives: that child's environment holds only the `RF_CHILD_ENV_ALLOWLIST` names of `src/workbench/process-env.ts`.",
  "Any Pi-declared SpeculationBoundary or broker-limit configuration may only tighten ResourceBrokerLimits and never overrides Pi host hard caps, the 60 s render deadline and the 256 KiB stdout and stderr bounds of `src/workbench/providers/reactivefiber.ts`.",
  "RF speculation boundary:** rf's local default speculation policy stays passive/disabled and Pi documents no other default.",
  "rf 0.1.845 ships ResourceBrokerLimits and SpeculationBoundary as values its host resource broker reads, with no CLI surface, and the one way an rf process opts into its speculative policy is the process-scoped RF_ADAPTIVE seat, which no rf child Pi launches receives: that child's environment holds only the RF_CHILD_ENV_ALLOWLIST names of src/workbench/process-env.ts.",
  "Any Pi-declared SpeculationBoundary or broker-limit configuration may only tighten ResourceBrokerLimits and never overrides Pi host hard caps, the 60 s render deadline and the 256 KiB stdout and stderr bounds of src/workbench/providers/reactivefiber.ts.",
];
/** The two tiers that hold a result to the SCG-R11 roster through diffAgainstRoster. */
const LIVE_TIER = { file: "test/workbench-native-rf-preview.test.ts", config: "vitest.rf.config.ts", command: "rf-preview" };
const FIXTURE_TIER = "test/workbench-rf-result-fixture.test.ts";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(trigger, as it reaches Pi) Pi's preview arms never request a speculative render: the contractSource carrier states the context.render --no-commit contract, names no --scenario and pins the SCG-R11 roster's release, beside RFCLI's measured first --scenario release, and no src module literal spells the scenario flag or a speculative marker",
    pins: ["A1", "A2"],
  },
  {
    id: "B",
    label: "the SCG-R11 roster diff's freeze-and-flip tripwire: a result naming rendered_speculative_view, a scenario key or a speculative label fails diffAgainstRoster under the captured, a re-captured and the constructed roster alike, the clean fixture staying quiet and both tiers routing through it",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6", "B7"],
  },
  {
    id: "C",
    label: "docs census: no docs/workbench sentence presents what-if or speculative RF context as served",
    pins: ["C1", "C2"],
  },
  {
    id: "M",
    label: "the matchers rows A to C read: M1-M6 the spellings each must catch and pass, Q1-Q13 the pinned quiet rows of the named residuals",
    pins: ["M1", "M2", "M3", "M4", "M5", "M6", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13"],
  },
];

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Measured {
  /** Pi's pin at this cut's base (provenance only; nothing asserts it, so a re-pin moves nothing here). */
  readonly pinAtCutRelease: string;
  readonly pinAtCutCommit: string;
  readonly firstServingRelease: string;
  readonly firstServingCommit: string;
  readonly installedRelease: string;
  readonly installedSchemaSha256: string;
}
interface Roster {
  readonly bead: string;
  readonly basis: string;
  readonly measured: Measured;
  readonly citations: readonly string[];
  readonly scenarioResultKeys: readonly string[];
  readonly markerKeys: readonly string[];
  readonly labelValues: readonly string[];
  readonly labelTextPrefix: string;
  readonly scenarioSample: JsonObject;
  /** The captured --scenario render's one block, its two metadata markers included. */
  readonly scenarioBlock: JsonObject;
  readonly docsSpeculativeSentences: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  /** Every pin's `${pin}:${assertionCalls}` at the end of its case, in row order. */
  readonly reached: readonly string[];
}
const ROSTER_FIELDS = [
  "bead", "basis", "measured", "citations", "scenarioResultKeys", "markerKeys", "labelValues", "labelTextPrefix", "scenarioSample",
  "scenarioBlock", "docsSpeculativeSentences", "rows", "tests", "reached",
];
const MEASURED_FIELDS = ["pinAtCutRelease", "pinAtCutCommit", "firstServingRelease", "firstServingCommit", "installedRelease", "installedSchemaSha256"];

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) throw new Error(`roster ${field} must be a non-empty string`);
  return value;
}
function json(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}
function objectAt(value: Json | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
/** A list of strings, or nothing: how a vocabulary the helper does not export reads. */
function listOrNothing(value: unknown): string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string") ? [...value] : [];
}

/** Parses the roster file afresh, refusing a missing or extra field and any field of the wrong shape by name. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw)) throw new Error("roster must be an object");
  const extra = Object.keys(raw).filter(key => !ROSTER_FIELDS.includes(key));
  const missing = ROSTER_FIELDS.filter(key => !Object.hasOwn(raw, key));
  if (extra.length > 0 || missing.length > 0) throw new Error(`roster fields: missing ${missing.join(", ") || "none"}; extra ${extra.join(", ") || "none"}`);
  const measured = raw.measured;
  if (!isObject(measured) || Object.keys(measured).length !== MEASURED_FIELDS.length || !MEASURED_FIELDS.every(key => typeof measured[key] === "string")) {
    throw new Error(`roster measured must hold exactly the string fields ${MEASURED_FIELDS.join(", ")}`);
  }
  if (!Array.isArray(raw.rows)) throw new Error("roster rows must be a list");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  if (!isObject(raw.scenarioSample) || !isObject(raw.scenarioBlock)) throw new Error("roster scenarioSample and scenarioBlock must be objects");
  return {
    bead: text(raw.bead, "bead"),
    basis: text(raw.basis, "basis"),
    measured: {
      pinAtCutRelease: text(measured.pinAtCutRelease, "measured.pinAtCutRelease"), pinAtCutCommit: text(measured.pinAtCutCommit, "measured.pinAtCutCommit"),
      firstServingRelease: text(measured.firstServingRelease, "measured.firstServingRelease"), firstServingCommit: text(measured.firstServingCommit, "measured.firstServingCommit"),
      installedRelease: text(measured.installedRelease, "measured.installedRelease"), installedSchemaSha256: text(measured.installedSchemaSha256, "measured.installedSchemaSha256"),
    },
    citations: strings(raw.citations, "citations"),
    scenarioResultKeys: strings(raw.scenarioResultKeys, "scenarioResultKeys"),
    markerKeys: strings(raw.markerKeys, "markerKeys"),
    labelValues: strings(raw.labelValues, "labelValues"),
    labelTextPrefix: text(raw.labelTextPrefix, "labelTextPrefix"),
    scenarioSample: objectAt(json(raw.scenarioSample), "roster scenarioSample"),
    scenarioBlock: objectAt(json(raw.scenarioBlock), "roster scenarioBlock"),
    docsSpeculativeSentences: strings(raw.docsSpeculativeSentences, "docsSpeculativeSentences"),
    rows,
    tests: strings(raw.tests, "tests"),
    reached: strings(raw.reached, "reached"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The clean full-shape --no-commit result (test/helpers/rf-render-fixture.ts fullShapeRf), a fresh copy per call. */
function cleanResult(): JsonObject {
  return objectAt(json(objectAt(rfFixture.fullShapeRf(WORKSPACE), "fullShapeRf").result), "fullShapeRf result");
}
/** One of the nine members as the roster's measured sample states it, a fresh copy. */
function sampleMember(key: string): Json {
  const value = ROSTER.scenarioSample[key];
  if (value === undefined) throw new Error(`the roster's scenarioSample holds no ${key}`);
  return json(value);
}
/** The scenario id the sample's speculative member names. */
function sampleScenarioId(): string {
  const id = objectAt(sampleMember("speculative"), "scenarioSample.speculative").scenario_id;
  if (typeof id !== "string") throw new Error("the sample's speculative member names no scenario_id");
  return id;
}
/** The fixture block as rf stamps it under a scenario: the two host markers in its metadata. */
function labeledBlock(status: string): JsonObject {
  return { ...rfFixture.rfFixtureBlock(), metadata: { "rf.scenario_id": sampleScenarioId(), "rf.epistemic_status": status } };
}
/** The notice line of the sample's notice block. */
function noticeLine(): string {
  const content = objectAt(sampleMember("notice"), "scenarioSample.notice").content;
  if (typeof content !== "string") throw new Error("the sample's notice block carries no content line");
  return content;
}
/** The whole --scenario result shape as the capture places it: the clean result with the nine captured members, the captured
 * block (its two metadata markers) as result.blocks and output.text opening with the notice line; the notice block itself sits in
 * result.notice only. */
function scenarioResult(): JsonObject {
  const clean = cleanResult();
  const output = objectAt(clean.output, "result.output");
  const members: JsonObject = Object.fromEntries(ROSTER.scenarioResultKeys.map(key => [key, sampleMember(key)]));
  return { ...clean, output: { ...output, text: `${noticeLine()}\n${String(output.text)}` }, blocks: [json(ROSTER.scenarioBlock)], ...members };
}
function failuresOf(roster: rfFixture.RfResultRoster, result: JsonObject): string[] {
  return [...rfFixture.diffAgainstRoster(roster, result).failures];
}

/** An HTML comment as a browser closes it: "<!--" through the first "-->" or "--!>", or the empty "<!-->" and "<!--->". */
const HTML_COMMENT = /<!--(?:-?>|[\s\S]*?--!?>)/g;
/** A bogus comment, read after HTML_COMMENT as an HTML5 tokenizer reads "<!" (a declaration, a DOCTYPE or a CDATA section),
 * "<?" (a processing instruction) or "</" before anything but a letter: through its first ">", so "<?a>b?>" leaves "b?>" shown
 * and "</>" goes whole. */
const BOGUS_COMMENT = /<(?:[!?]|\/(?![A-Za-z]))[^>]*>/g;
/** The white space an HTML5 tokenizer reads between a tag's parts: tab, line feed, form feed, carriage return and space. */
const TAG_SPACE: ReadonlySet<string> = new Set(["\t", "\n", "\f", "\r", " "]);
/** A tag's tokenizer states (the HTML Standard's tag name, attribute and self-closing states). */
type TagState = "tagName" | "beforeName" | "attrName" | "afterName" | "beforeValue" | "doubleQuoted" | "singleQuoted" | "unquoted" | "afterQuoted" | "selfClosing";
/** The index just past the ">" that closes the tag opening at `start` ("<" or "</", then a letter), read as an HTML5 tokenizer
 * reads it: only an attribute value after "=" is quoted (a '"' or "'" opens it, the same quote closes it), so a ">" inside a
 * quoted value does not close the tag, while a quote anywhere else and an "=" that opens an attribute name (<a ="x>) are
 * ordinary characters of the tag; -1 when the text ends first (a browser then shows nothing of the rest). */
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
/** The text with every tag removed: each "<" or "</" before a letter through the ">" tagEnd finds. A tag the text ends inside
 * (a quoted value that never closes) is kept as written: a browser shows nothing of the rest, so there the view reads more than
 * the page, never less. */
function withoutTags(text: string): string {
  let kept = "";
  let from = 0;
  for (let at = text.indexOf("<"); at >= 0; at = text.indexOf("<", at + 1)) {
    const end = /^<\/?[A-Za-z]/.test(text.slice(at, at + 3)) ? tagEnd(text, at) : -1;
    if (end < 0) continue;
    kept += text.slice(from, at);
    from = end;
    at = end - 1;
  }
  return kept + text.slice(from);
}
/** A code span on one line, as marked 18.0.11's codespan rule reads one there: a backtick string that no backtick and no odd run
 * of backslashes precedes (an even run is escaped backslashes, so a code span still opens after it), a content that neither
 * opens nor closes with a backtick, then the first backtick string of the same length. */
const CODE_SPAN = /(?<!`)(?<!(?<!\\)\\(?:\\\\)*)(`+)(?!`)([^`\n]|[^`\n][^\n]*?[^`\n])\1(?!`)/g;
/** A code span's rendered text, as marked renders it: its content, less one space at each end when the content both opens and
 * closes with a space and is not all spaces (CommonMark's padding rule); a tab or any other white space is never stripped. */
function codeSpanText(content: string): string {
  return content.startsWith(" ") && content.endsWith(" ") && /[^ ]/.test(content) ? content.slice(1, -1) : content;
}
/** An inline mark beside a letter or digit, read after CODE_SPAN: a run of "*", "~" or "`" that a letter or digit precedes or
 * follows. marked 18.0.11 renders such a run inside a word as emphasis or strikethrough (spec*ul*ative shows as one word), so the
 * normalized view removes it before any reference is decoded (a reference is never markup); an unpaired run there, or a backtick
 * a code span shows (spec`` `ul` ``ative), is removed too, an over-read that can only join, and "_" stays, as marked shows an
 * intraword "_" as written. */
const INLINE_MARKS = /[*~`]+(?=[\p{L}\p{N}])|(?<=[\p{L}\p{N}])[*~`]+/gu;
/** A numeric character reference, decimal or hex, with or without its ";": an HTML5 parser decodes one written without it
 * (spe&#99ulative inside an HTML block), consuming every digit. */
const NUMERIC_REFERENCE = /&#(?:([0-9]+)|[xX]([0-9A-Fa-f]+));?/g;
/** The Windows-1252 code points an HTML5 parser puts in place of a numeric reference to 0x80-0x9F (the HTML Standard's numeric
 * character reference end state), so what&#150;if shows an en dash; the five codes it leaves as they are (0x81, 0x8D, 0x8F,
 * 0x90, 0x9D) are not listed. */
const C1_REFERENCES: ReadonlyMap<number, number> = new Map([
  [0x80, 0x20ac], [0x82, 0x201a], [0x83, 0x0192], [0x84, 0x201e], [0x85, 0x2026], [0x86, 0x2020], [0x87, 0x2021], [0x88, 0x02c6],
  [0x89, 0x2030], [0x8a, 0x0160], [0x8b, 0x2039], [0x8c, 0x0152], [0x8e, 0x017d], [0x91, 0x2018], [0x92, 0x2019], [0x93, 0x201c],
  [0x94, 0x201d], [0x95, 0x2022], [0x96, 0x2013], [0x97, 0x2014], [0x98, 0x02dc], [0x99, 0x2122], [0x9a, 0x0161], [0x9b, 0x203a],
  [0x9c, 0x0153], [0x9e, 0x017e], [0x9f, 0x0178],
]);
/** The decoded value of a numeric character reference as an HTML5 parser decodes it: U+FFFD for 0, a surrogate or a value past
 * 0x10FFFF, the C1_REFERENCES code point for one it lists, otherwise the code point itself. */
function codePoint(code: number): string {
  if (!Number.isSafeInteger(code) || code === 0 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) return String.fromCodePoint(0xfffd);
  return String.fromCodePoint(C1_REFERENCES.get(code) ?? code);
}
/** The code points a page shows as nothing: format characters (zero-width, bidi, the soft hyphen) and the other
 * default-ignorable code points (the combining grapheme joiner, the variation selectors). */
const INVISIBLE = /[\p{Cf}\p{Default_Ignorable_Code_Point}]/gu;
/** The normalized view: the text marked 18.0.11 and an HTML5 parser show of a page, for exactly the forms M5 and READ_FORMS (M6)
 * read, built in this order: HTML_COMMENT and BOGUS_COMMENT removed, then every tag (withoutTags), the HTML a browser drops;
 * each CODE_SPAN replaced by its codeSpanText; the INLINE_MARKS left removed; every NUMERIC_REFERENCE decoded by
 * codePoint, then the NAMED_REFERENCES; backslash escapes resolved; INVISIBLE code points removed; NFKC applied. So emphasis,
 * strikethrough, a code span on one line, a comment, a bogus comment, a tag, a numeric reference, a listed named reference or an
 * invisible code point inside a word cannot split it. Where marked shows such a form as written (it escapes the run, or a code
 * span shows it) the view still removes or decodes it, so it reads joined what the page shows split: READ_FORMS' over-read
 * rows, the over-reads that can only join. Not read, each a named residual with its pinned quiet row: a look-alike letter
 * (R-HOMOGLYPH, Q8), a link or an image inside a word (R-INTRAWORD-LINK, Q9), a legacy name written without its ";"
 * (R-LEGACY-REFERENCE, Q10), a code span across a line ending (R-MULTILINE-CODE-SPAN, Q11), an element a browser hides
 * (R-HIDDEN-CONTENT, Q12) and a term inside a tag-like run marked shows as written (R-ESCAPED-MARKUP, Q13). */
function normalized(body: string): string {
  return withoutTags(body.replace(HTML_COMMENT, "").replace(BOGUS_COMMENT, ""))
    .replace(CODE_SPAN, (_match, _run: string, content: string) => codeSpanText(content))
    .replace(INLINE_MARKS, "")
    .replace(NUMERIC_REFERENCE, (_match, decimal: string | undefined, hex: string | undefined) => codePoint(decimal === undefined ? Number.parseInt(hex ?? "", 16) : Number(decimal)))
    .replace(/&([A-Za-z][A-Za-z0-9]*);/g, (match, name: string) => NAMED_REFERENCES.get(name) ?? match)
    .replace(/\\([!-/:-@[-`{-~])/g, "$1")
    .replace(INVISIBLE, "")
    .normalize("NFKC");
}
/** The sentence units of a text in both views, each with the view it was read in. */
function sentencesOf(body: string): { view: string; sentence: string }[] {
  const split = (view: string, source: string): { view: string; sentence: string }[] =>
    source.split(SENTENCE_BREAK).map(sentence => sentence.replace(/\s+/g, " ").trim()).filter(sentence => sentence.length > 0).map(sentence => ({ view, sentence }));
  return [...split("raw", body), ...split("normalized", normalized(body))];
}
/** C1's judge: a sentence names a what-if or speculative term and a served term together. */
const presentsServed = (sentence: string): boolean => SPECULATIVE_TERM.test(sentence) && SERVED_TERM.test(sentence);
/** The two docs verdicts of a text: C1 (a served speculative sentence) and C2 (any speculative sentence). */
function docsVerdict(body: string): { c1: boolean; c2: boolean } {
  const units = sentencesOf(body);
  return { c1: units.some(entry => presentsServed(entry.sentence)), c2: units.some(entry => SPECULATIVE_TERM.test(entry.sentence)) };
}

/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing tracked. */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files.sort();
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** Every regular file git sees below a root - tracked or untracked, ignored ones included, as a filesystem walk sees them - as
 * sorted repository-relative paths ending in `extension`: the walk anchor outside this census. */
function gitListed(root: string, extension: string): string[] {
  const listing = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--", root], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const isFile = (path: string): boolean => {
    try {
      return lstatSync(join(REPO, path)).isFile();
    } catch {
      return false;
    }
  };
  return [...new Set(listing.split("\0"))].filter(path => path !== "" && path.endsWith(extension) && isFile(path)).sort();
}
/** A walk's reading, sorted, holds exactly git's listing. */
function sameList(read: readonly string[], listed: readonly string[]): boolean {
  const sorted = [...read].sort();
  return sorted.length === listed.length && sorted.every((path, index) => path === listed[index]);
}

/** One module's string literals (cooked) and every template's literal parts joined by "<expr>", read through the TypeScript
 * parser so an escape is read as the value it cooks to. */
function literalsOf(fileName: string, source: string): string[] {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const literals: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) literals.push(node.text);
    if (ts.isTemplateExpression(node)) literals.push([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join("<expr>"));
    ts.forEachChild(node, visit);
  };
  visit(file);
  return literals;
}
/** A2's reading of one literal: the needles it spells. */
function srcNeedles(literal: string): string[] {
  return [...SRC_CONTAINED.filter(needle => literal.includes(needle)), ...SRC_EXACT.filter(needle => literal === needle)];
}
/** Calls of a named function in one module (an identifier callee). */
function callsOf(fileName: string, source: string, name: string): number {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let calls = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === name) calls += 1;
    ts.forEachChild(node, visit);
  };
  visit(file);
  return calls;
}

/** One src module A2 reads: its repository path and its text. */
interface SourceUnit {
  readonly path: string;
  readonly text: string;
}
/** One sentence unit C1 and C2 read: its page, its view and its text. */
interface DocsUnit {
  readonly file: string;
  readonly view: string;
  readonly sentence: string;
}

/** Every sentence of docs/workbench in both views, with its file, after the floors and the anchor are read. */
function docsSentences(): { floorMet: boolean; sentenceFloorMet: boolean; anchorRead: boolean; servedSentences: boolean; read: string[]; sentences: DocsUnit[] } {
  const files = filesBelow(join(REPO, DOCS_ROOT.root)).filter(file => file.endsWith(".md"));
  const read: string[] = [];
  const sentences = files.flatMap(file => {
    const name = relative(REPO, file);
    read.push(name);
    return sentencesOf(textOf(file)).map(entry => ({ file: name, ...entry }));
  });
  const anchor = join(REPO, DOCS_ROOT.anchorFile);
  const raw = sentences.filter(entry => entry.view === "raw");
  return {
    floorMet: files.length >= DOCS_ROOT.floor,
    sentenceFloorMet: raw.length >= DOCS_ROOT.sentenceFloor,
    anchorRead: files.includes(anchor) && textOf(anchor).includes(DOCS_ROOT.anchorToken),
    servedSentences: sentences.some(entry => entry.file === DOCS_ROOT.anchorFile && SERVED_TERM.test(entry.sentence)),
    read,
    sentences,
  };
}

/** A2's judge over modules, the real walk's and any planted after them: every needle a module's literals spell, as "path: needle". */
function srcHits(units: readonly SourceUnit[]): string[] {
  return units.flatMap(unit => literalsOf(unit.path, unit.text).flatMap(literal => srcNeedles(literal).map(needle => `${unit.path}: ${needle}`)));
}
/** C1's judge over sentence units, the real walk's and any planted after them: each unit naming a speculative and a served term. */
function servedHits(units: readonly DocsUnit[]): string[] {
  return units.filter(entry => presentsServed(entry.sentence)).map(entry => `${entry.file} (${entry.view}): ${entry.sentence.slice(0, 160)}`);
}
/** C2's judge over sentence units and an allowlist: each distinct unit naming a speculative term the allowlist does not hold. */
function speculativeHits(units: readonly DocsUnit[], allowed: ReadonlySet<string>): string[] {
  const named = units.filter(entry => SPECULATIVE_TERM.test(entry.sentence));
  return [...new Set(named.filter(entry => !allowed.has(entry.sentence)).map(entry => `${entry.file}: ${entry.sentence.slice(0, 160)}`))];
}
/** C2's stale-entry judge over sentence units and an allowlist: each allowlisted sentence no unit matches, in allowlist order. */
function staleAllowed(units: readonly DocsUnit[], allowed: ReadonlySet<string>): string[] {
  return [...allowed].filter(sentence => !units.some(entry => entry.sentence === sentence));
}
/** A2's plant, judged after the real modules: an rf launch whose literals spell the scenario flag. */
const SRC_PLANT: SourceUnit = { path: "planted/scenario-arm.ts", text: 'spawn("rf", ["context", "render", "--scenario", plan]);' };
/** C1's and C2's plant, judged after the real pages: a served speculative sentence, a speculative sentence C2's planted run allows,
 * and a served sentence naming no speculative term. */
const DOCS_PLANT = { file: "planted/speculative-context.md", served: "Pi serves speculative RF context.", allowed: "A what-if view is labeled.", quiet: "Pi serves validated RF context." };
/** The planted page's sentence units in both views. */
function plantedDocsUnits(): DocsUnit[] {
  return sentencesOf([DOCS_PLANT.served, DOCS_PLANT.allowed, DOCS_PLANT.quiet].join("\n\n")).map(entry => ({ file: DOCS_PLANT.file, ...entry }));
}

/** One READ_FORMS row: how the rendered page shows its text, the form it spells and the text. */
interface ReadForm {
  readonly page: "joined" | "split" | "over-read";
  readonly form: string;
  readonly text: string;
}
/** M6's enumeration (wb-eu94), each text with how marked 18.0.11 and an HTML5 parser show it: "joined" is one word on the
 * rendered page, so the normalized view must read it in C1 and C2 (the wb-dkru gate's F1 plants first, then its F3 plants, then
 * the siblings of each form); "split" is a split word on the page that the view keeps split; "over-read" is a form marked shows
 * as written (it escapes the run, or a code span shows it) that the view still removes or decodes, so it reads joined, an
 * over-read that can only join. The cutting seat measured every page reading through marked 18.0.11 and parse5 7.1.2 (the
 * roster's basis); the census does not re-render. The two invisible code points are built from their code points. */
const READ_FORMS: readonly ReadForm[] = [
  { page: "joined", form: "padded code span", text: "Pi serves spec` ul `ative RF context." },
  { page: "joined", form: "padded code span of two backticks", text: "Pi serves spec`` ul ``ative RF context." },
  { page: "joined", form: "decimal reference without its ; in a p block", text: "<p>Pi serves spe&#99ulative RF context.</p>" },
  { page: "joined", form: "hex reference without its ; in a p block", text: "<p>Pi serves spe&#x63ulative RF context.</p>" },
  { page: "joined", form: "decimal soft hyphen without its ; in a p block", text: "<p>Pi serves spec&#173ulative RF context.</p>" },
  { page: "joined", form: "hex soft hyphen without its ; in a p block", text: "<p>Pi serves spec&#xADulative RF context.</p>" },
  { page: "joined", form: "decimal reference without its ; in a div block", text: "<div>Pi serves spe&#99ulative RF context.</div>" },
  { page: "joined", form: "tag whose double-quoted value holds >", text: 'Pi serves spec<span title="a>b">ul</span>ative RF context.' },
  { page: "joined", form: "processing instruction", text: "Pi serves spec<?x?>ulative RF context." },
  { page: "joined", form: "CDATA section", text: "Pi serves spec<![CDATA[]]>ulative RF context." },
  { page: "joined", form: "padded code span opening a word", text: "Pi serves ` spec `ulative RF context." },
  { page: "joined", form: "padded code span closing a word", text: "Pi serves spec` ulative ` RF context." },
  { page: "joined", form: "padded code span holding the joint", text: "Pi serves the what` - `if view." },
  { page: "joined", form: "padded code span holding a backtick", text: "Pi serves the what`` ` ``if view." },
  { page: "joined", form: "padded code span after an escaped backslash", text: "Pi serves \\\\` spec `ulative RF context." },
  { page: "joined", form: "tag whose single-quoted value holds >", text: "Pi serves spec<x-y data-v='1>2'>ul</x-y>ative RF context." },
  { page: "joined", form: "tag whose quoted value holds > across a line", text: 'Pi serves spec<span\ntitle="a>b">ul</span>ative RF context.' },
  { page: "joined", form: "tag outside marked's grammar in a div block", text: '<div>Pi serves spec<span @click="a>b">ul</span>ative RF context.</div>' },
  { page: "joined", form: "tag holding a quote that opens no value, in a div block", text: "<div>Pi serves spec<span a'b>ul</span>ative RF context, 'a' says.</div>" },
  { page: "joined", form: "attribute after a quoted value with no space, in a div block", text: '<div>Pi serves spec<span a="1"b="x>y">ul</span>ative RF context.</div>' },
  { page: "joined", form: "attribute after a slash, in a div block", text: '<div>Pi serves spec<span/title="a>b">ul</span>ative RF context.</div>' },
  { page: "joined", form: "spaced = before a single-quoted value, in a div block", text: "<div>Pi serves spec<span title = 'a>b'>ul</span>ative RF context.</div>" },
  { page: "joined", form: "unquoted value holding a quote, in a div block", text: '<div>Pi serves spec<span title=a"b>ul</span>ative RF context.</div>' },
  { page: "joined", form: "declaration", text: "Pi serves spec<!x y>ulative RF context." },
  { page: "joined", form: "DOCTYPE", text: "Pi serves spec<!DOCTYPE html>ulative RF context." },
  { page: "joined", form: "comment holding >", text: "Pi serves spec<!-- a > b -->ulative RF context." },
  { page: "joined", form: "empty comment <!--> before a later comment", text: "Pi serves spec<!-->ulative RF context.<!-- b -->" },
  { page: "joined", form: "empty comment <!--->", text: "Pi serves spec<!--->ulative RF context." },
  { page: "joined", form: "comment holding > closed by --!> in a div block", text: "<div>Pi serves spec<!-- a > b --!>ulative RF context.</div>" },
  { page: "joined", form: "processing instruction without ?> in a div block", text: "<div>Pi serves spec<?x>ulative RF context.</div>" },
  { page: "joined", form: "declaration without white space in a div block", text: "<div>Pi serves spec<!x>ulative RF context.</div>" },
  { page: "joined", form: "end tag of no name in a div block", text: "<div>Pi serves spec</>ulative RF context.</div>" },
  { page: "joined", form: "end tag opening with a digit in a div block", text: "<div>Pi serves spec</1>ulative RF context.</div>" },
  { page: "joined", form: "decimal reference to 0x96, an en dash", text: "Pi serves the what&#150;if view." },
  { page: "joined", form: "decimal reference to 0x97, an em dash", text: "Pi serves the what&#151;if view." },
  { page: "joined", form: "hex reference to 0x85, an ellipsis", text: "Pi serves the scenario&#x85;view." },
  { page: "joined", form: "reference to 0x96 without its ; in a p block", text: "<p>Pi serves the what&#150if view.</p>" },
  { page: "joined", form: "decimal reference of seven digits", text: "Pi serves spe&#0000099;ulative RF context." },
  { page: "joined", form: "combining grapheme joiner", text: `Pi serves spec${String.fromCodePoint(0x034f)}ulative RF context.` },
  { page: "joined", form: "variation selector", text: `Pi serves spec${String.fromCodePoint(0xfe0f)}ulative RF context.` },
  { page: "split", form: "code span padded on one side", text: "Pi serves spec` ul`ative RF context." },
  { page: "split", form: "code span padded by two spaces", text: "Pi serves spec`  ul  `ative RF context." },
  { page: "split", form: "code span padded by tabs", text: "Pi serves spec`\tul\t`ative RF context." },
  { page: "split", form: "code span holding a space", text: "Pi serves spec` u l `ative RF context." },
  { page: "split", form: "code span of spaces", text: "Pi serves spec`   `ulative RF context." },
  { page: "split", form: "code span before a space", text: "Pi serves spec` ul ` ative RF context." },
  { page: "split", form: "escaped backtick", text: "Pi serves \\` spec `ulative RF context." },
  { page: "split", form: "unquoted value ended by >", text: "Pi serves spec<span title=a>b>ul</span>ative RF context." },
  { page: "split", form: "= opening an attribute name, in a div block", text: '<div>Pi serves spec<span ="x>y">ulative RF context.</div>' },
  { page: "split", form: "tag whose quoted value never closes", text: 'Pi serves spec<span title="a>ulative RF context.' },
  { page: "split", form: "processing instruction holding >", text: "Pi serves spec<?a>b?>ulative RF context." },
  { page: "split", form: "CDATA section holding >", text: "Pi serves spec<![CDATA[a>b]]>ulative RF context." },
  { page: "split", form: "reference to 0", text: "Pi serves spec&#0;ulative RF context." },
  { page: "split", form: "reference past 0x10FFFF", text: "Pi serves spec&#x110000;ulative RF context." },
  { page: "split", form: "reference to a surrogate", text: "Pi serves spec&#xD800;ulative RF context." },
  { page: "split", form: "decimal reference with no digits", text: "Pi serves spe&#ulative RF context." },
  { page: "split", form: "hex reference with no digits", text: "Pi serves spe&#x;ulative RF context." },
  { page: "split", form: "reference to 0x96 inside a word", text: "Pi serves spec&#150;ulative RF context." },
  { page: "over-read", form: "decimal reference without its ; in text", text: "Pi serves spe&#99ulative RF context." },
  { page: "over-read", form: "joint reference without its ; in text", text: "Pi serves the what&#45if view." },
  { page: "over-read", form: "decimal reference of eight digits in text", text: "Pi serves spe&#00000099;ulative RF context." },
  { page: "over-read", form: "declaration without white space in text", text: "Pi serves spec<!x>ulative RF context." },
  { page: "over-read", form: "processing instruction without ?> in text", text: "Pi serves spec<?x>ulative RF context." },
  { page: "over-read", form: "comment closed by --!> in text", text: "Pi serves spec<!-- a --!>ulative RF context." },
  { page: "over-read", form: "tag outside marked's grammar in text", text: 'Pi serves spec<span @click="a>b">ul</span>ative RF context.' },
  { page: "over-read", form: "backtick a code span shows", text: "Pi serves spec`` `ul` ``ative RF context." },
  { page: "over-read", form: "reference a code span shows", text: "Pi serves `spe&#99;ulative` RF context." },
  { page: "over-read", form: "end tag opening with a digit in text", text: "Pi serves spec</1>ulative RF context." },
];

/** A matcher's verdict on each control, asserted against the expected verdict; the list is the witness. */
function verdicts(judge: (body: string) => boolean, cases: readonly { readonly text: string; readonly hit: boolean }[]): Json {
  const read = cases.map(entry => ({ text: entry.text, hit: judge(entry.text) }));
  expect(read).toStrictEqual(cases.map(entry => ({ text: entry.text, hit: entry.hit })));
  return read;
}
/** The diff failures of each named result under the captured roster; the record is the witness. */
function diffRecord(cases: Readonly<Record<string, JsonObject>>): JsonObject {
  const roster = rfFixture.readRfResultRoster();
  return Object.fromEntries(Object.entries(cases).map(([name, result]) => [name, failuresOf(roster, result)]));
}

/** Each pin's case: it asserts what it pins and returns its witness, which the runner holds to the roster. */
const IMPL: Record<string, () => Json | Promise<Json>> = {
  A1: () => {
    const release = recordedRfRelease();
    const contract = REACTIVE_FIBER_CONTRACT_SOURCE.slice(`rf@${release}:`.length);
    const namesScenario = REACTIVE_FIBER_CONTRACT_SOURCE.includes("--scenario");
    const sameRelease = release === rfFixture.readRfResultRoster().rfVersion;
    const firstServingDotted = /^\d+\.\d+\.\d+$/.test(ROSTER.measured.firstServingRelease);
    expect({ contract, namesScenario, sameRelease, firstServingDotted }, "the carrier states the --no-commit render contract, names no --scenario and pins the SCG-R11 roster's release").toStrictEqual({
      contract: CONTRACT, namesScenario: false, sameRelease: true, firstServingDotted: true,
    });
    return { contract, namesScenario, sameRelease, firstServing: ROSTER.measured.firstServingRelease };
  },
  A2: () => {
    const files = filesBelow(join(REPO, SRC_ROOT.root)).filter(file => file.endsWith(".ts"));
    const units: SourceUnit[] = files.map(file => ({ path: relative(REPO, file), text: textOf(file) }));
    const read = units.map(unit => unit.path);
    const listed = gitListed(SRC_ROOT.root, ".ts");
    const hits = srcHits(units);
    const planted = srcHits([...units, SRC_PLANT]);
    const anchorRead = units.some(unit => unit.path === SRC_ROOT.anchorFile && literalsOf(unit.path, unit.text).some(literal => literal.includes(SRC_ROOT.anchorToken)));
    const floorMet = units.length >= SRC_ROOT.floor;
    expect(floorMet && anchorRead, `src walk: ${units.length} modules, anchor read ${anchorRead}`).toBe(true);
    expect([...read].sort(), "the A2 walk read exactly git's own listing of src/**/*.ts").toStrictEqual(listed);
    expect(hits).toEqual([]);
    expect(planted, "the same judge reads the planted module after the real ones: the plant's needle is its one hit").toStrictEqual([`${SRC_PLANT.path}: --scenario`]);
    return { floorMet, anchorRead, walkAgreesWithGit: sameList(read, listed), hits, planted };
  },
  B1: () => {
    const vocabulary = {
      resultKeys: listOrNothing(Reflect.get(rfFixture, "SPECULATIVE_RESULT_KEYS")),
      markerKeys: listOrNothing(Reflect.get(rfFixture, "SPECULATIVE_MARKER_KEYS")),
      labelValues: listOrNothing(Reflect.get(rfFixture, "SPECULATIVE_LABEL_VALUES")),
      textPrefix: String(Reflect.get(rfFixture, "SPECULATIVE_TEXT_PREFIX")),
    };
    expect(vocabulary, "the helper's tripwire vocabulary is the roster's measured one").toStrictEqual({
      resultKeys: [...ROSTER.scenarioResultKeys], markerKeys: [...ROSTER.markerKeys], labelValues: [...ROSTER.labelValues], textPrefix: ROSTER.labelTextPrefix,
    });
    expect(Object.keys(ROSTER.scenarioSample), "the measured sample holds exactly the nine members, in the schema's order").toStrictEqual([...ROSTER.scenarioResultKeys]);
    expect(noticeLine().startsWith(ROSTER.labelTextPrefix), "the sample's notice line opens with the measured prefix").toBe(true);
    expect(Object.keys(objectAt(ROSTER.scenarioBlock.metadata, "scenarioBlock.metadata")), "the captured block carries the two host markers").toStrictEqual(["rf.scenario_id", "rf.epistemic_status"]);
    return vocabulary;
  },
  B2: () => {
    const roster = rfFixture.readRfResultRoster();
    const constructed: rfFixture.RfResultRoster = { ...roster, source: "constructed" };
    const verdict = { captured: rfFixture.diffAgainstRoster(roster, cleanResult()), constructed: rfFixture.diffAgainstRoster(constructed, cleanResult()) };
    expect(verdict, "the clean full-shape fixture names no marker").toStrictEqual({ captured: { failures: [], extraResultKeys: [] }, constructed: { failures: [], extraResultKeys: [] } });
    return json(verdict);
  },
  B3: () => {
    const roster = rfFixture.readRfResultRoster();
    const rows = ROSTER.scenarioResultKeys.map(key => {
      const result = { ...cleanResult(), [key]: sampleMember(key) };
      const recaptured: rfFixture.RfResultRoster = { ...roster, resultKeys: [...roster.resultKeys, key] };
      const constructed: rfFixture.RfResultRoster = { ...roster, source: "constructed" };
      return { key, captured: failuresOf(roster, result), recaptured: failuresOf(recaptured, result), constructed: failuresOf(constructed, result) };
    });
    expect(rows.every(row => row.recaptured.length > 0 && row.constructed.length > 0), "a member trips the diff although a re-captured roster lists it or the roster is constructed").toBe(true);
    return rows;
  },
  B4: () => {
    const diff = rfFixture.diffAgainstRoster(rfFixture.readRfResultRoster(), scenarioResult());
    const speculative = diff.failures.filter(entry => entry.startsWith("speculative "));
    expect(speculative.length, "every marker of the --scenario shape is reported at its path").toBeGreaterThan(ROSTER.scenarioResultKeys.length);
    return { failures: [...diff.failures], extraResultKeys: [...diff.extraResultKeys] };
  },
  B5: () => {
    const clean = cleanResult();
    const record = diffRecord({
      designName: { ...clean, output: { ...objectAt(clean.output, "result.output"), rendered_speculative_view: "view" } },
      deep: { ...clean, plan: { operations: [{ step: { rendered_speculative_view: null } }], would_commit: false } },
      blockMarkers: { ...clean, blocks: [labeledBlock("observation")] },
      scenarioKeys: { ...clean, provenance: { ...objectAt(clean.provenance, "result.provenance"), scenario_id: sampleScenarioId() }, components: [{ scenario: {} }] },
    });
    expect(Object.values(record).every(failures => Array.isArray(failures) && failures.length > 0), "every any-depth marker key trips the diff").toBe(true);
    return record;
  },
  B6: () => {
    const clean = cleanResult();
    const record = diffRecord({
      noticeKey: { ...clean, blocks: [{ ...rfFixture.rfFixtureBlock(), key: ROSTER.labelValues[0] ?? "" }] },
      labelElsewhere: { ...clean, effects: [ROSTER.labelValues[0] ?? ""] },
      noticeLine: { ...clean, output: { ...objectAt(clean.output, "result.output"), text: noticeLine() } },
    });
    expect(Object.values(record).every(failures => Array.isArray(failures) && failures.length > 0), "every label trips the diff").toBe(true);
    return record;
  },
  B7: () => {
    const live = textOf(join(REPO, LIVE_TIER.file));
    const fixture = textOf(join(REPO, FIXTURE_TIER));
    const config = textOf(join(REPO, LIVE_TIER.config));
    const forge = textOf(join(REPO, "forge.toml"));
    const verdict = {
      live: {
        file: LIVE_TIER.file,
        calls: callsOf(LIVE_TIER.file, live, "diffAgainstRoster") >= 1,
        holdsFailuresEmpty: live.includes("expect(diff.failures).toStrictEqual([])"),
        tierSelects: literalsOf(LIVE_TIER.config, config).includes(LIVE_TIER.file) && forge.includes(`[build.commands.${LIVE_TIER.command}]\ncommand = "./node_modules/.bin/vitest run --config ${LIVE_TIER.config}"`),
      },
      fixture: { file: FIXTURE_TIER, calls: callsOf(FIXTURE_TIER, fixture, "diffAgainstRoster") >= 1 },
    };
    expect(verdict.live.calls && verdict.live.holdsFailuresEmpty && verdict.live.tierSelects && verdict.fixture.calls, "both tiers hold a result to the roster through diffAgainstRoster").toBe(true);
    return verdict;
  },
  C1: () => {
    const docs = docsSentences();
    const listed = gitListed(DOCS_ROOT.root, ".md");
    const hits = servedHits(docs.sentences);
    const planted = servedHits([...docs.sentences, ...plantedDocsUnits()]);
    expect(docs.floorMet && docs.sentenceFloorMet && docs.anchorRead && docs.servedSentences).toBe(true);
    expect([...docs.read].sort(), "the C walk read exactly git's own listing of docs/workbench/**/*.md").toStrictEqual(listed);
    expect(hits).toEqual([]);
    expect(planted, "the same judge reads the planted page after the real pages: its served speculative sentence, in both views, is its one hit").toStrictEqual(
      ["raw", "normalized"].map(view => `${DOCS_PLANT.file} (${view}): ${DOCS_PLANT.served}`),
    );
    return {
      floorMet: docs.floorMet, sentenceFloorMet: docs.sentenceFloorMet, anchorRead: docs.anchorRead, servedSentences: docs.servedSentences, walkAgreesWithGit: sameList(docs.read, listed), hits, planted,
    };
  },
  C2: () => {
    const docs = docsSentences();
    const listed = gitListed(DOCS_ROOT.root, ".md");
    const allowed = new Set(ROSTER.docsSpeculativeSentences);
    const hits = speculativeHits(docs.sentences, allowed);
    const stale = staleAllowed(docs.sentences, allowed);
    const planted = speculativeHits([...docs.sentences, ...plantedDocsUnits()], new Set([...allowed, DOCS_PLANT.allowed]));
    const stalePlanted = staleAllowed(docs.sentences, new Set([...allowed, DOCS_PLANT.allowed]));
    expect(docs.floorMet && docs.sentenceFloorMet && docs.anchorRead).toBe(true);
    expect([...docs.read].sort(), "the C walk read exactly git's own listing of docs/workbench/**/*.md").toStrictEqual(listed);
    expect(ROSTER.docsSpeculativeSentences).toEqual(DOCS_SPECULATIVE_SENTENCES);
    expect(hits).toEqual([]);
    expect(stale, "every allowlisted sentence is a unit the C walk reads: an entry no docs/workbench sentence matches is stale").toEqual([]);
    expect(planted, "the same judge reads the planted page after the real pages, the plant's what-if sentence allowed: the sentence it does not allow is its one hit").toStrictEqual([
      `${DOCS_PLANT.file}: ${DOCS_PLANT.served}`,
    ]);
    expect(stalePlanted, "the same stale-entry judge over the real pages, the plant's what-if sentence allowed but not planted: that sentence is its one stale entry").toStrictEqual([
      DOCS_PLANT.allowed,
    ]);
    return { floorMet: docs.floorMet, walkAgreesWithGit: sameList(docs.read, listed), allowed: [...allowed], hits, stale, planted, stalePlanted };
  },
  M1: () =>
    verdicts(body => docsVerdict(body).c2, [
      { text: "Pi serves speculative RF context.", hit: true },
      { text: "The what-if view is labeled.", hit: true },
      { text: "A WhatIf view opens the document.", hit: true },
      { text: "The WHAT-IF VIEW of scenario s opens the text.", hit: true },
      { text: "A what_if render.", hit: true },
      { text: "A hypothetical branch is read-only.", hit: true },
      { text: "A counterfactual render.", hit: true },
      { text: "rf context render --scenario plan.json", hit: true },
      { text: "The scenario overlay stays read-only.", hit: true },
      { text: "Speculatively rendered blocks.", hit: true },
      { text: "The uncertain-park scenario is not read.", hit: false },
      { text: "GraphPolicyCLI predictions and policy distributions.", hit: false },
      { text: "Component rendering, overlays, themes.", hit: false },
      { text: "What is served today?", hit: false },
      { text: "Whatever the reader admits.", hit: false },
      { text: "The scenarios list.", hit: false },
    ]),
  M2: () =>
    verdicts(body => SERVED_TERM.test(body), [
      { text: "Pi serves it.", hit: true },
      { text: "It is served.", hit: true },
      { text: "Serving it.", hit: true },
      { text: "The reader admits it.", hit: true },
      { text: "It was admitted.", hit: true },
      { text: "It is available.", hit: true },
      { text: "It is supported.", hit: true },
      { text: "It is enabled.", hit: true },
      { text: "It exposes it.", hit: true },
      { text: "It offers it.", hit: true },
      { text: "It provides it.", hit: true },
      { text: "It delivers it.", hit: true },
      { text: "It is reserved.", hit: false },
      { text: "It was observed.", hit: false },
      { text: "It is unavailable.", hit: false },
      { text: "It is preserved.", hit: false },
      { text: "rf renders it.", hit: false },
      { text: "It returns validation.", hit: false },
    ]),
  M3: () => {
    const clean = cleanResult();
    const record = diffRecord({
      topLevelMember: { ...clean, speculative: {} },
      nullMember: { ...clean, notice: null },
      topLevelMarkerKey: { ...clean, "rf.scenario_id": "id" },
      deepMarkerKey: { ...clean, components: [{ a: [{ b: { "rf.epistemic_status": "observation" } }] }] },
    });
    expect(Object.values(record).every(failures => Array.isArray(failures) && failures.some(entry => typeof entry === "string" && entry.startsWith("speculative "))), "each key placement trips").toBe(true);
    return record;
  },
  M4: () => {
    const clean = cleanResult();
    const output = objectAt(clean.output, "result.output");
    const record = diffRecord({
      exactValueDeep: { ...clean, components: [{ note: ROSTER.labelValues[0] ?? "" }] },
      noticeLineOpens: { ...clean, output: { ...output, text: `${ROSTER.labelTextPrefix}id: predictor versions none` } },
      nearValue: { ...clean, components: [{ note: `${ROSTER.labelValues[0] ?? ""}2` }] },
      nearPrefix: { ...clean, output: { ...output, text: "WHAT-IF VIEWER" } },
    });
    expect({ nearValue: record.nearValue, nearPrefix: record.nearPrefix }, "a label is read exactly: a near value or a near prefix trips nothing").toStrictEqual({ nearValue: [], nearPrefix: [] });
    return record;
  },
  M5: () => {
    const cases: readonly { readonly text: string; readonly c1: boolean; readonly c2: boolean }[] = [
      { text: "Pi serves spec*ul*ative RF context.", c1: true, c2: true },
      { text: "Pi serves spec**ul**ative RF context.", c1: true, c2: true },
      { text: "Pi serves spec&shy;ulative RF context.", c1: true, c2: true },
      { text: "Pi serves spec&ZeroWidthSpace;ulative RF context.", c1: true, c2: true },
      { text: "Pi serves spec***ul***ative RF context.", c1: true, c2: true },
      { text: "Pi serves spec~~ul~~ative RF context.", c1: true, c2: true },
      { text: "Pi serves spec`ul`ative RF context.", c1: true, c2: true },
      { text: "Pi serves spec&ZeroWidthSpace;*ul*ative RF context.", c1: true, c2: true },
      { text: "Pi serves spec&NoBreak;ulative RF context.", c1: true, c2: true },
      { text: "Pi serves &sopf;peculative RF context.", c1: true, c2: true },
      { text: "Pi serves specul&ordf;tive RF context.", c1: true, c2: true },
      { text: "Pi serves the what&mdash;if view.", c1: true, c2: true },
      { text: "Pi serves the scenario&emsp13;view.", c1: true, c2: true },
      { text: "Pi serves spec_ul_ative RF context.", c1: false, c2: false },
      { text: "Pi serves spec\\*ul\\*ative RF context.", c1: false, c2: false },
      { text: "Pi serves spec&ast;ul&ast;ative RF context.", c1: false, c2: false },
      { text: "Pi serves spec&emsp;ulative RF context.", c1: false, c2: false },
      { text: "Pi serves sp&eacute;culative RF context.", c1: false, c2: false },
    ];
    const read = cases.map(entry => ({ text: entry.text, ...docsVerdict(entry.text) }));
    expect(read, "the normalized view reads the rendered text: a mark or a named reference inside a word joins it (P-D16 to P-D19 first), a mark or a reference a reader sees shown stays").toStrictEqual(
      cases.map(entry => ({ text: entry.text, c1: entry.c1, c2: entry.c2 })),
    );
    const table = { names: NAMED_REFERENCES.size, listed: NAMED_REFERENCE_LIST.length, sha256: createHash("sha256").update(NAMED_REFERENCE_LIST.join("\n")).digest("hex") };
    expect(table.names, "each listed name is decoded, once").toBe(table.listed);
    return { read, table };
  },
  M6: () => {
    const read = READ_FORMS.map(entry => ({ ...entry, ...docsVerdict(entry.text) }));
    expect(read, "the normalized view reads every READ_FORMS row as its page reading says: joined and over-read rows in C1 and C2, split rows in neither").toStrictEqual(
      READ_FORMS.map(entry => ({ ...entry, c1: entry.page !== "split", c2: entry.page !== "split" })),
    );
    return read;
  },
  Q1: () => {
    const clean = cleanResult();
    const record = diffRecord({
      topLevel: { ...clean, epistemic_status: "hypothesis" },
      nested: { ...clean, blocks: [{ ...rfFixture.rfFixtureBlock(), epistemic_status: "predicted_distribution" }] },
      wordValue: { ...clean, components: [{ status: "predicted_distribution" }] },
    });
    expect(record, "R-EPISTEMIC: the bare epistemic_status word trips nothing here (wb-grmo.2's tripwire); a tripwire that now reads it re-reads this residual").toStrictEqual({
      topLevel: ["unexpected result.epistemic_status"], nested: [], wordValue: [],
    });
    return record;
  },
  Q2: () => {
    const verdict = { reworded: docsVerdict("Pi serves rf's predicted context to the agent."), spaced: docsVerdict("Pi serves the what if context rf renders.") };
    expect(verdict, "R-PARAPHRASE: a served claim without a speculative term, a spaced what if included, is not read").toStrictEqual({
      reworded: { c1: false, c2: false }, spaced: { c1: false, c2: false },
    });
    return verdict;
  },
  Q3: () => {
    const split = "Pi serves rf context. That context can be speculative.";
    const verdict = { sentences: sentencesOf(split).filter(entry => entry.view === "raw").length, ...docsVerdict(split) };
    expect(verdict, "R-SPLIT-SENTENCE: C1 misses a claim split in two, C2 catches its speculative half").toStrictEqual({ sentences: 2, c1: false, c2: true });
    return verdict;
  },
  Q4: () => {
    const read = (source: string): number => literalsOf("control.ts", source).flatMap(srcNeedles).length;
    const verdict = {
      literal: read('spawn("rf", ["context", "render", "--scenario", path]);'),
      exactWord: read('spawn("rf", ["context", "render", "--" + "scenario", path]);'),
      split: read('spawn("rf", ["context", "render", "--sce" + "nario", path]);'),
      template: read(["const flag = `--$", "{name}`;"].join("")),
    };
    expect(verdict, "R-COMPOSED-FLAG: a flag split below a needle, or computed, is invisible to A2").toStrictEqual({ literal: 1, exactWord: 1, split: 0, template: 0 });
    return verdict;
  },
  Q5: () => {
    const clean = cleanResult();
    const output = objectAt(clean.output, "result.output");
    const record = diffRecord({
      wordInText: { ...clean, output: { ...output, text: `context about a speculative plan and ${ROSTER.labelValues[0] ?? ""}` } },
      noticeNotOpening: { ...clean, output: { ...output, text: `context\n${noticeLine()}` } },
      blockContent: { ...clean, blocks: [{ ...rfFixture.rfFixtureBlock(), content: noticeLine() }] },
    });
    expect(record, "R-FREE-TEXT: a marker word or the notice line inside free text is not read").toStrictEqual({ wordInText: [], noticeNotOpening: [], blockContent: [] });
    return record;
  },
  Q6: () => {
    const clean = cleanResult();
    const record = diffRecord({
      respelledTop: { ...clean, Speculative: {} },
      respelledMarker: { ...clean, blocks: [{ ...rfFixture.rfFixtureBlock(), metadata: { rf_scenario_id: "id", "rf.Scenario_Id": "id" } }] },
      nestedMember: {
        ...clean,
        engine_metrics: { ...objectAt(clean.engine_metrics, "result.engine_metrics"), speculative: 0 },
        output: { ...objectAt(clean.output, "result.output"), notice: "n" },
        components: [{ labels: {} }],
      },
    });
    expect(record, "R-KEY-SPELLING-AND-PLACEMENT: a respelled key, or a generic-named member below the top level, is not read").toStrictEqual({
      respelledTop: ["unexpected result.Speculative"], respelledMarker: [], nestedMember: [],
    });
    return record;
  },
  Q7: () => {
    const roster = textOf(ROSTER_PATH);
    const rosterSpells = [...ROSTER.scenarioResultKeys, ...ROSTER.markerKeys, ...ROSTER.labelValues, ROSTER.labelTextPrefix].every(word => roster.includes(word));
    const scanned = [SRC_ROOT.root, DOCS_ROOT.root];
    const outside = ["test", ".beads", "README.md", "AGENTS.md", "CHANGELOG.md", "docs/rpc.md", "docs/workflows.md"].every(path => !scanned.some(root => path === root || path.startsWith(`${root}/`)));
    expect({ rosterSpells, outside }, "R-SCOPE: the roster spells every marker and no scanned root reads it").toStrictEqual({ rosterSpells: true, outside: true });
    return { rosterSpells, scanned, outside };
  },
  Q8: () => {
    const cyrillicIe = String.fromCodePoint(0x0435);
    const fullwidthS = String.fromCodePoint(0xff53);
    const verdict = {
      lookAlike: docsVerdict(`Pi serves sp${cyrillicIe}culative RF context.`),
      fullwidth: docsVerdict(`Pi serves ${fullwidthS}peculative RF context.`),
    };
    expect(verdict, "R-HOMOGLYPH: a look-alike letter NFKC does not fold escapes; a compatibility form it folds is caught").toStrictEqual({
      lookAlike: { c1: false, c2: false }, fullwidth: { c1: true, c2: true },
    });
    return verdict;
  },
  Q9: () => {
    const read = ["Pi serves spec[ul](./notes.md)ative RF context.", "Pi serves spec![ul](./ul.png)ative RF context."].map(text => ({ text, ...docsVerdict(text) }));
    expect(read.map(({ c1, c2 }) => ({ c1, c2 })), "R-INTRAWORD-LINK: a link or an image inside a word, its text or alt between the brackets, is not resolved").toStrictEqual([
      { c1: false, c2: false }, { c1: false, c2: false },
    ]);
    return read;
  },
  Q10: () => {
    const read = ["<p>Pi serves spec&shyulative RF context.</p>", "Pi serves spec&shyulative RF context.", "Pi serves spec&shyulative; RF context."].map(text => ({ text, ...docsVerdict(text) }));
    expect(read.map(({ c1, c2 }) => ({ c1, c2 })), "R-LEGACY-REFERENCE: a legacy name written without its ';' is read as written: in an HTML block and before a later ';' in the word (where a browser decodes it) and in text marked escapes (as marked shows it)").toStrictEqual([
      { c1: false, c2: false }, { c1: false, c2: false }, { c1: false, c2: false },
    ]);
    return read;
  },
  Q11: () => {
    const read = ["Pi serves spec`\nul\n`ative RF context.", "Pi serves spec` ul\n`ative RF context."].map(text => ({ text, ...docsVerdict(text) }));
    expect(read.map(({ c1, c2 }) => ({ c1, c2 })), "R-MULTILINE-CODE-SPAN: a code span whose content crosses a line ending is not read as one, so the line endings marked strips as its padding still split the word").toStrictEqual([
      { c1: false, c2: false }, { c1: false, c2: false },
    ]);
    return read;
  },
  Q12: () => {
    const read = ["Pi serves spec<span hidden>x</span>ulative RF context.", "Pi serves spec<template>x</template>ulative RF context."].map(text => ({ text, ...docsVerdict(text) }));
    expect(read.map(({ c1, c2 }) => ({ c1, c2 })), "R-HIDDEN-CONTENT: the content of an element a browser does not show is read as text, so its hidden part splits the word").toStrictEqual([
      { c1: false, c2: false }, { c1: false, c2: false },
    ]);
    return read;
  },
  Q13: () => {
    const read = ["Pi serves <b spec` ul `ative > RF context.", "Pi serves <b spe&#99;ulative > RF context."].map(text => ({ text, ...docsVerdict(text) }));
    expect(read.map(({ c1, c2 }) => ({ c1, c2 })), "R-ESCAPED-MARKUP: a tag-like run marked shows as written is removed as markup, so a term inside it that a code span or a reference splits is not read").toStrictEqual([
      { c1: false, c2: false }, { c1: false, c2: false },
    ]);
    return read;
  },
};

/** Each pin's witness as its case returned it; the registration case compares the whole set against the roster a second time. */
const MEASURED: Record<string, Json> = {};
/** Each pin's assertion count when its case reached its end (its witness comparison included), in run order. */
const REACHED: string[] = [];

describe("wb-grmo.1 rf speculative context census (RF-PREDICTIVE-WORLD-MODEL-CONTEXT-R1, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:7", "C:2", "M:19"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: "wb-grmo.1", citations: CITATIONS, firstServing: FIRST_SERVING_RELEASE }).toStrictEqual({
      bead: ROSTER.bead, citations: [...ROSTER.citations], firstServing: ROSTER.measured.firstServingRelease,
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          MEASURED[pin] = witness;
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it("registration: every test of this file is registered once, in roster order, in run mode, not inverted, and ran; every pin reached its end with its pinned assertion count", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    const rosterWitnesses = Object.fromEntries(ROSTER.rows.flatMap(entry => entry.pins.map(pin => [pin.id, pin.witness])));
    expect(MEASURED, "every pin's witness, compared against the roster a second time").toStrictEqual(rosterWitnesses);
    expect(REACHED, "every pin reached its end, in row order, with its pinned assertion count").toEqual([...ROSTER.reached]);
  });
});
