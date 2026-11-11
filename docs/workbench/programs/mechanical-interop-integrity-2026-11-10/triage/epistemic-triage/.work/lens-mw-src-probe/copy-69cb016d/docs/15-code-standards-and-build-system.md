# 15 — Code standards and the build system

This page states the repository's aesthetic conventions, organization rules and build-system contract. Every
convention here describes what the committed tree already does; the mechanical subset is enforced by
`scripts/check-standards.ts` inside the `structure` gate leg, so a violation fails `npm run structure` and the
Forge gate. Package boundaries and dependency direction stay owned by [03](03-architecture-and-package-boundaries.md).

## Aesthetic standards

Mechanically enforced (error codes from `scripts/check-standards.ts`):

- **Kebab-case TypeScript filenames** (`NON_KEBAB_TS_FILENAME`): `artifact-recovery.ts`, `check-docs.test.ts`.
  Dot-separated suffixes such as `.test` mark the file's role.
- **Named exports only** in `packages/`, `apps/`, `qa/` and `examples/` (`DEFAULT_EXPORT_FORBIDDEN`): a default
  export loses its name at every import site. `scripts/` is excluded because checker tests hold literal
  counter-examples as fixture strings.
- **Relative imports carry an explicit extension** (`RELATIVE_IMPORT_WITHOUT_EXTENSION`): compiled packages import
  `./contracts.js`; sources run directly by Node (`examples/`, `scripts/`) import `./fixture-examples.ts`.
  Node ESM resolves no bare `./name`.

Advisory, followed by the dominant style and expected of new code:

- ECMAScript modules throughout; `import type` for type-only imports; `node:`-prefixed builtins.
- `readonly` fields on contract interfaces; discriminated unions carry a `kind` field
  (`packages/development/src/contracts.ts`, `repair.ts`).
- Doc comments state claims about behavior and authority, not restatements of the signature
  ("One explicit repair handoff for a rejected candidate, never an automatic retry.").
- Tests use `node:test` with `node:assert/strict`; a test name is a full behavior sentence
  ("the producer crashes at the seeded step and leaves its partial artifact…").
- Two-space indentation and lines ≤ 120 columns for new code. Measured maxima today: 329
  (`packages/development`), 550 (`packages/coordination`), 694 (`apps/development-rig`); migrate opportunistically
  when touching a line, never as blanket churn.
- Commit messages follow the Gas Town standard: E-Prime subject ≤ 100 chars, PROBLEM / ROOT CAUSE / SOLUTION /
  TDD TESTING / RISKS AND URGENCY / PROVENANCE body sections.

## Organization standards

- **Three Forge workspace members** (`forge.workspace.toml`, enforced by `scripts/check-structure.ts`):
  `packages/development`, `packages/coordination` (libraries), `apps/development-rig` (composition root).
  The repository root is a Forge package but not a workspace member.
- **Member layout**: sources in `src/`, tests in `test/*.test.ts` importing the member's compiled `../dist/index.js`
  so tests exercise what ships; `src/index.ts` is the only public surface and re-exports named symbols plus their types.
- **Repository-level tiers**: `scripts/` holds the mechanical gates and their own `scripts/*.test.ts`; `qa/` holds
  integration, adversarial and evidence suites typechecked by `tsconfig.qa.json`; `examples/` holds runnable
  journeys; `contracts/` holds versioned JSON schemas/entrypoints (`*.v1.json`); `docs/` holds the numbered
  `NN-kebab.md` series (`DOC_FILENAME_NOT_NUMBERED_KEBAB`) with design programs under `docs/programs/`.
- **No new runtime dependency**: `scripts/runtime-dependencies.test.ts` compares every non-`node_modules` `package.json`
  (`dependencies`, `optionalDependencies`, `peerDependencies`, `bundleDependencies`; `devDependencies` excluded) and every
  Python dependency manifest file against `scripts/runtime-dependencies.baseline.json`, so the root `test` step fails with
  `RUNTIME_DEPENDENCY_ADDED` or `PYTHON_DEPENDENCY_MANIFEST_ADDED` on any addition. Python ruling: the tree holds no Python
  manifest (the consumer suite uses the standard library), so any such file counts as a new runtime dependency.
- Dependency direction, provider-SDK bans and ownership stay as [03](03-architecture-and-package-boundaries.md)
  states them; `check-structure.ts` enforces the mechanical subset (member set, workspace legs, SDK import bans).

## The build system

One authoritative full gate, npm as the only declared toolchain (mise pins Node), Forge as the only gate runner:

- `npm run gate` = `structure && test && docs:check`; `npm test` builds all three members then runs
  `scripts/*.test.ts` and every member's `test/*.test.ts`.
- The root Forge gate (`forge.toml`) runs six legs: `structure`, `typing`, `test`, `python-consumer`, `evidence`,
  `docs`. `FORGE_JSON=1 forge gate` is the gate of record; `tiers = ["structure", "typing", "test", "docs"]`.
- Each member `forge.toml` declares its own local gate (`typing`, `test`) for member-scoped verification.

### Forge incremental builds

Every `[build.commands]` leg in every manifest declares `inputs` — the set of paths capable of changing that leg's
verdict (`FORGE_LEG_WITHOUT_INPUTS` enforces this). A leg without `inputs` is always selected and silently defeats
selection. Shared roots every member reads (`tsconfig.base.json`, root `package.json`, `package-lock.json`,
`.mise.toml`) are declared as `affected_global_paths` in `forge.workspace.toml`, so a change there marks all
members affected; cross-member invalidation for `apps/development-rig` flows from its declared dependency on
`library:workflows-development` through the workspace lock (`forge workspace lock` regenerates `forge.lock.json`).

Daily use:

```bash
forge gate --list --impacted --impacted-ref origin/main --json   # plan: which legs a change selects, runs nothing
forge gate --impacted --impacted-ref origin/main --json          # run only the selected legs
forge build --impacted --json                                    # same pruning on the build verb
forge affected //...                                             # which workspace members a change reaches
```

Honesty rules, from the Forge incremental contract:

- **Selected is not passed**: a pruned run exits 3 with `skipped_reason: "not-impacted"` rows; it is PARTIAL
  evidence, never a whole-gate PASS. Only the full `forge gate` claims the whole gate.
- An `inputs` declaration claims *everything capable of changing the verdict*, not just files that usually matter;
  keep a leg broad (like the root `test` leg) until its true reader set is maintainable.
- A replayed verdict is not a fresh measurement: read the envelope's `provenance.state`.
- **A leg's inputs must cover every live source its environment holds**: the npm workspace links the three
  members into `node_modules`, so every root leg names `packages/**` and `apps/**` (directly or via narrower
  member globs) — otherwise Forge withholds pruning with `FORGE_IMPACTED_CLOSURE_INCOMPLETE` and `--impacted`
  selects everything anyway.
