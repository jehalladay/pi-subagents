/**
 * wb-bk8a (the rule-19 structural-exit child of wb-g20x; orchestrator rulings R-B395 and R-B428), the carrier cut of the
 * furnace_observe SERVED census: what the tool pi serves under the name furnace_observe replies to five pinned calls, read at
 * run time through the tool registry the boot harness keeps, and never through the source text of a registration. wb-g20x (the
 * rule-19 structural-exit child of wb-40zp; rulings R-B163, R-B208 and R-B248) cut this census four times. Its refusal #3
 * (O:1873) read the class R-B360 froze (claims wider than pins on the served reader's own claim words, the reply judge's
 * identity and shape words first) failing on cut #3 through new members, and R-B395 (M:50316) executed the rule-19 STRUCTURAL
 * EXIT to this child. Its refusal #4 (O:1913) read the same class failing on its final cut #4 (45c823c9, the FAIL-CLOSED CORE,
 * not on trunk) through the A0 value clause's words, and R-B428 (M:51565) executed the pre-bound DEPENDENCY INVERSION: wb-g20x
 * parks behind this child, which lands cut #4's census and reader (the reader byte-identical to cut #4's) and carries both
 * refusals' members. Statement (the bead's tracker-export title, verbatim): "Rule-19 structural exit child of wb-g20x: no J2
 * pinned form writes a text differing at an inner character, so the plain-JSON-reply discrimination rests only on the reply
 * judge's unpinned === (GP8-M01/GP8-M02 fold it clean; witness GP8-W01 reds the delivered census 2|15) - pin the judge's text
 * identity or narrow the data clause to the pinned forms". Acceptance (the export description's acceptance paragraph, verbatim
 * through its claims sentence): "pin the reply judge's text identity red-first - a J2 PINNED FORM whose text differs from the
 * expected text at an inner character (an invisible/format-character fold and a printable-only fold at minimum, killing GP8-M01
 * and GP8-M02 with the GP8-W01 witness red under the delivered census), or kill the members, or name the inner-character
 * identity a residual with a pinned quiet row and narrow the data clause's 'plain JSON text differs' words to the pinned J2
 * forms. A newly discovered escape is a residual-list addition, not a refusal, unless it contradicts a pinned claim; a
 * prose-only residual is a floor (R624); claims no wider than pins (rule 16 LEG 2)." This cut takes the first option, by pins:
 * J2 PINNED FORMS gain a text and a type that differ from the expected one at an inner character (the INNER forms below), C3
 * and C4 judge a reply of the reading's plain JSON text, and A0 writes the template literal under every wrapper its value
 * clause names (refusal #4's U1). Each claim below names exactly the pinned facts it rests on (THE PINNED READER SET, J2 PINNED
 * FORMS and CLAIMS), a value or form no case writes is NOT CLAIMED, and MEMBERS records the members of record, both refusals'
 * among them, with what each reads on these bytes.
 *
 * THE READER is test/helpers/furnace-observe-served-reader.ts, whose header is the reading of record. In one line: pi's
 * extension loader keys an extension's tools by tool.name and the last registration wins, so the census reads the served tool
 * where the boot harness keys it the same way (K1), and reads its replies by calling it.
 *
 * THE PINNED READER SET (this file, test/workbench-furnace-observe-served-census.test.ts; each case title opens with its id and
 * the ROWS it holds; 17 cases, registered in this order):
 * - J0 [registered]: target recordRegistrations on a stub registerTool; observed: every value reaches the stub unchanged and in
 *   order, each return value comes back, and the names read are exactly J0_NAMES, a property read of each value (the nameless
 *   object { label: "nameless" }, the string "furnace_observe" and null read undefined, an anonymous arrow function reads "",
 *   and the function zzNamedTool, an array given the name zz-array-tool and an object inheriting the name zz-inherited-tool
 *   read theirs); the counted tool's name, behind a getter, is read once as it is registered; the wrapper J0 installs over the
 *   recorder, which calls it bound to the stub, reaches the stub through it, and the recorder reads zz-wrapped, the name that
 *   wrapper hands on; and each of two names is appended before its value reaches a stub that reads the recorder's list as it is
 *   called.
 * - J1 [registered]: target judgeRegistrations over the nine J1 fixtures; observed: each fixture's findings, exactly.
 * - J2 [grant, identity, data, error]: target judgeReply over the 82 J2 fixtures, each judged for the text T; observed: each
 *   fixture's findings, exactly. The values the fixtures write are J2 PINNED FORMS below; the census claims the judge's reading
 *   for T at those values and at no other value.
 * - S0 [registered, grant, identity, data, error]: target isServedTool over the 13 S0 fixtures; observed: true for the five
 *   objects whose execute is a function (an own arrow function, an own async arrow function, one inherited from the prototype,
 *   a class method, and an own one on a null-prototype object), and false for an object without execute, one whose execute is
 *   the string "run", one whose execute is the object { call: run }, an empty array and an arrow function each given an execute
 *   function, null, undefined and the string "furnace_observe".
 * - B0 [registered, grant, identity, data, error]: target bootServed over two planted factories in place of the real one;
 *   observed: in the first boot, with the grant furnace:inspect, the recorder reads the factory's own registration and then the
 *   two of the session_start handler, which runs once, awaited, with {} and a context whose cwd (as realpath reads it) is the
 *   boot's sandbox, whose .pi/subagents.json holds the header's settings with that grant; serves is true for the two object
 *   tools registered and false for the array tool registered and the absent name zz-absent; call resolves to the planted
 *   execute's return value and calls it as execute("census", { runId: "zz-run" }, undefined, undefined, that context); and in
 *   the second boot, without the grant, an array tool registered under furnace_observe is registered and not served, so call
 *   throws.
 * - K1 [registered, grant, identity, data, error]: target a fresh harness pi and pi's loader source; observed: of the two tools
 *   registered under zz-served the harness serves the second, the tool registered under zz-other is kept apart (two entries),
 *   and loader.js holds one extension.tools.set site, `extension.tools.set(tool.name, {` with `definition: tool,`, inside its
 *   registerTool method.
 * - I1 [data, error]: target the census's instrument; observed: while installed, the fake is the first furnace on PATH and,
 *   after restore, it is not; the command run status frn-run-census-unanswered --json, under an empty answers file, exits 2
 *   with nothing on stdout; Date reads FIXED_NOW inside atFixedDate and the real clock after it; the census's own observer
 *   reads the complete Run with completeness "complete" and the partial Run with "partial", each stamped FIXED_NOW, each with
 *   source.producerVersion holding INVISIBLE, which JSON.stringify of the reading keeps and sanitizeWorkbenchJsonText of it
 *   does not; and it rejects the failing Run with an Error whose message is FAILING_MESSAGE, a text sanitizeWorkbenchText
 *   leaves unchanged.
 * - C0 [registered]: target bootServed([]) and bootServed(["furnace:inspect"]); observed: C0 boots once without the grant and
 *   then once with it; each boot's <sandbox>/.pi/subagents.json reads the reader header's settings with that boot's grants;
 *   judgeRegistrations(received, "furnace_observe") is [] for each, and each serves an execute under that name.
 * - C1 [grant]: target the served execute of bootServed([]) called with { runId: "frn-run-census-grant" }; observed:
 *   judgeReply(result, REFUSALS.grant) is [].
 * - C2 [identity]: target the served execute of bootServed(["furnace:inspect"]) called with { runId: "census-not-a-run" };
 *   observed: judgeReply(result, REFUSALS.identity) is [].
 * - C3 [data]: target the same boot's served execute called with { runId: "frn-run-census-complete" } while the fake plays the
 *   complete Run, under atFixedDate; observed: judgeReply(result, sanitizeWorkbenchJsonText(R)) is [], where R is the census
 *   observer's reading of the same Run under the same fixed Date, and R's completeness is "complete"; R's plain JSON text,
 *   JSON.stringify(R), holds INVISIBLE; and THE PLAIN JSON REPLY, the result { content: [{ type: "text", text: JSON.stringify(R)
 *   }], details: undefined }, judged for sanitizeWorkbenchJsonText(R), reads exactly the one finding `item text: <JSON.stringify
 *   of JSON.stringify(R)>`.
 * - C4 [data]: the same for { runId: "frn-run-census-partial" } and the partial Run; R's completeness is "partial".
 * - C5 [error]: the same boot's served execute called with { runId: "frn-run-census-failing" } while the fake plays the failing
 *   Run; observed: judgeReply(result, sanitizeWorkbenchText(M)) is [], where M is the message of the Error the census observer
 *   rejects the same Run with.
 * - A0 []: target sourceAnchors over the 31 A0 fixtures (planted texts); observed: each fixture's literal count and reply
 *   sites, exactly. The fixtures write these forms of the reader header's sourceAnchors reading, each by the spellings named,
 *   and the census claims the reading at them and at no other: the keys (the identifiers name and execute and the string
 *   literals "name" and "execute" read, each also spelled with a \u escape; the computed key ["name"], a shorthand name, a
 *   method execute and the computed key ["execute"] do not), the value (the string literal "furnace_observe" reads, also
 *   spelled with a \u escape; the template literal `furnace_observe` bare, and the string literal "furnace_observe" and the
 *   template literal `furnace_observe` each under parentheses, under satisfies string, as const or as string, under a <string>
 *   type assertion or a ! non-null assertion, the identifier NAME, the concatenation "furnace_" + "observe", the call
 *   String("furnace_observe"), and the strings "Furnace_Observe", "furnace_observer", " furnace_observe", "furnace_observe ",
 *   "furnace_observ" and "xfurnace_observe" do not; a literal holding the property name: "workflow_observe" before it still
 *   counts), which literal (the first of two, the outer of two nested), which execute (the first of two; no site without one),
 *   the callee (the identifier textResult reads, also spelled with a \u escape or called with ?.; (textResult)(...),
 *   a.textResult(...), textResult.call(...), new textResult(...), the tagged template textResult`t` and the identifier reply do
 *   not), the order (a call in a nested arrow function before a later call; a call in another's argument after it), and the
 *   argument (only the first, of "first" and "second"; a string literal's cooked text, its \u escapes decoded; a call whose
 *   callee is an identifier by that identifier's cooked name, f, sanitize and s\u0061nitize; any other argument by its source
 *   text: msg, `t`, a.b(), ("p"), "a" as string and (g)(r), without the space and the block comment before msg, and "" when
 *   absent).
 * - A1 []: target src/index.ts read by sourceAnchors; observed: one literal names furnace_observe, one registration row stands
 *   per such literal, and its execute's textResult sites are exactly the reply rows' sites in ROWS order.
 * - F1 []: target the tables; observed: the frozen shape (standing rule 16) below.
 * - J3 []: target ROWS and CASES; observed: each row's pins are exactly the cases naming it, and every case is registered once.
 *
 * J2 PINNED FORMS (the 82 values the J2 fixtures write, each judged for the text T = "the expected text", findings exactly as
 * each fixture states; the census claims the judge's reading for T at these values and at no other value. "the element" is
 * { type: "text", text: T }, and "the element with ..." is that object with the fields named spread over it):
 * - the result: undefined (not-an-object), null (result-null), the string T (result-string), the number 0 (result-number),
 *   false (result-boolean), Symbol("zz-result") (result-symbol), the bigint 0n (result-bigint), the array [the element]
 *   (an-array), and an empty array (result-array-shaped) and an arrow function (result-function) each given content [the
 *   element] and details undefined, each read "result: not an object", alone.
 * - its keys, against content,details: content [the element] alone (details-absent) and details undefined alone
 *   (content-absent); beside content [the element] and details undefined, the key annotations [] (result-key-before-content),
 *   _zz true (result-underscore-key), $zz 1 (result-dollar-key), the key 0 with 1 (result-digit-key), the empty-string key with
 *   1 (result-empty-key), data 1 (result-key-between) and isError true (extra-result-key), and isError true defined first
 *   (result-key-defined-first, whose finding lists the keys sorted); Content [the element] in place of content
 *   (result-key-case); the key "content " with 1 beside content (result-key-padded); and details defined before content
 *   (result-key-order), content and details inherited from the prototype (result-inherited-keys), and a non-enumerable own
 *   isError true and an enumerable Symbol.for("zz-unread") property on the result and on the element (unread-keys), which read
 *   no key finding, the keys "" and no key finding.
 * - details: undefined reads no finding (exact); {} (details-defined), null (details-null), {} inherited from the prototype
 *   (inherited-details), 0 (details-zero), the empty string (details-empty-string), false (details-false), an arrow function
 *   (details-function), Symbol("zz-details") (details-symbol), 0n (details-bigint) and 0 inherited from the prototype
 *   (inherited-primitive-details) each read "details: defined".
 * - content: the string T (content-not-array), { 0: the element, length: 1 } (content-array-like), null (content-null) and no
 *   content (content-absent) read "content: not an array"; [] (no-items) and [the element, the element] (two-items) read the
 *   count.
 * - the element: the string T (item-not-object), null (item-null), and an empty array (item-array) and an arrow function
 *   (item-function) each given type "text" and text T read "item: not an object".
 * - its keys, against text,type: the element with extra 1 (item-extra-key), with title "x" (item-key-between), with zz true
 *   after type and text (item-key-after-type) and with _zz true (item-underscore-key); { Text: T, type: "text" }
 *   (item-key-case); { text: T, type: "text" }, text defined first (item-key-order); an object inheriting the element's type
 *   and text from its prototype (item-inherited-keys); and the element of unread-keys.
 * - its type, against "text": "image" (item-type), "Text" (type-case), "text " (type-padded), " text" (type-leading-padded),
 *   "plaintext" (type-ends-with), new String("text") (type-wrapped) and ["text"] (type-array); and, INNER, "text" with one
 *   character inserted after "te", the zero-width space U+200B (type-inner-zero-width, GP8-WT3's spelling) or the letter U+00E9
 *   (type-inner-non-ascii), each read "item type: <JSON>".
 * - its text, against T: T followed by "!" (text-differs), T upper-cased (text-case), T followed by a space (text-padded), a
 *   space followed by T (text-leading-padded), "x" followed by T (text-ends-with), T's first five characters (text-prefix),
 *   new String(T) (text-wrapped), [T] (text-array), and the element { type: "text" } without text (text-absent); and, INNER,
 *   each reading "item text: <JSON>": T with one character inserted after "the ex", INVISIBLE U+202E (text-inner-invisible,
 *   the character I1's reading holds), the zero-width space U+200B (text-inner-zero-width), the letter U+00E9
 *   (text-inner-non-ascii) or the control U+0007 (text-inner-control); T with the combining acute accent U+0301 inserted after
 *   "the expe" (text-inner-combining); T with a second space after "the " (text-inner-space); T with the "e" after "the "
 *   replaced by the fullwidth letter U+FF45 (text-inner-fullwidth); and T with the "e" after "the expect" replaced by "a"
 *   (text-inner-letter).
 * - the result { content: [the element], details: undefined } (exact) reads no finding; the order of the findings and the
 *   points where a reading ends: all-findings, ends-at-content, ends-at-count and ends-at-item, and every fixture above that
 *   reads two findings.
 *
 * CLAIMS (each claims exactly the pinned facts it names and no wider; its falsifiers are the cases named). "A result judgeReply
 * reads as textResult(X)" is a result for which judgeReply(result, X) returns [], no finding: each reply row's case asserts
 * exactly that of the served reply to its pinned call, and the reply rows claim nothing more of the served replies. What a
 * finding, or its absence, says of a result is the judge's reading, which the reader header describes at every value and the
 * census claims at two places only: for T at the 82 values J2 PINNED FORMS lists, where judgeReply returns exactly the
 * fixture's findings, in order (J2); and at THE PLAIN JSON REPLY of C3's and C4's reading R, judged for
 * sanitizeWorkbenchJsonText(R), where it returns exactly the one text finding C3 and C4 state (C3, C4). At any other value the
 * reading is NOT CLAIMED (below). "Served" is the reader's isServedTool, claimed at S0's 13 values (S0); what bootServed's
 * serves and call do with an entry is claimed at the entries B0 plants (B0), and each pinned boot serves an execute under
 * furnace_observe (C0).
 * - registered: the pinned boot, booted once without the furnace:inspect grant and once with it, its settings read back, hands
 *   the harness's registerTool exactly one tool named furnace_observe as the recorder and the count read it, so the harness
 *   serves that tool under the name (C0; J0, J1, S0, B0, K1): for each boot, judgeRegistrations finds nothing for
 *   furnace_observe in the names recordRegistrations reads, each read once as its tool is handed, and serves(furnace_observe)
 *   is true (C0). The recorder is claimed at J0's values and the count at J1's nine lists, and their reading of a boot's own
 *   list is claimed no wider than C0 asserts it (NOT CLAIMED below).
 * - grant: without the furnace:inspect grant the served furnace_observe replies to C1's call with a result judgeReply reads as
 *   textResult(REFUSALS.grant) (C1; J2, S0, B0, K1).
 * - identity: with the grant it replies to C2's call with a result judgeReply reads as textResult(REFUSALS.identity) (C2; J2,
 *   S0, B0, K1).
 * - data: for the complete and the partial pinned Run it replies with a result judgeReply reads as
 *   textResult(sanitizeWorkbenchJsonText(R)), R being the census observer's reading of that Run (C3, C4; J2, S0, B0, K1, I1);
 *   and for each of those two Runs the plain JSON reply, whose text JSON.stringify(R) holds INVISIBLE (C3, C4), does not read
 *   so: judged for sanitizeWorkbenchJsonText(R) it reads exactly its one text finding (C3, C4). So a served reply of the
 *   reading's plain JSON text reds C3 and C4 (the witness GP8-W01, MEMBERS); a judge that folds the text's format characters,
 *   or keeps only its printable ASCII, before === reads no finding there and reds C3 and C4 too (GP8-M01 and GP8-M02,
 *   MEMBERS), and J2 reds under each at its INNER forms.
 * - error: for the failing pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchText(M)), M
 *   being the message of the census observer's rejection, FAILING_MESSAGE (C5; J2, S0, B0, K1, I1).
 *
 * NOT CLAIMED (scope sentences; no residual semantics; no follow-up bead):
 * - The judge's reading anywhere but for T at the 82 J2 values and at C3's and C4's plain JSON reply is NOT CLAIMED by this
 *   census: a result judged for a row's own text X (REFUSALS.grant, REFUSALS.identity, sanitizeWorkbenchJsonText(R) or
 *   sanitizeWorkbenchText(M)) in any form but the plain JSON reply is outside them, and so is a result judged for T in a form
 *   J2 PINNED FORMS does not list (another key, details value, content, element, type or text; among them a text or a type
 *   differing from the expected one at an inner character other than the INNER forms'). Of a served reply the census claims
 *   the [] its row's case asserts, and not what that [] says of the reply.
 * - Which other spellings of the data reply's text the census tells from textResult(sanitizeWorkbenchJsonText(R)) is NOT
 *   CLAIMED by this census: it claims the plain JSON reply (C3, C4) and the judge's reading for T at J2's values, and no other
 *   text of R.
 * - That bootServed refuses an entry under furnace_observe that isServedTool reads as not served, other than the array tool B0
 *   plants, so that call throws and the calling case reds, is NOT CLAIMED by this census: isServedTool's reading is claimed at
 *   S0's values, and bootServed's refusal at B0's one planted entry.
 * - Each other reader at a form its case does not write (a registered value J0 does not hand, a received list J1 does not
 *   judge, a tools-Map value S0 does not test, a factory B0 does not plant, a src text A0 does not read) is NOT CLAIMED by this
 *   census: the reader header describes those readings, and the census claims them at the fixtures and plants named. Each
 *   pinned boot's own list of registrations is such a list: C0 asserts the count's [] there, and not what that [] says of the
 *   boot's registrations beyond the recorder's and the count's reading.
 * - A served reply's properties that judgeReply does not read are NOT CLAIMED by this census: its non-enumerable, symbol-keyed
 *   and inherited properties other than the four the reading reads (details, content, type and text).
 * - A tool whose name reads differently on different reads (a name getter) is NOT CLAIMED by this census: the recorder reads
 *   each name once (J0), and what pi serves for such a tool is not read.
 * - A call other than C1-C5's (other params, another tool-call id, a signal or an update callback, another grant set, another
 *   Run, an Attempt page that holds Attempts and their log reads) is NOT CLAIMED by this census.
 * - A boot other than the pinned boot (other settings, pi's own loader and runtime, a registration made after session_start) is
 *   NOT CLAIMED by this census.
 * - What the observer reads from a Run and what the shared sanitizers do are NOT CLAIMED by this census: the expected replies
 *   are computed with the FurnaceObserver and the sanitizers src/index.ts imports, so a change to
 *   src/workbench/furnace-observer.ts or src/workbench/redaction.ts moves both sides alike (wb-b04.2's census reads them).
 * - Whether the served execute is the function the furnace_observe literal holds, and what it hands the client and the observer
 *   it builds, are NOT CLAIMED by this census: only its replies to the pinned calls are.
 * - Whether the error reply is run through sanitizeWorkbenchText is NOT CLAIMED by this census: FAILING_MESSAGE is a text that
 *   sanitizer leaves unchanged, so C5 reads the reply's text only.
 * - A served execute that tells this census's calls from others is NOT CLAIMED by this census.
 * - Tools other than furnace_observe are NOT CLAIMED by this census: their names are read only to count furnace_observe.
 *
 * RESIDUALS: none named. Every named member of both refusals reds the census on these bytes (MEMBERS); a judge or anchor
 * reading at a value or form no case writes is outside this cut's claims (NOT CLAIMED above), so no claimed reading rests on
 * prose.
 *
 * MEMBERS (the members of record; each src plant is applied to src/index.ts in the cutting seat's worktree and the census run
 * on it, src restored by sha256 after; the counts are the seat's receipts in the delivery note):
 * - wb-40zp's refusal #3 (O:1582) U1, which execute pi serves: GP23-REG-TEMPLATE-NAME, GP23-REG-CONST-NAME,
 *   GP23-REG-CONCAT-NAME (a second registration named by a template literal, a constant or a concatenation) red C0, C1, C2,
 *   C3, C4 and C5; GP23-EXEC-SPREAD-OVERRIDE-2 (a spread after execute) and GP23-REGISTER-PATCH (a wrapped registerTool) red
 *   C1-C5; GP23-REGISTER-PATCH-PASSTHROUGH and GP23-DEFINE-SHADOW-PASSTHROUGH (the real body run, "partial" rewritten to
 *   "complete") red C4. U2, what the replies say: GP23-REFUSAL-LITERAL-FABRICATED reds C1 and A1,
 *   GP23-IDENTITY-REFUSAL-FABRICATED reds C2 and A1, GP23-ERROR-TEXT-FABRICATED reds C5.
 * - wb-40zp's refusal #4 (O:1650) U1-LOW: GP8-REG-ESCAPED-NAME-KEY (a second registration whose name key is spelled with a
 *   unicode escape) reds C0, C1-C5 and A1 (A1's anchor reads the key as TypeScript cooks it, A0). U1-LOW's reader mutants
 *   GP8-M-REG-COOKED-NAME-KEY, GP8-M-FIND-COOKED-NAME-KEY and GP8-M-FIND-COOKED-EXEC-KEY, and U2-LOW's
 *   GP8-M-FIND-NAME-CASEFOLD, GP8-M-REG-NAME-CASEFOLD, GP8-M-FIND-SATISFIES-VALUE and GP8-M-REG-SATISFIES-VALUE, are one-edit
 *   mutants of wb-40zp cut #4's source-text name readers, which this census does not carry: it reads the name pi's loader keys
 *   by, at run time. Their analogs here are killed: a registration count that folds case, trims or matches a substring by J1,
 *   and an anchor that reads a key by its source text, folds the name's case or reads a template-literal value by A0. Their
 *   paired plants: GP8-REG-SATISFIES-NAME reds C0 and C1-C5, and GP8-REG-CASE-NAME, a second tool named Furnace_Observe, reads
 *   clean, as it should: pi serves that tool under another name.
 * - wb-g20x's refusal #1 (O:1772; each gate probe read as data from the gate-prep-24 PREP archive and applied verbatim to these
 *   bytes, the census run on trunk's src/index.ts): U1's GP24-H01-TEXT-COERCE, GP24-H02-TYPE-COERCE and
 *   GP24-H08-ITEM-ARRAY-SPREAD (and its first form GP24-H08-ITEM-ARRAY) red J2; U2's GP24-C01-C0-GRANT-ARM reds C0; U3's
 *   GP24-H07-SERVES-ARRAY reds S0; U4's GP24-H03-ANC-AS-VALUE, GP24-H04-ANC-STRKEY-RAW, GP24-H05-ANC-PAREN-CALLEE and
 *   GP24-H13-ANC-ARG-RAW red A0; and the riding finding F3's GP24-H06-ANC-POSTORDER reds A0.
 * - wb-g20x's refusal #2 (O:1825; each gate member, witness and record-only probe read as data from the gate-prep-3 PREP
 *   archive and applied verbatim to these bytes, the witnesses to src/index.ts's textResult): U1's GP3-M01-RESULT-KEYS-SUFFIX,
 *   GP3-M02-ITEM-KEYS-PREFIX and GP3-M04-KEYS-SKIP-UNDERSCORE and U2's GP3-M03-DETAILS-OBJECT-ONLY red J2
 *   (result-key-before-content, item-key-after-type, result-underscore-key and details-zero hold their witnesses' forms:
 *   GW01's annotations key, GW02's zz element key, GW04's _zz key and GW03's details 0); each witness reds C1-C5 under the
 *   delivered census and J2 under its paired mutant. The riding F3's GP3-X05-ANCHOR-OTHER-FULLTEXT reds A0 (other-trivia) and
 *   GP3-X08-FINDING-KEYS-UNSORTED reds J2 (result-key-defined-first). GP3-X02-BOOT-CTX-DEFAULT-CWD reads clean and is
 *   EQUIVALENT by construction: hermeticDir chdirs into the sandbox, so ctx()'s default cwd is the sandbox. The seat's SM3
 *   member that dedupes the keys reads clean and is EQUIVALENT by construction: Object.keys returns each own key once.
 * - wb-g20x's refusal #3 (O:1873; each gate member and witness read as data from the gate-prep-8 PREP archive and applied
 *   verbatim to these bytes, the witnesses to src/index.ts): GP8-M01-TEXT-FORMAT-FOLD and GP8-M02-TEXT-PRINTABLE-FOLD (the
 *   judge's text test with Unicode format characters, or every character outside printable ASCII, removed from both sides
 *   first) red J2, C3 and C4: J2 at text-inner-invisible and text-inner-zero-width under both, and at text-inner-non-ascii,
 *   text-inner-control and text-inner-combining under GP8-M02; C3 and C4 at the plain JSON reply. The witness
 *   GP8-W01-PLAIN-JSON-REPLY (the data reply of the reading's plain JSON text) reds C3 and C4 under the delivered census, and
 *   J2, C3 and C4 under each. The riding F3's GP8-M03-TYPE-FORMAT-FOLD (the same fold of the type test) reds J2 at
 *   type-inner-zero-width, and its witness GP8-WT3-TYPE-ZWSP (textResult's type spelled with an inner U+200B) reds C1-C5 under
 *   the delivered census and J2 under GP8-M03.
 * - wb-g20x's refusal #4 (O:1913; each gate member, control and witness read as data from the gate-prep-23 PREP archive and
 *   applied verbatim to these bytes, the witnesses to src/index.ts's furnace_observe name): U1's G195-M01-A0-PAREN-TEMPLATE
 *   (sourceAnchors also counts the template literal under parentheses) reds A0 at template-wrapped-values, and
 *   G195-M02-A0-WRAPPED-TEMPLATE (under one parentheses, satisfies, as, <T> or ! wrapper) reds A0 at template-wrapped-values,
 *   template-as-values and template-assertion-values; the witnesses G195-W01 ((`furnace_observe`)), G195-W02
 *   (`furnace_observe` satisfies string) and G195-W03 (`furnace_observe` as const) red A1 under the delivered census and A0
 *   under each member they pair with; the controls G195-K01-A0-STRING-LITERAL-LIKE (at template-value),
 *   G195-K02-A0-PAREN-STRING (at wrapped-value) and G195-K03-A0-WRAPPED-STRING (at wrapped-value, as-value and
 *   assertion-values) red A0, and the control witness G195-W04 (("furnace_observe")) reds A1 under the delivered census and A0
 *   under G195-K02.
 * - this cut's seat sweep (one-edit members of the judge's text and type tests and of the anchor's value test, each run on
 *   these bytes; the delivery note holds the counts): each INNER form is the one J2 fixture that reds under a fold of its test:
 *   text-inner-invisible under removing the bidi controls U+202A-U+202E and U+2066-U+2069 (which reds C3 and C4 too),
 *   text-inner-zero-width under removing U+200B-U+200D, text-inner-non-ascii under removing every non-ASCII letter,
 *   text-inner-control under removing every control character, text-inner-combining under NFD with the combining marks
 *   removed, text-inner-space under collapsing each whitespace run to one space, text-inner-fullwidth under NFKC,
 *   text-inner-letter under skipping the eleventh character, and type-inner-non-ascii under removing every non-ASCII letter of
 *   the type (type-inner-zero-width is GP8-M03's); and each of template-wrapped-values (satisfies; parentheses is G195-M01's),
 *   template-as-values (as) and template-assertion-values (a <T> type assertion; a ! non-null assertion) is the one A0 fixture
 *   that reds under an anchor that also counts the template literal under the wrapper named.
 *
 * FROZEN SHAPE (standing rule 16): F1 pins ROWS as `${id}:${pins.length}` and its clauses, the case ids, SCENARIO_IDS,
 * J0_NAMES, the ids of the J1, J2 and A0 fixtures, and the S0 fixtures as `${id}:${served}`, as literals. A1 holds the rows to
 * src/index.ts outside this file: the one furnace_observe literal stands for the registration row and its four textResult
 * sites for the four reply rows, in order.
 */
