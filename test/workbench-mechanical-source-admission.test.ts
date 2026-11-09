/**
 * wb-s8rm [MWI-source]: host-owned write admission against a measured source identity. Program
 * mechanical-workflows-interop-2026-11-04, slice PI-1, bead B-source: requirements EAT-R022..EAT-R027 of
 * triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e, quoted below with their acceptance and adversarial
 * mutant. The program is design-only; this suite pins the Pi-local admission seam, src/workbench/source-admission.ts, in the
 * forms this header lists. Each quotation is followed by the reading this suite pins for it.
 *
 * Every case drives that module on real Git repositories built in tracked scratch (test/helpers/scratch.ts), read through the
 * suite's SourceGitReader: real git with the repository-locating variables removed (the fixture's own git calls remove them too);
 * the cases that say so wrap it to fail, record or rewrite chosen calls. The write-capable dispatch is the injected `dispatch`
 * callback, so "no write-capable host dispatch", "refusal before SDK dispatch" and "no child write capability" each read as zero
 * calls to it; a SourceWriteGrant is only ever what that callback receives. Every refusal is asserted whole: its code, the fixed
 * reason of that code (REASON below) and, on dirty-base only, the dirty counts. Every admission a case expects to refuse is
 * asserted to make zero calls to its dispatch. Every argument an entry below does not name is valid as the suite builds it (the
 * authorized root, the clean worktree ws under it and its committed gate manifest, the suite's reader, inv-a's request that
 * asks for writes, and the host's attestation of ws), so an entry pins the refusal of the failure it plants, and of a second
 * failure only where it names one; the NOT CLAIMED list below names the pairs of failing clauses no entry pins.
 *
 * PINNED READER SET (case id: assertion target).
 * - EAT-R022 "Pi MUST refuse a dirty implementation base." Acceptance: "Set tracked, staged or untracked edits at admission;
 *   assert no write-capable host dispatch; clean committed tree passes." Mutant: "Use HEAD equality alone." Pinned reading: a
 *   base is dirty when the measurement's git status call lists a record; the residual family UNLISTED-EDITS below names edits
 *   that call does not list. R022-CLEAN: one dispatch whose grant names the HEAD commit and tree git reports. R022-TRACKED,
 *   R022-STAGED, R022-UNTRACKED: one edit each (git status " M", "M " and "??"), refusal dirty-base with that edit in its own
 *   column. R022-COUNTS: a base whose git status lists " M", "MM", " D", "A " and three "??" records (two files of one new
 *   directory listed one by one) refuses dirty-base with tracked 3, staged 2, untracked 3. R022-STATUS-COLUMNS: a "?M" record
 *   (read through a reader that rewrites status) counts as staged and as tracked, never as untracked; R022-STATUS-WORKTREE-QUESTION:
 *   an "M?" record (read the same way) counts as staged and as tracked, never as untracked; R022-STATUS-INDEX-QUESTION: a "? "
 *   record (read the same way) counts as staged, never as untracked or tracked. R022-TYPE-AND-INTENT: a type
 *   change (" T"), the same change staged ("T ") and an intent-to-add file (" A", which ls-files tags H) refuse dirty-base with
 *   tracked 1, staged 1 and tracked 1. R022-RENAME: a staged rename counts as a staged deletion and a staged addition (tracked 0,
 *   staged 2). R022-ASSUME-UNCHANGED, R022-SKIP-WORKTREE, R022-UNMERGED: an index entry that git ls-files -v tags other than "H "
 *   refuses source-unmeasurable, also when git status lists it (UNMERGED); each case reads the tag first (h, S, M). R022-NO-HEAD:
 *   a repository whose HEAD names no commit refuses source-unmeasurable. R022-ROOT-ONLY: measureSourceIdentity on a
 *   subdirectory (src, whose own index.ts is the declared manifest), a symlink alias (whose declared manifest resolves outside
 *   the alias) and a dot spelling of the worktree root refuses source-unmeasurable. R022-TOPLEVEL-ALIAS: a
 *   reader that reports the worktree root through a symlink alias measures the canonical root. R022-MISDIRECTED-GIT: a reader
 *   whose GIT_DIR names another repository refuses source-unmeasurable. R022-REPOSITORY-FORMS: a linked worktree (the .git file
 *   git worktree add writes), a .git file naming a relative Git directory with an LF ending and with a CRLF ending, and a .git
 *   symlink to a Git directory each measure the HEAD commit git reports (the linked worktree also dispatches). R022-SHA256: a
 *   repository with 64-hex object ids measures them, and a HEAD answer there one hex digit too long or too short refuses
 *   source-unmeasurable. R022-READER-ARGV: the exact argv of every reader call a measurement and an admission make, in order,
 *   each opening with --no-optional-locks -c core.fsmonitor=false -c core.untrackedCache=false. R022-NO-INDEX-WRITE: a
 *   measurement leaves .git/index byte-identical where a plain git status rewrites it. R022-FSMONITOR: an edit that a configured
 *   fsmonitor hook hides from git status refuses dirty-base. R022-SUBMODULE: a moved submodule that ignore = all hides from git
 *   status refuses dirty-base. R022-READER-PARTIAL: a reader that does not answer exactly one call (or both git-dir calls) -
 *   undefined, a throw or a string - refuses source-unmeasurable for every call of the measurement, as does a HEAD answer that is
 *   no object id, is upper-cased or is one hex digit too long or too short; over a tracked edit with status unanswered, and over
 *   an assume-unchanged edit with ls-files unanswered, the admission dispatches nothing. R022-IGNORED: an ignored build file is
 *   not an edit (one dispatch). R022-READER-FINAL-LF: a reader whose LF-ending answers carry no final LF (the five rev-parse
 *   answers of a measurement) measures the identity the suite's reader measures, and its admission dispatches with that
 *   identity; a reader whose LF-ending answers end with a second LF refuses source-unmeasurable. R022-OBJECT-ID-LEADING-ZERO: a
 *   HEAD^{commit} or HEAD^{tree} answer that is the real id with its first digit replaced by 0, or forty 0 digits, measures as
 *   that id. R022-READER-NO-LF-EDGE: for each of the 20 code points String.prototype.trim() removes outside U+0000-U+001F
 *   (TRIMMED below), on the worktree inside the root whose directory name is "w" followed by that code point, a reader whose
 *   LF-ending answers carry no final LF (the five rev-parse answers of a measurement) measures the identity the suite's reader
 *   measures there, and its admission there, attested for that identity, dispatches against that root.
 *   R022-READER-COMMIT-CR: a HEAD^{commit} answer that is ws's commit id followed by a CR, with no LF after it and with one,
 *   refuses source-unmeasurable.
 *   RESIDUAL UNLISTED-EDITS (named family, pinned quiet rows): an edit the measurement's git status call does not list is measured
 *   clean. R022-STAT-TRUST: under core.checkStat=minimal a same-size edit whose mtime is restored is listed by no git status, and
 *   the measurement answers the identity it answered before the edit. R022-CLEAN-FILTER: under a configured clean filter that
 *   maps the edited file back to its committed bytes the same holds. Each row reds the day the measurement refuses its edit.
 * - EAT-R023 "Pi MUST confine the workspace to the authorized canonical root." Acceptance: "Supply wrong workspace,
 *   prefix-collision sibling and realpath escape; assert refusal before writing." Mutant: "Accept string startsWith root."
 *   Pinned reading: the workspace's realpath must be the authorized root's realpath or inside it by path.relative, and must be the
 *   worktree root git reports for it. R023-WRONG, R023-SIBLING, R023-ESCAPE: refusal workspace-outside-root although the operator
 *   attested that workspace (WRONG also for a subdirectory of the outside worktree). R023-PARENT: the authorized root's parent
 *   refuses workspace-outside-root. R023-SUBDIR: a subdirectory of a worktree refuses workspace-not-worktree-root.
 *   R023-RELATIVE: the relative workspace path "authorized/ws", under the suite's authorized root, refuses malformed-request
 *   (that path does not resolve by realpath either).
 *   R023-UNRESOLVABLE: a missing workspace (inside or outside the root)
 *   and a missing authorized root refuse workspace-unresolvable. R023-ALIAS-INSIDE: a symlink that resolves inside the root
 *   dispatches against the canonical root. R023-ROOT-ALIAS: an authorized root given as a symlink to the root dispatches.
 *   R023-SPACED-NAME: a workspace whose directory name holds a space, a non-ASCII letter and a trailing space dispatches against
 *   that canonical root. R023-CONFINE: confineWorkspace itself answers the sibling and the workspace. R023-DOTDOT-NAME: a
 *   workspace inside the root named "..ws" confines and dispatches. R023-ROOT-ITSELF: an authorized root that is
 *   the workspace itself confines and dispatches. R023-DOT-NAMES: the worktrees inside the root named "...ws", "..." and ".ws"
 *   confine, and "...ws" dispatches against its canonical root.
 * - EAT-R024 "Pi MUST bind a single writer to each materialized workspace." Acceptance: "Admit two invocation IDs for the same
 *   canonical workspace; at most one writer lease is granted; cancellation releases only the lease it owns." Mutant: "Allocate
 *   lease by caller alias instead of canonical root." Pinned reading: while inv-a's lease holds a canonical root, the acquire of
 *   that root by inv-b, inv-c or an id R024-HOLDER-ID-LEASES plants answers undefined and the admissions there of inv-b, inv-c,
 *   inv-a itself and INV-A that pass rules 1-6 refuse writer-held, and the
 *   leases of the root pairs the entries below plant are independent in the forms each entry names: ws and its sibling ws2, ws
 *   and each of the two roots the suite plants inside it (sub and inner), ws and WS, and the three roots r1, r2 and r3; whether
 *   the leases of any other pair of roots are independent is NOT CLAIMED (see below). R024-ALIAS: while inv-a writes, inv-b's
 *   admission through a symlink alias and inv-c's through a dot spelling of the same workspace refuse writer-held.
 *   R024-CANCEL-OWN: a refused invocation's cancellation leaves the holder's lease; the holder's cancellation
 *   releases it. R024-STALE: a released lease never releases the next holder's lease. R024-FOREIGN: a copy naming the held root
 *   and invocation, and a released lease of the same invocation id after it acquired the root again, release nothing.
 *   R024-VALIDATION: acquire throws a validation CapabilityError with its exact message, and takes no lease, for a relative
 *   root, an absolute root holding U+000A or of 4097 UTF-8 bytes, and a root or invocation that is "", " ", holds U+000A or is
 *   4097 UTF-8 bytes long. R024-TWO-ROOTS: while inv-a writes on ws, inv-b's admission on the sibling worktree ws2
 *   dispatches, and inv-c's admission on ws refuses writer-held. R024-RELEASE-OTHER-ROOT: the three roots r1, r2 and r3, leased
 *   at once by inv-a, each hold their own lease; releasing r2's frees r2 only, so r1 and r3 still answer undefined to inv-c's
 *   acquire and inv-d acquires r2; at admission level, inv-b's write on ws2 that completes while inv-a writes on ws leaves ws's
 *   lease held, so inv-c's admission there refuses writer-held. The pair entries below build each pair's roots the same way:
 *   ws2 is join(root, "ws2"), a sibling whose path starts with ws's; sub is join(ws, "sub") and inner is
 *   join(ws, "ignored", "inner"), two roots inside ws; and WS is join(root, "WS"), whose path differs from ws's only in letter
 *   case. R024-SIBLING-LEASES (ws and ws2), R024-NESTED-LEASES (ws and sub, ws and inner) and R024-CASE-LEASES (ws and WS),
 *   each pair in either order on a fresh registry (the registry reads no file system, so these cases name the roots as path
 *   strings): while inv-a holds the first root, holder answers undefined for the second and inv-b acquires it; holder then
 *   answers inv-a and inv-b, and inv-c's acquire of the first answers undefined; releasing inv-b's lease frees the second only,
 *   so holder answers inv-a and undefined, and inv-c's acquire of the first still answers undefined. R024-SIBLING-ADMISSION
 *   (the worktrees ws and ws2), R024-NESTED-ADMISSION (ws and its committed submodule sub, and ws and the repository inner under
 *   its ignored directory, each its own worktree root while git status lists nothing in ws) and R024-CASE-ADMISSION (the
 *   worktrees ws and WS, two directories on this file system), each pair in either order: while inv-a writes on the first
 *   root, inv-b's admission on the second dispatches against it; when inv-b's write ends, holder answers inv-a and undefined,
 *   and inv-c's admission on the first refuses writer-held; and when inv-a's write ends, no lease holds the first.
 *   R024-HOLDER-ID-LEASES: while inv-a holds ws, acquire answers undefined to inv-a itself, INV-A, Inv-A, inv-A, " inv-a",
 *   "inv-a ", inv-a2, inv-aa and inv-, holder answers inv-a after each, and inv-a's own lease then frees ws.
 *   R024-HOLDER-ID-ADMISSION: while inv-a writes on ws, inv-a's second admission on ws and through a symlink alias, then INV-A's
 *   admission and then inv-b's, each refuse writer-held with holder still answering inv-a and no dispatch; when inv-a's write
 *   ends, its dispatch was the only writer at any moment and no lease holds ws.
 * - EAT-R025 "Pi MUST recheck the source basis after asynchronous admission." Acceptance: "Park admission, change commit/tree,
 *   gate manifest or tracked bytes, release; assert refusal before SDK dispatch." Mutant: "Check source only before await."
 *   R025-COMMIT (commit and tree), R025-AMEND (commit, same tree), R025-GATE (gate manifest bytes), R025-TRACKED (tracked bytes):
 *   refusal source-changed and the lease released. R025-CONTROL: a park with no change dispatches once.
 * - EAT-R026 "Pi MUST bind the gate manifest digest to source identity." Acceptance: "Hold commit and prompt constant while
 *   changing gate manifest bytes; assert identity changes and an old authorization is rejected." Mutant: "Drop gate digest from
 *   the source basis." R026-IDENTITY: same root, commit, tree and clean status, different gate digest (the SHA-256 of the bytes)
 *   and identity digest. R026-STALE: the attestation of the old identity refuses attestation-stale; one for the new identity
 *   dispatches. R026-MANIFEST-PATH: the same bytes under another manifest path are another identity, so its attestation refuses
 *   attestation-stale. R026-MANIFEST-ALIAS: a manifest declared through a symlink inside the workspace binds its target's path.
 *   R026-DIGEST: the digest is identityDigest(SOURCE_IDENTITY_DOMAIN, the five members). R026-FROZEN: the identity and its
 *   gateManifest member are frozen, and an assignment to the identity throws. R026-UNAVAILABLE: a missing manifest, an absolute
 *   path, a ../ path, a path that leaves the workspace and comes back through an outside symlink, a symlink out of it, a
 *   directory and an unreadable file refuse gate-manifest-unavailable. R026-NOT-REGULAR: a FIFO refuses
 *   gate-manifest-unavailable. R026-BOUND: a 1048576-byte manifest measures and a 1048577-byte one refuses
 *   gate-manifest-unavailable. R026-DOTDOT-MANIFEST: the committed manifests "..gate.toml" and "..d/gate.toml" measure with
 *   that path.
 * - EAT-R027 "Pi MUST require an operator-attested write boundary." Acceptance: "Launch with allowWrites:true but absent host
 *   attestation; assert no child write capability. An attestation for another workspace also refuses." Mutant: "Trust JSON policy
 *   as authorization." R027-ABSENT: allowWrites:true and no attestation refuses attestation-absent. R027-POLICY-COPY: an
 *   attestation copied into the JSON policy is not read. R027-FORGED: an equal-shaped copy in the host slot is not minted.
 *   R027-FOREIGN-AUTHORITY: another authority's attestation is not this host's. R027-OTHER-WORKSPACE: refusal
 *   attestation-other-workspace. R027-NOT-REQUESTED: no policy, allowWrites false, "true", 1, the array [{ allowWrites: true }]
 *   (prototype Array.prototype), an own accessor (never called), an inherited member and a class instance each refuse
 *   writes-not-requested. R027-REQUESTED: the policy { allowWrites: true } and its null-prototype copy dispatch.
 *   R027-REQUESTED-FORMS: the plain and null-prototype objects whose own allowWrites data member true has each of the eight
 *   combinations of the enumerable, writable and configurable attributes, the frozen, sealed and non-extensible
 *   { allowWrites: true }, and { allowWrites: true, foo: 1 } dispatch, one grant each (20 policies). R027-WITHDRAWN:
 *   an attestation withdrawn while admission waits
 *   refuses. R027-REATTESTED: an attestation replaced while admission waits is read again (the grant names the new operator).
 *   R027-REREAD-OTHER-WORKSPACE, R027-REREAD-STALE, R027-REREAD-UNMINTED (rule 11): while the admission waits (inv-a's lease
 *   held, so rules 1-7 passed), the host replaces its attestation; rule 10 measures the same identity, and rule 11 refuses with
 *   rule 6's code, with no dispatch and the lease released: the authority's attestation of another workspace refuses
 *   attestation-other-workspace, its attestation of another identity of ws (ws measured with an ignored copy of its gate
 *   manifest) refuses attestation-stale, and an equal-shaped copy of the minted attestation and another authority's
 *   attestation of the same identity each refuse attestation-absent.
 *   R027-UNMEASURED: attest throws a validation CapabilityError with its exact message for an identity the host did not measure
 *   and for the operator ids "", " ", two holding U+000A and one of 4097 UTF-8 bytes. R027-ATTESTED: the grant carries the operator and is frozen, and the
 *   outcome carries no grant. R027-ATTESTATION-FROZEN: a minted attestation is frozen, so it cannot be rewritten to name another
 *   workspace.
 * - General: GEN-PRE-ABORTED (admission-cancelled, no lease), GEN-WAIT-REFUSED (admission-refused, lease released),
 *   GEN-WAIT-CANCELLED (a wait that rejects because the signal aborted refuses admission-cancelled, lease released),
 *   GEN-WAIT-ARGUMENT (the admission wait is called once with one argument, host.signal: the very AbortSignal while
 *   host.signal is set and not aborted, and undefined when it is unset; each of the two admissions dispatches),
 *   GEN-WAIT-REFUSED-SIGNAL (a wait that rejects while host.signal is set and not aborted refuses admission-refused, lease
 *   released),
 *   GEN-DISPATCH-THROWS (the error propagates, lease released), GEN-MALFORMED (on an otherwise valid admission, an invocation
 *   reference that is "" or " ", holds any one of the code points U+0000-U+001F and U+007F, or exceeds 4096 UTF-8 bytes as one-,
 *   two-, three- or four-byte text refuses malformed-request), GEN-MALFORMED-BLANK (the case first derives, by scanning every
 *   code point, the set that String.prototype.trim() removes; each of those code points alone, and all of them together, refuse
 *   malformed-request as an invocation reference on an otherwise valid admission and as measureSourceIdentity's gate manifest
 *   of the clean worktree ws, and throw a validation CapabilityError as an operator id and as a lease invocation),
 *   GEN-MALFORMED-TYPES (undefined, null, a number, a boolean, an object and an array as the invocation reference, the
 *   workspace, the authorized root, the gate manifest, measureSourceIdentity's root and manifest, confineWorkspace's paths, an
 *   operator id and a lease's root and invocation, each beside otherwise valid arguments, refuse malformed-request or throw a
 *   validation CapabilityError, never another error), GEN-CLEAN-TEXT (4096 UTF-8 bytes of one-, two-, three- and four-byte
 *   text dispatch), GEN-CLEAN-TEXT-FORMS
 *   (content between the code points trim() removes that lie outside U+0000-U+001F, and U+0020, U+007E, U+0080, U+009F and
 *   U+00A0 inside content, dispatch as an invocation reference, attest as an operator id and acquire as a lease invocation),
 *   GEN-MALFORMED-SHAPES (each beside otherwise valid arguments: a request that is null, a string, the array [request]
 *   (prototype Array.prototype) or a class instance, a dispatch or reader that is a string, the relative authorized root
 *   "authorized", an absolute workspace or root path holding U+000A or over 4096 UTF-8 bytes, and measureSourceIdentity's
 *   relative root "authorized/ws", unclean manifest of ws ("", " ", two holding U+000A, one of 4097 UTF-8 bytes) or string
 *   reader refuse malformed-request; none of those paths resolves by realpath and none of those manifests measures),
 *   GEN-NULL-PROTOTYPE-REQUEST (a
 *   null-prototype request object dispatches), GEN-READER-FAILS (a reader that throws, or answers with a string, at every call
 *   is a refusal, never a rejection: the admission refuses workspace-not-worktree-root and the measurement source-unmeasurable),
 *   GEN-READER-NOT-BUFFER (a reader that answers git's bytes at every call as a Uint8Array, an ArrayBuffer, a DataView, an array
 *   of byte values or an object whose toString answers git's text, none of them a Buffer, makes confineWorkspace and the
 *   admission refuse workspace-not-worktree-root, with no dispatch and no lease, and the measurement refuse
 *   source-unmeasurable; one that answers one call of the measurement alone as a Uint8Array or as such an object refuses
 *   source-unmeasurable for each such call), GEN-REASON-FIXED (the reason names neither the caller's workspace nor its
 *   invocation), GEN-ARRAY-PROTOTYPES (an empty and a one-element array whose prototype is Object.prototype, and the same two
 *   with a null prototype: carrying an own allowWrites true as the policy each refuses writes-not-requested, and carrying the
 *   request's members as the request each refuses malformed-request; no dispatch, no lease), GEN-CLEAN-TEXT-SCAN (for every
 *   code point from U+0000 to U+10FFFF outside U+0000-U+001F and U+007F, the lone surrogates included, the text "a", that
 *   code point, "b" is a lease invocation acquire takes and release frees (acquire answers a lease naming ws and that text,
 *   holder then answers that text, and release answers true and leaves holder answering undefined), an operator id attest
 *   mints (the attestation it answers is frozen and names that text, ws and the identity's digest as its operatorId,
 *   workspace and sourceIdentity, and the authority's minted answers true for it), and the invocation reference of a request
 *   that asks for no writes, which refuses writes-not-requested at rule 3; for each code point in
 *   U+0000-U+001F and U+007F the same text throws the validation CapabilityError as a lease invocation and as an operator id
 *   and refuses malformed-request as an invocation reference), GEN-CONFINE-ORDER (confineWorkspace, and the admission with the
 *   same host, refuse malformed-request for each of these pairs: a reader that is the string "git", undefined or a plain
 *   object beside a missing workspace, a missing authorized root, a workspace outside the root, a subdirectory of ws and ws
 *   itself; a workspace that is the relative path "relative/ws", holds U+000A or is over 4096 UTF-8 bytes beside a missing
 *   authorized root; and an authorized root that is the relative path "authorized", holds U+000A or is over 4096 UTF-8 bytes
 *   beside a missing workspace), GEN-MEASURE-ORDER (measureSourceIdentity refuses malformed-request for each unclean gate
 *   manifest "", " ", one holding U+000A and one of 4097 UTF-8 bytes beside a root that is a subdirectory of its worktree, a
 *   silent reader, a reader whose GIT_DIR names another repository, a HEAD commit answer that is no object id, an
 *   assume-unchanged entry, an unanswered git status and a dirty base; and the admission with that gate manifest and no host
 *   attestation refuses malformed-request over the assume-unchanged entry, the unanswered git status and the dirty base).
 *   Rule order (the eleven rules of the module comment): each of these cases fails the two rules it names and no rule before them,
 *   and expects the code of the first: GEN-ORDER-SHAPE-CANCEL (1, 2: rule 1's invocationId clause, an invocationId of "", with an
 *   aborted signal), GEN-ORDER-PLAIN-CANCEL (1, 2: rule 1's plain-object clause, a class-instance request, a request whose
 *   prototype is another object and an array carrying the request's members, each with the clean invocationId inv-a, with an
 *   aborted signal), GEN-ORDER-DISPATCH-CANCEL (1, 2: rule 1's dispatch clause, a dispatch that is a string, undefined, null, a
 *   number or a plain object, with an aborted signal), GEN-ORDER-CANCEL-REQUEST (2, 3), GEN-ORDER-REQUEST-CONFINE
 *   (3, 4), GEN-ORDER-CONFINE-MEASURE (4, 5), GEN-ORDER-MEASURE-ATTEST (5, 6), GEN-ORDER-ATTEST-LEASE (6, 7),
 *   GEN-ORDER-LEASE-WAIT (7, 8; the wait is never called, while the same wait is called and refuses once the lease is free),
 *   GEN-WAIT-CANCELLED (8, 9; rule 8's code for a signal aborted by then is admission-cancelled), GEN-ORDER-WAIT-CANCEL (9, 10)
 *   and GEN-ORDER-REMEASURE-REATTEST (10, 11), so each adjacent pair of the eleven rules has a case at the clauses it fails;
 *   which code answers for any other pair of failing clauses is NOT CLAIMED (see below). GEN-ORDER-WAIT-REFUSED fails
 *   rules 8 and 10 (admission-refused), and GEN-ORDER-STATUS-MANIFEST fails git status and the gate manifest within rule 5
 *   (dirty-base).
 *
 * NOT CLAIMED (scope sentences; each bounds what this suite proves):
 * - The function branch of workflow_execute is NOT CLAIMED by this suite: execute-tool.ts still refuses a function definition
 *   (unsupported-definition-kind) until the dispatch bead (EAT-R032..EAT-R035) composes this seam.
 * - Writer exclusivity across host processes is NOT CLAIMED by this suite: one WriterLeases registry binds one host's writers.
 * - An edit made outside Pi after the final measurement is NOT CLAIMED by this suite.
 * - A change made between two of the module's own reads (a file swapped, grown or replaced between a check and the read after it)
 *   is NOT CLAIMED by this suite.
 * - Ignored paths are NOT CLAIMED by this suite beyond R022-IGNORED (an ignored build file is no edit), the repository inner
 *   that R024-NESTED-ADMISSION places under ws's ignored directory (git status lists nothing in ws, and ws's admissions
 *   dispatch) and the ignored gate manifests the R026 cases measure.
 * - Where a worktree's Git directory lives (inside or outside the authorized root) is NOT CLAIMED by this suite.
 * - What core.untrackedCache=false changes in a measurement is NOT CLAIMED by this suite: R022-READER-ARGV pins that every call
 *   carries it, and no untracked-cache state that hides a new file was realized on this host.
 * - The host's own git reader (its process and environment) is NOT CLAIMED by this suite: the suite's reader stands in for the
 *   host's, and of the variables that point git at other files only GIT_DIR (R022-MISDIRECTED-GIT) is pinned.
 * - Mount points are NOT CLAIMED by this suite: confinement judges realpaths, and a realpath does not see through a mount.
 * - Paths on a platform whose path separator is not "/", and case-insensitive file systems, are NOT CLAIMED by this suite.
 * - What acquire answers, while inv-a's lease holds the root, an invocation id other than inv-b, inv-c and the ids
 *   R024-HOLDER-ID-LEASES plants, and what an admission there of an invocation id other than inv-b, inv-c, inv-a and INV-A
 *   meets, are NOT CLAIMED by this suite.
 * - Whether the leases of a pair of roots other than ws and ws2, ws and sub, ws and inner, ws and WS, and r1, r2 and r3 are
 *   independent is NOT CLAIMED by this suite.
 * - Which code answers when a request fails two rules at a pair of clauses no rule-order case fails, or in a form the
 *   rule-order case of that pair does not plant, is NOT CLAIMED by this suite.
 * - Which refusal confineWorkspace answers a call that fails two of its clauses in a pair no entry plants (GEN-CONFINE-ORDER
 *   names the pairs it plants), and what a path that is not absolute clean text yet resolves by realpath gets, are NOT
 *   CLAIMED by this suite.
 * - Which refusal measureSourceIdentity answers a call that fails two of its clauses in a pair no entry plants
 *   (GEN-MEASURE-ORDER names the pairs it plants), and what an absolute canonicalRoot that is not clean text gets, are NOT
 *   CLAIMED by this suite.
 * - Whether a plain or null-prototype policy with an own allowWrites data member true, other than the policies R027-REQUESTED
 *   and R027-REQUESTED-FORMS plant, asks for writes is NOT CLAIMED by this suite.
 * - An array other than those GEN-MALFORMED-SHAPES, R027-NOT-REQUESTED, GEN-ARRAY-PROTOTYPES and GEN-ORDER-PLAIN-CANCEL
 *   plant, as a request or as a policy, is NOT CLAIMED by this suite.
 * - Whether a string the cases do not plant is clean text (one holding two code points outside U+0000-U+001F and U+007F inside
 *   its content, or one such code point at an end, among them) is NOT CLAIMED by this suite.
 * - Whether a relative path the cases do not plant is inside a root (a manifest named "...gate.toml" among them) is NOT
 *   CLAIMED by this suite.
 * - What a request that fails a rule in a form no entry above plants through admitSourceWrite gets (which refusal, and
 *   whether dispatch is called) is NOT CLAIMED by this suite: each entry pins the forms it plants.
 * - What an attestation found at rule 11's re-read gets, in a form R027-WITHDRAWN, R027-REATTESTED and the R027-REREAD
 *   entries do not plant, is NOT CLAIMED by this suite.
 * - What the admission wait is called with in a form GEN-WAIT-ARGUMENT does not plant (a host.signal aborted before the wait
 *   among them), and the this value it is called with, are NOT CLAIMED by this suite.
 * - Whether a reader answer that is not a Buffer, in a form the cases do not plant, is no answer is NOT CLAIMED by this suite.
 * - How the module reads a reader answer in a text form no entry plants (an answer without its final LF on a worktree other
 *   than ws and the R022-READER-NO-LF-EDGE worktrees, or an id followed by text other than R022-READER-COMMIT-CR's CR and
 *   CR LF, among them) is NOT CLAIMED by this suite.
 */
