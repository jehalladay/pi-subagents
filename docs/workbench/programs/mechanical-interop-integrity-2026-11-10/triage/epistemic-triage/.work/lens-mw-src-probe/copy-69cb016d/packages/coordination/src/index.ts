export type { Basis, Budget, ResourceClaim, PolicyAuthority, IntentAuthority, PolicyContext, Target, Intent, TraceEvent, Proposal, Policy } from "./contracts.js";
export { canonicalJson, digest } from "./canonical.js";
export type { JsonValue } from "./canonical.js";
export { reconcile } from "./resolver.js";
export type { RejectionCode, Rejection, Conflict, ResolverInput, Resolution } from "./resolver.js";
export { sequential, sequentialAccepted, parallel, guarded, guardedWithWitness, alternative, inhibit, repeated, initialRepeatedMemory } from "./combinators.js";
export type { SequentialObservation, AcceptedSequentialObservation, SequentialAcceptance, Guard, GuardWitness, WitnessedGuard, Selector, RepeatedSpec, RepeatedMemory } from "./combinators.js";
export { exerciseContractOf } from "./exercise-contracts.js";
export type { ExerciseLeaf, ExercisePartIdentity, ExerciseSequentialNode, ExerciseParallelNode, ExerciseGuardedNode, ExerciseAlternativeNode, ExerciseInhibitNode, ExerciseNode, ExerciseComposition, ExerciseWrapper, ExerciseValidation, ExerciseContract } from "./exercise-contracts.js";
export { runLandingQueue, fifoLanding, restackFirst, oracleLandedOrder, stateHash, labelEpisode, gateDraws, gateStreamStart } from "./landing-queue.js";
export type { LandingCandidate, LandingEvent, LandingEventKind, LandingQueueState, LandingObservation, LandingStep, LandingQueueEpisode, LandingQueueRun } from "./landing-queue.js";
export { runCompactionInheritance, persistAll, provenanceChecked, oracleCompactionOutcome, compactionStateHash, labelCompactionEpisode, summaryProvenance } from "./compaction-inheritance.js";
export type { SummaryStatus, CompactionEventKind, OutcomeStatus, CompactionSummary, CompactionEvent, CompactionOutcome, CompactionState, CompactionObservation, CompactionStep, CompactionInheritanceEpisode, CompactionInheritanceRun } from "./compaction-inheritance.js";
export { runQuorumEvidence, majorityVote, independentTestFirst, oracleQuorum, quorumStateHash, labelQuorumEpisode, DECIDED_CODE } from "./quorum-evidence.js";
export type { QuorumGate, QuorumDecision, QuorumTest, QuorumEventKind, QuorumEvent, QuorumCandidate, QuorumRefusal, QuorumEvidenceState, QuorumCandidateView, QuorumObservation, QuorumStep, QuorumEvidenceEpisode, QuorumEvidenceRun, QuorumOracle } from "./quorum-evidence.js";
export { runColonyResilience, naiveRetry, receiptChecked, oracleColonyOutcome, colonyOutcome, classifyEvidence, colonyStateHash, labelColonyEpisode } from "./colony-resilience.js";
export type { SignalAuthority, ColonyWorkerStatus, ColonyEventKind, EvidenceClass, ColonySignal, ColonyReceipt, ColonyWorker, ColonyEvent, ColonyState, ColonyObservation, ColonyStep, ColonyEpisode, ColonyRun, ColonyOutcome } from "./colony-resilience.js";

export { runArtifactRecovery, restartFromScratch, resumeFromSnapshot, oracleRecovery, recoveryStateHash, labelRecoveryEpisode, artifactProvenance } from "./artifact-recovery.js";
export type { RecoveryArm, RecoveryIntervention, RecoveryArtifact, RecoveryAttempt, RecoveryEventKind, RecoveryEvent, RecoveryState, RecoveryObservation, RecoveryStep, RecoveryEpisode, RecoveryRun, InheritedArtifact, RecoveryInheritance } from "./artifact-recovery.js";

export {
  EPISODE_ENVIRONMENTS, toEpisode, episodeBytes, labelEpisodeMode, sanitizeValue, UNKNOWN } from "./episode.js";
