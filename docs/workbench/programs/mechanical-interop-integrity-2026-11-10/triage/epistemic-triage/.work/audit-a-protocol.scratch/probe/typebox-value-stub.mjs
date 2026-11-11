export function Check() { throw new Error("typebox stub: Check is not available in this read-only probe"); }
export const Type = new Proxy({}, { get() { throw new Error("typebox stub"); } });
