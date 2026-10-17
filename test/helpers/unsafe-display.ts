/**
 * unsafe-display.ts - the one display-safety oracle the suites share (wb-8bi).
 *
 * Why this exists: four suites each carried their own copy of the "what a display string must never carry" regex and three of
 * them had moved past the unwidened form to the wb-rqd format-control ranges, so a renderer keeping U+FFF9-U+FFFB or
 * U+13430-U+1343F passed every oracle check in the unwidened copies unseen. One definition removes the drift class; the census in
 * test/workbench-unsafe-display-oracle.test.ts fails any suite that declares its own unequal copy again.
 */

/**
 * Anything a display string must never carry: C0/C1 controls, line/paragraph separators, default-ignorables, lone surrogates, and
 * the format controls that defeat a reader (wb-rqd: the interlinear annotation controls and the Egyptian hieroglyph format
 * controls).
 */
export const UNSAFE_DISPLAY = /[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}\u{fff9}-\u{fffb}\u{13430}-\u{1343f}]|\p{Default_Ignorable_Code_Point}|[\u{d800}-\u{dfff}]/u;