import { type ChildProcess, execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, lstatSync, mkdirSync, readFileSync, realpathSync, renameSync, rmSync, symlinkSync, utimesSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { identityDigest } from "../src/workbench/identity.js";
import {
  admitSourceWrite,
  confineWorkspace,
  measureSourceIdentity,
  SOURCE_IDENTITY_DOMAIN,
  type SourceAdmissionCode,
  type SourceAdmissionHost,
  type SourceAdmissionOutcome,
  type SourceDirtiness,
  type SourceGitReader,
  type SourceIdentity,
  type SourceWriteGrant,
  type SourceWriteRequest,
  type WriteBoundaryAttestation,
  WriteBoundaryAuthority,
  WriterLeases,
} from "../src/workbench/source-admission.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

/** Git-heavy cases (fixture commits plus two measurements per admission) get room under shared-host load. */
const CASE_MS = 60_000;
const OPERATOR = "operator-1";
const FIXTURE_GIT: readonly string[] = [
  "-c",
  "user.name=Pi Source Fixture",
  "-c",
  "user.email=source-fixture@example.invalid",
  "-c",
  "commit.gpgsign=false",
  "-c",
  "core.hooksPath=/dev/null",
  "-c",
  "init.defaultBranch=main",
];

/** Variables that point git at another repository, index or object store than the directory it runs in. */
const LOCATING_ENV: readonly string[] = ["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_COMMON_DIR", "GIT_NAMESPACE"];

function envWith(extra: Readonly<Record<string, string>> = {}): NodeJS.ProcessEnv {
  return { ...Object.fromEntries(Object.entries(process.env).filter(([name]) => !LOCATING_ENV.includes(name))), ...extra };
}

const FIXTURE_ENV = envWith();

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", [...FIXTURE_GIT, ...args], { cwd, env: FIXTURE_ENV, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function sha256(bytes: string | Buffer): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

/** The suite's SourceGitReader: real git in the directory, the locating variables removed, then `extra` set. */
function readerWith(extra: Readonly<Record<string, string>> = {}): SourceGitReader {
  const env = envWith(extra);
  return (directory, args) => {
    try {
      return execFileSync("git", ["-C", directory, ...args], { env, encoding: "buffer", maxBuffer: 16 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"], timeout: 30_000 });
    } catch {
      return undefined;
    }
  };
}

const gitReader = readerWith();

/** The global options the module opens every reader call with. */
const OPTIONS: readonly string[] = ["--no-optional-locks", "-c", "core.fsmonitor=false", "-c", "core.untrackedCache=false"];

/** The fixed reason of each refusal code. */
const REASON: Readonly<Record<SourceAdmissionCode, string>> = {
  "malformed-request": "malformed source write request",
  "writes-not-requested": "the request does not ask for writes, so no write capability is granted",
  "workspace-unresolvable": "the workspace or the authorized root does not resolve",
  "workspace-outside-root": "the workspace resolves outside the authorized canonical root",
  "workspace-not-worktree-root": "git does not report the workspace as the root of its own worktree",
  "source-unmeasurable": "the source identity cannot be measured: git does not answer a measurement call, or reports another worktree root, another Git directory than the workspace's .git, no object id for HEAD's commit or tree, or an index entry tagged other than H",
  "dirty-base": "git status lists tracked, staged or untracked edits of the implementation base",
  "gate-manifest-unavailable": "the gate manifest path is absolute or leaves the workspace, or what it names is missing, unreadable, not a regular file or over its bound",
  "attestation-absent": "the host holds no operator attestation that its authority minted",
  "attestation-other-workspace": "the operator attestation names another workspace",
  "attestation-stale": "the operator attestation names another source identity of this workspace",
  "writer-held": "the writer lease of this canonical workspace is held",
  "admission-cancelled": "the invocation was cancelled during admission",
  "admission-refused": "the host admission wait refused the invocation",
  "source-changed": "the source identity measured after the admission wait is not the admitted one",
};

/** The exact messages of the validation CapabilityErrors the module throws. */
const ATTEST_OPERATOR = "A write boundary attestation names its operator.";
const ATTEST_UNMEASURED = "Only a source identity this host measured can be attested.";
const LEASE_VALIDATION = "A writer lease names a canonical workspace root and an invocation.";

/** The code points String.prototype.trim() removes (ECMAScript WhiteSpace and LineTerminator); GEN-MALFORMED-BLANK derives it. */
const TRIMMED: readonly number[] = [
  0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x20, 0xa0, 0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200a, 0x2028, 0x2029, 0x202f, 0x205f, 0x3000, 0xfeff,
];

/** Text that is not clean at each site that requires clean text: "", " ", a control code point and 4097 UTF-8 bytes. */
const UNCLEAN_TEXT: readonly string[] = ["", " ", "text\nnext", "a".repeat(4097)];

/** Code points as hex, for assertion labels. */
function codePoints(value: string): string {
  return [...value].map(character => character.codePointAt(0)?.toString(16)).join(" ");
}

/** The whole refusal: its code, the fixed reason of that code and, on dirty-base only, the dirty counts. */
function expectRefused(outcome: unknown, code: SourceAdmissionCode, dirty?: SourceDirtiness, label?: string): void {
  const expected = dirty === undefined ? { decision: "refused", code, reason: REASON[code] } : { decision: "refused", code, reason: REASON[code], dirty };
  expect(outcome, label).toStrictEqual(expected);
}

/** The call throws a validation CapabilityError with exactly this message. */
function expectValidation(call: () => unknown, message: string, label?: string): void {
  let thrown: unknown;
  try {
    call();
  } catch (error) {
    thrown = error;
  }
  expect(thrown, label).toBeInstanceOf(CapabilityError);
  expect(thrown instanceof CapabilityError ? [thrown.category, thrown.message] : undefined, label).toEqual(["validation", message]);
}

/** The lines of a plain git status --porcelain=v1 --untracked-files=all, sorted and untrimmed. */
function porcelain(cwd: string): string[] {
  return execFileSync("git", ["status", "--porcelain=v1", "--untracked-files=all"], { cwd, env: FIXTURE_ENV, encoding: "utf8" })
    .split("\n")
    .filter(line => line !== "")
    .sort();
}

/** A clean repository: README.md, forge.toml and src/index.ts committed; gate.local.toml and ignored/ ignored. Canonical path. */
function fixtureRepo(path: string, objectFormat?: "sha256"): string {
  mkdirSync(path, { recursive: true });
  git(path, "init", "-q", ...(objectFormat !== undefined ? [`--object-format=${objectFormat}`] : []));
  writeFileSync(join(path, "README.md"), "# source fixture\n");
  writeFileSync(join(path, "forge.toml"), '[build]\ngate = ["test"]\n');
  writeFileSync(join(path, ".gitignore"), "gate.local.toml\nignored/\n");
  writeFileSync(join(path, "gate.local.toml"), '[gate]\nsteps = ["test"]\n');
  mkdirSync(join(path, "src"));
  writeFileSync(join(path, "src", "index.ts"), "export const fixture = 1;\n");
  git(path, "add", "README.md", "forge.toml", ".gitignore", "src/index.ts");
  git(path, "commit", "-q", "--no-verify", "-m", "fixture base");
  return realpathSync(path);
}

interface Deferred {
  readonly promise: Promise<void>;
  resolve(): void;
  reject(error: Error): void;
}

function deferred(): Deferred {
  let settle: { resolve(): void; reject(error: Error): void } = { resolve: () => {}, reject: () => {} };
  const promise = new Promise<void>((resolve, reject) => {
    settle = { resolve: () => resolve(), reject };
  });
  return { promise, resolve: () => settle.resolve(), reject: error => settle.reject(error) };
}

/** A host admission wait the test parks and releases; `entered` resolves once the admission is waiting. */
function parkedWait(): { readonly entered: Deferred; readonly gate: Deferred; wait(): Promise<void> } {
  const entered = deferred();
  const gate = deferred();
  return {
    entered,
    gate,
    wait: async () => {
      entered.resolve();
      await gate.promise;
    },
  };
}

/** The write-capable dispatch: it records every grant it receives and writes nothing. */
function recorder(): { readonly grants: SourceWriteGrant[]; dispatch(grant: SourceWriteGrant): Promise<string> } {
  const grants: SourceWriteGrant[] = [];
  return {
    grants,
    dispatch: async grant => {
      grants.push(grant);
      return "wrote";
    },
  };
}

/** A reader that records the directory and argv of every call it answers. */
function recording(): { readonly calls: [string, string[]][]; readonly reader: SourceGitReader } {
  const calls: [string, string[]][] = [];
  return {
    calls,
    reader: (directory, args) => {
      calls.push([directory, [...args]]);
      return gitReader(directory, args);
    },
  };
}

type Fault = "undefined" | "throws" | "string" | "junk" | "upper" | "long" | "short";

/** The suite's reader, except that the calls `matches` selects are answered with `fault`. */
function faulty(matches: (args: readonly string[]) => boolean, fault: Fault): SourceGitReader {
  return (directory, args) => {
    const output = gitReader(directory, args);
    if (!matches(args)) return output;
    if (fault === "throws") throw new Error("git cannot answer this call");
    if (fault === "string") return output === undefined ? undefined : (output.toString("utf8") as unknown as Buffer);
    if (fault === "junk") return Buffer.from("not-an-object-id\n");
    if (fault === "upper") return output === undefined ? undefined : Buffer.from(output.toString("utf8").toUpperCase());
    if (fault === "long") return output === undefined ? undefined : Buffer.from(`${output.toString("utf8").trimEnd()}a\n`);
    if (fault === "short") return output === undefined ? undefined : Buffer.from(`${output.toString("utf8").trimEnd().slice(0, -1)}\n`);
    return undefined;
  };
}

/** Each call of a measurement, and the pair of git-dir calls, by its argv. */
const MEASUREMENT_CALLS: readonly (readonly [string, (args: readonly string[]) => boolean])[] = [
  ["rev-parse --show-toplevel", args => args.includes("--show-toplevel")],
  ["rev-parse --absolute-git-dir", args => args.includes("--absolute-git-dir") && !args.some(arg => arg.startsWith("--git-dir="))],
  ["--git-dir=<root>/.git rev-parse --absolute-git-dir", args => args.some(arg => arg.startsWith("--git-dir="))],
  ["both --absolute-git-dir calls", args => args.includes("--absolute-git-dir")],
  ["rev-parse HEAD^{commit}", args => args.includes("HEAD^{commit}")],
  ["rev-parse HEAD^{tree}", args => args.includes("HEAD^{tree}")],
  ["ls-files -v -z", args => args.includes("ls-files")],
  ["status", args => args.includes("status")],
];

async function settled(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null || child.signalCode !== null) return;
  await new Promise<void>(resolve => child.once("exit", () => resolve()));
}

let scratchDir: string;
let base: string;
let root: string;
let ws: string;
let authority: WriteBoundaryAuthority;
let leases: WriterLeases;

function identityOf(path: string, gateManifest = "forge.toml"): SourceIdentity {
  const measured = measureSourceIdentity(path, gateManifest, gitReader);
  if (measured.decision !== "measured") throw new Error(`fixture is not measurable: ${measured.code}`);
  return measured.identity;
}

function hostFor(attestation: WriteBoundaryAttestation | undefined, overrides: Partial<SourceAdmissionHost> = {}): SourceAdmissionHost {
  return { authorizedRoot: root, gateManifest: "forge.toml", git: gitReader, authority, leases, ...(attestation !== undefined ? { attestation } : {}), ...overrides };
}

function requestFor(workspace: string, invocationId = "inv-a", policy: SourceWriteRequest["policy"] = { allowWrites: true }): SourceWriteRequest {
  return { invocationId, workspace, ...(policy !== undefined ? { policy } : {}) };
}

/**
 * The lease-level form of the R024 pair cases, for one order of a pair on a fresh registry: while inv-a holds first, no lease
 * holds second and inv-b acquires it; holder answers inv-a for first and inv-b for second; inv-c's acquire of first answers
 * undefined; and releasing inv-b's lease frees second only, so holder answers inv-a for first and undefined for second, and
 * inv-c's acquire of first still answers undefined.
 */
function expectIndependentLeases(first: string, second: string): void {
  const registry = new WriterLeases();
  expect(registry.acquire(first, "inv-a"), first).toMatchObject({ canonicalRoot: first, invocationId: "inv-a" });
  expect(registry.holder(second), second).toBeUndefined();
  const other = registry.acquire(second, "inv-b");
  expect(other, second).toMatchObject({ canonicalRoot: second, invocationId: "inv-b" });
  expect([registry.holder(first), registry.holder(second)], second).toEqual(["inv-a", "inv-b"]);
  expect(registry.acquire(first, "inv-c"), first).toBeUndefined();
  if (other === undefined) return;
  expect(registry.release(other), second).toBe(true);
  expect([registry.holder(first), registry.holder(second)], second).toEqual(["inv-a", undefined]);
  expect(registry.acquire(first, "inv-c"), first).toBeUndefined();
}

/**
 * The admission-level form of the R024 pair cases, for one order of a pair: while inv-a writes on first, inv-b's admission on
 * second dispatches against second; when inv-b's write ends inv-a still holds first and no lease holds second, so inv-c's
 * admission on first refuses writer-held; and when inv-a's write ends no lease holds first.
 */
async function expectIndependentWrites(first: string, second: string): Promise<void> {
  const writing = deferred();
  const pending = admitSourceWrite(requestFor(first, "inv-a"), hostFor(authority.attest(OPERATOR, identityOf(first))), async () => {
    await writing.promise;
    return "a";
  });
  expect(leases.holder(first), first).toBe("inv-a");
  const other = recorder();
  await expect(admitSourceWrite(requestFor(second, "inv-b"), hostFor(authority.attest(OPERATOR, identityOf(second))), other.dispatch), second).resolves.toMatchObject({ decision: "dispatched" });
  expect(other.grants.map(grant => [grant.identity.canonicalRoot, grant.invocationId]), second).toEqual([[second, "inv-b"]]);
  expect([leases.holder(first), leases.holder(second)], second).toEqual(["inv-a", undefined]);
  const third = recorder();
  expectRefused(await admitSourceWrite(requestFor(first, "inv-c"), hostFor(authority.attest(OPERATOR, identityOf(first))), third.dispatch), "writer-held", undefined, first);
  expect(third.grants, first).toHaveLength(0);
  writing.resolve();
  await expect(pending, first).resolves.toMatchObject({ decision: "dispatched", value: "a" });
  expect(leases.holder(first), first).toBeUndefined();
}

/** ws's committed submodule sub (its own worktree root, inside ws), committed so that ws stays clean; its canonical path. */
function committedSubmodule(): string {
  const source = fixtureRepo(join(base, "submodule-source"));
  git(ws, "-c", "protocol.file.allow=always", "submodule", "add", "-q", source, "sub");
  git(ws, "commit", "-q", "--no-verify", "-m", "a submodule");
  return realpathSync(join(ws, "sub"));
}

beforeEach(() => {
  scratchDir = makeScratch("pi-mwi-source-");
  base = realpathSync(scratchDir);
  root = join(base, "authorized");
  mkdirSync(root);
  ws = fixtureRepo(join(root, "ws"));
  authority = new WriteBoundaryAuthority();
  leases = new WriterLeases();
});

afterEach(() => {
  removeScratch(scratchDir);
});

describe("EAT-R022: a base whose git status lists a record is refused before any write-capable dispatch", { timeout: CASE_MS }, () => {
  it("R022-CLEAN: a clean committed tree dispatches once against the HEAD commit and tree git reports", async () => {
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched", value: "wrote" });
    expect(grants).toHaveLength(1);
    const identity = grants[0]?.identity;
    expect(identity).toMatchObject({
      canonicalRoot: ws,
      commit: git(ws, "rev-parse", "HEAD"),
      tree: git(ws, "rev-parse", "HEAD^{tree}"),
      dirtiness: "clean",
      gateManifest: { path: "forge.toml", sha256: sha256(readFileSync(join(ws, "forge.toml"))) },
    });
    expect(outcome.decision === "dispatched" ? outcome.identity : undefined).toBe(identity);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it('R022-TRACKED: an unstaged edit that git status lists as " M" refuses dirty-base', async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "README.md"), "# edited, not staged\n");
    expect(porcelain(ws)).toEqual([" M README.md"]);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 1, staged: 0, untracked: 0 });
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it('R022-STAGED: a staged edit that git status lists as "M " refuses dirty-base', async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 2;\n");
    git(ws, "add", "src/index.ts");
    expect(porcelain(ws)).toEqual(["M  src/index.ts"]);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 0, staged: 1, untracked: 0 });
    expect(grants).toHaveLength(0);
  });

  it('R022-UNTRACKED: a file that git status lists as "??" refuses dirty-base', async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "notes.txt"), "not added\n");
    expect(porcelain(ws)).toEqual(["?? notes.txt"]);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 0, staged: 0, untracked: 1 });
    expect(grants).toHaveLength(0);
  });

  it("R022-COUNTS: every git status record counts by its columns over a base with several edits", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "README.md"), "# tracked edit\n");
    writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 5;\n");
    git(ws, "add", "src/index.ts");
    writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 6;\n");
    rmSync(join(ws, "forge.toml"));
    writeFileSync(join(ws, "added.txt"), "a staged new file\n");
    git(ws, "add", "added.txt");
    writeFileSync(join(ws, "notes.txt"), "untracked\n");
    mkdirSync(join(ws, "fresh"));
    writeFileSync(join(ws, "fresh", "a.txt"), "untracked a\n");
    writeFileSync(join(ws, "fresh", "b.txt"), "untracked b\n");
    const listed = execFileSync("git", ["status", "--porcelain=v1", "--untracked-files=all"], { cwd: ws, env: FIXTURE_ENV, encoding: "utf8" });
    expect(listed.split("\n").filter(line => line !== "").sort()).toEqual([" D forge.toml", " M README.md", "?? fresh/a.txt", "?? fresh/b.txt", "?? notes.txt", "A  added.txt", "MM src/index.ts"]);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 3, staged: 2, untracked: 3 });
    expect(grants).toHaveLength(0);
  });

  it('R022-STATUS-COLUMNS: a "?M" status record counts as staged and as tracked, never as untracked', () => {
    const crafted: SourceGitReader = (directory, args) => (args.includes("status") ? Buffer.from("?M crafted.txt\0") : gitReader(directory, args));
    expectRefused(measureSourceIdentity(ws, "forge.toml", crafted), "dirty-base", { tracked: 1, staged: 1, untracked: 0 });
  });

  it('R022-STATUS-WORKTREE-QUESTION: an "M?" status record counts as staged and as tracked, never as untracked', () => {
    const mirrored: SourceGitReader = (directory, args) => (args.includes("status") ? Buffer.from("M? mirrored.txt\0") : gitReader(directory, args));
    expectRefused(measureSourceIdentity(ws, "forge.toml", mirrored), "dirty-base", { tracked: 1, staged: 1, untracked: 0 });
  });

  it('R022-STATUS-INDEX-QUESTION: a "? " status record counts as staged, never as untracked or tracked', () => {
    const indexQuestion: SourceGitReader = (directory, args) => (args.includes("status") ? Buffer.from("? index-question.txt\0") : gitReader(directory, args));
    expectRefused(measureSourceIdentity(ws, "forge.toml", indexQuestion), "dirty-base", { tracked: 0, staged: 1, untracked: 0 });
  });

  it('R022-TYPE-AND-INTENT: a type change (" T"), the same change staged ("T ") and an intent-to-add file (" A") count by their columns', async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    rmSync(join(ws, "README.md"));
    symlinkSync("forge.toml", join(ws, "README.md"));
    expect(porcelain(ws)).toEqual([" T README.md"]);
    expectRefused(measureSourceIdentity(ws, "forge.toml", gitReader), "dirty-base", { tracked: 1, staged: 0, untracked: 0 });
    git(ws, "add", "README.md");
    expect(porcelain(ws)).toEqual(["T  README.md"]);
    expectRefused(measureSourceIdentity(ws, "forge.toml", gitReader), "dirty-base", { tracked: 0, staged: 1, untracked: 0 });
    git(ws, "reset", "-q", "--hard");
    expect(porcelain(ws)).toEqual([]);
    writeFileSync(join(ws, "notes.txt"), "intended\n");
    git(ws, "add", "-N", "notes.txt");
    expect(porcelain(ws)).toEqual([" A notes.txt"]);
    expect(git(ws, "ls-files", "-v", "notes.txt")).toBe("H notes.txt");
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch), "dirty-base", { tracked: 1, staged: 0, untracked: 0 });
    expect(grants).toHaveLength(0);
  });

  it("R022-RENAME: a staged rename counts as a staged deletion and a staged addition", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    git(ws, "mv", "README.md", "README2.md");
    expect(git(ws, "status", "--porcelain")).toBe("R  README.md -> README2.md");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 0, staged: 2, untracked: 0 });
    expect(grants).toHaveLength(0);
  });

  it("R022-ASSUME-UNCHANGED: an edit hidden from git status by assume-unchanged refuses source-unmeasurable", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "README.md"), "# edited under assume-unchanged\n");
    git(ws, "update-index", "--assume-unchanged", "README.md");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expect(git(ws, "ls-files", "-v", "README.md")).toBe("h README.md");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "source-unmeasurable");
    expect(grants).toHaveLength(0);
  });

  it("R022-SKIP-WORKTREE: an edit hidden from git status by skip-worktree refuses source-unmeasurable", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 3;\n");
    git(ws, "update-index", "--skip-worktree", "src/index.ts");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expect(git(ws, "ls-files", "-v", "src/index.ts")).toBe("S src/index.ts");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "source-unmeasurable");
    expect(grants).toHaveLength(0);
  });

  it("R022-UNMERGED: an unmerged index entry refuses source-unmeasurable although git status lists it", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    git(ws, "checkout", "-q", "-b", "side");
    writeFileSync(join(ws, "README.md"), "# side\n");
    git(ws, "commit", "-q", "--no-verify", "-am", "side");
    git(ws, "checkout", "-q", "main");
    writeFileSync(join(ws, "README.md"), "# main\n");
    git(ws, "commit", "-q", "--no-verify", "-am", "main");
    expect(() => git(ws, "merge", "-q", "--no-edit", "side")).toThrow();
    expect(git(ws, "status", "--porcelain")).toBe("UU README.md");
    expect(git(ws, "ls-files", "-v", "README.md").split("\n")).toEqual(["M README.md", "M README.md", "M README.md"]);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "source-unmeasurable");
    expect(grants).toHaveLength(0);
  });

  it("R022-NO-HEAD: a repository whose HEAD names no commit refuses source-unmeasurable", () => {
    const unborn = join(root, "unborn");
    mkdirSync(unborn);
    git(unborn, "init", "-q");
    writeFileSync(join(unborn, "forge.toml"), '[build]\ngate = ["test"]\n');
    git(unborn, "add", "forge.toml");
    expect(() => git(unborn, "rev-parse", "--verify", "--quiet", "HEAD^{commit}")).toThrow();
    expectRefused(measureSourceIdentity(realpathSync(unborn), "forge.toml", gitReader), "source-unmeasurable");
  });

  it("R022-ROOT-ONLY: measureSourceIdentity refuses source-unmeasurable for a subdirectory and for a symlink alias of the worktree root", () => {
    const alias = join(root, "alias");
    symlinkSync(ws, alias);
    expectRefused(measureSourceIdentity(join(ws, "src"), "index.ts", gitReader), "source-unmeasurable");
    expectRefused(measureSourceIdentity(alias, "forge.toml", gitReader), "source-unmeasurable");
    expectRefused(measureSourceIdentity(`${ws}/.`, "forge.toml", gitReader), "source-unmeasurable");
  });

  it("R022-TOPLEVEL-ALIAS: a reader that reports the worktree root through a symlink alias measures the canonical root", () => {
    const alias = join(root, "alias");
    symlinkSync(ws, alias);
    const aliasing: SourceGitReader = (directory, args) => (args.includes("--show-toplevel") ? Buffer.from(`${alias}\n`) : gitReader(directory, args));
    expect(measureSourceIdentity(ws, "forge.toml", aliasing)).toMatchObject({ decision: "measured", identity: { canonicalRoot: ws } });
  });

  it("R022-MISDIRECTED-GIT: a reader whose GIT_DIR names another repository refuses source-unmeasurable", async () => {
    const other = fixtureRepo(join(root, "other"));
    writeFileSync(join(other, "README.md"), "# another history\n");
    git(other, "commit", "-q", "--no-verify", "-am", "another history");
    const misdirected = readerWith({ GIT_DIR: join(other, ".git") });
    expect(misdirected(ws, ["rev-parse", "--show-toplevel"])?.toString("utf8").trim()).toBe(ws);
    expectRefused(measureSourceIdentity(ws, "forge.toml", misdirected), "source-unmeasurable");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { git: misdirected }), dispatch);
    expectRefused(outcome, "source-unmeasurable");
    expect(grants).toHaveLength(0);
  });

  it("R022-REPOSITORY-FORMS: a linked worktree, a .git file naming a relative Git directory (LF and CRLF) and a .git symlink each measure", async () => {
    git(ws, "worktree", "add", "-q", "-b", "linked", join(root, "linked"));
    const linked = realpathSync(join(root, "linked"));
    expect(lstatSync(join(linked, ".git")).isFile()).toBe(true);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(linked), hostFor(authority.attest(OPERATOR, identityOf(linked))), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => [grant.identity.canonicalRoot, grant.identity.commit])).toEqual([[linked, git(linked, "rev-parse", "HEAD")]]);
    const moved = fixtureRepo(join(root, "moved"));
    renameSync(join(moved, ".git"), join(root, "moved.git"));
    for (const gitfile of ["gitdir: ../moved.git\n", "gitdir: ../moved.git\r\n"]) {
      writeFileSync(join(moved, ".git"), gitfile);
      expect(identityOf(moved).commit, JSON.stringify(gitfile)).toBe(git(moved, "rev-parse", "HEAD"));
    }
    const symlinked = fixtureRepo(join(root, "symlinked"));
    renameSync(join(symlinked, ".git"), join(root, "symlinked.git"));
    symlinkSync(join(root, "symlinked.git"), join(symlinked, ".git"));
    expect(lstatSync(join(symlinked, ".git")).isSymbolicLink()).toBe(true);
    expect(identityOf(symlinked).commit).toBe(git(symlinked, "rev-parse", "HEAD"));
  });

  it("R022-SHA256: a repository whose object ids are 64 hex digits measures them, and a HEAD answer one digit long or short refuses", () => {
    const wide = fixtureRepo(join(root, "wide"), "sha256");
    const identity = identityOf(wide);
    expect([identity.commit.length, identity.tree.length]).toEqual([64, 64]);
    expect([identity.commit, identity.tree]).toEqual([git(wide, "rev-parse", "HEAD"), git(wide, "rev-parse", "HEAD^{tree}")]);
    for (const [call, matches] of MEASUREMENT_CALLS.filter(([call]) => call.startsWith("rev-parse HEAD"))) {
      for (const fault of ["long", "short"] as const) {
        expectRefused(measureSourceIdentity(wide, "forge.toml", faulty(matches, fault)), "source-unmeasurable", undefined, `${call}: ${fault}`);
      }
    }
  });

  it("R022-READER-ARGV: a measurement and an admission make exactly these reader calls, each opening with the global options", async () => {
    const measuring = recording();
    expect(measureSourceIdentity(ws, "forge.toml", measuring.reader)).toMatchObject({ decision: "measured" });
    const measurement: [string, string[]][] = [
      [ws, [...OPTIONS, "rev-parse", "--show-toplevel"]],
      [ws, [...OPTIONS, "rev-parse", "--absolute-git-dir"]],
      [ws, [...OPTIONS, `--git-dir=${join(ws, ".git")}`, "rev-parse", "--absolute-git-dir"]],
      [ws, [...OPTIONS, "rev-parse", "--verify", "--quiet", "HEAD^{commit}"]],
      [ws, [...OPTIONS, "rev-parse", "--verify", "--quiet", "HEAD^{tree}"]],
      [ws, [...OPTIONS, "ls-files", "-v", "-z"]],
      [ws, [...OPTIONS, "status", "--porcelain=v1", "-z", "--untracked-files=all", "--ignore-submodules=none", "--no-renames"]],
    ];
    expect(measuring.calls).toEqual(measurement);
    const admitting = recording();
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { git: admitting.reader }), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants).toHaveLength(1);
    expect(admitting.calls).toEqual([[ws, [...OPTIONS, "rev-parse", "--show-toplevel"]], ...measurement, ...measurement]);
  });

  it("R022-NO-INDEX-WRITE: a measurement leaves .git/index byte-identical where a plain git status rewrites it", () => {
    git(ws, "status", "--porcelain");
    const old = new Date("2020-01-01T00:00:00Z");
    utimesSync(join(ws, "README.md"), old, old);
    const index = join(ws, ".git", "index");
    const before = readFileSync(index);
    expect(measureSourceIdentity(ws, "forge.toml", gitReader)).toMatchObject({ decision: "measured" });
    expect(readFileSync(index).equals(before)).toBe(true);
    git(ws, "status", "--porcelain");
    expect(readFileSync(index).equals(before)).toBe(false);
  });

  it("R022-FSMONITOR: an edit that a configured fsmonitor hook hides from git status refuses dirty-base", async () => {
    const hook = join(base, "fsmonitor-lying.sh");
    writeFileSync(hook, "#!/bin/sh\nprintf 'tok-%s\\0' \"$(date +%s%N)\"\n");
    chmodSync(hook, 0o755);
    git(ws, "config", "core.fsmonitor", hook);
    git(ws, "config", "core.fsmonitorHookVersion", "2");
    git(ws, "status", "--porcelain");
    git(ws, "status", "--porcelain");
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "README.md"), "# an edit the hook hides\n");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expect(git(ws, "--no-optional-locks", "-c", "core.fsmonitor=false", "status", "--porcelain")).toBe("M README.md");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 1, staged: 0, untracked: 0 });
    expect(grants).toHaveLength(0);
  });

  it("R022-SUBMODULE: a moved submodule that ignore = all hides from git status refuses dirty-base", async () => {
    const source = fixtureRepo(join(base, "submodule-source"));
    git(ws, "-c", "protocol.file.allow=always", "submodule", "add", "-q", source, "sub");
    git(ws, "config", "-f", ".gitmodules", "submodule.sub.ignore", "all");
    git(ws, "add", ".gitmodules");
    git(ws, "commit", "-q", "--no-verify", "-m", "a submodule git status ignores");
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    writeFileSync(join(ws, "sub", "README.md"), "# the submodule moves\n");
    git(join(ws, "sub"), "commit", "-q", "--no-verify", "-am", "the submodule moves");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expect(git(ws, "status", "--porcelain", "--ignore-submodules=none")).toBe("M sub");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expectRefused(outcome, "dirty-base", { tracked: 1, staged: 0, untracked: 0 });
    expect(grants).toHaveLength(0);
  });

  it("R022-READER-PARTIAL: a reader that does not answer one call of the measurement refuses source-unmeasurable", async () => {
    for (const [call, matches] of MEASUREMENT_CALLS) {
      for (const fault of ["undefined", "throws", "string"] as const) {
        expectRefused(measureSourceIdentity(ws, "forge.toml", faulty(matches, fault)), "source-unmeasurable", undefined, `${call}: ${fault}`);
      }
    }
    for (const [call, matches] of MEASUREMENT_CALLS.filter(([call]) => call.startsWith("rev-parse HEAD"))) {
      for (const fault of ["junk", "upper", "long", "short"] as const) {
        expectRefused(measureSourceIdentity(ws, "forge.toml", faulty(matches, fault)), "source-unmeasurable", undefined, `${call}: ${fault}`);
      }
    }
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    writeFileSync(join(ws, "README.md"), "# a tracked edit the reader does not report\n");
    const noStatus = faulty(args => args.includes("status"), "undefined");
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { git: noStatus }), dispatch), "source-unmeasurable");
    git(ws, "checkout", "--", "README.md");
    writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 7;\n");
    git(ws, "update-index", "--assume-unchanged", "src/index.ts");
    expect(git(ws, "status", "--porcelain")).toBe("");
    const noIndex = faulty(args => args.includes("ls-files"), "undefined");
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { git: noIndex }), dispatch), "source-unmeasurable");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R022-IGNORED: an ignored build file is not an edit of the base", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    mkdirSync(join(ws, "ignored"));
    writeFileSync(join(ws, "ignored", "build.log"), "build output\n");
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(attestation), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants).toHaveLength(1);
  });

  it("R022-READER-FINAL-LF: a reader whose answers carry no final LF measures the identity the suite's reader measures, and one whose LF-ending answers end with a second LF refuses source-unmeasurable", async () => {
    const expected = identityOf(ws);
    let stripped = 0;
    const withoutFinalLf: SourceGitReader = (directory, args) => {
      const output = gitReader(directory, args);
      if (output === undefined || output.at(-1) !== 0x0a) return output;
      stripped += 1;
      return output.subarray(0, -1);
    };
    expect(measureSourceIdentity(ws, "forge.toml", withoutFinalLf)).toStrictEqual({ decision: "measured", identity: expected });
    expect(stripped).toBe(5);
    const { grants, dispatch } = recorder();
    await expect(admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, expected), { git: withoutFinalLf }), dispatch)).resolves.toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.identity.digest)).toEqual([expected.digest]);
    const secondLf: SourceGitReader = (directory, args) => {
      const output = gitReader(directory, args);
      return output !== undefined && output.at(-1) === 0x0a ? Buffer.concat([output, Buffer.from("\n")]) : output;
    };
    expectRefused(measureSourceIdentity(ws, "forge.toml", secondLf), "source-unmeasurable");
  });

  it("R022-OBJECT-ID-LEADING-ZERO: a HEAD commit or tree answer that is the real id with its first digit replaced by 0, and the all-zero id of 40 digits, measure as those ids", () => {
    const head = { commit: git(ws, "rev-parse", "HEAD^{commit}"), tree: git(ws, "rev-parse", "HEAD^{tree}") };
    for (const member of ["commit", "tree"] as const) {
      for (const id of [`0${head[member].slice(1)}`, "0".repeat(40)]) {
        const rewritten: SourceGitReader = (directory, args) => (args.includes(`HEAD^{${member}}`) ? Buffer.from(`${id}\n`) : gitReader(directory, args));
        const measured = measureSourceIdentity(ws, "forge.toml", rewritten);
        const ids = measured.decision === "measured" ? [measured.identity.commit, measured.identity.tree] : measured;
        expect(ids, `${member} ${id}`).toEqual(member === "commit" ? [id, head.tree] : [head.commit, id]);
      }
    }
  });

  it("R022-READER-NO-LF-EDGE: on each worktree whose directory name is w followed by one of the 20 code points trim() removes outside U+0000-U+001F, a reader whose answers carry no final LF measures the identity the suite's reader measures, and its admission there dispatches against that root", async () => {
    let stripped = 0;
    const withoutFinalLf: SourceGitReader = (directory, args) => {
      const output = gitReader(directory, args);
      if (output === undefined || output.at(-1) !== 0x0a) return output;
      stripped += 1;
      return output.subarray(0, -1);
    };
    const endings = TRIMMED.filter(codePoint => codePoint > 0x1f);
    expect(endings).toHaveLength(20);
    const { grants, dispatch } = recorder();
    const edged: string[] = [];
    for (const codePoint of endings) {
      const label = `U+${codePoint.toString(16)}`;
      const worktree = fixtureRepo(join(root, `w${String.fromCodePoint(codePoint)}`));
      expect(worktree.endsWith(`w${String.fromCodePoint(codePoint)}`), label).toBe(true);
      const expected = identityOf(worktree);
      stripped = 0;
      expect(measureSourceIdentity(worktree, "forge.toml", withoutFinalLf), label).toStrictEqual({ decision: "measured", identity: expected });
      expect(stripped, label).toBe(5);
      await expect(admitSourceWrite(requestFor(worktree), hostFor(authority.attest(OPERATOR, expected), { git: withoutFinalLf }), dispatch), label).resolves.toMatchObject({ decision: "dispatched" });
      edged.push(worktree);
    }
    expect(grants.map(grant => grant.identity.canonicalRoot)).toEqual(edged);
  });

  it("R022-READER-COMMIT-CR: a HEAD commit answer that is ws's commit id followed by a CR, with no LF after it and with one, refuses source-unmeasurable", () => {
    const commit = git(ws, "rev-parse", "HEAD^{commit}");
    expect(measureSourceIdentity(ws, "forge.toml", gitReader)).toMatchObject({ decision: "measured", identity: { commit } });
    for (const answer of [`${commit}\r`, `${commit}\r\n`]) {
      const carriageReturn: SourceGitReader = (directory, args) => (args.includes("HEAD^{commit}") ? Buffer.from(answer) : gitReader(directory, args));
      expectRefused(measureSourceIdentity(ws, "forge.toml", carriageReturn), "source-unmeasurable", undefined, JSON.stringify(answer));
    }
  });

  it("R022-STAT-TRUST: under core.checkStat=minimal a same-size edit whose mtime is restored is listed by no git status and measured clean (residual UNLISTED-EDITS)", () => {
    git(ws, "config", "core.checkStat", "minimal");
    const old = new Date("2020-01-01T00:00:00Z");
    utimesSync(join(ws, "README.md"), old, old);
    git(ws, "status", "--porcelain");
    const before = identityOf(ws);
    expect(readFileSync(join(ws, "README.md"), "utf8")).toBe("# source fixture\n");
    writeFileSync(join(ws, "README.md"), "# SOURCE FIXTURE\n");
    utimesSync(join(ws, "README.md"), old, old);
    expect(git(ws, "hash-object", "README.md")).not.toBe(git(ws, "rev-parse", ":README.md"));
    expect(porcelain(ws)).toEqual([]);
    const after = identityOf(ws);
    expect([after.dirtiness, after.digest]).toEqual(["clean", before.digest]);
  });

  it("R022-CLEAN-FILTER: under a clean filter that maps the edited file back to its committed bytes the edit is listed by no git status and measured clean (residual UNLISTED-EDITS)", () => {
    const committed = join(base, "README.committed");
    writeFileSync(committed, readFileSync(join(ws, "README.md")));
    git(ws, "config", "filter.hide.clean", `cat '${committed}'`);
    mkdirSync(join(ws, ".git", "info"), { recursive: true });
    writeFileSync(join(ws, ".git", "info", "attributes"), "README.md filter=hide\n");
    const before = identityOf(ws);
    writeFileSync(join(ws, "README.md"), "# SOURCE FIXTURE\n");
    const moved = new Date("2021-06-01T00:00:00Z");
    utimesSync(join(ws, "README.md"), moved, moved);
    expect(git(ws, "hash-object", "--no-filters", "README.md")).not.toBe(git(ws, "rev-parse", ":README.md"));
    expect(porcelain(ws)).toEqual([]);
    const after = identityOf(ws);
    expect([after.dirtiness, after.digest]).toEqual(["clean", before.digest]);
  });
});

