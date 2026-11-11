/** The one rf executable resolution shared by the RF adapters (MechanicalWorkflows-iavw1). */
/** MECHANICAL_RF_BINARY when set and nonblank (as MECHANICAL_FORGE_BINARY names forge), else a bare-name PATH lookup. */
export function rfExecutable():string { const named=process.env["MECHANICAL_RF_BINARY"]; return named!==undefined&&named!==""?named:"rf" }