import { spawnSync } from "node:child_process";
import { readFileSync, realpathSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "../src/workbench/redaction.js";
import { makePi } from "./helpers/boot-extension.js";
import {
  atFixedDate,
  bootServed,
  type FakeFurnace,
  FIXED_NOW,
  firstOnPath,
  INVISIBLE,
  installFakeFurnace,
  isServedTool,
  judgeRegistrations,
  judgeReply,
  ownObserver,
  type PlantedFactory,
  REFUSALS,
  type ReplySite,
  recordRegistrations,
  SCENARIO_IDS,
  SERVED_NAME,
  type ServedBoot,
  scenario,
  sourceAnchors,
} from "./helpers/furnace-observe-served-reader.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOADER = "node_modules/@earendil-works/pi-coding-agent/dist/core/extensions/loader.js";
/** The message the census observer rejects the failing Run with. */
const FAILING_MESSAGE = "Furnace status unavailable (run_not_found)";
/** Every case's bound (a case that boots the extension needs it under load), handed in an options literal in the second place
 * (vitest 4's test(name, options, fn)), the one form test/workbench-retry-census.test.ts reads beside a forwarded body. */
const CASE_TIMEOUT_MS = 60_000;

interface Row {
  readonly id: string;
  readonly clause: string;
  /** What A1 holds the row to in src/index.ts: the furnace_observe literal, or one textResult site of its execute. */
  readonly anchor: "registration" | "reply";
  readonly site?: ReplySite;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  {
    id: "registered",
    clause: "the pinned boot, booted once without the furnace:inspect grant and once with it, hands the harness's registerTool exactly one tool named furnace_observe",
    anchor: "registration",
    pins: ["J0", "J1", "S0", "B0", "K1", "C0"],
  },
  {
    id: "grant",
    clause: "without the furnace:inspect grant the served furnace_observe replies to C1's call with a result judgeReply reads as textResult(REFUSALS.grant)",
    anchor: "reply",
    site: { kind: "literal", text: REFUSALS.grant },
    pins: ["J2", "S0", "B0", "K1", "C1"],
  },
  {
    id: "identity",
    clause: "with the grant it replies to C2's call with a result judgeReply reads as textResult(REFUSALS.identity)",
    anchor: "reply",
    site: { kind: "literal", text: REFUSALS.identity },
    pins: ["J2", "S0", "B0", "K1", "C2"],
  },
  {
    id: "data",
    clause: "for the complete and the partial pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchJsonText(R))",
    anchor: "reply",
    site: { kind: "call", text: "sanitizeWorkbenchJsonText" },
    pins: ["J2", "S0", "B0", "K1", "I1", "C3", "C4"],
  },
  {
    id: "error",
    clause: "for the failing pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchText(M))",
    anchor: "reply",
    site: { kind: "call", text: "sanitizeWorkbenchText" },
    pins: ["J2", "S0", "B0", "K1", "I1", "C5"],
  },
];

interface Case {
  /** The ROWS this case holds (J3). */
  readonly rows: readonly string[];
  readonly title: string;
}
const CASES = {
  J0: { rows: ["registered"], title: "over J0's values the recorder reads each name once, as a property read does, before it hands the value on unchanged and in order, and returns what registerTool returns" },
  J1: { rows: ["registered"], title: "over J1's received lists the registration judge counts only names === furnace_observe: case variants, longer, shorter, padded and non-string names are other names" },
  J2: {
    rows: ["grant", "identity", "data", "error"],
    title: "at each J2 PINNED FORM, the 82 values its fixtures write, each judged for the text T, the reply judge's findings are exactly the fixture's, in its order",
  },
  S0: { rows: ["registered", "grant", "identity", "data", "error"], title: "over S0's values the served-tool predicate holds for an object whose execute, own or inherited, is a function, and not for an array, a function or a primitive" },
  B0: {
    rows: ["registered", "grant", "identity", "data", "error"],
    title: "the boot's own order, over two planted factories: settings written, the recorder in front of registerTool from the factory through the awaited session_start, and serves and call at the entries they plant",
  },
  K1: { rows: ["registered", "grant", "identity", "data", "error"], title: "the harness serves the second of two tools registered under one name, and pi's loader sets its tools at one site, keyed by tool.name" },
  I1: { rows: ["data", "error"], title: "the instrument: the fake furnace is first on PATH, Date is fixed, and the census observer reads the three pinned Runs" },
  C0: {
    rows: ["registered"],
    title: "the pinned boot, booted without the grant and then with it, its settings read back, hands registerTool exactly one furnace_observe, and the harness serves it",
  },
  C1: { rows: ["grant"], title: "without the grant the served furnace_observe's reply reads as textResult of the grant refusal" },
  C2: { rows: ["identity"], title: "with the grant and the Run id census-not-a-run its reply reads as textResult of the identity refusal" },
  C3: {
    rows: ["data"],
    title: "for the complete Run its reply reads as textResult of the sanitized text of the census observer's reading, and the plain JSON reply of that reading reads one text finding",
  },
  C4: {
    rows: ["data"],
    title: "for the partial Run its reply reads as textResult of the sanitized text of the census observer's partial reading, and the plain JSON reply of that reading reads one text finding",
  },
  C5: { rows: ["error"], title: "for the failing Run its reply reads as textResult of the sanitized text of the census observer's error message" },
  A0: { rows: [], title: "the anchor reader reads each key, value, literal, execute, callee, order and argument form A0 writes as the census header lists it" },
  A1: { rows: [], title: "outside anchors: src/index.ts's furnace_observe literal and its execute's four textResult sites, one per reply row" },
  F1: { rows: [], title: "FROZEN SHAPE (standing rule 16): the rows, the cases, the scenarios and the judges' and readers' fixtures" },
  J3: { rows: [], title: "the judged set: each row's pins are exactly the cases naming it, and every case is registered once" },
} as const satisfies Readonly<Record<string, Case>>;
type CaseId = keyof typeof CASES;
const CASE_IDS = Object.keys(CASES) as CaseId[];
const registered: CaseId[] = [];
/** Registers one case under its id and the rows it holds. */
function pinned(id: CaseId, body: () => void | Promise<void>): void {
  registered.push(id);
  const rows: readonly string[] = CASES[id].rows;
  it(`${id} [${rows.join(", ")}]: ${CASES[id].title}`, { timeout: CASE_TIMEOUT_MS }, body);
}

/** The values J0 hands the recorder, and the names it reads from them. */
const J0_VALUES: readonly unknown[] = [
  { name: "Agent" },
  { name: "Furnace_Observe" },
  { name: SERVED_NAME },
  { name: SERVED_NAME },
  SERVED_NAME,
  { label: "nameless" },
  Object.assign(() => undefined, { execute: () => undefined }),
  function zzNamedTool() {},
  Object.assign([], { name: "zz-array-tool" }),
  Object.create({ name: "zz-inherited-tool" }),
  null,
];
const J0_NAMES: readonly unknown[] = [
  "Agent",
  "Furnace_Observe",
  SERVED_NAME,
  SERVED_NAME,
  undefined,
  undefined,
  "",
  "zzNamedTool",
  "zz-array-tool",
  "zz-inherited-tool",
  undefined,
];

const none = [`${SERVED_NAME} received 0 times`];
/** J1: received names and the registration judge's findings. */
const J1_FIXTURES: readonly { readonly id: string; readonly received: readonly unknown[]; readonly findings: readonly string[] }[] = [
  { id: "none", received: [], findings: none },
  { id: "one", received: [SERVED_NAME], findings: [] },
  { id: "among-others", received: ["Agent", SERVED_NAME, "workflow_detached"], findings: [] },
  { id: "twice", received: [SERVED_NAME, "Agent", SERVED_NAME], findings: [`${SERVED_NAME} received 2 times`] },
  { id: "thrice", received: [SERVED_NAME, SERVED_NAME, SERVED_NAME], findings: [`${SERVED_NAME} received 3 times`] },
  { id: "case-variants", received: ["Furnace_Observe", "FURNACE_OBSERVE", SERVED_NAME], findings: [] },
  { id: "longer-shorter", received: ["furnace_observer", "xfurnace_observe", "furnace_observ", "furnace"], findings: none },
  { id: "padded", received: [` ${SERVED_NAME}`, `${SERVED_NAME} `, `${SERVED_NAME}\n`], findings: none },
  { id: "not-strings", received: [undefined, null, 0, [SERVED_NAME], new String(SERVED_NAME)], findings: none },
];

const T = "the expected text";
const item = (fields: Readonly<Record<string, unknown>>): Readonly<Record<string, unknown>> => ({ type: "text", text: T, ...fields });
/** value with two properties judgeReply does not read as keys: a non-enumerable own isError and a symbol-keyed one. */
const withUnread = <V extends object>(value: V): V =>
  Object.defineProperties(value, { isError: { value: true, enumerable: false }, [Symbol.for("zz-unread")]: { value: true, enumerable: true } });
/** The characters the INNER forms write (wb-bk8a), each built from its code point (standing rule 5). */
const ZERO_WIDTH = String.fromCodePoint(0x200b);
const NON_ASCII_LETTER = String.fromCodePoint(0xe9);
const CONTROL = String.fromCodePoint(0x07);
const COMBINING_ACUTE = String.fromCodePoint(0x301);
const FULLWIDTH_E = String.fromCodePoint(0xff45);
/** T with character inserted after its first `at` characters. */
const inserted = (at: number, character: string): string => `${T.slice(0, at)}${character}${T.slice(at)}`;
/** T with its character at `at` replaced by `by`. */
const replaced = (at: number, by: string): string => `${T.slice(0, at)}${by}${T.slice(at + 1)}`;
/** J2: results and the reply judge's findings for the text T (refusal #1 U1's words and their class from text-wrapped on). */
const J2_FIXTURES: readonly { readonly id: string; readonly result: unknown; readonly findings: readonly string[] }[] = [
  { id: "exact", result: { content: [item({})], details: undefined }, findings: [] },
  { id: "text-differs", result: { content: [item({ text: `${T}!` })], details: undefined }, findings: [`item text: ${JSON.stringify(`${T}!`)}`] },
  { id: "text-case", result: { content: [item({ text: T.toUpperCase() })], details: undefined }, findings: [`item text: ${JSON.stringify(T.toUpperCase())}`] },
  { id: "text-padded", result: { content: [item({ text: `${T} ` })], details: undefined }, findings: [`item text: ${JSON.stringify(`${T} `)}`] },
  { id: "text-prefix", result: { content: [item({ text: T.slice(0, 5) })], details: undefined }, findings: [`item text: ${JSON.stringify(T.slice(0, 5))}`] },
  { id: "two-items", result: { content: [item({}), item({})], details: undefined }, findings: ["content: 2 items"] },
  { id: "no-items", result: { content: [], details: undefined }, findings: ["content: 0 items"] },
  { id: "content-not-array", result: { content: T, details: undefined }, findings: ["content: not an array"] },
  { id: "item-not-object", result: { content: [T], details: undefined }, findings: ["item: not an object"] },
  { id: "details-defined", result: { content: [item({})], details: {} }, findings: ["details: defined"] },
  { id: "details-null", result: { content: [item({})], details: null }, findings: ["details: defined"] },
  { id: "details-absent", result: { content: [item({})] }, findings: ["result keys: content"] },
  { id: "extra-result-key", result: { content: [item({})], details: undefined, isError: true }, findings: ["result keys: content,details,isError"] },
  { id: "item-extra-key", result: { content: [item({ extra: 1 })], details: undefined }, findings: ["item keys: extra,text,type"] },
  { id: "item-type", result: { content: [item({ type: "image" })], details: undefined }, findings: ['item type: "image"'] },
  { id: "not-an-object", result: undefined, findings: ["result: not an object"] },
  { id: "an-array", result: [item({})], findings: ["result: not an object"] },
  // A String wrapper or an array of the expected text or type differs under === (GP24-H01, GP24-H02).
  { id: "text-wrapped", result: { content: [item({ text: new String(T) })], details: undefined }, findings: [`item text: ${JSON.stringify(new String(T))}`] },
  { id: "text-array", result: { content: [item({ text: [T] })], details: undefined }, findings: [`item text: ${JSON.stringify([T])}`] },
  { id: "text-absent", result: { content: [{ type: "text" }], details: undefined }, findings: ["item keys: type", "item text: undefined"] },
  { id: "type-wrapped", result: { content: [item({ type: new String("text") })], details: undefined }, findings: [`item type: ${JSON.stringify(new String("text"))}`] },
  { id: "type-array", result: { content: [item({ type: ["text"] })], details: undefined }, findings: ['item type: ["text"]'] },
  { id: "type-case", result: { content: [item({ type: "Text" })], details: undefined }, findings: ['item type: "Text"'] },
  { id: "type-padded", result: { content: [item({ type: "text " })], details: undefined }, findings: ['item type: "text "'] },
  // The element and the result as objects: an array, a function and null holding the right properties are not (GP24-H08).
  { id: "item-array", result: { content: [Object.assign([], { type: "text", text: T })], details: undefined }, findings: ["item: not an object"] },
  { id: "item-function", result: { content: [Object.assign(() => undefined, { type: "text", text: T })], details: undefined }, findings: ["item: not an object"] },
  { id: "item-null", result: { content: [null], details: undefined }, findings: ["item: not an object"] },
  { id: "result-array-shaped", result: Object.assign([], { content: [item({})], details: undefined }), findings: ["result: not an object"] },
  { id: "result-function", result: Object.assign(() => undefined, { content: [item({})], details: undefined }), findings: ["result: not an object"] },
  { id: "result-null", result: null, findings: ["result: not an object"] },
  { id: "content-array-like", result: { content: { 0: item({}), length: 1 }, details: undefined }, findings: ["content: not an array"] },
  // Keys are own enumerable string keys, sorted: order does not matter, inherited ones are not keys, unread ones are not read.
  { id: "result-key-order", result: { details: undefined, content: [item({})] }, findings: [] },
  { id: "item-key-order", result: { content: [{ text: T, type: "text" }], details: undefined }, findings: [] },
  { id: "result-inherited-keys", result: Object.create({ content: [item({})], details: undefined }), findings: ["result keys: "] },
  { id: "item-inherited-keys", result: { content: [Object.create(item({}))], details: undefined }, findings: ["item keys: "] },
  { id: "inherited-details", result: Object.assign(Object.create({ details: {} }), { content: [item({})] }), findings: ["result keys: content", "details: defined"] },
  { id: "unread-keys", result: withUnread({ content: [withUnread({ ...item({}) })], details: undefined }), findings: [] },
  // The order of the findings, and where a reading ends.
  {
    id: "all-findings",
    result: { content: [{ type: "image", text: "x", extra: 1 }], details: {}, isError: true },
    findings: ["result keys: content,details,isError", "details: defined", "item keys: extra,text,type", 'item type: "image"', 'item text: "x"'],
  },
  { id: "ends-at-content", result: { content: T, details: {}, extra: 1 }, findings: ["result keys: content,details,extra", "details: defined", "content: not an array"] },
  {
    id: "ends-at-count",
    result: { content: [item({ type: "image" }), item({})], details: null, isError: true },
    findings: ["result keys: content,details,isError", "details: defined", "content: 2 items"],
  },
  { id: "ends-at-item", result: { content: [null], details: {} }, findings: ["details: defined", "item: not an object"] },
  // Refusal #2 (O:1825), U1: an extra result key at each sorted position, before content (GP3-M01 with GW01's annotations, and
  // GP3-M04 with GW04's _zz), between content and details, and after details defined first (GP3-X08: the finding lists the
  // sorted keys); a result key in each spelling below (an underscore, a dollar sign, a digit, the empty string, another case
  // and a padded copy of an expected key); and content absent.
  { id: "result-key-before-content", result: { annotations: [], content: [item({})], details: undefined }, findings: ["result keys: annotations,content,details"] },
  { id: "result-underscore-key", result: { _zz: true, content: [item({})], details: undefined }, findings: ["result keys: _zz,content,details"] },
  { id: "result-key-between", result: { content: [item({})], data: 1, details: undefined }, findings: ["result keys: content,data,details"] },
  { id: "result-key-defined-first", result: { isError: true, content: [item({})], details: undefined }, findings: ["result keys: content,details,isError"] },
  { id: "result-dollar-key", result: { $zz: 1, content: [item({})], details: undefined }, findings: ["result keys: $zz,content,details"] },
  { id: "result-digit-key", result: { 0: 1, content: [item({})], details: undefined }, findings: ["result keys: 0,content,details"] },
  { id: "result-empty-key", result: { "": 1, content: [item({})], details: undefined }, findings: ["result keys: ,content,details"] },
  { id: "result-key-case", result: { Content: [item({})], details: undefined }, findings: ["result keys: Content,details", "content: not an array"] },
  { id: "result-key-padded", result: { "content ": 1, content: [item({})], details: undefined }, findings: ["result keys: content,content ,details"] },
  { id: "content-absent", result: { details: undefined }, findings: ["result keys: details", "content: not an array"] },
  { id: "content-null", result: { content: null, details: undefined }, findings: ["content: not an array"] },
  // U1: an extra element key after type (GP3-M02 with GW02's zz, defined after type and text) and between text and type, an
  // underscore-led element key (GP3-M04), and an element key in another case.
  { id: "item-key-after-type", result: { content: [item({ zz: true })], details: undefined }, findings: ["item keys: text,type,zz"] },
  { id: "item-key-between", result: { content: [item({ title: "x" })], details: undefined }, findings: ["item keys: text,title,type"] },
  { id: "item-underscore-key", result: { content: [item({ _zz: true })], details: undefined }, findings: ["item keys: _zz,text,type"] },
  { id: "item-key-case", result: { content: [{ Text: T, type: "text" }], details: undefined }, findings: ["item keys: Text,type", "item text: undefined"] },
  // U2: details defined as each primitive kind, as a function and as an inherited primitive (GP3-M03 with GW03's 0): only
  // undefined is not a finding.
  { id: "details-zero", result: { content: [item({})], details: 0 }, findings: ["details: defined"] },
  { id: "details-empty-string", result: { content: [item({})], details: "" }, findings: ["details: defined"] },
  { id: "details-false", result: { content: [item({})], details: false }, findings: ["details: defined"] },
  { id: "details-function", result: { content: [item({})], details: () => undefined }, findings: ["details: defined"] },
  { id: "details-symbol", result: { content: [item({})], details: Symbol("zz-details") }, findings: ["details: defined"] },
  { id: "details-bigint", result: { content: [item({})], details: 0n }, findings: ["details: defined"] },
  { id: "inherited-primitive-details", result: Object.assign(Object.create({ details: 0 }), { content: [item({})] }), findings: ["result keys: content", "details: defined"] },
  // The text and the type with something before them, and a result of each primitive kind.
  { id: "text-leading-padded", result: { content: [item({ text: ` ${T}` })], details: undefined }, findings: [`item text: ${JSON.stringify(` ${T}`)}`] },
  { id: "text-ends-with", result: { content: [item({ text: `x${T}` })], details: undefined }, findings: [`item text: ${JSON.stringify(`x${T}`)}`] },
  { id: "type-leading-padded", result: { content: [item({ type: " text" })], details: undefined }, findings: ['item type: " text"'] },
  { id: "type-ends-with", result: { content: [item({ type: "plaintext" })], details: undefined }, findings: ['item type: "plaintext"'] },
  { id: "result-string", result: T, findings: ["result: not an object"] },
  { id: "result-number", result: 0, findings: ["result: not an object"] },
  { id: "result-boolean", result: false, findings: ["result: not an object"] },
  { id: "result-symbol", result: Symbol("zz-result"), findings: ["result: not an object"] },
  { id: "result-bigint", result: 0n, findings: ["result: not an object"] },
  // wb-bk8a (R-B395; wb-g20x refusal #3, O:1873): the INNER forms, a text and a type that differ from the expected one at an
  // inner character. Under GP8-M01's format-character fold and GP8-M02's printable-ASCII fold the judge reads no finding at
  // text-inner-invisible, and under GP8-M03's fold of the type at type-inner-zero-width.
  { id: "text-inner-invisible", result: { content: [item({ text: inserted(6, INVISIBLE) })], details: undefined }, findings: [`item text: ${JSON.stringify(inserted(6, INVISIBLE))}`] },
  { id: "text-inner-zero-width", result: { content: [item({ text: inserted(6, ZERO_WIDTH) })], details: undefined }, findings: [`item text: ${JSON.stringify(inserted(6, ZERO_WIDTH))}`] },
  { id: "text-inner-non-ascii", result: { content: [item({ text: inserted(6, NON_ASCII_LETTER) })], details: undefined }, findings: [`item text: ${JSON.stringify(inserted(6, NON_ASCII_LETTER))}`] },
  { id: "text-inner-control", result: { content: [item({ text: inserted(6, CONTROL) })], details: undefined }, findings: [`item text: ${JSON.stringify(inserted(6, CONTROL))}`] },
  { id: "text-inner-combining", result: { content: [item({ text: inserted(8, COMBINING_ACUTE) })], details: undefined }, findings: [`item text: ${JSON.stringify(inserted(8, COMBINING_ACUTE))}`] },
  { id: "text-inner-space", result: { content: [item({ text: inserted(4, " ") })], details: undefined }, findings: [`item text: ${JSON.stringify(inserted(4, " "))}`] },
  { id: "text-inner-fullwidth", result: { content: [item({ text: replaced(4, FULLWIDTH_E) })], details: undefined }, findings: [`item text: ${JSON.stringify(replaced(4, FULLWIDTH_E))}`] },
  { id: "text-inner-letter", result: { content: [item({ text: replaced(10, "a") })], details: undefined }, findings: [`item text: ${JSON.stringify(replaced(10, "a"))}`] },
  { id: "type-inner-zero-width", result: { content: [item({ type: `te${ZERO_WIDTH}xt` })], details: undefined }, findings: [`item type: ${JSON.stringify(`te${ZERO_WIDTH}xt`)}`] },
  { id: "type-inner-non-ascii", result: { content: [item({ type: `te${NON_ASCII_LETTER}xt` })], details: undefined }, findings: [`item type: ${JSON.stringify(`te${NON_ASCII_LETTER}xt`)}`] },
];

const run = (): undefined => undefined;
/** A tool written as a class: its execute is a prototype method. */
class ZzClassTool {
  execute(): undefined {
    return undefined;
  }
}
/** S0: values in the harness tools Map and whether isServedTool reads them as served (refusal #1 U3, GP24-H07). */
const S0_FIXTURES: readonly { readonly id: string; readonly value: unknown; readonly served: boolean }[] = [
  { id: "own-execute", value: { name: SERVED_NAME, execute: run }, served: true },
  { id: "async-execute", value: { execute: async () => undefined }, served: true },
  { id: "inherited-execute", value: Object.create({ execute: run }), served: true },
  { id: "class-method", value: new ZzClassTool(), served: true },
  { id: "null-prototype", value: Object.assign(Object.create(null), { execute: run }), served: true },
  { id: "no-execute", value: { name: SERVED_NAME }, served: false },
  { id: "execute-string", value: { execute: "run" }, served: false },
  { id: "execute-object", value: { execute: { call: run } }, served: false },
  { id: "array-tool", value: Object.assign([], { execute: run }), served: false },
  { id: "function-tool", value: Object.assign(() => undefined, { execute: run }), served: false },
  { id: "null", value: null, served: false },
  { id: "undefined", value: undefined, served: false },
  { id: "string", value: SERVED_NAME, served: false },
];

const lit = (text: string): ReplySite => ({ kind: "literal", text });
const call = (text: string): ReplySite => ({ kind: "call", text });
const other = (text: string): ReplySite => ({ kind: "other", text });
/** A0: planted src texts and the anchor reader's readings of them (refusal #1 U4 and F3, and their class, from quoted-escaped-keys on). */
const A0_FIXTURES: readonly { readonly id: string; readonly text: string; readonly literals: number; readonly sites: readonly ReplySite[] }[] = [
  {
    id: "plain",
    text: 'x({ name: "furnace_observe", execute: async () => { if (a) return textResult("one"); return textResult(sanitize(reading)); } });',
    literals: 1,
    sites: [lit("one"), call("sanitize")],
  },
  {
    id: "first-of-two",
    text: 'x({ name: "furnace_observe", execute: async () => textResult("first") }); x({ name: "furnace_observe", execute: async () => textResult("second") });',
    literals: 2,
    sites: [lit("first")],
  },
  { id: "quoted-keys", text: 'x({ "name": "furnace_observe", "execute": async () => textResult("quoted") });', literals: 1, sites: [lit("quoted")] },
  { id: "escaped-keys", text: 'x({ n\\u0061me: "furnace_observe", ex\\u0065cute: async () => textResult("escaped") });', literals: 1, sites: [lit("escaped")] },
  { id: "escaped-value", text: 'x({ name: "furnace\\u005fobserve", execute: async () => textResult("cooked") });', literals: 1, sites: [lit("cooked")] },
  { id: "computed-key", text: 'x({ ["name"]: "furnace_observe", execute: async () => textResult("c") });', literals: 0, sites: [] },
  { id: "template-value", text: 'x({ name: `furnace_observe`, execute: async () => textResult("t") });', literals: 0, sites: [] },
  {
    id: "wrapped-value",
    text: 'x({ name: "furnace_observe" satisfies string, execute: async () => textResult("w") }); x({ name: ("furnace_observe"), execute: async () => textResult("p") });',
    literals: 0,
    sites: [],
  },
  {
    id: "other-names",
    text: 'x({ name: "Furnace_Observe", execute: async () => textResult("o") }); x({ name: "furnace_observer", execute: async () => textResult("o") });',
    literals: 0,
    sites: [],
  },
  { id: "first-execute", text: 'x({ name: "furnace_observe", execute: async () => textResult("one"), execute: async () => textResult("two") });', literals: 1, sites: [lit("one")] },
  { id: "no-execute", text: 'x({ name: "furnace_observe", run: async () => textResult("r") });', literals: 1, sites: [] },
  {
    id: "nested-order",
    text: 'x({ name: "furnace_observe", execute: async () => { const f = () => textResult("inner"); return textResult("outer"); } });',
    literals: 1,
    sites: [lit("inner"), lit("outer")],
  },
  {
    id: "other-sites",
    text: 'x({ name: "furnace_observe", execute: async () => { textResult(msg); textResult(`t`); textResult(); textResult(a.b()); } });',
    literals: 1,
    sites: [other("msg"), other("`t`"), other(""), other("a.b()")],
  },
  { id: "not-textresult", text: 'x({ name: "furnace_observe", execute: async () => { reply("x"); a.textResult("y"); } });', literals: 1, sites: [] },
  // The keys: a quoted key cooks its escapes as an identifier key does (GP24-H04); a shorthand, a method and a computed execute are not read.
  { id: "quoted-escaped-keys", text: 'x({ "n\\u0061me": "furnace_observe", "ex\\u0065cute": async () => textResult("qe") });', literals: 1, sites: [lit("qe")] },
  { id: "shorthand-name", text: 'x({ name, execute: async () => textResult("s") });', literals: 0, sites: [] },
  { id: "method-execute", text: 'x({ name: "furnace_observe", execute() { return textResult("m"); } });', literals: 1, sites: [] },
  { id: "computed-execute", text: 'x({ name: "furnace_observe", ["execute"]: async () => textResult("c") });', literals: 1, sites: [] },
  { id: "second-name-key", text: 'x({ name: "workflow_observe", name: "furnace_observe", execute: async () => textResult("n") });', literals: 1, sites: [lit("n")] },
  // The value: no wrapper (as: GP24-H03), no assertion and no computed value is read, and only === "furnace_observe" counts.
  {
    id: "as-value",
    text: 'x({ name: "furnace_observe" as const, execute: async () => textResult("a") }); x({ name: "furnace_observe" as string, execute: async () => textResult("s") });',
    literals: 0,
    sites: [],
  },
  {
    id: "assertion-values",
    text: 'x({ name: <string>"furnace_observe", execute: async () => textResult("t") }); x({ name: "furnace_observe"!, execute: async () => textResult("n") });',
    literals: 0,
    sites: [],
  },
  {
    id: "computed-values",
    text: 'x({ name: NAME, execute: async () => textResult("i") }); x({ name: "furnace_" + "observe", execute: async () => textResult("c") }); x({ name: String("furnace_observe"), execute: async () => textResult("f") });',
    literals: 0,
    sites: [],
  },
  {
    id: "other-values",
    text: 'x({ name: " furnace_observe", execute: async () => textResult("1") }); x({ name: "furnace_observe ", execute: async () => textResult("2") }); x({ name: "furnace_observ", execute: async () => textResult("3") }); x({ name: "xfurnace_observe", execute: async () => textResult("4") });',
    literals: 0,
    sites: [],
  },
  // Which literal: the outer of two nested ones; its execute's calls include the inner literal's.
  {
    id: "nested-literals",
    text: 'x({ name: "furnace_observe", execute: async () => { y({ name: "furnace_observe", execute: async () => textResult("inner") }); return textResult("outer"); } });',
    literals: 2,
    sites: [lit("inner"), lit("outer")],
  },
  // The callee: the identifier textResult itself, escaped or called optionally; not under parentheses (GP24-H05), a member, .call, new or a tag.
  {
    id: "callee-forms",
    text: 'x({ name: "furnace_observe", execute: async () => { t\\u0065xtResult("escaped"); textResult?.("optional"); (textResult)("p"); textResult.call(null, "c"); new textResult("n"); textResult`t`; return textResult("last"); } });',
    literals: 1,
    sites: [lit("escaped"), lit("optional"), lit("last")],
  },
  // The order: a call in another's arguments comes after it, in the source order of the calls' starts (F3, GP24-H06).
  { id: "nested-in-argument", text: 'x({ name: "furnace_observe", execute: async () => textResult(f(textResult("a"))) });', literals: 1, sites: [call("f"), lit("a")] },
  // The argument: only the first; a string literal by its cooked text (GP24-H13), an identifier callee by its cooked name, any other form by its source text.
  {
    id: "argument-forms",
    text: 'x({ name: "furnace_observe", execute: async () => { textResult("c\\u006fok\\u0065d"); textResult(s\\u0061nitize(r)); textResult("first", "second"); textResult(("p")); textResult("a" as string); textResult((g)(r)); } });',
    literals: 1,
    sites: [lit("cooked"), call("sanitize"), lit("first"), other('("p")'), other('"a" as string'), other("(g)(r)")],
  },
  // Any other form's source text has no leading trivia: a space and a comment before the argument are not read (GP3-X05).
  { id: "other-trivia", text: 'x({ name: "furnace_observe", execute: async () => textResult( /* note */ msg) });', literals: 1, sites: [other("msg")] },
  // wb-bk8a (R-B428; wb-g20x refusal #4, O:1913, U1): the template literal under every wrapper the value clause names, as the
  // string literal is under them above (wrapped-value, as-value, assertion-values); none is read (G195-M01, G195-M02).
  {
    id: "template-wrapped-values",
    text: 'x({ name: `furnace_observe` satisfies string, execute: async () => textResult("w") }); x({ name: (`furnace_observe`), execute: async () => textResult("p") });',
    literals: 0,
    sites: [],
  },
  {
    id: "template-as-values",
    text: 'x({ name: `furnace_observe` as const, execute: async () => textResult("a") }); x({ name: `furnace_observe` as string, execute: async () => textResult("s") });',
    literals: 0,
    sites: [],
  },
  {
    id: "template-assertion-values",
    text: 'x({ name: <string>`furnace_observe`, execute: async () => textResult("t") }); x({ name: `furnace_observe`!, execute: async () => textResult("n") });',
    literals: 0,
    sites: [],
  },
];

/** Boots the extension with the fake furnace first on PATH, runs read, and restores both. */
async function withServed(grants: readonly string[], read: (boot: ServedBoot, fake: FakeFurnace) => Promise<void>): Promise<void> {
  const fake = installFakeFurnace();
  try {
    if (firstOnPath("furnace") !== fake.binary) throw new Error("the census fake furnace is not first on PATH, so no served call runs");
    const boot = await bootServed(grants);
    try {
      await read(boot, fake);
    } finally {
      boot.restore();
    }
  } finally {
    fake.restore();
  }
}
/** The Error a census observer rejects with, or what it resolved to. */
async function failureOf(read: Promise<unknown>): Promise<unknown> {
  return read.then(
    value => value,
    (error: unknown) => error,
  );
}

describe("wb-g20x: the furnace_observe served census", () => {
  pinned("J0", () => {
    const handed: unknown[] = [];
    const stub = { registerTool: (tool: unknown): unknown => handed.push(tool) };
    const received = recordRegistrations(stub);
    const returned = J0_VALUES.map(value => stub.registerTool(value));
    expect(handed, "every value reaches registerTool unchanged and in order").toStrictEqual([...J0_VALUES]);
    expect(handed.every((value, index) => value === J0_VALUES[index]), "as the same values").toBe(true);
    expect(returned, "and what registerTool returns comes back").toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(received, "the names read, as a property read reads them").toStrictEqual([...J0_NAMES]);
    // A name behind a getter: the recorder reads it once per registration (the getter NOT CLAIMED sentence rests on this).
    let reads = 0;
    const counted = {
      get name(): string {
        reads += 1;
        return "zz-counted-tool";
      },
    };
    expect(stub.registerTool(counted), "the counted tool reaches registerTool").toBe(12);
    expect([received.at(-1), reads], "and its name is read once").toStrictEqual(["zz-counted-tool", 1]);
    // A registerTool installed over the recorder that calls it (a wrapper bound to the pi, GP23-REGISTER-PATCH's shape).
    const bound = stub.registerTool.bind(stub);
    stub.registerTool = (tool: unknown): unknown => bound({ name: "zz-wrapped", wrapped: tool });
    expect(stub.registerTool({ name: SERVED_NAME }), "the wrapper reaches registerTool through the recorder").toBe(13);
    expect([received.at(-1), handed.length], "which reads the name the wrapper hands on").toStrictEqual(["zz-wrapped", 13]);
    // The recorder appends a name before it hands the value on: a stub that reads the recorder's list as it is called.
    const lengths: number[] = [];
    let listed: readonly unknown[] = [];
    const ordered = { registerTool: (_tool: unknown): unknown => lengths.push(listed.length) };
    listed = recordRegistrations(ordered);
    ordered.registerTool({ name: "zz-first" });
    ordered.registerTool({ name: "zz-second" });
    expect([lengths, [...listed]], "each name is appended before its value reaches registerTool").toStrictEqual([
      [1, 2],
      ["zz-first", "zz-second"],
    ]);
  });

  pinned("J1", () => {
    for (const fixture of J1_FIXTURES) expect(judgeRegistrations(fixture.received, SERVED_NAME), fixture.id).toStrictEqual([...fixture.findings]);
  });

  pinned("J2", () => {
    for (const fixture of J2_FIXTURES) expect(judgeReply(fixture.result, T), fixture.id).toStrictEqual([...fixture.findings]);
  });

  pinned("S0", () => {
    for (const fixture of S0_FIXTURES) expect(isServedTool(fixture.value), fixture.id).toBe(fixture.served);
  });

  pinned(
    "B0",
    async () => {
      const seen: unknown[][] = [];
      let session: unknown;
      // A planted factory registers one tool while it runs and three from a session_start handler that awaits a turn first,
      // so a recorder installed after the factory, or a session_start that is not awaited, reads a different list.
      const planted: PlantedFactory = pi => {
        pi.registerTool({ name: "zz-factory-tool", execute: run });
        pi.on("session_start", async (event, context) => {
          await new Promise<void>(resolve => setImmediate(resolve));
          session = context;
          seen.push(["session_start", event, realpathSync(context.cwd), JSON.parse(readFileSync(join(context.cwd, ".pi", "subagents.json"), "utf8"))]);
          pi.registerTool({
            name: SERVED_NAME,
            execute: async (...args: unknown[]) => {
              seen.push(["execute", ...args]);
              return "zz-planted-reply";
            },
          });
          pi.registerTool(Object.assign([], { name: "zz-array-tool", execute: run }));
        });
      };
      const boot = await bootServed(["furnace:inspect"], planted);
      try {
        expect(boot.received, "the recorder reads the factory's registration and then session_start's, in order").toStrictEqual(["zz-factory-tool", SERVED_NAME, "zz-array-tool"]);
        expect(seen, "session_start ran once, awaited, with {} and a context whose cwd is the sandbox holding the settings").toStrictEqual([
          ["session_start", {}, boot.workspace, { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["furnace:inspect"] } }],
        ]);
        expect([boot.serves("zz-factory-tool"), boot.serves(SERVED_NAME), boot.serves("zz-array-tool"), boot.serves("zz-absent")], "serves is isServedTool of the entry under the name").toStrictEqual([true, true, false, false]);
        expect(await boot.call({ runId: "zz-run" }), "call resolves to what the served execute returns").toBe("zz-planted-reply");
        const executed = seen.at(-1) ?? [];
        expect(executed.slice(0, 5), 'which it calls as execute("census", params, undefined, undefined, ...)').toStrictEqual(["execute", "census", { runId: "zz-run" }, undefined, undefined]);
        expect([executed.length, executed[5] === session], "with the session_start context last").toStrictEqual([6, true]);
      } finally {
        boot.restore();
      }
      const refused = await bootServed([], pi => {
        pi.on("session_start", async () => {
          pi.registerTool(Object.assign([], { name: SERVED_NAME, execute: run }));
        });
      });
      try {
        expect([refused.received, refused.serves(SERVED_NAME)], "an array tool under furnace_observe is registered and not served").toStrictEqual([[SERVED_NAME], false]);
        await expect(refused.call({ runId: "zz-run" }), "so call throws").rejects.toThrow(`the harness serves no ${SERVED_NAME} execute`);
      } finally {
        refused.restore();
      }
    },
  );

  pinned("K1", () => {
    const harness = makePi();
    harness.pi.registerTool({ name: "zz-served", parameters: {}, marker: "first" });
    harness.pi.registerTool({ name: "zz-served", parameters: {}, marker: "second" });
    harness.pi.registerTool({ name: "zz-other", parameters: {}, marker: "other" });
    const marker = (name: string): unknown => {
      const tool: unknown = harness.tools.get(name);
      return typeof tool === "object" && tool !== null && "marker" in tool ? tool.marker : undefined;
    };
    expect([marker("zz-served"), marker("zz-other"), harness.tools.size], "the harness serves the last tool registered under a name").toStrictEqual(["second", "other", 2]);
    const loader = readFileSync(join(REPO, LOADER), "utf8");
    const method = loader.slice(loader.indexOf("registerTool(tool) {"), loader.indexOf("registerCommand(name, options) {"));
    expect(loader.split("extension.tools.set(").length - 1, "pi's loader sets extension.tools at one site").toBe(1);
    expect([method.includes("extension.tools.set(tool.name, {"), method.includes("definition: tool,")], "inside registerTool, keyed by tool.name with the tool as definition").toStrictEqual([true, true]);
  });

  pinned("I1", async () => {
    const fake = installFakeFurnace();
    const workspace = "/census-served/workspace";
    try {
      expect(firstOnPath("furnace"), "the fake is the first furnace on PATH").toBe(fake.binary);
      expect(await atFixedDate(async () => new Date().toISOString()), "Date reads the fixed instant inside atFixedDate").toBe(FIXED_NOW);
      expect(new Date().toISOString() === FIXED_NOW, "and the real clock after it").toBe(false);
      for (const id of ["complete", "partial"] as const) {
        const runId = `frn-run-census-${id}`;
        fake.play(scenario(id, runId, workspace));
        const reading = await atFixedDate(() => ownObserver(fake, workspace, runId).snapshot());
        expect([reading.completeness, reading.capturedAt, reading.observedAt, reading.lastConfirmedAt], `${id}: the census observer's reading`).toStrictEqual([id, FIXED_NOW, FIXED_NOW, FIXED_NOW]);
        expect(reading.source.producerVersion, `${id}: its producer version holds INVISIBLE`).toBe(`0.1.0${INVISIBLE}census`);
        expect([JSON.stringify(reading).includes(INVISIBLE), sanitizeWorkbenchJsonText(reading).includes(INVISIBLE)], `${id}: the sanitizer removes it`).toStrictEqual([true, false]);
      }
      fake.play(scenario("failing", "frn-run-census-failing", workspace));
      const failure = await failureOf(atFixedDate(() => ownObserver(fake, workspace, "frn-run-census-failing").snapshot()));
      expect(failure, "the failing Run is rejected with an Error").toBeInstanceOf(Error);
      expect(failure instanceof Error ? failure.message : failure, "whose message is FAILING_MESSAGE").toBe(FAILING_MESSAGE);
      expect(sanitizeWorkbenchText(FAILING_MESSAGE), "a text the error reply's sanitizer leaves unchanged").toBe(FAILING_MESSAGE);
      fake.play({});
      const unanswered = spawnSync(fake.binary, ["run", "status", "frn-run-census-unanswered", "--json"], { encoding: "utf8" });
      expect([unanswered.status, unanswered.stdout], "a command no answer names exits 2 with nothing on stdout").toStrictEqual([2, ""]);
    } finally {
      fake.restore();
    }
    expect(firstOnPath("furnace") === fake.binary, "after restore the fake is off PATH").toBe(false);
  });

  pinned(
    "C0",
    async () => {
      const arms: boolean[] = [];
      for (const grants of [[], ["furnace:inspect"]]) {
        arms.push((grants as readonly string[]).includes("furnace:inspect"));
        await withServed(grants, async boot => {
          const settings: unknown = JSON.parse(readFileSync(join(boot.workspace, ".pi", "subagents.json"), "utf8"));
          expect(settings, `grants ${JSON.stringify(grants)}: the boot's settings`).toStrictEqual({ workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...grants] } });
          expect(judgeRegistrations(boot.received, SERVED_NAME), `grants ${JSON.stringify(grants)}: one furnace_observe registration`).toStrictEqual([]);
          expect(boot.serves(SERVED_NAME), `grants ${JSON.stringify(grants)}: the harness serves its execute`).toBe(true);
        });
      }
      expect(arms, "C0 booted once without the furnace:inspect grant and then once with it").toStrictEqual([false, true]);
    },
  );

  pinned(
    "C1",
    async () => {
      await withServed([], async boot => {
        expect(judgeReply(await boot.call({ runId: "frn-run-census-grant" }), REFUSALS.grant)).toStrictEqual([]);
      });
    },
  );

  pinned(
    "C2",
    async () => {
      await withServed(["furnace:inspect"], async boot => {
        expect(judgeReply(await boot.call({ runId: "census-not-a-run" }), REFUSALS.identity)).toStrictEqual([]);
      });
    },
  );

  for (const [id, run] of [
    ["C3", "complete"],
    ["C4", "partial"],
  ] as const) {
    pinned(
      id,
      async () => {
        await withServed(["furnace:inspect"], async (boot, fake) => {
          const runId = `frn-run-census-${run}`;
          fake.play(scenario(run, runId, boot.workspace));
          const [result, reading] = await atFixedDate(async () => [await boot.call({ runId }), await ownObserver(fake, boot.workspace, runId).snapshot()] as const);
          expect(reading.completeness, "the census observer's reading").toBe(run);
          expect(judgeReply(result, sanitizeWorkbenchJsonText(reading))).toStrictEqual([]);
          // wb-bk8a: THE PLAIN JSON REPLY, a reply of the reading's plain JSON text, which holds INVISIBLE, reads one text finding;
          // GP8-M01's and GP8-M02's folds read none.
          const plain = JSON.stringify(reading);
          expect(plain.includes(INVISIBLE), "the reading's plain JSON text holds INVISIBLE").toBe(true);
          expect(judgeReply({ content: [{ type: "text", text: plain }], details: undefined }, sanitizeWorkbenchJsonText(reading)), "the plain JSON reply reads one text finding").toStrictEqual([
            `item text: ${JSON.stringify(plain)}`,
          ]);
        });
      },
    );
  }

  pinned(
    "C5",
    async () => {
      await withServed(["furnace:inspect"], async (boot, fake) => {
        const runId = "frn-run-census-failing";
        fake.play(scenario("failing", runId, boot.workspace));
        const [result, failure] = await atFixedDate(async () => [await boot.call({ runId }), await failureOf(ownObserver(fake, boot.workspace, runId).snapshot())] as const);
        expect(failure, "the census observer rejects the Run with an Error").toBeInstanceOf(Error);
        expect(judgeReply(result, sanitizeWorkbenchText(failure instanceof Error ? failure.message : String(failure)))).toStrictEqual([]);
      });
    },
  );

  pinned("A0", () => {
    for (const fixture of A0_FIXTURES) {
      const read = sourceAnchors(fixture.text);
      expect([read.literals, read.sites], fixture.id).toStrictEqual([fixture.literals, [...fixture.sites]]);
    }
  });

  pinned("A1", () => {
    const anchors = sourceAnchors(readFileSync(join(REPO, "src/index.ts"), "utf8"));
    expect(anchors.literals, "one registration row per furnace_observe literal").toBe(ROWS.filter(row => row.anchor === "registration").length);
    expect(anchors.sites, "its execute's textResult sites are the reply rows' sites, in order").toStrictEqual(ROWS.flatMap(row => (row.anchor === "reply" ? [row.site] : [])));
  });

  pinned("F1", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toStrictEqual(["registered:6", "grant:5", "identity:5", "data:7", "error:6"]);
    expect(ROWS.map(row => row.clause)).toStrictEqual([
      "the pinned boot, booted once without the furnace:inspect grant and once with it, hands the harness's registerTool exactly one tool named furnace_observe",
      "without the furnace:inspect grant the served furnace_observe replies to C1's call with a result judgeReply reads as textResult(REFUSALS.grant)",
      "with the grant it replies to C2's call with a result judgeReply reads as textResult(REFUSALS.identity)",
      "for the complete and the partial pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchJsonText(R))",
      "for the failing pinned Run it replies with a result judgeReply reads as textResult(sanitizeWorkbenchText(M))",
    ]);
    expect(CASE_IDS).toStrictEqual(["J0", "J1", "J2", "S0", "B0", "K1", "I1", "C0", "C1", "C2", "C3", "C4", "C5", "A0", "A1", "F1", "J3"]);
    expect([...SCENARIO_IDS]).toStrictEqual(["complete", "partial", "failing"]);
    expect([...J0_NAMES]).toStrictEqual(["Agent", "Furnace_Observe", "furnace_observe", "furnace_observe", undefined, undefined, "", "zzNamedTool", "zz-array-tool", "zz-inherited-tool", undefined]);
    expect(J1_FIXTURES.map(fixture => fixture.id)).toStrictEqual(["none", "one", "among-others", "twice", "thrice", "case-variants", "longer-shorter", "padded", "not-strings"]);
    expect(J2_FIXTURES.map(fixture => fixture.id)).toStrictEqual([
      "exact",
      "text-differs",
      "text-case",
      "text-padded",
      "text-prefix",
      "two-items",
      "no-items",
      "content-not-array",
      "item-not-object",
      "details-defined",
      "details-null",
      "details-absent",
      "extra-result-key",
      "item-extra-key",
      "item-type",
      "not-an-object",
      "an-array",
      "text-wrapped",
      "text-array",
      "text-absent",
      "type-wrapped",
      "type-array",
      "type-case",
      "type-padded",
      "item-array",
      "item-function",
      "item-null",
      "result-array-shaped",
      "result-function",
      "result-null",
      "content-array-like",
      "result-key-order",
      "item-key-order",
      "result-inherited-keys",
      "item-inherited-keys",
      "inherited-details",
      "unread-keys",
      "all-findings",
      "ends-at-content",
      "ends-at-count",
      "ends-at-item",
      "result-key-before-content",
      "result-underscore-key",
      "result-key-between",
      "result-key-defined-first",
      "result-dollar-key",
      "result-digit-key",
      "result-empty-key",
      "result-key-case",
      "result-key-padded",
      "content-absent",
      "content-null",
      "item-key-after-type",
      "item-key-between",
      "item-underscore-key",
      "item-key-case",
      "details-zero",
      "details-empty-string",
      "details-false",
      "details-function",
      "details-symbol",
      "details-bigint",
      "inherited-primitive-details",
      "text-leading-padded",
      "text-ends-with",
      "type-leading-padded",
      "type-ends-with",
      "result-string",
      "result-number",
      "result-boolean",
      "result-symbol",
      "result-bigint",
      "text-inner-invisible",
      "text-inner-zero-width",
      "text-inner-non-ascii",
      "text-inner-control",
      "text-inner-combining",
      "text-inner-space",
      "text-inner-fullwidth",
      "text-inner-letter",
      "type-inner-zero-width",
      "type-inner-non-ascii",
    ]);
    expect(S0_FIXTURES.map(fixture => `${fixture.id}:${fixture.served}`)).toStrictEqual([
      "own-execute:true",
      "async-execute:true",
      "inherited-execute:true",
      "class-method:true",
      "null-prototype:true",
      "no-execute:false",
      "execute-string:false",
      "execute-object:false",
      "array-tool:false",
      "function-tool:false",
      "null:false",
      "undefined:false",
      "string:false",
    ]);
    expect(A0_FIXTURES.map(fixture => fixture.id)).toStrictEqual([
      "plain",
      "first-of-two",
      "quoted-keys",
      "escaped-keys",
      "escaped-value",
      "computed-key",
      "template-value",
      "wrapped-value",
      "other-names",
      "first-execute",
      "no-execute",
      "nested-order",
      "other-sites",
      "not-textresult",
      "quoted-escaped-keys",
      "shorthand-name",
      "method-execute",
      "computed-execute",
      "second-name-key",
      "as-value",
      "assertion-values",
      "computed-values",
      "other-values",
      "nested-literals",
      "callee-forms",
      "nested-in-argument",
      "argument-forms",
      "other-trivia",
      "template-wrapped-values",
      "template-as-values",
      "template-assertion-values",
    ]);
  });

  pinned("J3", () => {
    for (const row of ROWS) {
      expect(row.pins, `${row.id}: its pins are the cases naming it`).toStrictEqual(CASE_IDS.filter(id => (CASES[id].rows as readonly string[]).includes(row.id)));
    }
    const named = CASE_IDS.flatMap(id => [...CASES[id].rows]);
    expect(named.filter(id => !ROWS.some(row => row.id === id)), "every row a case names exists").toStrictEqual([]);
    expect([...registered].sort(), "every case is registered").toStrictEqual([...CASE_IDS].sort());
    expect(new Set(registered).size, "and once").toBe(registered.length);
  });
});