describe("EAT-R023: the workspace's realpath must be the authorized root's realpath or inside it, and its own worktree root", { timeout: CASE_MS }, () => {
  it("R023-WRONG: a workspace outside the authorized root refuses workspace-outside-root although it is attested", async () => {
    const elsewhere = fixtureRepo(join(base, "elsewhere"));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(elsewhere), hostFor(authority.attest(OPERATOR, identityOf(elsewhere))), dispatch);
    expectRefused(outcome, "workspace-outside-root");
    expectRefused(await admitSourceWrite(requestFor(join(elsewhere, "src")), hostFor(authority.attest(OPERATOR, identityOf(elsewhere))), dispatch), "workspace-outside-root");
    expect(grants).toHaveLength(0);
    expect(leases.holder(elsewhere)).toBeUndefined();
  });

  it("R023-SIBLING: a prefix-collision sibling of the authorized root refuses workspace-outside-root", async () => {
    const sibling = fixtureRepo(`${root}-sibling`);
    expect(sibling.startsWith(root)).toBe(true);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(sibling), hostFor(authority.attest(OPERATOR, identityOf(sibling))), dispatch);
    expectRefused(outcome, "workspace-outside-root");
    expect(grants).toHaveLength(0);
  });

  it("R023-ESCAPE: a symlink inside the root that resolves outside it refuses workspace-outside-root", async () => {
    const elsewhere = fixtureRepo(join(base, "elsewhere"));
    const escapeLink = join(root, "escape");
    symlinkSync(elsewhere, escapeLink);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(escapeLink), hostFor(authority.attest(OPERATOR, identityOf(elsewhere))), dispatch);
    expectRefused(outcome, "workspace-outside-root");
    expect(grants).toHaveLength(0);
  });

  it("R023-PARENT: the authorized root's parent refuses workspace-outside-root", async () => {
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(base), hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch), "workspace-outside-root");
    expectRefused(confineWorkspace(root, base, gitReader), "workspace-outside-root");
    expect(grants).toHaveLength(0);
  });

  it("R023-SUBDIR: a subdirectory of a worktree refuses workspace-not-worktree-root", async () => {
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(join(ws, "src")), hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch);
    expectRefused(outcome, "workspace-not-worktree-root");
    expect(grants).toHaveLength(0);
  });

  it('R023-RELATIVE: the relative workspace path "authorized/ws" under the authorized root refuses malformed-request', async () => {
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor("authorized/ws"), hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch);
    expectRefused(outcome, "malformed-request");
    expect(grants).toHaveLength(0);
  });

  it("R023-UNRESOLVABLE: a missing workspace or a missing authorized root refuses workspace-unresolvable", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    for (const workspace of [join(root, "missing"), join(base, "missing")]) {
      expectRefused(await admitSourceWrite(requestFor(workspace), hostFor(attestation), dispatch), "workspace-unresolvable", undefined, workspace);
    }
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { authorizedRoot: join(base, "no-root") }), dispatch), "workspace-unresolvable");
    expectRefused(confineWorkspace(join(base, "no-root"), ws, gitReader), "workspace-unresolvable");
    expect(grants).toHaveLength(0);
  });

  it("R023-ALIAS-INSIDE: a symlink that resolves inside the root dispatches against the canonical root", async () => {
    const alias = join(root, "alias");
    symlinkSync(ws, alias);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(alias), hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.identity.canonicalRoot)).toEqual([ws]);
  });

  it("R023-ROOT-ALIAS: an authorized root given as a symlink to the root dispatches against the canonical workspace", async () => {
    const rootAlias = join(base, "root-alias");
    symlinkSync(root, rootAlias);
    expect(confineWorkspace(rootAlias, ws, gitReader)).toEqual({ decision: "confined", canonicalRoot: ws });
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { authorizedRoot: rootAlias }), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.identity.canonicalRoot)).toEqual([ws]);
  });

  it("R023-SPACED-NAME: a workspace whose directory name holds a space, a non-ASCII letter and a trailing space dispatches", async () => {
    const spaced = fixtureRepo(join(root, `w ${String.fromCodePoint(0xe9)} `));
    expect(spaced.endsWith(" ")).toBe(true);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(spaced), hostFor(authority.attest(OPERATOR, identityOf(spaced))), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.identity.canonicalRoot)).toEqual([spaced]);
  });

  it("R023-CONFINE: confineWorkspace answers the sibling with a refusal and the workspace with its canonical root", () => {
    const sibling = fixtureRepo(`${root}-sibling`);
    expectRefused(confineWorkspace(root, sibling, gitReader), "workspace-outside-root");
    expect(confineWorkspace(root, `${ws}/.`, gitReader)).toEqual({ decision: "confined", canonicalRoot: ws });
  });

  it('R023-DOTDOT-NAME: a workspace inside the root named "..ws" confines and dispatches', async () => {
    const dotted = fixtureRepo(join(root, "..ws"));
    expect(dotted).toBe(`${root}/..ws`);
    expect(confineWorkspace(root, dotted, gitReader)).toEqual({ decision: "confined", canonicalRoot: dotted });
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(dotted), hostFor(authority.attest(OPERATOR, identityOf(dotted))), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.identity.canonicalRoot)).toEqual([dotted]);
  });

  it("R023-ROOT-ITSELF: an authorized root that is the workspace itself confines and dispatches", async () => {
    expect(confineWorkspace(ws, ws, gitReader)).toEqual({ decision: "confined", canonicalRoot: ws });
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { authorizedRoot: ws }), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.identity.canonicalRoot)).toEqual([ws]);
  });

  it('R023-DOT-NAMES: workspaces inside the root named "...ws", "..." and ".ws" confine, and "...ws" dispatches against that canonical root', async () => {
    for (const name of ["...ws", "...", ".ws"]) {
      const named = fixtureRepo(join(root, name));
      expect(named, name).toBe(`${root}/${name}`);
      expect(confineWorkspace(root, named, gitReader), name).toEqual({ decision: "confined", canonicalRoot: named });
    }
    const tripleDot = join(root, "...ws");
    const { grants, dispatch } = recorder();
    await expect(admitSourceWrite(requestFor(tripleDot), hostFor(authority.attest(OPERATOR, identityOf(tripleDot))), dispatch)).resolves.toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => [grant.identity.canonicalRoot, grant.invocationId])).toEqual([[tripleDot, "inv-a"]]);
  });
});

