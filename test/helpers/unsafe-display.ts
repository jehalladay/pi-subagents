/**
 * unsafe-display.ts - the one display-safety oracle the suites share (wb-8bi).
 *
 * Why this exists: eight suites each carried their own copy of the "what a display string must never carry" regex; four had
 * moved past the unwidened form to the wb-rqd format-control ranges and four had not, so a renderer keeping U+FFF9-U+FFFB or
 * U+13430-U+1343F passed every oracle check in the unwidened copies unseen. One definition removes the drift class: those eight
 * suites import UNSAFE_DISPLAY, and the by-body census in test/helpers/unsafe-display-census.ts (run by
 * test/workbench-unsafe-display-oracle.test.ts) fails any regular expression under test/ that reads as a display-safety oracle
 * but is not byte-equal to this one, whatever its binding is named; the byte-equal copies it pins stay equal or go red.
 */

/**
 * Anything a display string must never carry: C0/C1 controls, line/paragraph separators, default-ignorables, lone surrogates, and
 * the format controls that defeat a reader (wb-rqd: the interlinear annotation controls and the Egyptian hieroglyph format
 * controls).
 */
export const UNSAFE_DISPLAY = /[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}\u{fff9}-\u{fffb}\u{13430}-\u{1343f}]|\p{Default_Ignorable_Code_Point}|[\u{d800}-\u{dfff}]/u;