export type { Episode, EpisodeMode, EpisodeEnvironment, EnvironmentEpisode, EpisodeDecision, EpisodeEvent, EpisodeArtifact, EpisodeConsumption, EpisodeAttempt, BudgetSpend, Maybe, Unknown } from "./episode.js";

export { projectCollectiveEvents, collectiveEventBytes, producerModuleRecord } from "./collective-event.js";
export type { CollectiveEvent, CollectiveEventOptions } from "./collective-event.js";

export { replayTape } from "./replay.js";
export type { ReplaySystem, ReplayEffect, ReplayEntry, ReplayTape, ReplayObservation, ReplayConflictCode, ReplayConflict, ReplayResult } from "./replay.js";

export { stepContractOf } from "./step-contract.js";
export type { StepContract, StepContractOptions } from "./step-contract.js";
export { validateEffectPermissions } from "./effect-permissions.js";
export type { EffectPermission, EffectPermissionRefusalCode, EffectPermissionRefusal, EffectPermissionCoverage, EffectPermissionValidationInput, EffectPermissionValidation } from "./effect-permissions.js";
export { validateRecoveryDeclarations } from "./recovery-declarations.js";
export type { RecoveryRefusalCode, RecoveryRefusal, StepRecoveryDeclaration, RecoveryDeclarationsInput, RecoveryDeclarations } from "./recovery-declarations.js";
export { classifyAbsence, affectedByScopeChange } from "./absence.js";
export type { CompletenessWitness, NegativeObservation, AbsenceGapCode, AbsenceGap, AbsenceStatus, AbsenceClassification } from "./absence.js";
export { decidePromotion } from "./promotion.js";
export type { GuaranteeProofStatus, GuaranteeProof, PromotionCandidate, PromotionRefusalCode, PromotionRefusal, GuaranteeVerdict, GuaranteeJudgement, PromotionDecision } from "./promotion.js";
export { validateEvidenceChain } from "./evidence-phases.js";
export type { EvidencePhase, EvidenceAuthority, VerificationVerdict, EvidenceRecord, EvidenceRefusalCode, EvidenceRefusal, EvidenceChainValidation } from "./evidence-phases.js";
export { validateRewriteBoundary } from "./rewrite-boundary.js";
export type { RewriteChangeKind, RewriteOperation, RewriteChange, RewriteCandidate, RewriteRefusalCode, RewriteRefusal, RewriteBoundaryValidation } from "./rewrite-boundary.js";
export { recordRuntimePlan, planInvalidation } from "./runtime-plan.js";
export type { RuntimePlanRecord, RuntimePlanRecording, GraphMutation, PlanInvalidationReason, PlanInvalidation } from "./runtime-plan.js";
export { validateFanOut } from "./sample-identity.js";
export type { SampledDraw, FanOutRefusalCode, FanOutRefusal, FanOutSample, FanOutDecision, FanOutValidation } from "./sample-identity.js";
export { initialDurableState, commitDurable } from "./durability.js";
export type { PendingReceipt, CommittedDecision, DurableState, NativeReceipt, DurableWrite, DurabilityRefusalCode, DurableOutcome } from "./durability.js";
export { TRUST_ZONE_OF, admitUnderTrust, collectorBoundary } from "./trust-zones.js";
export type { AdvisoryKind, HardKind, TrustKind, TrustZone, HardCheck, AdvisoryValue, TrustAdmissionInput, TrustRefusalCode, TrustRefusal, TrustAdmission, CollectorBoundary, CollectorRun, CollectorBoundaryCode, CollectorBoundaryVerdict } from "./trust-zones.js";
export { validateLogProb, diracLogProb, sequentialLogProb, parallelLogProb, selectorLogProb, inhibitLogProb, sharedSampleLogProb } from "./kernel-likelihood.js";
export type { LogProb, IndependenceWitness } from "./kernel-likelihood.js";
export { classifyEpisodeEdges } from "./artifact-edges.js";
export type { LineageEdge, CausalEdge, EpisodeEdge, LineageSource, EpisodeEdgeClassification } from "./artifact-edges.js";

