# 06 — Consumer-relative organizational interfaces

## Contract
ModuleContract contains typed incoming and outgoing ports, admissible environment inputs, required source coverage/revisions, supported query family Q, temporal guarantees, proposed effect classes, private state abstraction alpha, resource envelope, model/certificate identity and version.

## Sufficient abstraction
For finite kernel K and partition alpha:S->Z, states in one block must assign equal mass to each visible label y and successor block B for every allowed environmental action u: sum_{s' in B}K(s',y|s1,u)=sum_{s' in B}K(s',y|s2,u). This is strong controlled lumpability. Stable partition -> quotient kernel -> exact finite observable traces for abstract-state policies. General asynchronous nondeterminism needs a transition-set/simulation interpretation.

## Distinct consumers
Immediate lane admission can use isAvailable with exact revision; planning uses phase and release-time distribution; recovery needs commitment and receipt identity. Do not demand one universal minimal interface. Safe fields include native authority/epistemic lifecycle. Learned forecast Z is advisory and does not certify a native outcome.

## Discovery
Start with mandatory observation partition. Compute signature for each state by allowed input, output label and successor block. Split differing states until stable. Reject candidate summaries with distinguishing traces. Keep model revision/intervention class in certificate. A learned projection may propose blocks but cannot certify itself. Larger query family weakly refines exact partition.

## Source witnesses
A zero-match negative observation remains UNKNOWN without scope/generation/population completeness witness. Query domain itself is a dependency even when no rows match; Source freshness and coverage are distinct. An interface rewrite changing scope must invalidate any affected absence certificate.

## Efficiency
Optimize query costs, communication, proof checking, revalidation radius, training variance and temporal overhead jointly. Fewer output fields may have greater derivation cost.
