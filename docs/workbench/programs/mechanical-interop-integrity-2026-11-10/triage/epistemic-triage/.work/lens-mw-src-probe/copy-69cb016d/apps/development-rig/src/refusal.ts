/**
 * The CLI's refusal line names an Error by its message; anything else, or a blank
 * message, is UNKNOWN_ERROR so the line never carries an empty reason.
 */
export function refusalReason(error: unknown): string {
  return error instanceof Error && error.message.trim().length > 0 ? error.message : "UNKNOWN_ERROR";
}