export { exportEpisodeForTraining, exportEpisodesForTraining, labelTrainingMode, trainingBytes, attachPerActorCredit } from "./training-export.js";
export { importTrainingExport } from "./training-import.js";
export type { TrainingImportOutcome } from "./training-import.js";
export type { TrainingExport, TrainingStep, TrainingMask, PerActorCredit } from "./training-export.js";
export { collectTrainingExamples } from "./training-collector.js";
export type { DecisionSidecar, TrainingExample, TrainingCollection, CollectorRefusal, CollectorRefusalCode as TrainingCollectorRefusalCode, CollectorReason } from "./training-collector.js";

export { runElasticLanding, elasticLanes, laneIntent, oracleLoadBounds, PAUSE_STEPS } from "./elastic-landing.js";
export type { ElasticLane, ElasticEventKind, ElasticEvent, ElasticState, ElasticObservation, ElasticStep, ElasticLoad, ElasticEpisode, ElasticRun, LaneEffect, LaneIntentSpec, LoadBounds } from "./elastic-landing.js";

export { graphPolicyAdapter } from "./graph-policy-adapter.js";
export { enumeratePreSamplingSupport, withPreSamplingSupport, exportRoleAwareGraph } from "./pre-sampling-support.js";
export type { PreSamplingInput, PreSamplingSupport, RoleAwareExportInput, RoleAwareGraphExport } from "./pre-sampling-support.js";
export { graphPolicyHost } from "./graph-policy-host.js";
export { buildDecisionReceipts, validateDecisionReceipt } from "./decision-receipt.js";
export type { DecisionReceipt, DecisionReceiptGp, DecisionReceiptActions, DecisionReceiptFeedbackStatus, DecisionReceiptValidation } from "./decision-receipt.js";

export { evaluateGraphFamilies } from "./graph-family-evaluation.js";
export { evaluateGraphFamilyExtras, GRAPH_FAMILY_EXTRAS_DEFINITIONS } from "./graph-family-evaluation-extras.js";

export { matchingAssignment, jointSamplerAssignment, assignmentArm, ASSIGNMENT_MECHANISMS } from "./assignment.js";

export { oracleLandedOrderFor, landingPolicyRule, fifoRule, restackFirstRule, oracleQuorumFor, quorumPolicyRule, majorityVoteRule, independentTestFirstRule } from "./reference-oracles.js";

export { runHeterogeneousLanding, heterogeneousRestackFirst, runDagAssignment, dagMatchingPolicy } from "./fixture-families.js";
export type { HeteroCandidate, HeteroEvent, HeteroState, HeteroObservation, HeteroStep, HeteroRun, HeteroEpisode, TemporalShift, DagTask, DagAgent, DagEvent, DagState, DagObservation, DagAssigned, DagStep, DagRun, DagEpisode } from "./fixture-families.js";

export { stepFixture } from "./step-fixture.js";
export type { StepSource, StepFixture, StepResult, StepVerification } from "./step-fixture.js";
export type { LandingOracleView, LandingOracleChoice, LandingOracleRule, LandingOracleRun, QuorumOracleEffect, QuorumOracleChoice, QuorumOracleRule, QuorumOracleRun, OracleConflictRefusal } from "./reference-oracles.js";
export type { AssignmentMechanism, AssignmentAgent, AssignmentTask, AssignmentScore, AssignmentInput, JointSamplerInput, AssignmentPair, AssignmentStep, Assignment, AssignmentArm } from "./assignment.js";
export type { GraphFamilyArm, GraphFamilyEvaluationInput, GraphFamilyArmResult, GraphFamilyBlock, GraphFamilyReport } from "./graph-family-evaluation.js";
export type { GraphFamilyExtrasArm, GraphFamilyExtrasInput, ReplayFidelity, StabilityRow, TailCost, HeldOutRow, GraphFamilyExtrasArmResult, GraphFamilyExtrasBlock, GraphFamilyExtrasDefinitions, GraphFamilyExtrasReport } from "./graph-family-evaluation-extras.js";
export type { GraphPolicyHost, GraphPolicyHostInput, GraphPolicyHostConfiguration, GraphPolicyFallbackReason, GraphPolicyResponse, GraphPolicyClient, GraphPolicyHostMode, GraphPolicyShadowRecord } from "./graph-policy-host.js";
export type { GraphDataNodeKind, GraphDataNode, GraphData, GraphActionSpec, GraphPolicyAdapterInput, GraphDecisionSidecar, GraphPolicyAdapter } from "./graph-policy-adapter.js";