describe("EAT-R024: while inv-a's lease holds a canonical workspace root, inv-b and inv-c are refused it, and the leases of ws and ws2, ws and sub, ws and inner, ws and WS, and r1, r2 and r3 are independent in the forms the header names", { timeout: CASE_MS }, () => {
  it("R024-ALIAS: while inv-a writes, inv-b through a symlink alias and inv-c through a dot spelling of the same workspace refuse writer-held", async () => {
    const alias = join(root, "alias");
    symlinkSync(ws, alias);
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const writing = deferred();
    const held: SourceWriteGrant[] = [];
    const pending = admitSourceWrite(requestFor(ws, "inv-a"), hostFor(attestation), async grant => {
      held.push(grant);
      await writing.promise;
      return "a";
    });
    expect(held).toHaveLength(1);
    expect(leases.holder(ws)).toBe("inv-a");
    const { grants, dispatch } = recorder();
    const viaAlias = await admitSourceWrite(requestFor(alias, "inv-b"), hostFor(attestation), dispatch);
    const viaDot = await admitSourceWrite(requestFor(`${ws}/.`, "inv-c"), hostFor(attestation), dispatch);
    expectRefused(viaAlias, "writer-held");
    expectRefused(viaDot, "writer-held");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBe("inv-a");
    writing.resolve();
    await expect(pending).resolves.toMatchObject({ decision: "dispatched", value: "a" });
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R024-CANCEL-OWN: a refused invocation's cancellation keeps the holder's lease; the holder's cancellation releases its own", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const park = parkedWait();
    const holderAbort = new AbortController();
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws, "inv-a"), hostFor(attestation, { admissionWait: park.wait, signal: holderAbort.signal }), dispatch);
    await park.entered.promise;
    expect(leases.holder(ws)).toBe("inv-a");
    const otherAbort = new AbortController();
    const refused = admitSourceWrite(requestFor(ws, "inv-b"), hostFor(attestation, { signal: otherAbort.signal }), dispatch);
    otherAbort.abort();
    expectRefused(await refused, "writer-held");
    expect(leases.holder(ws)).toBe("inv-a");
    holderAbort.abort();
    park.gate.resolve();
    expectRefused(await pending, "admission-cancelled");
    expect(leases.holder(ws)).toBeUndefined();
    expect(grants).toHaveLength(0);
    await expect(admitSourceWrite(requestFor(ws, "inv-c"), hostFor(attestation), dispatch)).resolves.toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.invocationId)).toEqual(["inv-c"]);
  });

  it("R024-STALE: a released lease never releases the next holder's lease", () => {
    const first = leases.acquire(ws, "inv-a");
    expect(first).toMatchObject({ canonicalRoot: ws, invocationId: "inv-a" });
    expect(leases.acquire(ws, "inv-b")).toBeUndefined();
    if (first === undefined) return;
    expect(leases.release(first)).toBe(true);
    const next = leases.acquire(ws, "inv-c");
    expect(next).toMatchObject({ invocationId: "inv-c" });
    expect(leases.release(first)).toBe(false);
    expect(leases.holder(ws)).toBe("inv-c");
  });

  it("R024-FOREIGN: a copy of the held lease, and a released lease of the same invocation after it acquired again, release nothing", () => {
    const held = leases.acquire(ws, "inv-a");
    expect(held).toBeDefined();
    expect(leases.release({ canonicalRoot: ws, invocationId: "inv-a" })).toBe(false);
    expect(leases.holder(ws)).toBe("inv-a");
    if (held === undefined) return;
    expect(leases.release(held)).toBe(true);
    const again = leases.acquire(ws, "inv-a");
    expect(again).toMatchObject({ canonicalRoot: ws, invocationId: "inv-a" });
    expect(again).not.toBe(held);
    expect(leases.release(held)).toBe(false);
    expect(leases.holder(ws)).toBe("inv-a");
  });

  it("R024-VALIDATION: acquire throws a validation CapabilityError for a root or invocation that is not clean text, or a relative root, and takes no lease", () => {
    for (const canonicalRoot of ["authorized/ws", `${ws}\n`, `/${"a".repeat(4096)}`, ...UNCLEAN_TEXT]) {
      expectValidation(() => leases.acquire(canonicalRoot, "inv-a"), LEASE_VALIDATION, JSON.stringify(canonicalRoot.slice(0, 40)));
      expect(leases.holder(canonicalRoot)).toBeUndefined();
    }
    for (const invocationId of UNCLEAN_TEXT) {
      expectValidation(() => leases.acquire(ws, invocationId), LEASE_VALIDATION, JSON.stringify(invocationId.slice(0, 40)));
    }
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R024-TWO-ROOTS: while inv-a writes on ws, inv-b's admission on the sibling worktree ws2 dispatches, and inv-c's admission on ws refuses writer-held", async () => {
    const ws2 = fixtureRepo(join(root, "ws2"));
    const writing = deferred();
    const held: string[] = [];
    const first = admitSourceWrite(requestFor(ws, "inv-a"), hostFor(authority.attest(OPERATOR, identityOf(ws))), async grant => {
      held.push(grant.invocationId);
      await writing.promise;
      return "a";
    });
    expect(held).toEqual(["inv-a"]);
    const second = recorder();
    await expect(admitSourceWrite(requestFor(ws2, "inv-b"), hostFor(authority.attest(OPERATOR, identityOf(ws2))), second.dispatch)).resolves.toMatchObject({ decision: "dispatched" });
    expect(second.grants.map(grant => [grant.identity.canonicalRoot, grant.invocationId])).toEqual([[ws2, "inv-b"]]);
    expect([leases.holder(ws), leases.holder(ws2)]).toEqual(["inv-a", undefined]);
    const third = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws, "inv-c"), hostFor(authority.attest(OPERATOR, identityOf(ws))), third.dispatch), "writer-held");
    expect(third.grants).toHaveLength(0);
    writing.resolve();
    await expect(first).resolves.toMatchObject({ decision: "dispatched", value: "a" });
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R024-RELEASE-OTHER-ROOT: releasing r2's lease of the three roots r1, r2 and r3 frees r2 only, and inv-b's completed write on ws2 leaves inv-a's lease of ws held", async () => {
    const r1 = join(root, "r1");
    const r2 = join(root, "r2");
    const r3 = join(root, "r3");
    const taken = [r1, r2, r3].map(path => leases.acquire(path, "inv-a"));
    expect(taken.map(lease => lease?.canonicalRoot)).toEqual([r1, r2, r3]);
    expect([r1, r2, r3].map(path => leases.holder(path))).toEqual(["inv-a", "inv-a", "inv-a"]);
    const middle = taken[1];
    if (middle === undefined) return;
    expect(leases.release(middle)).toBe(true);
    expect([r1, r2, r3].map(path => leases.holder(path))).toEqual(["inv-a", undefined, "inv-a"]);
    expect([leases.acquire(r1, "inv-c"), leases.acquire(r3, "inv-c")]).toEqual([undefined, undefined]);
    expect(leases.acquire(r2, "inv-d")).toMatchObject({ canonicalRoot: r2, invocationId: "inv-d" });
    const ws2 = fixtureRepo(join(root, "ws2"));
    const writing = deferred();
    const first = admitSourceWrite(requestFor(ws, "inv-a"), hostFor(authority.attest(OPERATOR, identityOf(ws))), async () => {
      await writing.promise;
      return "a";
    });
    expect(leases.holder(ws)).toBe("inv-a");
    const second = recorder();
    await expect(admitSourceWrite(requestFor(ws2, "inv-b"), hostFor(authority.attest(OPERATOR, identityOf(ws2))), second.dispatch)).resolves.toMatchObject({ decision: "dispatched" });
    expect([leases.holder(ws), leases.holder(ws2)]).toEqual(["inv-a", undefined]);
    const third = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws, "inv-c"), hostFor(authority.attest(OPERATOR, identityOf(ws))), third.dispatch), "writer-held");
    expect(third.grants).toHaveLength(0);
    writing.resolve();
    await expect(first).resolves.toMatchObject({ decision: "dispatched", value: "a" });
  });

  it("R024-SIBLING-LEASES: for ws and its sibling ws2 in either order, while inv-a holds one no lease holds the other and inv-b acquires it, and releasing inv-b's lease leaves inv-a's held and inv-c refused it", () => {
    const ws2 = join(root, "ws2");
    expect(ws2.startsWith(ws)).toBe(true);
    expectIndependentLeases(ws, ws2);
    expectIndependentLeases(ws2, ws);
  });

  it("R024-NESTED-LEASES: for ws and each root inside it, sub and ignored/inner, in either order, while inv-a holds one no lease holds the other and inv-b acquires it, and releasing inv-b's lease leaves inv-a's held and inv-c refused it", () => {
    const sub = join(ws, "sub");
    const inner = join(ws, "ignored", "inner");
    for (const nested of [sub, inner]) {
      expectIndependentLeases(ws, nested);
      expectIndependentLeases(nested, ws);
    }
  });

  it("R024-CASE-LEASES: for ws and WS, whose paths differ only in letter case, in either order, while inv-a holds one no lease holds the other and inv-b acquires it, and releasing inv-b's lease leaves inv-a's held and inv-c refused it", () => {
    const upper = join(root, "WS");
    expect(upper.toLowerCase()).toBe(ws.toLowerCase());
    expectIndependentLeases(ws, upper);
    expectIndependentLeases(upper, ws);
  });

  it("R024-SIBLING-ADMISSION: for the worktrees ws and ws2 in either order, while inv-a writes on one, inv-b's admission on the other dispatches, and when inv-b's write ends inv-c is still refused the first", async () => {
    const ws2 = fixtureRepo(join(root, "ws2"));
    await expectIndependentWrites(ws, ws2);
    await expectIndependentWrites(ws2, ws);
  });

  it("R024-NESTED-ADMISSION: for ws and its committed submodule sub, and for ws and the repository ignored/inner, in either order, while inv-a writes on one, inv-b's admission on the other dispatches, and when inv-b's write ends inv-c is still refused the first", async () => {
    const sub = committedSubmodule();
    const inner = fixtureRepo(join(ws, "ignored", "inner"));
    expect(porcelain(ws)).toEqual([]);
    expect([sub, inner]).toEqual([join(ws, "sub"), join(ws, "ignored", "inner")]);
    expect([sub, inner].map(path => gitReader(path, ["rev-parse", "--show-toplevel"])?.toString("utf8").trim())).toEqual([sub, inner]);
    for (const nested of [sub, inner]) {
      await expectIndependentWrites(ws, nested);
      await expectIndependentWrites(nested, ws);
    }
  });

  it("R024-CASE-ADMISSION: for the worktrees ws and WS, two directories on this file system, in either order, while inv-a writes on one, inv-b's admission on the other dispatches, and when inv-b's write ends inv-c is still refused the first", async () => {
    const upper = fixtureRepo(join(root, "WS"));
    expect(upper).toBe(join(root, "WS"));
    expect(lstatSync(upper).ino).not.toBe(lstatSync(ws).ino);
    await expectIndependentWrites(ws, upper);
    await expectIndependentWrites(upper, ws);
  });

  it('R024-HOLDER-ID-LEASES: while inv-a holds ws, acquire answers undefined to inv-a itself, INV-A, Inv-A, inv-A, " inv-a", "inv-a ", inv-a2, inv-aa and inv-, and inv-a\'s own lease still frees ws', () => {
    const held = leases.acquire(ws, "inv-a");
    expect(held).toMatchObject({ canonicalRoot: ws, invocationId: "inv-a" });
    for (const invocationId of ["inv-a", "INV-A", "Inv-A", "inv-A", " inv-a", "inv-a ", "inv-a2", "inv-aa", "inv-"]) {
      expect(leases.acquire(ws, invocationId), JSON.stringify(invocationId)).toBeUndefined();
      expect(leases.holder(ws), JSON.stringify(invocationId)).toBe("inv-a");
    }
    if (held === undefined) return;
    expect(leases.release(held)).toBe(true);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R024-HOLDER-ID-ADMISSION: while inv-a writes on ws, inv-a's second admission on ws and through a symlink alias, and INV-A's admission, refuse writer-held, and inv-b's admission after them still refuses writer-held", async () => {
    const alias = join(root, "alias");
    symlinkSync(ws, alias);
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const writing = deferred();
    let writers = 0;
    let peak = 0;
    const pending = admitSourceWrite(requestFor(ws, "inv-a"), hostFor(attestation), async () => {
      writers += 1;
      peak = Math.max(peak, writers);
      await writing.promise;
      writers -= 1;
      return "a";
    });
    expect(leases.holder(ws)).toBe("inv-a");
    const others = recorder();
    for (const [workspace, invocationId] of [
      [ws, "inv-a"],
      [alias, "inv-a"],
      [ws, "INV-A"],
      [ws, "inv-b"],
    ] as const) {
      expectRefused(await admitSourceWrite(requestFor(workspace, invocationId), hostFor(attestation), others.dispatch), "writer-held", undefined, `${invocationId} on ${workspace}`);
      expect(leases.holder(ws), `${invocationId} on ${workspace}`).toBe("inv-a");
    }
    expect(others.grants).toHaveLength(0);
    writing.resolve();
    await expect(pending).resolves.toMatchObject({ decision: "dispatched", value: "a" });
    expect([peak, leases.holder(ws)]).toEqual([1, undefined]);
  });
});

