import type {
  DevelopmentRequest, DevelopmentServices,
} from "@mechanical/workflows-development";

/** Only for tests and demos. Deliberately does not import provider SDKs. */
export function createFixtureServices(): DevelopmentServices {
  return {
    async discover(request: DevelopmentRequest) {
      return {
        basis: { workspaceId: request.workspaceId, revision: request.baseRevision },
        coverage: "complete",
        files: ["fixture/example.ts"],
        evidence: { system: "fixture", kind: "scope", id: "synthetic-scope" },
      } as const;
    },
    async compileContext(scope) {
      return {
        basis: scope.basis,
        text: "FIXTURE CONTEXT: no real model or ReactiveFiber invocation",
        evidence: { system: "fixture", kind: "context", id: "synthetic-context" },
      };
    },
    async implement(_context, scope) {
      return {
        parentBasis: scope.basis,
        basis: { workspaceId: scope.basis.workspaceId, revision: "fixture-candidate" },
        evidence: { system: "fixture", kind: "candidate", id: "synthetic-candidate" },
      };
    },
    async verify(candidate) {
      return {
        basis: candidate.basis,
        verdict: "passed",
        evidence: { system: "fixture", kind: "gate", id: "synthetic-gate" },
        diagnostic: "FIXTURE ONLY: no Forge gate executed",
      } as const;
    },
  };
}