export { familyHoldOut, trainingEpisodes, drawTrainingFamily, evaluateHeldOutFamilies } from "./family-holdout.js";
export type { FamilyHoldOut } from "./family-holdout.js";

export { validatePolicyGraph, compilePolicyGraph, POLICY_GRAPH_NODE_KINDS } from "./policy-graph.js";
export type { PolicyGraphNode, PolicyGraphNodeKind, PolicyGraphPort, PolicyGraphEdge, PolicyGraphManifest, PolicyGraphValidation, PolicyGraphValidationOptions, PolicyGraphPlan } from "./policy-graph.js";

export { validateCoordinationDecision, labelCoordinationDecision } from "./coordination-decision.js";
export type { CoordinationDecision, CoordinationDecisionPolicy, CoordinationDecisionSample, CoordinationDecisionValidation, CoordinationFeedback, CoordinationFeedbackStatus } from "./coordination-decision.js";

export { adaptMicroPolicyDecision } from "./micropolicy-adapter.js";
export type { MicroPolicyDecisionChoice, MicroPolicyDecisionRng, MicroPolicyDecisionSelection, MicroPolicyDecisionReceipt, MicroPolicyActionSpec, MicroPolicyAdapterInput, MicroPolicyAdapterOutcome } from "./micropolicy-adapter.js";

export { recordDecisions, replayDecisions } from "./decision-replay.js";
export type { DecisionEnvironment, DecisionStep, DecisionTape, DecisionRecording, DecisionDivergenceField, DecisionDivergence, DecisionReplayResult } from "./decision-replay.js";

export { evaluateEpisodes, mixedEvaluationBytes, evaluate, evaluationBytes, labelEvaluation, fixedConfiguration, fixedBaseline, fixedChecked, composedConfiguration, treeConfiguration, externalConfiguration, seedParitySelector } from "./evaluation.js";
export type { EpisodePin, LabelledEpisode, EpisodeEvaluationEntry, EpisodeEvaluationInput, EpisodeRef, ModeResult, EpisodeBatchResult, EpisodeComparison, MixedEvaluationReport, EvaluatedEnvironment, PolicySet, ConfigurationKind, ConfigurationProvenance, CompositionTree, CanonicalTree, TreeGuard, TreeSelector, TreeReferences, EvaluationConfiguration, EvaluationBudget, EvaluationScenario, EvaluationInput, Interval, EnvironmentResult, ConfigurationResult, Comparison, ContinuityRow, ContinuityResult, EvaluationReport } from "./evaluation.js";

export { exportExitReport, exitReportBytes, labelExitReport } from "./exit-report.js";
export type { ExitMilestoneReason, ExitReportInputs, ExitReportEvaluation, ExitReport } from "./exit-report.js";

export { publicationSemanticKey, stagePublication, publishReconciled } from "./temporal-publication.js";
export type { CertifiedArtifactProposal, PublicationCandidate, NativePublicationDecision, SourcePublicationPort, PublishAttemptInput, PublishAttempt } from "./temporal-publication.js";

export { runVerticalCut, verticalCutBytes, VERTICAL_CUT_ARMS, VERTICAL_CUT_INSTANCES, VERTICAL_CUT_REGRET_DEFINITION } from "./vertical-cut.js";
export type { VerticalCutInstances, VerticalCutOracleWitness, VerticalCutLearnedArm, VerticalCutProvenance, VerticalCutReport } from "./vertical-cut.js";
export { runVerticalCutArms, verticalCutArmsBytes, greedyLanding, staticRoleLanding, greedyDag, staticRoleDag, VERTICAL_CUT_ARM_MECHANISMS, VERTICAL_CUT_ARM_REGISTRY } from "./vertical-cut-arms.js";
export type { VerticalCutArmMechanism, VerticalCutArmRow, VerticalCutArmsRequest, VerticalCutArmsProvenance, VerticalCutArmsReport } from "./vertical-cut-arms.js";