describe("EAT-R025: the source basis is measured again after the asynchronous admission wait", { timeout: CASE_MS }, () => {
  async function parkAndChange(change: () => void, gateManifest = "forge.toml"): Promise<{ outcome: SourceAdmissionOutcome<string>; grants: SourceWriteGrant[] }> {
    const attestation = authority.attest(OPERATOR, identityOf(ws, gateManifest));
    const park = parkedWait();
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), hostFor(attestation, { gateManifest, admissionWait: park.wait }), dispatch);
    await park.entered.promise;
    change();
    park.gate.resolve();
    return { outcome: await pending, grants };
  }

  it("R025-CONTROL: a park with no change dispatches once", async () => {
    const { outcome, grants } = await parkAndChange(() => {});
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(grants).toHaveLength(1);
  });

  it("R025-COMMIT: a commit made while admission is parked (commit and tree change) refuses source-changed", async () => {
    const before = git(ws, "rev-parse", "HEAD^{tree}");
    const { outcome, grants } = await parkAndChange(() => {
      writeFileSync(join(ws, "README.md"), "# committed while parked\n");
      git(ws, "commit", "-q", "--no-verify", "-am", "parked change");
    });
    expect(git(ws, "rev-parse", "HEAD^{tree}")).not.toBe(before);
    expectRefused(outcome, "source-changed");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R025-AMEND: an amended commit with the same tree refuses source-changed", async () => {
    const tree = git(ws, "rev-parse", "HEAD^{tree}");
    const commit = git(ws, "rev-parse", "HEAD");
    const { outcome, grants } = await parkAndChange(() => {
      git(ws, "commit", "-q", "--no-verify", "--amend", "-m", "amended while parked");
    });
    expect(git(ws, "rev-parse", "HEAD^{tree}")).toBe(tree);
    expect(git(ws, "rev-parse", "HEAD")).not.toBe(commit);
    expectRefused(outcome, "source-changed");
    expect(grants).toHaveLength(0);
  });

  it("R025-GATE: gate manifest bytes changed while admission is parked refuse source-changed", async () => {
    const { outcome, grants } = await parkAndChange(() => {
      writeFileSync(join(ws, "gate.local.toml"), '[gate]\nsteps = ["lint", "test"]\n');
    }, "gate.local.toml");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expectRefused(outcome, "source-changed");
    expect(grants).toHaveLength(0);
  });

  it("R025-TRACKED: tracked bytes changed while admission is parked refuse source-changed", async () => {
    const { outcome, grants } = await parkAndChange(() => {
      writeFileSync(join(ws, "src", "index.ts"), "export const fixture = 4;\n");
    });
    expectRefused(outcome, "source-changed");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });
});

