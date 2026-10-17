# Native SDK artifacts

The Workbench imports the local npm artifacts below. Their exact bytes are part of the package lockfile and execution deployment basis. These artifacts contain SDK clients, not the native Forge, Furnace, or HyperUnix executables. Install those executables independently. Do not infer runtime compatibility from the shared SDK version alone.

| Artifact | SHA-256 |
| --- | --- |
| forge-sdk-0.1.0.tgz | c108a25c0f7ae4cac9b882c1ab16469c4918752ea4a0dceb2d71dd107ce0d8d6 |
| furnace-sdk-0.1.0.tgz | aaa57dcfb1c205ec1f23f07cdffd6af32901bc4b972d81301758a7467ea865a9 |
| hyperunix-sdk-0.1.0.tgz | 655e08b09febcad67732d6e25d6de4bd8e4a683f594c1d5d3d6ff24ff70b107b |

Artifacts were packaged from the corresponding in-house TypeScript SDK distributions during development on 2026-10-15. furnace-sdk-0.1.0.tgz was re-packaged on 2026-10-17 (wb-zby) from Furnace revision 9970621d8 (`sdk/typescript`: `npm run build && npm pack`, 0 tsc diagnostics), whose contract manifest `smithy_model_digest` and generated provenance digest agree (sha256:2cf7c539f9f3...); the 2026-10-15 artifact carried a manifest digest (b044cbe9...) beside validators generated from another model (e5995480...), so its `loadContract()` refused every context decode and the Furnace-hosted adapter failed closed on it. The checksums identify what this consumer installs. They do not establish that the producing checkouts were clean or that every native runtime supports every SDK method. The adapters use independently exercised methods and preserve native errors, coverage, and evidence.

ReactiveFiberCLI currently uses its installed CLI JSON envelope. No unverified TypeScript client or invented SDK method is substituted. Its preview is explicitly noncommitted and carries no durable render identifier.

Run the portable package gate with `forge build --require-complete`. Use `forge run native-read` for installed runtime probes. The initialized RF fixture tier is `WORKBENCH_RF_FIXTURE=/absolute/test/workspace forge run rf-preview`. Neither tier initializes a native store in this package merely to obtain an empty result.

The native SDK dependencies are explicitly bundled in the npm artifact. A `file:vendor/...` declaration alone is insufficient for installing a packed parent: npm resolves those dependencies before the parent extraction makes its vendor directory available. `forge run install-smoke` creates a separate consumer and proves the packed SDK dependencies can actually be imported. It does not prove each native executable is installed in that consumer.

`dependency-lock.json` preserves the exact npm lockfile inside the distributed artifact because npm excludes the root `package-lock.json` when packing. The package smoke requires byte-identical lock copies. Installed invocation identity validates the shipped lock against the package manifest and vendor artifact integrities.
