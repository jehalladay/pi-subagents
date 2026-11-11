/**
 * WP-G local live composition root (docs/09; carried by 4vw).
 *
 * The bounded Claude/Git/Forge slice discovers scope by Git tracked-file census and renders
 * plain context. This root wires the REAL seams alongside agent and Forge: HX task scope
 * through discoverTaskScope with proven complete coverage, and RF task-grounded render
 * provenance through renderTaskContext. It fails closed: partial or unknown HX coverage,
 * a scope with no evidence, a placeholder render, or an RF context whose provenance does not
 * carry the task and revision each refuse rather than degrade to the census or plain text.
 */

import type { CompiledContext, DevelopmentRequest, ScopeResult } from "@mechanical/workflows-development";

export type RenderTaskContext = (root: string, task: string, revision: string, model: string) => Promise<RfContext>;
import { discoverTaskScope, type HxExecute } from "./hx-scope.js";
import type { RfContext, RfExecutor } from "./rf-context.js";

export type CompositionRefusalCode =
  | "COMPOSE_RF_RENDERER_MISSING"
  | "COMPOSE_SCOPE_COVERAGE_NOT_COMPLETE"
  | "COMPOSE_SCOPE_EVIDENCE_MISSING"
  | "COMPOSE_SCOPE_EMPTY"
  | "COMPOSE_RF_MODEL_MISSING"
  | "COMPOSE_RF_PROVENANCE_UNGROUNDED"
  | "COMPOSE_RF_PLACEHOLDER";

export class CompositionRefusal extends Error {
  readonly code: CompositionRefusalCode;
  constructor(code: CompositionRefusalCode, detail: string) {
    super(`${code}: ${detail}`);
    this.code = code;
  }
}

export interface LiveCompositionOptions {
  readonly model?: string;
  readonly hxExecute?: HxExecute;
  /** Injection seam so the evidence guard is provable; defaults to the real HX discovery. */
  readonly discoverScope?: typeof discoverTaskScope;
  /** The RF renderer, supplied by the adapter layer; RF values never flow through this module. */
  readonly renderContext?: RenderTaskContext;
  readonly rfExecutor?: RfExecutor;
}

export interface LiveCompositionRoot {
  readonly discover: (request: DevelopmentRequest) => Promise<ScopeResult>;
  readonly compileContext: (scope: ScopeResult, request: DevelopmentRequest, root: string, revision: string) => Promise<CompiledContext>;
}

const PLACEHOLDER_MARKERS: readonly string[] = Object.freeze(["TODO", "PLACEHOLDER", "lorem ipsum"]);

/** Wire real HX scope and RF render provenance, failing closed on anything partial. */
export function composeLiveRoot(options: LiveCompositionOptions): LiveCompositionRoot {
  const discover = async (request: DevelopmentRequest): Promise<ScopeResult> => {
    const discoverImpl = options.discoverScope ?? discoverTaskScope;
    const scope = options.hxExecute === undefined
      ? await discoverImpl(request)
      : await discoverImpl(request, options.hxExecute);
    if (scope.coverage !== "complete") {
      throw new CompositionRefusal("COMPOSE_SCOPE_COVERAGE_NOT_COMPLETE", `HX scope coverage is ${scope.coverage}; the composition root requires proven complete coverage`);
    }
    if (scope.evidence === undefined || scope.evidence.id.trim() === "") {
      throw new CompositionRefusal("COMPOSE_SCOPE_EVIDENCE_MISSING", "a complete scope still needs its HX evidence reference");
    }
    if (scope.files.length === 0) {
      throw new CompositionRefusal("COMPOSE_SCOPE_EMPTY", "a scope with zero files cannot ground a task");
    }
    return scope;
  };
  const compileContext = async (scope: ScopeResult, request: DevelopmentRequest, root: string, revision: string): Promise<CompiledContext> => {
    if (options.model === undefined || options.model.trim() === "") {
      throw new CompositionRefusal("COMPOSE_RF_MODEL_MISSING", "RF context requires an explicit model");
    }
    if (options.renderContext === undefined) {
      throw new CompositionRefusal("COMPOSE_RF_RENDERER_MISSING", "the adapter layer must supply the RF renderer; this root carries no RF value import");
    }
    const result: RfContext = await options.renderContext(root, request.task, revision, options.model);
    if (
      result.basis.workspaceId !== root || result.basis.revision !== revision ||
      result.evidence?.system !== "reactive-fiber" || result.evidence.kind !== "render" || !result.evidence.id ||
      !result.text.includes(request.task) || !result.text.includes(revision)
    ) {
      throw new CompositionRefusal("COMPOSE_RF_PROVENANCE_UNGROUNDED", "the rendered context and source basis did not agree on task, revision and render evidence");
    }
    const lower = result.text.toLowerCase();
    for (const marker of PLACEHOLDER_MARKERS) {
      if (lower.includes(marker.toLowerCase())) {
        throw new CompositionRefusal("COMPOSE_RF_PLACEHOLDER", `the rendered context carries the placeholder marker ${marker}`);
      }
    }
    return result;
  };
  return Object.freeze({ discover, compileContext });
}