describe("EAT-R026: the gate manifest digest is part of the source identity", { timeout: CASE_MS }, () => {
  it("R026-IDENTITY: changed gate manifest bytes change the identity while root, commit, tree and clean status hold", () => {
    const before = identityOf(ws, "gate.local.toml");
    const original = readFileSync(join(ws, "gate.local.toml"));
    const edited = '[gate]\nsteps = ["lint"]\n';
    writeFileSync(join(ws, "gate.local.toml"), edited);
    const after = identityOf(ws, "gate.local.toml");
    expect(git(ws, "status", "--porcelain")).toBe("");
    expect([after.canonicalRoot, after.commit, after.tree, after.dirtiness]).toEqual([before.canonicalRoot, before.commit, before.tree, before.dirtiness]);
    expect(before.gateManifest).toEqual({ path: "gate.local.toml", sha256: sha256(original) });
    expect(after.gateManifest).toEqual({ path: "gate.local.toml", sha256: sha256(edited) });
    expect(after.digest).not.toBe(before.digest);
  });

  it("R026-STALE: the attestation of the old identity refuses attestation-stale; one for the new identity dispatches", async () => {
    const old = authority.attest(OPERATOR, identityOf(ws, "gate.local.toml"));
    const edited = '[gate]\nsteps = ["typing"]\n';
    writeFileSync(join(ws, "gate.local.toml"), edited);
    const { grants, dispatch } = recorder();
    const stale = await admitSourceWrite(requestFor(ws), hostFor(old, { gateManifest: "gate.local.toml" }), dispatch);
    expectRefused(stale, "attestation-stale");
    expect(grants).toHaveLength(0);
    const fresh = authority.attest(OPERATOR, identityOf(ws, "gate.local.toml"));
    const admitted = await admitSourceWrite(requestFor(ws), hostFor(fresh, { gateManifest: "gate.local.toml" }), dispatch);
    expect(admitted).toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.identity.gateManifest.sha256)).toEqual([sha256(edited)]);
  });

  it("R026-MANIFEST-PATH: the same bytes under another manifest path are another identity, so its attestation refuses attestation-stale", async () => {
    mkdirSync(join(ws, "ignored"));
    writeFileSync(join(ws, "ignored", "gate.toml"), readFileSync(join(ws, "forge.toml")));
    const viaForge = identityOf(ws, "forge.toml");
    const viaIgnored = identityOf(ws, "ignored/gate.toml");
    expect(viaIgnored.gateManifest).toEqual({ path: "ignored/gate.toml", sha256: viaForge.gateManifest.sha256 });
    expect(viaIgnored.digest).not.toBe(viaForge.digest);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, viaForge), { gateManifest: "ignored/gate.toml" }), dispatch);
    expectRefused(outcome, "attestation-stale");
    expect(grants).toHaveLength(0);
  });

  it("R026-MANIFEST-ALIAS: a manifest declared through a symlink inside the workspace binds its target's path", () => {
    mkdirSync(join(ws, "ignored"));
    symlinkSync(join(ws, "forge.toml"), join(ws, "ignored", "alias.toml"));
    const direct = identityOf(ws, "forge.toml");
    const viaAlias = identityOf(ws, "ignored/alias.toml");
    expect(viaAlias.gateManifest).toEqual({ path: "forge.toml", sha256: direct.gateManifest.sha256 });
    expect(viaAlias.digest).toBe(direct.digest);
  });

  it("R026-DIGEST: the identity digest is identityDigest(SOURCE_IDENTITY_DOMAIN, the five members)", () => {
    const identity = identityOf(ws, "gate.local.toml");
    const { canonicalRoot, commit, tree, dirtiness, gateManifest } = identity;
    expect(identity.digest).toBe(identityDigest(SOURCE_IDENTITY_DOMAIN, { canonicalRoot, commit, tree, dirtiness, gateManifest }));
    expect(Object.keys(identity).sort()).toEqual(["canonicalRoot", "commit", "digest", "dirtiness", "gateManifest", "tree"]);
  });

  it("R026-FROZEN: the identity and its gateManifest member are frozen, and an assignment to the identity throws", () => {
    const identity = identityOf(ws);
    expect(Object.isFrozen(identity)).toBe(true);
    expect(Object.isFrozen(identity.gateManifest)).toBe(true);
    const other = fixtureRepo(join(root, "other"));
    expect(() => Object.assign(identity, { canonicalRoot: other })).toThrow(TypeError);
    expect(identity.canonicalRoot).toBe(ws);
    expect(authority.attest(OPERATOR, identity).workspace).toBe(ws);
  });

  it("R026-UNAVAILABLE: a missing, absolute, escaping, non-file or unreadable manifest refuses gate-manifest-unavailable", () => {
    writeFileSync(join(root, "outside.toml"), '[gate]\nsteps = ["test"]\n');
    mkdirSync(join(ws, "ignored"));
    symlinkSync(join(root, "outside.toml"), join(ws, "ignored", "gate.toml"));
    symlinkSync(ws, join(root, "ws-alias"));
    writeFileSync(join(ws, "ignored", "locked.toml"), '[gate]\nsteps = ["test"]\n');
    chmodSync(join(ws, "ignored", "locked.toml"), 0o000);
    expect(() => readFileSync(join(ws, "ignored", "locked.toml"))).toThrow();
    expect(git(ws, "status", "--porcelain")).toBe("");
    for (const manifest of ["absent.toml", join(ws, "forge.toml"), "../outside.toml", "../ws-alias/forge.toml", "ignored/gate.toml", "src", "ignored/locked.toml"]) {
      expectRefused(measureSourceIdentity(ws, manifest, gitReader), "gate-manifest-unavailable", undefined, manifest);
    }
  });

  it("R026-NOT-REGULAR: a FIFO gate manifest refuses gate-manifest-unavailable", async () => {
    mkdirSync(join(ws, "ignored"));
    const fifo = join(ws, "ignored", "gate.fifo");
    execFileSync("mkfifo", [fifo]);
    // A writer that unblocks any reader that opens the FIFO, so a module that reads it answers instead of hanging.
    const writer = spawn("sh", ["-c", 'printf "[gate]\\n" > "$1"', "sh", fifo], { stdio: "ignore" });
    try {
      expectRefused(measureSourceIdentity(ws, "ignored/gate.fifo", gitReader), "gate-manifest-unavailable");
    } finally {
      writer.kill("SIGKILL");
      await settled(writer);
    }
  });

  it("R026-BOUND: a 1048576-byte gate manifest measures and a 1048577-byte one refuses gate-manifest-unavailable", () => {
    mkdirSync(join(ws, "ignored"));
    const most = Buffer.alloc(1048576, 0x61);
    writeFileSync(join(ws, "ignored", "most.toml"), most);
    writeFileSync(join(ws, "ignored", "over.toml"), Buffer.alloc(1048577, 0x61));
    expect(identityOf(ws, "ignored/most.toml").gateManifest).toEqual({ path: "ignored/most.toml", sha256: sha256(most) });
    expectRefused(measureSourceIdentity(ws, "ignored/over.toml", gitReader), "gate-manifest-unavailable");
  });

  it('R026-DOTDOT-MANIFEST: the committed gate manifests "..gate.toml" and "..d/gate.toml" measure with that path', () => {
    const bytes = '[gate]\nsteps = ["test"]\n';
    writeFileSync(join(ws, "..gate.toml"), bytes);
    mkdirSync(join(ws, "..d"));
    writeFileSync(join(ws, "..d", "gate.toml"), bytes);
    git(ws, "add", "..gate.toml", "..d/gate.toml");
    git(ws, "commit", "-q", "--no-verify", "-m", "gate manifests under dotted names");
    expect(porcelain(ws)).toEqual([]);
    expect(identityOf(ws, "..gate.toml").gateManifest).toEqual({ path: "..gate.toml", sha256: sha256(bytes) });
    expect(identityOf(ws, "..d/gate.toml").gateManifest).toEqual({ path: "..d/gate.toml", sha256: sha256(bytes) });
  });
});

describe("EAT-R027: writes need an operator attestation the host minted for this workspace and identity", { timeout: CASE_MS }, () => {
  it("R027-ABSENT: allowWrites:true without a host attestation grants no write capability", async () => {
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(undefined), dispatch);
    expectRefused(outcome, "attestation-absent");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R027-POLICY-COPY: an attestation copied into the JSON policy is not authority", async () => {
    const copy: JsonValue = JSON.parse(JSON.stringify(authority.attest(OPERATOR, identityOf(ws))));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws, "inv-a", { allowWrites: true, attestation: copy }), hostFor(undefined), dispatch);
    expectRefused(outcome, "attestation-absent");
    expect(grants).toHaveLength(0);
  });

  it("R027-FORGED: an equal-shaped copy in the host's attestation slot was not minted and refuses attestation-absent", async () => {
    const minted = authority.attest(OPERATOR, identityOf(ws));
    const forged: WriteBoundaryAttestation = { ...minted };
    expect(forged).toEqual(minted);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(forged), dispatch);
    expectRefused(outcome, "attestation-absent");
    expect(grants).toHaveLength(0);
  });

  it("R027-FOREIGN-AUTHORITY: another authority's attestation is not this host's", async () => {
    const foreign = new WriteBoundaryAuthority().attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(foreign), dispatch);
    expectRefused(outcome, "attestation-absent");
    expect(grants).toHaveLength(0);
  });

  it("R027-OTHER-WORKSPACE: an attestation for another workspace refuses attestation-other-workspace", async () => {
    const other = fixtureRepo(join(root, "other"));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(other))), dispatch);
    expectRefused(outcome, "attestation-other-workspace");
    expect(grants).toHaveLength(0);
  });

  it("R027-NOT-REQUESTED: without an own allowWrites data member exactly true no write capability is granted, attested or not", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    let accessorCalls = 0;
    const accessor: JsonValue = {};
    Object.defineProperty(accessor, "allowWrites", {
      enumerable: true,
      get: () => {
        accessorCalls += 1;
        return true;
      },
    });
    class PolicyObject {
      readonly allowWrites = true;
    }
    const inherited: JsonValue = Object.create({ allowWrites: true });
    const requests: readonly SourceWriteRequest[] = [
      { invocationId: "inv-a", workspace: ws },
      { invocationId: "inv-a", workspace: ws, policy: { allowWrites: false } },
      { invocationId: "inv-a", workspace: ws, policy: { allowWrites: "true" } },
      { invocationId: "inv-a", workspace: ws, policy: { allowWrites: 1 } },
      { invocationId: "inv-a", workspace: ws, policy: [{ allowWrites: true }] },
      { invocationId: "inv-a", workspace: ws, policy: accessor },
      { invocationId: "inv-a", workspace: ws, policy: inherited },
      { invocationId: "inv-a", workspace: ws, policy: new PolicyObject() as unknown as JsonValue },
    ];
    for (const [index, request] of requests.entries()) {
      expectRefused(await admitSourceWrite(request, hostFor(attestation), dispatch), "writes-not-requested", undefined, `request ${index}`);
    }
    expect(accessorCalls).toBe(0);
    expect(grants).toHaveLength(0);
  });

  it("R027-REQUESTED: the policy { allowWrites: true } and its null-prototype copy dispatch", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    const nullPrototype: JsonValue = Object.assign(Object.create(null), { allowWrites: true });
    for (const policy of [{ allowWrites: true }, nullPrototype]) {
      await expect(admitSourceWrite(requestFor(ws, "inv-a", policy), hostFor(attestation), dispatch)).resolves.toMatchObject({ decision: "dispatched" });
    }
    expect(grants).toHaveLength(2);
  });

  it("R027-WITHDRAWN: an attestation the host withdraws while admission waits refuses attestation-absent", async () => {
    const park = parkedWait();
    const host = { ...hostFor(authority.attest(OPERATOR, identityOf(ws))), admissionWait: park.wait };
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), host, dispatch);
    await park.entered.promise;
    host.attestation = undefined;
    park.gate.resolve();
    expectRefused(await pending, "attestation-absent");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R027-REATTESTED: an attestation the host replaces while admission waits is read again, so the grant names the new operator", async () => {
    const identity = identityOf(ws);
    const park = parkedWait();
    const host = { ...hostFor(authority.attest(OPERATOR, identity)), admissionWait: park.wait };
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), host, dispatch);
    await park.entered.promise;
    host.attestation = authority.attest("operator-2", identity);
    park.gate.resolve();
    await expect(pending).resolves.toMatchObject({ decision: "dispatched" });
    expect(grants.map(grant => grant.operatorId)).toEqual(["operator-2"]);
  });

  it("R027-REREAD-OTHER-WORKSPACE: an attestation the host replaces while admission waits with its authority's attestation of another workspace refuses attestation-other-workspace at rule 11", async () => {
    const other = identityOf(fixtureRepo(join(root, "other")));
    const park = parkedWait();
    const host = { ...hostFor(authority.attest(OPERATOR, identityOf(ws))), admissionWait: park.wait };
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), host, dispatch);
    await park.entered.promise;
    expect(leases.holder(ws)).toBe("inv-a");
    const replacement = authority.attest(OPERATOR, other);
    expect([replacement.workspace, replacement.sourceIdentity]).toEqual([other.canonicalRoot, other.digest]);
    host.attestation = replacement;
    park.gate.resolve();
    expectRefused(await pending, "attestation-other-workspace");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R027-REREAD-STALE: an attestation the host replaces while admission waits with its authority's attestation of another identity of ws refuses attestation-stale at rule 11", async () => {
    mkdirSync(join(ws, "ignored"));
    writeFileSync(join(ws, "ignored", "gate.toml"), readFileSync(join(ws, "forge.toml")));
    const admitted = identityOf(ws);
    const another = identityOf(ws, "ignored/gate.toml");
    expect([another.canonicalRoot, another.commit, another.tree]).toEqual([ws, admitted.commit, admitted.tree]);
    expect(another.digest).not.toBe(admitted.digest);
    const park = parkedWait();
    const host = { ...hostFor(authority.attest(OPERATOR, admitted)), admissionWait: park.wait };
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), host, dispatch);
    await park.entered.promise;
    expect(leases.holder(ws)).toBe("inv-a");
    host.attestation = authority.attest(OPERATOR, another);
    park.gate.resolve();
    expectRefused(await pending, "attestation-stale");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("R027-REREAD-UNMINTED: an equal-shaped copy of the minted attestation, and another authority's attestation of the same identity, each replacing the attestation while admission waits, refuse attestation-absent at rule 11", async () => {
    const identity = identityOf(ws);
    const minted = authority.attest(OPERATOR, identity);
    const replacements: readonly (readonly [string, WriteBoundaryAttestation])[] = [
      ["an equal-shaped copy", { ...minted }],
      ["another authority's attestation", new WriteBoundaryAuthority().attest(OPERATOR, identity)],
    ];
    for (const [label, replacement] of replacements) {
      expect(replacement, label).toEqual(minted);
      expect(authority.minted(replacement), label).toBe(false);
      const park = parkedWait();
      const host = { ...hostFor(minted), admissionWait: park.wait };
      const { grants, dispatch } = recorder();
      const pending = admitSourceWrite(requestFor(ws), host, dispatch);
      await park.entered.promise;
      expect(leases.holder(ws), label).toBe("inv-a");
      host.attestation = replacement;
      park.gate.resolve();
      expectRefused(await pending, "attestation-absent", undefined, label);
      expect(grants, label).toHaveLength(0);
      expect(leases.holder(ws), label).toBeUndefined();
    }
  });

  it("R027-UNMEASURED: attest throws a validation CapabilityError for an identity the host did not measure and for an operator id that is not clean text", () => {
    const measured = identityOf(ws);
    const lookalike: SourceIdentity = { ...measured, gateManifest: { ...measured.gateManifest } };
    expectValidation(() => authority.attest(OPERATOR, lookalike), ATTEST_UNMEASURED);
    for (const operatorId of ["operator\nnext", ...UNCLEAN_TEXT]) {
      expectValidation(() => authority.attest(operatorId, measured), ATTEST_OPERATOR, JSON.stringify(operatorId.slice(0, 40)));
    }
  });

  it("R027-ATTESTED: a minted attestation for this identity dispatches a frozen grant naming its operator", async () => {
    const identity = identityOf(ws);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identity)), dispatch);
    expect(outcome).toMatchObject({ decision: "dispatched" });
    expect(Object.keys(outcome).sort()).toEqual(["decision", "identity", "value"]);
    expect(grants).toHaveLength(1);
    const grant = grants[0];
    expect(grant).toMatchObject({ invocationId: "inv-a", operatorId: OPERATOR, lease: { canonicalRoot: ws, invocationId: "inv-a" } });
    expect(grant?.identity.digest).toBe(identity.digest);
    expect(Object.isFrozen(grant)).toBe(true);
  });

  it("R027-ATTESTATION-FROZEN: a minted attestation is frozen, so it cannot be rewritten to name another workspace", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    expect(Object.isFrozen(attestation)).toBe(true);
    const other = identityOf(fixtureRepo(join(root, "other")));
    expect(() => Object.assign(attestation, { workspace: other.canonicalRoot, sourceIdentity: other.digest })).toThrow(TypeError);
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(other.canonicalRoot), hostFor(attestation), dispatch);
    expectRefused(outcome, "attestation-other-workspace");
    expect(grants).toHaveLength(0);
  });

  it("R027-REQUESTED-FORMS: plain and null-prototype policies whose own allowWrites data member true has each combination of the enumerable, writable and configurable attributes, the frozen, sealed and non-extensible { allowWrites: true }, and { allowWrites: true, foo: 1 } dispatch", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const policies: [string, unknown][] = [];
    for (const prototype of [Object.prototype, null]) {
      for (const enumerable of [true, false]) {
        for (const writable of [true, false]) {
          for (const configurable of [true, false]) {
            const policy: unknown = Object.defineProperty(Object.create(prototype), "allowWrites", { value: true, enumerable, writable, configurable });
            policies.push([`${prototype === null ? "null-prototype" : "plain"} enumerable=${enumerable} writable=${writable} configurable=${configurable}`, policy]);
          }
        }
      }
    }
    policies.push(["frozen", Object.freeze({ allowWrites: true })], ["sealed", Object.seal({ allowWrites: true })], ["non-extensible", Object.preventExtensions({ allowWrites: true })], ["foo member", { allowWrites: true, foo: 1 }]);
    expect(policies).toHaveLength(20);
    const { grants, dispatch } = recorder();
    for (const [label, policy] of policies) {
      await expect(admitSourceWrite(requestFor(ws, "inv-a", policy as JsonValue), hostFor(attestation), dispatch), label).resolves.toMatchObject({ decision: "dispatched" });
    }
    expect(grants.map(grant => grant.invocationId)).toEqual(policies.map(() => "inv-a"));
  });
});