export { auditDependencies, admitOfflineDeterministicRun, OFFLINE_DETERMINISTIC_MODE } from "./dependency-audit.js";
export type { ManifestRecord, LockEntry, DependencyAuditInput, DependencyRefusalCode, DependencyRefusal, DependencyEdge, DependencyAudit, OfflineCapability, OfflineDeterministicMode, ModuleImport, OfflineRunDeclaration, OfflineRefusalCode, OfflineRefusal, OfflineAdmission } from "./dependency-audit.js";

export { classifyRewrite, gatePromotionByClass, REWRITE_CLASS_GATES } from "./rewrite-classification.js";
export type { RewriteClass, EquivalenceWitnessKind, EquivalenceWitness, RewriteClassificationInput, RewriteClassRefusalCode, RewriteClassRefusal, RewriteClassification, GatedPromotion } from "./rewrite-classification.js";

export { checkRewriteApplication, deriveRewriteCandidate, edgeKey, V1_RULE_KINDS } from "./rewrite-application.js";
export type { V1RuleKind, RuleGraph, RewriteRule, RuleMatch, RewriteApplicationRefusalCode, RewriteApplicationRefusal, RewriteApplicationCheck, RewriteDerivation } from "./rewrite-application.js";

export { validateInheritance, parameterDigest, commitGraphAlias, validateMigrationOrder, rollbackInheritance, MIGRATION_STEPS } from "./rewrite-inheritance.js";
export type { InheritedParameter, MemoryStrategy, MemoryInheritance, LeaseAction, LeaseDisposition, NativeLease, InheritanceDeclaration, InheritanceContext, InheritanceRefusalCode, InheritanceRefusal, InheritanceValidation, GraphAlias, GraphAliasCommit, MigrationOrderRefusalCode, MigrationOrderValidation, NativeActionRecord, InheritanceRollback } from "./rewrite-inheritance.js";

export { projectLaneView, LANE_VIEW_FIELDS } from "./lane-views.js";
export type { Occupancy, LaneCommitment, ReleaseMass, ReleaseForecast, LaneObservation, LaneConsumer, AdmissionView, ReleaseView, PlanningView, RecoveryView, LaneView, LaneViewRefusalCode, LaneViewResult } from "./lane-views.js";

export { validateCertificateReference, invalidateCertificates, dependencyKey, DEPENDENCY_KINDS } from "./certificates.js";
export type { DependencyKind, CertificateDependency, CertificateReference, CertificateRefusalCode, CertificateRefusal, CertificateReferenceValidation, PremiseChange, InvalidationReason, CertificateInvalidation } from "./certificates.js";

export { bindDecisionWitnesses, admitAgainstCurrentRevisions } from "./witness-binding.js";
export type { SourceRevisionWitness, DecisionWitnesses, WitnessBindingRefusalCode, WitnessRefusal, DecisionWitnessBinding, WitnessAdmissionRefusalCode, StaleWitness, DecisionWitnessAdmission } from "./witness-binding.js";

export { snapshotView, whyNot, exportView, assertNoActuationPath, VIEW_KINDS } from "./readonly-views.js";
export type { ViewKind, TraceRefusal, TraceRecord, TraceInput, ReadOnlyView, WhyNotReason, WhyNotView, ViewExport, ActuationPathRefusalCode, ActuationPathCheck } from "./readonly-views.js";

export { judgeSourceConsistency, resolveMigrationFailure, decideRetryAfterCrash } from "./failure-handling.js";
export type { SourceSample, SourceConflict, SourceConsistencyVerdict, MigrationAttempt, MigrationFailureResolution, CrashRetryAction, CrashRetryReason, CrashRetryInput, CrashRetryDecision, CrashRetryRefusalCode, CrashRetryRefusal } from "./failure-handling.js";

