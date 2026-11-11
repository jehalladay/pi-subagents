# 03 — Operational semantics and probability

## Reference structure
Use finite PLTS research model state (environment,basis,graph revision,private memories,resource marking,commitments,pending events). Action/scheduler choice is explicit: T_Gamma(s,e,sigma) in Dist(S x Trace). Scheduler nondeterminism is not assigned fake probabilities. The implementation remains event-driven application code.

## Evaluation phases
Captured observations -> pure numerical evaluation -> sampled choice -> typed intent -> existing reconcile -> native effect owner -> authoritative receipt -> optional private state CAS -> future observation/feedback. Any update triggers a new decision only under application-defined event admission and dwell rules; rerendering is not effect authorization.

## Kernels
Local P:(O,M)->Dist(A,M',Trace). Existing deterministic Policy.propose is a Dirac specialization. Sequential sampling: pi(a,b|o)=pi_P(a|o)pi_Q(b|o,a). Parallel product only if truly conditional-independent; selectors contribute their own conditional likelihood. Shared sampled output is copied, not resampled. 'Inhibit' acts as deterministic post-sample suppression, not a new sample mask; the underlying stochastic choice remains in evidence.

## Probability gradient
For action drawn from valid pi_theta and resolver f, assumed parameter-independent (hypothesis: proposal order, budget and protectedScopes must not depend on theta; reconcile is order-sensitive, resolver.ts L105-119), grad E[R(f(A))] = E[R(f(A)) grad log pi_theta(A)] under regularity. Need pre-action support A and actual log probability; post-resolver admitted/rejected intents are outcome data. A policy rejected by resolver may receive a legitimate coordination reward/penalty, but not fabricated native execution reward.

## Temporal semantics
Private memory proposal not durable until explicit acknowledged CAS. External native effect state never lives in private memory as unverified truth. Retried decision identity must not reroll random action silently. Repeated options track initiation, continuation, terminal result and duration for semi-Markov credit. Missing native receipt remains pending/unknown.

## Theorem obligations (external, statements pinned, unproven) and limits
Finite normalized kernel composition; finite controlled lumpability; negative witness must include domain. Graph-level safety and liveness need additional assumptions: typed graph alone proves no deadlock, fairness, resource stability or collective fitness. Statement sources are pinned by repo, sha and path in 15-source-and-research-map.md; the proofs remain outstanding at that pin.