describe("admission lifecycle: cancellation, a refusing wait, a throwing dispatch and malformed input", { timeout: CASE_MS }, () => {
  it("GEN-PRE-ABORTED: an invocation cancelled before admission refuses admission-cancelled and takes no lease", async () => {
    const abort = new AbortController();
    abort.abort();
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { signal: abort.signal }), dispatch);
    expectRefused(outcome, "admission-cancelled");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-WAIT-REFUSED: a host admission wait that rejects refuses admission-refused and releases the lease", async () => {
    const park = parkedWait();
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { admissionWait: park.wait }), dispatch);
    await park.entered.promise;
    expect(leases.holder(ws)).toBe("inv-a");
    park.gate.reject(new Error("host budget closed"));
    expectRefused(await pending, "admission-refused");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-WAIT-CANCELLED: a wait that rejects because the signal aborted refuses admission-cancelled and releases the lease", async () => {
    const abort = new AbortController();
    const entered = deferred();
    const wait = (signal: AbortSignal | undefined): Promise<void> =>
      new Promise<void>((_, reject) => {
        signal?.addEventListener("abort", () => reject(new Error("wait cancelled")));
        entered.resolve();
      });
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { signal: abort.signal, admissionWait: wait }), dispatch);
    await entered.promise;
    expect(leases.holder(ws)).toBe("inv-a");
    abort.abort();
    expectRefused(await pending, "admission-cancelled");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-WAIT-ARGUMENT: the admission wait is called once with one argument, host.signal: the very AbortSignal while host.signal is set and not aborted, and undefined when it is unset", async () => {
    const abort = new AbortController();
    for (const signal of [abort.signal, undefined]) {
      const label = signal === undefined ? "host.signal unset" : "host.signal set";
      const calls: unknown[][] = [];
      const wait = async (...args: unknown[]): Promise<void> => {
        calls.push(args);
      };
      const { grants, dispatch } = recorder();
      const host = hostFor(authority.attest(OPERATOR, identityOf(ws)), { admissionWait: wait, ...(signal !== undefined ? { signal } : {}) });
      expect("signal" in host, label).toBe(signal !== undefined);
      await expect(admitSourceWrite(requestFor(ws), host, dispatch), label).resolves.toMatchObject({ decision: "dispatched" });
      expect(grants, label).toHaveLength(1);
      expect(calls.map(args => args.length), label).toEqual([1]);
      expect(calls[0]?.[0], label).toBe(signal);
    }
  });

  it("GEN-WAIT-REFUSED-SIGNAL: a wait that rejects while host.signal is set and not aborted refuses admission-refused and releases the lease", async () => {
    const abort = new AbortController();
    const park = parkedWait();
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { signal: abort.signal, admissionWait: park.wait }), dispatch);
    await park.entered.promise;
    expect(leases.holder(ws)).toBe("inv-a");
    park.gate.reject(new Error("host budget closed"));
    expectRefused(await pending, "admission-refused");
    expect(abort.signal.aborted).toBe(false);
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-DISPATCH-THROWS: a dispatch that throws propagates its error and releases the lease", async () => {
    const failure = new Error("implement failed");
    const outcome = admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws))), async () => {
      throw failure;
    });
    await expect(outcome).rejects.toBe(failure);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it('GEN-MALFORMED: on an otherwise valid admission, an invocation reference that is "" or " ", holds a code point of U+0000-U+001F or U+007F, or exceeds 4096 UTF-8 bytes refuses malformed-request', async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    const controls = [...Array.from({ length: 0x20 }, (_, codePoint) => codePoint), 0x7f].map(codePoint => `inv${String.fromCodePoint(codePoint)}x`);
    const oversized = ["a".repeat(4097), String.fromCodePoint(0xe9).repeat(2049), String.fromCodePoint(0x20ac).repeat(1366), String.fromCodePoint(0x1f600).repeat(1025)];
    expect(oversized.map(text => Buffer.byteLength(text))).toEqual([4097, 4098, 4098, 4100]);
    for (const invocationId of ["", " ", "inv\nnext", ...controls, ...oversized]) {
      expectRefused(await admitSourceWrite(requestFor(ws, invocationId), hostFor(attestation), dispatch), "malformed-request", undefined, `${invocationId.length} units: ${codePoints(invocationId.slice(0, 4))}`);
    }
    expect(grants).toHaveLength(0);
  });

  it('GEN-MALFORMED-BLANK: on the clean worktree ws, text that String.prototype.trim() reduces to "" is refused as an invocation reference, gate manifest, operator id and lease invocation', async () => {
    const removed: number[] = [];
    for (let codePoint = 0; codePoint <= 0x10ffff; codePoint += 1) {
      if (codePoint >= 0xd800 && codePoint <= 0xdfff) continue;
      if (String.fromCodePoint(codePoint).trim() === "") removed.push(codePoint);
    }
    expect(removed).toEqual(TRIMMED);
    const identity = identityOf(ws);
    const attestation = authority.attest(OPERATOR, identity);
    const { grants, dispatch } = recorder();
    for (const blank of [...TRIMMED.map(codePoint => String.fromCodePoint(codePoint)), String.fromCodePoint(...TRIMMED)]) {
      const label = codePoints(blank);
      expectRefused(await admitSourceWrite(requestFor(ws, blank), hostFor(attestation), dispatch), "malformed-request", undefined, label);
      expectRefused(measureSourceIdentity(ws, blank, gitReader), "malformed-request", undefined, label);
      expectValidation(() => authority.attest(blank, identity), ATTEST_OPERATOR, label);
      expectValidation(() => leases.acquire(ws, blank), LEASE_VALIDATION, label);
    }
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-MALFORMED-TYPES: beside otherwise valid arguments, a value that is not a string where text is required refuses malformed-request or throws a validation CapabilityError", async () => {
    const identity = identityOf(ws);
    const attestation = authority.attest(OPERATOR, identity);
    const { grants, dispatch } = recorder();
    const values: readonly unknown[] = [undefined, null, 1, true, {}, ["inv-a"]];
    for (const [index, value] of values.entries()) {
      const label = `value ${index}`;
      const text = value as string;
      const requests: readonly unknown[] = [
        { invocationId: value, workspace: ws, policy: { allowWrites: true } },
        { invocationId: "inv-a", workspace: value, policy: { allowWrites: true } },
      ];
      for (const request of requests) {
        expectRefused(await admitSourceWrite(request as SourceWriteRequest, hostFor(attestation), dispatch), "malformed-request", undefined, label);
      }
      expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { authorizedRoot: text }), dispatch), "malformed-request", undefined, label);
      expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { gateManifest: text }), dispatch), "malformed-request", undefined, label);
      expectRefused(measureSourceIdentity(text, "forge.toml", gitReader), "malformed-request", undefined, label);
      expectRefused(measureSourceIdentity(ws, text, gitReader), "malformed-request", undefined, label);
      expectRefused(confineWorkspace(text, ws, gitReader), "malformed-request", undefined, label);
      expectRefused(confineWorkspace(root, text, gitReader), "malformed-request", undefined, label);
      expectValidation(() => authority.attest(text, identity), ATTEST_OPERATOR, label);
      expectValidation(() => leases.acquire(text, "inv-a"), LEASE_VALIDATION, label);
      expectValidation(() => leases.acquire(ws, text), LEASE_VALIDATION, label);
    }
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-CLEAN-TEXT: an invocation reference of exactly 4096 UTF-8 bytes of one-, two-, three- or four-byte text dispatches", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    const references = ["a".repeat(4096), String.fromCodePoint(0xe9).repeat(2048), `${String.fromCodePoint(0x20ac).repeat(1365)}a`, String.fromCodePoint(0x1f600).repeat(1024)];
    for (const invocationId of references) {
      expect(Buffer.byteLength(invocationId)).toBe(4096);
      await expect(admitSourceWrite(requestFor(ws, invocationId), hostFor(attestation), dispatch)).resolves.toMatchObject({ decision: "dispatched" });
    }
    expect(grants).toHaveLength(4);
  });

  it("GEN-CLEAN-TEXT-FORMS: content between code points trim() removes, and U+0020, U+007E, U+0080, U+009F or U+00A0 inside content, is clean text", async () => {
    const identity = identityOf(ws);
    const attestation = authority.attest(OPERATOR, identity);
    const { grants, dispatch } = recorder();
    const padding = String.fromCodePoint(...TRIMMED.filter(codePoint => codePoint > 0x1f));
    const references = [`${padding}inv-a${padding}`, ...[0x20, 0x7e, 0x80, 0x9f, 0xa0].map(codePoint => `inv${String.fromCodePoint(codePoint)}a`)];
    for (const reference of references) {
      const label = codePoints(reference);
      await expect(admitSourceWrite(requestFor(ws, reference), hostFor(attestation), dispatch), label).resolves.toMatchObject({ decision: "dispatched" });
      expect(authority.attest(reference, identity).operatorId, label).toBe(reference);
      const lease = leases.acquire(ws, reference);
      expect(lease, label).toMatchObject({ canonicalRoot: ws, invocationId: reference });
      if (lease !== undefined) expect(leases.release(lease), label).toBe(true);
    }
    expect(grants.map(grant => grant.invocationId)).toEqual(references);
  });

  it("GEN-MALFORMED-SHAPES: beside otherwise valid arguments, a null, string, Array.prototype array or class-instance request, a string dispatch or reader, a relative root, a U+000A-holding or oversized path and an unclean manifest refuse malformed-request", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    class RequestObject {
      readonly invocationId = "inv-a";
      readonly workspace = ws;
      readonly policy = { allowWrites: true };
    }
    const shapes: readonly unknown[] = [null, "inv-a", [requestFor(ws)], new RequestObject()];
    for (const [index, shape] of shapes.entries()) {
      expectRefused(await admitSourceWrite(shape as SourceWriteRequest, hostFor(attestation), dispatch), "malformed-request", undefined, `shape ${index}`);
    }
    const notDispatch = "dispatch" as unknown as typeof dispatch;
    const notReader = "git" as unknown as SourceGitReader;
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation), notDispatch), "malformed-request");
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { authorizedRoot: "authorized" }), dispatch), "malformed-request");
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { git: notReader }), dispatch), "malformed-request");
    expectRefused(confineWorkspace("authorized", ws, gitReader), "malformed-request");
    for (const workspace of [join(root, "ws\nnext"), `/${"a".repeat(4096)}`]) {
      expectRefused(await admitSourceWrite(requestFor(workspace), hostFor(attestation), dispatch), "malformed-request", undefined, `${workspace.length} units`);
    }
    expectRefused(confineWorkspace(`${root}\n`, ws, gitReader), "malformed-request");
    expectRefused(confineWorkspace(`/${"a".repeat(4096)}`, ws, gitReader), "malformed-request");
    expectRefused(measureSourceIdentity("authorized/ws", "forge.toml", gitReader), "malformed-request");
    for (const manifest of ["forge\n.toml", ...UNCLEAN_TEXT]) {
      expectRefused(measureSourceIdentity(ws, manifest, gitReader), "malformed-request", undefined, JSON.stringify(manifest));
    }
    expectRefused(measureSourceIdentity(ws, "forge.toml", notReader), "malformed-request");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-NULL-PROTOTYPE-REQUEST: a request object with a null prototype is a plain object and dispatches", async () => {
    const request: SourceWriteRequest = Object.assign(Object.create(null), requestFor(ws));
    expect(Object.getPrototypeOf(request)).toBeNull();
    const { grants, dispatch } = recorder();
    await expect(admitSourceWrite(request, hostFor(authority.attest(OPERATOR, identityOf(ws))), dispatch)).resolves.toMatchObject({ decision: "dispatched" });
    expect(grants).toHaveLength(1);
  });

  it("GEN-READER-FAILS: a reader that throws or answers with a string is a refusal, never a rejection", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const throwing: SourceGitReader = () => {
      throw new Error("git is not installed");
    };
    const textual: SourceGitReader = (directory, args) => {
      const output = gitReader(directory, args);
      return output === undefined ? undefined : (output.toString("utf8") as unknown as Buffer);
    };
    const { grants, dispatch } = recorder();
    for (const reader of [throwing, textual]) {
      expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { git: reader }), dispatch), "workspace-not-worktree-root");
      expectRefused(measureSourceIdentity(ws, "forge.toml", reader), "source-unmeasurable");
    }
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-READER-NOT-BUFFER: git's bytes answered as a Uint8Array, an ArrayBuffer, a DataView, an array of byte values or an object whose toString answers git's text are no answer at every call, and as a Uint8Array or such an object at one call alone", async () => {
    const asUint8Array = (output: Buffer): unknown => new Uint8Array(output);
    const asTextObject = (output: Buffer): unknown => ({ toString: () => output.toString("utf8") });
    const forms: readonly (readonly [string, (output: Buffer) => unknown, (value: unknown) => Buffer])[] = [
      ["a Uint8Array", asUint8Array, value => Buffer.from(value as Uint8Array)],
      ["an ArrayBuffer", output => new Uint8Array(output).buffer, value => Buffer.from(value as ArrayBuffer)],
      ["a DataView", output => new DataView(new Uint8Array(output).buffer), value => Buffer.from((value as DataView).buffer)],
      ["an array of byte values", output => [...output], value => Buffer.from(value as number[])],
      ["an object whose toString answers git's text", asTextObject, value => Buffer.from(String(value))],
    ];
    const top = gitReader(ws, [...OPTIONS, "rev-parse", "--show-toplevel"]);
    if (top === undefined) throw new Error("git does not answer rev-parse --show-toplevel in ws");
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    for (const [form, answer, bytes] of forms) {
      const value = answer(top);
      expect(Buffer.isBuffer(value), form).toBe(false);
      expect(bytes(value).equals(top), form).toBe(true);
      const every: SourceGitReader = (directory, args) => {
        const output = gitReader(directory, args);
        return output === undefined ? undefined : (answer(output) as Buffer);
      };
      expectRefused(confineWorkspace(root, ws, every), "workspace-not-worktree-root", undefined, form);
      expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { git: every }), dispatch), "workspace-not-worktree-root", undefined, form);
      expectRefused(measureSourceIdentity(ws, "forge.toml", every), "source-unmeasurable", undefined, form);
    }
    const oneCallForms: readonly (readonly [string, (output: Buffer) => unknown])[] = [
      ["a Uint8Array", asUint8Array],
      ["an object whose toString answers git's text", asTextObject],
    ];
    for (const [form, answer] of oneCallForms) {
      for (const [call, matches] of MEASUREMENT_CALLS) {
        const one: SourceGitReader = (directory, args) => {
          const output = gitReader(directory, args);
          return output === undefined || !matches(args) ? output : (answer(output) as Buffer);
        };
        expectRefused(measureSourceIdentity(ws, "forge.toml", one), "source-unmeasurable", undefined, `${call}: ${form}`);
      }
    }
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-REASON-FIXED: a refusal's reason names neither the caller's workspace nor its invocation", async () => {
    const elsewhere = fixtureRepo(join(base, "elsewhere-distinct-name"));
    const { grants, dispatch } = recorder();
    const outcome = await admitSourceWrite(requestFor(elsewhere, "inv-distinct-token"), hostFor(authority.attest(OPERATOR, identityOf(elsewhere))), dispatch);
    expectRefused(outcome, "workspace-outside-root");
    expect(JSON.stringify(outcome)).not.toContain("elsewhere-distinct-name");
    expect(JSON.stringify(outcome)).not.toContain("inv-distinct-token");
    expect(grants).toHaveLength(0);
  });

  it('GEN-ORDER-SHAPE-CANCEL: an invocationId of "" with an aborted signal refuses malformed-request', async () => {
    const abort = new AbortController();
    abort.abort();
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws, ""), hostFor(authority.attest(OPERATOR, identityOf(ws)), { signal: abort.signal }), dispatch), "malformed-request");
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-CANCEL-REQUEST: a cancelled request that asks for no writes refuses admission-cancelled", async () => {
    const abort = new AbortController();
    abort.abort();
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws, "inv-a", {}), hostFor(authority.attest(OPERATOR, identityOf(ws)), { signal: abort.signal }), dispatch), "admission-cancelled");
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-REQUEST-CONFINE: a request that asks for no writes against an outside workspace refuses writes-not-requested", async () => {
    const elsewhere = fixtureRepo(join(base, "elsewhere"));
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(elsewhere, "inv-a", {}), hostFor(authority.attest(OPERATOR, identityOf(elsewhere))), dispatch), "writes-not-requested");
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-CONFINE-MEASURE: a dirty workspace outside the root refuses workspace-outside-root", async () => {
    const elsewhere = fixtureRepo(join(base, "elsewhere"));
    const attestation = authority.attest(OPERATOR, identityOf(elsewhere));
    writeFileSync(join(elsewhere, "notes.txt"), "untracked\n");
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(elsewhere), hostFor(attestation), dispatch), "workspace-outside-root");
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-MEASURE-ATTEST: a dirty base without an attestation refuses dirty-base", async () => {
    writeFileSync(join(ws, "notes.txt"), "untracked\n");
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(undefined), dispatch), "dirty-base", { tracked: 0, staged: 0, untracked: 1 });
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-STATUS-MANIFEST: a dirty base whose gate manifest is missing refuses dirty-base", async () => {
    writeFileSync(join(ws, "README.md"), "# tracked edit\n");
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws), hostFor(undefined, { gateManifest: "absent.toml" }), dispatch), "dirty-base", { tracked: 1, staged: 0, untracked: 0 });
    expectRefused(measureSourceIdentity(ws, "absent.toml", gitReader), "dirty-base", { tracked: 1, staged: 0, untracked: 0 });
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-ATTEST-LEASE: an unattested request while another invocation holds the lease refuses attestation-absent", async () => {
    expect(leases.acquire(ws, "inv-a")).toBeDefined();
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws, "inv-b"), hostFor(undefined), dispatch), "attestation-absent");
    expect(leases.holder(ws)).toBe("inv-a");
    expect(grants).toHaveLength(0);
  });

  it("GEN-ORDER-LEASE-WAIT: a held lease with a refusing wait refuses writer-held and never calls the wait", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    let waits = 0;
    const refusing = async (): Promise<void> => {
      waits += 1;
      throw new Error("host budget closed");
    };
    const held = leases.acquire(ws, "inv-a");
    expect(held).toBeDefined();
    const { grants, dispatch } = recorder();
    expectRefused(await admitSourceWrite(requestFor(ws, "inv-b"), hostFor(attestation, { admissionWait: refusing }), dispatch), "writer-held");
    expect(waits).toBe(0);
    expect(leases.holder(ws)).toBe("inv-a");
    if (held === undefined) return;
    expect(leases.release(held)).toBe(true);
    expectRefused(await admitSourceWrite(requestFor(ws, "inv-b"), hostFor(attestation, { admissionWait: refusing }), dispatch), "admission-refused");
    expect(waits).toBe(1);
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-ORDER-WAIT-REFUSED: a refusing wait while the source changed refuses admission-refused", async () => {
    const park = parkedWait();
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { admissionWait: park.wait }), dispatch);
    await park.entered.promise;
    writeFileSync(join(ws, "README.md"), "# changed while the wait refuses\n");
    park.gate.reject(new Error("host budget closed"));
    expectRefused(await pending, "admission-refused");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-ORDER-WAIT-CANCEL: cancellation during the wait while the source changed refuses admission-cancelled", async () => {
    const park = parkedWait();
    const abort = new AbortController();
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), hostFor(authority.attest(OPERATOR, identityOf(ws)), { admissionWait: park.wait, signal: abort.signal }), dispatch);
    await park.entered.promise;
    writeFileSync(join(ws, "README.md"), "# changed while cancelled\n");
    abort.abort();
    park.gate.resolve();
    expectRefused(await pending, "admission-cancelled");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-ORDER-REMEASURE-REATTEST: a source change and a withdrawn attestation during the wait refuse source-changed", async () => {
    const park = parkedWait();
    const host = { ...hostFor(authority.attest(OPERATOR, identityOf(ws))), admissionWait: park.wait };
    const { grants, dispatch } = recorder();
    const pending = admitSourceWrite(requestFor(ws), host, dispatch);
    await park.entered.promise;
    writeFileSync(join(ws, "README.md"), "# changed while withdrawn\n");
    host.attestation = undefined;
    park.gate.resolve();
    expectRefused(await pending, "source-changed");
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-ARRAY-PROTOTYPES: an empty and a one-element array whose prototype is Object.prototype or null are not plain objects: carrying an own allowWrites true as the policy each refuses writes-not-requested, and carrying the request members as the request each refuses malformed-request", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    for (const prototype of [Object.prototype, null]) {
      for (const elements of [[], [requestFor(ws)]]) {
        const label = `${elements.length === 0 ? "empty" : "one-element"} array, ${prototype === null ? "null prototype" : "Object.prototype"}`;
        const policy: unknown = Object.setPrototypeOf(Object.assign([...elements], { allowWrites: true }), prototype);
        const request: unknown = Object.setPrototypeOf(Object.assign([...elements], requestFor(ws)), prototype);
        expect([Array.isArray(policy), Array.isArray(request), Object.getPrototypeOf(policy) === prototype, Object.getPrototypeOf(request) === prototype], label).toEqual([true, true, true, true]);
        expectRefused(await admitSourceWrite(requestFor(ws, "inv-a", policy as JsonValue), hostFor(attestation), dispatch), "writes-not-requested", undefined, `policy, ${label}`);
        expectRefused(await admitSourceWrite(request as SourceWriteRequest, hostFor(attestation), dispatch), "malformed-request", undefined, `request, ${label}`);
      }
    }
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-ORDER-PLAIN-CANCEL: a class-instance request, a request whose prototype is another object and an array carrying the request members, each with the clean invocationId inv-a and an aborted signal, refuse malformed-request", async () => {
    const abort = new AbortController();
    abort.abort();
    class RequestObject {
      readonly invocationId = "inv-a";
      readonly workspace = ws;
      readonly policy = { allowWrites: true };
    }
    const requests: readonly (readonly [string, unknown])[] = [
      ["class instance", new RequestObject()],
      ["prototype object", Object.assign(Object.create({ inherited: true }), requestFor(ws))],
      ["array", Object.assign([], requestFor(ws))],
    ];
    const { grants, dispatch } = recorder();
    for (const [label, request] of requests) {
      expectRefused(await admitSourceWrite(request as SourceWriteRequest, hostFor(authority.attest(OPERATOR, identityOf(ws)), { signal: abort.signal }), dispatch), "malformed-request", undefined, label);
    }
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-ORDER-DISPATCH-CANCEL: a dispatch that is a string, undefined, null, a number or a plain object, with an aborted signal, refuses malformed-request", async () => {
    const abort = new AbortController();
    abort.abort();
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    for (const [label, notDispatch] of [
      ["string", "dispatch"],
      ["undefined", undefined],
      ["null", null],
      ["number", 1],
      ["plain object", {}],
    ] as const) {
      expectRefused(await admitSourceWrite(requestFor(ws), hostFor(attestation, { signal: abort.signal }), notDispatch as unknown as (grant: SourceWriteGrant) => Promise<string>), "malformed-request", undefined, label);
    }
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-CLEAN-TEXT-SCAN: for every code point outside U+0000-U+001F and U+007F, the text a, that code point, b is clean text as a lease invocation, an operator id and an invocation reference, and for each code point inside them it is not", async () => {
    const identity = identityOf(ws);
    const host = hostFor(authority.attest(OPERATOR, identity));
    const { grants, dispatch } = recorder();
    const mismatches: string[] = [];
    let cleanPoints = 0;
    let uncleanPoints = 0;
    for (let point = 0; point <= 0x10ffff; point += 1) {
      const text = `a${String.fromCodePoint(point)}b`;
      const clean = point > 0x1f && point !== 0x7f;
      if (clean) cleanPoints += 1;
      else uncleanPoints += 1;
      let leaseReading: string;
      try {
        const lease = leases.acquire(ws, text);
        if (lease === undefined) leaseReading = "no lease";
        else if (lease.canonicalRoot !== ws || lease.invocationId !== text || leases.holder(ws) !== text) leaseReading = "other lease";
        else leaseReading = leases.release(lease) && leases.holder(ws) === undefined ? "leased" : "not freed";
      } catch (error) {
        leaseReading = error instanceof CapabilityError && error.category === "validation" && error.message === LEASE_VALIDATION ? "validation" : "other error";
      }
      let operatorReading: string;
      try {
        const attestation = authority.attest(text, identity);
        const named = attestation.operatorId === text && attestation.workspace === ws && attestation.sourceIdentity === identity.digest && Object.isFrozen(attestation);
        operatorReading = !named ? "other attestation" : authority.minted(attestation) ? "attested" : "not minted";
      } catch (error) {
        operatorReading = error instanceof CapabilityError && error.category === "validation" && error.message === ATTEST_OPERATOR ? "validation" : "other error";
      }
      const admission = await admitSourceWrite(requestFor(ws, text, {}), host, dispatch);
      const admissionReading =
        admission.decision !== "refused" ? admission.decision : Object.keys(admission).length === 3 && admission.reason === REASON[admission.code] ? admission.code : `${admission.code} (not the whole refusal)`;
      const expected = clean ? ["leased", "attested", "writes-not-requested"] : ["validation", "validation", "malformed-request"];
      if (leaseReading !== expected[0] || operatorReading !== expected[1] || admissionReading !== expected[2]) mismatches.push(`U+${point.toString(16)}: ${leaseReading}, ${operatorReading}, ${admissionReading}`);
    }
    expect(mismatches.slice(0, 16)).toEqual([]);
    expect(mismatches).toHaveLength(0);
    expect([cleanPoints, uncleanPoints]).toEqual([0x110000 - 33, 33]);
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-CONFINE-ORDER: confineWorkspace and the admission refuse malformed-request when a reader that is not a function, a workspace that is not absolute clean text or an authorized root that is not absolute clean text meets a later failing clause", async () => {
    const attestation = authority.attest(OPERATOR, identityOf(ws));
    const { grants, dispatch } = recorder();
    const missingWorkspace = join(root, "missing");
    const missingRoot = join(base, "no-such-root");
    const elsewhere = fixtureRepo(join(base, "elsewhere"));
    const subdirectory = join(ws, "src");
    const later: readonly (readonly [string, string, string])[] = [
      ["a missing workspace", root, missingWorkspace],
      ["a missing authorized root", missingRoot, ws],
      ["a workspace outside the root", root, elsewhere],
      ["a subdirectory of ws", root, subdirectory],
      ["ws itself", root, ws],
    ];
    for (const [readerLabel, notReader] of [
      ["the string git", "git"],
      ["undefined", undefined],
      ["a plain object", {}],
    ] as const) {
      const reader = notReader as unknown as SourceGitReader;
      for (const [label, authorizedRoot, workspace] of later) {
        expectRefused(confineWorkspace(authorizedRoot, workspace, reader), "malformed-request", undefined, `${readerLabel} beside ${label}`);
        expectRefused(await admitSourceWrite(requestFor(workspace), hostFor(attestation, { authorizedRoot, git: reader }), dispatch), "malformed-request", undefined, `admission: ${readerLabel} beside ${label}`);
      }
    }
    const oversized = `/${"a".repeat(4096)}`;
    for (const workspace of ["relative/ws", join(root, "ws\nnext"), oversized]) {
      const label = `workspace ${JSON.stringify(workspace.slice(0, 24))} beside a missing authorized root`;
      expectRefused(confineWorkspace(missingRoot, workspace, gitReader), "malformed-request", undefined, label);
      expectRefused(await admitSourceWrite(requestFor(workspace), hostFor(attestation, { authorizedRoot: missingRoot }), dispatch), "malformed-request", undefined, `admission: ${label}`);
    }
    for (const authorizedRoot of ["authorized", `${root}\n`, oversized]) {
      const label = `authorized root ${JSON.stringify(authorizedRoot.slice(0, 24))} beside a missing workspace`;
      expectRefused(confineWorkspace(authorizedRoot, missingWorkspace, gitReader), "malformed-request", undefined, label);
      expectRefused(await admitSourceWrite(requestFor(missingWorkspace), hostFor(attestation, { authorizedRoot }), dispatch), "malformed-request", undefined, `admission: ${label}`);
    }
    expect(grants).toHaveLength(0);
    expect(leases.holder(ws)).toBeUndefined();
  });

  it("GEN-MEASURE-ORDER: measureSourceIdentity refuses malformed-request when a gate manifest that is not clean text meets each later failing clause of the measurement, and so does an admission with that gate manifest and no host attestation over the index, status and dirty-base clauses", async () => {
    const subdirectory = join(ws, "src");
    const other = fixtureRepo(join(base, "other"));
    const hidden = fixtureRepo(join(root, "hidden"));
    git(hidden, "update-index", "--assume-unchanged", "README.md");
    writeFileSync(join(hidden, "README.md"), "# hidden edit\n");
    const dirty = fixtureRepo(join(root, "dirty"));
    writeFileSync(join(dirty, "notes.txt"), "untracked\n");
    const statusSilent = faulty(args => args.includes("status"), "undefined");
    const later: readonly (readonly [string, string, SourceGitReader])[] = [
      ["a subdirectory of ws", subdirectory, gitReader],
      ["a silent reader", ws, () => undefined],
      ["a reader whose GIT_DIR names another repository", ws, readerWith({ GIT_DIR: join(other, ".git") })],
      ["a HEAD commit answer that is no object id", ws, faulty(args => args.includes("HEAD^{commit}"), "junk")],
      ["an assume-unchanged entry", hidden, gitReader],
      ["an unanswered git status", ws, statusSilent],
      ["a dirty base", dirty, gitReader],
    ];
    for (const [label, canonicalRoot, reader] of later) {
      for (const manifest of UNCLEAN_TEXT) {
        expectRefused(measureSourceIdentity(canonicalRoot, manifest, reader), "malformed-request", undefined, `${JSON.stringify(manifest.slice(0, 12))} beside ${label}`);
      }
    }
    const { grants, dispatch } = recorder();
    for (const [label, workspace, reader] of [
      ["an assume-unchanged entry", hidden, gitReader],
      ["an unanswered git status", ws, statusSilent],
      ["a dirty base", dirty, gitReader],
    ] as const) {
      for (const manifest of UNCLEAN_TEXT) {
        expectRefused(await admitSourceWrite(requestFor(workspace), hostFor(undefined, { gateManifest: manifest, git: reader }), dispatch), "malformed-request", undefined, `admission: ${JSON.stringify(manifest.slice(0, 12))} beside ${label}`);
      }
    }
    expect(grants).toHaveLength(0);
  });
});