export { judgeCorpus, ADVERSARIAL_ROWS } from "./adversarial-corpus.js";
export type { AdversarialRow, CaseOutcome, CaseVerdict, CaseJudgement, CorpusRefusalCode, CorpusJudgement } from "./adversarial-corpus.js";

export { readGraphRecord, GRAPH_NODE_KINDS, READER_SUPPORTED } from "./graph-reader.js";
export type { ReaderRefusalCode, GraphReadNode, GraphRead } from "./graph-reader.js";
export { applyControlUpdate, judgeWholePlant, validateSelectionPolicy, measureSelection, FAIRNESS_FLOOR_KINDS } from "./control-fairness.js";
export type { ControlRefusalCode, AdmissionObservation, ControllerState, ControllerConfig, ControlUpdate, PlantRefusalCode, QueueLink, OscillationWitness, PlantJudgement, FairnessRefusalCode, FairnessFloor, SelectionPolicy, PolicyValidation, QueuedTask, SelectionMeasurement } from "./control-fairness.js";
export { checkStatusPromotion, classifyChangedFile, recordBackendRefusal, STATUS_LABELS } from "./status-promotion.js";
export type { StatusPromotionRefusalCode, ChangedFileKind, StatusTransition, LedgerRowEdit, StatusPromotionChange, StatusPromotionCheck, BackendRefusalInput, BackendRefusalOutcome } from "./status-promotion.js";
export { compareOnHeldout, retainInLineage, EMPTY_LINEAGE } from "./candidate-selection.js";
export type { SelectionRefusalCode, MetricSet, HeldoutRegime, SelectionInput, SelectionRecord, LineageArchive, LineageOutcome } from "./candidate-selection.js";
export { advanceCreditRung, classifyCreditEvidence, CREDIT_RUNGS } from "./credit-hierarchy.js";
export type { CreditRefusalCode, RungWitness, RungAdvance, CreditEvidence, CreditEvidenceClassification } from "./credit-hierarchy.js";
export { judgeQaMatrix, QA_MATRIX_ROWS } from "./qa-matrix.js";
export type { QaRefusalCode, QaDisposition, QaCell, QaMatrixJudgement } from "./qa-matrix.js";
export { preselectCompatibleSubset, assertPreselectionOnlyNarrows, witnessPreselectionEquivalence } from "./compatible-preselector.js";
export type { PreselectRefusalCode, Preselection, NarrowingCheck, PreselectionEquivalence } from "./compatible-preselector.js";
export { V1_GRAMMAR, validateRuleAgainstGrammar, sealMutationRecord, MEMORY_MIGRATION_STRATEGIES } from "./rewrite-grammar.js";
export type { GrammarRefusalCode, GrammarValidation, MutationRecordRefusalCode, MutationRecord, SealedMutationRecord } from "./rewrite-grammar.js";
export { runMigrationProcedure } from "./migration-procedure.js";
export type { MigrationProcedureRefusalCode, MigrationInstance, MigrationPlan, MigrationStepRecord, MigrationProcedureOutcome } from "./migration-procedure.js";
export { collectTrainingOutcome, REWARD_CLASSES } from "./outcome-collector.js";
export type { CollectorRefusalCode, CollectedDecision, ObservedOutcome, RewardDeclaration, IndependentBaseline, TrainingOutcomeExample, CollectionOutcome } from "./outcome-collector.js";
export { refinePartition, checkLumpability, certifyAbstraction } from "./lumpability.js";
export type { LumpabilityRefusalCode, KernelTransition, FiniteKernel, Partition, RefinementResult, AbstractionCandidate, AbstractionCertificate } from "./lumpability.js";
export { projectNumericObservation, numericCandidateActionSpec, parseElasticAction, NUMERIC_FEATURES, ELASTIC_ACTIONS } from "./elastic-numeric-candidate.js";
export type { NumericCandidateRefusalCode, ElasticAction, FeatureEvidence, FeatureEvidenceMap, NumericProjection, ProjectionOutcome, ParsedElasticAction, ActionSpecOutcome } from "./elastic-numeric-candidate.js";
export { enumerateLaneAutomaton, checkConservation, admissionCandidate, laneAbstractionOracle, encodeMarking, decodeMarking, LANE_OCCUPANCIES, LANE_INPUTS, ORACLE_MAX_LANES } from "./abstraction-oracle.js";
export type { OracleRefusalCode, EnumerationOutcome, ConservationCheck, AbstractionCounterexample, OracleVerdict } from "./abstraction-oracle.js";
export { exactTwoClaimTable, estimateScoreFunctionGradient, seededStream, nextUniform } from "./score-function-estimator.js";
export type { EstimatorRefusalCode, ExactTwoClaimTable, SeededStream, EstimatorInput, GradientEstimate, EstimatorOutcome } from "./score-function-estimator.js";
export { D0_BASELINE, D0_PROGRAM_PIN, checkBaselineInventory } from "./baseline-inventory.js";
export type { BaselineRefusalCode, ObservedInventory, BaselineCheck } from "./baseline-inventory.js";
export {
  D1_DECISION_SUBJECTS,
  D1_DISPOSITIONS,
  judgeD1Coverage,
  parseD1Disposition,
  recordD1Decision,
  type D1CoverageJudgement,
  type D1DecisionInput,
  type D1DecisionOutcome,
  type D1DecisionRecord,
  type D1Disposition,
  type D1RefusalCode,
  type D1Subject,
  type D1Successor,
} from "./reuse-or-supersede.js";
export {
  canonicalPlanBytes,
  judgeFixtureByteEquivalence,
  judgeReadOnlyTrace,
  recordStageTwoExit,
  witnessCompilerDeterminism,
  type CompileFn,
  type D2Refusal,
  type D2RefusalCode,
  type DeterminismWitness,
  type EquivalenceJudgement,
  type FixturePair,
  type StageTwoExit,
  type StageTwoExitInput,
  type TraceJudgement,
  type TraceOp,
} from "./compiler-equivalence.js";
export {
  CANONICAL_BASELINES,
  runBaselineComparison,
  type ArmCosts,
  type ExperimentArm,
  type ExperimentRefusal,
  type ExperimentRefusalCode,
  type ExperimentReport,
  type RankedArm,
} from "./baseline-experiment.js";
export {
  BRIDGE_REQUIRED_JOURNEYS,
  RECEIPT_BASES,
  activateScratchBridge,
  judgeBridgeEvidence,
  parseReceiptBasis,
  type BridgeActivation,
  type BridgeEvidenceJudgement,
  type BridgeRefusal,
  type BridgeRefusalCode,
  type ReceiptBasis,
  type ScratchReceipt,
} from "./scratch-bridge.js";
export {
  PROFILE_AXES,
  parseProfileAxis,
  recordStageEightExit,
  type AxisMeasurement,
  type DevtoolsRefusal,
  type DevtoolsRefusalCode,
  type DevtoolsSurface,
  type ForgeEvidenceRef,
  type ProfileAxis,
  type StageEightExit,
  type StageEightExitInput,
} from "./devtools-profile.js";
export {
  CANARY_PREREQUISITES,
  CANARY_STAGES,
  parseCanaryStage,
  planCanaryStep,
  type CanaryRefusal,
  type CanaryRefusalCode,
  type CanaryStage,
  type CanaryStep,
  type CanaryStepInput,
  type PrerequisiteWitness,
  type RollbackWitness,
} from "./graph-canary.js";

export { sampleSupportedDecision, validateSampledDecision, sampledDecisionToSidecar } from "./sampled-decision.js";
export type { SampledDecision, SampleSupportedInput, SamplerProbabilities, SampledDecisionValidation, SampledSidecarBase } from "./sampled-decision.js";
export { validateModuleContract, checkGlobalCapacity, checkModuleExclusion } from "./module-contract.js";
export type { ModuleContract, ModuleContractEvidence, ModuleContractTiming, ModuleContractRefusalCode, ModuleContractGrade, ModuleContractValidation, ModuleContractExceededDimension, ModuleContractCapacityResult, ModuleContractExclusionResult } from "./module-contract.js";
